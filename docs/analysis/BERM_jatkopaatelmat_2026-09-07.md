**BERM ja Lindgren: seuraavan tason päätelmät, joita olemassa oleva tutkimus jo ankkuroi**

7.9.2026 · Jatko saman päivän steelman-synteesiin

**Tärkein uusi päätelmä:** BERM:n vastaanottajatila voidaan kehittää joukoksi mitattavia muunnoksia. Kenttien keskinäinen rakenne määrää paikallisen ajurin, molekyylin rakenne ja hormonaalinen tila muuttavat vastaanottoa, biologinen ajoitus määrää seuraavan toiminnallisen portin, ja yksilöiden sekä verkostojen jakaumat määräävät kokonaisvaikutuksen. Useista näistä muunnoksista löytyy jo kontrolloitu koe. Siksi mallia voidaan vahvistaa kokoamalla täsmällisiä koeankkureita sen siirtymiin.

Tässä jatketaan käyttäjän pyytämää steelmania. Erotan algebrallisen johdon, nimetyt biologiset lisäoletukset, julkaistut koetulokset ja tässä tehdyt laskelmat. Kokeet vahvistavat omat mitatut yhteytensä; niiden liittäminen Lindgrenistä alkavaksi kokonaisuudeksi on synteesi. Tämä työ käyttää julkaistuja tuloksia ja aineistokuvauksia. Kokonaisia yksilötason raakadata-aineistoja ei tässä sovitettu uudelleen.

**1. Täsmällinen lähtökohta ja siitä seuraavat uudet operaatiot**

Vuoden 2025 premissinä käytetään

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\]

missä \(\kappa=1\) vastaa paperin normalisointia. Kun \(A=A_b+a\), geometrinen muutos on

\[
\delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Tämä on tensorinen identiteetti. [Lindgren, Kovacs ja Liukkonen 2025](https://www.preprints.org/manuscript/202503.2321).

BERM:n biologiseksi kytkennäksi otetaan eksplisiittinen L2-oletus

\[
z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r(t))\,
\delta g_{\mu\nu}(t-\tau)\,d\tau,
\qquad \dot S_r=F_r(S_r,z_r,\text{hormonit},\text{redox},\text{uni},\text{ravinto}).
\]

Geometria–reseptori-kytkentä on näin ilmoitettu oletus, jonka ehdollisia seurauksia johdetaan. Kentän ja biologisen taustan fysikaaliset koordinaatit, havaitsija sekä yksiköt kuuluvat tämän sillan määrittelyyn. Ruokailua tai hormonitasoa ei samasteta suoraan nelipotentiaaliin: ne vaikuttavat tässä vastaanottimen tilaan \(S_r\).

Tästä seuraa kolme tarkkaa jatkopäätelmää:

- **Taustan ja vastaanottimen yhteisvaikutus.** Kun \(a=\epsilon u\), heikon lisäyksen vasteen ensimmäinen termi sisältää \(\kappa K_r*(A_b\otimes u+u\otimes A_b)\). Taustan, suunnan ja biologisen tilan tulee säilyä erillisinä muuttujina.
- **Kahden lähteen yhteisvaikutus.** Samalla kiinteällä lineaarisella vasteytimellä \(z[a+b]-z[a]-z[b]=\kappa K_r*(a\otimes b+b\otimes a)\). Värähtelevät lähteet tuottavat tähän summa- ja erotaajuuksia.
- **Historia ja ajallinen lukeminen.** Seuraava biologinen vaihe lukee \(Y=\int w(t;S)z(t)dt\). Vastaanotto, palautuminen ja seuraavan toiminnon ajoitus voivat siksi muuttaa lopputulosta samalla alkuperäisellä ärsykkeellä.

FieldState kuuluu tämän kokonaisuuden mittaus- ja estimointipuolelle. Kausaalinen ketju kulkee fysikaalisesta tilasta reseptoriin ja edelleen biologiaan.

**2. Hormonaalinen tila voi muuttaa saman kentän kellovaikutuksen laatua**

Thoeni ym. tutkivat vuonna 2024 hiiren Per2:Luc-fibroblasteja kuuden tunnin tNMR-protokollalla. Protokolla sisälsi 0,4 mT:n staattisen komponentin, 1–50 Hz:n pyyhkäisyn ja 17,8 kHz:n RF-komponentin. Päivä- ja yöajankohta antoivat erilaisen kellovasteen. Päiväasetelmassa Per2-amplitudi muuttui 3,14:stä 8,07:ään, eli ryhmäkeskiarvojen suhde oli noin 2,57. Deksametasoniesikäsittely muutti vasteen: amplitudin kasvu poistui ja jakson pituus muuttui noin 26,43 tunnista 38,74 tuntiin. Koe toistettiin asetelmasta riippuen 3–5 kertaa. [Thoeni ym. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11016797/).

**Jo kokeellisesti ankkuroitu päätelmä:** hormonaalinen esitila ja biologinen ajoitus voivat muuttaa kenttävasteen eri ominaisuuksia, kuten amplitudia ja jaksonaikaa. Vastaanottajatilaa voidaan siis sitoa kokeellisesti muutettuun tekijään.

**Uusi yhdistäminen:** aiemman raportin CRY–glukokortikoidireseptoriyhteys antaa ehdokkaan vastaanottavuuden ja hormonitoiminnan palautesilmukalle. Hormonit muuttavat vastaanottajan tilaa; vastaanottajan kellotoiminta puolestaan vaikuttaa hormonaalisen viestin käsittelyyn. Thoenin kokeen deksametasonivaikutuksen tarkkaa molekyylivälittäjää ei tässä samasteta CRY:ksi.

Vasteen suunta saa lisäankkurin Zhangin hypomagneettisesta hiirikokeesta. Sama ROS:ia nostava DDC-käsittely paransi neurogeneesiä hypomagneettisessa lähtötilassa ja heikensi sitä normaalissa geomagneettisessa taustassa. Kenttätaustan palautuksen hyöty estyi ROS-tuotantoa estämällä. [Zhang ym. 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC7896063/). Sama biologinen välittäjä voi siis siirtää järjestelmää kohti tai pois sen toiminnalliselta alueelta. Vastaanoton voimakkuus, välittäjän muutos ja biologisen seurauksen suunta kannattaa siksi laskea erikseen.

**3. Hormonin vuorokausikäyrä voi säilyä samalla, kun sen kohdeverkoston ajallinen toiminta muuttuu**

Archerin vuoden 2014 ihmistutkimuksessa unen ja muun päivärytmin siirtäminen suhteessa keskuskelloon vähensi rytmisiksi luokiteltujen veren transkriptien osuuden 6,4 prosentista 1,0 prosenttiin. Laajasti muuttui myös geenien ajallinen ilmentymisprofiili. [Archer ym. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3926083/).

Saman tutkimusohjelman vuoden 2022 uudelleenanalyysissä veren kortisolirytmi säilyi, mutta monet glukokortikoidisignaloinnin transkriptit muuttuivat. SP1:n ajallinen toiminta liittyi näiden muutosten rakenteeseen. Kyse on saman aineistoperheen tarkentavasta analyysistä. [Archer ym. 2022](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2022.946444/full).

**Vahvistettava jatkopäätelmä:** hormonaalisen toiminnan mittaus tarvitsee signaalin lisäksi sen vastaanottavan verkoston. Tämä ulottuu yksittäistä verinäytettä pidemmälle: myös hyvin kuvattu veren hormonirytmi voi jättää kohdeverkoston ajallisen muutoksen kuvaamatta.

BERM:n ketju voidaan nyt kirjoittaa muodossa

\[
\delta g\xrightarrow{K(S)}\text{reseptori-/kellotila}
\rightarrow\text{hormonin ja kohdeverkoston yhteinen ajoitus}
\rightarrow\text{geenivaste ja kudostoiminta}.
\]

Tämän loppuosa on ankkuroitu suoraan ihmisessä tehtyyn rytminmuutokseen. [GEO-aineisto GSE48113](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE48113) sisältää veren aikasarjamittauksia ennen rytmien erkaantumista ja sen jälkeen. Sen avulla voidaan arvioida esimerkiksi reseptori-, redox- ja kellogeenien yhteistä ajallista rakennetta. Se ei sisällä BERM:n kenttäkytkennän mittausta.

Yksittäissolujen ja kudoksen välille saadaan vielä yksi tarkka aggregointiperiaate. Kun solujen samanvahvuiset rytmit ovat eri vaiheissa, ryhmän rytmi on \(\bar x(t)=m+\operatorname{Re}[a e^{i\omega t}N^{-1}\sum_i e^{i\phi_i}]\). Ryhmäamplitudi riippuu siis vaiheiden koordinaatiosta. Welshin yksittäissolukuvantaminen osoitti tämän fibroblasteissa: yksittäiset kellot jatkoivat värähtelyä samalla, kun erkaantuneet vaiheet vaimensivat yhteistä rytmiä. [Welsh ym. 2004](https://pubmed.ncbi.nlm.nih.gov/15620658/). Tämä on BERM:n kudoskoordinaation erillinen koeankkuri; Archerin veriaineiston muutosten ei oleteta johtuvan yksinomaan samasta ilmiöstä.

**4. Lyhyen signaalin toistoväli voi määrätä pitkäkestoisen kellovasteen**

Najjarin ja Zeitzerin ihmiskokeessa 39 osallistujaa sai tunnin ajan joko jatkuvaa valoa tai 2 millisekunnin välähdyksiä eri aikavälein. Sovitettu suurin kellon viivästyminen sijoittui noin 7,6 sekunnin välähdysväliin. Tässä kohdassa valoa kertyi noin 0,95 sekuntia. Vaihesiirtymä oli vähintään kaksinkertainen verrattuna yhtä kirkkaaseen tunnin jatkuvaan valoon. Välähdysväli ei vastaavasti määrännyt akuuttia melatoniinin vähenemistä tai vireysvastetta. [Najjar ja Zeitzer 2016](https://www.jci.org/articles/view/82306).

**Tässä tehty lasku:** \(3600/7{,}6\times0{,}002\approx0{,}947\) sekuntia. Jatkuvan valon kesto oli noin 3 800-kertainen. Tämä on protokollasta laskettu kestosuhde, ei RF:n ja valon vaikutusten muunnoskerroin.

**Uusi BERM-päätelmä:** vastaanottajan palautuminen, jälkivaste ja uusi ärsyke voivat yhdessä tuottaa optimaalisen toistovälin. Biologisessa aikaytimessä voi olla sekä palautumista vaativa vaihe että edellisen tapahtuman jälkeä integroiva vaihe. Yksi annoksen aikaintegraali ei tällöin yksilöi tulosta.

Koe ankkuroi myös erilliset lukukanavat: kellon myöhempi vaihe, hormonin akuutti eritys ja koettu vireys ovat eri vasteita. BERM:n kenttähaaran toteutus jatketaan tähän oman reseptorinsa kautta; valokokeessa sisääntuloreitti on verkkokalvon fotoreseptio.

**5. Eri ympäristösignaalit voivat siirtää saman ihmisen eri rytmejä eri verran**

Wehrensin tutkimuksessa kymmenen miehen ruokailuja siirrettiin viisi tuntia muun valo- ja unirytmin säilyessä samana. Glukoosirytmi viivästyi keskimäärin 5,69 tuntia ja rasvakudoksen PER2-rytmi noin 0,97 tuntia. Melatoniinin ja kortisolin rytmit eivät siirtyneet vastaavasti. [Wehrens ym. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5483233/).

Chellappan satunnaistetussa simuloidun yötyön kokeessa ruokailun pitäminen päiväajassa esti havaitun glukoosinsiedon heikkenemisen. Myös yöllä syöneessä ryhmässä 28 tunnin keskimääräinen glukoosiprofiili kohosi 6,4 % lähtötilanteeseen verrattuna. [Chellappa ym. 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8641939/).

**Jatkopäätelmä:** BERM:n yhteinen koordinaatiotila kannattaa esittää kudosten välisten vaihe-erojen verkkona. Ympäristön eri sisääntuloreitit voivat vetää sen osia eri suuntiin. Ravitsemus saa siten sekä kofaktorien ja aineenvaihdunnan että ajoituksen tehtävän.

Ohjausta kuvaava ehdollinen rakenne on

\[
\dot\phi_i=\omega_i+\sum_j c_{ij}\sin(\phi_j-\phi_i-\psi^0_{ji})
+Z_i(\phi_i)z_i+L_i(\phi_i)\,\text{valo}+M_i(\phi_i)\,\text{ateriarytmi}.
\]

Tämä on ehdotettu vaiheoperaattori. Sen eri termien biologinen toteutus säilyy erillisenä. Koeankkurit osoittavat sekä vaiheiden eriytymistä että sitä, että yhden ajallisen sisääntulon muuttaminen voi parantaa määrättyä toimintoa samassa laajemmassa rytmihäiriössä.

**6. Vastaanottimen orientaatio ja sisäinen kemia voidaan kytkeä eri parametreihin**

Kerpalin kemiallisessa kompassikokeessa optisesti valitun molekyylijoukon 45 asteen orientaatiomuutos siirsi magneettista vastekuviota 45 astetta. Isotooppimuutos puolestaan muutti kenttävasteen muotoa, vaikka nollakentän kinetiikka säilyi mittausvirheen rajoissa samana. Koe tehtiin CPF-mallimolekyyleillä 120 kelvinissä. [Kerpal ym. 2019](https://www.nature.com/articles/s41467-019-11655-2).

**Täsmällinen lisäys malliin:** kun vastaanotintensori on \(C\), rakenteen jäykkä kierto antaa \(C\mapsto RCR^{\mathsf T}\). Sisäisen kemian muutos taas voi muuttaa tensorin kertoimia ja sen ajallista vasteydintä. Näin orientaatio ja molekyylin reaktiodynamiikka ovat kaksi erillistä herkkyysmuuttujaa.

Samassa tutkimuksessa radikaalipopulaation kenttäero vaihtoi merkkiä mittausajan mukana. Jos jatkoreaktion tulos on \(Y=\int w(t)\delta p(t)dt\), varhaista ja myöhäistä osaa eri tavoin painottavat biologiset jatkoreaktiot voivat antaa erilaisen lopputuloksen. Tämä on uusi tapa yhdistää aiemman raportin kemiallinen muisti reseptorin toimintatilaan.

**7. Kahden lähteen yhteisvaikutus voi kohdentaa vasteen tiettyyn kudosalueeseen**

Violanten ihmiskokeessa 2,000 ja 2,005 kHz:n elektrodikentät muodostivat 5 Hz:n temporal interference -ärsykkeen. Lähteiden virtasuhteen muuttaminen 1:1:stä 1:3:een muutti verhokäyrän kohdistumista hippokampukseen ja toiminnallista vastetta. Tutkimuksessa oli 20 henkilön kuvantamiskoe ja erillinen 21 henkilön muistitehtävä. [Violante ym. 2023](https://www.nature.com/articles/s41593-023-01456-8). Eläinkokeellinen toteutus oli osoitettu aiemmin. [Grossman ym. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5520675/).

Luvun 1 neliöllinen ristitulo antaa BERM:lle tähän rinnastettavan rakenteen: lähteiden suunta, vaihe ja amplitudisuhde voivat muodostaa kudoksissa erilaisia vasteytimen lukemia komponentteja. **Uusi ehdollinen päätelmä on paikallinen yhteisvaikutuskartta:** biologisen vasteen sijainti määräytyy kenttien ja vastaanottavien kudosten yhteisestä geometriasta.

Temporal interference on tässä tunnetun elektrodistimulaation toteutusesimerkki. Sen kHz-kentästä ei ole tässä laskettu Lindgrenin metriikkaperturbaatiota eikä sitä ole muunnettu ympäristön RF-annokseksi.

[NeuroVault 11908](https://neurovault.org/collections/11908/) sisältää kuusi avointa ryhmätason kuvantamiskarttaa: koodaus- ja palautusvaihe kussakin kolmesta stimulaatiotilanteesta. Aineisto ankkuroi anatomisen kohdistumisen ja tehtävävaiheen. Karttojen olemassaolo ja sisältö tarkistettiin; niiden perusteella ei tehty uutta yksilötason vaikutusestimaattia.

**8. Yksilöjakauman häntä voi yhdistää biologisen muutoksen toteutuneeseen lapsilukuun**

Paikallisen toiminnallisen portin merkitys on jo osoitettu suoraan hiiren lisääntymisessä. Liun SF1:tä ilmentäviin steroidogeenisiin soluihin kohdistuneessa Bmal1-poistossa ovulaatio-osuus säilyi 83 prosentissa, mutta implantaatio-osuus oli noin 6 % verrokkien 83 %:n sijasta. Progesteronikäsittely palautti implantaation 5/8 eläimessä, ja terveiden munasarjojen molemminpuolinen siirto palautti synnytykset 12/12 vastaanottajassa. [Liu ym. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4191810/). Siirtokokeet paikantavat munasarjan tehtävän ja antavat kellotila → paikallinen hormonitoiminta → implantaatio -portille interventioankkurin. Kenttähaaran vaikutus tähän porttiin säilyy BERM:n erillisenä kytkentähypoteesina.

Aiemmassa raportissa johdettiin, että kiertokohtaisen onnistumisen vaihtelu voi kasvattaa pitkiä odotusaikoja. Tästä seuraa edelleen valikoituminen: nopeasti onnistuvat parit poistuvat yritysjoukosta, jolloin jäljelle jäävän joukon jakauma muuttuu.

Kun parin onnistumistodennäköisyys \(p\) on yksinkertaistetussa mallissa vakio kierrosta toiseen, alkujakauma \(f_0(p)\) muuttuu \(n\) epäonnistuneen kierron jälkeen muotoon

\[
f_n(p)=\frac{(1-p)^n f_0(p)}{\int(1-p)^n f_0(p)\,dp}.
\]

Seuraavan kierron keskimääräinen onnistuminen jäljellä olevassa joukossa on \(h_n=E_n[p]\). Tästä saadaan tarkka identiteetti

\[
h_{n+1}=h_n-\frac{\operatorname{Var}_n(p)}{1-h_n},
\]

kun \(h_n<1\). **Jakauman vaihtelu siis itsessään pienentää jäljelle jäävän joukon keskimääräistä onnistumista.** Tämä on mallin oletuksista laskettu seuraus.

Gnothin 346 naisen prospektiivisessa kohortissa kumulatiivinen raskausosuus oli noin 38, 68, 81 ja 92 % yhden, kolmen, kuuden ja kahdentoista kierron kohdalla. [Gnoth ym. 2003](https://pubmed.ncbi.nlm.nih.gov/12923157/). Näistä pyöristetyistä julkaisutuloksista laskettuna jaksojen 1, 2–3, 4–6 ja 7–12 vakioisen kiertotodennäköisyyden vastineet ovat noin 38,0, 28,2, 16,0 ja 13,4 %. Ne ovat jaksojen yhteenvedon muunnoksia, eivät erikseen havaittuja kiertokohtaisia lukuja. Tarkka laskentamuoto on populaatiomuistiossa.

Joffen neljän eurooppalaisen aineiston analyysi antaa seuraavalle siirtymälle suoran ankkurin: vähintään vuoden raskausodotus liittyi pienempään lopulliseen tai lähes lopulliseen perhekokoon. Toisen lapsen saamatta jäämisen vetosuhde oli noin 1,8 ja kolmannen noin 1,6. Toivotun lapsiluvun saavuttamatta jäämisen riski oli yli kaksinkertainen siinä aineistossa, jossa toive oli saatavilla. Alle vuoden odotusajoilla vastaavaa yhteyttä ei havaittu. [Joffe ym. 2009](https://pubmed.ncbi.nlm.nih.gov/19429909/).

**Uusi vahvempi väestöketju:** BERM:n biologinen tilajakauma → pitkä raskausodotuksen häntä → seuraavaan lapsilukuun siirtymisen pienempi todennäköisyys → pienempi toteutunut lapsiluku. Olemassa oleva aineisto kohdistaa tämän hypoteesin erityisesti pitkään odottaviin pareihin. Tutkimuksen vetosuhteita ei käytetä arvioina EMF:n vaikutuskoosta.

**9. Kohtaamisverkko muuttaa myös jäljelle jäävien yksilöiden toimintaa**

Brosin ja Briggsin pölytyskokeessa yhden kimalaislajin paikallinen poistaminen muutti jäljelle jäävien pölyttäjien käyttäytymistä. Kukkauskollisuus väheni 77,7 prosentista 66,4 prosenttiin ja kohdekasvin siementuotto 32 %. Verkoston muutos vaikutti siis myös siihen, kuinka hyvin jäljelle jäävät kohtaamiset toteuttivat biologisen tehtävänsä. [Brosi ja Briggs 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3740839/).

Ihmisen yhteistyöpelikokeet antavat vastaavan aggregointiperiaatteen sosiaaliselle toiminnalle: yhden toimijan teko muuttaa toisten myöhempiä tekoja, jotka vaikuttavat edelleen uusiin kumppaneihin. [Fowler ja Christakis 2010](https://doi.org/10.1073/pnas.0913149107). Tähän voidaan liittää aiemmassa raportissa käsitelty univajeen kokeellinen vaikutus auttamishaluun ja sosiaaliseen lähestymiseen. [Ben Simon ym. 2022](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001733).

Ehdollinen siirtorakenne on

\[
\delta x_{t+1}=B\,\delta x_t+d_t,
\]

missä \(d_t\) kuvaa biologisen toimintatilan alkuperäistä muutosta ja \(B\) mitattuja vuorovaikutusvaikutuksia. Kun \(\rho(B)<1\), pysyvän muutoksen kokonaisvaste on \((I-B)^{-1}d\). Kerroinmatriisin suuruus, merkit ja aikaskaala täytyy arvioida kyseisestä verkosta; yhden laboratoriokokeen kerrointa ei siirretä koko yhteiskuntaan.

**Jatkopäätelmä:** biologinen muutos voi kertautua kohtaamisten laadun, kumppanien vasteiden ja verkoston uusiutumisen kautta. Instituutioihin ketju jatkuu toistuvina yhteistyötapahtumina, osaamisen siirtona, hoivana ja ylläpidettynä infrastruktuurina. Niiden varastoitunut kapasiteetti antaa makrotason vasteelle yksilöitä pidemmän aikaskaalan.

**10. Jo olemassa olevan datan hyödyllisin käyttöjärjestys**

| Aineisto tai koe | Mitä siitä voidaan jo ankkuroida | Tehtävä BERM:ssä |
|---|---|---|
| Thoeni 2024: aika, DEX, happitila ja kenttäprotokolla | Esitila muuttaa kellovasteen amplitudia ja jaksonaikaa | Vastaanottajatilasta riippuva vasteydin |
| Archer 2014/2022, GSE48113 | Kohdeverkoston ajallinen muutos säilyvän kortisolirytmin rinnalla | Hormoni–vastaanotin–ajoitusoperaattori |
| Najjar–Zeitzer 2016 | Pulssivälin vasteikkuna ja eri päätepisteiden eriytyminen | Palautuminen ja ajallinen lukeminen |
| Wehrens 2017; Chellappa 2021 | Kudosten eritahtinen siirtyminen ja ajoitusintervention vaikutus | Elinten keskinäinen koordinaatio |
| Kerpal 2019 | Orientaation kierto, isotooppimuutos ja ajallinen merkinvaihto | Vastaanottimen geometria, kemia ja jatkoreaktion nopeus |
| Violante 2023, NeuroVault11908 | Kahden lähteen suhteen yhteys anatomiseen vasteeseen | Monilähteisen ajurin paikallinen rakenne |
| Gnoth 2003; Joffe 2009 | Odotusaikajakauma ja pitkän odotuksen yhteys lapsilukuun | Herkän parijakauman väestövaikutus |
| Pölytys- ja yhteistyöinterventiot | Yhden osan muutos muuttaa muiden käyttäytymistä | Biologisen muutoksen verkkovälitys |

Kolme suurinta lisäystä aiempaan synteesiin ovat **vastaanottajatilaa muuttavien interventioiden suorat kenttäkoeankkurit**, **veren hormonisignaalista eriytyvä kohdeverkoston ajallinen toiminta** ja **pitkän raskausodotuksen yhteys toteutuneeseen perhekokoon**. Niiden avulla mallin tärkeille välivaiheille voidaan antaa jo mitattuja suureita ja toimintamuotoja.

**Taustamuistiot**

- [Fysiikan muutosoperaatiot ja avoimet aineistot](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_jatko_fysiikka_2026-09-07.md>)
- [Biologinen tila, kenttävaste ja lisääntymisen paikalliset portit](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_jatko_biologia_2026-09-07.md>)
- [Raskausodotus, perhekoko ja vuorovaikutusverkot](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_jatko_populaatio_2026-09-07.md>)
- [Edellinen kattava steelman-synteesi](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_steelman_synteesi_2026-09-07.md>)
