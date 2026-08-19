# BERM: data lineage -auditointi

Versio: 2026-08-19
Status: Vaihe 0 valmis. Kuvaa tilanteen sellaisena kuin se on, ei sellaisena kuin sen pitäisi olla.
Auditoitu commit: `main`, työpuu likainen (6 muokattua tiedostoa, `berm/berm/demographics/` seuraamaton).
Testien lähtötila: 560 testiä läpi ennen tätä työtä.

Tämä dokumentti vastaa yhteen kysymykseen: **mistä jokainen aktiivisen ennusteen luku
tulee?** Se ei arvioi, onko malli oikeassa. Se selvittää, voiko sen väitteitä jäljittää.

Luokittelu on kolmiportainen ja sitä ei saa sekoittaa missään käyttöliittymässä,
dokumentissa tai mallin tulosteessa:

| Merkintä | Tarkoitus |
|---|---|
| `OBSERVED` | Kohdesuureen mittaus siteeratusta aineistosta |
| `PROXY` | Jonkin *muun* suureen mittaus, joka seisoo kohdesuureen paikalla |
| `SCENARIO_PARAMETER` | Mallintajan valitsema oletus |

Koneluettava versio: [`../data/registry/source_registry.csv`](../data/registry/source_registry.csv)
ja [`../data/registry/parameter_registry.csv`](../data/registry/parameter_registry.csv).
Sopimus, joka pakottaa nämä: [`../berm/data/contracts.py`](../berm/data/contracts.py).

---

## 1. Ydinlöydös

Aktiivinen ennuste `berm.model.predict_country_year` **ei lue yhtäkään ladattua
havaintoaineistoa.** Jäljitin sen tuontipuun ajonaikaisesti:

```
berm.model → berm.data.countries, berm.exposure.{ambient,personal,lindgren,military_ambient},
             berm.v16, berm.tfr, berm.hindcast, berm.biology.*, berm.config
```

Listalla ei ole `berm.data.loader`, `berm.data.itu` eikä `berm.data.asfr`. Repossa on
58 976 riviä jäsennettyä World Bank -dataa `data/processed/`-hakemistossa, ja aktiivinen
altistusreitti käyttää sen sijaan `exposure/personal.py:tech_penetration_profile`-funktion
kovakoodattua potenssikäyrää.

Numeroina, mitä mallia ajaa: parametrirekisterin 70 merkinnästä **59 (84 %) on oletuksia**
(37 `SCENARIO`, 22 `UNIDENTIFIED`), 10 on estimoituja ja 1 on luokiteltu mitatuksi — eikä
sekään kanna siteerausta koodissa.

---

## 2. Muuttujataulukko

Sarake "Käyttääkö aktiivinen ennuste?" tarkoittaa `predict_country_year`-reittiä.
"v16/ASFR" tarkoittaa, että muuttuja vaikuttaa vain toteutettuun mutta ei-aktiiviseen
ASFR-reittiin.

| Muuttuja | Nykyinen lähde | Tiedostopolku | Havainto/proxy/oletus | Ajallinen taso | Maantieteellinen taso | Käyttääkö aktiivinen ennuste? | Puute |
|---|---|---|---|---|---|---|---|
| TFR (kalibrointikohde) | Käsin kirjoitettu taulukko | `berm/data/countries.py:813` `V12_ACTUAL_TFR_2024` | `OBSERVED` (siteeraamaton) | Yksi vuosi (2024) | 57 maata | kyllä (v16-kalibrointi) | Ei lähdettä, ei hakupäivää, ei epävarmuutta. Ei täsmää ladatun WB-sarjan kanssa |
| TFR (historia) | Käsin kirjoitettu taulukko | `berm/data/countries.py:360` `HISTORICAL_TFR` | `OBSERVED` (siteeraamaton) | 9 poimittua vuotta | **5 maata** | kyllä (hindcast) | Kattaa 5/57 maata. `loader.py` täydentää loput WB:stä, mutta vain jos sitä kutsutaan |
| TFR (ladattu) | World Bank `SP.DYN.TFRT.IN` | `data/raw/wb_tfr.json` → `data/processed/tfr_by_country_year.csv` | `OBSERVED` | Vuosittain 1960–2023 | 266 taloutta | **ei** | Ladattu, jäsennetty, tarkistussummattu — eikä koskaan luettu ennusteessa |
| ASFR | Käsin kirjoitettu taulukko | `berm/data/asfr.py:17` `WPP_ASFR` | **Kiistanalainen — ks. löydös A-1** | 5 poimittua vuotta (1990–2024) | 57 maata | ei (v16/ASFR) | Väittää WPP 2024 -lähdettä. Ei tiedostoa, ei tarkistussummaa. Rikkoo TFR-identiteetin 57/57 maassa |
| Mobiililiittymät | World Bank `IT.CEL.SETS.P2` | `data/processed/mobile_by_country_year.csv` | `PROXY` | Vuosittain 1960–2023 | 266 taloutta | **ei** | Luetaan vain `stats/csli.py`:ssä. Liittymä ei ole ihminen eikä annos |
| Mobiilidiffuusio (käytössä) | Kovakoodattu potenssikäyrä | `berm/exposure/personal.py:76` | `SCENARIO_PARAMETER` | Vuosittain, jatkuva | **22 maata inline-dictissä**, 35 putoaa oletukseen | **kyllä** | Poikkeaa havainnosta keskim. 0.203 (maks. 0.626); ks. löydös A-2 |
| Internet | World Bank `IT.NET.USER.ZS` | `data/processed/internet_by_country_year.csv` | `PROXY` | Vuosittain 1990–2023 | 266 taloutta | ei | Käytetään vain 3G/4G-alkuvuosien arvaamiseen `parse_all.py`:ssä |
| Laajakaista | World Bank `IT.NET.BBND.P2` | `data/processed/broadband_by_country_year.csv` | `PROXY` | Vuosittain 1998–2023 | 266 taloutta | ei | Kiinteä laajakaista on langallinen suure; Wi-Fi-proxyna se olettaa mittaamattoman reititinsuhteen |
| 2G/3G/4G/5G-diffuusio | Käsin kirjoitettu | `berm/data/countries.py:298` `TECH_DIFFUSION` | `SCENARIO_PARAMETER` | Sukupolven alkuvuosi | 57 maata | ei — **kuollutta koodia**, ks. A-3 | `parse_all.py` osaa johtaa nämä datasta, mutta tulos menee `data/berm/country_params.json`-tiedostoon, jota kukaan ei lue |
| Väestötiheys, metro-osuus | Käsin kirjoitettu | `berm/data/countries.py:37` `COUNTRY_PARAMS` | `SCENARIO_PARAMETER` / `ESTIMATED` | Staattinen, ajaton | 54 maata | **kyllä** | Ei vuosiulottuvuutta lainkaan: 1995 ja 2050 saavat saman tiheyden. Ei lähdettä |
| Kaupungistuminen (ladattu) | World Bank `SP.URB.TOTL.IN.ZS` | `data/processed/urban_by_country_year.csv` | `OBSERVED` | Vuosittain 1960–2023 | 266 taloutta | **ei** | 17 160 riviä jäsennetty; **yksikään moduuli ei lue tiedostoa** |
| Henkilökohtaiset kontaktitunnit | Kovakoodattu porrasfunktio | `berm/exposure/personal.py:14` | `SCENARIO_PARAMETER` | 6 aikaporrasta | **globaali vakio** | **kyllä** | Ei ikä-, sukupuoli- eikä maaulottuvuutta. Suurin mittaamaton suure koko `E_personal`-kanavassa |
| Yöaltistus (prevalenssi) | Kovakoodattu porrasfunktio | `berm/exposure/personal.py:29` | `SCENARIO_PARAMETER` | 4 aikaporrasta | **globaali vakio** | **kyllä** | `countries.py:684 SMARTPHONE_IN_BEDROOM` sisältää maakohtaiset arvot samalle suureelle, mutta tämä funktio ei käytä niitä |
| Yön biologinen paino | Kovakoodattu `2.5` | `berm/exposure/personal.py:51` | `UNIDENTIFIED` | — | — | kyllä | Ei lähdettä |
| Wearablet | Johdettu `mobile_pen`-luvusta | `berm/exposure/personal.py:66` | `SCENARIO_PARAMETER` | Lineaarinen ramppi 2014→ | Johdettu maakohtaisesta liittymäluvusta | **kyllä** | Päätellään kansallisesta liittymäluvusta — juuri se päättely, jonka työohje kieltää |
| Kehitysvaiheen altistus | Ikäpainotettu kumulaatio | `berm/v16.py:272`; `outcomes/cohort_exposure.py:37` | `SCENARIO_PARAMETER` (painot) | Vuosittainen integrointi | Peritty altistuskanavilta | ei (v16/ASFR) | Painot 5.0/4.0/3.0/2.5/2.0 ovat oletuksia. Kaksi eri normalisointia samalle suureelle, ks. A-11 |
| Kulttuurinen pronatalismi | Käsin kirjoitettu additiivinen termi | `berm/data/countries.py:205` `CULTURAL_PRONATALISM` | `SCENARIO_PARAMETER` | Staattinen, ajaton | 54 maata | **kyllä** | Ulottuu arvoon +5.5 (Niger) eli suurempi kuin koko biologinen signaali. 32/54 merkitty "auto-generated" ilman generointimenettelyä |
| Kulttuurinen taso (v16) | Ajonaikainen sovitus | `berm/v16.py:768` `calibrate_v16` | `ESTIMATED` | Ankkuroitu vuoteen 2024 | 57 maata | ei (v16/ASFR) | Yksi vapaa parametri per havainto = maakohtainen residuaali, ks. A-4 |
| IVF/ART-osuus | Käsin kirjoitettu | `berm/data/countries.py:250` `IVF_SHARES` | `ESTIMATED` | Yksi perusvuosi (2023) | 55 maata | **kyllä** | Kollektiivinen viittaus "ESHRE, CDC, kansalliset rekisterit"; ei maakohtaista viitettä eikä vuotta. Käytetään skalaarikorjauksena, minkä tavoitearkkitehtuuri kieltää |
| Maahanmuutto | Käsin kirjoitettu | `berm/data/countries.py:918` `MIGRATION_DATA` | `SCENARIO_PARAMETER` | Vakio kaikille vuosille | 29 maata | kyllä (`native_tfr`) | Pysyvä "immigrant TFR" ilman ikä- ja sukupolvikomponenttia — työohjeen nimenomaisesti kieltämä muoto |
| Biomarkkerit (ihminen) | Rekonstruoitu sarja | `data/sentinel/sperm_by_country.json` | `PROXY` | 1973–2018, 5 v. välein | 24 maata | ei | Tiedosto itse toteaa: sarja on rekonstruoitu, ei julkaistu. Ei luottamusväliä, ei n-lukua |
| Koirasentinelli | Lea 2016 | `data/sentinel/lea2016_dog_sperm.json` | `OBSERVED` | 1988–2014 | **Yksi laitos, UK** | ei — **orpo tiedosto**, ks. A-9 | Digitoitu kuvaajasta (±2–3 yksikköä). Yksikään moduuli ei avaa tiedostoa |
| Härkäsentinelli | Ei numeerista dataa | `data/sentinel/livestock_negative_control.json` | — | Vain tutkimusjaksot | Paikantamaton | ei | **Tiedosto ei sisällä yhtään havaintoa.** F3 ja F4 eivät ole laskettavissa |
| Mehiläissentinelli | COLOSS | `data/sentinel/coloss_winter_loss.json` | `OBSERVED` | 2006–2025 (vain USA täysi) | 43 aluetta, ml. 4 alakansallista | ei (vain `stats/csli.py`) | Talvikuolleisuus ei ole lisääntymismittari. Sekamenetelmä. Ei varroa-, patogeeni- eikä torjunta-ainekovariaatteja |
| Lintusentinelli | PECBMS + Rosenberg 2019 | `data/sentinel/bird_index.json` | `OBSERVED` | 1970–2023, epäsäännöllinen | 17 maata + EU-aggregaatti | ei (vain `stats/csli.py`) | Runsausindeksi, ei lisääntymismittari |
| Masennuslääkkeet | Käsin kirjoitettu | `berm/data/countries.py:1002` | `SCENARIO_PARAMETER` | "viimeisin saatavilla" | 64 merkintää | ei (diagnostinen) | Ei vuosisaraketta. Sisältää ei-OECD-maita, joita OECD ei julkaise |

---

## 3. Numeroidut löydökset

### A-1 — `WPP_ASFR` ei voi olla puhdas WPP-poiminta

`berm/data/asfr.py` väittää docstringissään lähdettä "UN World Population Prospects 2024
Revision". Aineistoa ei ole ladattu: ei tiedostoa, ei tarkistussummaa, ei hakupäivää.

TFR on määritelmällisesti `5 × Σ ASFR / 1000`. Testasin identiteetin taulukon omia arvoja
vastaan:

- **57/57 maata** epäonnistuu > 5 % tasolla
- Keskimääräinen suhteellinen virhe **30.8 %**, suurin 59.1 % (Kambodža)
- **57/57 poikkeaa samaan suuntaan**: ASFR-summa on aina havaittua TFR:ää *pienempi*
- 87.0 % kaikista 1 995 arvosta on kokonaislukuja, 92.3 % puolikkaan monikertoja

Yksisuuntaisuus sulkee pois pyöristysvirheen ja WB-vs-WPP-määritelmäeron (ne ovat
molemmat kaksisuuntaisia ja suuruusluokkaa 0.2 syntymää/nainen, eivät 1.9).

#### Ratkaisu (2026-08-19): aineisto hankittu, löydös vahvistettu

Aito WPP 2024 -julkaisu on ladattu, tarkistussummattu ja muunnettu kanoniseksi tuotteeksi
(`UN_WPP_2024_ASFR`, `UN_WPP_2024_TFR`; ks. [`data-integration-plan.md`](data-integration-plan.md)
vaihe C). Vertailu vahvistaa löydöksen kiistattomasti:

| Mittari | Käsin kirjoitettu taulukko | Ladattu WPP 2024 |
|---|---|---|
| Keskim. jäännös TFR-identiteetissä | **30.8 %** | **0.39 %** |
| Maa-vuosia 2 %:n sisällä | — | **99.2 %** (35 787:stä) |
| Ero implikoidussa TFR:ssä | — | keskim. **26.2 %**, maks. 59.0 % |
| Suunta | 57/57 matalampi | legacy matalampi **96 %:ssa** 285 vertailukelpoisesta maa-vuodesta |

Esimerkkinä Suomi 2024, ikäryhmä 25–29: käsin kirjoitettu arvo 55.0, WPP:n arvo 70.826
(−22.3 %). Koko maan implikoitu TFR 1.028 vs. 1.294.

Yksisuuntaisuus ja suuruusluokka yhdessä osoittavat, ettei taulukko ole poiminta WPP:stä.
**Alkuperä jää tuntemattomaksi**; tämä auditointi toteaa vain, mitä se ei ole.

Legacy-taulukko on jätetty koskemattomaksi sääntöjen 5 ja 10 mukaisesti, ja
`tests/test_wpp_asfr.py::TestLegacyComparisonIsReportedNotHidden` lukitsee eron kokoluokan,
jotta hiljainen muokkaus huomataan.

**Tila: hankinta valmis. ASFR → TFR -tilinpito on nyt validoitavissa.**

### A-2 — Aktiivinen altistusreitti ohittaa ladatun datan

`tech_penetration_profile` vs. havaittu `IT.CEL.SETS.P2` (24 pisteen otos, 8 maata × 3 vuotta):
keskimääräinen itseisarvopoikkeama **0.203**, suurin **0.626** (Etiopia 2020: käyrä sanoo
saturaatiota 1.000, havainto on 0.374). Käyrä myös saturoituu arvoon 1.0 vuoteen 2010
mennessä useimmissa korkean tulotason maissa, kun taas havaittu liittymämäärä jatkaa
nousuaan yli 100/100 (Suomi 2010: 156/100).

Inline-parametridict kattaa 22 maata; loput 35 BERM-maata putoavat oletukseen
`(1995, 0.02)` hiljaisesti.

### A-3 — `tech_penetration_profile` sisältää kuollutta koodia

`berm/exposure/personal.py:81–91` hakee `TECH_DIFFUSION`-merkinnän, laskee `start_year`,
`half_year`, `span` ja johtaa `rate`-arvon — ja korvaa sen sitten ehdoitta rivillä 91
(`rate = 0.02`), minkä jälkeen rivi 106 ylikirjoittaa *sekä* `start_year`in *että* `rate`n
inline-dictistä. Koko `TECH_DIFFUSION`-haku on vaikutukseton.

Tämä on merkityksellistä auditoinnille, koska koodi *näyttää* käyttävän maakohtaista
diffuusiotaulukkoa eikä käytä.

### A-4 — v16-kalibrointi tuottaa maakohtaisen residuaalin

`calibrate_v16` ratkaisee jokaiselle 57 maalle `cult = target / (bio_cap × behav)`, missä
`target` on havaittu 2024 TFR IVF-korjattuna. Yksi vapaa parametri per havainto tarkoittaa,
että **otoksen sisäinen 2024-virhe on nolla rakenteen pakosta**. Mikä tahansa 2024-sovituksen
tarkkuusluku on kehäpäätelmä.

Ainoa ei-kehäinen luku on `loocv_v16`, joka korvaa poisjätetyn maan tason muiden 56 maan
*keskiarvolla* — olennaisesti heikompi malli kuin `v16_predicted_tfr` tuottaa. Lisäksi
`_calibrate_excluding` ei pyöristä tasoja eikä laske `_cohort_norm_factor`ia uudelleen,
joten LOOCV- ja tuotantopolku eivät ole bitti-identtisiä.

Työohjeen hyväksymiskriteeri 3 ("mallissa ei ole piilotettuja maakohtaisia TFR-residuaaleja")
**ei tällä hetkellä täyty.**

### A-5 — Yhteisösigmoidin x-akseli on oletettu

`COMMUNITY_DATA` (`countries.py:388`) antaa viidelle yhteisölle EMF-arvot 0.001, 0.05, 0.3,
0.5, 0.8. Yhdelläkään ei ole mitattua RF-altistusta. Sigmoidi sovitetaan näiden *oletettujen*
x-arvojen läpi, ja tulos raportoidaan muodossa `R² = 0.9986`. Neljä vapaata parametria
viidelle pisteelle: R² ei ole tässä yleistyvyyden mitta.

### A-6 — Henkilö- ja yöaltistus ovat globaaleja vakioita

`personal_contact_hours` ja `night_proximity_prevalence` eivät ota maata parametriksi
lainkaan (maa-argumentti on olemassa `personal_emf_exposure`issa mutta ohitetaan).
Samanaikaisesti `countries.py` sisältää maakohtaisen `SMARTPHONE_IN_BEDROOM`-taulukon,
jota aktiivinen reitti ei käytä. `v16.py:76` sisältää *toisen, eri* kontaktituntiportaikon
(katto 18 h) kuin `exposure/personal.py:14` (katto 14 h). Kaksi koodipolkua on eri mieltä
samasta fysikaalisesta suureesta.

### A-7 — ASFR-malli on toteutettu mutta ei aktiivinen moottori

`outcomes/asfr_model.py` on täysi toteutus, mutta `predict_country_year` ei tuo sitä.
ASFR-reitti on lisäksi rakennettu v16:n varaan (14 tuotua nimeä, kaksi niistä yksityisiä),
ei v17:n aktiivisen sigmoidireitin varaan, joten kaksi ennustereittiä eroaa toisistaan
sekä moottorin että kalibroinnin osalta.

### A-8 — `berm/data/itu.py` ei toimi tässä ympäristössä

Moduuli kirjoittaa välimuistin Parquet-muodossa (`to_parquet`, rivi 73). `pyarrow` ja
`fastparquet` puuttuvat ympäristöstä, joten `get_mobile_per100` nostaa `ImportError`in.
Moduulia ei myöskään kutsuta mistään. Sen `BERM_COUNTRIES`-dict kattaa 25 maata, kun
`loader.py` tuntee 57.

### A-9 — CSLI: 0/6 falsifikaatiotestiä suoritettu, kaksi aineistoa orpona

`berm/csli/falsification.py` on deklaratiivinen rekisteri: jokaisen F1–F6-merkinnän
`status` on `"untested"`, mitään statusta ei muuteta missään, eikä yhtäkään testifunktiota
ole olemassa. Ainoa laskeva funktio `exposure_gradient_test` tarkistaa monotonisuutta
**käsin annetuista** järjestysluvuista, ei ladatusta datasta.

Yksikään koodipolku ei avaa `lea2016_dog_sperm.json`- eikä
`livestock_negative_control.json`-tiedostoa. Koira- ja härkämoduulit käyttävät sen sijaan
käsin kirjoitettuja merkkijonoja (`"declining"`, `"variable (rose then plateaued)"`).

Lisäksi `berm/csli/` ja `berm/stats/csli.py` ovat kaksi erillistä kehystä, joilla on eri
lajilistat ja **eri biologiavakiot samoille lajeille** (mehiläisen viive 0.3 vs. 0.5 vuotta;
ihmisen sukupolviaika 74 vrk vs. 365×15 vrk).

### A-10 — RF-altistusta ei ole pariutettu yhteenkään biologiseen päätetapahtumaan

Yksikään viidestä sentinelli-JSON-tiedostosta ei sisällä RF-, EMF-, dosimetria-, SAR- tai
kentänvoimakkuussaraketta. Kaikki RF-viittaukset ovat vapaata tekstiä
(`"medium (base stations)"`) tai väitteitä ilman mittausta. `falsification.py:160` toteaa
tämän itse: *"No measured RF dosimetry for any species environment"*.

Ainoa kvantitatiivinen altistusproxy (mobiililiittymät) yhdistetään biologiaan vain
muistissa `stats/csli.py`:n sisällä, eikä koskaan mehiläisiä, lintuja, ihmisspermaa ja
TFR:ää pidemmälle — ei koskaan koiraan tai härkään.

### A-11 — Kolme rinnakkaista totuutta samoille suureille

1. **Kontaktitunnit:** `v16.py:76` (katto 18 h) vs. `exposure/personal.py:14` (katto 14 h)
2. **Kohorttinormalisointi:** `v16.py:341 _cohort_norm_factor` (globaali skalaari) vs.
   `outcomes/cohort_exposure.py:84 _normalize_cohort_cum` (per kutsu)
3. **Lajibiologia:** `csli/species_data.py:27` vs. `stats/csli.py:258`

### A-12 — Hiljaiset oletusarvot kattavuusaukoissa

`NUTRITION_PROFILES` kattaa 10 maata 57:stä. **47 maata (82 %) putoaa hiljaisesti**
oletukseen `{"antioxidant_index": 0.55, "diet_quality": 0.55}`, jolloin
`v12_nutrition_modifier` on vakio 1.01 valtaosalle paneelista. Vastaavat aukot:
`MIGRATION_DATA` puuttuu 28 maalta, `DEPRESSION_PARAMS` 8:lta, `CULTURAL_TFR_PARAMS` ja
`IVF_SHARES` kolmelta kumpikin.

Yksikään näistä ei tuota varoitusta.

### A-15 — Additiivinen kulttuuritermi voi pakottaa ennusteen nollaan

Löytyi rinnakkaisvalidoinnissa 2026-08-19, ei staattisessa lukemisessa.

`model.py:136` laskee `max(0.0, bio_sigmoid_tfr + cultural_component)`. Singaporelle
sigmoidi antaa 0.283 ja `CULTURAL_PRONATALISM["Singapore"]` on −0.30, joten summa on
negatiivinen ja **puristuu hiljaa tasan nollaan**. Ennuste on 0.000 vuosina 2030, 2040 ja
2050. Se on ainoa maa 57:stä, jolle näin käy tällä hetkellä.

Kaksi ongelmaa kertautuu:

1. Kulttuuritermi on `SCENARIO_PARAMETER`, ja se voi ylittää koko biologisen signaalin.
   Nollaan puristuminen ei ole ennuste vaan artefakti.
2. Singaporen `combined_emf` on **2.0 eli tarkalleen `effective_emf_field`in
   tanh-katto**. Altistus on saturoitunut, joten ennuste on identtinen 2030, 2040 ja 2050 —
   vakio vuosikymmenten yli. Se on katon ominaisuus, ei demografiaa.

`model.py` on käyttäjän muokkaustyön alla eikä sitä muutettu (sääntö 10). Nykylaajuus on
lukittu testillä `tests/test_data_driven_route.py::TestDefectsSurfacedByParallelValidation`,
joka kaatuu jos nollaan puristuvien maiden joukko muuttuu.

### A-13 — `bio_capacity.a = 6.5` on kovakoodattu neljään paikkaan

`v16.py:473`, `1203`, `1204` ja `1384`. Yhden muuttaminen desynkronoi muut hiljaisesti.
Sama koskee hormonivakioita (`v16.py:562–567`, toistettu riveillä `648–662` ja `1104–1111`).

---

## 4. Mitä data mahdollistaa ja mitä ei

**Mahdollistaa nyt:**
- Maa-vuosi-tason TFR-hindcastin havaittua WB-sarjaa vastaan (kun reitti kytketään)
- Mehiläisten talvikuolleisuuden ja mobiiliproxyn välisen korrelaatioanalyysin 39 alueella
- Lintuindeksin ja mobiiliproxyn välisen analyysin 17 maassa
- Parametrien herkkyysanalyysin, nyt kun jokaisella rekisteröidyllä parametrilla on väli

**Ei mahdollista, eikä lähitulevaisuudessa ilman uutta hankintaa:**
- Mitään kohorttitason väitettä: ASFR-pohja ei läpäise omaa tilinpitoidentiteettiään (A-1)
- Mitään henkilöannosväitettä: kontaktitunnit ovat globaali vakio ilman ikä- tai
  sukupuoliulottuvuutta (A-6)
- Mitään alueellista väitettä: ainoa alakansallinen aineisto on 4 UK:n mehiläisaluetta,
  jotka pudottavat liitoksessa
- Mitään koira–ihminen-viiveväitettä: koira-aineisto on yksi laitos yhdessä maassa (A-9)
- Mitään härkä-negatiivikontrolliväitettä: numeerista dataa ei ole lainkaan
- Mitään RF-annos-vaste-väitettä millekään lajille: RF:ää ei ole mitattu missään (A-10)
- Mitään lykkäämisen ja lopullisen toteutumattomuuden erottelua: parity-dataa ei ole

**Mikään yksittäinen proxy tai sentinellitrendi tässä repossa ei osoita EMF-kausaalisuutta.**
Mobiililiittymät korreloivat kaiken kehityksen kanssa; `stats/csli.py:612` toteaa tämän itse.

---

## 5. Vastaukset hyväksymiskriteereihin (Vaihe 0:n jälkeen)

| # | Kysymys | Tila |
|---|---|---|
| 1 | Mistä jokainen aktiivisen ennusteen luku tulee? | **Vastattu** — luetteloitu yllä ja `parameter_registry.csv`:ssä |
| 2 | Onko se havainto, proxy vai oletus? | **Vastattu** — 84 % aktiivisista parametreista on oletuksia |
| 3 | Yksikkö, kattavuus, geografia, epävarmuus? | **Osittain** — yksiköt ja kattavuus kirjattu; epävarmuus puuttuu lähes kaikilta |
| 4 | Miten se vaikuttaa E/D/R/ASFR/TFR:ään? | **Vastattu** — `affects`-sarake |
| 5 | Mitkä mekanismit ovat aktiivisia? | **Vastattu** — `active_model_version`-sarake |
| 6 | Mitkä aukot estävät alue-/kohortti-/sentinellitestin? | **Vastattu** — [`data-gap-register.md`](data-gap-register.md) |
| 7 | Mitkä ennusteet voidaan jäädyttää? | **Ei vielä** — vaatii vaiheet 1–8 |

Kriteeri 3 vaatii epävarmuusvälien lisäämisen; kriteeri 7 odottaa data-driven-reittiä.
Nämä on aikataulutettu [`data-integration-plan.md`](data-integration-plan.md)-dokumentissa.
