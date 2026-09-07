import { describe, expect, it } from "vitest";
import bindings from "@/data/atlas-claim-bindings.json";
import { claims, getClaim, getEvidenceForClaim } from "@/lib/claims";
import { NODES, EDGES, MODULOME_CARD_MAP } from "@/lib/causalAtlasData";
import { atlasClaimCoverage, atlasClaims, claimIdsForAtlasNode } from "@/lib/atlasEvidence";

describe("Shared atlas claim bindings", () => {
  it("only binds existing channels, connections and curated claims", () => {
    for (const [nodeId, ids] of Object.entries(bindings.nodes)) {
      expect(NODES.some(node => node.id === nodeId), nodeId).toBe(true);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(getClaim(id), `${nodeId}: ${id}`).toBeDefined();
    }
    for (const edge of bindings.edges) {
      expect(EDGES.some(candidate => candidate.from === edge.from && candidate.to === edge.to), `${edge.from}->${edge.to}`).toBe(true);
      expect(edge.scope).toBe("component");
      for (const id of edge.claimIds) expect(getClaim(id)).toBeDefined();
    }
  });

  it("shares the existing chemical-memory claim rather than inventing a second evidence route", () => {
    const ids = claimIdsForAtlasNode("receptor_memory");
    expect(ids).toContain("claim.receptor.chemical-memory");
    const entry = atlasClaims(ids).find(item => item.claim.id === "claim.receptor.chemical-memory")!;
    expect(entry.evidence.some(item => /meng2026/.test(item.referenceId))).toBe(true);
    expect(entry.evidence.some(item => /kish2026/.test(item.referenceId))).toBe(true);
    expect(entry.evidence.every(item => item.calibrationRole !== "calibration")).toBe(true);
  });

  it("keeps an uncurated channel distinct from a claim without study relations", () => {
    expect(atlasClaimCoverage([{ id: "lindgren_2025" }])).toMatchObject({ linkedNodes: 0, evidenceLinkedNodes: 0, claims: 0 });
    expect(claimIdsForAtlasNode("demo_tfr").length).toBeGreaterThan(0);
    expect(claimIdsForAtlasNode("demo_tfr").flatMap(getEvidenceForClaim)).toHaveLength(0);
    expect(atlasClaimCoverage([{ id: "demo_tfr" }])).toMatchObject({ linkedNodes: 1, evidenceLinkedNodes: 0 });
  });

  it("does not count reused claims again when several channels share them", () => {
    const node = { id: "receptor_memory" };
    const once = atlasClaimCoverage([node]);
    const twice = atlasClaimCoverage([node, node]);
    expect(twice.claims).toBe(once.claims);
    expect(twice.evidenceRelations).toBe(once.evidenceRelations);
  });

  it("gives every mechanism card a curated claim with a study relation", () => {
    for (const id of Object.values(MODULOME_CARD_MAP)) {
      const entries = atlasClaims(claimIdsForAtlasNode(id));
      expect(entries.length, id).toBeGreaterThan(0);
      expect(entries.some(entry => entry.evidence.length > 0), id).toBe(true);
    }
  });

  it("preserves association and interaction assessments in atlas filtering", () => {
    expect(NODES.find(node => node.id === "card_iris_optical_exposure")?.epistemicLevel).toBe("C");
    expect(NODES.find(node => node.id === "card_genotype_exposure_interaction")?.epistemicLevel).toBe("M|C");
  });

  it("exposes the merged physics, androgen and behavioural claims alongside the component claims", () => {
    const bound = new Set(Object.values(bindings.nodes).flat());
    for (const claim of claims) expect(bound.has(claim.id), claim.id).toBe(true);
    expect(claimIdsForAtlasNode("berm_l2_bridge")).toContain("claim.bridge.conditional-response-operator");
    expect(claimIdsForAtlasNode("lindgren_metric_drive")).toContain("claim.geometry.quadratic-mixing");
    expect(claimIdsForAtlasNode("androgen_receptor_signal")).toContain("claim.androgen.receptor-use-capacity");
    expect(claimIdsForAtlasNode("epistapege_observability_loss")).toContain("claim.civilization.epistapege-observability-loss");
  });
});
