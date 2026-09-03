import { describe, expect, it } from "vitest";

import {
  BERM_CAUSAL_EDGES_V2,
  BERM_CAUSAL_NODES_V2,
} from "@/lib/causalChainV2Data";
import { GUIDED_SCENES } from "@/lib/causalAtlasData";
import { NODES as ATLAS_NODES } from "@/lib/causalMapData";

describe("public causal-chain separation", () => {
  it("places FieldState behind an explicit open L2 boundary", () => {
    const bridge = BERM_CAUSAL_NODES_V2.find((node) => node.id === "l2-bridge");

    expect(bridge?.title).toMatch(/not yet derived/i);
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

  it("keeps the detailed atlas on the same open-bridge interpretation", () => {
    const bridge = ATLAS_NODES.find((node) => node.id === "mod_geometry");
    const bridgeCopy = `${bridge?.detail?.en.mechanism} ${bridge?.detail?.fi.mechanism}`;
    const tourCopy = GUIDED_SCENES.flatMap((scene) => [
      scene.description.en,
      scene.description.fi,
    ]).join(" ");

    expect(bridge?.label.en).toMatch(/open L2/i);
    expect(bridgeCopy).toMatch(/has yet been derived|ei ole vielä johdettu/i);
    expect(bridgeCopy).not.toMatch(/Lindgren.{0,40}(produces|tuottaa).*χ/i);
    expect(tourCopy).toMatch(/L2.*open|L2-kytkentä on avoin/i);
    expect(tourCopy).toMatch(/proposes|ehdottaa/i);
  });
});
