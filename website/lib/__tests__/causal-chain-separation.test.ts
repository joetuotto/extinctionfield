import { describe, expect, it } from "vitest";

import {
  BERM_CAUSAL_EDGES_V2,
  BERM_CAUSAL_NODES_V2,
} from "@/lib/causalChainV2Data";
import { GUIDED_SCENES } from "@/lib/causalAtlasData";
import { NODES as ATLAS_NODES } from "@/lib/causalMapData";

describe("public causal-chain separation", () => {
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
