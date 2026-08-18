"""Ambient EMF from mobile infrastructure + population density.

Bimodal density model: metro vs non-metro areas calculated separately,
then population-weighted. Includes country attenuation (power outages,
mountains, sanctions).

Source: L-BERM Wolfram reference, calibrated to Ofcom/BNetzA measurements.
"""

from __future__ import annotations

import math

from berm.data.countries import (
    ATTENUATION_PARAMS,
    COUNTRY_PARAMS,
    AttenuationParams,
    CountryParams,
    get_attenuation_params,
    get_country_params,
)


def effective_emf_field(
    mobile_pen: float,
    pop_density: float,
    urban_frac: float,
) -> float:
    """Raw ambient EMF field from mobile infrastructure.

    Saturating function of device/tower density with urban multiplier.
    Output range [0, 2.0] via tanh saturation.
    """
    device_density = mobile_pen * pop_density * 3.5
    tower_density = (
        pop_density * urban_frac / 2000
        + pop_density * (1 - urban_frac) / 5000
    )
    urban_mult = 1 + 4 * urban_frac
    raw_field = (
        0.01
        * (device_density / 100) ** 1.3
        * urban_mult
        * (1 + tower_density / 10)
    )
    return 2.0 * math.tanh(raw_field / 2.0)


def country_attenuation_factor(params: AttenuationParams) -> float:
    """Country-level EMF attenuation from infrastructure limitations.

    Power outages reduce time-on. Mountains attenuate non-urban signal.
    Sanctions/tech embargo reduces equipment quality.
    """
    time_on = (24.0 - params.outage_hours) / 24.0
    effective_mountain = (1 - params.urban_frac) * params.mountain_frac
    mountain_atten = 1 - effective_mountain * 0.7
    return time_on * mountain_atten * params.sanctions_tech


def get_attenuation_factor(country: str) -> float:
    params = get_attenuation_params(country)
    return country_attenuation_factor(params)


def bimodal_effective_emf(
    country: str,
    mobile_pen: float,
) -> dict[str, float]:
    """Bimodal EMF: separate metro and rural calculations.

    Metro areas (high density, 0.95 urban) vs rural (low density, 0.1 urban).
    Population-weighted average for national effective EMF.
    """
    cp = get_country_params(country)
    attenuation = get_attenuation_factor(country)
    attenuated_pen = mobile_pen * attenuation

    rural_dens = max(1.0, cp.pop_density * 0.15 / max(0.01, 1 - cp.urban_frac))

    urban_emf = effective_emf_field(attenuated_pen, cp.metro_density, 0.95)
    rural_emf = effective_emf_field(attenuated_pen, rural_dens, 0.1)
    weighted = cp.metro_pop_share * urban_emf + (1 - cp.metro_pop_share) * rural_emf

    return {
        "urban_emf": urban_emf,
        "rural_emf": rural_emf,
        "weighted_emf": weighted,
        "urban_frac": cp.urban_frac,
        "metro_density": cp.metro_density,
        "rural_density": rural_dens,
        "attenuation": attenuation,
    }
