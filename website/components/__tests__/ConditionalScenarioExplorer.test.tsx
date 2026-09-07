import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import data from "@/data/conditional-scenario-explorer.json";
import { ConditionalScenarioExplorer } from "../ConditionalScenarioExplorer";

afterEach(cleanup);

describe("Python-backed conditional scenarios", () => {
  it("switches among all exported comparisons and displays the exact generated result", () => {
    render(<ConditionalScenarioExplorer locale="fi" />);
    const select = screen.getByRole("combobox", { name: "Valitse vertailu" });
    expect(within(select).getAllByRole("option")).toHaveLength(data.scenarios.length);
    for (const scenario of data.scenarios) {
      fireEvent.change(select, { target: { value: scenario.id } });
      expect(screen.getByText(scenario.description.fi)).toBeInTheDocument();
      const formatted = new Intl.NumberFormat("fi", { maximumFractionDigits: 3 }).format(scenario.result.predicted_tfr);
      expect(within(screen.getByTestId("scenario-result")).getByText(formatted)).toBeInTheDocument();
    }
    expect(screen.getByText(/Luvut eivät ole mitattuja kenttävaikutuksia/)).toBeInTheDocument();
  });

  it("changes the chart endpoint with an accessible label and a tabular equivalent", () => {
    render(<ConditionalScenarioExplorer locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Damage load" }));
    expect(screen.getByRole("button", { name: "Damage load" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: "Cell time course: Damage load" })).toBeInTheDocument();
    for (const line of screen.getByRole("img").querySelectorAll("polyline")) expect(line.getAttribute("points")).not.toMatch(/NaN|Infinity/);
    expect(screen.getByRole("columnheader", { name: "Damage load" })).toBeInTheDocument();
  });

  it("retains scope and all seven ASFR groups, with the reproducible payload downloadable", () => {
    render(<ConditionalScenarioExplorer locale="fi" />);
    fireEvent.click(screen.getByText("Ikäkohtainen laskentajälki"));
    for (const group of data.scenarios[0].result.age_groups) expect(screen.getByRole("rowheader", { name: group.age_group })).toBeInTheDocument();
    fireEvent.click(screen.getByText("Oletukset ja soveltamisrajat"));
    for (const assumption of data.metadata.assumptions.fi) expect(screen.getByText(assumption)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lataa kaikki syötteet/ })).toHaveAttribute("href", "/data/conditional-scenarios.json");
  });
});
