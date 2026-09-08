import { describe, expect, it } from "vitest";
import {
  applyBermEndpointToAsfr, applyBermEndpointToTestosterone,
  DEFAULT_BERM_ENDPOINT_PARAMETERS, runBermEndpointScenario,
  validateBermEndpointParameters, type BermEndpointParameters,
} from "../berm-endpoint-scenario";
import { DEFAULT_BERM_ATLAS_PARAMETERS, runBermAtlasScenarioDetailed, type ScenarioSource } from "../berm-atlas-scenario";

const parameters: BermEndpointParameters = { ...DEFAULT_BERM_ENDPOINT_PARAMETERS,
  background: 0, lagYears: 0, memoryYears: 0, rampYears: 0, halfLifeYears: 1,
  annualWeight: 1, historyWeight: 1, betaF: 0.2, betaT: 0.1 };
const source: ScenarioSource = { id: "test-source", startYear: 1900, endYear: 1900,
  amplitude: 1, angleDegrees: 0, enabled: true };
const baselineAsfr = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"]
  .map(ageGroup => ({ ageGroup, points: [{ year: 1899, value: 40 }, { year: 2000, value: 999 }] }));
const testosteroneBaseline = { value: 20, unit: "nmol/L", sourceId: "study-baseline",
  period: { startYear: 1899, endYear: 1900, label: "1899–1900" } };

describe("BERM's separately declared annual and retained source history", () => {
  it("retains the explicit tensor contraction including signed background and pair terms", () => {
    const sources = [{ ...source, amplitude: 1 }, { ...source, id: "second", amplitude: 2 }];
    const deterministic = runBermEndpointScenario(sources, { ...parameters, background: 2, meanFraction: 1 }, 1900, 1900).points[0];
    expect(deterministic).toMatchObject({ self: 5, cross: 4, backgroundTerm: 12, geometry: 21 });
    // (2+1+2)^2 - 2^2 = 21. Technology count alone never creates the pair term.
    expect(runBermEndpointScenario(sources, parameters, 1900, 1900).points[0]).toMatchObject({ self: 5, cross: 0, backgroundTerm: 0, geometry: 5 });
    expect(runBermEndpointScenario([{ ...source, angleDegrees: 180 }],
      { ...parameters, background: 2, meanFraction: 1 }, 1900, 1900).points[0].geometry).toBe(-3);
  });

  it("preserves the existing finite retarded annual kernel before adding a separate stock", () => {
    const p = { ...parameters, lagYears: 2, memoryYears: 2 };
    const current = runBermEndpointScenario([source], p, 1898, 1910);
    const legacy = runBermAtlasScenarioDetailed([source], { ...DEFAULT_BERM_ATLAS_PARAMETERS,
      background: 0, lagYears: 2, memoryYears: 2, rampYears: 0, beta: 0.2 }, 1898, 1910, 1898);
    for (const point of current.points) {
      expect(point.geometry).toBe(legacy.points.find(value => value.year === point.year)!.geometry);
      expect(point.annual).toBeCloseTo(legacy.points.find(value => value.year === point.year)!.response);
    }
    expect(current.points.find(p => p.year === 1904)!.annual).toBeCloseTo(1 / 3);
    expect(current.points.find(p => p.year === 1905)!.annual).toBe(0);
    expect(current.points.find(p => p.year === 1905)!.accumulated).toBeGreaterThan(0);
  });

  it("halves a retained one-year impulse each year while the annual component returns to zero", () => {
    const points = runBermEndpointScenario([source], parameters, 1899, 1903).points;
    expect(points.map(p => p.annual)).toEqual([0, 1, 0, 0, 0]);
    expect(points.map(p => p.accumulated)).toEqual([0, 1, 0.5, 0.25, 0.125]);
    expect(points[1].channels).toEqual({ annual: 1, accumulated: 1, combined: 2 });
    expect(points[2].selected).toBe(0.5);
  });

  it("does not reset either stock or an endpoint baseline when only the display window changes", () => {
    const p = { ...parameters, halfLifeYears: 20 };
    const long = runBermEndpointScenario([source], p, 1880, 1920);
    const zoomed = runBermEndpointScenario([source], p, 1910, 1920);
    expect(zoomed.history).toEqual(long.history);
    expect(zoomed.points).toEqual(long.points.filter(p => p.year >= 1910));
    const a = applyBermEndpointToAsfr(long, baselineAsfr, 1899);
    const b = applyBermEndpointToAsfr(zoomed, baselineAsfr, 1899);
    expect(b.points).toEqual(a.points.filter(p => p.year >= 1910));
    expect(b.anchorStatus).toBe("available");
  });

  it("identifies the initial stock date and its truncation assumption, with no fake prehistory", () => {
    const result = runBermEndpointScenario([], { ...parameters, initialStock: 8 }, 1880, 1882);
    expect(result.points.map(p => p.accumulated)).toEqual([4, 2, 1]);
    expect(result.assumptions).toMatchObject({ model: "BERM", initialStockYear: 1879, initialStock: 8,
      prehistory: "assumed-stock", timeStepYears: 1, lambda: 0.5, endpointCalibration: "unidentified-scenario-gains" });
    expect(runBermEndpointScenario([], parameters, 1880, 1880).assumptions.prehistory).toBe("assumed-zero");
    expect(runBermEndpointScenario([], { ...parameters, initialStock: null }, 1880, 1880).points[0].accumulated).toBeNull();
  });

  it("does not reinterpret an unknown profile interval as a shutdown or reset its retained history", () => {
    const gapped: ScenarioSource = { ...source, startYear: 1900, endYear: 1902,
      profile: [{ year: 1900, value: 1 }, { year: 1902, value: 2 }],
      profileWindows: [{ startYear: 1900, endYear: 1900 }, { startYear: 1902, endYear: 1902 }] };
    const result = runBermEndpointScenario([gapped], parameters, 1900, 1904);
    expect(result.points.map(p => p.annual)).toEqual([1, null, 4, 0, 0]);
    expect(result.points.map(p => p.accumulated)).toEqual([1, null, null, null, null]);
    expect(result.coverage.unknownHistoryYears).toEqual([1901, 1902, 1903, 1904]);
    expect(result.coverage.byYear.find(p => p.year === 1901)!.missingProfileIds).toEqual([source.id]);
    const shutdown = runBermEndpointScenario([{ ...gapped, windows: gapped.profileWindows }], parameters, 1900, 1902);
    expect(shutdown.points.map(p => p.accumulated)).toEqual([1, 0.5, 4.25]);
  });

  it("keeps lagged support before the integration origin explicit instead of padding it with zeros", () => {
    const early: ScenarioSource = { ...source, startYear: 1870, endYear: 1900,
      profile: [{ year: 1880, value: 1 }, { year: 1900, value: 1 }] };
    const result = runBermEndpointScenario([early], { ...parameters, lagYears: 1 }, 1880, 1882);
    expect(result.coverage.byYear[0]).toMatchObject({ year: 1879, missingProfileIds: [source.id] });
    expect(result.points.map(p => p.annual)).toEqual([null, 1, 1]);
    expect(result.points.every(p => p.accumulated === null)).toBe(true);
    const held = runBermEndpointScenario([{ ...early, profileOutside: "hold" }], { ...parameters, lagYears: 1 }, 1880, 1882);
    expect(held.coverage.known).toBe(true);
    expect(held.coverage.complete).toBe(false);
    expect(held.coverage.byYear[0].assumedProfileIds).toEqual([source.id]);
  });

  it("allows recovery from unknown stock only by the explicit zero-retention or disabled-channel assumptions", () => {
    const noCarry = runBermEndpointScenario([source], { ...parameters, initialStock: null, halfLifeYears: 0 }, 1900, 1901);
    expect(noCarry.points.map(p => p.accumulated)).toEqual([1, 0]);
    const noHistory = runBermEndpointScenario([source], { ...parameters, initialStock: null, historyWeight: 0 }, 1900, 1900);
    expect(noHistory.points[0]).toMatchObject({ accumulated: null, channels: { annual: 1, accumulated: 0, combined: 1 } });
    expect(noHistory.assumptions.prehistory).toBe("unknown");
  });
});

describe("separate source-anchored fertility and testosterone closures", () => {
  it("uses observed ASFRs in the fixed baseline year and never fits later rates", () => {
    const result = runBermEndpointScenario([source], parameters, 1899, 1901);
    const fertility = applyBermEndpointToAsfr(result, baselineAsfr, 1899);
    expect(fertility.baselineTfr).toBeCloseTo(1.4);
    expect(fertility.points[0].selected.tfr).toBeCloseTo(1.4);
    expect(fertility.points[1].selected.tfr).toBeCloseTo(1.4 * Math.exp(-0.2 * 2));
    expect(fertility.points[2].channels.annual.tfr).toBeCloseTo(1.4);
    expect(fertility.points[2].channels.accumulated.tfr).toBeLessThan(1.4);
    expect(baselineAsfr[0].points[1].value).toBe(999);
  });

  it("keeps betaF and betaT independent, including positive, zero and negative signs", () => {
    const base = { ...testosteroneBaseline, period: { startYear: 1899, endYear: 1899, label: "1899" } };
    const result = runBermEndpointScenario([source], { ...parameters, betaF: 0, betaT: -0.2 }, 1899, 1900);
    expect(applyBermEndpointToAsfr(result, baselineAsfr, 1899).points[1].selected.multiplier).toBe(1);
    expect(applyBermEndpointToTestosterone(result, base).points[1].selected.value).toBeGreaterThan(20);
    const changedT = runBermEndpointScenario([source], { ...parameters, betaF: 0, betaT: 0.8 }, 1899, 1900);
    expect(applyBermEndpointToAsfr(changedT, baselineAsfr, 1899)).toEqual(applyBermEndpointToAsfr(result, baselineAsfr, 1899));
  });

  it("anchors the mean of modeled testosterone over the actual source period, rather than exponentiating its mean driver", () => {
    const result = runBermEndpointScenario([source], parameters, 1899, 1901);
    const testosterone = applyBermEndpointToTestosterone(result, testosteroneBaseline);
    expect(testosterone.weighting).toBe("uniform-calendar-years");
    expect(testosterone.unit).toBe("nmol/L");
    for (const mode of ["annual", "accumulated", "combined"] as const) {
      expect((testosterone.points[0].channels[mode].value! + testosterone.points[1].channels[mode].value!) / 2).toBeCloseTo(20);
    }
    const weighted = applyBermEndpointToTestosterone(result, { ...testosteroneBaseline,
      yearWeights: [{ year: 1899, weight: 1 }, { year: 1900, weight: 3 }] });
    expect((weighted.points[0].selected.value! + 3 * weighted.points[1].selected.value!) / 4).toBeCloseTo(20);
    expect(weighted.weighting).toBe("supplied-year-weights");
  });

  it("keeps a baseline period outside the visible range and reports missing history without a substitute anchor", () => {
    const result = runBermEndpointScenario([source], parameters, 1901, 1902);
    const full = runBermEndpointScenario([source], parameters, 1899, 1902);
    expect(applyBermEndpointToTestosterone(result, testosteroneBaseline).points)
      .toEqual(applyBermEndpointToTestosterone(full, testosteroneBaseline).points.filter(p => p.year >= 1901));
    const missing = applyBermEndpointToTestosterone(result, { ...testosteroneBaseline,
      period: { startYear: 1879, endYear: 1880, label: "1879–1880" } });
    expect(missing.anchorStatus).toBe("missing-history");
    expect(missing.points.every(p => p.selected.value === null)).toBe(true);
  });

  it("scales an exact annual median under a positive uniform within-group multiplier", () => {
    const result = runBermEndpointScenario([source], parameters, 1899, 1901);
    const baseline = { ...testosteroneBaseline, statistic: "median" as const,
      period: { startYear: 1899, endYear: 1899, label: "1899" } };
    const median = applyBermEndpointToTestosterone(result, baseline);
    expect(median).toMatchObject({ statistic: "median", anchorStatus: "available" });
    expect(median.points[0].selected.value).toBe(20);
    expect(median.points[1].selected.value).toBeCloseTo(20 * Math.exp(-0.1 * 2));
    expect(median.baseline).toEqual(baseline);
    // The same multiplicative closure preserves the ordering of individual values.
    const individuals = [8, 20, 40].map(value => value * median.points[1].selected.multiplier!);
    expect(individuals[1]).toBe(median.points[1].selected.value);
  });

  it("leaves a pooled multi-year median unsupported instead of normalizing it as a mean", () => {
    const result = runBermEndpointScenario([source], parameters, 1899, 1901);
    const medianBaseline = { ...testosteroneBaseline, statistic: "median" as const };
    for (const yearWeights of [undefined, [{ year: 1899, weight: 1 }]]) {
      const median = applyBermEndpointToTestosterone(result, { ...medianBaseline, yearWeights });
      expect(median).toMatchObject({ statistic: "median", anchorStatus: "unsupported-statistic", weighting: null,
        channelAnchorStatus: { annual: "unsupported-statistic", accumulated: "unsupported-statistic", combined: "unsupported-statistic" } });
      expect(median.points.every(p => Object.values(p.channels).every(channel =>
        channel.value === null && channel.multiplier === null && channel.relativeChangePercent === null))).toBe(true);
      expect(median.baseline.value).toBe(testosteroneBaseline.value);
      expect(median.baseline.period).toEqual(testosteroneBaseline.period);
    }
    const defaultMean = applyBermEndpointToTestosterone(result, testosteroneBaseline);
    expect(defaultMean.statistic).toBe("arithmetic_mean");
    expect(defaultMean.points).toEqual(applyBermEndpointToTestosterone(result,
      { ...testosteroneBaseline, statistic: "arithmetic_mean" }).points);
    expect(defaultMean.anchorStatus).toBe("available");
  });

  it("preserves missing ASFR age groups and keeps annual and accumulated anchor status separate", () => {
    const result = runBermEndpointScenario([source], { ...parameters, initialStock: null, mode: "annual" }, 1899, 1900);
    const fertility = applyBermEndpointToAsfr(result, baselineAsfr.slice(1), 1899);
    expect(fertility).toMatchObject({ baselineTfr: null, missingAgeGroups: ["15-19"], anchorStatus: "missing-asfr",
      channelAnchorStatus: { annual: "available", accumulated: "missing-history", combined: "missing-history" } });
    expect(fertility.points[1].channels.annual.tfr).toBeNull();
    expect(fertility.points[1].channels.annual.asfr[1].value).not.toBeNull();
  });

  it("rejects malformed kernels, duplicate sources, invalid baselines and numerically unrepresentable effects", () => {
    expect(validateBermEndpointParameters({ ...parameters, halfLifeYears: -1 })).toBe(false);
    expect(validateBermEndpointParameters({ ...parameters, initialStock: Infinity })).toBe(false);
    expect(() => runBermEndpointScenario([source, source], parameters, 1899, 1900)).toThrow(/Duplicate/);
    expect(() => runBermEndpointScenario([{ ...source, amplitude: -1 }], parameters, 1899, 1900)).toThrow();
    expect(() => runBermEndpointScenario([], parameters, 1879, 1900)).toThrow();
    const result = runBermEndpointScenario([source], parameters, 1899, 1900);
    expect(() => applyBermEndpointToTestosterone(result, { ...testosteroneBaseline, value: 0 })).toThrow();
    expect(() => applyBermEndpointToTestosterone(result, { ...testosteroneBaseline,
      yearWeights: [{ year: 1899, weight: 0 }] })).toThrow();
    const extreme = runBermEndpointScenario(Array.from({ length: 20 }, (_, i) => ({ ...source, id: String(i), amplitude: 2 })),
      { ...parameters, meanFraction: 1, betaF: -1 }, 1899, 1900);
    expect(() => applyBermEndpointToAsfr(extreme, baselineAsfr, 1899)).toThrow(RangeError);
  });
});
