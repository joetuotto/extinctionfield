"""Focused tests for the non-human sentinel normalization release."""

from __future__ import annotations

import csv
import hashlib
import io
import json
from collections import Counter
from pathlib import Path

from berm.data.contracts import CANONICAL_TABLES, GeographyLevel, validate_rows
from berm.data.registry import known_source_ids
from berm.data.sentinel_normalize import (
    CANONICAL_HEADER,
    DEFAULT_PUBLIC_READINESS_PATH,
    DOG_SITE_ID,
    build_sentinel_artifacts,
    normalize_sentinel_rows,
    write_sentinel_artifacts,
)


REPO_ROOT = Path(__file__).resolve().parents[2]


def _json_field(row: dict, field: str):
    return json.loads(row[field])


def test_contract_grain_and_unit_cover_distinct_sentinel_endpoints():
    spec = CANONICAL_TABLES["sentinel_species_region_year"]
    assert spec.grain == ("geography_id", "year", "species", "endpoint")
    assert "million_total" in spec.units


def test_normalizes_exact_observed_nonhuman_record_counts_and_provenance():
    rows = normalize_sentinel_rows()
    assert len(rows) == 480
    assert Counter(row["source_id"] for row in rows) == {
        "COLOSS_WINTER_LOSS": 216,
        "LEA_2016_DOG_SEMEN": 92,
        "PECBMS_BIRD_INDEX": 172,
    }
    assert not {
        "LEVINE_2023_SPERM_RECON",
        "WAHL_2009_BULL_SEMEN",
        "KAROUI_2011_BULL_SEMEN",
        "HENSEL_2025_BOAR_SEMEN",
    } & {row["source_id"] for row in rows}
    assert validate_rows(
        rows,
        "sentinel_species_region_year",
        known_source_ids=known_source_ids(),
    ) == []
    for row in rows:
        assert row["measurement_type"] == "OBSERVED"
        assert row["proxy_flag"] is False
        assert row["imputation_flag"] is False
        assert _json_field(row, "missingness")["status"] == "OBSERVED_SOURCE_VALUE"
        provenance = _json_field(row, "provenance")
        assert provenance["raw_artifact_sha256"]
        assert provenance["raw_record_key"] == row["raw_record_key"]


def test_coloss_maps_uk_subnational_keys_and_retains_missing_ci_metadata():
    rows = [row for row in normalize_sentinel_rows() if row["source_id"] == "COLOSS_WINTER_LOSS"]
    assert len(rows) == 216
    mapped = [row for row in rows if row["geography_level"] == GeographyLevel.SUBNATIONAL1.value]
    assert {row["geography_id"] for row in mapped} == {
        "GBR-ENG", "GBR-SCT", "GBR-WLS", "GBR-NIR",
    }
    assert len(mapped) == 19
    england = [row for row in mapped if row["geography_id"] == "GBR-ENG"]
    assert england
    assert all("RAW_ENG_COMBINES_ENGLAND_AND_WALES" in _json_field(row, "quality_flags") for row in england)
    assert all(row["geography_match_status"] == "SUBNATIONAL_MAPPING_REQUIRES_EXPOSURE_CROSSWALK" for row in mapped)

    source_ci = [row for row in rows if row["uncertainty_status"] == "SOURCE_REPORTED_CONFIDENCE_INTERVAL"]
    absent_ci = [row for row in rows if row["uncertainty_status"] == "NOT_REPORTED_BY_SOURCE_ARTIFACT"]
    assert len(source_ci) == 166
    assert len(absent_ci) == 50
    assert all(row["uncertainty_lower"] == "" and row["uncertainty_upper"] == "" for row in absent_ci)
    assert all("NO_POINT_INTERVAL_REPORTED" in _json_field(row, "quality_flags") for row in absent_ci)


def test_dog_is_single_site_digitized_rows_with_all_actual_endpoints():
    rows = [row for row in normalize_sentinel_rows() if row["source_id"] == "LEA_2016_DOG_SEMEN"]
    assert len(rows) == 92
    assert {row["geography_id"] for row in rows} == {DOG_SITE_ID}
    assert {row["geography_level"] for row in rows} == {GeographyLevel.SITE.value}
    assert Counter(row["endpoint"] for row in rows) == {
        "progressive_motility": 24,
        "normal_morphology": 24,
        "total_sperm_output": 24,
        "cryptorchidism_incidence": 20,
    }
    semen_rows = [row for row in rows if row["endpoint"] != "cryptorchidism_incidence"]
    assert {row["unit"] for row in semen_rows} == {
        "pct_motile", "pct_normal_morphology", "million_total",
    }
    assert all("FIGURE_DIGITIZED" in _json_field(row, "quality_flags") for row in rows)
    assert all(row["uncertainty_status"] == "QUALITATIVE_FIGURE_READING_UNCERTAINTY" for row in rows)
    assert all(row["geography_match_status"] == "SITE_ONLY_NO_EXTERNAL_GEOGRAPHY_MATCH" for row in rows)


def test_birds_include_eur_without_treating_it_as_country_exposure_match():
    rows = [row for row in normalize_sentinel_rows() if row["source_id"] == "PECBMS_BIRD_INDEX"]
    assert len(rows) == 172
    eur = [row for row in rows if row["geography_id"] == "EUR"]
    assert len(eur) == 23
    assert {row["geography_level"] for row in eur} == {GeographyLevel.SUPRANATIONAL.value}
    assert {row["geography_match_status"] for row in eur} == {
        "SUPRANATIONAL_NO_NATIONAL_EXPOSURE_MATCH"
    }
    assert all("SUPRANATIONAL_AGGREGATE" in _json_field(row, "quality_flags") for row in eur)


def test_build_and_write_are_deterministic_and_preserve_raw_inputs(tmp_path):
    raw_paths = [
        "berm/data/sentinel/coloss_winter_loss.json",
        "berm/data/sentinel/lea2016_dog_sperm.json",
        "berm/data/sentinel/bird_index.json",
        "berm/data/sentinel/sperm_by_country.json",
        "berm/data/sentinel/livestock_negative_control.json",
        "berm/data/raw/manifests/sentinel_2025-08-18.manifest.json",
    ]
    before = {
        path: hashlib.sha256((REPO_ROOT / path).read_bytes()).hexdigest()
        for path in raw_paths
    }
    output = tmp_path / "sentinel_species_region_year.csv"
    summary = tmp_path / "sentinel_species_region_year_summary.json"
    readiness = tmp_path / "sentinel_readiness.json"
    public_readiness = tmp_path / "website" / "public" / "data" / "sentinel_readiness.json"

    first = build_sentinel_artifacts(output_path=output)
    second = build_sentinel_artifacts(output_path=output)
    assert first.csv_bytes == second.csv_bytes
    assert first.summary == second.summary
    assert first.readiness == second.readiness
    assert first.summary["canonical_artifact"]["row_count"] == 480
    assert first.readiness["status"] == "BLOCKED"
    assert [test["status"] for test in first.readiness["tests"]] == ["BLOCKED"] * 6
    assert [record["id"] for record in first.readiness["withdrawn_records"]] == [
        "csli-bee-lag", "csli-bird-lag", "csli-sperm-lag",
    ]

    first_write = write_sentinel_artifacts(
        first,
        output_path=output,
        summary_path=summary,
        readiness_path=readiness,
        public_readiness_path=public_readiness,
    )
    assert {entry["status"] for entry in first_write.values()} == {"WRITTEN_NEW"}
    second_write = write_sentinel_artifacts(
        second,
        output_path=output,
        summary_path=summary,
        readiness_path=readiness,
        public_readiness_path=public_readiness,
    )
    assert {entry["status"] for entry in second_write.values()} == {"UNCHANGED_IDENTICAL"}
    assert readiness.read_bytes() == public_readiness.read_bytes()

    parsed_rows = list(csv.DictReader(io.StringIO(output.read_text(encoding="utf-8"))))
    assert len(parsed_rows) == 480
    assert tuple(parsed_rows[0]) == CANONICAL_HEADER
    assert json.loads(readiness.read_text(encoding="utf-8"))["schema_version"]
    after = {
        path: hashlib.sha256((REPO_ROOT / path).read_bytes()).hexdigest()
        for path in raw_paths
    }
    assert after == before
    assert DEFAULT_PUBLIC_READINESS_PATH.name == "sentinel_readiness.json"
