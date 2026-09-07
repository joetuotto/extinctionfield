import registry from "@/data/dkc-framework.json";

export type DkcRefinement = (typeof registry.refinements)[number];
export type DkcPrediction = (typeof registry.predictions)[number] & {
  mathematicalForm: string;
  numericValue: Record<string, unknown>;
  timeHorizon: Record<string, unknown>;
  falsificationCriterion: string;
};
export type DkcValidationTest = (typeof registry.endpointTests)[number];
export type DkcInternalTest = (typeof registry.internalTests)[number];
export type DkcModelFamily = (typeof registry.modelFamilies)[number];

/**
 * Generated from berm.berm.dkc_registry. Keep scientific status and identifiers
 * in the Python registry. Publication export requires a protocol-locked search,
 * screening, risk-of-bias and outcome bundle:
 * `python berm/export_dkc_framework.py --evaluation-bundle <file.json>`.
 */
type DkcFrameworkRegistry = Omit<typeof registry, "predictions"> & {
  predictions: DkcPrediction[];
};

export const DKC_FRAMEWORK = registry as DkcFrameworkRegistry;

export const DKC_IS_CALIBRATED_FIELDSTATE_ROUTE =
  registry.status.fieldStateCalibrated;
export const DKC_CAN_RUN_UNCALIBRATED =
  registry.status.supportsUncalibratedExecution;
export const DKC_PUBLISHES_LOCKED_FORECASTS =
  registry.status.publishesLockedForecasts;
export const DKC_CALCULATION_ENABLED = registry.status.calculationEnabled;
export const DKC_CANDIDATE_OUTPUTS_ENABLED =
  registry.status.candidateOutputsEnabled;
