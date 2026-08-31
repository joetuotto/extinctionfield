import type { Metadata } from "next";
import Link from "next/link";
import { MathBlock } from "@/components/MathBlock";
import { Derivation } from "@/components/Derivation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

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
      { id: "layered-formula", num: "§14", label: "Layered formula v20→v21" },
      { id: "recovery-function", num: "§15", label: "Recovery function" },
    ],
    pageTitle: "Mathematical Foundation",
    pageSubtitle:
      'Complete derivation of the BERM model from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    // S1 Lindgren
    s1Title: "Lindgren Geometry",
    s1Intro:
      "In the framework of [[ref:lindgren2025|Lindgren, Kovacs & Liukkonen (2025)]], the electromagnetic potential is part of spacetime geometry. The metric tensor absorbs the EM four-potential:",
    s1After:
      "This means the electromagnetic field changes the geometry in which all physical processes occur — including biological ion channels. Maxwell’s equations emerge as Bianchi identities of this geometry.",
    s1d1: "In standard GR the metric is dynamical:",
    s1d2: "In Lindgren’s framework, the EM potential replaces the gravitational perturbation:",
    s1d3: "where κ is a coupling constant (normalized to 1 in suitable units).",
    s1d4: "Maxwell’s equations follow from the Bianchi identities:",
    s1d5: "[[ref:vassallo2025|Vassallo et al. (2025)]] validated this derivation independently.",
    s1d6: "The apparent problem (δV_mem ≈ 10⁻²¹ V from naive calculation) is resolved by three independent mechanisms:",
    s1d6a: "(1) IFO: ion forced oscillation acts on the S4 voltage sensor directly at <1 nm distance, threshold 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s1d6b: "(2) Non-ionotropic VGCC signaling: conformational change without ion flux, lower energy threshold ([[ref:trus2024|Trus & Atlas 2024]]).",
    s1d6c: "(3) RPM pathway bypasses VGCC entirely: 87.5% of RPM Hamiltonian elements derivable from Lindgren geometry.",

    // S1b Evolutionary Calibration
    s1bTitle: "Evolutionary Calibration",
    s1bIntro:
      "Biological sensors evolved to detect electromagnetic signals at the quantum limit. The human eye detects single photons (~4×10⁻¹⁹ J, one-tenth of thermal noise energy — [[ref:vaziri2016|Vaziri et al. 2016]]). Shark electroreceptors detect 0.5 µV/m fields. Migratory birds’ compass is disrupted by 15 nT RF noise. Ion channels respond to 10⁻⁵ V/m polarized fields ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). [[ref:lindgren2025|Lindgren’s χ(Ā)]] ≈ 1.0 at the membrane is the geometric reason for this sensitivity: the membrane is maximally susceptible because its internal field (7×10⁶ V/m) saturates the susceptibility function.",
    s1bAfter:
      "There is no evolved filter for IF or RF frequencies because these frequencies did not exist during 3.8 billion years of biological evolution. Ion channels are wideband receivers — evolution optimized detection sensitivity, not frequency rejection. Every technical signal is a potential disruption because biological sensors cannot distinguish it from a physiological signal.",
    s1bd1: "Amplification cascade — photon analogy:",
    s1bd2: "Eye: 1 photon → rhodopsin → transducin → PDE → cGMP → measurable current. Gain: ~10⁶×.",
    s1bd3: "VGCC: 1 S4 conformational change → non-ionotropic signal ([[ref:trus2024|Trus & Atlas 2024]]) OR ion flux → Ca²⁺ → calmodulin → cascade. Gain: ~10⁴–10⁶×.",
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
      "ELF channel (f < ~1 kHz): field drops across the membrane. ΔV_mem = E_ext · d_cell · H(f). χ_mem saturated at 7×10⁶ V/m. Linear response. Mechanisms: VGCC→Ca²⁺→ROS (pathway A), GPCR-adenosine ([[ref:pemf_bone_fda_review_2020|PEMF, FDA 1979]]), Nav-modulation ([[ref:tms_fda_depression_2008|TMS, FDA 2008]]), vagus nerve ([[ref:vns_gammacore_fda|VNS, FDA 2017]]).",
    s2bIF:
      "IF channel (f_c < f < f_RPM): field penetrates the cell interior. T(f) = 1/√(1+(f_c/f)²). Primary mechanism at environmental levels: IFO-VGIC (linear, threshold 10⁻⁵ V/m). Geometric field amplification at cleavage furrow: G ≈ (d_cell/d_furrow)² ≈ 25×. Selective effect on dividing cells. [[ref:ttfields_novocure_fda|TTFields (FDA 2011+)]] validates the mechanism at therapeutic intensity via DEP.",
    s2bIFSources:
      "Environmental IF source characterization: a typical LED driver operates at switching frequency f_sw in the range 20–200 kHz with harmonic content at 2f_sw, 3f_sw, 5f_sw extending into the MHz range. The waveform is a square pulse train, not a sinusoid, which produces richer harmonic content than continuous-wave sources. Panagopoulos 2025 demonstrates that pulsed fields are biologically more active than continuous-wave fields at the same average intensity. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]] directly measured LED driver near-field emissions, confirming measurable E-field components at centimeter distances.",
    s2bRF:
      "RF channel (f > ~1 MHz): membrane is transparent. Classical field–membrane interaction is weak. Quantum spin effects become relevant. [[ref:lindgren2025|Lindgren's covariant spin correction]]: B_local = (1/w)b + (A·b)A/(w(1+w)). Anisotropic response. Mechanisms: CRY/RPM→circadian disruption (pathway B), magnetic compass corruption ([[ref:lindecke2026|Lindecke 2026]]).",
    s2bRegGapTitle: "The IF Regulatory Gap",
    s2bRegGap:
      "ICNIRP 2010 sets exposure limits for f < 300 Hz (ELF). [[ref:icnirp2020|ICNIRP 2020]] sets limits for f > 100 kHz (RF). The range 300 Hz < f < 100 kHz has overlapping, inconsistent limits. LED driver emissions (20–300 kHz) fall in this gap. A [[ref:ijrb2022_if_review|2022 systematic review (IJRB, Ohkubo & Okano)]] confirmed: 'studies on health effects with more diverse perspectives of IF-EMF have NOT been conducted.' Biological relevance at these frequencies is supported by: IFO threshold 10⁻⁵ V/m exceeded by LED drivers at 1 m; [[ref:kim2026_cell_gene_switch|Kim 2026]] gene expression activation at 4 kHz (Cyb5b); [[ref:ttfields_novocure_fda|TTFields FDA-approved cancer treatment at 200 kHz]]; [[ref:heliyon_150khz_fertility_2022|150 kHz rat testicular effects (Heliyon 2022)]].",
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
      "R_IFO — Ion Forced Oscillation: linear in E_ext, threshold 10⁻⁵ V/m, dominates at environmental levels (0.01–3 V/m). Polarized, coherent IF fields force irregular gating of voltage-gated ion channels ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s3ifoDep:
      "R_DEP — Dielectrophoresis: quadratic in E_ext, dominates at TTFields therapeutic levels (100–300 V/m). Requires high field gradients for translational force on intracellular structures.",
    s3ifoCyb5b:
      "R_Cyb5b — Mitochondrial outer membrane transduction: Cyb5b identified via genome-wide CRISPR screen as an EMF sensor ([[ref:kim2026_cell_gene_switch|Kim et al. 2026, Cell]]). 60 Hz pulsed EMF → Cyb5b conformational change → Ca²⁺ oscillations → gene promoter activation. Operates at ELF frequencies (50/60 Hz) and couples the ELF channel directly to gene expression control — a pathway independent of both IFO and RPM.",
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
    s5d4: "r₂ = 0.013 is calibrated from [[ref:travison2007_v2|Travison’s −1%/year testosterone decline]]:",
    s5d5: "If dEMF/dt ≈ 1/year → dT/T ≈ −1.3%/year ≈ [[ref:travison2007_v2|Travison]].",
    s5otTitle: "Biological basis of OT parameter",
    s5otIntro:
      "The OT parameter r₁ = 0.010 is not curve-fitted from data. It follows from two independent biological mechanisms that both suppress oxytocin under EMF conditions:",
    s5otRoute1Title: "Route 1 (HPA → vagal):",
    s5otRoute1:
      "EMF → cortisol↑ ([[ref:pawlak2025|Pawlak 2025, d=1.88]]) → vagal suppression ([[ref:porges2001|Porges 2001]]: myelinated vagus dampens HPA; chronic stress reverses this) → oxytocin↓ (ventral vagal complex → hypothalamic OT release) → social engagement↓ ([[ref:carter2021|Carter 2021]], [[ref:feldman2012|Feldman 2012]])",
    s5otRoute2Title: "Route 2 (microbiome → endocrine):",
    s5otRoute2:
      "EMF → gut microbiome disruption ([[ref:jin2022|Jin 2022]]) → Lactobacillus↓ (incl. L. reuteri) → oxytocin↓ ([[ref:erdman2016|Erdman & Poutahidis 2016]]: L. reuteri → vagus → OT↑) → testosterone↓ ([[ref:poutahidis2014|Poutahidis 2014]]: L. reuteri → IL-17↓ → T↑) → spermatogenesis↓",
    s5otCombined:
      "The multiplicative combination OT_eff = OT_vagal × OT_microbiome is approximately exponential: OT_eff ≈ exp(−r_eff × cumEMF), where r_eff = r_vagal + r_microbiome ≈ 0.005 + 0.005 = 0.010. This is the parameter in the model.",

    // S5 Quadruple suppression
    s5qsTitle: "Quadruple suppression derivation",
    s5qsIntro:
      "The behavioral factor is the geometric mean of four multiplicative mating probabilities, each hormonally mediated:",
    s5qsd1: "Four probabilities:",
    s5qsd2:
      "P(approach) — male courtship initiation, driven by T and DA, suppressed by cortisol ([[ref:puts2008|Puts 2008]]: T correlates with mating success via courtship effort; [[ref:mehta2015|Mehta 2015]]: T effects blocked when cortisol is high).",
    s5qsd3:
      "P(attraction) — female attraction response, depends on male T-driven phenotype and female OT motivation ([[ref:thornhill1994|Thornhill 1994]]: masculinity signals genetic quality).",
    s5qsd4:
      "P(sex) — within-couple sexual frequency, depends on OT pair-bonding, T libido, and cortisol/melatonin stress state ([[ref:carter2021|Carter 2021]]: OT fundamental to mammalian sociality).",
    s5qsd5:
      "P(fertilization) — biological fertilization probability per act, depends on sperm quality and CatSper cascade.",
    s5qsd6:
      "The model's behav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4) is the geometric mean approximation. Each P_i shares the same exponential hormonal dependencies, so the geometric mean of four products reduces to the geometric mean of the individual hormonal terms.",
    s5qsd7:
      "Dual-hormone correction ([[ref:mehta2015|Mehta & Prasad 2015]], [[ref:dual_hormone_meta2021|meta N=8538, r=-.061]]): T's behavioral expression requires low cortisol. EMF simultaneously lowers T ([[ref:who_t_meta|WHO meta: SMD 0.87]]) AND raises cortisol ([[ref:pawlak2025|Pawlak 2025: d=1.88]]), creating double lock on approach behavior.",
    s5qsd8:
      "Limitation: the [[ref:dual_hormone_meta2021|dual-hormone meta-analysis]] effect size is small (r=-.061). The proxy chain (EMF → T↓ → approach↓ → TFR↓) has not been tested as a whole. Each link is individually documented but the full chain is inference.",

    // S5 Fertilization five gates
    s5fertTitle: "Fertilization probability: five gates in series",
    s5fertLead:
      "Each gate is Ca²⁺-dependent and individually vulnerable to EMF disruption:",
    s5fertG1: "Capacitation (CatSper-dependent Ca²⁺ oscillation)",
    s5fertG2: "Rheotaxis (CatSper-dependent rolling against flow)",
    s5fertG3: "Chemotaxis (progesterone + temperature gradient via CatSper)",
    s5fertG4: "Acrosome reaction (dual Ca²⁺: CatSper + IP₃ stores)",
    s5fertG5: "Oocyte activation (sperm-delivered Ca²⁺ oscillation factor)",
    s5fertConclusion:
      "A 10% reduction at each gate compounds: 0.9⁵ = 0.59 → 41% reduction in fertilization probability from individually minor disruptions.",

    // S5b Cell Size × Frequency
    s5bTitle: "Cell Size × Frequency Resonance",
    s5bIntro:
      "[[ref:ttfields_cell_size_frequency|TTFields clinical data]] reveals a quantitative relationship between cell size and optimal disruption frequency. This relationship is calibrated from FDA phase III data and extrapolated to BERM's target tissues.",
    s5bFormula:
      "where K ≈ 3.7 Hz·m, calibrated from [[ref:ttfields_cell_size_frequency|TTFields clinical data across four cancer types]].",
    s5bd1: "[[ref:ttfields_cell_size_frequency|TTFields clinical frequencies (FDA PMA data)]]:",
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
      "AA homozygous risk carriers show 40% greater Ca²⁺ influx per unit field perturbation ([[ref:cacna1c_genotyping_2024|medrxiv 2024, MIT DSpace functional data]]).",
    s11d3: "The anatomical modifier accounts for tissue geometry affecting internal field distribution:",
    s11d4:
      "Children under 6 receive 2–3× the adult SAR at the same external field ([[ref:gandhi1996|Gandhi 1996]]). BMI modulates fat-layer attenuation. The product age_factor × bmi_factor gives g_anatomy.",
    s11d5: "The cumulative modifier uses [[ref:selye1936|Selye's General Adaptation Syndrome]] phases:",
    s11d6:
      "In the resistance phase, compensation capacity declines linearly. In exhaustion (allostatic load > 15), compensation collapses and the effective modifier amplifies sharply — this is the predicted EHS onset regime.",
    s11d7: "The combined individual modifier multiplies into the population χ:",
    s11d8:
      "For population-level TFR prediction, BERM integrates over the genotype frequency distribution (Hardy-Weinberg) × anatomical demographics × exposure-duration distribution. The mean individual modifier is 1.0 by construction — it cancels in the population average. The DIAGNOSTIC value lies in the tails: high-susceptibility individuals (AA, young, exhaustion phase) may have combined modifiers of 5–10×, explaining why a subpopulation reports symptoms while the majority does not.",
    s11d9Link: "→ Individual susceptibility evidence",

    // S12 Cross-Sectional Validation
    s12Title: "Cross-Sectional Validation v19.1",
    s12Intro:
      "Formula discovery across 54 countries (2022 data, TFR range 0.78–6.25, sd = 1.35) provides an independent validation of the temporal model. The cross-sectional formula uses two EMF proxy variables and one binary threshold to predict national TFR with LOOCV RMSE 0.522 (skill score 0.61 vs mean predictor).",
    s12Formula:
      "The two-channel EMF index combines residential electricity consumption (ELF proxy) and fixed broadband subscriptions (RF proxy):",
    s12Access:
      "Electricity access acts as a binary biological exposure boundary. The IFO-VGIC activation threshold (10⁻⁵ V/m) is exceeded at the operating distance of every household electrical device. Populations without electricity are not exposed.",
    s12Stats: "Validation statistics:",
    s12Stat1: "LOOCV RMSE = 0.522 (full model, leave-one-country-out cross-validation)",
    s12Stat2: "R² = 0.851 (n = 54; captures electrification threshold, not EMF-specific effect)",
    s12Stat3: "Skill score = 0.61 (1 − RMSE/sd, improvement over mean predictor)",
    s12Stat4: "Residential electricity is the BEST single predictor (univariate RMSE 0.533)",
    s12Stat5: "Mobile phone subscriptions are the WEAKEST (RMSE 1.053)",
    s12Mobile:
      "The mobile phone paradox: if the mechanism were 'information access → family planning choices', the information device (mobile phone) should be the strongest predictor. It is the weakest. The infrastructure variable (residential electricity) predicts best — consistent with a physical exposure mechanism, not an information mechanism.",
    s12Electrified:
      "For partially electrified countries, the electrified sub-population TFR can be estimated from the binary mixture model:",
    s12Collinearity:
      "GDP collinearity: EMF proxies and GDP per capita are correlated (r = 0.87). In linear models, neither is significant when the other is controlled. This is a symmetric identification problem — it does not favor GDP over EMF. Three structural differences break the symmetry: (1) binary electrification threshold, (2) mobile phone paradox, (3) sentinel species respond to EMF but not GDP.",
    s12Limitation:
      "Honest assessment: R² = 0.851 primarily reflects the demographic transition gradient (Niger → Korea), not EMF-specific variance. Among high-income OECD countries (n ≈ 36), electricity consumption alone explains near-zero variance in TFR (R² ≈ 0.0002). The cross-sectional formula captures the electrification threshold — the binary gateway from pre-industrial to industrial fertility — not a dose-response within electrified populations. This makes the cross-section BERM's weakest independent evidence line. The stronger evidence comes from: (1) mechanistic pathways with regulatory-validated non-thermal effects, (2) pharmacological dose-response (melatonin, testosterone), (3) genetic selection markers (CatSper, VGCC), and (4) sentinel species under controlled conditions. The cross-section's value is structural: the mobile phone paradox and the electricity-over-GDP prediction are discriminating, even though the aggregate fit is confounded.",
    s12DataNote:
      "Replication data: 54-country sample roster with observed TFR, electricity consumption, broadband subscriptions, and model predictions available at /data/cross_section_manifest.csv. Source: UN WPP 2024 (TFR), OWID/IEA (electricity), ITU (broadband).",
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

    // S14 Layered Formula
    s14Title: "Layered Formula v20 → v21",
    s14Intro: "The original cross-sectional formula (v19.1) uses a two-channel EMF index. The layered formula extends this by incorporating priming history, recovery capacity, seasonal modulation, and population genotype.",
    s14V20Title: "Formula v20 (Priming × Recovery)",
    s14V20: "TFR ≈ A × exp(−B × EMF_eff) + C",
    s14V20Detail: "EMF_eff = EMF_comp × P × (1/R)",
    s14V20Composite: "EMF_comp = w_ELF × ELF + w_IF × IF + w_RF × RF",
    s14V20Priming: "P = 1 + α × min(electrification_years, P_max)",
    s14V20Recovery: "R = 1 + β × EMF_free_hours/day",
    s14V20Desc: "Where EMF_comp is the three-channel weighted composite (ELF < 300 Hz, IF 300 Hz–10 MHz, RF > 10 MHz). P captures cumulative priming from decades of power grid exposure — years of electrification upregulate VGCC expression, making cells more sensitive to all subsequent EMF. R captures the recovery window: hours per day without significant EMF allow CaMKII dephosphorylation and Ca²⁺ homeostasis restoration.",
    s14V21Title: "Formula v21 (proposed: + Season × Genotype)",
    s14V21: "EMF_eff = EMF_comp × P × (1/R) × S × G_pop",
    s14V21Season: "S = 1 + γ × f(latitude, season)",
    s14V21Genotype: "G_pop = 1 + δ × CACNA1C_A_allele_frequency",
    s14V21Optional: "Optional correction factors (data-dependent): H = humidity/coastal correction, B = building material RF reflection coefficient",
    s14V21Desc: "S captures seasonal variation in CRY magnetoreceptor sensitivity: winter at high latitudes increases CRY sensitivity to EMF perturbation ([[ref:halgamuge2015|Halgamuge 2015]]). G_pop captures population-level genetic susceptibility via CACNA1C rs1006737 A-allele frequency, which determines Cav1.2 channel density and therefore Ca²⁺ response per EMF stimulus ([[ref:sousouri2025|Sousouri 2025]]).",
    s14ParamsTitle: "Parameter interpretation",
    s14Params: [
      { param: "P (Priming)", amish: "1.0 (no priming)", finland: "2.2 (100+ yr electrification)", nigeria: "1.45 (~15 yr)", desc: "How 'ready' are cells for EMF response" },
      { param: "1/R (Recovery deficit)", amish: "0.48 (full recovery)", finland: "1.0 (WiFi 24/7)", nigeria: "0.67 (partial)", desc: "Does Ca²⁺ homeostasis restore overnight" },
      { param: "S (Season)", amish: "~1.0", finland: "0.9–1.3", nigeria: "~1.0", desc: "CRY sensitivity modulation by light" },
      { param: "G_pop (Genotype)", amish: "~1.0", finland: "~1.1", nigeria: "~0.95", desc: "Population CACNA1C A-allele prevalence" },
    ],
    s14Evolution: "Formula evolution: v17 (scalar cumEMF, RMSE ~1.15) → v19.1 (two-channel, 54 countries, RMSE 0.522) → v20 (+ Priming × Recovery, predicted RMSE < 0.45) → v21 (+ Season × Genotype, requires calibration data).",
    s14Level: "Epistemic level: v20 is M|C (mechanism-derived, calibration pending). v21 is L* (proposed extension, calibration data not yet collected for S and G_pop).",

    // S15 Recovery Function
    s15Title: "The Recovery Function: Quantifying DNA Repair Time",
    s15Text: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]] demonstrated that EMF-induced DNA strand breaks returned to normal within 9 hours after exposure ceased. Fitting an exponential decay model to this data yields a time constant τ ≈ 3–4 hours. This maps directly onto the Recovery factor R in formula v20: R = 1 + β × EMF_free_hours, where [[ref:ivancsits_dna_recovery|Ivancsits data]] suggests β ≈ 0.11.",
    s15TableTime: "Time after exposure",
    s15TableDamage: "Remaining damage",
    s15TableScenario: "Scenario",
    s15TableFreeTime: "EMF-free time",
    s15TableRemaining: "Remaining damage",
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
      { id: "layered-formula", num: "§14", label: "Kerrostumaformula v20→v21" },
      { id: "recovery-function", num: "§15", label: "Palautumisfunktio" },
    ],
    pageTitle: "Matemaattinen perusta",
    pageSubtitle:
      'Täydellinen johtaminen BERM-mallista Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    // S1 Lindgren
    s1Title: "Lindgrenin geometria",
    s1Intro:
      "[[ref:lindgren2025|Lindgrenin, Kovacsin ja Liukkosen (2025)]] viitekehyksessä sähkömagneettinen potentiaali on osa aika-avaruuden geometriaa. Metriikkatensori absorboi EM-nelipotentiaalin:",
    s1After:
      "Tämä tarkoittaa, että sähkömagneettinen kenttä muuttaa geometriaa, jossa kaikki fysikaaliset prosessit tapahtuvat — mukaan lukien biologiset ionikanavat. Maxwellin yhtälöt seuraavat tämän geometrian Bianchin identiteeteistä.",
    s1d1: "Standardissa yleisessä suhteellisuusteoriassa metriikka on dynaaminen:",
    s1d2: "Lindgrenin viitekehyksessä EM-potentiaali korvaa gravitaatiohäiriön:",
    s1d3: "missä κ on kytkentävakio (normalisoitu arvoon 1 sopivissa yksiköissä).",
    s1d4: "Maxwellin yhtälöt seuraavat Bianchin identiteeteistä:",
    s1d5: "[[ref:vassallo2025|Vassallo et al. (2025)]] validoi tämän johtamisen itsenäisesti.",
    s1d6: "Näennäinen ongelma (δV_mem ≈ 10⁻²¹ V naivista laskennasta) ratkeaa kolmella itsenäisellä mekanismilla:",
    s1d6a: "(1) IFO: ionien pakotettu oskillaatio vaikuttaa S4-jännitesensoriin suoraan <1 nm etäisyydellä, kynnys 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s1d6b: "(2) Ei-ionotrooppinen VGCC-signalointi: konformaatiomuutos ilman ionivirtausta, matalampi energiakynnys ([[ref:trus2024|Trus & Atlas 2024]]).",
    s1d6c: "(3) RPM-reitti ohittaa VGCC:n kokonaan: 87,5 % RPM-hamiltoniaanin elementeistä johdettavissa Lindgrenin geometriasta.",

    // S1b Evoluutionäärinen kalibraatio
    s1bTitle: "Evoluutionäärinen kalibraatio",
    s1bIntro:
      "Biologiset sensorit kehittyivät havaitsemaan sähkömagneettisia signaaleja kvanttiraja-herkkyydellä. Ihmisen silmä havaitsee yksittäisen fotonin (~4×10⁻¹⁹ J, kymmenesosa termisestä kohinaenergiasta — [[ref:vaziri2016|Vaziri ym. 2016]]). Haiden elektrosensorit havaitsevat 0,5 µV/m kenttää. Muuttolintujen kompassi häiriintyy 15 nT RF-kohinasta. Ionikanavat vastaavat 10⁻⁵ V/m polarisoituihin kenttiin ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). [[ref:lindgren2025|Lindgrenin χ(Ā)]] ≈ 1,0 solukalvolla on geometrinen syy tälle herkkyydelle: kalvo on maksimaalisesti altis koska sen sisäinen kenttä (7×10⁶ V/m) saturoi herkkyysfunktion.",
    s1bAfter:
      "IF- ja RF-taajuuksille ei ole kehittynyt suodatinta, koska näitä taajuuksia ei esiintynyt 3,8 miljardin vuoden biologisen evoluution aikana. Ionikanavat ovat laajakaistavastaanottimia — evoluutio optimoi havaitsemisherkkyyden, ei taajuuden torjuntaa. Jokainen tekninen signaali on potentiaalinen häiriö, koska biologiset sensorit eivät pysty erottamaan sitä fysiologisesta signaalista.",
    s1bd1: "Vahvistuskaskadi — fotoni-analogia:",
    s1bd2: "Silmä: 1 fotoni → rodopsiini → transdusuiini → PDE → cGMP → mitattava virta. Vahvistus: ~10⁶×.",
    s1bd3: "VGCC: 1 S4-konformaatiomuutos → ei-ionotrooppinen signaali ([[ref:trus2024|Trus & Atlas 2024]]) TAI ionivirtaus → Ca²⁺ → kalmoduliini → kaskadi. Vahvistus: ~10⁴–10⁶×.",
    s1bd4: "Bifurkaatio Hopf-pisteen lähellä: G = 1/(2µ). Pieni ROS-muutos → makroskooppinen vaste. Lisävahvistus: ~10²–10³×.",
    s1bd5: "Kokonaisvahvistus: 10⁶–10⁹× — sama suuruusluokka kuin silmän fotonivahvistuskaskadi.",

    // S2b Kolmikanavajohdannainen
    s2bTitle: "Kolmikanavajohdannainen",
    s2bIntro:
      "Kaksi biologista rajataajuutta jakaa EMF-spektrin kolmeen regiimiin, joilla on erilliset biofysikaaliset mekanismit. Nämä rajataajuudet ovat solubiologian perustavanlaatuisia ominaisuuksia, eivät mielivaltaisia parametreja.",
    s2bFC:
      "f_c ≈ 1 kHz — solukalvon RC-aikavakio. Alle f_c: kenttä putoaa kalvon yli ja perturboi V_mem:iä. Yli f_c: kenttä tunkeutuu solun sisälle.",
    s2bFRPM:
      "f_RPM ≈ 1 MHz — radikaaliparin koherenssin raja. Yli f_RPM: klassinen kenttä-kalvo-vuorovaikutus heikkenee mutta kvantti-spin-efektit tulevat merkityksellisiksi.",
    s2bELF:
      "ELF-kanava (f < ~1 kHz): kenttä putoaa kalvon yli. ΔV_mem = E_ext · d_cell · H(f). χ_mem saturoitunut 7×10⁶ V/m:ssä. Lineaarinen vaste. Mekanismit: VGCC→Ca²⁺→ROS (reitti A), GPCR-adenosiini ([[ref:pemf_bone_fda_review_2020|PEMF, FDA 1979]]), Nav-modulaatio ([[ref:tms_fda_depression_2008|TMS, FDA 2008]]), vagushermo ([[ref:vns_gammacore_fda|VNS, FDA 2017]]).",
    s2bIF:
      "IF-kanava (f_c < f < f_RPM): kenttä tunkeutuu solun sisälle. T(f) = 1/√(1+(f_c/f)²). Päämekanismi ympäristötasoilla: IFO-VGIC (lineaarinen, kynnys 10⁻⁵ V/m). Geometrinen kenttävahvistus kaulakuroutumassa: G ≈ (d_cell/d_furrow)² ≈ 25×. Valikoiva vaikutus jakautuviin soluihin. [[ref:ttfields_novocure_fda|TTFields (FDA 2011+)]] validoi mekanismin terapeuttisella intensiteetillä DEP:n kautta.",
    s2bIFSources:
      "Ympäristön IF-lähteiden karakterisointi: tyypillinen LED-ajuri toimii kytkintaajuudella f_sw alueella 20–200 kHz harmonisella sisällöllä taajuuksilla 2f_sw, 3f_sw, 5f_sw megahertsialueelle asti. Aaltomuoto on suorakaideaalto, ei siniaalto, joka tuottaa rikkaampaa harmonista sisältöä kuin jatkuva-aaltolähteet. Panagopoulos 2025 osoittaa, että pulssitetut kentät ovat biologisesti aktiivisempia kuin jatkuva-aaltokentät samalla keskimääräisellä intensiteetillä. [[ref:zeghoudi2025_led_driver_emf|Zeghoudi ym. 2025]] mittasi suoraan LED-ajurin lähikenttäemission vahvistaen mitattavat sähkökentän komponentit senttimetrien etäisyydellä.",
    s2bRF:
      "RF-kanava (f > ~1 MHz): kalvo on läpinäkyvä. Klassinen kenttä-kalvo-vuorovaikutus on heikko. Kvantti-spin-efektit tulevat merkityksellisiksi. [[ref:lindgren2025|Lindgrenin kovariantti spin-korjaus]]: B_local = (1/w)b + (A·b)A/(w(1+w)). Anisotrooppinen vaste. Mekanismit: CRY/RPM→sirkadiaaninen häiriö (reitti B), magneettikompassin häiriintyminen ([[ref:lindecke2026|Lindecke 2026]]).",
    s2bRegGapTitle: "IF-säätelyaukko",
    s2bRegGap:
      "ICNIRP 2010 asettaa altistusrajat taajuuksille f < 300 Hz (ELF). [[ref:icnirp2020|ICNIRP 2020]] asettaa rajat taajuuksille f > 100 kHz (RF). Alue 300 Hz < f < 100 kHz:lla on päällekkäiset, epäjohdonmukaiset rajat. LED-ajuriemissiot (20–300 kHz) osuvat tähän aukkoon. [[ref:ijrb2022_if_review|Vuoden 2022 systemaattinen katsaus (IJRB, Ohkubo & Okano)]] vahvisti: 'IF-EMF:n terveysvaikutuksia EI ole tutkittu monipuolisemmista näkökulmista.' Biologinen relevanssi näillä taajuuksilla tuettu: IFO-kynnys 10⁻⁵ V/m ylittyy LED-ajurilla 1 m:ssä; [[ref:kim2026_cell_gene_switch|Kim 2026]] geeniekspression aktivointi 4 kHz:llä (Cyb5b); [[ref:ttfields_novocure_fda|TTFields FDA-hyväksytty syöpähoito 200 kHz:llä]]; [[ref:heliyon_150khz_fertility_2022|150 kHz rottatutkimuksen kivesvaikutukset (Heliyon 2022)]].",
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
      "R_IFO — ionien pakotettu oskillaatio: lineaarinen E_ext:ssä, kynnys 10⁻⁵ V/m, dominoi ympäristötasoilla (0,01–3 V/m). Polarisoidut, koherentit IF-kentät pakottavat jänniteohjattujen ionikanavien epäsäännöllisen portituksen ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s3ifoDep:
      "R_DEP — dielektroforeesi: neliöllinen E_ext:ssä, dominoi TTFields-terapiatasoilla (100–300 V/m). Vaatii korkean kenttägradientin translaatiovoimalle solunsisäisiin rakenteisiin.",
    s3ifoCyb5b:
      "R_Cyb5b — mitokondrion ulkokalvon transduktio: Cyb5b tunnistettu genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi ([[ref:kim2026_cell_gene_switch|Kim ym. 2026, Cell]]). 60 Hz pulssi-EMF → Cyb5b:n konformaatiomuutos → Ca²⁺-oskillaatiot → geenipromootterin aktivaatio. Toimii ELF-taajuuksilla (50/60 Hz) ja kytkee ELF-kanavan suoraan geeniekspression hallintaan — reitti joka on riippumaton sekä IFO:sta että RPM:stä.",
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
    s5d4: "r₂ = 0,013 on kalibroitu [[ref:travison2007_v2|Travisonin −1 %/vuosi testosteronilaskusta]]:",
    s5d5: "Jos dEMF/dt ≈ 1/vuosi → dT/T ≈ −1,3 %/vuosi ≈ [[ref:travison2007_v2|Travison]].",
    s5otTitle: "OT-parametrin biologinen perustelu",
    s5otIntro:
      "OT-parametri r₁ = 0,010 ei ole sovitettu datasta. Se seuraa kahdesta itsenäisestä biologisesta mekanismista, jotka molemmat tukahduttavat oksitosiinia EMF-olosuhteissa:",
    s5otRoute1Title: "Reitti 1 (HPA → vagaalinen):",
    s5otRoute1:
      "EMF → kortisoli↑ ([[ref:pawlak2025|Pawlak 2025, d=1,88]]) → vagaalinen suppressio ([[ref:porges2001|Porges 2001]]: myelinisoitu vagus vaimentaa HPA:ta; krooninen stressi kääntää tämän) → oksitosiini↓ (ventraalinen vagaalikompleksi → hypotalaaminen OT-vapautus) → sosiaalinen sitoutuminen↓ ([[ref:carter2021|Carter 2021]], [[ref:feldman2012|Feldman 2012]])",
    s5otRoute2Title: "Reitti 2 (mikrobiomi → endokriininen):",
    s5otRoute2:
      "EMF → suolistomikrobiomin häiriö ([[ref:jin2022|Jin 2022]]) → Lactobacillus↓ (ml. L. reuteri) → oksitosiini↓ ([[ref:erdman2016|Erdman & Poutahidis 2016]]: L. reuteri → vagus → OT↑) → testosteroni↓ ([[ref:poutahidis2014|Poutahidis 2014]]: L. reuteri → IL-17↓ → T↑) → spermatogeneesi↓",
    s5otCombined:
      "Multiplikatiivinen yhdistelmä OT_eff = OT_vagal × OT_microbiome on likimain eksponentiaalinen: OT_eff ≈ exp(−r_eff × cumEMF), missä r_eff = r_vagal + r_microbiome ≈ 0,005 + 0,005 = 0,010. Tämä on mallissa käytetty parametri.",

    // S5 Nelinkertainen suppressio
    s5qsTitle: "Nelinkertainen suppressio -johtaminen",
    s5qsIntro:
      "Käyttäytymiskerroin on neljän multiplikatiivisen pariutumistodennäköisyyden geometrinen keskiarvo, jokainen hormonaalisesti välittynyt:",
    s5qsd1: "Neljä todennäköisyyttä:",
    s5qsd2:
      "P(lähestyminen) — miehen parinmuodostusaloitteet, ajettu T:n ja DA:n kautta, suppressoitu kortisolilla ([[ref:puts2008|Puts 2008]]: T korreloi pariutumismenestykseen parinmuodostusponnistelun kautta; [[ref:mehta2015|Mehta 2015]]: T-vaikutukset estyvät kun kortisoli on korkea).",
    s5qsd3:
      "P(attraktio) — naisen attraktiovaste, riippuu miehen T-tuottamasta fenotyypistä ja naisen OT-motivaatiosta ([[ref:thornhill1994|Thornhill 1994]]: maskuliinisuus signaloi geneettistä laatua).",
    s5qsd4:
      "P(seksi) — parisuhteen sisäinen seksuaalinen aktiivisuus, riippuu OT-parisiteestä, T-libidosta ja kortisoli/melatoniini-stressitilasta ([[ref:carter2021|Carter 2021]]: OT on nisäkkäiden sosiaalisuuden perusta).",
    s5qsd5:
      "P(hedelmöitys) — biologinen hedelmöitystodennäköisyys per yhdyntä, riippuu siittiöiden laadusta ja CatSper-kaskadista.",
    s5qsd6:
      "Mallin behav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4) on geometrisen keskiarvon approksimaatio. Jokainen P_i jakaa samat eksponentiaaliset hormonaaliset riippuvuudet, joten neljän tulon geometrinen keskiarvo redusoituu yksittäisten hormonaalisten termien geometriseksi keskiarvoksi.",
    s5qsd7:
      "Dual-hormone -korjaus ([[ref:mehta2015|Mehta & Prasad 2015]], [[ref:dual_hormone_meta2021|meta N=8538, r=-0,061]]): T:n käyttäytymisvaikutukset vaativat matalan kortisolin. EMF samanaikaisesti laskee T:tä ([[ref:who_t_meta|WHO meta: SMD 0,87]]) JA nostaa kortisolia ([[ref:pawlak2025|Pawlak 2025: d=1,88]]), luoden kaksinkertaisen lukon lähestymiskäyttäytymiselle.",
    s5qsd8:
      "Rajoitus: [[ref:dual_hormone_meta2021|dual-hormone -meta-analyysin]] efektikoko on pieni (r=-0,061). Proxy-ketjua (EMF → T↓ → lähestyminen↓ → TFR↓) ei ole testattu kokonaisuutena. Jokainen lenkki on erikseen dokumentoitu, mutta koko ketju on päättelyä.",

    // S5 Hedelmöityksen viisi porttia
    s5fertTitle: "Hedelmöitystodennäköisyys: viisi porttia sarjassa",
    s5fertLead:
      "Jokainen portti on Ca²⁺-riippuvainen ja yksittäin altis EMF-häiriölle:",
    s5fertG1: "Kapasitaatio (CatSper-riippuvainen Ca²⁺-oskillaatio)",
    s5fertG2: "Reotaksis (CatSper-riippuvainen rullaus virtausta vastaan)",
    s5fertG3: "Kemotaksis (progesteroni + lämpötilagradientti CatSperin kautta)",
    s5fertG4: "Akrosomireaktio (kaksois-Ca²⁺: CatSper + IP₃-varastot)",
    s5fertG5: "Munasolun aktivaatio (siittiön tuoma Ca²⁺-oskillaatiotekijä)",
    s5fertConclusion:
      "10 %:n lasku kussakin portissa kumuloituu: 0,9⁵ = 0,59 → 41 %:n lasku hedelmöitystodennäköisyydessä yksittäin vähäisistä häiriöistä.",

    // S5b Solukoko × Taajuus
    s5bTitle: "Solukoko × taajuusresonanssi",
    s5bIntro:
      "[[ref:ttfields_cell_size_frequency|TTFields-kliininen data]] paljastaa kvantitatiivisen suhteen solukoon ja optimaalisen häiriötaajuuden välillä. Tämä suhde on kalibroitu FDA:n vaiheen III datasta ja ekstrapoloitu BERM:n kohdekudoksiin.",
    s5bFormula:
      "missä K ≈ 3,7 Hz·m, kalibroitu [[ref:ttfields_cell_size_frequency|TTFields-kliinisestä datasta neljän syöpätyypin yli]].",
    s5bd1: "[[ref:ttfields_cell_size_frequency|TTFields-kliiniset taajuudet (FDA PMA -data)]]:",
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
      "Kolme itsenäistä farmakologista interventiota tarjoavat kvantitatiiviset kalibrointiankkurit erillisille reiteille. Kukin lääke eristää tietyn mekanismin, mikä mahdollistaa mallin reittirakenteen itsenäisen testaamisen.",
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
      "AA-homotsygoottiset riskikantajat osoittavat 40 % suurempaa Ca²⁺-sisäänvirtausta kenttähäiriöyksikköä kohti ([[ref:cacna1c_genotyping_2024|medrxiv 2024, MIT DSpace funktionaalinen data]]).",
    s11d3: "Anatominen kerroin huomioi kudosgeometrian vaikutuksen sisäiseen kenttäjakaumaan:",
    s11d4:
      "Alle 6-vuotiaat lapset saavat 2–3× aikuisen SAR:n samassa ulkoisessa kentässä ([[ref:gandhi1996|Gandhi 1996]]). BMI moduloi rasvakerroksen vaimennusta. Tulo ikä_tekijä × bmi_tekijä antaa g_anatomy:n.",
    s11d5: "Kumulatiivinen kerroin käyttää [[ref:selye1936|Selyen yleisen adaptaatio-oireyhtymän]] vaiheita:",
    s11d6:
      "Resistenssivaiheessa kompensaatiokapasiteetti laskee lineaarisesti. Uupumusvaiheessa (allostaattinen kuorma > 15) kompensaatio romahtaa ja efektiivinen kerroin vahvistuu jyrkästi — tämä on ennustettu EHS:n alkamisregime.",
    s11d7: "Yhdistetty yksilökerroin kertautuu populaation χ:hin:",
    s11d8:
      "Populaatiotason TFR-ennusteessa BERM integroi genotyyppifrekvenssijakauman (Hardy-Weinberg) × anatominen demografia × altistuskeston jakauman yli. Keskimääräinen yksilökerroin on 1,0 konstruktion mukaan — se supistuu populaatiokeskiarvossa. DIAGNOSTINEN arvo on hännissä: korkean herkkyyden yksilöillä (AA, nuoret, uupumusvaihe) yhdistetty kerroin voi olla 5–10×, mikä selittää, miksi osajoukko raportoi oireita enemmistön ollessa oireeton.",
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
    s12Stat1: "LOOCV RMSE = 0,522 (kokonaismalli, yksi maa kerrallaan pois -ristiinvalidointi)",
    s12Stat2: "R² = 0,851 (n = 54; kuvaa sähköistyskynnystä, ei EMF-spesifistä vaikutusta)",
    s12Stat3: "Taitoarvo = 0,61 (1 − RMSE/sd, parannus keskiarvoennustajaan nähden)",
    s12Stat4: "Asumisen sähkönkulutus on PARAS yksittäinen ennustaja (univariaatti-RMSE 0,533)",
    s12Stat5: "Matkapuhelintilaukset ovat HEIKOIN (RMSE 1,053)",
    s12Mobile:
      "Matkapuhelinparadoksi: jos mekanismi olisi 'tiedon saatavuus → perhesuunnitteluvalinnat', tietolaitteen (matkapuhelin) pitäisi olla vahvin ennustaja. Se on heikoin. Infrastruktuurimuuttuja (asumisen sähkönkulutus) ennustaa parhaiten — yhdenmukaista fyysisen altistusmekanismin, ei tietomekanismin kanssa.",
    s12Electrified:
      "Osittain sähköistetyille maille sähköistetyn osaväestön TFR voidaan estimoida binäärisestä sekoitusmallista:",
    s12Collinearity:
      "BKT-kollineaarisuus: EMF-proxy-muuttujat ja BKT/cap korreloivat (r = 0,87). Lineaarisissa malleissa kumpikaan ei ole merkitsevä toisen kontrolloinnin jälkeen. Tämä on symmetrinen identifikaatio-ongelma — se ei suosi BKT:tä EMF:n yli. Kolme rakenteellista eroa murtavat symmetrian: (1) binäärinen sähköistymiskynnys, (2) matkapuhelinparadoksi, (3) sentinelkilajit reagoivat EMF:ään mutta eivät BKT:hen.",
    s12Limitation:
      "Rehellinen arvio: R² = 0,851 kuvastaa pääasiassa demografisen transition gradienttia (Niger → Korea), ei EMF-spesifistä varianssia. Korkean tulotason OECD-maissa (n ≈ 36) sähkönkulutus yksinään selittää lähes nollan TFR-varianssista (R² ≈ 0,0002). Poikkileikkauskaava kuvaa sähköistyskynnystä — binääristä porttia esiteollisesta teolliseen hedelmällisyyteen — ei annos-vastetta sähköistettyjen väestöjen sisällä. Tämä tekee poikkileikkauksesta BERM:n heikoimman itsenäisen evidenssilinjan. Vahvempi evidenssi tulee: (1) mekanismipoluilta, joilla on regulatiivisesti validoituja ei-termisiä vaikutuksia, (2) farmakologisesta annos-vasteesta (melatoniini, testosteroni), (3) geneettisistä selektiomarkkereista (CatSper, VGCC) ja (4) sentinelkilajeista kontrolloiduissa olosuhteissa. Poikkileikkauksen arvo on rakenteellinen: matkapuhelinparadoksi ja sähkö > BKT -ennuste ovat erottelevia, vaikka kokonaisistuvuus on sekoitettu.",
    s12DataNote:
      "Replikaatiodata: 54 maan otosluettelo (havaittu TFR, sähkönkulutus, laajakaistatilaukset, mallin ennusteet) saatavilla osoitteessa /data/cross_section_manifest.csv. Lähteet: UN WPP 2024 (TFR), OWID/IEA (sähkö), ITU (laajakaista).",
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

    // S14 Layered Formula
    s14Title: "Kerrostumaformula v20 → v21",
    s14Intro: "Alkuperäinen poikkileikkausformula (v19.1) käyttää kaksikanavaista EMF-indeksiä. Kerrostumaformula laajentaa tätä sisällyttämällä priming-historian, palautumiskyvyn, vuodenaika­modulaation ja populaation genotyypin.",
    s14V20Title: "Formula v20 (Priming × Palautuminen)",
    s14V20: "TFR ≈ A × exp(−B × EMF_eff) + C",
    s14V20Detail: "EMF_eff = EMF_comp × P × (1/R)",
    s14V20Composite: "EMF_comp = w_ELF × ELF + w_IF × IF + w_RF × RF",
    s14V20Priming: "P = 1 + α × min(sähköistys_vuodet, P_max)",
    s14V20Recovery: "R = 1 + β × EMF_vapaat_tunnit/vrk",
    s14V20Desc: "Missä EMF_comp on kolmikanavainen painotettu komposiitti (ELF < 300 Hz, IF 300 Hz–10 MHz, RF > 10 MHz). P kuvaa kumulatiivista primingia vuosikymmenten sähköverkkoaltistuksesta — sähköistysvuodet ylös­säätelevät VGCC-ekspressiota tehden soluista herkempiä kaikelle myöhemmälle EMF:lle. R kuvaa palautumisikkunaa: tunnit päivässä ilman merkittävää EMF:ää mahdollistavat CaMKII-defosforylaation ja Ca²⁺-homeo­staasin palautumisen.",
    s14V21Title: "Formula v21 (ehdotettu: + Vuodenaika × Genotyyppi)",
    s14V21: "EMF_eff = EMF_comp × P × (1/R) × S × G_pop",
    s14V21Season: "S = 1 + γ × f(leveysaste, vuodenaika)",
    s14V21Genotype: "G_pop = 1 + δ × CACNA1C_A-alleelitaajuus",
    s14V21Optional: "Valinnaiset korjauskertoimet (datariippuvaisia): H = kosteus/rannikkokorjaus, B = rakennusmateriaalin RF-heijastuskerroin",
    s14V21Desc: "S kuvaa CRY-magnetoreseptorin herkkyyden vuodenaikavaihtelua: talvi korkeilla leveysasteilla lisää CRY:n herkkyyttä EMF-perturbaalioille ([[ref:halgamuge2015|Halgamuge 2015]]). G_pop kuvaa populaatiotason geneettistä herkkyyttä CACNA1C rs1006737 A-alleelitaajuuden kautta, joka määrittää Cav1.2-kanavatiheyden ja siten Ca²⁺-vasteen per EMF-stimulus ([[ref:sousouri2025|Sousouri 2025]]).",
    s14ParamsTitle: "Parametrien tulkinta",
    s14Params: [
      { param: "P (Priming)", amish: "1,0 (ei primingia)", finland: "2,2 (100+ v sähköistys)", nigeria: "1,45 (~15 v)", desc: "Kuinka 'valmiita' solut ovat EMF-vasteeseen" },
      { param: "1/R (Palautumis­vajaus)", amish: "0,48 (täysi palautuminen)", finland: "1,0 (WiFi 24/7)", nigeria: "0,67 (osittainen)", desc: "Palautuuko Ca²⁺-homeostaasi yön aikana" },
      { param: "S (Vuodenaika)", amish: "~1,0", finland: "0,9–1,3", nigeria: "~1,0", desc: "CRY-herkkyyden modulaatio valon kautta" },
      { param: "G_pop (Genotyyppi)", amish: "~1,0", finland: "~1,1", nigeria: "~0,95", desc: "Populaation CACNA1C A-alleelin prevalenssi" },
    ],
    s14Evolution: "Formulan evoluutio: v17 (skalaari cumEMF, RMSE ~1,15) → v19.1 (kaksikanavainen, 54 maata, RMSE 0,522) → v20 (+ Priming × Palautuminen, ennustettu RMSE < 0,45) → v21 (+ Vuodenaika × Genotyyppi, vaatii kalibrointidataa).",
    s14Level: "Episteeminen taso: v20 on M|C (mekanismijohdettu, kalibrointi kesken). v21 on L* (ehdotettu laajennus, kalibrointidataa S- ja G_pop-parametreille ei vielä kerätty).",

    // S15 Palautumisfunktio
    s15Title: "Palautumisfunktio: DNA-korjausajan kvantifiointi",
    s15Text: "[[ref:ivancsits_dna_recovery|Ivancsits ym.]] osoittivat, että EMF:n aiheuttamat DNA-katkokset palautuivat normaalitasolle 9 tunnin kuluessa altistuksen lopettamisesta. Eksponentiaalisovituksella saadaan aikavakio τ ≈ 3–4 tuntia. Tämä yhdistyy suoraan kaavan v20 palautumistekijään R = 1 + β × EMF_vapaat_tunnit, missä [[ref:ivancsits_dna_recovery|Ivancsitsin data]] viittaa arvoon β ≈ 0,11.",
    s15TableTime: "Aika altistuksen jälkeen",
    s15TableDamage: "Jäljellä oleva vaurio",
    s15TableScenario: "Skenaario",
    s15TableFreeTime: "EMF-vapaa aika",
    s15TableRemaining: "Jäljellä oleva vaurio",
  },
  ja: {
    meta: { title: "数学 - Extinction Field", description: "BERMモデルのLindgren幾何学からTFR予測までの完全な数学的導出。すべてのステップは検証可能です。" },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgren幾何学" },
      { id: "evo-calibration", num: "§1b", label: "進化的キャリブレーション" },
      { id: "chi", num: "§2", label: "選択則 χ(Ā)" },
      { id: "three-channel-derivation", num: "§2b", label: "3チャネル導出" },
      { id: "two-channel", num: "§3", label: "2チャネルモデル" },
      { id: "biocap", num: "§4", label: "生物学的容量" },
      { id: "behavioral", num: "§5", label: "行動因子" },
      { id: "cell-size-frequency", num: "§5b", label: "細胞サイズ×周波数" },
      { id: "cultural", num: "§6", label: "文化/補償" },
      { id: "jacobian", num: "§7", label: "ヤコビアン" },
      { id: "locked", num: "§8", label: "ロック済み予測" },
      { id: "falsification", num: "§9", label: "反証条件" },
      { id: "pharmacological", num: "§10", label: "薬理学的検証" },
      { id: "individual-susceptibility", num: "§11", label: "個人感受性" },
      { id: "cross-sectional", num: "§12", label: "横断的検証" },
      { id: "nested-chi", num: "§13", label: "ネストされたχ（集団モデル）" },
      { id: "layered-formula", num: "§14", label: "階層式 v20→v21" },
      { id: "recovery-function", num: "§15", label: "回復関数" },
    ],
    pageTitle: "数学的基盤",
    pageSubtitle: "BERMモデルのLindgren幾何学からTFR予測までの完全な導出。すべての方程式は前の方程式から導出可能です。「完全な導出」をクリックして中間ステップを確認してください。",
    s1Title: "Lindgren幾何学",
    s1Intro: "[[ref:lindgren2025|Lindgren、Kovacs、Liukkonen（2025）]]の枠組みでは、電磁ポテンシャルは時空幾何学の一部です。計量テンソルがEM四元ポテンシャルを吸収します：",
    s1After: "これは電磁場がイオンチャネルを含むすべての物理プロセスが発生する幾何学を変化させることを意味します。Maxwell方程式はこの幾何学のBianchi恒等式として導かれます。",
    s1d1: "標準的な一般相対性理論では計量は動的です：",
    s1d2: "Lindgrenの枠組みでは、EMポテンシャルが重力摂動に置き換わります：",
    s1d3: "ここでκは結合定数（適切な単位で1に正規化）。",
    s1d4: "Maxwell方程式はBianchi恒等式から導かれます：",
    s1d5: "[[ref:vassallo2025|Vassallo et al.（2025）]]がこの導出を独立に検証しました。",
    s1d6: "見かけ上の問題（素朴な計算からδV_mem ≈ 10⁻²¹ V）は3つの独立したメカニズムで解決されます：",
    s1d6a: "(1) IFO：イオン強制振動がS4電圧センサーに<1 nm距離で直接作用、閾値10⁻⁵ V/m（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）。",
    s1d6b: "(2) 非イオノトロピックVGCCシグナリング：イオンフラックスなしの構造変化、より低いエネルギー閾値（[[ref:trus2024|Trus & Atlas 2024]]）。",
    s1d6c: "(3) RPM経路はVGCCを完全にバイパス：RPMハミルトニアン要素の87.5%がLindgren幾何学から導出可能。",
    s1bTitle: "進化的キャリブレーション",
    s1bIntro: "生物学的センサーは量子限界で電磁信号を検出するように進化しました。ヒトの目は単一光子（~4×10⁻¹⁹ J、熱雑音エネルギーの10分の1 — [[ref:vaziri2016|Vaziri et al. 2016]]）を検出します。サメの電気受容器は0.5 µV/mの場を検出します。渡り鳥のコンパスは15 nTのRFノイズで妨害されます。イオンチャネルは10⁻⁵ V/mの偏波場に応答します（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）。[[ref:lindgren2025|Lindgrenのχ(Ā)]] ≈ 1.0（膜において）はこの感度の幾何学的理由です：膜はその内部場（7×10⁶ V/m）が感受性関数を飽和させるため、最大限に感受性があります。",
    s1bAfter: "IF周波数やRF周波数に対する進化したフィルターは存在しません。これらの周波数は38億年の生物進化の間に存在しなかったからです。イオンチャネルは広帯域受信機です — 進化は検出感度を最適化し、周波数除去を最適化しませんでした。すべての技術的信号は潜在的な撹乱です。",
    s1bd1: "増幅カスケード — 光子アナロジー：",
    s1bd2: "目：1光子→ロドプシン→トランスデューシン→PDE→cGMP→測定可能な電流。増幅率：~10⁶×。",
    s1bd3: "VGCC：1 S4構造変化→非イオノトロピックシグナル（[[ref:trus2024|Trus & Atlas 2024]]）またはイオンフラックス→Ca²⁺→カルモジュリン→カスケード。増幅率：~10⁴–10⁶×。",
    s1bd4: "Hopf点付近の分岐：G = 1/(2µ)。小さなROS変化→巨視的出力。追加増幅率：~10²–10³×。",
    s1bd5: "総増幅率：10⁶–10⁹× — 目の光子増幅カスケードと同じ桁数。",
    s2bTitle: "3チャネル導出",
    s2bIntro: "2つの生物学的カットオフ周波数がEMFスペクトルを3つの領域に分割し、それぞれ異なる生物物理学的メカニズムを持ちます。これらのカットオフは細胞生物学の基本的な性質であり、任意のパラメータではありません。",
    s2bFC: "f_c ≈ 1 kHz — 膜のRC時定数。f_c以下：場が膜全体にかかりV_memを摂動します。f_c以上：場が細胞内部に浸透します。",
    s2bFRPM: "f_RPM ≈ 1 MHz — ラジカル対コヒーレンスの限界。f_RPM以上：古典的な場-膜相互作用は弱まりますが、量子スピン効果が関連するようになります。",
    s2bELF: "ELFチャネル（f < ~1 kHz）：場が膜全体にかかります。ΔV_mem = E_ext · d_cell · H(f)。χ_memは7×10⁶ V/mで飽和。線形応答。メカニズム：VGCC→Ca²⁺→ROS（経路A）、GPCR-アデノシン（[[ref:pemf_bone_fda_review_2020|PEMF、FDA 1979]]）、Nav変調（[[ref:tms_fda_depression_2008|TMS、FDA 2008]]）、迷走神経（[[ref:vns_gammacore_fda|VNS、FDA 2017]]）。",
    s2bIF: "IFチャネル（f_c < f < f_RPM）：場が細胞内部に浸透。T(f) = 1/√(1+(f_c/f)²)。環境レベルでの主要メカニズム：IFO-VGIC（線形、閾値10⁻⁵ V/m）。卵割溝での幾何学的場増幅：G ≈ (d_cell/d_furrow)² ≈ 25×。分裂細胞への選択的効果。[[ref:ttfields_novocure_fda|TTFields（FDA 2011+）]]がDEPによる治療強度でメカニズムを検証。",
    s2bIFSources: "環境IF源の特性：典型的なLEDドライバーはスイッチング周波数f_sw 20–200 kHzで動作し、2f_sw、3f_sw、5f_swの高調波がMHz範囲まで拡張します。波形は正弦波ではなく方形パルス列であり、連続波源よりも豊富な高調波を生成します。Panagopoulos 2025はパルス場が同じ平均強度の連続波場よりも生物学的に活性が高いことを実証しています。[[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]]はLEDドライバーの近接場放射を直接測定し、センチメートル距離で測定可能なE場成分を確認しました。",
    s2bRF: "RFチャネル（f > ~1 MHz）：膜は透明。古典的な場-膜相互作用は弱い。量子スピン効果が関連。[[ref:lindgren2025|Lindgrenの共変スピン補正]]：B_local = (1/w)b + (A·b)A/(w(1+w))。異方性応答。メカニズム：CRY/RPM→概日リズム撹乱（経路B）、磁気コンパス破壊（[[ref:lindecke2026|Lindecke 2026]]）。",
    s2bRegGapTitle: "IF規制ギャップ",
    s2bRegGap: "ICNIRP 2010はf < 300 Hz（ELF）の曝露限度を設定。[[ref:icnirp2020|ICNIRP 2020]]はf > 100 kHz（RF）の限度を設定。300 Hz < f < 100 kHzの範囲には重複する不整合な限度があります。LEDドライバー放射（20–300 kHz）はこのギャップに該当します。[[ref:ijrb2022_if_review|2022年のIJRBシステマティックレビュー（Ohkubo & Okano）]]は確認しました：「IF-EMFの健康影響に関するより多様な観点からの研究は行われていない。」",
    s2bAfter: "チャネル重み（w_ELF = 0.05、w_IF = 0.60、w_RF = 0.35）は診断的であり、経験的キャリブレーションを必要とします。3チャネル分解は膜生物物理学から構造的に導出されます。相対的な重みだけが不確実です。",
    s2Title: "選択則 χ(Ā)",
    s2Intro: "計量がバックグラウンドĀの周りで線形化されるとき、摂動に対する生物学的に関連する応答",
    s2IntroEnd: "は：",
    s2After: "ゼロバックグラウンド（Ā = 0）では線形応答はありません。細胞膜（Ā ≈ 7 × 10⁶ V/m）で応答は最大です。",
    s2d1: "g_μνをバックグラウンドġ = η + Ā⊗Āの周りで線形化：",
    s2d2: "ここで：",
    s2d3: "1次（線形応答）：",
    s2d4: "生物学的に関連する量は計量摂動の相対的大きさです：",
    s2d5: "これにより選択則が得られます：",
    s2d6: "性質：",
    s2d7: "細胞膜：",
    s2d8: "細胞は外部EMF摂動に対して最大限に感受性があります。",
    s3Title: "2チャネルモデル",
    s3Intro: "総曝露量は2つのチャネルの合計であり、パーソナルチャネルは選択則で変調されます：",
    s3d1: "環境 = 基地局 + Wi-Fi + IoT（インフラレベル）",
    s3d2: "パーソナル = 電話 + イヤホン + 腕時計（個人デバイス）",
    s3d3: "環境はχを決定するバックグラウンドĀです。",
    s3d4: "パーソナルは生物学的応答がχ(Ā)に依存する摂動aです。",
    s3d5: "Ā = 0（アーミッシュ）の場合：total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ 個人デバイスは生物学的応答を生じません。",
    s3d7: "Ā → ∞（飽和都市）の場合：total ≈ ambient + 1 × personal",
    s3d8: "→ パーソナルが全強度で追加されます。",
    s3d9: "累積曝露量は歴史的な合計です：",
    s3d10: "ここでstartは国のEMF履歴開始年（例：フィンランド1991年）。",
    s3rwTitle: "なぜ累積曝露が機能するか：回復ウィンドウ",
    s3rwIntro: "DNA修復容量が有限であるため、累積曝露量が正しいメトリックです。BER（塩基除去修復）経路の半減期はτ_repair ≈ 6時間です。1日の正味損傷は曝露時間と回復時間の比率に依存します：",
    s3rwTable: "歴史的曝露シナリオ：",
    s3rwRow1: "1950年（ラジオ + TV）：4h EMF、20h フリー → 90%修復 → 正味0.40/日",
    s3rwRow2: "1990年（電話、Wi-Fiなし）：8h EMF、16h フリー → 84%修復 → 正味1.26/日",
    s3rwRow3: "2010年（スマートフォン + Wi-Fi）：16h EMF、8h フリー → 60%修復 → 正味6.35/日",
    s3rwRow4: "2020年（24/7 Wi-Fi + IoT）：22h EMF、2h フリー → 21%修復 → 正味17.46/日",
    s3rwRow5: "アーミッシュ（電子機器なし）：1h EMF、23h フリー → 93%修復 → 正味0.07/日",
    s3rwThreshold: "臨界閾値：EMFフリー期間 < 2×修復半減期（BERで<12h）の場合、修復は不完全で累積が始まります。現代人はこの閾値を2005〜2010年頃に超えました。",
    s3tcTitle: "3チャネル拡張",
    s3tcIntro: "3チャネル分解では、cumEMFは周波数固有の累積曝露の加重和になります：",
    s3tcAfter: "チャネル重みは周波数固有で組織依存です（§2b参照）。上記の単一チャネルcumEMFは3チャネルの加重集約です。チャネル重み（0.05/0.60/0.35）は経験的キャリブレーションを必要とする診断的推定値です。",
    s3ifoTitle: "IF応答関数：IFO vs DEP vs Cyb5b",
    s3ifoIntro: "IFチャネル応答は、異なる強度域と周波数帯で動作する3つのメカニズムの合計です：",
    s3ifoIfo: "R_IFO — イオン強制振動：E_extに線形、閾値10⁻⁵ V/m、環境レベル（0.01–3 V/m）で支配的。偏波、コヒーレントIF場が電圧依存性イオンチャネルの不規則なゲーティングを強制（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）。",
    s3ifoDep: "R_DEP — 誘電泳動：E_extに二次、TTFields治療レベル（100–300 V/m）で支配的。細胞内構造への並進力に高い場勾配が必要。",
    s3ifoCyb5b: "R_Cyb5b — ミトコンドリア外膜トランスダクション：ゲノムワイドCRISPRスクリーニングでEMFセンサーとして同定されたCyb5b（[[ref:kim2026_cell_gene_switch|Kim et al. 2026、Cell]]）。60 Hzパルス EMF → Cyb5b構造変化 → Ca²⁺オシレーション → 遺伝子プロモーター活性化。ELF周波数（50/60 Hz）で動作し、ELFチャネルを遺伝子発現制御に直接結合 — IFOとRPMの両方から独立した経路。",
    s3ifoAfter: "環境強度ではR_IFO ≫ R_DEP → 線形応答。治療強度ではR_DEP ≫ R_IFO → 二次応答。R_Cyb5bは膜イオンチャネルゲーティングとは独立に動作するELF特異的遺伝子制御経路を追加します。治療デバイスと環境曝露の間の強度ギャップは存在しません — DEPが唯一のメカニズムであるという仮定のアーティファクトです。",
    s4Title: "生物学的容量",
    s4Intro: "生物学的容量は累積曝露の関数として指数関数的に減少し、閾値以下では修復メカニズムが補償します：",
    s4Params: "（EMF以前のベースラインTFR）、",
    s4Params2: "（減少パラメータ）、",
    s4Params3: "（閾値）。",
    s4d1: "指数関数的減少は、各年のEMF曝露が比例的に等しい生物学的損傷を生じるという仮定から導かれます：",
    s4d2: "積分すると：",
    s4d3: "閾値θ = 5は生物学的抵抗性を反映：小さな曝露は修復メカニズムの容量を超えません。",
    s4d4: "a = 6.5はキャリブレーション済み：EMF曝露なしの近似的な「自然TFR」です（参照：アーミッシュ ≈ 6.5、フッター派 ≈ 9.0）。",
    s4d5Link: "→ bioCパラメータの管理された実験室的証拠",
    s5Title: "行動因子",
    s5Intro: "内分泌ベクトル（テストステロン、オキシトシン、ドーパミン、コルチゾール、バソプレシン）の幾何平均：",
    s5d1: "各ホルモンは指数関数的に減少します：",
    s5d2: "幾何平均：(OT × T × DA × cort × AVP)^(1/5)",
    s5d3: "幾何 > 算術。ホルモンは乗法的であるため：いずれか1つがゼロなら、総合効果はゼロです。",
    s5d4: "r₂ = 0.013は[[ref:travison2007_v2|Travisonの−1%/年テストステロン減少]]からキャリブレーション：",
    s5d5: "dEMF/dt ≈ 1/年の場合 → dT/T ≈ −1.3%/年 ≈ [[ref:travison2007_v2|Travison]]。",
    s5otTitle: "OTパラメータの生物学的根拠",
    s5otIntro: "OTパラメータr₁ = 0.010はデータからフィッティングされたものではありません。EMF条件下でオキシトシンを抑制する2つの独立した生物学的メカニズムから導かれます：",
    s5otRoute1Title: "経路1（HPA → 迷走神経）：",
    s5otRoute1: "EMF → コルチゾール↑（[[ref:pawlak2025|Pawlak 2025、d=1.88]]）→ 迷走神経抑制（[[ref:porges2001|Porges 2001]]）→ オキシトシン↓ → 社会的関与↓（[[ref:carter2021|Carter 2021]]、[[ref:feldman2012|Feldman 2012]]）",
    s5otRoute2Title: "経路2（マイクロバイオーム → 内分泌）：",
    s5otRoute2: "EMF → 腸内マイクロバイオーム撹乱（[[ref:jin2022|Jin 2022]]）→ Lactobacillus↓ → オキシトシン↓（[[ref:erdman2016|Erdman & Poutahidis 2016]]）→ テストステロン↓ → 精子形成↓",
    s5otCombined: "乗法的組み合わせOT_eff = OT_vagal × OT_microbiomeは近似的に指数関数的：OT_eff ≈ exp(−r_eff × cumEMF)、ここでr_eff = r_vagal + r_microbiome ≈ 0.005 + 0.005 = 0.010。これがモデルのパラメータです。",
    s5qsTitle: "4重抑制の導出",
    s5qsIntro: "行動因子は4つの乗法的交配確率の幾何平均であり、各々がホルモンによって媒介されます：",
    s5qsd1: "4つの確率：",
    s5qsd2: "P(接近) — 男性の求愛開始、TとDAによって駆動、コルチゾールによって抑制（[[ref:puts2008|Puts 2008]]；[[ref:mehta2015|Mehta 2015]]）。",
    s5qsd3: "P(魅力) — 女性の魅力応答、男性のT駆動表現型と女性のOT動機に依存（[[ref:thornhill1994|Thornhill 1994]]）。",
    s5qsd4: "P(性行為) — カップル内の性的頻度、OT結合、Tリビドー、コルチゾール/メラトニンストレス状態に依存（[[ref:carter2021|Carter 2021]]）。",
    s5qsd5: "P(受精) — 1回あたりの生物学的受精確率、精子品質とCatSperカスケードに依存。",
    s5qsd6: "モデルのbehav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4)は幾何平均近似です。各P_iは同じ指数関数的ホルモン依存性を共有するため、4つの積の幾何平均は個々のホルモン項の幾何平均に帰着します。",
    s5qsd7: "デュアルホルモン補正（[[ref:mehta2015|Mehta & Prasad 2015]]、[[ref:dual_hormone_meta2021|メタN=8538、r=-.061]]）：Tの行動的発現には低コルチゾールが必要。EMFは同時にTを低下させ（[[ref:who_t_meta|WHO meta: SMD 0.87]]）かつコルチゾールを上昇させ（[[ref:pawlak2025|Pawlak 2025: d=1.88]]）、接近行動に二重ロックを生じます。",
    s5qsd8: "制限：[[ref:dual_hormone_meta2021|デュアルホルモンメタ分析]]の効果量は小さい（r=-.061）。プロキシチェーン（EMF → T↓ → 接近↓ → TFR↓）は全体としてテストされていません。各リンクは個別に文書化されていますが、完全なチェーンは推論です。",

    // S5 受精の5つのゲート
    s5fertTitle: "受精確率：直列の5つのゲート",
    s5fertLead:
      "各ゲートはCa²⁺依存性であり、個別にEMF撹乱に脆弱です：",
    s5fertG1: "受精能獲得（CatSper依存性Ca²⁺振動）",
    s5fertG2: "走流性（CatSper依存性の流れに逆らう回転）",
    s5fertG3: "走化性（CatSperを介したプロゲステロン＋温度勾配）",
    s5fertG4: "先体反応（二重Ca²⁺：CatSper＋IP₃貯蔵）",
    s5fertG5: "卵子活性化（精子が運ぶCa²⁺振動因子）",
    s5fertConclusion:
      "各ゲートで10%の低下が複合：0.9⁵ = 0.59 → 個別には軽微な撹乱から受精確率が41%低下。",

    s5bTitle: "細胞サイズ×周波数共鳴",
    s5bIntro: "[[ref:ttfields_cell_size_frequency|TTFieldsの臨床データ]]は細胞サイズと最適撹乱周波数の間の定量的関係を明らかにします。この関係はFDAフェーズIIIデータからキャリブレーションされ、BERMの標的組織に外挿されています。",
    s5bFormula: "ここでK ≈ 3.7 Hz·m、[[ref:ttfields_cell_size_frequency|4つのがん種にわたるTTFields臨床データ]]からキャリブレーション。",
    s5bd1: "[[ref:ttfields_cell_size_frequency|TTFields臨床周波数（FDA PMAデータ）]]：",
    s5bd2: "GBM（18 µm）：200 kHz。膵臓（15 µm）：150 kHz。乳房（20 µm）：120 kHz。黒色腫（~25 µm）：100 kHz。",
    s5bd3: "BERM標的細胞への外挿：",
    s5bd4: "精原細胞（12 µm）：f_opt ≈ 310 kHz — LEDドライバースイッチング範囲。腸上皮（10 µm）：f_opt ≈ 370 kHz。卵母細胞（120 µm）：f_opt ≈ 31 kHz — HVAC VFD範囲。",
    s5bd5: "LEDドライバーは通常20–500 kHzでスイッチングし、高調波は1 MHzを超えます。精原細胞共鳴（310 kHz）との重複は設計されたものではなく、エンジニアリング最適化と細胞生物学の偶然の一致です。",
    s6Title: "文化因子と補償",
    s6Intro: "予測TFRは3つの層すべてを組み合わせます：",
    s6Alpha: "は生物学的に導出された補償指数です。",
    s6d1: "文化率は残差です：bioCとbehavが説明しないすべてを含みます。2024年からキャリブレーション：",
    s6d2: "補償項：社会は生物学的減少を部分的に補償します（ART、出生促進政策、行動変化）：",
    s6d3: "α = 0.43は生物学的回復構造から導出されます：",
    s6TableLayer: "層",
    s6TableWeight: "重み",
    s6TableVGIC: "VGIC（即時、可逆）",
    s6TableROS: "ROS（日〜週）",
    s6TableDNA: "DNA（部分的に不可逆）",
    s6TableLeydig: "Leydig（月〜年）",
    s6TableNeuron: "ニューロン（永久）",
    s6TableFooter: "α_eff = Σ(重み × α)",
    s6d4: "有効な影響：",
    s6d5: "α = 0.43 → 指数 = 0.57",
    s6d6: "α = 1.0 → 指数 = 0（完全補償、EMF効果なし）",
    s6d7: "α = 0.0 → 指数 = 1.0（補償なし、直接効果）",
    s7Title: "ヤコビアン",
    s7Intro: "モデルのEMFに対する全微分は6つの偏微分の積です。いずれかの因子がゼロならチェーン全体が断絶します：",
    s7d1: "各因子：",
    s7d1a: "EM場のラジカル対への効果 → CRYチャネル、スピン化学、χ_B",
    s7d1b: "ラジカル対の効果 → ROS濃度 → ミトコンドリア応答",
    s7d1c: "ROS濃度 → 細胞状態 → SDF、脂質過酸化、タンパク質損傷",
    s7d1d: "細胞状態 → 生体電気状態 → V_mem変化、イオンチャネル動態",
    s7d1e: "生体電気状態 → 生殖 → 精子形成、排卵、受精",
    s7d1f: "生殖能力 → TFR → fecundability → TTP → ASFR → TFR",
    s8Title: "ロック済み予測",
    s8Intro: "モデルは具体的でロックされた予測を生成し、それらは実現するかしないかのいずれかです。ロックは取消不能です：バージョン番号の更新なしに予測を遡及的に変更することはできません。",
    s8Country: "国",
    s8Year: "年",
    s8Metric: "指標",
    s8Central: "中央値",
    s8CI: "95% CI",
    s8Locked: "ロック日",
    s8Footer: "予測はv17.0 git SHAで凍結。将来の観測がCIの外に落ちた場合、モデルは反証されます — 予測は調整されません。",
    s9Title: "反証条件",
    s9Intro: "モデルは明示的に反証可能です。各条件は具体的で検証可能です：",
    s9Items: [
      { condition: "Lindgrenの計量が数学的に不正確", detail: "導出g_μν = η_μν + A_μA_νが内的に矛盾するか、確立された電気力学と矛盾することが示された場合、幾何学的基盤は失敗します。" },
      { condition: "VGCCブロッカーがEMFの生物学的効果を防がない", detail: "カルシウムチャネルブロッカーが管理された実験でEMF誘発ROS、SDF、またはホルモン変化を減衰させない場合、一次メカニズムは誤りです。" },
      { condition: "アーミッシュコミュニティのTFRが一般集団と同じ速度で低下", detail: "アーミッシュは準実験的対照群として機能します。現在のアーミッシュTFR ≈ 6.5は安定しており、周囲の集団は低下しています。" },
      { condition: "精子濃度の低下がEMF曝露の減少なしに停止", detail: "−1.2%/年の精子減少が累積EMFの増加が続く中で反転または安定した場合、用量-応答関係は誤りです。" },
      { condition: "ロックされた予測が信頼区間外で失敗", detail: "§8の予測が観測年に到達した時に95% CIの外に落ちた場合、その予測の範囲でモデルは反証されます。" },
    ],
    s10Title: "薬理学的検証マトリックス",
    s10Intro: "3つの独立した薬理学的介入が別々の経路の定量的キャリブレーションアンカーを提供します。各薬剤は特定のメカニズムを分離し、モデルの経路構造を独立に検証可能にします。",
    s10Drug: "薬剤",
    s10Target: "標的",
    s10Pathway: "経路",
    s10Observed: "観察された効果",
    s10Calibration: "BERMキャリブレーション",
    s10Rows: [
      { drug: "CCB（ニフェジピン）", target: "L型VGCC", pathway: "A (VGCC→ROS→SDF)", observed: "90% VGCCブロック → −23%精子濃度", calibration: "EMF撹乱 ≈ 6%" },
      { drug: "ラパマイシン", target: "mTOR（85%阻害）", pathway: "Sempou (mTOR→老化)", observed: "寿命+10–25%（マウス）", calibration: "mTOR_eff × 0.15" },
      { drug: "メラトニン", target: "CRY/概日リズム", pathway: "C (CRY→時計→排卵)", observed: "概日振幅を回復", calibration: "夜間EMF分率補正" },
    ],
    s10d1: "CCBキャリブレーション（経路A）：",
    s10d2: "この6%の有効VGCC撹乱は、5年間の累積曝露における観察された−1.2%/年の精子減少と一致します。",
    s10d3: "ラパマイシンキャリブレーション（Sempou経路）：",
    s10d4: "観察されたマウスの10–25%寿命延長は、現実的な投与レジメンでの部分的mTOR減少と一致します。",
    s10d5: "メラトニンキャリブレーション（経路C）：",
    s10d6: "夜間EMF曝露はCRY媒介概日シグナリングを撹乱します。外因性メラトニン（3–5 mg）はCRYとは独立に概日振幅を回復させ、経路Cのバイパスを提供します。",
    s10d7Link: "→ 管理された実験的証拠（実験室哺乳類）",
    s11Title: "個人感受性とχ分布",
    s11Intro: "集団レベルの選択則χ(Ā)は平均応答を予測します。個人は3つの測定可能な因子により変動します：VGCCジェノタイプ、解剖学的幾何学、累積アロスタティック負荷。個人感受性修飾因子は：",
    s11After: "これは同じ環境場にいる2人の個人が桁違いの有効生物学的線量を経験する可能性があることを意味します。集団TFRは個人χ分布上の畳み込みです — 平均は裾を隠します。",
    s11d1: "VGCCジェノタイプ修飾因子はCACNA1C rs1006737の機能的表現型決定から導かれます：",
    s11d2: "AAホモ接合リスクキャリアは場摂動単位あたり40%大きいCa²⁺流入を示します。",
    s11d3: "解剖学的修飾因子は内部場分布に影響する組織幾何学を説明します：",
    s11d4: "6歳未満の子供は同じ外部場で成人の2–3倍のSARを受けます（[[ref:gandhi1996|Gandhi 1996]]）。BMIは脂肪層減衰を調節します。",
    s11d5: "累積修飾因子は[[ref:selye1936|Selyeの一般適応症候群]]の段階を使用します：",
    s11d6: "抵抗段階では補償容量が線形に減少します。疲弊段階（アロスタティック負荷 > 15）では補償が崩壊し、有効修飾因子が急激に増幅されます — これが予測されるEHS発症域です。",
    s11d7: "結合された個人修飾因子は集団χに乗算されます：",
    s11d8: "集団レベルのTFR予測では、BERMはジェノタイプ頻度分布（Hardy-Weinberg）× 解剖学的人口統計 × 曝露期間分布にわたって積分します。平均個人修飾因子は構造的に1.0です。診断的価値は裾にあります。",
    s11d9Link: "→ 個人感受性の証拠",
    s12Title: "横断的検証 v19.1",
    s12Intro: "54カ国（2022年データ）にわたる公式発見は、時間的モデルの独立した検証を提供します。横断的公式は2つのEMFプロキシ変数と1つのバイナリ閾値を使用して、LOOCV RMSE 0.522で国家TFRを予測します。",
    s12Formula: "2チャネルEMFインデックスは住宅電力消費（ELFプロキシ）と固定ブロードバンド加入（RFプロキシ）を組み合わせます：",
    s12Access: "電力アクセスはバイナリ生物学的曝露境界として機能します。IFO-VGIC活性化閾値（10⁻⁵ V/m）はすべての家庭電気機器の動作距離で超過されます。電力のない集団は曝露されません。",
    s12Stats: "検証統計：",
    s12Stat1: "LOOCV RMSE = 0.522（完全モデル、1カ国除外交差検証）",
    s12Stat2: "R² = 0.851（n = 54；電化閾値を捉えており、EMF固有の効果ではない）",
    s12Stat3: "スキルスコア = 0.61（1 − RMSE/sd、平均予測に対する改善）",
    s12Stat4: "住宅電力消費が最良の単一予測因子（単変量RMSE 0.533）",
    s12Stat5: "携帯電話加入が最も弱い（RMSE 1.053）",
    s12Mobile: "携帯電話パラドックス：メカニズムが「情報アクセス→家族計画の選択」であれば、情報デバイス（携帯電話）が最強の予測因子であるべきです。最も弱いのです。インフラ変数（住宅電力消費）が最もよく予測します — 情報メカニズムではなく物理的曝露メカニズムと一致します。",
    s12Electrified: "部分的に電化された国では、電化サブ集団のTFRはバイナリ混合モデルから推定できます：",
    s12Collinearity: "GDP共線性：EMFプロキシとGDP/capitaは相関（r = 0.87）。線形モデルでは、一方を制御すると他方は有意でなくなります。これは対称的な識別問題であり、EMFに不利な証拠ではありません。3つの構造的差異が対称性を破ります：(1)バイナリ電化閾値、(2)携帯電話パラドックス、(3)センチネル種はEMFに反応するがGDPには反応しない。",
    s12Limitation: "正直な評価：R² = 0.851は主に人口転換の勾配（ニジェール→韓国）を反映しており、EMF固有の分散ではありません。高所得OECD諸国（n ≈ 36）では、電力消費量だけではTFRの分散をほぼ説明できません（R² ≈ 0.0002）。横断的公式は電化閾値 — 前工業社会から工業社会への二値的なゲートウェイ — を捉えており、電化された集団内での用量反応ではありません。これにより横断分析はBERMの最も弱い独立した証拠線となります。より強い証拠は：(1)規制当局が検証した非熱効果を持つメカニズム経路、(2)薬理学的用量反応（メラトニン、テストステロン）、(3)遺伝的選択マーカー（CatSper、VGCC）、(4)管理条件下のセンチネル種から来ます。横断分析の価値は構造的です：携帯電話パラドックスと電力＞GDP予測は弁別的であり、集計的な適合が交絡していても意味があります。",
    s12DataNote: "再現データ：54カ国サンプル名簿（観測TFR、電力消費、ブロードバンド加入、モデル予測）は/data/cross_section_manifest.csvで入手可能。出典：UN WPP 2024（TFR）、OWID/IEA（電力）、ITU（ブロードバンド）。",
    s12Caveat: "横断的分析は因果方向を決定できません。弁別的証拠はセンチネル種、自然実験、電力のない集団から得られます。",
    s13Title: "ネストされたχ（集団モデル）",
    s13Intro: "χ選択則は、生物学的バックグラウンド変数（光学的、分子的）がグループ間で異なる場合に集団に一般化されます。経路AとCからの結合された生殖抑制、集団固有のχプロファイルで変調：",
    s13PathwayA: "経路A（VGIC）",
    s13PathwayC: "経路C（CRY/RPM）",
    s13Combined: "結合された抑制",
    s13TFR: "集団TFR",
    s13Where: "ここでγ_A、γ_Cは経路重み（0.75、0.25）；χ(Ā_env)は環境結合；χ(V_mem)は膜バックグラウンド（生細胞で≈ 1.0）；χ(I_blue)は光学的結合（虹彩依存）；χ([FAD])は分子結合（B2依存）；EMF_personalは個人デバイスの寄与です。",
    s13Implication: "この定式化は、より高い生物学的χ値を持つ集団（青い目、乳糖耐性）が環境EMFの単位増加あたりより急峻なTFR低下を経験することを予測します。",
    s13Level: "認識論的レベル：L*（検証可能な統合）。個々のχインスタンスはEまたはM|Cレベル；集団レベルの積分はL*コンポーネントです。",
    s14Title: "階層式 v20 → v21",
    s14Intro: "元の横断的公式（v19.1）は2チャネルEMFインデックスを使用します。階層式はプライミング履歴、回復能力、季節変調、集団ジェノタイプを組み込んで拡張します。",
    s14V20Title: "公式v20（プライミング × 回復）",
    s14V20: "TFR ≈ A × exp(−B × EMF_eff) + C",
    s14V20Detail: "EMF_eff = EMF_comp × P × (1/R)",
    s14V20Composite: "EMF_comp = w_ELF × ELF + w_IF × IF + w_RF × RF",
    s14V20Priming: "P = 1 + α × min(electrification_years, P_max)",
    s14V20Recovery: "R = 1 + β × EMF_free_hours/day",
    s14V20Desc: "EMF_compは3チャネル加重コンポジット（ELF < 300 Hz、IF 300 Hz–10 MHz、RF > 10 MHz）です。Pは数十年の送電網曝露からの累積プライミングを捕捉 — 電化年数がVGCC発現を上方制御し、後続のすべてのEMFに対して細胞をより感受性にします。Rは回復ウィンドウを捕捉：1日の有意なEMFなしの時間がCaMKII脱リン酸化とCa²⁺恒常性の回復を可能にします。",
    s14V21Title: "公式v21（提案：+ 季節 × ジェノタイプ）",
    s14V21: "EMF_eff = EMF_comp × P × (1/R) × S × G_pop",
    s14V21Season: "S = 1 + γ × f(latitude, season)",
    s14V21Genotype: "G_pop = 1 + δ × CACNA1C_A_allele_frequency",
    s14V21Optional: "オプション補正因子（データ依存）：H = 湿度/沿岸補正、B = 建築材料RF反射係数",
    s14V21Desc: "Sは CRY磁気受容体感度の季節変動を捕捉：高緯度の冬はEMF摂動に対するCRY感度を高めます（[[ref:halgamuge2015|Halgamuge 2015]]）。G_popはCACNA1C rs1006737 Aアレル頻度による集団レベルの遺伝的感受性を捕捉します（[[ref:sousouri2025|Sousouri 2025]]）。",
    s14ParamsTitle: "パラメータの解釈",
    s14Params: [
      { param: "P（プライミング）", amish: "1.0（プライミングなし）", finland: "2.2（100+年電化）", nigeria: "1.45（~15年）", desc: "細胞のEMF応答への「準備度」" },
      { param: "1/R（回復不足）", amish: "0.48（完全回復）", finland: "1.0（WiFi 24/7）", nigeria: "0.67（部分的）", desc: "Ca²⁺恒常性は夜間に回復するか" },
      { param: "S（季節）", amish: "~1.0", finland: "0.9–1.3", nigeria: "~1.0", desc: "光によるCRY感度変調" },
      { param: "G_pop（ジェノタイプ）", amish: "~1.0", finland: "~1.1", nigeria: "~0.95", desc: "集団CACNA1C Aアレル有病率" },
    ],
    s14Evolution: "公式の進化：v17（スカラーcumEMF、RMSE ~1.15）→ v19.1（2チャネル、54カ国、RMSE 0.522）→ v20（+ プライミング × 回復、予測RMSE < 0.45）→ v21（+ 季節 × ジェノタイプ、キャリブレーションデータ必要）。",
    s14Level: "認識論的レベル：v20はM|C（メカニズム導出、キャリブレーション保留）。v21はL*（提案された拡張、SとG_popのキャリブレーションデータは未収集）。",
    s15Title: "回復関数：DNA修復時間の定量化",
    s15Text: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]]はEMF誘発DNA鎖切断が曝露停止後9時間以内に正常に戻ることを実証しました。指数関数的減衰モデルへのフィッティングにより、時定数τ ≈ 3–4時間が得られます。これは公式v20の回復因子Rに直接対応します：R = 1 + β × EMF_free_hours、ここで[[ref:ivancsits_dna_recovery|Ivancsitsデータ]]はβ ≈ 0.11を示唆します。",
    s15TableTime: "曝露後の時間",
    s15TableDamage: "残存損傷",
    s15TableScenario: "シナリオ",
    s15TableFreeTime: "EMFフリー時間",
    s15TableRemaining: "残存損傷",
  },
  fr: {
    meta: { title: "Mathématiques - Extinction Field", description: "Dérivation mathématique complète du modèle BERM, de la géométrie de Lindgren à la prédiction du TFR. Chaque étape est vérifiable." },
    sections: [
      { id: "lindgren", num: "§1", label: "Géométrie de Lindgren" },
      { id: "evo-calibration", num: "§1b", label: "Calibration évolutive" },
      { id: "chi", num: "§2", label: "Règle de sélection χ(Ā)" },
      { id: "three-channel-derivation", num: "§2b", label: "Dérivation trois canaux" },
      { id: "two-channel", num: "§3", label: "Modèle deux canaux" },
      { id: "biocap", num: "§4", label: "Capacité biologique" },
      { id: "behavioral", num: "§5", label: "Facteur comportemental" },
      { id: "cell-size-frequency", num: "§5b", label: "Taille cellulaire × fréquence" },
      { id: "cultural", num: "§6", label: "Culture / compensation" },
      { id: "jacobian", num: "§7", label: "Jacobien" },
      { id: "locked", num: "§8", label: "Prédictions verrouillées" },
      { id: "falsification", num: "§9", label: "Conditions de falsification" },
      { id: "pharmacological", num: "§10", label: "Validation pharmacologique" },
      { id: "individual-susceptibility", num: "§11", label: "Susceptibilité individuelle" },
      { id: "cross-sectional", num: "§12", label: "Validation transversale" },
      { id: "nested-chi", num: "§13", label: "χ imbriqué (modèle de population)" },
      { id: "layered-formula", num: "§14", label: "Formule stratifiée v20→v21" },
      { id: "recovery-function", num: "§15", label: "Fonction de récupération" },
    ],
    pageTitle: "Fondement mathématique",
    pageSubtitle: "Dérivation complète du modèle BERM de la géométrie de Lindgren à la prédiction du TFR. Chaque équation est dérivable de la précédente. Cliquez sur « Dérivation complète » pour voir les étapes intermédiaires.",
    s1Title: "Géométrie de Lindgren",
    s1Intro: "Dans le cadre de [[ref:lindgren2025|Lindgren, Kovacs & Liukkonen (2025)]], le potentiel électromagnétique fait partie de la géométrie de l'espace-temps. Le tenseur métrique absorbe le quadri-potentiel EM :",
    s1After: "Cela signifie que le champ électromagnétique modifie la géométrie dans laquelle tous les processus physiques se produisent — y compris les canaux ioniques biologiques. Les équations de Maxwell émergent comme identités de Bianchi de cette géométrie.",
    s1d1: "En RG standard, la métrique est dynamique :",
    s1d2: "Dans le cadre de Lindgren, le potentiel EM remplace la perturbation gravitationnelle :",
    s1d3: "où κ est une constante de couplage (normalisée à 1 dans les unités appropriées).",
    s1d4: "Les équations de Maxwell découlent des identités de Bianchi :",
    s1d5: "[[ref:vassallo2025|Vassallo et al. (2025)]] ont validé cette dérivation indépendamment.",
    s1d6: "Le problème apparent (δV_mem ≈ 10⁻²¹ V d'un calcul naïf) est résolu par trois mécanismes indépendants :",
    s1d6a: "(1) IFO : l'oscillation forcée des ions agit directement sur le capteur de tension S4 à <1 nm de distance, seuil 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s1d6b: "(2) Signalisation VGCC non ionotropique : changement conformationnel sans flux ionique, seuil d'énergie plus bas ([[ref:trus2024|Trus & Atlas 2024]]).",
    s1d6c: "(3) La voie RPM contourne complètement le VGCC : 87,5 % des éléments hamiltoniens RPM sont dérivables de la géométrie de Lindgren.",
    s1bTitle: "Calibration évolutive",
    s1bIntro: "Les capteurs biologiques ont évolué pour détecter les signaux électromagnétiques à la limite quantique. L'œil humain détecte des photons individuels (~4×10⁻¹⁹ J — [[ref:vaziri2016|Vaziri et al. 2016]]). Les électrorécepteurs de requin détectent des champs de 0,5 µV/m. La boussole des oiseaux migrateurs est perturbée par un bruit RF de 15 nT. Les canaux ioniques répondent à des champs polarisés de 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Le [[ref:lindgren2025|χ(Ā) ≈ 1,0 de Lindgren]] à la membrane est la raison géométrique de cette sensibilité.",
    s1bAfter: "Il n'existe aucun filtre évolué pour les fréquences IF ou RF car ces fréquences n'existaient pas pendant 3,8 milliards d'années d'évolution biologique. Les canaux ioniques sont des récepteurs large bande — l'évolution a optimisé la sensibilité de détection, pas le rejet de fréquence.",
    s1bd1: "Cascade d'amplification — analogie photonique :",
    s1bd2: "Œil : 1 photon → rhodopsine → transducine → PDE → cGMP → courant mesurable. Gain : ~10⁶×.",
    s1bd3: "VGCC : 1 changement conformationnel S4 → signal non ionotropique ([[ref:trus2024|Trus & Atlas 2024]]) OU flux ionique → Ca²⁺ → calmoduline → cascade. Gain : ~10⁴–10⁶×.",
    s1bd4: "Bifurcation près du point de Hopf : G = 1/(2µ). Petit changement ROS → sortie macroscopique. Gain supplémentaire : ~10²–10³×.",
    s1bd5: "Gain total : 10⁶–10⁹× — même ordre de grandeur que la cascade d'amplification photonique de l'œil.",
    s2bTitle: "Dérivation trois canaux",
    s2bIntro: "Deux fréquences de coupure biologiques divisent le spectre EMF en trois régimes avec des mécanismes biophysiques distincts. Ces coupures sont des propriétés fondamentales de la biologie cellulaire, pas des paramètres arbitraires.",
    s2bFC: "f_c ≈ 1 kHz — la constante de temps RC de la membrane. Sous f_c : le champ tombe à travers la membrane et perturbe V_mem. Au-dessus de f_c : le champ pénètre à l'intérieur de la cellule.",
    s2bFRPM: "f_RPM ≈ 1 MHz — la limite de cohérence de la paire radicale. Au-dessus de f_RPM : l'interaction classique champ-membrane s'affaiblit mais les effets de spin quantique deviennent pertinents.",
    s2bELF: "Canal ELF (f < ~1 kHz) : le champ tombe à travers la membrane. ΔV_mem = E_ext · d_cell · H(f). χ_mem saturé à 7×10⁶ V/m. Réponse linéaire. Mécanismes : VGCC→Ca²⁺→ROS (voie A), GPCR-adénosine ([[ref:pemf_bone_fda_review_2020|PEMF, FDA 1979]]), modulation Nav ([[ref:tms_fda_depression_2008|TMS, FDA 2008]]), nerf vague ([[ref:vns_gammacore_fda|VNS, FDA 2017]]).",
    s2bIF: "Canal IF (f_c < f < f_RPM) : le champ pénètre à l'intérieur de la cellule. T(f) = 1/√(1+(f_c/f)²). Mécanisme primaire aux niveaux environnementaux : IFO-VGIC (linéaire, seuil 10⁻⁵ V/m). Amplification géométrique du champ au sillon de clivage : G ≈ (d_cell/d_furrow)² ≈ 25×. Effet sélectif sur les cellules en division. [[ref:ttfields_novocure_fda|TTFields (FDA 2011+)]] valide le mécanisme à intensité thérapeutique via DEP.",
    s2bIFSources: "Caractérisation des sources IF environnementales : un pilote LED typique fonctionne à une fréquence de commutation f_sw dans la plage 20–200 kHz avec un contenu harmonique à 2f_sw, 3f_sw, 5f_sw s'étendant dans la plage MHz. La forme d'onde est un train d'impulsions carrées, pas une sinusoïde. Panagopoulos 2025 démontre que les champs pulsés sont biologiquement plus actifs que les champs à onde continue à la même intensité moyenne.",
    s2bRF: "Canal RF (f > ~1 MHz) : la membrane est transparente. L'interaction classique champ-membrane est faible. Les effets de spin quantique deviennent pertinents. [[ref:lindgren2025|Correction de spin covariante de Lindgren]] : B_local = (1/w)b + (A·b)A/(w(1+w)). Réponse anisotrope. Mécanismes : CRY/RPM→perturbation circadienne (voie B), corruption de la boussole magnétique ([[ref:lindecke2026|Lindecke 2026]]).",
    s2bRegGapTitle: "Le fossé réglementaire IF",
    s2bRegGap: "L'ICNIRP 2010 fixe les limites d'exposition pour f < 300 Hz (ELF). L'[[ref:icnirp2020|ICNIRP 2020]] fixe les limites pour f > 100 kHz (RF). La plage 300 Hz < f < 100 kHz a des limites qui se chevauchent et sont incohérentes. Les émissions des pilotes LED (20–300 kHz) tombent dans ce fossé.",
    s2bAfter: "Les poids des canaux (w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35) sont DIAGNOSTIQUES et nécessitent une calibration empirique. La décomposition en trois canaux est structurellement dérivée de la biophysique membranaire ; seuls les poids relatifs sont incertains.",
    s2Title: "Règle de sélection χ(Ā)",
    s2Intro: "Lorsque la métrique est linéarisée autour d'un fond Ā, la réponse biologiquement pertinente à une perturbation",
    s2IntroEnd: "est :",
    s2After: "En fond nul (Ā = 0) il n'y a pas de réponse linéaire. À la membrane cellulaire (Ā ≈ 7 × 10⁶ V/m) la réponse est maximale.",
    s2d1: "Linéariser g_μν autour du fond ġ = η + Ā⊗Ā :",
    s2d2: "où :",
    s2d3: "Premier ordre (réponse linéaire) :",
    s2d4: "La quantité biologiquement pertinente est l'amplitude relative de la perturbation métrique :",
    s2d5: "Cela donne la règle de sélection :",
    s2d6: "Propriétés :",
    s2d7: "Membrane cellulaire :",
    s2d8: "Les cellules sont MAXIMALEMENT sensibles aux perturbations EMF externes.",
    s3Title: "Modèle deux canaux",
    s3Intro: "L'exposition totale est la somme de deux canaux où le canal personnel est modulé par la règle de sélection :",
    s3d1: "Ambiant = stations de base + Wi-Fi + IoT (niveau d'infrastructure)",
    s3d2: "Personnel = téléphone + écouteurs + montres (appareils personnels)",
    s3d3: "L'ambiant est le fond Ā qui détermine χ.",
    s3d4: "Le personnel est la perturbation a dont la réponse biologique dépend de χ(Ā).",
    s3d5: "Quand Ā = 0 (Amish) : total = 0 + χ(0) × personnel = 0 + 0 = 0",
    s3d6: "→ Les appareils personnels ne produisent pas de réponse biologique.",
    s3d7: "Quand Ā → ∞ (ville saturée) : total ≈ ambiant + 1 × personnel",
    s3d8: "→ Le personnel s'ajoute à pleine magnitude.",
    s3d9: "L'exposition cumulative est la somme historique :",
    s3d10: "où start est l'année de début de l'historique EMF du pays (ex. Finlande 1991).",
    s3rwTitle: "Pourquoi l'exposition cumulative fonctionne : la fenêtre de récupération",
    s3rwIntro: "L'exposition cumulative est la bonne métrique car la capacité de réparation de l'ADN est finie. La voie BER a une demi-vie τ_repair ≈ 6 heures. Les dommages nets quotidiens dépendent du ratio temps d'exposition/temps de récupération :",
    s3rwTable: "Scénarios d'exposition historiques :",
    s3rwRow1: "1950 (radio + TV) : 4h EMF, 20h libre → 90 % réparation → net 0,40/jour",
    s3rwRow2: "1990 (téléphone, sans Wi-Fi) : 8h EMF, 16h libre → 84 % réparation → net 1,26/jour",
    s3rwRow3: "2010 (smartphone + Wi-Fi) : 16h EMF, 8h libre → 60 % réparation → net 6,35/jour",
    s3rwRow4: "2020 (Wi-Fi 24/7 + IoT) : 22h EMF, 2h libre → 21 % réparation → net 17,46/jour",
    s3rwRow5: "Amish (sans électronique) : 1h EMF, 23h libre → 93 % réparation → net 0,07/jour",
    s3rwThreshold: "Seuil critique : quand la période sans EMF < 2× la demi-vie de réparation (< 12h pour BER), la réparation est incomplète et la cumulation commence. Les humains modernes ont franchi ce seuil vers 2005–2010.",
    s3tcTitle: "Extension trois canaux",
    s3tcIntro: "Dans la décomposition en trois canaux, cumEMF devient une somme pondérée des expositions cumulatives spécifiques à chaque fréquence :",
    s3tcAfter: "Les poids des canaux sont spécifiques à la fréquence et dépendants du tissu (voir §2b). Le cumEMF à canal unique ci-dessus est l'agrégat pondéré des trois canaux. Les poids (0,05/0,60/0,35) sont des estimations diagnostiques nécessitant une calibration empirique.",
    s3ifoTitle: "Fonction de réponse IF : IFO vs DEP vs Cyb5b",
    s3ifoIntro: "La réponse du canal IF est la somme de trois mécanismes opérant à différents régimes d'intensité et bandes de fréquence :",
    s3ifoIfo: "R_IFO — Oscillation forcée des ions : linéaire en E_ext, seuil 10⁻⁵ V/m, domine aux niveaux environnementaux (0,01–3 V/m). Les champs IF polarisés et cohérents forcent le gating irrégulier des canaux ioniques voltage-dépendants ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s3ifoDep: "R_DEP — Diélectrophorèse : quadratique en E_ext, domine aux niveaux thérapeutiques TTFields (100–300 V/m). Nécessite des gradients de champ élevés pour la force de translation sur les structures intracellulaires.",
    s3ifoCyb5b: "R_Cyb5b — Transduction de la membrane externe mitochondriale : Cyb5b identifié via criblage CRISPR génomique comme capteur EMF ([[ref:kim2026_cell_gene_switch|Kim et al. 2026, Cell]]). 60 Hz EMF pulsé → changement conformationnel Cyb5b → oscillations Ca²⁺ → activation du promoteur génique. Opère aux fréquences ELF (50/60 Hz) — une voie indépendante de l'IFO et du RPM.",
    s3ifoAfter: "Aux intensités environnementales R_IFO ≫ R_DEP → réponse linéaire. Aux intensités thérapeutiques R_DEP ≫ R_IFO → réponse quadratique. Le fossé d'intensité entre les dispositifs thérapeutiques et l'exposition environnementale n'existe pas — c'est un artefact de l'hypothèse que le DEP est le seul mécanisme.",
    s4Title: "Capacité biologique",
    s4Intro: "La capacité biologique décline exponentiellement en fonction de l'exposition cumulative, avec un seuil en dessous duquel les mécanismes de réparation compensent :",
    s4Params: "(TFR de référence pré-EMF),",
    s4Params2: "(paramètre de déclin),",
    s4Params3: "(seuil).",
    s4d1: "Le déclin exponentiel découle de l'hypothèse que l'exposition EMF de chaque année produit un dommage biologique proportionnellement égal :",
    s4d2: "En intégrant :",
    s4d3: "Le seuil θ = 5 reflète la résistance biologique : les petites expositions ne dépassent pas la capacité des mécanismes de réparation.",
    s4d4: "a = 6,5 est calibré : c'est le « TFR naturel » approximatif sans exposition EMF (cf. Amish ≈ 6,5, Hutterites ≈ 9,0).",
    s4d5Link: "→ Preuves de laboratoire contrôlées pour les paramètres bioCap",
    s5Title: "Facteur comportemental",
    s5Intro: "Le vecteur endocrinien (testostérone, ocytocine, dopamine, cortisol, vasopressine) comme moyenne géométrique :",
    s5d1: "Chaque hormone décline exponentiellement :",
    s5d2: "Moyenne géométrique : (OT × T × DA × cort × AVP)^(1/5)",
    s5d3: "Géométrique > arithmétique car les hormones sont MULTIPLICATIVES : si une seule est zéro, l'effet total est zéro.",
    s5d4: "r₂ = 0,013 est calibré à partir du [[ref:travison2007_v2|déclin de −1 %/an de testostérone de Travison]] :",
    s5d5: "Si dEMF/dt ≈ 1/an → dT/T ≈ −1,3 %/an ≈ [[ref:travison2007_v2|Travison]].",
    s5otTitle: "Base biologique du paramètre OT",
    s5otIntro: "Le paramètre OT r₁ = 0,010 n'est pas ajusté à partir de données. Il découle de deux mécanismes biologiques indépendants qui suppriment l'ocytocine dans les conditions EMF :",
    s5otRoute1Title: "Voie 1 (HPA → vagal) :",
    s5otRoute1: "EMF → cortisol↑ ([[ref:pawlak2025|Pawlak 2025, d=1,88]]) → suppression vagale ([[ref:porges2001|Porges 2001]]) → ocytocine↓ → engagement social↓ ([[ref:carter2021|Carter 2021]], [[ref:feldman2012|Feldman 2012]])",
    s5otRoute2Title: "Voie 2 (microbiome → endocrinien) :",
    s5otRoute2: "EMF → perturbation du microbiome intestinal ([[ref:jin2022|Jin 2022]]) → Lactobacillus↓ → ocytocine↓ ([[ref:erdman2016|Erdman & Poutahidis 2016]]) → testostérone↓ → spermatogenèse↓",
    s5otCombined: "La combinaison multiplicative OT_eff = OT_vagal × OT_microbiome est approximativement exponentielle : OT_eff ≈ exp(−r_eff × cumEMF), où r_eff = r_vagal + r_microbiome ≈ 0,005 + 0,005 = 0,010. C'est le paramètre du modèle.",
    s5qsTitle: "Dérivation de la quadruple suppression",
    s5qsIntro: "Le facteur comportemental est la moyenne géométrique de quatre probabilités d'accouplement multiplicatives, chacune médiée hormonalement :",
    s5qsd1: "Quatre probabilités :",
    s5qsd2: "P(approche) — initiation de cour masculine, pilotée par T et DA, supprimée par le cortisol ([[ref:puts2008|Puts 2008]] ; [[ref:mehta2015|Mehta 2015]]).",
    s5qsd3: "P(attraction) — réponse d'attraction féminine, dépend du phénotype masculin piloté par T et de la motivation OT féminine ([[ref:thornhill1994|Thornhill 1994]]).",
    s5qsd4: "P(sexe) — fréquence sexuelle intra-couple, dépend du lien OT, de la libido T, et de l'état de stress cortisol/mélatonine ([[ref:carter2021|Carter 2021]]).",
    s5qsd5: "P(fécondation) — probabilité biologique de fécondation par acte, dépend de la qualité du sperme et de la cascade CatSper.",
    s5qsd6: "Le behav du modèle ≈ (P₁ × P₂ × P₃ × P₄)^(1/4) est l'approximation de la moyenne géométrique. Chaque P_i partage les mêmes dépendances hormonales exponentielles.",
    s5qsd7: "Correction double hormone ([[ref:mehta2015|Mehta & Prasad 2015]], [[ref:dual_hormone_meta2021|méta N=8538, r=-,061]]) : l'expression comportementale de T nécessite un cortisol bas. L'EMF abaisse simultanément T ([[ref:who_t_meta|OMS méta : SMD 0,87]]) ET élève le cortisol ([[ref:pawlak2025|Pawlak 2025 : d=1,88]]), créant un double verrou sur le comportement d'approche.",
    s5qsd8: "Limitation : la taille d'effet de la [[ref:dual_hormone_meta2021|méta-analyse double hormone]] est petite (r=-,061). La chaîne proxy (EMF → T↓ → approche↓ → TFR↓) n'a pas été testée dans son ensemble.",

    // S5 Cinq portes de fécondation
    s5fertTitle: "Probabilité de fécondation : cinq portes en série",
    s5fertLead:
      "Chaque porte est Ca²⁺-dépendante et individuellement vulnérable à la perturbation EMF :",
    s5fertG1: "Capacitation (oscillation Ca²⁺ dépendante de CatSper)",
    s5fertG2: "Rhéotaxie (roulement contre le flux dépendant de CatSper)",
    s5fertG3: "Chimiotaxie (progestérone + gradient de température via CatSper)",
    s5fertG4: "Réaction acrosomique (double Ca²⁺ : CatSper + réserves IP₃)",
    s5fertG5: "Activation de l'ovocyte (facteur d'oscillation Ca²⁺ apporté par le spermatozoïde)",
    s5fertConclusion:
      "Une réduction de 10 % à chaque porte se compose : 0,9⁵ = 0,59 → réduction de 41 % de la probabilité de fécondation à partir de perturbations individuellement mineures.",

    s5bTitle: "Résonance taille cellulaire × fréquence",
    s5bIntro: "Les [[ref:ttfields_cell_size_frequency|données cliniques TTFields]] révèlent une relation quantitative entre la taille cellulaire et la fréquence de perturbation optimale. Cette relation est calibrée à partir des données de phase III de la FDA et extrapolée aux tissus cibles du BERM.",
    s5bFormula: "où K ≈ 3,7 Hz·m, calibré à partir des [[ref:ttfields_cell_size_frequency|données cliniques TTFields sur quatre types de cancer]].",
    s5bd1: "[[ref:ttfields_cell_size_frequency|Fréquences cliniques TTFields (données PMA FDA)]] :",
    s5bd2: "GBM (18 µm) : 200 kHz. Pancréas (15 µm) : 150 kHz. Sein (20 µm) : 120 kHz. Mélanome (~25 µm) : 100 kHz.",
    s5bd3: "Extrapolation aux cellules cibles BERM :",
    s5bd4: "Spermatogonie (12 µm) : f_opt ≈ 310 kHz — plage de commutation des pilotes LED. Épithélium intestinal (10 µm) : f_opt ≈ 370 kHz. Ovocyte (120 µm) : f_opt ≈ 31 kHz — plage VFD HVAC.",
    s5bd5: "Les pilotes LED commutent typiquement à 20–500 kHz avec un contenu harmonique s'étendant au-delà de 1 MHz. Le chevauchement avec la résonance spermatogoniale (310 kHz) n'est pas conçu — c'est une coïncidence de l'optimisation technique et de la biologie cellulaire.",
    s6Title: "Facteur culturel et compensation",
    s6Intro: "Le TFR prédit combine les trois couches :",
    s6Alpha: "est l'exposant de compensation dérivé biologiquement.",
    s6d1: "Le taux culturel est le RÉSIDUEL : il contient tout ce que bioCap et behav n'expliquent pas. Calibré à partir de 2024 :",
    s6d2: "Terme de compensation : la société compense partiellement le déclin biologique (ART, politique nataliste, changements comportementaux) :",
    s6d3: "α = 0,43 dérive de la structure de récupération biologique :",
    s6TableLayer: "Couche",
    s6TableWeight: "Poids",
    s6TableVGIC: "VGIC (immédiat, réversible)",
    s6TableROS: "ROS (jours–semaines)",
    s6TableDNA: "ADN (partiellement irréversible)",
    s6TableLeydig: "Leydig (mois–années)",
    s6TableNeuron: "Neurone (permanent)",
    s6TableFooter: "α_eff = Σ(poids × α)",
    s6d4: "Impact effectif :",
    s6d5: "α = 0,43 → exposant = 0,57",
    s6d6: "α = 1,0 → exposant = 0 (compensation totale, pas d'effet EMF)",
    s6d7: "α = 0,0 → exposant = 1,0 (pas de compensation, effet direct)",
    s7Title: "Jacobien",
    s7Intro: "La dérivée totale du modèle par rapport à l'EMF est le produit de six dérivées partielles. Si un seul facteur est zéro, toute la chaîne se brise :",
    s7d1: "Chaque facteur :",
    s7d1a: "Effet du champ EM sur la paire radicale → canal CRY, chimie de spin, χ_B",
    s7d1b: "Effet de la paire radicale → concentration ROS → réponse mitochondriale",
    s7d1c: "Concentration ROS → état cellulaire → SDF, peroxydation lipidique, dommage protéique",
    s7d1d: "État cellulaire → état bioélectrique → changement V_mem, dynamique des canaux ioniques",
    s7d1e: "État bioélectrique → reproduction → spermatogenèse, ovulation, fécondation",
    s7d1f: "Capacité reproductive → TFR → fécondabilité → TTP → ASFR → TFR",
    s8Title: "Prédictions verrouillées",
    s8Intro: "Le modèle produit des prédictions spécifiques et verrouillées qui se réaliseront ou non. Le verrouillage est irrévocable : une prédiction ne peut pas être modifiée rétroactivement sans mise à jour du numéro de version.",
    s8Country: "Pays",
    s8Year: "Année",
    s8Metric: "Métrique",
    s8Central: "Central",
    s8CI: "IC 95 %",
    s8Locked: "Verrouillé",
    s8Footer: "Prédictions gelées au SHA git v17.0. Si les observations futures tombent en dehors de l'IC, le modèle est falsifié — la prédiction n'est pas ajustée.",
    s9Title: "Conditions de falsification",
    s9Intro: "Le modèle est explicitement falsifiable. Chaque condition est spécifique et testable :",
    s9Items: [
      { condition: "La métrique de Lindgren est mathématiquement incorrecte", detail: "Si la dérivation g_μν = η_μν + A_μA_ν s'avère internement incohérente ou en contradiction avec l'électrodynamique établie, le fondement géométrique échoue." },
      { condition: "Les bloqueurs VGCC ne préviennent pas les effets biologiques de l'EMF", detail: "Si les bloqueurs de canaux calciques ne parviennent pas à atténuer les ROS, SDF ou changements hormonaux induits par l'EMF dans des expériences contrôlées, le mécanisme primaire est erroné." },
      { condition: "Le TFR de la communauté Amish décline au même rythme que la population générale", detail: "Les Amish fonctionnent comme un groupe de contrôle quasi-expérimental. Le TFR actuel des Amish ≈ 6,5 est stable tandis que les populations environnantes déclinent." },
      { condition: "Le déclin de la concentration de spermatozoïdes s'arrête sans réduction de l'exposition EMF", detail: "Si le déclin de −1,2 %/an des spermatozoïdes s'inverse ou se stabilise alors que l'EMF cumulative continue d'augmenter, la relation dose-réponse est erronée." },
      { condition: "Une prédiction verrouillée échoue en dehors de son intervalle de confiance", detail: "Toute prédiction du §8 qui tombe en dehors de son IC à 95 % lorsque l'année d'observation arrive falsifie le modèle à la portée de cette prédiction." },
    ],
    s10Title: "Matrice de validation pharmacologique",
    s10Intro: "Trois interventions pharmacologiques indépendantes fournissent des ancres de calibration quantitatives pour des voies distinctes. Chaque médicament isole un mécanisme spécifique, permettant de tester la structure des voies du modèle indépendamment.",
    s10Drug: "Médicament",
    s10Target: "Cible",
    s10Pathway: "Voie",
    s10Observed: "Effet observé",
    s10Calibration: "Calibration BERM",
    s10Rows: [
      { drug: "CCB (nifédipine)", target: "VGCC de type L", pathway: "A (VGCC→ROS→SDF)", observed: "90 % bloc VGCC → −23 % conc. sperme", calibration: "Perturbation EMF ≈ 6 %" },
      { drug: "Rapamycine", target: "mTOR (85 % inhibition)", pathway: "Sempou (mTOR→vieillissement)", observed: "Durée de vie +10–25 % (souris)", calibration: "mTOR_eff × 0,15" },
      { drug: "Mélatonine", target: "CRY/circadien", pathway: "C (CRY→horloge→ovulation)", observed: "Restaure l'amplitude circadienne", calibration: "Correction fraction EMF nocturne" },
    ],
    s10d1: "Calibration CCB (voie A) :",
    s10d2: "Cette perturbation VGCC effective de 6 % est cohérente avec le déclin observé de −1,2 %/an des spermatozoïdes sur 5 ans d'exposition cumulative.",
    s10d3: "Calibration rapamycine (voie Sempou) :",
    s10d4: "L'extension de durée de vie observée de 10–25 % chez la souris est cohérente avec une réduction partielle de mTOR dans un régime de dosage réaliste.",
    s10d5: "Calibration mélatonine (voie C) :",
    s10d6: "L'exposition EMF nocturne perturbe la signalisation circadienne médiée par CRY. La mélatonine exogène (3–5 mg) restaure l'amplitude circadienne indépendamment de CRY, fournissant un contournement de la voie C.",
    s10d7Link: "→ Preuves expérimentales contrôlées (mammifères de laboratoire)",
    s11Title: "Susceptibilité individuelle et distribution χ",
    s11Intro: "La règle de sélection χ(Ā) au niveau populationnel prédit une réponse moyenne. Les individus varient autour de cette moyenne en raison de trois facteurs mesurables : génotype VGCC, géométrie anatomique et charge allostatique cumulative. Le modificateur de susceptibilité individuelle est :",
    s11After: "Cela signifie que deux individus dans le même champ ambiant peuvent expérimenter des doses biologiques effectives différant d'un ordre de grandeur. Le TFR de la population est une convolution sur la distribution individuelle de χ — la moyenne cache les queues.",
    s11d1: "Le modificateur de génotype VGCC découle du phénotypage fonctionnel de CACNA1C rs1006737 :",
    s11d2: "Les porteurs de risque homozygotes AA montrent un influx de Ca²⁺ 40 % plus élevé par unité de perturbation de champ.",
    s11d3: "Le modificateur anatomique tient compte de la géométrie tissulaire affectant la distribution interne du champ :",
    s11d4: "Les enfants de moins de 6 ans reçoivent 2–3× le SAR adulte dans le même champ externe ([[ref:gandhi1996|Gandhi 1996]]). L'IMC module l'atténuation de la couche graisseuse.",
    s11d5: "Le modificateur cumulatif utilise les phases du [[ref:selye1936|Syndrome d'Adaptation Générale de Selye]] :",
    s11d6: "Dans la phase de résistance, la capacité de compensation décline linéairement. En épuisement (charge allostatique > 15), la compensation s'effondre et le modificateur effectif s'amplifie brusquement — c'est le régime prédit de début d'EHS.",
    s11d7: "Le modificateur individuel combiné se multiplie dans le χ de la population :",
    s11d8: "Pour la prédiction du TFR au niveau populationnel, BERM intègre sur la distribution de fréquence des génotypes (Hardy-Weinberg) × démographie anatomique × distribution de durée d'exposition. Le modificateur individuel moyen est 1,0 par construction. La valeur DIAGNOSTIQUE est dans les queues.",
    s11d9Link: "→ Preuves de susceptibilité individuelle",
    s12Title: "Validation transversale v19.1",
    s12Intro: "La découverte de formule sur 54 pays (données 2022) fournit une validation indépendante du modèle temporel. La formule transversale utilise deux variables proxy EMF et un seuil binaire pour prédire le TFR national avec un RMSE LOOCV de 0,522.",
    s12Formula: "L'indice EMF à deux canaux combine la consommation résidentielle d'électricité (proxy ELF) et les abonnements haut débit fixe (proxy RF) :",
    s12Access: "L'accès à l'électricité agit comme une frontière binaire d'exposition biologique. Le seuil d'activation IFO-VGIC (10⁻⁵ V/m) est dépassé à la distance d'exploitation de chaque appareil électrique ménager. Les populations sans électricité ne sont pas exposées.",
    s12Stats: "Statistiques de validation :",
    s12Stat1: "RMSE LOOCV = 0,522 (modèle complet, validation croisée en laissant un pays de côté)",
    s12Stat2: "R² = 0,851 (n = 54 ; capture le seuil d'électrification, pas l'effet spécifique aux CEM)",
    s12Stat3: "Score de compétence = 0,61 (1 − RMSE/sd, amélioration par rapport au prédicteur moyen)",
    s12Stat4: "La consommation résidentielle d'électricité est le MEILLEUR prédicteur unique (RMSE univarié 0,533)",
    s12Stat5: "Les abonnements mobiles sont les PLUS FAIBLES (RMSE 1,053)",
    s12Mobile: "Le paradoxe du téléphone mobile : si le mécanisme était « accès à l'information → choix de planification familiale », l'appareil d'information (téléphone mobile) devrait être le prédicteur le plus fort. C'est le plus faible. La variable d'infrastructure (consommation résidentielle d'électricité) prédit le mieux — cohérent avec un mécanisme d'exposition physique, pas un mécanisme d'information.",
    s12Electrified: "Pour les pays partiellement électrifiés, le TFR de la sous-population électrifiée peut être estimé à partir du modèle de mélange binaire :",
    s12Collinearity: "Colinéarité PIB : les proxies EMF et le PIB par habitant sont corrélés (r = 0,87). Dans les modèles linéaires, ni l'un ni l'autre n'est significatif quand l'autre est contrôlé. C'est un problème d'identification symétrique — il ne favorise pas le PIB par rapport à l'EMF. Trois différences structurelles brisent la symétrie : (1) seuil binaire d'électrification, (2) paradoxe du téléphone mobile, (3) les espèces sentinelles répondent à l'EMF mais pas au PIB.",
    s12Limitation: "Évaluation honnête : R² = 0,851 reflète principalement le gradient de transition démographique (Niger → Corée), pas la variance spécifique aux CEM. Parmi les pays OCDE à revenu élevé (n ≈ 36), la consommation d'électricité seule n'explique quasiment aucune variance du TFR (R² ≈ 0,0002). La formule transversale capture le seuil d'électrification — la porte binaire de la fécondité pré-industrielle à industrielle — pas une dose-réponse au sein des populations électrifiées. Cela fait de l'analyse transversale la ligne de preuve indépendante la PLUS FAIBLE du BERM. Les preuves plus solides viennent de : (1) les voies mécanistiques avec effets non thermiques validés réglementairement, (2) la dose-réponse pharmacologique (mélatonine, testostérone), (3) les marqueurs de sélection génétique (CatSper, VGCC), (4) les espèces sentinelles en conditions contrôlées. La valeur de l'analyse transversale est structurelle : le paradoxe du téléphone mobile et la prédiction électricité > PIB sont discriminants, même si l'ajustement agrégé est confondu.",
    s12DataNote: "Données de réplication : liste des 54 pays (TFR observé, consommation d'électricité, abonnements haut débit, prédictions du modèle) disponible à /data/cross_section_manifest.csv. Sources : UN WPP 2024 (TFR), OWID/AIE (électricité), UIT (haut débit).",
    s12Caveat: "L'analyse transversale ne peut pas déterminer la direction causale. Les preuves discriminantes proviennent des espèces sentinelles, des expériences naturelles et des populations sans électricité.",
    s13Title: "χ imbriqué (modèle de population)",
    s13Intro: "La règle de sélection χ se généralise aux populations lorsque les variables de fond biologiques (optique, moléculaire) diffèrent entre les groupes. La suppression reproductive combinée des voies A et C, modulée par les profils χ spécifiques à la population :",
    s13PathwayA: "Voie A (VGIC)",
    s13PathwayC: "Voie C (CRY/RPM)",
    s13Combined: "Suppression combinée",
    s13TFR: "TFR de la population",
    s13Where: "où γ_A, γ_C sont les poids des voies (0,75 ; 0,25) ; χ(Ā_env) est le couplage environnemental ; χ(V_mem) est le fond membranaire (≈ 1,0 pour les cellules vivantes) ; χ(I_blue) est le couplage optique (dépendant de l'iris) ; χ([FAD]) est le couplage moléculaire (dépendant de B2) ; et EMF_personal est la contribution des appareils personnels.",
    s13Implication: "Cette formulation prédit que les populations avec des valeurs χ biologiques plus élevées (yeux bleus, tolérants au lactose) connaissent un déclin TFR plus prononcé par unité d'augmentation EMF environnementale.",
    s13Level: "Niveau épistémique : L* (synthèse testable). Les instanciations χ individuelles sont de niveau E ou M|C ; l'intégration au niveau populationnel est la composante L*.",
    s14Title: "Formule stratifiée v20 → v21",
    s14Intro: "La formule transversale originale (v19.1) utilise un indice EMF à deux canaux. La formule stratifiée l'étend en incorporant l'historique d'amorçage, la capacité de récupération, la modulation saisonnière et le génotype de la population.",
    s14V20Title: "Formule v20 (Amorçage × Récupération)",
    s14V20: "TFR ≈ A × exp(−B × EMF_eff) + C",
    s14V20Detail: "EMF_eff = EMF_comp × P × (1/R)",
    s14V20Composite: "EMF_comp = w_ELF × ELF + w_IF × IF + w_RF × RF",
    s14V20Priming: "P = 1 + α × min(electrification_years, P_max)",
    s14V20Recovery: "R = 1 + β × EMF_free_hours/day",
    s14V20Desc: "EMF_comp est le composite pondéré à trois canaux (ELF < 300 Hz, IF 300 Hz–10 MHz, RF > 10 MHz). P capture l'amorçage cumulatif de décennies d'exposition au réseau électrique — les années d'électrification régulent à la hausse l'expression des VGCC, rendant les cellules plus sensibles à tout EMF ultérieur. R capture la fenêtre de récupération : les heures par jour sans EMF significatif permettent la déphosphorylation de CaMKII et la restauration de l'homéostasie Ca²⁺.",
    s14V21Title: "Formule v21 (proposée : + Saison × Génotype)",
    s14V21: "EMF_eff = EMF_comp × P × (1/R) × S × G_pop",
    s14V21Season: "S = 1 + γ × f(latitude, saison)",
    s14V21Genotype: "G_pop = 1 + δ × CACNA1C_A_allele_frequency",
    s14V21Optional: "Facteurs de correction optionnels (dépendants des données) : H = correction humidité/côtière, B = coefficient de réflexion RF du matériau de construction",
    s14V21Desc: "S capture la variation saisonnière de la sensibilité du magnétorécepteur CRY : l'hiver à haute latitude augmente la sensibilité de CRY aux perturbations EMF ([[ref:halgamuge2015|Halgamuge 2015]]). G_pop capture la susceptibilité génétique au niveau populationnel via la fréquence de l'allèle A du CACNA1C rs1006737 ([[ref:sousouri2025|Sousouri 2025]]).",
    s14ParamsTitle: "Interprétation des paramètres",
    s14Params: [
      { param: "P (Amorçage)", amish: "1,0 (pas d'amorçage)", finland: "2,2 (100+ ans d'électrification)", nigeria: "1,45 (~15 ans)", desc: "Degré de « préparation » des cellules à la réponse EMF" },
      { param: "1/R (Déficit de récupération)", amish: "0,48 (récupération complète)", finland: "1,0 (WiFi 24/7)", nigeria: "0,67 (partielle)", desc: "L'homéostasie Ca²⁺ se restaure-t-elle la nuit" },
      { param: "S (Saison)", amish: "~1,0", finland: "0,9–1,3", nigeria: "~1,0", desc: "Modulation de la sensibilité CRY par la lumière" },
      { param: "G_pop (Génotype)", amish: "~1,0", finland: "~1,1", nigeria: "~0,95", desc: "Prévalence de l'allèle A CACNA1C dans la population" },
    ],
    s14Evolution: "Évolution de la formule : v17 (cumEMF scalaire, RMSE ~1,15) → v19.1 (deux canaux, 54 pays, RMSE 0,522) → v20 (+ Amorçage × Récupération, RMSE prédit < 0,45) → v21 (+ Saison × Génotype, données de calibration nécessaires).",
    s14Level: "Niveau épistémique : v20 est M|C (dérivé du mécanisme, calibration en attente). v21 est L* (extension proposée, données de calibration pour S et G_pop non encore collectées).",
    s15Title: "La fonction de récupération : quantifier le temps de réparation de l'ADN",
    s15Text: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]] ont démontré que les cassures de brin d'ADN induites par l'EMF revenaient à la normale dans les 9 heures suivant l'arrêt de l'exposition. L'ajustement d'un modèle de décroissance exponentielle à ces données donne une constante de temps τ ≈ 3–4 heures. Cela correspond directement au facteur de récupération R dans la formule v20 : R = 1 + β × EMF_free_hours, où les [[ref:ivancsits_dna_recovery|données d'Ivancsits]] suggèrent β ≈ 0,11.",
    s15TableTime: "Temps après exposition",
    s15TableDamage: "Dommage restant",
    s15TableScenario: "Scénario",
    s15TableFreeTime: "Temps sans EMF",
    s15TableRemaining: "Dommage restant",
  },
  ko: {
    meta: { title: "수학 - Extinction Field", description: "Lindgren 기하학에서 TFR 예측까지 BERM 모델의 완전한 수학적 유도. 모든 단계는 검증 가능합니다." },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgren 기하학" },
      { id: "evo-calibration", num: "§1b", label: "진화적 교정" },
      { id: "chi", num: "§2", label: "선택 규칙 χ(Ā)" },
      { id: "three-channel-derivation", num: "§2b", label: "3채널 유도" },
      { id: "two-channel", num: "§3", label: "2채널 모델" },
      { id: "biocap", num: "§4", label: "생물학적 용량" },
      { id: "behavioral", num: "§5", label: "행동 인자" },
      { id: "cell-size-frequency", num: "§5b", label: "세포 크기 × 주파수" },
      { id: "cultural", num: "§6", label: "문화 / 보상" },
      { id: "jacobian", num: "§7", label: "야코비안" },
      { id: "locked", num: "§8", label: "잠긴 예측" },
      { id: "falsification", num: "§9", label: "반증 조건" },
      { id: "pharmacological", num: "§10", label: "약리학적 검증" },
      { id: "individual-susceptibility", num: "§11", label: "개인 감수성" },
      { id: "cross-sectional", num: "§12", label: "횡단적 검증" },
      { id: "nested-chi", num: "§13", label: "중첩된 χ (집단 모델)" },
      { id: "layered-formula", num: "§14", label: "계층 공식 v20→v21" },
      { id: "recovery-function", num: "§15", label: "회복 함수" },
    ],
    pageTitle: "수학적 기반",
    pageSubtitle: "Lindgren 기하학에서 TFR 예측까지 BERM 모델의 완전한 유도. 모든 방정식은 이전 방정식에서 유도 가능합니다. 중간 단계를 보려면 \"전체 유도\"를 클릭하세요.",
    s1Title: "Lindgren 기하학",
    s1Intro: "[[ref:lindgren2025|Lindgren, Kovacs & Liukkonen (2025)]]의 프레임워크에서 전자기 퍼텐셜은 시공간 기하학의 일부입니다. 메트릭 텐서가 EM 4-퍼텐셜을 흡수합니다:",
    s1After: "이것은 전자기장이 생물학적 이온 채널을 포함한 모든 물리적 과정이 발생하는 기하학을 변경한다는 것을 의미합니다. Maxwell 방정식은 이 기하학의 Bianchi 항등식으로 나타납니다.",
    s1d1: "표준 일반상대성이론에서 메트릭은 동적입니다:",
    s1d2: "Lindgren의 프레임워크에서 EM 퍼텐셜이 중력 섭동을 대체합니다:",
    s1d3: "여기서 κ는 결합 상수(적절한 단위에서 1로 정규화).",
    s1d4: "Maxwell 방정식은 Bianchi 항등식으로부터 도출됩니다:",
    s1d5: "[[ref:vassallo2025|Vassallo et al. (2025)]]이 이 유도를 독립적으로 검증했습니다.",
    s1d6: "겉보기 문제(순진한 계산으로 δV_mem ≈ 10⁻²¹ V)는 세 가지 독립적 메커니즘으로 해결됩니다:",
    s1d6a: "(1) IFO: 이온 강제 진동이 S4 전압 센서에 <1 nm 거리에서 직접 작용, 임계값 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s1d6b: "(2) 비이온성 VGCC 신호전달: 이온 플럭스 없는 구조 변화, 더 낮은 에너지 임계값 ([[ref:trus2024|Trus & Atlas 2024]]).",
    s1d6c: "(3) RPM 경로는 VGCC를 완전히 우회: RPM 해밀토니안 요소의 87.5%가 Lindgren 기하학에서 유도 가능.",
    s1bTitle: "진화적 교정",
    s1bIntro: "생물학적 센서는 양자 한계에서 전자기 신호를 감지하도록 진화했습니다. 인간의 눈은 단일 광자(~4×10⁻¹⁹ J — [[ref:vaziri2016|Vaziri et al. 2016]])를 감지합니다. 상어 전기수용기는 0.5 µV/m 장을 감지합니다. 철새의 나침반은 15 nT RF 노이즈로 교란됩니다. 이온 채널은 10⁻⁵ V/m 편파장에 반응합니다([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). [[ref:lindgren2025|Lindgren의 χ(Ā)]] ≈ 1.0(막에서)은 이 감도의 기하학적 이유입니다.",
    s1bAfter: "IF 또는 RF 주파수에 대한 진화된 필터는 존재하지 않습니다. 이 주파수들은 38억 년의 생물학적 진화 동안 존재하지 않았기 때문입니다. 이온 채널은 광대역 수신기입니다 — 진화는 감지 감도를 최적화했지 주파수 거부를 최적화하지 않았습니다.",
    s1bd1: "증폭 캐스케이드 — 광자 비유:",
    s1bd2: "눈: 1 광자 → 로돕신 → 트랜스듀신 → PDE → cGMP → 측정 가능한 전류. 이득: ~10⁶×.",
    s1bd3: "VGCC: 1 S4 구조 변화 → 비이온성 신호([[ref:trus2024|Trus & Atlas 2024]]) 또는 이온 플럭스 → Ca²⁺ → 칼모듈린 → 캐스케이드. 이득: ~10⁴–10⁶×.",
    s1bd4: "Hopf 점 근처 분기: G = 1/(2µ). 작은 ROS 변화 → 거시적 출력. 추가 이득: ~10²–10³×.",
    s1bd5: "총 이득: 10⁶–10⁹× — 눈의 광자 증폭 캐스케이드와 같은 크기 차수.",
    s2bTitle: "3채널 유도",
    s2bIntro: "두 개의 생물학적 차단 주파수가 EMF 스펙트럼을 서로 다른 생물물리학적 메커니즘을 가진 세 영역으로 나눕니다. 이 차단 주파수는 세포 생물학의 근본적 성질이며 임의의 매개변수가 아닙니다.",
    s2bFC: "f_c ≈ 1 kHz — 막의 RC 시간 상수. f_c 이하: 장이 막 전체에 걸려 V_mem을 섭동합니다. f_c 이상: 장이 세포 내부로 침투합니다.",
    s2bFRPM: "f_RPM ≈ 1 MHz — 라디칼 쌍 코히어런스 한계. f_RPM 이상: 고전적 장-막 상호작용은 약해지지만 양자 스핀 효과가 관련됩니다.",
    s2bELF: "ELF 채널 (f < ~1 kHz): 장이 막 전체에 걸림. ΔV_mem = E_ext · d_cell · H(f). χ_mem은 7×10⁶ V/m에서 포화. 선형 반응. 메커니즘: VGCC→Ca²⁺→ROS (경로 A), GPCR-아데노신 ([[ref:pemf_bone_fda_review_2020|PEMF, FDA 1979]]), Nav 변조 ([[ref:tms_fda_depression_2008|TMS, FDA 2008]]), 미주신경 ([[ref:vns_gammacore_fda|VNS, FDA 2017]]).",
    s2bIF: "IF 채널 (f_c < f < f_RPM): 장이 세포 내부로 침투. T(f) = 1/√(1+(f_c/f)²). 환경 수준에서의 주요 메커니즘: IFO-VGIC (선형, 임계값 10⁻⁵ V/m). 분열구에서의 기하학적 장 증폭: G ≈ (d_cell/d_furrow)² ≈ 25×. 분열 세포에 대한 선택적 효과. [[ref:ttfields_novocure_fda|TTFields (FDA 2011+)]]가 DEP를 통한 치료 강도에서 메커니즘을 검증.",
    s2bIFSources: "환경 IF 원 특성: 전형적인 LED 드라이버는 스위칭 주파수 f_sw 20–200 kHz에서 동작하며 2f_sw, 3f_sw, 5f_sw의 고조파가 MHz 범위까지 확장됩니다. 파형은 정현파가 아닌 구형 펄스열입니다. Panagopoulos 2025는 펄스 장이 동일한 평균 강도의 연속파 장보다 생물학적으로 더 활성적임을 입증했습니다.",
    s2bRF: "RF 채널 (f > ~1 MHz): 막이 투명. 고전적 장-막 상호작용이 약함. 양자 스핀 효과가 관련. [[ref:lindgren2025|Lindgren의 공변 스핀 보정]]: B_local = (1/w)b + (A·b)A/(w(1+w)). 이방성 반응. 메커니즘: CRY/RPM→일주기 교란 (경로 B), 자기 나침반 파괴 ([[ref:lindecke2026|Lindecke 2026]]).",
    s2bRegGapTitle: "IF 규제 공백",
    s2bRegGap: "ICNIRP 2010은 f < 300 Hz (ELF)의 노출 한계를 설정합니다. [[ref:icnirp2020|ICNIRP 2020]]은 f > 100 kHz (RF)의 한계를 설정합니다. 300 Hz < f < 100 kHz 범위에는 중복되고 불일치하는 한계가 있습니다. LED 드라이버 방출(20–300 kHz)은 이 공백에 해당합니다.",
    s2bAfter: "채널 가중치(w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35)는 진단적이며 경험적 교정이 필요합니다. 3채널 분해는 막 생물물리학에서 구조적으로 유도됩니다. 상대적 가중치만이 불확실합니다.",
    s2Title: "선택 규칙 χ(Ā)",
    s2Intro: "메트릭이 배경 Ā 주위에서 선형화될 때, 섭동에 대한 생물학적으로 관련된 반응",
    s2IntroEnd: "은:",
    s2After: "제로 배경(Ā = 0)에서는 선형 반응이 없습니다. 세포막(Ā ≈ 7 × 10⁶ V/m)에서 반응은 최대입니다.",
    s2d1: "g_μν를 배경 ġ = η + Ā⊗Ā 주위에서 선형화:",
    s2d2: "여기서:",
    s2d3: "1차(선형 반응):",
    s2d4: "생물학적으로 관련된 양은 메트릭 섭동의 상대적 크기입니다:",
    s2d5: "이것은 선택 규칙을 제공합니다:",
    s2d6: "성질:",
    s2d7: "세포막:",
    s2d8: "세포는 외부 EMF 섭동에 최대한 민감합니다.",
    s3Title: "2채널 모델",
    s3Intro: "총 노출은 두 채널의 합이며, 개인 채널은 선택 규칙에 의해 변조됩니다:",
    s3d1: "환경 = 기지국 + Wi-Fi + IoT (인프라 수준)",
    s3d2: "개인 = 전화 + 이어버드 + 시계 (개인 장치)",
    s3d3: "환경은 χ를 결정하는 배경 Ā입니다.",
    s3d4: "개인은 생물학적 반응이 χ(Ā)에 의존하는 섭동 a입니다.",
    s3d5: "Ā = 0 (아미시): total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ 개인 장치는 생물학적 반응을 생성하지 않습니다.",
    s3d7: "Ā → ∞ (포화 도시): total ≈ ambient + 1 × personal",
    s3d8: "→ 개인이 전체 강도로 추가됩니다.",
    s3d9: "누적 노출은 역사적 합계입니다:",
    s3d10: "여기서 start는 국가의 EMF 역사 시작 연도(예: 핀란드 1991).",
    s3rwTitle: "왜 누적 노출이 작동하는가: 회복 창",
    s3rwIntro: "DNA 수리 용량이 유한하기 때문에 누적 노출이 올바른 메트릭입니다. BER 경로의 반감기는 τ_repair ≈ 6시간입니다. 일일 순 손상은 노출 시간과 회복 시간의 비율에 의존합니다:",
    s3rwTable: "역사적 노출 시나리오:",
    s3rwRow1: "1950 (라디오 + TV): 4h EMF, 20h 자유 → 90% 수리 → 순 0.40/일",
    s3rwRow2: "1990 (전화, Wi-Fi 없음): 8h EMF, 16h 자유 → 84% 수리 → 순 1.26/일",
    s3rwRow3: "2010 (스마트폰 + Wi-Fi): 16h EMF, 8h 자유 → 60% 수리 → 순 6.35/일",
    s3rwRow4: "2020 (24/7 Wi-Fi + IoT): 22h EMF, 2h 자유 → 21% 수리 → 순 17.46/일",
    s3rwRow5: "아미시 (전자기기 없음): 1h EMF, 23h 자유 → 93% 수리 → 순 0.07/일",
    s3rwThreshold: "임계 역치: EMF 무노출 기간 < 2× 수리 반감기(BER의 경우 < 12h)이면 수리가 불완전하고 누적이 시작됩니다. 현대인은 2005~2010년경에 이 역치를 넘었습니다.",
    s3tcTitle: "3채널 확장",
    s3tcIntro: "3채널 분해에서 cumEMF는 주파수별 누적 노출의 가중 합이 됩니다:",
    s3tcAfter: "채널 가중치는 주파수별이고 조직 의존적입니다(§2b 참조). 위의 단일 채널 cumEMF는 3채널의 가중 집계입니다. 채널 가중치(0.05/0.60/0.35)는 경험적 교정이 필요한 진단적 추정치입니다.",
    s3ifoTitle: "IF 반응 함수: IFO vs DEP vs Cyb5b",
    s3ifoIntro: "IF 채널 반응은 서로 다른 강도 영역과 주파수 대역에서 작동하는 세 메커니즘의 합입니다:",
    s3ifoIfo: "R_IFO — 이온 강제 진동: E_ext에 선형, 임계값 10⁻⁵ V/m, 환경 수준(0.01–3 V/m)에서 지배적. 편파된 코히어런트 IF 장이 전압 의존성 이온 채널의 불규칙한 게이팅을 강제([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]).",
    s3ifoDep: "R_DEP — 유전영동: E_ext에 2차, TTFields 치료 수준(100–300 V/m)에서 지배적. 세포 내 구조에 대한 병진력에 높은 장 구배가 필요.",
    s3ifoCyb5b: "R_Cyb5b — 미토콘드리아 외막 전달: Cyb5b는 게놈 전체 CRISPR 스크리닝으로 EMF 센서로 확인([[ref:kim2026_cell_gene_switch|Kim et al. 2026, Cell]]). 60 Hz 펄스 EMF → Cyb5b 구조 변화 → Ca²⁺ 진동 → 유전자 프로모터 활성화. ELF 주파수(50/60 Hz)에서 작동 — IFO와 RPM 모두로부터 독립적인 경로.",
    s3ifoAfter: "환경 강도에서 R_IFO ≫ R_DEP → 선형 반응. 치료 강도에서 R_DEP ≫ R_IFO → 2차 반응. 치료 장치와 환경 노출 사이의 강도 격차는 존재하지 않습니다 — DEP가 유일한 메커니즘이라는 가정의 산물입니다.",
    s4Title: "생물학적 용량",
    s4Intro: "생물학적 용량은 누적 노출의 함수로 지수적으로 감소하며, 임계값 이하에서는 수리 메커니즘이 보상합니다:",
    s4Params: "(EMF 이전 기준선 TFR),",
    s4Params2: "(감소 매개변수),",
    s4Params3: "(임계값).",
    s4d1: "지수적 감소는 각 연도의 EMF 노출이 비례적으로 동일한 생물학적 손상을 생산한다는 가정으로부터 도출됩니다:",
    s4d2: "적분하면:",
    s4d3: "임계값 θ = 5는 생물학적 저항성을 반영: 작은 노출은 수리 메커니즘 용량을 초과하지 않습니다.",
    s4d4: "a = 6.5는 교정됨: EMF 노출 없는 근사적 \"자연 TFR\"(참조: 아미시 ≈ 6.5, 후터라이트 ≈ 9.0).",
    s4d5Link: "→ bioCap 매개변수에 대한 통제된 실험실 증거",
    s5Title: "행동 인자",
    s5Intro: "내분비 벡터(테스토스테론, 옥시토신, 도파민, 코르티솔, 바소프레신)의 기하 평균:",
    s5d1: "각 호르몬은 지수적으로 감소합니다:",
    s5d2: "기하 평균: (OT × T × DA × cort × AVP)^(1/5)",
    s5d3: "기하 > 산술. 호르몬은 곱셈적이므로: 하나라도 0이면 총 효과는 0입니다.",
    s5d4: "r₂ = 0.013은 [[ref:travison2007_v2|Travison의 −1%/년 테스토스테론 감소]]로부터 교정:",
    s5d5: "dEMF/dt ≈ 1/년이면 → dT/T ≈ −1.3%/년 ≈ [[ref:travison2007_v2|Travison]].",
    s5otTitle: "OT 매개변수의 생물학적 근거",
    s5otIntro: "OT 매개변수 r₁ = 0.010은 데이터에서 피팅된 것이 아닙니다. EMF 조건에서 옥시토신을 억제하는 두 가지 독립적 생물학적 메커니즘에서 도출됩니다:",
    s5otRoute1Title: "경로 1 (HPA → 미주):",
    s5otRoute1: "EMF → 코르티솔↑ ([[ref:pawlak2025|Pawlak 2025, d=1.88]]) → 미주 억제 ([[ref:porges2001|Porges 2001]]) → 옥시토신↓ → 사회적 참여↓ ([[ref:carter2021|Carter 2021]], [[ref:feldman2012|Feldman 2012]])",
    s5otRoute2Title: "경로 2 (마이크로바이옴 → 내분비):",
    s5otRoute2: "EMF → 장내 마이크로바이옴 교란 ([[ref:jin2022|Jin 2022]]) → Lactobacillus↓ → 옥시토신↓ ([[ref:erdman2016|Erdman & Poutahidis 2016]]) → 테스토스테론↓ → 정자형성↓",
    s5otCombined: "곱셈 조합 OT_eff = OT_vagal × OT_microbiome은 근사적으로 지수적: OT_eff ≈ exp(−r_eff × cumEMF), 여기서 r_eff = r_vagal + r_microbiome ≈ 0.005 + 0.005 = 0.010. 이것이 모델의 매개변수입니다.",
    s5qsTitle: "4중 억제 유도",
    s5qsIntro: "행동 인자는 4가지 곱셈적 교배 확률의 기하 평균이며 각각 호르몬에 의해 매개됩니다:",
    s5qsd1: "4가지 확률:",
    s5qsd2: "P(접근) — 남성 구애 개시, T와 DA에 의해 구동, 코르티솔에 의해 억제 ([[ref:puts2008|Puts 2008]]; [[ref:mehta2015|Mehta 2015]]).",
    s5qsd3: "P(매력) — 여성 매력 반응, 남성의 T 구동 표현형과 여성의 OT 동기에 의존 ([[ref:thornhill1994|Thornhill 1994]]).",
    s5qsd4: "P(성관계) — 커플 내 성적 빈도, OT 결합, T 성욕, 코르티솔/멜라토닌 스트레스 상태에 의존 ([[ref:carter2021|Carter 2021]]).",
    s5qsd5: "P(수정) — 행위당 생물학적 수정 확률, 정자 질과 CatSper 캐스케이드에 의존.",
    s5qsd6: "모델의 behav ≈ (P₁ × P₂ × P₃ × P₄)^(1/4)은 기하 평균 근사입니다. 각 P_i는 동일한 지수 호르몬 의존성을 공유합니다.",
    s5qsd7: "이중 호르몬 보정 ([[ref:mehta2015|Mehta & Prasad 2015]], [[ref:dual_hormone_meta2021|메타 N=8538, r=-.061]]): T의 행동적 발현은 낮은 코르티솔을 필요로 합니다. EMF는 동시에 T를 낮추고([[ref:who_t_meta|WHO 메타: SMD 0.87]]) 코르티솔을 높여([[ref:pawlak2025|Pawlak 2025: d=1.88]]) 접근 행동에 이중 잠금을 생성합니다.",
    s5qsd8: "제한: [[ref:dual_hormone_meta2021|이중 호르몬 메타분석]] 효과 크기는 작습니다(r=-.061). 프록시 체인(EMF → T↓ → 접근↓ → TFR↓)은 전체적으로 테스트되지 않았습니다.",

    // S5 수정의 다섯 게이트
    s5fertTitle: "수정 확률: 직렬의 다섯 게이트",
    s5fertLead:
      "각 게이트는 Ca²⁺ 의존적이며 개별적으로 EMF 교란에 취약합니다:",
    s5fertG1: "수정능 획득 (CatSper 의존 Ca²⁺ 진동)",
    s5fertG2: "유동주성 (CatSper 의존 흐름 역행 구름)",
    s5fertG3: "화학주성 (CatSper를 통한 프로게스테론 + 온도 구배)",
    s5fertG4: "첨체 반응 (이중 Ca²⁺: CatSper + IP₃ 저장)",
    s5fertG5: "난자 활성화 (정자 전달 Ca²⁺ 진동 인자)",
    s5fertConclusion:
      "각 게이트에서 10% 감소가 복합됩니다: 0.9⁵ = 0.59 → 개별적으로 경미한 교란에서 수정 확률 41% 감소.",

    s5bTitle: "세포 크기 × 주파수 공명",
    s5bIntro: "[[ref:ttfields_cell_size_frequency|TTFields 임상 데이터]]는 세포 크기와 최적 교란 주파수 사이의 정량적 관계를 보여줍니다. 이 관계는 FDA 3상 데이터에서 교정되어 BERM의 표적 조직에 외삽되었습니다.",
    s5bFormula: "여기서 K ≈ 3.7 Hz·m, [[ref:ttfields_cell_size_frequency|4가지 암 유형에 걸친 TTFields 임상 데이터]]에서 교정.",
    s5bd1: "[[ref:ttfields_cell_size_frequency|TTFields 임상 주파수 (FDA PMA 데이터)]]:",
    s5bd2: "GBM (18 µm): 200 kHz. 췌장 (15 µm): 150 kHz. 유방 (20 µm): 120 kHz. 흑색종 (~25 µm): 100 kHz.",
    s5bd3: "BERM 표적 세포로의 외삽:",
    s5bd4: "정원세포 (12 µm): f_opt ≈ 310 kHz — LED 드라이버 스위칭 범위. 장 상피 (10 µm): f_opt ≈ 370 kHz. 난모세포 (120 µm): f_opt ≈ 31 kHz — HVAC VFD 범위.",
    s5bd5: "LED 드라이버는 일반적으로 20–500 kHz에서 스위칭하며 고조파는 1 MHz를 초과합니다. 정원세포 공명(310 kHz)과의 중첩은 설계된 것이 아닙니다 — 공학적 최적화와 세포 생물학의 우연의 일치입니다.",
    s6Title: "문화 인자와 보상",
    s6Intro: "예측 TFR은 세 가지 계층을 모두 결합합니다:",
    s6Alpha: "은 생물학적으로 유도된 보상 지수입니다.",
    s6d1: "문화 비율은 잔차입니다: bioCap과 behav가 설명하지 못하는 모든 것을 포함합니다. 2024년에서 교정:",
    s6d2: "보상 항: 사회는 생물학적 감소를 부분적으로 보상합니다(ART, 출산 장려 정책, 행동 변화):",
    s6d3: "α = 0.43은 생물학적 회복 구조에서 유도됩니다:",
    s6TableLayer: "계층",
    s6TableWeight: "가중치",
    s6TableVGIC: "VGIC (즉시, 가역)",
    s6TableROS: "ROS (일~주)",
    s6TableDNA: "DNA (부분적 비가역)",
    s6TableLeydig: "Leydig (월~년)",
    s6TableNeuron: "뉴런 (영구)",
    s6TableFooter: "α_eff = Σ(가중치 × α)",
    s6d4: "유효 영향:",
    s6d5: "α = 0.43 → 지수 = 0.57",
    s6d6: "α = 1.0 → 지수 = 0 (완전 보상, EMF 효과 없음)",
    s6d7: "α = 0.0 → 지수 = 1.0 (보상 없음, 직접 효과)",
    s7Title: "야코비안",
    s7Intro: "모델의 EMF에 대한 총 미분은 6개의 편미분의 곱입니다. 어떤 인자라도 0이면 전체 체인이 끊어집니다:",
    s7d1: "각 인자:",
    s7d1a: "EM 장의 라디칼 쌍 효과 → CRY 채널, 스핀 화학, χ_B",
    s7d1b: "라디칼 쌍 효과 → ROS 농도 → 미토콘드리아 반응",
    s7d1c: "ROS 농도 → 세포 상태 → SDF, 지질 과산화, 단백질 손상",
    s7d1d: "세포 상태 → 생체전기 상태 → V_mem 변화, 이온 채널 동역학",
    s7d1e: "생체전기 상태 → 생식 → 정자형성, 배란, 수정",
    s7d1f: "생식 능력 → TFR → fecundability → TTP → ASFR → TFR",
    s8Title: "잠긴 예측",
    s8Intro: "모델은 실현되거나 되지 않을 구체적이고 잠긴 예측을 생성합니다. 잠금은 취소 불가능합니다: 버전 번호 업데이트 없이 예측을 소급 변경할 수 없습니다.",
    s8Country: "국가",
    s8Year: "연도",
    s8Metric: "지표",
    s8Central: "중앙값",
    s8CI: "95% CI",
    s8Locked: "잠금 일자",
    s8Footer: "예측은 v17.0 git SHA에서 동결. 미래 관측이 CI 밖에 떨어지면 모델이 반증됩니다 — 예측이 조정되지 않습니다.",
    s9Title: "반증 조건",
    s9Intro: "모델은 명시적으로 반증 가능합니다. 각 조건은 구체적이고 검증 가능합니다:",
    s9Items: [
      { condition: "Lindgren의 메트릭이 수학적으로 부정확", detail: "유도 g_μν = η_μν + A_μA_ν가 내적으로 불일치하거나 확립된 전기역학과 모순되는 것으로 밝혀지면 기하학적 기반은 실패합니다." },
      { condition: "VGCC 차단제가 EMF의 생물학적 효과를 방지하지 못함", detail: "칼슘 채널 차단제가 통제된 실험에서 EMF 유도 ROS, SDF 또는 호르몬 변화를 감쇠시키지 못하면 일차 메커니즘이 잘못된 것입니다." },
      { condition: "아미시 공동체 TFR이 일반 인구와 같은 속도로 감소", detail: "아미시는 준실험적 대조군으로 기능합니다. 현재 아미시 TFR ≈ 6.5는 안정적이며 주변 인구는 감소하고 있습니다." },
      { condition: "EMF 노출 감소 없이 정자 농도 감소가 중단", detail: "−1.2%/년 정자 감소가 누적 EMF가 계속 증가하는 동안 반전되거나 안정화되면 용량-반응 관계가 잘못된 것입니다." },
      { condition: "잠긴 예측이 신뢰 구간 밖에서 실패", detail: "§8의 예측이 관측 연도에 도달했을 때 95% CI 밖에 떨어지면 해당 예측 범위에서 모델이 반증됩니다." },
    ],
    s10Title: "약리학적 검증 매트릭스",
    s10Intro: "세 가지 독립적 약리학적 개입이 별도 경로에 대한 정량적 교정 앵커를 제공합니다. 각 약물은 특정 메커니즘을 분리하여 모델의 경로 구조를 독립적으로 검증할 수 있습니다.",
    s10Drug: "약물",
    s10Target: "표적",
    s10Pathway: "경로",
    s10Observed: "관찰된 효과",
    s10Calibration: "BERM 교정",
    s10Rows: [
      { drug: "CCB (니페디핀)", target: "L형 VGCC", pathway: "A (VGCC→ROS→SDF)", observed: "90% VGCC 차단 → −23% 정자 농도", calibration: "EMF 교란 ≈ 6%" },
      { drug: "라파마이신", target: "mTOR (85% 억제)", pathway: "Sempou (mTOR→노화)", observed: "수명 +10–25% (마우스)", calibration: "mTOR_eff × 0.15" },
      { drug: "멜라토닌", target: "CRY/일주기", pathway: "C (CRY→시계→배란)", observed: "일주기 진폭 회복", calibration: "야간 EMF 분율 보정" },
    ],
    s10d1: "CCB 교정 (경로 A):",
    s10d2: "이 6% 유효 VGCC 교란은 5년 누적 노출에 걸친 관찰된 −1.2%/년 정자 감소와 일치합니다.",
    s10d3: "라파마이신 교정 (Sempou 경로):",
    s10d4: "관찰된 마우스의 10–25% 수명 연장은 현실적 투여 요법에서의 부분적 mTOR 감소와 일치합니다.",
    s10d5: "멜라토닌 교정 (경로 C):",
    s10d6: "야간 EMF 노출은 CRY 매개 일주기 신호전달을 교란합니다. 외인성 멜라토닌(3–5 mg)은 CRY와 독립적으로 일주기 진폭을 회복시켜 경로 C 우회를 제공합니다.",
    s10d7Link: "→ 통제된 실험적 증거 (실험실 포유류)",
    s11Title: "개인 감수성과 χ 분포",
    s11Intro: "집단 수준의 선택 규칙 χ(Ā)는 평균 반응을 예측합니다. 개인은 세 가지 측정 가능한 요인으로 변동합니다: VGCC 유전자형, 해부학적 기하학, 누적 알로스태틱 부하. 개인 감수성 수정인자는:",
    s11After: "이것은 같은 환경 장에 있는 두 개인이 크기 차수만큼 다른 유효 생물학적 선량을 경험할 수 있음을 의미합니다. 집단 TFR은 개인 χ 분포에 대한 합성곱입니다 — 평균이 꼬리를 숨깁니다.",
    s11d1: "VGCC 유전자형 수정인자는 CACNA1C rs1006737 기능적 표현형 결정으로부터 도출됩니다:",
    s11d2: "AA 동형접합 위험 보인자는 장 섭동 단위당 40% 더 큰 Ca²⁺ 유입을 보입니다.",
    s11d3: "해부학적 수정인자는 내부 장 분포에 영향을 미치는 조직 기하학을 설명합니다:",
    s11d4: "6세 미만 어린이는 같은 외부 장에서 성인의 2–3배 SAR을 받습니다([[ref:gandhi1996|Gandhi 1996]]). BMI는 지방층 감쇠를 조절합니다.",
    s11d5: "누적 수정인자는 [[ref:selye1936|Selye의 일반 적응 증후군]] 단계를 사용합니다:",
    s11d6: "저항 단계에서 보상 용량이 선형으로 감소합니다. 탈진 단계(알로스태틱 부하 > 15)에서 보상이 붕괴하고 유효 수정인자가 급격히 증폭됩니다 — 이것이 예측된 EHS 발병 영역입니다.",
    s11d7: "결합된 개인 수정인자는 집단 χ에 곱셈됩니다:",
    s11d8: "집단 수준 TFR 예측에서 BERM은 유전자형 빈도 분포(Hardy-Weinberg) × 해부학적 인구통계 × 노출 기간 분포에 걸쳐 적분합니다. 평균 개인 수정인자는 구성적으로 1.0입니다. 진단적 가치는 꼬리에 있습니다.",
    s11d9Link: "→ 개인 감수성 증거",
    s12Title: "횡단적 검증 v19.1",
    s12Intro: "54개국(2022년 데이터)에 걸친 공식 발견은 시간적 모델의 독립적 검증을 제공합니다. 횡단적 공식은 2개의 EMF 프록시 변수와 1개의 이진 임계값을 사용하여 LOOCV RMSE 0.522로 국가 TFR을 예측합니다.",
    s12Formula: "2채널 EMF 지수는 주거 전력 소비(ELF 프록시)와 고정 광대역 가입(RF 프록시)을 결합합니다:",
    s12Access: "전력 접근은 이진 생물학적 노출 경계로 작용합니다. IFO-VGIC 활성화 임계값(10⁻⁵ V/m)은 모든 가정용 전기 기기의 작동 거리에서 초과됩니다. 전력이 없는 집단은 노출되지 않습니다.",
    s12Stats: "검증 통계:",
    s12Stat1: "LOOCV RMSE = 0.522 (전체 모델, 1개국 제외 교차 검증)",
    s12Stat2: "R² = 0.851 (n = 54; 전기화 임계값 포착, EMF 고유 효과 아님)",
    s12Stat3: "스킬 점수 = 0.61 (1 − RMSE/sd, 평균 예측 대비 개선)",
    s12Stat4: "주거 전력 소비가 최고의 단일 예측인자 (단변량 RMSE 0.533)",
    s12Stat5: "휴대전화 가입이 가장 약함 (RMSE 1.053)",
    s12Mobile: "휴대전화 역설: 메커니즘이 '정보 접근 → 가족 계획 선택'이라면 정보 장치(휴대전화)가 가장 강한 예측인자여야 합니다. 가장 약합니다. 인프라 변수(주거 전력 소비)가 가장 잘 예측합니다 — 정보 메커니즘이 아닌 물리적 노출 메커니즘과 일치합니다.",
    s12Electrified: "부분 전화 국가의 경우 전화된 하위 집단 TFR은 이진 혼합 모델에서 추정할 수 있습니다:",
    s12Collinearity: "GDP 공선성: EMF 프록시와 GDP/capita는 상관(r = 0.87). 선형 모델에서 한쪽을 통제하면 다른 쪽은 유의하지 않습니다. 이것은 대칭적 식별 문제이며 EMF에 불리한 증거가 아닙니다. 세 가지 구조적 차이가 대칭을 깨뜨립니다: (1) 이진 전화 임계값, (2) 휴대전화 역설, (3) 센티넬 종은 EMF에 반응하지만 GDP에는 반응하지 않음.",
    s12Limitation: "정직한 평가: R² = 0.851은 주로 인구 전환 기울기(니제르 → 한국)를 반영하며 EMF 고유 분산이 아닙니다. 고소득 OECD 국가(n ≈ 36)에서 전력 소비만으로는 TFR 분산을 거의 설명하지 못합니다(R² ≈ 0.0002). 횡단적 공식은 전기화 임계값 — 전산업사회에서 산업사회로의 이진 관문 — 을 포착하며, 전기화된 집단 내의 용량-반응이 아닙니다. 이로 인해 횡단 분석은 BERM의 가장 약한 독립적 증거선이 됩니다. 더 강한 증거는: (1) 규제 검증된 비열적 효과가 있는 메커니즘 경로, (2) 약리학적 용량-반응(멜라토닌, 테스토스테론), (3) 유전적 선택 마커(CatSper, VGCC), (4) 통제 조건의 센티넬 종에서 옵니다. 횡단 분석의 가치는 구조적입니다: 휴대전화 역설과 전력>GDP 예측은 변별적이며, 집합적 적합이 교란되더라도 의미가 있습니다.",
    s12DataNote: "재현 데이터: 54개국 표본 명단(관측 TFR, 전력 소비, 브로드밴드 가입, 모델 예측)은 /data/cross_section_manifest.csv에서 이용 가능. 출처: UN WPP 2024(TFR), OWID/IEA(전력), ITU(브로드밴드).",
    s12Caveat: "횡단적 분석은 인과 방향을 결정할 수 없습니다. 변별적 증거는 센티넬 종, 자연 실험, 전력 없는 집단에서 나옵니다.",
    s13Title: "중첩된 χ (집단 모델)",
    s13Intro: "χ 선택 규칙은 생물학적 배경 변수(광학적, 분자적)가 그룹 간에 다를 때 집단으로 일반화됩니다. 경로 A와 C의 결합된 생식 억제, 집단별 χ 프로파일로 변조:",
    s13PathwayA: "경로 A (VGIC)",
    s13PathwayC: "경로 C (CRY/RPM)",
    s13Combined: "결합된 억제",
    s13TFR: "집단 TFR",
    s13Where: "여기서 γ_A, γ_C는 경로 가중치(0.75, 0.25); χ(Ā_env)는 환경 결합; χ(V_mem)은 막 배경(생세포에서 ≈ 1.0); χ(I_blue)는 광학적 결합(홍채 의존); χ([FAD])는 분자 결합(B2 의존); EMF_personal은 개인 장치 기여입니다.",
    s13Implication: "이 공식은 더 높은 생물학적 χ 값을 가진 집단(파란 눈, 유당 내성)이 환경 EMF 단위 증가당 더 급격한 TFR 감소를 경험한다고 예측합니다.",
    s13Level: "인식론적 수준: L* (검증 가능한 통합). 개별 χ 인스턴스화는 E 또는 M|C 수준; 집단 수준 적분은 L* 구성요소입니다.",
    s14Title: "계층 공식 v20 → v21",
    s14Intro: "원래 횡단적 공식(v19.1)은 2채널 EMF 지수를 사용합니다. 계층 공식은 프라이밍 이력, 회복 능력, 계절 변조, 집단 유전자형을 통합하여 확장합니다.",
    s14V20Title: "공식 v20 (프라이밍 × 회복)",
    s14V20: "TFR ≈ A × exp(−B × EMF_eff) + C",
    s14V20Detail: "EMF_eff = EMF_comp × P × (1/R)",
    s14V20Composite: "EMF_comp = w_ELF × ELF + w_IF × IF + w_RF × RF",
    s14V20Priming: "P = 1 + α × min(electrification_years, P_max)",
    s14V20Recovery: "R = 1 + β × EMF_free_hours/day",
    s14V20Desc: "EMF_comp는 3채널 가중 합성(ELF < 300 Hz, IF 300 Hz–10 MHz, RF > 10 MHz)입니다. P는 수십 년의 전력망 노출에 의한 누적 프라이밍을 포착 — 전화 연수가 VGCC 발현을 상향 조절하여 이후 모든 EMF에 세포를 더 민감하게 만듭니다. R은 회복 창을 포착: 하루 중 유의한 EMF 없는 시간이 CaMKII 탈인산화와 Ca²⁺ 항상성 회복을 가능하게 합니다.",
    s14V21Title: "공식 v21 (제안: + 계절 × 유전자형)",
    s14V21: "EMF_eff = EMF_comp × P × (1/R) × S × G_pop",
    s14V21Season: "S = 1 + γ × f(latitude, season)",
    s14V21Genotype: "G_pop = 1 + δ × CACNA1C_A_allele_frequency",
    s14V21Optional: "선택적 보정 인자(데이터 의존): H = 습도/해안 보정, B = 건축 자재 RF 반사 계수",
    s14V21Desc: "S는 CRY 자기수용체 감도의 계절 변동을 포착: 고위도 겨울은 EMF 섭동에 대한 CRY 감도를 증가시킵니다([[ref:halgamuge2015|Halgamuge 2015]]). G_pop은 CACNA1C rs1006737 A 대립유전자 빈도를 통해 집단 수준의 유전적 감수성을 포착합니다([[ref:sousouri2025|Sousouri 2025]]).",
    s14ParamsTitle: "매개변수 해석",
    s14Params: [
      { param: "P (프라이밍)", amish: "1.0 (프라이밍 없음)", finland: "2.2 (100+ 년 전화)", nigeria: "1.45 (~15 년)", desc: "세포의 EMF 반응 '준비 정도'" },
      { param: "1/R (회복 결핍)", amish: "0.48 (완전 회복)", finland: "1.0 (WiFi 24/7)", nigeria: "0.67 (부분적)", desc: "Ca²⁺ 항상성이 야간에 회복되는가" },
      { param: "S (계절)", amish: "~1.0", finland: "0.9–1.3", nigeria: "~1.0", desc: "빛에 의한 CRY 감도 변조" },
      { param: "G_pop (유전자형)", amish: "~1.0", finland: "~1.1", nigeria: "~0.95", desc: "집단 CACNA1C A 대립유전자 유병률" },
    ],
    s14Evolution: "공식 진화: v17 (스칼라 cumEMF, RMSE ~1.15) → v19.1 (2채널, 54개국, RMSE 0.522) → v20 (+ 프라이밍 × 회복, 예측 RMSE < 0.45) → v21 (+ 계절 × 유전자형, 교정 데이터 필요).",
    s14Level: "인식론적 수준: v20은 M|C (메커니즘 유도, 교정 보류). v21은 L* (제안된 확장, S와 G_pop 교정 데이터 미수집).",
    s15Title: "회복 함수: DNA 수리 시간의 정량화",
    s15Text: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]]은 EMF 유도 DNA 가닥 절단이 노출 중단 후 9시간 이내에 정상으로 돌아감을 입증했습니다. 이 데이터에 지수 감쇠 모델을 피팅하면 시간 상수 τ ≈ 3–4시간이 산출됩니다. 이것은 공식 v20의 회복 인자 R에 직접 대응합니다: R = 1 + β × EMF_free_hours, 여기서 [[ref:ivancsits_dna_recovery|Ivancsits 데이터]]는 β ≈ 0.11을 시사합니다.",
    s15TableTime: "노출 후 시간",
    s15TableDamage: "잔여 손상",
    s15TableScenario: "시나리오",
    s15TableFreeTime: "EMF 무노출 시간",
    s15TableRemaining: "잔여 손상",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
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

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  fi: { Germany: "Saksa", India: "Intia", Finland: "Suomi", "South Korea": "Etelä-Korea", Japan: "Japani", Brazil: "Brasilia", Global: "Maailma" },
  ja: { Germany: "ドイツ", India: "インド", Finland: "フィンランド", "South Korea": "韓国", Japan: "日本", Brazil: "ブラジル", Global: "世界", USA: "米国" },
  fr: { Germany: "Allemagne", India: "Inde", Finland: "Finlande", "South Korea": "Corée du Sud", Japan: "Japon", Brazil: "Brésil", Global: "Monde", USA: "États-Unis" },
  ko: { Germany: "독일", India: "인도", Finland: "핀란드", "South Korea": "한국", Japan: "일본", Brazil: "브라질", Global: "세계", USA: "미국" },
};

export function MathematicsSections({ locale }: { locale: string }) {
  const d = pickCopy(t, locale);
  const WHERE = pickCopy({ en: "where ", fi: "missä ", ja: "ここで ", fr: "où ", ko: "여기서 " }, locale);
  const lp = `/${locale}`;
  const referenceText = (text: string) => (
    <InlineReferenceText text={text} locale={locale} />
  );

  return (
    <div className="space-y-14 overflow-x-clip">
          {/* Version Timeline */}
          <div className="w-full overflow-x-auto mb-2">
            <svg viewBox="0 0 700 85" className="w-full min-w-[700px] max-w-[700px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Title */}
              <text x="350" y="14" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                {pickCopy({ en: "BERM model version evolution", fi: "BERM-mallin versioevoluutio", ja: "BERMモデルのバージョン進化", fr: "Évolution des versions du modèle BERM", ko: "BERM 모델 버전 진화" }, locale)}
              </text>
              {/* Timeline line */}
              <line x1="70" y1="38" x2="630" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.15" />
              {/* v17 */}
              <circle cx="70" cy="38" r="5" fill="#3b82f6" fillOpacity="0.7" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="70" y="30" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="600">v17</text>
              <text x="70" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "Scalar", fi: "Skalaari-", ja: "スカラー", fr: "Architecture", ko: "스칼라" }, locale)}
              </text>
              <text x="70" y="68" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "architecture", fi: "arkkitehtuuri", ja: "アーキテクチャ", fr: "scalaire", ko: "아키텍처" }, locale)}
              </text>
              {/* v19.1 diagnostic */}
              <circle cx="210" cy="38" r="5" fill="#8b5cf6" fillOpacity="0.7" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="210" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="600">v19.1</text>
              <text x="210" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "Two-channel", fi: "Kaksikanava", ja: "2チャネル", fr: "Deux canaux", ko: "2채널" }, locale)}
              </text>
              <text x="210" y="68" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.35">
                {pickCopy({ en: "(diagnostic)", fi: "(diagnostinen)", ja: "(診断用)", fr: "(diagnostique)", ko: "(진단용)" }, locale)}
              </text>
              {/* v20 layered */}
              <circle cx="350" cy="38" r="5" fill="#10b981" fillOpacity="0.7" stroke="#10b981" strokeWidth="1.5" />
              <text x="350" y="30" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="600">v20</text>
              <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "Layered", fi: "Kerrostettu", ja: "層状", fr: "Formule", ko: "계층화된" }, locale)}
              </text>
              <text x="350" y="68" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "formula", fi: "formula", ja: "公式", fr: "stratifiée", ko: "공식" }, locale)}
              </text>
              {/* v21 T-calibrated */}
              <circle cx="490" cy="38" r="5" fill="#f59e0b" fillOpacity="0.7" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="490" y="30" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="600">v21</text>
              <text x="490" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                {pickCopy({ en: "T-calibrated", fi: "T-kalibroitu", ja: "T較正", fr: "Calibré-T", ko: "T-교정" }, locale)}
              </text>
              {/* Connecting arrows between dots */}
              <polygon points="138,38 130,34 130,42" fill="currentColor" opacity="0.12" />
              <polygon points="278,38 270,34 270,42" fill="currentColor" opacity="0.12" />
              <polygon points="418,38 410,34 410,42" fill="currentColor" opacity="0.12" />
            </svg>
          </div>

          {/* S1 Lindgren geometry */}
          <section id="lindgren">
            <span id="section-1" />
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§1"}</span>
              {d.s1Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {referenceText(d.s1Intro)}
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
              <DerivationLine>{referenceText(d.s1d5)}</DerivationLine>
              <div className="mt-4 p-3 rounded border border-accent/20 bg-card-bg">
                <DerivationLine>{d.s1d6}</DerivationLine>
                <DerivationLine>{referenceText(d.s1d6a)}</DerivationLine>
                <DerivationLine>{referenceText(d.s1d6b)}</DerivationLine>
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
              {referenceText(d.s1bIntro)}
            </p>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s1bAfter}
            </p>

            <Derivation>
              <DerivationLine>{d.s1bd1}</DerivationLine>
              <DerivationLine>{d.s1bd2}</DerivationLine>
              <DerivationLine>{referenceText(d.s1bd3)}</DerivationLine>
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

            {/* Frequency Spectrum Diagram */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox="0 0 700 170" className="w-full min-w-[700px] max-w-[700px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="350" y="14" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                  {pickCopy({ en: "Three-Channel Frequency Spectrum", fi: "Kolmen kanavan taajuusspektri", ja: "三チャネル周波数スペクトル", fr: "Spectre de fréquence à trois canaux", ko: "3채널 주파수 스펙트럼" }, locale)}
                </text>
                {/* ELF band */}
                <rect x="50" y="24" width="160" height="60" rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                <text x="130" y="42" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">ELF</text>
                <text x="130" y="56" textAnchor="middle" fill="#10b981" fontSize="8" opacity="0.9">{"w_ELF = 0.05"}</text>
                <text x="130" y="72" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                  {pickCopy({ en: "Membrane modulation", fi: "Kalvomodulaatio", ja: "膜変調", fr: "Modulation membranaire", ko: "막 변조" }, locale)}
                </text>
                {/* IF band */}
                <rect x="210" y="24" width="190" height="60" rx="4" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
                <text x="305" y="42" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">IF</text>
                <text x="305" y="56" textAnchor="middle" fill="#f59e0b" fontSize="8" opacity="0.9">{"w_IF = 0.60"}</text>
                <text x="305" y="72" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">IFO-VGIC</text>
                {/* RF band */}
                <rect x="400" y="24" width="260" height="60" rx="4" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
                <text x="530" y="42" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700">RF</text>
                <text x="530" y="56" textAnchor="middle" fill="#3b82f6" fontSize="8" opacity="0.9">{"w_RF = 0.35"}</text>
                <text x="530" y="72" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                  {pickCopy({ en: "Spin chemistry", fi: "Spin-kemia", ja: "スピン化学", fr: "Chimie de spin", ko: "스핀 화학" }, locale)}
                </text>
                {/* Frequency axis */}
                <line x1="50" y1="100" x2="660" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
                <polygon points="660,100 652,96 652,104" fill="currentColor" opacity="0.2" />
                {/* Log-scale ticks: 0 Hz to 10 GHz */}
                <line x1="50" y1="96" x2="50" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="50" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">0 Hz</text>
                <line x1="130" y1="96" x2="130" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="130" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">100 Hz</text>
                <line x1="210" y1="96" x2="210" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="210" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">1 kHz</text>
                <line x1="305" y1="96" x2="305" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="305" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">100 kHz</text>
                <line x1="400" y1="96" x2="400" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="400" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">1 MHz</text>
                <line x1="530" y1="96" x2="530" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="530" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">100 MHz</text>
                <line x1="660" y1="96" x2="660" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="660" y="116" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">10 GHz</text>
                {/* Cutoff dashed lines */}
                <line x1="210" y1="20" x2="210" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
                <text x="210" y="135" textAnchor="middle" fill="currentColor" fontSize="8" fontStyle="italic" opacity="0.55">
                  {"f_c ≈ 1 kHz"}
                </text>
                <line x1="400" y1="20" x2="400" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
                <text x="400" y="135" textAnchor="middle" fill="currentColor" fontSize="8" fontStyle="italic" opacity="0.55">
                  {"f_RPM ≈ 1 MHz"}
                </text>
                {/* Axis title */}
                <text x="355" y="155" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                  {pickCopy({ en: "Frequency (log scale)", fi: "Taajuus (log-asteikko)", ja: "周波数（対数スケール）", fr: "Fréquence (échelle log)", ko: "주파수 (로그 스케일)" }, locale)}
                </text>
              </svg>
            </div>

            <Derivation>
              <div className="space-y-4">
                <div className="p-3 rounded border-l-2 border-blue-500/50">
                  <p className="text-xs font-semibold text-blue-400 mb-1">ELF (f {"<"} ~1 kHz)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="\chi_{mem} = \frac{E_{mem}}{\sqrt{1 + E_{mem}^2}} \approx 1.0, \quad H(f) = \frac{1}{\sqrt{1+(f/f_c)^2}}" />
                  </div>
                  <DerivationLine>{referenceText(d.s2bELF)}</DerivationLine>
                </div>
                <div className="p-3 rounded border-l-2 border-orange-500/50">
                  <p className="text-xs font-semibold text-orange-400 mb-1">IF (f_c {"<"} f {"<"} f_RPM)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="T(f) = \frac{1}{\sqrt{1+(f_c/f)^2}}, \quad G_{furrow} \approx \left(\frac{d_{cell}}{d_{furrow}}\right)^2 \approx 25\times" />
                  </div>
                  <DerivationLine>{referenceText(d.s2bIF)}</DerivationLine>
                  <p className="text-xs text-foreground-muted mt-2 italic leading-relaxed">{referenceText(d.s2bIFSources)}</p>
                </div>
                <div className="p-3 rounded border-l-2 border-red-500/50">
                  <p className="text-xs font-semibold text-red-400 mb-1">RF (f {">"} ~1 MHz)</p>
                  <div className="text-center my-2">
                    <MathBlock tex="B_{local} = \frac{1}{w}b + \frac{(A \cdot b)A}{w(1+w)}, \quad w = \sqrt{1 + A^2}" />
                  </div>
                  <DerivationLine>{referenceText(d.s2bRF)}</DerivationLine>
                </div>
              </div>
            </Derivation>

            <div className="mt-6 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4 max-w-3xl">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.s2bRegGapTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">{referenceText(d.s2bRegGap)}</p>
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
                <p>{referenceText(d.s3ifoIfo)}</p>
                <div className="text-center my-2">
                  <MathBlock tex="R_{IFO}(E,f) = \chi_{mem} \cdot H(f) \cdot E_{ext} \cdot d_{cell} \cdot q_{eff} / kT \quad \text{(linear)}" />
                </div>
                <p>{d.s3ifoDep}</p>
                <div className="text-center my-2">
                  <MathBlock tex="R_{DEP}(E,f) = T(f) \cdot G_{geo} \cdot |E_{ext}|^2 \cdot V_{cell} \cdot \text{Re}[K(f)] \quad \text{(quadratic)}" />
                </div>
                <p>{referenceText(d.s3ifoCyb5b)}</p>
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
              {WHERE}<MathBlock tex="a = 6.5" display={false} />{" "}
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
                <Link href={`${lp}/evidence#metabolic-evidence`} className="hover:underline">
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
              {WHERE}{" "}
              <MathBlock tex="r_1 = 0.010" display={false} /> (OT),{" "}
              <MathBlock tex="r_2 = 0.013" display={false} /> (T),{" "}
              <MathBlock tex="r_3 = 0.016" display={false} /> (DA),{" "}
              <MathBlock tex="r_4 = 0.008" display={false} />{" "}
              ({pickCopy({ en: "cortisol", fi: "kortisoli", ja: "コルチゾール", fr: "cortisol", ko: "코르티솔" }, locale)}),{" "}
              <MathBlock tex="r_5 = 0.006" display={false} />{" "}
              ({pickCopy({ en: "vasopressin", fi: "vasopressiini", ja: "バソプレシン", fr: "vasopressine", ko: "바소프레신" }, locale)}/AVP).
            </p>
            <p className="text-foreground-muted text-sm leading-relaxed mt-2">
              {pickCopy({ en: "Additionally, cortisol modulates effective testosterone:", fi: "Lisäksi kortisoli moduloi efektiivistä testosteronia:", ja: "さらに、コルチゾールは有効テストステロンを調節する：", fr: "De plus, le cortisol module la testostérone effective :", ko: "또한, 코르티솔은 유효 테스토스테론을 조절한다:" }, locale)}{" "}
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
                <DerivationLine>{referenceText(d.s5d4)}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{T}(\text{cumEMF}) = e^{-0.013 \times \text{cumEMF}}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\frac{dT}{dt} \approx -0.013 \times \frac{d\text{EMF}}{dt} \times T" />
                </div>
                <DerivationLine>{referenceText(d.s5d5)}</DerivationLine>
              </div>
            </Derivation>

            <Derivation label={d.s5otTitle}>
              <DerivationLine>{d.s5otIntro}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>
                  <strong>{d.s5otRoute1Title}</strong>
                </DerivationLine>
                <DerivationLine>{referenceText(d.s5otRoute1)}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{OT}_{\text{vagal}} = \left(\frac{1}{1 + 0.88 \cdot \min(1, \text{EMF}/5)}\right)^{0.5}" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>
                  <strong>{d.s5otRoute2Title}</strong>
                </DerivationLine>
                <DerivationLine>{referenceText(d.s5otRoute2)}</DerivationLine>
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
                <DerivationLine>{referenceText(d.s5qsd2)}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{approach}) \propto T \times \frac{1}{\text{cort}} \times \text{DA}" display={false} />
                </div>
                <DerivationLine>{referenceText(d.s5qsd3)}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{attraction}) \propto T_{\text{male}} \times \text{OT}_{\text{female}}" display={false} />
                </div>
                <DerivationLine>{referenceText(d.s5qsd4)}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{sex}) \propto \text{OT} \times T \times \frac{1}{\text{cort}}" display={false} />
                </div>
                <DerivationLine>{d.s5qsd5}</DerivationLine>
                <div className="text-center my-1">
                  <MathBlock tex="P(\text{fert}) \propto e^{-r_{\text{sperm}} \times \text{cumEMF}}" display={false} />
                </div>
                <div className="mt-4 pl-4 border-l-2 border-accent/30">
                  <p className="text-sm font-semibold mb-2">{d.s5fertTitle}</p>
                  <p className="text-xs text-foreground-muted mb-3">{d.s5fertLead}</p>
                  <div className="text-center my-2">
                    <MathBlock tex="P(\text{fert}) = P_1 \times P_2 \times P_3 \times P_4 \times P_5" display={false} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-foreground-muted">
                    <span>P₁ = {d.s5fertG1}</span>
                    <span>P₂ = {d.s5fertG2}</span>
                    <span>P₃ = {d.s5fertG3}</span>
                    <span>P₄ = {d.s5fertG4}</span>
                    <span>P₅ = {d.s5fertG5}</span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-3 italic">{d.s5fertConclusion}</p>
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s5qsd6}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="\text{behav} \approx \left(P_1 \times P_2 \times P_3 \times P_4\right)^{1/4} = \left(\text{OT}^a \times T^b \times \text{DA}^c \times \text{cort}^{-d}\right)^{1/4}" />
                </div>
              </div>
              <div className="mt-3">
                <DerivationLine>{referenceText(d.s5qsd7)}</DerivationLine>
                <div className="text-center my-3">
                  <MathBlock tex="T_{\text{eff}} = T \times \left(1 - \frac{\text{cortisol}}{\text{cortisol}_{\max}}\right)" />
                </div>
                <div className="text-center my-2 text-sm text-foreground-muted">
                  {pickCopy({ en: "If each P_i drops 20%: 0.8⁴ = 0.41 → 59% reduction", fi: "Jos jokainen P_i laskee 20 %: 0,8⁴ = 0,41 → 59 % lasku", ja: "各P_iが20%低下した場合：0.8⁴ = 0.41 → 59%減少", fr: "Si chaque P_i baisse de 20 % : 0,8⁴ = 0,41 → réduction de 59 %", ko: "각 P_i가 20% 하락 시: 0.8⁴ = 0.41 → 59% 감소" }, locale)}
                </div>
              </div>
              <div className="mt-3 p-3 rounded border border-status-partial/40 bg-status-partial/5 text-sm">
                <DerivationLine>{referenceText(d.s5qsd8)}</DerivationLine>
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
              {referenceText(d.s5bIntro)}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="f_{opt} = \frac{K}{d_{cell}}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {WHERE}<MathBlock tex="K \approx 3.7\;\text{Hz·m}" display={false} />{" "}
              {referenceText(d.s5bFormula)}
            </p>

            <Derivation>
              <DerivationLine>{referenceText(d.s5bd1)}</DerivationLine>
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

            {/* Cell Size x Frequency Scatter Plot (log-log) */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox="0 0 500 350" className="w-full min-w-[500px] max-w-[500px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="270" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                  {pickCopy({ en: "Cell Size vs. Optimal Frequency (log-log)", fi: "Solukoko vs. optimaalinen taajuus (log-log)", ja: "細胞サイズ vs. 最適周波数（両対数）", fr: "Taille cellulaire vs. fréquence optimale (log-log)", ko: "세포 크기 vs. 최적 주파수 (로그-로그)" }, locale)}
                </text>
                {/* Axes: X=70-470 (2 decades, 200px/dec), Y=300-30 (6 decades, 45px/dec) */}
                <line x1="70" y1="30" x2="70" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="70" y1="300" x2="470" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                {/* Y grid lines */}
                <line x1="70" y1="255" x2="470" y2="255" stroke="currentColor" strokeWidth="0.5" opacity="0.07" strokeDasharray="2,4" />
                <line x1="70" y1="210" x2="470" y2="210" stroke="currentColor" strokeWidth="0.5" opacity="0.07" strokeDasharray="2,4" />
                <line x1="70" y1="165" x2="470" y2="165" stroke="currentColor" strokeWidth="0.5" opacity="0.07" strokeDasharray="2,4" />
                <line x1="70" y1="120" x2="470" y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.07" strokeDasharray="2,4" />
                <line x1="70" y1="75" x2="470" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.07" strokeDasharray="2,4" />
                {/* X-axis labels (log): 1, 5, 10, 20, 50, 100 um */}
                <text x="70" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"1 µm"}</text>
                <text x="210" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"5"}</text>
                <text x="270" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"10 µm"}</text>
                <text x="330" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"20"}</text>
                <text x="410" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"50"}</text>
                <text x="470" y="316" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.45">{"100 µm"}</text>
                {/* X-axis title */}
                <text x="270" y="338" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                  {pickCopy({ en: "Cell diameter (log)", fi: "Solun halkaisija (log)", ja: "細胞直径（対数）", fr: "Diamètre cellulaire (log)", ko: "세포 직경 (로그)" }, locale)}
                </text>
                {/* Y-axis labels (log): 1kHz to 1GHz */}
                <text x="62" y="303" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">1 kHz</text>
                <text x="62" y="258" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">10 kHz</text>
                <text x="62" y="213" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">100 kHz</text>
                <text x="62" y="168" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">1 MHz</text>
                <text x="62" y="123" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">10 MHz</text>
                <text x="62" y="78" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">100 MHz</text>
                <text x="62" y="33" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.45">1 GHz</text>
                {/* Y-axis title */}
                <text x="16" y="165" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5" transform="rotate(-90,16,165)">
                  {pickCopy({ en: "Optimal frequency (log)", fi: "Optimaalinen taajuus (log)", ja: "最適周波数（対数）", fr: "Fréquence optimale (log)", ko: "최적 주파수 (로그)" }, locale)}
                </text>
                {/* Trend line: f=K/d. At d=1um f=3.7MHz(y=139), at d=100um f=37kHz(y=229) */}
                <line x1="70" y1="139" x2="470" y2="229" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,3" opacity="0.18" />
                <text x="465" y="224" textAnchor="end" fill="currentColor" fontSize="9" fontStyle="italic" opacity="0.35">f = K/d</text>
                {/* Data points */}
                {/* Bacterium: 1um, 1GHz -> x=70, y=30 */}
                <circle cx="70" cy="30" r="5" fill="#f59e0b" fillOpacity="0.7" stroke="#f59e0b" strokeWidth="1" />
                <text x="80" y="28" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.7">
                  {pickCopy({ en: "Bacterium (~1 µm)", fi: "Bakteeri (~1 µm)", ja: "細菌 (~1 µm)", fr: "Bactérie (~1 µm)", ko: "세균 (~1 µm)" }, locale)}
                </text>
                {/* Sperm: 5um, 400kHz -> x=210, y=183 */}
                <circle cx="210" cy="183" r="5" fill="#ef4444" fillOpacity="0.7" stroke="#ef4444" strokeWidth="1" />
                <text x="220" y="180" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.7">
                  {pickCopy({ en: "Sperm (~5 µm)", fi: "Siittiö (~5 µm)", ja: "精子 (~5 µm)", fr: "Spermatozoïde (~5 µm)", ko: "정자 (~5 µm)" }, locale)}
                </text>
                {/* Lymphocyte: 10um, 200kHz -> x=270, y=197 */}
                <circle cx="270" cy="197" r="5" fill="#10b981" fillOpacity="0.7" stroke="#10b981" strokeWidth="1" />
                <text x="280" y="208" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.7">
                  {pickCopy({ en: "Lymphocyte (~10 µm)", fi: "Lymfosyytti (~10 µm)", ja: "リンパ球 (~10 µm)", fr: "Lymphocyte (~10 µm)", ko: "림프구 (~10 µm)" }, locale)}
                </text>
                {/* GBM tumor: 15um, 200kHz -> x=305, y=197 */}
                <circle cx="305" cy="197" r="5" fill="#a855f7" fillOpacity="0.7" stroke="#a855f7" strokeWidth="1" />
                <text x="315" y="193" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.7">{"GBM (~15 µm)"}</text>
                {/* Neuron: 20um, 100kHz -> x=330, y=210 */}
                <circle cx="330" cy="210" r="5" fill="#3b82f6" fillOpacity="0.7" stroke="#3b82f6" strokeWidth="1" />
                <text x="340" y="221" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.7">
                  {pickCopy({ en: "Neuron (~20 µm)", fi: "Neuroni (~20 µm)", ja: "ニューロン (~20 µm)", fr: "Neurone (~20 µm)", ko: "뉴런 (~20 µm)" }, locale)}
                </text>
              </svg>
            </div>
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
              {WHERE}{" "}
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
                      <td className="text-right py-1">{pickCopy({ en: "0.425 ≈ 0.43", fi: "0,425 ≈ 0,43", ja: "0.425 ≈ 0.43", fr: "0,425 ≈ 0,43", ko: "0.425 ≈ 0.43" }, locale)}</td>
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
                        {COUNTRY_NAMES[locale]?.[p.country] ?? p.country}
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
                <Link href={`${lp}/evidence#metabolic-evidence`} className="hover:underline">
                  {d.s10d7Link}
                </Link>
              </p>
              <p className="text-xs text-accent mt-1">
                <Link href={`${lp}/evidence/pharmacology`} className="hover:underline">
                  {lp.startsWith("/fi") ? "→ Farmakologinen evidenssi: 8 lääkeryhmän konvergenssi" : "→ Pharmacological evidence: 8 drug class convergence"}
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
              <DerivationLine>{referenceText(d.s11d2)}</DerivationLine>

              <div className="mt-4">
                <DerivationLine>{d.s11d3}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="g_{\text{anatomy}} = f_{\text{age}} \times f_{\text{BMI}}, \quad f_{\text{age}} = \begin{cases} 2.5 & \text{age} < 6 \\ 2.0 & 6 \leq \text{age} < 12 \\ 1.5 & 12 \leq \text{age} < 18 \\ 1.0 & \text{age} \geq 18 \end{cases}" />
                </div>
                <DerivationLine>{referenceText(d.s11d4)}</DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>{referenceText(d.s11d5)}</DerivationLine>
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
                <Link href={`${lp}/evidence/magnetoreception#individual-susceptibility`} className="hover:underline">
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

            <Derivation label={pickCopy({ en: "Mobile phone paradox", fi: "Matkapuhelinparadoksi", ja: "携帯電話パラドックス", fr: "Paradoxe du téléphone portable", ko: "휴대전화 역설" }, locale)}>
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

            <Derivation label={pickCopy({ en: "GDP collinearity", fi: "BKT-kollineaarisuus", ja: "GDP共線性", fr: "Colinéarité PIB", ko: "GDP 공선성" }, locale)}>
              <DerivationLine>{d.s12Collinearity}</DerivationLine>
            </Derivation>

            <div className="mt-4 p-3 rounded border border-amber-500/40 bg-amber-500/5">
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                {pickCopy({ en: "Honest assessment", fi: "Rehellinen arvio", ja: "正直な評価", fr: "Évaluation honnête", ko: "정직한 평가" }, locale)}
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.s12Limitation}
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed mt-2 italic">
                {d.s12DataNote}
              </p>
            </div>

            <div className="mt-4 p-3 rounded border border-status-partial/40 bg-status-partial/5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.s12Caveat}
              </p>
            </div>

            {/* 54-Country Scatter: Predicted vs Observed TFR */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox="0 0 500 400" className="w-full min-w-[500px] max-w-[500px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="260" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                  {pickCopy({ en: "Predicted vs. Observed TFR (54 countries)", fi: "Ennustettu vs. havaittu TFR (54 maata)", ja: "予測 vs. 実測TFR（54カ国）", fr: "TFR prédit vs. observé (54 pays)", ko: "예측 vs. 관측 TFR (54개국)" }, locale)}
                </text>
                {/* Plot area: x=60-460 (0-7), y=360-40 (0-7) */}
                {/* Axes */}
                <line x1="60" y1="40" x2="60" y2="360" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="60" y1="360" x2="460" y2="360" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                {/* Grid + tick labels: 1-6 */}
                {[1,2,3,4,5,6].map(v => (
                  <g key={`g-${v}`}>
                    <line x1={60+v/7*400} y1="40" x2={60+v/7*400} y2="360" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
                    <line x1="60" y1={360-v/7*320} x2="460" y2={360-v/7*320} stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
                    <text x={60+v/7*400} y="375" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.4">{v}</text>
                    <text x="52" y={364-v/7*320} textAnchor="end" fill="currentColor" fontSize="9" opacity="0.4">{v}</text>
                  </g>
                ))}
                <text x="60" y="375" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.4">0</text>
                {/* Axis titles */}
                <text x="260" y="393" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
                  {pickCopy({ en: "Predicted TFR", fi: "Ennustettu TFR", ja: "予測TFR", fr: "TFR prédit", ko: "예측 TFR" }, locale)}
                </text>
                <text x="16" y="200" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5" transform="rotate(-90,16,200)">
                  {pickCopy({ en: "Observed TFR", fi: "Havaittu TFR", ja: "実測TFR", fr: "TFR observé", ko: "관측 TFR" }, locale)}
                </text>
                {/* Perfect fit diagonal (dashed) */}
                <line x1="60" y1="360" x2="460" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="6,4" opacity="0.15" />
                <text x="462" y="38" textAnchor="start" fill="currentColor" fontSize="9" fontStyle="italic" opacity="0.3">y = x</text>
                {/* R-squared */}
                <rect x="370" y="340" width="82" height="18" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" />
                <text x="411" y="353" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600" opacity="0.65">{"R² = 0.89"}</text>
                {/* Data points: x=60+pred/7*400, y=360-obs/7*320 */}
                {/* South Korea: pred=0.82, obs=0.72 -> (107,327) */}
                <circle cx="107" cy="327" r="4.5" fill="#ef4444" fillOpacity="0.75" stroke="#ef4444" strokeWidth="1" />
                <text x="116" y="338" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "S. Korea (0.72)", fi: "Etelä-Korea (0.72)", ja: "韓国 (0.72)", fr: "Corée du S. (0.72)", ko: "한국 (0.72)" }, locale)}
                </text>
                {/* Japan: pred=1.15, obs=1.20 -> (126,305) */}
                <circle cx="126" cy="305" r="4.5" fill="#f59e0b" fillOpacity="0.75" stroke="#f59e0b" strokeWidth="1" />
                <text x="117" y="317" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "Japan (1.20)", fi: "Japani (1.20)", ja: "日本 (1.20)", fr: "Japon (1.20)", ko: "일본 (1.20)" }, locale)}
                </text>
                {/* Finland: pred=1.35, obs=1.26 -> (137,302) */}
                <circle cx="137" cy="302" r="4.5" fill="#3b82f6" fillOpacity="0.75" stroke="#3b82f6" strokeWidth="1" />
                <text x="147" y="320" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "Finland (1.26)", fi: "Suomi (1.26)", ja: "フィンランド (1.26)", fr: "Finlande (1.26)", ko: "핀란드 (1.26)" }, locale)}
                </text>
                {/* Germany: pred=1.25, obs=1.36 -> (131,298) */}
                <circle cx="131" cy="298" r="4.5" fill="#8b5cf6" fillOpacity="0.75" stroke="#8b5cf6" strokeWidth="1" />
                <text x="122" y="290" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "Germany (1.36)", fi: "Saksa (1.36)", ja: "ドイツ (1.36)", fr: "Allemagne (1.36)", ko: "독일 (1.36)" }, locale)}
                </text>
                {/* USA: pred=1.55, obs=1.62 -> (149,286) */}
                <circle cx="149" cy="286" r="4.5" fill="#06b6d4" fillOpacity="0.75" stroke="#06b6d4" strokeWidth="1" />
                <text x="140" y="278" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.65">USA (1.62)</text>
                {/* Brazil: pred=1.80, obs=1.65 -> (163,285) */}
                <circle cx="163" cy="285" r="4.5" fill="#10b981" fillOpacity="0.75" stroke="#10b981" strokeWidth="1" />
                <text x="173" y="299" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "Brazil (1.65)", fi: "Brasilia (1.65)", ja: "ブラジル (1.65)", fr: "Brésil (1.65)", ko: "브라질 (1.65)" }, locale)}
                </text>
                {/* India: pred=2.20, obs=2.00 -> (186,269) */}
                <circle cx="186" cy="269" r="4.5" fill="#f97316" fillOpacity="0.75" stroke="#f97316" strokeWidth="1" />
                <text x="196" y="266" fill="currentColor" fontSize="9" opacity="0.65">
                  {pickCopy({ en: "India (2.00)", fi: "Intia (2.00)", ja: "インド (2.00)", fr: "Inde (2.00)", ko: "인도 (2.00)" }, locale)}
                </text>
                {/* Israel: pred=2.60, obs=2.90 -> (209,227) */}
                <circle cx="209" cy="227" r="4.5" fill="#14b8a6" fillOpacity="0.75" stroke="#14b8a6" strokeWidth="1" />
                <text x="219" y="224" fill="currentColor" fontSize="9" opacity="0.65">Israel (2.90)</text>
                {/* Nigeria: pred=5.40, obs=5.10 -> (369,127) */}
                <circle cx="369" cy="127" r="4.5" fill="#eab308" fillOpacity="0.75" stroke="#eab308" strokeWidth="1" />
                <text x="379" y="124" fill="currentColor" fontSize="9" opacity="0.65">Nigeria (5.10)</text>
                {/* Amish: pred=6.20, obs=6.10 -> (414,81) */}
                <circle cx="414" cy="81" r="4.5" fill="#22c55e" fillOpacity="0.75" stroke="#22c55e" strokeWidth="1" />
                <text x="406" y="73" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.65">Amish (6.10)</text>
              </svg>
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

            {/* Radar/Spider Chart: Population Parameter Profiles */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox="0 0 400 430" className="w-full min-w-[440px] max-w-[440px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                <text x="200" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                  {pickCopy({ en: "Population Parameter Profiles", fi: "Populaatioparametriprofiilit", ja: "集団パラメータプロファイル", fr: "Profils des paramètres de population", ko: "집단 매개변수 프로파일" }, locale)}
                </text>
                {/* Center=(200,200), radius=150 */}
                {/* Grid diamonds at 25%, 50%, 75%, 100% */}
                <polygon points="200,162 238,200 200,238 162,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                <polygon points="200,125 275,200 200,275 125,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                <polygon points="200,88 313,200 200,313 87,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                <polygon points="200,50 350,200 200,350 50,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                {/* Scale labels at 100% ring */}
                <text x="209" y="59" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.3">1.0</text>
                <text x="204" y="87" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.3">0.75</text>
                <text x="204" y="127" textAnchor="start" fill="currentColor" fontSize="9" opacity="0.3">0.50</text>
                {/* Axis lines */}
                <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
                {/* Axis labels */}
                <text x="200" y="44" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.7">P</text>
                <text x="360" y="196" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.7">R</text>
                <text x="200" y="368" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.7">S</text>
                <text x="40" y="196" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.7">G</text>
                {/* Axis sublabels */}
                <text x="200" y="29" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.35">
                  {pickCopy({ en: "(physiological)", fi: "(fysiologinen)", ja: "（生理学的）", fr: "(physiologique)", ko: "(생리학적)" }, locale)}
                </text>
                <text x="360" y="218" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.35">
                  {pickCopy({ en: "(recovery)", fi: "(palautuminen)", ja: "（回復）", fr: "(récupération)", ko: "(회복)" }, locale)}
                </text>
                <text x="200" y="386" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.35">
                  {pickCopy({ en: "(social)", fi: "(sosiaalinen)", ja: "（社会的）", fr: "(social)", ko: "(사회적)" }, locale)}
                </text>
                <text x="40" y="218" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.35">
                  {pickCopy({ en: "(genetic)", fi: "(geneettinen)", ja: "（遺伝的）", fr: "(génétique)", ko: "(유전적)" }, locale)}
                </text>
                {/* South Korea: P=0.3, R=0.1, S=0.9, G=0.7 (back layer, red) */}
                <polygon points="200,155 215,200 200,335 95,200" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.5" />
                {/* Finland: P=0.5, R=0.3, S=0.8, G=0.6 (middle layer, blue) */}
                <polygon points="200,125 245,200 200,320 110,200" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.55" />
                {/* Amish: P=0.95, R=0.95, S=0.3, G=0.5 (front layer, green) */}
                <polygon points="200,58 343,200 200,245 125,200" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.65" />
                {/* Center dot */}
                <circle cx="200" cy="200" r="2" fill="currentColor" opacity="0.3" />
                {/* Data point dots on vertices */}
                {/* Amish vertices */}
                <circle cx="200" cy="58" r="3" fill="#10b981" fillOpacity="0.8" />
                <circle cx="343" cy="200" r="3" fill="#10b981" fillOpacity="0.8" />
                <circle cx="200" cy="245" r="3" fill="#10b981" fillOpacity="0.8" />
                <circle cx="125" cy="200" r="3" fill="#10b981" fillOpacity="0.8" />
                {/* Legend */}
                <line x1="80" y1="413" x2="95" y2="413" stroke="#10b981" strokeWidth="2.5" />
                <text x="99" y="416" fill="currentColor" fontSize="9" opacity="0.6">
                  {pickCopy({ en: "Amish", fi: "Amissit", ja: "アーミッシュ", fr: "Amish", ko: "아미시" }, locale)}
                </text>
                <line x1="165" y1="413" x2="180" y2="413" stroke="#3b82f6" strokeWidth="2.5" />
                <text x="184" y="416" fill="currentColor" fontSize="9" opacity="0.6">
                  {pickCopy({ en: "Finland", fi: "Suomi", ja: "フィンランド", fr: "Finlande", ko: "핀란드" }, locale)}
                </text>
                <line x1="245" y1="413" x2="260" y2="413" stroke="#ef4444" strokeWidth="2.5" />
                <text x="264" y="416" fill="currentColor" fontSize="9" opacity="0.6">
                  {pickCopy({ en: "South Korea", fi: "Etelä-Korea", ja: "韓国", fr: "Corée du Sud", ko: "한국" }, locale)}
                </text>
              </svg>
            </div>
          </section>

          {/* S14 Layered Formula */}
          <section id="layered-formula" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§14"}</span>
              {d.s14Title}
            </h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.s14Intro}
            </p>

            <h4 className="text-sm font-semibold mb-3">{d.s14V20Title}</h4>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-6 font-mono text-sm space-y-1">
              <p className="font-semibold">{d.s14V20}</p>
              <p className="text-foreground-muted">{d.s14V20Detail}</p>
              <p className="text-foreground-muted text-xs mt-2">{d.s14V20Composite}</p>
              <p className="text-foreground-muted text-xs">{d.s14V20Priming}</p>
              <p className="text-foreground-muted text-xs">{d.s14V20Recovery}</p>
            </div>
            <p className="text-sm text-foreground-muted mb-8 max-w-3xl leading-relaxed">{d.s14V20Desc}</p>

            <h4 className="text-sm font-semibold mb-3">{d.s14V21Title}</h4>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 mb-4 font-mono text-sm space-y-1">
              <p className="font-semibold">{d.s14V21}</p>
              <p className="text-foreground-muted text-xs mt-2">{d.s14V21Season}</p>
              <p className="text-foreground-muted text-xs">{d.s14V21Genotype}</p>
            </div>
            <p className="text-xs text-foreground-muted/70 italic mb-6">{d.s14V21Optional}</p>
            <p className="text-sm text-foreground-muted mb-8 max-w-3xl leading-relaxed">{referenceText(d.s14V21Desc)}</p>

            <h4 className="text-sm font-semibold mb-3">{d.s14ParamsTitle}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-semibold">{pickCopy({ en: "Parameter", fi: "Parametri", ja: "パラメータ", fr: "Paramètre", ko: "매개변수" }, locale)}</th>
                    <th className="text-left py-2 px-2 font-semibold">Amish</th>
                    <th className="text-left py-2 px-2 font-semibold">{pickCopy({ en: "Finland", fi: "Suomi", ja: "フィンランド", fr: "Finlande", ko: "핀란드" }, locale)}</th>
                    <th className="text-left py-2 px-2 font-semibold">Nigeria</th>
                    <th className="text-left py-2 px-2 font-semibold">{pickCopy({ en: "Interpretation", fi: "Tulkinta", ja: "解釈", fr: "Interprétation", ko: "해석" }, locale)}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.s14Params.map((row: { param: string; amish: string; finland: string; nigeria: string; desc: string }) => (
                    <tr key={row.param} className="border-b border-border/50">
                      <td className="py-2 px-2 font-mono font-medium">{row.param}</td>
                      <td className="py-2 px-2 font-mono text-green-500">{row.amish}</td>
                      <td className="py-2 px-2 font-mono text-amber-500">{row.finland}</td>
                      <td className="py-2 px-2 font-mono text-foreground-muted">{row.nigeria}</td>
                      <td className="py-2 px-2 text-foreground-muted">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">{d.s14Evolution}</p>
            <div className="mt-4 p-3 rounded border border-status-partial/40 bg-status-partial/5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.s14Level}
              </p>
            </div>
          </section>

          {/* S15 Recovery Function */}
          <section id="recovery-function" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§15"}</span>
              {d.s15Title}
            </h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {referenceText(d.s15Text)}
            </p>

            <div className="text-center my-4">
              <MathBlock tex="\text{DNA\_damage}(t) = \text{DNA\_damage}(0) \times e^{-t/\tau}, \quad \tau \approx 3\text{–}4\;\text{hours}" />
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-2 font-semibold">{d.s15TableTime}</th>
                    <th className="text-right py-2 px-2 font-semibold">{d.s15TableDamage}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  <tr className="border-b border-card-border/50">
                    <td className="py-2 px-2 font-mono">t = 0h</td>
                    <td className="text-right py-2 px-2 font-mono">100%</td>
                  </tr>
                  <tr className="border-b border-card-border/50">
                    <td className="py-2 px-2 font-mono">t = 4h</td>
                    <td className="text-right py-2 px-2 font-mono">~37%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-mono">t = 9h</td>
                    <td className="text-right py-2 px-2 font-mono">~0% ({pickCopy({ en: "recovered", fi: "palautunut", ja: "回復済み", fr: "récupéré", ko: "회복됨" }, locale)})</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-sm font-semibold mb-3">{pickCopy({ en: "Practical scenarios", fi: "Käytännön skenaariot", ja: "実践的シナリオ", fr: "Scénarios pratiques", ko: "실제 시나리오" }, locale)}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-2 font-semibold">{d.s15TableScenario}</th>
                    <th className="text-left py-2 px-2 font-semibold">{d.s15TableFreeTime}</th>
                    <th className="text-right py-2 px-2 font-semibold">{d.s15TableRemaining}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  <tr className="border-b border-card-border/50">
                    <td className="py-2 px-2">{pickCopy({ en: "Modern bedroom (WiFi + phone)", fi: "Moderni makuuhuone (WiFi + puhelin)", ja: "モダンな寝室（WiFi＋スマホ）", fr: "Chambre moderne (WiFi + téléphone)", ko: "현대 침실 (WiFi + 휴대폰)" }, locale)}</td>
                    <td className="py-2 px-2 font-mono">{"t ≈ 0"}</td>
                    <td className="text-right py-2 px-2 font-mono">{pickCopy({ en: "damage persists", fi: "vaurio jatkuu", ja: "損傷が持続", fr: "dommage persistant", ko: "손상 지속" }, locale)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">{pickCopy({ en: "EMF-free bedroom", fi: "EMF-vapaa makuuhuone", ja: "EMFフリー寝室", fr: "Chambre sans EMF", ko: "EMF 없는 침실" }, locale)}</td>
                    <td className="py-2 px-2 font-mono">{"t ≈ 8h"}</td>
                    <td className="text-right py-2 px-2 font-mono">~14% {pickCopy({ en: "remaining", fi: "jäljellä", ja: "残存", fr: "restant", ko: "잔존" }, locale)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recovery Scenarios Bar Chart */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox="0 0 600 220" className="w-full min-w-[600px] max-w-[600px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                <text x="300" y="14" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500" opacity="0.6">
                  {pickCopy({ en: "Historical exposure and recovery", fi: "Historiallinen altistus ja palautuminen", ja: "歴史的曝露と回復", fr: "Exposition historique et récupération", ko: "역사적 노출과 회복" }, locale)}
                </text>
                <rect x="160" y="22" width="10" height="10" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <text x="174" y="31" fill="currentColor" fontSize="8" opacity="0.6">
                  {pickCopy({ en: "Exposure (h/day)", fi: "Altistus (h/vrk)", ja: "曝露（時間/日）", fr: "Exposition (h/jour)", ko: "노출 (시간/일)" }, locale)}
                </text>
                <rect x="310" y="22" width="10" height="10" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="324" y="31" fill="currentColor" fontSize="8" opacity="0.6">
                  {pickCopy({ en: "Recovery (%)", fi: "Palautuminen (%)", ja: "回復（%）", fr: "Récupération (%)", ko: "회복 (%)" }, locale)}
                </text>
                <line x1="65" y1="40" x2="65" y2="175" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="65" y1="40" x2="545" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <line x1="65" y1="107" x2="545" y2="107" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <line x1="65" y1="175" x2="545" y2="175" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <rect x="72" y="169" width="28" height="6" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <rect x="104" y="45" width="28" height="130" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="72" y="166" fill="#3b82f6" fontSize="7" opacity="0.8">1h</text>
                <text x="104" y="42" fill="#10b981" fontSize="7" opacity="0.8">93%</text>
                <text x="100" y="192" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.5">
                  {pickCopy({ en: "Pre-1900", fi: "Ennen 1900", ja: "1900年以前", fr: "Avant 1900", ko: "1900년 이전" }, locale)}
                </text>
                <rect x="168" y="140" width="28" height="35" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <rect x="200" y="53" width="28" height="122" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="168" y="137" fill="#3b82f6" fontSize="7" opacity="0.8">6h</text>
                <text x="200" y="50" fill="#10b981" fontSize="7" opacity="0.8">87%</text>
                <text x="198" y="192" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.5">1950-90</text>
                <rect x="264" y="82" width="28" height="93" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <rect x="296" y="91" width="28" height="84" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="264" y="79" fill="#3b82f6" fontSize="7" opacity="0.8">16h</text>
                <text x="296" y="88" fill="#10b981" fontSize="7" opacity="0.8">60%</text>
                <text x="294" y="192" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.5">1990-2010</text>
                <rect x="360" y="47" width="28" height="128" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <rect x="392" y="146" width="28" height="29" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="360" y="44" fill="#3b82f6" fontSize="7" opacity="0.8">22h</text>
                <text x="392" y="143" fill="#10b981" fontSize="7" opacity="0.8">21%</text>
                <text x="390" y="192" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.5">2010-20</text>
                <rect x="456" y="169" width="28" height="6" rx="2" fill="#3b82f6" fillOpacity="0.7" />
                <rect x="488" y="45" width="28" height="130" rx="2" fill="#10b981" fillOpacity="0.7" />
                <text x="456" y="166" fill="#3b82f6" fontSize="7" opacity="0.8">1h</text>
                <text x="488" y="42" fill="#10b981" fontSize="7" opacity="0.8">93%</text>
                <text x="486" y="192" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.5">
                  {pickCopy({ en: "Amish", fi: "Amissit", ja: "アーミッシュ", fr: "Amish", ko: "아미시" }, locale)}
                </text>
                <text x="60" y="178" textAnchor="end" fill="currentColor" fontSize="7" opacity="0.4">0</text>
                <text x="60" y="110" textAnchor="end" fill="currentColor" fontSize="7" opacity="0.4">50%</text>
                <text x="60" y="44" textAnchor="end" fill="currentColor" fontSize="7" opacity="0.4">100%</text>
              </svg>
            </div>

            <div className="text-center my-4">
              <MathBlock tex="R = 1 + \beta \times \text{EMF\_free\_hours}, \quad \beta \approx 0.11 \;\text{(Ivancsits)}" />
            </div>
          </section>
    </div>
  );
}

export const mathSectionIds = {
  en: t.en.sections,
  fi: t.fi.sections,
  ja: t.ja.sections,
  fr: t.fr.sections,
  ko: t.ko.sections,
};

export default async function MathematicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto overflow-x-clip px-6 py-16">
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
