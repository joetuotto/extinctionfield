"""Website examples must remain identical to the executable BERM model."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path

import pytest


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "coordination_export", ROOT / "berm" / "export_biological_coordination.py"
)
assert SPEC and SPEC.loader
EXPORTER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(EXPORTER)


@pytest.fixture(scope="module")
def payload():
    return EXPORTER.build_coordination_export()


def test_both_website_mirrors_are_exactly_reproducible():
    expected = EXPORTER.serialized_export()
    for path in EXPORTER.OUTPUTS:
        assert path.read_text(encoding="utf-8") == expected, (
            f"{path} drifted from the model; run python3 berm/export_biological_coordination.py"
        )
    assert EXPORTER.serialized_export() == expected


def test_examples_cannot_be_mistaken_for_calibrated_forecasts(payload):
    assert payload["metadata"]["calibrationStatus"] == "STRUCTURAL_ONLY"
    assert payload["metadata"]["forecastCalibration"] is False
    assert "illustrative" in payload["metadata"]["inputOrigin"]
    assert payload["waiting"]["endpoint"] == "first conception"
    json.dumps(payload, allow_nan=False)


def test_plotted_hormone_response_integrates_to_the_analytic_value(payload):
    for scenario in payload["hormoneTiming"]["scenarios"]:
        points = scenario["series"]
        integral = sum(
            (right["hour"] - left["hour"])
            * (left["instantResponse"] + right["instantResponse"]) / 2
            for left, right in zip(points, points[1:])
        )
        assert integral / 24 == pytest.approx(scenario["averageResponse"], abs=2e-8)
    aligned, quarter, opposed = payload["hormoneTiming"]["scenarios"]
    assert aligned["averageResponse"] == pytest.approx(1.125)
    assert quarter["averageResponse"] == pytest.approx(1.0)
    assert opposed["averageResponse"] == pytest.approx(0.875)


def test_equal_initial_means_preserve_the_heterogeneous_waiting_tail(payload):
    equal, mixed = payload["waiting"]["scenarios"]
    assert equal["meanProbability"] == mixed["meanProbability"] == 0.2
    assert equal["cumulativeByCycle"][12]["probability"] == pytest.approx(0.93128052)
    assert mixed["cumulativeByCycle"][12]["probability"] == pytest.approx(0.85186459)
    for scenario in (equal, mixed):
        curve = scenario["cumulativeByCycle"]
        assert curve[0]["probability"] == 0
        for point in curve:
            assert point["probability"] + point["remainingShare"] == pytest.approx(1)
        assert all(a["probability"] <= b["probability"] for a, b in zip(curve, curve[1:]))
    assert mixed["cumulativeByCycle"][-1]["conditionalProbability"] < 0.2


def test_pulse_time_units_and_conditional_gates_are_explicit(payload):
    frequent, spaced = payload["recovery"]["scenarios"]
    assert frequent["steadyPostPulse"] == pytest.approx(10.50833194)
    assert spaced["steadyPostPulse"] == pytest.approx(1.05239570)
    assert frequent["points"][-1]["timeOverTau"] == 6
    assert spaced["points"][-1]["timeOverTau"] == 180
    assert payload["gates"]["jointProbability"] == pytest.approx(0.59049)
