/**
 * Conditional endpoint calibration downstream of BERM's 2025 tensor projection.
 * The caller fixes source normalization, geometry/moments and U/C kernels first.
 * Each channel fits ONE signed effective gain; it does not jointly estimate
 * beta, annual/history weights, source amplitudes, kappa or a tissue kernel.
 *
 * For an arithmetic-mean period P, L_P(beta)=log mean_{t in P} exp(-beta S_t).
 * The reference anchor B fixes logScale=log(y_B)-L_B(beta). The loss is the
 * equal-period mean of [logScale+L_P(beta)-log(y_P)]² on training rows only.
 * An exact annual median is supported by median(kX)=k median(X), k>0, under
 * the declared uniform-within-group response. Pooled medians are not means.
 *
 * This identifies a gain conditional on the complete imported-input/model
 * choices. It cannot identify physical EMF dose, gauge, kappa, source-to-organ
 * transfer or causal human effects. Nor does it validate Lindgren upstream.
 * Fitting both U and C jointly would add a strongly collinear second parameter;
 * fitting beta and their free weights jointly would be structurally unidentified.
 * Baseline observations and boundary holds have uncertainty; no causal interval
 * or confidence interval is manufactured from percentiles or reported SEs here.
 */
import type { ChangeAtlasPoint, ChangeAtlasSeries } from "./change-atlas-data";
import { type BermEndpointChannels, type BermEndpointMode,
  type BermEndpointParameters, type BermEndpointScenario } from "./berm-endpoint-scenario";

export interface BermCalibrationPeriod { startYear: number; endYear: number; sourceId?: string }
export interface BermCalibrationBaseline {
  value: number;
  period: { startYear: number; endYear: number; label: string };
  sourceId: string;
}
export interface BermEndpointCalibrationProtocol {
  throughYear: number;
  /** The complete set of comparable source periods, before the temporal split. */
  eligiblePeriods?: BermCalibrationPeriod[];
  /** E.g. the actual baseline-year ASFR sum. Explicit null forbids a source-value fallback. */
  baselineOverride?: BermCalibrationBaseline | null;
  search?: { initialBound?: number; maxBound?: number };
}
export type BermEndpointCalibrationStatus = "calibrated" | "insufficient-points" | "no-information"
  | "non-identifiable" | "unknown-history" | "unsupported-statistic" | "unsupported-endpoint" | "nonfinite" | "search-bound";
export interface BermCalibrationObservation {
  id: string;
  seriesId: string;
  year: number;
  startYear: number;
  endYear: number;
  value: number;
  sourceId: string;
  sourceLocator: string;
  /** Exact original source fields, including SE/percentiles/eligible collection years. */
  sourcePoint: ChangeAtlasPoint;
}
export interface BermCalibrationExcluded {
  observation: BermCalibrationObservation;
  reason: "not-eligible" | "crosses-cutoff" | "unsupported-statistic" | "nonpositive-or-nonfinite" | "invalid-period";
}
export interface BermCalibrationPeriodPrediction {
  observation: BermCalibrationObservation;
  startYear: number;
  endYear: number;
  sourceId: string;
  sourceLocator: string;
  role: "calibration" | "heldout";
  observed: number;
  predicted: number | null;
  logResidual: number | null;
}
export interface BermCalibrationMetrics {
  n: number;
  total: number;
  logRMSE: number | null;
  nativeRMSE: number | null;
}
export interface BermEndpointChannelCalibration {
  mode: BermEndpointMode;
  status: BermEndpointCalibrationStatus;
  beta: number | null;
  /** Locked from the REFERENCE scenario and baseline. Never re-normalize in prediction. */
  logScale: number | null;
  trainingMetrics: BermCalibrationMetrics;
  holdoutMetrics: BermCalibrationMetrics;
  periodPredictions: BermCalibrationPeriodPrediction[];
  search: { initialBound: number; maxBound: number; candidateBeta: number | null; minimizerBetas: number[]; evaluations: number };
}
export interface BermEndpointCalibration {
  seriesId: string;
  countryId: string;
  unit: ChangeAtlasSeries["unit"];
  statistic: "arithmetic_mean" | "median";
  protocol: BermEndpointCalibrationProtocol;
  baseline: BermCalibrationBaseline | null;
  baselineOrigin: "source-observation" | "explicit-override" | "unavailable";
  included: BermCalibrationObservation[];
  heldOut: BermCalibrationObservation[];
  excluded: BermCalibrationExcluded[];
  referenceParameters: BermEndpointParameters;
  channels: BermEndpointChannels<BermEndpointChannelCalibration>;
  metadata: {
    kind: "conditional-endpoint-calibration";
    model: "BERM";
    physicalIdentification: "open";
    causalIdentification: "open";
    freeGainCountPerChannel: 1;
    intercept: "fixed-by-reference-baseline";
    kernelAndSourceMapping: "fixed-before-fitting";
    loss: "equal-period-squared-log-error";
    periodWeighting: "uniform-calendar-years";
    uncertainty: "descriptive-errors-only";
  };
}
export interface BermCalibratedEndpointValue {
  value: number | null;
  multiplier: number | null;
  relativeChangePercent: number | null;
}
export interface BermCalibratedEndpointPrediction {
  unit: ChangeAtlasSeries["unit"];
  baseline: BermCalibrationBaseline | null;
  points: { year: number; channels: BermEndpointChannels<BermCalibratedEndpointValue>; selected: BermCalibratedEndpointValue }[];
  periodPredictions: BermEndpointChannels<BermCalibrationPeriodPrediction[]>;
  calibrationApplied: "locked-beta-and-logScale";
}

function channels<T>(fn: (mode: BermEndpointMode) => T): BermEndpointChannels<T> {
  return { annual: fn("annual"), accumulated: fn("accumulated"), combined: fn("combined") };
}
function validPeriod(start: number, end: number) {
  return Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end && end - start <= 1000;
}
function observation(series: ChangeAtlasSeries, point: ChangeAtlasPoint): BermCalibrationObservation {
  const startYear = point.startYear ?? point.year, endYear = point.endYear ?? point.year;
  return { id: `${series.id}|${point.sourceId}|${startYear}:${endYear}|${point.sourceLocator}`,
    seriesId: series.id, year: point.year, startYear, endYear, value: point.value,
    sourceId: point.sourceId, sourceLocator: point.sourceLocator, sourcePoint: structuredClone(point) };
}
function periodSignals(scenario: BermEndpointScenario, mode: BermEndpointMode, period: BermCalibrationPeriod): number[] | null {
  const index = new Map(scenario.history.map(point => [point.year, point.channels[mode]]));
  const values: number[] = [];
  for (let year = period.startYear; year <= period.endYear; year++) {
    const value = index.get(year);
    if (value === null || value === undefined || !Number.isFinite(value)) return null;
    values.push(value);
  }
  return values.length ? values : null;
}
function logMeanExp(signals: number[], beta: number): number | null {
  const exponents = signals.map(value => -beta * value);
  if (exponents.some(value => !Number.isFinite(value))) return null;
  const max = Math.max(...exponents);
  const result = max + Math.log(exponents.reduce((sum, value) => sum + Math.exp(value - max), 0) / exponents.length);
  return Number.isFinite(result) ? result : null;
}
function finiteExp(log: number | null): number | null {
  if (log === null || !Number.isFinite(log)) return null;
  const value = Math.exp(log);
  return value > 0 && Number.isFinite(value) ? value : null;
}
function metrics(rows: BermCalibrationPeriodPrediction[]): BermCalibrationMetrics {
  const finite = rows.filter(row => row.predicted !== null && row.logResidual !== null);
  const missing = finite.length !== rows.length || !rows.length;
  const logRMSE = missing ? null : Math.hypot(...finite.map(row => row.logResidual!)) / Math.sqrt(finite.length);
  const nativeRMSE = missing ? null : Math.hypot(...finite.map(row => row.predicted! - row.observed)) / Math.sqrt(finite.length);
  return { n: finite.length, total: rows.length,
    logRMSE: logRMSE !== null && Number.isFinite(logRMSE) ? logRMSE : null,
    nativeRMSE: nativeRMSE !== null && Number.isFinite(nativeRMSE) ? nativeRMSE : null };
}
function predictPeriods(scenario: BermEndpointScenario, mode: BermEndpointMode, included: BermCalibrationObservation[], heldOut: BermCalibrationObservation[],
  beta: number | null, logScale: number | null): BermCalibrationPeriodPrediction[] {
  return [...included.map(row => ({ row, role: "calibration" as const })), ...heldOut.map(row => ({ row, role: "heldout" as const }))].map(({ row, role }) => {
    const signals = beta === null || logScale === null ? null : periodSignals(scenario, mode, row);
    const logMean = signals === null || beta === null ? null : logMeanExp(signals, beta);
    const logPrediction = logMean === null || logScale === null ? null : logScale + logMean;
    const predicted = finiteExp(logPrediction);
    return { observation: row, startYear: row.startYear, endYear: row.endYear, sourceId: row.sourceId, sourceLocator: row.sourceLocator,
      role, observed: row.value, predicted,
      logResidual: predicted === null || logPrediction === null ? null : logPrediction - Math.log(row.value) };
  });
}
/** Exact equality of the finite uniform empirical signal distributions, including repeated years. */
function sameDistribution(a: number[], b: number[]): boolean {
  const weights = (values: number[]) => {
    const counts = new Map<number, number>();
    for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1 / values.length);
    return counts;
  };
  const first = weights(a), second = weights(b);
  return first.size === second.size && [...first].every(([value, weight]) => Math.abs(weight - (second.get(value) ?? -1)) < 1e-12);
}

/** Deterministic symmetric multiscale scan, then bounded refinement of each sampled local minimum. */
function searchGain(loss: (beta: number) => number, initialBound: number, maxBound: number) {
  let evaluations = 0;
  const evaluate = (beta: number) => { evaluations++; const value = loss(beta); return Number.isFinite(value) ? value : Infinity; };
  const positive = new Set<number>();
  let lo = 0, hi = Math.min(initialBound, maxBound);
  while (true) {
    for (let i = 1; i <= 16; i++) positive.add(lo + (hi - lo) * i / 16);
    if (hi === maxBound) break;
    lo = hi; hi = Math.min(maxBound, hi * 2);
  }
  const grid = [...positive].map(value => -value).concat([0], [...positive]).sort((a, b) => a - b);
  const values = grid.map(evaluate);
  let best = { beta: 0, loss: Infinity };
  const minima: { beta: number; loss: number }[] = [];
  const consider = (beta: number, value: number) => { if (value < best.loss) best = { beta, loss: value }; };
  grid.forEach((beta, index) => consider(beta, values[index]));
  const ratio = (Math.sqrt(5) - 1) / 2;
  for (let i = 1; i < grid.length - 1; i++) {
    if (!(values[i] <= values[i - 1] && values[i] <= values[i + 1]) || !Number.isFinite(values[i])) continue;
    let a = grid[i - 1], b = grid[i + 1];
    let c = b - ratio * (b - a), d = a + ratio * (b - a), fc = evaluate(c), fd = evaluate(d);
    for (let iteration = 0; iteration < 100 && b - a > 1e-10 * Math.max(1, Math.abs((a + b) / 2)); iteration++) {
      if (fc <= fd) { b = d; d = c; fd = fc; c = b - ratio * (b - a); fc = evaluate(c); }
      else { a = c; c = d; fc = fd; d = a + ratio * (b - a); fd = evaluate(d); }
    }
    consider(c, fc); consider(d, fd);
    minima.push(fc <= fd ? { beta: c, loss: fc } : { beta: d, loss: fd });
  }
  // Period means can identify |beta| but not its sign (e.g. cosh(beta)). Do not
  // publish an arbitrary branch as a unique calibration. This is a numerical
  // equal-minimum check on the declared search range, not a confidence interval.
  const minimizerBetas: number[] = [];
  for (const candidate of [best, ...minima].sort((a, b) => a.beta - b.beta)) {
    if (Number.isFinite(candidate.loss) && Math.abs(candidate.loss - best.loss) <= 1e-12 * Math.max(1, best.loss)
      && minimizerBetas.every(value => Math.abs(value - candidate.beta) > 1e-5 * Math.max(1, Math.abs(value), Math.abs(candidate.beta)))) {
      minimizerBetas.push(candidate.beta);
    }
  }
  return { ...best, evaluations, minimizerBetas, atBound: Math.abs(best.beta) >= maxBound * (1 - 1e-8) };
}

/** No held-out endpoint value enters baseline selection, the objective, or its search. */
export function calibrateBermEndpoint(scenario: BermEndpointScenario, series: ChangeAtlasSeries,
  protocol: BermEndpointCalibrationProtocol): BermEndpointCalibration {
  const initialBound = protocol.search?.initialBound ?? 1, maxBound = protocol.search?.maxBound ?? 1e6;
  if (!Number.isSafeInteger(protocol.throughYear) || !Number.isFinite(initialBound) || !Number.isFinite(maxBound)
    || initialBound <= 0 || maxBound <= 0 || initialBound > maxBound
    || protocol.eligiblePeriods?.some(period => !validPeriod(period.startYear, period.endYear))) throw new Error("Invalid endpoint calibration protocol");
  const statistic = series.statistic === "median" ? "median" : "arithmetic_mean";
  const included: BermCalibrationObservation[] = [], heldOut: BermCalibrationObservation[] = [], excluded: BermCalibrationExcluded[] = [];
  const rows = series.points.map(point => observation(series, point)).sort((a, b) => a.startYear - b.startYear || a.endYear - b.endYear);
  if (new Set(rows.map(row => row.id)).size !== rows.length) throw new Error("Duplicate endpoint source observation");
  for (const row of rows) {
    let reason: BermCalibrationExcluded["reason"] | undefined;
    if (!validPeriod(row.startYear, row.endYear)) reason = "invalid-period";
    else if (!(row.value > 0) || !Number.isFinite(row.value)) reason = "nonpositive-or-nonfinite";
    else if (statistic === "median" && row.startYear !== row.endYear) reason = "unsupported-statistic";
    else if (protocol.eligiblePeriods && !protocol.eligiblePeriods.some(period => period.startYear === row.startYear && period.endYear === row.endYear
      && (period.sourceId === undefined || period.sourceId === row.sourceId))) reason = "not-eligible";
    else if (row.startYear <= protocol.throughYear && row.endYear > protocol.throughYear) reason = "crosses-cutoff";
    if (reason) excluded.push({ observation: row, reason });
    else if (row.endYear <= protocol.throughYear) included.push(row);
    else heldOut.push(row);
  }
  const first = included[0];
  const baseline = protocol.baselineOverride !== undefined ? protocol.baselineOverride : (first ? { value: first.value, sourceId: first.sourceId,
    period: { startYear: first.startYear, endYear: first.endYear, label: first.sourcePoint.period?.en ?? String(first.year) } } : null);
  if (baseline && (!(baseline.value > 0) || !Number.isFinite(baseline.value) || !baseline.sourceId.trim()
    || !validPeriod(baseline.period.startYear, baseline.period.endYear) || baseline.period.endYear > protocol.throughYear
    || !baseline.period.label.trim())) throw new Error("Invalid or post-training endpoint calibration baseline");
  const fitted = channels(mode => {
    let status: BermEndpointCalibrationStatus = "calibrated", beta: number | null = null, logScale: number | null = null;
    let candidateBeta: number | null = null, evaluations = 0, minimizerBetas: number[] = [];
    const baseSignals = baseline ? periodSignals(scenario, mode, baseline.period) : null;
    const signals = included.map(row => periodSignals(scenario, mode, row));
    if (series.metric !== "tfr" && series.metric !== "testosterone_total") status = "unsupported-endpoint";
    else if (statistic === "median" && (baseline && baseline.period.startYear !== baseline.period.endYear || !included.length && excluded.some(row => row.reason === "unsupported-statistic"))) status = "unsupported-statistic";
    else if (!baseline || included.length < 2) status = "insufficient-points";
    else if (baseSignals === null || signals.some(values => values === null)) status = "unknown-history";
    else if (signals.every(values => sameDistribution(values!, baseSignals))) status = "no-information";
    else {
      const logBaseValue = Math.log(baseline.value);
      const loss = (gain: number) => {
        const baseLog = logMeanExp(baseSignals, gain);
        if (baseLog === null) return Infinity;
        const residuals = signals.map((values, index) => {
          const predicted = logMeanExp(values!, gain);
          return predicted === null ? Infinity : logBaseValue - baseLog + predicted - Math.log(included[index].value);
        });
        const rms = Math.hypot(...residuals) / Math.sqrt(residuals.length);
        return rms * rms;
      };
      const found = searchGain(loss, initialBound, maxBound);
      candidateBeta = found.beta; evaluations = found.evaluations; minimizerBetas = found.minimizerBetas;
      if (!Number.isFinite(found.loss)) status = "nonfinite";
      else if (found.atBound) status = "search-bound";
      else if (found.minimizerBetas.length > 1) status = "non-identifiable";
      else {
        beta = found.beta;
        logScale = logBaseValue - logMeanExp(baseSignals, beta)!;
        if (!Number.isFinite(logScale)) { status = "nonfinite"; beta = null; logScale = null; }
      }
    }
    let periodPredictions = predictPeriods(scenario, mode, included, heldOut, beta, logScale);
    if (status === "calibrated" && periodPredictions.some(row => row.role === "calibration" && row.predicted === null)) {
      status = "nonfinite"; beta = null; logScale = null;
      periodPredictions = predictPeriods(scenario, mode, included, heldOut, null, null);
    }
    return { mode, status, beta, logScale, periodPredictions,
      trainingMetrics: metrics(periodPredictions.filter(row => row.role === "calibration")),
      holdoutMetrics: metrics(periodPredictions.filter(row => row.role === "heldout")),
      search: { initialBound, maxBound, candidateBeta, minimizerBetas, evaluations } };
  });
  return { seriesId: series.id, countryId: series.countryId, unit: series.unit, statistic,
    protocol: structuredClone(protocol), baseline: baseline ? structuredClone(baseline) : null,
    baselineOrigin: protocol.baselineOverride ? "explicit-override" : baseline ? "source-observation" : "unavailable",
    included, heldOut, excluded, referenceParameters: { ...scenario.parameters }, channels: fitted,
    metadata: { kind: "conditional-endpoint-calibration", model: "BERM", physicalIdentification: "open", causalIdentification: "open",
      freeGainCountPerChannel: 1, intercept: "fixed-by-reference-baseline", kernelAndSourceMapping: "fixed-before-fitting",
      loss: "equal-period-squared-log-error", periodWeighting: "uniform-calendar-years", uncertainty: "descriptive-errors-only" } };
}

/** Source/kernel sensitivity uses the original locked coefficients, with no refit or re-anchoring. */
export function predictCalibratedBermEndpoint(scenario: BermEndpointScenario, calibration: BermEndpointCalibration): BermCalibratedEndpointPrediction {
  const points = scenario.points.map(point => {
    const values = channels(mode => {
      const fit = calibration.channels[mode], signal = point.channels[mode];
      const value = fit.status !== "calibrated" || fit.beta === null || fit.logScale === null || signal === null
        ? null : finiteExp(fit.logScale - fit.beta * signal);
      const multiplier = value === null || calibration.baseline === null ? null : value / calibration.baseline.value;
      const relativeChangePercent = multiplier === null ? null : 100 * (multiplier - 1);
      return { value, multiplier: multiplier !== null && Number.isFinite(multiplier) ? multiplier : null,
        relativeChangePercent: relativeChangePercent !== null && Number.isFinite(relativeChangePercent) ? relativeChangePercent : null };
    });
    return { year: point.year, channels: values, selected: values[scenario.parameters.mode] };
  });
  return { unit: calibration.unit, baseline: calibration.baseline, points, calibrationApplied: "locked-beta-and-logScale",
    periodPredictions: channels(mode => {
      const fit = calibration.channels[mode];
      return predictPeriods(scenario, mode, calibration.included, calibration.heldOut,
        fit.status === "calibrated" ? fit.beta : null, fit.status === "calibrated" ? fit.logScale : null);
    }) };
}
