import graphJson from "@/data/causal-graph.json";
import type {
  CausalGraph,
  CausalGraphEdge,
  CausalGraphNode,
} from "@/lib/claims/types";
import type { ChainEdge, ChainNode, EpistemicLevel } from "@/lib/types";

const GRAPH = graphJson as CausalGraph;

const LEVEL_TITLES: Record<string, Record<number, string>> = {
  en: {
    1: "Measurement and proxy inputs",
    2: "Open L2 coupling bridge",
    3: "Mechanisms",
    4: "Barrier states",
    5: "Reproductive states",
    6: "Couple, ecology and demographic inputs",
    7: "Age-specific fertility",
    8: "TFR endpoint",
  },
  fi: {
    1: "Mittaus- ja proxysyötteet",
    2: "Avoin L2-kytkentäsilta",
    3: "Mekanismit",
    4: "Estetilat",
    5: "Lisääntymistilat",
    6: "Pari-, ekologia- ja demografiset syötteet",
    7: "Ikäkohtainen hedelmällisyys",
    8: "TFR-päätepiste",
  },
};

function levelByNode(): Map<string, number> {
  const result = new Map<string, number>();
  for (const group of Object.values(GRAPH.ui_groups)) {
    for (const nodeId of group.contains) result.set(nodeId, group.ui_level + 1);
  }
  return result;
}

function epistemicLevel(node: CausalGraphNode): EpistemicLevel {
  if (node.calibration_status === "observed_wpp_anchor") return "E";
  if (node.calibration_status === "structural_only") return "M";
  if (node.calibration_status === "requires_external_measurement") return "C";
  return "L*";
}

function mechanism(node: CausalGraphNode, locale: "en" | "fi"): string {
  const status = node.calibration_status.replaceAll("_", " ");
  if (node.id === "BERM_L2_BRIDGE") {
    return locale === "fi"
      ? "Geometriasta tai mittauksesta biologiseen havaittavaan johtavaa operaattoria ei ole vielä johdettu. Jatkohaarat ovat ehdollisia BERM-propositioita tai muualta tuotua biologiaa."
      : "No operator from geometry or measurement to a biological observable has yet been derived. Downstream branches are conditional BERM propositions or imported biology.";
  }
  return locale === "fi"
    ? `Kanoninen BERM-solmu. Kalibrointitila: ${status}. Ennusterooli: ${node.prediction_role}.`
    : `Canonical BERM node. Calibration status: ${status}. Prediction role: ${node.prediction_role}.`;
}

function edgeLabel(edge: CausalGraphEdge, locale: "en" | "fi"): string {
  if (edge.kind === "inference_input") return locale === "fi" ? "päättelysyöte" : "inference input";
  if (edge.kind === "proposed_bridge") return locale === "fi" ? "ehdotettu kytkentä (avoin)" : "proposed coupling (open)";
  return locale === "fi" ? "BERM-kausaalireuna" : "BERM causal edge";
}

const levels = levelByNode();

function nodeView(node: CausalGraphNode): ChainNode {
  const en = node.label.en ?? node.id;
  const fi = node.label.fi ?? en;
  return {
    id: node.id,
    level: levels.get(node.id) ?? 1,
    label: fi,
    label_en: en,
    sublabel: node.calibration_status.replaceAll("_", " "),
    sublabel_en: node.calibration_status.replaceAll("_", " "),
    epistemicLevel: epistemicLevel(node),
    title: fi,
    title_en: en,
    mechanism: mechanism(node, "fi"),
    mechanism_en: mechanism(node, "en"),
    quantitative:
      node.id === "BERM_L2_BRIDGE"
        ? "K_L2 : geometria / mittaus → biologinen havaittava  [AVOIN]"
        : undefined,
    quantitative_en:
      node.id === "BERM_L2_BRIDGE"
        ? "K_L2 : geometry / measurement → biological observable  [OPEN]"
        : undefined,
    keyReferences: [],
    falsificationCondition:
      node.id === "BERM_L2_BRIDGE"
        ? "Ehdotettu operaattori on hylättävä tai korjattava, jos kohdistettu data ei vastaa sen esirekisteröityjä ennusteita."
        : undefined,
    falsificationCondition_en:
      node.id === "BERM_L2_BRIDGE"
        ? "Reject or revise a proposed operator when matched data fail its preregistered predictions."
        : undefined,
  };
}

export const CANONICAL_CAUSAL_NODES: ChainNode[] = Object.values(GRAPH.nodes).map(nodeView);

export const CANONICAL_CAUSAL_EDGES: ChainEdge[] = GRAPH.edges.map((edge) => ({
  from: edge.from,
  to: edge.to,
  label: edgeLabel(edge, "fi"),
  label_en: edgeLabel(edge, "en"),
  epistemicLevel: edge.kind === "causal_model" ? "M" : "L*",
  priority: edge.kind === "causal_model" ? "secondary" : "primary",
}));

export function getCanonicalLevelTitle(level: number, locale: string): string {
  const language = locale === "fi" ? "fi" : "en";
  return LEVEL_TITLES[language][level] ?? `Level ${level}`;
}

export const CANONICAL_CAUSAL_GRAPH_VERSION = GRAPH.version;
