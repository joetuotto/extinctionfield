"""Tests for the ADHD ion channel calibration diagnostic module."""

from berm.diagnostics.adhd_calibration import (
    adhd_calibration_diagnostic,
    compare_scenarios,
    adhd_calibration_summary,
)


def test_high_emf_tc_highest_risk():
    """T/C genotype with high EMF produces higher risk than T/T."""
    tc = adhd_calibration_diagnostic(0.8, "T/C")
    tt = adhd_calibration_diagnostic(0.8, "T/T")
    assert tc.predicted_adhd_risk > tt.predicted_adhd_risk


def test_low_emf_low_risk():
    """Low prenatal EMF with T/T produces low ADHD risk."""
    r = adhd_calibration_diagnostic(0.1, "T/T", postnatal_emf=0.1)
    assert r.predicted_adhd_risk < 0.15


def test_guanfacine_recommended_for_severe():
    """Guanfacine recommended for high calibration error."""
    r = adhd_calibration_diagnostic(0.9, "T/C")
    assert "Guanfasiini" in r.optimal_treatment


def test_dose_response():
    """Higher prenatal EMF produces higher risk monotonically."""
    low = adhd_calibration_diagnostic(0.2, "T/T")
    mid = adhd_calibration_diagnostic(0.5, "T/T")
    high = adhd_calibration_diagnostic(0.8, "T/T")
    assert low.predicted_adhd_risk < mid.predicted_adhd_risk < high.predicted_adhd_risk


def test_snr_deficit_increases_with_emf():
    """SNR deficit increases with both prenatal and postnatal EMF."""
    low = adhd_calibration_diagnostic(0.1, "T/T", 0.1)
    high = adhd_calibration_diagnostic(0.9, "T/T", 0.9)
    assert high.snr_deficit > low.snr_deficit


def test_compare_scenarios_structure():
    """Compare scenarios returns expected keys."""
    r = compare_scenarios()
    assert "low_emf_tt" in r
    assert "high_emf_tc" in r
    assert r["high_emf_tc"]["risk"] > r["low_emf_tt"]["risk"]


def test_summary_has_predictions():
    """Summary includes P33-P35 predictions and warnings."""
    s = adhd_calibration_summary()
    assert "P33" in s["predictions"]
    assert "P35" in s["predictions"]
    assert len(s["chain"]) >= 5
    assert len(s["warnings"]) >= 5
    assert "genetic" in s["evidence_lines"]
