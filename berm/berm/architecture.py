"""Canonical identity and route boundaries for BERM.

This module intentionally separates the public BERM model, implementation
package releases, prediction/diagnostic routes, and the optional FieldState
measurement specification.  Consumers must not infer one version from
another or use FieldState as an alias for the model.
"""

from __future__ import annotations

from copy import deepcopy


PACKAGE_VERSION = "0.19.0"
MODEL_ID = "berm"
MODEL_NAME = "Bio-Electromagnetic Reproductive Model"
PUBLIC_MODEL_VERSION = "v17"

PREDICTION_ROUTE_ID = "berm-v17-scalar-proxy"
DIAGNOSTIC_ROUTE_ID = "berm-v19.1-three-channel-diagnostic"
CONDITIONAL_ASFR_ROUTE_ID = "berm-conditional-asfr-v1"
DKC_CANDIDATE_ROUTE_ID = "berm-lindgren-dkc-candidate-v1"

FIELDSTATE_MODULE_ID = "fieldstate"
FIELDSTATE_SPEC_VERSION = "v2"

LINDGREN_FORMULATION = "2025-weyl-gme"
L2_BRIDGE_STATUS = "open"


_ARCHITECTURE_MANIFEST = {
    "schemaVersion": 1,
    "package": {
        "name": "berm",
        "version": PACKAGE_VERSION,
        "role": "implementation_release",
    },
    "model": {
        "id": MODEL_ID,
        "name": MODEL_NAME,
        "publicVersion": PUBLIC_MODEL_VERSION,
        "role": "explanatory_derivational_prediction_model",
    },
    "theory": {
        "formulation": LINDGREN_FORMULATION,
        "premise": "g_mu_nu = eta_mu_nu + kappa A_mu A_nu",
        "l2BridgeStatus": L2_BRIDGE_STATUS,
        "l2BridgeMeaning": (
            "The explicit Lorentz-to-spatial scalar reduction is L2: the directed "
            "derivative maps through |A_bar| to chi(|A_bar|), while the chi formula "
            "itself always remains L1. The geometry-to-observable coupling operator "
            "has not been derived. "
            "Downstream mechanisms are conditional BERM bridge propositions or "
            "imported biological realizations. Their empirical provenance does not "
            "erase or relabel any L1-derived component in the same chain."
        ),
        "epistemicStatusPolicy": "componentwise_no_weakest_link_collapse",
        "derivedStatusPreserved": True,
        "formalDerivation": {
            "implemented": True,
            "epistemicStatus": "L1_DERIVED_FORMULAS",
            "gateStatus": "CONDITIONAL_INPUT_CONTRACT",
            "derivedStatusPreserved": True,
            "requiredElements": [
                "variational_harmonic_metric_gme",
                "weyl_semimetricity_and_connection",
                "bianchi_contracted_identity_and_homogeneous_df",
            ],
            "requiresAllElements": True,
            "bianchiAloneSufficient": False,
            "actionPremise": "S=integral sqrt(-det g) R d^4x",
            "parallelActionPremises": [
                "EINSTEIN_HILBERT_WITH_LEVI_CIVITA_CURVATURE",
                "WEYL_METRIC_GRADIENT_HARMONIC_GME",
            ],
            "variationalEquation": "delta S/delta A_mu=0",
            "variationalResidual": (
                "branch-selected numerical full-action delta S/delta A_mu; EH "
                "also checks -2 kappa sqrt(-det g) G^(mu nu) A_nu; GME also "
                "checks the harmonic decomposition and R_outer=kappa R_GME"
            ),
            "fullEulerLagrangeRequired": True,
            "fullEulerLagrangeEvidence": (
                "CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED"
            ),
            "inputProvenanceBinding": "NUMERIC_INPUT_BUNDLE_SHA256",
            "ehResidualComputation": (
                "FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR"
            ),
            "weylCondition": (
                "nabla^LC_sigma g_mu_nu=0; the Weyl branch separately requires "
                "tilde_nabla_sigma g_mu_nu=2 phi_sigma g_mu_nu"
            ),
            "metricCompatibilityCondition": "nabla^LC_sigma g_mu_nu=0",
            "weylSemimetricityCondition": (
                "tilde_nabla_sigma g_mu_nu=2 phi_sigma g_mu_nu"
            ),
            "weylChecks": [
                "levi_civita_metric_compatibility",
                "semimetricity",
                "connection_reconstruction",
                "torsion_free",
            ],
            "bianchiCondition": "F=dA and homogeneous dF=0",
            "contractedBianchiCheck": (
                "nabla^LC_mu G_LC^(mu nu)=0 is audited separately and is not a "
                "sourced-Maxwell equation"
            ),
            "bianchiChecks": [
                "levi_civita_contracted_identity",
                "field_definition_F_equals_dA",
                "same_field_derivative_attestation",
                "homogeneous_dF",
            ],
            "acceptanceAssertion": "variational_check AND weyl_check AND bianchi_check",
            "residualAcceptance": ("PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE"),
            "sourceEquationOrigin": (
                "variational principle plus Weyl conditions and identifications"
            ),
            "homogeneousEquationOrigin": "Bianchi identity for F=dA",
            "unitTests": {
                "variational": "tests/test_lindgren_tensor.py::test_variational_field_residual_and_three_way_gate_are_explicit",
                "weyl": "tests/test_lindgren_tensor.py::test_weyl_semimetricity_uses_the_full_weyl_connection",
                "leviCivitaMetricCompatibility": "tests/test_lindgren_tensor.py::test_weyl_connection_and_torsion_residuals_use_same_nontrivial_metric",
                "bianchi": "tests/test_lindgren_tensor.py::test_bianchi_is_the_homogeneous_cyclic_identity_not_the_source_equation",
            },
            "validationMeaning": "formal_residual_consistency_not_physical_confirmation",
            "gateStatusMeaning": "conditional_input_contract_not_independent_proof",
        },
    },
    "routes": {
        "prediction": {
            "id": PREDICTION_ROUTE_ID,
            "modelVersion": PUBLIC_MODEL_VERSION,
            "role": "archived_comparison_prediction",
            "inputKind": "national_technology_timing_proxy",
            "fieldStateCalibrated": True,
        },
        "diagnostic": {
            "id": DIAGNOSTIC_ROUTE_ID,
            "modelVersion": "v19.1",
            "role": "cross_sectional_diagnostic",
            "publishesLockedForecasts": True,
        },
        "conditionalAsfr": {
            "id": CONDITIONAL_ASFR_ROUTE_ID,
            "role": "conditional_scenario_calculator",
            "acceptsFieldStateObservations": False,
            "requiresExternallySuppliedBiologicalStates": True,
            "publishesLockedForecasts": True,
        },
        "lindgrenDkc": {
            "id": DKC_CANDIDATE_ROUTE_ID,
            "role": "candidate_scenario_and_validation",
            "calculationEnabled": True,
            "candidateOutputsEnabled": True,
            "inputKind": (
                "national_technology_timing_proxy_or_caller_supplied_normalized_state"
            ),
            "fieldStateCalibrated": True,
            "fieldStateCalibrationScope": (
                "CALIBRATION_PIPELINE_IMPLEMENTED_AND_PRODUCES_VALUES"
            ),
            "refinedM4CurrentDataStatus": "NOT_IDENTIFIABLE_WITH_CURRENT_DATA",
            "supportsUncalibratedExecution": True,
            "requiresOpenL2Bridge": True,
            "publishesLockedForecasts": True,
        },
    },
    "measurementModules": {
        "fieldState": {
            "id": FIELDSTATE_MODULE_ID,
            "specVersion": FIELDSTATE_SPEC_VERSION,
            "role": "measurement_observation_estimation",
            "isModelAlias": False,
            "isCausalRoot": False,
            "publishesLockedForecasts": True,
            "canonicalRoute": "/measurement/fieldstate",
        }
    },
}


def architecture_manifest() -> dict:
    """Return a defensive copy of the machine-readable architecture contract."""

    return deepcopy(_ARCHITECTURE_MANIFEST)


__all__ = [
    "CONDITIONAL_ASFR_ROUTE_ID",
    "DKC_CANDIDATE_ROUTE_ID",
    "DIAGNOSTIC_ROUTE_ID",
    "FIELDSTATE_MODULE_ID",
    "FIELDSTATE_SPEC_VERSION",
    "L2_BRIDGE_STATUS",
    "LINDGREN_FORMULATION",
    "MODEL_ID",
    "MODEL_NAME",
    "PACKAGE_VERSION",
    "PREDICTION_ROUTE_ID",
    "PUBLIC_MODEL_VERSION",
    "architecture_manifest",
]
