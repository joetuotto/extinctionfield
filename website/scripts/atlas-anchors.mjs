/** Curated presentation bindings are the source of dynamic ClaimRef locations. */
export function atlasBindingAnchors(bindings, knownClaimIds, source = "") {
  if (!bindings || !bindings.nodes || typeof bindings.nodes !== "object" || Array.isArray(bindings.nodes) || !Array.isArray(bindings.edges)) {
    throw new Error("Invalid atlas-claim-bindings: nodes and edges are required");
  }
  const anchors = [];
  const add = (claimIds, target, offset) => {
    if (!Array.isArray(claimIds) || !claimIds.length) throw new Error("An atlas binding requires claimIds");
    for (const claimId of new Set(claimIds)) {
      if (!knownClaimIds.has(claimId)) throw new Error(`Atlas binding references unknown claim: ${claimId}`);
      anchors.push({
        claimId,
        file: "data/atlas-claim-bindings.json",
        line: source.slice(0, Math.max(0, offset)).split("\n").length,
        route: "/map",
        ...target,
      });
    }
  };
  for (const [nodeId, claimIds] of Object.entries(bindings.nodes)) {
    add(claimIds, { kind: "atlas-node", nodeId }, source.indexOf(JSON.stringify(nodeId)));
  }
  let edgeOffset = source.indexOf('"edges"');
  for (const edge of bindings.edges) {
    if (typeof edge.from !== "string" || typeof edge.to !== "string" || edge.scope !== "component") {
      throw new Error("An atlas edge binding requires from, to and component scope");
    }
    edgeOffset = source.indexOf('"from"', Math.max(0, edgeOffset));
    add(edge.claimIds, { kind: "atlas-edge", from: edge.from, to: edge.to, scope: edge.scope }, edgeOffset);
    edgeOffset++;
  }
  return anchors;
}
