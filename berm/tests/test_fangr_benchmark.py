"""Tests for the isolated DEFRA FAnGR breeding-structure benchmark."""

from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path

import pytest

from berm.data.fangr_benchmark import (
    ANALYSIS_STATUS,
    F1_F6_ELIGIBILITY,
    MANIFEST_FILENAME,
    OUTPUT_HEADER,
    SOURCE_ID,
    build_fangr_benchmark_artifacts,
    write_fangr_benchmark_artifacts,
)


RAW_HEADER = ",species,breed_name,native,nbs_at_risk_current,bar_current,zr_current,year,population_variable,values\n"


def _write_fixture(tmp_path: Path) -> tuple[Path, Path, Path]:
    data_dir = tmp_path / "data"
    raw_path = data_dir / "raw" / "defra_fangr" / "fixture" / "fangr.csv"
    manifest_path = data_dir / "raw" / "manifests" / MANIFEST_FILENAME
    raw_path.parent.mkdir(parents=True)
    manifest_path.parent.mkdir(parents=True)
    raw_path.write_text(
        RAW_HEADER
        + "1,Cattle,Example Breed,Y,N,N,Y,2000,dams,42\n"
        + "2,Cattle,Example Breed,Y,N,N,Y,2001,dams,\n"
        + "3,Cattle,Example Breed,Y,N,N,Y,2001,sires,4\n",
        encoding="utf-8",
    )
    manifest_path.write_text(
        json.dumps(
            {
                "manifest_id": "fangr_fixture",
                "retrieved_at": "2026-08-19",
                "files": [
                    {
                        "source_id": SOURCE_ID,
                        "path": str(raw_path.relative_to(data_dir)),
                        "bytes": raw_path.stat().st_size,
                        "sha256": hashlib.sha256(raw_path.read_bytes()).hexdigest(),
                        "retrieved_at": "2026-08-19",
                    }
                ],
            }
        ),
        encoding="utf-8",
    )
    return data_dir, raw_path, manifest_path


def test_preserves_missingness_and_refuses_sentinel_interpretation(tmp_path):
    data_dir, raw_path, manifest_path = _write_fixture(tmp_path)
    artifacts = build_fangr_benchmark_artifacts(
        data_dir=data_dir, raw_path=raw_path, manifest_path=manifest_path
    )
    assert len(artifacts.rows) == 3
    assert artifacts.rows[0]["source_value"] == "42"
    assert artifacts.rows[1]["source_value"] == ""
    assert artifacts.rows[1]["value_status"] == "MISSING_IN_SOURCE"
    assert {row["analysis_status"] for row in artifacts.rows} == {ANALYSIS_STATUS}
    assert {row["f1_f6_eligibility"] for row in artifacts.rows} == {F1_F6_ELIGIBILITY}
    assert {row["endpoint_status"] for row in artifacts.rows} == {
        "BREEDING_STRUCTURE_NOT_FERTILITY_OR_SEMEN_ENDPOINT"
    }
    assert {row["rf_status"] for row in artifacts.rows} == {"NOT_MEASURED"}
    assert artifacts.summary["row_counts"] == {
        "raw_rows": 3,
        "normalized_rows": 3,
        "reported_numeric_rows": 2,
        "missing_in_source_rows": 1,
        "species": 1,
        "breeds": 1,
        "reported_series": 2,
        "reported_series_with_at_least_5_years": 0,
    }


def test_write_is_deterministic_and_fail_closed(tmp_path):
    data_dir, raw_path, manifest_path = _write_fixture(tmp_path)
    artifacts = build_fangr_benchmark_artifacts(
        data_dir=data_dir, raw_path=raw_path, manifest_path=manifest_path
    )
    output_path = tmp_path / "out" / "fangr.csv"
    summary_path = tmp_path / "out" / "fangr.json"
    assert write_fangr_benchmark_artifacts(
        artifacts, output_path=output_path, summary_path=summary_path
    ) == {"rows": "WRITTEN_NEW", "summary": "WRITTEN_NEW"}
    assert write_fangr_benchmark_artifacts(
        artifacts, output_path=output_path, summary_path=summary_path
    ) == {"rows": "UNCHANGED_IDENTICAL", "summary": "UNCHANGED_IDENTICAL"}
    rows = list(csv.DictReader(output_path.read_text(encoding="utf-8").splitlines()))
    assert tuple(rows[0]) == OUTPUT_HEADER
    output_path.write_text("review before replacement\n", encoding="utf-8")
    with pytest.raises(FileExistsError, match="refusing to replace"):
        write_fangr_benchmark_artifacts(
            artifacts, output_path=output_path, summary_path=summary_path
        )


def test_held_release_dimensions_when_raw_file_is_available():
    repo_data = Path(__file__).resolve().parent.parent / "data"
    raw_path = (
        repo_data
        / "raw"
        / "defra_fangr"
        / "fangr_2026-08-19"
        / "fangr_timeseries_20260514.csv"
    )
    manifest_path = repo_data / "raw" / "manifests" / MANIFEST_FILENAME
    if not raw_path.exists() or not manifest_path.exists():
        pytest.skip("held FAnGR raw CSV is deliberately gitignored and absent in this checkout")
    artifacts = build_fangr_benchmark_artifacts(
        data_dir=repo_data, raw_path=raw_path, manifest_path=manifest_path
    )
    assert len(artifacts.rows) == 38458
    assert artifacts.summary["row_counts"]["reported_numeric_rows"] == 25390
    assert artifacts.summary["row_counts"]["missing_in_source_rows"] == 13068
    assert artifacts.summary["row_counts"]["species"] == 7
    assert artifacts.summary["row_counts"]["breeds"] == 204
    assert artifacts.summary["coverage"]["year_min"] == 2000
    assert artifacts.summary["coverage"]["year_max"] == 2026


def test_module_cannot_import_sentinel_or_csli_paths():
    module_path = Path(__file__).resolve().parents[1] / "berm" / "data" / "fangr_benchmark.py"
    module_text = module_path.read_text(encoding="utf-8")
    assert "from berm.data.sentinel_normalize import" not in module_text
    assert "from berm.stats.csli import" not in module_text
