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
