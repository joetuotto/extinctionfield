import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { BermEndpointHistoryPoint } from "@/lib/berm-endpoint-scenario";
import { getChangeAtlasSeries } from "@/lib/change-atlas-data";
import { BermInputHistoryChart } from "../BermInputHistoryChart";
import { ChangeAtlasCharts } from "../ChangeAtlasCharts";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function history(): BermEndpointHistoryPoint[] {
  return Array.from({ length: 5 }, (_, i) => ({ year: 2000 + i, geometry: 2 + i, annual: 1 + i / 2,
    accumulated: 10 + i * 10, self: 1, cross: 0, backgroundTerm: 1,
    channels: { annual: 1 + i / 2, accumulated: 1 + i, combined: 2 + i * 1.5 }, selected: 2 + i * 1.5 }));
}

describe("BermInputHistoryChart", () => {
  it("shows U and C as separately scaled computed quantities without manufacturing observation records", () => {
    const original = history(), before = structuredClone(original);
    const { container } = render(<BermInputHistoryChart history={original} locale="en" from={2000} to={2004} year={2002} />);
    const lanes = [...container.querySelectorAll("[data-berm-input]")];
    expect(lanes.map(lane => lane.getAttribute("data-berm-input"))).toEqual(["annual", "accumulated"]);
    expect(lanes[0]).toHaveAttribute("data-input-unit", "normalized-projection");
    expect(lanes[1]).toHaveAttribute("data-input-unit", "normalized-projection-years");
    expect(lanes[0].getAttribute("data-y-domain")).not.toBe(lanes[1].getAttribute("data-y-domain"));
    expect(container.querySelector("[data-selected-input='annual']")).toHaveTextContent("Year 2002: 2 normalized projection");
    expect(container.querySelector("[data-selected-input='accumulated']")).toHaveTextContent("Year 2002: 30 normalized projection × year");
    expect(container.querySelectorAll("[data-point-year], [data-annual-segment], [data-series-id]")).toHaveLength(0);
    const metadata = JSON.parse(container.querySelector("[data-berm-input-history]")!.getAttribute("data-berm-input-history")!);
    expect(metadata.kind).toBe("BERM-derived-input-history");
    expect(metadata.points[2]).toEqual({ year: 2002, geometry: 4, annual: 2, accumulated: 30 });
    expect(JSON.stringify(metadata)).not.toContain("imputed");
    expect(original).toEqual(before);
  });

  it("adds optional same-year G with the same native projection scale as U", () => {
    const { container } = render(<BermInputHistoryChart history={history()} locale="fi" from={2000} to={2004} year={2002} showG />);
    expect(container.querySelectorAll("[data-berm-input]")).toHaveLength(3);
    const g = container.querySelector("[data-berm-input='geometry']")!, u = container.querySelector("[data-berm-input='annual']")!;
    expect(g.getAttribute("data-y-domain")).toBe(u.getAttribute("data-y-domain"));
    expect(g).toHaveTextContent("G(t) · Saman vuoden lähdeprojektio");
    expect(g.querySelector("[data-selected-input]")).toHaveTextContent("Vuosi 2002: 4 normalisoitu projektio");
  });

  it("aligns every derived lane and the observation chart on one calendar x-axis and cursor", () => {
    const observations = getChangeAtlasSeries("FIN", "tfr").map(series => ({ ...series, points: series.points.filter(point => point.year >= 2000 && point.year <= 2004) }));
    const { container } = render(<><ChangeAtlasCharts series={observations} locale="en" yearDomain={[2000, 2004]} selectedYear={2002} /><BermInputHistoryChart history={history()} locale="en" from={2000} to={2004} year={2002} showG /></>);
    const svgs = [...container.querySelectorAll("svg")];
    const ticks = (svg: SVGSVGElement) => [...svg.querySelectorAll("[data-axis-year]")].map(tick => [tick.getAttribute("data-axis-year"), tick.getAttribute("x")]);
    for (const svg of svgs.slice(1)) expect(ticks(svg)).toEqual(ticks(svgs[0]));
    const cursors = [...container.querySelectorAll("[data-year-cursor]")];
    expect(cursors).toHaveLength(4);
    expect(new Set(cursors.map(cursor => cursor.getAttribute("x1"))).size).toBe(1);
  });

  it("preserves null and absent-year gaps independently in each calculated input", () => {
    const data = history().filter(point => point.year !== 2003);
    data[1].annual = null;
    data[1].accumulated = null;
    data[2].accumulated = null;
    const { container } = render(<BermInputHistoryChart history={data} locale="en" from={2000} to={2004} year={2001} />);
    const segments = (input: string) => [...container.querySelectorAll(`[data-berm-input='${input}'] [data-derived-segment]`)].map(segment => segment.getAttribute("data-derived-segment"));
    expect(segments("annual")).toEqual(["2000:2000", "2002:2002", "2004:2004"]);
    expect(segments("accumulated")).toEqual(["2000:2000", "2004:2004"]);
    expect(container.querySelector("[data-selected-input='annual']")).toHaveTextContent("No computed value");
    expect(container.querySelector("[data-selected-input='accumulated']")).toHaveTextContent("No computed value");
  });

  it("distinguishes a computed zero from missing history and keeps the SVG finite", () => {
    const data = history();
    data[0].annual = 0;
    data.forEach(point => { point.accumulated = null; });
    data[1].annual = Infinity;
    const { container } = render(<BermInputHistoryChart history={data} locale="en" from={2000} to={2004} year={2000} />);
    expect(container.querySelector("[data-selected-input='annual']")).toHaveTextContent("Year 2000: 0 normalized projection");
    expect(container.querySelector("[data-selected-input='accumulated']")).toHaveTextContent("No computed value");
    expect(container.querySelectorAll("[data-berm-input='accumulated'] [data-derived-segment]")).toHaveLength(0);
    expect(container.querySelector("[data-berm-input='accumulated']")).toHaveTextContent("No computed values in this range.");
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it("crops the displayed history without resetting the retained value", () => {
    const data = history();
    const view = render(<BermInputHistoryChart history={data} locale="en" from={2000} to={2004} year={2002} />);
    const value = view.container.querySelector("[data-selected-input='accumulated']")!.textContent;
    view.rerender(<BermInputHistoryChart history={data} locale="en" from={2002} to={2004} year={2002} />);
    expect(view.container.querySelector("[data-selected-input='accumulated']")).toHaveTextContent(value!);
    const metadata = JSON.parse(view.container.querySelector("[data-berm-input-history]")!.getAttribute("data-berm-input-history")!);
    expect(metadata.points.map((point: { year: number }) => point.year)).toEqual([2002, 2003, 2004]);
    expect(metadata.points[0].accumulated).toBe(30);
  });

  it("keeps responsive SVG units and the conditional interpretation visible in image exports", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 300, width: 320, height: 300, toJSON: () => ({}) });
    const { container } = render(<BermInputHistoryChart history={history()} locale="en" from={2000} to={2004} year={2002} />);
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg.getAttribute("viewBox")).toMatch(/^0 0 320 /);
      expect(svg).toHaveAttribute("width", "100%");
      expect(svg.querySelector("[data-input-legend]")).toHaveTextContent("BERM computed input");
      expect(svg.querySelector("[data-input-legend]")).toHaveTextContent("Conditional calculation from the selected source history.");
    }
    expect(container.querySelector("[data-input-legend='annual']")).toHaveTextContent("U(t)");
    expect(container.querySelector("[data-input-legend='accumulated']")).toHaveTextContent("normalized projection × year");
  });

  it("forwards bounded keyboard and pointer year selection using the observation-chart controls", () => {
    const select = vi.fn();
    render(<BermInputHistoryChart history={history()} locale="en" from={2000} to={2004} year={2000} onYearChange={select} />);
    const control = screen.getByRole("button", { name: /U\(t\)/ });
    fireEvent.keyDown(control, { key: "ArrowLeft" });
    fireEvent.keyDown(control, { key: "ArrowRight" });
    fireEvent.keyDown(control, { key: "End" });
    vi.spyOn(control, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 600, bottom: 300, width: 600, height: 300, toJSON: () => ({}) });
    fireEvent.click(control, { clientX: 322, detail: 1 });
    expect(select.mock.calls.map(([year]) => year)).toEqual([2000, 2001, 2004, 2002]);
  });

  it.each(["fi", "en"])("hydrates derived SVG titles and descriptions in %s without replacing the charts", async locale => {
    const content = <BermInputHistoryChart history={history()} locale={locale} from={2000} to={2004} year={2002} showG />;
    const container = document.createElement("div");
    container.innerHTML = renderToString(content);
    document.body.append(container);
    const svgs = [...container.querySelectorAll("svg")];
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => { root = hydrateRoot(container, content, { onRecoverableError: error => errors.push(error) }); });
      expect(errors).toEqual([]);
      [...container.querySelectorAll("svg")].forEach((svg, index) => expect(svg).toBe(svgs[index]));
      for (const label of container.querySelectorAll("svg title, svg desc")) {
        expect(label.childNodes).toHaveLength(1);
        expect(label.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      }
      const ids = [...container.querySelectorAll("[id]")].map(element => element.id);
      expect(new Set(ids).size).toBe(ids.length);
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });
});
