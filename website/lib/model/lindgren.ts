/**
 * Legacy filename for the scalar v17 comparison route.
 * `chi` is a BERM closure proposal, not a response derived by Lindgren, and
 * the geometry-to-observable L2 operator remains open.
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
