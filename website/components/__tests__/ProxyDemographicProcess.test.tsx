import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { ProxyDemographicProcess, ProxyIntentionOutcomeChart } from "../ProxyDemographicProcess";

afterEach(cleanup);

describe("ProxyDemographicProcess", () => {
  it("highlights distinct capacity and treatment routes without removing the other conditions", () => {
    render(<ProxyDemographicProcess locale="fi" />);
    const stages = [...document.querySelectorAll("[data-process-step]")];
    const originalText = stages.map((stage) => stage.textContent);
    fireEvent.click(screen.getByRole("button", { name: "Kapasiteetti" }));
    expect(screen.getByRole("button", { name: "Kapasiteetti" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Ajoitus" })).toHaveAttribute("aria-pressed", "false");
    expect(document.querySelector('[data-process-step="desire"]')).toHaveAttribute("data-emphasized", "true");
    expect(document.querySelector('[data-process-step="outcome"]')).toHaveAttribute("data-emphasized", "true");
    expect(screen.getByText(/Lapsitoive ei itsessään määrää/)).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Hoito" }));
    expect(document.querySelector('[data-process-step="desire"]')).toHaveAttribute("data-emphasized", "false");
    expect(document.querySelector('[data-process-step="attempt"]')).toHaveAttribute("data-emphasized", "true");
    expect(screen.getByText(/miten avustamaton reitti olisi toiminut/)).toBeVisible();
    expect(stages.map((stage) => stage.textContent)).toEqual(originalText);
    expect(screen.getByText("Resurssit ja politiikka")).toBeVisible();
    expect(screen.getByText("Ehkäisy ja hoidot")).toBeVisible();
    expect(screen.getByText(/raskaus voi alkaa myös suunnittelematta/)).toBeVisible();
  });

  it.each(["ja", "fr", "ko"])("retains complete English controls and source context for %s", (locale) => {
    render(<><ProxyDemographicProcess locale={locale} /><ProxyIntentionOutcomeChart locale={locale} /></>);
    fireEvent.click(screen.getByRole("button", { name: "Conditions" }));
    expect(screen.getByText(/Income, care services and flexibility/)).toBeVisible();
    expect(screen.getByText(/percentages weighted with 2006 sampling weights/)).toBeVisible();
    expect(document.querySelectorAll("button:empty, p:empty, h3:empty, h4:empty")).toHaveLength(0);
  });
});

describe("ProxyIntentionOutcomeChart", () => {
  it("presents the published weighted distributions with denominators and accessible values", () => {
    render(<ProxyIntentionOutcomeChart locale="en" />);
    const expectations = [
      { group: "Women", n: "3 783", values: ["34.9 %", "43.4 %", "21.7 %"] },
      { group: "Men", n: "3 584", values: ["42.8 %", "34.2 %", "23.0 %"] },
    ];
    for (const expected of expectations) {
      const region = screen.getByRole("region", { name: expected.group });
      expect(within(region).getByText(`Sample: n = ${expected.n}`)).toBeVisible();
      for (const value of expected.values) expect(within(region).getByText(value, { selector: "dd" })).toBeVisible();
      const chart = within(region).getByRole("img", { name: expected.group });
      expect(chart).toHaveAccessibleDescription(/Fewer than expected: .*As many as expected: .*More than expected:/);
      const widths = [...chart.querySelectorAll("rect")].map((rectangle) => Number(rectangle.getAttribute("width")));
      expect(widths).toEqual(expected.values.map((value) => parseFloat(value)));
      expect(widths.reduce((sum, value) => sum + value, 0)).toBeCloseTo(100, 8);
    }
    expect(screen.getByText(/ages 41–50 in 2006/)).toBeVisible();
    expect(document.querySelector('[data-reference-id="morgan2010_intentions_realization"]')).toBeInTheDocument();
  });

  it("hydrates the server-rendered charts and keeps process controls working", async () => {
    const content = <><ProxyDemographicProcess locale="en" /><ProxyIntentionOutcomeChart locale="en" /></>;
    const container = document.createElement("div");
    container.innerHTML = renderToString(content);
    document.body.append(container);
    const charts = [...container.querySelectorAll("svg")];
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => { root = hydrateRoot(container, content, { onRecoverableError: (error) => errors.push(error) }); });
      expect(errors).toEqual([]);
      expect([...container.querySelectorAll("svg")]).toEqual(charts);
      for (const text of container.querySelectorAll("svg title, svg desc")) {
        expect(text.childNodes).toHaveLength(1);
        expect(text.textContent?.trim()).toBeTruthy();
      }
      fireEvent.click(within(container).getByRole("button", { name: "Treatment" }));
      expect(within(container).getByText(/unassisted pathway would have functioned/)).toBeVisible();
      expect(errors).toEqual([]);
    } finally {
      await act(async () => { root?.unmount(); });
      container.remove();
    }
  });
});
