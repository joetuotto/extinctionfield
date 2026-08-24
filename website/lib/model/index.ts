export { predictTfr, type TfrResult } from "./tfr";
export {
  effectiveEmfField,
  v16AmbientAnnual,
  getAttenuationFactor,
  wifiPenetration,
  totalPreTelecom,
} from "./ambient";
export {
  v16PersonalAnnual,
  smartphonePenetration,
  earpodPenetration,
  phoneBodyContactHours,
} from "./personal";
export { chi, twoChannelExposure } from "./lindgren";
export {
  computeSpermState,
  rosIndex,
  concentration,
  type SpermState,
} from "./spermCascade";
export { cryEffect } from "./cry";
export {
  ALPHA_EFF,
  BASELINE_CONC,
  BASELINE_MOT,
  BEHAV_GAMMA,
  GAMMA_CRY,
  GAMMA_MELATONIN,
  GAMMA_OVUL_VGIC,
} from "./config";
export {
  getCountry,
  COUNTRIES,
  COUNTRY_NAMES,
  type CountryData,
} from "./countries";
