import { describe, expect, it } from "vitest";
import { factorialContrast, getIntervention, interventionFromSearch, interventionHref, interventionAtlasHref, searchInterventions, INTERVENTIONS, INTERVENTION_IDS, type EndpointMeasurement, type ArmId } from "../interventions";
import { EDGES, NODES, SUBATLASES, nodesForIntervention, nodesForAtlas } from "../causalAtlasData";
import { getClaim } from "../claims";

const measured = (value: number): EndpointMeasurement => ({ value, endpoint: "evoked calcium", unit: "nM", time: 30, timeUnit: "s", normalization: "raw", protocolId: "one-experiment" });
const arms = (): Record<ArmId, EndpointMeasurement | null> => ({ sham: measured(10), field: measured(16), drug: measured(20), fieldDrug: measured(22) });
describe("Matched factorial endpoints", () => {
  it("subtracts field effects using each drug condition's own sham", () => {
    expect(factorialContrast(arms())).toEqual({ status: "available", fieldEffectWithoutDrug: 6, fieldEffectWithDrug: 2, interaction: -4, unit: "nM" });
  });
  it.each(["sham", "field", "drug", "fieldDrug"] as ArmId[])("does not invent a zero for missing %s", key => {
    expect(factorialContrast({ ...arms(), [key]: null })).toEqual({ status: "unavailable", reason: "missing_arm" });
  });
  it.each(["endpoint", "unit", "timeUnit", "protocolId"] as const)("rejects mismatched %s", key => {
    const test = arms(); test.fieldDrug = { ...measured(22), [key]: "other" };
    expect(factorialContrast(test).status).toBe("unavailable");
  });
  it("rejects unmatched time and group-normalized percentages", () => {
    expect(factorialContrast({ ...arms(), fieldDrug: { ...measured(22), time: 60 } }).status).toBe("unavailable");
    const groupRelative = Object.fromEntries(Object.entries(arms()).map(([id, value]) => [id, { ...value, normalization: "group_baseline_percent" }])) as unknown as Record<ArmId, EndpointMeasurement>;
    expect(factorialContrast(groupRelative).status).toBe("unavailable");
  });
  it("requires the same declared shared reference, rather than a shared percent label", () => {
    const shared = Object.fromEntries(Object.entries(arms()).map(([id, value]) => [id, { ...value, normalization: "shared_reference", normalizationReferenceId: "one-standard" }])) as Record<ArmId, EndpointMeasurement>;
    expect(factorialContrast(shared).status).toBe("available");
    shared.drug.normalizationReferenceId = "another-standard";
    expect(factorialContrast(shared).status).toBe("unavailable");
  });
  it("rejects nonfinite observations and overflow in the derived contrast", () => {
    for (const value of [NaN, Infinity]) expect(factorialContrast({ ...arms(), drug: measured(value) }).status).toBe("unavailable");
    expect(factorialContrast({ sham: measured(-1e308), field: measured(1e308), drug: measured(0), fieldDrug: measured(1) }).status).toBe("unavailable");
  });
});
describe("Curated intervention registry", () => {
  it("contains exactly the eight reviewable profiles with explicit missing study means", () => {
    expect(INTERVENTIONS.schemaVersion).toBe("berm-intervention-profiles-v1");
    expect(INTERVENTIONS.profiles.map(p => p.id).sort()).toEqual([...INTERVENTION_IDS].sort());
    for (const p of INTERVENTIONS.profiles) {
      expect(p.modelStatus).toBe("STRUCTURAL_ONLY");
      for (const field of [p.title, p.mechanism, p.observed, p.prediction, ...p.limitations, ...Object.values(p.protocol)]) { expect(field.fi).toBeTruthy(); expect(field.en).toBeTruthy(); }
      expect(Object.values(p.contrast.arms)).toEqual([null, null, null, null]);
      expect(factorialContrast(p.contrast.arms).status).toBe("unavailable");
      expect(p.studyIds).toEqual(p.studies.map(study => study.id));
      for (const study of p.studies) expect(p.referenceIds).toContain(study.referenceId);
      for (const claimId of p.claimIds) expect(getClaim(claimId), claimId).toBeDefined();
    }
  });
  it("separates non-field studies from proposed field-response predictions", () => {
    for (const id of ["local_ltype_erk", "cry_fad_competition", "drug_photochemistry"]) expect(getIntervention(id)!.studies.every(study => !study.fieldTested)).toBe(true);
    expect(getIntervention("coq10_response")!.protocol.field.en).toContain("GSM-modulated");
    expect(INTERVENTIONS.derivation.status).toBe("CONDITIONAL_FORMAL_OPERATOR");
    expect(INTERVENTIONS.derivation.openBridges.length).toBeGreaterThan(0);
  });
  it("searches across languages, named targets and endpoints, and resolves safe deep links", () => {
    expect(searchInterventions("thapsigargin").map(p => p.id)).toContain("channel_density_store_history");
    expect(searchInterventions("sitoutuminen").map(p => p.id)).toContain("cry_fad_competition");
    expect(searchInterventions("not-a-profile")).toEqual([]);
    expect(interventionFromSearch("?profile=coq10_response")?.id).toBe("coq10_response");
    expect(interventionFromSearch("?profile=invalid")).toBeUndefined();
    expect(interventionHref("fr", "mt2_brake")).toBe("/fr/evidence/pharmacology?profile=mt2_brake#intervention-explorer");
    expect(interventionAtlasHref("fi", "mt2_brake", "mech_mt2_store_brake")).toBe("/fi/map?profile=mt2_brake&node=mech_mt2_store_brake");
  });
});
describe("Pharmacology as a lens over the complete atlas", () => {
  it("retains six subatlases and all profile nodes regardless of the node's stage", () => {
    expect(SUBATLASES.filter(a => a.id !== "all").map(a => a.id)).toEqual(["physics", "cell", "health", "reproduction", "society", "ecology"]);
    for (const profile of INTERVENTIONS.profiles) {
      const visible = nodesForIntervention(profile.id).map(n => n.id);
      for (const id of [...profile.atlasNodeIds, "lindgren_2025", "metric_perturbation", "berm_l2_bridge"]) expect(visible, profile.id).toContain(id);
      expect(NODES.some(n => n.id === profile.atlasNodeIds[0])).toBe(true);
    }
    expect(nodesForAtlas("reproduction").some(n => n.id === "tissue_sperm")).toBe(true);
    expect(nodesForIntervention("invalid")).toEqual([]);
  });
  it("connects each profile's lens to the conditional bridge without moving drug biology upstream", () => {
    for (const profile of INTERVENTIONS.profiles) {
      const ids = new Set(nodesForIntervention(profile.id).map(n => n.id));
      const visible = EDGES.filter(e => ids.has(e.from) && ids.has(e.to));
      const reachable = new Set(["berm_l2_bridge"]);
      for (let i = 0; i < ids.size; i++) for (const edge of visible) if (reachable.has(edge.from)) reachable.add(edge.to);
      expect(profile.atlasNodeIds.some(id => reachable.has(id)), profile.id).toBe(true);
    }
    expect(EDGES.find(e => e.from === "berm_l2_bridge" && e.to === "mod_drug_photochemistry")).toBeUndefined();
    const labeled = EDGES.flatMap(edge => edge.interventionEffects ?? []);
    for (const profile of INTERVENTIONS.profiles) expect(labeled.some(effect => effect.profileId === profile.id)).toBe(true);
    for (const edge of EDGES.filter(e => e.interventionEffects)) for (const effect of edge.interventionEffects!) {
      expect(effect.context.en.length).toBeGreaterThan(30); expect(effect.context.fi.length).toBeGreaterThan(30);
      if (edge.from === "berm_l2_bridge") { expect(effect.evidence).toBe("conditional"); expect(edge.relation).toBe("bridge"); }
    }
  });
});
