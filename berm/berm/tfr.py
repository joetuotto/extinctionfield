"""TFR prediction pipeline: Phase 4.2.

Ties together the full BERM pipeline:
  ambient EMF -> personal EMF -> two-channel exposure (Lindgren chi on VGIC only)
  -> sperm cascade -> CRY circadian -> bio capacity -> behavioral coupling
  -> alpha-compensated TFR prediction.
"""

import numpy as np

from berm.config import ALPHA_EFF
from berm.exposure.ambient import effective_emf_field
from berm.exposure.personal import personal_emf_exposure
from berm.exposure.lindgren import two_channel_exposure
from berm.biology.sperm_cascade import (
    compute_sperm_state,
    SpermState,
    BASELINE_CONC,
    BASELINE_MOT,
)
from berm.biology.cry import cry_effect

# Behavioral coupling: EMF-induced behavioral fertility reduction
# (screen time, relationship quality, libido — not biological)
BEHAV_GAMMA = 0.08


def _behavioral_factor(total_exposure: float) -> float:
    """EMF-behavioral coupling: screen time, relationship effects.

    Saturating reduction in fertility-relevant behavior from
    device-mediated lifestyle changes. Not a biological pathway.
    """
    return float(np.clip(1.0 - BEHAV_GAMMA * total_exposure, 0.5, 1.0))


def _night_fraction(year: int) -> float:
    """Fraction of population sleeping near phone. Trend model."""
    return float(np.clip(0.35 + 0.01 * (year - 2015), 0.0, 1.0))


def _cumulative_emf(total_exposure: float, year: int, calibration_year: int) -> float:
    """Approximate cumulative EMF-years from current exposure level.

    Simple ramp model: exposure grew linearly from ~0 in 2000 to current.
    """
    exposure_years = max(0, year - 2000)
    # Trapezoidal integration: exposure ramped from 0 to current over the period
    return total_exposure * exposure_years * 0.5


def predict_tfr(
    country: str,
    year: int,
    mobile_penetration: float,
    pop_density: float,
    base_tfr: float,
    cultural_ratio: float = 1.0,
    calibration_year: int = 2024,
) -> dict:
    """Predict TFR for a country-year using the full BERM pipeline.

    Parameters
    ----------
    country : str
        Country name (for labeling; does not affect calculation).
    year : int
        Prediction year.
    mobile_penetration : float
        Mobile subscriptions per capita, 0-1 range.
    pop_density : float
        Population density in people/km^2.
    base_tfr : float
        Observed TFR at calibration_year.
    cultural_ratio : float
        Cultural fertility preference ratio (default 1.0).
    calibration_year : int
        Year of base_tfr observation (default 2024).

    Returns
    -------
    dict with:
        tfr_predicted, bio_capacity, emf_behavioral, cultural,
        exposure_total, sperm_state
    """
    # Step 1: Ambient EMF from infrastructure
    urban_frac = 0.70  # default when no country params available
    ambient = effective_emf_field(mobile_penetration, pop_density, urban_frac)

    # Step 2: Personal EMF from device proximity
    personal = personal_emf_exposure(country, mobile_penetration, year)

    # Step 3: Two-channel total (chi applies to VGIC channel only)
    total_exposure = float(two_channel_exposure(ambient, personal))

    # Step 4: Sperm cascade from total exposure
    cum_emf = _cumulative_emf(total_exposure, year, calibration_year)
    sperm_state = compute_sperm_state(
        emf_instant=total_exposure,
        cum_emf=cum_emf,
    )

    # Step 5: CRY circadian disruption (no chi — RPM mechanism)
    nf = _night_fraction(year)
    cry = cry_effect(ambient, personal, nf)

    # Step 6: Bio capacity — normalized concentration * motility * CRY
    bio_capacity = (
        (sperm_state.concentration / BASELINE_CONC)
        * (sperm_state.motility_index / BASELINE_MOT)
        * cry
    )

    # Step 7: Behavioral coupling factor
    behav = _behavioral_factor(total_exposure)

    # Step 8: Alpha-compensated prediction
    # Compute calibration-year bio-behavioral product for compensation
    ambient_cal = effective_emf_field(mobile_penetration, pop_density, urban_frac)
    personal_cal = personal_emf_exposure(country, mobile_penetration, calibration_year)
    total_cal = float(two_channel_exposure(ambient_cal, personal_cal))
    cum_cal = _cumulative_emf(total_cal, calibration_year, calibration_year)

    sperm_cal = compute_sperm_state(emf_instant=total_cal, cum_emf=cum_cal)
    nf_cal = _night_fraction(calibration_year)
    cry_cal = cry_effect(ambient_cal, personal_cal, nf_cal)

    bio_cap_cal = (
        (sperm_cal.concentration / BASELINE_CONC)
        * (sperm_cal.motility_index / BASELINE_MOT)
        * cry_cal
    )
    behav_cal = _behavioral_factor(total_cal)
    biobehav_cal = bio_cap_cal * behav_cal

    # TFR_eff = (bioCap * behav)^(1-alpha) * base_tfr * cultural * bioBehav_cal^alpha
    biobehav = bio_capacity * behav
    alpha = ALPHA_EFF

    if biobehav_cal > 0 and biobehav > 0:
        tfr_predicted = (
            (biobehav ** (1 - alpha))
            * base_tfr
            * cultural_ratio
            * (biobehav_cal ** alpha)
        )
    else:
        # Edge case: no exposure at calibration
        tfr_predicted = base_tfr * cultural_ratio * biobehav

    return {
        "country": country,
        "year": year,
        "tfr_predicted": float(tfr_predicted),
        "bio_capacity": float(bio_capacity),
        "emf_behavioral": float(behav),
        "cultural": float(cultural_ratio),
        "exposure_total": float(total_exposure),
        "sperm_state": sperm_state,
    }
