// @vitest-environment node

import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest } from "next/server";
import { proxy } from "../../proxy";
import MathPage from "../../app/[locale]/model/math/page";

describe("legacy mathematics links", () => {
  it.each(["en", "fi", "ja", "fr", "ko"])(
    "redirects %s links to a page that renders the linked mathematical sections",
    async (locale) => {
      const response = proxy(new NextRequest(`https://www.extinctionfield.com/${locale}/mathematics?from=home`));
      expect(response?.status).toBe(308);
      expect(response?.headers.get("location")).toBe(`https://www.extinctionfield.com/${locale}/model/math?from=home`);

      // These fragments previously landed inside an unmounted, collapsed panel.
      // Verify the destination's rendered content, not just its route string.
      const html = renderToStaticMarkup(await MathPage({ params: Promise.resolve({ locale }) }));
      for (const id of ["lindgren", "falsification", "evo-calibration", "three-channel-derivation"])
        expect(html).toContain(`id="${id}"`);
    },
  );

  it("preserves locale negotiation for an unprefixed legacy link", () => {
    const response = proxy(new NextRequest("https://www.extinctionfield.com/mathematics", {
      headers: { "accept-language": "fi-FI,fi;q=0.9" },
    }));
    expect(response?.headers.get("location")).toBe("https://www.extinctionfield.com/fi/model/math");
  });

  it("serves the canonical destination without redirecting it again", () => {
    expect(proxy(new NextRequest("https://www.extinctionfield.com/fi/model/math"))).toBeUndefined();
  });
});
