import type {
  CausalGraph,
  CausalGraphNode,
  Claim,
  EvidenceRelation,
  EpistemicAssessment,
  OutdatedTranslation,
} from "./types";
import type { Locale } from "@/lib/i18n";

import graphData from "@/data/causal-graph.json";
import claimsData from "@/data/claims.json";

export const causalGraph: CausalGraph = graphData as unknown as CausalGraph;

export const claims: Claim[] = claimsData.claims as unknown as Claim[];

export const evidenceRelations: EvidenceRelation[] =
  claimsData.evidence_relations as unknown as EvidenceRelation[];

export const epistemicAssessments: EpistemicAssessment[] =
  claimsData.epistemic_assessments as unknown as EpistemicAssessment[];

export function getNode(id: string): CausalGraphNode | undefined {
  return causalGraph.nodes[id];
}

export function getNodesByLayer(layer: string): CausalGraphNode[] {
  return Object.values(causalGraph.nodes).filter((n) => n.layer === layer);
}

export function getClaim(id: string): Claim | undefined {
  return claims.find((c) => c.id === id);
}

export function getClaimsForNode(nodeId: string): Claim[] {
  return claims.filter(
    (c) => c.target.type === "node" && c.target.nodeId === nodeId
  );
}

export function getEvidenceForClaim(claimId: string): EvidenceRelation[] {
  return evidenceRelations.filter((er) => er.claimId === claimId);
}

export function getAssessmentForClaim(
  claimId: string
): EpistemicAssessment | undefined {
  return epistemicAssessments
    .filter((ea) => ea.claimId === claimId)
    .sort((a, b) => b.revision - a.revision)[0];
}

export function resolveAlias(alias: string): string | undefined {
  const lower = alias.toLowerCase();
  for (const [id, node] of Object.entries(causalGraph.nodes)) {
    if (node.legacy_aliases.some((a) => a.toLowerCase() === lower)) {
      return id;
    }
  }
  return undefined;
}

export function findOutdatedTranslations(
  sourceLocale: Locale = "en"
): OutdatedTranslation[] {
  const locales: Locale[] = ["en", "fi", "ja", "fr", "ko"];
  const results: OutdatedTranslation[] = [];

  for (const claim of claims) {
    const source = claim.statement[sourceLocale];
    if (!source) continue;
    for (const locale of locales) {
      if (locale === sourceLocale) continue;
      const translation = claim.statement[locale];
      if (!translation) {
        results.push({ claimId: claim.id, locale, behind: -1 });
      } else if (translation.sourceRevision < source.sourceRevision) {
        results.push({
          claimId: claim.id,
          locale,
          behind: source.sourceRevision - translation.sourceRevision,
        });
      }
    }
  }

  return results;
}

export type { CausalGraph, CausalGraphNode, Claim, EvidenceRelation, EpistemicAssessment };
