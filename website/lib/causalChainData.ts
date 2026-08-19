import type { ChainEdge, ChainNode, EpistemicLevel } from "./types";

/**
 * Shared epistemic presentation metadata for the FieldState–ASFR-v2 graph.
 * The previous A–F scalar graph is intentionally retired.  The active node
 * data live in `causalChainV2Data.ts` and use semantic organ names.
 */
export const EPISTEMIC_COLORS: Record<EpistemicLevel, string> = {
  L: "#6B7280",
  "L*": "#9CA3AF",
  M: "#3B82F6",
  C: "#F59E0B",
  "M|C": "#8B5CF6",
  E: "#10B981",
};

export const EPISTEMIC_LABELS: Record<EpistemicLevel, string> = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
};

export const LEVEL_TITLES: Record<number, string> = {
  1: "Field state",
  2: "Biological intermediates",
  3: "Organ-specific barriers",
  4: "Reproductive states",
  5: "Couple state",
  6: "Age-specific fertility",
  7: "Demographic endpoint",
};

/** Compatibility exports: the retired graph has no active nodes or edges. */
export const NODES: ChainNode[] = [];
export const EDGES: ChainEdge[] = [];
