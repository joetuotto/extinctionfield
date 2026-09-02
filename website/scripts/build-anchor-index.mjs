#!/usr/bin/env node
/**
 * Scans source files for <ClaimRef claimId="..."> usage
 * and generates data/anchor-index.json.
 *
 * Matches inside // line comments and block comments are skipped, so the
 * documentation example in lib/claims/types.ts is not indexed as an anchor.
 * Exits 1 if an anchored claimId does not exist in data/claims.json.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, dirname, relative, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "data/anchor-index.json");

const SCAN_DIRS = ["app", "components", "lib"];
const EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);
const CLAIM_REF_PATTERN = /data-claim-id=["']([^"']+)["']|claimId=["']([^"']+)["']/g;

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      files.push(...walk(full));
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Blank out `//` and block comments, preserving every character offset and
 * newline so match indexes and line numbers stay accurate. String and
 * template literals are skipped over, and an escape outside a string
 * consumes the next character (so regex escapes like \/\/ are not read as
 * a comment).
 */
function stripComments(source) {
  const out = source.split("");
  const blank = (from, to) => {
    for (let k = from; k < to && k < out.length; k++) {
      if (out[k] !== "\n") out[k] = " ";
    }
  };

  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    if (ch === "\\") {
      i += 2;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      i++;
      while (i < source.length) {
        if (source[i] === "\\") {
          i += 2;
          continue;
        }
        if (source[i] === ch) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      const end = source.indexOf("\n", i);
      const stop = end === -1 ? source.length : end;
      blank(i, stop);
      i = stop;
      continue;
    }

    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      blank(i, stop);
      i = stop;
      continue;
    }

    i++;
  }

  return out.join("");
}

// ── Known claim IDs ────────────────────────────────────────────────
let knownClaimIds;
try {
  const claims = JSON.parse(readFileSync(resolve(ROOT, "data/claims.json"), "utf-8"));
  knownClaimIds = new Set(claims.claims.map((c) => c.id));
} catch (e) {
  console.error(`ERROR: Cannot load data/claims.json: ${e.message}`);
  process.exit(1);
}

const anchors = [];

for (const scanDir of SCAN_DIRS) {
  const dir = resolve(ROOT, scanDir);
  try {
    statSync(dir);
  } catch {
    continue;
  }
  for (const file of walk(dir)) {
    const content = stripComments(readFileSync(file, "utf-8"));
    let match;
    CLAIM_REF_PATTERN.lastIndex = 0;
    while ((match = CLAIM_REF_PATTERN.exec(content)) !== null) {
      const claimId = match[1] || match[2];
      const relPath = relative(ROOT, file);
      const line = content.substring(0, match.index).split("\n").length;
      anchors.push({
        claimId,
        file: relPath,
        line,
      });
    }
  }
}

// ── Anchored claim IDs must exist ──────────────────────────────────
const unknown = anchors.filter((a) => !knownClaimIds.has(a.claimId));
if (unknown.length > 0) {
  for (const a of unknown) {
    console.error(
      `ERROR: ${a.file}:${a.line} anchors "${a.claimId}", which does not exist in data/claims.json`
    );
  }
  console.error(
    `\nAnchor index NOT written: ${unknown.length} anchor(s) reference unknown claim ID(s).\n`
  );
  process.exit(1);
}

const index = {
  generatedAt: new Date().toISOString(),
  anchors: anchors.sort(
    (a, b) => a.claimId.localeCompare(b.claimId) || a.file.localeCompare(b.file) || a.line - b.line
  ),
};

writeFileSync(OUT, JSON.stringify(index, null, 2) + "\n");
console.log(`Anchor index: ${anchors.length} anchor(s) in ${new Set(anchors.map((a) => a.file)).size} file(s)`);
