import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { CombinedFieldThresholdFigure } from "../CombinedFieldThresholdFigure";

afterEach(cleanup);

describe("CombinedFieldThresholdFigure", () => {
  it.each(["fi", "en"])("plots the published component means with their own denominators in %s", locale => {
    const { container } = render(<CombinedFieldThresholdFigure locale={locale} />);
    expect(screen.getByRole("figure")).toHaveAccessibleName();
    const expected = [
      { id: "dc", mean: 18.69, n: 165 },
      { id: "ac-50hz", mean: 14.16, n: 175 },
      { id: "hybrid-dc", mean: 6.76, n: 168 },
    ];
    for (const row of expected) {
      const region = container.querySelector(`[data-threshold-protocol="${row.id}"]`) as HTMLElement;
      const number = row.mean.toFixed(2).replace(".", locale === "fi" ? "," : ".");
      expect(within(region).getByText(`${number} kV/m`)).toBeVisible();
      expect(within(region).getByText(`n = ${row.n}`)).toBeVisible();
      expect(region.querySelector("svg")).toHaveAttribute("viewBox", "0 0 20 1.3");
      expect(region.querySelector("[data-threshold-bar]")).toHaveAttribute("width", String(row.mean));
    }
    expect(container.querySelectorAll("[data-threshold-bar]")).toHaveLength(3);
    expect(screen.getByText(/203/)).toHaveTextContent(locale === "fi" ? /50 %.*taulukko 3/ : /50%.*Table 3/);
    expect(container.querySelector('[data-reference-id="kursawe2021_combined_fields"]')).toBeInTheDocument();
  });

  it.each(["fi", "en", "ja", "fr", "ko"])("keeps the fixed AC protocol and detection endpoint visible in %s", locale => {
    const { container } = render(<CombinedFieldThresholdFigure locale={locale} />);
    const hybrid = container.querySelector('[data-threshold-protocol="hybrid-dc"]') as HTMLElement;
    expect(within(hybrid).getByText(locale === "fi" ? /Lisäksi kiinteä 50 Hz AC: 4 kV\/m/ : /Plus a fixed 50 Hz AC field: 4 kV\/m/)).toBeVisible();
    expect(within(hybrid).getByText(locale === "fi" ? /vain DC-komponentin.*RMS/ : /only the DC component.*RMS/)).toBeVisible();
    expect(screen.getByText(locale === "fi" ? /ei gonadivaurio/ : /not gonadal injury/)).toBeVisible();
    expect(container.querySelectorAll("p:empty, dt:empty, dd:empty, h3:empty")).toHaveLength(0);
    expect(container.querySelectorAll("svg:not([aria-hidden='true'])")).toHaveLength(0);
    expect(container.textContent).not.toMatch(/\[\[ref:|undefined/);
  });

  it("provides all numbers and the hybrid condition in server HTML without client controls", () => {
    const html = renderToString(<CombinedFieldThresholdFigure locale="en" />);
    const container = document.createElement("div");
    container.innerHTML = html;
    expect(container.textContent).toContain("6.76 kV/m");
    expect(container.textContent).toContain("50 Hz AC field: 4 kV/m");
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.querySelectorAll("[data-threshold-bar]")).toHaveLength(3);
  });
});
