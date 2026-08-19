# Seminologia- ja eläinlääketieteen kandidaattiloki

Tarkistettu: 2026-08-19  
Rajaus: vain vähintään noin viiden vuoden pituiset tai aidosti monipaikkaiset
numeeriset aineistot, joissa on mahdollista erottaa havaintoyksikkö,
ajankohta, paikka ja lisääntymisvaste. Pienet yksittäiset laboratoriokokeet
eivät kuulu tähän hankintajonoon.

Tämä on hankintaloki, ei näyttörekisteri. Kandidaatti ei muutu sentinelliksi
eikä F1--F6-kelpoiseksi ennen kuin sen raakadatat, lisenssi, aikaleima,
paikkatieto ja altistusliitos on tarkistettu.

## Tulos yhdellä silmäyksellä

Löytyi kaksi julkaistua, numeerisesti ladattavaa vertailuaineistoa, joista
yksi on jo integroitu erilliseksi benchmarkiksi. Löytyi myös yksi
viiden vuoden avoin härkäaineisto ja yksi monipaikkainen hevoshedelmöitysdata,
joita ei integroida vielä, koska kumpikaan ei sisällä RF-altistusta eikä
täytä yksin sentinellipaneelin vaatimuksia. Vahvimmat pitkät kenttäaineistot
ovat edelleen haltijan hallussa ja vaativat tarkoituksenmukaisen
tutkimusdataluvan.

| Sija | Lähde | Laji ja mitta | Kesto / paikka | Koneellinen tila | Päätös |
|---:|---|---|---|---|---|
| 1 | Broekhuijse, Feitsma & Gadella 2011 | karju, ejakulaatti + kenttähedelmöitys | 1998--2010; 750 NL-tilaa, AI-asema | ACCESS_REQUIRED | paras boar-kenttäpaneelin hankintapyyntö |
| 2 | Hensel ym. 2026 | härkä + karju, siemenen laatu | 1997--2019 / 2005--2023; yksi saksalainen AI-asema per laji | ACCESS_REQUIRED | pisin yhtenäinen seminologinen trendisarja |
| 3 | Morris GRLS Reproductive History | koira, kiima, tiineys, pentue, uroksen lisääntymishistoria | 8 tutkimusvuotta; noin 3 000 koiraa, USA | ACCESS_REQUIRED, kirjautuminen ja data use agreement | vahvin koirasentinellin prospektiivinen polku |
| 4 | Netherton ym. 2022, Supplementary 1 | härkä, `% Norm`/morfologia | päivätyt rivit 2013--2019; bull-ID ja station-avain puuttuvat | `CANDIDATE_NOT_HELD`, XLSX | mahdollinen sääbenchmark vain auditointirajoitteet säilyttäen |
| 5 | Clydesdale mare data | hevonen, D20/D40-tiineys ja elävä varsa | 441 tiineyttä, 135 tammaa, 12 anonymisoitua tilaa; 2000--2020 | `OPEN_NONCOMMERCIAL_ONLY` | CC BY-NC 3.0 ja anonyymi paikka estävät nykyisen ingestoinnin |
| 6 | CDCB National Cooperator Database | nauta, service-sire conception / AI- ja lisääntymisrekisterit | yli 80 vuotta, Yhdysvallat | ACCESS_REQUIRED raakahavaintoihin | kansallinen fertility-outcome-polku, ei semen-CASA-paneeli |
| 7 | Karoui ym. 2011 | härkä, semen traits | 1990--2007; 502 Holstein-härkää | ACCESS_REQUIRED | suuri pitkä kaupallinen control-sarja |
| 8 | SKK Avelsdata | koira, pentueet ja jälkeläiset | 1990--nykyhetki, Ruotsi | ACCESS_REQUIRED bulk-exportiin | kansallinen koirasyntyvyys- ja jalostusrekisteri, ei semen-data |

## 1. Aineistot, jotka ovat oikeasti julkisesti ladattavia

### 1.1 Fernández-López ym. 2022: boar CASA + insemination

- Lähde: [Mendeley Data v5](https://doi.org/10.17632/jd38jhxpg6.5),
  [artikkeli](https://doi.org/10.1038/s42003-022-03954-0)
- Lisenssi: CC-BY-4.0
- Rakenne: 98 020 solutason CASA-riviä, 221 inseminaatiotapahtumaa,
  17 karjua, 36 ejakulaattia
- Aika ja paikka: yksi AI-asema Riudarenesissa, Espanjassa; 03--06/2017
- Integrointi: valmis erillisenä seminology_benchmark-polkuun

Tämä on tekninen feature-to-fertility-benchmark, ei pitkän trendin eikä
RF-testin aineisto. Tarkka toteutus ja hashit:
[seminology-benchmark.md](seminology-benchmark.md).

### 1.2 Netherton ym. 2022: auditoitu avoin härkäsemenkandidaatti

- Lähde: [Seasonal variation in bull semen quality demonstrates there are
  heat-sensitive and heat-tolerant bulls](https://doi.org/10.1038/s41598-022-17708-9)
- Julkaistu lisäaineisto: Supplementary Information 1, XLSX; artikkelin
  yhteydessä CC BY 4.0
- Auditoitu työvihko: 130 509 tavua, SHA-256
  `69f186d87ed03c7cece1c78ad0186db783f7adcd2628dee2853c0caa2dce3fbc`;
  1 246 päivättyä riviä ja 1 245 `% Norm` -arvoa
- Aika: lähderiveissä 2013-10-22--2019-09-10, eli laajempi kuin artikkelin
  otsikkokuvaus (1 271 ejakulaattia, 79 härkää, 11 rotua, 2014--2018)
- Rakennerajoite: työvihkossa ei ole härkä-ID:tä; `Breed` on täytetty vain 61
  rivillä, kahdelta riviltä puuttuu `Batch`, eikä Rockhampton-/Singleton-
  kontekstia voi erottaa havaintokohtaisesti
- Sääkonteksti: mukana oleva päiväsäätaulu sisältää 2 050 riviä, joista 2 049
  on kelvollisesti päivättyjä (2014-01-01--2019-08-12); yksi lähdepäiväys on
  virheellinen (`b/3/2019`)
- Tila: `CANDIDATE_NOT_HELD`; auditoitu väliaikainen kopio poistettiin, eikä
  raakadataa tai johdettua tuotetta ole repoon lisätty

Tämä on mahdollinen kuuden kalenterivuoden semen-laatu- ja sääbenchmark, ei
vielä puhdas yhden aseman paneeli. Bull-ID:n, havaintopaikan ja artikkelin
otsikkolukujen ristiriita estävät eläin-, station- tai yksilötason päätelmät.
Se ei sisällä RF-mittausta. Mahdollinen ingestointi vaatisi ensin lisenssin
uudelleenvarmistuksen, strict-OOXML-työkirjan eksplisiittisen lukijan, koko
raakatyökirjan manifestin ja ristiriitojen säilyttämisen laatulippuina.

### 1.3 Clydesdale mare: 12 siittolan tiineys- ja varsontatulokset

- Lähde: [Mendeley Data v4](https://data.mendeley.com/datasets/kjmc7dg5ny/4)
- Tiedosto: `Clydesdale_repro_data_AOS_V3.xlsx`, Mendeley Data v4;
  CC BY-NC 3.0 (ei integroida tai julkaista johdettua projektituotetta ilman
  erillistä käyttölupaa)
- Auditoitu työvihko: 441 tiineysriviä, 135 tammaa, 12 anonymisoitua tilaa ja
  kolme anonymisoitua maakoodia; lähteen `Year_cover` on 2000--2020
- Aika: `date_Bred` on täsmällisenä 269 rivillä (2003-05-04--2020-08-06),
  mutta 172 riviltä täsmällinen päivämäärä puuttuu
- Säilyvät muuttujat: D20/D40, onnistuminen/epäonnistuminen, live foal ja
  lääkityskenttiä
- Tila: `OPEN_NONCOMMERCIAL_ONLY`, `CANDIDATE_NOT_HELD`; tarkistettu
  väliaikaisesti, mutta ei tallennettu repoon tai normalisoitu

Tämä on aidosti monipaikkainen ja pitkä lisääntymisbenchmark, mutta
paikkatieto on anonymisoitu, osa aikaleimoista puuttuu eikä siinä ole
RF-mittausta tai käyttökelpoista ulkoista paikka-avainta. Lisenssi-,
puuttuva-aika- ja paikkaongelmat estävät ingestoinnin ja F1--F6-tulkinnan.

## 2. ACCESS_REQUIRED: korkean arvon kenttäpaneelit

### 2.1 Broekhuijse, Feitsma & Gadella 2011 — ensisijainen boar-pyyntö

- Lähde: [Field Data Analysis of Boar Semen Quality](https://doi.org/10.1111/j.1439-0531.2011.01861.x)
- Aineistokuvauksen mukaan: yli 1 miljoona ejakulaattia 1998--2010,
  8,6 miljoonaa farrowing-tietuetta 750 tilalta
- Mahdollinen grain: ejakulaatti → siemennysannos → emakko/farrowing;
  samalla boari, karjun ikä, linja, AI-asema, laboratorio/teknikko,
  keräysväli, annoksen ikä, siittiömäärä, farmi, pariteetti, kausi ja
  siemennyspäivä
- Omistaja/portinvartija: Varkens KI Nederland / IPG Pigbase -ekosysteemi
- Julkinen data: ei vahvistettua CSV/XLS/API-latausta
- Pyyntö: deidentifioitu ejakulaatti- ja farrowing-taulu sekä data dictionary,
  station/farm-aluekoodi, keräys- ja siemennyspäivät, protocol-version,
  seula- ja poistokriteerit sekä lisenssi

Tämä on sisällöllisesti paras olemassa oleva karjupaneeli, koska se jo yhdistää
semen-parametrit ja kenttähedelmöityksen sekä säilyttää keskeiset
tuotantokonfounderit. Se ei silti sisällä RF-annosta, joten vaaditaan erillinen
ajallisesti ja alueellisesti kohdistettava altistusmittaus.

### 2.2 Hensel ym. 2026 — pisin julkaistu härkä/karju-trendi

- Lähde: [Temporal trends in porcine and bovine semen characteristics](https://doi.org/10.1016/j.anireprosci.2025.108093)
- Aineistokuvauksen mukaan: 47 757 härkäejakulaattia (1997--2019) ja
  619 368 karjuejakulaattia (2005--2023)
- Paikka: yksi saksalainen AI-keskus kummallekin lajille
- Julkinen data: julkaisu/abstrakti, ei ladattua rivi- tai vuositaulua
- Pyyntö: deidentifioitu ejakulaattitason CSV, collection date, station,
  laboratorion/protokollan muutokset, eläin- ja jalostustiedot,
  season/weather ja siihen soveltuva käyttöoikeus

Tämä on vahva vastakkaissuuntaisen pitkän trendin kontrolli, mutta yhden
aseman asetelma estää spatiaaliset päätelmät. Päättely ei saa alkaa
julkaisun aggregate-kuvaajista.

### 2.3 Morris Animal Foundation GRLS — ensisijainen koirapyyntö

- Lähde: [Reproductive History](https://datacommons.morrisanimalfoundation.org/artisanal_dataset/131)
  ja [Data Commons](https://datacommons.morrisanimalfoundation.org/)
- Rakenne: neljä CSV:tä; koira-ID, tutkimusvuosi, kiima, paritus,
  AI-tuore/jäädytetty, tiineys, pentue, elävänä/kuolleena syntyneet,
  uroksen semen collection- ja fertility concern -kentät
- Kesto: tutkimusvuoteen 8 asti; kohortti aloitettiin 2012 ja siihen kuuluu
  noin 3 044 golden retrieveria
- Mahdolliset liitokset: samassa Data Commonsissa julkaistaan ympäristö- ja
  location history -aineistoja, jos niiden subject_id- ja aikarakenne sallii
- Käyttöehto: landing-sivu näyttää Login to Download; palvelulla on data use
  agreement ja julkaisun acknowledgment-vaatimus
- Pyyntö: tutkimuskäyttötili, Reproductive History -paketti sekä erikseen
  location/environment-releaset, data dictionaries, poistettujen paikkatietojen
  tarkkuus ja linkitysavainten käyttöehdot

Tämä on prospektiivinen koirakohortti, ei stud-dog semen quality -sarja.
Sen vahvuus on yksilö- ja vuositason lisääntymishistoria, mahdollinen
ympäristöliitos ja useiden USA-alueiden koirat. Sen heikkous on yhden rodun
valikoitu kohortti sekä se, ettei RF-annosta ole automaattisesti mukana.

### 2.4 CDCB National Cooperator Database — kansallinen nautahedelmöitys

- Lähteet: [CDCB database](https://uscdcb.com/database/),
  [data usage request](https://uscdcb.com/data-request/) ja
  [trait definitions](https://uscdcb.com/individual-traits/)
- Kattavuus: yli 80 vuoden yhdysvaltalaiset dairy-performance-tietueet;
  public WebConnect näyttää johdettuja arvioita ja kansallisia yhteenvetoja
- Reproductive grain: palvelusiemennys- ja conception-tietueita on
  National Cooperator Database -aineistossa; Sire Conception Rate on
  AI-härkien hedelmällisyyden johdettu trait
- Julkinen data: johdettuja arvioita ja aggregaatteja, ei raakaa historiallista
  insemination-/conception-paneelia
- Pyyntö: hyväksytty data request ja toimittaja-oikeudet; pyydä tarkka
  deidentifioitu AI/conception-grain, ajankohta, mahdollinen alue, sire ID,
  cow covariates ja jalostusarvon versio

CDCB ei ole semen-CASA-aineisto. Sen arvo olisi kansallisessa
hedelmöitysvastetarkastelussa, jossa geneettinen arvio erotetaan raakahavainnosta
eikä sitä käsitellä altistuksen mittarina.

### 2.5 Karoui ym. 2011, Wahl & Reif 2009 ja SKK Avelsdata

| Lähde | Faktinen kattavuus | Miksi ACCESS_REQUIRED |
|---|---|---|
| [Karoui ym. 2011](https://doi.org/10.1016/j.anireprosci.2011.02.008) | 42 348 ejakulaattia, 502 Holstein-härkää, 1990--2007 | Artikkeli kuvaa kaupallisen AI-aineiston, mutta rivi- ja metadataa ei ole julkaistu ladattavana. |
| [Wahl & Reif 2009](https://doi.org/10.1016/j.envres.2008.10.012) | US AI-organisaatio, 1965--1995 | Pitkä trendiviite, mutta numeerinen paneeli ja asema-/protokollatiedot puuttuvat avoimesta paketista. |
| [SKK Avelsdata](https://hundar.skk.se/avelsdata/Initial.aspx) | Ruotsissa rekisteröidyt koirat 1990--nykyhetki, jälkeläis- ja litter-statistiikka | Ilmainen yksilö- ja verkkohaku, mutta ei dokumentoitua tutkimuskelpoista bulk CSV/API-exportia tai koordinaatteja. Pyydä virallinen bulk-extract ja käyttöehto; älä indeksoi tai kaavi palvelua massana. |

## 3. Hylätyt tai toissijaiset lähteet

| Lähde | Miksi ei nyt |
|---|---|
| [USDA NAHMS](https://www.aphis.usda.gov/livestock-poultry-disease/nahms) | Viralliset raportit ovat hyödyllisiä, mutta yksikkötason farmidata on luottamuksellista ja julkaistaan aggregateina. Ei valmis alue×aika-semen-paneli. |
| [NANP Animal Performance Information](https://agdatacommons.nal.usda.gov/articles/dataset/National_Animal_Nutrition_Program_NANP_Modeling_Animal_Performance_Information/24662358) | Julkinen XLSX sisältää conception-, birth- ja environment-kenttiä monista kokeista, mutta ei yhdenmukaista pitkää saman aseman/seurantakohortin panelia. Sopii myöhemmin mekanistiseksi meta-analyysiksi, ei sentinelliksi. |
| South African cattle Dryad ja TEC Costa Rica -seminologiat | Avoimia ja numeerisia, mutta yksittäisiä pieniä tai alle viiden vuoden laboratorio-/näyteaikasarjoja. Ei tehdä niistä näennäistä pitkää kontrollia. |

## 4. Hankinnan portti ennen ingestia

Jokaisen ACCESS_REQUIRED-pyynnön on tuotettava ennen koodin kirjoittamista:

1. data dictionary ja alkuperäinen raakamuoto;
2. havaintograin sekä yksilö-, ejakulaatti-, siemennys-, farmi- ja
   station-avainten suhteet;
3. tarkka päivämäärä tai vähintään kuukausi/vuosi sekä paikka- tai
   alueavain;
4. valinta-, laatu-, laboratorio- ja jalostusprotokollan muutokset;
5. lisenssi, tutkimuskäyttöehto ja mahdollinen tulosten julkaisurajoite;
6. ulkoisen RF-mittauksen tai kenttäproxy-liitoksen realistinen
   avain ja ajallinen kattavuus.

Jos yksikin kohta 1--5 puuttuu, aineisto jää candidate-ledgeriin eikä sitä
normalisoida. Jos kohta 6 puuttuu, se voidaan silti säilyttää
seminology- tai veterinary-benchmarkina, mutta se ei ole RF-annos-vastetesti.
