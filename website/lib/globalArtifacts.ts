/**
 * Defensive parsers for the public global data artefacts.
 *
 * The analysis pipeline owns the exact JSON schema. The site deliberately
 * accepts the canonical nested country panel as well as a flattened public
 * export, so an asset-size optimisation cannot silently break the UI.
 */

export type GlobalTier = "core" | "extended" | "global";

export const GLOBAL_TIER_ORDER: readonly GlobalTier[] = ["core", "extended", "global"];

export interface GlobalCountryYear {
  year: number;
  tfr?: number;
  tfrSource?: string;
  tfrMeasurementType?: string;
  tfrSeriesStatus?: string;
  mobilePer100?: number;
  urbanPct?: number;
  gdpPppPerCapita?: number;
  fieldProvenance?: string;
  missingness?: string;
}

export interface GlobalCountryPanel {
  iso3: string;
  name: string;
  years: GlobalCountryYear[];
  tiers: GlobalTier[];
}

export interface GlobalPanel {
  schema?: string;
  countries: GlobalCountryPanel[];
}

export interface GlobalTierMemberships {
  countriesByTier: Record<GlobalTier, string[]>;
  membershipsByIso: Record<string, GlobalTier[]>;
}

export interface GlobalValidationMetric {
  label: string;
  value: number;
}

export interface GlobalValidationScenario {
  key: string;
  name: string;
  trainStart?: number;
  trainEnd?: number;
  testStart?: number;
  testEnd?: number;
  countryCount?: number;
  status?: string;
  metrics: GlobalValidationMetric[];
}

export interface GlobalValidationArtifact {
  schema?: string;
  version?: string;
  locked: boolean;
  tiers: GlobalTierMemberships;
  scenarios: GlobalValidationScenario[];
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finiteNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function pick(record: UnknownRecord, keys: string[]): unknown {
  for (const key of keys) {
    if (key in record) return record[key];
  }
  return undefined;
}

function pickNumber(record: UnknownRecord, keys: string[]): number | undefined {
  return finiteNumber(pick(record, keys));
}

function pickString(record: UnknownRecord, keys: string[]): string | undefined {
  return stringValue(pick(record, keys));
}

function normaliseIso3(value: unknown): string | undefined {
  const iso = stringValue(value)?.toUpperCase();
  return iso && /^[A-Z]{3}$/.test(iso) ? iso : undefined;
}

function normaliseTier(value: unknown): GlobalTier | undefined {
  const raw = stringValue(value)?.toLowerCase().replace(/[_\s-]+/g, "");
  if (!raw) return undefined;
  if (raw.includes("core")) return "core";
  if (raw.includes("extended")) return "extended";
  if (raw.includes("global")) return "global";
  return undefined;
}

function parseTierMemberships(value: unknown): GlobalTier[] {
  const values = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split("|")
      : [value];
  const tiers = values.flatMap((item) => {
    const tier = normaliseTier(item);
    return tier ? [tier] : [];
  });
  return [...new Set(tiers)].sort((left, right) => GLOBAL_TIER_ORDER.indexOf(left) - GLOBAL_TIER_ORDER.indexOf(right));
}

function rowFromUnknown(value: unknown, fallbackYear?: unknown): GlobalCountryYear | null {
  if (!isRecord(value)) return null;
  const year = pickNumber(value, ["year", "calendar_year"]) ?? finiteNumber(fallbackYear);
  if (!year || !Number.isInteger(year)) return null;

  const tfr = pickNumber(value, ["tfr", "observed_tfr", "total_fertility_rate"]);
  const tfrSource = pickString(value, ["tfr_source", "tfrSource"]);
  const tfrMeasurementType = pickString(value, ["tfr_measurement_type", "tfrMeasurementType"]);
  const tfrSeriesStatus = pickString(value, ["tfr_series_status", "tfrSeriesStatus"]);
  const mobilePer100 = pickNumber(value, [
    "mobile_per_100",
    "subs_per_100",
    "mobile_subscriptions_per_100",
    "mobile",
  ]);
  const urbanPct = pickNumber(value, ["urban_pct", "urban_population_pct", "urban"]);
  const gdpPppPerCapita = pickNumber(value, ["gdp_ppp_per_capita", "gdp_ppp", "gdp"]);
  const fieldProvenance = pickString(value, ["field_provenance", "provenance"]);
  const rawMissingness = pick(value, ["missingness", "missing_data"]);
  const missingness = stringValue(rawMissingness)
    ?? (isRecord(rawMissingness) ? JSON.stringify(rawMissingness) : undefined);

  if (
    tfr === undefined
    && mobilePer100 === undefined
    && urbanPct === undefined
    && gdpPppPerCapita === undefined
    && !fieldProvenance
    && !missingness
  ) return null;

  return {
    year,
    tfr,
    tfrSource,
    tfrMeasurementType,
    tfrSeriesStatus,
    mobilePer100,
    urbanPct,
    gdpPppPerCapita,
    fieldProvenance,
    missingness,
  };
}

function rowsFromUnknown(value: unknown): GlobalCountryYear[] {
  const candidates: Array<[unknown, unknown]> = [];
  if (Array.isArray(value)) {
    value.forEach((row) => candidates.push([row, undefined]));
  } else if (isRecord(value)) {
    Object.entries(value).forEach(([year, row]) => candidates.push([row, year]));
  }

  return candidates
    .map(([row, fallbackYear]) => rowFromUnknown(row, fallbackYear))
    .filter((row): row is GlobalCountryYear => row !== null)
    .sort((left, right) => left.year - right.year);
}

function countryFromUnknown(isoCandidate: unknown, value: unknown): GlobalCountryPanel | null {
  if (!isRecord(value)) return null;
  const iso3 = normaliseIso3(pick(value, ["iso3", "country_iso3", "country_id"]))
    ?? normaliseIso3(isoCandidate);
  if (!iso3) return null;

  const rowsSource = pick(value, ["years", "rows", "observations", "series", "data"]);
  const years = rowsFromUnknown(rowsSource);
  if (years.length === 0) return null;

  return {
    iso3,
    name: pickString(value, ["country_name", "country", "name", "label"]) ?? iso3,
    years,
    tiers: parseTierMemberships(pick(value, ["tier_memberships", "tiers", "memberships"])),
  };
}

function dedupeCountries(countries: GlobalCountryPanel[]): GlobalCountryPanel[] {
  const byIso = new Map<string, GlobalCountryPanel>();
  for (const country of countries) {
    const prior = byIso.get(country.iso3);
    if (!prior || country.years.length > prior.years.length) byIso.set(country.iso3, country);
  }
  return [...byIso.values()].sort((left, right) => left.name.localeCompare(right.name));
}

export function parseGlobalPanel(value: unknown): GlobalPanel | null {
  if (!isRecord(value)) return null;
  const countries: GlobalCountryPanel[] = [];
  const rawCountries = pick(value, ["countries", "country_panel"]);

  if (Array.isArray(rawCountries)) {
    rawCountries.forEach((country) => {
      if (!isRecord(country)) return;
      const parsed = countryFromUnknown(pick(country, ["iso3", "country_iso3", "country_id"]), country);
      if (parsed) countries.push(parsed);
    });
  } else if (isRecord(rawCountries)) {
    Object.entries(rawCountries).forEach(([iso3, country]) => {
      const parsed = countryFromUnknown(iso3, country);
      if (parsed) countries.push(parsed);
    });
  }

  const flatRows = pick(value, ["rows", "observations", "data"]);
  if (Array.isArray(flatRows)) {
    const grouped = new Map<string, { name: string; rows: GlobalCountryYear[]; tiers: GlobalTier[] }>();
    flatRows.forEach((row) => {
      if (!isRecord(row)) return;
      const iso3 = normaliseIso3(pick(row, ["iso3", "country_iso3", "country_id"]));
      const parsedRow = rowFromUnknown(row);
      if (!iso3 || !parsedRow) return;
      const current = grouped.get(iso3) ?? {
        name: pickString(row, ["country_name", "country", "name", "label"]) ?? iso3,
        rows: [],
        tiers: [],
      };
      current.rows.push(parsedRow);
      parseTierMemberships(pick(row, ["tier_memberships", "tiers", "memberships"])).forEach((tier) => {
        if (!current.tiers.includes(tier)) current.tiers.push(tier);
      });
      grouped.set(iso3, current);
    });
    grouped.forEach((entry, iso3) => {
      countries.push({
        iso3,
        name: entry.name,
        years: entry.rows.sort((left, right) => left.year - right.year),
        tiers: entry.tiers,
      });
    });
  }

  const parsedCountries = dedupeCountries(countries);
  return parsedCountries.length > 0
    ? { schema: pickString(value, ["schema", "schema_version"]), countries: parsedCountries }
    : null;
}

/** A small CSV reader for a flattened public country-year export. */
function parseCsvMatrix(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell);
      if (row.some((entry) => entry.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((entry) => entry.trim() !== "")) rows.push(row);
  return rows;
}

export function parseGlobalPanelCsv(text: string): GlobalPanel | null {
  const matrix = parseCsvMatrix(text);
  const [header, ...body] = matrix;
  if (!header || body.length === 0) return null;

  const keys = header.map((value) => value.trim());
  const rows = body.map((cells) => Object.fromEntries(
    keys.map((key, index) => [key, cells[index]?.trim() ?? ""]),
  ));
  return parseGlobalPanel({ rows });
}

function collectCountryIds(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => {
      const direct = normaliseIso3(entry);
      if (direct) return [direct];
      if (!isRecord(entry)) return [];
      const id = normaliseIso3(pick(entry, ["iso3", "country_iso3", "country_id", "id"]));
      return id ? [id] : [];
    });
  }
  if (!isRecord(value)) return [];

  const nested = pick(value, ["countries", "members", "country_ids", "iso3", "items"]);
  if (nested !== undefined) return collectCountryIds(nested);
  const keys = Object.keys(value);
  return keys.every((key) => /^[A-Z]{3}$/.test(key)) ? keys : [];
}

function emptyTiers(): GlobalTierMemberships {
  return {
    countriesByTier: { core: [], extended: [], global: [] },
    membershipsByIso: {},
  };
}

/** Builds coverage memberships from the no-imputation public panel itself. */
export function membershipsFromPanel(panel: GlobalPanel): GlobalTierMemberships {
  const result = emptyTiers();
  panel.countries.forEach((country) => {
    country.tiers.forEach((tier) => {
      if (!result.countriesByTier[tier].includes(country.iso3)) {
        result.countriesByTier[tier].push(country.iso3);
      }
      const memberships = result.membershipsByIso[country.iso3] ?? [];
      if (!memberships.includes(tier)) memberships.push(tier);
      result.membershipsByIso[country.iso3] = memberships;
    });
  });
  GLOBAL_TIER_ORDER.forEach((tier) => result.countriesByTier[tier].sort());
  Object.values(result.membershipsByIso).forEach((memberships) => {
    memberships.sort((left, right) => GLOBAL_TIER_ORDER.indexOf(left) - GLOBAL_TIER_ORDER.indexOf(right));
  });
  return result;
}

export function parseGlobalTiers(value: unknown): GlobalTierMemberships {
  const result = emptyTiers();
  if (!isRecord(value)) return result;

  const add = (iso3: string, tier: GlobalTier) => {
    if (!result.countriesByTier[tier].includes(iso3)) result.countriesByTier[tier].push(iso3);
    const memberships = result.membershipsByIso[iso3] ?? [];
    if (!memberships.includes(tier)) memberships.push(tier);
    result.membershipsByIso[iso3] = memberships;
  };

  const rawTiers = isRecord(value.tiers)
    ? value.tiers
    : (isRecord(value.tier_membership) ? value.tier_membership : value);
  GLOBAL_TIER_ORDER.forEach((tier) => {
    Object.entries(rawTiers)
      .filter(([key]) => normaliseTier(key) === tier)
      .flatMap(([, countries]) => collectCountryIds(countries))
      .forEach((iso3) => add(iso3, tier));
  });

  const rawMemberships = pick(value, ["country_memberships", "memberships"]);
  if (isRecord(rawMemberships)) {
    Object.entries(rawMemberships).forEach(([key, membership]) => {
      const iso3 = normaliseIso3(key)
        ?? (isRecord(membership)
          ? normaliseIso3(pick(membership, ["iso3", "country_iso3", "country_id"]))
          : undefined);
      if (!iso3) return;
      const rawValues = isRecord(membership)
        ? pick(membership, ["memberships", "tiers", "tier", "membership"])
        : membership;
      const values = Array.isArray(rawValues) ? rawValues : [rawValues];
      values.forEach((item) => {
        const tier = normaliseTier(item);
        if (tier) add(iso3, tier);
      });
    });
  }

  GLOBAL_TIER_ORDER.forEach((tier) => result.countriesByTier[tier].sort());
  Object.values(result.membershipsByIso).forEach((memberships) => {
    memberships.sort((left, right) => GLOBAL_TIER_ORDER.indexOf(left) - GLOBAL_TIER_ORDER.indexOf(right));
  });
  return result;
}

function scenarioMetrics(value: UnknownRecord): GlobalValidationMetric[] {
  const evaluation = isRecord(value.evaluation) ? value.evaluation : value;
  const entries: Array<[string, unknown]> = [
    ["BERM RMSE", pick(value, ["aggregate_berm"]) ?? pick(evaluation, ["aggregate_berm"])],
    ["M0 RMSE", pick(value, ["aggregate_m0"]) ?? pick(evaluation, ["aggregate_m0"])],
    ["Median country BERM RMSE", pick(value, ["median_country_berm_rmse"]) ?? pick(evaluation, ["median_country_berm_rmse"])],
    ["Median country M0 RMSE", pick(value, ["median_country_m0_rmse"]) ?? pick(evaluation, ["median_country_m0_rmse"])],
  ];

  const direct = [
    ["BERM RMSE", pick(value, ["berm_rmse"]) ?? pick(evaluation, ["berm_rmse"])],
    ["M0 RMSE", pick(value, ["m0_rmse"]) ?? pick(evaluation, ["m0_rmse"])],
  ] as const;

  const metrics = [...entries.flatMap(([label, metric]) => {
    const rmse = isRecord(metric) ? pickNumber(metric, ["rmse"]) : finiteNumber(metric);
    return rmse === undefined ? [] : [{ label, value: rmse }];
  }), ...direct.flatMap(([label, metric]) => {
    const numeric = finiteNumber(metric);
    return numeric === undefined ? [] : [{ label, value: numeric }];
  })];
  return [...new Map(metrics.map((metric) => [metric.label, metric])).values()];
}

function isScenarioRecord(value: UnknownRecord): boolean {
  return [
    "evaluation",
    "aggregate_berm",
    "aggregate_m0",
    "berm_rmse",
    "m0_rmse",
    "train_start",
    "trainStart",
    "test_start",
    "testStart",
  ].some((key) => key in value);
}

function scenarioFromRecord(
  key: string,
  rawScenario: UnknownRecord,
  prefix?: string,
): GlobalValidationScenario[] {
  const metrics = scenarioMetrics(rawScenario);
  // A status-only or schema-mismatched object is not evidence. Do not turn it
  // into an empty result card on the public evidence page.
  if (metrics.length === 0) return [];
  const trainStart = pickNumber(rawScenario, ["train_start", "trainStart"]);
  const trainEnd = pickNumber(rawScenario, ["train_end", "trainEnd"]);
  const testStart = pickNumber(rawScenario, ["test_start", "testStart"]);
  const testEnd = pickNumber(rawScenario, ["test_end", "testEnd", "test_end_requested"]);
  const countryCount = pickNumber(rawScenario, ["country_count", "n_countries", "countries_used", "n_tier_countries"]);
  const status = pickString(rawScenario, ["status", "validation_status"]);
  const localName = pickString(rawScenario, ["name", "label", "title"]) ?? key.replace(/_/g, " ");
  return [{
    key: prefix ? `${prefix}:${key}` : key,
    name: prefix ? `${prefix} · ${localName}` : localName,
    trainStart,
    trainEnd,
    testStart,
    testEnd,
    countryCount,
    status,
    metrics,
  }];
}

function parseScenarios(value: unknown): GlobalValidationScenario[] {
  if (!isRecord(value) && !Array.isArray(value)) return [];
  const entries = Array.isArray(value)
    ? value.map((scenario, index) => [String(index + 1), scenario] as const)
    : Object.entries(value);

  return entries.flatMap(([key, rawScenario]) => {
    if (!isRecord(rawScenario)) return [];
    if (isScenarioRecord(rawScenario)) return scenarioFromRecord(key, rawScenario);
    return Object.entries(rawScenario).flatMap(([nestedKey, nestedScenario]) => (
      isRecord(nestedScenario) && isScenarioRecord(nestedScenario)
        ? scenarioFromRecord(nestedKey, nestedScenario, key)
        : []
    ));
  });
}

export function parseGlobalValidation(value: unknown): GlobalValidationArtifact | null {
  if (!isRecord(value)) return null;
  const tiers = parseGlobalTiers(value);
  if (Object.keys(tiers.membershipsByIso).length === 0) return null;
  const scenarios = parseScenarios(pick(value, ["scenarios", "validation_scenarios"]));
  const schema = pickString(value, ["schema", "schema_version"]);
  const version = pickString(value, ["version", "artifact_version"]);
  const status = pickString(value, ["status", "validation_status"])?.toLowerCase();
  const tierContainer = isRecord(value.tiers) ? value.tiers : value;
  const coreTier = tierContainer.core;
  const coreIsFrozen = isRecord(coreTier) && (
    coreTier.frozen === true
    || coreTier.locked === true
    || coreTier.membership_locked === true
  );
  const locked = value.locked === true || status === "locked" || value.frozen === true || coreIsFrozen;

  return { schema, version, locked, tiers, scenarios };
}

export function tierForCountry(
  iso3: string,
  memberships: GlobalTierMemberships,
): GlobalTier | undefined {
  return memberships.membershipsByIso[iso3]?.[0];
}
