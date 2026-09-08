import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ChangeAtlas } from "../ChangeAtlas";
import { fieldOnsetYear } from "../FieldReconstructionTimeline";
import { getChangeAtlasSeries } from "@/lib/change-atlas-data";
import { ATLAS_COUNTRIES, ATLAS_VIEWS } from "@/lib/change-atlas-state";
import type { BermScenarioPoint } from "@/lib/berm-atlas-scenario";

// Keep the actual charts, history, published observations and scenario calculation.
// Re-render after a history change to model the App Router's search-param update.
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
beforeEach(() => { window.history.replaceState(null, "", "/en/explore?tab=atlas"); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function openAtlas(query: string, locale = "en") {
  window.history.replaceState(null, "", `/${locale}/explore?tab=atlas&${query}`);
  return render(<ChangeAtlas locale={locale} />);
}

const viewNames = {
  change: "Change", compare: "Countries", ages: "Age and fertility", events: "Event time",
  fields: "Field reconstruction", berm: "BERM scenario", sources: "Data sources",
};

describe("ChangeAtlas with the shared source registries", () => {
  it.each(ATLAS_VIEWS)("renders the %s view with a valid selected tab and finite SVG coordinates", view => {
    const { container } = openAtlas(`view=${view}&country=FIN`);
    expect(screen.getAllByRole("tab")).toHaveLength(7);
    expect(screen.getByRole("tab", { name: viewNames[view] })).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel", { name: viewNames[view] });
    expect(panel).not.toBeEmptyDOMElement();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    for (const element of container.querySelectorAll("svg [d], svg [x], svg [y], svg [cx], svg [cy]")) {
      for (const attr of ["d", "x", "y", "cx", "cy"]) expect(element.getAttribute(attr) ?? "").not.toMatch(/NaN|Infinity/);
    }
  });

  it.each(ATLAS_COUNTRIES)("runs illustrative BERM defaults safely for %s and all five comparison histories", country => {
    const { container } = openAtlas(`view=berm&country=${country}`);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    const scenario = container.querySelector("[data-berm-scenario]");
    expect(scenario).not.toBeNull();
    const metadata = JSON.parse(scenario!.getAttribute("data-berm-scenario")!) as {
      kind: string; baselineYear: number; points: BermScenarioPoint[];
      countries: { countryId: string; points: BermScenarioPoint[] }[];
    };
    expect(metadata.kind).toBe("conditional_uncalibrated_BERM_sensitivity");
    expect(metadata.baselineYear).toBe(1950);
    expect(metadata.countries.map(c => c.countryId)).toEqual([...ATLAS_COUNTRIES]);
    for (const result of [metadata, ...metadata.countries]) {
      expect(result.points).toHaveLength(74);
      expect(result.points[0]).toMatchObject({ year: 1950, response: 0, multiplier: 1, relativeChangePercent: 0 });
      expect(result.points.at(-1)?.year).toBe(2023);
      expect(result.points.every(point => Object.values(point).every(Number.isFinite))).toBe(true);
    }
    expect(container.querySelector(`[data-series-id="${country.toLowerCase()}-tfr"]`)).not.toBeNull();
  });

  it("shows the actual hormone periods alongside diabetes when US biological state is selected", () => {
    const { container } = openAtlas("view=change&question=health&country=USA&year=2001&hormone=us-nhanes-testosterone-fully-adjusted");
    const hormone = container.querySelector<HTMLElement>("[data-series-id='us-nhanes-testosterone-fully-adjusted']")!;
    expect(hormone).not.toBeNull();
    expect(hormone).toHaveTextContent("fully adjusted NHANES");
    expect(hormone.querySelectorAll("[data-period-bar]")).toHaveLength(2);
    expect(hormone.querySelectorAll("[data-annual-segment]")).toHaveLength(0);
    expect(hormone).toHaveTextContent("1999–2004");
    expect(hormone).toHaveTextContent("5.34 ng/mL");
    expect(container.querySelectorAll("[data-series-id^='us-diabetes-']")).toHaveLength(2);
    fireEvent.click(within(hormone).getByRole("button", { name: "Source and method" }));
    const heading = screen.getByRole("heading", { name: "Source and method: Total testosterone, fully adjusted NHANES" });
    const source = heading.closest("section")!;
    expect(source).toHaveTextContent("BMI, waist, smoking and alcohol");
    expect(source).toHaveTextContent("Table 2; total testosterone; 1999–2004");
    expect(within(source).getByRole("link", { name: /Nyante et al/ })).toHaveAttribute("href", "https://onlinelibrary.wiley.com/doi/10.1111/j.1365-2605.2011.01230.x");
  });

  it("opens an event-aligned country's source at that country's relative year", () => {
    const relative = 2;
    const { container } = openAtlas(`view=events&country=FIN&event=digital-2g&relative=${relative}&year=2023`);
    const onset = fieldOnsetYear("USA", "digital-2g")!;
    expect(onset).toBe(1996);
    const year = onset + relative;
    const lane = container.querySelector<HTMLElement>("[data-series-id='usa-tfr']")!;
    expect(lane.querySelector("[data-year-cursor]")).toHaveAttribute("data-year-cursor", String(year));
    fireEvent.click(within(lane).getByRole("button", { name: "Source and method" }));
    const source = screen.getByRole("heading", { name: "Source and method: Total fertility rate" }).closest("section")!;
    expect(source).toHaveTextContent(`Observation for selected year: ${year}`);
    expect(source).toHaveTextContent(`ISO3=USA; Time=${year};`);
    expect(source).not.toHaveTextContent("Time=2023;");
    const original = getChangeAtlasSeries("USA", "tfr")[0].points.find(point => point.year === year)!;
    expect(source).toHaveTextContent(new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(original.value));
  });

  it("uses source selection in country comparison without switching the active example country", () => {
    const { container } = openAtlas("view=compare&country=FIN&year=2000");
    const lane = container.querySelector<HTMLElement>("[data-series-id='jpn-tfr']")!;
    fireEvent.click(within(lane).getByRole("button", { name: "Source and method" }));
    const source = screen.getByRole("heading", { name: "Source and method: Total fertility rate" }).closest("section")!;
    expect(source).toHaveTextContent("ISO3=JPN; Time=2000;");
    expect(new URLSearchParams(window.location.search).get("country")).toBe("FIN");
    expect(screen.queryByRole("combobox", { name: "Example country" })).not.toBeInTheDocument();
  });

  it("keeps one native scale for all countries when a shared indexed baseline is unavailable",()=>{
    const {container}=openAtlas("view=compare&metric=mobile_subscriptions&from=1980&base=1980");
    const lanes=container.querySelectorAll("[data-series-id]");
    expect(lanes).toHaveLength(5);
    for(const lane of lanes) expect(lane).toHaveTextContent("subscriptions / 100 people");
    expect(screen.getByText(/All five charts therefore retain the original quantity/)).toBeInTheDocument();
  });

  it("names the scenario sliders and keeps the observation layer unchanged when biological gain changes",()=>{
    const view=openAtlas("view=berm&country=FIN");
    const before=view.container.querySelector("[data-series-id='fin-tfr']")?.textContent;
    fireEvent.change(screen.getByRole("slider",{name:"Biological sensitivity β"}),{target:{value:"0"}});
    view.rerender(<ChangeAtlas locale="en"/>);
    const metadata=JSON.parse(view.container.querySelector("[data-berm-scenario]")!.getAttribute("data-berm-scenario")!);
    expect(metadata.points.every((p:BermScenarioPoint)=>p.multiplier===1)).toBe(true);
    expect(view.container.querySelector("[data-series-id='fin-tfr']")?.textContent).toBe(before);
  });

  it("preserves the shared year when a keyboard tab update changes the view", () => {
    const view = openAtlas("view=change&country=GBR&year=2001", "fi");
    expect(screen.getByRole("combobox", { name: "Esimerkkimaa" })).toHaveDisplayValue("Yhdistynyt kuningaskunta");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Muutos" }), { key: "ArrowRight" });
    const params = new URLSearchParams(window.location.search);
    expect(params.get("view")).toBe("compare");
    expect(params.get("year")).toBe("2001");
    expect(params.get("country")).toBe("GBR");
    view.rerender(<ChangeAtlas locale="fi" />);
    expect(screen.getByRole("tab", { name: "Maavertailu" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("slider", { name: "Yhteinen vuosivalinta" })).toHaveValue("2001");
  });

  it.each(["country-first", "scenario-first"])("preserves both selections before a router rerender: %s", order => {
    const view = openAtlas("view=berm&country=USA&s_shared=1&year=2001");
    const country = screen.getByRole("combobox", { name: "Example country" });
    const basis = screen.getByRole("combobox", { name: "Country data basis" });
    const changeCountry = () => fireEvent.change(country, { target: { value: "FIN" } });
    const changeBasis = () => fireEvent.change(basis, { target: { value: "0" } });
    // No manual rerender between these events: both handlers retain the old
    // render, while window.history already contains the first selection.
    if (order === "country-first") { changeCountry(); changeBasis(); }
    else { changeBasis(); changeCountry(); }
    const params = new URLSearchParams(window.location.search);
    expect(params.get("country")).toBe("FIN");
    expect(params.get("s_shared")).toBe("0");
    expect(params.get("year")).toBe("2001");
    view.rerender(<ChangeAtlas locale="en" />);
    expect(screen.getByRole("combobox", { name: "Example country" })).toHaveValue("FIN");
    expect(screen.getByRole("combobox", { name: "Country data basis" })).toHaveValue("0");
  });

  it("accumulates consecutive source exclusions before a router rerender", () => {
    const view = openAtlas("view=berm&country=FIN");
    const switches = screen.getAllByRole("checkbox", { hidden: true }).filter(c => (c as HTMLInputElement).checked);
    expect(switches).toHaveLength(2);
    fireEvent.click(switches[0]);
    fireEvent.click(switches[1]);
    expect(new URLSearchParams(window.location.search).get("s_off")?.split(",").sort()).toEqual(["cellular-total", "electric-grid"]);
    view.rerender(<ChangeAtlas locale="en" />);
    expect(screen.getAllByRole("checkbox", { hidden: true }).every(c => !(c as HTMLInputElement).checked)).toBe(true);
  });

  it("resets newly added scenario keys while preserving another control's latest country", () => {
    openAtlas("view=berm&country=USA&s_beta=0.25");
    const current = new URLSearchParams(window.location.search);
    current.set("country", "FIN");
    current.set("s_mapping", "linear");
    current.set("s_single_smart-metering", "1");
    current.set("unrelated", "keep");
    window.history.replaceState(null, "", `/en/explore?${current}#atlas`);
    fireEvent.click(screen.getByRole("button", { name: "Restore illustrative defaults" }));
    const reset = new URLSearchParams(window.location.search);
    expect([...reset.keys()].some(key => key.startsWith("s_"))).toBe(false);
    expect(reset.get("country")).toBe("FIN");
    expect(reset.get("unrelated")).toBe("keep");
    expect(window.location.hash).toBe("#atlas");
  });
});
