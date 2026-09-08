# BERM:n steelman: olemassa olevan näytön vahvistukset ja nollatulosten uusi luenta

Päiväys: 8.9.2026. Tehtävä: vahvistaa BERM:n kehitysversiota sivuston ja mallin jo sisältämillä lähteillä. Tämä on rakentava mekanismisynteesi ja väitekohtainen statusarvio.

## 1. Vastaus ydinkysymykseen

**Kyllä: nykyinen lähdekanta riittää nostamaan useita aiemmin yleisesti avoimiksi kuvattuja kohtia kokeellisesti havaituiksi mekanismin osiksi.** Erityisen vahva kokonaisuus koskee kenttävasteen ehdollisuutta: suunta, taustakenttä, lämpötilahistoria, metabolinen vaihe, valohistoria, kehitys, vuodenaika, reseptoritila ja korjauskapasiteetti voivat muuttaa vasteen olemassaoloa tai etumerkkiä.

Tämä on enemmän kuin selitysvaihtoehtojen luettelo. Osa muuttujista on muutettu saman tutkimuksen sisällä ja vaste on muuttunut mukana. Tällainen näyttö sulkee yleisen aukon ”onko tällaiselle tilariippuvuudelle mitään kokeellista vastinetta?”.

Aiemman EMF-katsaukseni ja sen jatkoanalyysin heikkous oli, että ”koko BERM-ketjun kalibraatio on avoin” jäi liian usein hallitsevaksi päätelmäksi myös silloin, kun komponentin näyttö oli jo saatavilla. Täsmällisempi kirjaus on:

> Mekanismin nimetty osa on havaittu tässä järjestelmässä ja näillä ehdoilla. BERM:n yhdistetty tulkinta käyttää tätä osaa. Siirto toiseen kudokseen, altistusregiimiin tai populaatioon kuvataan erikseen.

Osa näistä vahvistuksista on jo sivuston *Vaste-ehdot*-sivulla ja 7.9.2026 laaditussa 54 löydöksen koonnissa. Niitä ei esitetä tämän tarkistuksen uusina tieteellisinä löytöinä.

## 2. BERM:n lähtö ja täsmennetty L2-status

Vuoden 2025 lähtöoletus on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Kun \(A=\bar A+a\), seuraa tarkasti

\[
\delta g_{\mu\nu}=
\kappa(\bar A_\mu a_\nu+a_\mu\bar A_\nu+a_\mu a_\nu).
\]

Siten lähteen muutos on jo geometrisesti suhteessa taustaan, suuntaan ja signaalien rakenteeseen. Näitä ei pidä kadottaa ennen kuin kudos- ja mittausoperaattori on määritelty. Tämä on Lindgren-premissistä johdettu geometrinen osa. [Lindgren ym. 2025](https://www.preprints.org/manuscript/202503.2321).

**L2-operaattorin formaali olemassaolo ei enää ole avoin samalla tavalla kuin fysikaalinen kalibraatio.** Mallin oma [ehdollisen vasteen dokumentti](../../../berm/docs/berm-conditional-response-and-androgen-capacity.md) kirjoittaa eksplisiittisen materiaehdon

\[
\delta S_m=\frac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}\,d^4x
\]

ja sen alla kausaalisen vastekehitelmän. Ajallinen esitys on

\[
u_i(t)=\int_0^\infty
K_i^{\mu\nu}(\tau;\mathcal S_i(t-\tau))
\delta g_{\mu\nu}(t-\tau)\,d\tau+\cdots.
\]

**Vahvistettava status on ”ehdollisesti johdettu operaattorimuoto”.** Gauge, fysikaalinen skaala ja täydellinen kudoskalibraatio ovat eri kysymyksiä. Biologinen kirjallisuus antaa jo tietoa \(\mathcal S_i\):n sisällöstä sekä paikallisista merkeistä, viiveistä ja vaste-ehdoista; niitä ei ole mielekästä kuvata kaikkiin tilanteisiin täysin tuntemattomiksi.

Lindgren-geometria, tuotu empiirinen biologia, BERM:n koostettu mekanismi ja avoimet kalibraatiot pidetään näkyvissä. FieldState jää fysikaalisten havaintojen ja estimaattien syötehaaraksi. \(\chi_{geo}\) säilyy geometrisena koordinaattina.

## 3. Mitä voidaan merkitä vahvistetuksi jo nyt?

Tässä **vahvistettu osahavainto** tarkoittaa alkuperäistutkimuksen tukemaa nimettyä väitettä sen koeoloissa. Riippumaton replikaatio on erillinen tieto. Lähderekisterin bibliografinen varmennus ei yksin ole väitteen näyttöluokka.

| Kohta | Jo olemassa oleva näyttö | Käytettävä vahvistettu muoto |
|---|---|---|
| Formaali geometria–havaittava-operaattori | BERM:n eksplisiittinen materiaehto ja vastekehitelmä | **Ehdollisesti johdettu.** Operaattorin muoto on olemassa; kalibraatio eritellään. |
| Keskimääräinen RF-teho ei yksilöi hidasta ajuria | 54 löydöksen koonnin laskenta ja aiemman jatkoanalyysin signaalipari | **Johdettu rakenne.** Sama RMS ja RF-tehospektri voivat sisältää eri vaiheista syntyvän erilaisen hitaan neliöosan. |
| Kenttien keskinäinen suunta on vaste-ehto | [Blackman 1990](https://doi.org/10.1002/bem.2250110207) | **Kokeellisesti havaittu suuntariippuvuus** kalsiumvasteessa. |
| Staattinen tausta voi muuttaa vaikuttavaa taajuutta | [Blackman 1985](https://doi.org/10.1002/bem.2250060402) | **Kokeellisesti havaittu tausta–taajuus-yhteys.** Sama AC-taajuus ei ole sama biologinen ehto eri DC-taustassa. |
| Lämpötilahistoria voi muuttaa vasteen etumerkkiä | [Blackman 1991](https://pubmed.ncbi.nlm.nih.gov/1854354/) | **Kokeellisesti havaittu historiariippuvuus.** Pelkkä loppulämpötila ei yksilöi vastetta. |
| Signaalin koherenssiaika on vastaanoton ehto | [Litovitz 1991](https://pubmed.ncbi.nlm.nih.gov/1872866/) | **Kokeellisesti havaittu ajallisen rakenteen vaikutus** L929-solujen ODC-päätepisteeseen. |
| Metabolinen vaihe voi kääntää vasteen suunnan | [Rosenspire 2005](https://doi.org/10.1529/biophysj.104.056663) | **Kokeellisesti havaittu vaiheportti.** Kokeessa olennaiseksi paikantui pulssikentän indusoima sähkökenttä. |
| Endokriininen vaste voi näkyä haasteessa mutta puuttua perustasolta | [Lymangrover 1987](https://doi.org/10.1016/S0013-9351(87)80067-1) | **Kokeellisesti havaittu agonistitilaan sidottu vaste.** Kenttä ei muuttanut perustason steroidogeneesiä mutta muutti ACTH-vastetta. |
| Kehitysaltistus voi muuttaa myöhempää taajuusvastetta | [Blackman 1988](https://pubmed.ncbi.nlm.nih.gov/3377861/) | **Kokeellisesti havaittu kehityshistoriavaikutus.** Ei oletusta symmetrisestä 50↔60 Hz:n säännöstä. |
| Vuodenaikakohtainen melatoniinivaste voi vaihtaa suuntaa | [Kolbabová 2015](https://doi.org/10.1038/srep14206) | **Kokeessa havaittu kesä–talvi-ero** vasikoiden ELF-vasteessa; vuodenajat olivat eri pienet kohortit. |
| Valon valmistama tila voi osallistua myöhempään pimeän kenttävasteeseen | [Hammad 2020](https://doi.org/10.1039/C9PP00469F), [Pooam 2019](https://doi.org/10.1007/s00425-018-3002-y) | **Kokeellisesti havaittu ajallinen erottuminen** Arabidopsiksen CRY-vasteessa. |
| CRY2/FAD/kanava muodostavat nimetyn nisäkässolun vastaanottoreitin | [Iversen 2025](https://doi.org/10.3390/cells14030231) | **Interventioilla tuettu CRY2–RFK/FAD–TRPC1-komponentti** C2C12-myoblastien PEMF-vasteessa. |
| RF-esikäsittely voi muuttaa paljon myöhempää vastetta | [Sannino 2024](https://doi.org/10.1002/bem.22524) | **Havaittu toiminnallinen jälkivaikutus** noin 20 tunnin viiveen yli. Yksi viive ei määritä yhtä palautumisaikavakiota. |
| Solun korjaus- ja kierrätystila osallistuu jälkivasteeseen | [Sannino 2022](https://doi.org/10.3390/ijms23158414) | **Interventioilla tuettu autofagian osuus** määritellyssä adaptiivisessa suojassa. |
| Vaikutus voi välittyä altistamattomaan soluun ympäröivän nesteen kautta | [Zeni 2021](https://pubmed.ncbi.nlm.nih.gov/33647301/) | **Kokeellisesti havaittu kasvatusnesteen välittämä haastevasteen muutos.** HSP70:n erityinen välittäjärooli on ehdokas. |
| Normaali lisääntymisen perustulos voi esiintyä muuttuneen reservin rinnalla | [Yu 2023](https://pubmed.ncbi.nlm.nih.gov/36889209/) | **Kokeellisesti havaittu kompensaatio-/haastevastekokonaisuus**, jossa T/ZIP9-reitti osallistuu suojaan. |

Nämä ovat eri vahvistuksia, eivät 16 riippumatonta osoitusta yhdestä koko ketjusta. Esimerkiksi Sannino–Zeni-työt ovat samaa tutkimusperhettä. Kenttäluokat, annokset, kudokset ja vastaanottavat rakenteet säilytetään tietueissa.

Vahvistuksista syntyy jo konkreettinen BERM-sulkeuma:

\[
\mathcal S_i(t)=
\{B_0,\theta,\text{valo- ja lämpöhistoria},
\text{kehitys},\text{vuorokausi- ja kausitila},
\text{reseptorit},\text{korjaus},\text{aiempi haaste}\}.
\]

Joukon jäsenet ovat lähteiden tukemia vastaanottoehtoja omissa järjestelmissään. Kaikkien jäsenten yhtäaikainen käyttö yhdessä kudoksessa on koostettu BERM-tulkinta.

## 4. Nollatulosta ei pidä käyttää koko tutkimuksen ominaisuutena

Koe ei yleensä testaa lausetta ”EMF:llä ei ole mitään vaikutusta”. Se vertaa nimettyjä käsittelyitä, tiloja, päätepisteitä ja mittaushetkiä. Kirjallisuusrekisteriin sopiva havaintoyksikkö on siksi **koehaara × päätepiste × mittaushetki × vastaanottotila**.

| Nollaksi kuvattu tilanne | Mitä asetelma oikeastaan kertoo? | Steelman-luenta |
|---|---|---|
| RF yksin ei muuta DNA-päätepistettä, mutta myöhempi kemiallinen haaste muuttuu | Perustason DNA-mittaus ja haastekestävyys ovat eri havaittavia suureita | Sannino-työt antavat positiivista näyttöä toiminnallisesta tilasta, vaikka perustason päätepiste on negatiivinen. |
| Normaali lyhyen ajan spermatogeneesi, mutta muuttunut H₂O₂-haastevaste | Toiminnallinen reservi ja sen kompensaatio voivat erota perustason tuotoksesta | Yu-kokonaisuutta ei kirjata kokonaiseksi nollaksi. |
| Geenin tai reitin häirinnän jälkeen vaste katoaa | Negatiivinen haara voi olla mekanismin paikannus saman tutkimuksen positiivisen haaran rinnalla | Iversenin ja Sanninon interventioiden negatiiviset haarat osallistuvat positiiviseen mekanisminäyttöön. |
| Kenttä valovaiheessa ei tuota vastetta, pimeävaiheessa tuottaa | Kentän ja valon järjestys sekä käsittelyjaksojen kestot eroavat | Hammad tukee valon valmistamaa pimeäprosessia; nykyinen pimeys ei poista aiemman valon vaikutusta. |
| Verenpaine ja syke eivät muutu, EEG tai kipukynnys muuttuu | Eri päätepisteillä on eri vasteet | [Ghione 2005](https://pubmed.ncbi.nlm.nih.gov/15911132/) ei ole kokonainen fysiologinen nollatutkimus. |
| MRC-5-solujen myöhäisemmässä passagessa ELF-vaste puuttuu | Solujen viljelytila muuttaa havaintoa | [Schuermann 2020](https://doi.org/10.3390/genes11040347) sisältää tilariippuvuuden osahavainnon; passage ei yksin osoita aiemman EMF:n kertymistä. |
| Kesällä ja talvella vastakkaiset suunnat | Yhdistäminen yhteen etumerkilliseen keskiarvoon voi vaimentaa vastetta | Kolbabován vuodenaikahaarat kirjataan erikseen. |
| Vain osa laboratorioista saa merkitsevän tuloksen | Laboratoriokohtaiset vaikutusarviot ja yhdistetty arvio voivat olla erilaisia | Bermanin monilaboratoriotyö luetaan heterogeenisena tuloksena, ei pelkkänä kyllä/ei-äänestyksenä. |
| MRI-kokeessa mitatut hormonit eivät muutu | Tietty akuutti ja seurantaan rajattu hormonaalinen kontrasti | Ei vastaa reseptorikapasiteetin tai erilaisen pitkäaikaisen historian kysymykseen; mitattu negatiivinen tulos säilyy. |
| Alloccan LTE–Wi-Fi-kokeen nimetyt solupäätepisteet eivät muutu | Kyseisen 3 h protokollan ja päätepisteiden havainto | Se ei sulje pois muun ajoituksen tai päätepisteen mekanismia; puuttuvasta kausitiedosta ei silti johdeta tähän koehavaintoon piilovaikutusta. |

Tilastollisesti merkitsemätön tulos ei automaattisesti tarkoita osoitettua nollaa. Siihen tarvittaisiin vaikutusarvion tarkkuuden ja merkityksellisen vaihteluvälin arvio. Kun niitä ei ole saatavilla, kirjataan **”ei havaittua muutosta tällä mittarilla”**, ei ”vaste on täsmälleen nolla”.

Puutteellisesti raportoitu tila saa oman luokan **”ehdollisen vasteen tulkinta ei ratkea tästä asetelmasta”**. Tämä luokka säilyttää tutkimuksen sisältämän tiedon ja tekee puuttuvan tiedon näkyväksi. Se ei muunna negatiivista tutkimusta positiiviseksi.

## 5. Maantieteellinen sijainti ja vuodenaika vaikuttavat useaa kautta

BERM:n kannalta sijainti ja vuodenaika voivat määrittää sekä fysikaalista syötettä että vastaanottavaa tilaa.

**Geomagneettinen voimakkuus ja suunta.** Blackmanin tausta- ja suuntakokeet puoltavat vektorisen taustan ja altistusgeometrian kirjaamista. Sivun Helsinki–Rooma-esimerkki on tästä koottava alueellinen ehdokas; sitä ei tutkittu suorana kaupunkivertailuna. Laboratoriokentän, kelan ja organismin suhteellinen suunta ratkaisee. Maantieteellinen ja geomagneettinen leveysaste eivät ole sama suure. Koordinaatiston kiertäminen itsessään ei muuta fysikaalista ennustetta, eikä paikkakunta korvaa paikallista mittausta. Taajuusikkunoiden muutokset tukevat ehdollista rakennetta, eivät yleistä sääntöä ”pohjoisessa aina suurempi vaste”.

**Paikallinen tekninen kohina.** Engelsin lintukokeessa ympäristön radiokohinan vaimentaminen palautti kompassisuuntautumista ja kontrolloitu kohinan lisääminen muutti sitä. Tämä on vahva paikallisen ympäristön osahavainto. [Engels 2014](https://doi.org/10.1038/nature13290). Suojaus ei ole yksi kyllä/ei-muuttuja: RF-vaimennus, staattisen kentän muutos, maadoitus, valo ja lämpötila eritellään.

Sivuston jo käyttämä Schumann-alueen tutkimus osoittaa paikallisten laitteiden häiriöjälkiä tallenteissa. Se vahvistaa mittausympäristön karakterisoinnin tarvetta. Biologisen ajoitussignaalin peittyminen on siitä koostettava lisäyhteys. [Tritakis ym. 2021](https://doi.org/10.3389/feart.2021.646277).

**Vuodenaika ja hormonaalinen valmiustila.** Kolbabován tutkimus on suora jo rekisterissä oleva ankkuri: 35 päivän 50 Hz:n kenttä, noin 0,39–0,41 µT, liittyi kesällä korkeampaan ja talvella matalampaan melatoniiniin. Kummassakin vuodenaikakohortissa oli neljä altistettua ja neljä verrokkivasikkaa. Tutkimus mittasi myös geomagneettisen taustan ja altistussuunnan. Vuodenajat olivat eri eläinkohortit; havainto ei erota fotoperiodia, lämpötilaa ja kohorttia toisistaan. [Kolbabová 2015](https://doi.org/10.1038/srep14206).

**Näytteenottohetki.** Mustarastailla 0,3 luxin yövalo muutti melatoniinia talvella alku- ja loppuyöllä, mutta ei keskiyön näytteessä. Kesällä ero näkyi läpi yön. Yksi näyte saattoi siis antaa negatiivisen tuloksen samalla, kun yön hormoniprofiili oli muuttunut. Tämä on suora havaittavuutta koskeva osalinkki. [Dominoni 2013](https://doi.org/10.1186/1742-9994-10-60).

**Valohistoria.** Kontrolloidussa ihmistutkimuksessa sama valoärsyke vaimensi melatoniinia eri määrin erilaisen edeltävän valohistorian jälkeen. [Chang 2011](https://doi.org/10.1113/jphysiol.2010.201194). Pimeä mittausjakso ei palauta vuodenaikahistoriaa nollaan. Sama kellonaika eri leveysasteilla ei välttämättä tarkoita samaa biologista vaihetta. Valohistorian siirtäminen RF/ELF-vasteen muokkaajaksi tarvitsee oman liitoksen; Iversenin ja Hammad–Pooamin tutkimukset antavat sille eri järjestelmien komponenttinäyttöä.

**Lämpötilaliikerata.** Blackmanin vuoden 1991 kokeessa lämpenevä kudos päätyen 35–37 °C:een tuotti lisääntyneen kalsiumulosvirtauksen; vakaa 36–37 °C vähentyneen; jäähtyvä kudos tutkituissa oloissa ei havaittua muutosta. Tulos antaa paremman steelman-perustan kuin sivun yksinkertainen ”36–37 °C:n ikkuna”. Laboratorio- tai vuodenaikaero voi vaikuttaa kudoksen tasaantumiseen, mutta varsinainen mitattava muuttuja on kudoksen lämpötilahistoria. Ulkoilman lämpötila ei korvaa sitä.

**Avaruussää.** Burchin sähkötyöntekijäaineistossa henkilökohtaisia verkkotaajuuskenttiä ja valoa mitattiin, ja geomagneettinen aktiivisuus liittyi melatoniinimetaboliittiin. Yhteys vaihteli samanaikaisen kenttä- ja valoaltistuksen mukaan. Se tukee havaintotasolla luonnollisen ja teknisen ympäristön yhteistilan käsittelyä. [Burch 1999](https://pubmed.ncbi.nlm.nih.gov/10465710/). Paikallinen kenttämittaus ja globaali avaruussääindeksi säilyvät eri suureina.

**Mitä huomioimatta jättäminen merkitsee?** Puuttuva sijainti- tai vuodenaikatieto ei automaattisesti vääristä samassa laboratoriossa tasapainotettua satunnaistettua kontrastia. Se voi estää tiedon siitä, mille tilalle arvio pätee. Jos altistus ja vuodenaika vaihtuvat samassa järjestyksessä, ne voivat sekoittua. Jos vuodenajat tasapainotetaan, vastakkaissuuntaiset vasteet voivat vaimentua keskiarvossa. Nämä ovat eri tilanteita.

## 6. Replikaatiokriisin steelman

Sivun vahva ydin on perusteltu: **nimellisesti sama kenttä ei takaa samaa koetta, jos vastaanoton biologiset ja fysikaaliset ehdot eroavat**. Blackmanin, Litovitzin, Rosenspiren, Kolbabován ja Iversenin kokeet antavat tälle mitattuja vastineita.

Vahvin synteesi erottaa:

1. **Eron, joka on jo paikannettu kokeelliseen ehtoon.** Esimerkiksi lämpötilahistoria, vaihe tai vastaanottoreitin häirintä muuttaa vastetta saman tutkimuksen sisällä.
2. **Havaitun laboratorio- tai protokollaeron, jonka välittävä syy ei ole yksilöity.** Bermanin monilaboratoriotulos ja osa kasvien replikaatioista kuuluvat tähän.
3. **Puutteellisesti kuvatun vertailun.** BERM:n olennaisia ehtoja ei voi rekonstruoida saatavilla olevasta raportista.

Tilariippuvaisen tutkimuksen keskimääräinen vaikutus on muotoa

\[
\overline{\Delta}_k
=\int\Delta_{\rm BERM}(a,s,\tau)
f_k(a,s,\tau)\,da\,ds\,d\tau.
\]

Kaksi laboratoriota voi saada eri keskimääräisen tuloksen samasta ehdollisesta vastepinnasta, jos ne tutkivat eri tilajakaumia. Myös nollaa lähestyvä yhdistetty tulos on mahdollinen, kun vastakkaiset vasteet yhdistetään. Tämä on matemaattinen seuraus tilariippuvuudesta; mainitut kokeet tekevät mahdollisuudesta biologisesti perustellun.

Kirjallisuuden heterogeenisyys voi siis sisältää **mekanismia koskevaa rakennetta**, jota kyllä/ei-luokitus kadottaa. Yksittäinen merkitsemätön toisto ei yksin kumoa alkuperäistä ehdollista ilmiötä.

Replikaatiosivun moderaattoritaulukoita voidaan käyttää aineiston jäsentämiseen. Siellä esitetty yli 600 tutkimuksen kokonaisuus, 29 havainnon taulukkorivit ja Wellerin genotoksisuuskartta ovat kuitenkin eri aineistoja ja nimittäjiä. Niiden vahva käyttö vaatii tämän eron näkyvyyttä. Positiivisten julkaisujen osuus ei ole biologisen vaikutuksen suuruus. Tarkat lähde- ja asetelmaerottelut ovat [replikaatiomuistiossa](replikaatio_ekologia.md).

## 7. Ekologisten replikaatioiden täsmällinen asema

**Harris–Ahmad:** alkuperäisen positiivisen kasviaineiston ja Oxfordin negatiivisen toiston tiedot säilytetään rinnakkain. Alkuperäisen tuloksen säilyminen lautaskohtaisessa uudelleenanalyysissä estää sen sivuuttamisen pelkkänä tilastoyksikön ongelmana. Samalla toisto kertoo, ettei alkuperäinen suuri vaikutus siirtynyt sellaisenaan kaikkiin tutkittuihin oloihin. Myöhemmät valon ja kentän ajoitusta erottavat kasvikokeet lisäävät vastaanottotilan rakennetta. Niitä ei nimetä jälkikäteen todistetuksi syyksi juuri Paris–Oxford-erolle.

**Bassetto:** magneettinen valintalabyrintti ja kiipeämiskoe ovat kaksi nimettyä tehtävää. Niiden negatiivinen kokonaisuus ei suoraan mittaa kaikkia kärpäsen kello-, hermosolu- tai molekyylivasteita. Vuoden 2024 kommentit käsittelevät analyysiä ja biologisten ehtojen vertailukelpoisuutta; ne liitetään keskusteluhistoriaan, mutta ne eivät sellaisinaan ole uusia riippumattomia positiivisia replikaatioita.

**Lintujen kaistakohtaiset nollat:** suuntautuminen tietyllä taajuuskaistalla ja häiriintyminen toisella auttavat muodostamaan vastaanottimen spektrirakennetta. Niitä ei yhdistetä koko EMF-biologiaa koskeviksi vastakkaisiksi johtopäätöksiksi.

Näiden erittely ja primääriviitteet ovat [ekologian ja replikaation muistiossa](replikaatio_ekologia.md).

## 8. Vahvin nyt koottava mekanismikokonaisuus

Näyttö tukee seuraavan BERM-version rakentamista:

1. Teknologia ja luonnollinen ympäristö muuttavat paikallisen kentän rakennetta.
2. Sama ympäristöhistoria voi muuttaa valon, lämpötilan, kehityksen ja hormonitoiminnan kautta vastaanotintilaa.
3. Kentän vaikutus riippuu tästä tilasta, signaalin ajallisesta rakenteesta ja geometriasta.
4. Ensin voi muuttua haastevaste, reseptoritoiminta, aistiminen tai korjaus; perustason päätepiste voi säilyä.
5. Muutosta voidaan kompensoida tai se voi välittyä muille soluille; jälkivaikutus voi säilyä varsinaisen ärsykkeen jälkeen.
6. Toiminnalliset seuraukset aggregoituvat yksilöistä populaatioon niiden jakaumien, kohtaamisten, elinkiertojen ja palautteiden kautta.

Askeleet eivät ole yhden tutkimuksen valmis ketju. Silti niiden koostaminen on vahvempi malli kuin irrallinen oletus, että biologinen tila ”saattaa ehkä vaikuttaa”. Nyt käytettävissä on kokeellisia ankkureita useille tilasiirtymille ja niiden välittäjille.

Kehitysvaiheen tärkein muutos on **avointen kohtien pilkkominen**. Koko nuolta ei jätetä avoimeksi, jos sen sisällä on jo mitattuja osia. Rekisteriin kirjataan erikseen formaali johto, havaittu osalinkki, synteettinen liitos ja vielä estimoitava kerroin. Näin vahvistettu tieto ei katoa koko ketjun kalibraatiovaatimuksen alle.

## 9. Tuotokset ja kattavuus

- [Komponentit ja ihmisten/solujen nollatulokset](komponentit_ja_nollat.md).
- [Replikaatiokohdat ja ekologiset asetelmat](replikaatio_ekologia.md).
- [Maantiede, vuodenaika ja luonnollinen tausta](maantiede_vuodenaika.md).
- [Väitekohtainen vahvistusrekisteri](vahvistusrekisteri.json).

Lähtöaineistoon kuuluivat sivuston replikaatio-, vaste-ehto-, heliobiologia- ja avaruussääosuudet, lähderekisteri, kanoninen vaste- ja kapasiteettidokumentaatio, 54 löydöksen koonti sekä aiemmat EMF- ja valo–kenttä-synteesit. Keskeiset tulokset tarkistettiin alkuperäisjulkaisuista tai niiden alkuperäisabstrakteista; saatavuustaso eritellään osamuistioissa.

Tämä ei ole sivuston kaikkien yli tuhannen viitteen uusi kokotekstikatsaus. Tämä on käyttäjän nimeämien avoimien kohtien ja nollatulosten kohdennettu, lähteisiin jäljitettävä steelman-arvio. Tässä vaiheessa laadittiin analyysi ja vahvistusrekisteri; julkaistuja väiteluokituksia tai BERM:n arkkitehtuurisopimusta ei muutettu.
