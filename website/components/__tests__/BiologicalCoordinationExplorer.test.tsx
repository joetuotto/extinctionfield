import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import coordination from "@/data/biological-coordination.json";
import { BiologicalCoordinationExplorer } from "../BiologicalCoordinationExplorer";

afterEach(cleanup);

describe("BiologicalCoordinationExplorer", () => {
  it("switches the displayed hormone and recovery results to the exported scenario", () => {
    render(<BiologicalCoordinationExplorer locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "12-hour phase difference" }));
    expect(screen.getByText(String(coordination.hormoneTiming.scenarios[2].averageResponse))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12-hour phase difference" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Spaced: interval 3 τ" }));
    expect(screen.getByText(new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(coordination.recovery.scenarios[1].steadyPostPulse))).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Repeated pulses and recovery: Spaced/ })).toBeInTheDocument();
    for (const curve of document.querySelectorAll("polyline")) {
      expect(curve.getAttribute("points")).not.toMatch(/NaN|Infinity/);
    }
  });

  it("preserves the conception endpoint and updates both the result and accessible table for a mixed population", () => {
    render(<BiologicalCoordinationExplorer locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Half: 10%; half: 30%" }));
    const result = coordination.waiting.scenarios[1].cumulativeByCycle.at(-1)!;
    const formatted = new Intl.NumberFormat("en", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(result.probability);
    expect(screen.getAllByText(formatted).length).toBeGreaterThan(0);
    expect(screen.getByText(/The endpoint is first conception/)).toBeInTheDocument();
    expect(document.querySelector("caption")).toHaveTextContent("Half: 10%; half: 30%");
    expect(screen.getByRole("link", { name: /Download the example/ })).toHaveAttribute("href", "/data/biological-coordination.json");
  });

  it.each(["fi", "ja", "fr", "ko"])("renders complete translated or per-key fallback content for %s", (locale) => {
    render(<BiologicalCoordinationExplorer locale={locale} />);
    expect(screen.getAllByRole("button")).toHaveLength(7);
    expect(document.querySelectorAll("h2:empty, h3:empty, p:empty")).toHaveLength(0);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
