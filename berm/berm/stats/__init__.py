"""BERM v18 statistical validation framework.

Model comparison (M0-M3), reversible/persistent decomposition,
synthetic falsification, and event study analysis.
"""

from berm.stats.model_comparison import compare_models, ComparisonResult
from berm.stats.reversible_persistent import estimate_rp_parameters, RPEstimationResult
from berm.stats.synthetic_tests import run_falsification_battery, placebo_rollout_test, wrong_lag_test
from berm.stats.event_study import event_study, EventStudyResult
from berm.stats.external_exposure import exposure_from_data, mobile_to_personal_emf
from berm.stats.fieldstate_core import (
    FIELDSTATE_CORE_VERSION,
    FieldStateCoreResult,
    FieldStateFeatures,
    RegisteredOrganIncrement,
    evaluate_fieldstate_core,
    extract_fieldstate_features,
)

__all__ = [
    "compare_models",
    "ComparisonResult",
    "estimate_rp_parameters",
    "RPEstimationResult",
    "run_falsification_battery",
    "placebo_rollout_test",
    "wrong_lag_test",
    "event_study",
    "EventStudyResult",
    "exposure_from_data",
    "mobile_to_personal_emf",
    "FIELDSTATE_CORE_VERSION",
    "FieldStateCoreResult",
    "FieldStateFeatures",
    "RegisteredOrganIncrement",
    "evaluate_fieldstate_core",
    "extract_fieldstate_features",
]
