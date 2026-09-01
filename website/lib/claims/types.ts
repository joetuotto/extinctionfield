import type { Locale } from "@/lib/i18n";

// ── Epistemic levels ──────────────────────────────────────
// NOT a weak→strong scale.
// L  = theoretical premise
// L* = testable theory candidate
// M  = mechanistic intermediate (in vitro / animal)
// C  = observed association
// M|C = mechanism and association, but not the full route
// E  = repeated component finding or endpoint
// E does NOT mean "the full route is established".
export type EpistemicLevel = "L" | "L*" | "M" | "C" | "M|C" | "E";

// ── 1. Reference ────────────────────────────────────────
// Pure bibliography. No interpretation. No epistemic level.
// Lives in references_full.json — this type mirrors it.
export interface Reference {
  id: string;
  authors: string;
  year: number | null;
  title: string;
  journal: string | null;
  doi: string | null;
  pmid: string | number | null;
  url: string | null;
  verified: boolean;
}

// ── 2. Claim ────────────────────────────────────────────
// ID encodes no mutable interpretation.
// WRONG:  "CLAIM-VGCC-SECONDARY-001"
// RIGHT:  "claim.vgcc.geometric-coupling-role"
export interface Claim {
  id: string;
  statement: Partial<Record<Locale, {
    text: string;
    sourceRevision: number;
    reviewedAt?: string;
  }>>;
  kind: ClaimKind;
  lifecycle: "draft" | "reviewed" | "active" | "deprecated" | "superseded";
  target:
    | { type: "node"; nodeId: string }
    | { type: "edge"; edgeId: string }
    | { type: "route"; routeId: string }
    | { type: "modelArtifact"; artifactId: string }
    | { type: "method" };
  depends_on: string[];
  supersedes: string[];
  scope: {
    supports: string[];
    does_not_support: string[];
  };
  falsification_condition: string | null;
}

export type ClaimKind =
  | "measurement"
  | "proxy_interpretation"
  | "mechanistic_step"
  | "theoretical_premise"
  | "model_derived"
  | "prediction"
  | "interpretation"
  | "open_assumption"
  | "methodological"
  | "orphaned_finding"
  | "historical";

// ── 3. EvidenceRelation ─────────────────────────────────
// JOIN table: Reference × Claim.
// Role is ALWAYS curated — never inferred automatically.
export interface EvidenceRelation {
  id: string;
  referenceId: string;
  claimId: string;
  relation: "supports" | "challenges" | "contextualizes" | "method";
  directness: string;
  studyDesign: string;
  applicability: string;
  calibrationRole: "structural_only" | "context_only" | "calibration";
  limitations: string[];
  curatorId: string;
  curatedAt: string;
  curatorNote: string | null;
}

// ── 4. EpistemicAssessment ──────────────────────────────
// Separate from the claim. Same claim can get different
// assessments in different revisions or by different assessors.
export interface EpistemicAssessment {
  id: string;
  claimId: string;
  revision: number;
  level: EpistemicLevel;
  compatibility: "current" | "incomplete" | "outdated" | "contradicted";
  origin: "derived" | "emergent" | "imported" | "open";
  basis: string[];
  assessorId: string;
  assessedAt: string;
  note: string | null;
}

// ── 5. ContentAnchor ────────────────────────────────────
// No line numbers — they go stale immediately.
// Components embed stable identifiers:
//   <ClaimRef claimId="claim.vgcc.geometric-coupling-role" />
// ContentAnchor records are generated from those identifiers.
export interface ContentAnchor {
  id: string;
  claimId: string;
  file: string;
  anchorId: string;
  language: Locale;
}

// ── 6. RouteDefinition ──────────────────────────────────
// Curated evidence route. Added ONLY after independence check.
export interface RouteDefinition {
  id: string;
  name: Partial<Record<Locale, string>>;
  description: Partial<Record<Locale, string>>;
  targetClaim: string;
  routeClaims: string[];
  routeEvidence: string[];
  sharedAssumptions: string[];
  sharedDatasets: string[];
  independenceGroup: string;
  independenceVerified: boolean;
  independenceNote: string | null;
  direction: "supports" | "challenges" | "mixed";
  alternativeCompatibility: string;
  discriminatingPower: string;
}

// ── 7. ReleaseManifest ──────────────────────────────────
// No hardcoded counters. No error lists. No line numbers.
// Only identifiers and pointers to canonical data.
export interface ReleaseManifest {
  ontologyVersion: string;
  claimRegistryRevision: number;
  evidenceSnapshotId: string;
  modelArtifactId: string;
  parameterSetId: string;
  datasetSnapshotId: string;
  predictionLockVersion: string;
  contentReleaseId: string;
  commitSha: string;
  registryDigest: string;
}

// ── Causal graph types (from causal-graph.yaml) ─────────

export interface CausalGraphNode {
  id: string;
  label: Partial<Record<Locale, string>>;
  layer: string;
  parents: string[];
  children: string[];
  calibration_status: string;
  prediction_role: string;
  legacy_aliases: string[];
}

export interface CausalGraphEdge {
  id: string;
  from: string;
  to: string;
  label: string;
}

export interface CausalGraphUIGroup {
  id: string;
  contains: string[];
  ui_level: number;
}

export interface CausalGraph {
  version: string;
  nodes: Record<string, CausalGraphNode>;
  edges: Record<string, CausalGraphEdge>;
  ui_groups: Record<string, CausalGraphUIGroup>;
}

// ── Translation sync helpers ────────────────────────────

export interface OutdatedTranslation {
  claimId: string;
  locale: string;
  behind: number; // -1 = missing entirely
}
