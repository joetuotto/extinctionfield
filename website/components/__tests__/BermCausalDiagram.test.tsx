import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BermCausalDiagram from "../BermCausalDiagram";
import graph from "@/data/causal-graph.json";

const nodes = Object.values(graph.nodes);
const labels = new Map(nodes.map(node => [node.id, node.label]));
const dialogMethods = {
  showModal: Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal"),
  close: Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "close"),
};

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: { configurable: true, value(this: HTMLDialogElement) { this.setAttribute("open", ""); } },
    close: { configurable: true, value(this: HTMLDialogElement) { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); } },
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  for (const [method, descriptor] of Object.entries(dialogMethods)) {
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, method, descriptor);
    else Reflect.deleteProperty(HTMLDialogElement.prototype, method);
  }
});

function expectEveryNode(locale = "fi") {
  const cards = screen.getAllByTestId("causal-node");
  expect(cards).toHaveLength(nodes.length);
  expect(new Set(cards.map(card => card.dataset.nodeId))).toEqual(new Set(nodes.map(node => node.id)));
  for (const node of nodes) {
    const card = cards.find(item => item.dataset.nodeId === node.id)!;
    expect(card).toHaveRole("button");
    expect(card).toHaveTextContent((node.label as Record<string, string>)[locale] ?? node.label.en);
  }
}

function nodeButton(id: string) {
  return screen.getAllByTestId("causal-node").find(card => card.dataset.nodeId === id)!;
}

describe("BermCausalDiagram", () => {
  it("preserves every canonical node and its full Finnish label in the default graph", () => {
    render(<BermCausalDiagram />);
    expectEveryNode();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("exposes every directed edge in the connection list and returns to the complete graph", () => {
    render(<BermCausalDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "Kaikki yhteydet" }));
    const rows = screen.getAllByTestId("causal-edge-row");
    expect(rows).toHaveLength(graph.edges.length);
    for (const edge of graph.edges) {
      const from = labels.get(edge.from)!.fi;
      const to = labels.get(edge.to)!.fi;
      const row = rows.find(item => within(item).queryAllByText(from, { exact: true }).length > 0 && within(item).queryAllByText(to, { exact: true }).length > 0);
      expect(row, `${edge.id}: ${edge.from} → ${edge.to}`).toBeDefined();
      expect(row!.textContent!.indexOf(from)).toBeLessThan(row!.textContent!.lastIndexOf(to));
    }
    fireEvent.click(screen.getByRole("button", { name: "Kaavio" }));
    expectEveryNode();
  });

  it("opens full node details, follows a connected node and closes the dialog", () => {
    render(<BermCausalDiagram />);
    const startId = "A_VGCC_ROS";
    const connectedId = graph.edges.find(edge => edge.from === startId && edge.to !== startId)!.to;
    fireEvent.click(nodeButton(startId));
    const dialog = screen.getByRole("dialog", { name: labels.get(startId)!.fi });
    expect(within(dialog).getByRole("heading", { name: `Tuloyhteydet (${graph.edges.filter(edge => edge.to === startId).length})` })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: `Lähtöyhteydet (${graph.edges.filter(edge => edge.from === startId).length})` })).toBeInTheDocument();
    fireEvent.click(within(dialog).getAllByRole("button", { name: `→ ${labels.get(connectedId)!.fi}` })[0]);
    const connectedDialog = screen.getByRole("dialog", { name: labels.get(connectedId)!.fi });
    fireEvent.click(within(connectedDialog).getByRole("button", { name: "Sulje tiedot" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expectEveryNode();
  });

  it("highlights and resets the calcium–redox route while preserving the complete node set", () => {
    render(<BermCausalDiagram />);
    const route = screen.getByRole("button", { name: "Kalsium, redox ja hormonituotanto" });
    fireEvent.click(route);
    expect(route).toHaveAttribute("aria-pressed", "true");
    expectEveryNode();
    // The highlighted physiological route must remain connected to demographic closure.
    for (const id of ["MALE_STEROIDOGENESIS", "MALE_SPERM", "COUPLE_FECUNDABILITY", "ASFR", "TFR"]) {
      expect(nodeButton(id)).toHaveAttribute("data-highlighted", "true");
    }
    fireEvent.click(screen.getByRole("button", { name: "Kaikki yhteydet" }));
    for (const [from, to] of [["MALE_STEROIDOGENESIS", "MALE_SPERM"], ["MALE_SPERM", "COUPLE_FECUNDABILITY"], ["COUPLE_FECUNDABILITY", "ASFR"], ["ASFR", "TFR"]]) {
      const row = screen.getAllByTestId("causal-edge-row").find(item =>
        within(item).queryByRole("button", { name: labels.get(from)!.fi }) &&
        within(item).queryByRole("button", { name: labels.get(to)!.fi }));
      expect(row, `${from} → ${to}`).toHaveAttribute("data-highlighted", "true");
    }
    fireEvent.click(screen.getByRole("button", { name: "Kaavio" }));
    fireEvent.click(screen.getByRole("button", { name: "Nollaa korostus" }));
    expect(route).toHaveAttribute("aria-pressed", "false");
    expectEveryNode();
  });

  it("selects a node’s connections without filtering out other nodes and restores the default selection", () => {
    render(<BermCausalDiagram />);
    const select = screen.getByRole("combobox", { name: "Korosta solmun yhteydet" });
    const initialValue = (select as HTMLSelectElement).value;
    fireEvent.change(select, { target: { value: "MALE_STEROIDOGENESIS" } });
    expect(select).toHaveValue("MALE_STEROIDOGENESIS");
    expectEveryNode();
    fireEvent.click(screen.getByRole("button", { name: "Nollaa korostus" }));
    expect(select).toHaveValue(initialValue);
    expectEveryNode();
  });

  it("preserves available canonical translations and announces English fallback in the French interface", () => {
    const view = render(<BermCausalDiagram locale="en" />);
    expectEveryNode("en");
    expect(screen.getByRole("button", { name: "All connections" })).toBeInTheDocument();
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    view.rerender(<BermCausalDiagram locale="fr" />);
    expectEveryNode("fr");
    expect(screen.getByRole("button", { name: "Toutes les connexions" })).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent(/anglais/i);
  });
});
