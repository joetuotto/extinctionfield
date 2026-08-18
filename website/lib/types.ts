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
}

export interface ChainNode {
  id: string;
  level: number;
  label: string;
  sublabel?: string;
  epistemicLevel: EpistemicLevel;
  title: string;
  mechanism: string;
  lindgrenInterpretation?: string;
  quantitative?: string;
  recoveryAlpha?: number;
  recoveryTimescale?: string;
  keyReferences: Reference[];
  bermComponent?: string;
  falsificationCondition?: string;
}

export interface ChainEdge {
  from: string;
  to: string;
  label?: string;
  derivative?: string;
  epistemicLevel: EpistemicLevel;
  priority?: "primary" | "secondary";
}
