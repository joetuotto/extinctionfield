import { describe, expect, it } from "vitest";

import graph from "@/data/causal-graph.json";
import {
  CANONICAL_CAUSAL_EDGES,
  CANONICAL_CAUSAL_GRAPH_VERSION,
  CANONICAL_CAUSAL_NODES,
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
});
