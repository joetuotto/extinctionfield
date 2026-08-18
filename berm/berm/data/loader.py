"""Load observed TFR and mobile data from the World Bank pipeline.

Manual overrides (from countries.py) take precedence for the original
25 calibrated countries. New countries use World Bank data directly.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from berm.data.countries import V12_ACTUAL_TFR_2024, HISTORICAL_TFR

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
PROC_DIR = DATA_DIR / "processed"

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

_BERM_TO_ISO3: dict[str, str] = {v: k for k, v in _ISO3_TO_BERM.items()}

_tfr_cache: pd.DataFrame | None = None
_mobile_cache: pd.DataFrame | None = None


def _load_tfr_csv() -> pd.DataFrame:
    global _tfr_cache
    if _tfr_cache is not None:
        return _tfr_cache
    path = PROC_DIR / "tfr_by_country_year.csv"
    if not path.exists():
        raise FileNotFoundError(
            f"TFR data not found at {path}. Run berm/data/parse_all.py first."
        )
    _tfr_cache = pd.read_csv(path)
    return _tfr_cache


def _load_mobile_csv() -> pd.DataFrame:
    global _mobile_cache
    if _mobile_cache is not None:
        return _mobile_cache
    path = PROC_DIR / "mobile_by_country_year.csv"
    if not path.exists():
        raise FileNotFoundError(
            f"Mobile data not found at {path}. Run berm/data/parse_all.py first."
        )
    _mobile_cache = pd.read_csv(path)
    return _mobile_cache


def load_observed_tfr_2024() -> dict[str, float]:
    """Load observed TFR for 2024, with manual overrides for original countries.

    Returns dict mapping BERM country name → TFR 2024.
    Original 25 countries use V12_ACTUAL_TFR_2024 (manually verified).
    New countries use the latest available World Bank value.
    """
    result = dict(V12_ACTUAL_TFR_2024)

    try:
        df = _load_tfr_csv()
    except FileNotFoundError:
        return result

    for iso3, berm_name in _ISO3_TO_BERM.items():
        if berm_name in result:
            continue
        country = df[df["country_iso3"] == iso3]
        if len(country) == 0:
            continue
        latest = country.sort_values("year").iloc[-1]
        result[berm_name] = round(float(latest["tfr"]), 3)

    return result


def load_historical_tfr(country: str) -> list[tuple[int, float]]:
    """Load historical TFR time series for a country.

    Returns list of (year, tfr) tuples, using manual data where available
    and filling from World Bank otherwise.
    """
    if country in HISTORICAL_TFR:
        return list(HISTORICAL_TFR[country])

    iso3 = _BERM_TO_ISO3.get(country)
    if not iso3:
        return []

    try:
        df = _load_tfr_csv()
    except FileNotFoundError:
        return []

    rows = df[df["country_iso3"] == iso3].sort_values("year")
    return [(int(r["year"]), round(float(r["tfr"]), 3)) for _, r in rows.iterrows()]


def load_mobile_timeseries(country: str) -> dict[int, float]:
    """Load mobile subscriptions per 100 for a country across all years.

    Returns dict mapping year → subs_per_100.
    """
    iso3 = _BERM_TO_ISO3.get(country)
    if not iso3:
        return {}

    try:
        df = _load_mobile_csv()
    except FileNotFoundError:
        return {}

    rows = df[df["country_iso3"] == iso3].sort_values("year")
    return {int(r["year"]): round(float(r["subs_per_100"]), 1) for _, r in rows.iterrows()}


def get_all_berm_countries() -> list[str]:
    """Return list of all BERM country names (original + expansion)."""
    return list(_ISO3_TO_BERM.values())


def get_original_countries() -> list[str]:
    """Return list of original 25 calibrated countries."""
    return list(V12_ACTUAL_TFR_2024.keys())


def get_expansion_countries() -> list[str]:
    """Return new countries not in the original calibration set."""
    original = set(V12_ACTUAL_TFR_2024.keys())
    return [c for c in _ISO3_TO_BERM.values() if c not in original]
