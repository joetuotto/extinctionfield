/** Effective compensation exponent (weighted sum of 5 recovery layers).
 *  VGIC(α=1.0, w=0.10), ROS(0.8, 0.30), DNA(0.1, 0.25),
 *  Leydig(0.3, 0.20), neuro(0.0, 0.15). Raw = 0.425, rounded 0.43.
 *  Source: berm/config.py, v17 calibration. */
export const ALPHA_EFF = 0.43;

/** Pre-EMF baseline sperm concentration (M/mL).
 *  Source: Levine et al. 2017, 1973 reference level. */
export const BASELINE_CONC = 73.6;
/** Pre-EMF baseline progressive motility (fraction).
 *  Source: WHO 5th ed lower ref 0.40 + historical offset. */
export const BASELINE_MOT = 0.58;

/** ROS generation rate per EMF unit. Source: BERM pathway A calibration (v16.py). */
export const GAMMA_ROS = 0.012;
/** SDF decay rate per year. Source: BERM cascade model. */
export const ALPHA_SDF = 0.20;
/** SDF generation rate from ROS. Source: BERM cascade model. */
export const GAMMA_SDF = 0.08;
/** Motility sensitivity to ROS.
 *  Source: umbrella review 2025 (9 reviews, 215 studies), MD: −3.90. */
export const BETA_MOT = 0.15;
/** Motility sensitivity to SDF. Source: BERM cascade model. */
export const GAMMA_MOT = 0.10;
/** Concentration decay rate per cumulative EMF unit.
 *  Source: Levine 2023 meta, −51% (1973–2018) calibration. */
export const GAMMA_CONC = 0.008;

/** CRY radical-pair pathway effect coefficient.
 *  Source: v16.py line ~412, radical-pair mechanism. */
export const GAMMA_CRY = 0.02;
/** Melatonin suppression coefficient (night EMF → pineaali).
 *  Source: v16.py line ~413. */
export const GAMMA_MELATONIN = 0.015;
/** Ovulatory VGIC disruption coefficient.
 *  Source: v16.py line ~414, female bioelectric pathway. */
export const GAMMA_OVUL_VGIC = 0.008;
/** Sperm motility Ca²⁺ disruption coefficient.
 *  Source: v16.py line ~415, sperm Ca²⁺ navigation. */
export const GAMMA_MOTILITY = 0.015;
/** Sperm capacitation disruption coefficient.
 *  Source: v16.py line ~416. */
export const GAMMA_CAPACITATION = 0.005;
/** Sperm navigation (chemotaxis) disruption coefficient.
 *  Source: v16.py line ~417. */
export const GAMMA_NAVIGATION = 0.003;

/** Behavioral factor gamma (scalar, v17 simplified).
 *  Python v16 uses 5D: OT(0.12), T(0.10), DA(0.08),
 *  cortisol(0.05), AVP(0.06). This is a legacy approximation. */
export const BEHAV_GAMMA = 0.08;

/** Phone body contact hours/day in 2024.
 *  NOTE: Python v16 uses piecewise (2000→2.0, 2010→6.0, 2020→12.0, 2024→14.0).
 *  This 4.5 value is a v17 legacy scalar — v16 sync will replace it. */
export const CONTACT_HOURS_2024 = 4.5;
/** Contact hours annual increase (hours/year). Source: BERM estimate. */
export const CONTACT_HOURS_SLOPE = 0.15;

/** SAR weight for personal device proximity. Source: BERM personal model. */
export const PERSONAL_SAR_WEIGHT = 1.5;
/** Triboelectric / body-environment fraction. Source: BERM static-interface model. */
export const TBE_FRACTION = 0.30;

/** Year when pre-telecom ambient sources begin (military radar, broadcast).
 *  Source: BERM ambient model timeline. */
export const PRE_TELECOM_START = 1950;
