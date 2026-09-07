import { describe, expect, it } from "vitest";
import { analyzeIndependence, claims, evidenceRelations, getCoverageStats, getIndependenceGroups, routes } from "@/lib/claims";
import { compareRouteIndependence } from "@/lib/claims/independence";
import type { Claim, EvidenceRelation, RouteDefinition } from "@/lib/claims/types";
import { sourceReferenceId } from "@/lib/referenceIndex";

const complete = { studyIds: [], datasetFamilyIds: [], premiseIds: [], status: "complete" as const };
function route(id: string, evidenceId: string): RouteDefinition {
  return { id, name: { en: id }, description: { en: id }, targetClaim: "shared-research-question", routeClaims: [], routeEvidence: [evidenceId], sharedAssumptions: [], sharedDatasets: [], independenceGroup: id, independenceVerified: true, independenceNote: null, independenceAudit: { ...complete, reviewedBy: "test", reviewedAt: "2026-09-07" }, direction: "supports", alternativeCompatibility: "", discriminatingPower: "" };
}
function evidence(id: string, referenceId: string): EvidenceRelation {
  return { id, referenceId, claimId: `claim.${id}.component`, relation: "supports", directness: "component", studyDesign: "controlled experiment", applicability: "named assay", calibrationRole: "structural_only", limitations: [], curatorId: "test", curatedAt: "2026-09-07", curatorNote: null, provenance: { ...complete, studyIds: [`study.${referenceId}`] } };
}
function compare(a: EvidenceRelation, b: EvidenceRelation, left = route("left", a.id), right = route("right", b.id), claimList: Claim[] = []) {
  return compareRouteIndependence(left, right, { claims: claimList, evidenceRelations: [a, b], sourceIdentity: sourceReferenceId });
}

describe("curated three-state independence", () => {
  it("does not mistake an absent audit for independence", () => {
    const a = evidence("a", "source-a"), b = evidence("b", "source-b");
    const left = route("left", a.id);
    left.independenceVerified = false;
    delete left.independenceAudit;
    expect(compare(a, b, left)).toMatchObject({ status: "unknown", independent: null });
  });

  it("canonicalizes aliases even when relation and study ids differ", () => {
    const result = compare(evidence("one-claim", "sannino2022"), evidence("other-claim", "sannino2022_autophagy_adaptive"));
    expect(result).toMatchObject({ status: "dependent", independent: false, sharedSources: ["sannino2022_autophagy_adaptive"], sharedEvidence: [] });
  });

  it("treats the corrected Kim record and original as one source", () => {
    expect(compare(evidence("original", "kim2026_cell_gene_switch"), evidence("correction", "kim2026_cell_gene_switch_correction"))).toMatchObject({ status: "dependent", sharedSources: ["kim2026_cell_gene_switch"] });
  });

  it("detects the real Archer shared dataset despite different publications", () => {
    const a = evidenceRelations.find((er) => er.id === "er.coordination.archer2014_transcriptome")!;
    const b = evidenceRelations.find((er) => er.id === "er.coordination.archer2022_glucocorticoid_timing")!;
    expect(compare(a, b)).toMatchObject({ status: "dependent", sharedSources: [], sharedDatasets: ["dataset.geo.gse48113"] });
  });

  it("detects shared study identities independently of source names", () => {
    const a = evidence("a", "paper-a"), b = evidence("b", "paper-b");
    b.provenance!.studyIds = [...a.provenance!.studyIds];
    expect(compare(a, b)).toMatchObject({ status: "dependent", sharedStudies: ["study.paper-a"] });
  });

  it("detects a common structured transfer premise", () => {
    const a = evidence("a", "paper-a"), b = evidence("b", "paper-b");
    const left = route("left", a.id), right = route("right", b.id);
    left.independenceAudit!.premiseIds = ["premise.berm.l2-operator"];
    b.provenance!.premiseIds = ["premise.berm.l2-operator"];
    expect(compare(a, b, left, right)).toMatchObject({ status: "dependent", sharedPremises: ["premise.berm.l2-operator"] });
  });

  it("follows shared claim dependencies beyond the displayed route claims", () => {
    const base = claims[0];
    const a = evidence("a", "paper-a"), b = evidence("b", "paper-b");
    const left = route("left", a.id), right = route("right", b.id);
    left.routeClaims = ["claim.left.component"];
    right.routeClaims = ["claim.right.component"];
    const list = [{ ...base, id: "claim.left.component", depends_on: ["claim.shared.premise"] }, { ...base, id: "claim.right.component", depends_on: ["claim.shared.premise"] }, { ...base, id: "claim.shared.premise", depends_on: [] }];
    expect(compare(a, b, left, right, list)).toMatchObject({ status: "dependent", sharedClaims: ["claim.shared.premise"] });
  });

  it("requires complete source provenance even when a route says verified", () => {
    const a = evidence("a", "paper-a"), b = evidence("b", "paper-b");
    delete a.provenance;
    expect(compare(a, b)).toMatchObject({ status: "unknown", independent: null });
  });

  it("never treats missing selected evidence as affirmative", () => {
    const a = evidence("a", "paper-a"), b = evidence("b", "paper-b");
    const left = route("left", "missing-relation");
    expect(compare(a, b, left).status).toBe("unknown");
  });

  it("permits an affirmative result only with complete disjoint inventories", () => {
    // Sharing a research question is not itself sharing data or a premise.
    expect(compare(evidence("a", "paper-a"), evidence("b", "paper-b"))).toMatchObject({ status: "independent", independent: true, unresolved: [] });
  });

  it("does not label any current end-to-end route pair independently verified", () => {
    const counts = { dependent: 0, unknown: 0, independent: 0 };
    for (let i = 0; i < routes.length; i++) for (const other of routes.slice(i + 1)) {
      const result = analyzeIndependence(routes[i].id, other.id)!;
      expect(result.independent).not.toBe(true);
      counts[result.status]++;
    }
    expect(counts).toEqual({ dependent: 4, unknown: 2, independent: 0 });
    expect(getIndependenceGroups().every((group) => !group.verified)).toBe(true);
  });

  it("names the coverage denominator and separates source identity from relations", () => {
    const stats = getCoverageStats();
    expect(stats.domain).toBe("canonical-model-graph");
    expect(stats.uniqueSources).toBeLessThan(stats.totalEvidence);
    expect(stats.evidenceCoveredNodes).toBeLessThanOrEqual(stats.coveredNodes);
    expect(stats.calibratedNodes).toBeLessThanOrEqual(stats.evidenceCoveredNodes);
  });
});
