import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const DATA_DIR = resolve(__dirname, "../../data");

interface GraphNode {
  id: string;
  layer: string;
  parents: string[];
  children: string[];
  legacy_aliases?: string[];
  label: { en?: string };
}

interface CausalGraphFile {
  version: string;
  nodes: Record<string, GraphNode>;
  edges: { id: string; from: string; to: string }[];
  ui_groups: Record<string, { id: string; contains: string[] }>;
}

interface ClaimTarget {
  type: "node" | "edge" | "route";
  nodeId?: string;
  edgeId?: string;
  routeId?: string;
}

interface Claim {
  id: string;
  lifecycle: string;
  target: ClaimTarget;
  depends_on: string[];
  supersedes: string[];
}

interface EvidenceRelation {
  id: string;
  claimId: string;
  referenceId: string;
}

interface EpistemicAssessment {
  id: string;
  claimId: string;
  level: string;
  basis: string[];
}

interface RouteDefinition {
  id: string;
  name: { en?: string };
  targetClaim: string;
  routeClaims: string[];
  routeEvidence: string[];
  direction: string;
  independenceGroup: string;
  independenceVerified: boolean;
}

interface ClaimsFile {
  version: string;
  claims: Claim[];
  evidence_relations: EvidenceRelation[];
  epistemic_assessments: EpistemicAssessment[];
  routes?: RouteDefinition[];
}

function loadJSON<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(DATA_DIR, filename), "utf-8")) as T;
}

const graph = loadJSON<CausalGraphFile>("causal-graph.json");
const claims = loadJSON<ClaimsFile>("claims.json");

describe("causal-graph.json", () => {
  const nodeIds = new Set(Object.keys(graph.nodes));

  it("has 35 nodes", () => {
    expect(nodeIds.size).toBe(35);
  });

  it("has 74 edges", () => {
    expect(graph.edges.length).toBe(74);
  });

  it("node IDs are SCREAMING_SNAKE_CASE", () => {
    for (const id of nodeIds) {
      expect(id).toMatch(/^[A-Z][A-Z0-9_]*$/);
    }
  });

  it("node key matches node.id", () => {
    for (const [key, node] of Object.entries(graph.nodes)) {
      expect(key).toBe(node.id);
    }
  });

  it("all edge endpoints exist", () => {
    for (const edge of graph.edges) {
      expect(nodeIds.has(edge.from)).toBe(true);
      expect(nodeIds.has(edge.to)).toBe(true);
    }
  });

  it("parent/child relationships are symmetric", () => {
    for (const [id, node] of Object.entries(graph.nodes)) {
      for (const parentId of node.parents) {
        const parent = graph.nodes[parentId];
        expect(parent?.children).toContain(id);
      }
      for (const childId of node.children) {
        const child = graph.nodes[childId];
        expect(child?.parents).toContain(id);
      }
    }
  });

  it("graph is acyclic", () => {
    const visited = new Set<string>();
    const inStack = new Set<string>();

    function dfs(nodeId: string): boolean {
      if (inStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;
      visited.add(nodeId);
      inStack.add(nodeId);
      const node = graph.nodes[nodeId];
      for (const child of node?.children ?? []) {
        if (dfs(child)) return true;
      }
      inStack.delete(nodeId);
      return false;
    }

    for (const id of nodeIds) {
      expect(dfs(id)).toBe(false);
    }
  });

  it("every node belongs to a UI group", () => {
    const grouped = new Set<string>();
    for (const group of Object.values(graph.ui_groups)) {
      for (const nid of group.contains) {
        grouped.add(nid);
      }
    }
    for (const id of nodeIds) {
      expect(grouped.has(id)).toBe(true);
    }
  });

  it("all nodes have English labels", () => {
    for (const node of Object.values(graph.nodes)) {
      expect(node.label.en).toBeTruthy();
    }
  });
});

describe("claims.json", () => {
  it("has seed claims", () => {
    expect(claims.claims.length).toBeGreaterThanOrEqual(5);
  });

  it("claim IDs match pattern", () => {
    for (const claim of claims.claims) {
      expect(claim.id).toMatch(/^claim\.[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*$/);
    }
  });

  it("all claims are draft lifecycle", () => {
    for (const claim of claims.claims) {
      expect(claim.lifecycle).toBe("draft");
    }
  });

  it("claim targets reference valid graph nodes", () => {
    const nodeIds = new Set(Object.keys(graph.nodes));
    for (const claim of claims.claims) {
      if (claim.target.type === "node") {
        expect(nodeIds.has(claim.target.nodeId ?? "")).toBe(true);
      }
    }
  });

  it("evidence relations reference valid claims", () => {
    const claimIds = new Set(claims.claims.map((c) => c.id));
    for (const er of claims.evidence_relations) {
      expect(claimIds.has(er.claimId)).toBe(true);
    }
  });

  it("epistemic assessments have valid levels", () => {
    const validLevels = new Set(["L", "L*", "M", "C", "M|C", "E"]);
    for (const ea of claims.epistemic_assessments) {
      expect(validLevels.has(ea.level)).toBe(true);
    }
  });
});

describe("routes (phases 6-7)", () => {
  const routeArray = claims.routes ?? [];
  const claimIds = new Set(claims.claims.map((c) => c.id));
  const erIds = new Set(claims.evidence_relations.map((er) => er.id));

  it("has seed routes", () => {
    expect(routeArray.length).toBeGreaterThanOrEqual(2);
  });

  it("route IDs match pattern", () => {
    for (const route of routeArray) {
      expect(route.id).toMatch(/^route\.[a-z][a-z0-9-]*$/);
    }
  });

  it("route IDs are unique", () => {
    const ids = routeArray.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("targetClaim references valid claims", () => {
    for (const route of routeArray) {
      expect(claimIds.has(route.targetClaim)).toBe(true);
    }
  });

  it("routeClaims reference valid claims", () => {
    for (const route of routeArray) {
      for (const rc of route.routeClaims) {
        expect(claimIds.has(rc)).toBe(true);
      }
    }
  });

  it("routeEvidence references valid evidence relations", () => {
    for (const route of routeArray) {
      for (const re of route.routeEvidence) {
        expect(erIds.has(re)).toBe(true);
      }
    }
  });

  it("routes have English names", () => {
    for (const route of routeArray) {
      expect(route.name.en).toBeTruthy();
    }
  });

  it("routes have direction field", () => {
    const validDirections = new Set(["supports", "challenges", "mixed"]);
    for (const route of routeArray) {
      expect(validDirections.has(route.direction)).toBe(true);
    }
  });

  it("independence groups are consistent", () => {
    const groups = new Map<string, RouteDefinition[]>();
    for (const route of routeArray) {
      const g = route.independenceGroup;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(route);
    }
    expect(groups.size).toBeGreaterThanOrEqual(1);
  });

  it("VGCC and RPM routes are independent", () => {
    const vgcc = routeArray.find((r) => r.id === "route.vgcc-sperm-fecundability");
    const rpm = routeArray.find((r) => r.id === "route.rpm-melatonin-clock");
    if (vgcc && rpm) {
      const sharedClaims = vgcc.routeClaims.filter((c) => rpm.routeClaims.includes(c));
      const sharedEvidence = vgcc.routeEvidence.filter((e) => rpm.routeEvidence.includes(e));
      expect(sharedClaims.length).toBe(0);
      expect(sharedEvidence.length).toBe(0);
      expect(vgcc.independenceGroup).not.toBe(rpm.independenceGroup);
    }
  });
});
