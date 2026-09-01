# Deferred items from CODELLE_aurinkosykli_geomagneettinen_v3.md

Source: User message 2026-08-31 (Codelle instruction v3)
Date: 2026-08-31

## Completed items

### SESSIO 1
- [x] references_full.json: 21 new canonical + 3 aliases (solar_geomagnetic category)
- [x] causalMapData.ts: solar_geomag node (level 3) + northern_package updated (level 2) + edges
- [x] evidence/page.tsx: Solar Cycle & Geomagnetic Biology section (11th convergence line)
- [x] Convergence lines count updated 10 -> 11, SVG diagram updated

### SESSIO 2
- [x] v16.py: COUNTRY_GEOMAG table (20 countries)
- [x] v16.py: v17_chi_B() DIAGNOSTIC_ONLY function
- [x] v16.py: v17_northern_package() DIAGNOSTIC_ONLY function
- [x] evolutionData.ts: SOLAR-1 through SOLAR-4 predictions (5 locales)
- [x] model/page.tsx: Dual susceptibility diagram (chi(A-bar) vs chi_B)
- [x] evidence/eyes/page.tsx: Northern Package page (7 sections, EN+FI full, JA/FR/KO titles)
- [x] evidence/page.tsx: Updated eyes sub-page card to Northern Package

### SESSIO 3
- [x] SolarExplorer.tsx: Solar tab component with country selector, chi_B calculation, Northern Package visualization
- [x] explorer/page.tsx: SolarExplorer integrated into explorer page
- [x] SolarStatCharts.tsx: 8 statistical visualization charts (periodogram, bandpass, first-diff, Monte Carlo, reversal, era correlation, TFR rise, superposed epoch)
- [x] evidence/page.tsx: SolarStatCharts integrated into solar-cycle section

### [DATA] Empirical datasets (2026-08-31)
- [x] public/data/solar_bandpass.json: World Bank TFR (9 countries, 1960-2023) + SILSO SSN V2.0
- [x] EmpiricalSolarCharts.tsx: 4 real-data charts (raw TFR comparison, detrended overlay, r vs geomag lat, country bar chart)
- [x] evidence/page.tsx: EmpiricalSolarCharts integrated after SolarStatCharts
- [x] v16.py: v17_solar_bandpass_analysis() DIAGNOSTIC_ONLY function
- [x] references_full.json: silso_ssn_v2, ibge_sidra_births, stone2025_amish_demography, world_bank_mobile_2024 added
- [x] SOLAR-2 data: Nordic vs Southern Europe TFR + SSN bandpass correlation (World Bank + SILSO)

## Remaining items (deferred — [PROJEKTI] and [DATA])

### [PROJEKTI] Documentation updates
- BERM_BERM_tilannekatsaus_ja_seuraavat_vaiheet.md — file does not exist yet, needs creation
- BERM_SESSIO_seuraava_tehtavat.md — file does not exist yet, needs creation
- BERM_README.md — file does not exist yet, needs creation

### [DATA] Not obtainable
- SOLAR-1 (Amish birth records): Only decade-level data from church directories — too coarse for 11-year solar cycle analysis
- SOLAR-3 (UK Biobank eye color × season-of-birth): Requires institutional access application — cannot download publicly
- SOLAR-4 (Brazil state-level): National-level TFR added; IBGE SIDRA ref registered. State-level download requires SIDRA API calls (documented, not automated)
