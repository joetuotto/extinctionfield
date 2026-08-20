# Veterinary sentinel: Fielding 2025 Goa dog study

## Scope

This is an isolated veterinary observation layer. It normalises direct
site-by-survey-time counts from Fielding’s free-roaming-dog sterilisation RCT
into `veterinary_sentinel_species_site_time`; it is **not** an RF-exposure
dataset, direct CSLI input, or standalone FieldState-effect predictor. It is
an active veterinary endpoint and protocol-context layer: its observed response
definition, intervention structure and source covariates remain available to
the cross-species/endpoint evidence map without being mistaken for RF
dosimetry.

- Dataset: [Fielding 2025, University of Edinburgh DataShare](https://doi.org/10.7488/ds/7919)
- Study article: [Scientific Reports, 2025](https://doi.org/10.1038/s41598-025-98990-1)
- Licence recorded by the repository: CC BY 4.0
- Coverage: Goa, India; ten anonymised sites in five control/intervention pairs;
  surveys from 2020-07-11 through 2023-01-19.
- Design caveat: a sterilisation intervention is a direct determinant of the
  reproductive-population counts. The source reports no RF dose or validated RF
  proxy, and deliberately withholds coordinates.

## Held source release

The source files are deliberately gitignored, but their exact identity is
versioned in [fielding_goa_2026-08-19.manifest.json](../data/raw/manifests/fielding_goa_2026-08-19.manifest.json).
The ingest refuses a missing, re-named, resized, or checksum-mismatched file.

| File | SHA-256 | Rows used |
| --- | --- | ---: |
| `README_ImpactsPaper.txt` | `40fe649f23590f982388d9e53f52a436329fce3f12358384e84ba13fbd2d9f50` | 0 |
| `SummedSiteCountsByAge_R2_14.csv` | `610e2c1ab8c33c4c00354208fb83ac1034d1f493aec7ece9366d81c4c63a6c7d` | 939 |
| `SummedSiteCountsLact_R2_14.csv` | `399bb1435723c214a6053f1ff498525f419f091727111517ba01fdc67a0f221a` | 939 |

Place those original files under
`berm/data/raw/veterinary/fielding_2025_goa_rct/`, retaining their names, then
run from `berm/`:

```bash
python3 -m berm.data.veterinary_sentinel
```

The process writes only regenerated, gitignored derived files:

- `berm/data/processed/veterinary_sentinel_species_site_time.csv`
- `berm/data/processed/veterinary_sentinel_species_site_time_summary.json`

It never writes a raw file, manifest, CSLI artifact, readiness artifact, or web
artifact. Replacing a changed derived result requires `--replace` explicitly.

## Output and observed endpoints

The current held release produces 1,878 rows: 939 `puppy_count` and 939
`lactating_female_count` rows. Its canonical grain is
`anonymised_site × observation_datetime × species × endpoint`. The output
retains survey route-km, weather/monsoon, site pair/type, days post
intervention, adult or adult-female denominator counts, and source-reported dog
density as covariates. These are source variables, not invented controls.

The direct counts are useful for transparent reanalysis of the original
population-management study. They are not individual litter-size, conception,
semen-quality, cryptorchidism, or long-run geographic fertility endpoints.

## F-test status

All F1–F6 are intentionally marked `BLOCKED` in the generated summary. This
is a status for the six predeclared **direct sentinel→human endpoint** tests,
not a zero-evidence label for the observed veterinary outcome. At a minimum,
an RF comparison would require externally joinable region identities and
measured or validated RF exposure. The present source additionally lacks a
dog-semen endpoint, matched human biomarker panel, matched chemical covariates,
and a multi-region comparable time series. Those missing data must remain
visible rather than being filled with an adoption proxy or a model assumption.
