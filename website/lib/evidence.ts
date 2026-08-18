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
  PV: {
    label: "Pharmacological validation",
    description:
      "Known drugs that target specific BERM pathway components provide independent calibration anchors. If EMF acts through VGCC, mTOR, or HPA mechanisms, drugs targeting those same mechanisms should produce quantitatively consistent effects. This cross-validation distinguishes the model from curve-fitting.",
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

  // ── Pathway A: Becker historical ──
  {
    pathway: "A",
    study: "Hydro-Quebec generating-station survey (cited in Becker, Body Electric)",
    year: 1976,
    finding:
      "Sex ratio of children shifted from 1:1 to 6:1 male after parental occupational EMF exposure at generating stations",
    level: "L*",
  },
  {
    pathway: "A",
    study: "Swedish high-voltage substation workers study (cited in Becker, Body Electric)",
    year: 1979,
    finding:
      "8% incidence of congenital defects in offspring of EMF-exposed workers vs 3% in controls (2.67x); confirmed in 1983 replication",
    level: "L*",
  },

  // ── Pathway B: Becker pineal ──
  {
    pathway: "B",
    study: "Becker RO. Cross Currents, ch. on pineal magnetosensitivity",
    year: 1990,
    finding:
      "Pineal melatonin secretion altered by steady magnetic fields at geomagnetic strength; chronic disruption produces stress syndrome and immune decline",
    level: "M",
  },

  // ── Pathway D: Becker / Guy experiment ──
  {
    pathway: "D",
    study: "Guy AW et al. (US Air Force, cited in Becker, Cross Currents)",
    year: 1984,
    finding:
      "Rats exposed to 2.45 GHz at 0.5 mW/cm2 for 25 months: 18 vs 5 cancers (3.6x) in endocrine organs (pituitary, thyroid, adrenal); plasma cortisol rose then fell, consistent with Selye GAS exhaustion",
    level: "M",
    n: 200,
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
  {
    pathway: "T_BE",
    study: "Becker RO & Selden G. The Body Electric (Fort Rucker case)",
    year: 1985,
    finding:
      "17 clubfoot births in 16 months at Fort Rucker military hospital (expected: 4) in high-radar EMF environment; investigation blocked by military classification of radiation maps",
    level: "L",
  },
  {
    pathway: "T_BE",
    study: "Becker RO. Salamander regeneration DC control system (Body Electric / Cross Currents)",
    year: 1985,
    finding:
      "Negative DC current at neuroepidermal junction drives dedifferentiation and regeneration; requires nanoampere-level currents with sharp threshold -- slightly more does not work, consistent with bifurcation dynamics",
    level: "M",
  },
  // ── Pharmacological validation ──
  {
    pathway: "PV",
    study:
      "Almeida SA et al. Chronic treatment with amlodipine on reproductive function of male rats",
    year: 2000,
    finding:
      "Calcium channel blocker amlodipine (90% VGCC block) reduced sperm concentration by 23% in 30 days. Provides a lower bound for VGCC-mediated reproductive effects: BERM cumulative VGCC decline (33%) exceeds this acute pharmacological benchmark",
    level: "M",
    n: 40,
  },
  {
    pathway: "PV",
    study:
      "Ebiya Y et al. Calcium channel blocker effects on steroidogenic acute regulatory protein (StAR)",
    year: 2017,
    finding:
      "VGCC disruption reduces StAR protein by 40%, impairing mitochondrial cholesterol transport for testosterone synthesis. Validates Pathway A → testosterone link: EMF-induced VGCC activation produces the same downstream StAR suppression",
    level: "M",
  },
  {
    pathway: "PV",
    study:
      "Sempou E et al. Membrane voltage regulates spermatogonial differentiation via mTOR signaling",
    year: 2019,
    finding:
      "Membrane potential (Vmem) controls spermatogonial stem cell differentiation through VGCC → Ca²⁺ → mTOR cascade. Rapamycin (mTOR inhibitor) blocks differentiation. Validates bioelectric pathway: exogenous EMF perturbing Vmem disrupts the same mTOR-dependent process",
    level: "M",
  },
  {
    pathway: "PV",
    study:
      "Moncrieff J et al. The serotonin theory of depression: a systematic umbrella review",
    year: 2022,
    finding:
      "Umbrella review of 17 meta-analyses finds no consistent evidence that depression is caused by low serotonin. SSRI prevalence correlates with EMF exposure because both track GDP/urbanization; SSRI is an endogenous mediator of the EMF→depression pathway, not an exogenous confounder requiring subtraction",
    level: "E",
    n: 17,
  },
  {
    pathway: "PV",
    study:
      "Hardeland R. Melatonin and the pathologies of weakened or dysregulated circadian oscillators",
    year: 2017,
    finding:
      "Exogenous melatonin partially restores circadian disruption and reduces oxidative stress. BERM rescue prediction R3: melatonin supplementation in IVF clinics with high EMF should improve outcomes if Pathway B/C mechanisms are correct",
    level: "M|C",
  },
  {
    pathway: "PV",
    study:
      "Rena W et al. Metformin activates AMPK and inhibits mTOR signaling",
    year: 2015,
    finding:
      "Metformin activates AMPK which inhibits mTOR, the same pathway Sempou identified for spermatogonial differentiation. BERM prediction: metformin-treated PCOS patients in high-EMF environments should show attenuated fertility benefit due to EMF-mTOR convergence",
    level: "M",
  },
  {
    pathway: "PV",
    study:
      "OECD Health Statistics: Pharmaceutical consumption (DDD/1000/day)",
    year: 2023,
    finding:
      "OECD pharmaceutical data for 32 countries enables quantitative cross-validation: antidepressant (N06A), CCB (C08), statin (C10), NSAID (M01A), and melatonin (N05C) consumption rates tested against BERM pathway predictions. Model residuals are informative: SSRI underprediction (model 2.2% vs OECD 5.5% for Finland) consistent with non-EMF prescribing drivers",
    level: "C",
    n: 32,
  },
];
