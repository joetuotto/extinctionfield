import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ShieldQuestion } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import { EvidenceClassification } from "@/components/EvidenceClassification";
import { BehavioralSuppression } from "@/components/BehavioralSuppression";
import { HindcastValidation } from "@/components/HindcastValidation";
import { ReferencesSummary } from "@/components/ReferencesSummary";
import { TherapeuticFrequencyMap } from "@/components/TherapeuticFrequencyMap";
import { CellSizeFrequencyMatrix } from "@/components/CellSizeFrequencyMatrix";
import { ThreeChannelDiagram } from "@/components/ThreeChannelDiagram";
import { RetrodictionCards } from "@/components/RetrodictionCards";
import { IonicHierarchyDiagram } from "@/components/IonicHierarchyDiagram";
import { DifferentialSusceptibility } from "@/components/DifferentialSusceptibility";
import { LightingTransitionTimeline } from "@/components/LightingTransitionTimeline";
import { DiseaseCascadeTimeline } from "@/components/DiseaseCascadeTimeline";
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
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} bounded BERM v19 records and ${LEGACY_EVIDENCE_COUNT} extended catalogue entries across 13+ pathways and 82+ peer-reviewed studies.`,
    interpretationTitle: "How to read this register",
    interpretation: [
      "A field signature can support a measurement variable such as background vector, angle, spectrum or envelope; it does not establish human fertility effects.",
      "A cellular or animal experiment can support a mechanistic intermediate or organ endpoint within its stated conditions; it is not automatically a human population estimate.",
      "A review locates a body of literature. A population timing result is descriptive unless matched FieldState, endpoint and confounding controls are present.",
      "No record below is a TFR coefficient. A country TFR pathway requires the separate ASFR and demographic terms in the model specification.",
    ],
    boundedTitle: "Bounded v2 records",
    boundedLead: "Each record states its field class, directness, translation scope and limitation. These are the primary evidence entries for the BERM v19 causal route.",
    classificationTitle: "How previously negative findings classify",
    channelGroupTitle: "Three frequency channels",
    channelGroupLead: "Each biological pathway maps to one of three frequency channels, defined by two biological cutoffs: f_c ~ 1 kHz (membrane RC) and f_RPM ~ 1 MHz (radical pair coherence).",
    extendedTitle: "Extended evidence catalogue",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} additional records from the BERM v18 bibliography, retained for source-level review. Each is classified by its v18 pathway, evidence level, and v2 migration status.`,
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
    sentinelTitle: "Sentinel and cross-species evidence",
    sentinel: "The Cross-Species Lag Index is a readiness protocol for joining regional outcomes, measured FieldState and endpoint covariates in a registered cross-species test.",
    sentinelLink: "View sentinel readiness",
    extPathway: "Pathway",
    extLevel: "Evidence level",
    extStatus: "Migration status",
    extScope: "Translation scope",
    extN: "N",
    narrativeTitle: "Thematic evidence narratives",
    narrativeLead: "Cross-cutting themes that connect individual studies into mechanistic arguments. Each narrative synthesizes published findings; none establishes a population-level causal coefficient.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "The therapeutic device paradox",
        paragraphs: [
          "Regulatory agencies worldwide have approved 26 device categories whose efficacy depends on non-thermal electromagnetic biological effects — spanning the entire EM spectrum from DC to UV light. These include bone growth stimulators (DC, PMA 1986), TENS (12,000+ individual 510(k) clearances), deep brain stimulation (PMA 1997), rTMS for depression (510(k) 2008), TTFields for cancer (PMA 2011/2015/2026), PRF anti-inflammatory therapy (27 MHz), LLLT/photobiomodulation (510(k) 2007), blue light for neonatal jaundice, and UV phototherapy for psoriasis. In 2026, Kim et al. (Cell, IF ~64) demonstrated a 25th category: an EMF-inducible gene switch where 60 Hz pulsed EMF activates gene promoters in vivo via Cyb5b, a mitochondrial outer membrane protein identified through genome-wide CRISPR screening. A 26th category predates these by decades: US Patent 4,850,959 (1989) described a method for controlling insulin release from pancreatic beta cells using resonance-frequency EMF via calcium channel modulation — resonance frequency causes Ca²⁺ influx and insulin increase, non-resonance frequency causes Ca²⁺ efflux and decrease. If intentional EMF can control gene expression and insulin secretion, unintentional environmental EMF may dysregulate both without awareness. Each approval required clinical proof that electromagnetic energy produces a biological response without thermal heating. This is not controversial EMF safety research — it is mainstream medicine.",
          "The logical contradiction is direct: FDA requires proof of biological effect for device approval, while ICNIRP assumes absence of non-thermal biological effects for exposure limit setting. These two positions are logically incompatible. Non-thermal bioactivity is proven at every frequency from DC to UV light — except at RF frequencies between 300 MHz and 6 GHz. This is not a gap in biology; it is a gap in acknowledgment. The only frequency range where non-thermal effects are 'not recognized' is the range used by the telecommunications industry.",
          "The tDCS comparison is particularly revealing: the therapeutic field strength in the cortex (0.3–1.0 V/m) that earned FDA PMA approval in December 2025 is the same order of magnitude as measured urban ambient RF field strength (0.67–1.51 V/m). If 0.3 V/m DC is biologically active enough for FDA approval, urban ambient RF at 0.67 V/m cannot be assumed biologically inert. The Novocure TTFields patent (US 7,016,725) explicitly identifies that 'cells in the ovaries or testicles may be sensitive to the electric fields' at 100–300 kHz — the same frequency range produced by LED lighting drivers.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, note: "PEMF non-thermal bone healing, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, note: "Neuroplastic changes from pulsed magnetic fields" },
          { citation: "Optune TTFields (FDA PMA, EF-14 phase III)", year: 2015, note: "100–300 kHz disrupts cell division (non-thermal)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, note: "0.3–1.0 V/m DC changes brain function" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, note: "Vagus nerve stimulation, systemic anti-inflammatory" },
          { citation: "Novocure patent US 7,016,725", year: 2006, note: "Identifies ovaries/testicles as sensitive to IF fields" },
          { citation: "Kim et al. (Cell)", year: 2026, note: "EMF gene switch via Cyb5b — CRISPR-identified EMF sensor, 60 Hz" },
          { citation: "US Patent 4,850,959", year: 1989, note: "Resonance-frequency EMF controls insulin release via Ca²⁺ channels in pancreatic beta cells" },
        ],
      },
      {
        id: "covid",
        title: "COVID-19 lockdown validates three-channel prediction",
        paragraphs: [
          "Multiple studies report improved semen parameters during strict lockdown periods. A Chinese cohort (PubMed 41036143) found sperm concentration and motility increased during home confinement. Zhang et al. 2025 observed that semen quality declined again when restrictions were lifted, consistent with a reversible environmental component.",
          "The three-channel model predicted this outcome: sperm quality improved while mental health declined because each frequency channel affects different tissues. The intermediate frequency (IF) channel (300 Hz – 1 MHz), which affects cell division through the same frequency-cell size relationship as FDA-approved TTFields cancer therapy, dropped dramatically during lockdown because office environments with hundreds of LED fixtures, HVAC variable frequency drives, and power electronics were eliminated. At environmental intensities (0.01–3 V/m), the IF mechanism operates via Ion Forced Oscillation (IFO-VGIC, threshold 10⁻⁵ V/m — Panagopoulos 2025), not via dielectrophoresis which requires TTFields-level intensity (100–300 V/m). A typical office floor has 200–500 LED fixtures versus 15–20 at home — a 10–25× difference in IF sources. The RF channel (> 1 MHz), which affects circadian and neuropsychological pathways, increased 30–50% because screen time and device usage rose. Two different frequencies, two different mechanisms, two different tissues, two different directions — exactly what the three-channel model predicts.",
          "The sentinel species result confirms the outdoor component: COLOSS data shows bee colony winter loss increased by 2.27 percentage points during COVID (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. Bees and birds remained in outdoor environments where ambient RF from cell towers continued uninterrupted, while human sperm quality benefited from reduced indoor IF exposure.",
        ],
        studies: [
          { citation: "Chinese lockdown cohort (PubMed 41036143)", year: 2024, note: "Sperm quality improvement during confinement" },
          { citation: "Zhang et al.", year: 2025, note: "Quality decline after restriction lifting (reverse lockdown effect)" },
          { citation: "COLOSS winter loss panel", year: "2020–22", note: "Counter-result: bees worsened (+2.27 pp, outdoor RF unchanged)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, note: "IF fields (100–300 kHz) disrupt cell division — same frequency as LED drivers" },
        ],
      },
      {
        id: "qbs",
        title: "Quadruple behavioral suppression",
        paragraphs: [
          "Conception probability can be decomposed as P(child) = P(approach) × P(attraction) × P(intercourse) × P(fertilization). EMF-sensitive pathways exist at each stage: testosterone governs approach motivation (Puts 2008), attraction requires intact olfactory-hormonal signaling, sexual frequency depends on libido and opportunity, and fertilization requires sperm quality. Each multiplicative factor below 1.0 compounds the reduction.",
          "Goetz et al. 2024 (RCT) demonstrated that exogenous testosterone modulates approach behavior. Dreher et al. 2016 (PNAS) showed testosterone-dependent reward valuation in mating contexts. The dual-hormone meta-analysis (2018, N = 8,538) confirmed that testosterone and cortisol jointly predict dominance and mating effort. If EMF exposure suppresses testosterone at the population level (as suggested by the −1%/year secular trend), all four stages are affected simultaneously.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, note: "Testosterone and approach motivation" },
          { citation: "Goetz et al. RCT", year: 2024, note: "Exogenous T modulates approach behavior" },
          { citation: "Dreher et al. PNAS", year: 2016, note: "T-dependent reward valuation" },
          { citation: "Dual-hormone meta-analysis", year: 2018, note: "T + cortisol predict mating effort (N = 8,538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Dual oxytocin pathway",
        paragraphs: [
          "Two independent biological routes converge on oxytocin suppression. The Porges polyvagal pathway: chronic sympathetic activation (consistent with EMF-induced autonomic stress) downregulates the ventral vagal complex, reducing parasympathetic-mediated OT release. This affects pair bonding, sexual receptivity and uterine contractility.",
          "The Poutahidis/Erdman (MIT) microbiome pathway: Lactobacillus reuteri stimulates OT secretion via the vagus nerve. EMF exposure has been shown to alter gut microbiome composition in animal models. If L. reuteri populations decline under chronic RF exposure, the vagal OT signaling pathway is independently suppressed. Both routes — autonomic and microbial — converge on reduced circulating OT, affecting reproductive behavior and physiology from different directions.",
          "Direct experimental evidence: a 2024 study in Scientific Reports showed that 4.9 GHz RF exposure caused gut microbiome dysbiosis in mice, including decreased microbial diversity and altered Bacteroidetes/Firmicutes ratio. This links RF exposure directly to the gut-brain axis disruption that BERM's pathway E describes: RF → microbiome disruption → L. reuteri decline → vagal oxytocin suppression → reproductive motivation decline.",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, note: "Vagal tone → OT release pathway" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, note: "L. reuteri → vagus → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", note: "RF alters gut flora composition" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, note: "RF → gut dysbiosis: decreased diversity, altered Bacteroidetes/Firmicutes ratio" },
        ],
      },
      {
        id: "recovery",
        title: "Recovery window elimination",
        paragraphs: [
          "The REFLEX project (Diem et al. 2005) demonstrated that intermittent RF exposure produces greater genotoxic effects than continuous exposure at the same SAR, suggesting that cellular repair mechanisms are activated during exposure-free intervals. The recovery window hypothesis proposes that biological repair of RF-induced damage (ROS neutralization, DNA repair, protein refolding) requires sufficient EMF-free time.",
          "A modern urban adult experiences approximately 2 hours per day of near-zero RF exposure (sleep in a connected bedroom), yielding ~20.6% potential recovery time. A 1950s adult experienced approximately 20 hours per day in RF-free environments, yielding ~90.1% recovery time. If repair mechanisms require a minimum duty-free fraction to maintain homeostasis, the 4.4× reduction in recovery time could produce cumulative damage even at sub-thermal exposure levels.",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, note: "Intermittent > continuous genotoxicity" },
          { citation: "Recovery window model (BERM)", year: 2026, note: "20.6% vs 90.1% EMF-free time" },
        ],
      },
      {
        id: "susceptibility",
        title: "Individual susceptibility variation",
        paragraphs: [
          "Electromagnetic hypersensitivity (EHS) clinical data suggests a continuous distribution of individual susceptibility. Belpomme et al. 2022 characterized approximately 1,000 EHS patients with objective biomarkers including histamine, S100B protein and nitrotyrosine. While EHS as a clinical entity remains debated, the biomarker data suggests measurable physiological responses in a susceptible subpopulation.",
          "Sousouri et al. 2025 (NeuroImage, ETH Zurich) provided the first double-blind human experimental demonstration of VGCC genotype-dependent EMF sensitivity. In 34 healthy volunteers, CACNA1C rs7304986 T/C carriers showed altered sleep spindle frequency after 30 minutes of 3.6 GHz 5G exposure below ICNIRP limits. T/T carriers showed no effect. This is not nocebo — it is a genetically determined, objectively measured neurophysiological response. The regulatory variant does not change the protein but its expression density: more VGCC channels = greater sensitivity. HRV studies under controlled Wi-Fi exposure (2023) show measurable autonomic changes in a subset of participants. If susceptibility follows a normal distribution, the population-level reproductive effect is the integral over the entire distribution, not the response of the median individual.",
        ],
        studies: [
          { citation: "Belpomme et al.", year: 2022, note: "EHS biomarkers (~1,000 patients)" },
          { citation: "Sousouri et al. (NeuroImage, ETH Zurich)", year: 2025, note: "Double-blind RCT: CACNA1C rs7304986 T/C → altered sleep spindles at 3.6 GHz below ICNIRP" },
          { citation: "CACNA1C genotyping", year: 2024, note: "VGCC polymorphism → EMF sensitivity" },
          { citation: "HRV Wi-Fi exposure", year: 2023, note: "Autonomic changes in susceptible subset" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM pulse-duration resonance",
        paragraphs: [
          "The radical-pair mechanism (RPM) lifetime in cryptochrome is approximately 1 µs — the time window during which the singlet-triplet interconversion is magnetically sensitive. This is temporally compatible with pulse durations used by air-defense radars (also ~1 µs). The coincidence is not designed but arises from the physical timescales involved: cryptochrome's singlet-triplet conversion time is the same order of magnitude as the pulse width of surveillance radars.",
          "Each radar pulse covers the radical pair's entire lifetime, delivering the magnetic perturbation during the full conversion window. At 400 pulses per second, this produces 400 complete RPM events per second near a radar installation. By contrast, a continuous-wave (CW) signal at the same RMS applies a steady field with no pulse structure — the radical pair experiences a constant perturbation rather than discrete 1 µs windows. This predicts that pulse-modulated RF is more biologically active than CW at the same SAR. The REFLEX project (Diem et al. 2005) formally reported greater genotoxic effects from intermittent versus continuous exposure, consistent with this prediction. The temporal match is a physical coincidence, not a demonstrated resonance mechanism — it remains a testable prediction.",
        ],
        studies: [
          { citation: "Sherrard RM et al. PLOS Biology", year: 2018, note: "CRY-dependent ROS generation under pulsed EMF" },
          { citation: "REFLEX / Diem et al.", year: 2005, note: "Intermittent > continuous genotoxicity at same SAR" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, note: "Radical-pair mechanism lifetime ~1 µs" },
        ],
      },
      {
        id: "lighting",
        title: "Lighting transition: the invisible EMF shift",
        paragraphs: [
          "The replacement of incandescent bulbs with LED lighting (EU ban 2009–2012, similar elsewhere) transformed every lamp socket from a passive resistor producing zero EMF above 50 Hz into an active kHz-frequency EMF source. A typical home has 15–30 LED bulbs, each containing a switch-mode power supply operating at 20–200 kHz with harmonic overtones extending higher.",
          "Studies attributing LED health effects to 'blue light' (Tosini 2016) did not control for the EMF component. LED bulbs produce both blue light and kHz-EMF; incandescent bulbs produce neither. When a study compares LED to incandescent and finds melatonin suppression, it cannot determine whether the cause was spectral (blue light via retina → SCN) or electromagnetic (kHz fields via pineal or VGCC). No separation experiment has been conducted.",
          "The biological activity of intermediate-frequency fields (kHz range) is confirmed by Tumor Treating Fields (TTFields), an FDA-approved cancer therapy using 100–300 kHz alternating fields to disrupt cell division. If these frequencies are therapeutically active in cancer cells, they cannot be biologically inert in normal tissue.",
          "LED street lighting compounds the effect: Boyes et al. 2021 (Science Advances) found 47% reduction in moth caterpillar abundance under LED streetlights vs unlit sites, with worse effects from LEDs than sodium lamps. Pawson & Bader 2014 found LED traps captured 48% more insects than sodium. The Science editorial note on Lindecke 2026 explicitly identifies LED lights as a source of biological RF noise.",
          "The EU incandescent ban (Directive 244/2009) provides a testable natural experiment. The ban was phased: >100W in September 2009, >75W in 2010, >60W in 2011, all remaining in 2012, halogens in 2018. This was an administratively mandated, non-self-selected, population-wide switch from zero IF-EMF sources to continuous IF-EMF sources affecting ~450 million people. Zeghoudi et al. 2025 (Optics & Laser Technology) directly measured LED driver near-field emissions, confirming measurable E-field components at centimeter distances.",
          "BERM predicts that EU countries — where the lighting transition was mandated and simultaneous — will show accelerated TFR decline in 2015–2022 (5–10 year lag from cumulative spermatogenic damage) compared to countries where the ban occurred later or not at all (USA effective 2023, many developing countries still no ban). This is testable with existing demographic data using difference-in-differences regression with LED ban timing as the treatment variable.",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, note: "LED streetlights: −47% moth caterpillars vs unlit" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, note: "LED traps: +48% insect capture vs sodium" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, note: "100–300 kHz fields disrupt cell division (FDA-approved)" },
          { citation: "LED power quality study (PMC9920439)", year: 2023, note: "LED bulbs exceed harmonic distortion limits" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, note: "kHz filtering improved diabetes/MS symptoms" },
          { citation: "Aerts et al. (Environment International)", year: 2019, note: "IF fields (300 Hz–1 MHz) poorly studied" },
          { citation: "IJRB systematic review", year: 2022, note: "IF-EMF (300 Hz–10 MHz) animal studies: minimal health research vs ELF/RF" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, note: "LED driver near-field E-field emission measured" },
          { citation: "EU Directive 244/2009", year: 2009, note: "Phased incandescent ban 2009–2012, no EMF assessment" },
        ],
      },
      {
        id: "electroecology",
        title: "Electroecology: the emerging science of electric pollution",
        paragraphs: [
          "Aerial electroreception — the ability to detect airborne electric fields — has emerged as a recognized sensory modality in arthropods (Robert 2024, Current Biology). Bees detect floral electric fields to optimize foraging (Clarke 2013, Science). Their mechanosensory hairs physically bend in electric fields, transmitting neural signals (Sutton 2016, PNAS). Bees communicate within the hive using electrostatic signals during the waggle dance, with individual bee charge reaching 450 V (Greggers 2013, Proc R Soc B). Spiders detect atmospheric electric fields for ballooning (Morley & Robert 2018, Current Biology). Caterpillars detect approaching wasps electrically before contact (England & Robert 2024, PNAS). Ticks are passively attracted to hosts across air gaps by electrostatic forces (England 2023, Current Biology).",
          "Electrostatic charging is not a passive byproduct of flight. A 2024 study of 269 butterflies and moths across 11 species showed that the amount of static charge varies systematically with ecology — whether the species visits flowers, is tropical, or flies at night (England & Robert 2024, J R Soc Interface). This is the first evidence that electrostatic properties are adaptive traits shaped by natural selection. If evolution has optimized organisms' electrostatic properties, a changed electrostatic environment (synthetic materials, plastic surfaces, electrical devices) disrupts that optimization — the same logic as BERM's evolutionary calibration principle applied to the STATIC channel.",
          "In field experiments in urban meadows, Mallinson et al. (2025, iScience) demonstrated that weak anthropogenic electric fields reduce honeybee floral landings by 71% (AC fields) and 53% (positive DC fields). Electric field measurements near high-voltage transmission lines revealed persistent field strengths comparable to those used experimentally, spanning tens of meters at heights relevant for bee foraging. The authors use the term 'electric pollution' — the first use of this term in a Cell Press journal.",
          "These findings provide the empirical foundation for BERM's STATIC and ELF channels. If anthropogenic electric fields reduce pollinator efficiency by 71%, every new power line, transformer, and electric device reduces pollination. Combined with LED lighting's IF emissions (which affect insect populations through a separate mechanism), the electromagnetic environment exerts a double pressure on pollinator-dependent ecosystems. This is consistent with the global pollinator decline documented by IPBES and the FAO.",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, note: "Bees detect floral electric fields — first terrestrial electroreception" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, note: "Bee electric communication in hive, charge up to 450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, note: "Mechanosensory hairs = electroreceptors in bumblebees" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, note: "Spiders detect E-fields for ballooning dispersal" },
          { citation: "England et al. (Current Biology)", year: 2023, note: "Ticks attracted electrostatically across air gaps" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, note: "Butterfly electrostatic charge is adaptive (natural selection)" },
          { citation: "England & Robert (PNAS)", year: 2024, note: "Caterpillars detect predators electrically before contact" },
          { citation: "Robert (Current Biology)", year: 2024, note: "Aerial electroreception formalized as sensory modality" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, note: "Field experiment: AC fields −71% bee landings, term 'electric pollution'" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "The electrification boundary",
        paragraphs: [
          "The IFO-VGIC activation threshold (10⁻⁵ V/m, Panagopoulos 2025) is so low that every household appliance exceeds it at operating distance. This means the electrification boundary — whether a household has electricity or not — IS the biological exposure boundary. A person without electricity lives permanently below the IFO threshold. A person with electricity lives above it 24/7.",
          "This is a binary threshold, not a gradient. Education, income, and contraception access are all gradients — more is gradually different from less. Only EMF exposure has a physical threshold that maps to an infrastructure boundary. This structural difference produces a testable prediction: adjusting national electricity consumption by the fraction of the population with access should improve TFR prediction. It does: correlation improves from r = −0.864 to r = −0.885 (54 countries, LOOCV RMSE 0.522).",
          "In partially electrified countries, the unelectrified population lives in the electromagnetic environment that evolution calibrated biological sensors for. Their TFR should be near the biological maximum (~6.5). National TFR is a mixture of the electrified (lower TFR) and unelectrified (higher TFR) populations. Correcting for this, Nigeria's electrified population (55%) has an estimated TFR of 4.03, Ethiopia's (51%) has 1.89, and Uganda's (42%) has 1.86 — dramatically lower than their national averages.",
        ],
        studies: [
          { citation: "Panagopoulos et al. (Frontiers in Public Health)", year: 2025, note: "IFO-VGIC threshold 10⁻⁵ V/m for polarized fields" },
          { citation: "Belmin et al. (Nature Sustainability)", year: 2022, note: "155 DHS surveys: electricity access negatively affects fertility" },
          { citation: "DeLong et al. (PLOS ONE)", year: 2010, note: "Energy consumption negatively related to population growth" },
          { citation: "BERM v19.1 formula discovery", year: 2026, note: "54 countries, LOOCV RMSE 0.522, R² 0.851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "The mobile phone paradox",
        paragraphs: [
          "Mobile phone subscriptions per 100 people — intuitively the most direct EMF proxy — is the WEAKEST single predictor of TFR across 54 countries (RMSE 1.053, worse than GDP alone at 0.719). Residential electricity consumption is the BEST (RMSE 0.533 in exponential form).",
          "This is paradoxical only if EMF exposure comes from phones. BERM's three-channel model resolves it: a mobile phone is one device in one channel (RF), used intermittently. Residential electricity measures the entire electromagnetic environment — every light, every appliance, every wire in every wall, the 50/60 Hz field that permeates the home 24 hours a day.",
          "If the mechanism were 'information access' (TV, internet, phone), the mobile phone should be the BEST proxy because it IS the information device. The fact that it is the WORST proxy, while electricity consumption (which measures physical infrastructure, not information) is the BEST, is structurally consistent with EMF exposure rather than information access as the mechanism.",
        ],
        studies: [
          { citation: "BERM v19.1 cross-sectional analysis", year: 2026, note: "Mobile RMSE 1.053 vs electricity RMSE 0.533 (54 countries)" },
          { citation: "World Bank Development Indicators", year: 2024, note: "Source for residential electricity, broadband, mobile data" },
        ],
      },
      {
        id: "display",
        title: "Display transition: CRT → LCD/LED",
        paragraphs: [
          "The transition from CRT to flat-panel LCD/LED televisions (2005–2015) was not simply a display technology change — it was a multiplicative EMF transformation. Screen count per household increased from ~1 to ~3–4. Average screen size grew from 27\" to 60\" (~5× surface area). Bedroom TV penetration rose from 15% to 70%. Built-in Wi-Fi added continuous 2.4/5 GHz RF emission. Viewing distance decreased. Viewing hours increased with streaming culture.",
          "CRT televisions were not EMF-silent — their deflection coils produced strong VLF fields (15.6 kHz) and ELF fields (50 Hz). But these were from a single device at 3–4 m distance. The replacement by multiple Wi-Fi-connected LCD screens in every room, including bedrooms at 1.5–2 m from the pineal gland during evening hours, represents a qualitative change in the circadian EMF exposure profile.",
          "The bedroom television is particularly relevant to BERM's circadian pathway (Pathway C): a large LED-backlit, Wi-Fi-connected screen at head height, operating from evening through the melatonin production window, producing both blue light and EMF simultaneously. The multiplicative effect (count × size × bedroom × Wi-Fi × hours × proximity) is far larger than any single-factor analysis would suggest.",
        ],
        studies: [
          { citation: "Display market penetration data (Statista/GWI)", year: "2005–24", note: "Screen count 1 → 3.5, bedroom penetration 15% → 70%" },
          { citation: "Streaming culture and screen time increase", year: "2012–24", note: "Average viewing hours +2.5h with streaming adoption" },
        ],
      },
      {
        id: "weather-radar",
        title: "Weather radar networks and sentinel species",
        paragraphs: [
          "Weather surveillance radars are among the most powerful EMF sources in the environment. NEXRAD (USA, 159 stations) and equivalent European networks operate at S-band (2.7–3.0 GHz — nearly identical to Wi-Fi) or C-band (5.6 GHz), transmitting 250 kW to 1 MW peak power in rotating beams that sweep the entire landscape 24/7. Protected nature reserves are not shielded from radar signals.",
          "The temporal coincidence with insect decline is notable: NEXRAD deployment began in 1988 and was complete by 1997. Hallmann's insect biomass data begins in 1989 — one year after the first NEXRAD installations. European Doppler radar networks were built on a similar timeline. The S-band frequency (2.8 GHz, λ/2 ≈ 5.4 cm) matches the body size of large flying insects, producing resonant absorption (Thielens 2018).",
          "Nicholls & Racey (2007, PLOS ONE) demonstrated that bat activity was significantly reduced near radar installations at field strengths above 2 V/m. In a follow-up study (2009), a portable radar reduced foraging bat activity, suggesting EMF rather than noise or visual cues was responsible.",
          "Weather radar data is now widely used to monitor insect populations. These studies use the radar to measure insect density but do not consider whether the radar itself affects the insects being measured — a methodological blind spot that BERM identifies as a critical research gap. The 2024 German analysis (Archiv für Naturschutz und Landschaftsforschung) reanalyzed Hallmann-type data with proximity to mobile base stations and weather radar as covariates — both predicted insect decline independently of pesticide load and land use. This is proxy masking in action: conventional analyses attribute declines to pesticides and climate because they never include EMF as a covariate. BERM predicts that when EMF proximity is added, the variance explained by conventional variables will decrease.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, note: "Bat activity reduced near radar (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, note: "Portable radar reduced foraging bat activity" },
          { citation: "Hallmann et al.", year: 2017, note: "76% insect biomass decline, protected areas, 1989–2016" },
          { citation: "Thielens et al.", year: 2018, note: "Insect RF absorption at 2–120 GHz, resonance effects" },
          { citation: "UK weather radar insect study", year: 2025, note: "Radar used to TRACK insects, not test radar effects" },
          { citation: "NEXRAD insect density study", year: 2025, note: "140 radars track US insects — radar impact not considered" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ urban ambient",
        text: "The therapeutic field strength in FDA-approved tDCS (0.3–1.0 V/m) is the same order of magnitude as measured urban ambient RF (0.67–1.51 V/m). If 0.3 V/m is biologically active enough for FDA approval, urban ambient cannot be assumed inert.",
      },
      {
        label: "TTFields patent risk",
        text: "Novocure's TTFields patent (US 7,016,725) explicitly states that 'ovarian or testicular cells may be sensitive to electric fields' at 100–300 kHz — the same frequency range as LED switched-mode power supplies found in every modern building.",
      },
      {
        label: "Chromophore generalization",
        text: "LLLT works because visible light photons are absorbed by cytochrome c oxidase (CCO) in mitochondria. RF fields affect biology through cryptochrome radical pairs (CRY). Both are chromophores — molecules whose conformation changes when they absorb specific EM frequencies. Different chromophore, same principle, same non-thermal mechanism class.",
      },
    ],
    paradoxCalTitle: "Why biological sensitivity is expected, not surprising",
    paradoxCal1: "The human eye can detect a single photon — one quantum of electromagnetic radiation carrying ~4×10⁻¹⁹ joules, one-tenth of thermal noise energy (Vaziri et al. 2016, Nature Communications). Evolution optimized this electromagnetic sensor to the quantum limit because information is valuable for survival. If evolution pushed photon detection to the single-quantum boundary, why would it not have pushed electromagnetic field detection to comparable extremes?",
    paradoxCal2: "It did. Panagopoulos et al. 2025 (Frontiers in Public Health) demonstrate that voltage-gated ion channels respond to polarized, coherent electromagnetic fields as weak as 10⁻⁵ V/m — one hundred thousandth of a volt per meter — through the Ion Forced Oscillation mechanism. Typical environmental IF-EMF from LED drivers and power electronics ranges from 0.01 to 3 V/m, exceeding this biological threshold by a factor of 1,000 to 300,000. The 'intensity gap' between therapeutic devices and environmental exposure does not exist at the biological level.",
    paradoxCal3: "There is no evolved filter for IF or RF frequencies because these frequencies did not exist in the natural environment during the 3.8 billion years of biological evolution. Ion channels are 'wideband receivers' with no rejection of frequencies that nature never produced. Every technical signal is a potential disruption because biological sensors cannot distinguish it from a physiological signal. This is the same reason synthetic chemicals can disrupt the endocrine system — evolution did not build defenses against molecules it never encountered.",
  },
  fi: {
    title: "Evidenssirekisteri",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} rajattua BERM v19 -tietuetta ja ${LEGACY_EVIDENCE_COUNT} laajennetun katalogin tietuetta 13+ polulla ja 82+ vertaisarvioidussa tutkimuksessa.`,
    interpretationTitle: "Kuinka rekisteriä luetaan",
    interpretation: [
      "Kenttäallekirjoitus voi tukea mittausmuuttujaa, kuten taustavektoria, kulmaa, spektriä tai verhokäyrää; se ei osoita ihmisen hedelmällisyysvaikutusta.",
      "Solu- tai eläinkoe voi tukea mekanistista väliporrasta tai elinpäätepistettä omissa oloissaan; se ei automaattisesti ole ihmisväestön estimaatti.",
      "Katsaus paikantaa tutkimuskokonaisuuden. Väestön ajoitustulos on kuvaileva, ellei kohdistettu FieldState, päätepiste ja sekoittajien hallinta ole mukana.",
      "Mikään alla oleva tietue ei ole TFR-kerroin. Maakohtainen TFR-reitti tarvitsee erilliset ASFR- ja demografiset termit mallin määrittelyn mukaisesti.",
    ],
    boundedTitle: "Rajatut v2-tietueet",
    boundedLead: "Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Nämä ovat BERM v19 -kausaalireitin ensisijaiset evidenssitietueet.",
    classificationTitle: "Miten aiemmin negatiiviset havainnot luokittuvat",
    channelGroupTitle: "Kolme taajuuskanavaa",
    channelGroupLead: "Jokainen biologinen polku kuuluu yhteen kolmesta taajuuskanavasta, jotka määrittyvät kahdella biologisella rajataajuudella: f_c ~ 1 kHz (kalvon RC) ja f_RPM ~ 1 MHz (radikaaliparimekanismin koherenssi).",
    extendedTitle: "Laajennettu evidenssikatalogi",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} lisätietuetta BERM v18 -bibliografiasta, säilytetty lähdetason tarkistusta varten. Jokainen on luokiteltu v18-polun, evidenssitason ja v2-migraatiostatuksen mukaan.`,
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
    sentinelTitle: "Sentinelli- ja lajienvälinen evidenssi",
    sentinel: "Cross-Species Lag Index on valmiusprotokolla, joka yhdistää alueelliset vasteet, mitatun FieldStaten ja päätepistekovariaatit rekisteröityyn lajienväliseen testiin.",
    sentinelLink: "Katso sentinellin valmiustila",
    extPathway: "Polku",
    extLevel: "Evidenssitaso",
    extStatus: "Migraatiostatus",
    extScope: "Tulkintaraja",
    extN: "N",
    narrativeTitle: "Temaattiset evidenssinarratiivit",
    narrativeLead: "Poikkileikkaavia teemoja, jotka yhdistävät yksittäiset tutkimukset mekanistisiksi argumenteiksi. Kukin narratiivi syntetisoi julkaistuja löydöksiä; mikään ei osoita väestötason kausaalikerrointa.",
    narratives: [
      {
        id: "therapeutic-device-paradox",
        title: "Terapeuttisten laitteiden paradoksi",
        paragraphs: [
          "Regulaattorit ympäri maailmaa ovat hyväksyneet 26 laitekategoriaa, joiden teho perustuu ei-termiseen sähkömagneettiseen biologiseen vaikutukseen — kattaen koko EM-spektrin DC:stä UV-valoon. Näihin kuuluvat luunkasvustimulaattorit (DC, PMA 1986), TENS (12 000+ yksittäistä 510(k)-hyväksyntää), syväaivostimulaatio (PMA 1997), rTMS masennukseen (510(k) 2008), TTFields syöpään (PMA 2011/2015/2026), PRF-tulehdushoito (27 MHz), LLLT/fotobiomodulaatio (510(k) 2007), sinivaloterapia vastasyntyneiden keltaisuuteen ja UV-valohoito psoriasikseen. Vuonna 2026 Kim ym. (Cell, IF ~64) osoittivat 25. kategorian: EMF-geenikytkin, jossa 60 Hz pulssi-EMF aktivoi geenipromoottoreita in vivo Cyb5b:n kautta — mitokondrion ulkokalvoproteiini, joka tunnistettiin genominlaajuisessa CRISPR-seulonnassa EMF-sensoriksi. 26. kategoria on vuosikymmeniä vanhempi: US-patentti 4 850 959 (1989) kuvasi menetelmän insuliinin erityksen kontrolloimiseksi haiman beetasoluista resonanssitaajuisella EMF:llä kalsiumkanavien kautta — resonanssitaajuus aiheuttaa Ca²⁺-influksin ja insuliinin nousun, ei-resonanssitaajuus effluksin ja laskun. Jos tarkoituksellinen EMF voi kontrolloida geeniekspressiota ja insuliinieritystä, tahaton ympäristö-EMF voi häiritä molempia tiedostamattomasti. Jokainen hyväksyntä edellytti kliinistä todistamista siitä, että sähkömagneettinen energia tuottaa biologisen vasteen ilman termistä kuumennusta. Tämä ei ole kontroversiaalista EMF-turvallisuustutkimusta — se on valtavirtalääketiedettä.",
          "Looginen ristiriita on suora: FDA vaatii biologisen vaikutuksen todentamista laitteen hyväksymiseksi, kun taas ICNIRP olettaa ei-termisten biologisten vaikutusten puuttumista altistusrajojen asettamiseksi. Nämä kaksi positiota ovat loogisesti yhteensopimattomia. Ei-terminen bioaktiivisuus on todistettu jokaisella taajuudella DC:stä UV-valoon — paitsi RF-taajuuksilla 300 MHz:n ja 6 GHz:n välillä. Tämä ei ole aukko biologiassa; se on aukko tunnustamisessa. Ainoa taajuusalue jossa ei-termisiä vaikutuksia 'ei tunnusteta' on telekommunikaatioteollisuuden käyttämä alue.",
          "tDCS-vertailu on erityisen paljastava: terapeuttinen kenttävoimakkuus aivokuoressa (0,3–1,0 V/m), joka sai FDA PMA -hyväksynnän joulukuussa 2025, on samaa suuruusluokkaa kuin mitattu kaupungin ambient-RF-kenttävoimakkuus (0,67–1,51 V/m). Jos 0,3 V/m DC on biologisesti riittävän aktiivinen FDA-hyväksyntään, kaupungin ambient-RF:ää 0,67 V/m ei voida olettaa biologisesti inertiksi. Novocuren TTFields-patentti (US 7 016 725) tunnistaa eksplisiittisesti, että 'munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille' 100–300 kHz:n taajuudella — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet.",
        ],
        studies: [
          { citation: "EBI Bone Healing System (FDA PMA)", year: 1979, note: "PEMF:n ei-terminen luunparaneminen, 1–100 Hz" },
          { citation: "NeuroStar rTMS (FDA 510(k))", year: 2008, note: "Neuroplastiset muutokset pulssimagneettikentistä" },
          { citation: "Optune TTFields (FDA PMA, EF-14 faasi III)", year: 2015, note: "100–300 kHz häiritsee solunjakautumista (ei-terminen)" },
          { citation: "Flow Neuroscience tDCS (FDA PMA)", year: 2025, note: "0,3–1,0 V/m DC muuttaa aivojen toimintaa" },
          { citation: "GammaCore VNS (FDA 510(k))", year: 2017, note: "Vagushermostimulaatio, systeeminen anti-inflammatorinen" },
          { citation: "Novocure-patentti US 7 016 725", year: 2006, note: "Tunnistaa munasarjat/kivekset herkiksi IF-kentille" },
          { citation: "Kim ym. (Cell)", year: 2026, note: "EMF-geenikytkin Cyb5b:n kautta — CRISPR-tunnistettu EMF-sensori, 60 Hz" },
          { citation: "US-patentti 4 850 959", year: 1989, note: "Resonanssitaajuinen EMF kontrolloi insuliinieritystä Ca²⁺-kanavien kautta haiman beetasoluissa" },
        ],
      },
      {
        id: "covid",
        title: "COVID-19-lockdown vahvistaa kolmikanavaennusteen",
        paragraphs: [
          "Useat tutkimukset raportoivat parantuneen siemennesteen laadun tiukkojen lockdown-jaksojen aikana. Kiinalainen kohortti (PubMed 41036143) havaitsi siittiökonsentraation ja liikkuvuuden kasvaneen kotieristyksen aikana. Zhang ym. 2025 havaitsivat, että siemennesteen laatu laski jälleen rajoitusten purkamisen jälkeen, mikä on yhteensopivaa palautuvan ympäristötekijän kanssa.",
          "Kolmikanavamalli ennusti tämän tuloksen: siittiölaatu parani mutta mielenterveys heikkeni, koska kukin taajuuskanava vaikuttaa eri kudoksiin. Välitaajuuskanava (IF, 300 Hz – 1 MHz), joka vaikuttaa solunjakautumiseen saman taajuus-solukoko-suhteen kautta kuin FDA:n hyväksymä TTFields-syöpähoito, laski dramaattisesti lockdownin aikana, koska toimistoympäristöt satojen LED-valaisimien, HVAC-taajuusmuuttajien ja tehoelektroniikan kanssa poistuivat. Ympäristöintensiteeteillä (0,01–3 V/m) IF-mekanismi toimii ionien pakotetun oskillaation kautta (IFO-VGIC, kynnys 10⁻⁵ V/m — Panagopoulos 2025), ei dielektroforeesin kautta, joka vaatii TTFields-tason intensiteetin (100–300 V/m). Tyypillisessä toimistokerroksessa on 200–500 LED-valaisinta verrattuna kodin 15–20:een — 10–25-kertainen ero IF-lähteissä. RF-kanava (> 1 MHz), joka vaikuttaa sirkadiaanisiin ja neuropsykologisiin reitteihin, kasvoi 30–50 % ruutuajan ja laitekäytön lisääntyessä. Kaksi eri taajuutta, kaksi eri mekanismia, kaksi eri kudosta, kaksi eri suuntaa — juuri mitä kolmikanavamalli ennustaa.",
          "Sentinellilajien tulos vahvistaa ulkokomponentin: COLOSS-data osoittaa mehiläispesien talvihäviön kasvaneen 2,27 prosenttiyksikköä COVIDin aikana (24/35 maata heikkeni, p = 0,043). BBS-linnut laskivat myös 2,8–3,0 % vuosina 2020–22. Mehiläiset ja linnut pysyivät ulkoympäristöissä, joissa tukiasemien ambient-RF jatkui keskeytyksettä, kun taas ihmisten siittiölaatu hyötyi vähentyneestä sisätilojen IF-altistuksesta.",
        ],
        studies: [
          { citation: "Kiinalainen lockdown-kohortti (PubMed 41036143)", year: 2024, note: "Siittiölaadun paraneminen eristyksen aikana" },
          { citation: "Zhang ym.", year: 2025, note: "Laadun lasku rajoitusten purkamisen jälkeen (käänteinen lockdown-efekti)" },
          { citation: "COLOSS-talvihäviöpaneeli", year: "2020–22", note: "Vastatulos: mehiläiset heikkenivät (+2,27 pp, ulko-RF ennallaan)" },
          { citation: "Optune TTFields (FDA PMA)", year: 2015, note: "IF-kentät (100–300 kHz) häiritsevät solunjakautumista — sama taajuus kuin LED-hakkurit" },
        ],
      },
      {
        id: "qbs",
        title: "Nelinkertainen käyttäytymissuppressio",
        paragraphs: [
          "Hedelmöittymistodennäköisyys voidaan hajottaa muotoon P(lapsi) = P(lähestyminen) × P(attraktio) × P(yhdyntä) × P(hedelmöitys). EMF-herkkiä reittejä on jokaisessa vaiheessa: testosteroni ohjaa lähestymismotivaatiota (Puts 2008), attraktio vaatii ehjää hajuaisti-hormonaalista signalointia, seksuaalinen frekvenssi riippuu libidosta ja mahdollisuudesta, ja hedelmöitys vaatii siittiölaatua. Jokainen alle 1,0:n kerroin kumuloi vähennyksen.",
          "Goetz ym. 2024 (RCT) osoittivat, että eksogeeninen testosteroni moduloi lähestymiskäyttäytymistä. Dreher ym. 2016 (PNAS) osoittivat testosteroniriippuvaisen palkintoarvostuksen parittelukonteksteissa. Kaksoishormonimeta-analyysi (2018, N = 8 538) vahvisti, että testosteroni ja kortisoli ennustavat yhdessä dominanssia ja paritteluponnistelua. Jos EMF-altistus suppressoi testosteronia väestötasolla (kuten −1 %/vuosi sekulaaritrendi viittaa), kaikki neljä vaihetta vaikuttuvat samanaikaisesti.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, note: "Testosteroni ja lähestymismotivaatio" },
          { citation: "Goetz ym. RCT", year: 2024, note: "Eksogeeninen T moduloi lähestymistä" },
          { citation: "Dreher ym. PNAS", year: 2016, note: "T-riippuvainen palkintoarvostus" },
          { citation: "Kaksoishormonimeta-analyysi", year: 2018, note: "T + kortisoli ennustavat parittelua (N = 8 538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Kaksoisoksitossiinireitti",
        paragraphs: [
          "Kaksi itsenäistä biologista reittiä konvergoi oksitosiinin suppressioon. Porgesin polyvagaalireitti: krooninen sympaattinen aktivaatio (yhteensopiva EMF:n aiheuttaman autonomisen stressin kanssa) alassäätelee ventraalista vagaali-kompleksia, vähentäen parasympaattista OT-vapautumista. Tämä vaikuttaa parisiteeseen, seksuaaliseen vastaanottavuuteen ja kohdun supistuvuuteen.",
          "Poutahidiksen/Erdmanin (MIT) mikrobiomireitti: Lactobacillus reuteri stimuloi OT-eritystä vagushermon kautta. EMF-altistuksen on osoitettu muuttavan suoliston mikrobiomikoostumusta eläinmalleissa. Jos L. reuteri -populaatiot vähenevät kroonisen RF-altistuksen alla, vagaalinen OT-signalointireitti suppressoituu itsenäisesti. Molemmat reitit — autonominen ja mikrobinen — konvergoivat vähäisempään kiertävään OT:iin, vaikuttaen lisääntymiskäyttäytymiseen ja -fysiologiaan eri suunnista.",
          "Suora kokeellinen evidenssi: vuoden 2024 Scientific Reports -tutkimus osoitti, että 4,9 GHz RF-altistus aiheutti suoliston mikrobiomidysbioosin hiirillä, mukaan lukien mikrobiston monimuotoisuuden laskun ja muuttuneen Bacteroidetes/Firmicutes-suhteen. Tämä yhdistää RF-altistuksen suoraan suoli-aivo-akselin häiriöön, jota BERM:n polku E kuvaa: RF → mikrobiomin häiriö → L. reuterin väheneminen → vagaalisen oksitosiinin suppressio → lisääntymismotivaation lasku.",
        ],
        studies: [
          { citation: "Porges polyvagaaliteoria", year: 2011, note: "Vagaalinen tonus → OT-vapautumisreitti" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, note: "L. reuteri → vagus → OT" },
          { citation: "Mikrobiomi-EMF-eläintutkimukset", year: "2019–24", note: "RF muuttaa suolistoflooraa" },
          { citation: "Scientific Reports (4,9 GHz RF)", year: 2024, note: "RF → suolistodysbioosia: vähentynyt diversiteetti, muuttunut Bacteroidetes/Firmicutes-suhde" },
        ],
      },
      {
        id: "recovery",
        title: "Palautumisikkunan eliminaatio",
        paragraphs: [
          "REFLEX-projekti (Diem ym. 2005) osoitti, että katkonainen RF-altistus tuottaa suurempia genotoksisia vaikutuksia kuin jatkuva altistus samalla SAR-tasolla, viitaten siihen että solujen korjausmekanismit aktivoituvat altistusvapaina jaksoina. Palautumisikkunahypoteesi esittää, että RF:n aiheuttaman vaurion biologinen korjaus (ROS-neutralointi, DNA-korjaus, proteiinien uudelleenlaskostuminen) vaatii riittävästi EMF-vapaata aikaa.",
          "Moderni kaupunkiaikuinen kokee noin 2 tuntia päivässä lähes nolla-RF-altistusta (uni verkotetussa makuuhuoneessa), jolloin potentiaalinen palautumisaika on noin 20,6 %. 1950-luvun aikuinen koki noin 20 tuntia päivässä RF-vapaissa ympäristöissä, jolloin palautumisaika oli noin 90,1 %. Jos korjausmekanismit vaativat vähimmäismäärän altistusvapaata aikaa homeostaasin ylläpitämiseksi, 4,4-kertainen palautumisajan väheneminen voi tuottaa kumulatiivista vauriota myös subtermisillä altistustasoilla.",
        ],
        studies: [
          { citation: "REFLEX / Diem ym.", year: 2005, note: "Katkonainen > jatkuva genotoksisuus" },
          { citation: "Palautumisikkunamalli (BERM)", year: 2026, note: "20,6 % vs 90,1 % EMF-vapaata aikaa" },
        ],
      },
      {
        id: "susceptibility",
        title: "Yksilöllinen herkkyysvariaatio",
        paragraphs: [
          "Sähkömagneettinen yliherkkyyys (EHS) -kliininen data viittaa jatkuvaan yksilöllisen herkkyyden jakaumaan. Belpomme ym. 2022 karakterisoivat noin 1 000 EHS-potilasta objektiivisilla biomarkkereilla, mukaan lukien histamiini, S100B-proteiini ja nitrotyrosiini. Vaikka EHS kliinisenä entiteettinä on kiistanalainen, biomarkkerit viittaavat mitattaviin fysiologisiin vasteisiin herkässä alapopulaatiossa.",
          "Sousouri ym. 2025 (NeuroImage, ETH Zürich) tarjosi ensimmäisen kaksoissokko-ihmiskokeellisen osoituksen VGCC-genotyyppiriippuvaisesta EMF-herkkyydestä. Satunnaistetussa kontrolloidussa kokeessa CACNA1C rs7304986 T/C -kantajat osoittivat muuttunutta unisukkuladynamiikkaa 3,6 GHz RF-altistuksessa ICNIRP-rajojen alapuolella, kun taas CC-homotsygootit eivät. Tämä on ensimmäinen kokeellinen vahvistus sille, että ionikanavan genotyyppi ennustaa yksilöllistä EMF-vastetta, ja se muuttaa herkkyysjakauman aiemmin ehdotetusta (CACNA1C-assosiaatiotutkimukset 2024) kokeellisesti todistetuksi. Jos herkkyys noudattaa normaalijakaumaa, väestötason lisääntymisvaikutus on integraali koko jakauman yli, ei mediaani-yksilön vaste.",
        ],
        studies: [
          { citation: "Belpomme ym.", year: 2022, note: "EHS-biomarkkerit (~1 000 potilasta)" },
          { citation: "Sousouri ym. (NeuroImage, ETH Zürich)", year: 2025, note: "Kaksoissokko-RCT: CACNA1C rs7304986 T/C → muuttunut unisukkuladynamiikka 3,6 GHz:ssä ICNIRP-rajan alla" },
          { citation: "HRV Wi-Fi -altistus", year: 2023, note: "Autonomiset muutokset herkässä osajoukossa" },
        ],
      },
      {
        id: "cry-pulse-resonance",
        title: "CRY/RPM-pulssikestoresonanssi",
        paragraphs: [
          "Radikaaliparimekanismin (RPM) elinaika kryptokromissa on noin 1 µs — aikaikkuna, jonka aikana singletti–tripletti-interkonversio on magneettisesti herkkä. Tämä on ajallisesti yhteensopiva ilmapuolustustutkien pulssikestojen kanssa (myös ~1 µs). Yhteensattuma ei ole suunniteltu vaan syntyy mukana olevista fysikaalisista aikaskaaloista: kryptokromin singletti–tripletti-konversioaika on samaa suuruusluokkaa kuin valvontatutkien pulssinkesto.",
          "Jokainen tutkapulssi kattaa radikaaliparin koko elinkaaren ja tuottaa magneettisen häiriön koko konversioikkunan ajan. 400 pulssia sekunnissa tuottaa 400 täydellistä RPM-tapahtumaa sekunnissa tutka-aseman lähellä. Sitä vastoin jatkuva aalto (CW) samalla RMS:llä tuottaa tasaisen kentän ilman pulssirakennetta — radikaalipari kokee vakiohäiriön yksittäisten 1 µs -ikkunoiden sijaan. Tämä ennustaa, että pulssimoduloitu RF on biologisesti aktiivisempi kuin CW samalla SAR-arvolla. REFLEX-projekti (Diem ym. 2005) raportoi muodollisesti suuremmat genotoksiset vaikutukset katkonaiselle altistukselle jatkuvaan verrattuna, mikä on yhteensopivaa tämän ennusteen kanssa. Ajallinen vastaavuus on fysikaalinen yhteensattuma, ei osoitettu resonanssimekanismi — se on testattava ennuste.",
        ],
        studies: [
          { citation: "Sherrard RM ym. PLOS Biology", year: 2018, note: "CRY-riippuvainen ROS-tuotanto pulssi-EMF:ssä" },
          { citation: "REFLEX / Diem ym.", year: 2005, note: "Katkonainen > jatkuva genotoksisuus samalla SAR:lla" },
          { citation: "Hore & Mouritsen, Annual Review of Biophysics", year: 2016, note: "Radikaaliparimekanismin elinaika ~1 µs" },
        ],
      },
      {
        id: "lighting",
        title: "Valaistussiirtymä: näkymätön EMF-muutos",
        paragraphs: [
          "Hehkulamppujen korvaaminen LED-valaistuksella (EU-kielto 2009–2012, vastaavat muualla) muutti jokaisen lampunkannan passiivisesta resistanssista, joka ei tuota EMF:ää yli 50 Hz:n, aktiiviseksi kilohertsitaajuiseksi EMF-lähteeksi. Tyypillisessä kodissa on 15–30 LED-lamppua, joista jokaisessa on hakkuriteholähde, joka toimii 20–200 kHz:n taajuudella ja tuottaa korkeampia harmonisia.",
          "Tutkimukset, jotka attribuoivat LED:n terveysvaikutukset 'siniselle valolle' (Tosini 2016), eivät kontrolloineet EMF-komponenttia. LED-lamput tuottavat sekä sinistä valoa että kHz-EMF:ää; hehkulamput eivät kumpaakaan. Kun tutkimus vertaa LED:ää hehkulamppuun ja havaitsee melatoniinin suppression, se ei pysty erottamaan, oliko syy spektraalinen (sininen valo verkkokalvon kautta → SCN) vai sähkömagneettinen (kHz-kentät pineaalirauhasen tai VGCC:n kautta). Erottelututkimusta ei ole tehty.",
          "Välitaajuisten kenttien (kHz-alue) biologinen aktiivisuus on vahvistettu Tumor Treating Fields (TTFields) -hoidolla, FDA:n hyväksymällä syöpähoidolla, joka käyttää 100–300 kHz:n vaihtokenttiä solunjakautumisen häiritsemiseen. Jos nämä taajuudet ovat terapeuttisesti aktiivisia syöpäsoluissa, ne eivät voi olla biologisesti inerttejä normaalissa kudoksessa.",
          "LED-katuvalaistus vahvistaa vaikutusta: Boyes ym. 2021 (Science Advances) havaitsivat 47 %:n vähenemisen yöperhosten toukkamäärissä LED-katuvalojen alla verrattuna valaisemattomiin kohteisiin. Pawson & Bader 2014 havaitsivat LED-loukkujen pyydystäneen 48 % enemmän hyönteisiä kuin natriumlamppu. Sciencen toimituksellinen huomautus Lindecke 2026 -tutkimuksessa tunnistaa nimenomaisesti LED-valot biologisen RF-kohinan lähteeksi.",
          "EU:n hehkulamppukielto (direktiivi 244/2009) tarjoaa testattavan luonnollisen kokeen. Kielto vaiheistettiin: >100 W syyskuussa 2009, >75 W 2010, >60 W 2011, kaikki loput 2012, halogeenit 2018. Tämä oli hallinnollisesti pakotettu, ei-itsevalittu, väestönlaajuinen siirtymä nollasta IF-EMF-lähteestä jatkuviin IF-EMF-lähteisiin, joka koski ~450 miljoonaa ihmistä. Zeghoudi ym. 2025 (Optics & Laser Technology) mittasi suoraan LED-ajurin lähikenttäemission ja vahvisti mitattavat sähkökentän komponentit senttimetrien etäisyydellä.",
          "BERM ennustaa, että EU-maat — joissa valaistussiirtymä oli pakollinen ja samanaikainen — osoittavat kiihtyvää TFR-laskua 2015–2022 (5–10 vuoden viive kumulatiivisesta spermatogeneesivauriosta) verrattuna maihin, joissa kielto tuli voimaan myöhemmin tai ei lainkaan (USA vasta 2023, monet kehitysmaat yhä ilman kieltoa). Tämä on testattavissa olemassa olevalla demografisella datalla käyttäen erotus-erotuksissa-regressiota LED-kiellon ajoituksella käsittelymuuttujana.",
        ],
        studies: [
          { citation: "Boyes ym. (Science Advances)", year: 2021, note: "LED-katuvalot: −47 % yöperhosten toukkia vs valaisemattomat" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, note: "LED-loukut: +48 % hyönteispyydystys vs natrium" },
          { citation: "Tuszynski ym. — TTFields (PMC5129338)", year: 2016, note: "100–300 kHz kentät häiritsevät solunjakautumista (FDA-hyväksytty)" },
          { citation: "LED-sähkönlaatututkimus (PMC9920439)", year: 2023, note: "LED-lamput ylittävät harmonisen särön rajat" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, note: "kHz-suodatus paransi diabetes-/MS-oireita" },
          { citation: "Aerts ym. (Environment International)", year: 2019, note: "IF-kentät (300 Hz–1 MHz) heikosti tutkittuja" },
          { citation: "Zeghoudi ym. (Optics & Laser Technology)", year: 2025, note: "LED-ajurin lähikenttäemissio mitattu" },
          { citation: "EU-direktiivi 244/2009", year: 2009, note: "Hehkulamppujen asteittainen kielto 2009–2012, ei EMF-arviointia" },
          { citation: "IJRB systemaattinen katsaus", year: 2022, note: "IF-EMF (300 Hz–10 MHz) eläintutkimukset: minimaalinen terveystutkimus vs ELF/RF" },
        ],
      },
      {
        id: "electroecology",
        title: "Sähköekologia: sähkösaasteen tutkimus",
        paragraphs: [
          "Ilman sähkökentän havaitseminen (aerial electroreception) on tunnistettu omana aistimodaalisuutenaan niveljalkaisilla (Robert 2024, Current Biology). Mehiläiset havaitsevat kukkien sähkökentät ravinnonhaun optimoimiseksi (Clarke 2013, Science). Niiden mekanosensoriset karvat taipuvat fyysisesti sähkökentässä ja välittävät hermosignaaleja (Sutton 2016, PNAS). Mehiläiset viestivät pesässä sähköstaattisilla signaaleilla tanssitanssin aikana, yksittäisen mehiläisen varauksen ollessa jopa 450 V (Greggers 2013, Proc R Soc B). Hämähäkit havaitsevat ilmakehän sähkökenttiä lentämistä (ballooning) varten (Morley & Robert 2018, Current Biology). Toukat havaitsevat lähestyvän ampiaisen sähköisesti ennen kontaktia (England & Robert 2024, PNAS). Punkkeja vedetään isäntiin ilmarakojen yli sähköstaattisilla voimilla (England 2023, Current Biology).",
          "Sähköstaattinen varautuminen ei ole lennon passiivinen sivutuote. Vuoden 2024 tutkimus 269 perhosesta ja yöperhosesta 11 lajin poikki osoitti, että staattisen varauksen määrä vaihtelee systemaattisesti ekologian mukaan — vieraileeko laji kukilla, onko se trooppinen vai lentääkö se yöllä (England & Robert 2024, J R Soc Interface). Tämä on ensimmäinen todiste siitä, että sähköstaattiset ominaisuudet ovat adaptiivisia piirteitä, joita luonnonvalinta on muokannut. Jos evoluutio on optimoinut eliöiden sähköstaattisia ominaisuuksia, muuttunut sähköstaattinen ympäristö (synteettiset materiaalit, muovipinnat, sähkölaitteet) häiritsee tätä optimointia — sama logiikka kuin BERM:n evolutionäärinen kalibraatioperiaate STATIC-kanavassa.",
          "Kenttäkokeissa kaupunkiniityillä Mallinson ym. (2025, iScience) osoittivat, että heikot ihmisperäiset sähkökentät vähensivät mehiläisten kukille laskeutumista 71 % (AC-kentät) ja 53 % (positiiviset DC-kentät). Suurjännitevoimalinjojen lähellä mitatut kenttävoimakkuudet olivat verrattavissa kokeellisiin, ulottuen kymmenien metrien etäisyydelle mehiläisten ravinnonhakukorkeudella. Tekijät käyttävät termiä 'electric pollution' (sähkösaaste) — ensimmäinen kerta kun tätä termiä käytetään Cell Press -lehdessä.",
          "Nämä löydökset tarjoavat empiirisen perustan BERM:n STATIC- ja ELF-kanaville. Jos ihmisperäiset sähkökentät vähentävät pölyttäjien tehokkuutta 71 %, jokainen uusi voimalinja, muuntaja ja sähkölaite vähentää pölytystä. Yhdistettynä LED-valaistuksen IF-emissioihin (jotka vaikuttavat hyönteispopulaatioihin eri mekanismilla), sähkömagneettinen ympäristö kohdistaa kaksinkertaisen paineen pölyttäjäriippuvaisiin ekosysteemeihin. Tämä on yhdenmukaista IPBES:n ja FAO:n dokumentoiman globaalin pölyttäjäkadon kanssa.",
        ],
        studies: [
          { citation: "Clarke ym. (Science)", year: 2013, note: "Mehiläiset havaitsevat kukkien sähkökentät — ensimmäinen maaeläimen sähköreseptio" },
          { citation: "Greggers ym. (Proc R Soc B)", year: 2013, note: "Mehiläisten sähköinen viestintä pesässä, varaus 450 V" },
          { citation: "Sutton ym. (PNAS)", year: 2016, note: "Mekanosensoriset karvat = sähköreseptorit kimalaisilla" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, note: "Hämähäkit havaitsevat sähkökenttiä lentämistä varten" },
          { citation: "England ym. (Current Biology)", year: 2023, note: "Punkit vetäytyvät sähköstaattisesti ilmarakojen yli" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, note: "Perhosten sähkövaraus adaptiivinen (luonnonvalinta)" },
          { citation: "England & Robert (PNAS)", year: 2024, note: "Toukat havaitsevat saalistajan sähköisesti ennen kontaktia" },
          { citation: "Robert (Current Biology)", year: 2024, note: "Ilman sähköreseptio virallistettu aistimodaalisuutena" },
          { citation: "Mallinson ym. (iScience / Cell Press)", year: 2025, note: "Kenttäkoe: AC-kentät −71 % mehiläislaskeutumisia, termi 'electric pollution'" },
        ],
      },
      {
        id: "electrification-boundary",
        title: "Sähköistymisraja",
        paragraphs: [
          "IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m, Panagopoulos 2025) on niin matala, että jokainen kodin sähkölaite ylittää sen käyttöetäisyydellä. Tämä tarkoittaa, että sähköistymisraja — onko kotitaloudella sähköä vai ei — ON biologisen altistuksen raja. Ihminen ilman sähköä elää pysyvästi IFO-kynnyksen alapuolella. Ihminen jolla on sähkö elää sen yläpuolella 24/7.",
          "Tämä on binäärinen kynnys, ei gradientti. Koulutus, tulot ja ehkäisyn saatavuus ovat kaikki gradientteja — enemmän on asteittain erilaista kuin vähemmän. Vain EMF-altistuksella on fysikaalinen kynnys joka vastaa infrastruktuurirajaa. Tämä rakenteellinen ero tuottaa testattavan ennusteen: kansallisen sähkönkulutuksen korjaaminen sähköistetyn väestöosuuden mukaan parantaa TFR-ennustetta. Näin käy: korrelaatio paranee r = −0,864:stä r = −0,885:een (54 maata, LOOCV RMSE 0,522).",
          "Osittain sähköistetyissä maissa sähköistämätön väestö elää sähkömagneettisessa ympäristössä, johon evoluutio kalibroi biologiset sensorit. Heidän TFR:nsä tulisi olla lähellä biologista maksimia (~6,5). Kansallinen TFR on sekoitus sähköistettyä (matalampi TFR) ja sähköistämätöntä (korkeampi TFR) väestöä. Korjattuna Nigerian sähköistetyn väestön (55 %) arvioitu TFR on 4,03, Etiopian (51 %) 1,89 ja Ugandan (42 %) 1,86 — dramaattisesti kansallisia keskiarvoja matalampia.",
        ],
        studies: [
          { citation: "Panagopoulos ym. (Frontiers in Public Health)", year: 2025, note: "IFO-VGIC-kynnys 10⁻⁵ V/m polarisoituneille kentille" },
          { citation: "Belmin ym. (Nature Sustainability)", year: 2022, note: "155 DHS-kyselyä: sähkön saatavuus vähentää hedelmällisyyttä" },
          { citation: "DeLong ym. (PLOS ONE)", year: 2010, note: "Energiankulutus negatiivisesti yhteydessä väestönkasvuun" },
          { citation: "BERM v19.1 kaavanlöytö", year: 2026, note: "54 maata, LOOCV RMSE 0,522, R² 0,851" },
        ],
      },
      {
        id: "mobile-paradox",
        title: "Matkapuhelinparadoksi",
        paragraphs: [
          "Matkapuhelinliittymät sataa henkeä kohti — intuitiivisesti suorin EMF-proxy — on HEIKOIN yksittäinen TFR-ennustaja 54 maassa (RMSE 1,053, heikompi kuin BKT yksinään 0,719). Asumisen sähkönkulutus on PARAS (RMSE 0,533 eksponentiaalisessa muodossa).",
          "Tämä on paradoksaalista vain jos EMF-altistus tulee puhelimista. BERM:n kolmikanavamalli ratkaisee sen: matkapuhelin on yksi laite yhdellä kanavalla (RF), käytetty ajoittain. Asumisen sähkönkulutus mittaa koko sähkömagneettista ympäristöä — jokainen valo, jokainen kodinlaite, jokainen johto jokaisessa seinässä, 50/60 Hz kenttä joka läpäisee kodin 24 tuntia vuorokaudessa.",
          "Jos mekanismi olisi 'tiedon saatavuus' (TV, internet, puhelin), matkapuhelimen pitäisi olla PARAS proxy koska se ON tietolaite. Se, että se on HUONOIN proxy kun sähkönkulutus (joka mittaa fyysistä infrastruktuuria, ei tietoa) on PARAS, on rakenteellisesti yhdenmukaista EMF-altistuksen kanssa pikemmin kuin tiedonsaannin mekanismina.",
        ],
        studies: [
          { citation: "BERM v19.1 poikkileikkausanalyysi", year: 2026, note: "Matkapuhelin RMSE 1,053 vs sähkö RMSE 0,533 (54 maata)" },
          { citation: "Maailmanpankin kehitysindikaattorit", year: 2024, note: "Lähde: asumisen sähkö, laajakaista, matkapuhelindata" },
        ],
      },
      {
        id: "display",
        title: "Näyttöteknologiasiirtymä: CRT → LCD/LED",
        paragraphs: [
          "Siirtymä CRT-kuvaputkinäytöistä LCD/LED-litteänäyttöihin (2005–2015) ei ollut pelkkä näyttöteknologian muutos — se oli moninkertaistava EMF-muutos. Näyttöjen lukumäärä kotitaloutta kohti kasvoi ~1:stä ~3–4:ään. Keskimääräinen ruutukoko kasvoi 27\":stä 60\":iin (~5-kertainen pinta-ala). Makuuhuoneen TV-penetraatio nousi 15 %:sta 70 %:iin. Sisäänrakennettu Wi-Fi lisäsi jatkuvan 2,4/5 GHz RF-emission. Katseluetäisyys lyheni. Katseluaika kasvoi suoratoistokulttuurin myötä.",
          "CRT-televisiot eivät olleet EMF-hiljaisia — niiden poikkeutuskäämit tuottivat voimakkaita VLF-kenttiä (15,6 kHz) ja ELF-kenttiä (50 Hz). Mutta nämä olivat yhdestä laitteesta 3–4 m:n etäisyydellä. Korvaaminen useilla Wi-Fi-yhdistetyillä LCD-näytöillä jokaisessa huoneessa, mukaan lukien makuuhuoneessa 1,5–2 m:n päässä pineaalirauhasesta ilta-aikaan, edustaa laadullista muutosta sirkadiaanisessa EMF-altistusprofiilissa.",
          "Makuuhuoneen televisio on erityisen relevantti BERM:n sirkadiaaniselle reitille (Polku C): suuri LED-taustavalaistu, Wi-Fi-yhdistetty näyttö pään korkeudella, toimii illasta melatoniinin tuotantoikkunan läpi, tuottaen sekä sinistä valoa että EMF:ää samanaikaisesti. Moninkertaisuusvaikutus (lukumäärä × koko × makuuhuone × Wi-Fi × tunnit × läheisyys) on paljon suurempi kuin mikään yksittäisen tekijän analyysi antaisi ymmärtää.",
        ],
        studies: [
          { citation: "Näyttömarkkinapenetraatiodata (Statista/GWI)", year: "2005–24", note: "Näyttömäärä 1 → 3,5, makuuhuonepenetraatio 15 % → 70 %" },
          { citation: "Suoratoistokulttuuri ja ruutuajan kasvu", year: "2012–24", note: "Keskimääräinen katseluaika +2,5h suoratoiston myötä" },
        ],
      },
      {
        id: "weather-radar",
        title: "Säätukaverkostot ja indikaattorilajit",
        paragraphs: [
          "Säävalvontatutkat ovat ympäristön voimakkaimpia EMF-lähteitä. NEXRAD (USA, 159 asemaa) ja vastaavat eurooppalaiset verkostot toimivat S-kaistalla (2,7–3,0 GHz — lähes identtinen Wi-Fi:n kanssa) tai C-kaistalla (5,6 GHz), lähettäen 250 kW – 1 MW huipputehoa pyörivissä keiloissa jotka pyyhkäisevät koko maiseman 24/7. Luonnonsuojelualueet eivät ole suojattuja tutkasignaaleilta.",
          "Ajallinen yhteensattuma hyönteiskadon kanssa on huomattava: NEXRAD-asennus alkoi 1988 ja valmistui 1997. Hallmannin hyönteisbiomassadata alkaa 1989 — vuosi ensimmäisten NEXRAD-asennusten jälkeen. Eurooppalaiset Doppler-tutkaverkostot rakennettiin vastaavalla aikataululla. S-kaistan taajuus (2,8 GHz, λ/2 ≈ 5,4 cm) vastaa suurten lentävien hyönteisten kehon kokoa, tuottaen resonanssityyppistä absorptiota (Thielens 2018).",
          "Nicholls & Racey (2007, PLOS ONE) osoittivat, että lepakkoaktiivisuus laski merkittävästi tutka-asemien lähellä kenttävoimakkuuksilla yli 2 V/m. Jatkotutkimuksessa (2009) kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta, viitaten siihen, että EMF eikä melu tai visuaaliset vihjeet oli vastuussa.",
          "Säätutkadataa käytetään nykyisin laajasti hyönteispopulaatioiden seuraamiseen. Nämä tutkimukset käyttävät tutkaa hyönteistiheyden mittaamiseen mutta eivät harkitse, vaikuttaako tutka itse mitattaviin hyönteisiin — metodologinen sokea piste, jonka BERM tunnistaa kriittiseksi tutkimusaukoksi. Vuoden 2024 saksalaisanalyysi (Archiv für Naturschutz und Landschaftsforschung) analysoi uudelleen Hallmann-tyyppistä dataa matkapuhelintukiasemien ja säätutkien läheisyydellä kovariaatteina — molemmat ennustivat hyönteiskatoa riippumatta torjunta-ainekuormasta ja maankäytöstä. Tämä on proksimaskausta käytännössä: tavanomaiset analyysit attribuoivat laskut torjunta-aineille ja ilmastolle, koska ne eivät koskaan sisällytä EMF:ää kovariaatiksi. BERM ennustaa, että kun EMF-läheisyys lisätään, tavanomaisten muuttujien selittämä varianssi laskee.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, note: "Lepakkoaktiivisuus laski tutkan lähellä (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, note: "Kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta" },
          { citation: "Hallmann ym.", year: 2017, note: "76 %:n hyönteisbiomassalasku, suojelualueet, 1989–2016" },
          { citation: "Thielens ym.", year: 2018, note: "Hyönteisten RF-absorptio 2–120 GHz, resonanssivaikutuksia" },
          { citation: "UK:n säätutkahyönteistutkimus", year: 2025, note: "Tutkaa käytetty hyönteisten SEURAAMISEEN, ei vaikutusten testaamiseen" },
          { citation: "NEXRAD-hyönteistiheystutkimus", year: 2025, note: "140 tutkaa seuraa USA:n hyönteisiä — tutkan vaikutusta ei huomioitu" },
        ],
      },
    ],
    paradoxCards: [
      {
        label: "tDCS ≈ kaupungin ambient",
        text: "FDA:n hyväksymän tDCS:n terapeuttinen kenttävoimakkuus (0,3–1,0 V/m) on samaa suuruusluokkaa kuin mitattu kaupungin ambient-RF (0,67–1,51 V/m). Jos 0,3 V/m on biologisesti riittävän aktiivinen FDA-hyväksyntään, kaupungin ambientia ei voida olettaa inertiksi.",
      },
      {
        label: "TTFields-patentin riski",
        text: "Novocuren TTFields-patentti (US 7 016 725) toteaa eksplisiittisesti, että 'munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille' taajuudella 100–300 kHz — samalla taajuusalueella kuin LED-valaistuksen hakkuriteholähteet, joita on jokaisessa nykyrakennuksessa.",
      },
      {
        label: "Kromoforien yleistys",
        text: "LLLT toimii koska näkyvän valon fotonit absorboituvat mitokondrioiden sytokromi c -oksidaasiin (CCO). RF-kentät vaikuttavat biologiaan kryptokromi-radikaaliparin (CRY) kautta. Molemmat ovat kromofooreja — molekyylejä joiden konformaatio muuttuu absorboidessaan tietyn EM-taajuuden. Eri kromofori, sama periaate, sama ei-terminen mekanismiluokka.",
      },
    ],
    paradoxCalTitle: "Miksi biologinen herkkyys on odotettavissa, ei yllättävää",
    paradoxCal1: "Ihmisen silmä havaitsee yksittäisen fotonin — yhden sähkömagneettisen säteilyn kvantin, joka kantaa ~4×10⁻¹⁹ joulea, kymmenesosan termisestä kohinaenergiasta (Vaziri ym. 2016, Nature Communications). Evoluutio optimoi tämän sähkömagneettisen sensorin kvanttirajaansa asti, koska informaatio on arvokasta selviytymiselle. Jos evoluutio painoi fotonihavaitsemisen yhden kvantin rajalle, miksi se ei olisi painanut sähkömagneettisen kentän havaitsemista vastaaviin äärirajoihin?",
    paradoxCal2: "Se painoi. Panagopoulos ym. 2025 (Frontiers in Public Health) osoittavat, että jänniteohjatut ionikanavat vastaavat polarisoituihin, koherentteihin sähkömagneettisiin kenttiin jo 10⁻⁵ V/m voimakkuudella — sadastuhannesosalla voltista metrillä — ionien pakko-oskillaatiomekanismilla (IFO). Tyypillinen ympäristön IF-EMF LED-hakkureista ja tehoelektroniikasta on 0,01–3 V/m, ylittäen tämän biologisen kynnyksen 1 000–300 000 -kertaisesti. Intensiteettikuilua terapeuttisten laitteiden ja ympäristöaltistuksen välillä ei ole biologisella tasolla.",
    paradoxCal3: "IF- tai RF-taajuuksille ei ole evoluution kehittämää suodatinta, koska näitä taajuuksia ei ollut luonnollisessa ympäristössä 3,8 miljardin vuoden biologisen evoluution aikana. Ionikanavat ovat 'laajakaistavastaanottimia' ilman hylkimistä taajuuksille, joita luonto ei koskaan tuottanut. Jokainen tekninen signaali on mahdollinen häiriö, koska biologiset sensorit eivät voi erottaa sitä fysiologisesta signaalista. Tämä on sama syy, miksi synteettiset kemikaalit voivat häiritä endokriinistä järjestelmää — evoluutio ei rakentanut puolustuksia molekyylejä vastaan, joita se ei kohdannut.",
  },
} as const;

const PATHWAY_ORDER = ["A", "A_mitotic", "B", "C", "D", "E", "F", "T", "RW", "BS", "PV", "S", "SE", "EHS", "H", "theory"];

const CHANNEL_GROUPS = {
  en: [
    { channel: "ELF", band: "f < 1 kHz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["A", "D", "E", "F"], desc: "Membrane modulation via H(f) low-pass filter" },
    { channel: "IF", band: "1 kHz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Intracellular via IFO-VGIC and DEP on mitotic spindle" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diathermy", pathways: ["B", "C"], desc: "Spin chemistry via CRY radical-pair mechanism" },
  ],
  fi: [
    { channel: "ELF", band: "f < 1 kHz", color: "border-blue-500/50", fda: "PEMF / TMS / VNS", pathways: ["A", "D", "E", "F"], desc: "Kalvomodulaatio H(f)-alipäästösuodattimen kautta" },
    { channel: "IF", band: "1 kHz – 1 MHz", color: "border-orange-500/50", fda: "TTFields (Optune)", pathways: ["A_mitotic"], desc: "Solunsisäinen IFO-VGIC:n ja DEP:n kautta mitoottiseen karaan" },
    { channel: "RF", band: "> 1 MHz", color: "border-red-500/50", fda: "PRF / Diatermia", pathways: ["B", "C"], desc: "Spin-kemia CRY:n radikaaliparimekanismin kautta" },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
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

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.narrativeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.narrativeLead}</p>

        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{activeLocale === "fi" ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground">{s.citation}</td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "therapeutic-device-paradox" && (
                <>
                  <div className="mt-8">
                    <TherapeuticFrequencyMap locale={activeLocale} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mt-8">
                    {d.paradoxCards.map((card) => (
                      <div key={card.label} className="rounded-lg border border-card-border bg-card-bg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{card.label}</p>
                        <p className="text-sm text-foreground-muted leading-relaxed">{card.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg border border-accent/20 bg-card-bg p-5">
                    <h4 className="text-sm font-semibold mb-3">{d.paradoxCalTitle}</h4>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.paradoxCal1}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.paradoxCal2}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.paradoxCal3}</p>
                  </div>

                  <CellSizeFrequencyMatrix locale={activeLocale} />
                </>
              )}

              {narrative.id === "covid" && (
                <ThreeChannelDiagram locale={activeLocale} />
              )}

              {narrative.id === "lighting" && (
                <div className="mt-8">
                  <LightingTransitionTimeline locale={activeLocale} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <RetrodictionCards locale={activeLocale} />

      {/* R4b-d: Ionic Treatment Hierarchy */}
      <section id="ionic-hierarchy" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "R4b-d: Ioninen hoitohierarkia" : "R4b-d: The Ionic Treatment Hierarchy"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Retrodiktio R4 esittää, että masennus reagoi paremmin sähköön kuin kemiaan. Ioninen hoitohierarkia selittää miksi: kaikki mielialahäiriöiden hoidot — SSRI:istä psykedeeeleihin — konvergoivat lopulta kalsiumhomeostaasiin. Niiden tehokkuus seuraa ionisen kohdistuksen astetta."
              : "Retrodiction R4 states that depression responds better to electricity than chemistry. The ionic treatment hierarchy explains why: all mood disorder treatments — from SSRIs to psychedelics — ultimately converge on calcium homeostasis. Their efficacy tracks with the degree of ionic directness."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4b — Litium: Litium on maailman vanhin ja tehokkain mielialastabilisaattori, ja ainoa joka vähentää itsemurhakuolleisuutta (meta-analyysi >14 000 potilasta). Sen mekanismi on ioninen, ei kemiallinen: Li⁺-ioni läpäisee jänniteriippuvaisen natriumkanavan (VGSC), korvaa Na⁺:n 1:1-suhteessa ja normalisoi solujen Na⁺/Ca²⁺-tasapainon. GWAS-tutkimukset liittävät litiumvasteen ionikanavageeneihin — ei serotoniiniteihin. Yhtään serotoniinilääkettä ei ole koskaan osoitettu vähentävän itsemurhakuolleisuutta."
              : "R4b — Lithium: Lithium is the world's oldest and most effective mood stabilizer, and the only one shown to reduce suicide mortality (meta-analysis of >14,000 patients). Its mechanism is ionic, not chemical: the Li⁺ ion permeates the voltage-gated sodium channel (VGSC), replaces Na⁺ at a 1:1 ratio, and normalizes cellular Na⁺/Ca²⁺ balance. GWAS studies link lithium response to ion channel genes — not serotonin pathways. No serotonin-based drug has ever been shown to reduce suicide mortality."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4c — Psykedeelit ja Ca²⁺-konvergenssi: Psilosybiinin (NEJM 2022, NNT ≈ 3) signaaliketju päättyy Cav1.2-kalsiumkanavaan (CACNA1C). Sousouri ym. (2025, PMC12491688) osoittivat, että 5-HT2A → Gq → IP3 → Ca²⁺-ER-vapautuminen aktivoi Cav1.2:n kautta massiivisen Ca²⁺-aallon — saman kanavan jonka EMF moduloi VGCC-mekanismin kautta. Ketamiini (NNT ≈ 3,5) saavuttaa saman Ca²⁺-konvergenssin NMDA-reseptorieston kautta: NMDA-esto → glutamaattipurkaus → AMPA → Ca²⁺-sisäänvirtaus. NMDA itsessään on ionikanava, ei välittäjäainereseptori."
              : "R4c — Psychedelics and Ca²⁺ convergence: Psilocybin's signal chain (NEJM 2022, NNT ≈ 3) terminates at the Cav1.2 calcium channel (CACNA1C). Sousouri et al. (2025, PMC12491688) demonstrated that 5-HT2A → Gq → IP3 → Ca²⁺ ER release activates Cav1.2, producing a massive Ca²⁺ surge — the same channel that EMF modulates via the VGCC mechanism. Ketamine (NNT ≈ 3.5) achieves the same Ca²⁺ convergence through NMDA receptor blockade: NMDA block → glutamate surge → AMPA → Ca²⁺ influx. NMDA itself is an ion channel, not a neurotransmitter receptor."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "R4d — Hierarkia: Viisitasoinen hierarkia (kemiallinen < sähkömagneettinen < ioninen krooninen < ioninen reset < totaalinen ioninen nollaus) selittää miksi nopeampi vaikutusmekanismi ennustaa suurempaa tehoa. SSRI:t (NNT 7) vaikuttavat ionikanaviin epäsuorasti viikkojen viiveellä. TMS/tDCS (NNT 5–6) indusoivat ionivirtoja suoraan. Litium korvaa Na⁺-ionin suoraan. Psykedeelit tuottavat akuutin Ca²⁺-resetin tunneissa. ECT — psykiatrian tehokkain hoito (70–80 % vaste hoitoresistenteissä) — laukaisee leviävän depolarisaatioaallon (CSD) joka nollaa koko korteksin ionigradientit (Rosenthal ym. 2025, Nature Communications). Tämä kuvio on yhteensopiva vain ionikanavahypoteesin kanssa."
              : "R4d — The hierarchy: The five-level hierarchy (chemical < electromagnetic < ionic chronic < ionic reset < total ionic reset) explains why faster mechanisms predict greater efficacy. SSRIs (NNT 7) affect ion channels indirectly over weeks. TMS/tDCS (NNT 5–6) induce ion currents directly. Lithium replaces the Na⁺ ion directly. Psychedelics produce an acute Ca²⁺ reset within hours. ECT — psychiatry's most effective treatment (70–80% response in treatment-resistant cases) — triggers cortical spreading depolarization (CSD) that resets all ionic gradients across the entire cortex (Rosenthal et al. 2025, Nature Communications). This pattern is consistent only with the ion channel hypothesis."}
          </p>
        </div>

        <IonicHierarchyDiagram locale={activeLocale} />

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Cipriani et al. (Lancet)</td>
                <td className="py-2 pr-3 font-mono-num">2018</td>
                <td className="py-2">{activeLocale === "fi" ? "21 masennuslääkettä, 116 477 potilasta: NNT ≈ 7 SSRI:ille" : "21 antidepressants, 116,477 patients: NNT ≈ 7 for SSRIs"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Goodwin et al. (NEJM)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "Psilosybiini vs essitalopraami: NNT ≈ 3, vaikutus tunneissa" : "Psilocybin vs escitalopram: NNT ≈ 3, effect within hours"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Sousouri et al. (PMC12491688)</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psykedeelit kohdistuvat samaan kanavaan kuin EMF" : "5-HT2A → Gq → IP3 → Cav1.2 (CACNA1C): psychedelics target the same channel as EMF"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">El-Mallakh & Bhansali</td>
                <td className="py-2 pr-3 font-mono-num">2004/2010</td>
                <td className="py-2">{activeLocale === "fi" ? "Li⁺ läpäisee VGSC:n, korvaa Na⁺:n: ionimekanismi, ei kemiallinen" : "Li⁺ permeates VGSC, replaces Na⁺: ionic mechanism, not chemical"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Zarate et al. (Arch Gen Psych)</td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{activeLocale === "fi" ? "Ketamiini: ensimmäinen RCT. NMDA on ionikanava, vaikutus tunneissa" : "Ketamine: first RCT. NMDA is an ion channel, effect within hours"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Rosenthal et al. (Nat Commun)</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "ECT laukaisee leviävän depolarisaatioaallon (CSD): totaalinen ioninen nollaus" : "ECT triggers cortical spreading depolarization (CSD): total ionic reset"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: litiumin ionimekanismi [E] (El-Mallakh/Bhansali data). Psykedeelien Ca²⁺/CACNA1C-konvergenssi [E] (Sousouri 2025). ECT:n CSD-mekanismi [E] (Rosenthal 2025). Hierarkiaennuste [M|C] (Lindgren)."
            : "Epistemic level: lithium ionic mechanism [E] (El-Mallakh/Bhansali data). Psychedelic Ca²⁺/CACNA1C convergence [E] (Sousouri 2025). ECT CSD mechanism [E] (Rosenthal 2025). Hierarchy prediction [M|C] (Lindgren)."}
        </p>
      </section>

      {/* The Skin Battery — dermal bioelectric system */}
      <section id="skin-battery" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Ihoakku — ihon biosähköinen sensorijärjestelmä" : "The Skin Battery — dermal bioelectric sensor system"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Iho ei ole passiivinen suoja vaan aktiivinen biosähköinen sensoriverkko. Epidermis ylläpitää jatkuvaa transepiteliaalista potentiaalia (TEP, 10–60 mV) Na⁺/K⁺-ATPaasin avulla — kirjaimellinen paristo joka generoi sähkökentän ihon läpi. Kun iho vaurioituu, TEP romahtaa ja generoi lateraalisen sähkökentän (100–200 mV/mm) joka ohjaa keratinosyyttien ja fibroblastien elektrotaksista. Tämä sähköinen signaali on ensimmäinen parantava signaali — ENNEN biokemiallisia signaaleja."
              : "Skin is not a passive barrier but an active bioelectric sensor network. The epidermis maintains a continuous transepithelial potential (TEP, 10–60 mV) via Na⁺/K⁺-ATPase — a literal battery that generates an electric field across the skin. When skin is wounded, TEP collapses and generates a lateral electric field (100–200 mV/mm) that guides keratinocyte and fibroblast electrotaxis. This electrical signal is the first healing signal — BEFORE biochemical signals."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Ihon dermis on pääasiassa kollageenia, joka on pietsosähköinen (7–8 pC/N): se muuntaa mekaanisen voiman suoraan sähköiseksi signaaliksi. Kosketuksen havaitseminen ei ole pelkästään mekaanisten reseptorien (PIEZO1/2) toimintaa — se on myös pietsosähköinen prosessi jossa kollageeni generoi jännitteen joka avaa SAMAT jänniteohjatut kalsiumkanavat (VGCC) jotka BERM identifioi EMF:n kohteiksi. Mekaaninen kosketus ja EMF konvergoivat samaan Ca²⁺-kanavaan."
              : "The skin dermis is primarily collagen, which is piezoelectric (7–8 pC/N): it converts mechanical force directly into electrical signal. Touch perception is not solely the work of mechanical receptors (PIEZO1/2) — it is also a piezoelectric process where collagen generates voltage that opens the SAME voltage-gated calcium channels (VGCC) that BERM identifies as EMF targets. Mechanical touch and EMF converge on the same Ca²⁺ channel."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Keratinosyyttien TRPV4 on multimodaalinen ionikanava joka reagoi mekaaniseen paineeseen, lämpöön (>27°C), UVB-säteilyyn ja osmoottiseen paineeseen — kaikki samaksi Ca²⁺-vasteeksi. TRPV4 välittää myös histaminergista kutinaa. Jos EMF aktivoi TRPV4:ää, tuloksena on kutina joka on erottamaton allergisesta kutinasta. Tämä selittää miksi EHS:n yleisimmät iho-oireet (pistely, polttelu, kutina) ovat biologisesti ennustettavia vasteita, eivät nocebo-ilmiöitä."
              : "Keratinocyte TRPV4 is a multimodal ion channel that responds to mechanical pressure, heat (>27°C), UVB radiation, and osmotic pressure — all producing the same Ca²⁺ response. TRPV4 also mediates histaminergic itch. If EMF activates TRPV4, the result is itch indistinguishable from allergic itch. This explains why the most common EHS skin symptoms (tingling, burning, itching) are biologically predictable responses, not nocebo phenomena."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Skedung ym. (2013, Scientific Reports) osoittivat, että ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero sormenjälkiharjanteeseen nähden on 15 000:1. Mekaaniset mallit eivät selitä tätä tarkkuutta. Pietsosähköinen + ionikanavaselitys voi: nanometritason pintarakenne generoi sähköisen signaalin joka on riittävän voimakas aktivoimaan VGCC/PIEZO1/TRPV4-kanavia. Tämä todistaa, että ihon sensorijärjestelmä operoi tasolla jossa EMF:n ja luonnollisten biosähköisten signaalien erottaminen on mahdotonta."
              : "Skedung et al. (2013, Scientific Reports) demonstrated that the human finger detects 13 nm ridges — a scale difference of 15,000:1 relative to fingerprint ridges. Mechanical models cannot explain this precision. The piezoelectric + ion channel explanation can: nanometer surface structure generates an electrical signal sufficient to activate VGCC/PIEZO1/TRPV4 channels. This proves the skin sensory system operates at a level where distinguishing EMF from natural bioelectric signals is impossible."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Lim et al. (SAGE Journals)</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "TEP 'ihoakku' 10–60 mV nisäkkään ihossa" : "TEP 'skin battery' 10–60 mV in mammalian skin"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Zhao et al. (Nature)</td>
                <td className="py-2 pr-3 font-mono-num">2006</td>
                <td className="py-2">{activeLocale === "fi" ? "Endogeeninen haavan sähkökenttä 100–200 mV/mm, ensimmäinen parantava signaali" : "Endogenous wound EF 100–200 mV/mm, first healing signal"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Fukada & Yasuda</td>
                <td className="py-2 pr-3 font-mono-num">1957</td>
                <td className="py-2">{activeLocale === "fi" ? "Luun pietsosähköisyys (laajennettu: kollageeni 7–8 pC/N)" : "Bone piezoelectricity (extended: collagen 7–8 pC/N)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Mohandas et al. (eLife)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "PIEZO1 keratinosyyteissä: mekanotransduktio ja Ca²⁺/Na⁺-permeabiliteetti" : "PIEZO1 in keratinocytes: mechanotransduction and Ca²⁺/Na⁺ permeability"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Skedung et al. (Scientific Reports)</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "Ihmisen sormi havaitsee 13 nm kohoumat — kokoluokkaero 15 000:1" : "Human finger detects 13 nm ridges — scale difference 15,000:1"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC4858974</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "TRPV4 välittää Ca²⁺-influksia ja histaminergista kutinaa keratinosyyteissä" : "TRPV4 mediates Ca²⁺ influx and histaminergic itch in keratinocytes"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: TEP ja haavan sähkökenttä [E] (Lim/Zhao). Pietsosähköinen kollageeni [E] (Fukada/Yasuda). VGCC-konvergenssi [E] (Pall/PMC5828134). EHS-selitys [M|C] (malli)."
            : "Epistemic level: TEP and wound EF [E] (Lim/Zhao). Piezoelectric collagen [E] (Fukada/Yasuda). VGCC convergence [E] (Pall/PMC5828134). EHS explanation [M|C] (model)."}
        </p>
      </section>

      <section className="mb-16">
        <BehavioralSuppression locale={activeLocale} />
      </section>

      {/* Sleep as mediating mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Unideprivaatio keskeisenä välittävänä mekanismina" : "Sleep deprivation as the central mediating mechanism"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Unideprivaatio tuottaa jokaisen biologisen lopputuloksen jonka BERM:n kuusi retrodiktiota kuvaavat: testosteronilasku (Leproult & Van Cauter: −10–15 % nuorilla miehillä), siittiölasku (−29 %, enemmän epämuodostumia), NK-solujen romahdus (Irwin: −70 % yhdessä yössä), metabolinen oireyhtymä (Spiegel ym.: pre-diabeettinen tila viikossa), sympaattinen yliaktivaatio (krooninen tulehdus) ja masennus (Walker: 'syy, ei oire'). Jos EMF häiritsee unta — kuten sirkadiaaninen polku (CRY/RPM, melatoniinisuppressio) ennustaa — kaikki kuusi retrodiktiota seuraavat yhden ylävirran syyn alavirtavaikutuksina."
              : "Sleep deprivation produces every biological outcome that BERM's six retrodictions describe: testosterone decline (Leproult & Van Cauter: −10–15% in young men), sperm decline (−29% with more deformities), NK cell collapse (Irwin: −70% in one night), metabolic syndrome (Spiegel et al.: pre-diabetic in one week), sympathetic overdrive (chronic inflammation), and depression (Walker: 'a cause, not a symptom'). If EMF disrupts sleep — which the circadian pathway (CRY/RPM, melatonin suppression) predicts — then ALL six retrodictions follow as downstream consequences of a single upstream cause."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Järjestys jossa nämä tilat ilmaantuvat vastaa modulooman ennustetta: unihäiriö ensin (lyhin latenssi, kuukausia), masennus toisena (1–3 vuotta), metabolinen oireyhtymä kolmantena (3–8 vuotta), autoimmuunisairaus neljäntenä (5–10 vuotta), hedelmällisyyslasku viidentenä (5–15 vuotta), syöpä kuudentena (10–25 vuotta). Tämä järjestys ei ole mielivaltainen — se heijastaa kunkin kudoksen uusiutumisnopeutta ja kumulatiivisen vaurion kynnystä. Walker dokumentoi saman kaskadin empiirisesti ilman EMF-kehystä, tarjoten riippumattoman validoinnin modulooman ennustamalle järjestykselle."
              : "The order in which these conditions appear matches the modulome's prediction: sleep disruption first (shortest latency, months), depression second (1–3 years), metabolic syndrome third (3–8 years), autoimmune disease fourth (5–10 years), fertility decline fifth (5–15 years), cancer sixth (10–25 years). This order is not arbitrary — it reflects each tissue's regeneration rate and cumulative damage threshold. Walker documents this same cascade empirically without an EMF framework, providing independent validation of the modulome's predicted ordering."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Jos uniepidemia johtuisi yksinomaan sinisestä valosta, sinisen valon suodatus (Night Shift, f.lux, keltaiset lasit) korjaisi sen. Se ei korjaa: Duraccio ym. (2021) osoitti, ettei Night Shift-tila parantanut merkittävästi objektiivista unenlaatua. BERM ehdottaa, että sähkömagneettisen kentän komponentti (laitteen RF, LED-valaistuksen IF) on itsenäinen unihäiritsijä joka toimii CRY/RPM-mekanismin kautta, ei retinaalisen melanopsiinin. Tämä selittää miksi valon suodatus ei riitä — EMF-polku ohittaa silmän kokonaan."
              : "If the sleep epidemic were caused solely by blue light from screens, blue-light filtering (Night Shift, f.lux, amber glasses) should resolve it. It does not: Duraccio et al. (2021) showed that Night Shift mode did not significantly improve objective sleep quality. BERM proposes that the electromagnetic field component (RF from the device, IF from LED lighting) is an independent sleep disruptor that operates through the CRY/RPM mechanism, not through retinal melanopsin. This explains why filtering light is insufficient — the EMF pathway bypasses the eye entirely."}
          </p>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Walker MP</td>
                <td className="py-2 pr-3 font-mono-num">2017</td>
                <td className="py-2">{activeLocale === "fi" ? "Uni → testosteroni −10–15 %, siittiöt −29 %, NK-solut −70 %, metabolinen oireyhtymä, masennus (kausaalinen)" : "Sleep → testosterone −10–15%, sperm −29%, NK cells −70%, metabolic syndrome, depression (causal)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Leproult & Van Cauter (JAMA)</td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{activeLocale === "fi" ? "5h uni 1 viikko → testosteroni −10–15 % nuorilla miehillä" : "5h sleep for 1 week → testosterone −10–15% in young men"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Irwin MR (Annu Rev Psychol)</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "4h uni 1 yö → NK-solut −70 %. WHO 2A: yötyö" : "4h sleep 1 night → NK cells −70%. WHO 2A: night-shift work"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Spiegel, Leproult & Van Cauter (Lancet)</td>
                <td className="py-2 pr-3 font-mono-num">1999</td>
                <td className="py-2">{activeLocale === "fi" ? "4h uni 6 yötä → pre-diabeettinen glukoositoleranssi" : "4h sleep for 6 nights → pre-diabetic glucose tolerance"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Chang et al. (PNAS)</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "iPad-lukeminen: melatoniini −50 %, viive +3h, LED 2× vs hehku" : "iPad reading: melatonin −50%, delay +3h, LED 2× vs incandescent"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Duraccio et al. (Sleep Health)</td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{activeLocale === "fi" ? "Night Shift EI parantanut objektiivista unenlaatua" : "Night Shift did NOT improve objective sleep quality"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: mekanismi [E] (Walker/Leproult/Irwin/Spiegel data). EMF-kytkentä: [M|C] (CRY/RPM + Lindecke 2026)."
            : "Epistemic level: mechanism [E] (Walker/Leproult/Irwin/Spiegel data). EMF linkage: [M|C] (CRY/RPM + Lindecke 2026)."}
        </p>
      </section>

      {/* Proxy masking: Walker example */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Proksimasking: unitutkimuksen sokea piste" : "Proxy masking: the blind spot in sleep science"}
        </h2>
        <div className="max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {activeLocale === "fi"
              ? "Paradigmaattinen esimerkki: Matthew Walkerin 'Why We Sleep' (2017) on kenties vaikutusvaltaisin unitutkimuksen kirja koskaan. Walker analysoi laajasti miten LED-näytöt suppressoivat melatoniinia sinisen valon kautta. Hän dokumentoi LED-sinisen valon aiheuttavan 2× melatoniinisuppression verrattuna hehkulamppuun samalla intensiteetillä. Silti hän ei koskaan kysy tuottavatko LED-laitteet muuta kuin valoa — erityisesti, emittoivatko jokaisen LED-laitteen hakkuriteholähteet keskitaajuisia sähkömagneettisia kenttiä (20–200 kHz) jotka voisivat itsenäisesti häiritä sirkadiaanista järjestelmää CRY/RPM-mekanismin kautta. Sähkömagneettinen kenttä ei ole hänen käsitteellisessä sanastossaan. Tämä ei ole kritiikki Walkeria kohtaan — se on osoitus siitä, miten täydellisesti EMF-hypoteesi puuttuu valtavirran unitieteestä."
              : "A paradigmatic example: Matthew Walker's 'Why We Sleep' (2017) is perhaps the most influential sleep science book ever written. Walker devotes extensive analysis to how LED screens suppress melatonin through blue light. He documents that LED blue light has twice the melatonin-suppressing effect of incandescent light at matched intensity. Yet he never asks whether LED devices produce anything other than light — specifically, whether the switch-mode power supplies in every LED device emit intermediate-frequency electromagnetic fields (20–200 kHz) that might independently disrupt the circadian system through the CRY/RPM mechanism. The electromagnetic field is not in his conceptual vocabulary. This is not a criticism of Walker — it is a demonstration of how completely the EMF hypothesis is absent from mainstream sleep science."}
          </p>
        </div>
      </section>

      {/* Orphaned findings */}
      <section id="orphaned-findings" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Hylätyt havainnot: data ilman mekanismia" : "Orphaned Findings: Data Without a Mechanism"}
        </h2>
        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Tutkija" : "Researcher"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Havainto" : "Finding"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Kritiikki" : "Criticism"}</th>
                <th className="py-2 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Mekanismi (nyt)" : "Mechanism (now)"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {[
                { year: "1976", researcher: "Adey-Blackman",
                  finding: activeLocale === "fi" ? "Ca²⁺ ikkunailmiö" : "Ca²⁺ window effect",
                  criticism: activeLocale === "fi" ? "\"Ei-lineaarinen = artefakti\"" : "\"Non-linear = artifact\"",
                  mechanism: activeLocale === "fi" ? "Resonanssi-oskillaatio (Kim 2026)" : "Resonance oscillation (Kim 2026)" },
                { year: "1995", researcher: "Lai-Singh",
                  finding: activeLocale === "fi" ? "DNA-katkokset" : "DNA strand breaks",
                  criticism: activeLocale === "fi" ? "\"Liian heikko fotoni\"" : "\"Photon too weak\"",
                  mechanism: activeLocale === "fi" ? "ROS via VGCC/IFO (Panagopoulos 2025)" : "ROS via VGCC/IFO (Panagopoulos 2025)" },
                { year: "2013", researcher: "Pall",
                  finding: activeLocale === "fi" ? "VGCC: 23 tutkimusta" : "VGCC: 23 studies",
                  criticism: activeLocale === "fi" ? "\"Liian yksinkertainen\"" : "\"Too simple\"",
                  mechanism: activeLocale === "fi" ? "3 reittiä: IFO + RPM + Cyb5b" : "3 pathways: IFO + RPM + Cyb5b" },
                { year: "2025", researcher: "Sousouri",
                  finding: "CACNA1C × 5G",
                  criticism: activeLocale === "fi" ? "\"Liian pieni otos\"" : "\"Sample too small\"",
                  mechanism: activeLocale === "fi" ? "Geneettinen VGCC-tiheysvaihtelu" : "Genetic VGCC density variation" },
                { year: "2026", researcher: "Kim",
                  finding: activeLocale === "fi" ? "Geenikytkimen aktivaatio" : "Gene switch activation",
                  criticism: "\"Incredibly implausible\"",
                  mechanism: activeLocale === "fi" ? "Lindgrenin χ(Ā) saturaatio" : "Lindgren's χ(Ā) saturation" },
              ].map((row) => (
                <tr key={row.year} className="border-b border-card-border/50">
                  <td className="py-2 pr-3 font-mono-num">{row.year}</td>
                  <td className="py-2 pr-3">{row.researcher}</td>
                  <td className="py-2 pr-3">{row.finding}</td>
                  <td className="py-2 pr-3 italic">{row.criticism}</td>
                  <td className="py-2">{row.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="max-w-4xl space-y-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {activeLocale === "fi"
              ? "Jokaisessa tapauksessa empiirinen havainto oli vahva — usein julkaistu huipputason lehdissä (Cell, NeuroImage, Bioelectromagnetics). Kritiikki ei kohdistunut dataan vaan MEKANISMIIN: miten niin heikot kentät voivat tuottaa biologisia vaikutuksia? Tämä \"epäuskottavuusargumentti\" ei ole tieteellinen kumoaminen — se on argumentti tietämättömyydestä, joka sekoittaa \"emme tunne mekanismia\" ja \"mekanismia ei ole.\""
              : "In each case, the empirical observation was strong — often published in top-tier journals (Cell, NeuroImage, Bioelectromagnetics). The criticism targeted not the data but the mechanism: how could such weak fields produce biological effects? This 'implausibility argument' is not a scientific rebuttal — it is an argument from ignorance that confuses 'we don't know the mechanism' with 'there is no mechanism.'"}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {activeLocale === "fi"
              ? "Lindgrenin susceptibiliteettifunktio χ(Ā) ratkaisee kaikki viisi tapausta samanaikaisesti. Solukalvon sähkökenttä (~10⁷ V/m) luo susceptibiliteetin joka on jo lähellä saturaatiota. Ionikanavan jännitesensorit, jotka ovat säilyneet 3 miljardia vuotta (Zakon 2012), toimivat kvanttirajan herkkyydellä — kuten silmän fotoreseptori. Ulkoinen kenttä 10⁻⁵ V/m on ionikanavalle sama kuin yksittäinen fotoni verkkokalvolle: yksittäin pieni, mutta havaittavissa koska sensori kehittyi havaitsemaan juuri tämän."
              : "Lindgren's susceptibility function χ(Ā) resolves all five cases simultaneously. The membrane electric field (~10⁷ V/m) creates a susceptibility that is already near saturation. Ion channel voltage sensors, conserved for 3 billion years (Zakon 2012), operate at quantum-limit sensitivity — like the eye's photoreceptor. An external field of 10⁻⁵ V/m is to the ion channel what a single photon is to the retina: individually tiny, but detectable because the sensor evolved to detect exactly this."}
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            {activeLocale === "fi"
              ? "Episteeminen taso: [L] (Lindgrenin tulkinta) yhdistettynä [E]-tason empiirisiin havaintoihin."
              : "Epistemic level: [L] (Lindgren's interpretation) combined with [E]-level empirical findings."}
          </p>
        </div>
      </section>

      {/* 10 independent research domains */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "10 riippumatonta tutkimusalaa" : "10 independent research domains"}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {activeLocale === "fi"
            ? "BERM:n mekanistiset polut perustuvat 10 toisistaan riippumattomaan tutkimusalaan. Mikään yksittäinen ala ei riitä, mutta niiden konvergenssi samaan ennusteeseen — sähkömagneettisten kenttien biologinen aktiivisuus — on epätodennäköistä sattumalta."
            : "BERM's mechanistic pathways draw on 10 mutually independent research domains. No single domain is sufficient, but their convergence on the same prediction — biological activity of electromagnetic fields — is unlikely by chance."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 max-w-4xl">
          {(activeLocale === "fi" ? [
            { n: "01", t: "Onkologia", d: "TTFields (FDA-hyväksytty): 100–300 kHz kentät häiritsevät solunjakautumista. Novocure, kliiniset kokeet." },
            { n: "02", t: "Ortopedia", d: "PEMF-luunstimulaattorit (FDA 1986): pulssimuotoinen EMF kiihdyttää luun paranemista. 30+ vuoden kliininen käyttö." },
            { n: "03", t: "Neurologia", d: "TMS, tDCS, VNS, DBS: ei-termiset EMF-laitteet hoitavat masennusta, epilepsiaa, Parkinsonia. 160 000+ implantoitua DBS-laitetta." },
            { n: "04", t: "Kvanttbiologia", d: "Radikaalipari/CRY-mekanismi (RPM): lintujen magneettiaisti perustuu kryptokromiin. Sherrard 2018: pulssi-EMF tuottaa ROS:ia CRY-riippuvaisesti." },
            { n: "05", t: "Solubiologia", d: "IFO-VGIC (Panagopoulos 2025): ionien pakotettu oskillaatio jänniteohjattujen kalsiumkanavien kautta. Kynnys 10⁻⁵ V/m." },
            { n: "06", t: "Ei-ionotrooppinen VGCC", d: "Trus ym. 2024 (Hebr. yliopisto): VGCC aktivoi solunsisäisiä signaalireittejä konformaatiomuutoksella ILMAN ionifluksia." },
            { n: "07", t: "Entomologia", d: "Mehiläis-EMF-data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Mehiläisten piping, hyönteiskato, RF-absorptio." },
            { n: "08", t: "Parasitologia", d: "England 2023: punkit vedetään isäntiin sähköstaattisesti. Staattisten kenttien biologinen aktiivisuus." },
            { n: "09", t: "Geometrinen fysiikka", d: "Lindgren-metriikka: 87,5 % RPM-Hamiltoniaanin elementeistä johdettavissa geometriasta. Ennustaa tausta- ja kulmariippuvuuden." },
            { n: "10", t: "Sähköekologia", d: "Bristol (Clarke, Robert, England, Mallinson): ilman sähköreseptio, mehiläisten sähköinen viestintä, antropogeeniset kentät −71 % mehiläislaskeutumisia." },
          ] : [
            { n: "01", t: "Oncology", d: "TTFields (FDA-approved): 100–300 kHz fields disrupt cell division. Novocure, clinical trials." },
            { n: "02", t: "Orthopedics", d: "PEMF bone stimulators (FDA 1986): pulsed EMF accelerates bone healing. 30+ years of clinical use." },
            { n: "03", t: "Neurology", d: "TMS, tDCS, VNS, DBS: non-thermal EMF devices treat depression, epilepsy, Parkinson's. 160,000+ implanted DBS devices." },
            { n: "04", t: "Quantum biology", d: "Radical-pair/CRY mechanism (RPM): bird magnetoreception via cryptochrome. Sherrard 2018: pulsed EMF produces ROS CRY-dependently." },
            { n: "05", t: "Cell biology", d: "IFO-VGIC (Panagopoulos 2025): ion forced oscillation via voltage-gated calcium channels. Threshold 10⁻⁵ V/m." },
            { n: "06", t: "Non-ionotropic VGCC", d: "Trus et al. 2024 (Hebrew U.): VGCC activates intracellular signaling via conformational change WITHOUT ion flux." },
            { n: "07", t: "Entomology", d: "Bee-EMF data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Bee piping, insect decline, RF absorption." },
            { n: "08", t: "Parasitology", d: "England 2023: ticks attracted to hosts electrostatically. Biological activity of static fields." },
            { n: "09", t: "Geometric physics", d: "Lindgren metric: 87.5% of RPM Hamiltonian elements derivable from geometry. Predicts background and angle dependence." },
            { n: "10", t: "Electroecology", d: "Bristol (Clarke, Robert, England, Mallinson): aerial electroreception, bee electric communication, anthropogenic fields −71% bee landings." },
          ]).map((item) => (
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
                        <h4 className="font-serif text-base font-semibold leading-snug tracking-[-0.014em]">{record.citation}</h4>
                        <p className="mt-1 text-sm text-foreground-muted">{record.studyType} · {record.system}</p>
                      </div>
                      <span className="font-mono-num text-xs text-foreground-muted">{record.year}</span>
                    </div>
                    <p className="mb-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{record.finding}</p>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-card-border pt-3 text-sm leading-relaxed md:grid-cols-2">
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.nodes}</dt><dd className="text-foreground-muted">{causalNodeLabels(record.causalNodes, activeLocale).join(" · ")}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.field}</dt><dd className="text-foreground-muted">{record.fieldClass}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.scope}</dt><dd className="text-foreground-muted">{record.scope}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.limitations}</dt><dd className="text-foreground-muted">{record.limitations.join("; ")}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono-num text-foreground-muted">{d.fields.role}: {record.calibrationRole === "STRUCTURAL_ONLY" ? d.structural : d.contextual}</span>
                      <a href={record.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{d.fields.source} ↗</a>
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
          <EvidenceClassification locale={activeLocale} />
        </div>
      </section>

      {/* Three frequency channels grouping */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.channelGroupTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.channelGroupLead}</p>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          {(CHANNEL_GROUPS[activeLocale === "fi" ? "fi" : "en"]).map((ch) => (
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
          const pathwayLabel = PATHWAY_LABELS[pathway]?.[activeLocale] ?? pathway;
          return (
            <div key={pathway} className="mb-10">
              <h3 className="text-sm font-semibold mb-4">
                <span className="font-mono-num text-accent mr-2">{pathway}</span>
                {pathwayLabel}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-12">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
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
                            {r.citation}
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
                              <span className="ml-1 font-normal text-foreground-muted">{EVIDENCE_LEVEL_LABELS[r.level][activeLocale]}</span>
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
                            {STATUS_LABELS[r.status]?.[activeLocale] ?? r.status}
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

      <section className="editorial-rail mb-14 max-w-4xl border-y border-card-border py-5">
        <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.sentinel}</p>
        <Link href={`/${activeLocale}/sentinel`} className="text-sm text-accent hover:underline">{d.sentinelLink} →</Link>
      </section>

      {/* Chronic disease cascade × EMF timeline */}
      <DiseaseCascadeTimeline locale={activeLocale} />

      {/* BERM-Eco differential susceptibility */}
      <DifferentialSusceptibility locale={activeLocale} />

      <section className="mb-14">
        <HindcastValidation locale={activeLocale} />
      </section>

      <StatisticalValidation locale={activeLocale} />

      <section className="mt-14">
        <ReferencesSummary locale={activeLocale} />
      </section>

      <NextPageLink
        href={`/${activeLocale}/objections`}
        label={activeLocale === "fi" ? "Seuraavaksi" : "Next"}
        title={activeLocale === "fi" ? "Kritiikki ja vastaukset" : "Criticism and responses"}
        icon={ShieldQuestion}
      />
    </div>
  );
}
