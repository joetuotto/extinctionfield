# Proksiregressioiden lähdejälki ja numeerinen toisto

Päiväys: 2026-09-08. Työ jatkaa `quantitative.md`-muistion lähdehakua. Tavoite on vahvistaa käytettävissä olevaa määrällistä näyttöä: etsiä liitteen lukujen alkuperä ja laskea olemassa olevista aineistoista se, mikä on toistettavissa. Tässä ei muodosteta uusia fyysisiä EMF-annoksia, uusia ennusteita tai väestövaikutusten kalibrointia.

**Tulos:** Belminin julkaistun taulukon 1 kaikki neljä mallia toistuvat avoimesta aineistosta. Repositorion 54 maan taulukosta voidaan toistaa kolme kuvailevaa R²-lukua ja tallennetun sovitteen virhe. Kumpikaan ei ole liitteen R²-sarja 0,394 / 0,433 / 0,448. Liitteen täsmällisen sarjan alkuperäinen aineisto ja sovitus eivät löytyneet tässä haussa.

BERM:n premissirakenne on päätehtävässä tarkistettu Lindgrenin vuoden 2025 geometriasta. Ehdollinen biologinen Ξ[S]-liitos on BERM:n L2-rakenne. Energiainfrastruktuurin väestöyhteys täydentää sen alavirran aineistoa; sähköindikaattorin nimeäminen fyysiseksi kenttäannokseksi ei seuraa tästä tilastosta.

## 1. Liitteen lukujen täsmällinen kohde

Alkuperäinen tiedosto: `/Users/ottojuote/.codex/attachments/81163a46-3190-4c60-b404-1d87fff17064/pasted-text.txt`, osiot 2.3 ja 3.

| Väite | Liitteen määrittely | Lähdejälki |
|---|---|---|
| R² 0,394 | TFR ~ EMF | EMF-muuttujan määritelmä, otos ja sovitettava taulukko eivät sisälly liitteeseen. |
| R² 0,343 | TFR ~ koulutus | Sama puute. |
| R² 0,241 | TFR ~ kaupungistuminen | Sama puute. |
| R² 0,433 | TFR ~ koulutus + kaupungistuminen + BKT | Alkuperäinen liite käyttää 0,433:a; myöhemmässä kysymyksessä esiintyy myös 0,432. |
| R² 0,448 | TFR ~ EMF + koulutus + kaupungistuminen + BKT | Ei laskentakoodia tai alkuperäistä tulostetta. |
| Osittaiskorrelaatiot −0,37 / −0,25 | EMF–TFR koulutuksella vakioituna / koulutus–TFR EMF:llä vakioituna | Ei otosta tai muuttujien numeerisia sarjoja. |
| r ≈ 0,85 | koulutus–EMF | Ei mittaria, vuotta, maajoukkoa tai laskentaa. |

Täsmähaut eivät paikantaneet näitä lukuja yhdeksi analyysiksi repo- tai primaarilähteissä. Tämä on rajatun lähdehaun tulos, ei väite luvun mahdottomuudesta tai kaiken kirjallisuuden kattamisesta.

Lukujen ehdollinen algebra on silti toistettavissa. Jos 0,394/0,433/0,448 olisivat saman otoksen yhteensopivia OLS-malleja, yhteinen selitysaste olisi 0,379, EMF-nimisen muuttujan yksilöllinen lisäosa 0,015 ja muiden kolmen lisäosa 0,054. Luku 0,394/0,433 = 0,90993 on selitysasteiden suhde, ei syyn osuus. Liitteen 3,9 prosenttiyksikön lisäys on sen omilla luvuilla 5,4.

Lisätarkistus täsmentää aineistotarvetta: R² 0,394 ja 0,343 sekä ilmoitetut osittaiskorrelaatiot implikoivat kahden muuttujan yhteismallille noin 0,432:n selitysasteen. Tämä likimääräinen yhteensopivuus ei paikanna lähdettä. Jos samoihin yksinkertaisiin malleihin asetetaan lisäksi proksien r=0,85 ja negatiiviset TFR-yhteydet, osittaiskorrelaatioiksi tulevat −0,304 ja −0,127, eivät −0,37 ja −0,25. Otosten, määritelmien ja pyöristysten erot on siksi pidettävä avoimina.

## 2. Belminin julkaistu ja toistettu energiayhteys

Primaarilähde: Belmin, Hoffmann, Pichler & Weisz, **Fertility transition powered by women’s access to electricity and modern cooking fuels**, Nature Sustainability 5, 245–253 (2022), [DOI 10.1038/s41893-021-00830-3](https://doi.org/10.1038/s41893-021-00830-3). [Tekijän hyväksytty kokoteksti PIK-arkistossa](https://publications.pik-potsdam.de/rest/items/item_26245_7/component/file_26936/content).

155 DHS-kyselyä, 1990–2015. Tulos on alueen TFR, selittäjänä sähkönsaannin tai modernien ruoanlaittopolttoaineiden saannin osuus 15–49-vuotiaista naisista. Vakioinnit: naisten koulutusvuodet, kaupungistuminen, BKT, avioitumisikä ja konfliktit. Alkuperäinen koodi käyttää alueiden within-muunnosta, viiden vuoden jaksoja (`year_group_5`) ja alueittain klusteroitua HC0-kovarianssia. Sähkönsaanti on infrastruktuurimittari.

| Julkaisun malli | Energiakerroin, TFR / %-yksikkö (klusteroitu SE) | N / alueet / maat | Julkaisun korjattu R² |
|---|---|---|---|
| M1: sähkö + vakioinnit | sähkö −0,018 (0,003) | 1 356 / 403 / 44 | 0,37 |
| M2: modernit polttoaineet + vakioinnit | polttoaineet −0,013 (0,004) | 940 / 319 / 36 | 0,29 |
| M3: sähkö + polttoaineet + vakioinnit | sähkö −0,008 (0,004); polttoaineet −0,012 (0,004) | 940 / 319 / 36 | 0,30 |
| M4: molemmat saatavilla + vakioinnit | yhteissaanti −0,013 (0,004) | 940 / 319 / 36 | 0,29 |

Yhteys energiansaannin ja TFR:n välillä säilyy nimettyjen tavanomaisten selittäjien huomioimisen jälkeen. M1→M3 vaihtuvat sekä selittäjäjoukko että otos, joten niiden kerrointen erotus ei eristä yhtä välittävää mekanismia. BERM liittää infrastruktuurin mukana muuttuvan kenttähaaran tähän kokonaisuuteen; julkaistu kerroin ei yksin erottele sitä tiedon, ajankäytön, terveyden ja muiden reittien joukosta.

### Avoin aineisto, koodi ja tässä tehty toisto

[Tutkimuksen avoin GitLab](https://gitlab.pik-potsdam.de/belmin/fertility-transition-powered-by-womens-access-to-electricity-and-modern-cooking-fuels/) sisältää:

- `1_pre_processing/pre_processing.Rmd`: DHS-aineiston esikäsittely.
- `2_manuscript/manuscript.Rmd`: analyysit ja kuvat, taulukon 1 mallit kohdassa `model-result1`.
- `3_supplementary_information/supplementary_information.Rmd`: lisäanalyysit.
- `code/helper_functions.R`: kirjoittajien korjatun R²:n laskenta, `calc_adj_rsq`.
- `data/panel_elec.csv` ja `data/panel_elec_MCF.csv`: käsitellyt paneelit. Alkuperäinen analyysi rajaa `impute == FALSE`; interpoloituja rivejä ei käytetty tässäkään taulukon 1 toistossa.

Tiedostot haettiin julkisesta GitLab API:sta projektista 1270 `/tmp/berm-belmin-audit`-hakemistoon. Analyysi luettiin R-koodista ja laskettiin uudelleen Pythonin NumPy/pandas-kirjastoilla. Kyseessä on itsenäinen numeerinen toisto samoista käsitellyistä havainnoista ja samasta estimoinnista; DHS-mikroaineiston esikäsittelyä ei ajettu uudelleen. Kaikki neljä mallia, kertoimet, keskivirheet ja artikkelin pyöristetyt korjatut R²:t täsmäsivät. Julkaisun R²-korjaus käyttää omaa `1−(1−R²)(n−1)/(n−k−1)`-konventiotaan; koodissa säilytettiin tämä määrittely.

Suorat ladattavat lähdepolut:

- [Sähköpaneeli](https://gitlab.pik-potsdam.de/api/v4/projects/1270/repository/files/data%2Fpanel_elec.csv/raw?ref=main)
- [Sähkö- ja polttoainepaneeli](https://gitlab.pik-potsdam.de/api/v4/projects/1270/repository/files/data%2Fpanel_elec_MCF.csv/raw?ref=main)
- [Alkuperäinen R-analyysi](https://gitlab.pik-potsdam.de/api/v4/projects/1270/repository/files/2_manuscript%2Fmanuscript.Rmd/raw?ref=main)
- [Alkuperäiset apufunktiot](https://gitlab.pik-potsdam.de/api/v4/projects/1270/repository/files/code%2Fhelper_functions.R/raw?ref=main)

## 3. Repositorion 54 maan aineiston uudelleenlaskenta

Lähde: `website/public/data/cross_section_manifest.csv`. Sarakkeet: maa, havaittu TFR 2022, kokonais­sähkönkulutus henkeä kohti, kiinteät laajakaistaliittymät, `emf_index`, tallennettu `tfr_predicted` ja residuaali. Sivuston lähdemerkintä nimeää UN WPP 2024:n, OWID/IEA:n ja ITU:n.

| Muuttuja / laskentatapa | n | Pearsonin r TFR:ään | R² |
|---|---|---|---|
| Sähkönkulutus, vakion sisältävä yhden selittäjän OLS | 54 | −0,609627 | 0,371644 |
| Laajakaistaliittymät, sama laskenta | 54 | −0,680474 | 0,463045 |
| Valmis `emf_index`, sama laskenta | 54 | −0,722484 | 0,521983 |
| CSV:n tallennettu TFR-sovite: `1−SSE/SST`, ei uusi sovitus | 54 | — | 0,454560 |

Tallennetun sovitteen RMSE = 0,872323. Sen ennustearvoja ei sovitettu uudelleen havaittuun TFR:ään; siksi tästä laskelmasta ei käytetä ennusteen ja havainnon korrelaation neliötä.

Indeksin rakenteeksi toistuu `0.60 × min(sähkö/8500, 1) + 0.40 × min(laajakaista/47, 1)`, enimmäispoikkeama CSV:stä 0,00007452. Tämä vastaa `berm/berm/formula/cross_sectional.py`-funktion rakennetta. Se on painotettu infrastruktuurikoordinaatti, ei taajuus-, paikkakohtainen kenttä- tai kudosannos. CSV:n sähkösarake on nimetty kokonaiskulutukseksi, kun kaavafunktion parametrin nimi on `residential_kwh`; tätä eroa ei tässä auditissa peitetä yhdellä annosnimikkeellä.

Taulukossa ei ole koulutusta, kaupungistumista tai BKT:tä. Se ei yksin toista liitteen kolmen proksin mallia. Myöskään vanhan epälineaarisen mallin täysi sovitus-/LOOCV-menettely ei sisälly CSV:hen. `website/components/MathematicsSections.tsx` nimeää samassa yhteydessä R²=0,851 ja LOOCV-RMSE=0,522; nykyisen CSV:n tallennetut sovitteet eivät tuota näitä kahta lukua. Tämä ero raportoidaan nykyisten artefaktien välisenä jäljitettävyystuloksena; sivua tai aineistoa ei muutettu.

## 4. Globaali paneeli ja olemassa olevat mallivertailut

`website/public/data/global_panel.csv` sisältää 15 470 riviä, 238 maata/aluetta ja vuodet 1960–2024. TFR:n lisäksi siinä ovat matkapuhelinliittymät/100, kaupungistuminen, BKT ja ehkäisyindikaattori sekä lähde- ja saatavuusmerkinnät. Vuonna 2022 TFR, liittymät, kaupungistuminen ja BKT löytyvät yhtä aikaa 197 riviltä. Koulutusta ja fyysistä EMF-mittausta ei ole tässä viennissä.

TFR-riveistä 15 168 on WPP-estimaatteja, 281 World Bank -tietoja ja 21 erikseen merkittyjä keskiskenaarion projektioita. `berm/berm/data/global_panel.py` säilyttää alkuperämerkinnät ja määrittelee koulutusmuuttujan valinnaiseksi, tässä julkaisussa hankkimattomaksi kovariaatiksi. `global_public_export.py` tuottaa verkkoviennin. Nämä ovat käyttökelpoisia maa–vuosi-aineistoja infrastruktuuriyhteyksille; liitteen alkuperäistä otosta ei voi tunnistaa valitsemalla niistä jälkikäteen uuden 197 rivin otoksen.

`berm/berm/stats/model_comparison.py` toteuttaa vanhan M0–M3-vertailun, jonka ulostuloina ovat RMSE, MAE, harha, suurin virhe ja maakohtaiset tulokset. Se käyttää vuoden 2024 TFR-tietoja ja v16/v17-teknologiaproksien historiapainotuksia. Se ei ole `TFR ~ EMF + edu + urban + GDP` -OLS-analyysi eikä laske liitteen osittaiskorrelaatioita. `berm/tests/test_model_comparison.py` tarkistaa tämän eri menettelyn.

Erillinen globaali historiallinen vertailu löytyy tiedostoista `berm/berm/stats/global_backtest.py`, `website/public/data/global_validation.json` ja `berm/docs/global-expansion.md`. Dokumentin taulukko raportoi RMSE-lukuja, esimerkiksi 0,851, ei tätä R²-sarjaa. Sen legacy-proksit on jo dokumentoitu yksiköttömiksi ja tulokset ehdollisiksi historiallisiksi sovitteiksi. Niitä ei nimetty uudelleen fyysisen kenttävaikutuksen todisteiksi eikä ajoa uusittu tämän alkuperäselvityksen vuoksi.

## 5. Toistokoodi ja tarkistustaso

Täsmällinen ajettava koodi on tämän muistion vieressä: `regression_followup.py`. Se lukee CSV:t, tulostaa SHA-256-tunnisteet ja laskelmat, eikä kirjoita tai muuta aineistoja.

```bash
python3 docs/analysis/BERM_proxy_revision_2026-09-08/regression_followup.py
```

Belminin kahden julkisen käsitellyn CSV:n kanssa:

```bash
python3 docs/analysis/BERM_proxy_revision_2026-09-08/regression_followup.py --belmin-data-dir /tmp/berm-belmin-audit
```

Jälkimmäinen tarvitsee NumPyn ja pandas-kirjaston. Molemmat ajot tarkistettiin tässä työssä; koko toisen ajon tuloste on alla. Belminin lähde on kokoteksti + alkuperäinen R-koodi + käsitellyn aineiston numeerinen toisto. Repositorion luvut on laskettu nykyisistä CSV-tavuista. Liitteen lähde on käyttäjän teksti, jonka alkuperäisanalyysia ei paikannettu.

## 6. Hakujälki

1. Täsmäluvut repoalueista `berm`, `docs`, `website`: `0.394`, `0.343`, `0.241`, `0.433`, `0.448`, `−0.37`, `−0.25` ja desimaalipilkkuversiot. Olennaiset osumat olivat vanha sivusuunnitelma ja nykyinen `quantitative.md`; irrallisia samoja desimaaleja esiintyi muissa mittareissa ja generoituissa aineistoissa.
2. Analyysien ja viennin jäljitys: `cross_section_manifest`, `tfr_observed_2022`, `total_electricity_kwh_capita`, `emf_index`, `M0_baseline`, `M1_cumEMF`, `global_panel`, `model_comparison`, `education_years_female`. Löytyivät yllä yksilöidyt koodi- ja aineistopolut.
3. Primaarikirjallisuuden kohdehaut: `fertility "0.394" "electricity"`, `fertility "0.433" "EMF"`, `fertility "partial correlation" "electromagnetic"`. Ei tarkkaa kohdeanalyysia; muita päätemuuttujia ja samoja desimaaleja ei luettu tämän mallisarjan lähteeksi.
4. Belmin: DOI → PIK-kokoteksti → julkinen GitLab projektitunnuksella 1270 → taulukon 1 R-mallikaavat → ei-imputoidut käsitellyt paneelit → numeerinen toisto. Tämä haku tuotti julkaistavan, mitatun infrastruktuuriyhteyden ja varmistetun lähteen.

## Täysi laskentatuloste

```json
{
  "cross_section_manifest": {
    "sha256": "fa76b5bf0abd7656baed879ecd1cb8c2a0b5c6cc2ad1365933140fd108c417b8",
    "rows": 54,
    "physical_emf_measurement": false,
    "descriptive_statistics": {
      "total_electricity_kwh_capita": {
        "n": 54,
        "pearson_r": -0.6096265022743168,
        "ols_with_intercept_r2": 0.3716444722752176
      },
      "broadband_per_100": {
        "n": 54,
        "pearson_r": -0.6804744270719194,
        "ols_with_intercept_r2": 0.463045445898857
      },
      "emf_index": {
        "n": 54,
        "pearson_r": -0.7224839826405559,
        "ols_with_intercept_r2": 0.5219831051721591
      }
    },
    "stored_prediction_r2_1_minus_sse_over_sst": 0.45455950424046965,
    "stored_prediction_rmse": 0.872323143489078,
    "reconstructed_index_max_absolute_difference": 7.451814768460324e-05,
    "columns_absent_for_claimed_multivariable_models": [
      "education",
      "urbanization",
      "GDP"
    ]
  },
  "global_panel": {
    "sha256": "7ac2fd691dedaa195a3a172966f58db0c2bb52d877ed8b0616014b3490193cd8",
    "rows": 15470,
    "countries_and_areas": 238,
    "year_min": 1960,
    "year_max": 2024,
    "tfr_series_status_counts": {
      "ESTIMATE": 15168,
      "REPORTED_BY_WORLD_BANK": 281,
      "PROJECTION_MEDIUM": 21
    },
    "complete_2022_rows_tfr_mobile_urban_gdp": 197,
    "education_column_present": false,
    "physical_emf_measurement": false
  },
  "attachment_conditional_algebra_not_empirical_results": {
    "r2_ratio": 0.9099307159353349,
    "common_r2": 0.37899999999999995,
    "unique_emf_r2": 0.015000000000000013,
    "unique_three_proxies_r2": 0.05399999999999999,
    "pair_r2_implied_by_partial_emf_minus_037": 0.43294330000000003,
    "pair_r2_implied_by_partial_edu_minus_025": 0.431875,
    "partial_emf_given_claimed_simple_r2_and_correlation_085": -0.3041816708642311,
    "partial_edu_given_claimed_simple_r2_and_correlation_085": -0.12710214701773173
  },
  "belmin_table_1_reproduction": {
    "M1": {
      "source_file": "panel_elec.csv",
      "sha256": "8992f67b1515817af315085dc47319e4c1b7fd0eef8b076367ae93597ed40bb8",
      "n": 1356,
      "regions": 403,
      "countries": 44,
      "energy_coefficients": {
        "elec_rate": {
          "beta": -0.01784206676280045,
          "cluster_hc0_se": 0.0031769495462545395
        }
      },
      "within_r2": 0.37199793415088134,
      "authors_adjusted_r2_before_rounding": 0.36685803629050917,
      "authors_adjusted_r2_rounded": 0.37
    },
    "M2": {
      "source_file": "panel_elec_MCF.csv",
      "sha256": "af52102dedfcfee11c0c5db1a2cc0979566f890b2e44b8f977792b466c49f0c6",
      "n": 940,
      "regions": 319,
      "countries": 36,
      "energy_coefficients": {
        "modern_cooking_fuel_rate": {
          "beta": -0.013422727934686279,
          "cluster_hc0_se": 0.00434983348259499
        }
      },
      "within_r2": 0.30181745798155457,
      "authors_adjusted_r2_before_rounding": 0.2943020377230138,
      "authors_adjusted_r2_rounded": 0.29
    },
    "M3": {
      "source_file": "panel_elec_MCF.csv",
      "sha256": "af52102dedfcfee11c0c5db1a2cc0979566f890b2e44b8f977792b466c49f0c6",
      "n": 940,
      "regions": 319,
      "countries": 36,
      "energy_coefficients": {
        "elec_rate": {
          "beta": -0.00833690854952262,
          "cluster_hc0_se": 0.0038047105012344196
        },
        "modern_cooking_fuel_rate": {
          "beta": -0.011521453330940453,
          "cluster_hc0_se": 0.004297637783504182
        }
      },
      "within_r2": 0.30771333095746045,
      "authors_adjusted_r2_before_rounding": 0.2995073467338959,
      "authors_adjusted_r2_rounded": 0.3
    },
    "M4": {
      "source_file": "panel_elec_MCF.csv",
      "sha256": "af52102dedfcfee11c0c5db1a2cc0979566f890b2e44b8f977792b466c49f0c6",
      "n": 940,
      "regions": 319,
      "countries": 36,
      "energy_coefficients": {
        "high_access_rate": {
          "beta": -0.012916236627192879,
          "cluster_hc0_se": 0.004388953891631161
        }
      },
      "within_r2": 0.30065159939824326,
      "authors_adjusted_r2_before_rounding": 0.29312362953170124,
      "authors_adjusted_r2_rounded": 0.29
    }
  }
}
```
