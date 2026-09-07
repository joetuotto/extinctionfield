import { describe, expect, it } from "vitest";

import { CORRECTION_REGISTRY, WORDING_REGISTER } from "@/data/correction_registry";
import {
  FIELD_STRUCTURE_RESULTS,
  FINDING_STATUS_LABELS,
  FINDING_STATUS_MEANING,
  SIGNAL_CALCULATION_RESULTS,
  WINDOW_DEFINITION,
  WINDOW_SCORES,
  type SignalResult,
} from "@/data/signal_structure";

const ALL: SignalResult[] = [...FIELD_STRUCTURE_RESULTS, ...SIGNAL_CALCULATION_RESULTS];

describe("signal-structure results", () => {
  it("states a bound for every result, not only a result", () => {
    for (const r of ALL) {
      expect(r.result.en.length).toBeGreaterThan(40);
      expect(r.result.fi.length).toBeGreaterThan(40);
      expect(r.bound.en.length).toBeGreaterThan(40);
      expect(r.bound.fi.length).toBeGreaterThan(40);
    }
  });

  it("carries a status and finding numbers on every entry", () => {
    for (const r of ALL) {
      expect(Object.keys(FINDING_STATUS_LABELS)).toContain(r.status);
      expect(r.findings).toMatch(/\d/);
      expect(r.quantitative.trim().length).toBeGreaterThan(10);
    }
  });

  it("has unique ids", () => {
    const ids = ALL.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every status a meaning in both locales", () => {
    for (const key of Object.keys(FINDING_STATUS_LABELS) as (keyof typeof FINDING_STATUS_LABELS)[]) {
      expect(FINDING_STATUS_MEANING[key].en.length).toBeGreaterThan(30);
      expect(FINDING_STATUS_MEANING[key].fi.length).toBeGreaterThan(30);
    }
  });

  it("keeps the calculated results labelled as calculated, not as measurements", () => {
    const calculated = ["cross_terms", "time_averaging", "superposition", "direction_dependence", "f_vs_chi", "gsm_25hz", "phase_identifiability", "nr_periodicity"];
    for (const id of calculated) {
      expect(ALL.find((r) => r.id === id)?.status).toBe("calculated");
    }
    // the background sweep has not been run, so it must stay a hypothesis
    expect(ALL.find((r) => r.id === "background_sweep")?.status).toBe("test_hypothesis");
  });

  it("records the exact published numbers", () => {
    const gsm = ALL.find((r) => r.id === "gsm_25hz")!;
    expect(gsm.quantitative).toContain("0.0799726");
    expect(gsm.quantitative).toContain("216.667");
    const am = ALL.find((r) => r.id === "field_vs_power_am")!;
    expect(am.quantitative).toContain("0.0400183");
    expect(am.quantitative).toContain("36.23%");
    const phase = ALL.find((r) => r.id === "phase_identifiability")!;
    expect(phase.quantitative).toContain("0.909936");
    const nr = ALL.find((r) => r.id === "nr_periodicity")!;
    expect(nr.quantitative).toContain("−535.94");
  });

  it("does not claim the eight percent figure is a health threshold", () => {
    const gsm = ALL.find((r) => r.id === "gsm_25hz")!;
    expect(gsm.bound.en).toMatch(/not a health threshold/i);
    expect(gsm.bound.en).toMatch(/mean power, not of total energy/i);
  });

  it("keeps the F versus chi distinction as two different cases", () => {
    const f = ALL.find((r) => r.id === "f_vs_chi")!;
    expect(f.result.en).toMatch(/mathematically different/i);
    expect(f.bound.en).toMatch(/does not follow/i);
  });

  it("states the identifiability limit without softening it", () => {
    const p = ALL.find((r) => r.id === "phase_identifiability")!;
    expect(p.result.en).toMatch(/do not by themselves determine/i);
    expect(p.result.en).toMatch(/not a caution/i);
  });
});

describe("window score definition", () => {
  it("is reproducible: weight, normalisation and score are all stated", () => {
    expect(WINDOW_DEFINITION.weight).toContain("25.4");
    expect(WINDOW_DEFINITION.normalisation).toContain("DC component removed");
    expect(WINDOW_DEFINITION.score).toContain("W(f_k)");
  });

  it("discloses that the protocol was not independently pre-registered", () => {
    expect(WINDOW_DEFINITION.note.en).toMatch(/not an independent pre-registration/i);
    expect(WINDOW_DEFINITION.note.fi).toMatch(/ei ollut riippumattomasta ennakkorekisteröinnistä/i);
  });

  it("shows the two identical-spectrum scores that differ by 59 orders of magnitude", () => {
    const scores = WINDOW_SCORES.map((w) => w.score);
    expect(scores).toContain("0.909936");
    expect(scores).toContain("2.39 × 10⁻⁵⁹");
  });
});

describe("wording register", () => {
  it("lists all eighteen reformulations in both locales", () => {
    expect(WORDING_REGISTER).toHaveLength(18);
    for (const w of WORDING_REGISTER) {
      expect(w.superseded.en.length).toBeGreaterThan(10);
      expect(w.superseded.fi.length).toBeGreaterThan(10);
      expect(w.justified.en.length).toBeGreaterThan(20);
      expect(w.justified.fi.length).toBeGreaterThan(20);
      expect(w.findings).toMatch(/\d/);
    }
  });

  it("has unique ids and does not collide with the correction registry", () => {
    const ids = WORDING_REGISTER.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
    const correctionIds = new Set(CORRECTION_REGISTRY.map((c) => c.id));
    for (const id of ids) expect(correctionIds.has(id)).toBe(false);
  });

  it("keeps the justified wording narrower than the superseded one where it should be", () => {
    const spectrum = WORDING_REGISTER.find((w) => w.id === "spectrum_recovery")!;
    expect(spectrum.justified.en).toMatch(/does not by itself identify/i);
    const zero = WORDING_REGISTER.find((w) => w.id === "umts_predicted")!;
    expect(zero.justified.en).toMatch(/number zero/i);
  });
});
