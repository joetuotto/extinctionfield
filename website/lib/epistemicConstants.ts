import type { EpistemicLevel } from "./types";

export const CHAIN_EPISTEMIC_COLORS: Record<EpistemicLevel, string> = {
  L: "#6B7280",
  "L*": "#9CA3AF",
  M: "#3B82F6",
  C: "#F59E0B",
  "M|C": "#8B5CF6",
  E: "#10B981",
  "L1+L0/L2": "#0EA5E9",
  L1: "#0284C7",
  KANDIDAATTI: "#DB2777",
};

export const CHAIN_EPISTEMIC_LABELS_EN: Record<EpistemicLevel, string> = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
  "L1+L0/L2": "L1 derivation + explicit L0/L2 reduction",
  L1: "L1 conditional derivation from the ansatz",
  KANDIDAATTI: "Candidate assumption, not derived",
};

export const CHAIN_EPISTEMIC_LABELS_FI: Record<EpistemicLevel, string> = {
  L: "Teoreettinen premissi",
  "L*": "Testattava teoriakandidaatti",
  M: "Mekanistinen välivaihe",
  C: "Havaintopohjainen assosiaatio",
  "M|C": "Mekanismi + assosiaatio (ei koko reittiä)",
  E: "Toistettu komponenttilöydös / päätepiste",
  "L1+L0/L2": "L1-johto + eksplisiittinen L0/L2-reduktio",
  L1: "L1-ehdollinen johto ansatzista",
  KANDIDAATTI: "Kandidaatin oletus, ei johdettu",
};

/** @deprecated Use CHAIN_EPISTEMIC_LABELS_FI or _EN */
export const CHAIN_EPISTEMIC_LABELS = CHAIN_EPISTEMIC_LABELS_FI;

const CHAIN_EPISTEMIC_LABELS_ALL: Record<string, Record<EpistemicLevel, string>> = {
  en: CHAIN_EPISTEMIC_LABELS_EN,
  fi: CHAIN_EPISTEMIC_LABELS_FI,
  ja: { L: "理論的前提", "L*": "検証可能な理論候補", M: "メカニズム的中間段階", C: "観察的関連", "M|C": "メカニズム＋関連（全経路ではない）", E: "再現された構成要素の発見／終点", "L1+L0/L2": "L1導出＋明示的L0/L2縮約", L1: "アンザッツからのL1条件付き導出", KANDIDAATTI: "候補の仮定（導出されていない）" },
  fr: { L: "Prémisse théorique", "L*": "Candidat théorique testable", M: "Intermédiaire mécanistique", C: "Association observationnelle", "M|C": "Mécanisme + association (pas la route complète)", E: "Constatation répétée / point final", "L1+L0/L2": "Dérivation L1 + réduction L0/L2 explicite", L1: "Dérivation conditionnelle L1 de l'ansatz", KANDIDAATTI: "Hypothèse candidate, non dérivée" },
  ko: { L: "이론적 전제", "L*": "검증 가능한 이론 후보", M: "기전적 중간 단계", C: "관찰적 연관", "M|C": "기전 + 연관 (전체 경로 아님)", E: "반복된 구성요소 발견 / 종점", "L1+L0/L2": "L1 도출 + 명시적 L0/L2 축약", L1: "안자츠로부터의 L1 조건부 도출", KANDIDAATTI: "후보 가정, 도출되지 않음" },
};

export function getChainEpistemicLabel(level: EpistemicLevel, locale: string): string {
  return (CHAIN_EPISTEMIC_LABELS_ALL[locale] ?? CHAIN_EPISTEMIC_LABELS_ALL.en)[level];
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
  fi: { E: "Empiirinen", "M|C": "Mekanismi + assosiaatio", C: "Arvailullinen", L: "Lindgren-geometria" },
  ja: { E: "実証的", "M|C": "メカニズム＋関連", C: "推測的", L: "リンドグレン幾何学" },
  fr: { E: "Empirique", "M|C": "Mécanisme + association", C: "Conjectural", L: "Géométrie de Lindgren" },
  ko: { E: "경험적", "M|C": "기전 + 연관", C: "상관적", L: "린드그렌 기하학" },
};
