/**
 * A conditional BERM sensitivity experiment, never a fitted historical exposure model.
 * History supplies a user's selected source windows. All normalized field amplitudes,
 * directions, moment assumptions and the biological closure are explicit scenario inputs.
 * FieldState neither defines this operator nor produces its endpoint.
 */
export interface ScenarioSource {
  id: string; startYear: number; endYear: number;
  amplitude: number; angleDegrees: number; enabled: boolean;
  /** Disjoint modeled operating intervals; absent intervals contribute nothing to this scenario. */
  windows?: { startYear: number; endYear: number }[];
  /** Source-scale values, normalized explicitly by the caller; replaces the generic ramp. */
  profile?: { year: number; value: number }[];
  profileMode?: "linear" | "step";
  /** previous = change late; next = change early. Alternatives describe timing, not confidence. */
  profileStep?: "previous" | "next";
  /** Maps normalized source quantity to a potential-mode amplitude, not a measured dose. */
  profileTransform?: "linear" | "sqrt";
  /** Optional endpoint extension inside operation scope; held values remain assumptions. */
  profileOutside?: "unknown" | "hold";
  /** Declared data support. Do not interpolate across these disjoint coverage intervals. */
  profileWindows?: { startYear: number; endYear: number }[];
}
export interface ScenarioSourceEvaluation {
  value: number | null;
  basis: "disabled" | "outside-operation-window" | "legacy-ramp" | "profile-point" | "profile-linear" | "profile-step" | "profile-missing" | "assumed-hold";
}
export interface BermScenarioRunOptions {
  /** Omit is a selected-subset scenario assumption. It never declares an unknown field absent. */
  missingProfile?: "error" | "omit";
}
export interface BermScenarioCoverage {
  policy: "error" | "omit";
  complete: boolean;
  profiledSourceIds: string[];
  legacyRampSourceIds: string[];
  byYear: { year: number; availableProfileIds: string[]; missingProfileIds: string[]; interpolatedProfileIds: string[]; assumedProfileIds: string[] }[];
}
export interface BermAtlasScenarioParameters {
  background: number; coherence: number; meanFraction: number;
  rampYears: number; lagYears: number; memoryYears: number; beta: number;
}
export const DEFAULT_BERM_ATLAS_PARAMETERS: BermAtlasScenarioParameters = {
  background: 1, coherence: 0, meanFraction: 0, rampYears: 8,
  lagYears: 3, memoryYears: 5, beta: 0.15,
};
export interface BermScenarioPoint {
  year: number; geometry: number; self: number; cross: number; backgroundTerm: number;
  response: number; multiplier: number; relativeChangePercent: number;
}
export function validateBermAtlasParameters(p: BermAtlasScenarioParameters): boolean {
  return Object.values(p).every(Number.isFinite) && p.background >= 0 && p.background <= 3
    && p.coherence >= 0 && p.coherence <= 1 && p.meanFraction >= -1 && p.meanFraction <= 1
    && p.rampYears >= 0 && p.rampYears <= 30 && p.lagYears >= 0 && p.lagYears <= 30
    && p.memoryYears >= 0 && p.memoryYears <= 30 && p.beta >= -1 && p.beta <= 1
    && [p.rampYears, p.lagYears, p.memoryYears].every(Number.isInteger);
}
export function evaluateScenarioSource(source: ScenarioSource, year: number, rampYears: number): ScenarioSourceEvaluation {
  if (!validSource(source) || !Number.isFinite(year) || !Number.isFinite(rampYears) || rampYears < 0) throw new Error("Invalid normalized source scenario");
  if (!source.enabled) return { value: 0, basis: "disabled" };
  const window = source.windows ? source.windows.find(w => w.startYear <= year && year <= w.endYear) : source;
  if (!window || year < window.startYear || year > window.endYear) return { value: 0, basis: "outside-operation-window" };
  if (source.profile === undefined) return { value: rampYears === 0 ? 1 : Math.min(1, (year - window.startYear + 1) / rampYears), basis: "legacy-ramp" };
  const support = source.profileWindows?.find(w => w.startYear <= year && year <= w.endYear);
  const dataWindows = source.profileWindows;
  // An explicit internal coverage gap stays unknown even when endpoint holding is selected.
  if (dataWindows && !support && (!dataWindows.length || (year >= dataWindows[0].startYear && year <= dataWindows.at(-1)!.endYear))) return { value: null, basis: "profile-missing" };
  const operationPoints = source.windows && source.windows.length > 1
    ? source.profile.filter(p => window.startYear <= p.year && p.year <= window.endYear) : source.profile;
  const points = support ? operationPoints.filter(p => support.startYear <= p.year && p.year <= support.endYear) : operationPoints;
  const transform = (value: number) => source.profileTransform === "sqrt" ? Math.sqrt(value) : value;
  if (dataWindows && !support && source.profileOutside !== "hold") return { value: null, basis: "profile-missing" };
  const exact = points.find(point => point.year === year);
  if (exact) return { value: transform(exact.value), basis: "profile-point" };
  const right = points.findIndex(point => point.year > year);
  if (right <= 0) {
    if (source.profileOutside === "hold" && points.length) return { value: transform(right === 0 ? points[0].value : points.at(-1)!.value), basis: "assumed-hold" };
    return { value: null, basis: "profile-missing" };
  }
  const a = points[right - 1], b = points[right];
  if (source.profileMode === "step") return { value: transform(source.profileStep === "next" ? b.value : a.value), basis: "profile-step" };
  // Interpolate source quantity first; the declared amplitude mapping is applied afterwards.
  const value = a.value + (b.value - a.value) * (year - a.year) / (b.year - a.year);
  return { value: transform(value), basis: "profile-linear" };
}

/** Legacy numeric accessor: callers must explicitly choose omission for uncovered profile years. */
export function sourceEnvelope(source: ScenarioSource, year: number, rampYears: number, options: BermScenarioRunOptions = {}): number {
  const result = evaluateScenarioSource(source, year, rampYears);
  if (result.value !== null) return result.value;
  if (options.missingProfile === "omit") return 0;
  throw new RangeError(`Missing source profile: ${source.id}, year ${year}`);
}

function validSource(source: ScenarioSource): boolean {
  if (!source.id || typeof source.enabled !== "boolean" || ![source.startYear, source.endYear, source.amplitude, source.angleDegrees].every(Number.isFinite)
    || !Number.isSafeInteger(source.startYear) || !Number.isSafeInteger(source.endYear)
    || source.startYear > source.endYear || source.amplitude < 0 || source.amplitude > 2
    || source.angleDegrees < 0 || source.angleDegrees > 180) return false;
  const orderedWindows = (windows: { startYear: number; endYear: number }[]) => Array.isArray(windows) && windows.every((window, index) =>
    Number.isSafeInteger(window.startYear) && Number.isSafeInteger(window.endYear) && window.startYear <= window.endYear
    && (index === 0 || window.startYear > windows[index - 1].endYear));
  if (source.windows !== undefined && (!orderedWindows(source.windows) || !source.windows.length
    || source.startYear !== source.windows[0].startYear || source.endYear !== source.windows.at(-1)!.endYear)) return false;
  if (source.profileMode !== undefined && !["linear", "step"].includes(source.profileMode)) return false;
  if (source.profileStep !== undefined && !["previous", "next"].includes(source.profileStep)) return false;
  if (source.profileTransform !== undefined && !["linear", "sqrt"].includes(source.profileTransform)) return false;
  if (source.profileOutside !== undefined && !["unknown", "hold"].includes(source.profileOutside)) return false;
  if (source.profileWindows !== undefined && !orderedWindows(source.profileWindows)) return false;
  if (source.profile === undefined) return source.profileMode === undefined && source.profileStep === undefined
    && source.profileTransform === undefined && source.profileWindows === undefined && source.profileOutside === undefined;
  return Array.isArray(source.profile) && source.profile.every((point, index) => Number.isSafeInteger(point.year)
    && Number.isFinite(point.value) && point.value >= 0 && (index === 0 || point.year > source.profile![index - 1].year));
}
/** Exact e^μ e^ν contraction of E[Δg] for the supplied normalized spatial moments.
 * m_j = r b_j n_j, Cov(j,k) = (1-r²)b_j b_k[(1-c)δ_jk+c] n_j⊗n_k.
 * This covariance is positive semidefinite for 0≤c≤1. c is an assumed correlation
 * of the selected effective mode, never inferred phase locking between carriers.
 */
export function contractedGeometry(projected: number[], p: Pick<BermAtlasScenarioParameters, "background" | "coherence" | "meanFraction">) {
  const sum = projected.reduce((a, b) => a + b, 0);
  const squareSum = projected.reduce((a, b) => a + b * b, 0);
  const r2 = p.meanFraction ** 2;
  const pairCoefficient = r2 + (1 - r2) * p.coherence;
  const self = squareSum;
  const cross = pairCoefficient * (sum * sum - squareSum);
  const backgroundTerm = 2 * p.background * p.meanFraction * sum;
  return { self, cross, backgroundTerm, geometry: self + cross + backgroundTerm };
}
export function runBermAtlasScenarioDetailed(sources: ScenarioSource[], p: BermAtlasScenarioParameters, from: number, to: number, baseline: number, options: BermScenarioRunOptions = {}): { points: BermScenarioPoint[]; coverage: BermScenarioCoverage } {
  if (!validateBermAtlasParameters(p) || ![from, to, baseline].every(Number.isInteger) || from > to || from < 1880 || to > 2023 || baseline < from || baseline > to) throw new Error("Invalid BERM scenario parameters");
  if (sources.some(source => !validSource(source)) || new Set(sources.map(source => source.id)).size !== sources.length) throw new Error("Invalid normalized source scenario");
  const policy = options.missingProfile ?? "error";
  if (policy !== "error" && policy !== "omit") throw new Error("Invalid missing-profile policy");
  const coverage: BermScenarioCoverage = {
    policy, complete: true, profiledSourceIds: sources.filter(s => s.profile !== undefined && s.enabled).map(s => s.id),
    legacyRampSourceIds: sources.filter(s => s.profile === undefined && s.enabled).map(s => s.id), byYear: [],
  };
  const cache = new Map<number, ReturnType<typeof contractedGeometry>>();
  const geometryAt = (year: number) => {
    const cached = cache.get(year);
    if (cached) return cached;
    const row: BermScenarioCoverage["byYear"][number] = { year, availableProfileIds: [], missingProfileIds: [], interpolatedProfileIds: [], assumedProfileIds: [] };
    const projected = sources.map(source => {
      const evaluated = evaluateScenarioSource(source, year, p.rampYears);
      if (evaluated.value === null) {
        row.missingProfileIds.push(source.id); coverage.complete = false;
        if (policy === "error") throw new RangeError(`Missing source profile: ${source.id}, year ${year}`);
      } else if (evaluated.basis === "assumed-hold") {
        coverage.complete = false;
        row.assumedProfileIds.push(source.id);
      } else if (evaluated.basis.startsWith("profile-")) {
        row.availableProfileIds.push(source.id);
        if (evaluated.basis !== "profile-point") row.interpolatedProfileIds.push(source.id);
      }
      return source.amplitude * (evaluated.value ?? 0) * Math.cos(source.angleDegrees * Math.PI / 180);
    });
    coverage.byYear.push(row);
    const geometry = contractedGeometry(projected, p);
    cache.set(year, geometry);
    return geometry;
  };
  // Finite, normalized uniform retarded kernel: lag..lag+memory (inclusive).
  // Pre-window years are evaluated from the same declared source windows, not padded with data.
  const responseAt = (year: number) => {
    let total = 0;
    for (let lag = p.lagYears; lag <= p.lagYears + p.memoryYears; lag++) total += geometryAt(year - lag).geometry;
    return total / (p.memoryYears + 1);
  };
  const baseResponse = responseAt(baseline);
  const points = Array.from({ length: to - from + 1 }, (_, i) => {
    const year = from + i;
    const response = responseAt(year) - baseResponse;
    // Explicit additional closure: every age-specific rate gets the same multiplier,
    // with timing, partnership, treatment and all other state components held fixed.
    const multiplier = Math.exp(-p.beta * response);
    const relativeChangePercent = 100 * (multiplier - 1);
    const point = { year, ...geometryAt(year), response, multiplier, relativeChangePercent };
    if (multiplier === 0 || !Object.values(point).every(Number.isFinite)) {
      throw new RangeError("Scenario response exceeds the numerical range; reduce the assumed amplitudes or biological gain.");
    }
    return point;
  });
  coverage.byYear.sort((a, b) => a.year - b.year);
  return { points, coverage };
}

/** Backward-compatible numeric array; detailed callers also retain the coverage metadata. */
export function runBermAtlasScenario(sources: ScenarioSource[], p: BermAtlasScenarioParameters, from: number, to: number, baseline: number, options: BermScenarioRunOptions = {}): BermScenarioPoint[] {
  return runBermAtlasScenarioDetailed(sources, p, from, to, baseline, options).points;
}

export interface ScenarioAsfrSeries {
  ageGroup: string;
  /** Births per 1,000 women in this age group; a null value remains missing. */
  points: { year: number; value: number | null }[];
}
export interface ScenarioAsfrClosure {
  baselineYear: number;
  baselineTfr: number | null;
  ageGroups: string[];
  points: {
    year: number;
    multiplier: number;
    asfr: { ageGroup: string; widthYears: number; baseline: number | null; value: number | null }[];
    tfr: number | null;
    missingAgeGroups: string[];
  }[];
}
const DEFAULT_ASFR_GROUPS = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"];

/** Explicit fixed-other-state closure: multiply exact baseline ASFRs, then sum the same age support.
 * No interpolation, extrapolation, fitting to later TFR or renormalization of missing age groups.
 */
export function applyBermScenarioToAsfr(asfrSeries: ScenarioAsfrSeries[], scenarioPoints: Pick<BermScenarioPoint, "year" | "multiplier">[], baselineYear: number, requiredAgeGroups: readonly string[] = DEFAULT_ASFR_GROUPS): ScenarioAsfrClosure {
  if (!Number.isSafeInteger(baselineYear) || !requiredAgeGroups.length || new Set(requiredAgeGroups).size !== requiredAgeGroups.length
    || new Set(asfrSeries.map(s => s.ageGroup)).size !== asfrSeries.length) throw new Error("Invalid ASFR baseline or age support");
  const ranges = requiredAgeGroups.map(ageGroup => {
    const match = /^(\d+)-(\d+)$/.exec(ageGroup);
    if (!match || Number(match[2]) < Number(match[1])) throw new Error("Invalid ASFR age group");
    return { ageGroup, start: Number(match[1]), end: Number(match[2]), widthYears: Number(match[2]) - Number(match[1]) + 1 };
  });
  if (ranges.some((r, i) => i > 0 && r.start <= ranges[i - 1].end)) throw new Error("ASFR age groups must be ordered and nonoverlapping");
  for (const series of asfrSeries) {
    if (series.points.some((point, index) => !Number.isSafeInteger(point.year)
      || point.value !== null && (!Number.isFinite(point.value) || point.value < 0)
      || index > 0 && point.year <= series.points[index - 1].year)) throw new Error("Invalid ASFR source points");
  }
  if (scenarioPoints.some((point, index) => !Number.isSafeInteger(point.year) || !Number.isFinite(point.multiplier)
    || point.multiplier <= 0 || index > 0 && point.year <= scenarioPoints[index - 1].year)) throw new Error("Invalid ASFR scenario multiplier");
  const baselines = ranges.map(range => ({ ...range,
    baseline: asfrSeries.find(s => s.ageGroup === range.ageGroup)?.points.find(point => point.year === baselineYear)?.value ?? null,
  }));
  const missingAgeGroups = baselines.filter(r => r.baseline === null).map(r => r.ageGroup);
  const baselineTfr = missingAgeGroups.length ? null : baselines.reduce((total, r) => total + r.widthYears * r.baseline! / 1000, 0);
  if (baselineTfr !== null && !Number.isFinite(baselineTfr)) throw new RangeError("ASFR aggregation exceeds the numerical range");
  const points = scenarioPoints.map(point => {
    const asfr = baselines.map(r => ({ ageGroup: r.ageGroup, widthYears: r.widthYears, baseline: r.baseline,
      value: r.baseline === null ? null : r.baseline * point.multiplier,
    }));
    const tfr = missingAgeGroups.length ? null : asfr.reduce((total, r) => total + r.widthYears * r.value! / 1000, 0);
    if (asfr.some(r => r.value !== null && !Number.isFinite(r.value)) || tfr !== null && !Number.isFinite(tfr)) throw new RangeError("ASFR scenario exceeds the numerical range");
    return { year: point.year, multiplier: point.multiplier, asfr, tfr, missingAgeGroups: [...missingAgeGroups] };
  });
  return { baselineYear, baselineTfr, ageGroups: [...requiredAgeGroups], points };
}

export function parseBermScenarioParameters(params: Pick<URLSearchParams, "get">): BermAtlasScenarioParameters {
  const result = { ...DEFAULT_BERM_ATLAS_PARAMETERS };
  for (const key of Object.keys(result) as (keyof BermAtlasScenarioParameters)[]) {
    const raw = params.get(`s_${key}`);
    if (raw !== null && raw.trim() !== "" && Number.isFinite(Number(raw))) result[key] = Number(raw);
  }
  return validateBermAtlasParameters(result) ? result : { ...DEFAULT_BERM_ATLAS_PARAMETERS };
}
