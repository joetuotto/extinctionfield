"""BERM Cross-Species Lag Index (CSLI) v2.

Orthogonal Sentinel Triangulation: a future-testing framework for comparing
reproductive biomarker trends across species. Any exposure-gradient claim
requires measured dosimetry and matched response panels; no such empirical
gradient is currently exposed by this package.

Key components:
  - Dog as primary indoor-environment mammalian sentinel
  - Bull/boar as a proposed negative-control data requirement
  - Bee as ecological ambient-exposure sentinel
  - Human biomarkers and fertility as final outcome

This module is DIAGNOSTIC ONLY — it does not affect TFR predictions.
"""

from berm.csli.falsification import (
    CSLI_FALSIFICATIONS,
    exposure_gradient_test,
    print_exposure_gradient,
    print_falsification_status,
)
from berm.csli.lag_scaling import (
    expected_lag_days,
    lag_ratio,
    print_lag_scaling,
    spermatogenic_cycle_ratio,
)
from berm.csli.species_data import (
    DOG_ENDPOINTS,
    EXPOSURE_GRADIENT_REQUIREMENTS,
    LIVESTOCK_DATA,
    SPECIES_BIOLOGY_V2,
)

__all__ = [
    "CSLI_FALSIFICATIONS",
    "DOG_ENDPOINTS",
    "EXPOSURE_GRADIENT_REQUIREMENTS",
    "LIVESTOCK_DATA",
    "SPECIES_BIOLOGY_V2",
    "expected_lag_days",
    "exposure_gradient_test",
    "lag_ratio",
    "print_exposure_gradient",
    "print_falsification_status",
    "print_lag_scaling",
    "spermatogenic_cycle_ratio",
]
