"""BERM v17 locked predictions and global parameters.

These predictions are frozen at their git SHA. If future observations
fall outside the CI, the model is falsified — not the prediction adjusted.
"""

from dataclasses import dataclass
from datetime import date

@dataclass(frozen=True)
class LockedPrediction:
    country: str
    year: int
    metric: str
    central: float
    ci_low: float
    ci_high: float
    locked_date: date
    model_version: str

LOCKED_PREDICTIONS: list[LockedPrediction] = [
    LockedPrediction("Finland", 2030, "TFR", 1.08, 1.02, 1.24,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("SouthKorea", 2030, "TFR", 0.61, 0.48, 0.72,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("SouthKorea", 2035, "TFR", 0.54, 0.40, 0.64,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("Japan", 2030, "TFR", 1.01, 0.88, 1.20,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("USA", 2030, "TFR", 1.35, 1.25, 1.65,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("Brazil", 2030, "TFR", 1.44, 1.40, 1.68,
                     date(2026, 8, 18), "v17.1"),
    LockedPrediction("Global", 2040, "TFR", 1.78, 1.55, 2.05,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("Global", 2050, "SpermConc_pctOf2020", 62.0, 48.0, 75.0,
                     date(2026, 8, 18), "v17.0"),
]


PREDICTION_HISTORY: dict[str, list[dict]] = {
    "Finland_2030_TFR": [
        {"version": "v17.0", "central": 1.17, "ci": [1.02, 1.24],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 1.08, "ci": [1.02, 1.24],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment "
         "(fetal 5x, infant 4x, child 3x, juvenile 2.5x, adolescent 2x) "
         "replaces linear ramp; 2005-born cohort spent entire childhood in "
         "3G/4G environment, biological weighting increases effective exposure"},
    ],
    "SouthKorea_2030_TFR": [
        {"version": "v17.0", "central": 0.60, "ci": [0.48, 0.72],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 0.61, "ci": [0.48, 0.72],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment"},
    ],
    "SouthKorea_2035_TFR": [
        {"version": "v17.0", "central": 0.52, "ci": [0.40, 0.64],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 0.54, "ci": [0.40, 0.64],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment"},
    ],
    "Japan_2030_TFR": [
        {"version": "v17.0", "central": 1.04, "ci": [0.88, 1.20],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 1.01, "ci": [0.88, 1.20],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment"},
    ],
    "USA_2030_TFR": [
        {"version": "v17.0", "central": 1.45, "ci": [1.25, 1.65],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 1.35, "ci": [1.25, 1.65],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment"},
    ],
    "Brazil_2030_TFR": [
        {"version": "v17.0", "central": 1.55, "ci": [1.40, 1.68],
         "date": "2026-08-18", "change_reason": "initial lock"},
        {"version": "v17.1", "central": 1.44, "ci": [1.40, 1.68],
         "date": "2026-08-18",
         "change_reason": "vulnerability-weighted cohort adjustment"},
    ],
}


# 5-layer recovery model
RECOVERY_LAYERS = {
    "VGIC":   {"alpha": 1.0, "weight": 0.10},
    "ROS":    {"alpha": 0.8, "weight": 0.30},
    "DNA":    {"alpha": 0.1, "weight": 0.25},
    "Leydig": {"alpha": 0.3, "weight": 0.20},
    "Neuron": {"alpha": 0.0, "weight": 0.15},
}

ALPHA_EFF = 0.43  # calibrated; raw layer sum = 0.425, rounded per v17 model

# Exposure-response slope of the base biological-capacity curve
# (parameter registry name: bio_capacity.b). Used by
# berm.v16.v11_biological_capacity():
#     bioCap = 6.5 * exp(-BIO_CAPACITY_SLOPE * (cum_exposure - 5.0))   above threshold 5.0
# Historical value 0.010 (v11, unchanged through the v17 calibration); the
# Wolfram-verified v17 predictions in tests/test_v16.py depend on it to
# machine precision. Module-level (not a function-local literal) so the
# sensitivity envelope in berm.model_data_driven can vary it without editing
# source (audit P2-19).
BIO_CAPACITY_SLOPE = 0.010

PERSONAL_SAR_WEIGHT = 1.5
TBE_FRACTION = 0.30
