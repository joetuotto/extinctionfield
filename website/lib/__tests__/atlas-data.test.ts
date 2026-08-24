import { describe, it, expect } from "vitest";
import {
  NODES,
  EDGES,
  EVIDENCE_COLORS,
  EVIDENCE_LABELS,
  LEVEL_TO_STAGE,
  STAGE_BANDS,
  ECOLOGY_BAND,
  ALL_STAGES,
  GUIDED_SCENES,
  STEPPER_PATHS,
  NODE_ORDER,
  computeLayout,
  computeBands,
  getEdgeRelation,
  t,
  localizedDetail,
  type EpistemicLevel,
  type Locale,
} from "../causalAtlasData";

describe("Bilingual data completeness", () => {
  it("every node has both EN and FI labels", () => {
    for (const node of NODES) {
      expect(node.label.en, `${node.id} missing EN label`).toBeTruthy();
      expect(node.label.fi, `${node.id} missing FI label`).toBeTruthy();
    }
  });

  it("every node with sublabel has both EN and FI sublabel", () => {
    for (const node of NODES) {
      if (node.sublabel) {
        expect(node.sublabel.en, `${node.id} missing EN sublabel`).toBeTruthy();
        expect(node.sublabel.fi, `${node.id} missing FI sublabel`).toBeTruthy();
      }
    }
  });

  it("every node with detail has both EN and FI localized detail", () => {
    for (const node of NODES) {
      if (node.detail) {
        expect(node.detail.en, `${node.id} missing EN detail`).toBeDefined();
        expect(node.detail.fi, `${node.id} missing FI detail`).toBeDefined();
        expect(node.detail.en.mechanism, `${node.id} missing EN mechanism`).toBeTruthy();
        expect(node.detail.fi.mechanism, `${node.id} missing FI mechanism`).toBeTruthy();
      }
    }
  });

  it("EN and FI labels are different (not just copied)", () => {
    let differenceCount = 0;
    for (const node of NODES) {
      if (node.label.en !== node.label.fi) differenceCount++;
    }
    expect(differenceCount).toBeGreaterThan(NODES.length * 0.5);
  });

  it("EN and FI mechanisms are different (not just copied)", () => {
    let differenceCount = 0;
    for (const node of NODES) {
      if (node.detail?.en.mechanism !== node.detail?.fi.mechanism) differenceCount++;
    }
    expect(differenceCount).toBeGreaterThan(0);
  });
});

describe("Node structure", () => {
  it("has 63 nodes", () => {
    expect(NODES.length).toBe(63);
  });

  it("every node has a unique id", () => {
    const ids = NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every node has a valid epistemic level", () => {
    const validLevels = Object.keys(EVIDENCE_COLORS);
    for (const node of NODES) {
      expect(validLevels, `${node.id} has invalid epistemic level: ${node.epistemicLevel}`).toContain(node.epistemicLevel);
    }
  });

  it("every node level maps to a stage", () => {
    for (const node of NODES) {
      expect(LEVEL_TO_STAGE[node.level], `${node.id} level ${node.level} has no stage mapping`).toBeDefined();
    }
  });

  it("every node with a link has a link starting with /", () => {
    for (const node of NODES) {
      if (node.detail?.link) {
        expect(node.detail.link, `${node.id} link doesn't start with /`).toMatch(/^\//);
      }
    }
  });
});

describe("Edge structure", () => {
  it("has edges", () => {
    expect(EDGES.length).toBeGreaterThan(0);
  });

  it("every edge references existing nodes", () => {
    const nodeIds = new Set(NODES.map((n) => n.id));
    for (const edge of EDGES) {
      expect(nodeIds.has(edge.from), `edge source ${edge.from} not found`).toBe(true);
      expect(nodeIds.has(edge.to), `edge target ${edge.to} not found`).toBe(true);
    }
  });

  it("no duplicate edges", () => {
    const keys = EDGES.map((e) => `${e.from}->${e.to}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("getEdgeRelation returns valid types", () => {
    const validTypes = ["causal", "modulates", "differential"];
    for (const edge of EDGES) {
      const rel = getEdgeRelation(edge.from, edge.to);
      expect(validTypes).toContain(rel);
    }
  });
});

describe("Layout engine", () => {
  it("computes positions for all nodes", () => {
    const positions = computeLayout();
    for (const node of NODES) {
      expect(positions[node.id], `${node.id} has no position`).toBeDefined();
      expect(positions[node.id].x).toBeTypeOf("number");
      expect(positions[node.id].y).toBeTypeOf("number");
    }
  });

  it("NODE_ORDER covers all nodes", () => {
    const ordered = Object.values(NODE_ORDER).flat();
    const nodeIds = NODES.map((n) => n.id);
    for (const id of nodeIds) {
      expect(ordered, `${id} not in NODE_ORDER`).toContain(id);
    }
  });

  it("computes stage bands", () => {
    const bands = computeBands();
    expect(bands.length).toBe(STAGE_BANDS.length + 1);
  });
});

describe("Stage configuration", () => {
  it("ALL_STAGES includes all stage bands plus ecology", () => {
    expect(ALL_STAGES.length).toBe(STAGE_BANDS.length + 1);
    expect(ALL_STAGES.at(-1)?.id).toBe("ecology");
  });

  it("every stage band has bilingual labels", () => {
    for (const band of ALL_STAGES) {
      expect(band.label.en, `${band.id} missing EN label`).toBeTruthy();
      expect(band.label.fi, `${band.id} missing FI label`).toBeTruthy();
    }
  });
});

describe("Guided scenes", () => {
  it("has scenes", () => {
    expect(GUIDED_SCENES.length).toBeGreaterThan(0);
  });

  it("every scene has bilingual title and description", () => {
    for (const scene of GUIDED_SCENES) {
      expect(scene.title.en, `${scene.id} missing EN title`).toBeTruthy();
      expect(scene.title.fi, `${scene.id} missing FI title`).toBeTruthy();
      expect(scene.description.en, `${scene.id} missing EN description`).toBeTruthy();
      expect(scene.description.fi, `${scene.id} missing FI description`).toBeTruthy();
    }
  });

  it("every scene node references an existing node", () => {
    const nodeIds = new Set(NODES.map((n) => n.id));
    for (const scene of GUIDED_SCENES) {
      for (const id of scene.nodes) {
        expect(nodeIds.has(id), `scene ${scene.id} references non-existent node: ${id}`).toBe(true);
      }
    }
  });

  it("every scene edge references valid edges", () => {
    const edgeKeys = new Set(EDGES.map((e) => `${e.from}->${e.to}`));
    for (const scene of GUIDED_SCENES) {
      for (const edgeKey of scene.edges) {
        expect(edgeKeys.has(edgeKey), `scene ${scene.id} references non-existent edge: ${edgeKey}`).toBe(true);
      }
    }
  });
});

describe("Stepper paths", () => {
  it("every path has bilingual labels", () => {
    for (const [key, path] of Object.entries(STEPPER_PATHS)) {
      expect(path.label.en, `${key} missing EN label`).toBeTruthy();
      expect(path.label.fi, `${key} missing FI label`).toBeTruthy();
    }
  });

  it("every path node references an existing node", () => {
    const nodeIds = new Set(NODES.map((n) => n.id));
    for (const [key, path] of Object.entries(STEPPER_PATHS)) {
      for (const id of path.ids) {
        expect(nodeIds.has(id), `path ${key} references non-existent node: ${id}`).toBe(true);
      }
    }
  });
});

describe("Helper functions", () => {
  it("t() returns correct locale", () => {
    const text = { en: "English", fi: "Suomi" };
    expect(t(text, "en")).toBe("English");
    expect(t(text, "fi")).toBe("Suomi");
  });

  it("localizedDetail() returns correct locale", () => {
    const detail = {
      en: { mechanism: "EN mechanism" },
      fi: { mechanism: "FI mekanismi" },
    };
    expect(localizedDetail(detail, "en")?.mechanism).toBe("EN mechanism");
    expect(localizedDetail(detail, "fi")?.mechanism).toBe("FI mekanismi");
  });

  it("localizedDetail() returns undefined for undefined input", () => {
    expect(localizedDetail(undefined, "en")).toBeUndefined();
  });
});

describe("Evidence labels", () => {
  it("has labels for both locales", () => {
    expect(EVIDENCE_LABELS.en).toBeDefined();
    expect(EVIDENCE_LABELS.fi).toBeDefined();
  });

  it("every epistemic level has a color", () => {
    for (const level of Object.keys(EVIDENCE_COLORS) as EpistemicLevel[]) {
      expect(EVIDENCE_COLORS[level]).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});
