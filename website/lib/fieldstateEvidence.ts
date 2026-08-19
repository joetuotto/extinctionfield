/**
 * Bounded study-to-node evidence for the FieldState–ASFR v2 route.
 *
 * This mirrors `berm/data/evidence/fieldstate_causal_evidence.json` in the
 * model repository. These records locate evidence within the causal graph;
 * none is an estimated TFR coefficient or a substitute for a matched local
 * FieldState / biological-endpoint panel.
 */

export type FieldStateDirectness =
  | "PHYSICS_SIGNATURE"
  | "MECHANISTIC_INTERMEDIATE"
  | "REPRODUCTIVE_ENDPOINT"
  | "SYSTEMATIC_REVIEW"
  | "POPULATION_DESCRIPTIVE";

export type FieldStateCalibrationRole = "STRUCTURAL_ONLY" | "CONTEXT_ONLY";

export interface FieldStateEvidenceRecord {
  readonly id: string;
  readonly citation: string;
  readonly year: number;
  readonly url: string;
  readonly studyType: string;
  readonly system: string;
  readonly fieldClass: string;
  readonly finding: string;
  readonly causalNodes: readonly string[];
  readonly directness: FieldStateDirectness;
  readonly scope: string;
  readonly calibrationRole: FieldStateCalibrationRole;
  readonly limitations: readonly string[];
  /** Deliberately explicit: records may inform structure, never a TFR slope. */
  readonly isTfrCoefficient: false;
}

export const FIELDSTATE_EVIDENCE: readonly FieldStateEvidenceRecord[] = [
  {
    id: "BLACKMAN_1985_BACKGROUND_FREQUENCY",
    citation: "Blackman CF et al. Bioelectromagnetics (1985)",
    year: 1985,
    url: "https://doi.org/10.1002/bem.2250060402",
    studyType: "Controlled in-vitro experiment",
    system: "Chick brain tissue",
    fieldClass: "ELF electric field with altered local geomagnetic background",
    finding: "Changing local geomagnetism shifted the ELF frequencies associated with calcium efflux.",
    causalNodes: ["FIELDSTATE_VECTOR", "A_VGCC_ROS"],
    directness: "PHYSICS_SIGNATURE",
    scope: "Supports background-dependent field-state measurement, not human reproduction or TFR.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["In-vitro avian tissue", "Calcium-efflux endpoint", "Historic protocol"],
    isTfrCoefficient: false,
  },
  {
    id: "RITZ_2004_VECTOR_ANGLE",
    citation: "Ritz T et al. Nature (2004)",
    year: 2004,
    url: "https://doi.org/10.1038/nature02534",
    studyType: "Controlled animal orientation experiment",
    system: "European robins",
    fieldClass: "Oscillating RF magnetic field at a controlled angle to geomagnetic background",
    finding: "Orientation disruption depended on the relative angle between RF and static background fields.",
    causalNodes: ["FIELDSTATE_VECTOR", "B_RPM_CRY"],
    directness: "PHYSICS_SIGNATURE",
    scope: "Supports a vector/angle signature for radical-pair magnetoreception, not human reproduction.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Avian navigation endpoint", "No identified human receptor", "No fertility endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "USSELMAN_2016_ORIENTATION_ROS",
    citation: "Usselman RJ et al. Scientific Reports (2016)",
    year: 2016,
    url: "https://doi.org/10.1038/srep38543",
    studyType: "Controlled cell experiment",
    system: "Human endothelial cells and a radical-pair chemistry system",
    fieldClass: "1.4 MHz RF magnetic field with 50 microtesla static field and controlled orientation",
    finding: "Field orientation changed radical-pair ROS yield and endothelial bioenergetic readouts.",
    causalNodes: ["FIELDSTATE_VECTOR", "B_RPM_CRY", "A_VGCC_ROS"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports a geometry-sensitive ROS intermediate, not organ-specific fertility capacity.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Cell culture and chemical model", "Endothelial cells", "Not a population dose"],
    isTfrCoefficient: false,
  },
  {
    id: "MAJEWSKA_2025_CRY4A_MEMBRANE",
    citation: "Majewska M et al. ACS Chemical Biology (2025)",
    year: 2025,
    url: "https://doi.org/10.1021/acschembio.4c00576",
    studyType: "Protein–membrane experiment and molecular simulation",
    system: "European robin Cry4a and model lipid bilayers",
    fieldClass: "Receptor geometry / membrane anchoring study",
    finding: "Cry4a associated with lipid bilayers in an ordered manner controlled by membrane physical state.",
    causalNodes: ["FIELDSTATE_VECTOR", "B_RPM_CRY"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports modelling receptor orientation and membrane state, not a human cryptochrome fertility pathway.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Avian protein", "Model membrane", "No applied exposure or reproductive endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "ZANDIEH_2025_MITO_RESONANCE",
    citation: "Zandieh A et al. Scientific Reports (2025)",
    year: 2025,
    url: "https://doi.org/10.1038/s41598-025-87235-w",
    studyType: "Cell experiment with dynamical model",
    system: "Cancer cell lines",
    fieldClass: "ELF magnetic fields, 0.01–5 Hz and 0–100 mT",
    finding: "Mitochondrial-potential and ROS responses varied with frequency, including 0.02 and 0.04 Hz conditions.",
    causalNodes: ["FIELDSTATE_ENVELOPE", "A_VGCC_ROS", "VMEM_MTOR"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports testing a state-dependent envelope/resonance feature, not RF network modulation or reproduction.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Cancer cell systems", "Includes high millitesla fields", "No reproductive endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "SHERRARD_2018_CRY_ROS",
    citation: "Sherrard RM et al. PLOS Biology (2018)",
    year: 2018,
    url: "https://doi.org/10.1371/journal.pbio.2006229",
    studyType: "Controlled cell experiment with cryptochrome loss-of-function",
    system: "Human HEK293 cells and mouse embryonic fibroblasts",
    fieldClass: "Weak pulsed electromagnetic fields",
    finding: "Field-associated ROS and response-gene changes required cryptochrome in the tested cell systems.",
    causalNodes: ["B_RPM_CRY", "A_VGCC_ROS"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Informs a CRY-to-ROS bridge in cells, not device-specific gonadal dose or fertility effect size.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Cell models", "PEMF rather than consumer RF", "No reproductive endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "CAO_2015_RF_CIRCADIAN_REDOX",
    citation: "Cao H et al. International Journal of Environmental Research and Public Health (2015)",
    year: 2015,
    url: "https://doi.org/10.3390/ijerph120202071",
    studyType: "Controlled animal experiment",
    system: "Rats",
    fieldClass: "1.8 GHz RF exposure at six time-of-day conditions",
    finding: "Melatonin and antioxidant rhythm measures varied by RF exposure time in the protocol.",
    causalNodes: ["B_RPM_CRY", "MELATONIN_REDOX", "HPA_HPG", "OOCYTE_REDOX"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports a circadian/redox context in FieldState, not human conception or birth rates.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Single RF protocol", "Hormone and antioxidant endpoints"],
    isTfrCoefficient: false,
  },
  {
    id: "DE_IULIIS_2009_HUMAN_SPERM",
    citation: "De Iuliis GN et al. PLOS ONE (2009)",
    year: 2009,
    url: "https://doi.org/10.1371/journal.pone.0006446",
    studyType: "Controlled in-vitro human sperm experiment",
    system: "Purified human spermatozoa",
    fieldClass: "1.8 GHz RF-EMR, 0.4–27.5 W/kg SAR",
    finding: "The exposure system linked increasing SAR with mitochondrial ROS, oxidative DNA damage, lower motility and vitality.",
    causalNodes: ["A_VGCC_ROS", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Direct human gamete evidence, but not a population FieldState or TFR estimate.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["In-vitro sperm preparation", "No BTB or whole-organ compensation", "Different dose context"],
    isTfrCoefficient: false,
  },
  {
    id: "YU_2020_LOCAL_4G_BTB",
    citation: "Yu G et al. Science of the Total Environment (2020)",
    year: 2020,
    url: "https://doi.org/10.1016/j.scitotenv.2019.133860",
    studyType: "Controlled adult-rat local-exposure experiment with mechanistic rescue",
    system: "Adult rat testes",
    fieldClass: "Localized 4G smartphone RF exposure to the scrotal region",
    finding: "Reported delayed sperm/reproductive changes and a Spock3–MMP2 blood-testis-barrier axis; Spock3 inhibition was a rescue arm.",
    causalNodes: ["FIELDSTATE_VECTOR", "BARRIER_BTB", "MALE_GERMLINE_RESERVE", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Supports a local BTB branch in the model structure, not human transfer or TFR calibration.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Specific local smartphone protocol", "No human exposure-response calibration"],
    isTfrCoefficient: false,
  },
  {
    id: "MEENA_2014_MELATONIN_RESCUE",
    citation: "Meena R et al. Electromagnetic Biology and Medicine (2014)",
    year: 2014,
    url: "https://doi.org/10.3109/15368378.2013.781035",
    studyType: "Controlled animal experiment with melatonin intervention",
    system: "Wistar rat testes and semen endpoints",
    fieldClass: "2.45 GHz microwave exposure, reported SAR 0.14 W/kg",
    finding: "Reported redox, testosterone, sperm and DNA-fragmentation changes attenuated in the melatonin arm.",
    causalNodes: ["A_VGCC_ROS", "MELATONIN_REDOX", "MALE_SPERM", "MALE_STEROIDOGENESIS"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Supports a redox-mediated testis branch and mediator test, not a human prevention recommendation or effect size.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Protocol-specific intervention", "No human fertility endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "AHMADI_2016_OVARIAN_FOLLICLES",
    citation: "Ahmadi SS et al. Electronic Physician (2016)",
    year: 2016,
    url: "https://doi.org/10.19082/2168",
    studyType: "Controlled developmental animal experiment",
    system: "Rat ovaries exposed during intrauterine and postnatal development",
    fieldClass: "50 Hz magnetic-field exposure for 8 or 13 weeks",
    finding: "Reported higher follicular atresia and ovarian/oocyte morphological changes after the protocol.",
    causalNodes: ["VMEM_MTOR", "BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE", "OOCYTE_REDOX"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Supports a developmental ovarian-reserve state, not a human reserve-decline estimate.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Histological endpoints", "No human AMH/AFC or fertility calibration"],
    isTfrCoefficient: false,
  },
  {
    id: "LOCHHEAD_2010_ROS_BBB",
    citation: "Lochhead JJ et al. Journal of Cerebral Blood Flow and Metabolism (2010)",
    year: 2010,
    url: "https://doi.org/10.1038/jcbfm.2010.29",
    studyType: "Controlled animal barrier experiment",
    system: "Rat blood-brain barrier",
    fieldClass: "Oxidative-stress manipulation, not EMF exposure",
    finding: "Oxidative stress increased BBB permeability and altered occludin localization; antioxidant treatment attenuated the change.",
    causalNodes: ["A_VGCC_ROS", "BARRIER_BBB"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports a redox-to-tight-junction bridge for the BBB branch; it is not direct EMF evidence.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Non-EMF upstream manipulation", "BBB rather than reproductive barrier", "Animal model"],
    isTfrCoefficient: false,
  },
  {
    id: "CHAKRABORTY_2020_OXIDATIVE_BTB",
    citation: "Chakraborty P et al. Reproductive Toxicology (2020)",
    year: 2020,
    url: "https://doi.org/10.1016/j.reprotox.2020.06.012",
    studyType: "Controlled animal mechanism experiment",
    system: "Rat testis and blood-testis barrier",
    fieldClass: "Oxidative-stress manipulation, not EMF exposure",
    finding: "Oxidative stress accompanied lower BTB junction proteins and adverse sperm endpoints in the model.",
    causalNodes: ["A_VGCC_ROS", "BARRIER_BTB", "MALE_SPERM"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports the redox-to-BTB-to-sperm bridge, not direct EMF evidence.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Non-EMF upstream manipulation", "Animal model", "No human fecundability mapping"],
    isTfrCoefficient: false,
  },
  {
    id: "LIU_2014_OVARIAN_CLOCK_IMPLANTATION",
    citation: "Liu Y et al. Proceedings of the National Academy of Sciences (2014)",
    year: 2014,
    url: "https://doi.org/10.1073/pnas.1209249111",
    studyType: "Cell-specific genetic animal experiment",
    system: "Mouse ovarian steroidogenic cells",
    fieldClass: "Downstream circadian mechanism, not EMF exposure",
    finding: "Ovarian Bmal1 disruption impaired progesterone support and implantation in the experimental system.",
    causalNodes: ["B_RPM_CRY", "HPA_HPG", "OVULATION_CLOCK", "IMPLANTATION"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports the clock-to-steroidogenesis-to-implantation segment, not an EMF-to-Bmal1 effect size.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Genetic mouse model", "No EMF exposure", "Implantation rather than population fertility"],
    isTfrCoefficient: false,
  },
  {
    id: "HE_2016_OOCYTE_MELATONIN",
    citation: "He C et al. International Journal of Molecular Sciences (2016)",
    year: 2016,
    url: "https://doi.org/10.3390/ijms17060939",
    studyType: "Mouse oocyte and IVF experiment",
    system: "Murine oocytes and embryo-development endpoints",
    fieldClass: "Downstream redox/melatonin mechanism, not EMF exposure",
    finding: "Melatonin/redox manipulation changed mitochondrial and oxidative-damage markers and embryo-development measures.",
    causalNodes: ["MELATONIN_REDOX", "OOCYTE_REDOX", "IMPLANTATION"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "Supports oocyte redox-resilience state, not direct EMF evidence or a human IVF prediction.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Mouse oocytes", "Manipulation is not EMF", "No population fertility endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "CORDELLI_2024_MALE_FERTILITY_REVIEW",
    citation: "Cordelli E et al. Environment International (2024)",
    year: 2024,
    url: "https://doi.org/10.1016/j.envint.2024.108509",
    studyType: "WHO-commissioned systematic review and meta-analysis",
    system: "Non-human mammals and human sperm in vitro",
    fieldClass: "RF-EMF from 100 kHz to 300 GHz",
    finding: "Reported lower pregnancy rate (moderate certainty) and lower sperm count (low certainty), no litter-size effect (moderate certainty), and very-low certainty for several other pooled endpoints.",
    causalNodes: ["MALE_SPERM", "MALE_STEROIDOGENESIS", "COUPLE_FECUNDABILITY"],
    directness: "SYSTEMATIC_REVIEW",
    scope: "Review-level context for male reproductive branches, not an individual human exposure study or TFR coefficient.",
    calibrationRole: "CONTEXT_ONLY",
    limitations: ["Mostly non-human mammals and human sperm in vitro", "Exposure relevance and thermal conditions vary", "Pregnancy-rate analysis was later corrected and is sensitive to a high-SAR study"],
    isTfrCoefficient: false,
  },
  {
    id: "CORDELLI_2025_CORRIGENDUM",
    citation: "Cordelli E et al. Corrigendum, Environment International (2025)",
    year: 2025,
    url: "https://doi.org/10.1016/j.envint.2025.109449",
    studyType: "Correction to systematic-review meta-analysis",
    system: "Re-analysis of the 2024 review data",
    fieldClass: "RF-EMF evidence synthesis",
    finding: "Corrected the pregnancy-rate meta-analysis; the revised result is partly driven by a high-SAR study and becomes non-significant when that study is excluded.",
    causalNodes: ["MALE_SPERM", "COUPLE_FECUNDABILITY"],
    directness: "SYSTEMATIC_REVIEW",
    scope: "Constrains interpretation of the 2024 review and must accompany it; it is not a population TFR result.",
    calibrationRole: "CONTEXT_ONLY",
    limitations: ["Pooled-estimate stability concern", "Mainly non-human/experimental evidence", "No direct population dose-response"],
    isTfrCoefficient: false,
  },
  {
    id: "NADERI_2026_RODENT_SYSTEMATIC_REVIEW",
    citation: "Naderi N et al. Reproductive Toxicology (2026)",
    year: 2026,
    url: "https://doi.org/10.1016/j.reprotox.2026.109300",
    studyType: "Systematic review of rodent experiments",
    system: "Rat and mouse spermatogenesis/sperm studies",
    fieldClass: "800–24,000 MHz RF-EMR; reported SAR 0.014–34 W/kg",
    finding: "Identified 88 eligible rodent studies across sperm, oxidative-stress, DNA, apoptosis, histopathology and hormone endpoints.",
    causalNodes: ["A_VGCC_ROS", "MALE_SPERM", "MALE_STEROIDOGENESIS"],
    directness: "SYSTEMATIC_REVIEW",
    scope: "Supports a multi-endpoint male branch and parameter-search agenda; heterogeneity prevents one biological coefficient.",
    calibrationRole: "CONTEXT_ONLY",
    limitations: ["Rodent evidence only", "Heterogeneous exposure/dosimetry reporting", "No uniform causal interpretation or human TFR coefficient"],
    isTfrCoefficient: false,
  },
  {
    id: "BALDINI_2025_ART_LAB_SPERM",
    citation: "Baldini GM et al. Toxics (2025)",
    year: 2025,
    url: "https://doi.org/10.3390/toxics13060510",
    studyType: "Human-sperm in-vitro laboratory comparison",
    system: "Semen samples from 102 healthy males in an IVF laboratory",
    fieldClass: "One-hour close-distance smartphone or 2.4/5 GHz Wi-Fi-repeater exposure versus laboratory comparators",
    finding: "Reported lower progressive motility in mobile-phone and Wi-Fi-repeater conditions than comparator conditions.",
    causalNodes: ["FIELDSTATE_VECTOR", "A_VGCC_ROS", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Informs local-geometry measurement in a short-term human-sperm setting, not a personal-exposure cohort or TFR estimate.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["In-vitro semen exposure", "Single laboratory and short duration", "Comparator design does not establish population exposure-response"],
    isTfrCoefficient: false,
  },
  {
    id: "CALIS_2021_PRENATAL_OVARIAN_RESERVE",
    citation: "Calis P et al. Fetal and Pediatric Pathology (2021)",
    year: 2021,
    url: "https://doi.org/10.1080/15513815.2019.1692112",
    studyType: "Prenatal controlled rat experiment",
    system: "Female rat offspring ovarian histology at postnatal day 42",
    fieldClass: "Smartphone RF exposure during pregnancy",
    finding: "The exposed offspring group had fewer primordial and secondary follicles and higher atresia in the reported protocol.",
    causalNodes: ["FIELDSTATE_VECTOR", "BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE", "OOCYTE_REDOX"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Supports a developmental ovarian-reserve branch distinct from acute ovulation, not human reserve calibration.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Protocol is not measured human FieldState", "Histology rather than adult fertility"],
    isTfrCoefficient: false,
  },
  {
    id: "YOUSEFI_2025_NEONATAL_OOGENESIS",
    citation: "Yousefi B et al. Reproductive Sciences (2025)",
    year: 2025,
    url: "https://doi.org/10.1007/s43032-025-01880-0",
    studyType: "Maternal-exposure neonatal-rat experiment",
    system: "Neonatal Wistar-rat ovaries after maternal phone exposure",
    fieldClass: "Maternal mobile-phone exposure during gestation",
    finding: "Primary animal study measured oogenesis, folliculogenesis and neonatal ovarian developmental/hormonal endpoints.",
    causalNodes: ["FIELDSTATE_VECTOR", "BIOELECTRIC_DEVELOPMENT", "OVARIAN_RESERVE", "OOCYTE_REDOX"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Adds a recent developmental female branch; it is a primary rat study, not a human review or direct TFR coefficient.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Rat model", "Maternal-device protocol", "Neonatal endpoints need longitudinal human translation"],
    isTfrCoefficient: false,
  },
  {
    id: "IOLCHIEV_2019_GEOMAGNETIC_BULL_SEMEN",
    citation: "Iolchiev BS et al. Agricultural Biology (2019)",
    year: 2019,
    url: "https://doi.org/10.15389/agrobiology.2019.6.1196eng",
    studyType: "Observational time-series study",
    system: "Ten Holstein bulls and repeated semen samples",
    fieldClass: "Natural geomagnetic-activity index",
    finding: "Reported higher geomagnetic-activity periods alongside changes in ejaculate volume, motility, morphology and DNA fragmentation.",
    causalNodes: ["FIELDSTATE_VECTOR", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Natural-field sentinel for background-state hypotheses; it does not isolate geomagnetism or generalise to humans.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Small animal sample", "Observational design", "Management and seasonality may confound"],
    isTfrCoefficient: false,
  },
  {
    id: "WPP_WB_BERM_COHORT_ASFR_2026",
    citation: "BERM reproducibility analysis using UN WPP 2024 ASFR and World Bank/ITU mobile subscriptions (2000–2023)",
    year: 2026,
    url: "https://population.un.org/wpp/",
    studyType: "Versioned reproducible descriptive cohort-proxy analysis",
    system: "Country-level WPP ASFR and World Bank/ITU mobile-subscription series",
    fieldClass: "Technology-adoption timing proxy, not physical FieldState",
    finding: "Reports an age-cohort contrast consistent with the developmental-memory premise while retaining mobile subscriptions as a timing proxy.",
    causalNodes: ["COUPLE_FECUNDABILITY", "ASFR", "TFR"],
    directness: "POPULATION_DESCRIPTIVE",
    scope: "Tests a predicted age/cohort signature, not a causal EMF effect or FieldState-transfer coefficient.",
    calibrationRole: "CONTEXT_ONLY",
    limitations: ["Ecological country-level analysis", "Versioned scenario weights are not calibrated sensitivity estimates", "Subscriptions are not an EMF dose", "Development, policy, tempo and demand covary with adoption"],
    isTfrCoefficient: false,
  },
] as const;

/** Every registered record is structural/contextual evidence, never a TFR slope. */
export const FIELDSTATE_EVIDENCE_COUNT = FIELDSTATE_EVIDENCE.length;

/**
 * Summary of `berm/data/evidence/legacy_reference_migration_v1.json`.
 * The full 129-record manifest remains a repository audit artefact rather
 * than a browser payload: candidate sources must be reviewed record by record
 * before entering the bounded active register above.
 */
export const LEGACY_EVIDENCE_MIGRATION = {
  version: "legacy-reference-migration-v1",
  recordCount: 129,
  activeAliases: 3,
  migrationCandidates: 35,
  contextOrHistoricalRecords: 91,
  sourcePath: "berm/data/evidence/legacy_reference_migration_v1.json",
} as const;

type EvidenceLocale = "en" | "fi";

/** Public names for internal causal-node identifiers. */
const CAUSAL_NODE_LABELS: Record<string, Record<EvidenceLocale, string>> = {
  FIELDSTATE_VECTOR: {
    en: "FieldState vector / background geometry",
    fi: "FieldState-vektori / taustageometria",
  },
  FIELDSTATE_ENVELOPE: {
    en: "Envelope / beat PSD hypothesis",
    fi: "Verhokäyrä- / beat-PSD-hypoteesi",
  },
  A_VGCC_ROS: {
    en: "Ca²⁺–mitochondrial redox intermediate",
    fi: "Ca²⁺–mitokondriaalinen redox-välitila",
  },
  B_RPM_CRY: {
    en: "RPM / cryptochrome–redox intermediate",
    fi: "RPM / kryptokromi–redox-välitila",
  },
  MELATONIN_REDOX: {
    en: "Melatonin / circadian-redox mediator",
    fi: "Melatoniini- / vuorokausi-redox-välittäjä",
  },
  VMEM_MTOR: {
    en: "Membrane-potential / mTOR intermediate",
    fi: "Kalvopotentiaali- / mTOR-välitila",
  },
  BIOELECTRIC_DEVELOPMENT: {
    en: "Developmental bioelectric memory",
    fi: "Kehityksellinen bioelektrinen muisti",
  },
  MICROBIOME_OT: {
    en: "Microbiome / oxytocin mediator",
    fi: "Mikrobiomi- / oksitosiinivälittäjä",
  },
  BARRIER_BBB: {
    en: "Blood–brain barrier",
    fi: "Aivoverieste",
  },
  BARRIER_BTB: {
    en: "Blood–testis barrier",
    fi: "Veri–kiveseste",
  },
  HPA_HPG: {
    en: "HPA–HPG endocrine intermediate",
    fi: "HPA–HPG-endokriininen välitila",
  },
  MALE_GERMLINE_RESERVE: {
    en: "Male germline reserve",
    fi: "Miehen ituradan varanto",
  },
  MALE_STEROIDOGENESIS: {
    en: "Male steroidogenesis",
    fi: "Miehen steroidogeneesi",
  },
  MALE_SPERM: {
    en: "Sperm output, function and DNA integrity",
    fi: "Siittiötuotto, toiminta ja DNA-eheys",
  },
  OVARIAN_RESERVE: {
    en: "Ovarian reserve",
    fi: "Munasarjavaranto",
  },
  OOCYTE_REDOX: {
    en: "Oocyte redox / mitochondrial state",
    fi: "Oosyytin redox- / mitokondriotila",
  },
  OVULATION_CLOCK: {
    en: "Ovulatory clock",
    fi: "Ovulaation kello",
  },
  IMPLANTATION: {
    en: "Luteal and implantation support",
    fi: "Luteaali- ja implantaatiotuki",
  },
  COUPLE_FECUNDABILITY: {
    en: "Couple conception / live-birth capacity",
    fi: "Parin conception/live-birth-kapasiteetti",
  },
  DEMAND_OPPORTUNITY: {
    en: "Family-formation demand and opportunity",
    fi: "Perheenmuodostuksen kysyntä ja mahdollisuus",
  },
  TEMPO: {
    en: "Childbearing timing / tempo",
    fi: "Lastensaannin ajoittuminen / tempo",
  },
  ART_LIVE_BIRTH_DELIVERY: {
    en: "ART and live-birth delivery",
    fi: "ART- ja live-birth-delivery",
  },
  ASFR: {
    en: "Age-specific fertility (ASFR)",
    fi: "Ikäkohtainen hedelmällisyys (ASFR)",
  },
  TFR: {
    en: "Derived period TFR",
    fi: "Johdettu periodi-TFR",
  },
};

/** Keeps legacy IDs internal while allowing search and readable public labels. */
export function causalNodeLabels(nodeIds: readonly string[], locale: EvidenceLocale): string[] {
  return nodeIds.map((id) => CAUSAL_NODE_LABELS[id]?.[locale] ?? "Unmapped registered node");
}

if (FIELDSTATE_EVIDENCE_COUNT !== 23) {
  throw new Error(`Expected 23 FieldState evidence records, found ${FIELDSTATE_EVIDENCE_COUNT}.`);
}
