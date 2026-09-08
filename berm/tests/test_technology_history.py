"""History ingestion checks source arithmetic, missingness and the model boundary."""

from copy import deepcopy
from dataclasses import FrozenInstanceError, asdict
import importlib.util
import json
from pathlib import Path
import shutil

import pytest

from berm.data.technology_history import (
    DEFAULT_CATALOGUE_PATH, DEFAULT_PATH, load_catalogue, load_history, validate_history,
)

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "technology_history_importer", ROOT / "berm/scripts/import_technology_history.py"
)
assert SPEC and SPEC.loader
IMPORTER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(IMPORTER)


def test_offline_build_reproduces_checked_in_artifact():
    result = IMPORTER.build_artifact()
    assert IMPORTER.canonical_bytes(result) == DEFAULT_PATH.read_bytes()
    assert len(result["series"]) == 5
    assert sum(len(s["points"]) for s in result["series"]) == 24
    assert len(result["sources"]) == 4


def test_eia_source_counts_and_denominators_are_not_exposure():
    history = load_history()
    ami = history.at("us_electricity_ami_meters", 2024)
    amr = history.at("us_electricity_amr_meters", 2015)
    assert ami.value == 140_491_981
    assert ami.denominator_value == 168_085_999
    assert ami.unit == ami.denominator_unit == "meters"
    assert ami.observation_type == "reported_count"
    assert amr.value == 47_604_211
    assert amr.denominator_value == 150_813_765
    assert ami.source_url == "https://www.eia.gov/electricity/annual/html/epa_10_05.html"
    assert len(history.select(geography_code="USA")) == 20


def test_sparse_points_do_not_interpolate_or_assume_denominators():
    history = load_history()
    assert history.at("fi_hourly_meter_coverage", 2016) is None
    assert history.at("fi_hourly_meter_coverage", 2018) is None
    assert history.at("fr_linky_meters", 2020) is None
    assert history.at("fr_linky_meters", 2026) is None
    fi = history.at("fi_hourly_meter_coverage", 2017)
    assert fi.value == 99 and fi.unit == "percent"
    assert fi.denominator_value is None
    assert fi.observation_type == "reported_estimate"
    fr = history.at("fr_linky_meters", 2021)
    assert fr.value == 34_300_000
    assert fr.denominator_value is None
    assert history.at("fr_linky_meters", 2022).as_of == "2022-11-03"
    ac = history.at("world_air_conditioner_stock", 2017)
    assert ac.value == 1_700_000_000 and ac.observation_type == "reported_estimate"
    assert ac.unit == "devices" and ac.precision == "rounded"
    assert all(r.year < 2026 and not r.imputed for r in history.records)
    with pytest.raises(FrozenInstanceError):
        fi.value = 100


def test_source_checksum_change_is_rejected_before_parsing(tmp_path):
    clone = tmp_path / "release"
    shutil.copytree(IMPORTER.DEFAULT_RELEASE, clone)
    path = clone / "eia_metering.html"
    path.write_bytes(path.read_bytes() + b"\n")
    with pytest.raises(ValueError, match="checksum mismatch"):
        IMPORTER.build_artifact(clone)


def _synthetic_table(total_offset=0):
    rows = ["<tr><th>Year</th><th>Residential</th><th>Commercial</th>"
            "<th>Industrial</th><th>Transportation</th><th>Total</th></tr>"]
    for group, n in [("Automated Meter Reading (AMR)", 10),
                     ("Advanced Metering Infrastructure (AMI)", 20),
                     ("Standard (non-AMR/AMI) Meters", 30),
                     ("Total Number of Meters", 60 + total_offset)]:
        rows.append(f"<tr><td>{group}</td></tr>")
        for year in range(2015, 2025):
            cells = [year, n, n, n, n, 4 * n]
            rows.append("<tr>" + "".join(f"<td>{v}</td>" for v in cells) + "</tr>")
    return "<table>" + "".join(rows) + "</table>"


def test_eia_validates_sectors_and_meter_categories_independently():
    assert IMPORTER.parse_eia(_synthetic_table())["total"][2024][-1] == 240
    with pytest.raises(ValueError, match="sector sum mismatch"):
        IMPORTER.parse_eia(_synthetic_table().replace("<td>40</td>", "<td>41</td>", 1))
    with pytest.raises(ValueError, match="technology sum mismatch"):
        IMPORTER.parse_eia(_synthetic_table(total_offset=1))
    with pytest.raises(ValueError, match="duplicate EIA"):
        IMPORTER.parse_eia(_synthetic_table().replace("<td>2016</td>", "<td>2015</td>", 1))
    with pytest.raises(ValueError, match="exactly years"):
        IMPORTER.parse_eia(_synthetic_table().replace("<td>2024</td>", "<td>2025</td>"))


@pytest.mark.parametrize("field,value,message", [
    ("unit", "V_per_m", "unit"),
    ("frequency", "interpolated", "frequency"),
])
def test_history_cannot_be_relabelled_as_field_or_interpolation(field, value, message):
    data = json.loads(DEFAULT_PATH.read_text())
    data["series"][0][field] = value
    with pytest.raises(ValueError, match=message):
        validate_history(data)


@pytest.mark.parametrize("change,match", [
    ({"imputed": True}, "imputed"),
    ({"sourceId": "unknown"}, "unknown"),
    ({"value": float("nan")}, "finite"),
    ({"denominator": {"value": 100, "unit": "devices"}}, "denominator"),
])
def test_invalid_numeric_semantics_are_rejected(change, match):
    data = json.loads(DEFAULT_PATH.read_text())
    data["series"][0]["points"][0].update(change)
    with pytest.raises(ValueError, match=match):
        validate_history(data)


def test_existing_measurements_and_legacy_scenarios_remain_separate():
    data = json.loads(DEFAULT_PATH.read_text())
    linked = {d["id"]: d for d in data["existingDatasets"]}
    assert linked["anfr_fixed_rf_probes"]["kind"] == "measurement"
    assert linked["legacy_led_group_estimates"]["kind"] == "scenario"
    assert linked["worldbank_itu_telecom"]["kind"] == "proxy"
    assert not any(d["imported"] for d in linked.values())
    bad = deepcopy(data)
    bad["exposureMapping"] = "dose"
    with pytest.raises(ValueError, match="contract"):
        validate_history(bad)


def test_refresh_never_overwrites_held_sources():
    with pytest.raises(FileExistsError, match="already exists"):
        IMPORTER.refresh_release(IMPORTER.DEFAULT_RELEASE, "2026-09-08")


def test_existing_provenance_paths_resolve_without_requiring_ignored_large_data():
    data = json.loads(DEFAULT_PATH.read_text())
    optional_regenerated = {"berm/data/processed/led_market_share.json"}
    for dataset in data["existingDatasets"]:
        for path in dataset["paths"]:
            if path not in optional_regenerated:
                assert (ROOT / path).is_file(), path
    # In a research checkout the optional LED file can also be checked directly.
    led = ROOT / "berm/data/processed/led_market_share.json"
    if led.exists():
        assert isinstance(json.loads(led.read_text()), dict)


def test_numeric_links_resolve_canonical_technology_registry():
    path = ROOT / "website/data/technology-history.json"
    registry = json.loads(path.read_text())
    technologies = {entry["id"]: entry for entry in registry["technologies"]}
    data = json.loads(DEFAULT_PATH.read_text())
    for entry in data["series"] + data["dataGaps"]:
        assert entry["technologyId"] in technologies, entry["technologyId"]
    for series in data["series"]:
        links = technologies[series["technologyId"]]["dataLinks"]
        assert any(link["id"] == series["id"]
                   and link["url"] == "/data/technology-adoption.json"
                   and link["kind"] == "adoption" for link in links), series["id"]
    registry_urls = {source["url"] for source in registry["sources"]}
    assert all(source["url"] in registry_urls for source in data["sources"])


def test_failed_refresh_leaves_existing_release_and_public_output_unchanged(tmp_path, monkeypatch):
    before = DEFAULT_PATH.read_bytes()
    target = tmp_path / "new_release"

    def unavailable(*args, **kwargs):
        raise OSError("network unavailable")

    monkeypatch.setattr(IMPORTER.urllib.request, "urlopen", unavailable)
    with pytest.raises(OSError, match="network unavailable"):
        IMPORTER.refresh_release(target, "2026-09-08")
    assert not target.exists()
    assert not list(tmp_path.glob(".technology-history-*"))
    assert DEFAULT_PATH.read_bytes() == before


def test_refresh_requires_a_real_retrieval_date(tmp_path):
    with pytest.raises(ValueError):
        IMPORTER.refresh_release(tmp_path / "new_release", "YYYY-MM-DD")


def test_catalogue_preserves_actual_registry_sources_boundaries_and_event_details():
    raw = json.loads(DEFAULT_CATALOGUE_PATH.read_text())
    catalogue = load_catalogue()
    assert catalogue.schema_version == raw["schemaVersion"]
    assert catalogue.updated_at == raw["updatedAt"]
    assert len(catalogue.technologies) == len(raw["technologies"]) == 45
    assert len(catalogue.events) == len(raw["events"]) == 63
    assert [asdict(source) for source in catalogue.sources] == raw["sources"]
    assert asdict(catalogue.boundary.calibration_gap) == raw["boundary"]["calibrationGap"]
    assert asdict(catalogue.boundary.empirical_input) == raw["boundary"]["empiricalInput"]
    for technology, original in zip(catalogue.technologies, raw["technologies"]):
        assert technology.id == original["id"]
        assert technology.source_ids == tuple(original["sourceIds"])
        assert asdict(technology.physical_profile) == original["physicalProfile"]
        assert asdict(technology.history_gap) == original["historyGap"]
        assert [asdict(link) for link in technology.data_links] == original.get("dataLinks", [])
    for event, original in zip(catalogue.events, raw["events"]):
        assert event.id == original["id"]
        assert event.technology_ids == tuple(original["technologyIds"])
        assert event.source_ids == tuple(original["sourceIds"])
        assert event.start_year == original["startYear"]
        assert event.end_year == original.get("endYear")
        assert asdict(event.region) == original["region"]
        assert asdict(event.description) == original["description"]
        assert [asdict(value) for value in event.values] == original.get("values", [])
    with pytest.raises(FrozenInstanceError):
        catalogue.events[0].region.name.fi = "changed"


def test_catalogue_known_anchors_retain_provenance_and_shutdown_kind():
    catalogue = load_catalogue()
    davy, = catalogue.events_for("cathodic-protection", "united-kingdom", 1824, 1824)
    assert davy.id == "davy-cathodic-1824" and davy.kind == "measurement"
    assert davy.end_year is None
    assert "not the launch" in davy.description.en
    assert catalogue.sources_for(davy)[0].id == "davy-cathodic"
    omega, = catalogue.events_for("radio-navigation", "global", 1997, 1997)
    assert omega.id == "omega-closure-1997" and omega.kind == "shutdown"
    assert "30 September 1997" in omega.description.en
    assert tuple(source.id for source in catalogue.sources_for(omega)) == omega.source_ids


def test_catalogue_interval_queries_do_not_extend_point_events_or_split_intervals():
    catalogue = load_catalogue()
    assert catalogue.events_for("cathodic-protection", start_year=1825, end_year=1825) == ()
    assert catalogue.events_for("radio-navigation", "global", 1998, 1998) == ()
    assert catalogue.events_for("smart-metering", "finland", 2014, 2014) == ()
    interval, = catalogue.events_for("smart-metering", "finland", 2010, 2010)
    assert interval.id == "finland-amr-2009-2013"
    assert (interval.start_year, interval.end_year) == (2009, 2013)
    assert catalogue.events_for("smart-metering", "italy", 2007, 2007) == ()
    assert catalogue.events_for("not-in-registry") == ()
    assert catalogue.events_for("smart-metering", start_year=2006, end_year=2001) == ()
    with pytest.raises(ValueError, match="query year"):
        catalogue.events_for("smart-metering", start_year=2001.5)


@pytest.mark.parametrize("change,match", [
    ("version", "schema version"),
    ("source", "reference"),
    ("technology", "reference"),
    ("duplicate", "duplicate"),
    ("interval", "year order"),
    ("order", "year order"),
    ("future", "historical integer"),
    ("quantity", "finite"),
    ("unit", "explicit unit"),
    ("denominator", "en and fi"),
    ("percentage", "percentage"),
])
def test_catalogue_rejects_ambiguous_or_broken_history(change, match, tmp_path):
    raw = json.loads(DEFAULT_CATALOGUE_PATH.read_text())
    if change == "version":
        raw["schemaVersion"] = 2
    elif change == "source":
        raw["events"][0]["sourceIds"] = ["unknown-source"]
    elif change == "technology":
        raw["events"][0]["technologyIds"] = ["unknown-technology"]
    elif change == "duplicate":
        raw["sources"].append(raw["sources"][0])
    elif change == "interval":
        raw["events"][0]["endYear"] = raw["events"][0]["startYear"] - 1
    elif change == "order":
        raw["events"].reverse()
    elif change == "future":
        raw["events"][-1]["startYear"] = 2100
    else:
        event = next(e for e in raw["events"] if e["id"] == "us-farm-access-1956")
        quantity = event["values"][0]
        if change == "quantity":
            quantity["value"] = float("nan")
        elif change == "unit":
            quantity["unit"] = ""
        elif change == "denominator":
            quantity["denominator"] = {"en": ""}
        elif change == "percentage":
            quantity["value"] = 101
    path = tmp_path / "catalogue.json"
    path.write_text(json.dumps(raw))
    with pytest.raises(ValueError, match=match):
        load_catalogue(path)
