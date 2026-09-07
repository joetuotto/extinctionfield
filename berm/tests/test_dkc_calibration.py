"""Contract tests for the bounded DKC calibration and comparison layer."""

from __future__ import annotations

import math

import pytest

from berm.stats.dkc_calibration import (
    BASE_ALPHA,
    BASE_GRID,
    BASE_TAU_B,
    BASE_TAU_R,
    DKCGridPoint,
    DKCParameters,
    MODEL_METADATA,
    NOT_IDENTIFIABLE_WITH_CURRENT_DATA,
    PROXY,
    REFINED_ALPHA,
    REFINED_GRID,
    REFINED_HILL_N,
    REFINED_N_B,
    REFINED_TAU_B,
    REFINED_TAU_R,
    TECHNOLOGY_TIMING_PROXY,
    TechnologyTimingProxy,
    VALID_BASE_GRID,
    VALID_REFINED_GRID,
    bic_score,
    leave_one_country_out,
    make_model_score,
    temporal_holdout,
)


def test_base_grid_is_the_prespecified_448_points() -> None:
    assert len(BASE_TAU_B) == 8
    assert len(BASE_TAU_R) == 8
    assert len(BASE_ALPHA) == 7
    assert len(BASE_GRID) == 8 * 8 * 7 == 448
    assert BASE_GRID[0] == DKCGridPoint(0.5, 5.0, 0.1)
    assert BASE_GRID[-1] == DKCGridPoint(5.0, 25.0, 0.7)


def test_refined_grid_is_the_prespecified_4320_points() -> None:
    assert tuple(
        map(
            len,
            (
                REFINED_TAU_B,
                REFINED_TAU_R,
                REFINED_ALPHA,
                REFINED_HILL_N,
                REFINED_N_B,
            ),
        )
    ) == (6, 6, 5, 6, 4)
    assert len(REFINED_GRID) == 6 * 6 * 5 * 6 * 4 == 4320
    assert REFINED_GRID[0] == DKCGridPoint(0.3, 5.0, 0.2, 1.0, 2)
    assert REFINED_GRID[-1] == DKCGridPoint(2.0, 20.0, 0.6, 3.5, 5)


def test_all_grid_points_obey_kernel_and_normalization_constraints() -> None:
    # The exact base product contains seven pre-registered equality points.
    # They stay visible in BASE_GRID but cannot enter a fit.
    rejected = [point for point in BASE_GRID if not point.admissible]
    assert len(rejected) == 7
    assert {(point.tau_b, point.tau_r) for point in rejected} == {(5.0, 5.0)}
    for point in rejected:
        with pytest.raises(ValueError, match="greater than tau_b"):
            point.validated()

    assert len(VALID_BASE_GRID) == 441
    assert len(VALID_REFINED_GRID) == 4320
    for point in VALID_BASE_GRID + VALID_REFINED_GRID:
        assert point.tau_b > 0.0
        assert point.tau_r > point.tau_b
        assert point.hill_n > 0.0
        assert point.alpha + point.beta == pytest.approx(1.0)


@pytest.mark.parametrize(
    "kwargs, message",
    [
        ({"tau_b": 0.0, "tau_r": 5.0, "alpha": 0.5}, "tau_b must be positive"),
        ({"tau_b": 1.0, "tau_r": 0.0, "alpha": 0.5}, "tau_r must be positive"),
        ({"tau_b": 5.0, "tau_r": 5.0, "alpha": 0.5}, "greater than tau_b"),
        ({"tau_b": 1.0, "tau_r": 5.0, "alpha": -0.1}, "alpha must be"),
        ({"tau_b": 1.0, "tau_r": 5.0, "alpha": 0.5, "hill_n": 0.0}, "hill_n"),
    ],
)
def test_invalid_dkc_parameters_fail_explicitly(kwargs: dict, message: str) -> None:
    with pytest.raises(ValueError, match=message):
        DKCParameters(**kwargs)


def test_beta_is_derived_and_cannot_be_passed_as_a_free_parameter() -> None:
    point = DKCParameters(1.0, 12.0, 0.35)
    assert point.beta == pytest.approx(0.65)
    with pytest.raises(TypeError):
        DKCParameters(1.0, 12.0, 0.35, beta=0.2)  # type: ignore[call-arg]


def test_bic_uses_the_prespecified_formula() -> None:
    n_obs, mse, k = 120, 0.25, 4
    expected = n_obs * math.log(mse) + k * math.log(n_obs)
    assert bic_score(n_obs, mse, k) == pytest.approx(expected)


@pytest.mark.parametrize(
    "n_obs, mse, k",
    [(0, 1.0, 1), (10, 0.0, 1), (10, -1.0, 1), (10, math.inf, 1), (10, 1.0, -1)],
)
def test_bic_rejects_invalid_inputs(n_obs: int, mse: float, k: int) -> None:
    with pytest.raises(ValueError):
        bic_score(n_obs, mse, k)


def test_technology_timing_proxy_requires_both_proxy_labels() -> None:
    row = TechnologyTimingProxy("KOR", 2015, 98.0, "WB_IT_CEL_SETS_P2")
    assert row.measurement_type == PROXY
    assert row.variable_role == TECHNOLOGY_TIMING_PROXY
    with pytest.raises(ValueError, match="measurement_type"):
        TechnologyTimingProxy(
            "KOR", 2015, 98.0, "WB_IT_CEL_SETS_P2", measurement_type="OBSERVED"
        )


def test_leave_one_country_out_has_no_country_leakage() -> None:
    rows = [
        {"geography_id": country, "year": year, "value": float(year)}
        for country in ("FIN", "KOR", "JPN")
        for year in (2014, 2015)
    ]
    folds = leave_one_country_out(rows)
    assert [fold.held_out_country for fold in folds] == ["FIN", "JPN", "KOR"]
    for fold in folds:
        assert fold.test_countries == {fold.held_out_country}
        assert fold.held_out_country not in fold.train_countries
        assert len(fold.test_rows) == 2
        assert len(fold.train_rows) == 4


def test_leave_one_country_out_requires_multiple_countries() -> None:
    with pytest.raises(ValueError, match="at least two countries"):
        leave_one_country_out([{"geography_id": "FIN", "year": 2015}])


def test_leave_one_country_out_preserves_an_explicit_country_key() -> None:
    folds = leave_one_country_out(
        [{"iso3": "FIN", "year": 2015}, {"iso3": "KOR", "year": 2015}],
        country_key="iso3",
    )
    assert folds[0].test_countries == {folds[0].held_out_country}
    assert folds[0].held_out_country not in folds[0].train_countries


def _wpp_row(year: int, *, status: str, measurement_type: str) -> dict:
    return {
        "source_id": "UN_WPP_2024_TFR",
        "geography_id": "KOR",
        "year": year,
        "value": 1.0,
        "measurement_type": measurement_type,
        "series_status": status,
    }


def test_temporal_holdout_builds_main_split_and_excludes_wpp_2024_projection() -> None:
    rows = [
        _wpp_row(2010, status="ESTIMATE", measurement_type="OBSERVED"),
        _wpp_row(2015, status="ESTIMATE", measurement_type="OBSERVED"),
        _wpp_row(2016, status="ESTIMATE", measurement_type="OBSERVED"),
        _wpp_row(2023, status="ESTIMATE", measurement_type="OBSERVED"),
        _wpp_row(2024, status="PROJECTION_MEDIUM", measurement_type="DERIVED"),
    ]
    split = temporal_holdout(rows)
    assert [row["year"] for row in split.train_rows] == [2010, 2015]
    assert [row["year"] for row in split.test_rows] == [2016, 2023]
    assert all(row["year"] <= 2023 for row in split.test_rows)
    assert [(item.row["year"], item.reason) for item in split.excluded_rows] == [
        (2024, "WPP_PROJECTION_STATUS")
    ]


def test_temporal_holdout_accepts_global_panel_provenance_field_names() -> None:
    rows = [
        {
            "year": 2015,
            "tfr_source": "UN_WPP_2024_TFR",
            "tfr_measurement_type": "OBSERVED",
            "tfr_series_status": "ESTIMATE",
        },
        {
            "year": 2023,
            "tfr_source": "UN_WPP_2024_TFR",
            "tfr_measurement_type": "OBSERVED",
            "tfr_series_status": "ESTIMATE",
        },
        {
            "year": 2024,
            "tfr_source": "UN_WPP_2024_TFR",
            "tfr_measurement_type": "DERIVED",
            "tfr_series_status": "PROJECTION_MEDIUM",
        },
    ]
    split = temporal_holdout(rows)
    assert [row["year"] for row in split.test_rows] == [2023]
    assert split.excluded_rows[0].reason == "WPP_PROJECTION_STATUS"


def test_m0_to_m4_metadata_has_no_winner_order_and_marks_m4_unidentified() -> None:
    assert set(MODEL_METADATA) == {"M0", "M1", "M2", "M3", "M4"}
    assert MODEL_METADATA["M4"].status == NOT_IDENTIFIABLE_WITH_CURRENT_DATA
    assert MODEL_METADATA["M4"].parameter_count == (8, 10)
    assert not hasattr(MODEL_METADATA["M4"], "expected_rank")


def test_identified_model_can_be_scored_but_m4_cannot_be_fake_scored() -> None:
    score = make_model_score("M3", n_obs=100, mse=0.5)
    assert score.k == 4
    assert score.bic == pytest.approx(bic_score(100, 0.5, 4))

    unavailable = make_model_score("M4")
    assert unavailable.status == NOT_IDENTIFIABLE_WITH_CURRENT_DATA
    assert unavailable.bic is None
    with pytest.raises(ValueError, match=NOT_IDENTIFIABLE_WITH_CURRENT_DATA):
        make_model_score("M4", n_obs=100, mse=0.5, k=8)
