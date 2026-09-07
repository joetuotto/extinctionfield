"""L1 Maxwell/SAR/Schwan structures with L3 parameters kept explicit.

The equations in this module preserve component-wise epistemic provenance:
the Maxwell and spherical-boundary solution structures are L1 in the supplied
Lindgren-DKC derivation.  Tissue dielectric/material values used by SAR and the
numerical membrane time constant used by Schwan are L3.  The supplied field,
frequency and radius are declared physical arguments, not grounds for
reclassifying either equation.  Supplying an L3 value never relabels the L1
structure.
"""

from __future__ import annotations

import math
from numbers import Real


def _finite(name: str, value: Real) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise ValueError(f"{name} must be a real number")
    resolved = float(value)
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be finite")
    return resolved


def _nonnegative(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def _positive(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved <= 0.0:
        raise ValueError(f"{name} must be positive")
    return resolved


def specific_absorption_rate(
    conductivity_s_per_m: Real,
    internal_electric_field_v_per_m: Real,
    density_kg_per_m3: Real,
) -> float:
    """L1 structure: ``SAR=sigma*|E_internal|^2/rho``.

    The tissue/material parameters ``sigma`` and ``rho`` are explicit L3
    inputs.  ``E_internal`` is the supplied Maxwell boundary-value solution or
    measurement.  The returned SI unit is W/kg when inputs use the stated SI
    units.
    """

    conductivity = _nonnegative("conductivity_s_per_m", conductivity_s_per_m)
    field = _finite(
        "internal_electric_field_v_per_m",
        internal_electric_field_v_per_m,
    )
    density = _positive("density_kg_per_m3", density_kg_per_m3)
    return conductivity * field * field / density


def schwan_low_pass(frequency_hz: Real, membrane_tau_s: Real) -> float:
    """L1: Schwan-suodin, Maxwellin ratkaisusta; ``tau_m`` is L3."""

    frequency = _nonnegative("frequency_hz", frequency_hz)
    tau = _positive("membrane_tau_s", membrane_tau_s)
    return 1.0 / math.sqrt(1.0 + (2.0 * math.pi * frequency * tau) ** 2)


def schwan_membrane_voltage(
    cell_radius_m: Real,
    local_electric_field_v_per_m: Real,
    frequency_hz: Real,
    membrane_tau_s: Real,
) -> float:
    """L1: ``DeltaV=1.5*r*E*g(f)``; only numeric ``tau_m`` is L3."""

    radius = _positive("cell_radius_m", cell_radius_m)
    field = _finite(
        "local_electric_field_v_per_m",
        local_electric_field_v_per_m,
    )
    return 1.5 * radius * field * schwan_low_pass(frequency_hz, membrane_tau_s)


__all__ = [
    "schwan_low_pass",
    "schwan_membrane_voltage",
    "specific_absorption_rate",
]
