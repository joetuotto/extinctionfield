"""Tests for immutable public EU Pollinator Hub MUST-B acquisition."""

from __future__ import annotations

from io import BytesIO
import zipfile

import pytest

from berm.data.mustb_download import (
    MUSTB_LANDING_URL,
    MUSTB_RAW_FILENAME,
    acquire_mustb_release,
    load_mustb_release,
)


def _zip_payload() -> bytes:
    out = BytesIO()
    with zipfile.ZipFile(out, "w") as archive:
        archive.writestr("01_sites_coord.csv", "siteNo,country\n1,DK\n")
        archive.writestr("table_v_colony_inspection.csv", "hiveNo,value\n1,2\n")
    return out.getvalue()


def _fake_landing(url: str) -> str:
    assert url == MUSTB_LANDING_URL
    return (
        '<a href="/download/everything/76?expires=9999999999&amp;signature=test-signature">'
        "Download entire dataset</a>"
    )


def _fake_archive(url: str) -> bytes:
    assert url == (
        "https://app.pollinatorhub.eu/download/everything/76?"
        "expires=9999999999&signature=test-signature"
    )
    return _zip_payload()


def test_acquire_mustb_release_preserves_publisher_zip_bytes(tmp_path):
    raw = tmp_path / "data" / "raw"
    manifest_dir = raw / "manifests"
    manifest = acquire_mustb_release(
        release_id="mustb_test_2026-08-19",
        raw_dir=raw,
        manifest_dir=manifest_dir,
        retrieved_at="2026-08-19",
        fetch_text=_fake_landing,
        fetch_bytes=_fake_archive,
    )

    assert manifest["manifest_id"] == "mustb_test_2026-08-19"
    assert manifest["archive_member_count"] == 2
    assert len(manifest["files"]) == 1
    entry = manifest["files"][0]
    assert entry["path"] == (
        "raw/pollinator_hub/mustb_test_2026-08-19/must-b.zip"
    )
    assert entry["original_filename"] == MUSTB_RAW_FILENAME
    assert len(entry["sha256"]) == 64
    raw_path = tmp_path / "data" / entry["path"]
    assert raw_path.read_bytes() == _zip_payload()
    release = load_mustb_release(raw_path)
    assert release.retrieved_at == "2026-08-19"
    assert release.members == ("01_sites_coord.csv", "table_v_colony_inspection.csv")
    assert release.manifest_path == manifest_dir / "mustb_test_2026-08-19.manifest.json"


def test_mustb_releases_cannot_silently_overwrite_source_bytes(tmp_path):
    kwargs = {
        "release_id": "mustb_test_immutable",
        "raw_dir": tmp_path / "raw",
        "manifest_dir": tmp_path / "raw" / "manifests",
        "retrieved_at": "2026-08-19",
        "fetch_text": _fake_landing,
        "fetch_bytes": _fake_archive,
    }
    acquire_mustb_release(**kwargs)
    with pytest.raises(FileExistsError, match="already exists"):
        acquire_mustb_release(**kwargs)


def test_mustb_refuses_a_non_zip_download(tmp_path):
    with pytest.raises(Exception, match="not a readable ZIP"):
        acquire_mustb_release(
            release_id="mustb_not_zip",
            raw_dir=tmp_path / "raw",
            manifest_dir=tmp_path / "raw" / "manifests",
            retrieved_at="2026-08-19",
            fetch_text=_fake_landing,
            fetch_bytes=lambda _url: b"not-a-zip",
        )
