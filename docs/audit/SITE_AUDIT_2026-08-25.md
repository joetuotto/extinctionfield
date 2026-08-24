# BERM / extinctionfield.com — Kokonaisauditointi

**Paiva:** 2026-08-25
**Tyyppi:** DESKRIPTIIVINEN (ei muutoksia, vain raportointi)
**Metodi:** 9 rinnakkaista auditointiagenttia, staattinen koodianalyysi + ajonaikainen testaus
**Kattavuus:** Sivusto (Next.js), Python-malli (BERM), datatiedostot, dokumentaatio, ristiinvalidointi

---

## OSA 1: KOODIN RAKENNEKARTTA

### 1.1 Yhteenveto

| Mittari | Arvo |
|---------|------|
| Sivuja (page.tsx) | 23 (21 uniikkia, 2 re-export-shimia) |
| Komponentteja (.tsx) | 67 |
| Lib-tiedostoja (.ts + .json) | 32 |
| Kokonaisrivit (app + components + lib) | 30 763 |
| Python-rivit (berm/) | 50 542 |
| Testeja (pytest) | 1 071 lapaistya |

### 1.2 Suurimmat tiedostot (rivit)

#### Sivut (app/)

| Tiedosto | Rivit | KB |
|----------|------:|---:|
| evidence/page.tsx | 2 289 | 256 |
| mathematics/page.tsx | 1 807 | 108 |
| model/page.tsx | 861 | 60 |
| predictions/page.tsx | 815 | 72 |
| data/page.tsx | 687 | 32 |
| objections/page.tsx | 627 | 64 |
| page.tsx (etusivu) | 392 | 20 |
| model/fieldstate/math/page.tsx | 372 | 28 |
| sentinel/page.tsx | 298 | 40 |
| about/page.tsx | 237 | 12 |
| model/fieldstate/page.tsx | 215 | 16 |
| articles/[slug]/page.tsx | 197 | 8 |
| about/measurement/page.tsx | 186 | 16 |
| replication/page.tsx | 160 | 12 |
| model/math/page.tsx | 80 | 4 |
| explorer/page.tsx | 73 | 4 |
| references/page.tsx | 69 | 4 |
| about/history/page.tsx | 62 | 12 |
| explore/page.tsx | 54 | 4 |
| ecology/page.tsx | 54 | 4 |
| map/page.tsx | 41 | 4 |
| about/objections/page.tsx | 1 | (re-export) |
| about/replication/page.tsx | 1 | (re-export) |

#### Komponentit (top 20)

| Komponentti | Rivit | Kaytetaan |
|------------|------:|-----------|
| EcoStaticInterface | 1 008 | ecology |
| DiseaseCascadeTimeline | 889 | evidence |
| TherapeuticFrequencyMap | 716 | evidence |
| CausalChainDiagram | 556 | model/fieldstate |
| LayersExplorer | 511 | explore (via ExploreTabs) |
| BermCausalDiagram | 492 | model |
| CausalAtlas | 480 | map |
| SentinelCascadeTimeline | 470 | sentinel |
| ReferenceDatabase | 460 | references |
| ModulomeLayers | 415 | model |
| WorldMap | 405 | explorer |
| GlobalDataExplorer | 344 | explore (via ExploreTabs) |
| FalsificationTestsV19 | 341 | sentinel |
| PulseProfile | 303 | sentinel |
| EcoCausalVisuals | 298 | ecology (via EcoStaticInterface) |
| CountryDetailPanel | 278 | explorer (via WorldMap) |
| NikeBBSScatter | 273 | sentinel |
| FieldStateStatus | 270 | data |
| CellSizeFrequencyMatrix | 257 | evidence |
| CausalMap | 254 | EI KAYTOSSA (orpo) |

#### Datatiedostot

| Tiedosto | Rivit | Koko |
|----------|------:|-----:|
| public/data/rolling_backtest.json | 162 816 | 7.0 MB |
| public/data/global_panel.csv | ~15 000 | 3.5 MB |
| public/data/explorer.json | 1 (minifioitu) | 1.3 MB |
| public/data/geojson/ne_110m_countries.json | 1 | 820 KB |
| public/data/references_full.json | 12 632 | 366 KB |
| public/data/map_data.json | 1 | 377 KB |
| lib/cohortAsfr.json | 2 750 | 52 KB |
| lib/legacyEvidence.json | 2 659 | 96 KB |
| lib/sentinelCascadeSeries.json | 1 783 | 32 KB |
| lib/predictionSeries.json | 859 | 16 KB |

**public/data yhteensa:** ~13.4 MB (ladataan asiakkaalle staattisina tiedostoina)

### 1.3 Orpokomponentit

**Aidosti kuollut koodi (ei saavutettavissa milta sivulta):**

| Komponentti | Rivit | Syy |
|------------|------:|-----|
| CausalMap.tsx | 254 | Korvattu CausalAtlas:lla |
| CausalMapDetail.tsx | 108 | Riippuu CausalMap:sta |
| CausalMapNode.tsx | 47 | Riippuu CausalMap:sta |
| **Yhteensa** | **409** | |

Nama kolme muodostavat itsenaeisen klusterin joka kayttaeae dagre + @xyflow/react -kirjastoja mutta yksikaeaen sivu ei renderoi niitae.

### 1.4 Sivukartta (reitit)

| Reitti | Tiedosto | Navigaatiossa? |
|--------|----------|:--------------:|
| / | page.tsx | Kylla |
| /model | model/page.tsx | Kylla |
| /model/fieldstate | model/fieldstate/page.tsx | Kylla |
| /model/math | model/math/page.tsx | Kylla |
| /model/fieldstate/math | model/fieldstate/math/page.tsx | Ei |
| /evidence | evidence/page.tsx | Kylla |
| /predictions | predictions/page.tsx | Kylla |
| /sentinel | sentinel/page.tsx | Kylla |
| /objections | objections/page.tsx | Kylla |
| /references | references/page.tsx | Kylla |
| /map | map/page.tsx | Kylla |
| /explore | explore/page.tsx | Kylla |
| /about | about/page.tsx | Kylla |
| /explorer | explorer/page.tsx | Ei |
| /data | data/page.tsx | Ei |
| /ecology | ecology/page.tsx | Ei |
| /mathematics | mathematics/page.tsx | Ei |
| /replication | replication/page.tsx | Ei |
| /about/history | about/history/page.tsx | Ei (about-alavael.) |
| /about/measurement | about/measurement/page.tsx | Ei (about-alavael.) |
| /about/objections | about/objections/page.tsx | Ei (re-export) |
| /about/replication | about/replication/page.tsx | Ei (re-export) |
| /articles/[slug] | articles/[slug]/page.tsx | Ei |

**Puuttuvat:**
- Ei `app/page.tsx` (juuripolku `/` palauttaa 404)
- Ei `middleware.ts` (ei automaattista kielitunnistusta/-uudelleenohjausta)
- Ei `not-found.tsx`, `error.tsx`, `loading.tsx`
- Ei `sitemap.ts`, `robots.ts`

---

## OSA 2: SISALTOINVENTAARIO

### 2.1 Sivukohtainen sisaltokartta

| Sivu | Sanat (arvio) | Lukuaika | Osiot | Komponentit |
|------|-------------:|----------:|------:|------------:|
| / (etusivu) | 1 861 | 9 min | 11 | 4 |
| /model | 5 507 | 28 min | 15 | 4 |
| /evidence | 27 459 | 137 min | 18+ | 10+ |
| /sentinel | 4 128 | 21 min | 11 | 6 |
| /predictions | 6 956 | 35 min | 9 | 3 |
| /objections | 6 889 | 34 min | 7 | 2 |
| /mathematics | 9 871 | 49 min | 14 (S1-S12) | 2 |
| /data | 2 537 | 13 min | 9 | 2 |
| /references | 294 | 1 min | 1 (wrapper) | 1 |
| /explore | 164 | 1 min | 1 (wrapper) | 1 |
| /explorer | 358 | 2 min | 2 | 2 |
| /map | 185 | 1 min | 1 | 1 |
| /ecology | 220 | 1 min | 1 (wrapper) | 2 |
| /about | 1 099 | 5 min | 6 | 0 |
| /about/history | 929 | 5 min | 7 | 0 |
| /about/measurement | 1 439 | 7 min | 5 | 0 |
| /replication | 1 070 | 5 min | 5 | 0 |
| /model/fieldstate | 1 347 | 7 min | 6 | 2 |
| /model/fieldstate/math | 2 323 | 12 min | 5+ | 1 |
| /articles/bees | ~1 200 | 6 min | - | 1 |
| /articles/spectrum | ~1 100 | 6 min | - | 1 |
| /articles/implausibility | ~1 400 | 7 min | - | 1 |
| **YHTEENSA** | **~78 000** | **~392 min** | | |

**Havainto:** Evidence-sivu on 27 459 sanaa (~137 min lukuaika), mikae on ~35% koko sivuston sisallostae. Se on suhteettoman pitka verrattuna muihin sivuihin.

### 2.2 Sisallon paallekkaisyydet

| Konsepti | Sivut joilla esiintyy | Yhtenaeinen? |
|----------|----------------------|:------------:|
| IFO-VGIC | evidence, mathematics, model, objections, sentinel | Kylla |
| TTFields | evidence, math, model, objections, predictions, spectrum | Kylla |
| Panagopoulos | evidence, math, model, objections + 3 artikkelia | Kylla |
| TCBM (kolmikanavamalli) | evidence, mathematics, model | Kylla |
| Therapeutic Device Paradox | evidence, math, model, etusivu, predictions, spectrum | Kylla |
| Mobile phone paradox | evidence, math, model, etusivu, predictions, sentinel, bees | Kylla |
| Kim 2026 / Cyb5b | evidence, math, model, objections, implausibility | Kylla |
| Lindgren / chi | about/history, about, evidence, math, model (3 alasivua), objections, sentinel, implausibility | Kylla |
| Melatoniini | evidence, math, model/fieldstate, model, objections, predictions, sentinel | Kylla |
| Radical pair / RPM | evidence, math, model, objections, predictions, sentinel, implausibility | **Polkukirjainristiriita** |

Sisallolliset kuvaukset ovat yhtenaeisia sivujen valilla. Ainoa ristiriita on pathway-kirjaimissa (B vs C, ks. osa 4.3).

### 2.3 Viiterekisterin tila

| Mittari | Arvo |
|---------|------|
| Viitteita yhteensa | 587 |
| Verifioituja | 188 (32.0%) |
| Metadata.verified_count | 171 (**vaenhentunut**, todellinen 188) |
| Kategorioita (kanonisia) | 8 |
| Kategorioita (kaytossa) | 20 (12 dokumentoimatonta) |
| Polkuja (uniikkeja) | 84 |
| Episteemisia tasoja | 10 (6 validia + 4 epaekelpoa) |

**Datakenttien taeyteaeste:**

| Kentta | Taytetty | Tyhja/null | Osuus |
|--------|--------:|-----------:|------:|
| pathway | 583 | 4 | 99.3% |
| finding | 224 | 363 | 38.2% |
| doi | 154 | 433 | 26.2% |
| tags | 185 | 402 | 31.5% |
| level (validi) | 254 | 333 | 43.3% |
| type (validi) | 189 | 398 | 32.2% |

**Level-jakauma:**

| Taso | Maara | Osuus |
|------|------:|------:|
| E (established) | 159 | 27.1% |
| M\|C (model-consistent) | 27 | 4.6% |
| M (mechanistic) | 22 | 3.7% |
| C (conjecture) | 22 | 3.7% |
| L* (Lindgren-derived) | 23 | 3.9% |
| ? (luokittelematon) | 290 | 49.4% |
| null | 40 | 6.8% |
| A, T, H (epaekelvot) | 4 | 0.7% |

**Type-jakauma (top 10):**

| Tyyppi | Maara | Validi? |
|--------|------:|:------:|
| research | 290 | EI (ei unionissa) |
| experimental | 63 | Kylla |
| review | 60 | Kylla |
| null | 40 | EI |
| meta | 16 | Kylla |
| theoretical | 14 | EI (pitaeisi olla "theory") |
| book | 13 | Kylla |
| animal | 11 | Kylla |
| observational_cohort | 7 | EI (pitaeisi olla "cohort") |
| RCT | 5 | EI (pitaeisi olla "rct") |

---

## OSA 3: KAYTTAJAPOLUT JA NAVIGAATIO

### 3.1 Navigaatiorakenne

Paeanavigaatio (10 reittiae): Home, Data, Model (3 alasivua), Map, Predictions, Evidence, Sentinel, Criticism, Sources, About.

**13 sivua navigaation ulkopuolella:**
- /ecology, /mathematics, /data, /explorer, /replication
- /about/measurement, /about/history
- /about/objections, /about/replication (re-exportit)
- /model/fieldstate/math
- /articles/bees, /articles/spectrum, /articles/implausibility

**Haehaetys: kolme erillistae matematiikka-sivua:**
- `/model/math` (navigaatiossa) — wrapper joka importtaa MathematicsSections
- `/mathematics` (ei navigaatiossa) — taeysi matematiikkasivu, linkitetty etusivulta
- `/model/fieldstate/math` (ei navigaatiossa) — FieldState-matematiikka

### 3.2 Rikkinaeiset ankkurilinkit

**Kriittinen havainto:** Kausaalikartan solmujen `link`-kentaet viittaavat ankkureihin eri sivuilla. 63 solmusta ~50:llae on linkki. **44 ankkuria on rikki** — kohde-id:tae ei ole olemassa kohdesivulla.

| Kohdesivu | Toimivat ankkurit | Rikkinaeiset ankkurit |
|-----------|------------------:|---------------------:|
| /evidence | 8 | 25 |
| /sentinel | 0 | 5 |
| /objections | 0 | 1 |
| /model | 1 | 3 |
| /mathematics | 2 | 2 |
| /articles/bees | 0 | 1 |
| **Yhteensa** | **11** | **~37** |

Esimerkkejae rikkinaeisistae: `#adhd`, `#bbb`, `#cancer`, `#fertility`, `#melatonin`, `#sleep`, `#sperm`, `#testosterone`, `#insects`, `#birds`, `#bats`.

Etusivun "Test details" -linkki osoittaa `/model#falsification`, mutta ankkuri on `/mathematics`-sivulla.

### 3.3 Simuloidut kayttaejapolut

**Persoona A (utelias maallikko):** Etusivu toimii hyvin — 0 klikkausta ydinsanoman ymmartaemiseen. Heikkous: "BERM"-lyhenne avataan vasta model-sivulla syvaellae.

**Persoona B (skeptinen tutkija):** Falsifikaatioehdot naekyvaet etusivulla. Episteemiset tasot kaytossae. Heikkous: `#falsification`-linkki osoittaa vaeaeraen sivulle. Objections-sivulla ei yhtaeaen ankkuria syvaelinkkejae varten.

**Persoona C (toimittaja):** Tekijaetiedot, versio ja viitemaeaerae naekyvillae footerissa. Heikkoudet: ei DOI:ta, ei "How to cite" -osiota, ei muodollista muutoshistoriaa, ei paeivaemaearaeae.

### 3.4 Mobiilikayttokokemus

- Kausaalikartta: MobileStepper-komponentti korvaa interaktiivisen kartalta mobiilissa — hyvaee
- Taulukot: overflow-x-auto kaytossae
- Navigaatio: responsiivinen hamburger-valikko

---

## OSA 4: KAUSAALIKAAVIO JA TIETOMALLI

### 4.1 Rakenne

| Mittari | Arvo |
|---------|------|
| Solmuja (maearitelty) | 63 |
| Solmuja (naekyvillae kartalla) | 62 (epi_kaiser_series puuttuu NODE_ORDER:sta) |
| Reunoja | 106 |
| Tasoja | 8 (-1 ... 6) |
| Eristettyjaee solmuja (0 reunaa) | 1 (eco_tick) |

**Kaksi datatiedostoa:**
- `causalMapData.ts` — tieteellinen datamalli (solmut, reunat, metadata, suomenkieliset nimet)
- `causalAtlasData.ts` — visualisointikerros (layout, englanninkieliset nimet, opastetut kierrokset, mobiilipolut)

**Yhdistetyin solmu:** `mech_vgcc_ros` (VGCC -> Ca2+ -> ROS) — 13 yhteyttae (9 ulos, 4 sisaan). Mallin keskeisin hubsolmu.

### 4.2 Episteemisten tasojen jakauma (solmut)

| Taso | Maara | Osuus |
|------|------:|------:|
| E (established) | 47 | 74.6% |
| M\|C (model-consistent) | 10 | 15.9% |
| C (conjecture) | 6 | 9.5% |
| L (Lindgren) | 1 | 1.6% |

74.6% E-tasolla — mahdollisesti ylioptimistinen jos E-kynnys on matala.

### 4.3 Polkujen konsistenssi

| Polku | Sivusto | Python | Yhdenmukaisuus |
|-------|---------|--------|:--------------:|
| A | VGCC -> Ca2+ -> ROS | VGCC -> Ca2+ -> ROS | Kylla |
| B | CRY/RPM (radical pair) | Neuroendocrine (metadata.py) | **RISTIRIITA** |
| C | BBB disruption (evidence.ts) | CRY/melatonin (v16.py:446) | **RISTIRIITA** |
| D | Esiintyy ch_elf:ssae, ei omaa solmua | — | Dokumentoimaton |
| E | Vagal anti-inflammatory | — | Vain sivustolla |
| F | BBB permeability (pathways.py) | BBB (pathways.py) | Kylla |

**Tunnettu ongelma:** Polku B/C -kirjaimet ovat ristiriidassa Python-mallin ja sivuston valilla. Sivusto on sisaeisesti johdonmukainen (B = CRY/RPM kaikkialla), mutta Python-koodi kayttaeae eri kirjaimia.

---

## OSA 5: MATEMAATTINEN MALLI

### 5.1 Parametrien inventaario

**Yhteensopivat (sivusto = Python):**

| Parametri | Arvo | Kalibrointilahde |
|-----------|------|-----------------|
| bioCap a | 6.5 | Amish TFR |
| bioCap b | 0.010 | Kalibroitu |
| bioCap theta | 5.0 | Biologinen resistanssi |
| chi(A) | A/sqrt(1+A^2) | Lindgren |
| ALPHA_EFF | 0.43 | Kerrossumma 0.425 |
| Recovery VGIC | alpha=1.0, w=0.10 | Ionikanavapalautuvuus |
| Recovery ROS | alpha=0.8, w=0.30 | Antioksidantit |
| Recovery DNA | alpha=0.1, w=0.25 | 74pv spermatogeneesi |
| Recovery Leydig | alpha=0.3, w=0.20 | Testosteronituotanto |
| Recovery Neuron | alpha=0.0, w=0.15 | BBB pysyvae vaurio |
| Behav OT r1 | 0.010 | Vagaali + mikrobiomi |
| Behav T r2 | 0.013 | Travison -1%/v |
| Behav DA r3 | 0.016 | Ei yksiloity |
| Behav cort r4 | 0.008 | Pawlak 2025 d=1.88 |

**KRIITTINEN RISTIRIITA:**

| | Sivusto | Python |
|-|---------|--------|
| Behavioral hormones | 4 (OT, T, DA, cort) | **5** (+ vasopressiini r=0.006) |
| Geometric mean exp | 1/4 | **1/5** |
| Cortisol interaction | Ei | **Kylla** (cortisol_suppression) |

Sivuston kaava: `behav = max(0.1, (prod_{i=1}^{4})^{1/4})`
Python-koodi: 5-ulotteinen tulo + kortisoli-suppressio-interaktio

**Dokumentoimattomat Python-parametrit (ei sivustolla):**
- GAMMA_CRY = 0.02, GAMMA_MELATONIN = 0.015, GAMMA_OVUL_VGIC = 0.008
- GAMMA_MOTILITY = 0.015, GAMMA_CAPACITATION = 0.005, GAMMA_NAVIGATION = 0.003
- PERSONAL_SAR_WEIGHT = 1.5, TBE_FRACTION = 0.30
- BASELINE_MALE_RATIO = 0.512, SEX_RATIO_ROS_SENSITIVITY = 0.003
- PRE_TELECOM_START = 1950

**bioCap-alifaktorit:** Sivusto nayttaeae vain peruseksponenttikaavan. Python kertoo 5 lisaetekijaellae (spermCa2, CRY, melatoniini, ovulVGIC, male_bio_cap). Naemae kuvataan laadullisesti mutta kaavoja ei esitetae.

### 5.2 Kaavat vs koodi

- **chi(A):** Taeysi vastaavuus
- **bioCap (perus):** Taeysi vastaavuus
- **bioCap (taeysi):** Sivustolla vain peruskaava, Pythonissa 5 alifaktoria
- **Behavioral factor:** **RAKENTEELLINEN RISTIRIITA** (4 vs 5 ulottuvuutta)
- **Cultural/compensation TFR:** Vastaavuus
- **Kolmikanavapainot:** Sivustolla "DIAGNOSTINEN" (0.05/0.60/0.35), Pythonissa ei implementoitu temporaalimallissa
- **Jakobiaani:** Kuvattu sivustolla, implisiittinen Pythonissa

### 5.3 Lukittujen ennusteiden konsistenssi

Kaikki 8 lukittua ennustetta vastaavat taeydellisesti Python config.py:n ja website predictions.ts:n valilla (v17.1 kohorttiadjustoidut arvot).

**README.md on vaenhentunut** — nayttaeae v17.0-arvot (ks. OSA 10).

---

## OSA 6: SISALLON LAATU

### 6.1 Episteeminen rehellisyys

| Sivu | Varoitukset/rajoitukset | Falsifikaatio | "malli ennustaa" / "naytto osoittaa" |
|------|------------------------:|-------------:|------------------------------------:|
| evidence | 32 | 12 | 4 |
| model | 2 | 3 | 0 |
| predictions | 3 | 78 | 1 |
| objections | 16 | 25 | 1 |

**Havainto:** Model-sivulla vaehiten varoituksia (2 osumaa) vaikka se sisaeltaeae assertiivisimmat vaetteet mekanismeista. Predictions-sivu on voimakkaasti falsifikaatio-orientoitunut (78 osumaa).

Spesifisiae rajoitusten tunnustuksia loytyy:
- "Kanavavainot ovat DIAGNOSTISIA ja vaativat empiirisen kalibroinnin" (math S2b)
- "Poikkileikkausanalyysi ei voi maeaeritellae kausaalista suuntaa" (math S12)
- "n=41, replikoimaton, joten taemae on tuettu preminsi eikae kalibroitu kerroin" (v16.py)
- "Dual-hormone meta-analyysin efektikoko on pieni (r=-.061)" (math)

### 6.2 Terminologian johdonmukaisuus

- "BERM v17": 51 esiintymaeae (dominoiva)
- "v19"/"v19.1": 5 esiintymaeae (poikkileikkausvalidointi)
- "pathway" (biologinen mekanismi): 90 mainintaa
- "channel" (taajuusalue): 229 mainintaa
- Naimae kayttaeae johdonmukaisesti eri konsepteja

### 6.3 Kieliversiot

Kaeaennoesmekanismi: COPY- tai t-objektit jokaisella sivulla. EN ja FI taeydelliset kaikilla tarkastetuilla sivuilla. Yksikaeaen sivua ei loydetty jolla olisi vain toinen kieli.

---

## OSA 7: TEKNINEN VELKA

### 7.1 FieldState/v18-jaeaenteet

- FieldState on aktiivinen konsepti (38 tiedostoa), EI jaeannoestae
- v18-viitteet: 0 koodissa, 2 uudelleenohjaussakonfiguraatiossa (siisti)
- Versiovaihtokytkin: ei loydy

### 7.2 Orpotiedostot

- 3 orpokomponenttia (CausalMap-klusteri, 409 riviaea)
- 5 Next.js-oletustiedostoa public/:ssa (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Kayttaemaeton riippuvuus: recharts (package.json)
- Puuttuva tyyppimaearittely: geojson

### 7.3 Build-tila

- `npm run build`: 0 varoitusta, 0 virhettae
- `npx tsc --noEmit`: 0 tyyppivirhettae
- 0 `@ts-ignore`, `as any`, `@ts-expect-error` koko koodikannassa
- 0 `console.log` tuotantokoodissa

### 7.4 Bundle-koot

Suurimmat staattiset chunkit: 263 KB, 229 KB, 185 KB, 161 KB, 133 KB.
Staattiset chunkit yhteensa: 1.8 MB.
public/data yhteensa: ~13.4 MB (rolling_backtest.json 7.0 MB dominoi).

---

## OSA 8: PYTHON-MALLIN TILA

### 8.1 Koodipuu (top 10)

| Tiedosto | Rivit |
|----------|------:|
| v16.py | 1 590 |
| stats/rolling_backtest.py | 1 458 |
| stats/hierarchical.py | 1 390 |
| data/measured_fieldstate_biology.py | 1 252 |
| data/countries.py | 1 113 |
| tests/test_v16.py | 1 070 |
| stats/csli.py | 1 066 |
| stats/global_backtest.py | 1 053 |
| data/sentinel_normalize.py | 1 037 |
| data/seminology_benchmark.py | 965 |

Yhteensa: 50 542 riviaea Pythonia.

### 8.2 Testien tila

**1 071 testiae, kaikki lapaistaevaet** (123.71 s). 0 epaonnistumista, 0 skipattyae.

### 8.3 Versioristiriidat

| Lahde | Versio |
|-------|--------|
| pyproject.toml | 0.17.0 |
| __init__.py | 0.19.0 |
| config.py | v17.0, v17.1 |
| cross_sectional.py | v19.1 |
| Sivuston layout | "BERM v17" |
| Sivuston model-sivu | "v17" + "v19.1" |

**Ei yksittaeistae kanonista versionumeroa.**

### 8.4 Export-skriptit

5 exportskriptiae berm/-juuressa:
- export_asfr.py -> website cohort ASFR data
- export_cohort_asfr.py -> website cohort ASFR JSON
- export_explorer.py -> website explorer.json
- export_prediction_series.py -> website predictionSeries.json
- export_sentinel_cascade.py -> website sentinel cascade data

---

## OSA 9: DEPLOY JA INFRASTRUKTUURI

### 9.1 Vercel/deploy

- Git: github.com/joetuotto/extinctionfield.git
- Build: `cd website && npm run build`
- Framework: Next.js
- Duplikoitu vercel.json (juuri + website/)

### 9.2 robots.txt ja sitemap

**Molemmat puuttuvat kokonaan.** Ei staattisia eikae dynaamisia versioita.

### 9.3 SEO-metatiedot

- Kaikilla 23 sivulla on metadata (generateMetadata tai export const metadata)
- **0 OpenGraph-tagiä** (og:image, og:type, og:url)
- **0 Twitter Card -tagiä**
- **Ei faviconia** (favicon.ico, apple-touch-icon.png)
- **Ei OG-kuvia**

Sosiaalinen jakaminen tuottaa pelkkaen tekstin ilman esikatselukuvaa.

---

## OSA 10: KOKONAISKUVA

### 10.1 Tilastot

| Mittari | Arvo |
|---------|------|
| Sivuja | 23 (21 uniikkia) |
| Komponentteja | 67 |
| Lib-tiedostoja | 32 |
| Kokonaisrivejae (website) | 30 763 |
| Kokonaisrivejae (Python) | 50 542 |
| Viitteitae | 587 |
| Kausaalisolmuja | 63 (62 naekyvaa) |
| Kausaalireunoja | 106 |
| Lukittuja ennusteita | 8 |
| Modulome/cascade-ennusteita | 32 (M-1..M-5, LED-1, SLEEP-1, P11-P40) |
| Artikkeleita | 3 |
| Testejae (Python) | 1 071 |
| Kieliversiot | 2 (EN, FI) |
| Sanoja yhteensa (arvio) | ~78 000 |

### 10.2 Top 10 ongelmat (prioriteettijaeerjestys)

**1. Behavioral factor -kaava eroaa sivuston ja Python-mallin valilla**
Sivusto dokumentoi 4-hormonaalisen kaavan eksponentilla 1/4. Python-koodi implementoi 5-hormonaalisen kaavan (+ vasopressiini) eksponentilla 1/5 + kortisoliinteraktio. Taemae on sisaelloellinen ristiriita joka vaikuttaa mallin toistettavuuteen.
*Vaikutus: episteeminen eheys. Tutkija joka implementoi kaavan sivuston perusteella saa eri tuloksen.*

**2. 44 rikkinaeistae ankkurilinkkiae kausaalikartasta**
Kausaalikartan solmut linkittaevaet sivujen ankkureihin joita ei ole olemassa. ~77% linkeistae on rikki. Kartta on sivuston interaktiivisin tyoekalu mutta sen "lue lisaeae" -toiminnallisuus on laehes kokonaan rikki.
*Vaikutus: kayttoekokemus. Tutkija klikkaa solmua, painaa linkkiae, paeatyy sivun ylaereunaan.*

**3. Model-sivun luvut taeysin vaenhentuneet (35/50/9 vs 63/107/8)**
Model-sivu vaeittaeae "35 solmua, 50 reunaa, 9 tasoa". Todellisuus: 63 solmua, 107 reunaa, 8 tasoa. Kaikki kolme lukua vaeariaet, solmut laehes 2x.
*Vaikutus: uskottavuus. Vaearaet numerot herattaevaet epaeilyae sivuston tietojen luotettavuudesta.*

**4. Viiterekisterin laatu: 57% epaekelvoilla level-arvoilla, 68% epaekelvoilla type-arvoilla**
Yli puolet viitteitae kayttaeae arvoja ("?", null, "research", "RCT") jotka eivat vastaa TypeScript-tyyppimaarittelyjae. Haku- ja suodatustoiminnot eivat toimi oikein naeillae tietueilla.
*Vaikutus: data-eheys ja kaytettaevyys.*

**5. Juuripolku `/` palauttaa 404**
Pelkkaeaen domainiin navigoiva kayttaejaee saa tyhjaen virhesivun. Ei middleware.ts:aeae eikae app/page.tsx:aeae.
*Vaikutus: ensivaikutelma, kayttaejaehaevioe.*

**6. Pathway B/C -nimiristiriita Python-mallin ja sivuston valilla**
v16.py kutsuu melatoniini/CRY-mekanismia "pathway C":ksi, sivusto kutsuu sitae "pathway B":ksi. channelGroups.ts kuvailee pathway C:n vaeaerin.
*Vaikutus: sisaeinen johdonmukaisuus, tutkijoiden haehaennys.*

**7. pyproject.toml version 0.17.0 vs __init__.py 0.19.0 + rikkinaeinen build backend**
Pip-asennus epaonnistuu kokonaan (privaatti setuptools-API). Versiometa ristiriidassa.
*Vaikutus: kaeytettaevyys, toistettavuus.*

**8. README:n ennustetaulukko vaenhentunut (v17.0 vs v17.1)**
README nayttaeae vanhentuneita ennustearvoja. Kaikki 5 maan keskiarvot poikkeavat.
*Vaikutus: uskottavuus, GitHub-etusivu.*

**9. Ei robots.txt, sitemap, favicon, OG-tageja**
Hakukonenaekyyvyys ja sosiaalinen jakaminen ovat puutteellisia.
*Vaikutus: loydettaevyys, ammattimainen vaikutelma.*

**10. Evidence-sivu on 27 459 sanaa (~137 min lukuaika)**
Yksittaeinen sivu sisaeltaeae ~35% koko sivuston sisallostae. Taehaen on hyvin vaikeaa loytaeae tiettyae tietoa.
*Vaikutus: kaytettaevyys, luettavuus.*

### 10.3 Sisallon jakautuminen

| Sivu | Sanoja | Lukuaika | Osuus |
|------|-------:|---------:|------:|
| /evidence | 27 459 | 137 min | 35.2% |
| /mathematics | 9 871 | 49 min | 12.7% |
| /objections | 6 889 | 34 min | 8.8% |
| /predictions | 6 956 | 35 min | 8.9% |
| /model | 5 507 | 28 min | 7.1% |
| /sentinel | 4 128 | 21 min | 5.3% |
| /articles (3) | ~3 700 | 19 min | 4.7% |
| /data | 2 537 | 13 min | 3.3% |
| /model/fieldstate* | ~3 670 | 19 min | 4.7% |
| /about* | ~3 467 | 17 min | 4.4% |
| Muut | ~3 816 | 19 min | 4.9% |
| **Yhteensa** | **~78 000** | **~392 min** | **100%** |

**Jakauma on epaetasapainoinen.** Evidence-sivu dominoi. Matematiikka-sivu on toiseksi suurin. Yhdessae naemae kaksi muodostavat laehes 50% sisallostae.

### 10.4 Navigaation kattavuus

| Sivu | Navigaatiossa | Paeaesy |
|------|:-------------:|---------|
| / | Kylla | Suora |
| /model | Kylla | Suora |
| /model/fieldstate | Kylla | Model-alavalikko |
| /model/math | Kylla | Model-alavalikko |
| /model/fieldstate/math | Ei | Linkki fieldstate-sivulta |
| /evidence | Kylla | Suora |
| /predictions | Kylla | Suora |
| /sentinel | Kylla | Suora |
| /objections | Kylla | Suora |
| /references | Kylla | Suora |
| /map | Kylla | Suora |
| /explore | Kylla | Suora |
| /about | Kylla | Suora |
| /explorer | Ei | Explore-vaelilaehti |
| /data | Ei | Explore-vaelilaehti |
| /ecology | Ei | Linkki sentinel/model-sivulta |
| /mathematics | Ei | Linkki etusivulta |
| /replication | Ei | Linkki about-sivulta |
| /about/history | Ei | About-vaelilahti |
| /about/measurement | Ei | Linkki sentinel-sivulta |
| /articles/* | Ei | Linkit etusivulta |
| /about/objections | Ei | Duplikaatti /objections |
| /about/replication | Ei | Duplikaatti /replication |

### 10.5 Informaatioarkkitehtuuriehdotus

**Nykytila (A):** Litteae navigaatio, 10+3 reittiae, 13 sivua piilotettu. Toimii paeaesiassa mutta piilottaa merkittaevaen sisallon.

**Ehdotus (B/C-hybridi) — hierarkkinen + kayttaejapolku:**

```
Aloita taeltae (/)
  |
  +-- Malli (/model)
  |     +-- Yleiskatsaus
  |     +-- Kausaalikartta (/map)
  |     +-- Matematiikka (/mathematics)  [yhdistae model/math + mathematics]
  |     +-- FieldState (/model/fieldstate + /model/fieldstate/math)
  |
  +-- Naytto (/evidence)
  |     +-- Rekisteri (nykyinen evidence-sivu, pilkottu osiin)
  |     +-- Sentinel-lajit (/sentinel)
  |     +-- Ekologia (/ecology)
  |
  +-- Ennusteet & testit (/predictions)
  |     +-- Lukitut ennusteet
  |     +-- Data-lahteet (/data)
  |     +-- Explorer (/explorer, /explore)
  |
  +-- Arviointi (/objections)
  |     +-- Kritiikki & avoimet ongelmat
  |     +-- Replikaatioprotokolla (/replication)
  |     +-- Mittausprotokolla (/about/measurement)
  |
  +-- Viitteet (/references)
  |
  +-- Tietoa (/about)
  |     +-- Tutkija
  |     +-- Historia (/about/history)
  |     +-- Artikkelit (/articles/*)
```

Perustelut:
- Evidence-sivu pilkottaisiin 4-5 alasivuun (temaattiset narratiivit, retrodiktiot, bounded v2, extended catalogue)
- Kolme matematiikka-sivua yhdistettaeisiin yhdeksi
- Duplikaattireitit (/about/objections, /about/replication) poistettaisiin
- Explorer/data/explore yhdistettaeisiin yhden reitin alle

### 10.6 Seuraavat askeleet (5 taerkeintae)

1. **Korjaa behavioral factor -kaava sivustolle** (vasopressiini + 1/5 eksponentti + kortisoliinteraktio). Pieni tyomaeaerae, suuri episteeminen vaikutus — ilman taetae sivuston matemaattinen kuvaus on vaearae.

2. **Lisaeae ankkuri-id:t evidence-, sentinel- ja objections-sivuille** ja korjaa kausaalikartan linkit. ~44 ankkuria puuttuu. Merkittaevin kaytettaevyysparannuksen potentiaali koska kausaalikartta on sivuston keskeisin interaktiivinen tyoekalu.

3. **Paevitae model-sivun luvut** (63 solmua, 107 reunaa, 8 tasoa) + EN/FI modulomikuvaus + map-sivun solmumaeaerae + README ennustetaulukko. Pieni tyomaeaerae, poistaa uskottavuusongelman.

4. **Lisaeae juuripolun uudelleenohjaus + error boundary -sivut + robots.txt + sitemap.** Perusinfrastruktuuri joka puuttuu kokonaan.

5. **Normalisoi viiterekisterin level- ja type-arvot.** 333 referenssiaea vaativat level-luokittelun, 398 type-korjauksen. Mahdollista skripta-avusteisesti. Parantaa hakutoimintojen luotettavuutta ja datan koeytettaevyyttae.

---

*Auditointi suoritettu 2026-08-25. 9 rinnakkaista auditointiagenttia.*
*Metodi: staattinen koodianalyysi + pytest + npm run build + tsc --noEmit.*
*Ei muutoksia tehty.*
