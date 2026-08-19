"""Unit tests for immutable all-country World Bank acquisition."""

from __future__ import annotations

from urllib.parse import parse_qs, urlparse

import pytest

from berm.data.global_download import INDICATORS, acquire_world_bank_release, load_world_bank_release


def _fake_world_bank(url: str):
    path = urlparse(url).path
    query = parse_qs(urlparse(url).query)
    page = int(query["page"][0])
    if path.endswith("/country"):
        assert page == 1
        return [{"pages": "1"}, [
            {
                "id": "FIN", "iso2Code": "FI", "name": "Finland",
                "region": {"id": "ECS", "value": "Europe & Central Asia"},
                "incomeLevel": {"id": "HIC"}, "lendingType": {"id": "LNX"},
            },
            {
                "id": "ARB", "iso2Code": "1A", "name": "Arab World",
                "region": {"id": "NA", "value": "Aggregates"},
                "incomeLevel": {"id": "NA"}, "lendingType": {"id": "NA"},
            },
        ]]

    indicator = path.rsplit("/", 1)[-1]
    assert indicator in {spec.code for spec in INDICATORS}
    if indicator == INDICATORS[0].code and page == 1:
        # Exercise pagination as well as the metadata country filter.
        return [{"pages": "2"}, [{
            "countryiso3code": "FIN", "date": "2020", "value": 1.0,
        }]]
    if indicator == INDICATORS[0].code and page == 2:
        return [{"pages": "2"}, [{
            "countryiso3code": "ARB", "date": "2020", "value": 99.0,
        }]]
    assert page == 1
    return [{"pages": "1"}, [{
        "countryiso3code": "FIN", "date": "2020", "value": 2.0,
    }, {
        "countryiso3code": "ARB", "date": "2020", "value": 99.0,
    }]]


def test_acquire_and_parse_release_uses_metadata_not_iso_length(tmp_path):
    raw = tmp_path / "data" / "raw"
    manifest_dir = raw / "manifests"
    manifest = acquire_world_bank_release(
        release_id="wb_test_2026-08-19",
        raw_dir=raw,
        manifest_dir=manifest_dir,
        retrieved_at="2026-08-19",
        fetch_json=_fake_world_bank,
    )

    assert len(manifest["files"]) == 8
    assert {f["source_id"] for f in manifest["files"]} == {s.source_id for s in INDICATORS}
    assert (manifest_dir / "wb_test_2026-08-19.manifest.json").exists()

    release = load_world_bank_release(raw / "world_bank" / "wb_test_2026-08-19")
    assert set(release.countries) == {"FIN"}
    assert set(release.observations["FIN"][2020]) == {spec.field for spec in INDICATORS}
    assert release.observations["FIN"][2020]["mobile_per_100"]["proxy_flag"] is True
    assert release.observations["FIN"][2020]["urban_pct"]["measurement_type"] == "OBSERVED"


def test_release_ids_cannot_silently_overwrite_raw_source_bytes(tmp_path):
    kwargs = {
        "release_id": "wb_test_immutable",
        "raw_dir": tmp_path / "raw",
        "manifest_dir": tmp_path / "raw" / "manifests",
        "retrieved_at": "2026-08-19",
        "fetch_json": _fake_world_bank,
    }
    acquire_world_bank_release(**kwargs)
    with pytest.raises(FileExistsError, match="already exists"):
        acquire_world_bank_release(**kwargs)
