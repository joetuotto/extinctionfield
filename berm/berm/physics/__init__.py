"""BERM physics layer: GME multiwave theory and RF envelope analysis."""

from berm.physics.gme_mixing import (
    gme_background_response,
    gme_nonlinear_coefficient,
    gme_envelope_selfmixing,
)
from berm.physics.r42_envelope import (
    r42_window,
    xi_r42_pulse_train,
    xi_r42_from_protocol,
    r43_locked_conditions,
)
from berm.physics.threegpp_convergence import (
    edrx_r42_analysis,
    convergence_significance,
    EDRX_CYCLES_SECONDS,
    PTW_VALUES_SECONDS,
    DRX_CYCLES_SECONDS,
)

__all__ = [
    "gme_background_response",
    "gme_nonlinear_coefficient",
    "gme_envelope_selfmixing",
    "r42_window",
    "xi_r42_pulse_train",
    "xi_r42_from_protocol",
    "r43_locked_conditions",
    "edrx_r42_analysis",
    "convergence_significance",
    "EDRX_CYCLES_SECONDS",
    "PTW_VALUES_SECONDS",
    "DRX_CYCLES_SECONDS",
]
