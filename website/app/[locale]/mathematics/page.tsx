import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { MathBlock } from "@/components/MathBlock";
import { Derivation } from "@/components/Derivation";

const t = {
  en: {
    meta: {
      title: "Mathematics - Extinction Field",
      description:
        "Complete mathematical derivation of the BERM model from Lindgren geometry to TFR prediction. Every step is verifiable.",
    },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgren geometry" },
      { id: "evo-calibration", num: "§1b", label: "Evolutionary calibration" },
      { id: "chi", num: "§2", label: "Selection rule χ(Ā)" },
      { id: "three-channel-derivation", num: "§2b", label: "Three-channel derivation" },
      { id: "two-channel", num: "§3", label: "Two-channel model" },
      { id: "biocap", num: "§4", label: "Biological capacity" },
      { id: "behavioral", num: "§5", label: "Behavioral factor" },
      { id: "cell-size-frequency", num: "§5b", label: "Cell size × frequency" },
      { id: "cultural", num: "§6", label: "Cultural / compensation" },
      { id: "jacobian", num: "§7", label: "Jacobian" },
      { id: "locked", num: "§8", label: "Locked predictions" },
      { id: "falsification", num: "§9", label: "Falsification conditions" },
      { id: "pharmacological", num: "§10", label: "Pharmacological validation" },
      { id: "individual-susceptibility", num: "§11", label: "Individual susceptibility" },
      { id: "cross-sectional", num: "§12", label: "Cross-sectional validation" },
      { id: "nested-chi", num: "§13", label: "Nested χ (population model)" },
    ],
    pageTitle: "Mathematical Foundation",
    pageSubtitle:
      'Complete derivation of the BERM model from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    // S1 Lindgren
    s1Title: "Lindgren Geometry",
    s1Intro:
      "In the framework of Lindgren, Kovacs & Liukkonen (2025), the electromagnetic potential is part of spacetime geometry. The metric tensor absorbs the EM four-potential:",
    s1After:
      "This means the electromagnetic field changes the geometry in which all physical processes occur — including biological ion channels. Maxwell’s equations emerge as Bianchi identities of this geometry.",
    s1d1: "In standard GR the metric is dynamical:",
    s1d2: "In Lindgren’s framework, the EM potential replaces the gravitational perturbation:",
    s1d3: "where κ is a coupling constant (normalized to 1 in suitable units).",
    s1d4: "Maxwell’s equations follow from the Bianchi identities:",
    s1d5: "Vassallo et al. (2025) validated this derivation independently.",
    s1d6: "The apparent problem (δV_mem ≈ 10⁻²¹ V from naive calculation) is resolved by three independent mechanisms:",
    s1d6a: "(1) IFO: ion forced oscillation acts on the S4 voltage sensor directly at <1 nm distance, threshold 10⁻⁵ V/m (Panagopoulos 2025).",
    s1d6b: "(2) Non-ionotropic VGCC signaling: conformational change without ion flux, lower energy threshold (Trus & Atlas 2024).",
    s1d6c: "(3) RPM pathway bypasses VGCC entirely: 87.5% of RPM Hamiltonian elements derivable from Lindgren geometry.",

    // S1b Evolutionary Calibration
    s1bTitle: "Evolutionary Calibration",
    s1bIntro:
      "Biological sensors evolved to detect electromagnetic signals at the quantum limit. The human eye detects single photons (~4×10⁻¹⁹ J, one-tenth of thermal noise energy — Vaziri et al. 2016). Shark electroreceptors detect 0.5 µV/m fields. Migratory birds’ compass is disrupted by 15 nT RF noise. Ion channels respond to 10⁻⁵ V/m polarized fields (Panagopoulos 2025). Lindgren’s χ(Ā) ≈ 1.0 at the membrane is the geometric reason for this sensitivity: the membrane is maximally susceptible because its internal field (7×10⁶ V/m) saturates the susceptibility function.",
    s1bAfter:
      "There is no evolved filter for IF or RF frequencies because these frequencies did not exist during 3.8 billion years of biological evolution. Ion channels are wideband receivers — evolution optimized detection sensitivity, not frequency rejection. Every technical signal is a potential disruption because biological sensors cannot distinguish it from a physiological signal.",
    s1bd1: "Amplification cascade — photon analogy:",
    s1bd2: "Eye: 1 photon → rhodopsin → transducin → PDE → cGMP → measurable current. Gain: ~10⁶×.",
    s1bd3: "VGCC: 1 S4 conformational change → non-ionotropic signal (Trus & Atlas 2024) OR ion flux → Ca²⁺ → calmodulin → cascade. Gain: ~10⁴–10⁶×.",
    s1bd4: "Bifurcation near Hopf point: G = 1/(2µ). Small ROS change → macroscopic output. Additional gain: ~10²–10³×.",
    s1bd5: "Total gain: 10⁶–10⁹× — same order of magnitude as the eye’s photon amplification cascade.",

    // S2b Three-Channel Derivation
    s2bTitle: "Three-Channel Derivation",
    s2bIntro:
      "Two biological cutoff frequencies divide the EMF spectrum into three regimes with distinct biophysical mechanisms. These cutoffs are fundamental properties of cell biology, not arbitrary parameters.",
    s2bFC:
      "f_c ≈ 1 kHz — the membrane RC time constant. Below f_c: the field drops across the membrane and perturbs V_mem. Above f_c: the field penetrates into the cell interior.",
    s2bFRPM:
      "f_RPM ≈ 1 MHz — the radical pair coherence limit. Above f_RPM: classical field–membrane interaction weakens but quantum spin effects become relevant.",
    s2bELF:
      "ELF channel (f < ~1 kHz): field drops across the membrane. ΔV_mem = E_ext · d_cell · H(f). χ_mem saturated at 7×10⁶ V/m. Linear response. Mechanisms: VGCC→Ca²⁺→ROS (pathway A), GPCR-adenosine (PEMF, FDA 1979), Nav-modulation (TMS, FDA 2008), vagus nerve (VNS, FDA 2017).",
    s2bIF:
      "IF channel (f_c < f < f_RPM): field penetrates the cell interior. T(f) = 1/√(1+(f_c/f)²). Primary mechanism at environmental levels: IFO-VGIC (linear, threshold 10⁻⁵ V/m). Geometric field amplification at cleavage furrow: G ≈ (d_cell/d_furrow)² ≈ 25×. Selective effect on dividing cells. TTFields (FDA 2011+) validates the mechanism at therapeutic intensity via DEP.",
    s2bIFSources:
      "Environmental IF source characterization: a typical LED driver operates at switching frequency f_sw in the range 20–200 kHz with harmonic content at 2f_sw, 3f_sw, 5f_sw extending into the MHz range. The waveform is a square pulse train, not a sinusoid, which produces richer harmonic content than continuous-wave sources. Panagopoulos 2025 demonstrates that pulsed fields are biologically more active than continuous-wave fields at the same average intensity. Zeghoudi et al. 2025 directly measured LED driver near-field emissions, confirming measurable E-field components at centimeter distances.",
    s2bRF:
      "RF channel (f > ~1 MHz): membrane is transparent. Classical field–membrane interaction is weak. Quantum spin effects become relevant. Lindgren's covariant spin correction: B_local = (1/w)b + (A·b)A/(w(1+w)). Anisotropic response. Mechanisms: CRY/RPM→circadian disruption (pathway B), magnetic compass corruption (Lindecke 2026).",
    s2bRegGapTitle: "The IF Regulatory Gap",
    s2bRegGap:
      "ICNIRP 2010 sets exposure limits for f < 300 Hz (ELF). ICNIRP 2020 sets limits for f > 100 kHz (RF). The range 300 Hz < f < 100 kHz has overlapping, inconsistent limits. LED driver emissions (20–300 kHz) fall in this gap. A 2022 systematic review (IJRB, Ohkubo & Okano) confirmed: 'studies on health effects with more diverse perspectives of IF-EMF have NOT been conducted.' Biological relevance at these frequencies is supported by: IFO threshold 10⁻⁵ V/m exceeded by LED drivers at 1 m; Kim 2026 gene expression activation at 4 kHz (Cyb5b); TTFields FDA-approved cancer treatment at 200 kHz; 150 kHz rat testicular effects (Heliyon 2022).",
    s2bAfter:
      "Channel weights (w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35) are DIAGNOSTIC and require empirical calibration. The three-channel decomposition is structurally derived from membrane biophysics; only the relative weights are uncertain.",

    // S2 Chi
    s2Title: "Selection Rule χ(Ā)",
    s2Intro:
      "When the metric is linearized around a background Ā, the biologically relevant response to a perturbation",
    s2IntroEnd: "is:",
    s2After:
      "In zero background (Ā = 0) there is no linear response. At the cell membrane (Ā ≈ 7 × 10⁶ V/m) the response is maximal.",
    s2d1: "Linearize g_μν around background ġ = η + Ā⊗Ā:",
    s2d2: "where:",
    s2d3: "First order (linear response):",
    s2d4:
      "The biologically relevant quantity is the relative magnitude of the metric perturbation:",
    s2d5: "This gives the selection rule:",
    s2d6: "Properties:",
    s2d7: "Cell membrane:",
    s2d8: "Cells are MAXIMALLY sensitive to external EMF perturbation.",

    // S3 Two-channel
    s3Title: "Two-Channel Model",
    s3Intro:
      "Total exposure is the sum of two channels where the personal channel is modulated by the selection rule:",
    s3d1: "Ambient = base stations + Wi-Fi + IoT (infrastructure level)",
    s3d2: "Personal = phone + earbuds + watches (personal devices)",
    s3d3: "Ambient is the background Ā that determines χ.",
    s3d4: "Personal is the perturbation a whose biological response depends on χ(Ā).",
    s3d5: "When Ā = 0 (Amish): total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ Personal devices produce no biological response.",
    s3d7: "When Ā → ∞ (saturated city): total ≈ ambient + 1 × personal",
    s3d8: "→ Personal adds at full magnitude.",
    s3d9: "Cumulative exposure is the historical sum:",
    s3d10: "where start is the country’s EMF history start year (e.g. Finland 1991).",
    s3rwTitle: "Why cumulative exposure works: the recovery window",
    s3rwIntro:
      "Cumulative exposure is the correct metric because DNA repair capacity is finite. The BER (base excision repair) pathway has a half-life τ_repair ≈ 6 hours. Net daily damage depends on the ratio of exposure time to recovery time:",
    s3rwTable: "Historical exposure scenarios:",
    s3rwRow1: "1950 (radio + TV): 4h EMF, 20h free → 90% repair → net 0.40/day",
    s3rwRow2: "1990 (phone, no Wi-Fi): 8h EMF, 16h free → 84% repair → net 1.26/day",
    s3rwRow3: "2010 (smartphone + Wi-Fi): 16h EMF, 8h free → 60% repair → net 6.35/day",
    s3rwRow4: "2020 (24/7 Wi-Fi + IoT): 22h EMF, 2h free → 21% repair → net 17.46/day",
    s3rwRow5: "Amish (no electronics): 1h EMF, 23h free → 93% repair → net 0.07/day",
    s3rwThreshold:
      "Critical threshold: when EMF-free period < 2× repair half-life (< 12h for BER), repair is incomplete and cumulation begins. Modern humans crossed this threshold around 2005–2010.",
    s3tcTitle: "Three-channel extension",
    s3tcIntro:
      "In the three-channel decomposition, cumEMF becomes a weighted sum of frequency-specific cumulative exposures:",
    s3tcAfter:
      "Channel weights are frequency-specific and tissue-dependent (see §2b). The single-channel cumEMF above is the weighted aggregate of the three channels. Channel weights (0.05/0.60/0.35) are diagnostic estimates requiring empirical calibration.",

    s3ifoTitle: "IF response function: IFO vs DEP vs Cyb5b",
    s3ifoIntro:
      "The IF channel response is the sum of three mechanisms operating at different intensity regimes and frequency bands:",
    s3ifoIfo:
      "R_IFO — Ion Forced Oscillation: linear in E_ext, threshold 10⁻⁵ V/m, dominates at environmental levels (0.01–3 V/m). Polarized, coherent IF fields force irregular gating of voltage-gated ion channels (Panagopoulos 2025).",
    s3ifoDep:
      "R_DEP — Dielectrophoresis: quadratic in E_ext, dominates at TTFields therapeutic levels (100–300 V/m). Requires high field gradients for translational force on intracellular structures.",
    s3ifoCyb5b:
      "R_Cyb5b — Mitochondrial outer membrane transduction: Cyb5b identified via genome-wide CRISPR screen as an EMF sensor (Kim et al. 2026, Cell). 60 Hz pulsed EMF → Cyb5b conformational change → Ca²⁺ oscillations → gene promoter activation. Operates at ELF frequencies (50/60 Hz) and couples the ELF channel directly to gene expression control — a pathway independent of both IFO and RPM.",
    s3ifoAfter:
      "At environmental intensities R_IFO ≫ R_DEP → linear response. At therapeutic intensities R_DEP ≫ R_IFO → quadratic response. R_Cyb5b adds an ELF-specific gene-regulatory pathway that operates independently of membrane ion channel gating. The intensity gap between therapeutic devices and environmental exposure does not exist — it is an artifact of assuming DEP is the only mechanism.",

    // S4 BioCap
    s4Title: "Biological Capacity",
    s4Intro:
      "Biological capacity declines exponentially as a function of cumulative exposure, with a threshold below which repair mechanisms compensate:",
    s4Params: "(pre-EMF baseline TFR),",
    s4Params2: "(decline parameter),",
    s4Params3: "(threshold).",
    s4d1:
      "Exponential decline follows from the assumption that each year’s EMF exposure produces a proportionally equal biological damage:",
    s4d2: "Integrating:",
    s4d3:
      "Threshold θ = 5 reflects biological resistance: small exposures do not exceed repair mechanism capacity.",
    s4d4:
      'a = 6.5 is calibrated: it is the approximate "natural TFR" without any EMF exposure (cf. Amish ≈ 6.5, Hutterites ≈ 9.0).',
    s4d5Link: "→ Controlled laboratory evidence for bioCap parameters",

    // S5 Behavioral
    s5Title: "Behavioral Factor",
    s5Intro:
      "The endocrine vector (testosterone, oxytocin, dopamine, cortisol, vasopressin) as a geometric mean:",
    s5d1: "Each hormone declines exponentially:",
    s5d2: "Geometric mean: (OT × T × DA × cort × AVP)^(1/5)",
    s5d3:
      "Geometric > arithmetic because hormones are MULTIPLICATIVE: if any one is zero, the total effect is zero.",
    s5d4: "r₂ = 0.013 is calibrated from Travison’s −1%/year testosterone decline:",
    s5d5: "If dEMF/dt ≈ 1/year → dT/T ≈ −1.3%/year ≈ Travison.",
    s5otTitle: "Biological basis of OT parameter",
    s5otIntro:
      "The OT parameter r₁ = 0.010 is not curve-fitted from data. It follows from two independent biological mechanisms that both suppress oxytocin under EMF conditions:",
    s5otRoute1Title: "Route 1 (HPA → vagal):",
    s5otRoute1:
      "EMF → cortisol↑ (Pawlak 2025, d=1.88) → vagal suppression (Porges 2001: myelinated vagus dampens HPA; chronic stress reverses this) → oxytocin↓ (ventral vagal complex → hypothalamic OT release) → social engagement↓ (Carter 2021, Feldman 2012)",
    s5otRoute2Title: "Route 2 (microbiome → endocrine):",
    s5otRoute2:
      "EMF → gut microbiome disruption (Jin 2022) → Lactobacillus↓ (incl. L. reuteri) → oxytocin↓ (Erdman & Poutahidis 2016: L. reuteri → vagus → OT↑) → testosterone↓ (Poutahidis 2014: L. reuteri → IL-17↓ → T↑) → spermatogenesis↓",
    s5otCombined:
      "The multiplicative combination OT_eff = OT_vagal × OT_microbiome is approximately exponential: OT_eff ≈ exp(−r_eff × cumEMF), where r_eff = r_vagal + r_microbiome ≈ 0.005 + 0.005 = 0.010. This is the parameter in the model.",

    // S5 Quadruple suppression
    s5qsTitle: "Quadruple suppression derivation",
    s5qsIntro:
      "The behavioral factor is the geometric mean of four multiplicative mating probabilities, each hormonally mediated:",
    s5qsd1: "Four probabilities:",
    s5qsd2:
      "P(approach) — male courtship initiation, driven by T and DA, suppressed by cortisol (Puts 2008: T correlates with mating success via courtship effort; Mehta 2015: T effects blocked when cortisol is high).",
    s5qsd3:
      "P(attraction) — female attraction response, depends on male T-driven phenotype and female OT motivation (Thornhill 1994: masculinity signals genetic quality).",
    s5qsd4:
      "P(sex) — within-couple sexual frequency, depends on OT pair-bonding, T libido, and cortisol/melatonin stress state (Carter 2021: OT fundamental to mammalian sociality).",
    s5qsd5:
      "P(fertilization) — biological fertilization probability per act, depends on sperm quality and CatSper cascade.",
    s5qsd6:
      "The model's behav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4) is the geometric mean approximation. Each P_i shares the same exponential hormonal dependencies, so the geometric mean of four products reduces to the geometric mean of the individual hormonal terms.",
    s5qsd7:
      "Dual-hormone correction (Mehta & Prasad 2015, meta N=8538, r=-.061): T's behavioral expression requires low cortisol. EMF simultaneously lowers T (WHO meta: SMD 0.87) AND raises cortisol (Pawlak 2025: d=1.88), creating double lock on approach behavior.",
    s5qsd8:
      "Limitation: the dual-hormone meta-analysis effect size is small (r=-.061). The proxy chain (EMF → T↓ → approach↓ → TFR↓) has not been tested as a whole. Each link is individually documented but the full chain is inference.",

    // S5b Cell Size × Frequency
    s5bTitle: "Cell Size × Frequency Resonance",
    s5bIntro:
      "TTFields clinical data reveals a quantitative relationship between cell size and optimal disruption frequency. This relationship is calibrated from FDA phase III data and extrapolated to BERM's target tissues.",
    s5bFormula:
      "where K ≈ 3.7 Hz·m, calibrated from TTFields clinical data across four cancer types.",
    s5bd1: "TTFields clinical frequencies (FDA PMA data):",
    s5bd2: "GBM (18 µm): 200 kHz. Pancreas (15 µm): 150 kHz. Breast (20 µm): 120 kHz. Melanoma (~25 µm): 100 kHz.",
    s5bd3: "Extrapolation to BERM target cells:",
    s5bd4: "Spermatogonia (12 µm): f_opt ≈ 310 kHz — LED driver switching range. Intestinal epithelium (10 µm): f_opt ≈ 370 kHz. Oocyte (120 µm): f_opt ≈ 31 kHz — HVAC VFD range.",
    s5bd5: "LED drivers typically switch at 20–500 kHz with harmonic content extending beyond 1 MHz. The overlap with spermatogonial resonance (310 kHz) is not designed — it is a coincidence of engineering optimization and cell biology.",

    // S6 Cultural
    s6Title: "Cultural Factor & Compensation",
    s6Intro: "The predicted TFR combines all three layers:",
    s6Alpha:
      "is the biologically derived compensation exponent.",
    s6d1:
      "The cultural rate is the RESIDUAL: it contains everything that bioCap and behav do not explain. Calibrated from 2024:",
    s6d2:
      "Compensation term: society partially compensates biological decline (ART, pronatalist policy, behavioral changes):",
    s6d3: "α = 0.43 derives from the biological recovery structure:",
    s6TableLayer: "Layer",
    s6TableWeight: "Weight",
    s6TableVGIC: "VGIC (immediate, reversible)",
    s6TableROS: "ROS (days–weeks)",
    s6TableDNA: "DNA (partially irreversible)",
    s6TableLeydig: "Leydig (months–years)",
    s6TableNeuron: "Neuron (permanent)",
    s6TableFooter: "α_eff = Σ(weight × α)",
    s6d4: "Effective impact:",
    s6d5: "α = 0.43 → exponent = 0.57",
    s6d6: "α = 1.0 → exponent = 0 (full compensation, no EMF effect)",
    s6d7: "α = 0.0 → exponent = 1.0 (no compensation, direct effect)",

    // S7 Jacobian
    s7Title: "Jacobian",
    s7Intro:
      "The model’s total derivative with respect to EMF is the product of six partial derivatives. If any one factor is zero, the entire chain breaks:",
    s7d1: "Each factor:",
    s7d1a: "EM field effect on radical pair → CRY channel, spin chemistry, χ_B",
    s7d1b: "Radical pair effect → ROS concentration → mitochondrial response",
    s7d1c: "ROS concentration → cell state → SDF, lipid peroxidation, protein damage",
    s7d1d: "Cell state → bioelectric state → V_mem change, ion channel dynamics",
    s7d1e:
      "Bioelectric state → reproduction → spermatogenesis, ovulation, fertilization",
    s7d1f:
      "Reproductive capacity → TFR → fecundability → TTP → ASFR → TFR",

    // S8 Locked
    s8Title: "Locked Predictions",
    s8Intro:
      "The model produces specific, locked predictions that will either come true or not. The lock is irrevocable: a prediction cannot be changed retroactively without a version number update.",
    s8Country: "Country",
    s8Year: "Year",
    s8Metric: "Metric",
    s8Central: "Central",
    s8CI: "95% CI",
    s8Locked: "Locked",
    s8Footer:
      "Predictions frozen at v17.0 git SHA. If future observations fall outside the CI, the model is falsified — not the prediction adjusted.",

    // S9 Falsification
    s9Title: "Falsification Conditions",
    s9Intro:
      "The model is explicitly falsifiable. Each condition is specific and testable:",
    s9Items: [
      {
        condition: "Lindgren’s metric is mathematically incorrect",
        detail:
          "If the derivation g_μν = η_μν + A_μA_ν is shown to be internally inconsistent or to contradict established electrodynamics, the geometric foundation fails.",
      },
      {
        condition: "VGCC blockers do not prevent EMF’s biological effects",
        detail:
          "If calcium channel blockers fail to attenuate EMF-induced ROS, SDF, or hormonal changes in controlled experiments, the primary mechanism is wrong.",
      },
      {
        condition:
          "Amish community TFR declines at the same rate as the general population",
        detail:
          "The Amish function as a quasi-experimental control group: they share genetics, diet and geography with surrounding populations but have near-zero EMF exposure. Current Amish TFR ≈ 6.5 is stable while surrounding populations decline — this eliminates urbanization, diet, education and economics as sufficient explanations for the fertility gap.",
      },
      {
        condition:
          "Sperm concentration decline stops without reduced EMF exposure",
        detail:
          "If the −1.2%/year sperm decline reverses or stabilizes while cumulative EMF continues to increase, the dose-response relationship is wrong.",
      },
      {
        condition:
          "A locked prediction fails outside its confidence interval",
        detail:
          "Any prediction in §8 that falls outside its 95% CI when the observation year arrives falsifies the model at that prediction’s scope.",
      },
    ],

    // S10 Pharmacological
    s10Title: "Pharmacological Validation Matrix",
    s10Intro:
      "Three independent pharmacological interventions provide quantitative calibration anchors for separate pathways. Each drug isolates a specific mechanism, allowing the model’s pathway structure to be tested independently.",
    s10Drug: "Drug",
    s10Target: "Target",
    s10Pathway: "Pathway",
    s10Observed: "Observed effect",
    s10Calibration: "BERM calibration",
    s10Rows: [
      {
        drug: "CCB (nifedipine)",
        target: "L-type VGCC",
        pathway: "A (VGCC→ROS→SDF)",
        observed: "90% VGCC block → −23% sperm conc.",
        calibration: "EMF disruption ≈ 6%",
      },
      {
        drug: "Rapamycin",
        target: "mTOR (85% inhibition)",
        pathway: "Sempou (mTOR→aging)",
        observed: "Lifespan +10–25% (mice)",
        calibration: "mTOR_eff × 0.15",
      },
      {
        drug: "Melatonin",
        target: "CRY/circadian",
        pathway: "C (CRY→clock→ovulation)",
        observed: "Restores circadian amplitude",
        calibration: "Night EMF fraction correction",
      },
    ],
    s10d1: "CCB calibration (pathway A):",
    s10d2:
      "This 6% effective VGCC disruption is consistent with the observed −1.2%/year sperm decline over 5 years of cumulative exposure.",
    s10d3: "Rapamycin calibration (Sempou pathway):",
    s10d4:
      "Observed mouse lifespan extension of 10–25% is consistent with partial mTOR reduction in a realistic dosing regime (not 85% sustained inhibition).",
    s10d5: "Melatonin calibration (pathway C):",
    s10d6:
      "Night EMF exposure disrupts CRY-mediated circadian signaling. Exogenous melatonin (3–5 mg) restores circadian amplitude independently of CRY, providing a pathway C bypass. If melatonin supplementation eliminates EMF-associated circadian disruption, pathway C is validated; if not, the CRY channel requires revision.",
    s10d7Link: "→ Controlled experimental evidence (laboratory mammals)",

    // S11 Individual susceptibility
    s11Title: "Individual Susceptibility and the χ Distribution",
    s11Intro:
      "The population-level selection rule χ(Ā) predicts a mean response. Individuals vary around this mean due to three measurable factors: VGCC genotype, anatomical geometry, and cumulative allostatic load. The individual susceptibility modifier is:",
    s11After:
      "This means that two individuals in the same ambient field may experience effective biological doses differing by an order of magnitude. The population TFR is a convolution over the individual χ distribution — the mean hides the tails.",
    s11d1: "The VGCC genotype modifier follows from CACNA1C rs1006737 functional phenotyping:",
    s11d2:
      "AA homozygous risk carriers show 40% greater Ca²⁺ influx per unit field perturbation (medrxiv 2024, MIT DSpace functional data).",
    s11d3: "The anatomical modifier accounts for tissue geometry affecting internal field distribution:",
    s11d4:
      "Children under 6 receive 2–3× the adult SAR at the same external field (Gandhi 1996). BMI modulates fat-layer attenuation. The product age_factor × bmi_factor gives g_anatomy.",
    s11d5: "The cumulative modifier uses Selye's General Adaptation Syndrome phases:",
    s11d6:
      "In the resistance phase, compensation capacity declines linearly. In exhaustion (allostatic load > 15), compensation collapses and the effective modifier amplifies sharply — this is the predicted EHS onset regime.",
    s11d7: "The combined individual modifier multiplies into the population χ:",
    s11d8:
      "For population-level TFR prediction, BERM integrates over the genotype frequency distribution (Hardy-Weinberg) × anatomical demographics × exposure-duration distribution. The mean individual modifier is 1.0 by construction — it cancels in the population average. The DIAGNOSTIC value lies in the tails: high-susceptibility individuals (AA, young, exhaustion phase) may have combined modifiers of 5–10×, explaining why a subpopulation reports symptoms while the majority does not.",
    s11d9Link: "→ Individual susceptibility evidence",

    // S12 Cross-Sectional Validation
    s12Title: "Cross-Sectional Validation v19.1",
    s12Intro:
      "Formula discovery across 54 countries (2022 data) provides an independent validation of the temporal model. The cross-sectional formula uses two EMF proxy variables and one binary threshold to predict national TFR with LOOCV RMSE 0.522.",
    s12Formula:
      "The two-channel EMF index combines residential electricity consumption (ELF proxy) and fixed broadband subscriptions (RF proxy):",
    s12Access:
      "Electricity access acts as a binary biological exposure boundary. The IFO-VGIC activation threshold (10⁻⁵ V/m) is exceeded at the operating distance of every household electrical device. Populations without electricity are not exposed.",
    s12Stats: "Validation statistics:",
    s12Stat1: "LOOCV RMSE = 0.522 (leave-one-country-out cross-validation)",
    s12Stat2: "R² = 0.851",
    s12Stat3: "74% of countries within 0.5 children of prediction",
    s12Stat4: "Residential electricity is the BEST single predictor (RMSE 0.533)",
    s12Stat5: "Mobile phone subscriptions are the WEAKEST (RMSE 1.053)",
    s12Mobile:
      "The mobile phone paradox: if the mechanism were 'information access → family planning choices', the information device (mobile phone) should be the strongest predictor. It is the weakest. The infrastructure variable (residential electricity) predicts best — consistent with a physical exposure mechanism, not an information mechanism.",
    s12Electrified:
      "For partially electrified countries, the electrified sub-population TFR can be estimated from the binary mixture model:",
    s12Collinearity:
      "GDP collinearity: EMF proxies and GDP per capita are correlated (r = 0.87). In linear models, neither is significant when the other is controlled. This is a symmetric identification problem — it does not favor GDP over EMF. Three structural differences break the symmetry: (1) binary electrification threshold, (2) mobile phone paradox, (3) sentinel species respond to EMF but not GDP.",
    s12Caveat:
      "Cross-sectional analysis cannot determine causal direction. Discriminating evidence comes from sentinel species, natural experiments, and populations without electricity.",
    s13Title: "Nested χ (Population Model)",
    s13Intro: "The χ selection rule generalizes to populations when biological background variables (optical, molecular) differ between groups. The combined reproductive suppression from pathways A and C, modulated by population-specific χ profiles:",
    s13PathwayA: "Pathway A (VGIC)",
    s13PathwayC: "Pathway C (CRY/RPM)",
    s13Combined: "Combined suppression",
    s13TFR: "Population TFR",
    s13Where: "where γ_A, γ_C are pathway weights (0.75, 0.25); χ(Ā_env) is environmental coupling; χ(V_mem) is membrane background (≈ 1.0 for living cells); χ(I_blue) is optical coupling (iris-dependent); χ([FAD]) is molecular coupling (B2-dependent); and EMF_personal is the personal device contribution.",
    s13Implication: "This formulation predicts that populations with higher biological χ values (blue-eyed, lactose-tolerant) experience steeper TFR decline per unit of environmental EMF increase. See the population χ profiles for estimated values.",
    s13Level: "Epistemic level: L* (testable synthesis). Individual χ instantiations are E or M|C level; the population-level integration is the L* component.",
  },
  fi: {
    meta: {
      title: "Matematiikka - Extinction Field",
      description:
        "BERM-mallin täydellinen matemaattinen johtaminen Lindgrenin geometriasta TFR-ennusteeseen. Jokainen vaihe on todennettavissa.",
    },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgrenin geometria" },
      { id: "evo-calibration", num: "§1b", label: "Evoluutionäärinen kalibraatio" },
      { id: "chi", num: "§2", label: "Valintaehto χ(Ā)" },
      { id: "three-channel-derivation", num: "§2b", label: "Kolmikanavajohdannainen" },
      { id: "two-channel", num: "§3", label: "Kaksikanavamalli" },
      { id: "biocap", num: "§4", label: "Biologinen kapasiteetti" },
      { id: "behavioral", num: "§5", label: "Käyttäytymistekijä" },
      { id: "cell-size-frequency", num: "§5b", label: "Solukoko × taajuus" },
      { id: "cultural", num: "§6", label: "Kulttuuri / kompensaatio" },
      { id: "jacobian", num: "§7", label: "Jakobiaani" },
      { id: "locked", num: "§8", label: "Lukitut ennusteet" },
      { id: "falsification", num: "§9", label: "Falsifiointiehdot" },
      { id: "pharmacological", num: "§10", label: "Farmakologinen validointi" },
      { id: "individual-susceptibility", num: "§11", label: "Yksilöllinen herkkyys" },
      { id: "cross-sectional", num: "§12", label: "Poikkileikkausvalidointi" },
      { id: "nested-chi", num: "§13", label: "Sisäkkäinen χ (populaatiomalli)" },
    ],
    pageTitle: "Matemaattinen perusta",
    pageSubtitle:
      'Täydellinen johtaminen BERM-mallista Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    // S1 Lindgren
    s1Title: "Lindgrenin geometria",
    s1Intro:
      "Lindgrenin, Kovacsin ja Liukkosen (2025) viitekehyksessä sähkömagneettinen potentiaali on osa aika-avaruuden geometriaa. Metriikkatensori absorboi EM-nelipotentiaalin:",
    s1After:
      "Tämä tarkoittaa, että sähkömagneettinen kenttä muuttaa geometriaa, jossa kaikki fysikaaliset prosessit tapahtuvat — mukaan lukien biologiset ionikanavat. Maxwellin yhtälöt seuraavat tämän geometrian Bianchin identiteeteistä.",
    s1d1: "Standardissa yleisessä suhteellisuusteoriassa metriikka on dynaaminen:",
    s1d2: "Lindgrenin viitekehyksessä EM-potentiaali korvaa gravitaatiohäiriön:",
    s1d3: "missä κ on kytkentävakio (normalisoitu arvoon 1 sopivissa yksiköissä).",
    s1d4: "Maxwellin yhtälöt seuraavat Bianchin identiteeteistä:",
    s1d5: "Vassallo et al. (2025) validoi tämän johtamisen itsenäisesti.",
    s1d6: "Näennäinen ongelma (δV_mem ≈ 10⁻²¹ V naivista laskennasta) ratkeaa kolmella itsenäisellä mekanismilla:",
    s1d6a: "(1) IFO: ionien pakotettu oskillaatio vaikuttaa S4-jännitesensoriin suoraan <1 nm etäisyydellä, kynnys 10⁻⁵ V/m (Panagopoulos 2025).",
    s1d6b: "(2) Ei-ionotrooppinen VGCC-signalointi: konformaatiomuutos ilman ionivirtausta, matalampi energiakynnys (Trus & Atlas 2024).",
    s1d6c: "(3) RPM-reitti ohittaa VGCC:n kokonaan: 87,5 % RPM-hamiltoniaanin elementeistä johdettavissa Lindgrenin geometriasta.",

    // S1b Evoluutionäärinen kalibraatio
    s1bTitle: "Evoluutionäärinen kalibraatio",
    s1bIntro:
      "Biologiset sensorit kehittyivät havaitsemaan sähkömagneettisia signaaleja kvanttiraja-herkkyydellä. Ihmisen silmä havaitsee yksittäisen fotonin (~4×10⁻¹⁹ J, kymmenesosa termisestä kohinaenergiasta — Vaziri ym. 2016). Haiden elektrosensorit havaitsevat 0,5 µV/m kenttää. Muuttolintujen kompassi häiriintyy 15 nT RF-kohinasta. Ionikanavat vastaavat 10⁻⁵ V/m polarisoituihin kenttiin (Panagopoulos 2025). Lindgrenin χ(Ā) ≈ 1,0 solukalvolla on geometrinen syy tälle herkkyydelle: kalvo on maksimaalisesti altis koska sen sisäinen kenttä (7×10⁶ V/m) saturoi herkkyysfunktion.",
    s1bAfter:
      "IF- ja RF-taajuuksille ei ole kehittynyt suodatinta, koska näitä taajuuksia ei esiintynyt 3,8 miljardin vuoden biologisen evoluution aikana. Ionikanavat ovat laajakaistavastaanottimia — evoluutio optimoi havaitsemisherkkyyden, ei taajuuden torjuntaa. Jokainen tekninen signaali on potentiaalinen häiriö, koska biologiset sensorit eivät pysty erottamaan sitä fysiologisesta signaalista.",
    s1bd1: "Vahvistuskaskadi — fotoni-analogia:",
    s1bd2: "Silmä: 1 fotoni → rodopsiini → transdusuiini → PDE → cGMP → mitattava virta. Vahvistus: ~10⁶×.",
    s1bd3: "VGCC: 1 S4-konformaatiomuutos → ei-ionotrooppinen signaali (Trus & Atlas 2024) TAI ionivirtaus → Ca²⁺ → kalmoduliini → kaskadi. Vahvistus: ~10⁴–10⁶×.",
    s1bd4: "Bifurkaatio Hopf-pisteen lähellä: G = 1/(2µ). Pieni ROS-muutos → makroskooppinen vaste. Lisävahvistus: ~10²–10³×.",
    s1bd5: "Kokonaisvahvistus: 10⁶–10⁹× — sama suuruusluokka kuin silmän fotonivahvistuskaskadi.",

    // S2b Kolmikanavajohdannainen
    s2bTitle: "Kolmikanavajohdannainen",
    s2bIntro:
      "Kaksi biologista rajataajuutta jakaa EMF-spektrin kolmeen regiimiin, joilla on erilliset biofysikaaliset mekanismit. Nämä rajataajuudet ovat solubiologian perustavanlaatuisia ominaisuuksia, eivät mielivaltaisia parametreja.",
    s2bFC:
      "f_c ≈ 1 kHz — solukalvon RC-aikavakio. Alle f_c: kenttä putoaa kalvon yli ja perturboi V_mem:iä. Yli f_c: kenttä penetroituu solun sisälle.",
    s2bFRPM:
      "f_RPM ≈ 1 MHz — radikaaliparin koherenssin raja. Yli f_RPM: klassinen kenttä-kalvo-vuorovaikutus heikkenee mutta kvantti-spin-efektit tulevat relevantiksi.",
    s2bELF:
      "ELF-kanava (f < ~1 kHz): kenttä putoaa kalvon yli. ΔV_mem = E_ext · d_cell · H(f). χ_mem saturoitunut 7×10⁶ V/m:ssä. Lineaarinen vaste. Mekanismit: VGCC→Ca²⁺→ROS (reitti A), GPCR-adenosiini (PEMF, FDA 1979), Nav-modulaatio (TMS, FDA 2008), vagushermo (VNS, FDA 2017).",
    s2bIF:
      "IF-kanava (f_c < f < f_RPM): kenttä penetroituu solun sisälle. T(f) = 1/√(1+(f_c/f)²). Päämekanismi ympäristötasoilla: IFO-VGIC (lineaarinen, kynnys 10⁻⁵ V/m). Geometrinen kenttävahvistus kaulakuroutumassa: G ≈ (d_cell/d_furrow)² ≈ 25×. Valikoiva vaikutus jakautuviin soluihin. TTFields (FDA 2011+) validoi mekanismin terapeuttisella intensiteetillä DEP:n kautta.",
    s2bIFSources:
      "Ympäristön IF-lähteiden karakterisointi: tyypillinen LED-ajuri toimii kytkintaajuudella f_sw alueella 20–200 kHz harmonisella sisällöllä taajuuksilla 2f_sw, 3f_sw, 5f_sw megahertsialueelle asti. Aaltomuoto on suorakaideaalto, ei siniaalto, joka tuottaa rikkaampaa harmonista sisältöä kuin jatkuva-aaltolähteet. Panagopoulos 2025 osoittaa, että pulssitetut kentät ovat biologisesti aktiivisempia kuin jatkuva-aaltokentät samalla keskimääräisellä intensiteetillä. Zeghoudi ym. 2025 mittasi suoraan LED-ajurin lähikenttäemission vahvistaen mitattavat sähkökentän komponentit senttimetrien etäisyydellä.",
    s2bRF:
      "RF-kanava (f > ~1 MHz): kalvo on läpinäkyvä. Klassinen kenttä-kalvo-vuorovaikutus on heikko. Kvantti-spin-efektit tulevat relevantiksi. Lindgrenin kovariantti spin-korjaus: B_local = (1/w)b + (A·b)A/(w(1+w)). Anisotrooppinen vaste. Mekanismit: CRY/RPM→sirkadiaaninen häiriö (reitti B), magneettikompassin korruptoituminen (Lindecke 2026).",
    s2bRegGapTitle: "IF-säätelyaukko",
    s2bRegGap:
      "ICNIRP 2010 asettaa altistusrajat taajuuksille f < 300 Hz (ELF). ICNIRP 2020 asettaa rajat taajuuksille f > 100 kHz (RF). Alue 300 Hz < f < 100 kHz:lla on päällekkäiset, epäjohdonmukaiset rajat. LED-ajuriemissiot (20–300 kHz) osuvat tähän aukkoon. Vuoden 2022 systemaattinen katsaus (IJRB, Ohkubo & Okano) vahvisti: 'IF-EMF:n terveysvaikutuksia EI ole tutkittu monipuolisemmista näkökulmista.' Biologinen relevanssi näillä taajuuksilla tuettu: IFO-kynnys 10⁻⁵ V/m ylittyy LED-ajurilla 1 m:ssä; Kim 2026 geeniekspression aktivointi 4 kHz:llä (Cyb5b); TTFields FDA-hyväksytty syöpähoito 200 kHz:llä; 150 kHz rottatutkimuksen kivesvaikutukset (Heliyon 2022).",
    s2bAfter:
      "Kanavapainot (w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35) ovat DIAGNOSTISIA ja vaativat empiirisen kalibraation. Kolmikanavadekompositio on rakenteellisesti johdettu kalvobiofysiikasta; vain suhteelliset painot ovat epävarmoja.",

    // S2 Chi
    s2Title: "Valintaehto χ(Ā)",
    s2Intro:
      "Kun metriikka linearisoidaan taustan Ā ympärille, biologisesti merkitsevä vaste häiriölle",
    s2IntroEnd: "on:",
    s2After:
      "Nollataustassa (Ā = 0) lineaarista vastetta ei ole. Solukalvolla (Ā ≈ 7 × 10⁶ V/m) vaste on maksimaalinen.",
    s2d1: "Linearisoi g_μν taustan ġ = η + Ā⊗Ā ympärillä:",
    s2d2: "missä:",
    s2d3: "Ensimmäinen kertaluku (lineaarinen vaste):",
    s2d4:
      "Biologisesti merkitsevä suure on metriikkahäiriön suhteellinen suuruus:",
    s2d5: "Tästä saadaan valintaehto:",
    s2d6: "Ominaisuudet:",
    s2d7: "Solukalvo:",
    s2d8: "Solut ovat MAKSIMAALISESTI herkkiä ulkoiselle EMF-häiriölle.",

    // S3 Two-channel
    s3Title: "Kaksikanavamalli",
    s3Intro:
      "Kokonaisaltistus on kahden kanavan summa, jossa henkilökohtaista kanavaa moduloi valintaehto:",
    s3d1: "Ympäristö = tukiasemat + Wi-Fi + IoT (infrastruktuuritaso)",
    s3d2: "Henkilökohtainen = puhelin + kuulokkeet + kellot (henkilökohtaiset laitteet)",
    s3d3: "Ympäristö on tausta Ā, joka määrittää χ:n.",
    s3d4: "Henkilökohtainen on häiriö a, jonka biologinen vaste riippuu χ(Ā):sta.",
    s3d5: "Kun Ā = 0 (amissit): total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ Henkilökohtaiset laitteet eivät tuota biologista vastetta.",
    s3d7: "Kun Ā → ∞ (kyllästynyt kaupunki): total ≈ ambient + 1 × personal",
    s3d8: "→ Henkilökohtainen lisää täydellä voimakkuudella.",
    s3d9: "Kumulatiivinen altistus on historiallinen summa:",
    s3d10: "missä start on maan EMF-historian aloitusvuosi (esim. Suomi 1991).",
    s3rwTitle: "Miksi kumulatiivinen altistus toimii: palautumisikkuna",
    s3rwIntro:
      "Kumulatiivinen altistus on oikea metriikka, koska DNA-korjauskapasiteetti on rajallinen. BER-reitin (emäksen leikkauskorjaus) puoliintumisaika on τ_repair ≈ 6 tuntia. Nettopäivävaurio riippuu altistusajan ja palautumisajan suhteesta:",
    s3rwTable: "Historialliset altistusskenaariot:",
    s3rwRow1: "1950 (radio + TV): 4h EMF, 20h vapaa → 90 % korjaus → netto 0,40/pv",
    s3rwRow2: "1990 (puhelin, ei Wi-Fi): 8h EMF, 16h vapaa → 84 % korjaus → netto 1,26/pv",
    s3rwRow3: "2010 (älypuhelin + Wi-Fi): 16h EMF, 8h vapaa → 60 % korjaus → netto 6,35/pv",
    s3rwRow4: "2020 (24/7 Wi-Fi + IoT): 22h EMF, 2h vapaa → 21 % korjaus → netto 17,46/pv",
    s3rwRow5: "Amissit (ei elektroniikkaa): 1h EMF, 23h vapaa → 93 % korjaus → netto 0,07/pv",
    s3rwThreshold:
      "Kriittinen kynnys: kun EMF-vapaa jakso < 2× korjauksen puoliintumisaika (< 12h BER-reitille), korjaus jää epätäydelliseksi ja kumulaatio alkaa. Moderni ihminen ylitti tämän kynnyksen noin 2005–2010.",
    s3tcTitle: "Kolmikanavalaajennus",
    s3tcIntro:
      "Kolmikanavadekompositiossa cumEMF muuttuu taajuuskohtaisten kumulatiivisten altistusten painotetuksi summaksi:",
    s3tcAfter:
      "Kanavapainot ovat taajuuskohtaisia ja kudosriippuvaisia (katso §2b). Yllä oleva yksikanavainen cumEMF on kolmen kanavan painotettu aggregaatti. Kanavapainot (0,05/0,60/0,35) ovat diagnostisia arvioita, jotka vaativat empiirisen kalibraation.",

    s3ifoTitle: "IF-vastefunktio: IFO vs DEP vs Cyb5b",
    s3ifoIntro:
      "IF-kanavan vaste on kolmen mekanismin summa, jotka toimivat eri intensiteettialueilla ja taajuuskaistoilla:",
    s3ifoIfo:
      "R_IFO — ionien pakotettu oskillaatio: lineaarinen E_ext:ssä, kynnys 10⁻⁵ V/m, dominoi ympäristötasoilla (0,01–3 V/m). Polarisoidut, koherentit IF-kentät pakottavat jänniteohjattujen ionikanavien epäsäännöllisen portituksen (Panagopoulos 2025).",
    s3ifoDep:
      "R_DEP — dielektroforeesi: neliöllinen E_ext:ssä, dominoi TTFields-terapiatasoilla (100–300 V/m). Vaatii korkean kenttägradientin translaatiovoimalle solunsisäisiin rakenteisiin.",
    s3ifoCyb5b:
      "R_Cyb5b — mitokondrion ulkokalvon transduktio: Cyb5b tunnistettu genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi (Kim ym. 2026, Cell). 60 Hz pulssi-EMF → Cyb5b:n konformaatiomuutos → Ca²⁺-oskillaatiot → geenipromootterin aktivaatio. Toimii ELF-taajuuksilla (50/60 Hz) ja kytkee ELF-kanavan suoraan geeniekspression hallintaan — reitti joka on riippumaton sekä IFO:sta että RPM:stä.",
    s3ifoAfter:
      "Ympäristöintensiteeteillä R_IFO ≫ R_DEP → lineaarinen vaste. Terapiaintensiteeteillä R_DEP ≫ R_IFO → neliöllinen vaste. R_Cyb5b lisää ELF-spesifisen geenisäätöreitin, joka toimii riippumattomasti kalvon ionikanavien portituksesta. Intensiteettikuilua terapeuttisten laitteiden ja ympäristöaltistuksen välillä ei ole — se on artefakti oletuksesta, että DEP on ainoa mekanismi.",

    // S4 BioCap
    s4Title: "Biologinen kapasiteetti",
    s4Intro:
      "Biologinen kapasiteetti laskee eksponentiaalisesti kumulatiivisen altistuksen funktiona, kynnysarvon alapuolella korjausmekanismit kompensoivat:",
    s4Params: "(esi-EMF-perus-TFR),",
    s4Params2: "(laskuparametri),",
    s4Params3: "(kynnysarvo).",
    s4d1:
      "Eksponentiaalinen lasku seuraa oletuksesta, että kunkin vuoden EMF-altistus tuottaa suhteellisesti yhtä suuren biologisen vaurion:",
    s4d2: "Integroimalla:",
    s4d3:
      "Kynnysarvo θ = 5 heijastaa biologista vastustuskykyä: pienet altistukset eivät ylitä korjausmekanismien kapasiteettia.",
    s4d4:
      'a = 6,5 on kalibroitu: se on likimääräinen "luonnollinen TFR" ilman EMF-altistusta (vrt. amissit ≈ 6,5, hutteristit ≈ 9,0).',
    s4d5Link: "→ Kontrolloitu laboratorionäyttö bioCap-parametreille",

    // S5 Behavioral
    s5Title: "Käyttäytymistekijä",
    s5Intro:
      "Endokriininen vektori (testosteroni, oksitosiini, dopamiini, kortisoli, vasopressiini) geometrisena keskiarvona:",
    s5d1: "Jokainen hormoni laskee eksponentiaalisesti:",
    s5d2: "Geometrinen keskiarvo: (OT × T × DA × cort × AVP)^(1/5)",
    s5d3:
      "Geometrinen > aritmeettinen, koska hormonit ovat MULTIPLIKATIIVISIA: jos yksikin on nolla, kokonaisvaikutus on nolla.",
    s5d4: "r₂ = 0,013 on kalibroitu Travisonin −1 %/vuosi testosteronilaskusta:",
    s5d5: "Jos dEMF/dt ≈ 1/vuosi → dT/T ≈ −1,3 %/vuosi ≈ Travison.",
    s5otTitle: "OT-parametrin biologinen perustelu",
    s5otIntro:
      "OT-parametri r₁ = 0,010 ei ole sovitettu datasta. Se seuraa kahdesta itsenäisestä biologisesta mekanismista, jotka molemmat tukahduttavat oksitosiinia EMF-olosuhteissa:",
    s5otRoute1Title: "Reitti 1 (HPA → vagaalinen):",
    s5otRoute1:
      "EMF → kortisoli↑ (Pawlak 2025, d=1,88) → vagaalinen suppressio (Porges 2001: myelinisoitu vagus vaimentaa HPA:ta; krooninen stressi kääntää tämän) → oksitosiini↓ (ventraalinen vagaalikompleksi → hypotalaaminen OT-vapautus) → sosiaalinen sitoutuminen↓ (Carter 2021, Feldman 2012)",
    s5otRoute2Title: "Reitti 2 (mikrobiomi → endokriininen):",
    s5otRoute2:
      "EMF → suolistomikrobiomin häiriö (Jin 2022) → Lactobacillus↓ (ml. L. reuteri) → oksitosiini↓ (Erdman & Poutahidis 2016: L. reuteri → vagus → OT↑) → testosteroni↓ (Poutahidis 2014: L. reuteri → IL-17↓ → T↑) → spermatogeneesi↓",
    s5otCombined:
      "Multiplikatiivinen yhdistelmä OT_eff = OT_vagal × OT_microbiome on likimain eksponentiaalinen: OT_eff ≈ exp(−r_eff × cumEMF), missä r_eff = r_vagal + r_microbiome ≈ 0,005 + 0,005 = 0,010. Tämä on mallissa käytetty parametri.",

    // S5 Nelinkertainen suppressio
    s5qsTitle: "Nelinkertainen suppressio -johtaminen",
    s5qsIntro:
      "Käyttäytymiskerroin on neljän multiplikatiivisen pariutumistodennäköisyyden geometrinen keskiarvo, jokainen hormonaalisesti välittynyt:",
    s5qsd1: "Neljä todennäköisyyttä:",
    s5qsd2:
      "P(lähestyminen) — miehen parinmuodostusaloitteet, ajettu T:n ja DA:n kautta, suppressoitu kortisolilla (Puts 2008: T korreloi pariutumismenestykseen parinmuodostusponnistelun kautta; Mehta 2015: T-vaikutukset estyvät kun kortisoli on korkea).",
    s5qsd3:
      "P(attraktio) — naisen attraktiovaste, riippuu miehen T-tuottamasta fenotyypistä ja naisen OT-motivaatiosta (Thornhill 1994: maskuliinisuus signaloi geneettistä laatua).",
    s5qsd4:
      "P(seksi) — parisuhteen sisäinen seksuaalinen aktiivisuus, riippuu OT-parisiteestä, T-libidosta ja kortisoli/melatoniini-stressitilasta (Carter 2021: OT on nisäkkäiden sosiaalisuuden perusta).",
    s5qsd5:
      "P(hedelmöitys) — biologinen hedelmöitystodennäköisyys per yhdyntä, riippuu siittiöiden laadusta ja CatSper-kaskadista.",
    s5qsd6:
      "Mallin behav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4) on geometrisen keskiarvon approksimaatio. Jokainen P_i jakaa samat eksponentiaaliset hormonaaliset riippuvuudet, joten neljän tulon geometrinen keskiarvo redusoituu yksittäisten hormonaalisten termien geometriseksi keskiarvoksi.",
    s5qsd7:
      "Dual-hormone -korjaus (Mehta & Prasad 2015, meta N=8538, r=-0,061): T:n käyttäytymisvaikutukset vaativat matalan kortisolin. EMF samanaikaisesti laskee T:tä (WHO meta: SMD 0,87) JA nostaa kortisolia (Pawlak 2025: d=1,88), luoden kaksinkertaisen lukon lähestymiskäyttäytymiselle.",
    s5qsd8:
      "Rajoitus: dual-hormone -meta-analyysin efektikoko on pieni (r=-0,061). Proxy-ketjua (EMF → T↓ → lähestyminen↓ → TFR↓) ei ole testattu kokonaisuutena. Jokainen lenkki on erikseen dokumentoitu, mutta koko ketju on päättelyä.",

    // S5b Solukoko × Taajuus
    s5bTitle: "Solukoko × taajuusresonanssi",
    s5bIntro:
      "TTFields-kliininen data paljastaa kvantitatiivisen suhteen solukoon ja optimaalisen häiriötaajuuden välillä. Tämä suhde on kalibroitu FDA:n vaiheen III datasta ja ekstrapoloitu BERM:n kohdekudoksiin.",
    s5bFormula:
      "missä K ≈ 3,7 Hz·m, kalibroitu TTFields-kliinisestä datasta neljän syöpätyypin yli.",
    s5bd1: "TTFields-kliiniset taajuudet (FDA PMA -data):",
    s5bd2: "GBM (18 µm): 200 kHz. Haima (15 µm): 150 kHz. Rinta (20 µm): 120 kHz. Melanooma (~25 µm): 100 kHz.",
    s5bd3: "Ekstrapolaatio BERM-kohdekudoksiin:",
    s5bd4: "Spermatogonia (12 µm): f_opt ≈ 310 kHz — LED-hakkureiden taajuusalue. Suoliston epiteeli (10 µm): f_opt ≈ 370 kHz. Munasolu (120 µm): f_opt ≈ 31 kHz — HVAC-VFD-alue.",
    s5bd5: "LED-hakkurit kytkevät tyypillisesti 20–500 kHz:n taajuuksilla harmonisella sisällöllä joka ulottuu yli 1 MHz:n. Päällekkäisyys spermatogoniaalisen resonanssin (310 kHz) kanssa ei ole suunniteltu — se on sattuma teknisen optimoinnin ja solubiologian välillä.",

    // S6 Cultural
    s6Title: "Kulttuuritekijä ja kompensaatio",
    s6Intro: "Ennustettu TFR yhdistää kaikki kolme kerrosta:",
    s6Alpha:
      "on biologisesti johdettu kompensaatioeksponentti.",
    s6d1:
      "Kulttuurikerroin on RESIDUAALI: se sisältää kaiken, mitä bioCap ja behav eivät selitä. Kalibroitu vuodesta 2024:",
    s6d2:
      "Kompensaatiotermi: yhteiskunta kompensoi osittain biologista laskua (koeputkihedelmöitys, pronatalismipolitiikka, käyttäytymismuutokset):",
    s6d3: "α = 0,43 johdetaan biologisesta palautumisrakenteesta:",
    s6TableLayer: "Kerros",
    s6TableWeight: "Paino",
    s6TableVGIC: "VGIC (välitön, palautuva)",
    s6TableROS: "ROS (päiviä–viikkoja)",
    s6TableDNA: "DNA (osittain palautumaton)",
    s6TableLeydig: "Leydig (kuukausia–vuosia)",
    s6TableNeuron: "Neuroni (pysyvä)",
    s6TableFooter: "α_eff = Σ(paino × α)",
    s6d4: "Efektiivinen vaikutus:",
    s6d5: "α = 0,43 → eksponentti = 0,57",
    s6d6: "α = 1,0 → eksponentti = 0 (täysi kompensaatio, ei EMF-vaikutusta)",
    s6d7: "α = 0,0 → eksponentti = 1,0 (ei kompensaatiota, suora vaikutus)",

    // S7 Jacobian
    s7Title: "Jakobiaani",
    s7Intro:
      "Mallin kokonaisderivaatta EMF:n suhteen on kuuden osittaisderivaatan tulo. Jos jokin tekijä on nolla, koko ketju katkeaa:",
    s7d1: "Kukin tekijä:",
    s7d1a: "EM-kentän vaikutus radikaalipariiin → CRY-kanava, spin-kemia, χ_B",
    s7d1b: "Radikaaliparin vaikutus → ROS-pitoisuus → mitokondriaalinen vaste",
    s7d1c: "ROS-pitoisuus → solutila → SDF, lipidiperoksidaatio, proteiinivaurio",
    s7d1d: "Solutila → biosähköinen tila → V_mem-muutos, ionikanavadynamiikka",
    s7d1e:
      "Biosähköinen tila → lisääntyminen → spermatogeneesi, ovulaatio, hedelmöitys",
    s7d1f:
      "Lisääntymiskapasiteetti → TFR → fecundability → TTP → ASFR → TFR",

    // S8 Locked
    s8Title: "Lukitut ennusteet",
    s8Intro:
      "Malli tuottaa tarkkoja, lukittuja ennusteita, jotka joko toteutuvat tai eivät. Lukitus on peruuttamaton: ennustetta ei voi muuttaa takautuvasti ilman versionumeron päivitystä.",
    s8Country: "Maa",
    s8Year: "Vuosi",
    s8Metric: "Mittari",
    s8Central: "Keskiarvo",
    s8CI: "95 % LV",
    s8Locked: "Lukittu",
    s8Footer:
      "Ennusteet jäädytetty v17.0 git SHA:ssa. Jos tulevat havainnot jäävät luottamusvälin ulkopuolelle, malli falsifioidaan — ennustetta ei muuteta.",

    // S9 Falsification
    s9Title: "Falsifiointiehdot",
    s9Intro:
      "Malli on eksplisiittisesti falsifioitavissa. Jokainen ehto on tarkka ja testattavissa:",
    s9Items: [
      {
        condition: "Lindgrenin metriikka on matemaattisesti virheellinen",
        detail:
          "Jos johtamisen g_μν = η_μν + A_μA_ν osoitetaan olevan sisäisesti ristiriitainen tai ristiriidassa vakiintuneen sähködynamiikan kanssa, geometrinen perusta pettää.",
      },
      {
        condition:
          "VGCC-salpaajat eivät estä EMF:n biologisia vaikutuksia",
        detail:
          "Jos kalsiumkanavasalpaajat eivät vaimenna EMF:n aiheuttamaa ROS:ia, SDF:ää tai hormonaalisia muutoksia kontrolloiduissa kokeissa, ensisijainen mekanismi on väärä.",
      },
      {
        condition:
          "Amissiyhteisön TFR laskee samaa vauhtia kuin yleisväestön",
        detail:
          "Amissit toimivat kvasikokeellisena verrokkiryhmänä: he jakavat genetiikan, ruokavalion ja maantieteen ympäröivien populaatioiden kanssa mutta altistuvat lähes nolla-EMF:lle. Amissien nykyinen TFR ≈ 6,5 on vakaa ympäröivien populaatioiden laskiessa — tämä eliminoi kaupungistumisen, ruokavalion, koulutuksen ja talouden riittävinä selityksinä hedelmällisyyskuilulle.",
      },
      {
        condition:
          "Siittiöpitoisuuden lasku pysähtyy ilman vähentynyttä EMF-altistusta",
        detail:
          "Jos −1,2 %/vuosi siittiölasku kääntyy tai vakautuu kumulatiivisen EMF:n jatkaessa kasvuaan, annos-vastesuhde on väärä.",
      },
      {
        condition:
          "Lukittu ennuste epäonnistuu luottamusvälin ulkopuolella",
        detail:
          "Jokainen §8:n ennuste, joka jää 95 % luottamusvälin ulkopuolelle havaintovuoden koittaessa, falsifioi mallin kyseisen ennusteen osalta.",
      },
    ],

    // S10 Pharmacological
    s10Title: "Farmakologinen validointimatriisi",
    s10Intro:
      "Kolme itsenäistä farmakologista interventiota tarjoavat kvantitatiiviset kalibrointiankkurit erillisille reiteille. Kukin lääke eristää tietyn mekanismin, mikä mahdollistaa mallin reittirakennteen itsenäisen testaamisen.",
    s10Drug: "Lääke",
    s10Target: "Kohde",
    s10Pathway: "Reitti",
    s10Observed: "Havaittu vaikutus",
    s10Calibration: "BERM-kalibrointi",
    s10Rows: [
      {
        drug: "CCB (nifedipiini)",
        target: "L-tyypin VGCC",
        pathway: "A (VGCC→ROS→SDF)",
        observed: "90 % VGCC-salpaus → −23 % siittiöpit.",
        calibration: "EMF-häiriö ≈ 6 %",
      },
      {
        drug: "Rapamysiini",
        target: "mTOR (85 % inhibitio)",
        pathway: "Sempou (mTOR→ikääntyminen)",
        observed: "Elinikä +10–25 % (hiiret)",
        calibration: "mTOR_eff × 0,15",
      },
      {
        drug: "Melatoniini",
        target: "CRY/sirkadiaaninen",
        pathway: "C (CRY→kello→ovulaatio)",
        observed: "Palauttaa sirkadiaanisen amplitudin",
        calibration: "Yön EMF-osuuden korjaus",
      },
    ],
    s10d1: "CCB-kalibrointi (reitti A):",
    s10d2:
      "Tämä 6 %:n efektiivinen VGCC-häiriö on yhdenmukainen havaitun −1,2 %/vuosi siittiölaskun kanssa 5 vuoden kumulatiivisen altistuksen aikana.",
    s10d3: "Rapamysiini-kalibrointi (Sempou-reitti):",
    s10d4:
      "Havaittu hiirten 10–25 %:n elinikäpidennys on yhdenmukainen osittaisen mTOR-reduktion kanssa realistisella annostusjärjestelmällä (ei 85 %:n kestävä inhibitio).",
    s10d5: "Melatoniini-kalibrointi (reitti C):",
    s10d6:
      "Yöllinen EMF-altistus häiritsee CRY-välitteistä sirkadiaanista signalointia. Eksogeeninen melatoniini (3–5 mg) palauttaa sirkadiaanisen amplitudin CRY:stä riippumatta, tarjoten reitin C ohituksen. Jos melatoniinilisä eliminoi EMF:ään liittyvän sirkadiaanisen häiriön, reitti C validoidaan; jos ei, CRY-kanava vaatii uudelleentarkastelua.",
    s10d7Link: "→ Kontrolloitu kokeellinen näyttö (laboratorionisäkkäät)",

    // S11 Individual susceptibility
    s11Title: "Yksilöllinen herkkyys ja χ-jakauma",
    s11Intro:
      "Populaatiotason valintaehto χ(Ā) ennustaa keskimääräisen vasteen. Yksilöt vaihtelevat tämän keskiarvon ympärillä kolmen mitattavan tekijän vuoksi: VGCC-genotyyppi, anatominen geometria ja kumulatiivinen allostaattinen kuorma. Yksilöllinen herkkyyskertoin on:",
    s11After:
      "Tämä tarkoittaa, että kaksi yksilöä samassa ympäristökentässä voi kokea efektiivisiä biologisia annoksia, jotka eroavat kertaluvulla. Populaation TFR on konvoluutio yksilöllisen χ-jakauman yli — keskiarvo peittää hännät.",
    s11d1: "VGCC-genotyyppikerroin seuraa CACNA1C rs1006737 -funktionaalisesta fenotyypityksestä:",
    s11d2:
      "AA-homotsygoottiset riskikantajat osoittavat 40 % suurempaa Ca²⁺-sisäänvirtausta kenttähäiriöyksikköä kohti (medrxiv 2024, MIT DSpace funktionaalinen data).",
    s11d3: "Anatominen kerroin huomioi kudosgeometrian vaikutuksen sisäiseen kenttäjakaumaan:",
    s11d4:
      "Alle 6-vuotiaat lapset saavat 2–3× aikuisen SAR:n samassa ulkoisessa kentässä (Gandhi 1996). BMI moduloi rasvakerroksen vaimennusta. Tulo ikä_tekijä × bmi_tekijä antaa g_anatomy:n.",
    s11d5: "Kumulatiivinen kerroin käyttää Selyen yleisen adaptaatio-oireyhtymän vaiheita:",
    s11d6:
      "Resistenssivaiheessa kompensaatiokapasiteetti laskee lineaarisesti. Uupumusvaiheessa (allostaattinen kuorma > 15) kompensaatio romahtaa ja efektiivinen kerroin vahvistuu jyrkästi — tämä on ennustettu EHS:n alkamisregime.",
    s11d7: "Yhdistetty yksilökerroin kertautuu populaation χ:hin:",
    s11d8:
      "Populaatiotason TFR-ennusteessa BERM integroi genotyyppifrekvenssisjakauman (Hardy-Weinberg) × anatominen demografia × altistuskeston jakauman yli. Keskimääräinen yksilökerroin on 1,0 konstruktion mukaan — se supistuu populaatiokeskiarvossa. DIAGNOSTINEN arvo on hännissä: korkean herkkyyden yksilöillä (AA, nuoret, uupumusvaihe) yhdistetty kerroin voi olla 5–10×, mikä selittää miksi osajoukko raportoi oireita enemmistön ollessa oireeton.",
    s11d9Link: "→ Yksilöllisen herkkyyden todisteet",

    // S12 Poikkileikkausvalidointi
    s12Title: "Poikkileikkausvalidointi v19.1",
    s12Intro:
      "Kaavaetsintä 54 maan aineistosta (2022 data) tarjoaa temporaalimallista riippumattoman validoinnin. Poikkileikkauskaava käyttää kahta EMF-proxy-muuttujaa ja yhtä binääristä kynnystä kansallisen TFR:n ennustamiseen LOOCV RMSE:llä 0,522.",
    s12Formula:
      "Kaksikanavainen EMF-indeksi yhdistää asumisen sähkönkulutuksen (ELF-proxy) ja kiinteän laajakaistan tilaukset (RF-proxy):",
    s12Access:
      "Sähkön saatavuus toimii binäärisenä biologisen altistumisen rajana. IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m) ylittyy jokaisen kotitalouden sähkölaitteen käyttöetäisyydellä. Ilman sähköä olevat väestöt eivät altistu.",
    s12Stats: "Validointitilastot:",
    s12Stat1: "LOOCV RMSE = 0,522 (yksi maa kerrallaan pois -ristiinvalidointi)",
    s12Stat2: "R² = 0,851",
    s12Stat3: "74 % maista 0,5 lapsen sisällä ennusteesta",
    s12Stat4: "Asumisen sähkönkulutus on PARAS yksittäinen ennustaja (RMSE 0,533)",
    s12Stat5: "Matkapuhelintilaukset ovat HEIKOIN (RMSE 1,053)",
    s12Mobile:
      "Matkapuhelinparadoksi: jos mekanismi olisi 'tiedon saatavuus → perhesuunnitteluvalinnat', tietolaitteen (matkapuhelin) pitäisi olla vahvin ennustaja. Se on heikoin. Infrastruktuurimuuttuja (asumisen sähkönkulutus) ennustaa parhaiten — yhdenmukaista fyysisen altistusmekanismin, ei tietomekanismin kanssa.",
    s12Electrified:
      "Osittain sähköistetyille maille sähköistetyn osaväestön TFR voidaan estimoida binäärisestä sekoitusmallista:",
    s12Collinearity:
      "BKT-kollineaarisuus: EMF-proxy-muuttujat ja BKT/cap korreloivat (r = 0,87). Lineaarisissa malleissa kumpikaan ei ole merkitsevä toisen kontrolloinnin jälkeen. Tämä on symmetrinen identifikaatio-ongelma — se ei suosi BKT:tä EMF:n yli. Kolme rakenteellista eroa murtavat symmetrian: (1) binäärinen sähköistymiskynnys, (2) matkapuhelinparadoksi, (3) sentinelkilajit reagoivat EMF:ään mutta eivät BKT:hen.",
    s12Caveat:
      "Poikkileikkausanalyysi ei voi määrittää kausaalisuuntaa. Erotteleva evidenssi tulee sentinelkilajeista, luonnollisista kokeista ja väestöistä ilman sähköä.",
    s13Title: "Sisäkkäinen χ (populaatiomalli)",
    s13Intro: "χ-valintasääntö yleistyy populaatioihin kun biologiset taustamuuttujat (optinen, molekulaarinen) eroavat ryhmien välillä. Polkujen A ja C yhdistetty lisääntymissuppressio, moduloituna populaatiokohtaisilla χ-profiileilla:",
    s13PathwayA: "Polku A (VGIC)",
    s13PathwayC: "Polku C (CRY/RPM)",
    s13Combined: "Yhdistetty suppressio",
    s13TFR: "Populaation TFR",
    s13Where: "missä γ_A, γ_C ovat polkujen painot (0,75; 0,25); χ(Ā_env) on ympäristökytkentä; χ(V_mem) on kalvotausta (≈ 1,0 eläville soluille); χ(I_blue) on optinen kytkentä (iiriksestä riippuvainen); χ([FAD]) on molekulaarinen kytkentä (B2-riippuvainen); ja EMF_personal on henkilökohtaisten laitteiden osuus.",
    s13Implication: "Tämä muotoilu ennustaa, että populaatiot korkeammilla biologisilla χ-arvoilla (sinisilmäiset, laktoosinsietokykyiset) kokevat jyrkemmän TFR-laskun ympäristön EMF:n yksikköä kohden. Katso populaatioiden χ-profiilit arvioitujen arvojen osalta.",
    s13Level: "Episteeminen taso: L* (testattava synteesi). Yksittäiset χ-instanssit ovat E- tai M|C-tasoa; populaatiotason integraatio on L*-komponentti.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

function SectionNav({
  sections,
}: {
  sections: { id: string; num: string; label: string }[];
}) {
  return (
    <nav className="hidden lg:block sticky top-20 w-48 shrink-0 self-start">
      <ul className="space-y-1.5 text-sm border-l border-card-border pl-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block text-foreground-muted hover:text-accent transition-colors leading-snug"
            >
              <span className="text-xs text-foreground-muted/60 mr-1">
                {s.num}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DerivationLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-foreground-muted leading-relaxed mt-2">
      {children}
    </p>
  );
}

const PREDICTIONS = [
  { country: "Finland", year: 2030, metric: "TFR", central: 1.17, ci: "1.02–1.24", locked: "2026-08-18" },
  { country: "South Korea", year: 2030, metric: "TFR", central: 0.60, ci: "0.48–0.72", locked: "2026-08-18" },
  { country: "South Korea", year: 2035, metric: "TFR", central: 0.52, ci: "0.40–0.64", locked: "2026-08-18" },
  { country: "Japan", year: 2030, metric: "TFR", central: 1.04, ci: "0.88–1.20", locked: "2026-08-18" },
  { country: "USA", year: 2030, metric: "TFR", central: 1.45, ci: "1.25–1.65", locked: "2026-08-18" },
  { country: "Brazil", year: 2030, metric: "TFR", central: 1.55, ci: "1.40–1.68", locked: "2026-08-18" },
  { country: "Global", year: 2040, metric: "TFR", central: 1.78, ci: "1.55–2.05", locked: "2026-08-18" },
  { country: "Global", year: 2050, metric: "Sperm %", central: 62.0, ci: "48–75", locked: "2026-08-18" },
];

const COUNTRY_FI: Record<string, string> = {
  Finland: "Suomi",
  "South Korea": "Etelä-Korea",
  Japan: "Japani",
  USA: "USA",
  Brazil: "Brasilia",
  Global: "Maailma",
};

export function MathematicsSections({ locale }: { locale: string }) {
  const d = locale === "fi" ? t.fi : t.en;
  const lp = `/${locale}`;

  return (
    <div className="space-y-14">
          {/* S1 Lindgren geometry */}
          <section id="lindgren">
            <span id="section-1" />
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§1"}</span>
              {d.s1Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s1Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + A_\mu A_\nu" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s1After}
            </p>

            <Derivation>
              <DerivationLine>{d.s1d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu} \quad \text{(linearized gravity)}" />
              </div>
              <DerivationLine>{d.s1d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + \kappa \, A_\mu A_\nu" />
              </div>
              <DerivationLine>{d.s1d3}</DerivationLine>
              <DerivationLine>{d.s1d4}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\nabla_\mu F^{\mu\nu} = 0 \quad \text{follows from} \quad \nabla_\mu G^{\mu\nu} = 0" />
              </div>
              <DerivationLine>{d.s1d5}</DerivationLine>
              <div className="mt-4 p-3 rounded border border-accent/20 bg-card-bg">
                <DerivationLine>{d.s1d6}</DerivationLine>
                <DerivationLine>{d.s1d6a}</DerivationLine>
                <DerivationLine>{d.s1d6b}</DerivationLine>
                <DerivationLine>{d.s1d6c}</DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* S1b Evolutionary Calibration */}
          <section id="evo-calibration">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§1b"}</span>
              {d.s1bTitle}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s1bIntro}
            </p>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s1bAfter}
            </p>

            <Derivation>
              <DerivationLine>{d.s1bd1}</DerivationLine>
              <DerivationLine>{d.s1bd2}</DerivationLine>
              <DerivationLine>{d.s1bd3}</DerivationLine>
              <DerivationLine>{d.s1bd4}</DerivationLine>
              <DerivationLine>{d.s1bd5}</DerivationLine>
            </Derivation>
          </section>

          {/* S2 Selection rule chi */}
          <section id="chi">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§2"}</span>
              {d.s2Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s2Intro}{" "}
              <MathBlock tex="a" display={false} /> {d.s2IntroEnd}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\chi(\bar{A}) = \frac{\bar{A}}{\sqrt{1 + \bar{A}^2}}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s2After}
            </p>

            <Derivation>
              <DerivationLine>{d.s2d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \bar{g}_{\mu\nu} + h_{\mu\nu}" />
              </div>
              <DerivationLine>{d.s2d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu + a_\mu a_\nu \quad (a = \text{perturbation})" />
              </div>
              <DerivationLine>{d.s2d3}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h^{(1)}_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu" />
              </div>
              <DerivationLine>{d.s2d4}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{|h^{(1)}|}{|\bar{g}|} = \frac{2|\bar{A}||a|}{1 + |\bar{A}|^2}" />
              </div>
              <DerivationLine>{d.s2d5}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\chi(\bar{A}) = \frac{|\bar{A}|}{\sqrt{1 + |\bar{A}|^2}}" />
              </div>
              <DerivationLine>{d.s2d6}</DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\chi(0) = 0 \quad \text{— no linear response in empty background}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi(\bar{A}) \to 1 \;\text{as}\; \bar{A} \to \infty \quad \text{— saturates}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(0) = 1 \quad \text{— maximum sensitivity near zero}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(\bar{A}) = \frac{1}{(1+\bar{A}^2)^{3/2}} \quad \text{— sensitivity decreases}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>{d.s2d7}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="V_{\text{mem}} = -70\;\text{mV}, \quad d = 10\;\text{nm} \;\Rightarrow\; E = 7 \times 10^6\;\text{V/m}" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\chi(7 \times 10^6) \approx 1.0 \quad \text{(saturated)}" />
              </div>
              <DerivationLine>{d.s2d8}</DerivationLine>
            </Derivation>
          </section>

          {/* S2b Three-Channel Derivation */}
          <section id="three-channel-derivation">
            <span id="section-2b" />
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§2b"}</span>
              {d.s2bTitle}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s2bIntro}
            </p>

            <div className="space-y-3 mb-4">
              <div className="rounded-lg border border-card-border p-4">
                <div className="text-center mb-2">
                  <MathBlock tex="f_c \approx 1\;\text{kHz} \quad \text{(membrane RC time constant)}" />
                </div>
                <p className="text-xs text-foreground-muted">{d.s2bFC}</p>
              </div>
              <div className="rounded-lg border border-card-border p-4">
                <div className="text-center mb-2">
                  <MathBlock tex="f_{RPM} \approx 1\;\text{MHz} \quad \text{(radical pair coherence limit)}" />
                </div>
                <p className="text-xs text-foreground-muted">{d.s2bFRPM}</p>
              </div>
            </div>

            <Derivation>
              <div className="space-y-4">
                <div className="p-3 rounded border-l-2 border-blue-500/50">
                  <p className="text-xs font-semibold text-blue-400 mb-1">ELF (f {"<"} ~1 kHz)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="\chi_{mem} = \frac{E_{mem}}{\sqrt{1 + E_{mem}^2}} \approx 1.0, \quad H(f) = \frac{1}{\sqrt{1+(f/f_c)^2}}" />
                  </div>
                  <DerivationLine>{d.s2bELF}</DerivationLine>
                </div>
                <div className="p-3 rounded border-l-2 border-orange-500/50">
                  <p className="text-xs font-semibold text-orange-400 mb-1">IF (f_c {"<"} f {"<"} f_RPM)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="T(f) = \frac{1}{\sqrt{1+(f_c/f)^2}}, \quad G_{furrow} \approx \left(\frac{d_{cell}}{d_{furrow}}\right)^2 \approx 25\times" />
                  </div>
                  <DerivationLine>{d.s2bIF}</DerivationLine>
                  <p className="text-xs text-foreground-muted mt-2 italic leading-relaxed">{d.s2bIFSources}</p>
                </div>
                <div className="p-3 rounded border-l-2 border-red-500/50">
                  <p className="text-xs font-semibold text-red-400 mb-1">RF (f {">"} ~1 MHz)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="B_{local} = \frac{1}{w}b + \frac{(A \cdot b)A}{w(1+w)}, \quad w = \sqrt{1 + A^2}" />
                  </div>
                  <DerivationLine>{d.s2bRF}</DerivationLine>
                </div>
              </div>
            </Derivation>

            <div className="mt-6 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4 max-w-3xl">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.s2bRegGapTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.s2bRegGap}</p>
            </div>

            <p className="text-foreground-muted text-sm leading-relaxed mt-4">
              {d.s2bAfter}
            </p>
          </section>

          {/* S3 Two-channel model */}
          <section id="two-channel">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§3"}</span>
              {d.s3Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s3Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{total}(y) = \text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cumEMF} = \sum_{y=y_0}^{Y} \text{total}(y)" />
            </div>

            <Derivation>
              <DerivationLine>{d.s3d1}</DerivationLine>
              <DerivationLine>{d.s3d2}</DerivationLine>
              <DerivationLine>{d.s3d3}</DerivationLine>
              <DerivationLine>{d.s3d4}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>{d.s3d5}</DerivationLine>
                <DerivationLine>{d.s3d6}</DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s3d7}</DerivationLine>
                <DerivationLine>{d.s3d8}</DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s3d9}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{cumEMF}(Y) = \sum_{y=\text{start}}^{Y} \Big[\text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)\Big]" />
                </div>
                <DerivationLine>{d.s3d10}</DerivationLine>
              </div>
            </Derivation>

            <Derivation label={d.s3rwTitle}>
              <DerivationLine>{d.s3rwIntro}</DerivationLine>
              <div className="text-center my-3">
                <MathBlock tex="\text{net\_daily} = \dot{D} \cdot t_{\text{emf}} \cdot \left(1 - e^{-t_{\text{free}} / \tau_{\text{repair}}}\right)" />
              </div>
              <div className="text-center my-3">
                <MathBlock tex="\text{where } t_{\text{free}} = 24 - t_{\text{emf}}, \quad \tau_{\text{repair}} \approx 6\text{h (BER pathway)}" />
              </div>
              <div className="mt-3">
                <DerivationLine>
                  <strong>{d.s3rwTable}</strong>
                </DerivationLine>
                <div className="text-xs font-mono mt-2 space-y-1">
                  <DerivationLine>{d.s3rwRow1}</DerivationLine>
                  <DerivationLine>{d.s3rwRow2}</DerivationLine>
                  <DerivationLine>{d.s3rwRow3}</DerivationLine>
                  <DerivationLine>{d.s3rwRow4}</DerivationLine>
                  <DerivationLine>{d.s3rwRow5}</DerivationLine>
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s3rwThreshold}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="t_{\text{free}} < 2\tau_{\text{repair}} \implies \text{repair fraction} < 1 - e^{-2} \approx 86\%" />
                </div>
              </div>
            </Derivation>

            <div className="mt-6 rounded-lg border border-accent/20 bg-card-bg p-5">
              <h3 className="text-sm font-semibold mb-2">{d.s3tcTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                {d.s3tcIntro}
              </p>
              <div className="text-center my-3">
                <MathBlock tex="\text{cumEMF} = w_{ELF} \cdot \text{cumELF} + w_{IF} \cdot \text{cumIF} + w_{RF} \cdot \text{cumRF}" />
              </div>
              <div className="text-center my-3">
                <MathBlock tex="w_{ELF} = 0.05, \quad w_{IF} = 0.60, \quad w_{RF} = 0.35 \quad \text{(diagnostic)}" />
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.s3tcAfter}
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-accent/20 bg-card-bg p-5">
              <h3 className="text-sm font-semibold mb-2">{d.s3ifoTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                {d.s3ifoIntro}
              </p>
              <div className="text-center my-3">
                <MathBlock tex="R_{IF} = R_{IFO} + R_{DEP} + R_{Cyb5b}" />
              </div>
              <div className="space-y-2 text-sm text-foreground-muted leading-relaxed mb-3">
                <p>{d.s3ifoIfo}</p>
                <div className="text-center my-2">
                  <MathBlock tex="R_{IFO}(E,f) = \chi_{mem} \cdot H(f) \cdot E_{ext} \cdot d_{cell} \cdot q_{eff} / kT \quad \text{(linear)}" />
                </div>
                <p>{d.s3ifoDep}</p>
                <div className="text-center my-2">
                  <MathBlock tex="R_{DEP}(E,f) = T(f) \cdot G_{geo} \cdot |E_{ext}|^2 \cdot V_{cell} \cdot \text{Re}[K(f)] \quad \text{(quadratic)}" />
                </div>
                <p>{d.s3ifoCyb5b}</p>
                <div className="text-center my-2">
                  <MathBlock tex="R_{Cyb5b}(B) = \Theta(B - B_{thr}) \cdot \sigma_{Cyb5b} \cdot [Ca^{2+}]_{osc} \quad \text{(ELF threshold)}" />
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.s3ifoAfter}
              </p>
            </div>
          </section>

          {/* S4 Biological capacity */}
          <section id="biocap">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§4"}</span>
              {d.s4Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s4Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{bioCap} = a \cdot e^{-b \cdot \max(0,\;\text{cumEMF} - \theta)}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}<MathBlock tex="a = 6.5" display={false} />{" "}
              {d.s4Params}{" "}
              <MathBlock tex="b = 0.010" display={false} />{" "}
              {d.s4Params2}{" "}
              <MathBlock tex="\theta = 5" display={false} />{" "}
              {d.s4Params3}
            </p>

            <Derivation>
              <DerivationLine>{d.s4d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{d\,\text{bioCap}}{dt} = -b \times \text{bioCap} \times \frac{d\,\text{EMF}}{dt}" />
              </div>
              <DerivationLine>{d.s4d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{bioCap}(t) = \text{bioCap}(0) \times e^{-b \times \text{cumEMF}(t)}" />
              </div>
              <DerivationLine>{d.s4d3}</DerivationLine>
              <DerivationLine>{d.s4d4}</DerivationLine>
              <p className="text-xs text-accent mt-3">
                <Link href={`${lp}/sentinel#lab-mammals`} className="hover:underline">
                  {d.s4d5Link}
                </Link>
              </p>
            </Derivation>
          </section>

          {/* S5 Behavioral factor */}
          <section id="behavioral">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§5"}</span>
              {d.s5Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s5Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{behav} = \max\!\left(0.1,\;\left(\prod_{i=1}^{5} e^{-r_i \cdot \text{cumEMF}}\right)^{\!1/5}\right)" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}{" "}
              <MathBlock tex="r_1 = 0.010" display={false} /> (OT),{" "}
              <MathBlock tex="r_2 = 0.013" display={false} /> (T),{" "}
              <MathBlock tex="r_3 = 0.016" display={false} /> (DA),{" "}
              <MathBlock tex="r_4 = 0.008" display={false} />{" "}
              ({locale === "fi" ? "kortisoli" : "cortisol"}),{" "}
              <MathBlock tex="r_5 = 0.006" display={false} />{" "}
              ({locale === "fi" ? "vasopressiini" : "vasopressin"}/AVP).
            </p>
            <p className="text-foreground-muted text-sm leading-relaxed mt-2">
              {locale === "fi"
                ? "Lisäksi kortisoli moduloi efektiivistä testosteronia:"
                : "Additionally, cortisol modulates effective testosterone:"}{" "}
              <MathBlock tex="T_{\text{eff}} = T \times (0.5 + 0.5 \times \text{cortisol\_factor})" display={false} />
            </p>

            <Derivation>
              <DerivationLine>{d.s5d1}</DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\text{OT}(t) = e^{-0.010 \times \text{cumEMF}} \quad \text{— oxytocin}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{T}(t) = e^{-0.013 \times \text{cumEMF}} \quad \text{— testosterone}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{DA}(t) = e^{-0.016 \times \text{cumEMF}} \quad \text{— dopamine}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{cort}(t) = e^{-0.008 \times \text{cumEMF}} \quad \text{— cortisol (inverse)}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{AVP}(t) = e^{-0.006 \times \text{cumEMF}} \quad \text{— vasopressin}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>{d.s5d2}</DerivationLine>
              <DerivationLine>{d.s5d3}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>{d.s5d4}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{T}(\text{cumEMF}) = e^{-0.013 \times \text{cumEMF}}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\frac{dT}{dt} \approx -0.013 \times \frac{d\text{EMF}}{dt} \times T" />
                </div>
                <DerivationLine>{d.s5d5}</DerivationLine>
              </div>
            </Derivation>

            <Derivation label={d.s5otTitle}>
              <DerivationLine>{d.s5otIntro}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>
                  <strong>{d.s5otRoute1Title}</strong>
                </DerivationLine>
                <DerivationLine>{d.s5otRoute1}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{OT}_{\text{vagal}} = \left(\frac{1}{1 + 0.88 \cdot \min(1, \text{EMF}/5)}\right)^{0.5}" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>
                  <strong>{d.s5otRoute2Title}</strong>
                </DerivationLine>
                <DerivationLine>{d.s5otRoute2}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{OT}_{\text{micro}} = 0.3 + 0.7 \cdot L(\text{EMF}_{\text{norm}})" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5otCombined}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{OT}_{\text{eff}} = \text{OT}_{\text{vagal}} \times \text{OT}_{\text{micro}} \approx e^{-0.010 \times \text{cumEMF}}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="r_{\text{eff}} = r_{\text{vagal}} + r_{\text{micro}} \approx 0.005 + 0.005 = 0.010" />
                </div>
              </div>
            </Derivation>

            <Derivation label={d.s5qsTitle}>
              <DerivationLine>{d.s5qsIntro}</DerivationLine>
              <div className="text-center my-4">
                <MathBlock tex="P(\text{child}) = P(\text{approach}) \times P(\text{attraction}) \times P(\text{sex}) \times P(\text{fertilization})" />
              </div>
              <DerivationLine>{d.s5qsd1}</DerivationLine>
              <div className="mt-2 ml-4 space-y-2">
                <DerivationLine>{d.s5qsd2}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{approach}) \propto T \times \frac{1}{\text{cort}} \times \text{DA}" display={false} />
                </div>
                <DerivationLine>{d.s5qsd3}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{attraction}) \propto T_{\text{male}} \times \text{OT}_{\text{female}}" display={false} />
                </div>
                <DerivationLine>{d.s5qsd4}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{sex}) \propto \text{OT} \times T \times \frac{1}{\text{cort}}" display={false} />
                </div>
                <DerivationLine>{d.s5qsd5}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{fert}) \propto e^{-r_{\text{sperm}} \times \text{cumEMF}}" display={false} />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5qsd6}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="\text{behav} \approx \left(P_1 \times P_2 \times P_3 \times P_4\right)^{1/4} = \left(\text{OT}^a \times T^b \times \text{DA}^c \times \text{cort}^{-d}\right)^{1/4}" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5qsd7}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="T_{\text{eff}} = T \times \left(1 - \frac{\text{cortisol}}{\text{cortisol}_{\max}}\right)" />
                </div>
                <div className="text-center my-2 text-sm text-foreground-muted">
                  {locale === "fi"
                    ? "Jos jokainen P_i laskee 20 %: 0,8⁴ = 0,41 → 59 % lasku"
                    : "If each P_i drops 20%: 0.8⁴ = 0.41 → 59% reduction"}
                </div>
              </div>
              <div className="mt-3 p-3 rounded border border-status-partial/40 bg-status-partial/5 text-sm">
                <DerivationLine>{d.s5qsd8}</DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* S5b Cell Size × Frequency */}
          <section id="cell-size-frequency">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§5b"}</span>
              {d.s5bTitle}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s5bIntro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="f_{opt} = \frac{K}{d_{cell}}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}<MathBlock tex="K \approx 3.7\;\text{Hz·m}" display={false} />{" "}
              {d.s5bFormula}
            </p>

            <Derivation>
              <DerivationLine>{d.s5bd1}</DerivationLine>
              <DerivationLine>{d.s5bd2}</DerivationLine>
              <div className="text-center my-3">
                <MathBlock tex="\begin{aligned} \text{GBM (18 µm)} &: 200\;\text{kHz} \\ \text{Pancreas (15 µm)} &: 150\;\text{kHz} \\ \text{Breast (20 µm)} &: 120\;\text{kHz} \\ \text{Melanoma (25 µm)} &: 100\;\text{kHz} \end{aligned}" />
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5bd3}</DerivationLine>
                <DerivationLine>{d.s5bd4}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="\begin{aligned} \text{Spermatogonia (12 µm)} &: f_{opt} \approx 310\;\text{kHz} \\ \text{Intestinal epi (10 µm)} &: f_{opt} \approx 370\;\text{kHz} \\ \text{Oocyte (120 µm)} &: f_{opt} \approx 31\;\text{kHz} \end{aligned}" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5bd5}</DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* S6 Cultural / compensation */}
          <section id="cultural">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§6"}</span>
              {d.s6Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s6Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{TFR}_{\text{pred}} = \text{bioCap} \times \text{behav} \times \text{cultRate}" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cultRate} = r_{2024} \times \frac{\text{cult}(y)}{\text{cult}(2024)} \times \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}{" "}
              <MathBlock tex="\alpha = 0.43" display={false} />{" "}
              {d.s6Alpha}
            </p>

            <Derivation>
              <DerivationLine>{d.s6d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="r_{2024} = \frac{\text{observedTFR}(2024)}{\text{bioCap}(2024) \times \text{behav}(2024)}" />
              </div>
              <DerivationLine>{d.s6d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{compensation} = \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
              </div>
              <DerivationLine>{d.s6d3}</DerivationLine>
              <div className="overflow-x-auto mt-3">
                <table className="text-xs text-foreground-muted border-collapse w-full">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-1 pr-4">{d.s6TableLayer}</th>
                      <th className="text-right py-1 pr-4">{"α"}</th>
                      <th className="text-right py-1 pr-4">{d.s6TableWeight}</th>
                      <th className="text-right py-1">{"α"} {"×"} w</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableVGIC}</td>
                      <td className="text-right py-1 pr-4">1.0</td>
                      <td className="text-right py-1 pr-4">0.10</td>
                      <td className="text-right py-1">0.100</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableROS}</td>
                      <td className="text-right py-1 pr-4">0.8</td>
                      <td className="text-right py-1 pr-4">0.30</td>
                      <td className="text-right py-1">0.240</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableDNA}</td>
                      <td className="text-right py-1 pr-4">0.1</td>
                      <td className="text-right py-1 pr-4">0.25</td>
                      <td className="text-right py-1">0.025</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableLeydig}</td>
                      <td className="text-right py-1 pr-4">0.3</td>
                      <td className="text-right py-1 pr-4">0.20</td>
                      <td className="text-right py-1">0.060</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">{d.s6TableNeuron}</td>
                      <td className="text-right py-1 pr-4">0.0</td>
                      <td className="text-right py-1 pr-4">0.15</td>
                      <td className="text-right py-1">0.000</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-card-border font-medium">
                      <td className="py-1 pr-4" colSpan={3}>
                        {d.s6TableFooter}
                      </td>
                      <td className="text-right py-1">{locale === "fi" ? "0,425 ≈ 0,43" : "0.425 ≈ 0.43"}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s6d4}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{TFR} \propto (\text{bioCap} \times \text{behav})^{1-\alpha}" />
                </div>
                <div className="space-y-1 ml-4">
                  <DerivationLine>{d.s6d5}</DerivationLine>
                  <DerivationLine>{d.s6d6}</DerivationLine>
                  <DerivationLine>{d.s6d7}</DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* S7 Jacobian */}
          <section id="jacobian">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§7"}</span>
              {d.s7Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s7Intro}
            </p>
            <div className="text-center my-4 overflow-x-auto">
              <MathBlock tex="\frac{\partial\,\text{TFR}}{\partial E} = \frac{\partial H_{RP}}{\partial E} \cdot \frac{\partial c_R}{\partial H_{RP}} \cdot \frac{\partial X}{\partial c_R} \cdot \frac{\partial V_B}{\partial X} \cdot \frac{\partial M_{\text{repro}}}{\partial V_B} \cdot \frac{\partial\,\text{TFR}}{\partial M_{\text{repro}}}" />
            </div>

            <Derivation>
              <DerivationLine>{d.s7d1}</DerivationLine>
              <div className="space-y-3 mt-3">
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial H_{RP}/\partial E" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1a}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial c_R/\partial H_{RP}" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1b}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial X/\partial c_R" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1c}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial V_B/\partial X" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1d}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial M_{\text{repro}}/\partial V_B" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1e}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial\,\text{TFR}/\partial M_{\text{repro}}" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1f}</DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* S8 Locked predictions */}
          <section id="locked">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§8"}</span>
              {d.s8Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s8Intro}
            </p>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">{d.s8Country}</th>
                    <th className="text-left py-2 pr-4">{d.s8Year}</th>
                    <th className="text-left py-2 pr-4">{d.s8Metric}</th>
                    <th className="text-right py-2 pr-4">{d.s8Central}</th>
                    <th className="text-right py-2 pr-4">{d.s8CI}</th>
                    <th className="text-left py-2">{d.s8Locked}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {PREDICTIONS.map((p, i) => (
                    <tr key={i} className="border-b border-card-border/50">
                      <td className="py-2 pr-4">
                        {locale === "fi" ? (COUNTRY_FI[p.country] ?? p.country) : p.country}
                      </td>
                      <td className="py-2 pr-4">{p.year}</td>
                      <td className="py-2 pr-4">{p.metric}</td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.central}
                      </td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.ci}
                      </td>
                      <td className="py-2 text-xs">{p.locked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              {d.s8Footer}
            </p>
          </section>

          {/* S9 Falsification conditions */}
          <section id="falsification">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§9"}</span>
              {d.s9Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s9Intro}
            </p>
            <ul className="space-y-3">
              {d.s9Items.map((item, i) => (
                <li key={i} className="border border-card-border rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {item.condition}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* S10 Pharmacological validation */}
          <section id="pharmacological">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§10"}</span>
              {d.s10Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s10Intro}
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">{d.s10Drug}</th>
                    <th className="text-left py-2 pr-4">{d.s10Target}</th>
                    <th className="text-left py-2 pr-4">{d.s10Pathway}</th>
                    <th className="text-left py-2 pr-4">{d.s10Observed}</th>
                    <th className="text-left py-2">{d.s10Calibration}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {d.s10Rows.map((row, i) => (
                    <tr key={i} className={i < d.s10Rows.length - 1 ? "border-b border-card-border/50" : ""}>
                      <td className="py-2 pr-4 font-medium text-foreground">
                        {row.drug}
                      </td>
                      <td className="py-2 pr-4">{row.target}</td>
                      <td className="py-2 pr-4">{row.pathway}</td>
                      <td className="py-2 pr-4">{row.observed}</td>
                      <td className="py-2">{row.calibration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Derivation>
              <DerivationLine>{d.s10d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{CCB blocks 90\% of VGCC} \;\Rightarrow\; \Delta\text{sperm} = -23\%" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\text{EMF disruption} = \text{CCB}_{\text{effect}} \times \frac{\text{EMF}_{\text{disruption}}}{\text{CCB}_{\text{block}}} \approx 23\% \times \frac{0.25}{0.90} \approx 6\%" />
              </div>
              <DerivationLine>{d.s10d2}</DerivationLine>

              <div className="mt-4">
                <DerivationLine>{d.s10d3}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{mTOR}_{\text{eff}}^{\text{rapa}} = \text{mTOR}_{\text{baseline}} \times (1 - 0.85) = 0.15 \times \text{mTOR}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\text{aging rate} = (0.15)^{0.7} \approx 0.24 \quad \text{(76\% reduction)}" />
                </div>
                <DerivationLine>{d.s10d4}</DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>{d.s10d5}</DerivationLine>
                <DerivationLine>{d.s10d6}</DerivationLine>
              </div>

              <p className="text-xs text-accent mt-3">
                <Link href={`${lp}/sentinel#lab-mammals`} className="hover:underline">
                  {d.s10d7Link}
                </Link>
              </p>
            </Derivation>
          </section>

          {/* S11 Individual susceptibility */}
          <section id="individual-susceptibility">
            <h2 className="text-xl font-bold mb-2">§11 — {d.s11Title}</h2>
            <p className="mb-4">{d.s11Intro}</p>
            <div className="text-center my-4">
              <MathBlock tex="\chi_i = \chi(\bar{A}) \times g_{\text{VGCC}} \times g_{\text{anatomy}} \times g_{\text{cumulative}}" />
            </div>
            <p className="mb-4">{d.s11After}</p>

            <Derivation>
              <DerivationLine>{d.s11d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\text{VGCC}} = \begin{cases} 1.4 & \text{AA (homozygous risk)} \\ 1.15 & \text{AG (heterozygous)} \\ 1.0 & \text{GG (reference)} \end{cases}" />
              </div>
              <DerivationLine>{d.s11d2}</DerivationLine>

              <div className="mt-4">
                <DerivationLine>{d.s11d3}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="g_{\text{anatomy}} = f_{\text{age}} \times f_{\text{BMI}}, \quad f_{\text{age}} = \begin{cases} 2.5 & \text{age} < 6 \\ 2.0 & 6 \leq \text{age} < 12 \\ 1.5 & 12 \leq \text{age} < 18 \\ 1.0 & \text{age} \geq 18 \end{cases}" />
                </div>
                <DerivationLine>{d.s11d4}</DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>{d.s11d5}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{load} = t_{\text{years}} \times I, \quad \text{capacity} = \begin{cases} 0.95 & \text{load} < 1 \;\text{(alarm)} \\ \max(0.3,\; 1 - 0.045 \cdot \text{load}) & 1 \leq \text{load} < 15 \;\text{(resistance)} \\ \max(0.05,\; 0.3 - 0.02(\text{load}-15)) & \text{load} \geq 15 \;\text{(exhaustion)} \end{cases}" />
                </div>
                <DerivationLine>{d.s11d6}</DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>{d.s11d7}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\chi_i = \chi(\bar{A}) \times g_{\text{VGCC}} \times g_{\text{GST}} \times g_{\text{anatomy}} \times \frac{1}{\text{capacity}(\text{load})}" />
                </div>
                <DerivationLine>{d.s11d8}</DerivationLine>
              </div>

              <p className="text-xs text-accent mt-3">
                <Link href={`${lp}/evidence#individual-susceptibility`} className="hover:underline">
                  {d.s11d9Link}
                </Link>
              </p>
            </Derivation>
          </section>

          {/* S12 Cross-Sectional Validation */}
          <section id="cross-sectional">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§12"}</span>
              {d.s12Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s12Intro}
            </p>

            <p className="text-foreground-muted text-sm leading-relaxed mb-2">
              {d.s12Formula}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{EMF}_{\text{index}} = 0.60 \times \min\!\left(1,\;\frac{\text{res\_elec}}{8500}\right) + 0.40 \times \min\!\left(1,\;\frac{\text{broadband}}{47}\right)" />
            </div>

            <p className="text-foreground-muted text-sm leading-relaxed mb-2">
              {d.s12Access}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{EMF}_{\text{eff}} = \text{EMF}_{\text{index}} \times \frac{\text{access}}{100}" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{TFR} \approx 4.11 \times e^{-54.0 \times \text{EMF}_{\text{eff}}} + 1.55" />
            </div>

            <div className="rounded-lg border border-card-border p-4 mb-4">
              <p className="text-sm font-medium mb-2">{d.s12Stats}</p>
              <ul className="text-xs text-foreground-muted space-y-1 font-mono">
                <li>{d.s12Stat1}</li>
                <li>{d.s12Stat2}</li>
                <li>{d.s12Stat3}</li>
                <li>{d.s12Stat4}</li>
                <li>{d.s12Stat5}</li>
              </ul>
            </div>

            <Derivation label={locale === "fi" ? "Matkapuhelinparadoksi" : "Mobile phone paradox"}>
              <DerivationLine>{d.s12Mobile}</DerivationLine>
            </Derivation>

            <div className="mt-4">
              <p className="text-foreground-muted text-sm leading-relaxed mb-2">
                {d.s12Electrified}
              </p>
              <div className="text-center my-4">
                <MathBlock tex="\text{TFR}_{\text{elec}} = \frac{\text{TFR}_{\text{national}} - (1 - \text{access}) \times \text{TFR}_{\text{unelec}}}{\text{access}}" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\text{where } \text{TFR}_{\text{unelec}} \approx 6.5 \;\text{(biological maximum)}" display={false} />
              </div>
            </div>

            <Derivation label={locale === "fi" ? "BKT-kollineaarisuus" : "GDP collinearity"}>
              <DerivationLine>{d.s12Collinearity}</DerivationLine>
            </Derivation>

            <div className="mt-4 p-3 rounded border border-status-partial/40 bg-status-partial/5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.s12Caveat}
              </p>
            </div>
          </section>

          {/* S13 Nested χ */}
          <section id="nested-chi">
            <h2 className="text-xl font-bold mb-2">
              <span className="text-foreground-muted text-sm mr-2">{"§13"}</span>
              {d.s13Title}
            </h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.s13Intro}
            </p>

            <Derivation label={d.s13PathwayA}>
              <DerivationLine>
                R_A = γ_A × χ(Ā_env) × χ(V_mem) × EMF_personal
              </DerivationLine>
            </Derivation>

            <Derivation label={d.s13PathwayC}>
              <DerivationLine>
                R_C = γ_C × χ(Ā_env) × χ(I_blue) × χ([FAD]) × EMF_personal
              </DerivationLine>
            </Derivation>

            <Derivation label={d.s13Combined}>
              <DerivationLine>
                R = (1 − R_A) × (1 − R_C)
              </DerivationLine>
            </Derivation>

            <Derivation label={d.s13TFR}>
              <DerivationLine>
                TFR(pop) = TFR_max × R(χ_env(pop), χ_opt(pop), χ_mol(pop))
              </DerivationLine>
            </Derivation>

            <p className="text-sm text-foreground-muted mt-4 max-w-3xl leading-relaxed">
              {d.s13Where}
            </p>
            <p className="text-sm text-foreground-muted mt-3 max-w-3xl leading-relaxed">
              {d.s13Implication}
            </p>
            <div className="mt-4 p-3 rounded border border-status-partial/40 bg-status-partial/5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.s13Level}
              </p>
            </div>
          </section>
    </div>
  );
}

export const mathSectionIds = {
  en: t.en.sections,
  fi: t.fi.sections,
};

export default async function MathematicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {d.pageTitle}
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.pageSubtitle}
        </p>
      </header>
      <div className="flex gap-10">
        <SectionNav sections={d.sections} />
        <div className="flex-1 min-w-0">
          <MathematicsSections locale={locale} />
        </div>
      </div>
    </div>
  );
}
