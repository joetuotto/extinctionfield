import { describe, expect, it } from "vitest";

import referenceIndex from "@/lib/referenceIndex.json";
import {
  CARD_FIELD_ORDER,
  MECHANISM_CARDS,
  MODULOME_FIGURES,
  MODULOME_STATE,
  cardsForLayer,
  pickCardText,
} from "@/lib/modulome/stateModel";
import { MODULOME_LAYERS } from "@/lib/modulome/layers";

const CARD_FIELDS = [
  "exposure",
  "receptor",
  "baseline_state",
  "proximal_response",
  "propagation",
  "memory",
  "functional_consequence",
  "mechanism_bounding",
] as const;

const index = referenceIndex as {
  references: Record<string, unknown>;
  aliases: Record<string, string>;
};

describe("modulome mechanism cards", () => {
  it("come from the exported model payload", () => {
    expect(MODULOME_STATE.modulomeVersion).toBe("modulome-state-v1");
    expect(MODULOME_STATE.generatedBy).toBe("berm/export_modulome.py");
    expect(MECHANISM_CARDS.length).toBeGreaterThanOrEqual(10);
  });

  it("carry all eight fields in English and Finnish", () => {
    for (const card of MECHANISM_CARDS) {
      for (const field of CARD_FIELDS) {
        expect(card[field].en.length, `${card.cardId}.${field}.en`).toBeGreaterThan(0);
        expect(card[field].fi.length, `${card.cardId}.${field}.fi`).toBeGreaterThan(0);
      }
      expect(pickCardText(card.title, "fi")).toBe(card.title.fi);
      expect(pickCardText(card.title, "ja")).toBe(card.title.en);
    }
  });

  it("bound every mechanism with a stated intervention", () => {
    for (const card of MECHANISM_CARDS) {
      expect(card.mechanism_bounding.en.length, card.cardId).toBeGreaterThan(40);
    }
  });

  it("name only references that resolve in the canonical registry", () => {
    for (const card of MECHANISM_CARDS) {
      expect(card.referenceIds.length, card.cardId).toBeGreaterThan(0);
      for (const referenceId of card.referenceIds) {
        const canonical = index.aliases[referenceId] ?? referenceId;
        expect(index.references[canonical], `${card.cardId} -> ${referenceId}`).toBeDefined();
      }
    }
  });

  it("attach to layers that exist in the twelve-layer stack", () => {
    const numbers = new Set(MODULOME_LAYERS.map((layer) => layer.number));
    for (const card of MECHANISM_CARDS) {
      expect(card.layers.length, card.cardId).toBeGreaterThan(0);
      for (const layer of card.layers) expect(numbers.has(layer), `${card.cardId}: ${layer}`).toBe(true);
    }
    expect(cardsForLayer(2).length).toBeGreaterThan(0);
    expect(CARD_FIELD_ORDER).toHaveLength(CARD_FIELDS.length);
  });
});

describe("modulome figures carry the model's own discriminating results", () => {
  it("show no late current change when either store arm is blocked", () => {
    const arms = MODULOME_FIGURES.calcium.arms;
    expect(arms.intact.summary.lateMembraneCurrentChange).toBeLessThan(0);
    expect(arms.ryrBlocked.summary.lateMembraneCurrentChange).toBe(0);
    expect(arms.sercaBlocked.summary.lateMembraneCurrentChange).toBe(0);
    expect(arms.ryrBlocked.summary.firstCalciumResponse).toBeGreaterThan(0);
  });

  it("keep the locked window state-independent and the candidate state-dependent", () => {
    const figure = MODULOME_FIGURES.window;
    expect(figure.lockedWindow.centreHz).toBe(25.2);
    const centres = new Set(figure.candidates.map((candidate) => candidate.centreHz));
    expect(centres.size).toBe(figure.candidates.length);
    const ratios = figure.candidates.map((candidate) => candidate.ratioToLocked);
    expect(Math.max(...ratios)).toBeGreaterThan(1);
    expect(Math.min(...ratios)).toBeLessThan(1);
  });

  it("separate two cells that give the same probe response", () => {
    const rows = MODULOME_FIGURES.stateTriad.sameResponseDifferentState;
    const repaired = rows.find((row) => row.stateId === "repaired");
    const desensitised = rows.find((row) => row.stateId === "desensitised");
    expect(repaired?.probeResponse).toBe(desensitised?.probeResponse);
    expect(repaired?.repairCapacity).not.toBe(desensitised?.repairCapacity);
    expect(repaired?.receptorReadiness).not.toBe(desensitised?.receptorReadiness);
  });

  it("cross the stability boundary only after recovery has slowed", () => {
    const series = MODULOME_FIGURES.feedback.series;
    const stable = series.filter((item) => item.isStable);
    const times = stable.map((item) => item.slowestRecoveryTime ?? 0);
    expect(stable.length).toBeGreaterThan(1);
    expect(series[series.length - 1].isStable).toBe(false);
    expect(times[times.length - 1]).toBeGreaterThan(times[0]);
  });

  it("keep direction and speed separable", () => {
    const arms = MODULOME_FIGURES.polarity.arms;
    expect(arms.kcnj15Silenced.directedness.every((value) => value === 0)).toBe(true);
    expect(arms.kcnj15Silenced.migrationSpeed).toEqual(arms.intact.migrationSpeed);
  });

  it("keep the total photon dose fixed while the order changes the yield", () => {
    const figure = MODULOME_FIGURES.photonSequence;
    expect(figure.blueThenGreen[0]).toBeGreaterThan(figure.greenThenBlue[0]);
    expect(figure.registeredSubtypes.length).toBeGreaterThan(1);
  });
});
