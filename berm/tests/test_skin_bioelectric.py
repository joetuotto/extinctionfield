"""Tests for the skin bioelectric diagnostic module."""

from berm.diagnostics.skin_bioelectric import (
    SKIN_SENSORS,
    tep_perturbation,
    piezoelectric_noise,
    wound_healing_delay,
    skin_convergence_points,
    ehs_skin_mechanism,
)


def test_all_sensors_emf_susceptible():
    """All skin sensor channels are susceptible to EMF."""
    for key, sensor in SKIN_SENSORS.items():
        assert sensor.emf_susceptible, f"{key}: should be EMF susceptible"


def test_tep_decreases_with_emf():
    """TEP decreases under EMF exposure."""
    result = tep_perturbation(5.0)
    assert result["tep_change_mv"] < 0
    assert result["new_tep_mv"] < result["baseline_tep_mv"]


def test_tep_zero_field_no_change():
    """Zero EMF produces no TEP change."""
    result = tep_perturbation(0.0)
    assert result["tep_change_mv"] == 0.0
    assert result["new_tep_mv"] == result["baseline_tep_mv"]


def test_piezoelectric_snr_degrades_with_emf():
    """Touch signal-to-noise ratio degrades under EMF."""
    clean = piezoelectric_noise(0.0, 0.0)
    noisy = piezoelectric_noise(1000.0, 5.0)
    assert noisy["signal_to_noise"] < clean["signal_to_noise"]


def test_wound_healing_delayed_by_emf():
    """EMF exposure delays wound healing."""
    result = wound_healing_delay(10.0)
    assert result["delay_factor"] > 1.0
    assert result["delay_pct"] > 0


def test_wound_healing_no_delay_at_zero():
    """No wound healing delay without EMF."""
    result = wound_healing_delay(0.0)
    assert result["delay_factor"] == 1.0
    assert result["delay_pct"] == 0.0


def test_three_convergence_points():
    """Three independent convergence points all reference Ca²⁺."""
    points = skin_convergence_points()
    assert len(points) == 3
    for key, desc in points.items():
        assert "Ca²⁺" in desc, f"{key}: must converge on Ca²⁺"


def test_ehs_mechanism_has_predictions():
    """EHS mechanism includes testable predictions P17 and P18."""
    mech = ehs_skin_mechanism()
    assert "P17" in mech["testable_predictions"]
    assert "P18" in mech["testable_predictions"]
    assert len(mech["symptoms"]) >= 4
    assert len(mech["mechanism_chain"]) >= 4
