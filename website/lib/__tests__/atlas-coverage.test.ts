import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { getArticleBySlug } from "@/lib/articles";
import graph from "@/data/causal-graph.json";
import extensions from "@/data/causal-atlas-extensions.json";
import { MECHANISM_CARDS } from "@/lib/modulome/stateModel";
import { NODES as originalNodes } from "@/lib/causalMapData";
import { NODES, EDGES, MODEL_NODE_MAP, MODULOME_CARD_MAP, SUBATLASES, nodesForAtlas, atlasesForNode, filterAtlasNodes, STEPPER_PATHS, computeLayout, NODE_DIMENSIONS } from "@/lib/causalAtlasData";

const ids = new Set(NODES.map(n => n.id));
describe("Atlas completeness against independent source inventories", () => {
  it("retains every original node and covers every canonical semantic node", () => {
    for (const n of originalNodes) expect(ids.has(n.id), n.id).toBe(true);
    expect(Object.keys(MODEL_NODE_MAP).sort()).toEqual(Object.keys(graph.nodes).sort());
    for (const [modelId, atlasId] of Object.entries(MODEL_NODE_MAP)) {
      expect(NODES.find(n => n.id === atlasId)?.modelIds, modelId).toContain(modelId);
    }
  });
  it("preserves every model edge and its inference, derivation or conditional-response role", () => {
    for (const e of graph.edges) {
      const from = MODEL_NODE_MAP[e.from as keyof typeof MODEL_NODE_MAP];
      const to = MODEL_NODE_MAP[e.to as keyof typeof MODEL_NODE_MAP];
      const actual = EDGES.find(e => e.from === from && e.to === to);
      expect(actual, `${from}->${to}`).toBeDefined();
      if (e.kind === "inference_input") expect(actual?.relation).toBe("inference");
      if (e.kind === "conditional_response") expect(actual?.relation).toBe("bridge");
      if (e.kind === "derived_geometry") expect(actual?.relation).toBe("derived");
    }
  });
  it("covers every reviewed model and website channel, and every modulome card", () => {
    for (const id of [...extensions.modelAuditNodeIds, ...Object.values(extensions.siteAuditNodeMap)]) expect(ids.has(id), id).toBe(true);
    for (const card of MECHANISM_CARDS) expect(ids.has(MODULOME_CARD_MAP[card.cardId]), card.cardId).toBe(true);
  });
  it("has real, traceable source paths and working page targets", () => {
    for (const n of NODES) {
      expect(n.sourcePaths.length, n.id).toBeGreaterThan(0);
      for (const source of n.sourcePaths) expect(existsSync(path.resolve("..", source)), `${n.id}: ${source}`).toBe(true);
      if (n.detail?.link) {
        const route = n.detail.link.split("#")[0].split("?")[0];
        expect(existsSync(path.join("app/[locale]", route, "page.tsx")) || (route.startsWith("/articles/") && Boolean(getArticleBySlug(route.split("/").at(-1)!))), `${n.id}: ${route}`).toBe(true);
      }
    }
    for (const e of EDGES) for (const source of e.sourcePaths) expect(existsSync(path.resolve("..", source)), `${e.from}->${e.to}: ${source}`).toBe(true);
  });
  it("makes every named website channel and feedback searchable", () => {
    for (const a of extensions.searchAliases) {
      expect(ids.has(a.nodeId), a.alias).toBe(true);
      expect(filterAtlasNodes(NODES, a.alias).map(n => n.id), a.alias).toContain(a.nodeId);
    }
    for (const c of extensions.sourceNamedChannelInventory) {
      const id = c.sourceLabel.split(":")[0];
      expect(extensions.searchAliases.some(a => a.alias === id), id).toBe(true);
    }
  });
  it("does not isolate any identified channel", () => {
    const connected = new Set(EDGES.flatMap(e => [e.from, e.to]));
    expect(NODES.filter(n => !connected.has(n.id)).map(n => n.id)).toEqual([]);
  });
});

describe("Shared subatlas structure", () => {
  it("keeps the whole atlas and exposes each channel in at least one focused view", () => {
    expect(nodesForAtlas("all").map(n => n.id)).toEqual(NODES.map(n => n.id));
    for (const n of NODES) expect(atlasesForNode(n.id).length, n.id).toBeGreaterThan(0);
    for (const a of SUBATLASES.filter(a => a.id !== "all")) {
      expect(nodesForAtlas(a.id).length).toBeLessThan(NODES.length);
      for (const id of a.anchors) expect(ids.has(id), `${a.id}: ${id}`).toBe(true);
    }
  });
  it("lays out filtered nodes without overlaps or missing positions", () => {
    for (const a of SUBATLASES) {
      const members = nodesForAtlas(a.id);
      const positions = computeLayout(members);
      for (const n of members) expect(Number.isFinite(positions[n.id]?.x) && Number.isFinite(positions[n.id]?.y), n.id).toBe(true);
      for (let i = 0; i < members.length; i++) for (let j = i + 1; j < members.length; j++) {
        const p = positions[members[i].id], q = positions[members[j].id];
        expect(Math.abs(p.x - q.x) >= NODE_DIMENSIONS.w || Math.abs(p.y - q.y) >= NODE_DIMENSIONS.h, `${members[i].id}/${members[j].id}`).toBe(true);
      }
    }
  });
  it("only uses real consecutive transitions in guided routes", () => {
    for (const [key, p] of Object.entries(STEPPER_PATHS)) for (let i = 1; i < p.ids.length; i++) {
      expect(EDGES.some(e => e.from === p.ids[i-1] && e.to === p.ids[i]), `${key}: ${p.ids[i-1]}->${p.ids[i]}`).toBe(true);
    }
  });
  it("searches bilingual descriptions and canonical identifiers and combines filters", () => {
    expect(filterAtlasNodes(NODES, "CIRCADIAN_COORDINATION").map(n => n.id)).toContain("circadian_coordination");
    expect(filterAtlasNodes(NODES, "istukkaeste").map(n => n.id)).toContain("barrier_placenta");
    expect(filterAtlasNodes(NODES, "Varroa", "ecology").map(n => n.id)).toContain("eco_varroa");
    expect(filterAtlasNodes(NODES, "Varroa", "foundations")).toEqual([]);
    expect(filterAtlasNodes(NODES, "not-a-real-channel")).toEqual([]);
  });
  it("keeps study observations out of biological causal paths", () => {
    for (const e of EDGES.filter(e => e.from === "epi_kaiser_series" || e.to === "epi_kaiser_series")) expect(e.relation).toBe("association");
  });
});
