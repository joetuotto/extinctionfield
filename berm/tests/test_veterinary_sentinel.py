"""Tests for the isolated Fielding Goa veterinary-sentinel ingest.

The fixture exercises the full checksum and contract path without depending on
the locally held, gitignored source release.  A second test verifies the exact
held release when it is present in a research checkout.
"""

from __future__ import annotations

import csv
import hashlib
import io
import json
from collections import Counter
from pathlib import Path

import pytest

from berm.data.contracts import CANONICAL_TABLES, GeographyLevel, Sex, validate_rows
from berm.data.registry import known_source_ids
from berm.data.veterinary_sentinel import (
    AGE_FILENAME,
    DATA_DIR,
    LACTATION_FILENAME,
    MANIFEST_FILENAME,
    RAW_RELEASE_DIRNAME,
    README_FILENAME,
    SOURCE_ID,
    build_fielding_goa_artifacts,
    normalize_fielding_goa_rows,
    write_fielding_goa_artifacts,
)


def _sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _write_fixture(tmp_path: Path) -> tuple[Path, Path]:
    """Write a minimal, internally matched source release plus manifest."""
    data_dir = tmp_path / "data"
    release_dir = data_dir / "raw" / "veterinary" / RAW_RELEASE_DIRNAME
    manifest_path = data_dir / "raw" / "manifests" / MANIFEST_FILENAME
    release_dir.mkdir(parents=True)
    manifest_path.parent.mkdir(parents=True)

    (release_dir / README_FILENAME).write_text("fixture release notes\n", encoding="utf-8")
    (release_dir / AGE_FILENAME).write_text(
        "round,order,study_site,am_pm,adult,juv,puppy,first_survey,rain,"
        "rain_bin,scale_dp,scale_dp_factor,month_adj,daysPost,SiteType,SitePair,"
        "rpt_id,monsoon,routeKM,dog_dens_km2area\n"
        "2,1,1,am,10,2,3,2021-01-02T03:04:00Z,0.5,1,0,1,1,5,Control,1,1,0,2,4.5\n",
        encoding="utf-8",
    )
    (release_dir / LACTATION_FILENAME).write_text(
        "round,order,study_site,am_pm,ssLact,ssNon,ssTotal,date,rain,rain_bin,"
        "scale_dp,scale_dp_factor,routeKM,month_adj,daysPost,SiteType,SitePair,"
        "rpt_id,dog_dens_scl_factor,dog_dens_scl,monsoon\n"
        "2,1,1,am,2,8,10,2021-01-02T03:04:00Z,0.5,1,0,1,2,1,5,Control,1,1,2.25,3.5,0\n",
        encoding="utf-8",
    )

    files = []
    for name in (README_FILENAME, AGE_FILENAME, LACTATION_FILENAME):
        path = release_dir / name
        files.append({
            "source_id": SOURCE_ID,
            "path": str(path.relative_to(data_dir)),
            "original_filename": name,
            "bytes": path.stat().st_size,
            "sha256": _sha256(path),
            "retrieved_at": "2026-08-19",
            "source_url": "https://example.invalid/fielding-fixture",
            "publisher_reported_md5": "fixture",
            "note": "test fixture",
        })
    manifest_path.write_text(json.dumps({"files": files}), encoding="utf-8")
    return data_dir, manifest_path


def test_veterinary_contract_declares_time_site_grain_and_count_unit():
    spec = CANONICAL_TABLES["veterinary_sentinel_species_site_time"]
    assert spec.grain == ("geography_id", "observation_datetime", "species", "endpoint")
    assert spec.units == {"count"}
    assert {"species", "endpoint", "observation_datetime", "raw_record_key"} <= set(spec.extra_columns)


def test_fixture_normalizes_direct_counts_and_preserves_missing_rf_status(tmp_path):
    data_dir, manifest_path = _write_fixture(tmp_path)
    rows = normalize_fielding_goa_rows(data_dir=data_dir, manifest_path=manifest_path)

    assert len(rows) == 2
    assert {row["source_id"] for row in rows} == {SOURCE_ID}
    assert {row["geography_id"] for row in rows} == {"IND-GOA-S01"}
    assert {row["geography_level"] for row in rows} == {GeographyLevel.SITE.value}
    assert Counter(row["endpoint"] for row in rows) == {
        "puppy_count": 1,
        "lactating_female_count": 1,
    }
    assert {row["sex"] for row in rows if row["endpoint"] == "puppy_count"} == {Sex.NA.value}
    assert {row["sex"] for row in rows if row["endpoint"] == "lactating_female_count"} == {Sex.FEMALE.value}
    assert {row["value"] for row in rows} == {2, 3}
    assert all(row["unit"] == "count" for row in rows)
    assert all(row["rf_status"] == "NOT_MEASURED" for row in rows)
    assert all(row["geography_match_status"] == "ANONYMISED_SITE_NO_EXTERNAL_RF_OR_HUMAN_JOIN" for row in rows)
    assert all(row["proxy_flag"] is False and row["imputation_flag"] is False for row in rows)
    assert validate_rows(
        rows,
        "veterinary_sentinel_species_site_time",
        known_source_ids=known_source_ids(),
    ) == []


def test_fixture_build_is_deterministic_and_writes_fail_closed(tmp_path):
    data_dir, manifest_path = _write_fixture(tmp_path)
    output = tmp_path / "out" / "veterinary.csv"
    summary = tmp_path / "out" / "veterinary-summary.json"
    raw_paths = [
        data_dir / "raw" / "veterinary" / RAW_RELEASE_DIRNAME / name
        for name in (README_FILENAME, AGE_FILENAME, LACTATION_FILENAME)
    ]
    before = {path: _sha256(path) for path in raw_paths}

    first = build_fielding_goa_artifacts(
        data_dir=data_dir,
        manifest_path=manifest_path,
        output_path=output,
    )
    second = build_fielding_goa_artifacts(
        data_dir=data_dir,
        manifest_path=manifest_path,
        output_path=output,
    )
    assert first.csv_bytes == second.csv_bytes
    assert first.summary == second.summary
    assert first.summary["status"] == "CONTEXT_ONLY_NOT_CSLI_ELIGIBLE"
    assert first.summary["canonical_artifact"]["row_count"] == 2
    assert all(value["status"] == "BLOCKED" for value in first.summary["f_test_readiness"].values())

    first_write = write_fielding_goa_artifacts(first, output_path=output, summary_path=summary)
    assert first_write == {"csv": "WRITTEN_NEW", "summary": "WRITTEN_NEW"}
    second_write = write_fielding_goa_artifacts(second, output_path=output, summary_path=summary)
    assert second_write == {"csv": "UNCHANGED_IDENTICAL", "summary": "UNCHANGED_IDENTICAL"}
    parsed = list(csv.DictReader(io.StringIO(output.read_text(encoding="utf-8"))))
    assert len(parsed) == 2
    assert json.loads(summary.read_text(encoding="utf-8"))["canonical_artifact"]["sha256"] == hashlib.sha256(first.csv_bytes).hexdigest()

    output.write_text("a reviewed replacement is required\n", encoding="utf-8")
    with pytest.raises(FileExistsError, match="refusing to replace"):
        write_fielding_goa_artifacts(first, output_path=output, summary_path=summary)
    replaced = write_fielding_goa_artifacts(first, output_path=output, summary_path=summary, replace=True)
    assert replaced == {"csv": "REPLACED", "summary": "UNCHANGED_IDENTICAL"}
    assert before == {path: _sha256(path) for path in raw_paths}


def test_fixture_rejects_checksum_drift(tmp_path):
    data_dir, manifest_path = _write_fixture(tmp_path)
    age_path = data_dir / "raw" / "veterinary" / RAW_RELEASE_DIRNAME / AGE_FILENAME
    age_path.write_text(age_path.read_text(encoding="utf-8") + "\n", encoding="utf-8")
    with pytest.raises(ValueError, match="checksum mismatch"):
        normalize_fielding_goa_rows(data_dir=data_dir, manifest_path=manifest_path)


def test_held_fielding_release_has_expected_direct_observation_coverage():
    release_dir = DATA_DIR / "raw" / "veterinary" / RAW_RELEASE_DIRNAME
    if not all((release_dir / name).exists() for name in (README_FILENAME, AGE_FILENAME, LACTATION_FILENAME)):
        pytest.skip("held Fielding raw release is deliberately gitignored and absent in this checkout")

    raw_paths = [release_dir / name for name in (README_FILENAME, AGE_FILENAME, LACTATION_FILENAME)]
    before = {path: _sha256(path) for path in raw_paths}
    artifacts = build_fielding_goa_artifacts()
    rows = artifacts.rows
    assert len(rows) == 1878
    assert Counter(row["endpoint"] for row in rows) == {
        "puppy_count": 939,
        "lactating_female_count": 939,
    }
    assert len({row["geography_id"] for row in rows}) == 10
    assert min(row["observation_datetime"] for row in rows) == "2020-07-11T01:30:00Z"
    assert max(row["observation_datetime"] for row in rows) == "2023-01-19T10:00:00Z"
    assert artifacts.summary["status"] == "CONTEXT_ONLY_NOT_CSLI_ELIGIBLE"
    assert before == {path: _sha256(path) for path in raw_paths}
