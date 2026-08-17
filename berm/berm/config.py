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
    LockedPrediction("Finland", 2030, "TFR", 1.17, 1.02, 1.24,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("SouthKorea", 2030, "TFR", 0.55, 0.42, 0.68,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("USA", 2030, "TFR", 1.45, 1.30, 1.58,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("Japan", 2030, "TFR", 1.05, 0.88, 1.15,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("Brazil", 2030, "TFR", 1.55, 1.40, 1.68,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("Global", 2040, "TFR", 1.78, 1.55, 2.05,
                     date(2026, 8, 18), "v17.0"),
    LockedPrediction("Global", 2050, "SpermConc_pctOf2020", 62.0, 48.0, 75.0,
                     date(2026, 8, 18), "v17.0"),
]

# 5-layer recovery model
RECOVERY_LAYERS = {
    "VGIC":   {"alpha": 1.0, "weight": 0.10},
    "ROS":    {"alpha": 0.8, "weight": 0.30},
    "DNA":    {"alpha": 0.1, "weight": 0.25},
    "Leydig": {"alpha": 0.3, "weight": 0.20},
    "Neuron": {"alpha": 0.0, "weight": 0.15},
}

ALPHA_EFF = 0.43  # calibrated; raw layer sum = 0.425, rounded per v17 model

PERSONAL_SAR_WEIGHT = 1.5
TBE_FRACTION = 0.30
