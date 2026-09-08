import type { ChangeAtlasSeries } from "./change-atlas-data";
import { parseBermScenarioParameters } from "./berm-atlas-scenario";
import { DEFAULT_BERM_ENDPOINT_PARAMETERS, type BermEndpointParameters } from "./berm-endpoint-scenario";

/** View choices never change the fixed origin of the retained source history. */
export function parseBermEndpointDisplay(params: Pick<URLSearchParams, "get">) {
  const { beta, ...geometry } = parseBermScenarioParameters(params);
  const numeric = (key: string, fallback: number, min: number, max: number) => {
    const raw = params.get(key);
    return raw !== null && raw.trim() !== "" && Number.isFinite(Number(raw)) && Number(raw) >= min && Number(raw) <= max ? Number(raw) : fallback;
  };
  const mode = params.get("ep_mode");
  const parameters: BermEndpointParameters = {
    ...DEFAULT_BERM_ENDPOINT_PARAMETERS, ...geometry,
    mode: mode === "annual" || mode === "accumulated" ? mode : "combined",
    halfLifeYears: numeric("ep_halfLife", 20, 0, 100),
    annualWeight: numeric("ep_annualWeight", 1, 0, 3),
    historyWeight: numeric("ep_historyWeight", .05, 0, .5),
    betaF: numeric("ep_betaF", beta, -1, 1),
    betaT: numeric("ep_betaT", .15, -1, 1),
    initialStock: params.get("ep_initial") === "unknown" ? null : numeric("ep_initialStock", 0, -100, 100),
  };
  const baselineYear = numeric("ep_baseF", 1950, 1950, 2023);
  return { parameters, enabled: params.get("forecast") === "1", compareChannels: params.get("ep_compare") === "1",
    fertilityBaselineYear: Number.isInteger(baselineYear) ? baselineYear : 1950 };
}

export function selectAtlasTestosteroneSeries(series: ChangeAtlasSeries[], requested: string | null) {
  const available = series.filter(s => s.metric === "testosterone_total");
  return available.find(s => s.id === requested) ?? available.find(s => s.testosteroneTrendId) ?? available[0];
}

/** Apply only the observation chart's declared display conversion to model output. */
export function endpointDisplayValue(value: number | null, raw: ChangeAtlasSeries, shown: ChangeAtlasSeries, indexYear: number | null): number | null {
  if (value === null || !Number.isFinite(value)) return null;
  if (shown.unit === raw.unit) return value;
  if (shown.unit === "relative_index" && indexYear !== null && raw.frequency === "annual") {
    const baseline = raw.points.find(p => p.year === indexYear)?.value;
    const result = baseline && Number.isFinite(baseline) ? value / baseline * 100 : null;
    return result !== null && Number.isFinite(result) ? result : null;
  }
  return null;
}
