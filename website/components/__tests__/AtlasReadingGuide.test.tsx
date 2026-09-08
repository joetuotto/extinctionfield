import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getChangeAtlasSeries } from "@/lib/change-atlas-data";
import { AtlasReadingGuide, buildAtlasMemoryExample } from "../AtlasReadingGuide";
import { ChangeAtlasCharts } from "../ChangeAtlasCharts";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("computed BERM memory illustration", () => {
  it("has equal present G and U but different C, following the stated annual recurrence", () => {
    const { early, late } = buildAtlasMemoryExample();
    const a = early.history.at(-1)!, b = late.history.at(-1)!;
    expect(a.geometry).toBe(1); expect(b.geometry).toBe(1);
    expect(a.annual).toBeCloseTo(1, 12); expect(b.annual).toBeCloseTo(1, 12);
    expect(a.accumulated).toBeGreaterThan(b.accumulated!);
    const lambda = 2 ** (-1 / 20);
    for (const [scenario, onset] of [[early, 1950], [late, 2000]] as const) {
      let accumulated = 0;
      for (const row of scenario.history) {
        const annual = [3, 4, 5, 6, 7, 8].filter(delay => row.year - delay >= onset).length / 6;
        accumulated = lambda * accumulated + annual;
        expect(row.geometry).toBe(row.year >= onset ? 1 : 0);
        expect(row.annual).toBeCloseTo(annual, 12);
        expect(row.accumulated).toBeCloseTo(accumulated, 11);
      }
      expect(scenario.assumptions.initialStockYear).toBe(1879);
      expect(scenario.assumptions.initialStock).toBe(0);
    }
    const gap = (year: number) => early.history.find(p => p.year === year)!.accumulated! - late.history.find(p => p.year === year)!.accumulated!;
    // Once U is equal, the difference only decays; it does not suddenly disappear.
    expect(gap(2009)).toBeCloseTo(lambda * gap(2008), 12);
  });

  it("does not move onsets or reset retained history when the viewport is cropped", () => {
    const full = buildAtlasMemoryExample(1950, 2023), crop = buildAtlasMemoryExample(2008, 2023);
    expect(crop.early.history).toEqual(full.early.history);
    expect(crop.late.history).toEqual(full.late.history);
    expect(crop.early.points[0]).toEqual(full.early.points.find(p => p.year === 2008));
    expect(crop.early.points[0].accumulated).toBeGreaterThan(20);
  });

  it("keeps the guide compact until the independent, explicitly synthetic example is opened", () => {
    const { container } = render(<AtlasReadingGuide locale="en" from={1950} to={2023} year={2023} />);
    expect(container.querySelector("details")).not.toHaveAttribute("open");
    expect(screen.getByText("Observation")).toBeVisible();
    expect(screen.getByText("Fit boundary")).toBeVisible();
    expect(screen.getByText("Conditional prediction")).toBeVisible();
    expect(container.querySelector('[data-memory-example="synthetic"]')).toBeInTheDocument();
    expect(screen.getByText(/computes no human biomarker/)).toBeInTheDocument();
    expect(container.querySelectorAll("[data-point-year], [data-series-id]")).toHaveLength(0);
  });

  it("synchronizes calendar selection across all three lanes and atlas observations", () => {
    const onYearChange = vi.fn();
    const observations = getChangeAtlasSeries("FIN", "tfr").map(s => ({ ...s, points: s.points.filter(p => p.year >= 2000 && p.year <= 2023) }));
    const draw = (year: number) => <>
      <AtlasReadingGuide locale="fi" from={2000} to={2023} year={year} onYearChange={onYearChange} />
      <ChangeAtlasCharts series={observations} locale="fi" yearDomain={[2000, 2023]} selectedYear={year} onSelectYear={onYearChange} />
    </>;
    const view = render(draw(2010));
    const cursors = [...view.container.querySelectorAll("[data-year-cursor]")];
    expect(cursors).toHaveLength(4);
    expect(new Set(cursors.map(c => c.getAttribute("x1"))).size).toBe(1);
    fireEvent.change(screen.getByRole("slider", { name: "Yhteinen vuosi" }), { target: { value: "2015" } });
    expect(onYearChange).toHaveBeenLastCalledWith(2015);
    view.rerender(draw(2015));
    for (const values of view.container.querySelectorAll("[data-memory-values]")) {
      expect(values).toHaveAttribute("data-selected-year", "2015");
      expect(values).toHaveTextContent("2015:");
    }
    fireEvent.keyDown(screen.getByRole("button", { name: /G · vuoden lähdeprojektio/ }), { key: "ArrowLeft" });
    expect(onYearChange).toHaveBeenLastCalledWith(2014);
  });

  it("shows independent units for retention, preserves current values after cropping and falls back to English", () => {
    const view = render(<AtlasReadingGuide locale="fr" from={1950} to={2023} year={2023} />);
    const values = view.container.querySelector('[data-memory-values="accumulated"]')!.textContent;
    view.rerender(<AtlasReadingGuide locale="fr" from={2000} to={2023} year={2023} />);
    expect(view.container.querySelector('[data-memory-values="accumulated"]')!.textContent).toBe(values);
    expect(screen.getByText("normalized projection × year")).toBeInTheDocument();
    expect(screen.getAllByText("normalized projection")).toHaveLength(2);
    expect(view.container.querySelector('[data-memory-input="geometry"]')!.getAttribute("data-y-domain"))
      .toBe(view.container.querySelector('[data-memory-input="annual"]')!.getAttribute("data-y-domain"));
    expect(view.container.querySelectorAll("svg text")).toHaveLength(0);
    expect(view.container.innerHTML).not.toMatch(/NaN|Infinity/);
  });
});
