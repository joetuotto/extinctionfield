/**
 * Shared reading layer for the negative-findings classification.
 *
 * The canonical table is `docs/audit/CLASSIFICATION_TABLE.json`; `lib/
 * classificationTable.json` is a byte-identical copy, because the bundler
 * cannot follow a symlink out of the app directory. `test_classification_table.py`
 * fails if the two drift. Change a classification in the table, never in page copy.
 */
import table from "./classificationTable.json";

export interface Finding {
  readonly id: string;
  readonly name: string;
  readonly original_classification: string;
  readonly revised_classification: string;
  readonly reason: string;
  readonly affects: string;
  readonly affects_l_berm: boolean;
  readonly affects_empirical_berm: boolean;
  readonly discriminating_test_available: boolean;
  readonly discriminating_test: string | null;
}

export interface ClassificationSummary {
  readonly total: number;
  readonly remains_negative: number;
  readonly reclassified: number;
  readonly internal_refinement: number;
  readonly affects_current_berm: number;
  readonly affects_l_berm_only: number;
  readonly affects_old_versions_only: number;
  readonly discriminating_tests_needed: number;
}

export const FINDINGS: readonly Finding[] = table.findings as Finding[];
export const CLASSIFICATION_SUMMARY = table.summary as ClassificationSummary;
export const CLASSIFICATION_VERSION = table.version as string;

/** Three outcome groups the review distinguishes. */
export type Group = "remains_negative" | "reclassified" | "internal_refinement";

const REMAINS_NEGATIVE = new Set([
  "soliton_layer_falsified",
  "mechanism_impossible",
  "physics_error",
  "documentation_integrity",
  "parsimony_problem",
  "consistency_problem",
]);

export function groupOf(finding: Finding): Group {
  if (finding.revised_classification === "internal_refinement") return "internal_refinement";
  return REMAINS_NEGATIVE.has(finding.revised_classification)
    ? "remains_negative"
    : "reclassified";
}

export function findingsInGroup(group: Group): readonly Finding[] {
  return FINDINGS.filter((f) => groupOf(f) === group);
}

type Locale = "en" | "fi";

export const GROUP_LABELS: Record<Group, Record<Locale, string>> = {
  remains_negative: { en: "Remains negative", fi: "Pysyy negatiivisena" },
  reclassified: { en: "Reclassified", fi: "Uudelleenluokiteltu" },
  internal_refinement: { en: "Internal refinement", fi: "Sisäinen tarkennus" },
};

/** Tailwind token per group: red / amber / blue, matching the site palette. */
export const GROUP_STYLES: Record<Group, { text: string; border: string; bg: string; dot: string }> = {
  remains_negative: {
    text: "text-status-refuted",
    border: "border-status-refuted/35",
    bg: "bg-status-refuted/5",
    dot: "bg-status-refuted",
  },
  reclassified: {
    text: "text-status-partial",
    border: "border-status-partial/35",
    bg: "bg-status-partial/5",
    dot: "bg-status-partial",
  },
  internal_refinement: {
    text: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
    dot: "bg-accent",
  },
};

const CLASSIFICATION_LABELS: Record<string, Record<Locale, string>> = {
  falsification: { en: "Falsification", fi: "Falsifikaatio" },
  lindgren_chi_falsified: { en: "BERM χ closure falsified", fi: "BERM:n χ-sulkeuma falsifioitu" },
  mechanism_failure: { en: "Mechanism failure", fi: "Mekanismin epäonnistuminen" },
  soliton_layer_falsified: { en: "Soliton layer falsified", fi: "Solitonikerros falsifioitu" },
  mechanism_impossible: { en: "Mechanism impossible", fi: "Mekanismi mahdoton" },
  physics_error: { en: "Physics error", fi: "Fysiikkavirhe" },
  documentation_integrity: { en: "Documentation integrity", fi: "Dokumentaation eheys" },
  weak_explanatory_power: { en: "Weak explanatory power", fi: "Heikko selitysvoima" },
  catastrophic_failure: { en: "Catastrophic failure", fi: "Tuhoisa epäonnistuminen" },
  parsimony_problem: { en: "Parsimony problem", fi: "Parsimonia-ongelma" },
  consistency_problem: { en: "Consistency problem", fi: "Johdonmukaisuusongelma" },
  non_discriminating: { en: "Does not discriminate models", fi: "Ei erottele malleja" },
  straw_man: { en: "Straw man", fi: "Olkiukko" },
  underdetermined: { en: "Underdetermined", fi: "Alimääräytynyt" },
  wrong_test: { en: "Wrong test", fi: "Väärä testi" },
  internal_refinement: { en: "Internal refinement", fi: "Sisäinen tarkennus" },
};

export function classificationLabel(key: string, locale: string): string {
  const l: Locale = locale === "fi" ? "fi" : "en";
  return CLASSIFICATION_LABELS[key]?.[l] ?? key;
}

const AFFECTS_LABELS: Record<string, Record<Locale, string>> = {
  demographic_claims: { en: "demographic claims", fi: "demografiset väitteet" },
  none: { en: "nothing in the current model", fi: "ei mitään nykymallissa" },
  l_berm_chi_shape: { en: "L-BERM χ shape", fi: "L-BERM:n χ-muoto" },
  pathway_a_geometry: { en: "pathway A geometry", fi: "polun A geometria" },
  l_berm_soliton: { en: "L-BERM soliton layer", fi: "L-BERM:n solitonikerros" },
  berm_v6_v9_resonance: { en: "BERM v6–v9 resonance claim", fi: "BERM v6–v9 -resonanssiväite" },
  berm_v6_v9_documents: { en: "BERM v6–v9 documents", fi: "BERM v6–v9 -dokumentit" },
  density_only_model: { en: "density-only model", fi: "pelkkä tiheysmalli" },
  l_berm_theory: { en: "L-BERM theory layer", fi: "L-BERM:n teoriakerros" },
};

export function affectsLabel(key: string, locale: string): string {
  const l: Locale = locale === "fi" ? "fi" : "en";
  return AFFECTS_LABELS[key]?.[l] ?? key;
}
