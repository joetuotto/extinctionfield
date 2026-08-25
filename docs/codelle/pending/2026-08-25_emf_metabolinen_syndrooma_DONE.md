# Codelle: EMF → Metabolinen syndrooma / Obesiteetti — MASTER-integraatio

**Päivämäärä:** 2026-08-25
**Tila:** DONE
**Deploy:** extinctionfield.com (Vercel production)

## Toteutetut osiot

### 1. Viitteet (references_full.json)
- **13 uutta viitettä** lisätty (675→688): alshammari2022, maalouf2023, 5g_bat2025, prenatal_wifi2023, thyroid_rf2024, pancreas_rf2018, chen2016_glia, yang2015_astro, bhatt2012_glp1, alpha2d1_glp1_2024, nifedipine_weight2011, screentime_meta2022, shiftwork_mets2025
- klimentidis2010 oli jo olemassa — ei lisätty uudelleen
- Kaikissa viitteissä `finding`, `pathway`, `tags` -kentät (pakollinen)

### 2. Model-sivu: Cascade 19 (Metabolinen syndrooma / Obesiteetti)
- Lisätty disease cascades -listaan kohdassa 19
- Kuusi konvergoivaa EMF → Ca²⁺ -reittiä kuvattu
- Kaskadilasku päivitetty: "Ten additional" → "Eleven additional"

### 3. Model-sivu: CaMKII Convergence -osio
- CollapsibleSection id="camkii-convergence"
- CaMKIIConvergenceDiagram.tsx: interaktiivinen SVG (700×420)
  - Upstream: EMF → VGCC → Ca²⁺
  - Keskus: CaMKII (violetti ympyrä)
  - 5 fan-out: Cav3.2 threshold, UCP1, StAR, β-cell, L-cell GLP-1
- Episteeminen varoitus (amber): "CaMKII convergence is identified but not yet experimentally tested"
- Linkki evidence#metabolic-evidence

### 4. Modulome: Hypothalamus (ARC)
- Uusi sivu: app/[locale]/modulome/hypothalamus/page.tsx
- 6 osiota: Channel Profile, Appetite Mechanism, Chen 2016, Alshammari 2022, GLP-1/Ozempic, Multifaktoriaalinen konteksti
- Evidence level E
- organs.ts: hypothalamus-profiili lisätty

### 5. Modulome: Brown Adipose Tissue (BAT)
- Uusi sivu: app/[locale]/modulome/bat/page.tsx
- 8 osiota: Channel Profile, UCP1 pathway, SERCA2b/RyR2, Maalouf 2023, 5G study 2025, CaMKII convergence, Cold exposure, Epistemic note
- Evidence level E
- organs.ts: bat-profiili lisätty

### 6. Evidence-sivu: #metabolic-evidence
- Metabolic Syndrome: Six Converging Pathways -osio
- 8 tutkimuksen taulukko (Authors/Year/Mechanism/Finding/Level)
- Klimentidis Paradox -korostuslaatikko (oranssi reunus, p-arvo)
- Ristilinkit model#camkii-convergence ja predictions

### 7. Predictions: METAB-1 → METAB-4
- METAB-1: Faraday-suojatut eläimet (CRITICAL, oranssi reunus)
- METAB-2: CaMKII-inhibitio
- METAB-3: Semaglutidi/EMF-korrelaatio (SPECULATIVE, level L*)
- METAB-4: Vuorotyö metabolinen syndrooma

### 8. Etusivu: Klimentidis Paradox -kortti
- "THE KLIMENTIDIS PARADOX" -label
- "Even lab animals are getting fatter" -otsikko
- p = 1.2 × 10⁻⁷ -tilasto
- Episteeminen huomautus: Klimentidis ei tutkinut EMF:ää
- Linkki model#camkii-convergence

### 9. Navigaatio
- CaMKII Convergence lisätty Model-alivalikkoon (badge: "NEW")
- Viiteluku: "658 peer-reviewed sources" → "688 peer-reviewed sources"
- Modulome-kuvaus: "10 target organs" → "12 target organs"
- T→TFR Threshold -badge poistettu ("NEW" → ei badgea)

## Noudatetut varoitukset (Codelle §VAROITUKSET)

1. **Klimentidis ei tutkinut EMF:ää** — merkitty selvästi BERM:n derivaatioksi
2. **Obesiteetti on MULTIFAKTORIAALINEN** — EMF on YKSI tekijä, ei ainoa
3. **CaMKII-konvergenssi on TUNNISTETTU mutta ei kokeellisesti testattu** — taso M
4. **GLP-1/Ozempic-ennuste (METAB-3) on SPEKULATIIVINEN** — taso L*
5. **Adiposyytin suora EMF-vaste (mekanismi 6) on HEIKOIN** — taso M
6. **Kaikki kuusi mekanismia sisällytetty** — ei yksinkertaistusta
