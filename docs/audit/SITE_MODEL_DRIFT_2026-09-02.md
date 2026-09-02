# BERM / extinctionfield.com — Sivusto vs. malli: ajantasaisuus- ja täydellisyysauditointi

**Päivä:** 2026-09-02
**Tyyppi:** DESKRIPTIIVINEN + korjaussuunnitelma. Auditointi ei muuttanut sivustoa; korjaukset tehdään erillisenä vaiheena (osa 12).
**Kysymys:** vastaavatko sivuston kohdat mallin ja kerätyn evidenssin uusinta tilaa, ja missä osiot hyödyntävät evidenssiä vain vajavaisesti.
**Metodi:** 6 rinnakkaista vain-lukevaa auditointiagenttia (+2 aliagenttia) ja pääsession läpileikkaavat tarkistukset. Jokainen numero laskettiin elävästä mallista (`cd berm && PYTHONPATH=. python3 …`), ei dokumenteista. Renderöinti tarkistettiin tuotannon DOM:sta (innerText), ei raakahtml:stä. Tuotanto-sweep: 90 staattista reittiä × 5 kieltä.
**Vertailukohta:** työpuu `/Volumes/kovalevy 3/extinctionfield` (HEAD `2584b6f`, 47 muokattua tiedostoa, +5 166/−756 riviä, rinnakkainen sessio muokkaa samanaikaisesti). `pytest`: **1 566/1 566** vihreä (189 s). Tuotanto (www.extinctionfield.com) on deployattu työpuusta klo ~07:00 ja on työpuuta jäljessä (ks. muisti `berm-deploy-ahead-of-git`).
**Kattavuus:** sivilisaatiosivut (7), datapeilit (`lib/*.ts`, `lib/*.json`, `public/data/*.json`, `data/*.json`), artikkelit (5 + `lib/articles.ts`), sivustonlaajuiset ristiintarkistukset. **Auditoimatta jäi** API:n sessiorajan (HTTP 429, "resets 2:30pm") vuoksi: model/mathematics/fieldstate/q-factor/data/explore/map-sivut, evidence-alasivut (40+), modulome (14 sivua); ennusteet/etusivu/about/objections/epistemology-agentti keräsi evidenssin mutta raportti on kesken. Ks. osa 10.

---

## 1. Yhteenveto — kymmenen tärkeintä löydöstä

1. **[P0] Kulttuurienergia-BioCap: sivuston keskeisin sivilisaatioväite perustuu orpoon JSON-tiedostoon.** `website/public/data/berm_cultural_energy_model.json` on käsintehty (ei generaattoria repossa), 7-markkerinen (ei B2), CORT käänteisenä ja implisiittisellä B2 = 0,9 -vakiolla. Elävä malli (`biomarker_trajectories.get_trajectory` → `cultural_energy.compute_biocap`, 8 markkeria) antaa 2025 = **0,514**, JSON 0,648. Mallin omat siirtymät: deistinen→manistinen **1992–1995**, manistinen→zoistinen **2020**; sivu sanoo 2000/2015/2040. Patopoliteia-sivun teksti (~0,51), kaavio (0,648) ja vaihekortit (manistinen 2015–) ovat keskenään ristiriidassa; mathematics-sivu ja etusivu toistavat 0,648:n. → Osa 2.
2. **[P0] Mallin rakennevirhe:** `BIOMARKER_WEIGHTS` positiiviset painot summautuvat 0,90:een → `compute_biocap` ≤ 0,90, joten "rationalistinen ≥ 0,90" on saavuttamaton kaikille (Amish 0,855; 1900 = 0,897 = deistinen). Vaatii omistajan päätöksen (osa 11, D1).
3. **[P0] Migraatiogradientin ja χ:n etumerkki on sivulla ja kartassa päinvastainen kuin mallissa.** `biocap(2025, lat)`: Saharan eteläpuolinen Afrikka **0,596 (matalin)**, Länsi-Eurooppa **0,802 (korkein)**; `chi_latitude(30°) = 0,752 > chi_latitude(52°) = 0,466`. Sivu: "SSA:lla korkein biologinen kapasiteetti", "matalan χ:n vyöhyke 25–35°N". Kolme keskenään ristiriitaista asteikkoa yhdelle suureelle (`biocap()`, `REGIONS.current_biocap_estimate`, `MigrationGradientMap.tsx`). Päätös D2.
4. **[P0] Datapeilit:** `channelGroups.ts` ELF/IF-rajat ja polkulistat väärin (`three_channel.py`); `causal-graph.json` merkitsee 13 solmua "calibrated" vaikka `causal_registry.py` sanoo `proxy_only`/`structural_only`/…; `sentinel_registry.json` r = 0,909 (todellinen 6 pisteen r = 0,717; 7 lajin `fit_gradient` r = 0,842, p = 0,017); `thresholdModel.ts` USA T-lasku 1,0 %/v (malli 1,2); `falsification_v19_1.json` 8 testiä vs koodin rekisteri 7. → Osa 4.
5. **[P0] Navigaatio:** `lib/navigation.ts:377–381` "531 peer-reviewed sources" (5 kieltä) — tietokannassa **1 034** (373 varmennettua, 656 linkittämätöntä).
6. **[P0] Sivilisaatiosivujen numerovirheet ja omat väärät kontekstitekstit:** patokratia "T rappeutuu nopeimmin (59 %)" — malli: **MEL 62 %** > T 59 % > OXT 46 % > DA 41 % > BDNF 28 %; patokratian patologisaatioindeksin määritelmä (1 − BioCap/baseline) on väärä — se on 7-ulotteisen orientaatioprofiilin RMS-etäisyys Amish-profiilista; patopoliteian painohuomautus ("painot summautuvat 1,0:aan… ±20 % perturbaatio") ja vaihehuomautus ("kalibroitu Unwinin 86 yhteisön aineistoon") eivät vastaa koodia (signed sum 0,80; ei perturbaatiorutiinia; ei Unwin-aineistoa koodissa); L3 "solar 0,41 vs 0,73" → malli 0,41 vs **0,49**. → Osa 3.
7. **[P1] Mekanismikehystys:** kaikki 7 sivilisaatiosivua ja `political_biology.py`:n docstringit (`:826–828, :908–909, :952–953, :2513`) esittävät VGCC:n *ainoana/primäärinä* mekanismina; `docs/protocol/SESSION_PRIMER.md` tekee B = RPM/CRY→melatoniini→HPG primääriseksi ja nimeää "VGCC-oletuspolun" liukumavirheeksi #3. Päätös D3.
8. **[P1] Viitepohjan hyödyntäminen:** 92/133 sivilisaatiosivujen kirjallisuusviittauksesta puuttuu `references_full.json`:sta; Thirteen Phenomena -artikkelissa 0 `[[ref:]]`-tagia (35 raakaa lähdemerkkijonoa, ~135 linkittämätöntä mainintaa); rekisterin 1 034 viitteestä 656 ei ole linkitetty mihinkään.
9. **[P1] Sivustonlaajuiset epäjohdonmukaisuudet:** testosteronin lasku −1 %/v (evidence, model, predictions, `causalChainData.ts`) vs −1,2 %/v (malli: `v16.py:832`, Travison 2007 -entry, DeRoose 2023); Amish-TFR 6,5 (etusivu, mathematics, `evolutionData.ts`) vs 6,1 (viitteet Anderson 2025, Stone 2025; 6,5 = mallin kalibrointiparametri `countries.py:389`); Singapore TFR 0,78/0,97/0,87 samalla sivulla; Etelä-Korea 0,72 vs 0,75 (2024); Japani 1,20 vs 1,15; Suess-jakso 200/210/208. → Osa 6.
10. **[P1] Mallin ominaisuudet ilman sivuedustusta:** 20+ `berm.civilization`-vientiä (Calhoun-vaiheet, bioleninisti-ratchet, parasiittiset indeksit, `cross_country_comparison`-taulukko, `empire_lifespan_distribution`, `GRAND_MINIMA`, `orientation_profile`…) ja patokinesis-sivun `s6*`-gradienttitaulukot, joille on COPY-teksti mutta ei JSX:ää. → Osa 7.

Renderöintiviat (raa'at `[[ref:]]`-tokenit unbroken-chain 17, allergy 1, pathopege 1; tyhjät elementit patokinesis 6 / patopoliteia 8 (ja) / evolution 4) on **jo korjattu työpuussa** rinnakkaisen session toimesta ja poistuvat seuraavassa deployssa; ne eivät ole tämän auditoinnin avoimia kohteita (osa 9).

---

## 2. P0-klusteri: kulttuurienergia-BioCap

### 2.1 Lähde vs. sivusto

| Lähde | Markkerit | 1900 | 1980 | 2000 | 2020 | 2025 | 2040 | 2060 | Siirtymät |
|---|---|---|---|---|---|---|---|---|---|
| `berm_cultural_energy_model.json` (sivusto) | 7, CORT käänteinen, B2 = 0,9 implisiittinen | 0,975 RAT | 0,971 RAT | 0,867 DEI | 0,694 MAN | **0,648 MAN** | 0,509 ZOI | 0,359 ZOI | 2000 → DEI, 2015 → MAN, 2040 → ZOI |
| `get_trajectory()` + `compute_biocap` (malli) | 8, CORT raaka | 0,897 DEI | 0,808 DEI | 0,698 MAN | 0,546 ZOI | **0,514 ZOI** | 0,448 ZOI | 0,412 ZOI | 1992/1995 → MAN (T), **2020 → ZOI** (OXT); `predict_next_transition` = None |

JSON toistuu täsmälleen kaavalla 0,2·T + 0,2·OXT + 0,15·DA + 0,15·MEL + 0,1·BDNF + **0,1·CORT_inv** + 0,05·D + 0,05·**0,9** (agentti 1). `export_civilization.py` kirjoittaa eri tiedostoa (`civilization_indices.json`, political_biology-taulukot; sync-testi `test_civilization_site_sync.py` vihreä, tiedosto generoitu 2026-09-02 10:26).

`political_biology.py:35–36` importoi `biomarker_values_at` + `compute_biocap` → patokratian ympäristötaulukon "Suburban 0,514" ja kulttuurienergian 2025 = 0,514 **ovat sama konstruktio**. Ympäristöt 2025: amish 0,855, rural 0,631, suburban 0,514, urban_residential 0,436, urban_office 0,380.

### 2.2 Sivukohdat, jotka seuraavat orpoa JSON:ia

| Kohta | file:line | Sivu sanoo | Malli |
|---|---|---|---|
| Patopoliteia § Unwinin 4 vaihetta | `patopoliteia/page.tsx:107–112` (FI :307) | Manistinen "Länsimainen sivilisaatio 2015–nykyhetki"; Deistinen 2000–2015; Rationalistinen "ennen 2000" | ks. 2.3 |
| § Vaihesiirtymät | `:125–129` (FI :325) | ~2000 RAT→DEI, ~2015 DEI→MAN, ~2040 MAN→ZOI "ENNUSTE" | 1992/1995, 2020; ei tulevaa siirtymää |
| § Herkkyysanalyysi | `:114–124` (FI :314–323) | T +16,7 %, MEL +12,2 %, OXT +10,8 %, DA +5,6 %, BDNF +3,7 %, D +1,7 % (6 riviä); "triadi 39,7 % palautumisesta"; "palautettaisiin 1980-tasolle"; "osuus nykyisestä BioCapista"; "2025 ~0,51 → ~0,60" | `sensitivity_all(2025)`: **T 23,3, OXT 19,9, MEL 16,4, CORT 13,9, DA 12,8, BDNF 6,7, D 4,5, B2 2,5** (% saavutettavasta parannusvarasta = (max 0,90 − 0,514)); järjestys T > OXT > MEL; triadi 59,6 %; palautus optimiin 1,0 (CORT 0,0), ei 1980-tasoon (`biomarker_values_at(1980)`: T 0,873, MEL 0,805) |
| § 8 biomarkkeria (tutka) | `:930–937` | T 0,46 OXT 0,65 DA 0,76 MEL 0,475 BDNF 0,76 CORT 0,80 D 0,78 B2 0,70; CORT-paino +0,10 | `biomarker_values_at(2025)`: T 0,550 OXT 0,616 DA 0,671 MEL 0,577 BDNF 0,742 **CORT 0,538 (paino −0,10)** D 0,650 B2 0,806 |
| § Painohuomautus (lisätty 2.9. aamulla) | `:83` | "Weights sum to 1.0… robust to ±20% perturbation" | signed sum 0,80, max BioCap 0,90; perturbaatiorutiinia ei ole |
| § Vaihehuomautus (lisätty 2.9. aamulla) | `:106` | "calibrated to Unwin's 86-society dataset… ±0.05 does not change…" | `unwin_validation.py` sisältää vain kolme vakiota ja luokittelijan; ei aineistoa, ei testijoukkoa |
| BioCap-kaavio | `components/BiocapTrajectory.tsx:3,51,146–158` | lukee JSON:ia; "2025: 0.648"; Amish-viiva `yPos(0.98)`; 7 markkeria | Amish = `compute_biocap(environment_biomarkers("amish"))` = **0,855**; B2 puuttuu `markers`-propista (`patopoliteia:968`) |
| Mathematics | `mathematics/page.tsx:458` (FI :912) | "The 2025 Western estimate (BioCap ≈ 0.648) places civilization in the Manistic phase." | 0,514 |
| Etusivu | `app/[locale]/page.tsx:44,53` | "0.648 … down from 0.99 in 1950" | 0,514; 1950 suburban 0,876 (patokratia :39 sanoo 0,876) |
| "Model-derived values from BioCap integral" -alaviitteet | `patokratia:218`, `pathopolites:155`, `patopolis:540`, `patopoliteia:180` | integraalista | taulukot tulevat `political_biology`-funktioista, eivät `biocap.py`-integraalista |

### 2.3 Rakennevirhe ja ratkaisuvaihtoehdot (päätös D1)

`compute_biocap(kaikki positiiviset = 1, CORT = 0)` = **0,90** (`cultural_energy.py:21–30`). `PHASE_THRESHOLDS` 0,55/0,75/0,90 (`unwin_validation.py:36–40`). Testit kiinnittävät vain kynnykset ja laskevan trendin (`tests/test_cultural_energy.py:109–132, 212–216`).

| Vaihtoehto | Muutos | Siirtymät | 2025 | Vaikutus |
|---|---|---|---|---|
| (c) nykyinen | ei mitään | 1900 DEI, 1992 MAN, 2020 ZOI | 0,514 **zoistinen** | Länsi ei koskaan rationalistinen; Amish (0,855) deistinen; sivun narratiivi (renessanssit = rationalistinen energia) romahtaa |
| **(b) kynnykset × 0,9 = 0,495 / 0,675 / 0,81** | 3 vakiota `unwin_validation.py` + docstring + testit `L109–128` | **1900 RAT, 1980 DEI, 2004 MAN, 2029 ZOI** | 0,514 **manistinen** | kaikki sivuston verifioidut luvut säilyvät (sync-testi, political-taulukot); vaiheaikajana lähellä nykyistä narratiivia (2000/2015/2040 → 1980/2004/2029); zoistinen siirtymä muuttuu falsifioitavaksi ennusteeksi 2029 |
| (a) arvot / 0,9 | `compute_biocap` normalisointi | sama kuin (b) | 0,571 manistinen | kaikki näytetyt BioCap-luvut muuttuvat (0,514 → 0,571), `civilization_indices.json` + sync-testi + political-taulukot uusiksi |

**Suositus: (b).** Vaihtoehto (c) on myös johdonmukainen valinta, jos malliomistaja hyväksyy, että länsi luokittuu zoistiseksi vuodesta 2020 — silloin sivujen teksti kirjoitetaan sen mukaan.

Kummassakin tapauksessa: (1) luodaan `berm/export_cultural_energy.py` (kuten `export_civilization.py`), joka kirjoittaa JSON:n `get_trajectory(1900, 2061, 5)` + `classify_phase` + `sensitivity_all` + `environment_biomarkers("amish")` -arvoista ja sync-testi; (2) `BiocapTrajectory.tsx` Amish-viiva ja B2; (3) patopoliteian vaihe-, siirtymä-, herkkyys- ja tutkasisältö EN+FI generoidusta datasta; (4) mathematics :458/:912 ja etusivu :44/:53.

---

## 3. Sivilisaatiosivut (agentti 1; 7 sivua, 13 Python-moduulia, 453 sivilisaatiotestiä vihreä)

### 3A Political / moral / r-K (patokratia, pathopolites)

- **[P0] patokratia § Political Pathology** — `patokratia/page.tsx:15` — SITE: "BioCap … 1.0 (fully intact) to 0.0 … pathologization index = 1 − (BioCap / BioCap_baseline)" (teksti lisätty 2.9. aamulla) — MODEL: max 0,90; patologisaatio = 7-ulotteisen orientaatioprofiilin (hierarchy acceptance, threat sensitivity, novelty seeking, time preference, cognitive complexity, group conformity, empathy scope) RMS-etäisyys `_natural_profile()`:sta (`political_biology.py:688–712`); 1 − 0,514/0,855 = 0,399 ≠ 0,369 — FIX: määritelmä koodin mukaan.
- **[P0] patokratia § In-Group Loyalty Collapse** — `:125` — SITE: "Testosterone degrades fastest (59%), followed by oxytocin (46%), then BDNF (28%)" — MODEL: amish→urban_office: **MEL 62,1 %**, T 58,9 %, OXT 46,0 %, DA 40,8 %, BDNF 28,2 % (`environment_biomarkers`); sama virhe `political_biology.py:1226–1229` kommentissa — FIX: "Melatonin (62 %) and testosterone (59 %) degrade fastest, then oxytocin (46 %), dopamine (41 %), BDNF (28 %)".
- **[P0] patokratia § Collapse Hierarchy** — `:83` — SITE: "T — the most EMF-sensitive major hormone" — MODEL: MEL — FIX: "second-most degraded after melatonin".
- **[P1] pathopolites § How the pathopolites emerges** — `pathopolites/page.tsx:99` — "T + DA are the most EMF-sensitive" → "T and MEL; DA follows OXT".
- **[P1] pathopolites § Six dimensions (scale note, lisätty 2.9. aamulla)** — `:25` — "1 represents maximum measurable degradation in any observed environment" → indeksi = 1 − capacity_formula ilman normalisointia havaittuun maksimiin (`political_biology.py:1740–1894`) → "1 represents total loss of substrate capacity".
- **[P2] pathopolites** — `:61` — "12.3×" → 0,4801/0,0394 = **12,2×**.
- **[P2] patokratia § r/K trait table** — `:109` — "OXT × T" → `rk_group_loyalty` = OXT × (0,50 + 0,50 T) × (1 + 0,1 CORT) × 0,80 (`:1057–1058`).
- **[P2] patokratia § Welling/Alogaily** — `:47, :83` "Welling 2025" vs `:217`, `patokinesis:322,360` "Alogaily, Zak et al." — sama N = 136 RCT kahdella nimellä; ei rekisterissä — FIX: yksi tekijämerkintä + rekisterimerkintä DOI:lla.
- **[P2] patokratia § Ideology** — `:32–33` — Populism "high", Libertarianism "variable" — malli ei luokittele mitään ympäristö×vuotta 2025–2055 populismiksi; libertarismi primääriksi vain rural 2055 (0,336).
- **[P2] patokratia FI** — `:229, :304, :308` — FI:stä puuttuu BioCap-määrittelylause; `sCollapseFormulaKey`, `sRKScaleNote` tyhjiä → englanti renderöityy suomenkieliselle sivulle.

### 3B Patokinesis

- **[P1] § Signal & Sink Gradient** — `patokinesis/page.tsx:147–149` — COPY-avaimet `s6title`, `s6lead`, `s6envLabels` olemassa, **ei JSX:ää**; `signal_degradation_gradient` (morphological 0,946→0,464, dynamic 0,938→0,370, cryptic 0,944→0,364, obesity_amplification 0,002→0,367, perception 0,951→0,469, pair compound 0,930→0,331) ja `behavioral_sink_gradient` (normative 0,011→0,318, capture 0,026→0,291, sterilization 0,005→0,222, sink 0,013→0,271) eivät näy — FIX: renderöi taulukot § Five Channels of Predation -osion jälkeen.
- **[P1] § Five-Way Equation** — `:75–79` — "T × DA × (1 − CORT)"; "OXT × (1 − CORT) × T"; "DA × T × BDNF × MEL" — koodi: T·DA·(1 − 0,4 CORT); OXT·(1 − 0,3 CORT)·(0,5 + 0,5 T); perception = 0,45·DA(0,6 + 0,4 T) + 0,35·BDNF(0,7 + 0,3 MEL) + 0,20·T; yhdistelmä = tulon 5. juuri (`political_biology.py:2162–2211`).
- **[P1] § Social Transmission Channels** — `:230, :239, :248, :257` — kaavat poikkeavat koodista (`:3755–3871`: (0,3 + 0,7 CORT); (0,3 + 0,7 cog_frag); 0,6·dd·mc·(0,3 + 0,7 el) + 0,4·capture·dd·mc; (0,3 + 0,7 victim)); `:221` täsmää.
- **[P1] § Cross-Country Validation** — `:275–313` — vain laadulliset "fit"-tunnisteet; `cross_country_comparison(2025)` antaa EMF-indeksin, ennusteen ja toteuman: Singapore 0,764 / 0,65 / 0,87 (virhe 0,22), S-Korea 0,753 / 0,68 / 0,75 (0,07), UK 0,745 / 1,07 / 1,44 (0,37), Suomi 0,715 / 1,06 / 1,25 (0,19), USA 0,707 / 1,12 / 1,62 (**0,50**), Ruotsi 0,683 / 1,14 / 1,45 (0,31), Japani 0,671 / 0,87 / 1,15 (0,28), Ranska 0,622 / 1,25 / 1,61 (0,36), Puola 0,532 / 0,88 / 1,14 (0,26), Unkari 0,494 / 0,83 / 1,41 (**0,58**) — mallin suurimmat virheet eivät näy — FIX: 10-rivinen taulukko.
- **[P2]** `:279, :309` S-Korea 0,72 → **0,75 (2024)**; Unkari 1,23 → 1,25 (2010); `:197` Japani 1,20 vs `:291` 1,15 → 1,15; `:840` `generateMetadata` ilman `openGraph` (muut 6 sivua palauttavat).

### 3C Patopolis

- **[P0] § IQ Shredder** — `patopolis/page.tsx:336, :376` "Singapore TFR 0.78", `:380` "0.97 (2023)", `:545` "0.87 (2025)" — `COUNTRY_PROFILES` singapore 0,87 (2024) — kolme arvoa yhdellä sivulla.
- **[P1]** `:336` "testosterone ~40%, oxytocin ~46%" — 46 % tulee gradientista, jossa T = −59 %; ~40 % on Santin sekulaarilasku (eri suure).
- **[P2]** `:38, :545` S-Korea 0,72 → 0,75; "1.19 → 0.72" → 1,23 (2010) → 0,75 (2024); Unkari 1,39 → 1,41 (2024); `:246` n = 333 vs `:139`/`pathopege:157,1325` n = 220; `:263` 264 625 vs `:548` 322 814 (CCB-psykiatrinen evidenssi); T-perustasot viisi eri arvoa (`:89` 550, `:274` 600→350, `:286–288` 500→320, `patokinesis:33` 500→300, JSON 600→440); `:128` "Each prediction is grounded in RCT evidence" — ennusteet 9–12 eivät.

### 3D Patopoliteia (historiallinen kerros)

- **[P0] § Migration Gradient + § Last Barbarian + kartta** — `patopoliteia/page.tsx:54, :58`; `MigrationGradientMap.tsx:38, 98, 108, 118, 396` — SITE: SSA korkein (kartta SSA 0,88, W-Eur 0,11, US 0,08), "converge toward European levels by ~2070–2080" — MODEL: `biocap(2025, lat)` SSA 0,596 (matalin), W-Eur 0,802 (korkein); `biocap_gradient("Sub-Saharan Africa","Western Europe",2025)` = +0,206 ("positive = destination has higher BioCap", `migration_gradient.py:65–69`); 2080: SSA 0,509, W-Eur 0,759 (ei konvergenssia). `REGIONS.current_biocap_estimate` (SSA 0,72, W-Eur 0,35) on käsin kirjoitettu ja vastaa sivun järjestystä mutta ei `biocap()`:ta. **Päätös D2.**
- **[P0] § Three Historical Laws** — `:62–63` — L1 "low-χ zone (25–35°N)", L2 "high-χ latitudes (45–60°N)" — `chi_latitude(30) = 0,752 > chi_latitude(52) = 0,466` (`chi_map.py:43–65`): etumerkki päinvastainen; myös `lib/evolutionData.ts:348, 362` ("Northern Europeans evolve the highest biological χ") ristiriidassa `chi_map.py`:n kanssa. Päätös D2.
- **[P0] L3** — `:64` — "rise events solar = 0.41 vs peak events = 0.73" — keskiarvo `solar_activity(EMPIRES.start)` = 0,410 ✓, `peak_year` = **0,493**.
- **[P1] L1** — `:62` — "Confirmed: p = 0.01" — mikään `berm/civilization/`-funktio ei laske p-arvoa tai syntymäaluetestiä; `EMPIRES`-leveysasteet 33–52°N.
- **[P1] § Before/After Electrification, § Expansion (β)** — `:51, :63, :163` — "Eight of ten major European renaissances" — `RENAISSANCES`: 10, joista 4 aasialaista; "sisällä tai ≤80 v minimin jälkeen" toteutuu 8/10 globaalille listalle; paketin oma metriikka `renaissance_solar_correlation()["fraction_near_minimum"]` = **0,4**, `positive_solar_slope_fraction` 0,7, keskietäisyys 50 v.
- **[P1] § Prophets (Glubb)** — `:31` — "250-year lifespan ≈ Suess (200) + inertia (50)" — `empire_lifespan_distribution()`: mean 430,8, **median 376,5**, n = 20; `suess_cycle_match()` fraction_within_1sd 0,65, rayleigh_r 0,163; `SUESS_PERIOD` = 208 — mallin omat tilastot eivät näy.
- **[P1] § Expansion (α)** — `:153, :156` — "Mongols 1206 … Solar maximum + nomad" — `solar_activity(1206)` = **0,072** (minimi); 632 = 0,731; 793 = 0,554.
- **[P1] BioCap-kaaviot** — `BiocapCivilizationChart.tsx:16–23, 32–41` — synteettiset käyrät (`1 − (1 − final)·t^(1+2χ)` + sini), "Rome 976 yr, chi 0.987" vs `EMPIRES` Rooma 503 v, `chi_latitude(42)` = 0,593; alaviite "Model-derived values from BioCap integral" synteettisten käyrien alla.
- **[P1] § Formula terms** — `:45, :49` — "σ(τ) = min(E(τ)/E_max, 0.95)"; "α … calibrated to renaissance timing" — koodi: `sigma()` = 0,95/(1 + e^(−0,045(t − 1960))) (`biocap.py:104–109`); `ALPHA = 0,3` vakio; koodi jakaa nettomuutoksen integrointivälillä (`:163–164`), mitä kaava ei näytä.
- **[P2]** `:22` "Eleven thinkers" vs 9 riviä (Haidt, Swan, Twenge puuttuvat; `evidence/historical-convergence:19–89` listaa 11); `:55` "converges within 1–2 generations" vs `:194` "BELOW native — sub-assimilation"; `:142–143` x-akseli "Ā_geo + Ā_infra + Ā_EMF" ja `sActivationChartXNote` (lisätty 2.9. aamulla) määrittelevät termejä, joita ei ole koodissa — stressori on S(τ) + U(τ) + E(τ) (`biocap.py:154`); `civilization/page.tsx:38` "210-year Suess" vs `:31, :39` 200 vs koodi 208; `civilization/page.tsx:28` "Twelve testable predictions and fourteen projections" vs patopolis-otsikot; FI tyhjät `sSolarFormulaNote`, `sCulturalBioWeightNote`, `sCulturalPhasesNote`, `sActivationChartXNote` (`:249, :283, :307, :343`).

### 3E Pathopege

- **[P1] § Triple Lock (RCT-taulukko)** — `pathopege/page.tsx:42, 133–160, 1319–1325` — "Audience 2020", "Parochial 2015", "Competition 2024" tutkimusniminä; Nave 2018, Carré 2017 — yksikään ei `references_full.json`:ssa; vain `dreher2016`, `goetz2024` kantavat `referenceId`:tä.
- **[P2]** `:207` "2024 meta-regression (Santi)" vs `:44` santi2025; `:207` "0.8–1.3 % annually" vs `patopoliteia:85` "1.2 %/yr" vs `patokinesis:303,357` "−1.2 %/year (Travison 2007)".

### 3F Mekanismikehystys (VGCC vs. B-polku) — päätös D3

Vain kaksi lausetta koko kerroksessa nimeää primäärin polun (`pathopege:217` "pathway B … melatonin arm"; `patopolis:514, 558` "Ca²⁺/CRY"). VGCC-only-lauseet ja minimikorvaukset (ilman hedgejä): `civilization/page.tsx:13, :23`; `pathopege:16, :20, :38, :177, :1053, SVG :1229`; `patokratia:93, :125, :136`; `pathopolites:98`; `patokinesis:87, :96`; `patopolis:16, :300`; `patopoliteia:203`; `political_biology.py:826–828, :908–909, :952–953, :2513`; JSON `berm_mechanism` `:409, :430, :451, :492, :512` (vain `:472` melatoniini mainitsee CRY:n). Esimerkki: `pathopege:16` "EMF activates voltage-gated calcium channels. Calcium floods the cell." → "EMF perturbs the cryptochrome radical pair, suppressing melatonin and disinhibiting the HPG axis (pathway B); calcium-channel activation (pathway A) amplifies the cascade."

### 3G Viitteet

- 92/133 sukunimi+vuosi-viittausta ilman rekisterimerkintää (täysi lista agentin raportissa; mm. Haidt 2012, Graham–Haidt–Nosek 2009, Gelfand 2011, Harrington & Gelfand 2015, Petersen 2013, Oxley 2008, De Dreu 2010/2011, Kosfeld 2005, Durkheim 1897, Campbell & Manning 2018, Vico 1725, Spengler 1918, Toynbee 1934, Sorokin 1937, Ibn Khaldun 1377, Usoskin 2007, Clette 2014 [nämä kaksi siteerataan `solar_reconstruction.py:6–8`], Spandrell 2013, Land 2014, McClure 2004).
- Rekisterissä olevat, sivilisaatiosivuilla siteeraamattomat: `calhoun1962`, `unwin1940`, `dekkers2019_dual_hormone`, `dualhormone_meta2018`, `mehta2015(_v2)`, `terburg2013`, `us_lfp_2026`, `eisenberg2008_drd4_ariaal` (kuuluu patokratia § r/K dopamiini), `adee2023`.

### 3H Verifioitu OK (agentti 1)

Patokratian ympäristö-, moraalilaajuus-, romahdusjärjestys-, distress-, r/K- (25 alapiirrettä), lojaalisuusromahdus- (30 solua) ja policy-taulukot; pathopolites 6 dimensiota, komposiitti 0,089/0,581/6,5×, `GRADIENT_DATA` 35 solua; patokinesis BIS- ja transmissiogradientit (50 solua), komposiitti 0,003→0,377; patopolis IQ-shredder 30 solua, 9,8×; pathopege RCT n = 1 297, kaikki `[[ref:]]`- ja PMC-tokenit ratkeavat; patopoliteia BioCap-integraalin kaava = `biocap.py:8–11`, jaksot 11/88/~200, painotaulukko = `BIOMARKER_WEIGHTS`, "rise events 0,41", Spörer/Maunder/Dalton/Modern 2020–2053 = `GRAND_MINIMA`.

---

## 4. Datapeilit (`lib/`, `data/`, `public/data/`) — aliagentti B

Regenerointi scratchpadiin, ei repo-kirjoituksia. **Bittitarkasti ajantasaiset:** `cohortAsfr.json`, `predictionSeries.json`, `sentinelCascadeSeries.json`, `global_panel_summary.json` + `global_panel.csv`, `classificationTable.json` ≡ `docs/audit/CLASSIFICATION_TABLE.json`, `causal-graph.json` topologia (35/74/7) ≡ `CAUSAL_NODES`, `falsification_v19_1.json` T1/T3/T7-numerot, `solar_bandpass.json` TFR-sarjat (576/576 = WB). `export_explorer.py` ja `export_asfr.py` kirjoittavat suoraan `website/public/data/`:iin ilman ulostuloargumenttia; kohteet `explorer.json`/`asfr_cohort.json` eivät ole olemassa eikä mikään viittaa niihin.

- **[P0] `lib/channelGroups.ts:5–6, 10–11`** — ELF "f < 1 kHz", IF "1 kHz – 1 MHz" → `three_channel.py:7–9, :42, :57`: ELF < 300 Hz, IF 300 Hz–1 MHz.
- **[P0] `lib/channelGroups.ts:5, :7` (fi :10, :12)** — ELF `pathways: ["A","D","E","F"]`, RF `["B"]` → `three_channel.py:177, :190`: ELF `["B_RPM_CRY","HPA_HPG"]` → ["B","D"]; RF `["A_VGCC_ROS","B_RPM_CRY","HPA_HPG"]` → ["A","B","D"]; IF `IF_MITOTIC_DISRUPTION` ✓.
- **[P0] `lib/thresholdModel.ts:59–60`** — USA `tDeclinePct: 1.0` → `two_level_model.py:57–61` `_DECLINE_RATE = 0.012`; `v16.py:832, :902, :926` → **1.2**.
- **[P0] `data/causal-graph.json:11, 21, 31, 61, 71, 81, 111, 201, 221, 251, 271, 341, 351`** — `"calibration_status": "calibrated"` 13 solmulla → `causal_registry.py`: `proxy_only` (:66), `requires_matched_measurement` (:76), `requires_psd_measurement` (:86), `structural_only` (:131, 141, 158, 203), `requires_endpoint_calibration` (:270, 290, 326), `requires_partner_distribution` (:346), `observed_wpp_anchor` (:452, 462); yksikään solmu ei ole "calibrated" — FIX: Python-statukset sellaisenaan + `causal-graph.schema.json:53–56` enum.
- **[P0] `public/data/sentinel_registry.json:6–8, 209–218`** — `pearson_r 0.909, r_squared 0.826, n 7` kuudella datapisteellä → 6 pisteen r = **0,717** (r² 0,513); `fit_gradient()` 7 lajilla r = 0,842, r² 0,710, p = 0,017 (`cross_species_gradient.py:95–147`; 0,909 on vanhentunut docstring `:5`). Sama 0,909 etusivulla ("r = 0.909 (7 species, p = 0.005)").
- **[P0] `berm_cultural_energy_model.json`** — ks. osa 2.
- **[P1] `public/data/falsification_v19_1.json:5, 230–260, 308–312`** — `tests_total: 8`, T8 "Access threshold prediction", 10 matriisiriviä → `TEST_REGISTRY` T1–T7 (`falsification_v19_1.py:46–135`), `tests_total` = 7 (:450), matriisi 9 riviä; testit `test_falsification_v19_1.py:80, :98` odottavat 7 — päätös: lisää T8 koodiin tai poista JSON:sta.
- **[P1] `lib/thresholdModel.ts:33, 51, 153, 168, 66, 82, 182, 195, 97, 112`** — "2024 TFR" 1,26 / 0,72 / 1,62 / 1,20 / 1,55 = WB **2023**-arvot; WB 2024: 1,25 / 0,748 / 1,6265 / 1,15 / 1,47 (`predictionSeries.json`); `V12_ACTUAL_TFR_2024` Suomi 1,32, USA 1,64, Israel 2,87 (`countries.py:814–834`).
- **[P1] `sentinel_registry.json:31, :127`** — dog `lag_years 3` → `species_data.py:39` 1,0; human_tfr 5 → 4,0 (`:60`); bee→TFR optimilag 2 (`csli_empirical.py:46`).
- **[P2] `public/data/solar_bandpass.json:153–154`** — geomagneettiset leveysasteet SE 62,5 / NO 66,5 / DK 56,5 / ES 40,0 / GR 36,0 / BR −22,0 → `COUNTRY_GEOMAG` (`v16.py:1767–1785`) 62,0 / 65,5 / 58,0 / 43,0 / 37,5 / −15,0.
- **[P2] `data/causal-graph.json:37, 57, 87, 117, 283`** — merkkijonot ("material-skin" vs "material–skin", "Ca²⁺" vs "Ca2+"…), vanhempien järjestys 7 solmulla, `prediction_role` uudelleenkartoitettu 35 solmulla → generoi `nodes` `CAUSAL_NODES`:sta.
- **[P2] `lib/thresholdModel.ts:30, 63, 94, 124, 150, 179`** — `cumulativeLoss2024` laskettu t₀ = 1980, kaavio piirtää `T0_YEAR = 1970` (`ThresholdExplorer.tsx:131`, `ThresholdChart.tsx:51`) → 47,9 / 41,9 / 36,9 / 41,9 / 55,8 / 47,9; `thresholdYear` (`:31, 64, …`) 2018/2030/2035/2035/2015/2018 vs kaavan 60-indeksin ylitys 2022/2031/2040/2031/2014/2022 (t₀ 1980).
- **[P2] `lib/thresholdModel.ts:161`** — S-Korea 2000 TFR 1,48 → `countries.py:362` 1,47; Israel-historia poikkeaa WB:stä ≤ 0,20 ilman lähdettä.
- **[P2] `lib/populationData.ts:408, 414`** — Amish "TFR 6.1" vs malli 6,5 (`countries.py:389`, `v16.py:1711`) vs `falsification_v19_1.json:155` "6.4–7.0"; `:451` Mennonite "4–5" vs `v16.py:1720` 4,0 / `countries.py:391` 2,8 / `evolutionData.ts:428` "3.5–4.5"; `:477, :516` USA 1,66 (= `USGeneral` kalibrointipiste `countries.py:392`) vs 1,62 (2024).
- **[P2] `lib/eyeColorData.ts:121–125`** — "pathways A (VGIC/TRPC1) and C (CRY/RPM)" → B; `evolutionData.ts:376, 409, 427, 445` "A+C balanced" peilaa `v16.py:1710–1728`, joka myös käyttää C:tä RPM:lle (**polkukirjainristiriita jatkuu Pythonissa**).
- **[P2] `lib/epistemicConstants.ts:3–19, 47–55`; `eyeColorData.ts:520–526`; `evolutionData.ts:1`** — kolme eri episteemisen tason sanastoa/väripalettia; `EpistemicLevel` 4 arvoa vs `types.ts:30` 6.
- **Ilman Python-lähdettä (käsin ylläpidetyt, validoimattomat):** `epistemicConstants.ts`, `researchDomains.ts` ("87.5%" ei esiinny missään `berm/`- tai `docs/`-tiedostossa), `vgccGeneFamily.ts`, `populationData.ts` (paitsi 4 TFR-pistettä), `evolutionData.ts` (paitsi `POPULATION_PROFILES` ≈ `POPULATION_CHI_PROFILES`), `eyeColorData.ts`, `channelGroups.ts` `PATHWAY_ORDER`, `sentinel_registry.json` rate-kentät, `solar_bandpass.json` `ssn`, `thresholdModel.ts` muut kuin USA, `claims.json` (kaikki id:t ratkeavat).

---

## 5. Artikkelit (aliagentti; 5 artikkelia + `lib/articles.ts` + `LatestArticles.tsx`)

- **[P0] `DualLockArticleContent.tsx:13` (FI :125)** — "testosterone down through the HPG axis (pathways A, C, D)" — kanonin mukaan HPG-reitti on B (RPM/CRY→melatoniini→HPG), C = BBB. Lause on koherentti vain `lib/causalChainData.ts:627/671/753/801/847` -skeemassa (A ROS, B CRY/RPM, C Melatonin, D HPA→HPG, E BBB) → **sivustolla elää kaksi yhteensopimatonta kirjainskeemaa**; rekisterin `pathway`-kenttä käyttää E-tagia 127 merkinnässä ja C-tagi on täytetty valosaaste/LED-merkinnöillä.
- **[P1] `ThirteenPhenomenaContent.tsx`** — 0 `[[ref:]]`-tagia 760 rivissä; 35 raakaa lähdemerkkijonoa (`:531–567`), ~135 linkittämätöntä tekijä–vuosi-mainintaa; vain "PMC10601200" (`:204`) linkittyy automaattisesti.
- **[P1] Väite/lähde-ristiriita** — `BeeArticleContent.tsx:29` (FI :92) "50 Hz electric fields reduce self-grooming" tagattu `wyszkowska_2025_bee_behavior`, jonka otsikko on "…EMF at 900 MHz on the Behavior of a Honey Bee".
- **[P1] `VK5a`** (`Thirteen:117`/`:351`) — tunnistetta ei ole missään muualla repossa.
- **[P2] Ristiriidat artikkelien välillä:** T-lasku −1,82 %/v (Lokeshwar, nuoret) vs 1,2 %/v vs 25 % vs −36 %; seksittömyys "doubled" vs 28 % → 38 %; miesten LFP 87 → 67 % vs 86 → 81 %; Lokeshwar sivut 886–889 vs 886–893; Varroa 1,6 mm vs `causalMapData.ts:767` 1,1 mm (linkittää samaan ankkuriin); geomagneettinen kenttä ~50 µT vs 25–65 µT; ionikanavien ikä "3 miljardia vuotta" vs siteerattu Zakon 2012 "first 800 million years"; mekanismien määrä 1 / 3 / 4; `vaziri2016` kahdella eri ensimmäisellä tekijällä; "24+ device categories" vs etusivun "24+ non-thermal mechanisms".
- **[P2] `components/LatestArticles.tsx`** on kuollutta koodia `main`-puussa (mountattu vain worktreessä `.claude/worktrees/suspicious-herschel-b36130`); `ART/page.tsx` prev/next käyttää taulukkojärjestystä, ei päivämäärää.
- **FI-erot:** kaikki numerot täsmäävät; Thirteen Phenomena FI pudottaa 8 väitettä/lähdettä (mm. Cogn-IQ 2026, Ostrin, LED-IF-lause, Frontiers-sitaatti katkaistu); "kiimankierto" (`:334`) → kuukautiskierto; useita kirjoitusvirheitä (`Bee:78, 90, 113, 114`; `DualLock:125, 158, 196`).
- Versiotunnisteita, lukittuja ennustearvoja tai polkuprosentteja ei esiinny artikkeleissa. SOC-1/2/3 määritelty `predictions/page.tsx:1510–1522` (lukittu 2026-08-25 = artikkelin julkaisupäivä).

---

## 5b. Etusivu, ennusteet, sentinel, about, objections, epistemology, navigaatio (agentti 3; raportti saapui rajan jälkeen)

Python: `config.LOCKED_PREDICTIONS` 8 riviä (Suomi 2030 1,08 [1,02–1,24] v17.1 … Global 2050 sperm 62 [48–75] v17.0, lukittu 2026-08-18); `falsification_v19_1.run_all_available()` → 7 testiä, 3 ajettu, [T2,T4,T5] pending; `cross_species_gradient.fit_gradient()` → r = 0,842, r² = 0,710, p = 0,0173, n = 7; `two_level_model.validate_usa_temporal()` → R² 0,947, n 18; `loocv_v16()` → RMSE 0,972, n 57; `CSLI_COLOSS_23` 20/23, r −0,272, p 0,006, lag 2 (korvaa `CSLI_31`:n lag-estimaatin 5 v). 92 reittiä, 1 566 testiä, 916 `[[ref:]]`-tagia ratkeavat.

**Etusivu**
- **[P0] `page.tsx:40` (FI :49)** "r = 0.909 · 7 species (p = 0.005)" → koodi: `fit_gradient()` r = 0,842, p = 0,017 (eri 7 lajin joukko); sivuston oma 6-rivinen taulukko (`sentinel/page.tsx:943–948`, `sentinel_registry.json` data_points) → r = 0,716; 0,909 on vain docstring (`cross_species_gradient.py:5`) ja `CODELLE_sentinellikandidaatit_v3.md`. Sama luku `sentinel:104,110,115,958`, `predictions:1488,1818`.
- **[P0] `:41`** "88% of US fertility decline explained by testosterone" → `validate_usa_temporal()` R² = 0,947 (n = 18); "88 %" ei esiinny koodissa.
- **[P0] `:43` (FI :52)** "13 / 20 physics-derived predictions already verified" → ei lähdettä missään; ennustesivulla 4 `verified: true`.
- **[P0] `BermMasterInfographic.tsx:40`, `ProxyMaskingInfographic.tsx:170`** "88% chronic animal studies positive" → `evidence/replication:802–820`: animal 92 % (11/12), chronic 92 % (12/13), **pulsed** 88 % (7/8).
- **[P1] `:44`** "0.648 … from 0.99 in 1950" → ks. osa 2. **[P1] `:99–100`** "n = 54, sd = 1.35, LOOCV RMSE 0.522, skill 0.61, K₈ 0.81, K₁₀ 0.71" → mikään koodi ei tuota näitä (vain `mathematics:383–403` ja CODELLE-docs). **[P1] `:20–34`** falsifikaatiokortti "8 tests" vs koodin 7 (T8 vain JSON:ssa). **[P2]** "56 intermediate steps" (:78) vs epistemology "16 verified layers" (:127) vs counter-evidence "56"; "24+ mechanisms" vs objections/devices "26 device categories"; "Twelve medications" vs navigation "14 drug classes"; "Levine 2023" → rekisteri 2022; `ProxyMaskingInfographic:11` "Eight explanations" vs 9 riviä; `SpeciesDeclineChart.tsx:4–30` käsin kirjoitetut sarjat ilman vuosia/lähteitä.

**Ennusteet**
- **[P0] `predictions/page.tsx:45`** "Status: CI EXCEEDED (observed ~1.30, upper bound 1.24)" → `predictionSeries.json` Suomi 2023 = 1,26, 2024 = **1,25**; `lib/predictions.ts:128` status "pending"; `PredictionTrack.tsx:218` sanoo saman kortin vieressä "The 2030 observation is not published yet."
- **[P0] `:46`** "CI RISK ZONE (observed ~0.80, upper bound 0.72)" → Etelä-Korea 2024 = 0,748.
- **[P0] `:9228, 9238, 9258, 1768, 9270–9288`** "260 Predictions · 33 Categories · 4 Verified · 256 Awaiting; 4/254/2" → laskettu: 248 id + 12 lukittua + 20 EVOLUTION = 280 renderöityä (276 uniikkia; plant-CRY-lohko :1727–1755 duplikoi `evolutionData.ts:848–917`), 39 osiota; 256 ≠ 254 + 2.
- **[P0] `:1355` T-TFR-2** "1.87 (2010) → 1.26 (2024), −4.5%/year … 1.26 × 0.955^8 ≈ 0.87" → (1,26/1,87)^(1/14) − 1 = **−2,8 %/v**; 2032 ≈ 1,00; 2024 = 1,25. **[P2]** T-TFR-2 falsifikaatio "stabilizes above 1.10" vs lukittu fi-2030 [1,02–1,24] — 1,15 vahvistaa toisen ja falsifioi toisen.
- **[P1] `:41`, `lib/predictions.ts:448,456`** "CSLI 31-country panel … 5±2 yr" → `CSLI_31_COUNTRY_RESULTS.note` "Superseded by CSLI_COLOSS_23" (23 maata, lag 2 v). **[P1] `lib/predictions.ts:380–488`** 12 lukittua ennustetta, `config.py`:ssä 8 — 4 sivustolla ilman koodirekisteriä (pseudo-SHA "csli_panel", "walker_integration"). **[P1] `FeedbackLoop.tsx:107–108`** base TFR 2030 = 0,542, 2035 = 0,459 vs lukittu kr-2030 0,61, kr-2035 0,54. **[P1] `:420, :716`** "If VGCC activation is the primary EMF transduction mechanism … entire BERM cascade must be reconsidered" → primer: A sekundaarinen (D3). **[P2]** kaksi eri "SLEEP-1"-ennustetta (:79–84 vs `predictions.ts:462–488`); "eight-layer modulome" (:48) vs navigation "12 layers"; "four-channel cascade" (:133) vs footer "Three-channel"; kaksi eri sentinel-herkkyysjärjestystä (:1668 vs SVG :9435–9457); MOD-2 "v18_mitochondrial_ros_amplifier()" (:479); FI-kopio pudottaa :1546/:1553/:1617 lauseet.

**Sentinel**
- **[P0] `SentinelCascade.tsx:101–112`** "Bats: lag 14 y (12–16), r = −0.310, p = 0.028, Lindecke 2026" → Lindecke 2026 on 30 min RF-suunnistuskoe (`sentinel:66–71`, `batNote` "does not study fertility"); lag-tilastoa ei ole koodissa.
- **[P1] `sentinel/page.tsx:25,33,37,42,80`, `SentinelCascade.tsx:40,60–94`** dog→sperm r = 0,505 p = 0,012; PECBMS r = 0,182 q = 0,00013; COVID +2,27 pp (24/35, p = 0,043); tropical S-band OR = 1,474; frog +0,040/dec; aphid 0,660; moth 0,298; toad 0,355 → **mikään näistä ei ole koodissa, reporteissa tai docseissa** (vain CSLI_COLOSS_23 ja CSLI_31). **[P1] `:66,70`** "May 2026 … Science 388: 977+" (vol. 388 = 2025); `lindecke2026` verified false. **[P1]** `sentinel_registry.json`: ei generaattoria; `sentinel_normalize.py:73` kirjoittaa `sentinel_readiness.json`:ia, jota ei ole. **[P2] `:104,110,958`** "6 species … 7 data points (human counted twice)" vs taulukon 6 riviä.

**About / history / README**
- **[P1] `about/page.tsx:76`** "The active model therefore makes no calibrated country-level TFR forecast." vs 12 lukittua ennustetta; sivu ei mainitse v19.1-poikkileikkausta, sivilisaatiokerrosta, poliittista biologiaa, Q-factoria, claim-protokollaa, 1 034 viitettä.
- **[P1] `about/history/page.tsx:12–18`** 7 merkintää, viimeinen "Cross-species lag signal (2026)"; puuttuvat v17.0→v17.1 kohorttilukitus (18.8.), päättelyprotokolla v1.0 + negatiivisten löydösten uudelleenluokittelu (20.8.), falsifikaatio v19.1 (21.8.), 54 maan poikkileikkaus, kolmikanava/Q-factor/modulome, sentinel-arkkitehtuuri (d004dc3), sivilisaatiomalli + claim-protokolla (7d722e5), poliittinen biologia (0e9fa79…2584b6f).
- **[P1] `README.md:56–64`** 7 riviä, `config.py` 8 (SouthKorea 2035 0,54 puuttuu); `berm/README.md` ei ole olemassa. **[P2]** `about/objections`, `about/replication` re-export-shimit tuottavat duplikaatti-URL:t.

**Objections**
- **[P0] `objections/page.tsx:293`** "anti-TRPC1 (blocks C-calcium)" → sama merkintä :291–292 ja TRPC1-1 (`predictions:410`) sijoittavat TRPC1:n polkuun B; C = BBB.
- **[P1] `:130–312`** ei merkintää C2:lle "WHO/ICNIRP evaluate cancer, not reproductive endpoints" (`counter-evidence:24–25`), Ca²⁺-universaaliusongelmalle (:44–51, vain epistemology) eikä "What WOULD refute BERM" -listalle; ei linkkiä `/evidence/counter-evidence`. **[P1]** ei sivilisaatiokerroksen vastaväitteitä (poliittisen orientaation biologinen determinismi, ekologinen virhepäätelmä, Amish-sekoittajat: endogamia, ruokavalio, valikoituminen). **[P2] `:1612–1622`** versiohistoria päättyy v17:ään. **[P2] docs** `REASONING_PROTOCOL_v1.md:46,48,52,124`, `CHANGELOG.md:12`, `DISCRIMINATING_TESTS.md:3,50`, `NEGATIVE_FINDINGS_REVIEW.md:67,111` sanovat "polku C (RPM)" (D5).

**Epistemology**
- **[P1] koko sivu** — kuutta sääntöä, kahdeksaa liukumavirhettä, polkuhierarkiaa ja premissimerkintöjä [JOHDETTU]/[EMERGENTTI]/[TUOTU]/[AVOIN] ei esiinny missään sivustolla; EN-protokollaa ei ole kirjoitettu (`CHANGELOG.md:28`).
- **[P1] `:64–67, :92, :122`** "VGCC is not the primary EMF target → the entire Ca²⁺ cascade collapses → BERM loses its core mechanism" → primer: B primääri; `objections:80` sanoo itse "The primary branch (pathway B / RPM…)" (D3).
- **[P1] `:197, :208`** "Welling 2025 (N=136)", "Petersen 2013, N=12k", "De Dreu 2011, N=280" ilman `[[ref:]]`-tageja ja rekisterimerkintöjä; "Alogaily"/"Zak" ei esiinny koko repossa. **[P2]** "30+ locked predictions" (:23, :96) vs 276; "16 verified layers" vs 56; "54-country R² = 0.851" ilman koodilähdettä.

**Navigaatio / CODELLE**
- **[P0] `lib/navigation.ts:377–381`** 531 → 1 034 (osa 6). **[P1] `:45–406`** kaikki 13 edellisen auditoinnin navigaation ulkopuolista sivua yhä ulkopuolella; orvot ilman yhtään sisääntulolinkkiä: `/explorer`, `/replication`, `/modulome/hippocampus`. **[P2]** staattiset kuvaajat "Three-level architecture, five routes", "12 layers, 12 target organs, 4 routes", "14 drug classes", "Nine low-EMF communities", "14 technology profiles" (:61, 73, 165, 280, 305, 341).
- **[P1] Etusivun CODELLE-ohjeet** (`etusivun_uudistus_DEFINITIVE`, `etusivu_visuaalinen_MASTER`, `hero_infograafi`, `bradford_hill_therabionic`): 3 DONE / 8 PARTIAL / **19 MISSING**; commit 3ccb521 poisti CODELLE-osiot ja d605cf2 palautti vain kaksi infografiikkaa; komponentit ilman yhtään importtia: `BradfordHillCard`, `TheraBionicProof`, `SparklineCard`, `LatestArticles`, `GlobalValidation`, `ThreeChannelSummary`, `BiocapSparkline`, `ThreePhaseIndicator`, `SentinelCascadeCompact`; `pending/`-kansiossa ei merkintää 19 suorittamattomasta [KOODI]-askeleesta (CODELLE-standardin vastaista).

**Puuttuvat integraatiot (agentti 3):** sivilisaatiokerroksen ennusteet (patokinesis PK-1…12 `:330–341`; patopolis CIV-1…14 `:388–496` ×5 lokaalia; pathopolites pred1–4; patokratia :170, :191; patopoliteia :128, :190; pathopege :173; epistemology :205–210) — **yksikään ei ole `predictions/page.tsx`:ssä, `lib/predictions.ts`:ssä tai `claims.json`:ssa**; ID-törmäys patopolis CIV-1 ≠ predictions E-CIV-1. `claims.json`: 7 väitettä, 0 sivilisaatio/poliittinen. Testosteroni→politiikka-RCT ilman rekisterimerkintää. `PredictionTrack.tsx:80–206` tukee `prediction.actual`-kenttää, mutta yksikään lukittu ennuste ei täytä sitä (2024-havainnot FI 1,25, KR 0,748, US 1,63, JP 1,15, BR 1,61, Global 2,19 vain kaaviolinjoina). Reprodusoitavat exportit puuttuvat: v19.1-poikkileikkaus (RMSE 0,522, R² 0,851, skill 0,61), hindcast K₈/K₁₀, sentinel-rekisteri ja -readiness, 8 sentinel-lag-tilastoa, cross-species-datasetti (koodi 0,842 vs rekisteri 0,716 vs väite 0,909).

**Verifioitu OK (agentti 3):** 8 jaettua lukittua ennustetta `config.py` ↔ `predictions.ts` (arvo, CI, vuosi, päivä, versio); `predictionSeries.json`, `sentinelCascadeSeries.json` bittitarkasti ajantasaiset; T1/T3/T7 tulokset; CSLI-luvut sentinel/about/history/SentinelCascade = `CSLI_COLOSS_23`; Nike-radar −0,526 vs +0,096 %/v, p 0,031, ρ 0,088, N 1 381 toistuu `NikeBBSScatter.tsx:5–15`:sta; `PulseProfile` 24,5 V/m, 0,037, 671:1; polkupainot A 45 / B 25 / D 15 = `pathways.py:14`; epistemologian Zapffe/kontingenssi-arvot toistuvat `political_biology`:sta; sukupuolisuhde 0,512 → 0,509; D1–D3 = `DISCRIMINATING_TESTS.md`; luokittelutaulukko 13/6/5/2/0/5/4/5; viite- ja footer-laskurit lasketaan livenä (1 034); FI-kopio numeerisesti EN:n mukainen näillä sivuilla.

---

## 6. Sivustonlaajuiset ristiintarkistukset (pääsessio)

| Aihe | Sivusto | Kanoninen | Toimenpide |
|---|---|---|---|
| Viitemäärä | `lib/navigation.ts:377–381` "531 peer-reviewed sources" (5 kieltä) | `references_full.json` metadata: 1 034 (373 varmennettua, 378 linkitettyä, 656 linkittämätöntä, generoitu 2026-08-31) | **P0**: johda luku metadatasta buildissa |
| Testosteronin sekulaarilasku | −1 %/v: evidence-indeksi, model, predictions, `lib/causalChainData.ts:808, 810, 1101, 1102, 1107`, `mathematics:175` ("Travison's −1%/year"; s5d5 johtaa −1,3 %); −1,2 %/v: patokinesis, evidence/testosterone, ExplorerDashboard, `patopoliteia:85` | `v16.py:832, 902, 926` "1.2%/yr"; `travison2007_v2` finding "1.2%/yr 1987–2004"; `deroose2023` (1 − 0,012)^(v − 1982); `santi2025` n = 1 064 891 | **P1**: −1,2 %/v kaikkialla; s5d5:n johdettu −1,3 % voi jäädä, jos se nimetään mallin r₂:ksi |
| Amish-TFR | 6,5: etusivu `page.tsx:70`, mathematics, `evolutionData.ts:410`, `TechnologyGradientChart`, `ThirteenPhenomena:152`; 6,1: `ProxyMaskingInfographic`, `populationData.ts:408`, model, predictions | `countries.py:389` OldOrderAmish tfr 6,5 = kalibrointipiste (bioCap a = 6,5); viitteet Anderson 2025 "≈ 6,1 (2014), 6,9 (1924)", Stone 2025 "~6,1" | **P1**: "≈ 6,1 (2014)" havaintona; "6,5" vain mallin kattoarvona nimettynä |
| Siittiölasku | 62 % (pathopege, patopolis, DiseaseCascadeTimeline), 51 % (devices, causalChainData), 52,4 % (Levine 2017), 50 % (reproductive-arc, triple-strikes), 1,16 → 2,64 %/v | Levine 2017: konsentraatio −52,4 % 1973–2011 (länsi); Levine 2022/23: konsentraatio −51,6 %, kokonaismäärä −62,3 % 1973–2018 (globaali); kiihtyminen 1,16 → 2,64 %/v | **P2**: nimeä suure (konsentraatio vs kokonaismäärä) jokaisessa kohdassa |
| "BioCap" | kolme konstruktiota samalla nimellä: v16-`bioCap` (TFR-putki, mathematics), `political_biology`/`cultural_energy` BioCap (0,514) ja orpo JSON (0,648) | — | **P1**: nimeä konstruktio ("BioCap (biomarker composite, max 0.90)" vs "bioCap (TFR pipeline)") |
| Versiotunnisteet | `app/layout.tsx:35` "BERM v17 research model"; `SiteFooter.tsx:14–42` "BERM v17 · …"; model/mathematics/predictions sekoittavat v17, v17.0, v17.1, v19, v19.1 | `berm/__init__.py:1–11`: 0.19.x = Python-kirjasto, "public model specification on the website is v17", ASFR-exportit v18.0-asfr — "independent release cadences" | **P2**: politiikka on dokumentoitu, mutta ei lue sivustolla — lisää lause about/history-sivulle ja footerin tooltipiin |
| Tuotanto vs työpuu | tuotanto deployattu 07:00; sen jälkeen rinnakkainen sessio on korjannut renderöintivikoja ja generoinut `civilization_indices.json`:n | — | seuraava deploy vasta korjausten jälkeen; `git status` ennen deployta (muisti `berm-deploy-ahead-of-git`) |

---

## 7. Mallin ominaisuudet ilman sivuedustusta (`berm.civilization`, 190 vientiä)

| Vienti | Elävä arvo | Kohdesivu § osio |
|---|---|---|
| `orientation_profile` / `DIMENSION_FUNCTIONS` (7 dimensiota) | hierarchy_acceptance 0,924→0,275, threat_sensitivity 0,058→0,664, cognitive_complexity 0,964→0,544 | patokratia § Political Pathology — patologisaatioindeksin määrittelevät dimensiot eivät näy |
| `IDEOLOGY_PROFILES` ehdot | `political_biology.py:542–631` | patokratia § Ideology |
| `signal_degradation_gradient`, `behavioral_sink_gradient` | ks. 3B | patokinesis § Signal & Sink Gradient (COPY olemassa, JSX puuttuu) |
| `calhoun_phase`, `calhoun_phase_indicators`, `calhoun_recovery_potential` | amish B, rural C, suburban/urban D; recovery 0,838→0,067 | patokinesis § Behavioral Sink (vaiheet kuvattu, ei sidottu ympäristöihin) |
| `bioleninist_loyalty_value`, `institutional_competence_decay`, `bioleninist_ratchet_index` | 0,040/0,001/0,010 → 0,479/0,139/0,302 | patokratia § Loyalty Collapse (ratchet) |
| `reproductive_behavior_spectrum`, `effective_fertility_index`, `prenatal_disruption_index`, `endocrine_sexual_disruption_index` | normal 0,951→0,362; eff. fertility 0,957→0,526 | patopolis § Multiplicative fertility collapse |
| `wolbachia_*`, `sacculina_*`, `baculovirus_*`, `disoperator_*`, `cooperative_group_integrity` | 0,001/0,006/0,013/0,028/0,939 → 0,073/0,132/0,178/0,952/0,148 | patokinesis § Social Transmission (parasiittimallit) |
| `civilizational_sink_*` (16 fn) | 0,049→0,491 | patokinesis synteesi |
| `transmission_resistance` | 0,924→0,030 | patokinesis § BIS (sarake) |
| `COUNTRY_PROFILES`, `country_emf_index`, `country_predicted_tfr`, `cross_country_comparison` | ks. 3B | patokinesis § Cross-Country Validation |
| `policy_vulnerability_profile` täysi matriisi | esim. suburban immigration 0,590 | patokratia § Policy Vulnerability (vain Amish/Urban näkyy) |
| `get_trajectory`, `TREND_DATA` (logistiset parametrit `biomarker_trajectories.py:23–72`) | — | patopoliteia § BioCap Trajectory |
| `EMPIRES`, `EXTENDED_EMPIRES`, `empire_lifespan_distribution`, `lifespan_histogram_bins`, `suess_cycle_match`, `empire_solar_overlap` | median 376,5; rayleigh 0,163; Ottoman minimum_fraction 0,409 | patopoliteia § Prophets — "Suess cycle test" |
| `GRAND_MINIMA`, `RENAISSANCES`, `renaissance_solar_correlation` | 6 minimiä (Modern 2020–2053); 10 renessanssia; 0,4/0,7/50 v | patopoliteia § Electrification |
| `REGIONS`, `biocap_gradient`, `gradient_matrix`, `migration_pressure` | SSA→W-Eur pressure 0,374 | patopoliteia § Migration Gradient (kartta käsin kirjoitettu) |
| `chi_latitude`, `chi_electrification`, `chi_total` | χ_total 2025 Japani 1,22, W-Eur 0,94 | patopoliteia § Three Laws / kaavan termit |
| `biocap`, `biocap_series`, `sigma`, `electrification_proxy`, `urbanization_proxy`, `ALPHA` | σ(2025) 0,902, E 0,791, U 0,836 | patopoliteia § BioCap-kaava (ei laskettua sarjaa) |
| `moral_distress_index.harm_hyperactivation` | 0→0,059 | patokratia § Mental Health Prediction |

---

## 8. CODELLE-ohjeiden tila (sivilisaatio)

- `BERM_CODELLE_civilization_DEFINITIVE.md`: kaikki [KOODI]-osiot DONE (johdanto, häiriötaulukot [siirretty pathopegeen; evidenssisarakkeet poikkeavat ohjeesta], kyberneettinen malli `patopolis:302–317`, aikapreferenssi `:319–327`, ristiviittaukset, episteeminen huomautus) — **MISSING**: linkit modulome-elinsivuille miltään sivilisaatiosivulta.
- `BERM_CODELLE_yhteiskunnalliset_seuraukset_MASTER.md`: 4.2 SOC-1/2/3 DONE; 4.3 Dual Lock -artikkeli DONE; V viitteet DONE (`dual_hormone_meta2021` linkStatus pending); 4.1 `<DualLockDiagram/>`/`<SocietalTrends/>` PARTIAL (komponentteja ei ole); III trendit 3.2 miesten LFP, 3.7 Konrath −40 %, 3.8 puristusvoima −20 % ja 2.2 "47 %" **MISSING sivilisaatiosivuilta** (vain artikkelissa).
- `BERM_pohjoinen_paketti_historiallinen_selitysvoima.md`: ei sivilisaatioreittejä; sen χ-semantiikka (Pohjois-Eurooppa = korkein χ, `evolutionData.ts:348, 362`) on ristiriidassa `chi_map.py`:n kanssa (D2).

---

## 9. Edellisen auditoinnin (2026-08-25) kohteet — tila tämän auditoinnin alueella

| # | Kohde | Tila |
|---|---|---|
| Top-1 | Behavioral factor 4 vs 5 hormonia | **EI TARKISTETTU** (model/mathematics-agentti kaatui) |
| Top-3 | Model-sivun solmu/reunaluvut | **EI TARKISTETTU**; kanoninen graafi on nyt `data/causal-graph.json` 35/74/11 (AGENTS.md), eli aiempi 63/107 on sekin vanhentunut |
| Top-4 / §2.3 | Viiterekisterin laatu | AVOIN ja suurempi: 587 → 1 034 viitettä, 656 linkittämätöntä, 92 sivilisaatioviittausta rekisteröimättä |
| Top-6 / §4.3 | Polkukirjaimet B/C | AVOIN: `SESSION_PRIMER.md:18` B = RPM, mutta `REASONING_PROTOCOL_v1.md:46, 52, 124` "polku C (RPM)", `v16.py:1710–1728`, `eyeColorData.ts:121–125`, `evolutionData.ts:376–445`, `DualLockArticleContent.tsx:13`, `causalChainData.ts` 5-kirjaiminen skeema; `pending/…polkukirjaimet…_DONE.md` kirjaa "ei korjata nyt" |
| §8.3 | Ei kanonista versionumeroa | AVOIN, mutta politiikka dokumentoitu `berm/__init__.py` (osa 6) |
| §6.3 | EN/FI täydellisyys | OSITTAIN: sivilisaatiosivujen FI-stubit tyhjiä 12 avaimella; JA/FR/KO otsikkostubeja + `TranslationNotice` |
| §9.3 | OpenGraph | KORJATTU 6/7 sivilisaatiosivulla; AVOIN `patokinesis:840` |
| §3.2 | Rikkinäiset ankkurit | KORJATTU sivilisaatioalueella (`patopoliteia:1159` → `patopolis#twelve-predictions` olemassa) |
| §7.3 | tsc 0 virhettä | KORJATTU 2.9. aamulla (24 → 0) |
| §9.2 | robots/sitemap | KORJATTU (`app/sitemap.ts`, `robots.txt` buildissa) |

Renderöintiviat tuotannossa 2.9. klo 07–10 (DOM-varmistettu): raa'at `[[ref:]]` unbroken-chain 17, allergy-epidemic 1, pathopege 1 (`/map` ja `/objections` 0 — curl-laskurit laskivat RSC-payloadin); tyhjät elementit patokinesis 6 (ja), patopoliteia 8 (ja), evolution 4 (kaikki kielet: MAST-SOLAR-1, MAST-RF-1, PLANT-CRY-RF-1, MAST-SOIL-B2-1 ilman `falsification_*`-kenttiä — ehto lisätty, **sisältöpuute jää**). Kaikki korjattu työpuussa 10:14–10:21 (rinnakkainen sessio); paikallinen dev: 0/0.

---

## 10. Auditoimatta jääneet alueet (API-sessioraja 429, "resets 2:30pm Europe/Helsinki")

| Alue | Tila | Mitä ajetaan |
|---|---|---|
| model, model/math, model/fieldstate(+/math), model/q-factor, mathematics, data, explore, explorer, map, ecology + `causalMapData/causalAtlasData/causalChainData` | agentti kaatui kesken (oli jakamassa 23–492-lohkoa) | kaavat vs `v16.py`/`config.py` (behavioral factor 4 vs 5), parametrit, solmuluvut vs `causal-graph.json`, FieldState-numerot, polkuhierarkia |
| evidence-indeksi + 25 mekanismisivua | kaatui; ehti todeta "two in-scope files changed mid-audit" | numerot vs viitemerkinnät, rekisterikattavuus, `docs/analysis`-katsausten integraatio, T-sivu vs sivilisaatiosivut |
| evidence 19 epidemiologia/ekologia/historia-sivua | kaatui heti inventaarion jälkeen (~11 500 riviä) | countries.py/cohorts vs sivut, counter-evidence vs `NEGATIVE_FINDINGS_REVIEW` + `CLASSIFICATION_TABLE` (F04 Nike-BBS → underdetermined), Nike-BBS-esiintymät |
| modulome (14 sivua) | kaatui (Part B valmistui) | elinketjut vs `biology/*`, puuttuvat elimet (SCN, pineaali, munasarja, istukka…), testes-sivu vs T-narratiivi |
| home, predictions, sentinel, replication, about/*, objections, epistemology, navigaatio | **VALMIS** (raportti saapui rajan jälkeen; ks. osa 5b) | — |

Nämä ajetaan uudelleen rajan nollauduttua samoilla tehtävänannoilla (tallennettu tähän sessioon).

---

## 11. Päätöstä vaativat kohdat

- **D1 — BioCap-katto 0,90 vs kynnykset** (osa 2.3): (b) kynnykset × 0,9 [suositus] / (c) nykyiset kynnykset, länsi zoistinen 2020– / (a) normalisointi.
- **D2 — χ:n ja migraatiogradientin etumerkki:** kumpi on kanoninen — `chi_map.py`/`biocap.py` (χ suurin päiväntasaajalla, tropiikki rappeutuu nopeimmin, W-Eur BioCap korkein) vai sivun/`evolutionData.ts`:n narratiivi (pohjoinen = korkein χ, SSA = korkein BioCap, "viimeinen barbaari")? Jompikumpi on käännettävä: koodi (`chi_latitude` + `REGIONS`) tai sivut (L1/L2, § Migration, § Last Barbarian, `MigrationGradientMap.tsx`, `evolutionData.ts:348, 362`).
- **D3 — Mekanismikehystys:** korjataanko sivilisaatiosivut ja `political_biology.py`-docstringit primerin hierarkiaan (B primääri, A sekundaarinen) osan 3F korvauslistalla, vai päivitetäänkö primer vastaamaan moduulin VGCC-ensisijaista kehystystä?
- **D4 — `falsification_v19_1.json` T8:** lisätään `TEST_REGISTRY`:yn (+ testit) vai poistetaan JSON:sta (7 testiä)?
- **D5 — Polkukirjainskeema:** vahvistetaanko A/B/C/D (B = RPM, C = BBB, D = HPA) ainoaksi ja korjataan `causalChainData.ts` (E = BBB), `v16.py:1710–1728`, `REASONING_PROTOCOL_v1.md`, `eyeColorData.ts`, `evolutionData.ts`, `DualLock`, rekisterin `pathway`-tagit (E 127 kpl)?

---

## 12. Korjaussuunnitelma (järjestys)

**Vaihe 1 — päätöksistä riippumattomat (heti):** `navigation.ts` viitemäärä metadatasta; `thresholdModel.ts` USA 1,2; `channelGroups.ts` rajat + polkulistat; `sentinel_registry.json` r/r²/n (+ etusivun 0,909); `causal-graph.json` calibration_status Pythonista (+ schema); patokratia :15 patologisaatiomääritelmä, :83, :125, :109, :32–33; pathopolites :25, :61, :99; patopoliteia :83, :106, :64 (0,49), :62 (p = 0,01 pois), :51/:63/:163 (renessanssit globaalisti), :153 (Mongolit), :45/:49 (σ, α, /(t − t₀)), :142–143 + `sActivationChartXNote` (S + U + E), :22 (11 → 9 tai lisää 2), :55 vs :194; civilization index :38 (208), :28; patokinesis :75–79, :230–257 (koodin kaavat), :197/:279/:309 (1,15 / 0,75 / 1,25), s6-taulukot JSX, cross-country-taulukko, openGraph; patopolis :336/:376/:380/:545 (0,87), :38/:545 (0,75; 1,41), :246 (n), :263/:548, T-perustasot, :128; pathopege :207; DualLock :13 (B); Varroa 1,1 vs 1,6; evolution 4 falsifikaatiokriteeriä; T −1,2 %/v -harmonisointi; Amish 6,1/6,5 nimeäminen; siittiölaskun suureiden nimeäminen; `sensitivity_all`-taulukko 8 rivillä ja oikea prosenttisemantiikka (sama kaikissa D1-vaihtoehdoissa).
**Vaihe 2 — D1:n jälkeen:** `export_cultural_energy.py` + JSON + sync-testi; `BiocapTrajectory.tsx` (Amish 0,855, B2); patopoliteia vaiheet/siirtymät/tutka EN+FI; mathematics :458/:912; etusivu :44/:53.
**Vaihe 3 — D2/D3/D5:n jälkeen:** χ/migraatio; mekanismikehystys 7 sivulla + docstringit + JSON `berm_mechanism`; polkukirjainskeema.
**Vaihe 4 — sisältö:** 92 puuttuvaa viitemerkintää (`finding/pathway/tags`, muisti `berm-reference-json-schema`); Thirteen Phenomena -tagitus; osan 7 integraatiot (prioriteetti: cross-country-taulukko, Calhoun-vaiheet, ratchet, empire-lifespan-histogrammi, GRAND_MINIMA); FI-käännökset 12 tyhjälle stubille; CODELLE-puutteet (LFP, Konrath, puristusvoima, 47 %; modulome-linkit).
**Vaihe 5 — jäljellä olevat alueet (osa 10)** rajan nollauduttua, sitten `tsc`, `eslint`, DOM-tarkistus, build, deploy, `git status` -raportti.

---

---

## 13. Toteutetut korjaukset (2026-09-02 iltapäivä)

**Päätökset:** D1 → "mallin kannalta loogisin" = kortisoli käänteisenä (`compute_biocap` = Σw⁺·m + 0,10·(1 − CORT); painojen itseisarvot summautuvat 1,0:aan, BioCap ∈ [0,1], ei leikkausartefakteja; kaikki BioCap-arvot +0,100, indeksit muuttumattomat). D2 → tarkistettu: `chi_map.py`:n UV-perustelu ei esiinny missään muualla projektissa ja `biocap()` ei koskaan käyttänyt `chi_total`-sähköistysboostia eikä alueellista altistushistoriaa; narratiivi (pohjoinen paketti, REGIONS-estimaatit, "viimeinen barbaari") on projektin teesi → malli korjattu. D3 → primer (B-primääri). D5 → A/B/C/D kaikkialle.

**Malli (`berm/`):** `cultural_energy.compute_biocap` (kortisoli-inversio + docstring); `chi_map.chi_latitude` nousee leveysasteen mukana (0,25 päiväntasaajalla → 1,0 ≥ 65°; 30° 0,42, 45° 0,63, 50° 0,71, 60° 0,90); `biocap(t, lat, region=)` käyttää `chi_total`-arvoa vuosittain; `migration_gradient.biocap_gradient` = BioCap(lähde) − BioCap(kohde) (vahvempi lähde → paine kohteeseen); `cross_species_gradient.py` docstring 0,909 → 0,842; testit `test_cultural_energy.py`, `test_civilization.py` päivitetty. Uusi `berm/export_cultural_energy.py` → `berm_cultural_energy_model.json` (trajektori 8 markkeria, siirtymät, herkkyys, ympäristöt, alueet). Tulokset: 2025 = **0,614 manistinen**; siirtymät **1983 → deistinen, 2007 → manistinen, 2040 → zoistinen (ennuste)**; ympäristöt amish 0,955 / rural 0,731 / suburban 0,614 / urban_res 0,536 / urban_office 0,480; alueet 2025: SSA 0,894 (korkein) … W-Eur 0,645 (matalin); SSA→W-Eur-gradientti +0,25 (2025) → +0,32 (2080) — **ei konvergenssia**. Herkkyysprosentit ennallaan (T 23,3 %, OXT 19,9 %, MEL 16,4 %, CORT 13,9 %, DA 12,8 %, BDNF 6,7 %, D 4,5 %, B2 2,5 %). `civilization_indices.json` regeneroitu; sivuliteraalit (patokratia, patopolis) päivitti rinnakkainen sessio → `test_civilization_site_sync.py` 47/47.

**Sivusto (omat tiedostot):** etusivu (r = 0,84 / p = 0,017; R² = 0,95 testosteroni–TFR; "8 lukittua ennustetta" entisen "13/20" tilalle; BioCap 0,614 ↓ 0,976:sta; Levine 2022; T −1,2 %/v; Amish ≈ 6,1 (2014)); mathematics §16 (0,614; kortisoli-inversio kaavaan; kynnykset vakioina + siirtymävuodet; 8-rivinen herkkyys oikealla semantiikalla; EN + FI); objections (TRPC1 = B-kalsium, EN + FI); predictions (Suomi/Korea-statukset välitiloiksi 2024-havainnoilla 1,25 / 0,75 EN/FI/FR/KO; T-TFR-2 aritmetiikka −2,8 %/v → ≈ 1,00; r = 0,84 ×5; dashboard 280/39/4/276/0 + tilapalkki ja aria 5 kielellä); sentinel (gradienttiosio 5 kielellä; taulukko lukee `sentinel_registry.json`:n 7 lajin datasettiä; r = 0,842, r² = 0,710, p = 0,017); `sentinel_registry.json` (koodin datasetti + fit; vanha 6-rivinen taulukko säilytetty `decline_rate_table`-lohkona r = 0,72); `BiocapTrajectory.tsx` (Amish-viiva JSON:sta 0,955; B2); `MigrationGradientMap.tsx` (BioCap/TFR/sähköistysvuosi JSON:n `regions`-lohkosta; Kaakkois-Aasia poistettu — ei mallialue); `lib/navigation.ts` (viitemäärä `REFERENCE_TOTAL` = indeksin metadata, 1 034); `lib/referenceIndex.ts` (`REFERENCE_TOTAL`); `lib/thresholdModel.ts` (USA T-lasku 1,2; 2024-TFR:t WB 2024: 1,25 / 1,63 / 1,47 / 2,87 / 0,75 / 1,15); `lib/channelGroups.ts` (ELF < 300 Hz, IF 300 Hz–1 MHz; polut ELF B+D, RF A+B+D); `data/causal-graph.json` (35 solmun `calibration_status` Pythonin arvoiksi) + skeeman enum; `lib/eyeColorData.ts`, `lib/evolutionData.ts`, `DualLockArticleContent.tsx` (polkukirjaimet B = CRY/RPM). Dokumenttien polkukirjaimet (REASONING_PROTOCOL, CHANGELOG, DISCRIMINATING_TESTS, NEGATIVE_FINDINGS) yhtenäisti rinnakkainen sessio.

**Laatuportit ennen julkaisua:** `tsc` 0, `eslint --max-warnings=0` 0 (omat tiedostot), vitest 148/148, `registry:validate` 0/0, sivilisaatiotestit 498 + sync 47/47, koko pytest ks. julkaisumerkintä.

**Erä 2 (ilta, commit seuraa):** patopoliteia EN+FI — vaihekortit (rationalistinen –1983, deistinen 1983–2007, manistinen 2007–, zoistinen ~2040), siirtymätaulukko mallin `identify_transitions`-arvoista (1983 T, 2007 OXT, 2040 OXT), 8-rivinen herkkyystaulukko oikealla semantiikalla (osuus parannusvarasta; T 0,614 → 0,704), triadi 59,6 %, tutkan arvot `biomarker_values_at(2025)` (CORT 0,538, paino −0,10), Amish-viiva 0,955, painohuomautus (itseisarvot 1,0; ei perturbaatioväitettä), vaihehuomautus (vakiot + siirtymävuodet; ei Unwin-aineistoväitettä), kaavatermit (σ logistinen, χ leveysasteen mukana + alueboosti, α = 0,3, jako integrointivälillä), renessanssit "8/10 mallin aineistosta (6 eurooppalaista, 4 aasialaista)", L1 ilman p-arvoa (ensimmäiset sivilisaatiot 25–35°N, χ ≈ 0,37–0,49; imperiumit 33–52°N), L2 χ ≈ 0,63–0,90, L3 0,41 vs 0,49, migraatiogradientin alueluvut, immigranttien alle-konvergenssi, "viimeinen barbaari" mallin mukaan (ei konvergenssia; falsifioitava ehto), hormeesikaavion akseli S + U + E, α-esimerkit ilman Mongolit 1206 (aurinkoindeksi 0,07), 11 ajattelijaa / 9 taulukossa, Glubb 250 vs mallin mediaani 377, Suess 208. patokratia — melatoniini rappeutuu nopeimmin (62 %), T toiseksi; r/K-lojaalius OXT × (0,5 + 0,5T); populismi/libertarismi lasketut arvot; D3-lauseet. pathopolites — skaalahuomautus, T ja MEL herkimmät, D3. patokinesis — viiden tekijän ja transmissiokanavien kaavat koodin mukaan (EN+FI), Japani 1,15, Korea 0,75 (2024), Unkari 1,25, D3, openGraph. patopolis — Singapore 0,87 (2024) ×3, Korea 1,23 → 0,75, Unkari 1,41, T-gradientti 59 %, n = 220, ennusteet 1–8 RCT / 9–12 muu, D3. pathopege — hero ja mekanismilauseet B-primääriksi (EN+FI, SVG), Route D, Santi 2025. Sivilisaatioindeksi — hero/pathopege-kuvaus B-primääriksi (EN+FI), Suess 208, ennustesanamuoto. `political_biology.py` — 4 docstringiä/kommenttia B-primääriksi, herkkyysjärjestys MEL > T > OXT > DA > BDNF mitattuine arvoineen; JSON `berm_mechanism` -merkkijonot; `v16.py` POPULATION_CHI_PROFILES C → B; `causalChainData.ts` polkukortit (C melatoniini → B:n melatoniinihaara, E BBB → C, F Vmem ilman kirjainta) ja tekstimaininnat; `test_civilization_site_sync.py` sLCDesc-kuvio päivitetty uuteen järjestykseen. Rekisterin `pathway`-tagit: skeema osoittautui moni-tagiseksi ja dokumentoimattomaksi (E ja D samoilla ROS-artikkeleilla, C = LED/valosaaste) — ei mapattu sokeasti; vaatii kuratoidun mappauksen (avoin).

**Avoinna (seuraava erä):** rekisterin `pathway`-tagien kuratoitu mappaus (D5); pathopege RCT-nimet (vaativat rekisterimerkinnät); 92 viitemerkintää; evolution-sivun 4 falsifikaatiokriteeriä; FI-käännökset; osan 7 integraatiot; ennustesivun laskureiden johtaminen datasta; auditoimattomat alueet (osa 10).

*Auditointi 2026-09-02. Agenttiraportit kokonaisuudessaan sessiotranskriptissa (sivilisaatio: 723 k tokenia, 89 työkalukutsua; datapeilit: 373 k; artikkelit: 243 k; ennusteet/etusivu: 691 k).*
