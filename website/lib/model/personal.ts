import { getCountry } from "./countries";
import { getAttenuationFactor } from "./ambient";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function smartphonePenetration(country: string, year: number): number {
  const c = getCountry(country);
  return c.smartphonePen2024 / (1.0 + Math.exp(-0.5 * (year - c.smartphoneMidpoint)));
}

export function phoneBodyContactHours(year: number): number {
  let raw: number;
  if (year < 2007) raw = 2.0;
  else if (year < 2012) raw = 2.0 + 4.0 * (year - 2007) / 5.0;
  else if (year < 2015) raw = 6.0 + 6.0 * (year - 2012) / 3.0;
  else if (year < 2020) raw = 12.0 + 2.0 * (year - 2015) / 5.0;
  else raw = 14.0 + 0.5 * (year - 2020);
  return clamp(raw, 0, 18);
}

export function earpodPenetration(country: string, year: number): number {
  const c = getCountry(country);
  if (year < 2016) return 0;
  const ramp = Math.min(1.0, (year - 2016) / 8.0);
  return c.earpodPen2024 * ramp;
}

export function v16PersonalAnnual(country: string, year: number): number {
  const c = getCountry(country);
  const td = c.techDiffusion;
  const atten = getAttenuationFactor(country);
  const nq = c.networkQuality;
  const spPen = smartphonePenetration(country, year);
  const bodyHrs = phoneBodyContactHours(year);
  const earPen = earpodPenetration(country, year);

  let phoneSar: number;
  if (year >= td.year5g) phoneSar = 1.4;
  else if (year >= td.year4g) phoneSar = 1.2;
  else if (year >= td.year3g) phoneSar = 1.0;
  else phoneSar = 0.6;

  const phoneContrib = spPen * (bodyHrs / 16.0) * phoneSar * atten * nq;
  const earpodContrib = earPen * spPen * 0.8 * nq;
  return 1.5 * (phoneContrib + earpodContrib);
}
