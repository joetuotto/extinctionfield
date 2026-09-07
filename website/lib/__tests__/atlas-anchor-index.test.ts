import { describe, expect, it } from "vitest";
import { atlasBindingAnchors } from "../../scripts/atlas-anchors.mjs";

describe("dynamic atlas ClaimRef indexing", () => {
  const known = new Set(["claim.test.one", "claim.test.two"]);
  it("indexes node and component-edge bindings with source locations", () => {
    const data = { nodes: { receiver: ["claim.test.one"] }, edges: [{ from: "receiver", to: "output", scope: "component", claimIds: ["claim.test.two"] }] };
    const anchors = atlasBindingAnchors(data, known, JSON.stringify(data, null, 2));
    expect(anchors).toHaveLength(2);
    expect(anchors[0]).toMatchObject({ kind: "atlas-node", nodeId: "receiver", claimId: "claim.test.one", route: "/map" });
    expect(anchors[1]).toMatchObject({ kind: "atlas-edge", from: "receiver", to: "output", scope: "component", claimId: "claim.test.two" });
    expect(anchors.every((a: { line: number }) => a.line > 1)).toBe(true);
  });
  it("rejects unknown dynamic claims instead of silently omitting them", () => {
    expect(() => atlasBindingAnchors({ nodes: { receiver: ["claim.missing.one"] }, edges: [] }, known)).toThrow("unknown claim");
  });
  it("does not turn a component binding into whole-route validation", () => {
    expect(() => atlasBindingAnchors({ nodes: {}, edges: [{ from: "a", to: "b", scope: "whole-route", claimIds: ["claim.test.one"] }] }, known)).toThrow("component scope");
  });
});
