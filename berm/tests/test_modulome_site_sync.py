"""The website modulome payload must match what the model computes."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from berm.modulome import MECHANISM_CARDS, MODULOME_VERSION
from export_modulome import OUTPUTS, build_manifest


@pytest.fixture(scope="module")
def manifest() -> dict:
    return build_manifest()


@pytest.mark.parametrize("path", OUTPUTS, ids=lambda path: str(path.parent.name))
def test_exported_payload_is_current(path: Path, manifest: dict):
    assert path.exists(), f"{path} is missing; run python3 berm/export_modulome.py"
    on_disk = json.loads(path.read_text(encoding="utf-8"))
    assert on_disk == manifest, (
        f"{path.name} has drifted from berm.modulome; "
        "run python3 berm/export_modulome.py"
    )


def test_payload_carries_every_card_and_figure(manifest: dict):
    assert manifest["modulomeVersion"] == MODULOME_VERSION
    assert len(manifest["cards"]) == len(MECHANISM_CARDS)
    assert set(manifest["figures"]) == {
        "stateTriad",
        "calcium",
        "window",
        "photonSequence",
        "polarity",
        "feedback",
    }


def test_blocked_store_arms_export_no_late_current_change(manifest: dict):
    arms = manifest["figures"]["calcium"]["arms"]
    assert arms["intact"]["summary"]["lateMembraneCurrentChange"] < 0.0
    assert arms["ryrBlocked"]["summary"]["lateMembraneCurrentChange"] == 0.0
    assert arms["sercaBlocked"]["summary"]["lateMembraneCurrentChange"] == 0.0
    assert arms["ryrBlocked"]["summary"]["firstCalciumResponse"] > 0.0


def test_locked_window_row_is_state_independent(manifest: dict):
    window = manifest["figures"]["window"]
    assert window["lockedWindow"]["centreHz"] == 25.2
    centres = {candidate["centreHz"] for candidate in window["candidates"]}
    assert len(centres) == len(window["candidates"])
    ratios = [candidate["ratioToLocked"] for candidate in window["candidates"]]
    assert max(ratios) > 1.0 > min(ratios)


def test_feedback_series_crosses_the_stability_boundary(manifest: dict):
    series = manifest["figures"]["feedback"]["series"]
    assert series[0]["isStable"] and not series[-1]["isStable"]
    stable_times = [
        item["slowestRecoveryTime"] for item in series if item["slowestRecoveryTime"] is not None
    ]
    assert stable_times == sorted(stable_times)
    assert stable_times[-1] > 5.0 * stable_times[0]


def test_order_reversal_changes_the_photochemical_yield(manifest: dict):
    figure = manifest["figures"]["photonSequence"]
    assert figure["blueThenGreen"][0] > figure["greenThenBlue"][0]
    assert figure["blueThenGreen"] == sorted(figure["blueThenGreen"], reverse=True)


def test_silenced_sensor_keeps_speed_and_loses_direction(manifest: dict):
    arms = manifest["figures"]["polarity"]["arms"]
    assert arms["intact"]["directedness"][-1] > 0.0
    assert set(arms["kcnj15Silenced"]["directedness"]) == {0.0}
    assert arms["kcnj15Silenced"]["migrationSpeed"] == arms["intact"]["migrationSpeed"]
