import { ALPHA_EFF, BASELINE_CONC, BASELINE_MOT, BEHAV_GAMMA } from "./config";
import { effectiveEmfField } from "./ambient";
import { personalEmfExposure } from "./personal";
import { twoChannelExposure } from "./lindgren";
import { computeSpermState, type SpermState } from "./spermCascade";
import { cryEffect } from "./cry";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

function behavioralFactor(totalExposure: number): number {
  return clamp(1 - BEHAV_GAMMA * totalExposure, 0.5, 1.0);
}

function nightFraction(year: number): number {
  return clamp(0.35 + 0.01 * (year - 2015), 0, 1);
}

function cumulativeEmf(totalExposure: number, year: number): number {
  const exposureYears = Math.max(0, year - 2000);
  return totalExposure * exposureYears * 0.5;
}

export interface TfrResult {
  country: string;
  year: number;
  tfrPredicted: number;
  bioCapacity: number;
  emfBehavioral: number;
  cultural: number;
  exposureTotal: number;
  spermState: SpermState;
  ambient: number;
  personal: number;
  cry: number;
}

export function predictTfr(params: {
  country: string;
  year: number;
  mobilePenetration: number;
  popDensity: number;
  baseTfr: number;
  culturalRatio?: number;
  calibrationYear?: number;
}): TfrResult {
  const {
    country,
    year,
    mobilePenetration,
    popDensity,
    baseTfr,
    culturalRatio = 1.0,
    calibrationYear = 2024,
  } = params;

  const ambient = effectiveEmfField(mobilePenetration, popDensity);
  const personal = personalEmfExposure(mobilePenetration, year);
  const totalExposure = twoChannelExposure(ambient, personal);

  const cumEmf = cumulativeEmf(totalExposure, year);
  const spermState = computeSpermState(totalExposure, cumEmf);

  const nf = nightFraction(year);
  const cry = cryEffect(ambient, personal, nf);

  const bioCapacity =
    (spermState.concentration / BASELINE_CONC) *
    (spermState.motilityIndex / BASELINE_MOT) *
    cry;

  const behav = behavioralFactor(totalExposure);

  // Calibration-year reference
  const ambientCal = effectiveEmfField(mobilePenetration, popDensity);
  const personalCal = personalEmfExposure(mobilePenetration, calibrationYear);
  const totalCal = twoChannelExposure(ambientCal, personalCal);
  const cumCal = cumulativeEmf(totalCal, calibrationYear);
  const spermCal = computeSpermState(totalCal, cumCal);
  const nfCal = nightFraction(calibrationYear);
  const cryCal = cryEffect(ambientCal, personalCal, nfCal);
  const bioCapCal =
    (spermCal.concentration / BASELINE_CONC) *
    (spermCal.motilityIndex / BASELINE_MOT) *
    cryCal;
  const behavCal = behavioralFactor(totalCal);
  const biobehavCal = bioCapCal * behavCal;

  const biobehav = bioCapacity * behav;
  const alpha = ALPHA_EFF;

  let tfrPredicted: number;
  if (biobehavCal > 0 && biobehav > 0) {
    tfrPredicted =
      Math.pow(biobehav, 1 - alpha) *
      baseTfr *
      culturalRatio *
      Math.pow(biobehavCal, alpha);
  } else {
    tfrPredicted = baseTfr * culturalRatio * biobehav;
  }

  return {
    country,
    year,
    tfrPredicted,
    bioCapacity,
    emfBehavioral: behav,
    cultural: culturalRatio,
    exposureTotal: totalExposure,
    spermState,
    ambient,
    personal,
    cry,
  };
}
