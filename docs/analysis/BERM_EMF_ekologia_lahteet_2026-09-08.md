# BERM: EMF-teknologian ekologinen kirjallisuuskatsaus ja täydennysehdotus

Päiväys: 8.9.2026. Kohde: [Teknologiakohtainen altistus](https://www.extinctionfield.com/fi/evidence/technology). Tämä on kohdennettu, primaarilähteisiin nojaava tutkimusmuistio, ei ennalta rekisteröity systemaattinen katsaus eikä ekologinen riskinarvio. Haku kattoi lintuja, hyönteisiä, merieläimiä, kasveja, sieniä ja mikro-organismeja sekä myönteisiä, kielteisiä ja nollatuloksia. Lähteet tarkistettiin kustantajilta, PubMed/PMC:stä ja tutkimusorganisaatioiden arkistoista. Numeeriset altisteet ilmoitetaan vain siinä tarkkuudessa, jossa ne pystyttiin tarkistamaan.

## 1. Mitä nykyiseltä sivulta olennaisesti puuttuu

Sivuversion lopputarkistus 8.9.2026 klo 08.52 UTC: myös julkisen LED-katuvalokortin rooliteksti erottaa nyt valon ja ajuripäästöt. Alkuhaun palauttama versio oli vanhempi. Jäljellä oleva luokitusongelma koskee IF-korttiin sijoitettua optista Boyes-näyttöä ja sen suhdetta muihin sivun väitteisiin.

Sivu painottuu ihmisen lähilaitteisiin ja neuroendokriinisiin ehdokasketjuihin. Ekologinen teknologiahistoria tarvitsee erilliset kerrokset radio- ja TV-lähettimille, sähkö- ja merikaapeleille, sähköaidoille ja muille paikallisille sähkölähteille, ulkovalon optiselle spektrille sekä organismien sähköiseen ympäristöön vaikuttaville maatalouskäytännöille. Näiden alueellinen leviäminen ja eliöiden kohtaamiset ovat erilaisia kuin älypuhelinten käyttö.

Paikallisen työversion LED-katuvalokortin BERM-rooliteksti erottaa jo oikein valon ja ajuripäästöt: lähde on `website/app/[locale]/evidence/technology/page.tsx`, rivi 244, tarkistettu 8.9.2026. Tämä korjattu teksti ei osoita julkisen version tilaa; pääanalyysin suorassa julkisen sivun tarkistuksessa esiintyi edelleen väite ulkotilan jatkuvasta IF-altistuksesta Boyes-viitteen yhteydessä. Myös paikallisen kortin IF-luokitus yhdessä Boyes-viitteen kanssa voi saada lukijan tulkitsemaan valotutkimuksen IF-näytöksi. Erottele kortit **optinen keinovalo yöllä** ja **LED-ajurin mitatut sähköiset päästöt**. Niillä voi olla yhteinen laitehistoria, mutta niiden biologinen näyttö ja altistusmittarit ovat eri asioita.

Kattavuuden arvioinnissa hyvä lähtörekisteri on Karipidis ym. 2023: 24 432 hakutietueesta mukaan otettiin 334 tutkimusta, joista 237 koski eläimiä ja 97 kasveja. Tutkimukset painottuivat laboratorioihin, hyönteisiin, lintuihin, viljoihin ja palkokasveihin; menetelmäpuutteet olivat yleisiä. Kyseessä on tutkimusten jakaumaa kartoittava työ, ei vaikutusten metaanalyysi eikä näyttö kaikkien kenttien turvallisuudesta tai haitallisuudesta. Sen liitetaulukot kannattaa tuoda uuden haun lähtöaineistoksi. [Systemaattinen näyttökartta, DOI 10.1186/s13750-023-00304-3](https://pmc.ncbi.nlm.nih.gov/articles/PMC11378816/).

## 2. BERM:n oma päättelyketju ja biologisten lähteiden oikea paikka

Tässä muistiossa lähtökohtana on pääanalyysissä yksilöity vuoden 2025 muotoilu

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_b+a,\qquad a=\sum_j a_j.
\]

Siitä seuraa algebrallisesti

\[
\delta g_{\mu\nu}=\kappa\left(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu\right).
\]

Tämä on geometrinen seuraus annetusta lähtöoletuksesta. Se ei määrää lajikohtaista haittaa tai vasteen etumerkkiä. Ehdollinen BERM:n L2-silta voidaan kirjoittaa muodossa

\[
q_i(t)=\int\!\!\int \Xi_i^{\mu\nu}(x,\tau;s_i)\,
\delta g_{\mu\nu}(x,t-\tau)\,dx\,d\tau.
\]

Tässä `i` yksilöi lajin, kudoksen tai vastaanottimen ja `s_i` biologisen tilan. Operaattori kuuluu BERM:iin. Sen gauge-määritys, fysikaalinen skaala, kudosydin, etumerkki ja viive ovat **avoimia kalibrointikohtia**. Geometrinen `χ_geo` ei ole kudosherkkyys. FieldState voi antaa mitatun tai estimoidun fysikaalisen syötteen; se ei johda biologista vastetta.

Seuraavan osan CRY/RPM, sähköreseptio, magnetosomit, fotoreseptio ja kasvifysiologia ovat **tuotua empiiristä biologiaa**. Ne rajoittavat mahdollisia BERM:n toteutuksia vasta nimetyn L2-sillan jälkeen. Biologinen koe ei yksin vahvista Lindgrenin geometriaa tai kyseistä siltaa. BERM:n ehdollinen ekologinen ennuste on silti mahdollista rakentaa: `geometrinen muutos → q_i → reseptorivaste → toiminta → ravinnonsaanti/lisääntyminen/elossaolo → populaatio`, kun jokaisen nuolen funktio ja epävarmuus ilmoitetaan.

Lähteiden lisääntyminen ei yksin takaa kasvavaa biologista ajuria. Termi `a⊗a` sisältää lähteiden ristitermit, joiden säilyminen riippuu vaiheista, suunnista, keskiarvoistusajasta ja vastaanottimesta. Samoin luonnon taustakentän paikallinen kasvu tai pieneneminen voi tuottaa lajikohtaisesti eri vasteen. Tämä tekee **kentän spektristä ja rakenteesta**, ei pelkästä kokonaisenergiasta, välttämättömän tutkimuskohteen. Monotoninen yleishaitta ei seuraa yllä olevasta algebrasta.

## 3. Kaksikymmentä ankkuritutkimusta

### Linnut: vahva toiminnallinen näyttö rajatuissa olosuhteissa

| Tutkimus | Tarkistettu altiste ja päätulos | Mitä se rajaa BERM-analyysissä |
|---|---|---|
| **1. Engels ym. 2014** | Punarinnat menettivät magneettiseen kompassiin perustuvan suuntautumisen kaupunkikohinassa. Maadoitetut alumiinisuojat vaimensivat 50 kHz–5 MHz:n häiriöitä noin kaksi kertaluokkaa ja suuntautuminen palautui; suojauksen/maadoituksen ja lisätyn kohinan kokeet vahvistivat tulkintaa. | Suojausinterventio on tärkeämpi kuin pelkkä kaupunki–maaseutu-korrelaatio. Ei mittaa muuttoreitin kuolleisuutta, jälkeläistuottoa tai GHz-puhelinaltistuksen vaikutusta. [Nature, 10.1038/nature13290](https://www.nature.com/articles/nature13290). |
| **2. Pakhomov ym. 2017** | Lehtokerttu, 1,403 MHz; noin 2,4, 7 ja 20 nT häiritsivät suuntautumista, noin 0,4 nT ei. Taustakenttä noin 50,1 µT. Vuoden 2016 suppilokokeet kestivät 40 min. | Vastetta rajaava annosvertailu; lajien kynnysten ero ja hyvin pieni häiriötaso tarvitsevat mekanistisen selityksen. Kynnystä ei saa siirtää eri taajuudelle tai kaikkiin lintuihin. [JRS Interface, 10.1098/rsif.2017.0364](https://pmc.ncbi.nlm.nih.gov/articles/PMC5582129/). |
| **3. Schwarze ym. 2016** | Punarinta; 1,363 ja 2,726 MHz:n noin 400 nT kapeakaistakentät sekä 50 Hz:n noin 400 nT kenttä eivät häirinneet kompassia vuoden 2013 kokeissa. Heikko laajakaistainen kohina häiritsi. | Näyttö ei tue sääntöä ”voimakkaampi kenttä aina suurempi vaste”. Kapeakaistan tutkimusten erot on raportoitava. Kohinan annos tulee ilmoittaa spektritiheytenä ja integroituna RMS-suureena; eri mittauskaistoja ei rinnasteta suoraan. [Frontiers, 10.3389/fnbeh.2016.00055](https://www.frontiersin.org/journals/behavioral-neuroscience/articles/10.3389/fnbeh.2016.00055/full). |
| **4. Xu ym. 2021** | Eristetyn punarinnan CRY4-proteiinin fotokemia oli magneettiherkkää ja erosi kanan ja kyyhkyn CRY4:stä. Pistevariantit paikansivat elektroninsiirtoketjun osia. | Suora molekyylinäyttö in vitro, ei osoitus ihmisen CRY1/CRY2-välitteisestä terveyshaitasta. Proteiinikokeen kenttäalue, lämpötila ja optinen viritys täytyy poimia erikseen ennen annosvertailua; tämän muistion perusteella ei aseteta ympäristökynnystä. [Nature, 10.1038/s41586-021-03618-9](https://www.nature.com/articles/s41586-021-03618-9). |
| **5. Leberecht ym. 2022** | Mustapääkerttu; 75–85 MHz:n laajakaistakohina häiritsi suuntautumista. Suojatut kammiot, normaali ja 120° käännetty taustakenttä, kaksi vuosikohorttia. Taustakenttä noin 48,8 µT. | Nostaa testatun vastealueen kymmeniin megahertseihin. RF-kohinan spektritiheys ja sen integraali poimitaan liitetaulukosta ennen numeerista ristiinvertailua. [J Comp Physiol A, 10.1007/s00359-021-01537-8](https://link.springer.com/article/10.1007/s00359-021-01537-8). |
| **6. Leberecht ym. 2023** | Mustapääkertun suuntautuminen säilyi 140–150 ja 235–245 MHz:n RF-kohinassa. Yhdessä edellisen tutkimuksen kanssa tämä rajaa testattavan spektrisen vasteikkunan. | Taajuuden kasvua ei voi suoraan rinnastaa kasvavaan kompassihaittaan. Kirjoittajien noin 116 MHz:n mekanistinen katkaisuarvio on RPM-laskelma, ei suoraan mitattu yleinen raja. GHz-järjestelmien vaikutus tarvitsisi oman sillan ja kokeen. [PNAS, 10.1073/pnas.2301153120](https://ora.ox.ac.uk/objects/uuid%3Af6b1ff70-321b-499f-9994-508dc197be31). |

### Hyönteiset, pölytys ja optinen valo

| Tutkimus | Tarkistettu altiste ja päätulos | Mitä se rajaa BERM-analyysissä |
|---|---|---|
| **7. Thielens ym. 2018** | Neljän hyönteisen tietokonemallit, 2–120 GHz. Absorboitunut teho riippui koosta, suunnasta ja taajuudesta. | Dosimetrinen tulos: samakaan ulkoinen V/m ei tarkoita samaa absorptiota eri lajeissa. Absorption kasvu ei ole osoitettu kudosvaurio, kuolleisuus tai lisääntymishaitta. [Scientific Reports, 10.1038/s41598-018-22271-3](https://www.nature.com/articles/s41598-018-22271-3). |
| **8. Thielens ym. 2020** | Tarhamehiläisen kehitysvaiheiden mallit, 0,6–120 GHz; Belgian pesäpaikkojen ympäristömittauksissa kokonais-RMS 0,016–0,226 V/m, keskiarvo 0,06 V/m. FM-radio oli hallitseva 7/10 mittauspisteessä. | Historialliseen ekologiaan kuuluu yleisradiotoiminta, ei vain uusin matkapuhelinsukupolvi. Mittausverkko on paikallinen, eikä Belgian lukemia saa käyttää maailman annosarviona. Ei haittakoetta. [Scientific Reports, 10.1038/s41598-019-56948-0](https://pmc.ncbi.nlm.nih.gov/articles/PMC6965614/). |
| **9. Treder ym. 2023** | Määritelty 2,450 ja 5,805 GHz altistus; lähettimen EIRP per puoli 177,83 ja 10 mW, pesät noin 2 m:n päässä. Noin seitsemän viikon esialtistus ja 40 min välitön altistus: 500 m:n kotiinpaluussa 78,6 % vs. verrokkien 95,2 %. Pelkkä 40 min altistus oli nollatulos. | Kotiinpaluu on toiminnallisesti merkittävä jatkotestikohde. Sikiökehityksessä ja koko seurannan aikuiseliniässä ei merkitsevää eroa; eliniän rajatussa myöhemmässä ikkunassa oli ero. EIRP ei ole yksilön absorboitunut annos. Pitkässä kotiinpaluukokeessa 4 altistus- ja 4 verrokkipesää: yksilöiden määrä ei korvaa pesäreplikaatiota. [Science of the Total Environment, 10.1016/j.scitotenv.2023.165211](https://publikationen.bibliothek.kit.edu/1000161328/151145413). |
| **10. Clarke ym. 2013** | Kontukimalaiset oppivat erottamaan kukkien sähkökenttiä. Kokeessa käytettiin myös 30 V:n keinokukkia; kasvin potentiaali muuttui mehiläisvierailussa. | Sähköinen aistiminen on oma, mitattava reseptorireitti. Syöttöjännite ei ole koko kehon V/m eikä RF-annos. Normaali sähköinen kukkasignaali ei itsessään osoita teknologian haittaa. [Science, 10.1126/science.1230883](https://research-information.bris.ac.uk/en/publications/detection-and-learning-of-floral-electric-fields-by-bumblebees/). |
| **11. Hunting ym. 2022** | Lannoitesuihkutus muutti kukkien biofysikaalisia vihjeitä. Erillisessä sähköisessä manipulaatiossa 13 V:n syöttö tuotti noin 500 mV:n varren potentiaalimuutoksen; 0,07 Hz:n kanttiaaltoa käytettiin DC-komponentin ylläpitämiseen. Laskeutumisten osuus lähestymisistä pieneni; kukalla oloajassa ei selvää eroa. | Teknologisesti muuttunut sähköympäristö voi syntyä myös kemikaalin vaikutuksesta kasviin. Kemiallinen toksisuus, haju, pinnan ominaisuudet ja sähköinen välitys on erotettava. Ei suora pesän menestys- tai siementuotantokoe. [PNAS Nexus, 10.1093/pnasnexus/pgac230](https://academic.oup.com/pnasnexus/article/1/5/pgac230/6814445). |
| **12. Boyes ym. 2021** | Paritetuissa valaistuissa ja valaisemattomissa elinympäristöissä yöperhosten toukkia oli 47 % vähemmän pensasaidoissa ja 33 % vähemmän ruohoreunuksissa. Erillinen koe osoitti ruokailukäyttäytymisen muutoksia. Valkoisten LEDien yhteydet olivat voimakkaampia kuin keltaisten natriumlamppujen. | Tämä on optisen yövalon ekologista näyttöä; IF-ajuripäästöjä ei eristetty. Toukkavaiheen seuranta auttaa erottamaan populaatiomuutoksen pelkästä aikuisten valohoukuttelusta. Ei näyttö kaikista hyönteisistä tai maailmanlaajuisesta romahduksesta. [Science Advances, 10.1126/sciadv.abi8322](https://pmc.ncbi.nlm.nih.gov/articles/PMC8386932/). |

### Merikaapelit: todellinen paikallinen kenttä, lajikohtainen vaste

| Tutkimus | Tarkistettu altiste ja päätulos | Mitä se rajaa BERM-analyysissä |
|---|---|---|
| **13. Hutchison ym. 2020** | Käytössä oleva HVDC-kaapeli, pikkurausku *Leucoraja erinacea* ja amerikanhummeri. Koepohjan kokonaiskenttä 47,8–65,3 µT, vertailu 51,3 µT; maksimilisäys siis 14 µT. Eläimet molemmissa aitauksissa 18–24 h. Rauskujen tutkimis-/ravinnonhakuliike muuttui selvästi, hummereiden vaste oli pienempi; kaikki käyttivät koko käytettävissä olevaa aluetta. | Sekä DC- että odottamattomia AC-sähkö- ja magneettikomponentteja mitattiin. Havainto ei oikeuta tulkintaa yleiseksi kulkuesteeksi tai populaatiohaitaksi. Virta, paluujohdin, hautaussyvyys ja eliön korkeus pohjasta ovat olennaisia. [Scientific Reports, 10.1038/s41598-020-60793-x](https://pmc.ncbi.nlm.nih.gov/articles/PMC7060209/). |
| **14. Harsanyi ym. 2022** | Euroopanhummerin ja taskuravun alkioita altistettiin 2,8 mT:n staattiselle kentälle kehityksen ajan. Munatilavuudessa ja toukkien mitoissa muutoksia; hummerin epämuodostumisia ja uimakokeen onnistumista koskevia haittahavaintoja. Kaikissa kehitys- ja liikuntamittareissa ei eroa. | 2,8 mT = 2 800 µT. Tätä ei saa esittää tavanomaisen haudatun kaapelin etäaltistuksen annoksena. Krooninen alkioaltistus ja lyhyt aikuisen ylitys ovat eri tilanteita. [JMSE, 10.3390/jmse10050564](https://www.mdpi.com/2077-1312/10/5/564); [tutkimustiedot ja alkuperäisjulkaisu](https://tethys.pnnl.gov/publications/effects-anthropogenic-electromagnetic-fields-emf-early-development-two-commercially). |
| **15. Cresci ym. 2022** | Pohjantuulenkalan *Ammodytes marinus* 56 toukkaa; 150–50 µT:n staattinen gradientti, 15 min liikkeen tallennus, 28 altistettua ja 28 verrokkia. Ei muutosta sijaintijakaumassa tai tutkituissa uintisuureissa. | Arvokas annos- ja lajikohtainen nollatulos. Ei sulje pois muiden kehitysvaiheiden tai pitkän altistuksen vastetta. [Marine Environmental Research, 10.1016/j.marenvres.2022.105609](https://imr.brage.unit.no/imr-xmlui/bitstream/handle/11250/3056100/1-s2.0-S014111362200054X-main.pdf?isAllowed=y&sequence=1). |

### Lajien välisen yleistämisen rajat: kärpäset, kasvit, sienet ja mikrobit

| Tutkimus | Tarkistettu altiste ja päätulos | Mitä se rajaa BERM-analyysissä |
|---|---|---|
| **16. Bassetto ym. 2023** | *Drosophila*: 97 658 yksilöä valintalabyrintissä ja 10 960 kiipeämiskokeissa. Noin 500 µT:n labyrinttikenttä sekä 300/500 µT:n kiipeämiskentät eivät tuottaneet odotettua magneettiherkkää käyttäytymistä; useita protokollavariantteja. | Laaja replikaatio estää käsittelemästä koko Drosophila-RPM-ketjua varmistettuna. Koe ei kumoa punarinnan kompassia eikä tutki kaikkia mahdollisia kärpäspäätepisteitä. [Nature, 10.1038/s41586-023-06397-7](https://www.nature.com/articles/s41586-023-06397-7). |
| **17. Harris ym. 2009** | *Arabidopsis thaliana*: yritys toistaa aiempi CRY-kasvutulos 500 µT vs. 50 µT. Lisäksi 0/50 µT, 0/1 mT ja noin 0/100 mT vertailuja sekä pigmentti- ja geenimittauksia. Ei johdonmukaisia merkitseviä vasteita. | Kasvin CRY:n olemassaolo ei määrää kokonaisen kasvin magneettivastetta. Riippumaton replikaatio kuuluu yhtä näkyvästi rekisteriin kuin alkuperäinen positiivinen koe. [JRS Interface, 10.1098/rsif.2008.0519](https://pmc.ncbi.nlm.nih.gov/articles/PMC2817153/). |
| **18. Arabidopsis-sähköviljelykoe 2025** | Pysty- tai vaakasuuntainen 5 kV/m:n sähkökenttä lisäsi biomassaa ja lehtien määrää sekä aikaisti kukintaa; tutkimus mittasi myös veden/ravinteiden kulkua, auksiinia ja geenivastetta. | Tuotu sähköfysiologinen toteutus, jossa havaittu etumerkki oli kasvua edistävä. Ei ympäristön RF-koe eikä peruste sanoa kaiken teknisen kentän olevan hyödyllistä. Tekijämetadata poimitaan ennen rekisterituontia DOI-tietueesta. [Bioelectrochemistry, 10.1016/j.bioelechem.2024.108893](https://www.sciencedirect.com/science/article/pii/S156753942400255X). |
| **19. Ruiz-Gómez ym. 2004** | Hiiva *Saccharomyces cerevisiae*, staattinen ja 50 Hz:n kenttä, 0,35 ja 2,45 mT, 24/72 h. Kasvussa ei vaikutusta. | Sieniin ei voi siirtää eläimen hermosto- tai endokriinireittiä. Myös yleinen soluvaurioväite tarvitsee lajista riippuvan kytkennän. [Bioelectromagnetics; PubMed 15296788](https://pubmed.ncbi.nlm.nih.gov/15296788/). |
| **20. Mao ym. 2022** | Luonnon sedimentin magnetotaktiset bakteerit: Maan kenttä, nollakenttä ja 24 tunnin välein käännetty polariteetti. *M. bavaricum* -määrän mitattu noin 50 %:n lasku nollakentässä palautui kentän palauttamisen jälkeen; kokkien vaste erosi. | Aistimisen, liikkumisen ja mikroympäristön etsimisen ehdollinen silta voidaan tutkia myös mikrobeissa. Laskenta ei täysin erota populaatiokokoa liikkuvuuden tai magneettisuuden muutoksesta. Päivittäinen polariteettikäännös ei ole 50 Hz:n koe, eikä nollakenttä ole teknisen kentän kasvun koe. [PLOS ONE, 10.1371/journal.pone.0263593](https://pmc.ncbi.nlm.nih.gov/articles/PMC8870540/). |

Drosophila-tulkinnassa on huomioitava vuoden 2024 julkaistu erimielisyys: [Reppert](https://www.nature.com/articles/s41586-024-07319-x), [Kyriacou](https://www.nature.com/articles/s41586-024-07320-4) ja [Bassetto ym. vastaus](https://www.nature.com/articles/s41586-024-07321-3). Replikaatiokiistaa ei pidä kuvata ratkaistuksi kumpaankaan suuntaan yhden otsikon perusteella.

Sienten jatkotutkimukseen hyödyllinen metodinen lisälähde on Bandara ym. 2024: hiivan kaksiulotteinen levittäytyminen muuttui, mutta kolmiulotteinen levittäytyminen ja sekoitetun nesteviljelmän kasvu eivät. Sen avoin altistuslaite osoittaa, miksi myös kasvualustan geometria täytyy vakioida. Ennen ympäristövertailua kentän jakauma ja voimakkuus poimitaan koko menetelmäosasta. [Biophysical Reports, 10.1016/j.bpr.2024.100165](https://sites.ualberta.ca/~dcharleb/quick-links/publications/pdf/Bandara_Biophys_Rep_2024.pdf).

## 4. Miten laboratoriohavainnosta rakennetaan testattava ekologinen ennuste

Seuraavat ovat BERM:n **ehdollisia siltahypoteeseja**, eivät edellä mainittujen kokeiden suoraan osoittamia kokonaisketjuja.

### A. Suuntautuminen → energiabudjetti → lisääntyminen

Määritetään suuntavirheen jakauma `p_i(θ | q_i, s_i, valo, B₀)`. Lasketaan havaituista reiteistä ylimääräinen lentomatka `ΔL`, viive `Δt` ja nettomääräinen ravinnonhankinta. Energiavara muuttuu esimerkiksi

\[
E_{t+1}=E_t+G_t-c_L L_t-c_m\Delta t.
\]

Sen jälkeen lisääntymistodennäköisyys, pesinnän ajankohta ja selviytyminen sidotaan mitattuun energiavaraan. Mahdollinen kompassivaste voi kompensoitua muiden aistivihjeiden avulla; kompensaation kustannuskin voidaan mitata. Suppilokokeen suuntajakaumasta ei yksin aseteta `ΔL`:ää tai lisääntymishäviötä. Vapaalentoseuranta, muuttokauden ajoitus ja lajikohtainen moniaistisuus ovat tarvittavat jatkosillat.

### B. Pölyttäjän kotiinpaluu → pesä → kasvin siementuotanto

Pesän ravinnontuonti voidaan kuvata `R = F · p_return · n_trips · load`, jossa kaikki osatekijät mitataan samalla altistusprotokollalla. Kotiinpaluuosuuden kokeellinen ero antaa yhdelle tekijälle lähtörajan. Päivittäisten matkojen riippuvuus, uusien kerääjien rekrytointi ja ravintovarastot täytyy arvioida ennen pesän kasvun ennustamista. Yhden siirtokokeen palautumistodennäköisyyttä ei koroteta mielivaltaisesti päivittäisten lentojen määrän potenssiin.

Kasvin kannalta tarvitaan kukkavierailujen, siitepölysiirron, hedelmöityksen ja siementen elinkelpoisuuden peräkkäiset mittaukset. Kukalle laskeutumisen väheneminen ei suoraan määrää siemensatoa, jos muut pölyttäjät, vierailujen laatu tai itsepölytys kompensoivat. Vastaavasti muuttunut sähköinen signaali voi muuttaa pölyttäjälajien jakaumaa, vaikka käyntien kokonaismäärä säilyisi.

### C. Merikaapelin paikallinen vaste → kohtaamistiheys → populaatio

Lasketaan eläimen reittiin sidottu annos `D_i = ∫ K_i[E(x_i(t),t), B(x_i(t),t), ∇B, v_i(t), s_i]dt`. Liike johtavassa vedessä voi tuottaa eläimen suhteen sähköisen komponentin `v×B`; tämän tavallisen fysiikan siirron paikka on tuodussa toteutuksessa. Määritetään kaapelikohtaamisten määrä, viipymä ja ravinnonhakutulos. Lähetys- ja paluujohtimien geometria, hautaussyvyys ja kuormitus tulee tuntea. Sama kaapelijännite tai megawattimäärä ei määritä eläimen annosta.

Kannan pitkäaikaisvaste lasketaan vaihe-/ikärakenteisella mallilla `n(t+1)=M(D,s,ympäristö)n(t)`. Kasvukerroin `λ` määräytyy elossaolon ja hedelmällisyyden matriisista. Kiertelyliikkeen kasvu voi merkitä lisääntyneitä energiakustannuksia, ruokailumahdollisuutta tai aistillista tutkimista; vaikutuksen suunta lisääntymiseen on avoin, kunnes siirtofunktio on mitattu.

### D. Kasvit, sienet ja mikrobit → ekosysteemitoiminnot

Mikrobin liikkuvuus, CFU-luku, biomassan kasvu, lajikoostumus ja hiilen/typen/fosforin kierto ovat eri päätepisteitä. Käytetään rinnakkain solulaskentaa, elävyys- ja liikkumismittauksia, metaboliavirtoja sekä yhteisön koostumusta. Kasvien ja sienten osalta tarvitaan juuristo, vesitalous, mykorritsa, itiötuotto, fotosynteesi ja siemensato; ihmisestä johdetut hormonipäätepisteet eivät korvaa niitä.

Tässä haussa ei varmistunut vahvaa kokonaisketjua tavanomaisesta ympäristön RF/ELF-altistuksesta maaperän mikrobiomin tai sienten pitkäaikaiseen ekologiseen heikentymiseen. Tämä ei päätä analyysia: lähimpien mitattujen linkkien perusteella voidaan rakentaa kokeet `kenttä → solun/juuren toiminta → ravinnevirta → yhteisön muutos`, mutta annokset ja välivaiheet on tunnistettava ennen vaikutuksen numeerista ennustamista. Sähköinfrastruktuurin rakentamisen, maaperän lämmön, veden, kemikaalien ja kasvupaikan muutokset käsitellään rinnakkaisina mitattavina syinä.

## 5. Historiallisen leviämisen ekologinen tietomalli

Jokaiselle alueelle ja vuodelle tarvitaan vähintään seuraava ketju:

1. **Lähde:** asennus- ja käytöstäpoistovuosi, koordinaatit, korkeudet/syvyydet, taajuus, teho/virta, modulaatio, kuormitus ja yö-/vuosirytmi.
2. **Paikallinen siirto:** johtimet ja paluuvirta, suojaus, maasto, kasvillisuus, veden/maaperän johtavuus, syvyys, etäisyys ja suunta. Kaapelien magneettikenttä voi myös pienentää paikallista kokonaiskenttää toisella puolella kaapelia.
3. **Organismin kohtaaminen:** pesä-, ruokailu-, kutu-, vaellus- ja lisääntymisalueet, elinvaihe, vuodenaika ja liikerata. Kunnan keskiarvo ei kuvaa pesän tai pohjaeläimen annosta.
4. **Vastaanotin:** lajikohtainen spektrinen vaste, sisäinen tila, elinvaihe, altistushistoria, lämpötila, valoympäristö ja vuorokausivaihe.
5. **Päätepiste:** paikallinen toiminta, lisääntymistulos, elossaolo sekä vasta tämän jälkeen kanta- ja ekosysteemimittarit.

Ensisijaiset historialliset lisäykset ovat AM/LW/MW/SW- ja FM/TV-lähettimien alueelliset tiedot, voimajohto- ja jakeluverkon kuormitushistoria, meri-HVDC/HVAC:n käyttöönotto ja reitit, satama- ja rannikkoinfrastruktuuri, ulkovalaistuksen tekniikka/spektri sekä maatalouden sähkö- ja ruiskutuskäytännöt. Nämä ovat kerättäviä muuttujia; muistio ei oleta jokaisen niistä jo osoitetusti selittävän populaatiokehitystä.

Arvioitavat rinnakkaisajurit ovat maankäyttö, torjunta-aineet, ravinnon määrä ja laatu, lämpö/kuivuus, infektiot ja loiset, kalastus, fyysiset esteet, melu ja optinen valo. Ne vaikuttavat samoihin biologisiin välittäjiin ja voivat siksi muuttaa myös ehdollista kenttävastetta. Biologinen reduktio ei tarkoita niiden poistamista selityksestä.

## 6. Mitä kannattaa tehdä ensin

**Ensimmäinen korjaus:** erottele sivulla biologisen vasteen tasot: fysikaalinen absorptio, reseptori, käyttäytyminen, lisääntyminen/elossaolo ja populaatio. Näin dosimetriatulosta ei lasketa populaatiohaitan todisteeksi eikä nollatutkimusta uloteta testaamattomiin lajeihin.

**Ensimmäinen aineistolaajennus:** lisää radio/TV, meri- ja maakaapelit sekä optinen yövalo omiksi lähdeperheikseen. Lisää paikalliset sähköiset kukkaviestit ja maatalouden muutokset eksplisiittisesti laajemman biophysical-environment-haaran kohteeksi; niillä ei väitetä olevan samaa annosmekanismia kuin RF:llä.

**Ensimmäinen tutkimusohjelma:** toteuta kolme rinnakkaista, ennakkoon määriteltyä koeasetelmaa: (i) RF-spektrin poisto/palautus ja lintujen tai pölyttäjien liike, (ii) LED-optinen valo × ajuripäästö erillisesti säädettynä, (iii) kaapelin on/off tai kuormitustasot yhdistettynä eläinreitteihin. Pitkän esialtistuksen ja akuutin kokeen faktorit pidetään erillisinä. Lämpö, valo, tärinä ja mittausjärjestelmän kentät mitataan myös sham-tilassa.

**Ensimmäinen BERM:ää erottava testi:** ennen aineiston sovitusta määritellään, mikä mitattu vastemuoto seuraa valitusta L2-operaattorista ja poikkeaa tavallisen RPM-, sähköreseptio-, lämpö- tai valomallin ennusteesta. Pelkkä yhteensopivuus jonkin EMF-havainnon kanssa ei erottele teorioita. Jos tällaista ennustetta ei vielä voida määritellä, koe kalibroi tuotua biologista toteutusta; geometrisen mallin diskriminaatio jää avoimeksi.

## 7. Hakurajat ja seuraavan vaiheen tarkistuslista

Tämän muistion vahvimmat ankkurit ovat suojauksen ja spektrin kontrollit, tarkasti määritellyt käyttäytymiskokeet, todelliset kaapelimittaukset ja riippumattomat replikaatiot. Eri lähteiden kenttäluvut eivät muodosta yhteistä haittakynnystä. RF-kohinan RMS, pT/√Hz, hetkellinen huippu, EIRP, kokonais-B, lisä-B, lähijännite ja absorboitunut teho säilytetään eri sarakkeissa.

Jatkossa tarvitaan erityisesti trooppisia ja eteläisen pallonpuoliskon alueita, sammakkoeläimiä, lepakoita, matelijoita, vesihyönteisiä, planktonia, leviä, jäkälää ja luonnon sieniyhteisöjä. Hakujen osumatarkkuus ja saatavilla oleva kokoteksti eivät tässä riittäneet antamaan näille saman tasoista näyttöarviota. Puuttuva lajiryhmä merkitään kattavuusaukoksi, ei nollavaikutukseksi.

Rekisteriin tallennetaan DOI, tutkimuspaikka ja -aika, laji, elinvaihe, biologisesti riippumattomien koeyksiköiden määrä, sokkoutus, annoksen koko määritelmä, positiivinen kontrolli, ennalta määritelty päätepiste, vaikutusarvio ja luottamusväli, nollatulokset, datan saatavuus sekä se, mitä BERM:n linkkiä tutkimus oikeasti testaa.
