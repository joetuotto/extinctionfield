import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AnatomyIllustrationCell, AnatomyIllustrationTestes } from "../AnatomyIllustration";
import { HormoneCompartments } from "../HormoneCompartments";
import { SteroidogenesisEvidenceExplorer } from "../SteroidogenesisEvidenceExplorer";

afterEach(cleanup);

describe("anatomical explanations", () => {
  it("keeps the tubule, supporting cells and interstitial hormone production separately labelled", () => {
    const { container } = render(<AnatomyIllustrationTestes locale="fi" />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
    const labels = screen.getByRole("list");
    expect(within(labels).getByText("Sertoli-solut")).toBeVisible();
    expect(within(labels).getByText(/liitokset muodostavat veri–kivesesteen tiehyen seinämässä/)).toBeVisible();
    expect(within(labels).getByText("Tiehyiden välissä sijaitsevia testosteronia tuottavia soluja.")).toBeVisible();
    expect(within(labels).getByText(/eri kompartimentteja/)).toBeVisible();
    expect(container.querySelectorAll("svg text")).toHaveLength(6);
    expect(container).toHaveTextContent("koot ja solumäärät ovat havainnollistavia");
  });

  it("uses the same study filter for cell anatomy buttons and the existing branch links", () => {
    const { container } = render(<SteroidogenesisEvidenceExplorer locale="en" />);
    const cell = container.querySelector('[data-anatomy="steroidogenic-cell"]')!;
    const region = (id: string) => cell.querySelector(`[data-cell-region="${id}"]`)!;
    fireEvent.click(within(cell as HTMLElement).getByRole("button", { name: "Cholesterol supply" }));
    expect(screen.getByRole("combobox", { name: "Biological mechanism" })).toHaveValue("cholesterol-supply");
    expect(cell).toHaveAttribute("data-anatomy-branch", "cholesterol-supply");
    expect(region("lipids")).toHaveAttribute("data-active", "true");
    expect(region("lysosome")).toHaveAttribute("data-active", "true");
    expect(region("mitochondrion")).toHaveAttribute("data-active", "true");
    expect(region("nucleus")).toHaveAttribute("data-active", "false");
    fireEvent.click(screen.getByRole("link", { name: "CaMKI / RORα → BMAL1 → steroidogenesis" }));
    expect(cell).toHaveAttribute("data-anatomy-branch", "clock-steroidogenesis");
    expect(region("nucleus")).toHaveAttribute("data-active", "true");
    expect(region("lipids")).toHaveAttribute("data-active", "false");
    expect(within(cell as HTMLElement).getByRole("button", { name: "Local clock" })).toHaveAttribute("aria-pressed", "true");
  });

  it("updates anatomy from the study dropdown and does not invent a cellular location for downstream outcomes", () => {
    const { container } = render(<SteroidogenesisEvidenceExplorer locale="en" />);
    const cell = container.querySelector('[data-anatomy="steroidogenic-cell"]')!;
    fireEvent.change(screen.getByRole("combobox", { name: "Biological mechanism" }), { target: { value: "redox-reserve" } });
    expect(cell.querySelector('[data-cell-region="cytoplasm"]')).toHaveAttribute("data-active", "true");
    expect(cell).toHaveTextContent("Reserve is a measured state, not a separate organelle");
    fireEvent.change(screen.getByRole("combobox", { name: "Biological mechanism" }), { target: { value: "behavioural-output" } });
    expect(cell.querySelectorAll('[data-active="true"]')).toHaveLength(0);
    expect(cell).toHaveTextContent("outcomes beyond this cell-level view");
    fireEvent.click(within(cell as HTMLElement).getByRole("button", { name: "Whole cell" }));
    expect(screen.getByRole("combobox", { name: "Biological mechanism" })).toHaveValue("all");
    expect(cell.querySelectorAll('[data-active="true"]')).toHaveLength(6);
  });

  it("keeps the compact biology illustration static and explains its calibration boundary", () => {
    const { container } = render(<AnatomyIllustrationCell locale="fi" compact />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("Vastaanottava järjestelmä solun sisällä")).toBeVisible();
    expect(container).toHaveTextContent("kudosvastesilta tarvitsee erillisen kalibroinnin");
    expect(screen.getByRole("list").children).toHaveLength(6);
  });

  it.each(["fi", "en", "ja"])("retains a readable hormone measurement table and avoids quantitative fractions in %s", locale => {
    const { container } = render(<HormoneCompartments locale={locale} />);
    const fi = locale === "fi";
    const table = screen.getByRole("table", { name: fi ? "Mitä kukin havainto kuvaa" : "What each observation describes" });
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).getByRole("rowheader", { name: fi ? "Kudosvaste" : "Tissue response" })).toBeVisible();
    expect(table).toHaveTextContent(fi ? "ilmoitetulla menetelmällä ja sitoutumisoletuksilla" : "stated method and binding assumptions");
    expect(container).toHaveTextContent(fi ? "eivät niiden osuuksia" : "not their proportions");
    expect(container.textContent).not.toMatch(/\d+\s?%/);
    expect(container.querySelectorAll("h3:empty,h4:empty,p:empty,td:empty")).toHaveLength(0);
    expect(container.querySelector('[data-reference-id="narinx2022_free_testosterone"]')).toBeTruthy();
  });
});
