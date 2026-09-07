import { describe, expect, it } from "vitest";

import publicRegistry from "@/public/data/dkc-framework.json";
import {
  DKC_CALCULATION_ENABLED,
  DKC_CAN_RUN_UNCALIBRATED,
  DKC_CANDIDATE_OUTPUTS_ENABLED,
  DKC_FRAMEWORK,
  DKC_IS_CALIBRATED_FIELDSTATE_ROUTE,
  DKC_PUBLISHES_LOCKED_FORECASTS,
} from "@/lib/dkcFramework";

describe("Lindgren-DKC framework registry", () => {
  it("keeps generated data mirrors identical", () => {
    expect(DKC_FRAMEWORK).toEqual(publicRegistry);
  });

  it("contains complete T, F, E and S registries", () => {
    expect(DKC_FRAMEWORK.refinements.map(({ id }) => id)).toEqual(
      Array.from({ length: 12 }, (_, index) => `T${index + 1}`),
    );
    expect(DKC_FRAMEWORK.predictions.map(({ id }) => id)).toEqual(
      Array.from({ length: 9 }, (_, index) => `F${index + 1}`),
    );
    expect(
      DKC_FRAMEWORK.predictions.every(
        ({ mathematicalForm, numericValue, timeHorizon, falsificationCriterion }) =>
          mathematicalForm.length > 0 &&
          Object.keys(numericValue).length > 0 &&
          Object.keys(timeHorizon).length > 0 &&
          falsificationCriterion.length > 0,
      ),
    ).toBe(true);
    expect(DKC_FRAMEWORK.verificationPoints.map(({ id }) => id)).toEqual(
      Array.from({ length: 25 }, (_, index) => `V${index + 1}`),
    );
    expect(DKC_FRAMEWORK.endpointTests.map(({ id }) => id)).toEqual(
      Array.from({ length: 6 }, (_, index) => `E${index + 1}`),
    );
    expect(DKC_FRAMEWORK.internalTests.map(({ id }) => id)).toEqual(
      Array.from({ length: 7 }, (_, index) => `S${index}`),
    );
    expect(DKC_FRAMEWORK.tensorTests.map(({ id }) => id)).toEqual([
      "F_T1",
      "F_T2",
      "F_T3",
      "F_T4",
      "F_T5",
    ]);
    expect(DKC_FRAMEWORK.tensorTests.every(({ implemented }) => implemented)).toBe(true);
    expect(
      DKC_FRAMEWORK.refinements.every(({ epistemicStatus }) =>
        epistemicStatus.startsWith("L3_"),
      ),
    ).toBe(true);
  });

  it("keeps calibration and locked-forecast status independent", () => {
    expect(DKC_CALCULATION_ENABLED).toBe(true);
    expect(DKC_CANDIDATE_OUTPUTS_ENABLED).toBe(true);
    expect(DKC_IS_CALIBRATED_FIELDSTATE_ROUTE).toBe(true);
    expect(DKC_CAN_RUN_UNCALIBRATED).toBe(true);
    expect(DKC_PUBLISHES_LOCKED_FORECASTS).toBe(true);
    expect(DKC_FRAMEWORK.predictions.every(({ locked }) => locked)).toBe(true);
    expect(
      DKC_FRAMEWORK.predictions.every(
        ({ status }) => status === "LOCKED_FALSIFIABLE_FORECAST",
      ),
    ).toBe(true);
    expect(DKC_FRAMEWORK.status.l2Bridge).toBe("OPEN");
    expect(DKC_FRAMEWORK.status.nationalInputClass).toBe(
      "TECHNOLOGY_TIMING_PROXY",
    );
    expect(DKC_FRAMEWORK.status.epistemicStatusPolicy).toBe(
      "COMPONENTWISE_NO_WEAKEST_LINK_COLLAPSE",
    );
    expect(DKC_FRAMEWORK.status.derivedStatusPreserved).toBe(true);
  });

  it("requires a protocol-locked, symmetric evidence audit for publication", () => {
    expect(DKC_FRAMEWORK.schemaVersion).toBe(3);
    expect(DKC_FRAMEWORK.verificationGate.publicationRule).toBe(
      "all(V1..V10 == PASS) AND protocolAudit.passed",
    );
    expect(DKC_FRAMEWORK.verificationGate.unstructuredPassPolicy).toBe("REJECT");
    expect(DKC_FRAMEWORK.verificationGate.defaultEvaluation.protocolAudit).toMatchObject({
      passed: false,
      reason: "MISSING_PROTOCOL_AUDIT",
    });
    expect(DKC_FRAMEWORK.verificationGate.protocolAuditRequirements).toEqual([
      "protocolLockedBeforeSearch",
      "completeSearchLog",
      "eligibilityPrespecified",
      "independentDualScreening",
      "symmetricModelComparison",
      "nullAndContradictoryEvidenceSearched",
      "riskOfBiasComplete",
      "exclusionsReasoned",
      "protocolDeviationsDisclosed",
    ]);
  });

  it("keeps all three L1 elements and the directed Lorentz reduction explicit", () => {
    expect(DKC_FRAMEWORK.derivation.formalThreeElementChain.elements).toEqual([
      "variational_harmonic_metric_gme",
      "weyl_semimetricity_and_connection",
      "bianchi_contracted_identity_and_homogeneous_df",
    ]);
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.epistemicStatus,
    ).toBe("L1_DERIVED_FORMULAS");
    expect(DKC_FRAMEWORK.derivation.formalThreeElementChain.gateStatus).toBe(
      "CONDITIONAL_INPUT_CONTRACT",
    );
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.acceptanceAssertion,
    ).toBe("variational_check AND weyl_check AND bianchi_check");
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.fullEulerLagrangeRequired,
    ).toBe(true);
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.fullEulerLagrangeEvidence,
    ).toBe("CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED");
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.inputProvenanceBinding,
    ).toBe("NUMERIC_INPUT_BUNDLE_SHA256");
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.ehResidualComputation,
    ).toBe("FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR");
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.weylChecks,
    ).toEqual([
      "levi_civita_metric_compatibility",
      "semimetricity",
      "connection_reconstruction",
      "torsion_free",
    ]);
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.bianchiChecks,
    ).toEqual([
      "levi_civita_contracted_identity",
      "field_definition_F_equals_dA",
      "same_field_derivative_attestation",
      "homogeneous_dF",
    ]);
    expect(
      DKC_FRAMEWORK.derivation.formalThreeElementChain.residualAcceptance,
    ).toBe("PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE");
    expect(DKC_FRAMEWORK.derivation.L1Conditions).toContain(
      "remains directional",
    );
    expect(DKC_FRAMEWORK.derivation.selectionRule).toContain(
      "geodesic-deviation",
    );
    expect(DKC_FRAMEWORK.derivation.spatialScalarReduction).toEqual({
      conditions: "dimensionless, collinear and spacelike",
      reductionStatus: "L2_EXPLICIT_BRIDGE",
      directedDerivativeToMagnitude: "D_u volume -> |A_bar| -> chi(|A_bar|)",
      observableIdentificationStatus: "L2_OPEN",
      derivedCoefficientStatus: "L1_ALWAYS",
    });
  });
});
