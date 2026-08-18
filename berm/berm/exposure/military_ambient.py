"""Pre-telecom ambient EMF: military radar systems + TV/FM broadcast.

Military radar (1950-1990s): DEW Line, BMEWS, Nike, PAVE PAWS, Duga.
Broadcast (1950+): TV/FM transmitters, logistic growth saturating ~1975.

These layers ADD to the telecom ambient (2G+). They do NOT replace it.
total_ambient = telecom + military + broadcast

CAVEAT: Military ambient values are ESTIMATES based on radar power
calculations and distance estimates, not field measurements.
"""

from __future__ import annotations

import math


NATO_COUNTRIES = [
    "USA", "Canada", "UK", "Germany", "France", "Italy",
    "Norway", "Denmark", "Netherlands", "Belgium", "Turkey",
    "Greece", "Spain", "Portugal",
]

WARSAW_PACT = ["Poland", "Romania", "Czechoslovakia", "Hungary"]

BROADCAST_BASE = {
    "USA": 0.3, "UK": 0.25, "Germany": 0.25, "France": 0.2,
    "Japan": 0.25, "Finland": 0.15, "SouthKorea": 0.15,
    "India": 0.05, "Niger": 0.01, "China": 0.1,
}

# V/m peak military ambient by country group
_MILITARY_BASE: dict[str, float] = {
    "SouthKorea": 0.5,
    "Israel": 0.6,
    "Japan": 0.3,
    "Finland": 0.15,
}


def _mil_curve(year: int) -> float:
    """Normalized military EMF temporal curve (0-1).

    Ramp 1950-1965, plateau 1965-1985, decline 1985-2000, residual 0.3.
    """
    if year < 1950:
        return 0.0
    if year < 1965:
        return (year - 1950) / 15.0
    if year < 1985:
        return 1.0
    if year < 2000:
        return 1.0 - 0.7 * (year - 1985) / 15.0
    return 0.3


def _broadcast_curve(year: int) -> float:
    """Logistic broadcast growth, onset 1950, saturation ~1975."""
    if year < 1950:
        return 0.0
    t = year - 1950
    return 1.0 / (1.0 + math.exp(-0.15 * (t - 15)))


def military_base_level(country: str) -> float:
    """Peak military ambient V/m for a country."""
    if country in _MILITARY_BASE:
        return _MILITARY_BASE[country]
    if country in NATO_COUNTRIES:
        return 0.3
    if country in WARSAW_PACT:
        return 0.4
    return 0.05


def military_ambient(country: str, year: int) -> float:
    """Military radar ambient EMF contribution (V/m)."""
    return military_base_level(country) * _mil_curve(year)


def broadcast_ambient(country: str, year: int) -> float:
    """TV/FM broadcast ambient EMF contribution (V/m)."""
    base = BROADCAST_BASE.get(country, 0.1)
    return base * _broadcast_curve(year)


def total_pre_telecom(country: str, year: int) -> float:
    """Combined pre-telecom ambient: military + broadcast."""
    return military_ambient(country, year) + broadcast_ambient(country, year)
