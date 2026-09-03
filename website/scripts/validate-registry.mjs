#!/usr/bin/env node
/**
 * Validates causal-graph.json and claims.json integrity.
 * Runs as part of prebuild: npm run registry:validate
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../data");
const WEBSITE_DIR = resolve(__dirname, "..");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN:  ${msg}`);
  warnings++;
}

function loadJSON(filename) {
  const path = resolve(DATA_DIR, filename);
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch (e) {
    error(`Cannot load ${filename}: ${e.message}`);
    return null;
  }
}

// ── Load data ──────────────────────────────────────────

const graph = loadJSON("causal-graph.json");
const claims = loadJSON("claims.json");
const architecture = loadJSON("model-architecture.json");

if (!graph || !claims || !architecture) {
  console.error("\nFATAL: Cannot load required data files.\n");
  process.exit(1);
}

// ── 1. Node ID format ──────────────────────────────────
console.log("1. Checking node ID format...");
const nodeIds = new Set(Object.keys(graph.nodes));
for (const [id, node] of Object.entries(graph.nodes)) {
  if (!/^[A-Z][A-Z0-9_]*$/.test(id)) {
    error(`Node ID "${id}" does not match SCREAMING_SNAKE_CASE pattern`);
  }
  if (id !== node.id) {
    error(`Node key "${id}" does not match node.id "${node.id}"`);
  }
}

// ── 2. Edge referential integrity ──────────────────────
console.log("2. Checking edge referential integrity...");
const edgeIds = new Set();
for (const edge of graph.edges) {
  if (edgeIds.has(edge.id)) {
    error(`Duplicate edge ID: ${edge.id}`);
  }
  edgeIds.add(edge.id);
  if (!nodeIds.has(edge.from)) {
    error(`Edge ${edge.id}: "from" node "${edge.from}" does not exist`);
  }
  if (!nodeIds.has(edge.to)) {
    error(`Edge ${edge.id}: "to" node "${edge.to}" does not exist`);
  }
  if (!["inference_input", "derived_geometry", "conditional_response", "causal_model"].includes(edge.kind)) {
    error(`Edge ${edge.id}: invalid kind "${edge.kind}"`);
  }
}

// ── 3. Parent/child consistency ────────────────────────
console.log("3. Checking parent/child consistency...");
for (const [id, node] of Object.entries(graph.nodes)) {
  for (const parentId of node.parents) {
    if (!nodeIds.has(parentId)) {
      error(`Node ${id}: parent "${parentId}" does not exist`);
      continue;
    }
    const parent = graph.nodes[parentId];
    if (!parent.children.includes(id)) {
      error(`Node ${id} lists parent ${parentId}, but ${parentId}.children does not include ${id}`);
    }
  }
  for (const childId of node.children) {
    if (!nodeIds.has(childId)) {
      error(`Node ${id}: child "${childId}" does not exist`);
      continue;
    }
    const child = graph.nodes[childId];
    if (!child.parents.includes(id)) {
      error(`Node ${id} lists child ${childId}, but ${childId}.parents does not include ${id}`);
    }
  }
}

// ── 4. Edge ↔ parent/child agreement ───────────────────
console.log("4. Checking edge/parent-child agreement...");
const edgeSet = new Set(graph.edges.map((e) => `${e.from}->${e.to}`));
for (const [id, node] of Object.entries(graph.nodes)) {
  for (const childId of node.children) {
    const key = `${id}->${childId}`;
    if (!edgeSet.has(key)) {
      error(`Node ${id}.children includes ${childId} but no edge ${key} exists`);
    }
  }
}
for (const edge of graph.edges) {
  const parent = graph.nodes[edge.from];
  if (parent && !parent.children.includes(edge.to)) {
    error(`Edge ${edge.id} (${edge.from}->${edge.to}) exists but ${edge.from}.children does not include ${edge.to}`);
  }
}

// ── 5. DAG check (no cycles) ──────────────────────────
console.log("5. Checking graph is acyclic...");
{
  const visited = new Set();
  const inStack = new Set();
  let hasCycle = false;

  function dfs(nodeId, path) {
    if (inStack.has(nodeId)) {
      const cycle = path.slice(path.indexOf(nodeId));
      error(`Cycle detected: ${cycle.join(" -> ")} -> ${nodeId}`);
      hasCycle = true;
      return;
    }
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    inStack.add(nodeId);
    const node = graph.nodes[nodeId];
    if (node) {
      for (const child of node.children) {
        dfs(child, [...path, nodeId]);
      }
    }
    inStack.delete(nodeId);
  }

  for (const id of nodeIds) {
    dfs(id, []);
  }
  if (!hasCycle) console.log("   No cycles found.");
}

// ── 6. UI group coverage ───────────────────────────────
console.log("6. Checking UI group coverage...");
const groupedNodes = new Set();
for (const [gid, group] of Object.entries(graph.ui_groups)) {
  if (gid !== group.id) {
    error(`UI group key "${gid}" does not match group.id "${group.id}"`);
  }
  for (const nid of group.contains) {
    if (!nodeIds.has(nid)) {
      error(`UI group ${gid} contains nonexistent node "${nid}"`);
    }
    if (groupedNodes.has(nid)) {
      warn(`Node ${nid} appears in multiple UI groups`);
    }
    groupedNodes.add(nid);
  }
}
for (const id of nodeIds) {
  if (!groupedNodes.has(id)) {
    warn(`Node ${id} is not in any UI group`);
  }
}

// ── 7. Layer validity ──────────────────────────────────
console.log("7. Checking layer values...");
const validLayers = new Set(["physics", "mechanism", "barrier", "reproductive", "couple", "ecology", "demography"]);
for (const [id, node] of Object.entries(graph.nodes)) {
  if (!validLayers.has(node.layer)) {
    error(`Node ${id}: invalid layer "${node.layer}"`);
  }
}

// ── 8. Legacy alias uniqueness ─────────────────────────
console.log("8. Checking legacy alias uniqueness...");
const aliasMap = new Map();
for (const [id, node] of Object.entries(graph.nodes)) {
  for (const alias of node.legacy_aliases) {
    const lower = alias.toLowerCase();
    if (aliasMap.has(lower)) {
      warn(`Alias "${alias}" used by both ${aliasMap.get(lower)} and ${id}`);
    }
    aliasMap.set(lower, id);
  }
}

// ── 9. Claim ID format ────────────────────────────────
console.log("9. Checking claim ID format...");
const claimIds = new Set();
for (const claim of claims.claims) {
  if (!/^claim\.[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*$/.test(claim.id)) {
    error(`Claim ID "${claim.id}" does not match pattern "claim.<domain>.<slug>"`);
  }
  if (claimIds.has(claim.id)) {
    error(`Duplicate claim ID: ${claim.id}`);
  }
  claimIds.add(claim.id);
}

// ── 10. Claim target validity ─────────────────────────
console.log("10. Checking claim targets...");
for (const claim of claims.claims) {
  if (claim.target.type === "node" && !nodeIds.has(claim.target.nodeId)) {
    error(`Claim ${claim.id}: target node "${claim.target.nodeId}" does not exist in graph`);
  }
  if (claim.target.type === "edge" && !edgeIds.has(claim.target.edgeId)) {
    error(`Claim ${claim.id}: target edge "${claim.target.edgeId}" does not exist in graph`);
  }
}

// ── 11. Claim depends_on validity ─────────────────────
console.log("11. Checking claim dependencies...");
for (const claim of claims.claims) {
  for (const dep of claim.depends_on) {
    if (!claimIds.has(dep)) {
      error(`Claim ${claim.id}: depends_on "${dep}" does not exist`);
    }
  }
  for (const sup of claim.supersedes) {
    if (!claimIds.has(sup)) {
      warn(`Claim ${claim.id}: supersedes "${sup}" does not exist (may be historical)`);
    }
  }
}

// ── 12. Evidence relation integrity ───────────────────
console.log("12. Checking evidence relations...");
const erIds = new Set();
let refIndex;
try {
  refIndex = JSON.parse(readFileSync(resolve(__dirname, "../public/data/references_full.json"), "utf-8"));
} catch {
  warn("Cannot load references_full.json — skipping reference ID checks");
}
const refIds = refIndex ? new Set(refIndex.references.map((r) => r.id)) : null;

for (const er of claims.evidence_relations) {
  if (erIds.has(er.id)) {
    error(`Duplicate evidence relation ID: ${er.id}`);
  }
  erIds.add(er.id);
  if (!claimIds.has(er.claimId)) {
    error(`Evidence relation ${er.id}: claim "${er.claimId}" does not exist`);
  }
  if (refIds && !refIds.has(er.referenceId)) {
    warn(`Evidence relation ${er.id}: reference "${er.referenceId}" not found in references_full.json`);
  }
}

// ── 13. Epistemic assessment integrity ────────────────
console.log("13. Checking epistemic assessments...");
const eaIds = new Set();
const validLevels = new Set(["L", "L*", "M", "C", "M|C", "E"]);
for (const ea of claims.epistemic_assessments) {
  if (eaIds.has(ea.id)) {
    error(`Duplicate assessment ID: ${ea.id}`);
  }
  eaIds.add(ea.id);
  if (!claimIds.has(ea.claimId)) {
    error(`Assessment ${ea.id}: claim "${ea.claimId}" does not exist`);
  }
  if (!validLevels.has(ea.level)) {
    error(`Assessment ${ea.id}: invalid level "${ea.level}"`);
  }
  for (const basisId of ea.basis) {
    if (!erIds.has(basisId)) {
      warn(`Assessment ${ea.id}: basis "${basisId}" is not a known evidence relation`);
    }
  }
}

// ── 14. EN translation required ───────────────────────
console.log("14. Checking required translations...");
for (const [id, node] of Object.entries(graph.nodes)) {
  if (!node.label.en) {
    error(`Node ${id}: missing required English label`);
  }
}
for (const claim of claims.claims) {
  if (!claim.statement.en) {
    error(`Claim ${claim.id}: missing required English statement`);
  }
}

// ── 15. Root node check ───────────────────────────────
console.log("15. Checking root/terminal nodes...");
const rootNodes = [];
const terminalNodes = [];
for (const [id, node] of Object.entries(graph.nodes)) {
  if (node.parents.length === 0) rootNodes.push(id);
  if (node.children.length === 0) terminalNodes.push(id);
}
console.log(`   Root nodes (${rootNodes.length}): ${rootNodes.join(", ")}`);
console.log(`   Terminal nodes (${terminalNodes.length}): ${terminalNodes.join(", ")}`);
if (rootNodes.length === 0) error("Graph has no root nodes");
if (terminalNodes.length === 0) error("Graph has no terminal nodes");

// ── 16. Version format ────────────────────────────────
console.log("16. Checking version format...");
if (!/^\d+\.\d+\.\d+$/.test(graph.version)) {
  error(`Graph version "${graph.version}" does not match semver pattern`);
}
if (!/^\d+\.\d+\.\d+$/.test(claims.version)) {
  error(`Claims version "${claims.version}" does not match semver pattern`);
}

// ── 17. Route definitions ────────────────────────────
const routeArray = claims.routes || [];
const routeIds = new Set();
if (routeArray.length > 0) {
  console.log("17. Checking route definitions...");
  for (const route of routeArray) {
    if (!/^route\.[a-z][a-z0-9-]*$/.test(route.id)) {
      error(`Route ID "${route.id}" does not match pattern "route.<slug>"`);
    }
    if (routeIds.has(route.id)) {
      error(`Duplicate route ID: ${route.id}`);
    }
    routeIds.add(route.id);
    if (route.targetClaim && !claimIds.has(route.targetClaim)) {
      error(`Route ${route.id}: targetClaim "${route.targetClaim}" does not exist`);
    }
    for (const rc of route.routeClaims || []) {
      if (!claimIds.has(rc)) {
        error(`Route ${route.id}: routeClaim "${rc}" does not exist`);
      }
    }
    for (const re of route.routeEvidence || []) {
      if (!erIds.has(re)) {
        warn(`Route ${route.id}: routeEvidence "${re}" is not a known evidence relation`);
      }
    }
    if (!route.name?.en) {
      error(`Route ${route.id}: missing required English name`);
    }
  }
} else {
  console.log("17. No routes defined (skipping).");
}

// ── 18. Independence group consistency ───────────────
if (routeArray.length > 0) {
  console.log("18. Checking independence groups...");
  const groups = new Map();
  for (const route of routeArray) {
    const g = route.independenceGroup;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(route);
  }
  for (const [gid, gRoutes] of groups) {
    const unverified = gRoutes.filter((r) => !r.independenceVerified);
    if (unverified.length > 0 && unverified.length < gRoutes.length) {
      warn(`Independence group "${gid}": ${unverified.length}/${gRoutes.length} routes not verified`);
    }
  }
  console.log(`   ${groups.size} independence group(s): ${[...groups.keys()].join(", ")}`);
} else {
  console.log("18. No routes defined (skipping).");
}

// ── 19. BERM / FieldState architecture boundary ───────
console.log("19. Checking BERM/FieldState architecture boundary...");
const fieldStateModule = architecture.measurementModules?.fieldState;
if (architecture.model?.id !== "berm") {
  error("Architecture manifest must identify BERM as the model");
}
if (architecture.model?.role !== "explanatory_derivational_prediction_model") {
  error("BERM must remain the explanatory, derivational and prediction model");
}
if (fieldStateModule?.role !== "measurement_observation_estimation") {
  error("FieldState must be a measurement/observation/estimation module");
}
if (fieldStateModule?.isModelAlias !== false || fieldStateModule?.isCausalRoot !== false) {
  error("FieldState must not be a model alias or causal root");
}
if (fieldStateModule?.canonicalRoute !== "/measurement/fieldstate") {
  error("FieldState must remain under the canonical measurement route");
}
if (fieldStateModule?.publishesLockedForecasts !== false ||
    architecture.theory?.fieldStateRole !== "optional_measurement_input_only") {
  error("FieldState must remain an optional measurement input and publish no locked forecasts");
}
if (architecture.theory?.l2BridgeStatus !== "conditional_formal_operator") {
  error("The geometry-to-observable L2 bridge must expose the conditional formal operator");
}
if (architecture.theory?.calibrationStatus !== "open") {
  error("The L2 tissue kernels and endpoint calibration must remain explicitly open");
}
if (architecture.routes?.prediction?.fieldStateCalibrated !== false) {
  error("The published v17 prediction route must not be marked FieldState-calibrated");
}
if (architecture.routes?.conditionalAsfr?.acceptsFieldStateObservations !== false) {
  error("The conditional ASFR calculator must not claim to accept FieldState observations");
}

const publicBoundarySources = [
  "app/[locale]/model/page.tsx",
  "app/[locale]/mathematics/page.tsx",
  "app/[locale]/evidence/evolution/page.tsx",
  "components/SolarExplorer.tsx",
].map((relativePath) => ({
  relativePath,
  source: readFileSync(resolve(WEBSITE_DIR, relativePath), "utf-8"),
}));
const forbiddenBoundaryPhrases = [
  "Geomagnetic field creates the χ(Ā) substrate",
  'symbol: "χ(λ)"',
  'title: "χ(Ā) [VGCC]"',
  'title: "χ_B [CRY/RPM]"',
  "χ_tissue candidate",
  "FieldState-derived timing-proxy",
];
for (const { relativePath, source } of publicBoundarySources) {
  for (const phrase of forbiddenBoundaryPhrases) {
    if (source.includes(phrase)) {
      error(`${relativePath}: obsolete BERM/FieldState conflation remains: ${phrase}`);
    }
  }
}

const measurementInputs = new Set([
  "TECHNOLOGY_TIMING_PROXY",
  "FIELDSTATE_VECTOR",
  "FIELDSTATE_ENVELOPE",
  "STATIC_TRIBO_INTERFACE",
  "FIELDSTATE_LOW_FREQUENCY_ELECTRIC",
]);
if (!nodeIds.has("BERM_L2_BRIDGE")) {
  error("Graph is missing the explicit BERM_L2_BRIDGE node");
}
if (!nodeIds.has("LINDGREN_METRIC_DRIVE")) {
  error("Graph is missing the explicit Lindgren theory-premise node");
}
for (const edge of graph.edges) {
  if (measurementInputs.has(edge.from)) {
    if (edge.to !== "BERM_L2_BRIDGE" || edge.kind !== "inference_input") {
      error(`${edge.from} may enter BERM only through an inference_input edge to BERM_L2_BRIDGE`);
    }
  }
  if (edge.from === "LINDGREN_METRIC_DRIVE" &&
      (edge.to !== "BERM_L2_BRIDGE" || edge.kind !== "derived_geometry")) {
    error(`LINDGREN_METRIC_DRIVE edge ${edge.id} must be derived_geometry into BERM_L2_BRIDGE`);
  }
  if (edge.from === "BERM_L2_BRIDGE" && edge.kind !== "conditional_response") {
    error(`BERM_L2_BRIDGE edge ${edge.id} must be labelled conditional_response`);
  }
}

// ── Summary ───────────────────────────────────────────

console.log(`\n${"─".repeat(50)}`);
console.log(
  `Registry validation: ${errors} error(s), ${warnings} warning(s)`
);
console.log(
  `  Graph: ${nodeIds.size} nodes, ${graph.edges.length} edges, ${Object.keys(graph.ui_groups).length} UI groups`
);
console.log(
  `  Claims: ${claims.claims.length} claims, ${claims.evidence_relations.length} evidence relations, ${claims.epistemic_assessments.length} assessments`
);
if (routeArray.length > 0) {
  console.log(
    `  Routes: ${routeArray.length} routes, ${routeIds.size} unique IDs`
  );
}
console.log(`${"─".repeat(50)}\n`);

if (errors > 0) {
  process.exit(1);
}
