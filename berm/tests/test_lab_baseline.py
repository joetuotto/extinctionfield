"""Tests for the laboratory baseline bias diagnostic module."""

from berm.diagnostics.lab_baseline import (
    lab_emf_by_year,
    lab_emf_by_decade,
    control_chi,
    bias_toward_null,
    replication_prediction,
    decade_summary,
    faraday_prediction,
    chi,
)


def test_chi_zero():
    assert chi(0.0) == 0.0


def test_chi_large_saturates():
    assert abs(chi(100.0) - 1.0) < 0.001


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
    assert control_chi(emf) < 0.2


def test_control_chi_near_1_in_2020s():
    emf = lab_emf_by_year(2020)
    assert control_chi(emf) > 0.99


def test_bias_toward_null_increases_with_lab_emf():
    b1 = bias_toward_null(0.1)
    b2 = bias_toward_null(10.0)
    assert b2.bias_pct > b1.bias_pct


def test_bias_zero_at_zero_emf():
    b = bias_toward_null(0.0)
    assert b.bias_pct < 0.01


def test_bias_high_in_modern_lab():
    b = bias_toward_null(15.0)
    assert b.bias_pct > 90


def test_bias_observable_fraction_bounded():
    b = bias_toward_null(5.0)
    assert 0.0 <= b.observable_fraction <= 1.0


def test_replication_effect_shrinks():
    r = replication_prediction(1985, 2015)
    assert r.effect_ratio < 1.0


def test_replication_same_year():
    r = replication_prediction(2000, 2000)
    assert abs(r.effect_ratio - 1.0) < 1e-10


def test_replication_1980_to_2020():
    r = replication_prediction(1980, 2020)
    assert r.effect_ratio < 0.2


def test_replication_rate_low_for_old_studies():
    r = replication_prediction(1985, 2020)
    assert r.expected_replication_rate < 0.5


def test_decade_summary_length():
    s = decade_summary()
    assert len(s) == 8


def test_decade_summary_bias_increases():
    s = decade_summary()
    for i in range(1, len(s)):
        assert s[i]["bias_pct"] >= s[i - 1]["bias_pct"]


def test_faraday_prediction_ratio():
    f = faraday_prediction()
    assert f["effect_ratio"] > 5
    assert f["chi_shielded"] <= 0.01
    assert f["chi_standard"] > 0.99
