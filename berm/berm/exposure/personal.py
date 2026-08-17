"""Personal EMF exposure from device proximity."""

import numpy as np

CONTACT_HOURS_SLOPE = 0.15
CONTACT_HOURS_2024 = 4.5

def personal_contact_hours(year: int) -> float:
    """Daily hours of phone body contact. Source: eMarketer/Statista."""
    return min(6.0, max(0.0, CONTACT_HOURS_2024 + CONTACT_HOURS_SLOPE * (year - 2024)))

def personal_emf_exposure(mobile_pen: float, year: int) -> float:
    """Personal EMF exposure from phone + wearable proximity."""
    contact_hrs = personal_contact_hours(year)
    night_prev = min(1.0, max(0.0, 0.35 + 0.01 * (year - 2015)))
    wearable_pen = min(1.0, max(0.0, mobile_pen * 0.5 * max(0, (year - 2014)) / 10.0))
    phone_frac = contact_hrs / 24.0
    night_frac = night_prev * (8.0 / 24.0)
    wear_frac = wearable_pen * 0.3
    personal = mobile_pen * (0.55 * phone_frac + 0.30 * night_frac + 0.15 * wear_frac)
    return float(np.clip(personal, 0, 1.5))
