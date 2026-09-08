import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LaboratoryComparison } from "../LaboratoryComparison";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("LaboratoryComparison", () => {
  it("opens two example setups with a directional sample and no fabricated response", () => {
    const { container } = render(<LaboratoryComparison locale="fi" />);
    expect(screen.getByRole("group", { name: "Valitse vertailutekijä" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Suunta" })).toBeChecked();
    expect(screen.getByRole("img", { name: /Asetelma A: Näytteen akseli taustan suuntainen/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Asetelma B: Näytteen akseli käännetty/ })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-sample-rotation='rotated']")).toHaveLength(1);
    expect(screen.getByText(/Se ei toisinna nimettyä tutkimusta eikä näytä biologista tulosta/)).toBeVisible();
    expect(screen.getByText(/puuttuva tieto ei osoita peittynyttä vaikutusta/)).toBeVisible();
    expect(container.querySelector("[data-series-id], [data-point-year], [data-prediction]")).toBeNull();
  });

  it.each([
    ["Orientation", "Sample axis aligned with background", "Sample axis rotated", "same coordinate system"],
    ["Light / season", "Shorter preceding light window", "Longer preceding light window", "circadian phase"],
    ["Temperature", "Sample temperature stays stable", "Sample temperature changes during the run", "matching heat, airflow and handling"],
    ["History", "Reference preparation", "Different preceding treatment", "recovery interval"],
    ["Measurement position", "Probe at the sample position", "Probe at the edge of the stage", "transfer model"],
  ])("makes both %s conditions and their necessary record available", (label, first, second, record) => {
    const { container } = render(<LaboratoryComparison locale="en" />);
    fireEvent.click(screen.getByRole("radio", { name: label }));
    expect(screen.getAllByRole("radio").filter(input => (input as HTMLInputElement).checked)).toHaveLength(1);
    expect(screen.getByText(first, { selector: "strong" })).toBeVisible();
    expect(screen.getByText(second, { selector: "strong" })).toBeVisible();
    const update = container.querySelector("[aria-live='polite']")!;
    expect(update).toHaveTextContent(record);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAccessibleName(`Setup A: ${first}. Experimental setup illustration.`);
    expect(images[1]).toHaveAccessibleName(`Setup B: ${second}. Experimental setup illustration.`);
    expect(images[0]).toHaveAccessibleDescription(/not a computed field map/);
  });

  it("changes only the intended sample geometry then resets it when measuring position", () => {
    const { container } = render(<LaboratoryComparison locale="en" />);
    const orientations = () => [...container.querySelectorAll("[data-sample-rotation]")].map(node => node.getAttribute("data-sample-rotation"));
    const probes = () => [...container.querySelectorAll("[data-probe-position]")].map(node => node.getAttribute("data-probe-position"));
    expect(orientations()).toEqual(["reference", "rotated"]);
    expect(probes()).toEqual(["sample", "sample"]);
    fireEvent.click(screen.getByRole("radio", { name: "Measurement position" }));
    expect(orientations()).toEqual(["reference", "reference"]);
    expect(probes()).toEqual(["sample", "stage-edge"]);
    expect(screen.getByText(/does not itself change the sample's biological response/, { selector: "p" })).toBeVisible();
    fireEvent.click(screen.getByRole("radio", { name: "History" }));
    expect(probes()).toEqual(["sample", "sample"]);
    expect([...container.querySelectorAll("[data-preparation]")].map(node => node.getAttribute("data-preparation"))).toEqual(["reference", "different"]);
    fireEvent.click(screen.getByRole("radio", { name: "Temperature" }));
    expect([...container.querySelectorAll("[data-preparation]")].map(node => node.getAttribute("data-preparation"))).toEqual(["reference", "reference"]);
    expect([...container.querySelectorAll("[data-temperature]")].map(node => node.getAttribute("data-temperature"))).toEqual(["stable", "changing"]);
  });

  it("distinguishes test illumination from prior light history and does not assign season a response multiplier", () => {
    const { container } = render(<LaboratoryComparison locale="fi" compact />);
    fireEvent.click(screen.getByRole("radio", { name: "Valo / kausi" }));
    expect(screen.getByText(/Koehetken valaistus pidetään kuvassa samana/, { selector: "p" })).toBeVisible();
    expect(screen.getByText(/kalenterivuodenaika ei yksin kerro näytteen valohistoriaa/, { selector: "p" })).toBeVisible();
    const details = container.querySelector("details")!;
    details.open = true;
    expect(within(details).getByText(/ilman tuntiasteikkoa/)).toBeVisible();
    expect(within(details).getByText(/Sokkoutus, sham-ehto ja biologinen päätemuuttuja/)).toBeVisible();
    expect(details).toHaveTextContent("eivät lajille määritettyjä vasteita");
  });

  it("keeps disclosures and the complete factor choice in compact mode", () => {
    const { container } = render(<LaboratoryComparison locale="en" compact />);
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    const details = container.querySelector("details")!;
    expect(details.open).toBe(false);
    expect(details.querySelector("summary")).toHaveTextContent("How to read the figure and document the measurement");
    fireEvent.click(screen.getByRole("radio", { name: "Measurement position" }));
    details.open = true;
    expect(within(details).getByText(/separate calibration run/)).toBeVisible();
    expect(within(details).getByText(/room measurement or device setpoint/)).toBeVisible();
    expect(screen.getByText(/missing information is not evidence of a hidden effect/)).toBeVisible();
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("width", "100%");
      expect(svg).toHaveAttribute("viewBox", "0 0 440 302");
    }
  });

  it("keeps repeated instances independent and every SVG definition locally resolvable", () => {
    const { container } = render(<><LaboratoryComparison locale="en" /><LaboratoryComparison locale="en" compact /></>);
    const groups = screen.getAllByRole("group", { name: "Choose a comparison factor" });
    fireEvent.click(within(groups[1]).getByRole("radio", { name: "History" }));
    expect(within(groups[0]).getByRole("radio", { name: "Orientation" })).toBeChecked();
    expect(within(groups[1]).getByRole("radio", { name: "History" })).toBeChecked();
    expect(new Set([...container.querySelectorAll("[id]")].map(node => node.id)).size).toBe(container.querySelectorAll("[id]").length);
    for (const svg of container.querySelectorAll("svg")) {
      const localIds = new Set([...svg.querySelectorAll("[id]")].map(node => node.id));
      for (const attribute of ["fill", "marker-end"]) for (const node of svg.querySelectorAll(`[${attribute}]`)) {
        const match = node.getAttribute(attribute)?.match(/^url\(#(.+)\)$/);
        if (match) expect(localIds.has(match[1])).toBe(true);
      }
    }
  });

  it.each(["fi", "en"])("hydrates the %s drawing and keeps controls usable without SVG text mismatches", async locale => {
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<LaboratoryComparison locale={locale} />);
    const original = [...container.querySelectorAll("svg")];
    const errors = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <LaboratoryComparison locale={locale} />, { onRecoverableError: errors }); });
    expect(errors).not.toHaveBeenCalled();
    expect([...container.querySelectorAll("svg")]).toEqual(original);
    fireEvent.click(within(container).getByRole("radio", { name: locale === "fi" ? "Historia" : "History" }));
    expect(container.querySelector("[data-laboratory-comparison]")).toHaveAttribute("data-laboratory-comparison", "history");
    for (const title of container.querySelectorAll("svg title, svg desc")) expect(title.childNodes).toHaveLength(1);
    await act(async () => root!.unmount());
    container.remove();
  });

  it("uses a complete English fallback for other site locales", () => {
    const { container } = render(<LaboratoryComparison locale="ja" />);
    expect(screen.getByRole("heading", { name: "What actually differs between two experiments?" })).toBeInTheDocument();
    expect(container.querySelector("[data-laboratory-comparison]")).toHaveAttribute("lang", "en");
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });
});
