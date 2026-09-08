import bindings from "@/data/atlas-claim-bindings.json";
import { getClaim, getEvidenceForClaim, getAssessmentForClaim } from "@/lib/claims";

/** Presentation bindings never infer a source's evidential role. */
export function claimIdsForAtlasNode(nodeId: string): string[] {
  return [...((bindings.nodes as Record<string, string[]>)[nodeId] ?? [])];
}

export function claimIdsForAtlasEdge(from: string, to: string): string[] {
  return [...(bindings.edges.find(edge => edge.from === from && edge.to === to)?.claimIds ?? [])];
}

export function atlasClaims(claimIds: readonly string[]) {
  return [...new Set(claimIds)].flatMap(id => {
    const claim = getClaim(id);
    return claim ? [{ claim, evidence: getEvidenceForClaim(id), assessment: getAssessmentForClaim(id) }] : [];
  });
}

/** Counts describe curated claims, not independent experiments or validated routes. */
export function atlasClaimCoverage(nodes: readonly { id: string }[]) {
  const linked = nodes.map(node => claimIdsForAtlasNode(node.id));
  const entries = atlasClaims(linked.flat());
  const withEvidence = new Set(entries.filter(entry => entry.evidence.length > 0).map(entry => entry.claim.id));
  return {
    totalNodes: nodes.length,
    linkedNodes: linked.filter(ids => ids.length > 0).length,
    evidenceLinkedNodes: linked.filter(ids => ids.some(id => withEvidence.has(id))).length,
    claims: entries.length,
    evidenceRelations: entries.reduce((sum, entry) => sum + entry.evidence.length, 0),
  };
}
