# Valohistoria, kryptokromit ja flaviinien kenttäherkkä fotokemia

Päiväys: 8.9.2026. Osaraportti BERM:n valo × ELF/IF/RF -kirjallisuussynteesiin. 18 alkuperäistutkimusta; tarkat koetiedot, tarkistustaso ja tutkimusperhe löytyvät [lähderekisteristä](photochemistry.json). Kyseessä on perusteltu mekanismikooste, ei systemaattisen katsauksen kattavuusväite.

## Keskeinen lisä BERM:n selitykseen

Vahvin biologinen yhteenveto on, että valo voi muuttaa **sitä tilaa, jossa magneettinen ärsyke vastaanotetaan**, ja magneettinen ärsyke voi muuttaa **sitä biologista signaalia, joka samasta valosta muodostuu**. Vaikutuksen suunta ja ilmeneminen riippuvat spektristä, redox-tilasta, ajallisesta järjestyksestä, sensorin ja välittäjäproteiinien saatavuudesta sekä vasteen mittaustasosta. Tämä on konkreettisempi väite kuin yleinen samanaikaisten altisteiden yhteisvaikutus.

Tutkimukset kuuluvat BERM:iin tuotuun empiiriseen biologiaan. Ne antavat rakennusaineita ehdolliseen L2-sulkeumaan ja sen biologisiin tilamuuttujiin. Ne eivät itsessään johda Lindgrenin geometriasta kudosvastetta, identifioi fyysistä skaalaa tai osoita, että klassisen spinikemian selittämä havainto edellyttäisi tiettyä geometrista tulkintaa. Tässä osassa ei muodosteta ennusteita.

## Ketju 1: valo valmistaa kemiallisen tilan, kenttä vaikuttaa myöhemmässä reaktiossa

Müller ja Ahmad osoittivat puhdistetussa AtCRY1:ssä fotopelkistyksen jälkeistä hapen välittämää reoksidaatiota. Kokeessa ei manipuloitu magneettikenttää: sen arvo ketjussa on **pimeässä jatkuvan reaktioreitin** osoittaminen. Flaviini–superoksidipari on mekanismiehdokas, jonka magneettisesti relevanttia spin-dynamiikkaa tämä koe ei ratkaise. [Müller & Ahmad 2011](https://doi.org/10.1074/jbc.M111.228940)

Pooam 2019 siirsi tämän kysymyksen kasvin kasvu- ja fosforylaatiovasteeseen. Hammad 2020 erotti ajalliset vaiheet vielä tarkemmin: 448 nm:n valo, 60 µmol m⁻² s⁻¹, viisi minuuttia; sen jälkeen kymmenen sekuntia pimeää paikallisessa 40 µT kentässä, ja vasta sitten 500 µT kenttä loppupimeäksi 9 minuutiksi50 sekunniksi. Fosforylaatiokoe sisälsi kuusi kierrosta, kasvukoe viisi päivää. Kenttä vain pimeäjaksossa vahvisti CRY-vastetta; vain valojaksossa annettu kenttä ei tuottanut havaittua vaikutusta. **Samanaikainen valon ja kentän läsnäolo ei siis ollut tässä asetelmassa vaikutuksen ehto.** [Pooam 2019](https://doi.org/10.1007/s00425-018-3002-y), [Hammad 2020](https://doi.org/10.1039/C9PP00469F)

Maeda 2012 täydentää ketjua eri tasolla: kenttäherkkä lyhytikäinen radikaalipari voi muuttaa pidempi-ikäisen reaktiotuotteen saantoa. Tämä erottaa mikrosekuntisen spinikemian hitaasta kemiallisesta ja biologisesta muistista. Koe käytti puhdistettuja proteiineja ja viskooseja liuoksia, ei kokonaisen eläimen kenttähavaintoa. [Maeda 2012](https://doi.org/10.1073/pnas.1118959109)

**BERM-tulkinta:** valohistoria kuuluu biologisen vasteen tilaan. Pimeässä havaittu vaikutus ei yksin erota aiemmin valoaktivoitunutta reittiä aidosti valosta riippumattomasta reitistä. Hammad ei kuitenkaan tunnista reaktioparia lopullisesti eikä osoita yhden valohistoriamekanismin pätevän kaikkiin soluihin.

## Ketju 2: kenttä voi muuttaa vastaanotettua valosignaalia

Albaqami 2020 antaa suoran RF-haaran kasvien ketjuun: 7 MHz, 2±0,5 µT RMS, 40 µT staattisen taustan päällä; 447 nm ja sama 5/10 minuutin valo–pimeärytmi. CRY1:n fosforylaatio väheni, ja sinivalon aiheuttama hypokotyylin kasvunesto heikkeni. Vaikutussuunta muistutti erillistä alle200 nT kenttähaaraa. Valon fotonivirta oli kokeessa sama, mutta biologinen fotoreseptorivaste muuttui. [Albaqami 2020](https://doi.org/10.1038/s41598-020-67165-5)

Tämä on proxy masking -selitykselle erityisen hyödyllinen rakenteellinen esimerkki: jos seurataan vain valoaltistusta ja fotoreseptorin jälkeistä biologiaa, kentän muokkaama valoherkkyys voi näkyä valon vaikutuksen vaihteluna. Tässä tutkimuksessa kenttä oli kuitenkin mitattu ja manipuloitu, joten sen vaikutus ei jäänyt tilastolliseksi oletukseksi. Historiallisessa väestöaineistossa saman rakenteen olemassaolo on erikseen perusteltava BERM-synteesi.

Ikeya ja Woodward löysivät HeLa-solujen luonnollisesta autofluoresenssista magneettikenttäriippuvuuden450 nm:n optisessa mittauksessa. Flaviinipohjainen radikaaliparitulkinta tarjoaa mahdollisuuden myös sensorireitille, jossa CRY:tä ei ole osoitettu ensisijaiseksi anturiksi. Kenttäasteikko oli kymmeniä mT:ia: tämä on solufotokemian havainto, ei ympäristötason RF-haitan mittaus. [Ikeya & Woodward 2021](https://doi.org/10.1073/pnas.2018043118)

**BERM-tulkinta:** valon ja kentän biologisia kanavia ei aina voi käsitellä erillisinä lineaarisina annoksina. Tämä ketju tukee erityisesti valoherkkyyden ja redox-kinetiikan tilariippuvuutta. Seitsemän MHz:n tulosta ei siirretä automaattisesti GHz-alueelle.

## Ketju 3: flaviinisensori, CRY-välitys ja sähköinen hermovaste voidaan erottaa

Giachello 2016 osoitti CRY:tä ektooppisesti ilmentävissä kärpäsen motoneuroneissa, että100 mT staattinen kenttä vahvisti sinivalon depolarisaatio- ja impulssivastetta. Bradlaugh 2023 tarkensi molekyylijakoa: CRY:n lyhyt C-terminaali ilman FAD-taskua riitti tukemaan vastetta, ja suuri FAD-lisäys saattoi tukea neuronin magneettiherkkyyttä myös cry-null-taustassa. Vapaan flaviinin sensorirooli ja CRY:n välittäjärooli ovat näin erotettavia vaihtoehtoja. [Giachello 2016](https://doi.org/10.1523/JNEUROSCI.2140-16.2016), [Bradlaugh 2023](https://doi.org/10.1038/s41586-023-05735-z)

Bradlaughin neuronikokeessa valo oli470 nm, noin2,2 mW/cm²,30 s, kenttä100 mT. Kellokokeessa käytettiin erikseen450±20 nm hämärää valoa ja50 tai300 µT,3 Hz kenttää. Näitä ei saa yhdistää väitteeksi, että vapaan FAD:n riittävyys osoitettiin50 µT:ssa.

Kellovasteen etumerkki on oma ehtonsa. Yoshii 2009 havaitsi hämärässä465–470 nm valossa jakson pitenemistä, Fedele 2014 puolestaan450 nm:ssa lyhenemistä ja500 nm:ssa pitenemistä. CRY-geenimuutokset muuttivat vasteita. Fedele ei löytänyt vastaavaa vaikutusta hiiren SCN-kelloleikkeistä. [Yoshii 2009](https://doi.org/10.1371/journal.pbio.1000086), [Fedele 2014](https://doi.org/10.1371/journal.pgen.1004804)

**BERM-tulkinta:** fotokemiallisen vaikutuksen olemassaolo, välittyminen ionikanavaan ja lopullinen vuorokausivaikutus ovat eri linkkejä. CRY:n tarpeellisuus vasteelle ei yksin todista CRY:n olevan kentän primaarinen vastaanottaja. Yhteensopiva koostaminen säilyttää sensorin, välittäjän ja päätetapahtuman eron.

## Ketju 4: nisäkässolujen CRY–TRPC1–mitokondrioakseli on valosta ja solutilasta riippuvainen

Iversen 2025 yhdistää C2C12-myoblasteissa CRY2:n ja RFK:n manipuloinnin, valo-olosuhteen, kentän suunnan ja TRPC1:een liittyvän proliferaatiovasteen. Lyhyt1,5 mT PEMF-altistus kesti10 min. CRY2-yliekspressio vahvisti ja CRY2/RFK-vaimennus heikensi vastetta. Pimeys vaimensi myös suunnan vaikutusta. Valaistus oli tavanomainen6500 K loisteputki; näytepinnan irradianssia ei ilmoitettu. [Iversen 2025](https://doi.org/10.3390/cells14030231)

Tärkeä tekstikorjaus: abstraktin ilmausta pimeässä menetetystä herkkyydestä ei pidä käyttää absoluuttisena. Fig1:n samalle valoverrokille normalisoidut alas/ylös-luvut ovat valossa+67/+40 % ja pimeässä+39/+22 %. Pimeään jäi siis vaste. RFK:n vaimentaminen puolestaan on flaviiniaineenvaihdunnan interventio; sen mRNA-muutos ei ole sama kuin suoraan mitattu FAD-pitoisuus. CoIP tukee CRY2–TRPC1-assosiaatiota.

Iversen 2024:n yhdistelmäkoe osoitti kasvun, ATP:n ja proteiinivasteiden voimistumista660/830 nm valon ja20 Hz,1,6 mT PEMF:n yhdistelmässä. Valo oli punaista/lähi-infrapunaa. Tutkimus ei tunnistanut CRY:tä tämän optisen vasteen anturiksi; yhteys voi syntyä TRPC1–kalsium–mitokondrioakselilla eri fotoreseptorireittien kautta. Streptomysiinin vaikutus riippui siitä, oliko sitä läsnä juuri altistushetkellä. [Iversen 2024](https://doi.org/10.3390/bioengineering11070637)

Sherrard 2018 tarjoaa olennaisen rinnakkaisen soluehdon: noin10 Hz,1,8 mT PEMF lisäsi CRY1/2-riippuvaisesti ROS:ia HEK293/MEF-soluissa myös pimeässä. Pitkä48 h altistus hidasti HEK293-kasvua. Tämä poikkeaa Iversenin lyhyestä proliferaatiota lisäävästä protokollasta ja Iversen 2024:n ROS:ia vähentävästä yhdistelmästä. [Sherrard 2018](https://doi.org/10.1371/journal.pbio.2006229)

**BERM-tulkinta:** reitin biologinen merkki riippuu solutyypistä, kestosta, lähtötilasta ja mitatusta prosessista. Aineisto tukee tilariippuvaista kytkentää; se ei tue yleislausetta, että sinivalo aina voimistaa haittaa tai pimeys aina estää kenttävasteen. Kasvua edistävä solukoe ei itsessään ole haittatulos, eikä viljelymaljan suora valaistus osoita syvän ihmiskudoksen vastaavaa optista altistusta.

## Ketju 5: native-lajien genetiikka erottaa välittömän valoehdon pitkästä valohistoriasta

Wan 2021:n monarkkiperhosilla44,52 µT kentän inklinaation lyhyt kääntö muutti siiveniskuja täydessä ja380–430 nm valossa. Vaste puuttui pimeässä ja480–580 nm valossa. Cry1-knockout poisti vasteen, Cry2-knockout ei. Tässä mitattiin motorinen vaste inklinaatiomuutokseen; ei vapaata muuttoreittiä. [Wan 2021](https://doi.org/10.1038/s41467-021-21002-z)

Netušil 2021:n tuliluteella (*Pyrrhocoris apterus*) vain nisäkästyyppinen CryII oli käytettävissä.50 µT vaakakenttä kiersi10 s jaksolla. Koiraiden opittu pysähtymisvaste oli CryII-riippuvainen ja säilyi25–28 h näkyvän valon päättymisestä mutta ei42–45 h kohdalla. Valaistun haaran valo oli505 nm,5,3 µW/cm². Pimeässä oli852 nm kameravalo; sen vaikutusta ei erikseen ratkaistu. Naarailla vastaava vaste ei ollut merkitsevä. [Netušil 2021](https://doi.org/10.1242/jeb.243000)

Foley 2011 osoitti ihmisen CRY2:n kyvyn palauttaa kärpäsen transgeenisessä ympäristössä sinivalosta riippuva magneettikäyttäytyminen. Tulos kertoo proteiinin kyvystä osallistua reittiin tässä solukoneistossa. Se ei ole ihmisen magneettiaistin mittaus, ja assay-perheen myöhempi toistettavuuskiista kuuluu sen tulkintaan. [Foley 2011](https://doi.org/10.1038/ncomms1364)

**BERM-tulkinta:** välitön valo, aiemman valon ylläpitämä kemiallinen tai solullinen tila ja eläimen opittu toimintatila ovat kolme erillistä ehtoa.25 tunnin käyttäytymistulos ei tarkoita25 tunnin radikaaliparikoherenssia. Monarkki ja tulilude myös osoittavat, ettei yksi CRY-alatyyppi ole kaikkien lajien yleisratkaisu.

## Riippumattomuus ja tulosrajat, jotka vahvistavat täsmällistä koostamista

Julkaisuja ei lasketa itsenäisiksi ääniksi yhden yleisväitteen puolesta. Tutkimusperheet muodostavat seuraavan kartan:

| Tutkimusperhe | Tässä koosteessa | Riippumattomuuden merkitys |
|---|---|---|
| Ahmad–Martino ja yhteistyökumppanit | Müller, Pooam, Hammad, Albaqami, Sherrard; Ahmad myös Yoshii/Maeda | Useita päätetapahtumia ja lajeja, mutta huomattava tekijä- ja menetelmäjatkumo. |
| Leicester/Cambridge ja Manchester | Fedele, Giachello, Bradlaugh | Erillisiä aineistoja, mutta yhteisiä tutkijoita ja transgeenisiä koerakenteita. |
| NUS/Franco-Obregón | Iversen 2024/2025 | Toisiaan täydentävät solukokeet samasta laboratorioperheestä. |
| Tokyo | Ikeya–Woodward | Riippumaton solufotokemiallinen mittaustapa, eri kenttäasteikko. |
| Merlin/Texas A&M | Wan | Oma native-lajin geneettinen aineisto; Reppert-verkostoyhteyksiä. |
| Vácha/Doležel/Czechia | Netušil | Eri hyönteinen, oma genetiikka ja ehdollistamismenetelmä. |
| Oxford/Oldenburg | Harris, Bassetto | Riippumattomat fenotyyppitoistot; tutkijoilla myös osallistumista radikaaliparimekanismin tutkimukseen. |

Harris 2009 ei löytänyt johdonmukaisia Arabidopsis-kasvu-, antosyaani- tai geenivasteita500 vs50 µT:ssa eikä useilla lisäkentillä ja valaistuksilla. Se ei toistanut myöhempää Hammad 2020:n ajallista erottelua, mutta estää yleistämästä kaikkea kasvien sinivalobiologiaa kenttäherkäksi. [Harris 2009](https://doi.org/10.1098/rsif.2008.0519)

Bassetto 2023 ei havainnut kenttävaikutusta97 658 kärpäsen T-sokkeloaineistossa tai10 960 kärpäsen negatiivisessa geotaksiksessa. Se on painava rajoite juuri näiden käyttäytymisassayden luotettavuudelle. Se ei ollut Bradlaughin neuronikokeen, kasvien fosforylaation tai Iversenin solututkimuksen suora toisto. Toisaalta molekyylikoe ei kumoa käyttäytymisen nollatulosta. [Bassetto 2023](https://doi.org/10.1038/s41586-023-06397-7)

Fedele 2014 raportoi lisäksi konkreettisen teknisen kytkennän:50 Hz kenttä häiritsi LED-ohjausta ja aiheutti välkyntää; käytetty sinivalointensiteetti jouduttiin alentamaan. Tämä on tärkeä muistutus erottaa biologinen valo–kenttäyhteisvaikutus altistuslaitteiston synnyttämästä valomuutoksesta. Molemmat voivat muuttaa lopputulosta, mutta vain ensimmäinen kuvaa kudoksen sisäistä kytkentää.

## Käyttö BERM:n selityksessä

Koosteen perusteella biologiseen tilakuvaukseen sopivat valon spektri ja historia, flaviinin redox-populaatiot ja uudelleentäyttyminen, hapen/metaboliittien saatavuus, CRY-alatyyppi ja ekspressio, välittävät kanavat sekä solun kehitys- ja aineenvaihduntatila. Nämä ovat biologisesti motivoituja ehdollistajia, joiden tarkka muoto ja paino jäävät BERM:n avoimeen sulkeumaan.

Fysikaalinen valo–RF-ristitermi ja biologisen tilan kautta välittyvä yhteys pidetään erillään. Hammad-tyyppinen ajallisesti erotettu vaikutus kuuluu jälkimmäiseen riippumatta siitä, millä fysikaalisella anturimallilla kenttäherkkyys lopulta kuvataan. RF:stä tässä koosteessa on suora kasvikoe7 MHz:llä; suuri osa muusta aineistosta koskee staattisia tai erittäin matalataajuisia kenttiä. Pulssin toistotaajuus ei yksin kuvaa pulssin koko taajuussisältöä.

Proxy masking -sivulle tämän aineiston vahvin käyttö on selittää, miksi sama nimellinen kenttäannos voi osua erilaiseen biologiseen vastaanottotilaan ja miksi kentän muuttama vaste voi näyttäytyä valon, redox-tilan, kellon tai kalsiumsignaalin ominaisuutena. Tämä koostaminen ei edellytä todellisten valo- tai aineenvaihduntavaikutusten poistamista selityksestä. Se lisää niiden yhteyteen mahdollisen kentästä riippuvan ehdon, jonka olemassaolosta on useissa rajatuissa koejärjestelmissä suoria interventiohavaintoja.

## Tarkistuksen käytännön rajat

Hammad 2020:n kokonainen julkaistu artikkeli tarkistettiin tekijän ResearchGateen lataamasta kopiosta, koska RSC:n tekijä-PDF palautti403:n ja NSF-palvelu aikakatkaistiin. Pooam 2019 jäi abstraktin ja alkuperäiskopion indeksoitujen menetelmäotteiden tasolle. Giachello 2016:n tarkkaa valoannosta ei tässä haussa saatu itsenäisesti varmistettua, eikä Bradlaugh 2023:n annosta siirretty siihen. Maeda, Müller ja Ikeya tarkistettiin alkuperäisartikkelien indeksoidusta tekstistä; muut keskeiset kokotekstit luettiin PMC XML:nä tai suoraan kustantajalta. Jokainen raja on merkitty JSON-rekisteriin.
