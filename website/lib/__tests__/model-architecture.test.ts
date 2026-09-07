import { describe, expect, it } from "vitest";

import {
  CONDITIONAL_ASFR_ROUTE_ID,
  DKC_CANDIDATE_ROUTE_ID,
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
    expect(DKC_CANDIDATE_ROUTE_ID).toBe("berm-lindgren-dkc-candidate-v1");
    expect(FIELDSTATE_CANONICAL_ROUTE).toBe("/measurement/fieldstate");
  });

  it("does not overstate the missing Lindgren-to-observable bridge", () => {
    expect(MODEL_ARCHITECTURE.theory.formulation).toBe("2025-weyl-gme");
    expect(MODEL_ARCHITECTURE.theory.l2BridgeStatus).toBe("open");
    expect(MODEL_ARCHITECTURE.theory.epistemicStatusPolicy).toBe(
      "componentwise_no_weakest_link_collapse",
    );
    expect(MODEL_ARCHITECTURE.theory.derivedStatusPreserved).toBe(true);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.implemented).toBe(true);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.epistemicStatus).toBe(
      "L1_DERIVED_FORMULAS",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.gateStatus).toBe(
      "CONDITIONAL_INPUT_CONTRACT",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.derivedStatusPreserved).toBe(true);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.requiresAllElements).toBe(true);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.bianchiAloneSufficient).toBe(false);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.actionPremise).toBe(
      "S=integral sqrt(-det g) R d^4x",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.fullEulerLagrangeRequired).toBe(true);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.fullEulerLagrangeEvidence).toBe(
      "CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED",
    );
    expect(
      MODEL_ARCHITECTURE.theory.formalDerivation.inputProvenanceBinding,
    ).toBe("NUMERIC_INPUT_BUNDLE_SHA256");
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.ehResidualComputation).toBe(
      "FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.weylChecks).toEqual([
      "levi_civita_metric_compatibility",
      "semimetricity",
      "connection_reconstruction",
      "torsion_free",
    ]);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.bianchiChecks).toEqual([
      "levi_civita_contracted_identity",
      "field_definition_F_equals_dA",
      "same_field_derivative_attestation",
      "homogeneous_dF",
    ]);
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.residualAcceptance).toBe(
      "PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.acceptanceAssertion).toBe(
      "variational_check AND weyl_check AND bianchi_check",
    );
    expect(MODEL_ARCHITECTURE.theory.formalDerivation.requiredElements).toEqual([
      "variational_harmonic_metric_gme",
      "weyl_semimetricity_and_connection",
      "bianchi_contracted_identity_and_homogeneous_df",
    ]);
    expect(MODEL_ARCHITECTURE.routes.prediction.fieldStateCalibrated).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.conditionalAsfr.acceptsFieldStateObservations).toBe(false);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.fieldStateCalibrated).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.fieldStateCalibrationScope).toBe(
      "CALIBRATION_PIPELINE_IMPLEMENTED_AND_PRODUCES_VALUES",
    );
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.refinedM4CurrentDataStatus).toBe(
      "NOT_IDENTIFIABLE_WITH_CURRENT_DATA",
    );
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.supportsUncalibratedExecution).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.requiresOpenL2Bridge).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.publishesLockedForecasts).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.calculationEnabled).toBe(true);
    expect(MODEL_ARCHITECTURE.routes.lindgrenDkc.candidateOutputsEnabled).toBe(true);
  });
});
