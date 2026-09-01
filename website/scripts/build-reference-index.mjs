import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "public", "data", "references_full.json");
const INDEX_PATH = path.join(ROOT, "lib", "referenceIndex.json");
const USAGE_PATH = path.join(ROOT, "lib", "referenceUsage.json");
const LEGACY_EVIDENCE_PATH = path.join(ROOT, "lib", "legacyEvidence.json");

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));

function externalUrl(reference) {
  if (reference.link_status !== "verified") return null;
  const doi = String(reference.doi ?? "").trim();
  if (doi.startsWith("10.")) return `https://doi.org/${doi}`;
  const pmcid = String(reference.pmcid ?? "").trim().toUpperCase();
  if (/^PMC\d+$/.test(pmcid)) return `https://pmc.ncbi.nlm.nih.gov/articles/${pmcid}/`;
  const pmid = String(reference.pmid ?? "").trim();
  if (/^\d{7,9}$/.test(pmid)) return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
  const url = String(reference.url ?? "").trim();
  return /^https:\/\//.test(url) ? url : null;
}

const references = {};
const aliases = {};
const identifiers = {};
for (const reference of registry.references) {
  references[reference.id] = {
    id: reference.id,
    authors: reference.authors,
    year: reference.year,
    title: reference.title,
    journal: reference.journal,
    type: reference.type ?? null,
    linkStatus: reference.link_status,
    externalUrl: externalUrl(reference),
  };
  for (const alias of reference.aliases ?? []) aliases[alias] = reference.id;
  if (reference.doi) identifiers[`doi:${String(reference.doi).trim().toLowerCase()}`] = reference.id;
  if (reference.pmcid) identifiers[`pmcid:${String(reference.pmcid).trim().toUpperCase()}`] = reference.id;
  if (reference.pmid) identifiers[`pmid:${String(reference.pmid).trim()}`] = reference.id;
}

const compactIndex = {
  metadata: {
    version: registry.metadata.version,
    generated: registry.metadata.generated,
    totalReferences: registry.references.length,
    linkedReferences: registry.references.filter((reference) => externalUrl(reference)).length,
  },
  references,
  aliases,
  identifiers,
};

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".next", "node_modules", ".git", "__tests__"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function routeForPage(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join("/");
  const appMatch = relative.match(/^app\/\[locale\]\/(.*)\/page\.tsx$/);
  if (appMatch) {
    const route = `/${appMatch[1].replace(/\[([^\]]+)\]/g, ":$1")}`;
    return route.includes(":") ? null : route;
  }
  if (relative === "app/[locale]/page.tsx") return "/";

  const fixed = new Map([
    ["app/[locale]/articles/[slug]/BeeArticleContent.tsx", "/articles/bees"],
    ["app/[locale]/articles/[slug]/SpectrumArticleContent.tsx", "/articles/spectrum"],
    ["app/[locale]/articles/[slug]/ImplausibilityArticleContent.tsx", "/articles/implausibility"],
    ["app/[locale]/articles/[slug]/DualLockArticleContent.tsx", "/articles/dual-lock"],
    ["lib/causalMapData.ts", "/map"],
    ["lib/legacyEvidence.json", "/evidence"],
    ["lib/populationData.ts", "/evidence/populations"],
    ["lib/vgccGeneFamily.ts", "/model/fieldstate/math"],
    ["lib/modulome/organDetailData.ts", "/modulome"],
  ]);
  return fixed.get(relative) ?? null;
}

function resolveLocalImport(fromFile, specifier, sourceFileSet) {
  let base;
  if (specifier.startsWith("@/")) base = path.join(ROOT, specifier.slice(2));
  else if (specifier.startsWith(".")) base = path.resolve(path.dirname(fromFile), specifier);
  else return null;

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.json`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  return candidates.find((candidate) => sourceFileSet.has(candidate)) ?? null;
}

function importsInSource(file, source, sourceFileSet) {
  const dependencies = new Set();
  const patterns = [
    /\b(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g,
    /\bimport\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const dependency = resolveLocalImport(file, match[1], sourceFileSet);
      if (dependency) dependencies.add(dependency);
    }
  }
  return dependencies;
}

function idsInSource(source) {
  const ids = new Set();
  const single = /\breferenceId\s*(?::|=)\s*(?:\{\s*)?["']([^"']+)["']/g;
  for (const match of source.matchAll(single)) ids.add(match[1]);
  const jsonSingle = /"referenceId"\s*:\s*"([^"]+)"/g;
  for (const match of source.matchAll(jsonSingle)) ids.add(match[1]);

  const arrays = /\b(?:keyRefs|referenceIds)\s*:\s*\[([^\]]*)\]/gs;
  for (const match of source.matchAll(arrays)) {
    for (const quoted of match[1].matchAll(/["']([^"']+)["']/g)) ids.add(quoted[1]);
  }

  for (const match of source.matchAll(/\[\[ref:([a-z0-9][a-z0-9._-]*)\|[^\]]+\]\]/g)) {
    ids.add(match[1]);
  }
  for (const match of source.matchAll(/\bPMC\d{5,9}\b/gi)) {
    const referenceId = identifiers[`pmcid:${match[0].toUpperCase()}`];
    if (referenceId) ids.add(referenceId);
  }
  for (const match of source.matchAll(/\b(?:PMID|PubMed)\s*:?\s*(\d{6,9})\b/gi)) {
    const referenceId = identifiers[`pmid:${match[1]}`];
    if (referenceId) ids.add(referenceId);
  }
  return ids;
}

const sourceFiles = [
  ...["app", "components", "lib"]
    .flatMap((directory) => walk(path.join(ROOT, directory)))
    .filter((file) => ![INDEX_PATH, USAGE_PATH].includes(file)),
  LEGACY_EVIDENCE_PATH,
];
const sourceFileSet = new Set(sourceFiles);
const sources = new Map(sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
const dependencyGraph = new Map(
  sourceFiles.map((file) => [file, importsInSource(file, sources.get(file), sourceFileSet)]),
);
const routeRoots = sourceFiles
  .map((file) => ({ file, route: routeForPage(file) }))
  .filter(({ route }) => route !== null);

const usage = {};
for (const { file: rootFile, route } of routeRoots) {
  const visited = new Set();
  const stack = [rootFile];
  while (stack.length > 0) {
    const file = stack.pop();
    if (visited.has(file)) continue;
    visited.add(file);

    for (const dependency of dependencyGraph.get(file) ?? []) stack.push(dependency);

    for (const usedId of idsInSource(sources.get(file))) {
      const canonicalId = aliases[usedId] ?? usedId;
      const item = {
        path: route,
        source: path.relative(ROOT, file).split(path.sep).join("/"),
      };
      usage[canonicalId] ??= [];
      if (!usage[canonicalId].some((existing) => existing.path === item.path)) {
        usage[canonicalId].push(item);
      }
    }
  }
}

for (const items of Object.values(usage)) items.sort((a, b) => a.path.localeCompare(b.path));

fs.writeFileSync(INDEX_PATH, JSON.stringify(compactIndex, null, 2) + "\n");
fs.writeFileSync(
  USAGE_PATH,
  JSON.stringify(
    {
      metadata: {
        generated: new Date().toISOString().slice(0, 10),
        referencesWithUsages: Object.keys(usage).length,
        usageLocations: Object.values(usage).reduce((sum, items) => sum + items.length, 0),
      },
      usage,
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `Reference index: ${Object.keys(references).length} canonical records, ` +
    `${Object.keys(aliases).length} aliases, ${Object.keys(usage).length} used records`,
);
