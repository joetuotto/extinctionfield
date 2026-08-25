import type { EpistemicLevel } from "./types";

export const CHAIN_EPISTEMIC_COLORS: Record<EpistemicLevel, string> = {
  L: "#6B7280",
  "L*": "#9CA3AF",
  M: "#3B82F6",
  C: "#F59E0B",
  "M|C": "#8B5CF6",
  E: "#10B981",
};

export const CHAIN_EPISTEMIC_LABELS_EN: Record<EpistemicLevel, string> = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
};

export const CHAIN_EPISTEMIC_LABELS_FI: Record<EpistemicLevel, string> = {
  L: "Teoreettinen premissi",
  "L*": "Testattava teoriakandidaatti",
  M: "Mekanistinen välivaihe",
  C: "Havaintopohjainen assosiaatio",
  "M|C": "Mekanismi + assosiaatio (ei koko reittiä)",
  E: "Toistettu komponenttilöydös / päätepiste",
};

/** @deprecated Use CHAIN_EPISTEMIC_LABELS_FI or _EN */
export const CHAIN_EPISTEMIC_LABELS = CHAIN_EPISTEMIC_LABELS_FI;

export function getChainEpistemicLabel(level: EpistemicLevel, locale: string): string {
  return locale === "fi" ? CHAIN_EPISTEMIC_LABELS_FI[level] : CHAIN_EPISTEMIC_LABELS_EN[level];
}

type MapEpistemicLevel = "E" | "M|C" | "C" | "L";

export const MAP_EPISTEMIC_COLORS: Record<MapEpistemicLevel, string> = {
  E: "#22C55E",
  "M|C": "#F59E0B",
  C: "#EF4444",
  L: "#8B5CF6",
};

export const MAP_EPISTEMIC_LABELS: Record<string, Record<MapEpistemicLevel, string>> = {
  en: { E: "Empirical", "M|C": "Mechanism + association", C: "Conjectural", L: "Lindgren geometry" },
  fi: { E: "Empiirinen", "M|C": "Mekanismi + assosiaatio", C: "Konjekturaalinen", L: "Lindgren-geometria" },
};
