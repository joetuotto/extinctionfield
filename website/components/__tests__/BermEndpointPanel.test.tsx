import "@testing-library/jest-dom/vitest";
import type { ComponentProps } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { csvParse } from "d3";
import { BermEndpointPanel } from "../BermEndpointPanel";
import type { ChangeAtlasPredictionOverlay } from "../ChangeAtlasCharts";
import { getChangeAtlasSeries, type ChangeAtlasSeries } from "@/lib/change-atlas-data";
import type { BermEndpointScenario, BermFertilityScenario, BermTestosteroneScenario } from "@/lib/berm-endpoint-scenario";
import { downloadAtlasBlob, indexAtlasSeries } from "@/lib/change-atlas-display";

// Keep the actual source data, calculation and chart. A rerender after URL changes
// models the App Router's hook update; no calculated series or baselines are mocked.
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(window.location.search) }));
vi.mock("@/lib/change-atlas-display", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/change-atlas-display")>(), downloadAtlasBlob: vi.fn(),
}));
beforeEach(() => { window.history.replaceState(null, "", "/en/explore?country=FIN&year=2002#atlas"); });
afterEach(() => { cleanup(); vi.clearAllMocks(); });

type Props = ComponentProps<typeof BermEndpointPanel>;
interface Metadata {
  countryId: string;
  selectedYear: number;
  visibleRange: { from: number; to: number };
  scenario: BermEndpointScenario;
  fertility: BermFertilityScenario;
  testosterone: { seriesId: string; result: BermTestosteroneScenario | null }[];
  overlays: Record<string, ChangeAtlasPredictionOverlay>;
  error: string;
}
function propsFor(countryId = "FIN", overrides: Partial<Props> = {}): Props {
  const tfr = getChangeAtlasSeries(countryId, "tfr")[0];
  const hormone = getChangeAtlasSeries(countryId, "testosterone_total").find(s => s.testosteroneTrendId);
  const raw = hormone ? [tfr, hormone] : [tfr];
  return { countryId, locale: "en", from: 1950, to: 2023, year: 2002,
    rawObservations: raw, observations: raw, indexYear: null,
    onYearChange: vi.fn(), onOpenSource: vi.fn(), ...overrides };
}
function openPanel(query = "forecast=1", props = propsFor()) {
  window.history.replaceState(null, "", `/en/explore?country=${props.countryId}&year=${props.year}&ep_fit=manual&${query}#atlas`);
  return { ...render(<BermEndpointPanel {...props} />), props };
}
function metadata(container: HTMLElement): Metadata {
  return JSON.parse(container.querySelector("[data-berm-endpoint]")!.getAttribute("data-berm-endpoint")!);
}
function lane(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`[data-series-id="${id}"]`)!;
}
function readBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsText(blob);
  });
}

describe("Manual BERM sensitivity alongside the unchanged source observations", () => {
  it("is opt-in and preserves the source layer when toggled on and off", () => {
    const view = openPanel("forecast=0");
    const before = view.props.rawObservations.map(s => structuredClone(s.points));
    expect(view.container.querySelector("[data-berm-endpoint]")).toBeNull();
    expect(view.container.querySelectorAll("[data-prediction-line]")).toHaveLength(0);
    expect(lane(view.container, "fi-finrisk-testosterone-60-69")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Show BERM prediction alongside observations" }));
    expect(new URLSearchParams(window.location.search).get("forecast")).toBe("1");
    view.rerender(<BermEndpointPanel {...view.props} />);
    expect(metadata(view.container).error).toBe("");
    expect(view.container.querySelectorAll("[data-prediction-line]")).toHaveLength(2);
    expect(view.props.rawObservations.map(s => s.points)).toEqual(before);
    fireEvent.click(screen.getByRole("checkbox", { name: "Show BERM prediction alongside observations" }));
    view.rerender(<BermEndpointPanel {...view.props} />);
    expect(view.container.querySelectorAll("[data-prediction-line]")).toHaveLength(0);
    expect(view.container.querySelectorAll("[data-period-bar]")).toHaveLength(2);
  });

  it("anchors Finnish fertility to the seven observed ASFR groups and testosterone to the exact 1977 median", () => {
    const view = openPanel("forecast=1&ep_compare=1");
    const data = metadata(view.container);
    const expectedTfr = getChangeAtlasSeries("FIN", "asfr").reduce((sum, s) => sum + 5 * s.points.find(p => p.year === 1950)!.value / 1000, 0);
    expect(data.fertility.baselineTfr).toBeCloseTo(expectedTfr);
    expect(data.fertility.baselineYear).toBe(1950);
    const hormone = data.testosterone.find(t => t.seriesId === "fi-finrisk-testosterone-60-69")!.result!;
    expect(hormone).toMatchObject({ statistic: "median", unit: "nmol_per_l", anchorStatus: "available",
      baseline: { value: 21.9, statistic: "median", period: { startYear: 1977, endYear: 1977 } } });
    expect(hormone.points.find(p => p.year === 1977)!.selected.value).toBeCloseTo(21.9);
    expect(hormone.points.find(p => p.year === 2002)!.selected.value).not.toBe(13.8);
    const plotted = lane(view.container, "fi-finrisk-testosterone-60-69");
    expect(plotted.querySelectorAll("[data-period-bar]")).toHaveLength(2);
    expect(plotted.querySelectorAll("[data-distribution-interval]")).toHaveLength(2);
    expect(plotted.querySelectorAll("[data-annual-segment]")).toHaveLength(0);
    expect(plotted.querySelectorAll("[data-prediction-line]")).toHaveLength(3);
    expect(plotted).toHaveTextContent("5th–95th percentile (distribution interval)");
    expect(plotted).toHaveTextContent("1977");
    expect(plotted).not.toHaveTextContent("95% confidence interval");
  });

  it("keeps the selected year's prediction and anchor unchanged when the viewport excludes the baseline", () => {
    const view = openPanel("forecast=1&ep_compare=1");
    const full = metadata(view.container);
    const selected = view.container.querySelector("[data-selected-predictions='fi-finrisk-testosterone-60-69']")!.textContent;
    const cropped = { ...view.props, from: 2000, to: 2010,
      observations: view.props.rawObservations.map(s => ({ ...s, points: s.points.filter(p => p.year >= 2000 && p.year <= 2010) })) };
    view.rerender(<BermEndpointPanel {...cropped} />);
    const result = metadata(view.container);
    expect(result.visibleRange).toEqual({ from: 2000, to: 2010 });
    expect(result.scenario.history).toEqual(full.scenario.history);
    expect(result.fertility).toEqual(full.fertility);
    expect(result.testosterone).toEqual(full.testosterone);
    expect(view.container.querySelector("[data-selected-predictions='fi-finrisk-testosterone-60-69']")!.textContent).toBe(selected);
    expect(result.overlays["fi-finrisk-testosterone-60-69"].lines[0].points).toHaveLength(11);
  });

  it("uses the later exact Finnish 25–29-year median as an explicit backcast anchor, never the pooled early-period midpoint", () => {
    const hormone = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.id === "fi-finrisk-testosterone-25-29")!;
    const view = openPanel("forecast=1", propsFor("FIN", { observations: [hormone], rawObservations: [hormone] }));
    const result = metadata(view.container).testosterone[0].result!;
    expect(result.baseline).toMatchObject({ value: 19.1, statistic: "median", period: { startYear: 2002, endYear: 2002 } });
    expect(result.points.find(p => p.year === 2002)!.selected.value).toBeCloseTo(19.1);
    const chart = lane(view.container, hormone.id);
    expect(chart.querySelector("[data-period-bar='1972:1977']")).not.toBeNull();
    expect(chart.querySelector("[data-period-bar='2002:2002']")).not.toBeNull();
    expect(chart).toHaveTextContent("Earlier values are backcasts");
  });

  it("keeps a multi-year-only median visible while leaving its unidentifiable prediction absent", () => {
    const original = getChangeAtlasSeries("FIN", "testosterone_total").find(s => s.id === "fi-finrisk-testosterone-25-29")!;
    const pooledOnly: ChangeAtlasSeries = { ...original, points: [original.points[0]] };
    const view = openPanel("forecast=1&ep_compare=1", propsFor("FIN", { year: 1977, observations: [pooledOnly], rawObservations: [pooledOnly] }));
    expect(metadata(view.container).testosterone[0].result).toBeNull();
    expect(lane(view.container, original.id).querySelectorAll("[data-period-bar]")).toHaveLength(1);
    expect(lane(view.container, original.id).querySelectorAll("[data-prediction-segment]")).toHaveLength(0);
    expect(lane(view.container, original.id)).toHaveTextContent("no baseline tied to a single collection year");
    expect(lane(view.container, original.id)).toHaveTextContent("No computed value");
  });

  it("keeps US study-period observations distinct from annual model values and anchors the period mean", () => {
    const view = openPanel("forecast=1&ep_compare=1", propsFor("USA", { year: 2000 }));
    const data = metadata(view.container), hormone = data.testosterone[0].result!;
    expect(hormone.baseline).toMatchObject({ value: 605.39, statistic: "arithmetic_mean", period: { startYear: 1999, endYear: 2000 } });
    for (const mode of ["annual", "accumulated", "combined"] as const) {
      const pair = hormone.points.filter(p => p.year === 1999 || p.year === 2000);
      expect(pair.reduce((sum, p) => sum + p.channels[mode].value!, 0) / 2).toBeCloseTo(605.39);
    }
    const chart = lane(view.container, "us-nhanes-testosterone-15-39");
    expect(chart.querySelectorAll("[data-period-bar]")).toHaveLength(5);
    expect(chart.querySelectorAll("[data-annual-segment]")).toHaveLength(0);
    expect(chart.querySelector("[data-selected-series]")).toHaveTextContent("1999–2000");
    expect(chart.querySelector("[data-selected-predictions]")).toHaveTextContent("2000");
    expect(chart).toHaveTextContent("Standard error (SE)");
  });

  it("retains the covered annual prediction with unknown initial stock and leaves accumulated channels missing", () => {
    const view = openPanel("forecast=1&ep_initial=unknown&ep_mode=annual&ep_compare=1");
    const data = metadata(view.container);
    expect(data.scenario.assumptions.prehistory).toBe("unknown");
    expect(data.scenario.history.find(p => p.year === 2002)!).toMatchObject({ accumulated: null });
    expect(data.fertility.channelAnchorStatus).toEqual({ annual: "available", accumulated: "missing-history", combined: "missing-history" });
    for (const id of ["fin-tfr", "fi-finrisk-testosterone-60-69"]) {
      const chart = lane(view.container, id);
      expect(chart.querySelector("[data-prediction-mode='annual']")!.querySelectorAll("[data-prediction-segment]").length).toBeGreaterThan(0);
      expect(chart.querySelector("[data-prediction-mode='accumulated']")!.querySelectorAll("[data-prediction-segment]")).toHaveLength(0);
      expect(chart.querySelector("[data-prediction-mode='combined']")!.querySelectorAll("[data-prediction-segment]")).toHaveLength(0);
    }
    expect(screen.getByText(/Parts of the earlier source history are unknown/)).toBeInTheDocument();
  });

  it("does not create a diabetes endpoint from the fertility or testosterone gains", () => {
    const health = getChangeAtlasSeries("USA", "diabetes_prevalence");
    const view = openPanel("forecast=1", propsFor("USA", { observations: health, rawObservations: health }));
    expect(metadata(view.container).overlays).toEqual({});
    expect(view.container.querySelectorAll("[data-prediction-line]")).toHaveLength(0);
    expect(view.container.querySelectorAll("[data-series-id]")).toHaveLength(2);
    expect(view.container.querySelectorAll("[data-period-bar]").length).toBeGreaterThan(0);
  });

  it("changes mode and both gains through URL controls without losing the current country, year or hash", () => {
    const view = openPanel("forecast=1&unrelated=keep");
    fireEvent.click(screen.getByRole("button", { name: /^annual response$/i }));
    fireEvent.change(screen.getByRole("slider", { name: "Fertility sensitivity βF" }), { target: { value: "0" } });
    fireEvent.change(screen.getByRole("slider", { name: "Testosterone sensitivity βT" }), { target: { value: "-0.2" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Compare all three" }));
    const query = new URLSearchParams(window.location.search);
    expect(Object.fromEntries(query)).toMatchObject({ country: "FIN", year: "2002", unrelated: "keep", ep_mode: "annual", ep_betaF: "0", ep_betaT: "-0.2", ep_compare: "1" });
    expect(window.location.hash).toBe("#atlas");
    view.rerender(<BermEndpointPanel {...view.props} />);
    expect(screen.getByRole("button", { name: /^annual response$/i })).toHaveAttribute("aria-pressed", "true");
    const data = metadata(view.container);
    expect(data.fertility.points.every(p => p.selected.multiplier === 1)).toBe(true);
    expect(data.testosterone[0].result!.points.find(p => p.year === 2002)!.selected.multiplier).toBeGreaterThan(1);
    expect(view.container.querySelectorAll("[data-prediction-line]")).toHaveLength(6);
  });

  it("applies the same indexed display denominator to TFR observations and predictions", () => {
    const raw = getChangeAtlasSeries("FIN", "tfr")[0], indexed = indexAtlasSeries(raw, 2000)!;
    const view = openPanel("forecast=1", propsFor("FIN", { observations: [indexed], rawObservations: [raw], indexYear: 2000 }));
    const data = metadata(view.container), native = data.fertility.points.find(p => p.year === 2002)!.selected.tfr!;
    const denominator = raw.points.find(p => p.year === 2000)!.value;
    expect(data.overlays[raw.id].unit).toBe("relative_index");
    expect(data.overlays[raw.id].lines[0].points.find(p => p.year === 2002)!.value).toBeCloseTo(100 * native / denominator);
    expect(lane(view.container, raw.id)).not.toHaveTextContent("its unit differs");
  });

  it("exports predicted rows and source-state components separately from unchanged observations", async () => {
    const view = openPanel("forecast=1&ep_compare=1", propsFor("FIN", { from: 2000, to: 2003 }));
    const before = view.props.rawObservations.map(s => structuredClone(s.points));
    fireEvent.click(screen.getByRole("button", { name: "Download predictions, annual response and retained state (CSV)" }));
    const calls = vi.mocked(downloadAtlasBlob).mock.calls;
    expect(calls).toHaveLength(1);
    const [blob, filename] = calls[0];
    expect(filename).toBe("berm-annual-accumulated-FIN-2000-2003.csv");
    const csv = await readBlob(blob);
    const rows = csvParse(csv.replace(/^\uFEFF/, ""));
    expect(rows.columns).toEqual(expect.arrayContaining(["source_projection_G", "annual_response_U", "accumulated_state_C", "parameters_json", "baseline_json"]));
    expect(rows).toHaveLength(2 * 3 * 4);
    expect(rows.every(row => row.kind === "conditional_BERM_annual_and_accumulated_endpoints" && row.status === "conditional_prediction")).toBe(true);
    expect(JSON.parse(rows.find(row => row.series === "fi-finrisk-testosterone-60-69")!.baseline_json!)).toMatchObject({ statistic: "median", period: { startYear: 1977 } });
    expect(view.props.rawObservations.map(s => s.points)).toEqual(before);
  });

  it("forwards source opening and keyboard year selection to the parent", () => {
    const view = openPanel("forecast=1");
    const chart = lane(view.container, "fi-finrisk-testosterone-60-69");
    fireEvent.click(within(chart).getByRole("button", { name: "Source and method" }));
    expect(view.props.onOpenSource).toHaveBeenCalledWith("fi-finrisk-testosterone-60-69");
    const control = within(chart).getByRole("button", { name: /Year: 2002/ });
    fireEvent.keyDown(control, { key: "ArrowRight" });
    expect(view.props.onYearChange).toHaveBeenCalledWith(2003);
  });
});
