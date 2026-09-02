/**
 * Unified BERM v17 evidence registry.
 *
 * Contains the bounded FieldState study-to-node records (v2 measurement
 * specification, attached to the v17 causal graph) and the extended legacy
 * A–F catalogue in a single module. The third registry, curated
 * `evidence_relations`, lives in `data/claims.json`. How the three relate
 * and how legacy records migrate is documented in
 * `../../docs/evidence-registries.md`.
 */
import legacyData from "./legacyEvidence.json";

// ── Types ──────────────────────────────────────────────────────────

export type FieldStateDirectness =
  | "PHYSICS_SIGNATURE"
  | "MECHANISTIC_INTERMEDIATE"
  | "REPRODUCTIVE_ENDPOINT"
  | "ECOLOGICAL_ENDPOINT"
  | "SYSTEMATIC_REVIEW"
  | "POPULATION_DESCRIPTIVE";

export type FieldStateCalibrationRole = "STRUCTURAL_ONLY" | "CONTEXT_ONLY";

export interface FieldStateEvidenceRecord {
  readonly id: string;
  readonly referenceId: string;
  readonly citation: string;
  readonly year: number;
  readonly studyType: string;
  readonly system: string;
  readonly fieldClass: string;
  readonly finding: string;
  readonly causalNodes: readonly string[];
  readonly directness: FieldStateDirectness;
  readonly scope: string;
  readonly calibrationRole: FieldStateCalibrationRole;
  readonly limitations: readonly string[];
  readonly isTfrCoefficient: false;
}

export interface LegacyEvidenceRecord {
  readonly id: string;
  readonly referenceId: string;
  readonly citation: string;
  readonly year: number;
  readonly pathway: string | null;
  readonly level: string;
  readonly tags: readonly string[];
  readonly causalNodes: readonly string[];
  readonly evidenceRole: string;
  readonly status: string;
  readonly translationScope: string;
  readonly n: number | null;
  /** Curation provenance, e.g. a legacy level letter or node id that was remapped. */
  readonly note?: string;
}

export const EPISTEMIC_LEVELS = {
  L: "Theoretical premise",
  "L*": "Testable theory candidate",
  M: "Mechanistic intermediate",
  C: "Observational association",
  "M|C": "Mechanism + association (not the full route)",
  E: "Repeated component finding / endpoint",
} as const;

// ── Bounded v17 records ────────────────────────────────────────────

export const FIELDSTATE_EVIDENCE: readonly FieldStateEvidenceRecord[] = [
  {
    id: "BLACKMAN_1985_BACKGROUND_FREQUENCY",
    citation: "Blackman CF et al. Bioelectromagnetics (1985)",
    year: 1985,
    referenceId: "blackman1985_calcium_windows",
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
    referenceId: "ritz2004",
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
    referenceId: "usselman2016",
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
    referenceId: "majewska2025",
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
    referenceId: "zandieh2025",
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
    referenceId: "sherrard2018",
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
    referenceId: "cao2015",
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
    id: "CHAE_2019_HUMAN_BLUE_LIGHT_ORIENTATION",
    citation: "Chae K-S et al. PLOS ONE (2019)",
    year: 2019,
    referenceId: "chae2019",
    studyType: "Controlled human orientation experiment with wavelength and field-inversion controls",
    system: "Food-deprived human adults (20 men, 21 women)",
    fieldClass: "Coil-modulated geomagnetic-strength static field under controlled illumination",
    finding: "Food-associated orientation in starved men tracked the modulated field direction under light below 500 nm, and reversed when the vertical component was inverted; blindfolded, longer-wavelength, antiparallel-current and female groups showed no significant orientation.",
    causalNodes: ["FIELDSTATE_VECTOR", "B_RPM_CRY"],
    directness: "PHYSICS_SIGNATURE",
    scope: "Supports a wavelength- and inclination-dependent radical-pair receptor in humans; it does not supply an RF exposure-response, a melatonin route, or a fertility effect size.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Small sample (n=41)", "No RF applied — receptor substrate, not disruption", "Orientation behaviour rather than a reproductive endpoint", "Significant in men only; sex difference may track glucose or motivation", "Not replicated", "Oct 2019 correction (PLOS ONE 14(10): e0223635) is a misplaced table caption, no data change"],
    isTfrCoefficient: false,
  },
  {
    id: "ESHRE_2021_CATSPER_RF",
    citation: "Ayas B & Kocaman N. ESHRE 2021 (abstract)",
    year: 2021,
    referenceId: "catsper_2021",
    studyType: "Controlled in-vitro human sperm experiment",
    system: "Human spermatozoa",
    fieldClass: "2100 MHz RF, 1 hour exposure",
    finding: "Progressive motility (A+B) dropped 47.62→34.19% (p<0.05) and intracellular Ca²⁺ dropped 2.46→1.85 (p<0.05), demonstrating direct CatSper disruption by RF.",
    causalNodes: ["A_VGCC_ROS", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Direct human gamete evidence of Ca²⁺ channel disruption by RF at mobile-phone frequency.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Conference abstract, not full peer-reviewed paper", "In-vitro only", "Single frequency tested"],
    isTfrCoefficient: false,
  },
  {
    id: "DE_IULIIS_2009_HUMAN_SPERM",
    citation: "De Iuliis GN et al. PLOS ONE (2009)",
    year: 2009,
    referenceId: "iuliis2009",
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
    referenceId: "yu2019_btb",
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
    referenceId: "meena2014",
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
    referenceId: "ahmadi2016",
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
    referenceId: "lochhead2010",
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
    referenceId: "chakraborty2020",
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
    referenceId: "liu2014",
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
    referenceId: "he2016",
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
    referenceId: "cordelli2024",
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
    referenceId: "cordelli2025_corrigendum",
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
    referenceId: "naderi2026",
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
    referenceId: "baldini2025",
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
    referenceId: "calis2021",
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
    referenceId: "yousefi2025",
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
    referenceId: "iolchiev2019",
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
    referenceId: "nations2024",
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
  {
    id: "SHAFIK_1992_HUMAN_TEXTILE_SURFACE_READING",
    citation: "Shafik, Ibrahim & El-Sayed. Andrologia (1992)",
    year: 1992,
    referenceId: "shafik1992",
    studyType: "Human textile-interface measurement study",
    system: "Twenty-one healthy men wearing polyester, blend or cotton underpants",
    fieldClass: "Triboelectric textile–skin interface; historical physically underdetermined V/cm² reading",
    finding: "Reported readings ranked 100% polyester above a 50:50 polyester/cotton blend; cotton had no detected reading in the stated setup.",
    causalNodes: ["STATIC_TRIBO_INTERFACE"],
    directness: "PHYSICS_SIGNATURE",
    scope: "Supports a material-dependent human textile–skin static-interface state; the historically reported, physically underdetermined V/cm² cannot convert into Q, V/m or an organ field.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["V/cm² is not a standard potential, field or charge-density unit", "Probe geometry/reference incompletely reported", "No reproductive endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "SHAFIK_1992_HUMAN_POLYESTER_SLING",
    citation: "Shafik A. Contraception (1992)",
    year: 1992,
    referenceId: "shafik1992_sling",
    studyType: "Human longitudinal textile-sling experiment",
    system: "Fourteen adult men wearing a polyester scrotal sling for 12 months",
    fieldClass: "Triboelectric textile–skin interface with altered scrotal geometry",
    finding: "Reported reversible azoospermia, seminiferous-tubule changes and static-interface readings; the paper itself proposed electrostatic and thermoregulatory mechanisms.",
    causalNodes: ["STATIC_TRIBO_INTERFACE", "MALE_SPERM"],
    directness: "REPRODUCTIVE_ENDPOINT",
    scope: "Human endpoint anchor for a prolonged textile-interface configuration, not isolated static causality, general clothing effect or TFR coefficient.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Small historical study", "Static and thermoregulatory components co-occurred", "No calibrated Q, V/m, dE/dt or organ transfer"],
    isTfrCoefficient: false,
  },
  {
    id: "DINCMEN_2016_PET_ANTISTATIC_DECAY",
    citation: "Dincmen, Hauser & Gursoy. AATCC Journal of Research (2016)",
    year: 2016,
    referenceId: "dincmen2016",
    studyType: "Controlled textile-material charge generation and dissipation experiment",
    system: "Untreated and antistatic-treated polyester and nylon fabrics",
    fieldClass: "Triboelectric charge generation, surface resistivity and charge-decay measurements",
    finding: "Untreated polyester retained a large charge for over 2,000 seconds in the stated test; antistatic treatment reduced both magnitude and decay time.",
    causalNodes: ["STATIC_TRIBO_INTERFACE"],
    directness: "PHYSICS_SIGNATURE",
    scope: "Supports material-treatment and relaxation-time variables in static-interface FieldState, not a skin or reproductive effect.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Fabric material test", "Specific treatment and climate conditions", "No biological endpoint"],
    isTfrCoefficient: false,
  },
  {
    id: "ENGLAND_2023_TICK_STATIC_ATTACHMENT",
    citation: "England, Lihou & Robert. Current Biology (2023)",
    year: 2023,
    referenceId: "england_2023_ticks",
    studyType: "Controlled arthropod electrostatic-attraction experiment with finite-element modelling",
    system: "Ixodes ricinus nymphs and host–vegetation geometries",
    fieldClass: "Static host–vegetation air-gap electric fields and field gradients",
    finding: "Nymphs crossed short air gaps toward charged host-like targets; polarity independence supported induced polarization, and the modelled geometry exceeded 300 kV/m locally.",
    causalNodes: ["STATIC_TRIBO_INTERFACE", "ECOLOGICAL_ENCOUNTER"],
    directness: "ECOLOGICAL_ENDPOINT",
    scope: "Direct contact/attachment evidence for the tested tick and geometry, not RF/ELF resistance, population abundance or a human coefficient.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Ixodes ricinus nymph system", "Attachment rather than population endpoint", "Each host/habitat geometry needs measurement"],
    isTfrCoefficient: false,
  },
  {
    id: "COLIN_1992_VARROA_ELECTRICAL_CHARGES",
    citation: "Colin et al. Journal of Insect Physiology (1992)",
    year: 1992,
    referenceId: "colin1992_varroa_electrostatic",
    studyType: "Controlled ectoparasite behavior experiment",
    system: "Varroa jacobsoni as named in the original study (now generally treated as V. destructor in this Apis mellifera pest context) and honey-bee-range charged lures",
    fieldClass: "Static electrical charges matched to the reported host range",
    finding: "Charge sign altered mite movement; a negatively charged lure increased contact and climbing in the tested system.",
    causalNodes: ["STATIC_TRIBO_INTERFACE", "ECOLOGICAL_ENCOUNTER"],
    directness: "ECOLOGICAL_ENDPOINT",
    scope: "Supports a charge-sensitive parasite contact/behavior branch, not colony collapse, population growth or other-field resistance.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Historical taxonomic name retained with modern interpretation", "Laboratory lure", "Contact behavior is not fitness or resistance"],
    isTfrCoefficient: false,
  },
  {
    id: "MALLINSON_2025_HONEYBEE_EFIELD_FORAGING",
    citation: "Mallinson, Woodburn & O'Reilly. iScience (2025)",
    year: 2025,
    referenceId: "mallinson2025_electric_pollution",
    studyType: "Paired field experiment with anthropogenic AC/DC electric-field treatments",
    system: "Honeybee floral landing behavior in urban meadows",
    fieldClass: "Weak 50 Hz AC and DC aerial electric fields; transmission-line measurements",
    finding: "AC and positive DC treatments reduced floral landings in the reported paired experiment; negative DC did not show a statistically significant effect.",
    causalNodes: ["FIELDSTATE_LOW_FREQUENCY_ELECTRIC", "ECOLOGICAL_ENCOUNTER"],
    directness: "ECOLOGICAL_ENDPOINT",
    scope: "Component- and polarity-specific pollinator behavior evidence, not a colony-fitness, abundance or general EMF estimate.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Single species/context", "Landing behavior endpoint", "Do not merge AC/DC E-field with RF or magnetic-field hypotheses"],
    isTfrCoefficient: false,
  },
  {
    id: "GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION",
    citation: "García-Robledo, Dierick & Manser. PNAS (2025)",
    year: 2025,
    referenceId: "garcia_robledo2025",
    studyType: "Controlled mite behavior, sensory-ablation and electrostatic-transport experiment",
    system: "Tropical hummingbird flower mites and host-like electric-field configurations",
    fieldClass: "Modulated and static electric fields with host-like charge and geometry",
    finding: "Tested flower mites responded to modulated fields using front-leg sensory structures and bridged a gap to a hummingbird-beak analogue electrostatically.",
    causalNodes: ["STATIC_TRIBO_INTERFACE", "FIELDSTATE_LOW_FREQUENCY_ELECTRIC", "ECOLOGICAL_ENCOUNTER"],
    directness: "ECOLOGICAL_ENDPOINT",
    scope: "Electroreception-plus-transport evidence in a mite life cycle, not a general tick/mite response spectrum or selection estimate.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Tropical flower-mite guild", "Laboratory host analogue", "No multigeneration population outcome"],
    isTfrCoefficient: false,
  },
  {
    id: "SOFRANKOVA_2023_TICK_RF_NEUROPEPTIDE",
    citation: "Šofranková et al. Pathogens (2023)",
    year: 2023,
    referenceId: "sofrankova2023",
    studyType: "Controlled radiofrequency exposure and tick synganglion qRT-PCR experiment",
    system: "Adult male and female Ixodes ricinus under stated 900 MHz, 2 or 40 V/m exposure conditions",
    fieldClass: "900 MHz polarized, unmodulated RF electric-field exposure",
    finding: "Reported exposures produced sex-, intensity- and time-dependent neuropeptide/receptor transcript changes in tick synganglia.",
    causalNodes: ["FIELDSTATE_VECTOR", "ECOLOGICAL_ENCOUNTER"],
    directness: "MECHANISTIC_INTERMEDIATE",
    scope: "A separate tick RF-physiology branch, not static attachment, RF resistance, feeding fitness, population growth or a human coefficient.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Adult laboratory tick system", "Transcript rather than fitness endpoint", "Exposure geometry and thermal control matter", "No multigeneration outcome"],
    isTfrCoefficient: false,
  },
  {
    id: "MORLEY_2018_SPIDER_EFIELD_BALLOONING",
    citation: "Morley & Robert. Current Biology (2018)",
    year: 2018,
    referenceId: "morley2018_spider_ballooning",
    studyType: "Controlled arthropod behavior and mechanosensory-hair experiment",
    system: "Ballooning spiders",
    fieldClass: "Vertical atmospheric-scale static electric fields",
    finding: "Atmospheric-scale electric fields elicited ballooning behavior and mechanically activated spider sensory hairs in the reported experiments.",
    causalNodes: ["STATIC_TRIBO_INTERFACE", "ECOLOGICAL_ENCOUNTER"],
    directness: "ECOLOGICAL_ENDPOINT",
    scope: "Supports an electric-field-to-dispersal behavior branch, not landscape population expansion or built-infrastructure effects.",
    calibrationRole: "STRUCTURAL_ONLY",
    limitations: ["Spider behavior system", "Atmospheric field rather than textile interface", "Behavior is not a population-growth estimate"],
    isTfrCoefficient: false,
  },
] as const;

export const FIELDSTATE_EVIDENCE_COUNT = FIELDSTATE_EVIDENCE.length;

// ── Legacy catalogue ───────────────────────────────────────────────

export const LEGACY_EVIDENCE_CATALOGUE: readonly LegacyEvidenceRecord[] =
  legacyData as LegacyEvidenceRecord[];

export const LEGACY_EVIDENCE_COUNT = LEGACY_EVIDENCE_CATALOGUE.length;

export const PATHWAY_LABELS: Record<string, Record<"en" | "fi", string>> = {
  A: { en: "VGIC → Ca²⁺ → ROS → sperm damage", fi: "VGIC → Ca²⁺ → ROS → siittiövaurio" },
  A_mitotic: { en: "IF → DEP/IFO → mitotic spindle disruption", fi: "IF → DEP/IFO → mitoottisen karan häiriö" },
  B: { en: "RPM → CRY → circadian disruption", fi: "RPM → CRY → vuorokausirytmin häiriö" },
  C: { en: "Blood–brain barrier disruption", fi: "Veri-aivoesteen häiriö" },
  D: { en: "HPA → HPG cross-inhibition", fi: "HPA → HPG -ristiinhibitio" },
  E: { en: "Microbiome", fi: "Mikrobiomi" },
  F: { en: "Bioelectric code", fi: "Biosähköinen koodi" },
  T: { en: "Bioelectric signaling / developmental", fi: "Biosähköinen signaali / kehityksellinen" },
  RW: { en: "Recovery window", fi: "Palautumisikkuna" },
  BS: { en: "Behavioral suppression", fi: "Käyttäytymisen suppressio" },
  PV: { en: "Pharmacological validation", fi: "Farmakologinen todentaminen" },
  S: { en: "Sentinel / cross-species", fi: "Sentinelli / lajienvälinen" },
  SE: { en: "Sex-ratio endpoint", fi: "Sukupuolisuhteen päätepiste" },
  EHS: { en: "Individual susceptibility", fi: "Yksilöllinen herkkyys" },
  H: { en: "Historical / precursor", fi: "Historiallinen / edeltäjä" },
  theory: { en: "Theoretical premise", fi: "Teoreettinen premissi" },
};

export const STATUS_LABELS: Record<string, Record<"en" | "fi", string>> = {
  MIGRATION_CANDIDATE: { en: "Migration candidate", fi: "Migraatiokandidaatti" },
  CONTEXT_ONLY: { en: "Context only", fi: "Vain konteksti" },
  OUTSIDE_ACTIVE_GRAPH: { en: "Outside active graph", fi: "Aktiivisen graafin ulkopuolella" },
  UNVERIFIED_CITATION: { en: "Unverified citation", fi: "Todentamaton viite" },
  HISTORICAL_CONTEXT: { en: "Historical context", fi: "Historiallinen konteksti" },
  VERIFIED: { en: "Verified source", fi: "Todennettu lähde" },
  PREDICTION: { en: "Prediction", fi: "Ennuste" },
  SUPERSEDED_BY_ACTIVE_RECORD: {
    en: "Superseded by a curated evidence relation",
    fi: "Korvattu kuratoidulla näyttörelaatiolla",
  },
  RETRACTED_2024: {
    en: "Retracted (2024) — provenance only",
    fi: "Peruttu (2024) — vain provenienssi",
  },
};

export const EVIDENCE_LEVEL_LABELS: Record<string, Record<"en" | "fi", string>> = {
  E: { en: "Repeated component finding / endpoint", fi: "Toistettu komponenttihavainto / päätepiste" },
  "M|C": { en: "Mechanism + association", fi: "Mekanismi + assosiaatio" },
  M: { en: "Mechanistic intermediate", fi: "Mekanistinen välivaihe" },
  C: { en: "Observational association", fi: "Havainnollinen assosiaatio" },
  "L*": { en: "Testable theory candidate", fi: "Testattava teoriakandidaatti" },
  L: { en: "Theoretical premise", fi: "Teoreettinen premissi" },
};

// ── Causal node labels ─────────────────────────────────────────────

const CAUSAL_NODE_LABELS: Record<string, Record<string, string>> = {
  STATIC_TRIBO_INTERFACE: {
    en: "Static triboelectric material–skin / organism interface",
    fi: "Staattinen triboelektrinen materiaali–iho / eliörajapinta",
  },
  FIELDSTATE_LOW_FREQUENCY_ELECTRIC: {
    en: "Low-frequency electric-field waveform / polarity state",
    fi: "Matalataajuisen sähkökentän aaltomuoto- / polariteettitila",
  },
  FIELDSTATE_SELECTED_PROXY: {
    en: "Lindgren-selected two-channel timing proxy",
    fi: "Lindgren-valittu kaksikanavainen ajoitusproxy",
  },
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
  IF_MITOTIC_DISRUPTION: {
    en: "Intermediate-frequency disruption of cell division",
    fi: "Välitaajuuskentän aiheuttama solunjakautumisen häiriö",
  },
  GPCR_ADENOSINE: {
    en: "PEMF-validated adenosine A2A/A3 receptor modulation",
    fi: "PEMF-validoitu adenosiini-A2A/A3-reseptorimodulaatio",
  },
  VAGUS_ANTIINFLAMMATORY: {
    en: "Vagus nerve cholinergic anti-inflammatory pathway",
    fi: "Vagushermon kolinerginen anti-inflammatorinen reitti",
  },
  BARRIER_BBB: {
    en: "Blood–brain barrier",
    fi: "Aivoverieste",
  },
  BARRIER_BTB: {
    en: "Blood–testis barrier",
    fi: "Veri–kiveseste",
  },
  BARRIER_PLACENTA: {
    en: "Blood–placenta barrier",
    fi: "Veri–istukkaeste",
  },
  BARRIER_RETINA: {
    en: "Blood–retinal barrier",
    fi: "Veri–verkkokalvoeste",
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
  ECOLOGICAL_ENCOUNTER: {
    en: "Species-specific field encounter, sensing, physiology and dispersal",
    fi: "Lajikohtainen kenttäkontakti, aistiminen, fysiologia ja dispersio",
  },
  ECOLOGICAL_SELECTION: {
    en: "Species-specific relative fitness and ecological sorting",
    fi: "Lajikohtainen suhteellinen kelpoisuus ja ekologinen valikoituminen",
  },
  ECOLOGICAL_TRAIT_STATE: {
    en: "Time-indexed heritable trait distribution",
    fi: "Ajassa indeksoitu periytyvä piirrejakautuma",
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

export function causalNodeLabels(nodeIds: readonly string[], locale: string): string[] {
  return nodeIds.map((id) => CAUSAL_NODE_LABELS[id]?.[locale] ?? CAUSAL_NODE_LABELS[id]?.en ?? "Unmapped registered node");
}

if (FIELDSTATE_EVIDENCE_COUNT < 30) {
  throw new Error(`Expected at least 30 FieldState evidence records, found ${FIELDSTATE_EVIDENCE_COUNT}.`);
}

// Legacy `level` and `status` must stay inside the vocabularies the /evidence
// page renders; an unknown value would otherwise show as a bare token.
const LEGACY_LEVEL_VOCABULARY = new Set<string>(Object.keys(EPISTEMIC_LEVELS));
for (const record of LEGACY_EVIDENCE_CATALOGUE) {
  if (!LEGACY_LEVEL_VOCABULARY.has(record.level)) {
    throw new Error(`Legacy evidence record ${record.id} uses level "${record.level}" outside EPISTEMIC_LEVELS.`);
  }
  if (STATUS_LABELS[record.status] === undefined) {
    throw new Error(`Legacy evidence record ${record.id} uses status "${record.status}" without a STATUS_LABELS entry.`);
  }
}
