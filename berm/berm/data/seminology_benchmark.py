"""Build an isolated benchmark from Fernández-López et al. (2022).

The open Mendeley release behind Predicting fertility from sperm motility
landscapes contains cell-level CASA measurements and insemination outcomes from
a commercial boar artificial-insemination programme. It is useful for
reproducibility and feature-engineering checks, but it is not a BERM sentinel
panel: the release covers one AI station during March--June 2017 and has no
RF/EMF dosimetry or external environmental covariates.

This module never imports or writes the sentinel, CSLI, readiness or prediction
paths. Every output explicitly says BENCHMARK_ONLY_NOT_SENTINEL and
NOT_ELIGIBLE for F1--F6. Raw files are ignored by git and checked against the
versioned manifest before they are read. Derived output is fail-closed.

Run from berm/ with:

    python -m berm.data.seminology_benchmark
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import math
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable, Mapping, Sequence

from berm.data.registry import load_source_registry

__all__ = [
    "PIPELINE_VERSION",
    "SEMINOLOGY_BENCHMARK_SCHEMA_VERSION",
    "SOURCE_ID",
    "DEFAULT_EVENT_OUTPUT_PATH",
    "DEFAULT_EJACULATE_OUTPUT_PATH",
    "DEFAULT_SUMMARY_PATH",
    "EVENT_HEADER",
    "EJACULATE_HEADER",
    "SeminologyBenchmarkArtifacts",
    "validate_raw_inputs",
    "normalize_insemination_events",
    "summarize_ejaculates",
    "build_seminology_benchmark_artifacts",
    "write_seminology_benchmark_artifacts",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
RAW_RELEASE_DIRNAME = "fernandez_lopez_2022_sperm_move_v5"
MANIFEST_FILENAME = "fernandez_lopez_2022_sperm_move_v5_2026-08-19.manifest.json"
FERTILITY_FILENAME = "fertility_data.csv"
SPERM_FILENAME = "sperm_data.csv"

SOURCE_ID = "FERNANDEZ_LOPEZ_2022_BOAR_BENCHMARK"
SOURCE_URL = "https://doi.org/10.17632/jd38jhxpg6.5"
ARTICLE_URL = "https://doi.org/10.1038/s42003-022-03954-0"
SOURCE_LICENSE = "CC-BY-4.0"
SOURCE_PERIOD = "2017-03/2017-06"
RETRIEVED_AT = "2026-08-19"
PIPELINE_VERSION = "seminology_benchmark@v1.0.0"
SEMINOLOGY_BENCHMARK_SCHEMA_VERSION = "berm.seminology_boar_benchmark@v1.0.0"

ANALYSIS_STATUS = "BENCHMARK_ONLY_NOT_SENTINEL"
F1_F6_ELIGIBILITY = "NOT_ELIGIBLE"
SITE_ID = "ESP-CAT-RIUDARANES-BATALLE_SA"
SITE_NAME = "Batallé S.A., Riudarenes, Girona, Spain"
COUNTRY_ISO3 = "ESP"
SPECIES = "Sus_scrofa_domesticus"
BREED = "Pietrain"

DEFAULT_EVENT_OUTPUT_PATH = DATA_DIR / "processed" / "seminology_boar_insemination_events.csv"
DEFAULT_EJACULATE_OUTPUT_PATH = DATA_DIR / "processed" / "seminology_boar_ejaculate_summary.csv"
DEFAULT_SUMMARY_PATH = DATA_DIR / "processed" / "seminology_boar_benchmark_summary.json"

RAW_FERTILITY_HEADER = (
    "Boar",
    "Boar_age",
    "Sow",
    "Sow_parity",
    "Sow_age",
    "Ins_date",
    "Total_born",
    "Dead_born",
    "Alive_born",
    "Ext_date",
    "Success",
    "Ejaculate",
)
RAW_SPERM_HEADER = (
    "Area",
    "VCL",
    "VSL",
    "VAP",
    "LIN",
    "STR",
    "WOB",
    "ALH",
    "BCF",
    "Boar",
    "Ejaculate",
)

KINEMATIC_RAW_FIELDS = ("VCL", "VSL", "VAP", "LIN", "STR", "WOB", "ALH", "BCF")
KINEMATIC_OUTPUT_FIELDS = {
    "VCL": "vcl_mean_um_s",
    "VSL": "vsl_mean_um_s",
    "VAP": "vap_mean_um_s",
    "LIN": "lin_mean_pct",
    "STR": "str_mean_pct",
    "WOB": "wob_mean_pct",
    "ALH": "alh_mean_um",
    "BCF": "bcf_mean_hz",
}
BASE_QUALITY_FLAGS = (
    ANALYSIS_STATUS,
    "FOUR_MONTH_WINDOW",
    "NO_ENVIRONMENTAL_COVARIATES",
    "NO_RF_DOSIMETRY",
    "SELECTION_TRUNCATED_MINIMUM_SEMEN_QUALITY",
    "SINGLE_SITE",
    "UNRESOLVED_OUTCOME_DEFINITION",
)
OUTCOME_DEFINITION_STATUS = (
    "UNRESOLVED_METADATA_PREGNANCY_VS_ARTICLE_FARROWING_RATE"
)

EVENT_HEADER: tuple[str, ...] = (
    "event_id",
    "source_id",
    "source_url",
    "article_url",
    "license",
    "retrieved_at",
    "source_period",
    "analysis_status",
    "f1_f6_eligibility",
    "site_id",
    "site_name",
    "country_iso3",
    "geography_level",
    "species",
    "breed",
    "sex",
    "boar_id",
    "boar_age_months",
    "sow_id",
    "sow_parity",
    "sow_age_source_value",
    "sow_age_unit",
    "semen_extraction_date",
    "insemination_date",
    "ejaculate_id",
    "success_binary_as_deposited",
    "total_born",
    "dead_born",
    "alive_born",
    "measurement_type",
    "proxy_flag",
    "imputation_flag",
    "outcome_definition_status",
    "quality_flags",
    "raw_artifact",
    "raw_artifact_sha256",
    "raw_record_key",
    "transform_pipeline_version",
)

EJACULATE_HEADER: tuple[str, ...] = (
    "ejaculate_key",
    "source_id",
    "source_url",
    "article_url",
    "license",
    "retrieved_at",
    "source_period",
    "analysis_status",
    "f1_f6_eligibility",
    "site_id",
    "site_name",
    "country_iso3",
    "geography_level",
    "species",
    "breed",
    "sex",
    "boar_id",
    "ejaculate_id",
    "sperm_cell_rows",
    "motile_cell_rows",
    "nonmotile_cell_rows",
    "area_mean_um2",
    "vcl_mean_um_s",
    "vsl_mean_um_s",
    "vap_mean_um_s",
    "lin_mean_pct",
    "str_mean_pct",
    "wob_mean_pct",
    "alh_mean_um",
    "bcf_mean_hz",
    "fertility_event_rows",
    "success_count_as_deposited",
    "success_rate_as_deposited",
    "total_born_sum",
    "dead_born_sum",
    "alive_born_sum",
    "outcome_definition_status",
    "quality_flags",
    "raw_sperm_artifact",
    "raw_sperm_artifact_sha256",
    "raw_fertility_artifact",
    "raw_fertility_artifact_sha256",
    "raw_record_key",
    "transform_pipeline_version",
)


@dataclass(frozen=True)
class SeminologyBenchmarkArtifacts:
    """Deterministic benchmark outputs ready for fail-closed writing."""

    event_rows: tuple[dict[str, Any], ...]
    ejaculate_rows: tuple[dict[str, Any], ...]
    event_csv_bytes: bytes
    ejaculate_csv_bytes: bytes
    summary: dict[str, Any]


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


def _data_relative(path: Path, data_dir: Path) -> str:
    try:
        return str(path.resolve().relative_to(data_dir.resolve()))
    except ValueError:
        return str(path)


def _release_dir(data_dir: Path) -> Path:
    return data_dir / "raw" / "veterinary" / RAW_RELEASE_DIRNAME


def _default_manifest_path(data_dir: Path) -> Path:
    return data_dir / "raw" / "manifests" / MANIFEST_FILENAME


def _load_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        raise ValueError(f"invalid Fernández-López benchmark manifest: {path}")
    if manifest.get("manifest_id") != "fernandez_lopez_2022_sperm_move_v5_2026-08-19":
        raise ValueError(f"unexpected Fernández-López manifest identifier: {path}")
    return manifest


def _manifest_entries(manifest: Mapping[str, Any]) -> dict[str, Mapping[str, Any]]:
    entries: dict[str, Mapping[str, Any]] = {}
    for entry in manifest["files"]:
        if not isinstance(entry, Mapping):
            raise ValueError("Fernández-López manifest contains a non-object file entry")
        path = entry.get("path")
        if not isinstance(path, str) or not path:
            raise ValueError("Fernández-López manifest has a file entry without path")
        if path in entries:
            raise ValueError(f"Fernández-López manifest has duplicate path {path!r}")
        entries[path] = entry
    return entries


def _read_csv(path: Path, expected_header: Sequence[str]) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        header = tuple(reader.fieldnames or ())
        if header != tuple(expected_header):
            raise ValueError(
                f"unexpected header in {path.name}: expected {tuple(expected_header)!r}, "
                f"got {header!r}"
            )
        rows = [{key: (value or "").strip() for key, value in row.items()} for row in reader]
    if not rows:
        raise ValueError(f"raw table is empty: {path}")
    return rows


def _checked_raw_tables(
    *,
    data_dir: Path,
    manifest_path: Path,
) -> tuple[list[dict[str, str]], list[dict[str, str]], dict[str, Any]]:
    """Load exact raw CSVs only after every manifest check has passed."""

    manifest = _load_manifest(manifest_path)
    entries = _manifest_entries(manifest)
    release_dir = _release_dir(data_dir)
    selected: dict[str, dict[str, Any]] = {}
    for filename, expected_header in (
        (FERTILITY_FILENAME, RAW_FERTILITY_HEADER),
        (SPERM_FILENAME, RAW_SPERM_HEADER),
    ):
        path = release_dir / filename
        relative = _data_relative(path, data_dir)
        entry = entries.get(relative)
        if entry is None:
            raise ValueError(f"manifest has no entry for {relative}")
        if entry.get("source_id") != SOURCE_ID:
            raise ValueError(f"manifest source_id mismatch for {relative}")
        if not path.exists():
            raise FileNotFoundError(
                f"held Fernández-López source artefact is missing: {path}; "
                "download the exact manifest release before building the benchmark"
            )
        actual_sha = _sha256_path(path)
        if actual_sha != entry.get("sha256"):
            raise ValueError(
                f"raw checksum mismatch for {relative}: "
                f"manifest={entry.get('sha256')!r} actual={actual_sha!r}"
            )
        if path.stat().st_size != entry.get("bytes"):
            raise ValueError(
                f"raw byte-size mismatch for {relative}: "
                f"manifest={entry.get('bytes')!r} actual={path.stat().st_size!r}"
            )
        selected[filename] = {
            "path": path,
            "relative_path": relative,
            "sha256": actual_sha,
            "bytes": path.stat().st_size,
            "expected_header": tuple(expected_header),
        }
    fertility_rows = _read_csv(selected[FERTILITY_FILENAME]["path"], RAW_FERTILITY_HEADER)
    sperm_rows = _read_csv(selected[SPERM_FILENAME]["path"], RAW_SPERM_HEADER)
    return fertility_rows, sperm_rows, {
        "manifest_id": manifest["manifest_id"],
        "manifest_path": _data_relative(manifest_path, data_dir),
        "files": selected,
    }


def _parse_date(value: str, *, field: str, record_id: str) -> str:
    try:
        return datetime.strptime(value, "%d/%m/%Y").date().isoformat()
    except ValueError as exc:
        raise ValueError(f"{record_id} has invalid {field} date {value!r}") from exc


def _required(row: Mapping[str, str], field: str, *, record_id: str) -> str:
    value = row.get(field, "")
    if value is None or not str(value).strip():
        raise ValueError(f"{record_id} is missing {field!r}")
    return str(value).strip()


def _integer(row: Mapping[str, str], field: str, *, record_id: str) -> int:
    raw = _required(row, field, record_id=record_id)
    try:
        return int(raw)
    except ValueError as exc:
        raise ValueError(f"{record_id} has noninteger {field!r}: {raw!r}") from exc


def _number(
    row: Mapping[str, str],
    field: str,
    *,
    record_id: str,
    allow_na: bool = False,
) -> float | None:
    raw = _required(row, field, record_id=record_id)
    if allow_na and raw.upper() == "NA":
        return None
    try:
        value = float(raw)
    except ValueError as exc:
        raise ValueError(f"{record_id} has nonnumeric {field!r}: {raw!r}") from exc
    if not math.isfinite(value):
        raise ValueError(f"{record_id} has nonfinite {field!r}: {raw!r}")
    return value


def _fertility_key(row: Mapping[str, str], row_number: int) -> tuple[str, str]:
    record_id = f"fertility_data.csv:{row_number}"
    return (
        _required(row, "Boar", record_id=record_id),
        _required(row, "Ejaculate", record_id=record_id),
    )


def _natural_key(value: str) -> tuple[str, int, str]:
    """Sort labels such as Boar 2 before Boar 10."""

    prefix, _, suffix = value.rpartition(" ")
    if suffix.isdigit():
        return (prefix, int(suffix), value)
    return (value, -1, value)


def _quality_flags(*additional: str) -> str:
    return _canonical_json(sorted(set(BASE_QUALITY_FLAGS).union(additional)))


def _raw_counts(
    fertility_rows: Iterable[Mapping[str, str]],
    sperm_rows: Iterable[Mapping[str, str]],
) -> dict[str, int]:
    fertility = list(fertility_rows)
    sperm = list(sperm_rows)
    fertility_keys = {
        _fertility_key(row, row_number)
        for row_number, row in enumerate(fertility, start=2)
    }
    sperm_keys = {
        (
            _required(row, "Boar", record_id=f"sperm_data.csv:{row_number}"),
            _required(row, "Ejaculate", record_id=f"sperm_data.csv:{row_number}"),
        )
        for row_number, row in enumerate(sperm, start=2)
    }
    motile = 0
    for row_number, row in enumerate(sperm, start=2):
        record_id = f"sperm_data.csv:{row_number}"
        if all(_number(row, field, record_id=record_id, allow_na=True) is not None
               for field in KINEMATIC_RAW_FIELDS):
            motile += 1
    return {
        "raw_fertility_rows": len(fertility),
        "raw_sperm_cell_rows": len(sperm),
        "boar_count": len({_fertility_key(row, i)[0] for i, row in enumerate(fertility, start=2)}),
        "sperm_ejaculate_count": len(sperm_keys),
        "fertility_ejaculate_count": len(fertility_keys),
        "motile_cell_rows": motile,
        "nonmotile_cell_rows": len(sperm) - motile,
    }


def _assert_expected_raw_counts(counts: Mapping[str, int]) -> None:
    expected = {
        "raw_fertility_rows": 221,
        "raw_sperm_cell_rows": 98020,
        "boar_count": 17,
        "sperm_ejaculate_count": 36,
        "fertility_ejaculate_count": 34,
        "motile_cell_rows": 69170,
        "nonmotile_cell_rows": 28850,
    }
    if dict(counts) != expected:
        raise ValueError(
            "Fernández-López raw release does not match pinned v5 dimensions: "
            f"expected={expected!r} actual={dict(counts)!r}"
        )


def validate_raw_inputs(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> dict[str, Any]:
    """Validate raw bytes, headers and pinned row dimensions without writing."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    fertility_rows, sperm_rows, raw_info = _checked_raw_tables(
        data_dir=data_dir,
        manifest_path=manifest_path,
    )
    counts = _raw_counts(fertility_rows, sperm_rows)
    _assert_expected_raw_counts(counts)
    return {
        "manifest_id": raw_info["manifest_id"],
        "files": {
            filename: {
                "path": raw_info["files"][filename]["relative_path"],
                "bytes": raw_info["files"][filename]["bytes"],
                "sha256": raw_info["files"][filename]["sha256"],
            }
            for filename in (FERTILITY_FILENAME, SPERM_FILENAME)
        },
        **counts,
    }


def _event_rows(
    fertility_rows: Sequence[Mapping[str, str]],
    raw_info: Mapping[str, Any],
) -> tuple[dict[str, Any], ...]:
    fertility_file = raw_info["files"][FERTILITY_FILENAME]
    output: list[dict[str, Any]] = []
    seen_event_ids: set[str] = set()
    for row_number, row in enumerate(fertility_rows, start=2):
        record_id = f"{FERTILITY_FILENAME}:{row_number}"
        boar_id = _required(row, "Boar", record_id=record_id)
        sow_id = _required(row, "Sow", record_id=record_id)
        ejaculate_id = _required(row, "Ejaculate", record_id=record_id)
        insemination_date = _parse_date(
            _required(row, "Ins_date", record_id=record_id),
            field="Ins_date",
            record_id=record_id,
        )
        extraction_date = _parse_date(
            _required(row, "Ext_date", record_id=record_id),
            field="Ext_date",
            record_id=record_id,
        )
        total_born = _integer(row, "Total_born", record_id=record_id)
        dead_born = _integer(row, "Dead_born", record_id=record_id)
        alive_born = _integer(row, "Alive_born", record_id=record_id)
        success = _integer(row, "Success", record_id=record_id)
        if min(total_born, dead_born, alive_born) < 0:
            raise ValueError(f"{record_id} has a negative litter outcome")
        if dead_born + alive_born != total_born:
            raise ValueError(
                f"{record_id} has inconsistent litter counts: "
                "dead_born + alive_born != total_born"
            )
        if success not in {0, 1}:
            raise ValueError(f"{record_id} has non-binary Success value {success!r}")
        event_id = "|".join((boar_id, sow_id, insemination_date, ejaculate_id, str(row_number)))
        if event_id in seen_event_ids:
            raise ValueError(f"duplicate normalized event id {event_id!r}")
        seen_event_ids.add(event_id)
        output.append({
            "event_id": event_id,
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "article_url": ARTICLE_URL,
            "license": SOURCE_LICENSE,
            "retrieved_at": RETRIEVED_AT,
            "source_period": SOURCE_PERIOD,
            "analysis_status": ANALYSIS_STATUS,
            "f1_f6_eligibility": F1_F6_ELIGIBILITY,
            "site_id": SITE_ID,
            "site_name": SITE_NAME,
            "country_iso3": COUNTRY_ISO3,
            "geography_level": "SITE",
            "species": SPECIES,
            "breed": BREED,
            "sex": "MALE",
            "boar_id": boar_id,
            # The article identifies young boars below 13 months, but does not
            # justify deriving a birth cohort from this source field.
            "boar_age_months": _number(row, "Boar_age", record_id=record_id),
            "sow_id": sow_id,
            "sow_parity": _integer(row, "Sow_parity", record_id=record_id),
            "sow_age_source_value": _number(row, "Sow_age", record_id=record_id),
            "sow_age_unit": "UNSPECIFIED_BY_SOURCE",
            "semen_extraction_date": extraction_date,
            "insemination_date": insemination_date,
            "ejaculate_id": ejaculate_id,
            "success_binary_as_deposited": success,
            "total_born": total_born,
            "dead_born": dead_born,
            "alive_born": alive_born,
            "measurement_type": "OBSERVED",
            "proxy_flag": False,
            "imputation_flag": False,
            "outcome_definition_status": OUTCOME_DEFINITION_STATUS,
            "quality_flags": _quality_flags(),
            "raw_artifact": fertility_file["relative_path"],
            "raw_artifact_sha256": fertility_file["sha256"],
            "raw_record_key": record_id,
            "transform_pipeline_version": PIPELINE_VERSION,
        })
    return tuple(sorted(
        output,
        key=lambda value: (
            value["insemination_date"],
            _natural_key(value["boar_id"]),
            _natural_key(value["sow_id"]),
            value["ejaculate_id"],
            value["raw_record_key"],
        ),
    ))


def normalize_insemination_events(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> tuple[dict[str, Any], ...]:
    """Return 221 direct insemination-event rows without writing anything."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    fertility_rows, sperm_rows, raw_info = _checked_raw_tables(
        data_dir=data_dir,
        manifest_path=manifest_path,
    )
    _assert_expected_raw_counts(_raw_counts(fertility_rows, sperm_rows))
    return _event_rows(fertility_rows, raw_info)


def _new_ejaculate_state() -> dict[str, Any]:
    return {
        "sperm_cell_rows": 0,
        "motile_cell_rows": 0,
        "area_sum": 0.0,
        "area_n": 0,
        "metric_sum": {field: 0.0 for field in KINEMATIC_RAW_FIELDS},
        "metric_n": {field: 0 for field in KINEMATIC_RAW_FIELDS},
    }


def _event_map(
    events: Iterable[Mapping[str, Any]],
) -> dict[tuple[str, str], list[Mapping[str, Any]]]:
    events_by_ejaculate: dict[tuple[str, str], list[Mapping[str, Any]]] = defaultdict(list)
    for event in events:
        events_by_ejaculate[(str(event["boar_id"]), str(event["ejaculate_id"]))].append(event)
    return events_by_ejaculate


def _mean(total: float, count: int) -> float | None:
    return total / count if count else None


def _ejaculate_rows(
    sperm_rows: Sequence[Mapping[str, str]],
    events: Iterable[Mapping[str, Any]],
    raw_info: Mapping[str, Any],
) -> tuple[dict[str, Any], ...]:
    sperm_file = raw_info["files"][SPERM_FILENAME]
    fertility_file = raw_info["files"][FERTILITY_FILENAME]
    states: dict[tuple[str, str], dict[str, Any]] = {}
    for row_number, row in enumerate(sperm_rows, start=2):
        record_id = f"{SPERM_FILENAME}:{row_number}"
        boar_id = _required(row, "Boar", record_id=record_id)
        ejaculate_id = _required(row, "Ejaculate", record_id=record_id)
        key = (boar_id, ejaculate_id)
        state = states.setdefault(key, _new_ejaculate_state())
        state["sperm_cell_rows"] += 1
        area = _number(row, "Area", record_id=record_id)
        assert area is not None
        state["area_sum"] += area
        state["area_n"] += 1
        metrics = {
            field: _number(row, field, record_id=record_id, allow_na=True)
            for field in KINEMATIC_RAW_FIELDS
        }
        is_motile = all(value is not None for value in metrics.values())
        if is_motile:
            state["motile_cell_rows"] += 1
        elif any(value is not None for value in metrics.values()):
            raise ValueError(
                f"{record_id} has a partially missing kinetic vector; "
                "the pinned release should contain complete vectors or all-NA nonmotile rows"
            )
        for field, value in metrics.items():
            if value is not None:
                state["metric_sum"][field] += value
                state["metric_n"][field] += 1

    events_by_ejaculate = _event_map(events)
    unmatched_event_keys = set(events_by_ejaculate).difference(states)
    if unmatched_event_keys:
        raise ValueError(
            "fertility events reference ejaculates absent from sperm_data.csv: "
            f"{sorted(unmatched_event_keys)!r}"
        )

    output: list[dict[str, Any]] = []
    for (boar_id, ejaculate_id), state in sorted(
        states.items(),
        key=lambda item: (_natural_key(item[0][0]), _natural_key(item[0][1])),
    ):
        matching_events = events_by_ejaculate.get((boar_id, ejaculate_id), [])
        fertility_event_rows = len(matching_events)
        successes = sum(int(event["success_binary_as_deposited"]) for event in matching_events)
        extra_flags: tuple[str, ...] = ()
        if not matching_events:
            extra_flags = ("NO_MATCHING_FERTILITY_EVENTS",)
        row: dict[str, Any] = {
            "ejaculate_key": f"{boar_id}|{ejaculate_id}",
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "article_url": ARTICLE_URL,
            "license": SOURCE_LICENSE,
            "retrieved_at": RETRIEVED_AT,
            "source_period": SOURCE_PERIOD,
            "analysis_status": ANALYSIS_STATUS,
            "f1_f6_eligibility": F1_F6_ELIGIBILITY,
            "site_id": SITE_ID,
            "site_name": SITE_NAME,
            "country_iso3": COUNTRY_ISO3,
            "geography_level": "SITE",
            "species": SPECIES,
            "breed": BREED,
            "sex": "MALE",
            "boar_id": boar_id,
            "ejaculate_id": ejaculate_id,
            "sperm_cell_rows": state["sperm_cell_rows"],
            "motile_cell_rows": state["motile_cell_rows"],
            "nonmotile_cell_rows": state["sperm_cell_rows"] - state["motile_cell_rows"],
            "area_mean_um2": _mean(state["area_sum"], state["area_n"]),
            "fertility_event_rows": fertility_event_rows,
            "success_count_as_deposited": successes,
            "success_rate_as_deposited": (
                successes / fertility_event_rows if fertility_event_rows else None
            ),
            "total_born_sum": sum(int(event["total_born"]) for event in matching_events),
            "dead_born_sum": sum(int(event["dead_born"]) for event in matching_events),
            "alive_born_sum": sum(int(event["alive_born"]) for event in matching_events),
            "outcome_definition_status": OUTCOME_DEFINITION_STATUS,
            "quality_flags": _quality_flags(*extra_flags),
            "raw_sperm_artifact": sperm_file["relative_path"],
            "raw_sperm_artifact_sha256": sperm_file["sha256"],
            "raw_fertility_artifact": fertility_file["relative_path"],
            "raw_fertility_artifact_sha256": fertility_file["sha256"],
            "raw_record_key": f"{SPERM_FILENAME}:{boar_id}|{ejaculate_id}",
            "transform_pipeline_version": PIPELINE_VERSION,
        }
        for raw_field, output_field in KINEMATIC_OUTPUT_FIELDS.items():
            row[output_field] = _mean(
                state["metric_sum"][raw_field],
                state["metric_n"][raw_field],
            )
        output.append(row)
    return tuple(output)


def summarize_ejaculates(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> tuple[dict[str, Any], ...]:
    """Return 36 CASA summaries joined only to directly held fertility events."""

    manifest_path = manifest_path or _default_manifest_path(data_dir)
    fertility_rows, sperm_rows, raw_info = _checked_raw_tables(
        data_dir=data_dir,
        manifest_path=manifest_path,
    )
    _assert_expected_raw_counts(_raw_counts(fertility_rows, sperm_rows))
    events = _event_rows(fertility_rows, raw_info)
    return _ejaculate_rows(sperm_rows, events, raw_info)


def _csv_bytes(rows: Iterable[Mapping[str, Any]], header: Sequence[str]) -> bytes:
    handle = io.StringIO(newline="")
    writer = csv.DictWriter(
        handle,
        fieldnames=header,
        extrasaction="raise",
        lineterminator="\n",
    )
    writer.writeheader()
    for row in rows:
        rendered: dict[str, str] = {}
        for field in header:
            value = row.get(field)
            if value is None:
                rendered[field] = ""
            elif isinstance(value, bool):
                rendered[field] = "true" if value else "false"
            elif isinstance(value, float):
                rendered[field] = format(value, ".12g")
            else:
                rendered[field] = str(value)
        writer.writerow(rendered)
    return handle.getvalue().encode("utf-8")


def _validate_source_registry() -> None:
    source = load_source_registry().get(SOURCE_ID)
    if source is None:
        raise ValueError(f"source registry is missing {SOURCE_ID}")
    if source.access_status != "OPEN":
        raise ValueError(f"{SOURCE_ID} must be OPEN before its raw files are read")
    if source.measurement_class != "OBSERVED":
        raise ValueError(
            f"{SOURCE_ID} must be classified OBSERVED, got {source.measurement_class!r}"
        )
    if source.feeds_prediction:
        raise ValueError(
            f"{SOURCE_ID} must not feed active prediction; it is a benchmark-only source"
        )


def build_seminology_benchmark_artifacts(
    *,
    data_dir: Path = DATA_DIR,
    manifest_path: Path | None = None,
) -> SeminologyBenchmarkArtifacts:
    """Build all outputs in memory. The benchmark is never a sentinel input."""

    _validate_source_registry()
    manifest_path = manifest_path or _default_manifest_path(data_dir)
    fertility_rows, sperm_rows, raw_info = _checked_raw_tables(
        data_dir=data_dir,
        manifest_path=manifest_path,
    )
    raw_counts = _raw_counts(fertility_rows, sperm_rows)
    _assert_expected_raw_counts(raw_counts)
    events = _event_rows(fertility_rows, raw_info)
    ejaculates = _ejaculate_rows(sperm_rows, events, raw_info)
    unmatched_ejaculates = [
        row["ejaculate_key"] for row in ejaculates
        if row["fertility_event_rows"] == 0
    ]
    summary = {
        "schema_version": SEMINOLOGY_BENCHMARK_SCHEMA_VERSION,
        "pipeline_version": PIPELINE_VERSION,
        "analysis_status": ANALYSIS_STATUS,
        "eligibility": {
            "f1_f6": F1_F6_ELIGIBILITY,
            "reason_codes": [
                "FOUR_MONTH_WINDOW",
                "NO_ENVIRONMENTAL_COVARIATES",
                "NO_RF_DOSIMETRY",
                "SINGLE_SITE",
            ],
        },
        "source": {
            "source_id": SOURCE_ID,
            "source_url": SOURCE_URL,
            "article_url": ARTICLE_URL,
            "license": SOURCE_LICENSE,
            "retrieved_at": RETRIEVED_AT,
            "source_period": SOURCE_PERIOD,
            "site_id": SITE_ID,
            "site_name": SITE_NAME,
            "country_iso3": COUNTRY_ISO3,
        },
        "raw_integrity": {
            "manifest_id": raw_info["manifest_id"],
            "files": [
                {
                    "path": raw_info["files"][filename]["relative_path"],
                    "bytes": raw_info["files"][filename]["bytes"],
                    "sha256": raw_info["files"][filename]["sha256"],
                }
                for filename in (FERTILITY_FILENAME, SPERM_FILENAME)
            ],
        },
        "row_counts": {
            **raw_counts,
            "normalized_insemination_event_rows": len(events),
            "normalized_ejaculate_summary_rows": len(ejaculates),
            "ejaculates_with_fertility_events": len(ejaculates) - len(unmatched_ejaculates),
            "ejaculates_without_fertility_events": len(unmatched_ejaculates),
        },
        "schema": {
            "insemination_events": list(EVENT_HEADER),
            "ejaculate_summary": list(EJACULATE_HEADER),
        },
        "outcome_definition_warning": {
            "status": OUTCOME_DEFINITION_STATUS,
            "detail": (
                "Mendeley metadata describes Success as pregnancy, while the "
                "associated article describes its fertility endpoint as farrowing "
                "rate. The raw binary is retained only as success_binary_as_deposited."
            ),
        },
        "unmatched_ejaculate_keys": unmatched_ejaculates,
        "limitations": [
            "One commercial AI site in Riudarenes, Girona, Spain.",
            "Observed March--June 2017 only; a four-month release, not a long panel.",
            "No RF/EMF dosimetry or field-strength proxy is present.",
            "No external environmental, chemical, weather or husbandry covariates are present.",
            "Source selection requires minimum morphology and motility thresholds.",
            "Two of 36 ejaculates have no linked fertility event in the released fertility table.",
            "The source outcome definition is unresolved between Mendeley metadata and article wording.",
        ],
    }
    return SeminologyBenchmarkArtifacts(
        event_rows=events,
        ejaculate_rows=ejaculates,
        event_csv_bytes=_csv_bytes(events, EVENT_HEADER),
        ejaculate_csv_bytes=_csv_bytes(ejaculates, EJACULATE_HEADER),
        summary=summary,
    )


def _write_bytes(
    path: Path,
    payload: bytes,
    *,
    replace: bool,
) -> dict[str, str]:
    if path.exists():
        existing = path.read_bytes()
        if existing == payload:
            return {"path": str(path), "status": "UNCHANGED_IDENTICAL"}
        if not replace:
            raise FileExistsError(
                f"refusing to overwrite changed benchmark artefact {path}; "
                "pass replace=True only after reviewing a raw or manifest change"
            )
        path.write_bytes(payload)
        return {"path": str(path), "status": "REPLACED_EXPLICITLY"}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    return {"path": str(path), "status": "WRITTEN_NEW"}


def write_seminology_benchmark_artifacts(
    artifacts: SeminologyBenchmarkArtifacts,
    *,
    event_output_path: Path = DEFAULT_EVENT_OUTPUT_PATH,
    ejaculate_output_path: Path = DEFAULT_EJACULATE_OUTPUT_PATH,
    summary_path: Path = DEFAULT_SUMMARY_PATH,
    replace: bool = False,
) -> dict[str, dict[str, str]]:
    """Write a matched artifact set without ever touching raw source bytes."""

    return {
        "insemination_events": _write_bytes(
            event_output_path, artifacts.event_csv_bytes, replace=replace
        ),
        "ejaculate_summary": _write_bytes(
            ejaculate_output_path, artifacts.ejaculate_csv_bytes, replace=replace
        ),
        "summary": _write_bytes(
            summary_path, _canonical_json_bytes(artifacts.summary), replace=replace
        ),
    }


def _main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Build the isolated Fernández-López boar seminology benchmark."
    )
    parser.add_argument(
        "--replace",
        action="store_true",
        help="replace a changed derived output after manual review",
    )
    args = parser.parse_args(argv)
    artifacts = build_seminology_benchmark_artifacts()
    outcomes = write_seminology_benchmark_artifacts(artifacts, replace=args.replace)
    print(_canonical_json({
        "analysis_status": ANALYSIS_STATUS,
        "f1_f6_eligibility": F1_F6_ELIGIBILITY,
        "row_counts": artifacts.summary["row_counts"],
        "outputs": outcomes,
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(_main())
