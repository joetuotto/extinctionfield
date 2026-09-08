import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { BermAtlasScenario, atlasScenarioSources } from "../BermAtlasScenario";
import {
  DEFAULT_BERM_ATLAS_PARAMETERS, evaluateScenarioSource, runBermAtlasScenarioDetailed,
  type BermScenarioCoverage, type BermScenarioPoint,
} from "@/lib/berm-atlas-scenario";
import type { TechnologyScenarioInput } from "@/lib/berm-technology-inputs";
import { technologyDriversData, type TechnologyDriverSeries } from "@/lib/technology-drivers-data";
import * as atlasDisplay from "@/lib/change-atlas-display";
import { csvParse } from "d3";

// Exercise the real source registry, adapter, calculation and charts. Only the
// App Router is replaced; rerender models its response to a history update.
vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

const originalScroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollIntoView");
beforeAll(() => { Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() }); });
afterAll(() => {
  if (originalScroll) Object.defineProperty(HTMLElement.prototype, "scrollIntoView", originalScroll);
  else Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
});
beforeEach(() => { window.history.replaceState(null, "", "/en/explore?tab=atlas&view=berm"); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const props = { countryId: "FIN" as const, locale: "en", from: 1950, to: 2023, year: 2023, onYearChange: vi.fn() };
function openScenario(query: string) {
  window.history.replaceState(null, "", `/en/explore?tab=atlas&view=berm&${query}`);
  return render(<BermAtlasScenario {...props} />);
}
interface ScenarioMetadata {
  status: "calculated" | "unavailable";
  error: string;
  parameters: { timing: string; singleObservationPolicy: string };
  sources: TechnologyScenarioInput[];
  coverage: BermScenarioCoverage | null;
  points: BermScenarioPoint[];
  comparison: { sources: TechnologyScenarioInput[]; points: BermScenarioPoint[]; error: string };
  countries: { countryId: string; points: BermScenarioPoint[]; status: string; error: string }[];
}
function metadata(container: HTMLElement): ScenarioMetadata {
  const node = container.querySelector("[data-berm-scenario]");
  expect(node).not.toBeNull();
  return JSON.parse(node!.getAttribute("data-berm-scenario")!);
}

describe("BERM scenario coverage boundaries", () => {
  it("keeps a valid selected scenario visible when its all-enabled comparator lacks coverage", () => {
    const query = "s_edges=unknown&s_off=electric-grid,smart-metering,cellular-total";
    const selected = atlasScenarioSources("FIN", new URLSearchParams(query));
    expect(selected.map(s => s.id).sort()).toEqual(["cellular-total", "electric-grid", "smart-metering"]);
    expect(selected.every(s => !s.enabled)).toBe(true);
    // Establish that this case really exercises a failing comparator, not just
    // an ordinary zero-gain display with two valid calculations.
    expect(() => runBermAtlasScenarioDetailed(selected.map(s => ({ ...s, enabled: true })),
      DEFAULT_BERM_ATLAS_PARAMETERS, 1950, 2023, 1950)).toThrow(/Missing source profile/);

    const { container } = openScenario(query);
    const result = metadata(container);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(result.points).toHaveLength(74);
    expect(result.points.every(p => p.multiplier === 1 && p.relativeChangePercent === 0)).toBe(true);
    expect(result.coverage!.complete).toBe(true);
    expect(screen.getByText(/unavailable comparisons are not zero effects/)).toBeInTheDocument();
    expect(screen.queryByText("All available sources", { exact: true })).not.toBeInTheDocument();
    // Some broader country histories retain other enabled components. Their
    // missing coverage must also stay independent of the selected Finnish run.
    expect(result.countries.some(c => c.points.length === 0)).toBe(true);
  });

  it("keeps source controls available when the selected scenario itself lacks coverage", () => {
    const view = openScenario("s_edges=unknown");
    expect(screen.getByRole("alert")).toHaveTextContent("years without source data");
    const result = metadata(view.container);
    expect(result.status).toBe("unavailable");
    expect(result.error).toMatch(/Missing source profile/);
    expect(result.points).toEqual([]);
    expect(result.coverage).toBeNull();
    expect(result.sources).toHaveLength(3);
    expect(result.countries).toHaveLength(5);
    const switches = screen.getAllByRole("checkbox", { hidden: true });
    expect(switches).toHaveLength(3);
    expect(switches.filter(c => (c as HTMLInputElement).checked)).toHaveLength(2);
    fireEvent.click(switches.find(c => (c as HTMLInputElement).checked)!);
    expect(new URLSearchParams(window.location.search).get("s_off")).toBeTruthy();
    view.rerender(<BermAtlasScenario {...props} />);
    expect(screen.getAllByRole("checkbox", { hidden: true }).filter(c => !(c as HTMLInputElement).checked)).toHaveLength(2);
  });

  it("uses the same normalized timing in the control, source profiles and exported metadata", () => {
    const { container } = openScenario("s_timing=not-a-timing-case");
    const result = metadata(container);
    expect(screen.getByRole("combobox", { name: "Intermediate-year timing" })).toHaveValue("linear");
    expect(result.parameters.timing).toBe("linear");
    expect(result.sources.every(s => s.profileMode === "linear")).toBe(true);
  });

  it("labels observation-only support without extending a source into an invented early history", () => {
    const { container } = openScenario("");
    const mobile = metadata(container).sources.find(s => s.familyId === "cellular-total")!;
    expect(mobile.temporalScopeBasis).toBe("observed-period");
    expect(mobile.windows).toEqual([{ startYear: mobile.dataYears[0], endYear: Math.min(2023, mobile.dataYears[1]) }]);
    expect(mobile.startYear).toBeGreaterThan(1950);
    expect(evaluateScenarioSource(mobile, 1950, 0)).toEqual({ value: 0, basis: "outside-operation-window" });
    expect(screen.getByText(/Such a boundary need not indicate actual adoption or shutdown/)).toBeInTheDocument();
  });

  it("excludes a singleton from both calculations until opted in, retaining the assumption in metadata", () => {
    const view = openScenario("");
    let result = metadata(view.container);
    expect(result.parameters.singleObservationPolicy).toBe("explicit-opt-in");
    const meter = (items: TechnologyScenarioInput[]) => items.find(s => s.id === "smart-metering")!;
    expect(meter(result.sources)).toMatchObject({ singleObservation: true, singleObservationOptIn: false, enabled: false });
    expect(meter(result.comparison.sources).enabled).toBe(false);

    const meterSelect = screen.getAllByRole("combobox", { hidden: true }).find(s => (s as HTMLSelectElement).value === "fi_hourly_meter_coverage")!;
    fireEvent.click(meterSelect.closest("div")!.querySelector("input[type=checkbox]")!);
    view.rerender(<BermAtlasScenario {...props} />);
    result = metadata(view.container);
    expect(meter(result.sources)).toMatchObject({ singleObservationOptIn: true, enabled: true });
    expect(meter(result.comparison.sources).enabled).toBe(true);
    expect(result.coverage!.byYear.some(row => row.assumedProfileIds.includes("smart-metering"))).toBe(true);

    // Unknown support must fail rather than turning an enabled snapshot into zeros.
    fireEvent.change(screen.getByRole("combobox", { name: "Years beyond source data" }), { target: { value: "unknown" } });
    view.rerender(<BermAtlasScenario {...props} />);
    expect(screen.getByRole("alert")).toHaveTextContent("years without source data");
    const zeroSnapshot = { ...meter(result.sources), profileOutside: "unknown" as const, profile: [{ year: 2017, value: 0 }] };
    expect(evaluateScenarioSource(zeroSnapshot, 2017, 0)).toEqual({ value: 0, basis: "profile-point" });
    expect(evaluateScenarioSource(zeroSnapshot, 2016, 0)).toEqual({ value: null, basis: "profile-missing" });
    expect(evaluateScenarioSource({ ...zeroSnapshot, enabled: false }, 2016, 0)).toEqual({ value: 0, basis: "disabled" });
  });

  it("re-evaluates singleton eligibility when switching source series without losing an explicit opt-in", () => {
    const original = technologyDriversData.series;
    const snapshot = original.find(s => s.id === "fi_hourly_meter_coverage")!;
    // A local alternative exercises a future two-series family; it is never
    // written to the registry or substituted for a published observation.
    const annual: TechnologyDriverSeries = { ...snapshot, id: "test-fi-meter-annual", title: { en: "Test annual alternative", fi: "Testin vuosivaihtoehto" },
      points: [{ ...snapshot.points[0], year: 2013, value: 50 }, { ...snapshot.points[0], year: 2017 }] };
    technologyDriversData.series = [...original, annual];
    try {
      const view = openScenario(`s_driver_smart-metering=${annual.id}`);
      const meter = () => metadata(view.container).sources.find(s => s.id === "smart-metering")!;
      const select = () => screen.getAllByRole("combobox", { hidden: true }).find(s => [snapshot.id, annual.id].includes((s as HTMLSelectElement).value))!;
      const change = (id: string) => { fireEvent.change(select(), { target: { value: id } }); view.rerender(<BermAtlasScenario {...props} />); };
      expect(meter()).toMatchObject({ singleObservation: false, enabled: true });
      change(snapshot.id);
      expect(meter()).toMatchObject({ singleObservation: true, singleObservationOptIn: false, enabled: false });
      fireEvent.click(select().closest("div")!.querySelector("input[type=checkbox]")!);
      view.rerender(<BermAtlasScenario {...props} />);
      expect(meter()).toMatchObject({ singleObservationOptIn: true, enabled: true });
      change(annual.id);
      expect(meter()).toMatchObject({ singleObservation: false, enabled: true });
      change(snapshot.id);
      expect(meter()).toMatchObject({ singleObservation: true, singleObservationOptIn: true, enabled: true });
      view.unmount();
    } finally { technologyDriversData.series = original; }
  });

  it("exports unavailable countries as missing calculations, alongside valid zero-change rows", async () => {
    const download = vi.spyOn(atlasDisplay, "downloadAtlasBlob").mockImplementation(() => {});
    const { container } = openScenario("s_edges=unknown&s_off=electric-grid,smart-metering,cellular-total");
    const result = metadata(container);
    const missing = result.countries.filter(c => c.status === "unavailable");
    expect(missing.length).toBeGreaterThan(0);
    expect(missing.every(c => c.error.startsWith("Missing source profile"))).toBe(true);
    expect(result.comparison.error).toMatch(/Missing source profile/);
    fireEvent.click(screen.getByRole("button", { name: "Download five-country scenario and parameters (CSV)" }));
    expect(download).toHaveBeenCalledOnce();
    const blob = download.mock.calls[0][0];
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(blob);
    });
    const rows = csvParse(text.replace(/^\uFEFF/, ""));
    for (const country of missing) {
      const row = rows.find(r => r.country === country.countryId)!;
      expect(row.calculation_status).toBe("unavailable");
      expect(row.calculation_error).toBe(country.error);
      expect(row.relative_TFR_multiplier).toBe("");
      expect(row.conditional_tfr_15_49).toBe("");
      expect(row.year).toBe("");
    }
    const valid = rows.filter(r => r.country === "FIN");
    expect(valid).toHaveLength(74);
    expect(valid.every(row => row.calculation_status === "calculated" && row.relative_TFR_multiplier === "1")).toBe(true);
    expect(JSON.parse(valid[0].sources_json).find((s: TechnologyScenarioInput) => s.id === "smart-metering")).toMatchObject({ singleObservation: true, singleObservationOptIn: false, enabled: false });
  });
});
