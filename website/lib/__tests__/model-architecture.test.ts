import { describe, expect, it } from "vitest";

import {
  CONDITIONAL_ASFR_ROUTE_ID,
  FIELDSTATE_CANONICAL_ROUTE,
  FIELDSTATE_SPEC_VERSION,
  MODEL_ARCHITECTURE,
  PREDICTION_ROUTE_ID,
  PUBLIC_MODEL_VERSION,
} from "../modelArchitecture";

describe("BERM / FieldState architecture contract", () => {
  it("keeps BERM as the model and FieldState as a measurement module", () => {
    expect(MODEL_ARCHITECTURE.model.id).toBe("berm");
    expect(MODEL_ARCHITECTURE.model.role).toBe(
      "explanatory_derivational_prediction_model",
    );
    expect(MODEL_ARCHITECTURE.measurementModules.fieldState.role).toBe(
      "measurement_observation_estimation",
    );
    expect(MODEL_ARCHITECTURE.measurementModules.fieldState.isModelAlias).toBe(false);
    expect(MODEL_ARCHITECTURE.measurementModules.fieldState.isCausalRoot).toBe(false);
  });

  it("names independent version and route namespaces", () => {
    expect(PUBLIC_MODEL_VERSION).toBe("v17");
    expect(FIELDSTATE_SPEC_VERSION).toBe("v2");
    expect(PREDICTION_ROUTE_ID).toBe("berm-v17-scalar-proxy");
    expect(CONDITIONAL_ASFR_ROUTE_ID).toBe("berm-conditional-asfr-v1");
    expect(FIELDSTATE_CANONICAL_ROUTE).toBe("/measurement/fieldstate");
  });

  it("does not overstate the missing Lindgren-to-observable bridge", () => {
    expect(MODEL_ARCHITECTURE.theory.formulation).toBe("2025-weyl-gme");
    expect(MODEL_ARCHITECTURE.theory.l2BridgeStatus).toBe("open");
    expect(MODEL_ARCHITECTURE.routes.prediction.fieldStateCalibrated).toBe(false);
    expect(MODEL_ARCHITECTURE.routes.conditionalAsfr.acceptsFieldStateObservations).toBe(false);
  });
});
