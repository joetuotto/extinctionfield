/**
 * @deprecated
 *
 * The former A–F evidence catalogue mixed exposure classes, mechanistic
 * studies, population associations and speculative numerical claims. It is
 * deliberately not used by the public site. New work must use the bounded
 * FieldState–ASFR-v2 register in `fieldstateEvidence.ts`, whose records state
 * their system, translation scope, limitations and the explicit fact that
 * none is a TFR coefficient.
 *
 * This small compatibility module avoids silently reviving the retired
 * catalogue if an external consumer still imports this path.
 */
export {
  FIELDSTATE_EVIDENCE as EVIDENCE,
  type FieldStateEvidenceRecord as EvidenceItem,
} from "./fieldstateEvidence";

export const PATHWAYS = {} as const;

export const EPISTEMIC_LEVELS = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
} as const;
