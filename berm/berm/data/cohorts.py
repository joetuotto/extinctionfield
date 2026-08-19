"""Immutable Core / Extended / Global cohort classification for BERM.

The published Core-51 cohort is not copied from a narrative list.  It is read
from the actual country-result keys in ``website/public/data/rolling_backtest.json``
and checked against that artifact's ISO3 mapping.  Consequently a later global
panel build cannot silently redefine the historical benchmark.

Extended and Global are overlapping *eligibility* tiers: Core countries can
also be eligible for the broader tiers.  Each country record therefore carries
all memberships rather than a misleading single category.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
from pathlib import Path
from typing import Any, Mapping

from berm.data.global_panel import DEFAULT_PANEL_PATH, GLOBAL_PANEL_SCHEMA_VERSION, load_global_panel

__all__ = [
    "PUBLISHED_CORE_ARTIFACT",
    "TIER_SCHEMA_VERSION",
    "derive_locked_core_countries",
    "classify_extended",
    "classify_global",
    "classify_tiers",
    "write_tier_classification",
]


DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
TIER_DIR = DATA_DIR / "global"
DEFAULT_TIER_PATH = TIER_DIR / "cohort_tiers.json"
REPO_ROOT = DATA_DIR.parent.parent
PUBLISHED_CORE_ARTIFACT = REPO_ROOT / "website" / "public" / "data" / "rolling_backtest.json"
TIER_SCHEMA_VERSION = "berm.global_cohort_tiers@v1.0.0"
_CORE_EXPECTED_COUNT = 51
_EXTENDED_FIELDS = {
    "tfr": 25,
    "mobile_per_100": 20,
    "urban_pct": 25,
    "gdp_ppp_per_capita": 20,
}
_GLOBAL_FIELDS = {"tfr": 15, "mobile_per_100": 15}
_SIX_REVIEW_ISO3 = ("FRA", "JPN", "ISR", "SAU", "ARE", "UKR")


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def derive_locked_core_countries(
    artifact_path: Path = PUBLISHED_CORE_ARTIFACT,
    *,
    expected_count: int = _CORE_EXPECTED_COUNT,
) -> tuple[str, ...]:
    """Derive the immutable Core country ISO3 set from published results.

    All rolling scenarios must have identical country-result keys.  The method
    deliberately rejects a changed/mixed artifact rather than accepting an
    illustrative hard-coded country list.
    """
    artifact_path = Path(artifact_path)
    with artifact_path.open(encoding="utf-8") as handle:
        artifact = json.load(handle)
    scenarios = artifact.get("scenarios")
    panels = artifact.get("panel", {}).get("panels")
    if not isinstance(scenarios, Mapping) or not scenarios:
        raise ValueError(f"published Core artifact has no scenarios: {artifact_path}")
    if not isinstance(panels, Mapping):
        raise ValueError(f"published Core artifact has no panel ISO3 mapping: {artifact_path}")

    country_sets: list[set[str]] = []
    for name, scenario in scenarios.items():
        results = scenario.get("country_results") if isinstance(scenario, Mapping) else None
        if not isinstance(results, Mapping):
            raise ValueError(f"scenario {name!r} has no country_results mapping")
        country_sets.append(set(results))
    core_names = country_sets[0]
    if any(names != core_names for names in country_sets[1:]):
        raise ValueError("published rolling scenarios do not share an identical Core country set")
    if len(core_names) != expected_count:
        raise ValueError(
            f"published Core cohort has {len(core_names)} countries, expected locked count {expected_count}"
        )

    iso3_by_name: dict[str, str] = {}
    for name in core_names:
        panel = panels.get(name)
        iso3 = panel.get("iso3") if isinstance(panel, Mapping) else None
        if not isinstance(iso3, str) or len(iso3) != 3 or not iso3.isalpha():
            raise ValueError(f"published Core panel lacks a valid ISO3 mapping for {name!r}")
        iso3_by_name[name] = iso3.upper()
    iso3s = tuple(sorted(set(iso3_by_name.values())))
    if len(iso3s) != expected_count:
        raise ValueError("published Core country names do not map one-to-one to ISO3 codes")
    return iso3s


def _country_years(country: Mapping[str, Any]) -> Mapping[str, Mapping[str, Any]]:
    years = country.get("years")
    if not isinstance(years, Mapping):
        raise ValueError("global panel country record has no years mapping")
    return years


def _coverage_counts(
    country: Mapping[str, Any],
    *,
    start_year: int,
    end_year: int,
    fields: Mapping[str, int],
) -> dict[str, int]:
    years = _country_years(country)
    counts = {field: 0 for field in fields}
    for year in range(start_year, end_year + 1):
        row = years.get(str(year))
        if not isinstance(row, Mapping):
            continue
        for field in fields:
            # Tier eligibility for a historical backtest must not count a WPP
            # projection as if it were an observed target.  A World Bank
            # fallback remains eligible when it is labelled OBSERVED.  The
            # panel still retains WPP projections for scenario work, with their
            # DERIVED label, but they cannot inflate historical coverage here.
            if field == "tfr" and row.get("tfr_measurement_type") != "OBSERVED":
                continue
            # A literal zero is availability, not missingness.  This matters
            # for early mobile series and prevents truthiness from dropping
            # reported zero subscriptions.
            if row.get(field) is not None:
                counts[field] += 1
    return counts


def _qualifies(counts: Mapping[str, int], thresholds: Mapping[str, int]) -> bool:
    return all(counts.get(field, 0) >= minimum for field, minimum in thresholds.items())


def classify_extended(panel: Mapping[str, Any]) -> dict[str, Any]:
    """Eligibility for 1990--2024 rolling backtests using documented thresholds."""
    countries = panel.get("countries", {})
    memberships: list[str] = []
    coverage: dict[str, Any] = {}
    for iso3, country in sorted(countries.items()):
        counts = _coverage_counts(country, start_year=1990, end_year=2024, fields=_EXTENDED_FIELDS)
        qualifies = _qualifies(counts, _EXTENDED_FIELDS)
        coverage[iso3] = {"counts": counts, "qualifies": qualifies}
        if qualifies:
            memberships.append(iso3)
    return {
        "name": "Extended",
        "window": "1990-2024",
        "thresholds": _EXTENDED_FIELDS,
        "members": memberships,
        "coverage": coverage,
    }


def classify_global(panel: Mapping[str, Any]) -> dict[str, Any]:
    """Eligibility for the 2000--2024 all-country hierarchical model tier."""
    countries = panel.get("countries", {})
    memberships: list[str] = []
    coverage: dict[str, Any] = {}
    for iso3, country in sorted(countries.items()):
        counts = _coverage_counts(country, start_year=2000, end_year=2024, fields=_GLOBAL_FIELDS)
        qualifies = _qualifies(counts, _GLOBAL_FIELDS)
        coverage[iso3] = {"counts": counts, "qualifies": qualifies}
        if qualifies:
            memberships.append(iso3)
    return {
        "name": "Global",
        "window": "2000-2024",
        "thresholds": _GLOBAL_FIELDS,
        "members": memberships,
        "coverage": coverage,
    }


def classify_tiers(
    panel: Mapping[str, Any],
    *,
    core_artifact_path: Path = PUBLISHED_CORE_ARTIFACT,
) -> dict[str, Any]:
    """Return all tier memberships while preserving Core-51's immutable source."""
    if panel.get("schema_version") != GLOBAL_PANEL_SCHEMA_VERSION:
        raise ValueError("classify_tiers requires a current provenance-rich global panel")
    core_members = list(derive_locked_core_countries(core_artifact_path))
    extended = classify_extended(panel)
    global_tier = classify_global(panel)
    core_set = set(core_members)
    extended_set = set(extended["members"])
    global_set = set(global_tier["members"])
    all_countries = set(panel["countries"])

    memberships: dict[str, Any] = {}
    for iso3 in sorted(all_countries | core_set):
        labels = [
            label for label, member_set in (
                ("Core-51", core_set), ("Extended", extended_set), ("Global", global_set),
            ) if iso3 in member_set
        ]
        memberships[iso3] = {"memberships": labels}

    six_country_audit = {}
    for iso3 in _SIX_REVIEW_ISO3:
        six_country_audit[iso3] = {
            "in_frozen_core": iso3 in core_set,
            "in_extended": iso3 in extended_set,
            "in_global": iso3 in global_set,
            "extended_coverage": extended["coverage"].get(iso3),
            "note": (
                "The published Core-51 is immutable. This check reports wider-tier "
                "eligibility only and never adds the country to Core retrospectively."
            ),
        }

    core_artifact_path = Path(core_artifact_path)
    return {
        "schema_version": TIER_SCHEMA_VERSION,
        "generated_at": dt.date.today().isoformat(),
        "panel_schema_version": panel["schema_version"],
        "core": {
            "name": "Core-51",
            "members": core_members,
            "count": len(core_members),
            "frozen": True,
            "source_artifact": str(core_artifact_path),
            "source_artifact_sha256": _sha256(core_artifact_path),
            "derivation": "all published scenario country_results keys with panel ISO3 mapping",
        },
        "extended": {**extended, "count": len(extended["members"])},
        "global": {**global_tier, "count": len(global_tier["members"])},
        "country_memberships": memberships,
        "six_previously_excluded_country_audit": six_country_audit,
        "interpretation": (
            "Core-51, Extended and Global are overlapping eligibility sets. A country "
            "in Core remains in the published locked benchmark; it is not recalibrated "
            "by appearing in a broader tier."
        ),
    }


def _canonical_bytes(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")


def write_tier_classification(
    tiers: Mapping[str, Any],
    *,
    output_path: Path = DEFAULT_TIER_PATH,
) -> dict[str, str]:
    """Write a new tier artefact; identical reruns are a no-op, not a rewrite."""
    output_path = Path(output_path)
    payload = _canonical_bytes(tiers)
    if output_path.exists():
        if output_path.read_bytes() == payload:
            return {"path": str(output_path), "status": "UNCHANGED_IDENTICAL"}
        raise FileExistsError(
            f"refusing to overwrite existing tier classification {output_path}; choose a versioned path"
        )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(payload)
    return {"path": str(output_path), "status": "WRITTEN_NEW"}


def _cli() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--panel", type=Path, default=DEFAULT_PANEL_PATH)
    parser.add_argument("--core-artifact", type=Path, default=PUBLISHED_CORE_ARTIFACT)
    parser.add_argument("--output", type=Path, default=DEFAULT_TIER_PATH)
    args = parser.parse_args()
    tiers = classify_tiers(load_global_panel(args.panel), core_artifact_path=args.core_artifact)
    write = write_tier_classification(tiers, output_path=args.output)
    print(json.dumps({
        "write": write,
        "core": tiers["core"]["count"],
        "extended": tiers["extended"]["count"],
        "global": tiers["global"]["count"],
        "six_country_audit": tiers["six_previously_excluded_country_audit"],
    }, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI wiring
    raise SystemExit(_cli())
