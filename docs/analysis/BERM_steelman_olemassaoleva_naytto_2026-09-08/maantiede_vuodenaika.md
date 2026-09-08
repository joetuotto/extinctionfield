# BERM:n olemassa oleva näyttö: maantiede, vuodenaika ja vertailukelpoinen altistus

Päiväys 8.9.2026. Rajattu, rakentava lähdesynteesi: kymmenen lähdettä, jotka löytyivät jo sivuston lähderekisteristä, kanonisesta lähdekartasta tai saman työtilan valo–kenttä-synteesistä. Alla olevat tiedosto- ja riviviitteet koskevat tarkastushetken paikallista työversiota. Primäärit tarkistettiin julkaisijan, PubMedin/Europe PMC:n tai alkuperäisen kokotekstin kautta. Tämä muistio ei muuta sivuston lähdetietoja.

**Olemassa oleva aineisto tukee jo huomattavasti täsmällisempää rakennetta kuin pelkkä ”EMF-annos”.** Kokeissa taustamagneettikenttä ja sen suunta, kudoksen lämpötilahistoria, paikallinen RF-kohina sekä valo- ja vuodenaikatila voivat muuttaa mitattua vastetta. Erityisen käyttökelpoisia ovat saman koesarjan sisäiset vertailut: Blackmanin lämpötilahistoriat, Engelsin suojauksen kytkeminen sekä Kolbabován vastakkaissuuntaiset kesä- ja talvitulokset. Ihmisaineistossa Burch yhdistää samaan analyysiin geomagneettisen aktiivisuuden, henkilökohtaisen 60 Hz -altistuksen, valon ja melatoniinimetaboliitin.

## 1. Mihin BERM:n kohtaan vahvistus kuuluu

[Kanoninen tilariippuvainen sulkeuma](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-state-conditioned-multiscale-closure.md:13>) käyttää vuoden 2025 muotoa

\[
g=\eta+\kappa A\otimes A,
\qquad
\delta g=\kappa(\bar A\otimes a+a\otimes\bar A+a\otimes a).
\]

Saman dokumentin [ehdollinen vaste](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-state-conditioned-multiscale-closure.md:28>) on

\[
u_i(t)=\int_0^\infty K_i^{\mu\nu}(\tau;\mathcal S_i(t-\tau))
\delta g_{\mu\nu}(t-\tau)\,d\tau+O(\delta g^2).
\]

Maantiede ja vuodenaika tulevat tähän kahdesta suunnasta. Paikallinen fysikaalinen historia muuttaa taustaa ja koesyötettä; valo-, lämpötila- ja elinkiertohistoria muuttavat vastaanottavaa tilaa \(\mathcal S_i\). Esimerkiksi uuden testilähteen marginaali sisältää olemassa olevan taustan kanssa muodostuvat ristiosat. Niiden paino ja säilyminen biologisen vasteen kaistassa riippuvat määritellystä kytkennästä, vaiheista ja vasteytimestä. **Maan magneettikentän mitattu \(\mathbf B_0\) ei sellaisenaan määritä potentiaalia \(\bar A\), geometrisen häiriön voimakkuutta tai \(\chi_{geo}\):a.**

Tämä erottaa neljä tasoa: ansatzin algebra on **johdettu**; alla olevat koe- ja mittaustulokset ovat **tuotuja**; niiden käyttö BERM:n tilariippuvan vasteen rakenteessa on **ehdollinen synteesi**; gauge, fysikaalinen skaala ja kudoskohtaiset kertoimet jäävät **avoimiksi**. Positiivinen komponenttinäyttö vahvistaa sitä, mitä vastefunktion tulee osata esittää, vaikka se ei vielä yksilöi geometrista välitystä.

## 2. Kymmenen jo mukana olevaa lähdettä

### 1. Blackman ym. 1985: paikallinen DC-kenttä muuttaa vaikuttavaa taajuusikkunaa

**Jo mukana:** [lähdekartta v2, L3-25, rivi 345](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-lindgren-first-source-map-v2.md:345>). *A role for the magnetic field in the radiation-induced efflux of calcium ions from brain tissue in vitro*. Bioelectromagnetics 6:327–337. [DOI 10.1002/bem.2250060402](https://doi.org/10.1002/bem.2250060402), [alkuperäisabstrakti, PMID 3836676](https://pubmed.ncbi.nlm.nih.gov/3836676/).

**Mitattu:** aivokudoksen kalsiumulosvirtauksen 15 Hz:n vaste katosi, kun paikallinen staattikenttä pienennettiin 38:sta 19 µT:aan. Aluksi tehoton 30 Hz:n signaali muuttui vaikuttavaksi taustakentillä ±25,3 tai ±76 µT. Abstraktissa sähkökenttä on 40 V huipusta huippuun metriä kohti ilmassa.

**Vahvistaa:** taustakentän voimakkuus kuuluu altistuksen ja vasteen yhteiseen ehtojoukkoon; pelkkä AC-taajuuden ja amplitudin yhtäläisyys ei takaa vertailukelpoisuutta. Eri alueiden \(\mathbf B_0\) voi siksi olla merkityksellinen myös samalle koesignaalille. Havainto tukee ikkunamaista, ei yleisesti monotonista maantieteellistä herkkyyttä. Tämä on kudoskoe, ei suora Helsinki–Rooma- tai väestövertailu. Julkaisun PubMed-tietueessa on myös vuoden 1986 erratum-merkintä; tarkka uudelleenkäyttö tarvitsee alkuperäisen ja korjauksen rinnakkain. Sivun 49,4 µT:n luku ei ole tämän abstraktin 38 µT.

### 2. Blackman ym. 1990: AC- ja DC-kentän keskinäinen suunta

**Jo mukana:** [replication, rivi 87](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/replication/page.tsx:87>), viite rivillä 91; [lähderekisteri, rivi 1442](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:1442>). *Importance of alignment between local DC magnetic field and an oscillating magnetic field in responses of brain tissue in vitro and in vivo*. [DOI 10.1002/bem.2250110207](https://doi.org/10.1002/bem.2250110207), [PMID 2242051](https://pubmed.ncbi.nlm.nih.gov/2242051/).

**Mitattu:** 315 Hz:n altistuksessa, 15 V/m RMS ja 61 nT RMS, aivokudoksen kalsiumvaste havaittiin DC- ja AC-magneettikenttien ollessa kohtisuorassa, mutta ei yhdensuuntaisina.

**Vahvistaa:** suuntatieto on biologisen koevertailun olennainen osa. Sama laboratorion vaakatasoon asennettu kela ei takaa samaa suhdetta geomagneettiseen vektoriin eri paikoissa. BERM:n tensorirakenne pystyy esittämään suuntariippuvuutta; koe tuo yhden konkreettisen ehdon sen alapuoliseen vasteeseen. Kirjoittajat vertaavat tulostaan piileväkokeisiin, joissa suuntavaatimus oli toinen: kohtisuoruus ei ole kaikkiin organismeihin siirrettävä laki. Sivuston Helsinki–Rooma-esimerkki on tästä johdettu mahdollisuus, ei tutkimuksessa tehty maantieteellinen vertailu.

### 3. Blackman ym. 1991: lämpötilan kulkusuunta muuttaa myös vasteen etumerkin

**Jo mukana:** [replication, rivi 77](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/replication/page.tsx:77>), viite rivillä 81; [lähderekisteri, rivi 18614](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:18614>). *The influence of temperature during electric- and magnetic-field-induced alteration of calcium-ion release from in vitro brain tissue*. [DOI 10.1002/bem.2250120305](https://doi.org/10.1002/bem.2250120305), [PMID 1854354](https://pubmed.ncbi.nlm.nih.gov/1854354/).

**Mitattu:** linnun aivokudos, 16 Hz, 14,1 V/m RMS ilmassa ja 64 nT RMS, 20 minuuttia. Kun lämpötila nousi 0,7–2,5 °C lopulta 35–37 °C:een, kalsiumulosvirtaus lisääntyi. Vakaassa 36–37 °C:ssa, vaihtelu enintään ±0,3 °C, ulosvirtaus väheni. Jäähtyminen 0,7–1,5 °C lopulta 35–38 °C:een tuotti nollatuloksen.

**Vahvistaa:** nykyisen tilariippuvan sulkeuman \(T(t)\) ja historia ovat empiirisesti motivoituja, samoin positiivinen, negatiivinen ja nollavaste eri olosuhteissa. Vuodenajan tai laboratorion aiheuttama lämpötilahistoria voi erottaa muuten samankaltaiset kokeet. Pelkkä ”36–37 °C:n ikkuna” kadottaa keskeisen tuloksen. Ulkoilman lämpötilaa ei kuitenkaan voi vaihtaa suoraan tasalämpöisen eläimen kudoslämpötilaksi: tarvitaan mitattu kudostila tai perusteltu fysiologinen yhteys.

### 4. Engels ym. 2014: paikallinen RF-tausta on todellinen osa eläimen koeympäristöä

**Jo mukana:** [lähderekisteri, rivi 8824](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:8824>); lähdekartassa myös L3-viitteistö. *Anthropogenic electromagnetic noise disrupts magnetic compass orientation in a migratory bird*. Nature 509:353–356. [DOI 10.1038/nature13290 ja primäärijulkaisu](https://www.nature.com/articles/nature13290).

**Mitattu:** Oldenburgin kampuksen suojaamattomissa kopeissa punarintojen magneettinen suuntautuminen häiriintyi. Maadoitettu alumiinisuoja vaimensi 50 kHz–5 MHz:n kohinaa noin kahdella kertaluokalla ja suuntautuminen palautui. Maadoituksen poistaminen tai lisätty laajakaistakohina palautti häiriön. Maaseudulla suuntautuminen onnistui ilman suojausta; kokeet tehtiin kaksoissokkoutettuina.

**Vahvistaa:** ”ei koesignaalialtistusta” ei tarkoita samaa fysikaalista vertailutilaa eri paikoissa. RF-taustan kaista, laitteiston suojaus ja maadoitus voivat vaikuttaa kokonaisen selkärankaisen mitattuun käyttäytymiseen. Tämä tukee BERM:n paikallisen taustan ja lähdeyhdistelmien eksplisiittistä käsittelyä. Lähde koskee lintujen magneettikompassia kyseisessä RF-ympäristössä; tuloksesta ei saada matkapuhelinverkkojen kaikkien kaistojen tai ihmisen hormonien annoskerrointa.

### 5. Kolbabová ym. 2015: suora ELF × vuodenaika -vertailu

**Jo mukana:** [lähderekisteri, rivi 7102](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:7102>), tunniste `kolbabova2015_melatonin_seasonal`. *Effect of exposure to extremely low frequency magnetic fields on melatonin levels in calves is seasonally dependent*. Scientific Reports 5:14206, 18.9.2015. [DOI 10.1038/srep14206 / kokoteksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC4585560/).

**Mitattu:** kummassakin vuodenajassa neljä altistettua ja neljä kontrollivasikkaa; eri kohortit marras–joulukuussa 2013 ja heinä–elokuussa 2014. 35 päivän 50 Hz:n sinikenttä oli 0,39–0,41 µT. Syljen melatoniini väheni talvella ja lisääntyi kesällä. Paikallinen geomagneettinen kenttä oli 48,98 µT, inklinaatio 66° ja AC-akseli 17°/197°. Ulkolämpötilan keskiarvo oli talvella 2,7 °C ja kesällä 26,2 °C.

**Vahvistaa:** vasteen etumerkki voi liittyä vastaanottajan vuodenaikatilaan myös saman nimellisen ELF-altistuksen yhteydessä. Tämä on erityisen suora tuki ehdolliselle melatoniinireitille. Koe ei erota fotoperiodin, lämpötilan ja eri kohorttien vaikutuksia toisistaan; pieni eläinmäärä rajoittaa varmuutta. Serotoniini-/SNAT-selitys oli kirjoittajien hypoteesi, ei tässä mitattu välitysmekanismi. Eri vuodenajoissa tehdyt kokeet eivät siten ole automaattisesti saman tilan toistoja, mutta vastakkaista tulosta ei myöskään voi jälkikäteen selittää varmasti vuodenajalla ilman olosuhdetietoja.

### 6. Chang, Scheer ja Czeisler 2011: sama valo tuottaa eri vasteen edeltävän valohistorian jälkeen

**Jo mukana:** [valo–kenttä-synteesin chronobiology-muistio, rivi 31](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_valo_kentta_kirjallisuussynteesi_2026-09-08/chronobiology.md:31>). *The human circadian system adapts to prior photic history*. Journal of Physiology 589:1095–1102. [DOI 10.1113/jphysiol.2010.201194](https://doi.org/10.1113/jphysiol.2010.201194), [primäärikokoteksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC3060589/).

**Mitattu:** analyysissä 13 henkilöä; kolmen vuorokauden noin 1 tai 90 lx:n valohistorian jälkeen sama 90 lx:n, 6,5 tunnin valoaltistus. Verrokkikorjattu melatoniinivaimennus oli 86,1 % hämärähistorian ja 51,3 % kirkkaamman historian jälkeen. Hämärähistorian jälkeen kellon vaiheviive oli myös suurempi.

**Vahvistaa:** valohistoria voi muuttaa mitatun ihmisvasteen voimakkuutta vakioidulle seuraavalle ärsykkeelle. Tämä antaa konkreettisen biologisen perustan BERM:n historiariippuvuudelle. Leveysasteen, vuodenajan, ulkoilun tai sisätyön merkitys voidaan liittää todelliseen silmän valoaltistukseen; pelkkä paikkakunta ei kerro sitä. Näyttö on fotonisesta sirkadiaanisesta reitistä. Sen käyttäminen RF/ELF-vasteen muuttajana on erikseen ehdollinen BERM-tulkinta, ei tämän kokeen mitattu EMF-yhteisvaikutus.

### 7. Dominoni ym. 2013: näytteenottohetki ja vuodenaika yhdessä ratkaisevat näkyvän melatoniinieron

**Jo mukana:** [chronobiology-muistio, rivi 61](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_valo_kentta_kirjallisuussynteesi_2026-09-08/chronobiology.md:61>). *Urban-like night illumination reduces melatonin release in European blackbirds (Turdus merula): implications of city life for biological time-keeping of songbirds*. Frontiers in Zoology 10:60, 3.10.2013. [DOI 10.1186/1742-9994-10-60 / primäärijulkaisu](https://link.springer.com/article/10.1186/1742-9994-10-60).

**Mitattu:** kaupunki- ja maaseutuperäiset mustarastaat saivat yöllä 0,3 lx tai lähes pimeän 0,0001 lx:n valaistuksen. Talvella melatoniini väheni alku- ja loppuyöllä mutta ei keskiyön näytteessä; kesällä ero näkyi läpi yön. Talvi- ja kesänäytteet sidottiin aamu-/iltahämärään. Melatoniinivaste ei osoittanut vastaavaa kaupunki–maaseutualkuperän eroa.

**Vahvistaa:** yksi kellonaikaan sidottu näyte voi näyttää nollan, vaikka hormonin vuorokausiprofiili on muuttunut. Vuodenaika muuttaa myös biomarkkerin havaittavuutta. Lähde vahvistaa yhteisen hormoniprofiilin, fotoperiodin ja näytteenottoajan käsittelyä. Se ei tue oletusta, että kaupunkialkuperä yksin aina merkitsee suurempaa herkkyyttä. Saman mustarastaskohortin lisääntymis- ja jatkovuosijulkaisut täydentävät havaintoketjua, mutta eivät ole riippumattomia uusia kokeita.

### 8. Tritakis ym. 2021: sijainti ja paikalliset häiriöt muuttavat mitattua luonnollista ELF-taustaa

**Jo mukana:** [space-weather-biology, rivi 101](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/space-weather-biology/page.tsx:101>), viite rivillä 106; [lähderekisteri, rivi 13596](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:13596>). *Anthropogenic Noise and Its Footprint on ELF Schumann Resonance Recordings*. Frontiers in Earth Science 9:646277, 10.6.2021. [DOI 10.3389/feart.2021.646277 / primäärijulkaisu](https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2021.646277/full).

**Mitattu:** kreikkalaisten mittauspaikkojen vertailu ja tarkoituksella tuotetut häiriöt osoittivat auton moottorin, radion ja anturin liikkeen muuttavan Schumann-alueen tallenteita. Puhdas mittauspaikka oli vähintään 5 km:n päässä häiriölähteistä; toisessa kokeessa 1 km:n etäisyys sähkölinjaan ei riittänyt.

**Vahvistaa:** paikallinen taustaspektri ja mittalaitteen häiriöt on erotettava luonnollisen signaalin muutoksista. BERM:n syötteen laadun parantamiseen tämä on suora fysikaalinen lähde. **Tarkennus:** ensimmäinen kirjoittaja on Tritakis; Tatsis on neljäs kirjoittaja. Viiden kilometrin luku kuvaa näitä paikkoja, ei universaalia rajaa. Vahvistin tai anturi voi peittää signaalin tallenteessa; luonnollisen biologisen ajoitussignaalin peittyminen organismissa vaatisi lisäksi määritellyn biologisen vastaanottimen. Mittaus tulkitaan tähän asti mitatuksi, jatko ehdolliseksi.

### 9. Burch, Reif ja Yost 1999: avaruussää, henkilökohtainen 60 Hz:n altistus ja valo samassa ihmisanalyysissä

**Jo mukana:** [lähderekisteri, rivi 33947](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:33947>), tunniste `burch1999`; nykyisestä tietueesta puuttuvat DOI ja PMID. *Geomagnetic disturbances are associated with reduced nocturnal excretion of a melatonin metabolite in humans*. Neuroscience Letters 266:209–212, 14.5.1999. [DOI 10.1016/S0304-3940(99)00308-0 / primäärijulkaisu](https://www.sciencedirect.com/science/article/pii/S0304394099003080), [PMID 10465710](https://pubmed.ncbi.nlm.nih.gov/10465710/).

**Mitattu:** 132 sähkötyöntekijää; henkilökohtaiset 60 Hz:n magneettikenttä- ja valomittaukset sekä yöllinen virtsan 6-OHMS. Paikallisena geomagneettisena indeksinä oli Boulderin \(A_K\), rinnalla globaali aa. Iän, valon ja osallistumiskuukauden huomioimisen jälkeen yöllinen eritys oli pienempi päivinä, joina edeltävän 36 tunnin indeksiarvot ylittivät 30 nT. Ero oli suurempi yhdistyneenä korkeampaan 60 Hz:n altistukseen tai vähäisempään valoon.

**Vahvistaa:** samanaikaisen luonnollisen ja teknisen taustan sekä valotilan käsittelylle on jo ihmisbiomarkkeriin ulottuvaa empiiristä tukea. Asetelma on havainnoiva; se ei eristä geomagneettista syytä, BERM-ristitermiä tai tiettyä molekyylireittiä. Indeksin 30 nT ei ole henkilökohtaisen AC-altistuksen annoskynnys. Virtsan yökertymä on oma päätetapahtumansa, jota ei voi suoraan rinnastaa yksittäiseen sylki- tai plasmanäytteeseen.

### 10. McCraty ym. 2018: avaruussään ja fysiologian viiveet ovat empiirisesti tutkittavissa

**Jo mukana:** [space-weather-biology, rivi 116](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/space-weather-biology/page.tsx:116>), viite rivillä 122; [lähderekisteri, rivi 8119](</Volumes/kovalevy 3/extinctionfield/website/public/data/references_full.json:8119>). *Long-Term Study of Heart Rate Variability Responses to Changes in the Solar and Geomagnetic Environment*. Scientific Reports. [DOI 10.1038/s41598-018-20932-x / primäärijulkaisu](https://www.nature.com/articles/s41598-018-20932-x).

**Mitattu:** 16 analyysiin jäänyttä naista, Saudi-Arabia; viikoittaisia 24–72 tunnin HRV-tallenteita huhti–elokuussa 2012. Eri HRV-mittarit liittyivät aurinko- ja geomagneettisiin muuttujiin eri viiveillä. Auringontuulen nopeus liittyi lyhyempiin lyöntiväleihin, kun taas eräät muut muuttujat liittyivät suurempaan HRV:hen.

**Vahvistaa:** samanaikaisen kokonaiskentän tai yhden ”myrskypäivän” sijaan aikaikkunan, taajuuskaistan ja fysiologisen päätetapahtuman erottaminen on perusteltua. BERM:n retardoitu vaste pystyy esittämään tällaiset erilaiset viivekuviot. Mittausgeografian tarkennus on olennainen: tutkimuksen SR-/ULF-tallenteet tulivat Boulder Creekistä Kaliforniasta, eivät koehenkilöiden paikallisesta ympäristöstä. Ne toimivat tässä ympäristöproxeina. Tutkimus on pieni havainnoiva seuranta; se ei anna paikallista kudosannosta eikä kokeellista näyttöä yleisestä sykkeen synkronoitumisesta geomagneettiseen kenttään.

## 3. Miten näistä saadaan lisää selittävää sisältöä nykyiseen malliin

**Ensimmäinen täydennys on nimetä maantieteen välittävät suureet.** Maa, kaupunki ja leveysaste ovat mittauspaikan tunnisteita. Selittävä sisältö tulee paikallisesta DC-vektorista ja laitegeometriasta, RF-/ELF-taustan spektristä, vuorokaudenaikaisesta valoaltistuksesta sekä lämpötila- ja elinkiertohistoriasta. Sama leveysaste ei takaa samaa sisäympäristöä; sama sisäympäristön keskiarvo ei takaa samaa vastaanottajatilaa.

**Toinen täydennys on erottaa kaksi vuodenaikavaikutusta.** Vuodenaika muuttaa ympäristöä, mutta se voi muuttaa myös melatoniinin perusprofiilia, biologista vaihetta ja seuraavan ärsykkeen vastetta. Kolbabová tuo suoran ELF-ehdollisuuden; Chang ja Dominoni tuovat mitatun valo- ja hormonitilan. Näiden yhdistelmä tukee BERM:n ehdollista vastaanottajaa paremmin kuin väite kaikkialla samasta negatiivisesta kertoimesta. Valo voi olla oma biologinen syöte, tilaa valmisteleva tekijä tai molemmat; saman reitin kaksinkertainen laskenta on vältettävä.

**Kolmas täydennys on kuvata tutkimusten keskiarvot tilasekoituksina.** Jos vasteen paikallinen muoto on \(r(a,s)\), tutkimusjoukon keskimääräinen vaste voidaan kirjoittaa ehdollisesti

\[
\overline r_j(a)=\int r(a,s)\,p_j(s)\,ds.
\]

Eri tutkimusten \(p_j(s)\) voivat erota vuodenaikojen, valohistorian, kudostilan ja mittaushetken vuoksi. Vastakkaissuuntaiset osavasteet voivat vaimentaa yhteistä keskiarvoa. Tämä on matemaattinen mahdollisuus ja näiden kokeiden motivoima tulkintarakenne; se ei todista, että tuntematon heterogeenisyys selittää jokaisen nollatuloksen. BERM:n arvo tässä on säilyttää todetut ehdot ja niiden yhteydet, jotta saman olosuhteen näyttö voidaan koota yhteen.

Käyttökelpoinen nykyisten lähteiden rikastus on siten lisätä kuhunkin kokeeseen paikan ja päivämäärän lisäksi todettu \(\mathbf B_0\), DC–AC-kulma, taustaspektri, paikallinen valohistoria, fotoperiodi, kudoslämpötilan historia, laji/ikä sekä näytteenoton biologinen vaihe. Puuttuva arvo merkitään puuttuvaksi; havaittua tilariippuvuutta ei tarvitse muuttaa nollaksi sen vuoksi, että maailmanlaajuinen kerroin on avoin.

## 4. Keskeiset täsmennykset, joilla nykyinen esitys vahvistuu

- Blackmanin vuoden 1991 tutkimus kannattaa kuvata kolmena lämpötilahistoriana. Loppulämpötilan ikkuna yksin hukkaa myönteisen, kielteisen ja nollavasteen eron.
- DC-kentän voimakkuus ja suunta ansaitsevat omat lähteistetyt muuttujansa. Vuoden 1985 tausta oli 38 µT; voimakkaamman geomagneettisen kentän yleistä suurempaa haittaa ei voi johtaa ikkunatuloksesta.
- Kolbabován jo rekisteröity kausikoe ja Burchin jo rekisteröity yhteisaltistusaineisto kannattaa nostaa varsinaiseen synteesiin. Niissä vastaanottajan tila ja fysikaalinen ympäristö esiintyvät samassa tutkimuksessa.
- Tritakisin mittaustulos voidaan käyttää vahvana paikallisen taustan laadun perusteena. Biologinen peittyminen säilyy erillisenä ehdollisena komponenttina. Korjattavat metatiedot: ensimmäinen kirjoittaja Tritakis; Burchin puuttuva DOI/PMID.
- McCratyn paikallinen fysiologia ja toiselta mantereelta tuleva kenttäproxy kannattaa nimetä täsmällisesti. Avaruussääindeksit, paikalliset kentät ja henkilökohtainen altistus ovat eri tietotasoja.

Näin olemassa olevat lähteet vahvistavat BERM:n maantieteellisesti ja ajallisesti ehdollista rakennetta konkreettisin, jo mitatuin komponentein. Ne eivät vielä lukitse yhtä universaalia vasteen etumerkkiä tai kalibroi L2-kytkentää, mutta ne rajaavat huomattavasti sitä, millainen uskottava kudos- ja organismikohtainen sulkeuma voi olla.
