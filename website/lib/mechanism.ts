/**
 * Ion parametric resonance (IPR) mechanism candidate — receptor layer only.
 *
 * Four-layer architecture (synthesis §18). Only Layer 2 lives here:
 *
 *   Layer 1  geometric operator      Lindgren metric → δg_μν → Q^μν
 *   Layer 2  receptor module         bound ion → phase modulation → Bessel → amplitude   [THIS FILE]
 *   Layer 3  tissue transfer         local response → biological endpoint                [NOT ESTIMATED]
 *   Layer 4  population aggregation  ASFR → TFR                                           [NOT ESTIMATED]
 *
 * The module returns a local receptor response candidate and its provenance.
 * It has no TFR, ASFR or population output by design: the Layer 3–4 transfer
 * coefficients have not been estimated, so there is nothing to multiply through.
 *
 * Epistemic tags used in comments:
 *   [L1]           algebraic consequence of the declared ansatz
 *   [L1 + cond.]   conditional derivation, holds if the listed conditions hold
 *   [KANDIDAATTI]  additional assumption of the candidate, not derived from Lindgren
 *   [HAVAINTO]     measured value under stated experimental conditions
 *   [NUMEERINEN]   numerical compatibility between two numbers, not a measurement
 *   [AVOIN]        open question
 *
 * Calculation order is fixed: u → λ → s → z → J_n → readout.
 * Mirrors berm/berm/physics/ipr_mechanism.py; the vitest suite pins both to the
 * same synthesis §15 numbers.
 */

// === Physical constants [HAVAINTO, CODATA 2018] ===
export const ELEMENTARY_CHARGE = 1.602176634e-19; // C
export const ATOMIC_MASS_UNIT = 1.66053906660e-27; // kg

// First maximum and first null of J₁ [L1: Bessel zeros]
export const J1_FIRST_MAXIMUM = 1.84118378;
export const J1_FIRST_NULL = 3.83170597;

export interface Ion {
  symbol: string;
  chargeNumber: number;
  massAmu: number; // isotope-averaged [HAVAINTO]
}

/** Isotope exchange changes massAmu only — the variable of the isotope test. */
export const ION_TABLE: Record<string, Ion> = {
  "H+": { symbol: "H+", chargeNumber: 1, massAmu: 1.00794 },
  "Li+": { symbol: "Li+", chargeNumber: 1, massAmu: 6.941 },
  "Na+": { symbol: "Na+", chargeNumber: 1, massAmu: 22.98977 },
  "Mg2+": { symbol: "Mg2+", chargeNumber: 2, massAmu: 24.305 },
  "K+": { symbol: "K+", chargeNumber: 1, massAmu: 39.0983 },
  "Ca2+": { symbol: "Ca2+", chargeNumber: 2, massAmu: 40.078 },
  "Mn2+": { symbol: "Mn2+", chargeNumber: 2, massAmu: 54.938044 },
  "Zn2+": { symbol: "Zn2+", chargeNumber: 2, massAmu: 65.38 },
};

/**
 * Readout functions [AVOIN]. The readout is not determined by the mechanism and
 * must be fixed separately for each endpoint. It has to be able to predict
 * null, positive and negative responses.
 */
export type ReadoutFunction = "amplitude" | "rate" | "interference";

export type DampingModel = "none" | "lorentz" | "gauss";

export interface MechanismInputs {
  /** |q|/m in C/kg [HAVAINTO: ion table] */
  q_m: number;
  /** static field, T [HAVAINTO: site or experiment] */
  B0: number;
  /** peak alternating amplitude, T [HAVAINTO] */
  b: number;
  /** drive frequency, Hz [HAVAINTO] */
  f: number;
  /** field direction, unit vector [site geometry]; carried, not yet used by the scalar route */
  direction?: [number, number, number];
  /** dynamic-coupling ratio c/γ [KANDIDAATTI, default 1.0] */
  c_gamma?: number;
  /** relaxation time, s [HAVAINTO or fit] */
  tau: number;
  /** damping model applied to the sideband amplitude [fit choice] */
  damping?: DampingModel;
  /** damping width in units of z; ignored when damping is "none" */
  dampingWidth?: number;
  /** readout [AVOIN] */
  readout?: ReadoutFunction;
  /** reference amplitude for the interference readout [AVOIN] */
  a_ref?: number;
  /** sideband weight for the interference readout [AVOIN] */
  a_1?: number;
}

export interface UncertaintyBand {
  low: number;
  high: number;
  /** which inputs were perturbed and by how much (relative) */
  perturbed: Record<string, number>;
}

export interface MechanismResponse {
  f_c: number; // Hz            [L1: |q|B₀/(2πm), isotropic binding]
  n: number; //                 [L1]
  u: number; //                 [L1: 2πfτ]
  lambda: number; //            [KANDIDAATTI: c/γ assumed]
  s: number; //                 argument scale λ·f_c/f
  z: number; //                 [L1 + cond.]
  J_n_z: number; //             [L1 + cond.]
  response: number; //          [AVOIN readout]
  b_max: number; // T           first J₁ maximum
  b_null: number; // T          first J₁ null
  uncertainty: UncertaintyBand;
  epistemic: readonly string[];
}

// === Bessel J_n by the integral representation [L1] ===
// J_n(z) = (1/π) ∫₀^π cos(nθ − z sinθ) dθ, composite Simpson, 2000 panels.
// Accurate to ~1e-10 for |z| < 50, which covers every amplitude in scope.
export function besselJ(n: number, z: number): number {
  const N = 2000;
  const h = Math.PI / N;
  let sum = 0;
  for (let k = 0; k <= N; k++) {
    const theta = k * h;
    const w = k === 0 || k === N ? 1 : k % 2 === 1 ? 4 : 2;
    sum += w * Math.cos(n * theta - z * Math.sin(theta));
  }
  return (sum * h) / (3 * Math.PI);
}

// === Layer-2 formulas ===

/** |q|/m from the ion table [HAVAINTO]. */
export function chargeToMass(ion: Ion): number {
  return (Math.abs(ion.chargeNumber) * ELEMENTARY_CHARGE) / (ion.massAmu * ATOMIC_MASS_UNIT);
}

/** f_c = |q|·B₀/(2π·m) [L1; conditional on isotropic harmonic binding]. */
export function cyclotronFrequency(q_m: number, B0: number): number {
  if (B0 <= 0) throw new RangeError("B0 must be positive");
  return (Math.abs(q_m) * B0) / (2 * Math.PI);
}

/** n = round(f_c / f) [L1]. */
export function resonanceIndex(f_c: number, f: number): number {
  if (f <= 0) throw new RangeError("f must be positive");
  return Math.round(f_c / f);
}

/**
 * λ(f, τ) [KANDIDAATTI].
 * |G|² = (1 + (1 + r_c)²u²)/(1 + u²), u = 2πfτ. With r_c = c/γ = 1 this is
 * √((1 + 4u²)/(1 + u²)), running from 1 (u → 0) to 2 (u → ∞).
 * c/γ = 1 is the candidate's own choice so the high-frequency limit equals the
 * IPR argument coefficient 2. It is not a constant fixed by Lindgren's ansatz.
 */
export function relaxationSensitivity(f: number, tau: number, c_gamma = 1.0): number {
  if (tau < 0) throw new RangeError("tau must be non-negative");
  const u = 2 * Math.PI * f * tau;
  const g2 = (1 + (1 + c_gamma) ** 2 * u * u) / (1 + u * u);
  return Math.sqrt(g2);
}

/** s = λ·f_c/f — the coefficient multiplying b/B₀ in z. */
export function argumentScale(lambda: number, f_c: number, f: number): number {
  return (lambda * f_c) / f;
}

/**
 * z = λ·(f_c/f)·(b/B₀) [L1 + cond.: states exist, mix, phase memory suffices,
 * a readout exists].
 */
export function besselArgument(lambda: number, f_c: number, f: number, b: number, B0: number): number {
  return (argumentScale(lambda, f_c, f) * b) / B0;
}

/** b at the first J₁ maximum: 1.84118378·B₀/(λ·f_c/f). */
export function firstJ1MaximumAmplitude(lambda: number, f_c: number, f: number, B0: number): number {
  return (J1_FIRST_MAXIMUM * B0) / argumentScale(lambda, f_c, f);
}

/** b at the first J₁ null: 3.83170597·B₀/(λ·f_c/f). */
export function firstJ1NullAmplitude(lambda: number, f_c: number, f: number, B0: number): number {
  return (J1_FIRST_NULL * B0) / argumentScale(lambda, f_c, f);
}

/**
 * τ that makes λ·f_c/f equal `targetS` exactly [NUMEERINEN].
 * A reverse calculation from a demanded coefficient: not an independent
 * measurement and not a blind prediction. u² = (L² − 1)/((1 + r_c)² − L²).
 */
export function inverseTauForArgumentScale(f: number, f_c: number, targetS = 2.0, c_gamma = 1.0): number {
  const L = (targetS * f) / f_c;
  const top = L * L - 1;
  const bottom = (1 + c_gamma) ** 2 - L * L;
  if (top < 0 || bottom <= 0) {
    throw new RangeError(`lambda = ${L.toFixed(4)} is outside the reachable range [1, ${1 + c_gamma}]`);
  }
  return Math.sqrt(top / bottom) / (2 * Math.PI * f);
}

function dampingFactor(z: number, model: DampingModel, width: number): number {
  if (model === "none") return 1;
  if (model === "lorentz") return 1 / (1 + (z / width) ** 2);
  return Math.exp(-((z / width) ** 2));
}

/** Apply the chosen readout to J_n(z) [AVOIN: the readout is not derived]. */
export function readoutValue(
  readout: ReadoutFunction,
  n: number,
  z: number,
  a_ref = 1.0,
  a_1 = 1.0,
  damping: DampingModel = "none",
  dampingWidth = 1.0,
): number {
  const j = besselJ(n, z) * dampingFactor(z, damping, dampingWidth);
  if (readout === "amplitude") return j;
  if (readout === "rate") return j * j;
  return (a_ref + a_1 * j) ** 2;
}

function core(inputs: MechanismInputs) {
  const c_gamma = inputs.c_gamma ?? 1.0;
  const f_c = cyclotronFrequency(inputs.q_m, inputs.B0);
  const n = resonanceIndex(f_c, inputs.f);
  const u = 2 * Math.PI * inputs.f * inputs.tau;
  const lambda = relaxationSensitivity(inputs.f, inputs.tau, c_gamma);
  const s = argumentScale(lambda, f_c, inputs.f);
  const z = (s * inputs.b) / inputs.B0;
  const J_n_z = besselJ(n, z);
  const response = readoutValue(
    inputs.readout ?? "amplitude",
    n,
    z,
    inputs.a_ref,
    inputs.a_1,
    inputs.damping ?? "none",
    inputs.dampingWidth ?? 1.0,
  );
  return { f_c, n, u, lambda, s, z, J_n_z, response };
}

/**
 * Run the receptor layer in the fixed order u → λ → s → z → J → readout.
 * The uncertainty band perturbs τ, b and B₀ by ±10 % (relative), one at a
 * time, and reports the min/max of the readout. It is a parameter-sensitivity
 * envelope, not a confidence interval.
 */
export function mechanismResponse(inputs: MechanismInputs): MechanismResponse {
  const base = core(inputs);
  const perturbed: Record<string, number> = { tau: 0.1, b: 0.1, B0: 0.1 };
  let low = base.response;
  let high = base.response;
  for (const key of Object.keys(perturbed) as ("tau" | "b" | "B0")[]) {
    for (const sign of [-1, 1]) {
      const v = core({ ...inputs, [key]: inputs[key] * (1 + sign * perturbed[key]) }).response;
      low = Math.min(low, v);
      high = Math.max(high, v);
    }
  }
  return {
    ...base,
    b_max: (J1_FIRST_MAXIMUM * inputs.B0) / base.s,
    b_null: (J1_FIRST_NULL * inputs.B0) / base.s,
    uncertainty: { low, high, perturbed },
    epistemic: [
      "f_c: L1 (isotropic harmonic binding)",
      "n: L1",
      "lambda: KANDIDAATTI (c/gamma assumed)",
      "z, J_n: L1 + conditional (states exist, mix, phase memory, readout)",
      "readout: AVOIN (not derived; must predict null, positive and negative)",
      "population transfer: NOT COMPUTED (Layer 3-4 coefficients unestimated)",
    ],
  };
}

// === Worked example: Bauréus Koch et al. 2003, 24 Hz drive at 37 µT (synthesis §15) ===

export const KOCH_2003_EXAMPLE = {
  f: 24, // Hz                                              [HAVAINTO: Koch 2003 condition]
  f_c: 25.2, // Hz  synthesis §15 "Ca²⁺ interpretation"      [KANDIDAATTI input, see note]
  tau: 0.02, // s   Park et al. 2008, calmodulin N-terminal   [HAVAINTO: chemical Ca²⁺ step, not a field response]
  B0: 37e-6, // T                                            [HAVAINTO: Koch 2003, upper end of 27–37 µT]
  c_gamma: 1.0, //                                           [KANDIDAATTI]
  referenceIds: ["baureuskoch2003_vesicle_ipr", "park2008_calmodulin_kinetics"],
  /** Bare Ca²⁺ at 37 µT gives f_c = 28.35 Hz; 25.2 Hz corresponds to B₀ ≈ 32.9 µT for bare Ca²⁺. */
  note: "f_c = 25.2 Hz is taken from the synthesis; it is not the bare-ion cyclotron value at 37 µT.",
} as const;

export interface KochWorkedExample {
  u: number;
  lambda: number;
  s: number;
  coefficientMismatchVs2: number;
  b_max: number;
  b_null: number;
  tauForSEqual2: number;
  bareCa2CyclotronAtB0: number;
  B0ForBareCa2At25p2Hz: number;
  status: string;
}

/** Reproduces synthesis §15 and labels every number. The ~1 % is a coefficient comparison, not a data fit. */
export function kochWorkedExample(): KochWorkedExample {
  const e = KOCH_2003_EXAMPLE;
  const u = 2 * Math.PI * e.f * e.tau;
  const lambda = relaxationSensitivity(e.f, e.tau, e.c_gamma);
  const s = argumentScale(lambda, e.f_c, e.f);
  const qm = chargeToMass(ION_TABLE["Ca2+"]);
  return {
    u,
    lambda,
    s,
    coefficientMismatchVs2: Math.abs(s - 2) / 2,
    b_max: (J1_FIRST_MAXIMUM * e.B0) / s,
    b_null: (J1_FIRST_NULL * e.B0) / s,
    tauForSEqual2: inverseTauForArgumentScale(e.f, e.f_c, 2, e.c_gamma),
    bareCa2CyclotronAtB0: cyclotronFrequency(qm, e.B0),
    B0ForBareCa2At25p2Hz: (25.2 * 2 * Math.PI) / qm,
    status: "NUMEERINEN YHTEENSOPIVUUS: argument-coefficient comparison, not a raw-data fit and not a blind prediction",
  };
}

// === Null result: Gavoçi et al. 2013 ===

export interface ValidationRecord {
  referenceId: string;
  ion: string;
  system: string;
  endpoint: string;
  observed: string;
  status: string;
  constraint: string;
}

export const GAVOCI_2013_NULL: ValidationRecord = {
  referenceId: "gavoci2013_ipr_k_null",
  ion: "K+",
  system: "human neuroblastoma BE(2)C, whole-cell patch clamp",
  endpoint: "TEA-sensitive voltage-dependent outward K+ current density",
  observed: "no significant change before, during or after exposure at K+ IPR conditions",
  status: "HAVAINTO: null result",
  constraint:
    "A tissue-specific coupling invoked to absorb this null needs its own independent measurement. A free coefficient set to zero separately for each exception removes the model's predictive content.",
};

/**
 * What the receptor layer says at the K⁺ IPR condition Gavoçi tested. With
 * τ = 0 the candidate reduces to the fixed IPR argument (λ = 1). Whatever the
 * readout, the module predicts a non-null J₁ response at b/B₀ ≈ 1.8; the
 * observation was null. The null stays in the validation set as a constraint.
 */
export function gavociNullCheck(bOverB0 = 1.8, tau = 0): { f_c: number; z: number; J1: number; predictedNonNull: boolean } {
  const B0 = 45e-6; // representative geomagnetic-scale field [assumption for the check]
  const f_c = cyclotronFrequency(chargeToMass(ION_TABLE["K+"]), B0);
  const lambda = relaxationSensitivity(f_c, tau);
  const z = lambda * 1.0 * bOverB0; // n = 1 tuned: f_c/f = 1
  const J1 = besselJ(1, z);
  return { f_c, z, J1, predictedNonNull: Math.abs(J1) > 0.05 };
}
