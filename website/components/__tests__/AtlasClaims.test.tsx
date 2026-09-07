import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AtlasClaims } from "../atlas/AtlasClaims";

afterEach(cleanup);

describe("Atlas claim scope and source presentation", () => {
  it("shows the localized claim and expands its bounded evidence with Finnish source links", () => {
    const { container } = render(<AtlasClaims claimIds={["claim.receptor.chemical-memory"]} locale="fi" />);
    expect(container.querySelector('[data-claim-id="claim.receptor.chemical-memory"]')).toBeInTheDocument();
    expect(screen.getByText("Luonnosväite")).toBeInTheDocument();
    const disclosure = screen.getByText("Rajaukset ja tutkimustiedot");
    fireEvent.click(disclosure);
    expect(disclosure.closest("details")).toHaveAttribute("open");
    expect(screen.getAllByText("Komponenttirakenne; kenttä–päätepistekerrointa ei sovitettu").length).toBeGreaterThan(0);
    for (const link of screen.getAllByRole("link")) {
      if (link.getAttribute("href")?.startsWith("/")) expect(link.getAttribute("href")).toMatch(/^\/fi\//);
    }
  });
  it("explains missing curation without manufacturing an evidence label", () => {
    render(<AtlasClaims claimIds={[]} locale="fi" />);
    expect(screen.getByText("Tälle kanavalle ei ole vielä kuratoitu väiteliitosta.")).toBeInTheDocument();
    expect(screen.queryByText("Luonnosväite")).not.toBeInTheDocument();
  });
  it("distinguishes a defined claim with no study relation", () => {
    render(<AtlasClaims claimIds={["claim.tfr.multi-input-decomposition"]} locale="en" />);
    fireEvent.click(screen.getByText("Scope and study details"));
    expect(screen.getByText(/No study relation is assigned/)).toBeInTheDocument();
  });
  it("shows the curated association assessment beside the iris claim", () => {
    render(<AtlasClaims claimIds={["claim.modulome.iris-optical-exposure"]} locale="fi" />);
    expect(screen.getByText("Väitteen näytön tyyppi: C · Havaintopohjainen assosiaatio")).toBeInTheDocument();
  });
});
