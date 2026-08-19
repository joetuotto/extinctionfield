"""Provenance tests: can every number be traced, and does the registry tell the truth?

These tests do not check that the model is right. They check that the model is
honest about where its inputs come from: that registered artefacts exist and
still hash to what we recorded, that every parameter resolves to a real source
and a real line of code, and that nothing claims observational status it has not
earned.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import pytest

from berm.data.contracts import EvidenceGrade, MeasurementType
from berm.data.registry import (
    PARAMETER_REGISTRY_PATH,
    REGISTRY_DIR,
    SOURCE_REGISTRY_PATH,
    load_parameter_registry,
    load_source_registry,
    validate_parameter_registry,
    validate_source_registry,
)

REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "data"
MANIFEST_DIR = DATA / "raw" / "manifests"
SCHEMA_DIR = DATA / "schemas"


def manifests() -> list[dict]:
    return [json.loads(p.read_text()) for p in sorted(MANIFEST_DIR.glob("*.manifest.json"))]


class TestRegistriesExist:
    def test_source_registry_present(self):
        assert SOURCE_REGISTRY_PATH.exists(), f"missing {SOURCE_REGISTRY_PATH}"

    def test_parameter_registry_present(self):
        assert PARAMETER_REGISTRY_PATH.exists(), f"missing {PARAMETER_REGISTRY_PATH}"

    def test_schemas_present(self):
        for name in ("canonical_observation", "source_registry", "parameter_registry"):
            p = SCHEMA_DIR / f"{name}.schema.json"
            assert p.exists(), f"missing {p}"
            json.loads(p.read_text())  # must be parseable JSON

    def test_registries_are_not_empty(self):
        assert len(load_source_registry()) >= 10
        assert len(load_parameter_registry()) >= 40


class TestRegistryIntegrity:
    def test_source_registry_is_internally_consistent(self):
        v = validate_source_registry()
        assert v == [], "\n".join(str(x) for x in v)

    def test_parameter_registry_is_internally_consistent(self):
        v = validate_parameter_registry()
        assert v == [], "\n".join(str(x) for x in v)

    def test_every_parameter_resolves_to_a_registered_source(self):
        sources = set(load_source_registry())
        unresolved = {
            name: r.source_id
            for name, r in load_parameter_registry().items()
            if r.source_id not in sources
        }
        assert not unresolved, f"parameters with no registered source: {unresolved}"

    def test_every_parameter_names_an_existing_file(self):
        missing = {}
        for name, r in load_parameter_registry().items():
            for loc in r.defined_in.split(";"):
                path = REPO / loc.split(":")[0].strip()
                if not path.exists():
                    missing[name] = loc
        assert not missing, f"parameters pointing at non-existent files: {missing}"

    def test_every_parameter_line_number_is_within_its_file(self):
        out_of_range = {}
        for name, r in load_parameter_registry().items():
            for loc in r.defined_in.split(";"):
                parts = loc.strip().split(":")
                if len(parts) != 2 or not parts[1].isdigit():
                    continue
                path = REPO / parts[0]
                if not path.exists():
                    continue
                n_lines = len(path.read_text().splitlines())
                if int(parts[1]) > n_lines:
                    out_of_range[name] = f"{loc} but file has {n_lines} lines"
        assert not out_of_range, f"stale line references: {out_of_range}"

    def test_unidentified_parameters_carry_a_note(self):
        """A number with no known origin must at least say so in writing."""
        silent = [
            name for name, r in load_parameter_registry().items()
            if r.evidence_grade == EvidenceGrade.UNIDENTIFIED.value and not r.notes
        ]
        assert not silent, f"UNIDENTIFIED parameters with no note: {silent}"

    def test_no_assumption_is_registered_against_an_observational_source(self):
        sources = load_source_registry()
        offenders = []
        for name, r in load_parameter_registry().items():
            if r.evidence_grade not in {EvidenceGrade.SCENARIO.value,
                                        EvidenceGrade.UNIDENTIFIED.value}:
                continue
            src = sources.get(r.source_id)
            if src and src.measurement_class in {MeasurementType.OBSERVED.value,
                                                 MeasurementType.PROXY.value}:
                offenders.append((name, r.source_id))
        assert not offenders, (
            "assumptions dressed as observations: "
            f"{offenders}"
        )


class TestManifests:
    def test_at_least_one_manifest_exists(self):
        assert manifests(), f"no manifests in {MANIFEST_DIR}"

    def test_every_manifest_file_exists(self):
        missing = [
            f["path"] for m in manifests() for f in m["files"]
            if not (DATA / f["path"]).exists()
        ]
        assert not missing, f"manifest lists files that are absent: {missing}"

    def test_every_manifest_checksum_still_matches(self):
        """A changed checksum means the artefact changed and everything derived is stale."""
        drifted = []
        for m in manifests():
            for f in m["files"]:
                p = DATA / f["path"]
                if not p.exists():
                    continue
                actual = hashlib.sha256(p.read_bytes()).hexdigest()
                if actual != f["sha256"]:
                    drifted.append(f"{f['path']}: recorded {f['sha256'][:12]}… "
                                   f"actual {actual[:12]}…")
        assert not drifted, (
            "raw artefacts changed without a manifest update:\n  " + "\n  ".join(drifted)
        )

    def test_every_manifest_size_still_matches(self):
        wrong = [
            f["path"] for m in manifests() for f in m["files"]
            if (DATA / f["path"]).exists()
            and (DATA / f["path"]).stat().st_size != f["bytes"]
        ]
        assert not wrong, f"file sizes differ from manifest: {wrong}"

    def test_every_manifest_source_is_registered(self):
        known = set(load_source_registry())
        unknown = {
            f["source_id"] for m in manifests() for f in m["files"]
            if f["source_id"] not in known
        }
        assert not unknown, f"manifest cites unregistered sources: {unknown}"

    def test_every_manifest_entry_has_a_note(self):
        silent = [
            f["path"] for m in manifests() for f in m["files"] if not f.get("note")
        ]
        assert not silent, f"manifest entries with no note: {silent}"


class TestHeldVersusClaimed:
    def test_sources_marked_open_with_a_filename_are_actually_on_disk(self):
        missing = []
        for sid, r in load_source_registry().items():
            if r.access_status != "OPEN" or not r.original_filename:
                continue
            hits = list(DATA.rglob(r.original_filename))
            if not hits:
                missing.append((sid, r.original_filename))
        assert not missing, f"registry claims files we do not have: {missing}"

    def test_unheld_sources_are_not_classified_as_observations(self):
        """We may not call a dataset OBSERVED before we hold it."""
        offenders = [
            sid for sid, r in load_source_registry().items()
            if r.access_status in {"ACCESS_REQUIRED", "NOT_YET_ACQUIRED"}
            and not r.checksum_sha256
            and r.measurement_class in {MeasurementType.OBSERVED.value,
                                        MeasurementType.PROXY.value}
        ]
        assert not offenders, (
            f"sources classified as data we do not hold: {offenders}"
        )

    def test_access_required_sources_document_what_must_be_obtained(self):
        silent = [
            sid for sid, r in load_source_registry().items()
            if r.access_status == "ACCESS_REQUIRED" and len(r.notes) < 20
        ]
        assert not silent, (
            f"ACCESS_REQUIRED sources with no acquisition instructions: {silent}"
        )

    def test_no_pipeline_downloads_an_access_required_source(self):
        """Paywalled or restricted sources must never be fetched automatically."""
        restricted = {
            sid for sid, r in load_source_registry().items()
            if r.access_status == "ACCESS_REQUIRED"
        }
        downloaders = list((REPO / "berm").rglob("*.py")) + list(DATA.glob("*.py"))
        offenders = []
        for path in downloaders:
            text = path.read_text()
            if not re.search(r"requests\.(get|post)|urlopen|urlretrieve", text):
                continue
            for sid in restricted:
                if sid in text:
                    offenders.append(f"{path.relative_to(REPO)} references {sid}")
        assert not offenders, "\n".join(offenders)


class TestProxiesAreLabelled:
    def test_subscription_and_penetration_sources_are_proxies_not_observations(self):
        """Mobile subscriptions, internet use and broadband are never a personal RF dose."""
        must_be_proxy = {
            "WB_IT_CEL_SETS_P2", "WB_IT_NET_USER_ZS", "WB_IT_NET_BBND_P2",
        }
        reg = load_source_registry()
        for sid in must_be_proxy:
            assert sid in reg, f"{sid} is not registered"
            assert reg[sid].measurement_class == MeasurementType.PROXY.value, (
                f"{sid} is classified {reg[sid].measurement_class}; "
                "infrastructure adoption is at most a proxy for exposure"
            )

    def test_every_proxy_source_states_its_limitation(self):
        thin = [
            sid for sid, r in load_source_registry().items()
            if r.measurement_class == MeasurementType.PROXY.value
            and len(r.known_limitations) < 40
        ]
        assert not thin, f"proxy sources with no substantive limitation stated: {thin}"


class TestClaimedSourcesMatchTheData:
    """Guards linking what the registry claims to what the tables actually contain."""

    def test_legacy_asfr_table_is_documented_as_diverging_from_the_acquired_source(self):
        """TFR is 5 * sum(ASFR) / 1000 by definition.

        A genuine WPP extract satisfies this identity against WPP's own TFR. The
        hand-typed table in berm/data/asfr.py does not: it misses by 30.8% on
        average. Now that the real WPP 2024 release has been acquired, the
        invariant is no longer "do not claim provenance you lack" but "do not let
        a table that fails the identity sit next to the real one unmarked".

        The accounting identity itself is asserted against the canonical product
        in tests/test_wpp_asfr.py; here we only require that the divergence of
        the legacy table is recorded in the registry, so that no reader mistakes
        it for the WPP extract.
        """
        pytest.importorskip("pandas")
        from berm.data.asfr import WPP_ASFR, asfr_to_tfr
        from berm.data.loader import load_observed_tfr_2024

        observed = load_observed_tfr_2024()
        rel_errors = []
        for country, years in WPP_ASFR.items():
            if 2024 not in years or country not in observed:
                continue
            implied = asfr_to_tfr(years[2024])
            actual = observed[country]
            if actual > 0:
                rel_errors.append(abs(implied - actual) / actual)

        assert rel_errors, "no country-years available to check"
        share_off = sum(1 for e in rel_errors if e > 0.05) / len(rel_errors)

        if share_off <= 0.10:
            return  # legacy table now reproduces observed TFR; nothing to flag

        rec = load_source_registry().get("UN_WPP_2024_ASFR")
        assert rec is not None, "UN_WPP_2024_ASFR must be registered"

        if rec.access_status != "OPEN":
            # We do not hold the release, so we must not claim we do.
            assert not rec.checksum_sha256, (
                "UN_WPP_2024_ASFR carries a checksum but is not marked OPEN"
            )
            return

        notes = rec.notes.lower()
        assert "legacy" in notes and "diverge" in notes, (
            f"{share_off:.0%} of countries fail the TFR = 5*sum(ASFR)/1000 identity "
            f"in berm/data/asfr.py:WPP_ASFR, and the real WPP release is now held. "
            f"The registry notes for UN_WPP_2024_ASFR must record that the legacy "
            f"table diverges from the acquired source, so the two are never "
            f"confused. Current notes: {rec.notes!r}"
        )

    def test_orphaned_sentinel_files_are_flagged_in_the_registry(self):
        """A dataset no code reads must say so, or it will be mistaken for an input."""
        reg = load_source_registry()
        for sid, filename in (
            ("LEA_2016_DOG_SEMEN", "lea2016_dog_sperm.json"),
        ):
            readers = [
                p for p in (REPO / "berm").rglob("*.py")
                if filename in p.read_text()
            ]
            if not readers:
                assert "ORPHANED" in reg[sid].notes.upper(), (
                    f"{filename} is read by no module but {sid} does not say so"
                )


class TestRegistryFilesAreReviewable:
    def test_registries_are_plain_text_csv(self):
        """Provenance changes must be visible in a diff, so the registries stay CSV."""
        for p in (SOURCE_REGISTRY_PATH, PARAMETER_REGISTRY_PATH):
            assert p.suffix == ".csv"
            p.read_text(encoding="utf-8")  # must decode as text

    def test_registry_dir_contains_only_expected_files(self):
        allowed = {"source_registry.csv", "parameter_registry.csv", "README.md"}
        found = {p.name for p in REGISTRY_DIR.iterdir() if p.is_file()}
        assert found <= allowed, f"unexpected files in registry/: {found - allowed}"
