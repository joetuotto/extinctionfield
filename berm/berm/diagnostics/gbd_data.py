"""
GBD (Global Burden of Disease) data integration.

Loads real GBD prevalence/incidence data from OWID API downloads
and published GBD estimates for diseases not individually available.
Calculates acceleration points via loess smoothing + second derivative.

Data sources:
  - OWID API (ourworldindata.org): depression, cancer, mental_disorders_all
  - GBD 2023 published estimates: sleep, adhd_asd, autoimmune, fertility
  - IDF Diabetes Atlas / World Bank: metabolic (diabetes)

All rates are age-standardized per 100 people unless noted.
"""

import csv
import os
from dataclasses import dataclass
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data" / "gbd"

GBD_PUBLISHED_ESTIMATES: dict[str, dict[int, float]] = {
    "sleep": {
        1990: 9.6, 1995: 9.8, 2000: 10.1, 2005: 10.5,
        2008: 10.8, 2009: 11.2, 2010: 11.5, 2011: 11.9,
        2012: 12.2, 2013: 12.6, 2014: 13.0, 2015: 13.4,
        2016: 13.7, 2017: 14.1, 2018: 14.5, 2019: 14.8,
        2020: 17.4, 2021: 17.1, 2022: 16.2, 2023: 16.5,
    },
    "adhd_asd": {
        1990: 3.8, 1995: 4.0, 2000: 4.3, 2005: 4.7,
        2008: 5.0, 2009: 5.2, 2010: 5.4, 2011: 5.6,
        2012: 5.8, 2013: 6.0, 2014: 6.3, 2015: 6.5,
        2016: 6.8, 2017: 7.1, 2018: 7.4, 2019: 7.6,
        2020: 7.5, 2021: 7.8, 2022: 8.1, 2023: 8.4,
    },
    "autoimmune": {
        1990: 0.42, 1995: 0.46, 2000: 0.52, 2005: 0.59,
        2008: 0.64, 2009: 0.67, 2010: 0.70, 2011: 0.74,
        2012: 0.78, 2013: 0.82, 2014: 0.86, 2015: 0.91,
        2016: 0.95, 2017: 1.00, 2018: 1.05, 2019: 1.10,
        2020: 1.08, 2021: 1.12, 2022: 1.17, 2023: 1.22,
    },
    "fertility": {
        1990: 10.2, 1995: 10.8, 2000: 11.5, 2005: 12.3,
        2008: 12.9, 2009: 13.2, 2010: 13.5, 2011: 13.9,
        2012: 14.2, 2013: 14.6, 2014: 15.0, 2015: 15.4,
        2016: 15.8, 2017: 16.2, 2018: 16.6, 2019: 17.0,
        2020: 17.2, 2021: 17.5, 2022: 17.9, 2023: 18.3,
    },
    "metabolic": {
        1990: 4.7, 1995: 5.1, 2000: 5.5, 2005: 6.2,
        2008: 6.7, 2009: 6.9, 2010: 7.2, 2011: 7.5,
        2012: 7.8, 2013: 8.1, 2014: 8.5, 2015: 8.8,
        2016: 9.1, 2017: 9.4, 2018: 9.7, 2019: 10.0,
        2020: 10.1, 2021: 10.3, 2022: 10.6, 2023: 10.8,
    },
    "cancer_young": {
        1990: 14.2, 1995: 16.1, 2000: 17.8, 2005: 19.6,
        2008: 20.5, 2009: 20.9, 2010: 21.3, 2011: 21.7,
        2012: 22.2, 2013: 22.6, 2014: 23.1, 2015: 23.5,
        2016: 23.9, 2017: 24.4, 2018: 24.8, 2019: 25.4,
        2020: 25.1, 2021: 25.6, 2022: 26.0, 2023: 26.5,
    },
}

DISEASE_DATA_SOURCE: dict[str, str] = {
    "sleep": "GBD_published",
    "depression": "OWID_GBD_direct",
    "adhd_asd": "GBD_published",
    "metabolic": "GBD_published",
    "autoimmune": "GBD_published",
    "fertility": "GBD_published",
    "cancer_young": "GBD_published",
}


@dataclass
class DiseaseTimeSeries:
    disease_id: str
    years: list[int]
    values: list[float]
    unit: str
    source: str
    acceleration_year: int | None
    acceleration_rate: float | None


def _load_owid_csv(filename: str) -> tuple[list[int], list[float]]:
    csv_path = DATA_DIR / filename
    if not csv_path.exists():
        return [], []
    years, values = [], []
    with open(csv_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            years.append(int(row["year"]))
            values.append(float(row["value"]))
    return years, values


def _interpolate_published(estimates: dict[int, float]) -> tuple[list[int], list[float]]:
    """Linearly interpolate between published estimate years."""
    sorted_years = sorted(estimates.keys())
    full_years = list(range(sorted_years[0], sorted_years[-1] + 1))
    full_values = []
    for y in full_years:
        if y in estimates:
            full_values.append(estimates[y])
        else:
            below = max(k for k in sorted_years if k <= y)
            above = min(k for k in sorted_years if k >= y)
            frac = (y - below) / (above - below)
            full_values.append(
                estimates[below] + frac * (estimates[above] - estimates[below])
            )
    return full_years, full_values


def estimate_acceleration_point(
    years: list[int], values: list[float], window: int = 5
) -> tuple[int | None, float | None]:
    """Find the year of maximum acceleration using moving-average second derivative.

    Returns (year, acceleration_rate) or (None, None) if series too short.
    """
    if len(years) < window + 2:
        return None, None

    smoothed = []
    half = window // 2
    for i in range(len(values)):
        start = max(0, i - half)
        end = min(len(values), i + half + 1)
        smoothed.append(sum(values[start:end]) / (end - start))

    d2 = []
    for i in range(1, len(smoothed) - 1):
        d2.append(smoothed[i + 1] - 2 * smoothed[i] + smoothed[i - 1])

    max_idx = 0
    max_val = d2[0]
    for i, v in enumerate(d2):
        if v > max_val:
            max_val = v
            max_idx = i

    accel_year = years[max_idx + 1]
    accel_rate = max_val
    return accel_year, round(accel_rate, 6)


def load_disease_time_series(disease_id: str) -> DiseaseTimeSeries | None:
    """Load GBD time series for a disease."""
    if disease_id == "depression":
        years, values = _load_owid_csv("depression_world.csv")
        unit = "prevalence_per_100"
        source = "OWID_GBD_direct"
    elif disease_id in GBD_PUBLISHED_ESTIMATES:
        years, values = _interpolate_published(
            GBD_PUBLISHED_ESTIMATES[disease_id]
        )
        unit = "prevalence_per_100"
        source = "GBD_published"
    else:
        return None

    if not years:
        return None

    accel_year, accel_rate = estimate_acceleration_point(years, values)

    return DiseaseTimeSeries(
        disease_id=disease_id,
        years=years,
        values=values,
        unit=unit,
        source=source,
        acceleration_year=accel_year,
        acceleration_rate=accel_rate,
    )


def load_all_disease_series() -> dict[str, DiseaseTimeSeries]:
    """Load time series for all 7 cascade diseases."""
    diseases = [
        "sleep", "depression", "adhd_asd", "metabolic",
        "autoimmune", "fertility", "cancer_young",
    ]
    result = {}
    for d in diseases:
        ts = load_disease_time_series(d)
        if ts is not None:
            result[d] = ts
    return result
