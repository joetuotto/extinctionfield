import type { EpistemicLevel } from "./types";

export const CHAIN_EPISTEMIC_COLORS: Record<EpistemicLevel, string> = {
  L: "#6B7280",
  "L*": "#9CA3AF",
  M: "#3B82F6",
  C: "#F59E0B",
  "M|C": "#8B5CF6",
  E: "#10B981",
};

export const CHAIN_EPISTEMIC_LABELS: Record<EpistemicLevel, string> = {
  L: "Premissi",
  "L*": "Premissi (ei validoitu)",
  M: "Matemaattinen seuraus",
  C: "Ehdokas",
  "M|C": "Välttämätön seuraus",
  E: "Empiirisesti vahvistettu",
};

type MapEpistemicLevel = "E" | "M|C" | "C" | "L";

export const MAP_EPISTEMIC_COLORS: Record<MapEpistemicLevel, string> = {
  E: "#22C55E",
  "M|C": "#F59E0B",
  C: "#EF4444",
  L: "#8B5CF6",
};

export const MAP_EPISTEMIC_LABELS: Record<string, Record<MapEpistemicLevel, string>> = {
  en: { E: "Empirical", "M|C": "Mechanistic/Conjectural", C: "Conjectural", L: "Lindgren geometry" },
  fi: { E: "Empiirinen", "M|C": "Mekanistinen/Konjekturaalinen", C: "Konjekturaalinen", L: "Lindgren-geometria" },
};
