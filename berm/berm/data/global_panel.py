"""Build the provenance-rich all-country annual BERM input panel.

The panel is an addition to, not a replacement for, the published Core-51
backtest.  It joins an immutable World Bank release to the independently
ingested WPP 2024 TFR product while keeping all source, measurement-type and
missingness information at the country-year-field level.

TFR selection is intentionally explicit:

``WPP ESTIMATE`` -> ``World Bank value`` -> ``WPP PROJECTION_MEDIUM``.

The last option exists so 2024 can be represented when no source has reported
an observed value, but it remains a ``DERIVED`` projection in the output.  No
interpolation, extrapolation, military layer or broadcast layer is introduced
by this data product.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping

from berm.data.global_download import DATA_DIR, INDICATORS, WorldBankRelease, load_world_bank_release
from berm.data.wpp import OUT_TFR, SOURCE_ID_TFR, WPP_REVISION

__all__ = [
    "GLOBAL_DIR",
    "DEFAULT_PANEL_PATH",
    "GLOBAL_PANEL_SCHEMA_VERSION",
    "GlobalPanelResult",
    "build_global_panel",
    "build_global_panel_from_release",
    "load_global_panel",
    "write_global_panel",
]


GLOBAL_DIR = DATA_DIR / "global"
DEFAULT_PANEL_PATH = GLOBAL_DIR / "all_countries_panel.json"
GLOBAL_PANEL_SCHEMA_VERSION = "berm.global_country_year_panel@v1.0.0"
PIPELINE_VERSION = "global_panel_build@v1.0.0"
_START_YEAR = 1960
_END_YEAR = 2024
_BASE_FIELDS = tuple(spec.field for spec in INDICATORS)
_OPTIONAL_COVARIATE_FIELDS = (
    "education_years_female",
    "religiosity_pct",
    "immigrant_share",
    "ivf_share",
)
_ALL_FIELDS = _BASE_FIELDS + _OPTIONAL_COVARIATE_FIELDS


@dataclass(frozen=True)
class GlobalPanelResult:
    """Result and coverage report returned before immutable output is written."""

    panel: Mapping[str, Any]
    coverage: Mapping[str, Any]


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _relative_data_path(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(DATA_DIR.resolve()))
    except ValueError:
        return str(path)


def _canonical_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def _read_wpp_tfr(path: Path) -> dict[str, dict[int, dict[str, Any]]]:
    """Read WPP's canonical TFR product without blurring estimates/projections."""
    if not path.exists():
        raise FileNotFoundError(
            f"canonical WPP TFR product not found: {path}; run `python -m berm.data.wpp ingest` first"
        )
    out: dict[str, dict[int, dict[str, Any]]] = {}
    with path.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            if row.get("source_id") != SOURCE_ID_TFR:
                continue
            try:
                iso3 = str(row["geography_id"]).upper()
                year = int(row["year"])
                value = float(row["value"])
            except (KeyError, TypeError, ValueError):
                continue
            if not iso3.isalpha() or len(iso3) != 3:
                continue
            out.setdefault(iso3, {})[year] = {
                "value": value,
                "source_id": row["source_id"],
                "source_url": row.get("source_url", ""),
                "retrieved_at": row.get("retrieved_at", ""),
                "unit": row.get("unit", "births_per_woman"),
                "measurement_type": row.get("measurement_type", ""),
                "proxy_flag": str(row.get("proxy_flag", "")).lower() == "true",
                "raw_artifact": _relative_data_path(path),
                "series_status": row.get("series_status", ""),
                "wpp_revision": row.get("wpp_revision", WPP_REVISION),
                "wpp_variant": row.get("wpp_variant", "Medium"),
            }
    return out


def _missing_provenance(field: str, *, reason: str) -> dict[str, Any]:
    return {
        "status": "MISSING",
        "field": field,
        "reason": reason,
        "source_id": None,
        "measurement_type": None,
        "proxy_flag": None,
    }


def _observed_provenance(observation: Mapping[str, Any], *, selection_rule: str | None = None) -> dict[str, Any]:
    provenance = {
        "status": "AVAILABLE",
        "source_id": observation.get("source_id"),
        "source_url": observation.get("source_url"),
        "retrieved_at": observation.get("retrieved_at"),
        "unit": observation.get("unit"),
        "measurement_type": observation.get("measurement_type"),
        "proxy_flag": observation.get("proxy_flag"),
        "raw_artifact": observation.get("raw_artifact"),
        "series_status": observation.get("series_status"),
    }
    if observation.get("indicator_code"):
        provenance["indicator_code"] = observation["indicator_code"]
    if observation.get("wpp_revision"):
        provenance["wpp_revision"] = observation["wpp_revision"]
    if selection_rule:
        provenance["selection_rule"] = selection_rule
    return provenance


def _select_tfr(
    wpp_observation: Mapping[str, Any] | None,
    wb_observation: Mapping[str, Any] | None,
) -> tuple[Mapping[str, Any] | None, str]:
    """Select the primary TFR with estimate/fallback/projection provenance."""
    if wpp_observation and wpp_observation.get("series_status") == "ESTIMATE":
        return wpp_observation, "WPP_ESTIMATE_PREFERRED"
    if wb_observation:
        return wb_observation, "WORLD_BANK_FALLBACK_WHEN_WPP_ESTIMATE_ABSENT"
    if wpp_observation:
        return wpp_observation, "WPP_PROJECTION_ONLY_WHEN_NO_OBSERVED_TFR"
    return None, "NO_WPP_OR_WORLD_BANK_TFR"


def _year_record(
    *,
    iso3: str,
    year: int,
    wb_fields: Mapping[str, Mapping[str, Any]],
    wpp_tfr: Mapping[str, Any] | None,
) -> dict[str, Any]:
    row: dict[str, Any] = {
        "year": year,
        "field_provenance": {},
        "missingness": {},
    }
    selected_tfr, tfr_selection = _select_tfr(wpp_tfr, wb_fields.get("tfr"))
    for field in _ALL_FIELDS:
        observation: Mapping[str, Any] | None
        selection_rule: str | None = None
        if field == "tfr":
            observation = selected_tfr
            selection_rule = tfr_selection
        else:
            observation = wb_fields.get(field)
        if observation is None:
            reason = (
                "not_acquired_in_this_release" if field in _OPTIONAL_COVARIATE_FIELDS
                else "not_reported_by_source_for_country_year"
            )
            row[field] = None
            row[f"{field}_source"] = None
            row[f"{field}_measurement_type"] = None
            row["field_provenance"][field] = _missing_provenance(field, reason=reason)
            row["missingness"][field] = reason
            continue
        row[field] = observation["value"]
        row[f"{field}_source"] = observation.get("source_id")
        row[f"{field}_measurement_type"] = observation.get("measurement_type")
        row["field_provenance"][field] = _observed_provenance(
            observation, selection_rule=selection_rule,
        )
        row["missingness"][field] = "AVAILABLE"
    # These two TFR labels are deliberately top-level because model consumers
    # should not have to infer projection status from a nested provenance map.
    row["tfr_series_status"] = (
        selected_tfr.get("series_status") if selected_tfr is not None else None
    )
    row["tfr_selection_rule"] = tfr_selection
    return row


def _coverage(countries: Mapping[str, Any], *, start_year: int, end_year: int) -> dict[str, Any]:
    expected = len(countries) * (end_year - start_year + 1)
    fields: dict[str, Any] = {}
    for field in _ALL_FIELDS:
        available = sum(
            1
            for country in countries.values()
            for row in country["years"].values()
            if row.get(field) is not None
        )
        fields[field] = {
            "available_country_years": available,
            "possible_country_years": expected,
            "missing_country_years": expected - available,
            "availability_pct": round(100.0 * available / expected, 3) if expected else 0.0,
        }
    return {
        "country_count": len(countries),
        "year_min": start_year,
        "year_max": end_year,
        "possible_country_years": expected,
        "fields": fields,
    }


def build_global_panel(
    world_bank: WorldBankRelease,
    *,
    wpp_tfr_path: Path = OUT_TFR,
    start_year: int = _START_YEAR,
    end_year: int = _END_YEAR,
) -> GlobalPanelResult:
    """Merge WPP TFR and World Bank data into country × year rows.

    The World Bank metadata gives the authoritative 217-country WB set.  WPP's
    canonical Country/Area product is separately valid, so the output keeps the
    union rather than discarding WPP-only areas merely because World Bank does
    not publish an economy record for them.
    """
    if start_year > end_year:
        raise ValueError("start_year must be <= end_year")
    wpp = _read_wpp_tfr(Path(wpp_tfr_path))
    all_iso3 = sorted(set(world_bank.countries) | set(wpp))
    countries: dict[str, Any] = {}
    for iso3 in all_iso3:
        wb_meta = world_bank.countries.get(iso3)
        wb_years = world_bank.observations.get(iso3, {})
        countries[iso3] = {
            "geography_id": iso3,
            "country_name": wb_meta.get("name") if wb_meta else None,
            "country_provenance": {
                "world_bank_country_metadata": bool(wb_meta),
                "wpp_country_area": iso3 in wpp,
                "world_bank_region_id": wb_meta.get("region_id") if wb_meta else None,
                "world_bank_income_level": wb_meta.get("income_level") if wb_meta else None,
                "country_filter": (
                    "World Bank region.id != 'NA'" if wb_meta
                    else "WPP Country/Area member; no World Bank country metadata"
                ),
            },
            "years": {
                str(year): _year_record(
                    iso3=iso3,
                    year=year,
                    wb_fields=wb_years.get(year, {}),
                    wpp_tfr=wpp.get(iso3, {}).get(year),
                )
                for year in range(start_year, end_year + 1)
            },
        }
    coverage = _coverage(countries, start_year=start_year, end_year=end_year)
    panel: dict[str, Any] = {
        "schema_version": GLOBAL_PANEL_SCHEMA_VERSION,
        "generated_at": dt.date.today().isoformat(),
        "transform_pipeline_version": PIPELINE_VERSION,
        "year_range": {"start": start_year, "end": end_year},
        "tfr_selection_policy": {
            "priority": [
                "UN_WPP_2024_TFR ESTIMATE",
                "WB_SP_DYN_TFRT_IN observed fallback",
                "UN_WPP_2024_TFR PROJECTION_MEDIUM only when no observed TFR exists",
            ],
            "rationale": (
                "WPP estimates are preferred for historical fertility; World Bank is "
                "a documented fallback; WPP projections remain explicitly DERIVED."
            ),
        },
        "scenario_boundary": {
            "legacy_military_broadcast": "NOT_INCLUDED",
            "note": (
                "The global panel contains observed/proxy source data only. Any "
                "military or broadcast contribution applied downstream must be a "
                "separately declared SCENARIO_PARAMETER, never an observation."
            ),
        },
        "sources": {
            "world_bank_release_id": world_bank.release_id,
            "world_bank_release_dir": _relative_data_path(world_bank.release_dir),
            "world_bank_fields": world_bank.source_artifacts,
            "wpp_tfr": {
                "source_id": SOURCE_ID_TFR,
                "raw_artifact": _relative_data_path(Path(wpp_tfr_path)),
                "wpp_revision": WPP_REVISION,
            },
        },
        "coverage": coverage,
        "countries": countries,
    }
    return GlobalPanelResult(panel=panel, coverage=coverage)


def build_global_panel_from_release(
    release_dir: Path,
    *,
    wpp_tfr_path: Path = OUT_TFR,
    start_year: int = _START_YEAR,
    end_year: int = _END_YEAR,
) -> GlobalPanelResult:
    """Convenience wrapper for the usual immutable World Bank release path."""
    return build_global_panel(
        load_world_bank_release(Path(release_dir)),
        wpp_tfr_path=Path(wpp_tfr_path),
        start_year=start_year,
        end_year=end_year,
    )


def write_global_panel(
    result: GlobalPanelResult | Mapping[str, Any],
    *,
    output_path: Path = DEFAULT_PANEL_PATH,
) -> dict[str, Any]:
    """Write a new global panel once; refuse to silently replace a prior build."""
    panel = result.panel if isinstance(result, GlobalPanelResult) else result
    payload = _canonical_bytes(panel)
    output_path = Path(output_path)
    if output_path.exists():
        existing = output_path.read_bytes()
        if existing == payload:
            return {
                "path": str(output_path),
                "status": "UNCHANGED_IDENTICAL",
                "sha256": hashlib.sha256(payload).hexdigest(),
            }
        raise FileExistsError(
            f"refusing to overwrite existing global panel {output_path}; choose a versioned output path"
        )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(payload)
    return {
        "path": str(output_path),
        "status": "WRITTEN_NEW",
        "sha256": hashlib.sha256(payload).hexdigest(),
    }


def load_global_panel(path: Path = DEFAULT_PANEL_PATH) -> dict[str, Any]:
    """Load and minimally validate a model-facing global panel JSON artefact."""
    path = Path(path)
    with path.open(encoding="utf-8") as handle:
        panel = json.load(handle)
    if panel.get("schema_version") != GLOBAL_PANEL_SCHEMA_VERSION:
        raise ValueError(
            f"unsupported global panel schema {panel.get('schema_version')!r} in {path}"
        )
    if not isinstance(panel.get("countries"), Mapping):
        raise ValueError(f"global panel {path} has no countries mapping")
    return panel


def _cli() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    build = sub.add_parser("build", help="build a new immutable all-country panel")
    build.add_argument("--world-bank-release", required=True, type=Path)
    build.add_argument("--wpp-tfr", type=Path, default=OUT_TFR)
    build.add_argument("--output", type=Path, default=DEFAULT_PANEL_PATH)
    build.add_argument("--start-year", type=int, default=_START_YEAR)
    build.add_argument("--end-year", type=int, default=_END_YEAR)
    args = parser.parse_args()
    if args.command == "build":
        result = build_global_panel_from_release(
            args.world_bank_release,
            wpp_tfr_path=args.wpp_tfr,
            start_year=args.start_year,
            end_year=args.end_year,
        )
        written = write_global_panel(result, output_path=args.output)
        print(json.dumps({"write": written, "coverage": result.coverage}, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI wiring
    raise SystemExit(_cli())
