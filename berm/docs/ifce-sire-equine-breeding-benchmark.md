# IFCE/SIRE: Ranskan hevosjalostuksen benchmark-paneeli

Tila: valmis, erillinen benchmark-polku  
Versio: 2026-08-19  
Putki: `ifce_sire_equine_benchmark@v1.0.0`

Tämä on toistettava muunnos kolmesta Institut français du cheval et de
l'équitationin (IFCE/SIRE) avoimesta, vuosittaisesta ranskalaisesta
hevosjalostustaulukosta. Se tuottaa pitkän muotoisen
`département × vuosi × rotu × tyyppi × mittari` -paneelin, jossa alkuperäiset
lähdekentät säilyvät jokaisella rivillä.

Tämä ei ole sentinelliaineisto eikä RF/EMF-aineisto. Se ei ole kausaalinen
testi, CSLI-, readiness- tai ennustepolun syöte, eikä sitä saa esittää
sellaisena. Kaikki tuotokset on pakotettu tilaan
`BENCHMARK_ONLY_NOT_SENTINEL` ja `NOT_ELIGIBLE` F1--F6-arvioinnissa.

## Viralliset lähteet ja lukittu raakaversio

IFCE on lähteiden tuottajaksi merkitty virallinen toimija. data.gouv.fr:n
lähdesivuilla on `Licence Ouverte / Open Licence 2.0`. Raakakopiot haettiin
2026-08-19 suoraan data.gouv.fr:n resurssirajapinnasta. Palvelun myöhempi
päivitys ei muuta tätä analyysiversiota: alla olevat tavumäärät ja SHA-256:t
lukitsevat juuri käytetyt tavut.

| Mittari | Raakatiedosto | Virallinen lähdesivu | Rivejä | Tavuja | SHA-256 |
|---|---|---|---:|---:|---|
| Peitetyt tammat | `juments_saillies.csv` | [data.gouv.fr](https://www.data.gouv.fr/datasets/nombre-de-juments-saillies-en-france-572970) | 40 911 | 1 786 419 | `1aadfd6f416df96c156d35df33d5e727ed8722c200155beec36d89a828fbcb4e` |
| Ekvidejä syntynyt | `naissances.csv` | [data.gouv.fr](https://www.data.gouv.fr/datasets/nombre-de-naissances-d-equides-en-france-30378678) | 43 464 | 1 878 614 | `7973df461f7c41ef96cec60c87a456b2ec2eff70095824d5e918c4a34aa7c1a3` |
| Aktiiviset orit | `etalons_actifs.csv` | [data.gouv.fr](https://www.data.gouv.fr/datasets/nombre-d-etalons-en-activite-en-france-572975) | 29 851 | 1 244 722 | `a651734efd4aba317e761c852faa065383da2566b7219bb4f19b6a0fea658f2b` |

Yhteensä raaka- ja normalisoituja rivejä on 114 226. Kaikissa kolmessa
tiedostossa on vuodet 2008--2024 (17 vuotta). Raakakoodaus on tarkasti
`ISO-8859-1`; normalisoitu CSV kirjoitetaan UTF-8:na. Raakatiedostoja ei
formatoida, korjata tai ylikirjoiteta.

Versionoitu manifesti on
`berm/data/raw/manifests/ifce_sire_equine_breeding_2026-08-19.manifest.json`.
Raakatiedostot sijaitsevat gitin ulkopuolella hakemistossa
`berm/data/raw/equine/ifce_sire_2026-08-19/`.

## Mitä mittarit tarkoittavat

| Normalisoitu mittari | Lähteen arvosarake | Lähteen aluemerkitys | Mitä se ei ole |
|---|---|---|---|
| `mares_bred_count` | `NB JUMENTS SAILLIES` | `CODE DEPARTEMENT STATIONNEMENT` | raskaus-, hedelmöitys-, syntymä- tai hedelmällisyysaste |
| `births_count` | `NB` | `NUMDEPARTEMENTLIEUELEVAGE` | aiempaan tammojen peittoon linkitetty syntymä- tai hedelmällisyysaste |
| `active_stallions_count` | `NBETALON` | `NUMDEPARTEMENTSTATIONNEMENT` | siemenen laatu, palvelumäärä, hedelmöitys tai hedelmällisyysaste |

Peitetyt tammat ja aktiiviset orit kohdistuvat **stationing**-départementiin.
Syntymät kohdistuvat **lieu d'élevage** -départementiin. Siksi putki ei tee
taulujen välillä liitosta, edes samalla vuoden, département-koodin, rodun ja
tyypin avaimella. Etenkään `births / mares` -suhdetta ei muodosteta: se
peittäisi sekä paikkamerkityksen että biologisen viiveen ja kohorttivastaavuuden
epävarmuuden.

Rivit säilyttävät lisäksi täsmälleen lähteen kuusi kenttänimeä ja niiden arvot
UTF-8-JSONina kentässä `raw_source_fields_json`; `raw_header_json` säilyttää
lähdesarakkeiden järjestyksen. Rodun ja tyypin tunnisteet jätetään lähteen
arvoiksi. Putki ei väitä, että eri taulujen rotunimet ovat harmonisoituja.

## Tuote, skeema ja ajo

Putki on `berm/berm/data/ifce_sire_equine_benchmark.py`. Se tarkistaa ennen
lukemista manifestin, tavumäärän, SHA-256:n, ISO-8859-1-koodauksen, tarkat
otsikot, rivimäärät, 2008--2024-vuotiset kattavuudet ja lähdekohtaiset
département-koodimäärät (102, 103 ja 99).

Normalisoidut, uudelleenrakennettavat ja gitissä sivuutetut tuotteet ovat:

| Tiedosto | Rivejä | Muoto |
|---|---:|---|
| `berm/data/processed/ifce_sire_equid_breeding_panel.csv` | 114 226 | pitkä mittari-eriytetty paneeli |
| `berm/data/processed/ifce_sire_equid_breeding_panel_summary.json` | 1 | skeema-, provenance- ja kattavuusyhteenveto |

Konekielinen yhteenvetoskeema on
`berm/data/schemas/ifce_sire_equine_breeding_benchmark.schema.json`.
Tuloksen 35 saraketta sisältävät muun muassa `metric`, `metric_definition`,
`source_geography_semantics`, `value_count`, alkuperäiset kenttämetatiedot,
raaka-artifaktin tarkistussumman ja lähderivikohtaisen avaimen. Koska mittarit
pidetään erillään, tuotoksessa ei ole `births_per_mare`, `fertility_rate`,
`conception_rate` tai muuta johdettua vastetta.

Rakennus:

```text
cd berm
python -m berm.data.ifce_sire_equine_benchmark
```

Kirjoitus on fail-closed: olemassa oleva tavultaan identtinen tiedosto
hyväksytään, mutta erilaisen tiedoston ylikirjoitus vaatii nimenomaisen
`--replace`-valinnan. Raakalähteitä komento ei koskaan kirjoita.

## Miksi tämä ei ole RF- tai sentinellitestinä kelvollinen

| Tarvittava asia | Onko aineistossa? | Vaikutus |
|---|---|---|
| RF/EMF-annos, dosimetria tai validoitu altistusproxy | Ei | ei altistus--vaste-estimaattia |
| Ulkoinen RF-liitos | Ei | putki ei tee sitä |
| Sää-, kemikaali-, tauti-, rehu- tai management-kovariaatit | Ei | keskeiset selittäjät puuttuvat |
| Yksilö- tai kohorttilinkki tamman, orin ja syntyneen varsansa välillä | Ei | biologista onnistumista ei voi identifioida |
| Raskauden, hedelmöittymisen, tiineyshävikin tai siemenen mittaus | Ei | mittarit ovat jalostusaktiivisuuden ja syntymien aggregaatteja |
| Sama aluemerkitys kaikille kolmelle mittarille | Ei | rate- tai viivejoin olisi tässä vaiheessa virheellinen |

Paneeli on silti arvokas benchmark, koska se on virallinen, pitkä,
aluerakenteinen ja numeerinen jalostusaktiivisuuden/syntymien aineisto. Sen
oikea käyttö on testata myöhempää, ennalta määriteltyä kohortti- ja viivemallia
vasta sen jälkeen, kun paikkasemantiikka, rotuavaimet, kohorttiviive ja
ulkopuoliset altistus- sekä häiriötekijäaineistot on hankittu ja auditoitu.

## Lähderekisteri

Toteutunut, versionoitu lähderekisteririvi on
[`source_registry.csv`](../data/registry/source_registry.csv)-tiedostossa
tunnuksella `IFCE_SIRE_EQUINE_BREEDING_PANEL`. Sen moniosaisen raakajulkaisun
täydet tarkistussummat säilyvät manifestissa, eivätkä ne riipu dokumentaation
esimerkkirivistä.
