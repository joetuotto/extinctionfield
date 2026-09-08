# BERM:n ehdollinen päätepistekalibrointi

8.9.2026. Muutosatlaksen ennustekytkimen uusi oletus sovittaa rajatun BERM-päätepistesulun lähdehavaintoihin ja näyttää sen vuotuisen jatkon samalla aikajanalla teknologian ja biologisten havaintojen kanssa. Tämä muistio kuvaa nykyisen kalibrointitoteutuksen. [Aiempi käsin asetettavien herkkyyksien toteutus](endpoint_implementation.md) säilyy valinnalla `ep_fit=manual`. Tämän kierroksen testit, tuotantokoonti ja paikallisen tuotantoesikatselun tarkistus on tehty; tulokset ovat muistion lopussa.

## Mitä kalibroidaan

Jokaiselle valitulle havaintosarjalle sovitetaan **yksi etumerkillinen tehollinen vastekerroin β kutakin kanavavaihtoehtoa kohti**: vuotuinen, kertynyt tai niiden ennalta painotettu summa. Kyseessä eivät ole samanaikaisesti vapaasti sovitettavat vuotuinen ja kertynyt kerroin. Testosteronin ja TFR:n kertoimet sovitetaan erikseen; hormonista ei johdeta TFR:ää nimeämättömällä muunnoksella.

Kalibroinnin viitelaskennassa lähdesarjat, normalisointi, oletetut amplitudit ja suunnat, geometrinen projektio sekä viive-, muisti- ja säilymisytimet on kiinnitetty ennen β:n sovitusta. Lähtöhavainto määrää siihen ehdollisen logaritmisen tason `logScale`; se ei ole toinen riippumaton sovitusparametri. Näin laskelma voi vastata rajattuun kysymykseen: millainen päätepistekerroin tekee tämän nimettyihin oletuksiin perustuvan BERM-kanavan yhteensopivaksi valitun kalibrointiaineiston kanssa?

Tämä on päätepistesulun tilastollinen kalibrointi. Se ei yksin tunnista paikallista EMF-kenttää, kudosherkkyyttä tai kausaalista vaikutusta. Samansuuntainen ajallinen muutos ei ratkaise lähdeasteikon, vastekertoimen, muiden muuttuvien tekijöiden ja vastaanottimen tilan keskinäistä tunnistettavuutta.

## Geometriasta vuotuiseen ja kertyneeseen tilaan

Vuoden 2025 lähtökohta ja sen täsmällinen avaus ovat

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_0+\sum_j a_j,
\]

\[
\Delta g=\kappa\left[A_0\otimes\sum_j a_j+\sum_j a_j\otimes A_0+\sum_{j,k}a_j\otimes a_k\right].
\]

Laskenta käyttää tästä nimettyä, normalisoitua geometrista projektiota `G(t)`. Lähteiden omat termit, taustatermi ja lähteiden ristiosat säilyvät. Historiallinen käyttöaste ei suoraan ole potentiaali tai annos: tilastosta lähdeprofiiliin ja siitä projektion amplitudiin tehdyt muunnokset ovat erikseen tallennettuja oletuksia. Geometrinen koordinaatti `χ_geo` ei ole kudosherkkyys.

Ajallinen ketju on

\[
U(t)=\frac{1}{m+1}\sum_{d=\ell}^{\ell+m}G(t-d),\qquad
C(t)=\lambda C(t-1)+U(t)\times1\ \text{vuosi},\qquad
\lambda=2^{-1/h}.
\]

Viiveen `ℓ=3` ja muistin `m=5` oletuksilla `U` käyttää kuutta vuosinäytettä, viiveitä 3–8 vuotta. Säilymisen oletuspuoliintumisaika `h` on 20 vuotta; arvolla 0 käytetään `λ=0`. Tämä on diskreetti vuosittainen säilymiskonventio. `C` on etumerkillinen projektiovuosina ilmaistu mallisuure, ei mitattu yksilöannos eikä mitattu biologinen varasto.

Kolme vaihtoehtoa ovat `S_A=w_A U`, `S_C=w_C C` ja `S_A+C=w_A U+w_C C`. Oletukset ovat `w_A=1` ja `w_C=0,05/vuosi`. Yhdistelmässä molempien osuuksien suhteellinen paino on siis kiinnitetty ennen yhden β:n sovittamista. Kanavien samanaikainen käyttö on BERM:n ehdollinen sulkuoletus; se ei osoita kahta toisistaan riippumatonta biologista reittiä.

Historia lasketaan aina vuodesta 1880, oletusarvolla `C(1879)=0`. Alkutila ja alkuvuosi ovat rajatun historian oletuksia. Näyttöikkunan siirtäminen ei nollaa kertymää. Puuttuvaa profiilivuotta ei korvata nollalla: siitä riippuva `G` tai `U` jää avoimeksi, ja positiivisella säilymiskertoimella myös myöhempi `C` voi jäädä avoimeksi. Lähdekomponentin dokumentoidun aika- tai aluerajan ulkopuoli on osalaskelman kattavuusraja, ei väite lähteen todellisesta alkamisesta tai fysikaalisesta nollasta. Reuna-arvon pitäminen ja havaintojen välinen rekonstruktio säilyvät nimettyinä oletuksina.

## Sovitus, tutkimusjaksot ja lukittu ennuste

Olkoon `P` havaintojakson kalenterivuosien joukko ja `B` lähtöhavainnon jakso. Aritmeettista tutkimuskeskiarvoa verrataan **vuosittaisten päätepiste-ennusteiden keskiarvoon**, ei keskimääräisen syötteen eksponenttiin:

\[
L_P(\beta)=\log\left[\frac{1}{|P|}\sum_{t\in P}\exp(-\beta S_{\rm ref}(t))\right],\qquad
\mathrm{logScale}=\log y_B-L_B(\beta).
\]

β minimoi kalibrointijaksojen tasapainoisen logaritmisen neliövirheen:

\[
\frac{1}{N}\sum_{P\in\mathrm{kalibrointi}}
\left[\mathrm{logScale}+L_P(\beta)-\log y_P\right]^2.
\]

Tasaiset kalenterivuosipainot jakson sisällä ovat eksplisiittinen oletus; ne eivät palauta tutkimuksen osallistuja- tai otosvuosipainoja. Jokainen tutkimusjakso saa sovitusfunktiossa saman painon. Otoskoko, SE tai julkaistu persentiiliväli eivät automaattisesti muutu sovituspainoksi tai kalibroinnin luottamusväliksi. Laskenta käyttää havaintoja natiiviyksiköissään.

Yhden vuoden mediaaniin voidaan soveltaa positiivista kerrointa oletuksella, että ryhmän suhteellinen vaste on yhtenäinen: `median(kX)=k median(X)`. Monen vuoden yhdistetty mediaani ei ole vuosimediaanien keskiarvo, joten nykyinen sulku ei sovita sellaista havaintoa. Piirtomerkki jakson keskellä ei muuta havaintoa kyseisen vuoden mittaukseksi.

Kun β ja `logScale` on laskettu viitesyötteillä, nykyisillä syötteillä tuotettava vuosiarvo on

\[
Y(t)=\exp\left[\mathrm{logScale}_{\rm lukittu}-\beta_{\rm lukittu}S_{\rm nykyinen}(t)\right].
\]

**Molemmat kertoimet pysyvät lukittuina syötteitä muutettaessa.** Lähteen, amplitudin, suunnan, viiveen tai palautumisen muutos ei sovita käyrää uudelleen eikä palauta sitä vanhaan lähtöhavaintoon. Myös ennuste lähtöhavainnon aikana voi tällöin muuttua. Erikseen valittava uudelleenkalibrointi tekee nykyisistä syötteistä uuden viitteen. Lähteen poistamisen tarkastelu muuttaa koko syötehistoriaa samoilla lukituilla kertoimilla; ristitermejä sisältävien lähdepoistojen erotuksia ei voi summata erillisiksi vaikutuksiksi.

Kalibrointirajan ylittävä tutkimusjakso jätetään pois sen sijaan, että osa havainnosta siirtyisi sovitukseen. Myöhempiä yhteismitallisia havaintoja ei käytetä lähtötason tai β:n valintaan. Riittämätön pistemäärä, puuttuva syötehistoria, tuettuja kontrasteja vailla oleva kanava, useampi yhtä hyvä ratkaisu, hakuraja ja äärellisyyden menetys tuottavat nimetyn avoimen tilan. Niitä ei esitetä onnistuneena sovituksena. Raportoidut virheet ovat kuvailevia; ajallisesti myöhempi vertailujakso ei ole riippumaton koe tai kausaalinen validointi.

## Käytössä olevat aineistoprotokollat

| Sarja | Kalibrointiin hyväksytty aineisto ja raja | Tulkinta |
|---|---|---|
| WPP-TFR, kukin atlasmaa erikseen | Oletuksena 1950–2000: 51 vuotuista havaintoa. 2001–2023: 23 sovituksesta pois pidettyä myöhempää havaintoa. | Lähtötaso tulee täsmällisen vuoden 1950 seitsemästä ASFR-ikäryhmästä, 15–49 vuotta. Myöhempi TFR-vertailu säilyy erillään sovituksesta. |
| FINRISK, 60–69 vuotta | Mediaanit 1977: 21,9 ja 2002: 13,8 nmol/l; n=130 ja 23. Raja 2002. | Kaksi mediaania, yksi lähtötasoon suhteutettu kontrasti; ei pois pidettyä vertailuhavaintoa. Oletusviitteen yhdistelmäkanavan `β≈5,83224754` on tämän normalisoinnin tehollinen kerroin. |
| FINRISK, 25–29 vuotta | Vuoden 2002 mediaani 19,1 nmol/l hyväksytään. Varhainen 26,4 nmol/l yhdistää mahdolliset keräysvuodet {1972,1977}. | Yhdistetyn mediaanin aggregointi on nykyiselle sululle avoin. Yksi jäljelle jäävä piste ei tunnista β:tä, joten oletuskalibrointi ei tuota sovitettua käyrää. |
| NHANES, 15–39 vuotta | Keskiarvot 2013–2014: 431,76 ja 2015–2016: 451,22 ng/dl; SE 7,19 ja 10,03. Raja 2016. | Nämä kaksi jaksoa ovat protokollan yhteisellä menetelmäasteikolla; ikä-/BMI-koostumusta ei ole vakioitu. Ei pois pidettyä vertailuhavaintoa. β:n merkkiä ei pakoteta laskua tuottavaksi. |
| Aiempi vakioitu NHANES-sarja | Vähintään 20-vuotiaat; 1988–1991: 5,37 ja 1999–2004: 5,34 ng/ml. Raja 2004. | Sama määritys ja nimetty monimuuttujavakiointi. Säilyy omana tunnuslukunaan; tasavuosipainot eivät toisinna tutkimuksen yksilötason vakiointia. |

FINRISK-vuodet on johdettu tutkimuksen keräysvuosien, ikäryhmän ja syntymäkohortin leikkauksesta. Ryhmät eivät ole koko Suomen miesten vakioituja vuosikeskiarvoja. Suomen 5.–95. persentiilit kuvaavat yksilöjakaumaa, eivät mediaanin luottamusväliä. USA:n ilmoitettu SE säilyy keskivirheenä. Menetelmä- ja rajauslähde: [Perheentupa ym. 2013, taulukko 1 ja menetelmät](https://academic.oup.com/ejendo/article/168/2/227/6659648).

Nuorten USA-sarjan kaikki viisi lähdejaksoa näkyvät edelleen havaintoina. Varhaiset 1999–2000 ja 2003–2004 immunomääritysjaksot jätetään tämän kalibrointiprotokollan ulkopuolelle. Julkaistun 2011–2012 keskiarvon menetelmäsillan korjaustila jäi varmentamatta; arvoa ei oleteta harmonisoiduksi eikä siihen lisätä mahdollista toista korjausta. Rajaus perustuu [Lokeshwarin ym. julkaistuun sarjaan](https://www.sciencedirect.com/science/article/pii/S2405456920300626), [CDC:n 2013–2014 menetelmäsiltaan](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/TST_H.htm) ja [CDC:n 2015–2016 menetelmäkuvaukseen](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2015/DataFiles/TST_I.htm). Aiemman vakioidun sarjan erillinen lähde on [Nyante ym., taulukot ja määritysmenetelmä](https://pmc.ncbi.nlm.nih.gov/articles/PMC4137971/).

TFR-kalibroinnin ASFR-lähtötaso lasketaan `5 × Σ ASFR_a / 1000`. Puuttuvaa lähtövuotta tai ikäryhmää ei korvata WPP:n TFR-arvolla. Vuosittaiset ASFR-ennusteet saadaan kertomalla samat seitsemän lähtövuoden ikäryhmää kertoimella `Y(t)/ASFR-lähtösumma`; niiden ikäprofiili pysyy näin kiinteänä. WPP:n julkaistu TFR ja vain 15–49-vuotiaat kattava ASFR-summa ovat erillisiä tunnuslukuja. Lähdetiedostot ja poiminta: [havaintopohjan sisäänluku](data_integration.md) ja [testosteroniaineisto](testosterone_trends/README.md).

## Mitä vuosittainen kuvaaja näyttää

Teknologian lähdepisteet, niiden valittu rekonstruktio, `G`, `U`, `C` ja niistä johdetut päätepisteet voivat muuttua vuosittain. Näillä on sama kalenteriakseli ja yhteinen vuosikohdistin, mutta `G/U` ja `C` säilyttävät omat yksikkönsä. Johdettu syötehistoria ei ole uusi havaintosarja.

Muiden vastaanotintilan muuttujien vuosihistorioita ei nykyisessä sulussa ole: kudosherkkyys, reseptoritila, uni, BMI, muu hormonidynamiikka ja palautumisen biologinen tilariippuvuus eivät saa keksittyjä aikasarjoja. Ne pysyvät kiinnitettyinä tai avoimina oletuksina. Tunnetut tutkimusryhmät ja mittausmenetelmät ovat aineiston rajauksia, eivät dynaamiseksi vastaanottimeksi tunnistettu malli.

Ennen lähtöankkuria käyrä on pisteviivainen takaisinlaskenta, kalibroinnin aikavälillä yhtenäinen ja aikarajan jälkeen katkoviivainen ehdollinen jatko. Selite on **Kalibrointijakso**, koska muutetuilla syötteillä tuotettu käyrä ei välttämättä enää sovi edes tuon ajan havaintoihin. Raja ja roolit näkyvät myös SVG-kuvassa ja valitun vuoden tiedoissa. Tuntematon vuosi katkaisee mallikäyrän. Hormonihavainnon monivuotinen jakso säilyy vaakajanana; mallin vuosiarvoja ei kirjata hormonimittauksiksi.

BERM:n neljä tasoa säilyvät näkyvinä: vuoden 2025 lähtökohdasta johdettu geometria, tuodut empiiriset havainto- ja biologiset rajaukset, BERM:n ehdolliset ajalliset ytimet ja päätepistesulku sekä avoin fysikaalinen ja biologinen kalibrointi. Gauge-preskriptio, fysikaalinen kytkentäasteikko, kudosytimet, niiden merkit ja viiveet sekä dynaaminen vastaanotintila jäävät avoimiksi, vaikka tämän rajatun päätepistesulun β voidaan sovittaa. FieldState voi tuottaa mitatun tai estimoidun fysikaalisen syötteen; ennuste ja ehdollinen vaste kuuluvat BERM:iin.

## Valinnat, lähdeketju ja vienti

`forecast=1` avaa ennusteen. Oletusmenetelmä on kalibroitu; `ep_fit=manual` avaa aiemman käsin asetettavan sulun. `ep_mode` valitsee kanavan ja `ep_compare=1` näyttää vaihtoehdot. `ep_throughF` ja `ep_throughT` määräävät kalibrointirajat. `ep_reference` säilyttää viitelaskennan lähde- ja ydinasetukset erillään nykyisistä syötteistä; näyttöikkuna ei sisälly tähän viitteeseen. `ep_inputs` ohjaa johdetun syötehistorian näyttämistä.

Havaintojen CSV säilyttää lähdearvot, natiiviyksiköt, tunnusluvun, SE-/persentiilierottelun, todelliset keräysvuodet ja lähdepaikantimen. Malliarvot viedään erilliseen CSV:hen tunnisteella `conditionally_calibrated_BERM_endpoints`. Sen riveillä säilyvät vuosi, kanava, ajallinen/laskennallinen rooli, ennustearvo, β, `logScale`, kalibrointiraja, `G/U/C`, nykyiset parametrit, kalibrointiviite, lähdetietueet ja biomarkkeriprotokolla. Muutettujen syötteiden ennuste erotetaan kalibroinnin viitekäyrästä myös kalibrointivuosina.

JSON- ja SVG-metatiedot säilyttävät mukaan otetut, pois pidetyt ja poissuljetut havainnot perusteluineen, alkuperäiset lähdepisteet ja paikantimet, valitun lähdehistorian, molemmat parametrikokonaisuudet sekä kalibrointitulokset. SVG/PNG:n näkyvä selite ja alaviite kertovat käyrän roolin, kalibrointirajan, β:n ja `logScale`:n, viiteytimen, nykyiset syöteoletukset sekä käytetyt lähteet ja protokollalinkit. PNG säilyttää nämä näkyvinä teksteinä; koneellisesti luettava täydellinen metatieto kuuluu SVG-/JSON-vientiin.

Uudet mallirivit eivät kasvata havaintorekisteriä: yhdistetty atlas säilyttää 83 havaintosarjaa, 4 144 lähdepistettä ja 23 lähdettä. Protokollan menetelmäviitteet ovat lisäksi kalibroinnin lähdeketjussa. Aineistojen alkuperä, julkaistu lähdetunnusluku ja tuotetun malliartefaktin laskentavalinnat säilyvät erillisinä.

## Toteutus ja tarkistuksen rajaus

Keskeiset osat ovat [kalibrointiydin](../../../website/lib/berm-endpoint-calibration.ts), [biomarkkeriprotokollat](../../../website/lib/berm-biomarker-calibration-protocols.ts), [viite- ja nykyislaskennan kokoaminen](../../../website/lib/berm-calibrated-atlas.ts), [ajallinen ydin](../../../website/lib/berm-endpoint-scenario.ts) sekä [kalibrointipaneeli](../../../website/components/BermCalibratedEndpointPanel.tsx).

Kohdennetut regressiot kattavat muun muassa etumerkillisen kertoimen palauttamisen, myöhempien havaintojen eristämisen sovituksesta, lukittujen β:n ja `logScale`:n käytön muuttuvilla syötteillä, näyttörajauksesta riippumattoman historian, tutkimusjakson `mean(exp)`-aggregoinnin, yhdistetyn mediaanin rajan, lähdeprovenienssin, viivatyylien roolit sekä kuvaviennin näkyvät kalibrointitiedot.

### Varmennettu lopputulos 8.9.2026

- Koko verkkosivuston testiajo: **72 testitiedostoa, 871/871 testiä läpi**. Viimeinen ajo sisältää myös kanavien erillisen muutoksen, puuttuvan ASFR-ankkurin, kanonisen viiterekisterin ja mobiilin vuosilukujen välin regressiot.
- Tuotantokoonti läpäisi viite- ja rekisteritarkistukset, tyyppitarkistuksen, tiukan lint-ajon sekä HTML-tarkistuksen: **557 sivua, ei raakaviitetunnuksia eikä tyhjiä elementtejä tai ankkureita**. Viiden kielen hakuindeksi tuotettu. Rekisterin 14 aiempaa DKC-julkaisutilan huomautusta säilyvät erillään tämän kalibrointitoiminnon tarkistuksesta.
- Paikallinen tuotantoesikatselu osoitteessa `127.0.0.1:3011` päivitetty. Selaimessa varmistettu oletuskalibrointi, FIN60/FIN25-ero, USA:n yhteismitalliset menetelmäjaksot, kaikkien kanavien vertailu, lukitun kertoimen säilyminen ja erillinen uudelleenkalibrointi.
- 390 pikselin näkymässä ei vaakasuuntaista ylivuotoa. Yhteinen näppäimistöllä valittu vuosi vaihtaa biomarkkerien sekä G/U/C-ratojen tietoja. Vuosimerkinnät säilyvät erillään. SVG- ja PNG-vienti valmistuivat selaimessa; viennin lähteet, viitetila ja kertoimet on lisäksi tarkistettu regressioissa.

Oletusviitteellä Suomen yhdistelmäkanavan TFR-kerroin on 13,80067073 ja FINRISK 60–69-vuotiaiden testosteronikerroin 5,83224754. Vuoden 2023 ehdolliset arvot ovat noin 0,122 lasta/naista ja 5,978 nmol/l. Havaittu TFR on noin 1,28; kyseisen hormoniryhmän vuoden 2023 havaintoa ei aineistossa ole. Ero säilyy kuvaajassa: myöhempää TFR-aineistoa ei käytetty oletusfitin parantamiseen. Tämä on nykyisen, muita vastaanotintiloja vakiona pitävän sulun tulos, ei kaikkien BERM-mekanismien arvio.

Aikarajan jälkeinen vertailu käyttää kyseisten vuosien rekonstruoitua lähdehistoriaa. Kyseessä on takautuva ehdollinen ennuste tunnetulla syötehistorialla; vuoden 2000 tietotilanteeseen lukittua lähdeteknologioiden tulevaisuusennustetta ei tässä toteutettu. Käyttäjän vaihtama kalibrointiraja tai viiteasetus tuottaa oman nimettävän analyysivalinnan.
