import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import exportData from "@/data/intervention-scenarios.json";
import { InterventionModels } from "../InterventionModels";
import { INTERVENTION_IDS, parseInterventionScenarios, traceValue } from "@/lib/interventions";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Public model export", () => {
  it("covers all profiles with valid synthetic four-arm contrasts", () => {
    const data = parseInterventionScenarios(exportData);
    expect([...new Set(data.scenarios.map(s => s.profile_id))].sort()).toEqual([...INTERVENTION_IDS].sort());
    for (const scenario of data.scenarios) for (const endpoint of scenario.highlight_endpoints) {
      const key = data.metadata.observable_trace_keys[endpoint];
      if (key) for (const arm of scenario.result.arms) expect(arm.trace.every(point => traceValue(point, key) !== undefined), `${scenario.id}: ${endpoint}`).toBe(true);
    }
  });
  it("treats channel names containing dots as map keys", () => {
    expect(traceValue({ channel_currents: { "CaV1.2": 3 } }, "channel_currents.CaV1.2")).toBe(3);
  });
  it("rejects nonfinite, missing, mislabeled or inconsistent scenario numbers", () => {
    const edits = [
      (x: typeof exportData) => { x.metadata.input_origin = "study estimates"; },
      (x: typeof exportData) => { x.scenarios[0].result.arms.pop(); },
      (x: typeof exportData) => { x.scenarios[0].result.arms[0].observables.bulk_ca_peak.value = NaN; },
      (x: typeof exportData) => { x.scenarios[0].result.contrasts[0].interaction += 1; },
    ];
    for (const edit of edits) { const copy = structuredClone(exportData); edit(copy); expect(() => parseInterventionScenarios(copy)).toThrow(); }
  });
});
describe("Lazy numerical exploration", () => {
  it("loads only on request, explores all profiles and retains one download across selection", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => exportData });
    vi.stubGlobal("fetch", fetcher);
    const { rerender } = render(<InterventionModels locale="fi" profileId="mt2_brake" />);
    expect(fetcher).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Avaa laskentaesimerkit" }));
    await screen.findByTestId("intervention-model");
    expect(screen.getByRole("img")).toHaveAccessibleName(/Ca-nousu/);
    expect(screen.getByTestId("intervention-model-contrast")).toHaveTextContent("Synteettinen interaktiokontrasti");
    for (const id of INTERVENTION_IDS) {
      rerender(<InterventionModels locale="fi" profileId={id} />);
      const select = screen.getByRole("combobox", { name: "Valitse laskentaesimerkki" });
      for (const option of within(select).getAllByRole("option")) {
        fireEvent.change(select, { target: { value: option.getAttribute("value") } });
        expect(screen.getByTestId("intervention-model")).toHaveTextContent("Synteettiset syötteet ja kertoimet");
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByTestId("intervention-model-contrast")).toBeInTheDocument();
      }
    }
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("offers a retry when download or schema validation fails", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true, json: async () => exportData });
    vi.stubGlobal("fetch", fetcher);
    render(<InterventionModels locale="en" profileId="channel_selectivity" />);
    fireEvent.click(screen.getByRole("button", { name: "Open model examples" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not be loaded or verified");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await screen.findByTestId("intervention-model");
    fireEvent.change(screen.getByRole("combobox", { name: "Choose an observable" }), { target: { value: "current:CaV1.2" } });
    expect(screen.getByRole("img")).toHaveAccessibleName(/L-channel influx/);
    expect(screen.getByRole("link", { name: /Download protocols/ })).toHaveAttribute("href", "/data/intervention-scenarios.json");
  });
});
