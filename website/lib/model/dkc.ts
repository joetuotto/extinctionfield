/**
 * Pure browser-safe arithmetic for exploring the dual-kernel candidate.
 *
 * Inputs are annual national technology-timing proxy values. The functions
 * make no claim that those values are a physical measurement, a calibrated
 * dose, or a locked forecast.
 */

export interface AnnualProxyPoint {
  year: number;
  value: number;
}

export interface DkcParameters {
  /** Fast-kernel scale in years. */
  tauB: number;
  /** Slow exponential-kernel scale in years. */
  tauR: number;
  /** Fast-arm share. The slow-arm share is always 1 - alpha. */
  alpha: number;
  /** Integer Erlang shape. nB = 1 is the exponential special case. */
  nB: number;
  /** Optional cohort birth year for T3 weighting of the slow input. */
  cohortBirthYear?: number;
}

export interface DkcLoadPoint extends AnnualProxyPoint {
  /** Unweighted fast convolution. */
  fastConvolution: number;
  /** Unweighted slow convolution, optionally T3 cohort-weighted. */
  slowConvolution: number;
  /** alpha * fastConvolution. */
  fast: number;
  /** (1 - alpha) * slowConvolution. */
  slow: number;
  /** fast + slow. */
  total: number;
}

function assertFinite(name: string, value: number): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be finite`);
  }
}

function assertPositive(name: string, value: number): void {
  assertFinite(name, value);
  if (value <= 0) {
    throw new RangeError(`${name} must be greater than zero`);
  }
}

function assertUnitInterval(name: string, value: number): void {
  assertFinite(name, value);
  if (value < 0 || value > 1) {
    throw new RangeError(`${name} must be between zero and one`);
  }
}

/** Stable logistic sigmoid: 1 / (1 + exp(-steepness * (value - midpoint))). */
export function sigmoid(
  value: number,
  midpoint = 0,
  steepness = 1,
): number {
  assertFinite("value", value);
  assertFinite("midpoint", midpoint);
  assertPositive("steepness", steepness);

  const z = steepness * (value - midpoint);
  if (z >= 0) return 1 / (1 + Math.exp(-z));

  const expZ = Math.exp(z);
  return expZ / (1 + expZ);
}

/** Candidate smartphone-adoption curve with a default 0.5/year steepness. */
export function smartphoneSigmoid(
  year: number,
  midpointYear: number,
  steepness = 0.5,
): number {
  return sigmoid(year, midpointYear, steepness);
}

/**
 * Continuous duty-cycle scenario:
 * d_base + (d_max - d_base) * smartphoneSigmoid(year).
 */
export function dutyCycle(
  year: number,
  midpointYear: number,
  steepness = 0.5,
  base = 0.33,
  maximum = 1,
): number {
  assertUnitInterval("base", base);
  assertUnitInterval("maximum", maximum);
  if (maximum < base) {
    throw new RangeError("maximum must be greater than or equal to base");
  }

  return base + (maximum - base) * smartphoneSigmoid(year, midpointYear, steepness);
}

function validateLags(lags: readonly number[]): void {
  for (const lag of lags) {
    assertFinite("lag", lag);
    if (!Number.isInteger(lag) || lag < 0) {
      throw new RangeError("lags must be non-negative whole years");
    }
  }
}

function normalize(raw: readonly number[]): number[] {
  if (raw.length === 0) {
    throw new RangeError("kernel must contain at least one lag");
  }
  const total = raw.reduce((sum, weight) => sum + weight, 0);
  if (!Number.isFinite(total) || total <= 0) {
    throw new RangeError("kernel must have positive finite support");
  }
  return raw.map((weight) => weight / total);
}

/**
 * Normalized discrete exponential weights over exactly the supplied lags.
 * The returned weights sum to one for every non-empty lag set.
 */
export function normalizedExponentialKernel(
  lags: readonly number[],
  tau: number,
): number[] {
  assertPositive("tau", tau);
  validateLags(lags);
  return normalize(lags.map((lag) => Math.exp(-lag / tau)));
}

function erlangSurvival(value: number, tau: number, shape: number): number {
  const scaled = value / tau;
  let term = 1;
  let series = 1;
  for (let order = 1; order < shape; order += 1) {
    term *= scaled / order;
    series += term;
  }
  return Math.exp(-scaled) * series;
}

/**
 * Normalized discrete Erlang weights over exactly the supplied lags.
 *
 * Each annual weight is the integrated probability mass in [lag, lag + 1):
 * CDF(lag + 1) - CDF(lag). Bin integration avoids sampling a continuous
 * density at one arbitrary point and defines the first annual bin for every
 * shape. Shape one reduces to the exponential kernel after normalization.
 */
export function normalizedErlangKernel(
  lags: readonly number[],
  tau: number,
  shape: number,
): number[] {
  assertPositive("tau", tau);
  validateLags(lags);
  assertPositive("shape", shape);
  if (!Number.isInteger(shape)) {
    throw new RangeError("shape must be a positive integer");
  }

  const raw = lags.map((lag) => {
    const binMass =
      erlangSurvival(lag, tau, shape) -
      erlangSurvival(lag + 1, tau, shape);
    return Math.max(0, binMass);
  });
  return normalize(raw);
}

/** Convenience exponential kernel for lags 0..length-1. */
export function exponentialKernel(length: number, tau: number): number[] {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("length must be a non-negative integer");
  }
  return normalizedExponentialKernel(
    Array.from({ length }, (_, lag) => lag),
    tau,
  );
}

/** Convenience Erlang kernel for lags 0..length-1. */
export function erlangKernel(
  length: number,
  tau: number,
  shape: number,
): number[] {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("length must be a non-negative integer");
  }
  return normalizedErlangKernel(
    Array.from({ length }, (_, lag) => lag),
    tau,
    shape,
  );
}

/** Exact T3 age-vulnerability schedule. */
export function t3Vulnerability(age: number): number {
  assertFinite("age", age);
  if (age < 0) return 5;
  if (age < 1) return 4;
  if (age < 6) return 3;
  if (age < 18) return 2;
  return 1;
}

/** The slow-arm share is constrained rather than fitted independently. */
export function betaFromAlpha(alpha: number): number {
  assertUnitInterval("alpha", alpha);
  return 1 - alpha;
}

function validateAnnualProxy(series: readonly AnnualProxyPoint[]): void {
  for (let index = 0; index < series.length; index += 1) {
    const point = series[index];
    if (!Number.isInteger(point.year)) {
      throw new RangeError("proxy years must be integers");
    }
    assertFinite("proxy value", point.value);
    if (point.value < 0) {
      throw new RangeError("proxy values must be non-negative");
    }
    if (index > 0 && point.year !== series[index - 1].year + 1) {
      throw new RangeError("proxy series must contain consecutive ascending years");
    }
  }
}

function weightedHistory(
  series: readonly AnnualProxyPoint[],
  index: number,
  weights: readonly number[],
  cohortBirthYear?: number,
): number {
  let result = 0;
  for (let lag = 0; lag < weights.length; lag += 1) {
    const source = series[index - lag];
    const vulnerability =
      cohortBirthYear === undefined
        ? 1
        : t3Vulnerability(source.year - cohortBirthYear);
    result += weights[lag] * source.value * vulnerability;
  }
  return result;
}

/**
 * Compute fast, slow, and total candidate loads from an annual proxy series.
 * Kernel weights are re-normalized to the history available at each year.
 */
export function computeDkcLoad(
  series: readonly AnnualProxyPoint[],
  parameters: DkcParameters,
): DkcLoadPoint[] {
  validateAnnualProxy(series);
  assertPositive("tauB", parameters.tauB);
  assertPositive("tauR", parameters.tauR);
  if (parameters.tauR <= parameters.tauB) {
    throw new RangeError("tauR must be greater than tauB");
  }
  const beta = betaFromAlpha(parameters.alpha);
  assertPositive("nB", parameters.nB);
  if (!Number.isInteger(parameters.nB)) {
    throw new RangeError("nB must be a positive integer");
  }
  if (
    parameters.cohortBirthYear !== undefined &&
    !Number.isInteger(parameters.cohortBirthYear)
  ) {
    throw new RangeError("cohortBirthYear must be an integer");
  }

  return series.map((point, index) => {
    const lags = Array.from({ length: index + 1 }, (_, lag) => lag);
    const fastWeights = normalizedErlangKernel(
      lags,
      parameters.tauB,
      parameters.nB,
    );
    const slowWeights = normalizedExponentialKernel(lags, parameters.tauR);
    const fastConvolution = weightedHistory(series, index, fastWeights);
    const slowConvolution = weightedHistory(
      series,
      index,
      slowWeights,
      parameters.cohortBirthYear,
    );
    const fast = parameters.alpha * fastConvolution;
    const slow = beta * slowConvolution;

    return {
      year: point.year,
      value: point.value,
      fastConvolution,
      slowConvolution,
      fast,
      slow,
      total: fast + slow,
    };
  });
}

/** Normalized Hill saturation in [0, 1]. */
export function hillSaturation(
  load: number,
  xHalf: number,
  hillN = 1,
): number {
  assertFinite("load", load);
  if (load < 0) throw new RangeError("load must be non-negative");
  assertPositive("xHalf", xHalf);
  assertPositive("hillN", hillN);
  if (load === 0) return 0;

  // 1 / (1 + (xHalf/load)^n), evaluated in log space for stability.
  const logRatio = hillN * (Math.log(xHalf) - Math.log(load));
  if (logRatio >= 700) return 0;
  if (logRatio <= -700) return 1;
  return 1 / (1 + Math.exp(logRatio));
}

/** Candidate change: -gamma * Hill(load). */
export function hillResponse(
  load: number,
  gamma: number,
  xHalf: number,
  hillN = 1,
): number {
  assertFinite("gamma", gamma);
  if (gamma < 0) throw new RangeError("gamma must be non-negative");
  return -gamma * hillSaturation(load, xHalf, hillN);
}

/** Seasonal coefficient-of-variation scenario: baseCV * (1 - duty). */
export function seasonalCv(baseCv: number, duty: number): number {
  assertFinite("baseCv", baseCv);
  if (baseCv < 0) throw new RangeError("baseCv must be non-negative");
  assertUnitInterval("duty", duty);
  return baseCv * (1 - duty);
}
