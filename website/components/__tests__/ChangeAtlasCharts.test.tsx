import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ChangeAtlasSeries } from "@/lib/change-atlas-data";
import { ATLAS_PLOT_LAYOUT, atlasYearTicks, ChangeAtlasAgeHeatmap, ChangeAtlasCharts, getChangeAtlasYDomains, type ChangeAtlasPredictionOverlay } from "../ChangeAtlasCharts";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function series(overrides: Partial<ChangeAtlasSeries> = {}): ChangeAtlasSeries {
  return {
    id: "tfr-a", countryId: "FIN", datasetFamily: "fertility", metric: "tfr",
    title: { fi: "Kokonaishedelmällisyys", en: "Total fertility" },
    unit: "births_per_woman", unitLabel: { fi: "lasta / nainen", en: "children / woman" },
    valueScale: "linear", status: "estimate", frequency: "annual",
    population: { fi: "Suomi", en: "Finland" }, sourceIds: ["wpp"],
    method: { fi: "Julkaistu estimaatti", en: "Published estimate" }, limitations: [],
    points: [2000, 2001, 2003, 2004].map((year, i) => ({
      year, value: 1 + i / 10, lower: null, upper: null,
      sourceId: "wpp", sourceLocator: `row-${year}`, imputed: false as const,
    })), ...overrides,
  };
}

function periodSeries() {
  return series({
    id: "diabetes", datasetFamily: "health", metric: "diabetes_prevalence",
    unit: "percent", unitLabel: { fi: "% aikuisista", en: "% of adults" },
    title: { fi: "Diabetes", en: "Diabetes" }, frequency: "survey_period",
    points: [
      { year: 2000.5, startYear: 2000, endYear: 2001, period: { fi: "2000–2001", en: "2000–2001" }, value: 10, lower: 8, upper: 12, n: 900, sourceId: "cdc", sourceLocator: "table5-row1", imputed: false },
      { year: 2003.5, startYear: 2003, endYear: 2004, period: { fi: "2003–2004", en: "2003–2004" }, value: 14, lower: 11, upper: 17, n: 1000, sourceId: "cdc", sourceLocator: "table5-row2", imputed: false },
    ],
  });
}

function prediction(overrides: Partial<ChangeAtlasPredictionOverlay> = {}): ChangeAtlasPredictionOverlay {
  return {
    unit: "births_per_woman", note: { fi: "Ehdollinen laskelma valituilla oletuksilla.", en: "Conditional calculation with selected assumptions." },
    lines: [{ id: "berm-annual", mode: "annual", label: { fi: "Vuotuinen vaste", en: "Annual response" },
      points: [2000, 2001, 2002, 2003, 2004].map((year, i) => ({ year, value: 2 + i })) }],
    ...overrides,
  };
}

function calibratedPrediction() {
  const overlay = prediction();
  overlay.lines[0].points = Array.from({ length: 9 }, (_, i) => ({ year: 1998 + i, value: 4 - i / 10 }));
  overlay.lines[0].calibration = { anchorStartYear: 2000, throughYear: 2003, label: { fi: "Valittuihin havaintoihin sovitettu", en: "Fitted to selected observations" } };
  return overlay;
}

describe("ChangeAtlasCharts", () => {
  it("keeps both calendar endpoints without overlapping mobile year labels", () => {
    const domain: [number, number] = [1950, 2023];
    const width = 342;
    const ticks = atlasYearTicks(domain, width);
    expect(ticks[0]).toBe(1950);
    expect(ticks.at(-1)).toBe(2023);
    expect(ticks).not.toContain(1960);
    expect(ticks.length).toBeGreaterThan(2);
    const plotWidth = width - ATLAS_PLOT_LAYOUT.LEFT - ATLAS_PLOT_LAYOUT.RIGHT;
    for (let i = 1; i < ticks.length; i++) {
      const pixelGap = (ticks[i] - ticks[i - 1]) / (domain[1] - domain[0]) * plotWidth;
      const minimumGap = i === 1 || i === ticks.length - 1 ? 44 : 40;
      expect(pixelGap).toBeGreaterThanOrEqual(minimumGap - 1e-8);
    }
  });

  it("does not bridge missing annual observations or fill the selected missing year", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2002} />);
    expect([...container.querySelectorAll("[data-annual-segment]")].map((path) => path.getAttribute("data-annual-segment"))).toEqual(["2000:2001", "2003:2004"]);
    expect(container.querySelectorAll("[data-point-year]")).toHaveLength(4);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("2002 · No observation");
    expect(container.querySelectorAll("[data-selected-point]")).toHaveLength(0);
  });

  it("renders survey periods and reported uncertainty without inventing annual lines", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[periodSeries()]} yearDomain={[2000, 2004]} selectedYear={2001} />);
    expect(container.querySelectorAll("[data-annual-segment]")).toHaveLength(0);
    expect(container.querySelectorAll("[data-period-bar]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-point-year]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-uncertainty-interval]")).toHaveLength(2);
    const selected = container.querySelector("[data-selected-series]");
    expect(selected).toHaveTextContent("2000–2001: 10 % of adults");
    expect(selected).toHaveTextContent("8–12");
    expect(selected).toHaveTextContent("900");
    expect(container.querySelector("[data-point-year='2000.5'] [data-selected-point]")).toBeTruthy();
  });

  it("requires complete survey periods within the displayed time domain", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[periodSeries()]} yearDomain={[2001, 2004]} selectedYear={2001} />);
    expect(container.querySelectorAll("[data-period-bar]")).toHaveLength(1);
    expect(container.querySelector("[data-point-year='2000.5']")).toBeNull();
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("No observation");
    expect(screen.getByText(/Only complete periods/, { selector: "p" })).toBeVisible();
  });

  it("aligns the calendar cursor and every x-axis across different native units", () => {
    const { container } = render(<ChangeAtlasCharts locale="fi" series={[series(), periodSeries()]} yearDomain={[2000, 2004]} selectedYear={2001} />);
    const cursors = [...container.querySelectorAll("[data-year-cursor]")];
    expect(cursors).toHaveLength(2);
    expect(cursors[0].getAttribute("x1")).toEqual(cursors[1].getAttribute("x1"));
    const svgs = [...container.querySelectorAll("svg")];
    const positions = (svg: SVGSVGElement) => [...svg.querySelectorAll("[data-axis-year]")].map((tick) => [tick.getAttribute("data-axis-year"), tick.getAttribute("x")]);
    expect(positions(svgs[0])).toEqual(positions(svgs[1]));
    expect(container).toHaveTextContent("lasta / nainen");
    expect(container).toHaveTextContent("% aikuisista");
    const lanes = [...container.querySelectorAll("[data-y-domain]")];
    expect(lanes[0].getAttribute("data-y-domain")).not.toEqual(lanes[1].getAttribute("data-y-domain"));
  });

  it("uses shared metric-and-unit domains for comparisons, including uncertainty bounds", () => {
    const a = series();
    const b = series({ id: "tfr-b", countryId: "USA", points: [{ ...a.points[0], value: 4, lower: 3, upper: 6 }] });
    const domains = getChangeAtlasYDomains([a, b]);
    const { container } = render(<><ChangeAtlasCharts locale="en" series={[a]} yearDomain={[2000, 2004]} selectedYear={2000} yDomains={domains} /><ChangeAtlasCharts locale="en" series={[b]} yearDomain={[2000, 2004]} selectedYear={2000} yDomains={domains} /></>);
    const lanes = [...container.querySelectorAll("[data-y-domain]")];
    expect(lanes[0].getAttribute("data-y-domain")).toEqual(lanes[1].getAttribute("data-y-domain"));
    expect(Number(lanes[0].getAttribute("data-y-domain")!.split(",")[1])).toBeGreaterThan(6);
  });

  it("preserves a raw log10 series without silent linear normalization", () => {
    const raw = series({ id: "butterfly", datasetFamily: "ecology", metric: "butterfly_abundance", valueScale: "log10", unit: "log10_index", unitLabel: { fi: "log10-indeksi", en: "log10 index" }, points: [{ ...series().points[0], value: 1.8, nSites: 37 }] });
    const { container } = render(<ChangeAtlasCharts locale="en" series={[raw]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("1.8 log10 index");
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("37 monitoring sites");
    expect(container).toHaveTextContent("Original log10 scale");
    expect(container).not.toHaveTextContent("100%");
  });

  it("relabels event time without moving observations or hiding their calendar date", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2001} yearOffset={2001} />);
    expect(container.querySelector("[data-axis-year='2000']")).toHaveTextContent("-1");
    expect(container.querySelector("[data-axis-year='2004']")).toHaveTextContent("3");
    expect(container.querySelector("[data-point-year='2001']")).toBeTruthy();
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("2001 (Years from event: 0)");
  });

  it("supports bounded keyboard year changes and source selection", () => {
    const select = vi.fn();
    const source = vi.fn();
    render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2000} onSelectYear={select} onOpenSource={source} />);
    const plot = screen.getByRole("button", { name: /Total fertility/ });
    fireEvent.keyDown(plot, { key: "ArrowLeft" });
    fireEvent.keyDown(plot, { key: "ArrowRight" });
    fireEvent.keyDown(plot, { key: "End" });
    fireEvent.keyDown(plot, { key: "Home" });
    expect(select.mock.calls.map(([year]) => year)).toEqual([2000, 2001, 2004, 2000]);
    fireEvent.click(screen.getByRole("button", { name: "Source and method" }));
    expect(source).toHaveBeenCalledWith("tfr-a");
  });

  it("maps pointer coordinates to calendar years and clamps clicks beyond the plot", () => {
    const select = vi.fn();
    render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2000} onSelectYear={select} />);
    const plot = screen.getByRole("button", { name: /Total fertility/ });
    vi.spyOn(plot, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 600, bottom: 190, width: 600, height: 190, toJSON: () => ({}) });
    fireEvent.click(plot, { clientX: 322, detail: 1 });
    fireEvent.click(plot, { clientX: 0, detail: 1 });
    fireEvent.click(plot, { clientX: 700, detail: 1 });
    expect(select.mock.calls.map(([year]) => year)).toEqual([2002, 2000, 2004]);
    fireEvent.click(plot, { detail: 0 });
    expect(select).toHaveBeenCalledTimes(3);
  });

  it("does not turn absent uncertainty into a zero-width interval", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    expect(container.querySelectorAll("[data-uncertainty-interval]")).toHaveLength(0);
  });

  it("keeps a finite chart for a single-year domain and one constant observation", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series({ points: [series().points[0]] })]} yearDomain={[2000, 2000]} selectedYear={2000} />);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
    expect(container.querySelectorAll("[data-point-year]")).toHaveLength(1);
  });

  it("measures the available width so narrow charts retain their readable height", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 190, width: 320, height: 190, toJSON: () => ({}) });
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("viewBox", "0 0 320 190");
    expect(svg).toHaveAttribute("width", "100%");
    for (const point of container.querySelectorAll("circle")) expect(Number(point.getAttribute("cx"))).toBeLessThan(320);
  });

  it("keeps predictions separate from unchanged observations and preserves missing observation years", () => {
    const observed = series();
    const before = JSON.stringify(observed);
    const { container } = render(<ChangeAtlasCharts locale="en" series={[observed]} yearDomain={[2000, 2004]} selectedYear={2002} overlaysBySeriesId={{ [observed.id]: prediction() }} />);
    expect(JSON.stringify(observed)).toBe(before);
    expect(container.querySelectorAll("[data-point-year]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-selected-point]")).toHaveLength(0);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("2002 · No observation");
    expect(container.querySelector("[data-selected-prediction]")).toHaveTextContent("BERM: conditional prediction · Annual response · 2002: 4 children / woman");
    expect(container.querySelectorAll("[data-prediction-line]")).toHaveLength(1);
    expect([...container.querySelectorAll("[data-annual-segment]")].map((path) => path.getAttribute("data-annual-segment"))).toEqual(["2000:2001", "2003:2004"]);
  });

  it("breaks prediction paths at null, nonfinite and missing years without filling them with zero", () => {
    const overlay = prediction();
    overlay.lines[0].points = [{ year: 1999, value: 999 }, { year: 2000, value: 4 }, { year: 2001, value: 3 }, { year: 2002, value: null }, { year: 2003, value: 2 }, { year: 2004, value: Infinity }, { year: 2006, value: 1 }];
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2006]} selectedYear={2002} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    expect([...container.querySelectorAll("[data-prediction-segment]")].map((path) => path.getAttribute("data-prediction-segment"))).toEqual(["2000:2001", "2003:2003", "2006:2006"]);
    expect(container.querySelector("[data-selected-prediction]")).toHaveTextContent("No computed value");
    expect(container.querySelector("[data-y-domain]")?.getAttribute("data-y-domain")).not.toContain("999");
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it("expands a supplied domain for all valid model values and shares it across matching lanes", () => {
    const a = series();
    const b = series({ id: "tfr-b", countryId: "USA" });
    const overlay = prediction();
    overlay.lines[0].points = [{ year: 2000, value: -3 }, { year: 2001, value: 20 }];
    const domains = getChangeAtlasYDomains([a, b]);
    const { container } = render(<ChangeAtlasCharts locale="en" series={[a, b]} yearDomain={[2000, 2004]} selectedYear={2001} yDomains={domains} overlaysBySeriesId={{ [a.id]: overlay }} />);
    const lanes = [...container.querySelectorAll("[data-y-domain]")];
    const domain = lanes[0].getAttribute("data-y-domain")!.split(",").map(Number);
    expect(domain[0]).toBeLessThan(-3);
    expect(domain[1]).toBeGreaterThan(20);
    expect(lanes[1].getAttribute("data-y-domain")).toBe(lanes[0].getAttribute("data-y-domain"));
    const path = container.querySelector("[data-prediction-segment]")!.getAttribute("d")!;
    const ys = [...path.matchAll(/[,](\S+)/g)].map((match) => Number(match[1]));
    expect(ys.every((value) => value >= 14 && value <= 146)).toBe(true);
  });

  it("can share model-inclusive domains across separate country charts", () => {
    const a = series();
    const b = series({ id: "tfr-b", countryId: "USA" });
    const overlays = { [a.id]: prediction() };
    const domains = getChangeAtlasYDomains([a, b], overlays, [2000, 2004]);
    const { container } = render(<><ChangeAtlasCharts locale="en" series={[a]} yearDomain={[2000, 2004]} selectedYear={2001} yDomains={domains} overlaysBySeriesId={overlays} /><ChangeAtlasCharts locale="en" series={[b]} yearDomain={[2000, 2004]} selectedYear={2001} yDomains={domains} /></>);
    const lanes = [...container.querySelectorAll("[data-y-domain]")];
    expect(lanes[0].getAttribute("data-y-domain")).toBe(lanes[1].getAttribute("data-y-domain"));
  });

  it("rejects an incompatible prediction unit visibly and leaves the observation scale intact", () => {
    const entry = series();
    const expected = Object.values(getChangeAtlasYDomains([entry]))[0].join(",");
    const { container } = render(<ChangeAtlasCharts locale="en" series={[entry]} yearDomain={[2000, 2004]} selectedYear={2000} overlaysBySeriesId={{ [entry.id]: prediction({ unit: "ng_per_dl" }) }} />);
    expect(container.querySelectorAll("[data-prediction-line], [data-selected-prediction]")).toHaveLength(0);
    expect(container.querySelector("[data-y-domain]")).toHaveAttribute("data-y-domain", expected);
    expect(container.querySelector("svg [data-chart-legend='note']")).toHaveTextContent("Prediction omitted: its unit differs from the observation series.");
  });

  it("keeps all mode labels, native units and the full model note inside a responsive exported SVG", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 190, width: 320, height: 190, toJSON: () => ({}) });
    const overlay = prediction();
    overlay.lines = ["annual", "accumulated", "combined"].map((mode) => ({ ...overlay.lines[0], id: mode, mode: mode as "annual" | "accumulated" | "combined", label: { fi: mode, en: mode } }));
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2001} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toMatch(/^0 0 320 /);
    expect(Number(svg.getAttribute("height"))).toBeGreaterThan(190);
    expect(svg.querySelectorAll("[data-chart-legend='prediction']")).toHaveLength(3);
    expect(new Set([...svg.querySelectorAll("[data-prediction-line]")].map((line) => line.getAttribute("style"))).size).toBe(3);
    const note = [...svg.querySelectorAll("[data-chart-legend='note'] tspan")].map((line) => line.textContent?.trim()).join(" ");
    expect(note).toBe(`${overlay.note.en} A gap indicates a missing computed value.`);
    expect(svg.querySelector("[data-chart-legend='observation']")).toHaveTextContent("children / woman");
    expect(svg.querySelector("desc")).toHaveTextContent("Conditional calculation with selected assumptions.");
  });

  it("retains the common calendar axis and keyboard/source actions with an overlay", () => {
    const select = vi.fn();
    const source = vi.fn();
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series(), periodSeries()]} yearDomain={[2000, 2004]} selectedYear={2001} yearOffset={2001} onSelectYear={select} onOpenSource={source} overlaysBySeriesId={{ "tfr-a": prediction() }} />);
    const svgs = [...container.querySelectorAll("svg")];
    const ticks = (svg: SVGSVGElement) => [...svg.querySelectorAll("[data-axis-year]")].map((tick) => [tick.getAttribute("x"), tick.textContent]);
    expect(ticks(svgs[0])).toEqual(ticks(svgs[1]));
    expect(container.querySelector("[data-selected-prediction]")).toHaveTextContent("2001 (Years from event: 0)");
    fireEvent.keyDown(screen.getByRole("button", { name: /Total fertility/ }), { key: "End" });
    expect(select).toHaveBeenCalledWith(2004);
    fireEvent.click(screen.getAllByRole("button", { name: "Source and method" })[0]);
    expect(source).toHaveBeenCalledWith("tfr-a");
  });

  it("labels percentiles as population distribution bounds, never confidence or uncertainty intervals", () => {
    const entry = periodSeries();
    entry.statistic = "median";
    entry.points = entry.points.map((point) => ({ ...point, intervalKind: "percentile_5_95" }));
    const { container } = render(<ChangeAtlasCharts locale="en" series={[entry]} yearDomain={[2000, 2004]} selectedYear={2001} />);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("Median 10");
    expect(container.querySelectorAll("[data-distribution-interval]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-uncertainty-interval]")).toHaveLength(0);
    expect(container.querySelector("svg [data-chart-legend='observation']")).toHaveTextContent("5th–95th percentile (distribution interval)");
    expect(container.textContent).not.toMatch(/confidence|uncertainty/i);
  });

  it("distinguishes confidence bounds from a reported SE without inventing SE bounds", () => {
    const entry = periodSeries();
    entry.points[0] = { ...entry.points[0], intervalKind: "confidence_95" };
    entry.points[1] = { ...entry.points[1], lower: null, upper: null, standardError: 2.1, intervalKind: "standard_error" };
    const { container } = render(<ChangeAtlasCharts locale="en" series={[entry]} yearDomain={[2000, 2004]} selectedYear={2004} />);
    expect(container.querySelectorAll("[data-interval-kind='confidence_95']")).toHaveLength(1);
    expect(container.querySelectorAll("[data-interval-kind='standard_error']")).toHaveLength(0);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("Standard error (SE): 2.1");
    expect(container.querySelector("[data-point-year='2000.5'] title")).toHaveTextContent("95% confidence interval: 8–12");
  });

  it("honours explicitly absent intervals and labels supplied SE bounds as one SE, not 95% CI", () => {
    const entry = periodSeries();
    entry.points[0] = { ...entry.points[0], intervalKind: "none", lower: -999, upper: 999 };
    entry.points[1] = { ...entry.points[1], lower: 12, upper: 16, intervalKind: "standard_error" };
    const { container } = render(<ChangeAtlasCharts locale="fi" series={[entry]} yearDomain={[2000, 2004]} selectedYear={2004} />);
    expect(container.querySelectorAll("[data-interval-kind]")).toHaveLength(1);
    expect(container.querySelector("[data-selected-series]")).toHaveTextContent("Keskivirhe (±1 SE): 12–16");
    expect(container.textContent).not.toMatch(/999|luottamusväli/);
    expect(Number(container.querySelector("[data-y-domain]")!.getAttribute("data-y-domain")!.split(",")[1])).toBeLessThan(20);
  });

  it("separates backcast, fitted and post-calibration curve segments without changing channel identity", () => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[1998, 2006]} selectedYear={2004} overlaysBySeriesId={{ "tfr-a": calibratedPrediction() }} />);
    const line = container.querySelector("[data-prediction-line]")!;
    expect(line).toHaveAttribute("data-prediction-mode", "annual");
    expect(line.getAttribute("style")).not.toBe(line.parentElement!.getAttribute("style"));
    const paths = [...line.querySelectorAll("path")];
    expect(paths.map(path => [path.getAttribute("data-prediction-segment"), path.getAttribute("data-prediction-role")])).toEqual([
      ["1998:2000", "backcast"], ["2000:2003", "fitted"], ["2003:2006", "after-fit"],
    ]);
    expect(paths[0].getAttribute("class")).toContain("backcastCurve");
    expect(paths[1].getAttribute("class")).toContain("fittedCurve");
    expect(paths[2].getAttribute("class")).toContain("predictionCurve");
    expect(container.querySelectorAll("[data-point-year]")).toHaveLength(4);
    expect(container.textContent).not.toMatch(/validated|validation passed/i);
  });

  it.each([[1999, "backcast", "Backcast before the anchor"], [2003, "fitted", "Calibration period"], [2004, "after-fit", "Conditional prediction after calibration"]] as const)("labels the selected year %s with its distinct calibration role", (year, role, label) => {
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[1998, 2006]} selectedYear={year} overlaysBySeriesId={{ "tfr-a": calibratedPrediction() }} />);
    const selected = container.querySelector("[data-selected-prediction]");
    expect(selected).toHaveAttribute("data-prediction-role", role);
    expect(selected).toHaveTextContent(label);
    expect(container.querySelector("svg desc")).toHaveTextContent(label);
  });

  it("names the calibration dates without claiming a changed-input curve is still the fitted curve", () => {
    const overlay = calibratedPrediction();
    overlay.lines[0].points.forEach(point => { if (point.value !== null) point.value *= 1.5; });
    const { container } = render(<ChangeAtlasCharts locale="fi" series={[series()]} yearDomain={[1998, 2006]} selectedYear={2003} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    expect(container.querySelector("[data-selected-prediction]")).toHaveTextContent("Kalibrointijakso");
    expect(container.querySelector("[data-selected-prediction]")).not.toHaveTextContent("Sovitusjakso");
    expect([...container.querySelectorAll("svg [data-calibration-role='fitted']")].map(node => node.textContent)).toContain("Kalibrointijakso");
  });

  it("preserves an unknown year at the calibration boundary instead of bridging fitted and later predictions", () => {
    const overlay = calibratedPrediction();
    overlay.lines[0].points.find(point => point.year === 2003)!.value = null;
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[1998, 2006]} selectedYear={2003} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    expect([...container.querySelectorAll("[data-prediction-segment]")].map(path => path.getAttribute("data-prediction-segment"))).toEqual(["1998:2000", "2000:2002", "2004:2006"]);
    expect(container.querySelector("[data-selected-prediction]")).toHaveTextContent("No computed value");
    expect(container.querySelector("[data-calibration-cutoff='2003']")).not.toBeNull();
  });

  it("draws one shared cutoff for multiple channels and retains the complete calibration legend in SVG", () => {
    const overlay = calibratedPrediction();
    overlay.lines.push({ ...overlay.lines[0], id: "combined", mode: "combined", label: { fi: "Yhdistetty", en: "Combined" } });
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[1998, 2006]} selectedYear={2003} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    expect(container.querySelectorAll("[data-calibration-cutoff]")).toHaveLength(1);
    const cutoff = container.querySelector("[data-calibration-cutoff] line")!;
    expect(cutoff.getAttribute("x1")).toBe(container.querySelector("[data-year-cursor]")!.getAttribute("x1"));
    const svg = container.querySelector("svg")!;
    expect(svg.querySelector("[data-calibration-cutoff] text")).toHaveTextContent("Fit through: 2003");
    expect(svg).toHaveTextContent("Fitted to selected observations · Anchor: 2000 · Fit through: 2003");
    expect(svg).toHaveTextContent("Conditional prediction after calibration");
    expect(svg).toHaveTextContent("Backcast before the anchor");
    const legend = svg.querySelectorAll("[data-chart-legend][data-calibration-role='after-fit']");
    expect(legend).toHaveLength(1);
  });

  it("does not move an offscreen calibration cutoff onto the visible range boundary", () => {
    const { container } = render(<ChangeAtlasCharts locale="fi" series={[series()]} yearDomain={[2004, 2006]} selectedYear={2004} overlaysBySeriesId={{ "tfr-a": calibratedPrediction() }} />);
    expect(container.querySelectorAll("[data-calibration-cutoff]")).toHaveLength(0);
    expect(container.querySelector("[data-selected-prediction]")).toHaveAttribute("data-prediction-role", "after-fit");
    expect(container.querySelector("svg")).toHaveTextContent("Sovitus päättyy: 2003");
  });

  it("ignores a malformed calibration marker without producing invalid SVG geometry", () => {
    const overlay = calibratedPrediction();
    overlay.lines[0].calibration!.throughYear = NaN;
    const { container } = render(<ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[1998, 2006]} selectedYear={2000} overlaysBySeriesId={{ "tfr-a": overlay }} />);
    expect(container.querySelectorAll("[data-calibration-cutoff]")).toHaveLength(0);
    expect(container.querySelector("[data-selected-prediction]")).toHaveAttribute("data-prediction-role", "prediction");
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });
});

describe("ChangeAtlasAgeHeatmap", () => {
  const ageSeries = (id: string, ageGroup: string, value: number) => series({ id, metric: "asfr", ageGroup, unit: "births_per_1000_women", unitLabel: { fi: "syntymää / 1 000 naista", en: "births / 1,000 women" }, points: [{ ...series().points[0], value }] });

  it("uses one colour scale across ages and keeps missing years empty", () => {
    const { container } = render(<ChangeAtlasAgeHeatmap locale="en" series={[ageSeries("young", "15-19", 10), ageSeries("older", "25-29", 10)]} yearDomain={[2000, 2004]} selectedYear={2002} />);
    const cells = [...container.querySelectorAll("[data-heatmap-year]")];
    expect(cells).toHaveLength(2);
    expect(cells[0].getAttribute("fill-opacity")).toEqual(cells[1].getAttribute("fill-opacity"));
    expect(container.querySelector("[data-heatmap-year='2002']")).toBeNull();
    expect(within(screen.getByRole("table")).getAllByText("No observation")).toHaveLength(2);
  });

  it("renders the selected age-specific values in an accessible table", () => {
    render(<ChangeAtlasAgeHeatmap locale="fi" series={[ageSeries("older", "25-29", 100), ageSeries("young", "15-19", 10)]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    const rows = within(screen.getByRole("table")).getAllByRole("row");
    expect(rows[1]).toHaveTextContent("15-19");
    expect(rows[1]).toHaveTextContent("10");
    expect(rows[2]).toHaveTextContent("25-29");
    expect(rows[2]).toHaveTextContent("100");
  });

  it("aligns heatmap year centres with the shared annual timeline", () => {
    const { container } = render(<><ChangeAtlasCharts locale="en" series={[series()]} yearDomain={[2000, 2004]} selectedYear={2001} /><ChangeAtlasAgeHeatmap locale="en" series={[ageSeries("young", "15-19", 10)]} yearDomain={[2000, 2004]} selectedYear={2001} /></>);
    const line = container.querySelector("line[data-year-cursor]")!;
    const column = container.querySelector("rect[data-year-cursor]")!;
    expect(Number(column.getAttribute("x")) + Number(column.getAttribute("width")) / 2).toBeCloseTo(Number(line.getAttribute("x1")));
  });

  it("measures a heatmap when age data become available after an empty selection", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 190, width: 320, height: 190, toJSON: () => ({}) });
    const { rerender } = render(<ChangeAtlasAgeHeatmap locale="en" series={[]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    expect(screen.queryByRole("img")).toBeNull();
    rerender(<ChangeAtlasAgeHeatmap locale="en" series={[ageSeries("young", "15-19", 10)]} yearDomain={[2000, 2004]} selectedYear={2000} />);
    expect(screen.getByRole("img").getAttribute("viewBox")).toMatch(/^0 0 320 /);
  });
});

describe("atlas chart server rendering", () => {
  it.each(["fi", "en"])("hydrates SVG titles and descriptions in %s without replacement", async (locale) => {
    const content = <><ChangeAtlasCharts locale={locale} series={[series(), periodSeries()]} yearDomain={[2000, 2004]} selectedYear={2001} overlaysBySeriesId={{ "tfr-a": calibratedPrediction() }} /><ChangeAtlasAgeHeatmap locale={locale} series={[series({ metric: "asfr", ageGroup: "20-24" })]} yearDomain={[2000, 2004]} selectedYear={2001} /></>;
    const container = document.createElement("div");
    container.innerHTML = renderToString(content);
    document.body.append(container);
    const original = [...container.querySelectorAll("svg")];
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => { root = hydrateRoot(container, content, { onRecoverableError: (error) => errors.push(error) }); });
      expect(errors).toEqual([]);
      [...container.querySelectorAll("svg")].forEach((svg, index) => expect(svg).toBe(original[index]));
      for (const label of container.querySelectorAll("svg title, svg desc")) {
        expect(label.textContent?.trim()).toBeTruthy();
        expect(label.childNodes).toHaveLength(1);
        expect(label.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      }
      const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
      expect(new Set(ids).size).toBe(ids.length);
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });
});
