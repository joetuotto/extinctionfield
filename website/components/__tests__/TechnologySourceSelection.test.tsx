import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FieldReconstructionTimeline } from "../FieldReconstructionTimeline";
import { TechnologyDriverPanel } from "../TechnologyDriverPanel";
import { SourceEnvironmentIllustration } from "../SourceEnvironmentIllustration";
import { getChangeAtlasSeries } from "@/lib/change-atlas-data";

const props = { countryId: "FIN" as const, locale: "en", from: 1950, to: 2023, year: 1991, onYearChange: vi.fn() };
function Pair() {
  return <><div data-testid="timeline"><FieldReconstructionTimeline {...props} /></div><div data-testid="drivers"><TechnologyDriverPanel {...props} /></div></>;
}
const illustrated = () => screen.getByRole("combobox", { name: "Illustrated source family" });
const numeric = () => screen.getByRole("combobox", { name: "Source family" });
const urlFamily = () => new URLSearchParams(window.location.search).get("t_family");
beforeEach(() => window.history.replaceState({ preserve: true }, "", "/en/explore?tab=atlas&country=FIN&view=fields&year=1991&t_family=digital-2g&t_interpolate=1&custom=keep#atlas"));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("shared atlas source-family selection", () => {
  it.each(["", "&t_family=unknown-family"])("uses one shared default when only a non-grid series has observations (query: %s)", suffix => {
    // Actual coverage edge: US radio has a 1930 point, electricity has none
    // within 1929–1931. Availability must not select a different family per panel.
    const available = getChangeAtlasSeries("USA").filter(series => series.datasetFamily === "technology"
      && series.points.some(point => point.year >= 1929 && point.year <= 1931));
    expect(available.some(series => series.technologyFamilyId === "radio-broadcast")).toBe(true);
    expect(available.some(series => series.technologyFamilyId === "electric-grid")).toBe(false);
    window.history.replaceState({}, "", `/en/explore?country=USA&from=1929&to=1931${suffix}`);
    const period = { ...props, countryId: "USA" as const, from: 1929, to: 1931, year: 1930 };
    render(<><FieldReconstructionTimeline {...period} /><TechnologyDriverPanel {...period} /></>);
    expect(illustrated()).toHaveValue("electric-grid");
    expect(numeric()).toHaveValue("electric-grid");
  });

  it("restores the same family from the URL in history, illustration and numerical panel", () => {
    const view = render(<Pair />);
    expect(illustrated()).toHaveValue("digital-2g");
    expect(numeric()).toHaveValue("digital-2g");
    expect(view.container.querySelector("[data-source-environment]")).toHaveAttribute("data-source-environment", "digital-2g");
    expect(view.container.querySelector("[data-source-environment]")).toHaveAttribute("data-history-year", "1991");
    const expanded = within(screen.getByTestId("timeline")).getAllByRole("button").filter(button => button.getAttribute("aria-expanded") === "true");
    expect(expanded).toHaveLength(1);
    expect(expanded[0]).toHaveTextContent(/2G/);
  });

  it("shares changes from either selector and a history row, retaining unrelated URL and history state", () => {
    render(<Pair />);
    fireEvent.change(numeric(), { target: { value: "lighting-drivers" } });
    expect(illustrated()).toHaveValue("lighting-drivers");
    fireEvent.change(illustrated(), { target: { value: "wifi" } });
    expect(numeric()).toHaveValue("wifi");
    expect(urlFamily()).toBe("wifi");
    const radio = within(screen.getByTestId("timeline")).getAllByRole("button").find(button => /Radio broadcasting/i.test(button.textContent ?? ""))!;
    expect(radio).toBeDefined();
    fireEvent.click(radio);
    expect(illustrated()).toHaveValue("radio-broadcast");
    expect(numeric()).toHaveValue("radio-broadcast");
    expect(urlFamily()).toBe("radio-broadcast");
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries({ year: "1991", country: "FIN", view: "fields", t_interpolate: "1", custom: "keep" })) expect(url.searchParams.get(key)).toBe(value);
    expect(url.hash).toBe("#atlas");
    expect(window.history.state).toEqual({ preserve: true });
    expect(screen.getByRole("checkbox", { name: /Show linear reconstruction/ })).toBeChecked();
  });

  it("retains a selected family after remount and responds to native browser navigation", () => {
    const view = render(<Pair />);
    fireEvent.change(illustrated(), { target: { value: "smart-metering" } });
    view.unmount();
    render(<Pair />);
    expect(illustrated()).toHaveValue("smart-metering");
    expect(numeric()).toHaveValue("smart-metering");
    window.history.replaceState(window.history.state, "", "/en/explore?t_family=mobile-5g&t_interpolate=0");
    act(() => window.dispatchEvent(new PopStateEvent("popstate")));
    expect(illustrated()).toHaveValue("mobile-5g");
    expect(numeric()).toHaveValue("mobile-5g");
    expect(screen.getByRole("checkbox", { name: /Show linear reconstruction/ })).not.toBeChecked();
  });

  it("labels aggregate selections as illustrative fallbacks without changing their numeric scope", () => {
    const view = render(<Pair />);
    fireEvent.change(numeric(), { target: { value: "all" } });
    expect(numeric()).toHaveValue("all");
    expect(illustrated()).toHaveValue("electric-grid");
    expect(view.container.querySelector('[data-field-selection-fallback="all"]')).toHaveTextContent(/example shows/i);
    expect(urlFamily()).toBe("all");
    fireEvent.change(numeric(), { target: { value: "cellular-total" } });
    expect(numeric()).toHaveValue("cellular-total");
    expect(illustrated()).toHaveValue("digital-2g");
    expect(urlFamily()).toBe("cellular-total");
    expect(view.container.querySelector('[data-field-selection-fallback="cellular-total"]')).toHaveTextContent(/example shows/i);
    fireEvent.change(illustrated(), { target: { value: "mobile-4g" } });
    expect(numeric()).toHaveValue("mobile-4g");
    expect(view.container.querySelector("[data-field-selection-fallback]")).toBeNull();
  });

  it("leaves a standalone source illustration's controls local", () => {
    render(<><Pair /><div data-testid="standalone"><SourceEnvironmentIllustration locale="en" /></div></>);
    const local = within(screen.getByTestId("standalone"));
    fireEvent.change(local.getByRole("combobox", { name: "Illustrated source family" }), { target: { value: "wifi" } });
    fireEvent.change(local.getByRole("combobox", { name: "Historical country" }), { target: { value: "JPN" } });
    fireEvent.change(local.getByRole("slider", { name: "Historical year" }), { target: { value: "2005" } });
    expect(numeric()).toHaveValue("digital-2g");
    expect(urlFamily()).toBe("digital-2g");
    expect(local.getByText("Japan · 2005")).toBeInTheDocument();
  });

  it("restores a deep link after hydration without a server/client markup mismatch", async () => {
    const host = document.createElement("div"); document.body.appendChild(host);
    const error = vi.spyOn(console, "error").mockImplementation(() => {}), recover = vi.fn();
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      host.innerHTML = renderToString(<Pair />);
      await act(async () => { root = hydrateRoot(host, <Pair />, { onRecoverableError: recover }); });
      expect(recover).not.toHaveBeenCalled();
      expect(error.mock.calls.filter(call => /hydrat|didn't match|did not match/i.test(String(call[0])))).toEqual([]);
      expect(within(host).getByRole("combobox", { name: "Illustrated source family" })).toHaveValue("digital-2g");
      expect(within(host).getByRole("combobox", { name: "Source family" })).toHaveValue("digital-2g");
    } finally {
      if (root) await act(async () => root!.unmount());
      host.remove();
    }
  });
});
