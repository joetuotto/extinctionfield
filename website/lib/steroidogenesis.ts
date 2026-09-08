import data from "@/data/steroidogenesis.json";
import { citationLabel, indexedReference } from "@/lib/referenceIndex";

export type SteroidogenesisText = { en: string; fi?: string; ja?: string; fr?: string; ko?: string };
export type SteroidogenesisEvidenceKind = "field_experiment" | "component_experiment";
export interface SteroidogenesisStudy {
  id: string;
  referenceId: string;
  evidenceKind: SteroidogenesisEvidenceKind;
  studyDesign: string;
  familyId: string;
  mechanisms: string[];
  system: SteroidogenesisText;
  finding: SteroidogenesisText;
  scope: SteroidogenesisText;
  measuredVariables: string[];
  intervention: SteroidogenesisText;
  fieldProtocol: null | { waveform: string; carrierFrequency: string; fieldStrength: string; duration: string; notes: SteroidogenesisText | null };
  dataAvailability: SteroidogenesisText;
  correctionReferenceIds?: string[];
}
export interface SteroidogenesisCatalog {
  version: string;
  studies: SteroidogenesisStudy[];
  mechanisms: { id: string; label: SteroidogenesisText }[];
  states: { id: string; label: SteroidogenesisText; description: SteroidogenesisText }[];
  families: { id: string; label: SteroidogenesisText; notes: SteroidogenesisText; studyIds: string[]; independenceVerified: boolean }[];
  syntheses: { id: string; claimId: string; title: SteroidogenesisText; body: SteroidogenesisText; studyIds: string[]; measuredVariables: string[] }[];
  dataResources: { id: string; title: SteroidogenesisText; description: SteroidogenesisText; url: string; referenceId: string }[];
}

export const STEROIDOGENESIS = data as unknown as SteroidogenesisCatalog;

export function steroidogenesisText(value: SteroidogenesisText, locale: string): string {
  return value[locale as keyof SteroidogenesisText]?.trim() || value.en;
}

export function hasSteroidogenesisTranslationFallback(locale: string, section: "studies" | "dataResources"): boolean {
  function hasMissingTranslation(value: unknown): boolean {
    if (Array.isArray(value)) return value.some(hasMissingTranslation);
    if (!value || typeof value !== "object") return false;
    const record = value as Record<string, unknown>;
    if (typeof record.en === "string") return typeof record[locale] !== "string" || !(record[locale] as string).trim();
    return Object.values(record).some(hasMissingTranslation);
  }
  return hasMissingTranslation(section === "dataResources" ? STEROIDOGENESIS.dataResources : [
    STEROIDOGENESIS.studies, STEROIDOGENESIS.syntheses, STEROIDOGENESIS.families, STEROIDOGENESIS.states, STEROIDOGENESIS.mechanisms,
  ]);
}

export function steroidogenesisStudyLabel(study: SteroidogenesisStudy, locale: string): string {
  const reference = indexedReference(study.referenceId);
  return reference ? citationLabel(reference, locale) : study.id;
}

export function filterSteroidogenesisStudies(mechanism: string, kind: string): SteroidogenesisStudy[] {
  return STEROIDOGENESIS.studies.filter(study => (mechanism === "all" || study.mechanisms.includes(mechanism)) && (kind === "all" || study.evidenceKind === kind));
}

export function steroidogenesisStateLabel(id: string, locale: string): string {
  const state = STEROIDOGENESIS.states.find(item => item.id === id);
  if (!state) throw new Error(`Unregistered steroidogenesis measurement: ${id}`);
  return steroidogenesisText(state.label, locale);
}
