# Completed items from CODELLE: Universaali CRY-mekanismi, kasvi-EMF-responssi ja polkuhierarkian uudelleenarviointi

Source: User message 2026-08-31 (Codelle instruction v2)
Date: 2026-08-31

## Completed items

### SESSIO 1
- [x] references_full.json: 11 new plant_cry references (ahmad2020_cry1_rf through haggerty2010_aspen_rf)
- [x] causalMapData.ts: mech_cry_melatonin sublabel updated (Universal EM sensor), ecosystem_cascade node added (level 6), 2 new edges
- [x] evidence/page.tsx: "Plants and Universal CRY" section + "Masting and CRY Synchronization" section (5 locales)
- [x] evidence/page.tsx: SolarStatCharts integrated into solar-cycle section

### SESSIO 2
- [x] model/page.tsx: Phylogenetic Pathway Hierarchy section (5 locales, table + warning box)
- [x] evolutionData.ts: MAST-SOLAR-1, MAST-RF-1, PLANT-CRY-RF-1, MAST-SOIL-B2-1 predictions (5 locales)
- [x] v16.py: v17_ecosystem_cry_cascade() DIAGNOSTIC_ONLY function (4 trophic levels)

### Section 1.3
- [x] Home page: "4 kingdoms" / "4계" ecosystem stat card added (all 5 locales, links to /evidence#plant-cry)
  - HUOM (2026-09-02 auditointi): kortti lisättiin commitissa b59eaf7 mutta poistettiin etusivu-uudistuksessa 3ccb521 samana päivänä. Etusivulla ei ole 4 kingdoms -korttia; päätös palauttamisesta on tekijällä.

### [DATA] Datasets (2026-08-31)
- [x] references_full.json: willis2022_mastreeplus (MASTREE+ database, GitHub, 73,828 observations)
- [x] references_full.json: world_bank_mobile_2024 (mobile subscriptions per 100 people)
- [x] public/data/solar_bandpass.json: includes mobile subscription data for masting correlation context

## Remaining items (deferred)

### [DATA] Not obtainable
- CRY2 RF sensitivity across species: No compiled dataset exists — Ahmad 2020 tested CRY1 only, Arabidopsis only
- MASTREE+ Fourier analysis vs SSN: MASTREE+ CSV available on GitHub but requires local download + processing (73K rows). Reference registered.
- Bogdziewicz 2021 synchrony vs mobile rollout: Single-species (beech), supplementary data behind journal paywall. World Bank mobile data obtained as country-level proxy.
