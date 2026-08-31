from __future__ import annotations

from berm.prediction.behavioral_factor import (
    behavioral_factor_v21,
    annual_behavioral_series,
)


def test_reference_year_factor_is_one() -> None:
    f = behavioral_factor_v21(1990, reference_year=1990)
    assert abs(f - 1.0) < 1e-10


def test_factor_declines_over_time() -> None:
    f_2000 = behavioral_factor_v21(2000)
    f_2020 = behavioral_factor_v21(2020)
    assert f_2020 < f_2000


def test_factor_positive() -> None:
    for year in range(1990, 2060):
        f = behavioral_factor_v21(year)
        assert f > 0, f"factor at {year} = {f}"


def test_annual_series_length() -> None:
    series = annual_behavioral_series(2000, 2030)
    assert len(series) == 31


def test_annual_series_has_required_fields() -> None:
    series = annual_behavioral_series(2020, 2020)
    row = series[0]
    assert "year" in row
    assert "factor" in row
    assert "t_ng_dl" in row


def test_factor_magnitude_2024() -> None:
    f = behavioral_factor_v21(2024)
    assert 0.4 < f < 1.0, f"factor at 2024 = {f}"
