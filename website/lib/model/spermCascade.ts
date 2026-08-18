import {
  GAMMA_ROS,
  ALPHA_SDF,
  GAMMA_SDF,
  BETA_MOT,
  GAMMA_MOT,
  GAMMA_CONC,
  BASELINE_CONC,
  BASELINE_MOT,
} from "./config";

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function rosIndex(emfInstant: number): number {
  return 1 - Math.exp(-GAMMA_ROS * emfInstant);
}

export function sdfIndex(rosHistory: number[]): number {
  let sdf = 0;
  for (const ros of rosHistory) {
    sdf = sdf * (1 - ALPHA_SDF) + GAMMA_SDF * ros;
  }
  return clamp(sdf, 0, 1);
}

export function motilityIndex(ros: number, sdf: number): number {
  const raw = BASELINE_MOT * (1 - BETA_MOT * ros) * (1 - GAMMA_MOT * sdf);
  return clamp(raw, 0.05, BASELINE_MOT);
}

export function concentration(cumEmf: number): number {
  return BASELINE_CONC * Math.exp(-GAMMA_CONC * cumEmf);
}

export interface SpermState {
  concentration: number;
  motilityIndex: number;
  ros: number;
  sdf: number;
}

export function computeSpermState(
  emfInstant: number,
  cumEmf: number,
): SpermState {
  const ros = rosIndex(emfInstant);
  const rosHist = Array.from(
    { length: Math.max(1, Math.round(cumEmf / Math.max(emfInstant, 0.001))) },
    () => ros,
  );
  const sdf = sdfIndex(rosHist);
  return {
    concentration: concentration(cumEmf),
    motilityIndex: motilityIndex(ros, sdf),
    ros,
    sdf,
  };
}
