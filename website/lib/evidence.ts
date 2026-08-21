/**
 * Unified BERM v19 evidence registry.
 *
 * Re-exports the bounded FieldState study-to-node records and the extended
 * legacy catalogue through a single import path.
 */

export {
  FIELDSTATE_EVIDENCE,
  FIELDSTATE_EVIDENCE_COUNT,
  LEGACY_EVIDENCE_MIGRATION,
  causalNodeLabels,
  type FieldStateDirectness,
  type FieldStateCalibrationRole,
  type FieldStateEvidenceRecord,
} from "./fieldstateEvidence";

export {
  LEGACY_EVIDENCE_CATALOGUE,
  LEGACY_EVIDENCE_COUNT,
  PATHWAY_LABELS,
  STATUS_LABELS,
  EVIDENCE_LEVEL_LABELS,
  type LegacyEvidenceRecord,
} from "./legacyEvidenceCatalogue";

export const EPISTEMIC_LEVELS = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
} as const;
