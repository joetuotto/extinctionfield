import { ALPHA_EFF, GAMMA_MELATONIN, GAMMA_OVUL_VGIC, GAMMA_MOTILITY, GAMMA_CAPACITATION, GAMMA_NAVIGATION, PRE_TELECOM_START } from "./config";
import { getCountry, COUNTRIES, RECOVERY_LAYERS, OCCUPATIONAL_EMF_WEIGHTS } from "./countries";
import { v16AmbientAnnual, wifiPenetration } from "./ambient";
import { v16PersonalAnnual, smartphonePenetration } from "./personal";
import { chi } from "./lindgren";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

function vulnerabilityByAge(age: number): number {
  if (age < 0) return 5.0;
  if (age < 2) return 4.0;
  if (age < 6) return 3.0;
  if (age < 12) return 2.5;
  if (age < 18) return 2.0;
  return 1.0;
}

const VULN_BY_AGE: [number, number][] = [
  [-1, 5], [0, 4], [1, 4], [2, 3], [3, 3], [4, 3], [5, 3],
  [6, 2.5], [7, 2.5], [8, 2.5], [9, 2.5], [10, 2.5], [11, 2.5],
  [12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2],
];
const VULN_MAX = VULN_BY_AGE.reduce((s, [, v]) => s + v, 0);

function exposureStartYear(country: string): number {
  const td = getCountry(country).techDiffusion;
  return Math.min(td.start, PRE_TELECOM_START);
}

function layerRetention(deltaYears: number): number {
  let total = 0;
  for (const layer of Object.values(RECOVERY_LAYERS)) {
    total += deltaYears === 0
      ? layer.weight
      : layer.weight * Math.pow(1 - layer.alpha, deltaYears);
  }
  return total;
}

function culturalTfr(country: string, year: number): number {
  const { a, b, c } = getCountry(country).culturalTfr;
  return a + b * Math.exp(-c * (year - 1960));
}

function agricultureShare(country: string, year: number): number {
  const occ = getCountry(country).occupational;
  const agri2024 = occ.agriculture;
  let declineRate: number;
  if (agri2024 > 0.50) declineRate = 0.015;
  else if (agri2024 > 0.20) declineRate = 0.010;
  else if (agri2024 > 0.05) declineRate = 0.005;
  else declineRate = 0.001;
  return clamp(agri2024 + declineRate * (2024 - year), 0.01, 0.90);
}

function serviceShare(country: string, year: number): number {
  const occ = getCountry(country).occupational;
  const agri2024 = occ.agriculture;
  const agriYear = agricultureShare(country, year);
  const servYear = occ.services - (agriYear - agri2024) * 0.6;
  return clamp(servYear, 0.10, 0.90);
}

function remoteWorkShare(country: string, year: number): number {
  const remote2024 = getCountry(country).occupational.remoteWork;
  if (year < 2019) return 0.02 * remote2024;
  if (year === 2020) return 0.8 * remote2024;
  if (year >= 2024) return remote2024;
  return remote2024 * (0.8 + 0.2 * (year - 2020) / 4.0);
}

function occupationalEmfMultiplier(country: string, year: number): number {
  const agri = agricultureShare(country, year);
  const services = serviceShare(country, year);
  const industry = Math.max(0, 1 - agri - services);
  const remote = remoteWorkShare(country, year);
  return (
    agri * OCCUPATIONAL_EMF_WEIGHTS.agriculture +
    industry * OCCUPATIONAL_EMF_WEIGHTS.industry +
    Math.max(0, services - remote) * OCCUPATIONAL_EMF_WEIGHTS.officeServices +
    remote * OCCUPATIONAL_EMF_WEIGHTS.remoteWork
  );
}

function v17NightFraction(country: string, year: number): number {
  const c = getCountry(country);
  const spPen = smartphonePenetration(country, year);
  const bedFrac = c.smartphoneInBedroom;
  const wifiPen = wifiPenetration(country, year);
  return clamp(spPen * bedFrac * (1 + wifiPen * 0.3), 0, 1.5);
}

function v17CryEffect(country: string, year: number): number {
  const pers = v16PersonalAnnual(country, year);
  const nf = v17NightFraction(country, year);
  return clamp(1 - 0.02 * pers * nf, 0.85, 1.0);
}

function v17MelatoninSuppression(country: string, year: number): number {
  const nightEmf = v17NightFraction(country, year) * v16PersonalAnnual(country, year);
  return clamp(1 - GAMMA_MELATONIN * nightEmf, 0.90, 1.0);
}

function v17OvulationVgic(country: string, year: number): number {
  const amb = v16AmbientAnnual(country, year);
  const pers = v16PersonalAnnual(country, year);
  const vgicExposure = chi(amb) * pers;
  return clamp(1 - GAMMA_OVUL_VGIC * vgicExposure, 0.95, 1.0);
}

function v17SpermCa2Fecundity(country: string, year: number, adjCum: number): number {
  const pers = v16PersonalAnnual(country, year);
  const cumNorm = Math.min(1.0, adjCum / 50.0);
  const motility = 1 - GAMMA_MOTILITY * pers;
  const capacitation = 1 - GAMMA_CAPACITATION * cumNorm;
  const navigation = 1 - GAMMA_NAVIGATION * cumNorm;
  return clamp(motility * capacitation * navigation, 0.92, 1.0);
}

function v11BiologicalCapacity(cumExposure: number): number {
  const a = 6.5, b = 0.010, threshold = 5.0;
  if (cumExposure <= threshold) return a;
  return a * Math.exp(-b * (cumExposure - threshold));
}

function v12NutritionModifier(country: string): number {
  const n = getCountry(country).nutrition;
  if (!n) return 1.0;
  const protection = clamp((n.antioxidantIndex - 0.5) / 0.5, -1, 1);
  return 1.0 + 0.10 * protection;
}

function v16EpigeneticFactor(country: string, year: number): number {
  const td = getCountry(country).techDiffusion;
  const yearsOfEmf = Math.max(0, year - td.start);
  const generations = yearsOfEmf / 28.0;
  return Math.pow(0.97, generations);
}

function lactobacillusResponse(emfNorm: number): number {
  return Math.exp(-0.35 * emfNorm);
}

function ecoliResponse(emfNorm: number): number {
  return Math.exp(0.20 * emfNorm);
}

function dysbiosisIndex(emfNorm: number): number {
  return ecoliResponse(emfNorm) / lactobacillusResponse(emfNorm);
}

function bbbPermeability(eac: number): number {
  return 0.02 + 0.83 / (1 + Math.exp(-(eac - 0.15) / 0.08));
}

function pathwayF(eac: number): number {
  const SCHUMANN_EAC = 1e-6;
  const chemicals = [
    { blood: 1.0, potency: 0.6, normalBbb: 0.05 },
    { blood: 0.3, potency: 0.8, normalBbb: 0.02 },
    { blood: 0.5, potency: 0.3, normalBbb: 0.01 },
  ];
  const dose = (c: typeof chemicals[0], bbb: number) =>
    c.blood * c.potency * (c.normalBbb + (1 - c.normalBbb) * bbb);
  const bbb = bbbPermeability(eac);
  const bbbBase = bbbPermeability(SCHUMANN_EAC);
  const withEmf = chemicals.reduce((s, c) => s + dose(c, bbb), 0);
  const withoutEmf = chemicals.reduce((s, c) => s + dose(c, bbbBase), 0);
  return withoutEmf > 0 ? withEmf / withoutEmf : 1.0;
}

function v17MaleBioCap(adjCum: number, country: string, year: number): number {
  const baseBioCap = v11BiologicalCapacity(adjCum);
  const instantEmf = v16AmbientAnnual(country, year) + v16PersonalAnnual(country, year);
  const emfNorm = Math.min(1.0, instantEmf / 8.0);
  const dysIdx = dysbiosisIndex(emfNorm);
  const dysEffect = clamp(1 - 0.08 * Math.max(0, dysIdx - 1), 0.7, 1.0);
  const bbbMult = pathwayF(emfNorm);
  const bbbEffect = clamp(1 - 0.02 * Math.max(0, bbbMult - 1), 0.8, 1.0);
  const nutrEffect = v12NutritionModifier(country);
  const epiEffect = v16EpigeneticFactor(country, year);
  return baseBioCap * dysEffect * bbbEffect * nutrEffect * epiEffect;
}

function v16BiologicalCapacity(adjCum: number, country: string, year: number): number {
  return (
    v17MaleBioCap(adjCum, country, year) *
    v17SpermCa2Fecundity(country, year, adjCum) *
    v17CryEffect(country, year) *
    v17MelatoninSuppression(country, year) *
    v17OvulationVgic(country, year)
  );
}

function emfBehavioralFactorV3(adjCum: number): number {
  const oxytocin = Math.exp(-0.010 * adjCum);
  const testosterone = Math.exp(-0.013 * adjCum);
  const dopamine = Math.exp(-0.016 * adjCum);
  const cortisol = Math.exp(-0.008 * adjCum);
  const vasopressin = Math.exp(-0.006 * adjCum);
  const cortisolSuppression = 0.5 + 0.5 * cortisol;
  const effectiveT = testosterone * cortisolSuppression;
  const combined = Math.pow(oxytocin * effectiveT * dopamine * cortisol * vasopressin, 1 / 5);
  return Math.max(0.1, combined);
}

function ivfShareProjected(country: string, year: number): number {
  const base = getCountry(country).ivfShare;
  return clamp(base + 0.005 * (year - 2023), 0, 0.25);
}

function biologicalTfr(observedTfr: number, ivfShare: number): number {
  return observedTfr * (1 - ivfShare);
}

function observedFromBiological(bioTfr: number, ivfShare: number): number {
  if (ivfShare >= 1) return bioTfr;
  return bioTfr / (1 - ivfShare);
}

function v17WeightedCumExposure(country: string, year: number): number {
  const start = exposureStartYear(country);
  let total = 0;
  for (let y = start; y <= year; y++) {
    const amb = v16AmbientAnnual(country, y);
    const pers = v16PersonalAnnual(country, y);
    const annual = amb + chi(amb) * pers;
    total += annual * layerRetention(year - y);
  }
  return total;
}

function v17CohortAdjustment(country: string, year: number): number {
  const peakBirthYear = year - 28;
  const emfStart = exposureStartYear(country);
  let weighted = 0;
  for (const [age, vuln] of VULN_BY_AGE) {
    if (peakBirthYear + age >= emfStart) weighted += vuln;
  }
  return 1.0 + 0.20 * (weighted / VULN_MAX);
}

function cohortWeightedCumRaw(country: string, year: number): number {
  const birthYear = year - 28;
  const start = exposureStartYear(country);
  let total = 0;
  for (let y = start; y <= year; y++) {
    const amb = v16AmbientAnnual(country, y);
    const pers = v16PersonalAnnual(country, y);
    const annual = amb + chi(amb) * pers;
    const age = y - birthYear;
    const vuln = vulnerabilityByAge(age);
    const ret = layerRetention(year - y);
    total += annual * vuln * ret;
  }
  return total;
}

let cohortNormFactor = 1.0;
let calibrated = false;
const trueCulturalRates: Record<string, number> = {};
const bioBehav2024: Record<string, number> = {};

function computeCohortNormFactor(): number {
  const ratios: number[] = [];
  for (const name of Object.keys(COUNTRIES)) {
    const wtCum = v17WeightedCumExposure(name, 2024);
    const cohAdj = v17CohortAdjustment(name, 2024);
    const cohortRaw = cohortWeightedCumRaw(name, 2024);
    if (cohortRaw > 0.01) {
      ratios.push((wtCum * cohAdj) / cohortRaw);
    }
  }
  return ratios.length > 0 ? ratios.reduce((a, b) => a + b, 0) / ratios.length : 1.0;
}

function v16AdjustedCumulativeExposure(country: string, year: number): number {
  const raw = cohortWeightedCumRaw(country, year) * cohortNormFactor;
  return raw * occupationalEmfMultiplier(country, year);
}

function calibrate(): void {
  if (calibrated) return;
  cohortNormFactor = computeCohortNormFactor();
  for (const name of Object.keys(COUNTRIES)) {
    const cd = getCountry(name);
    const adjCum = v16AdjustedCumulativeExposure(name, 2024);
    const bioCap = v16BiologicalCapacity(adjCum, name, 2024);
    const behav = emfBehavioralFactorV3(adjCum);
    const observed = cd.actualTfr2024;
    const ivf = ivfShareProjected(name, 2024);
    const target = biologicalTfr(observed, ivf);
    const bb = bioCap * behav;
    const cult = bb > 0.001 ? target / bb : 0.80;
    trueCulturalRates[name] = Math.round(cult * 100) / 100;
    bioBehav2024[name] = bb;
  }
  calibrated = true;
}

function v16TrueCulturalRate(country: string, year: number): number {
  calibrate();
  const rate2024 = trueCulturalRates[country] ?? 0.80;
  const cultRatio = culturalTfr(country, year) / culturalTfr(country, 2024);
  const bb24 = bioBehav2024[country] ?? 1.0;
  const adjCumY = v16AdjustedCumulativeExposure(country, year);
  const bbY = v16BiologicalCapacity(adjCumY, country, year) * emfBehavioralFactorV3(adjCumY);
  const compensation = Math.pow(bb24 / Math.max(bbY, 0.001), ALPHA_EFF);
  return clamp(rate2024 * cultRatio * compensation, 0.05, 2.50);
}

export interface TfrResult {
  country: string;
  year: number;
  tfrPredicted: number;
  biologicalTfr: number;
  observedTfr: number;
  bioCapacity: number;
  behavioral: number;
  cultural: number;
  ivfShare: number;
  ivfContribution: number;
  adjCumulativeExposure: number;
  ambient: number;
  personal: number;
}

export function predictTfr(params: {
  country: string;
  year: number;
}): TfrResult {
  const { country, year } = params;
  calibrate();

  const adjCum = v16AdjustedCumulativeExposure(country, year);
  const bioCap = v16BiologicalCapacity(adjCum, country, year);
  const behav = emfBehavioralFactorV3(adjCum);
  const cult = v16TrueCulturalRate(country, year);
  const bioPredicted = bioCap * behav * cult;
  const ivf = ivfShareProjected(country, year);
  const obsPredicted = observedFromBiological(bioPredicted, ivf);
  const ivfContribution = obsPredicted - bioPredicted;
  const amb = v16AmbientAnnual(country, year);
  const pers = v16PersonalAnnual(country, year);

  return {
    country,
    year,
    tfrPredicted: obsPredicted,
    biologicalTfr: bioPredicted,
    observedTfr: obsPredicted,
    bioCapacity: bioCap,
    behavioral: behav,
    cultural: cult,
    ivfShare: ivf,
    ivfContribution,
    adjCumulativeExposure: adjCum,
    ambient: amb,
    personal: pers,
  };
}
