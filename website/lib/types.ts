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
  actual?: number;
  status: "pending" | "confirmed" | "refuted" | "partial";
  unit: string;
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
