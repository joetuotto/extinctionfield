import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EncounterWindowsIllustration } from "../EncounterWindowsIllustration";

afterEach(() => cleanup());

describe("EncounterWindowsIllustration", () => {
  it("calculates intersection length, including equal windows and touching boundaries, without changing either duration", () => {
    const { container } = render(<EncounterWindowsIllustration locale="en" variant="pollination" />);
    const slider = screen.getByRole("slider", { name: /Shift the bee activity window/ });
    const result = screen.getByRole("status");
    expect(result).toHaveTextContent("Shared time: 4 time units. Shared interval: 9–13.");
    const window = (index: number) => container.querySelector(`[data-encounter-track='${index}'] [data-window-start]`)!;
    for (const [shift, expected] of [[-9, 3], [-4, 8], [0, 4], [4, 0], [7, 0]]) {
      fireEvent.change(slider, { target: { value: shift } });
      expect(result).toHaveAttribute("data-encounter-overlap", String(expected));
      expect(Number(window(1).getAttribute("data-window-end")) - Number(window(1).getAttribute("data-window-start"))).toBe(8);
      expect(window(0)).toHaveAttribute("data-window-start", "5");
      expect(window(0)).toHaveAttribute("data-window-end", "13");
      if (!expected) expect(container.querySelector("[data-encounter-track='2'] [data-window-start]")).toBeNull();
    }
    expect(result).toHaveTextContent("There is no shared time in this example.");
    expect(slider).toHaveAttribute("aria-valuetext", "+7 time units");
    expect(screen.getByText(/not a reproduction percentage/)).toBeVisible();
  });

  it("shows the pollination measurements and the population bridge separately from the timing calculation", () => {
    const { container } = render(<EncounterWindowsIllustration locale="fi" variant="pollination" />);
    expect(screen.getByText("Synteettinen ajoitusesimerkki")).toBeVisible();
    expect(screen.getByRole("img", { name: /Kukkiva kasvi ja mehiläinen/ })).toBeInTheDocument();
    expect(screen.getByText(/Kirjaa kukkavierailu ja siitepölyn siirtyminen/)).toBeVisible();
    expect(screen.getByText(/Populaatiotulkinta vaatii useita paikkoja, vuosia/)).toBeVisible();
    const details = container.querySelector("details")!;
    details.open = true;
    expect(within(details).getByText(/havaintoponnistus ja paikallinen kenttä/)).toBeVisible();
    expect(within(details).getByText(/siirtoa ei ole johdettu kentästä/)).toBeVisible();
    expect(within(details).getByRole("link")).toHaveAttribute("href", "/fi/evidence/ecology#narrative-electroecology");
    expect(container.querySelector("[data-series-id], [data-point-year], [data-prediction]")).toBeNull();
  });

  it("gives joint action its own conditions and does not infer willingness or hormone state from overlap", () => {
    const { container } = render(<EncounterWindowsIllustration locale="en" variant="joint-action" compact />);
    expect(screen.getByRole("img", { name: /Two neutrally drawn people/ })).toBeInTheDocument();
    expect(screen.getByText(/Goals, willingness and consent are separate conditions/)).toBeVisible();
    expect(screen.getByText(/One pair does not represent population or institutional change/)).toBeVisible();
    const details = container.querySelector("details")!;
    details.open = true;
    expect(within(details).getByText(/Hormones, motivation and population outcomes are not calculated/)).toBeVisible();
    expect(within(details).getByRole("link")).toHaveAttribute("href", "/en/behavior#joint-action");
    const slider = screen.getByRole("slider", { name: /Shift person B/ });
    expect(slider).toHaveAttribute("min", "-9");
    expect(slider).toHaveAttribute("max", "7");
    expect(slider).toHaveAttribute("step", "1");
    expect(slider).toHaveAccessibleDescription(/not a reproduction percentage/);
  });

  it("uses matching time coordinates in every lane and keeps repeated examples independent", () => {
    const { container } = render(<><EncounterWindowsIllustration locale="en" variant="pollination" /><EncounterWindowsIllustration locale="en" variant="joint-action" compact /></>);
    const sections = [...container.querySelectorAll("[data-encounter-variant]")];
    fireEvent.change(within(sections[1] as HTMLElement).getByRole("slider"), { target: { value: -4 } });
    expect(within(sections[0] as HTMLElement).getByRole("status")).toHaveAttribute("data-encounter-overlap", "4");
    expect(within(sections[1] as HTMLElement).getByRole("status")).toHaveAttribute("data-encounter-overlap", "8");
    const aligned = sections[1].querySelectorAll("[data-window-start='5']");
    expect(aligned).toHaveLength(3);
    expect(new Set([...aligned].map(node => node.getAttribute("x"))).size).toBe(1);
    expect(new Set([...aligned].map(node => node.getAttribute("width"))).size).toBe(1);
    const ids = [...container.querySelectorAll("[id]")].map(node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const svg of container.querySelectorAll("svg")) expect(svg).toHaveAttribute("width", "100%");
  });

  it.each(["fi", "en"])("hydrates the %s SVG illustration without replacing its initial drawing", async locale => {
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<EncounterWindowsIllustration locale={locale} variant="pollination" />);
    const original = [...container.querySelectorAll("svg")];
    const errors = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <EncounterWindowsIllustration locale={locale} variant="pollination" />, { onRecoverableError: errors }); });
    expect(errors).not.toHaveBeenCalled();
    expect([...container.querySelectorAll("svg")]).toEqual(original);
    for (const title of container.querySelectorAll("svg title")) expect(title.childNodes).toHaveLength(1);
    fireEvent.change(within(container).getByRole("slider"), { target: { value: 4 } });
    expect(within(container).getByRole("status")).toHaveAttribute("data-encounter-overlap", "0");
    await act(async () => root!.unmount());
    container.remove();
  });

  it("keeps English fallback readable for another locale", () => {
    const { container } = render(<EncounterWindowsIllustration locale="ja" variant="joint-action" />);
    expect(container.querySelector("section")).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { name: "Joint action needs two compatible windows" })).toBeInTheDocument();
  });
});
