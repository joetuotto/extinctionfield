"""Tests for GBD data integration module."""

from berm.diagnostics.gbd_data import (
    estimate_acceleration_point,
    load_all_disease_series,
    load_disease_time_series,
)


def test_loads_all_seven_diseases():
    series = load_all_disease_series()
    assert len(series) == 7
    assert set(series.keys()) == {
        "sleep", "depression", "adhd_asd", "metabolic",
        "autoimmune", "fertility", "cancer_young",
    }


def test_depression_uses_owid_data():
    ts = load_disease_time_series("depression")
    assert ts is not None
    assert ts.source == "OWID_GBD_direct"
    assert ts.years[0] == 1990
    assert ts.years[-1] == 2023
    assert 2.5 < ts.values[0] < 3.5


def test_cancer_uses_published_estimates():
    """Early-onset cancer (<50y) uses Zhao 2023 published estimates, not OWID total cancer."""
    ts = load_disease_time_series("cancer_young")
    assert ts is not None
    assert ts.source == "GBD_published"
    assert ts.values[-1] > ts.values[0]


def test_published_estimates_interpolated():
    ts = load_disease_time_series("sleep")
    assert ts is not None
    assert ts.source == "GBD_published"
    assert len(ts.years) == 34
    assert all(
        ts.years[i + 1] - ts.years[i] == 1
        for i in range(len(ts.years) - 1)
    )


def test_acceleration_point_detected():
    series = load_all_disease_series()
    for disease_id, ts in series.items():
        assert ts.acceleration_year is not None, (
            f"{disease_id}: no acceleration point"
        )
        assert 1990 <= ts.acceleration_year <= 2023


def test_acceleration_point_basic():
    years = list(range(2000, 2020))
    values = [1.0 + 0.01 * (y - 2000) ** 2 for y in years]
    accel_year, accel_rate = estimate_acceleration_point(years, values)
    assert accel_year is not None
    assert accel_rate > 0


def test_depression_acceleration_post_2008():
    """Depression acceleration point is after LED rollout (2009+)."""
    ts = load_disease_time_series("depression")
    assert ts.acceleration_year is not None
    assert ts.acceleration_year >= 2008


def test_sleep_acceleration_post_2008():
    """Sleep disorder acceleration is after LED rollout (2009+)."""
    ts = load_disease_time_series("sleep")
    assert ts.acceleration_year is not None
    assert ts.acceleration_year >= 2008
