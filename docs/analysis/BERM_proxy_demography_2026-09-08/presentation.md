# Väestöteorioiden integrointi proxy masking -sivuun

8.9.2026. Toteutuksen esitysmuistio liitteelle `/Users/ottojuote/.codex/attachments/9dc10194-89fd-4ed6-846b-b2b509112cce/pasted-text.txt`. Kaikki 23 kohtaa sekä liitteen luokittelu ja lopputopologia luettiin. Toteutus tarkistettiin lähdekoodista työpuussa `/tmp/extinctionfield-proxy-demography-20260908`. Tämä dokumenttipäivitys ei muuttanut sivukoodia. Selaintarkistus on käynnissä; päätehtävä tekee lopulliset build- ja julkaisuvalidoinnit.

## Ratkaisu: yksi soveltava osio, neljä ryhmää, kaksi kuvaa

Osio **”Väestötieteen selitykset samassa ketjussa”** / **“Demographic explanations in the same chain”** ankkurilla `#demographic-explanations` sijaitsee `#syndrome-fragmentation`-osion jälkeen ja ennen `#explanatory-parsimony`-osiota. Sivun neljä peittymistasoa säilyvät. `#proxy-explanations` sisältää eteenpäin vievän linkin tähän sovellukseen. Uusi kokonaisuus on sivun 11. osio; pääosioita on nyt 13.

Lukija saa ensin nykyiseltä sivulta premissit, korrelaation ja välittymisen eron, vastaanoton, biologian, ihmisen kokemuksen ja fragmentaation. Uusi osio soveltaa opitun väestöteorioihin. Sen jälkeen nykyinen parsimonia kokoaa sovellukset samaan rakenteeseen. Tämä välttää 23 uutta pääosiota ja saman fysikaalis-biologisen ketjun aloittamisen aina alusta.

Osion sisäinen lukupolku:

1. Johdanto, BERM-premisseistä johdettu tulkinta ja Bongaartsin kehykseen yhdistävä lähdekappale: teoriat kuvaavat eri vaiheita samassa prosessissa.
2. **Lapsitoiveen toteutumisen prosessikuva.** Näyttää, mihin motivaatio, biologinen kapasiteetti, resurssit, ajoitus, ehkäisy ja hoidot sijoittuvat.
3. **Morgan–Rackinin empiirinen vertailu.** Näyttää samoilta ihmisiltä mitatun aiemman odotuksen ja myöhemmän lapsiluvun välisen suhteen. Tämä konkretisoi prosessin; se ei diagnosoi eron syytä.
4. **Neljä teoriaryhmää ja 23 selattavaa nimikettä.** Kerrallaan yksi ryhmä ja enintään yksi avattu tulkinta lähdeankkureineen. Kuvien jälkeen niiden yhteistä lukutapaa selittävä teksti johdattaa teoriaryhmiin.
5. Avattava Aitkenin, Itaon ja peittymistasojen lähdetäsmennys sekä johtokappale: samat määritellyt prosessit yhdistävät eri havaintotasot; yksittäisen ehdon muuttaminen ei automaattisesti muuta kaikkia ehtoja. Lopussa on linkki parsimoniaosioon.

Toiseksi kuvaksi toteutettiin empiirinen odotus–toteutuma-palkki. Erillistä uutta sensorista palautekaaviota ei lisätty. Palaute kuvataan teoriaryhmän D reittiteksteissä ja yhdistetään vastaanotto-osioon.

## Neljä ryhmää ja kaikkien 23 kohdan sijoittelu

Ryhmät ovat lukemisen aihejako, eivät uusia peittymistasoja tai näytön vahvuusluokkia. Jokaisella nimikkeellä on yksi pääpaikka; ankkurilinkit osoittavat vastaaviin prosessikohtiin. Ryhmittelyn lähde on `website/lib/proxyDemographyData.ts`: ympäristö ja kehityskulku (`infrastructure`, 6), aikeet ja toteuttamisen ehdot (`agency`, 7), biologinen kapasiteetti (`capacity`, 5), yhteisön palaute (`feedback`, 5).

| Liitteen kohta | Pääryhmä | Näkyvä tehtävä ja nykyinen tausta |
|---|---|---|
| 1 Demografinen transitio | A · Ympäristö ja kehityskulku | Modernisaatio kokoaa muutoksia; nykyinen korrelaatiokaavio ja Belmin-taulukko. |
| 2 Koulutus | A | Koulutus, infrastruktuuri ja ajoitus erotellaan; ei liitteen varmentamatonta R²-sarjaa. |
| 4 Kaupungistuminen | A | Koontiluokka sisältää useita ympäristö- ja resurssireittejä; linkki nykyiseen proksiselittäjään. |
| 7 Beckerin malli | A | Vaihtoehtoiskustannukset ja resurssit ovat todellisia ehtoja; kapasiteettia ei päätellä rahapanoksen vaikutuksesta. |
| 19 Kaksi väestöllistä polkua | A | Muodon sovitus ja materiaalisen mekanismin tunnistaminen erotetaan; luvut vain lähdeauditoituna. |
| 20 Epätäydellinen konvergenssi | A | Vastaanottotila, historia, instituutiot ja jakaumat antavat nimetyt syyt heterogeenisuudelle. |
| 3 Ehkäisy | B · Aikeet ja toteuttamisen ehdot | Todellinen raskauden toteutumiseen vaikuttava reitti; ei nimitetä pelkäksi näennäiseksi proksiksi. |
| 5 Naisten valtaistuminen | B | Toimintamahdollisuudet ja omat tavoitteet; autonomia ei itsessään diagnosoi biologista tilaa. |
| 6 Toinen demografinen transitio | B | Koetut arvot, suhteet ja biologisesti toteutuvat motivaatioprosessit; nykyinen tulkkimekanismi. |
| 13 Lykkääminen | B | Ajoitus ja sen biologiset seuraukset; ikä ei ole suoraan kumulatiivinen EMF-annos. |
| 14 Aie–toteutuma-kuilu | B | Eri prosessivaiheet ja samojen ihmisten pitkittäismittaus; uuden empiirisen kuvan ankkuri. |
| 16 Ilmastoahdistus | B | Koettu syy ja sen historia; huolen sisältö tai lisääntymispäätös ei osoita hormonihäiriötä. |
| 22 Pronatalistinen politiikka | B | Interventio kohdistuu osaan ehdoista; lopputulos ei yksin nimeä jäljelle jäävää estettä. |
| 10 Siemennestetrendit | C · Biologinen kapasiteetti | Linkki nykyiseen trendi- ja lajivertailuun; ei toista kuvaajia tai täydellistä altistuskorrelaatiota. |
| 11 Kemikaalit | C | Todellinen altiste, tilariippuvuus ja yhteisvaikutus; nykyinen `#joint-exposures`. |
| 15 ART | C | Hoito muuttaa tiettyä vaihetta ja voi kompensoida rajoitetta; linkki nykyiseen kompensaatioon. |
| 17 Kivessyöpä ja vauraus | C | Erillinen päätemuuttuja ja kehityshistoria; kenttäsyytä ei päätellä vaurausproksista. |
| 18 Epigeneettinen periytyminen | C | Muisti ja sukupolvien välinen välitys nimettyinä lisäliitoksina; tutkimuksessa mitattu sukupolvi erotellaan. |
| 8 Low fertility trap | D · Yhteisön palaute | Väestörakenne, kontaktit, opitut odotukset ja sensorinen ympäristö ajan yli. |
| 9 Sosiaalinen vertailu | D | Sosiaalinen vaikutus ja kuormitus todellisina vahvistavina reitteinä; ei uusi esimerkki samasta RF-käyrästä. |
| 12 Älypuhelimet | D | Sisältö, valo, RF ja ajankäyttö eri sisääntuloina; linkki ruutuaika- ja altistusmittauskohtaan. |
| 21 Kiinan politiikan jälkivaikutus | D | Politiikan, ajoituksen, normien ja biologisen tilan eri aikaskaalat; historiatiedot vain auditoituna. |
| 23 Ihanteellinen perhekoko | D | Kontaktit, oppiminen, kokemus ja myöhemmät ihanteet; nykyinen ihmisen aistinäyttö toimii komponenttina. |

## Peittymisen neljä tasoa pysyvät samoina

`website/components/ProxyMaskingLevels.tsx` antaa nykyisen sanaston. Liitteen numerointia ei siirretä rinnalle:

| Liitteen luokka | Nykyisen sivun paikka |
|---|---|
| PM1 tilastollinen | 1 · Tilastollinen peittyminen |
| PM2 tutkimuksen ja attribuution epäsymmetria | 4 · Episteeminen peittyminen |
| PM3 kokemuksen tulkinta | 3 · Fenomenologinen peittyminen |
| PM4 syndrooman fragmentaatio | 4 · Episteeminen peittyminen |
| PM5 sensorinen | 2 · Sensorinen peittyminen |

ART:n kompensaatio ei muutu tutkimuksen epäsymmetriaksi vain liitteen PM2-nimityksen vuoksi. Luokitus tehdään kuvatun prosessin mukaan. Tutkimusmäärien epäsymmetria ja kausaalisen vaikutuksen näyttö ovat eri asioita.

## Visualisointi 1: lapsitoiveen toteutumisen prosessi

Toteutettu komponentti: `ProxyDemographicProcess({ locale })` tiedostossa `website/components/ProxyDemographicProcess.tsx`, ankkuri `#demographic-process`.

Kuva esittää **lapsitoiveen toteutumisen reitin**, ei yleistä kaikkien syntymien kaavaa. Vaiheet:

`lapsitoive → käytännön edellytykset ja ajoitus → yritys tai hoito → raskauden alkaminen ja syntymään eteneminen`.

BERM:n ehdollinen `kenttäsyöte → vastaanottotila` liittyy erikseen **motivaatioon** ja **biologiseen kapasiteettiin**. Motivaatio liittyy toiveeseen ja toiminnan aloittamiseen; kapasiteetti raskauden alkamiseen ja kulkuun. Resurssit, politiikka ja ehkäisy näkyvät oikeissa vaikuttavissa kohdissa. Niitä ei piirretä vain biologisen tilan seurauksiksi tai ulkoisesti merkityksettömiksi nimiksi. Raskaudet voivat alkaa myös suunnittelematta; tämä kerrotaan näkyvässä kuvatekstissä.

Neljä valitsinta: **Ajoitus / Edellytykset / Kapasiteetti / Hoito**. Valinta korostaa relevantit kohdat ja näyttää 1–2 lauseen selitteen. Se ei vaihda lukuarvoja tai simuloi politiikan tehokkuutta. Kaikki nuoliyhteydet ja muiden ehtojen olemassaolo pysyvät näkyvissä. Päätelmä on suora: yhden ehdon muuttaminen ei itsessään muuta kaikkia muita ehtoja. Historiallisen kenttäosuuden kalibrointi mainitaan kerran kuvatekstissä.

Mobiilissa vaiheet pinoutuvat pystysuoraan; leveämmässä artikkelissa käytetään korkeintaan neljää päävaihetta rivillä. Pitkät termit ovat HTML-tekstiä. Nuolten ja värikorostusten lisäksi valittu vaihe erottuu reunuksella ja tekstillä. Kuvassa ei ole keinotekoisia vuosia, R²-arvoja, hormoniarvoja tai todennäköisyystuloa.

## Visualisointi 2: odotus ja myöhempi lapsiluku samoilta ihmisiltä

Toteutettu komponentti: `ProxyIntentionOutcomeChart({ locale })` samassa tiedostossa, ankkuri `#demographic-intention-outcomes`.

Kaksi empiiristä 100 % pinottua palkkia, naiset ja miehet. Luokat: **vähemmän / yhtä monta / enemmän lapsia kuin aiemmin odotettu**. Morgan–Rackin 2010 -tutkimuksen taulukosta 2A tarkistetut osuudet ovat naisilla 34,9 / 43,4 / 21,7 % (n=3 783) ja miehillä 42,8 / 34,2 / 23,0 % (n=3 584). Oman odotuksen mittaus oli noin 24-vuotiaana; saman henkilön toteuma mitattiin 41–50-vuotiaana vuonna 2006. Osuudet on painotettu vuoden 2006 otospainoilla. Lähdeauditti ja koneelliset tietueet: `demography_sources.md` ja `demography_references.json`.

Jokaisen palkin alla samat kolme arvoa ovat tekstissä. Luokat eivät käytä onnistuminen/epäonnistuminen-sanastoa: muuttunut toive ja täyttymätön toive eivät ole sama mittaus. Kuvaa ei nimitetä prosentiksi biologista hedelmättömyyttä. Oma aiempi odotus erotetaan väestön ihanteellisesta lapsiluvusta ja periodi-TFR:stä. Lähdeviite ja painotuksen täsmennys ovat kuvan yhteydessä.

Kapea SVG-palkki esittää jakauman; prosentit ovat erillisessä HTML-luettelossa. Luettelon responsiivinen rakenne vaihtuu kolmisarakkeiseksi 420 pikselin taittopisteestä alkaen. Tämä on lähdekoodin toteutustieto, ei väite valmiista mobiilitarkistuksesta. Värit ovat sivun sarjavärejä ja luokkajärjestys sama molemmissa palkeissa. Sukupuolen vaihtovalitsinta tai animaatiota ei lisätty: molemmat havainnot ovat näkyvissä.

## 23 nimikkeen esitystapa ja toiston rajaus

`ProxyDemographicTheories` näyttää ryhmän valinnan jälkeen 5–7 nimikettä avattavana luettelona. Enintään yksi nimike on auki, ja käyttäjä voi sulkea myös sen. Ryhmän vaihtaminen avaa uuden ryhmän ensimmäisen nimikkeen. Jokainen nimike sisältää kolme erotettua osaa:

- **Mitä selitys tavoittaa?** Havainto ja todellinen kausaalinen tehtävä.
- **Mitä BERM johtaa?** Nimetty pidempi reitti ja täsmällinen johtopäätös.
- **Yhteys tutkimusnäyttöön.** Auditoitu komponentti, populaatio ja lähde. Mallin koostama liitos on erotettu lähteen mitatusta tuloksesta.

Ei kausaalisuuden ✓/✗-voittotaulukkoa, tähtiarvosanoja, 23 ennustetta tai 23 kertaa toistettua täyttä fysiikkajohdantoa. Premissit ovat näkyvissä ennen sovellusta; niiden sisällä johtopäätökset kirjoitetaan suoraan. Empiirinen lähde rajataan silti omaan mittaamaansa asiaan. Periaate on sama kuin nykyisessä `ProxyExplanationsExplorer`-komponentissa, mutta aiheena ovat teoriat ja toteutumisen vaiheet, eivät uudestaan samat kymmenen proksimuuttujaa.

Nykyiset `ProxyMaskingCurveExplorer`, `ReceiverStateExplorer`, `InteractionExplorer`, `ActivityProxyChart`, Belmin-taulukko ja lajitrendit säilyvät omissa tehtävissään. Uusi osio linkittää niihin eikä monista käyriä, lukuja tai lähdekappaleita. Myöhempi `ExplanatoryLevelsDiagram` ja `ProxyCoverageMatrix` säilyvät yleisen synteesin välineinä.

## Julkaisurajat ja saavutettavuus

Historiaväitteitä, kaikkiin maihin ulottuvia yleistyksiä, R²=0,999/r=1,000-lukuja, tarkistamattomia prosenttiosuuksia ja oireprofiilien diagnostisia väitteitä ei siirretty sellaisinaan. Lähdeaudittien täsmennykset näkyvät teoriakorteissa ja avattavassa lähdeosassa. Esitys ei tarvitse näitä yleistyksiä rakenteellisen argumentin perustaksi. Myöskään kaikki ruutuaikatutkimukset eivät muutu RF-kokeiksi tai ihmisen oma perustelu hormonimittaukseksi.

FI/EN on toteutettu täydellisinä, muille käytetään `pickCopy`-varakieltä. Uudella pääosiolla on vakaa ankkuri ja sisällysluettelorivi. Valitsimet ovat oikeita näppäimistöllä toimivia painikkeita, `aria-pressed` ja `aria-controls`. Päivityksestä ilmoitetaan lyhyesti `aria-live="polite"`; ruudunlukijalle ei lueta koko pitkää artikkelia uudestaan. Ryhmien ja teorioiden valinta ei siirrä fokusta tai vieritä sivua automaattisesti.

Kuvat käyttävät `<figure>`- ja `<figcaption>`-rakennetta. Prosessidiagrammi on HTML-tekstiä; palkkien SVG-title/desc annetaan Reactille yhtenä tekstilapsena. Kuvaajakomponentin kuusi testiä läpäisivät korostusten, säilyvien prosessiehtojen, kolmen kielivaraversion, julkaistujen prosenttien ja otosten, 100 % summien sekä SSR/hydration-toiminnan tarkistukset. Komponentin lint-tarkistus läpäistiin. Selaimessa tarkistettiin valitsimien ja avattavien selitysten toiminta sekä kuvien ulkoasu 721 CSS-pikselin näkymässä ilman vaakaylivuotoa tai selaimen virheilmoituksia. Tätä ei kirjata erilliseksi 320/375 pikselin laitetestiksi tai koko sivun näppäimistöpolun tarkistukseksi. Lopullisten tarkistusten kooste on [README.md](README.md)-tiedostossa.
