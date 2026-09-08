import { describe, expect, it } from "vitest";

import {
  BERM_CAUSAL_EDGES_V2,
  BERM_CAUSAL_NODES_V2,
} from "@/lib/causalChainV2Data";
import { GUIDED_SCENES } from "@/lib/causalAtlasData";
import { NODES as ATLAS_NODES } from "@/lib/causalMapData";

describe("public causal-chain separation", () => {
  it("keeps the full Maxwell gate and the compound χ reduction in the active graph", () => {
    const geometry = BERM_CAUSAL_NODES_V2.find((node) => node.id === "geometry");
    const chi = BERM_CAUSAL_NODES_V2.find((node) => node.id === "chi");
    const geometryCopy = `${geometry?.mechanism} ${geometry?.keyReferences
      .map((reference) => `${reference.keyFinding} ${reference.keyFinding_en}`)
      .join(" ")}`;
    const chiEdge = BERM_CAUSAL_EDGES_V2.find(
      (edge) => edge.from === "geometry" && edge.to === "chi",
    );

    expect(geometryCopy).toMatch(/Lindgren(?:'s|in) metric|Lindgrenin metriikka/i);
    expect(geometryCopy).toMatch(/variational principle|variaatioperiaate/i);
    expect(geometryCopy).toMatch(/Weyl/i);
    expect(geometryCopy).toMatch(/Bianchi/i);
    expect(geometry?.mechanism).toMatch(/necessary but not sufficient/i);

    expect(chi?.epistemicLevel).toBe("L1+L0/L2");
    expect(`${chi?.sublabel} ${chi?.mechanism}`).toMatch(/L1 \+ L0\/L2/);
    expect(chi?.mechanism).toMatch(/directional derivative/i);
    expect(chi?.mechanism).toMatch(/spatial\/scalar reduction/i);
    expect(chiEdge?.label).toMatch(/directional derivative.*spatial reduction/i);
    expect(chiEdge?.label).not.toMatch(/^geometric consequence$/i);
  });

  it("places FieldState behind an explicit conditional L2 boundary", () => {
    const bridge = BERM_CAUSAL_NODES_V2.find((node) => node.id === "l2-bridge");

    expect(bridge?.title).toMatch(/operator form derived/i);
    expect(bridge?.mechanism).toMatch(/tissue kernels.*remain open/i);
    expect(BERM_CAUSAL_EDGES_V2).toContainEqual(
      expect.objectContaining({ from: "fieldstate", to: "l2-bridge" }),
    );
    expect(BERM_CAUSAL_EDGES_V2).toContainEqual(
      expect.objectContaining({ from: "l2-bridge", to: "mechanisms" }),
    );
    expect(BERM_CAUSAL_EDGES_V2).not.toContainEqual(
      expect.objectContaining({ from: "fieldstate", to: "mechanisms" }),
    );
  });

  it("keeps the detailed atlas on the same conditional-operator interpretation", () => {
    const bridge = ATLAS_NODES.find((node) => node.id === "mod_geometry");
    const bridgeCopy = `${bridge?.detail?.en.mechanism} ${bridge?.detail?.fi.mechanism}`;
    const tourCopy = GUIDED_SCENES.flatMap((scene) => [
      scene.description.en,
      scene.description.fi,
    ]).join(" ");

    expect(bridge?.label.en).toMatch(/conditional L2/i);
    expect(bridgeCopy).toMatch(/conditional|minimaaliselle materiakytkennälle/i);
    expect(bridgeCopy).toMatch(/tissue kernel|kudosydin/i);
    expect(tourCopy).toMatch(/L2.*conditional|L2-operaattorin muoto on johdettu/i);
    expect(tourCopy).toMatch(/tissue kernel|kudosydin/i);
  });
});
