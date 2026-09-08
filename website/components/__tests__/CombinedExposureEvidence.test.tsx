import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { CombinedExposureDiagram } from "../CombinedExposureDiagram";
import { CombinedExposureEvidence } from "../CombinedExposureEvidence";
import { CombinedExposurePanel, type CombinedExposureFocus } from "../CombinedExposurePanel";
import { COMBINED_EXPOSURE_COPY } from "@/lib/combinedExposureData";
import { canonicalReferenceId, indexedReference } from "@/lib/referenceIndex";

afterEach(cleanup);

const SECTION_IDS = [
  "model-composition", "contraceptive-state", "material-device", "component-studies",
  "channel-conditions", "proxy-masking", "implemented-model",
];

describe("CombinedExposureDiagram", () => {
  it.each(["fi", "en", "ja", "fr", "ko"])("retains all four stages while controls select emphasis in %s", locale => {
    const { container } = render(<CombinedExposureDiagram locale={locale} />);
    const figure = screen.getByRole("figure");
    expect(figure).toHaveAccessibleName();
    const group = within(figure).getByRole("group");
    const buttons = within(group).getAllByRole("button");
    expect(buttons).toHaveLength(3);
    const stages = [...container.querySelectorAll("[data-exposure-stage]")];
    const originalText = stages.map(stage => stage.textContent);
    expect(stages).toHaveLength(4);
    const emphasis = [[0, 1], [2], [2, 3]];
    for (const [selected, button] of buttons.entries()) {
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toHaveAttribute("tabindex", "-1");
      button.focus();
      expect(button).toHaveFocus();
      fireEvent.click(button);
      for (const [index, control] of buttons.entries()) {
        expect(control).toHaveAttribute("aria-pressed", String(index === selected));
      }
      const note = document.getElementById(button.getAttribute("aria-controls")!);
      expect(note).toHaveAttribute("aria-live", "polite");
      expect(note).toBeVisible();
      expect(note?.textContent?.trim()).toBeTruthy();
      for (const [index, stage] of stages.entries()) {
        expect(stage).toBeVisible();
        expect(stage).toHaveAttribute("data-emphasized", String(emphasis[selected].includes(index)));
      }
      expect(stages.map(stage => stage.textContent)).toEqual(originalText);
    }
    expect(container.querySelectorAll("h3:empty, h4:empty, p:empty, button:empty")).toHaveLength(0);
  });

  it("hydrates the server-rendered diagram without replacing stages or breaking controls", async () => {
    const element = <CombinedExposureDiagram locale="en" />;
    const container = document.createElement("div");
    container.innerHTML = renderToString(element);
    document.body.append(container);
    const serverStages = [...container.querySelectorAll("[data-exposure-stage]")];
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => { root = hydrateRoot(container, element, { onRecoverableError: error => errors.push(error) }); });
      expect(errors).toEqual([]);
      expect([...container.querySelectorAll("[data-exposure-stage]")]).toEqual(serverStages);
      const button = within(container).getByRole("button", { name: "Shared biological pathway" });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(serverStages[3]).toHaveAttribute("data-emphasized", "true");
      expect(errors).toEqual([]);
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });
});

describe("CombinedExposureEvidence section and source integration", () => {
  it.each(["fi", "en", "ja", "fr", "ko"])("resolves the contents and incoming contextual links in %s", locale => {
    const { container } = render(<CombinedExposureEvidence locale={locale} />);
    const contents = screen.getByRole("navigation", { name: locale === "fi" ? "Tällä sivulla" : "On this page" });
    const links = within(contents).getAllByRole("link");
    expect(links.map(link => link.getAttribute("href"))).toEqual(SECTION_IDS.map(id => `#${id}`));
    for (const id of SECTION_IDS) {
      const targets = container.querySelectorAll(`[id="${id}"]`);
      expect(targets, id).toHaveLength(1);
      expect(within(targets[0] as HTMLElement).getByRole("heading", { level: 2 })).toBeVisible();
    }
    const focuses: CombinedExposureFocus[] = ["model", "pharmacology", "materials", "hormones", "proxy", "microbiome", "measurement"];
    for (const focus of focuses) {
      const panel = render(<CombinedExposurePanel locale={locale} focus={focus} />);
      const href = within(panel.container).getByRole("link").getAttribute("href")!;
      expect(href).toMatch(new RegExp(`^/${locale}/evidence/combined-exposures#`));
      const targetId = href.split("#")[1];
      expect(container.querySelectorAll(`[id="${targetId}"]`), href).toHaveLength(1);
      panel.unmount();
    }
    expect(container.textContent).not.toMatch(/\[\[ref:|undefined/);
    expect(container.querySelectorAll("h2:empty, h3:empty, h4:empty, p:empty, a:empty")).toHaveLength(0);
    expect(within(container).getByRole("link", { name: /\(JSON\)/ })).toHaveAttribute("href", "/data/combined-exposures.json");
  });

  it.each(["fi", "en"])("keeps three independent factors distinct from the four process stages in %s", locale => {
    const { container } = render(<CombinedExposureEvidence locale={locale} />);
    const composition = locale === "fi" ? /kolme syötetason tekijää/ : /three input-level factors/;
    const statement = screen.getByText(composition);
    expect(statement).toHaveTextContent(locale === "fi" ? /ei neljäs riippumaton altiste/ : /not a fourth independent exposure/);
    expect(container.querySelectorAll("[data-exposure-stage]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-claim-id]")).toHaveLength(3);
    for (const claim of ["state-conditioned-coexposure", "contraceptive-receiver-state", "material-device-transfer"]) {
      expect(container.querySelector(`[data-claim-id="claim.synergy.${claim}"]`)).toBeInTheDocument();
    }
  });

  it.each(["fi", "en"])("renders study and inline citations as canonical source links in %s", locale => {
    const { container } = render(<CombinedExposureEvidence locale={locale} />);
    const copy = locale === "fi" ? COMBINED_EXPOSURE_COPY.fi : COMBINED_EXPOSURE_COPY.en;
    const studyIds = copy.studies.flatMap(study => study.refs);
    for (const referenceId of studyIds) {
      expect(indexedReference(referenceId), referenceId).not.toBeNull();
      const citation = container.querySelector(`[data-reference-id="${canonicalReferenceId(referenceId)}"]`);
      expect(citation, referenceId).toBeInTheDocument();
      expect(citation, referenceId).not.toHaveAttribute("data-reference-status", "unknown");
      expect(citation?.querySelector(`a[href="/${locale}/references/${canonicalReferenceId(referenceId)}"]`), referenceId).toBeInTheDocument();
    }
    expect(container.querySelectorAll('[data-reference-status="unknown"]')).toHaveLength(0);
    expect(container.textContent).not.toContain("[[ref:");
  });
});
