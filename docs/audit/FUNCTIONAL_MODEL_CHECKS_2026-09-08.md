# Mallin toimintatarkistus — 8.9.2026

**Tulos:** 2 011 testiä läpäisi; ei epäonnistumisia, virheitä tai ohitettuja testejä. Kaksi ennalta `slow`-merkittyä paneelisovitustestiä rajattiin pois. Lisäksi sivuston neljä ladattavaa skenaariota toistettiin molemmilla komentorivin käyttötavoilla: **8/8 kokonaistulosta vastasi täsmälleen julkaistavaa paikallista dataa**.

Tarkistus koski nykyisen työpuun mallin ajettavuutta, syötevalidointia, laskentasopimuksia ja sivuston laskentadatan synkronointia. Se ei ollut mallin tieteellisen evidenssin uudelleenarviointi. Koodia, rekistereitä tai laskentadatan tiedostoja ei muutettu tässä tarkistustehtävässä.

## Ajettu ympäristö ja rajaus

- Työpuu: `/Volumes/kovalevy 3/extinctionfield`, olemassa olevat paikalliset muutokset mukana. HEAD `7a938dd3b528a76008557632fdaf0dca72e13dea`; tulos ei tarkoita pelkän HEAD-commitin testaamista.
- Aloitus: 2026-09-08T07:56:11.202346+03:00 (Europe/Helsinki).
- Python 3.13.1, pytest 8.4.1, NumPy 2.2.1, SciPy 1.17.1; macOS-26.6.2-arm64-arm-64bit-Mach-O.
- Asetukset: [berm/pyproject.toml](../../berm/pyproject.toml), testihakemisto `tests`. `slow` on määritelty paneelien uudelleensovituksille.
- Sarja sisältää 93 testitiedostoa ja kaikki nykyiset testit lukuun ottamatta kahta `slow`-tapausta. Kesto oli **130,61 sekuntia**.

Ajokomento hakemistosta `berm`:

```text
PYTHONDONTWRITEBYTECODE=1 python3 -m pytest -m 'not slow' -q -p no:cacheprovider --junitxml=/tmp/berm-functional-model-2026-09-08.xml
```

Pois rajattiin `test_dual_kernel_is_not_separable_on_the_fertility_panel` ja `test_age_resolved_fast_kernel_and_declining_slope` tiedostosta `tests/test_dual_kernel.py`. Rajaus vastaa aiemman [integraatiojulkaisun](INTEGRATION_RELEASE_2026-09-07.md) koko ei-hitaan sarjan periaatetta. Alla olevat luvut ovat tämän päivän uudesta ajosta.

## Keskeisten toimintojen kattavuus

| Kohde | Testejä | Tulos |
|---|---:|---|
| Sivilisaatiosivujen numerot ja JSON-vienti | 52 | Läpäisty |
| Modulomin kaaviot ja JSON-viennit | 8 | Läpäisty |
| Koostettu moduloomi–ASFR-reitti ja skenaarioviennit | 20 | Läpäisty |
| Lisääntymiskalenteri | 13 | Läpäisty |
| Odotusjakaumat | 25 | Läpäisty |
| Vuorovaikutusoperaattorit | 20 | Läpäisty |
| Mallin ja sivuston arkkitehtuurisopimus | 7 | Läpäisty |
| Modulomin laskentaydin | 32 | Läpäisty |
| Ehdollinen FieldState/ASFR-rajapinta | 10 | Läpäisty |

Sivilisaation synkronointitestit laskevat mallin tulokset uudelleen ja vertaavat sivujen numerolitteraaleja sekä `civilization_indices.json`-tiedoston sisältöä niihin. Tuore vertailuvienti kirjoitetaan vain testin tilapäishakemistoon. Modulomitestit vertaavat nykyisen mallin muistissa laskettua manifestia sivuston molempiin JSON-versioihin. Skenaarioreitin testit vertaavat täyttä vientiä, ladattavaa versiota ja kevyttä selainprojektiota samaan julkiseen Python-rajapintaan.

Kalenterin testit kattavat raskausajan, synnytyksen jälkeisen tauon, raskausmenetysten palaamisen oikeaan tilaan, pariteetin, ajassa muuttuvat tilat, väestömassan säilymisen ja virheellisten syötteiden hylkäämisen. Odotusjakaumien ja reittitestien yhteydessä tarkistetaan myös, ettei samaa porttia tai kapasiteettivaikutusta lasketa kahdesti.

## Ladattavien skenaarioiden käytännön toisto

Syötteet luettiin tiedostosta `website/public/data/conditional-scenarios.json` ja kirjoitettiin tilapäiseen hakemistoon. Jokainen ajettiin sekä `python3 -m berm.cli scenario INPUT.json` että `python3 -m berm.cli predict GEOGRAPHY YEAR --route modulome --scenario INPUT.json` -komennolla. Palautettu JSON verrattiin koko rakenteeltaan vastaavan skenaarion tallennettuun tulokseen.

| Skenaario | ASFR-ikäryhmiä | Laskuesimerkin TFR | CLI-tulos |
|---|---:|---:|---|
| equal-energy-timing | 7 | 2.128008388154 | Molemmat täsmäävät |
| hormone-phase | 7 | 1.803030303030 | Molemmat täsmäävät |
| repair-capacity | 7 | 3.874094919359 | Molemmat täsmäävät |
| waiting-heterogeneity | 7 | 3.188603296036 | Molemmat täsmäävät |

Vertailu kattoi kaikki tuloskentät, ei vain taulukon TFR-lukua. Nämä ovat sivuston havainnollistavien skenaarioiden laskentatuloksia. Kuuden laskentatiedoston SHA-256-tunnisteet pysyivät samoina CLI-toiston alusta loppuun: täysi skenaariodata kahdessa paikassa, kevyt skenaarioprojektio, modulomidata kahdessa paikassa ja sivilisaation JSON-vienti. Tunnisteet ja kaikki kahdeksan toistotulosta ovat koneellisessa yhteenvedossa.

## Tulostiedostot

- [Koneellinen yhteenveto, testitiedostojen määrät ja skenaarioiden tulokset](FUNCTIONAL_MODEL_CHECKS_2026-09-08.json)
- [Pytest-ajon täydellinen loki](FUNCTIONAL_MODEL_CHECKS_2026-09-08.log)

Tässä toimintatarkistuksessa ei löytynyt korjattavia vikoja. Sivuston tuotantokäännös, selaimen toiminta ja julkiset HTTP-reitit tarkistetaan erikseen saman kokonaistehtävän muissa tarkistuksissa.
