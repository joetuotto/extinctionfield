import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TechnologyDriverPanel } from "../TechnologyDriverPanel";

const fixture = vi.hoisted(() => {
  const text = (en: string, fi = en) => ({ en, fi });
  const source = { id: "official", title: "Original statistical table", url: "https://example.org/statistics?table=1&country=FIN", license: "CC BY 4.0", retrievedAt: "2026-09-08", scope: text("Finland"), artifacts: [] };
  const make = (id: string, family: string, title: string, unit: string, values: number[]) => ({
    id, countryId: "FIN", technologyFamilyId: family, datasetFamily: "technology", metric: `technology_${id}`, title: text(title), unit: `technology_unit_${unit}`, unitLabel: text(unit), valueScale: "linear", status: "reported", frequency: "annual", population: text("Finland, reported service customers", "Suomi, ilmoitetut palveluasiakkaat"), sourceIds: [source.id], method: text("Original annual source records"), limitations: [text("Customer counts do not specify local field strength.")],
    points: [2000, 2001, 2004].map((year, index) => ({ year, value: values[index], lower: index === 0 ? values[index] - 1 : null, upper: index === 0 ? values[index] + 1 : null, denominator: index === 0 ? { value: 10000, unit: "customers", population: text("all service customers", "kaikki palveluasiakkaat") } : undefined, sourceId: source.id, sourceLocator: `Table 1, row ${year}`, imputed: false })),
  });
  const series = [make("grid", "electric-grid", "Electricity customers", "customers", [100, 120, 180]), make("radio", "radio-broadcast", "Radio ownership", "% households", [10, 12, 18]), make("mobile", "cellular-total", "Total mobile subscriptions", "subscriptions / 100 people", [20, 40, 60])];
  const ids = ["electric-grid", "radio-broadcast", "terrestrial-tv", "analog-cellular", "digital-2g", "mobile-3g", "mobile-4g", "mobile-5g", "lighting-drivers", "smart-metering", "power-conversion", "wifi", "radio-navigation"];
  const labels: Record<string, string> = { "electric-grid": "Electricity networks", "radio-broadcast": "Radio broadcasting", "terrestrial-tv": "Terrestrial television", "digital-2g": "Digital 2G", "smart-metering": "Smart metering" };
  const families = ids.map(id => ({ id, label: text(labels[id] ?? id) }));
  const tracks = [{ countryId: "FIN", familyId: "digital-2g", gap: text("Generation-specific uptake is unresolved."), phases: [{ startYear: 1991, endYear: 2024 }] }];
  const anchors = [{ id: "meter-point", countryIds: ["FIN"], familyIds: ["smart-metering"], startYear: 2001, kind: "measurement", title: text("Reported meter point"), scope: text("Finland electricity meters"), sourceRefs: ["reconstruction:official"], values: [{ value: 25, unit: "percent", denominator: text("electricity meters"), label: text("Meter share") }] }];
  return { source, series, families, tracks, anchors, getSeries: vi.fn(), getCoverage: vi.fn(), download: vi.fn() };
});

vi.mock("@/lib/change-atlas-data", () => ({
  changeAtlasData: { updatedAt: "2026-09-08" },
  getChangeAtlasSeries: (country: string) => { fixture.getSeries(country); return country === "FIN" ? fixture.series : []; },
  getChangeAtlasSource: (id: string) => id === fixture.source.id ? fixture.source : undefined,
}));
vi.mock("@/lib/field-reconstruction", () => ({
  fieldReconstruction: { families: fixture.families, anchors: fixture.anchors },
  getReconstructionTracks: (country: string) => country === "FIN" ? fixture.tracks : [],
  getReconstructionSources: () => [fixture.source],
}));
vi.mock("@/lib/technology-drivers-data", () => ({
  getTechnologyDriverCoverage: (country: string, from: number, to: number) => {
    fixture.getCoverage(country, from, to);
    return fixture.families.map(family => {
      const series = country === "FIN" ? fixture.series.filter(s => s.technologyFamilyId === family.id) : [];
      const points = series.flatMap(s => s.points.filter(p => p.year >= from && p.year <= to));
      const anchors = country === "FIN" ? fixture.anchors.filter(a => a.familyIds.includes(family.id) && a.startYear >= from && a.startYear <= to) : [];
      const years = [...points.map(p => p.year), ...anchors.map(a => a.startYear)].sort();
      const history = country === "FIN" && family.id === "digital-2g" && from <= 2024 && to >= 1991;
      return { familyId: family.id, seriesIds: series.map(s => s.id), status: points.length >= 3 ? "series" : years.length ? "anchors" : history ? "history" : "open", pointCount: years.length, firstYear: years[0] ?? null, lastYear: years.at(-1) ?? null };
    });
  },
}));
vi.mock("@/lib/change-atlas-display", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/change-atlas-display")>(),
  downloadAtlasBlob: (blob: Blob, filename: string) => fixture.download(blob, filename),
}));

beforeEach(() => { window.history.replaceState({}, "", "/?t_family=all"); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); fixture.download.mockClear(); fixture.getSeries.mockClear(); fixture.getCoverage.mockClear(); window.history.replaceState({}, "", "/"); });
const props = { countryId: "FIN", locale: "en", from: 2000, to: 2005, year: 2002, onYearChange: vi.fn() };
const readBlob = (blob: Blob) => new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsText(blob); });

describe("TechnologyDriverPanel source observations", () => {
  it("shows every quantitative family with its native unit, scope and original source", () => {
    const { container } = render(<TechnologyDriverPanel {...props} />);
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Electricity networks" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Radio broadcasting" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Mobile, all generations" })).toBeVisible();
    expect(container).toHaveTextContent("customers");
    expect(container).toHaveTextContent("% households");
    expect(container).toHaveTextContent("subscriptions / 100 people");
    expect(container).toHaveTextContent("Finland, reported service customers");
    const sources = screen.getAllByRole("link", { name: "Original statistical table ↗" });
    expect(sources).toHaveLength(3);
    sources.forEach(link => expect(link).toHaveAttribute("href", fixture.source.url));
    expect(container).toHaveTextContent("local fields and their coupling to organisms require a separate reconstruction");
  });

  it("keeps annual gaps empty by default, retains reported uncertainty, and aligns all cursors", () => {
    const { container } = render(<TechnologyDriverPanel {...props} />);
    expect(container.querySelectorAll("[data-driver-observation]")).toHaveLength(9);
    expect([...container.querySelectorAll("[data-driver-annual]")].map(node => node.getAttribute("data-driver-annual"))).toEqual(["2000:2001", "2000:2001", "2000:2001"]);
    expect(container.querySelectorAll("[data-driver-reconstruction]")).toHaveLength(0);
    expect(container.querySelectorAll("[data-driver-estimate]")).toHaveLength(0);
    expect(container.querySelectorAll("[data-driver-interval]")).toHaveLength(3);
    const readout = container.querySelector('[data-driver-readout="grid"]');
    expect(readout).toHaveTextContent("2002 · No source observation");
    expect(readout).not.toHaveTextContent("0 customers");
    const cursors = [...container.querySelectorAll("[data-driver-cursor]")];
    expect(new Set(cursors.map(node => node.getAttribute("x1"))).size).toBe(1);
    const charts = [...container.querySelectorAll("svg")];
    expect(charts.map(svg => [...svg.querySelectorAll("[data-driver-axis-year]")].map(node => [node.textContent, node.getAttribute("x")]))).toEqual(Array(3).fill([...charts[0].querySelectorAll("[data-driver-axis-year]")].map(node => [node.textContent, node.getAttribute("x")])));
  });

  it("adds an explicitly labelled linear reconstruction without extra observation points or scale changes", () => {
    const { container, rerender } = render(<TechnologyDriverPanel {...props} />);
    const domains = [...container.querySelectorAll("[data-y-domain]")].map(node => node.getAttribute("data-y-domain"));
    fireEvent.click(screen.getByRole("checkbox", { name: /Show linear reconstruction/ }));
    expect(container.querySelectorAll("[data-driver-reconstruction='2001:2004']")).toHaveLength(3);
    expect(container.querySelectorAll("[data-driver-observation]")).toHaveLength(9);
    expect(container.querySelector('[data-driver-readout="grid"]')).toHaveTextContent("Linear reconstruction: 140 customers (source years 2001–2004)");
    expect([...container.querySelectorAll("[data-y-domain]")].map(node => node.getAttribute("data-y-domain"))).toEqual(domains);
    rerender(<TechnologyDriverPanel {...props} year={2005} />);
    expect(container.querySelectorAll("[data-driver-estimate]")).toHaveLength(0);
    expect(container.querySelector('[data-driver-readout="grid"]')).toHaveTextContent("2005 · No source observation");
  });

  it("clips reconstruction to the time range while retaining the actual source bracket", () => {
    const { container } = render(<TechnologyDriverPanel {...props} from={2002} to={2003} />);
    fireEvent.click(screen.getByRole("checkbox", { name: /Show linear reconstruction/ }));
    const line = container.querySelector('[data-driver-reconstruction="2001:2004"]')!;
    expect(line).toHaveAttribute("x1", "60");
    expect(line).toHaveAttribute("x2", "584");
    expect(container.querySelectorAll("[data-driver-observation]")).toHaveLength(0);
    expect(container.querySelector('[data-driver-readout="grid"]')).toHaveTextContent("source years 2001–2004");
    expect(screen.getByRole("button", { name: "Export visible source points as CSV" })).toBeDisabled();
  });

  it("supports a functional family filter and preserves total mobile as a separate group", () => {
    const { container } = render(<TechnologyDriverPanel {...props} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Source family" }), { target: { value: "radio-broadcast" } });
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(1);
    expect(container.querySelector('[data-driver-series="radio"]')).toBeTruthy();
    fireEvent.change(screen.getByRole("combobox", { name: "Source family" }), { target: { value: "cellular-total" } });
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(1);
    expect(container.querySelector('[data-driver-series="mobile"]')).toBeTruthy();
  });

  it("keeps all 13 families in the coverage table and exposes history, anchors and open data gaps", () => {
    const { container } = render(<TechnologyDriverPanel {...props} />);
    fireEvent.click(screen.getByText("Coverage by source family · 13"));
    const rows = container.querySelectorAll("[data-driver-coverage]");
    expect(rows).toHaveLength(13);
    expect(fixture.getCoverage).toHaveBeenCalledWith("FIN", 2000, 2005);
    expect(container.querySelector('[data-driver-coverage="electric-grid"]')).toHaveTextContent("Time series");
    expect(container.querySelector('[data-driver-coverage="digital-2g"]')).toHaveTextContent("History only");
    expect(container.querySelector('[data-driver-coverage="smart-metering"]')).toHaveTextContent("Point anchors");
    expect(container.querySelector('[data-driver-coverage="wifi"]')).toHaveTextContent("Open");
    fireEvent.click(within(container.querySelector('[data-driver-coverage="smart-metering"]')! as HTMLElement).getByRole("button"));
    expect(screen.getByRole("combobox")).toHaveValue("smart-metering");
    expect(screen.getByRole("button", { name: "2001 · Reported meter point" })).toBeVisible();
    expect(screen.getByText("Meter share: 25 percent · electricity meters")).toBeVisible();
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(0);
  });

  it("defaults to electricity networks and preserves existing URL selections when changing the display", () => {
    window.history.replaceState({ preserve: true }, "", "/fi/explore?country=FIN&from=2000&custom=keep#atlas");
    const { container } = render(<TechnologyDriverPanel {...props} />);
    expect(screen.getByRole("combobox")).toHaveValue("electric-grid");
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(1);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "radio-broadcast" } });
    fireEvent.click(screen.getByRole("checkbox"));
    const url = new URL(window.location.href);
    expect(url.searchParams.get("country")).toBe("FIN");
    expect(url.searchParams.get("from")).toBe("2000");
    expect(url.searchParams.get("custom")).toBe("keep");
    expect(url.searchParams.get("t_family")).toBe("radio-broadcast");
    expect(url.searchParams.get("t_interpolate")).toBe("1");
    expect(url.hash).toBe("#atlas");
    expect(window.history.state).toEqual({ preserve: true });
    const exportedState = JSON.parse(container.querySelector("[data-technology-driver-state]")!.getAttribute("data-technology-driver-state")!);
    expect(exportedState).toMatchObject({ countryId: "FIN", from: 2000, to: 2005, year: 2002, familyId: "radio-broadcast", linearReconstruction: true, seriesIds: ["radio"], sourceIds: [fixture.source.id] });
  });

  it("restores validated query settings on mount and browser navigation", () => {
    window.history.replaceState({}, "", "/?t_family=radio-broadcast&t_interpolate=1");
    const { container } = render(<TechnologyDriverPanel {...props} />);
    expect(screen.getByRole("combobox")).toHaveValue("radio-broadcast");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(1);
    window.history.replaceState({}, "", "/?t_family=invented&t_interpolate=true");
    act(() => window.dispatchEvent(new PopStateEvent("popstate")));
    expect(screen.getByRole("combobox")).toHaveValue("electric-grid");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("shows a structured denominator with its population without calling it missing", () => {
    const { container } = render(<TechnologyDriverPanel {...props} />);
    const lane = container.querySelector('[data-driver-series="grid"]')! as HTMLElement;
    fireEvent.click(within(lane).getByText("Source points, method and limitations"));
    expect(within(lane).getByText("10,000 customers · all service customers")).toBeVisible();
  });

  it("bounds keyboard and pointer selection, and measures a responsive SVG width", () => {
    const change = vi.fn();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 208, width: 320, height: 208, toJSON: () => ({}) });
    const { container } = render(<TechnologyDriverPanel {...props} year={2000} onYearChange={change} />);
    const plot = screen.getByRole("button", { name: /Electricity customers · customers/ });
    fireEvent.keyDown(plot, { key: "ArrowLeft" }); fireEvent.keyDown(plot, { key: "ArrowRight" }); fireEvent.keyDown(plot, { key: "End" }); fireEvent.keyDown(plot, { key: "Home" });
    fireEvent.click(plot, { clientX: 500, detail: 1 }); fireEvent.click(plot, { detail: 0 });
    expect(change.mock.calls.map(([year]) => year)).toEqual([2000, 2001, 2005, 2000, 2005]);
    for (const svg of container.querySelectorAll("svg")) expect(svg).toHaveAttribute("viewBox", "0 0 320 208");
  });

  it("keeps an empty country free of invented zero series and disables empty source exports", () => {
    const { container } = render(<TechnologyDriverPanel {...props} countryId="JPN" />);
    expect(fixture.getSeries).toHaveBeenCalledWith("JPN");
    expect(container.querySelectorAll("[data-driver-observation]")).toHaveLength(0);
    expect(container.querySelectorAll("[data-driver-series]")).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Export visible source points as CSV" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Export visible source points as JSON" })).toBeDisabled();
  });
});

describe("TechnologyDriverPanel exports and hydration", () => {
  it("exports only the visible original source rows, with scope, denominator and full provenance", async () => {
    render(<TechnologyDriverPanel {...props} from={2000} to={2003} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "electric-grid" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Export visible source points as CSV" }));
    const [blob, filename] = fixture.download.mock.calls[0];
    expect(filename).toBe("technology-FIN-2000-2003.csv");
    const csv = await readBlob(blob);
    const rows = csv.split("\r\n");
    expect(rows).toHaveLength(3);
    expect(rows[0]).toContain('"source_value"');
    expect(rows[1]).toContain('"2000","100"');
    expect(rows[1]).toContain('""value"":10000');
    expect(rows[1]).toContain('"customers"');
    expect(rows[1]).not.toContain("technology_unit_customers");
    expect(rows[1]).toContain(fixture.source.url);
    expect(rows[1]).toContain("Table 1, row 2000");
    expect(rows[1]).toContain("Finland, reported service customers");
    expect(csv).not.toContain('"2002"');
    expect(csv).not.toContain('"2004"');
    expect(csv).not.toContain('"140"');
    fireEvent.click(screen.getByRole("button", { name: "Export visible source points as JSON" }));
    const payload = JSON.parse(await readBlob(fixture.download.mock.calls[1][0]));
    expect(payload.series).toHaveLength(1);
    expect(payload.series[0].points.map((p: { year: number }) => p.year)).toEqual([2000, 2001]);
    expect(payload.series[0].points[0]).toMatchObject({ value: 100, denominator: { value: 10000, unit: "customers" }, sourceLocator: "Table 1, row 2000", imputed: false });
    expect(payload.sources[0].url).toBe(fixture.source.url);
    expect(payload.observationLayer).toBe(true);
    expect(payload.display.linearReconstruction).toBe(true);
  });

  it.each(["fi", "en"])("hydrates %s SVG titles and descriptions without recovering errors", async locale => {
    const markup = renderToString(<TechnologyDriverPanel {...props} locale={locale} />);
    const container = document.createElement("div");
    container.innerHTML = markup; document.body.append(container);
    const errors = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <TechnologyDriverPanel {...props} locale={locale} />, { onRecoverableError: errors }); });
    expect(errors).not.toHaveBeenCalled();
    for (const title of container.querySelectorAll("svg title, svg desc")) expect(title.childNodes).toHaveLength(1);
    await act(async () => root!.unmount()); container.remove();
  });
});
