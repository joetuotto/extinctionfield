#!/usr/bin/env node
/**
 * Scans the prerendered HTML that `next build` writes to .next/server/app/**\/*.html
 * and fails when reader-visible markup carries a defect that the source-level
 * validators cannot see:
 *
 *   raw-token      an unrendered [[ref:id|label]] citation token in text
 *                  (the string was printed as plain {text} instead of going
 *                  through <InlineReferenceText>)
 *   empty-element  an empty <h2>, <h3>, <h4> or <p>
 *   empty-anchor   an <a> with no text content (icon-only links that carry an
 *                  aria-label, or an <img alt="...">, are accepted)
 *
 * <script>, <style> and HTML comments are ignored; <noscript> content counts
 * because it is what no-JS readers and crawlers see.
 *
 * Usage:
 *   node scripts/check-rendered-html.mjs [--allow <file>] [--verbose]
 *
 * The optional allow file lists known-legitimate findings, one per line:
 *   <route-glob> <check> [<substring of the offending snippet>]
 * e.g.
 *   /*\/about        empty-anchor  aria-hidden="true"
 *   /en/some-route  empty-element
 * `*` matches one path segment, `**` matches any depth; lines starting with #
 * are comments. Prefer fixing the source over allowlisting.
 *
 * Exit codes: 0 clean, 1 findings, 2 nothing to scan (run `next build` first).
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_HTML_DIR = resolve(__dirname, "../.next/server/app");
const EXAMPLES_PER_CHECK = 3;
const SNIPPET_LENGTH = 160;

const CHECKS = ["raw-token", "empty-element", "empty-anchor"];

// ── CLI ──

const args = process.argv.slice(2);
let allowPath = null;
let verbose = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow") {
    allowPath = args[++i];
    if (!allowPath) {
      console.error("--allow requires a file path");
      process.exit(2);
    }
  } else if (args[i] === "--verbose" || args[i] === "-v") {
    verbose = true;
  } else {
    console.error(`Unknown argument: ${args[i]}`);
    process.exit(2);
  }
}

// ── Allowlist ──

function globToRegExp(glob) {
  const escaped = glob
    .split("**")
    .map((part) =>
      part
        .split("*")
        .map((literal) => literal.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
        .join("[^/]*"),
    )
    .join(".*");
  return new RegExp(`^${escaped}$`);
}

function loadAllowlist(file) {
  if (!file) return [];
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) {
    console.error(`Allow file not found: ${path}`);
    process.exit(2);
  }
  const entries = [];
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const [routeGlob, check, ...rest] = line.split(/\s+/);
    if (!routeGlob || !CHECKS.includes(check)) {
      console.error(`Malformed allow entry (expected "<route-glob> <check> [snippet]"): ${line}`);
      process.exit(2);
    }
    entries.push({ route: globToRegExp(routeGlob), check, snippet: rest.join(" ") || null, line });
  }
  return entries;
}

const allowlist = loadAllowlist(allowPath);

function isAllowed(route, check, snippet) {
  return allowlist.some(
    (entry) => entry.check === check && entry.route.test(route) && (!entry.snippet || snippet.includes(entry.snippet)),
  );
}

// ── Scan ──

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function routeForFile(file) {
  const rel = relative(APP_HTML_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  return `/${rel.replace(/\/index$/, "")}`;
}

function visibleMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function snippetAt(markup, index, length) {
  const start = Math.max(0, index - 40);
  return markup
    .slice(start, index + Math.max(length, 80))
    .replace(/\s+/g, " ")
    .slice(0, SNIPPET_LENGTH);
}

function textContent(fragment) {
  return fragment
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;|&#xa0;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findIssues(html) {
  const markup = visibleMarkup(html);
  const issues = [];

  for (const match of markup.matchAll(/\[\[ref:[^\]]{0,200}\]{0,2}/g)) {
    issues.push({ check: "raw-token", snippet: match[0] });
  }

  for (const match of markup.matchAll(/<(h[2-4]|p)( [^>]*)?>\s*<\/(h[2-4]|p)>/g)) {
    issues.push({ check: "empty-element", snippet: snippetAt(markup, match.index, match[0].length) });
  }

  for (const match of markup.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const [whole, attributes, inner] = match;
    if (/\baria-label\s*=\s*"[^"]+"/i.test(attributes)) continue;
    if (/<img\b[^>]*\balt\s*=\s*"[^"]+"/i.test(inner)) continue;
    if (textContent(inner)) continue;
    issues.push({ check: "empty-anchor", snippet: snippetAt(markup, match.index, whole.length) });
  }

  return issues;
}

if (!existsSync(APP_HTML_DIR)) {
  console.error(`No prerendered HTML at ${APP_HTML_DIR} — run \`next build\` first.`);
  process.exit(2);
}

const files = walk(APP_HTML_DIR).sort();
if (files.length === 0) {
  console.error(`No .html files under ${APP_HTML_DIR} — run \`next build\` first.`);
  process.exit(2);
}

const failingRoutes = [];
const allowedRoutes = [];
const totals = Object.fromEntries(CHECKS.map((check) => [check, 0]));
let allowedTotal = 0;

for (const file of files) {
  const route = routeForFile(file);
  const issues = findIssues(readFileSync(file, "utf8"));
  if (issues.length === 0) continue;

  const failing = [];
  const allowed = [];
  for (const issue of issues) {
    (isAllowed(route, issue.check, issue.snippet) ? allowed : failing).push(issue);
  }
  if (allowed.length) allowedRoutes.push({ route, issues: allowed });
  if (failing.length) failingRoutes.push({ route, issues: failing });
}

function countsByCheck(issues) {
  const counts = Object.fromEntries(CHECKS.map((check) => [check, 0]));
  for (const issue of issues) counts[issue.check]++;
  return counts;
}

function formatCounts(counts) {
  return CHECKS.filter((check) => counts[check] > 0)
    .map((check) => `${check}=${counts[check]}`)
    .join(" ");
}

for (const { route, issues } of failingRoutes) {
  const counts = countsByCheck(issues);
  for (const check of CHECKS) totals[check] += counts[check];
  console.error(`${route}  (${formatCounts(counts)})`);
  for (const check of CHECKS) {
    const examples = issues.filter((issue) => issue.check === check);
    const shown = verbose ? examples : examples.slice(0, EXAMPLES_PER_CHECK);
    for (const issue of shown) console.error(`    ${check}: ${issue.snippet}`);
    if (shown.length < examples.length) {
      console.error(`    ${check}: … ${examples.length - shown.length} more (use --verbose)`);
    }
  }
}

for (const { route, issues } of allowedRoutes) {
  allowedTotal += issues.length;
  if (verbose) {
    console.log(`${route}  allowed (${formatCounts(countsByCheck(issues))})`);
  }
}

const failingTotal = CHECKS.reduce((sum, check) => sum + totals[check], 0);
const summary =
  `Scanned ${files.length} prerendered routes: ` +
  CHECKS.map((check) => `${totals[check]} ${check}`).join(", ") +
  (allowedTotal ? `, ${allowedTotal} allowlisted` : "");

if (failingTotal > 0) {
  console.error(`\nRendered HTML check failed — ${failingRoutes.length} route(s) with findings.`);
  console.error(summary);
  process.exit(1);
}

console.log(`Rendered HTML check passed. ${summary}`);
