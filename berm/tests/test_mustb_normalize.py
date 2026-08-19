"""Tests for the honest, partial MUST-B spatial-context normalization."""

from __future__ import annotations

from io import BytesIO
import hashlib
import json
from pathlib import Path
import zipfile

import pytest

from berm.data.mustb_normalize import (
    MANIFEST_FILENAME,
    POLYGON_MEMBER,
    SITE_MEMBER,
    build_mustb_spatial_context_artifacts,
    write_mustb_spatial_context_artifacts,
)


def _write_fixture(tmp_path: Path) -> tuple[Path, Path, Path]:
    data_dir = tmp_path / "data"
    archive_path = data_dir / "raw" / "pollinator_hub" / "mustb_fixture" / "must-b.zip"
    manifest_path = data_dir / "raw" / "manifests" / MANIFEST_FILENAME
    archive_path.parent.mkdir(parents=True)
    manifest_path.parent.mkdir(parents=True)
    payload = BytesIO()
    with zipfile.ZipFile(payload, "w") as archive:
        archive.writestr(SITE_MEMBER, "siteNo,siteName,country,UTMCoordinates\n1,Foulum,DK,32 N 535727 6260999\n")
        archive.writestr(POLYGON_MEMBER, "siteNo,UniquePolyID,Area,UTMCoordinatesOfCentroid\n1,poly-1,1600,32 N 535727 6260999\n")
        archive.writestr("must-b.Readme.md", "fixture")
    archive_path.write_bytes(payload.getvalue())
    manifest = {
        "manifest_id": "mustb_fixture",
        "retrieved_at": "2026-08-19",
        "files": [{
            "source_id": "EUPH_MUSTB_2019_2020",
            "path": str(archive_path.relative_to(data_dir)),
            "bytes": archive_path.stat().st_size,
            "sha256": hashlib.sha256(archive_path.read_bytes()).hexdigest(),
            "retrieved_at": "2026-08-19",
        }],
    }
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    return data_dir, archive_path, manifest_path


def test_partial_archive_is_normalized_as_context_not_biology_or_rf(tmp_path):
    data_dir, archive_path, manifest_path = _write_fixture(tmp_path)
    artifacts = build_mustb_spatial_context_artifacts(
        data_dir=data_dir,
        archive_path=archive_path,
        manifest_path=manifest_path,
        site_output_path=tmp_path / "out" / "sites.csv",
        polygon_output_path=tmp_path / "out" / "polygons.csv",
    )

    assert len(artifacts.site_rows) == 1
    assert len(artifacts.polygon_rows) == 1
    assert artifacts.site_rows[0]["country_iso2"] == "DK"
    assert artifacts.polygon_rows[0]["area_unit_status"] == "NOT_STATED_IN_HELD_CSV"
    assert all(row["rf_status"] == "NOT_MEASURED" for row in artifacts.site_rows + artifacts.polygon_rows)
    assert all(row["csli_eligibility"] == "INELIGIBLE_NO_BIOLOGICAL_ENDPOINT_OR_RF" for row in artifacts.site_rows + artifacts.polygon_rows)
    assert artifacts.summary["status"] == "PARTIAL_SPATIAL_CONTEXT_ONLY_NOT_SENTINEL_ENDPOINT_OR_CSLI_ELIGIBLE"
    inventory = {row["part_id"]: row for row in artifacts.summary["portal_catalogue_vs_held_archive"]}
    assert inventory["STSCR130"]["archive_status"] == "HELD"
    assert inventory["PLYGN131"]["held_record_count"] == 1
    assert inventory["TBLVC136"]["archive_status"] == "NOT_PRESENT_IN_HELD_ARCHIVE"
    assert artifacts.summary["endpoint_and_covariate_missingness"]["colony_health_or_reproductive_endpoint"] == "NOT_HELD_IN_ARCHIVE"


def test_context_output_writes_fail_closed(tmp_path):
    data_dir, archive_path, manifest_path = _write_fixture(tmp_path)
    site_output = tmp_path / "out" / "sites.csv"
    polygon_output = tmp_path / "out" / "polygons.csv"
    summary_output = tmp_path / "out" / "summary.json"
    artifacts = build_mustb_spatial_context_artifacts(
        data_dir=data_dir,
        archive_path=archive_path,
        manifest_path=manifest_path,
        site_output_path=site_output,
        polygon_output_path=polygon_output,
    )
    assert write_mustb_spatial_context_artifacts(
        artifacts,
        site_output_path=site_output,
        polygon_output_path=polygon_output,
        summary_path=summary_output,
    ) == {"sites": "WRITTEN_NEW", "polygons": "WRITTEN_NEW", "summary": "WRITTEN_NEW"}
    assert write_mustb_spatial_context_artifacts(
        artifacts,
        site_output_path=site_output,
        polygon_output_path=polygon_output,
        summary_path=summary_output,
    ) == {"sites": "UNCHANGED_IDENTICAL", "polygons": "UNCHANGED_IDENTICAL", "summary": "UNCHANGED_IDENTICAL"}
    site_output.write_text("review before replacing\n", encoding="utf-8")
    with pytest.raises(FileExistsError, match="refusing to replace"):
        write_mustb_spatial_context_artifacts(
            artifacts,
            site_output_path=site_output,
            polygon_output_path=polygon_output,
            summary_path=summary_output,
        )


def test_held_archive_has_only_two_data_tables_when_available():
    repo_data = Path(__file__).resolve().parent.parent / "data"
    archive_path = repo_data / "raw" / "pollinator_hub" / "mustb_2026-08-19" / "must-b.zip"
    manifest_path = repo_data / "raw" / "manifests" / MANIFEST_FILENAME
    if not archive_path.exists() or not manifest_path.exists():
        pytest.skip("held MUST-B raw archive is deliberately gitignored and absent in this checkout")
    artifacts = build_mustb_spatial_context_artifacts(
        data_dir=repo_data,
        archive_path=archive_path,
        manifest_path=manifest_path,
        site_output_path=repo_data / "processed" / "mustb_apiary_site_context.csv",
        polygon_output_path=repo_data / "processed" / "mustb_botanical_survey_polygon_context.csv",
    )
    assert len(artifacts.site_rows) == 7
    assert len(artifacts.polygon_rows) == 453
    assert {row["country_iso2"] for row in artifacts.site_rows} == {"DK", "PT"}
    assert artifacts.summary["raw_archive"]["archive_member_count"] == 12
