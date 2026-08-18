"""BERM v18 statistical validation framework.

Model comparison (M0-M3), reversible/persistent decomposition,
synthetic falsification, and event study analysis.
"""

from berm.stats.model_comparison import compare_models, ComparisonResult
from berm.stats.reversible_persistent import estimate_rp_parameters, RPEstimationResult
from berm.stats.synthetic_tests import run_falsification_battery, placebo_rollout_test, wrong_lag_test
from berm.stats.event_study import event_study, EventStudyResult

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
]
