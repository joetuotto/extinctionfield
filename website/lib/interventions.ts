import registry from "@/data/intervention-profiles.json";

export type InterventionText = { en: string; fi: string };
export const INTERVENTION_IDS = ["mt2_brake", "local_ltype_erk", "channel_selectivity", "lipid_ttype_inhibition", "channel_density_store_history", "cry_fad_competition", "drug_photochemistry", "coq10_response"] as const;
export type InterventionId = typeof INTERVENTION_IDS[number];
export type ArmId = "sham" | "field" | "drug" | "fieldDrug";
export interface EndpointMeasurement {
  value: number;
  endpoint: string;
  unit: string;
  time: number;
  timeUnit: string;
  // Different group-specific percentage baselines cannot be subtracted.
  normalization: "raw" | "shared_reference";
  normalizationReferenceId?: string;
  protocolId: string;
}
export interface InterventionProfile {
  id: string;
  title: InterventionText;
  mechanism: InterventionText;
  observed: InterventionText;
  prediction: InterventionText;
  limitations: InterventionText[];
  protocol: Record<"system" | "field" | "light" | "drugTiming" | "measurement", InterventionText>;
  referenceIds: string[];
  claimIds: string[];
  atlasNodeIds: string[];
  studyIds: string[];
  endpointIds: string[];
  interventionTargets: string[];
  modelStatus: "STRUCTURAL_ONLY";
  studies: { id: string; referenceId: string; fieldTested: boolean; sourceCoverage: "full_text" | "abstract"; system: string; protocol: string; endpoint: string }[];
  contrast: { status: "not_calculable_from_curated_data"; reason: InterventionText; arms: Record<ArmId, EndpointMeasurement | null> };
}
export interface InterventionRegistry {
  schemaVersion: "berm-intervention-profiles-v1";
  derivation: { theoryVersion: string; premise: string; metricPerturbation: string; conditionalResponse: string; portMapping: string; assumptions: string[]; openBridges: string[]; status: "CONDITIONAL_FORMAL_OPERATOR" };
  profiles: InterventionProfile[];
}
export const INTERVENTIONS: InterventionRegistry = registry as InterventionRegistry;
export const interventionText = (text: InterventionText, locale: string) => text[locale === "fi" ? "fi" : "en"];
export function getIntervention(id: string | null | undefined) { return INTERVENTIONS.profiles.find(profile => profile.id === id); }
export function interventionFromSearch(search: string) { return getIntervention(new URLSearchParams(search).get("profile")); }
export function searchInterventions(query: string) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return INTERVENTIONS.profiles.filter(profile => {
    const haystack = [profile.id, ...Object.values(profile.title), ...Object.values(profile.mechanism), ...Object.values(profile.observed), ...profile.endpointIds, ...profile.interventionTargets, ...profile.studies.flatMap(study => [study.system, study.protocol, study.endpoint]), ...Object.values(profile.protocol).flatMap(Object.values)].join(" ").toLocaleLowerCase();
    return words.every(word => haystack.includes(word));
  });
}
export function interventionHref(locale: string, profileId: string) {
  return `/${locale}/evidence/pharmacology?${new URLSearchParams({ profile: profileId })}#intervention-explorer`;
}
export function interventionAtlasHref(locale: string, profileId: string, nodeId?: string) {
  const query = new URLSearchParams({ profile: profileId });
  if (nodeId) query.set("node", nodeId);
  return `/${locale}/map?${query}`;
}
export function interventionsForNode(nodeId: string) { return INTERVENTIONS.profiles.filter(profile => profile.atlasNodeIds.includes(nodeId)); }

/** Only matched endpoint means are eligible. Missing observations never become zero. */
export function factorialContrast(arms: Record<ArmId, EndpointMeasurement | null>) {
  const measurements = [arms.sham, arms.field, arms.drug, arms.fieldDrug];
  if (measurements.some(arm => !arm)) return { status: "unavailable" as const, reason: "missing_arm" as const };
  const complete = measurements as EndpointMeasurement[];
  if (complete.some(arm => !Number.isFinite(arm.value) || !Number.isFinite(arm.time))) return { status: "unavailable" as const, reason: "invalid_value" as const };
  if (complete.some(arm => !["raw", "shared_reference"].includes(arm.normalization) || (arm.normalization === "shared_reference" && !arm.normalizationReferenceId))) return { status: "unavailable" as const, reason: "unmatched_endpoint" as const };
  const keys = ["endpoint", "unit", "time", "timeUnit", "normalization", "protocolId", "normalizationReferenceId"] as const;
  if (keys.some(key => complete.some(arm => arm[key] !== complete[0][key] || arm[key] === ""))) return { status: "unavailable" as const, reason: "unmatched_endpoint" as const };
  const fieldEffectWithoutDrug = complete[1].value - complete[0].value;
  const fieldEffectWithDrug = complete[3].value - complete[2].value;
  const interaction = fieldEffectWithDrug - fieldEffectWithoutDrug;
  if (![fieldEffectWithoutDrug, fieldEffectWithDrug, interaction].every(Number.isFinite)) return { status: "unavailable" as const, reason: "invalid_value" as const };
  return { status: "available" as const, fieldEffectWithoutDrug, fieldEffectWithDrug, interaction, unit: complete[0].unit };
}

export interface InterventionScenario {
  id: string;
  profile_id: string;
  title: InterventionText;
  description: InterventionText;
  changed_inputs: { key: string; label: InterventionText; reference: string | number; target: string | number; units: string }[];
  highlight_endpoints: string[];
  protocol: Record<string, unknown>;
  result: {
    calibration_status: "STRUCTURAL_ONLY";
    physical_identification_status: "OPEN";
    asfr_mapping: null;
    parameter_ids: string[];
    arms: { id: "sham" | "field" | "drug" | "field_drug"; label: InterventionText; baseline: Record<string, number>; observables: Record<string, { value: number; unit: string; detected?: boolean }>; trace: Record<string, unknown>[] }[];
    contrasts: { endpoint: string; unit: string; field_effect_without_drug: number; field_effect_with_drug: number; interaction: number; status: "SYNTHETIC_FOUR_ARM_CONTRAST" }[];
  };
}
export interface InterventionScenarios {
  schema_version: 1;
  metadata: { calibration_status: "STRUCTURAL_ONLY"; physical_identification_status: "OPEN"; input_origin: "synthetic illustrative parameters"; observable_labels: Record<string, InterventionText>; observable_trace_keys: Record<string, string>; assumptions: { en: string[]; fi: string[] } };
  scenarios: InterventionScenario[];
}
export function traceValue(point: Record<string, unknown>, path: string): number | undefined {
  // Channel names contain a dot (CaV1.2): only split the container prefix.
  const boundary = path.indexOf(".");
  const value = boundary < 0 ? point[path] : (point[path.slice(0, boundary)] as Record<string, unknown> | undefined)?.[path.slice(boundary + 1)];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
/** Verify the public export before rendering numbers, including the evidence boundary. */
export function parseInterventionScenarios(value: unknown): InterventionScenarios {
  const data = value as InterventionScenarios;
  const bilingual = (text: InterventionText) => Boolean(text?.en && text?.fi);
  if (data?.schema_version !== 1 || data.metadata?.calibration_status !== "STRUCTURAL_ONLY" || data.metadata.physical_identification_status !== "OPEN" || data.metadata.input_origin !== "synthetic illustrative parameters" || !Array.isArray(data.scenarios) || !data.scenarios.length || !data.metadata.observable_trace_keys || !Array.isArray(data.metadata.assumptions?.en) || !Array.isArray(data.metadata.assumptions?.fi)) throw new Error("Unsupported intervention example export");
  const ids = new Set<string>();
  for (const scenario of data.scenarios) {
    if (!scenario.id || ids.has(scenario.id) || !getIntervention(scenario.profile_id) || !bilingual(scenario.title) || !bilingual(scenario.description) || !Array.isArray(scenario.changed_inputs) || !Array.isArray(scenario.highlight_endpoints)) throw new Error("Invalid scenario identity");
    ids.add(scenario.id);
    const result = scenario.result;
    if (result?.calibration_status !== "STRUCTURAL_ONLY" || result.physical_identification_status !== "OPEN" || result.asfr_mapping !== null || !Array.isArray(result.parameter_ids) || !Array.isArray(result.arms) || result.arms.length !== 4 || new Set(result.arms.map(arm => arm.id)).size !== 4 || !["sham", "field", "drug", "field_drug"].every(id => result.arms.some(arm => arm.id === id))) throw new Error("Invalid four-arm scenario");
    for (const arm of result.arms) {
      if (!bilingual(arm.label) || !arm.observables || !Array.isArray(arm.trace) || !arm.trace.length || !Number.isFinite(arm.baseline?.time_s)) throw new Error("Missing scenario observations");
      for (const [key, observation] of Object.entries(arm.observables)) if (!Number.isFinite(observation.value) || !observation.unit || !bilingual(data.metadata.observable_labels?.[key])) throw new Error("Invalid scenario endpoint");
      if (arm.trace.some(point => typeof point.time_s !== "number" || !Number.isFinite(point.time_s))) throw new Error("Invalid scenario time");
      for (const key of scenario.highlight_endpoints) if (!arm.observables[key]) throw new Error("Missing highlighted endpoint");
    }
    for (const input of scenario.changed_inputs) if (!input.key || !bilingual(input.label) || !input.units || ![input.reference, input.target].every(value => typeof value === "string" || typeof value === "number" && Number.isFinite(value))) throw new Error("Invalid scenario input");
    if (!Array.isArray(result.contrasts)) throw new Error("Missing scenario contrasts");
    for (const contrast of result.contrasts) {
      if (contrast.status !== "SYNTHETIC_FOUR_ARM_CONTRAST" || ![contrast.field_effect_without_drug, contrast.field_effect_with_drug, contrast.interaction].every(Number.isFinite) || result.arms.some(arm => !arm.observables[contrast.endpoint] || arm.observables[contrast.endpoint].unit !== contrast.unit)) throw new Error("Unmatched scenario contrast");
      const armValue = (id: string) => result.arms.find(arm => arm.id === id)!.observables[contrast.endpoint].value;
      const without = armValue("field") - armValue("sham");
      const withDrug = armValue("field_drug") - armValue("drug");
      if ([[without, contrast.field_effect_without_drug], [withDrug, contrast.field_effect_with_drug], [withDrug - without, contrast.interaction]].some(([expected, reported]) => !Number.isFinite(expected) || Math.abs(expected - reported) > 1e-9 * Math.max(1, Math.abs(expected)))) throw new Error("Scenario contrast differs from its four arms");
    }
  }
  return data;
}
