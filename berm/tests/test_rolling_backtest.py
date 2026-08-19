"""Leakage and contract tests for external temporal BERM validation."""

from __future__ import annotations

from dataclasses import replace

import pytest

from berm.stats.rolling_backtest import (
    CountryPanel,
    DataCoverageError,
    ExposureRecord,
    compare_exposure_sources,
    evaluate_temporal_model,
    fit_temporal_model,
    future_prediction_status,
    load_external_panels,
    nested_lag_loocv,
    predict_temporal_model,
    run_rolling_scenario,
)
from berm.stats.wce import CumulativeKernel


def _panel(country: str, iso3: str, *, start: int = 1990, end: int = 2015) -> CountryPanel:
    country_offset = {"USA": 0.0, "Finland": -0.15, "SouthKorea": -0.35}[country]
    tfr = {
        year: 3.2 + country_offset - 0.035 * (year - start)
        for year in range(start, end + 1)
    }
    exposure = {}
    for year in range(start, end + 1):
        elapsed = year - start
        ambient = 0.15 + 0.015 * elapsed
        personal = 0.05 + 0.04 * elapsed
        exposure[year] = ExposureRecord(
            year=year,
            total=ambient + personal * ambient / (1 + ambient * ambient) ** 0.5,
            ambient=ambient,
            personal=personal,
            mobile_status="observed" if year % 2 == 0 else "interpolated",
            urban_status="observed",
            broadband_status="unavailable_outside_range",
            source_metadata={"fixture": True},
        )
    return CountryPanel(
        country=country,
        iso3=iso3,
        tfr=tfr,
        exposure=exposure,
        start_year=start,
        end_year=end,
    )


@pytest.fixture
def panels() -> dict[str, CountryPanel]:
    return {
        "USA": _panel("USA", "USA"),
        "Finland": _panel("Finland", "FIN"),
        "SouthKorea": _panel("SouthKorea", "KOR"),
    }


def test_train_fit_does_not_read_post_cutoff_tfr(panels):
    model = fit_temporal_model(
        panels, train_start=1990, train_end=2010, kernel=CumulativeKernel()
    )
    changed = dict(panels)
    usa = panels["USA"]
    changed_tfr = dict(usa.tfr)
    for year in range(2011, 2016):
        changed_tfr[year] = 9.9
    changed["USA"] = replace(usa, tfr=changed_tfr)
    re_fit = fit_temporal_model(
        changed, train_start=1990, train_end=2010, kernel=CumulativeKernel()
    )

    assert re_fit.country_models["USA"] == model.country_models["USA"]
    assert re_fit.exposure_scale == model.exposure_scale


def test_prediction_rejects_training_and_unavailable_future_year(panels):
    model = fit_temporal_model(
        panels, train_start=1990, train_end=2010, kernel=CumulativeKernel()
    )
    with pytest.raises(ValueError, match="strictly after"):
        predict_temporal_model(model, panels["USA"], 2010)
    with pytest.raises(DataCoverageError, match="future external exposure"):
        predict_temporal_model(model, panels["USA"], 2016)


def test_rolling_backtest_uses_same_country_year_rows_for_berm_and_m0(panels):
    model = fit_temporal_model(
        panels, train_start=1990, train_end=2010, kernel=CumulativeKernel()
    )
    berm, m0, per_country = evaluate_temporal_model(
        model, panels, test_start=2011, test_end=2015
    )

    assert berm.n == m0.n == 15
    assert set(per_country) == set(panels)
    assert all(result.berm.n == result.m0.n == 5 for result in per_country.values())
    assert all("observed_tfr" in row for result in per_country.values() for row in result.rows)


def test_kernel_selection_and_nested_loocv_remain_within_training(panels):
    scenario = run_rolling_scenario(
        "fixture",
        panels,
        train_start=1990,
        train_end=2010,
        test_end=2015,
        validation_years=5,
        tau_grid=(1.0, 5.0),
    )
    assert scenario.selected_kernel.validation_end == 2010
    assert scenario.test_start == 2011
    assert scenario.aggregate_berm.n == 15

    loocv = nested_lag_loocv(
        panels,
        train_start=1990,
        train_end=2010,
        validation_years=5,
        tau_grid=(1.0, 5.0),
        families=("cum_emf",),
    )
    result = loocv["cum_emf"]
    assert result.berm.n == 15
    assert set(result.per_country) == set(panels)
    assert all(item.validation_end == 2010 for item in result.per_country.values())


def test_exposure_source_comparison_is_labeled_and_uses_m1_loocv(panels):
    comparison = compare_exposure_sources(
        panels, train_start=1990, train_end=2010, validation_years=5
    )
    assert comparison.default_source in {"external", "endogenous_legacy"}
    assert comparison.external.family == "cum_emf"
    assert comparison.endogenous_legacy.family == "cum_emf"
    assert "LOOCV" in comparison.interpretation


def test_future_lock_never_fabricates_exposure_after_2024():
    status = future_prediction_status()
    assert status["eligible_prospective_years"] == [2025, 2026, 2027, 2028, 2029, 2030]
    assert status["already_observed_years"] == [2021, 2022, 2023, 2024]
    assert "No internally generated" in status["rule"]


def test_external_panel_loader_excludes_incomplete_source_without_extrapolation(tmp_path):
    (tmp_path / "tfr_by_country_year.csv").write_text(
        "country_iso3,year,tfr\nUSA,2000,2.0\nUSA,2001,1.9\n",
        encoding="utf-8",
    )
    (tmp_path / "mobile_by_country_year.csv").write_text(
        "country_iso3,year,subs_per_100\nUSA,2000,10\n",
        encoding="utf-8",
    )
    (tmp_path / "urban_by_country_year.csv").write_text(
        "country_iso3,year,urban_pct\nUSA,2000,70\nUSA,2001,71\n",
        encoding="utf-8",
    )
    (tmp_path / "broadband_by_country_year.csv").write_text(
        "country_iso3,year,broadband_per_100\nUSA,2000,1\n",
        encoding="utf-8",
    )

    loaded = load_external_panels(start_year=2000, end_year=2001, data_dir=tmp_path)
    assert not loaded.panels
    assert loaded.exclusions["USA"] == "missing_external_exposure_in_requested_window"

