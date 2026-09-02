import { describe, expect, it } from "vitest";
import graph from "@/data/causal-graph.json";
import {
  EPISTEMIC_LEVELS,
  EVIDENCE_LEVEL_LABELS,
  FIELDSTATE_EVIDENCE,
  LEGACY_EVIDENCE_CATALOGUE,
  STATUS_LABELS,
  causalNodeLabels,
} from "@/lib/evidence";

// Cross-file integrity of the two evidence registries kept in lib/ against
// the causal graph and the label vocabularies the /evidence page renders.
// The third registry (claims.json evidence_relations) is covered by
// claim-registry.test.ts. See docs/evidence-registries.md.

const graphNodeIds = new Set(Object.keys(graph.nodes));
const levelVocabulary = new Set(Object.keys(EPISTEMIC_LEVELS));

describe("evidence registries", () => {
  it("bounded records attach only to causal-graph nodes", () => {
    for (const record of FIELDSTATE_EVIDENCE) {
      for (const nodeId of record.causalNodes) {
        expect(graphNodeIds.has(nodeId), `${record.id}: ${nodeId}`).toBe(true);
      }
    }
  });

  it("legacy records attach only to causal-graph nodes", () => {
    for (const record of LEGACY_EVIDENCE_CATALOGUE) {
      for (const nodeId of record.causalNodes) {
        expect(graphNodeIds.has(nodeId), `${record.id}: ${nodeId}`).toBe(true);
      }
    }
  });

  it("legacy levels stay inside EPISTEMIC_LEVELS and carry labels", () => {
    for (const record of LEGACY_EVIDENCE_CATALOGUE) {
      expect(levelVocabulary.has(record.level), `${record.id}: ${record.level}`).toBe(true);
      expect(EVIDENCE_LEVEL_LABELS[record.level]?.fi, `${record.id}: ${record.level}`).toBeTruthy();
    }
  });

  it("legacy statuses carry en/fi labels", () => {
    for (const record of LEGACY_EVIDENCE_CATALOGUE) {
      expect(STATUS_LABELS[record.status]?.en, `${record.id}: ${record.status}`).toBeTruthy();
      expect(STATUS_LABELS[record.status]?.fi, `${record.id}: ${record.status}`).toBeTruthy();
    }
  });

  it("every causal-graph node has a display label", () => {
    const ids = [...graphNodeIds];
    for (const locale of ["en", "fi"]) {
      const labels = causalNodeLabels(ids, locale);
      labels.forEach((label, i) => {
        expect(label, `${ids[i]} (${locale})`).not.toBe("Unmapped registered node");
      });
    }
  });

  it("legacy ids are unique", () => {
    const ids = LEGACY_EVIDENCE_CATALOGUE.map((record) => record.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
