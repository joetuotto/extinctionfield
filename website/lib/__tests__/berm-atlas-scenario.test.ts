import { describe, it, expect } from "vitest";
import { applyBermScenarioToAsfr, contractedGeometry, DEFAULT_BERM_ATLAS_PARAMETERS as defaults, evaluateScenarioSource, parseBermScenarioParameters, runBermAtlasScenario, runBermAtlasScenarioDetailed, sourceEnvelope, type ScenarioSource } from "../berm-atlas-scenario";
const source: ScenarioSource = { id: "a", startYear: 2000, endYear: 2005, amplitude: 1, angleDegrees: 0, enabled: true };
describe("the atlas BERM scenario preserves its explicit moment and lag assumptions", () => {
  it("matches the tensor expansion for deterministic collinear sources and background", () => {
    const p = { background: 2, coherence: 0, meanFraction: 1 };
    expect(contractedGeometry([1, 3], p)).toEqual({ self: 10, cross: 6, backgroundTerm: 16, geometry: 32 });
    expect(contractedGeometry([1, -1], p).geometry).toBe(0);
  });
  it("does not create cross terms just because independent zero-mean sources coexist", () => {
    expect(contractedGeometry([1, 3], defaults)).toMatchObject({ self: 10, cross: 0, backgroundTerm: 0, geometry: 10 });
    expect(contractedGeometry([1, 3], { ...defaults, coherence: 1 }).geometry).toBe(16);
    expect(contractedGeometry([1, -1], { ...defaults, coherence: 1 }).geometry).toBe(0);
  });
  it("retains response after source removal only for the specified finite memory", () => {
    const result = runBermAtlasScenario([source], { ...defaults, rampYears: 0, lagYears: 2, memoryYears: 2 }, 1998, 2012, 1998);
    const at = (year: number) => result.find(p => p.year === year)!;
    expect(at(2001).response).toBe(0);
    expect(at(2002).response).toBeCloseTo(1 / 3);
    expect(at(2007).response).toBe(1);
    expect(at(2009).response).toBeCloseTo(1 / 3);
    expect(at(2010).response).toBe(0);
  });
  it("does not turn removing all selected sources or zero biological gain into a fertility change", () => {
    expect(runBermAtlasScenario([{ ...source, enabled: false }], defaults, 1990, 2010, 1990).every(p => p.multiplier === 1)).toBe(true);
    expect(runBermAtlasScenario([source], { ...defaults, beta: 0 }, 1990, 2010, 1990).every(p => p.multiplier === 1)).toBe(true);
  });
  it("keeps source orientation in the projected geometry and baseline at unity", () => {
    expect(runBermAtlasScenario([{ ...source, angleDegrees: 90 }], defaults, 1990, 2010, 1990).at(-1)!.response).toBeCloseTo(0);
    const points = runBermAtlasScenario([source], defaults, 1990, 2010, 2004);
    expect(points.find(p => p.year === 2004)!.multiplier).toBe(1);
  });
  it("rejects unbounded, nonfinite and unsupported URL parameters", () => {
    expect(() => runBermAtlasScenario([source], { ...defaults, coherence: -1 }, 1950, 2023, 1950)).toThrow();
    expect(() => runBermAtlasScenario([{ ...source, amplitude: NaN }], defaults, 1950, 2023, 1950)).toThrow();
    expect(parseBermScenarioParameters(new URLSearchParams("s_beta=Infinity&s_lagYears=30.5"))).toEqual(defaults);
  });
  it("rejects exponential overflow and percentage overflow without exporting nonfinite biology", () => {
    const sources = Array.from({ length: 12 }, (_, i) => ({ ...source, id: `source-${i}`, amplitude: 2 }));
    const p = { ...defaults, background: 3, coherence: 1, meanFraction: 1, rampYears: 0, lagYears: 0, memoryYears: 0 };
    // Projection = 720. exp(720) overflows; exp(705.6) is finite but its percentage is not.
    for (const beta of [-1, -0.98]) expect(() => runBermAtlasScenario(sources, { ...p, beta }, 1999, 2001, 1999)).toThrow(RangeError);
  });
  it("rejects numerical underflow rather than presenting an exact zero rate multiplier", () => {
    const sources = Array.from({ length: 14 }, (_, i) => ({ ...source, id: `source-${i}`, amplitude: 2 }));
    expect(() => runBermAtlasScenario(sources, { ...defaults, background: 0, coherence: 1, meanFraction: 1, rampYears: 0, lagYears: 0, memoryYears: 0, beta: 1 }, 1999, 2001, 1999)).toThrow(RangeError);
  });
  it("preserves a shutdown gap and restarts the assumed ramp when operation resumes", () => {
    const interrupted: ScenarioSource = { ...source, startYear: 1936, endYear: 1950, windows: [{ startYear: 1936, endYear: 1939 }, { startYear: 1946, endYear: 1950 }] };
    expect(sourceEnvelope(interrupted, 1936, 4)).toBe(0.25);
    expect(sourceEnvelope(interrupted, 1939, 4)).toBe(1);
    expect(sourceEnvelope(interrupted, 1940, 4)).toBe(0);
    expect(sourceEnvelope(interrupted, 1945, 4)).toBe(0);
    expect(sourceEnvelope(interrupted, 1946, 4)).toBe(0.25);
    expect(sourceEnvelope(interrupted, 1949, 4)).toBe(1);
    expect(sourceEnvelope(interrupted, 1951, 4)).toBe(0);
    const result = runBermAtlasScenario([interrupted], { ...defaults, rampYears: 0, lagYears: 0, memoryYears: 0 }, 1935, 1950, 1935);
    expect(result.find(p => p.year === 1943)!.response).toBe(0);
    expect(result.find(p => p.year === 1946)!.response).toBe(1);
  });
  it("rejects overlapping, unordered, noninteger and inconsistent source windows", () => {
    const invalid: ScenarioSource[] = [
      { ...source, windows: [] },
      { ...source, windows: [{ startYear: 2000, endYear: 2003 }, { startYear: 2003, endYear: 2005 }] },
      { ...source, windows: [{ startYear: 2004, endYear: 2005 }, { startYear: 2000, endYear: 2001 }] },
      { ...source, windows: [{ startYear: 2000.5, endYear: 2005 }] },
      { ...source, windows: [{ startYear: 2000, endYear: Infinity }] },
      { ...source, windows: [{ startYear: 2001, endYear: 2005 }] },
      { ...source, windows: [{ startYear: 2000, endYear: 2004 }] },
    ];
    for (const entry of invalid) expect(() => runBermAtlasScenario([entry], defaults, 1999, 2010, 1999)).toThrow(/Invalid normalized source scenario/);
  });
});

const profiled: ScenarioSource = { id: "quantity", startYear: 1880, endYear: 2023, amplitude: 1, angleDegrees: 0, enabled: true,
  profile: [{ year: 1900, value: 0.1 }, { year: 1950, value: 0.2 }, { year: 1980, value: 0.4 }, { year: 2023, value: 1 }] };
const instant = { ...defaults, lagYears: 0, memoryYears: 0 };

describe("source-specific temporal profiles", () => {
  it("uses irregular source years and keeps later growth after an early historical onset", () => {
    expect(evaluateScenarioSource(profiled, 1965, 8)).toEqual({ value: 0.30000000000000004, basis: "profile-linear" });
    expect(sourceEnvelope(profiled, 1950, 0)).toBe(0.2);
    expect(sourceEnvelope(profiled, 1950, 30)).toBe(0.2);
    const points = runBermAtlasScenario([profiled], instant, 1950, 2023, 1950);
    expect(points[0].geometry).toBeCloseTo(0.04);
    expect(points.at(-1)!.geometry).toBe(1);
    expect(points.at(-1)!.response).toBeCloseTo(0.96);
    expect(points.at(-1)!.multiplier).toBeCloseTo(Math.exp(-defaults.beta * 0.96));
    expect(runBermAtlasScenario([profiled], { ...instant, rampYears: 30 }, 1950, 2023, 1950)).toEqual(points);
  });

  it("treats empty and uncovered profiles as unknown unless omission is explicitly chosen", () => {
    const empty = { ...profiled, profile: [] };
    expect(evaluateScenarioSource(empty, 1950, 8)).toEqual({ value: null, basis: "profile-missing" });
    expect(evaluateScenarioSource({ ...empty, profileOutside: "hold" }, 1950, 8).value).toBeNull();
    expect(evaluateScenarioSource(profiled, 1899, 8).value).toBeNull();
    expect(evaluateScenarioSource({ ...profiled, endYear: 2026 }, 2024, 8).value).toBeNull();
    expect(() => sourceEnvelope(empty, 1950, 8)).toThrow(/Missing source profile/);
    expect(sourceEnvelope(empty, 1950, 8, { missingProfile: "omit" })).toBe(0);
    const result = runBermAtlasScenarioDetailed([empty], instant, 1950, 1952, 1950, { missingProfile: "omit" });
    expect(result.points.every(p => p.multiplier === 1)).toBe(true);
    expect(result.coverage).toMatchObject({ policy: "omit", complete: false, profiledSourceIds: ["quantity"], legacyRampSourceIds: [] });
    expect(result.coverage.byYear.every(row => row.missingProfileIds.includes("quantity"))).toBe(true);
  });

  it("records missing pre-baseline memory support rather than silently padding the kernel", () => {
    const recent = { ...profiled, profile: profiled.profile!.slice(1) };
    expect(() => runBermAtlasScenario([recent], defaults, 1950, 2023, 1950)).toThrow(/Missing source profile/);
    const result = runBermAtlasScenarioDetailed([recent], defaults, 1950, 2023, 1950, { missingProfile: "omit" });
    expect(result.coverage.byYear[0].year).toBe(1942);
    expect(result.coverage.byYear.find(row => row.year === 1949)?.missingProfileIds).toEqual(["quantity"]);
    expect(result.coverage.byYear.find(row => row.year === 1960)?.interpolatedProfileIds).toEqual(["quantity"]);
    expect(result.points[0].multiplier).toBe(1);
  });

  it("preserves explicit data gaps while distinguishing a declared operation gap", () => {
    const interrupted: ScenarioSource = { ...profiled, startYear: 1990, endYear: 2010,
      profile: [{ year: 1990, value: 0.1 }, { year: 1995, value: 0.3 }, { year: 2005, value: 0.8 }, { year: 2010, value: 1 }],
      profileWindows: [{ startYear: 1990, endYear: 1995 }, { startYear: 2005, endYear: 2010 }] };
    expect(evaluateScenarioSource(interrupted, 2000, 8)).toMatchObject({ value: null, basis: "profile-missing" });
    expect(evaluateScenarioSource({ ...interrupted, profileOutside: "hold" }, 2000, 8).value).toBeNull();
    expect(sourceEnvelope(interrupted, 2006, 8)).toBeCloseTo(0.84);
    expect(evaluateScenarioSource({ ...interrupted, windows: interrupted.profileWindows }, 2000, 8)).toEqual({ value: 0, basis: "outside-operation-window" });
  });

  it("offers late and early step timing without altering the original source anchors", () => {
    const simple: ScenarioSource = { ...profiled, profile: [{ year: 1950, value: 0.2 }, { year: 1970, value: 0.8 }] };
    expect(sourceEnvelope(simple, 1955, 8)).toBeCloseTo(0.35);
    expect(sourceEnvelope({ ...simple, profileMode: "step", profileStep: "previous" }, 1955, 8)).toBe(0.2);
    expect(sourceEnvelope({ ...simple, profileMode: "step", profileStep: "next" }, 1955, 8)).toBe(0.8);
    for (const profileStep of ["previous", "next"] as const) {
      expect(sourceEnvelope({ ...simple, profileMode: "step", profileStep }, 1950, 8)).toBe(0.2);
      expect(sourceEnvelope({ ...simple, profileMode: "step", profileStep }, 1970, 8)).toBe(0.8);
    }
    expect(simple.profile).toEqual([{ year: 1950, value: 0.2 }, { year: 1970, value: 0.8 }]);
  });

  it("does not borrow a pre-shutdown anchor to interpolate an unmeasured restart", () => {
    const restarted: ScenarioSource = { ...profiled, startYear: 1936, endYear: 1960,
      windows: [{ startYear: 1936, endYear: 1939 }, { startYear: 1946, endYear: 1960 }],
      profile: [{ year: 1936, value: 0.1 }, { year: 1950, value: 0.8 }, { year: 1960, value: 1 }] };
    expect(evaluateScenarioSource(restarted, 1940, 8).basis).toBe("outside-operation-window");
    expect(evaluateScenarioSource(restarted, 1946, 8).value).toBeNull();
    expect(evaluateScenarioSource({ ...restarted, profileOutside: "hold" }, 1946, 8)).toEqual({ value: 0.8, basis: "assumed-hold" });
    const unknownRestart = { ...restarted, profile: [{ year: 1936, value: 0.1 }], profileOutside: "hold" as const };
    expect(evaluateScenarioSource(unknownRestart, 1950, 8).value).toBeNull();
  });

  it("maps source quantities to amplitude after interpolation under an explicit linear or sqrt assumption", () => {
    const count = { ...profiled, profile: [{ year: 1950, value: 1 }, { year: 1960, value: 9 }] };
    expect(sourceEnvelope(count, 1955, 8)).toBe(5);
    expect(sourceEnvelope({ ...count, profileTransform: "sqrt" }, 1955, 8)).toBeCloseTo(Math.sqrt(5));
    const linear = runBermAtlasScenario([count], instant, 1950, 1960, 1950);
    const root = runBermAtlasScenario([{ ...count, profileTransform: "sqrt" }], instant, 1950, 1960, 1950);
    expect(linear.at(-1)!.self).toBe(81);
    expect(root.at(-1)!.self).toBe(9);
  });

  it("holds either endpoint only by explicit choice and within operating scope, tagging assumed years", () => {
    const held: ScenarioSource = { ...profiled, startYear: 1950, endYear: 2005, profileOutside: "hold",
      profile: [{ year: 1990, value: 2 }, { year: 2000, value: 4 }] };
    expect(evaluateScenarioSource(held, 1950, 8)).toEqual({ value: 2, basis: "assumed-hold" });
    expect(evaluateScenarioSource(held, 2005, 8)).toEqual({ value: 4, basis: "assumed-hold" });
    expect(evaluateScenarioSource(held, 1949, 8)).toEqual({ value: 0, basis: "outside-operation-window" });
    expect(evaluateScenarioSource(held, 2006, 8).basis).toBe("outside-operation-window");
    const result = runBermAtlasScenarioDetailed([held], instant, 1950, 2005, 1950);
    expect(result.coverage.complete).toBe(false);
    expect(result.coverage.byYear.find(row => row.year === 1950)).toMatchObject({ assumedProfileIds: ["quantity"], availableProfileIds: [], missingProfileIds: [] });
    expect(result.coverage.byYear.find(row => row.year === 1990)).toMatchObject({ assumedProfileIds: [], availableProfileIds: ["quantity"] });
  });

  it("retains an isolated point without treating a single source anchor as a full measured history", () => {
    const isolated = { ...profiled, profile: [{ year: 2000, value: 0.7 }] };
    expect(sourceEnvelope(isolated, 2000, 8)).toBe(0.7);
    expect(evaluateScenarioSource(isolated, 2001, 8).value).toBeNull();
    expect(evaluateScenarioSource({ ...isolated, profileOutside: "hold" }, 1950, 8)).toEqual({ value: 0.7, basis: "assumed-hold" });
  });

  it("preserves baseline identity and allows either sign of the conditional biological response", () => {
    const positive = runBermAtlasScenario([profiled], { ...instant, beta: 0.2 }, 1950, 2023, 1980);
    const negative = runBermAtlasScenario([profiled], { ...instant, beta: -0.2 }, 1950, 2023, 1980);
    expect(positive.find(p => p.year === 1980)?.multiplier).toBe(1);
    expect(negative.find(p => p.year === 1980)?.multiplier).toBe(1);
    expect(positive.at(-1)!.multiplier).toBeLessThan(1);
    expect(negative.at(-1)!.multiplier).toBeGreaterThan(1);
    expect(positive.at(-1)!.multiplier * negative.at(-1)!.multiplier).toBeCloseTo(1);
  });

  it("rejects negative, nonfinite, unordered and duplicate profile values and source identities", () => {
    const profiles = [[{ year: 1950, value: -1 }], [{ year: 1950, value: Infinity }],
      [{ year: 1950.5, value: 1 }], [{ year: 1951, value: 1 }, { year: 1950, value: 2 }],
      [{ year: 1950, value: 1 }, { year: 1950, value: 2 }]];
    for (const profile of profiles) expect(() => runBermAtlasScenario([{ ...profiled, profile }], instant, 1950, 2023, 1950)).toThrow(/Invalid normalized source/);
    expect(() => runBermAtlasScenario([profiled, profiled], instant, 1950, 2023, 1950)).toThrow(/Invalid normalized source/);
  });
});

describe("fixed-other-state ASFR aggregation", () => {
  const ages = ["15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49"];
  const asfr = ages.map((ageGroup, index) => ({ ageGroup, points: [{ year: 1950, value: index * 10 }, { year: 2023, value: 999 }] }));
  const scenario = [{ year: 1950, multiplier: 1 }, { year: 2023, multiplier: 0.8 }];

  it("sums baseline age-specific rates in their source units, without fitting later observed rates", () => {
    const result = applyBermScenarioToAsfr(asfr, scenario, 1950);
    expect(result.baselineTfr).toBeCloseTo(1.05);
    expect(result.points[0].tfr).toBeCloseTo(1.05);
    expect(result.points[1].tfr).toBeCloseTo(0.84);
    expect(result.points[1].asfr.map(p => p.value)).toEqual([0, 8, 16, 24, 32, 40, 48]);
    expect(asfr[1].points[1].value).toBe(999);
  });

  it("keeps an absent age-group baseline missing and never rescales the remaining ages", () => {
    const result = applyBermScenarioToAsfr(asfr.slice(1), scenario, 1950);
    expect(result.baselineTfr).toBeNull();
    expect(result.points.every(p => p.tfr === null)).toBe(true);
    expect(result.points[1].missingAgeGroups).toEqual(["15-19"]);
    expect(result.points[1].asfr[0].value).toBeNull();
    expect(result.points[1].asfr[1].value).toBe(8);
    expect(applyBermScenarioToAsfr(asfr, scenario, 1949).points[0].missingAgeGroups).toEqual(ages);
  });

  it("keeps explicit nulls distinct from measured zero and requires the exact baseline year", () => {
    const changed = asfr.map(s => ({ ...s, points: s.ageGroup === "25-29" ? [{ year: 1950, value: null }] : s.points }));
    const result = applyBermScenarioToAsfr(changed, scenario, 1950);
    expect(result.points[0].asfr[0].value).toBe(0);
    expect(result.points[0].asfr[2].value).toBeNull();
    expect(result.points[0].tfr).toBeNull();
  });

  it("uses declared age widths and rejects overlapping ages or invalid multipliers", () => {
    const bands = [{ ageGroup: "20-29", points: [{ year: 1950, value: 100 }] }];
    expect(applyBermScenarioToAsfr(bands, scenario, 1950, ["20-29"]).baselineTfr).toBe(1);
    expect(() => applyBermScenarioToAsfr(asfr, scenario, 1950, ["20-29", "25-34"])).toThrow(/nonoverlapping/);
    expect(() => applyBermScenarioToAsfr(asfr, [{ year: 1950, multiplier: Infinity }], 1950)).toThrow(/multiplier/);
    expect(() => applyBermScenarioToAsfr(asfr, [{ year: 1950, multiplier: 0 }], 1950)).toThrow(/multiplier/);
  });
});
