"""BERM: BioElectromagnetic Resonance Model v17."""
__version__ = "0.17.0"

from berm.model import predict_country_year
from berm.tfr import predict_tfr
from berm.hindcast import hindcast_v17
from berm.v16 import (
    v16_predicted_tfr,
    v16_country_tfr,
    calibrate_v16,
    loocv_v16,
    v17_full_report,
)
from berm.biology.mtor_aging import (
    mtor_effective,
    aging_rate_multiplier,
    senescence_accumulation,
    metformin_longevity_benefit,
    mtor_fertility_aging_interaction,
    intervention_comparison,
)

__all__ = [
    "predict_country_year",
    "predict_tfr",
    "hindcast_v17",
    "v16_predicted_tfr",
    "v16_country_tfr",
    "calibrate_v16",
    "loocv_v16",
    "v17_full_report",
    "mtor_effective",
    "aging_rate_multiplier",
    "senescence_accumulation",
    "metformin_longevity_benefit",
    "mtor_fertility_aging_interaction",
    "intervention_comparison",
]
