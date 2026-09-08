# Navigaatiokorjauksen mallin toimintatesti 8.9.2026

**Uusimman main-version 2 120 ei-hidasta testiä läpäisivät tarkistuksen.** Epäonnistuneita testejä tai ohituksia ei jäänyt. Ajo käsitti 100 testitiedostoa ja kesti 136,82 sekuntia. Kaksi erikseen hitaaksi merkittyä paneelisovitustestiä rajattiin toimeksiannon mukaisesti pois.

**Täydennys:** myös kaksi hitaaksi merkittyä testiä läpäisivät [erillisen 6,85 sekunnin ajon](NAVIGATION_REPAIR_MODEL_SLOW_CHECKS_2026-09-08.md). Kokonaiskattavuus on siten **2 120 standarditestiä + 2 hidasta testiä = kaikki 2 122 testiä läpi**. Alla oleva taulukko säilyttää alkuperäisten ei-hitaiden ajojen tulokset.

Tämä on uusi ajo työpuussa `/Users/ottojuote/.berm-navigation-repair-20260908`, jonka lähtöversio on `eb1b0621ee65ca611eb6abb94f472c49af7f9092`. Se sisältää mainiin lisätyn fysiikan ja farmakologian. Aiemman työpuun saman päivän **2 011 testin tulosta ei käytetä tämän version tuloksena**. Tarkistus koskee ohjelmiston toimintaa ja laskentadatan yhdenmukaisuutta.

## Ajot ja aineistojen saatavuus

| Ajo | Läpi | Epäonnistui | Ohitettiin | Rajattiin pois |
|---|---:|---:|---:|---:|
| Puhdas main-työpuu ennen paikallisten syötteiden tuontia | 2 020 | 26 | 74 | 2 |
| Täsmälleen edellisen ajon 26 epäonnistuneen ja 74 ohitetun testin uusinta | 100 | 0 | 0 | 0 |
| Lopullinen koko ei-hidas sarja aineistojen ollessa saatavilla | 2 120 | 0 | 0 | 2 |

Ensimmäisestä työpuusta puuttuivat Gitin tarkoituksella sivuuttamat paikalliset tutkimusaineistot. Puute vaikutti muun muassa WPP:n ASFR/TFR-syötteisiin, World Bankin aikasarjoihin ja raakalähteiden saatavuustarkistuksiin. Alkuperäisestä työpuusta tuotiin 53 puuttuvaa syötetiedostoa täsmällisinä kopioina: 45 raakadataa ja 8 valmista syötettä, yhteensä 395 698 330 tavua. Kaikki 45 raakadataa täsmäsivät **uuden main-version omien manifestien SHA256-tarkisteisiin ennen kopiointia**.

Jokainen kohde tarkistettiin puuttuvaksi, Gitin sivuuttamaksi ja seurattujen tiedostojen ulkopuoliseksi. Tiedostoja ei ylikirjoitettu eikä aineistoja muunnettu. Kopioiden polut, lähdepolut, tarkisteet ja raakamanifestit on kirjattu koneelliseen raporttiin. Kaikki 100 aineiston puuttumisen vuoksi epäonnistunutta tai ohitettua testiä läpäisivät uusinnan; sen jälkeen myös koko sarja läpäisi tarkistuksen.

## Pyydetyt laskentaketjut ja sivustosynkat

| Nykyinen testitiedosto | Läpi | Tarkistuksen kohde |
|---|---:|---|
| `test_civilization_site_sync.py` | 52 | Sivuston sivilisaatiolukujen ja mallilaskennan vastaavuus |
| `test_modulome_site_sync.py` | 8 | Moduloomin lähde- ja latausmanifestien vastaavuus |
| `test_modulome_reproductive_route.py` | 20 | Ehdollinen ASFR/TFR-reitti ja kolme sivustovientiä |
| `test_reproductive_calendar.py` | 13 | Raskaus, synnytyksen jälkeinen aika, menetyksen jälkeinen paluu, pariteetti ja massan säilyminen |
| `test_reproductive_waiting.py` | 25 | Odotusajan ja heterogeenisuuden laskenta |
| `test_interaction_operators.py` | 20 | Vuorovaikutusoperaattorit |
| `test_model_architecture_contract.py` | 12 | Nykyisten laskentareittien rakenteelliset sopimukset |
| `test_lindgren_response.py` | 18 | Nykyisen vasteoperaattorin ohjelmalliset sopimukset |
| `test_intervention_registry.py` | 11 | Farmakologiaprofiilien peilikopiot ja lähde-, väite- ja atlasviitteet |
| `test_intervention_protocol.py` | 43 | Farmakologisten protokollien laskenta ja vientien toistettavuus |

Ladattavan ehdollisen skenaariotiedoston kaikki neljä esimerkkiä ajettiin tuoreeltaan kahdella julkisella komentorivireitillä: `scenario` ja `predict --route modulome --scenario`. **Kaikki 8 tulosta täsmäsivät kokonaisina JSON-rakenteina sivustolla julkaistuihin tuloksiin**, mukaan lukien seitsemän ASFR-ikäryhmää ja TFR. Esimerkit ovat `equal-energy-timing`, `hormone-phase`, `repair-capacity` ja `waiting-heterogeneity`.

## Uusin farmakologia

Nykyisessä mainissa on **8 koeprofiilia ja 12 laskentaesimerkkiä; jokaisessa on neljä vertailuhaaraa** (`sham`, `field`, `drug`, `field_drug`). Neljä tarkoittaa siis vertailuhaaroja. Tarkistetut profiilit ovat `mt2_brake`, `local_ltype_erk`, `channel_selectivity`, `lipid_ttype_inhibition`, `channel_density_store_history`, `cry_fad_competition`, `drug_photochemistry` ja `coq10_response`.

Farmakologian 54 testiä kattavat profiilien kytkennät, ajastuksen ja pesun, nollakytkennän, kalsiumin säilymisen, paikallisen ja kokonaisvasteen erottelun, puskurikinetiikan, kanavaselektiivisyyden, varastohistorian, CRY/FAD:n, valokemian, CoQ10:n vaikutuspaikat ja 12 esimerkin vientien toistettavuuden. Molemmat farmakologian vientikomennot `export_intervention_profiles.py --check` ja `export_interventions.py --check` läpäisivät tarkistuksen. Myös `export_conditional_scenarios.py --check` läpäisi tarkistuksen. Tarkistustila laskee ja vertaa olemassa oleviin tiedostoihin kirjoittamatta niitä uudelleen.

## Säilyminen ja toistaminen

Lopputarkistuksessa koko seurattu `berm/`-puu vastasi täsmälleen lähtöversiota `eb1b062`. Myös 11 erikseen tarkistettua mallin ja sivuston laskentadatatiedostoa sekä kaikki 53 lisättyä paikallista syötettä säilyivät tarkisteiltaan ennallaan. Tuotantosivuston dataa, mallikoodia tai rekistereitä ei muutettu tässä toimintatestissä.

Ajoympäristö oli Python 3.13.1, pytest 8.4.1, NumPy 2.2.1 ja SciPy 1.17.1. Projektin asetukset ovat `berm/pyproject.toml`-tiedostossa: testihakemisto on `tests`, ja ainoa erillinen hitausmerkintä on `slow`. Koko ajon toistokomento `berm/`-hakemistossa on:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m pytest -m 'not slow' -q -p no:cacheprovider
```

[Koneellinen tulos, tarkisteet ja syöteprovenienssi](NAVIGATION_REPAIR_MODEL_CHECKS_2026-09-08.json) sekä [kaikkien kolmen ajon lokit](NAVIGATION_REPAIR_MODEL_CHECKS_2026-09-08.log) säilyttävät myös alkuvaiheen aineistopuutteet. Verkkosivuston selaintoiminta, tuotantokäännös ja julkaisuvarmennus raportoidaan erikseen.
