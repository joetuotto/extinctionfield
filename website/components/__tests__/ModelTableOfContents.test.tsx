import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes, ReactElement } from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ModelTableOfContents, getModelTocDestination } from "../ModelTableOfContents";
import MathPage from "../../app/[locale]/model/math/page";
import FieldStatePage from "../../app/[locale]/measurement/fieldstate/page";
import FieldStateMathPage from "../../app/[locale]/measurement/fieldstate/math/page";
import ModelPage from "../../app/[locale]/model/page";

vi.mock("next/link", () => ({ default: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a> }));

const observed: Element[] = [];
const observers: { options?: IntersectionObserverInit; disconnect: ReturnType<typeof vi.fn> }[] = [];
const resized: Element[] = [];
const disconnectResize = vi.fn();
let observerCallback: IntersectionObserverCallback;
let resizeCallback: ResizeObserverCallback;
beforeEach(() => {
  observed.length = 0;
  observers.length = 0;
  resized.length = 0;
  disconnectResize.mockClear();
  vi.stubGlobal("IntersectionObserver", class {
    disconnect = vi.fn();
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      observerCallback = callback;
      observers.push({ options, disconnect: this.disconnect });
    }
    observe(element: Element) { observed.push(element); }
  });
  vi.stubGlobal("ResizeObserver", class {
    constructor(callback: ResizeObserverCallback) { resizeCallback = callback; }
    observe(element: Element) { resized.push(element); }
    disconnect = disconnectResize;
  });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function documentFor(element: ReactElement) {
  return new DOMParser().parseFromString(renderToStaticMarkup(element), "text/html");
}

const repairedIds = [
  "fieldstate-input", "static-interface", "organ-states", "asfr-tfr", "premise",
  "evo-calibration", "three-channel-derivation", "fieldstate", "static-interface-math",
  "organ-state", "cohort", "gme", "validation",
];
const locales = ["en", "fi", "ja", "fr", "ko"];

describe("model contents follows the sections that explain each topic", () => {
  it("moves the visible-section boundary when the header wraps and releases both observers", () => {
    const headerView = render(<nav data-site-header />);
    const header = headerView.container.querySelector("nav")!;
    let height = 64;
    vi.spyOn(header, "getBoundingClientRect").mockImplementation(() => new DOMRect(0, 0, 1000, height));
    const view = render(<><section id="modulome" /><ModelTableOfContents locale="en" /></>);
    expect(resized).toEqual([header]);
    expect(observers[0].options).toMatchObject({ rootMargin: "-80px 0px -60% 0px" });

    height = 144;
    act(() => resizeCallback([], {} as ResizeObserver));
    expect(observers).toHaveLength(2);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(observers[1].options).toMatchObject({ rootMargin: "-160px 0px -60% 0px" });
    expect(observed.filter((element) => element.id === "modulome")).toHaveLength(2);
    act(() => resizeCallback([], {} as ResizeObserver));
    expect(observers).toHaveLength(2);

    height = 64;
    act(() => window.dispatchEvent(new Event("resize")));
    expect(observers[2].options).toMatchObject({ rootMargin: "-80px 0px -60% 0px" });
    view.unmount();
    expect(observers[2].disconnect).toHaveBeenCalledOnce();
    expect(disconnectResize).toHaveBeenCalledOnce();
    height = 144;
    act(() => window.dispatchEvent(new Event("resize")));
    expect(observers).toHaveLength(3);
  });

  it("uses the original 64-pixel header fallback when no measured header is available", () => {
    render(<ModelTableOfContents locale="en" />);
    expect(observers[0].options).toMatchObject({ rootMargin: "-80px 0px -60% 0px" });
    expect(resized).toEqual([]);
  });

  it.each(locales)("resolves all moved topics to actual rendered destination sections in %s", async (locale) => {
    const params = { params: Promise.resolve({ locale }) };
    const documents = {
      "/model/math": documentFor(await MathPage(params)),
      "/measurement/fieldstate": documentFor(await FieldStatePage(params)),
      "/measurement/fieldstate/math": documentFor(await FieldStateMathPage(params)),
      "/model": documentFor(await ModelPage(params)),
    };
    for (const id of repairedIds) {
      const target = getModelTocDestination(id, locale);
      const url = new URL(target.href, "https://example.test");
      const path = url.pathname.slice(locale.length + 1) as keyof typeof documents;
      const section = documents[path]?.getElementById(url.hash.slice(1));
      expect(section, `${locale}: ${id} must reach a real section at ${target.href}`).not.toBeNull();
      expect(section?.querySelector("h2, h3"), `${id} must reach explanatory content, not an empty alias`).not.toBeNull();
      expect(target.href).not.toContain(`/${locale}/mathematics`);
    }
  }, 30000);

  it("keeps measurement records, receptor/organ summaries and demographic endpoints in their proper explanatory sections", async () => {
    const params = { params: Promise.resolve({ locale: "en" }) };
    const measurement = documentFor(await FieldStatePage(params));
    const math = documentFor(await FieldStateMathPage(params));
    const physics = documentFor(await MathPage(params));
    expect(measurement.getElementById("fieldstate-input")?.textContent).toMatch(/measur|observ/i);
    expect(measurement.getElementById("organ-states")?.textContent).toMatch(/organ-specific reproductive state/i);
    expect(measurement.getElementById("asfr-tfr")?.textContent).toMatch(/age|ASFR|fertility/i);
    expect(math.getElementById("field-record")?.textContent).toMatch(/vector|waveform|calibrat/i);
    expect(math.getElementById("static-interface")?.textContent).toMatch(/charge|material|ground/i);
    expect(math.getElementById("boundary")?.textContent).toMatch(/input boundary/i);
    expect(physics.getElementById("lindgren")?.textContent).toMatch(/metric|geometry/i);
    expect(physics.getElementById("three-channel-derivation")?.textContent).toMatch(/ELF/);
    expect(physics.getElementById("evo-calibration")?.textContent).toMatch(/biological bridge/i);
  });

  it("keeps the cohort topic tied to accumulated history instead of a different cross-sectional model", () => {
    const modelSource = readFileSync(resolve(process.cwd(), "app/[locale]/model/page.tsx"), "utf8");
    expect(modelSource).toContain("T3 cohort vulnerability v(a)");
    expect(modelSource).toContain("cohorts with the longest proxy history");
    expect(modelSource).toContain('<CollapsibleSection id="dual-kernel" title={d.dkcTitle}');
    expect(getModelTocDestination("cohort", "en")).toMatchObject({ href: "/en/model#dual-kernel", isLocal: true });
    expect(getModelTocDestination("cohort", "en").href).not.toContain("two-level-prediction");
  });

  it.each(locales)("renders the repaired links in %s while preserving topics still on the model page", (locale) => {
    render(<ModelTableOfContents locale={locale} />);
    const links = screen.getAllByRole("link");
    for (const id of repairedIds) {
      expect(links.some((link) => link.getAttribute("href") === getModelTocDestination(id, locale).href)).toBe(true);
    }
    expect(links.some((link) => link.getAttribute("href") === "#biological-coordination")).toBe(true);
    expect(links.some((link) => link.getAttribute("href") === "#epistapege")).toBe(true);
    expect(links.some((link) => link.getAttribute("href") === "#testosterone-threshold")).toBe(true);
    expect(links.every((link) => !/^#(?:premise|fieldstate|cohort|organ-state|gme|validation)$/.test(link.getAttribute("href") ?? ""))).toBe(true);
  });

  it("observes actual local anchors and never marks a cross-page destination as the current position", () => {
    render(<><section id="modulome" /><section id="dual-kernel" /><section id="field-record" /><section id="lindgren" /><ModelTableOfContents locale="en" /></>);
    expect(observed.map((element) => element.id)).toEqual(expect.arrayContaining(["modulome", "dual-kernel"]));
    expect(observed.map((element) => element.id)).not.toContain("field-record");
    expect(observed.map((element) => element.id)).not.toContain("lindgren");
    const rect = new DOMRect(0, 100, 100, 20);
    const entry: IntersectionObserverEntry = {
      target: document.getElementById("modulome")!,
      isIntersecting: true,
      boundingClientRect: rect,
      intersectionRect: rect,
      intersectionRatio: 1,
      rootBounds: null,
      time: 0,
    };
    act(() => observerCallback([entry], {} as IntersectionObserver));
    expect(screen.getByRole("link", { name: "Organ state" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "Physics premise" })).not.toHaveAttribute("aria-current");
  });
});
