import { describe, expect, it } from "vitest";

import {
  CHI_EPISTEMIC_STATUS,
  MAXWELL_DERIVATION_CONTRACT,
  asDimensionlessChiCoordinate,
  chi,
  threeChannelExposure,
  twoChannelExposure,
} from "../lindgren";

describe("restricted Lindgren chi coefficient", () => {
  it("registers the compound χ status instead of a plain L1 label", () => {
    expect(CHI_EPISTEMIC_STATUS).toBe("L1 + L0/L2 reduction");
  });

  it("registers all Maxwell derivation elements and rejects a Bianchi shortcut", () => {
    expect(MAXWELL_DERIVATION_CONTRACT).toMatch(/Lindgren metric/);
    expect(MAXWELL_DERIVATION_CONTRACT).toMatch(/variational principle/);
    expect(MAXWELL_DERIVATION_CONTRACT).toMatch(/Weyl condition/);
    expect(MAXWELL_DERIVATION_CONTRACT).toMatch(/Bianchi identity/);
    expect(MAXWELL_DERIVATION_CONTRACT).toMatch(/Bianchi alone is insufficient/);
  });

  it("implements the L1 algebraic formula with the zero-background and sign contracts", () => {
    const zero = asDimensionlessChiCoordinate(0);
    const positive = asDimensionlessChiCoordinate(2);
    const negative = asDimensionlessChiCoordinate(-2);

    expect(chi(zero)).toBe(0);
    expect(chi(positive)).toBeCloseTo(2 / Math.sqrt(5), 14);
    expect(chi(negative)).toBeCloseTo(-chi(positive), 14);
  });

  it("saturates algebraically without turning the limit into a biological claim", () => {
    expect(chi(asDimensionlessChiCoordinate(1e12))).toBeCloseTo(1, 12);
    expect(chi(asDimensionlessChiCoordinate(-1e12))).toBeCloseTo(-1, 12);
  });

  it("rejects non-finite coordinates at the explicit normalization boundary", () => {
    expect(() => asDimensionlessChiCoordinate(Number.NaN)).toThrow(RangeError);
    expect(() => asDimensionlessChiCoordinate(Number.POSITIVE_INFINITY)).toThrow(
      RangeError,
    );
  });

  it("requires the separately named dimensionless coordinate in legacy adapters", () => {
    const coordinate = asDimensionlessChiCoordinate(0.75);
    expect(twoChannelExposure(2, 3, coordinate)).toBeCloseTo(
      2 + chi(coordinate) * 3,
      14,
    );
    expect(threeChannelExposure(1, 2, 3, coordinate)).toBeCloseTo(
      1 + 2 + chi(coordinate) * 3,
      14,
    );
  });
});
