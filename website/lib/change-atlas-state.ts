/** Shareable atlas selections. Unknown URL values never become model inputs. */
import { getAtlasComparisonMetrics, type ChangeAtlasMetric } from "./change-atlas-data";
export const ATLAS_COUNTRIES = ["FIN", "USA", "GBR", "DEU", "JPN"] as const;
export const ATLAS_VIEWS = ["change", "compare", "ages", "events", "fields", "berm", "sources"] as const;
export const ATLAS_QUESTIONS = ["fertility", "health", "ecology", "technology"] as const;
export type AtlasCountry = typeof ATLAS_COUNTRIES[number];
export type AtlasView = typeof ATLAS_VIEWS[number];
export type AtlasQuestion = typeof ATLAS_QUESTIONS[number];
export interface AtlasState {
  country: AtlasCountry; view: AtlasView; question: AtlasQuestion;
  from: number; to: number; year: number; metric: ChangeAtlasMetric;
  eventFamily: string; baseline: number | null; relative: number; window: number;
}
export const DEFAULT_ATLAS_STATE: AtlasState = {
  country: "FIN", view: "change", question: "fertility", from: 1950, to: 2023,
  year: 2023, metric: "tfr", eventFamily: "digital-2g", baseline: null, relative: 0, window: 20,
};
function choice<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? value as T : fallback;
}
function integer(value: string | null, fallback: number, min: number, max: number) {
  if (value === null || value.trim() === "" || !/^-?\d+$/.test(value)) return fallback;
  const n = Number(value);
  return Number.isSafeInteger(n) ? Math.max(min, Math.min(max, n)) : fallback;
}
export function parseAtlasState(params: Pick<URLSearchParams, "get">): AtlasState {
  const from = integer(params.get("from"), 1950, 1880, 2022);
  const to = Math.max(from + 1, integer(params.get("to"), 2023, 1881, 2023));
  const tab = params.get("tab");
  const view = choice(params.get("view"), ATLAS_VIEWS, tab === "layers" ? "fields" : tab === "data" ? "sources" : "change");
  const base = params.get("base");
  const window = integer(params.get("window"), 20, 5, 30);
  return {
    country: choice(params.get("country"), ATLAS_COUNTRIES, tab === "sentinel" ? "GBR" : "FIN"),
    view, question: choice(params.get("question"), ATLAS_QUESTIONS, tab === "sentinel" ? "ecology" : "fertility"),
    from, to, year: integer(params.get("year"), to, from, to),
    metric: choice(params.get("metric"), getAtlasComparisonMetrics().map(m => m.metric), "tfr"),
    eventFamily: /^[a-z0-9-]{1,64}$/.test(params.get("event") ?? "") ? params.get("event")! : "digital-2g",
    baseline: base === null ? null : integer(base, from, from, to),
    relative: integer(params.get("relative"), 0, -window, window), window,
  };
}
export function serializeAtlasState(state: AtlasState, existing = new URLSearchParams()): URLSearchParams {
  const p = new URLSearchParams(existing.toString());
  p.set("tab", "atlas");
  for (const k of ["country", "view", "question", "from", "to", "year", "metric", "relative", "window"] as const) p.set(k, String(state[k]));
  p.set("event", state.eventFamily);
  if (state.baseline === null) p.delete("base"); else p.set("base", String(state.baseline));
  p.set("edition", "2026-09-08");
  return p;
}

/** CSV escaping also prevents formula execution when a source title is opened in a spreadsheet. */
export function atlasCsvCell(value: unknown) {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+@\t\r]/.test(s) || (/^-/.test(s) && !Number.isFinite(Number(s)))) s = `'${s}`;
  return `"${s.replaceAll('"', '""')}"`;
}
