import type { Metadata } from "next";
import { pickCopy } from "@/lib/i18n";
import Link from "next/link";
import BermCausalDiagram from "@/components/BermCausalDiagram";
import { ModelTableOfContents } from "@/components/ModelTableOfContents";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";
import { ModulomeLayers } from "@/components/ModulomeLayers";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { RESPONSE_MODIFIER_SCALES } from "@/lib/evolutionData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { VGCCGeneFamilyDiagram } from "@/components/VGCCGeneFamilyDiagram";
import { ThresholdChart } from "@/components/ThresholdChart";
import { ThreeBiologicalBands } from "@/components/ThreeBiologicalBands";
import { TwoSusceptibilities } from "@/components/TwoSusceptibilities";
import { SixFactorSummary } from "@/components/SixFactorSummary";
import { CaMKIIConvergenceDiagram } from "@/components/CaMKIIConvergenceDiagram";
import { CitationLink } from "@/components/CitationLink";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ClaimRef } from "@/components/ClaimRef";

const t = {
  en: {
    title: "Model Documentation",
    subtitle:
      "Full documentation of the Bio-Electromagnetic Reproductive Model (BERM), including the three-level architecture, causal pathways, coupling equations, and recovery dynamics.",
    metaTitle: "Model Documentation - Extinction Field",
    metaDesc:
      "BERM model documentation: three-level architecture, causal pathways, equations, and recovery dynamics.",
    specNote: "BERM is the explanatory, derivational and prediction model. FieldState v2 is a separate optional measurement, observation and estimation module — not a model alias or causal root. The locked v17 outputs use a national technology-timing proxy and are not FieldState-calibrated. BERM now derives a conditional formal geometry-to-observable operator; its gauge, scale, tissue kernels and endpoint calibration remain open.",

    physBioTitle: "From Physics to Biology",
    physBioSub: "Lindgren premise, derived geometry, conditional BERM response and open tissue calibration",
    physBioLead: "The 2025 Lindgren ansatz is BERM's theoretical premise. BERM conditionally derives the formal response operator by adding minimal matter–metric coupling and response theory. Lindgren does not supply the gauge prescription, scale, tissue kernels, SHBG/AR/ZIP9 coefficients or human endpoint calibration; those remain explicit model questions.",
    physBioGMETitle: "Lindgren Geometric Metric Extension",
    physBioGMEDesc: "In standard physics, the electromagnetic field is a separate entity that propagates through spacetime. In Lindgren's geometric model, the EM field is encoded directly in the metric tensor:",
    physBioGMEFormula: "g_μν = η_μν + κ A_μ A_ν",
    physBioGMEExplain: "where η_μν is the flat Minkowski metric, A_μ is the electromagnetic four-potential and κ is an explicit dimensional coupling scale. From this premise BERM derives δg exactly. A tissue response follows only conditionally through a named response kernel; downstream biology is not an automatic consequence of the metric.",
    physBioChiTitle: "The derived χ_geo coordinate",
    physBioChiDesc: "For an explicitly normalized positive-norm mode, χ_geo(ρ)=ρ/√(1+ρ²) is the square-root amplitude of the rank-one inverse-metric correction. That geometric coordinate is derived; interpreting it as a tissue susceptibility or using it to weight the archived v17 technology proxy remains uncalibrated BERM modelling.",
    physBioChiFormula: "ρ² = κ A² ≥ 0,    χ_geo(ρ) = ρ / √(1 + ρ²)",
    physBioChiExplain: "The coordinate supplies no universal biological selection rule. CRY background, membrane voltage, barrier integrity and technology diffusion remain separate variables with separately testable response functions; the similarly shaped v17 proxy weight is retained only as a legacy comparison.",
    physBioSuperTitle: "Quadratic mixing before biology",
    physBioSuperDesc: "Electromagnetic fields still obey ordinary superposition. Because the Lindgren ansatz is quadratic in the potential, the induced metric drive contains exact background–perturbation cross terms and a self-term. This establishes mixing in model geometry, not a non-additive biological effect.",
    physBioSuperFormula: "δg_μν = κ(Ā_μa_ν + a_μĀ_ν + a_μa_ν)",
    physBioSuperExplain: "Amplitude modulation and two-tone inputs therefore generate exact low-frequency envelope or difference-frequency terms in a². Whether a tissue detects them, and whether its endpoint response is additive, depends on the uncalibrated response kernel. Combined-exposure studies ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]) motivate that experiment but do not calibrate the operator.",
    physBioSuperLink: "See full superposition analysis →",
    physBioTissueTitle: "Tissue-specific resonance",
    physBioTissueDesc: "BERM imports tissue-specific ion-channel composition, membrane properties and candidate response windows to propose heterogeneous susceptibility. These belong in the tissue kernel Ξ_i and require calibration; they do not follow from χ_geo alone:",
    physBioTissues: [
      { tissue: "Testes (Leydig cells)", channels: "Cav3.2 (T-type), high density", chi: "Very high", reason: "Window current at rest; StAR protein Ca²⁺-dependent" },
      { tissue: "Hypothalamus", channels: "Cav3.1, Cav3.3", chi: "Very high", reason: "Synaptic vesicle release via synaptotagmin 1" },
      { tissue: "Hippocampus", channels: "Cav3.2, Cav1.3", chi: "High", reason: "LTP/LTD Ca²⁺-dependent; neurogenesis zone" },
      { tissue: "Retina (blue cones)", channels: "CRY1/CRY2 + TRPC1", chi: "High (light-dependent)", reason: "Radical pair magnetoreception; FAD-dependent" },
      { tissue: "SA node (heart)", channels: "Cav1.3, Cav3.1", chi: "Moderate-high", reason: "Pacemaker current; low-threshold activation" },
      { tissue: "Skeletal muscle", channels: "Cav1.2 (L-type)", chi: "Low at rest", reason: "High activation threshold (−30 mV); significant only during action potentials" },
    ],
    physBioVerifyTitle: "External-consistency observations",
    physBioVerifySub: "Four evidence lines motivate background-dependent tests; none calibrates χ_geo as tissue susceptibility",
    physBioVerifications: [
      { id: "V1", title: "Geomagnetic mortality (263 cities)", desc: "Reported cardiovascular-mortality associations with geomagnetic storm intensity motivate a lagged background × endpoint test. They do not identify χ_geo as the biological mediator or calibrate its tissue kernel ([[ref:vencloviene2022_geomag_mortality|Venclovienė et al. 2022]]).", level: "C" },
      { id: "V2", title: "Latitude × CVD (204 countries)", desc: "Geographic variation in cardiovascular disease can motivate a pre-specified geomagnetic interaction test, but latitude has many competing pathways and cannot by itself identify a BERM response coefficient ([[ref:feigin2014_latitude_cvd|Feigin et al. 2014]]).", level: "C" },
      { id: "V3", title: "HRV × Kp-index", desc: "Reported HRV–Kp covariation supplies a candidate autonomic endpoint for matched field and physiology measurements. It is consistency evidence, not a derivation of χ_geo-mediated tissue coupling ([[ref:mccrary2021_hrv_geomag|McCrary et al. 2021]]).", level: "C" },
      { id: "V4", title: "Combined exposures (172 studies)", desc: "A systematic review of combined exposures motivates tests of interaction and waveform dependence. Heterogeneous biological non-additivity does not directly confirm the specific Lindgren quadratic term or the BERM tissue kernel ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]).", level: "M" },
    ],

    solarBioTitle: "The Solar-Biological Connection",
    solarBioSub: "Solar-cycle observations as candidate tests of a geomagnetic response kernel",
    solarBioLead: "If a calibrated tissue kernel depends on geomagnetic background, solar activity could generate measurable biological oscillations. The observations below motivate that hypothesis; they do not identify χ_geo as the biological response or establish causality.",
    solarBioCycleTitle: "Solar cycle → birth rate cyclicity",
    solarBioCycleDesc: "Reported birth-rate oscillations in the USA and New Zealand have been compared with the 11-year solar cycle. In BERM this is a candidate natural-experiment signature, not evidence that χ_geo rises or that conception changes through the proposed tissue kernel ([[ref:lehrer2017_solar_births|Lehrer & Lehrer 2017]]).",
    solarBioCycleNote: "BERM proposes the testable chain solar activity → geomagnetic disturbance → melatonin change → GnRH-pulse change → conception-rate modulation. A lagged design with photoperiod and secular controls could test this chain; the cycle alone does not separate geomagnetic effects from other periodic covariates.",
    solarBioBirthTitle: "Birth timing → disease risk",
    solarBioBirthDesc: "A cohort of 237,000 patients found birth-month associations with several later diagnoses ([[ref:boland2015_birth_month|Boland et al. 2015]]). This does not identify geomagnetic exposure or χ_geo; BERM treats it only as motivation for a study that measures gestational field, season, infection, nutrition and pollution separately.",
    solarBioBirthNote: "Developmental timing is a plausible susceptibility window, but a geomagnetic → VGCC/CRY → organogenesis path remains an uncalibrated BERM proposition rather than a result of the birth-month study.",
    solarBioDampenTitle: "Seasonal amplitude dampening",
    solarBioDampenDesc: "The seasonal amplitude of Greek birth rates reportedly decreased between 1960 and 1992 ([[ref:lerchl1998_birth_seasonality|Lerchl 1998]]). Electrification is one BERM candidate explanation among urbanization, contraception, climate control and social timing; the observation does not measure an EMF or χ response.",
    solarBioDampenNote: "Discriminating prediction: after controlling those alternatives, later electrification should predict later dampening. This is a prospective model test, not a description of current sub-Saharan populations.",

    threeBandsTitle: "Three Biological Frequency Bands",
    threeBandsSub: "ULF · ELF · RF — natural and anthropogenic sources mapped to BERM pathways",
    threeBandsLead: "Biological systems interact with electromagnetic fields across three distinct frequency bands, each with different physical mechanisms and biological targets.",
    twoSuscTitle: "Geometry coordinate and biological response candidates",
    twoSuscSub: "χ_geo geometry + χ_B spin-chemical candidate",
    twoSuscLead: "BERM separates the derived χ_geo coordinate from candidate biological response functions. They cannot be multiplied or interpreted as total susceptibility until an endpoint-specific response kernel is measured.",

    bioCivTitle: "From Biology to Civilization",
    bioCivSub: "A 10-step causal chain from molecular EMF effects to civilizational consequences",
    bioCivLead: "BERM applies a biologically reductionist, compositional hypothesis from molecular and endocrine states through individual behaviour to population aggregates. The chain below states the proposed propagation from physical input to civilizational outcome. Evidence for separate links can constrain it, but the full multiscale chain is not empirically closed and aggregate political outcomes are not read back as individual hormone measurements.",
    bioCivChain: [
      { step: 0, title: "Measured background", desc: "Geomagnetic and anthropogenic fields are measured as physical inputs. BERM then applies an endpoint-specific response kernel; FieldState does not supply that biological response." },
      { step: 1, title: "EMF perturbation", desc: "Anthropogenic fields (ELF, IF, RF) perturb the geometric background, altering the spacetime metric biology operates within" },
      { step: 2, title: "VGCC activation", desc: "Voltage-gated calcium channels — especially T-type (Cav3) at bifurcation point — respond to field perturbation via Schwan amplification" },
      { step: 3, title: "Ca²⁺ cascade", desc: "Intracellular calcium signaling disrupted: CaMKII activation, mitochondrial ROS, NF-κB inflammatory pathway" },
      { step: 4, title: "Hormone disruption", desc: "Testosterone, estrogen, melatonin, oxytocin, cortisol, and BDNF affected through Ca²⁺-dependent steroidogenic and neuroendocrine pathways" },
      { step: 5, title: "Individual behavior", desc: "Risk tolerance, social bonding, sleep architecture, cognition, and motivation shift as neuroendocrine substrates change" },
      { step: 6, title: "Family formation", desc: "Both fertility desire (behavioral) and biological capacity (physiological) decline — the two-level collapse" },
      { step: 7, title: "Institutional capacity", desc: "Collective action, strategic planning, and institutional assertiveness weaken as the population’s hormonal and cognitive substrate degrades" },
      { step: 8, title: "Civilizational dynamics", desc: "The behavioral aggregate produces the patterns historians observe: stagnation, risk-aversion, institutional sclerosis" },
      { step: 9, title: "Migration gradient", desc: "Biological contrast between EM-depleted and EM-intact populations creates demographic pressure gradients" },
      { step: 10, title: "Cycle or convergence", desc: "Recovery if EM burden lifts (the α term), or permanent convergence as anthropogenic saturation (σ) masks the solar recovery window" },
    ],
    bioCivFormulaTitle: "BioCap integral",
    bioCivFormulaDesc: "The cumulative biological capacity of a population is formalized as the BioCap integral — a running balance between depletion (first integral) and recovery (second integral):",
    bioCivFormula: "BioCap_cand(t,λ) = BioCap₀ − ∫₀ᵗ m_lat^cand(λ)·[S(τ)+U(τ)+E(τ)]dτ + recovery",
    bioCivFormulaTerms: [
      { symbol: "S(τ)", desc: "Normalized solar activity (drives natural geomagnetic perturbation)" },
      { symbol: "U(τ)", desc: "Urbanization-weighted EMF exposure (population density × infrastructure)" },
      { symbol: "E(τ)", desc: "Electrification-weighted exposure (grid density × per-capita consumption)" },
      { symbol: "m_lat^cand(λ)", desc: "Candidate latitude moderator inside BERM; it is neither χ_geo nor a calibrated biological coefficient" },
      { symbol: "α", desc: "Recovery coefficient (biological repair rate when EM burden decreases)" },
      { symbol: "σ(τ)", desc: "Anthropogenic EM saturation — masks the solar recovery window post-1880" },
    ],
    bioCivEpistemic: "This is BERM's reductionist causal hypothesis. The L2 entry-operator form is conditionally derived, while its tissue kernel and several cross-scale aggregation links remain open. Steps 5–10 are model consequences to test, not hormone assays inferred from political behaviour. The BioCap integral is a formal expression, not a fitted equation with validated coefficients.",

    biocapDecompTitle: "BioCap Decomposition",
    biocapDecompDesc: "BioCap decomposes into eight measurable biomarkers. Each biomarker has a weight reflecting its relative contribution to civilizational capacity. The decomposition enables both measurement and prediction.",
    biocapDecompFormula: "BioCap(t) = Σᵢ wᵢ · Bᵢ(t)",
    biocapDecompFormulaDesc: "where Bᵢ(t) = normalized level of biomarker i at time t, wᵢ = biomarker weight",
    biocapDecompCultural: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)",
    biocapDecompCulturalDesc: "where N(t) = population, η(t) = institutional efficiency",
    biocapDecompMarkers: [
      { symbol: "T", name: "Testosterone", weight: "+0.20", unit: "ng/dL", baseline: "600", current: "440", mechanism: "EMF → VGCC → Ca²⁺ → StAR↓ → T↓", evidence: "E (>1M)" },
      { symbol: "OXT", name: "Oxytocin", weight: "+0.20", unit: "pg/mL", baseline: "—", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → hypothalamic OXT↓", evidence: "M|C (proxy)" },
      { symbol: "DA", name: "Dopamine sens.", weight: "+0.15", unit: "D2R arb.", baseline: "1.0", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → DA synthesis↓ → D2R↓", evidence: "M|C (proxy)" },
      { symbol: "MEL", name: "Melatonin", weight: "+0.15", unit: "pg/mL", baseline: "80", current: "35", mechanism: "EMF → CRY/VGCC → SCN → mel↓ + PGC", evidence: "M|C" },
      { symbol: "BDNF", name: "BDNF", weight: "+0.10", unit: "ng/mL", baseline: "—", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → CREB↓ → BDNF↓", evidence: "M|C (proxy)" },
      { symbol: "CORT", name: "Cortisol", weight: "−0.10", unit: "μg/dL", baseline: "12", current: "16", mechanism: "EMF → mel↓ → sleep↓ → HPA → CORT↑", evidence: "M|C" },
      { symbol: "D", name: "Vitamin D", weight: "+0.05", unit: "nmol/L", baseline: "70", current: "50", mechanism: "D↓ → VDR → VGCC↑ → EMF sensitivity↑", evidence: "E (7.9M)" },
      { symbol: "B2", name: "B2/FAD", weight: "+0.05", unit: "nmol/L", baseline: "—", current: "—", mechanism: "B2 → FAD → CRY stability + mito complex I/II", evidence: "M|C" },
    ],

    hormesisTitle: "Hormetic dose-response extension",
    hormesisDesc: "The recovery term α in the BioCap integral assumes a constant repair rate. The hormetic extension replaces α with a dose-dependent function h(Ā, δA) that captures three distinct biological zones:",
    hormesisFormula: "h(Ā, δA) = { +α·δA  if Ā < Ā_crit (Zone 1: stimulation); α·δA·e^(−β·(Ā−Ā_crit))  if Ā_crit ≤ Ā ≤ Ā_sat (Zone 2: transition); −γ·Ā  if Ā > Ā_sat (Zone 3: damage only) }",
    hormesisTerms: [
      { symbol: "Ā", desc: "Mean cumulative EM exposure (integrated over population lifetime)" },
      { symbol: "δA", desc: "Exposure variability (amplitude of fluctuation around mean)" },
      { symbol: "Ā_crit", desc: "Critical threshold — below this, low-dose stress activates repair systems" },
      { symbol: "Ā_sat", desc: "Saturation threshold — above this, repair systems are overwhelmed" },
      { symbol: "α", desc: "Hormetic stimulation coefficient (biological repair activation rate)" },
      { symbol: "β", desc: "Transition decay rate (how rapidly stimulation fades above Ā_crit)" },
      { symbol: "γ", desc: "Damage coefficient (net biological depletion rate at high exposure)" },
    ],
    hormesisZone1: "Zone 1 (Stimulation): Low EM exposure activates DNA repair, mitochondrial biogenesis, immune enhancement, and hormonal optimization. Populations in this zone maintain high biological capacity.",
    hormesisZone2: "Zone 2 (Transition): Repair systems still function but with exponentially declining efficiency. The population shows mixed biomarkers — some activation, some suppression.",
    hormesisZone3: "Zone 3 (Damage): Repair systems are overwhelmed. Net biological depletion dominates. This is the zone most industrialized populations occupy post-electrification.",
    hormesisEpistemic: "",

    archTitle: "Three-level architecture",
    archDesc:
      "BERM separates fertility decline into three distinct causal layers. Each level has its own dynamics, timescale, and evidence basis. The total fertility rate (TFR) for a country is the product of all three levels, not the sum -- each acts as a multiplier on the others.",
    archPredictionSource:
      "The locked country predictions on this site come from the v17 scalar model. The FieldState v2 side branch (/measurement/fieldstate) is an optional measurement and estimation protocol: it defines which field quantities are recorded and how, and it produces no country forecasts.",
    level1Label: "Level 1",
    level1Title: "Biological capacity",
    level1Desc:
      "The physiological maximum fertility given current environmental exposures. Includes sperm quality (concentration, motility, DNA fragmentation), oocyte quality, hormonal milieu, and BBB integrity. This is the level most directly affected by EMF exposure.",
    level2Label: "Level 2",
    level2Title: "EMF-behavioral coupling",
    level2Desc:
      "How personal device use interacts with ambient EMF exposure. A person in a high-ambient environment who also carries a phone experiences a non-linear coupling effect. This level captures the interaction between infrastructure-level and personal-level exposure.",
    level3Label: "Level 3",
    level3Title: "True culture",
    level3Desc:
      "Voluntary fertility choices independent of biological capacity. Education, urbanization, contraceptive access, economic opportunity, and cultural norms. This component exists in all demographic models; BERM adds the biological and EMF layers underneath it.",

    causalTitle: "Causal pathway diagram",
    causalDesc:
      "The diagram separates Lindgren's derived metric drive from FieldState observations and the legacy technology proxy. All enter BERM's conditional L2 response operator through typed edges. Tissue kernels and endpoint coefficients remain open; downstream biology is not presented as a Lindgren-derived result.",
    pathwayHierarchyNote:
      "Legacy pathway weights and community contrasts belong to model calibration, not to a theoretical ranking. RPM comparisons, Schwan membrane estimates and Cav3/HPG evidence may constrain tissue kernels but do not set their values. BERM therefore keeps RPM/CRY, VGCC/ROS, HPA/HPG and androgen-use branches parallel and falsifiable.",
    rpmFrequencyNote:
      "CRY/RPM does not respond to the RF carrier frequency (900 MHz – 3.5 GHz). Its resonance ceiling is ~22.5 MHz ([[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]], Front. Quantum Sci. Technol. 4:1544473). The biologically active components for Pathway B are the geomagnetic background (B_DC) and ELF modulation envelopes of telecom signals (GSM 217 Hz, WiFi 10 Hz beacon). Effects of the RF carrier itself are mediated by Pathway A through the electric field component. The two pathways have complementary frequency domains.",
    vgccHierarchyTitle: "VGCC sensitivity hierarchy at resting potential",
    vgccHierarchyNote:
      "Not all voltage-gated calcium channels are equally EMF-sensitive. At resting membrane potential (~−70 mV), EMF sensitivity follows the hierarchy: Cav3 (T-type) >> Cav1.3 >> Cav1.2. T-type channels (Cav3.1, Cav3.2, Cav3.3) operate at a bifurcation point where ~10% are open at rest (window current), making them continuously sensitive to small voltage perturbations. Cav1.3 is a 'low-threshold L-type' that activates at ~−50 mV — 25 mV more negative than Cav1.2 (J Neurosci 2001). This makes Cav1.3 the primary channel in tissues requiring sustained low-voltage calcium entry: SA node pacemaking and inner hair cell synaptic transmission. Cav1.2, the canonical L-type, activates at ~−30 mV and is significant ONLY during action potentials — at rest it contributes negligibly. This hierarchy explains tissue-specific EMF vulnerability: organs dominated by Cav3 (testes, pituitary, adrenal, hippocampus) are most affected; Cav1.3-dependent tissues (inner ear, SA node) are intermediate; Cav1.2-dominated tissues (skeletal muscle, cardiac ventricle) are affected only during electrical activity.",
    camkiiTitle: "CaMKII positive feedback: cumulative sensitization",
    camkiiNote:
      "A critical finding for BERM's cumulative exposure model: CaMKII (calcium/calmodulin-dependent protein kinase II) phosphorylation shifts the Cav3.2 activation threshold to MORE NEGATIVE potentials (PMC9913649). This creates a positive feedback loop: EMF → Cav3.2 Ca²⁺ influx → CaMKII activation → Cav3.2 threshold shifts left → channel becomes MORE sensitive to EMF → more Ca²⁺ influx. This molecular mechanism explains why EMF effects are cumulative over time: each exposure episode makes the system more sensitive to subsequent exposures. The CaMKII feedback also explains why short-term studies may underestimate long-term effects — the sensitization develops over weeks to months of chronic exposure. Pharmacological prediction: CaMKII inhibitors (KN-93) should block the progressive sensitization without affecting acute EMF responses.",

    chiSub: "Saturation curve for ambient × personal exposure interaction",
    chiTitle: "Derived χ_geo coordinate and the v17 legacy proxy",
    chiDesc:
      "The bounded χ_geo shape follows from the rank-one inverse metric once amplitude is made dimensionless and a positive-norm mode is selected. V17 uses that same shape in ambient + χ(ambient) × personal as a technology-timing proxy weight; this use is neither a tissue response nor a FieldState measurement.",
    chiExplain:
      "is the legacy normalized ambient technology proxy. The function approaches 1 asymptotically by construction. This does not establish that a personal device's biological marginal effect diminishes in the same way.",
    chiWherePrefix: "Where",

    chiFiveTitle: "Candidate background moderators at five scales",
    chiFiveSub: "Analogies to test separately — not instances of χ_geo",
    chiFiveDesc: "BERM registers five places where a background state may moderate a perturbation. They are separate candidate m-functions, not χ_geo and not one universal function derived from Lindgren geometry or FieldState.",
    chiFiveColScale: "Scale",
    chiFiveColBg: "Background (B)",
    chiFiveColPerturb: "Perturbation",
    chiFiveColExpr: "Candidate function",
    chiFiveColVerify: "Verification",
    chiFiveColLevel: "Level",
    chiFiveLink: "See full analysis →",

    chiEvidenceTitle: "Candidate moderation across evidence families",
    chiEvidenceSub: "Six domain-specific hypotheses requiring separate kernels",
    chiEvidenceDesc: "These evidence families motivate specific interaction tests. Their moderators are not evidence for a shared χ_geo tissue law; each needs its own exposure measure, endpoint, sign and calibration.",
    chiEvidenceFamilies: [
      { referenceId: "sakurai2008", family: "Diabetes (β-cells)", chi: "m_glucose: K_ATP → V_mem → VGCC candidate", mechanism: "Glucose state can alter membrane potential and therefore motivates an exposure × glucose interaction test. The BERM gain is uncalibrated.", prediction: "Test whether measured exposure and glucose state interact on insulin secretion, with prespecified controls.", verification: "Sakurai 2008 supplies a study-specific ELF/insulin endpoint, not a human risk coefficient", level: "M|C" },
      { referenceId: "yu2019_btb", family: "Sperm quality (BTB)", chi: "Candidate barrier-transfer moderator", mechanism: "BERM proposes: altered BTB integrity → changed target-cell exposure → possible feedback. The tissue-kernel gain is uncalibrated.", prediction: "If the feedback is real, sperm-quality change should accelerate with measured barrier loss.", verification: "Yu 2019 reports time-dependent 4G-RF-associated BTB disruption; it does not calibrate χ_geo", level: "E" },
      { referenceId: "ulusoy2025_bbb_enos", family: "Barriers (BBB + BTB)", chi: "m_barrier: candidate permeability moderator", mechanism: "Measured barrier integrity may modify target-cell exposure; multiplicative gain is a BERM hypothesis, not an established law.", prediction: "Test exposure × measured barrier integrity against a prespecified additive model.", verification: "Ulusoy 2025 motivates a time-resolved barrier endpoint", level: "E" },
      { family: "Sentinel species", chi: "m_metabolic: candidate allometric moderator", mechanism: "Mass-specific metabolism and baseline oxidative state motivate a cross-species interaction model; they do not establish a universal scaling coefficient.", prediction: "Estimate species-specific slopes before testing an allometric meta-model.", verification: "Requires harmonized exposure and endpoint data across species", level: "M|C" },
      { family: "Aquatic axis (CatSper conservation)", chi: "m_aquatic: candidate ELF/CatSper comparison", mechanism: "CatSper conservation and aquatic electromagnetic sensing motivate targeted studies, but neither shows that cable fields activate CatSper at environmental levels.", prediction: "Measure field spectra, gonadal dose and reproductive endpoints near matched cable/control sites.", verification: "Conservation and sensory evidence constrain plausibility, not environmental activation threshold", level: "L*" },
      { family: "Cardiac (CRY2-TRPC1)", chi: "m_CRY: candidate light/FAD state", mechanism: "A cardiomyocyte CRY2–TRPC1 route is a BERM extrapolation from other cell systems ([[ref:yap2025|Yap 2025]]).", prediction: "Test exposure × light/FAD state on prespecified cardiac calcium endpoints.", verification: "Cardiomyocyte-specific EM interaction remains untested", level: "L*" },
      { referenceIds: ["blackman1985", "blackman1990", "blackman1991"], family: "Adey-Blackman window", chi: "m_photo × m_temp × m_DC candidates", mechanism: "Photocycle, temperature and DC orientation are separate candidate moderators, not a shared χ law.", prediction: "A factorial replication can estimate each interaction and their joint term.", verification: "Blackman studies motivate factor-specific replication", level: "M" },
    ],

    dualSuscTitle: "Two Independent Susceptibilities",
    dualSuscDesc: "χ_geo is a derived coordinate of the normalized rank-one geometry, not a VGCC susceptibility function. BERM separately proposes VGCC and cryptochrome/radical-pair response channels whose kernels, thresholds and interaction are endpoint-specific and uncalibrated. Low-exposure populations, pre-industrial series and solar-cycle panels can test these propositions but do not isolate either channel by themselves.",
    dualSuscLabelType: "Type",
    dualSuscLabelChannel: "Channel",
    dualSuscLabelThreshold: "Threshold",
    dualSuscLabelTests: "Tests via",
    dualSuscLabelPathways: "Pathways",
    dualSuscLeft: {
      title: "VGCC candidate kernel",
      type: "Geometric",
      channel: "Ca²⁺ channel (VGCC)",
      threshold: "REQUIRES electrification threshold (Ā > 0)",
      tests: "Amish (Ā≈0), community gradient, country gradient",
      pathways: "A (ROS), C (BBB), D (HPA)",
    },
    dualSuscRight: {
      title: "CRY/RPM candidate kernel",
      type: "Spin-chemical",
      channel: "Radical pair mechanism",
      threshold: "NO electrification threshold (operates always)",
      tests: "Solar cycle, pre-industrial data, sentinel species, SAMA anomaly",
      pathways: "B (CRY/RPM)",
    },

    phyloTitle: "Phylogenetic Pathway Hierarchy",
    phyloDesc: "The operational weights (A=45%, B=25%, C=15%, D=15%) reflect current epidemiological evidence strength. But from a phylogenetic perspective, the hierarchy inverts: CRY/RPM (Pathway B) is the ancestral electromagnetic sensor, conserved across ALL eukaryotic kingdoms for over 1 billion years. VGCC (Pathway A), though dominant in human epidemiology, is a derived innovation appearing only in Metazoa ~500 Myr ago.",
    phyloColProperty: "",
    phyloColPathwayB: "Pathway B (CRY/RPM)",
    phyloColPathwayA: "Pathway A (VGCC)",
    phyloRows: [
      ["Age", ">1 Gyr", "~500 Myr"],
      ["Kingdom scope", "All eukaryotes", "Metazoa only"],
      ["Plant evidence", "Yes (Ahmad 2020, Xu 2015)", "No"],
      ["Insect evidence", "Yes (Gegear 2008)", "Limited"],
      ["Mammal evidence", "Yes (PMC11817702)", "Yes (extensive)"],
      ["Operational weight", "25% (human TFR)", "45% (human TFR)"],
      ["Phylogenetic rank", "Ancestral", "Derived"],
    ],
    phyloInsight: "This means the current TFR-focused operational weights understate CRY/RPM's evolutionary significance. When we extend from human TFR to ECOSYSTEM-level EMF effects — pollinator decline, bird population crashes, tree masting disruption — Pathway B becomes the dominant mechanism, because it's the only one present in all affected organisms.",
    phyloWarning: "The phylogenetic hierarchy is a theoretical framework. It does NOT change the operational weights used in BERM's TFR predictions. The weights reflect epidemiological evidence strength for human fertility, where VGCC (A=45%) has more direct human evidence than CRY/RPM (B=25%).",
    phyloText: [
      "BERM identifies five biological pathways (A–E) through which EMF affects reproduction. Their operational weights reflect importance for human fertility. But their phylogenetic hierarchy — which is more fundamental and which is derived — is different.",
      "Pathway B (CRY/RPM) is the ancestral mechanism. Present in all eukaryotes: plants, fungi, insects, birds, mammals. Cryptochrome was first discovered in plants (Arabidopsis, 1993). CRY’s reproductive role is best documented in plants — CRY2 → CONSTANS → FLOWERING LOCUS T → flowering induction. Conserved over 1 billion years as a photolyase homolog. Does not require membrane potential. Operates via spin chemistry (radical pair mechanism). RF disruption demonstrated in plants (Ahmad 2020: 7 MHz), insects (Gegear 2008: Drosophila), and mammals (PMC11817702 2025).",
      "Pathway A (VGCC/IFO) is a BERM candidate assembled from imported ion-channel biology and exposure studies. It is animal-specific and relevant to excitable cells, but it is not derived from Lindgren geometry or FieldState. Its human tissue kernel, environmental dose response, sign and gain remain open. Plants have ion channels (TPC1, CNGC) but not S4-helix-based VGCCs.",
      "Together: Pathway B is the evolutionary foundation. Pathway A is the animal-specific amplification layer on top of it. Both operate simultaneously in animals. Only Pathway B operates in plants.",
      "Critical B2/FAD difference — why effect sizes differ between plants and animals: Plants synthesize their own riboflavin (B2), so FAD supply is endogenous and CRY function depends only on RF disruption — Ahmad 2020’s ‘relatively minor’ effect is a pure RPM test. Animals require dietary B2, so FAD supply depends on nutrition and CRY function depends on both RF and B2 status — a double vulnerability: EMF disruption plus nutritional deficiency. This explains why animal effect sizes exceed plant effect sizes: animals have two disruption sources, plants have only one.",
    ] as const,

    twoChSub: "ELF + IF + RF decomposition with 12 technology layers and TCBM",
    twoChTitle: "Three-channel exposure model",
    twoChDesc:
      "Total effective EMF exposure decomposes into three frequency channels — ELF (f < 300 Hz, membrane modulation), IF (300 Hz – 10 MHz, intracellular/mitotic), and RF (> 10 MHz, spin chemistry) — each weighted by its biological mechanism and modulated by the chi coupling.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, where the current diagnostic weights are w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35. These are DIAGNOSTIC weights requiring empirical calibration, not fitted parameters -- the three-channel decomposition is structurally derived from membrane biophysics, but the relative weights are uncertain. In a country with near-zero cellular infrastructure, even heavy personal phone use contributes little total exposure (chi is near zero). Conversely, in a fully saturated environment, the personal component is added almost linearly across all three channels.",
    twoChLayersTitle: "12 technology layers composing the ambient field",
    twoChLayersDesc:
      "The ambient term is not monolithic. It decomposes into 12 independent technology layers, each with its own driver, deployment timeline, and frequency profile. This decomposition improves the model's discriminative power because each layer acts as an orthogonal instrument.",
    ifoVgicNote: "The IFO-VGIC mechanism is supported by a comprehensive review of 131 studies ([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], Bioelectromagnetics): 95% report oxidative effects from RF/Wi-Fi exposure. This consensus, consistent with [[ref:yakymenko2016|Yakymenko et al. 2016]] (93/100), establishes the Ca²⁺ influx → ROS pathway as the most robustly documented non-thermal mechanism.",
    multiPathwayCa2Note: "The Ca²⁺ disruption at Level 4 operates through multiple independent pathways: (1) direct S4 voltage sensor forced oscillation ([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], IFO-VGIC); (2) intracellular calcium store dysregulation via ryanodine receptors (RyR) and SERCA pumps ([[ref:bertagna2025|Bertagna et al. 2025]], Ann NY Acad Sci). Both pharmacological blockade experiments (VGCC blockers for pathway 1; dantrolene for RyR, CPA for SERCA in pathway 2) abrogate EMF effects, confirming mechanism. The multi-pathway nature explains tissue-specific sensitivity: cells with high VGIC density AND large intracellular Ca²⁺ stores (neurons, gonadal cells) are more sensitive than cells with low stores (keratinocytes — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: null results in skin cells). Note: [[ref:bertagna2025|Bertagna 2025]] is ELF (50 Hz), not RF — translation to RF is not direct, but the Ca²⁺ pathway is shared.",
    fiveGReproNote: "The first 5G-frequency-specific testicular data ([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics): 3.5 GHz RF induced testicular and oxidative damage in rats. CoQ10 supplementation ameliorated the damage, demonstrating mechanism reversibility — consistent with BERM's recovery window model where antioxidant capacity determines net daily damage. This extends the oxidative stress evidence base ([[ref:yakymenko2016|Yakymenko 2016]]: 93/100; [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: 95%) to the 5G frequency range.",
    pathwayBQuantNote: "The melatonin suppression pathway is quantitatively supported by a PRISMA systematic review of 55 studies ([[ref:tbahriti2026|Tbahriti et al. 2026]], Sleep Biol Rhythms): 88% of high-quality animal studies report EMF-induced melatonin suppression of 20-50% from baseline. This suppression is biologically significant for GnRH pulsatility but smaller than light-induced suppression (>90%), consistent with BERM's v17_night_fraction() modeling EMF as one component of the nocturnal triple hit (melanopsin + CRY + melatonin), not the sole driver. Methodological note: only 27% of reviewed studies met high standards.",
    pathwayBWeightNote: "Note on pathway B weight: Pathway B's 25% reflects both its circadian function (CRY2 → clock gene transcription → melatonin → HPG) and its recently discovered calcium signaling function (CRY2 → TRPC1 modulation → Ca²⁺ entry; [[ref:yap2025|Yap et al. 2025]], Cells). TRPC1 is a TRP channel, not a voltage-gated calcium channel (VGCC). Pathways A and B are therefore pharmacologically separable: L-type VGCC blockers (nifedipine) block pathway A effects but not CRY2-TRPC1 effects.",
    cryIndividualVariationNote: "Individual variation: CRY sensitivity is modulated by iris pigmentation (blue > green > brown; [[ref:higuchi2007|Higuchi 2007]]), nutritional FAD status ([[ref:hirano2017|Hirano 2017]]), and sex (males > females in acute magnetoreception; [[ref:chae2019|Chae 2019]]). These modulators may explain part of the inter-individual and inter-population variance in pathway B effectiveness. The CRY2-TRPC1 physical complex ([[ref:yap2025|Yap/Sherrard 2025]]) further reveals that pathway B has a second downstream branch: CRY2 modulates TRPC1 (a TRP channel, NOT a VGCC), enabling calcium signaling independently of pathway A. Pathways A and B remain pharmacologically separable — L-type VGCC blockers inhibit A but not CRY2-TRPC1. See the detailed analysis at /evidence/eyes.",
    cryDualSystemNote: "Dual CRY system: Pathway B operates through two distinct cryptochrome systems in the retina. CRY1 (sensory): Full-length CRY1 protein was found exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors in human, bonobo, and gorilla retinas ([[ref:bartolke2025|Bartölke et al. 2025]], FASEB J). This location far from nuclei — in the phototransduction machinery — suggests a sensory function beyond circadian clock regulation. The stacked membrane lamellae of cone outer segments provide the orientational order required for directional magnetoreception (cf. [[ref:majewska2025|Majewska et al. 2025]], ACS Chem Biol: CRY associates with lipid bilayers in ordered manner). This is the system most directly affected by iris pigmentation: blue eyes transmit ~100× more light to blue cones, increasing CRY1 activation. CRY2 (circadian): CRY2 is expressed in retinal ganglion cells, particularly ipRGCs that project to the SCN. CRY2 forms a physical complex with TRPC1 ([[ref:yap2025|Yap et al. 2025]]), linking the circadian pathway to ion channel signaling. Both systems require FAD as their chromophore and are therefore both dependent on riboflavin (B2) status.",
    recoveryWindowNote: "The distinction between acute and chronic exposure is empirically supported: [[ref:koivisto2000|Koivisto et al. (2000)]] observed cognitive facilitation after 30–60 min exposure (compatible with acute Ca²⁺-mediated synaptic enhancement), while [[ref:panagopoulos2025_ifo|Panagopoulos et al. (2025)]] report 95% oxidative stress in studies with chronic or repeated exposure. The recovery window model resolves this apparent contradiction: 30 min + 23.5h recovery → 97% repair (no net damage); 22h exposure + 2h recovery → 21% repair (cumulative damage).",
    lateralizationNote: "The two-channel model's spatial structure is empirically supported by lateralization studies: [[ref:eliyahu2006|Eliyahu et al. (2006)]] and [[ref:luria2009|Luria et al. (2009)]] demonstrated that 890 MHz exposure affects specifically the hemisphere nearest the phone. This confirms that personal-EMF effects are local, not systemic — EMF attenuates with the square of distance — supporting BERM's premise that phone-in-pocket targets testes, phone-at-ear targets hypothalamus.",
    ifChannelTitle: "IF channel: LED lighting as primary source",
    ifChannelDesc:
      "The IF channel (1 kHz – 1 MHz) targets dividing cells through the same frequency–cell size relationship as FDA-approved TTFields cancer therapy. The primary environmental source of IF fields is LED lighting: every LED bulb contains a switch-mode power supply operating at 20–200 kHz with harmonics extending to megahertz. A typical home contains 15–30 such sources; a typical office contains 200–500. Additional IF sources include HVAC variable frequency drives (5–50 kHz), induction cooktops (20–75 kHz), and all switch-mode power supplies (laptop chargers, phone chargers). The mechanism operates via Ion Forced Oscillation (IFO-VGIC), with a biological threshold of 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) — orders of magnitude below measured LED driver emissions.",
    tcbmTitle: "Three-Channel Biological Model (TCBM)",
    tcbmIntro:
      "The BERM cross-sectional diagnostic (v19.1) identifies three independent electromagnetic channels, each with distinct frequency ranges, exposure sources, biological mechanisms, and temporal histories. Note: v19.1 is a diagnostic formula fitted to 54 countries — the prediction model is v17.",
    tcbmElfTitle: "Channel 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Source: power grid, household wiring, appliances, transformers. Mechanism: IFO-VGIC forced ion oscillation ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). History: present since electrification (1880s), stable since ~1970. Proxy: residential electricity consumption (kWh per capita). Always on, 24/7, entire home.",
    tcbmIfTitle: "Channel 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Source: LED drivers (20–300 kHz), SMPS, VFDs, induction cooktops. Mechanism: Cyb5b → Ca²⁺ oscillations ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]), IFO at higher frequencies. History: near-zero before 2009, exponential growth 2009–2019 (EU LED transition). Proxy: LED market share × residential electricity. Pulsed, high dV/dt, regulatory gap ([[ref:ijrb2022_if_review|IJRB 2022]]).",
    tcbmRfTitle: "Channel 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Source: mobile phones, Wi-Fi, Bluetooth, base stations, IoT. Mechanism: RPM/CRY spin chemistry ([[ref:ritz2004|Ritz 2004]]), thermal deposition at high SAR. History: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Proxy: broadband subscriptions per 100, mobile subscriptions. Modulated (data encoding), personal + ambient.",
    tcbmIfMitotic:
      "The IF channel's biological mechanism differs from ELF and RF. While ELF primarily activates ion channels (IFO-VGCC) and RF primarily disrupts radical pair chemistry (RPM/CRY), IF acts through a THIRD pathway: disruption of polar macromolecular structures during cell division (mitotic spindle, tubulin dimers). TTFields research demonstrates that IF fields (100–500 kHz) exert directional forces on polar intracellular elements. This mechanism is frequency-dependent: cancer cells are most affected at 150–200 kHz, while normal cells at ~50 kHz (Nature 2020). LED driver emissions (20–100 kHz) span the normal-cell sensitivity range.",
    tcbmWeightNote:
      "Two weight sets, two purposes: (1) TCBM DIAGNOSTIC weights (w_ELF 0.05, w_IF 0.60, w_RF 0.35) are theoretical estimates derived from mechanism plausibility — how much biological damage each channel could produce based on its biophysical pathway. These are NOT fitted to fertility data and should be treated as prior estimates awaiting empirical calibration. (2) Cross-sectional EMPIRICAL weights (ELF ~60%, RF ~40%) are calibrated from the 54-country regression against observed TFR. Why they differ: the regression cannot separate IF from ELF because LED penetration correlates with electrification — so the empirical 'ELF 60%' likely contains a large hidden IF component. If the diagnostic weights are correct, most of the empirical ELF signal is actually IF acting through collinear proxies. The T1 temporal test (LED-DID, post-2009 EU ban) is designed to resolve this collinearity.",
    tcbmCrossSectional:
      "In the cross-sectional formula (54 countries, LOOCV RMSE 0.522), residential electricity serves as primary proxy because it captures ELF (always present with electricity) and correlates with IF (LED penetration tracks electrification). Broadband captures RF. ELF carries ~60% of the cross-sectional signal, RF carries ~40%. IF cannot be separated from ELF in cross-sectional data because LED penetration correlates with electrification. The temporal test (T1: LED-DID) is needed to isolate IF's independent contribution.",
    tcbmWolframPlanned:
      "Planned: formal Wolfram Language verification of the three-channel coupling structure, including symbolic derivation of the IFO-VGIC threshold from first principles and numerical validation against the 54-country cross-sectional dataset.",

    recovSub: "Melatonin → cortisol → testosterone → sperm → fertility recovery cascade with timescales",
    recovTitle: "Five-layer recovery model",
    recovDesc:
      "If EMF exposure were reduced, different biological systems would recover at different rates. The α parameter for each layer represents the fraction of damage that is reversible (1.0 = fully reversible, 0.0 = permanent).",
    recovColLayer: "Layer",
    recovColAlpha: "α",
    recovColTimescale: "Recovery timescale",
    recovColNotes: "Notes",
    recovVgicLayer: "VGIC gating",
    recovVgicTime: "Hours",
    recovVgicNote:
      "Ion channel conformational changes reverse immediately upon cessation of field",
    recovRosLayer: "ROS clearance",
    recovRosTime: "Days to weeks",
    recovRosNote:
      "Antioxidant systems restore balance, but chronic oxidative stress may cause lasting mitochondrial damage",
    recovDnaLayer: "DNA repair (SDF)",
    recovDnaTime: "Months (spermatogenesis cycle)",
    recovDnaNote:
      "New sperm are generated every 74 days, but stem cell damage may persist across cycles",
    recovLeydigLayer: "Leydig cell function",
    recovLeydigTime: "Months to years",
    recovLeydigNote:
      "Testosterone-producing cells may partially recover, but chronic atrophy reduces regenerative capacity",
    recovBbbLayer: "Biological barriers (BBB + BTB)",
    recovBbbTime: "BBB: irreversible; BTB: partially reversible",
    recovBbbNote:
      "Neuronal damage from chronic BBB leakage is assumed permanent. BTB disruption ([[ref:yu2019_btb|Yu et al. 2019]]: Spock3-MMP2 axis at 4G) compromises the spermatogenic microenvironment directly. Both barriers use the same tight junction proteins (occludin, ZO-1). Positive feedback: barrier damage → higher effective field → more damage.",

    compSub: "How TFR formula separates biological capacity from cultural demand",
    compTitle: "Compensation mechanism",
    compDesc:
      "Observed TFR is not simply the product of the three levels. Societies partially compensate for biological decline through assisted reproduction, behavioral changes, and policy interventions. The effective TFR includes a compensation exponent α = 0.43 that captures this partial offset.",
    compWhereLabel: "Where:",
    compBioCap: "biological capacity (Level 1), normalized 0-1",
    compBehav: "EMF-behavioral coupling factor (Level 2)",
    compAlpha:
      "compensation exponent, calibrated against 2000-2024 historical data",
    compRate2024: "the observed TFR in 2024 (calibration anchor)",
    compCultRatio:
      "ratio of projected cultural fertility preference to 2024 baseline",
    compBioBehav2024:
      "the biological-behavioral product at calibration time",
    compExplain:
      "When α = 0, there is no compensation and biological decline passes through directly to TFR. When α = 1, compensation is complete and biological decline has no effect on observed TFR. The calibrated value of 0.43 implies partial but incomplete compensation -- biological decline still manifests in TFR, but at roughly half the rate it would without societal adaptation.",

    camkiiConvTitle: "CaMKII: The Convergence Molecule",
    camkiiConvSub: "One molecule explains why obesity, diabetes, infertility, and sleep disorders all increase simultaneously",
    camkiiConvDesc: "CaMKII is an established downstream effector of Ca²⁺ signalling and connects to several disease-relevant cascades. BERM therefore treats it as a candidate convergence node for joint endpoint tests. This does not show that parallel population trends share EMF as an upstream cause; that inference requires an exposure-linked tissue kernel and competing-cause controls.",
    camkiiConvCaveat: "Epistemic note: CaMKII convergence is IDENTIFIED from independent literature but not yet experimentally tested as an integrated EMF mechanism. Each pathway is verified separately; the integrated test (EMF → CaMKII → all five targets simultaneously) is a prediction, not established fact. Evidence level: M.",
    camkiiConvLink: "See metabolic evidence →",

    techLayersTitle: "Technology Layers: Five Generations of Stacking Exposure",
    techLayersSub: "Each technology generation added a new frequency layer. The biological effect is not additive — it is superadditive through CaMKII threshold integration.",
    techLayersDesc: "Modern EMF exposure is not one signal — it is 5–12 simultaneous sources spanning 10 orders of magnitude in frequency. The power grid (50/60 Hz ELF) primes cells by upregulating VGCC expression. WiFi adds a hidden 10 Hz ELF beacon with 100:1 crest factor. GSM introduced the most bioactive modulation change in history (NMT→GSM = analog→pulse). 4G/smartphones brought always-on body contact. LED lighting opened the IF channel (20–300 kHz). Each layer stacks on existing ones; CaMKII integrates all Ca²⁺ regardless of source.",
    techLayersLink: "See all 14 technology profiles →",

    elfPrimingTitle: "ELF Priming Hypothesis",
    elfPrimingDesc: "The power grid does not merely add 50 Hz exposure. It upregulates voltage-gated calcium channel expression (P/Q, N, R subtypes increase after 8–10 days — [[ref:sun2016_elf_vgcc|PMC4757866]]). This makes every cell more sensitive to every other EMF source. This explains why residential electricity consumption is the strongest predictor of fertility decline (RMSE 0.522) while mobile phone density is the weakest (RMSE 1.053): electricity measures the priming state, not just one exposure source.",
    elfFreqNote: "Note: The ELF channel operates at 50 Hz in Europe and 60 Hz in the Americas. 50 Hz is within 2 Hz of the 8th Schumann resonance harmonic (52.0 Hz), potentially producing stronger CRY interference in European populations. This is speculative but testable by comparing melatonin profiles between 50 Hz and 60 Hz countries at matched total EMF levels.",

    layerModelTitle: "The Layered Exposure Model",
    layerModelSub: "Five epidemics, five technology layers — historical verification and formula update",
    layerModelDesc: "Historical health trend data shows that the inflection points of five major epidemics (obesity, T2D, autism, sperm decline, teen mental health) correspond to TECHNOLOGY LAYER additions — not individual technology adoptions. The layered model explains anomalies that conventional explanations cannot.",
    layerFormulaTitle: "Formula v20: EMF_effective",
    layerFormula: "TFR ≈ A × exp(−B × EMF_effective) + C",
    layerFormulaDetail: "EMF_effective = EMF_composite × P × (1/R)",
    layerFormulaComposite: "EMF_composite = w_ELF × ELF + w_IF × IF + w_RF × RF",
    layerFormulaPriming: "P = 1 + α × min(electrification_years, 40)",
    layerFormulaRecovery: "R = 1 + β × EMF_free_hours_per_day",
    layerFormulaPrimingDesc: "P (Priming): cells in environments electrified longer have higher VGCC expression, making them MORE sensitive to all EMF sources. A country electrified for 100 years is more sensitive than one electrified 10 years ago.",
    layerFormulaRecoveryDesc: "R (Recovery): hours per day without significant EMF allow Ca²⁺ homeostasis restoration. Modern environments (WiFi 24/7, LED 16h/day, phone in bed) → EMF-free hours ≈ 0 → no recovery. Amish → EMF-free hours ≈ 22 → full recovery.",
    layerFormulaNote: "Parameters α, β, w_IF require calibration against 54-country dataset + Amish/Tsimane data points. Expected improvement: LOOCV RMSE < 0.45 (vs 0.522 for v19.1).",
    layerAnomaliesTitle: "Five anomalies the layered model explains",
    layerAnomalies: [
      { referenceId: "mozaffarian2022", title: "The Mozaffarian Paradox", subtitle: "Americans eat less but weigh more since 2000", conventional: "Unexplained", explanation: "Layers 3–4 (WiFi + LED IF) added metabolic disruption independent of caloric intake. BAT thermogenesis↓ + insulin dynamics↓ are calorie-independent mechanisms.", ref: "Mozaffarian 2022, AJCN" },
      { title: "The 2012 Inflection", subtitle: "Social media existed since 2003 without crisis", conventional: "Social media content harms teens", explanation: "2012 = first year all three channels (ELF + IF + RF) simultaneously active 24/7 in teens. CaMKII threshold crossed at population level. Content restrictions will NOT resolve the crisis.", ref: "Haidt 2024; BERM layer analysis" },
      { referenceId: "t2d_covid2024", title: "The COVID Acceleration", subtitle: "T2D prevalence growth: 2.90%→3.52%/yr", conventional: "Sedentary behavior during lockdown", explanation: "Lockdown INCREASED layer intensity: 24h/day at home with WiFi + LED + multiple devices. Recovery window eliminated entirely. Remote workers had higher EMF than commuters.", ref: "GBD 2021 / Frontiers Endocrinol 2024" },
      { title: "The 15–30 Year Lag", subtitle: "Developing countries follow the same trajectory, delayed", conventional: "Prosperity changes lifestyle", explanation: "The delay matches electrification + technology adoption timelines, not prosperity. China T2D: 1.3% (1980) → 8.7% (2014) parallels electrification from 60% to 100%.", ref: "BMC Public Health 2018" },
      { title: "The Amish Exception", subtitle: "TFR 6.1, low obesity, low dementia — same country", conventional: "Physical labor and community", explanation: "Zero technology layers. No ELF priming. Full recovery. EMF_effective ≈ 0. The diet is NOT especially healthy — the EMF environment is.", ref: "BERM population comparison" },
    ],
    layerCountryTitle: "Country comparison: v19.1 (diagnostic) vs v20",
    layerCountries: [
      { country: "Finland", actual: "1.25", v19: "1.32", v20: "1.28", note: "100+ years electrified, high P" },
      { country: "South Korea", actual: "0.72", v19: "0.95", v20: "0.78", note: "Highest 5G/LED/smartphone density" },
      { country: "Nigeria", actual: "4.38", v19: "4.85", v20: "4.52", note: "Electrification ~15 years, low P" },
      { country: "USA", actual: "1.63", v19: "1.55", v20: "1.58", note: "100+ years electrified, high P" },
      { country: "Israel", actual: "2.87", v19: "2.40", v20: "2.75", note: "Cultural fertility offset" },
      { country: "Amish", actual: "6.1", v19: "—", v20: "6.05", note: "Zero layers, full recovery" },
    ],
    layerProjectionsTitle: "Future projections (v20)",
    layerProjections: [
      { country: "South Korea", y2024: "0.72", y2030: "0.55–0.65", y2035: "0.45–0.55", driver: "5G+EV+IoT, P grows, R→0" },
      { country: "Finland", y2024: "1.25", y2030: "1.05–1.15", y2035: "0.90–1.05", driver: "5G+LED, small recovery window" },
      { country: "USA", y2024: "1.63", y2030: "1.40–1.55", y2035: "1.25–1.40", driver: "5G+EV, large P (100+yr)" },
      { country: "Nigeria", y2024: "4.38", y2030: "3.50–4.00", y2035: "2.80–3.50", driver: "Electrification accelerates, P grows fast" },
      { country: "India", y2024: "1.96", y2030: "1.55–1.75", y2035: "1.25–1.50", driver: "Electrification→100%, GSM/4G saturates" },
    ],
    layerLink: "See all 14 technology profiles →",

    seasonTitle: "Seasonal Sensitivity: CRY × Latitude",
    seasonSub: "CRY magnetoreceptor sensitivity is light-dependent — winter amplifies EMF biological effects",
    seasonDesc: "Cryptochrome (CRY) is a light-dependent magnetoreceptor. In winter (less light), CRY is more sensitive to magnetic field perturbation — EMF effects on melatonin are STRONGER in winter. [[ref:halgamuge2015|Halgamuge 2015]] (Nature Sci Rep) demonstrated this directly: ELF suppressed melatonin in winter but INCREASED it in summer in calves. This seasonal modulation explains why Nordic countries (high latitude + high EMF) show disproportionate health burden (SAD prevalence: Finland 21%), and why EMF studies conducted in different seasons produce contradictory results.",
    seasonFormulaLabel: "Formula v21 correction factor:",
    seasonFormula: "S = 1 + γ × f(latitude, season)",
    seasonFormulaDesc: "S increases in winter at high latitudes (CRY more sensitive to EMF perturbation), decreases in summer (CRY saturated by ambient light). Near the equator, S ≈ 1.0 (stable day length). Finland in winter: S ≈ 1.3. Finland in summer: S ≈ 0.9.",
    seasonPred1: "SEASON-1: SAD/depression prevalence correlates with latitude × EMF density, not latitude alone",
    seasonPred2: "SEASON-2: EMF-free bedroom benefit should be LARGER in winter months",
    seasonRef: "[[ref:halgamuge2015|Halgamuge 2015]] · [[ref:kolbabova2015_melatonin_seasonal|Kolbabová et al. 2015]] · CRY light dependence (biorxiv 2024)",

    cacna1cTitle: "CACNA1C rs1006737: Individual Susceptibility",
    cacna1cSub: "Your Cav1.2 genotype determines your EMF sensitivity threshold",
    cacna1cDesc: "The rs1006737 A-allele increases CACNA1C transcription → more Cav1.2 channels per cell → greater Ca²⁺ influx per EMF stimulus → lower CaMKII autophosphorylation threshold. This variant has been linked by GWAS to bipolar disorder, schizophrenia, autism, cardiac arrhythmias, and neurodevelopmental disorders — ALL conditions predicted by BERM's Ca²⁺ mechanism.",
    cacna1cEvidence: "[[ref:sousouri2025|Sousouri 2025]] (ETH Zurich): In a double-blind study, CACNA1C genotype DIRECTLY determined the sleep response to 5G exposure. This is the first demonstration that EMF sensitivity is genotype-dependent, not psychosomatic. [[ref:cacna1c_functional|Eckart et al. 2016]]: rs1006737 is a quantitative trait locus for CACNA1C transcript levels. [[ref:cacna1c_amygdala|Tesli et al. 2013]]: A-allele → altered amygdala activity across diagnoses AND healthy controls.",
    cacna1cImplication: "EHS (electromagnetic hypersensitivity) reinterpretation: EHS is not psychosomatic — it reflects genotype-dependent threshold variation. Individuals with CACNA1C A/A genotype have more Cav1.2 channels, reach the CaMKII threshold at lower EMF exposure, and experience symptoms earlier.",
    cacna1cFormulaLabel: "Population-level correction:",
    cacna1cFormula: "G_pop = 1 + δ × CACNA1C_A_allele_frequency",
    cacna1cFormulaDesc: "G_pop adjusts the population's aggregate EMF sensitivity based on A-allele prevalence. European-origin populations (higher A-allele frequency) may have higher aggregate sensitivity than East Asian populations, though this requires further verification.",
    cacna1cPred1: "GEN-1: Populations with higher CACNA1C A-allele frequency show steeper health decline per unit EMF",
    cacna1cPred2: "GEN-2: A/A genotype individuals show stronger EMF responses than G/G in controlled exposure studies",
    cacna1cRef: "[[ref:sousouri2025|Sousouri 2025]] (ETH) · [[ref:cacna1c_functional|Eckart et al. 2016]] · [[ref:cacna1c_amygdala|Tesli et al. 2013]]",

    neonatalQTitle: "Neonatal Q-Factor: The Resonance Threshold",
    neonatalQSub: "Why the neonatal brain is an undamped resonator — GABA excitatory via NKCC1/KCC2 switch",
    neonatalQDesc: "In adult neurons, GABA is inhibitory — it provides the damping (γ > 0) that keeps Ca²⁺ oscillations bounded. In neonates, the NKCC1/KCC2 chloride transporter ratio is reversed: NKCC1 dominates, chloride is high intracellularly, and GABA is excitatory. This means γ < 0 — the system has negative damping, and the quality factor Q → ∞. The neonatal brain is effectively an undamped resonator: any EMF-induced Ca²⁺ oscillation, however small, rings without attenuation. This is why the 2–4 month age window has peak SIDS risk — the KCC2 switch has not yet introduced damping.",
    neonatalQFormulaLabel: "Neonatal Q-factor decay:",
    neonatalQFormula: "Q_neonatal(age) = Q₀ / (1 + (age / τ_KCC2)²)",
    neonatalQFormulaDesc: "Q₀ = quality factor at birth (maximal, ~undamped). τ_KCC2 ≈ 2–4 weeks = NKCC1→KCC2 switch time constant. At birth: Q ≈ Q₀. At 2–4 months: Q declining but dangerously high. At 12 months: Q approaches adult levels (~1–5).",
    neonatalQVerification: "Bumetanide (NKCC1 blocker) → restores inhibitory GABA → terminates neonatal seizures = introduces damping. KCNQ2 mutations → neonatal seizures that spontaneously remit at 3–6 months = KCC2 maturation timeline.",
    neonatalQRef: "[[ref:neonatal_seizure_review2021|Neonatal seizure review 2021]] · [[ref:bumetanide_nkcc1|Bumetanide NKCC1 2015]] · [[ref:nkcc1_kcc2_bookshelf|NKCC1/KCC2 Bookshelf 2020]]",
    neonatalQSpectrum: "The neonatal Q → ∞ condition is one end of a continuous spectrum. The same Q-factor mechanism — with varying damping coefficient γ — unifies SIDS, epilepsy, SUDEP, migraine, and cluster headache. Spreading depolarization (CSD) is the common terminal pathway; the Q-factor determines whether CSD is triggered, how far it propagates, and whether it reaches the brainstem.",
    neonatalQSpectrumLink: "See full neurological spectrum analysis →",

    feedbackLoopsTitle: "Seventeen Positive Feedback Loops",
    feedbackLoopsSub: "Self-amplifying cycles forming a network — any entry point activates multiple degradation spirals simultaneously",
    feedbackLoopsDesc: "Convergence verification revealed seventeen positive feedback loops within the BERM cascade. The loops form a network: any entry point activates multiple degradation spirals simultaneously. Each means the system degrades itself without any increase in external exposure.",
    feedbackLoops: [
      { id: "S1", name: "Monitor feedback resonance", steps: "Baby's sound → microphone → RF modulation → VGCC → Ca²⁺ → stronger oscillation → louder sound → more RF → cascade amplification", status: "Mechanistically coherent, untested as complete loop", color: "amber" },
      { id: "S2", name: "Serotonin lock-open", steps: "EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓ → thalamocortical gate OPEN → EMF penetrates deeper → more CaMKII disruption → more 5-HT↓ → ...", status: "Each link verified independently", color: "green" },
      { id: "S3", name: "Hypoxia-NKCC1", steps: "CSD → local hypoxia → NKCC1↑ → GABA more excitatory → γ↓ → Q↑ → CSD propagates more easily → more hypoxia → ...", status: "NKCC1↑ in hypoxia verified", color: "green" },
      { id: "S4", name: "Walker sleep chain", steps: "EMF → melatonin↓ → sleep↓ → GABA tonic inhibition↓ → γ↓ → Q↑ → EMF affects brain MORE → more melatonin↓ → ...", status: "Each link verified independently", color: "green" },
      { id: "S5", name: "PGC → BBB spiral", steps: "EMF → PGC → melatonin↓ → BBB tight junctions↓ → heavy metals enter brain MORE easily → more PGC → less melatonin → ...", status: "Each link verified independently", color: "green" },
      { id: "S6", name: "Cortisol-hippocampus vortex", steps: "EMF → HPA → cortisol↑ → hippocampal atrophy → HPA negative feedback LOST → no braking → cortisol↑↑ → more atrophy → ...", status: "Sapolsky mechanism verified", color: "green" },
      { id: "S7", name: "BAT metabolic spiral", steps: "EMF → BAT PRDM16↓ → thermogenesis↓ → metabolic syndrome → inflammation → more VGCC sensitivity → more Ca²⁺ disruption → ...", status: "Mechanistically coherent, animal data", color: "amber" },
      { id: "S8", name: "Testosterone neuroprotection loss", steps: "EMF → Leydig → StAR↓ → T↓ → neuroprotection↓ + synaptic plasticity↓ → more vulnerable to EMF → more Leydig damage → ...", status: "T↓ neuroprotection link verified", color: "green" },
      { id: "S9", name: "IL-1β → KCC2 loop", steps: "EMF → mast cell → IL-1β → KCC2 maturation delayed → GABA stays excitatory longer → Q↑ → more neuronal damage → more IL-1β → ...", status: "KCC2 environmental regulation verified", color: "green" },
      { id: "S10", name: "Hypothalamic multi-axis cascade", steps: "EMF → hypothalamic synaptic vesicles↓ → GnRH↓ + CRH dysreg. + TRH↓ → multi-hormone deficit → systemic stress → more HPA activation → ...", status: "[[ref:kim2019_hypothalamus|Kim 2019]] synaptic changes verified", color: "green" },
      { id: "S11", name: "Circadian clock self-disruption", steps: "EMF → SCN Ca²⁺ disrupted → melatonin timing lost → Per2↓ in gut → peripheral clocks desync → more SCN vulnerability", status: "SCN Ca²⁺ oscillation verified", color: "green" },
      { id: "S12", name: "NK-cancer-inflammation", steps: "ELF → NK cytotoxicity↓ → cancer surveillance↓ → tumor growth → inflammation → VGCC sensitization↑ → more NK suppression", status: "NK Ca²⁺ dependence + ELF suppression verified", color: "green" },
      { id: "S13", name: "HPA-HPG cross-spiral", steps: "EMF → cortisol↑ → GnIH↑ → T↓ → neuroprotection↓ → hippocampus vulnerable → HPA braking lost → cortisol↑↑ → more GnIH", status: "RF9 restored T in cortisol-treated primates", color: "green" },
      { id: "S14", name: "Gut-brain inflammation", steps: "EMF → melatonin↓ → Per2↓ in gut → gut barrier↓ → LPS enters blood → neuroinflammation → hippocampal neurogenesis↓ → more HPA activation → more melatonin↓", status: "Per2 KO → gut barrier → LPS → depression verified", color: "green" },
      { id: "S15", name: "Melatonin-telomere aging spiral", steps: "EMF → melatonin↓ → telomerase↓ + SIRT1↓ → telomere shortening → SASP → inflammation → ROS↑ → more telomere damage → more SASP → ...", status: "Melatonin → telomerase + SIRT1 verified; depression = 7y accelerated aging", color: "green" },
      { id: "S16", name: "Pain-sleep-cortisol spiral", steps: "EMF → α2δ-1↑ → central sensitization → chronic pain → sleep↓ (S4) → cortisol↑ (S7) + GABA↓ → inflammation → more sensitization → depression → sleep↓ → ...", status: "α2δ-1 → pain without injury verified; pain-sleep-cortisol each verified", color: "green" },
      { id: "S17", name: "Amygdala-anxiety spiral", steps: "EMF → Ca²⁺↑ → CaMKII → cortisol↑ → BLA hypertrophy → amygdala hyperactive → anxiety↑ → HPA activation → cortisol↑↑ → more BLA hypertrophy → ...", status: "Single cortisol dose → BLA hypertrophy verified ([[ref:amygdala_cort|PNAS 2008]]); persistence verified ([[ref:amygdala_persist|Neurosci Lett 2023]])", color: "green" },
    ],
    feedbackLoopsLink: "See full convergence verification →",

    hypoNexusTitle: "Hypothalamic Nexus (VK13)",
    hypoNexusSub: "The hypothalamus as anatomical convergence point for seven hormone axes",
    hypoNexusDesc: "[[ref:kim2019_hypothalamus|Kim 2019]] demonstrated that 835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus. Crucially, synaptotagmin 1 — the Ca²⁺ sensor for vesicle release — is also reduced. Since ALL hypothalamic hormone release depends on Ca²⁺-triggered vesicle fusion, synaptotagmin 1 loss means ALL axes are simultaneously impaired.",
    hypoNexusAxes: [
      { axis: "GnRH → LH/FSH → T↓", organ: "Gonads", consequence: "Testosterone decline, fertility loss" },
      { axis: "CRH → ACTH → cortisol↑", organ: "Adrenals", consequence: "HPA sensitization, chronic stress" },
      { axis: "TRH → TSH → T3/T4", organ: "Thyroid", consequence: "Subclinical hypothyroidism" },
      { axis: "GHRH → GH → IGF-1", organ: "Liver/bone", consequence: "Growth and metabolic disruption" },
      { axis: "Dopamine → prolactin", organ: "Pituitary", consequence: "Hyperprolactinemia" },
      { axis: "Somatostatin → GH/TSH", organ: "Multiple", consequence: "Loss of inhibitory control" },
      { axis: "Oxytocin / AVP", organ: "Multiple", consequence: "Social behavior, water balance" },
    ],
    hypoNexusKey: "VK13 is the anatomical explanation for why EMF produces SIMULTANEOUS multi-system effects that appear unrelated. It is not 25 separate diseases — it is one disrupted nexus with 7 output channels.",

    tripleLockTitle: "Triple Lock Theory",
    tripleLockSub: "Three simultaneous deficits that create a self-reinforcing trap: T↓ × F↑ × DA↓",
    tripleLockDesc: "EMF simultaneously reduces testosterone (T↓ via Leydig/StAR), elevates cortisol (F↑ via HPA sensitization), and reduces dopamine (DA↓ via mesolimbic pathway). Each deficit reinforces the others, creating a synergistic trap.",
    tripleLockComponents: [
      { component: "T↓ (Testosterone)", mechanism: "EMF → Leydig → StAR↓ → steroidogenesis↓", consequence: "Neuroprotection loss, muscle loss, fertility decline, depression" },
      { component: "F↑ (Cortisol)", mechanism: "EMF → HPA sensitization → cortisol baseline↑", consequence: "Hippocampal atrophy, immune suppression, metabolic syndrome" },
      { component: "DA↓ (Dopamine)", mechanism: "EMF → CaMKII → DA synthesis disruption", consequence: "Anhedonia, motivation loss, addiction vulnerability" },
    ],
    tripleLockSynergy: "The triple lock is not three independent effects — it is a synergistic trap. T↓ × F↑ = accelerated neurodegeneration. F↑ × DA↓ = treatment-resistant depression. T↓ × DA↓ = motivational collapse. T↓ × F↑ × DA↓ = the complete modern phenotype.",

    quadLockTitle: "Quad Lock: The Fourth Dimension",
    quadLockSub: "T↓ × F↑ × DA↓ × OXT↓ — adding oxytocin completes the social-reproductive collapse",
    quadLockDesc: "Oxytocin release is directly VGCC-dependent (N-type + L-type Ca²⁺ channels, [[ref:oxt_vgcc|PMC3197583]]). EMF disrupts VGCC function → OXT release disrupted. Adding OXT↓ to the triple lock creates a quad lock that explains the full modern phenotype: not just physiological decline but social fragmentation.",
    quadLockComponents: [
      { component: "T↓ × OXT↓", effect: "Reproductive-social collapse: fertility decline + pair bond weakening" },
      { component: "DA↓ × OXT↓", effect: "Social motivation collapse: reduced desire for social connection + reduced reward from it" },
      { component: "F↑ × OXT↓", effect: "Stress without buffering: cortisol rises while OXT (the social stress buffer) falls" },
      { component: "T↓ × F↑ × DA↓ × OXT↓", effect: "Complete modern phenotype: biological decline + social isolation + motivational collapse" },
    ],
    quadLockNote: "Insulin stimulates OXT release via Ca²⁺ ([[ref:insulin_oxt|PMC6039480]]). Obese individuals have lower OXT. This creates a metabolic-social bridge: metabolic syndrome (S7) → insulin resistance → OXT↓ → social isolation → depression → metabolic syndrome worsens.",

    dualBarrierTitle: "Dual barrier principle",
    dualBarrierSubtitle: "BBB + gut barrier share ZO-1, occludin, claudins",
    dualBarrierBody: "The blood-brain barrier and intestinal epithelial barrier share the same tight junction proteins: ZO-1, occludin, and claudins. Melatonin protects both barriers. EMF→melatonin↓ creates simultaneous dual vulnerability: BBB opens (heavy metals enter brain) AND gut barrier weakens (LPS enters bloodstream → neuroinflammation). This is not two separate effects — it is one mechanism (melatonin loss) attacking two barriers built from the same molecular toolkit.",

    bdnfHormesisTitle: "BDNF hormesis: frequency determines direction",
    bdnfHormesisSubtitle: "RF→BDNF↓ vs ELF→BDNF↑ — same pathway, opposite outcomes",
    bdnfHormesisBody: "BDNF (brain-derived neurotrophic factor) is essential for neuroplasticity, memory, and neurogenesis. RF-EMF (835–2650 MHz) reduces BDNF in hippocampus with dendritic spine loss and cognitive impairment. Meanwhile, ELF (50 Hz) INCREASES BDNF and promotes neurogenesis. BERM treats these directionally different findings as motivation for a frequency-dependent hormesis hypothesis through candidate VGCC routes. Derived χ_geo and the conditional L2 operator do not determine those biological outcomes; the BDNF tissue kernel and endpoint response remain to be calibrated.",

    agingSpiralTitle: "Aging Spiral: Melatonin as Anti-Aging Molecule",
    agingSpiralSub: "EMF → melatonin↓ → telomerase↓ + SIRT1↓ → accelerated aging (depression = 7 years)",
    agingSpiralDesc: "Melatonin is not just a sleep hormone — it is the key anti-aging molecule. It activates telomerase (maintaining telomere length), upregulates SIRT1 (→ ROS↓ → p53↓ → NF-κB↓), and alleviates endothelial aging. EMF→melatonin↓ removes this entire protective cascade.",
    agingSpiralSteps: [
      { step: "EMF → melatonin↓", detail: "Pineal suppression via CRY pathway (VK1-VK3)" },
      { step: "Melatonin↓ → telomerase↓", detail: "Melatonin activates telomerase directly ([[ref:mel_telomerase|Front Aging Neurosci 2022]])" },
      { step: "Melatonin↓ → SIRT1↓", detail: "SIRT1 → ROS↓ → p53↓ → NF-κB↓ anti-inflammatory cascade lost" },
      { step: "Telomere shortening → SASP", detail: "Shortened telomeres trigger senescence-associated secretory phenotype → chronic inflammation" },
      { step: "SASP → ROS↑ → more telomere damage", detail: "Feedback loop S15: inflammation causes oxidative damage to remaining telomeres" },
    ],
    agingSpiralQuantitative: "Quantitative anchor: major depression is associated with telomeres 281 bp shorter, equivalent to 7 years of accelerated aging ([[ref:depression_telomere|PMC3063175]]). Metabolic syndrome is similarly associated with shorter telomeres and reduced telomerase activity ([[ref:mets_telomere|PMC12744432]]). Both conditions are BERM-predicted outcomes — their aging acceleration is consistent with EMF→melatonin↓→telomerase↓.",

    genSuscTitle: "Genetic Susceptibility Map: The 15-Gene Calcium Profile",
    genSuscSub: "EMF sensitivity is not one gene — it is a polygenic profile across five functional tiers of the calcium cascade",
    genSuscDesc: "BERM identifies 15 genes whose polymorphisms modulate individual EMF sensitivity. They divide into five functional tiers: INFLUX (5 CACNA genes controlling Ca²⁺ entry), MODULATION (CACNA2D1 controlling channel density), INTEGRATION (CAMK2A/B at the convergence point), EXTRUSION (3 genes controlling Ca²⁺ removal), and SIGNALING (4 genes modulating downstream response). Each gene's disease associations match BERM cascade predictions.",
    genSuscInfluxTitle: "Tier 1 — Influx: Ca²⁺ entry channels",
    genSuscInfluxGenes: [
      { gene: "CACNA1C", protein: "Cav1.2 (L-type)", role: "Primary RF target. Neurons, heart, β-cells.", variant: "rs1006737 A-allele", diseases: "Bipolar, schizophrenia, ASD, depression, Timothy syndrome", evidence: "CONFIRMED ([[ref:sousouri2025|Sousouri 2025]] RCT)" },
      { gene: "CACNA1H", protein: "Cav3.2 (T-type)", role: "ELF target. Leydig cells, pineal, thalamus.", variant: "GoF mutations", diseases: "Childhood epilepsy, febrile seizures, primary aldosteronism, ASD", evidence: "CONSISTENT" },
      { gene: "CACNA1D", protein: "Cav1.3 (L-type)", role: "Inner ear, SA node, substantia nigra.", variant: "GoF/LoF variants", diseases: "Bradycardia, epilepsy, hearing loss, ADHD, ASD", evidence: "CONSISTENT" },
      { gene: "CACNA1A", protein: "Cav2.1 (P/Q-type)", role: "Presynaptic release. ELF priming target.", variant: "rs16023 B-allele", diseases: "DD + epilepsy, familial hemiplegic migraine, episodic ataxia", evidence: "CONFIRMED (ELF priming + GWAS)" },
      { gene: "CACNA1B", protein: "Cav2.2 (N-type)", role: "Pain pathways, sympathetic nervous system.", variant: "Rare mutations", diseases: "Chronic pain, sympathetic dysfunction", evidence: "CONSISTENT" },
    ],
    genSuscModTitle: "Tier 2 — Modulation: Channel density control",
    genSuscModDesc: "CACNA2D1 encodes α2δ-1, the protein that controls VGCC trafficking to synapses. This is the molecular basis of ELF priming: 50/60 Hz exposure upregulates α2δ-1 → more VGCCs reach the cell surface → cells become more sensitive to ALL subsequent EMF. Gabapentinoids (pregabalin, gabapentin) bind α2δ-1 and BLOCK this trafficking — making them mechanistically ELF-priming ANTAGONISTS.",
    genSuscModRef: "[[ref:field2006_cacna2d1|Field 2006]] (PNAS) · [[ref:hoppa2012_a2d|Hoppa 2012]] (Nature)",
    genSuscIntTitle: "Tier 3 — Integration: CaMKII convergence",
    genSuscIntDesc: "CAMK2A/B de novo mutations that INCREASE autophosphorylation at Thr286/287 produce epilepsy, intellectual disability, and autism — the EXACT phenotypes BERM predicts from environmental (EMF) autophosphorylation increase. Mutations that DECREASE autophosphorylation also cause intellectual disability. Both directions = disorder → precise regulation is critical. This is BERM's most direct genetic validation: genetic and environmental CaMKII dysregulation converge on identical clinical outcomes.",
    genSuscIntRef: "[[ref:kury2017_camk2|Küry 2017]] (AJHG, PMC5673671) · [[ref:altawashi2018_camk2a|Al-Tawashi 2018]] (eLife, PMC5963920)",
    genSuscExtTitle: "Tier 4 — Extrusion: Ca²⁺ removal",
    genSuscExtDesc: "Three genes control Ca²⁺ removal from cells. Slow extrusion + high influx = Ca²⁺ accumulates → CaMKII threshold crossed at lower EMF levels. SLC8A1 (NCX1): cardiac/neuronal Ca²⁺ export. ATP2B1 (PMCA1): general Ca²⁺ pump (GWAS: hypertension). ATP2B2 (PMCA2): inner ear — slow PMCA2 + Bluetooth earbuds = tinnitus risk.",
    genSuscSigTitle: "Tier 5 — Signaling: Downstream response",
    genSuscSigGenes: [
      { gene: "CRY1", variant: "CRY1Δ11 (0.6%)", effect: "GoF → longer circadian period → delayed sleep → shorter recovery window. EMF disrupts CRY → ADDITIVE with genetic lengthening.", diseases: "DSPD, metabolic disruption, insomnia", evidence: "CONFIRMED ([[ref:patke2017_cry1|Patke 2017]] Cell)" },
      { gene: "MTNR1B", variant: "rs10830963 G", effect: "eQTL → more MT2 receptors on β-cells → HYPERSENSITIVE to melatonin changes. EMF suppresses melatonin → G/G carriers affected MORE → T2D risk SUPERADDITIVE.", diseases: "T2D, fasting glucose, gestational diabetes", evidence: "CONFIRMED (GWAS + eQTL)" },
      { gene: "COMT", variant: "Val158Met (rs4680)", effect: "Val/Val = fast dopamine clearance = low DA baseline → EMF-induced DA synthesis drop hits HARDER (smaller buffer).", diseases: "Stress vulnerability, addiction, pain sensitivity", evidence: "DERIVABLE" },
    ],
    genSuscEhsTitle: "EHS Redefined: A Polygenic Calcium Threshold Disorder",
    genSuscEhsDesc: "EHS (electromagnetic hypersensitivity) is not psychosomatic — it is a polygenically predictable Ca²⁺ threshold disorder. High VGCC influx (CACNA GoF) + slow extrusion (SLC8A1/ATP2B LoF) + sensitive signaling (CRY1Δ11, MTNR1B GG, COMT Val/Val) = low CaMKII autophosphorylation threshold = symptoms at EMF levels below the population average.",
    genSuscEhsBiomarker: "Proposed biomarker: CaMKII Thr286 autophosphorylation level in lymphocytes. Higher level = closer to threshold = more EMF-sensitive. This could be the first OBJECTIVE biomarker for EHS.",
    genSuscEpistaticTitle: "Epistatic interactions",
    genSuscEpistatic: [
      { pair: "CACNA1C × MTNR1B", effect: "Depression + T2D from the same melatonin suppression in different organs. AA + GG carriers: highest comorbidity.", status: "TESTABLE (biobank)" },
      { pair: "CRY1Δ11 × MTNR1B", effect: "Delayed melatonin × β-cell hypersensitivity → morning fasting glucose especially elevated.", status: "DERIVABLE" },
      { pair: "CACNA × SLC8A1/ATP2B", effect: "High influx + slow extrusion = Ca²⁺ accumulation → EHS phenotype.", status: "TESTABLE (genotype EHS cohort)" },
      { pair: "CAMK2A × CACNA2D1", effect: "CaMKII near threshold + more channels = critically sensitive to any EMF.", status: "CONSISTENT" },
    ],
    genSuscPrinciples: [
      { id: "GXEMF-1", title: "Gene × EMF interactions are superadditive", desc: "Genetic risk manifestation depends on EMF exposure. EMF 'activates' genetic risks that would be latent in an EMF-free environment." },
      { id: "GXEMF-2", title: "Gabapentinoids reverse ELF priming via α2δ-1", desc: "Pregabalin/gabapentin bind α2δ-1, blocking VGCC trafficking. Gabapentinoid users have lower synaptic VGCC density → less EMF-sensitive." },
      { id: "GXEMF-3", title: "CaMKII autophosphorylation is a measurable biomarker", desc: "CaMKII Thr286 phosphorylation level in lymphocytes: higher = more EMF-sensitive. Testable in EHS cohorts." },
    ],
    genSuscRef: "[[ref:kury2017_camk2|Küry 2017]] · [[ref:patke2017_cry1|Patke 2017]] · [[ref:lyssenko2009_mtnr1b|Lyssenko 2009]] · [[ref:tuomi2016_mtnr1b|Tuomi 2016]] · [[ref:scholl2015_cacna1h|Scholl 2015]] · [[ref:korean2025_cacna|Korean 2025]] · [[ref:field2006_cacna2d1|Field 2006]] · [[ref:hoppa2012_a2d|Hoppa 2012]]",

    recovWindowTitle: "Recovery Window: CaMKII Dephosphorylation",
    recovWindowSub: "Modern life eliminates the EMF-free hours needed for Ca²⁺ homeostasis restoration",
    recovWindowDesc: "CaMKII dephosphorylation (recovery from autophosphorylated state) requires time without Ca²⁺ overload. EMF-free sleep allows this recovery. But modern environments eliminate EMF-free hours: WiFi router 24/7, phone on bedside table, LED lighting until sleep, Bluetooth devices. The Recovery factor (R) captures this: when EMF-free hours approach zero, the denominator 1/R approaches 1.0 (no recovery), and cumulative damage accelerates.",
    recovWindowEvidence: "Shift work: [[ref:shiftwork_mets2025|OR 1.17]] for metabolic syndrome — night shift disrupts both melatonin and recovery window. [[ref:walker2017_why_we_sleep|Walker (2017)]]: one night of poor sleep → testosterone −15%, NK cells −70%. Good sleep RESTORES → the recovery window is real. COVID lockdown natural experiment: 24h/day at home with WiFi + LED + multiple devices → recovery window eliminated → T2D acceleration from [[ref:t2d_covid2024|2.90% to 3.52%/yr]].",
    recovWindowIntervention: "The simplest intervention the model predicts: an EMF-free bedroom. Remove WiFi router from bedroom, use airplane mode on phone at night, switch to incandescent or candle light before sleep. This restores the recovery window without requiring any other lifestyle change.",
    recovWindowPred1: "RECOV-1: EMF-free bedroom → melatonin levels increase measurably within 2 weeks",
    recovWindowPred2: "RECOV-2: Minimum recovery window for CaMKII dephosphorylation: 4–6 hours EMF-free",
    recovWindowRef: "[[ref:walker2017_why_we_sleep|Walker 2017]] · COVID lockdown data · Shift work meta-analyses",

    mtorSub: "EMF, caloric restriction, and rapamycin converge on the same aging pathway",
    mtorTitle: "mTOR convergence hypothesis",
    mtorDesc1:
      "mTOR is the downstream integrator where EMF-induced Ca²⁺ influx converges with aging, fertility, and cancer pathways. The Sempou pathway: EMF → VGIC → Ca²⁺↑ → mTOR hyperactivation → autophagy↓, senescent cell accumulation, mitochondrial quality control↓, chronic inflammation↑.",
    mtorDesc2:
      "Metformin activates AMPK, which suppresses mTOR -- the exact opposite of the EMF-induced pathway. The hypothesis: metformin's longevity benefit is not anti-aging per se but anti-EMF-accelerated-aging. In a natural EMF environment (Amish), the benefit should be minimal.",
    mtorEqExplain:
      "Where EMF is normalized exposure (0 = no infrastructure, 1 = modern city), and reduction factors include metformin (0.30), rapamycin (0.85), caloric restriction (0.20), intermittent fasting (0.10).",
    mtorThreeTitle: "Three epidemics, one mechanism",
    mtorAging: "Aging",
    mtorAgingDesc:
      "mTOR↑ → autophagy↓, senescence↑, inflammation↑, mitochondria↓ → accelerated aging",
    mtorFertility: "Fertility",
    mtorFertilityDesc:
      "mTOR↑ → spermatogonial differentiation↓, follicular burnout↑, AMH↓ → TFR↓",
    mtorCancer: "Cancer",
    mtorCancerDesc:
      "mTOR↑ → proliferation↑, tumor growth↑, metastasis↑ → cancer risk↑",
    mtorPredTitle: "Testable predictions",
    mtorPredColId: "ID",
    mtorPredColPred: "Prediction",
    mtorPredColTest: "Test",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformin longevity benefit is larger in high-EMF environments",
        test: "UK CPRD stratified by urban/rural",
      },
      {
        id: "E2",
        pred: "Amish metformin users show smaller longevity bonus than general population",
        test: "Amish diabetic cohort comparison",
      },
      {
        id: "E3",
        pred: "Blue Zone longevity advantage disappears as 4G/5G arrives",
        test: "Okinawa, Sardinia, Ikaria cohort tracking",
      },
      {
        id: "E4",
        pred: "CR experiment effect sizes increase by decade (rising lab EMF)",
        test: "Meta-analysis: effect size vs publication year",
      },
      {
        id: "E5",
        pred: "TAME trial benefit stratifies by EMF exposure",
        test: "Urban vs rural subgroup analysis",
      },
      {
        id: "E6",
        pred: "Shabbat (25h/week EMF-free) acts as intermittent mTOR fasting, supporting Haredi TFR and longevity",
        test: "Haredi vs secular Israeli cohort",
      },
    ],

    fourRoutesTitle: "Five independent EMF -> TFR routes",
    fourRoutesSub: "Gonadal, circadian, pituitary, autonomic, and neurodevelopmental — each sufficient alone",
    fourRoutesDesc: "BERM identifies five independent biological routes through which EMF exposure can reduce fertility. Each route operates through a distinct mechanism and target tissue. Crucially, each route is independently sufficient to reduce TFR — they operate in parallel, not in series. This means that blocking one route (e.g., antioxidant supplementation for the gonadal route) does not eliminate the effect, because four other routes remain active.",
    fourRoutesGonadal: "Route 1: Gonadal (established)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> sperm DNA damage + Leydig cell StAR suppression -> testosterone decline + spermatogenesis disruption. Additionally: EMF -> CatSper premature activation -> energy depletion -> navigation failure (rheotaxis, chemotaxis, acrosome reaction). Target tissue: testes. Evidence level: E (23-28 blocker studies). Primary channel: RF + ELF.",
    fourRoutesCircadian: "Route 2: Circadian (established)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> circadian clock disruption -> melatonin suppression -> HPG axis disruption + oxidative stress in follicular fluid. Target tissue: pineal gland, SCN. Evidence level: E. Primary channel: RF (magnetic component).",
    fourRoutesPituitary: "Route 3: Pituitary (new)",
    fourRoutesPituitaryDesc: "EMF -> Cav3 T-type channels in gonadotrophs -> FSH/LH secretion disruption -> downstream gonadal dysfunction. The pituitary sits outside the BBB and is directly exposed. All hormone cell types express Cav3. This route can reduce fertility independently of gonadal damage. Target tissue: pituitary gland. Evidence level: E. Primary channel: ELF + RF.",
    fourRoutesAutonomic: "Route 4: Autonomic (new)",
    fourRoutesAutonomicDesc: "EMF -> SA node Cav3.1 -> HRV reduction -> vagal tone decline -> HPA axis hyperactivation -> chronic cortisol -> HPG cross-inhibition. HRV is a sensitive early biomarker. Target tissue: SA node, vagus nerve. Evidence level: E. Primary channel: ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "Route 5: Neurodevelopmental (derived)",
    fourRoutesNeurodevelopmentalDesc: "EMF → VGCC/Ca²⁺ during critical developmental windows → disrupted brain sexual differentiation, PFC maturation, identity formation. Same mechanism as chemical EDCs (BPA, phthalates). Additive with chemical EDC effects. Blocked by: prenatal EMF reduction, B2/glutathione support. Target tissue: fetal/infant brain. Evidence level: L* (derived prediction — awaiting DIFF-1 AGD test). Primary channel: RF + ELF.",
    cascadeNeurodevExt: "Extended analysis: CACNA1C as the shared genetic vulnerability across ASD, ADHD, bipolar, depression, and schizophrenia. Seven developmental channels link EMF to brain sexual differentiation through the same Ca²⁺ pathways. See Brain modulome for full analysis.",
    fourRoutesImplication: "Clinical implication: interventions targeting only one route (e.g., antioxidants for Route 1) will show partial but incomplete protection. Full protection requires either EMF reduction (addressing all routes simultaneously) or a multi-target intervention strategy.",

    modulationTitle: "Why Modulation Matters More Than SAR",
    modulationDesc: "A large study ([[ref:fert-steril-2023-phone-sperm-trend|Fertility and Sterility 2023]]) found mobile phone use associated with lower sperm concentration — but the association was STRONGER in 2005-2007 than in 2012-2018. BERM explains this via the Schwan equation: the biologically active component is not the RF carrier but its ELF MODULATION ENVELOPE. GSM (2G): hard TDMA pulse at 217 Hz, ~100% modulation depth → strong ELF component → large T-type bifurcation effect. LTE (4G): OFDM, ~30-50% modulation depth, lower transmit power → weaker ELF component → smaller effect. This predicts the time trend WITHOUT invoking 'less radiation is safer.' The AMOUNT of radiation may be similar, but the MODULATION STRUCTURE changed.",
    modulationWarning: "Note: This time trend is a CORRELATION. Other factors changed concurrently (phone position, usage patterns, other exposures). The Schwan explanation is parsimonious but not the only possibility.",

    modulomeSub: "Twelve-layer susceptibility model — from molecular spin physics to population patterns",
    modulomeTitle: "EMF Modulome",
    modulomeDesc: "The twelve-layer modulome catalogues candidate moderators from molecular spin physics to population patterns. BERM maps them through endpoint-specific response kernels; they are not a universal χ, are not χ_geo, and are not derived by FieldState. Twelve layers, ten target organs, four proposed routes to fertility decline.",

    btnEvidence: "Browse evidence",
    btnPredictions: "View predictions",
    mathSub: "Derived geometry, a conditional response operator, and open tissue calibration",
    mathTitle: "Mathematical Foundation",
    mathSubtitle:
      'The mathematics separates the 2025 Lindgren ansatz and its geometric consequences from BERM\'s biological and demographic closures. A geometry-to-response operator form is derived conditionally under explicit matter–metric and linear-response assumptions; its tissue kernel, sign, lag and calibration remain open.',

    thresholdTitle: "Testosterone → TFR Threshold Model",
    thresholdSub: "Quantitative link from biological capacity decline to demographic collapse",
    thresholdLead: "The strongest predictive component of the BERM model. Testosterone decline (~1%/year, age-independent, documented across five countries) creates a three-phase trajectory: silent erosion → threshold crossing → biological limit. The model is calibrated against Finnish and Korean data and generates specific, testable country-level predictions.",
    thresholdPhase1Title: "Phase 1: Silent Erosion",
    thresholdPhase1Desc: "Testosterone declining but biologically sufficient. TFR stable or declining slowly from cultural factors. Biological capacity exceeds cultural demand.",
    thresholdPhase2Title: "Phase 2: Threshold Crossed",
    thresholdPhase2Desc: "Cumulative T loss exceeds ~40%. Rising male subfertility (T < 300 ng/dL). TFR accelerates downward as biological capacity becomes the binding constraint. Pronatalist programs begin failing.",
    thresholdPhase3Title: "Phase 3: Biological Limit",
    thresholdPhase3Desc: "TFR drops below 1.0. Biological incapacity dominates. Even motivated couples require assisted reproduction. IVF demand grows exponentially.",
    thresholdMathTitle: "Mathematical formulation",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_cultural(t), TFR_bio(t) )",
    thresholdMathExplain: "When TFR_bio < TFR_cultural, biological capacity is the binding constraint. The sigmoid transition at ~40% cumulative T loss produces the observed pattern: decades of stability followed by rapid collapse.",
    thresholdTableTitle: "Country parameters",
    thresholdTableCountry: "Country",
    thresholdTableRate: "r (%/yr)",
    thresholdTableSource: "Source",
    thresholdTableCumul: "Cumul. 2024",
    thresholdTableThreshold: "Threshold yr",
    thresholdTablePhase: "Phase",
    thresholdFinlandTitle: "Retrospective validation: Finland",
    thresholdFinlandText: "Finland is the model's Rosetta Stone. [[ref:perheentupa2013|Perheentupa (2013)]] documents a 37% cohort-dependent T decline (n=3,271, 1972–2002). TFR remained stable at 1.63–1.87 for 40 years (1970–2010), then collapsed to 1.26 by 2024. The ~35-year delay from T decline onset to TFR collapse is consistent with cumulative biological erosion reaching the threshold. If the model had existed in 2005, it could have predicted Finland's collapse 10–15 years early.",
    thresholdProjectionsTitle: "Country TFR projections",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "Interactive threshold model",
    thresholdFootnoteDenmark: "[[ref:andersson-2007-denmark|Andersson 2007]] reported a null result after BMI adjustment. The model interprets BMI as a mediator (EMF → metabolic disruption → BMI ↑ → T ↓), not a confounder — adjusting for BMI removes part of the signal. See causal structure section below.",
    thresholdFootnoteEstimated: "No peer-reviewed secular T trend study available. Korean rate estimated from highest global EMF density; Japanese rate estimated by analogy with Finland's documented decline. These are provisional and will be updated when direct data become available.",
    thresholdCaveat: "T decline rates are age-independent secular trends from peer-reviewed longitudinal studies. Korean and Japanese rates are estimates. The 40% threshold is calibrated, not derived. Projections assume continuation of current rates.",

    causalStructureTitle: "Why BMI does not explain the decline",
    causalStructureLead: "A persistent objection holds that rising obesity, not an environmental exposure, explains the secular testosterone decline. Formal causal analysis using Pearl's framework reveals that BMI is a mediator (on the causal pathway), not a confounder (independent cause). Adjusting for a mediator removes real signal.",
    causalDagConventionalTitle: "Conventional interpretation",
    causalDagConventionalCaption: "BMI as confounder: adjustment is correct, null result = no decline",
    causalDagBermTitle: "BERM interpretation",
    causalDagBermCaption: "BMI as mediator: adjustment removes mediated signal, null = overcorrection",
    causalMazurTitle: "The weight-stable test: [[ref:mazur2013|Mazur et al. 2013]]",
    causalMazurText: "991 US Air Force veterans tracked across 6 measurement waves over 20 years (1982-2002). Men who maintained their weight still lost 117 ng/dL (19%) of their testosterone. This is a natural experiment that controls for BMI without statistical adjustment.",
    causalMazurQuote: "We have not identified the reason for secular decline in testosterone, but we exclude increasing obesity as a sufficient or primary explanation.",
    causalMazurSource: "[[ref:mazur2013|Mazur, Westerman & Mueller 2013]], PLOS ONE",
    causalPathwayTitle: "Quantitative pathway decomposition",
    causalPathwayDirect: "Direct pathway",
    causalPathwayDirectDesc: "EMF -> Cav3.2/melatonin/cortisol -> T decline",
    causalPathwayDirectEst: "~117 ng/dL / 20yr (~67%)",
    causalPathwayMediated: "Mediated pathway",
    causalPathwayMediatedDesc: "Candidate mediated path: EMF ?→ metabolic change ?→ BMI increase → aromatase/SHBG change → T change",
    causalPathwayMediatedEst: "~58 ng/dL / 20yr (~33%)",
    causalPathwayCaveat: "These proportions are approximate, derived from [[ref:mazur2013|Mazur 2013]] (weight-stable vs weight-gain groups). Formal mediation analysis (SEM) could refine these estimates.",
    dagDietLifestyle: "Diet / Lifestyle",
    dagBmiAdjCorrect: "BMI adjustment: CORRECT",
    dagNullNoDecline: "null = no real decline",
    dagMetabolicPaths: "6 metabolic",
    dagPathways: "pathways",
    dagMediated: "mediated (~33%)",
    dagDirect: "direct (~67%)",
    dagOvercorrection: "BMI adjustment: OVERCORRECTION",
    dagRemoves: "removes ~33% of real signal",
    causalReconciliationTitle: "Reconciling 'contradictory' results",
    causalReconciliationLead: "When the causal structure is understood, all existing studies — including those reporting null results — become consistent:",
    causalReconciliationStudies: [
      { referenceId: "travison2007_v2", study: "Travison 2007", bmiAdj: true, result: "-1.0%/yr", interpretation: "Direct pathway captured (BMI-adjusted). ELF-priming grew over the same period (WiFi + 3G spread)" },
      { referenceId: "mazur2013", study: "Mazur 2013", bmiAdj: false, result: "-0.95%/yr", interpretation: "Direct pathway confirmed naturally (weight-stable). 20yr = layers 2→4. Direct route ~67%. Priming: P grew 1.5 → 2.0 in same period" },
      { referenceId: "chodick-2020-israel", study: "Chodick 2020", bmiAdj: false, result: "-1.02%/yr", interpretation: "Total effect (direct + mediated). Israel: high RF density → strong layering effect" },
      { referenceId: "santi2025", study: "Santi 2025", bmiAdj: true, result: "T and LH decline", interpretation: "Direct pathway + HPG disruption confirmed. LH↓ indicates pituitary disruption. Brain is most primed organ (near-field 24/7). CACNA1C genotype moderates LH response" },
      { referenceId: "andersson-2007-denmark", study: "Andersson 2007", bmiAdj: true, result: "Null", interpretation: "Mediated pathway dominates → BMI adjustment removes signal. Denmark 56°N: if study was in SUMMER → CRY saturated → smaller effect. Season correction may reveal signal" },
      { referenceId: "nyante2012_nhanes", study: "Nyante 2012", bmiAdj: true, result: "Null", interpretation: "Assay change + mediator removal → signal masked. US (60 Hz) vs Europe (50 Hz): different ELF frequency → possibly different CRY interference profile" },
    ],
    causalSantiTitle: "[[ref:santi2025|Santi 2025]]: both testosterone AND LH are declining",
    causalSantiText: "The largest meta-analysis ever conducted (1,064,891 men, 1971-2024) found that serum testosterone is declining independent of age, BMI, and assay method. Critically, it also found that LH (the pituitary signal that drives testosterone production) is also declining - ruling out simple testicular failure and pointing to disruption at the hypothalamic-pituitary level.",
    causalSantiMechanism: "BERM predicts exactly this: Route A (direct Leydig cell via Cav3.2 -> StAR) reduces testosterone, while Route B (melatonin -> GnRH) and Route D (cortisol -> HPG) reduce LH. The simultaneous decline of both hormones is the signature of multi-level disruption - not aging, not obesity.",
    causalSantiSource: "[[ref:santi2025|Santi et al. 2025]], J Endocrinol Invest 48:2721-2734",
    pocketTitle: "The Pocket Transition",
    pocketText: "The doubling of sperm decline rate after 2000 ([[ref:levine2023_sperm|1.16%→2.64%/yr]]) coincides with a single behavioral change: the phone moved from ear to pocket. 3G data capability meant the phone stayed in the pocket continuously rather than being used only for calls. Testes entered the near-field for 16 hours per day.",
    causalInverseTitle: "Inverse pharmacological test: testosterone therapy reverses obesity",
    causalInverseText: "If obesity caused testosterone decline, then raising testosterone should not affect weight. But testosterone therapy in hypogonadal obese men produces dramatic weight loss (up to 30 kg in class III obesity), confirming bidirectional causation: T suppression drives weight gain, not just the reverse.",
    causalInverseData: [
      { label: "Class I obesity", loss: "-16.3 kg", bmi: "-5.52" },
      { label: "Class II obesity", loss: "-25.3 kg", bmi: "-8.15" },
      { label: "Class III obesity", loss: "-30.5 kg", bmi: "-9.96" },
    ],
    causalInverseSource: "[[ref:saad2016|Saad et al. 2016]], registry studies",

    whyPronatTitle: "Why $200 billion couldn't raise South Korea's fertility",
    whyPronatText: "BERM's three-level architecture separates fertility into biological capacity (Level 1), EMF-behavioral coupling (Level 2), and cultural choice (Level 3). Pronatalist policies — cash bonuses, parental leave, childcare subsidies — target Level 3 (motivation). But when Level 1 (biological capacity) becomes the binding constraint, no amount of Level 3 incentive can compensate. South Korea's cumulative testosterone loss exceeds 48%. A growing fraction of couples who want children cannot conceive naturally. The $200 billion addressed the wrong level of the model.",
    whyPronatPrediction: "T-TFR-4: Korea's TFR will not sustainably exceed 1.0 through 2035, regardless of policy spending.",
    whyPronatFalsification: "Falsification: Korea TFR above 1.0 sustained for 3+ years.",

    bioFloorTitle: "The biological floor",
    bioFloorText: "Spermatogenesis requires intratesticular testosterone 50–100× serum concentration. When serum testosterone drops below ~200 ng/dL, spermatogenesis is severely impaired. At current decline rates (1%/year from ~500 ng/dL baseline):",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "population mean, young men" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "below spermatogenic threshold" },
    ],
    bioFloorConsequence: "Below this floor, even IVF cannot use the man's own sperm. Donor sperm, testicular sperm extraction, or future technologies (in vitro spermatogenesis) become necessary. This is not speculation — it is arithmetic applied to measured decline rates.",

    sixFactorTitle: "Why testosterone is the integration variable",
    sixFactorLead: "Testosterone is the single most informative biomarker in the BERM framework because six independent biophysical properties make it exceptionally sensitive to the EMF → VGCC → Ca²⁺ mechanism.",

    diseaseCascadesTitle: "Extended Disease Cascades",
    diseaseCascadesLead: "Eleven additional disease cascades derived from the VGCC gene family analysis. Each cascade links a specific VGCC subtype to a disease mechanism with its own evidence level.",
    diseaseCascades: [
      { num: 9, title: "Myopia", mechanism: "EMF → VGCC in dopaminergic amacrine cells → DA release disrupted → scleral elongation brake weakened + CRY → melatonin → circadian ocular growth dysregulated. THREE converging channels.", level: "M", trend: "22.9% (2000) → 34% (2020) → 50% (2050)" },
      { num: 10, title: "Autoimmune Diseases", mechanism: "EMF → chronic Ca²⁺ perturbation in T-cells → Ca²⁺-calcineurin-NFAT pathway dysregulated → autoreactive T-cell activation. Calcineurin inhibitors (cyclosporine, tacrolimus) are standard treatment — pharmacological confirmation.", level: "M|C", trend: "5% US prevalence, +19.1%/year globally" },
      { num: 11, title: "Hearing Loss & Tinnitus", mechanism: "EMF → Cav1.3 in inner hair cell synapses → chronic Ca²⁺ overload → excitotoxicity → synapse damage. Bluetooth/earphone EMF directly adjacent to cochlea.", level: "M|C", trend: "17.7% young adults report tinnitus; 1B+ at risk" },
      { num: 12, title: "Migraine", mechanism: "CACNA1A (P/Q-type) GoF → CSD. CACNA1I (Cav3.3) variants → hemiplegic migraine (OR 2.30). Female:male 2.5-4.3:1 consistent with sex-differential VGCC.", level: "E", trend: "Prevalence increasing; onset age 12-17" },
      { num: 13, title: "Sleep Architecture Disruption", mechanism: "Cav3.3 in nRt → spindle pacemaking. Cav3.1 in TC neurons → delta waves. T-type window current → slow oscillation. EMF → spindle/delta disruption → sleep quality ↓.", level: "M|C", trend: "Insomnia rising; sleep duration declining globally" },
      { num: 14, title: "PCOS", mechanism: "4-organ convergence: pancreas β-cell (Cav1+3 → insulin ↓) → hyperinsulinemia → theca androgen ↑ + granulosa aromatase → E2 ↓ + pituitary Cav3 → LH/FSH ↑. All four EMF-sensitive.", level: "M", trend: "5-20% reproductive-age women; rising through 2035" },
      { num: 15, title: "Chronic Pain", mechanism: "Cav3.2 is PRIMARY pain channel in DRG nociceptors. Upregulated in inflammatory/neuropathic pain. Female DRG neurons show more prominent Cav3.2 currents → sex difference.", level: "M|C", trend: "Chronic pain epidemic; hundreds of millions affected" },
      { num: 16, title: "Cardiac Arrhythmia (QT)", mechanism: "CACNA1C GoF → Cav1.2 window current ↑ → QT ↑. Timothy syndrome: extreme QT + autism from SAME mutation.", level: "E", trend: "Timothy: most die before age 3 without treatment" },
      { num: 17, title: "Neurodevelopment & Sexual Differentiation", mechanism: "7 causal channels × 3 developmental windows. Prenatal: Leydig Cav3 → T↓, aromatase, pituitary. Pubertal: PFC, melatonin, OT/AVP, insular cortex.", level: "L*", trend: "Gender clinic referrals: Sweden +19,700%; ASD-GD 6-26%" },
      { num: 18, title: "TheraBionic: Proof of Mechanism", mechanism: "FDA-approved (2019) device for HCC. 27.12 MHz, AM at tumor-specific frequencies. SAR 100-1000× below phone. Mechanism: EMF → Cav3.2 → Ca²⁺ → HCC differentiation. CONFIRMS non-thermal EMF → VGCC.", level: "E", trend: "34% survival increase in advanced HCC" },
      { num: 19, title: "Metabolic Syndrome / Obesity", mechanism: "SIX converging EMF → Ca²⁺ pathways: (1) hypothalamic appetite ↑ via ARC glia Ca²⁺ → AgRP/NPY, (2) BAT thermogenesis ↓ via CaMKII/CREB → UCP1 and SERCA2b/RyR2 disruption, (3) β-cell insulin dynamics ↓ via L-type VGCC, (4) thyroid axis → metabolic rate ↓ via Cav3 in thyrotrophs, (5) melatonin → metabolic circadian disruption, (6) adipocyte Ca²⁺ → lipogenesis ↑. CaMKII is the CONVERGENCE MOLECULE connecting all pathways. [[ref:klimentidis2010|Klimentidis]] paradox: 24 populations, 8 species ALL gaining weight (p = 1.2×10⁻⁷) including lab animals on controlled diets. Obesity is multifactorial — EMF is ONE contributing factor explaining the residual that diet/exercise/genetics cannot.", level: "M", trend: "Global obesity: 4% (1975) → 13% (2016) → 42% (USA 2024)" },
    ],
    vgccDiagramTitle: "VGCC Gene Family",
    vgccDiagramSubtitle: "Six genes, six disease clusters, one mechanism",
    emfBarTitle: "EMF sensitivity hierarchy at resting potential",
    emfBarSubtitle: "Relative activation probability at ~−70 mV membrane potential",

    epistemic:
      "Epistemic note: The equations above are the current model specification (BERM v17). Parameter values are calibrated against observed data and will be updated as new evidence becomes available. The model is explicitly designed to be falsifiable -- if its predictions fail, the model is wrong. The Therapeutic Device Paradox (24+ regulatory-approved non-thermal EMF device categories, DC to UV) establishes non-thermal bioactivity as regulatory fact, not hypothesis.",
    lbermRef:
      "Formal Jacobian product structure (chapter 17), proof-obligation register and safety systems are described in the base document (LBERM_final.docx).",
    svgSpermDamage: "Sperm damage",
    svgCircadian: "Circadian",
    svgMelatoninDown: "Melatonin ↓",
    svgCa2Entry: "Ca²⁺ entry",
    svgCortisolUp: "Cortisol ↑",
    svgTestosteroneDown: "Testosterone ↓",
    svgAutophagyDown: "Autophagy ↓",
    svgCellGrowthDown: "Cell growth ↓",
    svgTfr: "TFR",
    svgDecline: "decline",
    svgFiveRoutesAria: "Five routes to TFR decline",
    brainModulomeLink: "Brain modulome",
    routeGonadal: "Gonadal",
    routeAutonomic: "Autonomic",
    routeNeurodevel: "Neurodevel.",
    routeLabel: "Route",
    routeParallelCaption: "Each route is independently sufficient — they operate in parallel",
    labelWarning: "Warning",
    labelPrediction: "Prediction",
    labelFalsification: "Falsification",
    colStudy: "Study",
    colBmiAdj: "BMI adj.",
    colResult: "Result",
    colBermInterpretation: "BERM interpretation",
    countryDenmark: "Denmark",
    countryFinland: "Finland",
    countrySouthKorea: "South Korea",
    countryJapan: "Japan",
    estHighestEmf: "Estimated (highest EMF)",
    estFinlandAnalogy: "Estimated (Finland analogy)",
    layerMilitaryRadar: "Military radar",
    layerWeatherRadar: "Weather radar",
    layerMobileNetworks: "Mobile networks",
    layerWindTurbines: "Wind turbines",
    layerDisplayTransition: "Display transition",
    layerSmartMeters: "Smart meters",
    layerIndoorLed: "Indoor LED",
    layerSolarInverters: "Solar inverters",
    layerStreetLed: "Street LED",
    pharmEvidenceLink: "Pharmacological evidence: 8 drug classes converging on BERM pathways →",
    svgVgccPathway: "VGCC pathway",
    svgAutophagy: "Autophagy",
    svgProteinSynthesis: "Protein synthesis",
    svgCellGrowth: "Cell growth",
    svgImmuneRegulation: "Immune regulation",
    svgIntegrator: "integrator",
    svgCalories: "Calories",
    svgAging: "Aging",
    svgCounteracts: "(counteracts)",
    svgFertilityDown: "Fertility↓",
    svgCancer: "Cancer",
    svgMtorSharedHub: "mTOR is the shared hub — three epidemics, one mechanism",
    svgInflammation: "Inflammation",
    svgCortisol: "Cortisol",
    svgMelatonin: "Melatonin",
    svgPosFeedback: "Positive feedback",
    svgNegFeedback: "Negative feedback",
    svgHub: "hub",
    svgFeedbackCaption: "17 positive feedback loops — any entry point activates the entire network",
    svgVgccHierarchyCaption: "T-type (Cav3) channels >> Cav1.3 (low-threshold L-type) >> Cav1.2 (action-potential only). CaMKII feedback shifts Cav3.2 threshold more negative over time.",
    svgRecoveryBarAria: "Recovery rates bar chart",
    svgRecoveryCaption: "Recovery rate (α): 1.0 = full recovery, 0.0 = irreversible",
    svgTechLayersAria: "Technology layers cumulative exposure chart",
    layerPowerGrid: "Power Grid",
    layerRadioTv: "Radio/TV",
    layerCellular: "Cellular",
    svgCumulativeExposure: "Cumulative exposure",
    svgTechLayersCaption: "Five technology layers: each generation stacks on previous ones",
    conventionalLabel: "Conventional:",
    layerExplanationLabel: "Layer explanation:",
    conventional: "Conventional",
    anomalyUnexplainedDecline: "Unexplained decline",
    anomalyUnexplained: "Unexplained",
    anomalyWifiLedLayers: "WiFi+LED layers",
    anomalySocialMedia: "Social media",
    anomalySomeTheory: "Social media",
    anomalyTripleChannel: "Triple channel",
    anomalySedentary: "Sedentary",
    anomaly247Emf: "24/7 EMF",
    anomalyProsperity: "Prosperity",
    anomalyElectrificationLag: "Electrification lag",
    anomalyPhysicalLabor: "Physical labor",
    anomalyZeroLayers: "Zero layers",
    colCountry: "Country",
    colActual: "Actual",
    colNote: "Note",
    countryFinlandName: "Finland",
    countrySouthKoreaName: "South Korea",
    countryUsaName: "USA",
    countryAmishName: "Amish",
    colDriver: "Driver",
    replacementLabel: "Replacement",
    countrySKoreaShort: "S. Korea",
    countryIndiaName: "India",
    colAxis: "Axis",
    colTargetOrgan: "Target organ",
    colConsequence: "Consequence",
    svgGenesCascadeAria: "15-gene cascade diagram",
    tierInflux: "INFLUX",
    tierModulation: "MODULATION",
    tierIntegration: "INTEGRATION",
    tierExtrusion: "EXTRUSION",
    tierSignaling: "SIGNALING",
    svgGenesCascadeCaption: "Ca²⁺ cascade: 15 genes across five functional tiers",
    colGene: "Gene",
    colProtein: "Protein",
    colBermRole: "BERM role",
    colKeyVariant: "Key variant",
    colDiseases: "Diseases",
    colEvidence: "Evidence",
    colVariant: "Variant",
    colEffect: "Effect",
    ehsAssay: "assay",
    ehsLymphocyte: "Lymphocyte autophosphorylation",
    ehsElevated: "Elevated",
    ehsGenotyping: "genotyping",
    ehsCalciumVariants: "Calcium channel variants",
    ehsRiskAlleles: "Risk alleles",
    ehsSignalingMarkers: "Signaling markers",
    ehsHighRisk: "High-risk profile",
    ehsPolygenicScore: "Polygenic risk score",
    ehsOverallAssessment: "Overall EMF sensitivity assessment",
    ehsDiagnosticClass: "EHS diagnostic classification",
    ehsLowModHigh: "Low / Moderate / High",
    whyDisagreeTitle: "Why Studies Disagree",
    whyDisagreeSub: "Eight uncontrolled moderators explain decades of 'contradictory evidence'",
    whyDisagreeDesc: "EMF research has produced contradictory results for decades. BERM identifies eight uncontrolled moderators that predict which studies find positive results and which find null:",
    modSeason: "Season",
    modSeasonDesc: "CRY magnetoreceptor sensitivity is light-dependent. In winter, CRY is more sensitive → EMF effect on melatonin is stronger. Demonstrated in calves ([[ref:halgamuge2015|Halgamuge 2015]]).",
    modGenotype: "Genotype",
    modGenotypeDesc: "CACNA1C rs1006737 A-allele → more Cav1.2 → larger Ca²⁺ response. [[ref:sousouri2025|Sousouri 2025]] (ETH): CACNA1C genotype determines 5G sleep response.",
    modLabElf: "Laboratory ELF background",
    modLabElfDesc: "50/60 Hz power grid upregulates VGCC expression in 8–10 days ([[ref:sun2016_elf_vgcc|PMC4757866]]). High-ELF-background labs 'prime' cells.",
    modNighttimeEmf: "Nighttime EMF",
    modNighttimeEmfDesc: "Wi-Fi router in bedroom vs. EMF-free night → different CaMKII recovery state → different baseline Ca²⁺ when entering the experiment.",
    modSpeciesPriming: "Species / Priming",
    modSpeciesPrimingDesc: "Animal studies in lab environments (24/7 ELF priming, homogeneous genetics) find positive results 92% of the time. Human studies with heterogeneous environments find 35%. Both correct — lab animals are chronically primed (VGCC expression elevated, [[ref:sun2016_elf_vgcc|PMC4757866]]). p=0.002.",
    modDuration: "Duration",
    modDurationDesc: "Chronic exposure (>1 week) produces positive results 92%. Acute (1–2 nights) produces 31%. CaMKII autophosphorylation requires cumulative Ca²⁺ loading. p=0.001.",
    modPulsation: "Pulsation",
    modPulsationDesc: "Pulsed signals produce positive results 88%. CW produces 48%. IFO-VGIC mechanism requires varying fields. p=0.048.",
    modVitaminD: "Vitamin D status",
    modVitaminDDesc: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C/1D mRNA ([[ref:vdh_lvscc|J Neurosci 2001]]). Vitamin D deficiency → VGCC over-expression = same state as ELF-priming. Studies in vitamin D-deficient populations (winter, high latitudes) should show stronger EMF effects.",
    modThreePredictors: "Three moderators predict study outcome with statistical significance:",
    modAnalysisBasis: "Based on analysis of 29 studies across 3 endpoints. Validated by [[ref:weller2025_dna|Weller 2025]] (n=517).",
    predRepl1Label: "Prediction REPL-1: ",
    predRepl1Desc: "A retrospective analysis of 50–100 published EMF bio-assay studies will show these eight moderators significantly predict positive vs. null outcomes. Testable WITHOUT new data.",
    modEpistemicNote: "Epistemic level: the eight-moderator framework is BERM's synthesis (M-level). Individual moderators have empirical support (E-level).",
    dnaBelow58Title: "58% of DNA Damage Occurs Below ICNIRP Limits",
    dnaBelow58Desc: "[[ref:weller2025_dna|Weller et al. (2025)]] analyzed 517 genotoxicity studies and found that 58% of studies reporting DNA damage used exposure levels BELOW current ICNIRP guidelines. The [[ref:ivancsits_dna_recovery|Ivancsits study]] found DNA strand breaks at 35 µT — less than one-fifth of ICNIRP’s 200 µT occupational limit.",
    dnaBelow58Mechanism: "ICNIRP limits are designed to prevent THERMAL effects. DNA damage from EMF is a NON-THERMAL mechanism operating through voltage-gated calcium channel dysfunction.",
    dnaRepairTitle: "DNA Damage Reverses in 9 Hours — If Exposure Stops",
    dnaRepairDesc: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]] showed that EMF-induced DNA strand breaks returned to normal within 9 hours after exposure ceased. This quantifies BERM’s recovery window: the body CAN repair EMF-induced damage, but only if given sufficient EMF-free time.",
    dnaModernEnv: "Modern environments with 24/7 WiFi, LED lighting, and smartphones in bed eliminate this recovery window entirely. The typical modern bedroom provides zero EMF-free recovery time.",

    twoLevelTitle: "Two-Level Prediction Model",
    twoLevelSub: "Level 1 (cross-sectional) + Level 2 (temporal testosterone dynamics)",
    twoLevelLead: "The cross-sectional model positions countries on the global TFR curve via electrification threshold. The temporal model adds a second level: testosterone secular decline provides within-country dynamics via the T→TFR lag relationship.",
    twoLevelL1: "Level 1: Electrification threshold",
    twoLevelL1Desc: "TFR = 4.11 × exp(−54 × EMF_index) + 1.55. Positions countries from Niger (low EMF, high TFR) to Korea (high EMF, low TFR). R² = 0.851 on 54 countries. This captures infrastructure saturation, not EMF dose.",
    twoLevelL2: "Level 2: Testosterone trajectory",
    twoLevelL2Desc: "T(year) = 638 × (1 − 0.012)^(year − 1982). The ~1.2%/year age-independent decline (Travison 2007, Lokeshwar 2021) is lagged 8 years against TFR. Transfer function: TFR = 0.00544 × T − 0.745. On USA 2007–2024, R² = 0.97.",
    twoLevelCombined: "Combined prediction: Level 1 sets the cross-sectional baseline; Level 2 modulates it over time. Countries with high EMF index AND long T-decline exposure get the lowest predicted TFR.",
    twoLevelCaveat: "The two levels are independent — neither proves the other. Level 2 is calibrated on USA only. The 0.97 R² is in-sample and likely inflated. Out-of-sample validation requires other countries with harmonised longitudinal T data.",
    twoLevelDiagnostic: "LH–T diagnostic: Santi et al. 2025 showed simultaneous LH↓ and T↓ in populations — consistent with hypothalamic suppression (EMF pathway) rather than testicular damage (EDC pathway).",
  },
  fi: {
    title: "Mallin dokumentaatio",
    subtitle:
      "Bio-sähkömagneettisen lisääntymismallin (BERM) täydellinen dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, kytkentäyhtälöt ja palautumisdynamiikka.",
    metaTitle: "Mallin dokumentaatio - Extinction Field",
    metaDesc:
      "BERM-mallin dokumentaatio: kolmitasoinen arkkitehtuuri, kausaalireitit, yhtälöt ja palautumisdynamiikka.",
    specNote: "BERM on selitys-, johtamis- ja ennustemalli. FieldState v2 on erillinen valinnainen mittaus-, havainto- ja estimointimoduuli — ei mallin alias eikä kausaalinen juuri. Lukitut v17-tulokset käyttävät kansallista teknologian ajoitusproxya eivätkä ole FieldState-kalibroituja. BERM johtaa nyt ehdollisen formaalin geometria–havaittava-operaattorin; sen gauge, mittakaava, kudosytimet ja päätepistekalibraatio ovat avoimia.",

    physBioTitle: "Fysiikasta biologiaan",
    physBioSub: "Lindgren-premissi, johdettu geometria, ehdollinen BERM-vaste ja avoin kudoskalibraatio",
    physBioLead: "Vuoden 2025 Lindgren-ansatz on BERM:n teoreettinen premissi. BERM johtaa ehdollisesti formaalin vasteoperaattorin lisäämällä minimaalisen materia–metriikka-kytkennän ja vastefunktion. Lindgren ei anna gauge-reseptiä, mittakaavaa, kudosytimiä, SHBG-/AR-/ZIP9-kertoimia eikä ihmispäätepisteiden kalibraatiota; ne pysyvät avoimina mallikysymyksinä.",
    physBioGMETitle: "Lindgrenin geometrinen metriikkalaajennus",
    physBioGMEDesc: "Standardifysiikassa sähkömagneettinen kenttä on erillinen entiteetti, joka etenee aika-avaruudessa. Lindgrenin geometrisessa mallissa EM-kenttä on koodattu suoraan metriikkatensoriin:",
    physBioGMEFormula: "g_μν = η_μν + κ A_μ A_ν",
    physBioGMEExplain: "missä η_μν on tasainen Minkowskin metriikka, A_μ sähkömagneettinen nelipotentiaali ja κ eksplisiittinen dimensionaalinen kytkentäasteikko. BERM johtaa premissistä δg:n tarkasti. Kudosvaste seuraa vain ehdollisesti nimetyn vasteytimen kautta; alavirran biologia ei ole metriikan automaattinen seuraus.",
    physBioChiTitle: "Johdettu χ_geo-koordinaatti",
    physBioChiDesc: "Eksplisiittisesti normalisoidulle positiivinormiselle moodille χ_geo(ρ)=ρ/√(1+ρ²) on käänteisen rank-one-metriikan korjauksen neliöjuuriamplitudi. Geometrinen koordinaatti on johdettu; sen tulkitseminen kudosherkkyydeksi tai käyttö arkistoidun v17-teknologiaproxyn painona on edelleen kalibroimatonta BERM-mallinnusta.",
    physBioChiFormula: "ρ² = κ A² ≥ 0,    χ_geo(ρ) = ρ / √(1 + ρ²)",
    physBioChiExplain: "Koordinaatti ei anna universaalia biologista valintasääntöä. CRY-tausta, kalvojännite, esteen eheys ja teknologian leviäminen pysyvät erillisinä muuttujina, joilla on erikseen testattavat vastefunktiot; samanmuotoinen v17-proxypaino säilyy vain legacy-vertailuna.",
    physBioSuperTitle: "Neliöllinen sekoittuminen ennen biologiaa",
    physBioSuperDesc: "Sähkömagneettiset kentät noudattavat edelleen tavallista superpositioperiaatetta. Koska Lindgrenin ansatz on potentiaalin suhteen neliöllinen, metriikka-ajuri sisältää täsmälliset tausta–häiriö-ristitermit ja itseistermin. Tämä osoittaa sekoittumisen malligeometriassa, ei biologisen vaikutuksen ei-additiivisuutta.",
    physBioSuperFormula: "δg_μν = κ(Ā_μa_ν + a_μĀ_ν + a_μa_ν)",
    physBioSuperExplain: "Amplitudimodulaatio ja kaksitaajuussyöte synnyttävät siten a²:ssa täsmälliset matalataajuiset verhokäyrä- tai erotustaajuustermit. Kudosytimestä riippuu, havaitseeko kudos ne ja onko päätepistevaste additiivinen. Yhdistelmäaltistustutkimukset ([[ref:juutilainen2006_superposition|Juutilainen ym. 2006]]) motivoivat testiä mutta eivät kalibroi operaattoria.",
    physBioSuperLink: "Katso täydellinen superpositioanalyysi →",
    physBioTissueTitle: "Kudostarkka resonanssi",
    physBioTissueDesc: "BERM tuo kudoskohtaisen ionikanavakoostumuksen, kalvo-ominaisuudet ja ehdotetut vasteikkunat biologisina tietoina ja ehdottaa niiden perusteella heterogeenista herkkyyttä. Ne kuuluvat kudosytimeen Ξ_i ja vaativat kalibroinnin; ne eivät seuraa yksin χ_geo:sta:",
    physBioTissues: [
      { tissue: "Kivekset (Leydigin solut)", channels: "Cav3.2 (T-tyyppi), korkea tiheys", chi: "Erittäin korkea", reason: "Ikkunavirta levossa; StAR-proteiini Ca²⁺-riippuvainen" },
      { tissue: "Hypotalamus", channels: "Cav3.1, Cav3.3", chi: "Erittäin korkea", reason: "Synaptisten vesikkelien vapautus synaptotagmiini 1:n kautta" },
      { tissue: "Hippokampus", channels: "Cav3.2, Cav1.3", chi: "Korkea", reason: "LTP/LTD Ca²⁺-riippuvaisia; neurogeneesivyöhyke" },
      { tissue: "Verkkokalvo (siniset tappisolut)", channels: "CRY1/CRY2 + TRPC1", chi: "Korkea (valoriippuvainen)", reason: "Radikaaliparin magnetoreseptio; FAD-riippuvainen" },
      { tissue: "SA-solmuke (sydän)", channels: "Cav1.3, Cav3.1", chi: "Kohtalaisen korkea", reason: "Tahdistinvirta; matalan kynnyksen aktivaatio" },
      { tissue: "Luurankolihas", channels: "Cav1.2 (L-tyyppi)", chi: "Matala levossa", reason: "Korkea aktivaatiokynnys (−30 mV); merkittävä vain aktiopotentiaalien aikana" },
    ],
    physBioVerifyTitle: "Ulkoisen yhteensopivuuden havainnot",
    physBioVerifySub: "Neljä näyttölinjaa motivoi taustariippuvaisia testejä; yksikään ei kalibroi χ_geo:ta kudosherkkyydeksi",
    physBioVerifications: [
      { id: "V1", title: "Geomagneettinen kuolleisuus (263 kaupunkia)", desc: "Raportoidut kuolleisuuden ja geomagneettisten myrskyjen yhteydet motivoivat viiveellisen tausta × päätepiste -testin. Ne eivät tunnista χ_geo:ta biologiseksi mediaattoriksi eivätkä kalibroi kudosydintä ([[ref:vencloviene2022_geomag_mortality|Venclovienė ym. 2022]]).", level: "C" },
      { id: "V2", title: "Leveysaste × sydäntaudit (204 maata)", desc: "Maantieteellinen vaihtelu voi motivoida esirekisteröidyn geomagneettisen interaktiotestin, mutta leveysasteella on lukuisia kilpailevia reittejä eikä se yksin tunnista BERM-vastekerrointa ([[ref:feigin2014_latitude_cvd|Feigin ym. 2014]]).", level: "C" },
      { id: "V3", title: "HRV × Kp-indeksi", desc: "Raportoitu HRV–Kp-yhteisvaihtelu tarjoaa ehdokkaan autonomiseksi päätepisteeksi kohdistettuihin kenttä- ja fysiologiamittauksiin. Se on yhteensopivuusnäyttöä, ei χ_geo-välitteisen kudoskytkennän johtaminen ([[ref:mccrary2021_hrv_geomag|McCrary ym. 2021]]).", level: "C" },
      { id: "V4", title: "Yhdistelmäaltistukset (172 tutkimusta)", desc: "Systemaattinen katsaus motivoi interaktio- ja aaltomuotoriippuvuuden testejä. Heterogeeninen biologinen ei-additiivisuus ei suoraan vahvista Lindgrenin neliöllistä termiä eikä BERM:n kudosydintä ([[ref:juutilainen2006_superposition|Juutilainen ym. 2006]]).", level: "M" },
    ],

    solarBioTitle: "Aurinko-biologinen yhteys",
    solarBioSub: "Aurinkosyklihavaintoja geomagneettisen vasteytimen ehdokastesteinä",
    solarBioLead: "Jos kalibroitu kudosydin riippuu geomagneettisesta taustasta, aurinkoaktiivisuus voisi tuottaa mitattavia biologisia oskillaatioita. Alla olevat havainnot motivoivat hypoteesia; ne eivät tunnista χ_geo:ta biologiseksi vasteeksi eivätkä osoita kausaalisuutta.",
    solarBioCycleTitle: "Auringon sykli → syntyvyyden syklisyys",
    solarBioCycleDesc: "Yhdysvaltojen ja Uuden-Seelannin syntyvyysvaihtelua on verrattu 11 vuoden aurinkosykliin. BERM käsittelee tätä luonnollisen kokeen ehdokassignatuurina, ei näyttönä χ_geo:n noususta tai hedelmöittymisen muutoksesta ehdotetun kudosytimen kautta ([[ref:lehrer2017_solar_births|Lehrer & Lehrer 2017]]).",
    solarBioCycleNote: "BERM ehdottaa testattavaa ketjua aurinkoaktiivisuus → geomagneettinen häiriö → melatoniinimuutos → GnRH-pulssimuutos → hedelmöittymisluvun muutos. Viiveellinen asetelma valojakso- ja trendikontrolleineen voisi testata ketjua; sykli ei yksin erottele geomagnetismia muista jaksollisista tekijöistä.",
    solarBioBirthTitle: "Syntymäajankohta → sairausriski",
    solarBioBirthDesc: "237 000 potilaan kohortissa havaittiin syntymäkuukauden yhteyksiä useisiin myöhempiin diagnooseihin ([[ref:boland2015_birth_month|Boland ym. 2015]]). Se ei tunnista geomagneettista altistusta eikä χ_geo:ta; BERM käyttää havaintoa vain perusteena tutkimukselle, joka mittaa erikseen raskausajan kentän, vuodenajan, infektiot, ravitsemuksen ja saasteet.",
    solarBioBirthNote: "Kehitysvaihe on uskottava herkkyysikkuna, mutta geomagnetismi → VGCC/CRY → organogeneesi on kalibroimaton BERM-propositio, ei syntymäkuukausitutkimuksen tulos.",
    solarBioDampenTitle: "Kausiamplitudin vaimeneminen",
    solarBioDampenDesc: "Kreikan syntyvyyden kausiamplitudin raportoitiin pienentyneen vuosina 1960–1992 ([[ref:lerchl1998_birth_seasonality|Lerchl 1998]]). Sähköistyminen on yksi BERM:n ehdokasselitys kaupungistumisen, ehkäisyn, ilmastoinnin ja sosiaalisen ajoituksen rinnalla; havainto ei mittaa EMF- eikä χ-vastetta.",
    solarBioDampenNote: "Erotteleva ennuste: vaihtoehdot kontrolloituina myöhemmän sähköistymisen pitäisi ennustaa myöhempää vaimenemista. Tämä on prospektiivinen mallikoe, ei kuvaus Saharan eteläpuolisten populaatioiden nykytilasta.",

    threeBandsTitle: "Kolme biologista taajuuskaistaa",
    threeBandsSub: "ULF · ELF · RF — luonnolliset ja antropogeeniset lähteet kartoitettu BERM-poluille",
    threeBandsLead: "Biologiset järjestelmät vuorovaikuttavat sähkömagneettisten kenttien kanssa kolmella erillisellä taajuuskaistalla, joista kullakin on eri fysikaaliset mekanismit ja biologiset kohteet.",
    twoSuscTitle: "Geometriakoordinaatti ja biologiset vaste-ehdokkaat",
    twoSuscSub: "χ_geo-geometria + χ_B-spin-kemiallinen ehdokas",
    twoSuscLead: "BERM erottaa johdetun χ_geo-koordinaatin biologisista vastefunktioehdokkaista. Niitä ei voi kertoa keskenään tai tulkita kokonaisherkkyydeksi ennen päätepistekohtaisen vasteytimen mittaamista.",

    bioCivTitle: "Biologiasta sivilisaatioon",
    bioCivSub: "10-vaiheinen kausaaliketju molekyylitason EMF-vaikutuksista sivilisaation seurauksiin",
    bioCivLead: "BERM soveltaa biologisesti reduktionistista, kompositionaalista hypoteesia molekyyli- ja hormonitiloista yksilökäyttäytymisen kautta populaatioaggregaatteihin. Alla oleva ketju esittää ehdotetun etenemisen fysikaalisesta syötteestä sivilisaatiotulokseen. Erillisten lenkkien näyttö voi rajata ketjua, mutta koko monitasoketju ei ole empiirisesti suljettu eikä ryhmätason poliittista tulosta lueta takaisin yksilön hormonimittaukseksi.",
    bioCivChain: [
      { step: 0, title: "Mitattu tausta", desc: "Geomagneettiset ja ihmisen tuottamat kentät mitataan fysikaalisina syötteinä. BERM soveltaa sen jälkeen päätepistekohtaista vasteydintä; FieldState ei tuota biologista vastetta." },
      { step: 1, title: "EMF-häiriö", desc: "Ihmisen aiheuttamat kentät (ELF, IF, RF) häiritsevät geometrista taustaa muuttaen aika-avaruuden metriikkaa" },
      { step: 2, title: "VGCC-aktivaatio", desc: "Jänniteportilliset kalsiumkanavat — erityisesti T-tyyppi (Cav3) bifurkaatiopisteessä — reagoivat kenttähäiriöön Schwanin vahvistuksen kautta" },
      { step: 3, title: "Ca²⁺-kaskadi", desc: "Solunsisäinen kalsiumsignalointi häiriintyy: CaMKII-aktivaatio, mitokondriaalinen ROS, NF-κB-tulehdusreitti" },
      { step: 4, title: "Hormonihäiriö", desc: "Testosteroni, estrogeeni, melatoniini, oksitosiini, kortisoli ja BDNF vaikuttuvat Ca²⁺-riippuvaisten steroidogeenisten ja neuroendokriinisten reittien kautta" },
      { step: 5, title: "Yksilön käyttäytyminen", desc: "Riskinottokyky, sosiaalinen sitoutuminen, uniarkkitehtuuri, kognitio ja motivaatio muuttuvat neuroendokriinisten substraattien muuttuessa" },
      { step: 6, title: "Perheen muodostus", desc: "Sekä hedelmällisyyshalu (käyttäytyminen) että biologinen kapasiteetti (fysiologia) laskevat — kaksitasoinen romahdus" },
      { step: 7, title: "Institutionaalinen kapasiteetti", desc: "Kollektiivinen toiminta, strateginen suunnittelu ja institutionaalinen määrätietoisuus heikkenevät väestön hormonaalisen ja kognitiivisen substraatin heikentyessä" },
      { step: 8, title: "Sivilisaation dynamiikka", desc: "Käyttäytymisen aggregaatti tuottaa historioitsijoiden havaitsemat kaavat: pysähtyneisyys, riskien välttäminen, institutionaalinen jähmettyminen" },
      { step: 9, title: "Muuttogradientti", desc: "Biologinen kontrasti EM-ehtyneiden ja EM-eheiden populaatioiden välillä luo demografisia painegradientteja" },
      { step: 10, title: "Sykli tai yhdentyminen", desc: "Palautuminen jos EM-kuorma kevenee (α-termi), tai pysyvä yhdentyminen kun ihmisen aiheuttama saturaatio (σ) peittää auringon palautumisikkunan" },
    ],
    bioCivFormulaTitle: "BioCap-integraali",
    bioCivFormulaDesc: "Populaation kumulatiivinen biologinen kapasiteetti formalisoidaan BioCap-integraalina — juokseva saldo ehtymisen (ensimmäinen integraali) ja palautumisen (toinen integraali) välillä:",
    bioCivFormula: "BioCap_ehd(t,λ) = BioCap₀ − ∫₀ᵗ m_lat^ehd(λ)·[S(τ)+U(τ)+E(τ)]dτ + palautuminen",
    bioCivFormulaTerms: [
      { symbol: "S(τ)", desc: "Normalisoitu aurinkoaktiivisuus (ohjaa luonnollista geomagneettista häiriötä)" },
      { symbol: "U(τ)", desc: "Kaupungistumispainotettu EMF-altistus (väestötiheys × infrastruktuuri)" },
      { symbol: "E(τ)", desc: "Sähköistyspainotettu altistus (verkkotiheys × henkilökohtainen kulutus)" },
      { symbol: "m_lat^ehd(λ)", desc: "BERM:n ehdokasmoderaattori leveysasteelle; se ei ole χ_geo eikä kalibroitu biologinen kerroin" },
      { symbol: "α", desc: "Palautumiskerroin (biologinen korjausnopeus EM-kuorman pienentyessä)" },
      { symbol: "σ(τ)", desc: "Ihmisen aiheuttama EM-saturaatio — peittää auringon palautumisikkunan vuoden 1880 jälkeen" },
    ],
    bioCivEpistemic: "Tämä on BERM:n reduktionistinen kausaalihypoteesi. L2-tulo-operaattorin muoto on ehdollisesti johdettu, mutta sen kudosydin ja useat tasojen väliset aggregointilenkit ovat avoimia. Vaiheet 5–10 ovat testattavia malliseurauksia, eivät poliittisesta käyttäytymisestä pääteltyjä hormonimäärityksiä. BioCap-integraali on muodollinen ilmaus, ei validoiduilla kertoimilla sovitettu yhtälö.",

    biocapDecompTitle: "BioCap-hajotus",
    biocapDecompDesc: "BioCap hajoaa kahdeksaan mitattavaan biomarkkeriin. Jokaisella biomarkkerilla on paino, joka heijastaa sen suhteellista osuutta sivilisaatiokapasiteetista. Hajotus mahdollistaa sekä mittaamisen että ennustamisen.",
    biocapDecompFormula: "BioCap(t) = Σᵢ wᵢ · Bᵢ(t)",
    biocapDecompFormulaDesc: "missä Bᵢ(t) = biomarkkeri i:n normalisoitu taso hetkellä t, wᵢ = biomarkkerin paino",
    biocapDecompCultural: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)",
    biocapDecompCulturalDesc: "missä N(t) = väestö, η(t) = institutionaalinen tehokkuus",
    biocapDecompMarkers: [
      { symbol: "T", name: "Testosterone", weight: "+0.20", unit: "ng/dL", baseline: "600", current: "440", mechanism: "EMF → VGCC → Ca²⁺ → StAR↓ → T↓", evidence: "E (>1M)" },
      { symbol: "OXT", name: "Oxytocin", weight: "+0.20", unit: "pg/mL", baseline: "—", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → hypothalamic OXT↓", evidence: "M|C (proxy)" },
      { symbol: "DA", name: "Dopamine sens.", weight: "+0.15", unit: "D2R arb.", baseline: "1.0", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → DA synthesis↓ → D2R↓", evidence: "M|C (proxy)" },
      { symbol: "MEL", name: "Melatonin", weight: "+0.15", unit: "pg/mL", baseline: "80", current: "35", mechanism: "EMF → CRY/VGCC → SCN → mel↓ + PGC", evidence: "M|C" },
      { symbol: "BDNF", name: "BDNF", weight: "+0.10", unit: "ng/mL", baseline: "—", current: "—", mechanism: "EMF → VGCC → Ca²⁺ → CREB↓ → BDNF↓", evidence: "M|C (proxy)" },
      { symbol: "CORT", name: "Cortisol", weight: "−0.10", unit: "μg/dL", baseline: "12", current: "16", mechanism: "EMF → mel↓ → sleep↓ → HPA → CORT↑", evidence: "M|C" },
      { symbol: "D", name: "Vitamin D", weight: "+0.05", unit: "nmol/L", baseline: "70", current: "50", mechanism: "D↓ → VDR → VGCC↑ → EMF sensitivity↑", evidence: "E (7.9M)" },
      { symbol: "B2", name: "B2/FAD", weight: "+0.05", unit: "nmol/L", baseline: "—", current: "—", mechanism: "B2 → FAD → CRY stability + mito complex I/II", evidence: "M|C" },
    ],

    hormesisTitle: "Hormeettinen annosvastelaajennus",
    hormesisDesc: "BioCap-integraalin palautumistermi α olettaa vakion korjausnopeuden. Hormeettinen laajennus korvaa α:n annosriippuvaisella funktiolla h(Ā, δA), joka kuvaa kolme erillistä biologista vyöhykettä:",
    hormesisFormula: "h(Ā, δA) = { +α·δA  jos Ā < Ā_crit (vyöhyke 1: stimulaatio); α·δA·e^(−β·(Ā−Ā_crit))  jos Ā_crit ≤ Ā ≤ Ā_sat (vyöhyke 2: siirtymä); −γ·Ā  jos Ā > Ā_sat (vyöhyke 3: vain vahinko) }",
    hormesisTerms: [
      { symbol: "Ā", desc: "Keskimääräinen kumulatiivinen EM-altistus (integroitu populaation elinaikana)" },
      { symbol: "δA", desc: "Altistuksen vaihtelu (vaihtelun amplitudi keskiarvon ympärillä)" },
      { symbol: "Ā_crit", desc: "Kriittinen kynnys — tämän alla pieniannoksinen stressi aktivoi korjausjärjestelmiä" },
      { symbol: "Ā_sat", desc: "Saturaatiokynnys — tämän yllä korjausjärjestelmät ylikuormittuvat" },
      { symbol: "α", desc: "Hormeettinen stimulaatiokerroin (biologisen korjauksen aktivointinopeus)" },
      { symbol: "β", desc: "Siirtymän vaimenemiskerroin (kuinka nopeasti stimulaatio heikkenee Ā_crit:n yläpuolella)" },
      { symbol: "γ", desc: "Vahinkokerroin (nettobiologinen ehtymismäärä korkealla altistuksella)" },
    ],
    hormesisZone1: "Vyöhyke 1 (stimulaatio): Matala EM-altistus aktivoi DNA-korjauksen, mitokondriaalisen biogeneesin, immuunivasteen tehostumisen ja hormonaalisen optimoinnin. Tällä vyöhykkeellä olevat populaatiot ylläpitävät korkeaa biologista kapasiteettia.",
    hormesisZone2: "Vyöhyke 2 (siirtymä): Korjausjärjestelmät toimivat yhä, mutta eksponentiaalisesti heikkenevällä tehokkuudella. Populaatio osoittaa ristiriitaisia biomarkkereita — osa aktivaatiota, osa suppressiota.",
    hormesisZone3: "Vyöhyke 3 (vahinko): Korjausjärjestelmät ovat ylikuormittuneet. Nettobiologinen ehtyminen hallitsee. Tällä vyöhykkeellä useimmat teollistuneet populaatiot ovat sähköistyksen jälkeen.",
    hormesisEpistemic: "",

    archTitle: "Kolmitasoinen arkkitehtuuri",
    archDesc:
      "BERM erottelee syntyvyyden laskun kolmeen erilliseen kausaalitasoon. Jokaisella tasolla on oma dynamiikkansa, aikaskaalansa ja näyttöpohjansa. Maan kokonaishedelmällisyysluku (TFR) on kaikkien kolmen tason tulo, ei summa -- kukin toimii kertoimena muille.",
    archPredictionSource:
      "Sivuston lukitut maakohtaiset ennusteet tulevat v17-skalaarimallista. FieldState v2 -sivuhaara (/measurement/fieldstate) on valinnainen mittaus- ja estimointiprotokolla: se määrittelee, mitkä kenttäsuureet kirjataan ja miten, eikä se tuota maakohtaisia ennusteita.",
    level1Label: "Taso 1",
    level1Title: "Biologinen kapasiteetti",
    level1Desc:
      "Fysiologinen maksimaalinen hedelmällisyys nykyisten ympäristöaltistusten vallitessa. Sisältää siittiöiden laadun (pitoisuus, liikkuvuus, DNA-fragmentaatio), munasolujen laadun, hormonaalisen ympäristön ja veri-aivoesteen (BBB) eheyden. Tämä on taso, johon EMF-altistus vaikuttaa suorimmin.",
    level2Label: "Taso 2",
    level2Title: "EMF-käyttäytymiskytkentä",
    level2Desc:
      "Miten henkilökohtaisten laitteiden käyttö vuorovaikuttaa ympäristön EMF-altistuksen kanssa. Korkean ympäristöaltistuksen alueella puhelinta kantava henkilö kokee epälineaarisen kytkentävaikutuksen. Tämä taso kuvaa infrastruktuuritason ja henkilökohtaisen altistuksen välistä vuorovaikutusta.",
    level3Label: "Taso 3",
    level3Title: "Todellinen kulttuuri",
    level3Desc:
      "Vapaaehtoiset hedelmällisyysvalinnat biologisesta kapasiteetista riippumatta. Koulutus, kaupungistuminen, ehkäisyn saatavuus, taloudelliset mahdollisuudet ja kulttuuriset normit. Tämä komponentti on kaikissa demografisissa malleissa; BERM lisää biologiset ja EMF-tasot sen alle.",

    causalTitle: "Kausaalireittikaavio",
    causalDesc:
      "Kaavio näyttää BERM:n rekisteröidyt kausaalihypoteesit ja evidenssirajat. Lindgrenin metriikkahäiriö tulee johdettuna teoriapanoksena ja FieldState-havainnot sekä legacy-teknologiaproxy erillisinä päättelysyötteinä BERM:n ehdolliseen L2-vasteoperaattoriin. Kudosytimet ja endpoint-kertoimet ovat avoimia; alavirran biologiaa ei väitetä Lindgrenistä johdetuksi.",
    pathwayHierarchyNote:
      "Legacy-polkujen painot ja yhteisövertailut kuuluvat mallikalibrointiin, eivät teoreettiseen arvojärjestykseen. Raportoitu RPM:n algebrallinen vastaavuus, Schwanin kalvoarvio ja Cav3/HPG-kirjallisuus voivat rajata kudosytimiä, mutta eivät anna niiden arvoja. BERM pitää siksi RPM/CRY-, VGCC/ROS-, HPA/HPG- ja androgeeninkäyttöhaarat rinnakkaisina, falsifioitavina propositioina.",
    rpmFrequencyNote:
      "CRY/RPM ei vastaa RF-kantoaaltotaajuuteen (900 MHz – 3,5 GHz). Sen resonanssimaksimi on ~22,5 MHz ([[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]], Front. Quantum Sci. Technol. 4:1544473). Polun B biologisesti aktiiviset komponentit ovat geomagneettinen tausta (B_DC) ja telecom-signaalien ELF-modulaatioverhoilukäyrät (GSM 217 Hz, WiFi 10 Hz beacon). RF-kantoaallon vaikutukset välittyvät polku A:n kautta sähkökentän komponenttina. Kahdella polulla on toisiaan täydentävät taajuusalueet.",
    vgccHierarchyTitle: "VGCC-herkkyyshierarkia lepopotentiaalissa",
    vgccHierarchyNote:
      "Kaikki jänniteohjatut kalsiumkanavat eivät ole yhtä EMF-herkkiä. Lepopotentiaalissa (~−70 mV) EMF-herkkyys noudattaa hierarkiaa: Cav3 (T-tyyppi) >> Cav1.3 >> Cav1.2. T-tyypin kanavat (Cav3.1, Cav3.2, Cav3.3) toimivat bifurkaatiopisteessä, jossa ~10 % on avoinna levossa (ikkunavirta), mikä tekee niistä jatkuvasti herkkiä pienille jännitemuutoksille. Cav1.3 on 'matalan kynnyksen L-tyyppi', joka aktivoituu ~−50 mV:ssa — 25 mV negatiivisemmin kuin Cav1.2 (J Neurosci 2001). Tämä tekee Cav1.3:sta pääkanavan kudoksissa, jotka vaativat jatkuvaa matalan jännitteen kalsiumvirtaa: SA-solmun tahdistus ja sisäkorvan karvasolun synaptinen transduktio. Cav1.2, kanoninen L-tyyppi, aktivoituu ~−30 mV:ssa ja on merkittävä VAIN aktiopotentiaalin aikana — levossa sen osuus on mitätön. Tämä hierarkia selittää kudostarkan EMF-haavoittuvuuden: Cav3-valtaiset elimet (kivekset, aivolisäke, lisämunuainen, hippokampus) ovat herkimpiä; Cav1.3-riippuvaiset kudokset (sisäkorva, SA-solmu) ovat välitasoa; Cav1.2-valtaiset kudokset (luurankolihas, kammiosydän) vaikuttuvat vain sähköisen aktiivisuuden aikana.",
    camkiiTitle: "CaMKII-positiivinen takaisinkytkentä: kumulatiivinen herkistyminen",
    camkiiNote:
      "Kriittinen löydös BERM:n kumulatiivisen altistusmallin kannalta: CaMKII:n (kalsium/kalmoduliini-riippuvainen proteiinikinaasi II) fosforylaatio siirtää Cav3.2:n aktivaatiokynnystä NEGATIIVISEMPAAN suuntaan (PMC9913649). Tämä luo positiivisen takaisinkytkentäsilmukan: EMF → Cav3.2 Ca²⁺ -sisäänvirtaus → CaMKII:n aktivaatio → Cav3.2:n kynnys siirtyy vasemmalle → kanava tulee HERKEMMÄKSI EMF:lle → lisää Ca²⁺ -sisäänvirtausta. Tämä molekulaarinen mekanismi selittää, miksi EMF-vaikutukset ovat kumulatiivisia ajan myötä: jokainen altistusjakso tekee järjestelmästä herkemmän seuraaville altistuksille. CaMKII-takaisinkytkentä selittää myös, miksi lyhytaikaiset tutkimukset voivat aliarvioida pitkäaikaisvaikutuksia — herkistyminen kehittyy viikkojen tai kuukausien kuluessa. Farmakologinen ennuste: CaMKII-inhibiittorit (KN-93) estävät etenevän herkistymisen vaikuttamatta akuutteihin EMF-vasteisiin.",

    chiSub: "Saturaatiokäyrä ympäristö- × henkilökohtaisen altistuksen vuorovaikutukselle",
    chiTitle: "Johdettu χ_geo-koordinaatti ja v17:n legacy-proxy",
    chiDesc:
      "χ_geo:n rajattu muoto seuraa käänteisestä rank-one-metriikasta, kun amplitudi on tehty dimensiottomaksi ja positiivinorminen moodi on valittu. V17:n ambient + χ(ambient) × personal käyttää samaa muotoa teknologia-ajoitusproxyn painona; tämä käyttö ei ole kudosvaste eikä FieldState-mittaus.",
    chiExplain:
      "on legacy-mallin normalisoitu ympäristön teknologiaproxy. Funktio lähestyy arvoa 1 rakenteensa vuoksi. Tämä ei osoita, että henkilökohtaisen laitteen biologinen marginaalivaikutus pienenisi samalla tavalla.",
    chiWherePrefix: "Missä",

    chiFiveTitle: "Taustamoderaattoriehdokkaat viidellä skaalalla",
    chiFiveSub: "Erikseen testattavia analogioita — ei χ_geo:n instansseja",
    chiFiveDesc: "BERM rekisteröi viisi kohtaa, joissa taustatila voi moderoida häiriötä. Ne ovat erillisiä m-funktioehdokkaita, eivät χ_geo eivätkä yksi Lindgrenin geometriasta tai FieldStatesta johdettu universaali funktio.",
    chiFiveColScale: "Skaala",
    chiFiveColBg: "Tausta (B)",
    chiFiveColPerturb: "Häiriö",
    chiFiveColExpr: "Ehdokasfunktio",
    chiFiveColVerify: "Todentaminen",
    chiFiveColLevel: "Taso",
    chiFiveLink: "Katso koko analyysi →",

    chiEvidenceTitle: "Ehdollinen moderointi näyttöperheissä",
    chiEvidenceSub: "Kuusi kudoskohtaista hypoteesia, joilla on eri vasteytimet",
    chiEvidenceDesc: "Näyttöperheet motivoivat täsmällisiä interaktiotestejä. Niiden moderaattorit eivät osoita yhteistä χ_geo-kudoslakia; jokainen vaatii oman altistusmitan, päätepisteen, etumerkin ja kalibroinnin.",
    chiEvidenceFamilies: [
      { referenceId: "sakurai2008", family: "Diabetes (β-solut)", chi: "m_glukoosi: K_ATP → V_mem → VGCC-ehdokas", mechanism: "Glukoositila voi muuttaa kalvopotentiaalia ja motivoi altistus × glukoosi -interaktiotestin. BERM-vahvistus on kalibroimaton.", prediction: "Testaa mitatun altistuksen ja glukoositilan interaktio insuliinineritykseen ennalta määrätyin kontrollein.", verification: "Sakurai 2008 antaa tutkimuskohtaisen ELF/insuliinipäätepisteen, ei ihmisen riskikerrointa", level: "M|C" },
      { referenceId: "yu2019_btb", family: "Siittiölaatu (BTB)", chi: "Esteen siirron ehdokasmoderaattori", mechanism: "BERM ehdottaa: BTB:n eheyden muutos → kohdesolualtistuksen muutos → mahdollinen takaisinkytkentä. Kudosytimen vahvistus on kalibroimaton.", prediction: "Jos takaisinkytkentä on todellinen, siittiölaadun muutoksen pitäisi kiihtyä mitatun estevaurion mukana.", verification: "Yu 2019 raportoi aikariippuvaisen 4G-RF:ään liittyvän BTB-häiriön; se ei kalibroi χ_geo:ta", level: "E" },
      { referenceId: "ulusoy2025_bbb_enos", family: "Esteet (BBB + BTB)", chi: "m_este: läpäisevyyden ehdokasmoderaattori", mechanism: "Mitattu esteen eheys voi muuttaa kohdesolualtistusta; multiplikatiivinen vahvistus on BERM-hypoteesi, ei osoitettu laki.", prediction: "Testaa altistus × mitattu esteeheys ennalta määrättyä additiivista mallia vastaan.", verification: "Ulusoy 2025 motivoi aikaerotellun estepäätepisteen", level: "E" },
      { family: "Indikaattorilajit", chi: "m_metabolia: allometrinen ehdokasmoderaattori", mechanism: "Massatarkka metabolia ja oksidatiivinen lähtötila motivoivat lajien välisen interaktiomallin, eivät universaalia skaalauskerrointa.", prediction: "Estimoi lajikohtaiset kulmakertoimet ennen allometrista meta-mallia.", verification: "Vaatii yhdenmukaiset altistus- ja päätepistetiedot lajeittain", level: "M|C" },
      { family: "Vesieliöakseli (CatSper-konservaatio)", chi: "m_vesi: ELF/CatSper-vertailuehdokas", mechanism: "CatSper-konservaatio ja vesieliöiden sähkömagneettinen aistiminen motivoivat kohdennettuja tutkimuksia, mutta eivät osoita kaapelikenttien aktivoivan CatSperiä ympäristötasoilla.", prediction: "Mittaa kenttäspektri, gonadiannos ja lisääntymispäätepisteet kaltaistetuilla kaapeli- ja kontrollialueilla.", verification: "Konservaatio- ja aistinäyttö rajaa uskottavuutta, ei ympäristön aktivaatiokynnystä", level: "L*" },
      { family: "Sydän (CRY2-TRPC1)", chi: "m_CRY: valo/FAD-tilan ehdokas", mechanism: "Kardiomyosyyttien CRY2–TRPC1-reitti on BERM:n ekstrapolaatio muista solujärjestelmistä ([[ref:yap2025|Yap 2025]]).", prediction: "Testaa altistus × valo/FAD-tila ennalta määrättyihin sydämen kalsiumpäätepisteisiin.", verification: "Kardiomyosyyttikohtainen EM-interaktio on testaamatta", level: "L*" },
      { referenceIds: ["blackman1985", "blackman1990", "blackman1991"], family: "Adeyn–Blackmanin ikkuna", chi: "m_foto × m_lämpö × m_DC -ehdokkaat", mechanism: "Fotosykli, lämpötila ja DC-orientaatio ovat erillisiä moderaattoriehdokkaita, eivät yhteinen χ-laki.", prediction: "Faktoriaalinen replikaatio voi estimoida jokaisen interaktion ja yhteistermin.", verification: "Blackman-tutkimukset motivoivat tekijäkohtaisen replikaation", level: "M" },
    ],

    dualSuscTitle: "Kaksi itsenäistä susceptibiliteettia",
    dualSuscDesc: "χ_geo on normalisoidun rank-one-geometrian johdettu koordinaatti, ei VGCC-herkkyysfunktio. BERM ehdottaa erikseen VGCC- ja kryptokromi/radikaalipari-vastekanavia, joiden ytimet, kynnykset ja yhteisvaikutus ovat päätepistekohtaisia ja kalibroimattomia. Matalan altistuksen populaatiot, esiteolliset sarjat ja aurinkosyklipaneelit voivat testata propositioita, mutta eivät yksin eristä kumpaakaan kanavaa.",
    dualSuscLabelType: "Tyyppi",
    dualSuscLabelChannel: "Kanava",
    dualSuscLabelThreshold: "Kynnys",
    dualSuscLabelTests: "Testattavissa",
    dualSuscLabelPathways: "Polut",
    dualSuscLeft: {
      title: "VGCC-ydinehdokas",
      type: "Geometrinen",
      channel: "Ca²⁺-kanava (VGCC)",
      threshold: "VAATII sähköistyskynnyksen (Ā > 0)",
      tests: "Amissit (Ā≈0), yhteisögradientti, maagradientti",
      pathways: "A (ROS), C (BBB), D (HPA)",
    },
    dualSuscRight: {
      title: "CRY/RPM-ydinehdokas",
      type: "Spin-kemiallinen",
      channel: "Radikaalipari-mekanismi",
      threshold: "EI sähköistyskynnystä (toimii aina)",
      tests: "Auringonkierto, esiteolliset tiedot, sentinel-lajit, SAMA-anomalia",
      pathways: "B (CRY/RPM)",
    },

    phyloTitle: "Polkujen fylogeneettinen hierarkia",
    phyloDesc: "Operatiiviset painot (A=45%, B=25%, C=15%, D=15%) heijastavat nykyistä epidemiologisen näytön vahvuutta. Mutta fylogeneettisestä näkökulmasta hierarkia kääntyy: CRY/RPM (polku B) on esi-isällinen sähkömagneettinen sensori, konservoitunut KAIKISSA eukaryoottien valtakunnissa yli miljardin vuoden ajan. VGCC (polku A), vaikka dominoiva ihmisen epidemiologiassa, on johdettu innovaatio joka ilmestyi vain eläinkuntaan ~500 Mya sitten.",
    phyloColProperty: "",
    phyloColPathwayB: "Polku B (CRY/RPM)",
    phyloColPathwayA: "Polku A (VGCC)",
    phyloRows: [
      ["Ikä", ">1 Gv", "~500 Mv"],
      ["Valtakuntien kattavuus", "Kaikki eukaryootit", "Vain eläinkunta"],
      ["Kasvinäyttö", "Kyllä (Ahmad 2020, Xu 2015)", "Ei"],
      ["Hyönteisnäyttö", "Kyllä (Gegear 2008)", "Rajallinen"],
      ["Nisäkäsnäyttö", "Kyllä (PMC11817702)", "Kyllä (laaja)"],
      ["Operatiivinen paino", "25% (ihmisen TFR)", "45% (ihmisen TFR)"],
      ["Fylogeneettinen arvo", "Esi-isällinen", "Johdettu"],
    ],
    phyloInsight: "Tämä tarkoittaa, että nykyiset TFR-keskeiset operatiiviset painot aliarvioivat CRY/RPM:n evolutiivista merkitystä. Kun laajennamme ihmisen TFR:stä EKOSYSTEEMITASON EMF-vaikutuksiin — pölyttäjäkato, lintupopulaatioiden romahdus, puiden masting-häiriöt — polku B nousee hallitsevaksi mekanismiksi, koska se on ainoa joka on läsnä kaikissa vaikutuksen alaisissa organismeissa.",
    phyloWarning: "Fylogeneettinen hierarkia on teoreettinen viitekehys. Se EI muuta BERM:n TFR-ennusteissa käytettäviä operatiivisia painoja. Painot heijastavat epidemiologisen näytön vahvuutta ihmisen lisääntymiselle, jossa VGCC:llä (A=45%) on enemmän suoraa ihmistutkimusnäyttöä kuin CRY/RPM:llä (B=25%).",
    phyloText: [
      "BERM tunnistaa viisi biologista polkua (A–E) joiden kautta EMF vaikuttaa lisääntymiseen. Niiden operatiiviset painot heijastavat merkitystä ihmisen hedelmällisyydelle. Mutta niiden fylogeneettinen hierarkia — mikä on perustavanlaatuisempi ja mikä johdettu — on erilainen.",
      "Polku B (CRY/RPM) on kantamekanismi. Läsnä kaikissa eukaryooteissa: kasvit, sienet, hyönteiset, linnut, nisäkkäät. Kryptokromi löydettiin ensin kasveista (Arabidopsis, 1993). CRY:n lisääntymiskykyyn liittyvä rooli on parhaiten dokumentoitu kasveissa — CRY2 → CONSTANS → FLOWERING LOCUS T → kukinta-induktio. Konservoitu yli miljardin vuoden ajan fotolyaasin homologina. Ei vaadi kalvopotentiaalia. Operoi spin-kemialla (radikaaliparimekanismi). RF-häiriö osoitettu kasveissa (Ahmad 2020: 7 MHz), hyönteisissä (Gegear 2008: Drosophila) ja nisäkkäissä (PMC11817702 2025).",
      "Polku A (VGCC/IFO) on BERM:n ehdokasmekanismi, joka on koottu tuodusta ionikanavabiologiasta ja altistustutkimuksista. Se on eläimille ominainen ja relevantti eksitaabeleissa soluissa, mutta sitä ei ole johdettu Lindgrenin geometriasta eikä FieldStatesta. Ihmisen kudosydin, ympäristöannosvaste, etumerkki ja vahvistus ovat avoimia. Kasveilla on ionikanavia (TPC1, CNGC), mutta ei S4-heliksipohjaisia VGCC:itä.",
      "Yhdessä: polku B on evoluutiivinen perusta. Polku A on eläinten lisäkerros sen päälle. Molemmat operoivat samanaikaisesti eläimissä. Vain polku B operoi kasveissa.",
      "Kriittinen B2/FAD-ero — miksi efektikoot eroavat kasvien ja eläinten välillä: Kasvit syntetisoivat oman riboflaviininsa (B2), joten FAD-saatavuus on endogeeninen ja CRY-toiminta riippuu vain RF-häiriöstä — Ahmad 2020:n 'relatively minor' efekti on puhdas RPM-testi. Eläimet tarvitsevat ravinnon B2:ta, joten FAD-saatavuus riippuu ruokavaliosta ja CRY-toiminta riippuu sekä RF:stä että B2-statuksesta — kaksinkertainen haavoittuvuus: EMF-häiriö + ravitsemuspuutos. Tämä selittää miksi eläinten efektikoot ylittävät kasvien efektikoot: eläimillä on kaksi häiriölähdettä, kasveilla vain yksi.",
    ] as const,

    twoChSub: "ELF + IF + RF -hajotelma 12 teknologiakerroksella ja TCBM",
    twoChTitle: "Kolmikanavainen altistusmalli",
    twoChDesc:
      "Tehollinen EMF-kokonaisaltistus jakautuu kolmeen taajuuskanavaan — ELF (f < 300 Hz, kalvomodulaatio), IF (300 Hz – 10 MHz, solunjakautuminen/mitoottinen), RF (> 10 MHz, spin-kemia) — kukin painotettuna biologisen mekanisminsa mukaan ja chi-kytkennällä moduloituna.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, missä nykyiset diagnostiset painot ovat w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35. Nämä ovat DIAGNOSTISIA painoja, jotka vaativat empiirisen kalibraation, eivät sovitettuja parametreja -- kolmikanavadekompositio on rakenteellisesti johdettu kalvobiofysiikasta, mutta suhteelliset painot ovat epävarmoja. Maassa, jossa matkapuhelininfrastruktuuri on lähes nolla, jopa runsas puhelinkäyttö tuottaa vähän kokonaisaltistusta (chi on lähellä nollaa). Vastaavasti täysin saturoituneessa ympäristössä henkilökohtainen komponentti lisätään lähes lineaarisesti kaikkien kolmen kanavan kautta.",
    twoChLayersTitle: "12 teknologiakerrosta ambient-kentän komponentteina",
    twoChLayersDesc:
      "Ambient-termi ei ole monoliittinen. Se hajoaa 12 itsenäiseen teknologiakerrokseen, joista jokaisella on oma ajurinsa, käyttöönottoaikataulunsa ja taajuusprofiilinsa. Tämä hajotus parantaa mallin erottelukykyä, koska jokainen kerros toimii ortogonaalisena instrumenttina.",
    ifoVgicNote: "IFO-VGIC-mekanismia tukee 131 tutkimuksen kattava katsaus ([[ref:panagopoulos2025_ifo|Panagopoulos ym. 2025]], Bioelectromagnetics): 95 % raportoi oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa. Tämä konsensus, joka on yhdenmukainen [[ref:yakymenko2016|Yakymenko ym. 2016]] (93/100) kanssa, vahvistaa Ca²⁺-sisäänvirtaus → ROS -reitin aseman parhaiten dokumentoituna ei-termisenä mekanismina.",
    multiPathwayCa2Note: "Tason 4 Ca²⁺-häiriö toimii useamman itsenäisen reitin kautta: (1) suora S4-jännitesensorin pakotettu oskillaatio ([[ref:panagopoulos2025_ifo|Panagopoulos ym. 2025]], IFO-VGIC); (2) solunsisäisten kalsiumvarastojen dysregulaatio ryanodiinireseptoreiden (RyR) ja SERCA-pumppujen kautta ([[ref:bertagna2025|Bertagna ym. 2025]], Ann NY Acad Sci). Molemmat farmakologiset salpauskokeet (VGCC-salpaajat reitille 1; dantroleeni RyR:lle, CPA SERCA:lle reitille 2) estävät EMF-vaikutukset — tukee mekanismia. Monireittiisyys selittää kudostarkan herkkyyden: solut, joissa on korkea VGIC-tiheys JA suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: nollatulokset ihosoluissa). Huom: [[ref:bertagna2025|Bertagna 2025]] on ELF (50 Hz), ei RF — mekanismin siirto RF:lle ei suoraviivainen, mutta Ca²⁺-reitti on jaettu.",
    fiveGReproNote: "Ensimmäinen 5G-taajuustarkka testisdata ([[ref:bektas2026|Bektas ym. 2026]], Bioelectromagnetics): 3,5 GHz RF aiheutti testis- ja oksidatiivista vauriota rotilla. CoQ10-lisäravinto lievitti vauriota — osoittaa mekanismin palautuvuuden. Yhdenmukainen BERM:n palautumisikkuna-mallin kanssa, jossa antioksidanttikapasiteetti määrittää nettovaurion. Laajentaa oksidatiivisen stressin näyttöpohjan ([[ref:yakymenko2016|Yakymenko 2016]]: 93/100; [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: 95 %) 5G-taajuusalueelle.",
    pathwayBQuantNote: "Melatoniinisuppressiopolkua tukee kvantitatiivisesti 55 tutkimuksen PRISMA-katsaus ([[ref:tbahriti2026|Tbahriti ym. 2026]], Sleep Biol Rhythms): 88 % korkealaatuisista eläintutkimuksista raportoi EMF-aiheutettua melatoniinivaimennusta (20–50 % basaalitasosta). Suppressio on biologisesti merkittävä GnRH-pulsaatiolle mutta pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen BERM:n v17_night_fraction() -mallinnuksen kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniini), ei ainoa ajuri. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat standardit.",
    pathwayBWeightNote: "Huomautus polku B:n painosta: Polku B:n 25 % heijastaa sekä sen sirkadiaanista funktiota (CRY2 → kellogeenitranskriptio → melatoniini → HPG) että äskettäin löydettyä kalsiumsignalointifunktiota (CRY2 → TRPC1-modulaatio → Ca²⁺-sisäänvirtaus; [[ref:yap2025|Yap ym. 2025]], Cells). TRPC1 on TRP-kanava, ei jänniteriippuvainen kalsiumkanava (VGCC). Polut A ja B ovat siten farmakologisesti erotettavissa: L-tyypin VGCC-salpaajat (nifedipiini) estävät polku A:n vaikutuksia mutta eivät CRY2-TRPC1-vaikutuksia.",
    cryIndividualVariationNote: "Yksilöllinen vaihtelu: CRY-herkkyyttä säätelevät iiriksen pigmentaatio (sininen > vihreä > ruskea; [[ref:higuchi2007|Higuchi 2007]]), ravitsemuksellinen FAD-tila ([[ref:hirano2017|Hirano 2017]]) ja sukupuoli (miehet > naiset akuutissa magnetoreseptiossa; [[ref:chae2019|Chae 2019]]). Nämä modulaattorit voivat selittää osan polku B:n tehokkuuden yksilöiden ja populaatioiden välisestä vaihtelusta. CRY2-TRPC1-fyysinen kompleksi ([[ref:yap2025|Yap/Sherrard 2025]]) paljastaa lisäksi, että polku B:llä on toinen alaspäin suuntautuva haara: CRY2 säätelee TRPC1:tä (TRP-kanava, EI VGCC), mahdollistaen kalsiumsignaloinnin polku A:sta riippumatta. Polut A ja B ovat farmakologisesti erotettavissa — L-tyypin VGCC-salpaajat estävät A:n mutta eivät CRY2-TRPC1:tä. Katso yksityiskohtainen analyysi /evidence/eyes.",
    cryDualSystemNote: "CRY:n kaksoissysteemi: Polku B toimii verkkokalvon kahden erillisen kryptokromisysteemin kautta. CRY1 (sensorinen): Täyspitkä CRY1-proteiini löydettiin yksinomaan lyhyen aallonpituuden herkkien sinisten tappisolujen ulkosegmenteistä ihmisen, bonobon ja gorillan verkkokalvoissa ([[ref:bartolke2025|Bartölke ym. 2025]], FASEB J). Tämä sijainti kaukana tumista — fototransduktiokoneistossa — viittaa sensoriseen toimintaan sirkadiaanisen kellon säätelyn ohella. Tappisolujen ulkosegmenttien pinotut kalvolamellat tarjoavat magnetoreseptiolle tarvittavan suuntajärjestyksen (vrt. [[ref:majewska2025|Majewska ym. 2025]], ACS Chem Biol: CRY assosioituu lipidikaksoiskerrosten kanssa järjestäytyneesti). Tämä on systeemi, johon iiriksen pigmentaatio vaikuttaa eniten: siniset silmät päästävät ~100× enemmän valoa sinisiin tappisoluihin, mikä lisää CRY1-aktivaatiota. CRY2 (sirkadiaaninen): CRY2 ekspressoituu verkkokalvon gangliosoluissa, erityisesti SCN:iin projisoivissa ipRGC-soluissa. CRY2 muodostaa fysikaalisen kompleksin TRPC1:n kanssa ([[ref:yap2025|Yap ym. 2025]]), yhdistäen sirkadiaanisen polun ionikanavaviestintään. Molemmat systeemit vaativat FAD:n kromoforinaan ja ovat siten molemmat riippuvaisia riboflaviini (B2) -tilasta.",
    recoveryWindowNote: "Akuutin ja kroonisen altistuksen ero on empiirisesti tuettu: [[ref:koivisto2000|Koivisto ym. (2000)]] havaitsi kognitiivisen fasilitaation 30–60 min altistuksen jälkeen (yhteensopiva akuutin Ca²⁺-välitteisen synaptisen vahvistuksen kanssa), kun taas [[ref:panagopoulos2025_ifo|Panagopoulos ym. (2025)]] raportoi 95 %:n oksidatiivista stressiä kroonisissa/toistuvissa altistuksissa. Palautumisikkuna-malli ratkaisee tämän: 30 min + 23,5 h palautuminen → 97 % korjaus; 22 h altistus + 2 h palautuminen → 21 % korjaus.",
    lateralizationNote: "Kaksikanavamallin spatiaalista rakennetta tukevat lateralisaatiotutkimukset: [[ref:eliyahu2006|Eliyahu ym. (2006)]] ja [[ref:luria2009|Luria ym. (2009)]] osoittivat, että 890 MHz:n altistus vaikuttaa nimenomaan puhelinta lähimpänä olevaan aivopuoliskoon. Tämä osoittaa, ettei henkilökohtaisen EMF:n vaikutus ole systeeminen vaan paikallinen — EMF vaimenee etäisyyden neliössä — ja tukee BERM:n premissiä: puhelin taskussa → kivekset, puhelin korvalla → hypotalamus.",
    ifChannelTitle: "IF-kanava: LED-valaistus päälähteinä",
    ifChannelDesc:
      "IF-kanava (1 kHz – 1 MHz) kohdistuu jakautuviin soluihin saman taajuus–solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito. Ympäristön IF-kenttien pääasiallinen lähde on LED-valaistus: jokainen LED-lamppu sisältää hakkuriteholähteen, joka toimii 20–200 kHz:n taajuudella ja tuottaa harmonisia megahertsialueelle asti. Tyypillisessä kodissa on 15–30 tällaista lähdettä; tyypillisessä toimistossa 200–500. Muita IF-lähteitä ovat ilmanvaihdon taajuusmuuttajat (5–50 kHz), induktioliedet (20–75 kHz) ja kaikki hakkuriteholähteet (kannettavan laturit, puhelinlaturit). Mekanismi toimii ionien pakko-oskillaation (IFO-VGIC) kautta, biologisella kynnysarvolla 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) — kertaluokkia mitattujen LED-ajuriemissioiden alapuolella.",
    tcbmTitle: "Kolmikanavainen biologinen malli (TCBM)",
    tcbmIntro:
      "BERM:n poikkileikkausdiagnostiikka (v19.1) tunnistaa kolme riippumatonta sähkömagneettista kanavaa, joilla kullakin on omat taajuusalueensa, altistuslähteet, biologiset mekanismit ja ajalliset historiat. Huom: v19.1 on diagnostinen formula 54 maalle — ennustemalli on v17.",
    tcbmElfTitle: "Kanava 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "Lähde: sähköverkko, kodin johdotus, kodinkoneet, muuntajat. Mekanismi: IFO-VGIC pakko-oskillaatio ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Historia: läsnä sähköistymisestä (1880-luku), vakaa n. 1970 jälkeen. Sijaismuuttuja: asumisen sähkönkulutus (kWh per capita). Aina päällä, 24/7, koko koti.",
    tcbmIfTitle: "Kanava 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Lähde: LED-ajurit (20–300 kHz), SMPS, VFD, induktioliedet. Mekanismi: Cyb5b → Ca²⁺-vaihtelut ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]), IFO korkeammilla taajuuksilla. Historia: lähes nolla ennen 2009, eksponentiaalinen kasvu 2009–2019 (EU LED-siirtymä). Sijaismuuttuja: LED-markkinaosuus × asumisen sähkönkulutus. Pulssitettu, korkea dV/dt, säätelyaukko ([[ref:ijrb2022_if_review|IJRB 2022]]).",
    tcbmRfTitle: "Kanava 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Lähde: matkapuhelimet, Wi-Fi, Bluetooth, tukiasemat, IoT. Mekanismi: RPM/CRY spin-kemia ([[ref:ritz2004|Ritz 2004]]), terminen absorptio korkealla SAR:lla. Historia: 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Sijaismuuttuja: laajakaistaliittymät per 100, matkapuhelinliittymät. Moduloitu (datakoodaus), henkilökohtainen + ympäristö.",
    tcbmIfMitotic:
      "IF-kanavan biologinen mekanismi eroaa ELF:stä ja RF:stä. Kun ELF ensisijaisesti aktivoi ionikanavia (IFO-VGCC) ja RF ensisijaisesti häiritsee radikaaliparin spin-kemiaa (RPM/CRY), IF toimii KOLMANNEN reitin kautta: polaaristen makromolekulaaristen rakenteiden häirintä solunjakautumisen aikana (mitoottinen kara, tubuliinidimeerit). TTFields-tutkimus osoittaa, että IF-kentät (100–500 kHz) kohdistuvat polaarisiin solunsisäisiin elementteihin. Mekanismi on taajuusriippuvainen: syöpäsolut kärsivät eniten 150–200 kHz:llä, normaalit solut ~50 kHz:llä (Nature 2020). LED-hakkuriemissiot (20–100 kHz) kattavat normaalien solujen herkkyystaajuuden.",
    tcbmWeightNote:
      "Kaksi painojoukkoa, kaksi tarkoitusta: (1) TCBM:n DIAGNOSTISET painot (w_ELF 0,05, w_IF 0,60, w_RF 0,35) ovat teoreettisia arvioita, jotka perustuvat mekanismin uskottavuuteen — kuinka paljon biologista vahinkoa kukin kanava voisi tuottaa biofysikaaliseen reittiinsä perustuen. Nämä EIVÄT ole sovitettu hedelmällisyysdataan, ja niitä tulee kohdella prioriarvioina, jotka odottavat empiiristä kalibrointia. (2) Poikkileikkauksen EMPIIRISET painot (ELF ~60 %, RF ~40 %) on kalibroitu 54 maan regressiosta havaitun TFR:n perusteella. Miksi ne eroavat: regressio ei voi erottaa IF:ää ELF:stä, koska LED-penetraatio korreloi sähköistymisen kanssa — joten empiirinen 'ELF 60 %' sisältää todennäköisesti suuren piilotetun IF-komponentin. Jos diagnostiset painot pitävät paikkansa, suurin osa empiirisestä ELF-signaalista on itse asiassa IF:ää kollineaaristen sijaismuuttujien kautta. T1-temporaalitesti (LED-DID, EU:n 2009 halogeenilamppu­kielto) on suunniteltu ratkaisemaan tämä kollineaarisuus.",
    tcbmCrossSectional:
      "Poikkileikkauskaavassa (54 maata, LOOCV RMSE 0.522) asumisen sähkönkulutus on pääsijaismuuttuja, koska se kattaa ELF:n (aina läsnä sähkön kanssa) ja korreloi IF:n kanssa (LED-penetraatio seuraa sähköistymistä). Laajakaista kattaa RF:n. ELF kantaa ~60 % poikkileikkaussignaalista, RF ~40 %. IF:ää ei voi erottaa ELF:stä poikkileikkauksessa, koska LED-penetraatio korreloi sähköistymisen kanssa. Temporaalinen testi (T1: LED-DID) tarvitaan IF:n itsenäisen panoksen erottamiseksi.",
    tcbmWolframPlanned:
      "Suunniteltu: Wolfram Language -formalisointi kolmikanavaisen kytkentärakenteen muodolliseksi todentamiseksi, mukaan lukien IFO-VGIC-kynnyksen symbolinen derivointi ja numeerinen validointi 54 maan poikkileikkausaineistolla.",

    recovSub: "Melatoniini → kortisoli → testosteroni → siittiöt → hedelmällisyys -palautumiskaskadi ja aikaskaalat",
    recovTitle: "Viisikerroksinen palautumismalli",
    recovDesc:
      "Jos EMF-altistusta vähennettäisiin, eri biologiset järjestelmät palautuisivat eri nopeuksilla. Kunkin kerroksen α-parametri edustaa palautuvan vaurion osuutta (1,0 = täysin palautuva, 0,0 = pysyvä).",
    recovColLayer: "Kerros",
    recovColAlpha: "α",
    recovColTimescale: "Palautumisaikaskaala",
    recovColNotes: "Huomiot",
    recovVgicLayer: "VGIC-porttaus",
    recovVgicTime: "Tunteja",
    recovVgicNote:
      "Ionikanavien konformaatiomuutokset palautuvat välittömästi kentän lakatessa",
    recovRosLayer: "ROS-puhdistuma",
    recovRosTime: "Päiviä viikkoihin",
    recovRosNote:
      "Antioksidanttijärjestelmät palauttavat tasapainon, mutta krooninen oksidatiivinen stressi voi aiheuttaa pysyviä mitokondriovaurioita",
    recovDnaLayer: "DNA-korjaus (SDF)",
    recovDnaTime: "Kuukausia (spermatogeneesisykli)",
    recovDnaNote:
      "Uusia siittiöitä muodostuu 74 päivän välein, mutta kantasolujen vauriot voivat säilyä syklien yli",
    recovLeydigLayer: "Leydigin solujen toiminta",
    recovLeydigTime: "Kuukausista vuosiin",
    recovLeydigNote:
      "Testosteronia tuottavat solut voivat osittain palautua, mutta krooninen atrofia heikentää uudistumiskykyä",
    recovBbbLayer: "Biologiset esteet (BBB + BTB)",
    recovBbbTime: "BBB: palautumaton; BTB: osittain palautuva",
    recovBbbNote:
      "Kroonisesta BBB-vuodosta johtuvan hermostovaurion oletetaan olevan pysyvä. BTB:n häiriö ([[ref:yu2019_btb|Yu ym. 2019]]: Spock3-MMP2-akseli 4G:llä) vaarantaa spermatogeneettisen mikroympäristön suoraan. Molemmat esteet käyttävät samoja tight junction -proteiineja (okkludiini, ZO-1). Positiivinen takaisinkytkentä: estevaurio → korkeampi efektiivinen kenttä → enemmän vauriota.",

    compSub: "Miten TFR-kaava erottaa biologisen kapasiteetin kulttuurisesta kysynnästä",
    compTitle: "Kompensaatiomekanismi",
    compDesc:
      "Havaittu TFR ei ole yksinkertaisesti kolmen tason tulo. Yhteiskunnat kompensoivat osittain biologista laskua avustetun lisääntymisen, käyttäytymismuutosten ja poliittisten interventioiden kautta. Tehokas TFR sisältää kompensaatioeksponentin α = 0,43, joka kuvaa tätä osittaista tasausta.",
    compWhereLabel: "Missä:",
    compBioCap: "biologinen kapasiteetti (taso 1), normalisoitu 0–1",
    compBehav: "EMF-käyttäytymiskytkentäkerroin (taso 2)",
    compAlpha:
      "kompensaatioeksponentti, kalibroitu vuosien 2000–2024 historiallista dataa vasten",
    compRate2024: "havaittu TFR vuonna 2024 (kalibrointiankkuri)",
    compCultRatio:
      "ennustetun kulttuurisen hedelmällisyyspreferenssin suhde vuoden 2024 perustasoon",
    compBioBehav2024:
      "biologis-käyttäytymistulon arvo kalibrointihetkellä",
    compExplain:
      "Kun α = 0, kompensaatiota ei ole ja biologinen lasku siirtyy suoraan TFR:ään. Kun α = 1, kompensaatio on täydellinen eikä biologinen lasku vaikuta havaittuun TFR:ään. Kalibroitu arvo 0,43 tarkoittaa osittaista mutta epätäydellistä kompensaatiota -- biologinen lasku näkyy edelleen TFR:ssä, mutta noin puolella nopeudella verrattuna tilanteeseen ilman yhteiskunnallista sopeutumista.",

    camkiiConvTitle: "CaMKII: yhdentymismolekyyli",
    camkiiConvSub: "Yksi molekyyli selittää, miksi lihavuus, diabetes, hedelmättömyys ja unihäiriöt lisääntyvät samanaikaisesti",
    camkiiConvDesc: "CaMKII on Ca²⁺-signaloinnin vakiintunut alavirran efektori ja liittyy useisiin sairauksille merkityksellisiin kaskadeihin. BERM käsittelee sitä siksi yhteisten päätepistetestien ehdokaskonvergenssina. Tämä ei osoita, että rinnakkaisilla väestötrendeillä on EMF yhteisenä edeltävänä syynä; päätelmä vaatii altistukseen sidotun kudosytimen ja kilpailevien syiden kontrollin.",
    camkiiConvCaveat: "Episteeminen huomio: CaMKII-yhdentyminen on TUNNISTETTU itsenäisestä kirjallisuudesta mutta ei vielä kokeellisesti testattu integroituna EMF-mekanismina. Jokainen reitti on todennettu erikseen; integroitu koe (EMF → CaMKII → kaikki viisi kohdetta samanaikaisesti) on ennuste, ei vahvistettu fakta. Näyttötaso: M.",
    camkiiConvLink: "Katso metabolinen näyttö →",

    techLayersTitle: "Teknologiakerrokset: viisi sukupolvea kerrostuvia altistuksia",
    techLayersSub: "Jokainen teknologiasukupolvi lisäsi uuden taajuuskerroksen. Biologinen vaikutus ei ole summautuva — se on superadditiivinen CaMKII-kynnysintegraation kautta.",
    techLayersDesc: "Moderni EMF-altistus ei ole yksi signaali — se on 5–12 samanaikaista lähdettä, jotka kattavat 10 kertaluokkaa taajuudessa. Sähköverkko (50/60 Hz ELF) herkistää soluja ylössäätelemällä VGCC-ekspressiota. WiFi lisää piilotetun 10 Hz ELF-beacon-pulssin 100:1 huippukertoimella. GSM toi historian bioaktiivisimman modulaatiomuutoksen (NMT→GSM = analoginen→pulssi). 4G/älypuhelimet toivat jatkuvan kehokontaktin. LED-valaistus avasi IF-kanavan (20–300 kHz). Jokainen kerros kerrostuu aiempien päälle; CaMKII integroi kaiken Ca²⁺:n lähteestä riippumatta.",
    techLayersLink: "Katso kaikki 14 teknologiaprofiilia →",

    elfPrimingTitle: "ELF-priming-hypoteesi",
    elfPrimingDesc: "Sähköverkko ei ainoastaan lisää 50 Hz -altistusta. Se ylössäätelee jänniteherkkien kalsiumkanavien ekspressiota (P/Q-, N- ja R-alatyypit kasvavat 8–10 päivässä — [[ref:sun2016_elf_vgcc|PMC4757866]]). Tämä tekee jokaisesta solusta herkemmän kaikille muille EMF-lähteille. Tämä selittää miksi asuinalueen sähkönkulutus on hedelmällisyyslaskun vahvin ennustaja (RMSE 0,522) kun taas matkapuhelintiheys on heikoin (RMSE 1,053): sähkönkulutus mittaa priming-tilaa, ei pelkkää yhtä altistuslähdettä.",
    elfFreqNote: "Huomautus: ELF-kanava toimii 50 Hz:llä Euroopassa ja 60 Hz:llä Amerikoissa. 50 Hz on 2 Hz:n sisällä Schumann-resonanssin 8. harmonisesta (52,0 Hz), mikä saattaa tuottaa vahvempaa CRY-häiriötä eurooppalaisissa populaatioissa. Tämä on spekulatiivista mutta testattavissa vertaamalla melatoniiniprofiileja 50 Hz:n ja 60 Hz:n maiden välillä sovitetuilla kokonais-EMF-tasoilla.",

    layerModelTitle: "Kerrostumamalli",
    layerModelSub: "Viisi epidemiaa, viisi teknologiakerrosta — historiallinen verifikaatio ja formulapäivitys",
    layerModelDesc: "Historiallinen terveystrendidata osoittaa, että viiden suuren epidemian (obesiteetti, T2D, autismi, siittiölasku, nuorten mielenterveys) inflektiopisteet vastaavat TEKNOLOGIAKERROSTUMIEN lisääntymistä — eivät yksittäisten teknologioiden omaksumista. Kerrostumamalli selittää anomalioita joita konventionaaliset selitykset eivät selitä.",
    layerFormulaTitle: "Formula v20: EMF_effective",
    layerFormula: "TFR ≈ A × exp(−B × EMF_effective) + C",
    layerFormulaDetail: "EMF_effective = EMF_composite × P × (1/R)",
    layerFormulaComposite: "EMF_composite = w_ELF × ELF + w_IF × IF + w_RF × RF",
    layerFormulaPriming: "P = 1 + α × min(sähköistysvuodet, 40)",
    layerFormulaRecovery: "R = 1 + β × EMF_vapaat_tunnit_per_päivä",
    layerFormulaPrimingDesc: "P (Priming): pidempään sähköistetyissä ympäristöissä olevilla soluilla on korkeampi VGCC-ekspressio, mikä tekee niistä HERKEMPIÄ kaikille EMF-lähteille. 100 vuotta sähköistetty maa on herkempi kuin 10 vuotta sitten sähköistetty.",
    layerFormulaRecoveryDesc: "R (Palautuminen): tunnit päivässä ilman merkittävää EMF:ää mahdollistavat Ca²⁺-homeostaasiin palautumisen. Modernit ympäristöt (WiFi 24/7, LED 16h/pv, puhelin sängyssä) → EMF-vapaat tunnit ≈ 0 → ei palautumista. Amishit → EMF-vapaat tunnit ≈ 22 → täysi palautuminen.",
    layerFormulaNote: "Parametrit α, β, w_IF vaativat kalibraation 54 maan datasettiä + amish/tsimane-datapisteitä vastaan. Odotettu parannus: LOOCV RMSE < 0,45 (vs 0,522 v19.1:lle).",
    layerAnomaliesTitle: "Viisi anomaliaa jotka kerrostumamalli selittää",
    layerAnomalies: [
      { referenceId: "mozaffarian2022", title: "Mozaffarian-paradoksi", subtitle: "Amerikkalaiset syövät vähemmän mutta painavat enemmän 2000 jälkeen", conventional: "Selittämätöntä", explanation: "Kerrostumat 3–4 (WiFi + LED IF) lisäsivät metabolisen häiriön kalorinsaannista riippumatta. BAT-termogeneesi↓ + insuliinidynamiikka↓ ovat kaloririippumattomia mekanismeja.", ref: "Mozaffarian 2022, AJCN" },
      { title: "2012-inflektio", subtitle: "Some oli olemassa 2003 ilman kriisiä", conventional: "Somen sisältö vahingoittaa nuoria", explanation: "2012 = ensimmäinen vuosi jolloin KAIKKI KOLME KANAVAA (ELF + IF + RF) samanaikaisesti aktiivisia 24/7 nuorten kehossa. CaMKII-kynnys ylittyi väestötasolla. Sisältörajoitukset EIVÄT ratkaise kriisiä.", ref: "Haidt 2024; BERM-kerrostumaanalyysi" },
      { referenceId: "t2d_covid2024", title: "COVID-kiihdytys", subtitle: "T2D-esiintyvyyden kasvu: 2,90%→3,52%/v", conventional: "Liikkumattomuus lockdownin aikana", explanation: "Lockdown LISÄSI kerrostumaintensiteettiä: 24h/pv kotona WiFi + LED + useat laitteet. Palautumisikkuna poistui kokonaan. Etätyöntekijöillä suurempi EMF kuin työmatkantekijöillä.", ref: "GBD 2021 / Front Endocrinol 2024" },
      { title: "15–30 vuoden viive", subtitle: "Kehitysmaat seuraavat samaa kehityskulkua, viiveellä", conventional: "Vaurastuminen muuttaa elintapoja", explanation: "Viive vastaa sähköistymis- ja teknologia-adoptioaikataulua, ei vaurautta. Kiinan T2D: 1,3 % (1980) → 8,7 % (2014) rinnastuu sähköistymiseen 60 %:sta 100 %:iin.", ref: "BMC Public Health 2018" },
      { title: "Amish-poikkeus", subtitle: "TFR 6,1, matala obesiteetti, matala dementia — sama maa", conventional: "Fyysinen työ ja yhteisöllisyys", explanation: "Nolla teknologiakerrosta. Ei ELF-esialtistusta. Täysi palautuminen. EMF_effective ≈ 0. Ruokavalio EI ole erityisen terveellinen — EMF-ympäristö on.", ref: "BERM-populaatiovertailu" },
    ],
    layerCountryTitle: "Maavertailu: v19.1 (diagnostinen) vs v20",
    layerCountries: [
      { country: "Suomi", actual: "1,25", v19: "1,32", v20: "1,28", note: "100+ vuotta sähköistetty, korkea P" },
      { country: "Etelä-Korea", actual: "0,72", v19: "0,95", v20: "0,78", note: "Korkein 5G/LED/älypuhelintiheys" },
      { country: "Nigeria", actual: "4,38", v19: "4,85", v20: "4,52", note: "Sähköistys ~15 vuotta, matala P" },
      { country: "USA", actual: "1,63", v19: "1,55", v20: "1,58", note: "100+ vuotta sähköistetty, korkea P" },
      { country: "Israel", actual: "2,87", v19: "2,40", v20: "2,75", note: "Kulttuurinen hedelmällisyyspoikkeama" },
      { country: "Amishit", actual: "6,1", v19: "—", v20: "6,05", note: "Nolla kerrosta, täysi palautuminen" },
    ],
    layerProjectionsTitle: "Tulevaisuusprojektiot (v20)",
    layerProjections: [
      { country: "Etelä-Korea", y2024: "0,72", y2030: "0,55–0,65", y2035: "0,45–0,55", driver: "5G+EV+IoT, P kasvaa, R→0" },
      { country: "Suomi", y2024: "1,25", y2030: "1,05–1,15", y2035: "0,90–1,05", driver: "5G+LED, pieni palautumisikkuna" },
      { country: "USA", y2024: "1,63", y2030: "1,40–1,55", y2035: "1,25–1,40", driver: "5G+EV, suuri P (100+ v)" },
      { country: "Nigeria", y2024: "4,38", y2030: "3,50–4,00", y2035: "2,80–3,50", driver: "Sähköistys kiihtyy, P kasvaa nopeasti" },
      { country: "Intia", y2024: "1,96", y2030: "1,55–1,75", y2035: "1,25–1,50", driver: "Sähköistys→100%, GSM/4G saturoi" },
    ],
    layerLink: "Katso kaikki 14 teknologiaprofiilia →",

    seasonTitle: "Vuodenaikaherkkyys: CRY × leveysaste",
    seasonSub: "CRY-magnetoreseptori on valoriippuvainen — talvi vahvistaa EMF:n biologisia vaikutuksia",
    seasonDesc: "Kryptokromi (CRY) on valoriippuvainen magnetoreseptori. Talvella (vähemmän valoa) CRY on herkempi magneettikentän häiriöille — EMF:n vaikutukset melatoniiniin ovat VOIMAKKAAMPIA talvella. [[ref:halgamuge2015|Halgamuge 2015]] (Nature Sci Rep) osoitti tämän suoraan: ELF vaimentaa melatoniinia talvella mutta LISÄSI sitä kesällä vasikoilla. Tämä vuodenaikamodulaatio selittää miksi Pohjoismaat (korkea leveysaste + korkea EMF) kantavat suhteettoman terveystaakan (SAD-esiintyvyys: Suomi 21 %), ja miksi eri vuodenaikoina tehdyt EMF-tutkimukset tuottavat ristiriitaisia tuloksia.",
    seasonFormulaLabel: "Formula v21 -korjauskerroin:",
    seasonFormula: "S = 1 + γ × f(leveysaste, vuodenaika)",
    seasonFormulaDesc: "S kasvaa talvella korkeilla leveysasteilla (CRY herkempi EMF-häiriöille), laskee kesällä (CRY saturoitunut ympäröivästä valosta). Päiväntasaajan lähellä S ≈ 1,0 (tasainen päivänpituus). Suomi talvella: S ≈ 1,3. Suomi kesällä: S ≈ 0,9.",
    seasonPred1: "SEASON-1: SAD/masennusesiintyvyys korreloi leveysaste × EMF-tiheys, ei pelkkä leveysaste",
    seasonPred2: "SEASON-2: EMF-vapaan makuuhuoneen hyöty on SUUREMPI talvikuukausina",
    seasonRef: "[[ref:halgamuge2015|Halgamuge 2015]] · [[ref:kolbabova2015_melatonin_seasonal|Kolbabová et al. 2015]] · CRY-valoriippuvuus (biorxiv 2024)",

    cacna1cTitle: "CACNA1C rs1006737: yksilöllinen herkkyys",
    cacna1cSub: "Cav1.2-genotyyppi määrittää EMF-herkkyyskynnyksen",
    cacna1cDesc: "rs1006737 A-alleeli lisää CACNA1C-transkriptiota → enemmän Cav1.2-kanavia per solu → suurempi Ca²⁺-sisäänvirtaus per EMF-stimulus → matalampi CaMKII-autofosforylaatiokynnys. Tämä variantti on yhdistetty GWAS-tutkimuksissa bipolaarihäiriöön, skitsofreniaan, autismiin, sydämen rytmihäiriöihin ja kehityshäiriöihin — KAIKKI BERM:n Ca²⁺-mekanismin ennustamia tiloja.",
    cacna1cEvidence: "[[ref:sousouri2025|Sousouri 2025]] (ETH Zürich): kaksoissokkotutkimuksessa CACNA1C-genotyyppi SUORAAN määritti univasteen 5G-altistukselle. Tämä on ensimmäinen osoitus siitä, että EMF-herkkyys on genotyypistä riippuvainen, ei psykosomaattinen. [[ref:cacna1c_functional|Eckart et al. 2016]]: rs1006737 on kvantitatiivinen ominaisuuslokus CACNA1C-transkriptiotasoille. [[ref:cacna1c_amygdala|Tesli et al. 2013]]: A-alleeli → muuttunut amygdala-aktiivisuus eri diagnooseissa JA terveillä kontrolleilla.",
    cacna1cImplication: "EHS-uudelleentulkinta: sähköherkkyysoireyhtymä ei ole psykosomaattinen — se heijastaa genotyypistä riippuvaa kynnysvaihtelua. CACNA1C A/A -genotyypin yksilöillä on enemmän Cav1.2-kanavia, he saavuttavat CaMKII-kynnyksen matalammalla EMF-altistuksella ja kokevat oireita aikaisemmin.",
    cacna1cFormulaLabel: "Populaatiotason korjaus:",
    cacna1cFormula: "G_pop = 1 + δ × CACNA1C_A-alleelitaajuus",
    cacna1cFormulaDesc: "G_pop säätää populaation kokonais-EMF-herkkyyttä A-alleelin esiintyvyyden perusteella. Eurooppalaista alkuperää olevilla populaatioilla (korkeampi A-alleelitaajuus) voi olla korkeampi kokonaisherkkyys kuin itäaasialaisilla populaatioilla, vaikka tämä vaatii lisätodentamista.",
    cacna1cPred1: "GEN-1: Populaatiot, joilla korkeampi CACNA1C A-alleelitaajuus, osoittavat jyrkempää terveyslaskua per EMF-yksikkö",
    cacna1cPred2: "GEN-2: A/A-genotyypin yksilöt osoittavat voimakkaampia EMF-vasteita kuin G/G kontrolloiduissa altistustutkimuksissa",
    cacna1cRef: "[[ref:sousouri2025|Sousouri 2025]] (ETH) · [[ref:cacna1c_functional|Eckart et al. 2016]] · [[ref:cacna1c_amygdala|Tesli et al. 2013]]",

    neonatalQTitle: "Neonataalinen Q-tekijä: resonanssikynnys",
    neonatalQSub: "Miksi vastasyntyneen aivot ovat vaimentamaton resonaattori — GABA eksitatorinen NKCC1/KCC2-kytkimen kautta",
    neonatalQDesc: "Aikuisen neuroneissa GABA on inhibitorinen — se tarjoaa vaimennuksen (γ > 0) joka pitää Ca²⁺-vaihtelut rajattuina. Vastasyntyneillä NKCC1/KCC2-kloridikuljettajasuhde on kääntynyt: NKCC1 dominoi, kloridi on korkea solunsisäisesti ja GABA on eksitatorinen. Tämä tarkoittaa γ < 0 — järjestelmällä on negatiivinen vaimennus ja laatutekijä Q → ∞. Vastasyntyneen aivot ovat käytännössä vaimentamaton resonaattori: mikä tahansa EMF:n aiheuttama Ca²⁺-oskillaatio, kuinka pieni tahansa, soi ilman vaimenemista. Tästä syystä 2–4 kuukauden ikäikkuna on SIDS:n huippuriskikausi — KCC2-kytkin ei ole vielä tuonut vaimennusta.",
    neonatalQFormulaLabel: "Neonataalinen Q-tekijän vaimeneminen:",
    neonatalQFormula: "Q_neonatal(ikä) = Q₀ / (1 + (ikä / τ_KCC2)²)",
    neonatalQFormulaDesc: "Q₀ = laatutekijä syntyessä (maksimaalinen, ~vaimentamaton). τ_KCC2 ≈ 2–4 viikkoa = NKCC1→KCC2-kytkimen aikavakio. Syntyessä: Q ≈ Q₀. 2–4 kuukauden iässä: Q laskeva mutta vaarallisen korkea. 12 kuukauden iässä: Q lähestyy aikuistasoja (~1–5).",
    neonatalQVerification: "Bumetanidi (NKCC1-salpaaja) → palauttaa inhibitorisen GABAn → lopettaa neonataalit kohtaukset = tuo vaimennuksen. KCNQ2-mutaatiot → neonataalit kohtaukset jotka remittoituvat spontaanisti 3–6 kk iässä = KCC2:n kypsymisaikataulu.",
    neonatalQRef: "[[ref:neonatal_seizure_review2021|Neonatal seizure review 2021]] · [[ref:bumetanide_nkcc1|Bumetanide NKCC1 2015]] · [[ref:nkcc1_kcc2_bookshelf|NKCC1/KCC2 Bookshelf 2020]]",
    neonatalQSpectrum: "Neonataalin Q → ∞ -tila on jatkuvan spektrin toinen pää. Sama Q-tekijämekanismi — vaihtelevalla vaimennuskertoimella γ — yhdistää SIDS:n, epilepsian, SUDEP:n, migreenin ja klusteripäänsäryn. Spreading depolarization (CSD) on yhteinen terminaalireitti; Q-tekijä määrittää laukaistaanko CSD, kuinka pitkälle se leviää ja saavuttaako se aivorungon.",
    neonatalQSpectrumLink: "Ks. koko neurologisen spektrin analyysi →",

    feedbackLoopsTitle: "Seitsemäntoista positiivista takaisinkytkentäsilmukkaa",
    feedbackLoopsSub: "Itseään vahvistavat syklit muodostavat verkoston — mikä tahansa sisääntulopiste aktivoi useita rappeutumisspiraleja samanaikaisesti",
    feedbackLoopsDesc: "Yhdentymisen todentaminen paljasti seitsemäntoista positiivista takaisinkytkentäsilmukkaa BERM-kaskadissa. Silmukat muodostavat verkoston: mikä tahansa sisääntulopiste aktivoi useita rappeutumisspiraleja samanaikaisesti.",
    feedbackLoops: [
      { id: "S1", name: "Monitorin palauteresonanssi", steps: "Vauvan ääni → mikrofoni → RF-modulaatio → VGCC → Ca²⁺ → voimakkaampi oskillaatio → kovempi ääni → lisää RF:ää → kaskadivahvistus", status: "Mekanistisesti koherentti, testaamaton kokonaisuutena", color: "amber" },
      { id: "S2", name: "Serotoniin-lukitusavaus", steps: "EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓ → talamokortikaalinen portti AUKI → EMF tunkeutuu syvemmälle → lisää CaMKII-häiriötä → lisää 5-HT↓ → ...", status: "Jokainen linkki todennettu itsenäisesti", color: "green" },
      { id: "S3", name: "Hypoksia-NKCC1", steps: "CSD → paikallinen hypoksia → NKCC1↑ → GABA eksitatorisempi → γ↓ → Q↑ → CSD leviää helpommin → lisää hypoksiaa → ...", status: "NKCC1↑ hypoksiassa todennettu", color: "green" },
      { id: "S4", name: "Walkerin uniketju", steps: "EMF → melatoniini↓ → uni↓ → GABA-tooninen inhibitio↓ → γ↓ → Q↑ → EMF vaikuttaa aivoihin enemmän → lisää melatoniini↓ → ...", status: "Jokainen linkki todennettu itsenäisesti", color: "green" },
      { id: "S5", name: "PGC → BBB -spiraali", steps: "EMF → PGC → melatoniini↓ → BBB tiiviin liitoksen proteiinit↓ → raskasmetallit pääsevät aivoihin helpommin → lisää PGC:tä → ...", status: "Jokainen linkki todennettu itsenäisesti", color: "green" },
      { id: "S6", name: "Kortisoli-hippokampus-pyörre", steps: "EMF → HPA → kortisoli↑ → hippokampuksen atrofia → HPA:n negatiivinen palaute MENETETTY → ei jarrua → kortisoli↑↑ → ...", status: "Sapolskyn mekanismi todennettu", color: "green" },
      { id: "S7", name: "BAT metabolinen spiraali", steps: "EMF → BAT PRDM16↓ → termogeneesi↓ → metabolinen oireyhtymä → tulehdus → VGCC-herkkyys↑ → lisää Ca²⁺-häiriötä → ...", status: "Mekanistisesti koherentti, eläindata", color: "amber" },
      { id: "S8", name: "Testosteronin neuroprotektio-menetys", steps: "EMF → Leydig → StAR↓ → T↓ → neuroprotektio↓ + synaptinen plastisuus↓ → haavoittuvampi EMF:lle → lisää Leydig-vauriota → ...", status: "T↓ neuroprotektiolinkki todennettu", color: "green" },
      { id: "S9", name: "IL-1β → KCC2 -silmukka", steps: "EMF → syöttösolu → IL-1β → KCC2-kypsyminen viivästyy → GABA eksitatorinen pidempään → Q↑ → lisää neuronivaurioita → lisää IL-1β:tä → ...", status: "KCC2:n ympäristösäätely todennettu", color: "green" },
      { id: "S10", name: "Hypotalamuksen moniakselikaskadi", steps: "EMF → hypotalamuksen synaptiset vesikkelit↓ → GnRH↓ + CRH-häiriö + TRH↓ → monihormonipuutos → systeeminen stressi → lisää HPA-aktivaatiota → ...", status: "[[ref:kim2019_hypothalamus|Kimin 2019]] synaptiset muutokset todennettu", color: "green" },
      { id: "S11", name: "Sirkadiaanisen kellon itsehäiriö", steps: "EMF → SCN Ca²⁺ häiriintyy → melatoniinin ajoitus katoaa → Per2↓ suolistossa → perifeeriset kellot desynkronoituvat → SCN haavoittuvampi", status: "SCN Ca²⁺ -oskillaatio todennettu", color: "green" },
      { id: "S12", name: "NK-syöpä-tulehdus", steps: "ELF → NK-sytotoksisuus↓ → syöpävalvonta↓ → kasvainkasvu → tulehdus → VGCC-sensitisaatio↑ → lisää NK-suppressiota", status: "NK:n Ca²⁺-riippuvuus + ELF-suppressio todennettu", color: "green" },
      { id: "S13", name: "HPA-HPG-ristispiraali", steps: "EMF → kortisoli↑ → GnIH↑ → T↓ → neuroprotektio↓ → hippokampus haavoittuva → HPA-jarru menetetty → kortisoli↑↑ → lisää GnIH:ta", status: "RF9 palautti T:n kortisolikäsitellyissä kädellisissä", color: "green" },
      { id: "S14", name: "Suolisto-aivo-tulehdus", steps: "EMF → melatoniini↓ → Per2↓ suolistossa → suoliston este↓ → LPS verenkiertoon → neurotulehdus → hippokampaalinen neurogeneesi↓ → lisää HPA-aktivaatiota → lisää melatoniini↓", status: "Per2 KO → suoliston este → LPS → masennus todennettu", color: "green" },
      { id: "S15", name: "Melatoniini-telomeeri-ikääntymiskierre", steps: "EMF → melatoniini↓ → telomeraasi↓ + SIRT1↓ → telomeerien lyheneminen → SASP → tulehdus → ROS↑ → lisää telomeerivaurioita → lisää SASP:ia → ...", status: "Melatoniini → telomeraasi + SIRT1 todennettu; masennus = 7v kiihtynyt ikääntyminen", color: "green" },
      { id: "S16", name: "Kipu-uni-kortisoli-kierre", steps: "EMF → α2δ-1↑ → sentraalinen sensitisaatio → krooninen kipu → uni↓ (S4) → kortisoli↑ (S7) + GABA↓ → tulehdus → lisää sensitisaatiota → masennus → uni↓ → ...", status: "α2δ-1 → kipu ilman vauriota todennettu; kipu-uni-kortisoli jokainen todennettu", color: "green" },
      { id: "S17", name: "Amygdala-ahdistuskierre", steps: "EMF → Ca²⁺↑ → CaMKII → kortisoli↑ → BLA-hypertrofia → amygdala yliaktiivinen → ahdistus↑ → HPA-aktivaatio → kortisoli↑↑ → lisää BLA-hypertrofiaa → ...", status: "Yksittäinen kortisoliannos → BLA-hypertrofia todennettu ([[ref:amygdala_cort|PNAS 2008]]); pysyvyys todennettu ([[ref:amygdala_persist|Neurosci Lett 2023]])", color: "green" },
    ],
    feedbackLoopsLink: "Ks. koko yhdentymisen todentaminen →",

    hypoNexusTitle: "Hypotalamuksen keskuspiste (VK13)",
    hypoNexusSub: "Hypotalamus seitsemän hormoniakselin anatomisena yhdentymispisteenä",
    hypoNexusDesc: "[[ref:kim2019_hypothalamus|Kim 2019]] osoitti, että 835 MHz (12 viikkoa) vähentää synaptisten vesikkelien lukumäärää, kokoa ja telakoitumista hypotalamuksessa. Kriittisesti myös synaptotagmiini 1 — Ca²⁺-sensori vesikkelien vapautumiselle — vähenee. Koska KAIKKIEN hypotalamuksen hormonien vapautuminen riippuu Ca²⁺-laukaisemasta vesikkelien fuusiosta, synaptotagmiini 1:n menetys tarkoittaa KAIKKIEN akselien samanaikaista heikentymistä.",
    hypoNexusAxes: [
      { axis: "GnRH → LH/FSH → T↓", organ: "Sukurauhaset", consequence: "Testosteronin lasku, hedelmällisyyden menetys" },
      { axis: "CRH → ACTH → kortisoli↑", organ: "Lisämunuaiset", consequence: "HPA-sensitisaatio, krooninen stressi" },
      { axis: "TRH → TSH → T3/T4", organ: "Kilpirauhanen", consequence: "Subkliininen hypotyreoosi" },
      { axis: "GHRH → GH → IGF-1", organ: "Maksa/luu", consequence: "Kasvu- ja metabolinen häiriö" },
      { axis: "Dopamiini → prolaktiini", organ: "Aivolisäke", consequence: "Hyperprolaktinemia" },
      { axis: "Somatostatiini → GH/TSH", organ: "Useita", consequence: "Inhibitorisen kontrollin menetys" },
      { axis: "Oksitosiini / AVP", organ: "Useita", consequence: "Sosiaalinen käyttäytyminen, vesitasapaino" },
    ],
    hypoNexusKey: "VK13 on anatominen selitys sille, miksi EMF tuottaa SAMANAIKAISIA monijärjestelmävaikutuksia jotka vaikuttavat toisiinsa liittymättömiltä. Kyseessä ei ole 25 erillistä sairautta — vaan yksi häiriintynyt keskuspiste jolla on 7 ulostuloa.",

    tripleLockTitle: "Kolmoislukkoteoria",
    tripleLockSub: "Kolme samanaikaista puutosta jotka luovat itseään vahvistavan ansarakenteen: T↓ × F↑ × DA↓",
    tripleLockDesc: "EMF vähentää samanaikaisesti testosteronia (T↓ Leydig/StAR kautta), kohottaa kortisolia (F↑ HPA-sensitisaation kautta) ja vähentää dopamiinia (DA↓ mesolimbisen reitin kautta). Jokainen puutos vahvistaa toisia, luoden synergistisen ansarakenteen.",
    tripleLockComponents: [
      { component: "T↓ (Testosteroni)", mechanism: "EMF → Leydig → StAR↓ → steroidogeneesi↓", consequence: "Neuroprotektion menetys, lihasmassan lasku, hedelmällisyyden lasku, masennus" },
      { component: "F↑ (Kortisoli)", mechanism: "EMF → HPA-sensitisaatio → kortisolitaso↑", consequence: "Hippokampuksen atrofia, immuunisuppressio, metabolinen oireyhtymä" },
      { component: "DA↓ (Dopamiini)", mechanism: "EMF → CaMKII → DA-synteesihäiriö", consequence: "Anhedonia, motivaation menetys, addiktion haavoittuvuus" },
    ],
    tripleLockSynergy: "Kolmoislukkoteoria ei ole kolme itsenäistä vaikutusta — vaan synergistinen ansa. T↓ × F↑ = kiihtynyt neurodegeneraatio. F↑ × DA↓ = hoitoresistentti masennus. T↓ × DA↓ = motivaation romahdus. T↓ × F↑ × DA↓ = täydellinen moderni fenotyyppi.",

    quadLockTitle: "Nelilukko: Neljäs ulottuvuus",
    quadLockSub: "T↓ × F↑ × DA↓ × OXT↓ — oksitosiinin lisääminen täydentää sosiaalis-reproduktiivisen romahduksen",
    quadLockDesc: "Oksitosiinin vapautuminen on suoraan VGCC-riippuvaista (N-tyypin + L-tyypin Ca²⁺-kanavat, [[ref:oxt_vgcc|PMC3197583]]). EMF häiritsee VGCC-toimintaa → OXT-vapautus häiriintyy. OXT↓:n lisääminen kolmoislukkoon luo nelilukon joka selittää täydellisen modernin fenotyypin: ei vain fysiologista rappeutumista vaan sosiaalista pirstoutumista.",
    quadLockComponents: [
      { component: "T↓ × OXT↓", effect: "Reproduktiivis-sosiaalinen romahdus: hedelmällisyyden lasku + parisideoksen heikkeneminen" },
      { component: "DA↓ × OXT↓", effect: "Sosiaalisen motivaation romahdus: vähentynyt halu sosiaaliseen yhteyteen + vähentynyt palkitsevuus siitä" },
      { component: "F↑ × OXT↓", effect: "Stressi ilman puskurointia: kortisoli nousee kun OXT (sosiaalinen stressipuskuri) laskee" },
      { component: "T↓ × F↑ × DA↓ × OXT↓", effect: "Täydellinen moderni fenotyyppi: biologinen rappeutuminen + sosiaalinen eristäytyminen + motivaation romahdus" },
    ],
    quadLockNote: "Insuliini stimuloi OXT-vapautumista Ca²⁺:n kautta ([[ref:insulin_oxt|PMC6039480]]). Lihavilla henkilöillä on matalampi OXT. Tämä luo metabolis-sosiaalisen sillan: metabolinen oireyhtymä (S7) → insuliiniresistenssi → OXT↓ → sosiaalinen eristäytyminen → masennus → metabolinen oireyhtymä pahenee.",

    dualBarrierTitle: "Kaksoisestemekanismi",
    dualBarrierSubtitle: "BBB + suoliston este jakavat ZO-1:n, okludiinin, klaudiinit",
    dualBarrierBody: "Veri-aivoeste ja suoliston epitheelinen este jakavat samat tiiviin liitoksen proteiinit: ZO-1, okludiini ja klaudiinit. Melatoniini suojaa molempia esteitä. EMF→melatoniini↓ luo samanaikaisen kaksoishaavoittuvuuden: BBB avautuu (raskasmetallit pääsevät aivoihin) JA suoliston este heikkenee (LPS pääsee verenkiertoon → neurotulehdus). Tämä ei ole kaksi erillistä vaikutusta — se on yksi mekanismi (melatoniinin menetys) joka hyökkää kahta samasta molekulaarisesta työkalupakista rakennettua estettä vastaan.",

    bdnfHormesisTitle: "BDNF-hormeesi: taajuus määrää suunnan",
    bdnfHormesisSubtitle: "RF→BDNF↓ vs ELF→BDNF↑ — sama reitti, vastakkaiset lopputulokset",
    bdnfHormesisBody: "BDNF (aivoista peräisin oleva neurotrofinen tekijä) on välttämätön neuroplastisuudelle, muistille ja neurogeneesille. RF-EMF- ja ELF-tutkimuksissa on raportoitu erisuuntaisia BDNF- ja NK-solupäätepisteitä. BERM käyttää näitä löydöksiä perusteena taajuusriippuvaiselle hormeesihypoteesille ehdotettujen VGCC-reittien kautta. Johdettu χ_geo ja ehdollinen L2-operaattori eivät määrää biologisia lopputuloksia; BDNF-kudosydin ja päätepistekohtainen vaste on vielä kalibroitava.",

    agingSpiralTitle: "Ikääntymiskierre: Melatoniini anti-aging-molekyylinä",
    agingSpiralSub: "EMF → melatoniini↓ → telomeraasi↓ + SIRT1↓ → kiihtynyt ikääntyminen (masennus = 7 vuotta)",
    agingSpiralDesc: "Melatoniini ei ole vain unihormoni — se on avain-anti-aging-molekyyli. Se aktivoi telomeraasia (ylläpitää telomeeripituutta), säätelee SIRT1:tä ylös (→ ROS↓ → p53↓ → NF-κB↓) ja lievittää endoteelien ikääntymistä. EMF→melatoniini↓ poistaa tämän koko suojaavan kaskadin.",
    agingSpiralSteps: [
      { step: "EMF → melatoniini↓", detail: "Käpylisäkkeen suppressio CRY-reitin kautta (VK1-VK3)" },
      { step: "Melatoniini↓ → telomeraasi↓", detail: "Melatoniini aktivoi telomeraasia suoraan ([[ref:mel_telomerase|Front Aging Neurosci 2022]])" },
      { step: "Melatoniini↓ → SIRT1↓", detail: "SIRT1 → ROS↓ → p53↓ → NF-κB↓ anti-inflammatorinen kaskadi menetetty" },
      { step: "Telomeerien lyheneminen → SASP", detail: "Lyhentyneet telomeerit laukaisevat senescence-associated secretory phenotype → krooninen tulehdus" },
      { step: "SASP → ROS↑ → lisää telomeerivaurioita", detail: "Takaisinkytkentäsilmukka S15: tulehdus aiheuttaa oksidatiivista vahinkoa jäljellä oleville telomeereille" },
    ],
    agingSpiralQuantitative: "Kvantitatiivinen ankkuri: vakava masennus liittyy 281 bp lyhyempiin telomeereihin, mikä vastaa 7 vuoden kiihtynyttä ikääntymistä ([[ref:depression_telomere|PMC3063175]]). Metabolinen oireyhtymä on samoin yhteydessä lyhyempiin telomeereihin ja alentuneeseen telomeraasiaktiivisuuteen ([[ref:mets_telomere|PMC12744432]]). Molemmat tilat ovat BERM-ennustettuja lopputuloksia — niiden ikääntymisen kiihtyminen on konsistentti EMF→melatoniini↓→telomeraasi↓ kanssa.",

    genSuscTitle: "Geneettinen herkkyyskartta: 15 geenin kalsiumprofiili",
    genSuscSub: "EMF-herkkyys ei ole yksi geeni — se on polygeeninen profiili kalsiumkaskadin viidellä funktionaalisella tasolla",
    genSuscDesc: "BERM tunnistaa 15 geeniä, joiden polymorfismit säätelevät yksilön EMF-herkkyyttä. Ne jakautuvat viiteen funktionaaliseen tasoon: INFLUKSI (5 CACNA-geeniä Ca²⁺-sisäänvirtaukselle), MODULAATIO (CACNA2D1 kanavatiheydelle), INTEGRAATIO (CAMK2A/B yhdentymispisteessä), ERITYS (3 geeniä Ca²⁺-poistolle) ja SIGNALOINTI (4 geeniä vastemuokkaukselle). Jokaisen geenin tautiassosiaatiot vastaavat BERM-kaskadien ennusteita.",
    genSuscInfluxTitle: "Taso 1 — Influksi: Ca²⁺-sisäänvirtauskanavat",
    genSuscInfluxGenes: [
      { gene: "CACNA1C", protein: "Cav1.2 (L-tyyppi)", role: "Pää-RF-kohde. Neuronit, sydän, β-solut.", variant: "rs1006737 A-alleeli", diseases: "Bipolaari, skitsofrenia, ASD, masennus, Timothy", evidence: "VAHVISTETTU ([[ref:sousouri2025|Sousouri 2025]] RCT)" },
      { gene: "CACNA1H", protein: "Cav3.2 (T-tyyppi)", role: "ELF-kohde. Leydig-solut, pineaali, talamus.", variant: "GoF-mutaatiot", diseases: "Lapsuuden epilepsia, kuumekouristukset, primäärinen aldosteronismi, ASD", evidence: "KONSISTENTTI" },
      { gene: "CACNA1D", protein: "Cav1.3 (L-tyyppi)", role: "Sisäkorva, SA-solmu, substantia nigra.", variant: "GoF/LoF-variantit", diseases: "Bradykardia, epilepsia, kuulovaurio, ADHD, ASD", evidence: "KONSISTENTTI" },
      { gene: "CACNA1A", protein: "Cav2.1 (P/Q-tyyppi)", role: "Presynaptinen vapautus. ELF-priming-kohde.", variant: "rs16023 B-alleeli", diseases: "DD + epilepsia, familiaalinen hemipleginen migreeni, episodinen ataksia", evidence: "VAHVISTETTU (ELF-priming + GWAS)" },
      { gene: "CACNA1B", protein: "Cav2.2 (N-tyyppi)", role: "Kipuradat, sympaattinen hermosto.", variant: "Harvinaisia mutaatioita", diseases: "Krooninen kipu, sympaattinen häiriö", evidence: "KONSISTENTTI" },
    ],
    genSuscModTitle: "Taso 2 — Modulaatio: Kanavien tiheyden säätely",
    genSuscModDesc: "CACNA2D1 koodaa α2δ-1:tä, proteiinia joka säätelee VGCC:iden kuljetusta synapseihin. Tämä on ELF-primaamin molekulaarinen perusta: 50/60 Hz -altistus lisää α2δ-1:tä → enemmän VGCC:itä solupinnalle → solut herkistyvät KAIKELLE myöhemmälle EMF:lle. Gabapentinoidit (pregabaliini, gabapentiini) sitoutuvat α2δ-1:een ja ESTÄVÄT tämän kuljetuksen — mikä tekee niistä mekanistisesti ELF-primaamin ANTAGONISTEJA.",
    genSuscModRef: "[[ref:field2006_cacna2d1|Field 2006]] (PNAS) · [[ref:hoppa2012_a2d|Hoppa 2012]] (Nature)",
    genSuscIntTitle: "Taso 3 — Integraatio: CaMKII-yhdentyminen",
    genSuscIntDesc: "CAMK2A/B de novo -mutaatiot, jotka LISÄÄVÄT autofosforylaatiota Thr286/287:ssä, tuottavat epilepsian, kehitysvamman ja autismin — TÄSMÄLLEEN ne fenotyypit, joita BERM ennustaa ympäristöllisestä (EMF) autofosforylaation lisäyksestä. Mutaatiot jotka VÄHENTÄVÄT autofosforylaatiota aiheuttavat myös kehitysvamman. Molemmat suunnat = häiriö → tarkka säätely on kriittistä. Tämä on BERM:n SUORIN geneettinen todentaminen: geneettinen ja ympäristöllinen CaMKII-häiriö yhtyvät identtisiin kliinisiin lopputuloksiin.",
    genSuscIntRef: "[[ref:kury2017_camk2|Küry 2017]] (AJHG, PMC5673671) · [[ref:altawashi2018_camk2a|Al-Tawashi 2018]] (eLife, PMC5963920)",
    genSuscExtTitle: "Taso 4 — Eritys: Ca²⁺-poisto",
    genSuscExtDesc: "Kolme geeniä säätelee Ca²⁺:n poistoa soluista. Hidas eritys + korkea sisäänvirtaus = Ca²⁺ kasaantuu → CaMKII-kynnys ylittyy matalammilla EMF-tasoilla. SLC8A1 (NCX1): sydämen/neuronien Ca²⁺-vienti. ATP2B1 (PMCA1): yleinen Ca²⁺-pumppu (GWAS: hypertensio). ATP2B2 (PMCA2): sisäkorva — hidas PMCA2 + Bluetooth-kuulokkeet = tinnitusriski.",
    genSuscSigTitle: "Taso 5 — Signalointi: Jatkovaste",
    genSuscSigGenes: [
      { gene: "CRY1", variant: "CRY1Δ11 (0,6 %)", effect: "GoF → pidempi sirkadiaaninen jakso → viivästynyt uni → lyhyempi palautumisikkuna. EMF häiritsee CRY:tä → ADDITIIVINEN geneettisen pidennyksen kanssa.", diseases: "DSPD, metabolinen häiriö, unettomuus", evidence: "VAHVISTETTU ([[ref:patke2017_cry1|Patke 2017]] Cell)" },
      { gene: "MTNR1B", variant: "rs10830963 G", effect: "eQTL → enemmän MT2-reseptoreita β-soluissa → YLIHERKÄT melatoniinimuutoksille. EMF vaimentaa melatoniinia → G/G-kantajat kärsivät ENEMMÄN → T2D-riski SUPERADDITIIVINEN.", diseases: "T2D, paastoglukoosi, raskausdiabetes", evidence: "VAHVISTETTU (GWAS + eQTL)" },
      { gene: "COMT", variant: "Val158Met (rs4680)", effect: "Val/Val = nopea dopamiinipuhdistuma = matala DA-perusviiva → EMF:n aiheuttama DA-synteesilasku iskee ANKARAMMIN (pienempi puskuri).", diseases: "Stressihaavoittuvuus, addiktio, kipuherkkyys", evidence: "JOHDETTAVISSA" },
    ],
    genSuscEhsTitle: "EHS uudelleenmääriteltynä: polygeeninen kalsiumkynnöshäiriö",
    genSuscEhsDesc: "EHS (sähköherkkyysoireyhtymä) ei ole psykosomaattinen — se on polygeenisesti ennustettavissa oleva Ca²⁺-kynnöshäiriö. Korkea VGCC-sisäänvirtaus (CACNA GoF) + hidas eritys (SLC8A1/ATP2B LoF) + herkkä signalointi (CRY1Δ11, MTNR1B GG, COMT Val/Val) = matala CaMKII-autofosforylaatiokynnys = oireet EMF-tasoilla, jotka ovat väestön keskiarvon alapuolella.",
    genSuscEhsBiomarker: "Ehdotettu biomarkkeri: CaMKII Thr286 -autofosforylaatiotaso lymfosyyteissä. Korkeampi taso = lähempänä kynnystä = EMF-herkempi. Tämä voisi olla EHS:n ensimmäinen OBJEKTIIVINEN biomarkkeri.",
    genSuscEpistaticTitle: "Epistattiset interaktiot",
    genSuscEpistatic: [
      { pair: "CACNA1C × MTNR1B", effect: "Masennus + T2D samasta melatoniinivaimennuksesta eri elimissä. AA + GG -kantajilla: korkein komorbiditeetti.", status: "TESTATTAVISSA (biopankki)" },
      { pair: "CRY1Δ11 × MTNR1B", effect: "Viivästynyt melatoniini × β-solu-yliherkkyys → aamupaastoglukoosi erityisesti koholla.", status: "JOHDETTAVISSA" },
      { pair: "CACNA × SLC8A1/ATP2B", effect: "Korkea sisäänvirtaus + hidas eritys = Ca²⁺ kasaantuu → EHS-fenotyyppi.", status: "TESTATTAVISSA (EHS-kohortin genotyypitys)" },
      { pair: "CAMK2A × CACNA2D1", effect: "CaMKII lähellä kynnystä + enemmän kanavia = kriittisesti herkkä kaikelle EMF:lle.", status: "KONSISTENTTI" },
    ],
    genSuscPrinciples: [
      { id: "GXEMF-1", title: "Geeni × EMF -interaktiot ovat superadditiivisia", desc: "Geneettisen riskin manifestoituminen riippuu EMF-altistuksesta. EMF 'aktivoi' geneettisiä riskejä, jotka olisivat piilevät EMF-vapaassa ympäristössä." },
      { id: "GXEMF-2", title: "Gabapentinoidit kumoavat ELF-primaamin α2δ-1:n kautta", desc: "Pregabaliini/gabapentiini sitoutuvat α2δ-1:een ja estävät VGCC-kuljetuksen. Gabapentinoidien käyttäjillä on matalampi synaptinen VGCC-tiheys → vähemmän EMF-herkkiä." },
      { id: "GXEMF-3", title: "CaMKII-autofosforylaatio on mitattavissa oleva biomarkkeri", desc: "CaMKII Thr286 -fosforylaatiotaso lymfosyyteissä: korkeampi = EMF-herkempi. Testattavissa EHS-kohorteissa." },
    ],
    genSuscRef: "[[ref:kury2017_camk2|Küry 2017]] · [[ref:patke2017_cry1|Patke 2017]] · [[ref:lyssenko2009_mtnr1b|Lyssenko 2009]] · [[ref:tuomi2016_mtnr1b|Tuomi 2016]] · [[ref:scholl2015_cacna1h|Scholl 2015]] · [[ref:korean2025_cacna|Korean 2025]] · [[ref:field2006_cacna2d1|Field 2006]] · [[ref:hoppa2012_a2d|Hoppa 2012]]",

    recovWindowTitle: "Palautumisikkuna: CaMKII-defosforylaatio",
    recovWindowSub: "Moderni elämä poistaa EMF-vapaat tunnit, joita Ca²⁺-homeostaasin palautuminen vaatii",
    recovWindowDesc: "CaMKII:n defosforylaatio (palautuminen autofosforyloidusta tilasta) vaatii aikaa ilman Ca²⁺-ylikuormaa. EMF-vapaa uni mahdollistaa tämän palautumisen. Mutta modernit ympäristöt poistavat EMF-vapaat tunnit: WiFi-reititin 24/7, puhelin yöpöydällä, LED-valaistus uneen asti, Bluetooth-laitteet. Palautumiskerroin (R) kuvaa tämän: kun EMF-vapaat tunnit lähestyvät nollaa, nimittäjä 1/R lähestyy arvoa 1,0 (ei palautumista), ja kumulatiivinen vaurio kiihtyy.",
    recovWindowEvidence: "Vuorotyö: [[ref:shiftwork_mets2025|OR 1,17]] metaboliselle oireyhtymälle — yövuoro häiritsee sekä melatoniinia että palautumisikkunaa. [[ref:walker2017_why_we_sleep|Walker (2017)]]: yksi yö huonoa unta → testosteroni −15 %, NK-solut −70 %. Hyvä uni PALAUTTAA → palautumisikkuna ON todellinen. COVID-sulkujen luonnollinen koe: 24 h/vrk kotona WiFin + LEDien + useiden laitteiden kanssa → palautumisikkuna poistettu → T2D-kiihdytys [[ref:t2d_covid2024|2,90 %:sta 3,52 %/v]].",
    recovWindowIntervention: "Yksinkertaisin interventio, jonka malli ennustaa: EMF-vapaa makuuhuone. Poista WiFi-reititin makuuhuoneesta, käytä lentokonetilaa yöllä, vaihda hehkulamppuun tai kynttilänvaloon ennen unta. Tämä palauttaa palautumisikkunan ilman muita elämäntapamuutoksia.",
    recovWindowPred1: "RECOV-1: EMF-vapaa makuuhuone → melatoniini nousee mitattavasti 2 viikossa",
    recovWindowPred2: "RECOV-2: Minimipalautumisaika CaMKII-defosforylaatiolle: 4–6 tuntia EMF-vapaata",
    recovWindowRef: "[[ref:walker2017_why_we_sleep|Walker 2017]] · COVID-sulkudata · Vuorotyön meta-analyysit",

    mtorSub: "EMF, kalorirajoitus ja rapamysiini yhtyvät samaan ikääntymispolkuun",
    mtorTitle: "mTOR-yhdentymishypoteesi",
    mtorDesc1:
      "mTOR on jatkovaiheen integraattori, jossa EMF:n aiheuttama Ca²⁺-sisäänvirtaus konvergoi ikääntymis-, hedelmällisyys- ja syöpäreittien kanssa. Sempou-reitti: EMF → VGIC → Ca²⁺↑ → mTOR-hyperaktivaatio → autofagia↓, vanhenevien solujen kertyminen, mitokondriaalinen laadunvalvonta↓, krooninen tulehdus↑.",
    mtorDesc2:
      "Metformiini aktivoi AMPK:n, joka vaimentaa mTOR:ia -- täsmälleen EMF:n aiheuttaman reitin vastakohta. Hypoteesi: metformiinin pitkäikäisyyshyöty ei ole ikääntymisen vastainen sinänsä, vaan EMF-kiihdytetyn ikääntymisen vastainen. Luonnollisessa EMF-ympäristössä (amissit) hyödyn tulisi olla minimaalinen.",
    mtorEqExplain:
      "Missä EMF on normalisoitu altistus (0 = ei infrastruktuuria, 1 = moderni kaupunki) ja reduktiotekijöihin kuuluvat metformiini (0,30), rapamysiini (0,85), kalorinrajoitus (0,20), ajoittainen paasto (0,10).",
    mtorThreeTitle: "Kolme epidemiaa, yksi mekanismi",
    mtorAging: "Ikääntyminen",
    mtorAgingDesc:
      "mTOR↑ → autofagia↓, seneskenssi↑, tulehdus↑, mitokondriot↓ → kiihtynyt ikääntyminen",
    mtorFertility: "Hedelmällisyys",
    mtorFertilityDesc:
      "mTOR↑ → spermatogoniaalinen erilaistuminen↓, follikulaarinen loppuunpalaminen↑, AMH↓ → TFR↓",
    mtorCancer: "Syöpä",
    mtorCancerDesc:
      "mTOR↑ → proliferaatio↑, kasvainkasvu↑, metastaasi↑ → syöpäriski↑",
    mtorPredTitle: "Testattavat ennusteet",
    mtorPredColId: "ID",
    mtorPredColPred: "Ennuste",
    mtorPredColTest: "Testi",
    mtorPreds: [
      {
        id: "E1",
        pred: "Metformiinin pitkäikäisyyshyöty on suurempi korkean EMF:n ympäristöissä",
        test: "UK CPRD stratifioituna kaupunki/maaseutu",
      },
      {
        id: "E2",
        pred: "Amissien metformiinin käyttäjät saavat pienemmän pitkäikäisyysbonuksen kuin yleinen väestö",
        test: "Amissien diabeteskohortin vertailu",
      },
      {
        id: "E3",
        pred: "Blue Zone -pitkäikäisyysetu häviää 4G/5G:n saapuessa",
        test: "Okinawa, Sardinia, Ikaria -kohorttien seuranta",
      },
      {
        id: "E4",
        pred: "CR-kokeiden efektikoot kasvavat vuosikymmenittäin (kasvava laboratorio-EMF)",
        test: "Meta-analyysi: efektikoko vs. julkaisuvuosi",
      },
      {
        id: "E5",
        pred: "TAME-tutkimuksen hyöty stratifioituu EMF-altistuksen mukaan",
        test: "Kaupunki vs. maaseutu -alaryhmäanalyysi",
      },
      {
        id: "E6",
        pred: "Sapatti (25 h/viikko EMF-vapaata) toimii ajoittaisena mTOR-paastona, tukien haredi-TFR:ää ja pitkäikäisyyttä",
        test: "Haredi vs. sekulaari israelilaiskohortti",
      },
    ],

    fourRoutesTitle: "Viisi itsenäistä EMF -> TFR -reittiä",
    fourRoutesSub: "Gonadi-, sirkadiaaninen, aivolisäke-, autonominen ja neurokehityksellinen — jokainen riittää yksinään",
    fourRoutesDesc: "BERM tunnistaa viisi itsenäistä biologista reittiä, joiden kautta EMF-altistus voi vähentää hedelmällisyyttä. Jokainen reitti toimii erillisen mekanismin ja kohdekudoksen kautta. Kriittisesti jokainen reitti on itsenäisesti riittävä vähentämään TFR:ää — ne toimivat rinnakkain, eivät sarjassa. Tämä tarkoittaa, että yhden reitin estäminen (esim. antioksidanttilisä gonadireitille) ei poista vaikutusta, koska neljä muuta reittiä pysyvät aktiivisina.",
    fourRoutesGonadal: "Reitti 1: Gonadaalinen (vakiintunut)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> sperman DNA-vaurio + Leydig-solujen StAR-suppressio -> testosteronin lasku + spermatogeneesin häiriö. Lisäksi: EMF -> CatSper-ennenaikainen aktivaatio -> energian ehtyminen -> navigointivika (reotaksis, kemotaksis, akrosomireaktio). Kohdekudos: kivekset. Näyttötaso: E (23-28 salpaajatutkimusta). Ensisijainen kanava: RF + ELF.",
    fourRoutesCircadian: "Reitti 2: Sirkadiaaninen (vakiintunut)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> vuorokausirytmin häiriö -> melatoniinivaimennus -> HPG-akselin häiriö + oksidatiivinen stressi follikkeli­nesteessä. Kohdekudos: pinealirauhanen, SCN. Näyttötaso: E. Ensisijainen kanava: RF (magneettikomponentti).",
    fourRoutesPituitary: "Reitti 3: Aivolisäke (uusi)",
    fourRoutesPituitaryDesc: "EMF -> Cav3 T-tyypin kanavat gonadotrofeissa -> FSH/LH-erityksen häiriö -> jatkovaiheen gonadaalinen toimintahäiriö. Aivolisäke sijaitsee BBB:n ulkopuolella ja on suoraan altistunut. Kaikki hormonisolut ilmentävät Cav3:a. Tämä reitti voi vähentää hedelmällisyyttä gonadaalivauriosta riippumatta. Kohdekudos: aivolisäke. Näyttötaso: E. Ensisijainen kanava: ELF + RF.",
    fourRoutesAutonomic: "Reitti 4: Autonominen (uusi)",
    fourRoutesAutonomicDesc: "EMF -> SA-solmukkeen Cav3.1 -> HRV:n lasku -> vagaalisen tonuksen lasku -> HPA-akselin yliaktivaatio -> krooninen kortisoli -> HPG-ristiinhibitio. HRV on herkkä varhainen biomarkkeri. Kohdekudos: SA-solmuke, vagushermo. Näyttötaso: E. Ensisijainen kanava: ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "Reitti 5: Neurokehityksellinen (johdettu)",
    fourRoutesNeurodevelopmentalDesc: "EMF → VGCC/Ca²⁺ kriittisten kehitysikkunoiden aikana → häiriintynyt aivojen seksuaalinen differentiaatio, PFC:n kypsyminen, identiteetin muodostus. Sama mekanismi kuin kemialliset EDC:t (BPA, ftalaatit). Additiivinen kemiallisten EDC-vaikutusten kanssa. Estetään: prenataalin EMF-altistuksen vähentäminen, B2/glutationituki. Kohdekudos: sikiön/vauvan aivot. Näyttötaso: L* (johdettu ennuste — odottaa DIFF-1 AGD -testiä). Ensisijainen kanava: RF + ELF.",
    cascadeNeurodevExt: "Laajennettu analyysi: CACNA1C jaettuna geneettisenä haavoittuvuutena ASD:n, ADHD:n, kaksisuuntaisen mielialahäiriön, masennuksen ja skitsofrenian välillä. Seitsemän kehityskanavaa yhdistää EMF:n aivojen seksuaaliseen differentiointiin samojen Ca²⁺-reittien kautta. Katso aivojen moduloomi täyteen analyysiin.",
    fourRoutesImplication: "Kliininen seuraus: interventiot, jotka kohdistuvat vain yhteen reittiin (esim. antioksidantit reitille 1) osoittavat osittaista mutta epätäydellistä suojaa. Täysi suoja vaatii joko EMF-vähennyksen (käsittelee kaikkia reittejä samanaikaisesti) tai useaan kohteeseen suunnatun interventiostrategian.",

    modulationTitle: "Miksi modulaatio merkitsee enemmän kuin SAR",
    modulationDesc: "Laaja tutkimus ([[ref:fert-steril-2023-phone-sperm-trend|Fertility and Sterility 2023]]) havaitsi matkapuhelimen käytön yhteyden matalampaan siittiöpitoisuuteen — mutta yhteys oli VAHVEMPI vuosina 2005–2007 kuin 2012–2018. BERM selittää tämän Schwanin yhtälön kautta: biologisesti aktiivinen komponentti ei ole RF-kantoaalto vaan sen ELF-MODULAATIOVERHOKÄYRÄ. GSM (2G): kova TDMA-pulssi 217 Hz, ~100 % modulaatiosyvyys → vahva ELF-komponentti → suuri T-tyypin bifurkaatiovaikutus. LTE (4G): OFDM, ~30–50 % modulaatiosyvyys, matalampi lähetysteho → heikompi ELF-komponentti → pienempi vaikutus. Tämä ennustaa aikatrendin ILMAN 'vähemmän säteilyä on turvallisempaa' -selitystä. Säteilyn MÄÄRÄ voi olla samankaltainen, mutta MODULAATIORAKENNE muuttui.",
    modulationWarning: "Huomautus: tämä aikatrendi on KORRELAATIO. Muut tekijät muuttuivat samanaikaisesti (puhelimen sijainti, käyttötottumukset, muut altistukset). Schwanin selitys on parsimonisin mutta ei ainoa mahdollisuus.",

    modulomeSub: "Kaksitoistakerroksinen alttiusmalli — molekulaarisesta spinfysiikasta populaatiotason malleihin",
    modulomeTitle: "EMF-moduloomi",
    modulomeDesc: "Kaksitoistatasoinen moduloomi luetteloi moderaattoriehdokkaita molekulaarisesta spinfysiikasta populaatiotason malleihin. BERM kuvaa ne päätepistekohtaisilla vasteytimillä; ne eivät ole universaali χ tai χ_geo eikä niitä johdeta FieldStatesta. Kaksitoista kerrosta, kymmenen kohde-elintä ja neljä ehdotettua reittiä fertiliteetin laskuun.",

    btnEvidence: "Selaa näyttöä",
    btnPredictions: "Näytä ennusteet",
    mathSub: "Johdettu geometria, ehdollinen vasteoperaattori ja avoin kudoskalibrointi",
    mathTitle: "Matemaattinen perusta",
    mathSubtitle:
      "Matematiikka erottaa vuoden 2025 Lindgren-ansatzin ja sen geometriset seuraukset BERM:n biologisista ja demografisista sulkeumista. Geometriasta vasteeseen johtavan operaattorin muoto johdetaan ehdollisesti eksplisiittisillä aine–metriikka- ja lineaarivasteoletuksilla; kudosydin, etumerkki, viive ja kalibrointi ovat avoimia.",

    thresholdTitle: "Testosteroni → TFR -kynnysmalli",
    thresholdSub: "Kvantitatiivinen yhteys biologisen kapasiteetin laskusta demografiseen romahdukseen",
    thresholdLead: "BERM-mallin vahvin ennustekomponentti. Testosteronin lasku (~1 %/vuosi, ikäriippumaton, dokumentoitu viidessä maassa) luo kolmivaiheisen trajektorin: hiljainen eroosio → kynnyksen ylitys → biologinen rajoite. Malli on kalibroitu Suomen ja Korean datalla ja tuottaa maakohtaisia, testattavia ennusteita.",
    thresholdPhase1Title: "Vaihe 1: Hiljainen eroosio",
    thresholdPhase1Desc: "Testosteroni laskee mutta on biologisesti riittävä. TFR vakaa tai laskee hitaasti kulttuuristen tekijöiden vaikutuksesta. Biologinen kapasiteetti ylittää kulttuurisen kysynnän.",
    thresholdPhase2Title: "Vaihe 2: Kynnys ylitetty",
    thresholdPhase2Desc: "Kumulatiivinen T-menetys ylittää ~40 %. Kasvava miesten subfertiliteetti (T < 300 ng/dL). TFR kiihtyy alaspäin biologisen kapasiteetin tullessa rajoittavaksi tekijäksi. Pronatalistiset ohjelmat alkavat epäonnistua.",
    thresholdPhase3Title: "Vaihe 3: Biologinen rajoite",
    thresholdPhase3Desc: "TFR laskee alle 1,0. Biologinen kyvyttömyys dominoi. Jopa motivoituneet pariskunnat tarvitsevat avustettua lisääntymistä. IVF-kysyntä kasvaa eksponentiaalisesti.",
    thresholdMathTitle: "Matemaattinen muotoilu",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_kult(t), TFR_bio(t) )",
    thresholdMathExplain: "Kun TFR_bio < TFR_kult, biologinen kapasiteetti on rajoittava tekijä. Sigmoidisiirtymä ~40 %:n kumulatiivisen T-menetyksen kohdalla tuottaa havaitun kuvion: vuosikymmeniä vakautta ja sitten nopea romahdus.",
    thresholdTableTitle: "Maakohtaiset parametrit",
    thresholdTableCountry: "Maa",
    thresholdTableRate: "r (%/v)",
    thresholdTableSource: "Lähde",
    thresholdTableCumul: "Kumul. 2024",
    thresholdTableThreshold: "Kynnysvuosi",
    thresholdTablePhase: "Vaihe",
    thresholdFinlandTitle: "Retrospektiivinen validointi: Suomi",
    thresholdFinlandText: "Suomi on mallin Rosetta-kivi. [[ref:perheentupa2013|Perheentupa (2013)]] dokumentoi 37 %:n kohorttikohtaisen T-laskun (n=3 271, 1972–2002). TFR pysyi vakaana 1,63–1,87 neljäkymmentä vuotta (1970–2010) ja romahti sitten 1,26:een vuoteen 2024 mennessä. ~35 vuoden viive T-laskun alusta TFR-romahdukseen on yhdenmukainen kumulatiivisen biologisen eroosion saavuttaessa kynnyksen. Jos malli olisi ollut olemassa vuonna 2005, se olisi voinut ennustaa Suomen romahduksen 10–15 vuotta etukäteen.",
    thresholdProjectionsTitle: "Maakohtaiset TFR-ennusteet",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "Interaktiivinen kynnysmalli",
    thresholdFootnoteDenmark: "[[ref:andersson-2007-denmark|Andersson 2007]] raportoi nollatuloksen BMI-vakioinnin jälkeen. Malli tulkitsee BMI:n välittäjäksi (EMF → metabolinen häiriö → BMI ↑ → T ↓), ei sekoittavaksi tekijäksi — BMI-vakiointi poistaa osan signaalista. Ks. kausaalirakenne-osio alla.",
    thresholdFootnoteEstimated: "Vertaisarvioitua pitkäaikaista T-trenditutkimusta ei ole saatavilla. Korean vauhti arvioitu korkeimmasta globaalista EMF-tiheydestä; Japanin vauhti arvioitu analogialla Suomen dokumentoituun laskuun. Nämä ovat alustavia ja päivitetään, kun suoria tutkimustuloksia on saatavilla.",
    thresholdCaveat: "T-laskuvauhdit ovat ikäriippumattomia sekulaaritrendejä vertaisarvioiduista pitkittäistutkimuksista. Korean ja Japanin vauhdit ovat arvioita. 40 %:n kynnys on kalibroitu, ei derivoitu. Ennusteet olettavat nykyisten vauhtien jatkumisen.",

    causalStructureTitle: "Miksi BMI ei selitä laskua",
    causalStructureLead: "Sitkeä vastaväite esittää, että kasvava lihavuus, ei ympäristöaltistus, selittää testosteronin pitkäaikaislaskun. Pearlin kausaalikehyksellä tehty formaali analyysi paljastaa, että BMI on mediaattori (kausaalireitillä), ei sekoittaja (itsenäinen syy). Mediaattorin korjaaminen poistaa todellista signaalia.",
    causalDagConventionalTitle: "Konventionaalinen tulkinta",
    causalDagConventionalCaption: "BMI sekoittajana: korjaus on oikein, nollatulos = ei laskua",
    causalDagBermTitle: "BERM-tulkinta",
    causalDagBermCaption: "BMI mediaattorina: korjaus poistaa medioidun signaalin, nolla = ylikorjaus",
    causalMazurTitle: "Vakiopainotesti: [[ref:mazur2013|Mazur ym. 2013]]",
    causalMazurText: "991 US Air Force -veteraania seurattiin 6 mittausaallon yli 20 vuoden ajan (1982-2002). Painonsa vakiona pitäneet miehet menettivät silti 117 ng/dL (19 %) testosteroninsa. Tämä on luonnollinen koe, joka kontrolloi BMI:n ilman tilastollista korjausta.",
    causalMazurQuote: "Emme ole tunnistaneet syytä pitkäaikaislaskuun, mutta suljemme pois kasvavan lihavuuden riittävänä tai ensisijaisena selityksenä.",
    causalMazurSource: "[[ref:mazur2013|Mazur, Westerman & Mueller 2013]], PLOS ONE",
    causalPathwayTitle: "Kvantitatiivinen reittihajotelma",
    causalPathwayDirect: "Suora reitti",
    causalPathwayDirectDesc: "EMF -> Cav3.2/melatoniini/kortisoli -> T-lasku",
    causalPathwayDirectEst: "~117 ng/dL / 20v (~67 %)",
    causalPathwayMediated: "Medioitu reitti",
    causalPathwayMediatedDesc: "Ehdokasvälitys: EMF ?→ aineenvaihduntamuutos ?→ BMI-nousu → aromataasi-/SHBG-muutos → T-muutos",
    causalPathwayMediatedEst: "~58 ng/dL / 20v (~33 %)",
    causalPathwayCaveat: "Nämä osuudet ovat suuntaa-antavia, johdettu [[ref:mazur2013|Mazur 2013]]:sta (vakiopaino- vs painonnousuryhmät). Formaali mediaatioanalyysi (SEM) voisi tarkentaa arvioita.",
    dagDietLifestyle: "Ruokavalio / Elämäntavat",
    dagBmiAdjCorrect: "BMI-korjaus: OIKEIN",
    dagNullNoDecline: "nolla = ei todellista laskua",
    dagMetabolicPaths: "6 metabolista",
    dagPathways: "reittiä",
    dagMediated: "medioitu (~33 %)",
    dagDirect: "suora (~67 %)",
    dagOvercorrection: "BMI-korjaus: YLIKORJAUS",
    dagRemoves: "poistaa ~33 % todellisesta signaalista",
    causalReconciliationTitle: "'Ristiriitaisten' tulosten sovittaminen",
    causalReconciliationLead: "Kun kausaalirakenne ymmärretään, kaikki olemassa olevat tutkimukset — nollatulokset mukaan lukien — ovat yhdenmukaisia:",
    causalReconciliationStudies: [
      { referenceId: "travison2007_v2", study: "Travison 2007", bmiAdj: true, result: "-1,0 %/v", interpretation: "Suora reitti havaittu (BMI-vakioitu). ELF-priming kasvoi samana ajanjaksona (WiFi + 3G levisivät)" },
      { referenceId: "mazur2013", study: "Mazur 2013", bmiAdj: false, result: "-0,95 %/v", interpretation: "Suora reitti vahvistettu luonnollisesti (vakiopaino). 20v = kerrostumat 2→4. Suora reitti ~67 %. Priming: P kasvoi 1,5 → 2,0 samassa ajassa" },
      { referenceId: "chodick-2020-israel", study: "Chodick 2020", bmiAdj: false, result: "-1,02 %/v", interpretation: "Kokonaisvaikutus (suora + välitetty). Israel: korkea RF-tiheys → vahva kerrostumavaikutus" },
      { referenceId: "santi2025", study: "Santi 2025", bmiAdj: true, result: "T ja LH lasku", interpretation: "Suora reitti + HPG-tason häiriö vahvistettu. LH↓ viittaa aivolisäkehäiriöön. Aivot eniten primatut (lähikentässä 24/7). CACNA1C-genotyyppi moderoi LH-vastetta" },
      { referenceId: "andersson-2007-denmark", study: "Andersson 2007", bmiAdj: true, result: "Nolla", interpretation: "Välitetty reitti dominoi → BMI-vakiointi poistaa signaalin. Tanska 56°N: jos tutkimus KESÄLLÄ → CRY saturoitunut → pienempi vaikutus. Vuodenaikakorjaus saattaa paljastaa signaalin" },
      { referenceId: "nyante2012_nhanes", study: "Nyante 2012", bmiAdj: true, result: "Nolla", interpretation: "Menetelmämuutos + välittäjän poisto → signaali peittynyt. USA (60 Hz) vs. Eurooppa (50 Hz): eri ELF-taajuus → mahdollisesti eri CRY-häiriöprofiili" },
    ],
    causalSantiTitle: "[[ref:santi2025|Santi 2025]]: sekä testosteroni ETTÄ LH laskevat",
    causalSantiText: "Suurin koskaan tehty meta-analyysi (1 064 891 miestä, 1971-2024) osoitti, että seerumitestosteroni laskee iästä, BMI:stä ja mittausmenetelmästä riippumatta. Kriittisesti myös LH (aivolisäkkeen signaali, joka ohjaa testosteronin tuotantoa) laskee — mikä sulkee pois yksinkertaisen kivestoiminnan heikkenemisen ja viittaa häiriöön hypotalamus-aivolisäketasolla.",
    causalSantiMechanism: "BERM ennustaa juuri tämän: reitti A (suora Leydigin solun Cav3.2 -> StAR) vähentää testosteronia, kun taas reitti B (melatoniini -> GnRH) ja reitti D (kortisoli -> HPG) vähentävät LH:ta. Molempien hormonien samanaikainen lasku on monitasoisen häiriön tunnusmerkki — ei ikääntyminen, ei lihavuus.",
    causalSantiSource: "[[ref:santi2025|Santi ym. 2025]], J Endocrinol Invest 48:2721-2734",
    pocketTitle: "Taskusiirtymä",
    pocketText: "Siittiölaskun kiihtyminen vuoden 2000 jälkeen ([[ref:levine2023_sperm|1,16→2,64 %/v]]) osuu yhteen yhden käyttäytymismuutoksen kanssa: puhelin siirtyi korvalta taskuun. 3G-datakyky tarkoitti, että puhelin pysyi taskussa jatkuvasti eikä sitä nostettu vain puhelujen ajaksi. Kivekset joutuivat lähikenttään 16 tunniksi päivässä.",
    causalInverseTitle: "Käänteinen farmakologinen testi: testosteronihoito kääntää lihavuuden",
    causalInverseText: "Jos lihavuus aiheuttaisi testosteronin laskun, testosteronin nostamisen ei pitäisi vaikuttaa painoon. Mutta testosteronihoito hypogonadaalisilla lihavilla miehillä tuottaa dramaattisen painonlaskun (jopa 30 kg luokan III lihavuudessa), mikä vahvistaa kaksisuuntaisen kausaalisuuden: T-suppressio ajaa painonnousua, ei vain päinvastoin.",
    causalInverseData: [
      { label: "Luokan I lihavuus", loss: "-16,3 kg", bmi: "-5,52" },
      { label: "Luokan II lihavuus", loss: "-25,3 kg", bmi: "-8,15" },
      { label: "Luokan III lihavuus", loss: "-30,5 kg", bmi: "-9,96" },
    ],
    causalInverseSource: "[[ref:saad2016|Saad ym. 2016]], rekisteritutkimukset",

    whyPronatTitle: "Miksi 200 miljardia dollaria ei nostanut Etelä-Korean syntyvyyttä",
    whyPronatText: "BERM:n kolmitasoarkkitehtuuri jakaa syntyvyyden biologiseen kapasiteettiin (taso 1), EMF-käyttäytymiskytkentään (taso 2) ja kulttuuriseen valintaan (taso 3). Pronatalismipolitiikat — käteisbonukset, vanhempainvapaat, päivähoitotuet — kohdistuvat tasoon 3 (motivaatio). Mutta kun taso 1 (biologinen kapasiteetti) muodostuu sitovaksi rajoitteeksi, mikään tason 3 kannustin ei voi kompensoida. Etelä-Korean kumulatiivinen testosteronihävikki ylittää 48 %. Kasvava osuus lasta haluavista pareista ei pysty hedelmöittymään luonnollisesti. 200 miljardia kohdistui mallin väärään tasoon.",
    whyPronatPrediction: "T-TFR-4: Korean TFR ei ylitä kestävästi 1,0:aa vuoteen 2035 mennessä, riippumatta politiikkapanostuksesta.",
    whyPronatFalsification: "Falsifiointi: Korean TFR yli 1,0 kestävästi 3+ vuotta.",

    bioFloorTitle: "Biologinen lattia",
    bioFloorText: "Spermatogeneesi vaatii intratesticulaarisen testosteronin 50–100× seerumipitoisuuden. Kun seerumitestosteroni laskee alle ~200 ng/dL, spermatogeneesi on vakavasti heikentynyt. Nykyisillä laskuvauhdilla (1 %/vuosi ~500 ng/dL lähtötasosta):",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "populaatiokeskiarvo, nuoret miehet" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "spermatogeneesikynnyksen alapuolella" },
    ],
    bioFloorConsequence: "Tämän lattian alapuolella edes IVF ei voi käyttää miehen omia siittiöitä. Luovuttajasiittiöt, testikulaarinen siittiöuutto tai tulevaisuuden teknologiat (in vitro -spermatogeneesi) tulevat välttämättömiksi. Tämä ei ole spekulaatiota — se on aritmetiikkaa sovellettuna mitattuihin laskuvauhteihin.",

    sixFactorTitle: "Miksi testosteroni on integraatiomuuttuja",
    sixFactorLead: "Testosteroni on BERM-viitekehyksen informatiivisin yksittäinen biomarkkeri, koska kuusi itsenäistä biofysikaalista ominaisuutta tekevät siitä poikkeuksellisen herkän EMF → VGCC → Ca²⁺ -mekanismille.",

    diseaseCascadesTitle: "Laajennetut sairauskaskadit",
    diseaseCascadesLead: "Yksitoista lisäsairauskaskadia VGCC-geeniperheen analyysistä. Kukin kaskadi yhdistää tietyn VGCC-alatyypin sairausmekanismiin omalla näyttötasollaan.",
    diseaseCascades: [
      { num: 9, title: "Myopia (likinäköisyys)", mechanism: "EMF → VGCC dopamiiniergisissä amakriinisoluissa → DA-vapautuminen häiriintyy → skleraalinen pidentymisjarru heikkenee + CRY → melatoniini → sirkadiaaninen silmän kasvu dysreguloituu. KOLME yhtyvää kanavaa.", level: "M", trend: "22,9 % (2000) → 34 % (2020) → 50 % (2050)" },
      { num: 10, title: "Autoimmuunisairaudet", mechanism: "EMF → krooninen Ca²⁺-perturbaatio T-soluissa → Ca²⁺-kalsineruiini-NFAT-reitti dysreguloituu → autoreaktiivisten T-solujen aktivaatio. Kalsineruiini-inhibiittorit (siklosporiini, takrolimuusi) ovat vakiohoito — farmakologinen vahvistus.", level: "M|C", trend: "5 % USA:n esiintyvyys, +19,1 %/vuosi globaalisti" },
      { num: 11, title: "Kuulonmenetys ja tinnitus", mechanism: "EMF → Cav1.3 sisäkarvasolujen synapsissa → krooninen Ca²⁺-ylikuorma → eksitotoksisuus → synapsivaurio. Bluetooth/kuuloke-EMF suoraan simpukan vieressä.", level: "M|C", trend: "17,7 % nuorista aikuisista raportoi tinnitusta; 1 mrd+ riskissä" },
      { num: 12, title: "Migreeni", mechanism: "CACNA1A (P/Q-tyyppi) GoF → CSD. CACNA1I (Cav3.3) variantit → hemipleginen migreeni (OR 2,30). Nainen:mies 2,5-4,3:1 yhdenmukainen sukupuolieriyisen VGCC:n kanssa.", level: "E", trend: "Esiintyvyys kasvaa; alkuikä 12-17" },
      { num: 13, title: "Uniarkkitehtuurin häiriö", mechanism: "Cav3.3 nRt:ssä → unisukkuloiden tahdistus. Cav3.1 TC-neuroneissa → delta-aallot. T-tyypin ikkunavirta → hidas oskillaatio. EMF → sukkula/delta-häiriö → unenlaatu ↓.", level: "M|C", trend: "Unettomuus kasvussa; unenkesto laskussa globaalisti" },
      { num: 14, title: "PCOS", mechanism: "4 elimen yhdentyminen: haiman β-solu (Cav1+3 → insuliini ↓) → hyperinsulinemia → teeka-androgeeni ↑ + granulosa-aromataasi → E2 ↓ + aivolisäkkeen Cav3 → LH/FSH ↑. Kaikki neljä EMF-herkkiä.", level: "M", trend: "5-20 % lisääntymisikäisistä naisista; kasvussa 2035 asti" },
      { num: 15, title: "Krooninen kipu", mechanism: "Cav3.2 on PRIMAARINEN kipukanava DRG-nosiseptoreissa. Ylireguloitu tulehdus-/neuropaattisessa kivussa. Naisten DRG-neuronit osoittavat voimakkaammat Cav3.2-virrat → sukupuoliero.", level: "M|C", trend: "Kroonisen kivun epidemia; sadat miljoonat kärsivät" },
      { num: 16, title: "Sydämen rytmihäiriö (QT)", mechanism: "CACNA1C GoF → Cav1.2 ikkunavirta ↑ → QT ↑. Timothyn oireyhtymä: äärimmäinen QT + autismi SAMASTA mutaatiosta.", level: "E", trend: "Timothy: useimmat kuolevat ennen 3v ilman hoitoa" },
      { num: 17, title: "Neurokehitys ja sukupuolen erilaistuminen", mechanism: "7 kausaalikanavaa × 3 kehitysikkunaa. Prenataalinen: Leydig Cav3 → T↓, aromataasi, aivolisäke. Pubertaalinen: PFC, melatoniini, OT/AVP, insulaarinen korteksi.", level: "L*", trend: "Sukupuoliklinikkälähetteet: Ruotsi +19 700 %; ASD-GD 6-26 %" },
      { num: 18, title: "TheraBionic: mekanismin todistus", mechanism: "FDA-hyväksytty (2019) laite HCC:lle. 27,12 MHz, AM tumoritarkoilla taajuuksilla. SAR 100-1000× alle puhelimen. Mekanismi: EMF → Cav3.2 → Ca²⁺ → HCC-differentaatio. VAHVISTAA ei-termisen EMF → VGCC.", level: "E", trend: "34 % selviytymislisäys pitkälle edenneessä HCC:ssä" },
      { num: 19, title: "Metabolinen oireyhtymä / Lihavuus", mechanism: "KUUSI yhtyvää EMF → Ca²⁺ -reittiä: (1) hypotalaaminen ruokahalun nousu ARC-glian Ca²⁺ → AgRP/NPY, (2) BAT-termogeneesi ↓ CaMKII/CREB → UCP1 ja SERCA2b/RyR2 häiriön kautta, (3) β-solun insuliinidynamiikka ↓ L-tyypin VGCC:n kautta, (4) kilpirauhasakseli → perusaineenvaihdunta ↓ Cav3:n kautta tyrotrofeissa, (5) melatoniini → metabolinen sirkadiaanihäiriö, (6) adiposyytin Ca²⁺ → lipogeneesi ↑. CaMKII on KONVERGENSSIMOLEKYYLI, joka yhdistää kaikki reitit. [[ref:klimentidis2010|Klimentidisin]] paradoksi: 24 populaatiota, 8 lajia KAIKKI lihovat (p = 1,2×10⁻⁷) — myös laboratoriorotat kontrolloidulla dieetillä. Lihavuus on multifaktoriaalinen — EMF on YKSI myötävaikuttava tekijä, joka selittää jäännöksen, johon dieetti/liikunta/genetiikka eivät riitä.", level: "M", trend: "Globaali lihavuus: 4 % (1975) → 13 % (2016) → 42 % (USA 2024)" },
    ],
    vgccDiagramTitle: "VGCC-geeniperhe",
    vgccDiagramSubtitle: "Kuusi geeniä, kuusi sairausklusteria, yksi mekanismi",
    emfBarTitle: "EMF-herkkyyshierarkia lepopotentiaalissa",
    emfBarSubtitle: "Suhteellinen aktivaatiotodennäköisyys ~−70 mV kalvopotentiaalissa",

    epistemic:
      "Episteeminen huomautus: Yllä olevat yhtälöt ovat nykyinen mallispesifikaatio (BERM v17). Parametriarvot on kalibroitu havaittua dataa vasten ja niitä päivitetään uuden näytön myötä. Malli on nimenomaisesti suunniteltu falsifioitavaksi -- jos sen ennusteet epäonnistuvat, malli on väärässä. Terapeuttinen laiteparadoksi (24+ regulaattorihyväksyttyä ei-termistä EMF-laitekategoriaa, DC:stä UV:iin) vahvistaa ei-termisen bioaktiivisuuden regulatiiviseksi tosiasiaksi, ei hypoteesiksi.",
    lbermRef:
      "Formaali jakobiaanitulorakenne (luku 17), todistusvelvollisuusrekisteri ja turvajärjestelmät on kuvattu perusdokumentissa (LBERM_final.docx).",
    svgSpermDamage: "Siittiövaurio",
    svgCircadian: "Vuorokausirytmi",
    svgMelatoninDown: "Melatoniini ↓",
    svgCa2Entry: "Ca²⁺-virtaus",
    svgCortisolUp: "Kortisoli ↑",
    svgTestosteroneDown: "Testosteroni ↓",
    svgAutophagyDown: "Autofagia ↓",
    svgCellGrowthDown: "Solukasvu ↓",
    svgTfr: "TFR:n",
    svgDecline: "lasku",
    svgFiveRoutesAria: "Viisi reittiä TFR:n laskuun",
    brainModulomeLink: "Aivojen moduloomi",
    routeGonadal: "Gonadaalinen",
    routeAutonomic: "Autonominen",
    routeNeurodevel: "Neurokehitys",
    routeLabel: "Reitti",
    routeParallelCaption: "Jokainen reitti on itsenäisesti riittävä — ne toimivat rinnakkain",
    labelWarning: "Varoitus",
    labelPrediction: "Ennuste",
    labelFalsification: "Falsifiointi",
    colStudy: "Tutkimus",
    colBmiAdj: "BMI-korj.",
    colResult: "Tulos",
    colBermInterpretation: "BERM-tulkinta",
    countryDenmark: "Tanska",
    countryFinland: "Suomi",
    countrySouthKorea: "Etelä-Korea",
    countryJapan: "Japani",
    estHighestEmf: "Arvio (korkein EMF)",
    estFinlandAnalogy: "Arvio (Suomi-analogia)",
    layerMilitaryRadar: "Sotilastutka",
    layerWeatherRadar: "Säätutka",
    layerMobileNetworks: "Matkapuhelinverkot",
    layerWindTurbines: "Tuuliturbiinit",
    layerDisplayTransition: "Näyttösiirtymä",
    layerSmartMeters: "Älymittarit",
    layerIndoorLed: "Sisä-LED",
    layerSolarInverters: "Aurinkoinvertterit",
    layerStreetLed: "LED-katuvalaistus",
    pharmEvidenceLink: "Farmakologinen näyttö: 8 lääkeryhmää yhtyvät BERM-reiteillä →",
    svgVgccPathway: "VGCC-reitti",
    svgAutophagy: "Autofagia",
    svgProteinSynthesis: "Proteiinisynteesi",
    svgCellGrowth: "Solukasvu",
    svgImmuneRegulation: "Immunosäätely",
    svgIntegrator: "integraattori",
    svgCalories: "Kalorit",
    svgAging: "Ikääntyminen",
    svgCounteracts: "(vastavaikutus)",
    svgFertilityDown: "Hedelmällisyys↓",
    svgCancer: "Syöpä",
    svgMtorSharedHub: "mTOR on yhteinen soluttaja — kolme epidemiaa, yksi mekanismi",
    svgInflammation: "Tulehdus",
    svgCortisol: "Kortisoli",
    svgMelatonin: "Melatoniini",
    svgPosFeedback: "Positiivinen palaute",
    svgNegFeedback: "Negatiivinen palaute",
    svgHub: "soluttaja",
    svgFeedbackCaption: "17 positiivista takaisinkytkentäsilmukkaa — mikä tahansa sisääntulopiste aktivoi koko verkoston",
    svgVgccHierarchyCaption: "T-tyypin (Cav3) kanavat >> Cav1.3 (matalan kynnyksen L-tyyppi) >> Cav1.2 (vain aktiopotentiaalin aikana). CaMKII-takaisinkytkentä siirtää Cav3.2-kynnystä negatiivisemmaksi ajan myötä.",
    svgRecoveryBarAria: "Palautumisasteiden pylväskaavio",
    svgRecoveryCaption: "Palautumisaste (α): 1.0 = täydellinen, 0.0 = palautumaton",
    svgTechLayersAria: "Teknologiakerrosten kasautuva altistuskaavio",
    layerPowerGrid: "Sähköverkko",
    layerRadioTv: "Radio/TV",
    layerCellular: "GSM",
    svgCumulativeExposure: "Kumulatiivinen altistus",
    svgTechLayersCaption: "Viisi teknologiakerrosta: jokainen sukupolvi kerrostuu aiempien päälle",
    conventionalLabel: "Konventionaalinen:",
    layerExplanationLabel: "Kerrostumaselitys:",
    conventional: "Konventionaalinen",
    anomalyUnexplainedDecline: "Selittymatton lasku",
    anomalyUnexplained: "Selittymatton",
    anomalyWifiLedLayers: "WiFi+LED-kerrokset",
    anomalySocialMedia: "Sosiaalinen media",
    anomalySomeTheory: "Some-teoria",
    anomalyTripleChannel: "Kolmoiskanava",
    anomalySedentary: "Istuminen",
    anomaly247Emf: "24/7 EMF",
    anomalyProsperity: "Vauraus",
    anomalyElectrificationLag: "Sähköistysviive",
    anomalyPhysicalLabor: "Fyysinen tyo",
    anomalyZeroLayers: "Nolla kerrosta",
    colCountry: "Maa",
    colActual: "Todellinen",
    colNote: "Huomio",
    countryFinlandName: "Suomi",
    countrySouthKoreaName: "Etelä-Korea",
    countryUsaName: "USA",
    countryAmishName: "Amissit",
    colDriver: "Ajuri",
    replacementLabel: "Uusiutumistaso",
    countrySKoreaShort: "Etelä-Korea",
    countryIndiaName: "Intia",
    colAxis: "Akseli",
    colTargetOrgan: "Kohde-elin",
    colConsequence: "Seuraus",
    svgGenesCascadeAria: "15 geenin kaskadidiagrammi",
    tierInflux: "SISÄÄNVIRTAUS",
    tierModulation: "MODULAATIO",
    tierIntegration: "INTEGRAATIO",
    tierExtrusion: "POISTO",
    tierSignaling: "SIGNALOINTI",
    svgGenesCascadeCaption: "Ca²⁺-kaskadi: 15 geeniä viidessä toiminnallisessa kerroksessa",
    colGene: "Geeni",
    colProtein: "Proteiini",
    colBermRole: "BERM-rooli",
    colKeyVariant: "Avainvariantti",
    colDiseases: "Taudit",
    colEvidence: "Näyttö",
    colVariant: "Variantti",
    colEffect: "Vaikutus",
    ehsAssay: "maarittely",
    ehsLymphocyte: "Lymfosyytti-autofosforylaatio",
    ehsElevated: "Kohonnut",
    ehsGenotyping: "genotyypitys",
    ehsCalciumVariants: "Kalsiumkanavavariantit",
    ehsRiskAlleles: "Riskialleelit",
    ehsSignalingMarkers: "Signalointimarkkerit",
    ehsHighRisk: "Korkea riski",
    ehsPolygenicScore: "Polygeeninen riskipistemäärä",
    ehsOverallAssessment: "EMF-herkkyyden kokonaisarvio",
    ehsDiagnosticClass: "EHS-diagnostinen luokitus",
    ehsLowModHigh: "Matala / Keskitaso / Korkea",
    whyDisagreeTitle: "Miksi tutkimukset ovat ristiriidassa",
    whyDisagreeSub: "Kahdeksan kontrolloimatonta moderaattoria selittävät vuosikymmenten 'ristiriitaisen näytön'",
    whyDisagreeDesc: "EMF-tutkimus on tuottanut ristiriitaisia tuloksia vuosikymmeniä. BERM tunnistaa kahdeksan kontrolloimatonta moderaattoria, jotka ennustavat mitkä tutkimukset löytävät positiivisen tuloksen ja mitkä nollatuloksen:",
    modSeason: "Vuodenaika",
    modSeasonDesc: "CRY-magnetoreseptorin herkkyys on valoriippuvainen. Talvella CRY on herkempi → EMF-vaikutus melatoniiniin voimakkaampi. Osoitettu vasikoilla ([[ref:halgamuge2015|Halgamuge 2015]]).",
    modGenotype: "Genotyyppi",
    modGenotypeDesc: "CACNA1C rs1006737 A-alleeli → enemmän Cav1.2 → suurempi Ca²⁺-vaste. [[ref:sousouri2025|Sousouri 2025]] (ETH): CACNA1C-genotyyppi määrittää 5G-univasteen.",
    modLabElf: "Laboratorion ELF-tausta",
    modLabElfDesc: "50/60 Hz sähköverkko lisää VGCC-ekspressiota 8–10 päivässä ([[ref:sun2016_elf_vgcc|PMC4757866]]). Korkean ELF-taustan laboratorio 'primaa' solut.",
    modNighttimeEmf: "Yöllinen EMF",
    modNighttimeEmfDesc: "WiFi-reititin makuuhuoneessa vs. EMF-vapaa yö → eri CaMKII-palautumistila → eri baseline-Ca²⁺ kokeeseen tullessa.",
    modSpeciesPriming: "Laji / Esiviriytys",
    modSpeciesPrimingDesc: "Eläintutkimukset laboratorioympäristössä (24/7 ELF-esiviriytys, homogeeninen genetiikka) löytävät positiivisen tuloksen 92 % ajasta. Ihmistutkimukset heterogeenisillä ympäristöillä löytävät 35 %. Molemmat oikein — laboratorion eläimet ovat kroonisesti viritettyjä (VGCC-ekspressio kohonnut, [[ref:sun2016_elf_vgcc|PMC4757866]]). p=0,002.",
    modDuration: "Kesto",
    modDurationDesc: "Krooninen altistus (>1 viikko) tuottaa positiivisen tuloksen 92 %. Akuutti (1–2 yötä) tuottaa 31 %. CaMKII:n autofosforylaatio vaatii kumulatiivista Ca²⁺-kuormitusta. p=0,001.",
    modPulsation: "Pulsaatio",
    modPulsationDesc: "Pulssitetut signaalit tuottavat positiivisen tuloksen 88 %. CW tuottaa 48 %. IFO-VGIC-mekanismi vaatii vaihtelevia kenttiä. p=0,048.",
    modVitaminD: "D-vitamiinitaso",
    modVitaminDDesc: "D-vitamiini (1,25(OH)₂D₃) vaimentaa CACNA1C/1D-mRNA:ta ([[ref:vdh_lvscc|J Neurosci 2001]]). D-vitamiinipuutos → VGCC-yliekspressio = sama tila kuin ELF-primaami. Tutkimukset D-vitamiinipuutteisissa populaatioissa (talvi, korkea leveysaste) näyttävät vahvempia EMF-vaikutuksia.",
    modThreePredictors: "Kolme moderaattoria ennustaa tutkimustuloksen tilastollisesti merkitsevästi:",
    modAnalysisBasis: "Perustuu 29 tutkimuksen analyysiin kolmella päätepisteellä. Validoitu [[ref:weller2025_dna|Weller 2025]]:llä (n=517).",
    predRepl1Label: "Ennuste REPL-1: ",
    predRepl1Desc: "Retrospektiivinen analyysi 50–100 julkaistusta EMF-biotestitutkimuksesta osoittaa näiden kahdeksan moderaattorin ennustavan merkitsevästi positiivisen vs. nollatuloksen. Testattavissa ILMAN uutta dataa.",
    modEpistemicNote: "Episteeminen taso: kahdeksan moderaattorin kehys on BERM:n synteesi (M-taso). Yksittäisillä moderaattoreilla on empiiristä tukea (E-taso).",
    dnaBelow58Title: "58 % DNA-vaurioista tapahtuu ICNIRP-rajojen ALAPUOLELLA",
    dnaBelow58Desc: "[[ref:weller2025_dna|Weller ym. (2025)]] analysoi 517 genotoksisuustutkimusta ja havaitsi, että 58 % DNA-vaurion raportoineista tutkimuksista käytti altistustasoja ALLE nykyisten ICNIRP-ohjearvojen. [[ref:ivancsits_dna_recovery|Ivancsitsin tutkimus]] havaitsi DNA-katkoksia jo 35 µT:llä — alle viidesosa ICNIRP:n 200 µT:n työperäisestä rajasta.",
    dnaBelow58Mechanism: "ICNIRP-rajat on suunniteltu estämään TERMISIÄ vaikutuksia. DNA-vaurio EMF:stä on EI-TERMINEN mekanismi, joka toimii jänniteohjattujen kalsiumkanavien toimintahäiriön kautta.",
    dnaRepairTitle: "DNA-vaurio korjaantuu 9 tunnissa — jos altistus loppuu",
    dnaRepairDesc: "[[ref:ivancsits_dna_recovery|Ivancsits ym.]] osoitti, että EMF:n aiheuttamat DNA-katkokset palautuivat normaaliksi 9 tunnissa altistuksen päättymisen jälkeen. Tämä kvantifioi BERM:n palautumisikkunan: keho VOI korjata EMF:n aiheuttamia vaurioita, mutta vain jos sille annetaan riittävästi EMF-vapaata aikaa.",
    dnaModernEnv: "Modernit ympäristöt 24/7 WiFillä, LED-valaistuksella ja älypuhelimella sängyssä poistavat tämän palautumisikkunan kokonaan. Tyypillinen moderni makuuhuone tarjoaa nolla EMF-vapaata palautumisaikaa.",

    twoLevelTitle: "Kaksitasoinen ennustemalli",
    twoLevelSub: "Taso 1 (poikkileikkaus) + Taso 2 (ajallinen testosteronidynamiikka)",
    twoLevelLead: "Poikkileikkausmalli sijoittaa maat globaalille TFR-käyrälle sähköistyskynnyksen kautta. Ajallinen malli lisää toisen tason: testosteronin pitkäaikaislasku tarjoaa maan sisäistä dynamiikkaa T→TFR-viivesuhteen kautta.",
    twoLevelL1: "Taso 1: Sähköistyskynnys",
    twoLevelL1Desc: "TFR = 4,11 × exp(−54 × EMF_index) + 1,55. Sijoittaa maat Nigeristä (matala EMF, korkea TFR) Koreaan (korkea EMF, matala TFR). R² = 0,851 54 maalla.",
    twoLevelL2: "Taso 2: Testosteronitrajectoria",
    twoLevelL2Desc: "T(vuosi) = 638 × (1 − 0,012)^(vuosi − 1982). ~1,2 %/vuoden iästä riippumaton lasku (Travison 2007, Lokeshwar 2021) viivästetään 8 vuotta TFR:n suhteen. Siirtofunktio: TFR = 0,00544 × T − 0,745. USA 2007–2024, R² = 0,97.",
    twoLevelCombined: "Yhdistetty ennuste: Taso 1 asettaa poikkileikkauslähtötason; Taso 2 säätelee sitä ajan myötä.",
    twoLevelCaveat: "Tasot ovat riippumattomia. Taso 2 on kalibroitu vain USA:lla. R² 0,97 on otoksen sisäinen ja todennäköisesti paisunut.",
    twoLevelDiagnostic: "LH–T-diagnostiikka: Santi ym. 2025 osoittivat samanaikaisen LH↓ ja T↓ väestöissä — yhdenmukaista hypotalamuksen vaimentumisen (EMF-polku) kanssa eikä kivevaurion (EDC-polku) kanssa.",
  },
  ja: {
    title: "モデル文書",
    subtitle:
      "生体電磁生殖モデル(BERM)の完全な文書:三層アーキテクチャ、因果経路、結合方程式、回復動態。",
    metaTitle: "モデル文書 - Extinction Field",
    metaDesc:
      "BERMモデル文書:三層アーキテクチャ、因果経路、方程式、回復動態。",
    specNote: "BERMは説明・導出・予測モデルです。FieldState v2は独立した任意の測定・観察・推定モジュールであり、モデルの別名でも因果的起点でもありません。公開v17出力は国家技術タイミングプロキシを使用し、FieldState校正済みではありません。BERMは条件付きの形式的L2応答演算子を導出しますが、ゲージ、尺度、組織カーネル、エンドポイント校正は未解決です。",

    physBioTitle: "物理学から生物学へ",
    physBioSub: "Lindgren前提、導出済み幾何学、条件付きBERM応答、未校正の組織カーネル",
    physBioLead: "2025年Lindgren仮定はBERMの理論前提です。BERMは最小物質–計量結合と応答理論を追加して形式的応答演算子を条件付きで導出します。Lindgrenはゲージ、尺度、組織カーネル、SHBG/AR/ZIP9係数、人のエンドポイント校正を与えません。",
    physBioGMETitle: "Lindgren幾何学的計量拡張",
    physBioGMEDesc: "標準物理学では、電磁場は時空を伝播する独立した実体である。Lindgrenの幾何学モデルでは、電磁場は計量テンソルに直接エンコードされる：",
    physBioGMEFormula: "g_μν = η_μν + κ A_μ A_ν",
    physBioGMEExplain: "ここでη_μνは平坦なMinkowski計量、A_μは電磁四元ポテンシャル、κは明示的な結合尺度です。BERMはこの前提からδgを厳密に導出します。組織応答は指定された応答カーネルを通じて条件付きにのみ続き、下流生物学は計量の自動的帰結ではありません。",
    physBioChiTitle: "導出済みχ_geo座標",
    physBioChiDesc: "明示的に正規化した正ノルムモードでは、χ_geo(ρ)=ρ/√(1+ρ²) はランク1逆計量補正の平方根振幅です。この幾何座標は導出済みですが、組織感受性としての解釈やv17技術プロキシの重みへの使用は未校正のBERMモデリングです。",
    physBioChiFormula: "ρ² = κ A² ≥ 0,    χ_geo(ρ) = ρ / √(1 + ρ²)",
    physBioChiExplain: "この座標は普遍的な生物学的選択則を与えません。CRY背景、膜電位、バリア完全性、技術普及は別個に検証すべき応答関数です。同形のv17プロキシ重みは従来比較としてのみ保持されます。",
    physBioSuperTitle: "生物学以前の二次混合",
    physBioSuperDesc: "電磁場は通常の重ね合わせに従います。Lindgren仮定がポテンシャルの二次式なので、計量駆動には厳密な背景–摂動交差項と自己項が含まれます。これはモデル幾何学の混合であり、生物効果の非加算性を意味しません。",
    physBioSuperFormula: "δg_μν = κ(Ā_μa_ν + a_μĀ_ν + a_μa_ν)",
    physBioSuperExplain: "振幅変調と二周波入力は、a²に低周波包絡または差周波項を厳密に生じさせます。組織がそれを検出するか、エンドポイント応答が加算的かは未校正の応答カーネルに依存します。複合曝露レビュー（[[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]）は試験を動機づけますが、演算子を校正しません。",
    physBioSuperLink: "完全な重ね合わせ解析を見る →",
    physBioTissueTitle: "組織特異的共鳴",
    physBioTissueDesc: "BERMは組織固有のイオンチャネル組成、膜特性、候補応答窓を生物学的情報として導入します。組織順位は条件付きL2演算子のカーネル仮説であり、χ_geoだけからは導かれません：",
    physBioTissues: [
      { tissue: "精巣（Leydig細胞）", channels: "Cav3.2 (T-type), high density", chi: "非常に高い", reason: "安静時窓電流；StARタンパク質のCa²⁺依存性" },
      { tissue: "視床下部", channels: "Cav3.1, Cav3.3", chi: "非常に高い", reason: "synaptotagmin 1を介したシナプス小胞放出" },
      { tissue: "海馬", channels: "Cav3.2, Cav1.3", chi: "高い", reason: "LTP/LTDのCa²⁺依存性；神経新生ゾーン" },
      { tissue: "網膜（青錐体）", channels: "CRY1/CRY2 + TRPC1", chi: "高い（光依存性）", reason: "ラジカルペア磁気受容；FAD依存性" },
      { tissue: "洞房結節（心臓）", channels: "Cav1.3, Cav3.1", chi: "中〜高", reason: "ペースメーカー電流；低閾値活性化" },
      { tissue: "骨格筋", channels: "Cav1.2 (L-type)", chi: "安静時は低い", reason: "高活性化閾値（−30 mV）；活動電位時のみ有意" },
    ],
    physBioVerifyTitle: "外的整合性の観察",
    physBioVerifySub: "4つの証拠は背景依存テストを動機づけるが、χ_geoを組織感受性として校正しない",
    physBioVerifications: [
      { id: "V1", title: "地磁気嵐と死亡率（263都市）", desc: "報告された地磁気嵐強度と心血管死亡の関連は、背景×エンドポイントの遅延試験を動機づけます。χ_geoを生物学的媒介因子として同定も校正もしません（[[ref:vencloviene2022_geomag_mortality|Venclovienė et al. 2022]]）。", level: "C" },
      { id: "V2", title: "緯度 × CVD（204カ国）", desc: "CVDの地理差は事前規定した地磁気相互作用試験を動機づけますが、緯度には多くの競合経路があり、BERM応答係数を単独では同定できません（[[ref:feigin2014_latitude_cvd|Feigin et al. 2014]]）。", level: "C" },
      { id: "V3", title: "HRV × Kp指数", desc: "報告されたHRV–Kp共変動は、場と生理を対応測定する自律神経エンドポイント候補です。χ_geo媒介組織結合の導出ではありません（[[ref:mccrary2021_hrv_geomag|McCrary et al. 2021]]）。", level: "C" },
      { id: "V4", title: "複合曝露（172件の研究）", desc: "複合曝露レビューは相互作用と波形依存性の試験を動機づけます。生物学的非加算性はLindgrenの二次項やBERM組織カーネルを直接確認しません（[[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]）。", level: "M" },
    ],

    solarBioTitle: "太陽-生物学的関連",
    solarBioSub: "地磁気応答カーネル候補を試験する太陽周期観察",
    solarBioLead: "校正された組織カーネルが地磁気背景に依存するなら、太陽活動は測定可能な生物学的振動を生み得ます。以下の観察は仮説を動機づけますが、χ_geoを生物学的応答として同定せず、因果性も確立しません。",
    solarBioCycleTitle: "太陽周期 → 出生率の周期性",
    solarBioCycleDesc: "米国とニュージーランドの出生率変動は11年太陽周期と比較されています。BERMでは自然実験の候補シグネチャであり、χ_geo上昇や提案カーネルによる受胎変化の証拠ではありません（[[ref:lehrer2017_solar_births|Lehrer & Lehrer 2017]]）。",
    solarBioCycleNote: "BERMは太陽活動→地磁気擾乱→メラトニン変化→GnRHパルス変化→受胎率変化という検証可能な鎖を提案します。光周期と長期傾向を制御した遅延設計が必要であり、周期だけでは他の周期共変量から分離できません。",
    solarBioBirthTitle: "出生時期 → 疾病リスク",
    solarBioBirthDesc: "237,000人のコホートで出生月と後年の複数診断との関連が報告されました（[[ref:boland2015_birth_month|Boland et al. 2015]]）。地磁気曝露やχ_geoは同定されておらず、BERMでは妊娠中の場、季節、感染、栄養、汚染を別々に測る研究の動機に限ります。",
    solarBioBirthNote: "発達時期は妥当な感受性窓ですが、地磁気→VGCC/CRY→器官形成経路は未校正のBERM命題であり、出生月研究の結果ではありません。",
    solarBioDampenTitle: "季節的振幅の減衰",
    solarBioDampenDesc: "ギリシャの出生率季節振幅は1960–1992年に低下したと報告されています（[[ref:lerchl1998_birth_seasonality|Lerchl 1998]]）。電化は都市化、避妊、空調、社会的時期と並ぶBERM候補説明の一つで、観察自体はEMFやχ応答を測っていません。",
    solarBioDampenNote: "識別予測は、代替要因を制御した後に遅い電化が遅い減衰を予測することです。これは将来のモデル試験であり、現在の特定集団の記述ではありません。",

    threeBandsTitle: "Three Biological Frequency Bands",
    threeBandsSub: "ULF · ELF · RF — natural and anthropogenic sources mapped to BERM pathways",
    threeBandsLead: "Biological systems interact with electromagnetic fields across three distinct frequency bands, each with different physical mechanisms and biological targets.",
    twoSuscTitle: "幾何座標と生物学的応答候補",
    twoSuscSub: "χ_geo幾何 + χ_Bスピン化学候補",
    twoSuscLead: "BERMは導出済みχ_geo座標を候補生物学的応答関数から分離します。エンドポイント固有カーネルが測定されるまで、両者を乗算したり総感受性と解釈したりできません。",

    bioCivTitle: "From Biology to Civilization",
    bioCivSub: "A 10-step causal chain from molecular EMF effects to civilizational consequences",
    bioCivLead: "BERM applies a biologically reductionist, compositional hypothesis from molecular and endocrine states through individual behaviour to population aggregates. The chain states the proposed propagation from physical input to civilizational outcome. Evidence for separate links can constrain it, but the full multiscale chain is not empirically closed and aggregate political outcomes are not read back as individual hormone measurements.",
    bioCivChain: [
      { step: 0, title: "Measured background", desc: "Physical fields are measurement inputs. BERM, not FieldState, proposes the endpoint-specific biological response kernel." },
      { step: 1, title: "EMF perturbation", desc: "Anthropogenic fields (ELF, IF, RF) perturb the geometric background, altering the spacetime metric biology operates within" },
      { step: 2, title: "VGCC activation", desc: "Voltage-gated calcium channels — especially T-type (Cav3) at bifurcation point — respond to field perturbation via Schwan amplification" },
      { step: 3, title: "Ca²⁺ cascade", desc: "Intracellular calcium signaling disrupted: CaMKII activation, mitochondrial ROS, NF-κB inflammatory pathway" },
      { step: 4, title: "Hormone disruption", desc: "Testosterone, estrogen, melatonin, oxytocin, cortisol, and BDNF affected through Ca²⁺-dependent steroidogenic and neuroendocrine pathways" },
      { step: 5, title: "Individual behavior", desc: "Risk tolerance, social bonding, sleep architecture, cognition, and motivation shift as neuroendocrine substrates change" },
      { step: 6, title: "Family formation", desc: "Both fertility desire (behavioral) and biological capacity (physiological) decline — the two-level collapse" },
      { step: 7, title: "Institutional capacity", desc: "Collective action, strategic planning, and institutional assertiveness weaken as the population's hormonal and cognitive substrate degrades" },
      { step: 8, title: "Civilizational dynamics", desc: "The behavioral aggregate produces the patterns historians observe: stagnation, risk-aversion, institutional sclerosis" },
      { step: 9, title: "Migration gradient", desc: "Biological contrast between EM-depleted and EM-intact populations creates demographic pressure gradients" },
      { step: 10, title: "Cycle or convergence", desc: "Recovery if EM burden lifts (the α term), or permanent convergence as anthropogenic saturation (σ) masks the solar recovery window" },
    ],
    bioCivFormulaTitle: "BioCap integral",
    bioCivFormulaDesc: "The cumulative biological capacity of a population is formalized as the BioCap integral — a running balance between depletion (first integral) and recovery (second integral):",
    bioCivFormula: "BioCap_cand(t,λ) = BioCap₀ − ∫₀ᵗ m_lat^cand(λ)·[S(τ)+U(τ)+E(τ)]dτ + recovery",
    bioCivFormulaTerms: [
      { symbol: "S(τ)", desc: "Normalized solar activity (drives natural geomagnetic perturbation)" },
      { symbol: "U(τ)", desc: "Urbanization-weighted EMF exposure (population density × infrastructure)" },
      { symbol: "E(τ)", desc: "Electrification-weighted exposure (grid density × per-capita consumption)" },
      { symbol: "m_lat^cand(λ)", desc: "BERM candidate latitude moderator; neither χ_geo nor a calibrated biological coefficient" },
      { symbol: "α", desc: "Recovery coefficient (biological repair rate when EM burden decreases)" },
      { symbol: "σ(τ)", desc: "Anthropogenic EM saturation — masks the solar recovery window post-1880" },
    ],
    bioCivEpistemic: "This is BERM's reductionist causal hypothesis. Evidence supports some component mechanisms in specific systems, while the L2 entry operator and several cross-scale aggregation links remain open. Steps 5–10 are model consequences to test, not hormone assays inferred from political behaviour. The BioCap integral is a formal expression, not a fitted equation with validated coefficients.",

    biocapDecompTitle: "BioCap分解",
    biocapDecompDesc: "", biocapDecompFormula: "", biocapDecompFormulaDesc: "",
    biocapDecompCultural: "", biocapDecompCulturalDesc: "",
    biocapDecompMarkers: [] as { symbol: string; name: string; weight: string; unit: string; baseline: string; current: string; mechanism: string; evidence: string }[],

    hormesisTitle: "ホルメシス用量応答拡張",
    hormesisDesc: "", hormesisFormula: "",
    hormesisTerms: [] as { symbol: string; desc: string }[],
    hormesisZone1: "", hormesisZone2: "", hormesisZone3: "", hormesisEpistemic: "",

    archTitle: "三層アーキテクチャ",
    archDesc:
      "BERMは出生率低下を三つの異なる因果層に分離する。各レベルはそれぞれ独自の動態、タイムスケール、エビデンス基盤を持つ。各国の合計特殊出生率(TFR)は三つのレベルの積であり、和ではない -- 各レベルは他のレベルに対する乗数として作用する。",
    archPredictionSource: "",
    level1Label: "レベル1",
    level1Title: "生物学的容量",
    level1Desc:
      "現在の環境暴露下での生理学的最大出生率。精子品質(濃度、運動性、DNA断片化)、卵母細胞品質、ホルモン環境、血液脳関門(BBB)の完全性を含む。EMF暴露の影響を最も直接的に受けるレベル。",
    level2Label: "レベル2",
    level2Title: "EMF-行動結合",
    level2Desc:
      "個人デバイスの使用と周囲のEMF暴露がどのように相互作用するか。高い環境暴露地域で携帯電話を持つ人は非線形の結合効果を経験する。このレベルはインフラレベルと個人レベルの暴露間の相互作用を捕捉する。",
    level3Label: "レベル3",
    level3Title: "真の文化",
    level3Desc:
      "生物学的容量に依存しない自発的な出生選択。教育、都市化、避妊へのアクセス、経済的機会、文化的規範。この構成要素はすべての人口学モデルに存在する。BERMはその下に生物学的およびEMF層を追加する。",

    causalTitle: "因果経路図",
    causalDesc:
      "図はBERMに登録された因果仮説とエビデンス境界を示します。Lindgrenの導出済み計量駆動、FieldState観察、従来の技術プロキシは型付き入力としてBERMの条件付きL2演算子に入ります。組織カーネルとエンドポイント係数は未校正で、下流生物学はLindgrenから導出済みとはされません。",
    pathwayHierarchyNote:
      "従来の経路重みと地域比較はモデル校正に属し、理論的順位ではありません。RPMの代数的対応、Schwan膜推定、Cav3/HPG文献はブリッジ候補を制約しますが、幾何学から観測量への演算子を閉じません。BERMは各分岐を並列の反証可能な命題として保持します。",
    rpmFrequencyNote:
      "CRY/RPMはRFキャリア周波数(900 MHz - 3.5 GHz)に応答しない。その共鳴上限は約22.5 MHz([[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]], Front. Quantum Sci. Technol. 4:1544473)。経路Bの生物学的活性成分は地磁気背景(B_DC)とテレコム信号のELF変調エンベロープ(GSM 217 Hz, WiFi 10 Hz beacon)である。RFキャリア自体の効果は、電場成分を通じて経路Aにより媒介される。二つの経路は相補的な周波数領域を持つ。",
    vgccHierarchyTitle: "静止電位でのVGCC感受性階層",
    vgccHierarchyNote:
      "すべての電位依存性カルシウムチャネルが等しくEMF感受性であるわけではない。静止膜電位(約-70 mV)では、EMF感受性は次の階層に従う:Cav3(T型) >> Cav1.3 >> Cav1.2。T型チャネル(Cav3.1, Cav3.2, Cav3.3)は約10%が静止時に開いている(ウィンドウ電流)分岐点で動作し、小さな電圧摂動に対して継続的に感受性がある。Cav1.3は「低閾値L型」で約-50 mVで活性化される -- Cav1.2より25 mV負側(J Neurosci 2001)。これによりCav1.3は持続的な低電圧カルシウム流入を必要とする組織の主要チャネルとなる:洞房結節のペースメーカーと内耳有毛細胞のシナプス伝達。Cav1.2(標準的L型)は約-30 mVで活性化され、活動電位中にのみ重要 -- 静止時の寄与はごくわずか。この階層は組織特異的EMF脆弱性を説明する:Cav3優位の臓器(精巣、下垂体、副腎、海馬)が最も影響を受ける;Cav1.3依存組織(内耳、洞房結節)は中間;Cav1.2優位組織(骨格筋、心室)は電気活動中にのみ影響を受ける。",
    camkiiTitle: "CaMKII正フィードバック:累積的感作",
    camkiiNote:
      "BERMの累積暴露モデルにとって重要な発見:CaMKII(カルシウム/カルモジュリン依存性プロテインキナーゼII)のリン酸化はCav3.2の活性化閾値をより負の方向にシフトさせる(PMC9913649)。これは正のフィードバックループを生成する:EMF → Cav3.2 Ca²⁺流入 → CaMKII活性化 → Cav3.2閾値が左にシフト → チャネルがEMFに対してより感受性 → より多くのCa²⁺流入。この分子メカニズムはEMF効果が時間とともに累積的である理由を説明する:各暴露エピソードはシステムを後続の暴露に対してより感受性にする。CaMKIIフィードバックはまた、短期研究が長期効果を過小評価する理由も説明する -- 感作は数週間から数ヶ月の慢性暴露にわたって発達する。薬理学的予測:CaMKII阻害剤(KN-93)は急性EMF応答に影響を与えることなく進行性感作をブロックするべきである。",

    chiSub: "周囲 × 個人暴露相互作用の飽和曲線",
    chiTitle: "導出済みχ_geoと従来v17プロキシ重みの分離",
    chiDesc:
      "χ_geoの有界形は、振幅を無次元化して正ノルムモードを選ぶとランク1逆計量から導かれます。v17は同形を技術時系列プロキシに使いますが、組織応答やFieldState測定ではありません。",
    chiExplain:
      "は従来モデルの正規化技術プロキシです。1への漸近は構成上の性質であり、個人機器の生物学的限界効果を確立しません。",
    chiWherePrefix: "ここで",

    chiFiveTitle: "5スケールの背景モデレーター候補",
    chiFiveSub: "個別に検証する類推 — χ_geoの実装ではない",
    chiFiveDesc: "これらは別々の候補m関数であり、χ_geoでも、Lindgren幾何学やFieldStateから導出された普遍関数でもありません。",
    chiFiveColScale: "スケール",
    chiFiveColBg: "背景(B)",
    chiFiveColPerturb: "摂動",
    chiFiveColExpr: "候補関数",
    chiFiveColVerify: "検証",
    chiFiveColLevel: "レベル",
    chiFiveLink: "完全な分析を見る →",

    chiEvidenceTitle: "証拠群における候補モデレーション",
    chiEvidenceSub: "個別カーネルを要する6つの領域仮説",
    chiEvidenceDesc: "各モデレーターには独自の曝露測定、エンドポイント、符号、校正が必要で、共通のχ_geo組織法則を示すものではありません。",
    chiEvidenceFamilies: [
      { referenceId: "sakurai2008", family: "糖尿病(β細胞)", chi: "m_glucose: VGCC候補修飾因子", mechanism: "グルコース状態は膜電位を変え得るため、曝露×グルコース相互作用試験を動機づけます。BERM利得は未校正です。", prediction: "測定曝露とグルコース状態の相互作用を、事前指定した対照で検定する。", verification: "Sakurai 2008は研究固有のELF/インスリン終点であり、ヒトのリスク係数ではない", level: "M|C" },
      { referenceId: "yu2019_btb", family: "精子品質(BTB)", chi: "バリア移送の候補修飾因子", mechanism: "BERMはBTB完全性変化→標的細胞曝露変化→候補フィードバックを提案する。組織カーネル利得は未校正。", prediction: "実在するなら、測定した障壁損失とともに精子品質変化が加速する。", verification: "Yu 2019は時間依存4G-RF関連BTB障害を報告するがχ_geoを校正しない", level: "E" },
      { referenceId: "ulusoy2025_bbb_enos", family: "バリア(BBB + BTB)", chi: "m_barrier: 透過性候補修飾因子", mechanism: "測定されたバリア完全性が標的細胞曝露を修飾し得ます。乗法利得はBERM仮説で、確立した法則ではありません。", prediction: "曝露×測定バリア完全性を加法モデルと比較する。", verification: "Ulusoy 2025は時間分解バリア終点を動機づける", level: "E" },
      { family: "センチネル種", chi: "m_metabolic: 候補相対成長修飾因子", mechanism: "代謝率と酸化状態は種間相互作用モデルを動機づけますが、普遍係数を確立しません。", prediction: "相対成長メタモデル前に種別傾きを推定する。", verification: "種間で調和した曝露・終点データが必要", level: "M|C" },
      { family: "水生軸 (CatSper保存)", chi: "m_aquatic: ELF/CatSper候補比較", mechanism: "CatSper保存と電磁感覚は標的研究を動機づけますが、環境濃度のケーブル場がCatSperを活性化する証拠ではありません。", prediction: "整合したケーブル地点と対照地点で場スペクトル、性腺線量、生殖終点を測定する。", verification: "保存性は妥当性を制約するが環境活性化閾値ではない", level: "L*" },
      { family: "心臓(CRY2-TRPC1)", chi: "m_CRY: 光/FAD状態候補", mechanism: "心筋CRY2–TRPC1経路は他細胞系からのBERM外挿です ([[ref:yap2025|Yap 2025]])。", prediction: "事前指定した心臓Ca²⁺終点で曝露×光/FAD状態を検定する。", verification: "心筋固有のEM相互作用は未検証", level: "L*" },
      { referenceIds: ["blackman1985", "blackman1990", "blackman1991"], family: "Adey-Blackmanウィンドウ", chi: "m_photo × m_temp × m_DC候補", mechanism: "光周期、温度、DC方向は別々の候補修飾因子で、共通χ法則ではありません。", prediction: "要因実験で各相互作用と結合項を推定する。", verification: "Blackman研究は因子別再現を動機づける", level: "M" },
    ],

    dualSuscTitle: "2つの独立した感受性",
    dualSuscDesc: "χ_geoは正規化ランク1幾何の導出座標であり、VGCC感受性関数ではありません。BERMは別にVGCCとクリプトクロム／ラジカルペア応答チャネルを提案し、そのカーネル、閾値、相互作用はエンドポイント固有で未校正です。低曝露集団、産業化前系列、太陽周期パネルは命題を検証できますが、単独で各チャネルを分離しません。",
    dualSuscLabelType: "タイプ",
    dualSuscLabelChannel: "チャネル",
    dualSuscLabelThreshold: "閾値",
    dualSuscLabelTests: "テスト方法",
    dualSuscLabelPathways: "経路",
    dualSuscLeft: {
      title: "VGCC候補カーネル",
      type: "幾何学的",
      channel: "Ca²⁺チャネル（VGCC）",
      threshold: "電化閾値が必要（Ā > 0）",
      tests: "アーミッシュ（Ā≈0）、コミュニティ勾配、国別勾配",
      pathways: "A (ROS), C (BBB), D (HPA)",
    },
    dualSuscRight: {
      title: "CRY/RPM候補カーネル",
      type: "スピン化学的",
      channel: "ラジカルペア機構",
      threshold: "電化閾値なし（常に作動）",
      tests: "太陽周期、産業革命前データ、指標種、SAMAアノマリー",
      pathways: "B (CRY/RPM)",
    },

    phyloTitle: "系統発生的経路階層",
    phyloDesc: "操作的重み（A=45%、B=25%、C=15%、D=15%）は現在の疫学的証拠の強さを反映する。しかし系統発生的観点からは階層が逆転する：CRY/RPM（経路B）は祖先的電磁センサーであり、10億年以上にわたりすべての真核生物界で保存されている。",
    phyloColProperty: "",
    phyloColPathwayB: "経路B (CRY/RPM)",
    phyloColPathwayA: "経路A (VGCC)",
    phyloRows: [
      ["年齢", ">10億年", "~5億年"],
      ["界の範囲", "すべての真核生物", "後生動物のみ"],
      ["植物の証拠", "あり", "なし"],
      ["昆虫の証拠", "あり", "限定的"],
      ["哺乳類の証拠", "あり", "あり（広範）"],
      ["操作的重み", "25%", "45%"],
      ["系統発生的順位", "祖先的", "派生的"],
    ],
    phyloInsight: "TFR中心の操作的重みはCRY/RPMの進化的意義を過小評価している。",
    phyloWarning: "系統発生的階層は理論的枠組みである。BERMのTFR予測で使用される操作的重みを変更するものではない。",
    phyloText: [
      "BERMはEMFが生殖に影響する5つの生物学的経路（A〜E）を同定する。運用上の重みはヒトの生殖能力への重要性を反映するが、系統発生的階層——どちらがより根本的でどちらが派生的か——は異なる。",
      "経路B（CRY/RPM）は祖先型メカニズムである。全ての真核生物に存在：植物、菌類、昆虫、鳥類、哺乳類。クリプトクロムは植物で最初に発見された（シロイヌナズナ、1993年）。CRYの生殖的役割は植物で最もよく文書化されている——CRY2→CONSTANS→FT→開花誘導。フォトリアーゼ相同体として10億年以上保存。膜電位を必要としない。スピン化学（ラジカル対メカニズム）で動作。RF妨害は植物（Ahmad 2020：7 MHz）、昆虫（Gegear 2008：ショウジョウバエ）、哺乳類（PMC11817702 2025）で実証。",
      "経路A（VGCC/IFO）は、既存のイオンチャネル生物学と曝露研究からBERMが構成する候補メカニズムです。Lindgren幾何学やFieldStateから導出されたものではなく、ヒト組織カーネル、環境用量反応、符号、利得は未確定です。植物にもイオンチャネル（TPC1、CNGC）はありますが、S4ヘリックス型VGCCではありません。",
      "合わせて：経路Bは進化的基盤。経路Aはその上の動物特異的増幅層。動物では両方が同時に動作。植物では経路Bのみが動作。",
      "重要なB2/FADの違い——植物と動物でエフェクトサイズが異なる理由：植物は自らリボフラビン（B2）を合成するため、FAD供給は内因性でCRY機能はRF妨害にのみ依存——Ahmad 2020の「比較的軽微」な効果は純粋なRPMテスト。動物は食事性B2を必要とし、FAD供給は栄養に依存、CRY機能はRFとB2状態の両方に依存——二重の脆弱性：EMF妨害＋栄養欠乏。動物のエフェクトサイズが植物を上回る理由：動物には2つの妨害源があり、植物には1つしかない。",
    ] as const,

    twoChSub: "ELF + IF + RF分解:12技術層とTCBM",
    twoChTitle: "三チャネル暴露モデル",
    twoChDesc:
      "総実効EMF暴露は3つの周波数チャネルに分解される -- ELF(f < 300 Hz、膜変調)、IF(300 Hz - 10 MHz、細胞内/有糸分裂)、RF(> 10 MHz、スピン化学) -- 各々が生物学的メカニズムにより重み付けされ、chi結合により変調される。",
    twoChExplain:
      "cumEMF = w_ELF・cumELF + w_IF・cumIF + w_RF・cumRF、現在の診断重みはw_ELF = 0.05、w_IF = 0.60、w_RF = 0.35。これらは経験的較正を必要とする診断重みであり、フィットされたパラメータではない -- 三チャネル分解は膜生物物理学から構造的に導出されるが、相対重みは不確実。携帯インフラがほぼゼロの国では、大量の個人的電話使用でも総暴露への寄与は少ない(chiはゼロに近い)。逆に完全に飽和した環境では、個人成分はすべての3チャネルにわたってほぼ線形に加算される。",
    twoChLayersTitle: "周囲場を構成する12技術層",
    twoChLayersDesc:
      "周囲項は一枚岩ではない。12の独立した技術層に分解され、各層は独自のドライバー、展開タイムライン、周波数プロファイルを持つ。この分解はモデルの識別力を向上させる。各層が直交する計器として機能するためである。",
    ifoVgicNote: "IFO-VGICメカニズムは131研究の包括的レビューにより支持される([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], Bioelectromagnetics):95%がRF/Wi-Fi暴露からの酸化的効果を報告。[[ref:yakymenko2016|Yakymenko et al. 2016]](93/100)と一致するこのコンセンサスは、Ca²⁺流入 → ROS経路を最も堅牢に文書化された非熱メカニズムとして確立する。",
    multiPathwayCa2Note: "レベル4のCa²⁺撹乱は複数の独立した経路を通じて作用する:(1)直接的S4電圧センサーの強制振動([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], IFO-VGIC);(2)リアノジン受容体(RyR)およびSERCAポンプを介した細胞内カルシウム貯蔵の調節異常([[ref:bertagna2025|Bertagna et al. 2025]], Ann NY Acad Sci)。両方の薬理学的遮断実験(経路1にVGCCブロッカー;経路2にダントロレン(RyR用)、CPA(SERCA用))がEMF効果を消失させ、メカニズムを確認。多経路の性質は組織特異的感受性を説明する:高いVGIC密度と大きな細胞内Ca²⁺貯蔵を持つ細胞(ニューロン、性腺細胞)は低貯蔵細胞(ケラチノサイト -- [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]:皮膚細胞でのヌル結果参照)よりも感受性が高い。注:[[ref:bertagna2025|Bertagna 2025]]はELF(50 Hz)でありRFではない -- RFへの翻訳は直接的ではないが、Ca²⁺経路は共有されている。",
    fiveGReproNote: "最初の5G周波数特異的精巣データ([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics):3.5 GHz RFがラットに精巣および酸化的損傷を誘発。CoQ10補充が損傷を改善 -- メカニズムの可逆性を実証。抗酸化能力が正味の日次損傷を決定するBERMの回復ウィンドウモデルと一致。酸化ストレスのエビデンス基盤([[ref:yakymenko2016|Yakymenko 2016]]: 93/100; [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: 95%)を5G周波数帯に拡大。",
    pathwayBQuantNote: "メラトニン抑制経路は55研究のPRISMA系統的レビューにより定量的に支持される([[ref:tbahriti2026|Tbahriti et al. 2026]], Sleep Biol Rhythms):高品質の動物研究の88%がベースラインからの20-50%のEMF誘発メラトニン抑制を報告。この抑制はGnRHパルス性にとって生物学的に有意であるが、光誘発抑制(>90%)よりは小さい。BERMのv17_night_fraction()モデリングと一致 -- EMFは夜間トリプルヒット(メラノプシン + CRY + メラトニン)の一成分であり、唯一のドライバーではない。方法論的注記:レビューされた研究の27%のみが高い基準を満たした。",
    pathwayBWeightNote: "経路Bの重みに関する注記:経路Bの25%は概日機能(CRY2 → 時計遺伝子転写 → メラトニン → HPG)と最近発見されたカルシウムシグナリング機能(CRY2 → TRPC1変調 → Ca²⁺流入; [[ref:yap2025|Yap et al. 2025]], Cells)の両方を反映する。TRPC1はTRPチャネルであり、電位依存性カルシウムチャネル(VGCC)ではない。したがって経路AとBは薬理学的に分離可能:L型VGCCブロッカー(ニフェジピン)は経路Aの効果をブロックするがCRY2-TRPC1効果はブロックしない。",
    cryIndividualVariationNote: "個体差:CRY感受性は虹彩の色素沈着(青 > 緑 > 茶; [[ref:higuchi2007|Higuchi 2007]])、栄養的FAD状態([[ref:hirano2017|Hirano 2017]])、性別(急性磁気受容では男性 > 女性; [[ref:chae2019|Chae 2019]])により変調される。これらの変調因子は経路Bの有効性の個人間および集団間の分散の一部を説明する可能性がある。CRY2-TRPC1物理的複合体([[ref:yap2025|Yap/Sherrard 2025]])はさらに経路Bに第二の下流枝があることを明らかにする:CRY2はTRPC1(TRPチャネル、VGCCではない)を変調し、経路Aとは独立にカルシウムシグナリングを可能にする。経路AとBは薬理学的に分離可能 -- L型VGCCブロッカーはAを阻害するがCRY2-TRPC1は阻害しない。詳細な分析は/evidence/eyesを参照。",
    cryDualSystemNote: "二重CRYシステム:経路Bは網膜の2つの異なるクリプトクロムシステムを通じて動作する。CRY1(感覚):全長CRY1タンパク質がヒト、ボノボ、ゴリラの網膜の短波長感受性「青色」錐体光受容体の外節にのみ見出された([[ref:bartolke2025|Bartolke et al. 2025]], FASEB J)。核から離れたこの位置 -- 光変換装置内 -- は概日時計制御を超えた感覚機能を示唆する。錐体外節の積層膜ラメラは方向性磁気受容に必要な配向秩序を提供する([[ref:majewska2025|Majewska et al. 2025]], ACS Chem Biol:CRYが脂質二重層と秩序的に会合)参照。これは虹彩色素沈着が最も影響するシステム:青い目は青色錐体に約100倍多くの光を透過し、CRY1活性化を増加させる。CRY2(概日):CRY2は網膜神経節細胞、特にSCNに投射するipRGCに発現する。CRY2はTRPC1と物理的複合体を形成し([[ref:yap2025|Yap et al. 2025]])、概日経路をイオンチャネルシグナリングに接続する。両システムはFADをクロモフォアとして必要とし、したがって両方がリボフラビン(B2)状態に依存する。",
    recoveryWindowNote: "急性暴露と慢性暴露の区別は経験的に支持される:[[ref:koivisto2000|Koivisto et al.(2000)]]は30-60分の暴露後に認知促進を観察し(急性Ca²⁺媒介シナプス増強と両立)、一方[[ref:panagopoulos2025_ifo|Panagopoulos et al.(2025)]]は慢性/反復暴露の95%で酸化ストレスを報告。回復ウィンドウモデルはこの矛盾を解決する:30分 + 23.5時間の回復 → 97%修復(正味の損傷なし);22時間暴露 + 2時間回復 → 21%修復(累積損傷)。",
    lateralizationNote: "二チャネルモデルの空間構造は側性化研究により経験的に支持される:[[ref:eliyahu2006|Eliyahu et al.(2006)]]および[[ref:luria2009|Luria et al.(2009)]]は890 MHzの暴露が特に携帯電話に最も近い半球に影響することを実証した。これは個人EMFの効果が全身的ではなく局所的であることを確認する -- EMFは距離の二乗で減衰する -- BERMの前提を支持する:ポケット内の携帯電話 → 精巣を標的、耳元の携帯電話 → 視床下部を標的。",
    ifChannelTitle: "IFチャネル:主な発生源としてのLED照明",
    ifChannelDesc:
      "IFチャネル(1 kHz - 1 MHz)は、FDA承認のTTFieldsがん治療と同じ周波数-細胞サイズ関係を通じて分裂細胞を標的とする。IF場の主要な環境発生源はLED照明:すべてのLED電球は20-200 kHzで動作するスイッチモード電源を含み、高調波はメガヘルツ帯まで拡張される。典型的な家庭には15-30のそのような発生源がある;典型的なオフィスには200-500。追加のIF源にはHVAC可変周波数ドライブ(5-50 kHz)、IHクッキングヒーター(20-75 kHz)、すべてのスイッチモード電源(ノートPC充電器、携帯充電器)が含まれる。メカニズムはイオン強制振動(IFO-VGIC)を通じて動作し、生物学的閾値は10⁻⁵ V/m([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) -- 測定されたLEDドライバー放射をはるかに下回る。",
    tcbmTitle: "三チャネル生物学モデル(TCBM)",
    tcbmIntro:
      "BERMの横断的診断（v19.1）は3つの独立した電磁チャネルを特定する。各チャネルは異なる周波数範囲、暴露源、生物学的メカニズム、時間的履歴を持つ。注：v19.1は54カ国に適合した診断式であり、予測モデルはv17です:",
    tcbmElfTitle: "チャネル1: ELF(0-300 Hz)",
    tcbmElfDesc:
      "発生源:送電網、家庭配線、家電、変圧器。メカニズム:IFO-VGIC強制イオン振動([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])。歴史:電化以来(1880年代)、約1970年以降安定。代理変数:住宅電力消費量(kWh/人)。常時オン、24時間週7日、家全体。",
    tcbmIfTitle: "チャネル2: IF(300 Hz - 10 MHz)",
    tcbmIfDesc:
      "発生源:LEDドライバー(20-300 kHz)、SMPS、VFD、IHクッキングヒーター。メカニズム:Cyb5b → Ca²⁺振動([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]])、より高い周波数でのIFO。歴史:2009年以前はほぼゼロ、2009-2019に指数関数的増加(EU LED移行)。代理変数:LED市場シェア × 住宅電力。パルス状、高dV/dt、規制ギャップ([[ref:ijrb2022_if_review|IJRB 2022]])。",
    tcbmRfTitle: "チャネル3: RF(100 kHz - 300 GHz)",
    tcbmRfDesc:
      "発生源:携帯電話、Wi-Fi、Bluetooth、基地局、IoT。メカニズム:RPM/CRYスピン化学([[ref:ritz2004|Ritz 2004]])、高SARでの熱的沈着。歴史:2G(1991)、3G(2001)、4G(2009)、5G(2019)、Wi-Fi(1999)。代理変数:100人あたりブロードバンド加入数、携帯電話加入数。変調(データ符号化)、個人 + 周囲。",
    tcbmIfMitotic:
      "IFチャネルの生物学的メカニズムはELFおよびRFとは異なる。ELFが主にイオンチャネルを活性化し(IFO-VGCC)、RFが主にラジカルペア化学を撹乱する(RPM/CRY)のに対し、IFは第三の経路を通じて作用する:細胞分裂中の極性高分子構造(有糸分裂紡錘体、チューブリンダイマー)の撹乱。TTFields研究はIF場(100-500 kHz)が極性の細胞内要素に方向性力を及ぼすことを実証する。このメカニズムは周波数依存性:がん細胞は150-200 kHzで最も影響を受け、正常細胞は約50 kHz(Nature 2020)。LEDドライバー放射(20-100 kHz)は正常細胞の感受性範囲にまたがる。",
    tcbmWeightNote:
      "2つの重みセット、2つの目的:(1)TCBMの診断重み(w_ELF 0.05、w_IF 0.60、w_RF 0.35)はメカニズムの妥当性から導出された理論的推定 -- 各チャネルが生物物理学的経路に基づいてどの程度の生物学的損傷を生み得るか。これらは出生率データにフィットされたものではなく、経験的較正を待つ事前推定として扱うべきである。(2)横断的な経験的重み(ELF約60%、RF約40%)は54カ国の回帰から観測TFRに対して較正されている。なぜ異なるか:回帰はLED普及率が電化と相関するためIFをELFから分離できない -- したがって経験的「ELF 60%」は大きな隠れたIF成分を含む可能性が高い。診断重みが正しければ、経験的ELFシグナルの大部分は実際には共線性代理変数を通じたIFである。T1時間テスト(LED-DID、2009年以降のEU禁止)はこの共線性を解決するよう設計されている。",
    tcbmCrossSectional:
      "横断的な公式(54カ国、LOOCV RMSE 0.522)では、住宅電力消費が主要代理変数となる。ELF(電気とともに常に存在)を捕捉し、IFと相関する(LED普及は電化に追従)ためである。ブロードバンドはRFを捕捉する。ELFは横断的シグナルの約60%を担い、RFは約40%。IFはLED普及が電化と相関するため横断的データではELFから分離不可能。時間テスト(T1: LED-DID)がIFの独立的寄与を分離するために必要。",
    tcbmWolframPlanned:
      "計画中:三チャネル結合構造の形式的Wolfram Language検証。IFO-VGIC閾値の第一原理からの記号的導出と54カ国横断的データセットに対する数値的検証を含む。",

    recovSub: "メラトニン → コルチゾール → テストステロン → 精子 → 出生率の回復カスケードとタイムスケール",
    recovTitle: "五層回復モデル",
    recovDesc:
      "EMF暴露が減少すれば、異なる生物学的システムは異なる速度で回復する。各層のαパラメータは可逆的損傷の割合を表す(1.0 = 完全可逆、0.0 = 永久)。",
    recovColLayer: "層",
    recovColAlpha: "α",
    recovColTimescale: "回復タイムスケール",
    recovColNotes: "備考",
    recovVgicLayer: "VGICゲーティング",
    recovVgicTime: "時間",
    recovVgicNote:
      "イオンチャネルのコンフォメーション変化は場の停止とともに直ちに回復する",
    recovRosLayer: "ROSクリアランス",
    recovRosTime: "数日から数週間",
    recovRosNote:
      "抗酸化システムがバランスを回復するが、慢性的酸化ストレスは持続的なミトコンドリア損傷を引き起こす可能性がある",
    recovDnaLayer: "DNA修復(SDF)",
    recovDnaTime: "数ヶ月(精子形成サイクル)",
    recovDnaNote:
      "新しい精子は74日ごとに生成されるが、幹細胞の損傷はサイクルを超えて持続する可能性がある",
    recovLeydigLayer: "ライディッヒ細胞機能",
    recovLeydigTime: "数ヶ月から数年",
    recovLeydigNote:
      "テストステロン産生細胞は部分的に回復する可能性があるが、慢性的萎縮は再生能力を低下させる",
    recovBbbLayer: "生物学的バリア(BBB + BTB)",
    recovBbbTime: "BBB:不可逆;BTB:部分的に可逆",
    recovBbbNote:
      "慢性的BBB漏出による神経損傷は永久と仮定される。BTB破壊([[ref:yu2019_btb|Yu et al. 2019]]: 4GでのSpock3-MMP2軸)は精子形成微小環境を直接損なう。両バリアは同じタイトジャンクションタンパク質(オクルディン、ZO-1)を使用する。正のフィードバック:バリア損傷 → より高い実効場 → さらなる損傷。",

    compSub: "TFR式が生物学的容量と文化的需要をどのように分離するか",
    compTitle: "補償メカニズム",
    compDesc:
      "観測されるTFRは単純に三つのレベルの積ではない。社会は生殖補助医療、行動変容、政策介入を通じて生物学的低下を部分的に補償する。実効TFRには補償指数α = 0.43が含まれ、この部分的なオフセットを捕捉する。",
    compWhereLabel: "ここで:",
    compBioCap: "生物学的容量(レベル1)、0-1に正規化",
    compBehav: "EMF-行動結合係数(レベル2)",
    compAlpha:
      "補償指数、2000-2024の歴史的データに対して較正",
    compRate2024: "2024年の観測TFR(較正アンカー)",
    compCultRatio:
      "予測される文化的出生選好の2024年ベースラインに対する比率",
    compBioBehav2024:
      "較正時点での生物学的-行動的積の値",
    compExplain:
      "α = 0の場合、補償はなく生物学的低下はTFRに直接反映される。α = 1の場合、補償は完全であり生物学的低下は観測TFRに影響しない。較正値0.43は部分的だが不完全な補償を意味する -- 生物学的低下はTFRに依然として現れるが、社会的適応がない場合のおよそ半分の速度で。",

    camkiiConvTitle: "CaMKII:収束分子",
    camkiiConvSub: "一つの分子が肥満、糖尿病、不妊、睡眠障害のすべてが同時に増加する理由を説明する",
    camkiiConvDesc: "CaMKIIはCa²⁺シグナルの確立した下流エフェクターで、複数の疾患関連カスケードに接続します。BERMはこれを共同エンドポイント試験の候補収束点として扱います。並行する集団トレンドがEMFを共通上流原因とすることは示されず、その推論には曝露連結組織カーネルと競合原因の統制が必要です。",
    camkiiConvCaveat: "認識論的注記:CaMKII収束は独立した文献から特定されているが、統合EMFメカニズムとしてはまだ実験的に検証されていない。各経路は個別に検証済み;統合テスト(EMF → CaMKII → すべての5標的を同時に)は予測であり確立された事実ではない。エビデンスレベル:M。",
    camkiiConvLink: "代謝エビデンスを見る →",

    techLayersTitle: "技術層:5世代の蓄積暴露",
    techLayersSub: "各技術世代は新しい周波数層を追加した。生物学的効果は加算的ではない -- CaMKII閾値統合により超加算的である。",
    techLayersDesc: "現代のEMF暴露は一つの信号ではない -- 周波数において10桁にわたる5-12の同時発生源である。送電網(50/60 Hz ELF)はVGCC発現をアップレギュレートすることで細胞をプライミングする。WiFiは100:1のクレストファクターを持つ隠れた10 Hz ELFビーコンを追加する。GSMは歴史上最も生物活性の高い変調変化をもたらした(NMT→GSM = アナログ→パルス)。4G/スマートフォンは常時身体接触をもたらした。LED照明はIFチャネル(20-300 kHz)を開いた。各層は既存のものに重なる;CaMKIIは発生源に関係なくすべてのCa²⁺を統合する。",
    techLayersLink: "すべての14技術プロファイルを見る →",

    elfPrimingTitle: "ELFプライミング仮説",
    elfPrimingDesc: "送電網は単に50 Hz暴露を追加するだけではない。電位依存性カルシウムチャネルの発現をアップレギュレートする(P/Q型、N型、R型サブタイプが8-10日後に増加 -- [[ref:sun2016_elf_vgcc|PMC4757866]])。これにより各細胞は他のすべてのEMF源に対してより感受性になる。住宅電力消費が出生率低下の最も強い予測因子(RMSE 0.522)であり、携帯電話密度が最も弱い(RMSE 1.053)理由を説明する:電力はプライミング状態を測定しており、一つの暴露源だけではない。",
    elfFreqNote: "注:ELFチャネルはヨーロッパでは50 Hz、アメリカ大陸では60 Hzで動作する。50 Hzはシューマン共鳴の第8高調波(52.0 Hz)の2 Hz以内にあり、ヨーロッパの集団でより強いCRY干渉を生じる可能性がある。これは推測的であるが、同等の総EMFレベルで50 Hz国と60 Hz国のメラトニンプロファイルを比較することにより検証可能。",

    layerModelTitle: "積層暴露モデル",
    layerModelSub: "5つの流行病、5つの技術層 -- 歴史的検証と数式更新",
    layerModelDesc: "歴史的健康トレンドデータは、5つの主要な流行病(肥満、T2D、自閉症、精子減少、10代のメンタルヘルス)の変曲点が個別の技術採用ではなく技術層の追加に対応することを示す。積層モデルは従来の説明では説明できない異常を説明する。",
    layerFormulaTitle: "Formula v20: EMF_effective",
    layerFormula: "TFR ≈ A × exp(-B × EMF_effective) + C",
    layerFormulaDetail: "EMF_effective = EMF_composite × P × (1/R)",
    layerFormulaComposite: "EMF_composite = w_ELF × ELF + w_IF × IF + w_RF × RF",
    layerFormulaPriming: "P = 1 + α × min(電化年数, 40)",
    layerFormulaRecovery: "R = 1 + β × 1日あたりEMFフリー時間",
    layerFormulaPrimingDesc: "P(プライミング):より長く電化された環境の細胞はVGCC発現が高く、すべてのEMF源に対してより感受性になる。100年電化された国は10年前に電化された国よりも感受性が高い。",
    layerFormulaRecoveryDesc: "R(回復):有意なEMFのない1日あたりの時間がCa²⁺恒常性の回復を可能にする。現代の環境(WiFi 24/7、LED 16h/日、ベッドの携帯電話) → EMFフリー時間 ≈ 0 → 回復なし。アーミッシュ → EMFフリー時間 ≈ 22 → 完全回復。",
    layerFormulaNote: "パラメータα、β、w_IFは54カ国データセット + アーミッシュ/ツィマネのデータポイントに対する較正を必要とする。期待される改善:LOOCV RMSE < 0.45(v19.1の0.522に対して)。",
    layerAnomaliesTitle: "積層モデルが説明する5つの異常",
    layerAnomalies: [
      { referenceId: "mozaffarian2022", title: "Mozaffarianのパラドックス", subtitle: "アメリカ人は2000年以降食べる量が減ったが体重が増えた", conventional: "説明不能", explanation: "層3-4(WiFi + LED IF)がカロリー摂取とは独立した代謝撹乱を追加。BAT熱産生↓ + インスリン動態↓はカロリー非依存のメカニズム。", ref: "Mozaffarian 2022, AJCN" },
      { title: "2012年の変曲点", subtitle: "ソーシャルメディアは2003年から危機なく存在していた", conventional: "ソーシャルメディアのコンテンツが10代を害する", explanation: "2012年 = すべての3チャネル(ELF + IF + RF)が10代の体で24/7同時に活性化された最初の年。CaMKII閾値が集団レベルで超過。コンテンツ制限は危機を解決しない。", ref: "Haidt 2024; BERM層分析" },
      { referenceId: "t2d_covid2024", title: "COVIDの加速", subtitle: "T2D有病率増加:2.90%→3.52%/年", conventional: "ロックダウン中の座りがちな行動", explanation: "ロックダウンは層の強度を増加させた:WiFi + LED + 複数デバイスで24時間/日在宅。回復ウィンドウが完全に消失。在宅勤務者は通勤者よりも高いEMF。", ref: "GBD 2021 / Frontiers Endocrinol 2024" },
      { title: "15-30年のラグ", subtitle: "発展途上国は同じ軌道を遅れて辿る", conventional: "繁栄がライフスタイルを変える", explanation: "遅延は繁栄ではなく電化 + 技術採用のタイムラインに一致。中国T2D:1.3%(1980) → 8.7%(2014)は電化率60%から100%に並行。", ref: "BMC Public Health 2018" },
      { title: "アーミッシュの例外", subtitle: "TFR 6.1、低肥満、低認知症 -- 同じ国", conventional: "肉体労働とコミュニティ", explanation: "技術層ゼロ。ELFプライミングなし。完全回復。EMF_effective ≈ 0。食事は特に健康的ではない -- EMF環境が健康的。", ref: "BERM集団比較" },
    ],
    layerCountryTitle: "国別比較:v19.1（診断用）vs v20",
    layerCountries: [
      { country: "フィンランド", actual: "1.25", v19: "1.32", v20: "1.28", note: "電化100年超、高P" },
      { country: "韓国", actual: "0.72", v19: "0.95", v20: "0.78", note: "最高の5G/LED/スマートフォン密度" },
      { country: "ナイジェリア", actual: "4.38", v19: "4.85", v20: "4.52", note: "電化約15年、低P" },
      { country: "米国", actual: "1.63", v19: "1.55", v20: "1.58", note: "電化100年超、高P" },
      { country: "イスラエル", actual: "2.87", v19: "2.40", v20: "2.75", note: "文化的出生率オフセット" },
      { country: "アーミッシュ", actual: "6.1", v19: "—", v20: "6.05", note: "ゼロ層、完全回復" },
    ],
    layerProjectionsTitle: "将来予測(v20)",
    layerProjections: [
      { country: "韓国", y2024: "0.72", y2030: "0.55-0.65", y2035: "0.45-0.55", driver: "5G+EV+IoT、P増加、R→0" },
      { country: "フィンランド", y2024: "1.25", y2030: "1.05-1.15", y2035: "0.90-1.05", driver: "5G+LED、小さな回復ウィンドウ" },
      { country: "米国", y2024: "1.63", y2030: "1.40-1.55", y2035: "1.25-1.40", driver: "5G+EV、大きなP(100年超)" },
      { country: "ナイジェリア", y2024: "4.38", y2030: "3.50-4.00", y2035: "2.80-3.50", driver: "電化が加速、Pが急速に増加" },
      { country: "インド", y2024: "1.96", y2030: "1.55-1.75", y2035: "1.25-1.50", driver: "電化→100%、GSM/4G飽和" },
    ],
    layerLink: "すべての14技術プロファイルを見る →",

    seasonTitle: "季節感受性:CRY × 緯度",
    seasonSub: "CRY磁気受容体は光依存性 -- 冬はEMFの生物学的効果を増幅する",
    seasonDesc: "クリプトクロム(CRY)は光依存性磁気受容体である。冬(光が少ない)にはCRYは磁場摂動に対してより感受性が高い -- メラトニンに対するEMFの効果は冬により強い。[[ref:halgamuge2015|Halgamuge 2015]](Nature Sci Rep)はこれを直接実証:ELFは子牛のメラトニンを冬に抑制したが夏には増加させた。この季節変調は北欧諸国(高緯度 + 高EMF)が不均衡な健康負担を示す理由(SAD有病率:フィンランド21%)、および異なる季節に実施されたEMF研究が矛盾する結果を生む理由を説明する。",
    seasonFormulaLabel: "Formula v21補正係数:",
    seasonFormula: "S = 1 + γ × f(緯度, 季節)",
    seasonFormulaDesc: "Sは高緯度の冬に増加し(CRYがEMF摂動に対してより感受性)、夏に減少する(CRYが周囲光で飽和)。赤道付近ではS ≈ 1.0(安定した日照時間)。フィンランドの冬:S ≈ 1.3。フィンランドの夏:S ≈ 0.9。",
    seasonPred1: "SEASON-1: SAD/うつ病の有病率は緯度単独ではなく緯度 × EMF密度と相関する",
    seasonPred2: "SEASON-2: EMFフリー寝室の利益は冬季により大きいべきである",
    seasonRef: "[[ref:halgamuge2015|Halgamuge 2015]] · [[ref:kolbabova2015_melatonin_seasonal|Kolbabová et al. 2015]] · CRY光依存性 (biorxiv 2024)",

    cacna1cTitle: "CACNA1C rs1006737:個体感受性",
    cacna1cSub: "Cav1.2遺伝子型がEMF感受性閾値を決定する",
    cacna1cDesc: "rs1006737 A-アレルはCACNA1C転写を増加 → 細胞あたりのCav1.2チャネル増加 → EMF刺激あたりのCa²⁺流入増加 → CaMKII自己リン酸化閾値低下。このバリアントはGWASで双極性障害、統合失調症、自閉症、心不整脈、神経発達障害に関連 -- すべてBERMのCa²⁺メカニズムが予測する状態。",
    cacna1cEvidence: "[[ref:sousouri2025|Sousouri 2025]](ETH Zurich):二重盲検試験でCACNA1C遺伝子型が5G暴露に対する睡眠応答を直接決定した。EMF感受性が心因性ではなく遺伝子型依存であることの最初の実証。[[ref:cacna1c_functional|Eckart et al. 2016]]:rs1006737はCACNA1C転写レベルの量的形質遺伝子座。[[ref:cacna1c_amygdala|Tesli et al. 2013]]:A-アレル → 診断を越えた扁桃体活動の変化(健常対照でも)。",
    cacna1cImplication: "EHS(電磁過敏症)の再解釈:EHSは心因性ではない -- 遺伝子型依存の閾値変動を反映する。CACNA1C A/A遺伝子型の個体はより多くのCav1.2チャネルを持ち、より低いEMF暴露でCaMKII閾値に到達し、より早く症状を経験する。",
    cacna1cFormulaLabel: "集団レベル補正:",
    cacna1cFormula: "G_pop = 1 + δ × CACNA1C_Aアレル頻度",
    cacna1cFormulaDesc: "G_popはA-アレル有病率に基づいて集団のEMF感受性を調整する。ヨーロッパ系集団(より高いA-アレル頻度)は東アジア系集団よりも高い集約感受性を持つ可能性があるが、追加の検証が必要。",
    cacna1cPred1: "GEN-1:CACNA1C A-アレル頻度がより高い集団はEMF単位あたりより急峻な健康低下を示す",
    cacna1cPred2: "GEN-2:A/A遺伝子型の個体は管理暴露試験でG/Gよりも強いEMF応答を示す",
    cacna1cRef: "[[ref:sousouri2025|Sousouri 2025]] (ETH) · [[ref:cacna1c_functional|Eckart et al. 2016]] · [[ref:cacna1c_amygdala|Tesli et al. 2013]]",

    neonatalQTitle: "新生児Q因子:共鳴閾値",
    neonatalQSub: "なぜ新生児の脳が減衰のない共鳴器なのか -- NKCC1/KCC2スイッチによるGABAの興奮性",
    neonatalQDesc: "成人のニューロンではGABAは抑制性であり -- Ca²⁺振動を制限する減衰(γ > 0)を提供する。新生児ではNKCC1/KCC2クロライドトランスポーター比が逆転:NKCC1が優位、細胞内クロライドが高く、GABAは興奮性。これはγ < 0を意味し -- システムは負の減衰を持ち、品質因子Q → ∞。新生児の脳は事実上減衰のない共鳴器:いかに小さくともEMF誘発Ca²⁺振動は減衰なく鳴り続ける。2-4ヶ月の年齢ウィンドウがSIDSのピークリスクである理由 -- KCC2スイッチがまだ減衰を導入していない。",
    neonatalQFormulaLabel: "新生児Q因子減衰:",
    neonatalQFormula: "Q_neonatal(年齢) = Q₀ / (1 + (年齢 / τ_KCC2)²)",
    neonatalQFormulaDesc: "Q₀ = 出生時の品質因子(最大、約減衰なし)。τ_KCC2 ≈ 2-4週間 = NKCC1→KCC2スイッチの時定数。出生時:Q ≈ Q₀。2-4ヶ月:Q低下中だが危険なほど高い。12ヶ月:Qが成人レベル(約1-5)に近づく。",
    neonatalQVerification: "ブメタニド(NKCC1ブロッカー) → 抑制性GABAを回復 → 新生児痙攣を終結 = 減衰を導入。KCNQ2変異 → 3-6ヶ月で自然寛解する新生児痙攣 = KCC2成熟のタイムライン。",
    neonatalQRef: "[[ref:neonatal_seizure_review2021|Neonatal seizure review 2021]] · [[ref:bumetanide_nkcc1|Bumetanide NKCC1 2015]] · [[ref:nkcc1_kcc2_bookshelf|NKCC1/KCC2 Bookshelf 2020]]",
    neonatalQSpectrum: "新生児Q → ∞の状態は連続スペクトルの一端。同じQ因子メカニズム -- 変動する減衰係数γ -- がSIDS、てんかん、SUDEP、片頭痛、群発頭痛を統一する。拡延性脱分極(CSD)は共通の終末経路;Q因子はCSDが誘発されるか、どこまで伝播するか、脳幹に到達するかを決定する。",
    neonatalQSpectrumLink: "完全な神経学的スペクトル分析を見る →",

    feedbackLoopsTitle: "17の正のフィードバックループ",
    feedbackLoopsSub: "自己増幅サイクルがネットワークを形成 -- 任意のエントリーポイントが複数の劣化スパイラルを同時に活性化する",
    feedbackLoopsDesc: "収束検証により、BERMカスケード内の17の正のフィードバックループが明らかになった。ループはネットワークを形成する:任意のエントリーポイントが複数の劣化スパイラルを同時に活性化する。各ループは外部暴露の増加なしにシステムを自己劣化させる。",
    feedbackLoops: [
      { id: "S1", name: "モニターフィードバック共鳴", steps: "赤ちゃんの音 → マイク → RF変調 → VGCC → Ca²⁺ → より強い振動 → より大きな音 → より多くのRF → カスケード増幅", status: "メカニズム的に整合、完全ループとしては未検証", color: "amber" },
      { id: "S2", name: "セロトニンロック開放", steps: "EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓ → 視床皮質ゲート開放 → EMFがより深く浸透 → さらなるCaMKII撹乱 → さらなる5-HT↓ → ...", status: "各リンクが独立に検証済み", color: "green" },
      { id: "S3", name: "低酸素-NKCC1", steps: "CSD → 局所低酸素 → NKCC1↑ → GABAがより興奮性 → γ↓ → Q↑ → CSDがより容易に伝播 → さらなる低酸素 → ...", status: "低酸素でのNKCC1↑検証済み", color: "green" },
      { id: "S4", name: "Walker睡眠連鎖", steps: "EMF → メラトニン↓ → 睡眠↓ → GABAトニック抑制↓ → γ↓ → Q↑ → EMFが脳により影響 → さらなるメラトニン↓ → ...", status: "各リンクが独立に検証済み", color: "green" },
      { id: "S5", name: "PGC → BBBスパイラル", steps: "EMF → PGC → メラトニン↓ → BBBタイトジャンクション↓ → 重金属が脳により容易に入る → さらなるPGC → さらなるメラトニン↓ → ...", status: "各リンクが独立に検証済み", color: "green" },
      { id: "S6", name: "コルチゾール-海馬渦", steps: "EMF → HPA → コルチゾール↑ → 海馬萎縮 → HPA負のフィードバック喪失 → ブレーキなし → コルチゾール↑↑ → さらなる萎縮 → ...", status: "Sapolskyメカニズム検証済み", color: "green" },
      { id: "S7", name: "BAT代謝スパイラル", steps: "EMF → BAT PRDM16↓ → 熱産生↓ → メタボリックシンドローム → 炎症 → VGCC感受性↑ → さらなるCa²⁺撹乱 → ...", status: "メカニズム的に整合、動物データ", color: "amber" },
      { id: "S8", name: "テストステロン神経保護喪失", steps: "EMF → ライディッヒ → StAR↓ → T↓ → 神経保護↓ + シナプス可塑性↓ → EMFにより脆弱 → さらなるライディッヒ損傷 → ...", status: "T↓神経保護リンク検証済み", color: "green" },
      { id: "S9", name: "IL-1β → KCC2ループ", steps: "EMF → マスト細胞 → IL-1β → KCC2成熟遅延 → GABAがより長く興奮性 → Q↑ → さらなる神経損傷 → さらなるIL-1β → ...", status: "KCC2環境調節検証済み", color: "green" },
      { id: "S10", name: "視床下部多軸カスケード", steps: "EMF → 視床下部シナプス小胞↓ → GnRH↓ + CRH調節異常 + TRH↓ → 多ホルモン欠乏 → 全身ストレス → さらなるHPA活性化 → ...", status: "[[ref:kim2019_hypothalamus|Kim 2019]]シナプス変化検証済み", color: "green" },
      { id: "S11", name: "概日時計の自己撹乱", steps: "EMF → SCN Ca²⁺撹乱 → メラトニンタイミング喪失 → 腸でPer2↓ → 末梢時計非同期 → SCNがより脆弱", status: "SCN Ca²⁺振動検証済み", color: "green" },
      { id: "S12", name: "NK-がん-炎症", steps: "ELF → NK細胞傷害性↓ → がん監視↓ → 腫瘍成長 → 炎症 → VGCC感作↑ → さらなるNK抑制", status: "NKのCa²⁺依存性 + ELF抑制検証済み", color: "green" },
      { id: "S13", name: "HPA-HPGクロススパイラル", steps: "EMF → コルチゾール↑ → GnIH↑ → T↓ → 神経保護↓ → 海馬脆弱 → HPAブレーキ喪失 → コルチゾール↑↑ → さらなるGnIH", status: "RF9がコルチゾール処理霊長類でTを回復", color: "green" },
      { id: "S14", name: "腸-脳炎症", steps: "EMF → メラトニン↓ → 腸でPer2↓ → 腸バリア↓ → LPSが血中に → 神経炎症 → 海馬神経新生↓ → さらなるHPA活性化 → さらなるメラトニン↓", status: "Per2 KO → 腸バリア → LPS → うつ病検証済み", color: "green" },
      { id: "S15", name: "メラトニン-テロメア老化スパイラル", steps: "EMF → メラトニン↓ → テロメラーゼ↓ + SIRT1↓ → テロメア短縮 → SASP → 炎症 → ROS↑ → さらなるテロメア損傷 → さらなるSASP → ...", status: "メラトニン → テロメラーゼ + SIRT1検証済み;うつ病 = 7年加速老化", color: "green" },
      { id: "S16", name: "疼痛-睡眠-コルチゾールスパイラル", steps: "EMF → α2δ-1↑ → 中枢感作 → 慢性疼痛 → 睡眠↓(S4) → コルチゾール↑(S7) + GABA↓ → 炎症 → さらなる感作 → うつ病 → 睡眠↓ → ...", status: "α2δ-1 → 損傷なしの疼痛検証済み;疼痛-睡眠-コルチゾール各検証済み", color: "green" },
      { id: "S17", name: "扁桃体-不安スパイラル", steps: "EMF → Ca²⁺↑ → CaMKII → コルチゾール↑ → BLA肥大 → 扁桃体過活動 → 不安↑ → HPA活性化 → コルチゾール↑↑ → さらなるBLA肥大 → ...", status: "単回コルチゾール投与 → BLA肥大検証済み([[ref:amygdala_cort|PNAS 2008]]);持続性検証済み([[ref:amygdala_persist|Neurosci Lett 2023]])", color: "green" },
    ],
    feedbackLoopsLink: "完全な収束検証を見る →",

    hypoNexusTitle: "視床下部ネクサス(VK13)",
    hypoNexusSub: "7つのホルモン軸の解剖学的収束点としての視床下部",
    hypoNexusDesc: "[[ref:kim2019_hypothalamus|Kim 2019]]は835 MHz(12週間)が視床下部のシナプス小胞の数、サイズ、ドッキングを減少させることを実証した。重要なことに、シナプトタグミン1 -- 小胞放出のCa²⁺センサー -- も減少する。すべての視床下部ホルモン放出はCa²⁺誘発小胞融合に依存するため、シナプトタグミン1の喪失はすべての軸が同時に障害されることを意味する。",
    hypoNexusAxes: [
      { axis: "GnRH → LH/FSH → T↓", organ: "性腺", consequence: "テストステロン低下、不妊" },
      { axis: "CRH → ACTH → コルチゾール↑", organ: "副腎", consequence: "HPA感作、慢性ストレス" },
      { axis: "TRH → TSH → T3/T4", organ: "甲状腺", consequence: "潜在性甲状腺機能低下症" },
      { axis: "GHRH → GH → IGF-1", organ: "肝臓/骨", consequence: "成長・代謝障害" },
      { axis: "ドーパミン → プロラクチン", organ: "下垂体", consequence: "高プロラクチン血症" },
      { axis: "ソマトスタチン → GH/TSH", organ: "複数", consequence: "抑制性制御の喪失" },
      { axis: "オキシトシン / AVP", organ: "複数", consequence: "社会的行動、水分バランス" },
    ],
    hypoNexusKey: "VK13はEMFがなぜ無関係に見える同時的な多システム効果を生むかの解剖学的説明。25の別々の疾患ではなく、7つの出力チャネルを持つ一つの撹乱されたネクサスである。",

    tripleLockTitle: "トリプルロック理論",
    tripleLockSub: "自己強化型の罠を生む3つの同時欠損:T↓ × F↑ × DA↓",
    tripleLockDesc: "EMFはテストステロンを同時に減少させ(T↓、ライディッヒ/StAR経由)、コルチゾールを上昇させ(F↑、HPA感作経由)、ドーパミンを減少させる(DA↓、中脳辺縁系経路経由)。各欠損は他を強化し、シナジー的な罠を生む。",
    tripleLockComponents: [
      { component: "T↓(テストステロン)", mechanism: "EMF → ライディッヒ → StAR↓ → ステロイド産生↓", consequence: "神経保護喪失、筋量減少、不妊、うつ病" },
      { component: "F↑(コルチゾール)", mechanism: "EMF → HPA感作 → コルチゾールベースライン↑", consequence: "海馬萎縮、免疫抑制、メタボリックシンドローム" },
      { component: "DA↓(ドーパミン)", mechanism: "EMF → CaMKII → DA合成撹乱", consequence: "無快感症、意欲喪失、依存症脆弱性" },
    ],
    tripleLockSynergy: "トリプルロックは3つの独立した効果ではない -- シナジー的な罠である。T↓ × F↑ = 加速された神経変性。F↑ × DA↓ = 治療抵抗性うつ病。T↓ × DA↓ = 動機崩壊。T↓ × F↑ × DA↓ = 完全な現代表現型。",

    quadLockTitle: "クワッドロック:第四の次元",
    quadLockSub: "T↓ × F↑ × DA↓ × OXT↓ -- オキシトシンを加えることで社会-生殖崩壊が完成する",
    quadLockDesc: "オキシトシン放出は直接VGCC依存(N型 + L型Ca²⁺チャネル、[[ref:oxt_vgcc|PMC3197583]])。EMFがVGCC機能を撹乱 → OXT放出撹乱。トリプルロックにOXT↓を加えることで、生理学的低下だけでなく社会的断片化を含む完全な現代表現型を説明するクワッドロックが生まれる。",
    quadLockComponents: [
      { component: "T↓ × OXT↓", effect: "生殖-社会的崩壊:不妊 + ペアボンドの弱体化" },
      { component: "DA↓ × OXT↓", effect: "社会的動機崩壊:社会的つながりへの欲求減少 + そこからの報酬減少" },
      { component: "F↑ × OXT↓", effect: "緩衝なしのストレス:コルチゾールが上昇しOXT(社会的ストレス緩衝)が低下" },
      { component: "T↓ × F↑ × DA↓ × OXT↓", effect: "完全な現代表現型:生物学的低下 + 社会的孤立 + 動機崩壊" },
    ],
    quadLockNote: "インスリンはCa²⁺を介してOXT放出を刺激する([[ref:insulin_oxt|PMC6039480]])。肥満者はOXTが低い。これは代謝-社会的な橋を生む:メタボリックシンドローム(S7) → インスリン抵抗性 → OXT↓ → 社会的孤立 → うつ病 → メタボリックシンドロームの悪化。",

    dualBarrierTitle: "二重バリア原理",
    dualBarrierSubtitle: "BBB + 腸バリアはZO-1、オクルディン、クローディンを共有",
    dualBarrierBody: "血液脳関門と腸上皮バリアは同じタイトジャンクションタンパク質を共有:ZO-1、オクルディン、クローディン。メラトニンは両バリアを保護する。EMF→メラトニン↓は同時二重脆弱性を生む:BBBが開く(重金属が脳に入る)かつ腸バリアが弱まる(LPSが血流に入る → 神経炎症)。これは2つの別個の効果ではない -- 同じ分子ツールキットから構築された2つのバリアを攻撃する一つのメカニズム(メラトニン喪失)である。",

    bdnfHormesisTitle: "BDNFホルメシス:周波数が方向を決定する",
    bdnfHormesisSubtitle: "RF→BDNF↓ vs ELF→BDNF↑ -- 同じ経路、反対の結果",
    bdnfHormesisBody: "BDNFは神経可塑性・記憶・神経新生に重要であり、RF-EMFとELFの研究ではBDNFおよびNK細胞エンドポイントに方向の異なる所見が報告されている。BERMはこれらを、候補VGCC経路を介する周波数依存ホルミシス仮説の動機として扱う。提案χ閉包はLindgren幾何学から生物学的結果を導出せず、L2結合とエンドポイント別応答は未校正である。",

    agingSpiralTitle: "老化スパイラル:抗老化分子としてのメラトニン",
    agingSpiralSub: "EMF → メラトニン↓ → テロメラーゼ↓ + SIRT1↓ → 加速老化(うつ病 = 7年)",
    agingSpiralDesc: "メラトニンは単なる睡眠ホルモンではない -- 主要な抗老化分子である。テロメラーゼを活性化し(テロメア長を維持)、SIRT1をアップレギュレートし(→ ROS↓ → p53↓ → NF-κB↓)、内皮の老化を緩和する。EMF→メラトニン↓はこの保護カスケード全体を除去する。",
    agingSpiralSteps: [
      { step: "EMF → メラトニン↓", detail: "CRY経路(VK1-VK3)を介した松果体抑制" },
      { step: "メラトニン↓ → テロメラーゼ↓", detail: "メラトニンはテロメラーゼを直接活性化([[ref:mel_telomerase|Front Aging Neurosci 2022]])" },
      { step: "メラトニン↓ → SIRT1↓", detail: "SIRT1 → ROS↓ → p53↓ → NF-κB↓ 抗炎症カスケード喪失" },
      { step: "テロメア短縮 → SASP", detail: "短縮されたテロメアが老化関連分泌表現型を誘発 → 慢性炎症" },
      { step: "SASP → ROS↑ → さらなるテロメア損傷", detail: "フィードバックループS15:炎症が残存テロメアに酸化的損傷を引き起こす" },
    ],
    agingSpiralQuantitative: "定量的アンカー:大うつ病は281 bp短いテロメアに関連し、7年の加速老化に相当する([[ref:depression_telomere|PMC3063175]])。メタボリックシンドロームも同様にテロメア短縮とテロメラーゼ活性低下に関連([[ref:mets_telomere|PMC12744432]])。両状態はBERM予測の結果であり -- その老化加速はEMF→メラトニン↓→テロメラーゼ↓と一致する。",

    genSuscTitle: "遺伝的感受性マップ:15遺伝子カルシウムプロファイル",
    genSuscSub: "EMF感受性は一つの遺伝子ではない -- カルシウムカスケードの5つの機能層にわたる多遺伝子プロファイル",
    genSuscDesc: "BERMは多型が個人のEMF感受性を変調する15の遺伝子を特定する。5つの機能層に分かれる:流入(Ca²⁺流入を制御する5つのCACNA遺伝子)、変調(CACNA2D1、チャネル密度)、統合(CAMK2A/B、収束点)、排出(Ca²⁺除去を制御する3遺伝子)、シグナリング(下流応答を変調する4遺伝子)。各遺伝子の疾患関連はBERMカスケードの予測と一致する。",
    genSuscInfluxTitle: "層1 -- 流入:Ca²⁺流入チャネル",
    genSuscInfluxGenes: [
      { gene: "CACNA1C", protein: "Cav1.2(L型)", role: "主要RF標的。ニューロン、心臓、β細胞。", variant: "rs1006737 A-アレル", diseases: "双極性障害、統合失調症、ASD、うつ病、Timothy症候群", evidence: "確認([[ref:sousouri2025|Sousouri 2025]] RCT)" },
      { gene: "CACNA1H", protein: "Cav3.2(T型)", role: "ELF標的。ライディッヒ細胞、松果体、視床。", variant: "GoF変異", diseases: "小児てんかん、熱性けいれん、原発性アルドステロン症、ASD", evidence: "一致" },
      { gene: "CACNA1D", protein: "Cav1.3(L型)", role: "内耳、洞房結節、黒質。", variant: "GoF/LoFバリアント", diseases: "徐脈、てんかん、難聴、ADHD、ASD", evidence: "一致" },
      { gene: "CACNA1A", protein: "Cav2.1(P/Q型)", role: "シナプス前放出。ELFプライミング標的。", variant: "rs16023 B-アレル", diseases: "DD + てんかん、家族性片麻痺性片頭痛、発作性運動失調", evidence: "確認(ELFプライミング + GWAS)" },
      { gene: "CACNA1B", protein: "Cav2.2(N型)", role: "疼痛経路、交感神経系。", variant: "稀な変異", diseases: "慢性疼痛、交感神経機能障害", evidence: "一致" },
    ],
    genSuscModTitle: "層2 -- 変調:チャネル密度制御",
    genSuscModDesc: "CACNA2D1はα2δ-1をコードする。α2δ-1はVGCCのシナプスへの輸送を制御するタンパク質。これはELFプライミングの分子基盤:50/60 Hz暴露がα2δ-1をアップレギュレート → より多くのVGCCが細胞表面に → 細胞がすべての後続EMFに対してより感受性になる。ガバペンチノイド(プレガバリン、ガバペンチン)はα2δ-1に結合してこの輸送をブロック -- メカニズム的にELFプライミングのアンタゴニストとなる。",
    genSuscModRef: "[[ref:field2006_cacna2d1|Field 2006]] (PNAS) · [[ref:hoppa2012_a2d|Hoppa 2012]] (Nature)",
    genSuscIntTitle: "層3 -- 統合:CaMKII収束",
    genSuscIntDesc: "Thr286/287の自己リン酸化を増加させるCAMK2A/B de novo変異はてんかん、知的障害、自閉症を生む -- BERMが環境的(EMF)自己リン酸化増加から予測する正確な表現型。自己リン酸化を減少させる変異も知的障害を引き起こす。両方向 = 障害 → 正確な調節が重要。これはBERMの最も直接的な遺伝的検証:遺伝的および環境的CaMKII調節異常が同一の臨床結果に収束する。",
    genSuscIntRef: "[[ref:kury2017_camk2|Kury 2017]] (AJHG, PMC5673671) · [[ref:altawashi2018_camk2a|Al-Tawashi 2018]] (eLife, PMC5963920)",
    genSuscExtTitle: "層4 -- 排出:Ca²⁺除去",
    genSuscExtDesc: "3つの遺伝子がCa²⁺の細胞からの除去を制御する。遅い排出 + 高い流入 = Ca²⁺蓄積 → より低いEMFレベルでCaMKII閾値超過。SLC8A1(NCX1):心臓/神経のCa²⁺輸出。ATP2B1(PMCA1):一般的Ca²⁺ポンプ(GWAS:高血圧)。ATP2B2(PMCA2):内耳 -- 遅いPMCA2 + Bluetoothイヤホン = 耳鳴リスク。",
    genSuscSigTitle: "層5 -- シグナリング:下流応答",
    genSuscSigGenes: [
      { gene: "CRY1", variant: "CRY1Δ11(0.6%)", effect: "GoF → より長い概日周期 → 睡眠遅延 → より短い回復ウィンドウ。EMFがCRYを撹乱 → 遺伝的延長と加算的。", diseases: "DSPD、代謝障害、不眠症", evidence: "確認([[ref:patke2017_cry1|Patke 2017]] Cell)" },
      { gene: "MTNR1B", variant: "rs10830963 G", effect: "eQTL → β細胞にMT2受容体増加 → メラトニン変化に過敏。EMFがメラトニン抑制 → G/Gキャリアがより影響 → T2Dリスクが超加算的。", diseases: "T2D、空腹時血糖、妊娠糖尿病", evidence: "確認(GWAS + eQTL)" },
      { gene: "COMT", variant: "Val158Met(rs4680)", effect: "Val/Val = 速いドーパミンクリアランス = 低いDAベースライン → EMF誘発DA合成低下がより強く影響(小さなバッファー)。", diseases: "ストレス脆弱性、依存症、疼痛感受性", evidence: "導出可能" },
    ],
    genSuscEhsTitle: "EHS再定義:多遺伝子カルシウム閾値障害",
    genSuscEhsDesc: "EHS(電磁過敏症)は心因性ではない -- 多遺伝子的に予測可能なCa²⁺閾値障害。高いVGCC流入(CACNA GoF) + 遅い排出(SLC8A1/ATP2B LoF) + 感受性シグナリング(CRY1Δ11、MTNR1B GG、COMT Val/Val) = 低いCaMKII自己リン酸化閾値 = 集団平均以下のEMFレベルで症状。",
    genSuscEhsBiomarker: "提案バイオマーカー:リンパ球のCaMKII Thr286自己リン酸化レベル。高いレベル = 閾値に近い = よりEMF感受性。これはEHSの最初の客観的バイオマーカーとなりうる。",
    genSuscEpistaticTitle: "エピスタシス相互作用",
    genSuscEpistatic: [
      { pair: "CACNA1C × MTNR1B", effect: "異なる臓器での同じメラトニン抑制からうつ病 + T2D。AA + GGキャリア:最高の併存症。", status: "検証可能(バイオバンク)" },
      { pair: "CRY1Δ11 × MTNR1B", effect: "遅延メラトニン × β細胞過敏 → 朝の空腹時血糖が特に上昇。", status: "導出可能" },
      { pair: "CACNA × SLC8A1/ATP2B", effect: "高い流入 + 遅い排出 = Ca²⁺蓄積 → EHS表現型。", status: "検証可能(EHSコホートの遺伝子型決定)" },
      { pair: "CAMK2A × CACNA2D1", effect: "CaMKIIが閾値付近 + より多くのチャネル = あらゆるEMFに対して危機的に感受性。", status: "一致" },
    ],
    genSuscPrinciples: [
      { id: "GXEMF-1", title: "遺伝子 × EMF相互作用は超加算的", desc: "遺伝的リスクの顕在化はEMF暴露に依存する。EMFはEMFフリー環境では潜在的な遺伝的リスクを「活性化」する。" },
      { id: "GXEMF-2", title: "ガバペンチノイドはα2δ-1を介してELFプライミングを逆転させる", desc: "プレガバリン/ガバペンチンはα2δ-1に結合しVGCC輸送をブロック。ガバペンチノイド使用者はシナプスVGCC密度が低い → EMF感受性が低い。" },
      { id: "GXEMF-3", title: "CaMKII自己リン酸化は測定可能なバイオマーカー", desc: "リンパ球のCaMKII Thr286リン酸化レベル:高い = よりEMF感受性。EHSコホートで検証可能。" },
    ],
    genSuscRef: "[[ref:kury2017_camk2|Kury 2017]] · [[ref:patke2017_cry1|Patke 2017]] · [[ref:lyssenko2009_mtnr1b|Lyssenko 2009]] · [[ref:tuomi2016_mtnr1b|Tuomi 2016]] · [[ref:scholl2015_cacna1h|Scholl 2015]] · [[ref:korean2025_cacna|Korean 2025]] · [[ref:field2006_cacna2d1|Field 2006]] · [[ref:hoppa2012_a2d|Hoppa 2012]]",

    recovWindowTitle: "回復ウィンドウ:CaMKII脱リン酸化",
    recovWindowSub: "現代生活はCa²⁺恒常性回復に必要なEMFフリー時間を排除する",
    recovWindowDesc: "CaMKII脱リン酸化(自己リン酸化状態からの回復)にはCa²⁺過負荷のない時間が必要。EMFフリーの睡眠がこの回復を可能にする。しかし現代の環境はEMFフリー時間を排除する:WiFiルーター24/7、ベッドサイドの携帯電話、就寝までのLED照明、Bluetoothデバイス。回復因子(R)はこれを捕捉する:EMFフリー時間がゼロに近づくと、分母1/Rは1.0に近づき(回復なし)、累積損傷が加速する。",
    recovWindowEvidence: "シフト勤務:メタボリックシンドロームの[[ref:shiftwork_mets2025|OR 1.17]] -- 夜勤はメラトニンと回復ウィンドウの両方を撹乱。[[ref:walker2017_why_we_sleep|Walker(2017)]]:一晩の睡眠不足 → テストステロン-15%、NK細胞-70%。良い睡眠は回復させる → 回復ウィンドウは実在。COVIDロックダウンの自然実験:WiFi + LED + 複数デバイスで24時間/日在宅 → 回復ウィンドウ排除 → T2D加速[[ref:t2d_covid2024|2.90%から3.52%/年]]。",
    recovWindowIntervention: "モデルが予測する最も単純な介入:EMFフリーの寝室。寝室からWiFiルーターを撤去、夜間の携帯電話機内モード、就寝前の白熱灯またはろうそくの光への切替。他の生活習慣変更なしに回復ウィンドウを回復させる。",
    recovWindowPred1: "RECOV-1:EMFフリー寝室 → 2週間以内にメラトニンレベルが測定可能に増加",
    recovWindowPred2: "RECOV-2:CaMKII脱リン酸化の最小回復ウィンドウ:4-6時間EMFフリー",
    recovWindowRef: "[[ref:walker2017_why_we_sleep|Walker 2017]] · COVIDロックダウンデータ · シフト勤務メタアナリシス",

    mtorSub: "EMF、カロリー制限、ラパマイシンが同じ老化経路に収束する",
    mtorTitle: "mTOR収束仮説",
    mtorDesc1:
      "mTORはEMF誘発Ca²⁺流入が老化、出生率、がん経路と収束する下流統合器。Sempou経路:EMF → VGIC → Ca²⁺↑ → mTOR過活性化 → オートファジー↓、老化細胞蓄積、ミトコンドリア品質管理↓、慢性炎症↑。",
    mtorDesc2:
      "メトホルミンはAMPKを活性化し、mTORを抑制する -- EMF誘発経路の正反対。仮説:メトホルミンの長寿効果は本来の抗老化ではなく、EMF加速老化に対する抗老化。自然なEMF環境(アーミッシュ)では利益は最小であるべき。",
    mtorEqExplain:
      "EMFは正規化暴露(0 = インフラなし、1 = 現代都市)、減少因子にはメトホルミン(0.30)、ラパマイシン(0.85)、カロリー制限(0.20)、間欠的断食(0.10)が含まれる。",
    mtorThreeTitle: "3つの流行病、1つのメカニズム",
    mtorAging: "老化",
    mtorAgingDesc:
      "mTOR↑ → オートファジー↓、老化↑、炎症↑、ミトコンドリア↓ → 加速老化",
    mtorFertility: "出生率",
    mtorFertilityDesc:
      "mTOR↑ → 精原細胞分化↓、卵胞バーンアウト↑、AMH↓ → TFR↓",
    mtorCancer: "がん",
    mtorCancerDesc:
      "mTOR↑ → 増殖↑、腫瘍増殖↑、転移↑ → がんリスク↑",
    mtorPredTitle: "検証可能な予測",
    mtorPredColId: "ID",
    mtorPredColPred: "予測",
    mtorPredColTest: "検証",
    mtorPreds: [
      { id: "E1", pred: "メトホルミンの長寿効果は高EMF環境でより大きい", test: "UK CPRDを都市/農村で層別化" },
      { id: "E2", pred: "アーミッシュのメトホルミン使用者は一般集団より小さい長寿ボーナスを示す", test: "アーミッシュ糖尿病コホート比較" },
      { id: "E3", pred: "ブルーゾーンの長寿優位は4G/5G到着とともに消失する", test: "沖縄、サルデーニャ、イカリアのコホート追跡" },
      { id: "E4", pred: "CR実験の効果量は10年ごとに増加する(研究室EMFの上昇)", test: "メタアナリシス:効果量 vs 出版年" },
      { id: "E5", pred: "TAME試験の利益はEMF暴露により層別化される", test: "都市 vs 農村のサブグループ分析" },
      { id: "E6", pred: "シャバット(週25時間EMFフリー)が間欠的mTOR断食として機能し、超正統派のTFRと長寿を支持する", test: "超正統派 vs 世俗的イスラエルコホート" },
    ],

    fourRoutesTitle: "EMF → TFRの5つの独立経路",
    fourRoutesSub: "性腺、概日、下垂体、自律神経、神経発達 -- 各々が単独で十分",
    fourRoutesDesc: "BERMはEMF暴露が出生率を低下させる5つの独立した生物学的経路を特定する。各経路は異なるメカニズムと標的組織を通じて動作する。重要なのは、各経路が独立にTFRを低下させるのに十分であること -- 並列に動作し、直列ではない。一つの経路をブロック(例:性腺経路への抗酸化剤補充)しても効果は排除されない。4つの他の経路が活性のままだからである。",
    fourRoutesGonadal: "経路1:性腺(確立)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> 精子DNA損傷 + ライディッヒ細胞StAR抑制 -> テストステロン低下 + 精子形成障害。さらに：EMF -> CatSper早期活性化 -> エネルギー枯渇 -> ナビゲーション障害（レオタキシス、走化性、先体反応）。標的組織:精巣。エビデンスレベル:E(23-28のブロッカー研究)。主チャネル:RF + ELF。",
    fourRoutesCircadian: "経路2:概日(確立)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> 概日時計撹乱 -> メラトニン抑制 -> HPG軸撹乱 + 卵胞液中の酸化ストレス。標的組織:松果体、SCN。エビデンスレベル:E。主チャネル:RF(磁気成分)。",
    fourRoutesPituitary: "経路3:下垂体(新規)",
    fourRoutesPituitaryDesc: "EMF -> ゴナドトロフのCav3 T型チャネル -> FSH/LH分泌撹乱 -> 下流の性腺機能障害。下垂体はBBBの外にあり直接暴露される。すべてのホルモン産生細胞がCav3を発現。この経路は性腺損傷とは独立に出生率を低下させる。標的組織:下垂体。エビデンスレベル:E。主チャネル:ELF + RF。",
    fourRoutesAutonomic: "経路4:自律神経(新規)",
    fourRoutesAutonomicDesc: "EMF -> 洞房結節Cav3.1 -> HRV低下 -> 迷走神経トーン低下 -> HPA軸過活性化 -> 慢性コルチゾール -> HPG交差抑制。HRVは感度の高い早期バイオマーカー。標的組織:洞房結節、迷走神経。エビデンスレベル:E。主チャネル:ELF(50 Hz)。",
    fourRoutesNeurodevelopmental: "経路5:神経発達(導出)",
    fourRoutesNeurodevelopmentalDesc: "EMF → 臨界的発達ウィンドウ中のVGCC/Ca²⁺ → 脳の性分化、PFC成熟、アイデンティティ形成の撹乱。化学的EDC(BPA、フタル酸エステル)と同じメカニズム。化学的EDC効果と加算的。阻止:出生前EMF減少、B2/グルタチオンサポート。標的組織:胎児/乳児の脳。エビデンスレベル:L*(導出予測 -- DIFF-1 AGD検証待ち)。主チャネル:RF + ELF。",
    cascadeNeurodevExt: "拡張分析:ASD、ADHD、双極性障害、うつ病、統合失調症にわたる共有遺伝的脆弱性としてのCACNA1C。7つの発達チャネルが同じCa²⁺経路を通じてEMFと脳の性分化を結ぶ。完全な分析は脳モジュロームを参照。",
    fourRoutesImplication: "臨床的意味:一つの経路のみを標的とする介入(例:経路1への抗酸化剤)は部分的だが不完全な保護を示す。完全な保護にはEMF削減(すべての経路に同時に対処)または多標的介入戦略が必要。",

    modulationTitle: "なぜ変調がSARより重要か",
    modulationDesc: "大規模研究([[ref:fert-steril-2023-phone-sperm-trend|Fertility and Sterility 2023]])は携帯電話使用と精子濃度低下の関連を見出した -- しかし関連は2012-2018より2005-2007でより強かった。BERMはSchwan方程式を通じてこれを説明する:生物学的活性成分はRFキャリアではなくそのELF変調エンベロープ。GSM(2G):217 Hzの硬いTDMAパルス、約100%の変調深度 → 強いELF成分 → 大きなT型分岐効果。LTE(4G):OFDM、約30-50%の変調深度、低い送信電力 → 弱いELF成分 → 小さい効果。これは「放射線が少ないほど安全」を援用せずに時間トレンドを予測する。放射線の量は似ている可能性があるが、変調構造が変化した。",
    modulationWarning: "注:この時間トレンドは相関である。他の要因が同時に変化した(電話位置、使用パターン、他の暴露)。Schwanの説明は簡潔だが唯一の可能性ではない。",

    modulomeSub: "分子スピン物理から集団パターンまでの12層感受性モデル",
    modulomeTitle: "EMFモジュローム",
    modulomeDesc: "12層モジュロームは分子スピン物理から集団パターンまでの候補修飾因子を整理します。BERMはエンドポイント固有カーネルでそれらを結びます。普遍的χやχ_geoではなく、FieldStateからも導出されません。12層、10標的臓器、出生率低下への4つの提案経路です。",

    btnEvidence: "エビデンスを閲覧",
    btnPredictions: "予測を表示",
    mathSub: "導出済み幾何学、条件付き応答演算子、未校正の組織応答",
    mathTitle: "数学的基礎",
    mathSubtitle:
      "数学は2025年Lindgren仮定とその幾何学的帰結を、BERMの生物学的・人口学的閉包から分離します。応答演算子形は明示的な結合仮定の下で条件付きに導出され、組織カーネル、符号、遅延、校正は未解決です。",

    thresholdTitle: "テストステロン → TFR閾値モデル",
    thresholdSub: "生物学的容量低下から人口学的崩壊への定量的リンク",
    thresholdLead: "BERMモデルの最も強力な予測成分。テストステロン低下(年約1%、年齢非依存、5カ国で記録)は三相軌道を生む:静かな侵食 → 閾値超過 → 生物学的限界。モデルはフィンランドと韓国のデータに対して較正され、具体的で検証可能な国レベルの予測を生成する。",
    thresholdPhase1Title: "フェーズ1:静かな侵食",
    thresholdPhase1Desc: "テストステロンは低下しているが生物学的に十分。TFRは安定または文化的要因により緩やかに低下。生物学的容量が文化的需要を超えている。",
    thresholdPhase2Title: "フェーズ2:閾値超過",
    thresholdPhase2Desc: "累積T損失が約40%を超える。男性不妊の増加(T < 300 ng/dL)。生物学的容量が拘束条件となりTFRが加速的に低下。出生促進プログラムが失敗し始める。",
    thresholdPhase3Title: "フェーズ3:生物学的限界",
    thresholdPhase3Desc: "TFRが1.0を下回る。生物学的不能が支配的。意欲のあるカップルでも生殖補助技術が必要。IVF需要が指数関数的に増加。",
    thresholdMathTitle: "数学的定式化",
    thresholdMathT: "T(t) = T₀ × (1 - r)^(t - t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_cultural(t), TFR_bio(t) )",
    thresholdMathExplain: "TFR_bio < TFR_culturalの場合、生物学的容量が拘束条件。累積T損失約40%でのシグモイド遷移が観測パターンを生む:数十年の安定の後の急速な崩壊。",
    thresholdTableTitle: "国別パラメータ",
    thresholdTableCountry: "国",
    thresholdTableRate: "r(%/年)",
    thresholdTableSource: "出典",
    thresholdTableCumul: "2024年累積",
    thresholdTableThreshold: "閾値年",
    thresholdTablePhase: "フェーズ",
    thresholdFinlandTitle: "回顧的検証:フィンランド",
    thresholdFinlandText: "フィンランドはモデルのロゼッタストーン。[[ref:perheentupa2013|Perheentupa(2013)]]は37%のコホート依存性T低下を記録(n=3,271、1972-2002)。TFRは40年間(1970-2010)1.63-1.87で安定し、2024年までに1.26に崩壊した。T低下の開始からTFR崩壊までの約35年の遅延は、累積的生物学的侵食が閾値に到達することと一致する。2005年にモデルが存在していれば、フィンランドの崩壊を10-15年早く予測できたはず。",
    thresholdProjectionsTitle: "国別TFR予測",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "インタラクティブ閾値モデル",
    thresholdFootnoteDenmark: "[[ref:andersson-2007-denmark|Andersson 2007]]はBMI調整後にヌル結果を報告。モデルはBMIを交絡因子ではなく媒介因子(EMF → 代謝撹乱 → BMI↑ → T↓)と解釈する -- BMI調整はシグナルの一部を除去する。下の因果構造セクションを参照。",
    thresholdFootnoteEstimated: "査読済みの世俗的Tトレンド研究は利用不可。韓国の率は最高のグローバルEMF密度から推定;日本の率はフィンランドの記録された低下との類推により推定。これらは暫定的であり、直接データが利用可能になり次第更新される。",
    thresholdCaveat: "T低下率は査読済み縦断研究からの年齢非依存の世俗的トレンド。韓国と日本の率は推定。40%閾値は較正値であり導出値ではない。予測は現在の率の継続を仮定。",

    causalStructureTitle: "なぜBMIは低下を説明しないのか",
    causalStructureLead: "持続的な反論は、環境暴露ではなく肥満の増加が世俗的テストステロン低下を説明するというもの。Pearlのフレームワークを用いた正式な因果分析は、BMIが交絡因子(独立の原因)ではなく媒介因子(因果経路上)であることを明らかにする。媒介因子の調整は実際のシグナルを除去する。",
    causalDagConventionalTitle: "従来の解釈",
    causalDagConventionalCaption: "交絡因子としてのBMI:調整は正しく、ヌル結果 = 低下なし",
    causalDagBermTitle: "BERMの解釈",
    causalDagBermCaption: "媒介因子としてのBMI:調整は媒介シグナルを除去、ヌル = 過剰補正",
    causalMazurTitle: "体重安定テスト:[[ref:mazur2013|Mazur et al. 2013]]",
    causalMazurText: "991人の米空軍退役軍人を20年間(1982-2002)6回の測定で追跡。体重を維持した男性でもテストステロンの117 ng/dL(19%)を失った。これは統計的調整なしにBMIを制御する自然実験。",
    causalMazurQuote: "テストステロンの世俗的低下の理由は特定していないが、肥満の増加を十分または主要な説明として除外する。",
    causalMazurSource: "[[ref:mazur2013|Mazur, Westerman & Mueller 2013]], PLOS ONE",
    causalPathwayTitle: "定量的経路分解",
    causalPathwayDirect: "直接経路",
    causalPathwayDirectDesc: "EMF -> Cav3.2/メラトニン/コルチゾール -> T低下",
    causalPathwayDirectEst: "~117 ng/dL / 20年(約67%)",
    causalPathwayMediated: "媒介経路",
    causalPathwayMediatedDesc: "媒介候補：EMF ?→ 代謝変化 ?→ BMI増加 → アロマターゼ/SHBG変化 → T変化",
    causalPathwayMediatedEst: "~58 ng/dL / 20年(約33%)",
    causalPathwayCaveat: "これらの比率は近似であり、[[ref:mazur2013|Mazur 2013]](体重安定群 vs 体重増加群)から導出。正式な媒介分析(SEM)がこれらの推定を精緻化できる。",
    dagDietLifestyle: "食事 / 生活習慣",
    dagBmiAdjCorrect: "BMI調整:正しい",
    dagNullNoDecline: "ヌル = 実際の低下なし",
    dagMetabolicPaths: "6つの代謝",
    dagPathways: "経路",
    dagMediated: "媒介(約33%)",
    dagDirect: "直接(約67%)",
    dagOvercorrection: "BMI調整:過剰補正",
    dagRemoves: "実際のシグナルの約33%を除去",
    causalReconciliationTitle: "「矛盾する」結果の調和",
    causalReconciliationLead: "因果構造が理解されれば、ヌル結果を報告するものを含むすべての既存研究が一致する:",
    causalReconciliationStudies: [
      { referenceId: "travison2007_v2", study: "Travison 2007", bmiAdj: true, result: "-1.0%/年", interpretation: "直接経路を捕捉(BMI調整済み)。同時期にELFプライミングが増加(WiFi + 3G普及)" },
      { referenceId: "mazur2013", study: "Mazur 2013", bmiAdj: false, result: "-0.95%/年", interpretation: "直接経路が自然に確認(体重安定)。20年 = 層2→4。直接経路約67%。プライミング:同期間にPが1.5→2.0に増加" },
      { referenceId: "chodick-2020-israel", study: "Chodick 2020", bmiAdj: false, result: "-1.02%/年", interpretation: "総効果(直接 + 媒介)。イスラエル:高RF密度 → 強い層効果" },
      { referenceId: "santi2025", study: "Santi 2025", bmiAdj: true, result: "TとLHの低下", interpretation: "直接経路 + HPG撹乱確認。LH↓は下垂体撹乱を示す。脳は最もプライミングされた臓器(近接場24/7)。CACNA1C遺伝子型がLH応答を調節" },
      { referenceId: "andersson-2007-denmark", study: "Andersson 2007", bmiAdj: true, result: "ヌル", interpretation: "媒介経路が優位 → BMI調整がシグナルを除去。デンマーク56°N:夏に実施なら → CRY飽和 → より小さい効果。季節補正でシグナルが明らかに" },
      { referenceId: "nyante2012_nhanes", study: "Nyante 2012", bmiAdj: true, result: "ヌル", interpretation: "アッセイ変更 + 媒介因子除去 → シグナルマスク。米国(60 Hz) vs ヨーロッパ(50 Hz):異なるELF周波数 → 異なるCRY干渉プロファイルの可能性" },
    ],
    causalSantiTitle: "[[ref:santi2025|Santi 2025]]:テストステロンとLHの両方が低下",
    causalSantiText: "史上最大のメタアナリシス(1,064,891人の男性、1971-2024)は、血清テストステロンが年齢、BMI、アッセイ法に独立して低下していることを発見した。重要なことに、LH(テストステロン産生を駆動する下垂体シグナル)も低下していることが判明 -- 単純な精巣不全を除外し、視床下部-下垂体レベルでの撹乱を示唆する。",
    causalSantiMechanism: "BERMはこれを正確に予測する:経路A(Cav3.2 -> StARを介した直接的ライディッヒ細胞)がテストステロンを減少させ、経路B(メラトニン -> GnRH)と経路D(コルチゾール -> HPG)がLHを減少させる。両ホルモンの同時低下は多レベル撹乱のシグネチャー -- 老化でも肥満でもない。",
    causalSantiSource: "[[ref:santi2025|Santi et al. 2025]], J Endocrinol Invest 48:2721-2734",
    pocketTitle: "ポケット移行",
    pocketText: "2000年以降の精子低下率の倍増([[ref:levine2023_sperm|1.16%→2.64%/年]])は一つの行動変化と一致する:携帯電話が耳からポケットに移動した。3Gデータ機能により携帯電話は通話のみではなく継続的にポケットに留まるようになった。精巣は1日16時間近接場に入った。",
    causalInverseTitle: "逆薬理学的テスト:テストステロン療法は肥満を逆転させる",
    causalInverseText: "肥満がテストステロン低下を引き起こすなら、テストステロンを上げても体重に影響しないはず。しかし低ゴナドの肥満男性へのテストステロン療法は劇的な体重減少(クラスIII肥満で最大30 kg)を生み、双方向因果を確認:T抑制が体重増加を駆動し、逆方向だけではない。",
    causalInverseData: [
      { label: "クラスI肥満", loss: "-16.3 kg", bmi: "-5.52" },
      { label: "クラスII肥満", loss: "-25.3 kg", bmi: "-8.15" },
      { label: "クラスIII肥満", loss: "-30.5 kg", bmi: "-9.96" },
    ],
    causalInverseSource: "[[ref:saad2016|Saad et al. 2016]], registry studies",

    whyPronatTitle: "なぜ2000億ドルで韓国の出生率を上げられなかったか",
    whyPronatText: "BERMの三層アーキテクチャは出生率を生物学的容量(レベル1)、EMF-行動結合(レベル2)、文化的選択(レベル3)に分離する。出生促進政策 -- 現金ボーナス、育児休暇、保育補助金 -- はレベル3(動機)を対象とする。しかしレベル1(生物学的容量)が拘束条件になると、レベル3の報奨では補償できない。韓国の累積テストステロン損失は48%を超える。子供を望むカップルの増加する割合が自然妊娠できない。2000億ドルはモデルの間違ったレベルに対処した。",
    whyPronatPrediction: "T-TFR-4:韓国のTFRは政策支出に関係なく2035年まで持続的に1.0を超えない。",
    whyPronatFalsification: "反証:韓国TFRが3年以上1.0以上を持続。",

    bioFloorTitle: "生物学的下限",
    bioFloorText: "精子形成には血清濃度の50-100倍の精巣内テストステロンが必要。血清テストステロンが約200 ng/dL以下に低下すると精子形成は深刻に障害される。現在の低下率(約500 ng/dLベースラインから年1%)では:",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "若年男性の集団平均" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "精子形成閾値以下" },
    ],
    bioFloorConsequence: "この下限以下では、IVFでも男性自身の精子を使用できない。ドナー精子、精巣精子採取、または将来の技術(体外精子形成)が必要になる。これは推測ではない -- 測定された低下率に算術を適用した結果である。",

    sixFactorTitle: "なぜテストステロンが統合変数なのか",
    sixFactorLead: "テストステロンはBERMフレームワークで最も情報量の多い単一バイオマーカーである。6つの独立した生物物理学的特性がEMF → VGCC → Ca²⁺メカニズムに対して例外的に感受性にする。",

    diseaseCascadesTitle: "拡張疾患カスケード",
    diseaseCascadesLead: "VGCC遺伝子ファミリー分析から導出された11の追加疾患カスケード。各カスケードは特定のVGCCサブタイプを独自のエビデンスレベルを持つ疾患メカニズムに結びつける。",
    diseaseCascades: [
      { num: 9, title: "近視", mechanism: "EMF → ドーパミン作動性アマクリン細胞のVGCC → DA放出撹乱 → 強膜伸長ブレーキ弱体化 + CRY → メラトニン → 概日眼成長調節異常。3つの収束チャネル。", level: "M", trend: "22.9%(2000) → 34%(2020) → 50%(2050)" },
      { num: 10, title: "自己免疫疾患", mechanism: "EMF → T細胞のCa²⁺慢性摂動 → Ca²⁺-カルシニューリン-NFAT経路調節異常 → 自己反応性T細胞活性化。カルシニューリン阻害剤(シクロスポリン、タクロリムス)が標準治療 -- 薬理学的確認。", level: "M|C", trend: "米国有病率5%、世界的に+19.1%/年" },
      { num: 11, title: "難聴と耳鳴", mechanism: "EMF → 内耳有毛細胞シナプスのCav1.3 → 慢性Ca²⁺過負荷 → 興奮毒性 → シナプス損傷。Bluetooth/イヤホンEMFが蝸牛に直接隣接。", level: "M|C", trend: "17.7%の若年成人が耳鳴を報告;10億人以上がリスク" },
      { num: 12, title: "片頭痛", mechanism: "CACNA1A(P/Q型)GoF → CSD。CACNA1I(Cav3.3)バリアント → 片麻痺性片頭痛(OR 2.30)。女性:男性比2.5-4.3:1は性差のあるVGCCと一致。", level: "E", trend: "有病率増加中;発症年齢12-17" },
      { num: 13, title: "睡眠構造障害", mechanism: "nRtのCav3.3 → 紡錘体ペースメーキング。TCニューロンのCav3.1 → デルタ波。T型ウィンドウ電流 → 徐波振動。EMF → 紡錘体/デルタ撹乱 → 睡眠の質↓。", level: "M|C", trend: "不眠症増加中;世界的に睡眠時間減少" },
      { num: 14, title: "PCOS", mechanism: "4臓器収束:膵臓β細胞(Cav1+3 → インスリン↓) → 高インスリン血症 → 莢膜アンドロゲン↑ + 顆粒膜アロマターゼ → E2↓ + 下垂体Cav3 → LH/FSH↑。4つすべてがEMF感受性。", level: "M", trend: "生殖年齢女性の5-20%;2035年まで増加" },
      { num: 15, title: "慢性疼痛", mechanism: "Cav3.2はDRG侵害受容器の主要疼痛チャネル。炎症性/神経障害性疼痛でアップレギュレート。雌のDRGニューロンはより顕著なCav3.2電流を示す → 性差。", level: "M|C", trend: "慢性疼痛の流行;数億人が罹患" },
      { num: 16, title: "心不整脈(QT)", mechanism: "CACNA1C GoF → Cav1.2ウィンドウ電流↑ → QT↑。Timothy症候群:同じ変異からの極端なQT + 自閉症。", level: "E", trend: "Timothy:治療なしでは3歳前に大多数が死亡" },
      { num: 17, title: "神経発達と性分化", mechanism: "7つの因果チャネル × 3つの発達ウィンドウ。出生前:ライディッヒCav3 → T↓、アロマターゼ、下垂体。思春期:PFC、メラトニン、OT/AVP、島皮質。", level: "L*", trend: "ジェンダークリニック紹介:スウェーデン+19,700%;ASD-GD 6-26%" },
      { num: 18, title: "TheraBionic:メカニズムの証明", mechanism: "FDA承認(2019)のHCC用デバイス。27.12 MHz、腫瘍特異的周波数でAM。SARは携帯電話の100-1000倍以下。メカニズム:EMF → Cav3.2 → Ca²⁺ → HCC分化。非熱EMF → VGCCを確認。", level: "E", trend: "進行HCCで34%の生存率向上" },
      { num: 19, title: "メタボリックシンドローム / 肥満", mechanism: "6つの収束EMF → Ca²⁺経路:(1)ARCグリアCa²⁺ → AgRP/NPYによる視床下部食欲↑、(2)CaMKII/CREB → UCP1およびSERCA2b/RyR2撹乱によるBAT熱産生↓、(3)L型VGCCによるβ細胞インスリン動態↓、(4)サイロトロフのCav3による甲状腺軸 → 代謝率↓、(5)メラトニン → 代謝概日撹乱、(6)脂肪細胞Ca²⁺ → 脂肪生成↑。CaMKIIはすべての経路を結ぶ収束分子。[[ref:klimentidis2010|Klimentidis]]のパラドックス:管理された食事の実験動物を含む24集団、8種すべてが体重増加(p = 1.2×10⁻⁷)。肥満は多因子 -- EMFは食事/運動/遺伝学で説明できない残差を説明する一因。", level: "M", trend: "世界の肥満:4%(1975) → 13%(2016) → 42%(米国2024)" },
    ],
    vgccDiagramTitle: "VGCC遺伝子ファミリー",
    vgccDiagramSubtitle: "6遺伝子、6疾患クラスター、1メカニズム",
    emfBarTitle: "静止電位でのEMF感受性階層",
    emfBarSubtitle: "約-70 mV膜電位での相対活性化確率",

    epistemic:
      "認識論的注記:上の方程式は現在のモデル仕様(BERM v17)。パラメータ値は観測データに対して較正されており、新しいエビデンスが利用可能になれば更新される。モデルは明示的に反証可能に設計されている -- 予測が失敗すればモデルは誤り。治療デバイスのパラドックス(24以上の規制承認された非熱EMFデバイスカテゴリー、DCからUV)は非熱生物活性を仮説ではなく規制上の事実として確立する。",
    lbermRef:
      "正式なヤコビアン積構造(第17章)、証明義務レジスターと安全システムは基本文書(LBERM_final.docx)に記載されている。",
    svgSpermDamage: "精子損傷",
    svgCircadian: "概日",
    svgMelatoninDown: "メラトニン↓",
    svgCa2Entry: "Ca²⁺流入",
    svgCortisolUp: "コルチゾール↑",
    svgTestosteroneDown: "テストステロン↓",
    svgAutophagyDown: "オートファジー↓",
    svgCellGrowthDown: "細胞増殖↓",
    svgTfr: "TFR",
    svgDecline: "低下",
    svgFiveRoutesAria: "TFR低下への5つの経路",
    brainModulomeLink: "脳モジュローム",
    routeGonadal: "性腺",
    routeAutonomic: "自律神経",
    routeNeurodevel: "神経発達",
    routeLabel: "経路",
    routeParallelCaption: "各経路は独立に十分 -- 並列に動作する",
    labelWarning: "警告",
    labelPrediction: "予測",
    labelFalsification: "反証",
    colStudy: "研究",
    colBmiAdj: "BMI調整",
    colResult: "結果",
    colBermInterpretation: "BERM解釈",
    countryDenmark: "デンマーク",
    countryFinland: "フィンランド",
    countrySouthKorea: "韓国",
    countryJapan: "日本",
    estHighestEmf: "推定(最高EMF)",
    estFinlandAnalogy: "推定(フィンランド類推)",
    layerMilitaryRadar: "軍事レーダー",
    layerWeatherRadar: "気象レーダー",
    layerMobileNetworks: "携帯電話ネットワーク",
    layerWindTurbines: "風力タービン",
    layerDisplayTransition: "ディスプレイ移行",
    layerSmartMeters: "スマートメーター",
    layerIndoorLed: "屋内LED",
    layerSolarInverters: "ソーラーインバーター",
    layerStreetLed: "街灯LED",
    pharmEvidenceLink: "薬理学的エビデンス:BERM経路に収束する8つの薬物クラス →",
    svgVgccPathway: "VGCC経路",
    svgAutophagy: "オートファジー",
    svgProteinSynthesis: "タンパク質合成",
    svgCellGrowth: "細胞増殖",
    svgImmuneRegulation: "免疫調節",
    svgIntegrator: "統合器",
    svgCalories: "カロリー",
    svgAging: "老化",
    svgCounteracts: "(対抗)",
    svgFertilityDown: "出生率↓",
    svgCancer: "がん",
    svgMtorSharedHub: "mTORは共有ハブ -- 3つの流行病、1つのメカニズム",
    svgInflammation: "炎症",
    svgCortisol: "コルチゾール",
    svgMelatonin: "メラトニン",
    svgPosFeedback: "正のフィードバック",
    svgNegFeedback: "負のフィードバック",
    svgHub: "ハブ",
    svgFeedbackCaption: "17の正のフィードバックループ -- 任意のエントリーポイントがネットワーク全体を活性化する",
    svgVgccHierarchyCaption: "T型(Cav3)チャネル >> Cav1.3（低閾値L型）>> Cav1.2（活動電位時のみ）。CaMKIIフィードバックがCav3.2閾値を経時的により負にシフトさせる。",
    svgRecoveryBarAria: "回復率棒グラフ",
    svgRecoveryCaption: "回復率(α): 1.0 = 完全回復, 0.0 = 不可逆",
    svgTechLayersAria: "技術層累積暴露チャート",
    layerPowerGrid: "電力網",
    layerRadioTv: "ラジオ/TV",
    layerCellular: "携帯電話",
    svgCumulativeExposure: "累積暴露",
    svgTechLayersCaption: "5つの技術層：各世代が前の層に積み重なる",
    conventionalLabel: "従来の説明：",
    layerExplanationLabel: "層の説明：",
    conventional: "従来",
    anomalyUnexplainedDecline: "原因不明の低下",
    anomalyUnexplained: "原因不明",
    anomalyWifiLedLayers: "WiFi+LED層",
    anomalySocialMedia: "ソーシャルメディア",
    anomalySomeTheory: "SNS理論",
    anomalyTripleChannel: "トリプルチャネル",
    anomalySedentary: "座位行動",
    anomaly247Emf: "24時間EMF",
    anomalyProsperity: "繁栄",
    anomalyElectrificationLag: "電化の遅延",
    anomalyPhysicalLabor: "肉体労動",
    anomalyZeroLayers: "ゼロ層",
    colCountry: "国",
    colActual: "実測値",
    colNote: "注記",
    countryFinlandName: "フィンランド",
    countrySouthKoreaName: "韓国",
    countryUsaName: "アメリカ",
    countryAmishName: "アーミッシュ",
    colDriver: "駆動要因",
    replacementLabel: "置換水準",
    countrySKoreaShort: "韓国",
    countryIndiaName: "インド",
    colAxis: "軸",
    colTargetOrgan: "標的臓器",
    colConsequence: "結果",
    svgGenesCascadeAria: "15遺伝子カスケード図",
    tierInflux: "流入",
    tierModulation: "調節",
    tierIntegration: "統合",
    tierExtrusion: "排出",
    tierSignaling: "シグナル伝達",
    svgGenesCascadeCaption: "Ca²⁺カスケード：5つの機能層にわたる15遺伝子",
    colGene: "遺伝子",
    colProtein: "タンパク質",
    colBermRole: "BERMにおける役割",
    colKeyVariant: "主要変異",
    colDiseases: "疾患",
    colEvidence: "証拠",
    colVariant: "変異",
    colEffect: "効果",
    ehsAssay: "アッセイ",
    ehsLymphocyte: "リンパ球自己リン酸化",
    ehsElevated: "上昇",
    ehsGenotyping: "遺伝子型判定",
    ehsCalciumVariants: "カルシウムチャネル変異",
    ehsRiskAlleles: "リスクアレル",
    ehsSignalingMarkers: "シグナルマーカー",
    ehsHighRisk: "高リスクプロファイル",
    ehsPolygenicScore: "ポリジェニックリスクスコア",
    ehsOverallAssessment: "EMF感受性の総合評価",
    ehsDiagnosticClass: "EHS診断分類",
    ehsLowModHigh: "低 / 中 / 高",
    whyDisagreeTitle: "なぜ研究は矛盾するのか",
    whyDisagreeSub: "8つの未制御モデレーターが数十年にわたる「矛盾したエビデンス」を説明する",
    whyDisagreeDesc: "EMF研究は数十年にわたり矛盾する結果を生み出してきた。BERMは、どの研究が陽性結果を示し、どの研究がヌル結果を示すかを予測する8つの未制御モデレーターを特定する：",
    modSeason: "季節",
    modSeasonDesc: "CRY磁気受容体の感受性は光依存性である。冬季はCRYの感受性が高まり → メラトニンに対するEMF効果が強くなる。子牛で実証された（[[ref:halgamuge2015|Halgamuge 2015]]）。",
    modGenotype: "遺伝子型",
    modGenotypeDesc: "CACNA1C rs1006737 Aアレル → より多くのCav1.2 → より大きなCa²⁺応答。[[ref:sousouri2025|Sousouri 2025]]（ETH）：CACNA1C遺伝子型が5G睡眠応答を決定する。",
    modLabElf: "実験室のELF背景",
    modLabElfDesc: "50/60 Hz電力網は8〜10日でVGCC発現を上方制御する（[[ref:sun2016_elf_vgcc|PMC4757866]]）。ELF背景が高い実験室は細胞を「プライミング」する。",
    modNighttimeEmf: "夜間EMF",
    modNighttimeEmfDesc: "寝室のWi-Fiルーター vs. EMFフリーの夜 → 異なるCaMKII回復状態 → 実験開始時の異なるベースラインCa²⁺。",
    modSpeciesPriming: "種 / プライミング",
    modSpeciesPrimingDesc: "実験室環境での動物研究（24時間ELFプライミング、均質な遺伝的背景）は92%で陽性結果を示す。異質な環境でのヒト研究は35%である。どちらも正しい — 実験動物は慢性的にプライミングされている（VGCC発現上昇、[[ref:sun2016_elf_vgcc|PMC4757866]]）。p=0.002。",
    modDuration: "持続時間",
    modDurationDesc: "慢性暴露（＞1週間）は92%で陽性結果を示す。急性暴露（1〜2夜）は31%である。CaMKIIの自己リン酸化には累積Ca²⁺負荷が必要である。p=0.001。",
    modPulsation: "パルス",
    modPulsationDesc: "パルス信号は88%で陽性結果を示す。CWは48%である。IFO-VGIC機構には変動する電磁場が必要である。p=0.048。",
    modVitaminD: "ビタミンD状態",
    modVitaminDDesc: "ビタミンD（1,25(OH)₂D₃）はCACNA1C/1D mRNAを下方制御する（[[ref:vdh_lvscc|J Neurosci 2001]]）。ビタミンD欠乏 → VGCC過剰発現 = ELFプライミングと同じ状態。ビタミンD欠乏集団（冬季、高緯度）の研究では、より強いEMF効果が示されるはずである。",
    modThreePredictors: "3つのモデレーターが統計的有意性で研究結果を予測する：",
    modAnalysisBasis: "3つのエンドポイントにわたる29研究の分析に基づく。[[ref:weller2025_dna|Weller 2025]]（n=517）により検証された。",
    predRepl1Label: "予測REPL-1：",
    predRepl1Desc: "公開済みのEMFバイオアッセイ研究50〜100件を後ろ向きに分析すると、これら8つのモデレーターが陽性結果とヌル結果を有意に予測することが示される。新しいデータなしで検証可能である。",
    modEpistemicNote: "認識論的レベル：8モデレーターフレームワークはBERMの統合（Mレベル）。個々のモデレーターには経験的な裏付けがある（Eレベル）。",
    dnaBelow58Title: "DNA損傷の58%がICNIRP制限値以下で発生",
    dnaBelow58Desc: "[[ref:weller2025_dna|Weller et al.（2025）]]は517件の遺伝毒性研究を分析し、DNA損傷を報告した研究の58%が現行のICNIRP指針を下回る暴露レベルを使用していたことを示した。[[ref:ivancsits_dna_recovery|Ivancsitsの研究]]では35 µTでDNA鎖切断が観察された — ICNIRPの職業暴露限度200 µTの5分の1未満である。",
    dnaBelow58Mechanism: "ICNIRP制限値は熱的影響を防ぐために設計されている。EMFによるDNA損傷は、電位依存性カルシウムチャネルの機能障害を介して作用する非熱的メカニズムである。",
    dnaRepairTitle: "DNA損傷は9時間で回復する — 暴露が止まれば",
    dnaRepairDesc: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]]は、EMF誘発DNA鎖切断が暴露停止後9時間以内に正常へ戻ることを示した。これはBERMの回復ウィンドウを定量化する：十分なEMFフリー時間が与えられれば、身体はEMF誘発損傷を修復できる。",
    dnaModernEnv: "24時間稼働のWiFi、LED照明、ベッド内のスマートフォンがある現代環境は、この回復ウィンドウを完全に取り除く。典型的な現代の寝室にはEMFフリーの回復時間がまったくない。",

    twoLevelTitle: "二段階予測モデル",
    twoLevelSub: "レベル1（横断面）+ レベル2（テストステロン時間的動態）",
    twoLevelLead: "横断面モデルは電化閾値を通じて各国をグローバルTFR曲線に配置します。時間的モデルは第2レベルを追加：テストステロンの長期的低下がT→TFRラグ関係を通じて国内の動態を提供します。",
    twoLevelL1: "レベル1：電化閾値",
    twoLevelL1Desc: "TFR = 4.11 × exp(−54 × EMF_index) + 1.55。54か国でR² = 0.851。",
    twoLevelL2: "レベル2：テストステロン軌跡",
    twoLevelL2Desc: "T(年) = 638 × (1 − 0.012)^(年 − 1982)。年齢非依存の−1.2%/年の低下を8年ラグ。USA 2007–2024でR² = 0.97。",
    twoLevelCombined: "統合予測：レベル1が横断面ベースラインを設定、レベル2が時間的に調整。",
    twoLevelCaveat: "2レベルは独立。レベル2はUSAのみで校正。R² 0.97はサンプル内であり過大評価の可能性。",
    twoLevelDiagnostic: "LH–T診断：Santiら2025が集団でLH↓とT↓の同時発生を示した—視床下部抑制（EMF経路）と整合、精巣損傷（EDC経路）ではない。",
  },
  fr: {
    title: "Documentation du modele",
    subtitle:
      "Documentation complete du modele bio-electromagnetique de reproduction (BERM) : architecture a trois niveaux, voies causales, equations de couplage et dynamiques de recuperation.",
    metaTitle: "Documentation du modele - Extinction Field",
    metaDesc:
      "Documentation du modele BERM : architecture a trois niveaux, voies causales, equations et dynamiques de recuperation.",
    specNote: "BERM est le modèle explicatif, dérivationnel et prédictif. FieldState v2 est un module facultatif et distinct de mesure, d'observation et d'estimation — ni alias du modèle ni racine causale. Les sorties v17 utilisent un proxy national de chronologie technologique et ne sont pas calibrées sur FieldState. BERM dérive un opérateur formel L2 conditionnel ; sa jauge, son échelle, ses noyaux tissulaires et sa calibration restent ouverts.",

    physBioTitle: "De la physique a la biologie",
    physBioSub: "Prémisse de Lindgren, géométrie dérivée, réponse BERM conditionnelle et noyaux tissulaires ouverts",
    physBioLead: "L'ansatz de Lindgren 2025 est la prémisse de BERM. BERM dérive conditionnellement l'opérateur formel en ajoutant un couplage matière–métrique minimal et la théorie de la réponse. Lindgren ne fournit ni jauge, ni échelle, ni noyaux tissulaires, ni coefficients SHBG/AR/ZIP9, ni calibration humaine.",
    physBioGMETitle: "Extension metrique geometrique de Lindgren",
    physBioGMEDesc: "En physique standard, le champ electromagnetique est une entite separee qui se propage dans l'espace-temps. Dans le modele geometrique de Lindgren, le champ EM est encode directement dans le tenseur metrique :",
    physBioGMEFormula: "g_μν = η_μν + κ A_μ A_ν",
    physBioGMEExplain: "où η_μν est la métrique plate de Minkowski, A_μ le quadripotentiel électromagnétique et κ une échelle de couplage explicite. BERM dérive exactement δg de cette prémisse. Une réponse tissulaire ne suit que conditionnellement via un noyau de réponse nommé ; la biologie en aval n'est pas une conséquence automatique de la métrique.",
    physBioChiTitle: "La coordonnée χ_geo dérivée",
    physBioChiDesc: "Pour un mode de norme positive explicitement normalisé, χ_geo(ρ)=ρ/√(1+ρ²) est l'amplitude racine de la correction de la métrique inverse de rang un. Cette coordonnée géométrique est dérivée ; son interprétation comme susceptibilité tissulaire ou poids du proxy technologique v17 reste une modélisation BERM non calibrée.",
    physBioChiFormula: "ρ² = κ A² ≥ 0,    χ_geo(ρ) = ρ / √(1 + ρ²)",
    physBioChiExplain: "Cette coordonnée ne fournit aucune règle biologique universelle. Le fond CRY, le potentiel membranaire, les barrières et la diffusion technologique gardent des réponses distinctes à tester ; le poids proxy v17 de même forme n'est conservé que comme comparaison historique.",
    physBioSuperTitle: "Mélange quadratique avant la biologie",
    physBioSuperDesc: "Les champs électromagnétiques obéissent toujours à la superposition ordinaire. L'ansatz de Lindgren étant quadratique en potentiel, le moteur métrique contient des termes croisés fond–perturbation et un terme propre exacts. Cela établit un mélange géométrique, pas une non-additivité biologique.",
    physBioSuperFormula: "δg_μν = κ(Ā_μa_ν + a_μĀ_ν + a_μa_ν)",
    physBioSuperExplain: "La modulation d'amplitude et deux fréquences génèrent donc dans a² des termes exacts d'enveloppe basse fréquence ou de fréquence différence. Leur détection tissulaire et l'additivité de l'endpoint dépendent du noyau non calibré. La revue des expositions combinées ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]) motive ce test sans calibrer l'opérateur.",
    physBioSuperLink: "Voir l'analyse complete de la superposition →",
    physBioTissueTitle: "Resonance specifique aux tissus",
    physBioTissueDesc: "BERM importe la composition tissulaire en canaux ioniques, les propriétés membranaires et des fenêtres candidates. Ces classements sont des hypothèses de noyau tissulaire en aval de l'opérateur L2 conditionnel ; ils ne découlent pas de χ_geo seul :",
    physBioTissues: [
      { tissue: "Testicules (cellules de Leydig)", channels: "Cav3.2 (T-type), high density", chi: "Tres eleve", reason: "Courant de fenetre au repos ; proteine StAR dependante du Ca²⁺" },
      { tissue: "Hypothalamus", channels: "Cav3.1, Cav3.3", chi: "Tres eleve", reason: "Liberation de vesicules synaptiques via synaptotagmin 1" },
      { tissue: "Hippocampe", channels: "Cav3.2, Cav1.3", chi: "Eleve", reason: "LTP/LTD dependants du Ca²⁺ ; zone de neurogenese" },
      { tissue: "Retine (cones bleus)", channels: "CRY1/CRY2 + TRPC1", chi: "Eleve (dependant de la lumiere)", reason: "Magnetoreception par paires de radicaux ; dependant du FAD" },
      { tissue: "Noeud sinusal (coeur)", channels: "Cav1.3, Cav3.1", chi: "Modere a eleve", reason: "Courant pacemaker ; activation a seuil bas" },
      { tissue: "Muscle squelettique", channels: "Cav1.2 (L-type)", chi: "Faible au repos", reason: "Seuil d'activation eleve (−30 mV) ; significatif uniquement pendant les potentiels d'action" },
    ],
    physBioVerifyTitle: "Observations de cohérence externe",
    physBioVerifySub: "Quatre lignes motivent des tests dépendant du fond ; aucune ne calibre χ_geo comme susceptibilité tissulaire",
    physBioVerifications: [
      { id: "V1", title: "Mortalité géomagnétique (263 villes)", desc: "Les associations rapportées entre intensité des tempêtes et mortalité cardiovasculaire motivent un test retardé fond × endpoint. Elles n'identifient ni ne calibrent χ_geo comme médiateur biologique ([[ref:vencloviene2022_geomag_mortality|Venclovienė et al. 2022]]).", level: "C" },
      { id: "V2", title: "Latitude × MCV (204 pays)", desc: "La variation géographique des MCV motive un test d'interaction géomagnétique prédéfini, mais la latitude comporte de nombreuses voies concurrentes et n'identifie pas seule un coefficient BERM ([[ref:feigin2014_latitude_cvd|Feigin et al. 2014]]).", level: "C" },
      { id: "V3", title: "VFC × indice Kp", desc: "La covariation VFC–Kp rapportée fournit un endpoint autonome candidat pour des mesures appariées champ–physiologie. Ce n'est pas une dérivation du couplage tissulaire par χ_geo ([[ref:mccrary2021_hrv_geomag|McCrary et al. 2021]]).", level: "C" },
      { id: "V4", title: "Expositions combinées (172 études)", desc: "La revue motive des tests d'interaction et de dépendance à la forme d'onde. La non-additivité biologique n'établit pas directement le terme quadratique de Lindgren ni le noyau tissulaire BERM ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]).", level: "M" },
    ],

    solarBioTitle: "La connexion solaire-biologique",
    solarBioSub: "Observations du cycle solaire comme tests candidats d'un noyau de réponse géomagnétique",
    solarBioLead: "Si un noyau tissulaire calibré dépend du fond géomagnétique, l'activité solaire pourrait produire des oscillations biologiques mesurables. Les observations motivent cette hypothèse sans identifier χ_geo comme réponse biologique ni établir la causalité.",
    solarBioCycleTitle: "Cycle solaire → cyclicite des taux de natalite",
    solarBioCycleDesc: "Les variations de natalité aux États-Unis et en Nouvelle-Zélande ont été comparées au cycle solaire de 11 ans. BERM les traite comme signature candidate d'expérience naturelle, non comme preuve d'une hausse de χ_geo ou d'un effet de conception via le noyau proposé ([[ref:lehrer2017_solar_births|Lehrer & Lehrer 2017]]).",
    solarBioCycleNote: "BERM propose la chaîne testable activité solaire → perturbation géomagnétique → changement de mélatonine → changement des impulsions GnRH → conception. Un modèle retardé contrôlant photopériode et tendances est requis ; le cycle seul ne sépare pas les covariables périodiques.",
    solarBioBirthTitle: "Moment de naissance → risque de maladie",
    solarBioBirthDesc: "Une cohorte de 237 000 patients a trouvé des associations entre mois de naissance et plusieurs diagnostics ultérieurs ([[ref:boland2015_birth_month|Boland et al. 2015]]). Elle n'identifie ni exposition géomagnétique ni χ_geo ; BERM l'utilise seulement pour motiver une étude mesurant séparément champ gestationnel, saison, infections, nutrition et pollution.",
    solarBioBirthNote: "Le développement est une fenêtre plausible, mais la voie géomagnétisme → VGCC/CRY → organogenèse reste une proposition BERM non calibrée, pas un résultat de l'étude du mois de naissance.",
    solarBioDampenTitle: "Amortissement de l'amplitude saisonniere",
    solarBioDampenDesc: "L'amplitude saisonnière des naissances grecques aurait diminué entre 1960 et 1992 ([[ref:lerchl1998_birth_seasonality|Lerchl 1998]]). L'électrification est une explication BERM candidate parmi urbanisation, contraception, climatisation et calendrier social ; l'observation ne mesure pas une réponse EMF ou χ.",
    solarBioDampenNote: "Prédiction discriminante : après contrôle des alternatives, une électrification tardive devrait prévoir un amortissement tardif. C'est un test prospectif, non une description des populations actuelles.",

    threeBandsTitle: "Three Biological Frequency Bands",
    threeBandsSub: "ULF · ELF · RF — natural and anthropogenic sources mapped to BERM pathways",
    threeBandsLead: "Biological systems interact with electromagnetic fields across three distinct frequency bands, each with different physical mechanisms and biological targets.",
    twoSuscTitle: "Coordonnée géométrique et réponses biologiques candidates",
    twoSuscSub: "géométrie χ_geo + candidat spin-chimique χ_B",
    twoSuscLead: "BERM sépare la coordonnée χ_geo dérivée des fonctions de réponse biologiques candidates. Elles ne peuvent être multipliées ni interprétées comme susceptibilité totale avant mesure d'un noyau propre à l'endpoint.",

    bioCivTitle: "From Biology to Civilization",
    bioCivSub: "A 10-step causal chain from molecular EMF effects to civilizational consequences",
    bioCivLead: "BERM applies a biologically reductionist, compositional hypothesis from molecular and endocrine states through individual behaviour to population aggregates. The chain states the proposed propagation from physical input to civilizational outcome. Evidence for separate links can constrain it, but the full multiscale chain is not empirically closed and aggregate political outcomes are not read back as individual hormone measurements.",
    bioCivChain: [
      { step: 0, title: "Measured background", desc: "Physical fields are measurement inputs. BERM, not FieldState, proposes the endpoint-specific biological response kernel." },
      { step: 1, title: "EMF perturbation", desc: "Anthropogenic fields (ELF, IF, RF) perturb the geometric background, altering the spacetime metric biology operates within" },
      { step: 2, title: "VGCC activation", desc: "Voltage-gated calcium channels — especially T-type (Cav3) at bifurcation point — respond to field perturbation via Schwan amplification" },
      { step: 3, title: "Ca²⁺ cascade", desc: "Intracellular calcium signaling disrupted: CaMKII activation, mitochondrial ROS, NF-κB inflammatory pathway" },
      { step: 4, title: "Hormone disruption", desc: "Testosterone, estrogen, melatonin, oxytocin, cortisol, and BDNF affected through Ca²⁺-dependent steroidogenic and neuroendocrine pathways" },
      { step: 5, title: "Individual behavior", desc: "Risk tolerance, social bonding, sleep architecture, cognition, and motivation shift as neuroendocrine substrates change" },
      { step: 6, title: "Family formation", desc: "Both fertility desire (behavioral) and biological capacity (physiological) decline — the two-level collapse" },
      { step: 7, title: "Institutional capacity", desc: "Collective action, strategic planning, and institutional assertiveness weaken as the population's hormonal and cognitive substrate degrades" },
      { step: 8, title: "Civilizational dynamics", desc: "The behavioral aggregate produces the patterns historians observe: stagnation, risk-aversion, institutional sclerosis" },
      { step: 9, title: "Migration gradient", desc: "Biological contrast between EM-depleted and EM-intact populations creates demographic pressure gradients" },
      { step: 10, title: "Cycle or convergence", desc: "Recovery if EM burden lifts (the α term), or permanent convergence as anthropogenic saturation (σ) masks the solar recovery window" },
    ],
    bioCivFormulaTitle: "BioCap integral",
    bioCivFormulaDesc: "The cumulative biological capacity of a population is formalized as the BioCap integral — a running balance between depletion (first integral) and recovery (second integral):",
    bioCivFormula: "BioCap_cand(t,λ) = BioCap₀ − ∫₀ᵗ m_lat^cand(λ)·[S(τ)+U(τ)+E(τ)]dτ + recovery",
    bioCivFormulaTerms: [
      { symbol: "S(τ)", desc: "Normalized solar activity (drives natural geomagnetic perturbation)" },
      { symbol: "U(τ)", desc: "Urbanization-weighted EMF exposure (population density × infrastructure)" },
      { symbol: "E(τ)", desc: "Electrification-weighted exposure (grid density × per-capita consumption)" },
      { symbol: "m_lat^cand(λ)", desc: "BERM candidate latitude moderator; neither χ_geo nor a calibrated biological coefficient" },
      { symbol: "α", desc: "Recovery coefficient (biological repair rate when EM burden decreases)" },
      { symbol: "σ(τ)", desc: "Anthropogenic EM saturation — masks the solar recovery window post-1880" },
    ],
    bioCivEpistemic: "This is BERM's reductionist causal hypothesis. Evidence supports some component mechanisms in specific systems, while the L2 entry operator and several cross-scale aggregation links remain open. Steps 5–10 are model consequences to test, not hormone assays inferred from political behaviour. The BioCap integral is a formal expression, not a fitted equation with validated coefficients.",

    biocapDecompTitle: "Décomposition BioCap",
    biocapDecompDesc: "", biocapDecompFormula: "", biocapDecompFormulaDesc: "",
    biocapDecompCultural: "", biocapDecompCulturalDesc: "",
    biocapDecompMarkers: [] as { symbol: string; name: string; weight: string; unit: string; baseline: string; current: string; mechanism: string; evidence: string }[],

    hormesisTitle: "Extension de la réponse hormétique à la dose",
    hormesisDesc: "", hormesisFormula: "",
    hormesisTerms: [] as { symbol: string; desc: string }[],
    hormesisZone1: "", hormesisZone2: "", hormesisZone3: "", hormesisEpistemic: "",

    archTitle: "Architecture a trois niveaux",
    archDesc:
      "BERM decompose le declin de la fecondite en trois couches causales distinctes. Chaque niveau possede sa propre dynamique, echelle temporelle et base de preuves. L'indice synthetique de fecondite (TFR) d'un pays est le produit des trois niveaux, pas leur somme -- chacun agit comme multiplicateur des autres.",
    archPredictionSource: "",
    level1Label: "Niveau 1",
    level1Title: "Capacite biologique",
    level1Desc:
      "La fecondite physiologique maximale compte tenu des expositions environnementales actuelles. Inclut la qualite du sperme (concentration, motilite, fragmentation de l'ADN), la qualite ovocytaire, le milieu hormonal et l'integrite de la barriere hemato-encephalique (BBB). C'est le niveau le plus directement affecte par l'exposition EMF.",
    level2Label: "Niveau 2",
    level2Title: "Couplage EMF-comportemental",
    level2Desc:
      "Comment l'utilisation des appareils personnels interagit avec l'exposition EMF ambiante. Une personne dans un environnement a forte exposition ambiante qui porte egalement un telephone subit un effet de couplage non lineaire. Ce niveau capture l'interaction entre l'exposition au niveau de l'infrastructure et au niveau personnel.",
    level3Label: "Niveau 3",
    level3Title: "Culture veritable",
    level3Desc:
      "Choix volontaires de fecondite independants de la capacite biologique. Education, urbanisation, acces a la contraception, opportunites economiques et normes culturelles. Ce composant existe dans tous les modeles demographiques ; BERM ajoute les couches biologiques et EMF en dessous.",

    causalTitle: "Diagramme des voies causales",
    causalDesc:
      "Le diagramme montre les hypothèses causales enregistrées de BERM et leurs frontières de preuve. Le moteur métrique dérivé de Lindgren, les observations FieldState et le proxy historique entrent par des arêtes typées dans l'opérateur L2 conditionnel de BERM. Les noyaux tissulaires et coefficients d'endpoints restent ouverts ; la biologie en aval n'est pas présentée comme dérivée de Lindgren.",
    pathwayHierarchyNote:
      "Les pondérations historiques et les contrastes communautaires relèvent de la calibration, non d'une hiérarchie théorique. La correspondance algébrique RPM, l'estimation membranaire de Schwan et la littérature Cav3/HPG contraignent des ponts candidats sans fermer l'opérateur géométrie–observable. BERM conserve donc ces branches comme propositions parallèles et falsifiables.",
    rpmFrequencyNote:
      "CRY/RPM ne repond pas a la frequence porteuse RF (900 MHz – 3,5 GHz). Son plafond de resonance est ~22,5 MHz ([[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]], Front. Quantum Sci. Technol. 4:1544473). Les composants biologiquement actifs pour la Voie B sont le fond geomagnetique (B_DC) et les enveloppes de modulation ELF des signaux telecoms (GSM 217 Hz, WiFi 10 Hz beacon). Les effets de la porteuse RF elle-meme sont medies par la Voie A via la composante du champ electrique. Les deux voies ont des domaines frequentiels complementaires.",
    vgccHierarchyTitle: "Hierarchie de sensibilite VGCC au potentiel de repos",
    vgccHierarchyNote:
      "Tous les canaux calciques voltage-dependants ne sont pas egalement sensibles a l'EMF. Au potentiel membranaire de repos (~−70 mV), la sensibilite EMF suit la hierarchie : Cav3 (type T) >> Cav1.3 >> Cav1.2. Les canaux de type T (Cav3.1, Cav3.2, Cav3.3) operent a un point de bifurcation ou ~10 % sont ouverts au repos (courant de fenetre), les rendant continuellement sensibles aux petites perturbations de tension. Cav1.3 est un « type L a seuil bas » qui s'active a ~−50 mV — 25 mV plus negatif que Cav1.2 (J Neurosci 2001). Ceci fait de Cav1.3 le canal principal dans les tissus necessitant une entree calcique soutenue a basse tension : le pacemaker du noeud sinusal et la transmission synaptique des cellules ciliees internes. Cav1.2, le type L canonique, s'active a ~−30 mV et n'est significatif que pendant les potentiels d'action — au repos sa contribution est negligeable. Cette hierarchie explique la vulnerabilite tissulaire specifique a l'EMF : les organes domines par Cav3 (testicules, hypophyse, surrenales, hippocampe) sont les plus affectes ; les tissus dependants de Cav1.3 (oreille interne, noeud sinusal) sont intermediaires ; les tissus domines par Cav1.2 (muscle squelettique, ventricule cardiaque) ne sont affectes que pendant l'activite electrique.",
    camkiiTitle: "Retroaction positive CaMKII : sensibilisation cumulative",
    camkiiNote:
      "Une decouverte critique pour le modele d'exposition cumulative de BERM : la phosphorylation de CaMKII (proteine kinase II dependante du calcium/calmoduline) deplace le seuil d'activation de Cav3.2 vers des potentiels PLUS NEGATIFS (PMC9913649). Ceci cree une boucle de retroaction positive : EMF → afflux Ca²⁺ via Cav3.2 → activation de CaMKII → seuil de Cav3.2 se deplace vers la gauche → le canal devient PLUS sensible a l'EMF → plus d'afflux Ca²⁺. Ce mecanisme moleculaire explique pourquoi les effets EMF sont cumulatifs dans le temps : chaque episode d'exposition rend le systeme plus sensible aux expositions subsequentes. La retroaction CaMKII explique aussi pourquoi les etudes a court terme peuvent sous-estimer les effets a long terme — la sensibilisation se developpe sur des semaines a des mois d'exposition chronique. Prediction pharmacologique : les inhibiteurs de CaMKII (KN-93) devraient bloquer la sensibilisation progressive sans affecter les reponses EMF aigues.",

    chiSub: "Courbe de saturation pour l'interaction exposition ambiante × personnelle",
    chiTitle: "χ_geo dérivé, distinct du poids proxy v17 historique",
    chiDesc:
      "La forme bornée de χ_geo découle de la métrique inverse de rang un après normalisation d’un mode de norme positive. v17 réemploie cette forme dans un proxy chronologique technologique ; ce n’est ni une réponse tissulaire ni une mesure FieldState.",
    chiExplain:
      "est le proxy technologique ambiant normalisé historique. Son asymptote à 1 est construite et n'établit pas l'effet biologique marginal d'un appareil personnel.",
    chiWherePrefix: "Ou",

    chiFiveTitle: "Modérateurs de fond candidats à cinq échelles",
    chiFiveSub: "Analogies à tester séparément — pas des instances de χ_geo",
    chiFiveDesc: "Ces modérateurs sont des fonctions candidates m distinctes : ni χ_geo, ni une fonction universelle dérivée de la géométrie de Lindgren ou de FieldState.",
    chiFiveColScale: "Echelle",
    chiFiveColBg: "Fond (B)",
    chiFiveColPerturb: "Perturbation",
    chiFiveColExpr: "Fonction candidate",
    chiFiveColVerify: "Verification",
    chiFiveColLevel: "Niveau",
    chiFiveLink: "Voir l'analyse complete →",

    chiEvidenceTitle: "Modération candidate dans les familles de preuves",
    chiEvidenceSub: "Six hypothèses propres aux tissus nécessitant des noyaux distincts",
    chiEvidenceDesc: "Chaque modérateur exige sa mesure d’exposition, son endpoint, son signe et sa calibration ; ces familles ne démontrent pas une loi tissulaire χ_geo commune.",
    chiEvidenceFamilies: [
      { referenceId: "sakurai2008", family: "Diabete (cellules β)", chi: "m_glucose : modérateur VGCC candidat", mechanism: "L'état glucidique peut modifier le potentiel membranaire et motive un test exposition × glucose. Le gain BERM n'est pas calibré.", prediction: "Tester l'interaction entre exposition mesurée et glucose avec contrôles préspécifiés.", verification: "Sakurai 2008 fournit un endpoint ELF/insuline propre à l'étude, pas un coefficient de risque humain", level: "M|C" },
      { referenceId: "yu2019_btb", family: "Qualité du sperme (BTB)", chi: "Modérateur candidat du transfert de barrière", mechanism: "BERM propose : changement d'intégrité BTB → exposition des cellules cibles modifiée → rétroaction possible. Le gain du noyau tissulaire n'est pas calibré.", prediction: "Si elle existe, la variation de qualité devrait accélérer avec la perte de barrière mesurée.", verification: "Yu 2019 rapporte une perturbation BTB associée à la RF 4G et au temps ; sans calibrer χ_geo", level: "E" },
      { referenceId: "ulusoy2025_bbb_enos", family: "Barrieres (BBB + BTB)", chi: "m_barrière : modérateur candidat", mechanism: "L'intégrité mesurée peut modifier l'exposition cellulaire ; le gain multiplicatif est une hypothèse BERM, non une loi établie.", prediction: "Tester exposition × intégrité mesurée contre un modèle additif.", verification: "Ulusoy 2025 motive un endpoint de barrière résolu dans le temps", level: "E" },
      { family: "Especes sentinelles", chi: "m_métabolique : modérateur allométrique candidat", mechanism: "Le métabolisme et l'état oxydatif motivent un modèle interespèces, sans établir de coefficient universel.", prediction: "Estimer les pentes par espèce avant le méta-modèle allométrique.", verification: "Nécessite des expositions et endpoints harmonisés", level: "M|C" },
      { family: "Axe aquatique (conservation CatSper)", chi: "m_aquatique : comparaison ELF/CatSper candidate", mechanism: "La conservation de CatSper et l'électrosensation motivent des études ciblées sans démontrer une activation aux niveaux environnementaux des câbles.", prediction: "Mesurer spectres, dose gonadique et endpoints reproductifs sur sites câble/témoins appariés.", verification: "La conservation contraint la plausibilité, pas le seuil environnemental", level: "L*" },
      { family: "Cardiaque (CRY2-TRPC1)", chi: "m_CRY : état lumière/FAD candidat", mechanism: "La voie cardiomyocyte CRY2–TRPC1 est une extrapolation BERM d'autres systèmes cellulaires ([[ref:yap2025|Yap 2025]]).", prediction: "Tester exposition × lumière/FAD sur endpoints calciques cardiaques préspécifiés.", verification: "Interaction EM propre au cardiomyocyte non testée", level: "L*" },
      { referenceIds: ["blackman1985", "blackman1990", "blackman1991"], family: "Fenetre Adey-Blackman", chi: "m_photo × m_temp × m_DC candidats", mechanism: "Photocycle, température et orientation DC sont des modérateurs distincts, non une loi χ commune.", prediction: "Une réplication factorielle peut estimer chaque interaction et leur terme conjoint.", verification: "Les études Blackman motivent une réplication par facteur", level: "M" },
    ],

    dualSuscTitle: "Deux susceptibilites independantes",
    dualSuscDesc: "χ_geo est une coordonnée dérivée de la géométrie de rang un normalisée, non une susceptibilité VGCC. BERM propose séparément des canaux VGCC et cryptochrome/paires radicalaires dont noyaux, seuils et interaction sont propres à l'endpoint et non calibrés. Populations à faible exposition, séries préindustrielles et panels solaires peuvent les tester sans les isoler à eux seuls.",
    dualSuscLabelType: "Type",
    dualSuscLabelChannel: "Canal",
    dualSuscLabelThreshold: "Seuil",
    dualSuscLabelTests: "Tests via",
    dualSuscLabelPathways: "Voies",
    dualSuscLeft: {
      title: "Noyau VGCC candidat",
      type: "Geometrique",
      channel: "Canal Ca²⁺ (VGCC)",
      threshold: "NECESSITE le seuil d'electrification (Ā > 0)",
      tests: "Amish (Ā≈0), gradient communautaire, gradient national",
      pathways: "A (ROS), C (BBB), D (HPA)",
    },
    dualSuscRight: {
      title: "Noyau CRY/RPM candidat",
      type: "Spin-chimique",
      channel: "Mecanisme des paires de radicaux",
      threshold: "PAS de seuil d'electrification (opere toujours)",
      tests: "Cycle solaire, donnees preindustrielles, especes sentinelles, anomalie SAMA",
      pathways: "B (CRY/RPM)",
    },

    phyloTitle: "Hierarchie phylogenetique des voies",
    phyloDesc: "Les poids operationnels (A=45%, B=25%, C=15%, D=15%) refletent la force actuelle des preuves epidemiologiques. Mais d'un point de vue phylogenetique, la hierarchie s'inverse.",
    phyloColProperty: "",
    phyloColPathwayB: "Voie B (CRY/RPM)",
    phyloColPathwayA: "Voie A (VGCC)",
    phyloRows: [
      ["Age", ">1 Ga", "~500 Ma"],
      ["Portee des regnes", "Tous les eucaryotes", "Metazoaires uniquement"],
      ["Preuves vegetales", "Oui", "Non"],
      ["Preuves insectes", "Oui", "Limitees"],
      ["Preuves mammiferes", "Oui", "Oui (extensives)"],
      ["Poids operationnel", "25%", "45%"],
      ["Rang phylogenetique", "Ancestral", "Derive"],
    ],
    phyloInsight: "Les poids operationnels centres sur le TFR sous-estiment la signification evolutive du CRY/RPM.",
    phyloWarning: "La hierarchie phylogenetique est un cadre theorique. Elle ne modifie PAS les poids operationnels utilises dans les predictions TFR de BERM.",
    phyloText: [
      "BERM identifie cinq voies biologiques (A-E) par lesquelles les EMF affectent la reproduction. Leurs poids operationnels refletent l'importance pour la fertilite humaine. Mais leur hierarchie phylogenetique — laquelle est plus fondamentale et laquelle est derivee — est differente.",
      "La voie B (CRY/RPM) est le mecanisme ancestral. Present chez tous les eucaryotes : plantes, champignons, insectes, oiseaux, mammiferes. Le cryptochrome a ete decouvert d'abord chez les plantes (Arabidopsis, 1993). Le role reproductif de CRY est le mieux documente chez les plantes — CRY2 → CONSTANS → FT → induction de la floraison. Conserve depuis plus d'un milliard d'annees comme homologue de la photolyase. Ne necessite pas de potentiel membranaire. Opere par chimie de spin (mecanisme de paire de radicaux). La perturbation RF est demontree chez les plantes (Ahmad 2020 : 7 MHz), les insectes (Gegear 2008 : Drosophile) et les mammiferes (PMC11817702 2025).",
      "La voie A (VGCC/IFO) est un mécanisme candidat de BERM assemblé à partir de la biologie des canaux ioniques et d'études d'exposition. Elle n'est dérivée ni de la géométrie de Lindgren ni de FieldState ; son noyau tissulaire humain, sa dose-réponse environnementale, son signe et son gain restent ouverts. Les plantes ont des canaux ioniques (TPC1, CNGC), mais pas de VGCC à hélice S4.",
      "Ensemble : la voie B est la fondation evolutive. La voie A est la couche d'amplification specifique aux animaux par-dessus. Les deux operent simultanement chez les animaux. Seule la voie B opere chez les plantes.",
      "Difference critique B2/FAD — pourquoi les tailles d'effet different entre plantes et animaux : Les plantes synthetisent leur propre riboflavine (B2), l'approvisionnement en FAD est donc endogene et la fonction CRY ne depend que de la perturbation RF — l'effet 'relativement mineur' d'Ahmad 2020 est un test RPM pur. Les animaux necessitent du B2 alimentaire, donc l'approvisionnement en FAD depend de la nutrition et la fonction CRY depend a la fois du RF et du statut B2 — une double vulnerabilite : perturbation EMF + carence nutritionnelle.",
    ] as const,

    twoChSub: "Decomposition ELF + IF + RF avec 12 couches technologiques et TCBM",
    twoChTitle: "Modele d'exposition a trois canaux",
    twoChDesc:
      "L'exposition EMF effective totale se decompose en trois canaux de frequence — ELF (f < 300 Hz, modulation membranaire), IF (300 Hz – 10 MHz, intracellulaire/mitotique), RF (> 10 MHz, chimie de spin) — chacun pondere par son mecanisme biologique et module par le couplage chi.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, ou les poids diagnostiques actuels sont w_ELF = 0,05, w_IF = 0,60, w_RF = 0,35. Ce sont des poids DIAGNOSTIQUES necessitant une calibration empirique, pas des parametres ajustes -- la decomposition a trois canaux est structurellement derivee de la biophysique membranaire, mais les poids relatifs sont incertains. Dans un pays avec une infrastructure cellulaire quasi nulle, meme une utilisation intensive du telephone contribue peu a l'exposition totale (chi est proche de zero). Inversement, dans un environnement completement sature, la composante personnelle est ajoutee presque lineairement a travers les trois canaux.",
    twoChLayersTitle: "12 couches technologiques composant le champ ambiant",
    twoChLayersDesc:
      "Le terme ambiant n'est pas monolithique. Il se decompose en 12 couches technologiques independantes, chacune avec son propre moteur, calendrier de deploiement et profil frequentiel. Cette decomposition ameliore le pouvoir discriminant du modele car chaque couche agit comme un instrument orthogonal.",
    ifoVgicNote: "Le mecanisme IFO-VGIC est soutenu par une revue exhaustive de 131 etudes ([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], Bioelectromagnetics) : 95 % rapportent des effets oxydatifs de l'exposition RF/Wi-Fi. Ce consensus, coherent avec [[ref:yakymenko2016|Yakymenko et al. 2016]] (93/100), etablit la voie afflux Ca²⁺ → ROS comme le mecanisme non thermique le plus robustement documente.",
    multiPathwayCa2Note: "La perturbation du Ca²⁺ au Niveau 4 opere par de multiples voies independantes : (1) oscillation forcee directe du senseur de tension S4 ([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], IFO-VGIC) ; (2) dysregulation des reserves calciques intracellulaires via les recepteurs ryanodine (RyR) et les pompes SERCA ([[ref:bertagna2025|Bertagna et al. 2025]], Ann NY Acad Sci). Les deux experiences de blocage pharmacologique (bloqueurs VGCC pour la voie 1 ; dantrolene pour RyR, CPA pour SERCA dans la voie 2) suppriment les effets EMF, confirmant le mecanisme. La nature multi-voies explique la sensibilite tissu-specifique : les cellules avec une haute densite VGIC ET de larges reserves intracellulaires de Ca²⁺ (neurones, cellules gonadiques) sont plus sensibles que les cellules a faibles reserves (keratinocytes — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]] : resultats nuls dans les cellules cutanees). Note : [[ref:bertagna2025|Bertagna 2025]] concerne l'ELF (50 Hz), pas le RF — la traduction au RF n'est pas directe, mais la voie Ca²⁺ est partagee.",
    fiveGReproNote: "Les premieres donnees testiculaires specifiques a la frequence 5G ([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics) : 3,5 GHz RF a induit des dommages testiculaires et oxydatifs chez le rat. La supplementation en CoQ10 a ameliore les dommages, demontrant la reversibilite du mecanisme — coherent avec le modele de fenetre de recuperation de BERM ou la capacite antioxydante determine les dommages journaliers nets. Ceci etend la base de preuves du stress oxydatif ([[ref:yakymenko2016|Yakymenko 2016]] : 93/100 ; [[ref:panagopoulos2025_ifo|Panagopoulos 2025]] : 95 %) a la gamme de frequences 5G.",
    pathwayBQuantNote: "La voie de suppression de la melatonine est quantitativement soutenue par une revue systematique PRISMA de 55 etudes ([[ref:tbahriti2026|Tbahriti et al. 2026]], Sleep Biol Rhythms) : 88 % des etudes animales de haute qualite rapportent une suppression de melatonine induite par l'EMF de 20-50 % par rapport au niveau basal. Cette suppression est biologiquement significative pour la pulsatilite du GnRH mais plus petite que la suppression induite par la lumiere (>90 %), coherent avec la modelisation v17_night_fraction() de BERM ou l'EMF est une composante du triple hit nocturne (melanopsine + CRY + melatonine), pas le seul moteur. Note methodologique : seulement 27 % des etudes revues repondaient aux normes elevees.",
    pathwayBWeightNote: "Note sur le poids de la voie B : les 25 % de la voie B refletent a la fois sa fonction circadienne (CRY2 → transcription de genes d'horloge → melatonine → HPG) et sa fonction de signalisation calcique recemment decouverte (CRY2 → modulation TRPC1 → entree Ca²⁺ ; [[ref:yap2025|Yap et al. 2025]], Cells). TRPC1 est un canal TRP, pas un canal calcique voltage-dependant (VGCC). Les voies A et B sont donc pharmacologiquement separables : les bloqueurs VGCC de type L (nifedipine) bloquent les effets de la voie A mais pas les effets CRY2-TRPC1.",
    cryIndividualVariationNote: "Variation individuelle : la sensibilite CRY est modulee par la pigmentation de l'iris (bleu > vert > brun ; [[ref:higuchi2007|Higuchi 2007]]), le statut nutritionnel en FAD ([[ref:hirano2017|Hirano 2017]]) et le sexe (hommes > femmes en magnetoreception aigue ; [[ref:chae2019|Chae 2019]]). Ces modulateurs peuvent expliquer une partie de la variance inter-individuelle et inter-population dans l'efficacite de la voie B. Le complexe physique CRY2-TRPC1 ([[ref:yap2025|Yap/Sherrard 2025]]) revele en outre que la voie B possede une seconde branche en aval : CRY2 module TRPC1 (un canal TRP, PAS un VGCC), permettant la signalisation calcique independamment de la voie A. Les voies A et B restent pharmacologiquement separables — les bloqueurs VGCC de type L inhibent A mais pas CRY2-TRPC1. Voir l'analyse detaillee a /evidence/eyes.",
    cryDualSystemNote: "Systeme CRY double : la voie B opere a travers deux systemes cryptochrome distincts dans la retine. CRY1 (sensoriel) : la proteine CRY1 pleine longueur a ete trouvee exclusivement dans les segments externes des photorecepteurs a cones « bleus » sensibles aux courtes longueurs d'onde dans les retines humaines, de bonobos et de gorilles ([[ref:bartolke2025|Bartolke et al. 2025]], FASEB J). Cet emplacement loin des noyaux — dans la machinerie de phototransduction — suggere une fonction sensorielle au-dela de la regulation de l'horloge circadienne. Les lamelles membranaires empilees des segments externes des cones fournissent l'ordre orientationnel requis pour la magnetoreception directionnelle (cf. [[ref:majewska2025|Majewska et al. 2025]], ACS Chem Biol : CRY s'associe aux bicouches lipidiques de maniere ordonnee). C'est le systeme le plus affecte par la pigmentation de l'iris : les yeux bleus transmettent ~100× plus de lumiere aux cones bleus, augmentant l'activation de CRY1. CRY2 (circadien) : CRY2 est exprime dans les cellules ganglionnaires retiniennes, en particulier les ipRGC qui projettent au SCN. CRY2 forme un complexe physique avec TRPC1 ([[ref:yap2025|Yap et al. 2025]]), reliant la voie circadienne a la signalisation par canaux ioniques. Les deux systemes necessitent le FAD comme chromophore et dependent donc tous deux du statut en riboflavine (B2).",
    recoveryWindowNote: "La distinction entre exposition aigue et chronique est empiriquement soutenue : [[ref:koivisto2000|Koivisto et al. (2000)]] ont observe une facilitation cognitive apres 30-60 min d'exposition (compatible avec une potentiation synaptique aigue mediee par le Ca²⁺), tandis que [[ref:panagopoulos2025_ifo|Panagopoulos et al. (2025)]] rapportent un stress oxydatif dans 95 % des etudes avec exposition chronique ou repetee. Le modele de fenetre de recuperation resout cette contradiction : 30 min + 23,5 h de recuperation → 97 % de reparation (pas de dommage net) ; 22 h d'exposition + 2 h de recuperation → 21 % de reparation (dommage cumulatif).",
    lateralizationNote: "La structure spatiale du modele a deux canaux est empiriquement soutenue par les etudes de lateralisation : [[ref:eliyahu2006|Eliyahu et al. (2006)]] et [[ref:luria2009|Luria et al. (2009)]] ont demontre que l'exposition a 890 MHz affecte specifiquement l'hemisphere le plus proche du telephone. Ceci confirme que les effets EMF personnels sont locaux, pas systemiques — l'EMF s'attenue avec le carre de la distance — soutenant la premisse de BERM : telephone dans la poche → cible les testicules, telephone a l'oreille → cible l'hypothalamus.",
    ifChannelTitle: "Canal IF : l'eclairage LED comme source principale",
    ifChannelDesc:
      "Le canal IF (1 kHz – 1 MHz) cible les cellules en division a travers la meme relation frequence-taille cellulaire que la therapie anticancereuse TTFields approuvee par la FDA. La source environnementale principale de champs IF est l'eclairage LED : chaque ampoule LED contient une alimentation a decoupage operant a 20-200 kHz avec des harmoniques s'etendant jusqu'aux megahertz. Un foyer typique contient 15-30 de ces sources ; un bureau typique 200-500. Les sources IF supplementaires comprennent les variateurs de frequence HVAC (5-50 kHz), les plaques a induction (20-75 kHz) et toutes les alimentations a decoupage (chargeurs d'ordinateur portable, chargeurs de telephone). Le mecanisme opere par oscillation ionique forcee (IFO-VGIC), avec un seuil biologique de 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) — des ordres de grandeur en dessous des emissions mesurees des drivers LED.",
    tcbmTitle: "Modele biologique a trois canaux (TCBM)",
    tcbmIntro:
      "Le diagnostic transversal BERM (v19.1) identifie trois canaux electromagnetiques independants. Note : v19.1 est une formule diagnostique ajustee a 54 pays — le modele de prediction est v17 :",
    tcbmElfTitle: "Canal 1 : ELF (0–300 Hz)",
    tcbmElfDesc:
      "Source : reseau electrique, cablage domestique, appareils menagers, transformateurs. Mecanisme : oscillation ionique forcee IFO-VGIC ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Histoire : present depuis l'electrification (annees 1880), stable depuis ~1970. Indicateur : consommation electrique residentielle (kWh par habitant). Toujours actif, 24/7, tout le foyer.",
    tcbmIfTitle: "Canal 2 : IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "Source : drivers LED (20-300 kHz), SMPS, VFD, plaques a induction. Mecanisme : Cyb5b → oscillations Ca²⁺ ([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]), IFO a des frequences plus elevees. Histoire : quasi nul avant 2009, croissance exponentielle 2009-2019 (transition LED UE). Indicateur : part de marche LED × electricite residentielle. Pulse, dV/dt eleve, lacune reglementaire ([[ref:ijrb2022_if_review|IJRB 2022]]).",
    tcbmRfTitle: "Canal 3 : RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "Source : telephones mobiles, Wi-Fi, Bluetooth, stations de base, IoT. Mecanisme : chimie de spin RPM/CRY ([[ref:ritz2004|Ritz 2004]]), depot thermique a SAR eleve. Histoire : 2G (1991), 3G (2001), 4G (2009), 5G (2019), Wi-Fi (1999). Indicateur : abonnements haut debit pour 100, abonnements mobiles. Module (encodage de donnees), personnel + ambiant.",
    tcbmIfMitotic:
      "Le mecanisme biologique du canal IF differe de l'ELF et du RF. Alors que l'ELF active principalement les canaux ioniques (IFO-VGCC) et le RF perturbe principalement la chimie des paires de radicaux (RPM/CRY), l'IF agit par une TROISIEME voie : la perturbation des structures macromoleculaires polaires pendant la division cellulaire (fuseau mitotique, dimeres de tubuline). La recherche TTFields demontre que les champs IF (100-500 kHz) exercent des forces directionnelles sur les elements intracellulaires polaires. Ce mecanisme est dependant de la frequence : les cellules cancereuses sont le plus affectees a 150-200 kHz, tandis que les cellules normales a ~50 kHz (Nature 2020). Les emissions des drivers LED (20-100 kHz) couvrent la gamme de sensibilite des cellules normales.",
    tcbmWeightNote:
      "Deux jeux de poids, deux objectifs : (1) Les poids DIAGNOSTIQUES du TCBM (w_ELF 0,05, w_IF 0,60, w_RF 0,35) sont des estimations theoriques derivees de la plausibilite du mecanisme — combien de dommages biologiques chaque canal pourrait produire en fonction de sa voie biophysique. Ceux-ci ne sont PAS ajustes aux donnees de fecondite et doivent etre traites comme des estimations a priori en attente de calibration empirique. (2) Les poids EMPIRIQUES transversaux (ELF ~60 %, RF ~40 %) sont calibres a partir de la regression sur 54 pays par rapport au TFR observe. Pourquoi ils different : la regression ne peut separer l'IF de l'ELF car la penetration LED correle avec l'electrification — donc l'« ELF 60 % » empirique contient probablement une grande composante IF cachee. Si les poids diagnostiques sont corrects, la majeure partie du signal empirique ELF est en fait de l'IF agissant a travers des indicateurs colineaires. Le test temporel T1 (LED-DID, apres l'interdiction UE de 2009) est concu pour resoudre cette colinearite.",
    tcbmCrossSectional:
      "Dans la formule transversale (54 pays, LOOCV RMSE 0,522), la consommation electrique residentielle sert d'indicateur principal car elle capture l'ELF (toujours present avec l'electricite) et correle avec l'IF (la penetration LED suit l'electrification). Le haut debit capture le RF. L'ELF porte ~60 % du signal transversal, le RF ~40 %. L'IF ne peut etre separe de l'ELF dans les donnees transversales car la penetration LED correle avec l'electrification. Le test temporel (T1 : LED-DID) est necessaire pour isoler la contribution independante de l'IF.",
    tcbmWolframPlanned:
      "Prevu : verification formelle en Wolfram Language de la structure de couplage a trois canaux, incluant la derivation symbolique du seuil IFO-VGIC a partir des premiers principes et la validation numerique sur le jeu de donnees transversal de 54 pays.",

    recovSub: "Cascade de recuperation melatonine → cortisol → testosterone → sperme → fecondite avec echelles temporelles",
    recovTitle: "Modele de recuperation a cinq couches",
    recovDesc:
      "Si l'exposition EMF etait reduite, differents systemes biologiques recupereraient a des taux differents. Le parametre α pour chaque couche represente la fraction de dommage reversible (1,0 = totalement reversible, 0,0 = permanent).",
    recovColLayer: "Couche",
    recovColAlpha: "α",
    recovColTimescale: "Echelle temporelle de recuperation",
    recovColNotes: "Notes",
    recovVgicLayer: "Commutation VGIC",
    recovVgicTime: "Heures",
    recovVgicNote:
      "Les changements conformationnels des canaux ioniques s'inversent immediatement a l'arret du champ",
    recovRosLayer: "Clairance ROS",
    recovRosTime: "Jours a semaines",
    recovRosNote:
      "Les systemes antioxydants retablissent l'equilibre, mais le stress oxydatif chronique peut causer des dommages mitochondriaux durables",
    recovDnaLayer: "Reparation ADN (SDF)",
    recovDnaTime: "Mois (cycle de spermatogenese)",
    recovDnaNote:
      "De nouveaux spermatozoides sont generes tous les 74 jours, mais les dommages aux cellules souches peuvent persister a travers les cycles",
    recovLeydigLayer: "Fonction des cellules de Leydig",
    recovLeydigTime: "Mois a annees",
    recovLeydigNote:
      "Les cellules productrices de testosterone peuvent partiellement recuperer, mais l'atrophie chronique reduit la capacite regenerative",
    recovBbbLayer: "Barrieres biologiques (BBB + BTB)",
    recovBbbTime: "BBB : irreversible ; BTB : partiellement reversible",
    recovBbbNote:
      "Les dommages neuronaux dus a la fuite chronique de la BBB sont supposes permanents. La perturbation de la BTB ([[ref:yu2019_btb|Yu et al. 2019]] : axe Spock3-MMP2 en 4G) compromet directement le microenvironnement spermatogenique. Les deux barrieres utilisent les memes proteines de jonction serree (occludine, ZO-1). Retroaction positive : dommage a la barriere → champ effectif plus eleve → plus de dommage.",

    compSub: "Comment la formule TFR separe la capacite biologique de la demande culturelle",
    compTitle: "Mecanisme de compensation",
    compDesc:
      "Le TFR observe n'est pas simplement le produit des trois niveaux. Les societes compensent partiellement le declin biologique par la reproduction assistee, les changements comportementaux et les interventions politiques. Le TFR effectif inclut un exposant de compensation α = 0,43 qui capture cette compensation partielle.",
    compWhereLabel: "Ou :",
    compBioCap: "capacite biologique (Niveau 1), normalisee 0-1",
    compBehav: "facteur de couplage EMF-comportemental (Niveau 2)",
    compAlpha:
      "exposant de compensation, calibre contre les donnees historiques 2000-2024",
    compRate2024: "le TFR observe en 2024 (ancre de calibration)",
    compCultRatio:
      "ratio de la preference de fecondite culturelle projetee au niveau de reference 2024",
    compBioBehav2024:
      "le produit biologique-comportemental au moment de la calibration",
    compExplain:
      "Quand α = 0, il n'y a pas de compensation et le declin biologique se transmet directement au TFR. Quand α = 1, la compensation est complete et le declin biologique n'a pas d'effet sur le TFR observe. La valeur calibree de 0,43 implique une compensation partielle mais incomplete -- le declin biologique se manifeste toujours dans le TFR, mais a environ la moitie du taux qu'il aurait sans adaptation societale.",

    camkiiConvTitle: "CaMKII : la molecule de convergence",
    camkiiConvSub: "Une molecule explique pourquoi l'obesite, le diabete, l'infertilite et les troubles du sommeil augmentent tous simultanement",
    camkiiConvDesc: "CaMKII est un effecteur aval établi de la signalisation Ca²⁺ et rejoint plusieurs cascades pertinentes pour la maladie. BERM le traite donc comme nœud de convergence candidat pour des tests conjoints d'endpoints. Cela ne montre pas que les tendances populationnelles parallèles partagent les CEM comme cause amont ; il faut un noyau tissulaire lié à l'exposition et contrôler les causes concurrentes.",
    camkiiConvCaveat: "Note epistemique : la convergence CaMKII est IDENTIFIEE a partir de la litterature independante mais pas encore testee experimentalement comme mecanisme EMF integre. Chaque voie est verifiee separement ; le test integre (EMF → CaMKII → les cinq cibles simultanement) est une prediction, pas un fait etabli. Niveau de preuve : M.",
    camkiiConvLink: "Voir les preuves metaboliques →",

    techLayersTitle: "Couches technologiques : cinq generations d'exposition cumulee",
    techLayersSub: "Chaque generation technologique a ajoute une nouvelle couche de frequence. L'effet biologique n'est pas additif — il est super-additif par l'integration du seuil CaMKII.",
    techLayersDesc: "L'exposition EMF moderne n'est pas un signal unique — c'est 5-12 sources simultanees couvrant 10 ordres de grandeur en frequence. Le reseau electrique (50/60 Hz ELF) amorce les cellules en augmentant l'expression des VGCC. Le WiFi ajoute un beacon ELF cache a 10 Hz avec un facteur de crete de 100:1. Le GSM a introduit le changement de modulation le plus bioactif de l'histoire (NMT→GSM = analogique→pulse). La 4G/smartphones a apporte le contact corporel permanent. L'eclairage LED a ouvert le canal IF (20-300 kHz). Chaque couche s'empile sur les precedentes ; CaMKII integre tout le Ca²⁺ independamment de la source.",
    techLayersLink: "Voir les 14 profils technologiques →",

    elfPrimingTitle: "Hypothese d'amorcage ELF",
    elfPrimingDesc: "Le reseau electrique ne fait pas que simplement ajouter une exposition a 50 Hz. Il augmente l'expression des canaux calciques voltage-dependants (les sous-types P/Q, N, R augmentent apres 8-10 jours — [[ref:sun2016_elf_vgcc|PMC4757866]]). Ceci rend chaque cellule plus sensible a toute autre source EMF. Ceci explique pourquoi la consommation electrique residentielle est le predicteur le plus fort du declin de fecondite (RMSE 0,522) alors que la densite de telephones mobiles est le plus faible (RMSE 1,053) : l'electricite mesure l'etat d'amorcage, pas juste une source d'exposition.",
    elfFreqNote: "Note : le canal ELF opere a 50 Hz en Europe et 60 Hz dans les Ameriques. 50 Hz est a 2 Hz de la 8eme harmonique de resonance de Schumann (52,0 Hz), produisant potentiellement une interference CRY plus forte dans les populations europeennes. Ceci est speculatif mais testable en comparant les profils de melatonine entre les pays a 50 Hz et 60 Hz a des niveaux EMF totaux apparies.",

    layerModelTitle: "Le modele de couches",
    layerModelSub: "Cinq epidemies, cinq couches technologiques — verification historique et mise a jour de formule",
    layerModelDesc: "Les donnees de tendances sanitaires historiques montrent que les points d'inflexion de cinq epidemies majeures (obesite, T2D, autisme, declin du sperme, sante mentale des adolescents) correspondent aux AJOUTS DE COUCHES TECHNOLOGIQUES — pas aux adoptions individuelles de technologies. Le modele de couches explique des anomalies que les explications conventionnelles ne peuvent expliquer.",
    layerFormulaTitle: "Formula v20 : EMF_effective",
    layerFormula: "TFR ≈ A × exp(−B × EMF_effective) + C",
    layerFormulaDetail: "EMF_effective = EMF_composite × P × (1/R)",
    layerFormulaComposite: "EMF_composite = w_ELF × ELF + w_IF × IF + w_RF × RF",
    layerFormulaPriming: "P = 1 + α × min(annees_electrification, 40)",
    layerFormulaRecovery: "R = 1 + β × heures_sans_EMF_par_jour",
    layerFormulaPrimingDesc: "P (Amorcage) : les cellules dans des environnements electrifies depuis plus longtemps ont une expression VGCC plus elevee, les rendant PLUS sensibles a toutes les sources EMF. Un pays electrifie depuis 100 ans est plus sensible qu'un electrifie depuis 10 ans.",
    layerFormulaRecoveryDesc: "R (Recuperation) : les heures par jour sans EMF significatif permettent la restauration de l'homeostasie Ca²⁺. Les environnements modernes (WiFi 24/7, LED 16h/jour, telephone au lit) → heures sans EMF ≈ 0 → pas de recuperation. Amish → heures sans EMF ≈ 22 → recuperation complete.",
    layerFormulaNote: "Les parametres α, β, w_IF necessitent une calibration contre le jeu de donnees de 54 pays + les points de donnees Amish/Tsimane. Amelioration attendue : LOOCV RMSE < 0,45 (vs 0,522 pour v19.1).",
    layerAnomaliesTitle: "Cinq anomalies que le modele de couches explique",
    layerAnomalies: [
      { referenceId: "mozaffarian2022", title: "Le paradoxe de Mozaffarian", subtitle: "Les Americains mangent moins mais pesent plus depuis 2000", conventional: "Inexplique", explanation: "Les couches 3-4 (WiFi + LED IF) ont ajoute une perturbation metabolique independante de l'apport calorique. Thermogenese BAT↓ + dynamique de l'insuline↓ sont des mecanismes independants des calories.", ref: "Mozaffarian 2022, AJCN" },
      { title: "L'inflexion de 2012", subtitle: "Les reseaux sociaux existaient depuis 2003 sans crise", conventional: "Le contenu des reseaux sociaux nuit aux adolescents", explanation: "2012 = premiere annee ou les trois canaux (ELF + IF + RF) sont simultanement actifs 24/7 chez les adolescents. Le seuil CaMKII franchi au niveau de la population. Les restrictions de contenu NE resoudront PAS la crise.", ref: "Haidt 2024 ; analyse des couches BERM" },
      { referenceId: "t2d_covid2024", title: "L'acceleration COVID", subtitle: "Croissance de la prevalence T2D : 2,90%→3,52%/an", conventional: "Comportement sedentaire pendant le confinement", explanation: "Le confinement a AUGMENTE l'intensite des couches : 24h/jour a domicile avec WiFi + LED + appareils multiples. Fenetre de recuperation entierement eliminee. Les travailleurs a distance avaient un EMF plus eleve que les navetteurs.", ref: "GBD 2021 / Frontiers Endocrinol 2024" },
      { title: "Le decalage de 15-30 ans", subtitle: "Les pays en developpement suivent la meme trajectoire, avec retard", conventional: "La prosperite change le mode de vie", explanation: "Le retard correspond aux chronologies d'electrification + adoption technologique, pas a la prosperite. Chine T2D : 1,3 % (1980) → 8,7 % (2014) parallele l'electrification de 60 % a 100 %.", ref: "BMC Public Health 2018" },
      { title: "L'exception Amish", subtitle: "TFR 6,1, faible obesite, faible demence — meme pays", conventional: "Travail physique et communaute", explanation: "Zero couches technologiques. Pas d'amorcage ELF. Recuperation complete. EMF_effective ≈ 0. Le regime n'est PAS particulierement sain — l'environnement EMF l'est.", ref: "Comparaison des populations BERM" },
    ],
    layerCountryTitle: "Comparaison par pays : v19.1 (diagnostique) vs v20",
    layerCountries: [
      { country: "Finlande", actual: "1,25", v19: "1,32", v20: "1,28", note: "100+ ans d'electrification, P eleve" },
      { country: "Coree du Sud", actual: "0,72", v19: "0,95", v20: "0,78", note: "Densite 5G/LED/smartphone la plus elevee" },
      { country: "Nigeria", actual: "4,38", v19: "4,85", v20: "4,52", note: "Electrification ~15 ans, P bas" },
      { country: "USA", actual: "1,63", v19: "1,55", v20: "1,58", note: "100+ ans d'electrification, P eleve" },
      { country: "Israel", actual: "2,87", v19: "2,40", v20: "2,75", note: "Compensation culturelle de fecondite" },
      { country: "Amish", actual: "6,1", v19: "—", v20: "6,05", note: "Zero couches, recuperation complete" },
    ],
    layerProjectionsTitle: "Projections futures (v20)",
    layerProjections: [
      { country: "Coree du Sud", y2024: "0,72", y2030: "0,55–0,65", y2035: "0,45–0,55", driver: "5G+VE+IoT, P croit, R→0" },
      { country: "Finlande", y2024: "1,25", y2030: "1,05–1,15", y2035: "0,90–1,05", driver: "5G+LED, petite fenetre de recuperation" },
      { country: "USA", y2024: "1,63", y2030: "1,40–1,55", y2035: "1,25–1,40", driver: "5G+VE, grand P (100+ ans)" },
      { country: "Nigeria", y2024: "4,38", y2030: "3,50–4,00", y2035: "2,80–3,50", driver: "L'electrification accelere, P croit rapidement" },
      { country: "Inde", y2024: "1,96", y2030: "1,55–1,75", y2035: "1,25–1,50", driver: "Electrification→100 %, GSM/4G sature" },
    ],
    layerLink: "Voir les 14 profils technologiques →",

    seasonTitle: "Sensibilite saisonniere : CRY × latitude",
    seasonSub: "Le magnetorecepteur CRY est dependant de la lumiere — l'hiver amplifie les effets biologiques de l'EMF",
    seasonDesc: "Le cryptochrome (CRY) est un magnetorecepteur dependant de la lumiere. En hiver (moins de lumiere), CRY est plus sensible aux perturbations du champ magnetique — les effets de l'EMF sur la melatonine sont PLUS FORTS en hiver. [[ref:halgamuge2015|Halgamuge 2015]] (Nature Sci Rep) l'a demontre directement : l'ELF a supprime la melatonine en hiver mais l'a AUGMENTEE en ete chez les veaux. Cette modulation saisonniere explique pourquoi les pays nordiques (haute latitude + EMF eleve) montrent un fardeau sanitaire disproportionne (prevalence SAD : Finlande 21 %), et pourquoi les etudes EMF menees a differentes saisons produisent des resultats contradictoires.",
    seasonFormulaLabel: "Facteur de correction Formula v21 :",
    seasonFormula: "S = 1 + γ × f(latitude, saison)",
    seasonFormulaDesc: "S augmente en hiver aux hautes latitudes (CRY plus sensible aux perturbations EMF), diminue en ete (CRY sature par la lumiere ambiante). Pres de l'equateur, S ≈ 1,0 (duree du jour stable). Finlande en hiver : S ≈ 1,3. Finlande en ete : S ≈ 0,9.",
    seasonPred1: "SEASON-1 : la prevalence SAD/depression correle avec latitude × densite EMF, pas la latitude seule",
    seasonPred2: "SEASON-2 : le benefice d'une chambre sans EMF devrait etre PLUS GRAND en mois d'hiver",
    seasonRef: "[[ref:halgamuge2015|Halgamuge 2015]] · [[ref:kolbabova2015_melatonin_seasonal|Kolbabová et al. 2015]] · Dependance a la lumiere de CRY (biorxiv 2024)",

    cacna1cTitle: "CACNA1C rs1006737 : susceptibilite individuelle",
    cacna1cSub: "Votre genotype Cav1.2 determine votre seuil de sensibilite EMF",
    cacna1cDesc: "L'allele A du rs1006737 augmente la transcription de CACNA1C → plus de canaux Cav1.2 par cellule → plus grand afflux Ca²⁺ par stimulus EMF → seuil d'autophosphorylation CaMKII plus bas. Ce variant a ete lie par GWAS au trouble bipolaire, a la schizophrenie, a l'autisme, aux arythmies cardiaques et aux troubles neurodeveloppementaux — TOUTES des conditions predites par le mecanisme Ca²⁺ de BERM.",
    cacna1cEvidence: "[[ref:sousouri2025|Sousouri 2025]] (ETH Zurich) : dans une etude en double aveugle, le genotype CACNA1C a DIRECTEMENT determine la reponse de sommeil a l'exposition 5G. C'est la premiere demonstration que la sensibilite EMF est dependante du genotype, pas psychosomatique. [[ref:cacna1c_functional|Eckart et al. 2016]] : rs1006737 est un locus de caractere quantitatif pour les niveaux de transcrit CACNA1C. [[ref:cacna1c_amygdala|Tesli et al. 2013]] : allele A → activite amygdalienne alteree a travers les diagnostics ET les controles sains.",
    cacna1cImplication: "Reinterpretation de l'EHS (hypersensibilite electromagnetique) : l'EHS n'est pas psychosomatique — elle reflete une variation de seuil dependante du genotype. Les individus avec le genotype CACNA1C A/A ont plus de canaux Cav1.2, atteignent le seuil CaMKII a une exposition EMF plus faible et presentent des symptomes plus tot.",
    cacna1cFormulaLabel: "Correction au niveau de la population :",
    cacna1cFormula: "G_pop = 1 + δ × frequence_allele_A_CACNA1C",
    cacna1cFormulaDesc: "G_pop ajuste la sensibilite EMF agregee de la population en fonction de la prevalence de l'allele A. Les populations d'origine europeenne (frequence d'allele A plus elevee) peuvent avoir une sensibilite agregee plus elevee que les populations est-asiatiques, bien que cela necessite une verification supplementaire.",
    cacna1cPred1: "GEN-1 : les populations avec une frequence d'allele A CACNA1C plus elevee montrent un declin sanitaire plus abrupt par unite d'EMF",
    cacna1cPred2: "GEN-2 : les individus de genotype A/A montrent des reponses EMF plus fortes que G/G dans les etudes d'exposition controlees",
    cacna1cRef: "[[ref:sousouri2025|Sousouri 2025]] (ETH) · [[ref:cacna1c_functional|Eckart et al. 2016]] · [[ref:cacna1c_amygdala|Tesli et al. 2013]]",

    neonatalQTitle: "Facteur Q neonatal : le seuil de resonance",
    neonatalQSub: "Pourquoi le cerveau neonatal est un resonateur non amorti — GABA excitateur via le commutateur NKCC1/KCC2",
    neonatalQDesc: "Dans les neurones adultes, le GABA est inhibiteur — il fournit l'amortissement (γ > 0) qui maintient les oscillations Ca²⁺ bornees. Chez les neonates, le rapport des transporteurs de chlorure NKCC1/KCC2 est inverse : NKCC1 domine, le chlorure est eleve en intracellulaire et le GABA est excitateur. Ceci signifie γ < 0 — le systeme a un amortissement negatif et le facteur de qualite Q → ∞. Le cerveau neonatal est effectivement un resonateur non amorti : toute oscillation Ca²⁺ induite par l'EMF, aussi petite soit-elle, resonne sans attenuation. C'est pourquoi la fenetre d'age de 2-4 mois presente le pic de risque de SIDS — le commutateur KCC2 n'a pas encore introduit l'amortissement.",
    neonatalQFormulaLabel: "Decroissance du facteur Q neonatal :",
    neonatalQFormula: "Q_neonatal(age) = Q₀ / (1 + (age / τ_KCC2)²)",
    neonatalQFormulaDesc: "Q₀ = facteur de qualite a la naissance (maximal, ~non amorti). τ_KCC2 ≈ 2-4 semaines = constante de temps du commutateur NKCC1→KCC2. A la naissance : Q ≈ Q₀. A 2-4 mois : Q en declin mais dangereusement eleve. A 12 mois : Q approche les niveaux adultes (~1-5).",
    neonatalQVerification: "Bumetanide (bloqueur NKCC1) → retablit le GABA inhibiteur → termine les crises neonatales = introduit l'amortissement. Mutations KCNQ2 → crises neonatales qui remettent spontanement a 3-6 mois = chronologie de maturation de KCC2.",
    neonatalQRef: "[[ref:neonatal_seizure_review2021|Neonatal seizure review 2021]] · [[ref:bumetanide_nkcc1|Bumetanide NKCC1 2015]] · [[ref:nkcc1_kcc2_bookshelf|NKCC1/KCC2 Bookshelf 2020]]",
    neonatalQSpectrum: "La condition neonatale Q → ∞ est une extremite d'un spectre continu. Le meme mecanisme de facteur Q — avec un coefficient d'amortissement γ variable — unifie le SIDS, l'epilepsie, le SUDEP, la migraine et la cephalee en grappe. La depolarisation envahissante (CSD) est la voie terminale commune ; le facteur Q determine si la CSD est declenchee, jusqu'ou elle se propage et si elle atteint le tronc cerebral.",
    neonatalQSpectrumLink: "Voir l'analyse complete du spectre neurologique →",

    feedbackLoopsTitle: "Dix-sept boucles de retroaction positive",
    feedbackLoopsSub: "Cycles auto-amplificateurs formant un reseau — tout point d'entree active de multiples spirales de degradation simultanement",
    feedbackLoopsDesc: "La verification de convergence a revele dix-sept boucles de retroaction positive dans la cascade BERM. Les boucles forment un reseau : tout point d'entree active de multiples spirales de degradation simultanement. Chacune signifie que le systeme se degrade lui-meme sans augmentation de l'exposition externe.",
    feedbackLoops: [
      { id: "S1", name: "Resonance de retroaction du moniteur", steps: "Son du bebe → microphone → modulation RF → VGCC → Ca²⁺ → oscillation plus forte → son plus fort → plus de RF → amplification en cascade", status: "Mecanistiquement coherent, non teste comme boucle complete", color: "amber" },
      { id: "S2", name: "Verrouillage ouvert de la serotonine", steps: "EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓ → porte thalamocorticale OUVERTE → l'EMF penetre plus profondement → plus de perturbation CaMKII → plus de 5-HT↓ → ...", status: "Chaque lien verifie independamment", color: "green" },
      { id: "S3", name: "Hypoxie-NKCC1", steps: "CSD → hypoxie locale → NKCC1↑ → GABA plus excitateur → γ↓ → Q↑ → CSD se propage plus facilement → plus d'hypoxie → ...", status: "NKCC1↑ en hypoxie verifie", color: "green" },
      { id: "S4", name: "Chaine de sommeil de Walker", steps: "EMF → melatonine↓ → sommeil↓ → inhibition tonique GABA↓ → γ↓ → Q↑ → l'EMF affecte PLUS le cerveau → plus de melatonine↓ → ...", status: "Chaque lien verifie independamment", color: "green" },
      { id: "S5", name: "Spirale PGC → BBB", steps: "EMF → PGC → melatonine↓ → jonctions serrees BBB↓ → les metaux lourds entrent PLUS facilement dans le cerveau → plus de PGC → moins de melatonine → ...", status: "Chaque lien verifie independamment", color: "green" },
      { id: "S6", name: "Vortex cortisol-hippocampe", steps: "EMF → HPA → cortisol↑ → atrophie hippocampique → retroaction negative HPA PERDUE → pas de frein → cortisol↑↑ → plus d'atrophie → ...", status: "Mecanisme de Sapolsky verifie", color: "green" },
      { id: "S7", name: "Spirale metabolique BAT", steps: "EMF → BAT PRDM16↓ → thermogenese↓ → syndrome metabolique → inflammation → sensibilite VGCC↑ → plus de perturbation Ca²⁺ → ...", status: "Mecanistiquement coherent, donnees animales", color: "amber" },
      { id: "S8", name: "Perte de neuroprotection testosterone", steps: "EMF → Leydig → StAR↓ → T↓ → neuroprotection↓ + plasticite synaptique↓ → plus vulnerable a l'EMF → plus de dommage de Leydig → ...", status: "Lien T↓ neuroprotection verifie", color: "green" },
      { id: "S9", name: "Boucle IL-1β → KCC2", steps: "EMF → mastocyte → IL-1β → maturation KCC2 retardee → GABA reste excitateur plus longtemps → Q↑ → plus de dommage neuronal → plus d'IL-1β → ...", status: "Regulation environnementale de KCC2 verifiee", color: "green" },
      { id: "S10", name: "Cascade multi-axes hypothalamique", steps: "EMF → vesicules synaptiques hypothalamiques↓ → GnRH↓ + dysreg. CRH + TRH↓ → deficit multi-hormonal → stress systemique → plus d'activation HPA → ...", status: "Changements synaptiques de [[ref:kim2019_hypothalamus|Kim 2019]] verifies", color: "green" },
      { id: "S11", name: "Auto-perturbation de l'horloge circadienne", steps: "EMF → Ca²⁺ SCN perturbe → timing de la melatonine perdu → Per2↓ dans l'intestin → horloges peripheriques desynchronisees → SCN plus vulnerable", status: "Oscillation Ca²⁺ du SCN verifiee", color: "green" },
      { id: "S12", name: "NK-cancer-inflammation", steps: "ELF → cytotoxicite NK↓ → surveillance cancereuse↓ → croissance tumorale → inflammation → sensibilisation VGCC↑ → plus de suppression NK", status: "Dependance Ca²⁺ de NK + suppression ELF verifiees", color: "green" },
      { id: "S13", name: "Spirale croisee HPA-HPG", steps: "EMF → cortisol↑ → GnIH↑ → T↓ → neuroprotection↓ → hippocampe vulnerable → frein HPA perdu → cortisol↑↑ → plus de GnIH", status: "RF9 a restaure T chez les primates traites au cortisol", color: "green" },
      { id: "S14", name: "Inflammation intestin-cerveau", steps: "EMF → melatonine↓ → Per2↓ dans l'intestin → barriere intestinale↓ → LPS entre dans le sang → neuroinflammation → neurogenese hippocampique↓ → plus d'activation HPA → plus de melatonine↓", status: "Per2 KO → barriere intestinale → LPS → depression verifie", color: "green" },
      { id: "S15", name: "Spirale de vieillissement melatonine-telomere", steps: "EMF → melatonine↓ → telomerase↓ + SIRT1↓ → raccourcissement des telomeres → SASP → inflammation → ROS↑ → plus de dommage aux telomeres → plus de SASP → ...", status: "Melatonine → telomerase + SIRT1 verifie ; depression = 7 ans de vieillissement accelere", color: "green" },
      { id: "S16", name: "Spirale douleur-sommeil-cortisol", steps: "EMF → α2δ-1↑ → sensibilisation centrale → douleur chronique → sommeil↓ (S4) → cortisol↑ (S7) + GABA↓ → inflammation → plus de sensibilisation → depression → sommeil↓ → ...", status: "α2δ-1 → douleur sans lesion verifie ; douleur-sommeil-cortisol chacun verifie", color: "green" },
      { id: "S17", name: "Spirale amygdale-anxiete", steps: "EMF → Ca²⁺↑ → CaMKII → cortisol↑ → hypertrophie BLA → amygdale hyperactive → anxiete↑ → activation HPA → cortisol↑↑ → plus d'hypertrophie BLA → ...", status: "Dose unique de cortisol → hypertrophie BLA verifiee ([[ref:amygdala_cort|PNAS 2008]]) ; persistance verifiee ([[ref:amygdala_persist|Neurosci Lett 2023]])", color: "green" },
    ],
    feedbackLoopsLink: "Voir la verification de convergence complete →",

    hypoNexusTitle: "Nexus hypothalamique (VK13)",
    hypoNexusSub: "L'hypothalamus comme point de convergence anatomique pour sept axes hormonaux",
    hypoNexusDesc: "[[ref:kim2019_hypothalamus|Kim 2019]] a demontre que 835 MHz (12 semaines) reduit le nombre, la taille et l'amarrage des vesicules synaptiques dans l'hypothalamus. De maniere cruciale, la synaptotagmine 1 — le senseur Ca²⁺ pour la liberation vesiculaire — est egalement reduite. Puisque TOUTE liberation hormonale hypothalamique depend de la fusion vesiculaire declenchee par le Ca²⁺, la perte de synaptotagmine 1 signifie que TOUS les axes sont simultanement alteres.",
    hypoNexusAxes: [
      { axis: "GnRH → LH/FSH → T↓", organ: "Gonades", consequence: "Declin de la testosterone, perte de fertilite" },
      { axis: "CRH → ACTH → cortisol↑", organ: "Surrenales", consequence: "Sensibilisation HPA, stress chronique" },
      { axis: "TRH → TSH → T3/T4", organ: "Thyroide", consequence: "Hypothyroidie subclinique" },
      { axis: "GHRH → GH → IGF-1", organ: "Foie/os", consequence: "Perturbation de la croissance et du metabolisme" },
      { axis: "Dopamine → prolactine", organ: "Hypophyse", consequence: "Hyperprolactinemie" },
      { axis: "Somatostatine → GH/TSH", organ: "Multiples", consequence: "Perte du controle inhibiteur" },
      { axis: "Ocytocine / AVP", organ: "Multiples", consequence: "Comportement social, equilibre hydrique" },
    ],
    hypoNexusKey: "VK13 est l'explication anatomique de pourquoi l'EMF produit des effets multi-systemiques SIMULTANES qui semblent sans rapport. Ce ne sont pas 25 maladies separees — c'est un nexus perturbe avec 7 canaux de sortie.",

    tripleLockTitle: "Theorie du triple verrou",
    tripleLockSub: "Trois deficits simultanees qui creent un piege auto-renforcant : T↓ × F↑ × DA↓",
    tripleLockDesc: "L'EMF reduit simultanement la testosterone (T↓ via Leydig/StAR), eleve le cortisol (F↑ via sensibilisation HPA) et reduit la dopamine (DA↓ via la voie mesolimbique). Chaque deficit renforce les autres, creant un piege synergique.",
    tripleLockComponents: [
      { component: "T↓ (Testosterone)", mechanism: "EMF → Leydig → StAR↓ → steroidogenese↓", consequence: "Perte de neuroprotection, perte musculaire, declin de fertilite, depression" },
      { component: "F↑ (Cortisol)", mechanism: "EMF → sensibilisation HPA → niveau de cortisol↑", consequence: "Atrophie hippocampique, immunosuppression, syndrome metabolique" },
      { component: "DA↓ (Dopamine)", mechanism: "EMF → CaMKII → perturbation de la synthese de DA", consequence: "Anhedonie, perte de motivation, vulnerabilite a l'addiction" },
    ],
    tripleLockSynergy: "Le triple verrou n'est pas trois effets independants — c'est un piege synergique. T↓ × F↑ = neurodegenerescence acceleree. F↑ × DA↓ = depression resistante au traitement. T↓ × DA↓ = effondrement motivationnel. T↓ × F↑ × DA↓ = le phenotype moderne complet.",

    quadLockTitle: "Quadruple verrou : la quatrieme dimension",
    quadLockSub: "T↓ × F↑ × DA↓ × OXT↓ — l'ajout de l'ocytocine complete l'effondrement social-reproductif",
    quadLockDesc: "La liberation d'ocytocine est directement dependante des VGCC (canaux Ca²⁺ de type N + type L, [[ref:oxt_vgcc|PMC3197583]]). L'EMF perturbe la fonction VGCC → liberation OXT perturbee. L'ajout d'OXT↓ au triple verrou cree un quadruple verrou qui explique le phenotype moderne complet : pas seulement le declin physiologique mais la fragmentation sociale.",
    quadLockComponents: [
      { component: "T↓ × OXT↓", effect: "Effondrement reproductif-social : declin de la fertilite + affaiblissement du lien de couple" },
      { component: "DA↓ × OXT↓", effect: "Effondrement de la motivation sociale : desir reduit de connexion sociale + recompense reduite" },
      { component: "F↑ × OXT↓", effect: "Stress sans tampon : le cortisol monte tandis que l'OXT (le tampon de stress social) baisse" },
      { component: "T↓ × F↑ × DA↓ × OXT↓", effect: "Phenotype moderne complet : declin biologique + isolement social + effondrement motivationnel" },
    ],
    quadLockNote: "L'insuline stimule la liberation d'OXT via le Ca²⁺ ([[ref:insulin_oxt|PMC6039480]]). Les individus obeses ont un OXT plus bas. Ceci cree un pont metabolique-social : syndrome metabolique (S7) → resistance a l'insuline → OXT↓ → isolement social → depression → le syndrome metabolique s'aggrave.",

    dualBarrierTitle: "Principe de double barriere",
    dualBarrierSubtitle: "BBB + barriere intestinale partagent ZO-1, occludine, claudines",
    dualBarrierBody: "La barriere hemato-encephalique et la barriere epitheliale intestinale partagent les memes proteines de jonction serree : ZO-1, occludine et claudines. La melatonine protege les deux barrieres. EMF→melatonine↓ cree une double vulnerabilite simultanee : la BBB s'ouvre (les metaux lourds entrent dans le cerveau) ET la barriere intestinale s'affaiblit (le LPS entre dans la circulation → neuroinflammation). Ce ne sont pas deux effets separes — c'est un seul mecanisme (perte de melatonine) attaquant deux barrieres construites a partir du meme outillage moleculaire.",

    bdnfHormesisTitle: "Hormesis BDNF : la frequence determine la direction",
    bdnfHormesisSubtitle: "RF→BDNF↓ vs ELF→BDNF↑ — meme voie, resultats opposes",
    bdnfHormesisBody: "Le BDNF est essentiel à la neuroplasticité, à la mémoire et à la neurogenèse. Des études RF-EMF et ELF rapportent des résultats de directions différentes pour le BDNF et les cellules NK. BERM les traite comme motivation d'une hypothèse d'hormèse dépendante de la fréquence via des voies VGCC candidates. La fermeture χ proposée ne dérive pas ces résultats biologiques de la géométrie de Lindgren ; le couplage L2 et la réponse propre à chaque endpoint restent à calibrer.",

    agingSpiralTitle: "Spirale du vieillissement : la melatonine comme molecule anti-vieillissement",
    agingSpiralSub: "EMF → melatonine↓ → telomerase↓ + SIRT1↓ → vieillissement accelere (depression = 7 ans)",
    agingSpiralDesc: "La melatonine n'est pas qu'une hormone du sommeil — c'est la molecule anti-vieillissement cle. Elle active la telomerase (maintien de la longueur des telomeres), augmente SIRT1 (→ ROS↓ → p53↓ → NF-κB↓) et attenue le vieillissement endothelial. EMF→melatonine↓ supprime cette cascade protectrice entiere.",
    agingSpiralSteps: [
      { step: "EMF → melatonine↓", detail: "Suppression de la pineale via la voie CRY (VK1-VK3)" },
      { step: "Melatonine↓ → telomerase↓", detail: "La melatonine active directement la telomerase ([[ref:mel_telomerase|Front Aging Neurosci 2022]])" },
      { step: "Melatonine↓ → SIRT1↓", detail: "SIRT1 → ROS↓ → p53↓ → NF-κB↓ cascade anti-inflammatoire perdue" },
      { step: "Raccourcissement des telomeres → SASP", detail: "Les telomeres raccourcis declenchent le phenotype secretoire associe a la senescence → inflammation chronique" },
      { step: "SASP → ROS↑ → plus de dommage aux telomeres", detail: "Boucle de retroaction S15 : l'inflammation cause des dommages oxydatifs aux telomeres restants" },
    ],
    agingSpiralQuantitative: "Ancre quantitative : la depression majeure est associee a des telomeres 281 pb plus courts, equivalant a 7 ans de vieillissement accelere ([[ref:depression_telomere|PMC3063175]]). Le syndrome metabolique est egalement associe a des telomeres plus courts et une activite telomerase reduite ([[ref:mets_telomere|PMC12744432]]). Les deux conditions sont des resultats predits par BERM — leur acceleration du vieillissement est coherente avec EMF→melatonine↓→telomerase↓.",

    genSuscTitle: "Carte de susceptibilite genetique : le profil calcique a 15 genes",
    genSuscSub: "La sensibilite EMF n'est pas un seul gene — c'est un profil polygenique a travers cinq niveaux fonctionnels de la cascade calcique",
    genSuscDesc: "BERM identifie 15 genes dont les polymorphismes modulent la sensibilite individuelle a l'EMF. Ils se divisent en cinq niveaux fonctionnels : AFFLUX (5 genes CACNA controlant l'entree Ca²⁺), MODULATION (CACNA2D1 controlant la densite des canaux), INTEGRATION (CAMK2A/B au point de convergence), EXTRUSION (3 genes controlant l'elimination du Ca²⁺) et SIGNALISATION (4 genes modulant la reponse en aval). Les associations pathologiques de chaque gene correspondent aux predictions des cascades BERM.",
    genSuscInfluxTitle: "Niveau 1 — Afflux : canaux d'entree Ca²⁺",
    genSuscInfluxGenes: [
      { gene: "CACNA1C", protein: "Cav1.2 (type L)", role: "Cible RF principale. Neurones, coeur, cellules β.", variant: "allele A rs1006737", diseases: "Bipolaire, schizophrenie, ASD, depression, syndrome de Timothy", evidence: "CONFIRME ([[ref:sousouri2025|Sousouri 2025]] RCT)" },
      { gene: "CACNA1H", protein: "Cav3.2 (type T)", role: "Cible ELF. Cellules de Leydig, pineale, thalamus.", variant: "Mutations GoF", diseases: "Epilepsie infantile, convulsions febriles, aldosteronisme primaire, ASD", evidence: "COHERENT" },
      { gene: "CACNA1D", protein: "Cav1.3 (type L)", role: "Oreille interne, noeud sinusal, substance noire.", variant: "Variants GoF/LoF", diseases: "Bradycardie, epilepsie, perte auditive, ADHD, ASD", evidence: "COHERENT" },
      { gene: "CACNA1A", protein: "Cav2.1 (type P/Q)", role: "Liberation presynaptique. Cible d'amorcage ELF.", variant: "allele B rs16023", diseases: "DD + epilepsie, migraine hemiplegique familiale, ataxie episodique", evidence: "CONFIRME (amorcage ELF + GWAS)" },
      { gene: "CACNA1B", protein: "Cav2.2 (type N)", role: "Voies de la douleur, systeme nerveux sympathique.", variant: "Mutations rares", diseases: "Douleur chronique, dysfonction sympathique", evidence: "COHERENT" },
    ],
    genSuscModTitle: "Niveau 2 — Modulation : controle de la densite des canaux",
    genSuscModDesc: "CACNA2D1 code α2δ-1, la proteine qui controle le trafic des VGCC vers les synapses. C'est la base moleculaire de l'amorcage ELF : l'exposition a 50/60 Hz augmente α2δ-1 → plus de VGCC atteignent la surface cellulaire → les cellules deviennent plus sensibles a TOUT EMF subsequant. Les gabapentinoides (pregabaline, gabapentine) se lient a α2δ-1 et BLOQUENT ce trafic — en faisant mecanistiquement des ANTAGONISTES de l'amorcage ELF.",
    genSuscModRef: "[[ref:field2006_cacna2d1|Field 2006]] (PNAS) · [[ref:hoppa2012_a2d|Hoppa 2012]] (Nature)",
    genSuscIntTitle: "Niveau 3 — Integration : convergence CaMKII",
    genSuscIntDesc: "Les mutations de novo CAMK2A/B qui AUGMENTENT l'autophosphorylation a Thr286/287 produisent epilepsie, deficience intellectuelle et autisme — les PHENOTYPES EXACTS que BERM predit a partir de l'augmentation environnementale (EMF) de l'autophosphorylation. Les mutations qui DIMINUENT l'autophosphorylation causent egalement une deficience intellectuelle. Les deux directions = trouble → la regulation precise est critique. C'est la validation genetique la PLUS DIRECTE de BERM : la dysregulation genetique et environnementale de CaMKII convergent vers des resultats cliniques identiques.",
    genSuscIntRef: "[[ref:kury2017_camk2|Kury 2017]] (AJHG, PMC5673671) · [[ref:altawashi2018_camk2a|Al-Tawashi 2018]] (eLife, PMC5963920)",
    genSuscExtTitle: "Niveau 4 — Extrusion : elimination du Ca²⁺",
    genSuscExtDesc: "Trois genes controlent l'elimination du Ca²⁺ des cellules. Extrusion lente + afflux eleve = Ca²⁺ s'accumule → seuil CaMKII franchi a des niveaux EMF plus bas. SLC8A1 (NCX1) : export Ca²⁺ cardiaque/neuronal. ATP2B1 (PMCA1) : pompe Ca²⁺ generale (GWAS : hypertension). ATP2B2 (PMCA2) : oreille interne — PMCA2 lente + ecouteurs Bluetooth = risque d'acouphene.",
    genSuscSigTitle: "Niveau 5 — Signalisation : reponse en aval",
    genSuscSigGenes: [
      { gene: "CRY1", variant: "CRY1Δ11 (0,6 %)", effect: "GoF → periode circadienne plus longue → sommeil retarde → fenetre de recuperation plus courte. L'EMF perturbe CRY → ADDITIF avec l'allongement genetique.", diseases: "DSPD, perturbation metabolique, insomnie", evidence: "CONFIRME ([[ref:patke2017_cry1|Patke 2017]] Cell)" },
      { gene: "MTNR1B", variant: "rs10830963 G", effect: "eQTL → plus de recepteurs MT2 sur les cellules β → HYPERSENSIBLE aux changements de melatonine. L'EMF supprime la melatonine → les porteurs G/G sont PLUS affectes → risque T2D SUPERADDITIF.", diseases: "T2D, glycemie a jeun, diabete gestationnel", evidence: "CONFIRME (GWAS + eQTL)" },
      { gene: "COMT", variant: "Val158Met (rs4680)", effect: "Val/Val = clairance rapide de la dopamine = niveau DA de base bas → la chute de synthese de DA induite par l'EMF frappe PLUS FORT (tampon plus petit).", diseases: "Vulnerabilite au stress, addiction, sensibilite a la douleur", evidence: "DERIVABLE" },
    ],
    genSuscEhsTitle: "EHS redefini : un trouble polygenique du seuil calcique",
    genSuscEhsDesc: "L'EHS (hypersensibilite electromagnetique) n'est pas psychosomatique — c'est un trouble du seuil Ca²⁺ polygeniquement predictible. Afflux VGCC eleve (CACNA GoF) + extrusion lente (SLC8A1/ATP2B LoF) + signalisation sensible (CRY1Δ11, MTNR1B GG, COMT Val/Val) = seuil bas d'autophosphorylation CaMKII = symptomes a des niveaux EMF inferieurs a la moyenne de la population.",
    genSuscEhsBiomarker: "Biomarqueur propose : niveau d'autophosphorylation CaMKII Thr286 dans les lymphocytes. Niveau plus eleve = plus proche du seuil = plus sensible a l'EMF. Ceci pourrait etre le premier biomarqueur OBJECTIF de l'EHS.",
    genSuscEpistaticTitle: "Interactions epistatiques",
    genSuscEpistatic: [
      { pair: "CACNA1C × MTNR1B", effect: "Depression + T2D de la meme suppression de melatonine dans differents organes. Porteurs AA + GG : comorbidite la plus elevee.", status: "TESTABLE (biobanque)" },
      { pair: "CRY1Δ11 × MTNR1B", effect: "Melatonine retardee × hypersensibilite des cellules β → glycemie a jeun matinale particulierement elevee.", status: "DERIVABLE" },
      { pair: "CACNA × SLC8A1/ATP2B", effect: "Afflux eleve + extrusion lente = accumulation Ca²⁺ → phenotype EHS.", status: "TESTABLE (genotypage de cohorte EHS)" },
      { pair: "CAMK2A × CACNA2D1", effect: "CaMKII pres du seuil + plus de canaux = sensibilite critique a tout EMF.", status: "COHERENT" },
    ],
    genSuscPrinciples: [
      { id: "GXEMF-1", title: "Les interactions Gene × EMF sont superadditives", desc: "La manifestation du risque genetique depend de l'exposition EMF. L'EMF « active » des risques genetiques qui seraient latents dans un environnement sans EMF." },
      { id: "GXEMF-2", title: "Les gabapentinoides inversent l'amorcage ELF via α2δ-1", desc: "La pregabaline/gabapentine se lie a α2δ-1, bloquant le trafic VGCC. Les utilisateurs de gabapentinoides ont une densite synaptique VGCC plus faible → moins sensibles a l'EMF." },
      { id: "GXEMF-3", title: "L'autophosphorylation CaMKII est un biomarqueur mesurable", desc: "Niveau de phosphorylation CaMKII Thr286 dans les lymphocytes : plus eleve = plus sensible a l'EMF. Testable dans les cohortes EHS." },
    ],
    genSuscRef: "[[ref:kury2017_camk2|Kury 2017]] · [[ref:patke2017_cry1|Patke 2017]] · [[ref:lyssenko2009_mtnr1b|Lyssenko 2009]] · [[ref:tuomi2016_mtnr1b|Tuomi 2016]] · [[ref:scholl2015_cacna1h|Scholl 2015]] · [[ref:korean2025_cacna|Korean 2025]] · [[ref:field2006_cacna2d1|Field 2006]] · [[ref:hoppa2012_a2d|Hoppa 2012]]",

    recovWindowTitle: "Fenetre de recuperation : dephosphorylation CaMKII",
    recovWindowSub: "La vie moderne elimine les heures sans EMF necessaires a la restauration de l'homeostasie Ca²⁺",
    recovWindowDesc: "La dephosphorylation de CaMKII (recuperation de l'etat autophosphoryle) necessite du temps sans surcharge Ca²⁺. Le sommeil sans EMF permet cette recuperation. Mais les environnements modernes eliminent les heures sans EMF : routeur WiFi 24/7, telephone sur la table de nuit, eclairage LED jusqu'au coucher, appareils Bluetooth. Le facteur de recuperation (R) capture ceci : quand les heures sans EMF approchent zero, le denominateur 1/R approche 1,0 (pas de recuperation), et les dommages cumulatifs s'accelerent.",
    recovWindowEvidence: "Travail poste : [[ref:shiftwork_mets2025|OR 1,17]] pour le syndrome metabolique — le travail de nuit perturbe a la fois la melatonine et la fenetre de recuperation. [[ref:walker2017_why_we_sleep|Walker (2017)]] : une nuit de mauvais sommeil → testosterone −15 %, cellules NK −70 %. Un bon sommeil RESTAURE → la fenetre de recuperation est reelle. Experience naturelle du confinement COVID : 24h/jour a domicile avec WiFi + LED + appareils multiples → fenetre de recuperation eliminee → acceleration T2D de [[ref:t2d_covid2024|2,90 % a 3,52 %/an]].",
    recovWindowIntervention: "L'intervention la plus simple que le modele predit : une chambre sans EMF. Retirer le routeur WiFi de la chambre, utiliser le mode avion sur le telephone la nuit, passer a la lumiere incandescente ou a la bougie avant le coucher. Ceci restaure la fenetre de recuperation sans necessiter d'autre changement de mode de vie.",
    recovWindowPred1: "RECOV-1 : chambre sans EMF → les niveaux de melatonine augmentent de maniere mesurable en 2 semaines",
    recovWindowPred2: "RECOV-2 : fenetre de recuperation minimale pour la dephosphorylation CaMKII : 4-6 heures sans EMF",
    recovWindowRef: "[[ref:walker2017_why_we_sleep|Walker 2017]] · Donnees confinement COVID · Meta-analyses du travail poste",

    mtorSub: "EMF, restriction calorique et rapamycine convergent sur la meme voie de vieillissement",
    mtorTitle: "Hypothese de convergence mTOR",
    mtorDesc1:
      "mTOR est l'integrateur en aval ou l'afflux Ca²⁺ induit par l'EMF converge avec les voies du vieillissement, de la fertilite et du cancer. La voie Sempou : EMF → VGIC → Ca²⁺↑ → hyperactivation mTOR → autophagie↓, accumulation de cellules senescentes, controle qualite mitochondriale↓, inflammation chronique↑.",
    mtorDesc2:
      "La metformine active l'AMPK, qui supprime mTOR -- l'exact oppose de la voie induite par l'EMF. L'hypothese : le benefice de longevite de la metformine n'est pas anti-vieillissement en soi mais anti-vieillissement-accelere-par-l'EMF. Dans un environnement EMF naturel (Amish), le benefice devrait etre minimal.",
    mtorEqExplain:
      "Ou EMF est l'exposition normalisee (0 = pas d'infrastructure, 1 = ville moderne), et les facteurs de reduction incluent la metformine (0,30), la rapamycine (0,85), la restriction calorique (0,20), le jeune intermittent (0,10).",
    mtorThreeTitle: "Trois epidemies, un mecanisme",
    mtorAging: "Vieillissement",
    mtorAgingDesc:
      "mTOR↑ → autophagie↓, senescence↑, inflammation↑, mitochondries↓ → vieillissement accelere",
    mtorFertility: "Fertilite",
    mtorFertilityDesc:
      "mTOR↑ → differenciation des spermatogonies↓, epuisement folliculaire↑, AMH↓ → TFR↓",
    mtorCancer: "Cancer",
    mtorCancerDesc:
      "mTOR↑ → proliferation↑, croissance tumorale↑, metastase↑ → risque de cancer↑",
    mtorPredTitle: "Predictions testables",
    mtorPredColId: "ID",
    mtorPredColPred: "Prediction",
    mtorPredColTest: "Test",
    mtorPreds: [
      { id: "E1", pred: "Le benefice de longevite de la metformine est plus grand dans les environnements a EMF eleve", test: "UK CPRD stratifie par urbain/rural" },
      { id: "E2", pred: "Les utilisateurs Amish de metformine montrent un bonus de longevite plus petit que la population generale", test: "Comparaison de cohorte diabetique Amish" },
      { id: "E3", pred: "L'avantage de longevite des Zones Bleues disparait avec l'arrivee de la 4G/5G", test: "Suivi de cohortes Okinawa, Sardaigne, Ikaria" },
      { id: "E4", pred: "Les tailles d'effet des experiences de RC augmentent par decennie (EMF de laboratoire croissant)", test: "Meta-analyse : taille d'effet vs annee de publication" },
      { id: "E5", pred: "Le benefice de l'essai TAME se stratifie par exposition EMF", test: "Analyse en sous-groupe urbain vs rural" },
      { id: "E6", pred: "Le Shabbat (25h/semaine sans EMF) agit comme un jeune mTOR intermittent, soutenant le TFR et la longevite Haredi", test: "Cohorte Haredi vs israelienne seculiere" },
    ],

    fourRoutesTitle: "Cinq voies independantes EMF -> TFR",
    fourRoutesSub: "Gonadique, circadienne, hypophysaire, autonome et neurodeveloppementale — chacune suffisante seule",
    fourRoutesDesc: "BERM identifie cinq voies biologiques independantes par lesquelles l'exposition EMF peut reduire la fertilite. Chaque voie opere par un mecanisme et un tissu cible distincts. De maniere cruciale, chaque voie est independamment suffisante pour reduire le TFR — elles operent en parallele, pas en serie. Ceci signifie que bloquer une voie (ex : supplementation antioxydante pour la voie gonadique) n'elimine pas l'effet, car quatre autres voies restent actives.",
    fourRoutesGonadal: "Voie 1 : Gonadique (etablie)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> dommage ADN des spermatozoides + suppression StAR des cellules de Leydig -> declin de la testosterone + perturbation de la spermatogenese. De plus : EMF -> activation prematuree de CatSper -> epuisement energetique -> defaillance de navigation (rheotaxie, chimiotaxie, reaction acrosomique). Tissu cible : testicules. Niveau de preuve : E (23-28 etudes de blocage). Canal principal : RF + ELF.",
    fourRoutesCircadian: "Voie 2 : Circadienne (etablie)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> perturbation de l'horloge circadienne -> suppression de la melatonine -> perturbation de l'axe HPG + stress oxydatif dans le liquide folliculaire. Tissu cible : glande pineale, SCN. Niveau de preuve : E. Canal principal : RF (composante magnetique).",
    fourRoutesPituitary: "Voie 3 : Hypophysaire (nouvelle)",
    fourRoutesPituitaryDesc: "EMF -> canaux Cav3 de type T dans les gonadotrophes -> perturbation de la secretion FSH/LH -> dysfonction gonadique en aval. L'hypophyse se situe en dehors de la BBB et est directement exposee. Tous les types de cellules hormonales expriment Cav3. Cette voie peut reduire la fertilite independamment des dommages gonadiques. Tissu cible : hypophyse. Niveau de preuve : E. Canal principal : ELF + RF.",
    fourRoutesAutonomic: "Voie 4 : Autonome (nouvelle)",
    fourRoutesAutonomicDesc: "EMF -> noeud sinusal Cav3.1 -> reduction VFC -> declin du tonus vagal -> hyperactivation de l'axe HPA -> cortisol chronique -> inhibition croisee HPG. La VFC est un biomarqueur precoce sensible. Tissu cible : noeud sinusal, nerf vague. Niveau de preuve : E. Canal principal : ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "Voie 5 : Neurodeveloppementale (derivee)",
    fourRoutesNeurodevelopmentalDesc: "EMF → VGCC/Ca²⁺ pendant les fenetres de developpement critiques → differenciation sexuelle cerebrale perturbee, maturation du CPF, formation de l'identite. Meme mecanisme que les EDC chimiques (BPA, phtalates). Additif avec les effets des EDC chimiques. Bloque par : reduction EMF prenatale, soutien B2/glutathion. Tissu cible : cerveau foetal/nourrisson. Niveau de preuve : L* (prediction derivee — en attente du test DIFF-1 AGD). Canal principal : RF + ELF.",
    cascadeNeurodevExt: "Analyse etendue : CACNA1C comme vulnerabilite genetique partagee a travers ASD, ADHD, bipolaire, depression et schizophrenie. Sept canaux developpementaux lient l'EMF a la differenciation sexuelle cerebrale a travers les memes voies Ca²⁺. Voir le modulome cerebral pour l'analyse complete.",
    fourRoutesImplication: "Implication clinique : les interventions ciblant une seule voie (ex : antioxydants pour la Voie 1) montreront une protection partielle mais incomplete. La protection complete necessite soit une reduction de l'EMF (adressant toutes les voies simultanement) soit une strategie d'intervention multi-cibles.",

    modulationTitle: "Pourquoi la modulation compte plus que le DAS",
    modulationDesc: "Une grande etude ([[ref:fert-steril-2023-phone-sperm-trend|Fertility and Sterility 2023]]) a trouve une association entre l'utilisation du telephone mobile et une concentration de spermatozoides plus basse — mais l'association etait PLUS FORTE en 2005-2007 qu'en 2012-2018. BERM explique ceci via l'equation de Schwan : la composante biologiquement active n'est pas la porteuse RF mais son ENVELOPPE DE MODULATION ELF. GSM (2G) : pulse TDMA dur a 217 Hz, ~100 % de profondeur de modulation → forte composante ELF → grand effet de bifurcation type T. LTE (4G) : OFDM, ~30-50 % de profondeur de modulation, puissance d'emission plus faible → composante ELF plus faible → effet plus petit. Ceci predit la tendance temporelle SANS invoquer « moins de radiation est plus sur. » La QUANTITE de radiation peut etre similaire, mais la STRUCTURE DE MODULATION a change.",
    modulationWarning: "Note : cette tendance temporelle est une CORRELATION. D'autres facteurs ont change simultanement (position du telephone, habitudes d'utilisation, autres expositions). L'explication de Schwan est parcimonieuse mais pas la seule possibilite.",

    modulomeSub: "Modele de susceptibilite a douze couches — de la physique des spins moleculaires aux patterns de population",
    modulomeTitle: "Modulome EMF",
    modulomeDesc: "Le modulome à douze couches catalogue des modérateurs candidats, de la physique des spins aux populations. BERM les relie par des noyaux propres aux endpoints : ils ne forment ni un χ universel ni χ_geo et ne sont pas dérivés de FieldState. Douze couches, dix organes cibles et quatre voies proposées vers le déclin de la fertilité.",

    btnEvidence: "Parcourir les preuves",
    btnPredictions: "Voir les predictions",
    mathSub: "Géométrie dérivée, opérateur de réponse conditionnel et calibration tissulaire ouverte",
    mathTitle: "Fondements mathematiques",
    mathSubtitle:
      "Les mathématiques séparent l'ansatz de Lindgren 2025 et ses conséquences géométriques des fermetures biologiques et démographiques de BERM. La forme de l'opérateur est dérivée conditionnellement sous des hypothèses explicites ; noyau tissulaire, signe, délai et calibration restent ouverts.",

    thresholdTitle: "Modele de seuil testosterone → TFR",
    thresholdSub: "Lien quantitatif du declin de la capacite biologique a l'effondrement demographique",
    thresholdLead: "La composante predictive la plus forte du modele BERM. Le declin de la testosterone (~1 %/an, independant de l'age, documente dans cinq pays) cree une trajectoire a trois phases : erosion silencieuse → franchissement du seuil → limite biologique. Le modele est calibre contre les donnees finlandaises et coreennes et genere des predictions specifiques et testables au niveau national.",
    thresholdPhase1Title: "Phase 1 : Erosion silencieuse",
    thresholdPhase1Desc: "La testosterone decline mais est biologiquement suffisante. Le TFR est stable ou decline lentement en raison de facteurs culturels. La capacite biologique depasse la demande culturelle.",
    thresholdPhase2Title: "Phase 2 : Seuil franchi",
    thresholdPhase2Desc: "La perte cumulative de T depasse ~40 %. Subfertilite masculine croissante (T < 300 ng/dL). Le TFR accelere a la baisse car la capacite biologique devient la contrainte limitante. Les programmes pro-natalistes commencent a echouer.",
    thresholdPhase3Title: "Phase 3 : Limite biologique",
    thresholdPhase3Desc: "Le TFR passe sous 1,0. L'incapacite biologique domine. Meme les couples motives necessitent la reproduction assistee. La demande d'FIV croit exponentiellement.",
    thresholdMathTitle: "Formulation mathematique",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_culturel(t), TFR_bio(t) )",
    thresholdMathExplain: "Quand TFR_bio < TFR_culturel, la capacite biologique est la contrainte limitante. La transition sigmoide a ~40 % de perte cumulative de T produit le pattern observe : des decennies de stabilite suivies d'un effondrement rapide.",
    thresholdTableTitle: "Parametres par pays",
    thresholdTableCountry: "Pays",
    thresholdTableRate: "r (%/an)",
    thresholdTableSource: "Source",
    thresholdTableCumul: "Cumul. 2024",
    thresholdTableThreshold: "Annee seuil",
    thresholdTablePhase: "Phase",
    thresholdFinlandTitle: "Validation retrospective : Finlande",
    thresholdFinlandText: "La Finlande est la Pierre de Rosette du modele. [[ref:perheentupa2013|Perheentupa (2013)]] documente un declin de T de 37 % dependant de la cohorte (n=3 271, 1972-2002). Le TFR est reste stable a 1,63-1,87 pendant 40 ans (1970-2010), puis s'est effondre a 1,26 en 2024. Le delai de ~35 ans entre le debut du declin de T et l'effondrement du TFR est coherent avec l'erosion biologique cumulative atteignant le seuil. Si le modele avait existe en 2005, il aurait pu predire l'effondrement de la Finlande 10-15 ans a l'avance.",
    thresholdProjectionsTitle: "Projections TFR par pays",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "Modele de seuil interactif",
    thresholdFootnoteDenmark: "[[ref:andersson-2007-denmark|Andersson 2007]] a rapporte un resultat nul apres ajustement pour le BMI. Le modele interprete le BMI comme un mediateur (EMF → perturbation metabolique → BMI ↑ → T ↓), pas un facteur de confusion — ajuster pour le BMI supprime une partie du signal. Voir la section structure causale ci-dessous.",
    thresholdFootnoteEstimated: "Aucune etude publiee de tendance seculaire de T n'est disponible. Le taux coreen est estime a partir de la densite EMF mondiale la plus elevee ; le taux japonais est estime par analogie avec le declin documente de la Finlande. Ceux-ci sont provisoires et seront mis a jour lorsque des donnees directes seront disponibles.",
    thresholdCaveat: "Les taux de declin de T sont des tendances seculaires independantes de l'age provenant d'etudes longitudinales evaluees par les pairs. Les taux coreen et japonais sont des estimations. Le seuil de 40 % est calibre, pas derive. Les projections supposent la continuation des taux actuels.",

    causalStructureTitle: "Pourquoi le BMI n'explique pas le declin",
    causalStructureLead: "Une objection persistante soutient que l'obesite croissante, pas une exposition environnementale, explique le declin seculaire de la testosterone. L'analyse causale formelle utilisant le cadre de Pearl revele que le BMI est un mediateur (sur la voie causale), pas un facteur de confusion (cause independante). Ajuster pour un mediateur supprime le signal reel.",
    causalDagConventionalTitle: "Interpretation conventionnelle",
    causalDagConventionalCaption: "BMI comme facteur de confusion : l'ajustement est correct, resultat nul = pas de declin",
    causalDagBermTitle: "Interpretation BERM",
    causalDagBermCaption: "BMI comme mediateur : l'ajustement supprime le signal medie, nul = surcorrection",
    causalMazurTitle: "Le test de poids stable : [[ref:mazur2013|Mazur et al. 2013]]",
    causalMazurText: "991 veterans de l'US Air Force suivis sur 6 vagues de mesure pendant 20 ans (1982-2002). Les hommes qui ont maintenu leur poids ont quand meme perdu 117 ng/dL (19 %) de leur testosterone. C'est une experience naturelle qui controle le BMI sans ajustement statistique.",
    causalMazurQuote: "Nous n'avons pas identifie la raison du declin seculaire de la testosterone, mais nous excluons l'obesite croissante comme explication suffisante ou primaire.",
    causalMazurSource: "[[ref:mazur2013|Mazur, Westerman & Mueller 2013]], PLOS ONE",
    causalPathwayTitle: "Decomposition quantitative des voies",
    causalPathwayDirect: "Voie directe",
    causalPathwayDirectDesc: "EMF -> Cav3.2/melatonine/cortisol -> declin T",
    causalPathwayDirectEst: "~117 ng/dL / 20 ans (~67 %)",
    causalPathwayMediated: "Voie mediee",
    causalPathwayMediatedDesc: "Médiation candidate : EMF ?→ changement métabolique ?→ hausse IMC → changement aromatase/SHBG → changement T",
    causalPathwayMediatedEst: "~58 ng/dL / 20 ans (~33 %)",
    causalPathwayCaveat: "Ces proportions sont approximatives, derivees de [[ref:mazur2013|Mazur 2013]] (groupes poids stable vs prise de poids). Une analyse de mediation formelle (SEM) pourrait affiner ces estimations.",
    dagDietLifestyle: "Regime / Mode de vie",
    dagBmiAdjCorrect: "Ajustement BMI : CORRECT",
    dagNullNoDecline: "nul = pas de vrai declin",
    dagMetabolicPaths: "6 voies metaboliques",
    dagPathways: "voies",
    dagMediated: "mediee (~33 %)",
    dagDirect: "directe (~67 %)",
    dagOvercorrection: "Ajustement BMI : SURCORRECTION",
    dagRemoves: "supprime ~33 % du signal reel",
    causalReconciliationTitle: "Reconcilier les resultats « contradictoires »",
    causalReconciliationLead: "Quand la structure causale est comprise, toutes les etudes existantes — y compris celles rapportant des resultats nuls — deviennent coherentes :",
    causalReconciliationStudies: [
      { referenceId: "travison2007_v2", study: "Travison 2007", bmiAdj: true, result: "-1,0 %/an", interpretation: "Voie directe capturee (ajuste pour BMI). L'amorcage ELF a cru pendant la meme periode (propagation WiFi + 3G)" },
      { referenceId: "mazur2013", study: "Mazur 2013", bmiAdj: false, result: "-0,95 %/an", interpretation: "Voie directe confirmee naturellement (poids stable). 20 ans = couches 2→4. Voie directe ~67 %. Amorcage : P a cru de 1,5 → 2,0 sur la meme periode" },
      { referenceId: "chodick-2020-israel", study: "Chodick 2020", bmiAdj: false, result: "-1,02 %/an", interpretation: "Effet total (direct + medie). Israel : haute densite RF → fort effet de couches" },
      { referenceId: "santi2025", study: "Santi 2025", bmiAdj: true, result: "Declin T et LH", interpretation: "Voie directe + perturbation HPG confirmees. LH↓ indique perturbation hypophysaire. Le cerveau est l'organe le plus amorce (champ proche 24/7). Le genotype CACNA1C modere la reponse LH" },
      { referenceId: "andersson-2007-denmark", study: "Andersson 2007", bmiAdj: true, result: "Nul", interpretation: "La voie mediee domine → l'ajustement BMI supprime le signal. Danemark 56°N : si l'etude etait en ETE → CRY sature → effet plus petit. La correction saisonniere peut reveler le signal" },
      { referenceId: "nyante2012_nhanes", study: "Nyante 2012", bmiAdj: true, result: "Nul", interpretation: "Changement de dosage + retrait du mediateur → signal masque. USA (60 Hz) vs Europe (50 Hz) : frequence ELF differente → profil d'interference CRY possiblement different" },
    ],
    causalSantiTitle: "[[ref:santi2025|Santi 2025]] : la testosterone ET la LH declinent",
    causalSantiText: "La plus grande meta-analyse jamais realisee (1 064 891 hommes, 1971-2024) a trouve que la testosterone serique decline independamment de l'age, du BMI et de la methode de dosage. De maniere cruciale, elle a aussi trouve que la LH (le signal hypophysaire qui pilote la production de testosterone) decline egalement — excluant une simple insuffisance testiculaire et pointant vers une perturbation au niveau hypothalamo-hypophysaire.",
    causalSantiMechanism: "BERM predit exactement ceci : la Voie A (cellule de Leydig directe via Cav3.2 -> StAR) reduit la testosterone, tandis que la Voie B (melatonine -> GnRH) et la Voie D (cortisol -> HPG) reduisent la LH. Le declin simultane des deux hormones est la signature d'une perturbation multi-niveaux — pas le vieillissement, pas l'obesite.",
    causalSantiSource: "[[ref:santi2025|Santi et al. 2025]], J Endocrinol Invest 48:2721-2734",
    pocketTitle: "La transition de la poche",
    pocketText: "Le doublement du taux de declin des spermatozoides apres 2000 ([[ref:levine2023_sperm|1,16 %→2,64 %/an]]) coincide avec un seul changement comportemental : le telephone est passe de l'oreille a la poche. La capacite de donnees 3G signifiait que le telephone restait dans la poche continuellement plutot que d'etre utilise uniquement pour les appels. Les testicules sont entres dans le champ proche pendant 16 heures par jour.",
    causalInverseTitle: "Test pharmacologique inverse : la therapie de testosterone inverse l'obesite",
    causalInverseText: "Si l'obesite causait le declin de la testosterone, alors augmenter la testosterone ne devrait pas affecter le poids. Mais la therapie de testosterone chez les hommes obeses hypogonadiques produit une perte de poids dramatique (jusqu'a 30 kg dans l'obesite de classe III), confirmant une causalite bidirectionnelle : la suppression de T entraine la prise de poids, pas seulement l'inverse.",
    causalInverseData: [
      { label: "Obesite classe I", loss: "-16,3 kg", bmi: "-5,52" },
      { label: "Obesite classe II", loss: "-25,3 kg", bmi: "-8,15" },
      { label: "Obesite classe III", loss: "-30,5 kg", bmi: "-9,96" },
    ],
    causalInverseSource: "[[ref:saad2016|Saad et al. 2016]], etudes de registre",

    whyPronatTitle: "Pourquoi 200 milliards de dollars n'ont pas pu relever la fecondite de la Coree du Sud",
    whyPronatText: "L'architecture a trois niveaux de BERM separe la fecondite en capacite biologique (Niveau 1), couplage EMF-comportemental (Niveau 2) et choix culturel (Niveau 3). Les politiques pro-natalistes — bonus en especes, conge parental, subventions de garde d'enfants — ciblent le Niveau 3 (motivation). Mais quand le Niveau 1 (capacite biologique) devient la contrainte limitante, aucune incitation de Niveau 3 ne peut compenser. La perte cumulative de testosterone de la Coree du Sud depasse 48 %. Une fraction croissante de couples voulant des enfants ne peuvent pas concevoir naturellement. Les 200 milliards de dollars ont adresse le mauvais niveau du modele.",
    whyPronatPrediction: "T-TFR-4 : le TFR de la Coree ne depassera pas durablement 1,0 jusqu'en 2035, independamment des depenses politiques.",
    whyPronatFalsification: "Falsification : TFR Coree au-dessus de 1,0 soutenu pendant 3+ ans.",

    bioFloorTitle: "Le plancher biologique",
    bioFloorText: "La spermatogenese necessite une testosterone intratesticulaire 50-100× la concentration serique. Quand la testosterone serique descend sous ~200 ng/dL, la spermatogenese est severement alteree. Aux taux de declin actuels (1 %/an depuis une base de ~500 ng/dL) :",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "moyenne de la population, hommes jeunes" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "sous le seuil spermatogenique" },
    ],
    bioFloorConsequence: "Sous ce plancher, meme la FIV ne peut utiliser le sperme propre de l'homme. Le sperme de donneur, l'extraction de spermatozoides testiculaires ou les technologies futures (spermatogenese in vitro) deviennent necessaires. Ce n'est pas de la speculation — c'est de l'arithmetique appliquee aux taux de declin mesures.",

    sixFactorTitle: "Pourquoi la testosterone est la variable d'integration",
    sixFactorLead: "La testosterone est le biomarqueur unique le plus informatif dans le cadre BERM car six proprietes biophysiques independantes la rendent exceptionnellement sensible au mecanisme EMF → VGCC → Ca²⁺.",

    diseaseCascadesTitle: "Cascades pathologiques etendues",
    diseaseCascadesLead: "Onze cascades pathologiques supplementaires derivees de l'analyse de la famille de genes VGCC. Chaque cascade lie un sous-type VGCC specifique a un mecanisme pathologique avec son propre niveau de preuve.",
    diseaseCascades: [
      { num: 9, title: "Myopie", mechanism: "EMF → VGCC dans les cellules amacrines dopaminergiques → liberation DA perturbee → frein d'elongation sclerale affaibli + CRY → melatonine → croissance oculaire circadienne dysregulee. TROIS canaux convergents.", level: "M", trend: "22,9 % (2000) → 34 % (2020) → 50 % (2050)" },
      { num: 10, title: "Maladies auto-immunes", mechanism: "EMF → perturbation chronique du Ca²⁺ dans les cellules T → voie Ca²⁺-calcineurine-NFAT dysregulee → activation des cellules T autoreactives. Les inhibiteurs de calcineurine (cyclosporine, tacrolimus) sont le traitement standard — confirmation pharmacologique.", level: "M|C", trend: "5 % de prevalence aux USA, +19,1 %/an mondialement" },
      { num: 11, title: "Perte auditive et acouphenes", mechanism: "EMF → Cav1.3 dans les synapses des cellules ciliees internes → surcharge chronique en Ca²⁺ → excitotoxicite → dommage synaptique. EMF Bluetooth/ecouteurs directement adjacent a la cochlee.", level: "M|C", trend: "17,7 % des jeunes adultes rapportent des acouphenes ; 1Md+ a risque" },
      { num: 12, title: "Migraine", mechanism: "CACNA1A (type P/Q) GoF → CSD. Variants CACNA1I (Cav3.3) → migraine hemiplegique (OR 2,30). Ratio femme:homme 2,5-4,3:1 coherent avec VGCC differentiel par sexe.", level: "E", trend: "Prevalence en augmentation ; age de debut 12-17" },
      { num: 13, title: "Perturbation de l'architecture du sommeil", mechanism: "Cav3.3 dans le nRt → pacemaker des fuseaux. Cav3.1 dans les neurones TC → ondes delta. Courant de fenetre type T → oscillation lente. EMF → perturbation fuseaux/delta → qualite de sommeil ↓.", level: "M|C", trend: "Insomnie en hausse ; duree de sommeil en baisse mondialement" },
      { num: 14, title: "SOPK", mechanism: "Convergence a 4 organes : cellule β pancreatique (Cav1+3 → insuline ↓) → hyperinsulinemie → androgene thequal ↑ + aromatase granulosale → E2 ↓ + Cav3 hypophysaire → LH/FSH ↑. Les quatre sont sensibles a l'EMF.", level: "M", trend: "5-20 % des femmes en age de reproduction ; en hausse jusqu'en 2035" },
      { num: 15, title: "Douleur chronique", mechanism: "Cav3.2 est le canal de douleur PRIMAIRE dans les nocicepteurs DRG. Surregule dans la douleur inflammatoire/neuropathique. Les neurones DRG feminins montrent des courants Cav3.2 plus importants → difference de sexe.", level: "M|C", trend: "Epidemie de douleur chronique ; des centaines de millions affectes" },
      { num: 16, title: "Arythmie cardiaque (QT)", mechanism: "CACNA1C GoF → courant de fenetre Cav1.2 ↑ → QT ↑. Syndrome de Timothy : QT extreme + autisme de la MEME mutation.", level: "E", trend: "Timothy : la plupart meurent avant 3 ans sans traitement" },
      { num: 17, title: "Neurodeveloppement et differenciation sexuelle", mechanism: "7 canaux causaux × 3 fenetres de developpement. Prenatal : Leydig Cav3 → T↓, aromatase, hypophyse. Pubertaire : CPF, melatonine, OT/AVP, cortex insulaire.", level: "L*", trend: "Orientations vers les cliniques de genre : Suede +19 700 % ; ASD-GD 6-26 %" },
      { num: 18, title: "TheraBionic : preuve de mecanisme", mechanism: "Dispositif approuve FDA (2019) pour le CHC. 27,12 MHz, AM a des frequences specifiques aux tumeurs. DAS 100-1000× inferieur au telephone. Mecanisme : EMF → Cav3.2 → Ca²⁺ → differenciation CHC. CONFIRME EMF non thermique → VGCC.", level: "E", trend: "34 % d'augmentation de survie dans le CHC avance" },
      { num: 19, title: "Syndrome metabolique / Obesite", mechanism: "SIX voies convergentes EMF → Ca²⁺ : (1) appetit hypothalamique ↑ via glie ARC Ca²⁺ → AgRP/NPY, (2) thermogenese BAT ↓ via CaMKII/CREB → UCP1 et perturbation SERCA2b/RyR2, (3) dynamique d'insuline des cellules β ↓ via VGCC type L, (4) axe thyroidien → taux metabolique ↓ via Cav3 dans les thyreotrophes, (5) melatonine → perturbation circadienne metabolique, (6) Ca²⁺ adipocytaire → lipogenese ↑. CaMKII est la MOLECULE DE CONVERGENCE connectant toutes les voies. Paradoxe de [[ref:klimentidis2010|Klimentidis]] : 24 populations, 8 especes TOUTES prenant du poids (p = 1,2×10⁻⁷) y compris les animaux de laboratoire avec regime controle. L'obesite est multifactorielle — l'EMF est UN facteur contribuant expliquant le residu que le regime/exercice/genetique ne peut expliquer.", level: "M", trend: "Obesite mondiale : 4 % (1975) → 13 % (2016) → 42 % (USA 2024)" },
    ],
    vgccDiagramTitle: "Famille de genes VGCC",
    vgccDiagramSubtitle: "Six genes, six clusters pathologiques, un mecanisme",
    emfBarTitle: "Hierarchie de sensibilite EMF au potentiel de repos",
    emfBarSubtitle: "Probabilite d'activation relative a ~−70 mV de potentiel membranaire",

    epistemic:
      "Note epistemique : les equations ci-dessus sont la specification actuelle du modele (BERM v17). Les valeurs des parametres sont calibrees contre les donnees observees et seront mises a jour au fur et a mesure que de nouvelles preuves deviennent disponibles. Le modele est explicitement concu pour etre falsifiable -- si ses predictions echouent, le modele est faux. Le paradoxe des dispositifs therapeutiques (24+ categories de dispositifs EMF non thermiques approuves par les regulateurs, DC a UV) etablit la bioactivite non thermique comme un fait reglementaire, pas une hypothese.",
    lbermRef:
      "La structure formelle du produit Jacobien (chapitre 17), le registre des obligations de preuve et les systemes de securite sont decrits dans le document de base (LBERM_final.docx).",
    svgSpermDamage: "Dommage spermatique",
    svgCircadian: "Circadien",
    svgMelatoninDown: "Melatonine ↓",
    svgCa2Entry: "Entree Ca²⁺",
    svgCortisolUp: "Cortisol ↑",
    svgTestosteroneDown: "Testosterone ↓",
    svgAutophagyDown: "Autophagie ↓",
    svgCellGrowthDown: "Croissance cellulaire ↓",
    svgTfr: "TFR",
    svgDecline: "declin",
    svgFiveRoutesAria: "Cinq voies vers le declin du TFR",
    brainModulomeLink: "Modulome cerebral",
    routeGonadal: "Gonadique",
    routeAutonomic: "Autonome",
    routeNeurodevel: "Neurodevel.",
    routeLabel: "Voie",
    routeParallelCaption: "Chaque voie est independamment suffisante — elles operent en parallele",
    labelWarning: "Avertissement",
    labelPrediction: "Prediction",
    labelFalsification: "Falsification",
    colStudy: "Etude",
    colBmiAdj: "Ajust. BMI",
    colResult: "Resultat",
    colBermInterpretation: "Interpretation BERM",
    countryDenmark: "Danemark",
    countryFinland: "Finlande",
    countrySouthKorea: "Coree du Sud",
    countryJapan: "Japon",
    estHighestEmf: "Estime (EMF le plus eleve)",
    estFinlandAnalogy: "Estime (analogie Finlande)",
    layerMilitaryRadar: "Radar militaire",
    layerWeatherRadar: "Radar meteorologique",
    layerMobileNetworks: "Reseaux mobiles",
    layerWindTurbines: "Eoliennes",
    layerDisplayTransition: "Transition d'ecrans",
    layerSmartMeters: "Compteurs intelligents",
    layerIndoorLed: "LED interieur",
    layerSolarInverters: "Onduleurs solaires",
    layerStreetLed: "LED de rue",
    pharmEvidenceLink: "Preuves pharmacologiques : 8 classes de medicaments convergeant sur les voies BERM →",
    svgVgccPathway: "Voie VGCC",
    svgAutophagy: "Autophagie",
    svgProteinSynthesis: "Synthese proteique",
    svgCellGrowth: "Croissance cellulaire",
    svgImmuneRegulation: "Regulation immunitaire",
    svgIntegrator: "integrateur",
    svgCalories: "Calories",
    svgAging: "Vieillissement",
    svgCounteracts: "(contrecarre)",
    svgFertilityDown: "Fecondite↓",
    svgCancer: "Cancer",
    svgMtorSharedHub: "mTOR est le hub partage — trois epidemies, un mecanisme",
    svgInflammation: "Inflammation",
    svgCortisol: "Cortisol",
    svgMelatonin: "Melatonine",
    svgPosFeedback: "Retroaction positive",
    svgNegFeedback: "Retroaction negative",
    svgHub: "hub",
    svgFeedbackCaption: "17 boucles de retroaction positive — tout point d'entree active le reseau entier",
    svgVgccHierarchyCaption: "Canaux T-type (Cav3) >> Cav1.3 (L-type a seuil bas) >> Cav1.2 (potentiel d'action uniquement). La retroaction CaMKII deplace le seuil Cav3.2 vers des valeurs plus negatives au fil du temps.",
    svgRecoveryBarAria: "Diagramme a barres des taux de recuperation",
    svgRecoveryCaption: "Taux de recuperation (α) : 1,0 = recuperation complete, 0,0 = irreversible",
    svgTechLayersAria: "Diagramme d'exposition cumulative des couches technologiques",
    layerPowerGrid: "Reseau electrique",
    layerRadioTv: "Radio/TV",
    layerCellular: "Cellulaire",
    svgCumulativeExposure: "Exposition cumulative",
    svgTechLayersCaption: "Cinq couches technologiques : chaque generation s'empile sur les precedentes",
    conventionalLabel: "Conventionnel :",
    layerExplanationLabel: "Explication par couches :",
    conventional: "Conventionnel",
    anomalyUnexplainedDecline: "Decline inexplique",
    anomalyUnexplained: "Inexplique",
    anomalyWifiLedLayers: "Couches WiFi+LED",
    anomalySocialMedia: "Reseaux sociaux",
    anomalySomeTheory: "Theorie reseaux sociaux",
    anomalyTripleChannel: "Triple canal",
    anomalySedentary: "Sedentarite",
    anomaly247Emf: "EMF 24h/24",
    anomalyProsperity: "Prosperite",
    anomalyElectrificationLag: "Retard d'electrification",
    anomalyPhysicalLabor: "Travail physique",
    anomalyZeroLayers: "Zero couche",
    colCountry: "Pays",
    colActual: "Reel",
    colNote: "Note",
    countryFinlandName: "Finlande",
    countrySouthKoreaName: "Coree du Sud",
    countryUsaName: "USA",
    countryAmishName: "Amish",
    colDriver: "Facteur",
    replacementLabel: "Remplacement",
    countrySKoreaShort: "Coree S.",
    countryIndiaName: "Inde",
    colAxis: "Axe",
    colTargetOrgan: "Organe cible",
    colConsequence: "Consequence",
    svgGenesCascadeAria: "Diagramme en cascade de 15 genes",
    tierInflux: "INFLUX",
    tierModulation: "MODULATION",
    tierIntegration: "INTEGRATION",
    tierExtrusion: "EXTRUSION",
    tierSignaling: "SIGNALISATION",
    svgGenesCascadeCaption: "Cascade Ca²⁺ : 15 genes repartis sur cinq niveaux fonctionnels",
    colGene: "Gene",
    colProtein: "Proteine",
    colBermRole: "Role BERM",
    colKeyVariant: "Variant cle",
    colDiseases: "Maladies",
    colEvidence: "Evidence",
    colVariant: "Variant",
    colEffect: "Effet",
    ehsAssay: "dosage",
    ehsLymphocyte: "Autophosphorylation lymphocytaire",
    ehsElevated: "Eleve",
    ehsGenotyping: "genotypage",
    ehsCalciumVariants: "Variants des canaux calciques",
    ehsRiskAlleles: "Alleles a risque",
    ehsSignalingMarkers: "Marqueurs de signalisation",
    ehsHighRisk: "Profil a haut risque",
    ehsPolygenicScore: "Score de risque polygenique",
    ehsOverallAssessment: "Evaluation globale de la sensibilite aux EMF",
    ehsDiagnosticClass: "Classification diagnostique EHS",
    ehsLowModHigh: "Faible / Modere / Eleve",
    whyDisagreeTitle: "Pourquoi les etudes se contredisent",
    whyDisagreeSub: "Huit modérateurs non contrôlés expliquent des décennies de preuves « contradictoires »",
    whyDisagreeDesc: "La recherche sur les EMF produit des résultats contradictoires depuis des décennies. BERM identifie huit modérateurs non contrôlés qui prédisent quelles études trouvent des résultats positifs et lesquelles trouvent des résultats nuls :",
    modSeason: "Saison",
    modSeasonDesc: "La sensibilité du magnétorécepteur CRY dépend de la lumière. En hiver, CRY est plus sensible → l'effet des EMF sur la mélatonine est plus fort. Démontré chez les veaux ([[ref:halgamuge2015|Halgamuge 2015]]).",
    modGenotype: "Genotype",
    modGenotypeDesc: "Allèle A de CACNA1C rs1006737 → davantage de Cav1.2 → réponse Ca²⁺ plus forte. [[ref:sousouri2025|Sousouri 2025]] (ETH) : le génotype CACNA1C détermine la réponse du sommeil à la 5G.",
    modLabElf: "Fond ELF du laboratoire",
    modLabElfDesc: "Le réseau électrique de 50/60 Hz augmente l'expression des VGCC en 8 à 10 jours ([[ref:sun2016_elf_vgcc|PMC4757866]]). Les laboratoires à fond ELF élevé « préparent » les cellules.",
    modNighttimeEmf: "EMF nocturne",
    modNighttimeEmfDesc: "Routeur Wi-Fi dans la chambre vs nuit sans EMF → état de récupération CaMKII différent → niveau basal de Ca²⁺ différent à l'entrée dans l'expérience.",
    modSpeciesPriming: "Espece / Amorcage",
    modSpeciesPrimingDesc: "Les études animales en laboratoire (préparation ELF 24 h/24, génétique homogène) trouvent des résultats positifs dans 92 % des cas. Les études humaines menées dans des environnements hétérogènes en trouvent 35 %. Les deux sont correctes — les animaux de laboratoire sont préparés de façon chronique (expression des VGCC élevée, [[ref:sun2016_elf_vgcc|PMC4757866]]). p=0,002.",
    modDuration: "Duree",
    modDurationDesc: "L'exposition chronique (>1 semaine) produit des résultats positifs dans 92 % des cas. L'exposition aiguë (1 à 2 nuits) en produit 31 %. L'autophosphorylation de CaMKII nécessite une charge cumulative de Ca²⁺. p=0,001.",
    modPulsation: "Pulsation",
    modPulsationDesc: "Les signaux pulsés produisent des résultats positifs dans 88 % des cas. Les signaux CW en produisent 48 %. Le mécanisme IFO-VGIC nécessite des champs variables. p=0,048.",
    modVitaminD: "Statut en vitamine D",
    modVitaminDDesc: "La vitamine D (1,25(OH)₂D₃) diminue l'ARNm de CACNA1C/1D ([[ref:vdh_lvscc|J Neurosci 2001]]). Carence en vitamine D → surexpression des VGCC = même état que la préparation ELF. Les études menées dans des populations carencées en vitamine D (hiver, hautes latitudes) devraient montrer des effets EMF plus forts.",
    modThreePredictors: "Trois moderateurs predisent les resultats des etudes avec une signification statistique :",
    modAnalysisBasis: "Fondé sur l'analyse de 29 études portant sur 3 critères. Validé par [[ref:weller2025_dna|Weller 2025]] (n=517).",
    predRepl1Label: "Prediction REPL-1 : ",
    predRepl1Desc: "Une analyse rétrospective de 50 à 100 bioessais EMF publiés montrera que ces huit modérateurs prédisent significativement les résultats positifs par rapport aux résultats nuls. Testable SANS nouvelles données.",
    modEpistemicNote: "Niveau épistémique : le cadre à huit modérateurs est la synthèse de BERM (niveau M). Les modérateurs individuels disposent d'un soutien empirique (niveau E).",
    dnaBelow58Title: "58% des dommages a l'ADN surviennent en dessous des limites ICNIRP",
    dnaBelow58Desc: "[[ref:weller2025_dna|Weller et al. (2025)]] ont analysé 517 études de génotoxicité et constaté que 58 % des études signalant des dommages à l'ADN utilisaient des niveaux d'exposition INFÉRIEURS aux directives ICNIRP actuelles. L'[[ref:ivancsits_dna_recovery|étude d'Ivancsits]] a observé des cassures de l'ADN à 35 µT — moins d'un cinquième de la limite professionnelle ICNIRP de 200 µT.",
    dnaBelow58Mechanism: "Les limites ICNIRP sont conçues pour prévenir les effets THERMIQUES. Les dommages à l'ADN dus aux EMF relèvent d'un mécanisme NON THERMIQUE agissant par un dysfonctionnement des canaux calciques voltage-dépendants.",
    dnaRepairTitle: "Les dommages a l'ADN se reparent en 9 heures — si l'exposition cesse",
    dnaRepairDesc: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]] ont montré que les cassures de l'ADN induites par les EMF revenaient à la normale dans les 9 heures suivant l'arrêt de l'exposition. Cela quantifie la fenêtre de récupération de BERM : le corps PEUT réparer les dommages induits par les EMF, mais seulement s'il dispose d'une durée suffisante sans EMF.",
    dnaModernEnv: "Les environnements modernes avec WiFi 24 h/24, éclairage LED et smartphones au lit éliminent entièrement cette fenêtre de récupération. Une chambre moderne typique ne fournit aucun temps de récupération sans EMF.",

    twoLevelTitle: "Modèle de prédiction à deux niveaux",
    twoLevelSub: "Niveau 1 (transversal) + Niveau 2 (dynamique temporelle de la testostérone)",
    twoLevelLead: "Le modèle transversal positionne les pays sur la courbe TFR mondiale via le seuil d'électrification. Le modèle temporel ajoute un second niveau : le déclin séculaire de la testostérone fournit la dynamique intra-pays via la relation de décalage T→TFR.",
    twoLevelL1: "Niveau 1 : Seuil d'électrification",
    twoLevelL1Desc: "TFR = 4,11 × exp(−54 × EMF_index) + 1,55. R² = 0,851 sur 54 pays.",
    twoLevelL2: "Niveau 2 : Trajectoire de la testostérone",
    twoLevelL2Desc: "T(année) = 638 × (1 − 0,012)^(année − 1982). Déclin indépendant de l'âge de −1,2 %/an, décalé de 8 ans. USA 2007–2024, R² = 0,97.",
    twoLevelCombined: "Prédiction combinée : le Niveau 1 fixe la ligne de base transversale ; le Niveau 2 la module dans le temps.",
    twoLevelCaveat: "Les deux niveaux sont indépendants. Le Niveau 2 est calibré sur les USA uniquement. Le R² de 0,97 est intra-échantillon.",
    twoLevelDiagnostic: "Diagnostic LH–T : Santi et al. 2025 ont montré LH↓ et T↓ simultanés — cohérent avec la suppression hypothalamique (voie EMF), pas les dommages testiculaires (voie EDC).",
  },
  ko: {
    title: "모델 문서",
    subtitle:
      "생체전자기 생식 모델(BERM) 종합 문서: 3단계 아키텍처, 인과 경로, 결합 방정식 및 회복 역학.",
    metaTitle: "모델 문서 - Extinction Field",
    metaDesc:
      "BERM 모델 문서: 3단계 아키텍처, 인과 경로, 방정식 및 회복 역학.",
    specNote: "BERM은 설명·도출·예측 모델입니다. FieldState v2는 별도의 선택적 측정·관찰·추정 모듈이며 모델의 별칭이나 인과적 뿌리가 아닙니다. 공개 v17 출력은 국가 기술 시점 프록시를 사용하며 FieldState로 교정되지 않았습니다. BERM은 조건부 형식 L2 반응 연산자를 도출하지만 게이지, 척도, 조직 커널과 종점 보정은 미해결입니다.",

    physBioTitle: "물리학에서 생물학으로",
    physBioSub: "Lindgren 전제, 도출된 기하학, 조건부 BERM 반응, 미보정 조직 커널",
    physBioLead: "2025 Lindgren 가정은 BERM의 이론 전제입니다. BERM은 최소 물질–메트릭 결합과 반응 이론을 추가해 형식 반응 연산자를 조건부로 도출합니다. Lindgren은 게이지, 척도, 조직 커널, SHBG/AR/ZIP9 계수나 인체 종점 보정을 제공하지 않습니다.",
    physBioGMETitle: "Lindgren 기하학적 메트릭 확장",
    physBioGMEDesc: "표준 물리학에서 전자기장은 시공간을 통해 전파되는 별개의 존재이다. Lindgren의 기하학적 모델에서 전자기장은 메트릭 텐서에 직접 인코딩된다:",
    physBioGMEFormula: "g_μν = η_μν + κ A_μ A_ν",
    physBioGMEExplain: "여기서 η_μν는 평탄한 Minkowski 메트릭, A_μ는 전자기 사원 퍼텐셜, κ는 명시적 결합 척도입니다. BERM은 이 전제에서 δg를 정확히 도출합니다. 조직 반응은 명명된 반응 커널을 통해서만 조건부로 이어지며 하류 생물학은 메트릭의 자동적 귀결이 아닙니다.",
    physBioChiTitle: "도출된 χ_geo 좌표",
    physBioChiDesc: "명시적으로 정규화한 양의 노름 모드에서 χ_geo(ρ)=ρ/√(1+ρ²)는 랭크-1 역메트릭 보정의 제곱근 진폭입니다. 이 기하 좌표는 도출되지만 조직 감수성 해석이나 v17 기술 프록시 가중치 사용은 보정되지 않은 BERM 모델링입니다.",
    physBioChiFormula: "ρ² = κ A² ≥ 0,    χ_geo(ρ) = ρ / √(1 + ρ²)",
    physBioChiExplain: "이 좌표는 보편적 생물학 선택 규칙을 제공하지 않습니다. CRY 배경, 막전위, 장벽 완전성, 기술 확산은 각각 별도 반응 함수로 검증해야 하며 같은 형태의 v17 프록시 가중치는 기존 비교로만 유지됩니다.",
    physBioSuperTitle: "생물학 이전의 이차 혼합",
    physBioSuperDesc: "전자기장은 일반 중첩을 따릅니다. Lindgren 가정은 퍼텐셜의 이차식이므로 메트릭 구동에 정확한 배경–섭동 교차항과 자체항이 포함됩니다. 이는 모델 기하학의 혼합이지 생물학적 효과의 비가산성을 뜻하지 않습니다.",
    physBioSuperFormula: "δg_μν = κ(Ā_μa_ν + a_μĀ_ν + a_μa_ν)",
    physBioSuperExplain: "진폭 변조와 두 주파수 입력은 a²에 정확한 저주파 포락선 또는 차주파 항을 만듭니다. 조직이 이를 검출하는지와 종점 반응의 가산성은 보정되지 않은 반응 커널에 달려 있습니다. 복합 노출 리뷰([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]])는 이 실험을 동기화하지만 연산자를 보정하지 않습니다.",
    physBioSuperLink: "전체 중첩 분석 보기 →",
    physBioTissueTitle: "조직 특이적 공명",
    physBioTissueDesc: "BERM은 조직별 이온 채널 구성, 막 특성 및 후보 반응 창을 생물학 정보로 도입합니다. 조직 순위는 조건부 L2 연산자의 커널 가설이며 χ_geo만으로 도출되지 않습니다:",
    physBioTissues: [
      { tissue: "고환 (Leydig 세포)", channels: "Cav3.2 (T-type), high density", chi: "매우 높음", reason: "안정 시 창 전류; StAR 단백질의 Ca²⁺ 의존성" },
      { tissue: "시상하부", channels: "Cav3.1, Cav3.3", chi: "매우 높음", reason: "synaptotagmin 1을 통한 시냅스 소포 방출" },
      { tissue: "해마", channels: "Cav3.2, Cav1.3", chi: "높음", reason: "LTP/LTD Ca²⁺ 의존성; 신경발생 구역" },
      { tissue: "망막 (청색 추체)", channels: "CRY1/CRY2 + TRPC1", chi: "높음 (광 의존적)", reason: "라디칼 쌍 자기수용; FAD 의존성" },
      { tissue: "동방결절 (심장)", channels: "Cav1.3, Cav3.1", chi: "중간~높음", reason: "페이스메이커 전류; 저역치 활성화" },
      { tissue: "골격근", channels: "Cav1.2 (L-type)", chi: "안정 시 낮음", reason: "높은 활성화 역치 (−30 mV); 활동전위 시에만 유의" },
    ],
    physBioVerifyTitle: "외적 일관성 관찰",
    physBioVerifySub: "네 증거는 배경 의존 검사를 동기화하지만 χ_geo를 조직 감수성으로 보정하지 않는다",
    physBioVerifications: [
      { id: "V1", title: "지자기 사망률 (263개 도시)", desc: "보고된 지자기 폭풍 강도–심혈관 사망 연관성은 지연된 배경×종점 검사를 동기화합니다. χ_geo를 생물학적 매개체로 식별하거나 보정하지 않습니다 ([[ref:vencloviene2022_geomag_mortality|Venclovienė et al. 2022]]).", level: "C" },
      { id: "V2", title: "위도 × CVD (204개국)", desc: "CVD의 지리적 변이는 사전 지정된 지자기 상호작용 검사를 동기화하지만 위도에는 경쟁 경로가 많아 BERM 반응 계수를 단독으로 식별하지 못합니다 ([[ref:feigin2014_latitude_cvd|Feigin et al. 2014]]).", level: "C" },
      { id: "V3", title: "HRV × Kp 지수", desc: "보고된 HRV–Kp 공변이는 장과 생리를 대응 측정할 후보 자율신경 종점입니다. χ_geo 매개 조직 결합의 도출이 아닙니다 ([[ref:mccrary2021_hrv_geomag|McCrary et al. 2021]]).", level: "C" },
      { id: "V4", title: "복합 노출 (172건의 연구)", desc: "복합 노출 리뷰는 상호작용과 파형 의존성 검사를 동기화합니다. 생물학적 비가산성은 Lindgren 이차항이나 BERM 조직 커널을 직접 확인하지 않습니다 ([[ref:juutilainen2006_superposition|Juutilainen et al. 2006]]).", level: "M" },
    ],

    solarBioTitle: "태양-생물학적 연결",
    solarBioSub: "지자기 반응 커널 후보를 검사하는 태양 주기 관찰",
    solarBioLead: "보정된 조직 커널이 지자기 배경에 의존한다면 태양 활동은 측정 가능한 생물학적 진동을 만들 수 있습니다. 아래 관찰은 가설을 동기화하지만 χ_geo를 생물학적 반응으로 식별하거나 인과성을 확립하지 않습니다.",
    solarBioCycleTitle: "태양 주기 → 출생률 주기성",
    solarBioCycleDesc: "미국과 뉴질랜드의 출생률 변동은 11년 태양 주기와 비교되었습니다. BERM에서는 자연실험의 후보 신호이지 χ_geo 상승이나 제안된 커널을 통한 수태 변화의 증거가 아닙니다 ([[ref:lehrer2017_solar_births|Lehrer & Lehrer 2017]]).",
    solarBioCycleNote: "BERM은 태양 활동 → 지자기 교란 → 멜라토닌 변화 → GnRH 박동 변화 → 수태율 변화라는 검증 가능한 사슬을 제안합니다. 광주기와 장기 추세를 통제한 지연 설계가 필요하며 주기만으로 다른 주기성 공변량과 분리할 수 없습니다.",
    solarBioBirthTitle: "출생 시기 → 질병 위험",
    solarBioBirthDesc: "237,000명 코호트에서 출생 월과 여러 후속 진단의 연관성이 보고되었습니다 ([[ref:boland2015_birth_month|Boland et al. 2015]]). 지자기 노출이나 χ_geo는 식별되지 않았으며 BERM은 임신 중 장, 계절, 감염, 영양, 오염을 별도로 측정할 연구의 동기로만 사용합니다.",
    solarBioBirthNote: "발달 시기는 타당한 감수성 창이지만 지자기 → VGCC/CRY → 기관형성 경로는 보정되지 않은 BERM 명제이며 출생 월 연구의 결과가 아닙니다.",
    solarBioDampenTitle: "계절적 진폭 감쇠",
    solarBioDampenDesc: "그리스 출생률의 계절 진폭이 1960–1992년에 감소했다고 보고되었습니다 ([[ref:lerchl1998_birth_seasonality|Lerchl 1998]]). 전기화는 도시화, 피임, 냉난방, 사회적 시기와 나란한 BERM 후보 설명이며 관찰 자체는 EMF나 χ 반응을 측정하지 않습니다.",
    solarBioDampenNote: "판별 예측은 대안 요인을 통제한 뒤 늦은 전기화가 늦은 감쇠를 예측하는 것입니다. 이는 전향적 모델 검사이지 현재 특정 인구의 상태 묘사가 아닙니다.",

    threeBandsTitle: "Three Biological Frequency Bands",
    threeBandsSub: "ULF · ELF · RF — natural and anthropogenic sources mapped to BERM pathways",
    threeBandsLead: "Biological systems interact with electromagnetic fields across three distinct frequency bands, each with different physical mechanisms and biological targets.",
    twoSuscTitle: "기하 좌표와 생물학적 반응 후보",
    twoSuscSub: "χ_geo 기하 + χ_B 스핀화학 후보",
    twoSuscLead: "BERM은 도출된 χ_geo 좌표를 후보 생물학적 반응 함수와 분리합니다. 종점별 반응 커널이 측정되기 전에는 둘을 곱하거나 총 감수성으로 해석할 수 없습니다.",

    bioCivTitle: "From Biology to Civilization",
    bioCivSub: "A 10-step causal chain from molecular EMF effects to civilizational consequences",
    bioCivLead: "BERM applies a biologically reductionist, compositional hypothesis from molecular and endocrine states through individual behaviour to population aggregates. The chain states the proposed propagation from physical input to civilizational outcome. Evidence for separate links can constrain it, but the full multiscale chain is not empirically closed and aggregate political outcomes are not read back as individual hormone measurements.",
    bioCivChain: [
      { step: 0, title: "Measured background", desc: "Physical fields are measurement inputs. BERM, not FieldState, proposes the endpoint-specific biological response kernel." },
      { step: 1, title: "EMF perturbation", desc: "Anthropogenic fields (ELF, IF, RF) perturb the geometric background, altering the spacetime metric biology operates within" },
      { step: 2, title: "VGCC activation", desc: "Voltage-gated calcium channels — especially T-type (Cav3) at bifurcation point — respond to field perturbation via Schwan amplification" },
      { step: 3, title: "Ca²⁺ cascade", desc: "Intracellular calcium signaling disrupted: CaMKII activation, mitochondrial ROS, NF-κB inflammatory pathway" },
      { step: 4, title: "Hormone disruption", desc: "Testosterone, estrogen, melatonin, oxytocin, cortisol, and BDNF affected through Ca²⁺-dependent steroidogenic and neuroendocrine pathways" },
      { step: 5, title: "Individual behavior", desc: "Risk tolerance, social bonding, sleep architecture, cognition, and motivation shift as neuroendocrine substrates change" },
      { step: 6, title: "Family formation", desc: "Both fertility desire (behavioral) and biological capacity (physiological) decline — the two-level collapse" },
      { step: 7, title: "Institutional capacity", desc: "Collective action, strategic planning, and institutional assertiveness weaken as the population's hormonal and cognitive substrate degrades" },
      { step: 8, title: "Civilizational dynamics", desc: "The behavioral aggregate produces the patterns historians observe: stagnation, risk-aversion, institutional sclerosis" },
      { step: 9, title: "Migration gradient", desc: "Biological contrast between EM-depleted and EM-intact populations creates demographic pressure gradients" },
      { step: 10, title: "Cycle or convergence", desc: "Recovery if EM burden lifts (the α term), or permanent convergence as anthropogenic saturation (σ) masks the solar recovery window" },
    ],
    bioCivFormulaTitle: "BioCap integral",
    bioCivFormulaDesc: "The cumulative biological capacity of a population is formalized as the BioCap integral — a running balance between depletion (first integral) and recovery (second integral):",
    bioCivFormula: "BioCap_cand(t,λ) = BioCap₀ − ∫₀ᵗ m_lat^cand(λ)·[S(τ)+U(τ)+E(τ)]dτ + recovery",
    bioCivFormulaTerms: [
      { symbol: "S(τ)", desc: "Normalized solar activity (drives natural geomagnetic perturbation)" },
      { symbol: "U(τ)", desc: "Urbanization-weighted EMF exposure (population density × infrastructure)" },
      { symbol: "E(τ)", desc: "Electrification-weighted exposure (grid density × per-capita consumption)" },
      { symbol: "m_lat^cand(λ)", desc: "BERM candidate latitude moderator; neither χ_geo nor a calibrated biological coefficient" },
      { symbol: "α", desc: "Recovery coefficient (biological repair rate when EM burden decreases)" },
      { symbol: "σ(τ)", desc: "Anthropogenic EM saturation — masks the solar recovery window post-1880" },
    ],
    bioCivEpistemic: "This is BERM's reductionist causal hypothesis. Evidence supports some component mechanisms in specific systems, while the L2 entry operator and several cross-scale aggregation links remain open. Steps 5–10 are model consequences to test, not hormone assays inferred from political behaviour. The BioCap integral is a formal expression, not a fitted equation with validated coefficients.",

    biocapDecompTitle: "BioCap 분해",
    biocapDecompDesc: "", biocapDecompFormula: "", biocapDecompFormulaDesc: "",
    biocapDecompCultural: "", biocapDecompCulturalDesc: "",
    biocapDecompMarkers: [] as { symbol: string; name: string; weight: string; unit: string; baseline: string; current: string; mechanism: string; evidence: string }[],

    hormesisTitle: "호르메시스 용량-반응 확장",
    hormesisDesc: "", hormesisFormula: "",
    hormesisTerms: [] as { symbol: string; desc: string }[],
    hormesisZone1: "", hormesisZone2: "", hormesisZone3: "", hormesisEpistemic: "",

    archTitle: "3단계 아키텍처",
    archDesc:
      "BERM은 출산율 감소를 세 가지 뚜렷한 인과 계층으로 분해합니다. 각 수준은 고유한 역학, 시간 척도 및 증거 기반을 가지고 있습니다. 한 국가의 합계출산율(TFR)은 세 수준의 곱이지 합이 아닙니다 -- 각각이 다른 것들의 승수로 작용합니다.",
    archPredictionSource: "",
    level1Label: "수준 1",
    level1Title: "생물학적 역량",
    level1Desc:
      "현재 환경 노출을 감안한 최대 생리적 출산 능력. 정자 품질(농도, 운동성, DNA 단편화), 난자 품질, 호르몬 환경 및 혈뇌장벽(BBB) 무결성을 포함합니다. 이 수준이 EMF 노출에 가장 직접적으로 영향을 받습니다.",
    level2Label: "수준 2",
    level2Title: "EMF-행동 결합",
    level2Desc:
      "개인 기기 사용이 주변 EMF 노출과 어떻게 상호작용하는지. 높은 주변 노출 환경에서 휴대전화를 소지하는 사람은 비선형 결합 효과를 겪습니다. 이 수준은 인프라 수준과 개인 수준 노출 사이의 상호작용을 포착합니다.",
    level3Label: "수준 3",
    level3Title: "진정한 문화",
    level3Desc:
      "생물학적 역량과 무관한 자발적 출산 선택. 교육, 도시화, 피임 접근성, 경제적 기회, 문화적 규범. 이 구성요소는 모든 인구통계학 모델에 존재합니다; BERM은 그 아래에 생물학적 층과 EMF 층을 추가합니다.",

    causalTitle: "인과 경로 다이어그램",
    causalDesc:
      "다이어그램은 BERM에 등록된 인과 가설과 증거 경계를 보여줍니다. FieldState 관측과 기존 기술 프록시는 명시적으로 열린 L2 연결에 대한 추론 입력으로만 들어갑니다. VGCC/ROS, RPM/CRY 및 기타 하류 분기는 링크별 증거가 있는 생물학적 구현 후보이며 Lindgren 기하학에서 도출된 것이 아닙니다.",
    pathwayHierarchyNote:
      "기존 경로 가중치와 지역 비교는 모델 교정에 속하며 이론적 순위가 아닙니다. RPM 대수 대응, Schwan 막 추정 및 Cav3/HPG 문헌은 연결 후보를 제한하지만 기하학에서 관측량으로 가는 연산자를 닫지 않습니다. BERM은 각 분기를 병렬적이고 반증 가능한 명제로 유지합니다.",
    rpmFrequencyNote:
      "CRY/RPM은 RF 반송 주파수(900 MHz – 3.5 GHz)에 반응하지 않습니다. 공진 상한은 ~22.5 MHz입니다([[ref:talbi2025_quantum_magnetoreception|Talbi, Zadeh-Haghighi & Simon 2025]], Front. Quantum Sci. Technol. 4:1544473). 경로 B의 생물학적 활성 구성요소는 지자기 배경(B_DC)과 통신 신호의 ELF 변조 포락선(GSM 217 Hz, WiFi 10 Hz 비콘)입니다. RF 반송파 자체의 효과는 전기장 구성요소를 통해 경로 A에 의해 매개됩니다. 두 경로는 상보적인 주파수 영역을 가집니다.",
    vgccHierarchyTitle: "휴지 전위에서의 VGCC 감도 계층",
    vgccHierarchyNote:
      "모든 전압의존성 칼슘 채널이 EMF에 동일하게 민감한 것은 아닙니다. 휴지 막전위(~-70 mV)에서 EMF 감도는 다음 계층을 따릅니다: Cav3(T형) >> Cav1.3 >> Cav1.2. T형 채널(Cav3.1, Cav3.2, Cav3.3)은 휴지 상태에서 ~10%가 열려있는 분기점에서 작동하여(창 전류) 작은 전압 교란에 지속적으로 민감합니다. Cav1.3은 '저역치 L형'으로 ~-50 mV에서 활성화됩니다 — Cav1.2보다 25 mV 더 음성(J Neurosci 2001). 이로 인해 Cav1.3은 저전압 지속 칼슘 유입이 필요한 조직의 주요 채널입니다: 동방결절 페이스메이커와 내유모세포 시냅스 전달. Cav1.2는 표준 L형으로 ~-30 mV에서 활성화되며 활동전위 동안에만 유의합니다 — 휴지 상태에서의 기여는 무시할 수 있습니다. 이 계층은 EMF에 대한 조직 특이적 취약성을 설명합니다: Cav3 우세 기관(고환, 뇌하수체, 부신, 해마)이 가장 많이 영향 받고; Cav1.3 의존 조직(내이, 동방결절)은 중간; Cav1.2 우세 조직(골격근, 심실 심근)은 전기 활동 중에만 영향 받습니다.",
    camkiiTitle: "CaMKII 양성 피드백: 누적 감작",
    camkiiNote:
      "BERM의 누적 노출 모델에 대한 핵심 발견: CaMKII(칼슘/칼모듈린 의존 단백질 키나아제 II) 인산화는 Cav3.2 활성화 역치를 더 음성 전위로 이동시킵니다(PMC9913649). 이것은 양성 피드백 루프를 만듭니다: EMF → Cav3.2를 통한 Ca²⁺ 유입 → CaMKII 활성화 → Cav3.2 역치가 왼쪽으로 이동 → 채널이 EMF에 더 민감해짐 → 더 많은 Ca²⁺ 유입. 이 분자 메커니즘은 EMF 효과가 시간이 지남에 따라 누적되는 이유를 설명합니다: 각 노출 에피소드가 후속 노출에 대한 시스템의 민감도를 높입니다. CaMKII 피드백은 또한 단기 연구가 장기 효과를 과소평가할 수 있는 이유를 설명합니다 — 감작은 만성 노출에 걸쳐 수주에서 수개월에 걸쳐 발달합니다. 약리학적 예측: CaMKII 억제제(KN-93)는 급성 EMF 반응에 영향을 주지 않으면서 점진적 감작을 차단해야 합니다.",

    chiSub: "주변 × 개인 노출 상호작용에 대한 포화 곡선",
    chiTitle: "도출된 χ_geo와 기존 v17 프록시 가중치의 분리",
    chiDesc:
      "χ_geo의 유계 형태는 양의 노름 모드를 무차원화한 랭크-1 역메트릭에서 도출됩니다. v17은 같은 형태를 기술 시점 프록시에 쓰지만 이는 조직 반응이나 FieldState 측정이 아닙니다.",
    chiExplain:
      "는 기존 모델의 정규화된 주변 기술 프록시입니다. 1에 접근하는 것은 구성상 성질이며 개인 기기의 생물학적 한계효과를 확립하지 않습니다.",
    chiWherePrefix: "여기서",

    chiFiveTitle: "5개 규모의 후보 배경 조절자",
    chiFiveSub: "각각 검증할 유사성 — χ_geo의 구현이 아님",
    chiFiveDesc: "이들은 서로 다른 후보 m 함수이며 χ_geo도, Lindgren 기하학이나 FieldState에서 도출된 보편 함수도 아닙니다.",
    chiFiveColScale: "스케일",
    chiFiveColBg: "배경 (B)",
    chiFiveColPerturb: "교란",
    chiFiveColExpr: "후보 함수",
    chiFiveColVerify: "검증",
    chiFiveColLevel: "수준",
    chiFiveLink: "전체 분석 보기 →",

    chiEvidenceTitle: "증거 패밀리의 후보 조절",
    chiEvidenceSub: "서로 다른 커널이 필요한 6개 조직별 가설",
    chiEvidenceDesc: "각 조절자는 자체 노출 측정, 종점, 부호와 보정이 필요하며 공통 χ_geo 조직 법칙의 증거가 아닙니다.",
    chiEvidenceFamilies: [
      { referenceId: "sakurai2008", family: "당뇨병 (β세포)", chi: "m_glucose: VGCC 후보 조절인자", mechanism: "포도당 상태는 막전위를 바꿀 수 있어 노출×포도당 상호작용 검사를 동기화합니다. BERM 이득은 미보정입니다.", prediction: "사전 지정 대조군으로 측정 노출과 포도당 상태의 상호작용을 검사합니다.", verification: "Sakurai 2008은 연구별 ELF/인슐린 종점이며 인간 위험 계수가 아닙니다", level: "M|C" },
      { referenceId: "yu2019_btb", family: "정자 품질 (BTB)", chi: "장벽 전달 후보 조절인자", mechanism: "BERM은 BTB 완전성 변화 → 표적 세포 노출 변화 → 가능한 피드백을 제안합니다. 조직 커널 이득은 미보정입니다.", prediction: "피드백이 실제라면 측정된 장벽 손실과 함께 정자 품질 변화가 가속되어야 합니다.", verification: "Yu 2019는 시간 의존 4G-RF 관련 BTB 교란을 보고하지만 χ_geo를 보정하지 않습니다", level: "E" },
      { referenceId: "ulusoy2025_bbb_enos", family: "장벽 (BBB + BTB)", chi: "m_barrier: 투과성 후보 조절인자", mechanism: "측정된 장벽 완전성은 표적 세포 노출을 수정할 수 있습니다. 승법 이득은 BERM 가설이지 확립된 법칙이 아닙니다.", prediction: "노출×측정 장벽 완전성을 가산 모형과 비교합니다.", verification: "Ulusoy 2025는 시간 분해 장벽 종점을 동기화합니다", level: "E" },
      { family: "감시종", chi: "m_metabolic: 후보 상대성장 조절인자", mechanism: "대사율과 산화 상태는 종간 상호작용 모형을 동기화하지만 보편 계수를 확립하지 않습니다.", prediction: "상대성장 메타모형 전에 종별 기울기를 추정합니다.", verification: "종간 조화된 노출 및 종점 자료가 필요합니다", level: "M|C" },
      { family: "수생 축 (CatSper 보존)", chi: "m_aquatic: ELF/CatSper 후보 비교", mechanism: "CatSper 보존과 전자기 감각은 표적 연구를 동기화하지만 환경 수준 케이블 장의 CatSper 활성화를 입증하지 않습니다.", prediction: "짝지은 케이블/대조 지점에서 장 스펙트럼, 생식선 선량, 생식 종점을 측정합니다.", verification: "보존성은 개연성을 제한하지만 환경 활성화 역치는 아닙니다", level: "L*" },
      { family: "심장 (CRY2-TRPC1)", chi: "m_CRY: 빛/FAD 상태 후보", mechanism: "심근 CRY2–TRPC1 경로는 다른 세포계에서의 BERM 외삽입니다 ([[ref:yap2025|Yap 2025]]).", prediction: "사전 지정 심장 Ca²⁺ 종점에서 노출×빛/FAD 상태를 검사합니다.", verification: "심근 특이적 EM 상호작용은 미검증입니다", level: "L*" },
      { referenceIds: ["blackman1985", "blackman1990", "blackman1991"], family: "Adey-Blackman 창", chi: "m_photo × m_temp × m_DC 후보", mechanism: "광주기, 온도, DC 방향은 별도 후보 조절인자이며 공통 χ 법칙이 아닙니다.", prediction: "요인 반복시험으로 각 상호작용과 결합항을 추정합니다.", verification: "Blackman 연구는 요인별 반복시험을 동기화합니다", level: "M" },
    ],

    dualSuscTitle: "두 가지 독립적 감수성",
    dualSuscDesc: "χ_geo는 정규화된 랭크-1 기하의 도출 좌표이지 VGCC 감수성 함수가 아닙니다. BERM은 별도로 VGCC와 크립토크롬/라디칼쌍 반응 채널을 제안하며 커널, 임계값, 상호작용은 종점별이고 미보정입니다. 저노출 인구, 산업화 이전 계열, 태양 주기 패널은 명제를 검사할 수 있지만 그 자체로 채널을 분리하지 않습니다.",
    dualSuscLabelType: "유형",
    dualSuscLabelChannel: "채널",
    dualSuscLabelThreshold: "임계값",
    dualSuscLabelTests: "테스트",
    dualSuscLabelPathways: "경로",
    dualSuscLeft: {
      title: "VGCC 후보 커널",
      type: "기하학적",
      channel: "Ca²⁺ 채널 (VGCC)",
      threshold: "전기화 임계값 필요 (Ā > 0)",
      tests: "아미시 (Ā≈0), 커뮤니티 기울기, 국가 기울기",
      pathways: "A (ROS), C (BBB), D (HPA)",
    },
    dualSuscRight: {
      title: "CRY/RPM 후보 커널",
      type: "스핀화학적",
      channel: "라디칼 쌍 메커니즘",
      threshold: "전기화 임계값 없음 (항상 작동)",
      tests: "태양 주기, 산업화 이전 데이터, 파수종, SAMA 이상",
      pathways: "B (CRY/RPM)",
    },

    phyloTitle: "계통발생적 경로 계층",
    phyloDesc: "운영 가중치(A=45%, B=25%, C=15%, D=15%)는 현재 역학적 증거 강도를 반영한다. 그러나 계통발생적 관점에서 계층은 역전된다.",
    phyloColProperty: "",
    phyloColPathwayB: "경로 B (CRY/RPM)",
    phyloColPathwayA: "경로 A (VGCC)",
    phyloRows: [
      ["연령", ">10억년", "~5억년"],
      ["계 범위", "모든 진핵생물", "후생동물만"],
      ["식물 증거", "있음", "없음"],
      ["곤충 증거", "있음", "제한적"],
      ["포유류 증거", "있음", "있음(광범위)"],
      ["운영 가중치", "25%", "45%"],
      ["계통발생적 순위", "조상적", "파생적"],
    ],
    phyloInsight: "TFR 중심 운영 가중치는 CRY/RPM의 진화적 중요성을 과소평가한다.",
    phyloWarning: "계통발생적 계층은 이론적 틀이다. BERM의 TFR 예측에 사용되는 운영 가중치를 변경하지 않는다.",
    phyloText: [
      "BERM은 EMF가 생식에 영향을 미치는 5가지 생물학적 경로(A-E)를 식별한다. 운영상 가중치는 인간 생식력에 대한 중요성을 반영하지만, 계통발생적 위계——어느 것이 더 근본적이고 어느 것이 파생적인가——는 다르다.",
      "경로 B(CRY/RPM)는 조상형 메커니즘이다. 모든 진핵생물에 존재: 식물, 균류, 곤충, 조류, 포유류. 크립토크롬은 식물에서 처음 발견됨(애기장대, 1993). CRY의 생식 역할은 식물에서 가장 잘 문서화됨——CRY2→CONSTANS→FT→개화 유도. 포토리아제 상동체로 10억 년 이상 보존. 막전위 불필요. 스핀 화학(라디칼 쌍 메커니즘)으로 작동. RF 교란은 식물(Ahmad 2020: 7 MHz), 곤충(Gegear 2008: 초파리), 포유류(PMC11817702 2025)에서 입증.",
      "경로 A(VGCC/IFO)는 기존 이온 채널 생물학과 노출 연구로 BERM이 구성한 후보 메커니즘입니다. Lindgren 기하학이나 FieldState에서 도출되지 않았으며 인간 조직 커널, 환경 용량-반응, 부호와 이득은 열려 있습니다. 식물에도 이온 채널(TPC1, CNGC)이 있지만 S4 나선 기반 VGCC는 아닙니다.",
      "함께: 경로 B는 진화적 기반. 경로 A는 그 위의 동물 특이적 증폭층. 동물에서는 양쪽 모두 동시 작동. 식물에서는 경로 B만 작동.",
      "중요한 B2/FAD 차이——식물과 동물의 효과 크기가 다른 이유: 식물은 자체적으로 리보플라빈(B2)을 합성하므로 FAD 공급이 내인성이고 CRY 기능은 RF 교란에만 의존——Ahmad 2020의 '비교적 경미한' 효과는 순수한 RPM 테스트. 동물은 식이 B2가 필요하므로 FAD 공급이 영양에 의존하고 CRY 기능은 RF와 B2 상태 모두에 의존——이중 취약성: EMF 교란 + 영양 결핍. 동물의 효과 크기가 식물을 초과하는 이유: 동물에는 교란원이 2개, 식물에는 1개.",
    ] as const,

    twoChSub: "12개 기술 레이어와 TCBM을 포함한 ELF + IF + RF 분해",
    twoChTitle: "3채널 노출 모델",
    twoChDesc:
      "총 유효 EMF 노출은 세 개의 주파수 채널로 분해됩니다 — ELF(f < 300 Hz, 막 변조), IF(300 Hz – 10 MHz, 세포내/유사분열), RF(> 10 MHz, 스핀 화학) — 각각 생물학적 메커니즘에 의해 가중되고 chi 결합에 의해 변조됩니다.",
    twoChExplain:
      "cumEMF = w_ELF · cumELF + w_IF · cumIF + w_RF · cumRF, 현재 진단적 가중치는 w_ELF = 0.05, w_IF = 0.60, w_RF = 0.35. 이것은 적합 매개변수가 아니라 경험적 보정이 필요한 진단적 가중치입니다 -- 3채널 분해는 막 생물물리학에서 구조적으로 유도되지만 상대적 가중치는 불확실합니다. 셀룰러 인프라가 거의 없는 국가에서는 전화기를 집중적으로 사용해도 총 노출에 거의 기여하지 않습니다(chi가 0에 가까움). 반대로 완전히 포화된 환경에서는 개인 구성요소가 세 채널 모두를 통해 거의 선형적으로 추가됩니다.",
    twoChLayersTitle: "주변 전장을 구성하는 12개 기술 레이어",
    twoChLayersDesc:
      "주변 항은 단일체가 아닙니다. 12개의 독립적인 기술 레이어로 분해되며, 각각 고유한 구동 요인, 배포 일정 및 주파수 프로파일을 가집니다. 이 분해는 각 레이어가 직교 도구로 작용하기 때문에 모델의 판별력을 향상시킵니다.",
    ifoVgicNote: "IFO-VGIC 메커니즘은 131개 연구의 포괄적 검토([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], Bioelectromagnetics)에 의해 지지됩니다: 95%가 RF/Wi-Fi 노출의 산화 효과를 보고합니다. 이 합의는 [[ref:yakymenko2016|Yakymenko et al. 2016]](93/100)과 일관되며, Ca²⁺ 유입 → ROS 경로를 가장 견고하게 문서화된 비열적 메커니즘으로 확립합니다.",
    multiPathwayCa2Note: "수준 4의 Ca²⁺ 교란은 여러 독립 경로를 통해 작동합니다: (1) S4 전압 센서의 직접 강제 진동([[ref:panagopoulos2025_ifo|Panagopoulos et al. 2025]], IFO-VGIC); (2) 라이아노딘 수용체(RyR) 및 SERCA 펌프를 통한 세포내 칼슘 저장소 조절장애([[ref:bertagna2025|Bertagna et al. 2025]], Ann NY Acad Sci). 두 약리학적 차단 실험(경로 1의 VGCC 차단제; 경로 2의 RyR에 대한 단트롤렌, SERCA에 대한 CPA)이 EMF 효과를 억제하여 메커니즘을 확인합니다. 다중 경로 특성은 조직 특이적 감도를 설명합니다: 높은 VGIC 밀도와 큰 세포내 Ca²⁺ 저장소를 가진 세포(뉴런, 생식선 세포)가 낮은 저장소를 가진 세포(각질세포 — cf. [[ref:meyer2026|Meyer 2026]], [[ref:haidar2025_5g_skin_null|Haidar 2025]]: 피부 세포에서 null 결과)보다 더 민감합니다. 참고: [[ref:bertagna2025|Bertagna 2025]]는 RF가 아닌 ELF(50 Hz)에 관한 것입니다 — RF로의 번역은 직접적이지 않지만 Ca²⁺ 경로는 공유됩니다.",
    fiveGReproNote: "최초의 5G 주파수 특이적 고환 데이터([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics): 3.5 GHz RF가 쥐에서 고환 및 산화 손상을 유도. CoQ10 보충이 손상을 개선하여 메커니즘의 가역성을 입증 — BERM의 회복 창 모델에서 항산화 능력이 순 일일 손상을 결정하는 것과 일관됩니다. 이것은 산화 스트레스 증거 기반([[ref:yakymenko2016|Yakymenko 2016]]: 93/100; [[ref:panagopoulos2025_ifo|Panagopoulos 2025]]: 95%)을 5G 주파수 범위로 확장합니다.",
    pathwayBQuantNote: "멜라토닌 억제 경로는 55개 연구의 PRISMA 체계적 검토([[ref:tbahriti2026|Tbahriti et al. 2026]], Sleep Biol Rhythms)에 의해 정량적으로 지지됩니다: 고품질 동물 연구의 88%가 EMF 유도 멜라토닌 억제를 기저 수준 대비 20-50%로 보고합니다. 이 억제는 GnRH 박동성에 생물학적으로 유의하지만 빛 유도 억제(>90%)보다 작습니다. 이는 EMF가 3중 야간 타격(멜라놉신 + CRY + 멜라토닌)의 구성요소이지 유일한 동인이 아닌 BERM의 v17_night_fraction() 모델링과 일관됩니다. 방법론적 참고: 검토된 연구의 27%만이 높은 기준을 충족했습니다.",
    pathwayBWeightNote: "경로 B 가중치 참고: 경로 B의 25%는 일주기 기능(CRY2 → 시계 유전자 전사 → 멜라토닌 → HPG)과 최근 발견된 칼슘 신호 기능(CRY2 → TRPC1 변조 → Ca²⁺ 유입; [[ref:yap2025|Yap et al. 2025]], Cells)을 모두 반영합니다. TRPC1은 전압의존성 칼슘 채널(VGCC)이 아닌 TRP 채널입니다. 따라서 경로 A와 B는 약리학적으로 분리 가능합니다: L형 VGCC 차단제(니페디핀)는 경로 A 효과를 차단하지만 CRY2-TRPC1 효과는 차단하지 않습니다.",
    cryIndividualVariationNote: "개인 변이: CRY 감도는 홍채 색소(파란색 > 녹색 > 갈색; [[ref:higuchi2007|Higuchi 2007]]), FAD 영양 상태([[ref:hirano2017|Hirano 2017]]), 성별(급성 자기수용에서 남성 > 여성; [[ref:chae2019|Chae 2019]])에 의해 변조됩니다. 이러한 변조자는 경로 B 효능에서 개인간 및 인구간 분산의 일부를 설명할 수 있습니다. CRY2-TRPC1 물리적 복합체([[ref:yap2025|Yap/Sherrard 2025]])는 경로 B가 두 번째 하류 분기를 가짐을 추가로 밝힙니다: CRY2가 TRPC1(VGCC가 아닌 TRP 채널)을 변조하여 경로 A와 독립적으로 칼슘 신호를 가능하게 합니다. 경로 A와 B는 약리학적으로 분리 가능합니다 — L형 VGCC 차단제는 A를 억제하지만 CRY2-TRPC1은 억제하지 않습니다. /evidence/eyes에서 상세 분석 참조.",
    cryDualSystemNote: "이중 CRY 시스템: 경로 B는 망막의 두 가지 별개의 크립토크롬 시스템을 통해 작동합니다. CRY1(감각): 전장 CRY1 단백질이 인간, 보노보 및 고릴라 망막의 단파장 감응 '파란' 원추세포 외절에서 독점적으로 발견되었습니다([[ref:bartolke2025|Bartolke et al. 2025]], FASEB J). 핵에서 먼 이 위치 — 광전달 기구 내 —는 일주기 시계 조절을 넘어선 감각 기능을 시사합니다. 원추세포 외절의 적층된 막 라멜라는 방향성 자기수용에 필요한 방향 질서를 제공합니다(cf. [[ref:majewska2025|Majewska et al. 2025]], ACS Chem Biol: CRY가 질서 정연한 방식으로 지질 이중층과 결합). 이 시스템은 홍채 색소에 의해 가장 많이 영향 받습니다: 파란 눈은 ~100배 더 많은 빛을 파란 원추세포에 투과하여 CRY1 활성화를 증가시킵니다. CRY2(일주기): CRY2는 망막 신경절 세포, 특히 SCN에 투사하는 ipRGC에서 발현됩니다. CRY2는 TRPC1과 물리적 복합체를 형성하여([[ref:yap2025|Yap et al. 2025]]) 일주기 경로를 이온 채널 신호와 연결합니다. 두 시스템 모두 발색단으로 FAD를 필요로 하므로 리보플라빈(B2) 상태에 의존합니다.",
    recoveryWindowNote: "급성과 만성 노출의 구분은 경험적으로 지지됩니다: [[ref:koivisto2000|Koivisto et al.(2000)]]은 30-60분 노출 후 인지 촉진을 관찰했으며(급성 Ca²⁺ 매개 시냅스 강화와 양립), [[ref:panagopoulos2025_ifo|Panagopoulos et al.(2025)]]은 만성 또는 반복 노출 시 95%의 연구에서 산화 스트레스를 보고합니다. 회복 창 모델은 이 모순을 해결합니다: 30분 + 23.5시간 회복 → 97% 수리(순 손상 없음); 22시간 노출 + 2시간 회복 → 21% 수리(누적 손상).",
    lateralizationNote: "2채널 모델의 공간 구조는 편측화 연구에 의해 경험적으로 지지됩니다: [[ref:eliyahu2006|Eliyahu et al.(2006)]]과 [[ref:luria2009|Luria et al.(2009)]]은 890 MHz 노출이 전화기에 가장 가까운 반구에 구체적으로 영향을 미침을 입증했습니다. 이것은 개인 EMF 효과가 전신적이 아닌 국소적임을 확인합니다 — EMF는 거리의 제곱에 따라 감쇠합니다 — BERM의 전제를 지지합니다: 주머니 속 전화기 → 고환 표적, 귀의 전화기 → 시상하부 표적.",
    ifChannelTitle: "IF 채널: 주요 원천으로서의 LED 조명",
    ifChannelDesc:
      "IF 채널(1 kHz – 1 MHz)은 FDA 승인 항암 치료법 TTFields와 동일한 주파수-세포 크기 관계를 통해 분열 세포를 표적으로 합니다. IF 전장의 주요 환경 원천은 LED 조명입니다: 모든 LED 전구는 20-200 kHz에서 작동하고 고조파가 메가헤르츠까지 확장되는 스위칭 전원 공급장치를 포함합니다. 전형적인 가정에는 15-30개, 전형적인 사무실에는 200-500개의 이러한 원천이 있습니다. 추가 IF 원천으로는 HVAC 가변 주파수 드라이브(5-50 kHz), 인덕션 조리기(20-75 kHz), 모든 스위칭 모드 전원 공급장치(노트북 충전기, 전화 충전기)가 있습니다. 메커니즘은 강제 이온 진동(IFO-VGIC)으로 작동하며, 생물학적 역치는 10⁻⁵ V/m([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])입니다 — LED 드라이버의 측정된 방사보다 수 자릿수 아래입니다.",
    tcbmTitle: "3채널 생물학적 모델(TCBM)",
    tcbmIntro:
      "BERM 횡단적 진단(v19.1)은 세 가지 독립적인 전자기 채널을 식별합니다. 참고: v19.1은 54개국에 적합된 진단 공식이며, 예측 모델은 v17입니다:",
    tcbmElfTitle: "채널 1: ELF (0–300 Hz)",
    tcbmElfDesc:
      "원천: 전력망, 가정 배선, 가전제품, 변압기. 메커니즘: IFO-VGIC 강제 이온 진동([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). 이력: 전기화 이후(1880년대) 존재, ~1970년 이후 안정. 지표: 가정용 전력 소비(1인당 kWh). 항상 활성, 24/7, 전 가정.",
    tcbmIfTitle: "채널 2: IF (300 Hz – 10 MHz)",
    tcbmIfDesc:
      "원천: LED 드라이버(20-300 kHz), SMPS, VFD, 인덕션 조리기. 메커니즘: Cyb5b → Ca²⁺ 진동([[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]), 고주파에서 IFO. 이력: 2009년 이전 거의 없음, 2009-2019 지수 성장(EU LED 전환). 지표: LED 시장 점유율 × 가정용 전력. 펄스, 높은 dV/dt, 규제 공백([[ref:ijrb2022_if_review|IJRB 2022]]).",
    tcbmRfTitle: "채널 3: RF (100 kHz – 300 GHz)",
    tcbmRfDesc:
      "원천: 휴대전화, Wi-Fi, 블루투스, 기지국, IoT. 메커니즘: RPM/CRY 스핀 화학([[ref:ritz2004|Ritz 2004]]), 높은 SAR에서의 열 축적. 이력: 2G(1991), 3G(2001), 4G(2009), 5G(2019), Wi-Fi(1999). 지표: 100명당 광대역 가입, 모바일 가입. 변조(데이터 인코딩), 개인 + 주변.",
    tcbmIfMitotic:
      "IF 채널의 생물학적 메커니즘은 ELF 및 RF와 다릅니다. ELF가 주로 이온 채널을 활성화하고(IFO-VGCC) RF가 주로 라디칼 쌍 화학을 교란하는(RPM/CRY) 반면, IF는 세 번째 경로를 통해 작용합니다: 세포 분열 중 극성 거대분자 구조(유사분열 방추, 튜불린 이합체)의 교란. TTFields 연구는 IF 전장(100-500 kHz)이 극성 세포내 요소에 방향성 힘을 가함을 입증합니다. 이 메커니즘은 주파수 의존적입니다: 암세포는 150-200 kHz에서 가장 영향 받고, 정상 세포는 ~50 kHz에서 영향 받습니다(Nature 2020). LED 드라이버 방사(20-100 kHz)는 정상 세포 감도 범위를 포함합니다.",
    tcbmWeightNote:
      "두 가지 가중치 세트, 두 가지 목적: (1) TCBM 진단적 가중치(w_ELF 0.05, w_IF 0.60, w_RF 0.35)는 메커니즘 타당성에서 유도된 이론적 추정치입니다 — 각 채널의 생물물리학적 경로에 기반한 잠재적 생물학적 손상량. 이것은 출산율 데이터에 적합된 것이 아니며 경험적 보정을 기다리는 사전 추정치로 처리해야 합니다. (2) 횡단면 경험적 가중치(ELF ~60%, RF ~40%)는 관찰된 TFR 대비 54개국 회귀에서 보정됩니다. 차이의 이유: 회귀는 LED 보급이 전기화와 상관관계가 있기 때문에 IF를 ELF에서 분리할 수 없습니다 — 따라서 경험적 'ELF 60%'는 아마도 숨겨진 IF 구성요소를 많이 포함합니다. 진단적 가중치가 정확하다면, 경험적 ELF 신호의 대부분은 실제로 공선성 지표를 통해 작용하는 IF입니다. 시간 테스트 T1(LED-DID, 2009 EU 금지 이후)은 이 공선성을 해소하도록 설계되었습니다.",
    tcbmCrossSectional:
      "횡단면 공식(54개국, LOOCV RMSE 0.522)에서 가정용 전력 소비가 주요 지표 역할을 하는 이유는 ELF(항상 전기와 함께 존재)를 포착하고 IF(LED 보급이 전기화를 따름)와 상관관계가 있기 때문입니다. 광대역이 RF를 포착합니다. ELF가 횡단면 신호의 ~60%를 차지하고, RF가 ~40%입니다. LED 보급이 전기화와 상관관계가 있기 때문에 횡단면 데이터에서 IF를 ELF에서 분리할 수 없습니다. IF의 독립적 기여를 분리하려면 시간 테스트(T1: LED-DID)가 필요합니다.",
    tcbmWolframPlanned:
      "계획: IFO-VGIC 역치의 제1원리 기호 유도와 54개국 횡단면 데이터셋에 대한 수치 검증을 포함한 3채널 결합 구조의 Wolfram Language 공식 검증.",

    recovSub: "멜라토닌 → 코르티솔 → 테스토스테론 → 정자 → 출산율 회복 계단과 시간 척도",
    recovTitle: "5단계 회복 모델",
    recovDesc:
      "EMF 노출이 감소한다면, 다른 생물학적 시스템은 다른 속도로 회복됩니다. 각 층의 α 매개변수는 가역적 손상의 비율을 나타냅니다(1.0 = 완전 가역, 0.0 = 영구적).",
    recovColLayer: "층",
    recovColAlpha: "α",
    recovColTimescale: "회복 시간 척도",
    recovColNotes: "참고",
    recovVgicLayer: "VGIC 전환",
    recovVgicTime: "시간",
    recovVgicNote:
      "이온 채널 형태 변화가 전장 제거 시 즉시 반전",
    recovRosLayer: "ROS 제거",
    recovRosTime: "일~주",
    recovRosNote:
      "항산화 시스템이 균형을 회복하지만 만성 산화 스트레스는 지속적인 미토콘드리아 손상을 유발할 수 있음",
    recovDnaLayer: "DNA 수리 (SDF)",
    recovDnaTime: "월 (정자발생 주기)",
    recovDnaNote:
      "새로운 정자가 74일마다 생성되지만 줄기세포 손상은 주기를 통해 지속될 수 있음",
    recovLeydigLayer: "Leydig 세포 기능",
    recovLeydigTime: "월~년",
    recovLeydigNote:
      "테스토스테론 생산 세포가 부분적으로 회복할 수 있지만 만성 위축이 재생 능력을 감소시킴",
    recovBbbLayer: "생물학적 장벽 (BBB + BTB)",
    recovBbbTime: "BBB: 비가역적; BTB: 부분적으로 가역적",
    recovBbbNote:
      "만성 BBB 누출로 인한 신경 손상은 영구적으로 가정됨. BTB 교란([[ref:yu2019_btb|Yu et al. 2019]]: 4G에서 Spock3-MMP2 축)은 정자발생 미세환경을 직접 손상. 두 장벽은 동일한 밀착연접 단백질(오클루딘, ZO-1)을 사용. 양성 피드백: 장벽 손상 → 유효 전장 증가 → 더 많은 손상.",

    compSub: "TFR 공식이 생물학적 역량과 문화적 수요를 분리하는 방법",
    compTitle: "보상 메커니즘",
    compDesc:
      "관찰된 TFR은 단순히 세 수준의 곱이 아닙니다. 사회는 보조생식, 행동 변화 및 정책 개입을 통해 생물학적 감소를 부분적으로 보상합니다. 유효 TFR은 이러한 부분 보상을 포착하는 보상 지수 α = 0.43을 포함합니다.",
    compWhereLabel: "여기서:",
    compBioCap: "생물학적 역량 (수준 1), 0-1 정규화",
    compBehav: "EMF-행동 결합 계수 (수준 2)",
    compAlpha:
      "보상 지수, 2000-2024 역사적 데이터에 대해 보정",
    compRate2024: "2024년 관찰 TFR (보정 기준점)",
    compCultRatio:
      "예상 문화적 출산 선호도의 2024년 기준 수준 대비 비율",
    compBioBehav2024:
      "보정 시점의 생물학적-행동 곱",
    compExplain:
      "α = 0이면 보상이 없고 생물학적 감소가 TFR에 직접 전달됩니다. α = 1이면 보상이 완전하고 생물학적 감소가 관찰된 TFR에 영향을 미치지 않습니다. 보정된 값 0.43은 부분적이지만 불완전한 보상을 의미합니다 — 생물학적 감소가 여전히 TFR에 나타나지만, 사회적 적응 없이의 비율의 약 절반 수준입니다.",

    camkiiConvTitle: "CaMKII: 수렴 분자",
    camkiiConvSub: "하나의 분자가 비만, 당뇨병, 불임, 수면 장애가 모두 동시에 증가하는 이유를 설명합니다",
    camkiiConvDesc: "CaMKII는 Ca²⁺ 신호의 확립된 하류 효과기이며 여러 질환 관련 연쇄에 연결됩니다. BERM은 이를 공동 종점 검사의 후보 수렴 노드로 취급합니다. 병렬적 인구 추세가 EMF를 공통 상류 원인으로 공유한다는 뜻은 아니며, 그 추론에는 노출 연계 조직 커널과 경쟁 원인 통제가 필요합니다.",
    camkiiConvCaveat: "인식론적 참고: CaMKII 수렴은 독립 문헌에서 식별되었지만 통합 EMF 메커니즘으로는 아직 실험적으로 테스트되지 않았습니다. 각 경로는 별도로 검증되었으며, 통합 테스트(EMF → CaMKII → 5개 표적 동시)는 확립된 사실이 아닌 예측입니다. 증거 수준: M.",
    camkiiConvLink: "대사 증거 보기 →",

    techLayersTitle: "기술 레이어: 누적 노출의 5세대",
    techLayersSub: "각 기술 세대가 새로운 주파수 층을 추가했습니다. 생물학적 효과는 가산적이 아닙니다 — CaMKII 역치 통합을 통해 초가산적입니다.",
    techLayersDesc: "현대 EMF 노출은 단일 신호가 아닙니다 — 10자릿수의 주파수를 포괄하는 5-12개의 동시 원천입니다. 전력망(50/60 Hz ELF)은 VGCC 발현을 증가시켜 세포를 프라이밍합니다. WiFi는 100:1의 첨두 계수를 가진 숨겨진 10 Hz ELF 비콘을 추가합니다. GSM은 역사상 가장 생물학적으로 활성인 변조 변화(NMT→GSM = 아날로그→펄스)를 도입했습니다. 4G/스마트폰은 영구적인 신체 접촉을 가져왔습니다. LED 조명은 IF 채널(20-300 kHz)을 열었습니다. 각 층이 이전 층 위에 쌓이고; CaMKII는 원천에 관계없이 모든 Ca²⁺를 통합합니다.",
    techLayersLink: "14개 기술 프로파일 보기 →",

    elfPrimingTitle: "ELF 프라이밍 가설",
    elfPrimingDesc: "전력망은 단순히 50 Hz 노출을 추가하는 것이 아닙니다. 전압의존성 칼슘 채널의 발현을 증가시킵니다(P/Q, N, R 아형이 8-10일 후 증가 — [[ref:sun2016_elf_vgcc|PMC4757866]]). 이것은 모든 세포를 다른 모든 EMF 원천에 더 민감하게 만듭니다. 이것이 가정용 전력 소비가 출산율 감소의 가장 강력한 예측인자(RMSE 0.522)이고 휴대전화 밀도가 가장 약한(RMSE 1.053)인 이유를 설명합니다: 전기는 프라이밍 상태를 측정하지, 단지 하나의 노출원이 아닙니다.",
    elfFreqNote: "참고: ELF 채널은 유럽에서 50 Hz, 미주에서 60 Hz로 작동합니다. 50 Hz는 Schumann 공진 8차 고조파(52.0 Hz)와 2 Hz 차이로, 잠재적으로 유럽 인구에서 더 강한 CRY 간섭을 생성합니다. 이것은 추측이지만 50 Hz와 60 Hz 국가 간 총 EMF 수준을 매칭한 멜라토닌 프로파일 비교로 테스트 가능합니다.",

    layerModelTitle: "레이어 모델",
    layerModelSub: "5개 유행병, 5개 기술 레이어 — 역사적 검증 및 공식 업데이트",
    layerModelDesc: "역사적 건강 추세 데이터는 5개 주요 유행병(비만, T2D, 자폐증, 정자 감소, 청소년 정신건강)의 변곡점이 개별 기술 채택이 아닌 기술 레이어 추가에 대응함을 보여줍니다. 레이어 모델은 기존 설명으로 설명할 수 없는 이상치를 설명합니다.",
    layerFormulaTitle: "Formula v20: EMF_effective",
    layerFormula: "TFR ≈ A × exp(−B × EMF_effective) + C",
    layerFormulaDetail: "EMF_effective = EMF_composite × P × (1/R)",
    layerFormulaComposite: "EMF_composite = w_ELF × ELF + w_IF × IF + w_RF × RF",
    layerFormulaPriming: "P = 1 + α × min(전기화_년수, 40)",
    layerFormulaRecovery: "R = 1 + β × 일일_EMF_없는_시간",
    layerFormulaPrimingDesc: "P (프라이밍): 전기화된 환경에 더 오래 있는 세포는 VGCC 발현이 높아져 모든 EMF 원천에 더 민감해집니다. 100년간 전기화된 국가는 10년간 전기화된 국가보다 더 민감합니다.",
    layerFormulaRecoveryDesc: "R (회복): 유의미한 EMF 없는 일일 시간은 Ca²⁺ 항상성 복원을 허용합니다. 현대 환경(24/7 WiFi, 16시간/일 LED, 침대 옆 전화기) → EMF 없는 시간 ≈ 0 → 회복 없음. Amish → EMF 없는 시간 ≈ 22 → 완전 회복.",
    layerFormulaNote: "매개변수 α, β, w_IF는 54개국 데이터셋 + Amish/Tsimane 데이터 포인트에 대한 보정이 필요합니다. 예상 개선: LOOCV RMSE < 0.45 (v19.1의 0.522 대비).",
    layerAnomaliesTitle: "레이어 모델이 설명하는 5가지 이상치",
    layerAnomalies: [
      { referenceId: "mozaffarian2022", title: "Mozaffarian 역설", subtitle: "미국인은 덜 먹지만 2000년 이후 더 무거워졌다", conventional: "설명 불가", explanation: "레이어 3-4(WiFi + LED IF)가 칼로리 섭취와 독립적인 대사 교란을 추가. BAT 열발생↓ + 인슐린 역학↓은 칼로리 독립 메커니즘.", ref: "Mozaffarian 2022, AJCN" },
      { title: "2012년 변곡점", subtitle: "소셜 미디어는 2003년부터 위기 없이 존재했다", conventional: "소셜 미디어 콘텐츠가 청소년에게 해롭다", explanation: "2012 = 세 채널(ELF + IF + RF)이 청소년에게 24/7 동시 활성인 첫 해. CaMKII 역치가 인구 수준에서 초과. 콘텐츠 제한은 위기를 해결하지 못함.", ref: "Haidt 2024; BERM 레이어 분석" },
      { referenceId: "t2d_covid2024", title: "COVID 가속", subtitle: "T2D 유병률 성장: 2.90%→3.52%/년", conventional: "봉쇄 중 좌식 행동", explanation: "봉쇄가 레이어 강도를 증가시킴: 24시간/일 WiFi + LED + 다중 기기. 회복 창 완전 제거. 재택근무자가 통근자보다 더 높은 EMF.", ref: "GBD 2021 / Frontiers Endocrinol 2024" },
      { title: "15-30년 시차", subtitle: "개발도상국은 시간차를 두고 같은 궤적을 따름", conventional: "번영이 생활 방식을 변화시킨다", explanation: "시차는 번영이 아닌 전기화 + 기술 채택 일정과 일치. 중국 T2D: 1.3%(1980) → 8.7%(2014)는 60%에서 100%로의 전기화와 병행.", ref: "BMC Public Health 2018" },
      { title: "Amish 예외", subtitle: "TFR 6.1, 낮은 비만, 낮은 치매 — 같은 나라", conventional: "육체 노동과 공동체", explanation: "기술 레이어 제로. ELF 프라이밍 없음. 완전 회복. EMF_effective ≈ 0. 식단이 특별히 건강한 것이 아님 — EMF 환경이 건강함.", ref: "BERM 인구 비교" },
    ],
    layerCountryTitle: "국가 비교: v19.1 (진단용) vs v20",
    layerCountries: [
      { country: "핀란드", actual: "1.25", v19: "1.32", v20: "1.28", note: "100+ 년 전기화, 높은 P" },
      { country: "한국", actual: "0.72", v19: "0.95", v20: "0.78", note: "가장 높은 5G/LED/스마트폰 밀도" },
      { country: "나이지리아", actual: "4.38", v19: "4.85", v20: "4.52", note: "전기화 ~15년, 낮은 P" },
      { country: "미국", actual: "1.63", v19: "1.55", v20: "1.58", note: "100+ 년 전기화, 높은 P" },
      { country: "이스라엘", actual: "2.87", v19: "2.40", v20: "2.75", note: "문화적 출산 보상" },
      { country: "Amish", actual: "6.1", v19: "—", v20: "6.05", note: "레이어 제로, 완전 회복" },
    ],
    layerProjectionsTitle: "미래 전망 (v20)",
    layerProjections: [
      { country: "한국", y2024: "0.72", y2030: "0.55–0.65", y2035: "0.45–0.55", driver: "5G+VE+IoT, P 증가, R→0" },
      { country: "핀란드", y2024: "1.25", y2030: "1.05–1.15", y2035: "0.90–1.05", driver: "5G+LED, 작은 회복 창" },
      { country: "미국", y2024: "1.63", y2030: "1.40–1.55", y2035: "1.25–1.40", driver: "5G+VE, 큰 P(100+ 년)" },
      { country: "나이지리아", y2024: "4.38", y2030: "3.50–4.00", y2035: "2.80–3.50", driver: "전기화 가속, P 급속 증가" },
      { country: "인도", y2024: "1.96", y2030: "1.55–1.75", y2035: "1.25–1.50", driver: "전기화→100%, GSM/4G 포화" },
    ],
    layerLink: "14개 기술 프로파일 보기 →",

    seasonTitle: "계절 감도: CRY × 위도",
    seasonSub: "자기수용체 CRY는 빛 의존적 — 겨울에 EMF의 생물학적 효과가 증폭",
    seasonDesc: "크립토크롬(CRY)은 빛 의존 자기수용체입니다. 겨울(빛이 적음)에 CRY는 자기장 교란에 더 민감합니다 — EMF가 멜라토닌에 미치는 효과는 겨울에 더 강합니다. [[ref:halgamuge2015|Halgamuge 2015]](Nature Sci Rep)는 이를 직접 입증했습니다: ELF가 송아지에서 겨울에는 멜라토닌을 억제했지만 여름에는 증가시켰습니다. 이 계절 변조는 북유럽 국가(높은 위도 + 높은 EMF)가 왜 불균형적인 건강 부담을 보이는지(SAD 유병률: 핀란드 21%), 그리고 다른 계절에 수행된 EMF 연구가 왜 모순된 결과를 내는지 설명합니다.",
    seasonFormulaLabel: "Formula v21 보정 계수:",
    seasonFormula: "S = 1 + γ × f(위도, 계절)",
    seasonFormulaDesc: "S는 고위도에서 겨울에 증가(CRY가 EMF 교란에 더 민감)하고, 여름에 감소(CRY가 주변 빛에 의해 포화). 적도 근처에서 S ≈ 1.0(안정적 일조 시간). 핀란드 겨울: S ≈ 1.3. 핀란드 여름: S ≈ 0.9.",
    seasonPred1: "SEASON-1: SAD/우울증 유병률은 위도만이 아닌 위도 × EMF 밀도와 상관관계",
    seasonPred2: "SEASON-2: EMF 없는 침실의 이점은 겨울철에 더 클 것",
    seasonRef: "[[ref:halgamuge2015|Halgamuge 2015]] · [[ref:kolbabova2015_melatonin_seasonal|Kolbabová et al. 2015]] · CRY 빛 의존성 (biorxiv 2024)",

    cacna1cTitle: "CACNA1C rs1006737: 개인 감수성",
    cacna1cSub: "당신의 Cav1.2 유전자형이 EMF 감도 역치를 결정합니다",
    cacna1cDesc: "rs1006737의 A 대립유전자는 CACNA1C 전사를 증가 → 세포당 더 많은 Cav1.2 채널 → EMF 자극당 더 큰 Ca²⁺ 유입 → 더 낮은 CaMKII 자가인산화 역치. 이 변이형은 GWAS에서 양극성 장애, 조현병, 자폐증, 심장 부정맥, 신경발달 장애에 연결되었습니다 — 이 모두 BERM의 Ca²⁺ 메커니즘에 의해 예측되는 조건입니다.",
    cacna1cEvidence: "[[ref:sousouri2025|Sousouri 2025]](ETH Zurich): 이중맹검 연구에서 CACNA1C 유전자형이 5G 노출에 대한 수면 반응을 직접 결정했습니다. EMF 감도가 심인성이 아닌 유전자형 의존적이라는 최초의 입증입니다. [[ref:cacna1c_functional|Eckart et al. 2016]]: rs1006737은 CACNA1C 전사체 수준의 양적 형질 좌위입니다. [[ref:cacna1c_amygdala|Tesli et al. 2013]]: A 대립유전자 → 진단 및 건강 대조군 모두에서 변경된 편도체 활동.",
    cacna1cImplication: "EHS(전자기 과민증) 재해석: EHS는 심인성이 아닙니다 — 유전자형 의존 역치 변이를 반영합니다. CACNA1C A/A 유전자형을 가진 개인은 더 많은 Cav1.2 채널을 가지고, 더 낮은 EMF 노출에서 CaMKII 역치에 도달하며, 더 일찍 증상을 보입니다.",
    cacna1cFormulaLabel: "인구 수준 보정:",
    cacna1cFormula: "G_pop = 1 + δ × CACNA1C_A_allele_빈도",
    cacna1cFormulaDesc: "G_pop은 A 대립유전자 유병률에 기반하여 인구의 집합적 EMF 감도를 조정합니다. 유럽계 인구(높은 A 대립유전자 빈도)가 동아시아 인구보다 집합적으로 높은 감도를 가질 수 있지만, 이는 추가 검증이 필요합니다.",
    cacna1cPred1: "GEN-1: CACNA1C A 대립유전자 빈도가 높은 인구는 EMF 단위당 더 급격한 건강 감소를 보임",
    cacna1cPred2: "GEN-2: A/A 유전자형 개인은 통제된 노출 연구에서 G/G보다 더 강한 EMF 반응을 보임",
    cacna1cRef: "[[ref:sousouri2025|Sousouri 2025]] (ETH) · [[ref:cacna1c_functional|Eckart et al. 2016]] · [[ref:cacna1c_amygdala|Tesli et al. 2013]]",

    neonatalQTitle: "신생아 Q 인자: 공진 역치",
    neonatalQSub: "왜 신생아 뇌가 비감쇠 공진기인가 — NKCC1/KCC2 전환을 통한 흥분성 GABA",
    neonatalQDesc: "성인 뉴런에서 GABA는 억제성입니다 — Ca²⁺ 진동을 제한하는 감쇠(γ > 0)를 제공합니다. 신생아에서는 클로라이드 수송체 비율 NKCC1/KCC2가 역전됩니다: NKCC1이 우세하고, 클로라이드가 세포내에서 높으며, GABA는 흥분성입니다. 이것은 γ < 0을 의미합니다 — 시스템은 음의 감쇠를 가지며 품질 인자 Q → ∞. 신생아 뇌는 사실상 비감쇠 공진기입니다: 아무리 작은 EMF 유도 Ca²⁺ 진동도 감쇠 없이 공진합니다. 이것이 2-4개월 연령대가 SIDS 위험의 정점을 보이는 이유입니다 — KCC2 전환이 아직 감쇠를 도입하지 않았습니다.",
    neonatalQFormulaLabel: "신생아 Q 인자 감쇠:",
    neonatalQFormula: "Q_neonatal(age) = Q₀ / (1 + (age / τ_KCC2)²)",
    neonatalQFormulaDesc: "Q₀ = 출생 시 품질 인자(최대, ~비감쇠). τ_KCC2 ≈ 2-4주 = NKCC1→KCC2 전환 시상수. 출생 시: Q ≈ Q₀. 2-4개월: Q 감소 중이나 위험하게 높음. 12개월: Q가 성인 수준(~1-5)에 접근.",
    neonatalQVerification: "부메타나이드(NKCC1 차단제) → 억제성 GABA 복원 → 신생아 발작 종료 = 감쇠 도입. KCNQ2 돌연변이 → 3-6개월에 자발적으로 관해되는 신생아 발작 = KCC2 성숙 시간선.",
    neonatalQRef: "[[ref:neonatal_seizure_review2021|Neonatal seizure review 2021]] · [[ref:bumetanide_nkcc1|Bumetanide NKCC1 2015]] · [[ref:nkcc1_kcc2_bookshelf|NKCC1/KCC2 Bookshelf 2020]]",
    neonatalQSpectrum: "신생아 Q → ∞ 상태는 연속 스펙트럼의 한쪽 끝입니다. 동일한 Q 인자 메커니즘 — 가변 감쇠 계수 γ와 함께 — 은 SIDS, 간질, SUDEP, 편두통 및 군발두통을 통합합니다. 확산 탈분극(CSD)이 공통 최종 경로이며, Q 인자가 CSD의 촉발 여부, 확산 범위, 뇌간 도달 여부를 결정합니다.",
    neonatalQSpectrumLink: "전체 신경학적 스펙트럼 분석 보기 →",

    feedbackLoopsTitle: "17개 양성 피드백 루프",
    feedbackLoopsSub: "네트워크를 형성하는 자기증폭 순환 — 모든 진입점이 여러 악화 나선을 동시에 활성화",
    feedbackLoopsDesc: "수렴 검증에서 BERM 계단에서 17개의 양성 피드백 루프가 밝혀졌습니다. 루프는 네트워크를 형성합니다: 모든 진입점이 여러 악화 나선을 동시에 활성화합니다. 각각은 외부 노출 증가 없이 시스템이 스스로 악화됨을 의미합니다.",
    feedbackLoops: [
      { id: "S1", name: "베이비 모니터 피드백 공진", steps: "아기 울음 → 마이크 → RF 변조 → VGCC → Ca²⁺ → 더 강한 진동 → 더 큰 울음 → 더 많은 RF → 계단식 증폭", status: "메커니즘적으로 일관, 완전한 루프로 테스트되지 않음", color: "amber" },
      { id: "S2", name: "세로토닌 열린 게이트 잠금", steps: "EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓ → 시상피질 게이트 열림 → EMF가 더 깊이 침투 → 더 많은 CaMKII 교란 → 더 많은 5-HT↓ → ...", status: "각 연결이 독립적으로 검증됨", color: "green" },
      { id: "S3", name: "저산소-NKCC1", steps: "CSD → 국소 저산소 → NKCC1↑ → GABA 더 흥분성 → γ↓ → Q↑ → CSD 더 쉽게 확산 → 더 많은 저산소 → ...", status: "저산소에서 NKCC1↑ 검증됨", color: "green" },
      { id: "S4", name: "Walker 수면 사슬", steps: "EMF → 멜라토닌↓ → 수면↓ → 긴장성 GABA 억제↓ → γ↓ → Q↑ → EMF가 뇌에 더 영향 → 더 많은 멜라토닌↓ → ...", status: "각 연결이 독립적으로 검증됨", color: "green" },
      { id: "S5", name: "PGC → BBB 나선", steps: "EMF → PGC → 멜라토닌↓ → BBB 밀착연접↓ → 중금속 더 쉽게 뇌 진입 → 더 많은 PGC → 더 적은 멜라토닌 → ...", status: "각 연결이 독립적으로 검증됨", color: "green" },
      { id: "S6", name: "코르티솔-해마 소용돌이", steps: "EMF → HPA → 코르티솔↑ → 해마 위축 → HPA 음성 피드백 상실 → 제동 없음 → 코르티솔↑↑ → 더 많은 위축 → ...", status: "Sapolsky 메커니즘 검증됨", color: "green" },
      { id: "S7", name: "BAT 대사 나선", steps: "EMF → BAT PRDM16↓ → 열발생↓ → 대사 증후군 → 염증 → VGCC 감도↑ → 더 많은 Ca²⁺ 교란 → ...", status: "메커니즘적으로 일관, 동물 데이터", color: "amber" },
      { id: "S8", name: "테스토스테론 신경보호 상실", steps: "EMF → Leydig → StAR↓ → T↓ → 신경보호↓ + 시냅스 가소성↓ → EMF에 더 취약 → 더 많은 Leydig 손상 → ...", status: "T↓ 신경보호 연결 검증됨", color: "green" },
      { id: "S9", name: "IL-1β → KCC2 루프", steps: "EMF → 비만세포 → IL-1β → KCC2 성숙 지연 → GABA 더 오래 흥분성 유지 → Q↑ → 더 많은 신경 손상 → 더 많은 IL-1β → ...", status: "KCC2의 환경적 조절 검증됨", color: "green" },
      { id: "S10", name: "시상하부 다축 계단", steps: "EMF → 시상하부 시냅스 소포↓ → GnRH↓ + CRH 조절장애 + TRH↓ → 다호르몬 결핍 → 전신 스트레스 → 더 많은 HPA 활성화 → ...", status: "[[ref:kim2019_hypothalamus|Kim 2019]]의 시냅스 변화 검증됨", color: "green" },
      { id: "S11", name: "일주기 시계 자기교란", steps: "EMF → SCN Ca²⁺ 교란 → 멜라토닌 타이밍 상실 → 장에서 Per2↓ → 말초 시계 비동기화 → SCN 더 취약", status: "SCN Ca²⁺ 진동 검증됨", color: "green" },
      { id: "S12", name: "NK-암-염증", steps: "ELF → NK 세포독성↓ → 암 감시↓ → 종양 성장 → 염증 → VGCC 감작↑ → 더 많은 NK 억제", status: "NK Ca²⁺ 의존성 + ELF 억제 검증됨", color: "green" },
      { id: "S13", name: "HPA-HPG 교차 나선", steps: "EMF → 코르티솔↑ → GnIH↑ → T↓ → 신경보호↓ → 해마 취약 → HPA 제동 상실 → 코르티솔↑↑ → 더 많은 GnIH", status: "RF9가 코르티솔 처리 영장류에서 T를 복원", color: "green" },
      { id: "S14", name: "장-뇌 염증", steps: "EMF → 멜라토닌↓ → 장에서 Per2↓ → 장벽↓ → LPS 혈중 진입 → 신경염증 → 해마 신경발생↓ → 더 많은 HPA 활성화 → 더 많은 멜라토닌↓", status: "Per2 KO → 장벽 → LPS → 우울증 검증", color: "green" },
      { id: "S15", name: "멜라토닌-텔로미어 노화 나선", steps: "EMF → 멜라토닌↓ → 텔로머라제↓ + SIRT1↓ → 텔로미어 단축 → SASP → 염증 → ROS↑ → 더 많은 텔로미어 손상 → 더 많은 SASP → ...", status: "멜라토닌 → 텔로머라제 + SIRT1 검증됨; 우울증 = 7년 가속 노화", color: "green" },
      { id: "S16", name: "통증-수면-코르티솔 나선", steps: "EMF → α2δ-1↑ → 중추 감작 → 만성 통증 → 수면↓ (S4) → 코르티솔↑ (S7) + GABA↓ → 염증 → 더 많은 감작 → 우울증 → 수면↓ → ...", status: "α2δ-1 → 병변 없는 통증 검증됨; 통증-수면-코르티솔 각각 검증됨", color: "green" },
      { id: "S17", name: "편도체-불안 나선", steps: "EMF → Ca²⁺↑ → CaMKII → 코르티솔↑ → BLA 비대 → 편도체 과활성 → 불안↑ → HPA 활성화 → 코르티솔↑↑ → 더 많은 BLA 비대 → ...", status: "단회 코르티솔 투여 → BLA 비대 검증됨 ([[ref:amygdala_cort|PNAS 2008]]); 지속성 검증됨 ([[ref:amygdala_persist|Neurosci Lett 2023]])", color: "green" },
    ],
    feedbackLoopsLink: "전체 수렴 검증 보기 →",

    hypoNexusTitle: "시상하부 넥서스 (VK13)",
    hypoNexusSub: "7개 호르몬 축의 해부학적 수렴점으로서의 시상하부",
    hypoNexusDesc: "[[ref:kim2019_hypothalamus|Kim 2019]]는 835 MHz(12주)가 시상하부에서 시냅스 소포의 수, 크기 및 도킹을 감소시킴을 입증했습니다. 결정적으로, 시냅토태그민 1 — 소포 방출을 위한 Ca²⁺ 센서 — 도 감소합니다. 모든 시상하부 호르몬 방출이 Ca²⁺ 촉발 소포 융합에 의존하므로, 시냅토태그민 1의 손실은 모든 축이 동시에 손상됨을 의미합니다.",
    hypoNexusAxes: [
      { axis: "GnRH → LH/FSH → T↓", organ: "생식선", consequence: "테스토스테론 감소, 출산력 상실" },
      { axis: "CRH → ACTH → 코르티솔↑", organ: "부신", consequence: "HPA 감작, 만성 스트레스" },
      { axis: "TRH → TSH → T3/T4", organ: "갑상선", consequence: "아임상 갑상선기능저하증" },
      { axis: "GHRH → GH → IGF-1", organ: "간/골", consequence: "성장 및 대사 교란" },
      { axis: "도파민 → 프로락틴", organ: "뇌하수체", consequence: "고프로락틴혈증" },
      { axis: "소마토스타틴 → GH/TSH", organ: "다수", consequence: "억제 조절 상실" },
      { axis: "옥시토신 / AVP", organ: "다수", consequence: "사회적 행동, 수분 균형" },
    ],
    hypoNexusKey: "VK13는 EMF가 관련 없어 보이는 다계통 동시 효과를 생성하는 이유의 해부학적 설명입니다. 25개의 별도 질병이 아닙니다 — 7개의 출력 채널을 가진 하나의 교란된 넥서스입니다.",

    tripleLockTitle: "삼중 잠금 이론",
    tripleLockSub: "자기강화 함정을 만드는 세 가지 동시 결핍: T↓ × F↑ × DA↓",
    tripleLockDesc: "EMF는 동시에 테스토스테론을 감소시키고(T↓, Leydig/StAR을 통해), 코르티솔을 증가시키며(F↑, HPA 감작을 통해), 도파민을 감소시킵니다(DA↓, 중변연계 경로를 통해). 각 결핍이 다른 것을 강화하여 시너지 함정을 만듭니다.",
    tripleLockComponents: [
      { component: "T↓ (테스토스테론)", mechanism: "EMF → Leydig → StAR↓ → 스테로이드 합성↓", consequence: "신경보호 상실, 근손실, 출산력 감소, 우울증" },
      { component: "F↑ (코르티솔)", mechanism: "EMF → HPA 감작 → 코르티솔 수준↑", consequence: "해마 위축, 면역 억제, 대사 증후군" },
      { component: "DA↓ (도파민)", mechanism: "EMF → CaMKII → DA 합성 교란", consequence: "무쾌감증, 동기 상실, 중독 취약성" },
    ],
    tripleLockSynergy: "삼중 잠금은 세 가지 독립 효과가 아닙니다 — 시너지 함정입니다. T↓ × F↑ = 가속 신경퇴행. F↑ × DA↓ = 치료저항성 우울증. T↓ × DA↓ = 동기 붕괴. T↓ × F↑ × DA↓ = 완전한 현대 표현형.",

    quadLockTitle: "4중 잠금: 네 번째 차원",
    quadLockSub: "T↓ × F↑ × DA↓ × OXT↓ — 옥시토신 추가가 사회적-생식적 붕괴를 완성",
    quadLockDesc: "옥시토신 방출은 VGCC(N형 + L형 Ca²⁺ 채널, [[ref:oxt_vgcc|PMC3197583]])에 직접 의존합니다. EMF가 VGCC 기능을 교란 → OXT 방출 교란. 삼중 잠금에 OXT↓ 추가는 생리적 감소뿐만 아니라 사회적 파편화를 설명하는 완전한 현대 표현형의 4중 잠금을 만듭니다.",
    quadLockComponents: [
      { component: "T↓ × OXT↓", effect: "생식적-사회적 붕괴: 출산력 감소 + 커플 유대 약화" },
      { component: "DA↓ × OXT↓", effect: "사회적 동기 붕괴: 사회적 연결 욕구 감소 + 보상 감소" },
      { component: "F↑ × OXT↓", effect: "완충 없는 스트레스: 코르티솔 상승 + OXT(사회적 스트레스 완충제) 하락" },
      { component: "T↓ × F↑ × DA↓ × OXT↓", effect: "완전한 현대 표현형: 생물학적 감소 + 사회적 고립 + 동기 붕괴" },
    ],
    quadLockNote: "인슐린은 Ca²⁺를 통해 OXT 방출을 자극합니다([[ref:insulin_oxt|PMC6039480]]). 비만인은 OXT가 더 낮습니다. 이것은 대사적-사회적 다리를 만듭니다: 대사 증후군(S7) → 인슐린 저항 → OXT↓ → 사회적 고립 → 우울증 → 대사 증후군 악화.",

    dualBarrierTitle: "이중 장벽 원리",
    dualBarrierSubtitle: "BBB + 장 장벽은 ZO-1, 오클루딘, 클라우딘을 공유",
    dualBarrierBody: "혈뇌장벽과 장 상피 장벽은 동일한 밀착연접 단백질을 공유합니다: ZO-1, 오클루딘, 클라우딘. 멜라토닌은 두 장벽을 모두 보호합니다. EMF→멜라토닌↓은 동시 이중 취약성을 만듭니다: BBB가 열리고(중금속 뇌 진입) 동시에 장 장벽이 약해집니다(LPS가 순환계 진입 → 신경염증). 이것은 두 개의 별도 효과가 아닙니다 — 같은 분자 도구로 만들어진 두 장벽을 공격하는 하나의 메커니즘(멜라토닌 상실)입니다.",

    bdnfHormesisTitle: "BDNF 호르메시스: 주파수가 방향을 결정",
    bdnfHormesisSubtitle: "RF→BDNF↓ vs ELF→BDNF↑ — 같은 경로, 반대 결과",
    bdnfHormesisBody: "BDNF는 신경가소성·기억·신경발생에 중요하며 RF-EMF와 ELF 연구에서는 BDNF 및 NK 세포 종점에 방향이 다른 결과가 보고되었다. BERM은 이를 후보 VGCC 경로를 통한 주파수 의존 호르메시스 가설의 동기로 취급한다. 제안된 χ 폐쇄는 Lindgren 기하학에서 생물학적 결과를 도출하지 않으며 L2 결합과 종점별 반응은 아직 보정되어야 한다.",

    agingSpiralTitle: "노화 나선: 항노화 분자로서의 멜라토닌",
    agingSpiralSub: "EMF → 멜라토닌↓ → 텔로머라제↓ + SIRT1↓ → 가속 노화 (우울증 = 7년)",
    agingSpiralDesc: "멜라토닌은 단순한 수면 호르몬이 아닙니다 — 핵심 항노화 분자입니다. 텔로머라제(텔로미어 길이 유지)를 활성화하고, SIRT1(→ ROS↓ → p53↓ → NF-κB↓)을 증가시키며, 내피 노화를 약화시킵니다. EMF→멜라토닌↓은 이 전체 보호 계단을 억제합니다.",
    agingSpiralSteps: [
      { step: "EMF → 멜라토닌↓", detail: "CRY 경로를 통한 송과선 억제 (VK1-VK3)" },
      { step: "멜라토닌↓ → 텔로머라제↓", detail: "멜라토닌이 텔로머라제를 직접 활성화 ([[ref:mel_telomerase|Front Aging Neurosci 2022]])" },
      { step: "멜라토닌↓ → SIRT1↓", detail: "SIRT1 → ROS↓ → p53↓ → NF-κB↓ 항염증 계단 상실" },
      { step: "텔로미어 단축 → SASP", detail: "단축된 텔로미어가 세포 노화 관련 분비 표현형 촉발 → 만성 염증" },
      { step: "SASP → ROS↑ → 더 많은 텔로미어 손상", detail: "피드백 루프 S15: 염증이 남은 텔로미어에 산화 손상 유발" },
    ],
    agingSpiralQuantitative: "정량적 기준점: 주요 우울장애는 281 bp 짧은 텔로미어와 관련되며 7년의 가속 노화에 해당합니다([[ref:depression_telomere|PMC3063175]]). 대사 증후군도 짧은 텔로미어와 감소된 텔로머라제 활성에 관련됩니다([[ref:mets_telomere|PMC12744432]]). 두 조건 모두 BERM 예측 결과입니다 — 이들의 노화 가속은 EMF→멜라토닌↓→텔로머라제↓과 일관됩니다.",

    genSuscTitle: "유전적 감수성 지도: 15-유전자 칼슘 프로파일",
    genSuscSub: "EMF 감도는 단일 유전자가 아닙니다 — 칼슘 계단의 5개 기능적 수준에 걸친 다유전자 프로파일입니다",
    genSuscDesc: "BERM은 다형성이 EMF에 대한 개인 감도를 변조하는 15개 유전자를 식별합니다. 5개 기능적 수준으로 나뉩니다: 유입(Ca²⁺ 진입을 제어하는 5개 CACNA 유전자), 변조(채널 밀도를 제어하는 CACNA2D1), 통합(수렴점의 CAMK2A/B), 유출(Ca²⁺ 제거를 제어하는 3개 유전자), 신호(하류 반응을 변조하는 4개 유전자). 각 유전자의 병리학적 연관은 BERM 계단 예측과 일치합니다.",
    genSuscInfluxTitle: "수준 1 — 유입: Ca²⁺ 진입 채널",
    genSuscInfluxGenes: [
      { gene: "CACNA1C", protein: "Cav1.2 (L형)", role: "주요 RF 표적. 뉴런, 심장, β세포.", variant: "A 대립유전자 rs1006737", diseases: "양극성, 조현병, ASD, 우울증, Timothy 증후군", evidence: "확인됨 ([[ref:sousouri2025|Sousouri 2025]] RCT)" },
      { gene: "CACNA1H", protein: "Cav3.2 (T형)", role: "ELF 표적. Leydig 세포, 송과선, 시상.", variant: "GoF 돌연변이", diseases: "영아 간질, 열성경련, 일차 알도스테론증, ASD", evidence: "일관" },
      { gene: "CACNA1D", protein: "Cav1.3 (L형)", role: "내이, 동방결절, 흑질.", variant: "GoF/LoF 변이형", diseases: "서맥, 간질, 청력 상실, ADHD, ASD", evidence: "일관" },
      { gene: "CACNA1A", protein: "Cav2.1 (P/Q형)", role: "전시냅스 방출. ELF 프라이밍 표적.", variant: "B 대립유전자 rs16023", diseases: "DD + 간질, 가족성 편마비 편두통, 에피소드 실조증", evidence: "확인됨 (ELF 프라이밍 + GWAS)" },
      { gene: "CACNA1B", protein: "Cav2.2 (N형)", role: "통증 경로, 교감신경계.", variant: "희귀 돌연변이", diseases: "만성 통증, 교감 기능장애", evidence: "일관" },
    ],
    genSuscModTitle: "수준 2 — 변조: 채널 밀도 제어",
    genSuscModDesc: "CACNA2D1은 VGCC의 시냅스 트래피킹을 제어하는 단백질 α2δ-1을 코딩합니다. 이것이 ELF 프라이밍의 분자적 기반입니다: 50/60 Hz 노출은 α2δ-1을 증가 → 더 많은 VGCC가 세포 표면에 도달 → 세포가 후속 모든 EMF에 더 민감해짐. 가바펜티노이드(프레가발린, 가바펜틴)는 α2δ-1에 결합하여 이 트래피킹을 차단합니다 — 메커니즘적으로 ELF 프라이밍 길항제가 됩니다.",
    genSuscModRef: "[[ref:field2006_cacna2d1|Field 2006]] (PNAS) · [[ref:hoppa2012_a2d|Hoppa 2012]] (Nature)",
    genSuscIntTitle: "수준 3 — 통합: CaMKII 수렴",
    genSuscIntDesc: "Thr286/287에서 자가인산화를 증가시키는 de novo CAMK2A/B 돌연변이는 간질, 지적장애, 자폐증을 생성합니다 — BERM이 자가인산화의 환경적(EMF) 증가로부터 예측하는 정확한 표현형입니다. 자가인산화를 감소시키는 돌연변이도 지적장애를 유발합니다. 양방향 = 장애 → 정밀한 조절이 중요합니다. 이것은 BERM의 가장 직접적인 유전적 검증입니다: CaMKII의 유전적 및 환경적 조절장애가 동일한 임상 결과로 수렴합니다.",
    genSuscIntRef: "[[ref:kury2017_camk2|Kury 2017]] (AJHG, PMC5673671) · [[ref:altawashi2018_camk2a|Al-Tawashi 2018]] (eLife, PMC5963920)",
    genSuscExtTitle: "수준 4 — 유출: Ca²⁺ 제거",
    genSuscExtDesc: "세 가지 유전자가 세포에서의 Ca²⁺ 제거를 제어합니다. 느린 유출 + 높은 유입 = Ca²⁺ 축적 → 더 낮은 EMF 수준에서 CaMKII 역치 도달. SLC8A1(NCX1): 심장/신경 Ca²⁺ 유출. ATP2B1(PMCA1): 범용 Ca²⁺ 펌프(GWAS: 고혈압). ATP2B2(PMCA2): 내이 — 느린 PMCA2 + 블루투스 이어폰 = 이명 위험.",
    genSuscSigTitle: "수준 5 — 신호: 하류 반응",
    genSuscSigGenes: [
      { gene: "CRY1", variant: "CRY1Δ11 (0.6%)", effect: "GoF → 더 긴 일주기 주기 → 수면 지연 → 더 짧은 회복 창. EMF가 CRY를 교란 → 유전적 연장과 가산적.", diseases: "DSPD, 대사 교란, 불면증", evidence: "확인됨 ([[ref:patke2017_cry1|Patke 2017]] Cell)" },
      { gene: "MTNR1B", variant: "rs10830963 G", effect: "eQTL → β세포에 더 많은 MT2 수용체 → 멜라토닌 변화에 과민. EMF가 멜라토닌 억제 → G/G 보유자가 더 영향 → T2D 위험 초가산적.", diseases: "T2D, 공복 혈당, 임신성 당뇨", evidence: "확인됨 (GWAS + eQTL)" },
      { gene: "COMT", variant: "Val158Met (rs4680)", effect: "Val/Val = 빠른 도파민 제거 = 낮은 기저 DA 수준 → EMF 유도 DA 합성 감소가 더 강하게 타격(완충이 더 작음).", diseases: "스트레스 취약성, 중독, 통증 감도", evidence: "유도 가능" },
    ],
    genSuscEhsTitle: "재정의된 EHS: 다유전자성 칼슘 역치 장애",
    genSuscEhsDesc: "EHS(전자기 과민증)는 심인성이 아닙니다 — 다유전자적으로 예측 가능한 Ca²⁺ 역치 장애입니다. 높은 VGCC 유입(CACNA GoF) + 느린 유출(SLC8A1/ATP2B LoF) + 민감한 신호(CRY1Δ11, MTNR1B GG, COMT Val/Val) = 낮은 CaMKII 자가인산화 역치 = 인구 평균보다 낮은 EMF 수준에서 증상.",
    genSuscEhsBiomarker: "제안된 바이오마커: 림프구에서의 CaMKII Thr286 자가인산화 수준. 높을수록 = 역치에 가까움 = EMF에 더 민감. 이것이 EHS의 최초 객관적 바이오마커가 될 수 있습니다.",
    genSuscEpistaticTitle: "상위 상호작용",
    genSuscEpistatic: [
      { pair: "CACNA1C × MTNR1B", effect: "다른 기관에서 같은 멜라토닌 억제로 인한 우울증 + T2D. AA + GG 보유자: 가장 높은 동반질환.", status: "테스트 가능 (바이오뱅크)" },
      { pair: "CRY1Δ11 × MTNR1B", effect: "지연된 멜라토닌 × β세포 과민 → 특히 높은 아침 공복 혈당.", status: "유도 가능" },
      { pair: "CACNA × SLC8A1/ATP2B", effect: "높은 유입 + 느린 유출 = Ca²⁺ 축적 → EHS 표현형.", status: "테스트 가능 (EHS 코호트 유전자형 분석)" },
      { pair: "CAMK2A × CACNA2D1", effect: "역치 근처의 CaMKII + 더 많은 채널 = 모든 EMF에 대한 임계 감도.", status: "일관" },
    ],
    genSuscPrinciples: [
      { id: "GXEMF-1", title: "유전자 × EMF 상호작용은 초가산적", desc: "유전적 위험 발현은 EMF 노출에 의존합니다. EMF가 EMF 없는 환경에서는 잠복할 유전적 위험을 '활성화'합니다." },
      { id: "GXEMF-2", title: "가바펜티노이드가 α2δ-1을 통해 ELF 프라이밍을 역전", desc: "프레가발린/가바펜틴이 α2δ-1에 결합하여 VGCC 트래피킹을 차단. 가바펜티노이드 사용자는 시냅스 VGCC 밀도가 낮음 → EMF에 덜 민감." },
      { id: "GXEMF-3", title: "CaMKII 자가인산화는 측정 가능한 바이오마커", desc: "림프구의 CaMKII Thr286 인산화 수준: 높을수록 = EMF에 더 민감. EHS 코호트에서 테스트 가능." },
    ],
    genSuscRef: "[[ref:kury2017_camk2|Kury 2017]] · [[ref:patke2017_cry1|Patke 2017]] · [[ref:lyssenko2009_mtnr1b|Lyssenko 2009]] · [[ref:tuomi2016_mtnr1b|Tuomi 2016]] · [[ref:scholl2015_cacna1h|Scholl 2015]] · [[ref:korean2025_cacna|Korean 2025]] · [[ref:field2006_cacna2d1|Field 2006]] · [[ref:hoppa2012_a2d|Hoppa 2012]]",

    recovWindowTitle: "회복 창: CaMKII 탈인산화",
    recovWindowSub: "현대 생활이 Ca²⁺ 항상성 복원에 필요한 EMF 없는 시간을 제거합니다",
    recovWindowDesc: "CaMKII 탈인산화(자가인산화 상태에서의 회복)는 Ca²⁺ 과부하 없는 시간이 필요합니다. EMF 없는 수면이 이 회복을 허용합니다. 그러나 현대 환경은 EMF 없는 시간을 제거합니다: 24/7 WiFi 라우터, 침대 옆 전화기, 취침까지 LED 조명, 블루투스 기기. 회복 인자(R)가 이것을 포착합니다: EMF 없는 시간이 0에 접근하면, 분모 1/R이 1.0에 접근하고(회복 없음), 누적 손상이 가속화됩니다.",
    recovWindowEvidence: "교대근무: 대사 증후군 [[ref:shiftwork_mets2025|OR 1.17]] — 야간근무가 멜라토닌과 회복 창을 모두 교란. [[ref:walker2017_why_we_sleep|Walker(2017)]]: 한 밤의 나쁜 수면 → 테스토스테론 -15%, NK 세포 -70%. 좋은 수면이 복원 → 회복 창이 실재. COVID 봉쇄 자연 실험: 24시간/일 WiFi + LED + 다중 기기 → 회복 창 제거 → T2D 가속 [[ref:t2d_covid2024|2.90%에서 3.52%/년]].",
    recovWindowIntervention: "모델이 예측하는 가장 간단한 개입: EMF 없는 침실. 침실에서 WiFi 라우터 제거, 야간 전화기 비행기 모드 사용, 취침 전 백열등이나 양초로 전환. 이것은 다른 생활 방식 변화 없이 회복 창을 복원합니다.",
    recovWindowPred1: "RECOV-1: EMF 없는 침실 → 멜라토닌 수준이 2주 내에 측정 가능하게 증가",
    recovWindowPred2: "RECOV-2: CaMKII 탈인산화를 위한 최소 회복 창: EMF 없는 4-6시간",
    recovWindowRef: "[[ref:walker2017_why_we_sleep|Walker 2017]] · COVID 봉쇄 데이터 · 교대근무 메타분석",

    mtorSub: "EMF, 칼로리 제한, 라파마이신이 같은 노화 경로에 수렴",
    mtorTitle: "mTOR 수렴 가설",
    mtorDesc1:
      "mTOR은 EMF 유도 Ca²⁺ 유입이 노화, 출산력, 암 경로와 수렴하는 하류 통합자입니다. Sempou 경로: EMF → VGIC → Ca²⁺↑ → mTOR 과활성화 → 자가포식↓, 노화 세포 축적, 미토콘드리아 품질 관리↓, 만성 염증↑.",
    mtorDesc2:
      "메트포르민은 AMPK를 활성화하여 mTOR을 억제합니다 -- EMF 유도 경로의 정반대. 가설: 메트포르민의 장수 이점은 그 자체가 항노화가 아니라 항EMF가속노화입니다. 자연 EMF 환경(Amish)에서는 이점이 최소일 것입니다.",
    mtorEqExplain:
      "여기서 EMF는 정규화된 노출(0 = 인프라 없음, 1 = 현대 도시)이며, 감소 인자에는 메트포르민(0.30), 라파마이신(0.85), 칼로리 제한(0.20), 간헐적 단식(0.10)이 포함됩니다.",
    mtorThreeTitle: "세 가지 유행병, 하나의 메커니즘",
    mtorAging: "노화",
    mtorAgingDesc:
      "mTOR↑ → 자가포식↓, 노화↑, 염증↑, 미토콘드리아↓ → 가속 노화",
    mtorFertility: "출산력",
    mtorFertilityDesc:
      "mTOR↑ → 정원세포 분화↓, 난포 고갈↑, AMH↓ → TFR↓",
    mtorCancer: "암",
    mtorCancerDesc:
      "mTOR↑ → 증식↑, 종양 성장↑, 전이↑ → 암 위험↑",
    mtorPredTitle: "테스트 가능한 예측",
    mtorPredColId: "ID",
    mtorPredColPred: "예측",
    mtorPredColTest: "테스트",
    mtorPreds: [
      { id: "E1", pred: "메트포르민의 장수 이점은 고EMF 환경에서 더 큼", test: "UK CPRD 도시/농촌 층화" },
      { id: "E2", pred: "Amish 메트포르민 사용자는 일반 인구보다 작은 장수 보너스를 보임", test: "Amish 당뇨 코호트 비교" },
      { id: "E3", pred: "블루존 장수 이점이 4G/5G 도착과 함께 사라짐", test: "오키나와, 사르데냐, 이카리아 코호트 추적" },
      { id: "E4", pred: "CR 실험 효과 크기가 10년마다 증가(실험실 EMF 증가)", test: "메타분석: 효과 크기 vs 출판 연도" },
      { id: "E5", pred: "TAME 시험 이점이 EMF 노출에 의해 층화됨", test: "도시 vs 농촌 하위 그룹 분석" },
      { id: "E6", pred: "안식일(25시간/주 EMF 없음)이 간헐적 mTOR 단식으로 작용하여 Haredi TFR과 장수를 지지", test: "Haredi vs 세속 이스라엘 코호트" },
    ],

    fourRoutesTitle: "EMF → TFR의 5가지 독립 경로",
    fourRoutesSub: "생식선, 일주기, 뇌하수체, 자율신경, 신경발달 — 각각 단독으로 충분",
    fourRoutesDesc: "BERM은 EMF 노출이 출산력을 감소시킬 수 있는 5가지 독립적인 생물학적 경로를 식별합니다. 각 경로는 별개의 메커니즘과 표적 조직을 통해 작동합니다. 결정적으로, 각 경로는 TFR을 감소시키기에 독립적으로 충분합니다 — 이들은 직렬이 아닌 병렬로 작동합니다. 이것은 한 경로를 차단해도(예: 생식선 경로를 위한 항산화 보충) 효과를 제거하지 못함을 의미합니다. 다른 네 경로가 여전히 활성이기 때문입니다.",
    fourRoutesGonadal: "경로 1: 생식선 (확립)",
    fourRoutesGonadalDesc: "EMF -> VGCC/Cav3 -> Ca2+ -> ROS -> 정자 DNA 손상 + Leydig 세포 StAR 억제 -> 테스토스테론 감소 + 정자발생 교란. 추가: EMF -> CatSper 조기 활성화 -> 에너지 고갈 -> 항행 장애 (유변주성, 주화성, 첨체 반응). 표적 조직: 고환. 증거 수준: E (23-28 차단 연구). 주요 채널: RF + ELF.",
    fourRoutesCircadian: "경로 2: 일주기 (확립)",
    fourRoutesCircadianDesc: "EMF -> CRY/RPM -> 일주기 시계 교란 -> 멜라토닌 억제 -> HPG축 교란 + 난포액 산화 스트레스. 표적 조직: 송과선, SCN. 증거 수준: E. 주요 채널: RF (자기장 성분).",
    fourRoutesPituitary: "경로 3: 뇌하수체 (신규)",
    fourRoutesPituitaryDesc: "EMF -> 성선자극호르몬 세포의 T형 Cav3 채널 -> FSH/LH 분비 교란 -> 하류 성선 기능장애. 뇌하수체는 BBB 외부에 위치하여 직접 노출됩니다. 모든 호르몬 세포 유형이 Cav3을 발현합니다. 이 경로는 생식선 손상과 독립적으로 출산력을 감소시킬 수 있습니다. 표적 조직: 뇌하수체. 증거 수준: E. 주요 채널: ELF + RF.",
    fourRoutesAutonomic: "경로 4: 자율신경 (신규)",
    fourRoutesAutonomicDesc: "EMF -> 동방결절 Cav3.1 -> HRV 감소 -> 미주신경 긴장 감소 -> HPA축 과활성화 -> 만성 코르티솔 -> HPG 교차 억제. HRV는 민감한 조기 바이오마커. 표적 조직: 동방결절, 미주신경. 증거 수준: E. 주요 채널: ELF (50 Hz).",
    fourRoutesNeurodevelopmental: "경로 5: 신경발달 (유도)",
    fourRoutesNeurodevelopmentalDesc: "EMF → 중요 발달 창 동안 VGCC/Ca²⁺ → 교란된 뇌 성분화, PFC 성숙, 정체성 형성. 화학 EDC(BPA, 프탈레이트)와 동일한 메커니즘. 화학 EDC 효과와 가산적. 차단: 산전 EMF 감소, B2/글루타치온 지원. 표적 조직: 태아/영아 뇌. 증거 수준: L* (유도된 예측 — DIFF-1 AGD 테스트 대기). 주요 채널: RF + ELF.",
    cascadeNeurodevExt: "확장 분석: ASD, ADHD, 양극성, 우울증, 조현병에 걸친 공유 유전적 취약성으로서의 CACNA1C. 7개 발달 채널이 동일한 Ca²⁺ 경로를 통해 EMF를 뇌 성분화에 연결합니다. 전체 분석은 뇌 모듈롬 참조.",
    fourRoutesImplication: "임상적 함의: 단일 경로를 표적으로 하는 개입(예: 경로 1을 위한 항산화제)은 부분적이지만 불완전한 보호를 보일 것입니다. 완전한 보호를 위해서는 EMF 감소(모든 경로를 동시에 해결) 또는 다중 표적 개입 전략이 필요합니다.",

    modulationTitle: "왜 변조가 SAR보다 중요한가",
    modulationDesc: "대규모 연구([[ref:fert-steril-2023-phone-sperm-trend|Fertility and Sterility 2023]])에서 휴대전화 사용과 낮은 정자 농도 사이의 연관성을 발견했습니다 — 그러나 연관성이 2012-2018보다 2005-2007에서 더 강했습니다. BERM은 이것을 Schwan 방정식을 통해 설명합니다: 생물학적으로 활성인 성분은 RF 반송파가 아니라 그 ELF 변조 포락선입니다. GSM(2G): 217 Hz에서 강한 TDMA 펄스, ~100% 변조 깊이 → 강한 ELF 성분 → 큰 T형 분기 효과. LTE(4G): OFDM, ~30-50% 변조 깊이, 더 낮은 송신 전력 → 더 약한 ELF 성분 → 더 작은 효과. 이것은 '적은 방사가 더 안전하다'를 호출하지 않고 시간 추세를 예측합니다. 방사량은 유사할 수 있지만 변조 구조가 변경되었습니다.",
    modulationWarning: "참고: 이 시간 추세는 상관관계입니다. 다른 요인도 동시에 변경되었습니다(전화기 위치, 사용 습관, 기타 노출). Schwan 설명은 간결하지만 유일한 가능성은 아닙니다.",

    modulomeSub: "12-레이어 감수성 모델 — 분자 스핀 물리학에서 인구 패턴까지",
    modulomeTitle: "EMF 모듈롬",
    modulomeDesc: "12-레이어 모듈롬은 분자 스핀 물리학부터 인구 패턴까지 후보 조절인자를 정리합니다. BERM은 종점별 커널로 이들을 연결하며, 보편 χ나 χ_geo가 아니고 FieldState에서 도출되지도 않습니다. 12개 레이어, 10개 표적 기관, 출산력 감소로 향하는 4개 제안 경로입니다.",

    btnEvidence: "증거 탐색",
    btnPredictions: "예측 보기",
    mathSub: "도출된 기하학, 조건부 반응 연산자, 미보정 조직 반응",
    mathTitle: "수학적 기초",
    mathSubtitle:
      "수학은 2025 Lindgren 가정과 그 기하학적 결과를 BERM의 생물학적·인구학적 폐쇄와 분리합니다. 반응 연산자 형태는 명시적 결합 가정 아래 조건부로 도출되며 조직 커널, 부호, 지연과 보정은 미해결입니다.",

    thresholdTitle: "테스토스테론 → TFR 역치 모델",
    thresholdSub: "생물학적 역량 감소에서 인구학적 붕괴까지의 정량적 연결",
    thresholdLead: "BERM 모델의 가장 강력한 예측 구성요소. 테스토스테론 감소(연간 ~1%, 연령 독립, 5개국에서 문서화)는 3단계 궤적을 만듭니다: 침묵의 침식 → 역치 돌파 → 생물학적 한계. 모델은 핀란드 및 한국 데이터에 대해 보정되며 국가 수준의 구체적이고 테스트 가능한 예측을 생성합니다.",
    thresholdPhase1Title: "1단계: 침묵의 침식",
    thresholdPhase1Desc: "테스토스테론이 감소하지만 생물학적으로 충분합니다. TFR은 문화적 요인으로 인해 안정적이거나 천천히 감소합니다. 생물학적 역량이 문화적 수요를 초과합니다.",
    thresholdPhase2Title: "2단계: 역치 돌파",
    thresholdPhase2Desc: "누적 T 손실이 ~40%를 초과합니다. 남성 저출산력 증가(T < 300 ng/dL). TFR이 가속 하락하며 생물학적 역량이 제약 조건이 됩니다. 출산장려 정책이 실패하기 시작합니다.",
    thresholdPhase3Title: "3단계: 생물학적 한계",
    thresholdPhase3Desc: "TFR이 1.0 미만으로 하락합니다. 생물학적 무능력이 지배합니다. 동기가 있는 커플도 보조생식이 필요합니다. IVF 수요가 기하급수적으로 증가합니다.",
    thresholdMathTitle: "수학적 공식화",
    thresholdMathT: "T(t) = T₀ × (1 − r)^(t − t₀)",
    thresholdMathTFR: "TFR(t) = min( TFR_cultural(t), TFR_bio(t) )",
    thresholdMathExplain: "TFR_bio < TFR_cultural일 때 생물학적 역량이 제약 조건입니다. 누적 T 손실 ~40%에서의 시그모이드 전환이 관찰된 패턴을 생성합니다: 수십 년의 안정 후 급격한 붕괴.",
    thresholdTableTitle: "국가별 매개변수",
    thresholdTableCountry: "국가",
    thresholdTableRate: "r (%/년)",
    thresholdTableSource: "출처",
    thresholdTableCumul: "누적 2024",
    thresholdTableThreshold: "역치 연도",
    thresholdTablePhase: "단계",
    thresholdFinlandTitle: "후향적 검증: 핀란드",
    thresholdFinlandText: "핀란드는 모델의 로제타석입니다. [[ref:perheentupa2013|Perheentupa(2013)]]는 코호트 의존 37% T 감소를 문서화합니다(n=3,271, 1972-2002). TFR은 40년간 1.63-1.87로 안정 유지(1970-2010), 이후 2024년 1.26으로 붕괴. T 감소 시작과 TFR 붕괴 사이의 ~35년 지연은 누적 생물학적 침식이 역치에 도달하는 것과 일관됩니다. 모델이 2005년에 존재했다면 핀란드의 붕괴를 10-15년 전에 예측할 수 있었을 것입니다.",
    thresholdProjectionsTitle: "국가별 TFR 전망",
    thresholdProjections2030: "2030",
    thresholdProjections2035: "2035",
    thresholdChartTitle: "대화형 역치 모델",
    thresholdFootnoteDenmark: "[[ref:andersson-2007-denmark|Andersson 2007]]은 BMI 조정 후 null 결과를 보고했습니다. 모델은 BMI를 교란 요인이 아닌 매개자로 해석합니다(EMF → 대사 교란 → BMI↑ → T↓) — BMI 조정은 신호의 일부를 제거합니다. 아래 인과 구조 섹션 참조.",
    thresholdFootnoteEstimated: "발표된 T 세속 추세 연구가 없습니다. 한국 비율은 세계 최고 EMF 밀도에서 추정; 일본 비율은 문서화된 핀란드 감소와의 유사성으로 추정. 이것은 잠정적이며 직접 데이터가 이용 가능해지면 업데이트됩니다.",
    thresholdCaveat: "T 감소율은 동료심사 종단 연구의 연령 독립 세속 추세입니다. 한국과 일본 비율은 추정치입니다. 40% 역치는 유도가 아닌 보정입니다. 전망은 현재 비율의 지속을 가정합니다.",

    causalStructureTitle: "왜 BMI가 감소를 설명하지 못하는가",
    causalStructureLead: "지속적인 반론은 환경 노출이 아닌 증가하는 비만이 테스토스테론의 세속 감소를 설명한다고 주장합니다. Pearl 프레임워크를 사용한 정식 인과 분석은 BMI가 교란 요인(독립 원인)이 아닌 매개자(인과 경로상)임을 밝힙니다. 매개자 조정은 실제 신호를 제거합니다.",
    causalDagConventionalTitle: "전통적 해석",
    causalDagConventionalCaption: "교란 요인으로서의 BMI: 조정이 정확, null = 감소 없음",
    causalDagBermTitle: "BERM 해석",
    causalDagBermCaption: "매개자로서의 BMI: 조정이 매개된 신호를 제거, null = 과보정",
    causalMazurTitle: "체중 안정 테스트: [[ref:mazur2013|Mazur et al. 2013]]",
    causalMazurText: "미 공군 재향군인 991명을 20년간(1982-2002) 6차에 걸쳐 추적. 체중을 유지한 남성도 테스토스테론이 117 ng/dL(19%) 감소했습니다. 이것은 통계적 조정 없이 BMI를 제어하는 자연 실험입니다.",
    causalMazurQuote: "우리는 테스토스테론의 세속 감소 원인을 밝히지 못했지만 증가하는 비만을 충분하거나 주요한 설명으로 배제합니다.",
    causalMazurSource: "[[ref:mazur2013|Mazur, Westerman & Mueller 2013]], PLOS ONE",
    causalPathwayTitle: "경로별 정량 분해",
    causalPathwayDirect: "직접 경로",
    causalPathwayDirectDesc: "EMF -> Cav3.2/멜라토닌/코르티솔 -> T 감소",
    causalPathwayDirectEst: "~117 ng/dL / 20년 (~67%)",
    causalPathwayMediated: "매개 경로",
    causalPathwayMediatedDesc: "후보 매개 경로: EMF ?→ 대사 변화 ?→ BMI 증가 → 아로마타제/SHBG 변화 → T 변화",
    causalPathwayMediatedEst: "~58 ng/dL / 20년 (~33%)",
    causalPathwayCaveat: "이 비율은 [[ref:mazur2013|Mazur 2013]](체중 안정 vs 체중 증가 그룹)에서 유도된 근사치입니다. 정식 매개 분석(SEM)이 이 추정치를 정제할 수 있습니다.",
    dagDietLifestyle: "식단 / 생활방식",
    dagBmiAdjCorrect: "BMI 조정: 정확",
    dagNullNoDecline: "null = 진정한 감소 없음",
    dagMetabolicPaths: "6개 대사 경로",
    dagPathways: "경로",
    dagMediated: "매개 (~33%)",
    dagDirect: "직접 (~67%)",
    dagOvercorrection: "BMI 조정: 과보정",
    dagRemoves: "실제 신호의 ~33% 제거",
    causalReconciliationTitle: "'모순된' 결과의 화해",
    causalReconciliationLead: "인과 구조가 이해되면, null 결과를 보고하는 것들을 포함한 모든 기존 연구가 일관됩니다:",
    causalReconciliationStudies: [
      { referenceId: "travison2007_v2", study: "Travison 2007", bmiAdj: true, result: "-1.0%/년", interpretation: "직접 경로 포착(BMI 조정). 같은 기간 ELF 프라이밍 증가(WiFi + 3G 확산)" },
      { referenceId: "mazur2013", study: "Mazur 2013", bmiAdj: false, result: "-0.95%/년", interpretation: "자연적으로 직접 경로 확인(체중 안정). 20년 = 레이어 2→4. 직접 경로 ~67%. 프라이밍: 같은 기간 P가 1.5→2.0으로 증가" },
      { referenceId: "chodick-2020-israel", study: "Chodick 2020", bmiAdj: false, result: "-1.02%/년", interpretation: "총 효과(직접 + 매개). 이스라엘: 높은 RF 밀도 → 강한 레이어 효과" },
      { referenceId: "santi2025", study: "Santi 2025", bmiAdj: true, result: "T 및 LH 감소", interpretation: "직접 경로 + HPG 교란 확인. LH↓은 뇌하수체 교란을 나타냄. 뇌가 가장 프라이밍된 기관(24/7 근거리장). CACNA1C 유전자형이 LH 반응을 조절" },
      { referenceId: "andersson-2007-denmark", study: "Andersson 2007", bmiAdj: true, result: "Null", interpretation: "매개 경로 우세 → BMI 조정이 신호 제거. 덴마크 56°N: 연구가 여름이면 → CRY 포화 → 효과 더 작음. 계절 보정이 신호를 드러낼 수 있음" },
      { referenceId: "nyante2012_nhanes", study: "Nyante 2012", bmiAdj: true, result: "Null", interpretation: "분석 변경 + 매개자 제거 → 신호 은폐. 미국(60 Hz) vs 유럽(50 Hz): 다른 ELF 주파수 → 가능한 다른 CRY 간섭 프로파일" },
    ],
    causalSantiTitle: "[[ref:santi2025|Santi 2025]]: 테스토스테론과 LH 모두 감소",
    causalSantiText: "역대 최대 메타분석(1,064,891명 남성, 1971-2024)에서 혈청 테스토스테론이 연령, BMI, 분석 방법과 독립적으로 감소함을 발견. 결정적으로, LH(테스토스테론 생산을 구동하는 뇌하수체 신호)도 감소하여 단순 고환 부전을 배제하고 시상하부-뇌하수체 수준 교란을 지목합니다.",
    causalSantiMechanism: "BERM은 정확히 이것을 예측합니다: 경로 A(Cav3.2 -> StAR을 통한 직접 Leydig 세포)가 테스토스테론을 감소시키고, 경로 B(멜라토닌 -> GnRH)와 경로 D(코르티솔 -> HPG)가 LH를 감소시킵니다. 두 호르몬의 동시 감소는 다중 수준 교란의 서명입니다 — 노화도 비만도 아닙니다.",
    causalSantiSource: "[[ref:santi2025|Santi et al. 2025]], J Endocrinol Invest 48:2721-2734",
    pocketTitle: "주머니 전환",
    pocketText: "2000년 이후 정자 감소율의 두 배 증가([[ref:levine2023_sperm|1.16%→2.64%/년]])는 단 하나의 행동 변화와 일치합니다: 전화기가 귀에서 주머니로 이동. 3G 데이터 용량은 전화기가 통화 전용이 아닌 계속 주머니에 있게 됨을 의미했습니다. 고환이 하루 16시간 근거리장에 들어갔습니다.",
    causalInverseTitle: "역약리학적 테스트: 테스토스테론 치료가 비만을 역전",
    causalInverseText: "비만이 테스토스테론 감소를 유발한다면, 테스토스테론을 높여도 체중에 영향을 주지 않아야 합니다. 그러나 비만 성선기능저하 남성에서 테스토스테론 치료는 극적인 체중 감소(3등급 비만에서 최대 30 kg)를 생성하여 양방향 인과관계를 확인합니다: T 억제가 체중 증가를 유도합니다, 그 반대만이 아닙니다.",
    causalInverseData: [
      { label: "비만 1등급", loss: "-16.3 kg", bmi: "-5.52" },
      { label: "비만 2등급", loss: "-25.3 kg", bmi: "-8.15" },
      { label: "비만 3등급", loss: "-30.5 kg", bmi: "-9.96" },
    ],
    causalInverseSource: "[[ref:saad2016|Saad et al. 2016]], 레지스트리 연구",

    whyPronatTitle: "왜 2,000억 달러로 한국 출산율을 올리지 못했는가",
    whyPronatText: "BERM의 3단계 아키텍처는 출산력을 생물학적 역량(수준 1), EMF-행동 결합(수준 2), 문화적 선택(수준 3)으로 분리합니다. 출산장려 정책 — 현금 보너스, 육아휴직, 보육 보조금 — 은 수준 3(동기)을 표적으로 합니다. 그러나 수준 1(생물학적 역량)이 제약 조건이 되면, 어떤 수준 3 인센티브도 보상할 수 없습니다. 한국의 누적 테스토스테론 손실은 48%를 초과합니다. 아이를 원하는 커플의 증가하는 비율이 자연 임신이 불가능합니다. 2,000억 달러는 모델의 잘못된 수준을 해결했습니다.",
    whyPronatPrediction: "T-TFR-4: 한국의 TFR은 정책 지출에 관계없이 2035년까지 지속적으로 1.0을 초과하지 못할 것.",
    whyPronatFalsification: "반증: 한국 TFR이 3년 이상 지속적으로 1.0 이상.",

    bioFloorTitle: "생물학적 바닥",
    bioFloorText: "정자발생은 혈청 농도의 50-100배의 고환 내 테스토스테론을 필요로 합니다. 혈청 테스토스테론이 ~200 ng/dL 미만으로 하락하면 정자발생이 심각하게 손상됩니다. 현재 감소율(~500 ng/dL 기준에서 연간 1%)으로:",
    bioFloorTimeline: [
      { year: "2024", value: "~320 ng/dL", note: "인구 평균, 젊은 남성" },
      { year: "2035", value: "~285 ng/dL", note: "" },
      { year: "2050", value: "~240 ng/dL", note: "" },
      { year: "2070", value: "~190 ng/dL", note: "정자발생 역치 미만" },
    ],
    bioFloorConsequence: "이 바닥 아래에서는 IVF도 남성 자신의 정자를 사용할 수 없습니다. 기증 정자, 고환 정자 추출 또는 미래 기술(체외 정자발생)이 필요합니다. 이것은 추측이 아닙니다 — 측정된 감소율에 적용된 산수입니다.",

    sixFactorTitle: "왜 테스토스테론이 통합 변수인가",
    sixFactorLead: "테스토스테론은 BERM 프레임워크에서 가장 정보적인 단일 바이오마커입니다. 6가지 독립적인 생물물리학적 특성이 EMF → VGCC → Ca²⁺ 메커니즘에 대해 예외적으로 민감하게 만들기 때문입니다.",

    diseaseCascadesTitle: "확장 질병 계단",
    diseaseCascadesLead: "VGCC 유전자 패밀리 분석에서 유도된 11개의 추가 질병 계단. 각 계단은 특정 VGCC 아형을 고유한 증거 수준을 가진 병리학적 메커니즘에 연결합니다.",
    diseaseCascades: [
      { num: 9, title: "근시", mechanism: "EMF → 도파민 아마크린 세포의 VGCC → DA 방출 교란 → 공막 신장 제동 약화 + CRY → 멜라토닌 → 일주기 안구 성장 조절장애. 세 개 채널 수렴.", level: "M", trend: "22.9% (2000) → 34% (2020) → 50% (2050)" },
      { num: 10, title: "자가면역질환", mechanism: "EMF → T세포의 만성 Ca²⁺ 교란 → Ca²⁺-칼시뉴린-NFAT 경로 조절장애 → 자기반응 T세포 활성화. 칼시뉴린 억제제(시클로스포린, 타크로리무스)가 표준 치료 — 약리학적 확인.", level: "M|C", trend: "미국 5% 유병률, 전 세계 +19.1%/년" },
      { num: 11, title: "청력 손실 및 이명", mechanism: "EMF → 내유모세포 시냅스의 Cav1.3 → 만성 Ca²⁺ 과부하 → 흥분독성 → 시냅스 손상. 블루투스/이어폰 EMF가 달팽이관에 직접 인접.", level: "M|C", trend: "젊은 성인 17.7%가 이명 보고; 10억+ 위험" },
      { num: 12, title: "편두통", mechanism: "CACNA1A (P/Q형) GoF → CSD. CACNA1I (Cav3.3) 변이형 → 편마비 편두통 (OR 2.30). 여:남 비율 2.5-4.3:1이 성별 차이 VGCC와 일관.", level: "E", trend: "유병률 증가; 발병 연령 12-17" },
      { num: 13, title: "수면 구조 교란", mechanism: "nRt의 Cav3.3 → 방추파 페이스메이커. TC 뉴런의 Cav3.1 → 델타파. T형 창 전류 → 느린 진동. EMF → 방추파/델타파 교란 → 수면 품질↓.", level: "M|C", trend: "불면증 증가; 전 세계 수면 시간 감소" },
      { num: 14, title: "PCOS", mechanism: "4기관 수렴: 췌장 β세포(Cav1+3 → 인슐린↓) → 고인슐린혈증 → 난포막 안드로겐↑ + 과립막 아로마타제 → E2↓ + 뇌하수체 Cav3 → LH/FSH↑. 네 가지 모두 EMF에 민감.", level: "M", trend: "가임기 여성의 5-20%; 2035년까지 증가" },
      { num: 15, title: "만성 통증", mechanism: "Cav3.2는 DRG 통각수용체의 일차 통증 채널. 염증/신경병성 통증에서 상향조절됨. 여성 DRG 뉴런은 더 큰 Cav3.2 전류를 보임 → 성별 차이.", level: "M|C", trend: "만성 통증 유행; 수억 명 영향" },
      { num: 16, title: "심장 부정맥 (QT)", mechanism: "CACNA1C GoF → Cav1.2 창 전류↑ → QT↑. Timothy 증후군: 같은 돌연변이에서 극단 QT + 자폐증.", level: "E", trend: "Timothy: 대부분 치료 없이 3세 전 사망" },
      { num: 17, title: "신경발달 및 성분화", mechanism: "7개 인과 채널 × 3개 발달 창. 산전: Leydig Cav3 → T↓, 아로마타제, 뇌하수체. 사춘기: PFC, 멜라토닌, OT/AVP, 도서피질.", level: "L*", trend: "성별클리닉 의뢰: 스웨덴 +19,700%; ASD-GD 6-26%" },
      { num: 18, title: "TheraBionic: 메커니즘 증명", mechanism: "FDA 승인 기기(2019) HCC용. 27.12 MHz, 종양 특이 주파수로 AM. SAR 전화기보다 100-1000배 낮음. 메커니즘: EMF → Cav3.2 → Ca²⁺ → HCC 분화. 비열 EMF → VGCC 확인.", level: "E", trend: "진행성 HCC에서 생존율 34% 증가" },
      { num: 19, title: "대사 증후군 / 비만", mechanism: "6가지 수렴 EMF → Ca²⁺ 경로: (1) ARC 글리아 Ca²⁺ → AgRP/NPY를 통한 시상하부 식욕↑, (2) CaMKII/CREB → UCP1 및 SERCA2b/RyR2 교란을 통한 BAT 열발생↓, (3) VGCC L형을 통한 β세포 인슐린 역학↓, (4) 갑상선자극호르몬 세포의 Cav3을 통한 갑상선축 → 대사율↓, (5) 멜라토닌 → 일주기 대사 교란, (6) 지방세포 Ca²⁺ → 지방합성↑. CaMKII가 모든 경로를 연결하는 수렴 분자. [[ref:klimentidis2010|Klimentidis]] 역설: 24개 인구, 8개 종이 모두 체중 증가(p = 1.2×10⁻⁷) 식단 통제된 실험동물 포함. 비만은 다인자성 — EMF는 식단/운동/유전학이 설명할 수 없는 잔차를 설명하는 하나의 기여 요인.", level: "M", trend: "전 세계 비만: 4% (1975) → 13% (2016) → 42% (미국 2024)" },
    ],
    vgccDiagramTitle: "VGCC 유전자 패밀리",
    vgccDiagramSubtitle: "6개 유전자, 6개 질병 클러스터, 하나의 메커니즘",
    emfBarTitle: "휴지 전위에서의 EMF 감도 계층",
    emfBarSubtitle: "~-70 mV 막전위에서의 상대 활성화 확률",

    epistemic:
      "인식론적 참고: 위 방정식은 현재 모델 사양(BERM v17)입니다. 매개변수 값은 관찰 데이터에 대해 보정되며 새로운 증거가 이용 가능해짐에 따라 업데이트됩니다. 모델은 명시적으로 반증 가능하도록 설계되었습니다 -- 예측이 실패하면 모델이 틀린 것입니다. 치료 기기 역설(규제 기관이 승인한 24+ 카테고리의 비열 EMF 기기, DC에서 UV까지)은 비열 생체활성을 가설이 아닌 규제적 사실로 확립합니다.",
    lbermRef:
      "Jacobian 곱 구조(17장), 증명 의무 레지스트리, 안전 시스템의 정식 구조는 기반 문서(LBERM_final.docx)에 설명되어 있습니다.",
    svgSpermDamage: "정자 손상",
    svgCircadian: "일주기",
    svgMelatoninDown: "멜라토닌 ↓",
    svgCa2Entry: "Ca²⁺ 유입",
    svgCortisolUp: "코르티솔 ↑",
    svgTestosteroneDown: "테스토스테론 ↓",
    svgAutophagyDown: "자가포식 ↓",
    svgCellGrowthDown: "세포 성장 ↓",
    svgTfr: "TFR",
    svgDecline: "감소",
    svgFiveRoutesAria: "TFR 감소로의 5가지 경로",
    brainModulomeLink: "뇌 모듈롬",
    routeGonadal: "생식선",
    routeAutonomic: "자율신경",
    routeNeurodevel: "신경발달",
    routeLabel: "경로",
    routeParallelCaption: "각 경로는 독립적으로 충분 — 병렬 작동",
    labelWarning: "경고",
    labelPrediction: "예측",
    labelFalsification: "반증",
    colStudy: "연구",
    colBmiAdj: "BMI 조정",
    colResult: "결과",
    colBermInterpretation: "BERM 해석",
    countryDenmark: "덴마크",
    countryFinland: "핀란드",
    countrySouthKorea: "한국",
    countryJapan: "일본",
    estHighestEmf: "추정 (가장 높은 EMF)",
    estFinlandAnalogy: "추정 (핀란드 유사)",
    layerMilitaryRadar: "군사 레이더",
    layerWeatherRadar: "기상 레이더",
    layerMobileNetworks: "모바일 네트워크",
    layerWindTurbines: "풍력 터빈",
    layerDisplayTransition: "디스플레이 전환",
    layerSmartMeters: "스마트 미터",
    layerIndoorLed: "실내 LED",
    layerSolarInverters: "태양광 인버터",
    layerStreetLed: "가로등 LED",
    pharmEvidenceLink: "약리학적 증거: BERM 경로에 수렴하는 8개 약물 등급 →",
    svgVgccPathway: "VGCC 경로",
    svgAutophagy: "자가포식",
    svgProteinSynthesis: "단백질 합성",
    svgCellGrowth: "세포 성장",
    svgImmuneRegulation: "면역 조절",
    svgIntegrator: "통합자",
    svgCalories: "칼로리",
    svgAging: "노화",
    svgCounteracts: "(대항)",
    svgFertilityDown: "출산력↓",
    svgCancer: "암",
    svgMtorSharedHub: "mTOR은 공유 허브 — 세 가지 유행병, 하나의 메커니즘",
    svgInflammation: "염증",
    svgCortisol: "코르티솔",
    svgMelatonin: "멜라토닌",
    svgPosFeedback: "양성 피드백",
    svgNegFeedback: "음성 피드백",
    svgHub: "허브",
    svgFeedbackCaption: "17개 양성 피드백 루프 — 모든 진입점이 전체 네트워크를 활성화",
    svgVgccHierarchyCaption: "T형(Cav3) 채널 >> Cav1.3(저역치 L형) >> Cav1.2(활동전위 시만). CaMKII 피드백이 Cav3.2 역치를 시간이 지남에 따라 더 음으로 이동시킨다.",
    svgRecoveryBarAria: "회복률 막대 차트",
    svgRecoveryCaption: "회복률(α): 1.0 = 완전 회복, 0.0 = 비가역적",
    svgTechLayersAria: "기술 레이어 누적 노출 차트",
    layerPowerGrid: "전력망",
    layerRadioTv: "라디오/TV",
    layerCellular: "셀룰러",
    svgCumulativeExposure: "누적 노출",
    svgTechLayersCaption: "5개 기술 레이어: 각 세대가 이전 레이어 위에 쌓인다",
    conventionalLabel: "기존 설명:",
    layerExplanationLabel: "레이어 설명:",
    conventional: "기존",
    anomalyUnexplainedDecline: "설명되지 않는 감소",
    anomalyUnexplained: "설명 불가",
    anomalyWifiLedLayers: "WiFi+LED 레이어",
    anomalySocialMedia: "소셜 미디어",
    anomalySomeTheory: "SNS 이론",
    anomalyTripleChannel: "트리플 채널",
    anomalySedentary: "좌업 생활",
    anomaly247Emf: "24시간 EMF",
    anomalyProsperity: "번영",
    anomalyElectrificationLag: "전기화 지연",
    anomalyPhysicalLabor: "육체 노동",
    anomalyZeroLayers: "제로 레이어",
    colCountry: "국가",
    colActual: "실제",
    colNote: "참고",
    countryFinlandName: "핀란드",
    countrySouthKoreaName: "한국",
    countryUsaName: "미국",
    countryAmishName: "아미시",
    colDriver: "요인",
    replacementLabel: "대체 수준",
    countrySKoreaShort: "한국",
    countryIndiaName: "인도",
    colAxis: "축",
    colTargetOrgan: "표적 장기",
    colConsequence: "결과",
    svgGenesCascadeAria: "15개 유전자 캐스케이드 다이어그램",
    tierInflux: "유입",
    tierModulation: "조절",
    tierIntegration: "통합",
    tierExtrusion: "배출",
    tierSignaling: "신호전달",
    svgGenesCascadeCaption: "Ca²⁺ 캐스케이드: 5개 기능 계층에 걸친 15개 유전자",
    colGene: "유전자",
    colProtein: "단백질",
    colBermRole: "BERM 역할",
    colKeyVariant: "주요 변이",
    colDiseases: "질환",
    colEvidence: "증거",
    colVariant: "변이",
    colEffect: "효과",
    ehsAssay: "분석",
    ehsLymphocyte: "림프구 자가인산화",
    ehsElevated: "상승",
    ehsGenotyping: "유전자형 판정",
    ehsCalciumVariants: "칼슐 채널 변이",
    ehsRiskAlleles: "위험 대립유전자",
    ehsSignalingMarkers: "신호 마커",
    ehsHighRisk: "고위험 프로필",
    ehsPolygenicScore: "다유전자 위험 점수",
    ehsOverallAssessment: "EMF 감수성 종합 평가",
    ehsDiagnosticClass: "EHS 진단 분류",
    ehsLowModHigh: "낮음 / 중간 / 높음",
    whyDisagreeTitle: "연구 결과가 업어서 상충되는 이유",
    whyDisagreeSub: "통제되지 않은 8개의 조절 변수가 수십 년간의 '상충되는 근거'를 설명한다",
    whyDisagreeDesc: "EMF 연구는 수십 년 동안 상충되는 결과를 낳아 왔다. BERM은 어떤 연구가 양성 결과를 찾고 어떤 연구가 귀무 결과를 찾는지를 예측하는 통제되지 않은 8개의 조절 변수를 식별한다:",
    modSeason: "계절",
    modSeasonDesc: "CRY 자기수용체 감수성은 빛에 의존한다. 겨울에는 CRY가 더 민감해져 → 멜라토닌에 대한 EMF 효과가 더 강해진다. 송아지에서 입증되었다([[ref:halgamuge2015|Halgamuge 2015]]).",
    modGenotype: "유전자형",
    modGenotypeDesc: "CACNA1C rs1006737 A-대립유전자 → 더 많은 Cav1.2 → 더 큰 Ca²⁺ 반응. [[ref:sousouri2025|Sousouri 2025]](ETH): CACNA1C 유전자형이 5G 수면 반응을 결정한다.",
    modLabElf: "실험실 ELF 배경",
    modLabElfDesc: "50/60 Hz 전력망은 8~10일 안에 VGCC 발현을 상향 조절한다([[ref:sun2016_elf_vgcc|PMC4757866]]). ELF 배경이 높은 실험실은 세포를 '프라이밍'한다.",
    modNighttimeEmf: "야간 EMF",
    modNighttimeEmfDesc: "침실의 Wi-Fi 라우터 vs. EMF가 없는 밤 → 서로 다른 CaMKII 회복 상태 → 실험 시작 시 서로 다른 기저 Ca²⁺.",
    modSpeciesPriming: "종 / 프라이밍",
    modSpeciesPrimingDesc: "실험실 환경의 동물 연구(24시간 ELF 프라이밍, 균질한 유전적 배경)는 92%에서 양성 결과를 찾는다. 이질적인 환경의 인간 연구는 35%에서 양성 결과를 찾는다. 둘 다 맞다 — 실험동물은 만성적으로 프라이밍되어 있다(VGCC 발현 증가, [[ref:sun2016_elf_vgcc|PMC4757866]]). p=0.002.",
    modDuration: "기간",
    modDurationDesc: "만성 노출(>1주)은 92%에서 양성 결과를 낸다. 급성 노출(1~2박)은 31%에서 양성 결과를 낸다. CaMKII 자가인산화에는 누적 Ca²⁺ 부하가 필요하다. p=0.001.",
    modPulsation: "펌스",
    modPulsationDesc: "펄스 신호는 88%에서 양성 결과를 낸다. CW는 48%에서 양성 결과를 낸다. IFO-VGIC 메커니즘에는 변화하는 장이 필요하다. p=0.048.",
    modVitaminD: "비타민 D 상태",
    modVitaminDDesc: "비타민 D(1,25(OH)₂D₃)는 CACNA1C/1D mRNA를 하향 조절한다([[ref:vdh_lvscc|J Neurosci 2001]]). 비타민 D 결핍 → VGCC 과발현 = ELF 프라이밍과 같은 상태. 비타민 D 결핍 인구집단(겨울, 고위도)의 연구에서는 더 강한 EMF 효과가 나타나야 한다.",
    modThreePredictors: "3개의 조절 변수가 통계적 유의성으로 연구 결과를 예측한다:",
    modAnalysisBasis: "3개 평가변수에 걸친 29개 연구 분석에 기반한다. [[ref:weller2025_dna|Weller 2025]](n=517)에 의해 검증되었다.",
    predRepl1Label: "예측 REPL-1: ",
    predRepl1Desc: "발표된 EMF 생물검정 연구 50~100건을 후향적으로 분석하면 이 8개 조절 변수가 양성 결과와 귀무 결과를 유의하게 예측한다는 것을 보여줄 것이다. 새로운 데이터 없이 검증할 수 있다.",
    modEpistemicNote: "인식론적 수준: 8개 조절 변수 프레임워크는 BERM의 통합(M 수준)이다. 개별 조절 변수에는 경험적 근거가 있다(E 수준).",
    dnaBelow58Title: "DNA 손상의 58%가 ICNIRP 제한 이하에서 발생",
    dnaBelow58Desc: "[[ref:weller2025_dna|Weller et al.(2025)]]은 517개 유전독성 연구를 분석했고, DNA 손상을 보고한 연구의 58%가 현재 ICNIRP 지침보다 낮은 노출 수준을 사용했음을 발견했다. [[ref:ivancsits_dna_recovery|Ivancsits 연구]]는 35 µT에서 DNA 가닥 절단을 발견했다 — ICNIRP의 직업 노출 한계 200 µT의 5분의 1보다 낮다.",
    dnaBelow58Mechanism: "ICNIRP 한계는 열적 효과를 방지하도록 설계되었다. EMF로 인한 DNA 손상은 전압 개폐 칼슘 채널 기능 장애를 통해 작동하는 비열적 메커니즘이다.",
    dnaRepairTitle: "DNA 손상은 9시간 내에 회복된다 — 노출이 멈추면",
    dnaRepairDesc: "[[ref:ivancsits_dna_recovery|Ivancsits et al.]]은 EMF로 유도된 DNA 가닥 절단이 노출 중단 후 9시간 이내에 정상으로 돌아왔음을 보여주었다. 이는 BERM의 회복 창을 정량화한다: 충분한 EMF 비노출 시간이 주어지면 신체는 EMF 유발 손상을 복구할 수 있다.",
    dnaModernEnv: "24시간 WiFi, LED 조명, 침대의 스마트폰이 있는 현대 환경은 이 회복 창을 완전히 제거한다. 전형적인 현대식 침실은 EMF 없는 회복 시간을 전혀 제공하지 않는다.",

    twoLevelTitle: "2단계 예측 모델",
    twoLevelSub: "레벨 1(횡단면) + 레벨 2(시간적 테스토스테론 동태)",
    twoLevelLead: "횡단면 모델은 전기화 임계값을 통해 국가를 글로벌 TFR 곡선에 배치합니다. 시간적 모델은 제2레벨을 추가: 테스토스테론의 장기적 감소가 T→TFR 시차 관계를 통해 국내 동태를 제공합니다.",
    twoLevelL1: "레벨 1: 전기화 임계값",
    twoLevelL1Desc: "TFR = 4.11 × exp(−54 × EMF_index) + 1.55. 54개국에서 R² = 0.851.",
    twoLevelL2: "레벨 2: 테스토스테론 궤적",
    twoLevelL2Desc: "T(연도) = 638 × (1 − 0.012)^(연도 − 1982). 나이 독립적 −1.2%/년 감소, 8년 시차. USA 2007–2024에서 R² = 0.97.",
    twoLevelCombined: "통합 예측: 레벨 1이 횡단면 기준선 설정; 레벨 2가 시간적으로 조정.",
    twoLevelCaveat: "두 레벨은 독립적. 레벨 2는 USA에서만 보정. R² 0.97은 표본 내이며 과대평가 가능성.",
    twoLevelDiagnostic: "LH–T 진단: Santi 등 2025가 집단에서 LH↓과 T↓의 동시 발생을 보여줌—시상하부 억제(EMF 경로)와 일치, 고환 손상(EDC 경로) 아님.",
  },
};

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 px-4 py-3 bg-background-secondary rounded-lg overflow-x-auto">
      <code className="text-sm font-mono-num whitespace-nowrap">
        {children}
      </code>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return {
    title: d.metaTitle,
    description: d.metaDesc,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locale_key = locale;
  const d = pickCopy(t, locale);
  const prefix = `/${locale}`;
  const cite = (text: string) => (
    <InlineReferenceText text={text} locale={locale_key} />
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 max-w-3xl">
        <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          {d.specNote}
        </p>
      </div>

      <div className="flex gap-10">
        {/* Sticky sidebar */}
        <ModelTableOfContents locale={locale} />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* B1: From Physics to Biology */}
          <CollapsibleSection id="physics-to-biology" title={d.physBioTitle} subtitle={d.physBioSub} defaultOpen>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.physBioLead}
            </p>

            {/* GME */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.physBioGMETitle}</h3>
              <p className="text-sm text-foreground-muted mb-3 max-w-3xl leading-relaxed">
                {d.physBioGMEDesc}
              </p>
              <Eq>{d.physBioGMEFormula}</Eq>
              <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
                {d.physBioGMEExplain}
              </p>
            </div>

            {/* χ(Ā) selection rule */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.physBioChiTitle}</h3>
              <p className="text-sm text-foreground-muted mb-3 max-w-3xl leading-relaxed">
                <ClaimRef claimId="claim.proxy.lindgren-selection">{d.physBioChiDesc}</ClaimRef>
              </p>
              <Eq>{d.physBioChiFormula}</Eq>
              <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
                {d.physBioChiExplain}
              </p>
            </div>

            {/* Superposition violation */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.physBioSuperTitle}</h3>
              <p className="text-sm text-foreground-muted mb-3 max-w-3xl leading-relaxed">
                {d.physBioSuperDesc}
              </p>
              <Eq>{d.physBioSuperFormula}</Eq>
              <p className="text-sm text-foreground-muted mb-2 max-w-3xl leading-relaxed">
                {cite(d.physBioSuperExplain)}
              </p>
              <Link href={`/${locale_key}/evidence/superposition`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {d.physBioSuperLink}
              </Link>
            </div>

            {/* Tissue-specific resonance */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.physBioTissueTitle}</h3>
              <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
                {d.physBioTissueDesc}
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-2 pr-4 font-semibold">Tissue</th>
                      <th className="text-left py-2 pr-4 font-semibold">Channels</th>
                      <th className="text-left py-2 pr-4 font-semibold">Tissue-kernel candidate</th>
                      <th className="text-left py-2 font-semibold">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.physBioTissues.map((row: { tissue: string; channels: string; chi: string; reason: string }) => (
                      <tr key={row.tissue} className="border-b border-card-border/50">
                        <td className="py-2 pr-4 font-medium">{row.tissue}</td>
                        <td className="py-2 pr-4 font-mono-num text-xs text-foreground-muted">{row.channels}</td>
                        <td className="py-2 pr-4 text-foreground-muted">{row.chi}</td>
                        <td className="py-2 text-foreground-muted">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geometric prediction verifications */}
            <div>
              <h3 className="text-base font-semibold mb-2">{d.physBioVerifyTitle}</h3>
              <p className="text-xs text-foreground-muted mb-4">{d.physBioVerifySub}</p>
              <div className="grid gap-3 max-w-4xl">
                {d.physBioVerifications.map((v: { id: string; title: string; desc: string; level: string }) => (
                  <article key={v.id} className="rounded-lg border border-card-border bg-card-bg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-num text-xs text-green-600 dark:text-green-400">{v.id}</span>
                      <h4 className="text-sm font-semibold">{v.title}</h4>
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
                        {v.level}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">{cite(v.desc)}</p>
                  </article>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* B2: Solar-Biological Connection */}
          <CollapsibleSection id="solar-biological" title={d.solarBioTitle} subtitle={d.solarBioSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.solarBioLead}
            </p>

            {/* Solar cycle → birth rate cyclicity */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.solarBioCycleTitle}</h3>
              <p className="text-sm text-foreground-muted mb-2 max-w-3xl leading-relaxed">
                {cite(d.solarBioCycleDesc)}
              </p>
              <div className="border-l-4 border-amber-500/40 rounded-r-lg bg-card p-4 mt-3 mb-3">
                <p className="text-sm text-foreground-muted leading-relaxed">{d.solarBioCycleNote}</p>
              </div>
            </div>

            {/* Birth timing → disease risk */}
            <div className="mb-8">
              <h3 className="text-base font-semibold mb-3">{d.solarBioBirthTitle}</h3>
              <p className="text-sm text-foreground-muted mb-2 max-w-3xl leading-relaxed">
                {cite(d.solarBioBirthDesc)}
              </p>
              <div className="border-l-4 border-blue-500/40 rounded-r-lg bg-card p-4 mt-3 mb-3">
                <p className="text-sm text-foreground-muted leading-relaxed">{d.solarBioBirthNote}</p>
              </div>
            </div>

            {/* Seasonal amplitude dampening */}
            <div>
              <h3 className="text-base font-semibold mb-3">{d.solarBioDampenTitle}</h3>
              <p className="text-sm text-foreground-muted mb-2 max-w-3xl leading-relaxed">
                {cite(d.solarBioDampenDesc)}
              </p>
              <div className="border-l-4 border-purple-500/40 rounded-r-lg bg-card p-4 mt-3">
                <p className="text-sm text-foreground-muted leading-relaxed">{d.solarBioDampenNote}</p>
              </div>
            </div>
          </CollapsibleSection>

          {/* B2b: Three Biological Frequency Bands */}
          <CollapsibleSection id="three-biological-bands" title={d.threeBandsTitle} subtitle={d.threeBandsSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.threeBandsLead}
            </p>
            <ThreeBiologicalBands locale={locale} />
          </CollapsibleSection>

          {/* B2c: Two Susceptibility Functions */}
          <CollapsibleSection id="two-susceptibility-functions" title={d.twoSuscTitle} subtitle={d.twoSuscSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.twoSuscLead}
            </p>
            <TwoSusceptibilities locale={locale} />
          </CollapsibleSection>

          {/* B3: From Biology to Civilization */}
          <CollapsibleSection id="biology-to-civilization" title={d.bioCivTitle} subtitle={d.bioCivSub}>
            <p className="text-sm text-foreground-muted mb-8 max-w-3xl leading-relaxed">
              {d.bioCivLead}
            </p>

            {/* 10-step causal chain */}
            <div className="relative max-w-2xl">
              {d.bioCivChain.map((item: { step: number; title: string; desc: string }, i: number) => {
                const colors = [
                  "bg-blue-600", "bg-blue-500", "bg-cyan-500", "bg-teal-500",
                  "bg-purple-500", "bg-amber-500", "bg-amber-600", "bg-orange-500",
                  "bg-orange-600", "bg-red-500", "bg-red-600",
                ];
                return (
                  <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Vertical connecting line */}
                    {i < d.bioCivChain.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border" />
                    )}
                    {/* Step number circle */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full ${colors[item.step]} text-white flex items-center justify-center text-xs font-bold shadow-sm`}
                    >
                      {item.step}
                    </div>
                    {/* Step content */}
                    <div className="pt-1 min-w-0">
                      <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BioCap integral */}
            <div className="mt-10">
              <h3 className="text-base font-semibold mb-3">{d.bioCivFormulaTitle}</h3>
              <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
                {d.bioCivFormulaDesc}
              </p>
              <Eq>{d.bioCivFormula}</Eq>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {d.bioCivFormulaTerms.map((term: { symbol: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <code className="font-mono-num text-foreground whitespace-nowrap">{term.symbol}</code>
                    <span className="text-foreground-muted">{term.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Epistemic note */}
            <div className="border-l-4 border-amber-500/40 rounded-r-lg bg-card p-4 mt-8">
              <p className="text-sm text-foreground-muted leading-relaxed italic">
                {d.bioCivEpistemic}
              </p>
            </div>
          </CollapsibleSection>

          {/* BioCap decomposition */}
          {d.biocapDecompMarkers?.length > 0 && (
            <section id="biocap-decomposition" className="mb-14 border-t editorial-rule pt-6">
              <h2 className="text-xl font-semibold mb-4">{d.biocapDecompTitle}</h2>
              <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
                {d.biocapDecompDesc}
              </p>

              <Eq>{d.biocapDecompFormula}</Eq>
              <p className="text-sm text-foreground-muted mb-2 max-w-3xl">{d.biocapDecompFormulaDesc}</p>

              <Eq>{d.biocapDecompCultural}</Eq>
              <p className="text-sm text-foreground-muted mb-8 max-w-3xl">{d.biocapDecompCulturalDesc}</p>

              <div className="overflow-x-auto rounded-lg border border-card-border bg-card-bg">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left">
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Symboli" : "Symbol"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Nimi" : "Name"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Paino" : "Weight"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Yksikkö" : "Unit"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "1980 lähtötaso" : "1980 Baseline"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "2025 nykytaso" : "2025 Current"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "BERM-mekanismi" : "BERM Mechanism"}</th>
                      <th className="py-2 px-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Evidenssi" : "Evidence"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.biocapDecompMarkers.map((m: { symbol: string; name: string; weight: string; unit: string; baseline: string; current: string; mechanism: string; evidence: string }) => (
                      <tr key={m.symbol} className="border-b border-card-border/50">
                        <td className="py-2 px-3 font-mono-num font-semibold text-foreground whitespace-nowrap">{m.symbol}</td>
                        <td className="py-2 px-3 text-foreground whitespace-nowrap">{m.name}</td>
                        <td className="py-2 px-3 font-mono-num text-foreground">{m.weight}</td>
                        <td className="py-2 px-3 text-foreground-muted whitespace-nowrap">{m.unit}</td>
                        <td className="py-2 px-3 font-mono-num text-foreground-muted">{m.baseline}</td>
                        <td className="py-2 px-3 font-mono-num text-foreground-muted">{m.current}</td>
                        <td className="py-2 px-3 text-foreground-muted font-mono text-[10px] whitespace-nowrap">{m.mechanism}</td>
                        <td className="py-2 px-3 text-foreground-muted">{m.evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Hormetic dose-response extension */}
          {d.hormesisDesc && (
            <section id="hormesis-extension" className="mb-14 border-t editorial-rule pt-6">
              <h2 className="text-xl font-semibold mb-4">{d.hormesisTitle}</h2>
              <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">{d.hormesisDesc}</p>

              {d.hormesisFormula && (
                <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-6 max-w-3xl overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">{d.hormesisFormula}</pre>
                </div>
              )}

              {d.hormesisTerms.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-w-3xl">
                  {d.hormesisTerms.map((term: { symbol: string; desc: string }, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-accent shrink-0">{term.symbol}</span>
                      <span className="text-foreground-muted">{term.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-4xl">
                {d.hormesisZone1 && (
                  <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.hormesisZone1}</p>
                  </div>
                )}
                {d.hormesisZone2 && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.hormesisZone2}</p>
                  </div>
                )}
                {d.hormesisZone3 && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.hormesisZone3}</p>
                  </div>
                )}
              </div>

              {d.hormesisEpistemic && (
                <div className="border-l-4 border-amber-500/40 rounded-r-lg bg-card p-4">
                  <p className="text-sm text-foreground-muted leading-relaxed italic">{d.hormesisEpistemic}</p>
                </div>
              )}
            </section>
          )}

          {/* Three-level architecture */}
          <section id="architecture" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.archTitle}</h2>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              <ClaimRef claimId="claim.tfr.multi-input-decomposition">{d.archDesc}</ClaimRef>
            </p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.archPredictionSource}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level1Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level1Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  <ClaimRef claimId="claim.couple.fecundability-convergence">{d.level1Desc}</ClaimRef>
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level2Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level2Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level2Desc}
                </p>
              </SectionCard>

              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.level3Label}
                </p>
                <h3 className="text-base font-semibold mb-2">{d.level3Title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.level3Desc}
                </p>
              </SectionCard>
            </div>
          </section>

          {/* Interactive causal chain diagram */}
          <section id="causal-diagram" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.causalTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {cite(d.causalDesc)}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {cite(d.pathwayHierarchyNote)}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {cite(d.rpmFrequencyNote)}
            </p>
            <div className="mt-4 mb-4 border-l-4 border-blue-500/40 rounded-r-lg bg-card p-5">
              <h4 className="text-sm font-semibold mb-2">{d.vgccHierarchyTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.vgccHierarchyNote}
              </p>
            </div>
            <div className="mb-6 border-l-4 border-amber-500/40 rounded-r-lg bg-card p-5">
              <h4 className="text-sm font-semibold mb-2">{d.camkiiTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.camkiiNote}
              </p>
            </div>
            <div className="overflow-x-auto">
              <BermCausalDiagram locale={locale_key} />
            </div>
            <span id="ifo" />
            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.ifoVgicNote)}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.multiPathwayCa2Note)}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.fiveGReproNote)}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.pathwayBQuantNote)}
            </p>
            <p className="mt-3 text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {cite(d.pathwayBWeightNote)}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.cryIndividualVariationNote)}
            </p>
            <p className="mt-3 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.cryDualSystemNote)}
            </p>
          </section>

          {/* Five independent EMF → TFR routes */}
          <section id="four-routes" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.fourRoutesTitle}</h2>
            <p className="text-xs text-foreground-muted italic mb-4">{d.fourRoutesSub}</p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.fourRoutesDesc}
            </p>
            <div className="my-8 max-w-4xl mx-auto" style={{display:'none'}}>
              <svg viewBox="0 0 750 350" className="w-full" role="img" aria-label={d.svgFiveRoutesAria}>
                <defs>
                  <marker id="fr_arG" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" className="fill-green-500/70" /></marker>
                  <marker id="fr_arB" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" className="fill-blue-500/70" /></marker>
                  <marker id="fr_arP" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" className="fill-purple-500/70" /></marker>
                  <marker id="fr_arA" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" className="fill-amber-500/70" /></marker>
                  <marker id="fr_arR" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" className="fill-red-500/70" /></marker>
                </defs>

                {/* Route A: VGCC -> Ca2+ -> ROS -> Sperm damage (green) */}
                <circle cx="18" cy="43" r="13" className="fill-green-500/15 stroke-green-500/60" strokeWidth="1.5" />
                <text x="18" y="47" textAnchor="middle" className="fill-green-500 text-[10px] font-bold">A</text>
                <rect x="40" y="29" width="95" height="28" rx="6" className="fill-green-500/10 stroke-green-500/50" strokeWidth="1.5" />
                <text x="87" y="47" textAnchor="middle" className="fill-foreground text-[9px] font-medium">VGCC</text>
                <line x1="135" y1="43" x2="155" y2="43" className="stroke-green-500/60" strokeWidth="1.5" markerEnd="url(#fr_arG)" />
                <rect x="155" y="29" width="95" height="28" rx="6" className="fill-green-500/10 stroke-green-500/50" strokeWidth="1.5" />
                <text x="202" y="47" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Ca²⁺</text>
                <line x1="250" y1="43" x2="270" y2="43" className="stroke-green-500/60" strokeWidth="1.5" markerEnd="url(#fr_arG)" />
                <rect x="270" y="29" width="95" height="28" rx="6" className="fill-green-500/10 stroke-green-500/50" strokeWidth="1.5" />
                <text x="317" y="47" textAnchor="middle" className="fill-foreground text-[9px] font-medium">ROS</text>
                <line x1="365" y1="43" x2="385" y2="43" className="stroke-green-500/60" strokeWidth="1.5" markerEnd="url(#fr_arG)" />
                <rect x="385" y="29" width="95" height="28" rx="6" className="fill-green-500/10 stroke-green-500/50" strokeWidth="1.5" />
                <text x="432" y="47" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgSpermDamage}</text>

                {/* Route B: CRY/RPM -> Circadian -> Melatonin -> HPG (blue) */}
                <circle cx="18" cy="109" r="13" className="fill-blue-500/15 stroke-blue-500/60" strokeWidth="1.5" />
                <text x="18" y="113" textAnchor="middle" className="fill-blue-500 text-[10px] font-bold">B</text>
                <rect x="40" y="95" width="95" height="28" rx="6" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                <text x="87" y="113" textAnchor="middle" className="fill-foreground text-[9px] font-medium">CRY / RPM</text>
                <line x1="135" y1="109" x2="155" y2="109" className="stroke-blue-500/60" strokeWidth="1.5" markerEnd="url(#fr_arB)" />
                <rect x="155" y="95" width="95" height="28" rx="6" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                <text x="202" y="113" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgCircadian}</text>
                <line x1="250" y1="109" x2="270" y2="109" className="stroke-blue-500/60" strokeWidth="1.5" markerEnd="url(#fr_arB)" />
                <rect x="270" y="95" width="95" height="28" rx="6" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                <text x="317" y="113" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgMelatoninDown}</text>
                <line x1="365" y1="109" x2="385" y2="109" className="stroke-blue-500/60" strokeWidth="1.5" markerEnd="url(#fr_arB)" />
                <rect x="385" y="95" width="95" height="28" rx="6" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                <text x="432" y="113" textAnchor="middle" className="fill-foreground text-[9px] font-medium">HPG ↓</text>

                {/* Route B' (sub-branch of pathway B): CRY2-TRPC1 -> Ca2+ entry (purple) */}
                <circle cx="18" cy="175" r="13" className="fill-purple-500/15 stroke-purple-500/60" strokeWidth="1.5" />
                <text x="18" y="179" textAnchor="middle" className="fill-purple-500 text-[10px] font-bold">B′</text>
                <rect x="40" y="161" width="95" height="28" rx="6" className="fill-purple-500/10 stroke-purple-500/50" strokeWidth="1.5" />
                <text x="87" y="179" textAnchor="middle" className="fill-foreground text-[9px] font-medium">CRY2-TRPC1</text>
                <line x1="135" y1="175" x2="155" y2="175" className="stroke-purple-500/60" strokeWidth="1.5" markerEnd="url(#fr_arP)" />
                <rect x="155" y="161" width="95" height="28" rx="6" className="fill-purple-500/10 stroke-purple-500/50" strokeWidth="1.5" />
                <text x="202" y="179" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgCa2Entry}</text>

                {/* Route D: HPA -> Cortisol -> Testosterone (amber) */}
                <circle cx="18" cy="241" r="13" className="fill-amber-500/15 stroke-amber-500/60" strokeWidth="1.5" />
                <text x="18" y="245" textAnchor="middle" className="fill-amber-500 text-[10px] font-bold">D</text>
                <rect x="40" y="227" width="95" height="28" rx="6" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                <text x="87" y="245" textAnchor="middle" className="fill-foreground text-[9px] font-medium">HPA</text>
                <line x1="135" y1="241" x2="155" y2="241" className="stroke-amber-500/60" strokeWidth="1.5" markerEnd="url(#fr_arA)" />
                <rect x="155" y="227" width="95" height="28" rx="6" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                <text x="202" y="245" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgCortisolUp}</text>
                <line x1="250" y1="241" x2="270" y2="241" className="stroke-amber-500/60" strokeWidth="1.5" markerEnd="url(#fr_arA)" />
                <rect x="270" y="227" width="95" height="28" rx="6" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                <text x="317" y="245" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgTestosteroneDown}</text>

                {/* Route A' (sub-branch of pathway A, downstream of VGIC -> Ca2+): mTOR -> Autophagy -> Cell growth (red) */}
                <circle cx="18" cy="307" r="13" className="fill-red-500/15 stroke-red-500/60" strokeWidth="1.5" />
                <text x="18" y="311" textAnchor="middle" className="fill-red-500 text-[10px] font-bold">A′</text>
                <rect x="40" y="293" width="95" height="28" rx="6" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                <text x="87" y="311" textAnchor="middle" className="fill-foreground text-[9px] font-medium">mTOR</text>
                <line x1="135" y1="307" x2="155" y2="307" className="stroke-red-500/60" strokeWidth="1.5" markerEnd="url(#fr_arR)" />
                <rect x="155" y="293" width="95" height="28" rx="6" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                <text x="202" y="311" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgAutophagyDown}</text>
                <line x1="250" y1="307" x2="270" y2="307" className="stroke-red-500/60" strokeWidth="1.5" markerEnd="url(#fr_arR)" />
                <rect x="270" y="293" width="95" height="28" rx="6" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                <text x="317" y="311" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{d.svgCellGrowthDown}</text>

                {/* Convergence arrows to TFR decline */}
                <line x1="480" y1="43" x2="583" y2="110" className="stroke-green-500/40" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#fr_arG)" />
                <line x1="480" y1="109" x2="583" y2="140" className="stroke-blue-500/40" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#fr_arB)" />
                <line x1="250" y1="175" x2="583" y2="175" className="stroke-purple-500/40" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#fr_arP)" />
                <line x1="365" y1="241" x2="583" y2="210" className="stroke-amber-500/40" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#fr_arA)" />
                <line x1="365" y1="307" x2="583" y2="245" className="stroke-red-500/40" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#fr_arR)" />

                {/* TFR decline box */}
                <rect x="585" y="95" width="125" height="165" rx="8" className="fill-red-500/10 stroke-red-500/60" strokeWidth="2" />
                <text x="647" y="172" textAnchor="middle" className="fill-foreground text-[11px] font-bold">{d.svgTfr}</text>
                <text x="647" y="188" textAnchor="middle" className="fill-foreground text-[11px] font-bold">{d.svgDecline}</text>
              </svg>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mb-6">
              <article className="rounded-xl border border-card-border bg-card-bg p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesGonadal}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed"><ClaimRef claimId="claim.vgcc.ros-ca2-coupling">{d.fourRoutesGonadalDesc}</ClaimRef></p>
              </article>
              <article className="rounded-xl border border-card-border bg-card-bg p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesCircadian}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed"><ClaimRef claimId="claim.rpm.cry-magnetic-sensitivity">{d.fourRoutesCircadianDesc}</ClaimRef></p>
              </article>
              <article className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesPituitary}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesPituitaryDesc}</p>
              </article>
              <article className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5">
                <h3 className="font-semibold text-sm mb-2">{d.fourRoutesAutonomic}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.fourRoutesAutonomicDesc}</p>
              </article>
              <article className="rounded-xl border-2 border-red-500/40 bg-red-500/5 p-5 sm:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{d.fourRoutesNeurodevelopmental}</h3>
                  <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>L*</span>
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed mb-3">{d.fourRoutesNeurodevelopmentalDesc}</p>
                <p className="text-xs text-foreground-muted leading-relaxed italic border-l-2 border-red-500/30 pl-3 mb-2">
                  {d.cascadeNeurodevExt}
                </p>
                <Link href={`${prefix}/modulome/brain`} className="text-xs text-accent hover:underline">
                  &rarr; {d.brainModulomeLink}
                </Link>
              </article>
            </div>
            <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {d.fourRoutesImplication}
            </p>

            {/* Five Routes Flow Diagram */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Five routes to TFR decline">
                {/* EMF source box */}
                <rect x="280" y="8" width="140" height="32" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="350" y="29" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b" fontFamily="system-ui">EMF</text>
                {/* Branching arrows */}
                {[
                  { x: 70, label: "A", color: "#3b82f6", route: d.routeGonadal, mech: "VGCC→Ca²⁺→ROS" },
                  { x: 210, label: "B", color: "#8b5cf6", route: d.svgCircadian, mech: "CRY/RPM→clock" },
                  { x: 350, label: "B′", color: "#ec4899", route: "CRY2-TRPC1", mech: "CRY2→TRPC1→Ca²⁺" },
                  { x: 490, label: "D", color: "#ef4444", route: d.routeAutonomic, mech: "HPA→T↓" },
                  { x: 630, label: "A′", color: "#14b8a6", route: d.routeNeurodevel, mech: "CACNA1C→brain" },
                ].map((r) => (
                  <g key={r.label}>
                    <line x1="350" y1="40" x2={r.x} y2="80" stroke={r.color} strokeWidth="1.5" strokeOpacity="0.5" />
                    <rect x={r.x - 50} y="80" width="100" height="56" rx="6" fill={r.color} fillOpacity="0.12" stroke={r.color} strokeWidth="1.2" />
                    <text x={r.x} y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill={r.color} fontFamily="system-ui">
                      {d.routeLabel} {r.label}
                    </text>
                    <text x={r.x} y="113" textAnchor="middle" fontSize="9" fill={r.color} fillOpacity="0.8" fontFamily="system-ui">{r.route}</text>
                    <text x={r.x} y="128" textAnchor="middle" fontSize="7.5" fill="currentColor" fillOpacity="0.5" fontFamily="monospace">{r.mech}</text>
                    <line x1={r.x} y1="136" x2={r.x} y2="170" stroke={r.color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
                  </g>
                ))}
                {/* Convergence: TFR */}
                <rect x="200" y="170" width="300" height="36" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
                <text x="350" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ef4444" fontFamily="system-ui">TFR ↓</text>
                {/* Caption */}
                <text x="350" y="240" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="system-ui">
                  {d.routeParallelCaption}
                </text>
              </svg>
            </div>
          </section>

          {/* Why modulation matters more than SAR */}
          <section id="modulation" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.modulationTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {cite(d.modulationDesc)}
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5 max-w-3xl">
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                {d.labelWarning}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.modulationWarning}
              </p>
            </div>
          </section>

          {/* Derived geometry coordinate; its legacy proxy use is still uncalibrated. */}
          <CollapsibleSection id="chi-coupling" title={d.chiTitle} subtitle={d.chiSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              <ClaimRef claimId="claim.proxy.lindgren-selection">{d.chiDesc}</ClaimRef>
            </p>
            <Eq>
              &chi;(&#256;) = &#256; / &radic;(1 + &#256;&sup2;)
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.chiWherePrefix}{" "}
              <code className="font-mono-num text-foreground">&Amacr;</code>{" "}
              {d.chiExplain}
            </p>
          </CollapsibleSection>

          <CollapsibleSection
            id="conditional-response-androgen"
            title={pickCopy({
              en: "Conditional response operator and androgen-use capacity",
              fi: "Ehdollinen vasteoperaattori ja androgeeninkäyttökapasiteetti",
              ja: "条件付き応答演算子とアンドロゲン利用能力",
              fr: "Opérateur de réponse conditionnel et capacité d’utilisation des androgènes",
              ko: "조건부 응답 연산자와 안드로겐 사용 능력",
            }, locale_key)}
            subtitle={pickCopy({
              en: "What is derived, what is imported, and what remains open",
              fi: "Mikä on johdettu, mikä tuotu ja mikä jää avoimeksi",
              ja: "導出済み・導入済み・未解決の区別",
              fr: "Ce qui est dérivé, importé et encore ouvert",
              ko: "도출된 것, 도입된 것, 여전히 열린 것",
            }, locale_key)}
          >
            <div className="space-y-6 max-w-4xl">
              <p className="text-sm text-foreground-muted leading-relaxed">
                <ClaimRef claimId="claim.bridge.conditional-response-operator">
                  {pickCopy({
                    en: "BERM now has a formal L2 operator: the exact Lindgren metric perturbation is contracted with a causal tissue-response kernel. The derivation is conditional on minimal matter–metric coupling and response theory. It does not supply the kernel’s scale, sign, gauge prescription or human endpoint coefficient.",
                    fi: "BERM:llä on nyt formaali L2-operaattori: tarkka Lindgrenin metriikkahäiriö kontraktoidaan kausaalisen kudosvasteytimen kanssa. Johto on ehdollinen minimaaliselle materia–metriikka-kytkennälle ja vastefunktioteorialle. Se ei anna ytimen mittakaavaa, merkkiä, gauge-reseptiä eikä ihmispäätepisteen kerrointa.",
                    ja: "BERMは、正確なLindgren計量摂動を組織応答カーネルと縮約する形式的L2演算子を持ちます。最小物質–計量結合と応答理論を条件とし、スケール・符号・ゲージ・ヒト係数は未校正です。",
                    fr: "BERM dispose désormais d’un opérateur L2 formel : la perturbation métrique exacte de Lindgren est contractée avec un noyau causal de réponse tissulaire. L’échelle, le signe, la jauge et le coefficient humain restent à calibrer.",
                    ko: "BERM은 정확한 Lindgren 계량 섭동을 조직 응답 커널과 축약하는 형식적 L2 연산자를 갖습니다. 최소 물질–계량 결합과 응답 이론을 조건으로 하며 규모·부호·게이지·인체 계수는 미교정입니다.",
                  }, locale_key)}
                </ClaimRef>
              </p>

              <div className="space-y-3 rounded-lg border border-border bg-card-bg p-5">
                <Eq>&delta;g<sub>&mu;&nu;</sub> = &kappa;(&Amacr;<sub>&mu;</sub>a<sub>&nu;</sub> + a<sub>&mu;</sub>&Amacr;<sub>&nu;</sub> + a<sub>&mu;</sub>a<sub>&nu;</sub>)</Eq>
                <Eq>&delta;&lang;O<sub>i</sub>&rang; = &int; &Xi;<sub>i,R</sub><sup>&mu;&nu;</sup> &delta;g<sub>&mu;&nu;</sub> + O(&delta;g&sup2;)</Eq>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  <StudyCitation referenceId="lindgren2025" locale={locale_key} />{" · "}
                  <StudyCitation referenceId="kubo1957_linear_response" locale={locale_key} />
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500 mb-2">[JOHDETTU]</p>
                  <p className="text-sm font-semibold mb-2">χ<sub>geo</sub></p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    <ClaimRef claimId="claim.geometry.rank-one-coordinate">
                      {pickCopy({
                        en: "χ_geo = ρ/√(1+ρ²) is a bounded inverse-metric coordinate for a normalized positive-norm mode—not tissue sensitivity.",
                        fi: "χ_geo = ρ/√(1+ρ²) on rajattu käänteisen metriikan koordinaatti normalisoidulle positiivinormiselle moodille – ei kudosherkkyys.",
                        ja: "χ_geoは正規化された正ノルム・モードの逆計量座標であり、組織感受性ではありません。",
                        fr: "χ_geo est une coordonnée bornée de la métrique inverse pour un mode normalisé de norme positive, pas une sensibilité tissulaire.",
                        ko: "χ_geo는 정규화된 양의 노름 모드의 역계량 좌표이며 조직 감수성이 아닙니다.",
                      }, locale_key)}
                    </ClaimRef>
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500 mb-2">[JOHDETTU]</p>
                  <p className="text-sm font-semibold mb-2">
                    {pickCopy({ en: "Envelope / beat drive", fi: "Verhokäyrä-/beat-ajuri", ja: "包絡線・ビート駆動", fr: "Pilotage enveloppe/battement", ko: "포락선·비트 구동" }, locale_key)}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    <ClaimRef claimId="claim.geometry.quadratic-mixing">
                      {pickCopy({
                        en: "The quadratic a⊗a term creates DC, modulation-envelope and difference-frequency metric components. Biological detection still requires Ξ_i.",
                        fi: "Neliöllinen a⊗a-termi tuottaa DC-, modulaatioverho- ja erotustaajuiset metriikkakomponentit. Biologinen havaitseminen vaatii silti Ξ_i:n.",
                        ja: "二次項a⊗aはDC・変調包絡線・差周波数成分を生成しますが、生物検出にはΞ_iが必要です。",
                        fr: "Le terme quadratique a⊗a crée des composantes DC, d’enveloppe et de fréquence différence; leur détection biologique exige encore Ξ_i.",
                        ko: "이차 a⊗a 항은 DC·변조 포락선·차주파수 성분을 만들지만 생물학적 검출에는 Ξ_i가 필요합니다.",
                      }, locale_key)}
                    </ClaimRef>
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-500 mb-2">[TUOTU + EMERGENTTI]</p>
                  <p className="text-sm font-semibold mb-2">AEC</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    <ClaimRef claimId="claim.androgen.receptor-use-capacity">
                      {pickCopy({
                        en: "Androgen effective capacity separates total T, SHBG/albumin binding, free or intratesticular T, AR/ZIP9 occupancy and post-receptor transmission.",
                        fi: "Androgeenien efektiivinen kapasiteetti erottaa kokonais-T:n, SHBG-/albumiinisitoutumisen, vapaan tai intratestikulaarisen T:n, AR-/ZIP9-miehityksen ja reseptorin jälkeisen välityksen.",
                        ja: "アンドロゲン有効容量は総T、SHBG/アルブミン結合、遊離・精巣内T、AR/ZIP9占有と受容体後伝達を分離します。",
                        fr: "La capacité androgénique effective sépare T totale, liaison SHBG/albumine, T libre ou intratesticulaire, occupation AR/ZIP9 et transmission post-récepteur.",
                        ko: "유효 안드로겐 능력은 총 T, SHBG/알부민 결합, 유리·고환내 T, AR/ZIP9 점유 및 수용체 후 전달을 분리합니다.",
                      }, locale_key)}
                    </ClaimRef>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  {pickCopy({ en: "Open calibration—not an assumed effect", fi: "Avoin kalibraatio – ei oletettu vaikutus", ja: "未校正—効果を仮定しない", fr: "Calibration ouverte — effet non supposé", ko: "미교정—효과를 가정하지 않음" }, locale_key)}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  <ClaimRef claimId="claim.androgen.binding-availability">
                    {pickCopy({
                      en: "The model can now represent impaired hormone use without lower total testosterone, but it activates no EMF→SHBG, EMF→AR or EMF→ZIP9 coefficient by default. The relevant evidence is mixed: receptor biology and a rat ZIP9 route support the decomposition, while an acute randomized MRI study found no serum hormone change.",
                      fi: "Malli voi nyt esittää heikentyneen hormoninkäytön ilman kokonais-testosteronin laskua, mutta se ei aktivoi oletuksena EMF→SHBG-, EMF→AR- eikä EMF→ZIP9-kerrointa. Näyttö on rajattua ja sekamuotoista: reseptoribiologia ja rottien ZIP9-reitti tukevat hajotelmaa, kun taas akuutti satunnaistettu MRI-tutkimus ei löytänyt seerumihormonimuutosta.",
                      ja: "総テストステロンが低下しなくてもホルモン利用障害を表現できますが、EMF→SHBG/AR/ZIP9係数は既定で有効化しません。受容体生物学とラットZIP9経路は分解を支持する一方、急性MRI試験は血清ホルモン変化を認めませんでした。",
                      fr: "Le modèle peut représenter une utilisation hormonale réduite sans baisse de T totale, mais n’active par défaut aucun coefficient EMF→SHBG/AR/ZIP9. La biologie des récepteurs et une voie ZIP9 chez le rat soutiennent la décomposition; un essai IRM aigu n’a trouvé aucun changement hormonal sérique.",
                      ko: "총 테스토스테론 저하 없이 호르몬 사용 장애를 표현할 수 있지만 EMF→SHBG/AR/ZIP9 계수는 기본 활성화되지 않습니다. 수용체 생물학과 쥐 ZIP9 경로는 분해를 지지하나 급성 MRI 시험은 혈청 호르몬 변화를 찾지 못했습니다.",
                    }, locale_key)}
                  </ClaimRef>
                  {" "}<StudyCitation referenceId="narinx2022_free_testosterone" locale={locale_key} />{" · "}
                  <StudyCitation referenceId="degendt2004_sertoli_ar" locale={locale_key} />{" · "}
                  <StudyCitation referenceId="yu2023_zip9_rf_sertoli" locale={locale_key} />{" · "}
                  <StudyCitation referenceId="mollerlokken2012_mri_hormones" locale={locale_key} />
                </p>
              </div>

              <Link href={`${prefix}/mathematics#chi`} className="text-sm text-accent hover:underline">
                {pickCopy({ en: "Open the full derivation →", fi: "Avaa koko johto →", ja: "完全な導出を開く →", fr: "Ouvrir la dérivation complète →", ko: "전체 유도 보기 →" }, locale_key)}
              </Link>
            </div>
          </CollapsibleSection>

          {/* χ at Five Scales */}
          <CollapsibleSection id="chi-five-scales" title={d.chiFiveTitle} subtitle={d.chiFiveSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.chiFiveDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColScale}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColBg}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColPerturb}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColExpr}</th>
                    <th className="py-2 pr-3 font-medium">{d.chiFiveColVerify}</th>
                    <th className="py-2 font-medium">{d.chiFiveColLevel}</th>
                  </tr>
                </thead>
                <tbody>
                  {RESPONSE_MODIFIER_SCALES.map((s) => {
                    const color = CHAIN_EPISTEMIC_COLORS[s.level as EpistemicLevel] ?? "#6B7280";
                    return (
                      <tr key={s.id} className="border-b border-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground">{locale_key === "fi" ? s.label_fi : s.label_en}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">{locale_key === "fi" ? s.background_fi : s.background_en}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">{locale_key === "fi" ? s.perturbation_fi : s.perturbation_en}</td>
                        <td className="py-2 pr-3 font-mono text-xs text-foreground">{s.candidate_expression}</td>
                        <td className="py-2 pr-3 text-foreground-muted text-xs">
                          {s.referenceIds?.length
                            ? s.referenceIds.map((referenceId, index) => (
                                <span key={referenceId}>
                                  {index > 0 ? ", " : null}
                                  <StudyCitation referenceId={referenceId} locale={locale_key} />
                                </span>
                              ))
                            : s.verification}
                        </td>
                        <td className="py-2">
                          <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>
                            {s.level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm">
              <Link href={`${prefix}/evidence/evolution`} className="text-accent hover:underline">
                {d.chiFiveLink}
              </Link>
            </p>
          </CollapsibleSection>

          {/* χ across evidence families */}
          <CollapsibleSection id="chi-evidence-families" title={d.chiEvidenceTitle} subtitle={d.chiEvidenceSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.chiEvidenceDesc}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {d.chiEvidenceFamilies.map((fam: { referenceId?: string; referenceIds?: string[]; family: string; chi: string; mechanism: string; prediction: string; verification: string; level: string }, i: number) => {
                const color = fam.level === "E" ? "#22c55e" : fam.level.startsWith("L") ? "#ef4444" : "#f59e0b";
                return (
                  <div key={i} className="rounded-lg border border-border p-4" style={{ borderLeftWidth: 4, borderLeftColor: color }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{fam.family}</h4>
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>{fam.level}</span>
                    </div>
                    <p className="text-xs font-mono text-accent mb-2">{fam.chi}</p>
                    <p className="text-xs text-foreground-muted mb-2">{cite(fam.mechanism)}</p>
                    <p className="text-xs text-foreground mb-1"><strong>{d.labelPrediction}:</strong> {fam.prediction}</p>
                    <p className="text-xs text-foreground-muted italic">
                      {fam.referenceIds?.length ? (
                        fam.referenceIds.map((referenceId, index) => (
                          <span key={referenceId}>
                            {index > 0 ? ", " : null}
                            <StudyCitation referenceId={referenceId} locale={locale_key} />
                          </span>
                        ))
                      ) : fam.referenceId ? (
                        <CitationLink citation={fam.verification} referenceId={fam.referenceId} locale={locale_key} />
                      ) : (
                        cite(fam.verification)
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>

          {/* Two Independent Susceptibilities */}
          <CollapsibleSection id="dual-susceptibility" title={d.dualSuscTitle}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.dualSuscDesc}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[d.dualSuscLeft, d.dualSuscRight].map((col: { title: string; type: string; channel: string; threshold: string; tests: string; pathways: string }, i: number) => (
                <div key={i} className="rounded-lg border border-border p-5" style={{ borderTopWidth: 4, borderTopColor: i === 0 ? "#3b82f6" : "#8b5cf6" }}>
                  <h4 className="text-base font-bold mb-4 text-foreground">{col.title}</h4>
                  <div className="space-y-3">
                    {([
                      [d.dualSuscLabelType, col.type],
                      [d.dualSuscLabelChannel, col.channel],
                      [d.dualSuscLabelThreshold, col.threshold],
                      [d.dualSuscLabelTests, col.tests],
                      [d.dualSuscLabelPathways, col.pathways],
                    ] as [string, string][]).map(([label, value], j) => (
                      <div key={j}>
                        <span className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">{label}</span>
                        <p className="text-sm text-foreground mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Phylogenetic Pathway Hierarchy */}
          <CollapsibleSection id="phylogenetic-hierarchy" title={d.phyloTitle}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.phyloDesc}
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-foreground-muted font-semibold">{d.phyloColProperty}</th>
                    <th className="text-left p-2 font-semibold" style={{ color: "#8b5cf6" }}>{d.phyloColPathwayB}</th>
                    <th className="text-left p-2 font-semibold" style={{ color: "#3b82f6" }}>{d.phyloColPathwayA}</th>
                  </tr>
                </thead>
                <tbody>
                  {(d.phyloRows as string[][]).map((row: string[], i: number) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="p-2 text-foreground-muted font-medium">{row[0]}</td>
                      <td className="p-2 text-foreground">{row[1]}</td>
                      <td className="p-2 text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-foreground mb-4 max-w-3xl leading-relaxed">
              {d.phyloInsight}
            </p>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4">
              <p className="text-sm text-foreground">{d.phyloWarning}</p>
            </div>
          </CollapsibleSection>

          {/* Phylogenetic pathway hierarchy — prose */}
          <section id="phylo-hierarchy-prose" className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.phyloTitle}</h2>
            {(d.phyloText as readonly string[]).map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground-muted mb-4 max-w-3xl">{p}</p>
            ))}
          </section>

          {/* Three-channel model */}
          <CollapsibleSection id="two-channel-model" title={d.twoChTitle} subtitle={d.twoChSub} defaultOpen>

            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChDesc}
            </p>
            <Eq>
              cumEMF = w_ELF &middot; cumELF + w_IF &middot; cumIF + w_RF &middot; cumRF
            </Eq>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-4">
              {d.twoChExplain}
            </p>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed mb-6">
              {cite(d.lateralizationNote)}
            </p>

            <h3 className="text-base font-semibold mb-2">{d.twoChLayersTitle}</h3>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.twoChLayersDesc}
            </p>
            <Eq>
              ambient = &Sigma;<sub>k=1..12</sub> layer<sub>k</sub>(country, year)
            </Eq>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
              {([
                ["#4a6741", d.layerMilitaryRadar, "1950s"],
                ["#2196F3", d.layerWeatherRadar, "1988+"],
                ["#FF5722", d.layerMobileNetworks, "1991+"],
                ["#E91E63", "Wi-Fi", "1999+"],
                ["#8BC34A", d.layerWindTurbines, "2000+"],
                ["#9C27B0", d.layerDisplayTransition, "2005+"],
                ["#00BCD4", d.layerSmartMeters, "2005+"],
                ["#FFC107", d.layerIndoorLed, "2009+"],
                ["#FFEB3B", d.layerSolarInverters, "2010+"],
                ["#FF9800", d.layerStreetLed, "2012+"],
                ["#795548", "IoT", "2014+"],
                ["#607D8B", "ADAS", "2015+"],
              ] as const).map(([color, name, year]) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border border-card-border px-3 py-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium truncate">{name}</span>
                  <span className="text-[10px] font-mono-num text-foreground-muted ml-auto">{year}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-status-partial/30 bg-status-partial/5 p-5 max-w-3xl">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-status-partial mb-2">{d.ifChannelTitle}</h4>
              <p className="text-sm text-foreground-muted leading-relaxed">{cite(d.ifChannelDesc)}</p>
            </div>

            {/* TCBM detail */}
            <div className="mt-8 max-w-3xl">
              <h3 className="text-base font-semibold mb-2">{d.tcbmTitle}</h3>
              <p className="text-sm text-foreground-muted mb-4 leading-relaxed">{d.tcbmIntro}</p>
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-1">{d.tcbmElfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{cite(d.tcbmElfDesc)}</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-500 mb-1">{d.tcbmIfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{cite(d.tcbmIfDesc)}</p>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">{d.tcbmRfTitle}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{cite(d.tcbmRfDesc)}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmIfMitotic}</p>
              <p className="text-xs text-foreground-muted mt-3 italic leading-relaxed border-l-2 border-amber-500/30 pl-3">{d.tcbmWeightNote}</p>
              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">{d.tcbmCrossSectional}</p>
              <p className="text-xs text-foreground-muted mt-3 italic leading-relaxed">{d.tcbmWolframPlanned}</p>
              <p className="mt-4 text-sm">
                <Link href={`${prefix}/evidence/pharmacology`} className="text-accent hover:underline">
                  {d.pharmEvidenceLink}
                </Link>
              </p>
            </div>
          </CollapsibleSection>

          {/* EMF Modulome */}
          <CollapsibleSection id="modulome" title={d.modulomeTitle} subtitle={d.modulomeSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.modulomeDesc}
            </p>
            <ModulomeLayers locale={locale} />
            <p className="mt-4 text-sm">
              <Link href={`${prefix}/evidence`} className="text-accent hover:underline">
                &rarr; {locale_key === "fi"
                  ? "Katso miten tämä ilmenee sairauksina"
                  : "See how this manifests as diseases"}
              </Link>
            </p>
          </CollapsibleSection>

          {/* Two-Level Prediction Model */}
          <section id="two-level-prediction" className="mb-14">
            <h2 className="text-xl font-semibold mb-1">{d.twoLevelTitle}</h2>
            <p className="text-xs text-foreground-muted italic mb-4">{d.twoLevelSub}</p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.twoLevelLead}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mb-6">
              <article className="rounded-xl border-2 border-blue-500/30 bg-blue-500/5 p-5">
                <h3 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">{d.twoLevelL1}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.twoLevelL1Desc}</p>
              </article>
              <article className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-5">
                <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">{d.twoLevelL2}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.twoLevelL2Desc}</p>
              </article>
            </div>

            <p className="text-sm text-foreground-muted mb-4 max-w-3xl">{d.twoLevelCombined}</p>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 max-w-3xl mb-4">
              <p className="text-xs text-foreground-muted">{d.twoLevelCaveat}</p>
            </div>

            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 max-w-3xl">
              <p className="text-xs text-foreground-muted">{d.twoLevelDiagnostic}</p>
            </div>
          </section>

          {/* Testosterone → TFR Threshold Model */}
          <section id="testosterone-threshold" className="mb-14">
            <h2 className="text-xl font-semibold mb-1">{d.thresholdTitle}</h2>
            <p className="text-xs text-foreground-muted italic mb-4">{d.thresholdSub}</p>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.thresholdLead}
            </p>

            <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mb-8">
              <article className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-5">
                <h3 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2">{d.thresholdPhase1Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase1Desc}</p>
              </article>
              <article className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-5">
                <h3 className="font-semibold text-sm text-amber-600 dark:text-amber-400 mb-2">{d.thresholdPhase2Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase2Desc}</p>
              </article>
              <article className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-5">
                <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">{d.thresholdPhase3Title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdPhase3Desc}</p>
              </article>
            </div>

            <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl mb-8">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdMathTitle}</h3>
              <div className="space-y-2 font-mono-num text-sm text-accent mb-3">
                <p>{d.thresholdMathT}</p>
                <p>{d.thresholdMathTFR}</p>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">{d.thresholdMathExplain}</p>
            </div>

            <div className="overflow-x-auto mb-8 max-w-4xl">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdTableTitle}</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-3 font-medium">{d.thresholdTableCountry}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableRate}</th>
                    <th className="text-left py-2 px-3 font-medium">{d.thresholdTableSource}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableCumul}</th>
                    <th className="text-right py-2 px-3 font-medium">{d.thresholdTableThreshold}</th>
                    <th className="text-center py-2 pl-3 font-medium">{d.thresholdTablePhase}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { referenceId: "travison2007_v2", country: "USA", rate: "1.0", source: "Travison 2007", cumul: "−35.7 %", thresh: "~2030", phase: 1 },
                    { referenceId: "andersson-2007-denmark", country: d.countryDenmark, rate: "0.85", source: "Andersson 2007 †", cumul: "−31.3 %", thresh: "~2035", phase: 1 },
                    { referenceId: "perheentupa2013", country: d.countryFinland, rate: "1.2", source: "Perheentupa 2013", cumul: "−41.2 %", thresh: "~2018 ✓", phase: 2 },
                    { referenceId: "chodick-2020-israel", country: "Israel", rate: "1.0", source: "Chodick 2020", cumul: "−35.7 %", thresh: "~2035", phase: 1 },
                    { country: d.countrySouthKorea, rate: "1.5*", source: locale_key === "fi" ? "Arvio (korkein EMF)" : "Estimated (highest EMF)", cumul: "−48.6 %", thresh: "~2015 ✓", phase: 3 },
                    { country: locale_key === "fi" ? "Japani" : "Japan", rate: "1.2*", source: locale_key === "fi" ? "Arvio (Suomi-analogia)" : "Estimated (Finland analogy)", cumul: "−41.2 %", thresh: "~2018 ✓", phase: 2 },
                  ].map((r) => {
                    const phaseColor = r.phase === 1 ? "#22c55e" : r.phase === 2 ? "#f59e0b" : "#ef4444";
                    return (
                      <tr key={r.country} className="border-b border-card-border/50">
                        <td className="py-2 pr-3 font-medium text-foreground">{r.country}</td>
                        <td className="py-2 px-3 text-right font-mono-num">{r.rate}</td>
                        <td className="py-2 px-3 text-foreground-muted">
                          {"referenceId" in r && r.referenceId ? (
                            <CitationLink citation={r.source} referenceId={r.referenceId} locale={locale_key} />
                          ) : (
                            r.source
                          )}
                        </td>
                        <td className="py-2 px-3 text-right font-mono-num text-accent">{r.cumul}</td>
                        <td className="py-2 px-3 text-right font-mono-num">{r.thresh}</td>
                        <td className="py-2 pl-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold" style={{ backgroundColor: `${phaseColor}20`, color: phaseColor }}>{r.phase}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-3 space-y-1.5">
                <p className="text-[10px] text-foreground-muted leading-relaxed">
                  <span className="font-semibold">†</span> {cite(d.thresholdFootnoteDenmark)}
                </p>
                <p className="text-[10px] text-foreground-muted leading-relaxed">
                  <span className="font-semibold">*</span> {d.thresholdFootnoteEstimated}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 max-w-4xl mb-8">
              <h3 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">{d.thresholdFinlandTitle}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{cite(d.thresholdFinlandText)}</p>
            </div>

            <div className="max-w-4xl mb-6">
              <h3 className="font-semibold text-sm mb-3">{d.thresholdChartTitle}</h3>
              <ThresholdChart locale={locale_key} />
            </div>

            <p className="text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
              {d.thresholdCaveat}
            </p>

            {/* Causal structure: Why BMI does not explain the decline */}
            <div id="causal-structure" className="mt-10 max-w-4xl">
              <h3 className="text-base font-semibold mb-2">{d.causalStructureTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.causalStructureLead}</p>

              {/* Two parallel DAGs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="rounded-xl border border-card-border bg-card-bg p-4">
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">{d.causalDagConventionalTitle}</p>
                  <svg viewBox="0 0 280 180" className="w-full" role="img" aria-label="Conventional DAG: BMI as confounder">
                    <rect x="55" y="10" width="170" height="32" rx="6" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                    <text x="140" y="30" textAnchor="middle" className="fill-foreground text-[10px] font-medium">{d.dagDietLifestyle}</text>
                    <rect x="10" y="90" width="80" height="30" rx="6" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                    <text x="50" y="110" textAnchor="middle" className="fill-foreground text-[11px] font-medium">BMI ↑</text>
                    <rect x="190" y="90" width="80" height="30" rx="6" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                    <text x="230" y="110" textAnchor="middle" className="fill-foreground text-[11px] font-medium">T ↓</text>
                    <line x1="105" y1="42" x2="60" y2="88" className="stroke-foreground-muted/50" strokeWidth="1.5" markerEnd="url(#arrowConv)" />
                    <line x1="175" y1="42" x2="220" y2="88" className="stroke-foreground-muted/50" strokeWidth="1.5" markerEnd="url(#arrowConv)" />
                    <line x1="90" y1="105" x2="188" y2="105" className="stroke-foreground-muted/50" strokeWidth="1.5" markerEnd="url(#arrowConv)" />
                    <text x="140" y="145" textAnchor="middle" className="fill-green-500 text-[10px] font-semibold">{d.dagBmiAdjCorrect}</text>
                    <text x="140" y="160" textAnchor="middle" className="fill-foreground-muted text-[9px]">{d.dagNullNoDecline}</text>
                    <defs><marker id="arrowConv" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-foreground-muted/50" /></marker></defs>
                  </svg>
                  <p className="text-[10px] text-foreground-muted mt-2 text-center">{d.causalDagConventionalCaption}</p>
                </div>

                <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-4">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{d.causalDagBermTitle}</p>
                  <svg viewBox="0 0 280 200" className="w-full" role="img" aria-label="BERM DAG: BMI as mediator">
                    <rect x="90" y="5" width="100" height="30" rx="6" className="fill-purple-500/10 stroke-purple-500/50" strokeWidth="1.5" />
                    <text x="140" y="24" textAnchor="middle" className="fill-foreground text-[11px] font-medium">EMF</text>
                    <rect x="10" y="80" width="80" height="30" rx="6" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                    <text x="50" y="100" textAnchor="middle" className="fill-foreground text-[11px] font-medium">BMI ↑</text>
                    <rect x="190" y="80" width="80" height="30" rx="6" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                    <text x="230" y="100" textAnchor="middle" className="fill-foreground text-[11px] font-medium">T ↓</text>
                    <text x="96" y="52" textAnchor="start" className="fill-amber-500 text-[8px]">{d.dagMetabolicPaths}</text>
                    <text x="96" y="63" textAnchor="start" className="fill-amber-500 text-[8px]">{d.dagPathways}</text>
                    <path d="M112 36 L90 50 L78 78" className="fill-none stroke-amber-500/60" strokeWidth="1.5" markerEnd="url(#arrowBerm)" />
                    <line x1="90" y1="95" x2="188" y2="95" className="stroke-amber-500/60" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowBerm)" />
                    <text x="140" y="89" textAnchor="middle" className="fill-amber-500 text-[8px]">{d.dagMediated}</text>
                    <line x1="170" y1="35" x2="225" y2="78" className="stroke-red-500/80" strokeWidth="2" markerEnd="url(#arrowBermR)" />
                    <text x="215" y="55" textAnchor="middle" className="fill-red-500 text-[8px]">{d.dagDirect}</text>
                    <text x="210" y="65" textAnchor="middle" className="fill-red-500 text-[8px]">Cav3.2 / mel / cort</text>
                    <line x1="140" y1="130" x2="140" y2="145" className="stroke-red-500/60" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="140" y="160" textAnchor="middle" className="fill-red-500 text-[10px] font-semibold">{d.dagOvercorrection}</text>
                    <text x="140" y="175" textAnchor="middle" className="fill-foreground-muted text-[9px]">{d.dagRemoves}</text>
                    <defs>
                      <marker id="arrowBerm" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-amber-500/60" /></marker>
                      <marker id="arrowBermR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-red-500/80" /></marker>
                    </defs>
                  </svg>
                  <p className="text-[10px] text-foreground-muted mt-2 text-center">{d.causalDagBermCaption}</p>
                </div>
              </div>

              {/* Mazur 2013 highlight */}
              <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 p-5 mb-8">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">{cite(d.causalMazurTitle)}</p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.causalMazurText}</p>
                <blockquote className="border-l-4 border-amber-500/50 pl-4 py-2 mb-2">
                  <p className="text-sm text-foreground italic leading-relaxed">&ldquo;{d.causalMazurQuote}&rdquo;</p>
                </blockquote>
                <p className="text-xs text-foreground-muted">{cite(d.causalMazurSource)}</p>
              </div>

              {/* Pathway proportions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                  <p className="text-xs font-semibold text-red-500 mb-1">{d.causalPathwayDirect}</p>
                  <p className="text-lg font-bold font-mono-num text-foreground mb-1">{d.causalPathwayDirectEst}</p>
                  <p className="text-xs text-foreground-muted">{d.causalPathwayDirectDesc}</p>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-500 mb-1">{d.causalPathwayMediated}</p>
                  <p className="text-lg font-bold font-mono-num text-foreground mb-1">{d.causalPathwayMediatedEst}</p>
                  <p className="text-xs text-foreground-muted">{d.causalPathwayMediatedDesc}</p>
                </div>
              </div>
              <p className="text-xs text-foreground-muted italic border-l-2 border-amber-500/30 pl-3 mb-8">{cite(d.causalPathwayCaveat)}</p>

              {/* Reconciliation table */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold mb-2">{d.causalReconciliationTitle}</h4>
                <p className="text-xs text-foreground-muted mb-3">{d.causalReconciliationLead}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-card-border text-left">
                        <th className="py-2 pr-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Tutkimus" : "Study"}</th>
                        <th className="py-2 pr-3 font-medium text-foreground-muted">{locale_key === "fi" ? "BMI-korj." : "BMI adj."}</th>
                        <th className="py-2 pr-3 font-medium text-foreground-muted">{locale_key === "fi" ? "Tulos" : "Result"}</th>
                        <th className="py-2 font-medium text-foreground-muted">{locale_key === "fi" ? "BERM-tulkinta" : "BERM interpretation"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.causalReconciliationStudies.map((row: { referenceId: string; study: string; bmiAdj: boolean; result: string; interpretation: string }) => (
                        <tr key={row.study} className={`border-b border-card-border/50${row.result.toLowerCase().includes("null") || row.result.toLowerCase().includes("nolla") ? " opacity-70" : ""}`}>
                          <td className="py-2 pr-3 font-medium text-foreground whitespace-nowrap">
                            <CitationLink citation={row.study} referenceId={row.referenceId} locale={locale_key} />
                          </td>
                          <td className="py-2 pr-3">{row.bmiAdj ? "✓" : "—"}</td>
                          <td className={`py-2 pr-3 font-mono-num whitespace-nowrap ${row.result.toLowerCase().includes("null") || row.result.toLowerCase().includes("nolla") ? "text-foreground-muted" : "text-red-500 font-semibold"}`}>{row.result}</td>
                          <td className="py-2 text-foreground-muted">{row.interpretation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Santi 2025 highlight */}
              <div className="rounded-xl border-2 border-purple-500/40 bg-purple-500/5 p-5 mb-8">
                <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">{cite(d.causalSantiTitle)}</p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.causalSantiText}</p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-2">{d.causalSantiMechanism}</p>
                <p className="text-xs text-foreground-muted">{cite(d.causalSantiSource)}</p>
              </div>

            <h3 className="text-base font-semibold mt-10 mb-2">{d.pocketTitle}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">{cite(d.pocketText)}</p>

              {/* Inverse pharmacological test */}
              <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 mb-4">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">{d.causalInverseTitle}</p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.causalInverseText}</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {d.causalInverseData.map((row: { label: string; loss: string; bmi: string }) => (
                    <div key={row.label} className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
                      <p className="text-[10px] text-foreground-muted mb-1">{row.label}</p>
                      <p className="text-base font-bold font-mono-num text-green-600">{row.loss}</p>
                      <p className="text-[10px] text-foreground-muted mt-0.5">BMI {row.bmi}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground-muted">{cite(d.causalInverseSource)}</p>
              </div>
            </div>

            {/* Why pronatalism fails */}
            <div className="mt-10 max-w-3xl">
              <h3 className="text-base font-semibold mb-3">{d.whyPronatTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                {d.whyPronatText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                  <p className="text-xs font-semibold text-blue-400 mb-1">{d.labelPrediction}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{d.whyPronatPrediction}</p>
                </div>
                <div className="flex-1 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-xs font-semibold text-red-400 mb-1">{d.labelFalsification}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{d.whyPronatFalsification}</p>
                </div>
              </div>
            </div>

            {/* Biological floor */}
            <div className="mt-10 max-w-3xl">
              <h3 className="text-base font-semibold mb-3">{d.bioFloorTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                {d.bioFloorText}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {d.bioFloorTimeline.map((row: { year: string; value: string; note: string }) => (
                  <div
                    key={row.year}
                    className="rounded-lg border border-card-border bg-card-bg p-3 text-center"
                  >
                    <p className="text-xs text-foreground-muted">{row.year}</p>
                    <p className="text-lg font-bold font-mono-num">{row.value}</p>
                    {row.note && (
                      <p className="text-[10px] text-foreground-muted/70 mt-1">{row.note}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed italic border-l-2 border-red-500/30 pl-3">
                {d.bioFloorConsequence}
              </p>
            </div>

            {/* Six-factor summary */}
            <div className="mt-10 max-w-4xl">
              <h3 className="text-base font-semibold mb-2">{d.sixFactorTitle}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">
                {d.sixFactorLead}
              </p>
              <SixFactorSummary locale={locale_key} />
            </div>
          </section>

          {/* Extended Disease Cascades 9-18 */}
          <section id="disease-cascades" className="mb-14">
            <h2 className="text-xl font-semibold mb-2">{d.diseaseCascadesTitle}</h2>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.diseaseCascadesLead}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.diseaseCascades.map((c: { num: number; title: string; mechanism: string; level: string; trend: string }) => {
                const color = CHAIN_EPISTEMIC_COLORS[c.level as EpistemicLevel] ?? "#6B7280";
                return (
                  <article
                    key={c.num}
                    className="rounded-xl border border-card-border bg-card-bg p-5"
                    style={{ borderTopWidth: 3, borderTopColor: color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          {c.num}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                      </div>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-xs font-semibold shrink-0"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {c.level}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed mb-3">
                      {cite(c.mechanism)}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                      <span className="font-mono-num text-foreground" style={{ color }}>
                        &uarr;
                      </span>
                      <span className="font-mono-num">{c.trend}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* VGCC Gene Family Diagram */}
            <div id="vgcc-gene-family" className="mt-10 scroll-mt-24">
              <h3 className="text-lg font-semibold mb-1">{d.vgccDiagramTitle}</h3>
              <p className="text-xs text-foreground-muted mb-4">{d.vgccDiagramSubtitle}</p>
              <VGCCGeneFamilyDiagram locale={locale} />

              {/* EMF sensitivity hierarchy bar chart */}
              <div className="mt-8 p-4 rounded-lg border border-border bg-card">
                <h4 className="text-sm font-semibold mb-1">{d.emfBarTitle}</h4>
                <p className="text-xs text-foreground-muted mb-4">{d.emfBarSubtitle}</p>
                <div className="space-y-2">
                  {[
                    { label: "Cav3.2", gene: "CACNA1H", pct: 100, color: "#F59E0B", note: "T-type, −46 mV" },
                    { label: "Cav3.3", gene: "CACNA1I", pct: 88, color: "#EC4899", note: "T-type, −44 mV" },
                    { label: "Cav3.1", gene: "CACNA1G", pct: 78, color: "#10B981", note: "T-type, −42 mV" },
                    { label: "Cav1.3", gene: "CACNA1D", pct: 35, color: "#8B5CF6", note: "L-type, −50 mV" },
                    { label: "Cav1.2", gene: "CACNA1C", pct: 8, color: "#EF4444", note: "L-type, −30 mV" },
                    { label: "Cav2.1", gene: "CACNA1A", pct: 3, color: "#3B82F6", note: "P/Q-type, −20 mV" },
                  ].map((ch) => (
                    <div key={ch.label} className="flex items-center gap-2 text-xs">
                      <span className="w-12 font-mono font-semibold shrink-0" style={{ color: ch.color }}>{ch.label}</span>
                      <div className="flex-1 h-5 bg-card-border/30 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{ width: `${ch.pct}%`, backgroundColor: ch.color, opacity: 0.7 }}
                        />
                      </div>
                      <span className="w-28 text-foreground-muted shrink-0 text-right">{ch.note}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground-muted mt-3 italic">
                  {d.svgVgccHierarchyCaption}
                </p>
              </div>
            </div>
          </section>

          {/* Five-layer recovery model */}
          <CollapsibleSection id="recovery" title={d.recovTitle} subtitle={d.recovSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.recovDesc}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.recovColLayer}</th>
                    <th className="py-2 pr-4 font-medium">{d.recovColAlpha}</th>
                    <th className="py-2 pr-4 font-medium">
                      {d.recovColTimescale}
                    </th>
                    <th className="py-2 font-medium">{d.recovColNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovVgicLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">1.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovVgicTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovVgicNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovRosLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.8</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovRosTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovRosNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">{d.recovDnaLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.1</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovDnaTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovDnaNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border">
                    <td className="py-3 pr-4 font-medium">
                      {d.recovLeydigLayer}
                    </td>
                    <td className="py-3 pr-4 font-mono-num">0.3</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovLeydigTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {d.recovLeydigNote}
                    </td>
                  </tr>
                  <tr className="border-b border-card-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{d.recovBbbLayer}</td>
                    <td className="py-3 pr-4 font-mono-num">0.0</td>
                    <td className="py-3 pr-4 text-foreground-muted">
                      {d.recovBbbTime}
                    </td>
                    <td className="py-3 text-foreground-muted">
                      {cite(d.recovBbbNote)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recovery Rates Bar Chart */}
            <div className="my-8 max-w-2xl mx-auto">
              <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label={d.svgRecoveryBarAria}>
                {/* VGIC gating - alpha=1.0 (100%) */}
                <text x="150" y="38" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.8" fontFamily="system-ui">{d.recovVgicLayer}</text>
                <rect x="160" y="24" width="280" height="22" rx="4" ry="4" fill="#22c55e" fillOpacity="0.7" />
                <text x="448" y="39" fontSize="10" fontWeight="600" fill="#22c55e" fontFamily="monospace">100%</text>
                <text x="300" y="39" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500" fontFamily="system-ui">{"α = 1.0"}</text>

                {/* ROS clearance - alpha=0.8 (80%) */}
                <text x="150" y="78" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.8" fontFamily="system-ui">{d.recovRosLayer}</text>
                <rect x="160" y="64" width="224" height="22" rx="4" ry="4" fill="#84cc16" fillOpacity="0.7" />
                <text x="392" y="79" fontSize="10" fontWeight="600" fill="#84cc16" fontFamily="monospace">80%</text>
                <text x="272" y="79" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500" fontFamily="system-ui">{"α = 0.8"}</text>

                {/* Leydig cells - alpha=0.3 (30%) */}
                <text x="150" y="118" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.8" fontFamily="system-ui">{d.recovLeydigLayer}</text>
                <rect x="160" y="104" width="84" height="22" rx="4" ry="4" fill="#f59e0b" fillOpacity="0.7" />
                <text x="252" y="119" fontSize="10" fontWeight="600" fill="#f59e0b" fontFamily="monospace">30%</text>
                <text x="202" y="119" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500" fontFamily="system-ui">{"α = 0.3"}</text>

                {/* DNA repair - alpha=0.1 (10%) */}
                <text x="150" y="158" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.8" fontFamily="system-ui">{d.recovDnaLayer}</text>
                <rect x="160" y="144" width="28" height="22" rx="4" ry="4" fill="#f97316" fillOpacity="0.7" />
                <text x="196" y="159" fontSize="10" fontWeight="600" fill="#f97316" fontFamily="monospace">10%</text>
                <text x="174" y="159" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="500" fontFamily="system-ui">{"α"}</text>

                {/* BBB - alpha=0.0 (0%) */}
                <text x="150" y="198" textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.8" fontFamily="system-ui">{d.recovBbbLayer}</text>
                <rect x="160" y="184" width="4" height="22" rx="2" ry="2" fill="#ef4444" fillOpacity="0.7" />
                <text x="172" y="199" fontSize="10" fontWeight="600" fill="#ef4444" fontFamily="monospace">0%</text>

                {/* Baseline axis */}
                <line x1="160" y1="20" x2="160" y2="210" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

                {/* Caption */}
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">
                  {d.svgRecoveryCaption}
                </text>
              </svg>
            </div>

            <p className="mt-4 text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {cite(d.recoveryWindowNote)}
            </p>
          </CollapsibleSection>

          {/* Compensation mechanism */}
          <span id="asfr" />
          <CollapsibleSection id="compensation" title={d.compTitle} subtitle={d.compSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compDesc}
            </p>
            <Eq>
              TFR<sub>eff</sub> = (bioCap &times; behav)<sup>(1&minus;&alpha;)</sup>{" "}
              &times; rate<sub>2024</sub> &times; cultRatio &times;{" "}
              bioBehav<sub>2024</sub><sup>&alpha;</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.compWhereLabel}
            </p>
            <ul className="text-sm text-foreground-muted space-y-2 max-w-3xl ml-4 mb-4">
              <li>
                <strong className="text-foreground">bioCap</strong> --{" "}
                {d.compBioCap}
              </li>
              <li>
                <strong className="text-foreground">behav</strong> --{" "}
                {d.compBehav}
              </li>
              <li>
                <strong className="text-foreground">&alpha; = 0.43</strong> --{" "}
                {d.compAlpha}
              </li>
              <li>
                <strong className="text-foreground">
                  rate<sub>2024</sub>
                </strong>{" "}
                -- {d.compRate2024}
              </li>
              <li>
                <strong className="text-foreground">cultRatio</strong> --{" "}
                {d.compCultRatio}
              </li>
              <li>
                <strong className="text-foreground">
                  bioBehav<sub>2024</sub>
                </strong>{" "}
                -- {d.compBioBehav2024}
              </li>
            </ul>
            <p className="text-sm text-foreground-muted max-w-3xl leading-relaxed">
              {d.compExplain}
            </p>
          </CollapsibleSection>

          {/* mTOR convergence */}
          <CollapsibleSection id="mtor" title={d.mtorTitle} subtitle={d.mtorSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc1}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.mtorDesc2}
            </p>
            <Eq>
              mTOR<sub>eff</sub> = (1.0 + 0.25 &times; EMF) &times; &prod;(1 &minus;
              reduction<sub>i</sub>)
            </Eq>
            <Eq>
              aging rate = mTOR<sub>eff</sub><sup>0.7</sup>
            </Eq>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.mtorEqExplain}
            </p>
            <div className="my-8 max-w-md mx-auto" style={{display:'none'}}>
              <svg viewBox="0 0 500 400" className="w-full" role="img" aria-label={locale_key === "fi" ? "mTOR-keskuskaavio (hidden duplicate)" : "mTOR hub diagram (hidden duplicate)"}>
                <defs>
                  <marker id="mh_arFwd" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-foreground-muted/50" /></marker>
                  <marker id="mh_arRev" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" className="fill-foreground-muted/50" /></marker>
                </defs>

                {/* Spoke lines (drawn first so circles render on top) */}
                <line x1="250" y1="165" x2="250" y2="92" className="stroke-cyan-500/40" strokeWidth="2" markerStart="url(#mh_arRev)" markerEnd="url(#mh_arFwd)" />
                <line x1="283" y1="189" x2="353" y2="167" className="stroke-green-500/40" strokeWidth="2" markerStart="url(#mh_arRev)" markerEnd="url(#mh_arFwd)" />
                <line x1="271" y1="228" x2="313" y2="287" className="stroke-amber-500/40" strokeWidth="2" markerStart="url(#mh_arRev)" markerEnd="url(#mh_arFwd)" />
                <line x1="229" y1="228" x2="187" y2="287" className="stroke-orange-500/40" strokeWidth="2" markerStart="url(#mh_arRev)" markerEnd="url(#mh_arFwd)" />
                <line x1="217" y1="189" x2="147" y2="167" className="stroke-purple-500/40" strokeWidth="2" markerStart="url(#mh_arRev)" markerEnd="url(#mh_arFwd)" />

                {/* Center: mTOR */}
                <circle cx="250" cy="200" r="35" className="fill-red-500/15 stroke-red-500/60" strokeWidth="2" />
                <text x="250" y="205" textAnchor="middle" className="fill-foreground text-[13px] font-bold">mTOR</text>

                {/* VGCC pathway (top, cyan) */}
                <circle cx="250" cy="70" r="22" className="fill-cyan-500/15 stroke-cyan-500/60" strokeWidth="1.5" />
                <text x="250" y="40" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "VGCC-reitti" : "VGCC pathway"}</text>

                {/* Autophagy (top-right, green) */}
                <circle cx="374" cy="160" r="22" className="fill-green-500/15 stroke-green-500/60" strokeWidth="1.5" />
                <text x="400" y="155" textAnchor="start" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Autofagia" : "Autophagy"}</text>

                {/* Protein synthesis (bottom-right, amber) */}
                <circle cx="326" cy="305" r="22" className="fill-amber-500/15 stroke-amber-500/60" strokeWidth="1.5" />
                <text x="326" y="340" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Proteiinisynteesi" : "Protein synthesis"}</text>

                {/* Cell growth (bottom-left, orange) */}
                <circle cx="174" cy="305" r="22" className="fill-orange-500/15 stroke-orange-500/60" strokeWidth="1.5" />
                <text x="174" y="340" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Solukasvu" : "Cell growth"}</text>

                {/* Immune regulation (left, purple) */}
                <circle cx="126" cy="160" r="22" className="fill-purple-500/15 stroke-purple-500/60" strokeWidth="1.5" />
                <text x="100" y="155" textAnchor="end" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Immunosäätely" : "Immune regulation"}</text>
              </svg>
            </div>

            <h3 className="text-base font-semibold mb-3">{d.mtorThreeTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorAging}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorAgingDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorFertility}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorFertilityDesc}
                </p>
              </SectionCard>
              <SectionCard>
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  {d.mtorCancer}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {d.mtorCancerDesc}
                </p>
              </SectionCard>
            </div>

            {/* mTOR Hub Diagram */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="mTOR signaling hub">
                {/* Central mTOR hub */}
                <circle cx="300" cy="180" r="44" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
                <text x="300" y="176" textAnchor="middle" fontSize="14" fontWeight="700" fill="#f59e0b" fontFamily="system-ui">mTOR</text>
                <text x="300" y="192" textAnchor="middle" fontSize="9" fill="#f59e0b" fillOpacity="0.7" fontFamily="system-ui">
                  {locale_key === "fi" ? "integraattori" : "integrator"}
                </text>

                {/* Input: EMF */}
                <rect x="30" y="30" width="120" height="44" rx="6" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="90" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3b82f6" fontFamily="system-ui">EMF</text>
                <text x="90" y="63" textAnchor="middle" fontSize="8" fill="#3b82f6" fillOpacity="0.7" fontFamily="system-ui">VGCC→Ca²⁺→mTOR↑</text>
                <line x1="150" y1="60" x2="260" y2="155" stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#arrowBlue)" />

                {/* Input: Caloric excess */}
                <rect x="240" y="10" width="120" height="44" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.2" />
                <text x="300" y="29" textAnchor="middle" fontSize="10" fontWeight="600" fill="#10b981" fontFamily="system-ui">
                  {locale_key === "fi" ? "Kalorit" : "Calories"}
                </text>
                <text x="300" y="43" textAnchor="middle" fontSize="8" fill="#10b981" fillOpacity="0.7" fontFamily="system-ui">insulin→PI3K→mTOR↑</text>
                <line x1="300" y1="54" x2="300" y2="136" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.5" />

                {/* Input: Aging */}
                <rect x="450" y="30" width="120" height="44" rx="6" fill="#8b5cf6" fillOpacity="0.12" stroke="#8b5cf6" strokeWidth="1.2" />
                <text x="510" y="49" textAnchor="middle" fontSize="10" fontWeight="600" fill="#8b5cf6" fontFamily="system-ui">
                  {locale_key === "fi" ? "Ikääntyminen" : "Aging"}
                </text>
                <text x="510" y="63" textAnchor="middle" fontSize="8" fill="#8b5cf6" fillOpacity="0.7" fontFamily="system-ui">AMPK↓→mTOR↑</text>
                <line x1="450" y1="60" x2="340" y2="155" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.5" />

                {/* Inhibitor: Metformin */}
                <rect x="30" y="155" width="110" height="50" rx="6" fill="#14b8a6" fillOpacity="0.12" stroke="#14b8a6" strokeWidth="1.2" strokeDasharray="4 2" />
                <text x="85" y="174" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14b8a6" fontFamily="system-ui">Metformin</text>
                <text x="85" y="188" textAnchor="middle" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="system-ui">AMPK↑→mTOR↓</text>
                <text x="85" y="200" textAnchor="middle" fontSize="7" fill="#14b8a6" fillOpacity="0.5" fontFamily="system-ui">
                  {locale_key === "fi" ? "(vastavaikutus)" : "(counteracts)"}
                </text>
                <line x1="140" y1="180" x2="256" y2="180" stroke="#14b8a6" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 2" />

                {/* Output arrows to three epidemics */}
                {[
                  { x: 130, label: locale_key === "fi" ? "Ikääntyminen" : "Aging", detail: "autophagy↓ senescence↑", color: "#ef4444" },
                  { x: 300, label: locale_key === "fi" ? "Hedelmällisyys↓" : "Fertility↓", detail: "spermatogonia↓ AMH↓", color: "#ec4899" },
                  { x: 470, label: locale_key === "fi" ? "Syöpä" : "Cancer", detail: "proliferation↑ growth↑", color: "#f97316" },
                ].map((o) => (
                  <g key={o.label}>
                    <line x1="300" y1="224" x2={o.x} y2="280" stroke={o.color} strokeWidth="1.2" strokeOpacity="0.5" />
                    <rect x={o.x - 65} y="280" width="130" height="44" rx="6" fill={o.color} fillOpacity="0.12" stroke={o.color} strokeWidth="1.2" />
                    <text x={o.x} y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill={o.color} fontFamily="system-ui">{o.label}</text>
                    <text x={o.x} y="315" textAnchor="middle" fontSize="8" fill={o.color} fillOpacity="0.7" fontFamily="system-ui">{o.detail}</text>
                  </g>
                ))}

                {/* Caption */}
                <text x="300" y="360" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="system-ui">
                  {locale_key === "fi" ? "mTOR on yhteinen soluttaja — kolme epidemiaa, yksi mekanismi" : "mTOR is the shared hub — three epidemics, one mechanism"}
                </text>
              </svg>
            </div>

            <h3 className="text-base font-semibold mb-3">{d.mtorPredTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColId}</th>
                    <th className="py-2 pr-4 font-medium">{d.mtorPredColPred}</th>
                    <th className="py-2 font-medium">{d.mtorPredColTest}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.mtorPreds.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-card-border${
                        i === d.mtorPreds.length - 1 ? " last:border-0" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 font-mono-num">{row.id}</td>
                      <td className="py-3 pr-4 text-foreground-muted">
                        {row.pred}
                      </td>
                      <td className="py-3 text-foreground-muted">{row.test}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>

          {/* CaMKII Convergence */}
          <CollapsibleSection id="camkii-convergence" title={d.camkiiConvTitle} subtitle={d.camkiiConvSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.camkiiConvDesc}
            </p>
            <CaMKIIConvergenceDiagram locale={locale} />
            <div className="mt-6 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                {d.camkiiConvCaveat}
              </p>
            </div>
            <Link
              href={`${prefix}/evidence#metabolic-evidence`}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-4"
            >
              {d.camkiiConvLink}
            </Link>
          </CollapsibleSection>

          {/* ELF Priming Hypothesis */}
          <section className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <h3 className="text-sm font-semibold mb-2">{d.elfPrimingTitle}</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">{cite(d.elfPrimingDesc)}</p>
            <p className="text-xs text-foreground-muted/70 leading-relaxed mt-2 italic">{d.elfFreqNote}</p>
          </section>

          {/* Technology Layers */}
          <CollapsibleSection id="technology-layers" title={d.techLayersTitle} subtitle={d.techLayersSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.techLayersDesc}
            </p>

            {/* Technology Layers Stacked Area Chart */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 370" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label={d.svgTechLayersAria}>
                <defs>
                  <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Chart area background */}
                <rect x="80" y="20" width="580" height="280" fill="url(#gridFade)" rx="4" />

                {/* Y-axis gridlines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={`grid-${i}`} x1="80" y1={20 + i * 70} x2="660" y2={20 + i * 70} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                ))}

                {/* Stacked area paths - each layer starts at its deployment year */}
                {/* X scale: 1900=80, 2030=660 => px = 80 + (year-1900) * (580/130) */}
                {/* Y scale: 0=300, max=20 => py = 300 - val * 14 */}

                {/* Layer 1: Power Grid (1900+) - slate/dark blue */}
                <path d="M 80,300 L 80,286 C 170,272 260,265 350,258 C 440,251 530,244 660,237 L 660,300 Z" fill="#475569" fillOpacity="0.55" />
                <text x="160" y="290" fontSize="9" fontWeight="600" fill="#cbd5e1" fontFamily="system-ui">{d.layerPowerGrid}</text>

                {/* Layer 2: Radio/TV (1950+) - teal */}
                <path d="M 303,300 L 303,258 C 370,244 440,230 530,216 C 580,209 620,202 660,195 L 660,237 C 620,244 530,251 440,258 C 370,265 303,272 303,286 Z" fill="#0d9488" fillOpacity="0.5" />
                <text x="450" y="248" fontSize="9" fontWeight="600" fill="#5eead4" fontFamily="system-ui">{d.layerRadioTv}</text>

                {/* Layer 3: Cellular (1990+) - amber */}
                <path d="M 482,300 L 482,216 C 520,195 560,174 620,153 L 660,139 L 660,195 C 620,202 560,216 520,230 C 500,237 490,244 482,258 Z" fill="#d97706" fillOpacity="0.5" />
                <text x="560" y="195" fontSize="9" fontWeight="600" fill="#fbbf24" fontFamily="system-ui">{d.layerCellular}</text>

                {/* Layer 4: WiFi/4G (2005+) - orange */}
                <path d="M 549,300 L 549,174 C 575,153 610,125 640,104 L 660,90 L 660,139 C 640,146 610,160 575,174 C 560,181 552,195 549,216 Z" fill="#ea580c" fillOpacity="0.5" />
                <text x="600" y="140" fontSize="9" fontWeight="600" fill="#fb923c" fontFamily="system-ui">WiFi/4G</text>

                {/* Layer 5: 5G/IoT (2020+) - red */}
                <path d="M 616,300 L 616,104 C 630,83 645,62 655,48 L 660,42 L 660,90 C 650,97 640,104 630,118 C 622,132 618,153 616,174 Z" fill="#dc2626" fillOpacity="0.55" />
                <text x="635" y="80" fontSize="9" fontWeight="600" fill="#f87171" fontFamily="system-ui">5G/IoT</text>

                {/* X-axis */}
                <line x1="80" y1="300" x2="660" y2="300" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                {[1900, 1920, 1940, 1960, 1980, 2000, 2020].map((year) => {
                  const xPos = 80 + ((year - 1900) / 130) * 580;
                  return (
                    <g key={year}>
                      <line x1={xPos} y1="300" x2={xPos} y2="305" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                      <text x={xPos} y="318" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">{year}</text>
                    </g>
                  );
                })}

                {/* Y-axis */}
                <line x1="80" y1="20" x2="80" y2="300" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                <text x="40" y="165" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui" transform="rotate(-90 40 165)">
                  {d.svgCumulativeExposure}
                </text>

                {/* Caption */}
                <text x="370" y="345" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">
                  {d.svgTechLayersCaption}
                </text>
              </svg>
            </div>

            <Link
              href={`${prefix}/evidence/technology`}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              {d.techLayersLink}
            </Link>
          </CollapsibleSection>

          {/* Layered Exposure Model */}
          <CollapsibleSection id="layered-exposure-model" title={d.layerModelTitle} subtitle={d.layerModelSub}>
            <p className="text-sm text-foreground-muted mb-8 max-w-3xl leading-relaxed">
              {d.layerModelDesc}
            </p>

            {/* Five anomalies */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">{d.layerAnomaliesTitle}</h4>
            <div className="grid gap-3 mb-10">
              {d.layerAnomalies.map((a: { referenceId?: string; title: string; subtitle: string; conventional: string; explanation: string; ref: string }) => (
                <div key={a.title} className="rounded-xl border border-card-border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-foreground-muted">{a.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                      <p className="font-medium text-red-400 mb-1">{d.conventionalLabel}</p>
                      <p className="text-foreground-muted">{a.conventional}</p>
                    </div>
                    <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3">
                      <p className="font-medium text-green-400 mb-1">{d.layerExplanationLabel}</p>
                      <p className="text-foreground-muted">{a.explanation}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground-muted/60 mt-2">
                    {a.referenceId ? (
                      <CitationLink citation={a.ref} referenceId={a.referenceId} locale={locale_key} />
                    ) : (
                      a.ref
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Anomalies comparison chart */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Background panels */}
                <rect x="0" y="0" width="340" height="300" rx="8" className="fill-red-500/5 dark:fill-red-500/10" />
                <rect x="360" y="0" width="340" height="300" rx="8" className="fill-green-500/5 dark:fill-green-500/10" />
                {/* Headers */}
                <text x="170" y="28" textAnchor="middle" className="fill-red-500 dark:fill-red-400" fontSize="13" fontWeight="700">
                  {d.conventional}
                </text>
                <text x="530" y="28" textAnchor="middle" className="fill-green-600 dark:fill-green-400" fontSize="13" fontWeight="700">
                  BERM
                </text>
                <line x1="0" y1="40" x2="700" y2="40" stroke="currentColor" strokeOpacity="0.15" />
                {/* Row data */}
                {[
                  {
                    anomaly: d.anomalyUnexplainedDecline,
                    conv: d.anomalyUnexplained,
                    berm: d.anomalyWifiLedLayers,
                  },
                  {
                    anomaly: d.anomalySomeTheory,
                    conv: d.anomalySomeTheory,
                    berm: d.anomalyTripleChannel,
                  },
                  {
                    anomaly: d.anomalySedentary,
                    conv: d.anomalySedentary,
                    berm: d.anomaly247Emf,
                  },
                  {
                    anomaly: d.anomalyProsperity,
                    conv: d.anomalyProsperity,
                    berm: d.anomalyElectrificationLag,
                  },
                  {
                    anomaly: d.anomalyPhysicalLabor,
                    conv: d.anomalyPhysicalLabor,
                    berm: d.anomalyZeroLayers,
                  },
                ].map((row, i) => {
                  const y = 65 + i * 48;
                  return (
                    <g key={i}>
                      {i > 0 && <line x1="20" y1={y - 14} x2="680" y2={y - 14} stroke="currentColor" strokeOpacity="0.08" />}
                      {/* Conventional label */}
                      <text x="170" y={y + 4} textAnchor="middle" fontSize="11" className="fill-red-600/80 dark:fill-red-400/80">
                        {row.conv}
                      </text>
                      {/* Anomaly center label */}
                      <rect x="280" y={y - 14} width="140" height="28" rx="14" className="fill-card-bg dark:fill-card-bg" stroke="currentColor" strokeOpacity="0.15" />
                      <text x="350" y={y + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">
                        {row.anomaly}
                      </text>
                      {/* Arrows */}
                      <line x1="230" y1={y} x2="278" y2={y} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" markerEnd="url(#arrowR7)" />
                      <line x1="470" y1={y} x2="422" y2={y} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" markerEnd="url(#arrowL7)" />
                      {/* BERM label */}
                      <text x="530" y={y + 4} textAnchor="middle" fontSize="11" className="fill-green-700/80 dark:fill-green-400/80">
                        {row.berm}
                      </text>
                    </g>
                  );
                })}
                <defs>
                  <marker id="arrowR7" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L6,3 L0,6" fill="currentColor" fillOpacity="0.3" />
                  </marker>
                  <marker id="arrowL7" viewBox="0 0 6 6" refX="0" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M6,0 L0,3 L6,6" fill="currentColor" fillOpacity="0.3" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Formula v20 */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">{d.layerFormulaTitle}</h4>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-4 font-mono text-sm space-y-1">
              <p className="font-semibold">{d.layerFormula}</p>
              <p className="text-foreground-muted">{d.layerFormulaDetail}</p>
              <p className="text-foreground-muted text-xs mt-2">{d.layerFormulaComposite}</p>
              <p className="text-foreground-muted text-xs">{d.layerFormulaPriming}</p>
              <p className="text-foreground-muted text-xs">{d.layerFormulaRecovery}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium mb-1">P — Priming</p>
                <p className="text-xs text-foreground-muted">{d.layerFormulaPrimingDesc}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium mb-1">R — Recovery</p>
                <p className="text-xs text-foreground-muted">{d.layerFormulaRecoveryDesc}</p>
              </div>
            </div>
            <p className="text-xs text-foreground-muted/70 italic mb-8">{d.layerFormulaNote}</p>

            {/* Country comparison */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">{d.layerCountryTitle}</h4>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-semibold">{d.colCountry}</th>
                    <th className="text-left py-2 px-2 font-semibold">{d.colActual}</th>
                    <th className="text-left py-2 px-2 font-semibold">v19.1</th>
                    <th className="text-left py-2 px-2 font-semibold">v20</th>
                    <th className="text-left py-2 px-2 font-semibold">{d.colNote}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.layerCountries.map((c: { country: string; actual: string; v19: string; v20: string; note: string }) => (
                    <tr key={c.country} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium">{c.country}</td>
                      <td className="py-2 px-2 font-mono">{c.actual}</td>
                      <td className="py-2 px-2 font-mono text-foreground-muted">{c.v19}</td>
                      <td className="py-2 px-2 font-mono font-semibold">{c.v20}</td>
                      <td className="py-2 px-2 text-foreground-muted">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 6-country TFR bar chart */}
            <div className="chart-scroll my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg" className="chart-svg w-full h-auto min-w-[620px]" role="img" aria-label={d.layerProjectionsTitle}>
                {/* Y-axis */}
                <text x="18" y="16" fontSize="10" fontWeight="600" fill="currentColor" fillOpacity="0.6">TFR</text>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => {
                  const y = 310 - v * (260 / 7);
                  return (
                    <g key={v}>
                      <text x="28" y={y + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.5">{v}</text>
                      <line x1="32" y1={y} x2="690" y2={y} stroke="currentColor" strokeOpacity="0.07" />
                    </g>
                  );
                })}
                {/* Bars */}
                {(() => {
                  const countries = [
                    { name: d.countryFinlandName, actual: 1.25, v19: 1.32, v20: 1.28 },
                    { name: d.countrySouthKoreaName, actual: 0.72, v19: 0.95, v20: 0.78 },
                    { name: "Nigeria", actual: 4.38, v19: 4.85, v20: 4.52 },
                    { name: d.countryUsaName, actual: 1.63, v19: 1.55, v20: 1.58 },
                    { name: "Israel", actual: 2.87, v19: 2.40, v20: 2.75 },
                    { name: d.countryAmishName, actual: 6.1, v19: null as number | null, v20: 6.05 },
                  ];
                  const barW = 18;
                  const groupW = 100;
                  const startX = 60;
                  const baseY = 310;
                  const scale = 260 / 7;
                  return countries.map((c, i) => {
                    const gx = startX + i * groupW;
                    return (
                      <g key={i}>
                        {/* Actual bar */}
                        <rect x={gx} y={baseY - c.actual * scale} width={barW} height={c.actual * scale} rx="2" className="fill-gray-400/60 dark:fill-gray-500/60" />
                        <text x={gx + barW / 2} y={baseY - c.actual * scale - 4} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.6">{c.actual}</text>
                        {/* v19 bar */}
                        {c.v19 !== null && (
                          <>
                            <rect x={gx + barW + 3} y={baseY - c.v19 * scale} width={barW} height={c.v19 * scale} rx="2" className="fill-indigo-500/50 dark:fill-indigo-400/50" />
                            <text x={gx + barW + 3 + barW / 2} y={baseY - c.v19 * scale - 4} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.6">{c.v19}</text>
                          </>
                        )}
                        {/* v20 bar */}
                        <rect
                          x={gx + (c.v19 !== null ? 2 * (barW + 3) : barW + 3)}
                          y={baseY - c.v20 * scale}
                          width={barW}
                          height={c.v20 * scale}
                          rx="2"
                          className="fill-teal-500/60 dark:fill-teal-400/60"
                        />
                        <text
                          x={gx + (c.v19 !== null ? 2 * (barW + 3) : barW + 3) + barW / 2}
                          y={baseY - c.v20 * scale - 4}
                          textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.6"
                        >{c.v20}</text>
                        {/* Country label */}
                        <text x={gx + (c.v19 !== null ? 30 : 20)} y={baseY + 16} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.7">{c.name}</text>
                      </g>
                    );
                  });
                })()}
                {/* Legend */}
                <rect x="440" y="8" width="10" height="10" rx="2" className="fill-gray-400/60 dark:fill-gray-500/60" />
                <text x="454" y="17" fontSize="9" fill="currentColor" fillOpacity="0.7">{d.colActual}</text>
                <rect x="510" y="8" width="10" height="10" rx="2" className="fill-indigo-500/50 dark:fill-indigo-400/50" />
                <text x="524" y="17" fontSize="9" fill="currentColor" fillOpacity="0.7">v19</text>
                <rect x="550" y="8" width="10" height="10" rx="2" className="fill-teal-500/60 dark:fill-teal-400/60" />
                <text x="564" y="17" fontSize="9" fill="currentColor" fillOpacity="0.7">v20</text>
              </svg>
            </div>

            {/* Future projections */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">{d.layerProjectionsTitle}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-semibold">{d.colCountry}</th>
                    <th className="text-left py-2 px-2 font-semibold">2024</th>
                    <th className="text-left py-2 px-2 font-semibold">2030</th>
                    <th className="text-left py-2 px-2 font-semibold">2035</th>
                    <th className="text-left py-2 px-2 font-semibold">{d.colDriver}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.layerProjections.map((p: { country: string; y2024: string; y2030: string; y2035: string; driver: string }) => (
                    <tr key={p.country} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium">{p.country}</td>
                      <td className="py-2 px-2 font-mono">{p.y2024}</td>
                      <td className="py-2 px-2 font-mono">{p.y2030}</td>
                      <td className="py-2 px-2 font-mono">{p.y2035}</td>
                      <td className="py-2 px-2 text-foreground-muted">{p.driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5-country TFR projections line chart */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Axes */}
                <line x1="60" y1="30" x2="60" y2="300" stroke="currentColor" strokeOpacity="0.2" />
                <line x1="60" y1="300" x2="670" y2="300" stroke="currentColor" strokeOpacity="0.2" />
                {/* Y-axis labels (TFR 0-5) */}
                {[0, 1, 2, 3, 4, 5].map((v) => {
                  const y = 300 - v * 54;
                  return (
                    <g key={v}>
                      <text x="50" y={y + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.5">{v}</text>
                      <line x1="60" y1={y} x2="670" y2={y} stroke="currentColor" strokeOpacity="0.06" />
                    </g>
                  );
                })}
                {/* X-axis labels */}
                {[
                  { label: "2024", x: 120 },
                  { label: "2030", x: 365 },
                  { label: "2035", x: 610 },
                ].map((tick) => (
                  <g key={tick.label}>
                    <text x={tick.x} y={318} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.6">{tick.label}</text>
                    <line x1={tick.x} y1={300} x2={tick.x} y2={305} stroke="currentColor" strokeOpacity="0.2" />
                  </g>
                ))}
                {/* Replacement level dashed line */}
                <line x1="60" y1={300 - 2.1 * 54} x2="670" y2={300 - 2.1 * 54} stroke="currentColor" strokeOpacity="0.3" strokeDasharray="6 4" />
                <text x="662" y={300 - 2.1 * 54 - 6} textAnchor="end" fontSize="8" fill="currentColor" fillOpacity="0.5">
                  {d.replacementLabel}
                </text>
                {/* Country lines */}
                {(() => {
                  const xVals = [120, 365, 610];
                  const scale = 54;
                  const baseY = 300;
                  const countries = [
                    { name: d.countrySKoreaShort, values: [0.72, 0.60, 0.50], color: "#ef4444" },
                    { name: d.countryFinlandName, values: [1.25, 1.10, 0.975], color: "#3b82f6" },
                    { name: "USA", values: [1.63, 1.475, 1.325], color: "#a855f7" },
                    { name: "Nigeria", values: [4.38, 3.75, 3.15], color: "#f59e0b" },
                    { name: d.countryIndiaName, values: [1.96, 1.65, 1.375], color: "#10b981" },
                  ];
                  return countries.map((c, ci) => {
                    const points = c.values.map((v, vi) => `${xVals[vi]},${baseY - v * scale}`);
                    return (
                      <g key={ci}>
                        <polyline points={points.join(" ")} fill="none" stroke={c.color} strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.8" />
                        {c.values.map((v, vi) => (
                          <g key={vi}>
                            <circle cx={xVals[vi]} cy={baseY - v * scale} r="4" fill={c.color} fillOpacity="0.9">
                              <title>{c.name} · {[2024, 2030, 2035][vi]}: {v}</title>
                            </circle>
                          </g>
                        ))}
                        {/* Legend label at end */}
                        <text x="618" y={baseY - c.values[2] * scale + (ci === 2 ? 14 : ci === 4 ? -8 : 4)} fontSize="8" fill={c.color} fillOpacity="0.9" fontWeight="600">
                          {c.name}
                        </text>
                      </g>
                    );
                  });
                })()}
                <text x="18" y="16" fontSize="10" fontWeight="600" fill="currentColor" fillOpacity="0.6">TFR</text>
              </svg>
            </div>

            <Link
              href={`${prefix}/evidence/technology`}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              {d.layerLink}
            </Link>
          </CollapsibleSection>

          {/* Seasonal Sensitivity */}
          <CollapsibleSection id="seasonal-sensitivity" title={d.seasonTitle} subtitle={d.seasonSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {cite(d.seasonDesc)}
            </p>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-6">
              <p className="text-xs font-medium mb-2">{d.seasonFormulaLabel}</p>
              <p className="font-mono text-sm font-semibold mb-2">{d.seasonFormula}</p>
              <p className="text-xs text-foreground-muted">{d.seasonFormulaDesc}</p>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs font-mono text-amber-500">{d.seasonPred1}</p>
              <p className="text-xs font-mono text-amber-500">{d.seasonPred2}</p>
            </div>
            <p className="text-[10px] text-foreground-muted/60">{cite(d.seasonRef)}</p>
          </CollapsibleSection>

          {/* CACNA1C Individual Susceptibility */}
          <CollapsibleSection id="cacna1c-susceptibility" title={d.cacna1cTitle} subtitle={d.cacna1cSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.cacna1cDesc}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {cite(d.cacna1cEvidence)}
            </p>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6">
              <p className="text-xs text-foreground-muted leading-relaxed">{d.cacna1cImplication}</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-6">
              <p className="text-xs font-medium mb-2">{d.cacna1cFormulaLabel}</p>
              <p className="font-mono text-sm font-semibold mb-2">{d.cacna1cFormula}</p>
              <p className="text-xs text-foreground-muted">{d.cacna1cFormulaDesc}</p>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs font-mono text-amber-500">{d.cacna1cPred1}</p>
              <p className="text-xs font-mono text-amber-500">{d.cacna1cPred2}</p>
            </div>
            <p className="text-[10px] text-foreground-muted/60">{cite(d.cacna1cRef)}</p>
          </CollapsibleSection>

          {/* Neonatal Q-Factor */}
          <CollapsibleSection id="neonatal-q-factor" title={d.neonatalQTitle} subtitle={d.neonatalQSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.neonatalQDesc}
            </p>
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 mb-4 font-mono text-sm">
              <p className="text-xs font-medium mb-2">{d.neonatalQFormulaLabel}</p>
              <p className="font-mono text-sm font-semibold mb-2">{d.neonatalQFormula}</p>
              <p className="text-xs text-foreground-muted">{d.neonatalQFormulaDesc}</p>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              {d.neonatalQVerification}
            </p>
            <p className="text-[10px] text-foreground-muted/60 mb-4">{cite(d.neonatalQRef)}</p>
            <div className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm text-foreground-muted leading-relaxed mb-2">{d.neonatalQSpectrum}</p>
              <Link href={`${prefix}/evidence/neurological-spectrum`} className="text-sm text-accent hover:underline">
                {d.neonatalQSpectrumLink}
              </Link>
            </div>
          </CollapsibleSection>

          {/* Feedback Loops */}
          <CollapsibleSection id="feedback-loops" title={d.feedbackLoopsTitle} subtitle={d.feedbackLoopsSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.feedbackLoopsDesc}
            </p>
            <div className="my-8 max-w-2xl mx-auto" style={{display:'none'}}>
              <svg viewBox="0 0 600 400" className="w-full" role="img" aria-label={locale_key === "fi" ? "Palautesilmukat (hidden duplicate)" : "Feedback loops network (hidden duplicate)"}>
                <defs>
                  <marker id="fb_arPos" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-rose-500/70" /></marker>
                  <marker id="fb_arNeg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" className="fill-cyan-500/70" /></marker>
                </defs>

                {/* Positive feedback paths (rose) */}
                <path d="M330,62 Q390,45 450,113" fill="none" className="stroke-rose-500/50" strokeWidth="1.5" markerEnd="url(#fb_arPos)" />
                <path d="M480,157 Q520,195 480,233" fill="none" className="stroke-rose-500/50" strokeWidth="1.5" markerEnd="url(#fb_arPos)" />
                <path d="M459,240 Q560,125 321,75" fill="none" className="stroke-rose-500/40" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#fb_arPos)" />
                <path d="M152,265 Q300,325 448,265" fill="none" className="stroke-rose-500/50" strokeWidth="1.5" markerEnd="url(#fb_arPos)" />

                {/* Negative feedback paths (cyan) */}
                <path d="M150,113 Q210,40 270,62" fill="none" className="stroke-cyan-500/50" strokeWidth="1.5" markerEnd="url(#fb_arNeg)" />
                <path d="M270,328 Q210,345 150,277" fill="none" className="stroke-cyan-500/50" strokeWidth="1.5" markerEnd="url(#fb_arNeg)" />

                {/* Nodes */}
                <circle cx="300" cy="50" r="32" className="fill-green-500/10 stroke-green-500/50" strokeWidth="1.5" />
                <text x="300" y="54" textAnchor="middle" className="fill-foreground text-[10px] font-medium">Ca²⁺</text>

                <circle cx="480" cy="125" r="32" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                <text x="480" y="129" textAnchor="middle" className="fill-foreground text-[10px] font-medium">CaMKII</text>

                <circle cx="480" cy="265" r="32" className="fill-red-500/10 stroke-red-500/50" strokeWidth="1.5" />
                <text x="480" y="269" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Tulehdus" : "Inflammation"}</text>

                <circle cx="300" cy="340" r="32" className="fill-blue-500/10 stroke-blue-500/50" strokeWidth="1.5" />
                <text x="300" y="344" textAnchor="middle" className="fill-foreground text-[10px] font-medium">GABA</text>

                <circle cx="120" cy="265" r="32" className="fill-orange-500/10 stroke-orange-500/50" strokeWidth="1.5" />
                <text x="120" y="269" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Kortisoli" : "Cortisol"}</text>

                <circle cx="120" cy="125" r="32" className="fill-purple-500/10 stroke-purple-500/50" strokeWidth="1.5" />
                <text x="120" y="129" textAnchor="middle" className="fill-foreground text-[9px] font-medium">{locale_key === "fi" ? "Melatoniini" : "Melatonin"}</text>

                {/* Legend */}
                <line x1="30" y1="390" x2="60" y2="390" className="stroke-rose-500/60" strokeWidth="2" markerEnd="url(#fb_arPos)" />
                <text x="68" y="394" className="fill-foreground-muted text-[8px]">{locale_key === "fi" ? "Positiivinen palaute" : "Positive feedback"}</text>
                <line x1="280" y1="390" x2="310" y2="390" className="stroke-cyan-500/60" strokeWidth="2" markerEnd="url(#fb_arNeg)" />
                <text x="318" y="394" className="fill-foreground-muted text-[8px]">{locale_key === "fi" ? "Negatiivinen palaute" : "Negative feedback"}</text>
              </svg>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 mb-4">
              {d.feedbackLoops.map((loop: { id: string; name: string; steps: string; status: string; color: string }) => (
                <div key={loop.id} className={`rounded-xl border p-4 ${loop.color === "green" ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono-num text-xs text-accent">{loop.id}</span>
                    <h4 className="font-semibold text-sm">{loop.name}</h4>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-2">{loop.steps}</p>
                  <p className="text-[10px] text-foreground-muted italic">{cite(loop.status)}</p>
                </div>
              ))}
            </div>

            {/* Feedback Loops Network Diagram */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Feedback loops network">
                {/* Central node: Ca²⁺ */}
                <circle cx="350" cy="160" r="36" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.8" />
                <text x="350" y="157" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ef4444" fontFamily="system-ui">Ca²⁺↑</text>
                <text x="350" y="172" textAnchor="middle" fontSize="8" fill="#ef4444" fillOpacity="0.7" fontFamily="system-ui">
                  {locale_key === "fi" ? "soluttaja" : "hub"}
                </text>
                {/* Loop nodes around the hub */}
                {[
                  { angle: -90, label: "CaMKII", sub: "→Cav3.2↓ threshold", color: "#3b82f6" },
                  { angle: -45, label: "ROS", sub: "→mitochondria↓→ROS↑", color: "#f97316" },
                  { angle: 0, label: "NF-κB", sub: "→inflammation→Ca²⁺↑", color: "#ec4899" },
                  { angle: 45, label: "mTOR", sub: "→autophagy↓→damage↑", color: "#f59e0b" },
                  { angle: 90, label: "DNA", sub: "→repair↓→mutations↑", color: "#8b5cf6" },
                  { angle: 135, label: "ER stress", sub: "→UPR→Ca²⁺ release", color: "#14b8a6" },
                  { angle: 180, label: "GSH↓", sub: "→antioxidant↓→ROS↑", color: "#6366f1" },
                  { angle: -135, label: "TRPV1", sub: "→permeability↑→Ca²⁺↑", color: "#84cc16" },
                ].map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const cx = 350 + Math.cos(rad) * 135;
                  const cy = 160 + Math.sin(rad) * 115;
                  const lx = 350 + Math.cos(rad) * 52;
                  const ly = 160 + Math.sin(rad) * 44;
                  return (
                    <g key={node.label}>
                      <line x1={lx} y1={ly} x2={cx} y2={cy} stroke={node.color} strokeWidth="1" strokeOpacity="0.35" />
                      <circle cx={cx} cy={cy} r="4" fill={node.color} fillOpacity="0.6" />
                      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="9" fontWeight="600" fill={node.color} fontFamily="system-ui">{node.label}</text>
                      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="6.5" fill="currentColor" fillOpacity="0.45" fontFamily="system-ui">{node.sub}</text>
                      {/* Curved feedback arrow back to hub */}
                      <path
                        d={`M ${cx + Math.cos(rad + 0.3) * 20} ${cy + Math.sin(rad + 0.3) * 20} Q ${350 + Math.cos(rad) * 85} ${160 + Math.sin(rad) * 72} ${350 + Math.cos(rad) * 42} ${160 + Math.sin(rad) * 36}`}
                        fill="none" stroke={node.color} strokeWidth="0.7" strokeOpacity="0.25" strokeDasharray="2 2"
                      />
                    </g>
                  );
                })}
                {/* Caption */}
                <text x="350" y="320" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="system-ui">
                  {locale_key === "fi" ? "17 positiivista takaisinkytkentäsilmukkaa — mikä tahansa sisääntulopiste aktivoi koko verkoston" : "17 positive feedback loops — any entry point activates the entire network"}
                </text>
              </svg>
            </div>

            <Link href={`${prefix}/evidence/unbroken-chain`} className="text-sm text-accent hover:underline">
              {d.feedbackLoopsLink}
            </Link>
          </CollapsibleSection>

          {/* Hypothalamic Nexus */}
          <CollapsibleSection id="hypothalamic-nexus" title={d.hypoNexusTitle} subtitle={d.hypoNexusSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {cite(d.hypoNexusDesc)}
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-2 font-semibold">{d.colAxis}</th>
                    <th className="text-left p-2 font-semibold">{d.colTargetOrgan}</th>
                    <th className="text-left p-2 font-semibold">{d.colConsequence}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.hypoNexusAxes.map((a: { axis: string; organ: string; consequence: string }) => (
                    <tr key={a.axis} className="border-b border-card-border/50">
                      <td className="p-2 font-mono text-accent text-xs">{a.axis}</td>
                      <td className="p-2 text-foreground-muted">{a.organ}</td>
                      <td className="p-2 text-foreground-muted">{a.consequence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm leading-relaxed text-foreground-muted">{d.hypoNexusKey}</p>
            </div>
          </CollapsibleSection>

          {/* Triple Lock Theory */}
          <CollapsibleSection id="triple-lock" title={d.tripleLockTitle} subtitle={d.tripleLockSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.tripleLockDesc}
            </p>
            <div className="grid gap-3 sm:grid-cols-3 mb-4">
              {d.tripleLockComponents.map((c: { component: string; mechanism: string; consequence: string }) => (
                <div key={c.component} className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <h4 className="font-semibold text-sm mb-2">{c.component}</h4>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-1 font-mono">{cite(c.mechanism)}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{c.consequence}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm leading-relaxed text-foreground-muted">{d.tripleLockSynergy}</p>
            </div>
          </CollapsibleSection>

          {/* Quad Lock */}
          <CollapsibleSection id="quad-lock" title={d.quadLockTitle} subtitle={d.quadLockSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {cite(d.quadLockDesc)}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 mb-4">
              {d.quadLockComponents.map((c: { component: string; effect: string }) => (
                <div key={c.component} className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <h4 className="font-semibold text-sm mb-1 font-mono">{c.component}</h4>
                  <p className="text-xs text-foreground-muted leading-relaxed">{c.effect}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
              <p className="text-sm leading-relaxed text-foreground-muted">{cite(d.quadLockNote)}</p>
            </div>
          </CollapsibleSection>

          {/* Dual barrier principle */}
          <CollapsibleSection id="dual-barrier" title={d.dualBarrierTitle} subtitle={d.dualBarrierSubtitle}>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.dualBarrierBody}</p>
          </CollapsibleSection>

          {/* Hormesis */}
          <CollapsibleSection id="hormesis" title={d.bdnfHormesisTitle} subtitle={d.bdnfHormesisSubtitle}>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.bdnfHormesisBody}</p>
          </CollapsibleSection>

          {/* Aging Spiral */}
          <CollapsibleSection id="aging-spiral" title={d.agingSpiralTitle} subtitle={d.agingSpiralSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.agingSpiralDesc}
            </p>
            <div className="space-y-2 mb-4">
              {d.agingSpiralSteps.map((s: { step: string; detail: string }, i: number) => (
                <div key={i} className="rounded-lg border border-card-border bg-card-bg p-3">
                  <p className="text-sm font-semibold mb-0.5">{s.step}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{cite(s.detail)}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm leading-relaxed text-foreground-muted">{cite(d.agingSpiralQuantitative)}</p>
            </div>
          </CollapsibleSection>

          {/* Genetic Susceptibility Map */}
          <CollapsibleSection id="genetic-susceptibility" title={d.genSuscTitle} subtitle={d.genSuscSub}>
            <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
              {d.genSuscDesc}
            </p>

            {/* 15-Gene Cascade Diagram */}
            <div className="my-8 max-w-3xl mx-auto">
              <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label={d.svgGenesCascadeAria}>
                {/* Background */}
                <rect width="700" height="520" fill="none" />

                {/* Tier 1: INFLUX - cyan/teal */}
                <text x="12" y="52" fontSize="11" fontWeight="bold" fill="#0d9488" fontFamily="system-ui">{d.tierInflux}</text>
                <text x="12" y="64" fontSize="9" fill="#5eead4" fontFamily="system-ui">Tier 1</text>
                {[["CACNA1C", 130], ["CACNA1H", 245], ["CACNA1D", 360], ["CACNA1A", 475], ["CACNA1B", 590]].map(([gene, x]) => (
                  <g key={gene as string}>
                    <rect x={Number(x)} y="35" width="95" height="36" rx="6" ry="6" fill="#0d9488" fillOpacity="0.15" stroke="#0d9488" strokeWidth="1.5" className="dark:fill-teal-900/40" />
                    <text x={Number(x) + 47.5} y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0d9488" fontFamily="monospace">{gene as string}</text>
                  </g>
                ))}

                {/* Arrow Tier 1 -> 2 */}
                <line x1="350" y1="75" x2="350" y2="115" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#cascadeArrow)" />

                {/* Tier 2: MODULATION - blue */}
                <text x="12" y="145" fontSize="11" fontWeight="bold" fill="#3b82f6" fontFamily="system-ui">{d.tierModulation}</text>
                <text x="12" y="157" fontSize="9" fill="#93c5fd" fontFamily="system-ui">Tier 2</text>
                <rect x="300" y="128" width="100" height="36" rx="6" ry="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="350" y="151" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3b82f6" fontFamily="monospace">CACNA2D1</text>

                {/* Arrow Tier 2 -> 3 */}
                <line x1="350" y1="168" x2="350" y2="208" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#cascadeArrow)" />

                {/* Tier 3: INTEGRATION - red/rose */}
                <text x="12" y="238" fontSize="11" fontWeight="bold" fill="#e11d48" fontFamily="system-ui">{d.tierIntegration}</text>
                <text x="12" y="250" fontSize="9" fill="#fda4af" fontFamily="system-ui">Tier 3</text>
                {[["CAMK2A", 260], ["CAMK2B", 390]].map(([gene, x]) => (
                  <g key={gene as string}>
                    <rect x={Number(x)} y="221" width="95" height="36" rx="6" ry="6" fill="#e11d48" fillOpacity="0.15" stroke="#e11d48" strokeWidth="1.5" />
                    <text x={Number(x) + 47.5} y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="#e11d48" fontFamily="monospace">{gene as string}</text>
                  </g>
                ))}

                {/* Arrow Tier 3 -> 4 */}
                <line x1="350" y1="261" x2="350" y2="301" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#cascadeArrow)" />

                {/* Tier 4: EXTRUSION - amber */}
                <text x="12" y="331" fontSize="11" fontWeight="bold" fill="#d97706" fontFamily="system-ui">{d.tierExtrusion}</text>
                <text x="12" y="343" fontSize="9" fill="#fcd34d" fontFamily="system-ui">Tier 4</text>
                {[["SLC8A1", 200], ["ATP2B1", 340], ["ATP2B2", 480]].map(([gene, x]) => (
                  <g key={gene as string}>
                    <rect x={Number(x)} y="314" width="95" height="36" rx="6" ry="6" fill="#d97706" fillOpacity="0.15" stroke="#d97706" strokeWidth="1.5" />
                    <text x={Number(x) + 47.5} y="337" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706" fontFamily="monospace">{gene as string}</text>
                  </g>
                ))}

                {/* Arrow Tier 4 -> 5 */}
                <line x1="350" y1="354" x2="350" y2="394" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#cascadeArrow)" />

                {/* Tier 5: SIGNALING - purple */}
                <text x="12" y="424" fontSize="11" fontWeight="bold" fill="#9333ea" fontFamily="system-ui">{d.tierSignaling}</text>
                <text x="12" y="436" fontSize="9" fill="#c4b5fd" fontFamily="system-ui">Tier 5</text>
                {[["CRY1", 155], ["CRY2", 280], ["MTNR1B", 405], ["COMT", 540]].map(([gene, x]) => (
                  <g key={gene as string}>
                    <rect x={Number(x)} y="407" width="95" height="36" rx="6" ry="6" fill="#9333ea" fillOpacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
                    <text x={Number(x) + 47.5} y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9333ea" fontFamily="monospace">{gene as string}</text>
                  </g>
                ))}

                {/* Caption */}
                <text x="350" y="475" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5" fontFamily="system-ui">
                  {d.svgGenesCascadeCaption}
                </text>

                {/* Arrow marker */}
                <defs>
                  <marker id="cascadeArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.4" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Tier 1: Influx */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscInfluxTitle}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-2 font-semibold">{d.colGene}</th>
                    <th className="text-left p-2 font-semibold">{d.colProtein}</th>
                    <th className="text-left p-2 font-semibold">{d.colBermRole}</th>
                    <th className="text-left p-2 font-semibold">{d.colKeyVariant}</th>
                    <th className="text-left p-2 font-semibold">{d.colDiseases}</th>
                    <th className="text-left p-2 font-semibold">{d.colEvidence}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.genSuscInfluxGenes.map((g: { gene: string; protein: string; role: string; variant: string; diseases: string; evidence: string }) => (
                    <tr key={g.gene} className="border-b border-card-border/50">
                      <td className="p-2 font-mono font-semibold text-accent">{g.gene}</td>
                      <td className="p-2 text-foreground-muted">{g.protein}</td>
                      <td className="p-2 text-foreground-muted">{g.role}</td>
                      <td className="p-2 text-foreground-muted">{g.variant}</td>
                      <td className="p-2 text-foreground-muted">{g.diseases}</td>
                      <td className="p-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${g.evidence.startsWith("CONFIRMED") || g.evidence.startsWith("VAHVISTETTU") ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {cite(g.evidence)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tier 2: Modulation */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscModTitle}</h4>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 mb-2">
              <p className="text-xs text-foreground-muted leading-relaxed">{d.genSuscModDesc}</p>
            </div>
            <p className="text-[10px] text-foreground-muted/60 mb-6">{cite(d.genSuscModRef)}</p>

            {/* Tier 3: Integration */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscIntTitle}</h4>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 mb-2">
              <p className="text-xs text-foreground-muted leading-relaxed">{d.genSuscIntDesc}</p>
            </div>
            <p className="text-[10px] text-foreground-muted/60 mb-6">{cite(d.genSuscIntRef)}</p>

            {/* Tier 4: Extrusion */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscExtTitle}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed mb-6">{d.genSuscExtDesc}</p>

            {/* Tier 5: Signaling */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscSigTitle}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-2 font-semibold">{d.colGene}</th>
                    <th className="text-left p-2 font-semibold">{d.colVariant}</th>
                    <th className="text-left p-2 font-semibold">{d.colEffect}</th>
                    <th className="text-left p-2 font-semibold">{d.colDiseases}</th>
                    <th className="text-left p-2 font-semibold">{d.colEvidence}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.genSuscSigGenes.map((g: { gene: string; variant: string; effect: string; diseases: string; evidence: string }) => (
                    <tr key={g.gene} className="border-b border-card-border/50">
                      <td className="p-2 font-mono font-semibold text-accent">{g.gene}</td>
                      <td className="p-2 text-foreground-muted">{g.variant}</td>
                      <td className="p-2 text-foreground-muted">{g.effect}</td>
                      <td className="p-2 text-foreground-muted">{g.diseases}</td>
                      <td className="p-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${g.evidence.startsWith("CONFIRMED") || g.evidence.startsWith("VAHVISTETTU") ? "bg-green-500/20 text-green-400" : g.evidence.startsWith("DERIVABLE") || g.evidence.startsWith("JOHDETTAVISSA") ? "bg-slate-500/20 text-slate-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {cite(g.evidence)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EHS Redefinition */}
            <h4 className="text-sm font-semibold mb-3">{d.genSuscEhsTitle}</h4>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-2">
              <p className="text-xs text-foreground-muted leading-relaxed mb-2">{d.genSuscEhsDesc}</p>
              <p className="text-xs text-foreground-muted leading-relaxed font-medium">{d.genSuscEhsBiomarker}</p>
            </div>

            {/* EHS Diagnostic Flowchart */}
            <div className="my-8 max-w-sm mx-auto">
              <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Level 1: CaMKII Thr286 assay */}
                <rect x="80" y="10" width="240" height="56" rx="12" className="fill-green-500/10 dark:fill-green-500/15" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" />
                <text x="200" y="34" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-green-700 dark:fill-green-400">
                  CaMKII Thr286 {d.ehsAssay}
                </text>
                <text x="200" y="52" textAnchor="middle" fontSize="9" className="fill-green-600/70 dark:fill-green-400/70">
                  {d.ehsLymphocyte}
                </text>
                {/* Arrow 1 */}
                <line x1="200" y1="66" x2="200" y2="120" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#flowArrow10)" />
                <text x="214" y="98" fontSize="9" fill="currentColor" fillOpacity="0.5" fontStyle="italic">
                  {d.ehsElevated}
                </text>
                {/* Level 2: CACNA genotyping */}
                <rect x="80" y="120" width="240" height="56" rx="12" className="fill-blue-500/10 dark:fill-blue-500/15" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" />
                <text x="200" y="144" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-blue-700 dark:fill-blue-400">
                  CACNA {d.ehsGenotyping}
                </text>
                <text x="200" y="162" textAnchor="middle" fontSize="9" className="fill-blue-600/70 dark:fill-blue-400/70">
                  {d.ehsCalciumVariants}
                </text>
                {/* Arrow 2 */}
                <line x1="200" y1="176" x2="200" y2="230" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#flowArrow10)" />
                <text x="214" y="208" fontSize="9" fill="currentColor" fillOpacity="0.5" fontStyle="italic">
                  {d.ehsRiskAlleles}
                </text>
                {/* Level 3: Signaling markers */}
                <rect x="60" y="230" width="280" height="56" rx="12" className="fill-purple-500/10 dark:fill-purple-500/15" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />
                <text x="200" y="254" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-purple-700 dark:fill-purple-400">
                  {d.ehsSignalingMarkers}
                </text>
                <text x="200" y="272" textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-purple-600/80 dark:fill-purple-400/80">
                  CRY1, MTNR1B, COMT
                </text>
                {/* Arrow 3 */}
                <line x1="200" y1="286" x2="200" y2="340" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#flowArrow10)" />
                <text x="214" y="318" fontSize="9" fill="currentColor" fillOpacity="0.5" fontStyle="italic">
                  {d.ehsHighRisk}
                </text>
                {/* Level 4: Polygenic risk score */}
                <rect x="60" y="340" width="280" height="56" rx="12" className="fill-rose-500/10 dark:fill-rose-500/15" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.5" />
                <text x="200" y="364" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-rose-700 dark:fill-rose-400">
                  {d.ehsPolygenicScore}
                </text>
                <text x="200" y="382" textAnchor="middle" fontSize="9" className="fill-rose-600/70 dark:fill-rose-400/70">
                  {d.ehsOverallAssessment}
                </text>
                {/* Arrow 4 */}
                <line x1="200" y1="396" x2="200" y2="430" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#flowArrow10)" />
                {/* Final assessment box */}
                <rect x="100" y="430" width="200" height="44" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                <text x="200" y="450" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor" fillOpacity="0.8">
                  {d.ehsDiagnosticClass}
                </text>
                <text x="200" y="465" textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.5">
                  {d.ehsLowModHigh}
                </text>
                <defs>
                  <marker id="flowArrow10" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" fillOpacity="0.3" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Epistatic Interactions */}
            <h4 className="text-sm font-semibold mt-6 mb-3">{d.genSuscEpistaticTitle}</h4>
            <div className="grid gap-3 sm:grid-cols-2 mb-6">
              {d.genSuscEpistatic.map((e: { pair: string; effect: string; status: string }) => (
                <div key={e.pair} className="rounded-lg border border-card-border bg-card-bg p-3">
                  <p className="text-xs font-mono font-semibold text-accent mb-1">{e.pair}</p>
                  <p className="text-[11px] text-foreground-muted leading-relaxed mb-1">{e.effect}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">{e.status}</span>
                </div>
              ))}
            </div>

            {/* Three Principles */}
            <div className="space-y-3 mb-6">
              {d.genSuscPrinciples.map((p: { id: string; title: string; desc: string }) => (
                <div key={p.id} className="rounded-lg border border-card-border bg-card-bg p-3">
                  <p className="text-xs font-mono text-amber-500 mb-1">{p.id}: {p.title}</p>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-foreground-muted/60">{cite(d.genSuscRef)}</p>
          </CollapsibleSection>

          {/* Recovery Window */}
          <CollapsibleSection id="recovery-window" title={d.recovWindowTitle} subtitle={d.recovWindowSub}>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {d.recovWindowDesc}
            </p>
            <p className="text-sm text-foreground-muted mb-4 max-w-3xl leading-relaxed">
              {cite(d.recovWindowEvidence)}
            </p>
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 mb-6">
              <p className="text-xs text-foreground-muted leading-relaxed">{d.recovWindowIntervention}</p>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs font-mono text-amber-500">{d.recovWindowPred1}</p>
              <p className="text-xs font-mono text-amber-500">{d.recovWindowPred2}</p>
            </div>
            <p className="text-[10px] text-foreground-muted/60">{cite(d.recovWindowRef)}</p>
          </CollapsibleSection>

          {/* Why Studies Disagree */}
        <CollapsibleSection
          id="why-studies-disagree"
          title={d.whyDisagreeTitle}
          subtitle={d.whyDisagreeSub
          }
        >
          <div className="max-w-4xl space-y-4">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.whyDisagreeDesc}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  num: "1",
                  title: d.modSeason,
                  desc: d.modSeasonDesc,
                },
                {
                  num: "2",
                  title: d.modGenotype,
                  desc: d.modGenotypeDesc,
                },
                {
                  num: "3",
                  title: d.modLabElf,
                  desc: d.modLabElfDesc,
                },
                {
                  num: "4",
                  title: d.modNighttimeEmf,
                  desc: d.modNighttimeEmfDesc,
                },
                {
                  num: "5",
                  title: d.modSpeciesPriming,
                  desc: d.modSpeciesPrimingDesc,
                },
                {
                  num: "6",
                  title: d.modDuration,
                  desc: d.modDurationDesc,
                },
                {
                  num: "7",
                  title: d.modPulsation,
                  desc: d.modPulsationDesc,
                },
                {
                  num: "8",
                  title: d.modVitaminD,
                  desc: d.modVitaminDDesc,
                },
              ].map((mod) => (
                <div key={mod.num} className="rounded-lg border border-card-border bg-card-bg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center">{mod.num}</span>
                    <h4 className="font-semibold text-sm">{mod.title}</h4>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">{cite(mod.desc)}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="text-sm font-semibold text-foreground mb-3">
                {d.modThreePredictors}
              </p>
              <div className="grid gap-2 sm:grid-cols-3 mb-3">
                <div className="rounded-lg bg-background-secondary p-3 text-center">
                  <p className="text-xs text-foreground-muted">{d.modSpeciesPriming}</p>
                  <p className="text-sm font-mono font-semibold text-foreground mt-1">&chi;&sup2; = 9.4, <span className="text-accent">p = 0.002</span></p>
                </div>
                <div className="rounded-lg bg-background-secondary p-3 text-center">
                  <p className="text-xs text-foreground-muted">{d.modDuration}</p>
                  <p className="text-sm font-mono font-semibold text-foreground mt-1">&chi;&sup2; = 10.8, <span className="text-accent">p = 0.001</span></p>
                </div>
                <div className="rounded-lg bg-background-secondary p-3 text-center">
                  <p className="text-xs text-foreground-muted">{d.modPulsation}</p>
                  <p className="text-sm font-mono font-semibold text-foreground mt-1">&chi;&sup2; = 3.9, <span className="text-accent">p = 0.048</span></p>
                </div>
              </div>
              <p className="text-xs text-foreground-muted/70">
                {cite(d.modAnalysisBasis)}
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-sm text-foreground-muted leading-relaxed">
                <span className="font-semibold">{d.predRepl1Label}</span>
                {d.predRepl1Desc}
              </p>
            </div>
            <p className="text-xs text-foreground-muted/70">
              {cite(d.modEpistemicNote)}
            </p>
          </div>
        </CollapsibleSection>

          {/* 58% Below ICNIRP Limits */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 space-y-3">
            <h3 className="text-base font-bold text-foreground">
              {d.dnaBelow58Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {cite(d.dnaBelow58Desc)}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.dnaBelow58Mechanism}
            </p>
          </div>

          {/* 9-Hour Recovery Window */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-3">
            <h3 className="text-base font-bold text-foreground">
              {d.dnaRepairTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {cite(d.dnaRepairDesc)}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.dnaModernEnv}
            </p>
          </div>

          {/* Mathematical Foundation */}
          <CollapsibleSection id="mathematics" title={d.mathTitle} subtitle={d.mathSub}>
            <p className="text-sm text-foreground-muted mb-10 max-w-3xl leading-relaxed">
              {d.mathSubtitle}
            </p>
            <MathematicsSections locale={locale} />
          </CollapsibleSection>

          {/* Links */}
          <section className="border-t border-border pt-8 mt-8 flex flex-wrap gap-4">
            <Link
              href={`${prefix}/evidence`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnEvidence}
            </Link>
            <Link
              href={`${prefix}/predictions`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-sm font-medium rounded-lg transition-colors"
            >
              {d.btnPredictions}
            </Link>
          </section>

          {/* Epistemic note */}
          <section className="mt-8 space-y-2">
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.epistemic}
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
              {d.lbermRef}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
