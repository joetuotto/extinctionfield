import rawHistory from "@/data/technology-history.json";

export type LocalizedHistoryText = { en: string; fi: string };
export type TechnologyGroupId = "grid" | "home" | "communications" | "transport" | "industry" | "ecology";
export type HistoryEventKind = "launch" | "deployment" | "measurement" | "shutdown" | "standard";
export type HistorySourceKind = "primary-study" | "official-statistics" | "official-history" | "operator-report" | "manufacturer-history" | "technical-standard" | "regulation" | "historical-research";
export interface TechnologyHistorySource {
  id: string;
  url: string;
  title: string;
  publisher: string;
  accessed: string;
  kind: HistorySourceKind;
  scope: LocalizedHistoryText;
}
export interface TechnologyDataLink {
  id: string;
  label: LocalizedHistoryText;
  url: string;
  kind: "adoption" | "measurement" | "proxy" | "scenario";
  scope: LocalizedHistoryText;
}
export interface HistoricalTechnology {
  id: string;
  group: TechnologyGroupId;
  name: LocalizedHistoryText;
  summary: LocalizedHistoryText;
  physicalProfile: LocalizedHistoryText;
  historyGap: LocalizedHistoryText;
  bermRelevance: LocalizedHistoryText;
  seasonality: LocalizedHistoryText;
  sourceIds: string[];
  dataLinks?: TechnologyDataLink[];
}
export interface TechnologyHistoryEvent {
  id: string;
  technologyIds: string[];
  region: { id: string; name: LocalizedHistoryText };
  location?: LocalizedHistoryText;
  startYear: number;
  endYear?: number;
  kind: HistoryEventKind;
  title: LocalizedHistoryText;
  description: LocalizedHistoryText;
  sourceIds: string[];
  values?: { value: number; unit: string; denominator: LocalizedHistoryText; label: LocalizedHistoryText }[];
}
export interface TechnologyHistoryRegistry {
  schemaVersion: 1;
  updatedAt: string;
  boundary: { geometry: LocalizedHistoryText; conditionalResponse: LocalizedHistoryText; empiricalInput: LocalizedHistoryText; calibrationGap: LocalizedHistoryText };
  groups: { id: TechnologyGroupId; name: LocalizedHistoryText; summary: LocalizedHistoryText }[];
  sources: TechnologyHistorySource[];
  technologies: HistoricalTechnology[];
  events: TechnologyHistoryEvent[];
}

const GROUP_IDS = ["grid", "home", "communications", "transport", "industry", "ecology"];
const EVENT_KINDS = ["launch", "deployment", "measurement", "shutdown", "standard"];
const SOURCE_KINDS = ["primary-study", "official-statistics", "official-history", "operator-report", "manufacturer-history", "technical-standard", "regulation", "historical-research"];
const TEXT_FIELDS = ["name", "summary", "physicalProfile", "historyGap", "bermRelevance", "seasonality"];
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const isDate = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const isSafeUrl = (value: unknown, local = false) => {
  if (typeof value !== "string") return false;
  if (local && /^\/(?!\/)[a-zA-Z0-9/_?=.#%-]+$/.test(value)) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
};

/** Validate provenance and interpretation boundaries as well as JSON shape. */
export function validateTechnologyHistory(input: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(input)) return ["registry: expected an object"];
  const text = (value: unknown, path: string) => {
    if (!isRecord(value) || !isText(value.en) || !isText(value.fi)) errors.push(`${path}: complete en and fi text required`);
  };
  const records = (value: unknown, path: string): Record<string, unknown>[] => {
    if (!Array.isArray(value)) { errors.push(`${path}: expected an array`); return []; }
    value.forEach((item, index) => { if (!isRecord(item)) errors.push(`${path}[${index}]: expected an object`); });
    return value.filter(isRecord);
  };
  const ids = (rows: Record<string, unknown>[], path: string) => {
    const found = new Set<string>();
    rows.forEach((row, index) => {
      if (typeof row.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.id)) errors.push(`${path}[${index}].id: invalid ID`);
      else if (found.has(row.id)) errors.push(`${path}: duplicate ID ${row.id}`);
      else found.add(row.id);
    });
    return found;
  };
  const refs = (value: unknown, known: Set<string>, path: string, required = false) => {
    if (!Array.isArray(value)) { errors.push(`${path}: expected an array`); return; }
    if (required && value.length === 0) errors.push(`${path}: at least one reference required`);
    const seen = new Set<string>();
    value.forEach((id) => {
      if (typeof id !== "string" || !known.has(id)) errors.push(`${path}: unknown reference ${String(id)}`);
      else if (seen.has(id)) errors.push(`${path}: duplicate reference ${id}`);
      else seen.add(id);
    });
  };
  if (input.schemaVersion !== 1) errors.push("schemaVersion: expected 1");
  if (!isDate(input.updatedAt)) errors.push("updatedAt: valid ISO date required");
  const latestYear = isDate(input.updatedAt) ? Number(input.updatedAt.slice(0, 4)) : 9999;
  if (!isRecord(input.boundary)) errors.push("boundary: expected an object");
  else ["geometry", "conditionalResponse", "empiricalInput", "calibrationGap"].forEach((key) => text(input.boundary && (input.boundary as Record<string, unknown>)[key], `boundary.${key}`));

  const groups = records(input.groups, "groups");
  const groupIds = ids(groups, "groups");
  if (groups.length !== GROUP_IDS.length || GROUP_IDS.some((id) => !groupIds.has(id))) errors.push("groups: all six environments required exactly once");
  groups.forEach((row) => { text(row.name, `groups.${row.id}.name`); text(row.summary, `groups.${row.id}.summary`); });
  const sources = records(input.sources, "sources");
  const sourceIds = ids(sources, "sources");
  sources.forEach((row) => {
    const path = `sources.${row.id}`;
    if (!isSafeUrl(row.url)) errors.push(`${path}.url: HTTPS source URL required`);
    ["title", "publisher"].forEach((key) => { if (!isText(row[key])) errors.push(`${path}.${key}: text required`); });
    if (!isDate(row.accessed) || (isDate(input.updatedAt) && row.accessed > input.updatedAt)) errors.push(`${path}.accessed: valid date no later than registry update required`);
    if (!SOURCE_KINDS.includes(String(row.kind))) errors.push(`${path}.kind: unknown source kind`);
    text(row.scope, `${path}.scope`);
  });
  const technologies = records(input.technologies, "technologies");
  const technologyIds = ids(technologies, "technologies");
  technologies.forEach((row) => {
    const path = `technologies.${row.id}`;
    if (!groupIds.has(String(row.group))) errors.push(`${path}.group: unknown environment`);
    TEXT_FIELDS.forEach((key) => text(row[key], `${path}.${key}`));
    // No invented source is required for an explicitly documented historical gap.
    refs(row.sourceIds, sourceIds, `${path}.sourceIds`);
    if (row.dataLinks !== undefined) {
      const links = records(row.dataLinks, `${path}.dataLinks`);
      const linkIds = new Set<string>();
      links.forEach((link) => {
        if (!isText(link.id) || linkIds.has(link.id)) errors.push(`${path}.dataLinks: unique nonempty IDs required`);
        else linkIds.add(link.id);
        if (!isSafeUrl(link.url, true)) errors.push(`${path}.dataLinks.${link.id}.url: safe URL required`);
        if (!["adoption", "measurement", "proxy", "scenario"].includes(String(link.kind))) errors.push(`${path}.dataLinks.${link.id}.kind: unknown data kind`);
        text(link.label, `${path}.dataLinks.${link.id}.label`);
        text(link.scope, `${path}.dataLinks.${link.id}.scope`);
      });
    }
  });
  const events = records(input.events, "events");
  ids(events, "events");
  const regionNames = new Map<string, string>();
  events.forEach((row) => {
    const path = `events.${row.id}`;
    refs(row.technologyIds, technologyIds, `${path}.technologyIds`, true);
    refs(row.sourceIds, sourceIds, `${path}.sourceIds`, true);
    ["title", "description"].forEach((key) => text(row[key], `${path}.${key}`));
    if (row.location !== undefined) text(row.location, `${path}.location`);
    if (!isRecord(row.region) || !isText(row.region.id)) errors.push(`${path}.region: ID and localized name required`);
    else {
      text(row.region.name, `${path}.region.name`);
      const name = JSON.stringify(row.region.name);
      if (regionNames.has(row.region.id) && regionNames.get(row.region.id) !== name) errors.push(`${path}.region: inconsistent name for ${row.region.id}`);
      regionNames.set(row.region.id, name);
    }
    if (!EVENT_KINDS.includes(String(row.kind))) errors.push(`${path}.kind: unknown event kind`);
    const validYear = (year: unknown) => typeof year === "number" && Number.isInteger(year) && year >= 1000 && year <= latestYear;
    if (!validYear(row.startYear)) errors.push(`${path}.startYear: historical integer year required`);
    if (row.endYear !== undefined && (!validYear(row.endYear) || Number(row.endYear) < Number(row.startYear))) errors.push(`${path}.endYear: historical year must not precede startYear`);
    if (row.values !== undefined) records(row.values, `${path}.values`).forEach((value, index) => {
      if (typeof value.value !== "number" || !Number.isFinite(value.value)) errors.push(`${path}.values[${index}].value: finite number required`);
      if (!isText(value.unit)) errors.push(`${path}.values[${index}].unit: explicit unit required`);
      text(value.label, `${path}.values[${index}].label`);
      text(value.denominator, `${path}.values[${index}].denominator`);
    });
  });
  return errors;
}

const errors = validateTechnologyHistory(rawHistory);
if (errors.length) throw new Error(`Invalid technology history registry:\n${errors.join("\n")}`);
export const technologyHistory = rawHistory as TechnologyHistoryRegistry;

/** Existing website locales without a translation receive complete English copy. */
export function getLocalizedText(text: LocalizedHistoryText, locale: string): string {
  return locale === "fi" && text.fi.trim() ? text.fi : text.en;
}
export const getTechnologyById = (id: string) => technologyHistory.technologies.find((technology) => technology.id === id);
export const getHistorySources = (ids: readonly string[]) => [...new Set(ids)].flatMap((id) => {
  const source = technologyHistory.sources.find((entry) => entry.id === id);
  return source ? [source] : [];
});
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
export function queryTechnologies(options: { group?: string; search?: string; locale?: string } = {}): HistoricalTechnology[] {
  const terms = normalize(options.search?.trim() ?? "").split(/\s+/).filter(Boolean);
  return technologyHistory.technologies.filter((technology) => {
    if (options.group && technology.group !== options.group) return false;
    const haystack = normalize([technology.id, ...TEXT_FIELDS.map((key) => getLocalizedText(technology[key as keyof Pick<HistoricalTechnology, "name" | "summary" | "physicalProfile" | "historyGap" | "bermRelevance" | "seasonality">], options.locale ?? "en"))].join(" "));
    return terms.every((term) => haystack.includes(term));
  });
}
export function queryHistoryEvents(options: { technologyId?: string; group?: string; regionId?: string; kind?: HistoryEventKind; fromYear?: number; toYear?: number } = {}): TechnologyHistoryEvent[] {
  if (options.fromYear !== undefined && options.toYear !== undefined && options.fromYear > options.toYear) return [];
  return technologyHistory.events.filter((event) => {
    if (options.technologyId && !event.technologyIds.includes(options.technologyId)) return false;
    if (options.group && !event.technologyIds.some((id) => getTechnologyById(id)?.group === options.group)) return false;
    if (options.regionId && event.region.id !== options.regionId) return false;
    if (options.kind && event.kind !== options.kind) return false;
    // A dated point does not imply that deployment or exposure continues forever.
    if (options.fromYear !== undefined && (event.endYear ?? event.startYear) < options.fromYear) return false;
    if (options.toYear !== undefined && event.startYear > options.toYear) return false;
    return true;
  }).sort((a, b) => a.startYear - b.startYear || a.id.localeCompare(b.id));
}
export const getTechnologyEvents = (id: string) => queryHistoryEvents({ technologyId: id });
