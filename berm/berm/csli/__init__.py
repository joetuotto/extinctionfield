"""BERM Cross-Species Lag Index (CSLI) v2.

Orthogonal Sentinel Triangulation: five-tier system comparing
reproductive biomarker trends across species with different EMF
exposure levels. The exposure gradient (bull < bee < dog < human)
predicts response magnitude and timing.

Key components:
  - Dog as primary indoor-environment mammalian sentinel
  - Bull/boar as low-exposure negative control
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
    EXPOSURE_GRADIENT,
    LIVESTOCK_DATA,
    SPECIES_BIOLOGY_V2,
)

__all__ = [
    "CSLI_FALSIFICATIONS",
    "DOG_ENDPOINTS",
    "EXPOSURE_GRADIENT",
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
