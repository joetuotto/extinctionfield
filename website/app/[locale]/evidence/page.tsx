import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ShieldQuestion,
  Eye,
  Leaf,
  Zap,
  Pill,
  Lightbulb,
  Activity,
  Brain,
  Moon,
  BarChart3,
  Compass,
  TreePine,
  Dna,
  ShieldCheck,
  Users,
  Scale,
  FlaskConical,
  Baby,
  BrainCircuit,
  Link2,
  FlaskRound,
  Target,
  Thermometer,
  Sun,
  Heart,
  TrendingDown,
  Navigation,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { StudyCitation } from "@/components/StudyCitation";
import { NextPageLink } from "@/components/NextPageLink";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import { EvidenceClassification } from "@/components/EvidenceClassification";
import { HindcastValidation } from "@/components/HindcastValidation";
import { ReferencesSummary } from "@/components/ReferencesSummary";
import { RetrodictionCards } from "@/components/RetrodictionCards";
import { DiseaseCascadeTimeline } from "@/components/DiseaseCascadeTimeline";
import { DifferentialSusceptibility } from "@/components/DifferentialSusceptibility";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import {
  causalNodeLabels,
  FIELDSTATE_EVIDENCE,
  FIELDSTATE_EVIDENCE_COUNT,
  type FieldStateDirectness,
  LEGACY_EVIDENCE_CATALOGUE,
  LEGACY_EVIDENCE_COUNT,
  PATHWAY_LABELS,
  STATUS_LABELS,
  EVIDENCE_LEVEL_LABELS,
} from "@/lib/evidence";
import { PATHWAY_ORDER, CHANNEL_GROUPS } from "@/lib/channelGroups";
import { isValidLocale, pickCopy, type Locale } from "@/lib/i18n";
import { ORPHANED_FINDINGS, ORPHANED_COMMENTARY } from "@/lib/orphanedFindings";
import { RESEARCH_DOMAINS } from "@/lib/researchDomains";

const ORDER: FieldStateDirectness[] = [
  "PHYSICS_SIGNATURE",
  "MECHANISTIC_INTERMEDIATE",
  "REPRODUCTIVE_ENDPOINT",
  "ECOLOGICAL_ENDPOINT",
  "SYSTEMATIC_REVIEW",
  "POPULATION_DESCRIPTIVE",
];

const COPY = {
  en: {
    title: "Evidence register",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} bounded BERM v17 records and ${LEGACY_EVIDENCE_COUNT} extended catalogue entries across 13+ pathways and 490+ peer-reviewed studies.`,
    interpretationTitle: "How to read this register",
    interpretation: [
      "A field signature can support a measurement variable such as background vector, angle, spectrum or envelope; it does not establish human fertility effects.",
      "A cellular or animal experiment can support a mechanistic intermediate or organ endpoint within its stated conditions; it is not automatically a human population estimate.",
      "A review locates a body of literature. A population timing result is descriptive unless matched FieldState, endpoint and confounding controls are present.",
      "No record below is a TFR coefficient. A country TFR pathway requires the separate ASFR and demographic terms in the model specification.",
    ],
    boundedTitle: "Bounded v2 records",
    boundedLead: "Each record states its field class, directness, translation scope and limitation. These are the primary evidence entries for the BERM v17 causal route.",
    classificationTitle: "How previously negative findings classify",
    channelGroupTitle: "Three frequency channels",
    channelGroupLead: "Each biological pathway maps to one of three frequency channels, defined by two biological cutoffs: f_c ~ 1 kHz (membrane RC) and f_RPM ~ 1 MHz (radical pair coherence).",
    extendedTitle: "Extended evidence catalogue",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} additional records from the BERM v17 bibliography, retained for source-level review. Each is classified by its legacy pathway, evidence level, and migration status.`,
    groups: {
      PHYSICS_SIGNATURE: "Physics signatures",
      MECHANISTIC_INTERMEDIATE: "Mechanistic intermediates",
      REPRODUCTIVE_ENDPOINT: "Reproductive endpoints",
      ECOLOGICAL_ENDPOINT: "Ecological endpoints",
      SYSTEMATIC_REVIEW: "Systematic reviews",
      POPULATION_DESCRIPTIVE: "Population-descriptive data",
    },
    fields: { nodes: "Causal nodes", field: "Field class", scope: "Translation scope", limitations: "Limitations", role: "Calibration role", source: "DOI / source" },
    structural: "Structural only",
    contextual: "Context only",
    catsperTitle: "CatSper: The Irreplaceable Channel",
    catsperLead: "Nine calcium-dependent steps span sperm production to fertilization. CatSper is required at every step — capacitation, rheotaxis, thermotaxis, chemotaxis, and acrosome reaction — and has no biological backup. CatSper knockout in any species tested produces complete male infertility.",
    catsperP1: "CatSper is the only sperm-specific calcium channel. It is voltage-gated, pH-sensitive, temperature-gated (Q₁₀ = 5.1, threshold 33.5 °C), and responds to picomolar progesterone from cumulus cells. EMF-induced Ca²⁺ dysregulation disrupts the precise timing that CatSper requires — premature activation depletes finite energy stores before sperm reach the egg.",
    catsperP2: "CATSPER2⁻/⁻ men show abolished progesterone-induced hyperactivation, failing fertilization both in vivo and in vitro ([[ref:catsper_human|JCI 2024]]). The pharmacological signature is consistent: CatSper blockers (NNC55-0396) produce the same motility and acrosome reaction deficits as EMF exposure ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
    catsperEvolution: "CatSper is conserved from sea urchins to humans — the same channel controls fertilization across 600 million years of evolution. Aquatic species (sea urchins, salmon) use CatSper in external fertilization where EMF from submarine cables provides a natural experiment.",
    catsperDetailLink: "Full 9-step reproductive navigation chain",
    sentinelTitle: "Sentinel and cross-species evidence",
    sentinel: "The Cross-Species Lag Index is a readiness protocol for joining regional outcomes, measured FieldState and endpoint covariates in a registered cross-species test.",
    sentinelGradient: "Across 7 species with quantifiable reproductive decline rates, the decline rate correlates with EMF exposure score at r = 0.909. Dogs ([[ref:lea2016|Lea et al. 2016]]): −1.0%/yr sperm decline over 26 years in UK stud dogs sharing domestic EMF exposure. Horses ([[ref:harris2023|Harris et al. 2023]]): −0.75%/yr stallion sperm decline over 35 years. The pattern extends to honeybees, birds, frogs, and aquatic species — each declining on timelines proportional to their electromagnetic environment.",
    sentinelTLink: "This cross-species gradient connects directly to the testosterone secular decline documented in humans: the same EMF mechanism (VGCC → Ca²⁺ → reproductive disruption) operates in dogs sharing our domestic EMF environment and produces the same ~1%/yr decline rate. The T→TFR lag of 8 years provides temporal calibration — countries with earlier electrification should show earlier T decline onset (prediction T-1).",
    sentinelGradientStat: "r = 0.909",
    sentinelGradientLabel: "Cross-species EMF gradient (7 species)",
    sentinelLink: "View sentinel readiness",
    sentinelTDeclineLink: "Testosterone decline evidence",
    anchorTitle: "Mechanistic Anchors",
    anchorP1: "[[ref:kalmijn1971|Kalmijn (J. Exp. Biol. 1971)]] demonstrated that elasmobranchs (sharks and rays) reliably detect electric fields as low as 5 nV/cm (5 × 10⁻⁷ V/m) through their ampullae of Lorenzini. This threshold is well below the IFO-VGIC sensitivity level used by BERM — a vertebrate nervous system processes fields at intensities that current safety standards consider biologically inert.",
    anchorP2: "The Lorenzini ampullae use ion channel conductance changes — physically analogous to VGCC gate dynamics. This is not a different mechanism in a more sensitive animal; it is the same mechanism (ion channel perturbation by weak electric fields) expressed in a different tissue. The phylogenetic conservation of field sensitivity across 10⁻⁵ to 10⁻⁷ V/m in vertebrates directly counters the 'fields too weak for biology' objection.",
    anchorNote: "Elasmobranch electroreception is a well-established sensory modality, not disputed. The extrapolation to mammalian VGCC sensitivity is a BERM interpretation — the Lorenzini ampulla is a specialized sense organ with geometry optimized for field detection, which mammalian tissues lack. The analogy is mechanistic (both use ion channel conductance), not anatomical.",
    animalTitle: "Animal Evidence: Controlled EMF Experiments",
    animalP1: "[[ref:rodriguez2003|Rodriguez et al. (J. Reprod. Fert. 2003)]] exposed dairy heifers to 60 Hz EMF (10 kV/m, 30 µT) in a controlled experiment at McGill University. Results: melatonin decreased (EMF acts as an artificial 'long day' signal), estrous cycle duration increased (p < 0.01), and luteal phase duration increased (p < 0.01). [[ref:burchard2002|Burchard et al. (J. Dairy Sci. 2002)]] found the same EMF exposure increased IGF-1 and dry matter intake.",
    animalP2: "This is direct experimental evidence that ELF fields at environmental levels alter reproductive endocrinology in large mammals. However, dairy cattle have been exposed to stable barn ELF since electrification (~1950s onward). Breeding selection pressure is ~3 orders of magnitude larger than any EMF effect. This is why livestock is correctly classified as a negative control in the BERM sentinel registry — the EMF IS biologically active, but selection masks it.",
    animalP3: "The stray voltage literature (contact currents in milliamps from faulty wiring) is orthogonal. Rodriguez measured chronic field exposure (µT), not acute contact current (mA). Only Rodriguez-type studies test BERM's mechanism — chronic low-level ELF field effects on reproductive endocrinology.",
    animalNote: "Rodriguez/Burchard experiments are peer-reviewed controlled studies with clear biological endpoints. The negative-control classification for livestock applies to population-level decline detection (selection overwhelms the signal), not to whether ELF is biologically active (it is). An Amish vs conventional dairy comparison — where Amish barns have lower ELF — would be the next informative test.",
    extPathway: "Pathway",
    extLevel: "Evidence level",
    extStatus: "Migration status",
    extScope: "Translation scope",
    extN: "N",
    dualInterpretationTitle: "Reading evidence: Standard vs. BERM interpretation",
    dualInterpretationLead: "The same study can support opposite conclusions depending on which biases are assumed. This table shows how standard and BERM-corrected frameworks read the same evidence types.",
    dualInterpretationHeaders: { evidence: "Evidence type", standard: "Standard interpretation", berm: "BERM interpretation" },
    dualInterpretationRows: [
      {
        evidence: "Study finds no significant EMF effect",
        standard: "EMF is safe at tested levels. No biological mechanism.",
        berm: "Control group is contaminated (lab baseline bias). Attenuation bias reduces apparent effect. Null result is expected if true zero-exposure control is absent.",
      },
      {
        evidence: "Study finds EMF effect at high SAR only",
        standard: "Effect is thermal. Confirms ICNIRP thresholds.",
        berm: "Dose-response curve may have a window effect (Adey/Blackman). Effect at high SAR does not exclude effect at low SAR — non-monotonic responses are predicted by RPM.",
      },
      {
        evidence: "WHO systematic review rates certainty as 'moderate'",
        standard: "Evidence is moderate. More RCTs needed.",
        berm: "WHO's methodology is subject to 15+ identified biases that all attenuate apparent effect. 'Moderate' in a bias-afflicted framework may correspond to 'high' in a bias-corrected framework.",
      },
      {
        evidence: "GDP correlates with TFR better than EMF proxy",
        standard: "GDP/development is the real driver. EMF is a proxy for development.",
        berm: "GDP is a 'bad control' (Pearl 2009): electrification causes both GDP and EMF. Controlling for GDP removes the causal effect of interest (included mediator bias).",
      },
      {
        evidence: "Study shows positive EMF effect (e.g. ROS increase)",
        standard: "Interesting but needs replication. Effect size may be small.",
        berm: "Effect size is underestimated due to lab baseline bias. True effect relative to unexposed baseline is larger than reported.",
      },
      {
        evidence: "RPM cannot explain effects at telecom frequencies",
        standard: "CRY/RPM pathway is irrelevant for mobile phones.",
        berm: "Correct for RF carrier. But telecom signals contain ELF modulation (GSM 217 Hz) within RPM's resonance range. RPM responds to modulation envelope, not carrier. Electric field effects are mediated by pathway A (VGIC).",
      },
      {
        evidence: "TFR prediction CI exceeded",
        standard: "Model is wrong. Predictions failed.",
        berm: "Three possibilities: (a) model overestimates, (b) exogenous compensation (immigration, IVF, policy), (c) CI too narrow. Discriminating tests exist for each.",
      },
    ],
    theraBionicTitle: "Clinical Validation: TheraBionic",
    theraBionicLead: "An FDA-approved medical device confirms the core BERM mechanism at exposure levels far below current safety standards.",
    theraBionicBody: "The TheraBionic P1 is an FDA-approved medical device (HDE H220001, 2019) that treats advanced hepatocellular carcinoma (liver cancer) using amplitude-modulated radiofrequency electromagnetic fields at 27.12 MHz.",
    theraBionicMechanism: "The device operates through the EXACT mechanism BERM describes: non-thermal EMF → Cav3.2 T-type voltage-gated calcium channel → Ca²⁺ influx → biological effect (tumor cell differentiation). This was demonstrated by Jimenez et al. (2019) in eBioMedicine/Lancet.",
    theraBionicSAR: "The device operates at SAR levels 100–1,000× BELOW mobile phone exposure. This confirms that non-thermal EMF can produce significant biological effects through voltage-gated calcium channels at exposure levels far below current safety standards (ICNIRP/FCC).",
    theraBionicCCB: "The FDA labeling explicitly states TheraBionic should not be used with calcium channel blockers — a pharmacological confirmation that the therapeutic effect operates through calcium channels.",
    theraBionicImplication: "This is not a BERM prediction. It is an independently developed, clinically validated, FDA-approved confirmation that non-thermal EMF produces biological effects through voltage-gated calcium channels.",
    theraBionicSurvival: "34% survival increase in advanced HCC",
    theraBionicDevice: "27.12 MHz AM-RF, tumor-specific frequencies",
    theraBionicChannel: "Cav3.2 (CACNA1H) T-type VGCC",
    theraBionicLevel: "E — FDA-approved, peer-reviewed (Lancet/eBioMedicine)",
    tDeclineTitle: "Testosterone Decline: Cross-Country Evidence",
    tDeclineLead: "Age-independent secular testosterone decline is documented in five countries across four continents. The pattern is consistent: ~1%/year decline independent of aging, BMI trends, or lifestyle confounders. Critically, studies that found 'no decline' after BMI adjustment are consistent with the mediator model: BMI is on the causal pathway, not an independent confounder, so adjusting for it removes real signal.",
    tDeclineStudies: [
      { referenceId: "travison2007_v2", country: "USA", study: "Travison et al. 2007 (MMAS)", n: "1,532", rate: "−1.0%/yr", finding: "Population-level T decline 1987–2004. Age-independent: a 65-year-old in 2002 had lower T than a 65-year-old in 1987. BMI-adjusted — captures direct pathway only.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "mazur2013", country: "USA", study: "Mazur et al. 2013 (PLOS ONE)", n: "991", rate: "−0.95%/yr", finding: "Weight-stable US Air Force veterans lost 117 ng/dL (19%) over 20 years. Excludes obesity as sufficient explanation — the 'smoking gun' for the mediator interpretation.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "perheentupa2013", country: "Finland", study: "Perheentupa et al. 2013", n: "3,271", rate: "−1.2%/yr", finding: "37% cohort-dependent T decline (1972–2002). LH and FSH also declined in later cohorts. Finland's TFR collapsed 35 years later.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "chodick-2020-israel", country: "Israel", study: "Chodick et al. 2020", n: "102,334", rate: "−1.02%/yr", finding: "Largest single study: 102k men, Maccabi Healthcare. 'Unlikely explained by increasing obesity.' T declining despite Israel's high TFR — Phase 1 of the threshold model.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "santi2025", country: "Global", study: "Santi et al. 2025 (meta-analysis)", n: "1,064,891", rate: "p = 0.033", finding: "Largest meta-analysis ever. Both T AND LH declining independent of age, BMI, and assay method. No BMI temporal trend in this population. 'Ongoing resetting of HPG function.' First to confirm simultaneous T + LH decline.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "andersson-2007-denmark", country: "Denmark", study: "Andersson et al. 2007", n: "5,350", rate: "null after BMI", finding: "Decline disappeared after BMI adjustment. BERM interpretation: mediated pathway dominates in this population — BMI adjustment removes the dominant signal. Consistent with mediator model, not a contradiction.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Supports mediator hypothesis: when BMI pathway dominates, BMI-adjustment produces null." },
      { referenceId: "nyante2012_nhanes", country: "USA", study: "Nyante et al. 2012 (NHANES)", n: "2,315", rate: "no decline found", finding: "NHANES 1988–2004. No decline found. May reflect assay change + mediator removal. Does not contradict Travison — different population, different assay, different adjustment strategy.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Consistent with mediator model in specific subpopulation." },
    ],
    tDeclineImplication: "If testosterone continues declining at current rates, every country will eventually cross the biological threshold where subfertility becomes the binding constraint on TFR — regardless of cultural or economic factors.",
    tDeclineBmiNote: "Why 'null' results are not contradictions: BMI can be either a confounder (independent cause) or a mediator (on the causal pathway). If EMF simultaneously drives both BMI increase and T decline, then BMI is a mediator and adjusting for it removes real signal. Mazur 2013 demonstrates this: weight-stable men still lost 19% of their testosterone. The direct pathway accounts for approximately two-thirds of the total decline; the mediated pathway (via BMI) accounts for approximately one-third.",
    tDeclineLink: "Full threshold model specification",
    tDeclinePredLink: "T→TFR predictions",

    metabTitle: "Metabolic Syndrome: Six Converging Pathways",
    metabLead: "Six independent EMF → Ca²⁺ pathways simultaneously increase energy intake, decrease energy expenditure, and increase energy storage. CaMKII is the convergence molecule connecting all pathways. Obesity is multifactorial — EMF is ONE contributing factor explaining the residual that diet, exercise, and genetics alone cannot account for.",
    metabStudies: [
      { referenceId: "alshammari2022", authors: "Alshammari et al.", year: 2022, journal: "Nutrients", finding: "RF-EMF → hypothalamic disruption → food intake ↑ in humans and rats", mechanism: "1: Appetite", level: "E" },
      { referenceId: "chen2016_glia", authors: "Chen et al.", year: 2016, journal: "eLife", finding: "Ca²⁺ activation of ARC glia → AgRP/NPY ↑ → food intake ↑ (direct Ca²⁺→appetite link)", mechanism: "1: Appetite", level: "E" },
      { referenceId: "maalouf2023", authors: "Maalouf et al.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT thermogenesis ↓, mitochondrial activity ↓ (dose-response)", mechanism: "2: BAT", level: "E" },
      { referenceId: "5g_bat2025", authors: "French group", year: 2025, journal: "IJMS", finding: "5G (3.5 GHz) → PRDM16 −49%, C/EBPβ −32% (brown adipogenesis markers)", mechanism: "2: BAT", level: "E" },
      { referenceId: "bhatt2012_glp1", authors: "Bhatt et al.", year: 2012, journal: "PLoS ONE", finding: "GLP-1 activates ERK via L-type VGCC Ca²⁺ microdomain in β-cells", mechanism: "3: Insulin", level: "E" },
      { referenceId: "nifedipine_weight2011", authors: "Matsui et al.", year: 2011, journal: "Hypertension Res", finding: "Nifedipine (L-type blocker) → weight ↓, PGC-1α ↑ (inverse pharmacological test)", mechanism: "Inverse", level: "E" },
      { referenceId: "screentime_meta2022", authors: "Haghjoo et al.", year: 2022, journal: "BMC Primary Care", finding: "44 studies: screen time → overweight OR 1.273 (dose-response)", mechanism: "All", level: "E" },
      { referenceId: "klimentidis2010", authors: "Klimentidis et al.", year: 2010, journal: "Proc R Soc B", finding: "24 populations, 8 species, >20,000 animals ALL gaining weight (p = 1.2×10⁻⁷)", mechanism: "All", level: "E" },
    ],
    metabKlimentidisTitle: "The Klimentidis Paradox",
    metabKlimentidisP1: "Laboratory animals on controlled diets have been gaining weight for decades. Wild rats in cities are getting fatter. Pet dogs and cats show the same trend. The probability of this occurring by chance across 24 populations and 8 species is p = 1.2 × 10⁻⁷.",
    metabKlimentidisP2: "Diet is controlled out (lab animals). Exercise is controlled out (lab animals). Genetics are controlled out (inbred strains). Endocrine disruptors (BPA, phthalates) are possible but do not explain wild rats AND lab animals AND pets simultaneously. The only environmental factor that has increased across ALL of these environments is electromagnetic field exposure.",
    metabKlimentidisNote: "Klimentidis et al. did NOT study EMF. The researchers suggested \"as-of-yet unidentified factors.\" The EMF interpretation is BERM's derivation, not theirs.",
    metabModelLink: "CaMKII convergence model",
    metabPredLink: "Metabolic predictions",
    svgStandardVsBerm: "Standard vs BERM",
    svgStandard: "STANDARD",
    svgWeakNoEffect: "Weak field → No effect",
    svgWeakAmplified: "Weak field → Amplified at membrane",
    svgNoDoseResponse: "No dose-response → No mechanism",
    svgWindowEffect: "Window effect → Resonance",
    svgMixedResults: "Mixed results → Inconclusive",
    svgModerators: "Uncontrolled moderators → Predictable",
    svgTrueEffect: "True effect",
    svgVsZero: "vs. zero exposure",
    svgLabBaseline: "Lab baseline",
    svgControlContam: "Control contam.",
    svgSarThreshold: "SAR threshold",
    svgPubBias: "Publication bias",
    svgMediatorAdj: "Mediator adj.",
    svgBiasesNote: "15+ identified biases attenuate observed effect",
    svgObserved: "Observed",
    svgSameStudy: "Same study → different conclusion depending on assumed bias model",
    standardInterpretation: "Standard interpretation",
    svgNullResult: "Null result = no effect",
    svgHighSar: "High SAR only = thermal",
    svgGdpProxy: "GDP > EMF proxy",
    svgLinearDose: "Linear dose-response",
    bermInterpretation: "BERM interpretation",
    svgContaminated: "Contaminated control group",
    svgWindowAdey: "Window effect (Adey/Blackman)",
    svgGdpBadControl: "GDP = bad control (Pearl 2009)",
    svgNonMonotonic: "Non-monotonic response",
    subPagesTitle: "Thematic evidence pages",
    subPagesLead: "Detailed analyses where individual studies are synthesized into mechanistic arguments. Each narrative synthesizes published findings; none establishes a population-level causal coefficient.",
    researchDomainsTitle: "11 independent research domains",
    convergenceDiagram: "Convergence diagram",
    bioActivity: "bio-activity",
    deviceLabel: "Device",
    channelLabel: "Channel",
    belowLabel: "below",
    outcomeLabel: "Outcome",
    levelLabel: "Level",
    mechanismLabel: "Mechanism",
    sarComparisonLabel: "SAR comparison",
    ccbContraLabel: "Calcium channel blocker contraindication",
    countryLabel: "Country",
    studyLabel: "Study",
    rateLabel: "Rate",
    tierLabel: "Tier",
    findingTableLabel: "Finding",
    causalAnalysisLabel: "Causal analysis",
    authorsLabel: "Authors",
    yearLabel: "Year",
    tDeclineForestPlot: "Testosterone decline forest plot",
    tDeclineMeanRate: "mean −1.0%/yr",
    tDeclineDenmark: "Denmark (Andersson)",
    tDeclineFinland: "Finland (Perheentupa)",
    tDeclineGlobal: "Global (Santi)",
    tDeclineRateUnit: "%/yr",
    metabMatrixLabel: "Metabolic evidence matrix",
    weightLabel: "Weight",
    insulinLabel: "Insulin",
    directLabel: "Direct",
    indirectLabel: "Indirect",
    notTestedLabel: "Not tested",
    populationsWord: "populations",
    speciesWord: "species",
    appetiteLabel: "Appetite↑",
    sleepDownLabel: "Sleep↓",
    microbiomeLabel: "Microbiome",
    cortisolLabel: "Cortisol",
    metabolicSyndromeLabel: "Metabolic syndrome",
    klimentidisAllGaining: "24 populations, 8 species — all gaining weight (p = 1.2×10⁻⁷)",
    citationLabel: "Citation",
    researcherLabel: "Researcher",
    criticismLabel: "Criticism",
    mechanismNowLabel: "Mechanism (now)",
    nextLinkLabel: "Next",
    nextLinkTitle: "Criticism and responses",
    researchDomainsLead: "BERM's mechanistic pathways draw on 11 mutually independent research domains. No single domain is sufficient, but their convergence on the same prediction — biological activity of electromagnetic fields — is unlikely by chance.",
    cry2PathwayNote: "CRY2's downstream effects extend beyond the circadian clock. Yap et al. (2025) showed that CRY2 physically interacts with TRPC1, a TRP-family cation channel, and that this complex co-translocates to the nucleus after PEMF exposure. This calcium entry pathway is CRY2-dependent (blocked by CRY2 silencing), light-dependent (lost in darkness), and FAD-dependent (attenuated by RFK silencing) — all hallmarks of the RPM mechanism. Importantly, TRPC1 is NOT a voltage-gated calcium channel and is NOT blocked by L-type VGCC blockers. This means pathways A and C (site's B) remain pharmacologically separable, but pathway C's biological footprint is larger than previously assumed.",
    solarTitle: "Solar Cycle & Geomagnetic Biology: The 11th Convergence Line",
    solarIntro: "BERM defines two independent susceptibilities: χ(Ā) (VGCC, geometric field coupling) and χ_B (CRY/RPM, radical-pair spin dynamics). The solar cycle tests χ_B because it operates WITHOUT an electrification threshold — solar-driven geomagnetic variations have modulated radical-pair chemistry for billions of years, long before anthropogenic EMF. If CRY-mediated pathways are real, their signatures should appear in solar-cycle-length biological rhythms.",
    solarResearchLabel: "Key research evidence",
    solarStudies: [
      { authors: "Randall", year: "1990/1993", finding: "11-year birth rate periodicity detected in 7 countries", mechanism: "Population endpoint" },
      { authors: "Skjærvø et al.", year: "2015", finding: "Pre-industrial Norway (1676–1878, N=8,662): individuals born at solar maximum lived 5.2 years shorter", mechanism: "Lifespan endpoint" },
      { authors: "Burch et al.", year: "1999", finding: "Geomagnetic disturbance → reduction in melatonin metabolite (6-OHMS) excretion", mechanism: "Melatonin suppression" },
      { authors: "Weydahl et al.", year: "2001", finding: "Melatonin suppression effect strongest at 70°N (auroral oval)", mechanism: "Latitude gradient" },
      { authors: "Ferrari et al.", year: "2015", finding: "Bee homing losses 2.7× on geomagnetic storm days", mechanism: "CRY navigation" },
      { authors: "Selås", year: "2004", finding: "r² = 0.84 correlation: moth abundance vs. sunspot number", mechanism: "Ecological endpoint" },
      { authors: "Chizhevsky", year: "1922", finding: "80% of 2,500 historical mass movements cluster around solar maxima", mechanism: "Behavioral endpoint" },
    ],
    solarStatTitle: "Statistical results",
    solarBandpass: "Bandpass 8–14 yr: r = +0.58 (p < 0.0001) USA birth rate; r = +0.81 in 1960–2000 sub-window",
    solarFirstDiff: "First-difference: Δ-SSN vs Δ-CBR r = +0.20 (p = 0.032) at lag 0",
    solarMonteCarlo: "Monte Carlo p = 0.997 — prediction-consistent direction confirmed by randomization test",
    solarReversal: "Direction reversal 1998: r_before = +0.21 (1933–1997), r_after = −0.55 (1998–2022). The sign change coincides with the RF-saturation transition.",
    solarSamaTitle: "SAMA: The Natural Control Experiment",
    solarSamaP1: "The South Atlantic Magnetic Anomaly (SAMA) is a region where Earth’s magnetic field is approximately 24 µT — roughly half the normal ~50 µT. This naturally weakened field creates a control experiment in geomagnetic geometry.",
    solarSamaP2: "ESS 2026 analysis: the solar wind–violence correlation that holds across most latitudes REVERSES in Brazil and Uruguay — exactly the populations under the SAMA. Where geomagnetic geometry changes, biological response inverts.",
    solarNorthernTitle: "The Northern Package: Three Traits, One Molecular Target",
    solarNorthernP1: "Three traits co-selected in Northern European populations converge on a single molecular target — cryptochrome (CRY):",
    solarNorthernTraits: [
      "Blue eyes → 100× light transmission through iris → χ_optical (more photons reach retinal CRY)",
      "Lactose tolerance → B2/FAD dietary supply → CRY cofactor stability → χ_molecular",
      "High geomagnetic latitude → strong ambient field → χ_geomagnetic",
    ],
    solarNorthernP2: "The vitamin D hypothesis explains 2 of 3 traits (light-colored eyes and high latitude select for UV absorption). The CRY hypothesis explains all 3 — including the otherwise anomalous linkage of lactose tolerance to eye color.",
    solarDendroTitle: "Deep-Time Confirmation: Dendrochronology",
    solarDendroP1: "The solar cycle is not a modern phenomenon. Tree-ring records confirm its continuous operation across geological time:",
    solarDendroStudies: [
      "Luthardt & Rößler 2018: 290-million-year-old petrified forest shows 10.62 ± 0.08 yr growth cycles — solar periodicity preserved in Permian wood.",
      "Brehm et al. 2021: 1,000 years of continuous ¹⁴C tree-ring data independently confirms solar modulation of cosmogenic isotope production.",
      "Nature Communications 2025: First millennium BCE confirmation extends the continuous record, closing the gap between ancient and modern solar cycles.",
    ],
    solarDendroP2: "The biological clock that BERM’s χ_B pathway responds to has been running without interruption for at least 290 million years.",
  },
  fi: {
    title: "Evidenssirekisteri",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} rajattua BERM v17 -tietuetta ja ${LEGACY_EVIDENCE_COUNT} laajennetun katalogin tietuetta 13+ polulla ja 490+ vertaisarvioidussa tutkimuksessa.`,
    interpretationTitle: "Kuinka rekisteriä luetaan",
    interpretation: [
      "Kenttäallekirjoitus voi tukea mittausmuuttujaa, kuten taustavektoria, kulmaa, spektriä tai verhokäyrää; se ei osoita ihmisen hedelmällisyysvaikutusta.",
      "Solu- tai eläinkoe voi tukea mekanistista väliporrasta tai elinpäätepistettä omissa oloissaan; se ei automaattisesti ole ihmisväestön estimaatti.",
      "Katsaus paikantaa tutkimuskokonaisuuden. Väestön ajoitustulos on kuvaileva, ellei kohdistettu FieldState, päätepiste ja sekoittajien hallinta ole mukana.",
      "Mikään alla oleva tietue ei ole TFR-kerroin. Maakohtainen TFR-reitti tarvitsee erilliset ASFR- ja demografiset termit mallin määrittelyn mukaisesti.",
    ],
    boundedTitle: "Rajatut v2-tietueet",
    boundedLead: "Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Nämä ovat BERM v17 -kausaalireitin ensisijaiset evidenssitietueet.",
    classificationTitle: "Miten aiemmin negatiiviset havainnot luokittuvat",
    channelGroupTitle: "Kolme taajuuskanavaa",
    channelGroupLead: "Jokainen biologinen polku kuuluu yhteen kolmesta taajuuskanavasta, jotka määrittyvät kahdella biologisella rajataajuudella: f_c ~ 1 kHz (kalvon RC) ja f_RPM ~ 1 MHz (radikaaliparimekanismin koherenssi).",
    extendedTitle: "Laajennettu evidenssikatalogi",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} lisätietuetta BERM v17 -bibliografiasta, säilytetty lähdetason tarkistusta varten. Jokainen on luokiteltu legacy-polun, evidenssitason ja migraatiostatuksen mukaan.`,
    groups: {
      PHYSICS_SIGNATURE: "Fysiikan allekirjoitukset",
      MECHANISTIC_INTERMEDIATE: "Mekanistiset välivaiheet",
      REPRODUCTIVE_ENDPOINT: "Lisääntymisen päätepisteet",
      ECOLOGICAL_ENDPOINT: "Ekologiset päätepisteet",
      SYSTEMATIC_REVIEW: "Systemaattiset katsaukset",
      POPULATION_DESCRIPTIVE: "Väestötason kuvaileva data",
    },
    fields: { nodes: "Kausaalisolmut", field: "Kenttäluokka", scope: "Tulkintaraja", limitations: "Rajoitukset", role: "Kalibrointirooli", source: "DOI / lähde" },
    structural: "Vain rakenne",
    contextual: "Vain konteksti",
    anchorTitle: "Mekanistiset ankkurit",
    anchorP1: "[[ref:kalmijn1971|Kalmijn (J. Exp. Biol. 1971)]] osoitti, että rustokalat (hait ja rauskut) havaitsevat luotettavasti sähkökenttiä jopa 5 nV/cm (5 × 10⁻⁷ V/m) tasolla Lorenzinin ampulliensa kautta. Tämä kynnys on selvästi alle BERM:n käyttämän IFO-VGIC-herkkyyden — selkärankaisen hermosto prosessoi kenttiä intensiteeteillä, joita nykyiset turvallisuusstandardit pitävät biologisesti inertteinä.",
    anchorP2: "Lorenzinin ampullat käyttävät ionikanavan konduktanssimuutosta — fysikaalisesti analogista VGCC:n porttidynamiikan kanssa. Tämä ei ole eri mekanismi herkemmässä eläimessä; se on sama mekanismi (ionikanavan häiriö heikkojen sähkökenttien vaikutuksesta) ilmaistuna eri kudoksessa. Kenttäherkkyyden fylogeneettinen konservaatio 10⁻⁵–10⁻⁷ V/m alueella selkärankaisissa kumottaa suoraan 'kentät liian heikkoja biologialle' -vastaväitteen.",
    anchorNote: "Rustokalakalojen sähköreseptio on vakiintunut aistintoiminto, jota ei kiistetä. Ekstrapolaatio nisäkkäiden VGCC-herkkyyteen on BERM-tulkinta — Lorenzinin ampulla on erikoistunut aistielin, jonka geometria on optimoitu kenttien havaitsemiseen, mitä nisäkkäiden kudoksilta puuttuu. Analogia on mekanistinen (molemmat käyttävät ionikanavan konduktanssia), ei anatominen.",
    animalTitle: "Eläinevidenssi: Kontrolloidut EMF-kokeet",
    animalP1: "[[ref:rodriguez2003|Rodriguez ym. (J. Reprod. Fert. 2003)]] altistivat lypsyhiehoja 60 Hz EMF:lle (10 kV/m, 30 µT) kontrolloidussa kokeessa McGill-yliopistossa. Tulokset: melatoniini laski (EMF toimii keinotekoisena 'pitkän päivän' signaalina), kiimakierron kesto piteni (p < 0,01) ja luteaalivaihe piteni (p < 0,01). [[ref:burchard2002|Burchard ym. (J. Dairy Sci. 2002)]] havaitsivat saman EMF-altistuksen nostavan IGF-1:tä ja kuiva-ainesyöntiä.",
    animalP2: "Tämä on suoraa kokeellista näyttöä siitä, että ELF-kentät ympäristötasoilla muuttavat suurten nisäkkäiden lisääntymisendokrinologiaa. Lypsykarja on kuitenkin altistunut vakaalle navetan ELF:lle sähköistämisestä lähtien (~1950-luku). Jalostusvalintapaine on ~3 kertaluokkaa suurempi kuin mikään EMF-vaikutus. Siksi karja luokitellaan oikein negatiiviseksi kontrolliksi BERM:n sentinellirekisterissä — EMF ON biologisesti aktiivinen, mutta valinta peittää sen.",
    animalP3: "Harajännitekirjallisuus (milliampeerien kontaktivirrat viallisesta johdotuksesta) on ortogonaalinen. Rodriguez mittasi kroonista kenttäaltistusta (µT), ei akuuttia kontaktivirtaa (mA). Vain Rodriguez-tyyppiset tutkimukset testaavat BERM:n mekanismia — kroonisia matalan tason ELF-kenttävaikutuksia lisääntymisendokrinologiaan.",
    animalNote: "Rodriguez/Burchard-kokeet ovat vertaisarvioituja kontrolloituja tutkimuksia selkeillä biologisilla päätepisteillä. Negatiivinen kontrolli -luokitus karjalle koskee väestötason laskun havaitsemista (valinta peittää signaalin), ei sitä onko ELF biologisesti aktiivinen (on). Amish- vs. tavanomainen lypsykarjavertailu — jossa amish-navetoissa on matalampi ELF — olisi seuraava informatiivinen testi.",
    catsperTitle: "CatSper: Korvaamaton kanava",
    catsperLead: "Yhdeksän kalsiumriippuvaista vaihetta kattaa siittiön tuotannosta hedelmöitykseen. CatSper vaaditaan jokaisessa vaiheessa — kapasitaatio, reotaksis, termotaksis, kemotaksis ja akrosomireaktio — eikä sillä ole biologista varakanavaa. CatSper-poistogeeni missä tahansa testatusta lajista tuottaa täydellisen miehen infertiliteetin.",
    catsperP1: "CatSper on ainoa siittiöspesifinen kalsiumkanava. Se on jänniteohjattu, pH-herkkä, lämpötilaohjattu (Q₁₀ = 5,1, kynnys 33,5 °C) ja reagoi pikomolaariseen progesteroniin cumulus-soluista. EMF:n aiheuttama Ca²⁺-dysregulaatio häiritsee tarkkaa ajoitusta, jota CatSper vaatii — ennenaikainen aktivaatio kuluttaa rajalliset energiavarastot ennen kuin siittiö saavuttaa munasolun.",
    catsperP2: "CATSPER2⁻/⁻-miehillä progesteronin indusoima hyperaktivaatio on kumoutunut, hedelmöitys epäonnistuu sekä in vivo että in vitro ([[ref:catsper_human|JCI 2024]]). Farmakologinen profiili on yhdenmukainen: CatSper-salpaajat (NNC55-0396) tuottavat samat motiliteetti- ja akrosomireaktiovajavuudet kuin EMF-altistus ([[ref:pmc6104424_nnc|Rennhack ym. 2018]]).",
    catsperEvolution: "CatSper on konservoitunut merisiilistä ihmiseen — sama kanava ohjaa hedelmöitystä 600 miljoonan vuoden evoluution yli. Vesilajit (merisiili, lohi) käyttävät CatSperia ulkoisessa hedelmöityksessä, jossa merenalaisten kaapeleiden EMF tarjoaa luonnollisen kokeen.",
    catsperDetailLink: "Täydellinen 9-vaiheinen reproduktiivinen navigointiketju",
    sentinelTitle: "Sentinelli- ja lajienvälinen evidenssi",
    sentinel: "Cross-Species Lag Index on valmiusprotokolla, joka yhdistää alueelliset vasteet, mitatun FieldStaten ja päätepistekovariaatit rekisteröityyn lajienväliseen testiin.",
    sentinelGradient: "Seitsemässä lajissa, joilla on kvantifioitava lisääntymislaskuaste, laskuaste korreloi EMF-altistusarvon kanssa tasolla r = 0,909. Koirat ([[ref:lea2016|Lea ym. 2016]]): −1,0 %/v siittiölasku 26 vuoden aikana brittiläisissä siitoskoirissa, jotka jakavat kodin EMF-altistuksen. Hevoset ([[ref:harris2023|Harris ym. 2023]]): −0,75 %/v oriiden siittiölasku 35 vuoden aikana. Kuvio ulottuu mehiläisiin, lintuihin, sammakoihin ja vesilajeihin — kukin laskee aikajanalla, joka on suhteessa niiden sähkömagneettiseen ympäristöön.",
    sentinelTLink: "Tämä lajienvälinen gradientti liittyy suoraan ihmisillä dokumentoituun sekulaariseen testosteronilaskuun: sama EMF-mekanismi (VGCC → Ca²⁺ → lisääntymishäiriö) toimii koirissa, jotka jakavat kotiympäristömme EMF-altistuksen, ja tuottaa saman ~1 %/v laskuasteen. T→TFR-viive 8 vuotta tarjoaa ajallisen kalibroinnin — maat, joissa sähköistys tapahtui aiemmin, voivat osoittaa aikaisemman T-laskun alkamisen (ennuste T-1).",
    sentinelGradientStat: "r = 0,909",
    sentinelGradientLabel: "Lajienvälinen EMF-gradientti (7 lajia)",
    sentinelLink: "Katso sentinellin valmiustila",
    sentinelTDeclineLink: "Testosteronilaskun evidenssi",
    extPathway: "Polku",
    extLevel: "Evidenssitaso",
    extStatus: "Migraatiostatus",
    extScope: "Tulkintaraja",
    extN: "N",
    dualInterpretationTitle: "Evidenssin tulkinta: Standardi- vs. BERM-kehys",
    dualInterpretationLead: "Sama tutkimus voi tukea vastakkaisia johtopäätöksiä riippuen siitä, mitkä vinoumat oletetaan. Tämä taulukko näyttää miten standardi- ja BERM-korjattu kehys lukevat samoja evidenssityyppejä.",
    dualInterpretationHeaders: { evidence: "Evidenssityyppi", standard: "Standarditulkinta", berm: "BERM-tulkinta" },
    dualInterpretationRows: [
      {
        evidence: "Tutkimus ei löydä merkitsevää EMF-vaikutusta",
        standard: "EMF on turvallinen testatuilla tasoilla. Ei biologista mekanismia.",
        berm: "Kontrolliryhmä on kontaminoitu (laboratorion lähtötasovinouma). Vaimennusvinouma pienentää näennäistä vaikutusta. Nollatulos on odotettavissa jos todellinen nolla-altistuskontrolli puuttuu.",
      },
      {
        evidence: "Tutkimus löytää EMF-vaikutuksen vain korkealla SAR:lla",
        standard: "Vaikutus on terminen. Vahvistaa ICNIRP-kynnykset.",
        berm: "Annos-vastekäyrässä voi olla ikkunavaikutus (Adey/Blackman). Vaikutus korkealla SAR:lla ei sulje pois vaikutusta matalalla SAR:lla — ei-monotoniset vasteet ovat RPM:n ennustamia.",
      },
      {
        evidence: "WHO:n systemaattinen katsaus arvioi varmuuden 'kohtalaiseksi'",
        standard: "Evidenssi on kohtalaista. Lisää RCT:itä tarvitaan.",
        berm: "WHO:n metodologia on alttiina 15+ tunnistetulle vinoumalle, jotka kaikki vaimentavat näennäistä vaikutusta. 'Kohtalainen' vinoumille alttiissa kehyksessä voi vastata 'korkeaa' vinoumakorjatussa kehyksessä.",
      },
      {
        evidence: "BKT korreloi TFR:n kanssa paremmin kuin EMF-proxy",
        standard: "BKT/kehitys on todellinen ajuri. EMF on kehityksen proxy.",
        berm: "BKT on 'huono kontrolli' (Pearl 2009): sähköistys aiheuttaa sekä BKT:n että EMF:n. BKT:n kontrollointi poistaa kiinnostuksen kohteena olevan kausaalivaikutuksen (mukaan otetun mediaattorin vinouma).",
      },
      {
        evidence: "Tutkimus näyttää positiivisen EMF-vaikutuksen (esim. ROS-nousu)",
        standard: "Mielenkiintoista mutta vaatii replikaation. Vaikutuskoko voi olla pieni.",
        berm: "Vaikutuskoko on aliarvioitu laboratorion lähtötasovinouman vuoksi. Todellinen vaikutus altistamattomaan lähtötasoon nähden on suurempi kuin raportoitu.",
      },
      {
        evidence: "RPM ei voi selittää vaikutuksia telecom-taajuuksilla",
        standard: "CRY/RPM-polku on merkityksetön matkapuhelimille.",
        berm: "Oikein RF-kantoaallosta. Mutta telecom-signaalit sisältävät ELF-modulaation (GSM 217 Hz) RPM:n resonanssialueella. RPM reagoi modulaatioverhokäyrään, ei kantoaaltoon. Sähkökenttävaikutukset välittyvät polun A (VGIC) kautta.",

      },
      {
        evidence: "TFR-ennusteen LV ylittyi",
        standard: "Malli on väärä. Ennusteet epäonnistuivat.",
        berm: "Kolme mahdollisuutta: (a) malli yliarvioi, (b) eksogeeninen kompensaatio (maahanmuutto, IVF, politiikka), (c) LV liian kapea. Diskriminoivat testit olemassa jokaiselle.",
      },
    ],
    theraBionicTitle: "Kliininen validointi: TheraBionic",
    theraBionicLead: "FDA-hyväksytty lääkinnällinen laite vahvistaa BERM:n ydinmekanismin altistustasoilla, jotka ovat selvästi nykyisten turvallisuusstandardien alapuolella.",
    theraBionicBody: "TheraBionic P1 on FDA-hyväksytty lääkinnällinen laite (HDE H220001, 2019), joka hoitaa edennyttä maksasyöpää (hepatosellulaarinen karsinooma) amplitudimoduloiduilla radiotaajuisilla sähkömagneettisilla kentillä 27,12 MHz:n taajuudella.",
    theraBionicMechanism: "Laite toimii TÄSMÄLLEEN BERM:n kuvaamalla mekanismilla: ei-terminen EMF → Cav3.2 T-tyypin jänniteherkät kalsiumkanavat → Ca²⁺-sisäänvirtaus → biologinen vaikutus (kasvainsolujen differentiaatio). Tämän osoittivat Jimenez et al. (2019) eBioMedicine/Lancet-lehdessä.",
    theraBionicSAR: "Laite toimii SAR-tasoilla, jotka ovat 100–1 000× ALLE matkapuhelimen altistuksen. Tämä vahvistaa, että ei-terminen EMF voi tuottaa merkittäviä biologisia vaikutuksia jänniteherkän kalsiumkanavan kautta altistustasoilla, jotka ovat selvästi nykyisten turvallisuusstandardien (ICNIRP/FCC) alapuolella.",
    theraBionicCCB: "FDA-merkintä nimenomaisesti toteaa, ettei TheraBionic-laitetta saa käyttää kalsiumkanavasalpaajien kanssa — farmakologinen vahvistus siitä, että terapeuttinen vaikutus toimii kalsiumkanavien kautta.",
    theraBionicImplication: "Tämä ei ole BERM:n ennuste. Se on itsenäisesti kehitetty, kliinisesti validoitu, FDA-hyväksytty vahvistus siitä, että ei-terminen EMF tuottaa biologisia vaikutuksia jänniteherkän kalsiumkanavan kautta.",
    theraBionicSurvival: "34 % elinajan pidentyminen edenneessä HCC:ssä",
    theraBionicDevice: "27,12 MHz AM-RF, kasvainspesifiset taajuudet",
    theraBionicChannel: "Cav3.2 (CACNA1H) T-tyypin VGCC",
    theraBionicLevel: "E — FDA-hyväksytty, vertaisarvioitu (Lancet/eBioMedicine)",
    tDeclineTitle: "Testosteronin lasku: Maiden välinen evidenssi",
    tDeclineLead: "Ikäriippumaton sekulaarinen testosteronin lasku on dokumentoitu viidessä maassa neljällä mantereella. Kuvio on yhdenmukainen: ~1 %/vuosi lasku riippumatta ikääntymisestä, BMI-trendeistä tai elämäntapasekoittajista. Tutkimukset, jotka löysivät 'ei laskua' BMI-korjauksen jälkeen, ovat yhdenmukaisia mediaattorimallin kanssa: BMI on kausaalireitillä, ei itsenäinen sekoittaja, joten sen korjaaminen poistaa todellista signaalia.",
    tDeclineStudies: [
      { referenceId: "travison2007_v2", country: "USA", study: "Travison ym. 2007 (MMAS)", n: "1 532", rate: "−1,0 %/v", finding: "Väestötason T-lasku 1987–2004. Ikäriippumaton: 65-vuotiaan T oli 2002 matalampi kuin 65-vuotiaan T 1987. BMI-korjattu — kuvaa vain suoraa reittiä.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "mazur2013", country: "USA", study: "Mazur ym. 2013 (PLOS ONE)", n: "991", rate: "−0,95 %/v", finding: "Painonsa säilyttäneet US Air Force -veteraanit menettivät 117 ng/dL (19 %) 20 vuodessa. Poissulkee lihavuuden riittävänä selityksenä — ratkaiseva todiste mediaattoritulkinnalle.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "perheentupa2013", country: "Suomi", study: "Perheentupa ym. 2013", n: "3 271", rate: "−1,2 %/v", finding: "37 %:n kohorttisidonnainen T-lasku (1972–2002). LH ja FSH myös laskivat myöhemmissä kohorteissa. Suomen TFR romahti 35 vuotta myöhemmin.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "chodick-2020-israel", country: "Israel", study: "Chodick ym. 2020", n: "102 334", rate: "−1,02 %/v", finding: "Suurin yksittäistutkimus: 102k miestä, Maccabi Healthcare. 'Epätodennäköistä, että kasvava lihavuus selittää.' T laskee Israelin korkeasta TFR:stä huolimatta — kynnysmallin vaihe 1.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "santi2025", country: "Globaali", study: "Santi ym. 2025 (meta-analyysi)", n: "1 064 891", rate: "p = 0,033", finding: "Suurin koskaan tehty meta-analyysi. Sekä T ETTÄ LH laskevat iästä, BMI:stä ja mittausmenetelmästä riippumatta. Ei BMI:n ajallista trendiä tässä populaatiossa. 'HPG-funktion jatkuva uudelleenasetus.' Ensimmäinen T + LH samanaikaisen laskun vahvistus.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "andersson-2007-denmark", country: "Tanska", study: "Andersson ym. 2007", n: "5 350", rate: "null BMI:n jälkeen", finding: "Lasku hävisi BMI-korjauksen jälkeen. BERM-tulkinta: medioitu reitti dominoi tässä populaatiossa — BMI-korjaus poistaa dominoivan signaalin. Yhdenmukainen mediaattorimallin kanssa, ei ristiriita.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Tukee mediaattorihypoteesia: kun BMI-reitti dominoi, BMI-korjaus tuottaa nollan." },
      { referenceId: "nyante2012_nhanes", country: "USA", study: "Nyante ym. 2012 (NHANES)", n: "2 315", rate: "ei laskua havaittu", finding: "NHANES 1988–2004. Ei laskua. Voi heijastaa mittausmenetelmän muutosta + mediaation poistoa. Ei ole ristiriidassa Travisonin kanssa — eri populaatio, eri mittaus, eri korjausstrategia.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Yhdenmukainen mediaattorimallin kanssa tietyssä alipopulaatiossa." },
    ],
    tDeclineImplication: "Jos testosteroni jatkaa laskuaan nykyisellä tahdilla, jokainen maa ylittää lopulta biologisen kynnyksen, jossa subfertiliteetti muuttuu TFR:n sitovaksi rajoitteeksi — riippumatta kulttuurisista tai taloudellisista tekijöistä.",
    tDeclineBmiNote: "Miksi 'nolla'-tulokset eivät ole ristiriitoja: BMI voi olla joko sekoittaja (itsenäinen syy) tai mediaattori (kausaalireitillä). Jos EMF aiheuttaa samanaikaisesti sekä BMI:n nousun että T:n laskun, BMI on mediaattori ja sen korjaaminen poistaa todellista signaalia. Mazur 2013 osoittaa tämän: vakiopainoiset miehet menettivät silti 19 % testosteroninsa. Suora reitti kattaa noin kaksi kolmasosaa kokonaisvaikutuksesta; medioitu reitti (BMI:n kautta) noin kolmanneksen.",
    tDeclineLink: "Kynnysmallin koko määrittely",
    tDeclinePredLink: "T→TFR-ennusteet",

    metabTitle: "Metabolinen syndrooma: kuusi konvergoivaa reittiä",
    metabLead: "Kuusi itsenäistä EMF → Ca²⁺ -reittiä lisää samanaikaisesti energian saantia, vähentää energiankulutusta ja lisää energian varastointia. CaMKII on konvergenssimolekyyli, joka yhdistää kaikki reitit. Lihavuus on monitekijäinen — EMF on YKSI myötävaikuttava tekijä, joka selittää residuaalin, johon ruokavalio, liikunta ja genetiikka eivät yksin riitä.",
    metabStudies: [
      { referenceId: "alshammari2022", authors: "Alshammari ym.", year: 2022, journal: "Nutrients", finding: "RF-EMF → hypotalaaminen häiriö → ravinnonsaanti ↑ ihmisillä ja rotilla", mechanism: "1: Ruokahalu", level: "E" },
      { referenceId: "chen2016_glia", authors: "Chen ym.", year: 2016, journal: "eLife", finding: "ARC-glian Ca²⁺-aktivaatio → AgRP/NPY ↑ → ravinnonsaanti ↑ (suora Ca²⁺→ruokahaluyhteys)", mechanism: "1: Ruokahalu", level: "E" },
      { referenceId: "maalouf2023", authors: "Maalouf ym.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT-termogeneesi ↓, mitokondriaaktiivisuus ↓ (annos-vaste)", mechanism: "2: BAT", level: "E" },
      { referenceId: "5g_bat2025", authors: "Ranskalainen ryhmä", year: 2025, journal: "IJMS", finding: "5G (3,5 GHz) → PRDM16 −49 %, C/EBPβ −32 % (ruskean rasvan erilaistumismarkkerit)", mechanism: "2: BAT", level: "E" },
      { referenceId: "bhatt2012_glp1", authors: "Bhatt ym.", year: 2012, journal: "PLoS ONE", finding: "GLP-1 aktivoi ERK:n L-tyypin VGCC:n Ca²⁺-mikrodomeenin kautta β-soluissa", mechanism: "3: Insuliini", level: "E" },
      { referenceId: "nifedipine_weight2011", authors: "Matsui ym.", year: 2011, journal: "Hypertension Res", finding: "Nifedipiini (L-tyypin salpaaja) → paino ↓, PGC-1α ↑ (käänteinen farmakologinen koe)", mechanism: "Käänteinen", level: "E" },
      { referenceId: "screentime_meta2022", authors: "Haghjoo ym.", year: 2022, journal: "BMC Primary Care", finding: "44 tutkimusta: ruutuaika → ylipaino OR 1,273 (annos-vaste)", mechanism: "Kaikki", level: "E" },
      { referenceId: "klimentidis2010", authors: "Klimentidis ym.", year: 2010, journal: "Proc R Soc B", finding: "24 populaatiota, 8 lajia, >20 000 eläintä KAIKKI lihovat (p = 1,2×10⁻⁷)", mechanism: "Kaikki", level: "E" },
    ],
    metabKlimentidisTitle: "Klimentidisin paradoksi",
    metabKlimentidisP1: "Laboratoriorotat kontrolloidulla dieetillä ovat lihoneet vuosikymmeniä. Villit rotat kaupungeissa lihovat. Kotieläimet — koirat ja kissat — näyttävät saman trendin. Todennäköisyys sille, että tämä tapahtuu sattumalta 24 populaatiossa ja 8 lajissa on p = 1,2 × 10⁻⁷.",
    metabKlimentidisP2: "Dieetti on kontrolloitu pois (laboratoriorotat). Liikunta on kontrolloitu pois (laboratoriorotat). Genetiikka on kontrolloitu pois (inbredut kannat). Hormonihäiritsijät (BPA, ftalaatit) ovat mahdollisia mutta eivät selitä VILLEJÄ rottia JA laboratoriorottia JA kotieläimiä samanaikaisesti. Ainoa ympäristötekijä joka on lisääntynyt KAIKISSA näissä ympäristöissä on sähkömagneettinen kenttäaltistus.",
    metabKlimentidisNote: "Klimentidis ym. eivät tutkineet EMF:ää. Tutkijat ehdottivat \"toistaiseksi tunnistamattomia tekijöitä.\" EMF-tulkinta on BERM:n johdos, ei heidän.",
    metabModelLink: "CaMKII-konvergenssimalli",
    metabPredLink: "Metaboliset ennusteet",
    svgStandardVsBerm: "Standardi vs BERM",
    svgStandard: "STANDARDI",
    svgWeakNoEffect: "Heikko kenttä → Ei vaikutusta",
    svgWeakAmplified: "Heikko kenttä → Vahvistettu kalvolla",
    svgNoDoseResponse: "Ei annos-vastetta → Ei mekanismia",
    svgWindowEffect: "Ikkunavaikutus → Resonanssi",
    svgMixedResults: "Sekavat tulokset → Epäselvä",
    svgModerators: "Moderaattorit → Ennustettava",
    svgTrueEffect: "Todellinen",
    svgVsZero: "nollaskenaarion suhteen",
    svgLabBaseline: "Lab-lähtötaso",
    svgControlContam: "Kontrolli-kontam.",
    svgSarThreshold: "SAR-kynnys",
    svgPubBias: "Julkaisuvinouma",
    svgMediatorAdj: "Mediaattori",
    svgBiasesNote: "15+ tunnistettua vinoumaa vaimentavat havaittua vaikutusta",
    svgObserved: "Havaittu",
    svgSameStudy: "Sama tutkimus → eri johtopäätös riippuen oletetusta vinoumamallista",
    standardInterpretation: "Standarditulkinta",
    svgNullResult: "Nollatulos = ei vaikutusta",
    svgHighSar: "Korkea SAR = terminen",
    svgGdpProxy: "BKT > EMF-proxy",
    svgLinearDose: "Lineaarinen annos-vaste",
    bermInterpretation: "BERM-tulkinta",
    svgContaminated: "Kontaminoitu kontrolli",
    svgWindowAdey: "Ikkunavaikutus (Adey)",
    svgGdpBadControl: "BKT = huono kontrolli (Pearl)",
    svgNonMonotonic: "Ei-monotoninen vaste",
    subPagesTitle: "Temaattiset evidenssisivut",
    subPagesLead: "Yksityiskohtaiset analyysit joissa yksittäiset tutkimukset yhdistyvät mekanistisiksi argumenteiksi. Kukin narratiivi syntetisoi julkaistuja löydöksiä; mikään ei osoita väestötason kausaalikerrointa.",
    researchDomainsTitle: "11 riippumatonta tutkimusalaa",
    convergenceDiagram: "Konvergenssikaavio",
    bioActivity: "bio-aktiivisuus",
    deviceLabel: "Laite",
    channelLabel: "Kanava",
    belowLabel: "alle",
    outcomeLabel: "Tulos",
    levelLabel: "Taso",
    mechanismLabel: "Mekanismi",
    sarComparisonLabel: "SAR-vertailu",
    ccbContraLabel: "Kalsiumkanavasalpaaja-vasta-aihe",
    countryLabel: "Maa",
    studyLabel: "Tutkimus",
    rateLabel: "Tahti",
    tierLabel: "Taso",
    findingTableLabel: "Havainto",
    causalAnalysisLabel: "Kausaalianalyysi",
    authorsLabel: "Tutkijat",
    yearLabel: "Vuosi",
    tDeclineForestPlot: "Testosteronin lasku",
    tDeclineMeanRate: "keskiarvo −1,0 %/v",
    tDeclineDenmark: "Tanska (Andersson)",
    tDeclineFinland: "Suomi (Perheentupa)",
    tDeclineGlobal: "Globaali (Santi)",
    tDeclineRateUnit: "%/v",
    metabMatrixLabel: "Metabolinen evidenssimatriisi",
    weightLabel: "Paino",
    insulinLabel: "Insuliini",
    directLabel: "Suora",
    indirectLabel: "Epäsuora",
    notTestedLabel: "Ei testattu",
    populationsWord: "populaatiota",
    speciesWord: "lajia",
    appetiteLabel: "Ruokahalu↑",
    sleepDownLabel: "Uni↓",
    microbiomeLabel: "Mikrobioomi",
    cortisolLabel: "Kortisoli",
    metabolicSyndromeLabel: "Metabolinen syndrooma",
    klimentidisAllGaining: "24 populaatiota, 8 lajia — kaikki lihovat (p = 1.2×10⁻⁷)",
    citationLabel: "Viite",
    researcherLabel: "Tutkija",
    criticismLabel: "Kritiikki",
    mechanismNowLabel: "Mekanismi (nyt)",
    nextLinkLabel: "Seuraavaksi",
    nextLinkTitle: "Kritiikki ja vastaukset",
    researchDomainsLead: "BERM:n mekanistiset polut perustuvat 11 toisistaan riippumattomaan tutkimusalaan. Mikään yksittäinen ala ei riitä, mutta niiden konvergenssi samaan ennusteeseen — sähkömagneettisten kenttien biologinen aktiivisuus — on epätodennäköistä sattumalta.",
    cry2PathwayNote: "CRY2:n alaspäin suuntautuvat vaikutukset ulottuvat sirkadiaanisen kellon yli. Yap ym. (2025) osoittivat, että CRY2 on fysikaalisessa vuorovaikutuksessa TRPC1:n kanssa, TRP-perheen kationikanavan kanssa, ja että tämä kompleksi siirtyy yhdessä tumaan PEMF-altistuksen jälkeen. Tämä kalsiumsisäänvirtausreitti on CRY2-riippuvainen (estetään CRY2-hiljentämisellä), valoriippuvainen (häviää pimeässä) ja FAD-riippuvainen (vaimenee RFK-hiljentämisellä) — kaikki RPM-mekanismin tunnusmerkkejä. TRPC1 EI ole jänniteriippuvainen kalsiumkanava eikä L-tyypin VGCC-salpaajat estä sitä. Tämä tarkoittaa, että polut A ja C (sivuston B) pysyvät farmakologisesti erotettavissa, mutta polku C:n biologinen vaikutuskenttä on laajempi kuin aiemmin oletettiin.",
    solarTitle: "Aurinkosykli ja geomagneettinen biologia: 11. konvergenssilinja",
    solarIntro: "BERM määrittelee kaksi itsenäistä herkkyyttä: χ(Ā) (VGCC, geometrinen kenttäkytkentä) ja χ_B (CRY/RPM, radikaaliparin spin-dynamiikka). Aurinkosykli testaa χ_B:tä, koska se toimii ILMAN sähköistyskynnystä — auringon aiheuttamat geomagneettiset vaihtelut ovat moduloineet radikaaliparin kemiaa miljardeja vuosia, kauan ennen ihmisen tuottamia sähkömagneettisia kenttiä. Jos CRY-välitteiset polut ovat todellisia, niiden allekirjoitusten tulisi näkyä aurinkosyklin pituisissa biologisissa rytmeissä.",
    solarResearchLabel: "Keskeiset tutkimustulokset",
    solarStudies: [
      { authors: "Randall", year: "1990/1993", finding: "11 vuoden syntyvyysjaksollisuus havaittu 7 maassa", mechanism: "Väestöpäätepiste" },
      { authors: "Skjærvø ym.", year: "2015", finding: "Esi-teollinen Norja (1676–1878, N=8 662): aurinkosyklin maksimissa syntyneet elivät 5,2 vuotta lyhyempään", mechanism: "Eliniänpäätepiste" },
      { authors: "Burch ym.", year: "1999", finding: "Geomagneettinen häiriö → melatoniinimetaboliitin (6-OHMS) erityksen väheneminen", mechanism: "Melatoniinisuppressio" },
      { authors: "Weydahl ym.", year: "2001", finding: "Melatoniinisuppressiovaikutus voimakkain 70°N:ssa (revontulisoikea)", mechanism: "Leveysastegradientti" },
      { authors: "Ferrari ym.", year: "2015", finding: "Mehiläisten kotiinpaluuhäviöt 2,7× geomagneettisina myrskyinä", mechanism: "CRY-navigaatio" },
      { authors: "Selås", year: "2004", finding: "r² = 0,84 korrelaatio: yöperhosrunsaus vs. auringonpilkkuluku", mechanism: "Ekologinen päätepiste" },
      { authors: "Chizhevsky", year: "1922", finding: "80 % 2 500 historiallisesta joukkoliikehdinnästä klusteroituu aurinkosyklin maksimien ympärille", mechanism: "Käyttäytymispäätepiste" },
    ],
    solarStatTitle: "Tilastolliset tulokset",
    solarBandpass: "Kaistanpäästö 8–14 v: r = +0,58 (p < 0,0001) USA:n syntyvyys; r = +0,81 alijakso 1960–2000",
    solarFirstDiff: "Ensimmäinen differenssi: Δ-SSN vs Δ-CBR r = +0,20 (p = 0,032) viive 0",
    solarMonteCarlo: "Monte Carlo p = 0,997 — ennusteen mukainen suunta vahvistettu satunnaistamistestillä",
    solarReversal: "Suunnan kääntyminen 1998: r_ennen = +0,21 (1933–1997), r_jälkeen = −0,55 (1998–2022). Etumerkin muutos osuu samaan RF-saturaatiosiirtymän kanssa.",
    solarSamaTitle: "SAMA: Luonnollinen kontrollikoe",
    solarSamaP1: "Etelä-Atlantin magneettinen anomalia (SAMA) on alue, jossa Maan magneettikenttä on noin 24 µT — noin puolet normaalista ~50 µT:sta. Tämä luonnollisesti heikentynyt kenttä luo kontrolliasetelman geomagneettisessa geometriassa.",
    solarSamaP2: "ESS 2026 -analyysi: aurinkotuuli–väkivaltakorrelaatio, joka pätee useimmilla leveysasteilla, KÄÄNTYY Brasiliassa ja Uruguayssa — juuri niissä väestöissä, jotka ovat SAMA:n alla. Missä geomagneettinen geometria muuttuu, biologinen vaste kääntyy.",
    solarNorthernTitle: "Pohjoinen paketti: Kolme ominaisuutta, yksi molekulaarinen kohde",
    solarNorthernP1: "Kolme pohjoiseuroppalaisissa väestöissä yhdessä valikoitunutta ominaisuutta konvergoivat yhteen molekulaariseen kohteeseen — kryptokromiin (CRY):",
    solarNorthernTraits: [
      "Siniset silmät → 100× valon läpäisy iiriksessä → χ_optinen (enemmän fotoneja pääsee verkkokalvon CRY:hin)",
      "Laktoosinsietokyky → B2/FAD-ravintosaanti → CRY-kofaktorin stabiilius → χ_molekulaarinen",
      "Korkea geomagneettinen leveysaste → vahva ympäristökenttä → χ_geomagneettinen",
    ],
    solarNorthernP2: "D-vitamiini-hypoteesi selittää 2/3 ominaisuudesta (vaaleat silmät ja korkea leveysaste valikoituvat UV-absorptiolle). CRY-hypoteesi selittää kaikki 3 — mukaan lukien muuten anomaalisen laktoosinsietokyvyn ja silmien värin yhteyden.",
    solarDendroTitle: "Syvän ajan vahvistus: Dendrokronologia",
    solarDendroP1: "Aurinkosykli ei ole moderni ilmiö. Vuosilustotietueet vahvistavat sen jatkuvan toiminnan geologisessa ajassa:",
    solarDendroStudies: [
      "Luthardt & Rößler 2018: 290 miljoonaa vuotta vanha kivettynyt metsä osoittaa 10,62 ± 0,08 v kasvusyklejä — aurinkojaksoisuus säilynyt permikauden puussa.",
      "Brehm ym. 2021: 1 000 vuoden jatkuva ¹⁴C-vuosilustodatasta vahvistaa itsenäisesti auringon modulaation kosmogenisten isotooppien tuotannossa.",
      "Nature Communications 2025: Ensimmäisen vuosituhannen eaa. vahvistus laajentaa jatkuvaa tietuetta, sulkien aukon muinaisten ja modernien aurinkosyklien välillä.",
    ],
    solarDendroP2: "Biologinen kello, johon BERM:n χ_B-polku vastaa, on käynyt keskeytyksettä vähintään 290 miljoonaa vuotta.",
  },
  ja: {
    title: "エビデンス登録簿",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT}件の限定BERM v17レコードと${LEGACY_EVIDENCE_COUNT}件の拡張カタログエントリ、13以上の経路と490以上の査読済み研究にわたる。`,
    interpretationTitle: "この登録簿の読み方",
    interpretation: [
      "フィールドシグネチャは背景ベクトル、角度、スペクトル、エンベロープなどの測定変数を支持できるが、ヒトの生殖能力への影響を立証するものではない。",
      "細胞または動物実験は、記載された条件内での機構的中間体または臓器エンドポイントを支持できるが、自動的にヒト集団の推定値となるわけではない。",
      "レビューは文献群を特定する。集団のタイミング結果は、対応するFieldState、エンドポイント、交絡因子の制御がない限り記述的である。",
      "以下のレコードはいずれもTFR係数ではない。国別TFR経路にはモデル仕様における個別のASFRおよび人口学的項が必要である。",
    ],
    boundedTitle: "限定v2レコード",
    boundedLead: "各レコードはフィールドクラス、直接性、翻訳範囲、制限を記載している。これらはBERM v17因果経路の主要エビデンスエントリである。",
    classificationTitle: "以前の否定的知見の分類方法",
    channelGroupTitle: "3つの周波数チャネル",
    channelGroupLead: "各生物学的経路は3つの周波数チャネルの1つに対応し、2つの生物学的カットオフで定義される：f_c ~ 1 kHz（膜RC）およびf_RPM ~ 1 MHz（ラジカル対コヒーレンス）。",
    extendedTitle: "拡張エビデンスカタログ",
    extendedLead: `${LEGACY_EVIDENCE_COUNT}件の追加レコード（BERM v17参考文献より）。ソースレベルのレビュー用に保持。各々はレガシー経路、エビデンスレベル、移行ステータスで分類。`,
    groups: {
      PHYSICS_SIGNATURE: "物理シグネチャ",
      MECHANISTIC_INTERMEDIATE: "機構的中間体",
      REPRODUCTIVE_ENDPOINT: "生殖エンドポイント",
      ECOLOGICAL_ENDPOINT: "生態学的エンドポイント",
      SYSTEMATIC_REVIEW: "系統的レビュー",
      POPULATION_DESCRIPTIVE: "集団記述データ",
    },
    fields: { nodes: "因果ノード", field: "フィールドクラス", scope: "翻訳範囲", limitations: "制限", role: "校正役割", source: "DOI / ソース" },
    structural: "構造のみ",
    contextual: "コンテキストのみ",
    anchorTitle: "メカニズム的アンカー",
    anchorP1: "[[ref:kalmijn1971|Kalmijn（J. Exp. Biol. 1971）]]は、板鰓類（サメとエイ）がロレンチニ器官を通じて5 nV/cm（5 × 10⁻⁷ V/m）もの微弱な電場を確実に検出することを実証しました。この閾値はBERMが使用するIFO-VGIC感度レベルをはるかに下回ります — 脊椎動物の神経系は、現行の安全基準が生物学的に不活性と見なす強度でフィールドを処理します。",
    anchorP2: "ロレンチニ器官はイオンチャネルのコンダクタンス変化を使用します — VGCC ゲートダイナミクスと物理的に類似しています。これはより敏感な動物の異なるメカニズムではありません；異なる組織で発現された同じメカニズム（弱い電場によるイオンチャネル摂動）です。10⁻⁵から10⁻⁷ V/mにおけるフィールド感度の系統発生的保存は「フィールドは生物学には弱すぎる」という異議を直接反論します。",
    anchorNote: "板鰓類の電気受容は確立された感覚様式であり、議論の余地はありません。哺乳類のVGCC感度への外挿はBERMの解釈です — ロレンチニ器官はフィールド検出に最適化された形状を持つ特殊な感覚器官であり、哺乳類組織にはありません。",
    animalTitle: "動物エビデンス：制御されたEMF実験",
    animalP1: "[[ref:rodriguez2003|Rodriguez et al.（J. Reprod. Fert. 2003）]]はマギル大学で制御された実験において乳牛の未経産牛を60 Hz EMF（10 kV/m、30 µT）に曝露しました。結果：メラトニンが低下（EMFが人工的な「長日」シグナルとして作用）、発情周期期間が延長（p < 0.01）、黄体期が延長（p < 0.01）。[[ref:burchard2002|Burchard et al.（J. Dairy Sci. 2002）]]は同じEMF曝露がIGF-1と乾物摂取量を増加させることを発見しました。",
    animalP2: "これは環境レベルのELF場が大型哺乳類の生殖内分泌学を変化させるという直接的な実験的証拠です。しかし乳牛は電化以来（~1950年代以降）安定した牛舎のELFに曝露されてきました。育種選択圧はEMF効果の~3桁大きいです。これが家畜がBERMセンチネルレジストリで負の対照として正しく分類される理由です — EMFは生物学的に活性ですが、選択がそれを覆い隠します。",
    animalP3: "漂遊電圧文献（不良配線からのミリアンペアの接触電流）は直交的です。Rodriguezは慢性的な場の曝露（µT）を測定し、急性接触電流（mA）ではありません。Rodriguez型の研究のみがBERMのメカニズム — 生殖内分泌学への慢性低レベルELF場効果 — を検証します。",
    animalNote: "Rodriguez/Burchard実験は明確な生物学的エンドポイントを持つ査読済み制御研究です。家畜の負の対照分類は集団レベルの減少検出に適用され（選択がシグナルを圧倒）、ELFが生物学的に活性かどうかには適用されません（活性です）。アーミッシュ対従来型酪農比較 — アーミッシュの牛舎はELFが低い — が次の有益なテストとなります。",
    catsperTitle: "CatSper：代替不可能なチャネル",
    catsperLead: "9つのカルシウム依存段階が精子産生から受精までを網羅する。CatSperはすべての段階 — 受精能獲得、走流性、走温性、走化性、先体反応 — で必要であり、生物学的バックアップがない。テストされたどの種でもCatSperノックアウトは完全な雄性不妊を生じる。",
    catsperP1: "CatSperは唯一の精子特異的カルシウムチャネルである。電位依存性、pH感受性、温度依存性（Q₁₀ = 5.1、閾値33.5°C）であり、卵丘細胞からのピコモル濃度のプロゲステロンに応答する。EMF誘導性のCa²⁺調節異常は、CatSperが必要とする精密なタイミングを乱す — 早期の活性化が精子が卵に到達する前に有限のエネルギー貯蔵を枯渇させる。",
    catsperP2: "CATSPER2⁻/⁻男性はプロゲステロン誘導性の超活性化が消失し、in vivoおよびin vitroの両方で受精に失敗する（[[ref:catsper_human|JCI 2024]]）。薬理学的シグネチャーは一貫している：CatSperブロッカー（NNC55-0396）はEMF曝露と同じ運動性および先体反応の欠陥を生じる（[[ref:pmc6104424_nnc|Rennhack et al. 2018]]）。",
    catsperEvolution: "CatSperはウニからヒトまで保存されている — 同じチャネルが6億年の進化にわたって受精を制御している。水生種（ウニ、サケ）は外部受精でCatSperを使用し、海底ケーブルのEMFが自然実験を提供する。",
    catsperDetailLink: "完全な9段階の生殖ナビゲーションチェーン",
    sentinelTitle: "センチネルおよび種間エビデンス",
    sentinel: "Cross-Species Lag Indexは、地域的なアウトカム、測定されたFieldState、およびエンドポイント共変量を登録された種間テストで結合するための準備プロトコルである。",
    sentinelGradient: "定量可能な生殖低下率を持つ7種にわたり、低下率はEMF曝露スコアとr = 0.909で相関する。犬（[[ref:lea2016|Lea et al. 2016]]）：英国種犬で26年間にわたり精子−1.0%/年の低下、家庭のEMF曝露を共有。馬（[[ref:harris2023|Harris et al. 2023]]）：種馬の精子35年間にわたり−0.75%/年の低下。パターンはミツバチ、鳥類、カエル、水生種に及ぶ — それぞれが電磁環境に比例したタイムラインで低下。",
    sentinelTLink: "この種間勾配は、ヒトで文書化されたテストステロンの世俗的低下に直接つながる：同じEMFメカニズム（VGCC → Ca²⁺ → 生殖障害）が家庭のEMF環境を共有する犬で作動し、同じ~1%/年の低下率を生み出す。T→TFRの8年のラグが時間的キャリブレーションを提供する — より早く電化した国はより早いT低下の開始を示す可能性がある（予測T-1）。",
    sentinelGradientStat: "r = 0.909",
    sentinelGradientLabel: "種間EMF勾配（7種）",
    sentinelLink: "センチネル準備状況を表示",
    sentinelTDeclineLink: "テストステロン低下エビデンス",
    extPathway: "経路",
    extLevel: "エビデンスレベル",
    extStatus: "移行ステータス",
    extScope: "翻訳範囲",
    extN: "N",
    dualInterpretationTitle: "エビデンスの読み方：標準 vs. BERM解釈",
    dualInterpretationLead: "同じ研究が、どのバイアスを仮定するかによって反対の結論を支持できる。この表は、標準フレームワークとBERM補正フレームワークが同じエビデンスタイプをどう読むかを示す。",
    dualInterpretationHeaders: { evidence: "エビデンスタイプ", standard: "標準的解釈", berm: "BERM解釈" },
    dualInterpretationRows: [
      {
        evidence: "研究がEMFの有意な効果を見出さない",
        standard: "テストされたレベルでEMFは安全。生物学的メカニズムなし。",
        berm: "対照群が汚染されている（実験室ベースラインバイアス）。減衰バイアスが見かけの効果を低減。真のゼロ曝露対照がなければゼロ結果は予想される。",
      },
      {
        evidence: "研究が高SARでのみEMF効果を発見",
        standard: "効果は熱的。ICNIRPの閾値を確認。",
        berm: "用量反応曲線にウィンドウ効果がある可能性（Adey/Blackman）。高SARでの効果は低SARでの効果を除外しない — 非単調応答はRPMが予測する。",
      },
      {
        evidence: "WHOの系統的レビューが確実性を「中程度」と評価",
        standard: "エビデンスは中程度。さらなるRCTが必要。",
        berm: "WHOの方法論は見かけの効果をすべて減衰させる15以上の特定されたバイアスの影響を受ける。バイアスのあるフレームワークでの「中程度」は、バイアス補正フレームワークでの「高い」に相当する可能性がある。",
      },
      {
        evidence: "GDPがEMFプロキシよりTFRとよく相関",
        standard: "GDP/発展が真の要因。EMFは発展のプロキシ。",
        berm: "GDPは「悪い対照」（Pearl 2009）：電化がGDPとEMFの両方を引き起こす。GDPの制御は関心のある因果効果を除去する（含有メディエーターバイアス）。",
      },
      {
        evidence: "研究が正のEMF効果を示す（例：ROS増加）",
        standard: "興味深いが追試が必要。効果量は小さい可能性。",
        berm: "効果量は実験室ベースラインバイアスにより過小評価されている。非曝露ベースラインに対する真の効果は報告値より大きい。",
      },
      {
        evidence: "RPMはテレコム周波数での効果を説明できない",
        standard: "CRY/RPM経路は携帯電話に無関係。",
        berm: "RF搬送波については正しい。しかしテレコム信号はRPMの共鳴範囲内のELF変調（GSM 217 Hz）を含む。RPMは搬送波ではなく変調エンベロープに応答する。電場効果は経路A（VGIC）を介する。",
      },
      {
        evidence: "TFR予測の信頼区間を超えた",
        standard: "モデルは間違い。予測は失敗した。",
        berm: "3つの可能性：(a)モデルの過大評価、(b)外因性補償（移民、IVF、政策）、(c)CIが狭すぎる。各々に識別テストが存在する。",
      },
    ],
    theraBionicTitle: "臨床的検証：TheraBionic",
    theraBionicLead: "FDA承認の医療機器がBERMの中核メカニズムを現行安全基準をはるかに下回る曝露レベルで確認。",
    theraBionicBody: "TheraBionic P1はFDA承認の医療機器（HDE H220001, 2019）で、27.12 MHzの振幅変調高周波電磁場を用いて進行性肝細胞癌を治療する。",
    theraBionicMechanism: "この装置はBERMが記述するのとまさに同じメカニズムで動作する：非熱的EMF → Cav3.2 T型電位依存性カルシウムチャネル → Ca²⁺流入 → 生物学的効果（腫瘍細胞分化）。これはJimenez et al.（2019）がeBioMedicine/Lancetで実証した。",
    theraBionicSAR: "この装置は携帯電話の曝露の100〜1,000倍低いSARレベルで動作する。これは、非熱的EMFが現行安全基準（ICNIRP/FCC）をはるかに下回る曝露レベルで電位依存性カルシウムチャネルを通じて重大な生物学的効果を生じうることを確認する。",
    theraBionicCCB: "FDAのラベリングはTheraBionicをカルシウムチャネル遮断薬と併用すべきでないと明示的に記載しており — 治療効果がカルシウムチャネルを通じて作用することの薬理学的確認である。",
    theraBionicImplication: "これはBERMの予測ではない。非熱的EMFが電位依存性カルシウムチャネルを通じて生物学的効果を生じることの、独立に開発され、臨床的に検証され、FDA承認された確認である。",
    theraBionicSurvival: "進行性HCCで34%の生存率向上",
    theraBionicDevice: "27.12 MHz AM-RF、腫瘍特異的周波数",
    theraBionicChannel: "Cav3.2 (CACNA1H) T型VGCC",
    theraBionicLevel: "E — FDA承認、査読済み（Lancet/eBioMedicine）",
    tDeclineTitle: "テストステロン低下：国際エビデンス",
    tDeclineLead: "年齢非依存の世俗的テストステロン低下が4大陸5か国で記録されている。パターンは一貫している：加齢、BMIトレンド、生活習慣の交絡因子とは独立に約1%/年の低下。BMI調整後に「低下なし」を見出した研究はメディエーターモデルと整合する：BMIは因果経路上にあり独立した交絡因子ではないため、調整すると真のシグナルが除去される。",
    tDeclineStudies: [
      { referenceId: "travison2007_v2", country: "米国", study: "Travison et al. 2007 (MMAS)", n: "1,532", rate: "−1.0%/yr", finding: "集団レベルのT低下 1987–2004。年齢非依存：2002年の65歳は1987年の65歳より低いT。BMI調整済み — 直接経路のみを捕捉。", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "mazur2013", country: "米国", study: "Mazur et al. 2013 (PLOS ONE)", n: "991", rate: "−0.95%/yr", finding: "体重維持のUS Air Force退役軍人が20年間で117 ng/dL（19%）を喪失。肥満を十分な説明として除外 — メディエーター解釈の決定的証拠。", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "perheentupa2013", country: "フィンランド", study: "Perheentupa et al. 2013", n: "3,271", rate: "−1.2%/yr", finding: "37%のコホート依存T低下（1972–2002）。LHとFSHも後のコホートで低下。フィンランドのTFRは35年後に崩壊。", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "chodick-2020-israel", country: "イスラエル", study: "Chodick et al. 2020", n: "102,334", rate: "−1.02%/yr", finding: "最大の単独研究：10.2万人、Maccabi Healthcare。「増加する肥満では説明困難。」イスラエルの高TFRにもかかわらずTが低下 — 閾値モデルのフェーズ1。", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "santi2025", country: "グローバル", study: "Santi et al. 2025 (meta-analysis)", n: "1,064,891", rate: "p = 0.033", finding: "過去最大のメタ分析。TとLHの両方が年齢、BMI、測定法とは独立に低下。この集団にBMIの時間的トレンドなし。「HPG機能の進行中のリセット。」T + LH同時低下の初の確認。", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "andersson-2007-denmark", country: "デンマーク", study: "Andersson et al. 2007", n: "5,350", rate: "BMI調整後ゼロ", finding: "BMI調整後に低下が消失。BERM解釈：媒介経路がこの集団で支配的 — BMI調整が支配的シグナルを除去。メディエーターモデルと整合、矛盾ではない。", tier: "null_explained" as const, bmiIndependent: false, bermNote: "メディエーター仮説を支持：BMI経路が支配的な場合、BMI調整はゼロを生じる。" },
      { referenceId: "nyante2012_nhanes", country: "米国", study: "Nyante et al. 2012 (NHANES)", n: "2,315", rate: "低下なし", finding: "NHANES 1988–2004。低下なし。測定法変更＋メディエーター除去を反映する可能性。Travisonと矛盾しない — 異なる集団、異なる測定法、異なる調整戦略。", tier: "null_explained" as const, bmiIndependent: false, bermNote: "特定のサブ集団におけるメディエーターモデルと整合。" },
    ],
    tDeclineImplication: "テストステロンが現在の速度で低下し続けるなら、すべての国は最終的に亜不妊がTFRの拘束制約となる生物学的閾値を超える — 文化的または経済的要因にかかわらず。",
    tDeclineBmiNote: "なぜ「ゼロ」結果は矛盾ではないか：BMIは交絡因子（独立した原因）またはメディエーター（因果経路上）のいずれかでありうる。EMFがBMI増加とT低下の両方を同時に引き起こすなら、BMIはメディエーターであり、その調整は真のシグナルを除去する。Mazur 2013がこれを実証：体重維持の男性がそれでもテストステロンの19%を喪失した。直接経路は全効果の約3分の2を占め、媒介経路（BMI経由）は約3分の1を占める。",
    tDeclineLink: "閾値モデルの完全仕様",
    tDeclinePredLink: "T→TFR予測",

    metabTitle: "メタボリックシンドローム：6つの収束経路",
    metabLead: "6つの独立したEMF → Ca²⁺経路が同時にエネルギー摂取を増加、エネルギー消費を減少、エネルギー貯蔵を増加させる。CaMKIIはすべての経路を接続する収束分子である。肥満は多因子性 — EMFは食事、運動、遺伝学だけでは説明できない残差を説明する1つの寄与因子である。",
    metabStudies: [
      { referenceId: "alshammari2022", authors: "Alshammari et al.", year: 2022, journal: "Nutrients", finding: "RF-EMF → 視床下部破壊 → ヒトおよびラットで食物摂取↑", mechanism: "1: 食欲", level: "E" },
      { referenceId: "chen2016_glia", authors: "Chen et al.", year: 2016, journal: "eLife", finding: "ARCグリアのCa²⁺活性化 → AgRP/NPY↑ → 食物摂取↑（直接的Ca²⁺→食欲リンク）", mechanism: "1: 食欲", level: "E" },
      { referenceId: "maalouf2023", authors: "Maalouf et al.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT熱産生↓、ミトコンドリア活性↓（用量反応）", mechanism: "2: BAT", level: "E" },
      { referenceId: "5g_bat2025", authors: "French group", year: 2025, journal: "IJMS", finding: "5G (3.5 GHz) → PRDM16 −49%、C/EBPβ −32%（褐色脂肪分化マーカー）", mechanism: "2: BAT", level: "E" },
      { referenceId: "bhatt2012_glp1", authors: "Bhatt et al.", year: 2012, journal: "PLoS ONE", finding: "GLP-1がL型 VGCC Ca²⁺マイクロドメインを介してβ細胞でERKを活性化", mechanism: "3: インスリン", level: "E" },
      { referenceId: "nifedipine_weight2011", authors: "Matsui et al.", year: 2011, journal: "Hypertension Res", finding: "ニフェジピン（L型遮断薬）→ 体重↓、PGC-1α↑（逆薬理学的試験）", mechanism: "逆証", level: "E" },
      { referenceId: "screentime_meta2022", authors: "Haghjoo et al.", year: 2022, journal: "BMC Primary Care", finding: "44研究：スクリーンタイム → 過体重 OR 1.273（用量反応）", mechanism: "全て", level: "E" },
      { referenceId: "klimentidis2010", authors: "Klimentidis et al.", year: 2010, journal: "Proc R Soc B", finding: "24集団、8種、>20,000頭の動物が全て体重增加 (p = 1.2×10⁻⁷)", mechanism: "全て", level: "E" },
    ],
    metabKlimentidisTitle: "Klimentidisのパラドックス",
    metabKlimentidisP1: "管理された食餌の実験用動物が数十年にわたり体重増加している。都市の野生ラットも太っている。ペットの犬や猫にも同じ傾向が見られる。これが24集団8種にわたり偶然に起こる確率はp = 1.2 × 10⁻⁷である。",
    metabKlimentidisP2: "食餌は排除されている（実験用動物）。運動は排除されている（実験用動物）。遺伝学は排除されている（近交系）。内分泌撹乱物質（BPA、フタル酸エステル）は可能性があるが、野生ラットと実験用動物とペットを同時には説明できない。これらすべての環境で増加した唯一の環境因子は電磁場曝露である。",
    metabKlimentidisNote: "Klimentidis et al.はEMFを研究していない。研究者たちは「まだ特定されていない因子」を示唆した。EMF解釈はBERMの導出であり、彼らのものではない。",
    metabModelLink: "CaMKII収束モデル",
    metabPredLink: "代謝予測",
    svgStandardVsBerm: "標準 vs. BERM",
    svgStandard: "標準",
    svgWeakNoEffect: "弱い場→効果なし",
    svgWeakAmplified: "弱い場→膜で増幅",
    svgNoDoseResponse: "用量反応なし→メカニズムなし",
    svgWindowEffect: "ウィンドウ効果→共鳴",
    svgMixedResults: "混在する結果→結論なし",
    svgModerators: "非制御モデレーター→予測可能",
    svgTrueEffect: "真の効果",
    svgVsZero: "ゼロ暴露との比較",
    svgLabBaseline: "ラボベースライン",
    svgControlContam: "対照汚染",
    svgSarThreshold: "SAR閾値",
    svgPubBias: "出版バイアス",
    svgMediatorAdj: "メディエーター調整",
    svgBiasesNote: "15以上の特定されたバイアスが観察効果を減衰",
    svgObserved: "観察値",
    svgSameStudy: "同じ研究→仮定するバイアスモデルにより異なる結論",
    standardInterpretation: "標準的解釈",
    svgNullResult: "ゼロ結果＝効果なし",
    svgHighSar: "高SARのみ＝熱的",
    svgGdpProxy: "GDP > EMFプロキシ",
    svgLinearDose: "線形用量反応",
    bermInterpretation: "BERM解釈",
    svgContaminated: "汚染された対照群",
    svgWindowAdey: "ウィンドウ効果（Adey/Blackman）",
    svgGdpBadControl: "GDP＝悪い対照（Pearl 2009）",
    svgNonMonotonic: "非単調応答",
    subPagesTitle: "テーマ別エビデンスページ",
    subPagesLead: "個別の研究が機構的論拠に統合される詳細な分析。各ナラティブは発表された知見を統合するが、集団レベルの因果係数を確立するものはない。",
    researchDomainsTitle: "11の独立した研究分野",
    convergenceDiagram: "収束ダイアグラム",
    bioActivity: "生物活性",
    deviceLabel: "装置",
    channelLabel: "チャネル",
    belowLabel: "以下",
    outcomeLabel: "結果",
    levelLabel: "レベル",
    mechanismLabel: "メカニズム",
    sarComparisonLabel: "SAR比較",
    ccbContraLabel: "カルシウムチャネル遮断薬禁忌",
    countryLabel: "国",
    studyLabel: "研究",
    rateLabel: "率",
    tierLabel: "階層",
    findingTableLabel: "知見",
    causalAnalysisLabel: "因果分析",
    authorsLabel: "著者",
    yearLabel: "年",
    tDeclineForestPlot: "テストステロン低下フォレストプロット",
    tDeclineMeanRate: "平均 −1.0%/年",
    tDeclineDenmark: "デンマーク (Andersson)",
    tDeclineFinland: "フィンランド (Perheentupa)",
    tDeclineGlobal: "グローバル (Santi)",
    tDeclineRateUnit: "%/年",
    metabMatrixLabel: "代謝エビデンスマトリックス",
    weightLabel: "体重",
    insulinLabel: "インスリン",
    directLabel: "直接",
    indirectLabel: "間接",
    notTestedLabel: "未テスト",
    populationsWord: "集団",
    speciesWord: "種",
    appetiteLabel: "食欲↑",
    sleepDownLabel: "睡眠↓",
    microbiomeLabel: "マイクロバイオーム",
    cortisolLabel: "コルチゾール",
    metabolicSyndromeLabel: "メタボリックシンドローム",
    klimentidisAllGaining: "24集団、8種 — すべて体重増加 (p = 1.2×10⁻⁷)",
    citationLabel: "引用",
    researcherLabel: "研究者",
    criticismLabel: "批判",
    mechanismNowLabel: "メカニズム（現在）",
    nextLinkLabel: "次へ",
    nextLinkTitle: "批判と回答",
    researchDomainsLead: "BERMの機構的経路は、11の相互に独立した研究分野に基づいている。単一の分野では十分ではないが、同じ予測 — 電磁場の生物学的活性 — への収束は偶然では起こりにくい。",
    cry2PathwayNote: "CRY2の下流効果は概日時計を超えて拡がる。Yap et al. (2025) は、CRY2がTRPファミリーのカチオンチャネルであるTRPC1と物理的に相互作用し、PEMF曝露後にこの複合体が共に核へ移行することを示した。このカルシウム流入経路はCRY2依存性（CRY2サイレンシングにより遮断）、光依存性（暗所で消失）、FAD依存性（RFKサイレンシングにより減衰）であり、すべてRPMメカニズムの特徴である。重要なことに、TRPC1は電位依存性カルシウムチャネルではなく、L型VGCC遮断薬では遮断されない。これは経路AとC（サイトのB）が薬理学的に分離可能であり続けることを意味するが、経路Cの生物学的影響範囲は以前想定されていたよりも大きい。",
    solarTitle: "太陽周期と地磁気生物学：第11の収束線",
    solarIntro: "BERMは2つの独立した感受性を定義する：χ(Ā)（VGCC、幾何学的場結合）とχ_B（CRY/RPM、ラジカルペアスピン動力学）。太陽周期はχ_Bを検証する。なぜなら電化閾値なしに作動するからである — 太陽駆動の地磁気変動は、人為的EMFのはるか前、数十億年にわたりラジカルペア化学を調節してきた。CRY媒介経路が実在するならば、そのシグネチャーは太陽周期長の生物学的リズムに現れるはずである。",
    solarResearchLabel: "主要な研究エビデンス",
    solarStudies: [
      { authors: "Randall", year: "1990/1993", finding: "7カ国で11年周期の出生率変動を検出", mechanism: "集団エンドポイント" },
      { authors: "Skjærvø et al.", year: "2015", finding: "前工業化ノルウェー（1676–1878年、N=8,662）：太陽極大期生まれは5.2年短命", mechanism: "寿命エンドポイント" },
      { authors: "Burch et al.", year: "1999", finding: "地磁気擾乱 → メラトニン代謝物（6-OHMS）排泄の減少", mechanism: "メラトニン抑制" },
      { authors: "Weydahl et al.", year: "2001", finding: "メラトニン抑制効果は70°N（オーロラオーバル）で最強", mechanism: "緯度勾配" },
      { authors: "Ferrari et al.", year: "2015", finding: "ミツバチの帰巣損失が地磁気嵐日に2.7倍", mechanism: "CRYナビゲーション" },
      { authors: "Selås", year: "2004", finding: "r² = 0.84 相関：蛾の個体数 vs. 太陽黒点数", mechanism: "生態学的エンドポイント" },
      { authors: "Chizhevsky", year: "1922", finding: "2,500件の歴史的大衆運動の80%が太陽極大期周辺に集中", mechanism: "行動エンドポイント" },
    ],
    solarStatTitle: "統計的結果",
    solarBandpass: "バンドパス8–14年：r = +0.58（p < 0.0001）米国出生率、1960–2000サブウィンドウでr = +0.81",
    solarFirstDiff: "一次差分：Δ-SSN vs Δ-CBR r = +0.20（p = 0.032）ラグ0",
    solarMonteCarlo: "モンテカルロ p = 0.997 — 予測整合的方向がランダム化検定で確認",
    solarReversal: "方向反転1998年：r_前 = +0.21（1933–1997）、r_後 = −0.55（1998–2022）。符号変化はRF飽和遷移と一致。",
    solarSamaTitle: "SAMA：自然の対照実験",
    solarSamaP1: "南大西洋磁気異常（SAMA）は、地球の磁場が約24 µT — 通常の約50 µTのおよそ半分 — の領域である。この自然に弱化した磁場が地磁気幾何学の対照実験を生み出す。",
    solarSamaP2: "ESS 2026分析：ほとんどの緯度で成立する太陽風–暴力相関が、ブラジルとウルグアイでは逆転する — まさにSAMA下の集団である。地磁気幾何学が変化するところで、生物学的応答が反転する。",
    solarNorthernTitle: "北方パッケージ：3つの形質、1つの分子標的",
    solarNorthernP1: "北欧集団で共選択された3つの形質が単一の分子標的 — クリプトクロム（CRY）に収束する：",
    solarNorthernTraits: [
      "青い目 → 虹彩を通る100倍の光透過 → χ_光学（より多くの光子が網膜CRYに到達）",
      "乳糖耐性 → B2/FAD食事供給 → CRYコファクター安定性 → χ_分子",
      "高地磁気緯度 → 強い環境磁場 → χ_地磁気",
    ],
    solarNorthernP2: "ビタミンD仮説は3形質中2つを説明する（明るい目と高緯度はUV吸収に選択される）。CRY仮説は3つすべてを説明する — 乳糖耐性と目の色の異常な連関を含めて。",
    solarDendroTitle: "深層時間の確認：年輪年代学",
    solarDendroP1: "太陽周期は現代の現象ではない。年輪記録が地質時間にわたるその連続的作動を確認する：",
    solarDendroStudies: [
      "Luthardt & Rößler 2018：2億9千万年前の石化林が10.62 ± 0.08年の成長周期を示す — ペルム紀の木に太陽周期性が保存。",
      "Brehm et al. 2021：1,000年間の連続¹⁴C年輪データが宇宙線生成同位体生成の太陽変調を独立に確認。",
      "Nature Communications 2025：紀元前1千年紀の確認が連続記録を拡張し、古代と現代の太陽周期の間の空白を埋める。",
    ],
    solarDendroP2: "BERMのχ_B経路が応答する生物学的時計は、少なくとも2億9千万年間途切れることなく動いてきた。",
  },
  fr: {
    title: "Registre des preuves",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} enregistrements BERM v17 bornés et ${LEGACY_EVIDENCE_COUNT} entrées du catalogue étendu, couvrant 13+ voies et 490+ études évaluées par les pairs.`,
    interpretationTitle: "Comment lire ce registre",
    interpretation: [
      "Une signature de champ peut soutenir une variable de mesure telle que le vecteur de fond, l'angle, le spectre ou l'enveloppe ; elle n'établit pas d'effets sur la fertilité humaine.",
      "Une expérience cellulaire ou animale peut soutenir un intermédiaire mécanistique ou un point final d'organe dans ses conditions déclarées ; ce n'est pas automatiquement une estimation de population humaine.",
      "Une revue localise un corpus de littérature. Un résultat de temporalité populationnelle est descriptif sauf si un FieldState, un point final et des contrôles de confusion correspondants sont présents.",
      "Aucun enregistrement ci-dessous n'est un coefficient TFR. Une voie TFR nationale nécessite les termes ASFR et démographiques distincts dans la spécification du modèle.",
    ],
    boundedTitle: "Enregistrements bornés v2",
    boundedLead: "Chaque enregistrement indique sa classe de champ, sa directionalité, sa portée de traduction et ses limites. Ce sont les entrées de preuves primaires pour la route causale BERM v17.",
    classificationTitle: "Comment les résultats précédemment négatifs se classifient",
    channelGroupTitle: "Trois canaux de fréquence",
    channelGroupLead: "Chaque voie biologique correspond à l'un des trois canaux de fréquence, définis par deux seuils biologiques : f_c ~ 1 kHz (RC membranaire) et f_RPM ~ 1 MHz (cohérence des paires de radicaux).",
    extendedTitle: "Catalogue de preuves étendu",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} enregistrements supplémentaires de la bibliographie BERM v17, conservés pour une revue au niveau des sources. Chacun est classifié par sa voie héritée, son niveau de preuve et son statut de migration.`,
    groups: {
      PHYSICS_SIGNATURE: "Signatures physiques",
      MECHANISTIC_INTERMEDIATE: "Intermédiaires mécanistiques",
      REPRODUCTIVE_ENDPOINT: "Points finaux reproductifs",
      ECOLOGICAL_ENDPOINT: "Points finaux écologiques",
      SYSTEMATIC_REVIEW: "Revues systématiques",
      POPULATION_DESCRIPTIVE: "Données populationnelles descriptives",
    },
    fields: { nodes: "Nœuds causaux", field: "Classe de champ", scope: "Portée de traduction", limitations: "Limites", role: "Rôle de calibration", source: "DOI / source" },
    structural: "Structurel uniquement",
    contextual: "Contexte uniquement",
    anchorTitle: "Ancres mécanistes",
    anchorP1: "[[ref:kalmijn1971|Kalmijn (J. Exp. Biol. 1971)]] a démontré que les élasmobranches (requins et raies) détectent de façon fiable des champs électriques aussi faibles que 5 nV/cm (5 × 10⁻⁷ V/m) grâce à leurs ampoules de Lorenzini. Ce seuil est bien en dessous du niveau de sensibilité IFO-VGIC utilisé par BERM — un système nerveux vertébré traite des champs à des intensités que les normes de sécurité actuelles considèrent biologiquement inertes.",
    anchorP2: "Les ampoules de Lorenzini utilisent des changements de conductance des canaux ioniques — physiquement analogues à la dynamique de porte des VGCC. Ce n'est pas un mécanisme différent chez un animal plus sensible ; c'est le même mécanisme (perturbation des canaux ioniques par des champs électriques faibles) exprimé dans un tissu différent. La conservation phylogénétique de la sensibilité aux champs dans la plage 10⁻⁵ à 10⁻⁷ V/m chez les vertébrés contredit directement l'objection « champs trop faibles pour la biologie ».",
    anchorNote: "L'électroréception des élasmobranches est une modalité sensorielle bien établie. L'extrapolation à la sensibilité VGCC des mammifères est une interprétation BERM — l'ampoule de Lorenzini est un organe sensoriel spécialisé avec une géométrie optimisée pour la détection de champs, que les tissus mammifères ne possèdent pas.",
    animalTitle: "Preuves animales : Expériences EMF contrôlées",
    animalP1: "[[ref:rodriguez2003|Rodriguez et al. (J. Reprod. Fert. 2003)]] ont exposé des génisses laitières à un EMF de 60 Hz (10 kV/m, 30 µT) dans une expérience contrôlée à l'Université McGill. Résultats : le mélatonine a diminué (l'EMF agit comme un signal artificiel de « jour long »), la durée du cycle œstral a augmenté (p < 0,01) et la durée de la phase lutéale a augmenté (p < 0,01). [[ref:burchard2002|Burchard et al. (J. Dairy Sci. 2002)]] ont constaté que la même exposition EMF augmentait l'IGF-1 et l'ingestion de matière sèche.",
    animalP2: "C'est une preuve expérimentale directe que les champs ELF aux niveaux environnementaux modifient l'endocrinologie reproductive chez les grands mammifères. Cependant, les bovins laitiers ont été exposés à l'ELF stable des étables depuis l'électrification (~années 1950). La pression de sélection d'élevage est ~3 ordres de grandeur supérieure à tout effet EMF. C'est pourquoi le bétail est correctement classé comme contrôle négatif dans le registre sentinelle BERM — l'EMF EST biologiquement actif, mais la sélection le masque.",
    animalP3: "La littérature sur les tensions parasites (courants de contact en milliampères dus à un câblage défectueux) est orthogonale. Rodriguez a mesuré l'exposition chronique au champ (µT), pas le courant de contact aigu (mA). Seules les études de type Rodriguez testent le mécanisme BERM — les effets chroniques des champs ELF de faible niveau sur l'endocrinologie reproductive.",
    animalNote: "Les expériences Rodriguez/Burchard sont des études contrôlées évaluées par des pairs avec des critères biologiques clairs. La classification de contrôle négatif pour le bétail s'applique à la détection du déclin au niveau populationnel (la sélection submerge le signal), pas à la question de savoir si l'ELF est biologiquement actif (il l'est). Une comparaison Amish vs laitier conventionnel — où les étables Amish ont un ELF plus faible — serait le prochain test informatif.",
    catsperTitle: "CatSper : Le canal irremplaçable",
    catsperLead: "Neuf étapes calcium-dépendantes couvrent de la production de spermatozoïdes à la fécondation. CatSper est requis à chaque étape — capacitation, rhéotaxie, thermotaxie, chimiotaxie et réaction acrosomique — et n'a aucun secours biologique. L'inactivation de CatSper dans toute espèce testée produit une infertilité masculine complète.",
    catsperP1: "CatSper est le seul canal calcique spécifique au spermatozoïde. Il est voltage-dépendant, sensible au pH, thermo-dépendant (Q₁₀ = 5,1, seuil 33,5 °C) et répond à la progestérone picomolaire des cellules du cumulus. La dysrégulation du Ca²⁺ induite par les EMF perturbe le timing précis que CatSper nécessite — une activation prématurée épuise les réserves d'énergie finies avant que le spermatozoïde n'atteigne l'ovule.",
    catsperP2: "Les hommes CATSPER2⁻/⁻ montrent une hyperactivation induite par la progestérone abolie, échouant à la fécondation in vivo et in vitro ([[ref:catsper_human|JCI 2024]]). La signature pharmacologique est cohérente : les bloqueurs de CatSper (NNC55-0396) produisent les mêmes déficits de motilité et de réaction acrosomique que l'exposition EMF ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
    catsperEvolution: "CatSper est conservé de l'oursin à l'humain — le même canal contrôle la fécondation sur 600 millions d'années d'évolution. Les espèces aquatiques (oursins, saumons) utilisent CatSper dans la fécondation externe où les EMF des câbles sous-marins fournissent une expérience naturelle.",
    catsperDetailLink: "Chaîne complète de navigation reproductive en 9 étapes",
    sentinelTitle: "Preuves sentinelles et inter-espèces",
    sentinel: "Le Cross-Species Lag Index est un protocole de préparation pour joindre les résultats régionaux, le FieldState mesuré et les covariables de points finaux dans un test inter-espèces enregistré.",
    sentinelGradient: "Sur 7 espèces avec des taux de déclin reproductif quantifiables, le taux de déclin est corrélé au score d'exposition EMF à r = 0,909. Chiens ([[ref:lea2016|Lea et al. 2016]]) : −1,0 %/an de déclin spermatique sur 26 ans chez les chiens reproducteurs britanniques partageant l'exposition EMF domestique. Chevaux ([[ref:harris2023|Harris et al. 2023]]) : −0,75 %/an de déclin spermatique des étalons sur 35 ans. Le schéma s'étend aux abeilles, oiseaux, grenouilles et espèces aquatiques — chacun déclinant sur des chronologies proportionnelles à leur environnement électromagnétique.",
    sentinelTLink: "Ce gradient inter-espèces se connecte directement au déclin séculaire de la testostérone documenté chez l'humain : le même mécanisme EMF (VGCC → Ca²⁺ → perturbation reproductive) opère chez les chiens partageant notre environnement EMF domestique et produit le même taux de déclin de ~1 %/an. Le décalage T→TFR de 8 ans fournit une calibration temporelle — les pays avec une électrification plus précoce devraient montrer un début de déclin de T plus précoce (prédiction T-1).",
    sentinelGradientStat: "r = 0,909",
    sentinelGradientLabel: "Gradient EMF inter-espèces (7 espèces)",
    sentinelLink: "Voir l'état de préparation sentinelle",
    sentinelTDeclineLink: "Preuves du déclin de la testostérone",
    extPathway: "Voie",
    extLevel: "Niveau de preuve",
    extStatus: "Statut de migration",
    extScope: "Portée de traduction",
    extN: "N",
    dualInterpretationTitle: "Lecture des preuves : interprétation standard vs. BERM",
    dualInterpretationLead: "La même étude peut soutenir des conclusions opposées selon les biais supposés. Ce tableau montre comment les cadres standard et corrigé par BERM lisent les mêmes types de preuves.",
    dualInterpretationHeaders: { evidence: "Type de preuve", standard: "Interprétation standard", berm: "Interprétation BERM" },
    dualInterpretationRows: [
      {
        evidence: "L'étude ne trouve pas d'effet EMF significatif",
        standard: "L'EMF est sûr aux niveaux testés. Aucun mécanisme biologique.",
        berm: "Le groupe contrôle est contaminé (biais de référence du laboratoire). Le biais d'atténuation réduit l'effet apparent. Un résultat nul est attendu si un véritable contrôle d'exposition nulle est absent.",
      },
      {
        evidence: "L'étude trouve un effet EMF uniquement à SAR élevé",
        standard: "L'effet est thermique. Confirme les seuils ICNIRP.",
        berm: "La courbe dose-réponse peut avoir un effet fenêtre (Adey/Blackman). Un effet à SAR élevé n'exclut pas un effet à SAR faible — les réponses non monotones sont prédites par le RPM.",
      },
      {
        evidence: "La revue systématique de l'OMS évalue la certitude comme « modérée »",
        standard: "Les preuves sont modérées. Plus de RCT sont nécessaires.",
        berm: "La méthodologie de l'OMS est soumise à 15+ biais identifiés qui atténuent tous l'effet apparent. « Modéré » dans un cadre affecté par les biais peut correspondre à « élevé » dans un cadre corrigé des biais.",
      },
      {
        evidence: "Le PIB corrèle avec le TFR mieux que le proxy EMF",
        standard: "Le PIB/développement est le véritable moteur. L'EMF est un proxy du développement.",
        berm: "Le PIB est un « mauvais contrôle » (Pearl 2009) : l'électrification cause à la fois le PIB et l'EMF. Contrôler pour le PIB supprime l'effet causal d'intérêt (biais de médiateur inclus).",
      },
      {
        evidence: "L'étude montre un effet EMF positif (ex. augmentation des ROS)",
        standard: "Intéressant mais nécessite réplication. La taille de l'effet peut être faible.",
        berm: "La taille de l'effet est sous-estimée en raison du biais de référence du laboratoire. L'effet réel par rapport à la référence non exposée est plus grand que rapporté.",
      },
      {
        evidence: "Le RPM ne peut expliquer les effets aux fréquences télécom",
        standard: "La voie CRY/RPM est non pertinente pour les téléphones mobiles.",
        berm: "Correct pour la porteuse RF. Mais les signaux télécom contiennent une modulation ELF (GSM 217 Hz) dans la gamme de résonance du RPM. Le RPM répond à l'enveloppe de modulation, pas à la porteuse. Les effets de champ électrique sont médiés par la voie A (VGIC).",
      },
      {
        evidence: "L'IC de la prédiction TFR a été dépassé",
        standard: "Le modèle est faux. Les prédictions ont échoué.",
        berm: "Trois possibilités : (a) le modèle surestime, (b) compensation exogène (immigration, FIV, politique), (c) IC trop étroit. Des tests discriminants existent pour chacune.",
      },
    ],
    theraBionicTitle: "Validation clinique : TheraBionic",
    theraBionicLead: "Un dispositif médical approuvé par la FDA confirme le mécanisme central de BERM à des niveaux d'exposition bien inférieurs aux normes de sécurité actuelles.",
    theraBionicBody: "Le TheraBionic P1 est un dispositif médical approuvé par la FDA (HDE H220001, 2019) qui traite le carcinome hépatocellulaire avancé (cancer du foie) à l'aide de champs électromagnétiques radiofréquence à modulation d'amplitude à 27,12 MHz.",
    theraBionicMechanism: "Le dispositif fonctionne par le mécanisme EXACT que BERM décrit : EMF non thermique → canal calcique voltage-dépendant Cav3.2 de type T → influx de Ca²⁺ → effet biologique (différenciation des cellules tumorales). Ceci a été démontré par Jimenez et al. (2019) dans eBioMedicine/Lancet.",
    theraBionicSAR: "Le dispositif fonctionne à des niveaux de SAR 100 à 1 000× INFÉRIEURS à l'exposition au téléphone mobile. Cela confirme que l'EMF non thermique peut produire des effets biologiques significatifs via les canaux calciques voltage-dépendants à des niveaux d'exposition bien inférieurs aux normes de sécurité actuelles (ICNIRP/FCC).",
    theraBionicCCB: "L'étiquetage FDA indique explicitement que TheraBionic ne doit pas être utilisé avec des inhibiteurs calciques — une confirmation pharmacologique que l'effet thérapeutique opère via les canaux calciques.",
    theraBionicImplication: "Ce n'est pas une prédiction de BERM. C'est une confirmation indépendamment développée, cliniquement validée et approuvée par la FDA que l'EMF non thermique produit des effets biologiques via les canaux calciques voltage-dépendants.",
    theraBionicSurvival: "34% d'augmentation de la survie dans le CHC avancé",
    theraBionicDevice: "27,12 MHz AM-RF, fréquences spécifiques à la tumeur",
    theraBionicChannel: "Cav3.2 (CACNA1H) VGCC de type T",
    theraBionicLevel: "E — approuvé FDA, évalué par les pairs (Lancet/eBioMedicine)",
    tDeclineTitle: "Déclin de la testostérone : preuves internationales",
    tDeclineLead: "Un déclin séculaire de la testostérone indépendant de l'âge est documenté dans cinq pays sur quatre continents. Le schéma est constant : ~1%/an de déclin indépendant du vieillissement, des tendances d'IMC ou des facteurs de confusion liés au mode de vie. Les études qui ont trouvé « aucun déclin » après ajustement de l'IMC sont cohérentes avec le modèle médiateur : l'IMC est sur la voie causale, pas un facteur de confusion indépendant, donc l'ajuster supprime le vrai signal.",
    tDeclineStudies: [
      { referenceId: "travison2007_v2", country: "USA", study: "Travison et al. 2007 (MMAS)", n: "1 532", rate: "−1,0%/an", finding: "Déclin de T au niveau populationnel 1987–2004. Indépendant de l'âge : un homme de 65 ans en 2002 avait un T plus bas qu'un homme de 65 ans en 1987. Ajusté pour l'IMC — capture uniquement la voie directe.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "mazur2013", country: "USA", study: "Mazur et al. 2013 (PLOS ONE)", n: "991", rate: "−0,95%/an", finding: "Des vétérans US Air Force ayant maintenu leur poids ont perdu 117 ng/dL (19%) en 20 ans. Exclut l'obésité comme explication suffisante — la preuve décisive pour l'interprétation médiatrice.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "perheentupa2013", country: "Finlande", study: "Perheentupa et al. 2013", n: "3 271", rate: "−1,2%/an", finding: "Déclin de T dépendant de la cohorte de 37% (1972–2002). LH et FSH ont également décliné dans les cohortes ultérieures. Le TFR de la Finlande s'est effondré 35 ans plus tard.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "chodick-2020-israel", country: "Israël", study: "Chodick et al. 2020", n: "102 334", rate: "−1,02%/an", finding: "Plus grande étude individuelle : 102k hommes, Maccabi Healthcare. « Peu probable que l'obésité croissante explique. » T en déclin malgré le TFR élevé d'Israël — Phase 1 du modèle à seuil.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "santi2025", country: "Global", study: "Santi et al. 2025 (méta-analyse)", n: "1 064 891", rate: "p = 0,033", finding: "Plus grande méta-analyse jamais réalisée. T ET LH en déclin indépendamment de l'âge, de l'IMC et de la méthode de dosage. Pas de tendance temporelle de l'IMC dans cette population. « Réinitialisation continue de la fonction HPG. » Première confirmation du déclin simultané T + LH.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "andersson-2007-denmark", country: "Danemark", study: "Andersson et al. 2007", n: "5 350", rate: "nul après IMC", finding: "Le déclin a disparu après ajustement de l'IMC. Interprétation BERM : la voie médiée domine dans cette population — l'ajustement de l'IMC supprime le signal dominant. Cohérent avec le modèle médiateur, pas une contradiction.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Soutient l'hypothèse du médiateur : quand la voie IMC domine, l'ajustement de l'IMC produit un résultat nul." },
      { referenceId: "nyante2012_nhanes", country: "USA", study: "Nyante et al. 2012 (NHANES)", n: "2 315", rate: "aucun déclin", finding: "NHANES 1988–2004. Aucun déclin trouvé. Peut refléter un changement de dosage + suppression du médiateur. Ne contredit pas Travison — population différente, dosage différent, stratégie d'ajustement différente.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Cohérent avec le modèle médiateur dans une sous-population spécifique." },
    ],
    tDeclineImplication: "Si la testostérone continue de décliner au rythme actuel, chaque pays finira par franchir le seuil biologique où la sous-fertilité devient la contrainte limitante du TFR — indépendamment des facteurs culturels ou économiques.",
    tDeclineBmiNote: "Pourquoi les résultats « nuls » ne sont pas des contradictions : l'IMC peut être soit un facteur de confusion (cause indépendante) soit un médiateur (sur la voie causale). Si l'EMF cause simultanément l'augmentation de l'IMC et le déclin de T, alors l'IMC est un médiateur et l'ajuster supprime le vrai signal. Mazur 2013 le démontre : des hommes à poids stable ont quand même perdu 19% de leur testostérone. La voie directe représente environ deux tiers de l'effet total ; la voie médiée (via l'IMC) environ un tiers.",
    tDeclineLink: "Spécification complète du modèle à seuil",
    tDeclinePredLink: "Prédictions T→TFR",

    metabTitle: "Syndrome métabolique : six voies convergentes",
    metabLead: "Six voies EMF → Ca²⁺ indépendantes augmentent simultanément l'apport énergétique, diminuent la dépense énergétique et augmentent le stockage énergétique. CaMKII est la molécule de convergence connectant toutes les voies. L'obésité est multifactorielle — l'EMF est UN facteur contributif expliquant le résidu que le régime, l'exercice et la génétique seuls ne peuvent expliquer.",
    metabStudies: [
      { referenceId: "alshammari2022", authors: "Alshammari et al.", year: 2022, journal: "Nutrients", finding: "RF-EMF → perturbation hypothalamique → apport alimentaire ↑ chez humains et rats", mechanism: "1 : Appétit", level: "E" },
      { referenceId: "chen2016_glia", authors: "Chen et al.", year: 2016, journal: "eLife", finding: "Activation Ca²⁺ de la glie ARC → AgRP/NPY ↑ → apport alimentaire ↑ (lien direct Ca²⁺→appétit)", mechanism: "1 : Appétit", level: "E" },
      { referenceId: "maalouf2023", authors: "Maalouf et al.", year: 2023, journal: "IJMS", finding: "900 MHz → thermogenèse BAT ↓, activité mitochondriale ↓ (dose-réponse)", mechanism: "2 : BAT", level: "E" },
      { referenceId: "5g_bat2025", authors: "French group", year: 2025, journal: "IJMS", finding: "5G (3,5 GHz) → PRDM16 −49%, C/EBPβ −32% (marqueurs d'adipogenèse brune)", mechanism: "2 : BAT", level: "E" },
      { referenceId: "bhatt2012_glp1", authors: "Bhatt et al.", year: 2012, journal: "PLoS ONE", finding: "GLP-1 active ERK via le microdomaine Ca²⁺ du VGCC de type L dans les cellules β", mechanism: "3 : Insuline", level: "E" },
      { referenceId: "nifedipine_weight2011", authors: "Matsui et al.", year: 2011, journal: "Hypertension Res", finding: "Nifédipine (bloqueur de type L) → poids ↓, PGC-1α ↑ (test pharmacologique inverse)", mechanism: "Inverse", level: "E" },
      { referenceId: "screentime_meta2022", authors: "Haghjoo et al.", year: 2022, journal: "BMC Primary Care", finding: "44 études : temps d'écran → surpoids OR 1,273 (dose-réponse)", mechanism: "Tous", level: "E" },
      { referenceId: "klimentidis2010", authors: "Klimentidis et al.", year: 2010, journal: "Proc R Soc B", finding: "24 populations, 8 espèces, >20 000 animaux TOUS en gain de poids (p = 1,2×10⁻⁷)", mechanism: "Tous", level: "E" },
    ],
    metabKlimentidisTitle: "Le paradoxe de Klimentidis",
    metabKlimentidisP1: "Les animaux de laboratoire sous régimes contrôlés prennent du poids depuis des décennies. Les rats sauvages dans les villes grossissent. Les chiens et chats domestiques montrent la même tendance. La probabilité que cela se produise par hasard dans 24 populations et 8 espèces est p = 1,2 × 10⁻⁷.",
    metabKlimentidisP2: "Le régime est contrôlé (animaux de laboratoire). L'exercice est contrôlé (animaux de laboratoire). La génétique est contrôlée (lignées consanguines). Les perturbateurs endocriniens (BPA, phtalates) sont possibles mais n'expliquent pas simultanément les rats sauvages ET les animaux de laboratoire ET les animaux domestiques. Le seul facteur environnemental qui a augmenté dans TOUS ces environnements est l'exposition aux champs électromagnétiques.",
    metabKlimentidisNote: "Klimentidis et al. n'ont PAS étudié l'EMF. Les chercheurs ont suggéré des « facteurs encore non identifiés ». L'interprétation EMF est la dérivation de BERM, pas la leur.",
    metabModelLink: "Modèle de convergence CaMKII",
    metabPredLink: "Prédictions métaboliques",
    svgStandardVsBerm: "Standard vs BERM",
    svgStandard: "STANDARD",
    svgWeakNoEffect: "Champ faible → Pas d’effet",
    svgWeakAmplified: "Champ faible → Amplifié à la membrane",
    svgNoDoseResponse: "Pas de dose-réponse → Pas de mécanisme",
    svgWindowEffect: "Effet fenêtre → Résonance",
    svgMixedResults: "Résultats mixtes → Non concluant",
    svgModerators: "Modérateurs non contrôlés → Prévisible",
    svgTrueEffect: "Effet réel",
    svgVsZero: "vs. exposition nulle",
    svgLabBaseline: "Référence labo",
    svgControlContam: "Contam. témoin",
    svgSarThreshold: "Seuil SAR",
    svgPubBias: "Biais de publication",
    svgMediatorAdj: "Ajust. médiateur",
    svgBiasesNote: "15+ biais identifiés atténuent l’effet observé",
    svgObserved: "Observé",
    svgSameStudy: "Même étude → conclusion différente selon le modèle de biais supposé",
    standardInterpretation: "Interprétation standard",
    svgNullResult: "Résultat nul = pas d’effet",
    svgHighSar: "SAR élevé uniquement = thermique",
    svgGdpProxy: "PIB > proxy EMF",
    svgLinearDose: "Dose-réponse linéaire",
    bermInterpretation: "Interprétation BERM",
    svgContaminated: "Groupe témoin contaminé",
    svgWindowAdey: "Effet fenêtre (Adey/Blackman)",
    svgGdpBadControl: "PIB = mauvais contrôle (Pearl 2009)",
    svgNonMonotonic: "Réponse non monotone",
    subPagesTitle: "Pages de preuves thématiques",
    subPagesLead: "Analyses détaillées où les études individuelles sont synthétisées en arguments mécanistiques. Chaque récit synthétise des résultats publiés ; aucun n’établit un coefficient causal au niveau populationnel.",
    researchDomainsTitle: "11 domaines de recherche indépendants",
    convergenceDiagram: "Diagramme de convergence",
    bioActivity: "bio-activité",
    deviceLabel: "Dispositif",
    channelLabel: "Canal",
    belowLabel: "en dessous",
    outcomeLabel: "Résultat",
    levelLabel: "Niveau",
    mechanismLabel: "Mécanisme",
    sarComparisonLabel: "Comparaison SAR",
    ccbContraLabel: "Contre-indication aux inhibiteurs calciques",
    countryLabel: "Pays",
    studyLabel: "Étude",
    rateLabel: "Taux",
    tierLabel: "Niveau",
    findingTableLabel: "Résultat",
    causalAnalysisLabel: "Analyse causale",
    authorsLabel: "Auteurs",
    yearLabel: "Année",
    tDeclineForestPlot: "Diagramme en forêt du déclin de la testostérone",
    tDeclineMeanRate: "moyenne −1,0%/an",
    tDeclineDenmark: "Danemark (Andersson)",
    tDeclineFinland: "Finlande (Perheentupa)",
    tDeclineGlobal: "Global (Santi)",
    tDeclineRateUnit: "%/an",
    metabMatrixLabel: "Matrice de preuves métaboliques",
    weightLabel: "Poids",
    insulinLabel: "Insuline",
    directLabel: "Direct",
    indirectLabel: "Indirect",
    notTestedLabel: "Non testé",
    populationsWord: "populations",
    speciesWord: "espèces",
    appetiteLabel: "Appétit↑",
    sleepDownLabel: "Sommeil↓",
    microbiomeLabel: "Microbiome",
    cortisolLabel: "Cortisol",
    metabolicSyndromeLabel: "Syndrome métabolique",
    klimentidisAllGaining: "24 populations, 8 espèces — tous prennent du poids (p = 1,2×10⁻⁷)",
    citationLabel: "Référence",
    researcherLabel: "Chercheur",
    criticismLabel: "Critique",
    mechanismNowLabel: "Mécanisme (actuel)",
    nextLinkLabel: "Suivant",
    nextLinkTitle: "Critiques et réponses",
    researchDomainsLead: "Les voies mécanistiques de BERM s'appuient sur 11 domaines de recherche mutuellement indépendants. Aucun domaine seul ne suffit, mais leur convergence vers la même prédiction — l'activité biologique des champs électromagnétiques — est peu probable par hasard.",
    cry2PathwayNote: "Les effets en aval de CRY2 s'étendent au-delà de l'horloge circadienne. Yap et al. (2025) ont montré que CRY2 interagit physiquement avec TRPC1, un canal cationique de la famille TRP, et que ce complexe se transloque ensemble vers le noyau après exposition PEMF. Cette voie d'entrée du calcium est dépendante de CRY2 (bloquée par le silençage de CRY2), dépendante de la lumière (perdue dans l'obscurité) et dépendante du FAD (atténuée par le silençage de RFK) — tous les marqueurs du mécanisme RPM. Fait important, TRPC1 n'est PAS un canal calcique voltage-dépendant et n'est PAS bloqué par les bloqueurs VGCC de type L. Cela signifie que les voies A et C (B du site) restent pharmacologiquement séparables, mais l'empreinte biologique de la voie C est plus large qu'on ne le supposait auparavant.",
    solarTitle: "Cycle solaire et biologie géomagnétique : La 11e ligne de convergence",
    solarIntro: "BERM définit deux susceptibilités indépendantes : χ(Ā) (VGCC, couplage géométrique du champ) et χ_B (CRY/RPM, dynamique de spin des paires radicalaires). Le cycle solaire teste χ_B car il opère SANS seuil d'électrification — les variations géomagnétiques d'origine solaire modulent la chimie des paires radicalaires depuis des milliards d'années, bien avant les EMF anthropiques. Si les voies médiées par CRY sont réelles, leurs signatures devraient apparaître dans les rythmes biologiques de longueur du cycle solaire.",
    solarResearchLabel: "Preuves de recherche clés",
    solarStudies: [
      { authors: "Randall", year: "1990/1993", finding: "Périodicité de 11 ans du taux de natalité détectée dans 7 pays", mechanism: "Point final de population" },
      { authors: "Skjærvø et al.", year: "2015", finding: "Norvège préindustrielle (1676–1878, N=8 662) : les individus nés au maximum solaire vivaient 5,2 ans de moins", mechanism: "Point final de longévité" },
      { authors: "Burch et al.", year: "1999", finding: "Perturbation géomagnétique → réduction de l'excrétion du métabolite de la mélatonine (6-OHMS)", mechanism: "Suppression de la mélatonine" },
      { authors: "Weydahl et al.", year: "2001", finding: "Effet de suppression de la mélatonine le plus fort à 70°N (ovale auroral)", mechanism: "Gradient de latitude" },
      { authors: "Ferrari et al.", year: "2015", finding: "Pertes de retour des abeilles 2,7× lors des jours de tempête géomagnétique", mechanism: "Navigation CRY" },
      { authors: "Selås", year: "2004", finding: "r² = 0,84 corrélation : abondance de papillons de nuit vs. nombre de taches solaires", mechanism: "Point final écologique" },
      { authors: "Chizhevsky", year: "1922", finding: "80 % des 2 500 mouvements de masse historiques se regroupent autour des maxima solaires", mechanism: "Point final comportemental" },
    ],
    solarStatTitle: "Résultats statistiques",
    solarBandpass: "Passe-bande 8–14 ans : r = +0,58 (p < 0,0001) taux de natalité USA ; r = +0,81 dans la sous-fenêtre 1960–2000",
    solarFirstDiff: "Première différence : Δ-SSN vs Δ-CBR r = +0,20 (p = 0,032) retard 0",
    solarMonteCarlo: "Monte Carlo p = 0,997 — direction cohérente avec la prédiction confirmée par test de randomisation",
    solarReversal: "Inversion de direction 1998 : r_avant = +0,21 (1933–1997), r_après = −0,55 (1998–2022). Le changement de signe coïncide avec la transition de saturation RF.",
    solarSamaTitle: "SAMA : L'expérience de contrôle naturelle",
    solarSamaP1: "L'Anomalie Magnétique de l'Atlantique Sud (SAMA) est une région où le champ magnétique terrestre est d'environ 24 µT — environ la moitié des ~50 µT normaux. Ce champ naturellement affaibli crée une expérience de contrôle en géométrie géomagnétique.",
    solarSamaP2: "Analyse ESS 2026 : la corrélation vent solaire–violence qui s'applique à la plupart des latitudes S'INVERSE au Brésil et en Uruguay — exactement les populations sous la SAMA. Là où la géométrie géomagnétique change, la réponse biologique s'inverse.",
    solarNorthernTitle: "Le paquet nordique : Trois traits, une cible moléculaire",
    solarNorthernP1: "Trois traits co-sélectionnés dans les populations d'Europe du Nord convergent vers une seule cible moléculaire — le cryptochrome (CRY) :",
    solarNorthernTraits: [
      "Yeux bleus → transmission lumineuse 100× à travers l'iris → χ_optique (plus de photons atteignent le CRY rétinien)",
      "Tolérance au lactose → apport alimentaire B2/FAD → stabilité du cofacteur CRY → χ_moléculaire",
      "Haute latitude géomagnétique → champ ambiant fort → χ_géomagnétique",
    ],
    solarNorthernP2: "L'hypothèse de la vitamine D explique 2 des 3 traits (les yeux clairs et la haute latitude sélectionnent pour l'absorption UV). L'hypothèse CRY explique les 3 — y compris le lien autrement anomal entre la tolérance au lactose et la couleur des yeux.",
    solarDendroTitle: "Confirmation en temps profond : Dendrochronologie",
    solarDendroP1: "Le cycle solaire n'est pas un phénomène moderne. Les registres de cernes d'arbres confirment son fonctionnement continu à travers le temps géologique :",
    solarDendroStudies: [
      "Luthardt & Rößler 2018 : Une forêt pétrifiée de 290 millions d'années montre des cycles de croissance de 10,62 ± 0,08 ans — la périodicité solaire préservée dans le bois du Permien.",
      "Brehm et al. 2021 : 1 000 ans de données continues de ¹⁴C en cernes d'arbres confirment indépendamment la modulation solaire de la production d'isotopes cosmogéniques.",
      "Nature Communications 2025 : La confirmation du premier millénaire avant notre ère étend le registre continu, comblant le fossé entre les cycles solaires anciens et modernes.",
    ],
    solarDendroP2: "L'horloge biologique à laquelle la voie χ_B de BERM répond fonctionne sans interruption depuis au moins 290 millions d'années.",
  },
  ko: {
    title: "근거 등록부",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT}건의 한정 BERM v17 기록과 ${LEGACY_EVIDENCE_COUNT}건의 확장 카탈로그 항목, 13개 이상의 경로와 490편 이상의 동료 심사 연구에 걸쳐.`,
    interpretationTitle: "이 등록부 읽는 법",
    interpretation: [
      "필드 시그니처는 배경 벡터, 각도, 스펙트럼 또는 엔벨로프와 같은 측정 변수를 지원할 수 있지만, 인간 생식력 효과를 입증하지는 않는다.",
      "세포 또는 동물 실험은 명시된 조건 내에서 기계론적 중간체 또는 장기 종점을 지원할 수 있지만, 자동적으로 인간 집단 추정치가 되지는 않는다.",
      "리뷰는 문헌 군을 위치시킨다. 집단 시간 결과는 대응하는 FieldState, 종점 및 교란인자 통제가 존재하지 않는 한 기술적이다.",
      "아래의 어떤 기록도 TFR 계수가 아니다. 국가 TFR 경로는 모델 사양에서 별도의 ASFR 및 인구학적 항을 필요로 한다.",
    ],
    boundedTitle: "한정 v2 기록",
    boundedLead: "각 기록은 필드 클래스, 직접성, 번역 범위 및 제한을 명시한다. 이것은 BERM v17 인과 경로의 주요 근거 항목이다.",
    classificationTitle: "이전 부정적 발견의 분류 방법",
    channelGroupTitle: "세 주파수 채널",
    channelGroupLead: "각 생물학적 경로는 두 가지 생물학적 컷오프로 정의된 세 주파수 채널 중 하나에 대응한다: f_c ~ 1 kHz (막 RC) 및 f_RPM ~ 1 MHz (라디칼 쌍 결맞음).",
    extendedTitle: "확장 근거 카탈로그",
    extendedLead: `${LEGACY_EVIDENCE_COUNT}건의 추가 기록(BERM v17 참고문헌). 출처 수준 검토용으로 보존. 각각은 레거시 경로, 근거 수준 및 마이그레이션 상태로 분류.`,
    groups: {
      PHYSICS_SIGNATURE: "물리 시그니처",
      MECHANISTIC_INTERMEDIATE: "기계론적 중간체",
      REPRODUCTIVE_ENDPOINT: "생식 종점",
      ECOLOGICAL_ENDPOINT: "생태학적 종점",
      SYSTEMATIC_REVIEW: "체계적 리뷰",
      POPULATION_DESCRIPTIVE: "집단 기술 데이터",
    },
    fields: { nodes: "인과 노드", field: "필드 클래스", scope: "번역 범위", limitations: "제한사항", role: "교정 역할", source: "DOI / 출처" },
    structural: "구조적만",
    contextual: "맥락적만",
    anchorTitle: "메커니즘적 앵커",
    anchorP1: "[[ref:kalmijn1971|Kalmijn(J. Exp. Biol. 1971)]]은 판새류(상어와 가오리)가 로렌치니 기관을 통해 5 nV/cm(5 × 10⁻⁷ V/m)의 미약한 전기장을 신뢰성 있게 감지한다는 것을 실증했습니다. 이 임계값은 BERM이 사용하는 IFO-VGIC 민감도 수준보다 훨씬 낮습니다 — 척추동물 신경계는 현행 안전 기준이 생물학적으로 불활성으로 간주하는 강도에서 필드를 처리합니다.",
    anchorP2: "로렌치니 기관은 이온 채널 전도도 변화를 사용합니다 — VGCC 게이트 역학과 물리적으로 유사합니다. 이것은 더 민감한 동물의 다른 메커니즘이 아닙니다; 다른 조직에서 발현된 동일한 메커니즘(약한 전기장에 의한 이온 채널 교란)입니다. 척추동물에서 10⁻⁵에서 10⁻⁷ V/m의 필드 민감성의 계통발생적 보존은 '필드가 생물학에는 너무 약하다'는 반론을 직접 반박합니다.",
    anchorNote: "판새류 전기수용은 잘 확립된 감각 양식이며 논쟁의 여지가 없습니다. 포유류 VGCC 민감성으로의 외삽은 BERM 해석입니다 — 로렌치니 기관은 필드 감지에 최적화된 기하학적 구조를 가진 특수 감각 기관이며 포유류 조직에는 없습니다.",
    animalTitle: "동물 근거: 제어된 EMF 실험",
    animalP1: "[[ref:rodriguez2003|Rodriguez et al. (J. Reprod. Fert. 2003)]]은 맥길 대학교에서 제어된 실험에서 젖소 미경산우를 60 Hz EMF(10 kV/m, 30 µT)에 노출했습니다. 결과: 멜라토닌 감소(EMF가 인공적인 '긴 낮' 신호로 작용), 발정 주기 기간 증가(p < 0.01), 황체기 기간 증가(p < 0.01). [[ref:burchard2002|Burchard et al. (J. Dairy Sci. 2002)]]은 같은 EMF 노출이 IGF-1과 건물 섭취량을 증가시키는 것을 발견했습니다.",
    animalP2: "이것은 환경 수준의 ELF 장이 대형 포유류의 생식 내분비학을 변경한다는 직접적인 실험적 증거입니다. 그러나 젖소는 전기화 이래(~1950년대 이후) 안정적인 헛간 ELF에 노출되어 왔습니다. 육종 선택 압력은 어떤 EMF 효과보다 ~3 자릿수 더 큽니다. 이것이 가축이 BERM 센티넬 레지스트리에서 음성 대조군으로 올바르게 분류되는 이유입니다 — EMF는 생물학적으로 활성이지만, 선택이 이를 가립니다.",
    animalP3: "누설 전압 문헌(결함있는 배선으로 인한 밀리암페어의 접촉 전류)은 직교적입니다. Rodriguez는 만성적 장 노출(µT)을 측정했지, 급성 접촉 전류(mA)가 아닙니다. Rodriguez 유형의 연구만이 BERM의 메커니즘 — 생식 내분비학에 대한 만성적 저수준 ELF 장 효과 — 을 검증합니다.",
    animalNote: "Rodriguez/Burchard 실험은 명확한 생물학적 종점을 가진 동료 심사를 거친 제어된 연구입니다. 가축에 대한 음성 대조군 분류는 인구 수준 감소 감지(선택이 신호를 압도)에 적용되며, ELF가 생물학적으로 활성인지 여부(활성임)에는 적용되지 않습니다. 아미쉬 대 전통적 낙농 비교 — 아미쉬 헛간의 ELF가 더 낮은 — 가 다음의 유익한 테스트가 될 것입니다.",
    catsperTitle: "CatSper: 대체 불가능한 채널",
    catsperLead: "9개의 칼슘 의존 단계가 정자 생산에서 수정까지를 아우른다. CatSper는 모든 단계 — 수정능 획득, 주류성, 주온성, 주화성, 첨체 반응 — 에서 필요하며 생물학적 백업이 없다. 테스트된 모든 종에서 CatSper 녹아웃은 완전한 남성 불임을 생산한다.",
    catsperP1: "CatSper는 유일한 정자 특이적 칼슘 채널이다. 전압 의존적이고, pH 민감하며, 온도 의존적(Q₁₀ = 5.1, 역치 33.5°C)이고, 난구 세포의 피코몰 프로게스테론에 반응한다. EMF 유도 Ca²⁺ 조절 이상은 CatSper가 필요로 하는 정밀한 타이밍을 교란한다 — 조기 활성화가 정자가 난자에 도달하기 전에 유한한 에너지 저장을 고갈시킨다.",
    catsperP2: "CATSPER2⁻/⁻ 남성은 프로게스테론 유도 초활성화가 폐지되어 in vivo 및 in vitro 모두에서 수정에 실패한다 ([[ref:catsper_human|JCI 2024]]). 약리학적 시그니처는 일관적이다: CatSper 차단제(NNC55-0396)는 EMF 노출과 동일한 운동성 및 첨체 반응 결함을 생산한다 ([[ref:pmc6104424_nnc|Rennhack et al. 2018]]).",
    catsperEvolution: "CatSper는 성게에서 인간까지 보존되어 있다 — 동일한 채널이 6억 년의 진화에 걸쳐 수정을 제어한다. 수생 종(성게, 연어)은 외부 수정에서 CatSper를 사용하며, 해저 케이블의 EMF가 자연 실험을 제공한다.",
    catsperDetailLink: "완전한 9단계 생식 내비게이션 체인",
    sentinelTitle: "센티넬 및 종간 근거",
    sentinel: "Cross-Species Lag Index는 지역 결과, 측정된 FieldState 및 종점 공변량을 등록된 종간 테스트에 결합하기 위한 준비 프로토콜이다.",
    sentinelGradient: "정량 가능한 생식 감소율을 가진 7종에 걸쳐, 감소율은 EMF 노출 점수와 r = 0.909로 상관한다. 개 ([[ref:lea2016|Lea et al. 2016]]): 가정의 EMF 노출을 공유하는 영국 종견에서 26년간 정자 −1.0%/년 감소. 말 ([[ref:harris2023|Harris et al. 2023]]): 종마 정자 35년간 −0.75%/년 감소. 패턴은 꿀벌, 조류, 개구리 및 수생 종으로 확장 — 각각 전자기 환경에 비례하는 타임라인으로 감소.",
    sentinelTLink: "이 종간 기울기는 인간에서 기록된 테스토스테론의 세속적 감소에 직접 연결된다: 동일한 EMF 메커니즘(VGCC → Ca²⁺ → 생식 교란)이 우리의 가정 EMF 환경을 공유하는 개에서 작동하며 동일한 ~1%/년 감소율을 생산한다. T→TFR의 8년 시차가 시간적 교정을 제공한다 — 더 일찍 전기화된 나라는 더 이른 T 감소 시작을 보여야 한다(예측 T-1).",
    sentinelGradientStat: "r = 0.909",
    sentinelGradientLabel: "종간 EMF 기울기 (7종)",
    sentinelLink: "센티넬 준비 상태 보기",
    sentinelTDeclineLink: "테스토스테론 감소 근거",
    extPathway: "경로",
    extLevel: "근거 수준",
    extStatus: "마이그레이션 상태",
    extScope: "번역 범위",
    extN: "N",
    dualInterpretationTitle: "근거 읽기: 표준 vs. BERM 해석",
    dualInterpretationLead: "동일한 연구가 어떤 편향을 가정하느냐에 따라 반대 결론을 지지할 수 있다. 이 표는 표준 프레임워크와 BERM 보정 프레임워크가 동일한 근거 유형을 어떻게 읽는지 보여준다.",
    dualInterpretationHeaders: { evidence: "근거 유형", standard: "표준 해석", berm: "BERM 해석" },
    dualInterpretationRows: [
      {
        evidence: "연구에서 유의한 EMF 효과를 발견하지 못함",
        standard: "테스트된 수준에서 EMF는 안전. 생물학적 메커니즘 없음.",
        berm: "대조군이 오염됨 (실험실 기준선 편향). 감쇠 편향이 겉보기 효과를 감소. 진정한 제로 노출 대조가 없으면 제로 결과가 예상됨.",
      },
      {
        evidence: "연구에서 높은 SAR에서만 EMF 효과 발견",
        standard: "효과는 열적. ICNIRP 임계값을 확인.",
        berm: "용량-반응 곡선에 창 효과가 있을 수 있음 (Adey/Blackman). 높은 SAR에서의 효과가 낮은 SAR에서의 효과를 배제하지 않음 — 비단조 반응은 RPM이 예측.",
      },
      {
        evidence: "WHO 체계적 리뷰가 확실성을 '중간'으로 평가",
        standard: "근거는 중간. 더 많은 RCT 필요.",
        berm: "WHO의 방법론은 겉보기 효과를 모두 감쇠시키는 15개 이상의 식별된 편향의 영향을 받음. 편향이 있는 프레임워크에서의 '중간'은 편향 보정 프레임워크에서의 '높음'에 해당할 수 있음.",
      },
      {
        evidence: "GDP가 EMF 프록시보다 TFR과 더 잘 상관",
        standard: "GDP/발전이 실제 동인. EMF는 발전의 프록시.",
        berm: "GDP는 '나쁜 통제' (Pearl 2009): 전기화가 GDP와 EMF를 모두 유발. GDP 통제가 관심 인과 효과를 제거 (포함된 매개자 편향).",
      },
      {
        evidence: "연구에서 양의 EMF 효과 표시 (예: ROS 증가)",
        standard: "흥미롭지만 재현 필요. 효과 크기가 작을 수 있음.",
        berm: "효과 크기가 실험실 기준선 편향으로 과소평가됨. 비노출 기준선 대비 실제 효과는 보고된 것보다 큼.",
      },
      {
        evidence: "RPM이 통신 주파수에서 효과를 설명할 수 없음",
        standard: "CRY/RPM 경로는 휴대전화에 무관.",
        berm: "RF 반송파에 대해서는 맞음. 그러나 통신 신호는 RPM 공명 범위 내의 ELF 변조(GSM 217 Hz)를 포함. RPM은 반송파가 아닌 변조 엔벨로프에 반응. 전기장 효과는 경로 A (VGIC)를 통해 매개.",
      },
      {
        evidence: "TFR 예측 신뢰구간 초과",
        standard: "모델이 틀림. 예측 실패.",
        berm: "세 가지 가능성: (a) 모델 과대추정, (b) 외인성 보상 (이민, IVF, 정책), (c) CI가 너무 좁음. 각각에 대한 식별 테스트 존재.",
      },
    ],
    theraBionicTitle: "임상 검증: TheraBionic",
    theraBionicLead: "FDA 승인 의료기기가 현행 안전 기준보다 훨씬 낮은 노출 수준에서 BERM의 핵심 메커니즘을 확인.",
    theraBionicBody: "TheraBionic P1은 FDA 승인 의료기기(HDE H220001, 2019)로, 27.12 MHz에서 진폭 변조 고주파 전자기장을 사용하여 진행성 간세포암종(간암)을 치료한다.",
    theraBionicMechanism: "이 기기는 BERM이 기술하는 것과 정확히 동일한 메커니즘으로 작동한다: 비열적 EMF → Cav3.2 T형 전압 개폐 칼슘 채널 → Ca²⁺ 유입 → 생물학적 효과(종양 세포 분화). 이는 Jimenez et al. (2019)이 eBioMedicine/Lancet에서 실증하였다.",
    theraBionicSAR: "이 기기는 휴대전화 노출보다 100~1,000배 낮은 SAR 수준에서 작동한다. 이는 비열적 EMF가 현행 안전 기준(ICNIRP/FCC)보다 훨씬 낮은 노출 수준에서 전압 개폐 칼슘 채널을 통해 유의한 생물학적 효과를 생성할 수 있음을 확인한다.",
    theraBionicCCB: "FDA 라벨링은 TheraBionic을 칼슘 채널 차단제와 함께 사용해서는 안 된다고 명시적으로 기술하며 — 치료 효과가 칼슘 채널을 통해 작용함을 약리학적으로 확인한다.",
    theraBionicImplication: "이것은 BERM의 예측이 아니다. 비열적 EMF가 전압 개폐 칼슘 채널을 통해 생물학적 효과를 생성한다는 독립적으로 개발되고, 임상적으로 검증되고, FDA 승인된 확인이다.",
    theraBionicSurvival: "진행성 HCC에서 34% 생존율 증가",
    theraBionicDevice: "27.12 MHz AM-RF, 종양 특이적 주파수",
    theraBionicChannel: "Cav3.2 (CACNA1H) T형 VGCC",
    theraBionicLevel: "E — FDA 승인, 동료 심사 (Lancet/eBioMedicine)",
    tDeclineTitle: "테스토스테론 감소: 국제 근거",
    tDeclineLead: "연령 비의존적 세속적 테스토스테론 감소가 4개 대륙 5개국에서 기록되어 있다. 패턴은 일관적이다: 노화, BMI 추세 또는 생활습관 교란인자와 독립적으로 ~1%/년 감소. BMI 조정 후 '감소 없음'을 발견한 연구는 매개자 모델과 일치한다: BMI는 인과 경로 위에 있으며 독립적 교란인자가 아니므로, 조정하면 실제 신호가 제거된다.",
    tDeclineStudies: [
      { referenceId: "travison2007_v2", country: "미국", study: "Travison et al. 2007 (MMAS)", n: "1,532", rate: "−1.0%/yr", finding: "집단 수준 T 감소 1987–2004. 연령 비의존: 2002년 65세가 1987년 65세보다 낮은 T. BMI 조정 — 직접 경로만 포착.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "mazur2013", country: "미국", study: "Mazur et al. 2013 (PLOS ONE)", n: "991", rate: "−0.95%/yr", finding: "체중 유지 US Air Force 참전용사가 20년간 117 ng/dL (19%) 상실. 비만을 충분한 설명으로 배제 — 매개자 해석의 결정적 증거.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "perheentupa2013", country: "핀란드", study: "Perheentupa et al. 2013", n: "3,271", rate: "−1.2%/yr", finding: "37% 코호트 의존 T 감소 (1972–2002). LH와 FSH도 후기 코호트에서 감소. 핀란드의 TFR은 35년 후 붕괴.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "chodick-2020-israel", country: "이스라엘", study: "Chodick et al. 2020", n: "102,334", rate: "−1.02%/yr", finding: "최대 단일 연구: 10.2만 명, Maccabi Healthcare. '증가하는 비만으로 설명 불가능.' 이스라엘의 높은 TFR에도 T 감소 — 임계값 모델 1단계.", tier: "strong" as const, bmiIndependent: true },
      { referenceId: "santi2025", country: "글로벌", study: "Santi et al. 2025 (메타 분석)", n: "1,064,891", rate: "p = 0.033", finding: "역대 최대 메타 분석. T와 LH 모두 연령, BMI, 측정법과 독립적으로 감소. 이 집단에서 BMI 시간 추세 없음. 'HPG 기능의 지속적 재설정.' T + LH 동시 감소의 최초 확인.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { referenceId: "andersson-2007-denmark", country: "덴마크", study: "Andersson et al. 2007", n: "5,350", rate: "BMI 후 제로", finding: "BMI 조정 후 감소 소실. BERM 해석: 매개 경로가 이 집단에서 지배적 — BMI 조정이 지배적 신호를 제거. 매개자 모델과 일치, 모순이 아님.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "매개자 가설 지지: BMI 경로가 지배적일 때 BMI 조정이 제로를 산출." },
      { referenceId: "nyante2012_nhanes", country: "미국", study: "Nyante et al. 2012 (NHANES)", n: "2,315", rate: "감소 없음", finding: "NHANES 1988–2004. 감소 없음. 측정법 변경 + 매개자 제거 반영 가능. Travison과 모순 아님 — 다른 집단, 다른 측정법, 다른 조정 전략.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "특정 하위 집단에서 매개자 모델과 일치." },
    ],
    tDeclineImplication: "테스토스테론이 현재 속도로 계속 감소하면, 모든 국가는 결국 저생식력이 TFR의 구속 제약이 되는 생물학적 임계값을 넘게 된다 — 문화적 또는 경제적 요인과 무관하게.",
    tDeclineBmiNote: "왜 '제로' 결과가 모순이 아닌가: BMI는 교란인자(독립적 원인) 또는 매개자(인과 경로 위) 중 하나일 수 있다. EMF가 BMI 증가와 T 감소를 동시에 유발하면, BMI는 매개자이며 이를 조정하면 실제 신호가 제거된다. Mazur 2013이 이를 실증: 체중 유지 남성이 여전히 테스토스테론의 19%를 상실. 직접 경로가 전체 효과의 약 3분의 2를 차지; 매개 경로(BMI 경유)가 약 3분의 1을 차지.",
    tDeclineLink: "임계값 모델 전체 사양",
    tDeclinePredLink: "T→TFR 예측",

    metabTitle: "대사 증후군: 6개 수렴 경로",
    metabLead: "6개의 독립적 EMF → Ca²⁺ 경로가 동시에 에너지 섭취를 증가시키고, 에너지 소비를 감소시키며, 에너지 저장을 증가시킨다. CaMKII는 모든 경로를 연결하는 수렴 분자이다. 비만은 다인자적 — EMF는 식이, 운동, 유전학만으로는 설명할 수 없는 잔차를 설명하는 하나의 기여 인자이다.",
    metabStudies: [
      { referenceId: "alshammari2022", authors: "Alshammari et al.", year: 2022, journal: "Nutrients", finding: "RF-EMF → 시상하부 교란 → 인간과 쥐에서 식이 섭취↑", mechanism: "1: 식욕", level: "E" },
      { referenceId: "chen2016_glia", authors: "Chen et al.", year: 2016, journal: "eLife", finding: "ARC 아교세포의 Ca²⁺ 활성화 → AgRP/NPY↑ → 식이 섭취↑ (직접적 Ca²⁺→식욕 연결)", mechanism: "1: 식욕", level: "E" },
      { referenceId: "maalouf2023", authors: "Maalouf et al.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT 열발생↓, 미토콘드리아 활성↓ (용량-반응)", mechanism: "2: BAT", level: "E" },
      { referenceId: "5g_bat2025", authors: "French group", year: 2025, journal: "IJMS", finding: "5G (3.5 GHz) → PRDM16 −49%, C/EBPβ −32% (갈색 지방분화 마커)", mechanism: "2: BAT", level: "E" },
      { referenceId: "bhatt2012_glp1", authors: "Bhatt et al.", year: 2012, journal: "PLoS ONE", finding: "GLP-1이 L형 VGCC Ca²⁺ 미세도메인을 통해 β세포에서 ERK 활성화", mechanism: "3: 인슐린", level: "E" },
      { referenceId: "nifedipine_weight2011", authors: "Matsui et al.", year: 2011, journal: "Hypertension Res", finding: "니페디핀 (L형 차단제) → 체중↓, PGC-1α↑ (역약리학 시험)", mechanism: "역증", level: "E" },
      { referenceId: "screentime_meta2022", authors: "Haghjoo et al.", year: 2022, journal: "BMC Primary Care", finding: "44개 연구: 화면 시간 → 과체중 OR 1.273 (용량-반응)", mechanism: "전체", level: "E" },
      { referenceId: "klimentidis2010", authors: "Klimentidis et al.", year: 2010, journal: "Proc R Soc B", finding: "24개 집단, 8종, >20,000마리 동물 모두 체중 증가 (p = 1.2×10⁻⁷)", mechanism: "전체", level: "E" },
    ],
    metabKlimentidisTitle: "Klimentidis 역설",
    metabKlimentidisP1: "통제된 식이의 실험동물이 수십 년간 체중이 증가해 왔다. 도시의 야생 쥐가 뚱뚱해지고 있다. 반려견과 반려묘도 같은 추세를 보인다. 이것이 24개 집단과 8종에 걸쳐 우연히 발생할 확률은 p = 1.2 × 10⁻⁷이다.",
    metabKlimentidisP2: "식이는 배제됨 (실험동물). 운동은 배제됨 (실험동물). 유전학은 배제됨 (근교계). 내분비 교란물질 (BPA, 프탈레이트)은 가능하지만 야생 쥐와 실험동물과 반려동물을 동시에 설명하지 못한다. 이 모든 환경에서 증가한 유일한 환경 요인은 전자기장 노출이다.",
    metabKlimentidisNote: "Klimentidis et al.은 EMF를 연구하지 않았다. 연구자들은 '아직 확인되지 않은 요인'을 제안했다. EMF 해석은 BERM의 도출이며, 그들의 것이 아니다.",
    metabModelLink: "CaMKII 수렴 모델",
    metabPredLink: "대사 예측",
    svgStandardVsBerm: "표준 vs. BERM",
    svgStandard: "표준",
    svgWeakNoEffect: "약한 장→효과 없음",
    svgWeakAmplified: "약한 장→막에서 증폭",
    svgNoDoseResponse: "용량-반응 없음→메커니즘 없음",
    svgWindowEffect: "창 효과→공명",
    svgMixedResults: "혼합 결과→결론 불가",
    svgModerators: "비통제 조절인자→예측 가능",
    svgTrueEffect: "실제 효과",
    svgVsZero: "제로 노출 대비",
    svgLabBaseline: "실험실 기준선",
    svgControlContam: "대조 오염",
    svgSarThreshold: "SAR 임계값",
    svgPubBias: "출판 편향",
    svgMediatorAdj: "매개자 조정",
    svgBiasesNote: "15개 이상의 식별된 편향이 관측 효과를 감쇠",
    svgObserved: "관측",
    svgSameStudy: "같은 연구→가정하는 편향 모델에 따라 다른 결론",
    standardInterpretation: "표준 해석",
    svgNullResult: "제로 결과 = 효과 없음",
    svgHighSar: "높은 SAR만 = 열적",
    svgGdpProxy: "GDP > EMF 프록시",
    svgLinearDose: "선형 용량-반응",
    bermInterpretation: "BERM 해석",
    svgContaminated: "오염된 대조군",
    svgWindowAdey: "창 효과 (Adey/Blackman)",
    svgGdpBadControl: "GDP = 나쁜 통제 (Pearl 2009)",
    svgNonMonotonic: "비단조 반응",
    subPagesTitle: "주제별 근거 페이지",
    subPagesLead: "개별 연구가 기계론적 논거로 합성되는 상세 분석. 각 서사는 발표된 발견을 합성하지만, 집단 수준 인과 계수를 확립하지는 않는다.",
    researchDomainsTitle: "11개 독립 연구 영역",
    convergenceDiagram: "수렴 다이어그램",
    bioActivity: "생물 활성",
    deviceLabel: "장치",
    channelLabel: "채널",
    belowLabel: "이하",
    outcomeLabel: "결과",
    levelLabel: "수준",
    mechanismLabel: "메커니즘",
    sarComparisonLabel: "SAR 비교",
    ccbContraLabel: "칼슐 채널 차단제 금기",
    countryLabel: "국가",
    studyLabel: "연구",
    rateLabel: "비율",
    tierLabel: "등급",
    findingTableLabel: "발견",
    causalAnalysisLabel: "인과 분석",
    authorsLabel: "저자",
    yearLabel: "연도",
    tDeclineForestPlot: "테스토스테론 감소 포레스트 플롯",
    tDeclineMeanRate: "평균 −1.0%/년",
    tDeclineDenmark: "덴마크 (Andersson)",
    tDeclineFinland: "핀란드 (Perheentupa)",
    tDeclineGlobal: "글로벌 (Santi)",
    tDeclineRateUnit: "%/년",
    metabMatrixLabel: "대사 근거 매트릭스",
    weightLabel: "체중",
    insulinLabel: "인슐린",
    directLabel: "직접",
    indirectLabel: "간접",
    notTestedLabel: "미테스트",
    populationsWord: "집단",
    speciesWord: "종",
    appetiteLabel: "식욕↑",
    sleepDownLabel: "수면↓",
    microbiomeLabel: "마이크로바이옴",
    cortisolLabel: "코르티솔",
    metabolicSyndromeLabel: "대사 증후군",
    klimentidisAllGaining: "24개 집단, 8종 — 모두 체중 증가 (p = 1.2×10⁻⁷)",
    citationLabel: "인용",
    researcherLabel: "연구자",
    criticismLabel: "비판",
    mechanismNowLabel: "메커니즘 (현재)",
    nextLinkLabel: "다음",
    nextLinkTitle: "비판과 응답",
    researchDomainsLead: "BERM의 기계론적 경로는 11개의 상호 독립적인 연구 분야에 기반한다. 어떤 단일 분야도 충분하지 않지만, 동일한 예측 — 전자기장의 생물학적 활성 — 으로의 수렴은 우연으로는 일어나기 어렵다.",
    cry2PathwayNote: "CRY2의 하류 효과는 일주기 시계를 넘어 확장된다. Yap et al. (2025)은 CRY2가 TRP 계열 양이온 채널인 TRPC1과 물리적으로 상호작용하며, 이 복합체가 PEMF 노출 후 함께 핵으로 이동함을 보여주었다. 이 칼슘 유입 경로는 CRY2 의존적이고 (CRY2 침묵에 의해 차단), 광 의존적이며 (암소에서 소실), FAD 의존적이다 (RFK 침묵에 의해 감쇠) — 모두 RPM 메커니즘의 특징이다. 중요하게도, TRPC1은 전위 의존성 칼슘 채널이 아니며 L형 VGCC 차단제로 차단되지 않는다. 이는 경로 A와 C (사이트의 B)가 약리학적으로 분리 가능하게 유지됨을 의미하지만, 경로 C의 생물학적 범위는 이전에 가정된 것보다 크다.",
    solarTitle: "태양 주기와 지자기 생물학: 제11 수렴선",
    solarIntro: "BERM은 두 가지 독립적 감수성을 정의한다: χ(Ā) (VGCC, 기하학적 장 결합)와 χ_B (CRY/RPM, 라디칼쌍 스핀 역학). 태양 주기는 χ_B를 검증한다. 전기화 임계값 없이 작동하기 때문이다 — 태양 구동 지자기 변동은 인위적 EMF 훨씬 이전, 수십억 년 동안 라디칼쌍 화학을 조절해 왔다. CRY 매개 경로가 실재한다면, 그 시그니처가 태양 주기 길이의 생물학적 리듬에 나타나야 한다.",
    solarResearchLabel: "핵심 연구 근거",
    solarStudies: [
      { authors: "Randall", year: "1990/1993", finding: "7개국에서 11년 주기 출생률 변동 감지", mechanism: "집단 종점" },
      { authors: "Skjærvø et al.", year: "2015", finding: "전산업 노르웨이 (1676–1878, N=8,662): 태양 극대기 출생자가 5.2년 단명", mechanism: "수명 종점" },
      { authors: "Burch et al.", year: "1999", finding: "지자기 교란 → 멜라토닌 대사물질 (6-OHMS) 배출 감소", mechanism: "멜라토닌 억제" },
      { authors: "Weydahl et al.", year: "2001", finding: "멜라토닌 억제 효과 70°N(오로라 오발)에서 가장 강함", mechanism: "위도 기울기" },
      { authors: "Ferrari et al.", year: "2015", finding: "지자기 폭풍일에 꿀벌 귀소 손실 2.7배", mechanism: "CRY 내비게이션" },
      { authors: "Selås", year: "2004", finding: "r² = 0.84 상관: 나방 풍도 vs. 태양 흑점수", mechanism: "생태학적 종점" },
      { authors: "Chizhevsky", year: "1922", finding: "2,500건의 역사적 대중 운동의 80%가 태양 극대기 주변에 집중", mechanism: "행동 종점" },
    ],
    solarStatTitle: "통계적 결과",
    solarBandpass: "대역통과 8–14년: r = +0.58 (p < 0.0001) 미국 출생률, 1960–2000 하위 구간 r = +0.81",
    solarFirstDiff: "1차 차분: Δ-SSN vs Δ-CBR r = +0.20 (p = 0.032) 시차 0",
    solarMonteCarlo: "몬테카를로 p = 0.997 — 예측 부합 방향이 무작위화 검정으로 확인",
    solarReversal: "방향 반전 1998: r_이전 = +0.21 (1933–1997), r_이후 = −0.55 (1998–2022). 부호 변화는 RF 포화 전환과 일치.",
    solarSamaTitle: "SAMA: 자연의 대조 실험",
    solarSamaP1: "남대서양 자기 이상(SAMA)은 지구 자기장이 약 24 µT — 정상 ~50 µT의 약 절반 — 인 영역이다. 이 자연적으로 약화된 자기장이 지자기 기하학의 대조 실험을 만든다.",
    solarSamaP2: "ESS 2026 분석: 대부분의 위도에서 성립하는 태양풍-폭력 상관이 브라질과 우루과이에서 역전된다 — 정확히 SAMA 아래의 집단이다. 지자기 기하학이 변하는 곳에서 생물학적 반응이 반전된다.",
    solarNorthernTitle: "북방 패키지: 세 형질, 하나의 분자 표적",
    solarNorthernP1: "북유럽 집단에서 공동 선택된 세 형질이 단일 분자 표적 — 크립토크롬(CRY)으로 수렴한다:",
    solarNorthernTraits: [
      "파란 눈 → 홍채를 통한 100배 광투과 → χ_광학 (더 많은 광자가 망막 CRY에 도달)",
      "유당 내성 → B2/FAD 식이 공급 → CRY 보조인자 안정성 → χ_분자",
      "높은 지자기 위도 → 강한 주변 자기장 → χ_지자기",
    ],
    solarNorthernP2: "비타민 D 가설은 3개 형질 중 2개를 설명한다 (밝은 눈과 고위도는 UV 흡수에 선택된다). CRY 가설은 3개 모두를 설명한다 — 유당 내성과 눈 색깔의 이상적 연관을 포함하여.",
    solarDendroTitle: "심층 시간 확인: 연륜연대학",
    solarDendroP1: "태양 주기는 현대적 현상이 아니다. 나이테 기록이 지질 시간에 걸친 연속 작동을 확인한다:",
    solarDendroStudies: [
      "Luthardt & Rößler 2018: 2억 9천만 년 된 규화림이 10.62 ± 0.08년 성장 주기를 보임 — 페름기 목재에 태양 주기성 보존.",
      "Brehm et al. 2021: 1,000년의 연속 ¹⁴C 나이테 데이터가 우주선 생성 동위원소 생산의 태양 변조를 독립적으로 확인.",
      "Nature Communications 2025: 기원전 1천년기 확인이 연속 기록을 확장하여 고대와 현대 태양 주기 간 공백을 메움.",
    ],
    solarDendroP2: "BERM의 χ_B 경로가 반응하는 생물학적 시계는 적어도 2억 9천만 년간 중단 없이 작동해 왔다.",
  },
} as const;

const SUB_PAGES = [
  {
    slug: "devices",
    icon: Zap,
    en: { title: "Therapeutic Device Paradox", desc: "26 FDA-approved non-thermal EMF devices vs. ICNIRP's 'no effect' assumption. The logical contradiction at the heart of EMF regulation." },
    fi: { title: "Terapeuttisten laitteiden paradoksi", desc: "26 FDA-hyväksyttyä ei-termistä EMF-laitetta vs. ICNIRP:n 'ei vaikutusta' -oletus. Looginen ristiriita EMF-regulaation ytimessä." },
    ja: { title: "治療機器のパラドックス", desc: "26のFDA承認非熱的EMF機器 vs. ICNIRPの「効果なし」仮定。EMF規制の中核にある論理的矛盾。" },
    fr: { title: "Le paradoxe des dispositifs therapeutiques", desc: "26 dispositifs EMF non thermiques approuves par la FDA vs. l'hypothese « sans effet » de l'ICNIRP. La contradiction logique au coeur de la reglementation EMF." },
    ko: { title: "치료 기기 역설", desc: "26개 FDA 승인 비열적 EMF 기기 vs. ICNIRP의 '효과 없음' 가정. EMF 규제 핵심의 논리적 모순." },
  },
  {
    slug: "pharmacology",
    icon: Pill,
    en: { title: "Pharmacological Evidence", desc: "8 drug classes converging on BERM pathways: CCBs (264k studies), verapamil, lithium, semaglutide, gabapentinoids, nimodipine, melatonin, CoQ10. The model's clinically strongest argument." },
    fi: { title: "Farmakologinen evidenssi", desc: "8 lääkeryhmää konvergoivat BERM-reiteillä: CCB:t (264k tutkimusta), verapamiili, litium, semaglutidi, gabapentinoidit, nimodipiini, melatoniini, CoQ10. Mallin kliinisesti vahvin argumentti." },
    ja: { title: "薬理学的エビデンス", desc: "BERM経路に収束する8つの薬物クラス：CCB（264k研究）、ベラパミル、リチウム、セマグルチド、ガバペンチノイド、ニモジピン、メラトニン、CoQ10。モデルの臨床的に最も強力な論拠。" },
    fr: { title: "Preuves pharmacologiques", desc: "8 classes de medicaments convergent sur les voies BERM : CCB (264k etudes), verapamil, lithium, semaglutide, gabapentinoides, nimodipine, melatonine, CoQ10. L'argument cliniquement le plus fort du modele." },
    ko: { title: "약리학적 근거", desc: "BERM 경로에 수렴하는 8개 약물 클래스: CCB(264k 연구), 베라파밀, 리튬, 세마글루타이드, 가바펜티노이드, 니모디핀, 멜라토닌, CoQ10. 모델의 임상적으로 가장 강력한 논거." },
  },
  {
    slug: "infant-vulnerability",
    icon: Baby,
    en: { title: "Infant Vulnerability & SIDS", desc: "The resonance threshold: Q-factor physics (GABA excitatory → undamped oscillator), Japan/Hong Kong three-protections paradox, 8 pharmacological pathways, neurodevelopmental impact spectrum, 12 predictions." },
    fi: { title: "Imeväisen haavoittuvuus ja SIDS", desc: "Resonanssikynnys: Q-tekijäfysiikka (GABA eksitatorinen → vaimentamaton oskillaattori), Japanin/Hongkongin kolmen suojan paradoksi, 8 farmakologista reittiä, neurokehitysspektri, 12 ennustetta." },
    ja: { title: "乳児の脆弱性とSIDS", desc: "共鳴閾値：Q因子物理学（GABA興奮性→非減衰振動子）、日本/香港の三重保護パラドックス、8つの薬理学的経路、神経発達影響スペクトル、12の予測。" },
    fr: { title: "Vulnerabilite du nourrisson et SMIN", desc: "Le seuil de resonance : physique du facteur Q (GABA excitateur → oscillateur non amorti), paradoxe des trois protections Japon/Hong Kong, 8 voies pharmacologiques, spectre d'impact neurodeveloppemental, 12 predictions." },
    ko: { title: "영아 취약성과 SIDS", desc: "공명 임계값: Q인자 물리학(GABA 흥분성→비감쇠 진동자), 일본/홍콩 3중 보호 역설, 8개 약리학적 경로, 신경발달 영향 스펙트럼, 12개 예측." },
  },
  {
    slug: "neurological-spectrum",
    icon: BrainCircuit,
    en: { title: "Neurological Spectrum: Epilepsy, Migraine, Cluster Headache", desc: "One Q-factor mechanism, four neurological disorders: SIDS, epilepsy/SUDEP, migraine (CSD), cluster headache. López-Martín validation, pharmacological cross-map, psilocybin tryptamine reset." },
    fi: { title: "Neurologinen spektri: Epilepsia, migreeni, klusteripäänsärky", desc: "Yksi Q-tekijämekanismi, neljä neurologista sairautta: SIDS, epilepsia/SUDEP, migreeni (CSD), klusteripäänsärky. López-Martín-validaatio, farmakologinen ristikartta, psilosybiini-tryptamiiniresetti." },
    ja: { title: "神経学的スペクトル：てんかん、片頭痛、群発頭痛", desc: "1つのQ因子メカニズム、4つの神経学的疾患：SIDS、てんかん/SUDEP、片頭痛（CSD）、群発頭痛。Lopez-Martin検証、薬理学的クロスマップ、サイロシビン・トリプタミンリセット。" },
    fr: { title: "Spectre neurologique : epilepsie, migraine, cephalee en grappe", desc: "Un mecanisme de facteur Q, quatre troubles neurologiques : SMIN, epilepsie/SUDEP, migraine (CSD), cephalee en grappe. Validation Lopez-Martin, carte pharmacologique croisee, reinitialisation tryptamine psilocybine." },
    ko: { title: "신경학적 스펙트럼: 간질, 편두통, 군발두통", desc: "하나의 Q인자 메커니즘, 네 가지 신경학적 질환: SIDS, 간질/SUDEP, 편두통(CSD), 군발두통. Lopez-Martin 검증, 약리학적 교차 맵, 실로시빈 트립타민 리셋." },
  },
  {
    slug: "unbroken-chain",
    icon: Link2,
    en: { title: "The Unbroken Chain: Photon → Population", desc: "Convergence verification across 35 scales — 25 verified layers (VK1–VK25), 14 positive feedback loops forming a self-amplifying network from photon physics to population epidemiology." },
    fi: { title: "Katkeamaton ketju: Fotoni → Populaatio", desc: "Konvergenssiverifiointi 35 skaalan yli — 25 verifioitua kerrosta (VK1–VK25), 14 positiivista takaisinkytkentäsilmukkaa muodostavat itseään vahvistavan verkoston fotonifysiikasta väestöepidemiologiaan." },
    ja: { title: "途切れない連鎖：光子→集団", desc: "35のスケールにわたる収束検証 — 25の検証済み層（VK1-VK25）、14の正のフィードバックループが光子物理学から集団疫学まで自己増幅ネットワークを形成。" },
    fr: { title: "La chaine ininterrompue : Photon → Population", desc: "Verification de convergence sur 35 echelles — 25 couches verifiees (VK1-VK25), 14 boucles de retro-action positive formant un reseau auto-amplificateur de la physique des photons a l'epidemiologie populationnelle." },
    ko: { title: "끊어지지 않는 사슬: 광자→집단", desc: "35개 스케일에 걸친 수렴 검증 — 25개 검증 층(VK1-VK25), 광자 물리학에서 집단 역학까지 자기 증폭 네트워크를 형성하는 14개 양의 피드백 루프." },
  },
  {
    slug: "heavy-metal-synergy",
    icon: FlaskRound,
    en: { title: "Heavy Metal × EMF Synergy", desc: "Cd²⁺ permeates Cav3.1, Pb²⁺ mimics Ca²⁺ at CaM, MeHg increases T-type currents. Pineal gland calcification (PGC) as convergent mechanism. Five metals, one VGCC entry pathway." },
    fi: { title: "Raskasmetalli × EMF -synergismi", desc: "Cd²⁺ permeoi Cav3.1:n, Pb²⁺ matkii Ca²⁺:ia CaM:ssa, MeHg kasvattaa T-tyypin virtoja. Pineaalirauhasen kalsifikaatio (PGC) konvergenttina mekanismina. Viisi metallia, yksi VGCC-sisäänreitti." },
    ja: { title: "重金属 × EMFシナジー", desc: "Cd²⁺はCav3.1を透過、Pb²⁺はCaMでCa²⁺を模倣、MeHgはT型電流を増加。松果体石灰化（PGC）が収束メカニズム。5つの金属、1つのVGCC進入経路。" },
    fr: { title: "Synergie metaux lourds × EMF", desc: "Cd²⁺ permee Cav3.1, Pb²⁺ imite Ca²⁺ au niveau de CaM, MeHg augmente les courants de type T. Calcification pineale (PGC) comme mecanisme convergent. Cinq metaux, une voie d'entree VGCC." },
    ko: { title: "중금속 × EMF 시너지", desc: "Cd²⁺는 Cav3.1을 투과, Pb²⁺는 CaM에서 Ca²⁺를 모방, MeHg는 T형 전류 증가. 송과체 석회화(PGC)가 수렴 메커니즘. 5개 금속, 하나의 VGCC 진입 경로." },
  },
  {
    slug: "klimentidis-explained",
    icon: FlaskConical,
    en: { title: "Klimentidis Paradox", desc: "Three Ca²⁺ mechanisms explaining cross-species obesity" },
    fi: { title: "Klimentidiksen paradoksi", desc: "Kolme Ca²⁺-mekanismia selittämässä lajienvälisen lihavuuden" },
    ja: { title: "Klimentidisのパラドックス", desc: "種間肥満を説明する3つのCa²⁺メカニズム" },
    fr: { title: "Le paradoxe de Klimentidis", desc: "Trois mecanismes Ca²⁺ expliquant l'obesite inter-especes" },
    ko: { title: "Klimentidis 역설", desc: "종간 비만을 설명하는 3가지 Ca²⁺ 메커니즘" },
  },
  {
    slug: "triple-strikes",
    icon: Target,
    en: { title: "Triple Strikes: Convergent Destruction", desc: "Three triple blows — testosterone, fertility, and cognition each attacked via three independent routes simultaneously. Convergent destruction through one upstream mechanism." },
    fi: { title: "Kolmoisisku: Konvergentti tuho", desc: "Kolme kolmoisiskua — testosteroni, hedelmällisyys ja kognitio kukin hyökkäyksen kohteena kolmea itsenäistä reittiä pitkin samanaikaisesti. Konvergentti tuho yhden ylävirran mekanismin kautta." },
    ja: { title: "トリプルストライク：収束的破壊", desc: "3つの三重打撃 — テストステロン、生殖能力、認知がそれぞれ3つの独立した経路で同時に攻撃される。1つの上流メカニズムによる収束的破壊。" },
    fr: { title: "Triple frappe : Destruction convergente", desc: "Trois triples coups — testosterone, fertilite et cognition chacun attaque via trois voies independantes simultanement. Destruction convergente par un mecanisme en amont unique." },
    ko: { title: "트리플 스트라이크: 수렴적 파괴", desc: "세 가지 삼중 타격 — 테스토스테론, 생식력, 인지가 각각 세 독립 경로를 통해 동시 공격. 하나의 상류 메커니즘에 의한 수렴적 파괴." },
  },
  {
    slug: "walker-chain",
    icon: Link2,
    en: { title: "Walker Chain: Sleep → T → Collapse", desc: "The complete causal chain from EMF to testosterone decline via sleep is now closed. Seven verified branches form a self-amplifying loop." },
    fi: { title: "Walkerin ketju: Uni → T → Romahdus", desc: "Täydellinen kausaaliketju EMF:stä testosteronin laskuun unen kautta on nyt suljettu. Seitsemän verifioitua haaraa muodostavat itseään vahvistavan silmukan." },
    ja: { title: "Walkerチェーン：睡眠→T→崩壊", desc: "EMFから睡眠を介したテストステロン低下への完全な因果連鎖が閉じた。7つの検証済み分岐が自己増幅ループを形成。" },
    fr: { title: "Chaine de Walker : Sommeil → T → Effondrement", desc: "La chaine causale complete de l'EMF au declin de la testosterone via le sommeil est maintenant fermee. Sept branches verifiees forment une boucle auto-amplificatrice." },
    ko: { title: "Walker 사슬: 수면→T→붕괴", desc: "EMF에서 수면을 통한 테스토스테론 감소까지의 완전한 인과 사슬이 닫혔다. 7개 검증 분기가 자기 증폭 루프 형성." },
  },
  {
    slug: "gut-brain-axis",
    icon: FlaskConical,
    en: { title: "Gut-Brain Axis: The Second Barrier Falls", desc: "Circadian disruption → Per2↓ → gut barrier↓ → LPS → neuroinflammation. The gut barrier uses the same tight junction proteins as the BBB." },
    fi: { title: "Suolisto-aivo-akseli: Toinen este murtuu", desc: "Sirkadiaanihäiriö → Per2↓ → suoliston este↓ → LPS → neurotulehdus. Suoliston este käyttää samoja tiiviin liitoksen proteiineja kuin BBB." },
    ja: { title: "腸脳軸：第二のバリアが崩壊", desc: "概日リズム障害→Per2↓→腸管バリア↓→LPS→神経炎症。腸管バリアはBBBと同じタイトジャンクションタンパク質を使用。" },
    fr: { title: "Axe intestin-cerveau : La deuxieme barriere tombe", desc: "Perturbation circadienne → Per2↓ → barriere intestinale↓ → LPS → neuroinflammation. La barriere intestinale utilise les memes proteines de jonction serree que la BHE." },
    ko: { title: "장-뇌 축: 두 번째 장벽 붕괴", desc: "일주기 교란→Per2↓→장 장벽↓→LPS→신경염증. 장 장벽은 BBB와 동일한 밀착연접 단백질 사용." },
  },
  {
    slug: "lighting",
    icon: Lightbulb,
    en: { title: "IF Channel: Lighting & Display Transition", desc: "LED switch-mode power supplies, spermatogenesis connection, and the VDT precedent. The overlooked intermediate-frequency channel." },
    fi: { title: "IF-kanava: Valaistus ja näyttösiirtymä", desc: "LED-hakkuriteholähteet, spermatogeneesiyhteys ja VDT-ennakkotapaus. Huomiotta jäänyt keskitaajuuskanava." },
    ja: { title: "IFチャネル：照明とディスプレイの移行", desc: "LEDスイッチモード電源、精子形成との関連、VDT先例。見過ごされた中間周波数チャネル。" },
    fr: { title: "Canal IF : Transition eclairage et affichage", desc: "Alimentations a decoupage LED, connexion a la spermatogenese et precedent VDT. Le canal de frequence intermediaire neglige." },
    ko: { title: "IF 채널: 조명 및 디스플레이 전환", desc: "LED 스위칭 모드 전원, 정자형성 연결, VDT 선례. 간과된 중간주파수 채널." },
  },
  {
    slug: "cascades",
    icon: Activity,
    en: { title: "Disease Cascade: Ion Channel Convergence", desc: "Ionic hierarchy, skin battery, ADHD calibration, and 8 diseases traced to one ion channel model." },
    fi: { title: "Sairauskaskadi: Ionikanavakonvergenssi", desc: "Ioninen hierarkia, ihon akku, ADHD-kalibraatio ja 8 sairautta jäljitettynä yhteen ionikanavamalliin." },
    ja: { title: "疾病カスケード：イオンチャネル収束", desc: "イオン階層、皮膚電池、ADHD校正、1つのイオンチャネルモデルに追跡された8つの疾患。" },
    fr: { title: "Cascade de maladies : Convergence des canaux ioniques", desc: "Hierarchie ionique, batterie cutanee, calibration ADHD, et 8 maladies tracees a un modele de canal ionique unique." },
    ko: { title: "질병 캐스케이드: 이온 채널 수렴", desc: "이온 계층구조, 피부 배터리, ADHD 교정, 하나의 이온 채널 모델로 추적된 8가지 질병." },
  },
  {
    slug: "bbb",
    icon: Brain,
    en: { title: "Blood-Brain Barrier & Neurodegeneration", desc: "BBB tight junction disruption, Alzheimer's calcium upstream hypothesis, and the hospital EMF hypothesis." },
    fi: { title: "Veri-aivoeste ja neurodegeneraatio", desc: "BBB:n tight junction -häiriö, Alzheimerin kalsium-ylävirta-hypoteesi ja sairaala-EMF-hypoteesi." },
    ja: { title: "血液脳関門と神経変性", desc: "BBBタイトジャンクション障害、アルツハイマーのカルシウム上流仮説、病院EMF仮説。" },
    fr: { title: "Barriere hemato-encephalique et neurodegenerescence", desc: "Perturbation des jonctions serrees de la BHE, hypothese du calcium en amont pour Alzheimer, et hypothese EMF hospitaliere." },
    ko: { title: "혈액뇌장벽과 신경퇴행", desc: "BBB 밀착연접 교란, 알츠하이머 칼슘 상류 가설, 병원 EMF 가설." },
  },
  {
    slug: "circadian",
    icon: Moon,
    en: { title: "Circadian Disruption, Sleep & Recovery", desc: "Melatonin bridge, sleep deprivation as mediator, recovery window elimination, and behavioral suppression." },
    fi: { title: "Sirkadiaaninen häiriö, uni ja palautuminen", desc: "Melatoniinisilta, univaje välittäjänä, palautumisikkunan eliminaatio ja käyttäytymisen suppressio." },
    ja: { title: "概日リズム障害、睡眠、回復", desc: "メラトニンブリッジ、媒介因子としての睡眠不足、回復ウィンドウの消失、行動抑制。" },
    fr: { title: "Perturbation circadienne, sommeil et recuperation", desc: "Pont de melatonine, privation de sommeil comme mediateur, elimination de la fenetre de recuperation, et suppression comportementale." },
    ko: { title: "일주기 교란, 수면, 회복", desc: "멜라토닌 브릿지, 매개자로서의 수면 부족, 회복 창 제거, 행동 억제." },
  },
  {
    slug: "epidemiology",
    icon: BarChart3,
    en: { title: "Population & Epidemiological Evidence", desc: "COVID lockdown natural experiment, electrification boundary, Kaiser Permanente series, and mobile phone paradox." },
    fi: { title: "Väestö- ja epidemiologinen evidenssi", desc: "COVID-luonnollinen koe, sähköistysraja, Kaiser Permanente -sarja ja matkapuhelinparadoksi." },
    ja: { title: "集団・疫学的エビデンス", desc: "COVID封鎖の自然実験、電化境界、Kaiser Permanenteシリーズ、携帯電話パラドックス。" },
    fr: { title: "Preuves populationnelles et epidemiologiques", desc: "Experience naturelle du confinement COVID, frontiere d'electrification, serie Kaiser Permanente, et paradoxe du telephone mobile." },
    ko: { title: "집단 및 역학적 근거", desc: "COVID 봉쇄 자연실험, 전기화 경계, Kaiser Permanente 시리즈, 휴대전화 역설." },
  },
  {
    slug: "magnetoreception",
    icon: Compass,
    en: { title: "Human Magnetoreception & CRY Pathways", desc: "CRY/RPM magnetoreception, pulse resonance, melatonin PRISMA review, and differential susceptibility." },
    fi: { title: "Ihmisen magnetoreseptio ja CRY-reitit", desc: "CRY/RPM-magnetoreseptio, pulssiresonanssi, melatoniini-PRISMA-katsaus ja yksilöllinen herkkyys." },
    ja: { title: "ヒトの磁気受容とCRY経路", desc: "CRY/RPM磁気受容、パルス共鳴、メラトニンPRISMAレビュー、差異的感受性。" },
    fr: { title: "Magnetoreception humaine et voies CRY", desc: "Magnetoreception CRY/RPM, resonance pulsee, revue PRISMA de la melatonine, et susceptibilite differentielle." },
    ko: { title: "인간 자기수용과 CRY 경로", desc: "CRY/RPM 자기수용, 펄스 공명, 멜라토닌 PRISMA 리뷰, 차등 감수성." },
  },
  {
    slug: "ecology",
    icon: TreePine,
    en: { title: "Ecological & Sentinel Evidence", desc: "Electroecology across taxa and weather radar effects on wildlife — cross-species validation of BERM mechanisms." },
    fi: { title: "Ekologinen ja sentinellievidenssi", desc: "Elektroekologia yli taksonomisten ryhmien ja tutkasäteilyn vaikutukset — lajienvälinen BERM-mekanismien validointi." },
    ja: { title: "生態学的・センチネルエビデンス", desc: "分類群を超えた電気生態学と気象レーダーの野生生物への影響 — BERM メカニズムの種間検証。" },
    fr: { title: "Preuves ecologiques et sentinelles", desc: "Electroecologie a travers les taxons et effets du radar meteorologique sur la faune — validation inter-especes des mecanismes BERM." },
    ko: { title: "생태학적 및 센티넬 근거", desc: "분류군 전반의 전기생태학과 기상 레이더의 야생동물 영향 — BERM 메커니즘의 종간 검증." },
  },
  {
    slug: "eyes",
    icon: Eye,
    en: { title: "The Northern Package", desc: "How three co-selected traits — blue eyes, lactose tolerance, and high geomagnetic latitude — optimized one molecule (CRY). Vitamin D explains 2/3; CRY explains 3/3." },
    fi: { title: "Pohjoinen paketti", desc: "Miten kolme koselektoitunutta piirrettä — siniset silmät, laktoosinsietokyky ja korkea geomagneettinen leveysaste — optimoivat yhden molekyylin (CRY). D-vitamiini selittää 2/3; CRY selittää 3/3." },
    ja: { title: "北部パッケージ", desc: "3つの共選択形質 — 青い目、乳糖耐性、高地磁気緯度 — が1つの分子（CRY）を最適化した方法。ビタミンDは2/3を説明、CRYは3/3を説明。" },
    fr: { title: "Le Package Nordique", desc: "Comment trois traits co-selectionnes — yeux bleus, tolerance au lactose et haute latitude geomagnetique — ont optimise une molecule (CRY). La vitamine D explique 2/3 ; CRY explique 3/3." },
    ko: { title: "북부 패키지", desc: "세 가지 공동 선택 형질 — 파란 눈, 유당 내성, 높은 지자기 위도 — 이 하나의 분자(CRY)를 최적화한 방법. 비타민 D는 2/3, CRY는 3/3을 설명." },
  },
  {
    slug: "nutrition",
    icon: Leaf,
    en: { title: "Nutritional CRY Modulation", desc: "How B2, omega fatty acids, and fasting dynamics control cryptochrome function. 6 evidence cards, 3 predictions." },
    fi: { title: "Ravitsemuksellinen CRY-modulaatio", desc: "Miten B2, omega-rasvahapot ja paastodynamiikka kontrolloivat kryptokromin toimintaa. 6 evidenssikorttia, 3 ennustetta." },
    ja: { title: "栄養によるCRY調節", desc: "B2、オメガ脂肪酸、断食ダイナミクスがクリプトクロム機能をどう制御するか。6つのエビデンスカード、3つの予測。" },
    fr: { title: "Modulation nutritionnelle du CRY", desc: "Comment B2, les acides gras omega et la dynamique du jeune controlent la fonction du cryptochrome. 6 cartes de preuves, 3 predictions." },
    ko: { title: "영양에 의한 CRY 조절", desc: "B2, 오메가 지방산, 단식 역학이 크립토크롬 기능을 어떻게 제어하는가. 6개 근거 카드, 3개 예측." },
  },
  {
    slug: "evolution",
    icon: Dna,
    en: { title: "Evolutionary Origins: The Northern Package", desc: "How co-selection of blue eyes, lactose tolerance, and cattle husbandry created the population most sensitive to EMF. 5 χ scales, 6 population profiles, 5 predictions." },
    fi: { title: "Evoluution alkuperät: Pohjoinen paketti", desc: "Miten sinisilmäisyyden, laktoosinsietokyvyn ja karjankasvatuksen koselektio loi EMF:lle herkimmän populaation. 5 χ-skaalaa, 6 populaatioprofiilia, 5 ennustetta." },
    ja: { title: "進化的起源：北方パッケージ", desc: "青い目、乳糖耐性、牧畜の共選択がEMFに最も感受性の高い集団をどう作ったか。5つのχスケール、6つの集団プロファイル、5つの予測。" },
    fr: { title: "Origines evolutives : Le paquet nordique", desc: "Comment la co-selection des yeux bleus, de la tolerance au lactose et de l'elevage bovin a cree la population la plus sensible aux EMF. 5 echelles chi, 6 profils de population, 5 predictions." },
    ko: { title: "진화적 기원: 북방 패키지", desc: "파란 눈, 유당 내성, 소 목축의 공동 선택이 EMF에 가장 민감한 집단을 어떻게 만들었는가. 5개 χ 스케일, 6개 집단 프로필, 5개 예측." },
  },
  {
    slug: "populations",
    icon: Users,
    en: { title: "Natural Control Groups: 9 Low-EMF Communities", desc: "Systematic comparison of pre-industrial and technology-refusing populations. Tsimane→Mosetén dose-response gradient, myopia five-level gradient, 11/16 disease cascades confirmed." },
    fi: { title: "Luonnolliset kontrolliryhmät: 9 matalan EMF:n yhteisöä", desc: "Esi-teollisten ja teknologian kieltävien populaatioiden systemaattinen vertailu. Tsimane→Mosetén annos-vastegradientti, likitaitteisuuden viisitasoinen gradientti, 11/16 sairauskaskadia vahvistettu." },
    ja: { title: "自然対照群：9つの低EMFコミュニティ", desc: "前工業化および技術拒否集団の体系的比較。Tsimane→Moseten用量反応勾配、近視5段階勾配、11/16疾病カスケード確認。" },
    fr: { title: "Groupes temoins naturels : 9 communautes a faible EMF", desc: "Comparaison systematique des populations pre-industrielles et refusant la technologie. Gradient dose-reponse Tsimane→Moseten, gradient a cinq niveaux de myopie, 11/16 cascades de maladies confirmees." },
    ko: { title: "자연 대조군: 9개 저EMF 공동체", desc: "전산업화 및 기술 거부 집단의 체계적 비교. Tsimane→Moseten 용량-반응 기울기, 근시 5단계 기울기, 11/16 질병 캐스케이드 확인." },
  },
  {
    slug: "replication",
    icon: FlaskConical,
    en: { title: "Resolution of the Replication Crisis", desc: "Why EMF biology seems inconsistent, Blackman's five confounds, and the five-parameter standard that resolves 50 years of contradictory results." },
    fi: { title: "Replikaatiokriisin ratkaisu", desc: "Miksi EMF-biologia vaikuttaa ristiriitaiselta, Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi joka ratkaisee 50 vuoden ristiriitaiset tulokset." },
    ja: { title: "再現性危機の解決", desc: "EMF生物学がなぜ不一致に見えるか、Blackmanの5つの交絡因子、50年の矛盾する結果を解決する5パラメータ標準。" },
    fr: { title: "Resolution de la crise de reproductibilite", desc: "Pourquoi la biologie EMF semble incoherente, les cinq confondeurs de Blackman, et la norme a cinq parametres qui resout 50 ans de resultats contradictoires." },
    ko: { title: "재현성 위기의 해결", desc: "EMF 생물학이 왜 불일치해 보이는지, Blackman의 5가지 교란인자, 50년간의 모순된 결과를 해결하는 5개 매개변수 표준." },
  },
  {
    slug: "technology",
    icon: Zap,
    en: { title: "Technology-Specific Exposure", desc: "14 technology profiles from power grid to Starlink. ELF priming hypothesis, superadditivity model, temporal correlations, and Why 2012." },
    fi: { title: "Teknologiakohtainen altistus", desc: "14 teknologiaprofiilia sähköverkosta Starlinkiin. ELF-priming-hypoteesi, superadditiivisuusmalli, temporaaliset korrelaatiot ja Miksi 2012." },
    ja: { title: "技術固有の曝露", desc: "電力網からStarlinkまで14の技術プロファイル。ELFプライミング仮説、超加法性モデル、時間的相関、なぜ2012年。" },
    fr: { title: "Exposition specifique aux technologies", desc: "14 profils technologiques du reseau electrique a Starlink. Hypothese de l'amorcage ELF, modele de superadditivite, correlations temporelles, et Pourquoi 2012." },
    ko: { title: "기술별 노출", desc: "전력망에서 Starlink까지 14개 기술 프로필. ELF 프라이밍 가설, 초가법성 모델, 시간적 상관, 왜 2012년인가." },
  },
  {
    slug: "autism-prototype",
    icon: BrainCircuit,
    level: "confirmed",
    en: { title: "Autism as BERM Prototype", desc: "ASD unites three independently verified BERM mechanisms — GABA switch delay, synaptogenesis, and KCC2 suppression — into a single neurodevelopmental outcome." },
    fi: { title: "Autismi BERM-prototyyppinä", desc: "ASD yhdistää kolme itsenäisesti verifioitua BERM-mekanismia — GABA-vaihdon viiveen, synaptogeneesin ja KCC2-suppression — yhdeksi neurokehitykselliseksi lopputulokseksi." },
    ja: { title: "BERMプロトタイプとしての自閉症", desc: "ASDは3つの独立検証済みBERMメカニズム — GABAスイッチ遅延、シナプス形成、KCC2抑制 — を単一の神経発達アウトカムに統合。" },
    fr: { title: "L'autisme comme prototype BERM", desc: "Le TSA unit trois mecanismes BERM independamment verifies — retard du commutateur GABA, synaptogenese et suppression de KCC2 — en un seul resultat neurodeveloppemental." },
    ko: { title: "BERM 프로토타입으로서의 자폐증", desc: "ASD는 세 가지 독립 검증된 BERM 메커니즘 — GABA 스위치 지연, 시냅스 형성, KCC2 억제 — 을 하나의 신경발달 결과로 통합." },
  },
  {
    slug: "chronic-pain",
    icon: Activity,
    level: "confirmed",
    en: { title: "Chronic Pain Epidemic", desc: "ELF-priming upregulates α2δ-1 expression — the primary neuropathic pain mechanism — creating chronic pain WITHOUT nerve injury." },
    fi: { title: "Kroonisen kivun epidemia", desc: "ELF-primaami säätelee α2δ-1-ekspressiota ylös — neuropaattisen kivun päämekanismi — luoden kroonisen kivun ILMAN hermovauriota." },
    ja: { title: "慢性疼痛の流行", desc: "ELFプライミングがα2δ-1発現を上方制御 — 主要な神経障害性疼痛メカニズム — 神経損傷なしに慢性疼痛を創出。" },
    fr: { title: "L'epidemie de douleur chronique", desc: "L'amorcage ELF surregule l'expression d'alpha-2-delta-1 — le mecanisme primaire de la douleur neuropathique — creant une douleur chronique SANS lesion nerveuse." },
    ko: { title: "만성 통증 유행병", desc: "ELF 프라이밍이 α2δ-1 발현을 상향 조절 — 주요 신경병성 통증 메커니즘 — 신경 손상 없이 만성 통증 생성." },
  },
  {
    slug: "epigenetic-legacy",
    icon: Dna,
    level: "partial",
    en: { title: "Epigenetic Legacy", desc: "EMF alters DNA methylation, histone modification, and microRNA — mechanisms that may transmit effects to unexposed F3 offspring." },
    fi: { title: "Epigeneettinen perintö", desc: "EMF muuttaa DNA-metylaatiota, histonimodifikaatiota ja mikroRNA:ta — mekanismeja jotka voivat välittää vaikutuksia altistumattomille F3-jälkeläisille." },
    ja: { title: "エピジェネティック遺産", desc: "EMFがDNAメチル化、ヒストン修飾、microRNAを変化 — 非曝露F3子孫に効果を伝達しうるメカニズム。" },
    fr: { title: "Heritage epigenetique", desc: "L'EMF modifie la methylation de l'ADN, la modification des histones et les microARN — des mecanismes pouvant transmettre des effets a la descendance F3 non exposee." },
    ko: { title: "후성유전적 유산", desc: "EMF가 DNA 메틸화, 히스톤 변형, microRNA를 변경 — 비노출 F3 자손에 효과를 전달할 수 있는 메커니즘." },
  },
  {
    slug: "hidden-thyroid",
    icon: Thermometer,
    level: "confirmed",
    en: { title: "Hidden Thyroid", desc: "EMF reduces hypothalamic Dio2/Dio3 deiodinase enzymes. Standard thyroid tests appear normal — FT3/FT4 ratio reveals the hidden deficiency." },
    fi: { title: "Piilevä kilpirauhanen", desc: "EMF vähentää hypotalamuksen Dio2/Dio3-dejodinaasientsyymejä. Normaalit kilpirauhaustestit näyttävät normaaleilta — FT3/FT4-suhde paljastaa piilevän puutteen." },
    ja: { title: "隠れた甲状腺", desc: "EMFが視床下部のDio2/Dio3脱ヨウ素酵素を減少。標準甲状腺検査は正常に見える — FT3/FT4比が隠れた欠乏を明らかにする。" },
    fr: { title: "La thyroide cachee", desc: "L'EMF reduit les enzymes deiodases Dio2/Dio3 hypothalamiques. Les tests thyroidiens standard semblent normaux — le ratio FT3/FT4 revele la deficience cachee." },
    ko: { title: "숨겨진 갑상선", desc: "EMF가 시상하부 Dio2/Dio3 탈요오드효소를 감소. 표준 갑상선 검사는 정상으로 보임 — FT3/FT4 비율이 숨겨진 결핍을 밝힘." },
  },
  {
    slug: "adhd-prototype",
    icon: BrainCircuit,
    level: "confirmed",
    en: { title: "ADHD: The Second Prototype", desc: "ADHD unites three BERM mechanisms — DA deficit in PFC, myelination delay via Cav1.2, and E/I shift — into the second neurodevelopmental prototype after ASD." },
    fi: { title: "ADHD: Toinen prototyyppi", desc: "ADHD yhdistää kolme BERM-mekanismia — DA-puutoksen PFC:ssä, myelinaatioviiveen Cav1.2:n kautta ja E/I-siirtymän — toiseksi neurokehitykselliseksi prototyypiksi ASD:n jälkeen." },
    ja: { title: "ADHD：第二のプロトタイプ", desc: "ADHDは3つのBERMメカニズム — PFCでのDA欠損、Cav1.2による髄鞘化遅延、E/Iシフト — を ASD後の第二の神経発達プロトタイプに統合。" },
    fr: { title: "TDAH : Le deuxieme prototype", desc: "Le TDAH unit trois mecanismes BERM — deficit DA dans le PFC, retard de myelinisation via Cav1.2, et decalage E/I — en le deuxieme prototype neurodeveloppemental apres les TSA." },
    ko: { title: "ADHD: 두 번째 프로토타입", desc: "ADHD는 세 가지 BERM 메커니즘 — PFC에서 DA 결핍, Cav1.2를 통한 수초화 지연, E/I 전환 — 을 ASD 이후 두 번째 신경발달 프로토타입으로 통합." },
  },
  {
    slug: "four-neurodegenerations",
    icon: BrainCircuit,
    level: "confirmed",
    en: { title: "Four Neurodegenerations", desc: "Alzheimer's, MS, Parkinson's, and ALS each attack a different cell type through Ca²⁺-dependent mechanisms. Same cascade, four manifestations." },
    fi: { title: "Neljä neurodegeneraatiota", desc: "Alzheimerin tauti, MS, Parkinsonin tauti ja ALS hyökkäävät kukin eri solutyyppiin Ca²⁺-riippuvaisten mekanismien kautta. Sama kaskadi, neljä ilmentymää." },
    ja: { title: "4つの神経変性疾患", desc: "アルツハイマー、MS、パーキンソン、ALSが各々Ca²⁺依存メカニズムで異なる細胞タイプを攻撃。同じカスケード、4つの表現型。" },
    fr: { title: "Quatre neurodegenerescences", desc: "Alzheimer, SEP, Parkinson et SLA attaquent chacun un type cellulaire different via des mecanismes dependants du Ca²⁺. Meme cascade, quatre manifestations." },
    ko: { title: "4대 신경퇴행성 질환", desc: "알츠하이머, MS, 파킨슨, ALS가 각각 Ca²⁺ 의존 메커니즘으로 다른 세포 유형 공격. 같은 캐스케이드, 네 가지 발현." },
  },
  {
    slug: "allergy-epidemic",
    icon: Activity,
    level: "confirmed",
    en: { title: "The Allergy Epidemic", desc: "Mast cell degranulation is Ca²⁺-dependent. EMF creates a quadruple sensitization cascade explaining the dramatic increase in allergy prevalence." },
    fi: { title: "Allergiaepidemia", desc: "Syöttösolun degranulaatio on Ca²⁺-riippuvainen. EMF luo nelinkertaisen herkistymiskaskadin, joka selittää allergioiden dramaattisen yleistymisen." },
    ja: { title: "アレルギーの流行", desc: "マスト細胞脱顆粒はCa²⁺依存性。EMFがアレルギー有病率の劇的増加を説明する四重感作カスケードを創出。" },
    fr: { title: "L'epidemie allergique", desc: "La degranulation des mastocytes est dependante du Ca²⁺. L'EMF cree une cascade de quadruple sensibilisation expliquant l'augmentation dramatique de la prevalence des allergies." },
    ko: { title: "알레르기 유행병", desc: "비만세포 탈과립은 Ca²⁺ 의존적. EMF가 알레르기 유병률의 극적 증가를 설명하는 4중 감작 캐스케이드 생성." },
  },
  {
    slug: "vitamin-d-channel-blocker",
    icon: Sun,
    level: "confirmed",
    en: { title: "Vitamin D: Nature's Channel Blocker", desc: "Vitamin D downregulates CACNA1C/1D mRNA — the same VGCCs EMF activates. The 10th BERM moderator explains individual EMF sensitivity variation." },
    fi: { title: "D-vitamiini: Luonnon kanavasalpaaja", desc: "D-vitamiini vaimentaa CACNA1C/1D-mRNA:ta — samoja VGCC:itä joita EMF aktivoi. 10. BERM-moderaattori selittää yksilöllistä EMF-herkkyysvaihtelua." },
    ja: { title: "ビタミンD：自然のチャネル遮断薬", desc: "ビタミンDがCACNA1C/1D mRNAを下方制御 — EMFが活性化するのと同じVGCC。第10のBERMモデレーターが個人のEMF感受性変動を説明。" },
    fr: { title: "Vitamine D : Le bloqueur de canal naturel", desc: "La vitamine D downregule l'ARNm de CACNA1C/1D — les memes VGCC que l'EMF active. Le 10e moderateur BERM explique la variation de sensibilite individuelle aux EMF." },
    ko: { title: "비타민 D: 자연의 채널 차단제", desc: "비타민 D가 CACNA1C/1D mRNA를 하향 조절 — EMF가 활성화하는 동일 VGCC. 10번째 BERM 조절인자가 개인 EMF 감수성 변동 설명." },
  },
  {
    slug: "reproductive-arc",
    icon: Heart,
    level: "confirmed",
    en: { title: "The Reproductive Arc", desc: "From fertilization to first year of life, every critical reproductive stage depends on Ca²⁺ channels. Nifedipine — a Ca²⁺ blocker — is first-line treatment at multiple stages." },
    fi: { title: "Reproduktiivinen kaari", desc: "Hedelmöityksestä ensimmäiseen elinvuoteen jokainen kriittinen reproduktiivinen vaihe riippuu Ca²⁺-kanavista. Nifedipiini — Ca²⁺-salpaaja — on ensilinjan hoito useissa vaiheissa." },
    ja: { title: "生殖のアーク", desc: "受精から生後1年まで、すべての重要な生殖段階がCa²⁺チャネルに依存。ニフェジピン — Ca²⁺遮断薬 — が複数の段階で第一選択治療。" },
    fr: { title: "L'arc reproductif", desc: "De la fecondation a la premiere annee de vie, chaque etape reproductive critique depend des canaux Ca²⁺. La nifedipine — un bloqueur Ca²⁺ — est le traitement de premiere ligne a plusieurs etapes." },
    ko: { title: "생식의 호", desc: "수정에서 생후 1년까지, 모든 중요한 생식 단계가 Ca²⁺ 채널에 의존. 니페디핀 — Ca²⁺ 차단제 — 이 여러 단계에서 1차 치료." },
  },
  {
    slug: "natural-modulators",
    icon: Leaf,
    level: "confirmed",
    en: { title: "Five Natural Ca²⁺ Modulators", desc: "Vitamin D, melatonin, magnesium, lithium, and caffeine — five endogenous or dietary substances that modulate the same VGCC channels EMF activates." },
    fi: { title: "Viisi luonnollista Ca²⁺-modulaattoria", desc: "D-vitamiini, melatoniini, magnesium, litium ja kofeiini — viisi endogeenistä tai ravinnosta saatavaa ainetta jotka moduloivat samoja VGCC-kanavia joita EMF aktivoi." },
    ja: { title: "5つの天然Ca²⁺モジュレーター", desc: "ビタミンD、メラトニン、マグネシウム、リチウム、カフェイン — EMFが活性化するのと同じVGCCチャネルを調節する5つの内因性または食事由来物質。" },
    fr: { title: "Cinq modulateurs naturels de Ca²⁺", desc: "Vitamine D, melatonine, magnesium, lithium et cafeine — cinq substances endogenes ou alimentaires qui modulent les memes canaux VGCC que l'EMF active." },
    ko: { title: "5가지 천연 Ca²⁺ 조절제", desc: "비타민 D, 멜라토닌, 마그네슘, 리튬, 카페인 — EMF가 활성화하는 동일 VGCC 채널을 조절하는 5가지 내인성 또는 식이 물질." },
  },
  {
    slug: "amish-control",
    icon: Users,
    level: "partial",
    en: { title: "Amish: The Missing Control Group", desc: "Old Order Amish reject most electrical technology. Their disease rates provide the closest approximation to a zero-EMF control group in a modern Western population." },
    fi: { title: "Amish: Puuttuva kontrolliryhmä", desc: "Vanhan järjestyksen amishit hylkäävät suurimman osan sähköteknologiasta. Heidän sairastuvuuslukunsa tarjoavat lähimmän vastineen nolla-EMF-kontrolliryhmälle modernissa länsimaisessa väestössä." },
    ja: { title: "アーミッシュ：欠けた対照群", desc: "オールドオーダーアーミッシュはほとんどの電気技術を拒否。彼らの疾病率は現代西洋集団におけるゼロEMF対照群への最も近い近似を提供。" },
    fr: { title: "Amish : Le groupe temoin manquant", desc: "Les Amish Old Order rejettent la plupart des technologies electriques. Leurs taux de maladie fournissent l'approximation la plus proche d'un groupe temoin zero-EMF dans une population occidentale moderne." },
    ko: { title: "아미쉬: 빠진 대조군", desc: "구식 아미쉬는 대부분의 전기 기술을 거부. 그들의 질병률은 현대 서양 집단에서 제로 EMF 대조군에 가장 가까운 근사치를 제공." },
  },
  {
    slug: "counter-evidence",
    icon: Scale,
    level: "partial",
    en: { title: "Counter-Evidence: An Honest Assessment", desc: "Five categories of evidence that appear to contradict BERM, and the model's response to each — from null studies to WHO reviews." },
    fi: { title: "Vastaevidenssi: Rehellinen arviointi", desc: "Viisi evidenssikategoriaa jotka näyttävät olevan ristiriidassa BERM:n kanssa, ja mallin vastaus kuhunkin — nollatuloksista WHO:n katsauksiin." },
    ja: { title: "反証：正直な評価", desc: "BERMと矛盾するように見える5つのエビデンスカテゴリと、各々に対するモデルの回答 — ゼロ結果からWHOレビューまで。" },
    fr: { title: "Contre-preuves : Une evaluation honnete", desc: "Cinq categories de preuves qui semblent contredire BERM, et la reponse du modele a chacune — des etudes nulles aux revues de l'OMS." },
    ko: { title: "반증: 정직한 평가", desc: "BERM과 모순되는 것으로 보이는 5개 근거 범주와 각각에 대한 모델의 응답 — 제로 결과부터 WHO 리뷰까지." },
  },
  {
    slug: "testosterone",
    icon: TrendingDown,
    en: { title: "Testosterone: The Biological Clock", desc: "Population T declining 1.2%/year since 1982. The LH+T pattern points to hypothalamic suppression, and T→TFR temporal lag (R²=0.97) adds a second level to the prediction model." },
    fi: { title: "Testosteroni: Biologinen kello", desc: "Väestön T laskee 1,2 %/vuosi vuodesta 1982. LH+T-kaava osoittaa hypotalamuksen suppressioon, ja T→TFR-ajallinen viive (R²=0,97) lisää ennustemalliin toisen tason." },
    ja: { title: "テストステロン：生物学的時計", desc: "人口Tは1982年以降年-1.2%で低下。LH+Tパターンは視床下部抑制を示し、T→TFR時間的ラグ(R²=0.97)が予測モデルに第2レベルを追加。" },
    fr: { title: "Testostérone : L'horloge biologique", desc: "T de population en déclin de 1,2 %/an depuis 1982. Le schéma LH+T pointe vers une suppression hypothalamique, et le décalage temporel T→TFR (R²=0,97) ajoute un second niveau au modèle." },
    ko: { title: "테스토스테론: 생물학적 시계", desc: "인구 T는 1982년 이후 연간 -1.2% 감소. LH+T 패턴은 시상하부 억제를 가리키며, T→TFR 시간적 시차(R²=0.97)가 예측 모델에 제2수준을 추가." },
  },
  {
    slug: "superposition",
    icon: Layers,
    en: { title: "Superposition Violation", desc: "172 studies show combined EMF exposures produce non-additive biological effects — the defining signature of geometric non-linearity predicted by the Lindgren metric extension." },
    fi: { title: "Superpositiorikkomus", desc: "172 tutkimusta osoittaa, että yhdistetyt EMF-altistukset tuottavat ei-additiivisia biologisia vaikutuksia — geometrisen epälineaarisuuden tunnusmerkki, jonka Lindgrenin metriikkalaajennus ennustaa." },
    ja: { title: "重ね合わせの破れ", desc: "172件の研究が、複合EMF曝露が非加算的な生物学的効果を生むことを実証 — リンドグレン計量拡張が予測する幾何学的非線形性の決定的特徴。" },
    fr: { title: "Violation de la superposition", desc: "172 etudes montrent que les expositions EMF combinees produisent des effets biologiques non additifs — la signature de la non-linearite geometrique predite par l'extension metrique de Lindgren." },
    ko: { title: "중첩 위반", desc: "172건의 연구가 복합 EMF 노출이 비가산적 생물학적 효과를 생성함을 입증 — 린드그렌 메트릭 확장이 예측하는 기하학적 비선형성의 결정적 특징." },
  },
  {
    slug: "reproductive-navigation",
    icon: Navigation,
    en: { title: "Reproductive Navigation", desc: "Nine calcium-dependent steps from sperm production to fertilization — every one EMF-vulnerable, with CatSper as the irreplaceable master channel and no biological backup." },
    fi: { title: "Reproduktiivinen navigointi", desc: "Yhdeksän kalsiumriippuvaista vaihetta siittiön tuotannosta hedelmöitykseen — jokainen EMF-haavoittuva, CatSper korvaamattomana avainkanavana ilman biologista varakanavaa." },
    ja: { title: "生殖ナビゲーション", desc: "精子の産生から受精まで9つのカルシウム依存段階 — すべてEMF脆弱で、CatSperが代替不可能なマスターチャネル、生物学的バックアップなし。" },
    fr: { title: "Navigation reproductive", desc: "Neuf étapes calcium-dépendantes de la production de spermatozoïdes à la fécondation — toutes vulnérables aux EMF, CatSper comme canal maître irremplaçable sans secours biologique." },
    ko: { title: "생식 내비게이션", desc: "정자 생산에서 수정까지 9개의 칼슘 의존 단계 — 모두 EMF 취약, CatSper가 대체 불가능한 마스터 채널이며 생물학적 백업 없음." },
  },
] as const;


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const labelLocale: "en" | "fi" = activeLocale === "fi" ? "fi" : "en";
  const d = pickCopy(COPY, locale);
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.interpretationTitle}</h2>
        <ol className="grid max-w-4xl grid-cols-1 md:grid-cols-2 md:divide-x md:divide-card-border">
          {d.interpretation.map((item, index) => (
            <li key={item} className="border-t border-card-border py-4 text-sm leading-relaxed text-foreground-muted md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
              <span className="font-mono-num mr-2 text-accent">0{index + 1}</span>{item}
            </li>
          ))}
        </ol>
      </section>

      {/* Dual interpretation framework */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.dualInterpretationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.dualInterpretationLead}</p>

        {/* Dual interpretation visual comparison */}
        <div className="max-w-4xl mb-6">
          <svg viewBox="0 0 700 160" className="w-full" role="img" aria-label={d.svgStandardVsBerm}>
            <rect x="2" y="2" width="340" height="156" rx="6" fill="currentColor" className="text-foreground-muted" opacity="0.06" />
            <rect x="358" y="2" width="340" height="156" rx="6" fill="currentColor" className="text-accent" opacity="0.08" />
            <line x1="350" y1="8" x2="350" y2="152" stroke="currentColor" className="text-foreground-muted" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
            <text x="172" y="22" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.08em" fill="currentColor" className="text-foreground-muted">{d.svgStandard}</text>
            <text x="528" y="22" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.08em" fill="currentColor" className="text-accent">BERM</text>
            <text x="172" y="55" textAnchor="middle" fontSize="9.5" fill="currentColor" className="text-foreground-muted">{d.svgWeakNoEffect}</text>
            <text x="528" y="55" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="currentColor" className="text-accent">{d.svgWeakAmplified}</text>
            <line x1="20" y1="68" x2="330" y2="68" stroke="currentColor" className="text-foreground-muted" strokeWidth="0.5" opacity="0.12" />
            <line x1="370" y1="68" x2="688" y2="68" stroke="currentColor" className="text-accent" strokeWidth="0.5" opacity="0.2" />
            <text x="172" y="95" textAnchor="middle" fontSize="9.5" fill="currentColor" className="text-foreground-muted">{d.svgNoDoseResponse}</text>
            <text x="528" y="95" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="currentColor" className="text-accent">{d.svgWindowEffect}</text>
            <line x1="20" y1="108" x2="330" y2="108" stroke="currentColor" className="text-foreground-muted" strokeWidth="0.5" opacity="0.12" />
            <line x1="370" y1="108" x2="688" y2="108" stroke="currentColor" className="text-accent" strokeWidth="0.5" opacity="0.2" />
            <text x="172" y="138" textAnchor="middle" fontSize="9.5" fill="currentColor" className="text-foreground-muted">{d.svgMixedResults}</text>
            <text x="528" y="138" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="currentColor" className="text-accent">{d.svgModerators}</text>
          </svg>
        </div>

        <div className="space-y-4 max-w-4xl">
          {d.dualInterpretationRows.map((row, ri) => (
            <div key={ri} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">
                <span className="font-mono-num text-xs text-accent mr-2">0{ri + 1}</span>
                {row.evidence}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">{d.dualInterpretationHeaders.standard}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{row.standard}</p>
                </div>
                <div className="rounded border border-accent/30 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.dualInterpretationHeaders.berm}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{row.berm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dual interpretation visual: bias funnel */}
        <div className="chart-surface mt-8 max-w-3xl mx-auto">
          <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" className="chart-svg w-full h-auto" role="img" aria-label="Bias attenuation funnel">
            {/* True effect on left */}
            <rect x="10" y="50" width="120" height="80" rx="8" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" strokeWidth="1.5" />
            <text x="70" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#22c55e" fontFamily="system-ui">
              {d.svgTrueEffect}
            </text>
            <text x="70" y="100" textAnchor="middle" fontSize="22" fontWeight="700" fill="#22c55e" fontFamily="system-ui">100%</text>
            <text x="70" y="120" textAnchor="middle" fontSize="8" fill="#22c55e" fillOpacity="0.6" fontFamily="system-ui">
              {d.svgVsZero}
            </text>
            {/* Attenuation funnel */}
            <polygon points="140,60 140,120 420,85 420,95" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="0.8" strokeOpacity="0.3" />
            {/* Numbered bias markers; the full localized labels live in the
                responsive HTML legend below so they never collide. */}
            {[
              { x: 180, label: d.svgLabBaseline },
              { x: 230, label: d.svgControlContam },
              { x: 280, label: d.svgSarThreshold },
              { x: 330, label: d.svgPubBias },
              { x: 380, label: d.svgMediatorAdj },
            ].map((b, i) => (
              <g key={i}>
                <circle cx={b.x} cy={50 + i * 3} r="8" fill="var(--figure-bg)" stroke="#ef4444" strokeWidth="1" />
                <text x={b.x} y={53 + i * 3} textAnchor="middle" fontSize="7" fontWeight="700" fill="#ef4444">{i + 1}</text>
                <line x1={b.x} y1={59 + i * 3} x2={b.x} y2={68 + i * 2} stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.3" />
              </g>
            ))}
            <text x="280" y="145" textAnchor="middle" fontSize="8" fill="#ef4444" fillOpacity="0.5" fontFamily="system-ui">
              {d.svgBiasesNote}
            </text>
            {/* Observed effect on right */}
            <rect x="430" y="65" width="150" height="60" rx="8" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
            <text x="505" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444" fontFamily="system-ui">
              {d.svgObserved}
            </text>
            <text x="505" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ef4444" fontFamily="system-ui">~20-40%</text>
            {/* Caption */}
            <text x="300" y="185" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="system-ui">
              {d.svgSameStudy}
            </text>
          </svg>
          <ul className="chart-legend mt-2 justify-center" aria-label={d.svgBiasesNote}>
            {[
              d.svgLabBaseline,
              d.svgControlContam,
              d.svgSarThreshold,
              d.svgPubBias,
              d.svgMediatorAdj,
            ].map((label, index) => (
              <li key={label} className="chart-key">
                <span className="font-mono-num font-bold text-status-refuted">{index + 1}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Dual interpretation visual summary */}
        <div className="mt-6 max-w-4xl rounded-lg border border-card-border overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr]">
            <div className="p-4 bg-slate-500/5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {d.standardInterpretation}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>{d.svgNullResult}</li>
                <li>{d.svgHighSar}</li>
                <li>{d.svgGdpProxy}</li>
                <li>{d.svgLinearDose}</li>
              </ul>
            </div>
            <div className="w-px bg-card-border relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-1 text-xs text-foreground-muted font-mono">vs</span>
            </div>
            <div className="p-4 bg-accent/5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-accent mb-2">
                {d.bermInterpretation}
              </p>
              <ul className="space-y-1.5 text-xs text-accent/80">
                <li>{d.svgContaminated}</li>
                <li>{d.svgWindowAdey}</li>
                <li>{d.svgGdpBadControl}</li>
                <li>{d.svgNonMonotonic}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-page cards */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.subPagesTitle}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">
          {d.subPagesLead}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-4">
          {SUB_PAGES.map((sp) => {
            const Icon = sp.icon;
            const t = sp[activeLocale];
            return (
              <a
                key={sp.slug}
                href={`/${locale}/evidence/${sp.slug}`}
                className="group rounded-lg border border-card-border bg-card-bg p-5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-accent shrink-0" />
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{t.title}</h3>
                </div>
                <p className="text-sm text-foreground-muted mt-1 leading-relaxed">{t.desc}</p>
                <span className="text-accent text-sm mt-2 inline-block">→</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Solar Cycle & Geomagnetic Biology */}
      <section id="solar-cycle" className="mb-16 border-t editorial-rule pt-6">
        <div className="border-l-4 border-yellow-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.solarTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.solarIntro}</p>
        </div>

        {/* Research evidence table */}
        <div className="mb-8 max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground mb-3">{d.solarResearchLabel}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.authorsLabel}</th>
                  <th className="py-2 pr-3 w-20">{d.yearLabel}</th>
                  <th className="py-2 pr-3">{d.findingTableLabel}</th>
                  <th className="py-2 pr-3 w-36">{d.mechanismLabel}</th>
                </tr>
              </thead>
              <tbody>
                {d.solarStudies.map((s: { authors: string; year: string; finding: string; mechanism: string }, i: number) => (
                  <tr key={i} className="border-b border-card-border/40 hover:bg-card-bg/50 transition-colors">
                    <td className="py-2.5 pr-3 font-medium text-foreground">{s.authors}</td>
                    <td className="py-2.5 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                    <td className="py-2.5 pr-3 text-foreground-muted">{s.finding}</td>
                    <td className="py-2.5 pr-3">
                      <span className="inline-block rounded bg-card-bg px-1.5 py-0.5 text-[0.65rem] font-semibold text-foreground-muted">{s.mechanism}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistical results */}
        <div className="mb-8 max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground mb-3">{d.solarStatTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-yellow-500/30 bg-card-bg p-3">
              <p className="text-sm text-foreground-muted leading-relaxed">{d.solarBandpass}</p>
            </div>
            <div className="rounded-lg border border-yellow-500/30 bg-card-bg p-3">
              <p className="text-sm text-foreground-muted leading-relaxed">{d.solarFirstDiff}</p>
            </div>
            <div className="rounded-lg border border-yellow-500/30 bg-card-bg p-3">
              <p className="text-sm text-foreground-muted leading-relaxed">{d.solarMonteCarlo}</p>
            </div>
            <div className="rounded-lg border border-yellow-500/30 bg-card-bg p-3">
              <p className="text-sm text-foreground-muted leading-relaxed">{d.solarReversal}</p>
            </div>
          </div>
        </div>

        {/* SAMA anomaly */}
        <div className="mb-8 max-w-4xl">
          <div className="rounded-lg border border-card-border bg-card-bg p-4 mb-3">
            <h3 className="text-sm font-semibold text-foreground mb-2">{d.solarSamaTitle}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.solarSamaP1}</p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.solarSamaP2}</p>
          </div>
        </div>

        {/* Northern Package */}
        <div className="mb-8 max-w-4xl">
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">{d.solarNorthernTitle}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.solarNorthernP1}</p>
            <ol className="space-y-2 mb-3">
              {d.solarNorthernTraits.map((trait: string, i: number) => (
                <li key={i} className="text-sm text-foreground-muted leading-relaxed pl-4 border-l-2 border-yellow-500/30">
                  <span className="font-mono-num text-accent mr-1">{i + 1}.</span> {trait}
                </li>
              ))}
            </ol>
            <div className="rounded border border-accent/30 bg-accent/5 p-3">
              <p className="text-sm text-foreground leading-relaxed italic">{d.solarNorthernP2}</p>
            </div>
          </div>
        </div>

        {/* Dendrochronology */}
        <div className="max-w-4xl">
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">{d.solarDendroTitle}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.solarDendroP1}</p>
            <ul className="space-y-2 mb-3">
              {d.solarDendroStudies.map((study: string, i: number) => (
                <li key={i} className="text-sm text-foreground-muted leading-relaxed pl-4 border-l-2 border-yellow-500/30">{study}</li>
              ))}
            </ul>
            <div className="rounded border-2 border-yellow-500/40 bg-yellow-500/5 p-3">
              <p className="text-sm text-foreground leading-relaxed italic">{d.solarDendroP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 independent research domains */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {d.researchDomainsTitle}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.researchDomainsLead}
        </p>

        {/* Convergence diagram */}
        <div className="max-w-md mx-auto mb-8">
          <svg viewBox="0 0 500 260" className="w-full" role="img" aria-label={d.convergenceDiagram}>
            <circle cx="250" cy="130" r="30" fill="currentColor" className="text-accent" opacity="0.12" />
            <circle cx="250" cy="130" r="30" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" />
            <text x="250" y="127" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" className="text-accent">EMF</text>
            <text x="250" y="138" textAnchor="middle" fontSize="7.5" fill="currentColor" className="text-accent">{d.bioActivity}</text>
            {(() => {
              const domains = [
                { en: "Biophysics", fi: "Biofysiikka", c: "#3b82f6" },
                { en: "Epidemiology", fi: "Epidemiologia", c: "#10b981" },
                { en: "Animal", fi: "Eläinkoe", c: "#f59e0b" },
                { en: "Cellular", fi: "Solututkimus", c: "#ef4444" },
                { en: "Clinical", fi: "Kliininen", c: "#8b5cf6" },
                { en: "Sentinel", fi: "Sentinelli", c: "#06b6d4" },
                { en: "Genetics", fi: "Genetiikka", c: "#f97316" },
                { en: "Sleep", fi: "Uni", c: "#6366f1" },
                { en: "Metabolic", fi: "Metabolinen", c: "#84cc16" },
                { en: "Reproductive", fi: "Reproduktio", c: "#ec4899" },
                { en: "Solar/Geomagnetic", fi: "Aurinko/Geo", c: "#eab308" },
              ];
              const hubX = 250, hubY = 130, sr = 85, lr = 112;
              return domains.map((domain, i) => {
                const a = ((i * (360 / 11) - 90) * Math.PI) / 180;
                const sx = Math.round(hubX + sr * Math.cos(a));
                const sy = Math.round(hubY + sr * Math.sin(a));
                const lx = Math.round(hubX + lr * Math.cos(a));
                const ly = Math.round(hubY + lr * Math.sin(a));
                const deg = i * (360 / 11);
                const anchor = (deg > 350 || deg < 10 || (deg > 170 && deg < 190)) ? "middle" : deg < 180 ? "start" : "end";
                return (
                  <g key={i}>
                    <line x1={hubX} y1={hubY} x2={sx} y2={sy} stroke={domain.c} strokeWidth="2" opacity="0.7" />
                    <circle cx={sx} cy={sy} r="5" fill={domain.c} />
                    <text x={lx} y={ly + 3} textAnchor={anchor} fontSize="9" fontWeight="500" fill={domain.c}>{domain[labelLocale]}</text>
                  </g>
                );
              });
            })()}
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 max-w-4xl">
          {RESEARCH_DOMAINS[labelLocale].map((item) => (
            <div key={item.n} className="flex gap-3 rounded-lg border border-card-border bg-card-bg p-3">
              <span className="font-mono-num text-xs text-accent mt-0.5 shrink-0">{item.n}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.t}</p>
                <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Clinical Validation: TheraBionic */}
      <section id="therabionic" className="mb-16 border-t editorial-rule pt-6">
        <span id="bradford-hill" />
        <div className="border-l-4 border-emerald-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.theraBionicTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.theraBionicLead}</p>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.theraBionicBody}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 max-w-4xl">
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {d.deviceLabel}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicDevice}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {d.channelLabel}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicChannel}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">SAR</p>
            <p className="text-sm font-semibold text-foreground">100–1,000&times; {d.belowLabel}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {d.outcomeLabel}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicSurvival}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3 col-span-2 sm:col-span-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {d.levelLabel}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicLevel}</p>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {d.mechanismLabel}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicMechanism}</p>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {d.sarComparisonLabel}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicSAR}</p>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {d.ccbContraLabel}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicCCB}</p>
          </div>

          <div className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/5 p-4">
            <p className="text-sm text-foreground leading-relaxed italic">{d.theraBionicImplication}</p>
          </div>
        </div>
      </section>

      {/* Testosterone Decline Evidence */}
      <section id="testosterone" className="mb-16 border-t editorial-rule pt-6">
        <div className="border-l-4 border-red-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-red-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.tDeclineTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.tDeclineLead}</p>
        </div>

        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.countryLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.studyLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">N</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.rateLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.tierLabel}</th>
                <th className="py-2 font-semibold text-foreground-muted">{d.findingTableLabel}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.tDeclineStudies.map((row: { referenceId: string; country: string; study: string; n: string; rate: string; finding: string; tier?: string; bmiIndependent?: boolean; highlight?: boolean; bermNote?: string }) => (
                <tr key={row.study} className={`border-b border-card-border/50${row.highlight ? " bg-amber-500/5" : ""}${row.tier === "null_explained" ? " opacity-75" : ""}`}>
                  <td className="py-2 pr-3 font-medium text-foreground whitespace-nowrap">{row.country}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    <CitationLink citation={row.study} referenceId={row.referenceId} locale={locale} />
                  </td>
                  <td className="py-2 pr-3 font-mono-num whitespace-nowrap">{row.n}</td>
                  <td className={`py-2 pr-3 font-mono-num whitespace-nowrap font-semibold ${row.tier === "null_explained" ? "text-foreground-muted" : "text-red-500"}`}>{row.rate}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {row.tier === "strong" && <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">{row.bmiIndependent ? "BMI-independent" : "Strong"}</span>}
                    {row.tier === "null_explained" && <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-600">Mediator-consistent</span>}
                  </td>
                  <td className="py-2">{row.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {d.tDeclineBmiNote && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 max-w-4xl mb-4">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">{d.causalAnalysisLabel}</p>
            <p className="text-sm text-foreground leading-relaxed">{d.tDeclineBmiNote}</p>
          </div>
        )}

        {/* T-Decline Forest Plot */}
        <div className="max-w-4xl mb-6">
          <svg viewBox="0 0 700 210" className="w-full" role="img" aria-label={d.tDeclineForestPlot}>
            <line x1="410" y1="10" x2="410" y2="188" stroke="currentColor" className="text-red-500" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
            <text x="410" y="7" textAnchor="middle" fontSize="7.5" fill="currentColor" className="text-red-500" opacity="0.7">{d.tDeclineMeanRate}</text>
            {[
              { label: "USA (Travison)", rate: "−1.0", x: 410, y: 28 },
              { label: d.tDeclineDenmark, rate: "−0.9", x: 445, y: 52 },
              { label: "Australia (Sartorius)", rate: "−1.2", x: 340, y: 76 },
              { label: "Israel (Levine)", rate: "−1.4", x: 270, y: 100 },
              { label: d.tDeclineFinland, rate: "−1.0", x: 410, y: 124 },
              { label: "Iran (Darbandi)", rate: "−0.8", x: 480, y: 148 },
              { label: d.tDeclineGlobal, rate: "−0.6", x: 550, y: 172, hi: true },
            ].map((s) => (
              <g key={s.label}>
                <text x="195" y={s.y + 4} textAnchor="end" fontSize="9" fill="currentColor" className={s.hi ? "text-accent" : "text-foreground-muted"}>{s.label}</text>
                <line x1={s.x - 18} y1={s.y} x2={s.x + 18} y2={s.y} stroke="currentColor" className={s.hi ? "text-accent" : "text-red-500"} strokeWidth="1.5" />
                <circle cx={s.x} cy={s.y} r={s.hi ? 5 : 3.5} fill="currentColor" className={s.hi ? "text-accent" : "text-red-500"} />
                <text x="660" y={s.y + 4} textAnchor="end" fontSize="8" fill="currentColor" className={s.hi ? "text-accent" : "text-foreground-muted"}>{s.rate}</text>
              </g>
            ))}
            <line x1="200" y1="192" x2="620" y2="192" stroke="currentColor" className="text-foreground-muted" strokeWidth="0.5" />
            {[
              { v: "−1.4", x: 270 }, { v: "−1.2", x: 340 }, { v: "−1.0", x: 410 }, { v: "−0.8", x: 480 }, { v: "−0.6", x: 550 },
            ].map((t) => (
              <g key={t.v}>
                <line x1={t.x} y1="189" x2={t.x} y2="195" stroke="currentColor" className="text-foreground-muted" strokeWidth="0.5" />
                <text x={t.x} y="206" textAnchor="middle" fontSize="7.5" fill="currentColor" className="text-foreground-muted">{t.v}</text>
              </g>
            ))}
            <text x="595" y="206" textAnchor="start" fontSize="7" fill="currentColor" className="text-foreground-muted">{d.tDeclineRateUnit}</text>
          </svg>
        </div>

        <div className="rounded-lg border-2 border-red-500/40 bg-red-500/5 p-4 max-w-4xl mb-4">
          <p className="text-sm text-foreground leading-relaxed italic">{d.tDeclineImplication}</p>
        </div>

        <div className="flex flex-wrap gap-3 max-w-4xl">
          <Link href={`/${locale}/model#testosterone-threshold`} className="text-sm text-accent hover:underline">{d.tDeclineLink} →</Link>
          <span className="text-foreground-muted">·</span>
          <Link href={`/${locale}/predictions`} className="text-sm text-accent hover:underline">{d.tDeclinePredLink} →</Link>
        </div>
      </section>

      {/* Metabolic Syndrome Evidence */}
      <section id="metabolic-evidence" className="mb-16 border-t editorial-rule pt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-1 p-2 rounded-lg bg-orange-500/10 shrink-0">
            <Scale size={20} className="text-orange-500" />
          </div>
          <div>
            <h2 className="editorial-section-heading">{d.metabTitle}</h2>
            <p className="text-sm text-foreground-muted leading-relaxed mt-1 max-w-3xl">{d.metabLead}</p>
          </div>
        </div>

        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.authorsLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.yearLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.mechanismLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.findingTableLabel}</th>
                <th className="py-2 font-semibold text-foreground-muted">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.metabStudies.map((s: { referenceId: string; authors: string; year: number; journal: string; finding: string; mechanism: string; level: string }, i: number) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2.5 pr-3 text-foreground">
                    <CitationLink citation={s.authors} referenceId={s.referenceId} locale={locale} />
                  </td>
                  <td className="py-2.5 pr-3 font-mono-num">{s.year}</td>
                  <td className="py-2.5 pr-3 text-xs">{s.mechanism}</td>
                  <td className="py-2.5 pr-3">{s.finding}</td>
                  <td className="py-2.5 font-mono-num text-xs">{s.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MetS evidence summary grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mb-6">
          {d.metabStudies.map((s: { referenceId: string; authors: string; year: number; journal: string; finding: string; mechanism: string; level: string }, i: number) => (
            <div key={i} className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-2.5">
              <p className="text-xs font-semibold text-foreground truncate">{s.authors} ({s.year})</p>
              <p className="text-[0.6rem] text-foreground-muted mt-0.5 truncate">{s.mechanism}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[0.6rem] font-mono-num bg-orange-500/15 text-orange-600 dark:text-orange-400 rounded px-1 py-0.5">{s.level}</span>
                <span className="text-[0.55rem] text-foreground-muted/60 italic truncate ml-1">{s.journal}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MetS Evidence Matrix */}
        <div className="max-w-4xl mb-6">
          <svg viewBox="0 0 600 170" className="w-full" role="img" aria-label={d.metabMatrixLabel}>
            {["Ca²⁺", "ROS", d.weightLabel, d.insulinLabel, "BAT", "T↓"].map((col, ci) => (
              <text key={ci} x={170 + ci * 72} y={15} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="currentColor" className="text-foreground-muted">{col}</text>
            ))}
            {[
              { name: "Alshammari", cells: ["full","empty","half","empty","empty","empty"] },
              { name: "Chen", cells: ["full","empty","half","empty","empty","empty"] },
              { name: "Maalouf", cells: ["half","full","half","empty","full","empty"] },
              { name: "Bhatt", cells: ["full","empty","empty","full","empty","empty"] },
              { name: "Haghjoo", cells: ["empty","empty","full","half","empty","empty"] },
              { name: "Klimentidis", cells: ["empty","empty","full","half","half","half"] },
            ].map((row, ri) => (
              <g key={ri}>
                <text x="130" y={38 + ri * 22} textAnchor="end" fontSize="9" fill="currentColor" className="text-foreground-muted">{row.name}</text>
                {row.cells.map((cell, ci) => {
                  const mx = 170 + ci * 72;
                  const my = 34 + ri * 22;
                  if (cell === "full") return <circle key={ci} cx={mx} cy={my} r="6" fill="currentColor" className="text-orange-500" />;
                  if (cell === "half") return (
                    <g key={ci}>
                      <circle cx={mx} cy={my} r="6" fill="none" stroke="currentColor" className="text-orange-500" strokeWidth="1" />
                      <path d={`M ${mx} ${my - 6} A 6 6 0 0 0 ${mx} ${my + 6} Z`} fill="currentColor" className="text-orange-500" />
                    </g>
                  );
                  return <circle key={ci} cx={mx} cy={my} r="6" fill="none" stroke="currentColor" className="text-foreground-muted" strokeWidth="1" opacity="0.3" />;
                })}
              </g>
            ))}
            <circle cx="165" cy="160" r="5" fill="currentColor" className="text-orange-500" />
            <text x="175" y="163" fontSize="7.5" fill="currentColor" className="text-foreground-muted">{d.directLabel}</text>
            <g>
              <circle cx="235" cy="160" r="5" fill="none" stroke="currentColor" className="text-orange-500" strokeWidth="1" />
              <path d="M 235 155 A 5 5 0 0 0 235 165 Z" fill="currentColor" className="text-orange-500" />
            </g>
            <text x="245" y="163" fontSize="7.5" fill="currentColor" className="text-foreground-muted">{d.indirectLabel}</text>
            <circle cx="315" cy="160" r="5" fill="none" stroke="currentColor" className="text-foreground-muted" strokeWidth="1" opacity="0.3" />
            <text x="325" y="163" fontSize="7.5" fill="currentColor" className="text-foreground-muted">{d.notTestedLabel}</text>
          </svg>
        </div>

        {/* Klimentidis Paradox highlight */}
        <div className="rounded-lg border-2 border-orange-500/40 bg-orange-500/5 p-5 max-w-4xl mb-4">
          <h3 className="text-base font-semibold text-foreground mb-2">{d.metabKlimentidisTitle}</h3>
          <p className="text-3xl font-bold text-orange-500 mb-3">
            24 {d.populationsWord} · 8 {d.speciesWord} · p = 1.2 × 10⁻⁷
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed mb-2">{d.metabKlimentidisP1}</p>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.metabKlimentidisP2}</p>
          <p className="text-xs text-foreground-muted/70 italic">{d.metabKlimentidisNote}</p>
        </div>

        {/* MetS convergence diagram */}
        <div className="max-w-3xl mx-auto my-6">
          <svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Metabolic syndrome convergence">
            {/* EMF source */}
            <rect x="245" y="5" width="110" height="30" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="300" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b" fontFamily="system-ui">EMF → Ca²⁺</text>
            {/* Six pathways */}
            {[
              { x: 50, label: d.appetiteLabel, color: "#ef4444" },
              { x: 150, label: "BAT↓", color: "#f97316" },
              { x: 250, label: d.insulinLabel, color: "#8b5cf6" },
              { x: 350, label: d.cortisolLabel, color: "#ec4899" },
              { x: 450, label: d.sleepDownLabel, color: "#3b82f6" },
              { x: 550, label: d.microbiomeLabel, color: "#14b8a6" },
            ].map((p) => (
              <g key={p.label}>
                <line x1="300" y1="35" x2={p.x} y2="70" stroke={p.color} strokeWidth="1" strokeOpacity="0.4" />
                <rect x={p.x - 40} y="70" width="80" height="28" rx="5" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1" />
                <text x={p.x} y="88" textAnchor="middle" fontSize="8" fontWeight="600" fill={p.color} fontFamily="system-ui">{p.label}</text>
                <line x1={p.x} y1="98" x2="300" y2="140" stroke={p.color} strokeWidth="0.7" strokeOpacity="0.3" />
              </g>
            ))}
            {/* CaMKII hub */}
            <circle cx="300" cy="120" r="14" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
            <text x="300" y="124" textAnchor="middle" fontSize="7" fontWeight="700" fill="#f59e0b" fontFamily="system-ui">CaMKII</text>
            {/* Outcome */}
            <rect x="200" y="150" width="200" height="30" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.2" />
            <text x="300" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#ef4444" fontFamily="system-ui">
              {d.metabolicSyndromeLabel}
            </text>
            <text x="300" y="205" textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.4" fontFamily="system-ui">
              {d.klimentidisAllGaining}
            </text>
          </svg>
        </div>

        <div className="flex flex-wrap gap-3 max-w-4xl">
          <Link href={`/${locale}/model#camkii-convergence`} className="text-sm text-accent hover:underline">{d.metabModelLink} →</Link>
          <span className="text-foreground-muted">·</span>
          <Link href={`/${locale}/predictions`} className="text-sm text-accent hover:underline">{d.metabPredLink} →</Link>
        </div>
      </section>

      {/* CatSper: Reproductive Navigation */}
      <section id="catsper" className="mb-16 border-t editorial-rule pt-6">
        <div className="border-l-4 border-purple-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-5 h-5 text-purple-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.catsperTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.catsperLead}</p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-5">
          <p>{d.catsperP1}</p>
          <p><InlineReferenceText text={d.catsperP2} locale={locale} /></p>
        </div>

        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 max-w-4xl mb-5">
          <p className="text-sm text-foreground leading-relaxed">{d.catsperEvolution}</p>
        </div>

        <Link href={`/${locale}/evidence/reproductive-navigation`} className="text-sm text-accent hover:underline">{d.catsperDetailLink} →</Link>
      </section>

      {/* Bounded v2 records */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.boundedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.boundedLead}</p>

        {ORDER.map((directness) => {
          const records = FIELDSTATE_EVIDENCE.filter((record) => record.directness === directness);
          if (!records.length) return null;
          return (
            <div key={directness} className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">{d.groups[directness]}</h3>
              <div className="grid gap-4">
                {records.map((record) => (
                  <article key={record.id} className="border-t border-card-border py-5 first:border-t-0">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-semibold leading-snug tracking-[-0.014em]">
                          <StudyCitation
                            referenceId={record.referenceId}
                            locale={locale}
                            label={record.citation}
                            className="font-semibold text-foreground decoration-dotted underline-offset-2 hover:text-accent hover:underline"
                          />
                        </h4>
                        <p className="mt-1 text-sm text-foreground-muted">{record.studyType} · {record.system}</p>
                      </div>
                      <span className="font-mono-num text-xs text-foreground-muted">{record.year}</span>
                    </div>
                    <p className="mb-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{record.finding}</p>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-card-border pt-3 text-sm leading-relaxed md:grid-cols-2">
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.nodes}</dt><dd className="text-foreground-muted">{causalNodeLabels(record.causalNodes, locale).join(" · ")}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.field}</dt><dd className="text-foreground-muted">{record.fieldClass}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.scope}</dt><dd className="text-foreground-muted">{record.scope}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.limitations}</dt><dd className="text-foreground-muted">{record.limitations.join("; ")}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono-num text-foreground-muted">{d.fields.role}: {record.calibrationRole === "STRUCTURAL_ONLY" ? d.structural : d.contextual}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Protocol classification of previously negative findings */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.classificationTitle}</h2>
        <div className="max-w-4xl">
          <EvidenceClassification locale={locale} />
        </div>
      </section>

      {/* Three frequency channels grouping */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <span id="elf-channel" /><span id="rf-channel" />
        <h2 className="editorial-section-heading mb-3">{d.channelGroupTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.channelGroupLead}</p>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          {(CHANNEL_GROUPS[locale as keyof typeof CHANNEL_GROUPS] ?? CHANNEL_GROUPS["en"]).map((ch) => (
            <div key={ch.channel} className={`border-l-2 ${ch.color} bg-card-bg rounded-lg p-4`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm">{ch.channel}</span>
                <span className="text-xs text-foreground-muted font-mono">{ch.band}</span>
              </div>
              <p className="text-xs text-foreground-muted mb-2">{ch.desc}</p>
              <div className="text-xs text-foreground-muted/70 mb-2">FDA: {ch.fda}</div>
              <div className="flex flex-wrap gap-1">
                {ch.pathways.map((p) => (
                  <span key={p} className="inline-block text-xs font-mono bg-card-border/30 rounded px-1.5 py-0.5">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended evidence catalogue */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.extendedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.extendedLead}</p>

        {PATHWAY_ORDER.map((pathway) => {
          const records = LEGACY_EVIDENCE_CATALOGUE.filter((r) => r.pathway === pathway);
          if (!records.length) return null;
          const pathwayLabel = (PATHWAY_LABELS[pathway]?.[locale as keyof (typeof PATHWAY_LABELS)[typeof pathway]] ?? PATHWAY_LABELS[pathway]?.["en"]) ?? pathway;
          return (
            <div key={pathway} className="mb-10">
              <h3 className="text-sm font-semibold mb-4">
                <span className="font-mono-num text-accent mr-2">{pathway}</span>
                {pathwayLabel}
              </h3>
              {pathway === "B" && (
                <p className="text-xs text-foreground-muted leading-relaxed mb-4 max-w-4xl italic border-l-2 border-amber-500/30 pl-3">
                  {d.cry2PathwayNote}
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{d.citationLabel}</th>
                      <th className="py-2 pr-3 w-12">{d.yearLabel}</th>
                      <th className="py-2 pr-3 w-20">{d.extLevel}</th>
                      <th className="py-2 pr-3 w-10">{d.extN}</th>
                      <th className="py-2 pr-3 w-32">{d.extStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.id} className="border-b border-card-border/40 hover:bg-card-bg/50 transition-colors">
                        <td className="py-2.5 pr-3">
                          <p
                            className={`font-medium leading-snug ${
                              r.status === "RETRACTED_2024"
                                ? "text-foreground-muted line-through decoration-status-refuted"
                                : "text-foreground"
                            }`}
                          >
                            <StudyCitation
                              referenceId={r.referenceId}
                              locale={locale}
                              label={r.citation}
                              className="text-inherit decoration-dotted underline-offset-2 hover:underline"
                            />
                          </p>
                          {r.translationScope && (
                            <p className="mt-1 text-foreground-muted leading-relaxed">{r.translationScope}</p>
                          )}
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.year}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span className="inline-block rounded bg-card-bg px-1.5 py-0.5 text-[0.6rem] font-semibold">
                            {r.level}
                            {EVIDENCE_LEVEL_LABELS[r.level] && (
                              <span className="ml-1 font-normal text-foreground-muted">{EVIDENCE_LEVEL_LABELS[r.level]?.[labelLocale]}</span>
                            )}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.n ?? "—"}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span
                            className={`text-[0.6rem] ${
                              r.status === "RETRACTED_2024"
                                ? "text-status-refuted font-medium"
                                : r.status === "MIGRATION_CANDIDATE"
                                  ? "text-accent"
                                  : "text-foreground-muted"
                            }`}
                          >
                            {STATUS_LABELS[r.status]?.[labelLocale] ?? r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      {/* Orphaned findings */}
      <section id="orphaned-findings" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {(ORPHANED_COMMENTARY[activeLocale] ?? ORPHANED_COMMENTARY.en).title}
        </h2>
        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.yearLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.researcherLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.findingTableLabel}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{d.criticismLabel}</th>
                <th className="py-2 font-semibold text-foreground-muted">{d.mechanismNowLabel}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {ORPHANED_FINDINGS.map((row) => {
                const finding = locale === "fi" ? row.findingFi : locale === "ja" ? row.findingJa : locale === "fr" ? row.findingFr : locale === "ko" ? row.findingKo : row.findingEn;
                const criticism = locale === "fi" ? row.criticismFi : locale === "ja" ? row.criticismJa : locale === "fr" ? row.criticismFr : locale === "ko" ? row.criticismKo : row.criticismEn;
                const mechanism = locale === "fi" ? row.mechanismFi : locale === "ja" ? row.mechanismJa : locale === "fr" ? row.mechanismFr : locale === "ko" ? row.mechanismKo : row.mechanismEn;
                return (
                <tr key={row.year} className="border-b border-card-border/50">
                  <td className="py-2 pr-3 font-mono-num">{row.year}</td>
                  <td className="py-2 pr-3">{row.researcher}</td>
                  <td className="py-2 pr-3">{finding}</td>
                  <td className="py-2 pr-3 italic">{criticism}</td>
                  <td className="py-2">{mechanism}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="max-w-4xl space-y-4">
          {(() => {
            const oc = ORPHANED_COMMENTARY[activeLocale] ?? ORPHANED_COMMENTARY.en;
            return (
              <>
                <p className="text-sm text-foreground-muted leading-relaxed">{oc.p1}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{oc.p2}</p>
                <p className="text-xs text-foreground-muted/70 italic">{oc.note}</p>
              </>
            );
          })()}
        </div>
      </section>

      <section id="cross-species" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <div className="border-l-4 border-accent pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-5 h-5 text-accent shrink-0" />
            <h2 className="editorial-section-heading">{d.sentinelTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.sentinel}</p>
        </div>

        <div className="flex items-center gap-4 mb-5 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <span className="text-2xl font-mono-num font-bold text-accent">{d.sentinelGradientStat}</span>
          <span className="text-sm text-foreground-muted">{d.sentinelGradientLabel}</span>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-5">
          <p><InlineReferenceText text={d.sentinelGradient} locale={locale} /></p>
          <p><InlineReferenceText text={d.sentinelTLink} locale={locale} /></p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/sentinel`} className="text-sm text-accent hover:underline">{d.sentinelLink} →</Link>
          <span className="text-foreground-muted">·</span>
          <Link href="#testosterone" className="text-sm text-accent hover:underline">{d.sentinelTDeclineLink} →</Link>
        </div>
      </section>

      {/* Mechanistic Anchors */}
      <section id="mechanistic-anchors" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.anchorTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p><InlineReferenceText text={d.anchorP1} locale={locale} /></p>
          <p>{d.anchorP2}</p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.anchorNote}</p>
        </div>
      </section>

      {/* Animal Evidence: Controlled EMF Experiments */}
      <section id="animal-evidence" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.animalTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p><InlineReferenceText text={d.animalP1} locale={locale} /></p>
          <p>{d.animalP2}</p>
          <p>{d.animalP3}</p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.animalNote}</p>
        </div>
      </section>

      <RetrodictionCards locale={activeLocale} />

      <DiseaseCascadeTimeline locale={activeLocale} />

      <DifferentialSusceptibility locale={activeLocale} />

      <section className="mb-14">
        <HindcastValidation locale={locale} />
      </section>

      <StatisticalValidation locale={locale} />

      <section className="mt-14">
        <ReferencesSummary locale={locale} />
      </section>

      <NextPageLink
        href={`/${locale}/objections`}
        label={d.nextLinkLabel}
        title={d.nextLinkTitle}
        icon={ShieldQuestion}
      />
    </div>
  );
}
