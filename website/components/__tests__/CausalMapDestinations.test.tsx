import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes, ReactElement } from "react";
import { NODES } from "../../lib/causalMapData";
import ModelPage from "../../app/[locale]/model/page";
import MathPage from "../../app/[locale]/model/math/page";
import ObjectionsPage from "../../app/[locale]/about/objections/page";

vi.mock("next/link", () => ({ default: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a> }));

function documentFor(element: ReactElement) {
  return new DOMParser().parseFromString(renderToStaticMarkup(element), "text/html");
}

const locales = ["en", "fi", "ja", "fr", "ko"];
const repairedNodes = ["mech_ttype_bifurcation", "demo_biocap", "mech_window_effect"];

describe("causal map links reach their actual explanation", () => {
  it.each(locales)("links channel sensitivity, reproductive capacity and dose windows to substantive sections in %s", async (locale) => {
    const params = { params: Promise.resolve({ locale }) };
    const documents = {
      "/model": documentFor(await ModelPage(params)),
      "/model/math": documentFor(await MathPage(params)),
      "/about/objections": documentFor(await ObjectionsPage(params)),
    };
    const sections = new Map<string, HTMLElement>();
    for (const id of repairedNodes) {
      const node = NODES.find((item) => item.id === id);
      expect(node?.detail?.link, `${id} retains an explanatory destination`).toBeTruthy();
      const target = new URL(node!.detail!.link!, "https://example.test");
      const doc = documents[target.pathname as keyof typeof documents];
      expect(doc, `${id} reaches a current canonical page`).toBeDefined();
      const section = doc.getElementById(target.hash.slice(1));
      expect(section, `${locale}: ${id} reaches an existing section`).not.toBeNull();
      expect(doc.querySelectorAll(`[id="${target.hash.slice(1)}"]`)).toHaveLength(1);
      expect(section?.querySelector("h2, h3, h4")).not.toBeNull();
      sections.set(id, section!);
    }

    // A channel mechanism belongs with the Cav3/window-current explanation,
    // while the separate bioCap node must retain its reproductive-capacity model.
    expect(sections.get("mech_ttype_bifurcation")!.textContent).toContain("Cav3");
    expect(sections.get("mech_ttype_bifurcation")!.textContent).toContain("Cav1.3");
    if (locale === "en") {
      expect(sections.get("mech_ttype_bifurcation")!.textContent).toContain("bifurcation point");
      expect(sections.get("mech_ttype_bifurcation")!.textContent).toContain("window current");
    }
    expect(sections.get("demo_biocap")!.textContent).toContain("bioCap");
    expect(sections.get("demo_biocap")!.textContent).toContain("cumEMF");

    // The translated dose-window response already exists. Its stable anchor must
    // identify that same cited response instead of depending on translated prose.
    const windowSection = sections.get("mech_window_effect")!;
    expect(windowSection.querySelector('[data-reference-id="adey1976_calcium_window"]')).not.toBeNull();
    expect(windowSection.querySelectorAll("p").length).toBeGreaterThan(2);
  }, 30000);
});
