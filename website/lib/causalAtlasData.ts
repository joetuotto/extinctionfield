import {
  NODES,
  EDGES,
  LEVEL_LABELS,
  type CausalMapNode,
  type CausalMapEdge,
  type EpistemicLevel,
  type Locale,
  type BilingualText,
  type NodeDetail,
  type LocalizedDetail,
} from "./causalMapData";
import { MAP_EPISTEMIC_COLORS, MAP_EPISTEMIC_LABELS } from "./epistemicConstants";

export { NODES, EDGES, LEVEL_LABELS, MAP_EPISTEMIC_COLORS as EVIDENCE_COLORS, MAP_EPISTEMIC_LABELS as EVIDENCE_LABELS };
export type { CausalMapNode, CausalMapEdge, EpistemicLevel, Locale, BilingualText, NodeDetail, LocalizedDetail };

// ── Helpers for bilingual access ──

export function t(text: BilingualText, lang: Locale): string {
  return text[lang];
}

export function localizedDetail(detail: NodeDetail | undefined, lang: Locale): LocalizedDetail | undefined {
  if (!detail) return undefined;
  return detail[lang];
}

// ── Stage types ──

export type Stage = "sources" | "modulation" | "mechanisms" | "tissue" | "disease" | "demographic" | "ecology";

export const LEVEL_TO_STAGE: Record<number, Stage> = {
  [-1]: "sources", 0: "sources", 1: "modulation", 2: "mechanisms",
  3: "tissue", 4: "disease", 5: "demographic", 6: "ecology",
};

// ── Stage band visual config ──

export interface StageBand {
  id: Stage;
  label: BilingualText;
  color: string;
  accent: string;
}

export const STAGE_BANDS: StageBand[] = [
  { id: "sources", label: { en: "EMF Sources", fi: "EMF-lähteet" }, color: "rgba(14,165,233,0.07)", accent: "#0EA5E9" },
  { id: "modulation", label: { en: "Modulation", fi: "Modulaatio" }, color: "rgba(139,92,246,0.07)", accent: "#8B5CF6" },
  { id: "mechanisms", label: { en: "Mechanisms", fi: "Mekanismit" }, color: "rgba(59,130,246,0.07)", accent: "#3B82F6" },
  { id: "tissue", label: { en: "Tissue Effects", fi: "Kudosvaikutukset" }, color: "rgba(245,158,11,0.07)", accent: "#F59E0B" },
  { id: "disease", label: { en: "Disease Cascade", fi: "Tautikaskadi" }, color: "rgba(239,68,68,0.07)", accent: "#EF4444" },
  { id: "demographic", label: { en: "Demographics", fi: "Demografiset" }, color: "rgba(244,63,94,0.07)", accent: "#F43F5E" },
];

export const ECOLOGY_BAND: StageBand = {
  id: "ecology",
  label: { en: "Ecological Impact", fi: "Ekologinen vaikutus" },
  color: "rgba(34,197,94,0.07)",
  accent: "#22C55E",
};

// ── All stages for UI ──

export const ALL_STAGES: StageBand[] = [...STAGE_BANDS, ECOLOGY_BAND];

// ── Edge relation types ──

export type RelationType = "causal" | "modulates" | "differential";

const SPECIAL_RELATIONS: Record<string, RelationType> = {
  "mod_geometry->mod_ion": "modulates",
  "eco_bee->eco_varroa": "differential",
};

export function getEdgeRelation(from: string, to: string): RelationType {
  return SPECIAL_RELATIONS[`${from}->${to}`] ?? "causal";
}

// ── Layout engine ──

const NODE_W = 170;
const NODE_H = 56;
const NODE_GAP = 12;
const STAGE_SPACING = 240;

const STAGE_ORDER: Stage[] = ["sources", "modulation", "mechanisms", "tissue", "disease", "demographic"];

function stageX(stage: Stage): number {
  const idx = STAGE_ORDER.indexOf(stage);
  return idx >= 0 ? 100 + idx * STAGE_SPACING : 100 + STAGE_SPACING;
}

const NODE_ORDER: Record<Stage, string[]> = {
  sources: ["electrification_boundary", "ch_static", "ch_elf", "ch_rf", "ch_if", "northern_package"],
  modulation: ["mod_bioelectric", "mod_mito", "mod_ion", "mod_geometry", "mod_dc", "mod_pineal", "mod_vagus", "mod_division", "mod_cyb5b", "mod_fad_riboflavin", "mod_membrane_omega", "mod_ampk_fasting"],
  mechanisms: ["mech_dep_quadratic", "mech_vgcc_ros", "mech_ifo_linear", "mech_mitotic_spindle", "mech_cry_melatonin", "mech_nav_plasticity", "mech_vagal_antiinflam", "mech_gpcr", "mech_cyb5b_ca", "mech_vgcc_genotype", "mech_ionic_hierarchy", "mech_skin_bioelectric", "mech_led_confound", "mech_hospital_emf", "mech_alzheimer_calcium", "mech_adhd_calibration", "mech_melatonin_fertility", "mech_catsper_nav", "mech_beta_katp", "mech_window_effect", "epi_kaiser_series", "mech_ttype_bifurcation", "mech_trpc1_calcium", "mech_mitochondrial_ros", "mech_autonomic_hrv"],
  tissue: ["tissue_melatonin", "tissue_cortisol", "tissue_bbb", "tissue_insulin", "tissue_vagal_tone", "tissue_gut", "tissue_sperm", "tissue_ovarian", "tissue_testosterone", "tissue_nk_cells", "endo_pituitary_hub", "tissue_btb", "solar_geomag"],
  disease: ["disease_sleep", "disease_depression", "disease_adhd", "disease_metabolic", "disease_autoimmune", "disease_fertility", "disease_cancer"],
  demographic: ["demo_behavior", "demo_biocap", "demo_asfr", "demo_tfr"],
  ecology: ["eco_insect", "eco_bird", "eco_bat", "eco_amphibian", "eco_bee", "eco_tick", "eco_varroa", "eco_pollination", "ecosystem_cascade"],
};

export { NODE_ORDER };

function calcRefHeight(): number {
  let maxH = 720;
  for (const stage of STAGE_ORDER) {
    const n = NODE_ORDER[stage].length;
    const h = n * NODE_H + (n - 1) * NODE_GAP;
    if (h > maxH) maxH = h;
  }
  return maxH + 80;
}

const REF_HEIGHT = calcRefHeight();

export function computeLayout(): Record<string, { x: number; y: number }> {
  const pos: Record<string, { x: number; y: number }> = {};

  for (const stage of STAGE_ORDER) {
    const ids = NODE_ORDER[stage];
    const totalH = ids.length * NODE_H + (ids.length - 1) * NODE_GAP;
    const startY = Math.max(0, (REF_HEIGHT - totalH) / 2);
    const sx = stageX(stage);
    ids.forEach((id, i) => {
      pos[id] = { x: sx, y: startY + i * (NODE_H + NODE_GAP) };
    });
  }

  const ECO_Y = REF_HEIGHT + 60;
  const ecoCol1 = ["eco_insect", "eco_bird", "eco_bat", "eco_amphibian", "eco_bee", "eco_tick"];
  ecoCol1.forEach((id, i) => {
    pos[id] = { x: stageX("modulation"), y: ECO_Y + i * (NODE_H + NODE_GAP) };
  });
  pos["eco_varroa"] = { x: stageX("mechanisms"), y: ECO_Y + 4 * (NODE_H + NODE_GAP) };
  pos["eco_pollination"] = { x: stageX("tissue"), y: ECO_Y + 2 * (NODE_H + NODE_GAP) };
  pos["ecosystem_cascade"] = { x: stageX("tissue"), y: ECO_Y + 4 * (NODE_H + NODE_GAP) };

  return pos;
}

export interface BandRect {
  stage: Stage;
  x: number;
  y: number;
  width: number;
  height: number;
  band: StageBand;
}

export function computeBands(): BandRect[] {
  const PAD = 28;
  const W = NODE_W + PAD * 2;
  const rects: BandRect[] = STAGE_BANDS.map((b) => ({
    stage: b.id,
    x: stageX(b.id) - PAD,
    y: -60,
    width: W,
    height: REF_HEIGHT + 120,
    band: b,
  }));
  rects.push({
    stage: "ecology",
    x: stageX("modulation") - PAD,
    y: REF_HEIGHT + 10,
    width: stageX("tissue") - stageX("modulation") + W,
    height: 6 * (NODE_H + NODE_GAP) + 60,
    band: ECOLOGY_BAND,
  });
  return rects;
}

export const NODE_DIMENSIONS = { w: NODE_W, h: NODE_H };

// ── Guided scenes ──

export interface GuidedScene {
  id: string;
  title: BilingualText;
  description: BilingualText;
  nodes: string[];
  edges: string[];
}

export const GUIDED_SCENES: GuidedScene[] = [
  {
    id: "overview",
    title: { en: "The BERM Model", fi: "BERM-malli" },
    description: {
      en: "The Bio-Electromagnetic Reproductive Model proposes testable multiscale routes from environmental EMF channels through biological systems to population and ecological outcomes. The L2 coupling from physical input to biological observable remains open.",
      fi: "Bio-elektromagneettinen lisääntymismalli ehdottaa testattavia monitasoreittejä ympäristön EMF-kanavista biologisten järjestelmien kautta populaatio- ja ekologisiin tuloksiin. Fyysisestä syötteestä biologiseen havaittavaan johtava L2-kytkentä on avoin.",
    },
    nodes: [],
    edges: [],
  },
  {
    id: "sources",
    title: { en: "EMF Channels", fi: "EMF-kanavat" },
    description: {
      en: "BERM distinguishes four physical input classes: Static/DC, ELF (power grid), IF (LED lighting), and RF (wireless). Their candidate biological routes require link-specific evidence and calibration.",
      fi: "BERM erottaa neljä fyysistä syöteluokkaa: staattinen/DC, ELF (sähköverkko), IF (LED-valaistus) ja RF (langaton). Niiden ehdotetut biologiset reitit vaativat linkkikohtaisen näytön ja kalibroinnin.",
    },
    nodes: ["ch_static", "ch_elf", "ch_if", "ch_rf"],
    edges: [],
  },
  {
    id: "fertility",
    title: { en: "The Fertility Pathway", fi: "Hedelmällisyyspolku" },
    description: {
      en: "BERM proposes the conditional route EMF → ion-channel/VGCC modulation → calcium/ROS state → sperm, ovulation and androgen function → couple capacity → ASFR → TFR. The first L2 coupling is open and every later arrow remains separately testable.",
      fi: "BERM ehdottaa ehdollista reittiä EMF → ionikanava-/VGCC-modulaatio → kalsium-/ROS-tila → siittiö-, ovulaatio- ja androgeenitoiminta → parikapasiteetti → ASFR → TFR. Ensimmäinen L2-kytkentä on avoin ja jokainen myöhempi nuoli erikseen testattava.",
    },
    nodes: ["ch_elf", "ch_if", "mod_ion", "mech_vgcc_ros", "mech_ifo_linear", "tissue_sperm", "tissue_ovarian", "tissue_testosterone", "disease_fertility", "demo_biocap", "demo_asfr", "demo_tfr"],
    edges: ["ch_elf->mod_ion", "ch_if->mod_ion", "mod_ion->mech_vgcc_ros", "mod_ion->mech_ifo_linear", "mech_vgcc_ros->tissue_sperm", "mech_vgcc_ros->tissue_ovarian", "mech_vgcc_ros->tissue_testosterone", "mech_ifo_linear->tissue_sperm", "tissue_sperm->disease_fertility", "tissue_ovarian->disease_fertility", "tissue_testosterone->disease_fertility", "disease_fertility->demo_biocap", "demo_biocap->demo_asfr", "demo_asfr->demo_tfr"],
  },
  {
    id: "sleep",
    title: { en: "Sleep–Depression Cascade", fi: "Uni–masennuskaskadi" },
    description: {
      en: "BERM proposes an RF-sensitive radical-pair/cryptochrome → melatonin/circadian → sleep and depression route. RPM biology is imported evidence, not a result derived from Lindgren geometry, and the exposure-to-response bridge remains open.",
      fi: "BERM ehdottaa RF-herkkää radikaalipari-/kryptokromi → melatoniini-/vuorokausirytmi → uni- ja masennusreittiä. RPM-biologia on muualta tuotua näyttöä, ei Lindgrenin geometriasta johdettu tulos, ja altistuksesta vasteeseen johtava silta on avoin.",
    },
    nodes: ["ch_rf", "mod_pineal", "mech_cry_melatonin", "tissue_melatonin", "tissue_cortisol", "disease_sleep", "disease_depression"],
    edges: ["ch_rf->mod_pineal", "mod_pineal->mech_cry_melatonin", "mech_cry_melatonin->tissue_melatonin", "mech_cry_melatonin->tissue_cortisol", "tissue_melatonin->disease_sleep", "tissue_cortisol->disease_sleep", "tissue_cortisol->disease_depression"],
  },
  {
    id: "ecology",
    title: { en: "The Ecological Mirror", fi: "Ekologinen peili" },
    description: {
      en: "BERM extends its candidate routes to wildlife endpoints such as insect abundance, bird navigation and bee-colony function, then to pollination. These are testable ecological hypotheses with species- and endpoint-specific evidence requirements.",
      fi: "BERM ulottaa ehdokasreitit luonnonvaraisiin päätepisteisiin kuten hyönteismäärään, lintujen navigaatioon ja mehiläisyhdyskuntien toimintaan sekä edelleen pölytykseen. Nämä ovat testattavia ekologisia hypoteeseja, joilla on laji- ja päätepistekohtaiset näyttövaatimukset.",
    },
    nodes: ["ch_rf", "ch_if", "ch_elf", "eco_insect", "eco_bird", "eco_bat", "eco_bee", "eco_varroa", "eco_pollination"],
    edges: ["ch_rf->eco_insect", "ch_rf->eco_bird", "ch_rf->eco_bat", "ch_if->eco_insect", "ch_if->eco_bee", "ch_elf->eco_bee", "eco_bee->eco_varroa", "eco_bee->eco_pollination", "eco_insect->eco_pollination"],
  },
  {
    id: "immune",
    title: { en: "The Immune Pathway", fi: "Immunologinen polku" },
    description: {
      en: "BERM proposes an ELF-sensitive autonomic/vagal route to inflammation, gut-barrier state and autoimmune risk, alongside an NK-cell branch. These arrows are candidate mechanisms, not established consequences of FieldState or Lindgren geometry.",
      fi: "BERM ehdottaa ELF-herkkää autonomista/vagaalista reittiä tulehdukseen, suolistoesteen tilaan ja autoimmuuniriskiin sekä rinnakkaista NK-soluhaaraa. Nuolet ovat ehdokasmekanismeja, eivät FieldStaten tai Lindgrenin geometrian osoitettuja seurauksia.",
    },
    nodes: ["ch_elf", "mod_vagus", "mech_vagal_antiinflam", "tissue_vagal_tone", "tissue_gut", "tissue_nk_cells", "disease_autoimmune", "disease_cancer"],
    edges: ["ch_elf->mod_vagus", "mod_vagus->mech_vagal_antiinflam", "mech_vagal_antiinflam->tissue_vagal_tone", "mech_vagal_antiinflam->tissue_gut", "tissue_vagal_tone->disease_autoimmune", "tissue_gut->disease_autoimmune", "tissue_nk_cells->disease_cancer"],
  },
];

// ── Mobile stepper paths ──

export interface StepperPath {
  label: BilingualText;
  ids: readonly string[];
}

export const STEPPER_PATHS: Record<string, StepperPath> = {
  main: {
    label: { en: "Fertility pathway", fi: "Hedelmällisyyspolku" },
    ids: ["ch_elf", "mod_ion", "mech_vgcc_ros", "tissue_sperm", "disease_fertility", "demo_biocap", "demo_tfr"],
  },
  sleep: {
    label: { en: "Sleep cascade", fi: "Unikaskadi" },
    ids: ["ch_rf", "mod_pineal", "mech_cry_melatonin", "tissue_melatonin", "disease_sleep", "disease_depression"],
  },
  ecology: {
    label: { en: "Ecological mirror", fi: "Ekologinen peili" },
    ids: ["ch_rf", "eco_insect", "eco_bee", "eco_pollination"],
  },
};

export type StepperPathKey = keyof typeof STEPPER_PATHS;
