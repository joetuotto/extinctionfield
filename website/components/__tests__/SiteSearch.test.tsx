import "@testing-library/jest-dom/vitest";
import { useSyncExternalStore, type AnchorHTMLAttributes } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteSearch } from "../SiteSearch";
import { SearchLink } from "../SearchLink";

const engine = vi.hoisted(() => ({ search: vi.fn(), load: vi.fn() }));
vi.mock("@/lib/search", async (original) => ({ ...await original<object>(), loadSearch: engine.load }));
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(useSyncExternalStore(subscribe, () => window.location.search, () => "")),
}));
vi.mock("next/link", () => ({ default: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) => {
  const attributes = { ...props };
  delete attributes.prefetch;
  return <a {...attributes} />;
} }));

function result(title: string, url = "/fi/model") {
  return { id: title, data: async () => ({ url, meta: { title, kind: "page" }, excerpt: "BERM <mark>malli</mark>", sub_results: [{ title: "Kalibraatio", url: `${url}#calibration`, excerpt: "Avoin <mark>kalibraatio</mark>" }] }) };
}

beforeEach(() => {
  window.history.replaceState(null, "", "/fi/search");
  for (const method of ["replaceState", "pushState"] as const) {
    const original = window.history[method].bind(window.history);
    vi.spyOn(window.history, method).mockImplementation((...args) => { original(...args); window.dispatchEvent(new PopStateEvent("popstate")); });
  }
  engine.load.mockResolvedValue(engine);
  engine.search.mockImplementation((_query, options) => Promise.resolve({ results: options.filters.kind === "reference" ? [] : [result("BERM model")] }));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); });

describe("site-wide search experience", () => {
  it("does not load an index for an empty query and exposes localized keyboard entry", () => {
    render(<><SearchLink locale="fi" /><SiteSearch locale="fi" /></>);
    expect(engine.load).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Hae sivustolta" })).toHaveAttribute("href", "/fi/search");
    const input = screen.getByRole("searchbox");
    input.blur();
    fireEvent.keyDown(document.body, { key: "k", ctrlKey: true });
    expect(input).toHaveFocus();
    expect(screen.getByText("Kokeile aihetta")).toBeVisible();
  });

  it("loads a shared query, renders section links, filters, and preserves URL state", async () => {
    window.history.replaceState(null, "", "/fi/search?q=malli");
    render(<SiteSearch locale="fi" />);
    expect(screen.getByRole("searchbox")).toHaveValue("malli");
    expect(await screen.findByRole("link", { name: "BERM model" })).toHaveAttribute("href", "/fi/model");
    expect(screen.getByRole("link", { name: "Kalibraatio" })).toHaveAttribute("href", "/fi/model#calibration");
    expect(document.querySelector("mark")).toHaveTextContent("malli");
    fireEvent.click(screen.getByRole("radio", { name: "Lähteet" }));
    await waitFor(() => expect(engine.search).toHaveBeenLastCalledWith("malli", { filters: { kind: "reference" } }));
    expect(window.location.search).toBe("?q=malli&type=reference");
    act(() => { window.history.replaceState(null, "", "/fi/search?q=Lindgren"); });
    expect(screen.getByRole("searchbox")).toHaveValue("Lindgren");
  });

  it("ignores an old request after a new query returns", async () => {
    let resolveOld: (value: { results: ReturnType<typeof result>[] }) => void = () => {};
    engine.search.mockImplementation((query, options) => options.filters.kind === "reference" ? Promise.resolve({ results: [] }) : query === "old" ? new Promise((resolve) => { resolveOld = resolve; }) : Promise.resolve({ results: [result("New result")] }));
    window.history.replaceState(null, "", "/fi/search?q=old");
    render(<SiteSearch locale="fi" />);
    await waitFor(() => expect(engine.search).toHaveBeenCalledWith("old", { filters: { kind: { any: ["page", "article"] } } }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "new" } });
    expect(await screen.findByRole("link", { name: "New result" })).toBeVisible();
    await act(async () => { resolveOld({ results: [result("Old result")] }); });
    expect(screen.queryByRole("link", { name: "Old result" })).not.toBeInTheDocument();
  });

  it("distinguishes loading failures from zero results and supports retry and clear", async () => {
    engine.load.mockRejectedValueOnce(new Error("offline"));
    engine.search.mockResolvedValue({ results: [] });
    window.history.replaceState(null, "", "/fi/search?q=none");
    render(<SiteSearch locale="fi" />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Hakua ei voitu ladata");
    expect(screen.queryByText("Hakutuloksia ei löytynyt.")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Yritä uudelleen" }));
    expect(await screen.findByText("Hakutuloksia ei löytynyt.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Tyhjennä haku" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.queryByText("Hakutuloksia ei löytynyt.")).not.toBeInTheDocument();
  });

  it("loads ten excerpts at a time and clamps an out-of-range result page", async () => {
    const results = Array.from({ length: 12 }, (_, index) => ({ ...result(`Result ${index}`, `/fi/page-${index}`), data: vi.fn(result(`Result ${index}`, `/fi/page-${index}`).data) }));
    engine.search.mockImplementation((_query, options) => Promise.resolve({ results: options.filters.kind === "reference" ? [] : results }));
    window.history.replaceState(null, "", "/fi/search?q=BERM");
    render(<SiteSearch locale="fi" />);
    expect(await screen.findByRole("link", { name: "Result 9" })).toBeVisible();
    expect(results[10].data).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Seuraava" }));
    expect(await screen.findByRole("link", { name: "Result 11" })).toBeVisible();
    expect(window.location.search).toBe("?q=BERM&page=2");
    expect(screen.getByRole("button", { name: "Seuraava" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent("Sivu 2 / 2");
  });
});
