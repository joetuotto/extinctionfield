#!/usr/bin/env node
/**
 * Reports per-locale translation coverage of every `const COPY = { en, fi, ja, fr, ko }`
 * block under app/[locale]/**\/page.tsx, using the TypeScript AST.
 *
 *   npm run i18n:coverage            # table for all pages
 *   npm run i18n:coverage -- --strict  # exit 1 if any English key is blank ("" / [])
 *
 * Coverage = share of English keys whose value in the locale is non-blank.
 * `pickCopy` (lib/i18n.ts) falls back to English per key, so a low number
 * means "mostly English text", not "broken page" — but a blank English key
 * renders as nothing everywhere, hence --strict.
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../app/[locale]");
const LOCALES = ["en", "fi", "ja", "fr", "ko"];
const strict = process.argv.includes("--strict");
const filter = process.argv.find((a) => a.startsWith("--page="))?.slice(7);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name === "page.tsx") out.push(p);
  }
  return out;
}

function unwrap(node) {
  while (
    node &&
    (ts.isAsExpression(node) ||
      (ts.isSatisfiesExpression && ts.isSatisfiesExpression(node)) ||
      ts.isParenthesizedExpression(node) ||
      ts.isTypeAssertionExpression(node))
  ) {
    node = node.expression;
  }
  return node;
}

function isBlank(node) {
  const v = unwrap(node);
  if (!v) return true;
  if ((ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) && v.text.trim() === "") return true;
  if (ts.isArrayLiteralExpression(v) && v.elements.length === 0) return true;
  return false;
}

function localeKeys(init) {
  const obj = unwrap(init);
  if (!obj || !ts.isObjectLiteralExpression(obj)) return null;
  const keys = new Map();
  for (const p of obj.properties) {
    if (ts.isPropertyAssignment(p)) {
      keys.set(p.name.getText().replace(/['"]/g, ""), !isBlank(p.initializer));
    } else if (ts.isShorthandPropertyAssignment(p)) {
      keys.set(p.name.getText(), true);
    }
  }
  return keys;
}

const rows = [];
let enBlankTotal = 0;

for (const file of walk(ROOT).sort()) {
  const src = fs.readFileSync(file, "utf8");
  if (!/const COPY = \{/.test(src)) continue;
  const rel = path.relative(ROOT, file).replace(/\/page\.tsx$/, "") || "(index)";
  if (filter && !rel.includes(filter)) continue;
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let copyNode = null;
  (function find(node) {
    if (copyNode) return;
    if (ts.isVariableDeclaration(node) && node.name.getText() === "COPY" && node.initializer) {
      copyNode = unwrap(node.initializer);
      return;
    }
    ts.forEachChild(node, find);
  })(sf);
  if (!copyNode || !ts.isObjectLiteralExpression(copyNode)) continue;

  const perLocale = {};
  for (const p of copyNode.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const name = p.name.getText().replace(/['"]/g, "");
    if (LOCALES.includes(name)) perLocale[name] = localeKeys(p.initializer);
  }
  const en = perLocale.en;
  if (!en) continue;
  const enBlank = [...en.entries()].filter(([, ok]) => !ok).map(([k]) => k);
  enBlankTotal += enBlank.length;
  const row = { page: rel, enKeys: en.size, enBlank };
  for (const locale of LOCALES.slice(1)) {
    const block = perLocale[locale];
    if (!block) {
      row[locale] = { coverage: 0, missing: en.size, blank: 0, status: "absent" };
      continue;
    }
    let translated = 0, missing = 0, blank = 0;
    for (const [key, enOk] of en) {
      if (!enOk) continue;
      if (!block.has(key)) missing++;
      else if (!block.get(key)) blank++;
      else translated++;
    }
    const denom = [...en.values()].filter(Boolean).length || 1;
    row[locale] = { coverage: translated / denom, missing, blank, status: "ok" };
  }
  rows.push(row);
}

const pct = (x) => `${Math.round(x * 100)}%`.padStart(4);
console.log(["page".padEnd(40), "en", ...LOCALES.slice(1).map((l) => `${l} cov (miss/blank)`)].join("  "));
for (const r of rows) {
  const cells = LOCALES.slice(1).map((l) => {
    const c = r[l];
    return `${pct(c.coverage)} (${String(c.missing).padStart(3)}/${String(c.blank).padStart(3)})`;
  });
  console.log([r.page.padEnd(40), String(r.enKeys).padStart(3), ...cells].join("  "));
  if (r.enBlank.length) console.log(`  ${"".padEnd(38)} en blank: ${r.enBlank.join(", ")}`);
}
console.log(`\n${rows.length} pages with COPY blocks; ${enBlankTotal} blank English key(s).`);

if (strict && enBlankTotal > 0) {
  console.error("\n--strict: blank English keys render as nothing in every locale.");
  process.exit(1);
}
