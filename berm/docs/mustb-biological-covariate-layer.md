# MUST-B: held spatial context, not a biological response layer

## What is actually held

The immutable file `data/raw/pollinator_hub/mustb_2026-08-19/must-b.zip` was
downloaded from the public EU Pollinator Hub landing page for
[`MUSTB76.0.0`](https://app.pollinatorhub.eu/dataset-discovery/MUSTB76.0.0) on
2026-08-19.  Its SHA-256 is
`e1af5754bea1e5dcbc0d93f7b5a5ce73a62c6cf3276e70d0444419aecbda364f` and its
manifest is `data/raw/manifests/mustb_2026-08-19.manifest.json`.

Although the portal describes a larger relational study, this specific public
“Download entire dataset” ZIP has twelve files, of which only two are data
tables:

| Held table | Records | What it contains |
|---|---:|---|
| site coordinates (`STSCR130`) | 7 | site number, name, country and UTM coordinate |
| botanical-survey polygon coordinates (`PLYGN131`) | 453 | site number, polygon ID, source `Area` value and UTM centroid |

The source-period label is 2019–2020 and the held coordinates are in Denmark
and Portugal.  Neither held table contains a row date, hive identifier,
colony-health/reproductive outcome, management event, laboratory result,
pesticide record, actual plant-resource observation, or RF measurement.

`Area` is preserved exactly as the source value; its unit is not stated in the
held CSV and is intentionally not inferred.  A polygon where a botanical
survey took place is not evidence of floral-resource quantity or quality.

## What the normalizer produces

Run from `berm/`:

```bash
python -m berm.data.mustb_normalize
```

It checks the raw ZIP byte size and SHA-256 against the manifest, then writes:

- `data/processed/mustb_apiary_site_context.csv`
- `data/processed/mustb_botanical_survey_polygon_context.csv`
- `data/processed/mustb_spatial_context_availability.json`

All three derived files are regenerated locally and are ignored by Git.  The
writer is fail-closed: a changed file requires `--replace`; the raw ZIP is
never modified.  The JSON summary records the portal catalogue versus the
actual archive and marks all unavailable endpoints and covariates explicitly.

## Explicit limits

This release is `PARTIAL_SPATIAL_CONTEXT_ONLY_NOT_SENTINEL_ENDPOINT_OR_CSLI_ELIGIBLE`.
It is **not**:

- an RF-exposure measurement or an RF proxy;
- a honey-bee biological endpoint panel;
- a time-resolved apiary covariate panel;
- eligible evidence for CSLI, F1–F6, an active prediction, or an RF-causal
  join.

Those are exclusions imposed by the held bytes, not a judgement about the
MUST-B study as a whole.

## What remains to acquire before a biological analysis

The portal catalogue lists these parts absent from the held archive:

| Portal part | Listed records | Needed role |
|---|---:|---|
| pesticide applications (`TBLPS132`) | 1 | chemical covariate |
| botanical-survey resource-providing units (`TBLRS133`) | 6,866 | forage/resource covariate |
| hive/colony master list (`TBLHV134`) | 80 | colony linkage |
| colony-management diary (`TBLVC135`) | 1,781 | intervention/management covariates |
| colony inspections | 435,964 | possible biological outcomes/covariates |
| SSD2 laboratory results (`TBLVS137`) | 1,861 | pathogen/health covariates |
| observation-colony records (`TBLVB138`) | 769 | date/context linkage |

The next acquisition must fetch those public raw table parts **separately**,
not assume that another “entire dataset” ZIP contains them.  For each part:

1. save the publisher bytes in a new, dated raw release without overwriting
   this archive;
2. record the source URL, retrieval date, byte count and SHA-256 in a new
   manifest;
3. inspect primary keys, hive/site links, date fields, outcome definitions and
   missingness before merging any table;
4. normalize only direct source fields, retaining an `RF_NOT_MEASURED` status;
5. require a separately acquired, spatially and temporally compatible RF field
   measurement layer before considering any exposure analysis.

Even a complete MUST-B relational release would be a small Danish/Portuguese
field-study layer.  It could support a pre-specified descriptive or
methodological analysis only after endpoint/linkage review; it would not by
itself establish a population-level RF effect.
