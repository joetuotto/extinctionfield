import type {
  CausalGraph,
  CausalGraphNode,
  Claim,
  EvidenceRelation,
  EpistemicAssessment,
  OutdatedTranslation,
  RouteDefinition,
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

export const routes: RouteDefinition[] =
  ((claimsData as Record<string, unknown>).routes as RouteDefinition[] | undefined) ?? [];

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

// ── Phase 6: Network / Coverage / Routes ───────────────

export interface NodeCoverage {
  nodeId: string;
  claims: number;
  evidence: number;
  assessments: number;
  covered: boolean;
}

export function getNodeCoverage(): NodeCoverage[] {
  return Object.keys(causalGraph.nodes).map((nodeId) => {
    const nodeClaims = getClaimsForNode(nodeId);
    const claimIds = new Set(nodeClaims.map((c) => c.id));
    const evidence = evidenceRelations.filter((er) => claimIds.has(er.claimId)).length;
    const assessments = epistemicAssessments.filter((ea) => claimIds.has(ea.claimId)).length;
    return {
      nodeId,
      claims: nodeClaims.length,
      evidence,
      assessments,
      covered: nodeClaims.length > 0,
    };
  });
}

export function getCoverageStats(): {
  totalNodes: number;
  coveredNodes: number;
  totalClaims: number;
  totalEvidence: number;
  totalAssessments: number;
  totalRoutes: number;
  coveragePercent: number;
} {
  const coverage = getNodeCoverage();
  const coveredNodes = coverage.filter((c) => c.covered).length;
  return {
    totalNodes: coverage.length,
    coveredNodes,
    totalClaims: claims.length,
    totalEvidence: evidenceRelations.length,
    totalAssessments: epistemicAssessments.length,
    totalRoutes: routes.length,
    coveragePercent: coverage.length > 0 ? Math.round((coveredNodes / coverage.length) * 100) : 0,
  };
}

export function getRoute(id: string): RouteDefinition | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesForClaim(claimId: string): RouteDefinition[] {
  return routes.filter((r) => r.routeClaims.includes(claimId));
}

export function getRoutesByTarget(targetClaimId: string): RouteDefinition[] {
  return routes.filter((r) => r.targetClaim === targetClaimId);
}

export function getClaimsForEdge(edgeId: string): Claim[] {
  return claims.filter(
    (c) => c.target.type === "edge" && c.target.edgeId === edgeId
  );
}

export function getClaimsForRoute(routeId: string): Claim[] {
  return claims.filter(
    (c) => c.target.type === "route" && c.target.routeId === routeId
  );
}

// ── Phase 7: Independence Analysis ─────────────────────

export interface IndependenceReport {
  route1Id: string;
  route2Id: string;
  sharedAssumptions: string[];
  sharedDatasets: string[];
  sharedClaims: string[];
  sharedEvidence: string[];
  independent: boolean;
}

export function analyzeIndependence(
  route1Id: string,
  route2Id: string
): IndependenceReport | undefined {
  const r1 = getRoute(route1Id);
  const r2 = getRoute(route2Id);
  if (!r1 || !r2) return undefined;

  const sharedAssumptions = r1.sharedAssumptions.filter((a) =>
    r2.sharedAssumptions.includes(a)
  );
  const sharedDatasets = r1.sharedDatasets.filter((d) =>
    r2.sharedDatasets.includes(d)
  );
  const sharedClaims = r1.routeClaims.filter((c) =>
    r2.routeClaims.includes(c)
  );
  const sharedEvidence = r1.routeEvidence.filter((e) =>
    r2.routeEvidence.includes(e)
  );

  return {
    route1Id,
    route2Id,
    sharedAssumptions,
    sharedDatasets,
    sharedClaims,
    sharedEvidence,
    independent:
      sharedAssumptions.length === 0 &&
      sharedDatasets.length === 0 &&
      sharedClaims.length === 0 &&
      sharedEvidence.length === 0,
  };
}

export interface IndependenceGroup {
  groupId: string;
  routeIds: string[];
  verified: boolean;
}

export function getIndependenceGroups(): IndependenceGroup[] {
  const groups = new Map<string, { routeIds: string[]; verified: boolean }>();
  for (const route of routes) {
    const existing = groups.get(route.independenceGroup);
    if (existing) {
      existing.routeIds.push(route.id);
      if (!route.independenceVerified) existing.verified = false;
    } else {
      groups.set(route.independenceGroup, {
        routeIds: [route.id],
        verified: route.independenceVerified,
      });
    }
  }
  return Array.from(groups.entries()).map(([groupId, data]) => ({
    groupId,
    ...data,
  }));
}

export type { CausalGraph, CausalGraphNode, Claim, EvidenceRelation, EpistemicAssessment, RouteDefinition };
