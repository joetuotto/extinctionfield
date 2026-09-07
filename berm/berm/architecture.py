"""Canonical identity and route boundaries for BERM.

This module intentionally separates the public BERM model, implementation
package releases, prediction/diagnostic routes, and the optional FieldState
measurement specification.  Consumers must not infer one version from
another or use FieldState as an alias for the model.
"""

from __future__ import annotations

from copy import deepcopy
from berm.biology.cross_pathway_synthesis import synthesis_manifest


PACKAGE_VERSION = "0.22.0"
MODEL_ID = "berm"
MODEL_NAME = "Bio-Electromagnetic Reproductive Model"
PUBLIC_MODEL_VERSION = "v17"

PREDICTION_ROUTE_ID = "berm-v17-scalar-proxy"
DIAGNOSTIC_ROUTE_ID = "berm-v19.1-three-channel-diagnostic"
CONDITIONAL_ASFR_ROUTE_ID = "berm-conditional-asfr-v1"
MODULOME_ASFR_ROUTE_ID = "berm-modulome-conditional-asfr-v1"
DKC_CANDIDATE_ROUTE_ID = "berm-lindgren-dkc-candidate-v1"

FIELDSTATE_MODULE_ID = "fieldstate"
FIELDSTATE_SPEC_VERSION = "v2"

EPISTAPEGE_EXTENSION_ID = "berm-epistapege-v1"

LINDGREN_FORMULATION = "2025-weyl-gme"
L2_BRIDGE_STATUS = "conditional_formal_operator"


_ARCHITECTURE_MANIFEST = {
    "schemaVersion": 2,
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
        "l2BridgeStatusScope": "operator_form_only",
        "bridgeComponents": {
            "geometry": {
                "status": "L1_DERIVED",
                "scope": "exact_delta_metric_given_the_2025_ansatz",
            },
            "responseOperator": {
                "status": "CONDITIONAL_FORMAL_OPERATOR",
                "assumptions": ["minimal_matter_metric_coupling", "retarded_response_expansion"],
                "scope": "operator_form_not_an_identified_tissue_kernel",
            },
            "physicalIdentification": {
                "status": "OPEN",
                "unresolved": ["gauge_prescription", "physical_coupling_scale"],
            },
            "tissueKernel": {
                "status": "CALLER_SUPPLIED_UNCALIBRATED",
                "scope": "organ_state_direction_units_and_lag_are_explicit_inputs",
            },
            "endpointCalibration": {
                "status": "OPEN",
                "scope": "the_composed_human_endpoint_chain",
            },
        },
        "l2BridgeMeaning": (
            "Conditional on minimal matter-metric coupling and response theory, "
            "BERM derives the formal geometry-to-observable operator. Its gauge "
            "prescription, physical scale, tissue response kernels and human "
            "endpoint calibration remain open; downstream biology is not a "
            "Lindgren-derived result. The Lorentz-to-spatial scalar reduction "
            "that maps the directed derivative through |A_bar| to chi(|A_bar|) "
            "is L2, while the chi formula itself always remains L1. Downstream "
            "mechanisms are conditional BERM bridge propositions or imported "
            "biological realizations; their empirical provenance does not erase "
            "or relabel any L1-derived component in the same chain."
        ),
        "derivedGeometry": (
            "delta_g = kappa(A_background tensor a + a tensor A_background + a tensor a)"
        ),
        "responseOperator": (
            "delta<O_i> = integral Xi_i^{mu nu} delta_g_mu_nu + higher_order_response"
        ),
        "stateConditionedResponse": (
            "u_i(t) = integral K_i^{mu nu}(tau; S_i(t-tau)) "
            "delta_g_mu_nu(t-tau) d tau"
        ),
        "responseStateArguments": [
            "orientation",
            "coherence",
            "waveform",
            "circadian_phase",
            "metabolic_phase",
            "developmental_window",
            "receptor_or_agonist_state",
            "redox_state",
            "temperature_trajectory",
            "organ_transfer",
            "exposure_history",
        ],
        "responseEvidenceRole": (
            "Component studies constrain arguments, null regions and lag families of the "
            "open tissue kernel; they do not validate the Lindgren premise or calibrate "
            "a human endpoint coefficient."
        ),
        "geometricCoordinate": (
            "chi_geo(rho) = rho / sqrt(1 + rho^2), rho^2 = kappa A^2, "
            "for an explicitly normalized positive-norm mode"
        ),
        "calibrationStatus": "open",
        "fieldStateRole": "optional_measurement_input_only",
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
        "modulomeAsfr": {
            "id": MODULOME_ASFR_ROUTE_ID,
            "role": "conditional_scenario_calculator",
            "inputKind": "caller_supplied_local_biological_driver_and_state",
            "fieldStateCalibrated": False,
            "calibrationStatus": "STRUCTURAL_ONLY",
            "requiresOpenL2Bridge": True,
            "publishesLockedForecasts": False,
            "preservesArchivedV17": True,
        },
        "prediction": {
            "id": PREDICTION_ROUTE_ID,
            "modelVersion": PUBLIC_MODEL_VERSION,
            "role": "archived_comparison_prediction",
            "inputKind": "national_technology_timing_proxy",
            "fieldStateCalibrated": False,
        },
        "diagnostic": {
            "id": DIAGNOSTIC_ROUTE_ID,
            "modelVersion": "v19.1",
            "role": "cross_sectional_diagnostic",
            "publishesLockedForecasts": False,
        },
        "conditionalAsfr": {
            "id": CONDITIONAL_ASFR_ROUTE_ID,
            "role": "conditional_scenario_calculator",
            "acceptsFieldStateObservations": False,
            "requiresExternallySuppliedBiologicalStates": True,
            "publishesLockedForecasts": False,
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
            "publishesLockedForecasts": False,
            "canonicalRoute": "/measurement/fieldstate",
        }
    },
    "evidenceSynthesis": synthesis_manifest(),
    "civilizationExtensions": {
        "forwardAggregation": {
            "id": "berm-forward-aggregation-v1",
            "role": "individual_probability_to_population_distribution",
            "operator": "P_t(Y=p) = integral P(Y=p | z,x) f_t(z,x) dz dx",
            "reverseEcologicalInferenceAllowed": False,
            "institutionalMemory": (
                "I_(t+1) = retention I_t + (1-retention) P_t"
            ),
            "calibrationStatus": "open",
        },
        "epistapege": {
            "id": EPISTAPEGE_EXTENSION_ID,
            "role": "qualitative_observability_hypothesis",
            "status": "open_testable_extension",
            "canonicalRoute": "/civilization/epistapege",
            "publishesNumericPredictions": False,
            "fieldStateRole": "optional_physical_measurement_input_only",
            "evidenceBoundary": (
                "Direct component findings constrain individual transitions; "
                "the complete biology-to-narrative-to-institution route is a "
                "composed BERM inference, not a Lindgren or FieldState result."
            ),
        }
    },
}


def architecture_manifest() -> dict:
    """Return a defensive copy of the machine-readable architecture contract."""

    return deepcopy(_ARCHITECTURE_MANIFEST)


__all__ = [
    "CONDITIONAL_ASFR_ROUTE_ID",
    "MODULOME_ASFR_ROUTE_ID",
    "DKC_CANDIDATE_ROUTE_ID",
    "DIAGNOSTIC_ROUTE_ID",
    "EPISTAPEGE_EXTENSION_ID",
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
