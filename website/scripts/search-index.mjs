import { parse, serialize } from "parse5";

export const SEARCH_LOCALES = ["en", "fi", "ja", "fr", "ko"];

function attr(node, name) { return node.attrs?.find((item) => item.name === name)?.value; }
function setAttr(node, name, value) {
  const item = node.attrs?.find((item) => item.name === name);
  if (item) item.value = value;
  else (node.attrs ??= []).push({ name, value });
}
function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const found = find(child, predicate);
    if (found) return found;
  }
}

export function indexableRoute(relativePath) {
  const url = `/${relativePath.replace(/\\/g, "/").replace(/\.html$/, "").replace(/\/index$/, "")}`;
  const [, locale, ...parts] = url.split("/");
  const route = `/${parts.join("/")}`;
  if (!SEARCH_LOCALES.includes(locale) || /\[|\]/.test(url)) return null;
  if (route === "/search" || route === "/berm-v18" || route.startsWith("/berm-v18/") || route === "/model/fieldstate" || route.startsWith("/model/fieldstate/") || route.startsWith("/references/")) return null;
  return { url, locale, kind: route.startsWith("/articles/") ? "article" : "page" };
}

/** Work on an indexing copy, never rewrite the delivered HTML or React payload. */
export function prepareSearchHtml(html, route) {
  // Remove large hydration payloads before parsing; only rendered content counts.
  const document = parse(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""));
  const main = find(document, (node) => attr(node, "id") === "main-content");
  if (!main && /NEXT_REDIRECT;/.test(html)) return null;
  if (!main) throw new Error(`Missing main content: ${route.url}`);
  const headingAnchors = new Set();
  function clean(node, ancestors = [], inCollapsible = false) {
    const collapsible = inCollapsible || attr(node, "data-search-collapsible-content") !== undefined;
    if (collapsible && node.attrs) node.attrs = node.attrs.filter((item) => item.name !== "hidden");
    if (/^h[1-6]$/.test(node.tagName ?? "")) {
      // Most existing headings use a containing section's stable fragment ID.
      // Give Pagefind that existing destination, not an invented browser anchor.
      const anchor = attr(node, "id") || [...ancestors].reverse().map((parent) => attr(parent, "id"))
        .find((id) => id && id !== "main-content" && !/^[:_]/.test(id) && !headingAnchors.has(id));
      if (anchor && !headingAnchors.has(anchor)) {
        setAttr(node, "id", anchor);
        headingAnchors.add(anchor);
      }
    }
    node.childNodes = (node.childNodes ?? []).filter((child) => {
      if (["nav", "footer", "script", "style", "svg", "select", "input", "textarea", "noscript"].includes(child.tagName)) return false;
      if (attr(child, "data-pagefind-ignore") !== undefined || attr(child, "aria-hidden") === "true") return false;
      if (attr(child, "hidden") !== undefined && !collapsible && attr(child, "data-search-collapsible-content") === undefined) return false;
      if (child.tagName === "button" && !find(child, (descendant) => /^h[1-6]$/.test(descendant.tagName ?? ""))) return false;
      return true;
    });
    for (const child of node.childNodes) clean(child, [...ancestors, node], collapsible);
  }
  clean(main);
  setAttr(main, "data-pagefind-body", "");
  setAttr(main, "data-pagefind-filter", `kind:${route.kind}`);
  setAttr(main, "data-pagefind-meta", `kind:${route.kind}`);
  const firstHeading = find(main, (node) => node.tagName === "h1");
  if (firstHeading) setAttr(firstHeading, "data-pagefind-meta", "title");
  // Every bundle has one language. A route's rendered English fallback remains
  // searchable without conflating five language variants into duplicate results.
  return `<html lang="${route.locale}"><body>${serialize({ nodeName: "#document-fragment", childNodes: [main] })}</body></html>`;
}

export function referenceSearchRecord(reference, locale) {
  const bibliography = [reference.authors, reference.year > 0 ? String(reference.year) : "", reference.title, reference.journal].filter(Boolean).join(". ");
  return {
    url: `/${locale}/references/${encodeURIComponent(reference.id)}`,
    language: locale,
    content: bibliography || reference.id,
    meta: {
      title: reference.title || reference.id,
      kind: "reference",
      // Search aliases and identifiers while showing bibliography, not the
      // registry's interpreted finding, in the visible result excerpt.
      identifiers: [reference.id, ...(reference.aliases ?? []), reference.doi, reference.pmid, reference.pmcid].filter(Boolean).join(" "),
      status: reference.authors && reference.title && reference.year > 0 && reference.link_status === "verified" ? "verified" : "pending",
    },
    filters: { kind: ["reference"] },
  };
}
