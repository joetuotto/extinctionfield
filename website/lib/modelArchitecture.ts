import manifest from "@/data/model-architecture.json";

export const MODEL_ARCHITECTURE = manifest;
export const PUBLIC_MODEL_VERSION = manifest.model.publicVersion;
export const PREDICTION_ROUTE_ID = manifest.routes.prediction.id;
export const CONDITIONAL_ASFR_ROUTE_ID = manifest.routes.conditionalAsfr.id;
export const FIELDSTATE_SPEC_VERSION = manifest.measurementModules.fieldState.specVersion;
export const FIELDSTATE_CANONICAL_ROUTE = manifest.measurementModules.fieldState.canonicalRoute;
