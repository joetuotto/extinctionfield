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
        "premise": "g_mu_nu = eta_mu_nu + A_mu A_nu",
        "l2BridgeStatus": L2_BRIDGE_STATUS,
        "l2BridgeMeaning": (
            "The geometry-to-observable coupling operator has not been derived. "
            "Downstream mechanisms are conditional BERM bridge propositions or "
            "imported biological realizations, not Lindgren-derived results."
        ),
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
}


def architecture_manifest() -> dict:
    """Return a defensive copy of the machine-readable architecture contract."""

    return deepcopy(_ARCHITECTURE_MANIFEST)


__all__ = [
    "CONDITIONAL_ASFR_ROUTE_ID",
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
