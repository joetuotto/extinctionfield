import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CollapsibleSection } from "../CollapsibleSection";

afterEach(() => { cleanup(); window.history.replaceState(null, "", "/"); });
describe("search destinations in collapsed sections", () => {
  it("keeps closed content in the HTML and controls its visibility", () => {
    render(<CollapsibleSection id="bridge" title="L2 bridge"><p>Calibration content</p></CollapsibleSection>);
    const trigger = screen.getByRole("button", { name: "L2 bridge" });
    expect(screen.getByText("Calibration content")).toBeInTheDocument();
    expect(screen.getByText("Calibration content")).not.toBeVisible();
    expect(document.getElementById(trigger.getAttribute("aria-controls")!)).toHaveAttribute("hidden");
    fireEvent.click(trigger);
    expect(screen.getByText("Calibration content")).toBeVisible();
  });

  it("opens direct section links and later links to descendants", async () => {
    window.history.replaceState(null, "", "/fi/model#bridge");
    render(<CollapsibleSection id="bridge" title="L2 bridge"><p id="detail">Calibration content</p></CollapsibleSection>);
    await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true"));
    fireEvent.click(screen.getByRole("button"));
    window.history.replaceState(null, "", "/fi/model#detail");
    fireEvent(window, new HashChangeEvent("hashchange"));
    await waitFor(() => expect(screen.getByText("Calibration content")).toBeVisible());
  });
});
