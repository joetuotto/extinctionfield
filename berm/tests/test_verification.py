"""V17 model verification tests.

Adapted from Wolfram v16Verification. Tests model self-consistency,
cross-country ordering, boundary conditions, and locked predictions.
"""

import math

from berm.model import (
    predict_country_year,
    community_fit_function,
    berm_sigmoid_v7,
    density_weighted_tfr_with_personal,
    cultural_component,
    ivf_share_projected,
    native_tfr,
)
from berm.exposure.personal import (
    two_component_emf,
    tech_penetration_profile,
    cohort_weighted_exposure,
)
from berm.exposure.ambient import (
    effective_emf_field,
    get_attenuation_factor,
)
from berm.biology.pathways import total_effect, pathway_f
from berm.config import LOCKED_PREDICTIONS, ALPHA_EFF, TBE_FRACTION
from berm.data.countries import HISTORICAL_TFR, COUNTRY_PARAMS


# === Output completeness ===

def test_output_keys_complete():
    """All intermediate values must be present in output."""
    r = predict_country_year("SouthKorea", 2024)
    required = {
        "country", "year", "ambient_emf", "personal_emf", "combined_emf",
        "personal_fraction", "circadian_adjusted_emf", "cohort_index",
        "proximity_multiplier", "bio_sigmoid_tfr", "cultural_component",
        "predicted_tfr", "ivf_share", "biological_tfr", "mobile_pen",
    }
    assert set(r.keys()) == required


# === Self-consistency ===

def test_predicted_equals_biosig_plus_cultural():
    """PredictedTFR = BiologicalSigmoidTFR + CulturalComponent."""
    for c in ["SouthKorea", "Finland", "Nigeria", "USA", "Japan"]:
        r = predict_country_year(c, 2024)
        expected = r["bio_sigmoid_tfr"] + r["cultural_component"]
        assert abs(r["predicted_tfr"] - expected) < 1e-10, f"{c}: {r['predicted_tfr']} != {expected}"


def test_biological_tfr_less_than_predicted():
    """BiologicalTFR (IVF-corrected) <= PredictedTFR."""
    for c in ["SouthKorea", "Finland", "Denmark"]:
        r = predict_country_year(c, 2024)
        assert r["biological_tfr"] <= r["predicted_tfr"]


def test_alpha_is_043():
    assert abs(ALPHA_EFF - 0.43) < 0.001


def test_tbe_fraction_030():
    assert abs(TBE_FRACTION - 0.30) < 0.001


# === Cross-country ordering ===

def test_high_emf_gives_low_tfr():
    """Higher combined EMF country should have lower bio sigmoid TFR."""
    kr = predict_country_year("SouthKorea", 2024)
    fi = predict_country_year("Finland", 2024)
    assert kr["combined_emf"] > fi["combined_emf"]
    assert kr["bio_sigmoid_tfr"] < fi["bio_sigmoid_tfr"]


def test_korea_lower_than_niger():
    kr = predict_country_year("SouthKorea", 2024)
    ng = predict_country_year("Nigeria", 2024)
    assert kr["predicted_tfr"] < ng["predicted_tfr"]


def test_nigeria_above_3():
    r = predict_country_year("Nigeria", 2024)
    assert r["predicted_tfr"] > 3.0


def test_korea_below_1():
    r = predict_country_year("SouthKorea", 2024)
    assert r["predicted_tfr"] < 1.0


# === Sigmoid boundary conditions ===

def test_sigmoid_near_zero_gives_high_tfr():
    """Near-zero EMF should give TFR close to 6.5 (Amish baseline)."""
    tfr = community_fit_function(0.001)
    assert abs(tfr - 6.5) < 0.3


def test_sigmoid_high_emf_gives_low_tfr():
    """Very high EMF should saturate TFR near minimum."""
    tfr = community_fit_function(2.0)
    assert tfr < 0.5


def test_sigmoid_monotonically_decreasing():
    """TFR must strictly decrease with EMF."""
    emfs = [0.001, 0.01, 0.05, 0.1, 0.3, 0.5, 0.8, 1.0, 1.5, 2.0]
    tfrs = [community_fit_function(e) for e in emfs]
    for i in range(len(tfrs) - 1):
        assert tfrs[i] > tfrs[i + 1], f"Not monotone at EMF {emfs[i]}"


def test_v7_sigmoid_calibration_points():
    """V7 sigmoid should reproduce its calibration points."""
    cal_points = [
        (0.001, 6.5),
        (0.05, 6.4),
        (0.287, 2.8),
        (0.599, 1.52),
        (2.404, 0.89),
    ]
    for emf, expected_tfr in cal_points:
        pred = berm_sigmoid_v7(emf)
        assert abs(pred - expected_tfr) < 0.15, (
            f"V7 sigmoid at EMF={emf}: {pred:.3f} vs expected {expected_tfr}"
        )


# === EMF field properties ===

def test_emf_field_saturates_at_2():
    """Ambient EMF must not exceed 2.0 (tanh saturation)."""
    for dens in [1000, 10000, 50000]:
        assert effective_emf_field(1.0, dens, 0.95) <= 2.0


def test_emf_field_increases_with_density():
    low = effective_emf_field(1.0, 10.0, 0.5)
    high = effective_emf_field(1.0, 1000.0, 0.5)
    assert high > low


# === Attenuation properties ===

def test_attenuation_bounded():
    """Attenuation factors must be in (0, 1]."""
    for c in COUNTRY_PARAMS:
        a = get_attenuation_factor(c)
        assert 0 < a <= 1.0, f"{c}: attenuation {a} out of bounds"


def test_attenuation_finland_higher_than_nigeria():
    assert get_attenuation_factor("Finland") > get_attenuation_factor("Nigeria")


# === Cohort exposure properties ===

def test_cohort_exposure_increases_over_time():
    """Cohort exposure should increase as more years are EMF-exposed."""
    early = cohort_weighted_exposure("Finland", 2005)
    late = cohort_weighted_exposure("Finland", 2024)
    assert late > early


# === Pathway properties ===

def test_pathways_ad_negative():
    """Pathways A-D should produce negative (harmful) effect."""
    result = total_effect(0.5)
    assert result["pathway_ad"] < 0


def test_pathway_e_negative():
    result = total_effect(0.5)
    assert result["pathway_e"] < 0


def test_pathway_f_multiplier_above_1():
    """BBB permeability multiplier should amplify chemical effects."""
    result = pathway_f(0.5)
    assert result["multiplier"] > 1.0


def test_berm_share_bounded():
    """BERM attribution share must be in [0, 1]."""
    for emf in [0.1, 0.3, 0.5, 0.8, 1.0]:
        result = total_effect(emf)
        assert 0 <= result["berm_share"] <= 1.0


# === IVF properties ===

def test_ivf_bounded():
    """IVF share must be in [0, 0.20]."""
    for c in COUNTRY_PARAMS:
        ivf = ivf_share_projected(c, 2024)
        assert 0 <= ivf <= 0.20


def test_ivf_increases_over_time():
    early = ivf_share_projected("Denmark", 2023)
    late = ivf_share_projected("Denmark", 2033)
    assert late > early


# === Native TFR ===

def test_native_lower_with_immigration():
    """Countries with immigrant TFR > native should have native < total."""
    for c in ["Finland", "Denmark", "USA"]:
        r = predict_country_year(c, 2024)
        nt = native_tfr(c, r["predicted_tfr"])
        assert nt < r["predicted_tfr"], f"{c}: native {nt} >= predicted {r['predicted_tfr']}"


# === Tech penetration ===

def test_all_countries_have_params():
    """Every country in COUNTRY_PARAMS should produce a prediction."""
    for c in COUNTRY_PARAMS:
        try:
            r = predict_country_year(c, 2024)
            assert r["predicted_tfr"] >= 0
        except Exception as e:
            raise AssertionError(f"{c} failed: {e}")


# === Locked predictions ===

def test_locked_predictions_immutable():
    for p in LOCKED_PREDICTIONS:
        try:
            p.central = 0.0
            raise AssertionError(f"Prediction for {p.country} {p.year} is mutable")
        except AttributeError:
            pass


def test_locked_ci_valid():
    """CI_Low < Central < CI_High for all locked predictions."""
    for p in LOCKED_PREDICTIONS:
        assert p.ci_low < p.central < p.ci_high, (
            f"{p.country} {p.year}: {p.ci_low} < {p.central} < {p.ci_high}"
        )


def test_locked_predictions_minimum_count():
    assert len(LOCKED_PREDICTIONS) >= 7
