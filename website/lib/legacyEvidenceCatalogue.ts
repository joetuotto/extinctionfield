/**
 * Extended evidence catalogue from the BERM v18 legacy reference migration.
 *
 * These 126 records complement the 32 bounded BERM v19 records.
 * Each entry retains its v18 pathway classification and v2 migration status.
 * Records superseded by active v2 entries are excluded.
 */
import legacyData from "./legacyEvidence.json";

export interface LegacyEvidenceRecord {
  readonly id: string;
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
}

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
  PV: { en: "Pharmacological validation", fi: "Farmakologinen validaatio" },
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
