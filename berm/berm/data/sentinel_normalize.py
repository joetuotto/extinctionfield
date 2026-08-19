"""Normalize the held non-human sentinel artefacts without changing raw data.

The raw sentinel JSON files were intentionally retained in their source-shaped
form for backwards compatibility.  This module creates one deterministic,
provenance-rich canonical table for the records that are actually present:

* COLOSS honey-bee colony winter loss;
* Lea et al.'s single-site dog endpoints, explicitly marked as digitized;
* PECBMS/BBS bird abundance indices.

It deliberately excludes the reconstructed human sperm series and the
livestock citation summary: neither is an observed non-human row-level panel.
The output is a data-organizing artefact, not a causal analysis and does not
change the active fertility model.

Run from ``berm/`` with::

    python -m berm.data.sentinel_normalize

The writer is fail-closed: an existing changed derived output requires
``--replace``; raw artefacts and their manifest are never written by this
module.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, Sequence

from berm.data.contracts import (
    CANONICAL_COLUMNS,
    GeographyLevel,
    MeasurementType,
    Sex,
    validate_rows,
)
from berm.data.registry import SourceRecord, known_source_ids, load_source_registry

__all__ = [
    "SENTINEL_NORMALIZER_SCHEMA_VERSION",
    "SENTINEL_READINESS_SCHEMA_VERSION",
    "PIPELINE_VERSION",
    "CANONICAL_HEADER",
    "DEFAULT_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "DEFAULT_READINESS_PATH",
    "DEFAULT_PUBLIC_READINESS_PATH",
    "DOG_SITE_ID",
    "SentinelArtifacts",
    "normalize_sentinel_rows",
    "build_sentinel_artifacts",
    "write_sentinel_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
REPO_ROOT = DATA_DIR.parent.parent
SENTINEL_DIR = DATA_DIR / "sentinel"
RAW_MANIFEST_PATH = DATA_DIR / "raw" / "manifests" / "sentinel_2025-08-18.manifest.json"
PROCESSED_DIR = DATA_DIR / "processed"
PUBLIC_DATA_DIR = REPO_ROOT / "website" / "public" / "data"

DEFAULT_OUTPUT_PATH = PROCESSED_DIR / "sentinel_species_region_year.csv"
DEFAULT_SUMMARY_PATH = PROCESSED_DIR / "sentinel_species_region_year_summary.json"
DEFAULT_READINESS_PATH = PROCESSED_DIR / "sentinel_readiness.json"
DEFAULT_PUBLIC_READINESS_PATH = PUBLIC_DATA_DIR / "sentinel_readiness.json"

PIPELINE_VERSION = "sentinel_normalize@v1.0.0"
SENTINEL_NORMALIZER_SCHEMA_VERSION = "berm.sentinel_species_region_year@v1.0.0"
SENTINEL_READINESS_SCHEMA_VERSION = "berm.sentinel_readiness@v1.0.0"

# This is a source-snapshot label, not a wall-clock timestamp.  Keeping it
# explicit makes a repeated build byte-identical until raw input changes.
SOURCE_SNAPSHOT_DATE = "2026-08-19"

COLOSS_SOURCE_ID = "COLOSS_WINTER_LOSS"
DOG_SOURCE_ID = "LEA_2016_DOG_SEMEN"
BIRD_SOURCE_ID = "PECBMS_BIRD_INDEX"

RAW_FILES: dict[str, str] = {
    COLOSS_SOURCE_ID: "sentinel/coloss_winter_loss.json",
    DOG_SOURCE_ID: "sentinel/lea2016_dog_sperm.json",
    BIRD_SOURCE_ID: "sentinel/bird_index.json",
}

# The raw input uses four short UK territory keys.  ``ENG`` is kept as the
# requested canonical crosswalk target but carries an explicit approximation
# flag because the raw source says it combines England and Wales.
UK_SUBNATIONAL_MAP: dict[str, str] = {
    "ENG": "GBR-ENG",
    "SCT": "GBR-SCT",
    "WLS": "GBR-WLS",
    "NIR": "GBR-NIR",
}

# The raw dog file documents a breeding programme but no subnational location
# fit for a country-year exposure join.  This stable SITE code uses the same
# ISO-style shape as subnational geography; the source programme remains in
# per-row provenance rather than being encoded into an unregistered geocode.
DOG_SITE_ID = "GBR-GDBA"

COLOSS_DOCUMENTS: dict[str, str] = {
    "2012-13": "EPILOBEE_2012_2014",
    "2013-14": "EPILOBEE_2012_2014",
    "2015-16": "BRODSCHNEIDER_2015_16",
    "2016-17": "BRODSCHNEIDER_2016_17",
    "2017-18": "GRAY_2017_18",
    "2018-19": "GRAY_2018_19",
    "2019-20": "GRAY_2019_20",
}

DOG_ENDPOINTS: tuple[tuple[str, str, str], ...] = (
    ("progressive_motility_pct", "progressive_motility", "pct_motile"),
    ("normal_morphology_pct", "normal_morphology", "pct_normal_morphology"),
    ("total_output_millions", "total_sperm_output", "million_total"),
)

EXTRA_COLUMNS: tuple[str, ...] = (
    "species",
    "endpoint",
    "observation_period",
    "measurement_detail",
    "uncertainty_status",
    "quality_status",
    "quality_flags",
    "geography_match_status",
    "geography_match_detail",
    "sample_size",
    "sample_size_unit",
    "sample_size_description",
    "raw_artifact",
    "raw_record_key",
    "provenance",
    "uncertainty",
    "missingness",
)
CANONICAL_HEADER: tuple[str, ...] = tuple(c.name for c in CANONICAL_COLUMNS) + EXTRA_COLUMNS


@dataclass(frozen=True)
class SentinelArtifacts:
    """A deterministic in-memory build, ready to be written as a matched set."""

    rows: tuple[dict[str, Any], ...]
    csv_bytes: bytes
    summary: dict[str, Any]
    readiness: dict[str, Any]


def _canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _canonical_json_bytes(value: Any) -> bytes:
    return (_canonical_json(value) + "\n").encode("utf-8")


def _sha256_path(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _sha256_bytes(payload: bytes) -> str:
    return hashlib.sha256(payload).hexdigest()


def _repo_relative(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT.resolve()))
    except ValueError:
        return str(path)


def _load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError(f"expected a JSON object in {path}")
    return value


def _load_manifest(path: Path = RAW_MANIFEST_PATH) -> dict[str, Any]:
    manifest = _load_json(path)
    if not isinstance(manifest.get("files"), list):
        raise ValueError(f"manifest has no files list: {path}")
    if not isinstance(manifest.get("manifest_id"), str):
        raise ValueError(f"manifest has no manifest_id: {path}")
    return manifest


def _manifest_entry(manifest: Mapping[str, Any], source_id: str) -> Mapping[str, Any]:
    matches = [
        entry for entry in manifest["files"]
        if isinstance(entry, Mapping) and entry.get("source_id") == source_id
    ]
    if len(matches) != 1:
        raise ValueError(f"expected exactly one manifest entry for {source_id}, got {len(matches)}")
    return matches[0]


def _raw_info(
    *,
    source_id: str,
    raw_payload: Mapping[str, Any],
    manifest: Mapping[str, Any],
) -> dict[str, Any]:
    relative_path = RAW_FILES[source_id]
    path = DATA_DIR / relative_path
    if not path.exists():
        raise FileNotFoundError(f"held raw artefact is missing: {path}")
    entry = _manifest_entry(manifest, source_id)
    actual_sha = _sha256_path(path)
    expected_sha = entry.get("sha256")
    if actual_sha != expected_sha:
        raise ValueError(
            f"raw artefact checksum mismatch for {relative_path}: "
            f"manifest={expected_sha!r} actual={actual_sha!r}"
        )
    raw_metadata_date = raw_payload.get("extraction_date")
    if raw_metadata_date is None:
        nested = raw_payload.get("_metadata")
        if isinstance(nested, Mapping):
            raw_metadata_date = nested.get("last_updated")
    return {
        "manifest_id": manifest["manifest_id"],
        "manifest_retrieved_at": manifest.get("retrieved_at"),
        "manifest_entry_retrieved_at": entry.get("retrieved_at"),
        "raw_artifact": relative_path,
        "raw_artifact_sha256": actual_sha,
        "raw_file_metadata_date": raw_metadata_date,
    }


def _source_record(source_id: str) -> SourceRecord:
    try:
        source = load_source_registry()[source_id]
    except KeyError as exc:
        raise ValueError(f"source registry is missing {source_id}") from exc
    if source.measurement_class != MeasurementType.OBSERVED.value:
        raise ValueError(
            f"{source_id} is not an OBSERVED source in source_registry: "
            f"{source.measurement_class!r}"
        )
    return source


def _winter_end_year(winter: str) -> int:
    parts = winter.split("-")
    if len(parts) != 2 or len(parts[0]) != 4:
        raise ValueError(f"unrecognized COLOSS winter label {winter!r}")
    start = int(parts[0])
    end_part = int(parts[1])
    end = end_part if end_part >= 100 else (start // 100) * 100 + end_part
    if end <= start:
        end += 100
    return end


def _metadata_date_conflict_flag(raw_info: Mapping[str, Any]) -> tuple[str, ...]:
    """Preserve, rather than hide, a raw-file date later than its manifest date."""
    raw_date = raw_info.get("raw_file_metadata_date")
    manifest_date = raw_info.get("manifest_entry_retrieved_at")
    if isinstance(raw_date, str) and isinstance(manifest_date, str) and raw_date > manifest_date:
        return ("RAW_FILE_METADATA_DATE_AFTER_MANIFEST",)
    return ()


def _make_row(
    *,
    source: SourceRecord,
    raw_info: Mapping[str, Any],
    geography_id: str,
    geography_level: str,
    year: int,
    value: float,
    unit: str,
    species: str,
    endpoint: str,
    observation_period: str,
    measurement_detail: str,
    uncertainty_lower: float | str,
    uncertainty_upper: float | str,
    uncertainty_status: str,
    uncertainty_description: str,
    quality_status: str,
    quality_flags: Sequence[str],
    geography_match_status: str,
    geography_match_detail: str,
    raw_record_key: str,
    source_document: str,
    sample_size: int | float | str = "",
    sample_size_unit: str = "",
    sample_size_description: str = "",
) -> dict[str, Any]:
    """Build one contract-clean row plus serialised rich metadata fields."""
    provenance = {
        "manifest_id": raw_info["manifest_id"],
        "manifest_retrieved_at": raw_info["manifest_retrieved_at"],
        "raw_artifact": raw_info["raw_artifact"],
        "raw_artifact_sha256": raw_info["raw_artifact_sha256"],
        "raw_file_metadata_date": raw_info.get("raw_file_metadata_date"),
        "raw_record_key": raw_record_key,
        "source_citation": source.citation,
        "source_document": source_document,
    }
    uncertainty: dict[str, Any] = {
        "status": uncertainty_status,
        "description": uncertainty_description,
    }
    if uncertainty_lower != "":
        uncertainty["lower"] = uncertainty_lower
        uncertainty["upper"] = uncertainty_upper

    return {
        "source_id": source.source_id,
        "source_url": source.source_url,
        "license": source.license,
        "retrieved_at": source.retrieved_at,
        "source_period": source.temporal_coverage,
        "geography_id": geography_id,
        "geography_level": geography_level,
        "year": year,
        "sex": Sex.NA.value,
        "age_group": "NA",
        "birth_cohort": "",
        "value": float(value),
        "unit": unit,
        "measurement_type": MeasurementType.OBSERVED.value,
        "proxy_flag": False,
        "imputation_flag": False,
        "uncertainty_lower": uncertainty_lower,
        "uncertainty_upper": uncertainty_upper,
        "transform_pipeline_version": PIPELINE_VERSION,
        "species": species,
        "endpoint": endpoint,
        "observation_period": observation_period,
        "measurement_detail": measurement_detail,
        "uncertainty_status": uncertainty_status,
        "quality_status": quality_status,
        "quality_flags": _canonical_json(sorted(set(quality_flags))),
        "geography_match_status": geography_match_status,
        "geography_match_detail": geography_match_detail,
        "sample_size": sample_size,
        "sample_size_unit": sample_size_unit,
        "sample_size_description": sample_size_description,
        "raw_artifact": raw_info["raw_artifact"],
        "raw_record_key": raw_record_key,
        "provenance": _canonical_json(provenance),
        "uncertainty": _canonical_json(uncertainty),
        "missingness": _canonical_json({"status": "OBSERVED_SOURCE_VALUE"}),
    }


def _normalize_coloss(manifest: Mapping[str, Any]) -> list[dict[str, Any]]:
    source = _source_record(COLOSS_SOURCE_ID)
    raw_path = DATA_DIR / RAW_FILES[COLOSS_SOURCE_ID]
    raw = _load_json(raw_path)
    data = raw.get("data")
    if not isinstance(data, Mapping):
        raise ValueError("COLOSS raw data has no data mapping")
    info = _raw_info(source_id=COLOSS_SOURCE_ID, raw_payload=raw, manifest=manifest)
    global_flags = (
        "OUTCOME_NOT_DIRECT_REPRODUCTION",
        "MIXED_SURVEY_METHODS",
        "NO_RF_DOSIMETRY",
        "SPARSE_UNBALANCED_PANEL",
        *_metadata_date_conflict_flag(info),
    )
    rows: list[dict[str, Any]] = []
    for raw_geo, series in sorted(data.items()):
        if not isinstance(series, Mapping):
            raise ValueError(f"COLOSS series for {raw_geo!r} is not a mapping")
        if raw_geo in UK_SUBNATIONAL_MAP:
            geography_id = UK_SUBNATIONAL_MAP[raw_geo]
            geography_level = GeographyLevel.SUBNATIONAL1.value
            geography_match_status = "SUBNATIONAL_MAPPING_REQUIRES_EXPOSURE_CROSSWALK"
            geography_match_detail = (
                f"Raw COLOSS key {raw_geo} mapped to {geography_id}; country-level "
                "exposure cannot be treated as a same-resolution match."
            )
            geo_flags: tuple[str, ...] = ("SUBNATIONAL_EXPOSURE_UNMATCHED",)
            if raw_geo == "ENG":
                geography_match_detail += " Raw source notes ENG combines England and Wales."
                geo_flags += ("RAW_ENG_COMBINES_ENGLAND_AND_WALES",)
        else:
            geography_id = str(raw_geo)
            geography_level = GeographyLevel.COUNTRY.value
            geography_match_status = "COUNTRY_LEVEL_ONLY"
            geography_match_detail = (
                "Raw country ISO3 key; this is not an apiary-level exposure match."
            )
            geo_flags = ("COUNTRY_LEVEL_NOT_APIARY_MATCHED",)

        for winter, record in sorted(series.items(), key=lambda item: (_winter_end_year(str(item[0])), str(item[0]))):
            if not isinstance(record, Mapping):
                raise ValueError(f"COLOSS {raw_geo}/{winter} is not a record")
            if record.get("loss_pct") is None:
                raise ValueError(f"COLOSS {raw_geo}/{winter} lacks loss_pct")
            ci_low, ci_high = record.get("ci_low"), record.get("ci_high")
            if (ci_low is None) != (ci_high is None):
                raise ValueError(
                    f"COLOSS {raw_geo}/{winter} has one-sided uncertainty "
                    f"({ci_low!r}, {ci_high!r})"
                )
            winter_text = str(winter)
            document = "USA_BIP_AIA_ANNUAL_SURVEYS" if raw_geo == "USA" else COLOSS_DOCUMENTS.get(winter_text)
            if document is None:
                raise ValueError(
                    f"COLOSS {raw_geo}/{winter_text} has no documented source mapping"
                )
            has_ci = ci_low is not None
            sample_size = record.get("n_colonies")
            row_flags = (*global_flags, *geo_flags)
            if not has_ci:
                row_flags += ("NO_POINT_INTERVAL_REPORTED",)
            if sample_size is None:
                row_flags += ("NO_SAMPLE_SIZE_REPORTED",)
            rows.append(_make_row(
                source=source,
                raw_info=info,
                geography_id=geography_id,
                geography_level=geography_level,
                year=_winter_end_year(winter_text),
                value=float(record["loss_pct"]),
                unit="pct_loss",
                species="apis_mellifera",
                endpoint="colony_winter_loss",
                observation_period=winter_text,
                measurement_detail="reported_colony_winter_loss",
                uncertainty_lower="" if not has_ci else float(ci_low),
                uncertainty_upper="" if not has_ci else float(ci_high),
                uncertainty_status=(
                    "SOURCE_REPORTED_CONFIDENCE_INTERVAL"
                    if has_ci else "NOT_REPORTED_BY_SOURCE_ARTIFACT"
                ),
                uncertainty_description=(
                    "Raw COLOSS row supplies ci_low and ci_high."
                    if has_ci else "No point-specific interval is present in the raw COLOSS row."
                ),
                quality_status="OBSERVED_LIMITED",
                quality_flags=row_flags,
                geography_match_status=geography_match_status,
                geography_match_detail=geography_match_detail,
                raw_record_key=f"{raw_geo}:{winter_text}",
                source_document=document,
                sample_size="" if sample_size is None else sample_size,
                sample_size_unit="colonies" if sample_size is not None else "",
                sample_size_description=(
                    "Source-reported colonies contributing to the territory-winter record."
                    if sample_size is not None else
                    "No record-specific colony sample size is present in the raw COLOSS row."
                ),
            ))
    if len(rows) != 216:
        raise ValueError(f"expected 216 COLOSS rows, built {len(rows)}")
    return rows


def _normalize_dog(manifest: Mapping[str, Any]) -> list[dict[str, Any]]:
    source = _source_record(DOG_SOURCE_ID)
    raw_path = DATA_DIR / RAW_FILES[DOG_SOURCE_ID]
    raw = _load_json(raw_path)
    data = raw.get("data")
    cryptorchidism = raw.get("cryptorchidism")
    if not isinstance(data, Mapping) or not isinstance(cryptorchidism, Mapping):
        raise ValueError("dog raw data needs data and cryptorchidism mappings")
    info = _raw_info(source_id=DOG_SOURCE_ID, raw_payload=raw, manifest=manifest)
    common_flags = (
        "FIGURE_DIGITIZED",
        "SINGLE_SITE",
        "NON_RANDOM_BREEDING_PROGRAM",
        "NO_RF_DOSIMETRY",
        "ARTIFICIAL_GAP_1999_2001_EXCLUDED",
    )
    common_kwargs = {
        "source": source,
        "raw_info": info,
        "geography_id": DOG_SITE_ID,
        "geography_level": GeographyLevel.SITE.value,
        "species": "canis_familiaris",
        "observation_period": "annual",
        "uncertainty_lower": "",
        "uncertainty_upper": "",
        "uncertainty_status": "QUALITATIVE_FIGURE_READING_UNCERTAINTY",
        "uncertainty_description": (
            "Raw artefact states figure-reading uncertainty of ±2–3 units; "
            "no point-specific numeric interval was reported."
        ),
        "quality_status": "OBSERVED_FIGURE_DIGITIZED_LIMITED",
        "geography_match_status": "SITE_ONLY_NO_EXTERNAL_GEOGRAPHY_MATCH",
        "geography_match_detail": (
            "Single Guide Dogs for the Blind Association breeding population in "
            "the UK; no country- or region-level exposure match is implied."
        ),
        "sample_size": "",
        "sample_size_unit": "",
    }
    rows: list[dict[str, Any]] = []
    for year_text, values in sorted(data.items(), key=lambda item: int(item[0])):
        if not isinstance(values, Mapping):
            raise ValueError(f"dog {year_text} is not a record")
        for raw_name, endpoint, unit in DOG_ENDPOINTS:
            value = values.get(raw_name)
            if value is None:
                continue
            rows.append(_make_row(
                **common_kwargs,
                year=int(year_text),
                value=float(value),
                unit=unit,
                endpoint=endpoint,
                measurement_detail="figure_digitized_model_estimated_mean",
                quality_flags=(*common_flags, "MODEL_ESTIMATED_MEAN"),
                raw_record_key=f"data:{year_text}:{raw_name}",
                source_document="LEA_2016_FIGURE_1",
                sample_size_description=(
                    "Raw source reports 42–97 breeding dogs per year overall, "
                    "but no record-specific annual sample size."
                ),
            ))

    for year_text, record in sorted(
        ((key, value) for key, value in cryptorchidism.items() if str(key).isdigit()),
        key=lambda item: int(item[0]),
    ):
        if not isinstance(record, Mapping) or record.get("incidence_per_1000") is None:
            raise ValueError(f"dog cryptorchidism {year_text} lacks incidence_per_1000")
        rows.append(_make_row(
            **common_kwargs,
            year=int(year_text),
            value=float(record["incidence_per_1000"]),
            unit="per_1000",
            endpoint="cryptorchidism_incidence",
            measurement_detail="figure_digitized_incidence",
            quality_flags=common_flags,
            raw_record_key=f"cryptorchidism:{year_text}:incidence_per_1000",
            source_document="LEA_2016_FIGURE_2A",
            sample_size_description=(
                "Raw source reports mean 651 male dogs/year (±15), not a "
                "record-specific annual sample size."
            ),
        ))
    expected = 72 + 20
    if len(rows) != expected:
        raise ValueError(f"expected {expected} dog rows, built {len(rows)}")
    return rows


def _normalize_birds(manifest: Mapping[str, Any]) -> list[dict[str, Any]]:
    source = _source_record(BIRD_SOURCE_ID)
    raw_path = DATA_DIR / RAW_FILES[BIRD_SOURCE_ID]
    raw = _load_json(raw_path)
    data = raw.get("data")
    if not isinstance(data, Mapping):
        raise ValueError("bird raw data has no data mapping")
    info = _raw_info(source_id=BIRD_SOURCE_ID, raw_payload=raw, manifest=manifest)
    common_flags = (
        "ABUNDANCE_NOT_REPRODUCTIVE_ENDPOINT",
        "IRREGULAR_SAMPLING",
        "MIXED_INDEX_DEFINITIONS",
        "NORMALIZED_TO_SERIES_BASELINE",
        "NO_RF_DOSIMETRY",
        *_metadata_date_conflict_flag(info),
    )
    rows: list[dict[str, Any]] = []
    for source_name, series in sorted(data.items(), key=lambda item: str(item[0])):
        if not isinstance(series, Mapping):
            raise ValueError(f"bird series {source_name!r} is not a mapping")
        iso3 = series.get("iso3")
        index_type = series.get("type")
        if not isinstance(iso3, str) or not isinstance(index_type, str):
            raise ValueError(f"bird series {source_name!r} lacks iso3/type metadata")
        if iso3 == "EUR":
            geography_level = GeographyLevel.SUPRANATIONAL.value
            geography_match_status = "SUPRANATIONAL_NO_NATIONAL_EXPOSURE_MATCH"
            geography_match_detail = (
                "PECBMS EU aggregate is not a country and cannot be joined to a "
                "single national exposure series."
            )
            geo_flags: tuple[str, ...] = ("SUPRANATIONAL_AGGREGATE",)
            source_document = "PECBMS_EU_AGGREGATE"
        else:
            geography_level = GeographyLevel.COUNTRY.value
            geography_match_status = "COUNTRY_LEVEL_ONLY"
            geography_match_detail = (
                "National abundance index; this is not a matched site-level "
                "exposure measurement."
            )
            geo_flags = ("COUNTRY_LEVEL_NOT_SITE_MATCHED",)
            source_document = "BBS_USA" if iso3 == "USA" else "PECBMS_NATIONAL_MONITORING"
        measurements = [
            (int(year), value) for year, value in series.items()
            if str(year).isdigit() and value is not None
        ]
        for year, value in sorted(measurements):
            rows.append(_make_row(
                source=source,
                raw_info=info,
                geography_id=iso3,
                geography_level=geography_level,
                year=year,
                value=float(value),
                unit="index_base_100",
                species="passerine_bird_community",
                endpoint="population_abundance_index",
                observation_period=str(year),
                measurement_detail=f"{index_type}_bird_index",
                uncertainty_lower="",
                uncertainty_upper="",
                uncertainty_status="NOT_REPORTED_BY_SOURCE_ARTIFACT",
                uncertainty_description="No point-specific interval is present in the held raw artefact.",
                quality_status="OBSERVED_LIMITED",
                quality_flags=(*common_flags, *geo_flags),
                geography_match_status=geography_match_status,
                geography_match_detail=geography_match_detail,
                raw_record_key=f"{source_name}:{year}",
                source_document=source_document,
                sample_size="",
                sample_size_unit="",
                sample_size_description="No record-specific sample size is present in the held raw artefact.",
            ))
    if len(rows) != 172:
        raise ValueError(f"expected 172 bird rows, built {len(rows)}")
    return rows


def _grain_key(row: Mapping[str, Any]) -> tuple[str, int, str, str]:
    return (
        str(row["geography_id"]),
        int(row["year"]),
        str(row["species"]),
        str(row["endpoint"]),
    )


def normalize_sentinel_rows() -> tuple[dict[str, Any], ...]:
    """Return all and only held observed non-human sentinel records.

    The exact expected build is 480 rows: 216 COLOSS + 92 dog + 172 bird.
    It validates both the raw manifest hashes and the canonical contract before
    returning anything, so a source change needs an intentional review.
    """
    manifest = _load_manifest()
    rows = [*_normalize_coloss(manifest), *_normalize_dog(manifest), *_normalize_birds(manifest)]
    rows.sort(key=lambda row: (
        str(row["species"]), str(row["geography_id"]), str(row["endpoint"]),
        int(row["year"]), str(row["observation_period"]),
    ))
    if len(rows) != 480:
        raise ValueError(f"expected 480 normalized sentinel rows, built {len(rows)}")
    grains = [_grain_key(row) for row in rows]
    if len(grains) != len(set(grains)):
        duplicate_counts = Counter(grains)
        duplicates = [key for key, count in duplicate_counts.items() if count > 1]
        raise ValueError(f"duplicate sentinel canonical grain(s): {duplicates[:5]}")
    violations = validate_rows(
        rows,
        "sentinel_species_region_year",
        known_source_ids=known_source_ids(),
    )
    if violations:
        shown = "\n  ".join(str(v) for v in violations[:20])
        raise ValueError(
            f"{len(violations)} sentinel contract violation(s); nothing built.\n  {shown}"
        )
    return tuple(rows)


def _csv_bytes(rows: Sequence[Mapping[str, Any]]) -> bytes:
    handle = io.StringIO(newline="")
    writer = csv.DictWriter(handle, fieldnames=CANONICAL_HEADER, lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
    return handle.getvalue().encode("utf-8")


def _manifest_inventory(manifest: Mapping[str, Any]) -> list[dict[str, Any]]:
    inventory: list[dict[str, Any]] = []
    for entry in manifest["files"]:
        if not isinstance(entry, Mapping):
            continue
        inventory.append({
            "source_id": entry.get("source_id"),
            "path": entry.get("path"),
            "sha256": entry.get("sha256"),
            "bytes": entry.get("bytes"),
            "retrieved_at": entry.get("retrieved_at"),
        })
    return sorted(inventory, key=lambda item: str(item["source_id"]))


def _build_summary(
    rows: Sequence[Mapping[str, Any]],
    csv_bytes: bytes,
    *,
    output_path: Path,
) -> dict[str, Any]:
    manifest = _load_manifest()
    by_source = Counter(str(row["source_id"]) for row in rows)
    by_endpoint = Counter(
        f"{row['species']}:{row['endpoint']}" for row in rows
    )
    geo_levels = Counter(str(row["geography_level"]) for row in rows)
    geography_status = Counter(str(row["geography_match_status"]) for row in rows)
    metadata_date_warnings = sorted({
        str(json.loads(str(row["provenance"])).get("raw_file_metadata_date"))
        for row in rows
        if "RAW_FILE_METADATA_DATE_AFTER_MANIFEST" in json.loads(str(row["quality_flags"]))
    })
    return {
        "schema_version": SENTINEL_NORMALIZER_SCHEMA_VERSION,
        "generated_at": SOURCE_SNAPSHOT_DATE,
        "generation_policy": "fixed_source_snapshot_label_for_deterministic_builds",
        "canonical_table": "sentinel_species_region_year",
        "normalizer": PIPELINE_VERSION,
        "canonical_artifact": {
            "path": _repo_relative(output_path),
            "sha256": _sha256_bytes(csv_bytes),
            "row_count": len(rows),
            "columns": list(CANONICAL_HEADER),
            "no_imputation": True,
        },
        "input_manifest": {
            "path": _repo_relative(RAW_MANIFEST_PATH),
            "sha256": _sha256_path(RAW_MANIFEST_PATH),
            "manifest_id": manifest["manifest_id"],
            "retrieved_at": manifest.get("retrieved_at"),
            "files": _manifest_inventory(manifest),
        },
        "included_sources": [
            {
                "source_id": source_id,
                "rows": by_source[source_id],
                "measurement_type": MeasurementType.OBSERVED.value,
            }
            for source_id in (COLOSS_SOURCE_ID, DOG_SOURCE_ID, BIRD_SOURCE_ID)
        ],
        "excluded_sources": [
            {
                "source_id": "LEVINE_2023_SPERM_RECON",
                "reason": "Reconstructed human proxy series; not an observed non-human sentinel record.",
            },
            {
                "source_id": "WAHL_2009_BULL_SEMEN",
                "reason": "Held file contains citation metadata and qualitative trends, not numeric observation rows.",
            },
            {
                "source_id": "KAROUI_2011_BULL_SEMEN",
                "reason": "No row-level numeric series is held in the repository.",
            },
            {
                "source_id": "HENSEL_2025_BOAR_SEMEN",
                "reason": "Held citation summary marks data_available=false; no numeric observations are held.",
            },
        ],
        "coverage": {
            "by_source": dict(sorted(by_source.items())),
            "by_species_endpoint": dict(sorted(by_endpoint.items())),
            "by_geography_level": dict(sorted(geo_levels.items())),
            "by_geography_match_status": dict(sorted(geography_status.items())),
        },
        "provenance_warnings": [
            "COLOSS and bird raw-file metadata dates postdate the 2025-08-18 manifest retrieval label; both values are preserved per row and need a future immutable provenance release to reconcile.",
            *([f"Raw metadata dates carrying that warning: {', '.join(metadata_date_warnings)}."] if metadata_date_warnings else []),
        ],
        "scope_boundary": [
            "Rows describe observed non-human endpoints only; they are not RF dose measurements.",
            "No missing value is imputed or filled.",
            "The canonical artifact is not an eligible causal or cross-species lag analysis panel by itself.",
        ],
    }


def _build_readiness(summary: Mapping[str, Any]) -> dict[str, Any]:
    """State factual data readiness without scoring or inferring causal support."""
    canonical = summary["canonical_artifact"]
    datasets = [
        {
            "source_id": COLOSS_SOURCE_ID,
            "status": "AVAILABLE_LIMITED",
            "row_count": 216,
            "endpoint": "colony_winter_loss",
            "geography": "43 territories; 39 country-level keys and 4 mapped UK subnational keys",
            "limitations": [
                "Winter colony loss is not a direct reproductive endpoint.",
                "No apiary-level RF dosimetry, varroa, pathogen, pesticide, forage, or weather covariates are held.",
                "Methods and temporal coverage differ across territories.",
            ],
        },
        {
            "source_id": DOG_SOURCE_ID,
            "status": "AVAILABLE_LIMITED",
            "row_count": 92,
            "endpoint": "72 semen endpoint rows plus 20 cryptorchidism rows",
            "geography": "one documented SITE identifier only",
            "limitations": [
                "Figure-digitized values from one breeding programme; no matched human panel or RF dosimetry.",
                "The 1999–2001 source gap is artificial and is not imputed.",
            ],
        },
        {
            "source_id": BIRD_SOURCE_ID,
            "status": "AVAILABLE_LIMITED",
            "row_count": 172,
            "endpoint": "population abundance index",
            "geography": "17 national series plus EUR supranational aggregate",
            "limitations": [
                "Abundance is not a reproductive endpoint; index definitions and sampling intervals vary.",
                "No matched site-level RF dosimetry is held.",
            ],
        },
        {
            "source_id": "LEVINE_2023_SPERM_RECON",
            "status": "EXCLUDED",
            "row_count": 0,
            "limitations": [
                "Held series is reconstructed, lacks study-row provenance/uncertainty, and is not promoted to an observed row-level panel.",
            ],
        },
        {
            "source_id": "WAHL_2009_BULL_SEMEN;KAROUI_2011_BULL_SEMEN;HENSEL_2025_BOAR_SEMEN",
            "status": "EXCLUDED",
            "row_count": 0,
            "limitations": [
                "The held livestock JSON contains citations and qualitative descriptions, not numeric observation rows.",
            ],
        },
    ]
    tests = [
        {
            "id": "F1",
            "status": "BLOCKED",
            "title": "Dog-to-human lag",
            "reason": "One dog SITE cannot form a regional or multi-country matched dog–human panel; the held human sperm series is reconstructed and excluded.",
            "requirements": ["Matched regional dog and observed human biomarker time series", "Pre-specified calendar-time lag estimator"],
            "blocker_codes": ["DOG_SINGLE_SITE", "HUMAN_BIOMARKER_NOT_OBSERVED", "NO_MATCHED_PANEL"],
        },
        {
            "id": "F2",
            "status": "BLOCKED",
            "title": "Dog biology versus social covariates",
            "reason": "There is no matched regional dog–human biomarker panel with social covariates at the same geography and time resolution.",
            "requirements": ["Matched dog and observed human biomarker panel", "Co-geographic social covariates", "Pre-specified comparator model"],
            "blocker_codes": ["DOG_SINGLE_SITE", "NO_MATCHED_HUMAN_PANEL", "NO_MATCHED_COVARIATES"],
        },
        {
            "id": "F3",
            "status": "BLOCKED",
            "title": "Bull negative control",
            "reason": "No numeric bull or boar observation rows are held; the livestock file is qualitative citation metadata only.",
            "requirements": ["Row-level bull/boar semen time series", "Matched observed human biomarker panel", "Selection and collection-protocol covariates"],
            "blocker_codes": ["LIVESTOCK_NUMERIC_SERIES_ABSENT", "NO_MATCHED_HUMAN_PANEL"],
        },
        {
            "id": "F4",
            "status": "BLOCKED",
            "title": "Measured exposure gradient",
            "reason": "No species environment has measured RF dosimetry, and no numeric livestock response panel is held.",
            "requirements": ["RF dosimetry for dog and bull/boar environments", "Comparable numeric response panels", "Measured confounders"],
            "blocker_codes": ["RF_DOSIMETRY_ABSENT", "LIVESTOCK_NUMERIC_SERIES_ABSENT"],
        },
        {
            "id": "F5",
            "status": "BLOCKED",
            "title": "Cross-region lag invariance",
            "reason": "Dog data cover one SITE only, so a regional lag distribution and CV cannot be estimated.",
            "requirements": ["Multi-region or multi-country dog panel", "Same-resolution exposure and outcome timing", "Calendar-valid lag method"],
            "blocker_codes": ["DOG_SINGLE_SITE", "NO_REGIONAL_LAG_DISTRIBUTION"],
        },
        {
            "id": "F6",
            "status": "BLOCKED",
            "title": "Chemical discrimination",
            "reason": "No matched region-year chemical exposure and RF dose panel is held for the sentinel records.",
            "requirements": ["Matched PFAS/PCB/phthalate covariates", "Matched RF dosimetry", "Pre-specified multivariable analysis"],
            "blocker_codes": ["CHEMICAL_COVARIATES_ABSENT", "RF_DOSIMETRY_ABSENT"],
        },
    ]
    return {
        "schema_version": SENTINEL_READINESS_SCHEMA_VERSION,
        "generated_at": SOURCE_SNAPSHOT_DATE,
        "generation_policy": "fixed_source_snapshot_label_for_deterministic_builds",
        "status": "BLOCKED",
        "analysis": "cross_species_sentinel_falsification_readiness",
        "canonical_artifact": canonical,
        "tests": tests,
        "datasets": datasets,
        "withdrawn_records": [
            {
                "id": "csli-bee-lag",
                "status": "WITHDRAWN",
                "reason": (
                    "The stored bee lag output uses sparse, mixed-method winter-loss "
                    "data and an unvalidated calendar-time lag method; it is not a forecast."
                ),
            },
            {
                "id": "csli-bird-lag",
                "status": "WITHDRAWN",
                "reason": (
                    "The stored bird lag output uses irregular abundance-index samples "
                    "and an unvalidated calendar-time lag method; it is not a forecast."
                ),
            },
            {
                "id": "csli-sperm-lag",
                "status": "WITHDRAWN",
                "reason": (
                    "The stored sperm lag output depends on a reconstructed human proxy "
                    "series and an unvalidated calendar-time lag method; it is not a forecast."
                ),
            },
        ],
        "no_imputation": True,
        "scope_boundary": [
            "BLOCKED is a data-readiness state, not an evidence score or causal conclusion.",
            "The artifact does not convert mobile subscriptions or qualitative exposure ranks into RF dosimetry.",
        ],
    }


def build_sentinel_artifacts(
    *,
    output_path: Path = DEFAULT_OUTPUT_PATH,
) -> SentinelArtifacts:
    """Build canonical CSV bytes, summary, and readiness JSON in memory."""
    rows = normalize_sentinel_rows()
    csv_bytes = _csv_bytes(rows)
    summary = _build_summary(rows, csv_bytes, output_path=Path(output_path))
    readiness = _build_readiness(summary)
    return SentinelArtifacts(
        rows=rows,
        csv_bytes=csv_bytes,
        summary=summary,
        readiness=readiness,
    )


def _write_one(path: Path, payload: bytes, *, replace: bool) -> str:
    if path.exists():
        if path.read_bytes() == payload:
            return "UNCHANGED_IDENTICAL"
        if not replace:
            raise FileExistsError(
                f"refusing to overwrite changed derived sentinel artifact {path}; "
                "rerun with replace=True after review"
            )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return "REPLACED_EXPLICITLY" if replace else "WRITTEN_NEW"


def write_sentinel_artifacts(
    artifacts: SentinelArtifacts,
    *,
    output_path: Path = DEFAULT_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    readiness_path: Path = DEFAULT_READINESS_PATH,
    public_readiness_path: Path = DEFAULT_PUBLIC_READINESS_PATH,
    replace: bool = False,
) -> dict[str, dict[str, str]]:
    """Write a matching processed CSV/summary and research/public readiness JSON.

    The preflight checks every target first, preventing a half-refreshed release
    when an old public file differs.  The public and research readiness copies
    are byte-identical by design.
    """
    payloads = (
        (Path(output_path), artifacts.csv_bytes),
        (Path(summary_path), _canonical_json_bytes(artifacts.summary)),
        (Path(readiness_path), _canonical_json_bytes(artifacts.readiness)),
        (Path(public_readiness_path), _canonical_json_bytes(artifacts.readiness)),
    )
    for path, payload in payloads:
        if path.exists() and path.read_bytes() != payload and not replace:
            raise FileExistsError(
                f"refusing to overwrite changed derived sentinel artifact {path}; "
                "rerun with replace=True after review"
            )
    result: dict[str, dict[str, str]] = {}
    for path, payload in payloads:
        result[_repo_relative(path)] = {
            "status": _write_one(path, payload, replace=replace),
            "sha256": _sha256_bytes(payload),
        }
    return result


def _cli() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    parser.add_argument("--summary", type=Path, default=DEFAULT_SUMMARY_PATH)
    parser.add_argument("--readiness", type=Path, default=DEFAULT_READINESS_PATH)
    parser.add_argument("--public-readiness", type=Path, default=DEFAULT_PUBLIC_READINESS_PATH)
    parser.add_argument(
        "--replace",
        action="store_true",
        help="explicitly replace changed derived artefacts after review",
    )
    args = parser.parse_args()
    artifacts = build_sentinel_artifacts(output_path=args.output)
    result = write_sentinel_artifacts(
        artifacts,
        output_path=args.output,
        summary_path=args.summary,
        readiness_path=args.readiness,
        public_readiness_path=args.public_readiness,
        replace=args.replace,
    )
    print(_canonical_json(result))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI wiring
    raise SystemExit(_cli())
