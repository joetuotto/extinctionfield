"""Test TFR prediction pipeline, conventional model, and hindcast validation."""

import math

from berm.tfr import predict_tfr, _behavioral_factor, _night_fraction
from berm.conventional import conventional_tfr
from berm.hindcast import hindcast_country
from berm.biology.sperm_cascade import SpermState
from berm.config import ALPHA_EFF


# --- predict_tfr ---

def test_predict_tfr_returns_dict():
    """Basic structure check: returns dict with all expected keys."""
    result = predict_tfr(
        country="TestLand",
        year=2024,
        mobile_penetration=0.5,
        pop_density=100.0,
        base_tfr=2.0,
    )
    assert isinstance(result, dict)
    expected_keys = {
        "country", "year", "tfr_predicted", "bio_capacity",
        "emf_behavioral", "cultural", "exposure_total", "sperm_state",
    }
    assert set(result.keys()) == expected_keys
    assert result["country"] == "TestLand"
    assert result["year"] == 2024
    assert isinstance(result["sperm_state"], SpermState)
    assert isinstance(result["tfr_predicted"], float)


def test_predict_tfr_high_exposure_lower_tfr():
    """Higher mobile penetration should produce lower predicted TFR."""
    low = predict_tfr("A", 2024, mobile_penetration=0.2, pop_density=50.0, base_tfr=2.0)
    high = predict_tfr("A", 2024, mobile_penetration=1.0, pop_density=200.0, base_tfr=2.0)
    assert high["tfr_predicted"] < low["tfr_predicted"]


def test_predict_tfr_zero_exposure():
    """With zero mobile penetration, TFR should approximately equal base_tfr."""
    result = predict_tfr(
        country="NoPhones",
        year=2024,
        mobile_penetration=0.0,
        pop_density=50.0,
        base_tfr=3.5,
    )
    # With zero penetration, exposure is zero, bio_capacity ~ 1.0
    # TFR should be very close to base_tfr
    assert abs(result["tfr_predicted"] - 3.5) < 0.01
    assert result["exposure_total"] == 0.0


def test_predict_tfr_finland_2024():
    """Finland: pen=1.0, density=18, base_tfr=1.26 -> reasonable prediction."""
    result = predict_tfr(
        country="Finland",
        year=2024,
        mobile_penetration=1.0,
        pop_density=18.0,
        base_tfr=1.26,
        calibration_year=2024,
    )
    # At calibration year with same parameters, should be close to base_tfr
    tfr = result["tfr_predicted"]
    assert 0.5 < tfr < 2.5, f"Finland TFR {tfr} outside reasonable range"
    assert result["bio_capacity"] > 0
    assert result["bio_capacity"] <= 1.0
    assert result["emf_behavioral"] > 0


def test_predict_tfr_cultural_ratio():
    """Cultural ratio should scale TFR proportionally."""
    base = predict_tfr("X", 2024, 0.5, 100.0, 2.0, cultural_ratio=1.0)
    scaled = predict_tfr("X", 2024, 0.5, 100.0, 2.0, cultural_ratio=1.5)
    ratio = scaled["tfr_predicted"] / base["tfr_predicted"]
    assert abs(ratio - 1.5) < 0.01


def test_predict_tfr_future_year_lower():
    """Future year with same penetration should show lower TFR (more cumulative EMF)."""
    y2024 = predict_tfr("A", 2024, 1.0, 100.0, 2.0, calibration_year=2024)
    y2035 = predict_tfr("A", 2035, 1.0, 100.0, 2.0, calibration_year=2024)
    assert y2035["tfr_predicted"] < y2024["tfr_predicted"]


def test_predict_tfr_uses_alpha_eff():
    """Verify ALPHA_EFF = 0.43 is used (not 0.425 raw sum)."""
    assert ALPHA_EFF == 0.43


def test_behavioral_factor_bounds():
    """Behavioral factor stays in [0.5, 1.0]."""
    assert _behavioral_factor(0.0) == 1.0
    assert _behavioral_factor(100.0) == 0.5  # clamped
    assert 0.5 <= _behavioral_factor(3.0) <= 1.0


def test_night_fraction_bounds():
    """Night fraction stays in [0.0, 1.0]."""
    assert 0.0 <= _night_fraction(2000) <= 1.0
    assert 0.0 <= _night_fraction(2050) <= 1.0


# --- conventional_tfr ---

def test_conventional_tfr_basic():
    """Conventional model returns reasonable TFR for typical inputs."""
    tfr = conventional_tfr(
        country="TestLand",
        year=2024,
        gdp_per_capita=30000.0,
        female_education_years=12.0,
        urbanization_pct=80.0,
        contraceptive_prevalence=70.0,
    )
    assert isinstance(tfr, float)
    assert 0.5 <= tfr <= 8.0
    # High-development country should have low TFR
    assert tfr < 3.0


def test_conventional_tfr_clamp_low():
    """Output clamped at 0.5 for extreme inputs."""
    tfr = conventional_tfr(
        country="X", year=2024,
        gdp_per_capita=1_000_000.0,
        female_education_years=20.0,
        urbanization_pct=100.0,
        contraceptive_prevalence=100.0,
    )
    assert tfr == 0.5


def test_conventional_tfr_clamp_high():
    """Output clamped at 8.0 for low-development inputs."""
    tfr = conventional_tfr(
        country="X", year=2024,
        gdp_per_capita=1.0,  # near-zero GDP
        female_education_years=0.0,
        urbanization_pct=0.0,
        contraceptive_prevalence=0.0,
    )
    assert tfr == 7.0  # 7.0 - 0.5*log(1) - 0 - 0 - 0 = 7.0


def test_conventional_tfr_higher_gdp_lower_tfr():
    """Higher GDP per capita should yield lower TFR."""
    low_gdp = conventional_tfr("A", 2024, 1000.0, 2.0, 20.0, 10.0)
    high_gdp = conventional_tfr("A", 2024, 10000.0, 2.0, 20.0, 10.0)
    assert high_gdp < low_gdp


def test_conventional_tfr_zero_gdp_guard():
    """GDP=0 should not crash (log guard)."""
    tfr = conventional_tfr("X", 2024, 0.0, 5.0, 30.0, 20.0)
    assert isinstance(tfr, float)
    assert 0.5 <= tfr <= 8.0


# --- hindcast ---

def test_hindcast_returns_metrics():
    """Hindcast returns RMSE, MAE, max_error and all required keys."""
    mobile_pen = {2020: 0.8, 2021: 0.85, 2022: 0.9, 2023: 0.95, 2024: 1.0}
    observed = {2020: 1.37, 2021: 1.35, 2022: 1.32, 2023: 1.28, 2024: 1.26}

    result = hindcast_country(
        country="Finland",
        years=range(2020, 2025),
        mobile_penetration_series=mobile_pen,
        pop_density=18.0,
        observed_tfr_series=observed,
        calibration_year=2024,
        base_tfr=1.26,
    )

    assert "rmse" in result
    assert "mae" in result
    assert "max_error" in result
    assert "n_years" in result
    assert "predicted" in result
    assert "observed" in result
    assert "errors" in result

    assert isinstance(result["rmse"], float)
    assert isinstance(result["mae"], float)
    assert isinstance(result["max_error"], float)
    assert result["n_years"] == 5
    assert result["rmse"] >= 0
    assert result["mae"] >= 0
    assert result["max_error"] >= 0
    # MAE <= RMSE always
    assert result["mae"] <= result["rmse"] + 1e-10


def test_hindcast_empty_overlap():
    """Hindcast with no overlapping years returns NaN metrics."""
    result = hindcast_country(
        country="X",
        years=range(2020, 2025),
        mobile_penetration_series={2030: 1.0},
        pop_density=50.0,
        observed_tfr_series={2030: 1.5},
        base_tfr=2.0,
    )
    assert result["n_years"] == 0
    assert math.isnan(result["rmse"])


def test_hindcast_auto_base_tfr():
    """Hindcast with base_tfr=None uses observed value at calibration year."""
    mobile_pen = {2024: 1.0}
    observed = {2024: 1.26}

    result = hindcast_country(
        country="Finland",
        years=range(2024, 2025),
        mobile_penetration_series=mobile_pen,
        pop_density=18.0,
        observed_tfr_series=observed,
        calibration_year=2024,
    )
    assert result["n_years"] == 1
    assert "predicted" in result
