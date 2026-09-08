import raw from "@/data/change-atlas.json";
import { technologyDriversData } from "./technology-drivers-data";
import { testosteroneTrendsData } from "./testosterone-trends-data";

export type ChangeAtlasText = { fi: string; en: string };
export type ChangeAtlasCountryId = "FIN" | "USA" | "GBR" | "DEU" | "JPN";
export type ChangeAtlasFamily = "fertility" | "technology" | "health" | "ecology" | "hormone";
export type ChangeAtlasMetric = "tfr" | "asfr" | "mobile_subscriptions" | "diabetes_prevalence" | "butterfly_abundance" | "testosterone_total" | `technology_${string}`;
export type ChangeAtlasUnit = "births_per_woman" | "births_per_1000_women" | "subscriptions_per_100_people" | "percent" | "log10_index" | "ng_per_ml" | "nmol_per_l" | "ng_per_dl" | "relative_index" | `technology_unit_${string}`;
export interface ChangeAtlasSource {
  id: string;
  title: string;
  url: string;
  license: string;
  retrievedAt: string;
  scope: ChangeAtlasText;
  artifacts: { path: string; sha256: string; bytes: number }[];
  attribution?: string;
}
export interface ChangeAtlasPoint {
  year: number;
  value: number;
  startYear?: number;
  endYear?: number;
  period?: ChangeAtlasText;
  lower: number | null;
  upper: number | null;
  n?: number;
  nSites?: number;
  standardError?: number;
  intervalKind?: "confidence_95" | "percentile_5_95" | "standard_error" | "none";
  collectionYears?: number[];
  collectionYearBasis?: string;
  birthCohortStart?: number;
  birthCohortEnd?: number;
  sourceId: string;
  sourceLocator: string;
  imputed: false;
  denominator?: unknown;
}
export interface ChangeAtlasSeries {
  id: string;
  countryId: ChangeAtlasCountryId;
  datasetFamily: ChangeAtlasFamily;
  metric: ChangeAtlasMetric;
  title: ChangeAtlasText;
  unit: ChangeAtlasUnit;
  unitLabel: ChangeAtlasText;
  status: "estimate" | "reported";
  frequency: "annual" | "survey_period";
  /** UKBMS values are already log10: relative change is 100 * 10 ** (value - baseline). */
  valueScale: "linear" | "log10";
  population: ChangeAtlasText;
  sourceIds: string[];
  ageGroup?: string;
  species?: { scientific: string; fi: string; en: string };
  method: ChangeAtlasText;
  limitations: ChangeAtlasText[];
  points: ChangeAtlasPoint[];
  technologyFamilyId?: string;
  driverSeriesId?: string;
  testosteroneTrendId?: string;
  statistic?: "median" | "arithmetic_mean" | "adjusted_mean";
}
export interface ChangeAtlasData {
  schemaVersion: 1;
  updatedAt: string;
  defaultRange: { startYear: number; endYear: number };
  countries: { id: ChangeAtlasCountryId; name: ChangeAtlasText }[];
  sources: ChangeAtlasSource[];
  series: ChangeAtlasSeries[];
  gaps: { countryIds: ChangeAtlasCountryId[]; datasetFamily: ChangeAtlasFamily; title: ChangeAtlasText; detail: ChangeAtlasText }[];
}

const AGE_GROUPS = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"];
const COUNTRY_IDS = ["FIN", "USA", "GBR", "DEU", "JPN"];
const FAMILIES = ["fertility", "technology", "health", "ecology", "hormone"];
const METRICS: Partial<Record<ChangeAtlasMetric, [ChangeAtlasFamily, ChangeAtlasUnit]>> = {
  tfr: ["fertility", "births_per_woman"],
  asfr: ["fertility", "births_per_1000_women"],
  mobile_subscriptions: ["technology", "subscriptions_per_100_people"],
  diabetes_prevalence: ["health", "percent"],
  butterfly_abundance: ["ecology", "log10_index"],
  testosterone_total: ["hormone", "ng_per_ml"],
};
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const nonempty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const bilingual = (value: unknown) => record(value) && nonempty(value.fi) && nonempty(value.en);
const date = (value: unknown) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value));

/** Validate source boundaries without filling missing years or inferring a BERM response. */
export function validateChangeAtlasData(input: unknown): string[] {
  const errors: string[] = [];
  const check = (condition: unknown, message: string) => { if (!condition) errors.push(message); };
  if (!record(input)) return ["Atlas must be an object"];
  check(input.schemaVersion === 1, "Unsupported schemaVersion");
  check(date(input.updatedAt), "updatedAt must be an ISO date");
  check(record(input.defaultRange) && input.defaultRange.startYear === 1950 && input.defaultRange.endYear === 2023,
    "Default historical range must be 1950–2023");
  if (!Array.isArray(input.countries) || !Array.isArray(input.sources) || !Array.isArray(input.series) || !Array.isArray(input.gaps)) {
    return [...errors, "countries, sources, series and gaps must be arrays"];
  }
  const countryIds = new Set<string>();
  for (const country of input.countries) {
    if (!record(country)) { errors.push("Invalid country"); continue; }
    check(typeof country.id === "string" && COUNTRY_IDS.includes(country.id), "Unknown country");
    check(bilingual(country.name), "Country name requires fi/en");
    if (typeof country.id === "string") {
      check(!countryIds.has(country.id), `Duplicate country: ${country.id}`);
      countryIds.add(country.id);
    }
  }
  check(COUNTRY_IDS.every(id => countryIds.has(id)), "All five countries are required");
  const sourceIds = new Set<string>();
  for (const source of input.sources) {
    if (!record(source)) { errors.push("Invalid source"); continue; }
    check(nonempty(source.id) && nonempty(source.title) && nonempty(source.license), "Source identity and license required");
    check(typeof source.url === "string" && /^https:\/\/[^\s]+$/.test(source.url), `Invalid source URL: ${source.id}`);
    check(date(source.retrievedAt) && bilingual(source.scope), `Source date/scope required: ${source.id}`);
    if (typeof source.id === "string") {
      check(!sourceIds.has(source.id), `Duplicate source: ${source.id}`);
      sourceIds.add(source.id);
    }
    if (!Array.isArray(source.artifacts) || !source.artifacts.length) {
      errors.push(`Source artifacts required: ${source.id}`); continue;
    }
    for (const artifact of source.artifacts) {
      check(record(artifact) && nonempty(artifact.path) && !artifact.path.startsWith("/") && !artifact.path.split("/").includes("..")
        && typeof artifact.sha256 === "string" && /^[a-f0-9]{64}$/.test(artifact.sha256)
        && Number.isSafeInteger(artifact.bytes) && (artifact.bytes as number) > 0,
      `Invalid artifact: ${source.id}`);
    }
  }
  const seriesIds = new Set<string>();
  for (const series of input.series) {
    if (!record(series)) { errors.push("Invalid series"); continue; }
    const sid = String(series.id);
    check(nonempty(series.id) && !seriesIds.has(sid), `Invalid/duplicate series ID: ${sid}`);
    seriesIds.add(sid);
    check(typeof series.countryId === "string" && countryIds.has(series.countryId), `Unknown series country: ${sid}`);
    for (const field of ["title", "unitLabel", "population", "method"]) check(bilingual(series[field]), `${sid}.${field} requires fi/en`);
    check(Array.isArray(series.limitations) && series.limitations.length > 0 && series.limitations.every(bilingual), `${sid} requires limitations`);
    const expected = METRICS[series.metric as ChangeAtlasMetric];
    const driver = technologyDriversData.series.find(s => s.id === series.driverSeriesId);
    const driverMatches = driver && series.datasetFamily === "technology" && series.metric === `technology_${driver.metric}`
      && series.unit === `technology_unit_${driver.unit}` && series.countryId === driver.countryId && series.technologyFamilyId === driver.familyId;
    const trend = testosteroneTrendsData.series.find(s=>s.id===series.testosteroneTrendId);
    const trendMatches = trend && series.datasetFamily === "hormone" && series.metric === "testosterone_total" && series.unit === trend.unit && series.countryId === trend.countryId;
    check(driverMatches || trendMatches || expected && series.datasetFamily === expected[0] && series.unit === expected[1], `Metric/family/unit mismatch: ${sid}`);
    check(["estimate", "reported"].includes(String(series.status)), `Invalid observation status: ${sid}`);
    check(["annual", "survey_period"].includes(String(series.frequency)), `Invalid frequency: ${sid}`);
    check(series.valueScale === (series.unit === "log10_index" ? "log10" : "linear"), `Invalid value scale: ${sid}`);
    if (series.metric === "asfr") check(typeof series.ageGroup === "string" && AGE_GROUPS.includes(series.ageGroup), `Invalid ASFR age group: ${sid}`);
    if (series.metric === "butterfly_abundance") check(bilingual(series.species) && record(series.species) && nonempty(series.species.scientific), `Species identity required: ${sid}`);
    const refs: unknown[] = Array.isArray(series.sourceIds) ? series.sourceIds : [];
    check(refs.length > 0 && new Set(refs).size === refs.length && refs.every(id => typeof id === "string" && sourceIds.has(id)), `Unknown/duplicate source reference: ${sid}`);
    if (series.testosteroneTrendId !== undefined) {
      check(!!trendMatches && series.id === trend?.id && series.statistic === trend?.statistic && series.ageGroup === trend?.ageGroup
        && series.frequency === "survey_period" && JSON.stringify(refs) === JSON.stringify(trend?.sourceIds.map(id=>`hormone:${id}`)), `Testosterone registry provenance mismatch: ${sid}`);
    }
    if (!Array.isArray(series.points) || !series.points.length) { errors.push(`Points required: ${sid}`); continue; }
    let previousYear = -Infinity;
    for (const point of series.points) {
      if (!record(point)) { errors.push(`Invalid point: ${sid}`); continue; }
      const where = `${sid}/${point.year}`;
      if (trend) {
        const original = trend.points.find(p=>p.sourceLocator===point.sourceLocator && p.sourceId === String(point.sourceId).replace(/^hormone:/,""));
        check(!!original && point.sourceId === `hormone:${original.sourceId}` && point.year === (original.startYear + original.endYear) / 2
          && point.lower === (original.lower ?? null) && point.upper === (original.upper ?? null)
          && ["value", "startYear", "endYear", "intervalKind", "standardError", "n", "sourceCellId", "sourceLocator", "collectionYearBasis", "birthCohortStart", "birthCohortEnd"].every(key=>point[key] === (original as unknown as Record<string,unknown>)[key])
          && JSON.stringify(point.collectionYears) === JSON.stringify(original.collectionYears), `Testosterone source point/interval provenance mismatch: ${where}`);
      }
      check(finite(point.year) && point.year > previousYear && point.year >= (driverMatches ? 1880 : 1950) && point.year <= 2026, `Unordered/invalid year: ${where}`);
      if (finite(point.year)) previousYear = point.year;
      check(finite(point.value) && (series.valueScale === "log10" || point.value >= 0), `Invalid value: ${where}`);
      if (series.unit === "percent") check(finite(point.value) && point.value <= 100, `Percentage exceeds 100: ${where}`);
      check(point.imputed === false, `Imputed point forbidden: ${where}`);
      check(typeof point.sourceId === "string" && sourceIds.has(point.sourceId) && refs.includes(point.sourceId), `Unknown point source: ${where}`);
      check(nonempty(point.sourceLocator), `Point source locator required: ${where}`);
      const noCI = point.lower === null && point.upper === null;
      check(noCI || (finite(point.lower) && finite(point.upper) && finite(point.value) && point.lower <= point.value && point.value <= point.upper), `Invalid interval: ${where}`);
      if(point.intervalKind!==undefined)check(["confidence_95","percentile_5_95","standard_error","none"].includes(String(point.intervalKind)), `Invalid interval kind: ${where}`);
      for (const field of ["n", "nSites"]) if (point[field] !== undefined) check(Number.isSafeInteger(point[field]) && (point[field] as number) > 0, `Invalid ${field}: ${where}`);
      if (point.standardError !== undefined) check(finite(point.standardError) && point.standardError >= 0, `Invalid standard error: ${where}`);
      if (series.frequency === "annual") {
        check(Number.isSafeInteger(point.year), `Annual year must be an integer: ${where}`);
        check(point.startYear === undefined && point.endYear === undefined && point.period === undefined, `Annual point has a survey period: ${where}`);
      } else {
        check(Number.isSafeInteger(point.startYear) && Number.isSafeInteger(point.endYear)
          && finite(point.startYear) && finite(point.endYear) && point.startYear <= point.endYear
          && point.startYear >= 1950 && point.endYear <= 2026
          && point.year === (point.startYear + point.endYear) / 2 && bilingual(point.period), `Invalid survey period/midpoint: ${where}`);
      }
      if (series.metric === "tfr" || series.metric === "asfr") {
        check(series.status === "estimate" && series.frequency === "annual" && finite(point.year) && point.year <= 2023,
          `WPP projection or nonhistorical status forbidden: ${where}`);
      }
    }
  }
  for (const gap of input.gaps) {
    check(record(gap) && Array.isArray(gap.countryIds) && gap.countryIds.length > 0
      && gap.countryIds.every(id => typeof id === "string" && countryIds.has(id))
      && FAMILIES.includes(String(gap.datasetFamily)) && bilingual(gap.title) && bilingual(gap.detail), "Invalid data gap");
  }
  return errors;
}

/** Preserve the separately reproducible endpoint release while composing source registries. */
export const changeAtlasBaseData = raw as ChangeAtlasData;
const driverSeries: ChangeAtlasSeries[] = technologyDriversData.series
  .filter(s => COUNTRY_IDS.includes(s.countryId))
  .map(s => ({
    id: `driver:${s.id}`, driverSeriesId: s.id, technologyFamilyId: s.familyId,
    countryId: s.countryId as ChangeAtlasCountryId, datasetFamily: "technology", metric: `technology_${s.metric}`,
    title: s.title, unit: `technology_unit_${s.unit}`, unitLabel: s.unitLabel,
    status: s.status ?? "reported", frequency: "annual", valueScale: "linear", population: s.scope,
    sourceIds: s.sourceIds.map(id => `driver:${id}`), limitations: s.limitations,
    method: { fi: "Alkuperäiset teknologiatilaston havaintopisteet. Rekonstruktion välivuodet ja kenttämuunnokset ovat erillisiä oletuksia.", en: "Original technology-statistic observations. Reconstructed intermediate years and field mappings are separate assumptions." },
    points: s.points.map(p => ({ ...p, lower: p.lower ?? null, upper: p.upper ?? null, sourceId: `driver:${p.sourceId}`, imputed: false })),
  }));
const driverSourceIds = new Set(driverSeries.flatMap(s => s.sourceIds));
const hormoneSeries: ChangeAtlasSeries[] = testosteroneTrendsData.series.map(s=>({
  ...s, id:s.id, testosteroneTrendId:s.id, countryId:s.countryId as ChangeAtlasCountryId,
  datasetFamily:"hormone", metric:"testosterone_total", valueScale:"linear", frequency:"survey_period", status:"estimate",
  sourceIds:s.sourceIds.map(id=>`hormone:${id}`),
  method:{fi:[s.adjustment.fi,s.assay.fi,s.comparability.fi].join(" "),en:[s.adjustment.en,s.assay.en,s.comparability.en].join(" ")},
  points:s.points.map(p=>({...p,year:(p.startYear+p.endYear)/2,lower:p.lower??null,upper:p.upper??null,
    sourceId:`hormone:${p.sourceId}`,period:{fi:p.startYear===p.endYear?String(p.startYear):`${p.startYear}–${p.endYear}`,en:p.startYear===p.endYear?String(p.startYear):`${p.startYear}–${p.endYear}`}})),
}));
export const changeAtlasData: ChangeAtlasData = {
  ...changeAtlasBaseData,
  gaps: changeAtlasBaseData.gaps.map(g=>g.datasetFamily === "hormone" ? {...g, detail:{
    fi:"Suomesta on kaksi ikäryhmittäistä FINRISK-mediaanisarjaa. USA:sta on viisi nuorten miesten NHANES-keskiarvoa sekä erillinen kahden jakson laajasti vakioitu sarja. Ikäryhmät, vakioinnit ja määritysmenetelmät eroavat; niitä ei yhdistetä yhtenäiseksi kansalliseksi hormonihistoriaksi. Iso-Britannian, Saksan ja Japanin sarjat ovat vielä avoimia.",
    en:"Finland has two age-specific FINRISK median series. The US has five young-male NHANES means and a separate fully adjusted two-period series. Age groups, adjustments and assays differ; these are not pooled into a continuous national hormone history. UK, German and Japanese series remain open.",
  }} : g),
  series: [...changeAtlasBaseData.series.map(s => s.metric === "mobile_subscriptions" ? {...s, technologyFamilyId: "cellular-total"} : s), ...driverSeries, ...hormoneSeries],
  sources: [...changeAtlasBaseData.sources, ...technologyDriversData.sources.filter(s => driverSourceIds.has(`driver:${s.id}`)).map(s => ({...s, id: `driver:${s.id}`})),
    ...testosteroneTrendsData.sources.map(s=>({...s,id:`hormone:${s.id}`}))],
};

export function getChangeAtlasSeries(countryId: string, metric?: ChangeAtlasMetric): ChangeAtlasSeries[] {
  return changeAtlasData.series.filter(series => series.countryId === countryId && (!metric || series.metric === metric));
}

export function getChangeAtlasSource(sourceId: string): ChangeAtlasSource | undefined {
  return changeAtlasData.sources.find(source => source.id === sourceId);
}

/** Units and metric identity must agree before country curves share an axis. */
export function getAtlasComparisonMetrics() {
  const seen = new Set<string>();
  const comparisonTitles: Partial<Record<ChangeAtlasMetric, ChangeAtlasText>> = {
    technology_radio_household_ownership: { fi: "Radio kotitaloudessa", en: "Household radio ownership" },
    technology_tv_household_ownership: { fi: "Televisio kotitaloudessa", en: "Household television ownership" },
    technology_mpp_electricity_generation: { fi: "Suurten sähköntuottajien tuotanto", en: "Major power producers: electricity generation" },
    technology_air_conditioner_household_ownership: { fi: "Ilmastointilaite kotitaloudessa", en: "Household air-conditioner ownership" },
    technology_colour_tv_household_ownership: { fi: "Väritelevisio kotitaloudessa", en: "Household colour television ownership" },
    technology_monochrome_tv_household_ownership: { fi: "Mustavalkotelevisio kotitaloudessa", en: "Household monochrome television ownership" },
  };
  return changeAtlasData.series.filter(s => s.metric === "tfr" || s.datasetFamily === "technology")
    .filter(s => { if (seen.has(s.metric)) return false; seen.add(s.metric); return true; })
    .map(s => ({ metric: s.metric, title: comparisonTitles[s.metric] ?? s.title, unitLabel: s.unitLabel,
      countryCount: new Set(changeAtlasData.series.filter(other => other.metric === s.metric && other.unit === s.unit).map(other => other.countryId)).size }));
}
