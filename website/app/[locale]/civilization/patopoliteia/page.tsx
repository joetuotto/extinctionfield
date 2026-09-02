import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Activity } from "lucide-react";
import { pickCopy, locales } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { BiocapCivilizationChart, BiocapTimelineChart } from "@/components/BiocapCivilizationChart";
import { MigrationGradientMap } from "@/components/MigrationGradientMap";
import { BiomarkerRadar } from "@/components/BiomarkerRadar";
import { BiocapTrajectory, BiomarkerTrajectoryLines } from "@/components/BiocapTrajectory";

const COPY = {
  en: {
    title: "Patopoliteia",
    subtitle: "The macro-historical dimension: how electromagnetic environments shape civilizational patterns",
    heroLead:
      "Civilizations are not abstract cultural entities. They are populations of biological organisms. Their vitality — their capacity for expansion, creativity, trust, reproduction, and institutional maintenance — has a measurable substrate: the hormonal and neurochemical profiles of their constituent humans.",
    heroTrail:
      "This page traces the civilizational dimension of the BERM model: from the biological law that governs rise and fall, through the quantitative framework of BioCap, to the predictions and projections that follow.",

    sHistLawTitle: "The Biological Law of Civilizations",
    sHistLawLead: "Throughout recorded history, civilizations have followed a remarkably consistent pattern: rise, flourish, decline. Eleven independent thinkers — from Ibn Khaldun (1377) and Vico (1725) to [[ref:turchin2023_end_times|Turchin (2023)]] and Parvini (2023) — converged on the same observation without knowing each other's work; nine are tabulated below, and Haidt, Swan and Twenge are treated on the Historical Convergence page. BERM proposes the missing mechanism: the electromagnetic environment modulates biological capacity, which in turn drives civilizational dynamics.",

    sProphetsTitle: "The Prophets Were Right — And Wrong",
    sProphetsLead: "Eleven serious thinkers across three centuries independently documented the same civilizational pattern. They disagreed about method, ideology, and scope. Yet they converged on one observation: civilizations do not progress linearly. They rise and fall in cycles, and the late stages are marked by declining birth rates, increasing hedonism, loss of collective will, and pessimism.",
    sProphetsTable: [
      { thinker: "Giambattista Vico", year: "1725", observation: "Recurring cycle of three ages (gods, heroes, men)", bermExplanation: "BioCap oscillation produces qualitatively different social phases" },
      { thinker: "Oswald Spengler", year: "1918", observation: "Civilizations as organisms with lifespans", bermExplanation: "Biological substrate has a lifecycle driven by cumulative EMF exposure" },
      { thinker: "Arnold Toynbee", year: "1934", observation: "Challenge-and-response across 21 civilizations", bermExplanation: "Biological capacity determines response quality; depleted populations fail challenges" },
      { thinker: "Pitirim Sorokin", year: "1937", observation: "Sensate-Ideational cultural oscillation", bermExplanation: "Dopamine/serotonin balance shifts → sensate phase = low-DA, high-stimulation seeking" },
      { thinker: "John Bagot Glubb", year: "1978", observation: "250-year empire lifespan, 6 stages", bermExplanation: "Glubb's ~250 years; the model's 20-empire dataset gives median 377 years (mean 431), 65% within ±1 sd of the 208-year Suess period" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Diminishing returns on complexity", bermExplanation: "Cognitive capacity decline (BDNF↓, cortisol↑) reduces ability to manage complexity" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "Asabiya (group solidarity) declines over 3-4 generations", bermExplanation: "Oxytocin↓ + testosterone↓ = reduced in-group cohesion — precisely asabiya loss" },
      { thinker: "Peter Turchin", year: "2003", observation: "Secular cycles (~80-100 yr) within longer waves", bermExplanation: "Gleissberg cycle (88 yr) modulates BioCap within Suess cycle envelope" },
      { thinker: "Neema Parvini", year: "2023", observation: "Synthesized all 11 thinkers; pattern is robust across frameworks", bermExplanation: "Convergence of independent observers = strong evidence for real phenomenon requiring explanation" },
    ],

    sSolarTitle: "Before and After Electrification",
    sSolarLead: "Before electrification, the only significant electromagnetic influence on biology came from the sun. Solar activity oscillates in nested cycles: the 11-year Schwabe cycle, the 88-year Gleissberg cycle, and the ~208-year Suess/de Vries cycle. During grand solar minima, the electromagnetic burden on biology decreases and biological recovery occurs.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: [
      "S(τ) = solar cycle superposition [0,1]",
      "U(τ) = urbanization EMF component (slow, pre-electric)",
      "E(τ) = electrification EMF component (rapid, post-1880)",
      "σ(τ) = recovery suppression = 0.95 · logistic(0.045 · (τ − 1960)); 0 before 1880",
      "χ(λ) = biological susceptibility, rising with latitude (0.25 at the equator → 1.0 at 65°), plus the region's electrification boost (chi_total)",
      "α = biological recovery coefficient (0.3)",
    ],
    sSolarFormulaNote: "BioCap₀ is the initial biological capacity, set to 1.0 for an unexposed population. The formula has two integrals: the first (damage) accumulates exposure across solar, urban, and electrification components weighted by latitude susceptibility χ(λ). The second (recovery) represents biological repair during low-exposure windows, governed by the recovery coefficient α = 0.3. The recovery suppression coefficient σ(τ) captures the key post-electrification change: when artificial EMF (E) dominates, recovery windows that previously coincided with solar minima are blocked. At σ = 0.95 (modern urban), 95% of potential recovery is suppressed. The code divides the accumulated net change by the integration span (t − t₀) to express BioCap as a per-year average and clamps the result to [0, BioCap₀]; with region = name, χ follows chi_total(λ, τ, region) year by year.",
    sSolarPrePost: "Pre-electric (E=0): BioCap oscillates → cyclical civilizational dynamics. Post-electric (E≫S): BioCap declines monotonically → no recovery window.",
    sSolarRenaissance: "Eight of the ten renaissances in the model dataset (six European, four Asian) fall inside a grand solar minimum or within 80 years after its end: the Italian Renaissance in the Spörer Minimum, the Scientific Revolution in the Maunder Minimum, German Romanticism in the Dalton Minimum.",

    sMigrationTitle: "The Migration Gradient",
    sMigrationLead: "The same biological gradient that drove the Germanic tribes into Rome, the Arabs into Byzantium, and the Mongols into Song China operates today. Sub-Saharan Africa — with the shortest cumulative electromagnetic exposure of any major population — has the highest biological capacity. The migration flows from Africa and the Middle East into Europe follow the gradient of biological contrast. Model BioCap 2025 (regional integral, biocap.py with chi_total): Sub-Saharan Africa 0.89, Latin America 0.86, South Asia 0.85, Middle East 0.81, East Asia 0.76, South Korea 0.73, Japan 0.72, USA 0.71, Western Europe 0.65.",
    sMigrationNote: "This is a biological gradient (environment, not genetics). Immigrant fertility converges to — and in Finnish register data falls below — host-country levels within 1–2 generations, proving the mechanism is environmental, not genetic.",

    sLastBarbarianTitle: "The 'Last Barbarian' Window",
    sLastBarbarianText: "In the regional BioCap integral Sub-Saharan Africa's electrification boost saturates at χ +0.10 (chi_map.ELECTRIFICATION_CHI_PEAK), so its BioCap falls only from 0.89 (2025) to 0.86 (2080) while Western Europe falls from 0.65 to 0.54: the gradient widens from +0.25 to +0.32. The model therefore does not close the 'last barbarian' window by 2060–2080. It closes only if African electromagnetic burden rises to Western levels — the falsifiable condition: if African TFR and biomarker trends converge on Western values before 2060, the regional parameters are wrong.",

    sThreeLawsTitle: "Three Historical Laws",
    sThreeLaws: [
      { id: "L1", title: "Civilizational birth requires a low-χ zone (25-35°N)", desc: "Biological stability → long-term development. The four primary civilizations (Mesopotamia, Egypt, Indus, Yellow River) arose at 25–35°N, where χ ≈ 0.37–0.49; the model's nine expansion empires lie at 33–52°N." },
      { id: "L2", title: "Creative renaissances cluster during grand solar minima at high-χ latitudes (45-60°N)", desc: "Maximum recovery modulation → maximum creative capital (χ ≈ 0.63–0.90 at 45–60°N). 8 of the 10 renaissances in the model dataset." },
      { id: "L3", title: "Empire rises begin during low solar activity", desc: "Biological recovery → capacity for expansion. Model dataset: mean solar index 0.41 at empire rises vs 0.49 at peaks." },
    ],

    thThinker: "Thinker",
    thYear: "Year",
    thObservation: "Observation",
    thBerm: "BERM Explanation",
    biocapNormTitle: "BioCap Decay — Normalized Lifespan",
    biocapTimeTitle: "BioCap Trajectories — Historical Timeline",
    biocapXNorm: "Civilizational lifespan (%)",
    biocapXTime: "Year",
    biocapY: "BioCap",

    sCulturalTitle: "What Is Cultural Energy?",
    sCulturalLead: "For ninety years, historians have described civilizational energy without being able to define it materially. Unwin called it 'social energy.' Spengler called it 'the soul of a culture.' Glubb measured its phases empirically but could not identify its substance. Turchin modeled it mathematically but could not ground it biologically.",
    sCulturalBody: "BERM proposes the first materialist definition: cultural energy is the collective free biological energy of a population — what remains after homeostatic maintenance and environmental damage repair are subtracted from total metabolic capacity. It is measurable, decomposable into eight biomarkers, and its trajectory is predictable.",
    sCulturalFormula: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)",
    sCulturalFormulaDesc: "where N(t) = population size, BioCap(t) = mean biological capacity, η(t) = institutional efficiency",
    sCulturalBioTitle: "Eight Biomarkers of Civilizational Capacity",
    sCulturalBioWeightNote: "Weights reflect each biomarker's relative contribution to aggregate biological capacity, assigned by effect-size magnitude from the empirical literature: T and OXT receive the highest weights (0.20 each) because they are the primary substrates of both individual reproductive behavior and collective social cohesion — the two axes that determine civilizational output. DA and MEL receive 0.15 each as the primary substrates of motivation and cognitive restoration. BDNF receives 0.10 as the cognitive flexibility substrate. CORT receives −0.10 and enters the formula as (1 − CORT), because it suppresses the others via the dual hormone hypothesis and HPA-mediated immunosuppression. D and B2 receive 0.05 each as protective cofactors. The absolute weights sum to 1.0, so BioCap spans [0, 1] with 1.0 as the pre-industrial optimum (all positive markers at 1.0, cortisol at 0.0).",
    sCulturalBiomarkers: [
      { symbol: "T", name: "Testosterone", weight: 0.20, trend: "↓ 1.2%/yr", function: "Risk-taking, competition, assertiveness, spatial cognition", unwin: "Expansive energy" },
      { symbol: "OXT", name: "Oxytocin", weight: 0.20, trend: "↓ (proxy)", function: "Social trust, group cohesion, cooperation, pair bonding", unwin: "Cohesive energy (asabiya)" },
      { symbol: "DA", name: "Dopamine sensitivity", weight: 0.15, trend: "↓ (proxy)", function: "Motivation, goal pursuit, delayed gratification, creativity", unwin: "Productive energy" },
      { symbol: "MEL", name: "Melatonin", weight: 0.15, trend: "↓↓ (LED+EMF)", function: "Sleep quality, cognitive consolidation, circadian coherence", unwin: "Mental energy" },
      { symbol: "BDNF", name: "BDNF", weight: 0.10, trend: "↓ (Flynn⁻)", function: "Abstract reasoning, learning, cognitive flexibility", unwin: "Mental energy (cognitive)" },
      { symbol: "CORT", name: "Cortisol", weight: -0.10, trend: "↑ (HPA)", function: "Anxiety, short-term thinking, threat focus (INVERTED)", unwin: "Energy drain" },
      { symbol: "D", name: "Vitamin D", weight: 0.05, trend: "↓ (47.9% deficient)", function: "Immune competence, Ca²⁺ homeostasis moderation", unwin: "Protective factor" },
      { symbol: "B2", name: "Riboflavin (B2/FAD)", weight: 0.05, trend: "↓ (processed food)", function: "CRY protein stability, mitochondrial energy", unwin: "Protective factor" },
    ],
    sCulturalRadarTitle: "Biomarker Profile — Western Population 2025",
    sCulturalTimeTitle: "BioCap Trajectory: 1900–2060",
    sCulturalTimeX: "Year",
    sCulturalTimeY: "BioCap",
    sCulturalAmish: "Amish",
    sCulturalNow: "2025:",
    sCulturalForecast: "forecast",
    sCulturalLinesTitle: "Individual Biomarker Trajectories",
    sCulturalUnwinTitle: "Unwin's Evidence",
    sCulturalUnwinBody1: "In 1934, Oxford anthropologist J.D. Unwin published a study of 86 societies spanning 5,000 years. His finding was absolute: in every society without exception, the level of cultural achievement correlated directly with the degree of sexual restraint the society imposed. Societies with strict regulation displayed what Unwin called 'expansive energy.' Societies with permissive norms displayed what he called 'zoistic' energy — subsistence without expansion.",
    sCulturalUnwinBody2: "Unwin attributed this to Freudian sublimation: sexual energy not discharged sexually was redirected into cultural production. This explanation has not aged well. But his data has. No one has replicated the study, but no one has falsified it either. 86 societies, zero exceptions.",
    sCulturalUnwinBody3: "BERM proposes a different mechanism for the same observation. Sexual restraint does not produce cultural energy. Rather, both high sexual drive (requiring restraint) and high cultural energy are symptoms of the same biological state: high testosterone, high oxytocin, high dopamine sensitivity, normal melatonin, low cortisol. A population in this state has both strong libido (necessitating social regulation) and strong civilizational capacity. When biological capacity declines — through cumulative electromagnetic exposure, through urbanization — both sexual drive and cultural energy decline together. The correlation Unwin observed was real. The causation was a common upstream factor he could not have identified in 1934.",
    sCulturalPhasesTitle: "Unwin's Four Phases",
    sCulturalPhasesNote: "The thresholds 0.55 / 0.75 / 0.90 are fixed constants in unwin_validation.py that map BioCap onto Unwin's four categories. Applied to the modern Western trajectory (logistic secular trends in biomarker_trajectories.py) they give: Rationalistic → Deistic in 1983 (trigger marker T), Deistic → Manistic in 2007 (OXT), Manistic → Zoistic projected for 2040 (OXT). The Amish environment (BioCap 0.955) stays Rationalistic; the urban-office environment (0.480) is already Zoistic.",
    sCulturalPhases: [
      { name: "Zoistic", biocap: "< 0.55", desc: "Subsistence without expansion. No large-scale construction, no abstract thought tradition, no territorial ambition. Model projection for the West: from ~2040.", color: "red" },
      { name: "Manistic", biocap: "0.55–0.75", desc: "Declining energy. Populism, institutional decay, polarization, pronatalist policy failure. Western civilization 2007–present (BioCap 0.745 in 2007 → 0.614 in 2025).", color: "amber" },
      { name: "Deistic", biocap: "0.75–0.90", desc: "Transition phase. Cultural production continues but with declining novelty. Institutional trust eroding. Western civilization 1983–2007.", color: "blue" },
      { name: "Rationalistic", biocap: "> 0.90", desc: "Full expansive energy. Conquest, construction, intellectual achievement, scientific revolution. Western civilization until 1983 (BioCap 0.997 in 1900, 0.908 in 1980).", color: "green" },
    ],
    sCulturalSensTitle: "Sensitivity Analysis",
    sCulturalSensDesc: "If a single biomarker were restored to its pre-industrial optimum (1.0; cortisol to 0.0) while the others stay at their 2025 values. The percentage is the share of the gap between the 2025 BioCap (0.614) and the maximum (1.0) that the single restoration closes — restoring T closes 23.3% of the gap, lifting BioCap from 0.614 to 0.704 (sensitivity.py, sensitivity_all):",
    sCulturalSensItems: [
      { marker: "T → 1.0", recovery: "23.3%", desc: "Largest single intervention (BioCap 0.614 → 0.704)" },
      { marker: "OXT → 1.0", recovery: "19.9%", desc: "Social cohesion" },
      { marker: "MEL → 1.0", recovery: "16.4%", desc: "Circadian restoration" },
      { marker: "CORT → 0.0", recovery: "13.9%", desc: "HPA normalisation (cortisol to its floor)" },
      { marker: "DA → 1.0", recovery: "12.8%", desc: "Motivational drive" },
      { marker: "BDNF → 1.0", recovery: "6.7%", desc: "Cognitive capacity" },
      { marker: "D → 1.0", recovery: "4.5%", desc: "Protective cofactor" },
      { marker: "B2 → 1.0", recovery: "2.5%", desc: "CRY/FAD cofactor" },
    ],
    sCulturalSensConclusion: "The critical triad (T + MEL + OXT) accounts for 55% of BioCap weight and 59.6% of the attainable recovery. EMF reduction is the only intervention that would raise all biomarkers simultaneously, because all are downstream of the EMF-induced biomarker cascade.",
    sCulturalTransTitle: "Phase Transitions",
    sCulturalTransitions: [
      { year: "1983", from: "Rationalistic", to: "Deistic", trigger: "BioCap crosses 0.90; model trigger marker: testosterone", evidence: "Secular T decline from the early 1980s (Travison 2007, Santi 2025), sperm concentration −1.2%/yr (Levine 2017), first sustained sub-replacement TFR in the West" },
      { year: "2007", from: "Deistic", to: "Manistic", trigger: "BioCap crosses 0.75; model trigger marker: oxytocin", evidence: "Trust collapse (Edelman), loneliness epidemic, 'failure to launch', polarization onset, pronatalist failure" },
      { year: "~2040", from: "Manistic", to: "Zoistic", trigger: "BioCap projected to cross 0.55; model trigger marker: oxytocin", evidence: "PREDICTION — falsifiable: if Western BioCap recovers above 0.75 in the 2030s (T, OXT and MEL trends reversing) → wrong" },
    ],

    sActivationTitle: "The Activation Cycle: Why New Powers Rise as Old Ones Decline",
    sActivationLead: "Previous sections explained why civilizations decline. But decline alone does not explain history's recurring pattern of replacement. For every Rome that falls, there is a Germanic people that rises. For every Byzantium, an Arab expansion. For every Song Dynasty, a Mongol conquest.",
    sActivationBody1: "The conventional narrative treats the newcomer as simply 'more aggressive' or 'more vigorous' — a cultural characterization that explains nothing. BERM's hormesis framework provides a biological mechanism.",
    sActivationBody2: "The same solar activity that damages a high-EMF urban population stimulates a low-EMF nomadic population. This is not speculation — it is documented experimental physiology. Low-dose electromagnetic exposure produces measurable increases in testosterone, decreases in cortisol, and enhancement of immune function in laboratory animals. The mechanism is hormesis: a stress response that, at low doses, strengthens biological systems rather than damaging them.",
    sActivationBody3: "A nomadic population living in the hormetic zone of the dose-response curve experiences the rising phase of the solar cycle as biological activation: testosterone rises, cortisol falls, fertility increases, immune function improves. Over two to three generations, this produces a demographic pulse — a surplus of young men with high biological capacity and no land or mates. This surplus is the 'barbarian at the gates.'",
    sActivationBody4: "Simultaneously, the urban population in the damage zone experiences the same solar phase as additional biological erosion. The gradient between the two populations — one being activated, the other being depleted — grows from both sides simultaneously. When it exceeds a threshold, expansion follows. Not because of ideology or culture, but because of biology and demography.",
    sActivationChartTitle: "Hormetic Dose–Response",
    sActivationChartZone1: "Zone 1: Hormetic stimulation (nomad)",
    sActivationChartZone2: "Zone 2: Transition (agrarian)",
    sActivationChartZone3: "Zone 3: Damage (urban/electrified)",
    sActivationChartX: "Total EMF load (S + U + E)",
    sActivationChartXNote: "S = solar activity (0–1), U = urbanization proxy, E = electrification proxy — the three stressor terms of the BioCap integral (biocap.py). Their sum defines position on the hormetic curve.",
    sActivationChartY: "BioCap",
    sActivationChartSun: "Same sun, opposite effects",
    sActivationEpistemic: "",

    sExpansionTitle: "Three Types of Expansion",
    sExpansionCards: [
      {
        id: "α",
        title: "Hormetic Activation",
        examples: "Arabs 632 (solar index 0.73), Vikings 793 (0.55)",
        icon: "sun",
        desc: "Solar maximum + nomadic population in the hormetic zone → testosterone rises, cortisol falls, fertility increases. Over 2–3 generations, a demographic pulse produces expansion. Low-dose exposure has been shown to increase testosterone and decrease cortisol in animal models.",
        trigger: "Solar maximum + nomad = biological activation",
      },
      {
        id: "β",
        title: "Recovery Energy",
        examples: "Age of Exploration 1492, Scientific Revolution 1687, Napoleonic era 1803",
        icon: "moon",
        desc: "Grand solar minimum → reduced electromagnetic burden → biological recovery over 50–80 years → accumulated biological capital → expansion or renaissance. Eight of the ten renaissances in the model dataset (six European, four Asian) fall inside or within 80 years after a grand solar minimum.",
        trigger: "Grand minimum + recovery = creative surge",
      },
      {
        id: "γ",
        title: "Erosion Gradient",
        examples: "Germanic migrations 375–476, Manchu → Ming China 1644, Africa → Europe 2000–",
        icon: "gradient",
        desc: "Sustained biological erosion in urban populations + intact nomadic/agrarian population at the frontier → cumulative BioCap difference. When the gradient exceeds a threshold, expansion follows. This type is not dependent on solar cycles — it is a continuous process requiring centuries of divergence.",
        trigger: "Centuries of urban erosion + intact frontier = replacement",
      },
    ],

    sRedirectTitle: "Behavioral Predictions & Societal Implications",
    sRedirectBody: "The twelve behavioral predictions and their societal implications — including polarization dynamics, safety-seeking, institutional decay, the fixable fraction, and the recursive prediction — are detailed in",
    sRedirectLink: "Patopolis",

    modelDerived: "Model-derived values (berm.civilization: 2025 environment profiles and the regional BioCap integral), not directly measured.",
    modelDerivedLink: "mathematical specification",

    sMcConnellTitle: "Lead as Historical Ca²⁺ Disruptor",
    sMcConnellBody: "[[ref:mcconnell2025_roman_lead|McConnell et al. (PNAS 2025)]] quantified this for Rome. Using three Arctic ice core records, atmospheric transport modeling, and modern epidemiology-based dose-response functions, they estimated that air lead concentrations exceeded 150 ng/m³ near metallurgical sources, with average enhancements of >1.0 ng/m³ across Europe during the Pax Romana. This translates to a 2.5–3 IQ point decline across the entire Empire's population. The mechanism: Pb²⁺ is a potent blocker of all VGCC types, disrupting the same Ca²⁺ homeostasis that EMF disrupts through a different upstream pathway.",

    sCaEffectTitle: "The Ca²⁺ Effect",
    sCaEffectLead: "There is no Flynn effect. There is a Ca²⁺ homeostasis effect whose dominant disruptor shifts over time.",
    sCaEffectRising: "Rising phase (1930–1975): Lead removal restored Ca²⁺ homeostasis. US children's blood lead levels fell from 15 μg/dL to 2 μg/dL after the Clean Air Act (1970). IQ rose. Violent crime fell 56% (NBER: lead removal accounts for this). The 'Flynn effect' was partially recovery from lead-induced Ca²⁺ disruption.",
    sCaEffectTurning: "Turning point (~1975): [[ref:bratsberg2018|Bratsberg & Rogeberg (PNAS 2018, n=730,000+ Norwegian conscripts)]] showed IQ peaked for the 1975 birth cohort and declined ~0.2 points/year thereafter. The decline was WITHIN FAMILIES — later-born brothers scored lower than earlier-born brothers. Same parents, same genes. Environmental cause confirmed, genetic cause ruled out.",
    sCaEffectFalling: "Falling phase (1975–present): EMF replaces lead as the dominant Ca²⁺ disruptor. The inflection point (~1975) coincides with mass electrification densification, microprocessor proliferation, and precedes mobile network construction (1990s) and smartphone adoption (2007+). The anti-Flynn effect is now documented in Norway, Denmark, Finland, France, and the United Kingdom.",
    sCaEffectPrediction: "Prediction: Anti-Flynn should appear FIRST in countries where (a) lead exposure has already declined AND (b) EMF infrastructure is densest. It should appear LAST where lead exposure is still high AND EMF is sparse. This matches observation: Scandinavia first, Sub-Saharan Africa not yet.",

    sSubAssimTitle: "Sub-Assimilation: The Developmental Window Signature",
    sSubAssimBody1: "Finnish register data (European Sociological Review 2026) documents that many immigrant descendants exhibit fertility levels BELOW the native population — not convergence but sub-assimilation.",
    sSubAssimBody2: "First-generation immigrants who arrive as adults developed in a low-EMF environment. Their developmental windows (fetal VGCC formation, childhood BBB maturation, pubertal HPG activation) were completed before high-EMF exposure. Second-generation children develop IN the high-EMF host country from conception. Fetal biological vulnerability is several-fold higher than adult (thinner skull, developing BBB, active VGCC-dependent neurodevelopment, CaMKII-sensitive developmental windows).",
    sSubAssimBody3: "Result: second-generation biological capacity is lower than first-generation — not because genes changed (they didn't) but because developmental windows were exposed to an environment the parents were not exposed to during equivalent windows.",

    sCamkiiTitle: "CaMKII: The Convergence Molecule",
    sCamkiiBody1: "CaMKII autophosphorylation is the only enzymatic event required for synaptic memory (PNAS 2024). Thr286 phosphorylation slows CaMKII decay and lowers the frequency required to induce plasticity by several fold (Neuron 2017).",
    sCamkiiBody2: "In the heart: sustained high Ca²⁺ makes CaMKII constitutively active via autophosphorylation, triggering pro-arrhythmic remodeling (J Physiol 2026). In the pancreas: CaMKII hyperphosphorylation of RyR2 produces the hallmarks of pre-diabetes — hyperinsulinemia, glucose intolerance, impaired insulin secretion (PMC3596297).",
    sCamkiiBody3: "CaMKII is the molecular mechanism of BERM's three key predictions: (1) Cumulative: it 'remembers' prior Ca²⁺ load. (2) Accelerating: it lowers the threshold for subsequent activation. (3) Multi-system: the same molecule produces cardiac, metabolic, neurological, and reproductive pathology depending on tissue.",

    sHormesisEvidence: "The hormetic dose-response is documented experimentally. ELF-EMF dose-response follows a hormetic model: low doses are beneficial and stimulating, higher doses produce adverse effects (Applied Sciences 2026 review). ELF-EMF increased mitochondrial electron transport chain activities and ameliorated depressive behaviors in mice through beneficial hormetic effects (PMC11508854). ELF-MF exposure stimulated adrenal steroidogenesis via inhibition of phosphodiesterase activity — and paradoxically DECREASED intracellular Ca²⁺ concentration at low doses (PMC4839720). This confirms the dose-response curve that the activation model requires: the same electromagnetic stimulus that damages a high-EMF urban population stimulates a low-EMF nomadic population. The mechanism is the same (Ca²⁺/VGCC). The outcome differs because the dose-response is non-monotonic.",

    sTimothyTitle: "Proof of Concept: Timothy Syndrome",
    sTimothyBody1: "Timothy Syndrome is a single CACNA1C gain-of-function mutation (G406R) that reduces voltage-dependent channel inactivation and causes intracellular Ca²⁺ overload. One mutation, one mechanism.",
    sTimothyBody2: "Produced pathologies: lethal arrhythmias, congenital heart disease, immune deficiency, intermittent hypoglycemia, cognitive abnormalities, autism, developmental delay, ADHD, epilepsy, seizures, hypotonia (EJHG consensus, July 2026).",
    sTimothyBody3: "Every system that BERM predicts EMF would affect through chronic Ca²⁺ overload, Timothy Syndrome affects through genetic Ca²⁺ overload: cardiac, immune, metabolic, neurological, developmental. BERM predicts a weaker, chronic, population-level version of the same mechanism.",
    navCivMain: "Civilization",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
  },
  fi: {
    title: "Patopoliteia",
    subtitle: "Makrohistoriallinen ulottuvuus: miten sahkomagneettiset ymparistot muokkaavat sivilisaatiokaavoja",
    heroLead:
      "Sivilisaatiot eivat ole abstrakteja kulttuurientiteetteja. Ne ovat biologisten organismien populaatioita. Niiden elinvoima — kyky laajenemiseen, luovuuteen, luottamukseen, lisaantymiseen ja institutionaaliseen yllapitoon — pohjautuu mitattavaan substraattiin: jaseninsa hormonaalisiin ja neurokemiallisiin profiileihin.",
    heroTrail:
      "Tama sivu kasittelee BERM-mallin sivilisaatioulottuvuutta: biologisesta laista, joka saatelee nousua ja rappiota, BioCap-viitekehyksen kautta ennusteisiin ja projektioihin.",

    sHistLawTitle: "Sivilisaatioiden biologinen laki",
    sHistLawLead: "Kautta historian sivilisaatiot ovat seuranneet hämmästyttävän johdonmukaista kaavaa: nousu, kukoistus, rappio. Yksitoista itsenäistä ajattelijaa — Ibn Khaldunista (1377) ja Vicosta (1725) [[ref:turchin2023_end_times|Turchiniin (2023)]] ja Parviniin (2023) — päätyi samaan havaintoon toisistaan tietämättä; yhdeksän on taulukoitu alla, ja Haidt, Swan ja Twenge käsitellään Historiallinen konvergenssi -sivulla. BERM ehdottaa puuttuvaa mekanismia: sähkömagneettinen ympäristö säätelee biologista kapasiteettia, joka puolestaan ohjaa sivilisaation dynamiikkaa.",

    sProphetsTitle: "Profeetat olivat oikeassa — ja väärässä",
    sProphetsLead: "Yksitoista vakavaa ajattelijaa kolmen vuosisadan aikana dokumentoivat itsenäisesti saman sivilisaatiokuvion. He olivat eri mieltä metodista, ideologiasta ja laajuudesta. Silti he yhtyvät yhteen havaintoon: sivilisaatiot eivät edisty lineaarisesti. Ne nousevat ja laskevat sykleissä, ja myöhäisvaiheita leimaavat laskeva syntyvyys, lisääntyvä hedonismi, kollektiivisen tahdon menetys ja pessimismi.",
    sProphetsTable: [
      { thinker: "Giambattista Vico", year: "1725", observation: "Kolmen aikakauden toistuva sykli (jumalat, sankarit, ihmiset)", bermExplanation: "BioCap-oskillaatio tuottaa kvalitatiivisesti erilaisia sosiaalisia vaiheita" },
      { thinker: "Oswald Spengler", year: "1918", observation: "Sivilisaatiot elävien organismien kaltaisina", bermExplanation: "Biologisella substraatilla on elinkaari kumulatiivisen EMF-altistuksen ohjaamana" },
      { thinker: "Arnold Toynbee", year: "1934", observation: "Haaste-ja-vastaus 21 sivilisaatiossa", bermExplanation: "Biologinen kapasiteetti määrää vastauksen laadun; ehtyneet populaatiot epäonnistuvat haasteissa" },
      { thinker: "Pitirim Sorokin", year: "1937", observation: "Sensaatti-ideaalinen kulttuurinen oskillaatio", bermExplanation: "Dopamiini/serotoniini-tasapaino muuttuu → sensaattivaihe = matala-DA, korkea stimulaatiohaku" },
      { thinker: "John Bagot Glubb", year: "1978", observation: "250 vuoden imperiumin elinkaari, 6 vaihetta", bermExplanation: "Glubbin ~250 vuotta; mallin 20 imperiumin aineisto antaa mediaanin 377 vuotta (keskiarvo 431), 65 % ±1 sd:n sisällä 208 vuoden Suess-jaksosta" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Monimutkaisuuden laskevat rajatuotot", bermExplanation: "Kognitiivisen kapasiteetin lasku (BDNF↓, kortisoli↑) vähentää kykyä hallita monimutkaisuutta" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "Asabiya (ryhmäsolidaarisuus) heikkenee 3-4 sukupolvessa", bermExplanation: "Oksitosiini↓ + testosteroni↓ = vähentynyt ryhmäkoheesio — juuri asabiyan menetys" },
      { thinker: "Peter Turchin", year: "2003", observation: "Sekulaarisyklit (~80-100 v) pidempien aaltojen sisällä", bermExplanation: "Gleissberg-sykli (88 v) säätelee BioCap:ia Suess-syklin kuoren sisällä" },
      { thinker: "Neema Parvini", year: "2023", observation: "Syntetisoi kaikki 11 ajattelijaa; kuvio on robusti kehysten yli", bermExplanation: "Itsenäisten havainnoitsijoiden yhdentyminen = vahva näyttö todellisesta ilmiöstä joka vaatii selityksen" },
    ],

    sSolarTitle: "Ennen ja jälkeen sähköistymisen",
    sSolarLead: "Ennen sähköistymistä ainoa merkittävä sähkömagneettinen vaikutus biologiaan tuli auringosta. Aurinkoaktiivisuus oskiloi sisäkkäisinä sykleinä: 11 vuoden Schwabe-sykli, 88 vuoden Gleissberg-sykli ja ~208 vuoden Suess/de Vries -sykli. Auringon suurminimien aikana sähkömagneettinen kuormitus biologiaan vähenee ja biologinen palautuminen tapahtuu.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: [
      "S(τ) = aurinkosyklien superpositio [0,1]",
      "U(τ) = urbanisaation EMF-komponentti (hidas, pre-sähköinen)",
      "E(τ) = sähköistymisen EMF-komponentti (nopea, post-1880)",
      "σ(τ) = palautumisen vaimennus = 0,95 · logistic(0,045 · (τ − 1960)); 0 ennen vuotta 1880",
      "χ(λ) = biologinen herkkyys, kasvaa leveysasteen mukana (0,25 päiväntasaajalla → 1,0 65°:ssa), lisättynä alueen sähköistysboostilla (chi_total)",
      "α = biologinen palautumiskerroin (0,3)",
    ],
    sSolarFormulaNote: "BioCap₀ on alkuperäinen biologinen kapasiteetti, joka on asetettu arvoon 1,0 altistumattomalle väestölle. Kaavassa on kaksi integraalia: ensimmäinen (vaurio) kerää altistusta aurinko-, kaupungistumis- ja sähköistymiskomponenteista leveysasteherkkyydellä χ(λ) painotettuna. Toinen (palautuminen) edustaa biologista korjautumista matalan altistuksen ikkunoissa, ja sitä ohjaa palautumiskerroin α = 0,3. Palautumisen vaimennuskerroin σ(τ) kuvaa keskeisen sähköistymisen jälkeisen muutoksen: kun keinotekoinen EMF (E) hallitsee, aiemmin auringon minimien kanssa yhteen osuneet palautumisikkunat estyvät. Arvolla σ = 0,95 (moderni kaupunki) 95 % mahdollisesta palautumisesta on vaimennettu. Koodi jakaa kertyneen nettomuutoksen integrointivälillä (t − t₀), jolloin BioCap ilmaistaan vuosikeskiarvona, ja rajaa tuloksen välille [0, BioCap₀]; kun region = nimi, χ seuraa chi_total(λ, τ, alue) -arvoa vuosittain.",
    sSolarPrePost: "Pre-sähköinen (E=0): BioCap oskiloi → syklinen sivilisaatiodynamiikka. Post-sähköinen (E≫S): BioCap laskee monotonisesti → ei palautumisikkunaa.",
    sSolarRenaissance: "Kahdeksan mallin aineiston kymmenestä renessanssista (kuusi eurooppalaista, neljä aasialaista) osuu auringon suurminimin sisään tai enintään 80 vuotta sen päättymisen jälkeen: Italian renessanssi Spörer-minimissä, tieteellinen vallankumous Maunder-minimissä, saksalainen romantiikka Dalton-minimissä.",

    sMigrationTitle: "Muuttogradientti",
    sMigrationLead: "Sama biologinen gradientti, joka ajoi germaaniheimoilaisia Roomaan, arabit Bysanttiin ja mongolit Song-Kiinaan, toimii tänään. Saharan eteläpuolisella Afrikalla — jolla on lyhin kumulatiivinen sähkömagneettinen altistus kaikista suurista populaatioista — on korkein biologinen kapasiteetti. Muuttovirrat Afrikasta ja Lähi-idästä Eurooppaan seuraavat biologisen kontrastin gradienttia. Mallin BioCap 2025 (alueellinen integraali, biocap.py + chi_total): Saharan eteläpuolinen Afrikka 0,89, Latinalainen Amerikka 0,86, Etelä-Aasia 0,85, Lähi-itä 0,81, Itä-Aasia 0,76, Etelä-Korea 0,73, Japani 0,72, USA 0,71, Länsi-Eurooppa 0,65.",
    sMigrationNote: "Tämä on biologinen gradientti (ympäristö, ei genetiikka). Maahanmuuttajien hedelmällisyys yhtyy isäntämaan tasolle — ja suomalaisessa rekisteridatassa painuu sen alle — 1–2 sukupolvessa, mikä todistaa mekanismin olevan ympäristöllinen, ei geneettinen.",

    sLastBarbarianTitle: "'Viimeisen barbaarin' ikkuna",
    sLastBarbarianText: "Alueellisessa BioCap-integraalissa Saharan eteläpuolisen Afrikan sähköistysboosti kyllästyy arvoon χ +0,10 (chi_map.ELECTRIFICATION_CHI_PEAK), joten sen BioCap laskee vain 0,89:stä (2025) 0,86:een (2080), kun Länsi-Eurooppa laskee 0,65:stä 0,54:ään: gradientti levenee +0,25:stä +0,32:een. Malli ei siis sulje 'viimeisen barbaarin' ikkunaa vuosiin 2060–2080 mennessä. Se sulkeutuu vain, jos Afrikan sähkömagneettinen kuorma nousee länsimaiselle tasolle — falsifioitava ehto: jos Afrikan TFR- ja biomarkkeritrendit yhtyvät länsimaisiin arvoihin ennen vuotta 2060, alueelliset parametrit ovat väärin.",

    sThreeLawsTitle: "Kolme historiallista lakia",
    sThreeLaws: [
      { id: "L1", title: "Sivilisaation synty vaatii matalan χ:n vyöhykettä (25-35°N)", desc: "Biologinen stabiilisuus → pitkäjänteinen kehitys. Neljä ensimmäistä sivilisaatiota (Mesopotamia, Egypti, Indus, Keltainenjoki) syntyivät 25–35°N:ssä, jossa χ ≈ 0,37–0,49; mallin yhdeksän ekspansioimperiumia sijaitsevat 33–52°N:ssä." },
      { id: "L2", title: "Luovat renessanssit klusteroituvat suurminimien aikaan korkean χ:n leveysasteilla (45-60°N)", desc: "Suurin palautumismodulaatio → suurin luova pääoma (χ ≈ 0,63–0,90 45–60°N:ssä). 8 mallin aineiston 10 renessanssista." },
      { id: "L3", title: "Imperiumien nousut alkavat matalan aurinkoaktiivisuuden aikana", desc: "Biologinen palautuminen → kapasiteetti ekspansioon. Mallin aineisto: aurinkoindeksin keskiarvo 0,41 imperiumien nousuissa vs 0,49 huipuissa." },
    ],

    thThinker: "Ajattelija",
    thYear: "Vuosi",
    thObservation: "Havainto",
    thBerm: "BERM-selitys",
    biocapNormTitle: "BioCap-rappio — normalisoitu elinikä",
    biocapTimeTitle: "BioCap-liikeradat — historiallinen aikajana",
    biocapXNorm: "Sivilisaation elinikä (%)",
    biocapXTime: "Vuosi",
    biocapY: "BioCap",

    sCulturalTitle: "Mitä on kulttuurinen energia?",
    sCulturalLead: "Yhdeksänkymmentä vuotta historioitsijat ovat kuvailleet sivilisaatioiden energiaa kykenemättä määrittelemään sitä materiaalisesti. Unwin kutsui sitä 'sosiaaliseksi energiaksi'. Spengler kutsui sitä 'kulttuurin sieluksi'. Glubb mittasi sen vaiheet empiirisesti mutta ei kyennyt tunnistamaan sen substanssia. Turchin mallinti sen matemaattisesti mutta ei voinut perustaa sitä biologisesti.",
    sCulturalBody: "BERM esittää ensimmäisen materialistisen määritelmän: kulttuurinen energia on väestön kollektiivinen vapaa biologinen energia — se mikä jää jäljelle kun homeostaattinen ylläpito ja ympäristövaurioiden korjaus vähennetään kokonaisaineenvaihduntakapasiteetista. Se on mitattavissa, hajotettavissa kahdeksaan biomarkkeriin, ja sen liikerata on ennustettavissa.",
    sCulturalFormula: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)",
    sCulturalFormulaDesc: "missä N(t) = väestön koko, BioCap(t) = keskimääräinen biologinen kapasiteetti, η(t) = institutionaalinen tehokkuus",
    sCulturalBioTitle: "Kahdeksan sivilisaatiokapasiteetin biomarkkeria",
    sCulturalBioWeightNote: "Painot kuvaavat kunkin biomarkkerin suhteellista osuutta kokonaisbiologisesta kapasiteetista, ja ne on asetettu empiirisen kirjallisuuden efektikokojen suuruuden perusteella: T ja OXT saavat suurimmat painot (0,20 kumpikin), koska ne ovat sekä yksilön lisääntymiskäyttäytymisen että kollektiivisen sosiaalisen koheesion ensisijaiset substraatit — kaksi akselia, jotka määräävät sivilisaation tuotoksen. DA ja MEL saavat 0,15 kumpikin motivaation ja kognitiivisen palautumisen ensisijaisina substraatteina. BDNF saa 0,10 kognitiivisen joustavuuden substraattina. CORT saa −0,10 ja syötetään kaavaan muodossa (1 − CORT), koska se vaimentaa muita kaksoishormonihypoteesin ja HPA-välitteisen immunosuppression kautta. D ja B2 saavat 0,05 kumpikin suojaavina kofaktoreina. Painojen itseisarvot summautuvat 1,0:aan, joten BioCap kattaa välin [0, 1], jossa 1,0 on esiteollinen optimi (kaikki positiiviset markkerit 1,0, kortisoli 0,0).",
    sCulturalBiomarkers: [
      { symbol: "T", name: "Testosteroni", weight: 0.20, trend: "↓ 1,2 %/v", function: "Riskinotto, kilpailu, itsevarmuus, avaruudellinen kognitio", unwin: "Ekspansiivinen energia" },
      { symbol: "OXT", name: "Oksitosiini", weight: 0.20, trend: "↓ (välillinen)", function: "Sosiaalinen luottamus, ryhmäkoheesio, yhteistyö, parisidonta", unwin: "Koheesioenergia (asabiya)" },
      { symbol: "DA", name: "Dopamiiniherkkyys", weight: 0.15, trend: "↓ (välillinen)", function: "Motivaatio, tavoitteen tavoittelu, viivästetty tyydytys, luovuus", unwin: "Produktiivinen energia" },
      { symbol: "MEL", name: "Melatoniini", weight: 0.15, trend: "↓↓ (LED+EMF)", function: "Unenlaatu, kognitiivinen konsolidaatio, sirkadiaaninen koherenssi", unwin: "Mentaalinen energia" },
      { symbol: "BDNF", name: "BDNF", weight: 0.10, trend: "↓ (Flynn⁻)", function: "Abstrakti päättely, oppiminen, kognitiivinen joustavuus", unwin: "Mentaalinen energia (kogn.)" },
      { symbol: "CORT", name: "Kortisoli", weight: -0.10, trend: "↑ (HPA)", function: "Ahdistus, lyhytjänteinen ajattelu, uhkakeskeisyys (KÄÄNTEINEN)", unwin: "Energian kulutus" },
      { symbol: "D", name: "D-vitamiini", weight: 0.05, trend: "↓ (47,9 % puutteellinen)", function: "Immuunipätevyys, Ca²⁺-homeostaasin moderaatio", unwin: "Suojaava tekijä" },
      { symbol: "B2", name: "Riboflaviini (B2/FAD)", weight: 0.05, trend: "↓ (prosessoitu ruoka)", function: "CRY-proteiinin stabiilisuus, mitokondriaalinen energia", unwin: "Suojaava tekijä" },
    ],
    sCulturalRadarTitle: "Biomarkkeriprofiiili — länsimainen väestö 2025",
    sCulturalTimeTitle: "BioCap-liikerata: 1900–2060",
    sCulturalTimeX: "Vuosi",
    sCulturalTimeY: "BioCap",
    sCulturalAmish: "Amish",
    sCulturalNow: "2025:",
    sCulturalForecast: "ennuste",
    sCulturalLinesTitle: "Yksittäisten biomarkkerien liikeradat",
    sCulturalUnwinTitle: "Unwinin todistusaineisto",
    sCulturalUnwinBody1: "Vuonna 1934 Oxfordin antropologi J.D. Unwin julkaisi tutkimuksen 86 yhteiskunnasta 5 000 vuoden ajalta. Hänen havaintonsa oli ehdoton: jokaisessa yhteiskunnassa poikkeuksetta kulttuurisen saavutuksen taso korreloi suoraan yhteiskunnan asettaman seksuaalisen pidättyväisyyden kanssa. Tiukan sääntelyn yhteiskunnat osoittivat mitä Unwin kutsui 'ekspansiiviseksi energiaksi'. Sallivien normien yhteiskunnat osoittivat 'zoistista' energiaa — toimeentuloa ilman ekspansiota.",
    sCulturalUnwinBody2: "Unwin katsoi tämän johtuvan freudilaisesta sublimaatiosta: seksuaalienergia, jota ei purettu seksuaalisesti, ohjautui kulttuuriseen tuotantoon. Tämä selitys ei ole vanhentunut hyvin. Mutta hänen datansa on. Kukaan ei ole replikoinut tutkimusta, mutta kukaan ei ole falsifioinut sitäkään. 86 yhteiskuntaa, nolla poikkeusta.",
    sCulturalUnwinBody3: "BERM esittää eri mekanismin samalle havainnolle. Seksuaalinen pidättyväisyys ei tuota kulttuurista energiaa. Sen sijaan sekä korkea seksuaalinen halu (joka vaatii säätelyä) että korkea kulttuurinen energia ovat saman biologisen tilan oireita: korkea testosteroni, korkea oksitosiini, korkea dopamiiniherkkyys, normaali melatoniini, matala kortisoli. Tässä tilassa väestöllä on sekä vahva libido (joka edellyttää sosiaalista säätelyä) että vahva sivilisaatiokapasiteetti. Kun biologinen kapasiteetti laskee — kumulatiivisen sähkömagneettisen altistuksen, kaupungistumisen kautta — sekä seksuaalinen halu että kulttuurinen energia laskevat yhdessä. Unwinin havaitsema korrelaatio oli todellinen. Kausaatio oli yhteinen ylävirran tekijä, jota hän ei olisi voinut tunnistaa vuonna 1934.",
    sCulturalPhasesTitle: "Unwinin neljä vaihetta",
    sCulturalPhasesNote: "Kynnykset 0,55 / 0,75 / 0,90 ovat kiinteitä vakioita unwin_validation.py:ssä, jotka kuvaavat BioCapin Unwinin neljään kategoriaan. Sovellettuna moderniin länsimaiseen trajektoriin (biomarker_trajectories.py:n logistiset sekulaaritrendit) ne antavat: rationalistinen → deistinen 1983 (laukaisijamarkkeri T), deistinen → manistinen 2007 (OXT), manistinen → zoistinen mallin mukaan 2040 (OXT). Amish-ympäristö (BioCap 0,955) pysyy rationalistisena; kaupunkitoimistoympäristö (0,480) on jo zoistinen.",
    sCulturalPhases: [
      { name: "Zoistinen", biocap: "< 0,55", desc: "Toimeentulo ilman ekspansiota. Ei suurimuotoista rakentamista, abstraktia ajatteluperinnettä tai alueellista kunnianhimoa. Mallin projektio lännelle: ~2040 alkaen.", color: "red" },
      { name: "Manistinen", biocap: "0,55–0,75", desc: "Laskeva energia. Populismi, institutionaalinen rappio, polarisaatio, pronatalismipolitiikan epäonnistuminen. Länsimainen sivilisaatio 2007–nykyhetki (BioCap 0,745 vuonna 2007 → 0,614 vuonna 2025).", color: "amber" },
      { name: "Deistinen", biocap: "0,75–0,90", desc: "Siirtymävaihe. Kulttuurinen tuotanto jatkuu mutta laskevin uutuuksin. Institutionaalinen luottamus murenee. Länsimainen sivilisaatio 1983–2007.", color: "blue" },
      { name: "Rationalistinen", biocap: "> 0,90", desc: "Täysi ekspansiivinen energia. Valloitus, rakentaminen, älyllinen saavutus, tieteellinen vallankumous. Länsimainen sivilisaatio vuoteen 1983 (BioCap 0,997 vuonna 1900, 0,908 vuonna 1980).", color: "green" },
    ],
    sCulturalSensTitle: "Herkkyysanalyysi",
    sCulturalSensDesc: "Jos yksi biomarkkeri palautettaisiin esiteolliseen optimiinsa (1,0; kortisoli 0,0:aan) muiden pysyessä vuoden 2025 arvoissaan. Prosentti on se osuus vuoden 2025 BioCapin (0,614) ja maksimin (1,0) välisestä erosta, jonka yksittäinen palautus kuroo umpeen — T:n palautus kuroo 23,3 % erosta ja nostaa BioCapin 0,614:stä 0,704:ään (sensitivity.py, sensitivity_all):",
    sCulturalSensItems: [
      { marker: "T → 1,0", recovery: "23,3 %", desc: "Suurin yksittäinen interventio (BioCap 0,614 → 0,704)" },
      { marker: "OXT → 1,0", recovery: "19,9 %", desc: "Sosiaalinen koheesio" },
      { marker: "MEL → 1,0", recovery: "16,4 %", desc: "Sirkadiaaninen palautuminen" },
      { marker: "CORT → 0,0", recovery: "13,9 %", desc: "HPA-akselin normalisointi (kortisoli lattiatasolleen)" },
      { marker: "DA → 1,0", recovery: "12,8 %", desc: "Motivaatiokäyttövoima" },
      { marker: "BDNF → 1,0", recovery: "6,7 %", desc: "Kognitiivinen kapasiteetti" },
      { marker: "D → 1,0", recovery: "4,5 %", desc: "Suojaava kofaktori" },
      { marker: "B2 → 1,0", recovery: "2,5 %", desc: "CRY/FAD-kofaktori" },
    ],
    sCulturalSensConclusion: "Kriittinen triadi (T + MEL + OXT) muodostaa 55 % BioCap-painosta ja 59,6 % saavutettavissa olevasta palautumisesta. EMF-vähennys on ainoa interventio, joka nostaisi kaikkia biomarkkereita samanaikaisesti, koska ne kaikki ovat EMF-kaskadin alavirran tuotteita.",
    sCulturalTransTitle: "Vaihesiirtymät",
    sCulturalTransitions: [
      { year: "1983", from: "Rationalistinen", to: "Deistinen", trigger: "BioCap alittaa 0,90:n; mallin laukaisijamarkkeri: testosteroni", evidence: "Sekulaari T-lasku 1980-luvun alusta (Travison 2007, Santi 2025), siittiökonsentraatio −1,2 %/v (Levine 2017), ensimmäinen pysyvä alle uusiutumistason TFR lännessä" },
      { year: "2007", from: "Deistinen", to: "Manistinen", trigger: "BioCap alittaa 0,75:n; mallin laukaisijamarkkeri: oksitosiini", evidence: "Luottamuksen romahdus (Edelman), yksinäisyysepidemia, 'failure to launch', polarisaation alku, pronatalismin epäonnistuminen" },
      { year: "~2040", from: "Manistinen", to: "Zoistinen", trigger: "BioCap alittaa mallin mukaan 0,55:n; laukaisijamarkkeri: oksitosiini", evidence: "ENNUSTE — falsifioitavissa: jos lännen BioCap palautuu yli 0,75:n 2030-luvulla (T-, OXT- ja MEL-trendit kääntyvät) → väärä" },
    ],

    sActivationTitle: "Aktivaatiosykli: miksi uudet voimat nousevat vanhojen heikentyessä",
    sActivationLead: "Edeltävät osiot selittivät, miksi sivilisaatiot heikkenevät. Pelkkä heikkeneminen ei kuitenkaan selitä historian toistuvaa korvautumisen kaavaa. Jokaisen Rooman rinnalla on germaaniheimojen nousu. Jokaisen Bysantin rinnalla arabiexpansio. Jokaisen Song-dynastian rinnalla mongolivalloitus.",
    sActivationBody1: "Tavanomainen selitys pitää tulijaa yksinkertaisesti 'aggressiivisempana' tai 'elinvoimaisempana' — kulttuurinen luonnehdinta, joka ei selitä mitään. BERM:n hormeesin viitekehys tarjoaa biologisen mekanismin.",
    sActivationBody2: "Sama aurinkoaktiivisuus, joka vahingoittaa korkean sähkömagneettisen kuorman alaista kaupunkiväestöä, stimuloi matalan kuorman alaista paimentolaisväestöä. Tämä ei ole spekulaatiota — se on dokumentoitua kokeellista fysiologiaa. Matala-annoksinen sähkömagneettinen altistus nostaa mitattavasti testosteronitasoa, laskee kortisolitasoa ja tehostaa immuunivastetta koe-eläimillä. Mekanismi on hormesis: stressivaste, joka pieninä annoksina vahvistaa biologisia järjestelmiä vahingoittamisen sijaan.",
    sActivationBody3: "Paimentolaisväestö, joka elää annos-vastekäyrän hormeettisella alueella, kokee auringon aktiivivaiheen biologisena aktivaationa: testosteroni nousee, kortisoli laskee, hedelmällisyys paranee ja immuunitoiminta tehostuu. Kahdessa tai kolmessa sukupolvessa tämä tuottaa väestöpulssin — nuorten miesten ylijäämän, joilla on korkea biologinen kapasiteetti mutta ei maata eikä puolisoa. Tämä ylijäämä on 'barbaari portilla'.",
    sActivationBody4: "Samanaikaisesti kaupunkiväestö vahinkovyöhykkeellä kokee saman auringon vaiheen lisäbiologisena kulumisena. Kahden väestön välinen gradientti — toinen aktivoituu, toinen heikentyy — kasvaa molemmilta puolilta yhtä aikaa. Kun se ylittää kynnysarvon, seuraa ekspansio. Ei ideologian tai kulttuurin vaan biologian ja demografian vuoksi.",
    sActivationChartTitle: "Hormeettinen annos-vastekäyrä",
    sActivationChartZone1: "Vyöhyke 1: Hormeettinen stimulaatio (paimentolainen)",
    sActivationChartZone2: "Vyöhyke 2: Siirtymäalue (agraarinen)",
    sActivationChartZone3: "Vyöhyke 3: Vahinko (urbaani/sähköistetty)",
    sActivationChartX: "Kokonais-EMF-kuorma (S + U + E)",
    sActivationChartXNote: "S = aurinkoaktiivisuus (0–1), U = kaupungistumisen proxy, E = sähköistymisen proxy — BioCap-integraalin kolme stressoritermiä (biocap.py). Niiden summa määrittää sijainnin hormeettisella käyrällä.",
    sActivationChartY: "BioCap",
    sActivationChartSun: "Sama aurinko, vastakkaiset vaikutukset",
    sActivationEpistemic: "",

    sExpansionTitle: "Kolme ekspansiotyyppiä",
    sExpansionCards: [
      { id: "α", title: "Hormeettinen aktivaatio", examples: "arabit 632 (aurinkoindeksi 0,73), viikingit 793 (0,55)", icon: "sun", desc: "Auringon aktiivivaihe yhdistettynä paimentolaisväestöön hormeettisella vyöhykkeellä → testosteroni nousee, kortisoli laskee, hedelmällisyys kasvaa. Kahdessa tai kolmessa sukupolvessa väestöpulssi tuottaa ekspansion. Matala-annoksinen altistus nostaa testosteronitasoa ja laskee kortisolitasoa eläinmalleissa.", trigger: "Auringon aktiivivaihe + paimentolainen = biologinen aktivaatio" },
      { id: "β", title: "Palautumisenergia", examples: "Löytöretket 1492, tieteellinen vallankumous 1687, Napoleonin kausi 1803", icon: "moon", desc: "Auringon suurminimi → sähkömagneettinen kuormitus vähenee → biologinen palautuminen 50–80 vuoden kuluessa → kertynyt biologinen pääoma → ekspansio tai renessanssi. Kahdeksan mallin aineiston kymmenestä renessanssista (kuusi eurooppalaista, neljä aasialaista) osuu suurminimin sisään tai enintään 80 vuotta sen jälkeen.", trigger: "Suurminimi + palautuminen = luova kukoistus" },
      { id: "γ", title: "Eroosion gradientti", examples: "Kansainvaellus 375–476, mantšut → Ming-Kiina 1644, Afrikka → Eurooppa 2000–", icon: "gradient", desc: "Pitkäaikainen biologinen kuluminen kaupunkiväestössä yhdistettynä vahingoittumattomaan paimentolais- tai maatalousväestöön rajoilla → kumulatiivinen BioCap-ero. Kun gradientti ylittää kynnyksen, ekspansio seuraa. Tämä tyyppi ei riipu aurinkosykleistä — se on jatkuva prosessi, joka vaatii vuosisatojen eriytymisen.", trigger: "Vuosisatojen urbaani kuluminen + koskematon raja = korvautuminen" },
    ],

    sRedirectTitle: "Käyttäytymisennusteet ja yhteiskunnalliset vaikutukset",
    sRedirectBody: "Kaksitoista käyttäytymisennustetta ja niiden yhteiskunnalliset vaikutukset — mukaan lukien polarisaatiodynamiikka, turvallisuushakuisuus, institutionaalinen rapautuminen, korjattavissa oleva osuus ja rekursiivinen ennuste — esitellään sivulla",
    sRedirectLink: "Patopolis",

    modelDerived: "Mallin tuottamia arvoja BioCap-integraalista, ei suoraan mitattuja.",
    modelDerivedLink: "matemaattinen spesifikaatio",

    sMcConnellTitle: "Lyijy historiallisena Ca²⁺-häiritsijänä",
    sMcConnellBody: "[[ref:mcconnell2025_roman_lead|McConnell ym. (PNAS 2025)]] kvantifioivat tämän Rooman osalta. Käyttäen kolmea arktista jääkairausnäytettä, ilmakehän kulkeutumismallinnusta ja moderniin epidemiologiaan perustuvia annos-vastekertoimia he arvioivat, että ilman lyijypitoisuudet ylittivät 150 ng/m³ metallurgisten lähteiden lähellä, ja eurooppalaiset keskimääräiset kohonneet tasot olivat >1,0 ng/m³ Pax Romanan aikana. Tämä vastaa 2,5–3 älykkyysosamaarapisteen laskua koko valtakunnan väestössä. Mekanismi: Pb²⁺ on voimakas kaikkien VGCC-tyyppien salpaaja, joka häiritsee samaa Ca²⁺-homeostaasia, jonka EMF häiritsee eri ylävirran reitin kautta.",

    sCaEffectTitle: "Ca²⁺-efekti",
    sCaEffectLead: "Flynn-efektiä ei ole. On Ca²⁺-homeostaasivaikutus, jonka hallitseva häiritsijä vaihtuu ajan myötä.",
    sCaEffectRising: "Nousuvaihe (1930–1975): Lyijyn poisto palautti Ca²⁺-homeostaasin. Yhdysvaltojen lasten veren lyijytasot laskivat 15 μg/dL:sta 2 μg/dL:iin Clean Air Actin (1970) jälkeen. Älykkyysosamaaara nousi. Väkivaltarikollisuus laski 56 %. 'Flynn-efekti' oli osittain palautumista lyijyn aiheuttamasta Ca²⁺-häiriöstä.",
    sCaEffectTurning: "Käännepiste (~1975): [[ref:bratsberg2018|Bratsberg ja Rogeberg (PNAS 2018, n=730 000+ norjalaista asevelvollista)]] osoittivat, että älykkyysosamaaara saavutti huippunsa vuoden 1975 syntymaakohortissa ja laski ~0,2 pistettä/vuosi sen jälkeen. Lasku tapahtui PERHEIDEN SISÄLLÄ — myöhemmin syntyneet veljet saivat matalampia tuloksia. Samat vanhemmat, samat geenit. Ympäristösyy vahvistettu, geneettinen syy suljettu pois.",
    sCaEffectFalling: "Laskuvaihe (1975–nykyhetki): EMF korvaa lyijyn hallitsevana Ca²⁺-häiritsijänä. Käännepiste (~1975) osuu yhteen sähköistyksen tihentymisen, mikroprosessorien leviämisen kanssa ja edeltää mobiiliverkkojen rakentamista (1990-luku) ja älypuhelinten käyttöönottoa (2007+). Anti-Flynn-efekti on nyt dokumentoitu Norjassa, Tanskassa, Suomessa, Ranskassa ja Yhdistyneessä kuningaskunnassa.",
    sCaEffectPrediction: "Ennuste: Anti-Flynnin pitäisi ilmaantua ENSIN maissa, joissa (a) lyijyaltistus on jo laskenut JA (b) EMF-infrastruktuuri on tiheintä. VIIMEISENÄ siellä missä lyijyaltistus on vielä korkea JA EMF on harvaa. Tämä vastaa havaintoa: Skandinavia ensin, Saharan eteläinen Afrikka ei vielä.",

    sSubAssimTitle: "Sub-assimilaatio: kehitysikkunan allekirjoitus",
    sSubAssimBody1: "Suomen rekisteriaineisto (European Sociological Review 2026) dokumentoi, että monet maahanmuuttajien jälkeläiset osoittavat hedelmällisyystasoja, jotka ovat ALLE kantaväestön — ei yhtenevyys vaan ali-assimilaatio.",
    sSubAssimBody2: "Ensimmäisen sukupolven maahanmuuttajat, jotka saapuvat aikuisina, kehittyivät matala-EMF-ympäristössä. Heidän kehitysikkunansa (sikiön VGCC-muodostuminen, lapsuuden BBB-kypsyminen, puberteetin HPG-aktivaatio) olivat valmiit ennen korkea-EMF-altistusta. Toisen sukupolven lapset kehittyvät korkea-EMF-isäntämaassa hedelmöityksestä lähtien. Sikiön biologinen haavoittuvuus on moninkertainen aikuiseen verrattuna.",
    sSubAssimBody3: "Tulos: toisen sukupolven biologinen kapasiteetti on matalampi kuin ensimmäisen sukupolven — ei siksi että geenit muuttuivat (eivät muuttuneet) vaan koska kehitysikkunat altistettiin ympäristölle, jolle vanhemmat eivät altistuneet vastaavien ikkunoiden aikana.",

    sCamkiiTitle: "CaMKII: konvergenssimolekyyli",
    sCamkiiBody1: "CaMKII:n autofosforylaatio on ainoa synaptiseen muistiin vaadittava entsymaattinen tapahtuma (PNAS 2024). Thr286-fosforylaatio hidastaa CaMKII:n hajoamista ja laskee plastisuuden indusoimiseen vaadittavaa taajuutta moninkertaisesti (Neuron 2017).",
    sCamkiiBody2: "Sydämessä: pitkäaikainen korkea Ca²⁺ tekee CaMKII:sta konstitutiivisesti aktiivisen autofosforylaation kautta, laukaisten proarytmisen uudelleenmuokkauksen (J Physiol 2026). Haimassa: CaMKII:n hyperfosforylaatio RyR2:sta tuottaa esidiabeteksen tunnusmerkit — hyperinsulinemia, glukoosi-intoleranssi, heikentynyt insuliinineritys (PMC3596297).",
    sCamkiiBody3: "CaMKII on BERM:n kolmen avainennusteen molekulaarinen mekanismi: (1) Kumulatiivinen: se 'muistaa' aiemman Ca²⁺-kuorman. (2) Kiihtyvä: se laskee kynnystä seuraavalle aktivaatiolle. (3) Monijärjestelmäinen: sama molekyyli tuottaa sydän-, metabolisen, neurologisen ja reproduktiivisen patologian kudoksesta riippuen.",

    sHormesisEvidence: "Hormeettinen annos-vaste on dokumentoitu kokeellisesti. ELF-EMF:n annos-vaste noudattaa hormeettista mallia: pienet annokset ovat hyödyllisiä ja stimuloivia, suuremmat annokset tuottavat haittavaikutuksia (Applied Sciences 2026 katsaus). ELF-EMF lisäsi mitokondrioiden elektroninsiirtoketjun aktiivisuuksia ja lievitti hiirten masennuskäyttäytymistä hormeettisten vaikutusten kautta (PMC11508854). Tämä vahvistaa annos-vastekayran, jonka aktivaatiomalli vaatii: sama sähkömagneettinen ärsyke, joka vahingoittaa korkean EMF:n alaista kaupunkiväestöä, stimuloi matalan EMF:n alaista paimentolaisväestöä. Mekanismi on sama (Ca²⁺/VGCC). Lopputulos eroaa, koska annos-vaste on epämonotoninen.",

    sTimothyTitle: "Konseptitodistus: Timothyn oireyhtymä",
    sTimothyBody1: "Timothyn oireyhtymä on yksittäinen CACNA1C:n gain-of-function-mutaatio (G406R), joka vähentää jänniteriippuvaista kanavan inaktivaatiota ja aiheuttaa solusisäisen Ca²⁺-ylikuorman. Yksi mutaatio, yksi mekanismi.",
    sTimothyBody2: "Tuotetut patologiat: letaalit arytmiat, synnynnäinen sydänsairaus, immuunipuutos, ajoittainen hypoglykemia, kognitiiviset poikkeavuudet, autismi, kehitysviive, ADHD, epilepsia, kouristukset, hypotonia (EJHG-konsensus, heinäkuu 2026).",
    sTimothyBody3: "Jokainen järjestelmä, johon BERM ennustaa EMF:n vaikuttavan kroonisen Ca²⁺-ylikuorman kautta, Timothyn oireyhtymä vaikuttaa geneettisen Ca²⁺-ylikuorman kautta: sydän, immuuni, metabolinen, neurologinen, kehityksellinen. BERM ennustaa heikomman, kroonisen, väestötason version samasta mekanismista.",
    navCivMain: "Sivilisaatio",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
  },
  ja: {
    title: "パトポリテイア",
    subtitle: "巨視的歴史的次元：電磁環境はいかに文明パターンを形成するか",
    heroLead: "文明は抽象的な文化的実体ではない。生物学的有機体の集団である。その活力——拡張、創造性、信頼、生殖、制度維持の能力——は測定可能な基盤を持つ：構成員たるヒトのホルモンおよび神経化学プロファイルである。",
    heroTrail: "このページはBERMモデルの文明的次元を辿る：興亡を支配する生物学的法則から、BioCapの定量的枠組みを経て、そこから導かれる予測と展望まで。",

    sHistLawTitle: "文明の生物学的法則",
    sHistLawLead: "記録された歴史を通じて、文明は驚くほど一貫したパターンを辿ってきた：興隆、繁栄、衰退。11人の独立した思想家——ヴィーコ（1725年）からターチン（2023年）まで——が互いの研究を知らずに同じ観察に到達した。BERMは欠けていたメカニズムを提案する：電磁環境が生物学的能力を調節し、それが文明のダイナミクスを駆動する。",
    sProphetsTitle: "預言者たちは正しかった——そして間違っていた",
    sProphetsLead: "3世紀にわたる11人の真摯な思想家が独立して同じ文明パターンを記録した。彼らは方法論、イデオロギー、対象範囲について意見が分かれた。しかし一つの観察に収束した：文明は直線的に進歩しない。それらはサイクルで興亡し、後期段階は出生率の低下、快楽主義の増大、集団意志の喪失、悲観主義に特徴づけられる。",
    sProphetsTable: [
      { thinker: "ジャンバッティスタ・ヴィーコ", year: "1725", observation: "3つの時代の反復サイクル（神々、英雄、人間）", bermExplanation: "BioCap振動が質的に異なる社会的段階を生み出す" },
      { thinker: "オスヴァルト・シュペングラー", year: "1918", observation: "寿命を持つ有機体としての文明", bermExplanation: "生物学的基盤は累積的EMF曝露によるライフサイクルを持つ" },
      { thinker: "アーノルド・トインビー", year: "1934", observation: "21文明における挑戦と応戦", bermExplanation: "生物学的能力が応答の質を決定する；消耗した集団は挑戦に失敗する" },
      { thinker: "ピティリム・ソローキン", year: "1937", observation: "感覚的-観念的文化振動", bermExplanation: "ドーパミン/セロトニンバランスの変化→感覚的段階＝低DA、高刺激追求" },
      { thinker: "ジョン・バゴット・グラブ", year: "1978", observation: "250年の帝国寿命、6段階", bermExplanation: "約250年≈スース周期（200年）＋生物学的慣性（約50年）" },
      { thinker: "ジョセフ・テインター", year: "1988", observation: "複雑性の収穫逓減", bermExplanation: "認知能力の低下（BDNF↓、コルチゾール↑）が複雑性管理能力を減少させる" },
      { thinker: "イブン・ハルドゥーン", year: "1377", observation: "アサビーヤ（集団連帯）が3-4世代で衰退", bermExplanation: "オキシトシン↓＋テストステロン↓＝内集団結束の低下——まさにアサビーヤの喪失" },
      { thinker: "ピーター・ターチン", year: "2003", observation: "長期波動内の世俗的サイクル（約80-100年）", bermExplanation: "グライスベルグ周期（88年）がスース周期のエンベロープ内でBioCapを変調" },
      { thinker: "ネーマ・パルヴィーニ", year: "2023", observation: "11人の思想家全員を統合；パターンは枠組みを超えて堅牢", bermExplanation: "独立した観察者の収束＝説明を必要とする実在現象の強力な証拠" },
    ],
    sSolarTitle: "電化の前と後",
    sSolarLead: "電化以前、生物学への唯一の重要な電磁的影響は太陽からのものだった。太陽活動は入れ子のサイクルで振動する：11年のシュワーベ周期、88年のグライスベルグ周期、約200年のスース/ド・フリース周期。大極小期には、生物学への電磁的負荷が減少し、生物学的回復が起こる。",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: [
      "S(τ) = 太陽周期の重ね合わせ [0,1]",
      "U(τ) = 都市化のEMF成分（緩慢、電気以前）",
      "E(τ) = 電化のEMF成分（急速、1880年以降）",
      "σ(τ) = 回復抑制係数 = min(E(τ)/E_max, 0.95)",
      "χ(λ) = 地磁気感受性係数（緯度依存）",
      "α = 生物学的回復係数",
    ],
    sSolarFormulaNote: "",
    sSolarPrePost: "電気以前（E=0）：BioCapが振動→周期的な文明ダイナミクス。電気以後（E≫S）：BioCapが単調減少→回復の窓なし。",
    sSolarRenaissance: "ヨーロッパの主要なルネサンスの10件中8件が大極小期中またはその直後に発生した：イタリア・ルネサンスはシュペーラー極小期に、科学革命はマウンダー極小期に、ドイツ・ロマン主義はダルトン極小期に。",
    sMigrationTitle: "移住勾配",
    sMigrationLead: "ゲルマン民族をローマに、アラブ人をビザンツに、モンゴル騎兵を宋代中国に駆り立てた同じ生物学的勾配が今日も働いている。サハラ以南のアフリカ——主要な人口の中で最も短い累積電磁曝露を持つ——が最も高い生物学的能力を持つ。",
    sMigrationNote: "これは生物学的勾配（環境であり、遺伝ではない）。移民の出生率は1〜2世代でホスト国のレベルに収束する——メカニズムが環境的であり遺伝的でないことを証明している。",
    sLastBarbarianTitle: "「最後の蛮族」の窓",
    sLastBarbarianText: "BERMはアフリカのBioCapがモバイル普及（〜2010年）とともに低下し始め、〜2070〜2080年にヨーロッパのレベルに収束すると予測する。2020〜2060年の窓は、地球上のどこかに実質的に高い生物学的能力を持つ人口が存在する最後の期間かもしれない。その後：生物学的予備なしのグローバルな下方収束。",
    sThreeLawsTitle: "三つの歴史的法則",
    sThreeLaws: [
      { id: "L1", title: "文明の誕生には低χ帯（25-35°N）が必要", desc: "生物学的安定性→長期的発展。確認済み：p = 0.01（誕生地域対拡大）。" },
      { id: "L2", title: "創造的ルネサンスは高χ緯度（45-60°N）の大極小期に集中する", desc: "最大回復変調→最大創造資本。確認済み：ヨーロッパの10件中8件のルネサンス。" },
      { id: "L3", title: "帝国の興隆は太陽活動が低い時期に始まる", desc: "生物学的回復→拡張のための能力。確認済み：興隆イベントのsolar = 0.41 対 ピークイベント = 0.73。" },
    ],
    thThinker: "思想家", thYear: "年", thObservation: "観察", thBerm: "BERM説明",
    biocapNormTitle: "BioCap減衰 — 正規化寿命", biocapTimeTitle: "BioCap軌跡 — 歴史的タイムライン", biocapXNorm: "文明の寿命（%）", biocapXTime: "年", biocapY: "BioCap",
    sCulturalTitle: "文化エネルギーとは何か？",
    sCulturalLead: "", sCulturalBody: "", sCulturalFormula: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)", sCulturalFormulaDesc: "",
    sCulturalBioTitle: "文明能力の8つのバイオマーカー", sCulturalBioWeightNote: "", sCulturalBiomarkers: [] as never[], sCulturalRadarTitle: "バイオマーカープロファイル — 西洋人口2025",
    sCulturalTimeTitle: "BioCap軌道: 1900–2060", sCulturalTimeX: "年", sCulturalTimeY: "BioCap", sCulturalAmish: "アーミッシュ", sCulturalNow: "2025:", sCulturalForecast: "予測",
    sCulturalLinesTitle: "個別バイオマーカー軌道",
    sCulturalUnwinTitle: "アンウィンの証拠", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "アンウィンの4つの段階", sCulturalPhasesNote: "", sCulturalPhases: [] as never[],
    sCulturalSensTitle: "感度分析", sCulturalSensDesc: "", sCulturalSensItems: [] as never[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "相転移", sCulturalTransitions: [] as never[],
    sActivationTitle: "活性化サイクル：なぜ新しい勢力は古い勢力の衰退とともに台頭するのか",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "ホルメシス用量反応", sActivationChartZone1: "ゾーン1：ホルメシス刺激（遊牧民）", sActivationChartZone2: "ゾーン2：移行（農耕）", sActivationChartZone3: "ゾーン3：損傷（都市/電化）",
    sActivationChartX: "総EMF負荷", sActivationChartXNote: "", sActivationChartY: "BioCap", sActivationChartSun: "同じ太陽、反対の効果", sActivationEpistemic: "",
    sExpansionTitle: "三つの拡大類型",
    sExpansionCards: [
      { id: "α", title: "ホルメシス活性化", examples: "モンゴル1206、アラブ632、ヴァイキング793", icon: "sun", desc: "", trigger: "太陽極大＋遊牧民＝生物学的活性化" },
      { id: "β", title: "回復エネルギー", examples: "大航海時代1492、科学革命1687、ナポレオン時代1803", icon: "moon", desc: "", trigger: "大極小期＋回復＝創造的高揚" },
      { id: "γ", title: "浸食勾配", examples: "ゲルマン民族移動375–476、満州→明1644、アフリカ→ヨーロッパ2000–", icon: "gradient", desc: "", trigger: "数世紀の都市浸食＋無傷の辺境＝交替" },
    ],
    sRedirectTitle: "行動予測と社会的影響",
    sRedirectBody: "12の行動予測とその社会的影響は",
    sRedirectLink: "パトポリス",

    modelDerived: "",
    modelDerivedLink: "",
    sMcConnellTitle: "",
    sMcConnellBody: "",
    sCaEffectTitle: "",
    sCaEffectLead: "",
    sCaEffectRising: "",
    sCaEffectTurning: "",
    sCaEffectFalling: "",
    sCaEffectPrediction: "",
    sSubAssimTitle: "",
    sSubAssimBody1: "",
    sSubAssimBody2: "",
    sSubAssimBody3: "",
    sCamkiiTitle: "",
    sCamkiiBody1: "",
    sCamkiiBody2: "",
    sCamkiiBody3: "",
    sHormesisEvidence: "",
    sTimothyTitle: "",
    sTimothyBody1: "",
    sTimothyBody2: "",
    sTimothyBody3: "",
    navCivMain: "文明", navPatopolis: "パトポリス", navPatokratia: "パトクラティア",
  },
  fr: {
    title: "Patopoliteia",
    subtitle: "La dimension macro-historique : comment les environnements electromagnetiques faconnent les schemas civilisationnels",
    heroLead: "Les civilisations ne sont pas des entites culturelles abstraites. Ce sont des populations d'organismes biologiques. Leur vitalite — leur capacite d'expansion, de creativite, de confiance, de reproduction et de maintien institutionnel — possede un substrat mesurable : les profils hormonaux et neurochimiques de leurs humains constituants.",
    heroTrail: "Cette page retrace la dimension civilisationnelle du modele BERM : de la loi biologique qui gouverne l'ascension et le declin, a travers le cadre quantitatif du BioCap, jusqu'aux predictions et projections qui en decoulent.",
    sHistLawTitle: "La loi biologique des civilisations",
    sHistLawLead: "Tout au long de l'histoire, les civilisations ont suivi un schema remarquablement coherent : ascension, epanouissement, declin. Onze penseurs independants — de Vico (1725) a Turchin (2023) — sont arrives a la meme observation sans connaitre les travaux des autres. BERM propose le mecanisme manquant : l'environnement electromagnetique module la capacite biologique, qui a son tour pilote la dynamique civilisationnelle.",
    sProphetsTitle: "Les prophetes avaient raison — et tort",
    sProphetsLead: "Onze penseurs serieux sur trois siecles ont independamment documente le meme schema civilisationnel. Ils divergeaient sur la methode, l'ideologie et la portee. Pourtant ils ont converge vers une observation : les civilisations ne progressent pas lineairement. Elles montent et descendent en cycles, et les phases tardives sont marquees par la baisse de la natalite, l'hedonisme croissant, la perte de volonte collective et le pessimisme.",
    sProphetsTable: [
      { thinker: "Giambattista Vico", year: "1725", observation: "Cycle recurrent de trois ages (dieux, heros, hommes)", bermExplanation: "L'oscillation de BioCap produit des phases sociales qualitativement differentes" },
      { thinker: "Oswald Spengler", year: "1918", observation: "Les civilisations comme organismes avec des durees de vie", bermExplanation: "Le substrat biologique a un cycle de vie determine par l'exposition cumulative aux EMF" },
      { thinker: "Arnold Toynbee", year: "1934", observation: "Defi-et-reponse a travers 21 civilisations", bermExplanation: "La capacite biologique determine la qualite de la reponse ; les populations epuisees echouent face aux defis" },
      { thinker: "Pitirim Sorokin", year: "1937", observation: "Oscillation culturelle sensate-ideationnelle", bermExplanation: "Le changement d'equilibre dopamine/serotonine → phase sensate = faible DA, recherche de stimulation elevee" },
      { thinker: "John Bagot Glubb", year: "1978", observation: "Duree de vie imperiale de 250 ans, 6 etapes", bermExplanation: "~250 ans selon Glubb ; le jeu de 20 empires du modèle donne une médiane de 377 ans (moyenne 431), 65 % à ±1 écart-type de la période de Suess de 208 ans" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Rendements decroissants de la complexite", bermExplanation: "Le declin de la capacite cognitive (BDNF↓, cortisol↑) reduit la capacite a gerer la complexite" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "L'asabiya (solidarite de groupe) decline sur 3-4 generations", bermExplanation: "Ocytocine↓ + testosterone↓ = cohesion intra-groupe reduite — precisement la perte d'asabiya" },
      { thinker: "Peter Turchin", year: "2003", observation: "Cycles seculaires (~80-100 ans) au sein de vagues plus longues", bermExplanation: "Le cycle de Gleissberg (88 ans) module le BioCap dans l'enveloppe du cycle de Suess" },
      { thinker: "Neema Parvini", year: "2023", observation: "A synthetise les 11 penseurs ; le schema est robuste a travers les cadres", bermExplanation: "La convergence d'observateurs independants = preuve forte d'un phenomene reel necessitant une explication" },
    ],
    sSolarTitle: "Avant et apres l'electrification",
    sSolarLead: "Avant l'electrification, la seule influence electromagnetique significative sur la biologie venait du soleil. L'activite solaire oscille en cycles imbriques : le cycle de Schwabe de 11 ans, le cycle de Gleissberg de 88 ans et le cycle de Suess/de Vries d'environ 200 ans. Pendant les grands minima solaires, la charge electromagnetique sur la biologie diminue et la recuperation biologique se produit.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: ["S(τ) = superposition des cycles solaires [0,1]", "U(τ) = composante EMF de l'urbanisation (lente, pre-electrique)", "E(τ) = composante EMF de l'electrification (rapide, post-1880)", "σ(τ) = coefficient de suppression de la recuperation = min(E(τ)/E_max, 0.95)", "χ(λ) = coefficient de susceptibilite geomagnetique (dependant de la latitude)", "α = coefficient de recuperation biologique"],
    sSolarFormulaNote: "",
    sSolarPrePost: "Pre-electrique (E=0) : BioCap oscille → dynamique civilisationnelle cyclique. Post-electrique (E≫S) : BioCap decline de maniere monotone → pas de fenetre de recuperation.",
    sSolarRenaissance: "Huit des dix principales renaissances europeennes se sont produites pendant ou immediatement apres les grands minima solaires : la Renaissance italienne pendant le minimum de Sporer, la Revolution scientifique pendant le minimum de Maunder, le Romantisme allemand pendant le minimum de Dalton.",
    sMigrationTitle: "Le gradient migratoire",
    sMigrationLead: "Le meme gradient biologique qui a pousse les tribus germaniques vers Rome, les Arabes vers Byzance et la cavalerie mongole vers la Chine Song opere aujourd'hui. L'Afrique subsaharienne — avec l'exposition electromagnetique cumulative la plus courte de toute population majeure — a la capacite biologique la plus elevee.",
    sMigrationNote: "C'est un gradient biologique (environnement, pas genetique). La fecondite des immigrants converge vers les niveaux du pays d'accueil en 1 a 2 generations — prouvant que le mecanisme est environnemental, pas genetique.",
    sLastBarbarianTitle: "La fenetre du 'dernier barbare'",
    sLastBarbarianText: "BERM predit que le BioCap de l'Afrique commencera a decliner avec la penetration mobile (~2010) et convergera vers les niveaux europeens vers ~2070-2080. La fenetre 2020-2060 pourrait etre la derniere periode ou une population avec une capacite biologique substantiellement superieure existe quelque part sur Terre.",
    sThreeLawsTitle: "Trois lois historiques",
    sThreeLaws: [
      { id: "L1", title: "La naissance civilisationnelle requiert une zone a faible χ (25-35°N)", desc: "Stabilite biologique → developpement a long terme. Confirme : p = 0.01 (regions de naissance vs expansions)." },
      { id: "L2", title: "Les renaissances creatives se regroupent pendant les grands minima solaires aux latitudes a χ eleve (45-60°N)", desc: "Modulation de recuperation maximale → capital creatif maximal. Confirme : 8/10 renaissances europeennes." },
      { id: "L3", title: "Les ascensions imperiales commencent pendant les periodes de faible activite solaire", desc: "Recuperation biologique → capacite d'expansion. Confirme : evenements d'ascension solar = 0.41 vs evenements de pic = 0.73." },
    ],
    thThinker: "Penseur", thYear: "Annee", thObservation: "Observation", thBerm: "Explication BERM",
    biocapNormTitle: "Declin BioCap — duree de vie normalisee", biocapTimeTitle: "Trajectoires BioCap — chronologie historique", biocapXNorm: "Duree de vie civilisationnelle (%)", biocapXTime: "Annee", biocapY: "BioCap",
    sCulturalTitle: "Qu'est-ce que l'énergie culturelle ?",
    sCulturalLead: "", sCulturalBody: "", sCulturalFormula: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)", sCulturalFormulaDesc: "",
    sCulturalBioTitle: "Huit biomarqueurs de capacité civilisationnelle", sCulturalBioWeightNote: "", sCulturalBiomarkers: [] as never[], sCulturalRadarTitle: "Profil biomarqueur — Population occidentale 2025",
    sCulturalTimeTitle: "Trajectoire BioCap : 1900–2060", sCulturalTimeX: "Année", sCulturalTimeY: "BioCap", sCulturalAmish: "Amish", sCulturalNow: "2025 :", sCulturalForecast: "prévision",
    sCulturalLinesTitle: "Trajectoires individuelles des biomarqueurs",
    sCulturalUnwinTitle: "Les preuves d'Unwin", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "Les quatre phases d'Unwin", sCulturalPhasesNote: "", sCulturalPhases: [] as never[],
    sCulturalSensTitle: "Analyse de sensibilité", sCulturalSensDesc: "", sCulturalSensItems: [] as never[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "Transitions de phase", sCulturalTransitions: [] as never[],
    sActivationTitle: "Le cycle d'activation : pourquoi de nouvelles puissances emergent quand les anciennes declinent",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "Reponse dose-effet hormetique", sActivationChartZone1: "Zone 1 : Stimulation hormetique (nomade)", sActivationChartZone2: "Zone 2 : Transition (agraire)", sActivationChartZone3: "Zone 3 : Dommage (urbain/electrifie)",
    sActivationChartX: "Charge EMF totale", sActivationChartXNote: "", sActivationChartY: "BioCap", sActivationChartSun: "Meme soleil, effets opposes", sActivationEpistemic: "",
    sExpansionTitle: "Trois types d'expansion",
    sExpansionCards: [
      { id: "α", title: "Activation hormetique", examples: "Mongols 1206, Arabes 632, Vikings 793", icon: "sun", desc: "", trigger: "Maximum solaire + nomade = activation biologique" },
      { id: "β", title: "Energie de recuperation", examples: "Explorations 1492, Revolution scientifique 1687, ere napoleonienne 1803", icon: "moon", desc: "", trigger: "Grand minimum + recuperation = essor creatif" },
      { id: "γ", title: "Gradient d'erosion", examples: "Migrations germaniques 375–476, Mandchous → Ming 1644, Afrique → Europe 2000–", icon: "gradient", desc: "", trigger: "Siecles d'erosion urbaine + frontiere intacte = remplacement" },
    ],
    sRedirectTitle: "Predictions comportementales et implications societales",
    sRedirectBody: "Les douze predictions comportementales et leurs implications societales sont detaillees dans",
    sRedirectLink: "Patopolis",

    modelDerived: "",
    modelDerivedLink: "",
    sMcConnellTitle: "",
    sMcConnellBody: "",
    sCaEffectTitle: "",
    sCaEffectLead: "",
    sCaEffectRising: "",
    sCaEffectTurning: "",
    sCaEffectFalling: "",
    sCaEffectPrediction: "",
    sSubAssimTitle: "",
    sSubAssimBody1: "",
    sSubAssimBody2: "",
    sSubAssimBody3: "",
    sCamkiiTitle: "",
    sCamkiiBody1: "",
    sCamkiiBody2: "",
    sCamkiiBody3: "",
    sHormesisEvidence: "",
    sTimothyTitle: "",
    sTimothyBody1: "",
    sTimothyBody2: "",
    sTimothyBody3: "",
    navCivMain: "Civilisation", navPatopolis: "Patopolis", navPatokratia: "Patokratia",
  },
  ko: {
    title: "파토폴리테이아",
    subtitle: "거시적 역사적 차원: 전자기 환경이 문명 패턴을 어떻게 형성하는가",
    heroLead: "문명은 추상적 문화 실체가 아닙니다. 생물학적 유기체의 집단입니다. 그 활력 — 확장, 창의성, 신뢰, 생식, 제도 유지의 능력 — 은 측정 가능한 기반을 가집니다: 구성원인 인간의 호르몬 및 신경화학적 프로파일입니다.",
    heroTrail: "이 페이지는 BERM 모델의 문명적 차원을 추적합니다: 흥망을 지배하는 생물학적 법칙에서 BioCap의 정량적 프레임워크를 거쳐 그로부터 도출되는 예측과 전망까지.",
    sHistLawTitle: "문명의 생물학적 법칙",
    sHistLawLead: "기록된 역사를 통틀어 문명은 놀라울 정도로 일관된 패턴을 따라왔다: 흥기, 번영, 쇠퇴. 11명의 독립적 사상가들 — 비코(1725)에서 터친(2023)까지 — 이 서로의 연구를 모른 채 같은 관찰에 도달했다. BERM은 빠진 메커니즘을 제안한다: 전자기 환경이 생물학적 능력을 조절하고, 이것이 문명의 역학을 구동한다.",
    sProphetsTitle: "예언자들은 옳았다 — 그리고 틀렸다",
    sProphetsLead: "3세기에 걸친 11명의 진지한 사상가들이 독립적으로 같은 문명 패턴을 기록했다. 그들은 방법론, 이념, 범위에 대해 의견이 달랐다. 그러나 하나의 관찰에 수렴했다: 문명은 선형적으로 진보하지 않는다. 사이클로 흥망하며, 후기 단계는 출산율 감소, 쾌락주의 증가, 집단 의지의 상실, 비관주의로 특징지어진다.",
    sProphetsTable: [
      { thinker: "잠바티스타 비코", year: "1725", observation: "세 시대의 반복 주기 (신들, 영웅들, 인간들)", bermExplanation: "BioCap 진동이 질적으로 다른 사회적 단계를 생성한다" },
      { thinker: "오스발트 슈펭글러", year: "1918", observation: "수명을 가진 유기체로서의 문명", bermExplanation: "생물학적 기반은 누적 EMF 노출에 의한 생애주기를 가진다" },
      { thinker: "아놀드 토인비", year: "1934", observation: "21개 문명에 걸친 도전과 응전", bermExplanation: "생물학적 능력이 응답의 질을 결정한다; 소진된 인구는 도전에 실패한다" },
      { thinker: "피티림 소로킨", year: "1937", observation: "감각적-관념적 문화 진동", bermExplanation: "도파민/세로토닌 균형 변화 → 감각적 단계 = 낮은 DA, 높은 자극 추구" },
      { thinker: "존 바곳 글럽", year: "1978", observation: "250년 제국 수명, 6단계", bermExplanation: "~250년 ≈ 쉬스 주기(200년) + 생물학적 관성(~50년)" },
      { thinker: "조셉 테인터", year: "1988", observation: "복잡성의 수확체감", bermExplanation: "인지 능력 저하(BDNF↓, 코르티솔↑)가 복잡성 관리 능력을 감소시킨다" },
      { thinker: "이븐 할둔", year: "1377", observation: "아사비야(집단 연대)가 3-4세대에 걸쳐 쇠퇴", bermExplanation: "옥시토신↓ + 테스토스테론↓ = 내집단 결속 감소 — 정확히 아사비야의 상실" },
      { thinker: "피터 터친", year: "2003", observation: "더 긴 파동 내의 세속적 주기(~80-100년)", bermExplanation: "글라이스베르크 주기(88년)가 쉬스 주기 엔벨로프 내에서 BioCap을 변조" },
      { thinker: "니마 파르비니", year: "2023", observation: "11명의 사상가 모두를 종합; 패턴은 프레임워크를 초월하여 견고", bermExplanation: "독립적 관찰자들의 수렴 = 설명이 필요한 실재 현상의 강력한 증거" },
    ],
    sSolarTitle: "전기화 이전과 이후",
    sSolarLead: "전기화 이전, 생물학에 대한 유일한 중요한 전자기적 영향은 태양에서 왔다. 태양 활동은 중첩된 주기로 진동한다: 11년 슈바베 주기, 88년 글라이스베르크 주기, 약 200년 쉬스/드 브리스 주기. 대극소기 동안 생물학에 대한 전자기적 부담이 감소하고 생물학적 회복이 일어난다.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: ["S(τ) = 태양 주기 중첩 [0,1]", "U(τ) = 도시화의 EMF 성분 (느림, 전기 이전)", "E(τ) = 전기화의 EMF 성분 (빠름, 1880년 이후)", "σ(τ) = 회복 억제 계수 = min(E(τ)/E_max, 0.95)", "χ(λ) = 지자기 감수성 계수 (위도 의존)", "α = 생물학적 회복 계수"],
    sSolarFormulaNote: "",
    sSolarPrePost: "전기 이전(E=0): BioCap이 진동 → 주기적 문명 역학. 전기 이후(E≫S): BioCap이 단조 감소 → 회복 기간 없음.",
    sSolarRenaissance: "유럽 주요 르네상스 10건 중 8건이 대극소기 동안 또는 직후에 발생했다: 이탈리아 르네상스는 슈페러 극소기에, 과학 혁명은 마운더 극소기에, 독일 낭만주의는 달턴 극소기에.",
    sMigrationTitle: "이주 기울기",
    sMigrationLead: "게르만 부족을 로마로, 아랍인을 비잔틴으로, 몽골 기병을 송나라 중국으로 몰아낸 동일한 생물학적 기울기가 오늘날에도 작동한다. 사하라 이남 아프리카 — 주요 인구 중 가장 짧은 누적 전자기 노출 — 가 가장 높은 생물학적 능력을 가진다.",
    sMigrationNote: "이것은 생물학적 기울기(환경, 유전이 아님)이다. 이민자의 출산율은 1-2세대 내에 수용국 수준으로 수렴한다 — 메커니즘이 유전적이 아니라 환경적임을 입증한다.",
    sLastBarbarianTitle: "'마지막 야만인'의 창",
    sLastBarbarianText: "BERM은 아프리카의 BioCap이 모바일 보급(~2010)과 함께 하락하기 시작하여 ~2070-2080년에 유럽 수준으로 수렴할 것으로 예측한다. 2020-2060년의 창은 실질적으로 더 높은 생물학적 능력을 가진 인구가 지구 어딘가에 존재하는 마지막 기간일 수 있다.",
    sThreeLawsTitle: "세 가지 역사적 법칙",
    sThreeLaws: [
      { id: "L1", title: "문명의 탄생은 낮은 χ 지대(25-35°N)를 필요로 한다", desc: "생물학적 안정성 → 장기적 발전. 확인됨: p = 0.01 (탄생 지역 대 확장)." },
      { id: "L2", title: "창조적 르네상스는 높은 χ 위도(45-60°N)의 대극소기에 집중된다", desc: "최대 회복 변조 → 최대 창조적 자본. 확인됨: 유럽 르네상스 10건 중 8건." },
      { id: "L3", title: "제국의 흥기는 낮은 태양 활동 기간에 시작된다", desc: "생물학적 회복 → 확장 능력. 확인됨: 흥기 이벤트 solar = 0.41 대 피크 이벤트 = 0.73." },
    ],
    thThinker: "사상가", thYear: "연도", thObservation: "관찰", thBerm: "BERM 설명",
    biocapNormTitle: "BioCap 감쇠 — 정규화 수명", biocapTimeTitle: "BioCap 궤적 — 역사적 타임라인", biocapXNorm: "문명 수명 (%)", biocapXTime: "연도", biocapY: "BioCap",
    sCulturalTitle: "문화적 에너지란 무엇인가?",
    sCulturalLead: "", sCulturalBody: "", sCulturalFormula: "CulturalEnergy(t) = N(t) × BioCap(t) × η(t)", sCulturalFormulaDesc: "",
    sCulturalBioTitle: "문명 역량의 8가지 바이오마커", sCulturalBioWeightNote: "", sCulturalBiomarkers: [] as never[], sCulturalRadarTitle: "바이오마커 프로필 — 서구 인구 2025",
    sCulturalTimeTitle: "BioCap 궤적: 1900–2060", sCulturalTimeX: "연도", sCulturalTimeY: "BioCap", sCulturalAmish: "아미시", sCulturalNow: "2025:", sCulturalForecast: "예측",
    sCulturalLinesTitle: "개별 바이오마커 궤적",
    sCulturalUnwinTitle: "언윈의 증거", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "언윈의 4단계", sCulturalPhasesNote: "", sCulturalPhases: [] as never[],
    sCulturalSensTitle: "민감도 분석", sCulturalSensDesc: "", sCulturalSensItems: [] as never[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "상전이", sCulturalTransitions: [] as never[],
    sActivationTitle: "활성화 주기: 왜 새로운 세력은 구세력이 쇠퇴할 때 부상하는가",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "호르메시스 용량-반응", sActivationChartZone1: "구역 1: 호르메시스 자극 (유목민)", sActivationChartZone2: "구역 2: 전환 (농경)", sActivationChartZone3: "구역 3: 손상 (도시/전기화)",
    sActivationChartX: "총 EMF 부하", sActivationChartXNote: "", sActivationChartY: "BioCap", sActivationChartSun: "같은 태양, 반대 효과", sActivationEpistemic: "",
    sExpansionTitle: "세 가지 확장 유형",
    sExpansionCards: [
      { id: "α", title: "호르메시스 활성화", examples: "몽골 1206, 아랍 632, 바이킹 793", icon: "sun", desc: "", trigger: "태양 극대기 + 유목민 = 생물학적 활성화" },
      { id: "β", title: "회복 에너지", examples: "대항해시대 1492, 과학혁명 1687, 나폴레옹 시대 1803", icon: "moon", desc: "", trigger: "대극소기 + 회복 = 창조적 고양" },
      { id: "γ", title: "침식 기울기", examples: "게르만 민족 이동 375–476, 만주→명 1644, 아프리카→유럽 2000–", icon: "gradient", desc: "", trigger: "수세기의 도시 침식 + 온전한 변경 = 교체" },
    ],
    sRedirectTitle: "행동 예측과 사회적 영향",
    sRedirectBody: "12가지 행동 예측과 사회적 영향은 다음에 자세히 설명되어 있습니다:",
    sRedirectLink: "파토폴리스",

    modelDerived: "",
    modelDerivedLink: "",
    sMcConnellTitle: "",
    sMcConnellBody: "",
    sCaEffectTitle: "",
    sCaEffectLead: "",
    sCaEffectRising: "",
    sCaEffectTurning: "",
    sCaEffectFalling: "",
    sCaEffectPrediction: "",
    sSubAssimTitle: "",
    sSubAssimBody1: "",
    sSubAssimBody2: "",
    sSubAssimBody3: "",
    sCamkiiTitle: "",
    sCamkiiBody1: "",
    sCamkiiBody2: "",
    sCamkiiBody3: "",
    sHormesisEvidence: "",
    sTimothyTitle: "",
    sTimothyBody1: "",
    sTimothyBody2: "",
    sTimothyBody3: "",
    navCivMain: "문명", navPatopolis: "파토폴리스", navPatokratia: "파토크라티아",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: { title: "Patopoliteia — Civilizational Biology | BERM", description: "The macro-historical dimension: how electromagnetic environments shape civilizational patterns of rise, flourishing, and decline." },
    fi: { title: "Patopoliteia — Sivilisaation biologia | BERM", description: "Makrohistoriallinen ulottuvuus: miten sahkomagneettiset ymparistot muokkaavat sivilisaatioiden nousun, kukoistuksen ja rappion kaavoja." },
    ja: { title: "パトポリテイア — 文明の生物学 | BERM", description: "巨視的歴史的次元：電磁環境はいかに文明の興隆、繁栄、衰退のパターンを形成するか。" },
    fr: { title: "Patopoliteia — Biologie civilisationnelle | BERM", description: "La dimension macro-historique : comment les environnements electromagnetiques faconnent les schemas d'ascension, d'epanouissement et de declin des civilisations." },
    ko: { title: "파토폴리테이아 — 문명의 생물학 | BERM", description: "거시적 역사적 차원: 전자기 환경이 문명의 흥기, 번영, 쇠퇴 패턴을 어떻게 형성하는가." },
  };
  const m = meta[locale] || meta.en;
  return { title: m.title, description: m.description, openGraph: { title: m.title, description: m.description } };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PatopoliteiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{d.title}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">{d.subtitle}</p>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-4">{d.heroLead}</p>
        <p className="text-sm leading-relaxed text-muted-foreground/70 max-w-3xl mx-auto">{d.heroTrail}</p>
      </header>

      {/* The Biological Law of Civilizations */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-2">{d.sHistLawTitle}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-6 max-w-4xl">
          <InlineReferenceText text={d.sHistLawLead} locale={locale} />
        </p>

        {/* BioCap Formula */}
        <div className="bg-card-bg border border-card-border rounded-lg p-4 font-mono text-sm overflow-x-auto max-w-4xl mb-6">
          {d.sSolarFormula}
        </div>

        {/* BioCap Visualizations */}
        <div className="grid grid-cols-1 gap-6 mb-8 max-w-4xl">
          <div className="rounded-xl border border-card-border p-4 bg-card-bg">
            <div className="chart-scroll">
              <BiocapCivilizationChart chartTitle={d.biocapNormTitle} xLabel={d.biocapXNorm} yLabel={d.biocapY} />
            </div>
          </div>
          <div className="rounded-xl border border-card-border p-4 bg-card-bg">
            <div className="chart-scroll">
              <BiocapTimelineChart chartTitle={d.biocapTimeTitle} xLabel={d.biocapXTime} yLabel={d.biocapY} />
            </div>
          </div>
        </div>


        {/* McConnell PNAS 2025 */}
        {d.sMcConnellBody && (
        <div className="rounded-xl border border-card-border bg-card-bg p-4 mb-8 max-w-4xl">
          <h4 className="text-sm font-semibold mb-2">{d.sMcConnellTitle}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <InlineReferenceText text={d.sMcConnellBody} locale={locale} />
          </p>
        </div>
        )}

        <p className="text-xs text-muted-foreground mt-2 italic max-w-4xl">
          {d.modelDerived}{" "}
          <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
        </p>

        {/* Prophets Were Right */}
        <h3 className="text-xl font-bold mb-2">{d.sProphetsTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-6 max-w-4xl">
          {d.sProphetsLead}
        </p>

        {/* Prophets Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold">{d.thThinker}</th>
                <th className="text-left py-2 px-3 font-semibold">{d.thYear}</th>
                <th className="text-left py-2 px-3 font-semibold">{d.thObservation}</th>
                <th className="text-left py-2 px-3 font-semibold">{d.thBerm}</th>
              </tr>
            </thead>
            <tbody>
              {d.sProphetsTable.map((row: { thinker: string; year: string; observation: string; bermExplanation: string }, i: number) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 px-3 text-xs font-medium whitespace-nowrap">{row.thinker}</td>
                  <td className="py-2 px-3 text-xs font-mono whitespace-nowrap">{row.year}</td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">{row.observation}</td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">{row.bermExplanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Solar Cycles */}
        <h3 className="text-xl font-bold mb-2">{d.sSolarTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-4xl">{d.sSolarLead}</p>
        <div className="bg-card-bg border border-card-border rounded-lg p-4 mb-4 max-w-4xl">
          <p className="font-mono text-sm mb-3 overflow-x-auto">{d.sSolarFormula}</p>
          <ul className="space-y-1">
            {d.sSolarFormulaTerms.map((term: string, i: number) => (
              <li key={i} className="text-xs text-muted-foreground font-mono">{term}</li>
            ))}
          </ul>
        </div>
        {d.sSolarFormulaNote && (
        <div className="mb-4 rounded-lg border border-muted bg-muted/30 p-4 max-w-4xl">
          <p className="text-xs text-muted-foreground leading-relaxed">{d.sSolarFormulaNote}</p>
        </div>
        )}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4 max-w-4xl">
          <p className="text-sm font-medium">{d.sSolarPrePost}</p>
        </div>
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 mb-8 max-w-4xl">
          <p className="text-sm text-muted-foreground leading-relaxed">{d.sSolarRenaissance}</p>
        </div>


        {/* The Ca²⁺ Effect */}
        {d.sCaEffectLead && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">{d.sCaEffectTitle}</h3>
          <p className="text-sm font-medium text-muted-foreground mb-4 max-w-4xl">{d.sCaEffectLead}</p>
          <div className="space-y-3 max-w-4xl">
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{d.sCaEffectRising}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <InlineReferenceText text={d.sCaEffectTurning} locale={locale} />
              </p>
            </div>
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{d.sCaEffectFalling}</p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">{d.sCaEffectPrediction}</p>
            </div>
          </div>
        </div>
        )}

        {/* Three Historical Laws */}
        <h3 className="text-xl font-bold mb-4">{d.sThreeLawsTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {d.sThreeLaws.map((law: { id: string; title: string; desc: string }) => (
            <div key={law.id} className="rounded-xl border border-card-border p-5">
              <span className="flex-shrink-0 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono px-2 py-0.5 inline-block mb-2">
                {law.id}
              </span>
              <p className="font-semibold text-sm mb-2">{law.title}</p>
              <p className="text-xs text-muted-foreground">{law.desc}</p>
            </div>
          ))}
        </div>

        {/* Migration Gradient */}
        <h3 className="text-xl font-bold mb-2">{d.sMigrationTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-4xl">{d.sMigrationLead}</p>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-8 max-w-4xl flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground-muted leading-relaxed">{d.sMigrationNote}</p>
        </div>
        <div className="rounded-xl border border-card-border bg-card-bg p-4 mb-8">
          <MigrationGradientMap title={d.sMigrationTitle} />
        </div>


        {/* Sub-Assimilation */}
        {d.sSubAssimBody1 && (
        <div className="mb-8 max-w-4xl">
          <h3 className="text-lg font-semibold mb-3">{d.sSubAssimTitle}</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>{d.sSubAssimBody1}</p>
            <p>{d.sSubAssimBody2}</p>
            <p className="font-medium">{d.sSubAssimBody3}</p>
          </div>
        </div>
        )}

        {/* Last Barbarian Window */}
        <h3 className="text-xl font-bold mb-2">{d.sLastBarbarianTitle}</h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p>{d.sLastBarbarianText}</p>
        </div>
      </section>

      {/* Cultural Energy */}
      {d.sCulturalLead && (
      <section id="cultural-energy" className="mb-16 border-t editorial-rule pt-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">{d.sCulturalTitle}</h2>
        </div>
        <div className="prose prose-sm max-w-none mb-8">
          <p className="text-foreground-muted leading-relaxed mb-4">{d.sCulturalLead}</p>
          <p className="text-foreground-muted leading-relaxed mb-4">{d.sCulturalBody}</p>
          <div className="rounded-lg border border-card-border bg-card-bg p-4 font-mono text-center">
            <p className="text-sm font-semibold mb-1">{d.sCulturalFormula}</p>
            <p className="text-xs text-foreground-muted">{d.sCulturalFormulaDesc}</p>
          </div>
        </div>

        {/* Unwin's Evidence */}
        {d.sCulturalUnwinBody1 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{d.sCulturalUnwinTitle}</h3>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.sCulturalUnwinBody1}</p>
            <p>{d.sCulturalUnwinBody2}</p>
            <p>{d.sCulturalUnwinBody3}</p>
          </div>
        </div>
        )}

        {/* Biomarker Table + Radar */}
        {d.sCulturalBiomarkers?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{d.sCulturalBioTitle}</h3>
          {d.sCulturalBioWeightNote && (
          <div className="mb-4 rounded-lg border border-muted bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">{d.sCulturalBioWeightNote}</p>
          </div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-2 font-semibold">Symbol</th>
                    <th className="text-left py-2 px-2 font-semibold">Biomarker</th>
                    <th className="text-right py-2 px-2 font-semibold">Weight</th>
                    <th className="text-left py-2 px-2 font-semibold">Trend</th>
                    <th className="text-left py-2 px-2 font-semibold hidden lg:table-cell">Unwin</th>
                  </tr>
                </thead>
                <tbody>
                  {d.sCulturalBiomarkers.map((b) => (
                    <tr key={b.symbol} className="border-b border-card-border/50">
                      <td className="py-1.5 px-2 font-mono font-semibold">{b.symbol}</td>
                      <td className="py-1.5 px-2">{b.name}</td>
                      <td className="py-1.5 px-2 text-right font-mono">{b.weight > 0 ? "+" : ""}{b.weight.toFixed(2)}</td>
                      <td className="py-1.5 px-2">{b.trend}</td>
                      <td className="py-1.5 px-2 text-foreground-muted hidden lg:table-cell">{b.unwin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <BiomarkerRadar
              title={d.sCulturalRadarTitle}
              biomarkers={[
                { symbol: "T", label: "Testosterone", value: 0.55, weight: 0.20, trend: "↓" },
                { symbol: "OXT", label: "Oxytocin", value: 0.616, weight: 0.20, trend: "↓" },
                { symbol: "DA", label: "Dopamine", value: 0.671, weight: 0.15, trend: "↓" },
                { symbol: "MEL", label: "Melatonin", value: 0.577, weight: 0.15, trend: "↓↓" },
                { symbol: "BDNF", label: "BDNF", value: 0.742, weight: 0.10, trend: "↓" },
                { symbol: "CORT", label: "Cortisol (raw; enters as 1 − CORT)", value: 0.538, weight: -0.10, trend: "↑" },
                { symbol: "D", label: "Vitamin D", value: 0.65, weight: 0.05, trend: "↓" },
                { symbol: "B2", label: "B2/FAD", value: 0.806, weight: 0.05, trend: "↓" },
              ]}
            />
          </div>
        </div>
        )}


        <p className="text-xs text-muted-foreground mt-2 italic max-w-4xl">
          {d.modelDerived}{" "}
          <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
        </p>
        {/* CaMKII Convergence */}
        {d.sCamkiiBody1 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-3">{d.sCamkiiTitle}</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-4xl">
            <p>{d.sCamkiiBody1}</p>
            <p>
              <InlineReferenceText text={d.sCamkiiBody2} locale={locale} />
            </p>
            <p className="font-medium">{d.sCamkiiBody3}</p>
          </div>
        </div>
        )}
        {/* BioCap Trajectory */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{d.sCulturalTimeTitle}</h3>
          <BiocapTrajectory chartTitle={d.sCulturalTimeTitle} xLabel={d.sCulturalTimeX} yLabel={d.sCulturalTimeY} amishLabel={d.sCulturalAmish} nowLabel={d.sCulturalNow} forecastLabel={d.sCulturalForecast} />
        </div>

        {/* Individual Biomarker Lines */}
        <div className="mb-10">
          <BiomarkerTrajectoryLines chartTitle={d.sCulturalLinesTitle} xLabel={d.sCulturalTimeX} yLabel={d.sCulturalTimeY} markers={[{ symbol: "T", label: "T" }, { symbol: "OXT", label: "OXT" }, { symbol: "DA", label: "DA" }, { symbol: "MEL", label: "MEL" }, { symbol: "BDNF", label: "BDNF" }, { symbol: "CORT", label: "CORT" }, { symbol: "D", label: "D" }]} />
        </div>

        {/* Unwin's Four Phases */}
        {d.sCulturalPhases?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{d.sCulturalPhasesTitle}</h3>
          {d.sCulturalPhasesNote && (
          <div className="mb-4 rounded-lg border border-muted bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">{d.sCulturalPhasesNote}</p>
          </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {d.sCulturalPhases.map((p) => {
              const borderColor = p.color === "green" ? "border-green-500/40" : p.color === "blue" ? "border-blue-500/40" : p.color === "amber" ? "border-amber-500/40" : "border-red-500/40";
              return (
                <div key={p.name} className={`rounded-lg border ${borderColor} bg-card-bg p-4`}>
                  <h4 className="text-sm font-bold mb-1">{p.name}</h4>
                  <p className="text-xs font-mono text-foreground-muted mb-2">BioCap {p.biocap}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Phase Transitions */}
        {d.sCulturalTransitions?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{d.sCulturalTransTitle}</h3>
          <div className="space-y-3">
            {d.sCulturalTransitions.map((t) => (
              <div key={t.year} className="rounded-lg border border-card-border bg-card-bg p-4 flex flex-col sm:flex-row gap-3">
                <div className="shrink-0 font-mono font-bold text-sm w-16">{t.year}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{t.from} → {t.to}</p>
                  <p className="text-xs text-foreground-muted mt-1">{t.trigger}</p>
                  <p className="text-xs text-foreground-muted italic mt-1">{t.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        <p className="text-xs text-muted-foreground mt-2 italic max-w-4xl">
          {d.modelDerived}{" "}
          <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
        </p>

        {/* Sensitivity Analysis */}
        {d.sCulturalSensItems?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{d.sCulturalSensTitle}</h3>
          <p className="text-sm text-foreground-muted mb-4">{d.sCulturalSensDesc}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {d.sCulturalSensItems.map((s) => (
              <div key={s.marker} className="rounded-lg border border-card-border bg-card-bg p-3">
                <p className="text-sm font-mono font-bold">{s.marker}</p>
                <p className="text-lg font-bold text-blue-500">{s.recovery}</p>
                <p className="text-xs text-foreground-muted">{s.desc}</p>
              </div>
            ))}
          </div>
          {d.sCulturalSensConclusion && (
            <p className="text-sm text-foreground-muted leading-relaxed">{d.sCulturalSensConclusion}</p>
          )}
        </div>
        )}

        <p className="text-xs text-muted-foreground mt-2 italic max-w-4xl">
          {d.modelDerived}{" "}
          <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
        </p>
      </section>
      )}

      {/* Activation Cycle */}
      <section id="activation-cycle" className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.sActivationTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p>{d.sActivationLead}</p>
          <p>{d.sActivationBody1}</p>
          <p>{d.sActivationBody2}</p>
          <p>{d.sActivationBody3}</p>
          <p>{d.sActivationBody4}</p>
        </div>

        {/* Hormetic Dose-Response Chart */}
        <div className="rounded-xl border border-card-border bg-card-bg p-6 my-8 max-w-4xl">
          <h3 className="text-sm font-semibold mb-4">{d.sActivationChartTitle}</h3>
          <svg viewBox="0 0 600 300" className="w-full max-w-2xl mx-auto" aria-label={d.sActivationChartTitle}>
            <defs>
              <linearGradient id="hormZone1" x1="0" y1="0" x2="0.35" y2="0">
                <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="rgb(34,197,94)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="hormZone3" x1="0.55" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgb(239,68,68)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="rgb(239,68,68)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect x="60" y="30" width="180" height="230" fill="url(#hormZone1)" />
            <rect x="340" y="30" width="230" height="230" fill="url(#hormZone3)" />
            <line x1="60" y1="260" x2="570" y2="260" stroke="currentColor" strokeOpacity="0.3" />
            <line x1="60" y1="30" x2="60" y2="260" stroke="currentColor" strokeOpacity="0.3" />
            <path d="M 60,220 Q 120,180 180,100 Q 210,60 240,80 Q 300,130 380,180 Q 460,230 570,250" fill="none" stroke="rgb(34,197,94)" strokeWidth="2.5" />
            <circle cx="210" cy="65" r="4" fill="rgb(34,197,94)" />
            <text x="140" y="280" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5">{d.sActivationChartZone1}</text>
            <text x="290" y="280" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5">{d.sActivationChartZone2}</text>
            <text x="460" y="280" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5">{d.sActivationChartZone3}</text>
            <text x="315" y="298" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.6">{d.sActivationChartX}</text>
            <text x="15" y="150" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.6" transform="rotate(-90, 15, 150)">{d.sActivationChartY}</text>
            <text x="315" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="rgb(234,179,8)" fillOpacity="0.8">☀ {d.sActivationChartSun}</text>
            <line x1="140" y1="130" x2="140" y2="90" stroke="rgb(34,197,94)" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
            <line x1="460" y1="200" x2="460" y2="240" stroke="rgb(239,68,68)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <defs>
              <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="rgb(34,197,94)" /></marker>
              <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="rgb(239,68,68)" /></marker>
            </defs>
          </svg>
        </div>


        {d.sHormesisEvidence && (
        <div className="rounded-xl border border-card-border bg-card-bg p-4 my-6 max-w-4xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <InlineReferenceText text={d.sHormesisEvidence} locale={locale} />
          </p>
        </div>
        )}
        {d.sActivationChartXNote && (
        <div className="mt-2 max-w-4xl">
          <p className="text-xs text-muted-foreground leading-relaxed">{d.sActivationChartXNote}</p>
        </div>
        )}

        {d.sActivationEpistemic && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 max-w-4xl flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground-muted leading-relaxed">{d.sActivationEpistemic}</p>
        </div>
        )}
      </section>

      {/* Three Types of Expansion */}
      <section id="expansion-types" className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-6">{d.sExpansionTitle}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {d.sExpansionCards.map((card: { id: string; title: string; examples: string; icon: string; desc: string; trigger: string }) => (
            <div key={card.id} className="rounded-xl border border-card-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">
                  {card.icon === "sun" ? "☀️" : card.icon === "moon" ? "🌙" : "📐"}
                </span>
                <span className="rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono px-2 py-0.5">
                  {card.id}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{card.desc}</p>
              <p className="text-xs text-muted-foreground italic mb-2">{card.examples}</p>
              <div className="rounded bg-card-bg border border-card-border px-3 py-2">
                <p className="text-xs font-medium">{card.trigger}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Timothy Syndrome */}
      {d.sTimothyBody1 && (
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.sTimothyTitle}</h2>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6 max-w-4xl">
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>{d.sTimothyBody1}</p>
            <p>{d.sTimothyBody2}</p>
            <p className="font-medium">{d.sTimothyBody3}</p>
          </div>
        </div>
      </section>
      )}

      {/* Redirect to Patopolis for predictions & societal implications */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.sRedirectTitle}</h2>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 max-w-4xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {d.sRedirectBody}{" "}
            <Link
              href={`/${locale}/civilization/patopolis#twelve-predictions`}
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
            >
              {d.sRedirectLink}
            </Link>.
          </p>
        </div>
      </section>



      {/* Navigation links */}
      <section className="flex flex-wrap gap-4 justify-center mb-12">
        <Link
          href={`/${locale}/civilization`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.navCivMain} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/civilization/patopolis`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.navPatopolis} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/civilization/patokratia`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.navPatokratia} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
      </div>
    </main>
  );
}
