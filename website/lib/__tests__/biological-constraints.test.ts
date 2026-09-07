import { describe, expect, it } from "vitest";

import {
  CELL_MEMORY_FINDINGS,
  EXPOSURE_CLASSES,
  EXPOSURE_CLASS_NOTE,
  REPRODUCTIVE_FINDINGS,
  type BiologicalFinding,
} from "@/data/biological_constraints";
import { FINDING_STATUS_LABELS } from "@/data/signal_structure";
import {
  CHRONIC_MECHANISMS,
  CHRONIC_MECHANISM_NOTE,
  CONVERGENCE_ASSESSMENT,
  DECISION_RULE,
  INTERACTION_CONTRAST,
  MECHANISM_ROLES,
  MECHANISM_ROLE_NOTE,
  RAW_TRACE_REQUIREMENT,
  RECOVERABLE_DATA,
  THREE_VARIABLE_MODEL,
} from "@/data/research_program";
import referenceIndex from "@/lib/referenceIndex.json";

const ALL: BiologicalFinding[] = [...CELL_MEMORY_FINDINGS, ...REPRODUCTIVE_FINDINGS];

function knownId(id: string): boolean {
  const idx = referenceIndex as { references: Record<string, unknown>; aliases: Record<string, string> };
  return id in idx.references || id in idx.aliases;
}

describe("biological findings 35-46", () => {
  it("covers all twelve findings with unique ids", () => {
    expect(CELL_MEMORY_FINDINGS).toHaveLength(9);
    expect(REPRODUCTIVE_FINDINGS).toHaveLength(3);
    const ids = ALL.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("names an exposure class and a transfer limit on every entry", () => {
    for (const f of ALL) {
      expect(f.exposure.en.length).toBeGreaterThan(20);
      expect(f.exposure.fi.length).toBeGreaterThan(20);
      expect(f.limit.en.length).toBeGreaterThan(40);
      expect(f.limit.fi.length).toBeGreaterThan(40);
      expect(f.locates.en.length).toBeGreaterThan(40);
      expect(Object.keys(FINDING_STATUS_LABELS)).toContain(f.status);
    }
  });

  it("labels these as experimentally bounded, not calculated", () => {
    for (const f of ALL) expect(f.status).toBe("experimentally_bounded");
  });

  it("cites only reference ids that exist", () => {
    for (const f of ALL) for (const id of f.referenceIds ?? []) expect(knownId(id)).toBe(true);
    for (const r of EXPOSURE_CLASSES) for (const id of r.referenceIds ?? []) expect(knownId(id)).toBe(true);
  });

  it("keeps the sensor question open where the source does", () => {
    const atg = ALL.find((f) => f.id === "autophagy_dependence")!;
    expect(atg.limit.en).toMatch(/does not identify the first EMF receptor/i);
    const parp = ALL.find((f) => f.id === "parp_dependence")!;
    expect(parp.limit.en).toMatch(/does not show that EMF acts directly/i);
    const hsp = ALL.find((f) => f.id === "medium_transfer")!;
    expect(hsp.limit.en).toMatch(/candidate mediator/i);
  });

  it("marks the reproductive findings as not EMF experiments", () => {
    const catsper = REPRODUCTIVE_FINDINGS.find((f) => f.id === "catsper_function")!;
    expect(catsper.exposure.en).toMatch(/not an EMF experiment/i);
    expect(catsper.limit.en).toMatch(/does not show that EMF causes/i);
  });

  it("does not upgrade the PEMF results to environmental radiofrequency", () => {
    const cry = ALL.find((f) => f.id === "cry_dependence")!;
    expect(cry.exposure.en).toMatch(/not 900 MHz/i);
    expect(cry.limit.en).toMatch(/needs a separate transduction chain/i);
    const axis = ALL.find((f) => f.id === "cry2_trpc1_axis")!;
    expect(axis.limit.en).toMatch(/not recorded as an observation of reproductive harm/i);
  });

  it("records the exact doses and observation points", () => {
    expect(ALL.find((f) => f.id === "rf_pretreatment_memory")!.exposure.en).toContain("1950 MHz");
    expect(ALL.find((f) => f.id === "hypomagnetic_background")!.exposure.en).toContain("0.29");
    expect(ALL.find((f) => f.id === "cry2_trpc1_axis")!.exposure.en).toContain("1.5 mT");
    expect(ALL.find((f) => f.id === "spock3_barrier")!.exposure.en).toContain("150 days");
    expect(ALL.find((f) => f.id === "endpoint_decoupling")!.exposure.en).toContain("905 MHz");
  });
});

describe("exposure classes (Appendix A)", () => {
  it("keeps eight classes apart with a transfer note", () => {
    expect(EXPOSURE_CLASSES).toHaveLength(8);
    for (const r of EXPOSURE_CLASSES) {
      expect(r.exposure.fi.length).toBeGreaterThan(10);
      expect(r.targets.fi.length).toBeGreaterThan(10);
    }
    expect(EXPOSURE_CLASS_NOTE.en).toMatch(/does not become the same/i);
  });

  it("states that the genetic reproductive row carries no EMF cause", () => {
    const young = EXPOSURE_CLASSES.find((r) => r.evidence.includes("Young"))!;
    expect(young.targets.en).toMatch(/no EMF cause/i);
  });
});

describe("research programme", () => {
  it("keeps the three-variable model a proposal that does not replace BioCap", () => {
    expect(THREE_VARIABLE_MODEL.bound.en).toMatch(/does not replace the BioCap integral/i);
    expect(THREE_VARIABLE_MODEL.bound.en).toMatch(/not a free way to explain any result/i);
    expect(THREE_VARIABLE_MODEL.variables).toHaveLength(3);
    for (const v of THREE_VARIABLE_MODEL.variables) expect(v.measurement.en.length).toBeGreaterThan(5);
  });

  it("requires all four groups for the interaction contrast", () => {
    expect(INTERACTION_CONTRAST.formula).toContain("Y_sham");
    expect(INTERACTION_CONTRAST.groups.en).toMatch(/all four groups/i);
    expect(INTERACTION_CONTRAST.bound.en).toMatch(/not the same claim/i);
  });

  it("separates the three mechanism roles and says they are not one chain", () => {
    expect(MECHANISM_ROLES).toHaveLength(3);
    expect(MECHANISM_ROLE_NOTE.en).toMatch(/not automatically successive parts of one chain/i);
  });

  it("gives all four chronic mechanisms a separable prediction", () => {
    expect(CHRONIC_MECHANISMS).toHaveLength(4);
    for (const c of CHRONIC_MECHANISMS) expect(c.prediction.en.length).toBeGreaterThan(25);
    expect(CHRONIC_MECHANISM_NOTE.en).toMatch(/not one numerical correction factor/i);
  });

  it("lists the recoverable datasets and the six-step decision rule", () => {
    expect(RECOVERABLE_DATA).toHaveLength(5);
    expect(DECISION_RULE).toHaveLength(6);
    for (const r of DECISION_RULE) {
      expect(r.en.length).toBeGreaterThan(40);
      expect(r.fi.length).toBeGreaterThan(40);
    }
    expect(DECISION_RULE[1].en).toMatch(/effect size, not by p-value/i);
    expect(RAW_TRACE_REQUIREMENT.en).toMatch(/200 samples per second/i);
  });

  it("keeps the TFR bridge explicitly unbuilt", () => {
    expect(CONVERGENCE_ASSESSMENT.tfrBridge).toHaveLength(3);
    expect(CONVERGENCE_ASSESSMENT.tfrBridgeNote.en).toMatch(/no unjustified percentage share/i);
    const notMeans = CONVERGENCE_ASSESSMENT.notEstablished.map((n) => n.en).join(" ");
    expect(notMeans).toMatch(/Lindgren coupling is established/i);
    expect(notMeans).toMatch(/TFR share can be calculated/i);
  });
});
