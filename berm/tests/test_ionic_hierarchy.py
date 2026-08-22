"""Tests for the ionic treatment hierarchy diagnostic module."""

from berm.diagnostics.ionic_treatment_hierarchy import (
    IonicDirectness,
    TREATMENT_PROFILES,
    treatment_hierarchy_diagnostic,
    calcium_convergence_paths,
)


def test_hierarchy_order():
    """Treatment hierarchy follows ionic directness."""
    hierarchy = treatment_hierarchy_diagnostic()
    directness_values = [h.ionic_directness for h in hierarchy]
    assert directness_values == sorted(directness_values, reverse=True)


def test_all_converge_on_calcium():
    """All treatment types converge on Ca²⁺ homeostasis."""
    paths = calcium_convergence_paths()
    for treatment, path in paths.items():
        assert "Ca²⁺" in path, f"{treatment}: no Ca²⁺ convergence"


def test_lithium_is_ionic():
    """Lithium's mechanism is ionic, not chemical."""
    li = TREATMENT_PROFILES["lithium"]
    assert li.ionic_directness == IonicDirectness.IONIC_CHRONIC
    assert "VGSC" in li.channel_target


def test_psychedelic_targets_cacna1c():
    """Psychedelic signal chain terminates at Cav1.2 (CACNA1C)."""
    psi = TREATMENT_PROFILES["psilocybin"]
    assert "Cav1.2" in psi.channel_target
    assert "CACNA1C" in psi.channel_target


def test_speed_correlates_with_directness():
    """Faster onset correlates with more direct ionic targeting."""
    ssri = TREATMENT_PROFILES["ssri"]
    psi = TREATMENT_PROFILES["psilocybin"]
    assert psi.onset_hours < ssri.onset_hours


def test_ect_is_ionic_total():
    """ECT is the highest level of ionic intervention."""
    ect = TREATMENT_PROFILES["ect"]
    assert ect.ionic_directness == IonicDirectness.IONIC_TOTAL
    assert ect.ionic_directness > IonicDirectness.IONIC_RESET


def test_ect_fastest_onset():
    """ECT has the fastest onset of all treatments."""
    ect = TREATMENT_PROFILES["ect"]
    for key, profile in TREATMENT_PROFILES.items():
        if key != "ect":
            assert ect.onset_hours <= profile.onset_hours, (
                f"ECT onset ({ect.onset_hours}h) should be <= "
                f"{key} ({profile.onset_hours}h)"
            )
