import type { Claim, EvidenceRelation, RouteDefinition } from "./types";

export type IndependenceStatus = "dependent" | "independent" | "unknown";

export interface IndependenceReport {
  route1Id: string;
  route2Id: string;
  sharedAssumptions: string[];
  sharedDatasets: string[];
  sharedClaims: string[];
  sharedEvidence: string[];
  sharedSources: string[];
  sharedStudies: string[];
  sharedPremises: string[];
  unresolved: string[];
  status: IndependenceStatus;
  /** Compatibility field: null means unassessed, never affirmative evidence. */
  independent: boolean | null;
}

export interface IndependenceContext {
  claims: readonly Claim[];
  evidenceRelations: readonly EvidenceRelation[];
  /** Resolves aliases and correction records to their original publication. */
  sourceIdentity: (referenceId: string) => string;
}

const intersect = (a: Iterable<string>, b: Iterable<string>): string[] => {
  const right = new Set(b);
  return [...new Set(a)].filter((id) => right.has(id)).sort();
};

function inventory(route: RouteDefinition, context: IndependenceContext) {
  const byClaim = new Map(context.claims.map((claim) => [claim.id, claim]));
  const byEvidence = new Map(context.evidenceRelations.map((er) => [er.id, er]));
  const claimIds = new Set<string>();
  const unresolved: string[] = [];
  const visit = (id: string) => {
    if (claimIds.has(id)) return;
    claimIds.add(id);
    const claim = byClaim.get(id);
    if (!claim) unresolved.push(`Unknown claim: ${id}`);
    else claim.depends_on.forEach(visit);
  };
  route.routeClaims.forEach(visit);
  const audit = route.independenceAudit;
  if (!route.independenceVerified || audit?.status !== "complete") {
    unresolved.push(`Incomplete independence audit: ${route.id}`);
  }
  if (route.routeEvidence.length === 0) unresolved.push(`No selected evidence: ${route.id}`);
  const sources: string[] = [];
  const studies = [...(audit?.studyIds ?? [])];
  const datasets = [...route.sharedDatasets, ...(audit?.datasetFamilyIds ?? [])];
  const premises = [...(audit?.premiseIds ?? [])];
  for (const id of route.routeEvidence) {
    const relation = byEvidence.get(id);
    if (!relation) {
      unresolved.push(`Unknown evidence relation: ${id}`);
      continue;
    }
    sources.push(context.sourceIdentity(relation.referenceId));
    const provenance = relation.provenance;
    if (provenance?.status !== "complete" || provenance.studyIds.length === 0) {
      unresolved.push(`Incomplete evidence provenance: ${id}`);
    }
    studies.push(...(provenance?.studyIds ?? []));
    datasets.push(...(provenance?.datasetFamilyIds ?? []));
    premises.push(...(provenance?.premiseIds ?? []));
  }
  return { claimIds, sources, studies, datasets, premises, unresolved };
}

/** Shared support is reusable; it is not an independent replication. */
export function compareRouteIndependence(
  route1: RouteDefinition,
  route2: RouteDefinition,
  context: IndependenceContext,
): IndependenceReport {
  const a = inventory(route1, context);
  const b = inventory(route2, context);
  const shared = {
    sharedAssumptions: intersect(route1.sharedAssumptions, route2.sharedAssumptions),
    sharedDatasets: intersect(a.datasets, b.datasets),
    sharedClaims: intersect(a.claimIds, b.claimIds),
    sharedEvidence: intersect(route1.routeEvidence, route2.routeEvidence),
    sharedSources: intersect(a.sources, b.sources),
    sharedStudies: intersect(a.studies, b.studies),
    sharedPremises: intersect(a.premises, b.premises),
  };
  const unresolved = [...new Set([...a.unresolved, ...b.unresolved])].sort();
  const overlaps = Object.values(shared).some((ids) => ids.length > 0);
  const status: IndependenceStatus = overlaps ? "dependent" : unresolved.length ? "unknown" : "independent";
  return {
    route1Id: route1.id,
    route2Id: route2.id,
    ...shared,
    unresolved,
    status,
    independent: status === "unknown" ? null : status === "independent",
  };
}
