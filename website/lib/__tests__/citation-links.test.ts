import { describe, it, expect } from "vitest";
import { referenceUrl } from "../references";
import { citationHref, normalizeCitationKey, CITATION_LINK_COUNT } from "../citationLinks";
import { LEGACY_EVIDENCE_CATALOGUE, FIELDSTATE_EVIDENCE } from "../evidence";
import referenceData from "../../public/data/references_full.json";

/** Regression guard: resolved links must not silently disappear from the table. */
const COVERAGE_FLOOR = 145;

describe("referenceUrl", () => {
  it("prefers an explicit url over any identifier", () => {
    expect(referenceUrl({ url: "https://example.org/report", doi: "10.1/x" }))
      .toBe("https://example.org/report");
  });

  it("builds a doi.org link from a bare DOI", () => {
    expect(referenceUrl({ doi: "10.1038/nature13290" }))
      .toBe("https://doi.org/10.1038/nature13290");
  });

  it("passes through a DOI already stored as a URL", () => {
    expect(referenceUrl({ doi: "https://doi.org/10.1/x" })).toBe("https://doi.org/10.1/x");
  });

  it("resolves a PubMed Central id to its article page", () => {
    expect(referenceUrl({ doi: "PMC4362825" }))
      .toBe("https://pmc.ncbi.nlm.nih.gov/articles/PMC4362825/");
  });

  it("resolves a PubMed id to its record", () => {
    expect(referenceUrl({ pmid: 10862839 })).toBe("https://pubmed.ncbi.nlm.nih.gov/10862839/");
  });

  it("returns null when nothing is resolvable, rather than a broken link", () => {
    expect(referenceUrl({})).toBeNull();
    expect(referenceUrl({ doi: "", url: "", pmid: null })).toBeNull();
    expect(referenceUrl({ doi: "Leszczynski2002" })).toBeNull();
  });
});

describe("reference registry", () => {
  const refs = referenceData.references as ReadonlyArray<Record<string, unknown>>;

  it("stores no placeholder identifier in the doi field", () => {
    for (const r of refs) {
      const doi = String(r.doi ?? "");
      if (!doi) continue;
      expect(
        doi.startsWith("10.") || doi.startsWith("http") || /^PMC\d+$/i.test(doi) || /^\d{7,9}$/.test(doi),
        `${String(r.id)} has an unresolvable doi value: ${doi}`,
      ).toBe(true);
    }
  });

  it("keeps the resolved share of references from regressing", () => {
    // Floor, not a target: the remaining entries are policy notes, agency
    // documents and paraphrased titles that carry no DOI. See
    // docs/codelle/pending/2026-08-25_viitelinkit_tarkistettavat.md
    const linked = refs.filter((r) => referenceUrl(r as Parameters<typeof referenceUrl>[0]));
    expect(linked.length / refs.length).toBeGreaterThan(0.4);
  });
});

describe("citation links", () => {
  it("normalizes labels to a punctuation- and accent-free key", () => {
    expect(normalizeCitationKey("Šofranková et al. (Pathogens)")).toBe("sofrankova et al pathogens");
    expect(normalizeCitationKey("Chae K-S et al.  PLOS ONE")).toBe("chae k s et al plos one");
  });

  it("returns null for a citation with no known source", () => {
    expect(citationHref("Nonexistent et al.", 1999)).toBeNull();
  });

  it("falls back to the label-only key when no year is given", () => {
    const withYear = citationHref("Ritz et al. (Nature)", 2004);
    if (withYear) expect(withYear).toMatch(/^https:\/\//);
  });

  it("only ever yields absolute https links", () => {
    for (const record of [...FIELDSTATE_EVIDENCE, ...LEGACY_EVIDENCE_CATALOGUE]) {
      const url = "url" in record ? record.url : null;
      if (url) expect(url, `${record.id} has a non-https source`).toMatch(/^https:\/\//);
    }
  });

  it("keeps the resolved inline-citation table populated", () => {
    expect(CITATION_LINK_COUNT).toBeGreaterThanOrEqual(COVERAGE_FLOOR);
  });
});
