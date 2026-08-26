import {
  getCountry,
  NATO_COUNTRIES,
  WARSAW_PACT,
  BROADCAST_BASE,
  MILITARY_BASE,
  type AttenuationParams,
  type TechDiffusion,
} from "./countries";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function effectiveEmfField(
  mobilePen: number,
  popDensity: number,
  urbanFrac: number,
): number {
  const deviceDensity = mobilePen * popDensity * 3.5;
  const towerDensity =
    (popDensity * urbanFrac) / 2000 +
    (popDensity * (1 - urbanFrac)) / 5000;
  const urbanMult = 1 + 4 * urbanFrac;
  const rawField =
    0.01 *
    Math.pow(deviceDensity / 100, 1.3) *
    urbanMult *
    (1 + towerDensity / 10);
  return 2.0 * Math.tanh(rawField / 2.0);
}

export function countryAttenuationFactor(p: AttenuationParams): number {
  const timeOn = (24.0 - p.outageHours) / 24.0;
  const effectiveMountain = (1 - p.urbanFrac) * p.mountainFrac;
  const mountainAtten = 1 - effectiveMountain * 0.7;
  return timeOn * mountainAtten * p.sanctionsTech;
}

export function getAttenuationFactor(country: string): number {
  return countryAttenuationFactor(getCountry(country).attenuation);
}

export function techDiffusionCurve(halfYear: number, year: number): number {
  return 1.0 / (1.0 + Math.exp(-0.3 * (year - halfYear)));
}

export function ambientGenMult(year: number, td: TechDiffusion): number {
  if (year >= td.year5g) return 4.0;
  if (year >= td.year4g) return 2.5;
  if (year >= td.year3g) return 1.5;
  if (year >= td.start) return 1.0;
  return 0.0;
}

function milCurve(year: number): number {
  if (year < 1950) return 0.0;
  if (year < 1965) return (year - 1950) / 15.0;
  if (year < 1985) return 1.0;
  if (year < 2000) return 1.0 - 0.7 * (year - 1985) / 15.0;
  return 0.3;
}

function broadcastCurve(year: number): number {
  if (year < 1950) return 0.0;
  const t = year - 1950;
  return 1.0 / (1.0 + Math.exp(-0.15 * (t - 15)));
}

function militaryBaseLevel(country: string): number {
  if (MILITARY_BASE[country] !== undefined) return MILITARY_BASE[country];
  if ((NATO_COUNTRIES as readonly string[]).includes(country)) return 0.3;
  if ((WARSAW_PACT as readonly string[]).includes(country)) return 0.4;
  return 0.05;
}

export function militaryAmbient(country: string, year: number): number {
  return militaryBaseLevel(country) * milCurve(year);
}

export function broadcastAmbient(country: string, year: number): number {
  const base = BROADCAST_BASE[country] ?? 0.1;
  return base * broadcastCurve(year);
}

export function totalPreTelecom(country: string, year: number): number {
  return militaryAmbient(country, year) + broadcastAmbient(country, year);
}

export function wifiPenetration(country: string, year: number): number {
  const c = getCountry(country);
  return c.wifiPen2024 / (1.0 + Math.exp(-0.4 * (year - c.wifiMidpoint)));
}

export function iotDevicesPerHousehold(country: string, year: number): number {
  const c = getCountry(country);
  return c.iotDevices2024 * clamp((year - 2014) / 10.0, 0, 1);
}

export function v16AmbientAnnual(country: string, year: number): number {
  const c = getCountry(country);
  const td = c.techDiffusion;
  const atten = getAttenuationFactor(country);
  const nq = c.networkQuality;
  const bs = techDiffusionCurve(td.half, year) * ambientGenMult(year, td) * atten * nq;
  const wifi = wifiPenetration(country, year) * 0.15;
  const iot = iotDevicesPerHousehold(country, year) * 0.005;
  const telecom = bs + wifi + iot;
  const preTelecom = totalPreTelecom(country, year);
  return telecom + preTelecom;
}
