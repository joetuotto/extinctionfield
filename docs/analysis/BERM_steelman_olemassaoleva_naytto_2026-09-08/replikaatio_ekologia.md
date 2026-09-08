# BERM:n vahvin lähteistetty replikaatiotulkinta: ekologiset kokeet ja biologinen tila

Päiväys 8.9.2026. Rajattu lähdeauditointi ja synteesi; ei systemaattinen katsaus. Tarkastetut sivut ovat paikalliset `website/app/[locale]/evidence/replication/page.tsx`, `website/app/[locale]/replication/page.tsx` ja jälkimmäiseen ohjaava `website/app/[locale]/about/replication/page.tsx`. Lähdetietoja verrattiin `website/lib/referenceIndex.json`-rekisteriin ja alkuperäisjulkaisuihin. Verkkolähteet tarkistettiin 8.9.2026; Nature-sivujen kokotekstejä luettiin myös kustantajan HTML:stä, kun hakutyökalun avaaminen ohjautui kirjautumispalveluun. Tämä muistio täydentää saman päivän aiempaa ekologista lähdemuistiota.

**Vahvin puolustettava johtopäätös:** useiden EMF-vasteiden ehdollisuus on jo osoitettu kokeellisesti. Lämpötilan historia, kenttien keskinäinen suunta, taajuuden ja taustakentän yhdistelmä, kehityksellinen altistus sekä valon ja reseptorin tila voivat muuttaa vasteen voimakkuutta, merkkiä tai havaittavuutta. Näiden yhdistäminen BERM:n tilariippuvaksi vasteoperaattoriksi on perusteltu synteesi. Kirjallisuus ei vielä osoita, että samat viisi tai seitsemän tekijää yksin selittäisivät kaikkien tutkimusten ristiriidat.

## 1. Mallista johdettava vertailu

Pääanalyysin Lindgren-portin mukainen vuoden 2025 lähtökohta on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_b+a.
\]

**[JOHDETTU]** Tästä seuraa

\[
\delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Kahden koehaaran, joiden lisäpotentiaalit ovat \(a_1,a_0\), geometrinen ero yhteisessä taustassa on

\[
\Delta g=\kappa[A_b\otimes(a_1-a_0)+(a_1-a_0)\otimes A_b+a_1\otimes a_1-a_0\otimes a_0].
\]

Sama tausta ei siis katoa kaikista ristitermeistä. Tämä on algebrallinen peruste tutkia tausta × interventio -vuorovaikutusta. Se ei vielä määritä mitatun B-kentän ja potentiaalin vastaavuutta, biologista vahvistusta tai vasteen suuntaa.

**[AVOIN → ehdollinen BERM:n L2-silta]**

\[
q_i(t)=\int K_i^{\mu\nu}(x,\tau;s_i)\,\delta g_{\mu\nu}(x,t-\tau)\,dx\,d\tau,
\qquad Y_i=F_i(q_i,s_i)+\epsilon_i.
\]

Biologinen tila \(s_i\) voi sisältää reseptorin määrän, valo- ja redoxhistorian, kehitysvaiheen, vuorokausivaiheen ja aiemman altistuksen. Gauge-määritys, fysikaalinen skaala, kudosydin, etumerkki, viive ja päätepistekalibrointi pysyvät avoimina. \(\chi_{geo}\) ei ole kudosherkkyys. CRY/RPM ja muut alla kuvatut mekanismit ovat **[TUOTU]**-tason ehdokkaita; ne tukevat omia biologisia linkkejään, eivät siirry geometrian vahvistukseksi. FieldState voi toimittaa fysikaalisen mittauskirjauksen.

**[EMERGENTTI]** Koe estimoi tietyn protokollan keskimääräistä kontrastia \(E[F(q_1,s_1)-F(q_0,s_0)]\). Sen puuttuminen ei yksin tarkoita, että jokainen yksilökohtainen vaste tai jokainen mahdollinen \(K_i\) olisi nolla. Vastaavasti tuntematon tilamuuttuja ei osoita, että vaikutus olisi piilossa. BERM-synteesin vahvuus syntyy siitä, että samassa kokeessa mitattu tai manipuloitu tila ennustaa vasteen eron, ja tämä siirtyy ennakolta määritettynä seuraavaan kokeeseen. Tarkka vaikutusarvio ja epävarmuusväli rajoittavat operaattoria enemmän kuin luokitus merkitsevä/ei-merkitsevä.

## 2. Replikaatiosivun väitekohtaiset lähdeankkurit ja vahvempi muotoilu

### Lämpötila: suora näyttö on sivun yksinkertaistusta vahvempi

**Nykyinen kohta:** FI-rivit 74–82, lämpötilaikkuna 36–37 °C; sen ulkopuolella transduktioketju ei valmistu.

**Alkuperäistulos:** Blackman ym. 1991 tutki linnun aivokudoksen kalsiumeffluksia 20 minuutin altistuksessa: 16 Hz, 14,1 V RMS/m ilmassa ja 64 nT RMS. Lämpeneminen 0,7–2,5 °C tasoille 35–37 °C lisäsi effluksia; vakaa lämpötila ±0,3 °C tasoilla 36–37 °C vähensi sitä; jäähtyminen 0,7–1,5 °C ei tuottanut vastaavaa eroa. Tuloksena oli siis lämpötilan historian mukana muuttuva vaste, myös etumerkin muutos. [Blackman ym. 1991, DOI 10.1002/bem.2250120305](https://pubmed.ncbi.nlm.nih.gov/1854354/).

**Korvaava teksti:** ”Blackmanin kudoskokeessa sekä lämpötila että sen muuttuminen altistuksen aikana määräsivät kalsiumvasteen havaittavuutta ja suuntaa. Siksi toistokokeessa tarvitaan lämpötilan aikaprofiili, ei pelkkä inkubaattorin asetusarvo.” Tämä tukee BERM:n tilariippuvaa ydintä; universaalia 36–37 °C:n biologista toimintarajaa ei tarvita.

### Suunta ja taustakenttä: kaksi erillistä yhteisvaikutusta

**Suunta, FI-rivit 85–93:** Blackman ym. 1990 raportoi 315 Hz:n signaalilla (15 V RMS/m, 61 nT RMS) vasteen DC- ja AC-kenttien ollessa kohtisuorassa, mutta ei yhdensuuntaisina. Julkaisun vertailu piilevien liikkuvuuteen käsitteli erilaista, yhdensuuntaisessa geometriassa esiintyvää vastetta. [Blackman ym. 1990, DOI 10.1002/bem.2250110207](https://doi.org/10.1002/bem.2250110207).

**Korvaava teksti:** ”Kenttien keskinäinen suunta on joissakin koeasetelmissa ollut vasteen ratkaiseva ehto. Aluevertailussa dokumentoidaan B₀-vektori, altistuskentän suunta ja organismin asento.” Helsinki–Rooma-ero on tästä johdettu koehypoteesi, ei mainitun tutkimuksen havainto. Kalsiumkokeen kulmariippuvuus ei yksilöi CRY/RPM-mekanismia.

**Voimakkuus, FI-rivit 96–102:** vahva alkuperäisankkuri on Blackman ym. 1985, *A role for the magnetic field in the radiation-induced efflux of calcium ions from brain tissue in vitro*. Paikallisessa 38 µT:n kentässä 15 ja 45 Hz olivat vaikuttavia, 1 ja 30 Hz eivät. Taustan alentaminen 19 µT:aan poisti 15 Hz:n vasteen; 30 Hz:n vaste esiintyi muun muassa ±25,3 ja ±76 µT:n taustoissa. [DOI 10.1002/bem.2250060402](https://doi.org/10.1002/bem.2250060402).

**Korvaava teksti:** ”Taustakentän voimakkuus voi siirtää taajuuksia, joilla vaste havaitaan. Tämän vuoksi samalla altistustaajuudella tehtyjen kokeiden vertailussa tarvitaan myös B₀.” Sivun 49,4 µT:n lukua ei vahvistettu tästä lähteestä. Yleistys pienempi geomagneettinen voimakkuus → pienempi biologinen vaikutus ei kuvaa havaittua taajuusikkunoiden rakennetta.

### Kehityshistoria: suora koe, väärä viite ja liian pitkä siirto

**Nykyinen kohta:** FI-rivit 115–124; tekstissä 1985/1988, linkkinä eri vuoden 1985 taajuuskoe.

**Oikea ankkuri:** Blackman ym. 1988, DOI 10.1002/bem.2250090204. Kananmunia haudottiin 21 päivää 50 tai 60 Hz:n sähkökentässä, 10 V RMS/m, 37 °C, suhteellinen kosteus 55–60 %. Vastakuoriutuneen aivokudoksen testi käytti 50/60 Hz, 15,9 V RMS/m, 73 nT RMS ja DC-taustaa 38 µT, inklinaatio 85°. 60 Hz:n kehitysryhmä reagoi 50 mutta ei 60 Hz:iin; 50 Hz:n kehitysryhmä ei reagoinut kumpaankaan. [Alkuperäisjulkaisu](https://pubmed.ncbi.nlm.nih.gov/3377861/).

**Korvaava teksti:** ”Kehityksen aikainen sähköinen ympäristö muutti myöhemmin mitatun kudoksen taajuusvastetta tässä kananpoikasasetelmassa. Altistushistoria kuuluu siksi replikaation metadataan.” Tämä on vahva suora ankkuri biologisen muistin mahdollisuudelle. Eurooppalaisten ja yhdysvaltalaisten solulinjojen yleinen 50/60 Hz -ero olisi erikseen osoitettava siirtovaikutus; kokeessa ei myöskään ilmennyt yksinkertaista symmetristä 50↔60 Hz -sääntöä.

### Valo: fotosyklin historia on täsmällisempi ehto kuin lampun nimi

**Nykyinen kohta:** FI-rivit 105–112 tunnistaa tämän jo BERM-synteesiksi, ei Blackmanin löydökseksi; yleisjohdanto kutsuu silti kaikkia viittä Blackmanin osoittamiksi.

Nießner ym. 2014 tutki kanan verkkokalvon Cry1a-aktivaatioita. Valkovaloesikäsittelyn jälkeen aktivaatio ilmeni myös 565 nm:n vihreässä; pimeäesikäsittely tai pidempi vihreä altistus muutti tulosta. UV-, sininen ja turkoosi käyttäytyivät eri tavoin. Lähde tukee valohistoriaa ja fotokemiallista tilaa, eikä väite ”radikaalipari vaatii sinisen valon” yksin välitä kokeen informaatiota. [DOI 10.1242/jeb.110965](https://pubmed.ncbi.nlm.nih.gov/25472972/).

Iversen ym. 2025 tarjoaa suoremman monitekijäisen solutason ankkurin: 10 minuutin 1,5 mT:n PEMF-vaste ja suuntaherkkyys heikkenivät pimeässä; CRY2:n lisääminen/vähentäminen ja FAD-synteesiin vaikuttaminen muuttivat vastetta. CRY2–TRPC1-vuorovaikutusta tutkittiin myös proteiinitasolla. Tämä tukee valo–reseptori–kenttä-ketjun ehdollisuutta hiiren lihassoluissa. [DOI 10.3390/cells14030231](https://pmc.ncbi.nlm.nih.gov/articles/PMC11817702/).

**Korvaava teksti:** ”Valon spektri, intensiteetti ja viimeaikainen valo–pimeähistoria voivat muuttaa magneettiherkän biologisen järjestelmän tilaa. Tätä tukevat fotokemialliset sekä CRY2–TRPC1-solukokeet. LED/hehkulamppu on karkea valaistusproxy; toistettavuuteen tarvitaan mitattu spektri ja ajastus.” PEMF:n millitesla-annos ja lihassolujen kasvu eivät ole ympäristön RF-haitan annoskalibraatio.

### Seitsemän moderaattoria, tutkimusmäärät ja palautuminen

Sivun FI `s5Lead` (rivi 419) kertoo yli 600 tutkimuksesta. Näkyvän tilastotaulukon nimittäjät ovat kuitenkin kussakin rivissä 29: laji 11/12 vastaan 6/17; kesto 12/13 vastaan 5/16; pulsaatio 7/8 vastaan 10/21. Koko sivun koottu kirjallisuusmäärä ja tämän rajatun analyysin tutkimusmäärä on nimettävä erikseen. Eläin/ihminen-koodi ei sellaisenaan mittaa kehityksellistä primausta. Taulukko esittää yksi muuttuja kerrallaan tehtyjä binäärisiä yhteyksiä; se ei osoita seitsemän riippumattoman moderaattorin selitysosuutta. Pulsaation χ²=3,9 ja p=0,048 tulee esittää nimetyllä testillä, analyysijoukolla ja eksploratiivisella asemalla, ei yleisen mekanismin rajana.

Weller ym. 2025 on kartoittava katsaus, ei yksilötason annosvastemeta-analyysi. Sen 517 tutkimuksesta 59 % luokittui vaikutuspositiivisiksi; 130 korkeamman laadun tutkimuksessa osuus oli 48 %. Abstraktin 58 % -sanamuoto ja tulososan nimittäjät eivät ilmaise samaa osuutta: tulososassa 58 % 439 rajoissa olevasta ja 54 % 92 rajan ylittävästä luokituksesta raportoi vaikutuksen. Nimittäjät vaativat liiteaineiston tarkistuksen ennen uniikkien tutkimusten prosenttiväitettä. Rahoitusyhteys on katsauksen raportoima tulos, mutta sitä ei pidä esittää rahoituksen kausaalisena vaikutuksena. [Weller ym. 2025, DOI 10.3389/fpubh.2025.1613353](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1613353/full).

Ivancsits ym. 2003 tutki diploidisia ihmisfibroblasteja: 50 Hz, 20–1000 µT, 1–24 h, jaksotus 5 min päällä/10 min pois. Comet-mittarin nousua raportoitiin alkaen 35 µT:sta ja mittari palautui perustasolle yhdeksässä tunnissa altistuksen loputtua. **Korvaava teksti:** ”Tässä fibroblastiprotokollassa havaittu DNA-vauriomittarin muutos palautui yhdeksän tunnin seurannassa lisäaltistuksen päättymisen jälkeen.” Lähde ei määritä ympäristöä EMF-vapaaksi eikä yleistä yhdeksän tunnin palautumistarvetta eliöille. [DOI 10.1007/s00420-003-0446-5](https://pubmed.ncbi.nlm.nih.gov/12802592/). Sivun `ivancsits_dna_recovery`-viite tarvitsee nämä puuttuvat tekijä-, otsikko- ja DOI-tiedot.

**Korvaava s5Lead:** ”Kirjallisuudesta voidaan tunnistaa seitsemän ehdokasta tutkimustulosten vaihtelun jäsentämiseen. Osa on osoitettu saman kokeen sisäisillä manipulaatioilla, osa perustuu tutkimusten välisiin yhteyksiin tai rajattuihin alaryhmiin. Näytön yhdistäminen ehdolliseksi vastepinnaksi on BERM:n synteesi; taulukot nimeävät erikseen kunkin analyysin aineiston, vertailun ja näytön tason.”

## 3. Viisi ekologisen nollatuloksen uudelleenluokittelua

### 1. Drosophilan T-sokkelo: vahva rajattu toistokoe, ei koko lajin aistibiologian testi

Gegear ym. 2008 yhdisti magneettisen preferenssin valoon ja kryptokromiin. Alkuperäinen positiivinen ohjelma tarjoaa biologisen tilan ja genotyypin ankkurin. [DOI 10.1038/nature07183](https://doi.org/10.1038/nature07183).

Bassetto ym. 2023 testasi T-sokkelossa 97 658 kärpästä, 984 ryhmää, neljän vuoden aikana. 500 µT:n magneettivertailu, kaksoiskäämit ja sokkoutus olivat keskeisiä. Myös luonnonvalossa kasvatettuja, eri ikäisiä ja ilman RF-suojausta testattuja kärpäsiä kokeiltiin. Näin ”suojaus sammutti vasteen” ei yksin selitä koko aineistoa. [Alkuperäistutkimus, DOI 10.1038/s41586-023-06397-7](https://www.nature.com/articles/s41586-023-06397-7).

Reppertin vuoden 2024 kritiikin vahvin kohta on positiivisen hajuehdollistamisen kontrollin eri paikka: Oxford, kun magneettikokeet tehtiin Oldenburgissa. Saman tilan ehdollistamiskykyä, lämpöä ja kosteutta koskeva kuljetettavuuskysymys on todellinen. Lisäksi alkuperäinen tutkimusohjelma oli suurempi kuin yksittäinen vertailuryhmä antaa ymmärtää. [Reppert 2024](https://www.nature.com/articles/s41586-024-07319-x).

Bassetton vastine puolustaa riippumattomien ryhmien käyttöä tilastollisena yksikkönä ja erottaa relevantin alkuperäisvertailun koko tutkimusohjelmasta. Se myöntää paikkojen eron, mutta ei raportoi näyttöä sen aiheuttamasta vaikutuksen katoamisesta. [Vastine 2024](https://www.nature.com/articles/s41586-024-07321-3).

**Uusi luokitus:** tarkasti toteutetun preferenssi-/oppimisprotokollan suuri riippumaton ei-toistuminen, jossa yhden positiivisen kontrollin siirrettävyys jää rajaksi. BERM:ssä tämä rajoittaa preferenssiä tuottavaa tilan ja kontrastin yhdistelmää. Se ei kumoa kaikkia CRY-välitteisiä solutason vasteita eikä vahvista niiden piilevää esiintymistä tässä kokeessa.

### 2. Drosophilan geotaksis: annos, valokontrollin dynaaminen alue ja oikea sham ratkaisevat

Fedele ym. 2014 raportoi CRY-riippuvaisen vaikutuksen kiipeämiseen. [DOI 10.1038/ncomms5391](https://www.nature.com/articles/ncomms5391).

Bassetton geotaksisaineisto käsitti 10 960 kärpästä. Alkuperäislaitteella käytettiin 500 µT; myöhemmät yhtenäisemmät kentät ulottuivat 300 µT:aan. Sham-tausta Oldenburgissa oli 48,3 µT, inklinaatio 67,7°. 220 µT:n koe oli vaakasuuntainen, muut lisäkentät pääosin pystysuuntaisia. Lämpöä, valoa ja magneettikenttää seurattiin; RF-tausta karakterisoitiin. Tätä ei voi kuvata taustakenttää kontrolloimattomaksi kokeeksi. [Bassetto ym. 2023](https://www.nature.com/articles/s41586-023-06397-7).

Kyriacou huomautti, että alkuperäisen sinisen/punaisen valon kiipeämisero oli suurempi kuin toistossa: yhdessä kannassa noin 48/12 %, toiston kannoissa 26/22 % ja 52/45 %. Tämä voi merkitä erilaista fenotyyppistä herkkyysaluetta. Se on parempi biologinen vertailu kuin pelkkä valokontrollin p-arvo. [Kyriacou 2024](https://www.nature.com/articles/s41586-024-07320-4).

Vastineen mukaan valointensiteetti oli sama 0,25 µW/cm² ja CS-OX-kanta läpäisi valokontrollin. Se myös osoitti, että kommentin 0 µT vastaan suurempi kenttä -uudelleenanalyysi ei vastaa altistus vastaan saman virran antiparalleeli-sham -kontrastia. Valittu 15 sekunnin piste ei korvaa koko liikeradan analyysia. [Bassetto ym. 2024](https://www.nature.com/articles/s41586-024-07321-3).

**Uusi luokitus:** osittain protokollaa toistava ja osittain sitä laajentava ei-toistuminen, jonka biologisen kontrollin vaikutuskoko ja kantaerot tulee raportoida. Vahvin BERM-synteesi nimeää herkän toimintatilan ehdon; se ei käsittele keskustelukirjeen valikoivaa uudelleenanalyysia vahvistettuna positiivisena kokeena.

### 3. Arabidopsis: alkuperäinen positiivinen vaikutus säilyy osassa uudelleenanalyysia, universaali suuri vaikutus ei

Ahmad ym. 2007 raportoi 500 µT:n kentässä sinivalon kasvua estävän vasteen vahvistumista, myös pigmentti- ja Cry2-muutoksia; punavalo, pimeys ja CRY-puutteiset mutantit eivät osoittaneet samaa rakennetta. Näin alkuperäinen ohjelma sisältää useamman biologisen linkin kuin yhden kasvun p-arvon. [DOI 10.1007/s00425-006-0383-0](https://pubmed.ncbi.nlm.nih.gov/16955271/).

Harris ym. 2009 toisti 50/500 µT -vertailun ja tutki lisäksi muita voimakkuuksia, siemeneriä, valoa ja sakkaroosia. Sen taulukon 2 lautaskohtaisessa uudelleenanalyysissa Pariisin kasvuerot säilyivät: 3,39→2,38 mm ja 4,61→3,12 mm, p=0,005/0,007; Frankfurtin erot olivat samaan suuntaan mutta epätarkempia. Oxfordissa yhdistetty 11 replikaatin ero oli 4,36→4,30 mm, p=0,396. Sinivalon biologinen vaikutus itsessään oli vertailukelpoinen; kyse ei ollut yleisesti toimimattomista taimista. [Harris ym. 2009, erityisesti taulukko 2 ja keskustelu](https://pmc.ncbi.nlm.nih.gov/articles/PMC2817153/).

**Uusi luokitus:** suuren kasvun magneettivasteen riippumaton ei-toistuminen muutamissa hyvin kuvatuissa olosuhteissa; alkuperäisten kaikkien positiivisten tulosten tilastollinen poistuminen ei kuvaa aineistoa oikein. BERM tarvitsee konkreettisen tilamuuttujan selittämään laboratorioiden välisen eron; sitä ei ole tässä vertailussa tunnistettu.

Lähin myönteinen silta löytyy Pooam ym. 2019:stä (verkkoversio 2018). 500 µT:n vaikutus tutkittiin sekä CRY-fosforylaatiossa että kasvussa. Vaste ilmeni myös, kun kenttä annettiin vain sinivalojaksojen välisessä pimeydessä, kymmenen sekunnin viiveellä valon loppumisesta. Valon intensiteettiä ja fotosyklin ajoitusta manipuloitiin. Tämä on suoraa näyttöä tilan ja ajoituksen merkityksestä kasvimallissa; se ei jälkikäteen osoita, että juuri tämä ero aiheutti Oxford–Pariisi-ristiriidan. [DOI 10.1007/s00425-018-3002-y](https://link.springer.com/article/10.1007/s00425-018-3002-y).

### 4. Lintujen RF-kokeet: spektrisen valikoivuuden kartta

Schwarze ym. 2016 havaitsi punarintujen suuntautuvan vuoden 2013 noin 400 nT:n 1,363/2,726 MHz kapeakaistakentissä ja 50 Hz:n kentässä, vaikka heikko laajakaistakohina häiritsi. Tämä yhdistää samaan tutkimusohjelmaan toimivan kompassin ja häirinnälle herkän kontrollin. [DOI 10.3389/fnbeh.2016.00055](https://www.frontiersin.org/journals/behavioral-neuroscience/articles/10.3389/fnbeh.2016.00055/full).

Pakhomov ym. 2017 puolestaan havaitsi lehtokertun kompassihäiriön 1,403 MHz:n kentässä noin 2,4 nT:sta ylöspäin mutta ei noin 0,4 nT:ssa; geomagneettinen tausta oli noin 50,1 µT. Syksyn samanaikaiset satunnaistetut ryhmät vähensivät muuttokauden etenemisen vaikutusta. Kyse ei ole samasta lajista ja täysin samasta spektristä kuin Schwarzen kokeessa. [DOI 10.1098/rsif.2017.0364](https://pmc.ncbi.nlm.nih.gov/articles/PMC5582129/).

Mustapääkertun 75–85 MHz:n häiriötulos ja 140–150/235–245 MHz:n säilynyt orientaatio muodostavat lisäksi mielekkään taajuusvertailun. Mekanistinen noin 116 MHz:n katkaisuarvio kuuluu RPM-laskelmaan; se ei ole kokeellisesti mitattu yleinen raja. [Leberecht ym. 2022](https://link.springer.com/article/10.1007/s00359-021-01537-8), [Leberecht ym. 2023, DOI 10.1073/pnas.2301153120](https://doi.org/10.1073/pnas.2301153120).

**Uusi luokitus:** useita eri lajien ja taajuuskaistojen pisteitä valikoivalla vastepinnalla. Osa eroista on jo saman tutkimusohjelman kontrolloimaa spektristä valikoivuutta, osa laboratorioiden/lajien välistä vielä selittämätöntä vaihtelua. BERM:n ydin tarvitsee taajuuden lisäksi spektrileveyden, polarisaation, kenttien keskinäisen suunnan, B₀:n, valaistuksen ja kausitilan. Pelkkä nT-luku ei järjestä tuloksia yhden voimakkuusasteikon mukaan.

### 5. Mehiläisen kotiinpaluu: historia- ja päätepistekohtainen vasteprofiili

Treder ym. 2023 vertasi määriteltyä 2,450/5,805 GHz:n altistusta. Noin seitsemän viikon esialtistuksen ja 40 minuutin välittömän altistuksen jälkeen 500 metrin kotiinpaluu oli 78,6 % vastaan 95,2 %; pitkässä kokeessa oli neljä altistus- ja neljä verrokkipesää. Pelkän 40 minuutin altistuksen kotiinpaluutulos ei ollut merkitsevä. Sikiökehityksessä ja koko aikuisiän seurannassa ei havaittu merkitsevää eroa, vaikka rajatussa myöhemmässä elinikäikkunassa ero raportoitiin. [DOI 10.1016/j.scitotenv.2023.165211, alkuperäinen PDF](https://publikationen.bibliothek.kit.edu/1000161328/151145413).

**Uusi luokitus:** ajallisen protokollan ja päätepisteen mukaan eriytyvä tulos, ei tutkimustasoinen ”positiivinen” tai ”nolla”. BERM:n muistiydin ja toiminnallinen lähivaste saavat tästä konkreettisen ehdokasrakenteen. Pitkän ja lyhyen kokeen eron pitäminen osoitettuna interaktiona vaatii niiden välisen suoran testin; toisen p<0,05 ja toisen p>0,05 ei yksin osoita eroa. Havainto ei osoita aiemman ELF-altistuksen primausta, koska tutkittu esialtistus oli RF:ää.

## 4. Miten nämä komponentit vahvistavat ekologista kokonaisketjua

Geometria ja ehdollinen ydin johtavat ensin vastaanottimen tai kudoksen vasteeseen. Kokeissa mitattuja seuraavia portaita ovat CRY:n tila, solukasvu, kiipeäminen, suuntajakauma ja kotiinpaluu. Näitä ei pidä yhdistää samanlaiseksi organismihaitaksi. BERM:n ekologinen silta voidaan tehdä konkreettiseksi:

\[
q_i\to p_i(\theta,\text{paluu},\text{ruokailu}\mid s_i)
\to E_i(t),\;p_i(\text{lisääntyminen}),\;p_i(\text{elossaolo})
\to n(t+1)=M(q,s,\text{ympäristö})n(t).
\]

Tässä toiminnallinen vaste muuttaa energiavarantoa, tehtävien onnistumista tai kuolleisuutta, ja nämä muodostavat ikä-/vaiherakenteisen populaatiomatriisin. Lähteet jo tukevat ensimmäisiä linkkejä tietyillä lajeilla. Kentästä populaatioon koottu päätelmä jää synteettiseksi niin kauan kuin toiminnan, kompensaation ja lisääntymisen siirtofunktiot ovat avoimia.

Tilariippuvuuden ekologinen merkitys on silti positiivisesti perusteltu: sama keskimääräinen kenttä voi osua vain osalla eliöistä herkän kehitys- tai lisääntymisvaiheen kanssa yhteen. Silloin populaatiovaikutus määräytyy myös tämän alaryhmän osuudesta ja elinkierron kohdasta. Historialliseen teknologiarekisteriin tulee siksi liittää pesintä- ja muuttoajat, yövalaistus, kasvu- ja kuoriutumisvaiheet sekä altistushistoria. Kokeellinen annos ei siirry alueelliseksi vaikutukseksi ilman lähteen, paikallisen siirron ja organismin kohtaamisen mittausta.

## 5. Ehdotus replikaatiosivun ydintekstiksi

EMF-biologian tutkimuksissa sama nimellinen kenttä ei aina tarkoita samaa biologista koetta. Alkuperäiskokeissa lämpötilan kulku, kenttien keskinäinen suunta, taajuuden ja taustakentän yhdistelmä, kehityshistoria sekä valon ja reseptorin tila ovat muuttaneet vasteen havaittavuutta tai suuntaa. Tämä antaa kokeellista tukea ehdollisen vasteen ajatukselle.

BERM kokoaa nämä havainnot tilariippuvaksi vasteoperaattoriksi. Kokeet tukevat sen biologisia osia, kun taas niiden yhdistäminen Lindgrenin geometriaan tarvitsee eksplisiittisen kytkennän ja kalibroinnin. Riippumattomat ei-toistumiset kertovat, missä olosuhteissa aiemmin raportoitu vaste ei siirtynyt. Kun ne kuvataan annoksen, taustan, biologisen tilan ja päätepisteen tasolla, ne auttavat paikantamaan vastepinnan rakennetta ja avoimia kohtia.

Toistettavuuden lähtöstandardi dokumentoi lämpötilan aikaprofiilin, B₀-vektorin, altistuskentän spektrin ja suunnan, valon spektrin ja ajoituksen sekä biologisen ja altistuksellisen historian. Näitä täydennetään laji- ja päätepistekohtaisilla muuttujilla. Vahvin testi yhdistää samassa ympäristössä toimivan biologisen kontrollin, uskottavan sham-vertailun ja ennalta määritetyn vaikutusarvion. Näin jo osoitettu ehdollisuus voidaan erottaa vielä kokoamattomasta tai kalibroimattomasta selityksestä.

Tämä muotoilu on myös lähempänä paikallisen `/fi/replication`-protokollasivun nykyistä rakennetta: kaksi karakterisoitua ympäristöä, satunnaistaminen ja sokkoutus, suojauksen sivuvaikutusten kontrollit, määritetty lähivaste ja riippumaton toisto. Protokollasivu ei tarvitse väitettä EMF-vapaasta ympäristöstä tai kaikkien ristiriitojen jo valmistuneesta ratkaisusta ollakseen vahva BERM-tutkimusohjelma.
