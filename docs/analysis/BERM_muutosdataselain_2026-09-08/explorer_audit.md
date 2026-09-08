# Yhteinen muutosten dataselain: nykytilan auditointi ja toteutusrakenne

Päiväys: 8.9.2026. Tarkistus koskee paikallista työversiota. Sovellusta ei muutettu. Reitit, komponentit, julkiset aineistot ja tutkimusputken tiedostot tarkastettiin koodista; tässä osatyössä ei tehty selaimen visuaalista käyttötestiä eikä uutta biologialähdehakua. Tiedostojen saatavuus ei tarkoita, että niiden sisältö olisi kokonaan havaittua tai sellaisenaan vertailukelpoista.

## Päätulos

Yhteinen visuaalinen muutostyökalu voidaan rakentaa olemassa olevan aineiston varaan. Nykyinen ongelma ei ole pelkästään puuttuva data: sama tutkimuskysymys jakautuu karttaan, kahteen maasarjakaavioon, sairauskuvaan, sentinellikuvaan, mallikynnysten esittelyyn ja teknologiahistoriaan. Näillä on eri tilanhallinta, eri sarjamuodot ja osittain eri lähteet samalle mittarille. Käyttäjä ei voi säilyttää valitsemaansa aluetta ja aikaväliä eikä lisätä rinnalle toista biologista päätepistettä ja paikallista teknologiatapahtumaa.

Suositus on yksi `/explore`-työtila, jossa käyttäjä valitsee **mitä muuttui, missä, milloin ja minkä rinnalla**. Päänäkymä on yhteinen aika-akseli, sen alla erilliset mittarikaistat ja teknologiatapahtumat. Kartta toimii aluerajauksena ja kattavuuden näyttäjänä. Aineiston kuvaukset avautuvat kuvaajan yhteydestä. Teknologiaperheiden luettelo, mallin reittikartta ja lähdekirjasto säilyvät syventävinä näkökulmina.

BERM on selittävä malli. Mittaukset, tilastot ja historialliset tapahtumat ovat tuotuja havaintoja tai arvioita sen syöterajalla. FieldState voi kuvata fysikaalisen mittauksen, mutta se ei tuota biologista selitystä. Liittymä-, laite- tai myyntimäärä ei muutu annokseksi sarjojen yhdistämisellä. Ehdollisen BERM-vasteen kudosoperaattori, tilariippuvuus sekä avoin gauge-, skaala- ja päätepistekalibrointi kuuluvat malliselitteeseen, eivät havaintosarjan arvoon.

## 1. Nykyiset näkymät ja päällekkäisyydet

| Reitti tai komponentti | Todellinen toiminta | Merkitys muutostyökalulle |
|---|---|---|
| [`/explore`][explore-page], [`ExploreTabs`][explore-tabs] | 11 välilehteä; oletus on kartta. URL tallentaa välilehden, muut valinnat ovat komponenttien paikallista tilaa. | Hyvä kanoninen sisääntulo, mutta nykyinen navigaatio luokittelee komponentteja eikä tutkimuskysymyksiä. Välilehden vaihto purkaa aiemman näkymän tilan. |
| [`/explorer` ja `/data`][proxy] | Molemmat ohjataan 308-uudelleenohjauksella `/explore`-reitille. Kohdetabia ei aseteta. Vanhojen sivujen sisältö on silti edelleen reittitiedostoissa. | `/data`-linkki ei avaa aineistoluetteloa vaan oletuskartan. Myös [`DataSourcesContent`][data-content]-komponentin ”Avaa täydellinen dataluettelo” johtaa tähän. Kaksi vanhaa sivutoteutusta jää käytännössä varjoon. |
| [`WorldMap`][world-map] | Maailmankartta, vuosi/toisto, kaksi karttakerrosta: WDI-TFR ja mobiililiittymät. Maan klikkaus avaa [`CountryDetailPanel`][country-detail]-kuvan. | Kartta on käyttökelpoinen aluerajain. Nykyiset kaksi sarjaa ja lähdeformaatit ovat kiinteitä; usean alueen ja päätepisteen vertailu puuttuu. |
| [`GlobalDataExplorer`][global-explorer] | Lataa erillisen `global_panel.csv`:n; yksi maa, yksi tarkasteluvuosi, neljä tunnuslukua sekä erilliset TFR- ja liittymäkuvat. | Parempi provenienssi kuin vanhassa karttadatassa, mutta kartalla ja globaalityökalulla ei ole yhteistä valintaa eikä samaa TFR-lähdesarjaa. |
| [`ExplorerDashboard`][dashboard] | ”Maa”-välilehti näyttää kuusi tulkinta- ja mallikorttia. Varsinaista maavalitsinta tai havaintosarjaa ei ole. | Välilehden nimi lupaa datatyökalun, mutta avaa selitetekstiä. Tekstit sopivat yhteisen työtilan ”Miten tulkita” -paneeliin. |
| [`SentinelExplorer`][sentinel-explorer] | Pelkkä `FalsificationTestsV19`-komponentin kääre, joka hakee testiraportin JSONin. | Indikaattorivälilehti ei avaa lajien havaintosarjoja. Testiraportti kuuluu menetelmä-/malliarvioon; aikasarjat tulee nostaa erikseen. |
| [`SentinelCascadeTimeline`][sentinel-timeline] | `/sentinel`-sivulla toimiva 23 maan mehiläinen–TFR-kuva, maavalinta ja 0–5 vuoden viive. Pooled-kuvassa vain viisi mehiläismuutospistettä vuosien 2014–2020 väliltä. | Hyödyllinen interaktiomalli: yhteinen aika, valittava viive ja katkoviivat aineistoaukoissa. Se on kuitenkin erityinen johdettu analyysi, ei yleinen raakadatapaneeli. |
| [`DiseaseCascadeTimeline`][disease-timeline] | Seitsemän sairausryhmän indeksikäyriä, teknologia-aikakausia, kiihtymävuosia ja mekanismiselityksiä samassa komponentissa. Käytössä sekä `/evidence`- että `/evidence/cascades`-sivulla. | Ulkoasu on lähellä tavoitetta, mutta data, oletettu järjestys ja tulkinta ovat keskenään kytkettyjä. Havaintokerros tarvitsee oman rekisterin ennen siirtoa. |
| [`ThresholdExplorer`][threshold-explorer], [`SolarExplorer`][solar-explorer] | Mallin kynnys-/laskuskenaarioita ja arkistoituja v17-koordinaatteja. | Ne eivät ole havaittuja testosteroni- tai geomagneettisia maasarjoja. Näytetään erikseen valittavana BERM-skenaariona, omalla selitteellä ja parametreilla. |
| [`TechnologyHistoryExplorer`][technology-explorer] | 45 perhettä, 63 lähteistettyä tapahtumaa, 63 lähdettä, viisi numeerista käyttöönottosarjaa. Suodattimet ympäristölle, alueelle, ajalle ja tapahtumatyypille. | Jo rakennettu historiakirja toimii tapahtumien kanonisena lähteenä. Luettelomuotoinen käyttöliittymä ei vielä yhdistä tapahtumia biologiseen aikasarjaan. |
| [`/map`][causal-map] | BERM:n syy- ja näyttöreittien kartta (`CausalAtlas`). | Tämä on mallin rakennekartta, ei maantieteellinen dataselain. Molempien nimissä tulee näkyä kartan tarkoitus. Erillistä `MapExplorer`-komponenttia ei löytynyt. |

Lisäksi [`navigation.ts`][navigation] listaa ”Data-selaimen” ja ”Tietolähteet” eri kohteiksi, vaikka jälkimmäinen nykyisessä reitityksessä päätyy samaan oletusnäkymään. Tällä hetkellä teknologiahistorialle on ainoa oma API-reitti; muut tutkitut selaimet lukevat staattisia julkisia tiedostoja tai suoraan paketoitua JSONia.

## 2. Jo saatavilla olevat sarjat

Lukumäärät laskettiin nykyisistä tiedostoista tai niiden omista yhteenvetometatiedoista. ”Maa-/aluekoodi” ei automaattisesti tarkoita suvereenia valtiota.

| Aineisto | Saatavuus ja tarkkuus | Mitä voi tuoda yhteiseen selaimeen |
|---|---|---|
| [Julkinen globaali paneeli][public-panel] ja [yhteenveto][public-summary] | 238 maa-/aluekoodia × 65 vuotta, 1960–2024, 15 470 riviä. TFR 100 %, mobiili 68,5 %, kaupungistuminen 91,2 %, BKT 44,2 %, ehkäisy 8,1 % mahdollisista maa–vuosiarvoista. | TFR, mobiili, kaupungistuminen, BKT ja ehkäisy heti versiokohtaisina sarjoina. Ehkäisy on CSV:ssä mutta nykyinen TS-parseri ja kuvaaja eivät käytä sitä. |
| [Globaali tutkimuspaneeli][research-panel] | Sisältää myös internetin, kiinteän laajakaistan ja väestön sekä kenttäkohtaisen provenienssin. Julkinen yhteenveto kertoo niiden kattavuudeksi 40,2 %, 28,0 % ja 91,0 %. Nämä kentät eivät kaikki ole julkisessa CSV:ssä. | Julkaistava pieni, dokumentoitu vienti näille kentille; ei tarvetta kerätä sarjoja uudelleen verkosta. |
| [`fertility_asfr_region_age_year.csv`][asfr-csv] | 237 maa-/aluekoodia, 1950–2100, seitsemän ikäryhmää 15–49, 250 509 riviä. 122 766 `ESTIMATE`- ja 127 743 `PROJECTION_MEDIUM`-riviä. | Ikäryhmäkaistat, ASFR-lämpökartta ja ikärakenteen siirtymä ovat suuri lisäarvo TFR:n rinnalle. Vuodesta 2024 alkava WPP2024-medium on demografinen projektio, ei tulevaisuuden havainto eikä BERM-ennuste. |
| [`fertility_tfr_region_year.csv`][tfr-csv] | 35 787 riviä; sama WPP2024-geografia ja 1950–2100. | Puhdas WPP-versiosarja on säilytettävä vaihtoehtona julkisen paneelin lähdeyhdistelmälle. |
| [Erilliset mobiili-/internet-/laajakaista-CSV:t][processed-mobile] | Mobiili: 12 861 riviä / 257 koodia / 1960–2025. Internet: 6 812 / 241 / 1990–2025. Laajakaista: 5 275 / 251 / 1998–2025. | Omaksumista kuvaavat sarjat; aggregaattikoodit ja vuotta 2025 koskeva todellinen saatavuus tarkistettava lähde- ja georekisterissä. Pelkkä 3-kirjaiminen koodi ei riitä maasuodatukseen. |
| [Uudet käyttöönottosarjat][adoption-json] | 24 pistettä: USA AMI ja AMR 10 pistettä kumpikin, Enedis/Linky 2, Suomen tuntimittaus 1, maailman ilmastointilaitekanta 1. Alue-, nimittäjä- ja lähdeviitteet mukana. | USA:lle aidot vuosittaiset kaistat; Linkylle kaksi pistettä; Suomelle ja ilmastoinnille yksittäiset vertailupisteet. Viimeinen sisältää kaikki käyttötekniikat, eikä ole invertteriosuus. Enedis ei kata kaikkia Ranskan verkkoyhtiöitä. |
| [ANFR-anturit][anfr-summary] | 1 474 010 havaintoa, 158 kiinteää paikkaa, 2020–2024, V/m. CSV noin 868 MB. Paikka, aika, raakaviite ja rajoitteet olemassa. Julkaistu aikavyöhyke on epäselvä; säilytetty paikallisaikana. | Paikallisen RF-muutoksen näkymä erillisen aggregointiviennin kautta. Ei koko CSV:tä selaimeen eikä anturikeskiarvoa ”Ranskan annokseksi”. |
| [Normalisoitu sentinellipaneeli][sentinel-summary] | 480 riviä: COLOSS 216, Lea-koirat 92, PECBMS-linnut 172. Maantaso 346, paikallinen 92, aluetaso 19, ylikansallinen 23. | Talvitappio, siittiöiden ominaisuudet, piilokiveksisyys ja lintujen runsaus eri päätepisteiksi. Menetelmät, n, puuttuvat arvot ja maantieteen vastaavuus ovat jo kentissä. |
| [Goan koirien paikkapaneeli][goa-summary] | 1 878 päätepisteriviä, 10 paikkaa, 2020–2023, pentujen ja imettävien naaraiden lukumäärät; sade, monsuuni ja havaintopanostus mukana. | Näyttää paikallisen päätepisteen, kauden ja intervention yhteenliittämisen hyvän tietorakenteen. Tämä interventio ei itsessään ole EMF-interventio. RF-mittausta ei pidä keksiä linkiksi. |
| [IFCE/SIRE][ifce-summary] ja [UK FAnGR][fangr-summary] | Ranskan jalostuksen osastotason luvut 2008–2024; Britannian 204 rodun ja 7 lajin kantatiedot 2000–2026. Molemmat merkitty `BENCHMARK_ONLY_NOT_SENTINEL`. | Jalostus- ja eläinkantakonteksti. Varsamäärä, astutettu tammamäärä ja kanta eivät yksin osoita lisääntymiskyvyn muutosta. Nykyiset metatiedot suojaavat väärältä tulkinnalta. |
| [USA:n testosteroni-CSV][testosterone-csv] ja [maavertailun manifesti][testosterone-manifest] | USA-tiedosto: 16 pistettä 1982–2024; sisältää nimettyjä interpolaatioita ja 2018–2024 malliekstrapolaatioita. Maavertailun 87 rivin WPR-kooste on manifestissa `PROXY`, eri tutkimusvuosien ja menetelmien sekoitus. | Näitä ei viedä yhtenä ”mitattu testosteroni maittain/vuosittain” -sarjana. Havaintoikkunat, rekonstruktiot ja skenaariot erotellaan. Varsinaiset harmonisoidut tutkimuspisteet tulevat biologiadatan auditin kautta. |
| [Sairaus-JSON][gbd-json], [`gbd_data.py`][gbd-loader], [`DiseaseCascadeTimeline`][disease-timeline] | JSONissa seitsemän 1990–2023 sarjaa. Loaderissa masennus luetaan CSV:stä, kuusi muuta `GBD_PUBLISHED_ESTIMATES`-ankkureista interpoloiden. Käyttöliittymällä on tämän lisäksi oma 11 pisteen indeksitaulukko 1975–2023. | Arvojen olemassaolo ei riitä havaintosarjan julkaisuun: alkuperäinen indikaattori, ikävakiointi, alue, lähdepaikka ja interpolaatio on selvitettävä. Kahta eri esitystaulukkoa ei jätetä elämään rinnakkain. |

TFR:n tärkeä erityistapaus: julkisessa paneelissa on 15 168 `OBSERVED/ESTIMATE`-, 281 `OBSERVED/REPORTED_BY_WORLD_BANK`- ja 21 `DERIVED/PROJECTION_MEDIUM`-riviä. [`global_panel.py`][tfr-selection] valitsee WPP-arvion, sitten World Bank -arvon ja viimeisenä WPP-projektion. ”OBSERVED” on tässä putken luokitus, joka ei muuta WPP-arviota suoraksi yksilömittaukseksi. Uudessa kuvassa lähde- ja statusvaihdokset säilyvät pisteittäin. Vanhan `map_data.json`:n 260 avainta sisältävät myös aluekoosteita, ja kartan TFR on nimetty WDI-sarjaksi.

## 3. Kahdeksan tärkeintä muutosta

1. **Yksi tutkimustyötila ja jaettava valinta.** Kanoninen tila sisältää alueet, aikaikkunan, mittarit, ikä-/lajirajauksen, esityksen, vertailuvuoden, viiveen ja tapahtumasuodattimet. Valinta säilytetään URLissa. ”Kartta”, ”Aikajana” ja ”Arvotaulukko” ovat saman valinnan esityksiä. `ExploreTabs`-kuoren 11 tasavertaista komponenttivälilehteä korvataan tehtävää tukevalla rakenteella. `/data` ohjataan tarkoituksellisesti lähteisiin ja `/explorer` samaan työtilaan; nykyinen oletuskarttaan päätyminen korjataan. [Reititys][proxy], [tilan nykyinen rajaus][explore-tabs].

2. **Yhteinen sarjarekisteri ja lähteisiin jäljitettävät vientitiedostot.** `WorldMap`, `GlobalDataExplorer`, `CountryDetailPanel`, sairauskuva, sentinellikuva ja teknologiadatan kuva lukevat yhteistä kuvausrajapintaa. Yhteinen rekisteri ei tarkoita, että 868 MB RF-data ja 53 MB ASFR-data paketoidaan samaan selaintiedostoon: käytetään pieniä manifestikuvauksia ja tarpeen mukaan ladattavia maa-/mittari-/aikavientitiedostoja. [Nykyinen kiinteä parseri][global-artifacts], [vienti][public-export], [käyttöönoton hyvä lähtömuoto][adoption-types].

3. **Biologiset päätepisteet etusijalle, mallin oletuskuvat erikseen.** Valinta ”Syntyvyys” tarjoaa TFR:n lisäksi ASFR:n. ”Testosteroni” näyttää todellisen tutkimusikkunan, ikäryhmän ja mittausmenetelmän. ”Sairaudet” tarkoittaa yksilöityjä ilmaantuvuus-/esiintyvyysmittareita. ”Muut lajit” avaa sentinellien havaintoja; testiraportti ei korvaa niitä. `ThresholdExplorer` ja arkistoitu `SolarExplorer` merkitään BERM-skenaarioiksi. Sama koskee testosteronin jatkettua −1,2 %:n vuosikäyrää. [Sentinellivälilehden kääre][sentinel-explorer], [kynnyskuva][threshold-explorer], [USA-CSV][testosterone-csv].

4. **Yhteinen aika-akseli ja selkeät muunnokset.** Oletus on rinnakkaiset kaistat omine yksikköineen; käyttäjä voi valita alkuarvoindeksin, suhteellisen muutoksen tai vuosimuutoksen. Muunnoksen perusvuosi, kaava ja puuttuvien arvojen käsittely näkyvät. Raakatasoihin voi palata yhdellä toiminnolla. Nykyinen `CountryDetailPanel` käyttää kahta erikseen sovitettua y-akselia; `GlobalDataExplorer` piirtää kaikki olemassa olevat pisteet yhteen myös välivuosien puuttuessa. Uusi kuva katkaisee viivan aukossa ja lähde-/menetelmäkatkossa. [Kaksoisakseli ja jatkuva polku][country-detail], [globaalin trendin polku][trend-chart], [sentinellien jo toimiva katkaisu][sentinel-gap].

5. **Teknologiatapahtumat kanonisesta historiakirjasta, aluekohtaisesti.** Poistetaan komponenttien omat `TECH_ERAS`- ja `TECH_LAYERS`-totuustaulut. Nykyinen sairauskuva rajaa esimerkiksi 2G:n vuosiin 1991–2005 ja 3G:n 2001–2012; tämä ei ole todellisten maakohtaisten verkkojen sulkemisaikajana. Sentinellikuva käyttää NEXRADia ja vuodesta 2012 alkavaa LED-katuvalokerrosta 23 maan kuvaan. Uusi historiakirja erottaa käyttöönoton, mittauksen, politiikan ja sulkemisen; erityisesti kotitalouslamppujen EU-vaatimusta ei levitetä katuvalaistukseen tai maailmanlaajuiseen annoshyppyyn. [Sairaushistorian kopio][disease-eras], [sentinellihistorian kopio][sentinel-eras], [kanoninen rekisteri][history-json].

6. **Kattavuus ja vertailukelpoisuus näkyviin ennen yhteiskuvaa.** Aluevalitsimessa näytetään, mitä mittareita ja vuosia oikeasti on. Yhteiskuva ilmoittaa ”sama alue ja ajanjakso”, ”osittainen aluepeitto” tai ”vain ajallinen konteksti”. Ranskan mittarikanta, Enedisin jakelualue ja yksittäinen ANFR-anturi ovat eri peittoja. Autonomisen RF-anturin mittauskaista ei automaattisesti sisällä Linkyn PLC-taajuuksia: alueen yhteisyys ei tee RF-sarjasta Linky-annosmittausta. Globaali sairausluku ei muutu Suomen havainnoksi maan valinnalla. Staattinen ”163 maata” korvataan valitun aineiston laskettavalla kattavuudella. [Nykyinen staattinen kattavuus][data-content], [paikallisen RF-aineiston rajat][anfr-summary].

7. **Viive, muutoskohdat ja tapahtuma-aika käyttäjän tutkittaviksi.** Kalenteriajan lisäksi voi valita tapahtumaan suhteutetun ajan (esim. paikallisen 3G-sulkemisen edeltävät ja seuraavat vuodet). Viive näyttää aina molempien pisteiden alkuperäiset vuodet. Sarjojen siirtely on kuvailevaa; paneelin ”paras viive” ei ole etukäteen johdettu vaikutusaika. `SentinelCascadeTimeline` tarjoaa tähän jo toimivan `sourceYear`-mallin, mutta sen analyysi, maakoostumus ja pooled-kertoimet on pidettävä oman analyysiversionsa tietueina. [Nykyinen viivekohdistus][sentinel-lag].

8. **Lähde- ja mallikerros osaksi kuvaa ilman faktaseinää.** Jokaisen kaistan otsikossa näkyvät yksikkö, peitto ja aineistotyyppi. Pisteen avaaminen näyttää alkuperäisen arvon, epävarmuuden, lähdepaikan ja käytetyn muunnoksen; kuvaan lisätään myös ladattava valintakohtainen taulukko. BERM:n ehdollinen odotus on erillinen päälle kytkettävä kerros, jolla on malliversio, parametrit ja kalibrointitila. Havaittu yhteisvaihtelu ei saa samalla toiminnolla muuttua vaikutuskertoimeksi. [Nykyiset lataukset][downloads], [BERM-raja historiakirjassa][history-json].

## 4. Ehdotus yhteisen sarjarekisterin kentiksi

Rekisteri kannattaa toteuttaa kuvaustasolla, esimerkiksi `change-series-registry.json`, ja pitää alkuperäiset aineistot niiden omissa lähdemanifesteissa. Uusi rekisteri viittaa nykyisiin teknologiaperhe-, historia-, lähde-, päätepiste- ja analyysitunnisteisiin; se ei kopioi kaikkien rekisterien tekstejä tai ala johtaa uusia väitteitä. Seuraava on suunnitelma, ei tässä työssä lisätty koodi.

| Kenttäryhmä | Tarvittavat kentät |
|---|---|
| Identiteetti | `id`, `datasetId`, `releaseId`, `label {en,fi}`, `description {en,fi}`, `domain` = demography / hormone / disease / ecology / technology / physical-field / context. |
| Mitä arvo tarkoittaa | `metricId`, `endpointId`, `unit`, `quantityKind` = count / rate / concentration / index / field, `denominatorDefinition`, `statistic`, `ageStandardization`, `baseline`, `species`, `sex`, `ageBand`, `populationScope`. Määrä, osuus, ilmaantuvuus ja esiintyvyys eivät jaa samaa tunnistetta. |
| Alue | `geographyId`, `geographyLevel` = country / subnational / site / operator-area / supranational, `boundaryVersion`, `parentGeographyIds`, `coverageScope`, `geometryRef`, `geographyMatchStatus`. ISO3 säilyy kenttänä, mutta ei ole koko geometriamalli. |
| Aika | `frequency`, `observationStart`, `observationEnd`, `datePrecision`, `timeBasis` = calendar-year / winter-season / survey-window / datetime, `timezoneStatus`, `reportingDate`. Havaintovuosi, julkaisu ja haku ovat erillisiä. |
| Havainto vs. johdettu arvo | `recordKind` = measured / reported-estimate / harmonized-estimate / proxy / interpolated / reconstructed / projection / model-scenario / derived-statistic. Luokitus myös pisteittäin, koska samassa julkaisussa voi olla eri tyyppejä. `sourceStatus` säilyttää alkuperäisen luokituksen. |
| Provenienssi | `sourceRefs[]` nimitilan ja tunnisteen kanssa, `artifactPath`, `sha256`, `sourceLocator`, `retrievedAt`, `license`, `transformPipelineVersion`, `derivedFrom[]`, `transforms[]`. Lähdekooste ja primääriaineisto erotetaan. |
| Pisteet | `observationId`, `timeStart`, `timeEnd`, `value` tai `missingReason`, `sampleSize`, `samplingEffort`, `denominatorValue`, `uncertainty {kind,low,high,status}`, `sourceRef`, `sourceLocator`, `qualityFlags`, `recordKind`. Nolla on arvo, ei puuttuvan merkki. |
| Menetelmän vertailukelpoisuus | `methodId`, `assay`, `specimen`, `collectionTimeOfDay`, `surveyDesign`, `caseDefinition`, `standardPopulation`, `methodBreaks[]`, `allowedAggregation`, `allowedTransforms`, `gapPolicy`. Kaikki eivät sovellu joka aineistoon; soveltumattomuus eroaa tuntemattomasta. |
| EMF:n fysikaalinen lisäosa | `fieldQuantity`, `frequencyBand`, `bandwidth`, `spectrumRef`, `averagingWindow`, `peakOrRms`, `instrument`, `calibrationRef`, `position`, `geometry`, `dutyCycle`, `backgroundB0Ref`, `lightContextRef`. Liittymäsarjalta nämä puuttuvat perustellusti; niitä ei täytetä skenaariovakioilla. |
| Linkit | `technologyIds[]`, `eventIds[]`, `analysisIds[]`, `relatedSeriesIds[]`, `bermRole` = imported-observation / input-proxy / conditional-scenario / empirical-endpoint. Linkki on luokitus, ei syykaaren todiste. |
| Julkaisun valmius | `availability` = ready / needs-provenance / needs-normalization / local-only / missing, `limitations[]`, `coverageSummary`, `defaultVisible`. Puuttuva sarja näkyy katalogissa selkeästi ilman keksittyä käyrää. |

Sarjarekisterin rinnalle tarvitaan **yhteinen aluehakemisto** ja **liitosrekisteri**. Jälkimmäisen tietue voi olla `leftSeriesId`, `rightSeriesId/eventId`, `relation` (same-support / aggregate-of / contextual-only), `geographyCrosswalkRef`, `temporalRule`, `populationCompatibility`, `methodCompatibility`, `approvedTransforms`, `limitations`, `reviewedAt`. Pelkkä yhteinen maa- ja vuosikenttä ei ole riittävä liitosrekisteri.

Analyysitulokset, kuten korrelaatio tai muutoskohdan arvio, muodostavat erillisen analyysitietueen: käytetyt sarjaversiot, pistejoukko, ajanjakso, muunnokset, viiveen valinta, puuttuvien käsittely, ryhmittely, n, epävarmuus ja laskennan versio. Näin raakamuuttujan rekisteri ei muutu riippuvaksi yhden analyysin tuloksesta.

## 5. Alueen ja ajan yhteensopivuusehdot

1. **Alueen on oltava sama tai vastaavuus eksplisiittinen.** Sama maa voi sisältää operaattorialueen, yhden anturin tai yhden jalostuslaitoksen. Paikallinen mittaus ja kansallinen TFR voidaan piirtää rinnakkain kontekstina, mutta niitä ei nimetä samaksi altistus–päätepistepaneeliksi. EU, World Bank -aggregaatit ja maiden rajojen muutokset vaativat omat tunnisteensa ja versioidun jäsenyyden.
2. **Aikaikkunan on oltava tiedossa.** Talvitappion kausi 2015/2016 säilytetään kautena; se ei muutu yhdellä vuosiluvulla kesän mittaukseksi. Testosteronitutkimuksen monivuotinen keruuikkuna piirretään välinä. ANFR:n tuntematonta aikavyöhykettä ei muuteta hiljaisesti UTC:ksi. Julkaisuvuotta saa käyttää aikajanalla vain julkaisu-/raporttitapahtumana.
3. **Ajallista tarkkuutta saa alentaa dokumentoidusti, ei kasvattaa havainnoksi.** Tuntimittauksesta päivä- tai kausikooste on mahdollinen havaintopanoksella ja kattavuudella. Vuosiarvosta kuukausisarjaa tai kahdesta mittarikantapisteestä jatkuvaa omaksumiskäyrää ei synny ilman erikseen merkittyä mallia. Aukko jää aukoksi.
4. **Perusjoukon ja nimittäjän on oltava yhteensopiva.** TFR on periodimittari; ASFR:n ikäluokat ovat eri vasteita. Vanhojen ja nuorten miesten testosteronikeskiarvoja ei sulauteta ilman ikä-/menetelmävakiointia. Lintujen runsaus, talvipesätappio ja koiran siittiöliikkuvuus eivät ole sama ”lisääntymisen lasku”. Eläinkannan pienentyminen tarvitsee kannan ja jalostuskäytäntöjen kontekstin.
5. **Käyttäjän valitsema normalisointi säilyttää raakaarvon.** Yhteinen indeksi auttaa vertaamaan muotoa, mutta ei anna mittareille yhteistä biologista yksikköä. Raakataso, indeksi ja muutos pidetään eri muunnoksina; aineistoa ei valita uudelleen muunnoksen näyttävyyden vuoksi.
6. **Viive on kohdistussääntö, ei kadonnut päivämäärä.** Näytetään sekä biologisen havainnon aika että siihen verratun lähteen aika. BERM:n tilariippuvan ytimen ehdotukseen perustuva viive ja datasta valittu paras viive kirjataan eri tavoin. Yhteiskuva voidaan tarjota jo ennen kausaalista kalibrointia, kun tämä ero säilyy.
7. **Vuodenaika ja mittauskonteksti ovat omia sarjojaan.** Lämpötila, fotoperiodi, paikallinen vuorokausi, luonnollinen kenttä ja avaruussää voivat olla tutkimuskysymyksen kannalta relevantteja. Niitä ei johdeta nykyisen `SolarExplorer`-komponentin kiinteästä maakohtaisesta skenaariotaulukosta. B₀:n sijainti/epoch ja havainnon aikaväli tarvitaan ennen fysikaalista yhdistämistä.
8. **Fysikaalinen liitos vaatii myös spektriyhteensopivuuden.** Lähteen taajuudet, kenttäsuure ja mittarin kaistanleveys/herkkyys tarkistetaan ennen linkkiä. Linkyn PLC-liikenteen tutkiminen vaatii kyseistä kaistaa mittaavan aineiston; laajakaistainen RF-anturisana tai sama kaupunki eivät osoita tätä. Kaistaltaan eri mittaus voi olla ympäristökonteksti, mutta se ei mittaa nimeämänsä teknologian fysikaalista polkua.

## 6. Teknologiainterventioiden yhdistäminen aikajanalle

Nykyinen historiarekisteri antaa hyvän pohjan: `technologyIds`, `region`, `location`, `startYear`, `endYear`, `kind`, kaksikielinen kuvaus, lähteet ja eksplisiittiset määrien nimittäjät. Puuttuva osa on **koneluettava peitto ja päivämäärän merkitys**. Vapaatekstinen `region.id = france` ei erota valtakunnan, Enedisin ja tutkimuskohteen rajaa. Päivän tarkka merkintä on nyt usein kuvauksessa eikä rakenteessa.

Lisätään rekisteriin tai erilliseen yhteensopivaan tapahtumaliitteeseen `geographyRefs`, `scopeType`, `affectedPopulation`, `eventDateStart/End`, `datePrecision`, `dateRole`, `operationalStatusChange`, `affectedPhysicalChannels`, `measuredFieldSeriesIds`, `adoptionSeriesIds`. Tapahtuman nykyinen pysyvä ID säilyy. `measurement`-tapahtumalle erotetaan mittausjakso ja tutkimuksen julkaisu; päivää, mittauspaikkaa tai peittoa ei täytetä arvauksella.

Esityssäännöt:

- Lanseeraus on piste, käyttöönoton dokumentoitu vaihe on väli, sääntely oma merkki ja sulkeminen vähentymistä/korvautumista kuvaava merkki. Mikään näistä ei yksin tarkoita mitatun kokonaiskentän nousua tai laskua.
- Vuosi valitulla alueella tuo näkyviin ensisijaisesti kyseiseen alueeseen rajatut tapahtumat. Ulkopuoliset tapahtumat näytetään vain erikseen valittuna maailmanhistorian kontekstina.
- Teknologian määrällinen omaksumissarja piirretään omaan kaistaansa. Tapahtumamerkki ei synnytä S-käyrää eikä sen jälkeistä vakiokuormaa.
- Historiallinen sulkeminen ei poista perhettä katalogista. Korvaava järjestelmä ja uusi käyttöaste voivat muuttaa paikallista kenttää eri suuntaan eri kaistoilla.
- Esimerkiksi Suomen 3G-sulkemisvaihe 2023–2024 sopii Suomen aikajanalle. Linky-vaihe sopii Ranskan kontekstiksi Enedisin peittomerkinnällä; mahdollinen paikallinen ANFR-sarja säilyttää oman anturipaikkansa ja mitatun taajuuskaistansa. Näiden rinnastus on kontekstuaalinen, kunnes PLC-taajuuksiin sopiva mittauspolku on osoitettu. NEXRADin yhdysvaltalaista historiapäivää ei anneta Euroopan yhteiseksi interventioksi.

Käyttäjän tutkimuspolku voisi olla: **Suomi → syntyvyys → ASFR/TFR → 1990–2024 → lisää teknologiahistoria → lisää ikäryhmä tai toinen maa → tarkastele vuodenaikaa/paikallista aineistoa, jos sitä on**. Testosteronin ja sairauksien kohdalla sama polku näyttää ensin aineiston todellisen alue- ja aikapeiton; mittarit eivät katoa, mutta puuttuva valtakunnallinen sarja ei täyty skenaariolla.

## 7. Rajattu toteutusjärjestys

Ensimmäiseen toimivaan kokonaisuuteen riittävät TFR/ASFR, nykyiset tietoliikennesarjat, viisi lähteistettyä omaksumissarjaa, kolme normalisoitua sentinelliaineistoa ja kanoniset teknologiatapahtumat. Näillä voidaan rakentaa yhteinen alue-/aikavalinta, rinnakkaiset kaistat, kattavuuskartta, lähdeavaus ja jaettava näkymä. Testosteroni- ja sairausaineistot liitetään samalla sopimuksella niiden provenienssiauditin valmistuttua. Niiden valmiutta ei arvioida komponentin nimen tai `GBD_direct`-tekstin perusteella.

Hyväksymisehdot ovat käyttäytymisiä: alue säilyy kuvan vaihdossa; Suomen valinta ei piirrä maailman arvoa Suomen havaintona; WPP-projektio erottuu arviosta; aukkovuosi katkaisee viivan; sama lähdeversio näkyy kartassa ja käyrässä; Enedis-peitto ei muutu koko Ranskaksi; tapahtuman lähde ja luonne ovat nähtävissä; viivemuutoksen jälkeen alkuperäiset vuodet säilyvät; ladattava taulukko toistaa täsmälleen näkyvän valinnan.

[explore-page]: </Volumes/kovalevy 3/extinctionfield/website/app/[locale]/explore/page.tsx:50>
[explore-tabs]: </Volumes/kovalevy 3/extinctionfield/website/components/ExploreTabs.tsx:18>
[proxy]: </Volumes/kovalevy 3/extinctionfield/website/proxy.ts:6>
[world-map]: </Volumes/kovalevy 3/extinctionfield/website/components/WorldMap.tsx:177>
[country-detail]: </Volumes/kovalevy 3/extinctionfield/website/components/CountryDetailPanel.tsx:60>
[global-explorer]: </Volumes/kovalevy 3/extinctionfield/website/components/GlobalDataExplorer.tsx:326>
[dashboard]: </Volumes/kovalevy 3/extinctionfield/website/components/ExplorerDashboard.tsx:3>
[sentinel-explorer]: </Volumes/kovalevy 3/extinctionfield/website/components/SentinelExplorer.tsx:3>
[sentinel-timeline]: </Volumes/kovalevy 3/extinctionfield/website/components/SentinelCascadeTimeline.tsx:433>
[disease-timeline]: </Volumes/kovalevy 3/extinctionfield/website/components/DiseaseCascadeTimeline.tsx:234>
[threshold-explorer]: </Volumes/kovalevy 3/extinctionfield/website/components/ThresholdExplorer.tsx:180>
[solar-explorer]: </Volumes/kovalevy 3/extinctionfield/website/components/SolarExplorer.tsx:82>
[technology-explorer]: </Volumes/kovalevy 3/extinctionfield/website/components/TechnologyHistoryExplorer.tsx:59>
[causal-map]: </Volumes/kovalevy 3/extinctionfield/website/app/[locale]/map/page.tsx:100>
[navigation]: </Volumes/kovalevy 3/extinctionfield/website/lib/navigation.ts:795>
[data-content]: </Volumes/kovalevy 3/extinctionfield/website/components/DataSourcesContent.tsx:40>
[public-panel]: </Volumes/kovalevy 3/extinctionfield/website/public/data/global_panel.csv:1>
[public-summary]: </Volumes/kovalevy 3/extinctionfield/website/public/data/global_panel_summary.json:1>
[research-panel]: </Volumes/kovalevy 3/extinctionfield/berm/data/global/all_countries_panel.json>
[asfr-csv]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/fertility_asfr_region_age_year.csv:1>
[tfr-csv]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/fertility_tfr_region_year.csv:1>
[processed-mobile]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/mobile_by_country_year.csv:1>
[adoption-json]: </Volumes/kovalevy 3/extinctionfield/website/public/data/technology-adoption.json:1>
[anfr-summary]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/anfr_autonomous_probes_summary.json:1>
[sentinel-summary]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/sentinel_species_region_year_summary.json:1>
[goa-summary]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/veterinary_sentinel_species_site_time_summary.json:1>
[ifce-summary]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/ifce_sire_equid_breeding_panel_summary.json:1>
[fangr-summary]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/fangr_uk_breed_population_annual_summary.json:1>
[testosterone-csv]: </Volumes/kovalevy 3/extinctionfield/berm/data/processed/testosterone_secular/usa_t_timeseries.csv:1>
[testosterone-manifest]: </Volumes/kovalevy 3/extinctionfield/berm/data/raw/manifests/testosterone_tfr_2026-08-31.manifest.json:1>
[gbd-json]: </Volumes/kovalevy 3/extinctionfield/website/data/gbd_disease_series.json:1>
[gbd-loader]: </Volumes/kovalevy 3/extinctionfield/berm/berm/diagnostics/gbd_data.py:22>
[tfr-selection]: </Volumes/kovalevy 3/extinctionfield/berm/berm/data/global_panel.py:154>
[global-artifacts]: </Volumes/kovalevy 3/extinctionfield/website/lib/globalArtifacts.ts:12>
[public-export]: </Volumes/kovalevy 3/extinctionfield/berm/berm/data/global_public_export.py:49>
[adoption-types]: </Volumes/kovalevy 3/extinctionfield/website/lib/technology-adoption.ts:16>
[trend-chart]: </Volumes/kovalevy 3/extinctionfield/website/components/GlobalDataExplorer.tsx:221>
[sentinel-gap]: </Volumes/kovalevy 3/extinctionfield/website/components/SentinelCascadeTimeline.tsx:86>
[disease-eras]: </Volumes/kovalevy 3/extinctionfield/website/components/DiseaseCascadeTimeline.tsx:208>
[sentinel-eras]: </Volumes/kovalevy 3/extinctionfield/website/components/SentinelCascadeTimeline.tsx:30>
[history-json]: </Volumes/kovalevy 3/extinctionfield/website/data/technology-history.json:1>
[sentinel-lag]: </Volumes/kovalevy 3/extinctionfield/website/components/SentinelCascadeTimeline.tsx:455>
[downloads]: </Volumes/kovalevy 3/extinctionfield/website/components/GlobalDataDownloads.tsx:62>
