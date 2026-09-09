# Testosteroni, ajoitus ja lisääntymiskaskadi / Testosterone calibration evidence

Päivitetty / Updated: 2026-09-09. BERM v13 (ajoitus / chronology) + v14 (kaskadi / cascade).

## Tulkinta / Interpretation

Suomen, alueellisen USA:n MMAS-kohortin ja Israelin kliinisen aineiston hormonihavainnot edeltävät myöhempiä kansallisia TFR-laskuvaiheita. Tämä on rajattu ajallinen tulos. Vaikutuksen suuruus, täsmällinen viive ja syy arvioidaan erikseen.

Finnish samples, the regional US MMAS cohort and Israeli clinical observations precede later national TFR decline episodes. This bounded chronology is not a common causal lag or a prospective prediction.

- FIN: hormone sampling complete by 2002; later TFR peak 2010, first decrease 2011. The preliminary EDEN report dates from 2006 (archived 2008); the 2013 paper is the same study family.
- USA: Table 3 age-comparable MMAS means 500 ng/dL (1987–89, median age 65) and 444 ng/dL (1995–97, median age 64). Later national peak 2007, decrease 2008. The fully adjusted 1987–2004 calendar trend is -1.0%/year (95% CI -1.3 to -0.8); regional older men are not a representative reproductive-age US sample.
- ISR: 30 age-specific means (ages 20–49) in each of four periods; 2013–15 means lower than 2006–09 at every age. Peak 2017, decrease 2018. Figure-digitized values have approximately ±0.15 nmol/L reading tolerance, not sampling confidence intervals.

The decline episode rule uses post-2000 local peaks followed by at least three annual decreases and a lower value five years later; the final year of a rounded plateau can be the peak. Two-decrease sensitivity and alternative national/HFD fertility sources preserve the three principal dates. Data were already seen before extraction rules were written. Do not label this independent prospective validation. The full assessment preserves Denmark, Sweden, China, Brazil and the non-supporting South African comparison.

## NHANES methods

Public 2011–2016 modules: 3 repeated cross-sectional cycles, linked within cycle by SEQN. Men 18–69: 7,375 demographic records, 6,638 measured total T, 4,040 with T and sexual-frequency data. Counts are not longitudinal follow-up.

The displayed exploratory association is the first row of exploratory_hormone_behavior_associations.csv: ages 20–49, n=2,982, total T increment 100 ng/dL, binary endpoint >=52 reported vaginal or anal sex occasions/year. Logistic regression adjusts for age, age squared, BMI, survey cycle and exam session; MEC weights, strata and PSU Taylor variance are used. Complete cases; OR 0.994399 (95% CI 0.927898–1.065667). This endpoint is not fertile-window sperm exposure. Partner adjustment, E2/SHBG adjustment, calculated free T and never-sex sensitivity estimates are retained in the download. Calculated free T is not measured free T. No missing E2/SHBG cycle is fabricated. These are BERM exploratory estimates from CDC data, not CDC-published findings.

## Cascade interpretation

71 records in cascade_component_constraints.csv are published component estimates, group means, timings or proportions, not 71 independent studies. Source metadata, access limits and overlapping families are in source_catalog.json. Trial responses in low-T or severe-deficiency patients cannot be transported unmodified to natural population hormone variation. PDQ sexual-activity events are not all intercourse. Serum T is not intratesticular T. Sperm-response time and conception/birth time are separate delays. AMIGOS male T is observational despite its randomized parent fertility-treatment trial; adjusted live-birth OR 0.65 (95% CI 0.38–1.12).

BERM proposes the conditional per-cycle composition:

p_C = p_A * p_(P|A) * p_(X|A,P,H,Z) * p_(C|A,P,X,Q,F)

A: at-risk cycle; P: partner contact; X: fertile-window sperm exposure; H: hormone history; Z: context, intentions, contraception; Q: semen; F: female reproductive state. This is a candidate downstream decomposition with explicit conditioning assumptions, not an empirically closed causal identity. Model gestational survival, gestation delay, multiplicity and pregnancy/postpartum risk sets before aggregating births into age-specific rates. ART is a separate route. Population aggregation integrates the joint distribution, not the product of marginal means. Parenthood can feed back into later hormones.

The geometry premise is Lindgren 2025, g=eta+A tensor A; delta_g=Abar tensor a+a tensor Abar+a tensor a. BERM's conditional L2 response has an open gauge, physical scale, tissue kernel and sign. Imported hormone studies do not calibrate this upstream bridge or establish an EMF cause. Human hormone-to-TFR transfer remains open; no production coefficients were promoted. FieldState is only an optional physical measurement input.

## Files and sources

- chronology.json: three displayed observation-window summaries.
- temporal_precedence_assessment.csv: all timing assessments, including qualified/non-supporting cases.
- cascade_component_constraints.csv: 71 published component records.
- exploratory_hormone_behavior_associations.csv: five exploratory NHANES estimates.
- source_catalog.json: 16 source entries with primary URLs, study design and data access limits.
- manifest.json: SHA-256 checksums of the aggregate evidence downloads.

Primary timing sources: https://nora.nerc.ac.uk/id/eprint/3354/ ; https://doi.org/10.1210/jc.2006-1375 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC7063751/ . Fertility: UN World Population Prospects 2024, https://population.un.org/wpp/ ; Finnish timing cross-check https://statfin.stat.fi/ ; HFD/STFF https://www.humanfertility.org/ . NHANES codebooks: https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/TST_H.htm and https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/SXQ_H.htm . Additional component sources are listed in source_catalog.json and on the website.

The downloads contain aggregate study records and model estimates; the linked individual NHANES file is not included in this website export.
