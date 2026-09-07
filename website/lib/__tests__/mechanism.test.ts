import { describe, expect, it } from "vitest";

import {
  GAVOCI_2013_NULL,
  ION_TABLE,
  J1_FIRST_MAXIMUM,
  J1_FIRST_NULL,
  KOCH_2003_EXAMPLE,
  argumentScale,
  besselJ,
  chargeToMass,
  cyclotronFrequency,
  firstJ1MaximumAmplitude,
  firstJ1NullAmplitude,
  gavociNullCheck,
  inverseTauForArgumentScale,
  kochWorkedExample,
  mechanismResponse,
  readoutValue,
  relaxationSensitivity,
  resonanceIndex,
} from "@/lib/mechanism";
import { CORRECTION_REGISTRY } from "@/data/correction_registry";
import { DISCRIMINATING_TESTS, NULL_RESULTS_IN_SCOPE } from "@/data/discriminating_tests";

describe("Bessel J_n by integral representation", () => {
  it("matches known values", () => {
    expect(besselJ(0, 0)).toBeCloseTo(1, 9);
    expect(besselJ(1, 0)).toBeCloseTo(0, 9);
    expect(besselJ(1, J1_FIRST_MAXIMUM)).toBeCloseTo(0.5818652, 6);
    expect(Math.abs(besselJ(1, J1_FIRST_NULL))).toBeLessThan(1e-7);
    expect(besselJ(1, 2.02049)).toBeCloseTo(0.5753199, 6);
  });
});

describe("reference frequency and index", () => {
  it("gives 28.35 Hz for bare Ca2+ at 37 uT", () => {
    expect(cyclotronFrequency(chargeToMass(ION_TABLE["Ca2+"]), 37e-6)).toBeCloseTo(28.35, 1);
  });

  it("keeps the synthesis f_c distinct from the bare-ion value", () => {
    const e = kochWorkedExample();
    expect(KOCH_2003_EXAMPLE.f_c).toBe(25.2);
    expect(e.bareCa2CyclotronAtB0).toBeCloseTo(28.35, 1);
    expect(e.B0ForBareCa2At25p2Hz).toBeCloseTo(32.9e-6, 7);
    expect(KOCH_2003_EXAMPLE.note).toMatch(/not the bare-ion cyclotron value/i);
  });

  it("shifts the reference frequency by mass only under isotope exchange", () => {
    const ca40 = { symbol: "40Ca2+", chargeNumber: 2, massAmu: 39.9626 };
    const ca44 = { symbol: "44Ca2+", chargeNumber: 2, massAmu: 43.9555 };
    const ratio =
      cyclotronFrequency(chargeToMass(ca44), 37e-6) / cyclotronFrequency(chargeToMass(ca40), 37e-6);
    expect(ratio).toBeCloseTo(39.9626 / 43.9555, 9);
  });

  it("rounds the resonance index and rejects f = 0", () => {
    expect(resonanceIndex(25.2, 24)).toBe(1);
    expect(resonanceIndex(50, 24)).toBe(2);
    expect(() => resonanceIndex(25.2, 0)).toThrow(RangeError);
  });
});

describe("relaxation sensitivity lambda", () => {
  it("runs from 1 to 1 + c/gamma", () => {
    expect(relaxationSensitivity(24, 0)).toBeCloseTo(1, 12);
    expect(relaxationSensitivity(24, 1e6)).toBeCloseTo(2, 9);
    expect(relaxationSensitivity(24, 1e6, 0.5)).toBeCloseTo(1.5, 9);
  });

  it("is monotone in tau", () => {
    const values = [0, 0.002, 0.01, 0.02, 0.1, 1].map((t) => relaxationSensitivity(24, t));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });
});

describe("synthesis §15 worked example", () => {
  it("reproduces u, lambda, s, the 1% coefficient gap and the amplitude windows", () => {
    const e = kochWorkedExample();
    expect(e.u).toBeCloseTo(3.01593, 5);
    expect(e.lambda).toBeCloseTo(1.92428, 5);
    expect(e.s).toBeCloseTo(2.02049, 5);
    expect(e.coefficientMismatchVs2).toBeCloseTo(0.01025, 5);
    expect(e.b_max).toBeCloseTo(33.7e-6, 7);
    expect(e.b_null).toBeCloseTo(70.2e-6, 7);
  });

  it("labels the reverse tau as a numerical compatibility, not a blind prediction", () => {
    const e = kochWorkedExample();
    expect(e.tauForSEqual2).toBeCloseTo(0.017629, 6);
    const lambda = relaxationSensitivity(24, e.tauForSEqual2);
    expect(argumentScale(lambda, 25.2, 24)).toBeCloseTo(2, 9);
    expect(e.status).toMatch(/NUMEERINEN/);
    expect(e.status).toMatch(/not a blind prediction/i);
  });

  it("rejects an unreachable argument scale", () => {
    expect(() => inverseTauForArgumentScale(24, 25.2, 5)).toThrow(RangeError);
  });
});

describe("Bessel amplitude windows", () => {
  it("places b_max and b_null on the J1 maximum and null", () => {
    const [lambda, f_c, f, B0] = [1.92428, 25.2, 24, 37e-6];
    const s = argumentScale(lambda, f_c, f);
    const zMax = (s * firstJ1MaximumAmplitude(lambda, f_c, f, B0)) / B0;
    const zNull = (s * firstJ1NullAmplitude(lambda, f_c, f, B0)) / B0;
    expect(besselJ(1, zMax)).toBeCloseTo(0.5818652, 6);
    expect(Math.abs(besselJ(1, zNull))).toBeLessThan(1e-7);
  });
});

describe("readout is a separate choice", () => {
  it("distinguishes amplitude, rate and interference, and admits negative and null responses", () => {
    const z = 2;
    const amp = readoutValue("amplitude", 1, z);
    expect(readoutValue("rate", 1, z)).toBeCloseTo(amp * amp, 12);
    const below = readoutValue("interference", 1, z, 1, -1);
    const above = readoutValue("interference", 1, z, 1, 1);
    expect(below).toBeLessThan(1);
    expect(above).toBeGreaterThan(1);
    expect(Math.abs(readoutValue("amplitude", 1, J1_FIRST_NULL))).toBeLessThan(1e-7);
    expect(readoutValue("interference", 1, J1_FIRST_NULL)).toBeCloseTo(1, 6);
  });
});

describe("layer boundary", () => {
  it("emits no population field and keeps the transfer gap explicit", () => {
    const r = mechanismResponse({
      q_m: chargeToMass(ION_TABLE["Ca2+"]),
      B0: 37e-6,
      b: 33.7e-6,
      f: 24,
      tau: 0.02,
    });
    for (const forbidden of ["tfr", "asfr", "fertility", "births", "population"]) {
      expect(Object.keys(r)).not.toContain(forbidden);
    }
    expect(r.epistemic.some((t) => t.includes("NOT COMPUTED"))).toBe(true);
    expect(r.epistemic.some((t) => t.includes("KANDIDAATTI"))).toBe(true);
  });

  it("follows the fixed order u -> lambda -> s -> z -> J", () => {
    const r = mechanismResponse({
      q_m: chargeToMass(ION_TABLE["Ca2+"]),
      B0: 37e-6,
      b: 20e-6,
      f: 24,
      tau: 0.02,
    });
    expect(r.u).toBeCloseTo(2 * Math.PI * 24 * 0.02, 12);
    expect(r.lambda).toBeCloseTo(relaxationSensitivity(24, 0.02), 12);
    expect(r.s).toBeCloseTo((r.lambda * r.f_c) / 24, 12);
    expect(r.z).toBeCloseTo((r.s * 20e-6) / 37e-6, 12);
    expect(r.J_n_z).toBeCloseTo(besselJ(r.n, r.z), 12);
  });

  it("reports a parameter-sensitivity envelope that brackets the point value", () => {
    const r = mechanismResponse({
      q_m: chargeToMass(ION_TABLE["Ca2+"]),
      B0: 37e-6,
      b: 20e-6,
      f: 24,
      tau: 0.02,
    });
    expect(r.uncertainty.low).toBeLessThanOrEqual(r.response);
    expect(r.uncertainty.high).toBeGreaterThanOrEqual(r.response);
    expect(Object.keys(r.uncertainty.perturbed).sort()).toEqual(["B0", "b", "tau"]);
  });
});

describe("null result stays a constraint", () => {
  it("predicts a response where Gavoci measured none", () => {
    const g = gavociNullCheck();
    expect(g.predictedNonNull).toBe(true);
    expect(GAVOCI_2013_NULL.observed).toMatch(/no significant change/i);
    expect(GAVOCI_2013_NULL.constraint).toMatch(/independent measurement/i);
    expect(NULL_RESULTS_IN_SCOPE.map((n) => n.referenceId)).toContain("gavoci2013_ipr_k_null");
  });
});

describe("correction registry", () => {
  it("assigns c = gamma to candidate_assumption and never calls it derived", () => {
    const entry = CORRECTION_REGISTRY.find((e) => e.id === "c_equals_gamma");
    expect(entry?.status).toBe("candidate_assumption");
    expect(entry?.epistemicLevel).toBe("KANDIDAATTI");
    expect(`${entry?.description.en} ${entry?.note?.en}`).not.toMatch(/derived from Lindgren/i);
    expect(entry?.note?.en).toMatch(/not a universal constant/i);
  });

  it("keeps 17.6 ms a numerical compatibility and 20 ms an observation", () => {
    const reverse = CORRECTION_REGISTRY.find((e) => e.id === "calmodulin_17_6_ms");
    const measured = CORRECTION_REGISTRY.find((e) => e.id === "calmodulin_20_ms");
    expect(reverse?.status).toBe("numerical_compatibility");
    expect(reverse?.note?.en).toMatch(/not an independent measurement/i);
    expect(measured?.status).toBe("observation");
    expect(measured?.note?.en).toMatch(/not a magnetic-field response/i);
  });

  it("keeps the population attribution open", () => {
    const tfr = CORRECTION_REGISTRY.find((e) => e.id === "tfr_attribution");
    expect(tfr?.status).toBe("open_question");
    expect(tfr?.description.en).toMatch(/no TFR figure is produced/i);
  });

  it("gives every conditional derivation its named conditions", () => {
    for (const entry of CORRECTION_REGISTRY.filter((e) => e.status === "conditional_derivation")) {
      expect(entry.conditions?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("has both locales on every claim and description", () => {
    for (const entry of CORRECTION_REGISTRY) {
      expect(entry.claim.en.length).toBeGreaterThan(0);
      expect(entry.claim.fi.length).toBeGreaterThan(0);
      expect(entry.description.en.length).toBeGreaterThan(0);
      expect(entry.description.fi.length).toBeGreaterThan(0);
    }
  });
});

describe("discriminating tests", () => {
  it("lists the six open experiments with both locales", () => {
    expect(DISCRIMINATING_TESTS).toHaveLength(6);
    for (const test of DISCRIMINATING_TESTS) {
      expect(test.epistemicLevel).toBe("AVOIN TESTI");
      expect(test.name.fi.length).toBeGreaterThan(0);
      expect(test.prediction.fi.length).toBeGreaterThan(0);
      expect(test.parameters.independent.length).toBeGreaterThan(0);
      expect(test.parameters.dependent.length).toBeGreaterThan(0);
    }
  });

  it("marks Bessel-structure tests as not Lindgren-specific", () => {
    const bessel = DISCRIMINATING_TESTS.find((t) => t.id === "freq_B0_shift");
    expect(bessel?.lindgrenSpecific).toBe(false);
    const phase = DISCRIMINATING_TESTS.find((t) => t.id === "two_freq_phase");
    expect(phase?.lindgrenSpecific).toBe(true);
  });

  it("carries the isotope caveat", () => {
    const isotope = DISCRIMINATING_TESTS.find((t) => t.id === "isotope_exchange");
    expect(isotope?.caveat?.en).toMatch(/other than mass/i);
  });
});
