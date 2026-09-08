import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NODES, nodesForIntervention } from "@/lib/causalAtlasData";
import { CausalAtlas } from "../CausalAtlas";
const flow = vi.hoisted(() => ({ fitView: vi.fn() }));
vi.mock("@xyflow/react", () => ({
  ReactFlowProvider: ({ children }: { children: React.ReactNode }) => children,
  ReactFlow: () => <div data-testid="mock-graph" />,
  Background: () => null, Controls: () => null, MiniMap: () => null,
  useReactFlow: () => flow, MarkerType: { ArrowClosed: "arrow" },
  Handle: () => null, Position: { Left: "left", Right: "right" },
}));
beforeEach(() => {
  window.history.replaceState({}, "", "/fi/map");
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Complete, responsive atlas exploration", () => {
  it("exposes every channel in the mobile list and searches named source channels", () => {
    render(<CausalAtlas locale="fi" />);
    expect(within(screen.getByTestId("atlas-list")).getAllByRole("button")).toHaveLength(NODES.length);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "VK13" } });
    expect(screen.getByRole("status")).toHaveTextContent(`1 / ${NODES.length}`);
    expect(screen.getByRole("button", { name: /Hypotalamuksen vesikkelit/ })).toBeInTheDocument();
  });
  it("switches subatlases, handles empty intersections and resets filters", () => {
    render(<CausalAtlas locale="fi" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Valitse aliatlas" }), { target: { value: "ecology" } });
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "ei-ole-solmua" } });
    expect(screen.getByText("Näillä rajauksilla ei löytynyt kanavia.")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Valitse aliatlas" }), { target: { value: "reproduction" } });
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("status")).not.toHaveTextContent(/^0 /);
    expect(window.location.search).toContain("atlas=reproduction");
  });
  it("opens a mobile deep link, follows an edge and restores focus on Escape", () => {
    window.history.replaceState({}, "", "/fi/map?atlas=reproduction&node=ovarian_reserve");
    render(<CausalAtlas locale="fi" />);
    const initial = screen.getByRole("complementary", { name: /Primordiaalifollikkelien/ });
    expect(within(initial).getByRole("heading", { name: "Tuloyhteydet" })).toBeInTheDocument();
    fireEvent.click(within(initial).getByRole("button", { name: /→ Munasolun mitokondriaalinen/ }));
    expect(window.location.search).toContain("node=oocyte_redox");
    fireEvent.click(screen.getByRole("button", { name: "Sulje tiedot" }));
    expect(window.location.search).not.toContain("node=");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "OVARIAN_RESERVE" } });
    const origin = within(screen.getByTestId("atlas-list")).getByRole("button");
    fireEvent.click(origin);
    expect(origin).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(origin).toHaveFocus();
  });
  it.each([
    ["MALE_STEROIDOGENESIS", "male_steroidogenesis"],
    ["LINDGREN_METRIC_DRIVE", "lindgren_metric_drive"],
  ])("opens canonical model deep link %s in its existing atlas node", (modelId, atlasId) => {
    window.history.replaceState({}, "", `/fi/map?node=${modelId}`);
    render(<CausalAtlas locale="fi" />);
    const node = NODES.find(item => item.id === atlasId)!;
    expect(node.modelIds).toContain(modelId);
    expect(screen.getByRole("complementary", { name: node.label.fi })).toBeInTheDocument();
    expect(within(screen.getByTestId("atlas-list")).getByRole("button", { name: name => name.includes(node.label.fi) })).toHaveAttribute("aria-expanded", "true");
  });
  it("does not carry hidden filters into a guide and advances along real nodes", () => {
    render(<CausalAtlas locale="fi" />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "does-not-exist" } });
    fireEvent.click(screen.getByRole("button", { name: "Opastettu reitti" }));
    expect(screen.getByRole("status")).toHaveTextContent(`6 / ${NODES.length}`);
    fireEvent.click(screen.getByRole("button", { name: "Seuraava vaihe" }));
    expect(window.location.search).toContain("node=mech_vgcc_ros");
    fireEvent.click(screen.getByRole("button", { name: "Sulje tiedot" }));
    fireEvent.click(screen.getByRole("button", { name: "Opastettu reitti" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
  it("keeps French routes and citations in French with English channel fallback", () => {
    window.history.replaceState({}, "", "/fr/map?node=card_membrane_machinery_transfer&view=list");
    render(<CausalAtlas locale="fr" />);
    const detail = screen.getByRole("complementary", { name: "Transferable membrane machinery" });
    expect(within(detail).getByRole("button", { name: "Fermer les détails" })).toBeInTheDocument();
    for (const link of within(detail).getAllByRole("link")) {
      const href = link.getAttribute("href");
      if (href?.startsWith("/")) expect(href).toMatch(/^\/fr\//);
    }
  });
  it("recovers from invalid URL state", () => {
    window.history.replaceState({}, "", "/fi/map?atlas=invalid&node=invalid");
    render(<CausalAtlas locale="fi" />);
    expect(screen.getByRole("combobox", { name: "Valitse aliatlas" })).toHaveValue("all");
    expect(screen.queryByRole("button", { name: "Sulje tiedot" })).not.toBeInTheDocument();
    expect(within(screen.getByTestId("atlas-list")).getAllByRole("button")).toHaveLength(NODES.length);
  });
  it("opens a profile across subatlases with scoped signs and a reciprocal experiment link", () => {
    window.history.replaceState({}, "", "/fi/map?atlas=ecology&profile=lipid_ttype_inhibition&node=mech_aa_lte4_inhibition");
    render(<CausalAtlas locale="fi" />);
    expect(screen.getByRole("combobox", { name: "Valitse aliatlas" })).toHaveValue("all");
    expect(within(screen.getByTestId("atlas-list")).getAllByRole("button")).toHaveLength(nodesForIntervention("lipid_ttype_inhibition").length);
    const detail = screen.getByRole("complementary", { name: /AA\/LTE4/ });
    expect(within(detail).getAllByTestId("atlas-intervention-effect").map(item => item.textContent).join(" ")).toMatch(/Ehdollinen synteesi.*Tutkimuksen komponentti/);
    expect(within(detail).getByRole("link", { name: /AA.*→/ })).toHaveAttribute("href", "/fi/evidence/pharmacology?profile=lipid_ttype_inhibition#intervention-explorer");
    fireEvent.click(screen.getByRole("button", { name: "Sulje tiedot" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Valitse aliatlas" }), { target: { value: "ecology" } });
    expect(screen.getByRole("combobox", { name: "Farmakologiset kokeet yli aliatlasten" })).toHaveValue("");
    expect(window.location.search).not.toContain("profile=");
  });
  it("does not leave a hidden profile filter behind when entering a guide", () => {
    render(<CausalAtlas locale="fi" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Farmakologiset kokeet yli aliatlasten" }), { target: { value: "coq10_response" } });
    expect(screen.getByRole("status")).toHaveTextContent(`${nodesForIntervention("coq10_response").length} /`);
    fireEvent.click(screen.getByRole("button", { name: "Opastettu reitti" }));
    expect(window.location.search).not.toContain("profile=");
    expect(screen.getByRole("combobox", { name: "Farmakologiset kokeet yli aliatlasten" })).toHaveValue("");
  });
  it("uses a public history update when the current entry belongs to Next", () => {
    window.history.replaceState({ __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: ["fixture"] }, "", "/fi/map");
    const replace = vi.spyOn(window.history, "replaceState");
    render(<CausalAtlas locale="fi" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Farmakologiset kokeet yli aliatlasten" }), { target: { value: "coq10_response" } });
    expect(replace).toHaveBeenLastCalledWith(null, "", expect.any(URL));
    expect(screen.getByRole("status")).toHaveTextContent(`${nodesForIntervention("coq10_response").length} /`);
    expect(window.location.search).toContain("profile=coq10_response");
  });
});
