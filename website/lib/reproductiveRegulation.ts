import catalog from "@/data/reproductive-regulation.json";
import { citationLabel, indexedReference } from "@/lib/referenceIndex";

export type RegulationText = { en: string; fi: string; ja?: string; fr?: string; ko?: string };
export type RegulationBranch = "motivation_realisation" | "capacity" | "care_feedback";
export interface RegulationStudy {
  id: string; referenceId: string; evidenceKind: "component_experiment" | "observational";
  branches: RegulationBranch[]; familyId: string; datasetIds: string[];
  system: RegulationText; intervention: RegulationText; finding: RegulationText; scope: RegulationText; timeCourse: RegulationText;
  measuredVariables: string[]; outcomes: string[]; correctionReferenceIds: string[];
}
export interface RegulationCatalog {
  schemaVersion: number; version: string; updatedAt: string;
  stagePolicy: { phase: "structure_and_direction"; summary: RegulationText; calibration: RegulationText; fieldAttribution: "conditional_unresolved" };
  studies: RegulationStudy[];
  families: { id: string; label: RegulationText; description: RegulationText }[];
  variableLabels: Record<string, RegulationText>;
  syntheses: { id: string; title: RegulationText; statement: RegulationText; scope: RegulationText; claimId: string; studyIds: string[]; nodeIds: string[]; referenceIds: string[]; status: "conditional_synthesis" }[];
  existingDatasets: { id: string; title: RegulationText; description: RegulationText; scope: RegulationText; access: RegulationText; referenceId: string; url: string; years: string; yearBasis: "collection" | "publication"; familyId: string; measuredVariables: string[]; studyIds: string[]; individualLevel: boolean; longitudinal: boolean }[];
}
export const REPRODUCTIVE_REGULATION = catalog as unknown as RegulationCatalog;
export function regulationText(text: RegulationText, locale: string): string { return text[locale as keyof RegulationText]?.trim() || text.en; }
export function regulationStudyLabel(study: RegulationStudy, locale: string): string {
  const ref = indexedReference(study.referenceId);
  return ref ? citationLabel(ref, locale) : study.id;
}
export function regulationVariableLabel(id: string, locale: string): string {
  const label = REPRODUCTIVE_REGULATION.variableLabels[id];
  if (!label) throw new Error(`Unregistered reproductive regulation variable: ${id}`);
  return regulationText(label, locale);
}
export function regulationFamily(id: string) {
  const family = REPRODUCTIVE_REGULATION.families.find(item => item.id === id);
  if (!family) throw new Error(`Unregistered reproductive regulation family: ${id}`);
  return family;
}
export function filterRegulationStudies({ branch = "all", kind = "all", family = "all" }: { branch?: string; kind?: string; family?: string }) {
  return REPRODUCTIVE_REGULATION.studies.filter(study => (branch === "all" || study.branches.includes(branch as RegulationBranch)) && (kind === "all" || study.evidenceKind === kind) && (family === "all" || study.familyId === family));
}
