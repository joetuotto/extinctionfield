# BERM:n globaali laajennus: data, malli ja ensimmäinen ajo

Päivitetty: 2026-08-19
Tila: toteutettu lisäreitti — ei korvaa julkaistua Core-51-tulosta

## Rajaus ja tasot

Tämä reitti laajentaa BERM:n maa–vuosi-aineiston 238 lähdekelpoiseen maa-/alueyksikköön. Se **ei** muuta `website/public/data/rolling_backtest.json`-artefaktista johdettua Core-51-joukkoa eikä sen aiempia tuloksia. Core-51 on lukittu historiallinen vertailuraja; laajemmat tasot ovat erillisiä, ennalta määrätyillä kattavuussäännöillä muodostettuja analyysejä.

| Taso | Jäsenmäärä | Ennalta määrätty sääntö |
| --- | ---: | --- |
| Core-51 | 51 | Johdetaan julkaistun rolling-backtest-artefaktin ISO3-avaimista. Ei muuteta. |
| Extended | 192 | 1990–2024: TFR ≥25 vuotta, mobile ≥20, urban ≥25, GDP PPP ≥20. |
| Global | 204 | 2000–2024: TFR ja mobile kumpikin ≥15 vuotta. |

Ranska, Japani, Israel, Saudi-Arabia, Arabiemiirikunnat ja Ukraina täyttävät laajemman Extended-tason ehdon. Ne eivät tämän vuoksi liity jälkikäteen Core-51:een.

## Data ja provenienssi

World Bank -lähde-erä `wb_global_2026-08-19` sisältää kahdeksan WDI-indikaattoria sekä World Bankin maametadatan. Aggregaatit suodatetaan metadatan `region.id == "NA"` -merkinnällä, ei kolmekirjaimisen tunnuksen perusteella. Yhdistetty paneeli on 217 World Bank -maan ja WPP:n Country/Area-joukon unioni, yhteensä 238 ISO3-yksikköä vuosilta 1960–2024.

- TFR: UN WPP 2024 -estimaatti ensisijaisena, World Bank dokumentoituna fallbackina. WPP:n 2024+ medium-projektio säilyy paneelissa `DERIVED`-etiketillä.
- Mobile, broadband ja internet ovat **PROXY**-mittareita, eivät RF-annoksia.
- Puuttuvia arvoja ei interpoloida tai ekstrapoloida lähdepaneelissa.
- Koulutus-, uskonnollisuus-, maahanmuutto- ja IVF-kovariaatit ovat tässä julkaisussa `NOT_ACQUIRED`; niitä ei keksitä. Mallin valinnaisen kentän mediaani lasketaan vain kyseisen koulutusfoldin riveistä ja imputointi merkitään tulokseen.

Täysi kenttäkohtaisen provenienssin sisältävä tutkimuspaneeli on paikallinen, suuri johdettu artefakti. Julkinen `global_panel.csv` on siitä tehty 3.3 Mt:n litteä vienti (15 470 riviä), jossa lähde-, status- ja tier-jäsenyyskentät säilyvät. `global_panel_summary.json` sisältää lähdetarkistussummat ja kattavuuden.

## Malli ja testisopimus

Globaali reitti ei käytä maakohtaista `rate2024`-parametria, maakohtaista interceptiä tai sovitettua residuaalia. Se käyttää kahta samalla training-rivillä sovitettua, globaalisti pooled Ridge -mallia:

```text
BERM = pure_external_bioCap_x_behav(kumulatiivinen ulkoinen altistus)
       × Ridge(kovariaatit)

M0   = Ridge(samat kovariaatit)
```

Ulkoinen altistus muodostuu vain lähdepaneelin mobile- ja urban-sarjoista:

```text
ambient  = 0.5 × urban_pct / 100
personal = 3 × mobile_per_100 / (mobile_per_100 + 50)
total    = ambient + chi(ambient) × personal
```

Sotilas- ja broadcast-kerrokset ovat tässä globaalissa reitissä `SCENARIO_PARAMETER/default_zero`-oletuksia, eivät havaintoja. Puuttuva tai ekstrapoloitu mobile/urban-historian arvo tekee testirivin kelvottomaksi.

Jokaisessa skenaariossa ridge-kertoimet, imputointimediaanit ja skaalaus sovitetaan vain training-vuosista. BERM ja M0 arvioidaan täsmälleen samoilla kelvollisilla maa–vuosi-riveillä. Lisäksi tehdään country-held-out-tarkistus: pidetyn maan TFR ja kovariaatit eivät osallistu sovitukseen tai train-mediaaneihin.

Koska testivuosien havaittu mobile/urban- ja kovariaattirivi annetaan mallille, tulos on **conditional hindcast**, ei puhdas ex-ante-ennuste. WPP:n 2024+ projektiota ei pisteytetä havaintona.

## Ensimmäisen ajon tulos

Artefakti: `website/public/data/global_validation.json`
Paneelin SHA-256: `4a68f9eaac06f0ec2d9d70814cb41c67f37e1f69d86100bdc985f1618caffa4c`
Tier-artefaktin SHA-256: `303d8372813c995f39627466c4ff46ebd869eec4ee56a32c6c0fe37a62c3bfd9`

| Taso / train → test | n | Pooled BERM | Pooled M0 | LOOCV BERM | LOOCV M0 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Core 1990–2000 → 2001–2024 | 1 186 | 0.949 | 0.831 | 0.980 | 0.871 |
| Core 1990–2005 → 2006–2024 | 936 | 0.933 | 0.804 | 0.961 | 0.841 |
| Core 1990–2010 → 2011–2024 | 686 | 0.851 | 0.728 | 0.879 | 0.765 |
| Extended 1990–2000 → 2001–2024 | 4 055 | 0.988 | 0.960 | 1.000 | 0.974 |
| Extended 1990–2005 → 2006–2024 | 3 166 | 0.940 | 0.878 | 0.952 | 0.892 |
| Extended 1990–2010 → 2011–2024 | 2 297 | 0.888 | 0.814 | 0.898 | 0.827 |
| Global 2000–2005 → 2006–2024 | 3 499 | 0.950 | 0.867 | 0.961 | 0.881 |
| Global 2000–2010 → 2011–2024 | 2 525 | 0.876 | 0.801 | 0.887 | 0.814 |

Tämä ensimmäinen globaali parametrisaatio **ei läpäise** omaa matched-M0-kynnystään: M0:n RMSE on pienempi kaikissa kahdeksassa pooled-skenaariossa ja niiden country-held-out-versioissa. Tämä on tulos, ei käyttöliittymästä piilotettava poikkeus. Artefaktit näyttävät molemmat luvut vierekkäin ilman voitto- tai kausaaliväitettä.

Israel raportoidaan erikseen Extended- ja Global-tasoilla eikä sitä kalibroida pois. Esimerkiksi Global 2000–2010 → 2011–2024 -skenaariossa Israelin BERM RMSE on 1.969 ja M0 RMSE 1.555 (n=14); se on avoin mallidiagnostiikka.

## Toistettavuus

Suorita projektin `berm/`-hakemistosta:

```bash
PYTHONPATH=. python3 -m pytest \
  tests/test_global_download.py tests/test_global_panel.py tests/test_cohorts.py \
  tests/test_global_public_export.py tests/test_hierarchical_global.py -q

PYTHONPATH=. python3 -m berm.stats.global_backtest \
  --panel data/global/all_countries_panel.json \
  --tiers data/global/cohort_tiers.json \
  --output ../website/public/data/global_validation.json
```

`global_public_export` tuottaa kevyen CSV:n ja yhteenvedon idempotentisti. Muuttuneen julkisen viennin korvaaminen vaatii eksplisiittisen `--replace`-lipun. Raakalähde-erästä luodaan aina uusi release-id; sitä ei korvata paikallaan.
