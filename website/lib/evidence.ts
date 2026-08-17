import type { EpistemicLevel, EvidenceItem } from "./types";

// Epistemic levels explained
export const EPISTEMIC_LEVELS: Record<
  EpistemicLevel,
  { label: string; color: string; description: string }
> = {
  E: {
    label: "Established",
    color: "#22C55E",
    description: "Umbrella review or multiple independent RCTs confirm",
  },
  "M|C": {
    label: "Mechanistic + Correlational",
    color: "#3B82F6",
    description:
      "Clear mechanism + epidemiological correlation, no human RCT",
  },
  M: {
    label: "Mechanistic only",
    color: "#8B5CF6",
    description: "In vitro/animal mechanism, limited human data",
  },
  C: {
    label: "Correlational only",
    color: "#F59E0B",
    description: "Epidemiological association, mechanism unclear",
  },
  "L*": {
    label: "Literature (qualified)",
    color: "#F97316",
    description: "Single study or small sample, needs replication",
  },
  L: {
    label: "Literature (unqualified)",
    color: "#737373",
    description: "Cited but not independently verified",
  },
};

// Pathway descriptions
export const PATHWAYS: Record<
  string,
  { label: string; description: string }
> = {
  A: {
    label: "VGIC → Ca²⁺ → ROS → Sperm damage",
    description:
      "EMF activates voltage-gated ion channels, raising intracellular calcium, which triggers reactive oxygen species production. ROS damages sperm DNA and reduces motility and concentration.",
  },
  B: {
    label: "RPM → CRY → Circadian disruption",
    description:
      "The radical-pair mechanism in cryptochrome proteins is sensitive to weak magnetic fields, potentially disrupting circadian signaling and downstream reproductive hormone rhythms.",
  },
  C: {
    label: "BBB disruption",
    description:
      "Radiofrequency exposure may increase blood-brain barrier permeability, allowing neurotoxic compounds to reach brain regions that regulate the HPG axis.",
  },
  D: {
    label: "HPA → HPG cross-inhibition",
    description:
      "Chronic EMF exposure may elevate cortisol via HPA axis activation, which cross-inhibits the hypothalamic-pituitary-gonadal axis, reducing testosterone and impairing spermatogenesis.",
  },
  E: {
    label: "Microbiome",
    description:
      "EMF exposure may alter gut and seminal microbiome composition, with downstream effects on reproductive hormone metabolism and sperm quality.",
  },
  T_BE: {
    label: "Bioelectric code",
    description:
      "Endogenous bioelectric signals guide morphogenesis and cellular coordination. Exogenous EMF may interfere with these bioelectric patterns, though this pathway is the least established.",
  },
};

// Evidence items organized by pathway
export const EVIDENCE: EvidenceItem[] = [
  // ── Pathway A: VGIC → Ca²⁺ → ROS → Sperm damage ──
  {
    pathway: "A",
    study: "Panagopoulos DJ. Umbrella review of EMF effects on reproduction",
    year: 2025,
    finding:
      "Umbrella review of 39 systematic reviews confirms RF-EMF impairs sperm quality across multiple parameters",
    level: "E",
    n: 39,
  },
  {
    pathway: "A",
    study: "Houston BJ et al. The effects of radiofrequency electromagnetic radiation on sperm function",
    year: 2016,
    finding:
      "RF-EMR exposure associated with increased ROS, DNA fragmentation, and decreased motility in human sperm in vitro and in vivo",
    level: "M|C",
    n: 27,
  },
  {
    pathway: "A",
    study: "Agarwal A et al. Effects of radiofrequency electromagnetic waves on human semen",
    year: 2009,
    finding:
      "Cell phone radiation increases ROS and sperm DNA fragmentation in a dose-dependent manner",
    level: "M|C",
    n: 32,
  },
  {
    pathway: "A",
    study: "Yildirim ME et al. What is harmful for male fertility: cell phone or wireless internet?",
    year: 2015,
    finding:
      "Both cell phone and Wi-Fi exposure significantly impaired sperm motility and increased DNA fragmentation",
    level: "L*",
    n: 51,
  },
  {
    pathway: "A",
    study: "Al-Bayyari N. The effect of cell phone usage on semen quality in Jordanian men",
    year: 2017,
    finding:
      "Heavy phone users (>4 h/day) showed significantly lower sperm concentration and motility",
    level: "L*",
    n: 159,
  },
  {
    pathway: "A",
    study: "Levine H et al. Temporal trends in sperm count: a systematic review and meta-regression analysis",
    year: 2017,
    finding:
      "Sperm concentration declined 52.4% between 1973 and 2011 among Western men, with no sign of leveling off",
    level: "E",
    n: 42935,
  },

  // ── Pathway B: RPM → CRY → Circadian disruption ──
  {
    pathway: "B",
    study: "Hore PJ & Mouritsen H. The radical-pair mechanism of magnetoreception",
    year: 2016,
    finding:
      "Established that cryptochrome radical pairs are sensitive to Earth-strength magnetic fields, providing a physical mechanism for biological magnetosensitivity",
    level: "M",
  },
  {
    pathway: "B",
    study: "Ritz T et al. Resonance effects indicate a radical-pair mechanism for avian magnetic compass",
    year: 2004,
    finding:
      "Demonstrated that RF fields at Larmor frequency disrupt bird magnetic compass orientation, confirming radical-pair involvement",
    level: "E",
    n: 12,
  },
  {
    pathway: "B",
    study: "Sherrard RM et al. Low-intensity EMF activates the CRY-dependent circadian pathway",
    year: 2018,
    finding:
      "Pulsed EMF activates cryptochrome in Drosophila, altering circadian gene expression at non-thermal intensities",
    level: "M|C",
  },

  // ── Pathway C: BBB disruption ──
  {
    pathway: "C",
    study: "Salford LG et al. Nerve cell damage in mammalian brain after exposure to microwaves",
    year: 2003,
    finding:
      "GSM-900 exposure caused albumin extravasation across the blood-brain barrier and scattered neuronal damage in rat brains",
    level: "M",
    n: 32,
  },
  {
    pathway: "C",
    study: "Nittby H et al. Increased blood-brain barrier permeability in mammalian brain 7 days after exposure",
    year: 2009,
    finding:
      "BBB permeability remained elevated 7 days after a single 2-hour GSM exposure in rats",
    level: "M",
    n: 16,
  },
  {
    pathway: "C",
    study: "Sirav B & Seyhan N. Effects of GSM modulated radiofrequency on blood-brain barrier permeability",
    year: 2016,
    finding:
      "Male rats showed significant BBB permeability increase after GSM-900 exposure; female rats were less affected",
    level: "L*",
    n: 30,
  },

  // ── Pathway D: HPA → HPG cross-inhibition ──
  {
    pathway: "D",
    study: "Esmailzadeh S et al. Association between cell phone use and salivary cortisol",
    year: 2019,
    finding:
      "Heavy cell phone use correlated with elevated salivary cortisol levels, suggesting chronic HPA axis activation",
    level: "C",
    n: 200,
  },
  {
    pathway: "D",
    study: "Meo SA et al. Association of exposure to radio-frequency EMF with testosterone levels",
    year: 2010,
    finding:
      "Men exposed to mobile phone radiation >4 h/day showed significantly lower total testosterone",
    level: "L*",
    n: 40,
  },

  // ── Pathway E: Microbiome ──
  {
    pathway: "E",
    study: "Jin Y et al. Effects of radiofrequency EMF on gut microbiota composition in mice",
    year: 2022,
    finding:
      "2.4 GHz Wi-Fi exposure altered gut microbiota diversity and composition, with increased Firmicutes/Bacteroidetes ratio",
    level: "M",
    n: 24,
  },
  {
    pathway: "E",
    study: "Lundy SD et al. The seminal microbiome is associated with semen parameters",
    year: 2021,
    finding:
      "Seminal microbiome composition correlates with sperm concentration and motility; dysbiosis linked to subfertility",
    level: "L*",
    n: 73,
  },

  // ── Pathway T_BE: Bioelectric code ──
  {
    pathway: "T_BE",
    study: "Adee S. We Are Electric: Inside the 200-Year Hunt for Our Body's Bioelectric Code",
    year: 2023,
    finding:
      "Comprehensive review of endogenous bioelectric signaling in morphogenesis, wound healing, and cancer suppression",
    level: "L",
  },
  {
    pathway: "T_BE",
    study: "Levin M. Bioelectric signaling: reprogrammable circuits underlying embryogenesis and regeneration",
    year: 2021,
    finding:
      "Bioelectric patterns encode morphogenetic information; perturbation of endogenous voltage gradients alters developmental outcomes",
    level: "M",
  },
];
