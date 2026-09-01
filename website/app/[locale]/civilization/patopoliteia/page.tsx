import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Users, Brain, Activity, Building2 } from "lucide-react";
import { pickCopy, locales } from "@/lib/i18n";
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
    sHistLawLead: "Throughout recorded history, civilizations have followed a remarkably consistent pattern: rise, flourish, decline. Eleven independent thinkers — from Vico (1725) to Turchin (2023) — converged on the same observation without knowing each other's work. BERM proposes the missing mechanism: the electromagnetic environment modulates biological capacity, which in turn drives civilizational dynamics.",

    sProphetsTitle: "The Prophets Were Right — And Wrong",
    sProphetsLead: "Eleven serious thinkers across three centuries independently documented the same civilizational pattern. They disagreed about method, ideology, and scope. Yet they converged on one observation: civilizations do not progress linearly. They rise and fall in cycles, and the late stages are marked by declining birth rates, increasing hedonism, loss of collective will, and pessimism.",
    sProphetsTable: [
      { thinker: "Giambattista Vico", year: "1725", observation: "Recurring cycle of three ages (gods, heroes, men)", bermExplanation: "BioCap oscillation produces qualitatively different social phases" },
      { thinker: "Oswald Spengler", year: "1918", observation: "Civilizations as organisms with lifespans", bermExplanation: "Biological substrate has a lifecycle driven by cumulative EMF exposure" },
      { thinker: "Arnold Toynbee", year: "1934", observation: "Challenge-and-response across 21 civilizations", bermExplanation: "Biological capacity determines response quality; depleted populations fail challenges" },
      { thinker: "Pitirim Sorokin", year: "1937", observation: "Sensate-Ideational cultural oscillation", bermExplanation: "Dopamine/serotonin balance shifts → sensate phase = low-DA, high-stimulation seeking" },
      { thinker: "John Bagot Glubb", year: "1978", observation: "250-year empire lifespan, 6 stages", bermExplanation: "~250 years ≈ Suess cycle (200 yr) + biological inertia (~50 yr)" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Diminishing returns on complexity", bermExplanation: "Cognitive capacity decline (BDNF↓, cortisol↑) reduces ability to manage complexity" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "Asabiya (group solidarity) declines over 3-4 generations", bermExplanation: "Oxytocin↓ + testosterone↓ = reduced in-group cohesion — precisely asabiya loss" },
      { thinker: "Peter Turchin", year: "2003", observation: "Secular cycles (~80-100 yr) within longer waves", bermExplanation: "Gleissberg cycle (88 yr) modulates BioCap within Suess cycle envelope" },
      { thinker: "Neema Parvini", year: "2023", observation: "Synthesized all 11 thinkers; pattern is robust across frameworks", bermExplanation: "Convergence of independent observers = strong evidence for real phenomenon requiring explanation" },
    ],

    sSolarTitle: "Before and After Electrification",
    sSolarLead: "Before electrification, the only significant electromagnetic influence on biology came from the sun. Solar activity oscillates in nested cycles: the 11-year Schwabe cycle, the 88-year Gleissberg cycle, and the ~200-year Suess/de Vries cycle. During grand solar minima, the electromagnetic burden on biology decreases and biological recovery occurs.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: [
      "S(τ) = solar cycle superposition [0,1]",
      "U(τ) = urbanization EMF component (slow, pre-electric)",
      "E(τ) = electrification EMF component (rapid, post-1880)",
      "σ(τ) = recovery suppression coefficient = min(E(τ)/E_max, 0.95)",
      "χ(λ) = geomagnetic susceptibility coefficient (latitude-dependent)",
      "α = biological recovery coefficient",
    ],
    sSolarPrePost: "Pre-electric (E=0): BioCap oscillates → cyclical civilizational dynamics. Post-electric (E≫S): BioCap declines monotonically → no recovery window.",
    sSolarRenaissance: "Eight of ten major European renaissances occurred during or immediately following grand solar minima: the Italian Renaissance during the Spörer Minimum, the Scientific Revolution during the Maunder Minimum, German Romanticism during the Dalton Minimum.",

    sMigrationTitle: "The Migration Gradient",
    sMigrationLead: "The same biological gradient that drove the Germanic tribes into Rome, the Arabs into Byzantium, and the Mongols into Song China operates today. Sub-Saharan Africa — with the shortest cumulative electromagnetic exposure of any major population — has the highest biological capacity. The migration flows from Africa and the Middle East into Europe follow the gradient of biological contrast.",
    sMigrationNote: "This is a biological gradient (environment, not genetics). Immigrant fertility converges to host-country levels within 1-2 generations — proving the mechanism is environmental, not genetic.",

    sLastBarbarianTitle: "The 'Last Barbarian' Window",
    sLastBarbarianText: "BERM predicts Africa's BioCap will begin declining with mobile penetration (~2010) and converge toward European levels by ~2070-2080. The window 2020-2060 may be the last period in which a population with substantially higher biological capacity exists anywhere on Earth. After that: global downward convergence with no biological reserve.",

    sThreeLawsTitle: "Three Historical Laws",
    sThreeLaws: [
      { id: "L1", title: "Civilizational birth requires a low-χ zone (25-35°N)", desc: "Biological stability → long-term development. Confirmed: p = 0.01 (birth regions vs expansions)." },
      { id: "L2", title: "Creative renaissances cluster during grand solar minima at high-χ latitudes (45-60°N)", desc: "Maximum recovery modulation → maximum creative capital. Confirmed: 8/10 European renaissances." },
      { id: "L3", title: "Empire rises begin during low solar activity", desc: "Biological recovery → capacity for expansion. Confirmed: rise events solar = 0.41 vs peak events = 0.73." },
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
    sCulturalAmish: "Amish (≈ 0.98)",
    sCulturalNow: "2025:",
    sCulturalForecast: "forecast",
    sCulturalLinesTitle: "Individual Biomarker Trajectories",
    sCulturalUnwinTitle: "Unwin's Evidence",
    sCulturalUnwinBody1: "In 1934, Oxford anthropologist J.D. Unwin published a study of 86 societies spanning 5,000 years. His finding was absolute: in every society without exception, the level of cultural achievement correlated directly with the degree of sexual restraint the society imposed. Societies with strict regulation displayed what Unwin called 'expansive energy.' Societies with permissive norms displayed what he called 'zoistic' energy — subsistence without expansion.",
    sCulturalUnwinBody2: "Unwin attributed this to Freudian sublimation: sexual energy not discharged sexually was redirected into cultural production. This explanation has not aged well. But his data has. No one has replicated the study, but no one has falsified it either. 86 societies, zero exceptions.",
    sCulturalUnwinBody3: "BERM proposes a different mechanism for the same observation. Sexual restraint does not produce cultural energy. Rather, both high sexual drive (requiring restraint) and high cultural energy are symptoms of the same biological state: high testosterone, high oxytocin, high dopamine sensitivity, normal melatonin, low cortisol. A population in this state has both strong libido (necessitating social regulation) and strong civilizational capacity. When biological capacity declines — through cumulative electromagnetic exposure, through urbanization — both sexual drive and cultural energy decline together. The correlation Unwin observed was real. The causation was a common upstream factor he could not have identified in 1934.",
    sCulturalPhasesTitle: "Unwin's Four Phases",
    sCulturalPhases: [
      { name: "Zoistic", biocap: "< 0.55", desc: "Subsistence without expansion. No large-scale construction, no abstract thought tradition, no territorial ambition.", color: "red" },
      { name: "Manistic", biocap: "0.55–0.75", desc: "Declining energy. Populism, institutional decay, polarization, pronatalist policy failure. Western civilization 2015–present.", color: "amber" },
      { name: "Deistic", biocap: "0.75–0.90", desc: "Transition phase. Cultural production continues but with declining novelty. Institutional trust eroding. Western civilization 2000–2015.", color: "blue" },
      { name: "Rationalistic", biocap: "> 0.90", desc: "Full expansive energy. Conquest, construction, intellectual achievement, scientific revolution. Western civilization pre-2000.", color: "green" },
    ],
    sCulturalSensTitle: "Sensitivity Analysis",
    sCulturalSensDesc: "If a single biomarker were restored to its 1980 level:",
    sCulturalSensItems: [
      { marker: "T → 1.0", recovery: "+16.7%", desc: "Largest single intervention" },
      { marker: "MEL → 1.0", recovery: "+12.2%", desc: "Circadian restoration" },
      { marker: "OXT → 1.0", recovery: "+10.8%", desc: "Social cohesion" },
      { marker: "DA → 1.0", recovery: "+5.6%", desc: "Motivational drive" },
      { marker: "BDNF → 1.0", recovery: "+3.7%", desc: "Cognitive capacity" },
      { marker: "D → 1.0", recovery: "+1.7%", desc: "Protective factor" },
    ],
    sCulturalSensConclusion: "The critical triad (T + MEL + OXT) accounts for 55% of BioCap weight and 39.7% of potential recovery. EMF reduction is the only intervention that would raise all biomarkers simultaneously, because all are downstream of the EMF-induced biomarker cascade.",
    sCulturalTransTitle: "Phase Transitions",
    sCulturalTransitions: [
      { year: "~2000", from: "Rationalistic", to: "Deistic", trigger: "Melatonin collapse (LED + mobile networks)", evidence: "'Something changed' consensus — 9/11, internet bubble, polarization onset, IQ reversal" },
      { year: "~2015", from: "Deistic", to: "Manistic", trigger: "Testosterone critical threshold reached", evidence: "Populism, pronatalist failure, loneliness epidemic, 'failure to launch', Brexit/Trump" },
      { year: "~2040", from: "Manistic", to: "Zoistic", trigger: "Melatonin (PGC + LED → permanent capacity loss)", evidence: "PREDICTION — falsifiable: if the West shows recovery in the 2030s → wrong" },
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
    sActivationChartX: "Total EMF load (Ā_geo + Ā_infra + Ā_EMF)",
    sActivationChartY: "BioCap",
    sActivationChartSun: "Same sun, opposite effects",
    sActivationEpistemic: "",

    sExpansionTitle: "Three Types of Expansion",
    sExpansionCards: [
      {
        id: "α",
        title: "Hormetic Activation",
        examples: "Mongols 1206, Arabs 632, Vikings 793",
        icon: "sun",
        desc: "Solar maximum + nomadic population in the hormetic zone → testosterone rises, cortisol falls, fertility increases. Over 2–3 generations, a demographic pulse produces expansion. Low-dose exposure has been shown to increase testosterone and decrease cortisol in animal models.",
        trigger: "Solar maximum + nomad = biological activation",
      },
      {
        id: "β",
        title: "Recovery Energy",
        examples: "Age of Exploration 1492, Scientific Revolution 1687, Napoleonic era 1803",
        icon: "moon",
        desc: "Grand solar minimum → reduced electromagnetic burden → biological recovery over 50–80 years → accumulated biological capital → expansion or renaissance. Eight of ten major European renaissances occurred during or immediately after grand solar minima.",
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

    s6title: "Twelve Predictions, Twelve Observations",
    s6lead:
      "BERM predicts specific behavioral and social changes from its hormonal model. Each prediction is grounded in RCT evidence for the hormonal link; each observation cites population-level data consistent with the prediction.",
    scoreConsistent: "consistent",
    predictions: [
      {
        prediction: "Male status-seeking declines",
        basis: "T → status motivation ([[ref:dreher2016|Dreher 2016]], n=121)",
        observed:
          "Declining entrepreneurship rates, 'quiet quitting', reduced career ambition in surveys",
        consistent: true,
      },
      {
        prediction: "Male risk-taking declines",
        basis: "T → competitive risk (Competition 2024, n=220)",
        observed:
          "Declining business formation, reduced physical risk activities, increased risk-aversion",
        consistent: true,
      },
      {
        prediction: "Male sexual approach declines",
        basis: "T → sexual motivation ([[ref:goetz2024|Goetz 2024]], n=139)",
        observed:
          "Rising sexlessness, declining relationship initiation, Japan 43% virginal at 18–34",
        consistent: true,
      },
      {
        prediction: "Male authenticity declines",
        basis: "T → authentic self-presentation (Audience 2020, n=166)",
        observed:
          "Rising social anxiety, increased impression management, performative identity",
        consistent: true,
      },
      {
        prediction: "Male group loyalty declines",
        basis: "T → in-group favoritism (Parochial 2015, n=100)",
        observed:
          "Declining civic participation, falling union/party membership, institutional detachment",
        consistent: true,
      },
      {
        prediction: "Male provocation response declines",
        basis: "T → reactive aggression (Carré 2017, n=308)",
        observed:
          "Declining violent crime rates, reduced confrontation willingness, conflict avoidance",
        consistent: true,
      },
      {
        prediction: "Male cognitive style shifts toward deliberation",
        basis: "T → gut-feel over deliberation (Nave 2018, n=243)",
        observed:
          "Increased decision paralysis, analysis paralysis, reduced spontaneous action",
        consistent: true,
      },
      {
        prediction: "Male motivation/reward sensitivity declines",
        basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)",
        observed:
          "Rising depression, 'failure to launch', NEET rates increasing, gaming/streaming as reward substitution",
        consistent: true,
      },
      {
        prediction: "Female anxiety/depression gender gap widens",
        basis:
          "Estrogen amplifies HPA reactivity. EMF → cortisol↑ hits women harder.",
        observed:
          "Women 2× anxiety, 2× depression rate. Gap widening since 2010. Teen girl mental health crisis since ~2012.",
        consistent: true,
      },
      {
        prediction: "Institutional trust declines globally",
        basis:
          "OT → trust (Kosfeld 2005, Nature). EMF → vagal tone ↓ → OT ↓.",
        observed:
          "Edelman 2025: trust in all institutions at historic lows. Loneliness epidemic declared. Social capital declining.",
        consistent: true,
      },
      {
        prediction: "PCOS prevalence rises with EMF adoption",
        basis:
          "PCOS = 4-organ VGCC convergence (pancreas + ovary + pituitary + adrenal).",
        observed:
          "PCOS prevalence 5–20% and rising. Most common cause of female infertility. Correlates with metabolic syndrome.",
        consistent: true,
      },
      {
        prediction: "Each generation more sensitive than previous",
        basis:
          "CaMKII → Cav3.2 threshold ↓ (PMC9913649). Epigenetic transmission (sperm methylome).",
        observed:
          "Mental health crisis onset earlier in each cohort. ASD/ADHD prevalence rising generationally. Puberty onset earlier in girls.",
        consistent: true,
      },
    ],

    sProjectionTitle: "What the Hormone Data Predicts About Society",
    sProjectionLead:
      "The twelve predictions above trace individual behavioral changes. But individuals do not exist in isolation. They form couples, families, teams, institutions, and nations. When the hormonal substrate of an entire population shifts, the aggregate effects produce emergent social phenomena that look like ideological change, cultural conflict, or moral decline but may be, in significant part, biological shift experienced as cultural change.",
    sProjectionNote:
      "This distinction matters. If a social problem is ideological, the solution requires changing minds. If it is partly biological, the solution includes changing the environment. The second is easier.",

    spolarTitle: "Polarization: digital courage, physical conformity",
    spolarBody:
      "The audience effect RCT (2020) showed that low testosterone increases strategic prosociality — saying what the audience expects rather than what you believe. The provocation RCT (Carré 2017) showed that low testosterone reduces reactive response to injustice. Together, these predict a specific pattern: people will be conformist in physical presence but confrontational from behind screens.",
    spolarObserved:
      "This is precisely what is observed. Online polarization is at historic highs. Physical confrontation is at historic lows. People express views anonymously that they would never state in person. Comment sections are battlefields; meeting rooms are echo chambers.",
    spolarExplain:
      "This is not hypocrisy. It is biology. Low testosterone raises the threshold for authentic confrontation. Digital environments lower the social cost of confrontation to near zero. The mismatch between biological threshold and environmental cost creates the pattern: bold online, silent offline.",
    spolarPrediction:
      "BERM prediction: populations with higher average T (e.g., lower-EMF communities) should show less divergence between online and offline behavior.",
    spolarPhysical: "Physical environment",
    spolarPhysicalThreshold: "High (face-to-face social cost)",
    spolarPhysicalBehavior: "Conformity, self-censorship, agreement",
    spolarPhysicalRct: "Audience 2020: low T → strategic prosociality",
    spolarDigital: "Digital environment",
    spolarDigitalThreshold: "Near zero (anonymity, distance)",
    spolarDigitalBehavior: "Outrage, polarization, confrontation",
    spolarDigitalRct: "Carré 2017: provocation response persists when cost is low",
    svgNeutral: "neutral",
    svgPhysical: "Physical",
    svgConformity: "Conformity",
    svgHighThreshold: "high threshold",
    svgDigital: "Digital",
    svgOutragePolarization: "Outrage & polarization",
    svgNearZeroCost: "near-zero cost",
    svgThresholdVsCost: "biological threshold vs. digital cost",

    ssafetyTitle: "Safety-seeking: hormonal threshold, not value choice",
    ssafetyBody:
      "Risk-taking declines with testosterone (Competition RCT 2024, n=333). Anxiety increases with cortisol ([[ref:dual_hormone_meta2021|dual hormone meta, n=8,538]]). Threat sensitivity increases when both shift simultaneously. At the population level, this produces a society that experiences more situations as threatening — not because the environment is more dangerous (violent crime is at historic lows) but because the biological threshold for threat perception has lowered.",
    ssafetyParadox:
      "This explains an otherwise paradoxical pattern: the safest societies in human history report the highest anxiety. Objective danger is down. Subjective threat is up. The gap between the two is the hormonal shift.",
    ssafetyCreep:
      "When threat perception rises without actual threat increasing, the result is what psychologists call \"concept creep\": the expansion of harm-related concepts to encompass previously neutral phenomena. Words become violence. Disagreement becomes aggression. Discomfort becomes trauma. This is not moral progress or moral decline. It is a recalibrated threat detection system operating on a different hormonal substrate.",

    sinstitutionTitle: "Institutional decay: why everything gets slightly worse",
    sinstitutionBody:
      "The result is not dramatic collapse. It is pervasive, slow-motion quality loss. Healthcare gets slightly worse. Education gets slightly worse. Infrastructure maintenance falls slightly behind. Customer service declines. Political candidates are slightly less competent. Each individually unremarkable. Together, the pattern is civilizational.",
    sinstitutionData:
      "The 2025 Edelman Trust Barometer confirms: trust in all institutions — government, media, NGOs, employers — has declined across nearly every demographic. This is not a partisan phenomenon. It is a substrate phenomenon.",

    sfixableTitle: "The Fixable Fraction",
    sfixableLead:
      "If the behavioral changes documented on this page were entirely ideological — if people were less motivated, more anxious, more conformist, and less trusting purely because of ideas — the solution would require changing billions of minds. History suggests this is extremely difficult. But if a significant fraction of these changes has a biological basis, then part of the solution is environmental, not ideological.",
    sfixableSolutions: [
      "Reducing EMF exposure in living and working spaces",
      "Calcium channel modulation (264,625 patients already show psychiatric benefit from CCBs prescribed for cardiovascular conditions)",
      "Magnesium supplementation (natural Ca²⁺ antagonist)",
      "Melatonin restoration (circadian repair)",
      "Sleep hygiene (melatonin → GnRH → T recovery)",
      "Physical contact and community (oxytocin restoration)",
    ],
    sfixableConclusion:
      "None of these require anyone to change their beliefs. They require changing the electromagnetic environment and supporting the biological systems that hormones regulate. If even 20–30% of the current crisis in motivation, trust, and social cohesion is biological rather than ideological, that is 20–30% that can be addressed without political conflict. This is the most practically important implication of the BERM model: not that civilization is doomed, but that part of its decline has a specific, identifiable, and potentially reversible cause.",

    shistoryTitle: "Reading history through the hormonal lens",
    shistoryBody:
      "Every generation experiences the same objective world through a different hormonal substrate. A man in 1960 with testosterone at 600 ng/dL, normal cortisol, and intact dopaminergic signaling experiences a career setback as a challenge to overcome. A man in 2024 with testosterone at 350 ng/dL, elevated cortisol, and reduced dopaminergic tone experiences the same setback as a threat to avoid. Their values may be identical. Their biological capacity to act on those values is not.",
    shistoryOlder:
      "When older generations say \"we just got on with it,\" they are not describing superior character. They are describing a different hormonal environment in which the threshold for action was lower and the threshold for avoidance was higher.",
    shistoryYounger:
      "When younger generations say \"the world is more stressful,\" they are not describing a more dangerous world (it is objectively safer). They are describing the same world experienced through a hormonal substrate that detects more threat and generates less motivation to confront it.",
    shistoryConclusion:
      "Neither generation is wrong. They are describing the same reality through different biological filters. The intergenerational conflict that results — \"lazy kids\" vs \"out-of-touch boomers\" — is itself a consequence of the hormonal shift, not evidence of moral failure on either side.",

    sideologyTitle: "Ideology as downstream",
    sideologyBody:
      "The same idea — \"safety is important\" — produces different political outcomes depending on the hormonal substrate of the population that holds it.",
    sideologyHigh:
      "At T=500 ng/dL, cortisol=normal: \"Safety is important\" → build safe infrastructure, enforce laws, confront threats directly.",
    sideologyLow:
      "At T=320 ng/dL, cortisol=elevated: \"Safety is important\" → eliminate all risk, expand definitions of harm, avoid confrontation by removing the confrontation-causing stimulus.",
    sideologyExplain:
      "The idea has not changed. The biological capacity to implement it has. This is not left vs right. It is not progressive vs conservative. It is a biological shift in the implementation threshold for the same set of values that both sides largely share. Both sides want safety. Both sides want fairness. Both sides want opportunity. The disagreement is about how — and \"how\" is moderated by hormonal thresholds.",
    sideologyTestable:
      "This is testable. If political attitudes on safety, risk, and authority correlate with individual hormone profiles (T, cortisol, OT) after controlling for demographics and stated ideology, the biological moderation hypothesis gains support. Multiple studies have found exactly this: testosterone correlates with political attitudes on authority, competition, and redistribution across cultures.",

    s7title: "The Recursive Prediction",
    s7body:
      "BERM makes an unusual prediction: its own reception is evidence for its thesis. If testosterone decline reduces risk-taking, competitive drive, and authentic self-presentation at the population level, then the scientific community — composed of humans subject to the same hormonal environment — should exhibit reduced willingness to challenge consensus, pursue controversial research directions, and defend unpopular findings. The model predicts that research into EMF bioeffects will be underfunded, stigmatized, and institutionally discouraged — not because the evidence is weak, but because the hormonal substrate that drives intellectual risk-taking is declining. This is testable: funding allocation for EMF bioeffects research as a proportion of total NIH/ERC funding should be declining, and researchers in the field should report increasing career penalties for publishing positive findings.",

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
    sHistLawLead: "Kautta historian sivilisaatiot ovat seuranneet hämmästyttävän johdonmukaista kaavaa: nousu, kukoistus, rappio. Yksitoista itsenäistä ajattelijaa — Vicosta (1725) Turchiniin (2023) — päätyi samaan havaintoon toisistaan tietämättä. BERM ehdottaa puuttuvaa mekanismia: sähkömagneettinen ympäristö säätelee biologista kapasiteettia, joka puolestaan ohjaa sivilisaation dynamiikkaa.",

    sProphetsTitle: "Profeetat olivat oikeassa — ja väärässä",
    sProphetsLead: "Yksitoista vakavaa ajattelijaa kolmen vuosisadan aikana dokumentoivat itsenäisesti saman sivilisaatiokuvion. He olivat eri mieltä metodista, ideologiasta ja laajuudesta. Silti he yhtyvät yhteen havaintoon: sivilisaatiot eivät edisty lineaarisesti. Ne nousevat ja laskevat sykleissä, ja myöhäisvaiheita leimaavat laskeva syntyvyys, lisääntyvä hedonismi, kollektiivisen tahdon menetys ja pessimismi.",
    sProphetsTable: [
      { thinker: "Giambattista Vico", year: "1725", observation: "Kolmen aikakauden toistuva sykli (jumalat, sankarit, ihmiset)", bermExplanation: "BioCap-oskillaatio tuottaa kvalitatiivisesti erilaisia sosiaalisia vaiheita" },
      { thinker: "Oswald Spengler", year: "1918", observation: "Sivilisaatiot elävien organismien kaltaisina", bermExplanation: "Biologisella substraatilla on elinkaari kumulatiivisen EMF-altistuksen ohjaamana" },
      { thinker: "Arnold Toynbee", year: "1934", observation: "Haaste-ja-vastaus 21 sivilisaatiossa", bermExplanation: "Biologinen kapasiteetti määrää vastauksen laadun; ehtyneet populaatiot epäonnistuvat haasteissa" },
      { thinker: "Pitirim Sorokin", year: "1937", observation: "Sensaatti-ideaalinen kulttuurinen oskillaatio", bermExplanation: "Dopamiini/serotoniini-tasapaino muuttuu → sensaattivaihe = matala-DA, korkea stimulaatiohaku" },
      { thinker: "John Bagot Glubb", year: "1978", observation: "250 vuoden imperiumin elinkaari, 6 vaihetta", bermExplanation: "~250 vuotta ≈ Suess-sykli (200 v) + biologinen inertia (~50 v)" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Monimutkaisuuden laskevat rajatuotot", bermExplanation: "Kognitiivisen kapasiteetin lasku (BDNF↓, kortisoli↑) vähentää kykyä hallita monimutkaisuutta" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "Asabiya (ryhmäsolidaarisuus) heikkenee 3-4 sukupolvessa", bermExplanation: "Oksitosiini↓ + testosteroni↓ = vähentynyt ryhmäkoheesio — juuri asabiyan menetys" },
      { thinker: "Peter Turchin", year: "2003", observation: "Sekulaarisyklit (~80-100 v) pidempien aaltojen sisällä", bermExplanation: "Gleissberg-sykli (88 v) säätelee BioCap:ia Suess-syklin kuoren sisällä" },
      { thinker: "Neema Parvini", year: "2023", observation: "Syntetisoi kaikki 11 ajattelijaa; kuvio on robusti kehysten yli", bermExplanation: "Itsenäisten havainnoitsijoiden yhdentyminen = vahva näyttö todellisesta ilmiöstä joka vaatii selityksen" },
    ],

    sSolarTitle: "Ennen ja jälkeen sähköistymisen",
    sSolarLead: "Ennen sähköistymistä ainoa merkittävä sähkömagneettinen vaikutus biologiaan tuli auringosta. Aurinkoaktiivisuus oskiloi sisäkkäisinä sykleinä: 11 vuoden Schwabe-sykli, 88 vuoden Gleissberg-sykli ja ~200 vuoden Suess/de Vries -sykli. Auringon suurminimien aikana sähkömagneettinen kuormitus biologiaan vähenee ja biologinen palautuminen tapahtuu.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: [
      "S(τ) = aurinkosyklien superpositio [0,1]",
      "U(τ) = urbanisaation EMF-komponentti (hidas, pre-sähköinen)",
      "E(τ) = sähköistymisen EMF-komponentti (nopea, post-1880)",
      "σ(τ) = palautumisen vaimennuskerroin = min(E(τ)/E_max, 0.95)",
      "χ(λ) = geomagneettinen herkkyyskerroin (leveysasteriippuvainen)",
      "α = biologinen palautumiskerroin",
    ],
    sSolarPrePost: "Pre-sähköinen (E=0): BioCap oskiloi → syklinen sivilisaatiodynamiikka. Post-sähköinen (E≫S): BioCap laskee monotonisesti → ei palautumisikkunaa.",
    sSolarRenaissance: "Kahdeksan kymmenestä merkittävästä eurooppalaisesta renessanssista tapahtui auringon suurminimien aikana tai heti niiden jälkeen: Italian renessanssi Spörer-minimin aikana, tieteellinen vallankumous Maunder-minimin aikana, saksalainen romantiikka Dalton-minimin aikana.",

    sMigrationTitle: "Muuttogradientti",
    sMigrationLead: "Sama biologinen gradientti, joka ajoi germaaniheimoilaisia Roomaan, arabit Bysanttiin ja mongolit Song-Kiinaan, toimii tänään. Saharan eteläpuolisella Afrikalla — jolla on lyhin kumulatiivinen sähkömagneettinen altistus kaikista suurista populaatioista — on korkein biologinen kapasiteetti. Muuttovirrat Afrikasta ja Lähi-idästä Eurooppaan seuraavat biologisen kontrastin gradienttia.",
    sMigrationNote: "Tämä on biologinen gradientti (ympäristö, ei genetiikka). Maahanmuuttajien hedelmällisyys yhtyy isäntämaan tasolle 1-2 sukupolvessa — todistaen mekanismin olevan ympäristöllinen, ei geneettinen.",

    sLastBarbarianTitle: "'Viimeisen barbaarin' ikkuna",
    sLastBarbarianText: "BERM ennustaa Afrikan BioCap-arvon alkavan laskea mobiiliverkkojen leviämisen myötä (~2010) ja lähestyvän eurooppalaista tasoa vuosiin 2070–2080 mennessä. Ajanjakso 2020–2060 saattaa olla viimeinen, jolloin maapallon väestöistä löytyy merkittävästi korkeamman biologisen kapasiteetin omaava ryhmä. Sen jälkeen edessä on maailmanlaajuinen samanaikainen heikkeneminen ilman biologista reserviä.",

    sThreeLawsTitle: "Kolme historiallista lakia",
    sThreeLaws: [
      { id: "L1", title: "Sivilisaation synty vaatii matalan χ:n vyöhykettä (25-35°N)", desc: "Biologinen stabiilisuus → pitkäjänteinen kehitys. Vahvistettu: p = 0.01 (syntyalueet vs ekspansiot)." },
      { id: "L2", title: "Luovat renessanssit klusteroituvat suurminimien aikaan korkean χ:n leveysasteilla (45-60°N)", desc: "Suurin palautumismodulaatio → suurin luova pääoma. Vahvistettu: 8/10 eurooppalaisesta renessanssista." },
      { id: "L3", title: "Imperiumien nousut alkavat matalan aurinkoaktiivisuuden aikana", desc: "Biologinen palautuminen → kapasiteetti ekspansioon. Vahvistettu: rise-tapahtumien solar = 0.41 vs peak = 0.73." },
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
    sCulturalAmish: "Amish (≈ 0,98)",
    sCulturalNow: "2025:",
    sCulturalForecast: "ennuste",
    sCulturalLinesTitle: "Yksittäisten biomarkkerien liikeradat",
    sCulturalUnwinTitle: "Unwinin todistusaineisto",
    sCulturalUnwinBody1: "Vuonna 1934 Oxfordin antropologi J.D. Unwin julkaisi tutkimuksen 86 yhteiskunnasta 5 000 vuoden ajalta. Hänen havaintonsa oli ehdoton: jokaisessa yhteiskunnassa poikkeuksetta kulttuurisen saavutuksen taso korreloi suoraan yhteiskunnan asettaman seksuaalisen pidättyväisyyden kanssa. Tiukan sääntelyn yhteiskunnat osoittivat mitä Unwin kutsui 'ekspansiiviseksi energiaksi'. Sallivien normien yhteiskunnat osoittivat 'zoistista' energiaa — toimeentuloa ilman ekspansiota.",
    sCulturalUnwinBody2: "Unwin katsoi tämän johtuvan freudilaisesta sublimaatiosta: seksuaalienergia, jota ei purettu seksuaalisesti, ohjautui kulttuuriseen tuotantoon. Tämä selitys ei ole vanhentunut hyvin. Mutta hänen datansa on. Kukaan ei ole replikoinut tutkimusta, mutta kukaan ei ole falsifioinut sitäkään. 86 yhteiskuntaa, nolla poikkeusta.",
    sCulturalUnwinBody3: "BERM esittää eri mekanismin samalle havainnolle. Seksuaalinen pidättyväisyys ei tuota kulttuurista energiaa. Sen sijaan sekä korkea seksuaalinen halu (joka vaatii säätelyä) että korkea kulttuurinen energia ovat saman biologisen tilan oireita: korkea testosteroni, korkea oksitosiini, korkea dopamiiniherkkyys, normaali melatoniini, matala kortisoli. Tässä tilassa väestöllä on sekä vahva libido (joka edellyttää sosiaalista säätelyä) että vahva sivilisaatiokapasiteetti. Kun biologinen kapasiteetti laskee — kumulatiivisen sähkömagneettisen altistuksen, kaupungistumisen kautta — sekä seksuaalinen halu että kulttuurinen energia laskevat yhdessä. Unwinin havaitsema korrelaatio oli todellinen. Kausaatio oli yhteinen ylävirran tekijä, jota hän ei olisi voinut tunnistaa vuonna 1934.",
    sCulturalPhasesTitle: "Unwinin neljä vaihetta",
    sCulturalPhases: [
      { name: "Zoistinen", biocap: "< 0,55", desc: "Toimeentulo ilman ekspansiota. Ei suurimuotoista rakentamista, abstraktia ajatteluperinnettä tai alueellista kunnianhimoa.", color: "red" },
      { name: "Manistinen", biocap: "0,55–0,75", desc: "Laskeva energia. Populismi, institutionaalinen rappio, polarisaatio, pronatalismipolitiikan epäonnistuminen. Länsimainen sivilisaatio 2015–nykyhetki.", color: "amber" },
      { name: "Deistinen", biocap: "0,75–0,90", desc: "Siirtymävaihe. Kulttuurinen tuotanto jatkuu mutta laskevin uutuuksin. Institutionaalinen luottamus murenee. Länsimainen sivilisaatio 2000–2015.", color: "blue" },
      { name: "Rationalistinen", biocap: "> 0,90", desc: "Täysi ekspansiivinen energia. Valloitus, rakentaminen, älyllinen saavutus, tieteellinen vallankumous. Länsimainen sivilisaatio ennen vuotta 2000.", color: "green" },
    ],
    sCulturalSensTitle: "Herkkyysanalyysi",
    sCulturalSensDesc: "Jos yksi biomarkkeri palautettaisiin 1980-tasolleen:",
    sCulturalSensItems: [
      { marker: "T → 1,0", recovery: "+16,7 %", desc: "Suurin yksittäinen interventio" },
      { marker: "MEL → 1,0", recovery: "+12,2 %", desc: "Sirkadiaaninen palautuminen" },
      { marker: "OXT → 1,0", recovery: "+10,8 %", desc: "Sosiaalinen koheesio" },
      { marker: "DA → 1,0", recovery: "+5,6 %", desc: "Motivaatiokäyttövoima" },
      { marker: "BDNF → 1,0", recovery: "+3,7 %", desc: "Kognitiivinen kapasiteetti" },
      { marker: "D → 1,0", recovery: "+1,7 %", desc: "Suojaava tekijä" },
    ],
    sCulturalSensConclusion: "Kriittinen triadi (T + MEL + OXT) muodostaa 55 % BioCap-painosta ja 39,7 % mahdollisesta palautumisesta. EMF-vähennys on ainoa interventio, joka nostaisi kaikkia biomarkkereita samanaikaisesti, koska ne kaikki ovat EMF-kaskadin alavirran tuotteita.",
    sCulturalTransTitle: "Vaihesiirtymät",
    sCulturalTransitions: [
      { year: "~2000", from: "Rationalistinen", to: "Deistinen", trigger: "Melatoniiniromahdus (LED + mobiiliverkot)", evidence: "'Jokin muuttui' -konsensus — 9/11, internet-kupla, polarisaation alku, ÄO:n kääntyminen" },
      { year: "~2015", from: "Deistinen", to: "Manistinen", trigger: "Testosteronin kriittinen kynnys saavutettu", evidence: "Populismi, pronatalismien epäonnistuminen, yksinäisyysepidemia, 'failure to launch', Brexit/Trump" },
      { year: "~2040", from: "Manistinen", to: "Zoistinen", trigger: "Melatoniini (PGC + LED → pysyvä kapasiteettitappio)", evidence: "ENNUSTE — falsifioitavissa: jos länsi osoittaa palautumista 2030-luvulla → väärä" },
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
    sActivationChartX: "Kokonais-EMF-kuorma (Ā_geo + Ā_infra + Ā_EMF)",
    sActivationChartY: "BioCap",
    sActivationChartSun: "Sama aurinko, vastakkaiset vaikutukset",
    sActivationEpistemic: "",

    sExpansionTitle: "Kolme ekspansiotyyppiä",
    sExpansionCards: [
      { id: "α", title: "Hormeettinen aktivaatio", examples: "Mongolit 1206, arabit 632, viikingit 793", icon: "sun", desc: "Auringon aktiivivaihe yhdistettynä paimentolaisväestöön hormeettisella vyöhykkeellä → testosteroni nousee, kortisoli laskee, hedelmällisyys kasvaa. Kahdessa tai kolmessa sukupolvessa väestöpulssi tuottaa ekspansion. Matala-annoksinen altistus nostaa testosteronitasoa ja laskee kortisolitasoa eläinmalleissa.", trigger: "Auringon aktiivivaihe + paimentolainen = biologinen aktivaatio" },
      { id: "β", title: "Palautumisenergia", examples: "Löytöretket 1492, tieteellinen vallankumous 1687, Napoleonin kausi 1803", icon: "moon", desc: "Auringon suurminimi → sähkömagneettinen kuormitus vähenee → biologinen palautuminen 50–80 vuoden kuluessa → kertynyt biologinen pääoma → ekspansio tai renessanssi. Kahdeksan kymmenestä merkittävästä eurooppalaisesta renessanssista tapahtui suurminimin aikana tai pian sen jälkeen.", trigger: "Suurminimi + palautuminen = luova kukoistus" },
      { id: "γ", title: "Eroosion gradientti", examples: "Kansainvaellus 375–476, mantšut → Ming-Kiina 1644, Afrikka → Eurooppa 2000–", icon: "gradient", desc: "Pitkäaikainen biologinen kuluminen kaupunkiväestössä yhdistettynä vahingoittumattomaan paimentolais- tai maatalousväestöön rajoilla → kumulatiivinen BioCap-ero. Kun gradientti ylittää kynnyksen, ekspansio seuraa. Tämä tyyppi ei riipu aurinkosykleistä — se on jatkuva prosessi, joka vaatii vuosisatojen eriytymisen.", trigger: "Vuosisatojen urbaani kuluminen + koskematon raja = korvautuminen" },
    ],

    s6title: "Kaksitoista ennustetta, kaksitoista havaintoa",
    s6lead: "BERM ennustaa tarkkoja käyttäytymis- ja yhteiskuntamuutoksia hormonaalimallinsa pohjalta. Jokainen ennuste perustuu RCT-näyttöön hormonilinkistä; jokainen havainto viittaa väestötason dataan, joka on yhdenmukainen ennusteen kanssa.",
    scoreConsistent: "yhdenmukainen",
    predictions: [
      { prediction: "Miesten statushakuisuus vähenee", basis: "T → statusmotivaatio ([[ref:dreher2016|Dreher 2016]], n=121)", observed: "Yrittäjyysaste laskee, 'quiet quitting', vähentynyt uratavoitteisuus kyselyissä", consistent: true },
      { prediction: "Miesten riskinotto vähenee", basis: "T → kilpailullinen riski (Competition 2024, n=220)", observed: "Yritysten perustaminen laskee, vähemmän fyysisiä riskiaktiviteetteja, kasvanut riskinkaihtaminen", consistent: true },
      { prediction: "Miesten seksuaalinen lähestyminen vähenee", basis: "T → seksuaalinen motivaatio ([[ref:goetz2024|Goetz 2024]], n=139)", observed: "Seksittömyys kasvaa, parisuhteen aloittaminen vähenee, Japani 43 % neitsyitä 18–34", consistent: true },
      { prediction: "Miesten autenttisuus vähenee", basis: "T → autenttinen itseilmaisu (Audience 2020, n=166)", observed: "Sosiaalinen ahdistus kasvaa, vaikutelmanhallinta lisääntyy, performatiivinen identiteetti", consistent: true },
      { prediction: "Miesten ryhmäuskollisuus vähenee", basis: "T → sisäryhmäsuosiminen (Parochial 2015, n=100)", observed: "Kansalaisosallistuminen vähenee, liitto-/puoluejäsenyys laskee, institutionaalinen irtaantuminen", consistent: true },
      { prediction: "Miesten provokaatiovaste vähenee", basis: "T → reaktiivinen aggressio (Carré 2017, n=308)", observed: "Väkivaltarikollisuus laskee, konfrontaatiovalmius vähenee, konfliktien välttely", consistent: true },
      { prediction: "Miesten kognitiivinen tyyli siirtyy harkinnaan", basis: "T → vaistonvaraisuus harkinnan yli (Nave 2018, n=243)", observed: "Päätösparalyysi lisääntyy, analyysihalvaus, spontaani toiminta vähenee", consistent: true },
      { prediction: "Miesten motivaatio/palkkioherkkyys vähenee", basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)", observed: "Masennus kasvaa, 'failure to launch', NEET-osuus kasvaa, pelaaminen/suoratoisto palkkiosubstituuttina", consistent: true },
      { prediction: "Naisten ahdistuksen/masennuksen sukupuolikuilu levenee", basis: "Estrogeeni vahvistaa HPA-reaktiivisuutta. EMF → kortisoli↑ osuu naisiin kovemmin.", observed: "Naiset 2× ahdistus, 2× masennus. Kuilu levenee 2010 jälkeen. Teinityttöjen mielenterveyskriisi ~2012 lähtien.", consistent: true },
      { prediction: "Institutionaalinen luottamus laskee maailmanlaajuisesti", basis: "OT → luottamus (Kosfeld 2005, Nature). EMF → vagaalitonus ↓ → OT ↓.", observed: "Edelman 2025: luottamus kaikissa instituutioissa historiallisen matalalla. Yksinäisyysepidemia julistettu.", consistent: true },
      { prediction: "PCOS-esiintyvyys kasvaa EMF-adoption myötä", basis: "PCOS = 4 elimen VGCC-yhdentyminen (haima + munasarja + aivolisake + lisämunuainen).", observed: "PCOS 5–20 % ja kasvussa. Naisten hedelmättömyyden yleisin syy. Korreloi metabolisen oireyhtymän kanssa.", consistent: true },
      { prediction: "Jokainen sukupolvi herkempi kuin edellinen", basis: "CaMKII → Cav3.2-kynnys ↓ (PMC9913649). Epigeneettinen transmissio (siittiömetyloomi).", observed: "Mielenterveyskriisi alkaa aiemmin jokaisessa kohortissa. ASD/ADHD-esiintyvyys kasvaa sukupolvittain. Puberteetti alkaa aiemmin tytöillä.", consistent: true },
    ],

    sProjectionTitle: "Mitä hormonidata ennustaa yhteiskunnasta",
    sProjectionLead: "Yllä olevat kaksitoista ennustetta jäljittävät yksilötason käyttäytymismuutoksia. Mutta yksilöt eivät elä eristyksissä. He muodostavat pareja, perheitä, tiimejä, instituutioita ja kansakuntia. Kun kokonaisen väestön hormonaalinen substraatti muuttuu, aggregoidut vaikutukset tuottavat emergenttejä sosiaalisia ilmiöitä, jotka näyttävät ideologiselta muutokselta, kulttuuriselta konfliktilta tai moraaliselta rapautumiselta — mutta saattavat merkittäviltä osin olla biologista muutosta koettuna kulttuurisena muutoksena.",
    sProjectionNote: "Tämä erottelu on tärkeä. Jos sosiaalinen ongelma on ideologinen, ratkaisu vaatii mielten muuttamista. Jos se on osittain biologinen, ratkaisuun sisältyy ympäristön muuttaminen. Jälkimmäinen on helpompaa.",

    spolarTitle: "Polarisaatio: digitaalinen rohkeus, fyysinen konformismi",
    spolarBody: "Yleisövaikutus-RCT (2020) osoitti, että matala testosteroni lisää strategista prososiaalisuutta — sen sanomista mitä yleisö odottaa, ei sitä mitä uskoo. Provokaatio-RCT (Carré 2017) osoitti, että matala testosteroni vähentää reaktiivista vastetta epäoikeudenmukaisuuteen. Yhdessä nämä ennustavat spesifin kuvion: ihmiset ovat konformistisia fyysisessä läsnäolossa mutta konfrontatiivisia ruutujen takaa.",
    spolarObserved: "Juuri tätä havaitaan. Verkossa polarisaatio on historiallisen korkealla. Fyysinen konfrontaatio on historiallisen matalalla. Ihmiset ilmaisevat anonyymisti näkemyksiä, joita he eivät koskaan sanoisi kasvotusten.",
    spolarExplain: "Tämä ei ole tekopyhyyttä. Se on biologiaa. Matala testosteroni nostaa autenttisen konfrontaation kynnystä. Digitaaliset ympäristöt laskevat konfrontaation sosiaalisen kustannuksen lähelle nollaa. Biologisen kynnyksen ja ympäristökustannuksen epäsuhta tuottaa kuvion: rohkea verkossa, hiljainen kasvotusten.",
    spolarPrediction: "BERM-ennuste: väestöissä, joilla on korkeampi keskimääräinen T (esim. matala-EMF-yhteisöt), verkko- ja kasvokkais-käyttäytymisen välinen ero pitäisi olla pienempi.",
    spolarPhysical: "Fyysinen ympäristö",
    spolarPhysicalThreshold: "Korkea (kasvokkain sosiaalinen kustannus)",
    spolarPhysicalBehavior: "Konformismi, itsesensuri, myöntyminen",
    spolarPhysicalRct: "Audience 2020: matala T → strateginen prososiaalisuus",
    spolarDigital: "Digitaalinen ympäristö",
    spolarDigitalThreshold: "Lähellä nollaa (anonymiteetti, etäisyys)",
    spolarDigitalBehavior: "Raivo, polarisaatio, konfrontaatio",
    spolarDigitalRct: "Carré 2017: provokaatiovaste säilyy, kun kustannus on matala",
    svgNeutral: "neutraali",
    svgPhysical: "Fyysinen",
    svgConformity: "Konformismi",
    svgHighThreshold: "korkea kynnys",
    svgDigital: "Digitaalinen",
    svgOutragePolarization: "Raivo & polarisaatio",
    svgNearZeroCost: "lähes nolla kustannus",
    svgThresholdVsCost: "biologinen kynnys vs. digitaalinen kustannus",

    ssafetyTitle: "Turvallisuushakuisuus: hormonaalinen kynnys, ei arvovalinta",
    ssafetyBody: "Riskinotto vähenee testosteronin myötä (Competition RCT 2024, n=333). Ahdistus kasvaa kortisolin myötä ([[ref:dual_hormone_meta2021|kaksoishormonimeta, n=8 538]]). Uhkaherkkyys kasvaa, kun molemmat muuttuvat samanaikaisesti. Väestötasolla tämä tuottaa yhteiskunnan, joka kokee enemmän tilanteita uhkaavina — ei siksi että ympäristö olisi vaarallisempi (väkivaltarikollisuus on historiallisen matalalla) vaan koska biologinen kynnys uhkan havaitsemiselle on laskenut.",
    ssafetyParadox: "Tämä selittää muuten paradoksaalisen kuvion: ihmiskunnan historian turvallisimmat yhteiskunnat raportoivat korkeinta ahdistusta. Objektiivinen vaara on laskenut. Subjektiivinen uhka on noussut. Näiden välinen ero on hormonaalinen muutos.",
    ssafetyCreep: "Kun uhkahavainnointi kasvaa ilman todellisen uhkan kasvua, tuloksena on se mitä psykologit kutsuvat \"concept creepiksi\": haittaan liittyvien käsitteiden laajeneminen kattamaan aiemmin neutraaleja ilmiöitä. Sanat muuttuvat väkivallaksi. Erimielisyys muuttuu aggressioksi. Epämukavuus muuttuu traumaksi. Tämä ei ole moraalista edistystä eikä moraalista rappeutumista. Se on uudelleenkalibroitu uhkantunnistusjärjestelmä, joka toimii eri hormonaalisella substraatilla.",

    sinstitutionTitle: "Institutionaalinen rapautuminen: miksi kaikki heikkenee hieman",
    sinstitutionBody: "Tulos ei ole dramaattinen romahdus. Se on laaja-alainen, hidaskäyntinen laadun menetys. Terveydenhuolto heikkenee hieman. Koulutus heikkenee hieman. Infrastruktuurin ylläpito jää hieman jälkeen. Asiakaspalvelu heikkenee. Poliittiset ehdokkaat ovat hieman vähemmän päteviä. Jokainen yksinään huomaamaton. Yhdessä kuvio on sivilisatorinen.",
    sinstitutionData: "Vuoden 2025 Edelman Trust Barometer vahvistaa: luottamus kaikkiin instituutioihin — hallitukseen, mediaan, kansalaisjärjestöihin, työnantajiin — on laskenut lähes kaikissa demografioissa. Tämä ei ole puoluepoliittinen ilmiö. Se on substraatti-ilmiö.",

    sfixableTitle: "Korjattavissa oleva osuus",
    sfixableLead: "Jos tällä sivulla dokumentoidut käyttäytymismuutokset olisivat kokonaan ideologisia — jos ihmiset olisivat vähemmän motivoituneita, ahdistuneempia, konformistisempia ja vähemmän luottavaisia puhtaasti ideoiden takia — ratkaisu vaatisi miljardien mielten muuttamista. Historia viittaa siihen, että tämä on äärimmäisen vaikeaa. Mutta jos merkittävä osa näistä muutoksista on biologista, osa ratkaisusta on ympäristöllistä, ei ideologista.",
    sfixableSolutions: [
      "EMF-altistuksen vähentäminen elin- ja työtiloissa",
      "Kalsiumkanavamodulaatio (264 625 potilasta jo osoittaa psykiatrista hyötyä sydän- ja verisuonitauteihin määrätyistä CCB-lääkkeistä)",
      "Magnesiumlisä (luonnollinen Ca²⁺-antagonisti)",
      "Melatoniinin palautus (vuorokausirytmin korjaus)",
      "Unihygienia (melatoniini → GnRH → T-palautuminen)",
      "Fyysinen kontakti ja yhteisö (oksitosiinin palautus)",
    ],
    sfixableConclusion: "Mikään näistä ei vaadi kenenkään muuttavan uskomuksiaan. Ne vaativat sähkömagneettisen ympäristön muuttamista ja hormoneja säätelevien biologisten järjestelmien tukemista. Jos edes 20–30 % nykyisestä motivaation, luottamuksen ja sosiaalisen koheesion kriisistä on biologista eikä ideologista, se on 20–30 %, joka voidaan osoittaa ilman poliittista konfliktia. Tämä on BERM-mallin käytännöllisesti tärkein seuraus: ei se, että sivilisaatio on tuomittu, vaan se, että osa sen rapautumisesta johtuu nimenomaisesta, tunnistettavasta ja mahdollisesti palautettavissa olevasta syystä.",

    shistoryTitle: "Historian tulkinta hormonaalisen linssin läpi",
    shistoryBody: "Jokainen sukupolvi kokee saman objektiivisen maailman eri hormonaalisen substraatin läpi. Mies vuonna 1960 testosteronilla 600 ng/dL, normaalilla kortisolilla ja ehjällä dopaminergisellä signaloinnilla kokee uravastoinkäymisen haasteena, joka voitetaan. Mies vuonna 2024 testosteronilla 350 ng/dL, kohonneella kortisolilla ja vähentyneellä dopaminergisellä tonuksella kokee saman vastoinkäymisen uhkana, jota vältetään. Heidän arvonsa voivat olla identtiset. Heidän biologinen kykynsä toimia noiden arvojen mukaisesti ei ole.",
    shistoryOlder: "Kun vanhemmat sukupolvet sanovat \"me vain tehtiin se\", he eivät kuvaile ylivertaista luonnetta. He kuvailevat eri hormonaalista ympäristöä, jossa toiminnan kynnys oli matalampi ja välttelyn kynnys korkeampi.",
    shistoryYounger: "Kun nuoremmat sukupolvet sanovat \"maailma on stressaavampi\", he eivät kuvaile vaarallisempaa maailmaa (se on objektiivisesti turvallisempi). He kuvailevat samaa maailmaa koettuna hormonaalisen substraatin läpi, joka havaitsee enemmän uhkaa ja tuottaa vähemmän motivaatiota kohdata sitä.",
    shistoryConclusion: "Kumpikaan sukupolvi ei ole väärässä. He kuvailevat samaa todellisuutta eri biologisten suodattimien läpi. Tuloksena oleva sukupolvien välinen konflikti — \"laiskaat nuoret\" vs \"todellisuudesta vieraantuneet boomerit\" — on itsessään hormonaalisen muutoksen seuraus, ei todiste kummankaan osapuolen moraalisesta epäonnistumisesta.",

    sideologyTitle: "Ideologia alavirrassa",
    sideologyBody: "Sama idea — \"turvallisuus on tärkeää\" — tuottaa eri poliittisia tuloksia riippuen sen väestön hormonaalisesta substraatista, joka sitä kannattaa.",
    sideologyHigh: "T=500 ng/dL, kortisoli=normaali: \"Turvallisuus on tärkeää\" → rakenna turvallinen infrastruktuuri, valvo lakeja, kohtaa uhkat suoraan.",
    sideologyLow: "T=320 ng/dL, kortisoli=koholla: \"Turvallisuus on tärkeää\" → poista kaikki riski, laajenna haitan määritelmää, vältä konfrontaatiota poistamalla konfrontaation aiheuttava ärsyke.",
    sideologyExplain: "Idea ei ole muuttunut. Biologinen kyky toteuttaa sitä on. Tämä ei ole vasemmisto vs oikeisto. Se ei ole etenevä vs konservatiivinen. Se on biologinen muutos toteutuskynnyksessä samoille arvoille, jotka molemmat puolet suurelta osin jakavat. Molemmat puolet haluavat turvallisuutta. Molemmat puolet haluavat oikeudenmukaisuutta. Molemmat puolet haluavat mahdollisuuksia. Erimielisyys koskee sitä miten — ja \"miten\" on moderoitu hormonaalisilla kynnyksillä.",
    sideologyTestable: "Tämä on testattavissa. Jos poliittiset asenteet turvallisuuteen, riskiin ja auktoriteettiin korreloivat yksilön hormoniprofiilien (T, kortisoli, OT) kanssa demografisten tekijöiden ja ilmoitetun ideologian vakioinnin jälkeen, biologisen moderoinnin hypoteesi saa tukea. Useat tutkimukset ovat löytäneet juuri tämän: testosteroni korreloi poliittisten asenteiden kanssa auktoriteettiin, kilpailuun ja tulonjakoon eri kulttuureissa.",

    s7title: "Rekursiivinen ennuste",
    s7body: "BERM tekee epätavallisen ennusteen: sen oma vastaanotto on todistetta sen teesistä. Jos testosteronilasku vähentää riskinottoa, kilpailuviettiä ja autenttista itseilmaisua väestötasolla, tiedeyhteisön — joka koostuu samojen hormonaalisten olosuhteiden alaisista ihmisistä — pitäisi osoittaa vähentynyt halukkuus haastaa konsensusta, tutkia kiistanalaisia suuntia ja puolustaa epäsuosittuja tuloksia. Malli ennustaa, että EMF-biovaikutustutkimus on alirahoitettua, stigmatisoitua ja institutionaalisesti torpattua — ei siksi että näyttö olisi heikkoa, vaan koska intellektuaalista riskinottoa ajava hormonaalinen substraatti vähenee. Tämä on testattavissa: EMF-biovaikutustutkimuksen rahoitusosuuden NIH/ERC-kokonaisrahoituksesta pitäisi laskea, ja alan tutkijoiden pitäisi raportoida kasvavia uraseuraamuksia positiivisten tulosten julkaisemisesta.",

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
    sCulturalBioTitle: "文明能力の8つのバイオマーカー", sCulturalBiomarkers: [] as any[], sCulturalRadarTitle: "バイオマーカープロファイル — 西洋人口2025",
    sCulturalTimeTitle: "BioCap軌道: 1900–2060", sCulturalTimeX: "年", sCulturalTimeY: "BioCap", sCulturalAmish: "アーミッシュ (≈ 0.98)", sCulturalNow: "2025:", sCulturalForecast: "予測",
    sCulturalLinesTitle: "個別バイオマーカー軌道",
    sCulturalUnwinTitle: "アンウィンの証拠", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "アンウィンの4つの段階", sCulturalPhases: [] as any[],
    sCulturalSensTitle: "感度分析", sCulturalSensDesc: "", sCulturalSensItems: [] as any[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "相転移", sCulturalTransitions: [] as any[],
    sActivationTitle: "活性化サイクル：なぜ新しい勢力は古い勢力の衰退とともに台頭するのか",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "ホルメシス用量反応", sActivationChartZone1: "ゾーン1：ホルメシス刺激（遊牧民）", sActivationChartZone2: "ゾーン2：移行（農耕）", sActivationChartZone3: "ゾーン3：損傷（都市/電化）",
    sActivationChartX: "総EMF負荷", sActivationChartY: "BioCap", sActivationChartSun: "同じ太陽、反対の効果", sActivationEpistemic: "",
    sExpansionTitle: "三つの拡大類型",
    sExpansionCards: [
      { id: "α", title: "ホルメシス活性化", examples: "モンゴル1206、アラブ632、ヴァイキング793", icon: "sun", desc: "", trigger: "太陽極大＋遊牧民＝生物学的活性化" },
      { id: "β", title: "回復エネルギー", examples: "大航海時代1492、科学革命1687、ナポレオン時代1803", icon: "moon", desc: "", trigger: "大極小期＋回復＝創造的高揚" },
      { id: "γ", title: "浸食勾配", examples: "ゲルマン民族移動375–476、満州→明1644、アフリカ→ヨーロッパ2000–", icon: "gradient", desc: "", trigger: "数世紀の都市浸食＋無傷の辺境＝交替" },
    ],
    s6title: "12の予測、12の観察",
    s6lead: "BERMはそのホルモンモデルから特定の行動的・社会的変化を予測する。各予測はホルモンの関連性についてRCTエビデンスに基づいている；各観察は予測と一致する集団レベルのデータを引用する。",
    scoreConsistent: "一致",
    predictions: [
      { prediction: "男性の地位追求が低下する", basis: "T → status motivation ([[ref:dreher2016|Dreher 2016]], n=121)", observed: "起業率の低下、「静かな退職」、調査における職業的野心の低下", consistent: true },
      { prediction: "男性のリスクテイキングが低下する", basis: "T → competitive risk (Competition 2024, n=220)", observed: "企業設立の減少、身体的リスク活動の減少、リスク回避の増加", consistent: true },
      { prediction: "男性の性的アプローチが低下する", basis: "T → sexual motivation ([[ref:goetz2024|Goetz 2024]], n=139)", observed: "セックスレスの増加、交際開始の減少、Japan 18–34歳の43%が性経験なし", consistent: true },
      { prediction: "男性の真正性が低下する", basis: "T → authentic self-presentation (Audience 2020, n=166)", observed: "社会不安の増加、印象管理の増加、演出的アイデンティティ", consistent: true },
      { prediction: "男性の集団忠誠心が低下する", basis: "T → in-group favoritism (Parochial 2015, n=100)", observed: "市民参加の減少、組合・政党の会員減少、制度からの離脱", consistent: true },
      { prediction: "男性の挑発反応が低下する", basis: "T → reactive aggression (Carré 2017, n=308)", observed: "暴力犯罪率の低下、対立する意欲の減少、紛争回避", consistent: true },
      { prediction: "男性の認知スタイルが熟慮型にシフトする", basis: "T → gut-feel over deliberation (Nave 2018, n=243)", observed: "決断麻痺の増加、分析麻痺、自発的行動の減少", consistent: true },
      { prediction: "男性の動機づけ/報酬感受性が低下する", basis: "T↓ → DA↓ → anhedonia (Soares-Cunha 2016)", observed: "うつ病の増加、「巣立ちの失敗」、NEET率の増加、報酬代替としてのゲーム/ストリーミング", consistent: true },
      { prediction: "女性の不安/うつ病の性差が拡大する", basis: "Estrogen amplifies HPA reactivity. EMF → cortisol↑ hits women harder.", observed: "女性は不安2倍、うつ病2倍。2010年以降格差が拡大。2012年頃からの10代女子のメンタルヘルス危機。", consistent: true },
      { prediction: "制度への信頼が世界的に低下する", basis: "OT → trust (Kosfeld 2005, Nature). EMF → vagal tone ↓ → OT ↓.", observed: "Edelman 2025：すべての制度への信頼が歴史的最低値。孤独のエピデミックが宣言。ソーシャルキャピタルの減少。", consistent: true },
      { prediction: "PCOSの有病率がEMF普及とともに上昇する", basis: "PCOS = 4-organ VGCC convergence (pancreas + ovary + pituitary + adrenal).", observed: "PCOS有病率5–20%で上昇中。女性不妊の最も一般的な原因。メタボリックシンドロームと相関。", consistent: true },
      { prediction: "各世代は前世代より感受性が高い", basis: "CaMKII → Cav3.2 threshold ↓ (PMC9913649). Epigenetic transmission (sperm methylome).", observed: "メンタルヘルス危機の発症が各コホートで早期化。ASD/ADHD有病率が世代ごとに上昇。女子の思春期発来が早期化。", consistent: true },
    ],
    sProjectionTitle: "ホルモンデータが社会について予測すること",
    sProjectionLead: "上記の12の予測は個人の行動変化を追跡する。しかし個人は孤立して存在するのではない。カップル、家族、チーム、制度、国家を形成する。集団全体のホルモン基盤がシフトすると、その集約効果はイデオロギーの変化、文化的対立、道徳的衰退のように見えるが、その相当部分は文化的変化として経験される生物学的シフトである可能性がある創発的社会現象を生む。",
    sProjectionNote: "この区別は重要である。社会問題がイデオロギー的であれば、解決策は考え方を変えることを要する。それが部分的に生物学的であれば、解決策には環境を変えることが含まれる。後者のほうが容易である。",
    spolarTitle: "分極化：デジタルの勇気、物理的な同調", spolarBody: "オーディエンス効果RCT（2020）は、低テストステロンが戦略的向社会性――自分が信じることではなく聴衆が期待することを言うこと――を増加させることを示した。挑発RCT（Carré 2017）は、低テストステロンが不正義に対する反応的反応を減少させることを示した。これらを合わせると、特定のパターンが予測される：人々は物理的な場では同調的だが、スクリーンの向こうからは対立的になる。",
    spolarObserved: "これはまさに観察されていることである。オンラインの分極化は歴史的な高水準にある。物理的な対立は歴史的な低水準にある。人々は対面では決して言わないであろう意見を匿名で表明する。コメント欄は戦場であり、会議室はエコーチェンバーである。",
    spolarExplain: "これは偽善ではない。生物学である。低テストステロンは真正な対立の閾値を引き上げる。デジタル環境は対立の社会的コストをほぼゼロに引き下げる。生物学的閾値と環境コストのミスマッチがこのパターンを生む：オンラインでは大胆、オフラインでは沈黙。",
    spolarPrediction: "BERMの予測：平均Tが高い集団（例：低EMFコミュニティ）は、オンラインとオフラインの行動の乖離が小さいはずである。",
    spolarPhysical: "物理的環境", spolarPhysicalThreshold: "高（対面の社会的コスト）", spolarPhysicalBehavior: "同調、自己検閲、同意", spolarPhysicalRct: "Audience 2020: low T → strategic prosociality",
    spolarDigital: "デジタル環境", spolarDigitalThreshold: "ほぼゼロ（匿名性、距離）", spolarDigitalBehavior: "憤怒、分極化、対立", spolarDigitalRct: "Carré 2017: provocation response persists when cost is low",
    svgNeutral: "neutral", svgPhysical: "物理的", svgConformity: "同調", svgHighThreshold: "高い閾値", svgDigital: "デジタル", svgOutragePolarization: "憤怒と分極化", svgNearZeroCost: "ほぼゼロのコスト", svgThresholdVsCost: "生物学的閾値 vs. デジタルコスト",
    ssafetyTitle: "安全志向：価値選択ではなくホルモン閾値", ssafetyBody: "リスクテイキングはテストステロンとともに低下する（Competition RCT 2024, n=333）。不安はコルチゾールとともに増加する（[[ref:dual_hormone_meta2021|dual hormone meta, n=8,538]]）。両方が同時にシフトすると脅威感受性が増加する。集団レベルでは、これがより多くの状況を脅威として経験する社会を生む――環境がより危険だからではなく（暴力犯罪は歴史的最低水準にある）、脅威認知の生物学的閾値が低下したからである。",
    ssafetyParadox: "これは一見矛盾するパターンを説明する：人類史上最も安全な社会が最も高い不安を報告している。客観的危険は低下している。主観的脅威は上昇している。両者の間の差がホルモンシフトである。",
    ssafetyCreep: "実際の脅威が増加することなく脅威認知が上昇すると、心理学者が「コンセプト・クリープ」と呼ぶもの――害に関連する概念が以前は中立的だった現象を包含するように拡大すること――が生じる。言葉が暴力になる。意見の相違が攻撃になる。不快感がトラウマになる。これは道徳的進歩でも道徳的衰退でもない。異なるホルモン基盤上で作動する再較正された脅威検出システムである。",
    sinstitutionTitle: "制度の衰退：なぜすべてが少しずつ悪くなるのか", sinstitutionBody: "その結果は劇的な崩壊ではない。広範で緩やかな品質低下である。医療が少し悪くなる。教育が少し悪くなる。インフラの維持が少し遅れる。カスタマーサービスが低下する。政治家候補がわずかに能力を欠く。個々には目立たない。しかし合わせると、そのパターンは文明レベルのものである。",
    sinstitutionData: "2025 Edelman Trust Barometerは確認する：すべての制度――政府、メディア、NGO、雇用主――への信頼がほぼすべての人口統計で低下した。これは党派的現象ではない。基盤的現象である。",
    sfixableTitle: "修正可能な部分", sfixableLead: "このページに記録された行動変化が完全にイデオロギー的なものであれば――人々がアイデアのみの理由で動機づけが低く、より不安で、より同調的で、より信頼しなくなっていれば――解決策には何十億もの人々の考え方を変えることが必要になる。歴史はこれが極めて困難であることを示唆している。しかし、これらの変化のかなりの部分が生物学的基盤を持つならば、解決策の一部はイデオロギー的ではなく環境的なものである。",
    sfixableSolutions: ["生活・就労空間でのEMF曝露の低減", "カルシウムチャネル調節（264,625人の患者が心血管適応でCCBを処方され、精神科的便益を既に示している）", "マグネシウム補給（天然のCa²⁺拮抗剤）", "メラトニン回復（概日リズム修復）", "睡眠衛生（melatonin → GnRH → T回復）", "身体的接触とコミュニティ（オキシトシン回復）"],
    sfixableConclusion: "これらのいずれも、誰かの信念を変える必要はない。電磁環境を変え、ホルモンが調節する生物学的システムを支援することを必要とする。現在の動機づけ、信頼、社会的結束の危機のうち20–30%でも生物学的であってイデオロギー的でなければ、その20–30%は政治的対立なしに対処できる。これがBERMモデルの最も実際的に重要な含意である：文明が運命づけられているということではなく、その衰退の一部に特定可能で、潜在的に可逆的な原因があるということである。",
    shistoryTitle: "ホルモンのレンズで歴史を読む", shistoryBody: "すべての世代は同じ客観的世界を異なるホルモン基盤を通じて経験する。1960年にテストステロン600 ng/dL、正常なコルチゾール、正常なドーパミン作動性シグナル伝達を持つ男性は、キャリアの挫折を克服すべき挑戦として経験する。2024年にテストステロン350 ng/dL、コルチゾール上昇、ドーパミン作動性トーン低下を持つ男性は、同じ挫折を回避すべき脅威として経験する。彼らの価値観は同一かもしれない。その価値観に基づいて行動する生物学的能力は同じではない。",
    shistoryOlder: "上の世代が「俺たちはただやっていただけだ」と言うとき、彼らは優れた人格を述べているのではない。行動の閾値が低く回避の閾値が高い、異なるホルモン環境を述べているのである。",
    shistoryYounger: "若い世代が「世界はよりストレスフルだ」と言うとき、彼らはより危険な世界を述べているのではない（客観的にはより安全である）。より多くの脅威を検出し、それに立ち向かう動機をより少なく生成するホルモン基盤を通じて経験される同じ世界を述べているのである。",
    shistoryConclusion: "どちらの世代も間違ってはいない。同じ現実を異なる生物学的フィルターを通じて述べている。その結果として生じる世代間対立――「怠け者の若者」対「世間知らずのベビーブーマー」――は、それ自体がホルモンシフトの帰結であり、どちら側の道徳的失敗の証拠でもない。",
    sideologyTitle: "下流としてのイデオロギー", sideologyBody: "同じアイデア――「安全は重要だ」――は、それを保持する集団のホルモン基盤に応じて異なる政治的帰結を生む。",
    sideologyHigh: "T=500 ng/dL、cortisol=正常の場合：「安全は重要だ」→ 安全なインフラを構築し、法を執行し、脅威に直接対峙する。",
    sideologyLow: "T=320 ng/dL、cortisol=上昇の場合：「安全は重要だ」→ すべてのリスクを排除し、害の定義を拡大し、対立の原因となる刺激を除去することで対立を回避する。",
    sideologyExplain: "アイデアは変わっていない。それを実行する生物学的能力が変わったのである。これは左派対右派ではない。進歩派対保守派でもない。両陣営が概ね共有する同じ価値観セットに対する実行閾値の生物学的シフトである。両陣営とも安全を望む。両陣営とも公正を望む。両陣営とも機会を望む。対立はその「方法」について――そして「方法」はホルモン閾値によって調節される。",
    sideologyTestable: "これは検証可能である。安全性、リスク、権威に関する政治的態度が、人口統計と表明されたイデオロギーを統制した後に個人のホルモンプロファイル（T、cortisol、OT）と相関するなら、生物学的調節仮説は支持を得る。複数の研究がまさにこれを見出している：テストステロンは文化を超えて権威、競争、再分配に関する政治的態度と相関する。",
    s7title: "再帰的予測",
    s7body: "BERMは異例の予測を行う：モデル自体の受容がその命題のエビデンスである。テストステロンの低下が集団レベルでリスクテイキング、競争意欲、真正な自己提示を減少させるならば、同じホルモン環境に従属する人間で構成される科学コミュニティは、コンセンサスに挑戦し、論争的な研究方向を追求し、不人気な知見を擁護する意欲の低下を示すはずである。モデルはEMFの生体影響に関する研究が資金不足、汚名、制度的抑制を受けると予測する――エビデンスが弱いからではなく、知的リスクテイキングを駆動するホルモン基盤が低下しているからである。これは検証可能である：EMF生体影響研究へのNIH/ERC総資金に占める配分割合は低下しているはずであり、この分野の研究者は肯定的知見の公表に対するキャリア上の不利益が増加していると報告するはずである。",
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
      { thinker: "John Bagot Glubb", year: "1978", observation: "Duree de vie imperiale de 250 ans, 6 etapes", bermExplanation: "~250 ans ≈ cycle de Suess (200 ans) + inertie biologique (~50 ans)" },
      { thinker: "Joseph Tainter", year: "1988", observation: "Rendements decroissants de la complexite", bermExplanation: "Le declin de la capacite cognitive (BDNF↓, cortisol↑) reduit la capacite a gerer la complexite" },
      { thinker: "Ibn Khaldun", year: "1377", observation: "L'asabiya (solidarite de groupe) decline sur 3-4 generations", bermExplanation: "Ocytocine↓ + testosterone↓ = cohesion intra-groupe reduite — precisement la perte d'asabiya" },
      { thinker: "Peter Turchin", year: "2003", observation: "Cycles seculaires (~80-100 ans) au sein de vagues plus longues", bermExplanation: "Le cycle de Gleissberg (88 ans) module le BioCap dans l'enveloppe du cycle de Suess" },
      { thinker: "Neema Parvini", year: "2023", observation: "A synthetise les 11 penseurs ; le schema est robuste a travers les cadres", bermExplanation: "La convergence d'observateurs independants = preuve forte d'un phenomene reel necessitant une explication" },
    ],
    sSolarTitle: "Avant et apres l'electrification",
    sSolarLead: "Avant l'electrification, la seule influence electromagnetique significative sur la biologie venait du soleil. L'activite solaire oscille en cycles imbriques : le cycle de Schwabe de 11 ans, le cycle de Gleissberg de 88 ans et le cycle de Suess/de Vries d'environ 200 ans. Pendant les grands minima solaires, la charge electromagnetique sur la biologie diminue et la recuperation biologique se produit.",
    sSolarFormula: "BioCap(t,λ) = BioCap₀ − ∫₀ᵗ χ(λ)·[S(τ) + U(τ) + E(τ)] dτ + ∫₀ᵗ α·χ(λ)·[1−S(τ)]·[1−σ(τ)] dτ",
    sSolarFormulaTerms: ["S(τ) = superposition des cycles solaires [0,1]", "U(τ) = composante EMF de l'urbanisation (lente, pre-electrique)", "E(τ) = composante EMF de l'electrification (rapide, post-1880)", "σ(τ) = coefficient de suppression de la recuperation = min(E(τ)/E_max, 0.95)", "χ(λ) = coefficient de susceptibilite geomagnetique (dependant de la latitude)", "α = coefficient de recuperation biologique"],
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
    sCulturalBioTitle: "Huit biomarqueurs de capacité civilisationnelle", sCulturalBiomarkers: [] as any[], sCulturalRadarTitle: "Profil biomarqueur — Population occidentale 2025",
    sCulturalTimeTitle: "Trajectoire BioCap : 1900–2060", sCulturalTimeX: "Année", sCulturalTimeY: "BioCap", sCulturalAmish: "Amish (≈ 0,98)", sCulturalNow: "2025 :", sCulturalForecast: "prévision",
    sCulturalLinesTitle: "Trajectoires individuelles des biomarqueurs",
    sCulturalUnwinTitle: "Les preuves d'Unwin", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "Les quatre phases d'Unwin", sCulturalPhases: [] as any[],
    sCulturalSensTitle: "Analyse de sensibilité", sCulturalSensDesc: "", sCulturalSensItems: [] as any[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "Transitions de phase", sCulturalTransitions: [] as any[],
    sActivationTitle: "Le cycle d'activation : pourquoi de nouvelles puissances emergent quand les anciennes declinent",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "Reponse dose-effet hormetique", sActivationChartZone1: "Zone 1 : Stimulation hormetique (nomade)", sActivationChartZone2: "Zone 2 : Transition (agraire)", sActivationChartZone3: "Zone 3 : Dommage (urbain/electrifie)",
    sActivationChartX: "Charge EMF totale", sActivationChartY: "BioCap", sActivationChartSun: "Meme soleil, effets opposes", sActivationEpistemic: "",
    sExpansionTitle: "Trois types d'expansion",
    sExpansionCards: [
      { id: "α", title: "Activation hormetique", examples: "Mongols 1206, Arabes 632, Vikings 793", icon: "sun", desc: "", trigger: "Maximum solaire + nomade = activation biologique" },
      { id: "β", title: "Energie de recuperation", examples: "Explorations 1492, Revolution scientifique 1687, ere napoleonienne 1803", icon: "moon", desc: "", trigger: "Grand minimum + recuperation = essor creatif" },
      { id: "γ", title: "Gradient d'erosion", examples: "Migrations germaniques 375–476, Mandchous → Ming 1644, Afrique → Europe 2000–", icon: "gradient", desc: "", trigger: "Siecles d'erosion urbaine + frontiere intacte = remplacement" },
    ],
    s6title: "Douze predictions, douze observations",
    s6lead: "BERM prédit des changements comportementaux et sociaux spécifiques à partir de son modèle hormonal. Chaque prédiction est fondée sur des preuves RCT pour le lien hormonal ; chaque observation cite des données au niveau populationnel cohérentes avec la prédiction.",
    scoreConsistent: "cohérent",
    predictions: [] as any[],
    sProjectionTitle: "Ce que les données hormonales prédisent sur la société",
    sProjectionLead: "Les douze prédictions ci-dessus retracent les changements comportementaux individuels. Mais les individus n'existent pas isolément. Ils forment des couples, des familles, des équipes, des institutions et des nations. Lorsque le substrat hormonal d'une population entière change, les effets agrégés produisent des phénomènes sociaux émergents qui ressemblent à un changement idéologique, un conflit culturel ou un déclin moral mais qui peuvent être, dans une mesure significative, un changement biologique vécu comme un changement culturel.",
    sProjectionNote: "Cette distinction est importante. Si un problème social est idéologique, la solution nécessite de changer les mentalités. S'il est en partie biologique, la solution inclut le changement de l'environnement. Le second est plus facile.",
    spolarTitle: "Polarisation : courage numérique, conformité physique", spolarBody: "Le RCT de l'effet de l'audience (2020) a montré qu'un faible taux de testostérone augmente la prosocialité stratégique — dire ce que l'audience attend plutôt que ce que l'on croit. Le RCT de la provocation (Carré 2017) a montré qu'un faible taux de testostérone réduit la réponse réactive à l'injustice. Ensemble, ces résultats prédisent un schéma spécifique : les gens seront conformistes en présence physique mais confrontationnels derrière les écrans.",
    spolarObserved: "C'est précisément ce qui est observé. La polarisation en ligne est à des niveaux historiquement élevés. La confrontation physique est à des niveaux historiquement bas. Les gens expriment anonymement des opinions qu'ils n'oseraient jamais formuler en personne. Les sections de commentaires sont des champs de bataille ; les salles de réunion sont des chambres d'écho.",
    spolarExplain: "Ce n'est pas de l'hypocrisie. C'est de la biologie. Un faible taux de testostérone élève le seuil de la confrontation authentique. Les environnements numériques réduisent le coût social de la confrontation à presque zéro. Le décalage entre le seuil biologique et le coût environnemental crée le schéma : audacieux en ligne, silencieux hors ligne.",
    spolarPrediction: "Prédiction de BERM : les populations avec un taux moyen de T plus élevé (par ex., communautés à faible EMF) devraient montrer moins de divergence entre le comportement en ligne et hors ligne.",
    spolarPhysical: "Environnement physique", spolarPhysicalThreshold: "Élevé (coût social en face-à-face)", spolarPhysicalBehavior: "Conformité, autocensure, acquiescement", spolarPhysicalRct: "Audience 2020 : faible T → prosocialité stratégique",
    spolarDigital: "Environnement numérique", spolarDigitalThreshold: "Quasi nul (anonymat, distance)", spolarDigitalBehavior: "Indignation, polarisation, confrontation", spolarDigitalRct: "Carré 2017 : la réponse à la provocation persiste quand le coût est faible",
    svgNeutral: "neutre", svgPhysical: "Physique", svgConformity: "Conformité", svgHighThreshold: "seuil élevé", svgDigital: "Numérique", svgOutragePolarization: "Indignation et polarisation", svgNearZeroCost: "coût quasi nul", svgThresholdVsCost: "seuil biologique vs coût numérique",
    ssafetyTitle: "Recherche de sécurité : seuil hormonal, non choix de valeur", ssafetyBody: "La prise de risque décline avec la testostérone (RCT Competition 2024, n=333). L'anxiété augmente avec le cortisol ([[ref:dual_hormone_meta2021|méta double hormone, n=8,538]]). La sensibilité à la menace augmente lorsque les deux changent simultanément. Au niveau populationnel, cela produit une société qui perçoit plus de situations comme menaçantes — non pas parce que l'environnement est plus dangereux (la criminalité violente est à des niveaux historiquement bas) mais parce que le seuil biologique de perception de la menace s'est abaissé.",
    ssafetyParadox: "Cela explique un schéma autrement paradoxal : les sociétés les plus sûres de l'histoire humaine rapportent la plus grande anxiété. Le danger objectif est en baisse. La menace subjective est en hausse. L'écart entre les deux est le changement hormonal.",
    ssafetyCreep: "Lorsque la perception de la menace augmente sans que la menace réelle n'augmente, le résultat est ce que les psychologues appellent la « dérive conceptuelle » : l'expansion des concepts liés au préjudice pour englober des phénomènes auparavant neutres. Les mots deviennent violence. Le désaccord devient agression. L'inconfort devient traumatisme. Ce n'est ni un progrès moral ni un déclin moral. C'est un système de détection des menaces recalibré fonctionnant sur un substrat hormonal différent.",
    sinstitutionTitle: "Déclin institutionnel : pourquoi tout se dégrade légèrement", sinstitutionBody: "Le résultat n'est pas un effondrement dramatique. C'est une perte de qualité omniprésente et au ralenti. Les soins de santé se dégradent légèrement. L'éducation se dégrade légèrement. L'entretien des infrastructures prend légèrement du retard. Le service client décline. Les candidats politiques sont légèrement moins compétents. Chacun individuellement sans remarque. Ensemble, le schéma est civilisationnel.",
    sinstitutionData: "Le Edelman Trust Barometer 2025 confirme : la confiance dans toutes les institutions — gouvernement, médias, ONG, employeurs — a décliné dans presque tous les segments démographiques. Ce n'est pas un phénomène partisan. C'est un phénomène de substrat.",
    sfixableTitle: "La fraction réparable", sfixableLead: "Si les changements comportementaux documentés sur cette page étaient entièrement idéologiques — si les gens étaient moins motivés, plus anxieux, plus conformistes et moins confiants uniquement à cause des idées — la solution nécessiterait de changer des milliards de mentalités. L'histoire suggère que c'est extrêmement difficile. Mais si une fraction significative de ces changements a une base biologique, alors une partie de la solution est environnementale, pas idéologique.",
    sfixableSolutions: ["Réduire l'exposition aux EMF dans les espaces de vie et de travail", "Modulation des canaux calciques (264 625 patients montrent déjà un bénéfice psychiatrique des CCB prescrits pour des conditions cardiovasculaires)", "Supplémentation en magnésium (antagoniste naturel du Ca²⁺)", "Restauration de la mélatonine (réparation circadienne)", "Hygiène du sommeil (mélatonine → GnRH → récupération de la T)", "Contact physique et communauté (restauration de l'ocytocine)"],
    sfixableConclusion: "Aucune de ces mesures ne nécessite que quiconque change ses croyances. Elles nécessitent de modifier l'environnement électromagnétique et de soutenir les systèmes biologiques que les hormones régulent. Si même 20–30 % de la crise actuelle de motivation, de confiance et de cohésion sociale est biologique plutôt qu'idéologique, c'est 20–30 % qui peut être traité sans conflit politique. C'est l'implication la plus importante sur le plan pratique du modèle BERM : non pas que la civilisation est condamnée, mais qu'une partie de son déclin a une cause spécifique, identifiable et potentiellement réversible.",
    shistoryTitle: "Lire l'histoire à travers le prisme hormonal", shistoryBody: "Chaque génération vit le même monde objectif à travers un substrat hormonal différent. Un homme en 1960 avec une testostérone à 600 ng/dL, un cortisol normal et une signalisation dopaminergique intacte vit un revers de carrière comme un défi à surmonter. Un homme en 2024 avec une testostérone à 350 ng/dL, un cortisol élevé et un tonus dopaminergique réduit vit le même revers comme une menace à éviter. Leurs valeurs peuvent être identiques. Leur capacité biologique à agir selon ces valeurs ne l'est pas.",
    shistoryOlder: "Quand les générations plus âgées disent « on s'en sortait, c'est tout », elles ne décrivent pas un caractère supérieur. Elles décrivent un environnement hormonal différent dans lequel le seuil d'action était plus bas et le seuil d'évitement était plus haut.",
    shistoryYounger: "Quand les générations plus jeunes disent « le monde est plus stressant », elles ne décrivent pas un monde plus dangereux (il est objectivement plus sûr). Elles décrivent le même monde vécu à travers un substrat hormonal qui détecte plus de menaces et génère moins de motivation pour les affronter.",
    shistoryConclusion: "Aucune génération n'a tort. Elles décrivent la même réalité à travers des filtres biologiques différents. Le conflit intergénérationnel qui en résulte — « jeunes paresseux » contre « boomers déconnectés » — est lui-même une conséquence du changement hormonal, pas la preuve d'une défaillance morale d'un côté ou de l'autre.",
    sideologyTitle: "L'idéologie comme conséquence en aval", sideologyBody: "La même idée — « la sécurité est importante » — produit des résultats politiques différents selon le substrat hormonal de la population qui la porte.",
    sideologyHigh: "À T=500 ng/dL, cortisol=normal : « La sécurité est importante » → construire des infrastructures sûres, appliquer les lois, affronter les menaces directement.",
    sideologyLow: "À T=320 ng/dL, cortisol=élevé : « La sécurité est importante » → éliminer tout risque, élargir les définitions du préjudice, éviter la confrontation en supprimant le stimulus causant la confrontation.",
    sideologyExplain: "L'idée n'a pas changé. La capacité biologique à la mettre en œuvre, si. Ce n'est pas gauche contre droite. Ce n'est pas progressiste contre conservateur. C'est un changement biologique du seuil de mise en œuvre du même ensemble de valeurs que les deux côtés partagent largement. Les deux côtés veulent la sécurité. Les deux côtés veulent l'équité. Les deux côtés veulent les opportunités. Le désaccord porte sur le comment — et le « comment » est modulé par les seuils hormonaux.",
    sideologyTestable: "C'est vérifiable. Si les attitudes politiques sur la sécurité, le risque et l'autorité sont corrélées aux profils hormonaux individuels (T, cortisol, OT) après contrôle des données démographiques et de l'idéologie déclarée, l'hypothèse de modération biologique gagne en crédibilité. Plusieurs études ont trouvé exactement cela : la testostérone est corrélée aux attitudes politiques sur l'autorité, la compétition et la redistribution à travers les cultures.",
    s7title: "La prédiction récursive",
    s7body: "BERM fait une prédiction inhabituelle : sa propre réception est une preuve de sa thèse. Si le déclin de la testostérone réduit la prise de risque, l'esprit de compétition et la présentation authentique de soi au niveau populationnel, alors la communauté scientifique — composée d'humains soumis au même environnement hormonal — devrait manifester une volonté réduite de contester le consensus, de poursuivre des directions de recherche controversées et de défendre des résultats impopulaires. Le modèle prédit que la recherche sur les bioeffets des EMF sera sous-financée, stigmatisée et institutionnellement découragée — non pas parce que les preuves sont faibles, mais parce que le substrat hormonal qui anime la prise de risque intellectuelle est en déclin. C'est vérifiable : l'allocation de financement pour la recherche sur les bioeffets des EMF en proportion du financement total NIH/ERC devrait être en déclin, et les chercheurs du domaine devraient rapporter des pénalités de carrière croissantes pour la publication de résultats positifs.",
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
    sCulturalBioTitle: "문명 역량의 8가지 바이오마커", sCulturalBiomarkers: [] as any[], sCulturalRadarTitle: "바이오마커 프로필 — 서구 인구 2025",
    sCulturalTimeTitle: "BioCap 궤적: 1900–2060", sCulturalTimeX: "연도", sCulturalTimeY: "BioCap", sCulturalAmish: "아미시 (≈ 0.98)", sCulturalNow: "2025:", sCulturalForecast: "예측",
    sCulturalLinesTitle: "개별 바이오마커 궤적",
    sCulturalUnwinTitle: "언윈의 증거", sCulturalUnwinBody1: "", sCulturalUnwinBody2: "", sCulturalUnwinBody3: "",
    sCulturalPhasesTitle: "언윈의 4단계", sCulturalPhases: [] as any[],
    sCulturalSensTitle: "민감도 분석", sCulturalSensDesc: "", sCulturalSensItems: [] as any[], sCulturalSensConclusion: "",
    sCulturalTransTitle: "상전이", sCulturalTransitions: [] as any[],
    sActivationTitle: "활성화 주기: 왜 새로운 세력은 구세력이 쇠퇴할 때 부상하는가",
    sActivationLead: "", sActivationBody1: "", sActivationBody2: "", sActivationBody3: "", sActivationBody4: "",
    sActivationChartTitle: "호르메시스 용량-반응", sActivationChartZone1: "구역 1: 호르메시스 자극 (유목민)", sActivationChartZone2: "구역 2: 전환 (농경)", sActivationChartZone3: "구역 3: 손상 (도시/전기화)",
    sActivationChartX: "총 EMF 부하", sActivationChartY: "BioCap", sActivationChartSun: "같은 태양, 반대 효과", sActivationEpistemic: "",
    sExpansionTitle: "세 가지 확장 유형",
    sExpansionCards: [
      { id: "α", title: "호르메시스 활성화", examples: "몽골 1206, 아랍 632, 바이킹 793", icon: "sun", desc: "", trigger: "태양 극대기 + 유목민 = 생물학적 활성화" },
      { id: "β", title: "회복 에너지", examples: "대항해시대 1492, 과학혁명 1687, 나폴레옹 시대 1803", icon: "moon", desc: "", trigger: "대극소기 + 회복 = 창조적 고양" },
      { id: "γ", title: "침식 기울기", examples: "게르만 민족 이동 375–476, 만주→명 1644, 아프리카→유럽 2000–", icon: "gradient", desc: "", trigger: "수세기의 도시 침식 + 온전한 변경 = 교체" },
    ],
    s6title: "12가지 예측, 12가지 관찰",
    s6lead: "BERM은 호르몬 모델로부터 특정 행동적·사회적 변화를 예측합니다. 각 예측은 호르몬 연관에 대한 RCT 증거에 기반합니다; 각 관찰은 예측과 일치하는 인구 수준 데이터를 인용합니다.",
    scoreConsistent: "일치",
    predictions: [] as any[],
    sProjectionTitle: "호르몬 데이터가 사회에 대해 예측하는 것",
    sProjectionLead: "위의 12가지 예측은 개인 행동 변화를 추적합니다. 그러나 개인은 고립되어 존재하지 않습니다. 이들은 부부, 가족, 팀, 제도, 국가를 형성합니다. 전체 인구의 호르몬 기반이 변하면, 집합적 효과는 이념적 변화, 문화적 갈등, 도덕적 쇠퇴처럼 보이지만 상당 부분 문화적 변화로 경험되는 생물학적 전환일 수 있는 창발적 사회 현상을 만들어냅니다.",
    sProjectionNote: "이 구분은 중요합니다. 만약 사회 문제가 이념적이라면, 해결책은 생각을 바꿀 것을 요구합니다. 만약 부분적으로 생물학적이라면, 해결책은 환경을 바꾸는 것을 포함합니다. 후자가 더 쉽습니다.",
    spolarTitle: "양극화: 디지털 용기, 물리적 순응", spolarBody: "관객 효과 RCT (2020)는 낮은 테스토스테론이 전략적 친사회성을 증가시킨다는 것을 보여주었습니다 — 당신이 믿는 것이 아니라 관객이 기대하는 것을 말하는 것. 도발 RCT (Carré 2017)는 낮은 테스토스테론이 불의에 대한 반응적 반응을 감소시킨다는 것을 보여주었습니다. 함께 이들은 특정 패턴을 예측합니다: 사람들은 물리적 현존에서는 순응적이지만 화면 뒤에서는 대결적일 것입니다.",
    spolarObserved: "이것이 정확히 관찰되는 현상입니다. 온라인 양극화는 역대 최고입니다. 물리적 대결은 역대 최저입니다. 사람들은 직접 대면해서는 절대 말하지 않을 견해를 익명으로 표현합니다. 댓글 섹션은 전장이고, 회의실은 반향실입니다.",
    spolarExplain: "이것은 위선이 아닙니다. 생물학입니다. 낮은 테스토스테론은 진정한 대결의 역치를 높입니다. 디지털 환경은 대결의 사회적 비용을 거의 0으로 낮춥니다. 생물학적 역치와 환경적 비용 사이의 불일치가 패턴을 만듭니다: 온라인에서는 대담하고, 오프라인에서는 침묵합니다.",
    spolarPrediction: "BERM 예측: 평균 T가 높은 인구 (예: 저EMF 공동체)는 온라인과 오프라인 행동 간 차이가 적어야 합니다.",
    spolarPhysical: "물리적 환경", spolarPhysicalThreshold: "높음 (대면 사회적 비용)", spolarPhysicalBehavior: "순응, 자기검열, 동조", spolarPhysicalRct: "Audience 2020: 낮은 T → 전략적 친사회성",
    spolarDigital: "디지털 환경", spolarDigitalThreshold: "거의 0 (익명성, 거리)", spolarDigitalBehavior: "분노, 양극화, 대결", spolarDigitalRct: "Carré 2017: 비용이 낮을 때 도발 반응 지속",
    svgNeutral: "중립", svgPhysical: "물리적", svgConformity: "순응", svgHighThreshold: "높은 역치", svgDigital: "디지털", svgOutragePolarization: "분노와 양극화", svgNearZeroCost: "거의 0의 비용", svgThresholdVsCost: "생물학적 역치 대 디지털 비용",
    ssafetyTitle: "안전 추구: 호르몬 역치이지 가치 선택이 아님", ssafetyBody: "위험 감수는 테스토스테론과 함께 감소합니다 (Competition RCT 2024, n=333). 불안은 코르티솔과 함께 증가합니다 ([[ref:dual_hormone_meta2021|이중 호르몬 메타, n=8,538]]). 위협 민감도는 양쪽이 동시에 변할 때 증가합니다. 인구 수준에서 이것은 더 많은 상황을 위협으로 경험하는 사회를 만들어냅니다 — 환경이 더 위험해져서가 아니라 (폭력 범죄는 역대 최저입니다) 위협 인식의 생물학적 역치가 낮아졌기 때문입니다.",
    ssafetyParadox: "이것은 달리 역설적인 패턴을 설명합니다: 인류 역사상 가장 안전한 사회가 가장 높은 불안을 보고합니다. 객관적 위험은 줄었습니다. 주관적 위협은 늘었습니다. 둘 사이의 간극이 호르몬 변화입니다.",
    ssafetyCreep: "위협 인식이 실제 위협 증가 없이 상승하면, 심리학자들이 \"개념 확장\"이라 부르는 것이 나타납니다: 이전에 중립적이던 현상을 포괄하도록 해악 관련 개념이 확장되는 것. 말이 폭력이 됩니다. 의견 불일치가 공격이 됩니다. 불편함이 트라우마가 됩니다. 이것은 도덕적 진보도 도덕적 쇠퇴도 아닙니다. 다른 호르몬 기반 위에서 작동하는 재보정된 위협 탐지 시스템입니다.",
    sinstitutionTitle: "제도적 쇠퇴: 왜 모든 것이 조금씩 나빠지는가", sinstitutionBody: "결과는 극적인 붕괴가 아닙니다. 전반적이고 느린 품질 저하입니다. 의료가 약간 나빠집니다. 교육이 약간 나빠집니다. 인프라 유지보수가 약간 뒤처집니다. 고객 서비스가 저하됩니다. 정치 후보가 약간 덜 유능합니다. 각각은 개별적으로 주목할 만하지 않습니다. 함께 모으면, 그 패턴은 문명적입니다.",
    sinstitutionData: "2025 Edelman Trust Barometer가 확인합니다: 모든 기관에 대한 신뢰 — 정부, 미디어, NGO, 고용주 — 가 거의 모든 인구 집단에서 감소했습니다. 이것은 당파적 현상이 아닙니다. 기반 현상입니다.",
    sfixableTitle: "수정 가능한 부분", sfixableLead: "이 페이지에 기록된 행동 변화가 전적으로 이념적이라면 — 사람들이 순전히 사상 때문에 덜 동기부여되고, 더 불안하고, 더 순응적이고, 덜 신뢰한다면 — 해결책은 수십억 명의 생각을 바꿀 것을 요구할 것입니다. 역사는 이것이 극히 어렵다고 시사합니다. 그러나 이러한 변화의 상당 부분이 생물학적 기반을 가진다면, 해결책의 일부는 이념적이 아니라 환경적입니다.",
    sfixableSolutions: ["생활 및 업무 공간에서 EMF 노출 감소", "칼슘 채널 조절 (264,625명의 환자가 심혈관 질환용 CCB 처방으로 이미 정신과적 이점을 보임)", "마그네슘 보충 (천연 Ca²⁺ 길항제)", "멜라토닌 회복 (일주기 복구)", "수면 위생 (멜라토닌 → GnRH → T 회복)", "신체 접촉과 공동체 (옥시토신 회복)"],
    sfixableConclusion: "이것들 중 어떤 것도 누군가의 신념을 바꿀 것을 요구하지 않습니다. 전자기 환경을 바꾸고 호르몬이 조절하는 생물학적 시스템을 지원할 것을 요구합니다. 현재의 동기, 신뢰, 사회적 결속의 위기 중 20–30%만이라도 이념적이 아니라 생물학적이라면, 그것은 정치적 갈등 없이 해결할 수 있는 20–30%입니다. 이것이 BERM 모델의 가장 실천적으로 중요한 함의입니다: 문명이 운명지어졌다는 것이 아니라, 그 쇠퇴의 일부에 구체적이고, 식별 가능하며, 잠재적으로 되돌릴 수 있는 원인이 있다는 것입니다.",
    shistoryTitle: "호르몬 렌즈로 역사 읽기", shistoryBody: "모든 세대는 동일한 객관적 세계를 다른 호르몬 기반을 통해 경험합니다. 1960년에 테스토스테론 600 ng/dL, 정상 코르티솔, 온전한 도파민 신호 체계를 가진 남성은 경력 좌절을 극복해야 할 도전으로 경험합니다. 2024년에 테스토스테론 350 ng/dL, 상승한 코르티솔, 감소한 도파민 기능을 가진 남성은 같은 좌절을 회피해야 할 위협으로 경험합니다. 그들의 가치관은 동일할 수 있습니다. 그 가치관에 따라 행동할 생물학적 능력은 다릅니다.",
    shistoryOlder: "이전 세대가 \"우리는 그냥 해냈다\"라고 말할 때, 그들은 우월한 인격을 묘사하는 것이 아닙니다. 행동의 역치가 더 낮고 회피의 역치가 더 높았던 다른 호르몬 환경을 묘사하고 있습니다.",
    shistoryYounger: "젊은 세대가 \"세상이 더 스트레스 받는다\"라고 말할 때, 그들은 더 위험한 세상을 묘사하고 있는 것이 아닙니다 (세상은 객관적으로 더 안전합니다). 그들은 더 많은 위협을 감지하고 그에 맞설 동기를 덜 생성하는 호르몬 기반을 통해 경험되는 같은 세상을 묘사하고 있습니다.",
    shistoryConclusion: "어느 세대도 틀리지 않았습니다. 그들은 같은 현실을 다른 생물학적 필터를 통해 묘사하고 있습니다. 그로 인한 세대 간 갈등 — \"게으른 젊은이들\" 대 \"현실 감각 없는 기성세대\" — 은 그 자체로 호르몬 변화의 결과이지, 어느 쪽의 도덕적 실패의 증거가 아닙니다.",
    sideologyTitle: "하류 현상으로서의 이념", sideologyBody: "같은 생각 — \"안전이 중요하다\" — 이 그 생각을 가진 인구의 호르몬 기반에 따라 다른 정치적 결과를 만들어냅니다.",
    sideologyHigh: "T=500 ng/dL, cortisol=정상일 때: \"안전이 중요하다\" → 안전한 인프라를 구축하고, 법을 집행하고, 위협에 직접 대결한다.",
    sideologyLow: "T=320 ng/dL, cortisol=상승일 때: \"안전이 중요하다\" → 모든 위험을 제거하고, 해악의 정의를 확장하고, 대결을 유발하는 자극을 제거하여 대결을 피한다.",
    sideologyExplain: "생각은 변하지 않았습니다. 그것을 실행할 생물학적 능력이 변했습니다. 이것은 좌파 대 우파가 아닙니다. 진보 대 보수가 아닙니다. 양쪽이 대체로 공유하는 같은 가치관 세트에 대한 실행 역치의 생물학적 전환입니다. 양쪽 모두 안전을 원합니다. 양쪽 모두 공정을 원합니다. 양쪽 모두 기회를 원합니다. 불일치는 방법에 대한 것이며 — \"방법\"은 호르몬 역치에 의해 조절됩니다.",
    sideologyTestable: "이것은 검증 가능합니다. 만약 안전, 위험, 권위에 대한 정치적 태도가 인구통계와 명시적 이념을 통제한 후에도 개인 호르몬 프로파일 (T, cortisol, OT)과 상관관계가 있다면, 생물학적 조절 가설이 지지를 얻습니다. 여러 연구가 정확히 이것을 발견했습니다: 테스토스테론은 문화권 전반에서 권위, 경쟁, 재분배에 대한 정치적 태도와 상관관계가 있습니다.",
    s7title: "재귀적 예측",
    s7body: "BERM은 특이한 예측을 합니다: 그 자체의 수용이 논제의 증거라는 것입니다. 만약 테스토스테론 감소가 인구 수준에서 위험 감수, 경쟁 의지, 진정한 자기 표현을 줄인다면, 같은 호르몬 환경에 놓인 인간으로 구성된 과학 공동체는 합의에 도전하고, 논쟁적 연구 방향을 추구하고, 비주류 발견을 방어하려는 의지가 감소해야 합니다. 모델은 EMF 생체효과 연구가 과소 지원되고, 낙인 찍히고, 제도적으로 억제될 것이라 예측합니다 — 증거가 약하기 때문이 아니라, 지적 위험 감수를 추동하는 호르몬 기반이 쇠퇴하고 있기 때문입니다. 이것은 검증 가능합니다: 총 NIH/ERC 연구비 대비 EMF 생체효과 연구에 대한 연구비 배분이 감소해야 하며, 해당 분야의 연구자들은 긍정적 결과 발표에 대한 경력 불이익이 증가한다고 보고해야 합니다.",
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
          {d.sHistLawLead}
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
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4 max-w-4xl">
          <p className="text-sm font-medium">{d.sSolarPrePost}</p>
        </div>
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 mb-8 max-w-4xl">
          <p className="text-sm text-muted-foreground leading-relaxed">{d.sSolarRenaissance}</p>
        </div>

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
                  {d.sCulturalBiomarkers.map((b: any) => (
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
                { symbol: "T", label: "Testosterone", value: 0.46, weight: 0.20, trend: "↓" },
                { symbol: "OXT", label: "Oxytocin", value: 0.65, weight: 0.20, trend: "↓" },
                { symbol: "DA", label: "Dopamine", value: 0.76, weight: 0.15, trend: "↓" },
                { symbol: "MEL", label: "Melatonin", value: 0.475, weight: 0.15, trend: "↓↓" },
                { symbol: "BDNF", label: "BDNF", value: 0.76, weight: 0.10, trend: "↓" },
                { symbol: "CORT", label: "Cortisol", value: 0.80, weight: 0.10, trend: "↑" },
                { symbol: "D", label: "Vitamin D", value: 0.78, weight: 0.05, trend: "↓" },
                { symbol: "B2", label: "B2/FAD", value: 0.70, weight: 0.05, trend: "↓" },
              ]}
            />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {d.sCulturalPhases.map((p: any) => {
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
            {d.sCulturalTransitions.map((t: any) => (
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

        {/* Sensitivity Analysis */}
        {d.sCulturalSensItems?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{d.sCulturalSensTitle}</h3>
          <p className="text-sm text-foreground-muted mb-4">{d.sCulturalSensDesc}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {d.sCulturalSensItems.map((s: any) => (
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

      {/* S6: 12 Predictions, 12 Observations */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-2">{d.s6title}</h2>
        <p className="text-muted-foreground mb-6">{d.s6lead}</p>

        {d.predictions?.length > 0 && (
        <>
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/5 p-3 flex items-center gap-3 flex-wrap">
          <span className="text-lg font-bold text-green-400">12/12</span>
          <span className="text-xs text-muted-foreground">{d.scoreConsistent}</span>
          <div className="flex gap-0.5 flex-1 min-w-[200px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-5 rounded-sm bg-green-500/50 min-w-[14px]" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {d.predictions.map((p: any, i: number) => (
            <div key={i} className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="flex-shrink-0 rounded-full bg-green-500/20 text-green-400 text-xs font-mono px-2 py-0.5">
                {i + 1}/12
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{p.prediction}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">RCT basis:</span>{" "}
                  <InlineReferenceText text={p.basis} locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Observed:</span> {p.observed}
                </p>
              </div>
            </div>
          ))}
        </div>
        </>
        )}
      </section>

      {/* Societal Projection */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-500" />
          {d.sProjectionTitle}
        </h2>
        <p className="text-muted-foreground mb-2">{d.sProjectionLead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-8">{d.sProjectionNote}</p>

        {/* Polarization */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.spolarTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.spolarBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-sm font-semibold text-blue-400 mb-2">{d.spolarPhysical}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarPhysicalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarPhysicalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{d.spolarPhysicalRct}</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-4">
              <p className="text-sm font-semibold text-amber-400 mb-2">{d.spolarDigital}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium">T threshold:</span> {d.spolarDigitalThreshold}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Behavior:</span> {d.spolarDigitalBehavior}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{d.spolarDigitalRct}</p>
            </div>
          </div>

          {/* Polarization Diverging Chart */}
          <div className="my-4">
            <svg viewBox="0 0 500 104" className="chart-svg w-full max-w-lg mx-auto" role="img" aria-label="Diverging bar chart: physical conformity vs digital outrage">
              <line x1="250" y1="10" x2="250" y2="80" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
              <text x="250" y="8" textAnchor="middle" fill="currentColor" fillOpacity="0.3" fontSize="8">{d.svgNeutral}</text>
              <rect x="170" y="18" width="80" height="24" rx="4" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="1" />
              <text x="160" y="34" textAnchor="end" fill="#3b82f6" fontSize="9" fontWeight="600">{d.svgPhysical}</text>
              <text x="210" y="34" textAnchor="middle" fill="#3b82f6" fillOpacity="0.8" fontSize="9">{d.svgConformity}</text>
              <text x="160" y="47" textAnchor="end" fill="currentColor" fillOpacity="0.3" fontSize="7">{d.svgHighThreshold}</text>
              <rect x="250" y="52" width="180" height="24" rx="4" fill="#f59e0b" fillOpacity="0.35" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1" />
              <text x="488" y="68" textAnchor="end" fill="#f59e0b" fontSize="9" fontWeight="600">{d.svgDigital}</text>
              <text x="340" y="68" textAnchor="middle" fill="#f59e0b" fillOpacity="0.9" fontSize="9">{d.svgOutragePolarization}</text>
              <text x="488" y="82" textAnchor="end" fill="currentColor" fillOpacity="0.3" fontSize="7">{d.svgNearZeroCost}</text>
              <text x="250" y="98" textAnchor="middle" fill="currentColor" fillOpacity="0.25" fontSize="7">{d.svgThresholdVsCost}</text>
            </svg>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{d.spolarObserved}</p>
          <p className="text-sm text-muted-foreground mb-3">{d.spolarExplain}</p>
          <p className="text-sm font-medium text-violet-400">{d.spolarPrediction}</p>
        </div>

        {/* Safety-seeking */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.ssafetyTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            <InlineReferenceText text={d.ssafetyBody} locale={locale} />
          </p>
          <div className="rounded-lg bg-amber-500/10 p-4 mb-3">
            <p className="text-sm font-medium">{d.ssafetyParadox}</p>
          </div>
          <p className="text-sm text-muted-foreground">{d.ssafetyCreep}</p>
        </div>

        {/* Institutional decay */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {d.sinstitutionTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{d.sinstitutionBody}</p>
          <p className="text-sm text-muted-foreground">{d.sinstitutionData}</p>
        </div>

        {/* The Fixable Fraction */}
        <div className="mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-400">{d.sfixableTitle}</h3>
          <p className="text-sm text-muted-foreground mb-4">{d.sfixableLead}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
            {d.sfixableSolutions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="text-sm font-medium">{d.sfixableConclusion}</p>
        </div>

        {/* Reading history */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.shistoryTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.shistoryBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="rounded-lg bg-blue-500/10 p-4">
              <p className="text-xs text-muted-foreground">{d.shistoryOlder}</p>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-4">
              <p className="text-xs text-muted-foreground">{d.shistoryYounger}</p>
            </div>
          </div>
          <p className="text-sm font-medium">{d.shistoryConclusion}</p>
        </div>

        {/* Ideology as downstream */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.sideologyTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.sideologyBody}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-green-500/10 p-4">
              <p className="text-xs font-medium">{d.sideologyHigh}</p>
            </div>
            <div className="rounded-lg bg-red-500/10 p-4">
              <p className="text-xs font-medium">{d.sideologyLow}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{d.sideologyExplain}</p>
          <p className="text-sm text-muted-foreground">{d.sideologyTestable}</p>
        </div>
      </section>

      {/* S7: Recursive Prediction */}
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          {d.s7title}
        </h2>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {d.s7body}
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
