"""Canonical identity and route boundaries for BERM.

This module intentionally separates the public BERM model, implementation
package releases, prediction/diagnostic routes, and the optional FieldState
measurement specification.  Consumers must not infer one version from
another or use FieldState as an alias for the model.
"""

from __future__ import annotations

from copy import deepcopy


PACKAGE_VERSION = "0.20.0"
MODEL_ID = "berm"
MODEL_NAME = "Bio-Electromagnetic Reproductive Model"
PUBLIC_MODEL_VERSION = "v17"

PREDICTION_ROUTE_ID = "berm-v17-scalar-proxy"
DIAGNOSTIC_ROUTE_ID = "berm-v19.1-three-channel-diagnostic"
CONDITIONAL_ASFR_ROUTE_ID = "berm-conditional-asfr-v1"

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
        "l2BridgeMeaning": (
            "Conditional on minimal matter-metric coupling and response theory, "
            "BERM derives the formal geometry-to-observable operator. Its gauge "
            "prescription, physical scale, tissue response kernels and human "
            "endpoint calibration remain open; downstream biology is not a "
            "Lindgren-derived result."
        ),
        "derivedGeometry": (
            "delta_g = kappa(A_background tensor a + a tensor A_background + a tensor a)"
        ),
        "responseOperator": (
            "delta<O_i> = integral Xi_i^{mu nu} delta_g_mu_nu + higher_order_response"
        ),
        "geometricCoordinate": (
            "chi_geo(rho) = rho / sqrt(1 + rho^2), rho^2 = kappa A^2, "
            "for an explicitly normalized positive-norm mode"
        ),
        "calibrationStatus": "open",
        "fieldStateRole": "optional_measurement_input_only",
    },
    "routes": {
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
    "civilizationExtensions": {
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
