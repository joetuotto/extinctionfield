import { describe, expect, it } from "vitest";
import { calibrateBermEndpoint, predictCalibratedBermEndpoint } from "../berm-endpoint-calibration";
import { DEFAULT_BERM_ENDPOINT_PARAMETERS, runBermEndpointScenario, type BermEndpointScenario } from "../berm-endpoint-scenario";
import { getChangeAtlasSeries, type ChangeAtlasPoint, type ChangeAtlasSeries } from "../change-atlas-data";
import { buildTechnologyScenarioSources } from "../berm-technology-inputs";

const text = { fi: "Testi", en: "Test" };
function point(year: number, value: number, endYear = year): ChangeAtlasPoint {
  return { year, value, startYear: year, endYear, lower: null, upper: null,
    period: { fi: `${year}–${endYear}`, en: `${year}–${endYear}` },
    sourceId: "source", sourceLocator: `Table row ${year}:${endYear}`, imputed: false };
}
function series(points: ChangeAtlasPoint[], patch: Partial<ChangeAtlasSeries> = {}): ChangeAtlasSeries {
  return { id: "test-t", countryId: "FIN", datasetFamily: "hormone", metric: "testosterone_total", title: text,
    unit: "nmol_per_l", unitLabel: text, status: "reported", frequency: "survey_period", valueScale: "linear",
    population: text, sourceIds: ["source"], method: text, limitations: [], points, ...patch };
}
function signals(values: Record<number, number | null>, from = 1950, to = 2005): BermEndpointScenario {
  const result = runBermEndpointScenario([], DEFAULT_BERM_ENDPOINT_PARAMETERS, from, to);
  for (const p of result.history) {
    const value = Object.hasOwn(values, p.year) ? values[p.year] : 0;
    p.channels = { annual: value, accumulated: value, combined: value };
    p.selected = value;
  }
  // The history and cropped points deliberately share the same native year objects.
  result.points = result.history.filter(p => p.year >= from && p.year <= to);
  return result;
}

describe("one signed effective endpoint gain with a locked reference anchor", () => {
  it("recovers positive, zero and negative gains outside the old demonstration bounds", () => {
    const scenario = signals({ 1950: 1, 1960: 2, 1970: 3 });
    for (const beta of [5.83, 0, -2.4]) {
      const data = series([point(1950, 20), point(1960, 20 * Math.exp(-beta)), point(1970, 20 * Math.exp(-2 * beta))]);
      const fit = calibrateBermEndpoint(scenario, data, { throughYear: 1970 });
      for (const channel of Object.values(fit.channels)) {
        expect(channel.status).toBe("calibrated");
        expect(channel.beta).toBeCloseTo(beta, 7);
        expect(channel.logScale).toBeCloseTo(Math.log(20) + beta, 7);
        expect(channel.trainingMetrics.logRMSE!).toBeLessThan(1e-7);
      }
      expect(fit.metadata).toMatchObject({ freeGainCountPerChannel: 1, physicalIdentification: "open",
        causalIdentification: "open", intercept: "fixed-by-reference-baseline", uncertainty: "descriptive-errors-only" });
    }
  });

  it("fits the average of annual exponentials over true source periods, with equal period weights", () => {
    const beta = 0.7, scale = 30;
    const value = (xs: number[]) => scale * xs.reduce((sum, x) => sum + Math.exp(-beta * x), 0) / xs.length;
    const scenario = signals({ 1950: 0, 1951: 2, 1960: 3, 1961: 5, 1970: 7 });
    const data = series([point(1950, value([0, 2]), 1951), point(1960, value([3, 5]), 1961), point(1970, value([7]))]);
    data.points[0].n = 12; data.points[1].n = 5000; data.points[1].standardError = 0.03;
    const saved = structuredClone(data);
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 1970 });
    expect(fit.channels.annual.status).toBe("calibrated");
    expect(fit.channels.annual.beta).toBeCloseTo(beta, 7);
    expect(fit.channels.annual.logScale).toBeCloseTo(Math.log(scale), 7);
    const output = predictCalibratedBermEndpoint(scenario, fit);
    const firstTwo = output.points.filter(p => p.year === 1950 || p.year === 1951);
    expect((firstTwo[0].selected.value! + firstTwo[1].selected.value!) / 2).toBeCloseTo(data.points[0].value, 7);
    expect(scale * Math.exp(-beta)).not.toBeCloseTo(data.points[0].value, 2);
    expect(fit.included[1].sourcePoint).toEqual(saved.points[1]);
    expect(data).toEqual(saved);
    expect(fit.channels.annual.periodPredictions[0]).toMatchObject({ startYear: 1950, endYear: 1951,
      sourceId: "source", sourceLocator: "Table row 1950:1951", role: "calibration", observed: data.points[0].value });
  });

  it("does not secretly reweight periods by sample count, SE, or duration, and fits channels independently", () => {
    const scenario = signals({ 1950: 0, 1960: 1, 1970: 2, 1980: 3 });
    for (const p of scenario.history) {
      p.channels.accumulated = 2 * p.channels.annual!;
      p.channels.combined = 3 * p.channels.annual!;
    }
    const ys = [20, 17, 11, 8];
    const data = series(ys.map((value, i) => ({ ...point(1950 + 10 * i, value), n: i ? 1000 * i : 12,
      standardError: i ? 0.01 * i : 5 })));
    const expected = -(Math.log(17 / 20) + 2 * Math.log(11 / 20) + 3 * Math.log(8 / 20)) / (1 + 4 + 9);
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 1980 });
    expect(fit.channels.annual.beta).toBeCloseTo(expected, 7);
    expect(fit.channels.accumulated.beta).toBeCloseTo(expected / 2, 7);
    expect(fit.channels.combined.beta).toBeCloseTo(expected / 3, 7);
    const changedN = structuredClone(data);
    changedN.points.forEach(p => { p.n = 1; p.standardError = 1000; });
    expect(calibrateBermEndpoint(scenario, changedN, { throughYear: 1980 }).channels.annual.beta).toBe(fit.channels.annual.beta);
  });

  it("recovers the current Finnish 60–69-year median contrast without fitting a pooled median", () => {
    const data = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.ageGroup === "60-69")!;
    expect(data).toBeDefined();
    const scenario = runBermEndpointScenario(buildTechnologyScenarioSources("FIN", new URLSearchParams()),
      DEFAULT_BERM_ENDPOINT_PARAMETERS, 1950, 2023);
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 2002,
      eligiblePeriods: [{ startYear: 1977, endYear: 1977 }, { startYear: 2002, endYear: 2002 }] });
    expect(fit.statistic).toBe("median");
    expect(fit.included.map(p => [p.startYear, p.value])).toEqual([[1977, 21.9], [2002, 13.8]]);
    expect(fit.channels.combined.status).toBe("calibrated");
    expect(fit.channels.combined.beta).toBeCloseTo(5.83224754028148, 6);
    expect(fit.channels.combined.trainingMetrics.nativeRMSE!).toBeLessThan(1e-7);
    expect(fit.heldOut).toHaveLength(0);
    expect(fit.channels.combined.holdoutMetrics.logRMSE).toBeNull();
  });

  it("never lets future outcomes or a cropped display alter the fit", () => {
    const scenario = signals({ 1950: 0, 1960: 1, 1970: 2, 2001: 3 });
    const data = series([point(1950, 20), point(1960, 20 * Math.exp(-0.2)), point(1970, 20 * Math.exp(-0.4)), point(2001, 50)]);
    const protocol = { throughYear: 2000 };
    const fit = calibrateBermEndpoint(scenario, data, protocol);
    const changed = structuredClone(data); changed.points[3].value = 5000;
    const cropped = { ...scenario, points: scenario.points.filter(p => p.year >= 1990) };
    const second = calibrateBermEndpoint(cropped, changed, protocol);
    expect(second.included).toEqual(fit.included);
    expect(second.baseline).toEqual(fit.baseline);
    for (const mode of ["annual", "accumulated", "combined"] as const) {
      expect(second.channels[mode].beta).toBe(fit.channels[mode].beta);
      expect(second.channels[mode].logScale).toBe(fit.channels[mode].logScale);
      expect(second.channels[mode].trainingMetrics).toEqual(fit.channels[mode].trainingMetrics);
      expect(second.channels[mode].holdoutMetrics.logRMSE).not.toBe(fit.channels[mode].holdoutMetrics.logRMSE);
    }
    expect(predictCalibratedBermEndpoint(cropped, fit).points)
      .toEqual(predictCalibratedBermEndpoint(scenario, fit).points.filter(p => p.year >= 1990));
  });

  it("uses locked beta and scale when geometry or source history changes, including the reference year", () => {
    const original = signals({ 1950: 1, 1960: 2 });
    const fit = calibrateBermEndpoint(original, series([point(1950, 20), point(1960, 20 * Math.exp(-0.3))]), { throughYear: 1960 });
    const locked = structuredClone(fit);
    const changed = signals({ 1950: 4, 1960: 8 });
    changed.parameters.background = 2; changed.parameters.lagYears = 5;
    const predicted = predictCalibratedBermEndpoint(changed, fit);
    expect(predicted.points[0].selected.value).toBeCloseTo(20 * Math.exp(-0.3 * 3), 7);
    expect(predicted.points[0].selected.value).not.toBeCloseTo(20);
    expect(fit).toEqual(locked);
    expect(predicted.calibrationApplied).toBe("locked-beta-and-logScale");
  });

  it("uses a declared ASFR-sum baseline without estimating another intercept", () => {
    const scenario = signals({ 1950: 1, 1960: 2 });
    const baseline = { value: 3.2, sourceId: "asfr", period: { startYear: 1950, endYear: 1950, label: "1950 ASFR sum" } };
    const data = series([point(1950, 3.21), point(1960, 3.2 * Math.exp(-0.4))],
      { metric: "tfr", datasetFamily: "fertility", unit: "births_per_woman", frequency: "annual" });
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 1960, baselineOverride: baseline });
    expect(fit.baselineOrigin).toBe("explicit-override");
    expect(fit.baseline).toEqual(baseline);
    expect(fit.channels.annual.beta).toBeCloseTo(0.4, 7);
    expect(fit.channels.annual.periodPredictions[0].predicted).toBeCloseTo(3.2);
    expect(fit.channels.annual.periodPredictions[0].observed).toBe(3.21);
  });

  it("honors an explicitly unavailable baseline without falling back to the observed TFR", () => {
    const scenario = signals({ 1950: 1, 1960: 2 });
    const data = series([point(1950, 3.21), point(1960, 2.1)],
      { metric: "tfr", datasetFamily: "fertility", unit: "births_per_woman", frequency: "annual" });
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 1960, baselineOverride: null });
    expect(fit.baseline).toBeNull();
    expect(fit.baselineOrigin).toBe("unavailable");
    expect(fit.protocol.baselineOverride).toBeNull();
    expect(fit.included).toHaveLength(2);
    for (const channel of Object.values(fit.channels)) {
      expect(channel).toMatchObject({ status: "insufficient-points", beta: null, logScale: null });
      expect(channel.periodPredictions.every(p => p.predicted === null)).toBe(true);
    }
    expect(predictCalibratedBermEndpoint(scenario, fit).points.every(p => p.selected.value === null)).toBe(true);
    expect(calibrateBermEndpoint(scenario, data, { throughYear: 1960 }).baseline!.value).toBe(3.21);
  });
});

describe("calibration support and identification boundaries", () => {
  it("preserves annual support when the initial retained history is unknown", () => {
    const scenario = runBermEndpointScenario([{ id: "source", startYear: 1950, endYear: 2000, amplitude: 1,
      angleDegrees: 0, enabled: true }], { ...DEFAULT_BERM_ENDPOINT_PARAMETERS, initialStock: null,
      background: 0, lagYears: 0, memoryYears: 0, rampYears: 0 }, 1949, 2000);
    const fit = calibrateBermEndpoint(scenario, series([point(1949, 20), point(1950, 10)]), { throughYear: 1950 });
    expect(fit.channels.annual.status).toBe("calibrated");
    expect(fit.channels.accumulated.status).toBe("unknown-history");
    expect(fit.channels.combined.status).toBe("unknown-history");
    const predicted = predictCalibratedBermEndpoint(scenario, fit);
    expect(predicted.points[0].channels.annual.value).toBeCloseTo(20);
    expect(predicted.points.every(p => p.channels.combined.value === null)).toBe(true);
  });

  it("propagates missing training years and prediction gaps rather than replacing them with zero", () => {
    const missingTrain = signals({ 1950: 0, 1960: 1, 1961: null });
    const data = series([point(1950, 20), point(1960, 15, 1961)]);
    const missing = calibrateBermEndpoint(missingTrain, data, { throughYear: 1970 });
    expect(missing.channels.annual.status).toBe("unknown-history");
    expect(missing.channels.annual.beta).toBeNull();
    const fit = calibrateBermEndpoint(signals({ 1950: 0, 1960: 1, 1961: 1 }), data, { throughYear: 1970 });
    const predicted = predictCalibratedBermEndpoint(missingTrain, fit);
    expect(predicted.points.find(p => p.year === 1961)!.selected.value).toBeNull();
    expect(predicted.periodPredictions.annual[1].predicted).toBeNull();
    expect(predicted.points.find(p => p.year === 1960)!.selected.value).not.toBeNull();
  });

  it("separates unsupported pooled medians, incompatible periods and cutoff-crossing rows", () => {
    const data = series([point(1950, 20, 1951), point(1960, 19), point(1970, 18), point(1980, 17)], { statistic: "median" });
    const fit = calibrateBermEndpoint(signals({ 1960: 1, 1970: 2 }), data,
      { throughYear: 1970, eligiblePeriods: [{ startYear: 1950, endYear: 1951 }, { startYear: 1960, endYear: 1960 }, { startYear: 1970, endYear: 1970 }] });
    expect(fit.excluded.map(p => p.reason)).toEqual(["unsupported-statistic", "not-eligible"]);
    expect(fit.baseline!.period.startYear).toBe(1960);
    const pooled = calibrateBermEndpoint(signals({}), series([point(1950, 20, 1951)], { statistic: "median" }), { throughYear: 2000 });
    expect(pooled.channels.annual.status).toBe("unsupported-statistic");
    const split = calibrateBermEndpoint(signals({ 1950: 0, 1960: 1 }),
      series([point(1950, 20), point(1960, 10), point(1999, 5, 2001), point(2002, 4, 2003)]), { throughYear: 2000 });
    expect(split.included).toHaveLength(2);
    expect(split.excluded[0].reason).toBe("crosses-cutoff");
    expect(split.heldOut[0]).toMatchObject({ startYear: 2002, endYear: 2003 });
  });

  it("withholds unsupported, insufficient, constant-signal and numerically bounded fits", () => {
    const scenario = signals({ 1950: 0, 1960: 1 });
    expect(calibrateBermEndpoint(scenario, series([point(1950, 20)]), { throughYear: 1970 }).channels.annual.status).toBe("insufficient-points");
    expect(calibrateBermEndpoint(scenario, series([point(1950, 20), point(1960, 10)],
      { metric: "diabetes_prevalence" }), { throughYear: 1970 }).channels.annual.status).toBe("unsupported-endpoint");
    expect(calibrateBermEndpoint(signals({}), series([point(1950, 20), point(1960, 10)]),
      { throughYear: 1970 }).channels.annual.status).toBe("no-information");
    const bound = calibrateBermEndpoint(scenario, series([point(1950, 20), point(1960, 20 * Math.exp(-5))]),
      { throughYear: 1970, search: { initialBound: 1, maxBound: 2 } });
    expect(bound.channels.annual).toMatchObject({ status: "search-bound", beta: null, logScale: null,
      search: { candidateBeta: 2 } });
    expect(predictCalibratedBermEndpoint(scenario, bound).points.every(p => p.selected.value === null)).toBe(true);
  });

  it("does not choose an arbitrary sign when period means admit distinct equal minima", () => {
    const scenario = signals({ 1950: 0, 1960: -1, 1961: 1 });
    const fit = calibrateBermEndpoint(scenario, series([point(1950, 20), point(1960, 20 * Math.cosh(1.3), 1961)]), { throughYear: 1970 });
    expect(fit.channels.annual.status).toBe("non-identifiable");
    expect(fit.channels.annual.beta).toBeNull();
    expect(fit.channels.annual.search.minimizerBetas).toHaveLength(2);
    expect(fit.channels.annual.search.minimizerBetas[0]).toBeCloseTo(-1.3, 6);
    expect(fit.channels.annual.search.minimizerBetas[1]).toBeCloseTo(1.3, 6);
    expect(predictCalibratedBermEndpoint(scenario, fit).points.every(p => p.selected.value === null)).toBe(true);
  });

  it("recognizes equal signal distributions despite different period lengths and suppresses overflow predictions", () => {
    const equal = calibrateBermEndpoint(signals({ 1950: 0, 1951: 1, 1960: 0, 1961: 0, 1962: 1, 1963: 1 }),
      series([point(1950, 20, 1951), point(1960, 10, 1963)]), { throughYear: 1970 });
    expect(equal.channels.annual.status).toBe("no-information");
    const fit = calibrateBermEndpoint(signals({ 1950: 0, 1960: 1 }),
      series([point(1950, 20), point(1960, 20 * Math.exp(-5))]), { throughYear: 1970 });
    const extreme = predictCalibratedBermEndpoint(signals({ 1950: -1e308, 1960: 1e308 }), fit);
    expect(extreme.points.find(p => p.year === 1950)!.selected).toEqual({ value: null, multiplier: null, relativeChangePercent: null });
    expect(extreme.points.find(p => p.year === 1960)!.selected.value).toBeNull();
    expect(extreme.periodPredictions.annual.every(p => p.predicted === null)).toBe(true);
  });

  it("rejects malformed protocols and future baselines while retaining invalid rows as exclusions", () => {
    const scenario = signals({ 1950: 0, 1960: 1 });
    const data = series([point(1950, 20), point(1960, 10), point(1970, Infinity), point(1980, 0)]);
    const fit = calibrateBermEndpoint(scenario, data, { throughYear: 2000 });
    expect(fit.excluded.map(p => p.reason)).toEqual(["nonpositive-or-nonfinite", "nonpositive-or-nonfinite"]);
    expect(() => calibrateBermEndpoint(scenario, data, { throughYear: 2000.5 })).toThrow(/protocol/);
    expect(() => calibrateBermEndpoint(scenario, data, { throughYear: 2000, search: { maxBound: 0 } })).toThrow(/protocol/);
    expect(() => calibrateBermEndpoint(scenario, data, { throughYear: 2000, baselineOverride: {
      value: 15, sourceId: "future", period: { startYear: 2001, endYear: 2001, label: "2001" } } })).toThrow(/baseline/);
    expect(() => calibrateBermEndpoint(scenario, series([point(1950, 20), point(1950, 20)]), { throughYear: 2000 })).toThrow(/Duplicate/);
  });
});
