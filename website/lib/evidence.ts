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
  F: {
    label: "Sempou pathway (VGCC → mTOR → fertility/aging)",
    description:
      "Membrane potential controls spermatogonial differentiation via VGCC → Ca²⁺ → mTOR signaling. EMF perturbation of Vmem disrupts this pathway, linking reproductive decline to aging through shared mTOR hyperactivation. Metformin and rapamycin provide independent calibration.",
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
  NE: {
    label: "Natural experiments",
    description:
      "Countries where mobile technology adoption changed abruptly provide quasi-experimental tests. If EMF drives TFR decline, sudden adoption should accelerate decline; stable TFR followed by adoption onset is the strongest signal. Results are mixed: 1/3 BERM-consistent, reported transparently.",
  },
  TG: {
    label: "Technology generation steps",
    description:
      "If EMF exposure drives fertility decline, the transition from 2G (base stations only) through 3G (mobile data) to 4G/smartphones (personal RF surge) should produce monotonically increasing TFR decline rates. This tests BERM's dose-response prediction against the sharpest historical exposure discontinuities. Results are partially supportive: 6/8 countries show 4G-era acceleration over 2G, but only 3/8 show strict monotonic increase across all generations.",
  },
  CA: {
    label: "Calibration anchors",
    description:
      "Independent empirical measurements from Travison (testosterone decline), Leproult (sleep-testosterone pathway), Volkow (acute neural response), and Becker (bioelectric field ratios) are used to check whether BERM's internal parameters produce physiologically consistent magnitudes. All four anchors pass, but this is a consistency check, not evidence of causation.",
  },
  NR: {
    label: "Negative results and counter-evidence",
    description:
      "Studies and observations that contradict BERM predictions, that the model cannot explain, or that limit the strength of causal claims. Scientific integrity requires documenting what fails, not only what fits. Two entries are rated high-threat: the monotonic degeneracy problem (any increasing variable fits the TFR curve) and the absence of any human RCT linking EMF reduction to fertility improvement.",
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

  // ── Pathway A: additional ──
  {
    pathway: "A",
    study:
      "Brown SG et al. Depolarization of sperm membrane potential is a common feature of men from subfertile couples",
    year: 2016,
    finding:
      "Subfertile men show depolarized sperm membrane potential (−30 mV vs −60 mV in fertile controls). Directly supports BERM's Vmem-centric mechanism: EMF-induced VGCC opening depolarizes sperm, reducing Ca²⁺ signaling capacity for capacitation",
    level: "M|C",
    n: 220,
  },
  {
    pathway: "A",
    study:
      "CatSper consortium. CatSper channel dysfunction in human infertility",
    year: 2024,
    finding:
      "CatSper (sperm-specific Ca²⁺ channel) mutations cause male infertility. CatSper activation requires precise Vmem: depolarization by ~5 mV abolishes capacitation. Validates BERM's prediction that small Vmem perturbations have large reproductive consequences",
    level: "M|C",
  },

  // ── Pathway B: additional ──
  {
    pathway: "B",
    study:
      "Kacem I et al. Association between occupational EMF exposure and depression: systematic review and meta-analysis",
    year: 2024,
    finding:
      "Meta-analysis: occupational EMF exposure associated with depression risk OR 1.45 (95% CI: 1.15–1.82). Supports HPA/circadian disruption pathway. EMF→depression is predicted by BERM's cortisol/circadian mechanism, not by social media confounding",
    level: "M|C",
    n: 12,
  },

  // ── Pathway F: Sempou / mTOR ──
  {
    pathway: "F",
    study:
      "Sempou E et al. Membrane voltage drives spermatogonial stem cell differentiation through Vmem-dependent mTOR regulation",
    year: 2022,
    finding:
      "Published in Nature Communications. Definitive demonstration that membrane potential (Vmem) controls spermatogonial stem cell differentiation via VGCC → Ca²⁺ → mTOR cascade. Depolarization blocks differentiation; rapamycin phenocopies the effect. This is BERM's core mechanism: exogenous EMF perturbing Vmem disrupts the same mTOR-dependent spermatogenesis pathway",
    level: "E",
  },
  {
    pathway: "F",
    study:
      "Zhang D & Levin M. Bioelectric signaling as a control mechanism in tissue-level morphogenesis",
    year: 2025,
    finding:
      "Reviews how endogenous bioelectric gradients (Vmem patterns) encode positional information for tissue organization. Exogenous EMF that perturbs these gradients could disrupt morphogenetic programs at the tissue level, extending BERM's mechanism from single-cell to tissue-scale effects",
    level: "M",
  },
  {
    pathway: "F",
    study:
      "Yang JY et al. Metformin extends lifespan in male cynomolgus monkeys",
    year: 2024,
    finding:
      "Published in Cell. First primate evidence: metformin extended healthspan and reduced age-related biomarkers in male monkeys. Validates BERM's mTOR-EMF aging hypothesis: metformin's AMPK→mTOR inhibition counteracts EMF-induced mTOR hyperactivation. Benefit proportional to metabolic stress (≈ EMF exposure proxy)",
    level: "M|C",
    n: 40,
  },

  // ── Natural experiments ──
  {
    pathway: "NE",
    study:
      "Cuba mobile data liberalization (ETECSA, 3G opened to citizens)",
    year: 2018,
    finding:
      "BERM-consistent (onset): Cuba's TFR was stable at ~1.65 for 17 years (2000-2017), then began declining to 1.45 after mobile data became available to citizens in December 2018. The onset pattern — no decline, then decline — is the strongest natural experiment signal",
    level: "C",
  },
  {
    pathway: "NE",
    study:
      "Myanmar SIM card price collapse ($250 → $1.50, Ooredoo/Telenor entry)",
    year: 2014,
    finding:
      "BERM-inconsistent: mobile penetration jumped from 7% to 80% in 3 years, but TFR decline rate actually decelerated (0.045/yr pre-event → 0.015/yr post-event, even proportionally). Confounded by: military coup 2021, data quality 0.30, approaching replacement level. Reported transparently",
    level: "C",
  },
  {
    pathway: "NE",
    study:
      "Bhutan mobile introduction (B-Mobile, first cellular service)",
    year: 2003,
    finding:
      "BERM-inconsistent: TFR declined from 6.0 to 1.8, but proportional decline rate slowed after mobile introduction (4.9%/yr pre → 2.2%/yr post). Confounded by simultaneous development transition — education, urbanization, and TV (introduced 1999) changed simultaneously with mobile adoption",
    level: "C",
  },
  {
    pathway: "NE",
    study:
      "BERM natural experiment analysis (v20NaturalExperimentAnalysis)",
    year: 2026,
    finding:
      "Formal analysis of 3 quasi-experiments using proportional decline rates with onset detection. Result: 1/3 BERM-consistent (Cuba onset), 2/3 inconclusive due to confounding. Identification strength 0.10. The test is informative but weak — development confounds dominate in countries transitioning from high TFR",
    level: "L*",
    n: 3,
  },

  // ── Technology generation steps ──
  {
    pathway: "TG",
    study:
      "BERM technology generation analysis (v20TechGenerationAnalysis)",
    year: 2026,
    finding:
      "Cross-country analysis of TFR decline rates across 2G (base stations), 3G (mobile data), and 4G/smartphone eras for 8 countries. 3/8 show strict monotonic acceleration (Finland, Japan, South Korea); 6/8 show 4G-era acceleration over 2G baseline. Mean smartphone acceleration factor: 2.05x. Identification strength 0.56 — partial support for dose-response prediction",
    level: "C",
    n: 8,
  },
  {
    pathway: "TG",
    study:
      "Finland: 2G→3G→4G TFR decline trajectory",
    year: 2024,
    finding:
      "Monotonic acceleration confirmed. 2G era: gradual decline from 1.85. 3G era: decline accelerates. 4G/smartphone era (2012+): sharp collapse from 1.80 to 1.26. Finland's late but rapid smartphone adoption aligns with the steepest TFR drop in its recorded history",
    level: "C",
  },
  {
    pathway: "TG",
    study:
      "South Korea: 2G→3G→4G TFR decline trajectory",
    year: 2024,
    finding:
      "Monotonic acceleration confirmed. Already declining in 2G era, but 4G/smartphone era produced world-record low TFR (0.72 by 2023). Smartphone penetration reached 97% — highest personal EMF exposure of any country. Confounded by extreme housing costs and cultural pressure",
    level: "C",
  },
  {
    pathway: "TG",
    study:
      "Japan: 2G→3G→4G TFR decline trajectory",
    year: 2024,
    finding:
      "Monotonic acceleration confirmed. 2G-era TFR relatively stable (~1.35). 3G era: mild decline. 4G/smartphone era: decline steepens to 1.20. Japan's i-mode (1999) means earlier smartphone-like exposure than most countries",
    level: "C",
  },
  {
    pathway: "TG",
    study:
      "Germany, USA, Italy, Spain: partial acceleration pattern",
    year: 2024,
    finding:
      "4G-era decline exceeds 2G-era decline in all four countries, but 3G era does not fall neatly between them. Germany and USA show 3G-era TFR plateau or slight recovery before 4G-era decline resumes. Consistent with BERM if 3G ambient exposure was modest relative to 4G personal-device exposure, but non-monotonicity weakens the identification",
    level: "C",
  },
  {
    pathway: "TG",
    study:
      "India: non-monotonic pattern",
    year: 2024,
    finding:
      "BERM-inconsistent for monotonicity: 2G-era TFR decline was fastest (driven by demographic transition from TFR 3.5+), slowing through 3G and 4G eras as TFR approaches replacement. Proportional rates partially rescue the pattern but development confounds dominate. Similar to natural experiment limitations in high-TFR transition countries",
    level: "C",
  },

  // ── Calibration Anchors ──
  {
    pathway: "CA",
    study: "Travison AB et al. Population-level decline in serum T levels (MMAS)",
    year: 2007,
    finding:
      "Age-independent testosterone decline of ~1%/year across three cohorts (1987-2004). BERM's cumulative EMF exposure model accounts for 14% of this secular decline — consistent with a multi-causal framework where EMF is one contributor alongside obesity, EDCs, and lifestyle changes",
    level: "C",
    n: 1532,
  },
  {
    pathway: "CA",
    study: "Leproult R, Van Cauter E. Sleep restriction and testosterone",
    year: 2011,
    finding:
      "One week of 5h sleep reduced testosterone by 10-15% in young men. BERM's sleep-T pathway (melatonin 0.25 × 0.30 + CRY 0.15 × 0.20 = 10.5% decline) matches at ratio 0.70 — strong calibration of the circadian disruption mechanism",
    level: "L*",
    n: 10,
  },
  {
    pathway: "CA",
    study: "Volkow ND et al. Effects of cell phone radiofrequency signal exposure on brain glucose metabolism",
    year: 2011,
    finding:
      "50 min phone call increased glucose metabolism by 7% in nearest brain region (PET scan). BERM consistency check: 1200 sessions/year × 7% acute response implies 0.18% retention rate per session for the model's chronic neural pathway — consistent with BBB recovery kinetics",
    level: "L*",
    n: 47,
  },
  {
    pathway: "CA",
    study: "Becker RO. Bioelectric field measurements + Levin M. Vmem as morphogenetic signal",
    year: 2014,
    finding:
      "Endogenous DC fields of 50-200 mV/m guide tissue regeneration. Typical RF exposure induces ~0.5 mV/m — 0.5% of endogenous field strength. This is at Becker's disruption threshold (~1%), consistent with BERM's prediction of small but cumulative effects. VGCC open probability at typical exposure: 0.463",
    level: "M",
  },

  // ── Negative results and counter-evidence ──
  {
    pathway: "NR",
    study: "INTERPHONE Study Group. Mobile phone use and glioma/meningioma risk",
    year: 2010,
    finding:
      "No overall increased risk of brain cancer with mobile phone use (OR 0.81, 95% CI 0.70-0.94). BERM models sublethal functional changes, not genotoxic endpoints, so this does not directly contradict the model — but it suggests acute metabolic changes may not translate to structural pathology. Model threat: LOW",
    level: "E",
    n: 6420,
  },
  {
    pathway: "NR",
    study: "Hatch EE et al. Mobile phone use and fecundability (Danish cohort)",
    year: 2021,
    finding:
      "No association between self-reported mobile phone use and fecundability ratio (FR 1.00, 95% CI 0.93-1.07). Directly challenges BERM's core hypothesis. Self-reported use is a poor exposure proxy (measurement error biases toward null), but this limitation does not fully resolve the null finding. Model threat: MEDIUM",
    level: "E",
    n: 3947,
  },
  {
    pathway: "NR",
    study: "K8 monotonic degeneracy test (BERM internal)",
    year: 2026,
    finding:
      "86% of random monotonic time series fit the TFR decline curve at least as well as BERM's own exposure index. Any increasing variable (GDP, education, screen time, microplastics) produces similar hindcast fit. This is BERM's most serious identification problem — temporal correlation is necessary but grossly insufficient for causal identification. Model threat: HIGH",
    level: "M|C",
  },
  {
    pathway: "NR",
    study: "No human RCT exists (literature gap)",
    year: 2026,
    finding:
      "No randomized controlled trial has ever tested whether reducing personal EMF exposure improves human fertility. The entire causal chain from EMF to TFR rests on observational and animal evidence. Without experimental evidence in humans, BERM predictions remain mechanistic inference, not established fact. Model threat: HIGH",
    level: "L",
  },
  {
    pathway: "NR",
    study: "IVF success rate trends vs BERM predictions",
    year: 2024,
    finding:
      "IVF success rates improved from ~36% to ~50% live birth rate per transfer (2000-2024), despite increasing ambient EMF. If EMF degrades gamete quality, IVF outcomes should not improve. Lab technique improvements and gamete selection (ICSI/PGT) may overwhelm EMF effects, or effects on gametes may be smaller than modeled. Model threat: MEDIUM",
    level: "C",
  },
];
