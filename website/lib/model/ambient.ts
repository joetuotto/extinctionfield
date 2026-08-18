import { AMBIENT_COVERAGE, AMBIENT_DIVISOR, AMBIENT_COEFF } from "./config";

export function effectiveEmfField(
  mobilePenetration: number,
  popDensity: number,
  coverage = AMBIENT_COVERAGE,
): number {
  const baseStationsPerKm2 =
    (mobilePenetration * popDensity) / AMBIENT_DIVISOR;
  return coverage * Math.log1p(baseStationsPerKm2) * AMBIENT_COEFF;
}
