"""Tests for frozen Core-51 derivation and broader data-availability tiers."""

from __future__ import annotations

import json

from berm.data.cohorts import (
    TIER_SCHEMA_VERSION,
    classify_extended,
    classify_global,
    classify_tiers,
    derive_locked_core_countries,
    write_tier_classification,
)
from berm.data.global_panel import GLOBAL_PANEL_SCHEMA_VERSION


def _iso(index: int) -> str:
    return "A" + chr(65 + index // 26) + chr(65 + index % 26)


def _core_artifact(path):
    names = [f"published-{i}" for i in range(51)]
    results = {name: {"rmse": 0.1} for name in names}
    panel = {name: {"iso3": _iso(i)} for i, name in enumerate(names)}
    path.write_text(json.dumps({
        "scenarios": {"one": {"country_results": results}, "two": {"country_results": results}},
        "panel": {"panels": panel},
    }), encoding="utf-8")
    return tuple(_iso(i) for i in range(51))


def _country(*, mobile_missing_after: int | None = None):
    years = {}
    for year in range(1990, 2025):
        mobile = None if mobile_missing_after is not None and year > mobile_missing_after else 0.0
        years[str(year)] = {
            "tfr": 2.0,
            "tfr_measurement_type": "OBSERVED",
            "mobile_per_100": mobile,
            "urban_pct": 40.0,
            "gdp_ppp_per_capita": 1_000.0,
        }
    return {"years": years}


def _panel():
    return {
        "schema_version": GLOBAL_PANEL_SCHEMA_VERSION,
        "countries": {
            "AAA": _country(),
            "FRA": _country(),
            "ZZZ": _country(mobile_missing_after=2005),
        },
    }


def test_core_is_derived_from_published_country_result_keys_not_a_prompt_list(tmp_path):
    artifact = tmp_path / "rolling_backtest.json"
    expected = _core_artifact(artifact)
    assert derive_locked_core_countries(artifact) == tuple(sorted(expected))


def test_tier_thresholds_count_reported_zero_mobile_as_available(tmp_path):
    artifact = tmp_path / "rolling_backtest.json"
    _core_artifact(artifact)
    panel = _panel()
    extended = classify_extended(panel)
    global_tier = classify_global(panel)
    assert "AAA" in extended["members"]
    assert "FRA" in extended["members"]
    assert "ZZZ" not in extended["members"]
    assert extended["coverage"]["AAA"]["counts"]["mobile_per_100"] == 35
    # Global requires 15 mobile years, so deliberately incomplete ZZZ must not qualify.
    assert "ZZZ" not in global_tier["members"]

    tiers = classify_tiers(panel, core_artifact_path=artifact)
    assert tiers["schema_version"] == TIER_SCHEMA_VERSION
    assert tiers["core"]["count"] == 51
    assert tiers["six_previously_excluded_country_audit"]["FRA"]["in_frozen_core"] is False
    assert tiers["six_previously_excluded_country_audit"]["FRA"]["in_extended"] is True


def test_tier_write_is_immutable_but_idempotent(tmp_path):
    artifact = tmp_path / "rolling_backtest.json"
    _core_artifact(artifact)
    tiers = classify_tiers(_panel(), core_artifact_path=artifact)
    output = tmp_path / "tiers.json"
    assert write_tier_classification(tiers, output_path=output)["status"] == "WRITTEN_NEW"
    assert write_tier_classification(tiers, output_path=output)["status"] == "UNCHANGED_IDENTICAL"
