# Viiden maan historiallinen lähdeympäristön rekonstruktio

Päiväys: 8.9.2026. Maat: Suomi, Yhdysvallat, Yhdistynyt kuningaskunta, Saksa ja Japani. Tämä dokumentti johdetaan ensin vuoden 2025 premissistä; teknologiahistoria täyttää tämän jälkeen vain fysikaalisen lähdeympäristön historiaa.

## BERM-portti ja tarkka rajaus

[TUOTU PREMISSI, 2025] BERM käyttää vuoden 2025 Weyl/GME-formulaation normalisointia

\[
g_{\mu\nu}[A]=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Tämä ei ole vuoden 2021 singulaarinen identifikaatio. Merkitään olemassa olevaa kokonaispotentiaalia \(A=A_{\mathrm{bio}}+A_{\mathrm{luonto}}+\sum_j a_j\) ja uutta tai muuttunutta lähdekomponenttia \(b\).

[JOHDETTU] Bilineaarisuuden perusteella, ilman skalaarista supistusta,

\[
\begin{aligned}
\Delta g_{\mu\nu}
&=g_{\mu\nu}[A+b]-g_{\mu\nu}[A]\\
&=\kappa\big(A_\mu b_\nu+b_\mu A_\nu+b_\mu b_\nu\big).
\end{aligned}
\]

Jos lisäys koostuu useasta komponentista, \(b=\sum_k b_k\), viimeinen termi on \(\sum_{k,l}b_{k\mu}b_{l\nu}\). Aiempi tausta säilyy ristitermeissä. Teknologiaperheen puuttuminen tietokannasta ei aseta sen potentiaalia nollaksi; myöskään kahden teknologian samanaikainen saatavuus ei anna niiden ristitermeille arvoa, merkkiä, vaihetta tai koherenssia.

[EHDOLLINEN BERM-SILTA] Pienelle perturbaatiolle mahdollinen retardoitu vaste voidaan kirjoittaa muodossa

\[
\delta\langle O_i(t)\rangle=\int_{-\infty}^{t}\!dt'\int d^3x\,
K_i^{\mu\nu}(t,t',\mathbf x\mid s)\,\Delta g_{\mu\nu}(\mathbf x,t')+O(\Delta g^2).
\]

Tämä tarvitsee eksplisiittisen materiakytkennän ja organismin tilan \(s\). [AVOIN] Gauge-määritys, fysikaalinen skaala, kudosydin, vasteen merkki/viive ja ihmisen päätepistekalibrointi eivät seuraa teknologian historiapäivästä. Lähteen poistuminen voidaan ilmaista potentiaalitasolla \(b=-a_j\), mutta verkoista poistuvan palvelun päivämäärä ei vielä tunnista paikallista \(a_j\):tä tai korvaavan verkon muutosta.

[TUOTU HISTORIA] Tässä tuotettava aineisto kuvaa dokumentoitua lähteen saatavuutta, käyttöönoton vaihetta, teknistä signaaliperhettä ja sulkemisia. Rekonstruoidut jaksot ovat näkyvästi tutkijan oletuksia. Niiden aikarajat ovat skenaariorajoja, eivät tilastollisia luottamusvälejä. Tässä ei tuoteta keksittyjä µT-/V/m-arvoja, annosta, tensoriristituloksia eikä TFR-kertoimia.

FieldState voi myöhemmin toimittaa paikallisen vektori-/spektri-/geometriamittauksen tähän rajapintaan. BERM säilyy selittävänä mallina. Tuotua biologian näyttöä ei tässä alatyössä haeta uudelleen eikä siirretä geometrian todisteeksi.

## Toteutettu tietokerros

Aineisto on [field-reconstruction.json](</Volumes/kovalevy 3/extinctionfield/website/data/field-reconstruction.json>), puhdas kyselykirjasto [field-reconstruction.ts](</Volumes/kovalevy 3/extinctionfield/website/lib/field-reconstruction.ts>) ja tarkistukset [field-reconstruction.test.ts](</Volumes/kovalevy 3/extinctionfield/website/lib/__tests__/field-reconstruction.test.ts>). Tämä alatyö ei muuta käyttöliittymää, selittävää BERM-operaattoria eikä sivuston yleistä tutkimusviiterekisteriä.

Versio sisältää 5 maata, 13 lähdeperhettä, 65 maaperherataa, 93 historiallista ankkuria ja 133 vaihejaksoa. Lähteinä on 39 erillistä uutta primääristä historia-, tilasto-, operaattori- tai viranomaislähdettä sekä 15 nykyisen teknologiarekisterin lähdettä. Kahdessatoista maaperheradassa historia jätetään kokonaan avoimeksi; myös muissa radoissa on avoimia vuosia. Kokonaisuus on alkuperältään jäljitettävä historiallinen rekonstruktio, ei kattava sähkömagneettinen mittaussarja.

| Rekonstruktion perhe | Kanoninen teknologialinkitys | Historiallinen erottelu |
|---|---|---|
| Sähköverkot | electric-grid | Paikallinen tuotanto, verkon yhteydet ja kotitalous-/maatilasähköistymisen tilastot |
| Yleisradio | radio-broadcast | Radioavaus, ULA/FM ja vastaanotinomistuksen eri suureet |
| Antennitelevisio | radio-broadcast, displays | Analoginen/digitaalinen lähetinympäristö, lähetyskatkot; ei vastaanottimen kenttämittaus |
| Analoginen matkapuhelin | mobile-1g-2g, base-stations | NMT, AMPS, TACS, C-Netz ja Japanin järjestelmät erikseen |
| Digitaalinen 2G | mobile-1g-2g, base-stations | GSM, CDMA ja PDC eivät saa yhteistä aaltomuotoa |
| 3G | mobile-3g, base-stations | UMTS/W-CDMA ja CDMA2000 sekä operaattorien sulkemiset |
| 4G/LTE | mobile-4g, base-stations | Alkuperäiset avaukset, myöhempi jatko rekonstruoituna |
| 5G | mobile-5g, base-stations | Alueelliset avaukset ja erillinen operaattorin väestöpeittohavainto |
| Elektronisen valaistuksen siirtymä | indoor-lighting | Markkinasäädökset säilyvät markkinasäädöksinä |
| Kommunikoivat sähkömittarit | smart-metering, power-line-communication | Asennukset, käyttöpaikka-/mittarikanta, PLC/radio avoimina |
| Hakkuri- ja invertterilaitteet | inverter-hvac, storage-ups, solar-inverters | Japanin tuoteavaukset; muiden maiden käyttöhistoria avoin |
| Wi-Fi rakennuksissa | wifi | Maakohtaiset käyttöaikasarjat avoimina; laajakaista ei korvaa niitä |
| Pientaajuinen radionavigointi | radio-navigation, vlf-radio | LORAN-C, OMEGA ja Britannian eLORAN-koepalvelu; eri sulkemiset |

Kunkin perheen `morphology` kuvaa signaaliluokan kantoaaltoa/taajuusperhettä, aaltomuotoa, ajallista käyttöä ja maantieteellistä rakennetta. Se on fysikaalisesti suunnattu luokittelurunko; sitä ei ole mitattu jokaisen maan jokaisena vuonna. Esimerkiksi 5G ei tarkoita yhtä kaistaa, GSM:n aikavälejä ei siirretä CDMA:lle ja valaistuksen optinen välkyntä erotetaan ajurivirtojen kentistä. Absoluuttisia kenttäarvoja tai koherenssia ei ole asetettu.

## Vaiheiden ja ajan täsmällinen merkitys

`documented` tarkoittaa dokumentoitua tapahtumaa/vaihetta, `expansion` käyttöönottoväliä, `mixed` lähdeperheen jatkoa tai rinnakkaisuutta ja `retired` nimetyn palvelun suljettua tilaa. Näillä luokilla ei ole numeerista välimatkaa: niiden summa, keskiarvo tai lukumäärä ei ole kentän voimakkuus. Kukin vaihe ilmoittaa erikseen:

- `basis`: `documented` tai `reconstruction`.
- `scopeKind`: toiminta (`operation`), markkinasääntö (`market-policy`) tai raportoitu omistus/kanta/käyttöönotto (`reported-adoption`).
- `anchorIds`, `sourceRefs` ja kaksikielinen `note`, joka säilyttää lähteen rajauksen ja kertoo jatkumisoletuksen.
- Mukaan lukevat kokonaiset `startYear`–`endYear`-kalenterivuodet. Mahdolliset `startBounds`/`endBounds` ovat skenaarion aikarajoja, eivät tilastollisia luottamusvälejä.

Uuden palvelun avausvuosi todistaa toimintaa lähteen ilmoittamalla alueella. Sen jälkeen jatkuvaksi merkitty `mixed`-jakso on eksplisiittinen oletus saman **lähdeperheen** jatkumisesta. Se ei väitä alkuperäisen laitoksen tai yksittäisen lähettimen jatkaneen muuttumatta. Pearl Streetin alkuperäinen voimala esimerkiksi suljettiin 1895; sähköverkkojen rata kuvaa myöhempää sähköjärjestelmäperhettä, ei saman voimalan koko elinkaarta. Pitkien jatkojaksojen paikalliset katkot, sotavauriot, käyttötunnit ja alueellinen peitto ovat vielä avoimia.

Vuosilokero säilyttää osavuotisen toiminnan, kun sulkeminen tapahtui vuoden aikana. Siksi Britannian analogipuhelinrata sisältää vielä 2001:n, vaikka Vodafonen palvelu loppui 1.6.2001. Suomen NMT-450 sisältää 2002:n, koska palvelu loppui 31.12.2002. BBC-televisio sisältää 1939:n osavuotena, vuosien 1940–1945 katko on erillinen ja uusi käyttöjakso alkaa 1946. Tämä on vuosiresoluution esityssääntö, ei koko vuoden todellinen käyttösuhde. Kuukausi- ja päiväkohtainen käyttö sekä sulkemishetket on kalibroitava erikseen ennen ajallista annoslaskentaa.

`scenarioWindows` sisältää dokumentoidun avaus-/sulkemistapahtuman varhaisimman ja myöhäisimmän vuoden sekä lähdeankkurit. Säädös tai kantatilasto ei yksin saa emitterin avaus-/sulkemisikkunaa. Esimerkiksi Elisan LTE-historia ajoittuu 2010–2011, koska operaattorin suomen- ja englanninkieliset historiat eroavat. Kahden vuoden ikkuna ei ole mitattu asennusramppi eikä todennäköisyysjakauma.

### Skenaarion käyttöikkunat

`getReconstructionOperatingWindows(countryId, familyId)` palauttaa `{startYear,endYear}[]` yhdistämällä vain vierekkäiset `operation`/`reported-adoption`-vaiheet, joiden tila ei ole `retired`. Se ei ylitä tuntemattomia aukkoja eikä markkinasäädösjaksoja. Esimerkkejä:

| Valinta | Palautuva käyttöikkuna | Tulkintaraja |
|---|---|---|
| Britannia, antenni-TV | 1936–1939 ja 1946–2024 | Sotakeskeytys säilyy; 1939 ja 1946 osavuosia |
| Suomi, analoginen matkapuhelin | 1982–2002 | NMT-450; ei kaikkia aiempia radiopuhelimia |
| Yhdysvallat, analoginen matkapuhelin | 1983–2007 | Vuosi 2008 on vain palveluvelvoitteen päättyminen; varsinainen loppuhistoria avoin |
| Japani, analoginen matkapuhelin | 1979–1993 | Myöhempi elinkaari on tässä aineistossa avoin, ei päättynyt 1993 |
| Britannia, älymittarit | 2012–2024 | Tuodun asennushistorian alku, ei ensimmäisen brittiläisen mittarin vuosi |
| Suomi, valaistussäädökset | Ei käyttöikkunaa | Säädöksestä ei johdeta emitterin läsnäoloa |

Ikkunan loppu voi siis tarkoittaa joko dokumentoitua palvelun sulkemista **tai rekonstruoidun historian loppumista**. Käyttöliittymän on säilytettävä ero. Jos ehdollinen skenaariolaskuri jättää lähteen pois tuntemattomalla jaksolla, tämä on rajatun skenaarion puuttuva komponentti, ei väite todellisen lähteen amplitudin nollasta. Pelkkä ensimmäinen `onset` ja ensimmäinen `retirement` eivät riitä BBC:n kaltaisiin usean käyttöjakson perheisiin.

Käyttäjän valitsema esimerkiksi viiden vuoden nousuramppi, amplitudi, suunta, keskiarvo-osuus ja korrelaatio ovat erillisiä **BERM-skenaarion oletuksia**. Uuden rampin käynnistäminen jokaisella käyttöjaksolla on myös oletus. Historiallisen vaihejakson tai kahden perheen päällekkäisyydestä ei lasketa tunnettuja tensoriristitermejä. Tämän kirjaston tehtävä päättyy historiallisten ikkunoiden, lähteiden ja puuttuvan tiedon palauttamiseen.

## Olennaiset lähderajaukset ja korjaukset

1. **Suomi:** pohjoismainen NMT-avaus 1981 säilyy kanonisena alueellisena taustatapahtumana. Maakohtainen käyttö alkaa aikalaisen Posti- ja telelaitoksen tilastossa 1982. TeliaSoneran vuosikertomus 2002 vahvistaa NMT-450:n sulkemisen vuoden lopussa. UMTS900-vaihe 2007 osoittaa 3G-toiminnan tuolloin; sitä ei nimetty Suomen ensimmäiseksi 3G-verkoksi. Manner-Suomen 3G-sulkemisjakso 2023–2024 ei muutu yhdeksi koko vuoden nollaksi.
2. **Yhdysvallat:** Pearl Street on paikallinen vuoden 1882 palvelu. Vuoden 1940 78,7 % on sähkövaloa käyttävien **asuttujen asuntojen** osuus. Historiallinen TV-omistus jättää Alaskan ja Havaijin pois; omistus ei ole lähetinteho. FCC:n AMPS-velvoitteen päättyminen 2008 on sääntömuutos, ei kaikkien lähettimien yhteinen sulkemispäivä. Verizonin 2022–2023 CDMA-sulkeminen koskee tätä operaattoria.
3. **Britannia:** BBC:n varhainen TV koskee Lontoota, ei koko kuningaskuntaa. Antenni-TV:n digisiirtymä 2012 tarkoittaa lähetysstandardin korvaamista. Älymittaritilastot koskevat **Isoa-Britanniaa**, eivät Pohjois-Irlantia; sähkö ja kaasu sekä kotitaloudet ja pienyritykset ovat eri perusjoukkoja. Vuoden 2014 452 860 on suurten toimittajien kumulatiivinen älysähkömittarien asennusmäärä kotitalouksiin, ei älytilassa toimiva koko mittarikanta. EE:n ja Vodafonen vuoden 2024 3G-sulkeminen ei sulje saman vuoden koko Britannian 3G-rataa.
4. **Saksa:** Berliinin 1885 sähköasema ei ole valtakunnallinen sähköistymispäivä. NWDR:n 1952 ja DFF:n 1956 TV-verkot edustavat eri alueita ja valtiohistoriaa. Nordrhein-Westfalenin 2004–2005 siirtymä säilyy alueellisena, sitä ei laajenneta koko Saksan tarkaksi päiväksi. C-Netz ja 3G eivät kerry pysyvästi uusien sukupolvien päälle. Vuoden 2020 älymittaripäätös erotetaan vuoden 2023 varsinaisesta kannasta ja pelkästä digimittarista ilman yhdyskäytävää.
5. **Japani:** DC- ja AC-vaiheet 1887/1889 koskevat Tokiota ja Osakaa. DOCOMOn sukupolvet ja 2G-loppu 2012 ovat operaattoritietoa. TEPCOn noin 28,4 miljoonaa asennusta vuosina 2014–2021 koskee **TEPCOn palvelualuetta** ja jättää vaikeasti vaihdettavia kohteita ulkopuolelle. Toshiban 1980/1981 invertteri-ilmastointilaitteiden avaukset eivät ajoita kaikkia japanilaisia hakkurilähteitä eivätkä näytä muiden maiden omaksumista.
6. **Radionavigointi:** OMEGAn 1997 loppu ei lopettanut samanaikaisesti LORAN-C:tä. LORAN-C:n Yhdysvaltain sulkeminen 2010 ei lopettanut kaikkia ulkomaisia LF/VLF-lähteitä. Britannian/Irlannin eLORAN-koepalvelun päättyminen ei tarkoita kaikkien Anthornin lähetysten loppua. GNSS-vastaanotin ei itsessään ole paikallinen RF-lähetin.
7. **Valaistus ja mittarit:** EU:n kotitalouslamppusäännöt eivät ole 100 % LED-osuuksia, asennetun kannan vaihtohetkiä tai katuvalaisimien määräyksiä. PLC-kommunikaatiota ei validoida automaattisesti RF-kaistan ympäristöanturilla: kaistan, mitattavan suureen ja anturin herkkyyden on sovittava todelliseen signaaliin.

## Mitä tästä vielä puuttuu

Ensisijainen seuraava lisäys on saman perheen **alueittainen todellinen kanta/peitto ja käyttö**, kun yhteensopiva primäärisarja löytyy. Nykyiset viisi numeerista käyttöönottoa kuvaavaa sarjaa sijaitsevat [technology-adoption.json](</Volumes/kovalevy 3/extinctionfield/website/public/data/technology-adoption.json>); niitä ei kopioida tähän tekaistuksi amplitudiksi. Yhdysvaltain AMI-sarjan ensimmäinen lähdepiste haettiin tästä olemassa olevasta aineistosta. Historiaradan ankkuri ei väitä sen vuoden olleen ensimmäinen mittariasennus.

Erityisen puutteellisia ovat maittaiset Wi-Fi-/DECT-/kotielektroniikkakannat, hakkuri-/invertterilaitteiden aikaisempi historia, Japanin lamppukanta, A/B/ARP-tyyppiset solukkoverkkoa edeltävät radiopuhelimet, radioasemien FM/DAB/AM-sulkemiset ja lähetintehot, Japanin analogiverkon koko elinkaari sekä Saksan ja Japanin täydelliset alueelliset TV-siirtymät. Sähköverkkojen pitkät jaksot tarvitsevat maaseutu-/kaupunkijaon, taajuuden, maadoituksen, verkon rakenteen ja kuormituksen historian. Historiallisia sotakatkoja ei ole rekonstruoitu kattavasti BBC-esimerkin lisäksi.

Paikallisen BERM-syötteen vahvistaminen tarvitsee näiden lisäksi asianmukaiset E/B- tai potentiaalin määrittämiseen soveltuvat mittaukset, spektrit, ajoituksen, laitegeometrian ja organismin tilan. Väestölliseen vertailuun tarvitaan erikseen maantieteellisesti ja ajallisesti yhteensopiva biologinen sarja; mikään tässä aineistossa ei kalibroi TFR:ää tai ihmisvasteen merkkiä.

## Tarkistukset

- 13 uuden rekonstruktiokirjaston testiä ja 10 kanonisen teknologiahistorian regressiotestiä läpäisivät.
- Uuden kirjaston ja testitiedoston lint-tarkistus läpäisi.
- Testit kattavat lähteiden ratkeamisen, 65 rataa/aukkoa, päällekkäiset jaksot, väärän maan ankkurit, muuttuneet kanoniset päivämäärät, säädöksen erottamisen toiminnasta, numeroiden nimittäjät, epävuosilukujen torjunnan, katkokset, osavuotiset sulkemiset ja tuntemattoman historian säilymisen tuntemattomana.
- Koko sivuston tyyppitarkistus ilmoitti tarkistushetkellä erillisen aktiivisesti muokattavan `ChangeAtlas.tsx`-tiedoston kutsuvirheen (5 odotettua argumenttia, 6 annettua). Tässä alatyössä kyseistä käyttöliittymätiedostoa ei muutettu; pääagentille ilmoitettu.

## Lähdehakemisto

Kaikki alla olevat uudet lähteet tarkistettiin 8.9.2026. Kunkin yksittäisen ankkurin rajaus ja linkki on JSONissa; alla oleva hakemisto ei laajenna lähteiden näyttöalaa. Operaattorin omasta toiminnasta kertova historia ja valmistajan tuotehistoria ovat alkuperäislähteitä näille tapahtumille, eivät riippumattomia kenttäaltistusmittauksia.

- `fingrid-1929` — [Suomen kantaverkon ensiaskelista 80 vuotta](https://www.fingrid.fi/ajankohtaista/tiedotteet/2009/suomen-kantaverkon-ensiaskelista-80-vuotta/) — Fingrid. Imatra–Turku 110 kV kantaverkkoyhteys, 16.1.1929.

- `census-electricity-1940` — [U.S. Census Bureau History: Pearl Street Station](https://www.census.gov/about/history/stories/monthly/2026/september-2026.html) — U.S. Census Bureau. Paikallinen vuoden 1882 voimala ja vuoden 1940 asuttujen asuntojen sähkötilasto.

- `national-grid-history` — [Our history](https://www.nationalgrid.com/about-us/what-we-do/our-history) — National Grid. Verkon kaupallinen toiminta 1935 ja supergrid-hanke 1950; ei kotitalouksien sähköistymissarja.

- `berlin-grid` — [Unsere Geschichte](https://www.stromnetz.berlin/uber-uns/unsere-geschichte/) — Stromnetz Berlin. Berliinin sähköyhtiö 1884; ensimmäinen julkinen voimalaitos 1885.

- `yle-history` — [Ylen historia](https://yle.fi/a/20-10006904) — Yle. Ylen radion, ULA:n ja säännöllisen television vaiheet; analogisen antenni-TV:n sulkeminen.

- `census-media` — [Table HS-42. Selected Communications Media: 1920 to 2001](https://www2.census.gov/library/publications/2004/compendia/statab/123ed/hist/hs-42.pdf) — U.S. Census Bureau. Koottu historiallinen vastaanotinomistustilasto; TV ei sisällä Alaskaa/Havaijia; ajankohdat vaihtelevat.

- `bbc-radio` — [History of the BBC: the 1920s](https://downloads.bbc.co.uk/historyofthebbc/1920s.pdf) — BBC. BBC:n radioavaus 1922; varhaisten lähettimien alue ei ole tasainen valtakunnallinen altistus.

- `bbc-tv` — [History of the BBC: the 1930s](https://downloads.bbc.co.uk/historyofthebbc/1930s.pdf) — BBC. Lontoon televisio 1936, keskeytys syyskuussa 1939 ja jatkuminen kesäkuussa 1946.

- `german-radio-archive` — [Weimarer Rundfunk](https://www.dra.de/de/bestaende/weimarer-rundfunk) — Deutsches Rundfunkarchiv. Berliinin viihderadio alkoi 29.10.1923.

- `ndr-tv` — [Bewegte Bilder: Die Geschichte des Fernsehens](https://www.ndr.de/geschichte/schauplaetze/Bewegte-Bilder-Die-Geschichte-des-Fernsehens%2Cfernsehen240.html) — NDR. NWDR:n säännöllinen TV 1952; Itä-Saksan DFF:n säännöllinen palvelu 1956; sotaa edeltävät kokeet erikseen.

- `nhk-technical-history` — [Development and Evolution of Broadcast Technologies (2011), 65(12), 1677–1684](https://www.jstage.jst.go.jp/article/itej/65/12/65_1677/_pdf) — Kenji Nagai / NHK; ITE Journal. NHK-insinöörin katsaus radioon 1925, TV:hen 1953, FM:ään 1969 ja digi-TV:hen 2003.

- `fcc-tv-transition` — [FCC 10-172: Low power television digital transition](https://docs.fcc.gov/public/attachments/FCC-10-172A1.pdf) — Federal Communications Commission. Vahvistaa suurteho-TV:n digisiirtymän 12.6.2009; pienitehoiset asemat erillisiä.

- `uk-tv-transition` — [On time and under budget, an all-digital UK](https://www.gov.uk/government/news/on-time-and-under-budget-an-all-digital-uk) — UK Government / DCMS. Viimeinen Britannian analogisen antenni-TV:n digisiirtymä, 24.10.2012.

- `elisa-fi` — [Historia](https://elisa.fi/yhtiotieto/tietoa-elisasta/historia/) — Elisa. Operaattorihistoria: UMTS900 2007, LTE 2010, 5G 2019.

- `elisa-en` — [History](https://elisa.com/corporate/about-elisa/history/) — Elisa. Englanninkielinen kronologia ajoittaa LTE:n vuoteen 2011, suomenkielinen 2010; ero säilytetty.

- `verizon-history` — [Verizon history, April 2023](https://www.verizon.com/about/sites/default/files/Verizon-History-Brochure-04-2023.pdf) — Verizon. Vuoden 1983 kaupallinen matkapuhelinvaihe; sukupolvi- ja operaattorihistoria.

- `qualcomm-1996` — [Sprint PCS Launches CDMA Digital PCS Services](https://www.qualcomm.com/news/releases/1996/12/sprint-pcs-launches-cdma-digital-pcs-services-handsets-qualcomm-personal) — Qualcomm. Joulukuun 1996 digitaalinen PCS-avaus useilla Sprintin markkinoilla, ei valtakunnallinen käyttöaste.

- `verizon-closure` — [3G CDMA Network Retirement for Business](https://www.verizon.com/business/support/services-and-apps/cdma-network-retire/) — Verizon. 1xRTT 2001, LTE 2010, 5G 2019; CDMA suljettu 3.1.2023 mennessä, tavoite 31.12.2022.

- `fcc-analog-sunset` — [FCC 07-103: analog sunset](https://docs.fcc.gov/public/attachments/FCC-07-103A3.pdf) — Federal Communications Commission. 18.2.2008 päätti pakollisen AMPS-tuen, ei ollut kaikkien lähettimien sammutusmääräys.

- `vodafone-1985` — [Thirtieth anniversary of first UK mobile call](https://www.vodafone.com/news/newsroom/services/thirtieth-anniversary-uk-mobile-call) — Vodafone. Vodafonen kaupallinen analogipuhelu, 1.1.1985.

- `vodafone-2001` — [Annual report / Form 20-F 2001](https://investors.vodafone.com/~/media/files/v/vodafone-ir/documents/performance/financial-results/2001/2001-20f-report.pdf) — Vodafone. Britannian digitaaliverkko ja analogipalvelun sulkeminen 1.6.2001; rajaus Vodafone.

- `vodafone-gsm` — [35 years since the first UK mobile phone call](https://www.vodafone.co.uk/newscentre/features/vodafone-celebrates-35-years-since-the-first-uk-mobile-phone-call/) — Vodafone. Vuoden 1992 GSM-verkkovierailu-/SMS-vaihe osoittaa digitaaliverkon käytön viimeistään tuolloin.

- `three-2003` — [About us](https://www.threemediacentre.co.uk/about-us/) — Three UK. Three aloitti Britannian 3G-operaattorina vuonna 2003.

- `ee-4g-5g` — [EE becomes first network to take 5G to 50% of UK population](https://newsroom.ee.co.uk/ee-becomes-first-network-to-take-5g-to-50-of-uk-population/) — EE. LTE lokakuussa 2012, 5G toukokuussa 2019; vuoden 2022 operaattorin väestöpeittovaihe.

- `ofcom-2025` — [Connected Nations UK Report 2025](https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/infrastructure-research/connected-nations-2025/connected-nations-uk-report-2025.pdf) — Ofcom. Takautuva tieto: Vodafone ja EE sulkivat 3G:n 2024; muut operaattorit eroavat.

- `telekom-mobile` — [Handy Birthday! 30 Jahre Mobilfunk für alle](https://www.telekom.com/de/blog/konzern/artikel/30-jahre-mobilfunk-fuer-alle-1009212) — Deutsche Telekom. C-Netz 1985 ja D1 GSM 1992, alun perin Länsi-Saksan verkkoja.

- `telekom-2002` — [Geschäftsbericht 2002](https://www.telekom.com/resource/blob/316774/e3771749ced12d6d59a9a45992b41ebd/dl-2002-gb-pdf-komplett-data.pdf) — Deutsche Telekom. Historiatilaston alaviite vahvistaa C-Netz-palvelun loppuneen 2000.

- `telekom-history` — [Company history](https://www.telekom.com/en/about-us/company-history) — Deutsche Telekom. Kaupallinen UMTS-puhelinpalvelu toukokuussa 2004, ensimmäiset LTE-asemat 2010, 3G-sulkeminen kesäkuussa 2021.

- `telekom-5g` — [5G funkt live in fünf Städten](https://www.telekom.com/de/medien/medieninformationen/detail/5g-funkt-live-in-fuenf-staedten-580454) — Deutsche Telekom. 5.9.2019 toiminta Berliinissä, Bonnissa, Darmstadtissa, Kölnissä ja Münchenissä.

- `docomo-history` — [History](https://www.docomo.ne.jp/english/corporate/about/outline/history/) — NTT DOCOMO. mova 2G 1993, FOMA 2001, Xi LTE 2010 ja koko asiakaskannan siirtyminen 3G/LTE:hen maaliskuussa 2012.

- `docomo-2020` — [NTT DOCOMO Integrated Report 2020](https://www.docomo.ne.jp/english/corporate/ir/binary/pdf/library/annual/fy2019/docomo_ar2020_e.pdf) — NTT DOCOMO. Raportti vahvistaa kaupallisen 5G-avauksen 25.3.2020.

- `tepco-smart` — [スマートメーターの設置状況について](https://www4.tepco.co.jp/pg/company/press-information/information/2021/1604025_8921.html) — TEPCO Power Grid. Asennukset huhtikuu 2014–maaliskuu 2021, noin 28,4 miljoonaa TEPCOn alueella, poikkeuksia jäi.

- `gb-smart` — [Smart meters in Great Britain: quarterly update March 2024](https://www.gov.uk/government/statistics/smart-meters-in-great-britain-quarterly-update-march-2024) — DESNZ. Ison-Britannian kotitalouksien ja pienten yritysten äly-/etäluettavat sähkö- ja kaasumittarit; erilliset raportointiluokat.

- `de-smart` — [Monitoringbericht 2024](https://data.bundesnetzagentur.de/Bundesnetzagentur/SharedDocs/Mediathek/Monitoringberichte/MonitoringberichtEnergie2024.pdf) — Bundesnetzagentur / Bundeskartellamt. Markkinapäätös 2020 ja raportoitu 2023 älymittarikanta; modernit digimittarit ilman yhdyskäytävää erillisiä.

- `fin-nmt-statistics` — [Posti- ja telelaitos: vuosikertomus / tilastot 1987](https://www.doria.fi/bitstream/handle/10024/161501/xpostke_198700_1988_dig.pdf?isAllowed=y&sequence=1) — Posti- ja telelaitos / Suomen virallinen tilasto. Painettu sivu 127 ajoittaa Suomen NMT-palvelun vuoteen 1982.

- `sonera-nmt-closure` — [TeliaSonera Annual Report 2002](https://mb.cision.com/Public/MigratedWpy/85065/303234/93e9996f3bcadaee.pdf) — TeliaSonera. Sivu 45 vahvistaa Soneran NMT-450-toiminnan loppuneen 31.12.2002.

- `gb-smart-2014` — [Smart Meters, Great Britain: Quarterly report to end December 2014](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/414017/Smart_Meters_Quarterly_Statistics_Report__Q4_2014_.pdf) — DECC. Taulukko 1: suurten toimittajien kotitalouksien älysähkömittariasennukset vuodesta 2012; arvioiduille aiemmille asennuksille ei anneta tarkkaa vuotta.

- `tampere-electricity` — [Tampereen Energia: Historia](https://www.tampereenenergia.fi/tampereen-energia/yritys/historia/) — Tampereen Energia. Finlaysonin paikallinen sähkövalaistus 1882 ja Tammerkosken vesivoima 1891.

- `de-tv-nrw-transition` — [Commission Decision 2008/708/EC](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32008D0708) — European Commission. Kohdat 22–23 dokumentoivat NRW:n alueelliset DVB-T-avaukset 2004 ja analogisen rinnakkaislähetyksen loput 2004–05.

### Uudelleenkäytetyt kanoniset lähteet

- `history:fepc-electricity` — [明治時代の電気事業](https://www.fepc.or.jp/enterprise/rekishi/meiji/) — FEPC.

- `history:usda-farms` — [1954 Census of Agriculture: A Graphic Summary](https://www.nass.usda.gov/AgCensus/archive/files/1954-Agriculture_1954_A_Graphic_Summary-1954-03-full.pdf) — USDA.

- `history:itu-mobile-history` — [ITU History: mobile communications](https://www.itu.int/en/history/Pages/ITUsHistory-page-7.aspx) — ITU.

- `history:traficom-3g-closure` — [Traficom puuttuu 3G-verkkojen alasajon epäkohtiin yhdessä teleyritysten kanssa](https://www.traficom.fi/fi/uutiset/traficom-puuttuu-3g-verkkojen-alasajon-epakohtiin-yhdessa-teleyritysten-kanssa) — Traficom.

- `history:tem-amr` — [Matkalla kohti joustavaa ja asiakaskeskeistä sähköjärjestelmää, TEM 38/2017](https://julkaisut.valtioneuvosto.fi/server/api/core/bitstreams/c1a29bed-8cdb-40ba-a4ae-52d693a8ff9e/content) — TEM.

- `history:eia-metering` — [Electric Power Annual, Table 10.5](https://www.eia.gov/electricity/annual/html/epa_10_05.html) — U.S. EIA.

- `history:toshiba-inverter` — [Toshiba’s Inverter Air Conditioner Honored as an IEEE Milestone, 16 March 2021](https://www.toshiba-carrier.co.jp/global/news/pdf/Press_Release_en_20210316.pdf) — Toshiba Carrier.

- `history:frp-1996` — [Federal Radionavigation Plan 1996](https://rosap.ntl.bts.gov/view/dot/8404/dot_8404_DS1.pdf) — U.S. DOT / DoD.

- `history:faa-omega-closure` — [Airborne Omega Receiving Equipment, Federal Register, 8 August 2008](https://www.govinfo.gov/content/pkg/FR-2008-08-08/pdf/E8-18133.pdf) — FAA.

- `history:nbs-loran` — [The Development of Loran-C Navigation and Timing, Monograph 129, 1972](https://nvlpubs.nist.gov/nistpubs/Legacy/MONO/nbsmonograph129.pdf) — G. Hefley / NBS.

- `history:frp-2010` — [Federal Radionavigation Plan 2010, section 5.3](https://navcen.uscg.gov/sites/default/files/pdf/2010_FRP_FINAL_Signed.pdf) — U.S. DOT / DoD / DHS.

- `history:trinity-eloran` — [Notice to Mariners 27/2015: Enhanced Loran discontinued](https://www.trinityhouse.co.uk/notice-to-mariners/27-15-enhanced-loran-discontinued) — Trinity House.

- `history:eu-lighting-244-2009` — [Commission Regulation (EC) No 244/2009](https://eur-lex.europa.eu/eli/reg/2009/244/oj/eng) — European Commission.

- `history:eu-halogens-2018` — [Light bulbs: changes applicable from September 2018](https://energy.ec.europa.eu/system/files/2018-08/memo-light_bulbs_applicable_from_september_2018_0.pdf) — European Commission.

- `history:doe-gsl-enforcement` — [Enforcement Policy Statement: GSLs Marketed Exclusively for the Health and Care of Reptiles, Amphibians and Other Small Animals, May 2025](https://www.energy.gov/sites/default/files/2025-05/Enforcement%20Policy%20Statement%20-%20GSLs%20Marketed%20Exclusively%20for%20the%20Health%20and%20Care%20of%20Reptiles%20Amphibians%20and%20Other%20Small%20Animals.pdf) — U.S. Department of Energy.
