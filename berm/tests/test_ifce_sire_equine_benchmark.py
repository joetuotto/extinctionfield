"""Tests for the isolated IFCE/SIRE equine breeding benchmark."""

from __future__ import annotations

import csv
import hashlib
import io
import json
from collections import Counter
from pathlib import Path

import pytest

from berm.data.ifce_sire_equine_benchmark import (
    ANALYSIS_STATUS,
    F1_F6_ELIGIBILITY,
    PANEL_HEADER,
    RAW_TABLE_SPECS,
    SOURCE_ID,
    IfceSireEquineBenchmarkArtifacts,
    build_ifce_sire_equine_benchmark_artifacts,
    normalize_equid_breeding_panel,
    validate_raw_inputs,
    write_ifce_sire_equine_benchmark_artifacts,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = REPO_ROOT / "berm" / "data" / "raw" / "equine" / "ifce_sire_2026-08-19"
MANIFEST_PATH = (
    REPO_ROOT
    / "berm"
    / "data"
    / "raw"
    / "manifests"
    / "ifce_sire_equine_breeding_2026-08-19.manifest.json"
)


def test_raw_release_is_manifest_locked_and_has_expected_dimensions():
    result = validate_raw_inputs()
    assert result["manifest_id"] == "ifce_sire_equine_breeding_2026-08-19"
    assert result["files"] == {
        "etalons_actifs.csv": {
            "path": "raw/equine/ifce_sire_2026-08-19/etalons_actifs.csv",
            "bytes": 1244722,
            "sha256": "a651734efd4aba317e761c852faa065383da2566b7219bb4f19b6a0fea658f2b",
        },
        "juments_saillies.csv": {
            "path": "raw/equine/ifce_sire_2026-08-19/juments_saillies.csv",
            "bytes": 1786419,
            "sha256": "1aadfd6f416df96c156d35df33d5e727ed8722c200155beec36d89a828fbcb4e",
        },
        "naissances.csv": {
            "path": "raw/equine/ifce_sire_2026-08-19/naissances.csv",
            "bytes": 1878614,
            "sha256": "7973df461f7c41ef96cec60c87a456b2ec2eff70095824d5e918c4a34aa7c1a3",
        },
    }
    assert result["dimensions_by_metric"] == {
        "mares_bred_count": {
            "raw_rows": 40911,
            "year_min": 2008,
            "year_max": 2024,
            "year_count": 17,
            "department_count": 102,
        },
        "births_count": {
            "raw_rows": 43464,
            "year_min": 2008,
            "year_max": 2024,
            "year_count": 17,
            "department_count": 103,
        },
        "active_stallions_count": {
            "raw_rows": 29851,
            "year_min": 2008,
            "year_max": 2024,
            "year_count": 17,
            "department_count": 99,
        },
    }
    assert result["total_raw_rows"] == 114226


def test_panel_preserves_source_fields_and_keeps_metrics_unjoined():
    rows = normalize_equid_breeding_panel()
    assert len(rows) == 114226
    assert Counter(row["metric"] for row in rows) == {
        "mares_bred_count": 40911,
        "births_count": 43464,
        "active_stallions_count": 29851,
    }
    assert {row["source_id"] for row in rows} == {SOURCE_ID}
    assert {row["analysis_status"] for row in rows} == {ANALYSIS_STATUS}
    assert {row["f1_f6_eligibility"] for row in rows} == {F1_F6_ELIGIBILITY}
    assert {row["geography_level"] for row in rows} == {"SUBNATIONAL1"}
    assert all(isinstance(row["value_count"], int) and row["value_count"] >= 0 for row in rows)
    assert len({row["raw_record_key"] for row in rows}) == len(rows)
    assert {row["metric"] for row in rows if row["raw_artifact"].endswith("juments_saillies.csv")} == {
        "mares_bred_count"
    }
    assert {row["metric"] for row in rows if row["raw_artifact"].endswith("naissances.csv")} == {
        "births_count"
    }
    assert {row["metric"] for row in rows if row["raw_artifact"].endswith("etalons_actifs.csv")} == {
        "active_stallions_count"
    }
    assert "births_per_mare" not in PANEL_HEADER
    assert "fertility_rate" not in PANEL_HEADER
    assert "conception_rate" not in PANEL_HEADER

    expected_geography = {
        "mares_bred_count": "DEPARTEMENT_STATIONNEMENT",
        "births_count": "DEPARTEMENT_LIEU_ELEVAGE",
        "active_stallions_count": "DEPARTEMENT_STATIONNEMENT",
    }
    for spec in RAW_TABLE_SPECS:
        representative = next(row for row in rows if row["metric"] == spec.metric)
        assert representative["source_geography_semantics"] == expected_geography[spec.metric]
        assert json.loads(representative["raw_header_json"]) == list(spec.header)
        raw = json.loads(representative["raw_source_fields_json"])
        assert set(raw) == set(spec.header)
        assert representative["year"] == int(raw[spec.year_field])
        assert representative["department_code"] == raw[spec.department_field]
        assert representative["region_code"] == raw[spec.region_field]
        assert representative["breed_source_value"] == raw[spec.breed_field]
        assert representative["equine_type_source_value"] == raw[spec.equine_type_field]
        assert representative["value_count"] == int(raw[spec.value_field])
        flags = json.loads(representative["quality_flags"])
        assert ANALYSIS_STATUS in flags
        assert "NO_RF_DOSIMETRY" in flags
        assert "NO_DERIVED_BIRTHS_PER_MARE_RATE" in flags
        location_flag = (
            "BREEDING_PLACE_DEPARTMENT_GEOGRAPHY"
            if spec.metric == "births_count"
            else "STATIONING_DEPARTMENT_GEOGRAPHY"
        )
        assert location_flag in flags


def test_build_and_write_are_deterministic_and_fail_closed(tmp_path):
    raw_paths = [RAW_DIR / spec.filename for spec in RAW_TABLE_SPECS]
    before = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in raw_paths}
    first = build_ifce_sire_equine_benchmark_artifacts()
    second = build_ifce_sire_equine_benchmark_artifacts()
    assert first.panel_csv_bytes == second.panel_csv_bytes
    assert first.summary == second.summary
    assert first.summary["analysis_status"] == ANALYSIS_STATUS
    assert first.summary["eligibility"]["f1_f6"] == F1_F6_ELIGIBILITY
    assert first.summary["row_counts"] == {
        "raw_total": 114226,
        "normalized_panel_rows": 114226,
        "by_metric": {
            "mares_bred_count": 40911,
            "births_count": 43464,
            "active_stallions_count": 29851,
        },
    }

    output = tmp_path / "ifce_sire_equid_breeding_panel.csv"
    summary = tmp_path / "ifce_sire_equid_breeding_panel_summary.json"
    first_write = write_ifce_sire_equine_benchmark_artifacts(
        first, output_path=output, summary_path=summary
    )
    assert {entry["status"] for entry in first_write.values()} == {"WRITTEN_NEW"}
    second_write = write_ifce_sire_equine_benchmark_artifacts(
        second, output_path=output, summary_path=summary
    )
    assert {entry["status"] for entry in second_write.values()} == {"UNCHANGED_IDENTICAL"}
    output_rows = list(csv.DictReader(io.StringIO(output.read_text(encoding="utf-8"))))
    assert tuple(output_rows[0]) == PANEL_HEADER
    assert len(output_rows) == 114226
    assert json.loads(summary.read_text(encoding="utf-8")) == first.summary

    changed = IfceSireEquineBenchmarkArtifacts(
        panel_rows=first.panel_rows,
        panel_csv_bytes=b"changed\n",
        summary=first.summary,
    )
    with pytest.raises(FileExistsError, match="refusing to overwrite"):
        write_ifce_sire_equine_benchmark_artifacts(
            changed, output_path=output, summary_path=summary
        )

    blocked_output = tmp_path / "blocked_panel.csv"
    blocked_summary = tmp_path / "blocked_summary.json"
    blocked_summary.write_bytes(b"incompatible summary\n")
    with pytest.raises(FileExistsError, match="refusing to overwrite"):
        write_ifce_sire_equine_benchmark_artifacts(
            first, output_path=blocked_output, summary_path=blocked_summary
        )
    assert not blocked_output.exists()
    after = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in raw_paths}
    assert after == before


def test_corrupt_manifest_checksum_is_rejected_before_normalization(tmp_path):
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    manifest["files"][0]["sha256"] = "0" * 64
    corrupt_manifest = tmp_path / "corrupt.manifest.json"
    corrupt_manifest.write_text(json.dumps(manifest), encoding="utf-8")
    with pytest.raises(ValueError, match="raw checksum mismatch"):
        validate_raw_inputs(manifest_path=corrupt_manifest)


def test_schema_and_module_refuse_sentinel_and_shared_registry_integration():
    schema_path = (
        REPO_ROOT
        / "berm"
        / "data"
        / "schemas"
        / "ifce_sire_equine_breeding_benchmark.schema.json"
    )
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    assert schema["properties"]["analysis_status"]["const"] == ANALYSIS_STATUS
    assert schema["properties"]["eligibility"]["properties"]["f1_f6"]["const"] == (
        F1_F6_ELIGIBILITY
    )
    assert schema["properties"]["output"]["properties"]["form"]["const"] == (
        "long_metric_specific_rows_no_cross_table_join"
    )
    module_path = REPO_ROOT / "berm" / "berm" / "data" / "ifce_sire_equine_benchmark.py"
    module_text = module_path.read_text(encoding="utf-8")
    assert "from berm.data.registry import" not in module_text
    assert "source_registry" not in module_text
    assert "from berm.data.sentinel_normalize import" not in module_text
    assert "from berm.stats.csli import" not in module_text
