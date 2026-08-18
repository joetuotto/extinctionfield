export function chi(aBar: number): number {
  return aBar / Math.sqrt(1 + aBar * aBar);
}

export function twoChannelExposure(
  ambient: number,
  personal: number,
): number {
  return ambient + chi(ambient) * personal;
}
