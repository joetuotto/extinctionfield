export interface PredictionVersion {
  version: string;
  central: number;
  ci: [number, number];
  date: string;
  changeReason: string;
  gitSha?: string;
}

export interface LockedPrediction {
  id: string;
  country: string;
  countryLabel: string;
  year: number;
  metric: string;
  metricLabel: string;
  central: number;
  ciLow: number;
  ciHigh: number;
  lockedDate: string;
  modelVersion: string;
  gitSha: string;
  actual?: number;
  status: "pending" | "confirmed" | "refuted" | "partial";
  unit: string;
  history?: PredictionVersion[];
}

export type EpistemicLevel = "E" | "M|C" | "M" | "C" | "L*" | "L";

export interface EvidenceItem {
  pathway: string;
  study: string;
  year: number;
  finding: string;
  level: EpistemicLevel;
  n?: number;
}

export interface Reference {
  authors: string;
  title: string;
  journal: string;
  keyFinding: string;
  keyFinding_en?: string;
}

export type ReferenceStudyType =
  | "review"
  | "meta"
  | "umbrella"
  | "experimental"
  | "mechanistic"
  | "animal"
  | "human_obs"
  | "cohort"
  | "rct"
  | "clinical"
  | "observational"
  | "case"
  | "theory"
  | "theoretical"
  | "book";

export interface ReferenceEntry {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  n: number | null;
  type: ReferenceStudyType;
  level: EpistemicLevel | "H";
  pathway: string[];
  finding: string;
  tags: string[];
}

export interface ChainNode {
  id: string;
  level: number;
  label: string;
  label_en?: string;
  sublabel?: string;
  sublabel_en?: string;
  epistemicLevel: EpistemicLevel;
  title: string;
  title_en?: string;
  mechanism: string;
  mechanism_en?: string;
  lindgrenInterpretation?: string;
  lindgrenInterpretation_en?: string;
  quantitative?: string;
  quantitative_en?: string;
  recoveryAlpha?: number;
  recoveryTimescale?: string;
  recoveryTimescale_en?: string;
  keyReferences: Reference[];
  bermComponent?: string;
  falsificationCondition?: string;
  falsificationCondition_en?: string;
}

export interface ChainEdge {
  from: string;
  to: string;
  label?: string;
  label_en?: string;
  derivative?: string;
  epistemicLevel: EpistemicLevel;
  priority?: "primary" | "secondary";
}
