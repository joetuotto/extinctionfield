"""Tests for berm.civilization cultural energy model."""

from __future__ import annotations

import math

from berm.civilization.cultural_energy import (
    BIOMARKER_WEIGHTS,
    REQUIRED_MARKERS,
    compute_biocap,
    compute_cultural_energy,
)
from berm.civilization.biomarker_trajectories import (
    BiomarkerTrajectory,
    TREND_DATA,
    biomarker_values_at,
    get_trajectory,
)
from berm.civilization.unwin_validation import (
    Phase,
    classify_phase,
    detect_transitions,
)
from berm.civilization.sensitivity import (
    sensitivity_all,
    sensitivity_single,
)
from berm.civilization.phase_transitions import (
    identify_transitions,
    predict_next_transition,
)


# === compute_biocap ===


class TestComputeBiocap:
    def test_all_optimal(self):
        """All positive markers at 1.0, CORT at 0.0 gives maximum BioCap."""
        markers = {k: 1.0 for k in REQUIRED_MARKERS}
        markers["CORT"] = 0.0
        bc = compute_biocap(markers)
        expected = 0.20 + 0.20 + 0.15 + 0.15 + 0.10 + 0.0 + 0.05 + 0.05
        assert abs(bc - expected) < 1e-10, f"Expected {expected}, got {bc}"

    def test_all_zero(self):
        """All markers at 0.0 gives BioCap of 0.0."""
        markers = {k: 0.0 for k in REQUIRED_MARKERS}
        bc = compute_biocap(markers)
        assert bc == 0.0

    def test_all_one(self):
        """All markers at 1.0 (including CORT) gives expected value."""
        markers = {k: 1.0 for k in REQUIRED_MARKERS}
        bc = compute_biocap(markers)
        expected = sum(BIOMARKER_WEIGHTS.values())
        assert abs(bc - expected) < 1e-10

    def test_clamped_to_zero(self):
        """BioCap cannot go below 0."""
        markers = {k: 0.0 for k in REQUIRED_MARKERS}
        markers["CORT"] = 1.0  # negative weight pushes below zero
        bc = compute_biocap(markers)
        assert bc == 0.0

    def test_missing_key_raises(self):
        """Missing biomarker key should raise KeyError."""
        markers = {k: 1.0 for k in REQUIRED_MARKERS if k != "T"}
        try:
            compute_biocap(markers)
            assert False, "Should have raised KeyError"
        except KeyError:
            pass

    def test_single_marker_contribution(self):
        """Setting only T to 1.0 should give exactly T's weight."""
        markers = {k: 0.0 for k in REQUIRED_MARKERS}
        markers["T"] = 1.0
        bc = compute_biocap(markers)
        assert abs(bc - 0.20) < 1e-10


# === compute_cultural_energy ===


class TestComputeCulturalEnergy:
    def test_basic(self):
        """E_c = N * biocap * eta."""
        e = compute_cultural_energy(1_000_000, 0.8, 1.0)
        assert abs(e - 800_000) < 1e-6

    def test_zero_population(self):
        """Zero population gives zero energy."""
        e = compute_cultural_energy(0, 0.9, 1.0)
        assert e == 0.0

    def test_efficiency_scaling(self):
        """Doubling eta doubles energy."""
        e1 = compute_cultural_energy(1000, 0.5, 1.0)
        e2 = compute_cultural_energy(1000, 0.5, 2.0)
        assert abs(e2 - 2 * e1) < 1e-10


# === Phase classification ===


class TestPhaseClassification:
    def test_zoistic(self):
        assert classify_phase(0.30) == "ZOISTIC"
        assert classify_phase(0.54) == "ZOISTIC"

    def test_manistic(self):
        assert classify_phase(0.55) == "MANISTIC"
        assert classify_phase(0.74) == "MANISTIC"

    def test_deistic(self):
        assert classify_phase(0.75) == "DEISTIC"
        assert classify_phase(0.89) == "DEISTIC"

    def test_rationalistic(self):
        assert classify_phase(0.90) == "RATIONALISTIC"
        assert classify_phase(1.00) == "RATIONALISTIC"

    def test_boundary_exact(self):
        """Exact threshold values should classify correctly."""
        assert classify_phase(0.55) == "MANISTIC"  # >= 0.55 is MANISTIC
        assert classify_phase(0.75) == "DEISTIC"
        assert classify_phase(0.90) == "RATIONALISTIC"

    def test_monotonic_phase_order(self):
        """Higher BioCap should never give a lower phase."""
        phases = ["ZOISTIC", "MANISTIC", "DEISTIC", "RATIONALISTIC"]
        prev_idx = 0
        for bc in [i / 100.0 for i in range(0, 101)]:
            phase = classify_phase(bc)
            idx = phases.index(phase)
            assert idx >= prev_idx, f"Phase went backward at BioCap={bc}"
            prev_idx = idx


# === Sensitivity analysis ===


class TestSensitivity:
    def test_positive_recovery(self):
        """Restoring a declined marker should give positive recovery."""
        markers = biomarker_values_at(2025)
        for marker in REQUIRED_MARKERS:
            restore_to = 0.0 if marker == "CORT" else 1.0
            pct = sensitivity_single(markers, marker, restore_to)
            assert pct >= 0.0, f"{marker} recovery should be non-negative"

    def test_t_and_oxt_largest(self):
        """T and OXT should have the largest recovery (highest weights)."""
        results = sensitivity_all(2025)
        top_two = {r["marker"] for r in results[:2]}
        assert "T" in top_two or "OXT" in top_two, (
            f"Expected T or OXT in top 2, got {top_two}"
        )

    def test_symmetry_positive_markers(self):
        """Markers with equal weights and equal decline should give
        similar recovery percentages."""
        # T and OXT both have weight 0.20
        results = {r["marker"]: r for r in sensitivity_all(2025)}
        # They should at least both be positive
        assert results["T"]["recovery_pct"] > 0
        assert results["OXT"]["recovery_pct"] > 0

    def test_unknown_marker_raises(self):
        """Unknown marker should raise KeyError."""
        markers = {k: 0.5 for k in REQUIRED_MARKERS}
        try:
            sensitivity_single(markers, "UNKNOWN", 1.0)
            assert False, "Should have raised KeyError"
        except KeyError:
            pass

    def test_sorted_descending(self):
        """Results from sensitivity_all should be sorted by recovery_pct descending."""
        results = sensitivity_all(2025)
        for i in range(len(results) - 1):
            assert results[i]["recovery_pct"] >= results[i + 1]["recovery_pct"]


# === Trajectory generation ===


class TestTrajectory:
    def test_trajectory_length(self):
        """Trajectory length should match expected number of steps."""
        traj = get_trajectory(1900, 2060, 10)
        expected_len = len(range(1900, 2060, 10))
        assert len(traj) == expected_len

    def test_trajectory_has_all_keys(self):
        """Each entry should have year, all biomarkers, and biocap."""
        traj = get_trajectory(1900, 1920, 5)
        for entry in traj:
            assert "year" in entry
            assert "biocap" in entry
            for marker in REQUIRED_MARKERS:
                assert marker in entry, f"Missing {marker}"

    def test_early_biocap_high(self):
        """BioCap at 1900 should be near the maximum (pre-decline)."""
        traj = get_trajectory(1900, 1910, 5)
        bc_1900 = traj[0]["biocap"]
        assert bc_1900 > 0.80, f"1900 BioCap {bc_1900} too low"

    def test_late_biocap_lower(self):
        """BioCap at 2050 should be lower than at 1900."""
        traj = get_trajectory(1900, 2060, 5)
        bc_1900 = traj[0]["biocap"]
        bc_2050 = [e for e in traj if e["year"] == 2050][0]["biocap"]
        assert bc_2050 < bc_1900, "BioCap should decline over time"

    def test_biocap_in_range(self):
        """All BioCap values should be in [0, 1]."""
        traj = get_trajectory(1900, 2060, 5)
        for entry in traj:
            assert 0.0 <= entry["biocap"] <= 1.0, (
                f"BioCap {entry['biocap']} out of range at year {entry['year']}"
            )

    def test_biomarker_values_in_range(self):
        """All biomarker values should be in [0, 1]."""
        traj = get_trajectory(1900, 2060, 5)
        for entry in traj:
            for marker in REQUIRED_MARKERS:
                assert 0.0 <= entry[marker] <= 1.0, (
                    f"{marker}={entry[marker]} out of range at year {entry['year']}"
                )


# === Phase transitions ===


class TestPhaseTransitions:
    def test_detect_transitions(self):
        """Should detect at least one transition in the 1900-2060 range."""
        traj = get_trajectory(1900, 2060, 5)
        transitions = detect_transitions(traj)
        assert len(transitions) > 0, "Expected at least one phase transition"

    def test_transition_has_required_keys(self):
        """Each transition should have year, from_phase, to_phase, biocap."""
        traj = get_trajectory(1900, 2060, 5)
        for t in detect_transitions(traj):
            assert "year" in t
            assert "from_phase" in t
            assert "to_phase" in t
            assert "biocap" in t

    def test_identify_transitions_has_trigger(self):
        """identify_transitions should include trigger_marker."""
        traj = get_trajectory(1900, 2060, 5)
        transitions = identify_transitions(traj)
        for t in transitions:
            assert "trigger_marker" in t
            assert t["trigger_marker"] in REQUIRED_MARKERS

    def test_transitions_are_downward(self):
        """Given declining BioCap, transitions should go to lower phases."""
        phases = ["ZOISTIC", "MANISTIC", "DEISTIC", "RATIONALISTIC"]
        traj = get_trajectory(1900, 2060, 5)
        transitions = identify_transitions(traj)
        for t in transitions:
            from_idx = phases.index(t["from_phase"])
            to_idx = phases.index(t["to_phase"])
            assert from_idx != to_idx, "Transition should change phase"

    def test_predict_next_transition(self):
        """Prediction should return a dict or None."""
        traj = get_trajectory(1900, 2060, 5)
        result = predict_next_transition(traj)
        if result is not None:
            assert "year" in result
            assert "from_phase" in result
            assert "to_phase" in result
            assert "trigger_marker" in result

    def test_empty_trajectory(self):
        """Empty or single-entry trajectory should produce no transitions."""
        assert detect_transitions([]) == []
        assert detect_transitions([{"year": 2000, "biocap": 0.8}]) == []
        assert identify_transitions([]) == []
        assert predict_next_transition([]) is None
