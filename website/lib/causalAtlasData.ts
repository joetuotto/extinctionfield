import {
  NODES,
  EDGES,
  LEVEL_LABELS,
  type CausalMapNode,
  type CausalMapEdge,
  type EpistemicLevel,
} from "./causalMapData";
import { MAP_EPISTEMIC_COLORS, MAP_EPISTEMIC_LABELS } from "./epistemicConstants";

export { NODES, EDGES, LEVEL_LABELS, MAP_EPISTEMIC_COLORS as EVIDENCE_COLORS, MAP_EPISTEMIC_LABELS as EVIDENCE_LABELS };
export type { CausalMapNode, CausalMapEdge, EpistemicLevel };

// ── Stage types ──

export type Stage = "sources" | "modulation" | "mechanisms" | "tissue" | "disease" | "demographic" | "ecology";

export const LEVEL_TO_STAGE: Record<number, Stage> = {
  [-1]: "sources", 0: "sources", 1: "modulation", 2: "mechanisms",
  3: "tissue", 4: "disease", 5: "demographic", 6: "ecology",
};

// ── Stage band visual config ──

export interface StageBand {
  id: Stage;
  label: { en: string; fi: string };
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

// ── English labels ──

export const EN_LABELS: Record<string, { label: string; sublabel?: string }> = {
  ch_static: { label: "STATIC (0 Hz)", sublabel: "Polyester, triboelectric" },
  ch_elf: { label: "ELF (< 1 kHz)", sublabel: "Power grid, motors, EV" },
  ch_if: { label: "IF (1k–1M Hz)", sublabel: "LED lighting, HVAC, induction" },
  ch_rf: { label: "RF (> 1 MHz)", sublabel: "Mobile, Wi-Fi, BT, IoT" },
  mod_geometry: { label: "1. Geometric foundation", sublabel: "Lindgren χ(Ā) ≈ 1.0" },
  mod_ion: { label: "2. Ion channel network", sublabel: "3 Byr conserved" },
  mod_dc: { label: "3. DC control system", sublabel: "Becker 1985" },
  mod_bioelectric: { label: "4. Bioelectric code", sublabel: "Levin" },
  mod_pineal: { label: "5. Circadian clock", sublabel: "CRY, melatonin, SCN" },
  mod_vagus: { label: "6. Vagus axis", sublabel: "Anti-inflammatory reflex" },
  mod_division: { label: "7. Cell division", sublabel: "TTFields mechanism" },
  mod_mito: { label: "8. Mitochondrial", sublabel: "CCO, photobiomodulation" },
  mech_vgcc_ros: { label: "VGCC → Ca²⁺ → ROS" },
  mech_gpcr: { label: "GPCR-adenosine → cAMP" },
  mech_nav_plasticity: { label: "Nav → neuroplasticity" },
  mech_cry_melatonin: { label: "CRY/RPM → melatonin" },
  mech_vagal_antiinflam: { label: "Vagal anti-inflamm." },
  mech_mitotic_spindle: { label: "Mitotic spindle → aneuploidy" },
  mech_ifo_linear: { label: "IFO linear (10⁻⁵ V/m)" },
  mech_dep_quadratic: { label: "DEP quadratic (>100 V/m)" },
  tissue_sperm: { label: "Spermatogenesis ↓" },
  tissue_ovarian: { label: "Ovulation / oocyte quality ↓" },
  tissue_testosterone: { label: "Testosterone ↓" },
  tissue_melatonin: { label: "Melatonin ↓" },
  tissue_nk_cells: { label: "NK cells ↓ (−70%)" },
  tissue_insulin: { label: "Insulin sensitivity ↓" },
  tissue_cortisol: { label: "Cortisol ↑ (chronic)" },
  tissue_bbb: { label: "BBB permeability ↑" },
  tissue_gut: { label: "Gut epithelium ↓" },
  tissue_vagal_tone: { label: "Vagal tone ↓" },
  disease_sleep: { label: "1. Sleep disorders", sublabel: "Latency: months" },
  disease_depression: { label: "2. Depression", sublabel: "Latency: 1–3 years" },
  disease_adhd: { label: "3. ADHD / ASD", sublabel: "Latency: 2–5 years" },
  disease_metabolic: { label: "4. Metabolic syndrome", sublabel: "Latency: 3–8 years" },
  disease_autoimmune: { label: "5. Autoimmune diseases", sublabel: "Latency: 5–10 years" },
  disease_fertility: { label: "6. Infertility", sublabel: "Latency: 5–15 years" },
  disease_cancer: { label: "7. Young-onset cancer", sublabel: "Latency: 10–25 years" },
  demo_biocap: { label: "Biological capacity ↓" },
  demo_behavior: { label: "Reproductive motivation ↓" },
  demo_asfr: { label: "ASFR ↓ (age-specific)" },
  demo_tfr: { label: "TFR ↓ (total)", sublabel: "5.0 → 2.2 globally" },
  eco_insect: { label: "Insects ↓", sublabel: "−75% Krefeld" },
  eco_bird: { label: "Birds ↓", sublabel: "PECBMS" },
  eco_bat: { label: "Bats ↓", sublabel: "Lindecke 2026" },
  eco_amphibian: { label: "Amphibians ↓", sublabel: "Enigmatic declines" },
  eco_bee: { label: "Bees ↓", sublabel: "CCD, grooming↓" },
  eco_varroa: { label: "Varroa ← protected", sublabel: "Sclerotin, small size" },
  eco_tick: { label: "Ticks ← increasing?", sublabel: "Electrostatic contact↑" },
  eco_pollination: { label: "Pollination ↓", sublabel: "Ecosystem service" },
  electrification_boundary: { label: "Electrification boundary" },
  mod_cyb5b: { label: "9. Cyb5b EMF sensor" },
  mech_cyb5b_ca: { label: "Cyb5b → Ca²⁺ oscillations" },
  mech_vgcc_genotype: { label: "VGCC genotype × sensitivity" },
  mech_ionic_hierarchy: { label: "Ionic treatment hierarchy", sublabel: "Ca²⁺ convergence" },
  mech_skin_bioelectric: { label: "Dermal bioelectric system", sublabel: "TEP + piezo + VGCC" },
  mech_led_confound: { label: "LED IF-EMF confound", sublabel: "65 kHz–2 MHz driver" },
  mech_hospital_emf: { label: "Hospital EMF", sublabel: "PHS + modulome" },
  mech_alzheimer_calcium: { label: "Amyloid-calcium feedback", sublabel: "Ca²⁺ → Aβ → pores → Ca²⁺" },
  mech_adhd_calibration: { label: "ADHD calibration error", sublabel: "HCN/VGCC tuning → S/N ↓" },
  mech_melatonin_fertility: { label: "Melatonin bridge", sublabel: "Cascade 1 → cascade 6" },
  mech_beta_katp: { label: "β-cell K-ATP → insulin" },
  mech_window_effect: { label: "Window effect", sublabel: "Adey-Blackman 1976" },
  epi_kaiser_series: { label: "Kaiser Permanente series", sublabel: "Li 2002–2020, EMDEX" },
};

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
  sources: ["electrification_boundary", "ch_static", "ch_elf", "ch_rf", "ch_if"],
  modulation: ["mod_bioelectric", "mod_mito", "mod_ion", "mod_geometry", "mod_dc", "mod_pineal", "mod_vagus", "mod_division", "mod_cyb5b"],
  mechanisms: ["mech_dep_quadratic", "mech_vgcc_ros", "mech_ifo_linear", "mech_mitotic_spindle", "mech_cry_melatonin", "mech_nav_plasticity", "mech_vagal_antiinflam", "mech_gpcr", "mech_cyb5b_ca", "mech_vgcc_genotype", "mech_ionic_hierarchy", "mech_skin_bioelectric", "mech_led_confound", "mech_hospital_emf", "mech_alzheimer_calcium", "mech_adhd_calibration", "mech_melatonin_fertility", "mech_beta_katp", "mech_window_effect", "epi_kaiser_series"],
  tissue: ["tissue_melatonin", "tissue_cortisol", "tissue_bbb", "tissue_insulin", "tissue_vagal_tone", "tissue_gut", "tissue_sperm", "tissue_ovarian", "tissue_testosterone", "tissue_nk_cells"],
  disease: ["disease_sleep", "disease_depression", "disease_adhd", "disease_metabolic", "disease_autoimmune", "disease_fertility", "disease_cancer"],
  demographic: ["demo_behavior", "demo_biocap", "demo_asfr", "demo_tfr"],
  ecology: ["eco_insect", "eco_bird", "eco_bat", "eco_amphibian", "eco_bee", "eco_tick", "eco_varroa", "eco_pollination"],
};

const REF_HEIGHT = 720;

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
  title: { en: string; fi: string };
  description: { en: string; fi: string };
  nodes: string[];
  edges: string[];
}

export const GUIDED_SCENES: GuidedScene[] = [
  {
    id: "overview",
    title: { en: "The BERM Model", fi: "BERM-malli" },
    description: {
      en: "The Bio-Electromagnetic Reproductive Model traces how environmental EMF fields cascade through biological systems to population-level fertility decline and ecological disruption.",
      fi: "Bio-elektromagneettinen lisääntymismalli seuraa kuinka ympäristön EMF-kentät kaskadoituvat biologisten järjestelmien kautta populaatiotason hedelmällisyyden laskuun ja ekologiseen häiriöön.",
    },
    nodes: [],
    edges: [],
  },
  {
    id: "sources",
    title: { en: "EMF Channels", fi: "EMF-kanavat" },
    description: {
      en: "Four frequency channels deliver electromagnetic exposure: Static/DC, ELF (power grid), IF (LED lighting), and RF (wireless). Each interacts with biology through distinct mechanisms.",
      fi: "Neljä taajuuskanavaa välittää sähkömagneettista altistusta: Staattinen/DC, ELF (sähköverkko), IF (LED-valaistus) ja RF (langaton). Kukin vuorovaikuttaa biologian kanssa eri mekanismeilla.",
    },
    nodes: ["ch_static", "ch_elf", "ch_if", "ch_rf"],
    edges: [],
  },
  {
    id: "fertility",
    title: { en: "The Fertility Pathway", fi: "Hedelmällisyyspolku" },
    description: {
      en: "EMF activates ion channels → VGCC opens → calcium influx → ROS damage → sperm, ovulation and testosterone decline → infertility → TFR falls.",
      fi: "EMF aktivoi ionikanavia → VGCC avautuu → kalsium-influksi → ROS-vaurio → siittiöt, ovulaatio ja testosteroni laskevat → hedelmättömyys → TFR laskee.",
    },
    nodes: ["ch_elf", "ch_if", "mod_ion", "mech_vgcc_ros", "mech_ifo_linear", "tissue_sperm", "tissue_ovarian", "tissue_testosterone", "disease_fertility", "demo_biocap", "demo_asfr", "demo_tfr"],
    edges: ["ch_elf->mod_ion", "ch_if->mod_ion", "mod_ion->mech_vgcc_ros", "mod_ion->mech_ifo_linear", "mech_vgcc_ros->tissue_sperm", "mech_vgcc_ros->tissue_ovarian", "mech_vgcc_ros->tissue_testosterone", "mech_ifo_linear->tissue_sperm", "tissue_sperm->disease_fertility", "tissue_ovarian->disease_fertility", "tissue_testosterone->disease_fertility", "disease_fertility->demo_biocap", "demo_biocap->demo_asfr", "demo_asfr->demo_tfr"],
  },
  {
    id: "sleep",
    title: { en: "Sleep–Depression Cascade", fi: "Uni–masennuskaskadi" },
    description: {
      en: "RF disrupts cryptochrome → melatonin drops → circadian rhythm breaks → sleep disorders → depression. The fastest pathway, manifesting in months.",
      fi: "RF häiritsee kryptokromia → melatoniini laskee → sirkadiaaninen rytmi häiriintyy → unihäiriöt → masennus. Nopein polku, oireita kuukausissa.",
    },
    nodes: ["ch_rf", "mod_pineal", "mech_cry_melatonin", "tissue_melatonin", "tissue_cortisol", "disease_sleep", "disease_depression"],
    edges: ["ch_rf->mod_pineal", "mod_pineal->mech_cry_melatonin", "mech_cry_melatonin->tissue_melatonin", "mech_cry_melatonin->tissue_cortisol", "tissue_melatonin->disease_sleep", "tissue_cortisol->disease_sleep", "tissue_cortisol->disease_depression"],
  },
  {
    id: "ecology",
    title: { en: "The Ecological Mirror", fi: "Ekologinen peili" },
    description: {
      en: "The same EMF channels affect wildlife: insect collapse, bird navigation fails, bee colonies collapse. Pollination — a foundational ecosystem service — declines.",
      fi: "Samat EMF-kanavat vaikuttavat luontoon: hyönteiset romahtavat, lintujen navigaatio häiriintyy, mehiläisyhdyskunnat romahtavat. Pölytys vähenee.",
    },
    nodes: ["ch_rf", "ch_if", "ch_elf", "eco_insect", "eco_bird", "eco_bat", "eco_bee", "eco_varroa", "eco_pollination"],
    edges: ["ch_rf->eco_insect", "ch_rf->eco_bird", "ch_rf->eco_bat", "ch_if->eco_insect", "ch_if->eco_bee", "ch_elf->eco_bee", "eco_bee->eco_varroa", "eco_bee->eco_pollination", "eco_insect->eco_pollination"],
  },
  {
    id: "immune",
    title: { en: "The Immune Pathway", fi: "Immunologinen polku" },
    description: {
      en: "ELF impairs the vagal anti-inflammatory reflex → chronic inflammation → gut barrier weakens → autoimmune risk rises. NK cell decline increases cancer risk.",
      fi: "ELF heikentää vagaalista anti-inflammatorista refleksiä → krooninen tulehdus → suoliston este heikkenee → autoimmuuniriski kasvaa. NK-solujen lasku lisää syöpäriskiä.",
    },
    nodes: ["ch_elf", "mod_vagus", "mech_vagal_antiinflam", "tissue_vagal_tone", "tissue_gut", "tissue_nk_cells", "disease_autoimmune", "disease_cancer"],
    edges: ["ch_elf->mod_vagus", "mod_vagus->mech_vagal_antiinflam", "mech_vagal_antiinflam->tissue_vagal_tone", "mech_vagal_antiinflam->tissue_gut", "tissue_vagal_tone->disease_autoimmune", "tissue_gut->disease_autoimmune", "tissue_nk_cells->disease_cancer"],
  },
];

// ── Mobile stepper paths ──

export const STEPPER_PATHS = {
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
} as const;

export type StepperPathKey = keyof typeof STEPPER_PATHS;
