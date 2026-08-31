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

## Remaining items (SESSIO 3)

### 1. [KOODI] berm-explorer.jsx: Aurinkosykli tab
- Country selector dropdown
- Dual time series charts (CBR/TFR + SSN dual y-axis; bandpass 8-14yr filtered)
- Country-specific chi_B value and geomagnetic latitude
- Northern Package diagnostics
- Uses COUNTRY_GEOMAG data from v16.py

### 2. [KOODI] Statistical results visualization
- 8 statistical analysis visualizations on evidence page:
  - Periodogram (USA 1909-2023, peak 11.4yr)
  - Bandpass 8-14yr correlation
  - First-difference analysis
  - Monte Carlo significance
  - Direction reversal (1998)
  - Era correlation
  - TFR rise test
  - Superposed epoch

### 3. [PROJEKTI] Documentation updates
- BERM_BERM_tilannekatsaus_ja_seuraavat_vaiheet.md
- BERM_SESSIO_seuraava_tehtavat.md
- BERM_README.md

### 4. [DATA] External data needed
- Amish birth records (Lancaster, Holmes counties) for SOLAR-1 validation
- Nordic vs Southern Europe bandpass data for SOLAR-2
- UK Biobank eye color x season-of-birth reanalysis for SOLAR-3
- Brazilian state-level birth rate + SSN data for SOLAR-4
