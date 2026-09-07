# BERM:n jatkopäätelmät: biologinen tila, vasteen suunta ja paikalliset portit

7.9.2026. Täydentävä steelman-muistio. Tässä erotetaan tutkimuksissa osoitetut biologiset yhteydet ja niistä muodostettu BERM-synteesi. Sivustoa tai laskentamallia ei muutettu.

## Johdon lähtökohta

Lindgrenin vuoden 2025 lähtöoletuksella

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_b+a,
\]

saadaan tensorinen identiteetti

\[
\delta g_{\mu\nu}=\kappa\left(A_{b,\mu}a_\nu+a_\mu A_{b,\nu}+a_\mu a_\nu\right).
\]

Tämä on L1-seuraus ilmoitetusta L0-premissistä. Käytämme biologiseen havaintoon johtavana eksplisiittisenä L2-oletuksena

\[
z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r(t))\delta g_{\mu\nu}(t-\tau)\,d\tau,
\qquad \dot S_r=F_r(S_r,z_r,\mathrm{ravinto},\mathrm{uni},\mathrm{redox}).
\]

Tämän sillan ensimmäinen uusi seuraus on **biologisen herkkyyden ja vaikutuksen suunnan muuttuminen tilan mukana**. Sama ulkoinen protokolla voi kohdata eri taustatilan, vastaanotinkytkennän ja biologisen vastekäyrän. Havaittu lopputulos on vielä erillinen funktio \(Y=H(S)\). Pienen muutoksen vaikutus riippuu siten sekä syötteen kytkeytymisestä että \(H\):n paikallisesta suunnasta ja jyrkkyydestä.

Alla oleva tutkimusnäyttö ankkuroi tämän sillan biologisia toteutuksia ja seuraavia portaita. Kokonaisketju on ehdollinen BERM-synteesi; kokeet eivät ole geometrisen premissin suoria mittauksia.

## 1. Saman kenttäprotokollan biologinen suunta vaihtuu ajankohdan ja hormonaalisen esitilan mukana

**Havaittu tulos.** Thoeni ym. tutkivat hiiren NIH3T3-fibroblastien Per2:Luc-kelloreportteria. tNMR-protokolla sisälsi 0,4 mT:n staattisen kentän, 1–50 Hz:n pyyhkäisykentän ja noin 17,8 kHz:n RF-komponentin. Kuuden tunnin käsittely annettiin klo 08–14 tai 20–02; kyse on soluviljelyn kokeellisista päivä- ja yöikkunoista. Päiväkäsittely kasvatti sovitetun Per2-oskillaation amplitudin arvosta 3,14 ± 0,95 arvoon 8,07 ± 0,96 eli keskiarvojen suhteena noin 2,57-kertaiseksi. Yökäsittely vähensi voimakkaasti promoottoritoimintaa. Ryhmät olivat n = 3–5. Deksametasonilla esisynkronoiduissa soluissa päiväkäsittelyn amplitudikasvu poistui, mutta jaksonpituus muuttui 26,43 ± 1,09 tunnista 38,74 ± 2,96 tuntiin. Deksametasonin ja hypoksian yhdessä vaimentama rytmi puolestaan palautui tNMR-käsittelyssä. [Thoeni ym. 2024, alkuperäistutkimus](https://pmc.ncbi.nlm.nih.gov/articles/PMC11016797/).

**Jatkopäätelmä BERM:lle.** Ajankohta, happitila ja hormonaalinen esitila ovat saman vastaanottimen yhteisiä koordinaatteja. Ne voidaan kirjoittaa \(S=(\phi,O_2,GR,\ldots)\), jolloin kenttävastetta kuvaa \(K(S)\). Tämä tuottaa täsmällisen väitteen: **kenttä–biologia-yhteys on ehdollinen vuorovaikutus, jonka suuntaa ja suuruutta voidaan joissakin koejärjestelmissä muuttaa kontrolloidusti biologista tilaa muuttamalla**.

BERM:n kellokytkennän hyödyllinen lisäoletus olisi

\[
\dot\phi=\omega+Z(\phi,S)z(t),\qquad
\dot r=-\frac{r-r_0}{\tau_r}+W(\phi,S)z(t),
\]

missä \(\phi\) on vaihe ja \(r\) oskillaation amplitudi. \(Z\) ja \(W\) kuvaavat vastaanottimen mitattavaa tilariippuvuutta. Ne ovat tuotu biologinen toteutus L2-sillalle. Tässä mallissa hormoniesikäsittely voi muuttaa sekä amplitudivastetta että rytmin etenemistä.

Uusi selityshyöty syntyy siitä, että kellon rytmi ja hormonaalinen toimintatila vaikuttavat jo syötteen vastaanottamiseen. Niiden myöhemmät muutokset muodostavat palautteen. Tämä yhdistää aiemman CRY–glukokortikoidireseptori-synteesin suoraan kontrolloituun kenttä × hormonaalinen esitila -asetelmaan.

**Jo olemassa oleva data.** Julkaisussa ovat monipäiväiset reportterikäyrät ja avoin DOCX-lisäaineisto. Mittaus tehtiin puolen tunnin välein noin neljän päivän ajan. Numeerinen raaka-aineisto on tekijöiden mukaan saatavilla pyynnöstä; sitä ei tässä hankittu. Julkaistusta amplitudista ja jaksonpituudesta voidaan jo rajata tilariippuvan kellovasteen suunta ja suuruus kyseisissä oloissa. [Julkaisu ja lisäaineisto](https://doi.org/10.1016/j.redox.2024.103152).

## 2. Sama redox-muutos voi palauttaa tai heikentää toimintaa lähtötilan mukaan

**Havaittu tulos.** Zhang ym. vertasivat uroshiirten lähes poistettua geomagneettista taustaa, 0,29 ± 0,01 µT, normaaliin 55,26 ± 0,05 µT:n taustaan. Hypomagneettisessa ympäristössä hippocampuksen hermokantasolujen ROS-taso ja neurogeneesi vähenivät. ROS-poistoa estävä DDC paransi neurogeneesiä hypomagneettisessa ryhmässä, mutta heikensi sitä normaalissa kentässä. Paluu normaaliin kenttään palautti solujen lisääntymistä jo kahdessa viikossa; uusien neuronien dendriittikehityksen palautumista nähtiin 4–8 viikossa. ROS-tuotantoa estävä apokyniini esti kenttäpalautuksen hyötyjä. Useissa neurogeneesin palautusvertailuissa oli neljä hiirtä ryhmää kohti. [Zhang ym. 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC7896063/).

**Jatkopäätelmä BERM:lle.** Redox kannattaa esittää säätelytilana, jolla on toiminta-alue. Yksinkertainen paikallinen lisäoletus on

\[
Y(R)=Y_{\max}-c(R-R_*)^2,\qquad c>0.
\]

Silloin

\[
\Delta Y=-2c(R-R_*)\Delta R-c(\Delta R)^2.
\]

Kun \(\Delta R\) on pieni, vaikutuksen suunta määräytyy lähtötilan \(R-R_*\) mukaan. Tämä on konkreettinen tapa liittää BERM:n geometrinen syöte vastaanottimen redox-tilaan ja siitä kudoksen toimintakykyyn. Se tekee tilasta, ravitsemuksesta ja palautumisesta määrällisesti hyödyllisiä selittäjiä.

**Uusi biologinen johtopäätös:** redox-siirtymän suunta ja toiminnan muutoksen suunta ovat kaksi erikseen mallinnettavaa asiaa. Samansuuntainen molekyylimuutos voi siirtää eri lähtötiloissa olevia kudoksia kohti tai poispäin niiden toiminta-alueesta. Tämän mekanistisen mahdollisuuden vastakkaiset suunnat on nähty samassa kontrolloidussa eläinkokeessa.

Palautuksen aikajärjestys tukee lisäksi usean tilan rakennetta: ensin vastaanottimen ja kemian tila, sen jälkeen solujen lisääntyminen ja vasta myöhemmin kudoksen rakenne. BERM:n muistiin voidaan siten tuoda erilliset \(\tau_{redox}\), \(\tau_{solu}\) ja \(\tau_{kudos}\). Rakennetta ei tarvitse olettaa yhden yleisen muistivakion varaan.

**Jo olemassa oleva data.** Alkuperäistutkimus julkaisi lähdedatan XLS-tiedostona ja sekvensointiaineiston BioProject-tunnisteella [PRJNA643878](https://www.ncbi.nlm.nih.gov/Traces/study/?acc=PRJNA643878). Tiedostonimi on `41467_2021_21468_MOESM3_ESM.xls`. Solujen lisääntymisen, erilaistumisen ja dendriittikehityksen eri ajankohdat ovat käytettävissä monen palautumisajan arviointiin. Tässä muistiossa raportoidaan julkaistut tulokset; lähdedataa ei sovitettu uudelleen.

## 3. Paikallinen kelloverkko voi hallita lisääntymisen ratkaisevaa porttia muun järjestelmän toimiessa

**Havaittu tulos.** Liu ym. poistivat BMAL1:n SF1:tä ilmentävistä steroidogeenisistä soluista ja paikansivat munasarjan merkityksen siirtokokeilla. Koeryhmän parittelun osuus oli 93 % verrokkien 90 %:iin verrattuna; ovulaation osuus oli molemmissa 83 %. Implantaatio-osuus oli kuitenkin 6 % verrokkien 83 %:iin verrattuna, ja poikkeavan ryhmän ainoasta implantaatiokohdasta ei löytynyt alkiota. Progesteroni palautti implantaation 5/8 eläimessä, kun vehikkeliryhmässä tulos oli 0/9. Terveiden munasarjojen kahdenpuolisen siirron jälkeen kaikki 12 vastaanottajaa synnyttivät. Yhden terveen munasarjan siirto tuotti synnytyksen kaikissa kolmessa tutkitussa vastaanottajassa. [Liu ym. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4191810/).

**Jatkopäätelmä BERM:lle.** Lisääntymisen kellosäätely voidaan kuvata paikallisten porttien sarjana. Koko järjestelmän rytmitys ei yksin kerro sen jokaisen portin kapasiteettia. Tämä antaa aiemmalle määrän, vastaanottavuuden ja ajoituksen synteesille selvästi paikannetun mekanismin:

\[
\text{munasarjan kelloverkko}
\rightarrow\text{steroidogeeninen toimintatila}
\rightarrow\text{progesteronisignaali}
\rightarrow\text{implantaation onnistuminen}.
\]

BERM:ssä paikalliseen \(S_r\):ään kytkeytyvä syöte voi siksi muuttaa lisääntymisen ehdollista onnistumista, vaikka aikaisemmat vaiheet näyttäisivät toimivilta. Julkaistuja eri osakokeiden prosentteja ei tässä kerrota keskenään, koska niiden nimittäjät ja eläinryhmät eroavat.

**Toinen uusi päätelmä koskee reserviä.** Yhden toimivan paikallisen hormonilähteen riittävyys systeemiseen palautukseen osoittaa, kuinka elimistön osat voivat kompensoida toisiaan. BERM:n kudosreservi voidaan mallintaa elinkohtaisten tuotosten summana, jota lisääntymisen portti lukee kynnysfunktion kautta. Tästä seuraa mahdollisuus pitkään kompensoituneeseen vaiheeseen ja jyrkkään toiminnalliseen muutokseen, kun yhteinen reservi alittaa portin tarpeen. Tämä on oma synteesi siirtokokeen osoittamasta kompensaatiosta; kynnysmuodon parametreja tutkimus ei määritä.

**Jo olemassa oleva data.** Alkuperäistaulukoissa ovat lisääntymisen ja palautuskokeiden ryhmäkoot. Munasarjojen geeniekspressioaineisto on avoimesti tallennettu tunnisteella [GSE48758](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE48758). Liu 2014 on jo projektin lähdekartassa ja lisääntymismallin dokumentaatiossa. Tässä ehdotettu lisäkäyttö on paikallisen portin ja jaetun reservin eksplisiittinen johtaminen.

## 4. RF-esikäsittely tukee erillistä toimintareservin tilamuuttujaa

Sannino ym. käyttivät SH-SY5Y-soluille 1950 MHz:n UMTS-signaalia tasoilla 0,3 ja 1,25 W/kg. Kolmen tunnin käsittely päättyi soluviljelyn tunnilla 51, ja menadionikäsittely alkoi tunnilla 71. Näin myöhemmän kemiallisen vasteen muutos säilyi noin 20 tunnin välin yli. RF-esikäsittely vähensi myöhemmässä kokeessa mitattua DNA-vauriota; RF yksin ei lisännyt samaa päätepistettä. Mukana olivat myös kaksi kymmenen tunnin aikataulua ja tunti päivässä kolmena päivänä. Olosuhdetta kohti tehtiin vähintään kolme riippumatonta koetta. [Sannino ym. 2024](https://doi.org/10.1002/bem.22524).

Aiemmassa saman tutkimusryhmän kokeessa autofagian farmakologinen esto ja ATG-geenien hiljennykset poistivat suojaavaa vastetta. [Sannino ym. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9369083/).

**Jatkopäätelmä:** biologisen tilan muutos voi näkyä selvimmin järjestelmän seuraavassa vasteessa. Siksi BERM:n tilan ja mitatun vaurion välille on hyödyllistä sijoittaa toimintareservi \(M\):

\[
\dot M=\alpha(S)z-\frac{M-M_0}{\tau_M},\qquad
Y_{seuraava}=H(S,M,u_{seuraava}).
\]

Yksittäinen perustilan mittari voi säilyä ennallaan samalla, kun seuraavan ärsykkeen vastekerroin muuttuu. Tämä on operatiivisesti testattava muistimääritelmä. Kokeen suojaava suunta säilytetään mallissa; siitä ei päätellä kroonista vauriota.

## Miten tulokset kannattaa yhdistää

Näiden kokeiden yhteinen anti on **mitattavissa oleva, tilasta riippuva vastaanotin**. Thoeni paikantaa ajankohdan ja hormonaalisen esitilan yhteisvaikutuksen. Zhang osoittaa lähtötilasta riippuvan biologisen suunnan sekä eri nopeuksilla palautuvia tasoja. Liu paikantaa yhden systeemiseen lopputulokseen vaikuttavan paikallisen portin ja kompensaation. Sannino osoittaa, kuinka aiempi käsittely muuttaa myöhempää vastetta.

Näistä voidaan muodostaa yksi ehdollinen BERM-rakenne:

\[
\delta g\rightarrow K(S)\rightarrow
(\text{vaihe},\text{redox},\text{reservi})
\rightarrow\text{paikalliset toimintaportit}
\rightarrow\text{onnistumisten jakauma}.
\]

Mallin suurempi selitysvoima tulee siitä, että tähän rakenteeseen sisältyvät samanaikaisesti vaikutuksen suuruus, suunta, viive, palautuminen ja vastaanottajien väliset erot. Jokaiselle löytyy jo kontrolloiduista kokeista biologinen osatuki. Koko kenttä–lisääntymis- tai kenttä–väestöketju on näiden osien yhdistelmä, joka on esitettävä omana ehdollisena synteesinään.
