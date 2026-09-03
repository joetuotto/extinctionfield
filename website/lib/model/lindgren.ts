/**
 * Legacy filename for the scalar v17 comparison route.
 * The same shape is a derived normalized rank-one inverse-metric coordinate.
 * Its use here remains a legacy proxy weighting, not a biological response.
 */
export function chi(aBar: number): number {
  return aBar / Math.sqrt(1 + aBar * aBar);
}

export function twoChannelExposure(
  ambient: number,
  personal: number,
): number {
  return ambient + chi(ambient) * personal;
}

export function threeChannelExposure(
  natural: number,
  ambient: number,
  personal: number,
): number {
  return natural + ambient + chi(ambient) * personal;
}
