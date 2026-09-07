/**
 * Legacy filename for the scalar v17 comparison route.
 *
 * The source-free Maxwell derivation has three required checks after the
 * Lindgren metric g_mu_nu=eta_mu_nu+kappa A_mu A_nu is declared: the
 * variational principle delta S/delta A_mu=0, the Weyl compatibility
 * condition and the Bianchi identity. Bianchi is necessary but cannot by
 * itself produce the sourced equation div(F)=J.
 *
 * The geometric coefficient chi_geo is exposed through the legacy `chi` API.
 * Its applied status is [L1 + L0/L2 reduction]: the Lorentz-signature
 * directional derivative is L1, while selecting q=|Abar| requires an explicit
 * dimensionless, collinear Lorentz-to-Euclidean spatial/scalar reduction.
 * Callers must explicitly attest that a value is already a
 * dimensionless coordinate, or pass it through a named normalization adapter;
 * a concrete proxy, V/m measurement, or membrane variable cannot be passed to
 * chi directly. Constructing q=N(z) remains an open L0→L2 step. Downstream
 * empirical biology is L3 component by component.
 */

export const MAXWELL_DERIVATION_CONTRACT =
  "Lindgren metric + variational principle + Weyl condition + Bianchi identity; Bianchi alone is insufficient" as const;

export const CHI_EPISTEMIC_STATUS = "L1 + L0/L2 reduction" as const;

declare const dimensionlessChiCoordinateBrand: unique symbol;

/** A dimensionless q coordinate after an explicitly declared normalization. */
export type DimensionlessChiCoordinate = number & {
  readonly [dimensionlessChiCoordinateBrand]: "DimensionlessChiCoordinate";
};

/**
 * Explicit boundary for a value that is already normalized and dimensionless.
 * This validates arithmetic only; it does not calibrate or derive N(z).
 */
export function asDimensionlessChiCoordinate(
  normalizedValue: number,
): DimensionlessChiCoordinate {
  if (!Number.isFinite(normalizedValue)) {
    throw new RangeError("normalized chi coordinate must be finite");
  }
  return normalizedValue as DimensionlessChiCoordinate;
}

/**
 * [L1 + L0/L2 reduction] χ(|Abar|)=|Abar|/√(1+|Abar|²).
 *
 * Stage 1 [L1]: the volume-element directional derivative in Lorentz
 * signature is κ(A·u)/√(1+κA²). Stage 2 [L0/L2]: an explicitly declared
 * dimensionless, collinear spatial/scalar reduction selects q=|Abar| and
 * evaluates χ_geo(q)=q/√(1+q²). A caller may instead obtain q=N(z) through a
 * separately named open L0→L2 normalization adapter.
 */
export function chi(x: DimensionlessChiCoordinate): number {
  return x / Math.sqrt(1 + x * x);
}

/** Candidate legacy two-channel adapter; not a closed L2 response map. */
export function twoChannelExposure(
  ambientTimingProxy: number,
  personal: number,
  normalizedAmbientCoordinate: DimensionlessChiCoordinate,
): number {
  return ambientTimingProxy + chi(normalizedAmbientCoordinate) * personal;
}

/** Candidate legacy three-channel adapter; not a Lorentz L1 contraction. */
export function threeChannelExposure(
  natural: number,
  ambientTimingProxy: number,
  personal: number,
  normalizedAmbientCoordinate: DimensionlessChiCoordinate,
): number {
  return natural + ambientTimingProxy + chi(normalizedAmbientCoordinate) * personal;
}
