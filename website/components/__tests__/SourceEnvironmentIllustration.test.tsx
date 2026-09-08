import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SourceEnvironmentIllustration } from "../SourceEnvironmentIllustration";

afterEach(cleanup);

describe("historical source illustration", () => {
  it("retains unknown history and updates a controlled atlas year through a scoped retirement", () => {
    const { container, rerender } = render(<SourceEnvironmentIllustration locale="fi" countryId="FIN" year={1950} familyId="analog-cellular" />);
    expect(container.querySelector("[data-source-environment]")).toHaveAttribute("data-history-stage", "unknown");
    expect(screen.getByText(/Valitun vuoden paikallista käyttöä ei tunneta/)).toBeInTheDocument();
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
    rerender(<SourceEnvironmentIllustration locale="fi" countryId="FIN" year={1990} familyId="analog-cellular" />);
    expect(container.querySelector("[data-source-environment]")).not.toHaveAttribute("data-history-stage", "unknown");
    rerender(<SourceEnvironmentIllustration locale="fi" countryId="FIN" year={2023} familyId="analog-cellular" />);
    expect(container.querySelector("[data-source-environment]")).toHaveAttribute("data-history-stage", "retired");
    expect(screen.getByText("Rajattu palvelu suljettu")).toBeInTheDocument();
  });

  it("connects family selection to the parent and updates the physical arrangement", () => {
    const change = vi.fn();
    const { rerender, container } = render(<SourceEnvironmentIllustration locale="en" countryId="FIN" year={2023} familyId="electric-grid" onFamilyChange={change} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Illustrated source family" }), { target: { value: "wifi" } });
    expect(change).toHaveBeenCalledWith("wifi");
    rerender(<SourceEnvironmentIllustration locale="en" countryId="FIN" year={2023} familyId="wifi" onFamilyChange={change} />);
    expect(container.querySelector("[data-selected-illustration]")).toHaveAttribute("data-selected-illustration", "wifi");
    expect(screen.getByText("Indoor router")).toBeInTheDocument();
    expect(screen.getByText(/This record does not identify local operation/)).toBeInTheDocument();
  });

  it("allows independent history inspection and retains the record's provenance", () => {
    render(<SourceEnvironmentIllustration locale="fi" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Kuvan lähdeperhe" }), { target: { value: "digital-2g" } });
    fireEvent.change(screen.getByRole("slider", { name: "Historian vuosi" }), { target: { value: "1991" } });
    expect(screen.getByText("Suomi · 1991")).toBeInTheDocument();
    expect(screen.getByText(/1991 · Digitaalinen 2G-palvelu Suomessa/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { hidden: true }).length).toBeGreaterThan(0);
    fireEvent.change(screen.getByRole("combobox", { name: "Historian maa" }), { target: { value: "JPN" } });
    expect(screen.getByText("Japani · 1991")).toBeInTheDocument();
  });

  it("provides valid unique SVG descriptions when reused, with English fallback", () => {
    const { container } = render(<><SourceEnvironmentIllustration locale="ja" /><SourceEnvironmentIllustration locale="fi" /></>);
    const ids = [...container.querySelectorAll("[id]")].map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const element of container.querySelectorAll("[aria-labelledby],[aria-describedby]")) {
      for (const attr of ["aria-labelledby", "aria-describedby"]) {
        for (const id of element.getAttribute(attr)?.split(" ") ?? []) expect(document.getElementById(id)).not.toBeNull();
      }
    }
    expect(screen.getByRole("heading", { name: "Where do source and organism meet?" })).toBeInTheDocument();
  });
});
