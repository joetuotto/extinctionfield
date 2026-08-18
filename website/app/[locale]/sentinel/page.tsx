import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import TemporalTimeline from "@/components/TemporalTimeline";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SentinelRow {
  species: string;
  vgccConservation: string;
  absorptionSensitivity: string;
  documentedDecline: string;
  bermPrediction: string;
}

interface SpeciesSection {
  id: string;
  title: string;
  biology: string;
  emfSensitivity: string;
  documentedDecline: string;
  bermPrediction: string;
  lindgrenNote: string;
  proxyNote: string;
  references: string[];
}

interface ProxyMaskingRow {
  explanation: string;
  insects: "yes" | "partial" | "no";
  amphibians: "yes" | "partial" | "no";
  bees: "yes" | "partial" | "no";
  birds: "yes" | "partial" | "no";
  sperm: "yes" | "partial" | "no";
  tfr: "yes" | "partial" | "no";
  weakness: string;
}

interface TemporalRow {
  event: string;
  onset: string;
  emfMilestone: string;
  lag: string;
}

interface LabBiasRow {
  observation: string;
  period: string;
  implication: string;
}

interface ExplanationRow {
  explanation: string;
  insects: "yes" | "no" | "partial";
  amphibians: "yes" | "no" | "partial";
  bees: "yes" | "no" | "partial";
  birds: "yes" | "no" | "partial";
  bats: "yes" | "no" | "partial";
  labMammals: "yes" | "no" | "partial";
  humans: "yes" | "no" | "partial";
}

interface HumanProxyRow {
  socialExplanation: string;
  bermInterpretation: string;
  mechanism: string;
}

interface TimelineEvent {
  year: number;
  label: string;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  Translations                                                       */
/* ------------------------------------------------------------------ */

const t = {
  en: {
    /* metadata */
    metaTitle: "Sentinel Species - Extinction Field",
    metaDescription:
      "Sentinel species evidence: reproductive decline in insects, amphibians, bees, birds, bats, and lab mammals eliminates all human confounders.",

    /* header */
    title: "Sentinel Species: The Evidence That Can’t Be Socialized Away",
    headerP1:
      "Every conventional explanation for fertility decline — education, urbanization, contraception, economic pressure, social media — applies only to humans. If the same reproductive decline appears in insects, amphibians, birds, and mammals that share none of these social factors, the cause must be biological. The only environmental change that affects all species simultaneously, across all continents, at the same timescale as the observed declines, is the electromagnetic field environment.",
    headerP2Before:
      "BERM predicts that any species with voltage-gated calcium channels (VGCC) is susceptible to EMF-mediated reproductive effects. VGCCs are evolutionarily conserved across all eukaryotes — the L-type VGCC protein sequence is >70% identical across phyla (mammal 94%, bird 87%, amphibian 82%, insect 73%). This conservation is not coincidental: in ",
    lindgrenLinkText: "Lindgren’s framework",
    headerP2Mid:
      ", VGCC sensitivity to electromagnetic fields is a geometric property of the ",
    membraneLinkText: "membrane potential",
    headerP2After:
      ", not a species-specific adaptation. All cells with V",
    headerP2Final: " ≈ −70 mV are maximally sensitive.",

    /* convergence table */
    convergenceTitle: "Convergence Table",
    thSpecies: "Species",
    thVGCC: "VGCC Conservation",
    thAbsorption: "Absorption Sensitivity",
    thDecline: "Documented Decline",
    thBERM: "BERM Prediction",
    thMatch: "Match",

    /* temporal correlations */
    temporalTitle: "Temporal Correlations",
    temporalDesc:
      "These are correlations, not proof of causation. But the temporal coincidence across independent species strengthens the case for a shared environmental driver.",
    thEvent: "Event",
    thOnset: "Onset",
    thEMFMilestone: "EMF milestone",
    thLag: "Lag",
    temporalNote:
      "Note: temporal correlation does not establish causation. These coincidences are presented as hypothesis-consistent observations, not as evidence in themselves. The mechanistic pathway (VGCC/Ca²⁺) provides the causal link; timing provides plausibility.",

    /* species section labels */
    lblBiology: "Biology",
    lblEMFSensitivity: "EMF Sensitivity",
    lblDocumentedDecline: "Documented Decline",
    lblBERMPrediction: "BERM Prediction",
    lblLindgrenInterpretation: "Lindgren interpretation",
    lblKeyReferences: "Key References",

    /* laboratory baseline bias */
    labBiasTitle:
      "Laboratory Baseline Bias: Why All Controlled Studies Underestimate the Effect",
    labBiasP1Before:
      'Every laboratory EMF study compares an "exposed" group to a "control" group. But the control group is not unexposed — it lives in a laboratory with background EMF of approximately 10 V/m from lighting, equipment, and building wiring. In ',
    labBiasSelectionRuleLinkText: "Lindgren’s selection rule",
    labBiasP1After:
      ", χ(Ā_lab) ≈ 1.0 (saturated). Both groups are at maximal VGCC sensitivity.",
    labBiasP2:
      "This means the measured effect size (exposed minus control) captures only the additional EMF disruption, not the total. The true effect is the difference between the exposed group and a genuinely unexposed biological baseline — which no modern laboratory provides.",
    labBiasThObservation: "Observation",
    labBiasThPeriod: "Period",
    labBiasThImplication: "Implication",
    labBiasNoteBefore:
      "This is not a critique of laboratory methodology — it is a structural limitation. All published EMF effect sizes should be interpreted as lower bounds. See ",
    labBiasValidationLinkText: "§10: Pharmacological Validation",
    labBiasNoteAfter:
      " for how drug calibration partially corrects this bias.",

    /* convergence conclusion */
    convergenceConclTitle: "Convergence: Seven Phyla, One Mechanism",
    convergenceConclP:
      "Seven independent lines of evidence — insects, amphibians, bees, birds, bats, laboratory mammals, and humans — all show the same pattern: reproductive decline that correlates with electromagnetic field exposure and operates through the same conserved molecular mechanism (VGCC/Ca²⁺). No social explanation — education, economics, contraception, cultural change — applies to any non-human species. The only environmental change that is simultaneously global, recent (post-1990), and biologically active at observed exposure levels is the anthropogenic electromagnetic field.",
    convergenceConclNoteBefore:
      "For the complete mathematical derivation of the VGCC mechanism and how it produces quantitative TFR predictions, see the ",
    convergenceConclMathLinkText: "Mathematical Foundation",
    convergenceConclNoteAfter: ".",

    /* proxy masking section */
    proxyTitle: "Why Conventional Explanations Fall Short",
    proxySubtitle:
      "Every species decline has a familiar explanation. None of them explain the convergence.",
    proxyThExplanation: "Explanation",
    proxyColInsects: "Insects",
    proxyColAmphibians: "Amphibians",
    proxyColBees: "Bees",
    proxyColBirds: "Birds",
    proxyColSperm: "Sperm",
    proxyColTfr: "TFR",
    proxyColWeakness: "Critical weakness",
    proxyThreeTitle: "Three ways conventional explanations mask the EMF signal",
    proxyP1:
      "When a decline is observed — in insect biomass, amphibian populations, or human fertility — researchers search for explanations among familiar factors. Climate change is well-funded and politically supported. Chemical pollution is regulated and measurable. EMF is unfamiliar to most biologists, unfunded by most agencies, and actively lobbied against by the telecommunications industry. The result is not a conspiracy but a structural bias: EMF is never tested because it is not in the researcher's conceptual vocabulary. A 2024 analysis of 92 potential drivers of insect decline in Germany did not include electromagnetic fields among the candidates — not because EMF was tested and rejected, but because it was never considered.",
    proxyP2:
      "There are hundreds of studies on climate change and insect decline. There are fewer than twenty on EMF and insect decline. This disparity does not reflect the relative importance of the two factors — it reflects the structure of research funding. The volume of evidence for a hypothesis tracks the volume of funding, not the strength of the causal relationship. When a reviewer concludes that 'the evidence for climate effects is stronger than for EMF effects,' they are measuring research investment, not biological reality.",
    proxyP3:
      "Climate change and EMF infrastructure are temporally correlated: both grew between 1970 and 2024. An OLS regression cannot distinguish between them without an exogenous instrument. When a researcher controls for 'temperature' in a regression, they may inadvertently remove the EMF signal — because temperature trends and EMF infrastructure trends move together. The residual appears small, and the researcher concludes that climate explains the decline. But the researcher has not controlled for EMF; they have controlled for its correlate. This is not a flaw in the researcher's analysis — it is a structural limitation of observational data that can only be resolved by experimental intervention (Faraday-shielded replication) or instrumental variable analysis (5G auction timing as instrument).",
    proxyP1Label: "Attribution bias",
    proxyP2Label: "Evidence asymmetry",
    proxyP3Label: "Causal masking",
    proxyAttrLabel: "Attribution analysis",

    /* human proxy masking */
    proxyHumanTitle: "Human Fertility: Social Science Explanations as Hormonal Proxies",
    proxyHumanIntro:
      "When social scientists observe fertility decline, they document real patterns: men commit less, women report higher standards, couples say they are too busy, infertility diagnoses rise, and careers take priority over children. Each observation is accurate. But each has a hormonal substrate that the social science framing does not capture. The quadruple suppression model (§5) shows how EMF-mediated hormonal changes produce exactly the behavioral patterns that social scientists attribute to culture.",
    proxyHumanThSocial: "Social science observation",
    proxyHumanThBERM: "BERM interpretation",
    proxyHumanThMechanism: "Hormonal mechanism",
    proxyHumanNote:
      "This mapping is inherently speculative: the causal chain from population-level T decline to population-level behavior change has not been tested as a whole. Individual-level links are established (RCTs: Dreher 2016, Goetz 2024), but ecological inference carries uncertainty. The dual-hormone meta-analysis effect size is small (r = -0.061). Culture is real — contraception access, education, and economic opportunity genuinely affect fertility choices. BERM argues that part of what appears cultural is hormonally mediated, not that culture is irrelevant.",
    humanProxyRows: [
      {
        socialExplanation: "\"Men don't want to commit\"",
        bermInterpretation: "T decline reduces approach motivation (P_approach). Men initiate fewer romantic contacts not because of preference change but because hormonal drive is suppressed.",
        mechanism: "T↓ → approach motivation↓ (Puts 2008, n=119)",
      },
      {
        socialExplanation: "\"Women's standards are too high\"",
        bermInterpretation: "Population-level T decline weakens the signal women evolved to detect. The signal has objectively degraded; standards have not risen — the signal-to-noise ratio has fallen.",
        mechanism: "T↓ → attraction signal↓ (Thornhill & Gangestad 1994)",
      },
      {
        socialExplanation: "\"Couples are too busy/stressed\"",
        bermInterpretation: "Cortisol elevation suppresses the dual-hormone gate. Even residual T cannot express behaviorally when cortisol is high. Stress is partly EMF-mediated.",
        mechanism: "Cortisol↑ → dual-hormone lock (Mehta 2015, meta N=8538)",
      },
      {
        socialExplanation: "\"Infertility is rising\"",
        bermInterpretation: "Direct gamete damage via ROS/SDF pathway. This is the biological component that no social explanation addresses.",
        mechanism: "EMF → VGCC → ROS → sperm DNA fragmentation (Pathway A)",
      },
      {
        socialExplanation: "\"Career over kids\"",
        bermInterpretation: "OT decline reduces pair-bonding reward. The subjective experience of 'preferring career' is indistinguishable from reduced neurochemical reward for pair-bonding.",
        mechanism: "OT↓ → pair-bond reward↓ → P(sex within pair)↓",
      },
    ] as HumanProxyRow[],

    /* temporal timeline */
    timelineTitle: "Temporal Correlation Timeline",
    timelineDesc:
      "Move the slider to see how EMF infrastructure milestones and species decline events align temporally. Each decline onset matches an EMF deployment phase within 0–3 years.",
    timelineEmfLabel: "EMF Infrastructure",
    timelineDeclineLabel: "Species Decline",
    timelineYearLabel: "Year",
    timelineNote:
      "Temporal coincidence is not causation. The mechanistic link (VGCC/Ca²⁺ conservation across phyla) provides the causal hypothesis; temporal alignment provides plausibility.",

    /* convergence explanation table */
    explTableTitle:
      "Convergence Test: Can Any Conventional Explanation Cover All Species?",
    explTableDesc:
      "Each row is a conventional explanation proposed for population decline. Each column is a species group. The key observation: no single conventional explanation gets 'yes' across all columns. EMF via the VGCC mechanism is the only hypothesis that applies to all seven simultaneously.",
    explThExplanation: "Conventional Explanation",
    explColInsects: "Insects",
    explColAmphibians: "Amphibians",
    explColBees: "Bees",
    explColBirds: "Birds",
    explColBats: "Bats",
    explColLabMammals: "Lab mammals",
    explColHumans: "Humans",
    explYes: "Yes",
    explNo: "No",
    explPartial: "Partial",
    explNote:
      "Only the EMF/VGCC row is 'yes' across all species. This does not prove EMF is the cause — it establishes that no conventional alternative can be the sole cause across all taxa.",

    /* --- data arrays --- */

    timelineEmfEvents: [
      { year: 1953, label: "TV broadcast", color: "#3B82F6" },
      { year: 1970, label: "Microwave ovens", color: "#3B82F6" },
      { year: 1983, label: "1G cellular", color: "#60A5FA" },
      { year: 1991, label: "GSM 2G", color: "#2563EB" },
      { year: 1997, label: "Wi-Fi 802.11", color: "#60A5FA" },
      { year: 2001, label: "3G UMTS", color: "#2563EB" },
      { year: 2007, label: "Smartphone era", color: "#1D4ED8" },
      { year: 2009, label: "4G LTE", color: "#2563EB" },
      { year: 2019, label: "5G NR", color: "#1D4ED8" },
    ] as TimelineEvent[],

    timelineDeclineEvents: [
      { year: 1970, label: "Bird decline begins", color: "#F59E0B" },
      { year: 1995, label: "Insect collapse (Krefeld)", color: "#EF4444" },
      { year: 1998, label: "Amphibian enigmatic decline", color: "#F97316" },
      { year: 2000, label: "Human sperm decline accel.", color: "#DC2626" },
      { year: 2006, label: "CCD (bees) + WNS (bats)", color: "#EF4444" },
    ] as TimelineEvent[],

    explanationRows: [
      {
        explanation: "Pesticides / chemicals",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "no", labMammals: "no", humans: "partial",
      },
      {
        explanation: "Climate change",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Disease / pathogens",
        insects: "no", amphibians: "partial", bees: "partial",
        birds: "no", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Habitat loss",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Light pollution",
        insects: "partial", amphibians: "no", bees: "no",
        birds: "partial", bats: "partial", labMammals: "no", humans: "partial",
      },
      {
        explanation: "Education / economics",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", bats: "no", labMammals: "no", humans: "yes",
      },
      {
        explanation: "Contraception",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", bats: "no", labMammals: "no", humans: "yes",
      },
      {
        explanation: "EMF / VGCC mechanism",
        insects: "yes", amphibians: "yes", bees: "yes",
        birds: "yes", bats: "yes", labMammals: "yes", humans: "yes",
      },
    ] as ExplanationRow[],

    proxyMaskingRows: [
      {
        explanation: "Pesticides / chemicals",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", sperm: "partial", tfr: "no",
        weakness: "Declines occur in protected areas without pesticides (Krefeld). Sperm decline continues in countries where chemical exposure is decreasing. TFR decline has no chemical mechanism.",
      },
      {
        explanation: "Climate change",
        insects: "no", amphibians: "partial", bees: "no",
        birds: "partial", sperm: "no", tfr: "no",
        weakness: "Krefeld data: warmer temperatures INCREASE insect biomass. No climate model predicts sperm decline or TFR collapse. Climate change is global but fertility decline correlates with EMF infrastructure, not temperature.",
      },
      {
        explanation: "Habitat loss",
        insects: "no", amphibians: "partial", bees: "no",
        birds: "partial", sperm: "no", tfr: "no",
        weakness: "Krefeld sites are protected nature reserves — no habitat loss. CCD occurs in managed hives with abundant resources. Sperm decline occurs in men who have not lost habitat.",
      },
      {
        explanation: "Disease (chytrid, Varroa)",
        insects: "no", amphibians: "partial", bees: "partial",
        birds: "no", sperm: "no", tfr: "no",
        weakness: "Amphibian declines began before chytrid was identified (1980 vs 1998). 'Enigmatic declines' occur without detected pathogens. CCD continues after Varroa treatment. No disease explains sperm decline.",
      },
      {
        explanation: "Education / urbanization",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", sperm: "no", tfr: "partial",
        weakness: "Applies only to humans. Cannot explain any non-human decline. Dogs do not attend university. Amish TFR 6.4 despite proximity to educated populations.",
      },
      {
        explanation: "Contraception / choice",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", sperm: "no", tfr: "partial",
        weakness: "Applies only to humans. Explains TFR partly but not sperm decline (biological, not behavioral). Contraception access is stable in Nordic countries but TFR still falling.",
      },
      {
        explanation: "EMF (VGCC/RPM mechanism)",
        insects: "yes", amphibians: "yes", bees: "yes",
        birds: "yes", sperm: "yes", tfr: "yes",
        weakness: "Mechanism is conserved across all eukaryotes (VGCC 73–94% identical). Only candidate that explains all six simultaneously. Temporal correlation with infrastructure rollout. Not yet proven by RCT.",
      },
    ] as ProxyMaskingRow[],

    convergenceTable: [
      {
        species: "Insects",
        vgccConservation: "73%",
        absorptionSensitivity: "High (size ≈ λ)",
        documentedDecline: "−75% biomass / 27 yr (Krefeld)",
        bermPrediction: "Most sensitive",
      },
      {
        species: "Amphibians",
        vgccConservation: "82%",
        absorptionSensitivity: "8.7× mammals",
        documentedDecline: "−41% population (IUCN)",
        bermPrediction: "Most sensitive vertebrate",
      },
      {
        species: "Bees",
        vgccConservation: "73%",
        absorptionSensitivity: "High + navigation",
        documentedDecline: "CCD, 30–40% annually",
        bermPrediction: "Navigation + VGCC",
      },
      {
        species: "Birds",
        vgccConservation: "87%",
        absorptionSensitivity: "Medium + magnetic compass",
        documentedDecline: "−29% North America 1970+",
        bermPrediction: "RPM/CRY disruption",
      },
      {
        species: "Bats",
        vgccConservation: "90%",
        absorptionSensitivity: "High (echolocation freq.)",
        documentedDecline: "White-nose + population↓",
        bermPrediction: "Immune + navigation",
      },
      {
        species: "Mammals (lab)",
        vgccConservation: "94%",
        absorptionSensitivity: "1× (baseline)",
        documentedDecline: "Sperm↓, fertility↓",
        bermPrediction: "Controlled experiments",
      },
      {
        species: "Humans",
        vgccConservation: "94%",
        absorptionSensitivity: "1× + tech use",
        documentedDecline: "TFR↓, sperm −51%",
        bermPrediction: "Cumulative exposure",
      },
    ] as SentinelRow[],

    temporalRows: [
      {
        event: "Krefeld insect decline acceleration",
        onset: "~1995",
        emfMilestone: "GSM rollout Germany (1992)",
        lag: "~3 yr",
      },
      {
        event: "Colony Collapse Disorder",
        onset: "2006",
        emfMilestone: "3G widespread deployment (2004–06)",
        lag: "0–2 yr",
      },
      {
        event: "White-nose syndrome (bats)",
        onset: "2006",
        emfMilestone: "3G widespread deployment (2004–06)",
        lag: "0–2 yr",
      },
      {
        event: 'Amphibian "enigmatic decline" acceleration',
        onset: "~1998",
        emfMilestone: "GSM global expansion (1995–2000)",
        lag: "~3 yr",
      },
      {
        event: "Human sperm decline acceleration",
        onset: "~2000",
        emfMilestone: "Pocket phone era (2000+)",
        lag: "0 yr",
      },
      {
        event: "Passerine bird decline (−53%)",
        onset: "1970–2018",
        emfMilestone: "Progressive RF densification",
        lag: "cumulative",
      },
    ] as TemporalRow[],

    labBiasRows: [
      {
        observation: "Spontaneous tumor rate in lab rats: 2% → 30%",
        period: "1940–2024",
        implication: "Correlates with lab electrification",
      },
      {
        observation: "Lab rodent metabolic syndrome incidence rising",
        period: "1980–2024",
        implication: '"Control" animals are not healthy baselines',
      },
      {
        observation: "Lab rodent fertility declining over decades",
        period: "1970–2024",
        implication: "Parallels human sperm decline trajectory",
      },
    ] as LabBiasRow[],

    species: [
      {
        id: "insects",
        title: "Insects: The 75% Collapse",
        biology:
          "Insects are the foundation of terrestrial biodiversity: they pollinate 87% of flowers, form the base of the food chain, and recycle organic matter. Their VGCCs are 73% identical to humans.",
        emfSensitivity:
          "Insect body size (mm–cm) is in the same order of magnitude as GSM/Wi-Fi wavelength (12 cm @ 2.4 GHz). This means the insect functions as a resonance antenna — it absorbs RF energy more efficiently than a larger animal. Thielens 2018: 3–6 dB absorption increase from 2G to 5G frequencies.",
        documentedDecline:
          "The Krefeld long-term study (Hallmann et al. 2017, PLOS ONE): flying insect biomass declined 75% in 27 years (1989–2016) across 63 protected areas in Germany. The decline occurred even in protected areas not exposed to pesticides or land-use changes. Sánchez-Bayo & Wyckhuys 2019: 40% of insect species are declining, 33% are threatened. The rate is 2.5% per year — faster than mammals or birds.",
        bermPrediction:
          "BERM predicts insects are the MOST SENSITIVE group because: (1) as resonance antennas they absorb RF efficiently, (2) VGCCs regulate flight muscle function and navigation, (3) they are small → SAR is relatively higher, (4) they are poikilothermic → no thermoregulation to buffer. The resonant antenna effect (body size ≈ λ/2) is the inter-species analogue of individual susceptibility — just as CACNA1C genotype modulates human response, body geometry modulates species-level response.",
        lindgrenNote:
          "In Lindgren’s framework, insect size is critical: when an animal’s physical size is λ/2 (half the wavelength), it functions as a half-wave dipole antenna absorbing at resonance. 2.4 GHz: λ = 12.5 cm, λ/2 = 6.25 cm. A large butterfly or beetle is this size. 5G (3.5 GHz): λ/2 = 4.3 cm → smaller insects in resonance. As EMF frequency increases (2G→5G), resonance shifts to SMALLER insects → a wider range of species is exposed.",
        proxyNote:
          "Conventional attribution: pesticides + climate change. Problem: Krefeld’s 63 sites are protected nature reserves with no pesticide use. The 2023 Nature re-analysis found that weather explains inter-annual variability but not the long-term decline. A 2024 analysis of 92 drivers found ‘no obvious links to climate and weather, or to crop protection.’ The long-term driver remains unidentified in the literature. EMF was not among the 92 candidates tested.",
        references: [
          "Hallmann et al. 2017. PLOS ONE. −75% biomass in 27 years.",
          "Sánchez-Bayo & Wyckhuys 2019. Biol. Conserv. 40% of species declining.",
          "Thielens et al. 2018. Sci. Rep. 3–6 dB absorption increase at 5G frequencies.",
          "Balmori 2015. Rev. Environ. Health. EMF and insect decline.",
        ],
      },
      {
        id: "amphibians",
        title: "Amphibians: 8.7× More Sensitive",
        biology:
          "Amphibians (frogs, salamanders) are Earth’s most threatened vertebrate group: 41% of species are threatened (IUCN). Their skin is permeable — it functions as a respiratory organ and is therefore especially susceptible to environmental electric fields.",
        emfSensitivity:
          "Amphibian skin electrical permeability is 8.7× higher than mammals (Becker). RF absorption is maximal in the 0.3–3 GHz range — exactly mobile phone and Wi-Fi frequencies. Becker’s salamander lost regeneration capacity at >1 V/m in an external field. This is 100× below current safety limits.",
        documentedDecline:
          "IUCN 2023: 41% of amphibian species are threatened. The decline is faster than in any other vertebrate group. ‘Enigmatic decline’ — populations disappear even from pristine areas with no obvious cause (no habitat loss, no disease, no predation). Balmori 2006: frog populations have declined dramatically near base stations.",
        bermPrediction:
          "BERM predicts amphibians are the MOST SENSITIVE vertebrate group because: (1) 8.7× absorption sensitivity, (2) VGCCs regulate fertilization (egg Ca²⁺ wave), (3) they develop externally (no uterine protection), (4) Becker’s regeneration data directly demonstrates DC control system disruption. ‘Enigmatic decline’ is the phenomenon BERM predicts: populations disappear without a local cause because EMF is global.",
        lindgrenNote:
          "Salamander regeneration requires a precise metric configuration (NEJ → negative DC → nanoampere threshold → dedifferentiation). Becker’s 1 V/m threshold means, in Lindgren’s terms: external perturbation exceeds the bifurcation threshold → the metric state no longer reaches the stationary solution enabling regeneration. 1 V/m is 100× below safety limits but sufficient to disrupt a nanoampere-sensitive geometric process.",
        proxyNote:
          "Conventional attribution: chytrid fungus (Bd) + habitat loss. Problem: population declines were documented from the late 1950s/early 1960s — decades before Bd was identified in 1998. ‘Enigmatic declines’ occurred in pristine habitats with no detected pathogens, no habitat loss, and no chemical contamination. The term ‘enigmatic’ is itself an admission that the conventional explanations fail. BERM proposes that EMF is the unidentified factor in enigmatic declines.",
        references: [
          "IUCN 2023. Global Amphibian Assessment. 41% threatened.",
          "Becker 1985. Body Electric. Regeneration lost at >1 V/m.",
          "Balmori 2006. Electromagn. Biol. Med. Frogs and base stations.",
          "Stuart et al. 2004. Science. Coined ‘enigmatic decline’.",
        ],
      },
      {
        id: "bees",
        title: "Bees: Colony Collapse and the VGCC Connection",
        biology:
          "Bees are a critical pollinator: 75% of crops depend on them. Colony Collapse Disorder (CCD) appeared in 2006 and has continued at 30–40% annual losses. Bee navigation relies on magnetite crystals and possibly CRY proteins.",
        emfSensitivity:
          "Bee VGCCs regulate vibration signaling (waggle dance) which communicates food source locations. Navigation partially depends on the geomagnetic field. Favre 2011: mobile phone signal triggered ‘piping’ (swarming readiness) in a bee colony. Sharma & Kumar 2010: phone RF reduced bee return rate by 50%.",
        documentedDecline:
          "USA: annual loss 30–40% (2006–2024). Europe: similar trend. CCD’s ‘hallmark’: workers don’t return to the hive but the queen and brood are fine — suggesting a navigation disruption. Pesticides (neonicotinoids) explain part of it but CCD continues even in areas where neonicotinoids are banned.",
        bermPrediction:
          "BERM predicts CCD is partially EMF-mediated: (1) navigation disruption (magnetite + CRY → RPM disruption), (2) VGCC disruption in vibration signaling → communication weakens, (3) immunosuppression (HPA equivalent in insects) → disease resistance drops. CCD’s timing (2006) coincides with widespread 3G deployment.",
        lindgrenNote:
          "Bee navigation is a biological χ(Ā) implementation: magnetite crystals measure the geomagnetic background Ā and CRY produces a chemical signal guiding flight direction. RF field disrupts both: magnetite measurement becomes noisy and CRY radical pair spin dynamics are disturbed. The bee is ‘blinder’ to the geomagnetic field → can’t find home.",
        proxyNote:
          "Conventional attribution: Varroa mite + neonicotinoids + pathogens. Problem: CCD’s defining symptom — adult workers vanishing without dead bees — is a navigation failure, not a disease symptom. CCD appeared in 2006 simultaneously across the US and Europe, inconsistent with pathogen spread but consistent with simultaneous 3G infrastructure rollout. Colony losses continue in regions where neonicotinoids have been banned (EU since 2018). No single conventional factor explains CCD; the official position remains ‘complex and multi-factorial.’",
        references: [
          "Favre 2011. Apidologie. Mobile signal triggered piping.",
          "Sharma & Kumar 2010. Current Sci. RF reduced return rate by 50%.",
          "Shepherd et al. 2018. PLOS ONE. CCD and environmental factors.",
          "Vanbergen & Insect Pollinators Initiative 2013. Ecol. Lett.",
        ],
      },
      {
        id: "birds",
        title: "Birds: The Magnetic Compass Disrupted",
        biology:
          "Bird magnetic compass relies on the cryptochrome (CRY) radical pair mechanism (RPM) in the retina. This is the best-documented biological magnetoreceptor. Bird populations have declined 29% in North America since 1970 (Rosenberg et al. 2019: 3 billion fewer birds).",
        emfSensitivity:
          "Ritz et al. 2004 (Nature): RF field at the Larmor frequency disrupts the European robin’s magnetic compass. This is direct experimental confirmation of the RPM mechanism. Engels et al. 2014: urban electromagnetic noise disrupts robin orientation. The effect disappears when EMF is filtered from the 0.1–10 MHz range.",
        documentedDecline:
          "Rosenberg et al. 2019 (Science): 2.9 billion fewer birds in North America 1970–2018 (−29%). The decline affects common species, not just threatened ones. Largest decline in passerines (−53%) which are small and thus more sensitive to EMF.",
        bermPrediction:
          "BERM predicts birds are especially sensitive via the RPM/CRY channel: navigation is disrupted → migration routes fail → mortality increases. Reproductive effects: CRY regulates circadian rhythm → egg-laying behavior is disrupted. Delgado’s chicken embryo experiment (0.001 gauss, 100 Hz): severe central nervous system defects → embryonic stage especially sensitive.",
        lindgrenNote:
          "CRY’s RPM mechanism is a quantum mechanical process where spin pair singlet/triplet fractions depend on the external magnetic field. In Lindgren’s framework this is spin susceptibility χ_B = ∂Φ_S/∂B which is a different function from geometric χ(Ā). χ_B is non-monotonic: sensitivity is greatest at the geomagnetic level and decreases in stronger fields. RF field at Larmor frequency ‘scrambles’ spin states → χ_B → 0 → magnetic compass loses directional information.",
        proxyNote:
          "Conventional attribution: habitat loss + cats + window collisions + pesticides. Problem: the largest declines are in common species (not habitat specialists), in grassland birds (not urban birds exposed to cats/windows), and the decline rate (−29% over 48 years) is remarkably uniform across diverse habitats. Grassland birds declined −53% — but grassland habitat in North America has been relatively stable since the 1970s. The decline correlates temporally with ELF power grid expansion and UHF television coverage.",
        references: [
          "Ritz et al. 2004. Nature. RF disrupts magnetic compass at Larmor frequency.",
          "Engels et al. 2014. Nature. Urban EM noise disrupts navigation.",
          "Rosenberg et al. 2019. Science. −29% bird population 1970–2018.",
          "Delgado (Becker). 0.001 gauss pulse field → embryonic defects.",
        ],
      },
      {
        id: "bats",
        title: "Bats: Echolocation Meets EMF",
        biology:
          "Bats use echolocation (ultrasound sonar, 20–200 kHz) and magnetic compass for navigation. VGCC conservation 90%. White-nose syndrome has devastated populations in North America since 2006+.",
        emfSensitivity:
          "Bat echolocation relies on sensitive auditory receptors that are VGCC-dependent. EMF disruption of high-frequency hearing would impair hunting efficiency. Magnetoreception in bats has been experimentally confirmed (Wang et al. 2007).",
        documentedDecline:
          "North America: white-nose syndrome + population decline since 2006+. Europe: several species declining. Bat immunosuppression (root cause of WNS) is compatible with EMF-mediated HPA activation.",
        bermPrediction:
          "BERM predicts bats are sensitive through three pathways: VGCC (echolocation regulation), RPM/CRY (navigation), and HPA (immunosuppression predisposing to WNS). WNS timing (2006) is the same as CCD — both coincide with widespread 3G deployment.",
        lindgrenNote:
          "Bat echolocation is a high-frequency VGCC-dependent process. The cochlear hair cells rely on CaV1.3 channels for mechanoelectrical transduction. EMF-induced VGCC perturbation at the cochlear level would degrade the signal-to-noise ratio of echolocation — reducing effective hunting range before any overt hearing loss is detectable.",
        proxyNote: "",
        references: [
          "Wang et al. 2007. J. Exp. Biol. Bat magnetoreception.",
          "Frick et al. 2010. Science. WNS and population decline.",
        ],
      },
      {
        id: "lab-mammals",
        title: "Laboratory Mammals: Controlled Evidence",
        biology:
          "Laboratory rats and mice are the primary species for controlled EMF research. Thousands of studies: sperm quality, fertility, offspring anomalies, hormone levels.",
        emfSensitivity:
          "VGCC conservation 94% (nearly identical to humans). Laboratory rat spermatogenesis cycle is 52 days (human 74 days) → effects appear faster.",
        documentedDecline:
          "Guy’s experiment (Cross Currents): 25 months, 2.45 GHz, 0.5 mW/cm² (20× below safety limit) → 3.6× cancer risk in stress response organs. Czerski 1979: sperm chromosomal damage across the entire safety limit range. Soviet studies 1976: 50–500 μW → birth problems, stillbirths from 1.1% to 7%. Panagopoulos (Drosophila): RF reduced fertility dose-dependently.",
        bermPrediction:
          "Laboratory data confirms each BERM pathway in animals: VGCC→ROS→SDF (pathway A), HPA→cortisol (pathway D, Guy), BBB permeability (pathway E, Salford). Laboratory data limitation: the lab’s own EMF background (BERM’s laboratory baseline shift) may underestimate the effect because the control group is also exposed.",
        lindgrenNote:
          "Laboratory EMF background (~10 V/m) produces χ(Ā_lab) ≈ 1.0 (saturated). This means ALL laboratory cells are maximally sensitive. ‘Historical baseline shift’ — the rise in spontaneous cancer, infertility, and metabolic syndrome in laboratory rodents from 1940–2024 — correlates with laboratory electrification levels. The control group IS NOT a healthy baseline but is chronically EMF-exposed.",
        proxyNote:
          "Conventional attribution: controlled conditions eliminate confounders. Problem: the ‘control’ group in any modern laboratory is chronically exposed to EMF from incubators (measured ELF fields), centrifuges, computers, Wi-Fi, and LED lighting. A 2023 biorxiv study documented significant and spatially inhomogeneous magnetic field backgrounds in CO₂ incubators depending on device type and laboratory position. The control group is not EMF-free — it is EMF-saturated. This means every ‘no effect’ finding in EMF research underestimates the true effect by the magnitude of the control group’s exposure.",
        references: [
          "Guy 1984 / Becker Cross Currents. 2.45 GHz, 25 mo, 3.6× cancer.",
          "Czerski 1979. Sperm chromosomal damage across safety limit range.",
          "Salford et al. 2003. BBB permeability at SAR 0.012 W/kg.",
          "Panagopoulos et al. 2004. Drosophila fertility.",
        ],
      },
    ] as SpeciesSection[],
  },

  fi: {
    /* metadata */
    metaTitle: "Indikaattorilajit - Extinction Field",
    metaDescription:
      "Indikaattorilajien näyttö: lisääntymisen vähenemä hyönteisissä, sammakkoeläimissä, mehiläisissä, linnuissa, lepakoissa ja laboratorioeläimissä eliminoi kaikki inhimilliset sekoittavat tekijät.",

    /* header */
    title:
      "Indikaattorilajit: Todisteet joita ei voi selittää sosiaalisilla tekijöillä",
    headerP1:
      "Jokainen perinteinen selitys syntyvyyden laskulle — koulutus, kaupungistuminen, ehkäisy, taloudelliset paineet, sosiaalinen media — koskee ainoastaan ihmisiä. Jos sama lisääntymisen vähenemä ilmenee hyönteisissä, sammakkoeläimissä, linnuissa ja nisäkkäissä, jotka eivät jaa mitään näistä sosiaalisista tekijöistä, syyn täytyy olla biologinen. Ainoa ympäristömuutos, joka vaikuttaa kaikkiin lajeihin samanaikaisesti, kaikilla mantereilla, samassa aikaskaalassa kuin havaitut vähenemät, on sähkömagneettinen kenttäympäristö.",
    headerP2Before:
      "BERM ennustaa, että kaikki lajit joilla on jänniteherkiä kalsiumkanavia (VGCC) ovat alttiita EMF-välitteisille lisääntymisvaikutuksille. VGCC:t ovat evoluutiossa konservoituneet kaikissa aitotumallisissa — L-tyypin VGCC-proteiinisekvenssi on >70% identtinen pääjaksojen välillä (nisäkäs 94%, lintu 87%, sammakkoeläin 82%, hyönteinen 73%). Tämä konservaatio ei ole sattumaa: ",
    lindgrenLinkText: "Lindgrenin viitekehyksessä",
    headerP2Mid:
      " VGCC:n herkkyys sähkömagneettisille kentille on ",
    membraneLinkText: "kalvopotentiaalin",
    headerP2After:
      " geometrinen ominaisuus, ei lajikohtainen sopeutuma. Kaikki solut joiden V",
    headerP2Final:
      " ≈ −70 mV ovat maksimaalisesti herkkiä.",

    /* convergence table */
    convergenceTitle: "Konvergenssitaulukko",
    thSpecies: "Laji",
    thVGCC: "VGCC-konservaatio",
    thAbsorption: "Absorptioherkkyys",
    thDecline: "Dokumentoitu vähenemä",
    thBERM: "BERM-ennuste",
    thMatch: "Vastaavuus",

    /* temporal correlations */
    temporalTitle: "Ajalliset korrelaatiot",
    temporalDesc:
      "Nämä ovat korrelaatioita, eivät todiste kausaalisuudesta. Ajallinen yhteensattuma riippumattomien lajien välillä kuitenkin vahvistaa perustelua yhteiselle ympäristötekijälle.",
    thEvent: "Tapahtuma",
    thOnset: "Alkamisajankohta",
    thEMFMilestone: "EMF-virstanpylväs",
    thLag: "Viive",
    temporalNote:
      "Huom: ajallinen korrelaatio ei todista kausaalisuutta. Nämä yhteensattumat esitetään hypoteesin kanssa yhteensopivina havaintoina, eivät todisteina sinänsä. Mekanistinen reitti (VGCC/Ca²⁺) tarjoaa kausaalisen yhteyden; ajoitus tarjoaa uskottavuuden.",

    /* species section labels */
    lblBiology: "Biologia",
    lblEMFSensitivity: "EMF-herkkyys",
    lblDocumentedDecline: "Dokumentoitu vähenemä",
    lblBERMPrediction: "BERM-ennuste",
    lblLindgrenInterpretation: "Lindgren-tulkinta",
    lblKeyReferences: "Keskeiset lähteet",

    /* laboratory baseline bias */
    labBiasTitle:
      "Laboratorion perustason harha: Miksi kaikki kontrolloidut tutkimukset aliarvioivat vaikutusta",
    labBiasP1Before:
      "Jokainen laboratorion EMF-tutkimus vertaa 'altistettua' ryhmää 'kontrolliryhmään'. Mutta kontrolliryhmä ei ole altistumaton — se elää laboratoriossa, jossa tausta-EMF on noin 10 V/m valaistuksesta, laitteista ja rakennuksen johdotuksesta. ",
    labBiasSelectionRuleLinkText: "Lindgrenin valintasäännössä",
    labBiasP1After:
      " χ(Ā_lab) ≈ 1,0 (saturoitunut). Molemmat ryhmät ovat maksimaalisessa VGCC-herkkyydessä.",
    labBiasP2:
      "Tämä tarkoittaa, että mitattu vaikutuskoko (altistettu miinus kontrolli) kuvaa vain lisä-EMF-häiriön, ei kokonaisvaikutusta. Todellinen vaikutus on ero altistetun ryhmän ja aidosti altistumattoman biologisen perustason välillä — jota yksikään moderni laboratorio ei tarjoa.",
    labBiasThObservation: "Havainto",
    labBiasThPeriod: "Ajanjakso",
    labBiasThImplication: "Johtopäätös",
    labBiasNoteBefore:
      "Tämä ei ole kritiikki laboratoriomenetelmää kohtaan — se on rakenteellinen rajoitus. Kaikkia julkaistuja EMF-vaikutuskokoja tulisi tulkita alarajoina. Katso ",
    labBiasValidationLinkText: "§10: Farmakologinen validointi",
    labBiasNoteAfter:
      " siitä, miten lääkekalibrointi osittain korjaa tämän harhan.",

    /* convergence conclusion */
    convergenceConclTitle:
      "Konvergenssi: Seitsemän pääjaksoa, yksi mekanismi",
    convergenceConclP:
      "Seitsemän riippumatonta todistuslinjaa — hyönteiset, sammakkoeläimet, mehiläiset, linnut, lepakot, laboratorioeläimet ja ihmiset — kaikki osoittavat saman kaavan: lisääntymisen vähenemä, joka korreloi sähkömagneettisen kenttäaltistuksen kanssa ja toimii saman konservoituneen molekulaarisen mekanismin (VGCC/Ca²⁺) kautta. Mikään sosiaalinen selitys — koulutus, talous, ehkäisy, kulttuurimuutos — ei koske mitään muuta kuin ihmislajia. Ainoa ympäristömuutos, joka on samanaikaisesti globaali, tuore (1990 jälkeen) ja biologisesti aktiivinen havaituilla altistustasoilla, on ihmisen aiheuttama sähkömagneettinen kenttä.",
    convergenceConclNoteBefore:
      "Täydellinen matemaattinen johtaminen VGCC-mekanismista ja siitä miten se tuottaa kvantitatiivisia TFR-ennusteita, katso ",
    convergenceConclMathLinkText: "Matemaattinen perusta",
    convergenceConclNoteAfter: ".",

    /* proxy masking section */
    proxyTitle: "Miksi perinteiset selitykset eivät riitä",
    proxySubtitle:
      "Jokaisella lajin vähenemällä on tuttu selitys. Yksikään niistä ei selitä konvergenssia.",
    proxyThExplanation: "Selitys",
    proxyColInsects: "Hyönteiset",
    proxyColAmphibians: "Sammakkoel.",
    proxyColBees: "Mehiläiset",
    proxyColBirds: "Linnut",
    proxyColSperm: "Siittiöt",
    proxyColTfr: "TFR",
    proxyColWeakness: "Kriittinen heikkous",
    proxyThreeTitle: "Kolme tapaa joilla perinteiset selitykset peittävät EMF-signaalin",
    proxyP1:
      "Kun vähenemä havaitaan — hyönteisten biomassassa, sammakkoeläinten populaatioissa tai ihmisten hedelmällisyydessä — tutkijat etsivät selityksiä tuttujen tekijöiden joukosta. Ilmastonmuutos on hyvin rahoitettu ja poliittisesti tuettu. Kemiallinen saastuminen on säädeltyä ja mitattavissa. EMF on vieras useimmille biologeille, rahoittamaton useimmille virastoille ja telekommunikaatioteollisuuden aktiivisesti vastustama. Tulos ei ole salaliitto vaan rakenteellinen vinouma: EMF:ää ei testata koska se ei ole tutkijan käsitemaailmassa. Vuoden 2024 analyysi 92 potentiaalisesta hyönteisten vähenemän ajurista Saksassa ei sisältänyt sähkömagneettisia kenttiä kandidaattien joukossa — ei siksi, että EMF olisi testattu ja hylätty, vaan koska sitä ei koskaan harkittu.",
    proxyP2:
      "On satoja tutkimuksia ilmastonmuutoksesta ja hyönteisten vähenemästä. EMF:stä ja hyönteisten vähenemästä on alle kaksikymmentä. Tämä epäsuhta ei heijasta näiden kahden tekijän suhteellista merkitystä — se heijastaa tutkimusrahoituksen rakennetta. Näytön volyymi hypoteesille seuraa rahoituksen volyymia, ei kausaalisen suhteen vahvuutta. Kun arvioija toteaa, että 'näyttö ilmastovaikutuksista on vahvempaa kuin EMF-vaikutuksista,' hän mittaa tutkimussijoitusta, ei biologista todellisuutta.",
    proxyP3:
      "Ilmastonmuutos ja EMF-infrastruktuuri ovat ajallisesti korreloituneet: molemmat kasvoivat 1970–2024 välillä. OLS-regressio ei voi erottaa niitä ilman eksogeenista instrumenttia. Kun tutkija kontrolloi 'lämpötilaa' regressiossa, hän saattaa tahattomasti poistaa EMF-signaalin — koska lämpötilatrendit ja EMF-infrastruktuuritrendit kulkevat yhdessä. Residuaali näyttää pieneltä ja tutkija päättelee, että ilmasto selittää vähenemän. Mutta tutkija ei ole kontrolloinut EMF:ää; hän on kontrolloinut sen korrelaattia. Tämä ei ole virhe tutkijan analyysissä — se on rakenteellinen rajoitus havaintoaineistossa, joka voidaan ratkaista vain kokeellisella interventiolla (Faraday-suojattu replikaatio) tai instrumenttimuuttuja-analyysillä (5G-huutokauppojen ajoitus instrumenttina).",
    proxyP1Label: "Attribuutiovinouma",
    proxyP2Label: "Näytön epäsymmetria",
    proxyP3Label: "Kausaalinen peittäminen",
    proxyAttrLabel: "Attribuutioanalyysi",

    /* human proxy masking */
    proxyHumanTitle: "Ihmisten hedelmallisyys: Yhteiskuntatieteelliset selitykset hormonaalisina proxy-muuttujina",
    proxyHumanIntro:
      "Kun yhteiskuntatieteilijat havaitsevat hedelmallisyyden laskun, he dokumentoivat todellisia kaavoja: miehet sitoutuvat vahemman, naiset raportoivat korkeampia standardeja, parit sanovat olevansa liian kiireisia, hedelmattomyysdiagnoosit lisaantyvat ja urat asetetaan lasten edelle. Jokainen havainto on tarkka. Mutta jokaisella on hormonaalinen substraatti, jota yhteiskuntatieteellinen kehys ei tavoita. Nelinkertainen suppressiomalli (§5) nayttaa miten EMF-valitteiset hormonaaliset muutokset tuottavat tarkalleen ne kayttaytymismallit, jotka yhteiskuntatieteilijat attribuoivat kulttuurille.",
    proxyHumanThSocial: "Yhteiskuntatieteellinen havainto",
    proxyHumanThBERM: "BERM-tulkinta",
    proxyHumanThMechanism: "Hormonaalinen mekanismi",
    proxyHumanNote:
      "Tama kartoitus on luonteeltaan spekulatiivista: kausaaliketjua populaatiotason T-laskusta populaatiotason kayttaytymismuutokseen ei ole testattu kokonaisuutena. Yksilotason yhteydet ovat vakiintuneita (RCT:t: Dreher 2016, Goetz 2024), mutta ekologinen paattely sisaltaa epavarmuutta. Dual-hormone -meta-analyysin efektikoko on pieni (r = -0,061). Kulttuuri ON todellinen — ehkaisyn saatavuus, koulutus ja taloudelliset mahdollisuudet vaikuttavat aidosti hedelmallisyysvalintoihin. BERM vaittaa etta osa siita mika nayttaa kulttuuriselta on hormonaalisesti mediatoitua, ei etta kulttuuri on irrelevantti.",
    humanProxyRows: [
      {
        socialExplanation: "\"Miehet eivat halua sitoutua\"",
        bermInterpretation: "T-lasku vahentaa lahestymismotivaatiota (P_approach). Miehet aloittavat harvemmin romanttisia kontakteja ei preferenssimuutoksen vaan hormonaalisen driven suppression takia.",
        mechanism: "T↓ → lahestymismotivaatio↓ (Puts 2008, n=119)",
      },
      {
        socialExplanation: "\"Naisten standardit ovat liian korkealla\"",
        bermInterpretation: "Populaatiotason T-lasku heikentaa signaalia jonka naiset kehittyivat havaitsemaan. Signaali on objektiivisesti heikentynyt; standardit eivat ole nousseet — signaali-kohinasuhde on laskenut.",
        mechanism: "T↓ → attraktiosignaali↓ (Thornhill & Gangestad 1994)",
      },
      {
        socialExplanation: "\"Parit ovat liian kiireisia/stressaantuneita\"",
        bermInterpretation: "Kortisolinnousu estaa dual-hormone -portin. Jaannostestosteronikaan ei voi ilmeta kayttaytymisessa kun kortisoli on korkea. Stressi on osittain EMF-valitteista.",
        mechanism: "Kortisoli↑ → dual-hormone -lukko (Mehta 2015, meta N=8538)",
      },
      {
        socialExplanation: "\"Hedelmattomyys lisaantyy\"",
        bermInterpretation: "Suora sukusolujen vaurioituminen ROS/SDF-reitin kautta. Tama on biologinen komponentti johon mikaan sosiaalinen selitys ei puutu.",
        mechanism: "EMF → VGCC → ROS → siittioiden DNA-fragmentaatio (Reitti A)",
      },
      {
        socialExplanation: "\"Ura lasten edelle\"",
        bermInterpretation: "OT-lasku vahentaa parisidoksen palkitsevuutta. Subjektiivinen kokemus 'uran suosimisesta' on erottamaton pariutumisen neurokemiallisen palkinnon vahenemisesta.",
        mechanism: "OT↓ → parisidospalkinto↓ → P(seksi parin sisalla)↓",
      },
    ] as HumanProxyRow[],

    /* temporal timeline */
    timelineTitle: "Ajallinen korrelaatioaikajana",
    timelineDesc:
      "Siirrä liukusäädintä nähdäksesi miten EMF-infrastruktuurin virstanpylväät ja lajien vähenemätapahtumat osuvat ajallisesti yhteen. Jokainen vähenemän alku osuu EMF-käyttöönottovaiheeseen 0–3 vuoden sisällä.",
    timelineEmfLabel: "EMF-infrastruktuuri",
    timelineDeclineLabel: "Lajien vähenemä",
    timelineYearLabel: "Vuosi",
    timelineNote:
      "Ajallinen yhteensattuma ei ole kausaalisuus. Mekanistinen yhteys (VGCC/Ca²⁺-konservaatio pääjaksojen välillä) tarjoaa kausaalisen hypoteesin; ajallinen yhteneväisyys tarjoaa uskottavuuden.",

    /* convergence explanation table */
    explTableTitle:
      "Konvergenssitesti: Voiko mikään perinteinen selitys kattaa kaikki lajit?",
    explTableDesc:
      "Jokainen rivi on perinteinen selitys populaation vähenemälle. Jokainen sarake on lajiryhmä. Keskeinen havainto: mikään yksittäinen perinteinen selitys ei saa 'kyllä' kaikkiin sarakkeisiin. EMF VGCC-mekanismin kautta on ainoa hypoteesi, joka soveltuu kaikkiin seitsemään samanaikaisesti.",
    explThExplanation: "Perinteinen selitys",
    explColInsects: "Hyönteiset",
    explColAmphibians: "Sammakkoel.",
    explColBees: "Mehiläiset",
    explColBirds: "Linnut",
    explColBats: "Lepakot",
    explColLabMammals: "Laboratorio",
    explColHumans: "Ihmiset",
    explYes: "Kyllä",
    explNo: "Ei",
    explPartial: "Osittain",
    explNote:
      "Vain EMF/VGCC-rivi on 'kyllä' kaikkien lajien kohdalla. Tämä ei todista, että EMF on syy — se osoittaa, ettei mikään perinteinen vaihtoehto voi olla ainoa syy kaikkien taksonien osalta.",

    /* --- data arrays --- */

    timelineEmfEvents: [
      { year: 1953, label: "TV-lähetykset", color: "#3B82F6" },
      { year: 1970, label: "Mikroaaltouunit", color: "#3B82F6" },
      { year: 1983, label: "1G-matkapuhelimet", color: "#60A5FA" },
      { year: 1991, label: "GSM 2G", color: "#2563EB" },
      { year: 1997, label: "Wi-Fi 802.11", color: "#60A5FA" },
      { year: 2001, label: "3G UMTS", color: "#2563EB" },
      { year: 2007, label: "Älypuhelinaika", color: "#1D4ED8" },
      { year: 2009, label: "4G LTE", color: "#2563EB" },
      { year: 2019, label: "5G NR", color: "#1D4ED8" },
    ] as TimelineEvent[],

    timelineDeclineEvents: [
      { year: 1970, label: "Lintujen vähenemä alkaa", color: "#F59E0B" },
      { year: 1995, label: "Hyönteisromahdus (Krefeld)", color: "#EF4444" },
      { year: 1998, label: "Sammakkoeläinten arvoituksellinen vähenemä", color: "#F97316" },
      { year: 2000, label: "Ihmisten siittiövähenemä kiihtyy", color: "#DC2626" },
      { year: 2006, label: "CCD (mehiläiset) + WNS (lepakot)", color: "#EF4444" },
    ] as TimelineEvent[],

    explanationRows: [
      {
        explanation: "Torjunta-aineet / kemikaalit",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "no", labMammals: "no", humans: "partial",
      },
      {
        explanation: "Ilmastonmuutos",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Taudit / patogeenit",
        insects: "no", amphibians: "partial", bees: "partial",
        birds: "no", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Elinympäristön menetys",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", bats: "partial", labMammals: "no", humans: "no",
      },
      {
        explanation: "Valosaaste",
        insects: "partial", amphibians: "no", bees: "no",
        birds: "partial", bats: "partial", labMammals: "no", humans: "partial",
      },
      {
        explanation: "Koulutus / talous",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", bats: "no", labMammals: "no", humans: "yes",
      },
      {
        explanation: "Ehkäisy",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", bats: "no", labMammals: "no", humans: "yes",
      },
      {
        explanation: "EMF / VGCC-mekanismi",
        insects: "yes", amphibians: "yes", bees: "yes",
        birds: "yes", bats: "yes", labMammals: "yes", humans: "yes",
      },
    ] as ExplanationRow[],

    proxyMaskingRows: [
      {
        explanation: "Torjunta-aineet / kemikaalit",
        insects: "partial", amphibians: "partial", bees: "partial",
        birds: "partial", sperm: "partial", tfr: "no",
        weakness: "Vähenemät tapahtuvat suojelualueilla ilman torjunta-aineita (Krefeld). Siittiöiden vähenemä jatkuu maissa joissa kemikaalialtistus vähenee. TFR:n laskulle ei ole kemiallista mekanismia.",
      },
      {
        explanation: "Ilmastonmuutos",
        insects: "no", amphibians: "partial", bees: "no",
        birds: "partial", sperm: "no", tfr: "no",
        weakness: "Krefeld-data: lämpimämmät lämpötilat LISÄÄVÄT hyönteisten biomassaa. Mikään ilmastomalli ei ennusta siittiöiden vähenemää tai TFR:n romahdusta. Ilmastonmuutos on globaali mutta hedelmällisyyden lasku korreloi EMF-infrastruktuurin, ei lämpötilan kanssa.",
      },
      {
        explanation: "Elinympäristön menetys",
        insects: "no", amphibians: "partial", bees: "no",
        birds: "partial", sperm: "no", tfr: "no",
        weakness: "Krefeldin tutkimuspaikat ovat suojeltuja luonnonsuojelualueita — ei elinympäristön menetystä. CCD tapahtuu hoidetuissa pesissä runsailla resursseilla. Siittiöiden vähenemä tapahtuu miehissä jotka eivät ole menettäneet elinympäristöään.",
      },
      {
        explanation: "Taudit (chytrid, Varroa)",
        insects: "no", amphibians: "partial", bees: "partial",
        birds: "no", sperm: "no", tfr: "no",
        weakness: "Sammakkoeläinten vähenemät alkoivat ennen chytridin tunnistamista (1980 vs 1998). 'Arvoitukselliset vähenemät' tapahtuvat ilman havaittuja patogeenejä. CCD jatkuu Varroa-hoidon jälkeen. Mikään tauti ei selitä siittiöiden vähenemää.",
      },
      {
        explanation: "Koulutus / kaupungistuminen",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", sperm: "no", tfr: "partial",
        weakness: "Koskee vain ihmisiä. Ei selitä mitään ei-inhimillistä vähenemää. Koirat eivät käy yliopistossa. Amishien TFR 6,4 huolimatta koulutettujen populaatioiden läheisyydestä.",
      },
      {
        explanation: "Ehkäisy / valinta",
        insects: "no", amphibians: "no", bees: "no",
        birds: "no", sperm: "no", tfr: "partial",
        weakness: "Koskee vain ihmisiä. Selittää TFR:n osittain mutta ei siittiöiden vähenemää (biologinen, ei käyttäytymiseen perustuva). Ehkäisyn saatavuus on vakaa Pohjoismaissa mutta TFR laskee edelleen.",
      },
      {
        explanation: "EMF (VGCC/RPM-mekanismi)",
        insects: "yes", amphibians: "yes", bees: "yes",
        birds: "yes", sperm: "yes", tfr: "yes",
        weakness: "Mekanismi on konservoitunut kaikissa aitotumallisissa (VGCC 73–94% identtinen). Ainoa kandidaatti joka selittää kaikki kuusi samanaikaisesti. Ajallinen korrelaatio infrastruktuurin käyttöönoton kanssa. Ei vielä todistettu RCT:llä.",
      },
    ] as ProxyMaskingRow[],

    convergenceTable: [
      {
        species: "Hyönteiset",
        vgccConservation: "73%",
        absorptionSensitivity: "Korkea (koko ≈ λ)",
        documentedDecline: "−75% biomassa / 27 v (Krefeld)",
        bermPrediction: "Herkin ryhmä",
      },
      {
        species: "Sammakkoeläimet",
        vgccConservation: "82%",
        absorptionSensitivity: "8,7× nisäkkäät",
        documentedDecline: "−41% populaatio (IUCN)",
        bermPrediction: "Herkin selkärankainen",
      },
      {
        species: "Mehiläiset",
        vgccConservation: "73%",
        absorptionSensitivity: "Korkea + navigointi",
        documentedDecline: "CCD, 30–40% vuosittain",
        bermPrediction: "Navigointi + VGCC",
      },
      {
        species: "Linnut",
        vgccConservation: "87%",
        absorptionSensitivity: "Keskitaso + magneettinen kompassi",
        documentedDecline: "−29% Pohjois-Amerikka 1970+",
        bermPrediction: "RPM/CRY-häiriö",
      },
      {
        species: "Lepakot",
        vgccConservation: "90%",
        absorptionSensitivity: "Korkea (kaikuluotaustaajuus)",
        documentedDecline: "White-nose + populaatio↓",
        bermPrediction: "Immuuni + navigointi",
      },
      {
        species: "Nisäkkäät (laboratorio)",
        vgccConservation: "94%",
        absorptionSensitivity: "1× (perustaso)",
        documentedDecline: "Siittiöt↓, hedelmällisyys↓",
        bermPrediction: "Kontrolloidut kokeet",
      },
      {
        species: "Ihmiset",
        vgccConservation: "94%",
        absorptionSensitivity: "1× + teknologian käyttö",
        documentedDecline: "TFR↓, siittiöt −51%",
        bermPrediction: "Kumulatiivinen altistus",
      },
    ] as SentinelRow[],

    temporalRows: [
      {
        event: "Krefeldin hyönteisvähenemän kiihtyminen",
        onset: "~1995",
        emfMilestone: "GSM-käyttöönotto Saksassa (1992)",
        lag: "~3 v",
      },
      {
        event: "Colony Collapse Disorder",
        onset: "2006",
        emfMilestone: "3G laaja käyttöönotto (2004–06)",
        lag: "0–2 v",
      },
      {
        event: "White-nose-syndrooma (lepakot)",
        onset: "2006",
        emfMilestone: "3G laaja käyttöönotto (2004–06)",
        lag: "0–2 v",
      },
      {
        event:
          "Sammakkoeläinten 'arvoituksellisen vähenemän' kiihtyminen",
        onset: "~1998",
        emfMilestone: "GSM globaali laajeneminen (1995–2000)",
        lag: "~3 v",
      },
      {
        event: "Ihmisten siittiöiden vähenemän kiihtyminen",
        onset: "~2000",
        emfMilestone: "Taskupuhelinkausi (2000+)",
        lag: "0 v",
      },
      {
        event: "Varpuslintujen vähenemä (−53%)",
        onset: "1970–2018",
        emfMilestone: "Asteittainen RF-tihentyminen",
        lag: "kumulatiivinen",
      },
    ] as TemporalRow[],

    labBiasRows: [
      {
        observation:
          "Spontaani kasvainaste laboratoriorotilla: 2% → 30%",
        period: "1940–2024",
        implication:
          "Korreloi laboratorion sähköistymisen kanssa",
      },
      {
        observation:
          "Laboratorion jyrsijöiden metabolisen oireyhtymän lisääntyminen",
        period: "1980–2024",
        implication:
          "'Kontrolli'-eläimet eivät ole terveitä perustasoja",
      },
      {
        observation:
          "Laboratorion jyrsijöiden hedelmällisyyden väheneminen vuosikymmenten aikana",
        period: "1970–2024",
        implication:
          "Rinnakkain ihmisten siittiöiden vähenemän kanssa",
      },
    ] as LabBiasRow[],

    species: [
      {
        id: "insects",
        title: "Hyönteiset: 75% romahdus",
        biology:
          "Hyönteiset ovat maanpäällisen biodiversiteetin perusta: ne pölyttävät 87% kukista, muodostavat ravintoketjun pohjan ja kierrättävät orgaanista ainesta. Niiden VGCC:t ovat 73% identtisiä ihmisten kanssa.",
        emfSensitivity:
          "Hyönteisen koko (mm–cm) on samaa suuruusluokkaa kuin GSM/Wi-Fi-aallonpituus (12 cm @ 2,4 GHz). Tämä tarkoittaa, että hyönteinen toimii resonanssiantennina — se absorboi RF-energiaa tehokkaammin kuin suurempi eläin. Thielens 2018: 3–6 dB absorptionlisäys 2G:stä 5G-taajuuksiin.",
        documentedDecline:
          "Krefeldin pitkäaikaistutkimus (Hallmann ym. 2017, PLOS ONE): lentävien hyönteisten biomassa väheni 75% 27 vuodessa (1989–2016) 63 suojelualueella Saksassa. Vähenemä tapahtui jopa suojelualueilla, joilla ei ollut torjunta-ainealtistusta tai maankäytön muutoksia. Sánchez-Bayo & Wyckhuys 2019: 40% hyönteislajeista vähenee, 33% on uhanalaisia. Vauhti on 2,5% vuodessa — nopeampaa kuin nisäkkäillä tai linnuilla.",
        bermPrediction:
          "BERM ennustaa, että hyönteiset ovat HERKIN ryhmä koska: (1) resonanssiantenneina ne absorboivat RF:ää tehokkaasti, (2) VGCC:t säätelevät lentolihaksen toimintaa ja navigointia, (3) ne ovat pieniä → SAR on suhteellisesti korkeampi, (4) ne ovat vaihtolampoisia → ei lämmönsäätelyä puskuriksi. Resonanssiantennivaikutus (kehon koko ≈ λ/2) on lajien välinen vastine yksilölliselle herkkyydelle — aivan kuten CACNA1C-genotyyppi moduloi ihmisen vastetta, kehon geometria moduloi lajitason vastetta.",
        lindgrenNote:
          "Lindgrenin viitekehyksessä hyönteisen koko on ratkaiseva: kun eläimen fyysinen koko on λ/2 (puolet aallonpituudesta), se toimii puoliaaltodipoliantennina absorboiden resonanssissa. 2,4 GHz: λ = 12,5 cm, λ/2 = 6,25 cm. Suuri perhonen tai kovakuoriainen on tämän kokoinen. 5G (3,5 GHz): λ/2 = 4,3 cm → pienemmät hyönteiset resonanssissa. Kun EMF-taajuus kasvaa (2G→5G), resonanssi siirtyy PIENEMPIIN hyönteisiin → laajempi lajivalikoima altistuu.",
        proxyNote:
          "Perinteinen attribuutio: torjunta-aineet + ilmastonmuutos. Ongelma: Krefeldin 63 tutkimuspaikkaa ovat suojeltuja luonnonsuojelualueita ilman torjunta-aineita. Naturen 2023 uudelleenanalyysi totesi, että sää selittää vuosittaisen vaihtelun mutta ei pitkäaikaista trendiä. 92 tekijän analyysi (2024) totesi: 'ei ilmeisiä yhteyksiä ilmastoon ja säähän tai kasvinsuojeluun.' Pitkäaikainen ajuri on kirjallisuudessa tunnistamaton. EMF ei ollut 92 testatun kandidaatin joukossa.",
        references: [
          "Hallmann et al. 2017. PLOS ONE. −75% biomassa 27 vuodessa.",
          "Sánchez-Bayo & Wyckhuys 2019. Biol. Conserv. 40% lajeista vähenee.",
          "Thielens et al. 2018. Sci. Rep. 3–6 dB absorptionlisäys 5G-taajuuksilla.",
          "Balmori 2015. Rev. Environ. Health. EMF ja hyönteisten väheneminen.",
        ],
      },
      {
        id: "amphibians",
        title: "Sammakkoeläimet: 8,7× herkemmät",
        biology:
          "Sammakkoeläimet (sammakot, salamanterit) ovat maapallon uhanalaisin selkärankaisryhmä: 41% lajeista on uhanalaisia (IUCN). Niiden iho on läpäisevä — se toimii hengityselinänä ja on siksi erityisen altis ympäristön sähkökentille.",
        emfSensitivity:
          "Sammakkoeläinten ihon sähköinen läpäisevyys on 8,7× korkeampi kuin nisäkkäillä (Becker). RF-absorptio on maksimaalista 0,3–3 GHz alueella — juuri matkapuhelin- ja Wi-Fi-taajuuksilla. Beckerin salamanteri menetti regeneraatiokyvyn yli 1 V/m ulkoisessa kentässä. Tämä on 100× nykyisten turvarajojen alapuolella.",
        documentedDecline:
          "IUCN 2023: 41% sammakkoeläinlajeista on uhanalaisia. Vähenemä on nopeampaa kuin missään muussa selkärankaisryhmässä. 'Arvoituksellinen vähenemä' — populaatiot katoavat jopa koskemattomilta alueilta ilman ilmeistä syytä (ei elinympariston menetystä, ei tautia, ei saalistusta). Balmori 2006: sammakoiden populaatiot ovat vähentyneet dramaattisesti tukiasemien lähellä.",
        bermPrediction:
          "BERM ennustaa, että sammakkoeläimet ovat HERKIN selkärankaisryhmä koska: (1) 8,7× absorptioherkkyys, (2) VGCC:t säätelevät hedelmöitysta (munasolun Ca²⁺-aalto), (3) ne kehittyvät ulkoisesti (ei kohdun suojaa), (4) Beckerin regeneraatiodata osoittaa suoraan DC-ohjausjärjestelmän häiriintymisen. Arvoituksellinen vähenemä on ilmiö jonka BERM ennustaa: populaatiot katoavat ilman paikallista syytä koska EMF on globaali.",
        lindgrenNote:
          "Salamanterin regeneraatio vaatii tarkan metrisen konfiguraation (NEJ → negatiivinen DC → nanoampeeriraja → dediferentiaatio). Beckerin 1 V/m raja tarkoittaa Lindgrenin termeissä: ulkoinen häiriö ylittaä bifurkaatiorajan → metrinen tila ei enää saavuta regeneraation mahdollistavaa stationaarista ratkaisua. 1 V/m on 100× turvarajojen alapuolella mutta riittävä häiritsemään nanoampeeriherkistä geometrista prosessia.",
        proxyNote:
          "Perinteinen attribuutio: chytrid-sieni (Bd) + elinympäristön menetys. Ongelma: populaatioiden vähenemät dokumentoitiin 1950-luvun lopulta/1960-luvun alusta — vuosikymmeniä ennen kuin Bd tunnistettiin 1998. 'Arvoitukselliset vähenemät' tapahtuivat koskemattomissa elinympäristöissä ilman havaittuja patogeenejä, elinympäristön menetystä tai kemiallista saastumista. Termi 'arvoituksellinen' on itsessään myöntö siitä, että perinteiset selitykset epäonnistuvat. BERM esittää, että EMF on tunnistamaton tekijä arvoituksellisissa vähenemissä.",
        references: [
          "IUCN 2023. Global Amphibian Assessment. 41% uhanalaisia.",
          "Becker 1985. Body Electric. Regeneraatiokyky menetettiin yli 1 V/m.",
          "Balmori 2006. Electromagn. Biol. Med. Sammakot ja tukiasemat.",
          "Stuart et al. 2004. Science. Termin 'arvoituksellinen vähenemä' alkuperä.",
        ],
      },
      {
        id: "bees",
        title: "Mehiläiset: Pesäkuolema ja VGCC-yhteys",
        biology:
          "Mehiläiset ovat kriittinen pölyttäjä: 75% viljelykasveista on niistä riippuvaisia. Colony Collapse Disorder (CCD) ilmestyi vuonna 2006 ja on jatkunut 30–40% vuosittaisina tappioina. Mehiläisten navigointi perustuu magnetiittikiteisiin ja mahdollisesti CRY-proteiineihin.",
        emfSensitivity:
          "Mehiläisten VGCC:t säätelevät värinäviestintää (waggle-tanssi), joka viestii ravintolähteiden sijainnit. Navigointi perustuu osittain geomagneettiseen kenttään. Favre 2011: matkapuhelinsignaali laukaisi 'piping'-käyttäytymisen (parveiluvalmiuden) mehiläisyhdyskunnassa. Sharma & Kumar 2010: puhelimen RF vähensi mehiläisten palautumisosuutta 50%.",
        documentedDecline:
          "USA: vuosittainen tappio 30–40% (2006–2024). Eurooppa: samankaltainen trendi. CCD:n 'tunnusmerkki': työläiset eivät palaa pesään mutta kuningatar ja sikiöt ovat kunnossa — viittaa navigointihäiriöön. Torjunta-aineet (neonikotinoidit) selivat osan, mutta CCD jatkuu myös alueilla joilla neonikotinoidit on kielletty.",
        bermPrediction:
          "BERM ennustaa, että CCD on osittain EMF-välitteinen: (1) navigointihäiriö (magnetiitti + CRY → RPM-häiriö), (2) VGCC-häiriö värinäviestinnässä → kommunikaatio heikkenee, (3) immunosuppressio (HPA-ekvivalentti hyönteisissä) → tautien vastustuskyky laskee. CCD:n ajoitus (2006) osuu yhteen laajan 3G-käyttöönoton kanssa.",
        lindgrenNote:
          "Mehiläisen navigointi on biologinen χ(Ā)-toteutus: magnetiittikiteet mittaavat geomagneettista taustaa Ā ja CRY tuottaa kemiallisen signaalin, joka ohjaa lentosuuntaa. RF-kenttä häiritsee molempia: magnetiittimittaus muuttuu kohinaiseksi ja CRY:n radikaaliparin spindynamiikka häiriintyy. Mehiläinen on 'sokeampi' geomagneettiselle kentälle → ei löydä kotiin.",
        proxyNote:
          "Perinteinen attribuutio: Varroa-punkki + neonikotinoidit + patogeenit. Ongelma: CCD:n määrittävä oire — aikuiset työläiset katoavat ilman kuolleita mehiläisiä — on navigointihäiriö, ei taudin oire. CCD ilmestyi 2006 samanaikaisesti eri puolilla USA:ta ja Eurooppaa, mikä on ristiriidassa patogeenien leviämisen mutta yhdenmukainen samanaikaisen 3G-infrastruktuurin käyttöönoton kanssa. Pesätappiot jatkuvat alueilla joilla neonikotinoidit on kielletty (EU vuodesta 2018). Yksikään perinteinen tekijä ei selitä CCD:tä; virallinen kanta on edelleen 'monimutkainen ja monitekijäinen.'",
        references: [
          "Favre 2011. Apidologie. Matkapuhelinsignaali laukaisi piping-käyttäytymisen.",
          "Sharma & Kumar 2010. Current Sci. RF vähensi palautumisosuutta 50%.",
          "Shepherd et al. 2018. PLOS ONE. CCD ja ympäristötekijät.",
          "Vanbergen & Insect Pollinators Initiative 2013. Ecol. Lett.",
        ],
      },
      {
        id: "birds",
        title: "Linnut: Magneettinen kompassi häiriytyy",
        biology:
          "Linnun magneettinen kompassi perustuu kryptokromi (CRY) -radikaaliparin mekanismiin (RPM) verkkokalvolla. Tämä on parhaiten dokumentoitu biologinen magnetoreseptori. Lintupopulaatiot ovat vähentyneet 29% Pohjois-Amerikassa vuodesta 1970 (Rosenberg ym. 2019: 3 miljardia lintua vähemmän).",
        emfSensitivity:
          "Ritz ym. 2004 (Nature): RF-kenttä Larmor-taajuudella häiritsee eurooppalaisen punarinnan magneettista kompassia. Tämä on suora kokeellinen vahvistus RPM-mekanismille. Engels ym. 2014: kaupunkien sähkömagneettinen kohina häiritsee punarinnan suuntautumista. Vaikutus katoaa kun EMF suodatetaan 0,1–10 MHz alueelta.",
        documentedDecline:
          "Rosenberg ym. 2019 (Science): 2,9 miljardia lintua vähemmän Pohjois-Amerikassa 1970–2018 (−29%). Vähenemä koskee yleisiä lajeja, ei vain uhanalaisia. Suurin vähenemä varpuslinnuissa (−53%), jotka ovat pieniä ja siten herkempiä EMF:lle.",
        bermPrediction:
          "BERM ennustaa, että linnut ovat erityisen herkkiä RPM/CRY-kanavan kautta: navigointi häiriytyy → muuttoreitit epäonnistuvat → kuolleisuus kasvaa. Lisääntymisvaikutukset: CRY säätelee vuorokausirytmiä → munintakayttaytyminen häiriytyy. Delgadon kananmunakoe (0,001 gauss, 100 Hz): vakavia keskushermoston kehityshäiriöitä → alkiovaihe erityisen herkkä.",
        lindgrenNote:
          "CRY:n RPM-mekanismi on kvanttimekaaninen prosessi, jossa spinparin singletti/tripletti-fraktiot riippuvat ulkoisesta magneettikentästä. Lindgrenin viitekehyksessä tämä on spinsuseptibiliteetti χ_B = ∂Φ_S/∂B, joka on eri funktio kuin geometrinen χ(Ā). χ_B on ei-monotoninen: herkkyys on suurin geomagneettisella tasolla ja vähenee vahvemmissa kentissä. RF-kenttä Larmor-taajuudella 'sekoittaa' spinitilat → χ_B → 0 → magneettinen kompassi menettää suuntatiedon.",
        proxyNote:
          "Perinteinen attribuutio: elinympäristön menetys + kissat + ikkunatörmäykset + torjunta-aineet. Ongelma: suurimmat vähenemät ovat yleislajeissa (ei elinympäristöspesialisteissa), niittylinuissa (ei kaupunkilinnuissa jotka altistuvat kissoille/ikkunoille), ja vähenemävauhti (−29% 48 vuodessa) on huomattavan tasainen eri elinympäristöissä. Niittylinnut vähenivät −53% — mutta niittyelinympäristö Pohjois-Amerikassa on ollut suhteellisen vakaa 1970-luvulta. Vähenemä korreloi ajallisesti ELF-voimaverkkojen laajentumisen ja UHF-television kattavuuden kanssa.",
        references: [
          "Ritz et al. 2004. Nature. RF häiritsee magneettista kompassia Larmor-taajuudella.",
          "Engels et al. 2014. Nature. Kaupunkien EM-kohina häiritsee navigointia.",
          "Rosenberg et al. 2019. Science. −29% lintupopulaatio 1970–2018.",
          "Delgado (Becker). 0,001 gauss pulssikenttä → alkiovaurioita.",
        ],
      },
      {
        id: "bats",
        title: "Lepakot: Kaikuluotaus kohtaa EMF:n",
        biology:
          "Lepakot käyttävät kaikuluotausta (ultraäänisonari, 20–200 kHz) ja magneettista kompassia navigointiin. VGCC-konservaatio 90%. White-nose-syndrooma on tuhonnut populaatioita Pohjois-Amerikassa vuodesta 2006+.",
        emfSensitivity:
          "Lepakon kaikuluotaus perustuu herkkiin kuuloreseptoreihin, jotka ovat VGCC-riippuvaisia. EMF:n aiheuttama häiriö korkeataajuisessa kuulossa heikentäisi saalistustehokkuutta. Lepakoiden magnetoreseptio on kokeellisesti vahvistettu (Wang ym. 2007).",
        documentedDecline:
          "Pohjois-Amerikka: white-nose-syndrooma + populaatiovähenemä vuodesta 2006+. Eurooppa: useat lajit vähenevät. Lepakoiden immunosuppressio (WNS:n juurisyy) on yhteensopiva EMF-välitteisen HPA-aktivaation kanssa.",
        bermPrediction:
          "BERM ennustaa, että lepakot ovat herkkiä kolmen reitin kautta: VGCC (kaikuluotauksen säätely), RPM/CRY (navigointi) ja HPA (immunosuppressio altistaen WNS:lle). WNS:n ajoitus (2006) on sama kuin CCD:n — molemmat osuvat yhteen laajan 3G-käyttöönoton kanssa.",
        lindgrenNote:
          "Lepakon kaikuluotaus on korkeataajuinen VGCC-riippuvainen prosessi. Sisäkorvan karvasolut tarvitsevat CaV1.3-kanavia mekaaniseen sähkönjohtamiseen. EMF:n aiheuttama VGCC-häiriö sisäkorvan tasolla heikentäisi kaikuluotauksen signaali-kohinasuhdetta — pienentäen tehokasta saalistusetaisyyttä ennen kuin havaittavissa olevaa kuulon heikkenemistä ilmenee.",
        proxyNote: "",
        references: [
          "Wang et al. 2007. J. Exp. Biol. Lepakoiden magnetoreseptio.",
          "Frick et al. 2010. Science. WNS ja populaatiovähenemä.",
        ],
      },
      {
        id: "lab-mammals",
        title: "Laboratorioeläimet: Kontrolloitu näyttö",
        biology:
          "Laboratoriorotat ja -hiiret ovat ensisijainen laji kontrolloidussa EMF-tutkimuksessa. Tuhansia tutkimuksia: siittiöiden laatu, hedelmällisyys, jälkeläisten poikkeavuudet, hormonitasot.",
        emfSensitivity:
          "VGCC-konservaatio 94% (lähes identtinen ihmisten kanssa). Laboratoriorotan spermatogeneesisykli on 52 päivää (ihmisen 74 päivää) → vaikutukset ilmenevät nopeammin.",
        documentedDecline:
          "Guyn koe (Cross Currents): 25 kuukautta, 2,45 GHz, 0,5 mW/cm² (20× turvarajan alapuolella) → 3,6× syöpäriski stressivasteelimissä. Czerski 1979: siittiöiden kromosomivaurioita koko turvaraja-alueella. Neuvostoliiton tutkimukset 1976: 50–500 μW → synnytysongelmat, kohtukuolemat 1,1%:sta 7%:iin. Panagopoulos (Drosophila): RF vähensi hedelmällisyyttä annosriippuvaisesti.",
        bermPrediction:
          "Laboratoriodata vahvistaa jokaisen BERM-reitin eläimissä: VGCC→ROS→SDF (reitti A), HPA→kortisoli (reitti D, Guy), BBB-läpäisevyys (reitti E, Salford). Laboratoriodatan rajoitus: laboratorion oma EMF-tausta (BERM:n laboratorion perustason siirtymä) saattaa aliarvioida vaikutusta koska kontrolliryhmäkin on altistunut.",
        lindgrenNote:
          "Laboratorion EMF-tausta (~10 V/m) tuottaa χ(Ā_lab) ≈ 1,0 (saturoitunut). Tämä tarkoittaa, että KAIKKI laboratoriosolut ovat maksimaalisesti herkkiä. 'Historiallinen perustason siirtymä' — spontaanin syövän, hedelmättömyyden ja metabolisen oireyhtymän lisääntyminen laboratorion jyrsijöissä 1940–2024 — korreloi laboratorion sähköistymistason kanssa. Kontrolliryhmä EI OLE terve perustaso vaan on kroonisesti EMF-altistunut.",
        proxyNote:
          "Perinteinen attribuutio: kontrolloidut olosuhteet eliminoivat sekoittajat. Ongelma: 'kontrolliryhmä' jokaisessa modernissa laboratoriossa on kroonisesti altistunut EMF:lle inkubaattoreista (mitatut ELF-kentät), sentrifugeista, tietokoneista, Wi-Fi:stä ja LED-valaistuksesta. Vuoden 2023 biorxiv-tutkimus dokumentoi merkittäviä ja alueellisesti epäyhtenäisiä magneettikenttätaustoja CO₂-inkubaattoreissa laitetyypistä ja laboratorion sijainnista riippuen. Kontrolliryhmä ei ole EMF-vapaa — se on EMF-kyllästetty. Tämä tarkoittaa, että jokainen 'ei vaikutusta' -löydös EMF-tutkimuksessa aliarvioi todellisen vaikutuksen kontrolliryhmän altistuksen verran.",
        references: [
          "Guy 1984 / Becker Cross Currents. 2,45 GHz, 25 kk, 3,6× syöpä.",
          "Czerski 1979. Siittiöiden kromosomivaurioita koko turvaraja-alueella.",
          "Salford et al. 2003. BBB-läpäisevyys SAR 0,012 W/kg.",
          "Panagopoulos et al. 2004. Drosophila-hedelmällisyys.",
        ],
      },
    ] as SpeciesSection[],
  },
} as const;

/* ------------------------------------------------------------------ */
/*  LindgrenBox component                                              */
/* ------------------------------------------------------------------ */

function LindgrenBox({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="border border-accent/30 bg-accent/5 rounded-lg p-4 mt-4">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];
  return {
    title: d.metaTitle,
    description: d.metaDescription,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function SentinelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <div className="max-w-3xl space-y-4 text-foreground-muted leading-relaxed">
          <p>{d.headerP1}</p>
          <p>
            {d.headerP2Before}
            <Link
              href={`/${locale}/mathematics#lindgren`}
              className="text-accent hover:underline"
            >
              {d.lindgrenLinkText}
            </Link>
            {d.headerP2Mid}
            <Link
              href={`/${locale}/mathematics#chi`}
              className="text-accent hover:underline"
            >
              {d.membraneLinkText}
            </Link>
            {d.headerP2After}
            <sub>mem</sub>
            {d.headerP2Final}
          </p>
        </div>
      </header>

      {/* Convergence table */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{d.convergenceTitle}</h2>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">{d.thSpecies}</th>
                <th className="text-left py-2 pr-4">{d.thVGCC}</th>
                <th className="text-left py-2 pr-4">{d.thAbsorption}</th>
                <th className="text-left py-2 pr-4">{d.thDecline}</th>
                <th className="text-left py-2 pr-4">{d.thBERM}</th>
                <th className="text-center py-2">{d.thMatch}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.convergenceTable.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {row.species}
                  </td>
                  <td className="py-2 pr-4 font-mono-num">
                    {row.vgccConservation}
                  </td>
                  <td className="py-2 pr-4">{row.absorptionSensitivity}</td>
                  <td className="py-2 pr-4">{row.documentedDecline}</td>
                  <td className="py-2 pr-4">{row.bermPrediction}</td>
                  <td className="py-2 text-center text-status-confirmed">
                    &#10003;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Temporal correlation */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{d.temporalTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          {d.temporalDesc}
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-4">{d.thEvent}</th>
                <th className="text-left py-2 pr-4">{d.thOnset}</th>
                <th className="text-left py-2 pr-4">{d.thEMFMilestone}</th>
                <th className="text-left py-2">{d.thLag}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.temporalRows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i < d.temporalRows.length - 1
                      ? "border-b border-card-border/50"
                      : ""
                  }
                >
                  <td className="py-2 pr-4">{row.event}</td>
                  <td className="py-2 pr-4 font-mono-num">{row.onset}</td>
                  <td className="py-2 pr-4">{row.emfMilestone}</td>
                  <td className="py-2 font-mono-num">{row.lag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          {d.temporalNote}
        </p>
      </section>

      {/* Temporal Timeline (interactive) */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{d.timelineTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          {d.timelineDesc}
        </p>
        <div className="border border-card-border rounded-lg p-4 bg-card-bg">
          <TemporalTimeline
            emfLabel={d.timelineEmfLabel}
            declineLabel={d.timelineDeclineLabel}
            emfEvents={d.timelineEmfEvents as TimelineEvent[]}
            declineEvents={d.timelineDeclineEvents as TimelineEvent[]}
            yearLabel={d.timelineYearLabel}
          />
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          {d.timelineNote}
        </p>
      </section>

      {/* Convergence explanation table */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{d.explTableTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          {d.explTableDesc}
        </p>
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-3">{d.explThExplanation}</th>
                <th className="text-center py-2 px-1">{d.explColInsects}</th>
                <th className="text-center py-2 px-1">{d.explColAmphibians}</th>
                <th className="text-center py-2 px-1">{d.explColBees}</th>
                <th className="text-center py-2 px-1">{d.explColBirds}</th>
                <th className="text-center py-2 px-1">{d.explColBats}</th>
                <th className="text-center py-2 px-1">{d.explColLabMammals}</th>
                <th className="text-center py-2 px-1">{d.explColHumans}</th>
              </tr>
            </thead>
            <tbody>
              {(d.explanationRows as ExplanationRow[]).map((row, i) => {
                const isEmf = i === (d.explanationRows as ExplanationRow[]).length - 1;
                const cells = [
                  row.insects, row.amphibians, row.bees,
                  row.birds, row.bats, row.labMammals, row.humans,
                ];
                return (
                  <tr
                    key={i}
                    className={`border-b border-card-border/50 ${isEmf ? "bg-accent/10 font-semibold" : ""}`}
                  >
                    <td className={`py-2 pr-3 ${isEmf ? "text-accent" : "text-foreground-muted"}`}>
                      {row.explanation}
                    </td>
                    {cells.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-2 px-1 text-center ${
                          cell === "yes"
                            ? "text-status-confirmed"
                            : cell === "no"
                              ? "text-status-refuted"
                              : "text-status-partial"
                        }`}
                      >
                        {cell === "yes"
                          ? d.explYes
                          : cell === "no"
                            ? d.explNo
                            : d.explPartial}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          {d.explNote}
        </p>
      </section>

      {/* Species sections */}
      <div className="space-y-14">
        {d.species.map((sp) => (
          <section key={sp.id} id={sp.id}>
            <h2 className="text-xl font-semibold mb-4">{sp.title}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  {d.lblBiology}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.biology}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  {d.lblEMFSensitivity}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.emfSensitivity}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  {d.lblDocumentedDecline}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.documentedDecline}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  {d.lblBERMPrediction}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {sp.bermPrediction}
                </p>
              </div>

              <LindgrenBox
                label={d.lblLindgrenInterpretation}
                text={sp.lindgrenNote}
              />

              {sp.proxyNote && (
                <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-4 mt-4">
                  <p className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
                    {d.proxyAttrLabel}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {sp.proxyNote}
                  </p>
                </div>
              )}

              <div className="mt-3">
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                  {d.lblKeyReferences}
                </h3>
                <ul className="space-y-0.5">
                  {sp.references.map((ref, i) => (
                    <li
                      key={i}
                      className="text-xs text-foreground-muted leading-relaxed"
                    >
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Proxy Masking */}
      <section id="proxy-masking" className="mt-14 mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.proxyTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-6 max-w-3xl">
          {d.proxySubtitle}
        </p>

        <div className="overflow-x-auto">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-2 pr-3">{d.proxyThExplanation}</th>
                <th className="text-center py-2 px-1">{d.proxyColInsects}</th>
                <th className="text-center py-2 px-1">{d.proxyColAmphibians}</th>
                <th className="text-center py-2 px-1">{d.proxyColBees}</th>
                <th className="text-center py-2 px-1">{d.proxyColBirds}</th>
                <th className="text-center py-2 px-1">{d.proxyColSperm}</th>
                <th className="text-center py-2 px-1">{d.proxyColTfr}</th>
                <th className="text-left py-2 pl-3 hidden lg:table-cell">{d.proxyColWeakness}</th>
              </tr>
            </thead>
            <tbody>
              {(d.proxyMaskingRows as ProxyMaskingRow[]).map((row, i) => {
                const isEmf = i === (d.proxyMaskingRows as ProxyMaskingRow[]).length - 1;
                const cells: Array<"yes" | "partial" | "no"> = [
                  row.insects, row.amphibians, row.bees,
                  row.birds, row.sperm, row.tfr,
                ];
                return (
                  <tr
                    key={i}
                    className={`border-b border-card-border/50 ${isEmf ? "bg-status-confirmed/10" : ""}`}
                  >
                    <td className={`py-2 pr-3 ${isEmf ? "text-status-confirmed font-semibold" : "text-foreground-muted"}`}>
                      {row.explanation}
                    </td>
                    {cells.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-2 px-1 text-center ${
                          cell === "yes"
                            ? "text-status-confirmed"
                            : cell === "no"
                              ? "text-status-refuted"
                              : "text-status-partial"
                        }`}
                      >
                        {cell === "yes" ? "✓" : cell === "no" ? "✗" : "◐"}
                      </td>
                    ))}
                    <td className="py-2 pl-3 text-foreground-muted hidden lg:table-cell">
                      {row.weakness}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Three mechanisms */}
        <div className="mt-10 space-y-6 max-w-3xl">
          <h3 className="text-lg font-semibold">{d.proxyThreeTitle}</h3>
          <div>
            <p className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.proxyP1Label}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.proxyP1}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.proxyP2Label}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.proxyP2}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.proxyP3Label}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.proxyP3}
            </p>
          </div>
        </div>

        {/* Human proxy masking */}
        <div className="mt-10 max-w-4xl">
          <h3 className="text-lg font-semibold mb-3">{d.proxyHumanTitle}</h3>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
            {d.proxyHumanIntro}
          </p>
          <div className="overflow-x-auto">
            <table className="text-xs border-collapse w-full">
              <thead>
                <tr className="border-b border-card-border text-foreground-muted">
                  <th className="text-left py-2 pr-3">{d.proxyHumanThSocial}</th>
                  <th className="text-left py-2 pr-3">{d.proxyHumanThBERM}</th>
                  <th className="text-left py-2">{d.proxyHumanThMechanism}</th>
                </tr>
              </thead>
              <tbody className="text-foreground-muted">
                {(d.humanProxyRows as HumanProxyRow[]).map((row, i) => (
                  <tr key={i} className="border-b border-card-border/50 align-top">
                    <td className="py-2 pr-3 font-medium text-foreground whitespace-nowrap">
                      {row.socialExplanation}
                    </td>
                    <td className="py-2 pr-3">{row.bermInterpretation}</td>
                    <td className="py-2 font-mono-num text-xs">{row.mechanism}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-foreground-muted mt-3 border-l-2 border-status-partial/50 pl-3">
            {d.proxyHumanNote}
          </p>
        </div>
      </section>

      {/* Laboratory Baseline Bias */}
      <section className="mt-14 border border-status-partial/30 bg-status-partial/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">{d.labBiasTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          {d.labBiasP1Before}
          <Link
            href={`/${locale}/mathematics#chi`}
            className="text-accent hover:underline"
          >
            {d.labBiasSelectionRuleLinkText}
          </Link>
          {d.labBiasP1After}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          {d.labBiasP2}
        </p>
        <div className="overflow-x-auto mt-4">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr className="border-b border-card-border text-foreground-muted">
                <th className="text-left py-1.5 pr-4">
                  {d.labBiasThObservation}
                </th>
                <th className="text-left py-1.5 pr-4">
                  {d.labBiasThPeriod}
                </th>
                <th className="text-left py-1.5">
                  {d.labBiasThImplication}
                </th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.labBiasRows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i < d.labBiasRows.length - 1
                      ? "border-b border-card-border/50"
                      : ""
                  }
                >
                  <td className="py-1.5 pr-4">{row.observation}</td>
                  <td className="py-1.5 pr-4">{row.period}</td>
                  <td className="py-1.5">{row.implication}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted mt-3">
          {d.labBiasNoteBefore}
          <Link
            href={`/${locale}/mathematics#pharmacological`}
            className="text-accent hover:underline"
          >
            {d.labBiasValidationLinkText}
          </Link>
          {d.labBiasNoteAfter}
        </p>
      </section>

      {/* Convergence conclusion */}
      <section className="mt-14 border-t border-card-border pt-10">
        <h2 className="text-xl font-semibold mb-4">
          {d.convergenceConclTitle}
        </h2>
        <p className="text-foreground-muted leading-relaxed max-w-3xl mb-4">
          {d.convergenceConclP}
        </p>
        <p className="text-xs text-foreground-muted">
          {d.convergenceConclNoteBefore}
          <Link
            href={`/${locale}/mathematics`}
            className="text-accent hover:underline"
          >
            {d.convergenceConclMathLinkText}
          </Link>
          {d.convergenceConclNoteAfter}
        </p>
      </section>
    </div>
  );
}
