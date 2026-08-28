import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InlineReferenceText } from "../InlineReferenceText";
import { StudyCitation } from "../StudyCitation";

afterEach(cleanup);

describe("StudyCitation", () => {
  it("renders a verified study as a direct source link plus a separate detail link", () => {
    render(<StudyCitation referenceId="sousouri2025" locale="fi" />);

    const citation = screen.getByText(/Sousouri ym\. \(2025\)/).closest("[data-reference-id]");
    expect(citation).not.toBeNull();
    expect(citation).toHaveAttribute("data-reference-status", "verified");

    const links = within(citation as HTMLElement).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://doi.org/10.1016/j.neuroimage.2025.121340");
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(links[0]).toHaveAttribute("title", expect.stringContaining("NeuroImage"));
    expect(links[1]).toHaveAttribute("href", "/fi/references/sousouri2025");
    expect(links[1]).toHaveAccessibleName(/Lähdetiedot/);
    expect(within(citation as HTMLElement).getByRole("tooltip")).toHaveTextContent(
      "CACNA1C genotype determines sleep EEG response to 5G exposure in double-blind study",
    );
  });

  it("keeps a pending identifier non-clickable while preserving its internal detail page", () => {
    render(<StudyCitation referenceId="pmc5034549_verapamil_cancer" locale="en" />);

    const citation = document.querySelector('[data-reference-id="pmc5034549_verapamil_cancer"]');
    expect(citation).not.toBeNull();
    expect(citation).toHaveAttribute("data-reference-status", "pending");

    const links = within(citation as HTMLElement).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute(
      "href",
      "/en/references/pmc5034549_verapamil_cancer",
    );
    expect(within(citation as HTMLElement).getByText(/et al\. \(2016\)/)).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("keeps a locally registered DOI non-clickable until metadata is matched", () => {
    render(<StudyCitation referenceId="colin1992_varroa_electrostatic" locale="en" />);

    const citation = document.querySelector('[data-reference-id="colin1992_varroa_electrostatic"]');
    expect(citation).not.toBeNull();
    expect(citation).toHaveAttribute("data-reference-status", "registered");

    const links = within(citation as HTMLElement).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/en/references/colin1992_varroa_electrostatic");
    expect(within(citation as HTMLElement).getByText(/Colin et al\. \(1992\)/)).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("does not invent a link for an unknown reference ID", () => {
    render(<StudyCitation referenceId="definitely-unknown" locale="en" />);
    const unknown = screen.getByText("definitely-unknown");
    expect(unknown).toHaveAttribute("data-reference-status", "unknown");
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("InlineReferenceText", () => {
  it("turns only an explicit referenceId token into a StudyCitation", () => {
    render(
      <p>
        <InlineReferenceText
          locale="en"
          text="Observed by [[ref:sousouri2025|Sousouri et al. (2025)]], then replicated."
        />
      </p>,
    );

    expect(screen.getByText(/Observed by/)).toHaveTextContent("Observed by");
    expect(document.querySelector('[data-reference-id="sousouri2025"]')).not.toBeNull();
    expect(screen.getByRole("link", { name: /Sousouri et al\. \(2025\).*CACNA1C genotype/ })).toHaveAttribute(
      "href",
      "https://doi.org/10.1016/j.neuroimage.2025.121340",
    );
    expect(screen.getByText(/then replicated/)).toBeInTheDocument();
  });

  it("leaves ordinary author-year prose untouched instead of inferring a source", () => {
    render(<InlineReferenceText locale="en" text="Ritz et al. (2004)" />);
    expect(screen.getByText("Ritz et al. (2004)")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("resolves an exact PMC identifier without guessing from translated prose", () => {
    render(<InlineReferenceText locale="en" text="Observed in PMC4757866." />);

    const citation = document.querySelector('[data-reference-id="sun2016_elf_vgcc"]');
    expect(citation).not.toBeNull();
    expect(within(citation as HTMLElement).getByRole("link", { name: /PMC4757866/ })).toHaveAttribute(
      "href",
      "https://doi.org/10.1038/srep21774",
    );
  });
});
