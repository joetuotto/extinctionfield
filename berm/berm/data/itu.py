"""D1: ITU/World Bank mobile penetration data.

Source: World Bank Open Data (CC BY-4.0)
Indicator: IT.CEL.SETS.P2 (mobile cellular subscriptions per 100)
Replaces: $TechDiffusion step functions entirely.
"""

import json
from pathlib import Path
from typing import Any

import pandas as pd
import requests

CACHE_DIR = Path(__file__).parent / "cache"

BERM_COUNTRIES = {
    "KR": "SouthKorea", "JP": "Japan", "FI": "Finland", "SE": "Sweden",
    "NO": "Norway", "DK": "Denmark", "DE": "Germany", "FR": "France",
    "ES": "Spain", "IT": "Italy", "US": "USA", "CA": "Canada",
    "AU": "Australia", "RU": "Russia", "IR": "Iran", "IN": "India",
    "BD": "Bangladesh", "NG": "Nigeria", "CU": "Cuba", "MM": "Myanmar",
    "CN": "China", "BR": "Brazil", "MX": "Mexico", "ET": "Ethiopia",
    "NE": "Niger",
}

INDICATORS = {
    "mobile_per100": "IT.CEL.SETS.P2",
    "internet_pct": "IT.NET.USER.ZS",
    "broadband_per100": "IT.NET.BBND.P2",
}

def download_worldbank(indicator_code: str, countries: str = "all") -> pd.DataFrame:
    """Download from World Bank JSON API."""
    url = (
        f"https://api.worldbank.org/v2/country/{countries}"
        f"/indicator/{indicator_code}"
        f"?format=json&per_page=20000&date=1960:2025"
    )
    pages: list[dict[str, Any]] = []
    page = 1
    while True:
        resp = requests.get(url + f"&page={page}", timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if len(data) < 2 or not data[1]:
            break
        pages.extend(data[1])
        if page >= data[0]["pages"]:
            break
        page += 1

    records = [
        {
            "country_code": r["country"]["id"],
            "country": r["country"]["value"],
            "year": int(r["date"]),
            "value": r["value"],
        }
        for r in pages
        if r["value"] is not None
    ]
    return pd.DataFrame(records)

def get_mobile_per100(use_cache: bool = True) -> pd.DataFrame:
    """Mobile-cellular subscriptions per 100 inhabitants."""
    cache = CACHE_DIR / "itu_mobile_per100.parquet"
    if use_cache and cache.exists():
        return pd.read_parquet(cache)
    codes = ";".join(BERM_COUNTRIES.keys())
    df = download_worldbank(INDICATORS["mobile_per100"], codes)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    df.to_parquet(cache)
    return df
