import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TechnologyHistoryExplorer } from "../TechnologyHistoryExplorer";
import { TechnologyAdoptionChart } from "../TechnologyAdoptionChart";
import { technologyAdoption } from "@/lib/technology-adoption";
import { technologyHistory } from "@/lib/technology-history";

afterEach(cleanup);

describe("technology history reading path", () => {
  it("starts with six environments and finds regional terms across technology events", () => {
    render(<TechnologyHistoryExplorer locale="fi" />);
    expect(screen.getAllByRole("button", { name: /^Tutki ympäristöä:/ })).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "Maaperä ja vesiympäristöt" }));
    expect(screen.getByText("Sähköaidat", { exact: true })).toBeInTheDocument();
    expect(screen.queryByText("Älymittarit: AMR ja AMI", { exact: true })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Kaikki ympäristöt" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Linky" } });
    expect(screen.getByText("Älymittarit: AMR ja AMI", { exact: true })).toBeInTheDocument();
    expect(screen.queryByText("Sähköaidat", { exact: true })).not.toBeInTheDocument();
  });

  it("combines geography, period and event type without treating launches as perpetual deployment", () => {
    render(<TechnologyHistoryExplorer locale="en" />);
    fireEvent.click(screen.getByRole("tab", { name: "Regional history" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Region" }), { target: { value: "global" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Period" }), { target: { value: "digital" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Event type" }), { target: { value: "shutdown" } });
    const panel = screen.getByRole("tabpanel", { name: "Regional history" });
    const omega = technologyHistory.events.find((e) => e.id === "omega-closure-1997")!;
    expect(within(panel).getByRole("heading", { name: omega.title.en })).toBeInTheDocument();
    expect(within(panel).getAllByRole("listitem")).toHaveLength(1);
    fireEvent.change(screen.getByRole("combobox", { name: "Period" }), { target: { value: "early" } });
    expect(screen.getByText("No matches for this combination.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.queryByText("No matches for this combination.")).not.toBeInTheDocument();
  });

  it("supports keyboard tabs and complete fallback copy", () => {
    render(<TechnologyHistoryExplorer locale="ja" />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Technologies" }), { key: "End" });
    expect(screen.getByRole("tab", { name: "Sources and coverage" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: "Historical records (JSON)" })).toHaveAttribute("href", "/api/technology-history");
    expect(screen.getByText("Other datasets already in the model")).toBeInTheDocument();
  });

  it("limits a named history search to matching events and keeps tab references valid", () => {
    render(<TechnologyHistoryExplorer locale="fi" />);
    for (const tab of screen.getAllByRole("tab")) expect(document.getElementById(tab.getAttribute("aria-controls")!)).not.toBeNull();
    fireEvent.click(screen.getByRole("tab", { name: "Alueellinen historia" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Linky" } });
    const panel = screen.getByRole("tabpanel", { name: "Alueellinen historia" });
    const headings = within(panel).getAllByRole("heading").map((heading) => heading.textContent);
    expect(headings.length).toBeGreaterThan(0);
    expect(headings.every((heading) => /Linky/i.test(heading!))).toBe(true);
    expect(headings.some((heading) => /Telegestore/i.test(heading!))).toBe(false);
  });
});

describe("technology adoption charts", () => {
  it("switches quantity and share using the actual denominator, and keeps sparse series unconnected", () => {
    render(<TechnologyAdoptionChart locale="fi" />);
    const select = screen.getByRole("combobox", { name: "Valitse aikasarja" });
    expect(within(select).getAllByRole("option")).toHaveLength(technologyAdoption.series.length);
    expect(screen.getByRole("img").querySelectorAll('line[stroke="var(--chart-series-1)"]')).toHaveLength(9);
    fireEvent.click(screen.getByRole("button", { name: "Osuus kaikista mittareista" }));
    expect(screen.getByRole("img").getAttribute("aria-labelledby")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Osuus kaikista mittareista" })).toHaveAttribute("aria-pressed", "true");
    for (const series of technologyAdoption.series.filter((s) => s.frequency === "sparse")) {
      fireEvent.change(select, { target: { value: series.id } });
      expect(screen.getByRole("img").querySelectorAll('line[stroke="var(--chart-series-1)"]')).toHaveLength(0);
      expect(screen.getByRole("img").querySelectorAll("circle")).toHaveLength(series.points.length);
      expect(screen.queryByRole("button", { name: "Osuus kaikista mittareista" })).not.toBeInTheDocument();
      expect(screen.getByText(series.coverage.fi)).toBeInTheDocument();
      for (const element of screen.getByRole("img").querySelectorAll("[cx], [cy], [y1], [y2]")) expect(element.outerHTML).not.toMatch(/NaN|Infinity/);
    }
  });

  it("keeps reporting date, original values and source links in an accessible table", () => {
    render(<TechnologyAdoptionChart locale="en" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Choose a data series" }), { target: { value: "fr_linky_meters" } });
    fireEvent.click(screen.getByText("Read the values and their sources"));
    const table = screen.getByRole("table");
    expect(within(table).getByText("2022-11-03")).toBeInTheDocument();
    expect(within(table).getByText("35,000,000")).toBeInTheDocument();
    expect(within(table).getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Download data and provenance (JSON)" })).toHaveAttribute("download");
  });
});
