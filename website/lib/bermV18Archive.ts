/**
 * Immutable presentation data for the earlier scalar BERM release.
 *
 * This module deliberately lives outside the active FieldState–ASFR-v2
 * specification.  It gives the earlier public model a stable, readable URL
 * while preventing its assumptions or numeric scenario entries from leaking
 * into the current measurement-aware route.
 */

export const BERM_V18_SNAPSHOT = "2bc2952";
export const BERM_V18_SOURCE_TREE = `https://github.com/joetuotto/extinctionfield/tree/${BERM_V18_SNAPSHOT}/website`;
export const BERM_V18_REFERENCE_JSON = `https://raw.githubusercontent.com/joetuotto/extinctionfield/${BERM_V18_SNAPSHOT}/website/public/data/references.json`;
export const BERM_V18_GLOBAL_VALIDATION_JSON = `https://raw.githubusercontent.com/joetuotto/extinctionfield/${BERM_V18_SNAPSHOT}/website/public/data/global_validation.json`;
export const BERM_V18_EXPLORER_JSON = `https://raw.githubusercontent.com/joetuotto/extinctionfield/${BERM_V18_SNAPSHOT}/website/public/data/explorer.json`;
export const BERM_V18_GLOBAL_PANEL_CSV = `https://raw.githubusercontent.com/joetuotto/extinctionfield/${BERM_V18_SNAPSHOT}/website/public/data/global_panel.csv`;
export const BERM_V18_ROLLING_BACKTEST_JSON = `https://raw.githubusercontent.com/joetuotto/extinctionfield/${BERM_V18_SNAPSHOT}/website/public/data/rolling_backtest.json`;

export type LegacyV18Locale = "en" | "fi";

export interface LegacyV18Prediction {
  id: string;
  country: string;
  year: number;
  metric: string;
  central: number;
  ci: readonly [number, number];
  unit: string;
  lockedDate: string;
  modelVersion: string;
  gitSha: string;
}

/** Exact scenario entries displayed by the pre-FieldState public registry. */
export const BERM_V18_PREDICTIONS: readonly LegacyV18Prediction[] = [
  { id: "fi-2030-tfr", country: "Finland", year: 2030, metric: "Total Fertility Rate", central: 1.08, ci: [1.02, 1.24], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "kr-2030-tfr", country: "South Korea", year: 2030, metric: "Total Fertility Rate", central: 0.61, ci: [0.48, 0.72], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "kr-2035-tfr", country: "South Korea", year: 2035, metric: "Total Fertility Rate", central: 0.54, ci: [0.4, 0.64], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "us-2030-tfr", country: "United States", year: 2030, metric: "Total Fertility Rate", central: 1.35, ci: [1.25, 1.65], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "jp-2030-tfr", country: "Japan", year: 2030, metric: "Total Fertility Rate", central: 1.01, ci: [0.88, 1.2], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "br-2030-tfr", country: "Brazil", year: 2030, metric: "Total Fertility Rate", central: 1.44, ci: [1.4, 1.68], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "global-2040-tfr", country: "Global", year: 2040, metric: "Total Fertility Rate", central: 1.78, ci: [1.55, 2.05], unit: "children/woman", lockedDate: "2026-08-18", modelVersion: "v17.0", gitSha: "0fa9f290" },
  { id: "global-2050-sperm", country: "Global", year: 2050, metric: "Sperm concentration (% of 2020)", central: 62, ci: [48, 75], unit: "%", lockedDate: "2026-08-18", modelVersion: "v17.0", gitSha: "0fa9f290" },
  { id: "csli-bee-lag", country: "Sentinel: Bee colony loss", year: 2030, metric: "EMF → bee colony loss lag", central: 4.3, ci: [1.3, 7.3], unit: "years", lockedDate: "2026-08-18", modelVersion: "CSLI-v1", gitSha: "0fa9f290" },
  { id: "csli-bird-lag", country: "Sentinel: Bird population decline", year: 2030, metric: "EMF → bird population decline lag", central: 1, ci: [0, 3], unit: "years", lockedDate: "2026-08-18", modelVersion: "CSLI-v1", gitSha: "0fa9f290" },
  { id: "csli-sperm-lag", country: "Sentinel: Sperm concentration decline", year: 2030, metric: "EMF → sperm concentration decline lag", central: 0.3, ci: [0, 0.8], unit: "years", lockedDate: "2026-08-18", modelVersion: "CSLI-v1", gitSha: "0fa9f290" },
  { id: "global-2040-sex-ratio", country: "Global", year: 2040, metric: "Sex ratio at birth (fraction male)", central: 0.509, ci: [0.507, 0.511], unit: "fraction", lockedDate: "2026-08-19", modelVersion: "v17.1", gitSha: "df6b410" },
  { id: "kr-2040-feedback-tfr", country: "South Korea", year: 2040, metric: "TFR with urbanization feedback", central: 0.39, ci: [0.3, 0.48], unit: "children/woman", lockedDate: "2026-08-19", modelVersion: "v17.1", gitSha: "df6b410" },
];

export interface LegacyV18EvidenceItem {
  pathway: string;
  study: string;
  year: number;
  finding: string;
  level: "E" | "M|C" | "M" | "C" | "L*" | "L";
  n?: number;
}

/** A readable cross-section of the v18 catalogue; the full immutable 129-item
 * catalogue is loaded on the archive references route. */
export const BERM_V18_EVIDENCE: readonly LegacyV18EvidenceItem[] = [
  { pathway: "A", study: "Panagopoulos DJ. Umbrella review of EMF effects on reproduction", year: 2025, finding: "Umbrella review of 39 systematic reviews reported RF-EMF associations with sperm-quality parameters.", level: "E", n: 39 },
  { pathway: "A", study: "Houston BJ et al. The effects of radiofrequency electromagnetic radiation on sperm function", year: 2016, finding: "The v18 catalogue recorded associations with ROS, DNA fragmentation and motility across experimental and observational studies.", level: "M|C", n: 27 },
  { pathway: "A", study: "Agarwal A et al. Effects of radiofrequency electromagnetic waves on human semen", year: 2009, finding: "The v18 catalogue described dose-associated ROS and sperm DNA-fragmentation findings.", level: "M|C", n: 32 },
  { pathway: "A", study: "Levine H et al. Temporal trends in sperm count", year: 2017, finding: "Systematic review and meta-regression used in the earlier model as a population biomarker context.", level: "E", n: 42935 },
  { pathway: "B", study: "Hore PJ & Mouritsen H. The radical-pair mechanism of magnetoreception", year: 2016, finding: "The v18 model used radical-pair magnetoreception as a mechanistic premise for the CRY branch.", level: "M" },
  { pathway: "B", study: "Ritz T et al. Resonance effects indicate a radical-pair mechanism for avian magnetic compass", year: 2004, finding: "The archive treated RF disruption of avian compass orientation as support for radical-pair involvement.", level: "E", n: 12 },
  { pathway: "B", study: "Sherrard RM et al. Low-intensity EMF activates the CRY-dependent circadian pathway", year: 2018, finding: "The catalogue connected the Drosophila result to its circadian branch.", level: "M|C" },
  { pathway: "C", study: "Salford LG et al. Nerve cell damage in mammalian brain after exposure to microwaves", year: 2003, finding: "The earlier model listed this rodent experiment in its blood–brain-barrier branch.", level: "M", n: 32 },
  { pathway: "C", study: "Nittby H et al. Increased blood-brain barrier permeability", year: 2009, finding: "The archive catalogued this as a rodent blood–brain-barrier observation.", level: "M", n: 16 },
  { pathway: "D", study: "Esmailzadeh S et al. Association between cell phone use and salivary cortisol", year: 2019, finding: "The v18 catalogue used this as an observational HPA-axis record.", level: "C", n: 200 },
  { pathway: "D", study: "Meo SA et al. Association of exposure to RF EMF with testosterone levels", year: 2010, finding: "The earlier catalogue placed this record in its HPA→HPG branch.", level: "L*", n: 40 },
  { pathway: "E", study: "Jin Y et al. Effects of RF EMF on gut microbiota composition in mice", year: 2022, finding: "The archive listed this mouse study within its microbiome branch.", level: "M", n: 24 },
  { pathway: "E", study: "Lundy SD et al. The seminal microbiome is associated with semen parameters", year: 2021, finding: "The v18 catalogue used this association to connect seminal microbiome composition with sperm parameters.", level: "L*", n: 73 },
  { pathway: "E", study: "Erdman SE & Poutahidis T. Microbes and Oxytocin", year: 2016, finding: "The earlier model used this review as context for its microbiome–oxytocin branch.", level: "M|C" },
  { pathway: "T_BE", study: "Levin M. Bioelectric signaling", year: 2021, finding: "The archive cited endogenous bioelectric patterning as a premise for its bioelectric-code branch.", level: "M" },
];

export const BERM_V18_PATHWAYS = {
  en: {
    A: { label: "VGIC → Ca²⁺ → ROS → sperm damage", description: "The primary v18 reproductive mechanism branch." },
    B: { label: "RPM → CRY → circadian disruption", description: "The v18 magnetoreception and circadian branch." },
    C: { label: "Blood–brain barrier disruption", description: "The v18 neuroendocrine-access branch." },
    D: { label: "HPA → HPG cross-inhibition", description: "The v18 stress–reproductive-axis branch." },
    E: { label: "Microbiome", description: "The v18 microbiome–hormone branch." },
    T_BE: { label: "Bioelectric code", description: "The v18 endogenous-bioelectricity branch." },
  },
  fi: {
    A: { label: "VGIC → Ca²⁺ → ROS → siittiövaurio", description: "V18:n ensisijainen lisääntymismekanismin haara." },
    B: { label: "RPM → CRY → vuorokausirytmin häiriö", description: "V18:n magnetoreseptio- ja vuorokausirytmihaara." },
    C: { label: "Veri-aivoesteen häiriö", description: "V18:n neuroendokriinisen pääsyn haara." },
    D: { label: "HPA → HPG -ristiinhibitio", description: "V18:n stressi–lisääntymisakselin haara." },
    E: { label: "Mikrobiomi", description: "V18:n mikrobiomi–hormonihaara." },
    T_BE: { label: "Biosähköinen koodi", description: "V18:n endogeenisen biosähköisyyden haara." },
  },
} as const;

export function getLegacyV18Locale(locale: string): LegacyV18Locale {
  return locale === "fi" ? "fi" : "en";
}
