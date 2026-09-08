import raw from "@/data/technology-drivers.json";
import { fieldReconstruction } from "./field-reconstruction";

export type TechnologyDriverText = { fi: string; en: string };
export interface TechnologyDriverSource {
  id: string; title: string; url: string; license: string; retrievedAt: string;
  scope: TechnologyDriverText;
  artifacts: { path: string; sha256: string; bytes: number }[];
  attribution?: string; publisher?: string;
}
export interface TechnologyDriverPoint {
  year: number; value: number; sourceId: string; sourceLocator: string; imputed: false;
  lower?: number; upper?: number; asOf?: string | null;
  denominator?: { value: number; unit: string; population?: TechnologyDriverText };
}
export interface TechnologyDriverSeries {
  id: string; countryId: string; familyId: string; title: TechnologyDriverText;
  metric: string; unit: string; unitLabel: TechnologyDriverText; scope: TechnologyDriverText;
  sourceIds: string[]; points: TechnologyDriverPoint[]; limitations: TechnologyDriverText[];
  status?: "reported" | "estimate";
  driver?: {
    normalization: "percent" | "ratio" | "reference";
    referenceValue?: number; referenceLabel?: TechnologyDriverText;
    interpretation: TechnologyDriverText;
    /** Smaller numbers select the preferred temporal proxy, not stronger evidence. */
    priority?: number;
  };
}
export interface TechnologyDriversData {
  schemaVersion: 1; edition: string; sources: TechnologyDriverSource[]; series: TechnologyDriverSeries[];
}
export const technologyDriversData = raw as unknown as TechnologyDriversData;
export function getTechnologyDriverSeries(countryId?: string): TechnologyDriverSeries[] {
  return technologyDriversData.series.filter(series => !countryId || series.countryId === countryId);
}
export function getTechnologyDriverSource(id: string): TechnologyDriverSource | undefined {
  return technologyDriversData.sources.find(source => source.id === id);
}

/** Optional visual reconstruction only. No endpoint carry-forward or extrapolation. */
export function getTechnologyDriverValue(series: TechnologyDriverSeries, year: number, interpolate = false): {
  value: number; kind: "observed" | "interpolated"; leftYear: number; rightYear: number;
} | null {
  if (!Number.isFinite(year)) return null;
  const exact = series.points.find(point => point.year === year);
  if (exact) return { value: exact.value, kind: "observed", leftYear: year, rightYear: year };
  if (!interpolate) return null;
  const right = series.points.findIndex(point => point.year > year);
  if (right <= 0) return null;
  const a = series.points[right - 1], b = series.points[right];
  return { value: a.value + (b.value - a.value) * (year - a.year) / (b.year - a.year), kind: "interpolated", leftYear: a.year, rightYear: b.year };
}

export interface TechnologyDriverCoverage {
  familyId: string; status: "series" | "anchors" | "history" | "open";
  seriesIds: string[]; pointCount: number; firstYear: number | null; lastYear: number | null;
}
/** Inventory classification, not an assertion of continuous or national exposure coverage. */
export function getTechnologyDriverCoverage(countryId: string, fromYear = 1800, toYear = 2100): TechnologyDriverCoverage[] {
  if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || fromYear > toYear) throw new RangeError("Ordered integer years required");
  return fieldReconstruction.families.map(family => {
    const series = getTechnologyDriverSeries(countryId).filter(row => row.familyId === family.id);
    const selected = series.map(row => ({ row, points: row.points.filter(point => point.year >= fromYear && point.year <= toYear) })).filter(row => row.points.length);
    const years = [...new Set(selected.flatMap(row => row.points.map(point => point.year)))].sort((a, b) => a - b);
    // Do not combine two incompatible sparse metrics to manufacture a dense series.
    const hasSeries = selected.some(({ points }) => points.length >= 3 && points.some((point, index) => index > 0 && point.year === points[index - 1].year + 1));
    const history = fieldReconstruction.tracks.some(track => track.countryId === countryId && track.familyId === family.id && track.phases.some(phase => phase.startYear <= toYear && phase.endYear >= fromYear));
    return { familyId: family.id, status: hasSeries ? "series" : years.length ? "anchors" : history ? "history" : "open", seriesIds: selected.map(({ row }) => row.id), pointCount: selected.reduce((total, row) => total + row.points.length, 0), firstYear: years[0] ?? null, lastYear: years.at(-1) ?? null };
  });
}

/** Source and unit checks. These data contain no local field or biological calibration. */
export function validateTechnologyDrivers(input: TechnologyDriversData): string[] {
  const errors: string[] = [];
  const text = (value: TechnologyDriverText | undefined) => value && typeof value.en === "string" && value.en.trim() && typeof value.fi === "string" && value.fi.trim();
  const unique = (ids: string[], kind: string) => { if (new Set(ids).size !== ids.length) errors.push(`Duplicate ${kind} id`); };
  if (input.schemaVersion !== 1) errors.push("Unsupported schemaVersion");
  unique(input.sources.map(row => row.id), "source"); unique(input.series.map(row => row.id), "series");
  const sources = new Set(input.sources.map(row => row.id));
  const families = new Set(fieldReconstruction.families.map(row => row.id));
  for (const source of input.sources) {
    if (!source.id || !source.title || !/^https:\/\//.test(source.url) || !source.license || !text(source.scope) || !/^\d{4}-\d{2}-\d{2}$/.test(source.retrievedAt)) errors.push(`Invalid source ${source.id}`);
    if (!source.artifacts.length || source.artifacts.some(artifact => !artifact.path || artifact.path.startsWith("/") || artifact.path.split("/").includes("..") || !/^[a-f0-9]{64}$/.test(artifact.sha256) || !(artifact.bytes > 0))) errors.push(`Invalid source artifacts ${source.id}`);
  }
  for (const series of input.series) {
    const fail = (message: string) => errors.push(`${series.id}: ${message}`);
    if (!families.has(series.familyId)) fail("Unknown family");
    if (!["FIN", "USA", "GBR", "DEU", "JPN", "FRA", "WORLD"].includes(series.countryId)) fail("Unknown country");
    if (![series.title, series.unitLabel, series.scope, ...series.limitations].every(text) || !series.metric || !series.unit) fail("Bilingual metric metadata required");
    if (!series.sourceIds.length || series.sourceIds.some(id => !sources.has(id))) fail("Unknown source");
    if (!series.points.length) fail("Observations required");
    series.points.forEach((point, index) => {
      if (!Number.isInteger(point.year) || point.year < 1800 || point.year > 2024 || !Number.isFinite(point.value) || point.imputed !== false || !point.sourceLocator || !series.sourceIds.includes(point.sourceId)) fail("Invalid observation");
      if (index > 0 && point.year <= series.points[index - 1].year) fail("Observation years must be unique and ordered");
      if (point.denominator && (!Number.isFinite(point.denominator.value) || point.denominator.value <= 0 || !point.denominator.unit)) fail("Positive documented denominator required");
      if (point.lower !== undefined && (!Number.isFinite(point.lower) || point.lower > point.value)) fail("Invalid lower bound");
      if (point.upper !== undefined && (!Number.isFinite(point.upper) || point.upper < point.value)) fail("Invalid upper bound");
      if (series.driver?.normalization === "ratio" && !point.denominator) fail("Ratio normalization needs each observation's denominator");
      if (series.driver?.normalization === "percent" && (point.value < 0 || point.value > 100)) fail("Percent outside 0–100");
    });
    if (series.driver) {
      if (!["percent", "ratio", "reference"].includes(series.driver.normalization) || !text(series.driver.interpretation)) fail("Invalid normalization");
      if (series.driver.normalization === "reference" && (!(Number(series.driver.referenceValue) > 0) || !Number.isFinite(series.driver.referenceValue) || !text(series.driver.referenceLabel))) fail("Positive named reference required");
    }
  }
  return errors;
}
