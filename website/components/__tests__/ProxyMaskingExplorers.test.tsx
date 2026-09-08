import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ActivityProxyChart, InteractionExplorer, MaskingChainDiagram, ReceiverStateExplorer } from "../ProxyMaskingExplorers";

afterEach(cleanup);

describe("proxy masking figures", () => {
  it("reveals the conditional upstream chain while preserving the measured explanation", () => {
    render(<MaskingChainDiagram locale="en" />);
    expect(screen.queryByRole("heading", { name: "Physical input" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Observed outcome" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show the earlier steps" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("heading", { name: "Receiving biology" })).toBeInTheDocument();
    expect(screen.getByText(/physical-to-biological bridge remains open/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("changes response size and timing while keeping the cue identical", () => {
    render(<ReceiverStateExplorer locale="en" />);
    const cue = document.querySelector("[data-cue]")!.getAttribute("d");
    const points = () => document.querySelector("[data-curve='response']")!.getAttribute("points")!;
    const reference = points();
    fireEvent.click(screen.getByRole("button", { name: "Weaker response" }));
    const weaker = points();
    expect(weaker).not.toEqual(reference);
    fireEvent.click(screen.getByRole("button", { name: "Later response" }));
    expect(points()).not.toEqual(reference);
    expect(points()).not.toEqual(weaker);
    expect(points()).not.toMatch(/NaN|Infinity/);
    expect(document.querySelector("[data-cue]")).toHaveAttribute("d", cue);
    expect(screen.getByRole("button", { name: "Later response" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img")).toHaveAccessibleDescription(/Both axes are unitless/);
  });

  it("shows both stronger and weaker conditional chemical effects", () => {
    render(<InteractionExplorer locale="fi" />);
    const endY = () => Number(document.querySelector("[data-curve='chemical-response']")!.getAttribute("points")!.split(" ").at(-1)!.split(",")[1]);
    const reference = endY();
    fireEvent.click(screen.getByRole("button", { name: "Voimistuva vaikutus" }));
    expect(endY()).toBeLessThan(reference);
    fireEvent.click(screen.getByRole("button", { name: "Vaimentuva vaikutus" }));
    expect(endY()).toBeGreaterThan(reference);
    expect(screen.getByText(/kaikki kemikaali–kenttäyhdistelmät/, { selector: "figcaption" })).toBeInTheDocument();
  });

  it("keeps the two empirical measures on separate labelled scales, including English fallback", () => {
    render(<ActivityProxyChart locale="ja" />);
    const exercise = screen.getByRole("img", { name: /^Intentional exercise/ });
    const steps = screen.getByRole("img", { name: /^Daily steps/ });
    expect(within(exercise).getByText("21 %")).toBeInTheDocument();
    expect(within(exercise).getByText("46.9 %")).toBeInTheDocument();
    expect(within(exercise).getByText("100 %")).toBeInTheDocument();
    expect(within(steps).getByText("11,447")).toBeInTheDocument();
    expect(within(steps).getByText("7,605")).toBeInTheDocument();
    expect(within(steps).getByText("12,000")).toBeInTheDocument();
    expect(document.querySelector('[data-reference-id="katz2012_amish_activity"]')).toHaveTextContent("Katz et al. (2012), Journal of Community Health");
    expect(screen.getByText("Age-adjusted mean steps/day")).toBeInTheDocument();
    expect(screen.getByText(/did not identify an EMF cause/)).toBeInTheDocument();
  });
});
