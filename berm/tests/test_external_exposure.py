"""Tests for the external World Bank exposure layer."""

from __future__ import annotations

import math

import pytest

from berm.exposure.military_ambient import broadcast_ambient, military_ambient
from berm.stats.external_exposure import (
    clear_external_exposure_cache,
    exposure_from_data,
    mobile_to_personal_emf,
)


def _write_processed_inputs(directory) -> None:
    (directory / "mobile_by_country_year.csv").write_text(
        "country_iso3,year,subs_per_100\n"
        "TST,2000,0\n"
        "TST,2002,100\n",
        encoding="utf-8",
    )
    (directory / "broadband_by_country_year.csv").write_text(
        "country_iso3,year,broadband_per_100\n"
        "TST,2000,10\n"
        "TST,2002,30\n",
        encoding="utf-8",
    )
    (directory / "urban_by_country_year.csv").write_text(
        "country_iso3,year,urban_pct\n"
        "TST,2000,40\n"
        "TST,2002,80\n",
        encoding="utf-8",
    )


def test_mobile_to_personal_emf_is_michaelis_menten_and_saturates():
    assert mobile_to_personal_emf(0.0) == 0.0
    assert mobile_to_personal_emf(50.0) == pytest.approx(1.5)
    assert mobile_to_personal_emf(5_000.0) < 3.0
    assert mobile_to_personal_emf(5_000.0) > 2.9


def test_broadband_does_not_change_specified_personal_conversion():
    assert mobile_to_personal_emf(50.0, 0.0) == mobile_to_personal_emf(50.0, 100.0)


def test_exposure_uses_only_linear_interpolation_and_preserves_chi(tmp_path):
    _write_processed_inputs(tmp_path)
    clear_external_exposure_cache()

    result = exposure_from_data("TST", 2001, data_dir=tmp_path)

    # TST is a direct ISO-3 input, so external data work without an invented
    # country-specific military/broadcast layer.
    assert result["input_status"]["mobile"]["status"] == "interpolated"
    assert result["input_status"]["broadband"]["status"] == "interpolated"
    assert result["input_status"]["urban"]["status"] == "interpolated"
    assert result["mobile_per_100"] == pytest.approx(50.0)
    assert result["broadband_per_100"] == pytest.approx(20.0)
    assert result["urban_pct"] == pytest.approx(60.0)
    assert result["ambient"] == pytest.approx(0.3)
    assert result["personal"] == pytest.approx(1.5)
    expected = 0.3 + (0.3 / math.sqrt(1.0 + 0.3**2)) * 1.5
    assert result["total"] == pytest.approx(expected)
    assert result["available"] is True


def test_exposure_never_extrapolates_missing_source_data(tmp_path):
    _write_processed_inputs(tmp_path)
    clear_external_exposure_cache()

    result = exposure_from_data("TST", 2003, data_dir=tmp_path)

    assert result["total"] is None
    assert result["available"] is False
    assert result["input_status"]["mobile"]["status"] == "unavailable_outside_range"
    assert result["input_status"]["urban"]["status"] == "unavailable_outside_range"
    assert set(result["missing_required_inputs"]) == {"mobile", "urban"}


def test_known_country_includes_existing_military_and_broadcast_layers():
    result = exposure_from_data("USA", 1975)

    assert result["country_iso3"] == "USA"
    assert result["berm_country"] == "USA"
    assert result["military_ambient"] == pytest.approx(military_ambient("USA", 1975))
    assert result["broadcast_ambient"] == pytest.approx(broadcast_ambient("USA", 1975))
    assert result["available"] is True
    assert result["total"] == pytest.approx(
        result["ambient"] + result["chi"] * result["personal"]
    )


def test_unknown_country_is_graceful_and_reports_unavailable_inputs():
    result = exposure_from_data("Atlantis", 2000)

    assert result["total"] is None
    assert result["available"] is False
    assert result["country_iso3"] is None
    assert result["military_ambient"] is None
    assert result["input_status"]["mobile"]["status"] == "unavailable_country"

