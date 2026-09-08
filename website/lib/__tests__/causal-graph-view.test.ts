import { describe, expect, it } from "vitest";

import graph from "@/data/causal-graph.json";
import claims from "@/data/claims.json";
import { STEROIDOGENESIS } from "@/lib/steroidogenesis";
import { REPRODUCTIVE_REGULATION } from "@/lib/reproductiveRegulation";
import {
  CANONICAL_CAUSAL_EDGES,
  CANONICAL_CAUSAL_GRAPH_VERSION,
  CANONICAL_CAUSAL_NODES,
  CANONICAL_NODE_SUPPLEMENTS,
  getCanonicalCalibrationLabel,
  getCanonicalNodeDescription,
  getCanonicalNodeLabel,
} from "@/lib/causalGraphView";

describe("rendered canonical causal graph", () => {
  it("renders exactly the synchronized graph IDs and topology", () => {
    expect(CANONICAL_CAUSAL_GRAPH_VERSION).toBe(graph.version);
    expect(new Set(CANONICAL_CAUSAL_NODES.map((node) => node.id))).toEqual(
      new Set(Object.keys(graph.nodes)),
    );
    expect(
      CANONICAL_CAUSAL_EDGES.map((edge) => `${edge.from}->${edge.to}`),
    ).toEqual(graph.edges.map((edge) => `${edge.from}->${edge.to}`));
  });

  it("renders the open bridge between every measurement input and biology", () => {
    const incoming = graph.edges.filter((edge) => edge.kind === "inference_input");
    const outgoing = graph.edges.filter((edge) => edge.kind === "conditional_response");

    expect(incoming.length).toBeGreaterThan(0);
    expect(outgoing.length).toBeGreaterThan(0);
    expect(incoming.every((edge) => edge.to === "BERM_L2_BRIDGE")).toBe(true);
    expect(outgoing.every((edge) => edge.from === "BERM_L2_BRIDGE")).toBe(true);
  });

  it("keeps presentation refinements within existing canonical nodes and registered evidence", () => {
    const claimIds = new Set(claims.claims.map(claim => claim.id));
    for (const [nodeId, supplement] of Object.entries(CANONICAL_NODE_SUPPLEMENTS)) {
      expect(graph.nodes).toHaveProperty(nodeId);
      expect(supplement.claimIds.every(id => claimIds.has(id))).toBe(true);
      const node = CANONICAL_CAUSAL_NODES.find(item => item.id === nodeId)!;
      expect(node.keyReferences).toHaveLength(supplement.studyIds.length + (supplement.regulationStudyIds?.length ?? 0));
      supplement.studyIds.forEach((studyId, index) => {
        const study = STEROIDOGENESIS.studies.find(item => item.id === studyId)!;
        const reference = node.keyReferences[index];
        expect(reference.referenceId).toBe(study.referenceId);
        expect(reference.keyFinding_en).toContain(study.finding.en);
        expect(reference.keyFinding_en).toContain(study.scope.en);
        expect(reference.keyFinding_en).toMatch(study.evidenceKind === "field_experiment" ? /^Field experiment:/ : /^Component experiment:/);
      });
      (supplement.regulationStudyIds ?? []).forEach((studyId, index) => {
        const study = REPRODUCTIVE_REGULATION.studies.find(item => item.id === studyId)!;
        const reference = node.keyReferences[supplement.studyIds.length + index];
        expect(reference.referenceId).toBe(study.referenceId);
        expect(reference.keyFinding_en).toContain(study.finding.en);
        expect(reference.keyFinding_en).toContain(study.scope.en);
        expect(reference.keyFinding_en).toMatch(study.evidenceKind === "observational" ? /^Observational study:/ : /^Component experiment:/);
      });
    }
  });

  it("distinguishes geometry, local steroidogenesis and reserve measurements without adding a fitted route", () => {
    expect(CANONICAL_CAUSAL_NODES.find(node => node.id === "LINDGREN_METRIC_DRIVE")?.epistemicLevel).toBe("L1");
    expect(CANONICAL_CAUSAL_NODES.find(node => node.id === "A_VGCC_ROS")?.epistemicLevel).toBe("M");
    const male = getCanonicalNodeDescription("MALE_STEROIDOGENESIS", "en");
    expect(male).toContain("CaMKI–NUR77–StAR");
    expect(male).toContain("RORα–BMAL1–StAR");
    expect(male).toContain("GSH reserve, GSH/GSSG ratio and current hormone output remain separate measurements");
    expect(male).toContain("without a new fitted TFR multiplier");
    expect(getCanonicalNodeDescription("RECEPTOR_STATE_MEMORY", "en")).toContain("a null output measurement alone cannot establish hidden depletion");
    expect(CANONICAL_NODE_SUPPLEMENTS.MALE_STEROIDOGENESIS.links.some(link => link.href === "/model/proxy-masking#redox-reserve-masking")).toBe(true);
  });

  it("localizes every calibration status separately from evidence confidence and retains full labels", () => {
    for (const node of Object.values(graph.nodes)) {
      for (const locale of ["en", "fi", "ja", "fr", "ko"]) {
        expect(getCanonicalCalibrationLabel(node.id, locale)).not.toMatch(/_|requires |structural only/);
        expect(getCanonicalCalibrationLabel(node.id, locale).length).toBeGreaterThan(0);
      }
      expect(getCanonicalNodeLabel(node.id, "fi")).toBe(node.label.fi ?? node.label.en);
    }
    expect(getCanonicalNodeDescription("MALE_SPERM", "fi")).toContain("ei solmun tutkimusnäytön puuttumista");
  });

  it("retains capacity and the institutional terminal while connecting behaviour to encounters and care", () => {
    const hasEdge = (from: string, to: string) => CANONICAL_CAUSAL_EDGES.some(edge => edge.from === from && edge.to === to);
    expect(hasEdge("INDIVIDUAL_BEHAVIORAL_RESPONSE", "DEMAND_OPPORTUNITY")).toBe(true);
    expect(hasEdge("REPRODUCTIVE_OPPORTUNITY", "DEMAND_OPPORTUNITY")).toBe(true);
    expect(hasEdge("HORMONE_TARGET_RESPONSE", "CAREGIVING_ALLOCATION")).toBe(true);
    expect(hasEdge("COUPLE_FECUNDABILITY", "ASFR")).toBe(true);
    expect(CANONICAL_CAUSAL_EDGES.some(edge => edge.from === "INSTITUTIONAL_MODEL_REUSE")).toBe(false);
    expect(getCanonicalNodeDescription("DEMAND_OPPORTUNITY", "en")).toContain("zero intention does not imply zero births");
    for (const id of ["INDIVIDUAL_BEHAVIORAL_RESPONSE", "REPRODUCTIVE_OPPORTUNITY", "CAREGIVING_ALLOCATION", "DEMAND_OPPORTUNITY"]) {
      const node = CANONICAL_CAUSAL_NODES.find(item => item.id === id)!;
      expect(node.keyReferences.length).toBeGreaterThan(0);
      expect(node.keyReferences.every(reference => !reference.keyFinding_en?.startsWith("Field experiment:"))).toBe(true);
    }
  });
});
