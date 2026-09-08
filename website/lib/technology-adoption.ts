import raw from "@/public/data/technology-adoption.json";

export type AdoptionText = { en: string; fi: string };
export interface AdoptionSource {
  id: string;
  title: string;
  url: string;
  publishedAt: string | null;
  retrievedAt: string;
  referenceId: string | null;
  rawPath: string;
  sha256: string;
  bytes: number;
  readingLevel: string;
}
export interface AdoptionPoint {
  year: number;
  asOf: string | null;
  value: number;
  denominator: { value: number; unit: string; population: AdoptionText } | null;
  observationType: "reported_count" | "reported_estimate";
  precision: "integer" | "rounded";
  sourceId: string;
  sourceLocator: string;
  imputed: false;
}
export interface AdoptionSeries {
  id: string;
  technologyId: string;
  label: AdoptionText;
  geography: { code: string; name: AdoptionText };
  metric: string;
  unit: "meters" | "percent" | "devices";
  coverage: AdoptionText;
  frequency: "annual" | "sparse";
  points: AdoptionPoint[];
  limitations: AdoptionText[];
}
export interface AdoptionDataset {
  schemaVersion: number;
  releaseId: string;
  generatedFromManifest: string;
  scope: "imported_technology_history";
  exposureMapping: "not_calibrated";
  interpolation: "none";
  sources: AdoptionSource[];
  series: AdoptionSeries[];
  existingDatasets: { id: string; label: AdoptionText; kind: "proxy" | "measurement" | "scenario"; paths: string[]; url: string; scope: AdoptionText; imported: false }[];
  dataGaps: { id: string; technologyId: string; status: "missing"; label: AdoptionText; needed: AdoptionText }[];
}

/** Physical-history input; never an exposure score or a biological coefficient. */
export const technologyAdoption = raw as AdoptionDataset;

/** Only count series with a positive, matching-unit denominator can show shares. */
export function canShowAdoptionShare(series: AdoptionSeries): boolean {
  return series.unit !== "percent" && series.points.length > 0 && series.points.every(
    (p) => p.denominator !== null && p.denominator.unit === series.unit && p.denominator.value > 0,
  );
}

export function adoptionValue(point: AdoptionPoint, share: boolean): number {
  if (!share) return point.value;
  if (!point.denominator || point.denominator.value <= 0) throw new RangeError("A positive denominator is required");
  return 100 * point.value / point.denominator.value;
}

/** Connecting lines guide the eye between adjacent annual reports only. */
export function annualAdoptionSegments(series: AdoptionSeries): [AdoptionPoint, AdoptionPoint][] {
  if (series.frequency !== "annual") return [];
  const points = [...series.points].sort((a, b) => a.year - b.year);
  return points.slice(1).flatMap((point, i) => point.year === points[i].year + 1 ? [[points[i], point] as [AdoptionPoint, AdoptionPoint]] : []);
}
