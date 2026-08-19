"""External-data exposure layer for the historical BERM model.

This module deliberately does *not* call the model's technology-diffusion
functions.  It reads the processed World Bank series directly and records
whether each value was observed, linearly interpolated, or unavailable.

The exposed conversion is intentionally small and explicit:

``ambient = 0.5 * urban_pct / 100 + military + broadcast``
``personal = P_MAX * mobile / (mobile + K_M)``
``total = ambient + chi(ambient) * personal``

Broadband is returned as a source variable and its availability is tracked,
but it is not folded into the dose.  The Phase-1 specification permits only
the two-parameter mobile-to-personal Michaelis--Menten conversion; adding an
unvalidated broadband conversion here would make the exposure model
endogenous again.
"""

from __future__ import annotations

import csv
import math
from bisect import bisect_left
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any, Literal

from berm.exposure.lindgren import chi
from berm.exposure.military_ambient import broadcast_ambient, military_ambient


# Fixed, documented Phase-1 conversion parameters.  They are constants, not
# fitted country/year effects.
P_MAX = 3.0
K_M = 50.0

_DEFAULT_PROCESSED_DIR = Path(__file__).resolve().parents[2] / "data" / "processed"

# Keep the country bridge local and dependency-free.  ``berm.data.loader``
# carries the same bridge, but importing it would make this stdlib CSV reader
# depend on pandas.  The input also accepts ISO-3 codes directly.
_ISO3_TO_BERM: dict[str, str] = {
    "FIN": "Finland", "KOR": "SouthKorea", "JPN": "Japan",
    "USA": "USA", "DEU": "Germany", "FRA": "France",
    "GBR": "UK", "ITA": "Italy", "ESP": "Spain",
    "CHN": "China", "IND": "India", "BRA": "Brazil",
    "NGA": "Nigeria", "NER": "Niger", "IRN": "Iran",
    "ISR": "Israel", "AUS": "Australia", "CAN": "Canada",
    "MEX": "Mexico", "SWE": "Sweden", "NOR": "Norway",
    "DNK": "Denmark", "RUS": "Russia", "CUB": "Cuba",
    "MMR": "Myanmar", "BGD": "Bangladesh", "ETH": "Ethiopia",
    "TUR": "Turkey", "EGY": "Egypt", "IDN": "Indonesia",
    "THA": "Thailand", "VNM": "Vietnam", "POL": "Poland",
    "ROU": "Romania", "UKR": "Ukraine", "KAZ": "Kazakhstan",
    "UZB": "Uzbekistan", "KHM": "Cambodia", "MYS": "Malaysia",
    "DZA": "Algeria", "MAR": "Morocco", "GHA": "Ghana",
    "KEN": "Kenya", "MOZ": "Mozambique", "NPL": "Nepal",
    "LKA": "SriLanka", "COL": "Colombia", "PER": "Peru",
    "CHL": "Chile", "ARG": "Argentina", "TZA": "Tanzania",
    "COD": "DRCongo", "ZAF": "SouthAfrica", "SAU": "SaudiArabia",
    "ARE": "UAE", "SGP": "Singapore", "PHL": "Philippines",
}
_BERM_TO_ISO3 = {name: iso3 for iso3, name in _ISO3_TO_BERM.items()}


def _normalise_country(value: str) -> str:
    return "".join(char for char in value.casefold() if char.isalnum())


_COUNTRY_ALIASES: dict[str, str] = {
    _normalise_country(name): iso3 for name, iso3 in _BERM_TO_ISO3.items()
}
_COUNTRY_ALIASES.update({
    "southkorea": "KOR",
    "republicofkorea": "KOR",
    "korearepublic": "KOR",
    "unitedstates": "USA",
    "unitedstatesofamerica": "USA",
    "unitedkingdom": "GBR",
    "greatbritain": "GBR",
    "russia": "RUS",
    "russianfederation": "RUS",
    "iranislamicrepublicof": "IRN",
    "vietnam": "VNM",
    "czechrepublic": "CZE",
    "democraticrepublicofthecongo": "COD",
    "drcongo": "COD",
    "unitedarabemirates": "ARE",
    "saudiarabia": "SAU",
    "srilanka": "LKA",
})


IndicatorStatus = Literal[
    "observed",
    "interpolated",
    "unavailable_country",
    "unavailable_outside_range",
    "unavailable_source",
]


@dataclass(frozen=True)
class _IndicatorResult:
    """One external indicator value plus its provenance state."""

    value: float | None
    status: IndicatorStatus
    lower_year: int | None = None
    upper_year: int | None = None

    def as_dict(self) -> dict[str, float | int | str | None]:
        return {
            "value": self.value,
            "status": self.status,
            "lower_year": self.lower_year,
            "upper_year": self.upper_year,
        }


@dataclass(frozen=True)
class _IndicatorDataset:
    """Cached CSV contents for one indicator without external dependencies."""

    series: dict[str, tuple[tuple[int, float], ...]]
    source_exists: bool


def _processed_dir(data_dir: str | Path | None) -> Path:
    return _DEFAULT_PROCESSED_DIR if data_dir is None else Path(data_dir)


def _coerce_year(year: int) -> int:
    """Validate that yearly input is an integer without silently rounding."""
    if isinstance(year, bool):
        raise ValueError("year must be an integer, not a boolean")
    try:
        coerced = int(year)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"year must be an integer, got {year!r}") from exc
    if coerced != year:
        raise ValueError(f"year must be an integer, got {year!r}")
    return coerced


def _resolve_country(country: str) -> tuple[str | None, str | None]:
    """Return ``(ISO3, BERM country name)`` when the country is identifiable."""
    if not isinstance(country, str) or not country.strip():
        return None, None

    candidate = country.strip().upper()
    if len(candidate) == 3 and candidate.isalpha():
        return candidate, _ISO3_TO_BERM.get(candidate)

    iso3 = _COUNTRY_ALIASES.get(_normalise_country(country))
    if iso3 is None:
        return None, None
    return iso3, _ISO3_TO_BERM.get(iso3)


@lru_cache(maxsize=32)
def _load_indicator(
    processed_dir: str,
    filename: str,
    value_column: str,
) -> _IndicatorDataset:
    """Read one processed World Bank CSV, ignoring malformed observations."""
    path = Path(processed_dir) / filename
    if not path.is_file():
        return _IndicatorDataset(series={}, source_exists=False)

    values: dict[str, dict[int, float]] = {}
    try:
        with path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            for row in reader:
                iso3 = (row.get("country_iso3") or "").strip().upper()
                try:
                    observed_year = int(row.get("year", ""))
                    value = float(row.get(value_column, ""))
                except (TypeError, ValueError):
                    continue
                if len(iso3) != 3 or not iso3.isalpha() or not math.isfinite(value):
                    continue
                values.setdefault(iso3, {})[observed_year] = value
    except OSError:
        return _IndicatorDataset(series={}, source_exists=False)

    # Sorting here gives deterministic interpolation even if a CSV is not
    # already ordered by country/year.
    series = {
        iso3: tuple(sorted(observations.items()))
        for iso3, observations in values.items()
    }
    return _IndicatorDataset(series=series, source_exists=True)


def _interpolate(
    observations: tuple[tuple[int, float], ...],
    year: int,
) -> _IndicatorResult:
    """Use an exact value or interpolation strictly inside observed bounds."""
    if not observations:
        return _IndicatorResult(None, "unavailable_country")

    years = [observation[0] for observation in observations]
    index = bisect_left(years, year)
    if index < len(observations) and observations[index][0] == year:
        value = observations[index][1]
        return _IndicatorResult(value, "observed", year, year)
    if index == 0 or index == len(observations):
        return _IndicatorResult(None, "unavailable_outside_range")

    lower_year, lower_value = observations[index - 1]
    upper_year, upper_value = observations[index]
    fraction = (year - lower_year) / (upper_year - lower_year)
    value = lower_value + fraction * (upper_value - lower_value)
    return _IndicatorResult(value, "interpolated", lower_year, upper_year)


def _indicator_value(
    iso3: str | None,
    year: int,
    *,
    filename: str,
    value_column: str,
    processed_dir: Path,
) -> _IndicatorResult:
    dataset = _load_indicator(str(processed_dir), filename, value_column)
    if not dataset.source_exists:
        return _IndicatorResult(None, "unavailable_source")
    if iso3 is None:
        return _IndicatorResult(None, "unavailable_country")
    return _interpolate(dataset.series.get(iso3, ()), year)


def clear_external_exposure_cache() -> None:
    """Clear CSV cache; useful after replacing processed input files in a run."""
    _load_indicator.cache_clear()


def mobile_to_personal_emf(
    mobile_per_100: float,
    broadband_per_100: float | None = None,
    *,
    p_max: float = P_MAX,
    k_m: float = K_M,
) -> float:
    """Convert mobile subscriptions per 100 people to personal EMF (V/m).

    ``broadband_per_100`` is accepted for the source-layer API but is not a
    parameter of the specified Michaelis--Menten conversion.  Its value is
    intentionally not used until a separate, pre-specified conversion can be
    validated.
    """
    del broadband_per_100  # Documented no-op; avoids accidental use below.
    if not math.isfinite(mobile_per_100):
        raise ValueError("mobile_per_100 must be finite")
    if not math.isfinite(p_max) or not math.isfinite(k_m) or p_max < 0 or k_m <= 0:
        raise ValueError("p_max must be >= 0 and k_m must be > 0")
    mobile = max(0.0, float(mobile_per_100))
    return p_max * mobile / (mobile + k_m)


def exposure_from_data(
    country: str,
    year: int,
    *,
    data_dir: str | Path | None = None,
) -> dict[str, Any]:
    """Return a provenance-rich, externally derived annual exposure estimate.

    ``data_dir`` is primarily a testing/import hook and must point at the
    directory containing the three processed CSV files.  In normal use it is
    omitted and resolves to ``berm/data/processed``.

    No extrapolation is performed.  If the mobile or urban source is outside
    its observed range, ``total`` is ``None`` rather than a model-generated
    value.  Broadband is loaded and surfaced as external provenance but does
    not enter the Phase-1 dose equation.
    """
    resolved_year = _coerce_year(year)
    processed_dir = _processed_dir(data_dir)
    iso3, berm_country = _resolve_country(country)

    mobile = _indicator_value(
        iso3, resolved_year,
        filename="mobile_by_country_year.csv",
        value_column="subs_per_100",
        processed_dir=processed_dir,
    )
    broadband = _indicator_value(
        iso3, resolved_year,
        filename="broadband_by_country_year.csv",
        value_column="broadband_per_100",
        processed_dir=processed_dir,
    )
    urban = _indicator_value(
        iso3, resolved_year,
        filename="urban_by_country_year.csv",
        value_column="urban_pct",
        processed_dir=processed_dir,
    )

    # The existing layers remain separate and visible.  We only attach them
    # when a country can be matched to BERM's country naming scheme; unknown
    # identifiers do not receive an invented generic military/broadcast dose.
    if berm_country is None:
        military: float | None = None
        broadcast: float | None = None
    else:
        military = military_ambient(berm_country, resolved_year)
        broadcast = broadcast_ambient(berm_country, resolved_year)

    urban_ambient = (
        None if urban.value is None else 0.5 * max(0.0, urban.value) / 100.0
    )
    ambient = (
        None
        if urban_ambient is None
        else urban_ambient + (military or 0.0) + (broadcast or 0.0)
    )
    personal = (
        None
        if mobile.value is None
        else mobile_to_personal_emf(mobile.value, broadband.value)
    )
    chi_value = None if ambient is None else float(chi(ambient))
    total = (
        None
        if ambient is None or personal is None or chi_value is None
        else ambient + chi_value * personal
    )

    missing_required = [
        name for name, result in (("mobile", mobile), ("urban", urban))
        if result.value is None
    ]
    return {
        "country": country,
        "country_iso3": iso3,
        "berm_country": berm_country,
        "year": resolved_year,
        "total": total,
        "ambient": ambient,
        "personal": personal,
        "chi": chi_value,
        "urban_ambient": urban_ambient,
        "military_ambient": military,
        "broadcast_ambient": broadcast,
        "mobile_per_100": mobile.value,
        "broadband_per_100": broadband.value,
        "urban_pct": urban.value,
        "available": total is not None,
        "missing_required_inputs": tuple(missing_required),
        "input_status": {
            "mobile": mobile.as_dict(),
            "broadband": broadband.as_dict(),
            "urban": urban.as_dict(),
        },
        "metadata": {
            "source": "World Bank processed CSV inputs",
            "processed_data_dir": str(processed_dir),
            "interpolation": "linear between observed years only; no extrapolation",
            "ambient_formula": "0.5 * urban_pct / 100 + military + broadcast",
            "personal_formula": "P_MAX * mobile_per_100 / (mobile_per_100 + K_M)",
            "p_max": P_MAX,
            "k_m": K_M,
            "selection_rule": "ambient + chi(ambient) * personal",
            "broadband_role": "reported as an external input; not used in Phase-1 dose conversion",
            "pretelecom_layers_identified": berm_country is not None,
        },
    }

