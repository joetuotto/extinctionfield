import "@testing-library/jest-dom/vitest";
import type { ComponentProps } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { csvParse } from "d3";
import { BermEndpointPanel } from "../BermEndpointPanel";
import type { ChangeAtlasPredictionOverlay } from "../ChangeAtlasCharts";
import { getChangeAtlasSeries, getChangeAtlasSource } from "@/lib/change-atlas-data";
import type { BermEndpointCalibration, BermCalibratedEndpointPrediction } from "@/lib/berm-endpoint-calibration";
import type { BermEndpointParameters, BermEndpointScenario } from "@/lib/berm-endpoint-scenario";
import type { BermBiomarkerCalibrationProtocol } from "@/lib/berm-biomarker-calibration-protocols";
import type { TechnologyScenarioInput } from "@/lib/berm-technology-inputs";
import { downloadAtlasBlob } from "@/lib/change-atlas-display";
import { indexedReference } from "@/lib/referenceIndex";
import * as calibratedAtlas from "@/lib/berm-calibrated-atlas";

// Actual observations, source adapter, fitter and charts; only router and download side effects are replaced.
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(window.location.search) }));
vi.mock("@/lib/change-atlas-display", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/change-atlas-display")>(), downloadAtlasBlob: vi.fn(),
}));
beforeEach(() => { window.history.replaceState(null, "", "/en/explore?country=FIN&forecast=1#atlas"); });
afterEach(() => { cleanup(); vi.clearAllMocks(); });

type Props = ComponentProps<typeof BermEndpointPanel>;
interface Entry {
  seriesId: string; throughYear: number; protocol?: BermBiomarkerCalibrationProtocol;
  fit: BermEndpointCalibration; prediction: BermCalibratedEndpointPrediction;
}
interface Metadata {
  kind: string; countryId: string; parameters: BermEndpointParameters; displayedModes: string[];
  calibrationReference: { query: string; parameters: BermEndpointParameters; sources: TechnologyScenarioInput[] };
  calibrations: Entry[]; scenario: BermEndpointScenario; sources: TechnologyScenarioInput[];
  inputsChanged: boolean; overlays: Record<string, ChangeAtlasPredictionOverlay>; error: string;
}
function propsFor(countryId = "FIN", hormoneId?: string, overrides: Partial<Props> = {}): Props {
  const tfr = getChangeAtlasSeries(countryId, "tfr")[0];
  const hormone = getChangeAtlasSeries(countryId, "testosterone_total").find(s => hormoneId ? s.id === hormoneId : s.testosteroneTrendId);
  const raw = hormone ? [tfr, hormone] : [tfr];
  return { countryId, locale: "en", from: 1950, to: 2023, year: 2002, observations: raw, rawObservations: raw,
    indexYear: null, onYearChange: vi.fn(), onOpenSource: vi.fn(), ...overrides };
}
function openPanel(query = "forecast=1", props = propsFor()) {
  window.history.replaceState(null, "", `/en/explore?country=${props.countryId}&year=${props.year}&${query}#atlas`);
  return { ...render(<BermEndpointPanel {...props} />), props };
}
function metadata(container: HTMLElement): Metadata {
  return JSON.parse(container.querySelector("[data-berm-endpoint]")!.getAttribute("data-berm-endpoint")!);
}
function hormone(data: Metadata, id = "fi-finrisk-testosterone-60-69") { return data.calibrations.find(c => c.seriesId === id)!; }
function openDetails(container: HTMLElement) { container.querySelectorAll("details").forEach(details => { details.open = true; }); }
function readBlob(blob: Blob) {
  return new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsText(blob); });
}

describe("data-calibrated BERM endpoint integration", () => {
  it("hydrates observations first and mounts full-precision browser calculations without cross-engine attributes", async () => {
    const props = propsFor("FIN", undefined, { locale: "fi", year: 2023 });
    const original = calibratedAtlas.buildBermCalibratedAtlas;
    const query = new URLSearchParams(window.location.search).toString();
    const browser = structuredClone(original(query, props.countryId, props.rawObservations))!;
    // Represent WebKit's last-bit retention difference and a small optimizer
    // difference. Both remain genuine numbers; presentation must not round them.
    const history = browser.scenario!.history.at(-1)!;
    history.accumulated = history.accumulated! + 1e-12;
    const predicted = browser.calibrations[0].prediction.points.at(-1)!.channels.combined;
    predicted.value = predicted.value! + 1e-8;
    const calculate = vi.spyOn(calibratedAtlas, "buildBermCalibratedAtlas").mockImplementation(() => {
      throw new Error("Calibration must not run during the server/initial hydration render");
    });
    const host = document.createElement("div"); document.body.appendChild(host);
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const recover = vi.fn();
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      const server = renderToString(<BermEndpointPanel {...props} />);
      expect(calculate).not.toHaveBeenCalled();
      expect(server).toContain("data-berm-calibration-pending");
      expect(server).toContain('data-series-id="fin-tfr"');
      expect(server).not.toContain("data-berm-endpoint=");
      expect(server).not.toContain("data-memory-example=");
      host.innerHTML = server;
      calculate.mockReturnValue(browser);
      await act(async () => { root = hydrateRoot(host, <BermEndpointPanel {...props} />, { onRecoverableError: recover }); });
      expect(calculate).toHaveBeenCalled();
      expect(recover).not.toHaveBeenCalled();
      expect(errors.mock.calls.filter(call => /hydrat|didn't match|did not match/i.test(String(call[0])))).toEqual([]);
      expect(host.querySelector("[data-berm-calibration-pending]")).toBeNull();
      const shown = metadata(host);
      expect(shown.scenario.history.at(-1)!.accumulated).toBe(history.accumulated);
      expect(shown.calibrations[0].prediction.points.at(-1)!.channels.combined.value).toBe(predicted.value);
      expect(host.querySelector("[data-memory-example]")).toBeInTheDocument();
      expect(host.querySelector('[data-prediction-line="fin-tfr:combined"]')).toBeInTheDocument();
    } finally {
      if (root) await act(async () => root!.unmount());
      host.remove(); calculate.mockRestore(); errors.mockRestore();
    }
  });

  it("fits the actual Finnish median contrast beyond the old slider bound and holds out all TFR years after 2000", () => {
    const view = openPanel();
    const data = metadata(view.container), t = hormone(data);
    expect(data.kind).toBe("conditionally_calibrated_BERM_endpoints");
    expect(data.error).toBe("");
    expect(t.fit.channels.combined.status).toBe("calibrated");
    expect(t.fit.channels.combined.beta).toBeCloseTo(5.83224754, 5);
    expect(t.fit.baseline).toMatchObject({ value: 21.9, period: { startYear: 1977, endYear: 1977 } });
    expect(t.prediction.points.find(p => p.year === 2002)!.channels.combined.value).toBeCloseTo(13.8, 7);
    expect(t.fit.included.map(p => p.startYear)).toEqual([1977, 2002]);
    expect(t.fit.heldOut).toEqual([]);
    expect(t.fit.included[0].sourcePoint.intervalKind).toBe("percentile_5_95");
    expect(t.fit.metadata.uncertainty).toBe("descriptive-errors-only");
    const fertility = data.calibrations.find(c => c.seriesId !== t.seriesId)!;
    expect(fertility.throughYear).toBe(2000);
    expect(fertility.fit.included).toHaveLength(51);
    expect(fertility.fit.heldOut.map(p => p.year)).toEqual(Array.from({ length: 23 }, (_, i) => 2001 + i));
    const baseline = getChangeAtlasSeries("FIN", "asfr").reduce((sum, s) => sum + 5 * s.points.find(p => p.year === 1950)!.value / 1000, 0);
    expect(fertility.fit.baselineOrigin).toBe("explicit-override");
    expect(fertility.fit.baseline!.value).toBeCloseTo(baseline);
    expect(fertility.fit.channels.combined.periodPredictions.filter(p => p.role === "heldout")).toHaveLength(23);
    expect(view.container.querySelectorAll("[data-period-bar]")).toHaveLength(2);
  });

  it("uses only comparable US assay periods and preserves excluded source observations and SE annotations", () => {
    const view = openPanel("forecast=1", propsFor("USA"));
    const t = hormone(metadata(view.container), "us-nhanes-testosterone-15-39");
    expect(t.throughYear).toBe(2016);
    expect(t.fit.included.map(p => [p.startYear, p.endYear])).toEqual([[2013, 2014], [2015, 2016]]);
    expect(t.fit.excluded.map(p => [p.observation.startYear, p.reason])).toEqual([[1999, "not-eligible"], [2003, "not-eligible"], [2011, "not-eligible"]]);
    expect(t.fit.baseline).toMatchObject({ value: 431.76, period: { startYear: 2013, endYear: 2014 } });
    expect(t.fit.included.map(p => p.sourcePoint.standardError)).toEqual([7.19, 10.03]);
    expect(t.fit.included.every(p => p.sourcePoint.lower === null && p.sourcePoint.upper === null)).toBe(true);
    expect(t.fit.channels.combined.periodPredictions.map(p => p.predicted)).toEqual([expect.closeTo(431.76, 5), expect.closeTo(451.22, 5)]);
    const lane = view.container.querySelector('[data-series-id="us-nhanes-testosterone-15-39"]')!;
    expect(lane.querySelectorAll("[data-period-bar]")).toHaveLength(5);
    expect(lane).toHaveTextContent("Standard error (SE)");
  });

  it("does not fake a calibration for the Finnish pooled median plus one annual observation", () => {
    const view = openPanel("forecast=1", propsFor("FIN", "fi-finrisk-testosterone-25-29"));
    const t = hormone(metadata(view.container), "fi-finrisk-testosterone-25-29");
    expect(t.fit.included.map(p => p.startYear)).toEqual([2002]);
    expect(t.fit.excluded[0]).toMatchObject({ reason: "unsupported-statistic", observation: { startYear: 1972, endYear: 1977 } });
    expect(t.fit.channels.combined.status).toBe("insufficient-points");
    expect(t.fit.channels.combined.beta).toBeNull();
    expect(t.prediction.points.every(p => p.channels.combined.value === null)).toBe(true);
    const card = view.container.querySelector('[data-calibration-summary="fi-finrisk-testosterone-25-29"]')!;
    expect(card).toHaveTextContent("Insufficient compatible observations");
    const lane = view.container.querySelector('[data-series-id="fi-finrisk-testosterone-25-29"]')!;
    expect(lane.querySelectorAll("[data-period-bar]")).toHaveLength(2);
    expect(lane).not.toHaveTextContent("BERM response closure calibrated to observations");
    expect(lane).toHaveTextContent("Calibration is unavailable");
    expect(lane).not.toHaveTextContent("Fitted interval");
    expect(metadata(view.container).overlays[t.seriesId].lines[0].calibration).toBeUndefined();
  });

  it("selects the fitted gain for each channel rather than reusing the combined gain", () => {
    const view = openPanel();
    const original = hormone(metadata(view.container)).fit.channels;
    fireEvent.click(screen.getByRole("button", { name: "Annual response" }));
    view.rerender(<BermEndpointPanel {...view.props} />);
    const data = metadata(view.container), t = hormone(data);
    expect(data.displayedModes).toEqual(["annual"]);
    expect(t.fit.channels).toEqual(original);
    expect(t.fit.channels.annual.beta).toBeCloseTo(8.72786136, 5);
    expect(t.fit.channels.annual.beta).not.toBe(t.fit.channels.combined.beta);
    expect(data.overlays[t.seriesId].lines[0].mode).toBe("annual");
    expect(data.overlays[t.seriesId].lines[0].points.find(p => p.year === 2002)!.value).toBeCloseTo(13.8, 7);
    expect(data.inputsChanged).toBe(false);
  });

  it("keeps the fitted gain and intercept locked through source and recovery changes, then explicitly recalibrates", async () => {
    const view = openPanel();
    const initial = metadata(view.container), initialFit = hormone(initial).fit.channels.combined;
    fireEvent.click(screen.getByRole("button", { name: "Download calibrated predictions and their calculation basis (CSV)" }));
    const initialRows = csvParse((await readBlob(vi.mocked(downloadAtlasBlob).mock.calls[0][0])).replace(/^\uFEFF/, ""));
    openDetails(view.container);
    const amplitude = screen.getAllByRole("slider").find(s => s.getAttribute("aria-label")?.endsWith(" · amplitude"))!;
    fireEvent.change(amplitude, { target: { value: "0.5" } });
    // A second control operates before a router rerender; both URL mutations must survive.
    fireEvent.change(screen.getByRole("slider", { name: "Retention half-life · years" }), { target: { value: "35" } });
    view.rerender(<BermEndpointPanel {...view.props} />);
    const changed = metadata(view.container), changedFit = hormone(changed).fit.channels.combined;
    expect(changed.inputsChanged).toBe(true);
    expect(changedFit).toEqual(initialFit);
    expect(changed.calibrationReference.query).toBe("");
    expect(changed.parameters.halfLifeYears).toBe(35);
    expect(changed.sources.some(s => s.amplitude === 0.5)).toBe(true);
    expect(hormone(changed).prediction.points.find(p => p.year === 2002)!.channels.combined.value).not.toBeCloseTo(13.8, 3);
    expect(view.container.querySelector("[data-fixed-calibration]")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Download calibrated predictions and their calculation basis (CSV)" }));
    const changedRows = csvParse((await readBlob(vi.mocked(downloadAtlasBlob).mock.calls[1][0])).replace(/^\uFEFF/, ""));
    for (const year of [1976, 1977, 2002, 2003]) {
      const initialRow = initialRows.find(row => row.series === "fi-finrisk-testosterone-60-69" && row.year === String(year))!;
      const changedRow = changedRows.find(row => row.series === initialRow.series && row.year === initialRow.year)!;
      expect(changedRow.time_role).toBe(initialRow.time_role);
      expect(changedRow.calculation_role).toMatch(/changed-input/);
      expect(changedRow.role).toBe(changedRow.calculation_role);
      expect(changedRow.inputs_changed).toBe("true");
      expect(initialRow.inputs_changed).toBe("false");
      expect(changedRow.beta).toBe(initialRow.beta);
      expect(changedRow.log_scale).toBe(initialRow.log_scale);
    }
    const changedCalibrationYear = changedRows.find(row => row.series === "fi-finrisk-testosterone-60-69" && row.year === "2002")!;
    expect(changedCalibrationYear.time_role).toBe("calibration-period");
    expect(changedCalibrationYear.calculation_role).not.toBe("calibration-period");
    fireEvent.click(screen.getByRole("button", { name: "Recalibrate using current input settings" }));
    const saved = new URLSearchParams(new URLSearchParams(window.location.search).get("ep_reference")!);
    expect(saved.get("ep_halfLife")).toBe("35");
    expect([...saved.keys()].some(key => key.startsWith("s_amp_"))).toBe(true);
    expect(saved.has("country")).toBe(false);
    view.rerender(<BermEndpointPanel {...view.props} />);
    const recalibrated = metadata(view.container), finalFit = hormone(recalibrated).fit.channels.combined;
    expect(recalibrated.inputsChanged).toBe(false);
    expect(finalFit.beta).not.toBeCloseTo(initialFit.beta!, 4);
    expect(hormone(recalibrated).prediction.points.find(p => p.year === 2002)!.channels.combined.value).toBeCloseTo(13.8, 7);
    expect(window.location.hash).toBe("#atlas");
  });

  it("keeps complete history and calibration unchanged when the URL crop excludes the anchor", () => {
    const view = openPanel();
    const initial = metadata(view.container);
    const url = new URL(window.location.href); url.searchParams.set("from", "2000"); url.searchParams.set("to", "2010"); window.history.replaceState(null, "", url);
    const cropped = { ...view.props, from: 2000, to: 2010, observations: view.props.rawObservations.map(s => ({ ...s, points: s.points.filter(p => (p.startYear ?? p.year) >= 2000 && (p.endYear ?? p.year) <= 2010) })) };
    view.rerender(<BermEndpointPanel {...cropped} />);
    const result = metadata(view.container);
    expect(result.scenario.history).toEqual(initial.scenario.history);
    expect(result.calibrations).toEqual(initial.calibrations);
    expect(result.overlays["fi-finrisk-testosterone-60-69"].lines[0].points).toHaveLength(11);
    expect(result.calibrationReference).toEqual(initial.calibrationReference);
  });

  it("detects changed annual and history channels even when their combined signal remains identical", () => {
    const reference = new URLSearchParams("ep_halfLife=0&ep_annualWeight=0.5&ep_historyWeight=0");
    const query = new URLSearchParams(reference);
    query.set("forecast", "1"); query.set("ep_reference", reference.toString());
    const view = openPanel(query.toString());
    const initial = metadata(view.container), initialFit = hormone(initial).fit;
    expect(initial.inputsChanged).toBe(false);
    expect(initialFit.channels.annual.status).toBe("calibrated");
    openDetails(view.container);
    fireEvent.change(screen.getByRole("slider", { name: "Annual channel weight" }), { target: { value: "0" } });
    fireEvent.change(screen.getByRole("slider", { name: "History channel weight · 1/year" }), { target: { value: "0.5" } });
    view.rerender(<BermEndpointPanel {...view.props} />);
    const changed = metadata(view.container), changedFit = hormone(changed).fit;
    expect(changed.parameters).toMatchObject({ halfLifeYears: 0, annualWeight: 0, historyWeight: 0.5 });
    expect(changed.scenario.history.every(p => p.accumulated === p.annual)).toBe(true);
    expect(changed.scenario.history.map(p => p.channels.combined)).toEqual(initial.scenario.history.map(p => p.channels.combined));
    expect(changed.scenario.history.map(p => p.channels.annual)).not.toEqual(initial.scenario.history.map(p => p.channels.annual));
    expect(changed.scenario.history.map(p => p.channels.accumulated)).not.toEqual(initial.scenario.history.map(p => p.channels.accumulated));
    expect(changed.inputsChanged).toBe(true);
    expect(view.container.querySelector("[data-fixed-calibration]")).toBeInTheDocument();
    expect(changed.calibrationReference).toEqual(initial.calibrationReference);
    for (const mode of ["annual", "accumulated", "combined"] as const) {
      expect(changedFit.channels[mode].beta).toBe(initialFit.channels[mode].beta);
      expect(changedFit.channels[mode].logScale).toBe(initialFit.channels[mode].logScale);
    }
    const before = hormone(initial).prediction.points.find(p => p.year === 2002)!;
    const after = hormone(changed).prediction.points.find(p => p.year === 2002)!;
    expect(after.channels.combined.value).toBe(before.channels.combined.value);
    expect(after.channels.annual.value).not.toBe(before.channels.annual.value);
  });

  it("switches between the default data calibration and explicit manual sensitivity", () => {
    const view = openPanel();
    expect(metadata(view.container).kind).toBe("conditionally_calibrated_BERM_endpoints");
    openDetails(view.container);
    fireEvent.change(screen.getByRole("combobox", { name: "Response-gain estimation" }), { target: { value: "manual" } });
    view.rerender(<BermEndpointPanel {...view.props} />);
    expect(metadata(view.container).kind).toBe("conditional_BERM_annual_and_accumulated_endpoints");
    openDetails(view.container);
    fireEvent.change(screen.getByRole("combobox", { name: "Response-gain estimation" }), { target: { value: "data" } });
    view.rerender(<BermEndpointPanel {...view.props} />);
    expect(metadata(view.container).kind).toBe("conditionally_calibrated_BERM_endpoints");
    expect(hormone(metadata(view.container)).fit.channels.combined.beta).toBeCloseTo(5.83224754, 5);
  });

  it("exports annual time roles together with exact source periods and held-out source proof", async () => {
    const view = openPanel();
    fireEvent.click(screen.getByRole("button", { name: "Download calibrated predictions and their calculation basis (CSV)" }));
    expect(downloadAtlasBlob).toHaveBeenCalledOnce();
    const [blob, filename] = vi.mocked(downloadAtlasBlob).mock.calls[0];
    expect(filename).toBe("berm-calibrated-FIN-1950-2023.csv");
    const rows = csvParse((await readBlob(blob)).replace(/^\uFEFF/, ""));
    expect(rows).toHaveLength(148);
    const tfrId = view.props.rawObservations.find(s => s.metric === "tfr")!.id;
    const tfrRows = rows.filter(row => row.series === tfrId);
    expect(tfrRows.filter(row => row.time_role === "calibration-period")).toHaveLength(51);
    expect(tfrRows.filter(row => row.time_role.startsWith("post-calibration")).map(row => Number(row.year))).toEqual(Array.from({ length: 23 }, (_, i) => 2001 + i));
    const proof = JSON.parse(tfrRows[0].calibration_json) as BermEndpointCalibration;
    expect(proof.included.at(-1)!.endYear).toBe(2000);
    expect(proof.heldOut[0]).toMatchObject({ startYear: 2001, endYear: 2001 });
    expect(proof.channels.combined.periodPredictions.filter(p => p.role === "heldout").every(p => p.startYear > 2000 && !!p.sourceId && !!p.sourceLocator)).toBe(true);
    const hormoneRows = rows.filter(row => row.series === "fi-finrisk-testosterone-60-69");
    expect(hormoneRows.find(row => row.year === "1976")!.time_role).toBe("backcast");
    expect(hormoneRows.find(row => row.year === "2002")!.time_role).toBe("calibration-period");
    expect(hormoneRows.find(row => row.year === "2003")!.time_role).toMatch(/^post-calibration/);
    expect(hormoneRows.every(row => row.role === row.calculation_role && row.inputs_changed === "false")).toBe(true);
    const hormoneProof = JSON.parse(hormoneRows[0].calibration_json) as BermEndpointCalibration;
    expect(hormoneProof.included[0].sourcePoint).toMatchObject({ collectionYears: [1977], collectionYearBasis: "unique-survey-age-cohort-intersection", intervalKind: "percentile_5_95", value: 21.9, lower: 10.3, upper: 40.9 });
    const reference = JSON.parse(hormoneRows[0].calibration_reference_json) as Metadata["calibrationReference"];
    expect(reference.sources.every(source => source.sourceIds.length > 0 && source.profile!.length > 0)).toBe(true);
    expect(reference.parameters.historyStartYear).toBe(1880);
    expect(Number(hormoneRows[0].beta)).toBeCloseTo(5.83224754, 5);
    const sourceRecords = JSON.parse(tfrRows[0].source_records_json) as { id: string; url: string }[];
    const tfrSource = getChangeAtlasSource(view.props.rawObservations.find(s => s.metric === "tfr")!.sourceIds[0])!;
    expect(sourceRecords).toContainEqual(expect.objectContaining({ id: tfrSource.id, url: tfrSource.url }));
    expect(sourceRecords.every(source => source.url.startsWith("https://"))).toBe(true);
    const protocol = JSON.parse(hormoneRows[0].biomarker_protocol_json) as BermBiomarkerCalibrationProtocol;
    expect(protocol.eligiblePeriods).toEqual([{ startYear: 1977, endYear: 1977 }, { startYear: 2002, endYear: 2002 }]);
    expect(protocol.sources[0].referenceId).toBe("perheentupa2013");
    expect(protocol.sources[0].url).toBe(indexedReference("perheentupa2013")!.externalUrl);
    expect(protocol.independentHoldout).toBe(false);
  });
});
