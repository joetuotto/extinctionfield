# BERM: data-integraatiosuunnitelma

Versio: 2026-08-19
Liittyy: [`data-lineage-audit.md`](data-lineage-audit.md) · [`data-gap-register.md`](data-gap-register.md) · [`sentinel-data-requirements.md`](sentinel-data-requirements.md)

Tämä suunnitelma ei paranna mallin sovitusta. Se rakentaa järjestelmän, jossa sovitus,
epävarmuus ja ulkoinen validointi ovat myöhemmin mahdollisia. Mallia ei optimoida
tuloksen perusteella missään vaiheessa.

---

## 0. Formaattivalinta ja sen perustelu

**Pääformaatti: CSV, tyypitettynä Python-sopimuskerroksella.**

Ehdokkaat olivat Parquet, DuckDB ja CSV. Valinta on CSV seuraavista syistä:

1. **Riippuvuusbudjetti.** `pyproject.toml` julistaa `dependencies = []`; ydinpaketti on
   tarkoituksella riippuvuudeton. `pyarrow` ja `duckdb` **puuttuvat ympäristöstä**, ja
   `berm/data/itu.py` on jo rikki juuri tästä syystä (löydös A-8): se kirjoittaa Parquetia,
   jota ei voi lukea. Validointikerroksen, jonka koko tarkoitus on olla aina ajettavissa,
   ei pidä vaatia binääririippuvuutta.
2. **Provenanssi on katselmoitava.** Rekisterin muutos — `proxy_flag` kääntyy `True`→`False`,
   `evidence_grade` nousee `SCENARIO`→`MEASURED` — on täsmälleen sellainen muutos, joka
   pitää nähdä pull requestin diffissä. Binääriformaatissa se on näkymätön.
3. **Tyyppihäviö on ratkaistu muualla.** CSV:n tavallinen vasta-argumentti on dtype-häviö.
   Tässä arkkitehtuurissa tyypit määritellään [`berm/data/contracts.py`](../berm/data/contracts.py):ssä
   ja pakotetaan lukuhetkellä, joten CSV on siirtomuoto eikä tyyppijärjestelmä. Puuttuva
   arvo erottuu nollasta, koska sopimus vaatii sen erottamisen, ei koska formaatti tekee sen.

**Vaihtokriteeri:** kun jokin kanoninen taulu ylittää ~10⁶ riviä (todennäköisesti ensin
`exposure_personal_age_sex_country_year`), lisätään `pyarrow` valinnaiseksi extraksi ja
kyseinen taulu kirjoitetaan Parquetina *CSV:n rinnalle*, ei tilalle. Rekisterit pysyvät
CSV:nä pysyvästi.

---

## 1. Hakemistorakenne

Luotu, vanhaa dataa ei siirretty:

```
berm/data/
  raw/           README.md + muuttumattomat lähdeartefaktit
    manifests/   yksi manifesti per hakuerä, tarkistussummin
  interim/       välivaiheet, uudelleenluotavissa raw:sta
  processed/     olemassa olevat WB-CSV:t (koskematta)
  registry/      source_registry.csv, parameter_registry.csv
  schemas/       JSON Schema -vastineet sopimukselle
  sentinel/      olemassa olevat sentinelliaineistot (koskematta)
  berm/          olemassa olevat johdetut JSONit (koskematta)
```

`sentinel/` ja `berm/` jäävät paikoilleen, koska `stats/csli.py` ja verkkosivusto lukevat
niitä. Ne on manifestoitu ja tarkistussummattu kuten mikä tahansa raakadata. Ne siirtyvät
`raw/`-hakemistoon vain yhteensopivuuskerroksen takaa, ei hiljaisella siirrolla.

---

## 2. Vaiheistus

Jokainen vaihe päättyy vihreään testijoukkoon. Yksikään vaihe ei muuta
`predict_country_year`in oletusulostuloa.

### Vaihe A — sopimukset ja rekisterit · **valmis**

- [`berm/data/contracts.py`](../berm/data/contracts.py) — 12 kanonista tuotetta, 19 pakollista
  saraketta, luokat `OBSERVED`/`PROXY`/`SCENARIO_PARAMETER`/`DERIVED`
- [`berm/data/registry.py`](../berm/data/registry.py) — lataus ja ristiinvalidointi
- `data/registry/*.csv` — 15 lähdettä, 70 parametria
- `data/schemas/*.json` — kieliriippumattomat vastineet
- `tests/test_data_contracts.py` (72 testiä), `tests/test_provenance.py` (14 testiä)

Sopimus hylkää: väärän yksikön, väärän ajan, virheellisen geokoodin, puuttuvan
provenanssin, proxy-lipun ristiriidan, välittömän epävarmuusvälin puutteen
skenaarioparametrilta, imputoinnin ilman putkiversiota, ja duplikaatit taulun rakeisuudella.

> Validaattori löysi jo kaksi virhettä *omasta* rekisteristäni kirjoitushetkellä
> (`baseline_male_ratio` merkitty `MEASURED` mutta osoitti skenaariolähteeseen; kaksi
> parametria ilman perustelua). Molemmat korjattiin rekisteriin, ei testiin.

### Vaihe B — havaittu altistus rinnakkaisreittinä

Tavoite: korvata `tech_penetration_profile` ilman että aktiivinen ennuste muuttuu.

1. Uusi moduuli `berm/data/adoption.py`, rajapinta:

   ```python
   get_adoption_proxy(geography, year) -> dict
   get_network_generation_profile(geography, year) -> dict
   get_ambient_infrastructure_proxy(geography, year) -> dict
   ```

   Jokainen palauttaa arvon **ja** metadatan:

   ```python
   {"value": ..., "unit": ..., "source_id": ..., "is_proxy": True,
    "uncertainty": (lo, hi), "imputed": False, "coverage": ...}
   ```

2. Aukot käsitellään eksplisiittisesti: puuttuva vuosi palauttaa `imputed=True` ja
   putkiversion, tai nostaa virheen. **Ei hiljaista oletusarvoa** (vrt. löydös A-12).
3. `tests/test_exposure_parity.py`: ajaa vanhan ja uuden reitin rinnakkain kaikille
   57 maalle × 1990–2024 ja raportoi erot. Lähtötaso on jo mitattu: keskim. 0.203,
   maks. 0.626 (löydös A-2). **Erot raportoidaan, ei piiloteta.**
4. Poista löydöksen A-3 kuollut koodi `personal.py:81–91` erillisenä, katselmoitavana
   muutoksena.

Legacy-reitti pysyy oletuksena koko vaiheen ajan.

### Vaihe C — ASFR-perusta · **valmis 2026-08-19**

Sulki aukon G-1.

1. ✅ UN WPP 2024 haettu `raw/`-hakemistoon manifestin ja tarkistussummien kanssa
   (`wpp2024_2026-08-19.manifest.json`). Avoin data, CC-BY-3.0-IGO, ei lupapyyntöä
2. ✅ Muunnettu kahdeksi kanoniseksi tuotteeksi
   [`berm/data/wpp.py`](../berm/data/wpp.py):llä, molemmat sopimusvalidoituja **ennen
   kirjoitusta** — virheellinen tuote ei koskaan päädy levylle:

   | Tuote | Rivejä | Koko |
   |---|---|---|
   | `fertility_asfr_region_age_year.csv` | 250 509 | 52 MB |
   | `fertility_tfr_region_year.csv` | 35 787 | 7 MB |

   237 maata, 1950–2100, 7 ikäryhmää (15–49)
3. ✅ Rajapinta toteutettu: `load_asfr`, `load_asfr_series`, `load_tfr`, `asfr_to_tfr`,
   `asfr_tfr_accounting`, `coverage`. **Puuttuva vuosi palauttaa `None`** — legacy-taulukon
   hiljainen lineaarinen interpolointi on poistettu
4. ✅ Tilinpitotesti läpäisty: keskim. jäännös **0.39 %**, 99.2 % maa-vuosista 2 %:n sisällä.
   Jäännös **raportoidaan** `asfr_tfr_accounting`issa eikä absorboida. Se on kaksisuuntainen:
   systemaattinen negatiivinen osa tulee 10–14- ja 50–54-ryhmien poissulkemisesta, loput
   siitä että WPP laskee TFR:n yksivuotisikäryhmistä
5. ✅ `berm/data/asfr.py:WPP_ASFR` jätetty **koskemattomaksi** (säännöt 5 ja 10).
   Rinnakkaisvertailu ajettu ja ero kirjattu: keskim. 26.2 %, maks. 59.0 %, legacy
   matalampi 96 %:ssa maa-vuosista

**Kaksi asiaa, jotka tekivät tilinpitotestistä aidon testin:**

ASFR ja TFR ingestoidaan **kahdesta eri WPP-tiedostosta**, eikä kumpaakaan johdeta
toisesta. Jos TFR laskettaisiin ASFR:stä, identiteetti olisi tautologia eikä testi.
`test_accounting_reports_rather_than_absorbs` vaatii nimenomaisesti, ettei jäännös ole
tasan nolla.

Estimaatit ja projektiot erotetaan: 1950–2023 on `OBSERVED`, 2024–2100 on `DERIVED`,
koska projektio on mallin tuotos eikä maailman mittaus. Jokainen rivi kantaa
`series_status`-kentän, joten niitä ei voi hiljaa keskiarvoistaa yhteen.

Sivutuotteena WPP:n julkaisemat 95 %:n ennustevälit projektiovuosille täyttävät sopimuksen
epävarmuusvaatimuksen **aidosta lähteestä** — estimaattivuosille väliä ei keksitä, koska
WPP ei sellaista julkaise.

**Jäljelle jää:** `outcomes/asfr_model.py`:n siirto uuteen lähteeseen. Se on erillinen
muutos, koska se muuttaa ASFR-reitin tuloksia ja vaatii oman rinnakkaisvalidointinsa.

### Vaihe D — kysyntätila ja väestökoostumus

Riippuu aukoista G-9, G-14.

Korvaa `CULTURAL_PRONATALISM` eksplisiittisellä kysyntätilalla:

```
D_{a,c,t} = f(lapsitoive, ehkäisy, pariutuminen, politiikka, talous)
```

Nämä eivät ole kontrollimuuttujia. Ne ovat oma mallin osansa, joka kuvaa lapsen
hankkimisen *toivetta ja mahdollisuutta* — erillään biologisesta kapasiteetista.

Maahanmuutto integroidaan kohortti- ja sukupolvitasolla
(`origin_country`, `arrival_year`, `generation`, `duration_in_host_country`).
Pysyvää `immigrant TFR` -arvoa ei käytetä.

### Vaihe E — kolme biologista välitulosta

Kytketään korkeintaan kolme, ja vain jos mitattu päätetapahtuma on olemassa:

1. `sperm_DNA_fragmentation_or_motility`
2. `ART_demand_or_TTP`
3. `miscarriage_or_live_birth_probability`

Reservitila toteutetaan vain, jos sen parametrit ovat eksplisiittisiä:

```
R_{t+1} = R_t − damage(E_t; θ_d) + recovery(R_t; θ_r)
```

`θ_d` ja `θ_r` menevät parametrirekisteriin arvosanoin. **CatSper, CRY, mikrobiomi, BBB,
R42 ja PSD pysyvät diagnostisina**, kunnes niiden yhteys havaittuun välitulokseen on
dataan perustuvasti kalibroitu.

### Vaihe F — data-driven-reitti rinnakkaisena · **ensimmäinen versio valmis 2026-08-19**

Toteutettu [`berm/model_data_driven.py`](../berm/model_data_driven.py):ssä ja
[`berm/outcomes/asfr_data_driven.py`](../berm/outcomes/asfr_data_driven.py):ssä.
Legacy-reittiä ei korvattu eikä `model.py`:tä muutettu.

```python
result = predict_data_driven(
    geography="FIN", year=2030,
    model_version="reserve-asfr-v1",
    exposure_scenario="observed_plus_projection",
)
```

Palauttaa kaikki kahdeksan vaadittua kenttää. Suomi 2030: TFR **1.016**, herkkyysväli
[1.006, 1.023]; UN:n oma mediaaniprojektio samalle vuodelle on 1.323, 95 %:n väli
[1.023, 1.599].

**Reitti on rehellinen siitä, mihin se nojaa.** `input_provenance` merkitsee ASFR-perustan
`OBSERVED`-luokkaan tarkistussummineen, mutta altistuksen `SCENARIO_PARAMETER`-luokkaan ja
`is_proxy=True`-lipulla, koska altistusreitti on yhä kovakoodattu käyrä (A-2); ja
kulttuuritason `DERIVED`-luokkaan maininnalla "one free parameter per observation" (A-4).

**Epävarmuusväli on tarkoituksella vaatimaton.** Se on *one-at-a-time* -verhokäyrä
rekisteröityjen parametrivälien yli, ei luottamusväli, ja tulos sanoo sen
(`is_confidence_interval: False`). Se kattaa 7 parametria 66:sta, koska vain
moduulitason vakiot ovat vaihdeltavissa. **`bio_capacity.b` — mallin vaikutusvaltaisin
luku — on funktion sisäinen literaali `v16.py:473` eikä ole vaihdeltavissa lainkaan.**
Tämä on itsessään falsifioitavuuden puute, ja se raportoidaan jokaisessa tuloksessa.
Kapea väli heijastaa herkkyysanalyysin kattavuutta, ei ennusteen tarkkuutta — myös tämä
on eksplisiittinen varoitus tuloksessa.

Diagnostiset mekanismit luetaan `v16`:n docstringeistä ajonaikaisesti, joten lista ei voi
ajautua erilleen koodista: `vagal_oxytocin_pathway`, `oxytocin_dual_pathway_diagnostic`,
`behavioral_quadruple_suppression`, `endogenous_ssri_model`, `sempou_mtor_effect`,
`feedback_amplification`.

---

## 3. Vaihtoehdon ehdot

Legacy-reittiä **ei korvata** ennen kuin kaikki seitsemän täyttyy. Nykytila kunkin kohdalla:

| # | Ehto | Tila |
|---|---|---|
| 1 | Kaikki aktiiviset syötteet jäljitettävissä lähteeseen tai parametrijärjestelmään | Rekisteri kattaa ne; **84 % on oletuksia**, mikä on jäljitettävää mutta ei riittävää |
| 2 | Kaikilla proxyilla `proxy_flag=True` | Sopimus pakottaa; aktiivinen reitti ei vielä käytä sopimusta |
| 3 | Ei piilotettuja maakohtaisia TFR-residuaaleja | **Ei täyty** — `calibrate_v16` on yksi vapaa parametri per havainto (löydös A-4) |
| 4 | ASFR-ennuste tuottaa TFR:n summana | **Perusta valmis** — kanoninen tuote täyttää identiteetin 0.39 %:n jäännöksellä; jäljellä `outcomes/asfr_model.py`:n siirto |
| 5 | Data-driven-reitti palauttaa epävarmuusvälit | **Osin** — verhokäyrä toteutettu, mutta kattaa 7/66 parametria; `bio_capacity.b` ei ole vaihdeltavissa |
| 6 | Vanhan ja uuden erot raportoidaan | **Kyllä** — ks. luku 4b |
| 7 | Toteutetut ja diagnostiset mekanismit erotettu | **Kyllä** — `diagnostic_mechanisms()` lukee erottelun v16:n docstringeistä ja palauttaa sen jokaisessa tuloksessa |

### 4b. Rinnakkaisvalidoinnin tulokset (2026-08-19)

**A. Datalähteen vaikutus, moottori vakiona.** Sama ASFR-moottori, vain perusta vaihtuu
(171 maa-vuotta, 2030/2040/2050):

- keskimääräinen |suhteellinen ero| **29.5 %**, mediaani 30.1 %, maksimi 59.0 %
- WPP-pohjainen korkeampi **96 %:ssa** tapauksista
- suurimmat: Kambodža +59 %, Myanmar +58 %

**B. Koko reitti, moottori ja data molemmat eri** (57 maata, 2030):

- keskimääräinen |suhteellinen ero| **25.0 %**, mediaani 21.6 %
- data-driven matalampi 58 %:ssa — ero ei siis ole yksisuuntainen, toisin kuin A:ssa
- suurimmat: Singapore +100 % (ks. löydös A-15), Vietnam +61 %, Iran −60 %

Vertailu A eristää datalähteen vaikutuksen; vertailu B ei. Molemmat raportoidaan, koska
niiden sekoittaminen antaisi vaikutelman, että 25 %:n ero johtuu datasta.

**Rinnakkaisajo löysi virheen, jota staattinen luenta ei löytänyt:** legacy-reitti puristaa
Singaporen TFR:n tasan nollaan kaikkina vuosina. Ks. löydös A-15.

Ehdot 3 ja 4 ovat vakavimmat: ne tarkoittavat, ettei nykyinen malli läpäisisi omaa
hyväksymiskriteeristöään edes silloin, jos kaikki data olisi paikallaan.

---

## 4. Validointijärjestys

1. Datavalidointi ja yksikkötestit — **valmis** (86 testiä)
2. Lähde- ja provenanssitestit — **valmis**
3. ASFR → TFR -tilinpito — **valmis**, 35 787 maa-vuotta tarkistettu, keskim. jäännös 0.39 %
4. Historiallisen altistusdatan ja vanhan diffuusiokäyrän erot — lähtötaso mitattu, testi odottaa vaihetta B
5. Alueellinen analyysi — estetty (G-8)
6. Yhteisöaineisto — estetty (löydös A-5: x-akseli on oletettu)
7. Sentinellipaneeli — estetty (G-3, G-5, G-6)
8. Ennakkorekisteröity prospektiivinen testi — ks. alla

---

## 5. Jäädyttämisen ehdot

Prospektiivinen testi on kelvollinen vasta, kun seuraavat jäädytetään yhdessä:

```
data vintage · source registry version · equations · parameter registry version
uncertainty method · comparison models · forecast targets · evaluation date
```

Rekisterit ja manifestit tekevät neljä ensimmäistä mahdolliseksi jo nyt: tarkistussumma
kiinnittää aineiston, ja `tests/test_provenance.py::test_every_manifest_checksum_still_matches`
kaatuu, jos artefakti muuttuu ilman manifestin päivitystä.

Loput neljä odottavat vaihetta F. **Mitään ennustetta ei pidä esittää ennakkorekisteröitynä
ennen kuin ehdot 3 ja 4 luvussa 3 täyttyvät**, koska maakohtainen residuaali tekee
takautuvasta sovituksesta kehäisen eikä ennustavan.

---

## 6. Mitä tämä suunnitelma ei väitä

Se ei väitä, että EMF-altistus aiheuttaa hedelmällisyyden laskua. Kausaalihypoteesi
`E → R → Φ → ASFR → TFR` on tutkimushypoteesi, ja tämä työ tekee siitä testattavan
sen sijaan että vahvistaisi sitä.

Se ei myöskään väitä, että mikään yksittäinen proxy tai sentinellitrendi osoittaisi
EMF-kausaalisuutta. Mobiililiittymät korreloivat kaiken taloudellisen kehityksen kanssa;
koirasperman lasku on yhdestä laitoksesta ilman altistusmittausta; mehiläisten
talvikuolleisuus ei ole lisääntymismittari. Nämä rajoitteet on kirjattu lähderekisterin
`known_limitations`-sarakkeeseen, jonka tyhjyys on validointivirhe.
