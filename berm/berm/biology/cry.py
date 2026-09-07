"""Archived v17 CRY-labelled timing factor, retained for numeric comparison.

Omitting chi is this legacy adapter's choice, not a consequence of RPM or
the Lindgren geometry. The 2025 geometry-to-observable L2 operator remains
open. Current subtype/light-history candidates live in berm.modulome.
"""

import numpy as np

GAMMA_CRY = 0.02

def cry_effect(ambient: float, personal: float, night_fraction: float) -> float:
    """CRY-mediated circadian disruption.

    Uses personal * night_fraction with the locked coefficient. This function
    has no B0, optical-history, subtype or RF-waveform response model; ambient
    is an unused compatibility argument. Epistemic status: legacy scenario.
    """
    exposure = personal * night_fraction
    return float(np.clip(1 - GAMMA_CRY * exposure, 0.95, 1.0))
