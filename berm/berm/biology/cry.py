"""CRY cryptochrome pathway: RPM -> clock gene disruption.

chi removed from CRY channel per v17 audit (CRY uses radical pair
mechanism, not VGIC — no Lindgren chi coupling).
"""

import numpy as np

GAMMA_CRY = 0.02

def cry_effect(ambient: float, personal: float, night_fraction: float) -> float:
    """CRY-mediated circadian disruption.

    Uses pers * nf directly (no chi). RPM sensitivity peaks at
    geomagnetic field strength (~50 uT), not ambient RF.
    Epistemic level: [M|C]
    """
    exposure = personal * night_fraction
    return float(np.clip(1 - GAMMA_CRY * exposure, 0.95, 1.0))
