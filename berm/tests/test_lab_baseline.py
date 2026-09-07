"""Tests for the laboratory baseline bias diagnostic module."""

import pytest

from berm.diagnostics.lab_baseline import (
    lab_emf_by_year,
    lab_emf_by_decade,
    control_chi,
    bias_toward_null,
    replication_prediction,
    decade_summary,
    faraday_prediction,
    chi,
    normalize_field_strength,
)


NORMALIZATION_SCALE_V_M = 1.0
CHI_DOCSTRING = "L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."


def test_chi_zero():
    assert chi(0.0) == 0.0


def test_chi_has_canonical_l1_docstring():
    assert chi.__doc__ == CHI_DOCSTRING


def test_chi_large_saturates():
    assert abs(chi(100.0) - 1.0) < 0.001


def test_field_strength_normalization_is_explicit_and_dimensionless():
    assert normalize_field_strength(
        15.0,
        normalization_scale_v_m=5.0,
    ) == pytest.approx(3.0)


def test_lab_emf_increases_monotonically():
    prev = 0.0
    for year in range(1950, 2026):
        emf = lab_emf_by_year(year)
        assert emf >= prev, f"EMF decreased at year {year}"
        prev = emf


def test_lab_emf_1950_low():
    assert lab_emf_by_year(1950) < 0.2


def test_lab_emf_2020_high():
    assert lab_emf_by_year(2020) >= 15.0


def test_lab_emf_clamped_before_1950():
    assert lab_emf_by_year(1900) == lab_emf_by_year(1950)


def test_lab_emf_clamped_after_2025():
    assert lab_emf_by_year(2050) == lab_emf_by_year(2025)


def test_lab_emf_by_decade():
    assert lab_emf_by_decade(1980) == lab_emf_by_year(1985)


def test_control_chi_low_in_1950s():
    emf = lab_emf_by_year(1955)
    assert control_chi(
        emf,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    ) < 0.2


def test_control_chi_near_1_in_2020s():
    emf = lab_emf_by_year(2020)
    assert control_chi(
        emf,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    ) > 0.99


def test_raw_v_per_m_cannot_silently_enter_chi_adapter():
    with pytest.raises(TypeError, match="normalization_scale_v_m"):
        control_chi(15.0)


@pytest.mark.parametrize(
    "call",
    [
        lambda: bias_toward_null(15.0),
        lambda: replication_prediction(1985, 2015),
        lambda: decade_summary(),
        lambda: faraday_prediction(),
    ],
)
def test_all_v_per_m_diagnostics_require_normalization_scale(call):
    with pytest.raises(TypeError, match="normalization_scale_v_m"):
        call()


def test_declared_normalization_scale_changes_reduced_coordinate():
    unit_scale = control_chi(15.0, normalization_scale_v_m=1.0)
    large_scale = control_chi(15.0, normalization_scale_v_m=100.0)
    assert unit_scale > 0.99
    assert large_scale < 0.2


def test_bias_toward_null_increases_with_lab_emf():
    b1 = bias_toward_null(
        0.1,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    b2 = bias_toward_null(
        10.0,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert b2.bias_pct > b1.bias_pct


def test_bias_zero_at_zero_emf():
    b = bias_toward_null(
        0.0,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert b.bias_pct < 0.01


def test_bias_high_in_modern_lab():
    b = bias_toward_null(
        15.0,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert b.bias_pct > 90


def test_bias_observable_fraction_bounded():
    b = bias_toward_null(
        5.0,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert 0.0 <= b.observable_fraction <= 1.0


def test_bias_result_records_normalization_and_coordinates():
    result = bias_toward_null(15.0, 50.0, normalization_scale_v_m=5.0)
    assert result.normalization_scale_v_m == 5.0
    assert result.normalized_lab_coordinate == pytest.approx(3.0)
    assert result.normalized_treatment_coordinate == pytest.approx(10.0)


def test_replication_effect_shrinks():
    r = replication_prediction(
        1985,
        2015,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert r.effect_ratio < 1.0


def test_replication_same_year():
    r = replication_prediction(
        2000,
        2000,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert abs(r.effect_ratio - 1.0) < 1e-10


def test_replication_1980_to_2020():
    r = replication_prediction(
        1980,
        2020,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert r.effect_ratio < 0.2


def test_replication_rate_low_for_old_studies():
    r = replication_prediction(
        1985,
        2020,
        normalization_scale_v_m=NORMALIZATION_SCALE_V_M,
    )
    assert r.expected_replication_rate < 0.5


def test_replication_result_records_normalization():
    result = replication_prediction(1985, 2015, normalization_scale_v_m=5.0)
    assert result.normalization_scale_v_m == 5.0
    assert result.normalized_original_coordinate == pytest.approx(
        result.original_lab_emf / 5.0
    )
    assert result.normalized_replication_coordinate == pytest.approx(
        result.replication_lab_emf / 5.0
    )


def test_decade_summary_length():
    s = decade_summary(normalization_scale_v_m=NORMALIZATION_SCALE_V_M)
    assert len(s) == 8


def test_decade_summary_bias_increases():
    s = decade_summary(normalization_scale_v_m=NORMALIZATION_SCALE_V_M)
    for i in range(1, len(s)):
        assert s[i]["bias_pct"] >= s[i - 1]["bias_pct"]


def test_decade_summary_records_normalization():
    summary = decade_summary(normalization_scale_v_m=5.0)
    assert all(row["normalization_scale_v_m"] == 5.0 for row in summary)
    assert summary[0]["normalized_lab_coordinate"] == pytest.approx(
        round(lab_emf_by_decade(1950) / 5.0, 6)
    )


def test_faraday_prediction_ratio():
    f = faraday_prediction(normalization_scale_v_m=NORMALIZATION_SCALE_V_M)
    assert f["effect_ratio"] > 5
    assert f["chi_shielded"] <= 0.01
    assert f["chi_standard"] > 0.99


def test_faraday_prediction_records_normalization():
    result = faraday_prediction(normalization_scale_v_m=5.0)
    assert result["normalization_scale_v_m"] == 5.0
    assert result["normalized_shielded_coordinate"] == pytest.approx(0.002)


@pytest.mark.parametrize("scale", [0.0, -1.0, float("nan"), float("inf")])
def test_invalid_normalization_scale_is_rejected(scale):
    with pytest.raises(ValueError, match="normalization_scale_v_m"):
        control_chi(1.0, normalization_scale_v_m=scale)
