import raw from "@/data/testosterone-trends.json";

export type TestosteroneTrendText = { fi: string; en: string };
export type TestosteroneTrendCountryId = "FIN" | "USA" | "GBR" | "DEU" | "JPN";
export type TestosteroneTrendIntervalKind = "percentile_5_95" | "standard_error";
export type TestosteroneTrendYearBasis = "unique-survey-age-cohort-intersection" | "early-surveys-not-disaggregated" | "later-survey" | "reported-survey-period";
export interface TestosteroneTrendSource {
  id: string;
  title: string;
  doi: string;
  url: string;
  readCopyUrl: string;
  retrievedAt: string;
  sourceType: "primary_publication";
  readingLevel: string;
  scope: TestosteroneTrendText;
  license: string;
  surveyYears?: number[];
  artifacts: { path: string; bytes: number; sha256: string }[];
}
export interface TestosteroneTrendPoint {
  /** Rounded midpoint for display only. It is not a measurement year for a pooled period. */
  year: number;
  startYear: number;
  endYear: number;
  /** Eligible collection years; gaps in this array are not observed years. */
  collectionYears: number[];
  collectionYearBasis: TestosteroneTrendYearBasis;
  value: number;
  n: number;
  lower?: number;
  upper?: number;
  standardError?: number;
  intervalKind: TestosteroneTrendIntervalKind;
  sourceId: string;
  sourceCellId?: string;
  sourceLocator: string;
  imputed: false;
  birthCohortStart?: number;
  birthCohortEnd?: number;
}
export interface TestosteroneTrendSeries {
  id: string;
  countryId: TestosteroneTrendCountryId;
  datasetFamily: "hormone";
  metric: "testosterone_total";
  unit: "nmol_per_l" | "ng_per_dl";
  unitLabel: TestosteroneTrendText;
  status: "estimate";
  frequency: "survey_period";
  valueScale: "linear";
  statistic: "median" | "arithmetic_mean";
  sourceIds: string[];
  ageGroup: string;
  preferredForCountry: boolean;
  title: TestosteroneTrendText;
  population: TestosteroneTrendText;
  adjustment: TestosteroneTrendText;
  assay: TestosteroneTrendText;
  comparability: TestosteroneTrendText;
  limitations: TestosteroneTrendText[];
  points: TestosteroneTrendPoint[];
}
export interface TestosteroneTrendsData {
  schemaVersion: 1;
  updatedAt: string;
  preferredSeriesByCountry: Partial<Record<TestosteroneTrendCountryId, string>>;
  sources: TestosteroneTrendSource[];
  series: TestosteroneTrendSeries[];
  coverageGaps: { countryId: TestosteroneTrendCountryId; reason: TestosteroneTrendText }[];
}

const COUNTRIES = ["FIN", "USA", "GBR", "DEU", "JPN"];
const YEAR_BASES: TestosteroneTrendYearBasis[] = ["unique-survey-age-cohort-intersection", "early-surveys-not-disaggregated", "later-survey", "reported-survey-period"];
const record = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const nonempty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const finite = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const text = (v: unknown) => record(v) && nonempty(v.fi) && nonempty(v.en);
const years = (v: unknown): v is number[] => Array.isArray(v) && v.length > 0 && v.every((y, i) => Number.isInteger(y) && y >= 1900 && y <= 2023 && (i === 0 || y > v[i - 1]));
const isoDate = (v: unknown) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v));
const https = (v: unknown) => typeof v === "string" && /^https:\/\/[^\s]+$/.test(v);

/** Validate published cells and temporal boundaries, without fitting a trend or a biological response. */
export function validateTestosteroneTrendsData(input: unknown): string[] {
  const errors: string[] = [];
  const check = (condition: unknown, message: string) => { if (!condition) errors.push(message); };
  if (!record(input)) return ["Testosterone data must be an object"];
  check(input.schemaVersion === 1, "Unsupported schemaVersion");
  check(isoDate(input.updatedAt), "updatedAt must be an ISO date");
  if (!Array.isArray(input.sources) || !Array.isArray(input.series) || !Array.isArray(input.coverageGaps) || !record(input.preferredSeriesByCountry)) {
    return [...errors, "sources, series, coverageGaps and preferredSeriesByCountry required"];
  }
  const sources = new Map<string, Record<string, unknown>>();
  for (const source of input.sources) {
    if (!record(source)) { errors.push("Invalid source"); continue; }
    const id = String(source.id);
    check(nonempty(source.id) && !sources.has(id), `Invalid/duplicate source: ${id}`);
    sources.set(id, source);
    check(nonempty(source.title) && nonempty(source.doi) && nonempty(source.license) && nonempty(source.readingLevel), `${id}: source identity, reading level and licence required`);
    check(https(source.url) && https(source.readCopyUrl) && isoDate(source.retrievedAt) && text(source.scope), `${id}: source URL, date and scope required`);
    check(source.sourceType === "primary_publication", `${id}: primary publication required`);
    if (source.surveyYears !== undefined) check(years(source.surveyYears), `${id}: invalid survey years`);
    check(Array.isArray(source.artifacts) && source.artifacts.length > 0, `${id}: source artifacts required`);
    if (Array.isArray(source.artifacts)) for (const artifact of source.artifacts) {
      check(record(artifact) && nonempty(artifact.path) && !artifact.path.startsWith("/") && !artifact.path.split("/").includes("..")
        && Number.isSafeInteger(artifact.bytes) && (artifact.bytes as number) > 0
        && typeof artifact.sha256 === "string" && /^[a-f0-9]{64}$/.test(artifact.sha256), `${id}: invalid artifact`);
    }
  }
  const seriesById = new Map<string, Record<string, unknown>>();
  for (const series of input.series) {
    if (!record(series)) { errors.push("Invalid series"); continue; }
    const id = String(series.id);
    check(nonempty(series.id) && !seriesById.has(id), `Invalid/duplicate series: ${id}`);
    seriesById.set(id, series);
    check(typeof series.countryId === "string" && COUNTRIES.includes(series.countryId), `${id}: unknown country`);
    check(series.datasetFamily === "hormone" && series.metric === "testosterone_total" && series.status === "estimate"
      && series.frequency === "survey_period" && series.valueScale === "linear", `${id}: unsupported observation kind`);
    check(["nmol_per_l", "ng_per_dl"].includes(String(series.unit)), `${id}: unsupported unit`);
    check(["median", "arithmetic_mean"].includes(String(series.statistic)), `${id}: unsupported statistic`);
    check(typeof series.ageGroup === "string" && /^\d{2}-\d{2}$/.test(series.ageGroup), `${id}: explicit age group required`);
    check(typeof series.preferredForCountry === "boolean", `${id}: preferred status required`);
    for (const field of ["title", "unitLabel", "population", "adjustment", "assay", "comparability"]) check(text(series[field]), `${id}.${field}: fi/en required`);
    check(Array.isArray(series.limitations) && series.limitations.length > 0 && series.limitations.every(text), `${id}: limitations required`);
    const refs = Array.isArray(series.sourceIds) ? series.sourceIds : [];
    check(refs.length > 0 && refs.every(ref => typeof ref === "string" && sources.has(ref)) && new Set(refs).size === refs.length, `${id}: unknown/duplicate source reference`);
    if (!Array.isArray(series.points) || !series.points.length) { errors.push(`${id}: points required`); continue; }
    let previousEnd = -Infinity;
    for (const point of series.points) {
      if (!record(point)) { errors.push(`${id}: invalid point`); continue; }
      const loc = `${id}:${point.year}`;
      check(Number.isInteger(point.startYear) && Number.isInteger(point.endYear) && (point.startYear as number) >= 1900
        && (point.endYear as number) <= 2023 && (point.startYear as number) <= (point.endYear as number)
        && (point.startYear as number) > previousEnd, `${loc}: invalid, overlapping or projected period`);
      previousEnd = finite(point.endYear) ? point.endYear : Infinity;
      check(point.year === Math.round(((point.startYear as number) + (point.endYear as number)) / 2), `${loc}: year must be the rounded display midpoint`);
      check(finite(point.value) && point.value > 0 && Number.isSafeInteger(point.n) && (point.n as number) > 0, `${loc}: positive published value and sample size required`);
      check(point.imputed === false, `${loc}: imputed values are not observations`);
      check(typeof point.sourceId === "string" && sources.has(point.sourceId) && refs.includes(point.sourceId) && nonempty(point.sourceLocator), `${loc}: unknown point source or locator`);
      check(YEAR_BASES.includes(point.collectionYearBasis as TestosteroneTrendYearBasis), `${loc}: collection-year basis required`);
      const collections = point.collectionYears;
      check(years(collections) && collections[0] === point.startYear && collections.at(-1) === point.endYear, `${loc}: collection years must retain period boundaries`);
      if (point.intervalKind === "percentile_5_95") {
        check(series.statistic === "median" && finite(point.lower) && finite(point.upper) && finite(point.value)
          && point.lower <= point.value && point.value <= point.upper && point.standardError === undefined, `${loc}: invalid distribution percentiles`);
      } else if (point.intervalKind === "standard_error") {
        check(series.statistic === "arithmetic_mean" && finite(point.standardError) && point.standardError > 0
          && point.lower === undefined && point.upper === undefined, `${loc}: preserve published SE without invented bounds`);
      } else errors.push(`${loc}: unsupported interval kind; percentiles and SE are not confidence intervals`);
      if (point.collectionYearBasis === "unique-survey-age-cohort-intersection") {
        const source = sources.get(String(point.sourceId));
        const surveyYears = source?.surveyYears;
        const [minAge, maxAge] = String(series.ageGroup).split("-").map(Number);
        check(Number.isInteger(point.birthCohortStart) && Number.isInteger(point.birthCohortEnd)
          && (point.birthCohortStart as number) <= (point.birthCohortEnd as number), `${loc}: birth-cohort bounds required`);
        const eligible = years(surveyYears) && Number.isInteger(point.birthCohortStart) && Number.isInteger(point.birthCohortEnd)
          ? surveyYears.filter(year => year - (point.birthCohortStart as number) >= minAge && year - (point.birthCohortEnd as number) - 1 <= maxAge) : [];
        check(eligible.length === 1 && years(collections) && collections.length === 1 && eligible[0] === collections[0], `${loc}: collection year is not uniquely implied by survey, age and cohort`);
      }
      if (point.collectionYearBasis === "early-surveys-not-disaggregated") check(years(collections) && collections.length > 1 && series.statistic === "median", `${loc}: preserve pooled median years`);
      if (point.collectionYearBasis === "later-survey") check(years(collections) && collections.length === 1, `${loc}: later survey must retain its exact year`);
    }
  }
  for (const [country, id] of Object.entries(input.preferredSeriesByCountry)) {
    const series = typeof id === "string" ? seriesById.get(id) : undefined;
    check(COUNTRIES.includes(country) && series?.countryId === country && series?.preferredForCountry === true, `Invalid preferred series for ${country}`);
  }
  for (const gap of input.coverageGaps) check(record(gap) && typeof gap.countryId === "string" && COUNTRIES.includes(gap.countryId) && text(gap.reason), "Invalid coverage gap");
  return errors;
}

const validationErrors = validateTestosteroneTrendsData(raw);
if (validationErrors.length) throw new Error(`Invalid testosterone trends: ${validationErrors.join("; ")}`);
export const testosteroneTrendsData = raw as TestosteroneTrendsData;
export function getTestosteroneTrendSeries(countryId?: string): TestosteroneTrendSeries[] {
  return testosteroneTrendsData.series.filter(series => !countryId || series.countryId === countryId);
}
export function getTestosteroneTrendSource(id: string): TestosteroneTrendSource | undefined {
  return testosteroneTrendsData.sources.find(source => source.id === id);
}
