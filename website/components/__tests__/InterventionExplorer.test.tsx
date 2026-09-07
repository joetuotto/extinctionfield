import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSyncExternalStore } from "react";
import { INTERVENTIONS } from "@/lib/interventions";
import { InterventionExplorer } from "../InterventionExplorer";
const router = vi.hoisted(() => ({ search: "" }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(useSyncExternalStore(callback => {
  const sync = () => { router.search = window.location.search; callback(); };
  window.addEventListener("popstate", sync);
  window.addEventListener("next-public-history-update", sync);
  return () => { window.removeEventListener("popstate", sync); window.removeEventListener("next-public-history-update", sync); };
}, () => router.search, () => "")) }));
beforeEach(() => {
  // Match Next 16 app-router: external history calls notify the router,
  // whereas calls carrying __NA/_N are treated as internal and bypass it.
  window.history.replaceState({ __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: ["fixture"] }, "", "/fi/evidence/pharmacology");
  router.search = window.location.search;
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    vi.spyOn(window.history, method).mockImplementation((data, unused, url) => {
      if (data?.__NA || data?._N) { original(data, unused, url); return; }
      original({ ...data, __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: ["fixture"] }, unused, url);
      router.search = window.location.search;
      window.dispatchEvent(new Event("next-public-history-update"));
    });
  }
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe("Intervention exploration", () => {
  it("makes all eight selectable and separates findings, predictions and missing contrasts", () => {
    render(<InterventionExplorer locale="fi" />);
    const select = screen.getByRole("combobox", { name: "Valitse koeprofiili" });
    expect(within(select).getAllByRole("option")).toHaveLength(8);
    for (const profile of INTERVENTIONS.profiles) {
      fireEvent.change(select, { target: { value: profile.id } });
      expect(screen.getByTestId("intervention-observed")).toHaveTextContent(profile.observed.fi);
      expect(screen.getByTestId("intervention-prediction")).toHaveTextContent(profile.prediction.fi);
      expect(screen.getByTestId("intervention-study-contrast")).toHaveTextContent("Tutkimuskontrasti puuttuu");
      expect(window.location.search).toContain(`profile=${profile.id}`);
      expect(window.history.state.__NA).toBe(true);
      expect(window.history.pushState).toHaveBeenLastCalledWith(null, "", expect.any(URL));
    }
  });
  it("supports direct links, browser history and recovery from unknown profiles", () => {
    window.history.replaceState({}, "", "/fi/evidence/pharmacology?profile=cry_fad_competition");
    render(<InterventionExplorer locale="fi" />);
    expect(screen.getByRole("combobox")).toHaveValue("cry_fad_competition");
    expect(screen.getByTestId("intervention-observed")).toHaveTextContent("reporterin amplitudia");
    act(() => { window.history.replaceState({}, "", "?profile=coq10_response"); window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(screen.getByRole("combobox")).toHaveValue("coq10_response");
    act(() => { window.history.replaceState({}, "", "?profile=unknown"); window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(screen.getByRole("combobox")).toHaveValue("mt2_brake");
  });
  it("searches and clears without making other profiles inaccessible", () => {
    render(<InterventionExplorer locale="fi" />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "thapsigargin" } });
    expect(screen.getByRole("status")).toHaveTextContent("1 / 8");
    expect(within(screen.getByRole("combobox")).getAllByRole("option")).toHaveLength(8);
    fireEvent.click(screen.getByRole("button", { name: INTERVENTIONS.profiles.find(p => p.id === "channel_density_store_history")!.title.fi }));
    expect(screen.getByRole("combobox")).toHaveValue("channel_density_store_history");
    expect(screen.getByTestId("intervention-observed")).toHaveTextContent("thapsigargiini");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "not-a-profile" } });
    expect(screen.getByRole("status")).toHaveTextContent("Profiileja ei löytynyt");
    fireEvent.click(screen.getByRole("button", { name: "Tyhjennä haku" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
  it("retains locale and selected mechanism in atlas links with explicit English fallback", () => {
    window.history.replaceState({}, "", "/fr/evidence/pharmacology?profile=drug_photochemistry");
    render(<InterventionExplorer locale="fr" />);
    expect(screen.getByText(/Profile descriptions are available in English and Finnish/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore this mechanism/ })).toHaveAttribute("href", "/fr/map?profile=drug_photochemistry&node=mod_drug_photochemistry");
    expect(screen.getByTestId("intervention-derivation")).toHaveTextContent("They do not identify the physical kernel");
  });
});
