#!/usr/bin/env node
import { readdir, readFile, mkdir, rm, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";
import * as pagefind from "pagefind";
import { SEARCH_LOCALES, indexableRoute, prepareSearchHtml, referenceSearchRecord } from "./search-index.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, ".next/server/app");
const output = join(root, "public/pagefind");
const staging = join(root, ".next/search-index-staging");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files.sort();
}
function check(result, operation) {
  if (result.errors?.length) throw new Error(`${operation}: ${JSON.stringify(result.errors)}`);
  return result;
}

try {
  const files = (await walk(input)).map((file) => ({ file, route: indexableRoute(relative(input, file)) })).filter(({ route }) => route);
  const registry = JSON.parse(await readFile(join(root, "public/data/references_full.json"), "utf8"));
  const manifest = { locales: {}, references: registry.references.length };
  await rm(staging, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });
  for (const locale of SEARCH_LOCALES) {
    const pages = files.filter(({ route }) => route.locale === locale);
    if (pages.length === 0) throw new Error(`No built pages for ${locale}; run npm run build first.`);
    const { index } = check(await pagefind.createIndex({ forceLanguage: locale, writePlayground: false }), "createIndex");
    if (!index) throw new Error("Pagefind did not create an index");
    let indexedPages = 0;
    for (const { file, route } of pages) {
      const content = prepareSearchHtml(await readFile(file, "utf8"), route);
      if (content === null) continue; // Next's redirect-only compatibility pages.
      const result = check(await index.addHTMLFile({ url: route.url, content }), route.url);
      if (!result.file?.uniqueWords) throw new Error(`Empty searchable page: ${route.url}`);
      indexedPages++;
    }
    for (const reference of registry.references) {
      check(await index.addCustomRecord(referenceSearchRecord(reference, locale)), reference.id);
    }
    check(await index.writeFiles({ outputPath: join(staging, locale) }), `write ${locale}`);
    await index.deleteIndex();
    manifest.locales[locale] = { pages: indexedPages, records: indexedPages + registry.references.length };
    console.log(`Search ${locale}: ${indexedPages} pages + ${registry.references.length} reference records`);
  }
  await writeFile(join(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await rm(output, { recursive: true, force: true });
  await rename(staging, output);
  console.log("Search index written to public/pagefind.");
} finally {
  await pagefind.close();
}
