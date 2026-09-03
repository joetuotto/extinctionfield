import type { Metadata } from "next";
import { ShieldQuestion, Leaf } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { FindingCard } from "@/components/FindingCard";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import {
  CLASSIFICATION_SUMMARY,
  CLASSIFICATION_VERSION,
  findingsInGroup,
} from "@/lib/findingsClassification";

type Objection = { question: string; response: readonly string[]; boundary: string };
type DiscriminatingTest = {
  id: string;
  name: string;
  berm: string;
  consensus: string;
  protocol: string;
  cost: string;
};
type VersionRow = { version: string; mechanism: string; status: string; why: string };
type Copy = {
  title: string;
  subtitle: string;
  introduction: string;
  summaryLabel: string;
  activeTitle: string;
  activeLead: string;
  reclassifiedTitle: string;
  reclassifiedLead: string;
  refinementTitle: string;
  refinementLead: string;
  testsTitle: string;
  testsLead: string;
  tests: readonly DiscriminatingTest[];
  historyTitle: string;
  historyHeaders: readonly [string, string, string, string];
  history: readonly VersionRow[];
  questionsTitle: string;
  objections: readonly Objection[];
  closingTitle: string;
  closingText: string;
  findingsLabel: string;
  remainLabel: string;
  reclassifiedLabel: string;
  internalRefinementLabel: string;
  summaryStats: string;
  findingsDistribution: string;
  remainNegativeLabel: string;
  testsComparison: string;
  testSvgLabel: string;
  consensusSvgLabel: string;
  divergenceLabel: string;
  angleDependentLabel: string;
  isotropicLabel: string;
  highLabel: string;
  cohortStepLabel: string;
  noCohortStepLabel: string;
  cryPredictsLabel: string;
  noPredictionLabel: string;
  consensusLabel: string;
  protocolLabel: string;
  versionTimeline: string;
  abandonedLabel: string;
  demotedLabel: string;
  activeLabel: string;
  currentLabel: string;
  nextLabel: string;
  sentinelTitle: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "Criticism and open problems",
    subtitle:
      "Every identified negative finding, open problem and falsified earlier version — and what each one actually bears on.",
    introduction:
      "BERM v17 treats openness as an epistemological principle. The classification below applies the BERM reasoning protocol (v1.0) to findings previously read as negative. Reclassification does not mean a finding supports BERM: it means the original test was not discriminating, or did not address the target it was taken to address. The primary branch (pathway B / RPM / cohort effect) remains empirically untested by discriminating tests.",
    summaryLabel: "REVIEW OF NEGATIVE FINDINGS",
    activeTitle: "Active problems (remain negative)",
    activeLead:
      "These stand. Two are falsified mechanisms from BERM v6–v9, one is a mathematical obstruction in the soliton layer, one is a documentation-integrity failure, and two are open theoretical problems in the Lindgren framework.",
    reclassifiedTitle: "Reclassified (do not discriminate between models)",
    reclassifiedLead:
      "Each of these was read as a falsification. Under the protocol, none of them tested a prediction that separates BERM from the consensus model — either the BERM prediction was never derived, or the test addressed a claim the model does not make.",
    refinementTitle: "Internal refinements (led to model corrections)",
    refinementLead:
      "These were genuine failures of a specific formulation, and each produced a structural correction rather than a defence.",
    testsTitle: "Discriminating tests still needed",
    testsLead:
      "None of the 13 findings tested the primary branch. These three would separate pathway B (RPM) from the consensus model. None has been carried out.",
    tests: [
      {
        id: "D1",
        name: "Directional dependence (cell level)",
        berm: "RPM response depends on the angle between B₀ and B_ext (Larmor resonance, anisotropic hyperfine).",
        consensus: "Isotropic response: power-dependent, not direction-dependent.",
        protocol: "CRY-expressing cells, controlled B₀ direction, 3 angles × 3 field levels; endpoint ROS or melatonin production.",
        cost: "~€5,000–15,000 · one cell-biology laboratory",
      },
      {
        id: "D2",
        name: "Cohort-step hypothesis (demographic)",
        berm: "Cohorts born in the 4G era (2012+) show a different ASFR profile than 2G-era cohorts, controlling for cultural variables.",
        consensus: "No cohort step by technology generation.",
        protocol: "WPP ASFR data, age-group analysis, cohort birth year vs technology generation, country fixed effects.",
        cost: "€0 (public data) · ~2 weeks · partial test now, full test 2030+",
      },
      {
        id: "D3",
        name: "Species hierarchy (spin coherence × population decline)",
        berm: "CRY spin-coherence time predicts the between-species sensitivity ordering: longer coherence → greater sensitivity → faster decline.",
        consensus: "No prediction about ordering between species.",
        protocol: "Literature synthesis of CRY coherence times × population trend data (bee, migratory bird, house sparrow, dog, human).",
        cost: "€0 (literature) · ~1 week",
      },
    ],
    historyTitle: "Version history",
    historyHeaders: ["Version", "Mechanism", "Status", "Why abandoned"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC resonance 94–183 GHz", status: "Abandoned", why: "Physically impossible: five orders of magnitude too fast for protein conformational dynamics" },
      { version: "BERM 6–9", mechanism: "Water resonance 2.45 GHz", status: "Abandoned", why: "Inverted physics: absorption is rotational damping, not amplifying resonance" },
      { version: "BERM 6–9", mechanism: "Soliton propagation", status: "Abandoned", why: "Ghost obstruction: π₂ = 0 for timelike A, ghost energy for spacelike A" },
      { version: "L-BERM", mechanism: "VGCC via pure geometry", status: "Demoted", why: "δV_m is 10¹⁷× too small without biological amplifiers" },
      { version: "BERM < v6", mechanism: "EMF explains the whole demographic transition", status: "Abandoned", why: "The pre-EMF decline is driven by the D-term (cultural demand)" },
    ],
    questionsTitle: "Research questions and evidence boundaries",
    objections: [
      {
        question: "Environmental EMF fields are too weak for biological effects",
        response: [
          "[[ref:vaziri2016|The human eye detects single photons.]] Sharks detect 0.5 µV/m electric fields. [[ref:ritz2004|Migratory birds' compass is disrupted by 15 nT RF noise]] — 0.03% of the geomagnetic background. Biology operates at the quantum limit of electromagnetic sensitivity because evolution optimized detection, not tolerance.",
          "Twenty-six regulatory-approved device categories exploit non-thermal EMF biological effects across the entire EM spectrum — from DC bone stimulators (1986) to UV phototherapy. This includes 12,000+ individual TENS clearances, a $8–10B neuromodulation market, and 160,000+ implanted DBS devices. [[ref:tdcs_fda_depression_2025|tDCS treats depression at 0.3–1.0 V/m]] — the same order of magnitude as measured urban ambient RF (0.67–1.51 V/m). The claim that EMF is 'too weak' directly contradicts regulatory approval decisions worldwide.",
          "The Ion Forced Oscillation mechanism ([[ref:panagopoulos2025_ifo|Panagopoulos 2025, Frontiers in Public Health]]) demonstrates a biological response threshold of 10⁻⁵ V/m for polarized, coherent fields — five orders of magnitude below typical environmental levels. There is no intensity gap. The gap existed only in models that assumed thermal effects were the only mechanism.",
          "In 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell, IF ~64)]] identified Cyb5b — a mitochondrial outer membrane protein — as a genetically verified EMF sensor via genome-wide CRISPR screen. 60 Hz pulsed EMF activates gene promoters in vivo through Cyb5b → Ca²⁺ oscillations. This is the first genetically identified EMF receptor. The 'too weak' argument now contradicts not only FDA device approvals and IFO biophysics but also a CRISPR-validated molecular sensor published in Cell.",
          "In 2013, honeybee researcher [[ref:greggers2013_bee_electric_comm|Uwe Greggers]] stated that anthropogenic electric fields are 'much lower in energy than those produced by the bees themselves' and that bees 'should be naturally protected.' In 2025, [[ref:mallinson2025_electric_pollution|Mallinson et al.]] tested this empirically in field experiments — and found that anthropogenic AC electric fields reduce bee foraging by 71% (iScience / Cell Press). The intuitive assessment that 'the field is too weak' failed the empirical test. This is exactly the error ICNIRP makes for human health: assuming without testing that environmental field strengths are below biological thresholds.",
        ],
        boundary: "The intensity argument is an empirical claim. FDA approvals and IFO threshold measurements are empirical facts. The burden of proof is on the intensity argument to explain why FDA-approved non-thermal devices work.",
      },
      {
        question: "TTFields proves IF effects only work at high intensity",
        response: [
          "TTFields uses dielectrophoresis (DEP) — a quadratic mechanism that requires field strengths of 100–300 V/m. Environmental IF exposure operates via a fundamentally different mechanism: Ion Forced Oscillation (IFO-VGIC), which is linear in field strength with a demonstrated threshold of 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Different mechanisms have different intensity requirements.",
          "Pulsed LED-driver fields are more biologically active per watt than TTFields' pure sine wave ([[ref:campisi2010|Campisi 2010]]: amplitude-modulated 900 MHz produced more ROS and DNA fragmentation than continuous wave). LED drivers produce pulsed, harmonically rich waveforms with 50,000+ switching transitions per second — each transition a potential Ca²⁺ spike via VGCC gating asymmetry.",
          "The TTFields clinical program validates that IF frequencies disrupt cell division. It does not define the minimum intensity at which disruption begins — that question is answered by IFO biophysics, not by the DEP mechanism TTFields employs.",
          "Critically, Neuhaus et al. (Nature 2020) showed that TTFields' frequency-dependence differs between cancer and normal cells: cancer cells are most affected at 150–200 kHz, while normal cell mitosis is disrupted at ~50 kHz. LED driver switching frequencies (20–100 kHz) span precisely this normal-cell sensitivity range — a coincidence that the intensity-only argument cannot address.",
        ],
        boundary: "This distinction is falsifiable: if IFO effects cannot be demonstrated below 1 V/m in controlled experiments, the environmental IF channel loses its primary mechanism.",
      },
      {
        question: "Could demographic and social causes explain period TFR change?",
        response: [
          "Yes. Education, contraception, housing, labour markets, partnership formation, migration, policy, desired family size, tempo and ART all affect observed fertility. A period TFR is a five-year-age-group sum, not a direct assay of gametes or conception.",
          "V2 therefore models ASFR before TFR and keeps demand/opportunity, tempo and ART/live-birth delivery explicit. It does not assign their residual variation to a biological field pathway.",
          "However: sleep deprivation alone reduces testosterone by 10–15% and sperm count by 29% in controlled laboratory experiments on healthy young men — without any cultural, behavioral, or chemical exposure change ([[ref:leproult2011_testosterone_sleep|Leproult & Van Cauter 2011]]; [[ref:walker2017_why_we_sleep|Walker 2017]]). The question is not whether sleep affects fertility (it does, conclusively) but whether EMF disrupts sleep (the CRY/RPM mechanism and LED melatonin suppression data say yes).",
        ],
        boundary: "A country trend alone cannot identify a biological cause. Population inference requires a matched FieldState, endpoint, couple and ASFR panel with credible competing models.",
      },
      {
        question: "Does Lindgren physics establish a human reproductive mechanism?",
        response: [
          "Lindgren's 2025 metric is BERM's theory premise. BERM then proposes background, orientation and spectral dependence as discriminating hypotheses. The reported 87.5% algebraic correspondence with RPM is a structural comparison, not a derived geometry-to-RPM operator, so it does not give the CRY pathway a direct geometric foundation.",
          "Each downstream biological link — from field geometry to chromophore response to organ-level endpoints — requires its own experimental validation. The relevant tests are discriminating physical and biological experiments: pre-specified angle, background or PSD dependence with calibrated fields and appropriate sham/thermal controls.",
        ],
        boundary: "The theoretical framework generates predictions; the predictions are tested empirically. Each link needs its own measured evidence.",
      },
      {
        question: "What do the reproductive and barrier studies actually show?",
        response: [
          "The registry includes bounded findings such as in-vitro human sperm endpoints, animal blood–testis-barrier and ovarian studies, and mechanistic redox/tight-junction work. These can motivate organ-specific states rather than a single generic biological-capacity curve.",
          "Their systems, frequencies, amplitudes, durations and endpoints differ. Animal and cell results cannot simply be converted into a population dose, fertility probability or country forecast.",
        ],
        boundary: "A study-to-node record supports the registered part of the route only. None is a direct TFR slope or a substitute for a human endpoint panel.",
      },
      {
        question: "Can mobile subscriptions or eDRX show a physical exposure pathway?",
        response: [
          "Mobile subscription density is a composite proxy for the overall electromagnetic environment — it tracks base station deployment, Wi-Fi proliferation, IoT density and indoor electronics adoption, not just RF exposure. The current N = 163 cohort result uses this composite proxy for descriptive cohort analysis.",
          "Likewise, eDRX is device reception/paging scheduling metadata, not by itself a known downlink RF field signature. Any envelope or beat feature must be measured in the actual field before it is tested biologically.",
        ],
        boundary: "Proxy timing and physical dosimetry answer different questions and must remain labelled differently.",
      },
      {
        question: "What about mixed EMF research and systematic reviews?",
        response: [
          "The evidence base is heterogeneous. Study quality, exposure characterisation, thermal control, endpoint selection and replication vary substantially. Reviews can establish that findings exist across systems, but their certainty assessments and sensitivity analyses need to be reported rather than replaced with a single headline.",
          "For example, the [[ref:cordelli2024_who|WHO-commissioned reproductive review]] reported adverse findings in several analyses while rating much of the certainty low or very low and requiring sensitivity to high-SAR studies. V2 treats that as context, not a settled population effect.",
        ],
        boundary: "The right response to uncertainty is better measurement and transparent study weighting, not a stronger narrative claim.",
      },
      {
        question: "Could chemicals, climate, disease, lifestyle or other exposures be involved?",
        response: [
          "Yes. These exposures may affect reproductive biology and may co-vary with technology, urbanisation and socioeconomic change. They are competing explanations and potential interactions, not nuisance variables that can be dismissed by a simple correlation.",
          "A useful test measures or designs around plausible co-exposures, compares alternative causal models and reports which inference changes when they are included.",
        ],
        boundary: "No single cross-country pattern establishes dominance of one environmental cause. V2 must earn any attribution through discriminating data.",
      },
      {
        question: "Danish and NHANES studies found no BMI-independent decline",
        response: [
          "This interpretation assumes BMI is a confounder (independent cause). BERM's causal model treats BMI as a mediator: EMF simultaneously causes both BMI increase (via six metabolic pathways) and testosterone decline (via direct Cav3.2/melatonin/cortisol pathways). BMI adjustment then removes the mediated signal — an overcorrection that discards real biological effect.",
          "[[ref:mazur2013|Mazur et al. 2013]] (PLOS ONE, n = 991 US Air Force veterans, 20-year follow-up) provides the critical test: men who MAINTAINED THEIR WEIGHT still lost 117 ng/dL (19%) of their testosterone over 20 years. Obesity cannot explain this decline. The direct pathway accounts for approximately two-thirds of the total effect; the mediated pathway (via BMI) accounts for approximately one-third.",
          "[[ref:santi2025|Santi et al. 2025]] (n = 1,064,891, the largest meta-analysis ever conducted) found no BMI temporal trend in their study population, yet testosterone declined significantly. Rising obesity is not the driver in this dataset.",
          "[[ref:klimentidis2010|Klimentidis et al. 2010]] (Proc R Soc B) showed that laboratory animals on CONTROLLED diets gained weight over decades (p = 1.2×10⁻⁷). An environmental factor beyond diet drives weight gain — the same factor may simultaneously drive testosterone decline through the mediated pathway.",
        ],
        boundary: "The mediator interpretation is testable via formal mediation analysis (Baron & Kenny or SEM) on longitudinal datasets with concurrent T and BMI measurements. If the indirect effect via BMI is less than 10% of the total effect, the mediator model is weakened.",
      },
      {
        question: "What would move the model from structure to a result?",
        response: [
          "A measurement-ready FieldState needs documented calibration, B₀ vector, organ transfer, PSD, circadian context, phase/coherence and provenance. It must then be joined to a pre-specified organ or couple endpoint with evidence- and parameter-linked mappings.",
          "Calibration should use a training period only, followed by an independent laboratory replication and a held-out ASFR/TFR period. Both null and non-null results should update the causal registry.",
        ],
        boundary: "Until those joins exist, v2 is a research specification and causal map, not a calibrated country forecast model.",
      },
      {
        question: "LED lights are energy-efficient and certified safe",
        response: [
          "LED lights are certified for electromagnetic compatibility (EMC) — meaning their emissions don't interfere with other electronic devices beyond regulatory limits. They are not certified for biological safety of their intermediate-frequency emissions. CISPR 15, the standard that governs LED lighting EMF, was designed to protect radio reception, not biological systems.",
          "No regulatory body has evaluated the biological effects of continuous 20–200 kHz fields from LED drivers. The [[ref:panagopoulos2025_ifo|Panagopoulos 2025]] IFO-VGIC threshold (10⁻⁵ V/m) is orders of magnitude below any EMC limit. EMC compliance and biological safety are entirely different standards measuring entirely different things.",
          "[[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]] (Optics & Laser Technology) directly measured LED driver near-field emissions and confirmed E-field components at centimeter distances. A typical home has 15–30 LED bulbs, each containing a switch-mode power supply. The EU incandescent ban (2009–2012) replaced zero-IF sources with continuous-IF sources for ~450 million people without any assessment of the electromagnetic change.",
          "A [[ref:ijrb2022_if_review|2022 IJRB systematic review of IF-EMF]] (300 Hz–10 MHz) animal studies confirmed that this frequency band has received minimal health research compared to ELF and RF — the regulatory gap is now documented in the peer-reviewed literature itself.",
        ],
        boundary: "This is a regulatory-gap argument, not a health claim. If LED driver emissions at environmental distances produce no measurable IFO-VGIC response in controlled experiments, the IF-channel concern is empirically resolved.",
      },
      {
        question: "There is no dose-response relationship",
        response: [
          "The [[ref:adey1976_calcium_window|Adey-Blackman calcium window, documented since 1976]], shows that EMF biological effects do not follow a linear dose-response. Calcium efflux from cat brain tissue occurred at specific intensity windows (0.1–1.0 mW/cm² at 450 MHz amplitude-modulated at 16 Hz) but NOT at higher or lower levels. This 'window effect' means the ICNIRP approach — setting a threshold above which effects occur — is structurally wrong. Effects occur in windows, not above thresholds.",
          "This also explains why replication studies that use different intensities may fail to find effects that the original study found: they may be testing outside the window. The failure to replicate is not evidence of absence — it is evidence of non-linearity. The window effect has been confirmed across multiple laboratories and biological endpoints since 1976.",
          "The window phenomenon is consistent with the physics of resonance: biological systems respond maximally at specific frequencies and intensities where energy transfer to target molecules is optimized. Above and below these windows, the coupling is less efficient. This is the same physics that makes a radio tuner work — it detects signals only at the tuned frequency, not above or below it.",
        ],
        boundary: "The window effect is an empirical observation. If window-dependent dose-response cannot be demonstrated for reproductive endpoints at environmental intensities, the relevance to fertility is unestablished.",
      },
      {
        question: "The model is just fitting GDP",
        response: [
          "In linear models, EMF and GDP are collinear (r = 0.87) and neither is significant after controlling the other. This is a symmetric identification problem, not evidence against EMF.",
          "Three structural differences distinguish EMF from GDP. First, electricity access is a binary threshold. Adjusting for the fraction of the population with electricity access improves TFR prediction (r: −0.864 → −0.885). GDP has no equivalent threshold — everyone participates in economic activity at some level, but only some people have electricity.",
          "Second, mobile phones (the information device) are the WEAKEST EMF proxy (RMSE 1.053). Residential electricity (the infrastructure) is the BEST (univariate RMSE 0.533). If 'information → choices' were the mechanism, the information device should predict best. It doesn't.",
          "Third, sentinel species respond to electric fields ([[ref:mallinson2025_electric_pollution|Mallinson 2025]]: bees −71%) but not to GDP. Dogs, bees, and frogs do not make economic choices.",
        ],
        boundary: "Cross-sectional analysis cannot identify the causal direction between EMF and GDP. Discriminating evidence comes from sentinel species, natural experiments (Faraday hives), and populations without electricity.",
      },
      {
        question: "Electricity access is just a development proxy",
        response: [
          "Electricity access correlates with development, but it has a property that no other development indicator has: a PHYSICAL THRESHOLD. The IFO-VGIC activation threshold (10⁻⁵ V/m) is exceeded by every household appliance at operating distance. This means electrification is not just correlated with biological effects — it is the MECHANISM of exposure.",
          "In partially electrified countries (Nigeria 55%, Ethiopia 51%, Uganda 42%), the national TFR is a mixture of the electrified population (exposed to EMF, lower TFR) and the unelectrified population (not exposed, TFR near biological maximum ~6.5). No other development indicator has this binary mixture structure. You cannot say '55% of the population has education' in the same binary way — education is a continuous gradient.",
          "The binary threshold produces a testable prediction: DHS (Demographic and Health Survey) micro-data comparing TFR of electrified vs unelectrified households within the same country, controlling for income and education, should show lower TFR in electrified households. This test has not yet been conducted.",
        ],
        boundary: "If DHS micro-data shows no electrified/unelectrified TFR difference after controlling for income and education, the binary threshold argument is falsified.",
      },
      {
        question: "EHS is psychosomatic — nocebo explains self-reported symptoms",
        response: [
          "[[ref:sousouri2025|Sousouri et al. 2025]] (NeuroImage, ETH Zurich) conducted a double-blind randomized controlled trial with CACNA1C genotyping. Participants carrying the rs7304986 T/C variant showed altered sleep spindle dynamics under 3.6 GHz RF exposure below ICNIRP limits, while CC homozygotes did not. The subjects did not know their genotype, the exposure condition, or the hypothesis. Nocebo cannot produce genotype-dependent neurophysiological changes in a double-blind design.",
          "This transforms the EHS question from 'do self-reporters feel something?' (where nocebo is a valid concern) to 'does ion channel genotype predict measurable brain response to RF?' (where nocebo is mechanistically excluded). The relevant variable is not self-diagnosis but VGCC polymorphism — a biological property the subject cannot influence by belief.",
          "[[ref:belpomme2022|Belpomme et al. 2022]] characterized ~1,000 EHS patients with objective biomarkers (histamine, S100B, nitrotyrosine). Combined with [[ref:sousouri2025|Sousouri's genotype data]], the evidence points to a continuous distribution of EMF sensitivity across the population, with the clinical EHS phenotype representing the tail — not a psychosomatic category.",
        ],
        boundary: "The nocebo hypothesis makes a testable prediction: genotype should not predict response in a double-blind design. [[ref:sousouri2025|Sousouri 2025]] falsified this prediction for CACNA1C rs7304986. Replication with larger N and additional VGCC variants is needed.",
      },
      {
        question: "The mechanism is implausible",
        response: [
          "This argument has been applied to every non-thermal EMF finding for 50 years — and it has been wrong every time.",
          "In 1976, [[ref:adey1976_calcium_window|Adey]] and Blackman documented calcium efflux from brain tissue at specific field intensities. Dismissed as 'artifact' because the non-linear dose-response was 'implausible.' In 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell)]] showed that rhythmic calcium oscillations — not linear calcium increase — drive gene expression, explaining the window effect.",
          "In 1995, [[ref:lai1995_dna_breaks|Lai and Singh]] found DNA strand breaks from 2450 MHz radiation. Industry funded counter-studies and pressured their university. The mechanism was later identified: oxidative stress via VGCC-mediated calcium influx, confirmed by melatonin's protective effect.",
          "In 2026, [[ref:kim2026_cell_gene_switch|Kim et al.'s Cell paper]] was called 'incredibly implausible' by physicist [[ref:york2026_kim_commentary|Andrew York]]. The paper used CRISPR screening to identify Cyb5b as an EMF sensor and demonstrated reversible gene expression control in transgenic mice.",
          "The pattern is consistent: data is strong, mechanism is unknown, critics declare impossibility. Then the mechanism is found. The 'implausibility argument' is not science — it is an argument from ignorance.",
          "BERM offers a testable physical proposal rather than a completed solution: χ(Ā) is a closure hypothesis motivated by the Lindgren 2025 metric premise. It does not yet derive how an external field couples to an ion channel or another biological observable. The photon-sensor analogy motivates sensitivity experiments but cannot substitute for the open L2 operator or its calibration.",
        ],
        boundary: "Lindgren's interpretation is theoretical and not yet independently validated. The empirical findings ([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], Pall, [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]]) stand independently of the theoretical framework.",
      },
      {
        question: "Blue light explains all LED health effects",
        response: [
          "Blue light does suppress melatonin — this is established. But it is not the whole story.",
          "[[ref:duraccio2019_blue_light|Duraccio et al. (2019)]] found that blue-light-filtering glasses did NOT significantly improve adolescent sleep quality. If blue light were the only mechanism, filtering it should work. It doesn't.",
          "BERM proposes that LED lamps produce TWO biologically relevant outputs: blue light (optical, retinal) and IF emissions (electromagnetic, systemic). Blue-light filtering addresses the first but not the second.",
          "This generates a testable prediction (SLEEP-1): a Faraday-shielded LED lamp that blocks IF emissions while preserving identical light spectrum should produce less biological disruption than an unshielded lamp. If shielding makes no difference, the IF channel hypothesis is weakened.",
        ],
        boundary: "The SLEEP-1 prediction is directly falsifiable. If Faraday-shielded LEDs produce the same sleep disruption as unshielded LEDs (identical spectrum), the IF pathway is not the primary mechanism.",
      },
      {
        question: "Why does pathway B get 25% when it was originally 15%?",
        response: [
          "Pathway B was originally assigned 15% based on its known role as a circadian clock modulator. In 2025, [[ref:yap2025|Yap and colleagues]] discovered that CRY2 — the main protein of pathway B — also physically interacts with TRPC1, a cation channel, and modulates calcium signaling through a mechanism that requires both light and FAD. This means pathway B encompasses TWO downstream effects: circadian clock disruption AND CRY2-dependent calcium signaling. The increased weight (25%) reflects this expanded biological footprint.",
          "Importantly, TRPC1 is a TRP channel, not a voltage-gated calcium channel (VGCC). Pathway A operates through VGCCs and is blocked by nifedipine. Pathway B's TRPC1 branch is NOT blocked by nifedipine. The two pathways remain pharmacologically distinct — they share the same upstream stimulus (EMF) while acting through completely different channel families.",
          "The prediction TRPC1-1 tests this directly: EMF exposure of reproductive cells with nifedipine (blocks A), anti-TRPC1 (blocks B-calcium), or both should reveal the relative contributions of each pathway.",
        ],
        boundary: "The weight adjustment is based on one study ([[ref:yap2025|Yap 2025]]) in myoblasts. Confirmation in gonadal cells (Sertoli, granulosa) is required before the weight can be considered empirically validated.",
      },
      {
        question: "If EMF effects are real, why do labs get contradictory results?",
        response: [
          "EMF research has produced contradictory results for decades. BERM identifies four uncontrolled moderators that predict which studies find positive results and which find null:",
          "1. SEASON: CRY magnetoreceptor sensitivity is light-dependent. In winter (less light), CRY is more sensitive to EMF — biological effects on melatonin are stronger. A study conducted in summer produces a different result than the same study in winter. This has been directly demonstrated in calves (Halgamuge 2015, Nature Sci Rep).",
          "2. GENOTYPE: CACNA1C rs1006737 polymorphism regulates Cav1.2 channel expression. A-allele carriers produce more channels and show greater Ca²⁺ response per EMF stimulus. [[ref:sousouri2025|Sousouri 2025]] (ETH Zürich) demonstrated directly: CACNA1C genotype determines the 5G sleep response. A study population with low A-allele frequency produces weaker results.",
          "3. LABORATORY ELF BACKGROUND: The 50/60 Hz power grid upregulates VGCC expression in nerve endings after 8–10 days of exposure (PMC4757866). A laboratory with high ELF background 'primes' cells to respond more strongly. A laboratory with low ELF background produces a weaker response.",
          "4. SUBJECTS' NIGHTTIME EMF: A Wi-Fi router in the bedroom versus an EMF-free night affects CaMKII recovery. A subject who slept in an EMF-free environment enters the experiment at a different baseline state than one who slept next to Wi-Fi and a phone.",
          "Three of these moderators predict study outcomes with statistical significance: species/priming (χ²=9.4, p=0.002 — animal studies find effects 92% of the time vs. 35% for human studies), duration (χ²=10.8, p=0.001 — chronic exposure positive 92% vs. acute 31%), and pulsation (χ²=3.9, p=0.048 — pulsed signals positive 88% vs. CW 48%). [[ref:weller2025_dna|Weller et al. (2025)]] validated this pattern in 517 genotoxicity studies: real devices produced more effects than laboratory CW signals, duration was a critical factor, and 58% of DNA damage occurred below ICNIRP safety limits.",
          "In every null-result study where subgroup analysis was performed, a positive subgroup was found: Graham 1996 identified a 'low baseline melatonin' subgroup, Lustenberger 2015 reported 'striking inter-individual differences,' and [[ref:sousouri2025|Sousouri 2025]] showed response only in T/C carriers. The null overall result masks real effects in susceptible subgroups.",
          "Study A (winter, northern latitude, AA-genotype subjects, high lab-ELF, Wi-Fi homes) finds a positive result. Study B (summer, southern latitude, GG-genotype subjects, low lab-ELF, EMF-free homes) finds a null result. Both are CORRECT. Meta-analyses report 'contradictory evidence' because they do not control for these four variables.",
          "This is testable WITHOUT new data: a retrospective analysis of 50–100 published EMF bio-assay studies, coding for study month, laboratory latitude, building material (if reported), and subject background — logistic regression predicting positive vs. null outcome from moderators.",
        ],
        boundary: "The four-moderator framework is BERM's synthesis (M-level), now with quantitative validation: three moderators reach statistical significance (p<0.05) and [[ref:weller2025_dna|Weller 2025]] (n=517 genotoxicity studies) independently confirms the pattern. Individual moderators have empirical support: season (Halgamuge 2015, E-level), genotype ([[ref:sousouri2025|Sousouri 2025]], E-level), ELF priming (PMC4757866, E-level). The retrospective meta-moderator test (REPL-1) would elevate this from M-level to E-level.",
      },
    ],
    closingTitle: "Constructive ways to test the programme",
    closingText:
      "The most useful critiques provide a competing measurement model, a source correction, an independently replicated experiment, or a better demographic design. The project should be judged by whether its registered links survive those tests and how they compare with alternative explanations.",
    findingsLabel: "findings",
    remainLabel: "remain",
    reclassifiedLabel: "reclassified",
    internalRefinementLabel: "internal refinement",
    summaryStats: `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} affect the current empirical BERM · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} affect the L-BERM theory layer · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} affect superseded versions · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} follow-up discriminating tests identified`,
    findingsDistribution: "Findings distribution",
    remainNegativeLabel: "remain negative",
    testsComparison: "Discriminating tests comparison",
    testSvgLabel: "TEST",
    consensusSvgLabel: "CONSENSUS",
    divergenceLabel: "DIVERGENCE",
    angleDependentLabel: "Angle-dependent",
    isotropicLabel: "Isotropic",
    highLabel: "HIGH",
    cohortStepLabel: "Cohort step",
    noCohortStepLabel: "No cohort step",
    cryPredictsLabel: "CRY predicts order",
    noPredictionLabel: "No prediction",
    consensusLabel: "Consensus",
    protocolLabel: "Protocol",
    versionTimeline: "Version timeline",
    abandonedLabel: "Abandoned",
    demotedLabel: "Demoted",
    activeLabel: "Active",
    currentLabel: "Current",
    nextLabel: "Next",
    sentinelTitle: "Sentinel species",
  },
  fi: {
    title: "Kritiikki ja avoimet ongelmat",
    subtitle:
      "Kaikki tunnistetut negatiiviset havainnot, avoimet ongelmat ja falsifioidut aiemmat versiot — sekä se, mitä kukin niistä todella koskee.",
    introduction:
      "BERM v17 pitää avoimuutta epistemologisena periaatteena. Alla oleva luokittelu soveltaa BERM-päättelyprotokollaa (v1.0) aiemmin negatiivisiksi tulkittuihin havaintoihin. Uudelleenluokittelu ei tarkoita, että havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut erotteleva tai ei kohdistunut siihen, mitä sen katsottiin testaavan. BERM:n primäärihaara (polku B / RPM / kohorttivaikutus) on edelleen empiirisesti testaamaton erottelevilla testeillä.",
    summaryLabel: "NEGATIIVISTEN HAVAINTOJEN UUDELLEENARVIOINTI",
    activeTitle: "Aktiiviset ongelmat (pysyvät negatiivisina)",
    activeLead:
      "Nämä pätevät. Kaksi on falsifioituja mekanismeja BERM v6–v9:stä, yksi on matemaattinen este solitonikerroksessa, yksi on dokumentaation eheysvirhe ja kaksi on avoimia teoreettisia ongelmia Lindgrenin kehyksessä.",
    reclassifiedTitle: "Uudelleenluokitellut (eivät erottele malleja)",
    reclassifiedLead:
      "Jokainen näistä tulkittiin falsifikaatioksi. Protokollan mukaan yksikään ei testannut ennustetta, joka erottaa BERM:n konsensusmallista — joko BERM:n ennustetta ei koskaan johdettu, tai testi kohdistui väitteeseen, jota malli ei esitä.",
    refinementTitle: "Sisäiset tarkennukset (johtivat mallin parantamiseen)",
    refinementLead:
      "Nämä olivat aitoja tietyn muotoilun epäonnistumisia, ja kumpikin tuotti rakenteellisen korjauksen puolustuksen sijaan.",
    testsTitle: "Tarvittavat erottelevat testit",
    testsLead:
      "Yksikään 13 havainnosta ei testannut primäärihaaraa. Nämä kolme erottelisivat polun C (RPM) konsensusmallista. Yhtäkään ei ole suoritettu.",
    tests: [
      {
        id: "D1",
        name: "Suuntariippuvuus (solutaso)",
        berm: "RPM-vaste riippuu B₀:n ja B_ext:n välisestä kulmasta (Larmor-resonanssi, anisotrooppinen hyperfine).",
        consensus: "Isotrooppinen vaste: tehoriippuvainen, ei suuntariippuvainen.",
        protocol: "CRY-ekspressoivat solut, kontrolloitu B₀-suunta, 3 kulmaa × 3 kenttätasoa; päätepiste ROS tai melatoniinituotanto.",
        cost: "~5 000–15 000 € · yksi solubiologian laboratorio",
      },
      {
        id: "D2",
        name: "Kohorttiporrashypoteesi (demografinen)",
        berm: "4G-kaudella (2012+) syntyneet kohortit näyttävät eri ASFR-profiilin kuin 2G-kaudella syntyneet, kontrolloituna kulttuurisille muuttujille.",
        consensus: "Ei kohorttiporrasta teknologiasukupolven mukaan.",
        protocol: "WPP ASFR-data, ikäryhmittäinen analyysi, kohortin syntymävuosi vs. teknologiasukupolvi, maakohtaiset kiinteät vaikutukset.",
        cost: "0 € (julkinen data) · ~2 viikkoa · osittain testattavissa nyt, täysi testi 2030+",
      },
      {
        id: "D3",
        name: "Lajihierarkia (spin-koherenssi × populaatiolasku)",
        berm: "CRY:n spin-koherenssiaika ennustaa lajien välisen herkkyysjärjestyksen: pidempi koherenssi → suurempi herkkyys → nopeampi lasku.",
        consensus: "Ei ennustetta lajien välisestä järjestyksestä.",
        protocol: "Kirjallisuussynteesi CRY-koherenssiajoista × populaatiotrendidata (mehiläinen, muuttolintu, kotivarpunen, koira, ihminen).",
        cost: "0 € (kirjallisuusdata) · ~1 viikko",
      },
    ],
    historyTitle: "Versiohistoria",
    historyHeaders: ["Versio", "Mekanismi", "Status", "Miksi hylätty"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC-resonanssi 94–183 GHz", status: "Hylätty", why: "Fysikaalisesti mahdoton: viisi kertaluokkaa liian nopea proteiinin konformaatiodynamiikalle" },
      { version: "BERM 6–9", mechanism: "Vesiresonanssi 2,45 GHz", status: "Hylätty", why: "Käänteinen fysiikka: absorptio on rotaatiovaimennusta, ei vahvistavaa resonanssia" },
      { version: "BERM 6–9", mechanism: "Solitonipropagaatio", status: "Hylätty", why: "Ghost-obstruktio: π₂ = 0 aikakaltaiselle A:lle, ghost-energia avaruuskaltaiselle" },
      { version: "L-BERM", mechanism: "VGCC puhtaan geometrian kautta", status: "Alennettu", why: "δV_m on 10¹⁷× liian pieni ilman biologisia vahvistimia" },
      { version: "BERM < v6", mechanism: "EMF selittää koko demografisen siirtymän", status: "Hylätty", why: "Pre-EMF-lasku on D-termin (kulttuurinen kysyntä) ajamaa" },
    ],
    questionsTitle: "Tutkimuskysymykset ja näyttörajat",
    objections: [
      {
        question: "Ympäristön EMF-kentät ovat liian heikkoja biologisiin vaikutuksiin",
        response: [
          "[[ref:vaziri2016|Ihmisen silmä havaitsee yksittäisiä fotoneja.]] Hait havaitsevat 0,5 µV/m sähkökenttiä. [[ref:ritz2004|Muuttolintujen kompassi häiriintyy 15 nT RF-kohinasta]] — 0,03 % geomagneettisesta taustasta. Biologia toimii sähkömagneettisen herkkyyden kvanttirajoilla, koska evoluutio optimoi havaitsemisen, ei toleranssin.",
          "Kaksikymmentäkuusi regulaattorihyväksyttyä laitekategoriaa hyödyntää ei-termisiä EMF-biologisia vaikutuksia koko EM-spektrillä — DC-luunstimulaattoreista (1986) UV-valohoitoon. Tämä sisältää 12 000+ yksittäistä TENS-hyväksyntää, 8–10 miljardin dollarin neuromodulaatiomarkkinat ja 160 000+ implantoitua DBS-laitetta. [[ref:tdcs_fda_depression_2025|tDCS hoitaa masennusta 0,3–1,0 V/m]] — sama suuruusluokka kuin kaupunkiympäristön mitattu RF (0,67–1,51 V/m). Väite EMF:n 'liiallisesta heikkoudesta' on suorassa ristiriidassa regulaattoreiden hyväksymispäätösten kanssa maailmanlaajuisesti.",
          "Ionien pakotettu oskillaatio -mekanismi ([[ref:panagopoulos2025_ifo|Panagopoulos 2025, Frontiers in Public Health]]) osoittaa biologisen vasteen kynnyksen 10⁻⁵ V/m polarisoituneille, koherenteille kentille — viisi kertaluokkaa alle tyypillisen ympäristötason. Intensiteettikuilua ei ole. Kuilu oli olemassa vain malleissa, jotka olettivat termisten vaikutusten olevan ainoa mekanismi.",
          "Vuonna 2026 [[ref:kim2026_cell_gene_switch|Kim ym. (Cell, IF ~64)]] tunnistivat Cyb5b:n — mitokondrion ulkokalvoproteiinin — geneettisesti varmennetuksi EMF-sensoriksi genominlaajuisessa CRISPR-seulonnassa. 60 Hz pulssi-EMF aktivoi geenipromoottoreita in vivo Cyb5b:n kautta → Ca²⁺-vaihtelut. Tämä on ensimmäinen geneettisesti tunnistettu EMF-reseptori. 'Liian heikko' -argumentti on nyt ristiriidassa paitsi FDA-laitteiden hyväksyntöjen ja IFO-biofysiikan, myös Cell-lehdessä julkaistun CRISPR-validoidun molekyylireseptorin kanssa.",
          "Vuonna 2013 mehiläistutkija [[ref:greggers2013_bee_electric_comm|Uwe Greggers]] totesi, että ihmisperäiset sähkökentät ovat 'paljon pienempiä energialtaan kuin mehiläisten itsensä tuottamat' ja että mehiläisten 'pitäisi olla luonnollisesti suojattuja.' Vuonna 2025 [[ref:mallinson2025_electric_pollution|Mallinson ym.]] testasivat tämän empiirisesti kenttäkokeessa — ja havaitsivat, että ihmisperäiset AC-sähkökentät vähentävät mehiläisten ravinnonhakua 71 % (iScience / Cell Press). Intuitiivinen arvio 'kenttä on liian heikko' epäonnistui empiirisen testin edessä. Tämä on täsmälleen sama virhe, jonka ICNIRP tekee ihmisten terveyden osalta: oletetaan testaamatta, että ympäristön kenttävoimakkuudet ovat biologisten kynnysarvojen alla.",
        ],
        boundary: "Intensiteettiargumentti on empiirinen väite. FDA-hyväksynnät ja IFO-kynnysmittaukset ovat empiirisiä tosiasioita. Todistustaakka on intensiteettiargumentilla selittää, miksi FDA-hyväksytyt ei-termiset laitteet toimivat.",
      },
      {
        question: "TTFields todistaa, että IF-vaikutukset toimivat vain korkealla intensiteetillä",
        response: [
          "TTFields käyttää dielektroforeesia (DEP) — neliöllistä mekanismia, joka vaatii 100–300 V/m kenttävoimakkuuksia. Ympäristön IF-altistus toimii täysin eri mekanismilla: ionien pakotetulla oskillaatiolla (IFO-VGIC), joka on lineaarinen kenttävoimakkuuden suhteen ja jonka osoitettu kynnys on 10⁻⁵ V/m ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]). Eri mekanismeilla on eri intensiteettivaatimukset.",
          "Pulssimuotoiset LED-hakkurikentät ovat biologisesti aktiivisempia wattia kohti kuin TTFieldsin puhdas siniaalto ([[ref:campisi2010|Campisi 2010]]: amplitudimoduloitu 900 MHz tuotti enemmän ROS:ia ja DNA-fragmentaatiota kuin jatkuva aalto). LED-hakkurit tuottavat pulssimuotoisia, harmonisesti rikkaita aaltomuotoja yli 50 000 kytkentäsiirtymällä sekunnissa — jokainen siirtymä potentiaalinen Ca²⁺-piikki VGCC-portituksen asymmetrian kautta.",
          "TTFields-kliininen ohjelma validoi, että IF-taajuudet häiritsevät solunjakautumista. Se ei määrittele minimiintensiteettiä jolla häiriö alkaa — siihen kysymykseen vastaa IFO-biofysiikka, ei TTFieldsin käyttämä DEP-mekanismi.",
          "Kriittisesti, Neuhaus ym. (Nature 2020) osoittivat, että TTFieldsin taajuusriippuvuus eroaa syöpä- ja normaalien solujen välillä: syöpäsolut kärsivät eniten 150–200 kHz:llä, kun taas normaalien solujen mitoosi häiriintyy ~50 kHz:llä. LED-hakkurien kytkentätaajuudet (20–100 kHz) kattavat juuri tämän normaalien solujen herkkyystaajuusalueen — sattuma, jota pelkkä intensiteettiargumentti ei voi käsitellä.",
        ],
        boundary: "Tämä erottelu on falsifioitavissa: jos IFO-vaikutuksia ei voida osoittaa alle 1 V/m:n kontrolloiduissa kokeissa, ympäristön IF-kanava menettää ensisijaisen mekanisminsa.",
      },
      {
        question: "Voivatko demografiset ja sosiaaliset syyt selittää periodin TFR-muutoksen?",
        response: [
          "Kyllä. Koulutus, ehkäisy, asuminen, työmarkkinat, parinmuodostus, muuttoliike, politiikka, toivottu perhekoko, tempo ja ART vaikuttavat havaittuun hedelmällisyyteen. Periodin TFR on viisivuotisikäryhmien summa, ei suora gametti- tai hedelmöitystesti.",
          "V2 mallintaa siksi ASFR:n ennen TFR:ää ja pitää kysynnän/mahdollisuuden, tempon sekä ART:n ja elävänä syntymisen nimenomaisina. Se ei kohdista niiden jäännösvaihtelua biologiseen kenttäreittiin.",
          "Kuitenkin: pelkkä unideprivaatio alentaa testosteronia 10–15 % ja siittiömäärää 29 % kontrolloiduissa laboratoriokokeissa terveillä nuorilla miehillä — ilman kulttuurista, käyttäytymisen tai kemiallisen altistuksen muutosta ([[ref:leproult2011_testosterone_sleep|Leproult & Van Cauter 2011]]; [[ref:walker2017_why_we_sleep|Walker 2017]]). Kysymys ei ole vaikuttaako uni hedelmällisyyteen (vaikuttaa, kiistattomasti) vaan häiritseekö EMF unta (CRY/RPM-mekanismi ja LED-melatoniinivaimennusdata sanovat kyllä).",
        ],
        boundary: "Maakohtainen trendi ei yksin tunnista biologista syytä. Väestöpäättely vaatii kohdistetun FieldState-, päätepiste-, pari- ja ASFR-paneelin sekä uskottavat kilpailevat mallit.",
      },
      {
        question: "Osoittaako Lindgren-fysiikka ihmisen lisääntymismekanismin?",
        response: [
          "Lindgrenin vuoden 2025 metriikka on BERM:n teoriapremissi. BERM ehdottaa sen jälkeen tausta-, orientaatio- ja spektririippuvuutta erotteleviksi hypoteeseiksi. Raportoitu 87,5 %:n algebrallinen vastaavuus RPM:ään on rakennevertailu, ei johdettu geometria–RPM-operaattori, joten se ei anna CRY-reitille suoraa geometrista perustaa.",
          "Jokainen alajuoksuinen biologinen lenkki — kentän geometriasta kromoforin vasteeseen ja elinkohtaisiin päätepisteisiin — vaatii oman kokeellisen validointinsa. Relevantit testit ovat erottavia fysikaalisia ja biologisia kokeita: ennalta määritelty kulma-, tausta- tai PSD-riippuvuus kalibroiduilla kentillä ja asianmukaisilla sham-/lämpökontrolleilla.",
        ],
        boundary: "Teoreettinen viitekehys tuottaa ennusteet; ennusteet testataan empiirisesti. Jokainen lenkki tarvitsee oman mitatun näyttönsä.",
      },
      {
        question: "Mitä lisääntymis- ja estetutkimukset todella osoittavat?",
        response: [
          "Rekisterissä on rajattuja löydöksiä, kuten in-vitro-ihmisen siittiöpäätepisteitä, eläinmallien veri–kiveseste- ja munasarjatutkimuksia sekä mekanistista redox-/tight-junction-työtä. Ne voivat motivoida elinkohtaisia tiloja yhden geneerisen biologisen kapasiteettikäyrän sijasta.",
          "Järjestelmät, taajuudet, amplitudit, kestot ja päätepisteet eroavat. Eläin- ja solutuloksia ei voi suoraan muuntaa väestöannokseksi, hedelmällisyystodennäköisyydeksi tai maakohtaiseksi ennusteeksi.",
        ],
        boundary: "Tutkimus–solmu-tietue tukee vain rekisteröityä reitin osaa. Mikään niistä ei ole suora TFR-kulmakerroin eikä ihmisen päätepistepaneelin korvike.",
      },
      {
        question: "Voivatko mobiililiittymät tai eDRX osoittaa fysikaalisen altistusreitin?",
        response: [
          "Mobiililiittymätiheys on yhdistelmäproksi koko sähkömagneettiselle ympäristölle — se seuraa tukiasemien käyttöönottoa, Wi-Fin leviämistä, IoT-tiheyttä ja sisätilaelektroniikan yleistymistä, ei pelkkää RF-altistusta. Nykyinen N = 163 -kohorttitulos käyttää tätä yhdistelmäproksia kuvailevaan kohorttianalyysiin.",
          "Samoin eDRX on laitteen vastaanoton/sivutuksen ajoitusmetadataa, ei yksin tunnettu downlink-RF-kenttäallekirjoitus. Mahdollinen verhokäyrä- tai huojuntapiirre on mitattava todellisessa kentässä ennen biologista testiä.",
        ],
        boundary: "Sijaismuuttujan ajoitus ja fysikaalinen dosimetria vastaavat eri kysymyksiin, ja ne on merkittävä eri tavoin.",
      },
      {
        question: "Entä vaihteleva EMF-kirjallisuus ja systemaattiset katsaukset?",
        response: [
          "Näyttöpohja on heterogeeninen. Tutkimuslaatu, altistusluonnehdinta, lämpökontrolli, päätepistevalinta ja replikaatio vaihtelevat huomattavasti. Katsaukset voivat osoittaa, että eri järjestelmistä on löydöksiä, mutta niiden varmuusarviot ja herkkyysanalyysit on raportoitava yhden otsikkolauseen sijaan.",
          "Esimerkiksi [[ref:cordelli2024_who|WHO:n tilaama lisääntymiskatsaus]] raportoi haitallisia löydöksiä useissa analyyseissä, mutta arvioi suuren osan varmuudesta matalaksi tai hyvin matalaksi ja edellytti herkkyyttä korkean SAR:n tutkimuksille. V2 käsittelee tätä kontekstina, ei vakiintuneena väestövaikutuksena.",
        ],
        boundary: "Oikea vastaus epävarmuuteen on parempi mittaus ja läpinäkyvä tutkimuspainotus, ei vahvempi narratiiviväite.",
      },
      {
        question: "Voivatko kemikaalit, ilmasto, sairaudet, elämäntapa tai muut altisteet olla mukana?",
        response: [
          "Kyllä. Nämä altisteet voivat vaikuttaa lisääntymisbiologiaan ja yhteisvaihdella teknologian, kaupungistumisen ja sosioekonomisen muutoksen kanssa. Ne ovat kilpailevia selityksiä ja mahdollisia yhteisvaikutuksia, eivät häiriötekijöitä, jotka voidaan sivuuttaa yksinkertaisella korrelaatiolla.",
          "Hyödyllinen testi mittaa tai suunnittelee uskottavien yhteisaltisteiden ympärille, vertailee vaihtoehtoisia kausaalimalleja ja raportoi, miten päätelmä muuttuu, kun ne sisällytetään.",
        ],
        boundary: "Yksittäinen maidenvälinen kuvio ei osoita yhden ympäristösyyn hallitsevuutta. V2:n on ansaittava attribuutio erottavalla datalla.",
      },
      {
        question: "Tanskalaiset ja NHANES-tutkimukset eivät löytäneet BMI-riippumatonta laskua",
        response: [
          "Tämä tulkinta olettaa BMI:n olevan sekoittaja (itsenäinen syy). BERM:n kausaalimalli käsittelee BMI:tä mediaattorina: EMF aiheuttaa samanaikaisesti sekä BMI:n nousun (kuuden metabolisen reitin kautta) että testosteronin laskun (suorasti Cav3.2/melatoniini/kortisoli-reittien kautta). BMI-korjaus poistaa medioidun signaalin — ylikorjaus joka hävittää todellista biologista vaikutusta.",
          "[[ref:mazur2013|Mazur ym. 2013]] (PLOS ONE, n = 991 US Air Force -veteraania, 20 vuoden seuranta) tarjoaa kriittisen testin: miehet, jotka PITIVÄT PAINONSA VAKIONA menettivät silti 117 ng/dL (19 %) testosteroninsa 20 vuodessa. Lihavuus ei voi selittää tätä laskua. Suora reitti kattaa noin kaksi kolmasosaa kokonaisvaikutuksesta; medioitu reitti (BMI:n kautta) noin kolmanneksen.",
          "[[ref:santi2025|Santi ym. 2025]] (n = 1 064 891, suurin koskaan tehty meta-analyysi) ei havainnut BMI:n ajallista trendiä tutkimuspopulaatiossaan, mutta testosteroni laski merkitsevästi. Kasvava lihavuus ei ole ajuri tässä aineistossa.",
          "[[ref:klimentidis2010|Klimentidis ym. 2010]] (Proc R Soc B) osoittivat, että laboratorieläimet KONTROLLOIDUILLA ruokavalioilla lihoivat vuosikymmenten kuluessa (p = 1,2×10⁻⁷). Ruokavalion ulkopuolinen ympäristötekijä ajaa painonnousua — sama tekijä voi samanaikaisesti ajaa testosteronin laskua medioidun reitin kautta.",
        ],
        boundary: "Mediaattoritulkinta on testattavissa formaalilla mediaatioanalyysilla (Baron & Kenny tai SEM) pitkittäisaineistoilla joissa on samanaikaiset T- ja BMI-mittaukset. Jos BMI:n epäsuora vaikutus on alle 10 % kokonaisvaikutuksesta, mediaattorimalli heikkenee.",
      },
      {
        question: "Mikä siirtäisi mallin rakenteesta tulokseksi?",
        response: [
          "Mittausvalmis FieldState tarvitsee dokumentoidun kalibroinnin, B₀-vektorin, elinkohtaisen siirtofunktion, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja provenienssin. Se on sen jälkeen yhdistettävä ennalta määriteltyyn elin- tai paripäätepisteeseen näyttö- ja parametri-ID:hin kiinnittyvillä vastaavuuksilla.",
          "Kalibrointi tehdään vain opetusjaksolla, jota seuraavat riippumaton laboratorioreplikaatio ja sovituksen ulkopuolelle jätetty ASFR/TFR-jakso. Sekä nolla- että ei-nollatulosten tulee päivittää kausaalirekisteriä.",
        ],
        boundary: "Kunnes nämä kytkennät ovat olemassa, v2 on tutkimusmäärittely ja kausaalikartta, ei kalibroitu maakohtainen ennustemalli.",
      },
      {
        question: "LED-lamput ovat energiatehokkaita ja sertifioituja turvallisiksi",
        response: [
          "LED-lamput on sertifioitu sähkömagneettisen yhteensopivuuden (EMC) osalta — eli niiden emissiot eivät häiritse muita elektronisia laitteita yli sääntelyrajojen. Niitä ei ole sertifioitu välitaajuusemissioidensa biologisen turvallisuuden osalta. CISPR 15, standardi, joka koskee LED-valaistuksen EMF:ää, suunniteltiin suojaamaan radiovastaanottoa, ei biologisia järjestelmiä.",
          "Mikään sääntelyelin ei ole arvioinut LED-ajureiden jatkuvien 20–200 kHz kenttien biologisia vaikutuksia. [[ref:panagopoulos2025_ifo|Panagopouloksen 2025]] IFO-VGIC-kynnys (10⁻⁵ V/m) on kertaluokkia minkä tahansa EMC-rajan alapuolella. EMC-vaatimustenmukaisuus ja biologinen turvallisuus ovat täysin erilaisia standardeja, jotka mittaavat täysin erilaisia asioita.",
          "[[ref:zeghoudi2025_led_driver_emf|Zeghoudi ym. 2025]] (Optics & Laser Technology) mittasi suoraan LED-ajurin lähikenttäemission ja vahvisti sähkökentän komponentit senttimetrien etäisyydellä. Tyypillisessä kodissa on 15–30 LED-lamppua, joista jokaisessa on hakkuriteholähde. EU:n hehkulamppukielto (2009–2012) korvasi nolla-IF-lähteet jatkuvilla IF-lähteillä ~450 miljoonalle ihmiselle ilman minkäänlaista sähkömagneettisen muutoksen arviointia.",
          "[[ref:ijrb2022_if_review|Vuoden 2022 IJRB:n systemaattinen katsaus IF-EMF:n]] (300 Hz–10 MHz) eläintutkimuksista vahvisti, että tämä taajuuskaista on saanut minimaalisen määrän terveystutkimusta verrattuna ELF:ään ja RF:ään — sääntelyn aukko on nyt dokumentoitu vertaisarvioidussa kirjallisuudessa.",
        ],
        boundary: "Tämä on sääntelyn aukko -argumentti, ei terveysväite. Jos LED-ajuriemissiot ympäristöetäisyyksillä eivät tuota mitattavaa IFO-VGIC-vastetta kontrolloiduissa kokeissa, IF-kanavahuoli on empiirisesti ratkaistu.",
      },
      {
        question: "Annos-vastetta ei ole",
        response: [
          "[[ref:adey1976_calcium_window|Adeyn-Blackmanin kalsiumikkuna, dokumentoitu vuodesta 1976]], osoittaa, ettei EMF:n biologiset vaikutukset noudata lineaarista annos-vastetta. Kalsiumin ulosvirtausta kissan aivokudoksesta tapahtui tietyissä intensiteetti-ikkunoissa (0,1–1,0 mW/cm² taajuudella 450 MHz amplitudimoduloituna 16 Hz:llä) mutta EI korkeammilla tai matalammilla tasoilla. Tämä 'ikkunailmiö' tarkoittaa, että ICNIRP:n lähestymistapa — kynnysarvon asettaminen jonka yläpuolella vaikutuksia esiintyy — on rakenteellisesti väärä. Vaikutuksia esiintyy ikkunoissa, ei kynnysarvojen yläpuolella.",
          "Tämä selittää myös, miksi replikaatiotutkimukset, jotka käyttävät eri intensiteettejä, eivät välttämättä löydä alkuperäisen tutkimuksen vaikutuksia: ne saattavat testata ikkunan ulkopuolella. Epäonnistuminen replikoinnissa ei ole todiste puuttumisesta — se on todiste epälineaarisuudesta. Ikkunailmiö on vahvistettu useissa laboratorioissa ja biologisissa päätepisteissä vuodesta 1976.",
          "Ikkunailmiö on yhteensopiva resonanssin fysiikan kanssa: biologiset järjestelmät vastaavat maksimaalisesti tietyillä taajuuksilla ja intensiteeteillä, joissa energiansiirto kohdemolekyyleihin on optimoitu. Ikkunoiden ylä- ja alapuolella kytkentä on tehottomampaa. Tämä on samaa fysiikkaa, joka saa radiovirittimen toimimaan — se havaitsee signaaleja vain viritetyllä taajuudella, ei yli tai alle.",
        ],
        boundary: "Ikkunailmiö on empiirinen havainto. Jos ikkunariippuvaista annos-vastetta ei voida osoittaa lisääntymispäätepisteille ympäristöintensiteeteillä, relevanssi hedelmällisyyteen on osoittamaton.",
      },
      {
        question: "Malli vain sovittaa BKT:tä",
        response: [
          "Lineaarisissa malleissa EMF ja BKT ovat kollineaarisia (r = 0,87) eikä kumpikaan ole merkitsevä toisen kontrolloinnin jälkeen. Tämä on symmetrinen identifikaatio-ongelma, ei todiste EMF:ää vastaan.",
          "Kolme rakenteellista eroa erottaa EMF:n BKT:stä. Ensinnäkin sähkön saatavuus on binäärinen kynnys. Väestön sähköistetyn osuuden mukaan korjaaminen parantaa TFR-ennustetta (r: −0,864 → −0,885). BKT:llä ei ole vastaavaa kynnystä — kaikki osallistuvat taloudelliseen toimintaan jollakin tasolla, mutta vain osalla on sähkö.",
          "Toiseksi matkapuhelimet (tietolaite) ovat HEIKOIN EMF-proxy (RMSE 1,053). Asumisen sähkönkulutus (infrastruktuuri) on PARAS (univariaatti-RMSE 0,533). Jos mekanismi olisi 'tieto → valinnat', tietolaitteen pitäisi ennustaa parhaiten. Ei ennusta.",
          "Kolmanneksi sentinelkilajit reagoivat sähkökenttiin ([[ref:mallinson2025_electric_pollution|Mallinson 2025]]: mehiläiset −71 %) mutta eivät BKT:hen. Koirat, mehiläiset ja sammakot eivät tee taloudellisia valintoja.",
        ],
        boundary: "Poikkileikkausanalyysi ei voi tunnistaa kausaalisuuntaa EMF:n ja BKT:n välillä. Erotteleva näyttö tulee sentinelkilajeista, luonnollisista kokeista (Faraday-pesät) ja väestöistä ilman sähköä.",
      },
      {
        question: "Sähkön saatavuus on vain kehityksen proxy",
        response: [
          "Sähkön saatavuus korreloi kehityksen kanssa, mutta sillä on ominaisuus jota millään muulla kehitysindikaattorilla ei ole: FYSIKAALINEN KYNNYS. IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m) ylittyy jokaisen kodin sähkölaitteen käyttöetäisyydellä. Tämä tarkoittaa, ettei sähköistyminen ole vain korreloitunut biologisten vaikutusten kanssa — se on altistumisen MEKANISMI.",
          "Osittain sähköistetyissä maissa (Nigeria 55 %, Etiopia 51 %, Uganda 42 %) kansallinen TFR on sekoitus sähköistetystä väestöstä (altistuu EMF:lle, matalampi TFR) ja sähköistämättömästä väestöstä (ei altistu, TFR lähellä biologista maksimia ~6,5). Millään muulla kehitysindikaattorilla ei ole tätä binääristä sekoitusrakennetta. Et voi sanoa '55 % väestöstä on koulutettuja' samalla binäärisellä tavalla — koulutus on jatkuva gradientti.",
          "Binäärinen kynnys tuottaa testattavan ennusteen: DHS-mikrodatan (Demographic and Health Survey) tulisi osoittaa matalampi TFR sähköistetyissä kotitalouksissa verrattuna sähköistämättömiin saman maan sisällä, kontrolloituna tuloille ja koulutukselle. Tätä testiä ei ole vielä suoritettu.",
        ],
        boundary: "Jos DHS-mikrodata ei osoita sähköistettyjen/sähköistämättömien TFR-eroa tulojen ja koulutuksen kontrolloinnin jälkeen, binäärisen kynnyksen argumentti on falsifioitu.",
      },
      {
        question: "EHS on psykosomaattista — nosebo selittää itseraportoidut oireet",
        response: [
          "[[ref:sousouri2025|Sousouri ym. 2025]] (NeuroImage, ETH Zürich) suoritti kaksoissokkotutkimuksen (RCT) CACNA1C-genotyypityksellä. Rs7304986 T/C -kantajat osoittivat muuttunutta unisukkuladynamiikkaa 3,6 GHz RF-altistuksessa ICNIRP-rajojen alapuolella, kun taas CC-homotsygootit eivät. Koehenkilöt eivät tienneet genotyyppiään, altistustilaa eivätkä hypoteesia. Nosebo ei voi tuottaa genotyypistä riippuvaisia neurofysiologisia muutoksia kaksoissokkoasetelmassa.",
          "Tämä muuttaa EHS-kysymyksen muodosta 'tuntevatko itseraportoijat jotain?' (jossa nosebo on validi huoli) muotoon 'ennustaako ionikanavan genotyyppi mitattavan aivovasteen RF:lle?' (jossa nosebo on mekanistisesti poissuljettu). Relevantti muuttuja ei ole itsediagnoosi vaan VGCC-polymorfismi — biologinen ominaisuus, johon koehenkilö ei voi vaikuttaa uskomuksellaan.",
          "[[ref:belpomme2022|Belpomme ym. 2022]] luonnehtii ~1 000 EHS-potilasta objektiivisilla biomarkkereilla (histamiini, S100B, nitrotyrosiini). Yhdistettynä [[ref:sousouri2025|Sousorin genotyyppidataan]], näyttö viittaa EMF-herkkyyden jatkuvaan jakaumaan väestössä, jossa kliininen EHS-fenotyyppi edustaa hännän ääripäätä — ei psykosomaattista kategoriaa.",
        ],
        boundary: "Nosebohypoteesi tekee testattavan ennusteen: genotyypin ei pitäisi ennustaa vastetta kaksoissokkoasetelmassa. [[ref:sousouri2025|Sousouri 2025]] falsifioi tämän ennusteen CACNA1C rs7304986:lle. Replikaatio suuremmalla N:llä ja lisä-VGCC-varianteilla tarvitaan.",
      },
      {
        question: "Mekanismi on epäuskottava",
        response: [
          "Tätä argumenttia on sovellettu jokaiseen ei-termiseen EMF-havaintoon 50 vuoden ajan — ja se on ollut väärässä joka kerta.",
          "Vuonna 1976 [[ref:adey1976_calcium_window|Adey]] ja Blackman dokumentoivat kalsiumeffluksin aivokudoksesta tietyillä kenttäintensiteeteillä. Hylättiin 'artefaktiksi' koska epälineaarinen annos-vaste oli 'epäuskottava.' Vuonna 2026 [[ref:kim2026_cell_gene_switch|Kim ym. (Cell)]] osoittivat, että rytmiset kalsiumvaihtelut — eivät lineaarinen kalsiumpitoisuuden nousu — ohjaavat geeniekspressiota, selittäen ikkunailmiön.",
          "Vuonna 1995 [[ref:lai1995_dna_breaks|Lai ja Singh]] havaitsivat DNA-katkoksia 2450 MHz säteilystä. Teollisuus rahoitti vastatutkimuksia ja painosti heidän yliopistoaan. Mekanismi tunnistettiin myöhemmin: oksidatiivinen stressi VGCC-välitteisen kalsiumtulvan kautta, vahvistettu melatoniinin suojavaikutuksella.",
          "Vuonna 2026 [[ref:kim2026_cell_gene_switch|Kim ym:n Cell-artikkelia]] kutsuttiin 'incredibly implausible' fyysikko [[ref:york2026_kim_commentary|Andrew Yorkin]] toimesta. Artikkeli käytti CRISPR-seulontaa Cyb5b:n tunnistamiseksi EMF-sensoriksi ja osoitti palautuvan geeniekspression kontrollin transgeenisissä hiirissä.",
          "Kaava on johdonmukainen: data on vahvaa, mekanismi on tuntematon, kriitikot julistavat mahdottomuuden. Sitten mekanismi löytyy. 'Epäuskottavuusargumentti' ei ole tiedettä — se on argumentti tietämättömyydestä.",
          "BERM tarjoaa testattavan fysikaalisen ehdotuksen, ei valmista ratkaisua: χ(Ā) on Lindgrenin vuoden 2025 metriikkapremissin motivoima sulkeumahypoteesi. Se ei vielä johda ulkoisen kentän kytkentää ionikanavaan tai muuhun biologiseen havaittavaan. Fotonisensorivertaus motivoi herkkyyskokeita, mutta ei korvaa avointa L2-operaattoria eikä sen kalibrointia.",
        ],
        boundary: "Lindgrenin tulkinta on teoreettinen eikä sitä ole vielä riippumattomasti validoitu. Empiiriset havainnot ([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], Pall, [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]]) ovat olemassa riippumatta teoreettisesta kehyksestä.",
      },
      {
        question: "Sininen valo selittää kaikki LED:n terveysvaikutukset",
        response: [
          "Sininen valo vaimentaa melatoniinia — tämä on vakiintunutta. Mutta se ei ole koko kuva.",
          "[[ref:duraccio2019_blue_light|Duraccio ym. (2019)]] havaitsi, että sinisen valon suodatuslasit EIVÄT merkitsevästi parantaneet nuorten unenlaatua. Jos sininen valo olisi ainoa mekanismi, sen suodattamisen pitäisi toimia. Ei toimi.",
          "BERM ehdottaa, että LED-lamput tuottavat KAKSI biologisesti relevanttia ulostuloa: sininen valo (optinen, retinaalinen) ja IF-emissiot (sähkömagneettinen, systeeminen). Sinisen valon suodatus kohdistuu ensimmäiseen mutta ei toiseen.",
          "Tämä tuottaa testattavan ennusteen (SLEEP-1): Faraday-suojattu LED-lamppu joka estää IF-emissiot mutta säilyttää identtisen valospektrin tuottaisi vähemmän biologista häiriötä kuin suojaamaton lamppu. Jos suojauksella ei ole vaikutusta, IF-kanavahypoteesi heikkenee.",
        ],
        boundary: "SLEEP-1-ennuste on suoraan falsifioitavissa. Jos Faraday-suojatut LED:t tuottavat saman unihäiriön kuin suojaamattomat (identtinen spektri), IF-polku ei ole ensisijainen mekanismi.",
      },
      {
        question: "Miksi polku B saa 25 % kun se oli alun perin 15 %?",
        response: [
          "Polku B sai alun perin 15 % perustuen tunnettuun rooliinsa sirkadiaanisen kellon modulaattorina. Vuonna 2025 [[ref:yap2025|Yap ja kollegat]] löysivät, että CRY2 — polku B:n pääproteiini — on myös fysikaalisessa vuorovaikutuksessa TRPC1:n, kationikanavan, kanssa ja säätelee kalsiumsignalointia mekanismilla, joka vaatii sekä valon että FAD:n. Tämä tarkoittaa, että polku B kattaa KAKSI alaspäin suuntautuvaa vaikutusta: sirkadiaanisen kellon häiriön JA CRY2-riippuvaisen kalsiumsignaloinnin. Korotettu paino (25 %) heijastaa tätä laajennettua biologista vaikutuskenttää.",
          "TRPC1 on TRP-kanava, ei jänniteriippuvainen kalsiumkanava (VGCC). Polku A toimii VGCC:iden kautta ja nifedipiini estää sen. Polku B:n TRPC1-haara EI ole nifedipiinin estämä. Kaksi polkua pysyy farmakologisesti erillisinä — ne jakavat saman ylävirtastimulaation (EMF) mutta toimivat täysin eri kanavaperheiden kautta.",
          "Ennuste TRPC1-1 testaa tämän suoraan: EMF-altistus reproduktiosoluille nifedipiinin (estää A:n), anti-TRPC1:n (estää B-kalsiumin) tai molempien kanssa paljastaa kunkin polun suhteellisen kontribuution.",
        ],
        boundary: "Painon muutos perustuu yhteen tutkimukseen ([[ref:yap2025|Yap 2025]]) myoblasteissa. Vahvistus gonadikudoksessa (Sertoli, granuloosa) vaaditaan ennen kuin painoa voidaan pitää empiirisesti validoituna.",
      },
      {
        question: "Jos EMF-vaikutukset ovat todellisia, miksi laboratoriot saavat ristiriitaisia tuloksia?",
        response: [
          "EMF-tutkimus on tuottanut ristiriitaisia tuloksia vuosikymmeniä. BERM tunnistaa neljä kontrolloimatonta moderaattoria, jotka ennustavat mitkä tutkimukset löytävät positiivisen tuloksen ja mitkä nollatuloksen:",
          "1. VUODENAIKA: CRY-magnetoreseptorin herkkyys on valoriippuvainen. Talvella (vähemmän valoa) CRY on herkempi — biologiset vaikutukset melatoniiniin ovat voimakkaampia. Kesällä tehty tutkimus tuottaa eri tuloksen kuin sama tutkimus talvella. Tämä on suoraan osoitettu vasikoilla (Halgamuge 2015, Nature Sci Rep).",
          "2. GENOTYYPPI: CACNA1C rs1006737 -polymorfismi säätelee Cav1.2-kanavien ekspressiota. A-alleelin kantajat tuottavat enemmän kanavia ja suuremman Ca²⁺-vasteen per EMF-stimulus. [[ref:sousouri2025|Sousouri 2025]] (ETH Zürich) osoitti suoraan: CACNA1C-genotyyppi määrittää 5G-univasteen. Tutkimuspopulaatio jossa A-alleeli on harvinainen tuottaa heikomman tuloksen.",
          "3. LABORATORION ELF-TAUSTA: 50/60 Hz sähköverkko lisää VGCC-ekspressiota hermopäätteissä 8–10 päivän altistuksen jälkeen (PMC4757866). Laboratorio jossa on korkea ELF-tausta 'primaa' solut reagoimaan vahvemmin. Matalan ELF-taustan laboratorio tuottaa heikomman vasteen.",
          "4. KOEHENKILÖIDEN YÖLLINEN EMF: WiFi-reititin makuuhuoneessa vs. EMF-vapaa yö vaikuttaa CaMKII:n palautumiseen. Koehenkilö joka nukkui EMF-vapaassa ympäristössä tulee kokeeseen eri baseline-tilassa kuin koehenkilö joka nukkui WiFi:n ja puhelimen vieressä.",
          "Kolme näistä moderaattoreista ennustaa tutkimustuloksia tilastollisesti merkitsevästi: laji/primaus (χ²=9,4, p=0,002 — eläintutkimukset löytävät vaikutuksia 92 % ajasta vs. 35 % ihmistutkimuksista), kesto (χ²=10,8, p=0,001 — krooninen altistus positiivinen 92 % vs. akuutti 31 %) ja pulsaatio (χ²=3,9, p=0,048 — pulsatoidut signaalit positiivisia 88 % vs. CW 48 %). [[ref:weller2025_dna|Weller ym. (2025)]] validoi tämän kuvion 517 genotoksisuustutkimuksessa: todelliset laitteet tuottivat enemmän vaikutuksia kuin laboratorion CW-signaalit, kesto oli kriittinen tekijä ja 58 % DNA-vaurioista tapahtui ICNIRP-turvallisuusrajojen alapuolella.",
          "Jokaisessa null-tuloksen tutkimuksessa, jossa alaryhmäanalyysi suoritettiin, löydettiin positiivinen alaryhmä: Graham 1996 tunnisti 'matalan baseline-melatoniinin' alaryhmän, Lustenberger 2015 raportoi 'hämmästyttäviä yksilöiden välisiä eroja' ja [[ref:sousouri2025|Sousouri 2025]] osoitti vasteen vain T/C-kantajilla. Kokonaistason nollatulos peittää todellisia vaikutuksia herkissä alaryhmissä.",
          "Tutkimus A (talvi, pohjoinen leveysaste, AA-genotyypin koehenkilöt, korkea lab-ELF, WiFi-kodit) löytää positiivisen tuloksen. Tutkimus B (kesä, etelä, GG-genotyypin koehenkilöt, matala lab-ELF, EMF-vapaat kodit) löytää nollatuloksen. Molemmat ovat OIKEITA. Meta-analyysit raportoivat 'ristiriitaista näyttöä' koska ne eivät kontrolloi näitä neljää muuttujaa.",
          "Testattavissa ILMAN uutta dataa: retrospektiivinen analyysi 50–100 julkaistusta EMF-biotestitutkimuksesta, koodaten tutkimuksen kuukausi, laboratorion leveysaste, rakennusmateriaali ja koehenkilöiden tausta — logistinen regressio ennustaa positiivisen vs. nollatuloksen moderaattoreista.",
        ],
        boundary: "Neljän moderaattorin kehys on BERM:n synteesi (M-taso), nyt kvantitatiivisella validoinnilla: kolme moderaattoria saavuttaa tilastollisen merkitsevyyden (p<0,05) ja [[ref:weller2025_dna|Weller 2025]] (n=517 genotoksisuustutkimusta) vahvistaa kuvion itsenäisesti. Yksittäisillä moderaattoreilla on empiiristä tukea: vuodenaika (Halgamuge 2015, E-taso), genotyyppi ([[ref:sousouri2025|Sousouri 2025]], E-taso), ELF-priming (PMC4757866, E-taso). Retrospektiivinen metamoderaattoritesti (REPL-1) nostaisi tämän M-tasolta E-tasolle.",
      },
    ],
    closingTitle: "Rakentavia tapoja testata tutkimusohjelmaa",
    closingText:
      "Hyödyllisimmät kritiikit tarjoavat kilpailevan mittausmallin, lähdekorjauksen, riippumattomasti replikoidun kokeen tai paremman demografisen asetelman. Projektia tulee arvioida sen mukaan, kestävätkö rekisteröidyt lenkit nämä testit ja miten ne vertautuvat vaihtoehtoisiin selityksiin.",
    findingsLabel: "havaintoa",
    remainLabel: "jää",
    reclassifiedLabel: "uudelleenluokiteltu",
    internalRefinementLabel: "sisäinen tarkennus",
    summaryStats: `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} koskee nykyistä empiiristä BERM:ää · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} koskee L-BERM-teoriakerrosta · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} koskee korvattuja versioita · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} erottelevaa jatkotestiä tunnistettu`,
    findingsDistribution: "Havaintojakauma",
    remainNegativeLabel: "pysyy negatiivisena",
    testsComparison: "Erottelevien testien vertailu",
    testSvgLabel: "TESTI",
    consensusSvgLabel: "KONSENSUS",
    divergenceLabel: "ERO",
    angleDependentLabel: "Kulmariippuvainen",
    isotropicLabel: "Isotrooppinen",
    highLabel: "KORKEA",
    cohortStepLabel: "Kohorttiporas",
    noCohortStepLabel: "Ei kohorttiporasta",
    cryPredictsLabel: "CRY ennustaa järjestyksen",
    noPredictionLabel: "Ei ennustetta",
    consensusLabel: "Konsensus",
    protocolLabel: "Protokolla",
    versionTimeline: "Versioaikajana",
    abandonedLabel: "Hylätty",
    demotedLabel: "Alennettu",
    activeLabel: "Aktiivinen",
    currentLabel: "Nykyinen",
    nextLabel: "Seuraava",
    sentinelTitle: "Indikaattorilajit",
  },
  ja: {
    title: "批判と未解決の問題",
    subtitle:
      "すべての特定された否定的知見、未解決の問題、過去に反証されたバージョン — それぞれが実際に何に関するものかを示す。",
    introduction:
      "BERM v17は開放性を認識論的原則として扱う。以下の分類は、以前否定的と解釈された知見にBERM推論プロトコル（v1.0）を適用する。再分類は知見がBERMを支持することを意味しない — 元のテストが識別的でなかった、または対象とされたターゲットに対応しなかったことを意味する。主要分岐（経路B / RPM / コホート効果）は識別的テストによる経験的検証がまだ行われていない。",
    summaryLabel: "否定的知見のレビュー",
    activeTitle: "活発な問題（否定的なまま）",
    activeLead:
      "これらは有効である。2つはBERM v6–v9の反証されたメカニズム、1つはソリトン層の数学的障害、1つは文書整合性の不備、2つはLindgrenフレームワークの未解決の理論的問題である。",
    reclassifiedTitle: "再分類（モデル間を識別しない）",
    reclassifiedLead:
      "これらはそれぞれ反証として解釈された。プロトコルの下では、いずれもBERMとコンセンサスモデルを分離する予測をテストしていなかった。",
    refinementTitle: "内部改良（モデル修正につながった）",
    refinementLead:
      "これらは特定の定式化の真の失敗であり、それぞれが防御ではなく構造的修正を生み出した。",
    testsTitle: "まだ必要な識別的テスト",
    testsLead:
      "13の知見のいずれも主要分岐をテストしていない。以下の3つは経路B（RPM）をコンセンサスモデルから分離する。いずれも実施されていない。",
    tests: [
      {
        id: "D1",
        name: "方向依存性（細胞レベル）",
        berm: "RPM応答はB₀とB_extの間の角度に依存する（ラーモア共鳴、異方性超微細構造）。",
        consensus: "等方性応答：出力依存、方向依存ではない。",
        protocol: "CRY発現細胞、制御されたB₀方向、3角度 × 3電場レベル；エンドポイントROSまたはメラトニン産生。",
        cost: "約5,000〜15,000ユーロ · 細胞生物学研究室1室",
      },
      {
        id: "D2",
        name: "コホート段階仮説（人口学的）",
        berm: "4G時代（2012年以降）に生まれたコホートは、文化的変数を制御して2G時代コホートと異なるASFRプロファイルを示す。",
        consensus: "技術世代によるコホート段階なし。",
        protocol: "WPP ASFRデータ、年齢グループ分析、コホート出生年 vs. 技術世代、国固定効果。",
        cost: "0ユーロ（公開データ） · 約2週間 · 部分テスト可能、完全テスト2030年以降",
      },
      {
        id: "D3",
        name: "種階層（スピンコヒーレンス × 個体数減少）",
        berm: "CRYスピンコヒーレンス時間が種間の感受性順序を予測する：より長いコヒーレンス → より大きい感受性 → より速い減少。",
        consensus: "種間の順序に関する予測なし。",
        protocol: "CRYコヒーレンス時間の文献統合 × 個体数動態データ（ミツバチ、渡り鳥、イエスズメ、イヌ、ヒト）。",
        cost: "0ユーロ（文献） · 約1週間",
      },
    ],
    historyTitle: "バージョン履歴",
    historyHeaders: ["バージョン", "メカニズム", "ステータス", "放棄の理由"],
    history: [
      { version: "BERM 6-9", mechanism: "VGCC共鳴 94-183 GHz", status: "放棄", why: "物理的に不可能：タンパク質コンフォメーションダイナミクスに対して5桁速すぎる" },
      { version: "BERM 6-9", mechanism: "水共鳴 2.45 GHz", status: "放棄", why: "逆転した物理：吸収は回転減衰であり、増幅共鳴ではない" },
      { version: "BERM 6-9", mechanism: "ソリトン伝播", status: "放棄", why: "ゴースト障害：時間的Aに対してπ₂ = 0、空間的Aに対してゴーストエネルギー" },
      { version: "L-BERM", mechanism: "純粋幾何学によるVGCC", status: "降格", why: "δV_mは生物学的増幅器なしでは10¹⁷倍小さすぎる" },
      { version: "BERM < v6", mechanism: "EMFが人口転換全体を説明", status: "放棄", why: "EMF以前の低下はD項（文化的需要）によって駆動される" },
    ],
    questionsTitle: "研究課題と証拠の境界",
    objections: [
      {
        question: "環境EMF場は生物学的影響には弱すぎる",
        response: [
          "[[ref:vaziri2016|ヒトの目は単一光子を検出する。]]サメは0.5 µV/mの電場を検出する。[[ref:ritz2004|渡り鳥のコンパスは15 nTのRFノイズ]] — 地磁気バックグラウンドの0.03% — で妨害される。生物学は電磁感度の量子限界で作動する。",
          "26の規制承認デバイスカテゴリが、全EMスペクトルにわたって非熱的EMF生物学的効果を利用している。[[ref:tdcs_fda_depression_2025|tDCSは0.3–1.0 V/mで鬱を治療する]] — 都市環境で測定されるRF（0.67–1.51 V/m）と同じ桁。",
          "イオン強制振動メカニズム（[[ref:panagopoulos2025_ifo|Panagopoulos 2025]]）は、偏光したコヒーレント場に対する生物学的応答閾値10⁻⁵ V/mを実証する — 一般的な環境レベルの5桁下。",
          "2026年、[[ref:kim2026_cell_gene_switch|Kim et al.（Cell）]]はCyb5bをゲノムワイドCRISPRスクリーンで遺伝的に検証されたEMFセンサーとして同定した。",
          "2025年、[[ref:mallinson2025_electric_pollution|Mallinson et al.]]は人為的AC電場がミツバチの採餌を71%削減することを発見した（iScience / Cell Press）。",
        ],
        boundary: "強度論拠は経験的主張である。FDA承認とIFO閾値測定は経験的事実である。",
      },
      {
        question: "TTFieldsはIF効果が高強度でのみ機能することを証明する",
        response: [
          "TTFieldsは誘電泳動（DEP） — 100–300 V/mの電場強度を必要とする二次メカニズム — を使用する。環境IF曝露は根本的に異なるメカニズムで作動する：イオン強制振動（IFO-VGIC）。",
          "パルス型LEDドライバー場は、TTFieldsの純粋正弦波よりもワットあたり生物学的に活性である。",
          "TTFields臨床プログラムはIF周波数が細胞分裂を妨害することを検証する。しかし、妨害が始まる最小強度を定義するものではない。",
          "Neuhaus et al.（Nature 2020）はTTFieldsの周波数依存性ががん細胞と正常細胞で異なることを示した。LEDドライバーのスイッチング周波数（20–100 kHz）はこの正常細胞の感受性範囲にわたる。",
        ],
        boundary: "この区別は反証可能である：IFO効果が1 V/m以下で実証できなければ、環境IF経路はその主要メカニズムを失う。",
      },
      {
        question: "人口学的・社会的原因は期間TFR変化を説明できるか？",
        response: [
          "できる。教育、避妊、住宅、労働市場、パートナー形成、移住、政策、希望する家族サイズ、テンポ、ARTはすべて観察される出生率に影響する。",
          "V2はしたがってTFRの前にASFRをモデル化し、需要/機会、テンポ、ART/生産分娩を明示的に維持する。",
          "しかし：睡眠不足のみで、健康な若い男性に対する制御された実験で[[ref:leproult2011_testosterone_sleep|テストステロンが10–15%]]、[[ref:walker2017_why_we_sleep|精子数が29%]]低下する。",
        ],
        boundary: "国のトレンドだけでは生物学的原因を特定できない。集団推論には、マッチしたFieldState、エンドポイント、カップル、ASFRパネルと信頼できる競合モデルが必要。",
      },
      {
        question: "Lindgren物理学はヒトの生殖メカニズムを確立するか？",
        response: [
          "Lindgren 2025計量はBERMの理論前提である。RPMとの87.5%代数対応は構造比較であり、導出済みの幾何学–RPM演算子ではないため、CRY経路に直接的な幾何学基盤を与えない。",
          "各下流の生物学的リンクはそれぞれ独自の実験的検証を必要とする。",
        ],
        boundary: "理論的フレームワークは予測を生成する；予測は経験的にテストされる。各リンクはそれぞれ独自の測定された証拠を必要とする。",
      },
      {
        question: "生殖およびバリア研究は実際に何を示すか？",
        response: [
          "レジストリにはin vitroヒト精子エンドポイント、動物の血液精巣関門および卵巣研究、メカニズム的レドックス/タイトジャンクション研究などの限定的な知見が含まれる。",
          "それらのシステム、周波数、振幅、持続時間、エンドポイントは異なる。動物および細胞の結果を集団線量や国の予測に単純に変換することはできない。",
        ],
        boundary: "研究からノードへの記録は、登録されたルートの部分のみを支持する。",
      },
      {
        question: "モバイル契約やeDRXは物理的曝露経路を示せるか？",
        response: [
          "モバイル契約密度は全体的な電磁環境の複合プロキシである。現在のN = 163コホート結果は、記述的コホート分析のためにこの複合プロキシを使用する。",
          "eDRXはデバイスの受信/ページングスケジューリングメタデータであり、それ自体は既知のダウンリンクRF場シグネチャではない。",
        ],
        boundary: "プロキシタイミングと物理的線量測定は異なる質問に答え、異なるラベルを維持しなければならない。",
      },
      {
        question: "混合EMF研究と系統的レビューについて",
        response: [
          "エビデンスベースは不均一である。レビューは異なるシステムにわたって知見が存在することを確立できるが、その確実性評価と感度分析は報告する必要がある。",
          "[[ref:cordelli2024_who|WHO委託の生殖レビュー]]はいくつかの分析で有害な知見を報告したが、確実性の多くを低いまたは非常に低いと評価した。",
        ],
        boundary: "不確実性に対する正しい応答は、より良い測定と透明な研究の重み付けであり、より強い物語的主張ではない。",
      },
      {
        question: "化学物質、気候、疾病、生活様式、その他の曝露は関与しうるか？",
        response: [
          "はい。これらの曝露は生殖生物学に影響を与え、技術、都市化、社会経済的変化と共変する可能性がある。",
          "有用なテストは、もっともらしい共曝露を測定または設計し、代替因果モデルを比較し、それらが含まれたときに推論がどう変化するかを報告する。",
        ],
        boundary: "単一の国際パターンが一つの環境原因の支配を確立するものではない。V2は識別的データを通じて帰属を獲得しなければならない。",
      },
      {
        question: "デンマークとNHANESの研究はBMI非依存の低下を見出さなかった",
        response: [
          "この解釈はBMIを交絡因子（独立した原因）と仮定する。BERMの因果モデルはBMIを媒介変数として扱う：EMFはBMI増加とテストステロン低下を同時に引き起こす。BMI調整は媒介されたシグナルを除去する。",
          "[[ref:mazur2013|Mazur et al. 2013]]（n = 991、20年追跡）：体重を維持した男性でも20年間でテストステロンが117 ng/dL（19%）低下した。",
          "[[ref:santi2025|Santi et al. 2025]]（n = 1,064,891）は研究集団にBMIの時間的傾向がないにもかかわらず、テストステロンが有意に低下したことを発見した。",
          "[[ref:klimentidis2010|Klimentidis et al. 2010]]は、制御された食事の実験動物が数十年にわたって体重が増加したことを示した（p = 1.2×10⁻⁷）。",
        ],
        boundary: "媒介変数の解釈は、同時T・BMI測定を持つ縦断データセットでの正式な媒介分析によりテスト可能。",
      },
      {
        question: "モデルを構造から結果に移すには何が必要か？",
        response: [
          "測定準備完了FieldStateには、文書化された校正、B₀ベクトル、臓器移行、PSD、概日コンテキスト、位相/コヒーレンス、来歴が必要。",
          "校正はトレーニング期間のみで行い、独立した実験室追試と保留されたASFR/TFR期間が続く。",
        ],
        boundary: "それらの結合が存在するまで、v2は研究仕様と因果マップであり、校正された国別予測モデルではない。",
      },
      {
        question: "LEDライトはエネルギー効率が高く安全認証済み",
        response: [
          "LEDライトは電磁両立性（EMC）認証済み — 中間周波数放射の生物学的安全性の認証ではない。CISPR 15は生物学的システムではなくラジオ受信を保護するために設計された。",
          "どの規制機関もLEDドライバーの連続20–200 kHz場の生物学的影響を評価していない。",
          "[[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]]はLEDドライバーの近接場放射を直接測定した。EUの白熱灯禁止（2009–2012）は、約4億5千万人のゼロIF光源を連続IF光源に置き換えた。",
          "[[ref:ijrb2022_if_review|2022年のIJRBのIF-EMF動物研究の系統的レビュー]]は、この周波数帯が最小限の健康研究しか受けていないことを確認した。",
        ],
        boundary: "これは規制ギャップの論拠であり、健康主張ではない。",
      },
      {
        question: "用量反応関係がない",
        response: [
          "[[ref:adey1976_calcium_window|1976年以来文書化されているAdey-Blackmanカルシウムウィンドウ]]は、EMFの生物学的効果が線形用量反応に従わないことを示している。この「ウィンドウ効果」はICNIRPのアプローチが構造的に間違っていることを意味する。",
          "これは異なる強度を使用する追試研究が効果を見つけられない理由も説明する：ウィンドウの外でテストしている可能性がある。",
          "ウィンドウ現象は共鳴の物理学と一致する。",
        ],
        boundary: "ウィンドウ効果は経験的観察である。環境強度で生殖エンドポイントに対してウィンドウ依存の用量反応が実証できなければ、出生率との関連性は未確立。",
      },
      {
        question: "モデルは単にGDPを適合しているだけ",
        response: [
          "線形モデルではEMFとGDPは共線的（r = 0.87）であり、他方を制御した後はどちらも有意ではない。これは対称的な識別問題であり、EMFに対する証拠ではない。",
          "3つの構造的差異がEMFをGDPから区別する。電気へのアクセスは二値的閾値である。携帯電話（情報デバイス）は最も弱いEMFプロキシ（RMSE 1.053）。住宅電力が最良（単変量RMSE 0.533）。",
          "センチネル種は電場に反応する（[[ref:mallinson2025_electric_pollution|Mallinson 2025]]：ミツバチ-71%）がGDPには反応しない。",
        ],
        boundary: "横断分析ではEMFとGDPの間の因果方向を特定できない。識別的証拠はセンチネル種、自然実験、電気のない集団から得られる。",
      },
      {
        question: "電気アクセスは単なる開発プロキシ",
        response: [
          "電気アクセスは開発と相関するが、他の開発指標にはない特性を持つ：物理的閾値。IFO-VGIC活性化閾値（10⁻⁵ V/m）はすべての家庭用電化製品の使用距離で超過する。",
          "部分電化国では、国のTFRは電化人口（EMFに曝露、低TFR）と非電化人口（曝露なし、生物学的最大値~6.5に近いTFR）の混合である。",
          "二値閾値はテスト可能な予測を生成する：DHSマイクロデータは、電化世帯でより低いTFRを示すはずである。",
        ],
        boundary: "DHSマイクロデータが所得と教育の制御後に電化/非電化のTFR差を示さなければ、二値閾値の論拠は反証される。",
      },
      {
        question: "EHSは心因性 — ノセボが自己報告症状を説明する",
        response: [
          "[[ref:sousouri2025|Sousouri et al. 2025]]（NeuroImage, ETH Zurich）はCACNA1C遺伝子型判定を用いた二重盲検ランダム化比較試験を実施した。ノセボは二重盲検デザインで遺伝子型依存の神経生理学的変化を産むことはできない。",
          "これはEHSの問題を「自己報告者は何かを感じるか？」から「イオンチャネル遺伝子型はRFに対する測定可能な脳応答を予測するか？」に変える。",
          "[[ref:belpomme2022|Belpomme et al. 2022]]は約1,000人のEHS患者を客観的バイオマーカーで特性化した。",
        ],
        boundary: "ノセボ仮説はテスト可能な予測を行う：遺伝子型は二重盲検デザインで応答を予測すべきでない。[[ref:sousouri2025|Sousouri 2025]]はこの予測を反証した。",
      },
      {
        question: "メカニズムは非現実的",
        response: [
          "この論拠は50年間、非熱的EMFの知見すべてに適用されてきた — そして毎回間違っていた。",
          "1976年、[[ref:adey1976_calcium_window|Adey]]とBlackmanは特定の場の強度で脳組織からのカルシウム流出を文書化した。2026年、[[ref:kim2026_cell_gene_switch|Kim et al.（Cell）]]はリズミカルなカルシウム振動が遺伝子発現を駆動することを示した。",
          "1995年、[[ref:lai1995_dna_breaks|LaiとSingh]]は2450 MHz放射からDNA鎖切断を発見した。",
          "2026年、[[ref:kim2026_cell_gene_switch|Kim et al.のCell論文]]は物理学者[[ref:york2026_kim_commentary|Andrew York]]に「信じられないほど非現実的」と呼ばれた。",
          "パターンは一貫している：データは強力、メカニズムは未知、批評家は不可能性を宣言する。その後メカニズムが見つかる。",
          "BERMのχ(A)はLindgren 2025計量を動機とする検証可能な閉包仮説であり、外部場からイオンチャネルへの結合をまだ導出していない。光子センサーの類推は実験を動機づけるが、未解決のL2演算子や校正の代わりにはならない。",
        ],
        boundary: "Lindgrenの解釈は理論的であり、まだ独立的に検証されていない。経験的知見は理論的フレームワークとは独立に存在する。",
      },
      {
        question: "ブルーライトがLEDの健康影響のすべてを説明する",
        response: [
          "ブルーライトはメラトニンを抑制する — これは確立されている。しかし全体像ではない。",
          "[[ref:duraccio2019_blue_light|Duraccio et al.（2019）]]はブルーライトフィルタリンググラスが青少年の睡眠の質を有意に改善しなかったことを発見した。",
          "BERMはLEDランプが2つの生物学的に関連する出力を産むと提案する：ブルーライト（光学的）とIF放射（電磁的）。",
          "テスト可能な予測（SLEEP-1）：IF放射を遮断するファラデーシールドLEDランプは、シールドなしランプよりも少ない生物学的妨害を産むはずである。",
        ],
        boundary: "SLEEP-1予測は直接反証可能。ファラデーシールドLEDがシールドなしLEDと同じ睡眠妨害を産むなら、IF経路は主要メカニズムではない。",
      },
      {
        question: "なぜ経路Bは元の15%から25%を得るのか？",
        response: [
          "経路Bは元々15%が割り当てられた。2025年、[[ref:yap2025|Yapと同僚]]はCRY2がTRPC1とも相互作用し、カルシウムシグナリングを調節することを発見した。経路Bは2つの下流効果を包含する。",
          "TRPC1はTRPチャネルであり、VGCCではない。2つの経路は薬理学的に異なったまま。",
          "予測TRPC1-1はこれを直接テストする。",
        ],
        boundary: "重み調整は筋芽細胞での1つの研究（[[ref:yap2025|Yap 2025]]）に基づく。生殖腺組織での確認が必要。",
      },
      {
        question: "EMF効果が実在するなら、なぜ研究室は矛盾する結果を得るのか？",
        response: [
          "EMF研究は数十年にわたり矛盾する結果を産んできた。BERMは4つの制御されていないモデレーターを特定する：",
          "1. 季節：CRY磁気受容体感度は光依存的。直接実証済み（Halgamuge 2015）。",
          "2. 遺伝子型：CACNA1C rs1006737多型がCav1.2チャネル発現を調節する。[[ref:sousouri2025|Sousouri 2025]]が直接実証。",
          "3. 研究室ELFバックグラウンド：50/60 Hz電力網は8–10日の曝露後にVGCC発現を上方制御する。",
          "4. 被験者の夜間EMF：寝室のWi-Fiルーターの有無がCaMKII回復に影響する。",
          "3つのモデレーターが統計的に有意に研究結果を予測する。[[ref:weller2025_dna|Weller et al.（2025）]]は517の遺伝毒性研究でこのパターンを検証した。",
          "サブグループ分析が実施されたすべてのゼロ結果研究で陽性サブグループが見つかった。",
          "研究A（冬、高緯度、AA遺伝子型）は陽性結果を見出す。研究B（夏、低緯度、GG遺伝子型）はゼロ結果。両方とも正しい。",
          "新しいデータなしでテスト可能：50–100の発表済み研究の回顧的分析。",
        ],
        boundary: "4モデレーターフレームワークはBERMの統合であり、現在定量的検証がある。",
      },
    ],
    closingTitle: "プログラムをテストする建設的な方法",
    closingText:
      "最も有用な批判は、競合する測定モデル、ソース修正、独立に追試された実験、またはより良い人口学的デザインを提供する。",
    findingsLabel: "件の知見",
    remainLabel: "残存",
    reclassifiedLabel: "再分類",
    internalRefinementLabel: "内部改良",
    summaryStats: `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total}件が現行の経験的BERMに影響 · ${CLASSIFICATION_SUMMARY.affects_l_berm_only}件がL-BERM理論層に影響 · ${CLASSIFICATION_SUMMARY.affects_old_versions_only}件が旧バージョンに影響 · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed}件の識別的フォローアップテストが特定`,
    findingsDistribution: "知見の分布",
    remainNegativeLabel: "否定的なまま",
    testsComparison: "識別的テストの比較",
    testSvgLabel: "テスト",
    consensusSvgLabel: "コンセンサス",
    divergenceLabel: "分岐",
    angleDependentLabel: "角度依存",
    isotropicLabel: "等方性",
    highLabel: "高",
    cohortStepLabel: "コホート段階",
    noCohortStepLabel: "段階なし",
    cryPredictsLabel: "CRYが予測",
    noPredictionLabel: "予測なし",
    consensusLabel: "コンセンサス",
    protocolLabel: "プロトコル",
    versionTimeline: "バージョンタイムライン",
    abandonedLabel: "放棄",
    demotedLabel: "降格",
    activeLabel: "アクティブ",
    currentLabel: "現行",
    nextLabel: "次へ",
    sentinelTitle: "センチネル種",
  },
  fr: {
    title: "Critiques et problèmes ouverts",
    subtitle:
      "Chaque résultat négatif identifié, problème ouvert et version antérieure falsifiée — et ce que chacun concerne réellement.",
    introduction:
      "BERM v17 traite l’ouverture comme un principe épistémologique. La classification ci-dessous applique le protocole de raisonnement BERM (v1.0) aux résultats précédemment considérés comme négatifs. La reclassification ne signifie pas qu’un résultat soutient BERM : elle signifie que le test original n’était pas discriminant, ou ne portait pas sur la cible visée. La branche principale (voie B / RPM / effet de cohorte) reste empiriquement non testée par des tests discriminants.",
    summaryLabel: "REVUE DES RÉSULTATS NÉGATIFS",
    activeTitle: "Problèmes actifs (restent négatifs)",
    activeLead:
      "Ceux-ci persistent. Deux sont des mécanismes falsifiés de BERM v6–v9, un est une obstruction mathématique dans la couche de solitons, un est un échec d’intégrité documentaire, et deux sont des problèmes théoriques ouverts dans le cadre de Lindgren.",
    reclassifiedTitle: "Reclassifiés (ne discriminent pas entre les modèles)",
    reclassifiedLead:
      "Chacun a été lu comme une falsification. Selon le protocole, aucun n’a testé une prédiction qui sépare BERM du modèle de consensus.",
    refinementTitle: "Affinements internes (ont conduit à des corrections du modèle)",
    refinementLead:
      "Il s’agissait d’échecs véritables d’une formulation spécifique, et chacun a produit une correction structurelle plutôt qu’une défense.",
    testsTitle: "Tests discriminants encore nécessaires",
    testsLead:
      "Aucun des 13 résultats n’a testé la branche principale. Ces trois sépareraient la voie B (RPM) du modèle de consensus. Aucun n’a été réalisé.",
    tests: [
      {
        id: "D1",
        name: "Dépendance directionnelle (niveau cellulaire)",
        berm: "La réponse RPM dépend de l’angle entre B₀ et B_ext (résonance de Larmor, hyperfin anisotrope).",
        consensus: "Réponse isotrope : dépendante de la puissance, pas de la direction.",
        protocol: "Cellules exprimant CRY, direction B₀ contrôlée, 3 angles × 3 niveaux de champ ; critère ROS ou production de mélatonine.",
        cost: "~5 000–15 000 € · un laboratoire de biologie cellulaire",
      },
      {
        id: "D2",
        name: "Hypothèse de l’échelon de cohorte (démographique)",
        berm: "Les cohortes nées à l’ère 4G (2012+) montrent un profil ASFR différent des cohortes de l’ère 2G.",
        consensus: "Pas d’échelon de cohorte par génération technologique.",
        protocol: "Données ASFR WPP, analyse par groupe d’âge, année de naissance vs. génération technologique, effets fixes par pays.",
        cost: "0 € (données publiques) · ~2 semaines · test partiel maintenant, test complet 2030+",
      },
      {
        id: "D3",
        name: "Hiérarchie des espèces (cohérence de spin × déclin)",
        berm: "Le temps de cohérence du spin CRY prédit l’ordre de sensibilité entre espèces.",
        consensus: "Pas de prédiction sur l’ordre entre espèces.",
        protocol: "Synthèse de la littérature sur les temps de cohérence CRY × données démographiques (abeille, oiseau migrateur, moineau, chien, humain).",
        cost: "0 € (littérature) · ~1 semaine",
      },
    ],
    historyTitle: "Historique des versions",
    historyHeaders: ["Version", "Mécanisme", "Statut", "Raison de l’abandon"],
    history: [
      { version: "BERM 6-9", mechanism: "Résonance VGCC 94–183 GHz", status: "Abandonné", why: "Physiquement impossible : cinq ordres de grandeur trop rapide pour la dynamique conformationnelle des protéines" },
      { version: "BERM 6-9", mechanism: "Résonance de l’eau 2,45 GHz", status: "Abandonné", why: "Physique inversée : l’absorption est un amortissement rotationnel, pas une résonance amplificatrice" },
      { version: "BERM 6-9", mechanism: "Propagation de solitons", status: "Abandonné", why: "Obstruction fantôme : π₂ = 0 pour A de type temps, énergie fantôme pour A de type espace" },
      { version: "L-BERM", mechanism: "VGCC par géométrie pure", status: "Rétrogradé", why: "δV_m est 10¹⁷× trop petit sans amplificateurs biologiques" },
      { version: "BERM < v6", mechanism: "L’EMF explique toute la transition démographique", status: "Abandonné", why: "Le déclin pré-EMF est piloté par le terme D (demande culturelle)" },
    ],
    questionsTitle: "Questions de recherche et limites des preuves",
    objections: [
      {
        question: "Les champs EMF environnementaux sont trop faibles pour des effets biologiques",
        response: [
          "[[ref:vaziri2016|L’œil humain détecte des photons uniques.]] Les requins détectent des champs électriques de 0,5 µV/m. [[ref:ritz2004|Le compas des oiseaux migrateurs est perturbé par un bruit RF de 15 nT.]] La biologie opère à la limite quantique de la sensibilité électromagnétique.",
          "Vingt-six catégories de dispositifs approuvés exploitent des effets biologiques EMF non thermiques. [[ref:tdcs_fda_depression_2025|La tDCS traite la dépression à 0,3–1,0 V/m]] — le même ordre de grandeur que le RF ambiant urbain (0,67–1,51 V/m).",
          "Le mécanisme d’oscillation forcée des ions ([[ref:panagopoulos2025_ifo|Panagopoulos 2025]]) démontre un seuil de réponse biologique de 10⁻⁵ V/m pour les champs polarisés et cohérents.",
          "En 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell)]] ont identifié Cyb5b comme capteur EMF génétiquement vérifié par criblage CRISPR.",
          "En 2025, [[ref:mallinson2025_electric_pollution|Mallinson et al.]] ont trouvé que les champs électriques AC anthropiques réduisent le butinage des abeilles de 71 % (iScience / Cell Press).",
        ],
        boundary: "L’argument d’intensité est une affirmation empirique. Les approbations FDA et les mesures de seuil IFO sont des faits empiriques.",
      },
      {
        question: "TTFields prouve que les effets IF ne fonctionnent qu’à haute intensité",
        response: [
          "TTFields utilise la diélectrophorèse (DEP) — un mécanisme quadratique nécessitant 100–300 V/m. L’exposition IF environnementale opère via l’oscillation forcée des ions (IFO-VGIC).",
          "Les champs de pilotes LED pulsés sont plus biologiquement actifs par watt que l’onde sinusoïdale pure de TTFields.",
          "Le programme clinique TTFields valide que les fréquences IF perturbent la division cellulaire, mais ne définit pas l’intensité minimale.",
          "Neuhaus et al. (Nature 2020) ont montré que les fréquences de commutation des pilotes LED (20–100 kHz) couvrent la plage de sensibilité des cellules normales.",
        ],
        boundary: "Cette distinction est falsifiable : si les effets IFO ne peuvent être démontrés en dessous de 1 V/m, le canal IF environnemental perd son mécanisme principal.",
      },
      {
        question: "Les causes démographiques et sociales peuvent-elles expliquer le changement du TFR ?",
        response: [
          "Oui. L’éducation, la contraception, le logement, les marchés du travail, la formation de couples, la migration, la politique, la taille de famille souhaitée, le tempo et la PMA affectent la fécondité observée.",
          "V2 modélise donc l’ASFR avant le TFR et garde la demande/opportunité, le tempo et la PMA explicites.",
          "Cependant : la privation de sommeil seule réduit [[ref:leproult2011_testosterone_sleep|la testostérone de 10–15 %]] et [[ref:walker2017_why_we_sleep|le nombre de spermatozoïdes de 29 %]] dans des expériences contrôlées.",
        ],
        boundary: "Une tendance nationale seule ne peut pas identifier une cause biologique.",
      },
      {
        question: "La physique de Lindgren établit-elle un mécanisme reproductif humain ?",
        response: [
          "La métrique de Lindgren (2025) est la prémisse théorique de BERM. La correspondance algébrique de 87,5 % avec RPM est une comparaison structurelle, non un opérateur géométrie–RPM dérivé ; elle ne donne donc pas de fondement géométrique direct à la voie CRY.",
          "Chaque lien biologique en aval nécessite sa propre validation expérimentale.",
        ],
        boundary: "Le cadre théorique génère des prédictions ; les prédictions sont testées empiriquement.",
      },
      {
        question: "Que montrent réellement les études reproductives et de barrière ?",
        response: [
          "Le registre inclut des résultats délimités tels que des critères de spermatozoïdes humains in vitro, des études animales de la barrière hémato-testiculaire et ovariennes.",
          "Leurs systèmes, fréquences, amplitudes, durées et critères diffèrent.",
        ],
        boundary: "Un enregistrement étude-nœud soutient uniquement la partie enregistrée de la route.",
      },
      {
        question: "Les abonnements mobiles ou eDRX peuvent-ils montrer une voie d’exposition physique ?",
        response: [
          "La densité d’abonnements mobiles est un proxy composite pour l’environnement électromagnétique global.",
          "De même, eDRX sont des métadonnées de programmation de l’appareil, pas en soi une signature de champ RF connue.",
        ],
        boundary: "Le chronométrage par proxy et la dosimétrie physique répondent à des questions différentes.",
      },
      {
        question: "Qu’en est-il de la recherche EMF mixte et des revues systématiques ?",
        response: [
          "La base de preuves est hétérogène. Les revues peuvent établir que des résultats existent, mais leurs évaluations de certitude doivent être rapportées.",
          "Par exemple, [[ref:cordelli2024_who|la revue reproductive commandée par l’OMS]] a rapporté des résultats mais a noté une certitude faible ou très faible.",
        ],
        boundary: "La bonne réponse à l’incertitude est une meilleure mesure et une pondération transparente des études.",
      },
      {
        question: "Les produits chimiques, le climat, les maladies ou le mode de vie pourraient-ils être impliqués ?",
        response: [
          "Oui. Ces expositions peuvent affecter la biologie reproductive et co-varier avec la technologie, l’urbanisation et le changement socio-économique.",
          "Un test utile mesure les co-expositions plausibles, compare les modèles causaux alternatifs et rapporte comment l’inférence change.",
        ],
        boundary: "Aucun schéma transnational unique n’établit la dominance d’une cause environnementale.",
      },
      {
        question: "Les études danoises et NHANES n’ont pas trouvé de déclin indépendant du BMI",
        response: [
          "Cette interprétation suppose que le BMI est un facteur de confusion. Le modèle causal de BERM traite le BMI comme un médiateur. L’ajustement du BMI supprime alors le signal médié.",
          "[[ref:mazur2013|Mazur et al. 2013]] : les hommes qui ont maintenu leur poids ont perdu 117 ng/dL (19 %) de testostérone sur 20 ans.",
          "[[ref:santi2025|Santi et al. 2025]] (n = 1 064 891) : pas de tendance temporelle du BMI, mais la testostérone a décliné significativement.",
          "[[ref:klimentidis2010|Klimentidis et al. 2010]] : des animaux de laboratoire sous régimes contrôlés ont pris du poids (p = 1,2×10⁻⁷).",
        ],
        boundary: "L’interprétation du médiateur est testable par analyse de médiation formelle.",
      },
      {
        question: "Qu’est-ce qui ferait passer le modèle de la structure au résultat ?",
        response: [
          "Un FieldState prêt pour la mesure nécessite un étalonnage documenté, un vecteur B₀, un transfert d’organe, un PSD, un contexte circadien, une phase/cohérence et une provenance.",
          "L’étalonnage doit utiliser une période d’entraînement uniquement, suivie d’une réplication de laboratoire indépendante.",
        ],
        boundary: "Tant que ces jonctions n’existent pas, v2 est une spécification de recherche, pas un modèle de prévision calibré.",
      },
      {
        question: "Les lampes LED sont économes en énergie et certifiées sûres",
        response: [
          "Les lampes LED sont certifiées pour la compatibilité électromagnétique (CEM), pas pour la sécurité biologique de leurs émissions à fréquence intermédiaire. CISPR 15 protège la réception radio, pas les systèmes biologiques.",
          "Aucun organisme réglementaire n’a évalué les effets biologiques des champs continus 20–200 kHz des pilotes LED.",
          "[[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]] a mesuré les émissions en champ proche des pilotes LED. L’interdiction des lampes à incandescence de l’UE a remplacé des sources à IF nulle par des sources IF continues pour environ 450 millions de personnes.",
          "[[ref:ijrb2022_if_review|Une revue systématique IJRB 2022]] a confirmé que cette bande de fréquences a reçu une recherche sanitaire minimale.",
        ],
        boundary: "C’est un argument de lacune réglementaire, pas une affirmation sanitaire.",
      },
      {
        question: "Il n’y a pas de relation dose-réponse",
        response: [
          "[[ref:adey1976_calcium_window|La fenêtre calcique d’Adey-Blackman, documentée depuis 1976]], montre que les effets biologiques EMF ne suivent pas une dose-réponse linéaire. L’approche ICNIRP est structurellement erronée.",
          "Cela explique aussi pourquoi les études de réplication utilisant des intensités différentes peuvent ne pas trouver d’effets.",
          "Le phénomène de fenêtre est cohérent avec la physique de la résonance.",
        ],
        boundary: "L’effet de fenêtre est une observation empirique. Si une dose-réponse dépendante de la fenêtre ne peut pas être démontrée pour les critères reproductifs, la pertinence pour la fertilité n’est pas établie.",
      },
      {
        question: "Le modèle ne fait qu’ajuster le PIB",
        response: [
          "Dans les modèles linéaires, EMF et PIB sont colinéaires (r = 0,87). C’est un problème d’identification symétrique, pas une preuve contre l’EMF.",
          "Trois différences structurelles distinguent l’EMF du PIB : le seuil binaire de l’accès à l’électricité, le mobile est le proxy le plus faible (RMSE 1,053), l’électricité résidentielle est le meilleur (RMSE univarié 0,533).",
          "Les espèces sentinelles répondent aux champs ([[ref:mallinson2025_electric_pollution|Mallinson 2025]] : abeilles −71 %) mais pas au PIB.",
        ],
        boundary: "L’analyse transversale ne peut pas identifier la direction causale.",
      },
      {
        question: "L’accès à l’électricité n’est qu’un proxy de développement",
        response: [
          "L’accès à l’électricité a une propriété unique : un seuil physique. Le seuil d’activation IFO-VGIC (10⁻⁵ V/m) est dépassé par chaque appareil ménager à distance d’utilisation.",
          "Dans les pays partiellement électrifiés, le TFR national est un mélange de la population électrifiée (exposée, TFR bas) et non électrifiée (non exposée, TFR proche du maximum biologique ~6,5).",
          "Les micro-données DHS devraient montrer un TFR plus bas dans les ménages électrifiés.",
        ],
        boundary: "Si les micro-données DHS ne montrent pas de différence de TFR après contrôle du revenu et de l’éducation, l’argument du seuil binaire est falsifié.",
      },
      {
        question: "L’EHS est psychosomatique — le nocebo explique les symptômes auto-déclarés",
        response: [
          "[[ref:sousouri2025|Sousouri et al. 2025]] (NeuroImage, ETH Zürich) a mené un essai randomisé en double aveugle avec génotypage CACNA1C. Le nocebo ne peut pas produire des changements neurophysiologiques dépendants du génotype en double aveugle.",
          "Cela transforme la question de « les auto-déclarants ressentent-ils quelque chose ? » à « le génotype du canal ionique prédit-il une réponse cérébrale mesurable ? ».",
          "[[ref:belpomme2022|Belpomme et al. 2022]] a caractérisé environ 1 000 patients EHS avec des biomarqueurs objectifs.",
        ],
        boundary: "L’hypothèse nocebo fait une prédiction testable : le génotype ne devrait pas prédire la réponse en double aveugle. [[ref:sousouri2025|Sousouri 2025]] a falsifié cette prédiction.",
      },
      {
        question: "Le mécanisme est invraisemblable",
        response: [
          "Cet argument a été appliqué à chaque résultat EMF non thermique pendant 50 ans — et il a eu tort à chaque fois.",
          "En 1976, [[ref:adey1976_calcium_window|Adey]] et Blackman ont documenté l’efflux calcique. En 2026, [[ref:kim2026_cell_gene_switch|Kim et al. (Cell)]] ont montré que les oscillations calciques rythmiques pilotent l’expression génique.",
          "En 1995, [[ref:lai1995_dna_breaks|Lai et Singh]] ont trouvé des cassures de brins d’ADN.",
          "En 2026, [[ref:kim2026_cell_gene_switch|l’article Cell de Kim et al.]] a été qualifié d’« incroyablement invraisemblable » par le physicien [[ref:york2026_kim_commentary|Andrew York]].",
          "Le schéma est cohérent : les données sont fortes, le mécanisme est inconnu, les critiques déclarent l’impossibilité. Puis le mécanisme est trouvé.",
          "BERM propose une fermeture χ motivée par la métrique de Lindgren, mais elle ne démontre pas une sensibilité quantique des canaux ioniques. Cette analogie motive des expériences ; l'opérateur L2 et son calibrage restent ouverts.",
        ],
        boundary: "L’interprétation de Lindgren est théorique et pas encore validée indépendamment. Les résultats empiriques persistent indépendamment du cadre théorique.",
      },
      {
        question: "La lumière bleue explique tous les effets sanitaires des LED",
        response: [
          "La lumière bleue supprime la mélatonine — c’est établi. Mais ce n’est pas toute l’histoire.",
          "[[ref:duraccio2019_blue_light|Duraccio et al. (2019)]] : les lunettes filtrant la lumière bleue n’ont pas significativement amélioré la qualité du sommeil des adolescents.",
          "BERM propose que les lampes LED produisent deux sorties biologiquement pertinentes : la lumière bleue et les émissions IF.",
          "Prédiction testable (SLEEP-1) : une lampe LED blindée Faraday devrait produire moins de perturbation biologique.",
        ],
        boundary: "La prédiction SLEEP-1 est directement falsifiable.",
      },
      {
        question: "Pourquoi la voie B obtient-elle 25 % alors qu’elle était initialement à 15 % ?",
        response: [
          "La voie B était initialement à 15 %. En 2025, [[ref:yap2025|Yap et al.]] ont découvert que CRY2 interagit aussi avec TRPC1, modulant la signalisation calcique.",
          "TRPC1 est un canal TRP, pas un VGCC. Les deux voies restent pharmacologiquement distinctes.",
          "La prédiction TRPC1-1 teste directement les contributions relatives.",
        ],
        boundary: "L’ajustement du poids est basé sur une seule étude ([[ref:yap2025|Yap 2025]]) dans les myoblastes.",
      },
      {
        question: "Si les effets EMF sont réels, pourquoi les laboratoires obtiennent-ils des résultats contradictoires ?",
        response: [
          "La recherche EMF a produit des résultats contradictoires pendant des décennies. BERM identifie quatre modérateurs non contrôlés :",
          "1. Saison : la sensibilité du magnétorécepteur CRY est lumière-dépendante. Démontré directement chez les veaux (Halgamuge 2015).",
          "2. Génotype : le polymorphisme CACNA1C rs1006737 régule l’expression Cav1.2. [[ref:sousouri2025|Sousouri 2025]] l’a démontré directement.",
          "3. Fond ELF du laboratoire : le réseau 50/60 Hz régule à la hausse l’expression VGCC après 8–10 jours.",
          "4. EMF nocturne des sujets : un routeur Wi-Fi dans la chambre affecte la récupération CaMKII.",
          "Trois modérateurs prédisent les résultats avec significativité statistique. [[ref:weller2025_dna|Weller et al. (2025)]] a validé ce schéma dans 517 études de génotoxicité.",
          "Dans chaque étude à résultat nul où une analyse de sous-groupe a été effectuée, un sous-groupe positif a été trouvé.",
          "L’étude A (hiver, haute latitude, génotype AA) trouve un résultat positif. L’étude B (été, basse latitude, génotype GG) trouve un résultat nul. Les deux sont correctes.",
          "Testable sans nouvelles données : analyse rétrospective de 50–100 études publiées.",
        ],
        boundary: "Le cadre des quatre modérateurs est la synthèse de BERM avec désormais une validation quantitative.",
      },
    ],
    closingTitle: "Façons constructives de tester le programme",
    closingText:
      "Les critiques les plus utiles fournissent un modèle de mesure concurrent, une correction de source, une expérience indépendamment répliquée ou un meilleur design démographique.",
    findingsLabel: "résultats",
    remainLabel: "restent",
    reclassifiedLabel: "reclassifiés",
    internalRefinementLabel: "affinement interne",
    summaryStats: `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} affectent le BERM empirique actuel · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} affectent la couche théorique L-BERM · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} affectent des versions obsolètes · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} tests discriminants identifiés`,
    findingsDistribution: "Distribution des résultats",
    remainNegativeLabel: "restent négatifs",
    testsComparison: "Comparaison des tests discriminants",
    testSvgLabel: "TEST",
    consensusSvgLabel: "CONSENSUS",
    divergenceLabel: "DIVERGENCE",
    angleDependentLabel: "Angle-dépendant",
    isotropicLabel: "Isotrope",
    highLabel: "ÉLEVÉ",
    cohortStepLabel: "Échelon de cohorte",
    noCohortStepLabel: "Pas d’échelon",
    cryPredictsLabel: "CRY prédit l’ordre",
    noPredictionLabel: "Pas de prédiction",
    consensusLabel: "Consensus",
    protocolLabel: "Protocole",
    versionTimeline: "Chronologie des versions",
    abandonedLabel: "Abandonné",
    demotedLabel: "Rétrogradé",
    activeLabel: "Actif",
    currentLabel: "Actuel",
    nextLabel: "Suivant",
    sentinelTitle: "Espèces sentinelles",
  },
  ko: {
    title: "비판과 미해결 문제",
    subtitle:
      "모든 식별된 부정적 발견, 미해결 문제 및 이전에 반증된 버전 — 그리고 각각이 실제로 무엇에 관한 것인지.",
    introduction:
      "BERM v17은 개방성을 인식론적 원칙으로 취급한다. 아래 분류는 이전에 부정적으로 해석된 발견에 BERM 추론 프로토콜(v1.0)을 적용한다. 재분류는 발견이 BERM을 지지한다는 의미가 아니다 — 원래 테스트가 식별적이지 않았거나, 대상으로 여겨진 목표에 해당하지 않았음을 의미한다. 주요 분기(경로 B / RPM / 코호트 효과)는 식별적 테스트에 의한 경험적 검증이 아직 이루어지지 않았다.",
    summaryLabel: "부정적 발견 검토",
    activeTitle: "활성 문제 (부정적으로 유지)",
    activeLead:
      "이것들은 유효하다. 두 개는 BERM v6–v9의 반증된 메커니즘, 하나는 솔리톤 층의 수학적 장애, 하나는 문서 무결성 실패, 두 개는 Lindgren 프레임워크의 미해결 이론적 문제이다.",
    reclassifiedTitle: "재분류됨 (모델 간 식별 불가)",
    reclassifiedLead:
      "이것들 각각은 반증으로 해석되었다. 프로토콜에 따르면, 어느 것도 BERM과 합의 모델을 분리하는 예측을 테스트하지 않았다.",
    refinementTitle: "내부 개선 (모델 수정으로 이어짐)",
    refinementLead:
      "이것들은 특정 공식의 진정한 실패였으며, 각각이 방어가 아닌 구조적 수정을 산출했다.",
    testsTitle: "아직 필요한 식별적 테스트",
    testsLead:
      "13개의 발견 중 어느 것도 주요 분기를 테스트하지 않았다. 이 세 가지가 경로 B(RPM)를 합의 모델로부터 분리할 것이다. 어느 것도 수행되지 않았다.",
    tests: [
      {
        id: "D1",
        name: "방향 의존성 (세포 수준)",
        berm: "RPM 반응은 B₀와 B_ext 사이의 각도에 의존한다 (라모르 공명, 비등방성 초미세 구조).",
        consensus: "등방성 반응: 출력 의존적, 방향 의존적이지 않음.",
        protocol: "CRY 발현 세포, 제어된 B₀ 방향, 3각도 × 3 전장 수준; 종료점 ROS 또는 멜라토닌 생산.",
        cost: "약 5,000–15,000유로 · 세포생물학 실험실 1곳",
      },
      {
        id: "D2",
        name: "코호트 단계 가설 (인구학적)",
        berm: "4G 시대(2012+) 출생 코호트는 문화적 변수를 통제하여 2G 시대 코호트와 다른 ASFR 프로파일을 보인다.",
        consensus: "기술 세대별 코호트 단계 없음.",
        protocol: "WPP ASFR 데이터, 연령 그룹 분석, 코호트 출생연도 vs. 기술 세대, 국가 고정 효과.",
        cost: "0유로 (공개 데이터) · 약 2주 · 부분 테스트 가능, 완전 테스트 2030+",
      },
      {
        id: "D3",
        name: "종 위계 (스핀 코히어런스 × 개체수 감소)",
        berm: "CRY 스핀 코히어런스 시간이 종간 감수성 순서를 예측한다.",
        consensus: "종간 순서에 대한 예측 없음.",
        protocol: "CRY 코히어런스 시간의 문헌 종합 × 개체수 추세 데이터 (꽀벌, 철새, 참새, 개, 인간).",
        cost: "0유로 (문헌) · 약 1주",
      },
    ],
    historyTitle: "버전 이력",
    historyHeaders: ["버전", "메커니즘", "상태", "폐기 이유"],
    history: [
      { version: "BERM 6-9", mechanism: "VGCC 공명 94–183 GHz", status: "폐기", why: "물리적으로 불가능: 단백질 구조 역학에 대해 5자릿수 너무 빠름" },
      { version: "BERM 6-9", mechanism: "물 공명 2.45 GHz", status: "폐기", why: "역전된 물리학: 흡수는 회전 감쇠이지 증폭 공명이 아님" },
      { version: "BERM 6-9", mechanism: "솔리톤 전파", status: "폐기", why: "고스트 장애: 시간형 A에 대해 π₂ = 0, 공간형 A에 대해 고스트 에너지" },
      { version: "L-BERM", mechanism: "순수 기하학에 의한 VGCC", status: "강등", why: "δV_m은 생물학적 증폭기 없이 10¹⁷배 너무 작음" },
      { version: "BERM < v6", mechanism: "EMF가 전체 인구전환을 설명", status: "폐기", why: "EMF 이전 감소는 D항(문화적 수요)에 의해 주도됨" },
    ],
    questionsTitle: "연구 질문 및 증거 경계",
    objections: [
      {
        question: "환경 EMF 필드는 생물학적 효과에 너무 약하다",
        response: [
          "[[ref:vaziri2016|인간의 눈은 단일 광자를 감지한다.]] 상어는 0.5 µV/m 전기장을 감지한다. [[ref:ritz2004|철새의 나침반은 15 nT RF 노이즈에 의해 교란된다.]] 생물학은 전자기 감도의 양자 한계에서 작동한다.",
          "26개의 규제 승인 장치 범주가 비열적 EMF 생물학적 효과를 활용한다. [[ref:tdcs_fda_depression_2025|tDCS는 0.3–1.0 V/m에서 우울증을 치료한다]] — 도시 환경 RF와 같은 자릿수.",
          "이온 강제 진동 메커니즘([[ref:panagopoulos2025_ifo|Panagopoulos 2025]])은 10⁻⁵ V/m의 생물학적 반응 임계값을 입증한다.",
          "2026년, [[ref:kim2026_cell_gene_switch|Kim et al.(Cell)]]은 게놈 전체 CRISPR 스크리닝을 통해 Cyb5b를 EMF 센서로 식별했다.",
          "2025년, [[ref:mallinson2025_electric_pollution|Mallinson et al.]]은 인위적 AC 전기장이 꽀벌 채집을 71% 감소시킨다는 것을 발견했다.",
        ],
        boundary: "강도 논거는 경험적 주장이다. FDA 승인과 IFO 임계값 측정은 경험적 사실이다.",
      },
      {
        question: "TTFields는 IF 효과가 고강도에서만 작동함을 증명한다",
        response: [
          "TTFields는 유전영동(DEP)을 사용한다 — 100–300 V/m을 필요로 하는 이차적 메커니즘. 환경 IF 노출은 이온 강제 진동(IFO-VGIC)으로 작동한다.",
          "펌스형 LED 드라이버 필드는 TTFields의 순수 정현파보다 와트당 더 생물학적으로 활성이다.",
          "TTFields 임상 프로그램은 IF 주파수가 세포 분열을 방해함을 검증한다. 그러나 방해가 시작되는 최소 강도를 정의하지 않는다.",
          "Neuhaus et al.(Nature 2020)은 LED 드라이버 스위칭 주파수(20–100 kHz)가 정상세포 감수성 범위에 걸친다는 것을 보여주었다.",
        ],
        boundary: "이 구별은 반증 가능하다: IFO 효과가 1 V/m 미만에서 입증될 수 없으면, 환경 IF 경로는 주요 메커니즘을 잃는다.",
      },
      {
        question: "인구학적 및 사회적 원인이 기간 TFR 변화를 설명할 수 있는가?",
        response: [
          "가능하다. 교육, 피임, 주거, 노동시장, 파트너 형성, 이주, 정책, 희망 가족 크기, 템포, ART 모두 관찰된 출산율에 영향을 미친다.",
          "V2는 따라서 TFR 전에 ASFR을 모델링하고 수요/기회, 템포, ART/생아 출산을 명시적으로 유지한다.",
          "그러나: 수면 부족만으로도 건강한 젖은 남성에서 [[ref:leproult2011_testosterone_sleep|테스토스테론이 10–15%]], [[ref:walker2017_why_we_sleep|정자 수가 29%]] 감소한다.",
        ],
        boundary: "국가 추세만으로는 생물학적 원인을 식별할 수 없다.",
      },
      {
        question: "Lindgren 물리학은 인간 생식 메커니즘을 확립하는가?",
        response: [
          "Lindgren 2025 계량은 BERM의 이론 전제다. RPM과의 87.5% 대수적 대응은 구조 비교이지 도출된 기하학–RPM 연산자가 아니므로 CRY 경로에 직접 기하학 기반을 주지 않는다.",
          "각 하류 생물학적 링크는 자체 실험적 검증이 필요하다.",
        ],
        boundary: "이론적 프레임워크는 예측을 생성한다; 예측은 경험적으로 테스트된다.",
      },
      {
        question: "생식 및 장벽 연구는 실제로 무엇을 보여주는가?",
        response: [
          "레지스트리에는 in vitro 인간 정자 종료점, 동물 혈액-고환 장벽 및 난소 연구 등의 한정된 발견이 포함된다.",
          "그들의 시스템, 주파수, 진폭, 지속시간, 종료점은 다르다.",
        ],
        boundary: "연구-노드 기록은 등록된 경로 부분만 지원한다.",
      },
      {
        question: "모바일 가입이나 eDRX가 물리적 노출 경로를 보여줄 수 있는가?",
        response: [
          "모바일 가입 밀도는 전체 전자기 환경의 복합 프록시이다.",
          "eDRX는 장치 수신/페이징 스케줄링 메타데이터이며, 알려진 다운링크 RF 필드 시그니처가 아니다.",
        ],
        boundary: "프록시 타이밍과 물리적 선량측정은 다른 질문에 답한다.",
      },
      {
        question: "혼합 EMF 연구와 체계적 검토는?",
        response: [
          "증거 기반은 이질적이다. 검토는 다양한 시스템에 걸쳐 발견이 존재함을 확립할 수 있지만, 확실성 평가와 민감도 분석은 보고되어야 한다.",
          "[[ref:cordelli2024_who|WHO 위탁 생식 검토]]는 여러 분석에서 유해 발견을 보고했지만 확실성을 낮음 또는 매우 낮음으로 평가했다.",
        ],
        boundary: "불확실성에 대한 올바른 대응은 더 나은 측정과 투명한 연구 가중치이다.",
      },
      {
        question: "화학물질, 기후, 질병, 생활방식 또는 기타 노출이 관련될 수 있는가?",
        response: [
          "그렇다. 이러한 노출은 생식 생물학에 영향을 미치고 기술, 도시화, 사회경제적 변화와 공변할 수 있다.",
          "유용한 테스트는 타당한 공동 노출을 측정하거나 설계하고, 대안적 인과 모델을 비교한다.",
        ],
        boundary: "단일 국가 간 패턴이 하나의 환경 원인의 지배를 확립하지 않는다.",
      },
      {
        question: "덴마크와 NHANES 연구는 BMI 독립적 감소를 발견하지 못했다",
        response: [
          "이 해석은 BMI를 교란 요인으로 가정한다. BERM의 인과 모델은 BMI를 매개 변수로 취급한다.",
          "[[ref:mazur2013|Mazur et al. 2013]]: 체중을 유지한 남성도 20년간 테스토스테론이 117 ng/dL(19%) 감소했다.",
          "[[ref:santi2025|Santi et al. 2025]](n = 1,064,891): 연구 집단에서 BMI 시간 추세가 없었지만 테스토스테론은 유의하게 감소했다.",
          "[[ref:klimentidis2010|Klimentidis et al. 2010]]: 통제된 식단의 실험동물이 수십 년에 걸쳐 체중이 증가했다(p = 1.2×10⁻⁷).",
        ],
        boundary: "매개 변수 해석은 종단 데이터셋에서 정식 매개 분석으로 테스트 가능하다.",
      },
      {
        question: "모델을 구조에서 결과로 이동시키려면 무엇이 필요한가?",
        response: [
          "측정 준비 완료 FieldState에는 문서화된 교정, B₀ 벡터, 장기 전달, PSD, 일주기 컨텍스트, 위상/코히어런스, 출처가 필요하다.",
          "교정은 훈련 기간에만 수행하고, 독립적 실험실 재현과 보류된 ASFR/TFR 기간이 뒤따른다.",
        ],
        boundary: "이러한 결합이 존재할 때까지, v2는 연구 사양과 인과 지도이지, 보정된 국가별 예측 모델이 아니다.",
      },
      {
        question: "LED 조명은 에너지 효율적이고 안전 인증됨",
        response: [
          "LED 조명은 전자기 호환성(EMC)으로 인증됨 — 중간 주파수 방출의 생물학적 안전성으로 인증된 것이 아니다. CISPR 15는 생물학적 시스템이 아닌 라디오 수신을 보호하기 위해 설계되었다.",
          "어떤 규제 기관도 LED 드라이버의 지속적인 20–200 kHz 필드의 생물학적 효과를 평가하지 않았다.",
          "[[ref:zeghoudi2025_led_driver_emf|Zeghoudi et al. 2025]]는 LED 드라이버 근접장 방출을 직접 측정했다. EU의 백열등 금지(2009–2012)는 약 4억 5천만 명에 대해 제로 IF 소스를 연속 IF 소스로 교체했다.",
          "[[ref:ijrb2022_if_review|2022년 IJRB의 IF-EMF 동물 연구 체계적 검토]]는 이 주파수 대역이 최소한의 건강 연구를 받았음을 확인했다.",
        ],
        boundary: "이것은 규제 격차 논거이지, 건강 주장이 아니다.",
      },
      {
        question: "용량-반응 관계가 없다",
        response: [
          "[[ref:adey1976_calcium_window|1976년부터 문서화된 Adey-Blackman 칼슘 윈도우]]는 EMF 생물학적 효과가 선형 용량-반응을 따르지 않음을 보여준다. ICNIRP 접근법이 구조적으로 잘못되었음을 의미한다.",
          "다른 강도를 사용하는 재현 연구가 효과를 찾지 못하는 이유도 설명한다: 윈도우 밖에서 테스트하고 있을 수 있다.",
          "윈도우 현상은 공명의 물리학과 일치한다.",
        ],
        boundary: "윈도우 효과는 경험적 관찰이다. 환경 강도에서 생식 종료점에 대해 윈도우 의존적 용량-반응이 입증될 수 없으면, 출산력과의 관련성은 미확립이다.",
      },
      {
        question: "모델은 단지 GDP를 맞추고 있을 뿐이다",
        response: [
          "선형 모델에서 EMF와 GDP는 공선적(r = 0.87)이다. 대칭적 식별 문제이지, EMF에 반하는 증거가 아니다.",
          "세 가지 구조적 차이가 EMF를 GDP로부터 구별한다. 전기 접근은 이진 임계값이다. 휴대전화는 가장 약한 EMF 프록시(RMSE 1.053). 주거 전력이 가장 좋다(단변량 RMSE 0.533).",
          "센티넬 종은 전기장에 반응하지만([[ref:mallinson2025_electric_pollution|Mallinson 2025]]: 꽀벌 -71%) GDP에는 반응하지 않는다.",
        ],
        boundary: "횡단 분석은 EMF와 GDP 사이의 인과 방향을 식별할 수 없다.",
      },
      {
        question: "전기 접근은 단순한 개발 프록시일 뿐이다",
        response: [
          "전기 접근은 개발과 상관되지만, 다른 개발 지표에는 없는 특성을 가진다: 물리적 임계값. IFO-VGIC 활성화 임계값(10⁻⁵ V/m)은 모든 가정용 전기 기기의 작동 거리에서 초과된다.",
          "부분 전화 국가에서 국가 TFR은 전화 인구(EMF 노출, 낮은 TFR)와 비전화 인구(노출 없음, 생물학적 최대 ~6.5에 가까운 TFR)의 혼합이다.",
          "이진 임계값은 검증 가능한 예측을 생성한다: DHS 마이크로데이터.",
        ],
        boundary: "DHS 마이크로데이터가 소득과 교육 통제 후 전화/비전화 TFR 차이를 보이지 않으면, 이진 임계값 논거는 반증된다.",
      },
      {
        question: "EHS는 심인성이다 — 노시보가 자가보고 증상을 설명한다",
        response: [
          "[[ref:sousouri2025|Sousouri et al. 2025]](NeuroImage, ETH Zurich)는 CACNA1C 유전형 판정을 포함한 이중 맹검 무작위 대조 시험을 수행했다. 노시보는 이중 맹검 설계에서 유전형 의존적 신경생리학적 변화를 산출할 수 없다.",
          "이것은 EHS 질문을 '자가보고자가 무언가를 느끼는가?'에서 '이온 채널 유전형이 RF에 대한 측정 가능한 뇌 반응을 예측하는가?'로 전환한다.",
          "[[ref:belpomme2022|Belpomme et al. 2022]]는 약 1,000명의 EHS 환자를 객관적 바이오마커로 특성화했다.",
        ],
        boundary: "노시보 가설은 검증 가능한 예측을 한다: 유전형은 이중 맹검 설계에서 반응을 예측하지 않아야 한다. [[ref:sousouri2025|Sousouri 2025]]가 이 예측을 반증했다.",
      },
      {
        question: "메커니즘은 비현실적이다",
        response: [
          "이 논거는 50년간 모든 비열적 EMF 발견에 적용되어 왔다 — 그리고 매번 틀렸다.",
          "1976년, [[ref:adey1976_calcium_window|Adey]]와 Blackman은 뇌 조직에서의 칼슘 유출을 문서화했다. 2026년, [[ref:kim2026_cell_gene_switch|Kim et al.(Cell)]]은 리듬적 칼슘 진동이 유전자 발현을 구동함을 보여주었다.",
          "1995년, [[ref:lai1995_dna_breaks|Lai와 Singh]]은 2450 MHz 방사로부터 DNA 가닥 절단을 발견했다.",
          "2026년, [[ref:kim2026_cell_gene_switch|Kim et al.의 Cell 논문]]은 물리학자 [[ref:york2026_kim_commentary|Andrew York]]에 의해 '믿을 수 없을 정도로 비현실적'이라 불렸다.",
          "패턴은 일관적이다: 데이터는 강력하고, 메커니즘은 미지이며, 비평가들은 불가능성을 선언한다. 그 후 메커니즘이 발견된다.",
          "BERM의 χ(A)는 Lindgren 2025 계량에 의해 동기 부여된 검증 가능한 폐쇄 가설이며 외부장과 이온 채널의 결합을 아직 도출하지 않는다. 광자 센서 비유는 실험을 동기화하지만 열린 L2 연산자와 보정을 대신하지 못한다.",
        ],
        boundary: "Lindgren의 해석은 이론적이며 아직 독립적으로 검증되지 않았다.",
      },
      {
        question: "블루라이트가 LED의 모든 건강 효과를 설명한다",
        response: [
          "블루라이트는 멜라토닌을 억제한다 — 이것은 확립되어 있다. 그러나 전체 그림은 아니다.",
          "[[ref:duraccio2019_blue_light|Duraccio et al.(2019)]]은 블루라이트 필터링 안경이 청소년 수면의 질을 유의하게 개선하지 않았음을 발견했다.",
          "BERM은 LED 램프가 두 가지 생물학적으로 관련된 출력을 산출한다고 제안한다: 블루라이트(광학적)와 IF 방출(전자기적).",
          "검증 가능한 예측(SLEEP-1): 패러데이 차폐 LED 램프가 차폐되지 않은 램프보다 적은 생물학적 방해를 산출해야 한다.",
        ],
        boundary: "SLEEP-1 예측은 직접 반증 가능하다.",
      },
      {
        question: "왜 경로 B는 원래 15%에서 25%를 얻는가?",
        response: [
          "경로 B는 원래 15%가 할당되었다. 2025년, [[ref:yap2025|Yap과 동료들]]은 CRY2가 TRPC1과도 상호작용하여 칼슘 신호전달을 조절함을 발견했다.",
          "TRPC1은 TRP 채널이지, VGCC가 아니다. 두 경로는 약리학적으로 구별된다.",
          "예측 TRPC1-1이 이것을 직접 테스트한다.",
        ],
        boundary: "가중치 조정은 근아세포에서의 한 연구([[ref:yap2025|Yap 2025]])에 기반한다.",
      },
      {
        question: "EMF 효과가 실재한다면, 왜 실험실들은 모순된 결과를 얻는가?",
        response: [
          "EMF 연구는 수십 년간 모순된 결과를 산출해 왔다. BERM은 4가지 통제되지 않은 조절 변수를 식별한다:",
          "1. 계절: CRY 자기수용체 감도는 광의존적이다. 송아지에서 직접 입증됨(Halgamuge 2015).",
          "2. 유전형: CACNA1C rs1006737 다형성이 Cav1.2 채널 발현을 조절한다. [[ref:sousouri2025|Sousouri 2025]]가 직접 입증.",
          "3. 실험실 ELF 배경: 50/60 Hz 전력망이 8–10일 후 VGCC 발현을 상향 조절한다.",
          "4. 피험자의 야간 EMF: 침실의 Wi-Fi 라우터가 CaMKII 회복에 영향을 미친다.",
          "3가지 조절 변수가 통계적으로 유의하게 연구 결과를 예측한다. [[ref:weller2025_dna|Weller et al.(2025)]]이 517개 유전독성 연구에서 이 패턴을 검증했다.",
          "하위그룹 분석이 수행된 모든 영 결과 연구에서 양성 하위그룹이 발견되었다.",
          "연구 A(겨울, 고위도, AA 유전형)는 양성 결과를 발견한다. 연구 B(여름, 저위도, GG 유전형)는 영 결과. 둘 다 올바르다.",
          "새 데이터 없이 테스트 가능: 50–100개 발표 연구의 회고적 분석.",
        ],
        boundary: "4가지 조절 변수 프레임워크는 BERM의 종합이며, 현재 정량적 검증이 있다.",
      },
    ],
    closingTitle: "프로그램을 테스트하는 건설적인 방법",
    closingText:
      "가장 유용한 비판은 경쟁하는 측정 모델, 소스 수정, 독립적으로 재현된 실험, 또는 더 나은 인구학적 설계를 제공한다.",
    findingsLabel: "건의 발견",
    remainLabel: "잔존",
    reclassifiedLabel: "재분류",
    internalRefinementLabel: "내부 개선",
    summaryStats: `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total}건이 현행 경험적 BERM에 영향 · ${CLASSIFICATION_SUMMARY.affects_l_berm_only}건이 L-BERM 이론 층에 영향 · ${CLASSIFICATION_SUMMARY.affects_old_versions_only}건이 구버전에 영향 · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed}건의 식별적 후속 테스트 식별`,
    findingsDistribution: "발견 분포",
    remainNegativeLabel: "부정적으로 유지",
    testsComparison: "식별적 테스트 비교",
    testSvgLabel: "테스트",
    consensusSvgLabel: "합의",
    divergenceLabel: "분기",
    angleDependentLabel: "각도 의존적",
    isotropicLabel: "등방성",
    highLabel: "높음",
    cohortStepLabel: "코호트 단계",
    noCohortStepLabel: "단계 없음",
    cryPredictsLabel: "CRY가 예측",
    noPredictionLabel: "예측 없음",
    consensusLabel: "합의",
    protocolLabel: "프로토콜",
    versionTimeline: "버전 타임라인",
    abandonedLabel: "폐기",
    demotedLabel: "강등",
    activeLabel: "활성",
    currentLabel: "현행",
    nextLabel: "다음",
    sentinelTitle: "센티넬 종",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ObjectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={ShieldQuestion} title={d.title} subtitle={d.subtitle} />
      <div className="max-w-3xl space-y-8">
        <p className="text-foreground-muted leading-relaxed">{d.introduction}</p>

        {/* Summary bar: the whole review in one line */}
        <section className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
          <p className="editorial-kicker text-accent">{d.summaryLabel}</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="font-mono-num">
              {CLASSIFICATION_SUMMARY.total}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {d.findingsLabel}
              </span>
            </span>
            <span className="font-mono-num text-status-refuted">
              {CLASSIFICATION_SUMMARY.remains_negative}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {d.remainLabel}
              </span>
            </span>
            <span className="font-mono-num text-status-partial">
              {CLASSIFICATION_SUMMARY.reclassified}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {d.reclassifiedLabel}
              </span>
            </span>
            <span className="font-mono-num text-accent">
              {CLASSIFICATION_SUMMARY.internal_refinement}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {d.internalRefinementLabel}
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
            {d.summaryStats}
          </p>
          <p className="mt-1 font-mono-num text-xs text-foreground-muted">
            CLASSIFICATION_TABLE v{CLASSIFICATION_VERSION}
          </p>
        </section>

        {/* Classification donut chart */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
          <svg
            viewBox="0 0 200 200"
            className="w-[160px] h-[160px] shrink-0"
            role="img"
            aria-label={d.findingsDistribution}
          >
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="20" opacity="0.08" />
            <circle className="text-status-refuted" cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="174 203" strokeDashoffset="0" transform="rotate(-90 100 100)" />
            <circle className="text-status-partial" cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="116 261" strokeDashoffset="-174" transform="rotate(-90 100 100)" />
            <circle className="text-accent" cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="87 290" strokeDashoffset="-290" transform="rotate(-90 100 100)" />
            <text x="100" y="96" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="26" fontWeight="600">{CLASSIFICATION_SUMMARY.total}</text>
            <text x="100" y="116" textAnchor="middle" fill="currentColor" className="text-foreground-muted" fontSize="10">{d.findingsLabel}</text>
          </svg>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-status-refuted shrink-0" />
              <span className="font-mono-num text-status-refuted">{CLASSIFICATION_SUMMARY.remains_negative}</span>
              <span className="text-foreground-muted">{d.remainNegativeLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-status-partial shrink-0" />
              <span className="font-mono-num text-status-partial">{CLASSIFICATION_SUMMARY.reclassified}</span>
              <span className="text-foreground-muted">{d.reclassifiedLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-accent shrink-0" />
              <span className="font-mono-num text-accent">{CLASSIFICATION_SUMMARY.internal_refinement}</span>
              <span className="text-foreground-muted">{d.internalRefinementLabel}</span>
            </div>
          </div>
        </div>

        {/* Three outcome groups, read from the shared table */}
        {(
          [
            ["remains_negative", d.activeTitle, d.activeLead],
            ["reclassified", d.reclassifiedTitle, d.reclassifiedLead],
            ["internal_refinement", d.refinementTitle, d.refinementLead],
          ] as const
        ).map(([group, title, lead]) => (
          <section key={group} className="space-y-3">
            <h2 className="editorial-section-heading">{title}</h2>
            <p className="text-sm leading-relaxed text-foreground-muted">{lead}</p>
            {findingsInGroup(group).map((finding) => (
              <FindingCard key={finding.id} finding={finding} locale={locale} />
            ))}
          </section>
        ))}

        {/* Discriminating tests D1–D3 */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.testsTitle}</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{d.testsLead}</p>

          {/* Discriminating tests comparison matrix */}
          <div className="overflow-x-auto rounded-lg border border-card-border/60 bg-card-bg/50 p-3 sm:p-4">
            <svg viewBox="0 0 560 120" className="w-full min-w-[480px]" style={{ height: "140px" }} role="img" aria-label={d.testsComparison}>
              <text x="5" y="14" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="600" letterSpacing="0.05em">{d.testSvgLabel}</text>
              <text x="50" y="14" fill="currentColor" className="text-accent" fontSize="9" fontWeight="600" letterSpacing="0.05em">BERM</text>
              <text x="220" y="14" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="600" letterSpacing="0.05em">{d.consensusSvgLabel}</text>
              <text x="390" y="14" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="600" letterSpacing="0.05em">{d.divergenceLabel}</text>
              <line x1="0" y1="22" x2="560" y2="22" stroke="currentColor" opacity="0.15" />

              <text x="5" y="48" fill="currentColor" className="text-accent" fontSize="14" fontWeight="700">D1</text>
              <text x="50" y="48" fill="currentColor" className="text-foreground" fontSize="11">{d.angleDependentLabel}</text>
              <text x="220" y="48" fill="currentColor" className="text-foreground-muted" fontSize="11">{d.isotropicLabel}</text>
              <rect x="390" y="38" width="88" height="14" rx="3" fill="#22c55e" opacity="0.8" />
              <text x="486" y="49" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="500">{d.highLabel}</text>

              <text x="5" y="78" fill="currentColor" className="text-accent" fontSize="14" fontWeight="700">D2</text>
              <text x="50" y="78" fill="currentColor" className="text-foreground" fontSize="11">{d.cohortStepLabel}</text>
              <text x="220" y="78" fill="currentColor" className="text-foreground-muted" fontSize="11">{d.noCohortStepLabel}</text>
              <rect x="390" y="68" width="88" height="14" rx="3" fill="#22c55e" opacity="0.8" />
              <text x="486" y="79" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="500">{d.highLabel}</text>

              <text x="5" y="108" fill="currentColor" className="text-accent" fontSize="14" fontWeight="700">D3</text>
              <text x="50" y="108" fill="currentColor" className="text-foreground" fontSize="11">{d.cryPredictsLabel}</text>
              <text x="220" y="108" fill="currentColor" className="text-foreground-muted" fontSize="11">{d.noPredictionLabel}</text>
              <rect x="390" y="98" width="125" height="14" rx="3" fill="#22c55e" />
              <text x="523" y="109" fill="currentColor" className="text-foreground-muted" fontSize="9" fontWeight="600">MAX</text>
            </svg>
          </div>

          {d.tests.map((test) => (
            <article key={test.id} className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
              <h3 className="text-sm font-semibold">
                <span className="font-mono-num text-accent">{test.id}</span>{" "}
                <span className="text-foreground">{test.name}</span>
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-[7rem_1fr]">
                <dt className="text-accent">BERM</dt>
                <dd className="text-foreground-muted">{test.berm}</dd>
                <dt className="text-foreground-muted">
                  {d.consensusLabel}
                </dt>
                <dd className="text-foreground-muted">{test.consensus}</dd>
                <dt className="text-foreground-muted">
                  {d.protocolLabel}
                </dt>
                <dd className="text-foreground-muted">{test.protocol}</dd>
              </dl>
              <p className="mt-3 border-t border-card-border/60 pt-2 font-mono-num text-xs text-foreground-muted">
                {test.cost}
              </p>
            </article>
          ))}
        </section>

        {/* Version history: what was abandoned and why */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.historyTitle}</h2>

          {/* Version history timeline */}
          <div className="overflow-x-auto">
            <svg viewBox="0 0 600 75" className="w-full min-w-[500px]" style={{ height: "90px" }} role="img" aria-label={d.versionTimeline}>
              <line x1="40" y1="22" x2="560" y2="22" stroke="currentColor" opacity="0.2" strokeWidth="2" />

              <circle cx="40" cy="22" r="6" fill="#ef4444" />
              <text x="40" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="500">{"<v6"}</text>
              <text x="40" y="56" textAnchor="middle" fill="#ef4444" fontSize="8">{d.abandonedLabel}</text>

              <circle cx="144" cy="22" r="6" fill="#ef4444" />
              <text x="144" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="500">v6–9</text>
              <text x="144" y="56" textAnchor="middle" fill="#ef4444" fontSize="8">{d.abandonedLabel}</text>

              <circle cx="248" cy="22" r="6" fill="#f59e0b" />
              <text x="248" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="500">L-BERM</text>
              <text x="248" y="56" textAnchor="middle" fill="#f59e0b" fontSize="8">{d.demotedLabel}</text>

              <circle cx="352" cy="22" r="6" fill="#22c55e" />
              <text x="352" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="500">v15</text>
              <text x="352" y="56" textAnchor="middle" fill="#22c55e" fontSize="8">{d.activeLabel}</text>

              <circle cx="456" cy="22" r="6" fill="#22c55e" />
              <text x="456" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="500">v16</text>
              <text x="456" y="56" textAnchor="middle" fill="#22c55e" fontSize="8">{d.activeLabel}</text>

              <circle cx="560" cy="22" r="10" fill="none" stroke="#22c55e" strokeWidth="2" />
              <circle cx="560" cy="22" r="6" fill="#22c55e" />
              <text x="560" y="44" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="9" fontWeight="600">v17</text>
              <text x="560" y="56" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="600">{d.currentLabel}</text>
            </svg>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-xs">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  {d.historyHeaders.map((header) => (
                    <th key={header} className="py-2 pr-3 font-normal">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.history.map((row) => (
                  <tr key={`${row.version}-${row.mechanism}`} className="border-b border-card-border/50">
                    <td className="py-2 pr-3 font-mono-num whitespace-nowrap">{row.version}</td>
                    <td className="py-2 pr-3 text-foreground">{row.mechanism}</td>
                    <td className="py-2 pr-3 text-status-refuted whitespace-nowrap">{row.status}</td>
                    <td className="py-2 leading-relaxed text-foreground-muted">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="editorial-section-heading border-t editorial-rule pt-6">{d.questionsTitle}</h2>

        {d.objections.map((objection, index) => (
          <section key={objection.question} id={objection.question === "There is no dose-response relationship" || objection.question === "Annos-vastetta ei ole" ? "dose-response" : undefined} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{objection.question}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {objection.response.map((paragraph) => (
                <p key={paragraph}>
                  <InlineReferenceText
                    text={paragraph}
                    locale={locale}
                  />
                </p>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-status-partial/35 bg-status-partial/5 p-3 text-xs leading-relaxed text-foreground-muted">
              <InlineReferenceText
                text={objection.boundary}
                locale={locale}
              />
            </p>
          </section>
        ))}

        <section className="rounded-xl border border-accent/25 bg-accent/5 p-5">
          <h2 className="text-lg font-semibold">{d.closingTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.closingText}</p>
        </section>
      </div>

      <NextPageLink
        href={`/${locale}/sentinel`}
        label={d.nextLabel}
        title={d.sentinelTitle}
        icon={Leaf}
      />
    </div>
  );
}
