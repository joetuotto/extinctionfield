# Teknologiahistorian toteutus sivustoon ja BERM:n syötteisiin

8.9.2026. Toteutus perustuu tämän kansion inventaarioon ja neljään historiallisten lähteiden katsaukseen. Käyttäjän hyväksymä tavoite oli selkeä kokonaisuus, johdantokonteksti, kuvaajien korjaus ja puuttuvien datalähteiden integrointi.

## Lukurakenne

Teknologiasivun alku kuvaa, miksi johto, radiolähetin, invertteri, elektrodi ja varautuva materiaali tarvitsevat erilaisen lähdehistorian. Neljän vaiheen lukupolku kulkee lähteen tunnistamisesta alueelliseen käyttöönottoon, organismin kohtaamiseen ja BERM:n ehdolliseen vasteeseen.

Laaja sisältö jaetaan neljään näkymään:

1. **Teknologiat:** kuusi ympäristöä ja 45 lähdeperhettä. Aloitus näyttää ympäristöt. Tekniikan valinta avaa fysikaalisen profiilin, käyttö- ja vuodenaikatekijät, dokumentoidut tapahtumat, BERM-merkityksen sekä puuttuvat historiatiedot.
2. **Alueellinen historia:** yhteensä 63 lähteistettyä tapahtumaa, joita voi rajata ympäristön, hakusanan, alueen, ajanjakson ja tapahtumatyypin mukaan. Historiassa ovat erikseen käyttöönotto, asennusohjelma, mittaus/raportti, standardi/sääntely ja poistuminen. Janan pituus tarkoittaa dokumentoitua aikaväliä.
3. **Omaksumistiedot:** viisi numeerista sarjaa, joissa on yhteensä 24 raportoitua havaintoa. Yksi määritelty suure näytetään kerrallaan. Vuosittaisten sarjojen viivat katkeavat puuttuvan vuoden kohdalla; harvojen pisteiden välille ei piirretä omaksumiskäyrää. Arvot, päivämäärä, yksikkö, perusjoukko ja lähde löytyvät taulukosta.
4. **Lähteet ja kattavuus:** 63 historialähteen rajaukset, ladattavat historiatietueet ja numeerinen aineisto, muut mallissa olevat aineistot sekä täydennettävät yhteydet.

Ympäristöjako on navigointia varten. Samaan fyysiseen laitteeseen voi liittyä useita luokkia: esimerkiksi datakeskuksen UPS ja jäähdytys. Luokkien lukumäärää ei summata annokseksi eikä itsenäisten vaikutusten määräksi.

## Yhteinen tietorakenne

- [technology-history.json](</Volumes/kovalevy 3/extinctionfield/website/data/technology-history.json>) on teknologioiden, historiallisten tapahtumien ja niiden lähteiden yhteinen rekisteri.
- [technology-history.ts](</Volumes/kovalevy 3/extinctionfield/website/lib/technology-history.ts>) määrittää tyypit, kyselyt ja rakenteen/provenienssin validoinnin. Julkinen `/api/technology-history` palauttaa samat tietueet.
- [TechnologyHistoryExplorer](</Volumes/kovalevy 3/extinctionfield/website/components/TechnologyHistoryExplorer.tsx>) palvelee teknologiasivua, mallisivua ja LayersExplorerin kautta Explore-näkymää.
- Valaistusaikajanan kuusi sääntelytapahtumaa luetaan samasta rekisteristä. Tekstit, vuodet ja lähde-URLit eivät ole erillinen paikallinen kopio.
- Uusi pitkä sisältö on suomeksi ja englanniksi. Muut kielet käyttävät englanninkielistä sisältöä ja teknologiasivulla näkyvää käännösilmoitusta. Mallisivun muutetut väliotsikot ja kuvatekstit päivitettiin kaikille viidelle kielelle.

Rekisterin 45 perheestä 25:llä on tässä lähdeversiossa ajoitettu tapahtuma. Muiden perheiden kohdalla näkyy täsmällinen historiatiedon aukko. Tunnistettu teknologiaperhe ja lähteellä ajoitettu alueellinen käyttö eivät ole sama tietotaso. Keksittyä päivämäärää tai aiheeseen sopimatonta lähdettä ei lisätty aukon peittämiseksi.

## Integroitu numeerinen aineisto

| Sarja | Havainnot | Lähde ja perusjoukko |
|---|---|---|
| Yhdysvaltain AMI-mittarit | 2015–2024, 10 vuosihavaintoa | EIA Electric Power Annual, taulukko 10.05; kaikki neljä asiakassektoria |
| Yhdysvaltain AMR-mittarit | 2015–2024, 10 vuosihavaintoa | Sama EIA-taulukko; erillinen mittaustekniikka |
| Ranskan Linky-kanta | Loppuvuosi 2021 ja marraskuu 2022 | CRE; Enedisin jakelualue, ei kaikkien Ranskan verkkoyhtiöiden yhteismäärä |
| Suomen tuntimittauksen kattavuus | 2017, 99 % | TEM 38/2017; käyttöpaikat, absoluuttista nimittäjää ei annettu |
| Maailman ilmastointilaitekanta | 2017, noin 1,7 miljardia | IEA:n raportoitu arvio kaikista ilmastointilaitteista, ei invertterikannan mittaus |

AMI-/AMR-kuvassa voi vaihtaa määrästä osuuteen. Osuuden nimittäjänä käytetään saman vuoden kaikkien mittarien määrää. Taulukossa alkuperäinen lukumäärä, nimittäjä ja laskettu prosentti säilyvät näkyvissä.

[technology-adoption.json](</Volumes/kovalevy 3/extinctionfield/website/public/data/technology-adoption.json>) sisältää havaintojen lisäksi alkuperäislähteet, julkaisu- ja hakupäivämäärät, lukutason, tarkistussummat, yksiköt ja soveltamisrajat. Neljän primäärilähteen ja poimintamääritysten versioitu paketti on noin 4,14 MB.

[Tuonti](</Volumes/kovalevy 3/extinctionfield/berm/scripts/import_technology_history.py>) tarkistaa lähdetiedostojen SHA-256-arvot sekä EIA:n teknologia- ja sektorisummat ennen normalisointia. Luvut poimitaan tallennetuista lähteistä. Offline-toisto on deterministinen, ja epäonnistuva päivitys ei korvaa nykyistä julkaisua. [Lähdepaketin käyttöohje](</Volumes/kovalevy 3/extinctionfield/berm/data/raw/technology_history_2026-09-08/README.md>) sisältää tuonti- ja päivityskomennot.

[BERM:n lukusovitin](</Volumes/kovalevy 3/extinctionfield/berm/berm/data/technology_history.py>) lukee sekä numeeriset havainnot (`load_history`) että sivuston kanonisen teknologia-, tapahtuma- ja lähderekisterin (`load_catalogue`). Tietueet ovat muuttumattomia. Numeerisen sarjan puuttuva vuosi palauttaa puuttuvan havainnon. Tapahtumia voi rajata teknologian, alueen ja alkuperäisen aikavälin mukaan; pistetapahtumaa ei jatketa tuleville vuosille. Lähde ja sen soveltamisrajat kulkevat tietueen mukana. Ennustekertoimet ja lukitut ennusteet eivät muutu tämän lähdeintegraation mukana.

World Bank/ITU:n indikaattorit, ANFR:n kenttämittaukset ja aiemmat LED-ryhmäarviot on yhdistetty aineistoluetteloon omilla rooleillaan: välillinen indikaattori, paikallinen mittaus ja skenaario. Niitä ei yhdistetty automaattisesti mittarikantaan tai muutettu uusiksi havainnoiksi.

## Kuvaajien korjaukset

[Erillinen kuvaaja-auditointi](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/chart_audit.md>) säilyttää aiemmat ongelmat ja tehdyt korjaukset. Olennaiset muutokset:

- Etusivun teknologiagradientin käsin asetetut teknologiaskoorit ja yhdistävä TFR-viiva korvattiin laadullisella vertailuasetelmalla.
- Etusivun yleiskuvan lähteettömät EMF-prosentit ja tautikäyrät korvattiin käsitteellisellä lähde–BERM-vaste–populaatio-kaaviolla.
- LayersExplorerin erillinen 12 kerroksen luettelo ja lajeille asetetut pisteet korvattiin yhteisen rekisterin näkymällä.
- Valaistuskuvan lähteetön prosenttikäyrä korvattiin alueellisilla sääntelytapahtumilla ja täsmällisellä IEA:n myyntiaineiston linkillä.
- Mallisivun globaaleiksi tulkittavat aloitusvuodet ja käsin piirretty kasvava pinta-ala korvattiin yhteisillä lähdeperheillä ja historialla.
- Uudet numeeriset kuvaajat näyttävät raportoidut arvot, yksiköt, nimittäjät, aukot ja lähteet. Mobiilissa kuvaajan tekstit suurenevat suhteessa kuva-alaan, ja koko kuva pysyy näkyvissä.

## BERM:n identiteetti ja johtoraja

Toteutuksen lähtökohtana on vuoden 2025 muotoilu `g = η + κ A⊗A`. Lisäys b antaa täsmällisesti `Δg = κ(A⊗b + b⊗A + b⊗b)`. Tämä on geometrian ehdollinen seuraus. Historiatiedot ja kenttämittaukset ovat tuotua empiiristä syötettä. Vastetta varten tarvitaan BERM:n vastaanotinkohtainen ehdollinen operaattori ja vastaanottimen tila. Tuotu biologia sekä gauge-, mittakaava-, kudos-, merkki- ja viivekalibrointi ovat näkyvissä erillisinä.

FieldState pysyy valinnaisena mittaus- ja estimointihaarana. Mallin arkkitehtuurisopimusta ei muutettu. Yhteisten tarkistusten yhteydessä täydennettiin viisi toisessa samanaikaisessa muutoksessa lisätyn proxy-väitteen atlas-sidontaa olemassa olevan täsmällisen kohdekartan mukaan; väitteisiin, evidenssitasoihin tai biologisiin kertoimiin ei tehty tämän vuoksi muutoksia.

## Tarkistukset

- Koko sivuston testit: **514/514 läpi**, 41 testitiedostoa. Näihin sisältyvät lähdetietueiden, numeeristen suureiden, käyttöliittymän ja viiden kielen SVG-hydraation tarkistukset.
- Teknologia-aineistojen ja BERM:n arkkitehtuurisopimuksen Python-testit: **43/43 läpi**.
- Offline-tuonti tuottaa tavutasolla saman julkaisun: **5 sarjaa, 24 havaintoa, 4 lähdettä**. Tarkistussummat, sektorisummat sekä vuosikohtaiset nimittäjät tarkistettiin.
- Rekisteri-, viite-, tyyppi- ja linttarkistukset sekä tuotantokäännös läpäisty. Rekisteritarkistuksessa on **0 virhettä ja 14 aiempaan DKC-tilaan liittyvää varoitusta**; niitä ei muutettu tämän työn hyväksynnöiksi. Julkista sivustoa ei julkaistu tässä tehtävässä.
- Esirenderöidyn HTML:n tarkistus: **547 reittiä**, ei raakoja käännöstunnuksia, tyhjiä tekstielementtejä tai tyhjiä linkkejä.
- Tuotantopalvelimen tärkeimmät reitit ja molemmat aineistolataukset vastaavat onnistuneesti. JSON-vastaukset vastaavat kanonisia tiedostoja; historiatiedoston latausotsake tarkistettu.
- Selaimessa tarkistettiin suomenkielinen aloitus, ympäristövalinta, hakurajaus, historialliset tapahtumat, määrät/osuudet, harvat pisteet ja lähdetaulukko. Näppäimistöllä toimivat välilehdet ja niiden paneeliviittaukset tarkistettiin. Englannin ja muiden kielten fallback-reitit tarkistettiin.
- Työpöytä- ja 375 pikselin mobiilinäkymä tarkistettu. Teknologiasivulla ei ollut vaakasuuntaista ylivuotoa. Mobiilikuvaajan fonttikokoa ja vuosimerkintöjä korjattiin luettavuuden parantamiseksi.
- Lopullinen tuotantoselaimen tarkistus ei raportoinut virheitä tai varoituksia valaistus- ja teknologiasivuilla. Aiemmin löydetty SVG-hydraatiovirhe korjattiin ja suojattiin ennen korjausta epäonnistuvilla regressiotesteillä. Teknologiasivun pääsisältö käyttää sivuston yhteistä saavutettavuusmaamerkkiä.
