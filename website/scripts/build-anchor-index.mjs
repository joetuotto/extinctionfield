#!/usr/bin/env node
/**
 * Scans source files for <ClaimRef claimId="..."> usage
 * and generates data/anchor-index.json.
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

const anchors = [];

for (const scanDir of SCAN_DIRS) {
  const dir = resolve(ROOT, scanDir);
  try {
    statSync(dir);
  } catch {
    continue;
  }
  for (const file of walk(dir)) {
    const content = readFileSync(file, "utf-8");
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

const index = {
  generatedAt: new Date().toISOString(),
  anchors: anchors.sort((a, b) => a.claimId.localeCompare(b.claimId)),
};

writeFileSync(OUT, JSON.stringify(index, null, 2) + "\n");
console.log(`Anchor index: ${anchors.length} anchor(s) in ${new Set(anchors.map((a) => a.file)).size} file(s)`);
