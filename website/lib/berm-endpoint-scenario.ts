/**
 * BERM's conditional annual/history experiment. This module never fits endpoints.
 *
 * [DERIVED] In the 2025 convention g = eta + kappa A⊗A, adding b gives
 * Δg = kappa(A⊗b + b⊗A + b⊗b). contractedGeometry supplies the explicit
 * e^mu e^nu contraction of the chosen normalized spatial first/second moments.
 * G(t) below is that signed projection, not a measured field dose or tissue drive.
 *
 * [CONDITIONAL BERM CLOSURES] U(t)=mean_{d=lag..lag+memory} G(t-d).
 * C(t)=lambda C(t-1)+U(t)*1yr, lambda=2^(-1yr/halfLife).
 * This is a discrete annual impulse/retention convention, not the exact continuous
 * constant-input ODE discretization. C is a signed retained projection in
 * normalized-projection years, not organismal burden or a person's lifetime dose.
 * annualWeight*U and historyWeight*C form separate dimensionless channels;
 * historyWeight has units 1/yr. Combining them is an additional two-kernel
 * closure; a possible overlap between pathways is not independently identified.
 *
 * [OPEN] Gauge, kappa/physical scale, local source transfer, tissue/state kernels,
 * sign, recovery time and endpoint gains need calibration. The source-quantity
 * to normalized-potential mapping remains the caller's hypothesis. FieldState
 * may supply physical observations, but defines none of these BERM operators.
 */
import {
  applyBermScenarioToAsfr,
  contractedGeometry,
  evaluateScenarioSource,
  validateBermAtlasParameters,
  type BermAtlasScenarioParameters,
  type ScenarioAsfrSeries,
  type ScenarioSource,
} from "./berm-atlas-scenario";

export const BERM_ENDPOINT_MODES = ["annual", "accumulated", "combined"] as const;
export type BermEndpointMode = typeof BERM_ENDPOINT_MODES[number];
export type BermEndpointChannels<T> = Record<BermEndpointMode, T>;
export interface BermEndpointParameters extends Omit<BermAtlasScenarioParameters, "beta"> {
  mode: BermEndpointMode;
  /** Discrete retention half-life. Zero means no carry-over from the prior year. */
  halfLifeYears: number;
  annualWeight: number;
  /** Inverse years; makes the accumulated channel dimensionless. */
  historyWeight: number;
  /** Separate illustrative, signed endpoint gains; neither is fitted. */
  betaF: number;
  betaT: number;
  /** Fixed integration origin, independent of the visible date range. */
  historyStartYear: number;
  /** C(historyStartYear-1). Zero is a declared truncation assumption; null is unknown. */
  initialStock: number | null;
}
export const DEFAULT_BERM_ENDPOINT_PARAMETERS: BermEndpointParameters = {
  background: 1, coherence: 0, meanFraction: 0, rampYears: 8,
  lagYears: 3, memoryYears: 5, mode: "combined", halfLifeYears: 20,
  annualWeight: 1, historyWeight: 0.05, betaF: 0.15, betaT: 0.15,
  historyStartYear: 1880, initialStock: 0,
};
export interface BermEndpointHistoryPoint {
  year: number;
  /** Unlagged, dimensionless, signed source-state projection G(t). */
  geometry: number | null;
  self: number | null;
  cross: number | null;
  backgroundTerm: number | null;
  /** Retarded annual component U(t), in normalized projection units. */
  annual: number | null;
  /** C(t), in normalized projection years. */
  accumulated: number | null;
  channels: BermEndpointChannels<number | null>;
  selected: number | null;
}
export interface BermEndpointCoverageYear {
  year: number;
  availableProfileIds: string[];
  missingProfileIds: string[];
  interpolatedProfileIds: string[];
  assumedProfileIds: string[];
}
export interface BermEndpointScenario {
  parameters: BermEndpointParameters;
  points: BermEndpointHistoryPoint[];
  history: BermEndpointHistoryPoint[];
  coverage: {
    /** Complete numerical support is not an assertion of measured physical coverage. */
    complete: boolean;
    known: boolean;
    profiledSourceIds: string[];
    legacyRampSourceIds: string[];
    byYear: BermEndpointCoverageYear[];
    unknownHistoryYears: number[];
  };
  assumptions: {
    model: "BERM";
    historyStartYear: number;
    initialStockYear: number;
    initialStock: number | null;
    prehistory: "assumed-zero" | "assumed-stock" | "unknown";
    lambda: number;
    timeStepYears: 1;
    kernel: "discrete-annual-retention";
    annualUnit: "normalized-projection";
    accumulatedUnit: "normalized-projection-years";
    endpointCalibration: "unidentified-scenario-gains";
  };
}
export interface BermEndpointEffect {
  multiplier: number | null;
  relativeChangePercent: number | null;
}
export interface BermFertilityEffect extends BermEndpointEffect {
  tfr: number | null;
  asfr: { ageGroup: string; widthYears: number; baseline: number | null; value: number | null }[];
}
export interface BermFertilityScenario {
  unit: "births-per-woman";
  baselineYear: number;
  baselineTfr: number | null;
  missingAgeGroups: string[];
  anchorStatus: "available" | "missing-asfr" | "missing-history" | "missing-asfr-and-history";
  channelAnchorStatus: BermEndpointChannels<"available" | "missing-history">;
  points: { year: number; channels: BermEndpointChannels<BermFertilityEffect>; selected: BermFertilityEffect }[];
}
export interface BermTestosteroneBaseline {
  value: number;
  unit: string;
  sourceId: string;
  /** Defaults to arithmetic mean; medians require an exact single-calendar-year anchor. */
  statistic?: "arithmetic_mean" | "median";
  period: { startYear: number; endYear: number; label: string };
  /** Optional sample-year weights; absent means equal calendar-year weights. */
  yearWeights?: { year: number; weight: number }[];
}
export interface BermTestosteroneEffect extends BermEndpointEffect {
  value: number | null;
}
export interface BermTestosteroneScenario {
  unit: string;
  baseline: BermTestosteroneBaseline;
  statistic: "arithmetic_mean" | "median";
  /** Null when the source statistic has no supported period aggregation rule. */
  weighting: "uniform-calendar-years" | "supplied-year-weights" | null;
  anchorStatus: "available" | "missing-history" | "unsupported-statistic";
  channelAnchorStatus: BermEndpointChannels<"available" | "missing-history" | "unsupported-statistic">;
  points: { year: number; channels: BermEndpointChannels<BermTestosteroneEffect>; selected: BermTestosteroneEffect }[];
}

function mapChannels<T>(fn: (mode: BermEndpointMode) => T): BermEndpointChannels<T> {
  return { annual: fn("annual"), accumulated: fn("accumulated"), combined: fn("combined") };
}
function finite(value: number): number {
  if (!Number.isFinite(value)) throw new RangeError("BERM endpoint scenario exceeds the numerical range");
  return value;
}
function weighted(value: number | null, weight: number): number | null {
  // A deliberately disabled channel does not require its unknown input.
  return weight === 0 ? 0 : value === null ? null : finite(value * weight);
}
export function validateBermEndpointParameters(p: BermEndpointParameters): boolean {
  const { mode, halfLifeYears, annualWeight, historyWeight, betaF, betaT, historyStartYear, initialStock, ...geometry } = p;
  return validateBermAtlasParameters({ ...geometry, beta: 0 })
    && BERM_ENDPOINT_MODES.includes(mode)
    && [halfLifeYears, annualWeight, historyWeight, betaF, betaT].every(Number.isFinite)
    && halfLifeYears >= 0 && annualWeight >= 0 && historyWeight >= 0
    && Math.abs(betaF) <= 1 && Math.abs(betaT) <= 1
    && Number.isSafeInteger(historyStartYear) && historyStartYear >= 0
    && (initialStock === null || Number.isFinite(initialStock));
}

/** Missing enabled source profiles propagate null; there is no implicit omit policy. */
export function runBermEndpointScenario(sources: ScenarioSource[], p: BermEndpointParameters, from: number, to: number): BermEndpointScenario {
  if (!validateBermEndpointParameters(p) || ![from, to].every(Number.isSafeInteger)
    || from < p.historyStartYear || from > to || to - p.historyStartYear > 1000) throw new Error("Invalid BERM endpoint scenario parameters");
  if (new Set(sources.map(s => s.id)).size !== sources.length) throw new Error("Duplicate BERM source identity");
  const byYear: BermEndpointCoverageYear[] = [];
  const cache = new Map<number, ReturnType<typeof contractedGeometry> | null>();
  const geometryAt = (year: number): ReturnType<typeof contractedGeometry> | null => {
    if (cache.has(year)) return cache.get(year)!;
    const row: BermEndpointCoverageYear = { year, availableProfileIds: [], missingProfileIds: [], interpolatedProfileIds: [], assumedProfileIds: [] };
    const projected: number[] = [];
    for (const source of sources) {
      const evaluated = evaluateScenarioSource(source, year, p.rampYears);
      if (evaluated.value === null) row.missingProfileIds.push(source.id);
      else {
        projected.push(finite(source.amplitude * evaluated.value * Math.cos(source.angleDegrees * Math.PI / 180)));
        if (evaluated.basis === "assumed-hold") row.assumedProfileIds.push(source.id);
        else if (evaluated.basis.startsWith("profile-")) {
          row.availableProfileIds.push(source.id);
          if (evaluated.basis !== "profile-point") row.interpolatedProfileIds.push(source.id);
        }
      }
    }
    // The omitted terms cannot be inferred from the known subset: preserve the unknown total.
    const result = row.missingProfileIds.length ? null : contractedGeometry(projected, p);
    if (result) Object.values(result).forEach(finite);
    byYear.push(row);
    cache.set(year, result);
    return result;
  };
  const lambda = p.halfLifeYears === 0 ? 0 : 2 ** (-1 / p.halfLifeYears);
  let stock = p.initialStock;
  const history: BermEndpointHistoryPoint[] = [];
  for (let year = p.historyStartYear; year <= to; year++) {
    const g = geometryAt(year);
    let annual: number | null = 0;
    for (let delay = p.lagYears; delay <= p.lagYears + p.memoryYears; delay++) {
      const lagged = geometryAt(year - delay);
      annual = annual === null || lagged === null ? null : finite(annual + lagged.geometry / (p.memoryYears + 1));
    }
    const retained = lambda === 0 ? 0 : stock === null ? null : finite(lambda * stock);
    stock = retained === null || annual === null ? null : finite(retained + annual);
    const annualChannel = weighted(annual, p.annualWeight);
    const historyChannel = weighted(stock, p.historyWeight);
    const channels = { annual: annualChannel, accumulated: historyChannel,
      combined: annualChannel === null || historyChannel === null ? null : finite(annualChannel + historyChannel) };
    history.push({ year, geometry: g?.geometry ?? null, self: g?.self ?? null, cross: g?.cross ?? null,
      backgroundTerm: g?.backgroundTerm ?? null, annual, accumulated: stock, channels, selected: channels[p.mode] });
  }
  byYear.sort((a, b) => a.year - b.year);
  const legacyRampSourceIds = sources.filter(s => s.enabled && s.profile === undefined).map(s => s.id);
  const known = p.initialStock !== null && byYear.every(row => !row.missingProfileIds.length);
  return {
    parameters: { ...p }, points: history.filter(point => point.year >= from), history,
    coverage: { known, complete: known && !legacyRampSourceIds.length && byYear.every(row => !row.assumedProfileIds.length),
      profiledSourceIds: sources.filter(s => s.enabled && s.profile !== undefined).map(s => s.id),
      legacyRampSourceIds, byYear, unknownHistoryYears: history.filter(point => point.accumulated === null).map(point => point.year) },
    assumptions: { model: "BERM", historyStartYear: p.historyStartYear, initialStockYear: p.historyStartYear - 1,
      initialStock: p.initialStock, prehistory: p.initialStock === null ? "unknown" : p.initialStock === 0 ? "assumed-zero" : "assumed-stock",
      lambda, timeStepYears: 1, kernel: "discrete-annual-retention", annualUnit: "normalized-projection",
      accumulatedUnit: "normalized-projection-years", endpointCalibration: "unidentified-scenario-gains" },
  };
}

function effect(logMultiplier: number | null): BermEndpointEffect {
  if (logMultiplier === null) return { multiplier: null, relativeChangePercent: null };
  const multiplier = finite(Math.exp(logMultiplier));
  if (multiplier === 0) throw new RangeError("BERM endpoint multiplier underflows; reduce the assumed gain");
  return { multiplier, relativeChangePercent: finite(100 * (multiplier - 1)) };
}

/** Uniform ASFR multiplier with all other age-specific state held fixed. Later data are never fitted. */
export function applyBermEndpointToAsfr(scenario: BermEndpointScenario, asfr: ScenarioAsfrSeries[], baselineYear: number): BermFertilityScenario {
  // Reuse the canonical age-support and observed-baseline validation/aggregation.
  const baseline = applyBermScenarioToAsfr(asfr, [{ year: baselineYear, multiplier: 1 }], baselineYear);
  const ageBaseline = baseline.points[0];
  const basePoint = scenario.history.find(point => point.year === baselineYear);
  const channelAnchorStatus = mapChannels(mode => basePoint?.channels[mode] === null || basePoint?.channels[mode] === undefined
    ? "missing-history" as const : "available" as const);
  const missingHistory = channelAnchorStatus[scenario.parameters.mode] === "missing-history";
  const missingAsfr = ageBaseline.missingAgeGroups.length > 0;
  const points = scenario.points.map(point => {
    const channels = mapChannels(mode => {
      const current = point.channels[mode], base = basePoint?.channels[mode] ?? null;
      const applied = effect(current === null || base === null ? null : -scenario.parameters.betaF * (current - base));
      const rates = ageBaseline.asfr.map(rate => ({ ...rate,
        value: applied.multiplier === null || rate.baseline === null ? null : finite(rate.baseline * applied.multiplier) }));
      const tfr = missingAsfr || applied.multiplier === null ? null : finite(rates.reduce((sum, rate) => sum + rate.widthYears * rate.value! / 1000, 0));
      return { ...applied, asfr: rates, tfr };
    });
    return { year: point.year, channels, selected: channels[scenario.parameters.mode] };
  });
  return { unit: "births-per-woman", baselineYear, baselineTfr: baseline.baselineTfr,
    missingAgeGroups: ageBaseline.missingAgeGroups, channelAnchorStatus,
    anchorStatus: missingAsfr ? missingHistory ? "missing-asfr-and-history" : "missing-asfr" : missingHistory ? "missing-history" : "available", points };
}

/**
 * Anchors a study-period mean, not an invented annual observation. At each channel,
 * T(t)=T_period*exp[-betaT*S(t)] / sum_y w_y exp[-betaT*S(y)].
 * Thus the weighted model mean over the baseline period equals the source value.
 * Uniform calendar-year weighting is an explicit approximation when the source
 * does not provide sample-year weights. No later testosterone value is accepted.
 * An exact annual median scales by the same positive annual multiplier under
 * the uniform-within-group response assumption: median(kX)=k median(X), k>0.
 * A pooled multi-year median has no such mean-of-years identity and remains
 * unsupported without a distribution/aggregation closure; sample-year weights
 * alone do not identify that median. The native source observation is preserved.
 */
export function applyBermEndpointToTestosterone(scenario: BermEndpointScenario, baseline: BermTestosteroneBaseline): BermTestosteroneScenario {
  const { startYear, endYear } = baseline.period;
  const statistic = baseline.statistic ?? "arithmetic_mean";
  if (!Number.isFinite(baseline.value) || baseline.value <= 0 || !baseline.unit.trim() || !baseline.sourceId.trim()
    || !baseline.period.label.trim() || ![startYear, endYear].every(Number.isSafeInteger) || startYear > endYear
    || endYear - startYear > 1000 || !["arithmetic_mean", "median"].includes(statistic)) throw new Error("Invalid testosterone source-period baseline");
  const unsupportedStatistic = statistic === "median" && startYear !== endYear;
  const weights = baseline.yearWeights ?? Array.from({ length: endYear - startYear + 1 }, (_, i) => ({ year: startYear + i, weight: 1 }));
  if (!weights.length || new Set(weights.map(w => w.year)).size !== weights.length || weights.some(w =>
    !Number.isSafeInteger(w.year) || w.year < startYear || w.year > endYear || !Number.isFinite(w.weight) || w.weight <= 0)) throw new Error("Invalid testosterone baseline year weights");
  const weightSum = finite(weights.reduce((sum, w) => sum + w.weight, 0));
  const baseLog = mapChannels(mode => {
    if (unsupportedStatistic) return null;
    const values = weights.map(weight => ({ weight: weight.weight / weightSum,
      signal: scenario.history.find(point => point.year === weight.year)?.channels[mode] ?? null }));
    if (values.some(value => value.signal === null)) return null;
    const exponents = values.map(value => finite(-scenario.parameters.betaT * value.signal!));
    const max = Math.max(...exponents);
    return finite(max + Math.log(values.reduce((sum, value, index) => sum + value.weight * Math.exp(exponents[index] - max), 0)));
  });
  const channelAnchorStatus = mapChannels(mode => unsupportedStatistic ? "unsupported-statistic" as const
    : baseLog[mode] === null ? "missing-history" as const : "available" as const);
  const points = scenario.points.map(point => {
    const channels = mapChannels(mode => {
      const signal = point.channels[mode], reference = baseLog[mode];
      const applied = effect(signal === null || reference === null ? null : -scenario.parameters.betaT * signal - reference);
      return { ...applied, value: applied.multiplier === null ? null : finite(baseline.value * applied.multiplier) };
    });
    return { year: point.year, channels, selected: channels[scenario.parameters.mode] };
  });
  return { unit: baseline.unit, baseline, statistic,
    weighting: unsupportedStatistic ? null : baseline.yearWeights ? "supplied-year-weights" : "uniform-calendar-years",
    anchorStatus: channelAnchorStatus[scenario.parameters.mode], channelAnchorStatus, points };
}
