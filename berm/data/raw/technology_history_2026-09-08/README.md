# Bounded technology-adoption source release

This release supplies five series (24 recorded points) to
`website/public/data/technology-adoption.json` and the read-only
`berm.data.technology_history` adapter. It changes no BERM response coefficient,
forecast, tissue kernel or local electromagnetic dose calculation.

## Held sources

- `eia_metering.html`: complete EIA Electric Power Annual table 10.05, 2015–2024,
  with all customer sectors and AMR, AMI, standard and total meter groups.
- `cre_linky.html`: CRE's original 3 November 2022 report. Two rounded counts:
  34.3 million at end-2021 and 35 million at the report date in 2022. The second
  point is not a year-end observation. Both concern the Enedis service area.
- `tem_amr.pdf` and `tem_amr.txt`: TEM 38/2017, original PDF and Poppler text
  extraction. The point is a rounded 99% of Finnish connection points with hourly
  metering in 2017. The absolute denominator is not given alongside this figure.
- `iea_cooling.pdf` and `iea_cooling.txt`: IEA, *The Future of Cooling in China*,
  June 2019, original PDF and Poppler text extraction. The 2017 global installed
  stock is a rounded reported estimate of 1.7 billion air conditioners, across
  all drive types. It does not measure inverter adoption.
- `catalogue.json`: curated bilingual series definitions, extraction expressions,
  source locators and missing-data register. It is an interpretation/configuration
  artifact, not a publisher dataset. Its bytes are checked like the source files.
- `manifest.json`: source URLs, publication/retrieval dates, snapshot byte lengths,
  SHA-256 checksums and extraction method. Original publisher rights remain with
  the publishers; inclusion does not relicense their documents.

All numeric values are parsed from held source text. The source catalogue defines
which reported quantity is being selected and its unit conversion. No blank year
is imputed. EIA's sector totals and technology totals are independently checked
for all ten years before any public series is exported. An upstream table revision
outside 2015–2024 fails explicitly and needs a reviewed parser/catalogue update.

## Reproduce without network access

From the repository root:

```sh
python3 berm/scripts/import_technology_history.py build --check
python3 berm/scripts/import_technology_history.py build
PYTHONPATH=berm python3 -m pytest -q berm/tests/test_technology_history.py
```

Offline builds read the verified, held text extraction and do not require Poppler.
The `berm` package's normal dependencies must be installed. `--check` never writes.

## Optional acquisition of a new release

Use a new release name and its actual acquisition date; do not overwrite this one:

```sh
python3 berm/scripts/import_technology_history.py refresh \
  --release-dir berm/data/raw/technology_history_YYYY-MM-DD \
  --retrieved-at YYYY-MM-DD
```

Refresh uses HTTPS certificate verification and bounded downloads. A local Python
installation missing its normal CA bundle can supply `--ca-file /path/to/ca.pem`.
PDF refresh requires `pdftotext`. A network or parsing failure leaves the existing
release and public JSON unchanged. A successful refresh validates the data but does
not publish it; review the resulting manifest and then run `build --release-dir ...`.
The date placeholder must be replaced with a real ISO date.

## Read in BERM without changing the forecast

```python
from berm.data.technology_history import load_history

history = load_history()
record = history.at("us_electricity_ami_meters", 2024)
assert record.unit == "meters"
assert history.at("fi_hourly_meter_coverage", 2018) is None
```

Records and record tuples are immutable. `select` filters by technology, geography
or series without combining populations or protocols. The adapter does not have an
interpolation, exposure conversion or forecast method. Constructing a physical
field history remains a separate calibration task.

The same module also reads the website's complete canonical technology catalogue
directly from `website/data/technology-history.json`, without copying it into a
second model-specific registry:

```python
from berm.data.technology_history import load_catalogue

catalogue = load_catalogue()
events = catalogue.events_for(
    "smart-metering", region_id="finland", start_year=2010, end_year=2010
)
assert (events[0].start_year, events[0].end_year) == (2009, 2013)
sources = catalogue.sources_for(events[0])
assert sources[0].id == "tem-amr"
assert catalogue.events_for("smart-metering", "finland", 2014, 2014) == ()
```

`technologies`, `sources`, `events`, `groups` and `boundary` retain bilingual
descriptions, source scopes, physical interpretation limits, and explicit units
and denominator descriptions. These records and all their nested values are
immutable. Event queries use inclusive interval overlap and return the original
interval unchanged. A point is not carried forward, an interval is not converted
into annual observations, and no match means an unrecorded interval rather than
zero adoption or exposure. Source IDs resolve to the same provenance as on the
website; shutdowns remain explicit events.

## Connected but not re-imported datasets

The public JSON's `existingDatasets` inventory links the held World Bank global
manifest and source-panel output, the ANFR fixed-probe manifest/reader and the
legacy LED estimates. These remain separate populations, quantities and evidence
classes. No large dataset is duplicated, and a linked file does not imply a new
statistical or causal join. The listed local paths are provenance pointers; some
large research artifacts remain ignored by Git and must be rebuilt with their
existing importers.
