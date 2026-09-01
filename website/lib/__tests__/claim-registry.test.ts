import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const DATA_DIR = resolve(__dirname, "../../data");

function loadJSON(filename: string) {
  return JSON.parse(readFileSync(resolve(DATA_DIR, filename), "utf-8"));
}

const graph = loadJSON("causal-graph.json");
const claims = loadJSON("claims.json");

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
    for (const [key, node] of Object.entries(graph.nodes) as any) {
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
    for (const [id, node] of Object.entries(graph.nodes) as any) {
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
    for (const group of Object.values(graph.ui_groups) as any) {
      for (const nid of group.contains) {
        grouped.add(nid);
      }
    }
    for (const id of nodeIds) {
      expect(grouped.has(id)).toBe(true);
    }
  });

  it("all nodes have English labels", () => {
    for (const [id, node] of Object.entries(graph.nodes) as any) {
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
        expect(nodeIds.has(claim.target.nodeId)).toBe(true);
      }
    }
  });

  it("evidence relations reference valid claims", () => {
    const claimIds = new Set(claims.claims.map((c: any) => c.id));
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
