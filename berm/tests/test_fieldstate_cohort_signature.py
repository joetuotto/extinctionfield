"""Tests for the bounded WPP/WB cohort timing-proxy diagnostic."""

from __future__ import annotations

import pytest

from berm.data.wpp import AGE_GROUPS
from berm.validation.fieldstate_cohort_signature import (
    PROXY_STATUS,
    build_cohort_asfr_signature,
    developmental_timing_proxy,
    run_processed_cohort_asfr_signature,
)


def test_developmental_timing_proxy_uses_only_fetal_to_age_17_window() -> None:
    series = {year: float(year) for year in range(1999, 2018)}

    proxy = developmental_timing_proxy(series, 2000)

    assert proxy is not None
    assert 1999.0 <= proxy <= 2017.0
    assert developmental_timing_proxy({2000: 1.0}, 2000) is None


def test_cohort_signature_preserves_negative_direction_without_calling_proxy_fieldstate() -> None:
    years = range(1975, 2024)
    mobile = {
        "AAA": {year: float(year) for year in years},
        "BBB": {year: float(3000 - year) for year in years},
    }
    asfr = {}
    for country in mobile:
        baseline = {group: 100.0 for group in AGE_GROUPS}
        target = {group: 100.0 for group in AGE_GROUPS}
        if country == "AAA":
            for group in ("15-19", "20-24", "25-29"):
                target[group] = 50.0
        else:
            for group in ("30-34", "35-39", "40-44", "45-49"):
                target[group] = 50.0
        asfr[(country, 2000)] = baseline
        asfr[(country, 2023)] = target

    result = build_cohort_asfr_signature(
        mobile_proxy_by_country_year=mobile,
        asfr_by_country_year=asfr,
    )

    assert result.n_countries == 2
    assert result.pearson_r == pytest.approx(-1.0)
    assert result.proxy_status == PROXY_STATUS
    assert "not a physical FieldState" in result.limitations[1]


def test_processed_panel_reproduces_descriptive_all_country_signature() -> None:
    result = run_processed_cohort_asfr_signature()

    assert result.n_countries == 163
    assert result.pearson_r == pytest.approx(-0.6664467038)
    assert result.source_ids == ("UN_WPP_2024_ASFR", "WB_IT_CEL_SETS_P2")
