import { CONTACT_HOURS_2024, CONTACT_HOURS_SLOPE } from "./config";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function personalContactHours(year: number): number {
  return clamp(CONTACT_HOURS_2024 + CONTACT_HOURS_SLOPE * (year - 2024), 0, 6);
}

export function personalEmfExposure(
  mobilePenetration: number,
  year: number,
): number {
  const contactHrs = personalContactHours(year);
  const nightPrev = clamp(0.35 + 0.01 * (year - 2015), 0, 1);
  const wearablePen = clamp(
    mobilePenetration * 0.5 * Math.max(0, year - 2014) / 10,
    0,
    1,
  );

  const phoneFrac = contactHrs / 24;
  const nightFrac = (nightPrev * 8) / 24;
  const wearFrac = wearablePen * 0.3;

  const personal =
    mobilePenetration * (0.55 * phoneFrac + 0.3 * nightFrac + 0.15 * wearFrac);
  return clamp(personal, 0, 1.5);
}
