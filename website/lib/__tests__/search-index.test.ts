import { describe, expect, it } from "vitest";
import { indexableRoute, prepareSearchHtml, referenceSearchRecord } from "../../scripts/search-index.mjs";
import { SEARCH_COPY, searchHref, searchType, safeSearchUrl } from "../search";
import { locales } from "../i18n";

describe("site search indexing", () => {
  it("uses canonical locale routes and omits redirects, search, errors and duplicate references", () => {
    expect(indexableRoute("fi/measurement/fieldstate.html")).toEqual({ url: "/fi/measurement/fieldstate", locale: "fi", kind: "page" });
    expect(indexableRoute("fi/articles/bee.html")?.kind).toBe("article");
    for (const path of ["_not-found.html", "fi/search.html", "fi/berm-v18/foo.html", "fi/model/fieldstate.html", "fi/model/fieldstate/math.html", "fi/references/id.html"]) expect(indexableRoute(path)).toBeNull();
  });

  it("indexes body and collapsed content, excludes chrome, and links only to existing fragments", () => {
    const html = '<html lang="en"><nav>Navigation noise</nav><main id="main-content"><h1>Malli</h1><section id="bridge"><button><h2>L2-silta</h2></button><div id="_R_12_" hidden data-search-collapsible-content><p>Kudosvasteen kalibraatio</p><h3>Ei omaa ankkuria</h3></div></section><div hidden>Unrelated hidden UI</div><p data-pagefind-ignore>Ignore me</p><svg><text>Chart noise</text></svg></main><footer>Footer noise</footer><script>window.payload="Do not index";</script></html>';
    const result = prepareSearchHtml(html, { url: "/fi/model", locale: "fi", kind: "page" });
    expect(result).toContain('lang="fi"');
    expect(result).toContain('h2 id="bridge"');
    expect(result).toContain("Kudosvasteen kalibraatio");
    expect(result).toContain('kind:page');
    for (const noise of ["Navigation noise", "Footer noise", "Do not index", "Chart noise", "Ignore me", "Unrelated hidden UI"]) expect(result).not.toContain(noise);
    expect(result).not.toContain('<h3 id="_R_12_"');
    expect(result).not.toContain(" hidden");
  });

  it("keeps reference aliases searchable without inventing findings or external source links", () => {
    const record = referenceSearchRecord({ id: "canonical", aliases: ["old-id"], title: "Study title", authors: "Author", year: 2026, doi: "10.1234/example", finding: "An interpreted conclusion", link_status: "pending" }, "fi");
    expect(record.url).toBe("/fi/references/canonical");
    expect(record.meta.identifiers).toContain("old-id");
    expect(record.meta.identifiers).toContain("10.1234/example");
    expect(record.meta.status).toBe("pending");
    expect(record.content).not.toContain("interpreted conclusion");
    expect(record.content).toContain("Study title");
  });

  it("omits Next redirect artifacts while failing on unexpectedly missing page content", () => {
    const route = { url: "/fi/modulome/hippocampus", locale: "fi", kind: "page" };
    expect(prepareSearchHtml('<html><script>NEXT_REDIRECT;replace;/fi/modulome/brain;307;</script></html>', route)).toBeNull();
    expect(() => prepareSearchHtml("<html><body>Broken page</body></html>", route)).toThrow("Missing main content");
  });

  it("encodes shareable searches and supplies complete copy in all five languages", () => {
    expect(searchHref("fi", "Ca²⁺ & χ_geo", "reference", 2)).toBe("/fi/search?q=Ca%C2%B2%E2%81%BA+%26+%CF%87_geo&type=reference&page=2");
    expect(searchType("bogus")).toBe("all");
    expect(safeSearchUrl("/fi/measurement/fieldstate#record", "fi")).toBe(true);
    for (const url of ["https://other.site/fi", "//other.site/fi", "javascript:alert(1)", "/en/model", "/fi/\\evil"]) expect(safeSearchUrl(url, "fi")).toBe(false);
    for (const locale of locales) expect(Object.keys(SEARCH_COPY[locale])).toEqual(Object.keys(SEARCH_COPY.en));
  });
});
