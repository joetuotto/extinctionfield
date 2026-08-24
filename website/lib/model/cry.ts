import { GAMMA_CRY } from "./config";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function cryEffect(
  _ambient: number,
  personal: number,
  nightFraction: number,
): number {
  return clamp(1 - GAMMA_CRY * personal * nightFraction, 0.85, 1.0);
}
