import { describe, expect, it } from "vitest";
import {
  betaFromAlpha,
  computeDkcLoad,
  dutyCycle,
  hillResponse,
  hillSaturation,
  normalizedErlangKernel,
  normalizedExponentialKernel,
  seasonalCv,
  sigmoid,
  smartphoneSigmoid,
  t3Vulnerability,
} from "../dkc";

describe("sigmoid and duty-cycle scenarios", () => {
  it("places the sigmoid midpoint at one half and remains numerically stable", () => {
    expect(sigmoid(12, 12, 0.5)).toBe(0.5);
    expect(smartphoneSigmoid(2013, 2013)).toBe(0.5);
    expect(sigmoid(1_000_000, 0, 1)).toBe(1);
    expect(sigmoid(-1_000_000, 0, 1)).toBe(0);
  });

  it("maps adoption continuously from the 0.33 baseline to one", () => {
    expect(dutyCycle(2013, 2013)).toBeCloseTo(0.665, 12);
    expect(dutyCycle(1900, 2013)).toBeCloseTo(0.33, 12);
    expect(dutyCycle(2200, 2013)).toBeCloseTo(1, 12);
  });
});

describe("normalized annual kernels", () => {
  const lags = Array.from({ length: 41 }, (_, lag) => lag);

  it("normalizes the exponential kernel over the supplied history", () => {
    const weights = normalizedExponentialKernel(lags, 12);
    expect(weights.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1, 12);
    expect(weights[0]).toBeGreaterThan(weights[1]);
    expect(weights[1] / weights[0]).toBeCloseTo(Math.exp(-1 / 12), 12);
  });

  it("normalizes Erlang and puts its discrete mode near (nB - 1) tauB", () => {
    const weights = normalizedErlangKernel(lags, 0.5, 3);
    expect(weights.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1, 12);
    expect(weights.indexOf(Math.max(...weights))).toBe(1);
    expect(weights[0]).toBeGreaterThan(0);
  });

  it("matches the Python annual-bin Erlang reference vector", () => {
    const expected = [
      0.323492530395,
      0.438802278652,
      0.176226536864,
      0.048240030417,
      0.010990311807,
      0.002248311864,
    ];
    const weights = normalizedErlangKernel([0, 1, 2, 3, 4, 5], 0.5, 3);
    weights.forEach((weight, index) => {
      expect(weight).toBeCloseTo(expected[index], 11);
    });
  });

  it("reduces Erlang shape one exactly to the normalized exponential", () => {
    const erlang = normalizedErlangKernel(lags, 4, 1);
    const exponential = normalizedExponentialKernel(lags, 4);
    erlang.forEach((weight, index) => {
      expect(weight).toBeCloseTo(exponential[index], 12);
    });
  });

  it("defines a normalized first annual bin for delayed Erlang", () => {
    expect(normalizedErlangKernel([0], 0.5, 3)).toEqual([1]);
  });

  it("rejects an empty kernel rather than returning an unnormalised result", () => {
    expect(() => normalizedExponentialKernel([], 1)).toThrow(/at least one lag/);
  });
});

describe("T3 vulnerability and the alpha constraint", () => {
  it.each([
    [-0.001, 5],
    [0, 4],
    [0.999, 4],
    [1, 3],
    [5.999, 3],
    [6, 2],
    [17.999, 2],
    [18, 1],
    [80, 1],
  ])("maps age %s to vulnerability %s", (age, expected) => {
    expect(t3Vulnerability(age)).toBe(expected);
  });

  it("derives beta only as one minus alpha", () => {
    expect(betaFromAlpha(0)).toBe(1);
    expect(betaFromAlpha(0.37)).toBeCloseTo(0.63, 12);
    expect(betaFromAlpha(1)).toBe(0);
    expect(() => betaFromAlpha(1.01)).toThrow(RangeError);
  });
});

describe("dual-kernel load", () => {
  const constant = Array.from({ length: 8 }, (_, index) => ({
    year: 2000 + index,
    value: 1,
  }));

  it("keeps alpha and beta contributions explicit and additive", () => {
    const result = computeDkcLoad(constant, {
      tauB: 0.5,
      tauR: 12,
      alpha: 0.7,
      nB: 3,
    });
    const mature = result.at(-1)!;

    expect(mature.fastConvolution).toBeCloseTo(1, 12);
    expect(mature.slowConvolution).toBeCloseTo(1, 12);
    expect(mature.fast).toBeCloseTo(0.7, 12);
    expect(mature.slow).toBeCloseTo(0.3, 12);
    expect(mature.total).toBeCloseTo(mature.fast + mature.slow, 12);
  });

  it("supports the exponential fast-kernel special case with nB one", () => {
    const result = computeDkcLoad(constant, {
      tauB: 1,
      tauR: 8,
      alpha: 1,
      nB: 1,
    });
    for (const point of result) {
      expect(point.fastConvolution).toBeCloseTo(1, 12);
    }
    expect(result.every((point) => point.slow === 0)).toBe(true);
  });

  it("applies T3 vulnerability only to the slow arm when a cohort is supplied", () => {
    const series = [
      { year: 1999, value: 1 },
      { year: 2000, value: 1 },
    ];
    const unweighted = computeDkcLoad(series, {
      tauB: 1,
      tauR: 2,
      alpha: 0,
      nB: 1,
    });
    const weighted = computeDkcLoad(series, {
      tauB: 1,
      tauR: 2,
      alpha: 0,
      nB: 1,
      cohortBirthYear: 2000,
    });

    expect(unweighted[1].slowConvolution).toBeCloseTo(1, 12);
    expect(weighted[1].slowConvolution).toBeGreaterThan(4);
    expect(weighted[1].fastConvolution).toBeCloseTo(1, 12);
  });

  it("rejects gaps rather than silently treating them as annual lags", () => {
    expect(() =>
      computeDkcLoad(
        [
          { year: 2000, value: 0.2 },
          { year: 2002, value: 0.4 },
        ],
        { tauB: 1, tauR: 12, alpha: 0.5, nB: 3 },
      ),
    ).toThrow(/consecutive/);
  });

  it("requires the slow scale to exceed the fast scale", () => {
    expect(() =>
      computeDkcLoad(constant, {
        tauB: 5,
        tauR: 5,
        alpha: 0.5,
        nB: 3,
      }),
    ).toThrow(/greater than tauB/);
  });
});

describe("Hill and seasonal transforms", () => {
  it("has the expected Hill midpoint and saturating limits", () => {
    expect(hillSaturation(0, 0.5, 3)).toBe(0);
    expect(hillSaturation(0.5, 0.5, 3)).toBe(0.5);
    expect(hillSaturation(1, 0.5, 3)).toBeCloseTo(8 / 9, 12);
    expect(hillSaturation(Number.MAX_VALUE, 0.5, 5)).toBe(1);
  });

  it("applies gamma only as the negative response scale", () => {
    expect(hillResponse(0.5, 0.8, 0.5, 2)).toBeCloseTo(-0.4, 12);
  });

  it("reduces seasonal CV linearly as duty approaches one", () => {
    expect(seasonalCv(0.175, 0.33)).toBeCloseTo(0.11725, 12);
    expect(seasonalCv(0.175, 1)).toBe(0);
  });
});
