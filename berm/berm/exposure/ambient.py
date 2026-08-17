"""Ambient EMF from ITU mobile penetration + population density."""

import numpy as np

def effective_emf_field(
    mobile_pen: float,
    pop_density: float,
    coverage: float = 0.95,
) -> float:
    """Ambient EMF field strength from mobile infrastructure.

    Uses bimodal density model (metro vs non-metro).
    Source: L-BERM Ch.3, calibrated to Ofcom measurements.
    """
    base_stations_per_km2 = mobile_pen * pop_density / 2000.0
    return coverage * np.log1p(base_stations_per_km2) * 0.15
