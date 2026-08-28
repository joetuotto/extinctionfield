import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "public", "data", "references_full.json");
const INDEX_PATH = path.join(ROOT, "lib", "referenceIndex.json");
const LEGACY_EVIDENCE_PATH = path.join(ROOT, "lib", "legacyEvidence.json");
const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
const legacyEvidence = JSON.parse(fs.readFileSync(LEGACY_EVIDENCE_PATH, "utf8"));
const errors = [];

function fail(message) {
  errors.push(message);
}

function hasDeclaredTokenRenderer(source, relative) {
  const declarations = [...source.matchAll(/@reference-token-renderer\s+([^\s*]+)/g)];
  if (declarations.length === 0) return false;

  if (!/^lib\/[a-zA-Z0-9_./-]*Data\.ts$/.test(relative)) {
    fail(`${relative}: @reference-token-renderer is allowed only in lib/*Data.ts modules`);
    return false;
  }

  let valid = true;
  for (const declaration of declarations) {
    const rendererRelative = declaration[1].split(path.sep).join("/");
    const rendererPath = path.resolve(ROOT, rendererRelative);
    if (!rendererPath.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(rendererPath)) {
      fail(`${relative}: declared reference token renderer does not exist: ${rendererRelative}`);
      valid = false;
      continue;
    }
    const rendererSource = fs.readFileSync(rendererPath, "utf8");
    if (!rendererSource.includes("<InlineReferenceText")) {
      fail(`${relative}: declared renderer does not use InlineReferenceText: ${rendererRelative}`);
      valid = false;
    }
  }
  return valid;
}

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

const ids = new Set();
const aliases = new Map();
const identities = new Map();
const bibliographicFingerprints = new Map();
const allowedStatuses = new Set(["verified", "registered", "pending", "missing"]);

function bibliographicFingerprint(reference) {
  const title = String(reference.title ?? "").trim();
  const year = Number(reference.year ?? 0);
  if (!title || !Number.isInteger(year) || year <= 0) return null;
  const normalizedTitle = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return normalizedTitle ? `${year}:${normalizedTitle}` : null;
}

for (const reference of registry.references) {
  if (!reference.id || typeof reference.id !== "string") fail("Reference without a string id");
  if (ids.has(reference.id)) fail(`Duplicate reference id: ${reference.id}`);
  ids.add(reference.id);

  if (!Array.isArray(reference.pathway)) fail(`${reference.id}: pathway must be an array`);
  if (!Array.isArray(reference.tags)) fail(`${reference.id}: tags must be an array`);
  if (!allowedStatuses.has(reference.link_status)) fail(`${reference.id}: invalid link_status ${reference.link_status}`);

  const referenceIdentities = [
    reference.doi ? `doi:${String(reference.doi).toLowerCase()}` : null,
    reference.pmcid ? `pmcid:${String(reference.pmcid).toUpperCase()}` : null,
    reference.pmid ? `pmid:${reference.pmid}` : null,
  ].filter(Boolean);
  for (const identity of referenceIdentities) {
    if (identities.has(identity)) fail(`Duplicate identifier ${identity}: ${identities.get(identity)}, ${reference.id}`);
    identities.set(identity, reference.id);
  }

  const fingerprint = bibliographicFingerprint(reference);
  if (fingerprint) {
    const previous = bibliographicFingerprints.get(fingerprint);
    if (previous) {
      fail(
        `Duplicate title/year bibliography: ${previous}, ${reference.id} ` +
          `(${reference.year}: ${reference.title})`,
      );
    }
    bibliographicFingerprints.set(fingerprint, reference.id);
  }

  for (const alias of reference.aliases ?? []) {
    if (ids.has(alias) || aliases.has(alias)) fail(`Duplicate or colliding reference alias: ${alias}`);
    aliases.set(alias, reference.id);
  }
}

for (const [alias, canonicalId] of aliases) {
  if (ids.has(alias)) fail(`Reference alias collides with canonical id: ${alias}`);
  if (!ids.has(canonicalId)) fail(`Reference alias points to an unknown canonical id: ${alias} -> ${canonicalId}`);
  if (index.aliases[alias] !== canonicalId) fail(`Generated alias index is stale: ${alias}`);
}

const verifiedCount = registry.references.filter((reference) => reference.verified).length;
const linkedCount = registry.references.filter((reference) => reference.link_status === "verified").length;
if (registry.metadata.total_references !== registry.references.length) fail("metadata.total_references is stale");
if (registry.metadata.verified_count !== verifiedCount) fail("metadata.verified_count is stale");
if (registry.metadata.linked_count !== linkedCount) fail("metadata.linked_count is stale");
if (registry.metadata.unlinked_count !== registry.references.length - linkedCount) fail("metadata.unlinked_count is stale");
if (registry.metadata.alias_count !== aliases.size) fail("metadata.alias_count is stale");
if (Object.keys(index.references).length !== registry.references.length) fail("Generated reference index is stale");
if (Object.keys(index.identifiers ?? {}).length !== identities.size) fail("Generated external-identifier index is stale");
for (const [identifier, referenceId] of identities) {
  if (index.identifiers?.[identifier] !== referenceId) {
    fail(`Generated external-identifier mapping is stale: ${identifier} -> ${referenceId}`);
  }
}

function expectedExternalUrl(reference) {
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

for (const reference of registry.references) {
  const generated = index.references[reference.id];
  if (!generated) {
    fail(`Missing generated index record: ${reference.id}`);
    continue;
  }
  const expectedUrl = expectedExternalUrl(reference);
  if (generated.externalUrl !== expectedUrl) fail(`${reference.id}: generated external URL does not match canonical precedence/status`);
  if (generated.linkStatus !== reference.link_status) fail(`${reference.id}: generated link status is stale`);
  if (reference.link_status === "verified" && !expectedUrl) {
    fail(`${reference.id}: ${reference.link_status} record has no publishable DOI, PMCID, PMID or HTTPS URL`);
  }
}

const used = new Map();
for (const directory of ["app", "components", "lib"]) {
  for (const file of walk(path.join(ROOT, directory))) {
    if (file === INDEX_PATH) continue;
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(ROOT, file).split(path.sep).join("/");

    const canonicalLinkInfrastructure = new Set([
      "app/[locale]/references/[referenceId]/page.tsx",
      "lib/citationLinks.ts",
      "lib/references.ts",
    ]);
    if (
      !canonicalLinkInfrastructure.has(relative) &&
      /https?:\/\/(?:dx\.)?doi\.org|https?:\/\/(?:pubmed|pmc)\.ncbi\.nlm\.nih\.gov/.test(source)
    ) {
      fail(`${relative}: direct DOI/PubMed/PMC URL bypasses the canonical reference registry`);
    }

    if (relative !== "lib/citationLinks.ts" && /(?:from|import\s*\()\s*["'][^"']*citationLinks["']/.test(source)) {
      fail(`${relative}: runtime import of deprecated translated-text citation lookup`);
    }

    for (const match of source.matchAll(/\breferenceId\s*(?::|=)\s*(?:\{\s*)?["']([^"']+)["']/g)) {
      used.set(match[1], relative);
    }
    for (const match of source.matchAll(/\b(?:keyRefs|referenceIds)\s*:\s*\[([^\]]*)\]/gs)) {
      for (const quoted of match[1].matchAll(/["']([^"']+)["']/g)) used.set(quoted[1], relative);
    }

    const referenceTokens = [...source.matchAll(/\[\[ref:([a-z0-9][a-z0-9._-]*)\|[^\]]+\]\]/g)];
    for (const match of referenceTokens) used.set(match[1], relative);
    const tokenStarts = source.match(/\[\[ref:/g)?.length ?? 0;
    if (tokenStarts !== referenceTokens.length) fail(`${relative}: malformed explicit reference token`);
    if (tokenStarts > 0 && !source.includes("<InlineReferenceText") && !hasDeclaredTokenRenderer(source, relative)) {
      fail(`${relative}: explicit reference token is not rendered through InlineReferenceText`);
    }

    if (relative !== "lib/citationLinks.ts") {
      for (const match of source.matchAll(/\bPMC\d{5,9}\b/gi)) {
        const identifier = `pmcid:${match[0].toUpperCase()}`;
        const referenceId = index.identifiers?.[identifier];
        if (!referenceId) fail(`${relative}: unknown external identifier ${match[0]}`);
        else used.set(referenceId, relative);
      }
      for (const match of source.matchAll(/\b(?:PMID|PubMed)\s*:?\s*(\d{6,9})\b/gi)) {
        const identifier = `pmid:${match[1]}`;
        const referenceId = index.identifiers?.[identifier];
        if (!referenceId) fail(`${relative}: unknown external identifier ${match[0]}`);
        else used.set(referenceId, relative);
      }
    }

    for (const match of source.matchAll(/<CitationLink\b[\s\S]*?>/g)) {
      if (!/\breferenceId=/.test(match[0])) fail(`${relative}: CitationLink without referenceId`);
    }
  }
}

const legacyClaimIds = new Set();
for (const claim of legacyEvidence) {
  if (!claim.id || typeof claim.id !== "string") {
    fail("Legacy evidence claim without a string id");
  } else if (legacyClaimIds.has(claim.id)) {
    fail(`Duplicate legacy evidence claim id: ${claim.id}`);
  } else {
    legacyClaimIds.add(claim.id);
  }

  if (!claim.referenceId || typeof claim.referenceId !== "string") {
    fail(`${claim.id ?? "Unknown legacy claim"}: missing canonical referenceId`);
  } else {
    used.set(claim.referenceId, "lib/legacyEvidence.json");
  }

  if (Object.hasOwn(claim, "url")) {
    fail(`${claim.id ?? "Unknown legacy claim"}: direct source URL must live in the canonical reference registry`);
  }
}

for (const [usedId, file] of used) {
  if (!ids.has(usedId) && !aliases.has(usedId)) fail(`${file}: unknown referenceId ${usedId}`);
}

if (errors.length) {
  console.error(`Reference validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Reference validation passed: ${ids.size} canonical IDs, ${aliases.size} aliases, ` +
    `${used.size} structured IDs, ${linkedCount} publishable links`,
);
