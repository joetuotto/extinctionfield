# `data/raw/` — immutable source artefacts

Files here are **never edited, reformatted, cleaned or overwritten in place**. They
are the bytes as they arrived from the publisher. Everything downstream is
reproducible from them; nothing here is reproducible from anything else.

## Rules

1. **Append, never modify.** A refreshed download goes in as a *new* file with a
   new retrieval date and a new manifest entry. The old file stays.
2. **Every file has a manifest.** See `manifests/`. A file with no manifest entry
   fails `tests/test_provenance.py`.
3. **Every file has a `source_id`** registered in
   [`../registry/source_registry.csv`](../registry/source_registry.csv).
4. **Nothing paywalled is downloaded automatically.** Sources with
   `access_status = ACCESS_REQUIRED` are recorded in the source registry with a
   precise statement of what a user or institution must obtain, and are not
   fetched by any pipeline in this repository.
5. **Checksums are the identity.** If a checksum changes, the artefact changed,
   and every derived product is stale until re-derived.

## Layout

```
raw/
  manifests/<batch>.manifest.json   one manifest per retrieval batch
  wb_*.json                         World Bank API responses (batch wb_2025-08-18)
```

Sentinel-species artefacts currently live in `../sentinel/` for backwards
compatibility with `berm/stats/csli.py`. They are registered and checksummed in
the same manifest system and will move under `raw/` only behind a compatibility
shim, never by a silent relocation.

## Adding a source

1. Download to `raw/` without touching the bytes.
2. `shasum -a 256 <file>` and add a row to the batch manifest.
3. Add a row to `../registry/source_registry.csv`, including
   `known_limitations` — a source with no stated limitation has not been read
   carefully enough to use.
4. Write the transform into `interim/` or `processed/`, tagged with a
   `transform_pipeline_version` of the form `name@v1.0.0`.
5. Run `pytest tests/test_provenance.py tests/test_data_contracts.py`.

## Current contents

| File | source_id | Retrieved | Rows parsed | Read by the active prediction? |
|---|---|---|---|---|
| `wb_tfr.json` | `WB_SP_DYN_TFRT_IN` | 2025-08-18 | 16 868 | no |
| `wb_mobile.json` | `WB_IT_CEL_SETS_P2` | 2025-08-18 | 12 861 | no |
| `wb_internet.json` | `WB_IT_NET_USER_ZS` | 2025-08-18 | 6 812 | no |
| `wb_broadband.json` | `WB_IT_NET_BBND_P2` | 2025-08-18 | 5 275 | no |
| `wb_urban.json` | `WB_SP_URB_TOTL_IN_ZS` | 2025-08-18 | 17 160 | no |
| `WPP2024_Fertility_by_Age5.csv.gz` | `UN_WPP_2024_ASFR` | 2026-08-19 | 250 509 | no |
| `WPP2024_Demographic_Indicators_Medium.csv.gz` | `UN_WPP_2024_TFR` | 2026-08-19 | 35 787 | no |

The last column is not a formatting accident. As of this audit, **none of the
downloaded observational data reaches `predict_country_year`**; the active
exposure input is a hardcoded curve. See
[`../../docs/data-lineage-audit.md`](../../docs/data-lineage-audit.md), finding A-2.

The two WPP files are the exception in progress: they are ingested, validated and
readable through `berm/data/wpp.py`, and they satisfy the accounting identity that
the hand-typed predecessor fails. Migrating `outcomes/asfr_model.py` onto them is a
separate change, because it moves model output and needs its own parallel validation.
