import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { ExplanatoryLevelsDiagram, ProxyMaskingCurveExplorer } from "../ProxyCausalVisuals";

afterEach(cleanup);

describe("proxy causal figures preserve server-rendered content", () => {
  it.each(["en", "fi", "ja", "fr", "ko"])("hydrates descriptions and retains working controls in %s", async (locale) => {
    const figures = <><ProxyMaskingCurveExplorer locale={locale} /><ExplanatoryLevelsDiagram locale={locale} /></>;
    const container = document.createElement("div");
    // Parse the server HTML before hydration: CSR rendering misses SVG title/desc text boundaries.
    container.innerHTML = renderToString(figures);
    document.body.append(container);
    const serverFigures = [...container.querySelectorAll("figure")];
    const serverSvg = container.querySelector("svg");
    const recoverableErrors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, figures, { onRecoverableError: (error) => recoverableErrors.push(error) });
      });
      expect(recoverableErrors).toEqual([]);
      expect(container.querySelector("svg")).toBe(serverSvg);
      [...container.querySelectorAll("figure")].forEach((figure, index) => expect(figure).toBe(serverFigures[index]));
      for (const description of container.querySelectorAll("svg title, svg desc")) {
        expect(description.textContent?.trim()).toBeTruthy();
        expect(description.childNodes).toHaveLength(1);
        expect(description.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      }
      fireEvent.click(within(container).getByRole("button", { name: locale === "fi" ? "Näytä BERM:n kenttähaara" : "Show BERM’s field pathway" }));
      expect(container.querySelector('[data-curve="field"]')).toBeInTheDocument();
      fireEvent.click(within(container).getByRole("button", { name: locale === "fi" ? "BERM:n yhdistävä rakenne" : "BERM’s connecting structure" }));
      expect(container.querySelector('[data-feedback="later-environment"]')).toBeInTheDocument();
      expect(recoverableErrors).toEqual([]);
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });
});

describe("ProxyMaskingCurveExplorer", () => {
  it("reveals an additional field branch without changing the outcome or proxy curves", () => {
    render(<ProxyMaskingCurveExplorer locale="fi" />);
    const outcome = document.querySelector('[data-curve="outcome"]')!.getAttribute("points");
    const proxy = document.querySelector('[data-curve="proxy"]')!.getAttribute("points");
    expect(document.querySelector('[data-curve="field"]')).toBeNull();
    const reveal = screen.getByRole("button", { name: "Näytä BERM:n kenttähaara" });
    fireEvent.click(reveal);
    expect(reveal).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector('[data-curve="field"]')).toBeInTheDocument();
    expect(document.querySelector('[data-curve="outcome"]')).toHaveAttribute("points", outcome);
    expect(document.querySelector('[data-curve="proxy"]')).toHaveAttribute("points", proxy);
    expect(screen.getByRole("img")).toHaveAccessibleDescription(/Molemmat akselit ovat yksiköttömiä/);
    fireEvent.click(reveal);
    expect(document.querySelector('[data-curve="field"]')).toBeNull();
  });

  it("distinguishes parallel branches from a causal intermediate step while preserving the plotted relationship", () => {
    render(<ProxyMaskingCurveExplorer locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Show BERM’s field pathway" }));
    const outcome = document.querySelector('[data-curve="outcome"]')!.getAttribute("points");
    const proxyBranch = screen.getByRole("group", { name: "Proxy branch" });
    const fieldBranch = screen.getByRole("group", { name: "Field branch" });
    expect(within(proxyBranch).getByText("Technology-use indicator")).toBeInTheDocument();
    expect(within(proxyBranch).getByText(/no EMF → proxy arrow/)).toBeInTheDocument();
    expect(within(fieldBranch).getByText("Receiving biology")).toBeInTheDocument();
    expect(within(fieldBranch).queryByText("Technology-use indicator")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Intermediate step" }));
    expect(screen.queryByRole("group", { name: "Proxy branch" })).toBeNull();
    expect(screen.getByText("Sleep or appetite", { selector: "p" })).toBeInTheDocument();
    expect(document.querySelector('[data-curve="outcome"]')).toHaveAttribute("points", outcome);
    expect(screen.getByText(/curve values are chosen/, { selector: "figcaption" })).toBeInTheDocument();
  });
});

describe("ExplanatoryLevelsDiagram", () => {
  it("connects the same observation levels and adds explicitly later feedback", () => {
    render(<ExplanatoryLevelsDiagram locale="fi" />);
    const originalObservations = Array.from(document.querySelectorAll('[data-level]')).map((level) => level.lastElementChild!.lastElementChild!.textContent);
    expect(screen.queryByText("Lindgren 2025: geometria")).toBeNull();
    expect(document.querySelector("[data-feedback]")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "BERM:n yhdistävä rakenne" }));
    expect(screen.getByRole("heading", { name: "Lindgren 2025: geometria" })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-level]')).toHaveLength(5);
    const connectedObservations = Array.from(document.querySelectorAll('[data-level]')).map((level) => level.lastElementChild!.lastElementChild!.textContent);
    expect(connectedObservations).toEqual(originalObservations);
    expect(screen.getByText("Ehdollinen biologinen liitos")).toBeInTheDocument();
    expect(screen.getByText(/ei aiemman altistuksen syy/)).toBeInTheDocument();
    expect(screen.getByText(/ei kaikkien seurausten sovittamista yhdellä vapaalla kertoimella/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Erilliset lähiselitykset" }));
    expect(document.querySelector("[data-feedback]")).toBeNull();
    expect(screen.getByText(/Kukin lähiselitys kattaa oman vaiheensa/)).toBeInTheDocument();
  });

  it.each(["ja", "fr", "ko"])("uses complete English fallback for %s", (locale) => {
    render(<><ProxyMaskingCurveExplorer locale={locale} /><ExplanatoryLevelsDiagram locale={locale} /></>);
    expect(screen.getByRole("button", { name: "Show BERM’s field pathway" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "BERM’s connecting structure" }));
    expect(screen.getByRole("heading", { name: "Lindgren 2025: geometry" })).toBeInTheDocument();
    expect(document.querySelectorAll("p:empty, h3:empty, h4:empty, button:empty")).toHaveLength(0);
  });
});
