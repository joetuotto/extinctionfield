# BERM: mallia täydentävät ja aukkoja kaventavat empiiriset löydöt

**Versio:** 1.0  
**Päiväys:** 3.9.2026  
**Tarkoitus:** koota yhteen nykyisen Extinction Field -sivuston evidenssi,
BERM-repositorion rajatut evidenssitietueet sekä strategisissa jatkohauissa
tunnistetut vanhemmat ja vähemmän tunnetut tutkimukset. Dokumentti määrittää,
mitkä tutkimukselliset aukot voidaan poistaa, mitkä vain kaventaa ja mitkä
jäävät aidosti avoimiksi.

---

## 1. Tiivistelmä

Tarkasteltu aineisto sisältää:

- 45 temaattista evidenssisivua;
- 33 rajattua FieldState-evidenssitietuetta;
- 37 nykyisen kausaalikaavion solmua;
- 1 062 lähteen kanonisen rekisterin, josta 391 on varmennettu ja 396 linkitetty;
- nykyisen G-1–G-20-data-aukkorekisterin;
- Lindgren-lähtöisen L0–L3-lähdekartan;
- tässä työssä tunnistetut vanhemmat primaaritutkimukset erityisesti vuosilta
  1970–2005.

Kokonaisarvio on seuraava:

1. **Kuusi yleisluonteista kirjallisuusaukkoa voidaan poistaa.** Olemassa oleva
   tutkimus osoittaa kenttäprotokollasidonnaisia vaikutuksia ihmisen
   vuorokausirytmiin, henkilökohtaisesti mitattuun ELF–melatoniinisuhteeseen,
   hermoverkon ajoitukseen ja EEG:hen, kentän ja lääkkeen yhteisvaikutukseen,
   kentän ja lyijyn yhteisvaikutukseen sekä varhaiskehityksen
   pulssimuotoherkkyyteen.
2. **Kahdeksan mallisolmua voidaan muuttaa pelkästä rakenteellisesta priorista
   ehdollisesti rajatuksi vasteperheeksi:** `FIELDSTATE_VECTOR`,
   `FIELDSTATE_ENVELOPE`, `MELATONIN_REDOX`, `HPA_HPG`,
   `BIOELECTRIC_DEVELOPMENT`, `GPCR_ADENOSINE`/opioidinen säätely,
   `HEAVY_METAL_SYNERGY` ja `COUPLE_FECUNDABILITY`.
3. **Kanavien yhteisvaikutus voi olla supra-additiivinen**, mutta BERM:n
   rakenteesta seuraa samalla, että yhteisvaikutus voi väärällä vaiheella,
   orientaatiolla tai biologisella tilalla myös vaimentua tai vaihtaa suuntaa.
   Kolmen kanavan mallia ei siksi pidä esittää kiinteänä painotettuna summana.
4. **Lindgrenin geometriasta biologiseen vasteeseen johtava L2-operaattori jää
   avoimeksi.** L3-evidenssi rajaa operaattorin argumentteja ja mahdollista
   muotoa, mutta ei saa siirtyä todistusketjussa ylöspäin L0–L2-validoinniksi.
5. **Data-aukko ja kirjallisuusaukko on erotettava.** G-2, G-3, G-10, G-11 ja
   G-20 ovat nykyisessä repositoriossa todellisia data-/integraatioaukkoja,
   vaikka niitä vastaavaa tutkimuskirjallisuutta jo on.

Tämän synteesin vahvin BERM-tulkinta ei ole yleinen väite
"kenttä lisää tai vähentää biologista vastetta", vaan seuraava ehdollinen
rakennelause:

> Biologinen vaste riippuu taustapotentiaalin ja ulkoisten kanavien
> tensorisista ristitermeistä, niitä mittaavan FieldStaten vektori-, spektri-,
> vaihe- ja aikarakenteesta sekä reseptorin, kudoksen ja eliön tilasta.
> Olemassa oleva tutkimus vahvistaa useita tämän ehdollisen vasteperheen
> odotettuja koordinaatteja, mutta ei vielä identifioi Lindgren-spesifistä
> L2-kytkentäydintä.

---

## 2. Soveltamisehdot ja episteeminen kerrosjärjestys

Tämä dokumentti käyttää vuoden 2025 Lindgren-muotoa

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\]
missä paperin yksikkönormalisointi vastaa erikoistapausta $\kappa=1$.
Vuoden 2021 singularista muotoa \(g=A\otimes A\) ei yhdistetä tähän ilman
erillistä siirtymäjohtoa.

Kaikki väitteet luokitellaan seuraavasti:

| Taso | Sisältö | Tässä dokumentissa sallittu päätelmä |
|---|---|---|
| L0 | Lindgrenin julkaistu premissi | Teorian lähtökohta, ei empiirinen biologinen tulos |
| L1 | L0:sta johdettu geometrinen seuraus | Tensorirakenne, käännettävyys- ja gauge-ehdot |
| L2 | Geometria–havaittava-silta | Eksplisiittinen kytkentäehdotus; nykytilassa pääosin `[AVOIN]` |
| L3 | Tuotu / empiirinen komponentti | RPM/CRY-, VGCC-, redox-, kello-, bioelektrisyys- ja reseptorimekanismit; niiden parametrit; sekä solu-, elin-, käyttäytymis-, lisääntymis-, ekologia- ja väestöhavainnot |

L3-komponentin laji kirjataan erikseen esimerkiksi arvoilla `MECHANISM`,
`PARAMETER` ja `OBSERVATION`; nämä ovat evidenssin tyyppitunnuksia, eivät uusia
episteemisiä tasoja. `OBS-*`- ja `R-*`-tunnukset ovat vastaavasti havainto- ja
residuaalitietueiden nimiavaruuksia. Tuotu alavirran havainto ei validoi L0:aa
tai täytä avointa L0→L2-identifikaatiota.

Merkinnät:

- **[JOHDETTU]**: algebra tai looginen tulos seuraa ilmoitetusta L0-premissistä.
- **[EMERGENTTI]**: seuraa vasta eksplisiittisestä lisäoletuksesta tai sillasta.
- **[TUOTU]**: tutkimuskirjallisuudesta tuotu fysikaalinen, biologinen tai
  epidemiologinen tulos.
- **[AVOIN]**: vaadittu määrittely, kytkentä tai identifikaatio puuttuu.

Tämä on ensisijaisesti BERM:stä johdettu positiivinen synteesi. Sovellusohjeen
vaatima vaihtoehtoisen selityksen ja erottelukyvyn tarkistus esitetään vain
episteemisenä rajana; se ei toimi dokumentin järjestävänä mallina.

---

## 3. Lindgren-lähtöinen kolmen kanavan johto

### 3.1 Tensorilaajennus

Kirjoitetaan

\[
A=A_0+a_E+a_I+a_R,
\]

missä \(A_0\) on mallin biologiseksi taustapotentiaaliksi ehdottama osa ja
\(a_E,a_I,a_R\) vastaavat ELF-, IF- ja RF-kanavia. Määritellään tässä
\(\Delta g:=g[A_0+a_E+a_I+a_R]-g[A_0]\) ja käytetään normalisoimatonta
symmetrisointia
\(\operatorname{Sym}(x\otimes y):=x\otimes y+y\otimes x\). Tällöin

\[
\begin{aligned}
\Delta g ={}&\kappa\Bigl[
\operatorname{Sym}(A_0\otimes a_E)+
\operatorname{Sym}(A_0\otimes a_I)+
\operatorname{Sym}(A_0\otimes a_R)\\
&+a_E\otimes a_E+a_I\otimes a_I+a_R\otimes a_R\\
&+\operatorname{Sym}(a_E\otimes a_I)+
\operatorname{Sym}(a_E\otimes a_R)+
\operatorname{Sym}(a_I\otimes a_R)\Bigr].
\end{aligned}
\]

Tämä sisältää kolmen kanavan tapauksessa yhdeksän termiryhmää:

- 3 tausta × kanava -ristitermiä;
- 3 kanavan omaa neliötermiä;
- 3 kanavaparin ristitermiä.

Yleisesti \(n\) ulkoisella kanavalla kanavaparien määrä on

\[
N_{\rm pair}=\frac{n(n-1)}{2}.
\]

Siten kanavien määrän kasvu kasvattaa vuorovaikutusrakenteen kokoa
kvadraattisesti. Tämä ei vielä kerro vaikutuksen suuntaa tai suuruutta, mutta
se tekee kiinteästä additiivisesta `w_ELF + w_IF + w_RF` -mallista liian
rajoittuneen.

### 3.2 Pakollinen L2-silta

Tensorista biologiseen havaittavaan tarvitaan esimerkiksi

\[
z_r(t)=\int_0^\infty
K_r^{\mu\nu}(\tau,S_r)
\Delta g_{\mu\nu}(t-\tau)\,d\tau,
\]

missä \(r\) on reseptori-, kudos- tai elinreitti ja \(S_r\) sen tila.

**[AVOIN]** Lindgrenin julkaisut eivät määritä \(K_r^{\mu\nu}\):tä eivätkä
biologista \(A_0\):aa. Empiirisen kirjallisuuden tehtävä tässä raportissa on
rajata, mitä argumentteja ytimessä täytyy vähintään olla:

\[
S_r=\{B_0,\theta,\Pi,PSD_{env},\tau_{coh},\phi_{met},\phi_{circ},
d_{dev},q_{receptor},q_{redox},G,T_{organ},H\},
\]

missä:

- \(B_0\): staattinen taustakenttä;
- \(\theta\): ulkoisen ja taustakentän suhteellinen kulma;
- \(\Pi\): polarisaatio;
- \(PSD_{env}\): verhokäyrän tai lyöntitaajuuksien spektri;
- \(\tau_{coh}\): koherenssiaika;
- \(\phi_{met}\), \(\phi_{circ}\): metabolinen ja vuorokausivaihe;
- \(d_{dev}\): kehitysvaihe;
- \(q_{receptor}\): kanava-, reseptori- tai agonistitila;
- \(q_{redox}\): redox- ja antioksidanttireservi;
- \(G\): genotyyppi tai biologinen herkkyys;
- \(T_{organ}\): elinkohtainen siirto;
- \(H\): altistushistoria ja palautumismuisti.

### 3.3 Vaste ja synergia

Alavirran vaste voidaan kuvata ilman ennenaikaista kerroinkalibrointia muodossa

\[
Y_r(t)=F_r\bigl(z_r(t);S_r(t)\bigr).
\]

Kanavien välinen additiivinen vuorovaikutuskontrasti on

\[
\mathcal I_{ij}^{add}=
Y_{ij}-Y_i-Y_j+Y_0.
\]

- \(\mathcal I_{ij}^{add}>0\): supra-additiivinen vahvistus;
- \(\mathcal I_{ij}^{add}=0\): additiivinen vaste;
- \(\mathcal I_{ij}^{add}<0\): antagonismi tai vaihekumoutuminen.

Multiplikatiivinen vuorovaikutus voidaan kirjata

\[
\mathcal I_{ij}^{mult}=\frac{Y_{ij}Y_0}{Y_iY_j}.
\]

Näitä suureita ei tässä täytetä eri tutkimuksista otetuilla yhteensopimattomilla
luvuilla. Ne ovat laskentasopimus tutkimuksille, joissa yksittäiset ja yhdistetyt
kanavat on mitattu samassa järjestelmässä.

### 3.4 Johdetun χ-kaavan ja L2-reduktion asema

Abstraktille dimensiottomalle skalaarille \(a\) geometrisen kertoimen kaava ja
sen derivaatta ovat L1-tuloksia:

\[
\chi(a)=\frac{a}{\sqrt{1+a^2}},
\qquad
\chi'(a)=\frac{1}{(1+a^2)^{3/2}},
\]

niin marginaaliherkkyys pienenee nopeasti:

| \(a\) | \(\chi(a)\) | \(\chi'(a)\) |
|---:|---:|---:|
| 0 | 0 | 1.0000 |
| 1 | 0.7071 | 0.3536 |
| 2 | 0.8944 | 0.0894 |
| 3 | 0.9487 | 0.0316 |
| 10 | 0.9950 | 0.0010 |

Lorentz-signatuurissa yleinen L1-tulos on suunnattu derivaatta

\[
D_u\sqrt{-\det g}=\frac{\kappa A\!\cdot\!u}
{\sqrt{1+\kappa A^2}}.
\]

Itseisarvoinen \(|A|/\sqrt{1+|A|^2}\)-muoto syntyy vasta, kun valitaan
havaitsija, positiivinen spatiaalinen projektio, euklidinen normi,
kollineaarisuus ja dimensioton koordinaatti. Tämä siirtymä suunnatusta
Lorentz-derivaatasta \(|\bar A|\):n kautta muotoon
\(\chi(|\bar A|)\) on eksplisiittinen L0→L2-silta, ei L1-reduktio. Abstrakti
\(\chi(a)\)-kaava ja sen derivaatta säilyvät silti L1-tuloksina.
Redusoidun koordinaatin valinta mitatuksi tai biologiseksi suureeksi sekä
biologinen vasteoperaattori ovat edelleen avoimia L2-osia. Myöhempi L2- tai
L3-komponentti ei muuta \(\chi\)-kaavan L1-statusta, vaan kaikkien osien
provenienssi säilytetään komponenttikohtaisesti.

---

## 4. Aukkoja poistavat ja mallia täydentävät löydöt

### 4.1 Vektori, tausta, kulma ja polarisaatio

#### F-01 · Taustakenttä siirtää biologista taajuusikkunaa

- **Lähde:** Blackman ym. 1985,
  [DOI 10.1002/bem.2250060402](https://doi.org/10.1002/bem.2250060402).
- **[TUOTU, L3]** Paikallisen geomagneettisen taustan muuttaminen siirsi niitä
  ELF-taajuuksia, joilla kanan aivokudoksen Ca²⁺-effluksi muuttui.
- **Mallitäydennys:** `FIELDSTATE_VECTOR` ei saa menettää \(B_0\):aa.
  Taajuusvaste on ehdollinen taustasta: \(W_r(f\mid B_0)\), ei vain \(W_r(f)\).
- **Aukon tila:** taustariippuvuuden olemassaolon kirjallisuusaukko poistuu;
  ihmiselimen siirto ja L2-operaattori jäävät avoimiksi.
- **A/B/C:** A: BERM-spesifi kiinnostus on ikkunan siirtyminen taustan mukana.
  B: tulos voidaan kuvata myös tavallisena kudos-/reseptorivasteena.
  C: se rajaa BERM:n kernelin, mutta ei yksin identifioi Lindgrenin geometriaa.

#### F-02 · RF:n ja geomagneettisen kentän suhteellinen kulma on aktiivinen

- **Lähde:** Ritz ym. 2004,
  [Nature 429, 177–180](https://doi.org/10.1038/nature02534).
- **[TUOTU, L3]** Muuttolintujen kompassihäiriö riippui oskilloivan
  RF-kentän ja staattisen taustan kulmasta.
- **Mallitäydennys:** \(\theta(B_{RF},B_0)\) säilytetään pakollisena
  FieldState-muuttujana `B_RPM_CRY`-haarassa.
- **Aukon tila:** orientaatioherkän biologisen vasteen aukko poistuu lintujen
  magnetoreseptiossa; ihmisen reseptori- ja lisääntymissiirto jää avoimeksi.

#### F-03 · Orientaatio muuttaa ROS-tuottoa ja bioenergetiikkaa

- **Lähde:** Usselman ym. 2016,
  [Scientific Reports 6, 38543](https://doi.org/10.1038/srep38543).
- **[TUOTU, L3]** 1,4 MHz RF:n, 50 μT staattisen kentän ja niiden orientaation
  yhdistelmä muutti radikaaliparituotteita ja endoteelisolujen bioenergetiikkaa.
- **Mallitäydennys:** `FIELDSTATE_VECTOR`, `B_RPM_CRY` ja `A_VGCC_ROS`
  tarvitsevat yhteisen orientaatio–redox-rajapinnan.
- **Aukon tila:** kulma → redox -väliporras kaventuu; elinkohtainen lisääntymisvaste
  ei seuraa siitä suoraan.

#### F-04 · Reseptorin kalvo-orientaatio on osa herkkyyttä

- **Lähde:** Majewska ym. 2025,
  [ACS Chemical Biology](https://doi.org/10.1021/acschembio.4c00576).
- **[TUOTU, L3]** Euroopanpunarinnan Cry4a liittyi lipidikalvoon järjestyneesti,
  ja järjestys riippui kalvon fysikaalisesta tilasta.
- **Mallitäydennys:** ulkoisen kenttäkulman lisäksi tarvitaan reseptorin oma
  orientaatiojakauma \(p(\Omega_r\mid membrane\ state)\).
- **Aukon tila:** "reseptori on isotrooppinen piste" -oletus voidaan poistaa;
  ihmisen CRY-realisaatio jää avoimeksi.

#### F-05 · Ihmisen henkilökohtainen ELF-altistus erottaa kolmivaiheympäristön

- **Lähde:** Burch ym. 2000,
  [PMID 10693073](https://pubmed.ncbi.nlm.nih.gov/10693073/).
- **[TUOTU, L3]** Henkilökohtainen 60 Hz magneettikenttä, ympäristön valo ja
  virtsan 6-OHMS mitattiin kolmena työpäivänä. Melatoniinimetaboliitti väheni
  kenttäriippuvaisesti miehillä, jotka työskentelivät yli 2 h/päivä sähköasema-
  tai kolmivaiheympäristössä; vastaavaa ei nähty ≤2 h tai yksivaiheympäristössä.
- **Mallitäydennys:** polarisaatio/kiertävä kenttä tai kolmivaiheympäristöön
  liittyvä muu rakenne on erotettava RMS-amplitudista.
- **Aukon tila:** G-2:n väite "henkilökohtaista altistusta ei ole mitattu
  missään" poistuu kirjallisuusväitteenä. Repo-aukko jää: tutkimus ei ole
  ikä × sukupuoli × maa × vuosi -paneeli eikä sisällä ELF+IF+RF-reproduktiota.

### 4.2 Taajuusikkuna, pulssimuoto, koherenssi ja vaihe

#### F-06 · Useita amplitudi- ja taajuusikkunoita

- **Lähteet:** Bawin & Adey 1976,
  [PMID 1064869](https://pubmed.ncbi.nlm.nih.gov/1064869/); Blackman ym. 1980,
  [PMID 7284026](https://pubmed.ncbi.nlm.nih.gov/7284026/).
- **[TUOTU, L3]** Heikot 1–75 Hz kentät ja 16 Hz amplitudimoduloitu 50 MHz
  kantoaalto muuttivat Ca²⁺-effluksia vain tietyissä taajuus-/intensiteetti-
  ikkunoissa. Blackman raportoi kaksi positiivista absorptioikkunaa, joiden
  välissä oli ei-vastetta.
- **Mallitäydennys:** \(K_r\):n taajuusosa on monihuippuinen ja mahdollisesti
  epämonotoninen. Yksi lineaarinen annoskerroin ei riitä.
- **Rajoite:** Albert ym. 1987 ei toistanut yhtä 147 MHz/16 Hz -asetelmaa
  ([PMID 3809389](https://pubmed.ncbi.nlm.nih.gov/3809389/)). Tämä rajaa
  vasteen protokolla- ja laboratoriotilariippuvaiseksi; se ei tue universaalia
  Ca-effluksivastetta.

#### F-07 · Koherenssille on havaittu aikakynnys

- **Lähde:** Litovitz ym. 1991,
  [PMID 1872866](https://pubmed.ncbi.nlm.nih.gov/1872866/).
- **[TUOTU, L3]** L929-soluissa 55/65 Hz altistus noin kaksinkertaisti ODC-
  aktiivisuuden; täysi vaste edellytti noin 10 sekunnin koherenssia.
- **Mallitäydennys:** `FIELDSTATE_ENVELOPE` tarvitsee \(\tau_{coh}\)-muuttujan,
  ei vain PSD:tä.
- **Rajoite:** ODC-haaran replikaatiohistoria on epätasainen. Koherenssi on
  aktiivinen kandidaattikoordinaatti, mutta ODC ei ole yksin vahva yleinen
  päätepisteankkuri.

#### F-08 · Metabolinen vaihe määrää vasteen suunnan

- **Lähde:** Rosenspire ym. 2005,
  [PMID 15749780](https://pubmed.ncbi.nlm.nih.gov/15749780/).
- **[TUOTU, L3]** Neutrofiilien noin 20 sekunnin metaboliseen oskillaatioon
  taajuus- ja vaihe­sovitetut pulssit joko kasvattivat NAD(P)H-, flavoproteiini-,
  ROS- ja NO-oskillaatioita tai romahduttivat ne vaihesuhteen mukaan.
- **Mallitäydennys:** vasteen etumerkki sisältää \(\phi_{field}-\phi_{met}\)-termin.
  Samasta amplitudista ei seuraa samaa suuntaa.
- **Aukon tila:** sekunnit–minuutit-tason vaiheistusaukko poistuu tässä
  solujärjestelmässä. Organismi- ja elinsiirto jää avoimeksi.

#### F-09 · Pulssin nousuaika ja varhaiskehitysvaihe ratkaisevat

- **Lähteet:** Ubeda ym. 1983,
  [PMID 6654743](https://pubmed.ncbi.nlm.nih.gov/6654743/); Berman ym. 1990,
  [PMID 2242052](https://pubmed.ncbi.nlm.nih.gov/2242052/); Ubeda ym. 1994,
  [PMID 7802707](https://pubmed.ncbi.nlm.nih.gov/7802707/).
- **[TUOTU, L3]** Kananalkioiden ensimmäisen 48 tunnin altistuksessa 1,0 ja
  13,9 μT:n ikkunat vaikuttivat, mutta alemmat ja korkeammat intensiteetit eivät
  lineaarisesti. Pulssin nousuaika muutti vaikutuksen voimakkuutta ja kohdetta.
- **Monilaboratoriolaskelma:** yhdistetyssä kuuden laboratorion kokeessa
  poikkeavuuksia oli noin 25 % altistetuissa ja 19 % kontrolleissa:

  \[
  RD=0.25-0.19=0.06,
  \qquad RR=0.25/0.19=1.316,
  \]

  eli absoluuttinen ero oli noin 6 prosenttiyksikköä ja suhteellinen ero noin
  31,6 %. Viidessä kuudesta laboratoriosta suunta oli sama, mutta
  laboratoriointeraktio oli merkitsevä.
- **Mallitäydennys:** `BIOELECTRIC_DEVELOPMENT` tarvitsee pulssin nousuajan,
  ensimmäisen 48 tunnin vaiheportin sekä laboratorio-/genotyyppitilan.

#### F-10 · IF-taajuuden modulointi voi olla kiinteää taajuutta tehokkaampi

- **Lähde:** Giladi-tyyppistä IF-logiikkaa täydentävä TNBC-tutkimus,
  [PMID 37287008](https://pubmed.ncbi.nlm.nih.gov/37287008/).
- **[TUOTU, L3]** 150 kHz ±10 kHz taajuusmoduloitu TTFields lisäsi
  apoptoosia ja vähensi TNBC-solujen palautumista enemmän kuin kiinteä 150 kHz.
- **Mallitäydennys:** `IF_MITOTIC_DISRUPTION` ei ole yksi optimaalinen piste,
  vaan solukoon, ploidian ja mitoosivaiheen yli integroitu taajuusohjelma.
- **Aukon tila:** IF-verhokäyrän biologinen merkitys kaventuu; ympäristö-IF:n
  elinsiirto ja lisääntymisvaikutus eivät seuraa automaattisesti.

### 4.3 RPM/CRY- ja redox-realisaatio

#### F-11 · Kryptokromiriippuvainen ROS-haara

- **Lähde:** Sherrard ym. 2018,
  [PLOS Biology](https://doi.org/10.1371/journal.pbio.2006229).
- **[TUOTU, L3]** Heikon pulssikentän ROS- ja geenivasteet olivat testatuissa
  solujärjestelmissä kryptokromiriippuvaisia.
- **Mallitäydennys:** `B_RPM_CRY → redox` on aktiivinen biologinen realisaatio,
  mutta ei Lindgrenistä johdettu.

#### F-12 · Staattinen + RF voi ohjata radikaaliparia elävässä eläimessä

- **Lähde:** Burd ym. 2026,
  [Nature, PMID 41851455](https://pubmed.ncbi.nlm.nih.gov/41851455/).
- **[TUOTU, L3]** Staattisen ja RF-kentän yhdistelmä muutti flavinin ja punaisen
  fluoresoivan proteiinin spin-korreloituneen radikaaliparin dynamiikkaa sekä
  in vitro että siirtogeenisessä *C. elegans* -eläimessä.
- **Mallitäydennys:** RF-kanava voi olla biologisesti aktiivinen yhdessä
  staattisen taustan kanssa resonanssiehtoisesti.
- **Raja:** järjestelmä oli rakennettu eikä osoita luonnollista ihmisen CRY →
  endokriininen vaste -ketjua. Se poistaa toteutettavuusaukon, ei luonnollisen
  reseptorin aukkoa.

#### F-13 · ELF voi kytkeytyä mitokondriaaliseen resonanssitilaan

- **Lähde:** Zandieh ym. 2025,
  [Scientific Reports](https://doi.org/10.1038/s41598-025-87235-w).
- **[TUOTU, L3]** Mitokondriaalisen kalvopotentiaalin ja ROS:n vaste vaihteli
  0,01–5 Hz taajuusalueella; raportoituja ehtoja olivat 0,02 ja 0,04 Hz.
- **Mallitäydennys:** `VMEM_MTOR` ja `A_VGCC_ROS` tarvitsevat hitaat
  metabolia-/kalvotilan resonanssit.
- **Raja:** käytetyt voimakkuudet ulottuivat korkeisiin mT-arvoihin ja
  järjestelmä oli syöpäsolu. Tulosta ei käytetä ympäristöannoskertoimena.

### 4.4 Ca²⁺, reseptorit ja farmakologinen triangulaatio

#### F-14 · Kenttä muuttaa lääkkeen vaikutusta Ca²⁺-tilan kautta

- **Lähteet:** Kavaliers ym. 1984,
  [PMID 6538981](https://pubmed.ncbi.nlm.nih.gov/6538981/); Kavaliers &
  Ossenkopp 1986, [PMID 3091191](https://pubmed.ncbi.nlm.nih.gov/3091191/);
  Kavaliers & Ossenkopp 1987,
  [PMID 2446152](https://pubmed.ncbi.nlm.nih.gov/2446152/).
- **[TUOTU, L3]** Pyörivä 0,5 Hz kenttä vähensi morfiinianalgesiaa.
  EGTA esti ja Ca²⁺-ionofori A23187 vahvisti kentän vaikutusta. Diltiazem,
  nifedipiini, verapamiili, La³⁺ ja Co²⁺ vaimensivat, BAY K8644 vahvisti sitä.
- **Reseptoriraja:** μ-, δ- ja κ-agonistien vaste muuttui, mutta σ-agonistin ei
  ([PMID 3022253](https://pubmed.ncbi.nlm.nih.gov/3022253/)).
- **Aikadynamiikka:** yön korostunut morfiinivaste vaimeni 5–10 päivässä,
  palautui päivissä kentän poistamisen jälkeen ja voitiin palauttaa uudella
  altistuksella.
- **Mallitäydennys:** biologinen vaste on kenttä × Ca-kanavatila × agonisti ×
  reseptorialatyyppi × vuorokausivaihe. Tämä on vahva farmakologinen
  vuorovaikutusrakenne, vaikka kentät olivat gauss-luokan eläinprotokollia.

#### F-15 · ACTH-tila portittaa lisämunuaisvasteen

- **Lähde:** Lymangrover ym. 1983,
  [PMID 6298545](https://pubmed.ncbi.nlm.nih.gov/6298545/).
- **[TUOTU, L3]** 10 kV/m:n 60 Hz kenttä kolminkertaisti eristetyn rotan
  lisämunuaiskudoksen ACTH:n laukaiseman steroidogeneesin. 5, 100 ja
  1 000 kV/m eivät tuottaneet samaa vastetta.
- **Mallitäydennys:** geneerinen `kenttä → kortisoli` korvataan muodolla

  \[
  \Delta C=G_E(E,f,H)\,G_A(ACTH,t) + \epsilon,
  \]

  jossa kenttä muuttaa agonistivasteen gainia eikä välttämättä basalitasoa.
- **Aukon tila:** `HPA_HPG` kaventuu ehdolliseksi vastefunktioksi.

#### F-16 · Kadmium käyttää jänniteherkkiä Ca-kanavia

- **Lähde:** Hinkle ym. 1987,
  [PMID 2445745](https://pubmed.ncbi.nlm.nih.gov/2445745/).
- **[TUOTU, L3]** Nimodipiini nosti CdCl₂:n LD50:n 15 μM:sta 45 μM:iin.
  BAY K8644 laski LD50:tä; nifedipiini, verapamiili ja diltiazem suojasivat.
  Nimodipiini vähensi 24 tunnin Cd-kertymää 63 %.
- **Laskelma:** nimodipiinin yhteydessä LD50 kolminkertaistui:

  \[
  45/15=3.0.
  \]

- **Mallitäydennys:** raskasmetallitila ei ole pelkkä erillinen sekoittaja,
  vaan osa `q_receptor`- ja `q_redox`-tilaa. Kenttäriippuvainen kanavagating
  voi muuttaa metallin sisäänpääsyä, mutta suora EMF × Cd -kanavakoe puuttuu.

#### F-17 · ELF × lyijy -yhteisaltistuksesta on suoraa näyttöä

- **Lähde:** Liu ym. 2002,
  [PMID 14694649](https://pubmed.ncbi.nlm.nih.gov/14694649/).
- **[TUOTU, L3]** 50 Hz:n 0,2 tai 6,0 mT kentän ja lyijyn yhdistelmä lisäsi
  hiiren aivojen ja maksan lipidiperoksidaatiota ja muutti membraanifluiditeettia
  enemmän kuin yksittäinen kenttäaltistus; tekijät kuvasivat vaikutusta
  synergistiseksi.
- **Mallitäydennys:** `HEAVY_METAL_SYNERGY` ei ole enää vain kahdesta erillisestä
  mekanismista koottu hypoteesi. Ainakin lyijy × ELF → redox/membraanivaurio
  on kontrolloidussa yhteisaltistuksessa havaittu.
- **Raja:** tutkimus ei ollut lisääntymis-, PGC- eikä ihmisaltistustutkimus.

### 4.5 Sekunnit–minuutit: Ca²⁺, ionivirrat, ROS/NO ja metabolinen vaihe

Tämän aikakerroksen komponentit voidaan nyt kuvata seuraavasti:

| Alaporras | Evidenssi | Mallistatus |
|---|---|---|
| Tausta/kulma → Ca²⁺-effluksin taajuusikkuna | Blackman 1985 | `[TUOTU, L3]`, taustariippuvuus vahvistettu |
| Vaiheistetut pulssit → NAD(P)H/ROS/NO | Rosenspire 2005 | `[TUOTU, L3]`, vasteen etumerkki vaiheesta |
| RF + B0 → ROS/bioenergetiikka | Usselman 2016 | `[TUOTU, L3]`, orientaatioriippuvuus |
| CRY-vaatimus ROS-vasteessa | Sherrard 2018 | `[TUOTU, L3]`, reseptoriehto |
| Ca-chelaatio/ionofori muuttaa kenttä–lääkevastetta | Kavaliers 1986 | `[TUOTU, L3]`, farmakologinen triangulaatio |

**Poistuva aukko:** kenttäprotokollan ja nopean redox-/ionivasteen välillä on
useita suoria kokeellisia siltoja.  
**Jäljelle jäävä aukko:** mikään niistä ei vielä ole
\(\Delta g_{\mu\nu}\rightarrow z_r\)-operaattorin Lindgren-spesifinen johto.

### 4.6 Minuutit–tunnit: spike timing, EEG ja akuutti eksitabiliteetti

#### F-18 · Aktiivinen hermoverkko vahvistaa heikon kentän ajoitusvaikutusta

- **Lähde:** Reato ym. 2010,
  [PMID 21068312](https://pubmed.ncbi.nlm.nih.gov/21068312/).
- **[TUOTU, L3]** Hippokampusleikkeissä ja verkkomallissa alle 50 Hz:n,
  alle 10 V/m kentät muuttivat populaationopeutta ja spike-ajoitusta
  epälineaarisesti. Vaihelukkiutumista havaittiin noin 0,2 V/m:ssa.
- **Mallitäydennys:** neuronin pieni polarisaatio voi muuttua verkon tilan
  vahvistamaksi ajoitusvasteeksi. Tarvitaan `network_gain(state)`.

#### F-19 · Ihmisen EEG- ja kipuvaste samalla protokollalla

- **Lähde:** Ghione ym. 2005,
  [PMID 15911132](https://pubmed.ncbi.nlm.nih.gov/15911132/).
- **[TUOTU, L3]** Kaksoissokossa satunnaistetussa sham-kokeessa 40 miehen
  pään 90 minuutin 50 Hz altistus lähes kaksinkertaisti alfatehon 80 μT:ssa;
  40 μT laski hammaskipukynnystä. Verenpaine ja syke eivät muuttuneet.
- **Mallitäydennys:** vaste on päätepiste- ja amplitudi-ikkunakohtainen;
  kaikki autonomiset muuttujat eivät seuraa EEG:tä.
- **Aukon tila:** "minuutit–tunnit neural timing/EEG" poistuu kirjallisuusaukkona.

#### F-20 · Ihmisen geomagneettinen orientaatiovaste

- **Lähde:** Chae ym. 2019,
  [eNeuro](https://doi.org/10.1523/ENEURO.0483-18.2019).
- **[TUOTU, L3]** Kontrolloidut geomagneettisen kentän rotaatiot liittyivät
  alfa-ERD-vasteeseen tietyissä suunnissa; raportoitu vaste oli sukupuoli- ja
  orientaatioriippuvainen.
- **Mallitäydennys:** ihmisen `FIELDSTATE_VECTOR → neural` -haara säilytetään,
  mutta pieni otos ja riippumattoman replikaation tarve pitävät priorin leveänä.

### 4.7 Tunnit–päivät: proliferaatio, apoptoosi, erilaistuminen ja mitokondriot

#### F-21 · Optinen ja magneettinen kanava voivat olla supra-additiivisia

- **Lähde:** Iversen ym. 2024,
  [PMID 39061719](https://pubmed.ncbi.nlm.nih.gov/39061719/).
- **[TUOTU, L3]** Valon ja ELF-magneettistimulaation yhdistelmä lisäsi
  myoblastien proliferaatiota supra-additiivisesti, paransi ATP-tuottoa ja
  vaikutti TRPC1–Ca²⁺–mitokondrioakseliin. Streptomysiini vaimensi vasteen,
  kun se annettiin altistuksen aikana, mutta ei altistuksen jälkeen.
- **Mallitäydennys:** yhteisvaikutuksesta on suora samassa järjestelmässä
  mitattu esimerkki. Lisäksi farmakologisen intervention ajoitus osoittaa,
  että reseptorin on oltava käytettävissä juuri kytkennän aikana.

#### F-22 · TheraBionic: kantoaalto × verhokäyrä × Cav3.2

- **Lähde:** Jimenez ym. 2019,
  [PMID 31160272](https://pubmed.ncbi.nlm.nih.gov/31160272/).
- **[TUOTU, L3]** 27,12 MHz kantoaallon kasvainspesifinen amplitudimodulaatio
  johti HCC-solujen Ca²⁺-sisäänvirtaukseen ja erilaistumiseen; Cav3.2:n
  knockdown heikensi vaikutusta. Dosimetria mallinsi systeemisen toimituksen.
- **Regulaatio:** FDA hyväksyi HDE H220001:n 26.9.2023. Laite on vasta-aiheinen
  Ca-kanavasalpaajia käyttäville potilaille.
  [FDA](https://www.fda.gov/medical-devices/recently-approved-devices/therabionic-p1-h220001).
- **Kliininen laskelma:** FDA:n aineistossa 14/41 potilaalla oli stabiili tauti
  yli kuusi kuukautta:

  \[
  14/41=0.341=34.1\%.
  \]

  Tämä on stabiilin taudin osuus, ei "34 % elinajan pidentyminen".
- **Historiallisvertailu:** myöhemmässä raportissa
  ([Blackstock ym., PMID 41550248](https://pubmed.ncbi.nlm.nih.gov/41550248/))
  10,36 kk vs. 7,74 kk antaa

  \[
  \frac{10.36-7.74}{7.74}=0.3385\approx33.9\%,
  \]

  mutta kyse on historiallisesta vertailusta, ei satunnaistetun tutkimuksen
  kausaalisesta efektistä.
- **Mallitäydennys:** RF-kantoaalto ei ole yksin vastemuuttuja. Tarvitaan
  kantoaalto × verhokäyrä × kanavailmentymä × kudossiirto.

#### F-23 · TTFields yhdistää IF:n mitoosivaiheeseen

- **Lähteet:** reaaliaikainen solunjakautumistutkimus,
  [PMID 36078119](https://pubmed.ncbi.nlm.nih.gov/36078119/); taajuusmodulaatio,
  [PMID 37287008](https://pubmed.ncbi.nlm.nih.gov/37287008/).
- **[TUOTU, L3]** 100–300 kHz kentät pidentävät mitoosia ja sytokineesiä;
  optimaalinen vaste riippuu taajuudesta ja solutilasta.
- **Mallitäydennys:** `IF_MITOTIC_DISRUPTION` on biologisesti aktiivinen IF-haara,
  jonka vaikutus määräytyy solusyklin ja morfologian mukaan.
- **Raja:** terapeuttisen 1–3 V/cm paikalliskentän tulosta ei muunneta
  ympäristö-IF:n väestökertoimeksi.

### 4.8 Päivät–kuukaudet: luu, haava, kasvu, hormonit ja lisääntyminen

#### F-24 · Varhainen suora PEMF-luunparanemisankkuri

- **Lähde:** Bassett ym. 1974,
  [Science 184, 575–577](https://doi.org/10.1126/science.184.4136.575).
- **[TUOTU, L3]** Koiran osteotomian vastakkaisraajakontrollissa 65 Hz:n
  pulssiohjelma nopeutti korjausorganisaatiota ja lisäsi lujuutta 28 päivässä;
  eri 1 Hz pulssiohjelma ei ollut yhtä tehokas.
- **Mallitäydennys:** `BIOELECTRIC_DEVELOPMENT`/kudoskorjaus tarvitsee
  aaltomuoto- ja taajuusspesifisen siirron, ei yleistä PEMF-binääriä.

#### F-25 · Endogeeninen haavakenttä ohjaa solumigraation suuntaa

- **Lähde:** ihmisen keratinosyyttien elektrotaksis,
  [PMID 9804333](https://pubmed.ncbi.nlm.nih.gov/9804333/).
- **[TUOTU, L3]** Noin 100 mV/mm fysiologinen sähkökenttä ohjasi solujen
  katodista migraatiota. Ekstrasellulaarinen Ca²⁺ oli tarpeen; kasvutekijät
  muuttivat nopeutta enemmän kuin suuntaa.
- **Mallitäydennys:** hyvä siirtofunktion malli on
  `kenttä → suunta`, `biologinen/growth-factor-tila → gain`.

#### F-26 · PEMF × adenosiinireseptori

- **Lähde:** PEMF:n ja A2A/A3-reseptorien tutkimus,
  [PMID 23741498](https://pubmed.ncbi.nlm.nih.gov/23741498/).
- **[TUOTU, L3]** PEMF ja adenosiiniagonistit tuottivat yhteisvaikutuksia;
  reseptoriantagonistit poistivat vasteen testatussa järjestelmässä.
- **Mallitäydennys:** `GPCR_ADENOSINE` voidaan pitää aktiivisena
  reseptorikohtaisena mekanismipriorina. Se ei ole Lindgrenistä johdettu.

#### F-27 · Naaraan 27,12 MHz reproduktiovaste

- **Lähde:** Brown-Woodman ym. 1989,
  [PMID 2925391](https://pubmed.ncbi.nlm.nih.gov/2925391/).
- **[TUOTU, L3]** Viiden viikon toistuva altistus lyhytaaltodiatermialaitteen
  27,12 MHz kentälle vähensi rotilla pariutumisia ja hedelmöittymisiä.
- **Mallitäydennys:** sama kantoaaltoluokka kuin TheraBionicissa voi liittyä
  hyvin eri biologiseen vasteeseen, kun verhokäyrä, geometria, voimakkuus,
  elin ja biologinen tila vaihtuvat. Tämä tukee protokollaehtoisuutta, ei
  yhden taajuuden yhtä vaikutussuuntaa.

#### F-28 · Ihmisen diatermia-altistus ja keskenmeno

- **Lähde:** Ouellet-Hellstrom & Stewart 1993,
  [PMID 8237966](https://pubmed.ncbi.nlm.nih.gov/8237966/).
- **[TUOTU, L3]** 1 753 keskenmenoraskauden ja 1 753 kontrolliraskauden
  asetelmassa raportoitu mikroaaltodiatermian käyttö liittyi keskenmenoon
  OR 1,28 (95 % CI 1,02–1,59); ≥20 käyttökertaa/kk OR oli 1,59. Aiemman
  raskaudenmenetyksen vakioinnin jälkeen OR oli 1,26 (1,00–1,59).
  Lyhytaaltodiatermia ei liittynyt samaan tulokseen (OR 1,07).
- **Mallitäydennys:** G-11:n "raskauden menetys puuttuu kokonaan" on väärä
  kirjallisuutta koskevana lauseena. Modaalisuuskohtainen ero tukee sitä, että
  laiteluokka ja signaalirakenne on säilytettävä.
- **Raja:** altistus perustui raportoituihin käyttökertoihin, ei henkilökohtaiseen
  vektori-/dosimetriapaneeliin.

#### F-29 · Kiimakierron ja luteaalivaiheen ajoitus muuttuu ilman amplitudimuutosta

- **Lähde:** Rodriguez ym. 2003,
  [PMID 12654524](https://pubmed.ncbi.nlm.nih.gov/12654524/).
- **[TUOTU, L3]** 16 lehmän crossover-kokeessa 10 kV/m + 30 μT, 60 Hz,
  16 h/päivä pidensi kiimakierron 19,5 päivästä 21,3 päivään ja luteaalivaiheen
  15,4 päivästä 17,2 päivään. Progesteronikäyrän pinta-ala, amplitudi ja
  nousukulma eivät muuttuneet.
- **Laskelmat:**

  \[
  \Delta cycle=1.8\;d=9.23\%,
  \qquad
  \Delta luteal=1.8\;d=11.69\%.
  \]

- **Mallitäydennys:** `OVULATION_CLOCK` ja `HPA_HPG` tarvitsevat vaihe-/kesto-
  muuttujat. Hormonin keskiarvo tai AUC ei yksin kuvaa lisääntymisrytmiä.

#### F-30 · Ihmisen paikallinen rajapinta ja palautuva spermatogeneesi

- **Lähde:** Shafik 1992,
  [PMID 1623716](https://pubmed.ncbi.nlm.nih.gov/1623716/).
- **[TUOTU, L3]** 14 miehen polyesterislingitutkimuksessa azoospermia kehittyi
  keskimäärin 139,6 päivässä ja siittiöpitoisuus palautui lähtötasolle
  keskimäärin 156,6 päivässä käytön lopettamisen jälkeen. Viisi raskautta
  suunnitellutta paria sai raskauden.
- **Mallitäydennys:** `STATIC_TRIBO_INTERFACE → MALE_SPERM` saa palautumis-
  ja muistiaikavakion, ei pelkkää hetkellistä vastetta.
- **Raja:** lämpötilansäätely ja triboelektrinen kenttä muuttuivat yhdessä;
  raportoidut V/cm²-yksiköt eivät määritä puhdasta elinkenttää. Tutkimus ei
  eristä staattisen kentän kausaalista osuutta.

### 4.9 Kuukaudet–sukupolvet: lisääntymiskaari ja periytyvä tila

#### F-31 · RF → ihmisen siittiön mitoROS/DNA/motiliteetti

- **Lähde:** De Iuliis ym. 2009,
  [PMID 19649291](https://pubmed.ncbi.nlm.nih.gov/19649291/).
- **[TUOTU, L3]** 1,8 GHz altistusjärjestelmässä SAR:n kasvu liittyi
  mitoROS:iin, oksidatiiviseen DNA-vaurioon ja fragmentaatioon sekä motiliteetin
  ja vitaalisuuden laskuun.
- **Mallitäydennys:** `MALE_SPERM` sisältää vähintään erilliset redox-, DNA-,
  motiliteetti- ja vitaalisuuskomponentit; niitä ei pakata yhdeksi spermaindeksiksi.

#### F-32 · Paikallinen 4G → BTB-haara ja mekanistinen pelastusinterventio

- **Lähde:** Yu ym. 2020,
  [PMID 31514029](https://pubmed.ncbi.nlm.nih.gov/31514029/).
- **[TUOTU, L3]** Paikalliseen kivesaltistukseen liittyi viivästyneitä
  sperma-/lisääntymismuutoksia sekä Spock3–MMP2-veri-kivesestehaara;
  Spock3-inhibitio toimi mekanistisena interventiona.
- **Mallitäydennys:** `BARRIER_BTB` erotetaan akuutista `MALE_SPERM`-vasteesta
  ja sille annetaan oma viive.

#### F-33 · Melatoniini pelastusinterventiona

- **Lähde:** Meena ym. 2014,
  [DOI 10.3109/15368378.2013.781035](https://doi.org/10.3109/15368378.2013.781035).
- **[TUOTU, L3]** 2,45 GHz eläinprotokollassa melatoniini vaimensi
  redox-, testosteroni-, sperma- ja DNA-fragmentaatiomuutoksia.
- **Mallitäydennys:** `MELATONIN_REDOX` ei ole vain kellomarkkeri vaan
  interventionaalisesti informoitu redox-moderaattori tässä protokollassa.

#### F-34 · CatSper-haara on tärkeä mutta ei vielä suljettu

- **Nykyinen näyttö:** CatSper on siittiöspesifinen Ca²⁺-kanava ja välttämätön
  hyperaktivaatiolle ja hedelmöitykselle. Sivuston suora EMF–CatSper-väite
  nojaa pääosin ESHRE 2021 -konferenssiabstraktiin.
- **Mallitäydennys:** `MALE_SPERM`-solmuun lisätään ehdollinen
  `CATSPER_STATE`, mutta suora EMF → CatSper -nuoli pidetään `[AVOIN]`, kunnes
  vertaisarvioitu täysi tutkimus määrittää signaalin, dosimetrian ja intervention.
- **Aukon tila:** biologinen CatSper → hedelmöitys -linkki on vahva;
  kenttä → CatSper ei ole vielä vahvistettu samalla tasolla.

#### F-35 · Monisukupolvinen UMTS-raja

- **Lähde:** Sommer ym. 2009,
  [PMID 19138054](https://pubmed.ncbi.nlm.nih.gov/19138054/).
- **[TUOTU, L3; rajaava havainto]** C57BL-hiiriä altistettiin 1 966 MHz UMTS:lle
  0,08, 0,4 ja 1,3 W/kg koko elämän ajan neljän sukupolven yli. Tutkimus ei
  löytänyt haitallista vaikutusta hedelmällisyyteen tai kehitykseen.
- **Mallitäydennys:** krooninen UMTS-kantoaalto tässä geometriassa ja lajissa ei
  ollut yksin riittävä `ECOLOGICAL_TRAIT_STATE`- tai lisääntymispäätepisteen
  muuttamiseen. Tämä on tärkeä protokollaraja, ei syy asettaa kaikkia muita
  FieldStateja nollaksi.
- **Aukon tila:** suora F3-epigeneettinen EMF-periytyminen jää avoimeksi.

#### F-36 · Magras/Xenos ei ole puhdas F3-koe

- **Lähde:** Magras & Xenos 1997,
  [kokoteksti](https://avaate.org/IMG/pdf/magras_mice_study.pdf).
- **[TUOTU, L3; matala paino]** Antennipuiston ympärille sijoitettujen pienten
  hiiriryhmien syntyvyys väheni toistuvissa parituksissa.
- **Raja:** asetelma sisälsi vain noin 12 paria kenttäkohteissa, ei puhdasta
  sham-kontrollia eikä todellista erillisten F0–F3-sukupolvien geneettistä
  periytymistestiä. Sitä voidaan käyttää persistence-/toistosyklivihjeenä,
  ei todisteena transgenerationaalisesta epigeneettisestä periytymisestä.

### 4.10 Ihmisen vuorokausirytmi, melatoniini ja vaiheistus

#### F-37 · 10 Hz vaihtokenttä ja ihmisen vapaa vuorokausirytmi

- **Lähde:** Wever 1970,
  [PMID 11826883](https://pubmed.ncbi.nlm.nih.gov/11826883/).
- **[TUOTU, L3]** Maanalaisessa bunkerissa mitattiin 82 henkilön autonomisia
  rytmejä. Kenttäsuojatussa tilassa keskimääräinen jakso oli pidempi ja todellista
  sisäistä desynkronisaatiota esiintyi vain suojatussa huoneessa. Heikko 10 Hz
  vaihtosähkökenttä lyhensi jaksoa ja esti desynkronisaatiota; keinotekoiset
  vakiokentät eivät vaikuttaneet.
- **Mallitäydennys:** `MELATONIN_REDOX`/kellohaara ei ole yleinen
  "kenttä suppressioi" -lause. Oskilloiva 10 Hz rakenne ja kytkennän ajoitus
  ovat aktiivisia; staattinen kenttä ei ollut vastaava ärsyke.
- **Aukon tila:** ihmisen kenttä → vuorokausidynamiikka -ilmiöaukko poistuu.

#### F-38 · Vanha eläinpineaalinäyttö sisältää amplitudi- ja vaihesiirtymän

- **Lähteet:** Wilson ym. 1981,
  [PMID 7326058](https://pubmed.ncbi.nlm.nih.gov/7326058/); Reiter ym. 1988,
  [PMID 3374254](https://pubmed.ncbi.nlm.nih.gov/3374254/).
- **[TUOTU, L3]** Pitkä 60 Hz sähkökenttäaltistus vähensi yömelatoniinia ja
  muutti pineaalin entsyymi-/metaboliittirytmejä. Prenataali–postnataali-
  altistuksessa huippu pieneni ja siirtyi noin 1,4 tuntia.
- **Mallitäydennys:** melatoniinille tarvitaan vähintään amplitudi, vaihe,
  pinta-ala ja yksilönsisäinen stabiliteetti; yksi yöarvo ei riitä.
- **Raja:** korkeat eläinkokeiden E-kentät eivät anna ympäristöihmisen kerrointa.

#### F-39 · RF-altistuksen kellonaika muuttaa hormoni-/redox-vastetta

- **Lähde:** Cao ym. 2015,
  [PMID 25685954](https://pubmed.ncbi.nlm.nih.gov/25685954/).
- **[TUOTU, L3]** 1,8 GHz eläinaltistuksen melatoniini- ja
  antioksidanttivaste vaihteli kuuden vuorokaudenaikaisen altistusikkunan välillä.
- **Mallitäydennys:** `FIELDSTATE_VECTOR/ENVELOPE` liitetään
  `circadian_context`-muuttujaan ennen biologista aggregointia.

### 4.11 Ekologia: käyttäytyminen ennen kuolleisuutta

#### F-40 · Sähköinen kohtaaminen on oma reseptori- ja geometriakerros

- **Lähteet:** punkin staattinen kiinnittyminen,
  [Current Biology 2023](https://doi.org/10.1016/j.cub.2023.06.021);
  hämähäkin ballooning,
  [PMID 29983315](https://pubmed.ncbi.nlm.nih.gov/29983315/);
  kukkapunkin elektroreseptio,
  [PNAS 2025](https://doi.org/10.1073/pnas.2419214122).
- **[TUOTU, L3]** Eliöt voivat käyttää staattisia tai moduloituja sähkökenttiä
  ilmarakojen ylittämiseen, dispersaaliin tai isännän löytämiseen.
- **Mallitäydennys:** `ECOLOGICAL_ENCOUNTER` sisältää gradientin, polariteetin,
  morfologian, ilmarakon ja organismipinnan polarisoituvuuden.

#### F-41 · Mehiläisten toiminnallinen vaste voi näkyä ennen kuolleisuutta

- **Lähde:** Mallinson ym. 2025,
  [iScience](https://doi.org/10.1016/j.isci.2025.112550).
- **[TUOTU, L3]** Heikot 50 Hz AC- ja positiiviset DC-kentät vähensivät
  kukkalaskeutumisia; negatiivinen DC ei antanut samaa merkitsevää tulosta.
- **Mallitäydennys:** ekologinen ensimmäinen päätepiste on foraging/landing,
  ei populaatiokuolleisuus. Polariteetti ja aaltomuoto erotetaan.

#### F-42 · RF voi muuttaa selkärangattoman neuropeptidivastetta

- **Lähde:** Šofranková ym. 2023,
  [DOI 10.3390/pathogens12121398](https://doi.org/10.3390/pathogens12121398).
- **[TUOTU, L3]** 900 MHz polarisoitu RF muutti punkin neuropeptidi- ja
  reseptoritranskriptien tasoja sukupuoli-, intensiteetti- ja aikariippuvaisesti.
- **Mallitäydennys:** ekologinen käyttäytymisvaste voi sisältää hermostollisen
  välitilan ennen foraging-/attachment-päätepistettä.

### 4.12 Vanhemmat rajaavat ja ehdollisuutta tarkentavat tutkimukset

Näitä tutkimuksia ei käytetä mallin alavirran haarojen nollaamiseen. Niiden
arvo on siinä, että ne kaventavat vasteikkunaa ja estävät tekemästä
universaaleja suunta-, intensiteetti- tai lajioletuksia.

#### F-43 · Ihmisen laboratoriomelatoniini ei anna universaalia vastetta

- **Graham ym. 1996:** 33/40 miehen kaksoissokkoasetelmassa 10/200 mG
  intermittentin kiertävän kentän kokonaisryhmävaikutusta melatoniiniin ei
  havaittu; pienen matalan lähtömelatoniinin alaryhmän signaali ei replikoitunut.
  [PMID 8891185](https://pubmed.ncbi.nlm.nih.gov/8891185/)
- **Moniyökoe:** 28,3 μT altistus ei muuttanut ryhmätason melatoniinia, vaikka
  yksilönsisäinen yöstä yöhön -vakaus muuttui.
  [PMID 10626595](https://pubmed.ncbi.nlm.nih.gov/10626595/)
- **Sähköpeitteet:** 42 vapaaehtoisen kahdeksan viikon tutkimuksessa ei ollut
  yhtenäistä ryhmävaikutusta; yksilömuutoksia raportoitiin osalla erityisen
  blanket-rakenteen käyttäjistä.
  [PMID 2096195](https://pubmed.ncbi.nlm.nih.gov/2096195/)
- **Mallitäydennys:** melatoniinihaara kuvataan jakaumana
  \(p(\Delta M\mid protocol,baseline,person)\), ei deterministisenä
  universaalina suppressiona.

#### F-44 · Laji- ja lisääntymistila rajaavat pineaalituloksen siirtoa

- **Lammasraja:** voimajohtoasetelmassa ei havaittu melatoniini- tai
  puberteettivaikutusta.
  [Lee ym. 1993, PMID 8218652](https://pubmed.ncbi.nlm.nih.gov/8218652/)
- **Lehmän valoikkuna:** 10 kV/m + 30 μT -asetelmassa valoajan melatoniini oli
  alempi tai taipui alemmaksi, mutta pimeäjakso ei muuttunut vastaavasti.
  [PMID 15376244](https://pubmed.ncbi.nlm.nih.gov/15376244/)
- **Mallitäydennys:** `MELATONIN_REDOX` tarvitsee laji-, fotoperiodi- ja
  näytteenottoaikamuuttujat. Nollatulos väärässä aikaikkunassa ei estimoi koko
  vuorokausikäyrää.

#### F-45 · Endokriininen vaste riippuu kestosta ja episodisesta näytteenotosta

- **Free ym. 1981:** 30 päivän 60 Hz altistuksessa ei havaittu samoja
  hormonimuutoksia kuin 120 päivän asetelmassa; pidemmässä kokeessa yhden
  replikaatin FSH-, kortikosteroni- ja painomuutokset olivat vahvemmat kuin
  toisessa. Tutkimus nosti esiin episodisten hormonirytmien vaihe-erot.
  [PMID 6794577](https://pubmed.ncbi.nlm.nih.gov/6794577/)
- **Quinlan ym. 1985:** 1–3 tunnin 100 kV/m altistus ei muuttanut
  kortikosteronia, prolaktiinia tai TSH:ta; intermittentin kolmen tunnin
  protokollan yhteydessä kasvuhormoni muuttui.
  [PMID 3836679](https://pubmed.ncbi.nlm.nih.gov/3836679/)
- **Lymangrover ym. 1987:** eristetyn lisämunuaisen ACTH-vaste riippui
  kentän voimakkuudesta, altistushistoriasta ja on/off-jaksosta.
  [PMID 3034561](https://pubmed.ncbi.nlm.nih.gov/3034561/)
- **Mallitäydennys:** yhden hormonin yksi näyte korvataan pulssi-, vaihe-, AUC-,
  amplitudi- ja palautumisparametreilla.

#### F-46 · Akuutti ja krooninen lisääntymisvaste voivat poiketa

- **Margonato ym. 1982:** 50 Hz, 100 kV/m rottakokeessa akuutti ja krooninen
  altistus eivät tuottaneet samaa pariutumis-/fertiliteettikuvaa; jälkeläisten
  paino oli altistusryhmässä noin 10 % alempi.
  [PMID 7200792](https://pubmed.ncbi.nlm.nih.gov/7200792/)
- **Mallitäydennys:** `H`-altistushistoria sisältää adaptaation. Akuutin kokeen
  kerrointa ei ekstrapoloida lineaarisesti krooniseen tilaan.

#### F-47 · Staattinen ja 50 Hz kenttä voivat kohdistua eri kehityspäätepisteisiin

- **Mevissen ym. 1994:** raskaana olevien rottien 30 mT staattinen kenttä
  vähensi elävien sikiöiden määrää, kun saman suuruusluokan 50 Hz altistus
  lisäsi pieniä luustopoikkeavuuksia; molemmissa raportoitiin luutumismuutoksia.
  [PMID 7871487](https://pubmed.ncbi.nlm.nih.gov/7871487/)
- **Mallitäydennys:** DC/staattinen ja ELF eivät ole vaihdettavia
  `field_strength`-arvoja. Kenttäluokka voi muuttaa päätepisteen tyyppiä.

#### F-48 · Melatoniinimuutos ei ole yksin riittävä implantaatiotappioon

- **Huuskonen ym. 2000:** 13 tai 130 μT:n 50 Hz altistus raskauden alusta ei
  muuttanut keskimääräistä implantaatioiden määrää, vaikka yömelatoniini väheni
  noin 34–38 %.
  [PMID 11137378](https://pubmed.ncbi.nlm.nih.gov/11137378/)
- **Mallitäydennys:** `MELATONIN_REDOX → IMPLANTATION` ei ole yksikanavainen
  deterministinen nuoli. Implantaatio sisältää rinnakkaisia progesteroni-,
  tulehdus-, kohdun vastaanottavuus- ja alkionlaatuporrastuksia.

#### F-49 · MRI-komponenttien erottelu tukee monikanavaista painotusta

- **Lähde:** Prato ym. 1987,
  [PMID 3586876](https://pubmed.ncbi.nlm.nih.gov/3586876/).
- **[TUOTU, L3]** MRI-menettelyn aikariippuva magneettikenttä poisti
  morfiinianalgesian testatussa hiiriprotokollassa, RF-komponentti vähensi sitä
  ja 0,15 T staattinen komponentti ei yksin tuottanut havaittavaa vaikutusta.
- **Mallitäydennys:** samassa laiteympäristössä eri kanavien biologinen paino
  voi olla päätepistekohtaisesti erilainen. Tämä tukee kanavakomponenttien
  erottelua eikä yhtä kokonais-RMS-lukua.

#### F-50 · Ion cyclotron resonance on kandidaatti, ei suljettu mekanismi

- **Kaksoissokkorajat:** Prasad ym. ja Parkinson ym. eivät löytäneet
  ennustettua Ca²⁺-muutosta ICR-ehdoissa.
  [PMID 1961917](https://pubmed.ncbi.nlm.nih.gov/1961917/),
  [PMID 8451278](https://pubmed.ncbi.nlm.nih.gov/8451278/)
- **Myöhempi positiivinen solutulos:** Ca-ICR-ehto lisäsi rustosolumallissa
  GAG-/kollageeni-II-tuottoa ja SOX9/COL2A1/ACAN-ilmentymistä, kun kaikki muut
  PEMF-ehdot eivät tehneet samaa.
  [PMID 30793837](https://pubmed.ncbi.nlm.nih.gov/30793837/)
- **Mallitäydennys:** ICR voidaan säilyttää vaihtoehtoisena resonanssialimallina,
  mutta sitä ei merkitä vakiintuneeksi L2-sillaksi.

#### F-51 · Historiallinen millimetriaaltoikkuna on heikko, lämpörajattu vihje

- **Grundler & Keilmann 1978:** hiivan kasvu muuttui kapeissa noin 42 GHz
  taajuusikkunoissa sekä ylös- että alaspäin.
  [PMID 149448](https://pubmed.ncbi.nlm.nih.gov/149448/)
- **Rajaava tutkimus:** Dardalhon ym. 1985 selitti omat 9,4/17 GHz hiivatuloksensa
  termisesti vastaaviksi.
  [PMID 3905665](https://pubmed.ncbi.nlm.nih.gov/3905665/)
- **Mallitäydennys:** historiallinen kapeaikkunaisuus voidaan säilyttää
  matalapainoisena taajuusvihjeenä, ei BERM:n ydintodisteena.

#### F-52 · Suoran kenttä × lääke -näytön eläin–ihmisiirto ei ole automaattinen

- **Eläin:** useat L-tyypin Ca-salpaajat muuttivat morfiini- ja
  kenttä–morfiinivastetta.
- **Ihminen:** pienessä kaksoissokossa yhdeksän vapaaehtoisen tutkimuksessa
  diltiazem, nimodipiini tai verapamiili ei merkitsevästi muuttanut
  morfiinianalgesiaa.
  [PMID 9296421](https://pubmed.ncbi.nlm.nih.gov/9296421/)
- **Mallitäydennys:** `species × drug dose × receptor distribution` pidetään
  eksplisiittisenä siirtoterminä. Tämä ei poista hiiren kenttäinteraktiota,
  mutta estää sen suoran annosriippumattoman siirron ihmiseen.

---

## 5. Empiirisesti vahvistuvat vuorovaikutusakselit

| Vuorovaikutusakseli | Suora havainto | BERM-malliin lisättävä rakenne |
|---|---|---|
| Tausta × taajuus | Blackman 1985 | \(W(f\mid B_0)\) |
| Tausta × RF-kulma | Ritz 2004; Usselman 2016 | \(W(f,\theta,B_0)\) |
| Polarisaatio/kolmivaihe × kesto | Burch 2000 | \(W(\Pi,t_{exp})\) |
| Pulssin nousuaika × kehitysvaihe | Ubeda/Berman | \(W(t_{rise},d_{dev})\) |
| Koherenssi × soluvaste | Litovitz 1991 | \(W(\tau_{coh})\) |
| Kenttävaihe × metabolinen vaihe | Rosenspire 2005 | \(W(\phi_f-\phi_{met})\) |
| Kenttä × vuorokausivaihe | Cao 2015; Kavaliers | \(W(\phi_{circ})\) |
| Kenttä × agonisti/reseptoritila | Lymangrover; Kavaliers | \(F(z;q_{agonist},q_{receptor})\) |
| ELF × lyijy | Liu 2002 | \(F(z;q_{metal},q_{redox})\) |
| Valo × magneettinen kenttä | Iversen 2024 | mitattu \(\mathcal I^{add}>0\) |
| Kantoaalto × AM-verhokäyrä × Cav3.2 | Jimenez 2019 | RF:n hierarkkinen signaalikuvaus |
| IF-taajuusohjelma × mitoositila | TTFields | \(W(f\mid cell\ cycle,size)\) |

Tästä seuraa kolme mallipäivitystä:

1. Kanavapainot ovat **tila- ja elinkohtainen matriisi**, eivät kolme globaalia
   vakioarvoa.
2. Yhteisvaikutuksen etumerkki on empiirisesti avoin ennen vaiheen,
   polarisaation ja biologisen tilan huomioimista.
3. Heikko yksittäiskanavainen vaste ei rajaa pois vahvaa yhdistelmävastetta,
   mutta vahvaa yhdistelmävastetta ei saa olettaa ilman mitattua tai rajattua
   ristitermiä.

---

## 6. Nykyisen G-1–G-20-aukkorekisterin uusi tulkinta

| Aukko | Kirjallisuustila tämän synteesin jälkeen | Repo-/mallitila | Päätös |
|---|---|---|---|
| G-1 ASFR-perustaso | UN WPP 2024 käytössä | suljettu; 0,39 % keskim. jäännös | **SULJETTU** |
| G-2 henkilöaltistus | Burch 2000 osoittaa henkilökohtaisen ELF+valo+hormoni-mittauksen | ei ikä×sukupuoli×maa×vuosi monikanavapaneelia | **NIMEÄ UUDELLEEN, EI SULJE REPOA** |
| G-3 kenttä + biologinen paneeli | Burch, TheraBionic ja useat laite-/laboratoriotutkimukset antavat rajattuja samanaikaisia paneeleja | ei ympäristö-ELF+IF+RF-vektoria ja reproduktiopaneelia | **KAVENNETTU** |
| G-4 parity/ajoitus | kirjallisuutta ja avoimia tietokantoja on | ei integroitua parity-taulukkoa | **AVOIN DATA-AUKKO** |
| G-5 koirasentinelli | yksi laitos ja digitoitu sarja | ei monialueista paneelia | **AVOIN** |
| G-6 karja/karju | julkaisutason pitkiä sarjoja on | rivi-/asema-aineisto ja RF puuttuvat | **AVOIN** |
| G-7 ihmisen spermasarja | yksittäisiä ihmistutkimuksia paljon | Levine-maasarja rekonstruoitu | **AVOIN KALIBROINTI** |
| G-8 alakansallinen altistus+hedelmällisyys | lähteitä on erillään | ei yhteistä avainta/paneelia | **AVOIN** |
| G-9 kysyntä | demografisia lähteitä on | nykyinen staattinen skalaari | **AVOIN** |
| G-10 ART | CDC/ESHRE/HFEA-aineistoja on olemassa | ei `art_outcomes_age_year`-kerrosta | **EI KIRJALLISUUSAUKKO; AVOIN INTEGRAATIO** |
| G-11 TTP/raskauden menetys | Ouellet-Hellstrom ja diatermiakirjallisuus osoittavat, ettei aihe puutu | ei mallin havaintokerrosta | **NIMEÄ UUDELLEEN** |
| G-12 väestötiheys | GHSL/World Bank saatavissa | ei vuosiulottuvuutta mallissa | **AVOIN DATA-AUKKO** |
| G-13 ravitsemusprofiilit | lähteitä on | 47/57 oletuksella | **AVOIN** |
| G-14 maahanmuuton rakenne | lähteitä on | ikä/sukupolvi puuttuu | **AVOIN** |
| G-15 teknologiasukupolvet | kaupallisia/avoimia lähteitä osittain | käsin kirjoitettu ajoitusproxy | **AVOIN** |
| G-16 epävarmuusvälit | osassa lähteitä aidot CI:t | mallisyötteissä puuttuvat | **AVOIN** |
| G-17 ITU-lukija | ei kirjallisuuskysymys | tekninen avoin aukko | **AVOIN** |
| G-18 urbanisaatio | aineisto jo prosessoitu | ei lueta malliin | **AVOIN INTEGRAATIO** |
| G-19 lajitaulukot | ei kirjallisuuskysymys | kaksi ristiriitaista lähdettä | **AVOIN** |
| G-20 mehiläiskovariaatit | käyttäytymis- ja elektroreseptioevidenssiä on | ei ajallisesti kohdistettua Varroa/patogeeni/pestisidi/sää/RF-paneelia | **ILMIÖ EI AVOIN; PANEELI AVOIN** |

### G-1-laskelman merkitys

Vanhan ASFR-taulukon keskimääräinen poikkeama TFR-identiteetistä oli 30,8 %.
UN WPP -integraation jälkeen jäännös oli 0,39 %:

\[
\frac{30.8}{0.39}\approx79.0.
\]

Tilinpidollinen yhteensopivuus parani siis noin 79-kertaiseksi. Tämä sulkee
demografisen identiteettiaukon, ei biologista FieldState → ASFR -kerrointa.

---

## 7. Kausaalikaavion solmukohtainen päivitys

| Solmu | Uusi tila | Peruste |
|---|---|---|
| `FIELDSTATE_VECTOR` | aktiivinen vahva rakennepriori | Blackman, Ritz, Usselman, Burch, Chae |
| `FIELDSTATE_ENVELOPE` | aktiivinen ehdollinen vasteperhe | Blackman, Litovitz, Rosenspire, TTFields, TheraBionic |
| `STATIC_TRIBO_INTERFACE` | rajattu pitkäviiveinen kandidaatti | Shafik; lämpö sekoittuu |
| `FIELDSTATE_LOW_FREQUENCY_ELECTRIC` | aktiivinen suunta-/aaltomuotoprior | Wever, elektrotaksis, Mallinson |
| `BERM_L2_BRIDGE` | edelleen avoin | ei gauge-invarianttia biologista operaattoria |
| `A_VGCC_ROS` | aktiivinen L3-realisaatio | Ca-interventiot, De Iuliis, Rosenspire |
| `B_RPM_CRY` | aktiivinen L3-realisaatio | Ritz, Usselman, Sherrard, Burd |
| `MELATONIN_REDOX` | ehdollinen amplitudi-/vaihe-/rescue-haara | Wilson, Reiter, Burch, Cao, Meena |
| `VMEM_MTOR` | taajuus-/solutilariippuvainen L3-haara | Zandieh, kudoskorjaus |
| `BIOELECTRIC_DEVELOPMENT` | pulssimuoto × vaihe × genotyyppi | Ubeda/Berman, Bassett |
| `HPA_HPG` | agonisti- ja rytmiportitettu gain | Lymangrover, karjakoe |
| `MICROBIOME_OT` | edelleen koostettu | ei tässä tunnistettua suoraa kenttä × mikrobiomi × OXT -ketjua |
| `BARRIER_BBB` | redox/tight-junction-haara aktiivinen | suorat este- ja ROS-tutkimukset; elinsiirto avoin |
| `BARRIER_BTB` | viiveellinen aktiivinen elinhaara | Yu/Spock3-MMP2; oksidatiivinen BTB-kirjallisuus |
| `BARRIER_PLACENTA` | rakenteellinen, kalibroimaton | diatermia/keskenmeno ei mittaa suoraan istukkasiirtoa |
| `BARRIER_RETINA` | rakenteellinen, kalibroimaton | ei tässä uutta sulkevaa tutkimusta |
| `MALE_SPERM` | usean päätepisteen protokollapriori | De Iuliis, Meena, Yu, Shafik |
| `MALE_GERMLINE_RESERVE` | pitkäviiveinen kandidaatti | spermatogeneesi-/prenataalikokeet; ihmiskerroin avoin |
| `MALE_STEROIDOGENESIS` | redox + HPG + paikallinen elinhaara | Meena ja muut eläintutkimukset |
| `OVARIAN_RESERVE` | aktiivinen eläinendpoint-priori | Ahmadi, Calis, Yousefi |
| `OOCYTE_REDOX` | aktiivinen downstream-priori | melatoniini-/mitokondriokokeet |
| `OVULATION_CLOCK` | vaiheistus vahvistuu | Bmal1-eläinnäyttö, lehmän kiimakierto |
| `IMPLANTATION` | downstream-linkki vahva, kenttälinkki koostettu | ovarian Bmal1; keskenmenoevidenssi |
| `COUPLE_FECUNDABILITY` | miehen ja naisen haarat olemassa, yhteisjakauma avoin | sperm + female fertility + miscarriage |
| `IF_MITOTIC_DISRUPTION` | vahva laite-/soluprotokollapriori | TTFields |
| `GPCR_ADENOSINE` | farmakologisesti aktiivinen L3-haara | agonisti/antagonisti-interventiot |
| `VAGUS_ANTIINFLAMMATORY` | laitebiologinen mutta ei ympäristökerroin | VNS-laitteet |
| `ECOLOGICAL_ENCOUNTER` | vahva lajikohtainen endpoint-priori | punkki, mehiläinen, hämähäkki, kukkapunkki |
| `ECOLOGICAL_SELECTION` | avoin pitkä paneeli | käyttäytymisvaikutus ei vielä osoita fitness-siirtymää |
| `ECOLOGICAL_TRAIT_STATE` | avoin F3/common-garden | UMTS-raja; Magras ei riittävä |
| `DEMAND_OPPORTUNITY` | avoin havaintokerros | ei biologisen evidenssin korvattavissa |
| `TEMPO` | avoin, mutta karjakoe osoittaa biologisen timing-muodon | parity/HFD-data puuttuu |
| `ART_LIVE_BIRTH_DELIVERY` | avoin integraatio | data on saatavissa mutta ei mallissa |
| `ASFR` | havaittu WPP-ankkuri | identiteetti korjattu |
| `TFR` | havaittu aggregaatti | ei saa kalibroida upstream-biologiaa takaperin |

---

## 8. Evidenssin vahvuusjärjestys BERM-synteesissä

Sivuston farmakologia- ja laiteaineisto kannattaa painottaa seuraavasti:

1. **Sama altistus + sama biologinen päätepiste + kohdennettu interventio.**  
   Esimerkit: Cav3.2-knockdown TheraBionicissa; EGTA/ionofori/kalsiumsalpaajat
   kenttä–morfiinivasteessa; Spock3-inhibitio BTB-haarassa; melatoniinirescue.
2. **Sama järjestelmä, yksittäiset ja yhdistetyt kanavat.**  
   Esimerkki: valo, magneettikenttä ja COMS yhdessä.
3. **Kontrolloitu FieldState-ominaisuuden muutos.**  
   Esimerkit: kulma, B0, polarisaatio, pulssin nousuaika, koherenssiaika,
   metabolinen vaihe.
4. **Kontrolloitu elin-/lisääntymispäätepiste.**  
   Esimerkit: lehmäkierto, rottien 27,12 MHz hedelmällisyys, siittiö- ja
   munasarjakokeet.
5. **Ihmisen observational/occupational-signaali.**  
   Esimerkit: Burch, Ouellet-Hellstrom. Näitä käytetään kuvailevana
   allekirjoituspriorina, ei fysikaalisen annoksen korvikkeena.
6. **Eri tutkimuksista koottu biologinen analogia.**  
   Esimerkiksi lääke auttaa sairauteen ja vaikuttaa Ca²⁺-reittiin. Tämä on
   mekanistinen yhteensopivuus, ei suora EMF-farmakologinen koe.

Tämän vuoksi yleiset lääkeanalogiat — litium, semaglutidi, psilosybiini,
rilutsoli, gabapentinoidit tai nifedipiinin kliininen käyttö — eivät saa samaa
todistuspainoa kuin kokeet, joissa lääke muuttaa nimenomaan kenttäaltistuksen
vasteen samassa protokollassa.

---

## 9. Sivuston väitteet, jotka voidaan nyt täsmentää

### 9.1 “Confirmed” on jaettava neljään luokkaan

Nykyisillä sivuilla useat ketjut on merkitty vahvistetuiksi, vaikka niiden
nuolet ovat peräisin eri tutkimuksista. Käytetään jatkossa:

- `DIRECT_SAME_PROTOCOL`: sama altistus, välitila ja päätepiste;
- `DIRECT_COMPONENT`: suora näyttö yhdestä nuolesta;
- `COMPOSED_CONVERGENCE`: eri tutkimuksista koottu end-to-end-inferenssi;
- `OPEN_L2`: geometria–biologia-kytkentä puuttuu.

### 9.2 TheraBionic

- FDA HDE -päivä on 26.9.2023, ei 2019.
- 14/41 = 34,1 % tarkoittaa yli kuusi kuukautta stabiilina pysynyttä tautia.
- 33,9 % historiallisvertailun mediaaniero ei ole sama kuin RCT:n osoittama
  elinajan kausaalinen pidentyminen.
- Vahvin BERM-arvo on carrier × envelope × channel × organ-transfer -rakenne
  sekä Ca-kanavasalpaajien vasta-aihe.

### 9.3 Pineaalinen tulkinta

Muoto "pineaalirauhanen näkee kentän valona" on liian karkea. Kirjallisuuden
paremmin rajaama muoto on:

> Tietyt kenttäprotokollat muuttavat pineaalisen/kellollisen järjestelmän
> amplitudia, vaihetta tai vakautta tausta-, aaltomuoto-, kesto- ja
> vuorokausiehtoisesti.

### 9.4 Epigeneettinen perintö

Suorat EMF:n DNA-metylaatio-, histoni- tai miRNA-muutokset tukevat mahdollista
muistimekanismia. Kemikaalien F3-mallit osoittavat biologisen toteutettavuuden,
mutta eivät sulje EMF:n F3-nuolta. Sivun F3-väite pidetään
`COMPOSED_CONVERGENCE / OPEN_DIRECT_EMF_F3` -tilassa.

### 9.5 CatSper

CatSperin biologinen välttämättömyys ei tee EMF → CatSper -nuolesta suoraa.
Konferenssiabstrakti on kandidaattituki; täysi vertaisarvioitu altistus- ja
kanavainterventiotutkimus puuttuu.

### 9.6 Laitteet ja ympäristö

Lääkinnällinen laite osoittaa biologisen vaikutuksen määritellyllä
signaalilla, geometrialla ja annostelulla. Se on vahva kanavan olemassaolo- ja
parametriankkuri. Se ei yksin määritä ympäristökentän elinkohtaista annosta tai
väestökerrointa.

---

## 10. Mitkä aukot voidaan poistaa nyt ilman uusia kokeita

Seuraavat muutokset vaativat vain nykyisen kirjallisuuden kuratoinnin ja
repositoriointegraation:

1. **Poista väite, ettei ihmisen kenttä–vuorokausirytmistä ole suoraa näyttöä.**
   Lisää Wever 1968/1970/1973 omaksi rajatuksi tietueperheeksi.
2. **Muuta G-2:n nimi.** Uusi muoto:
   `G-2 · Monikanavaista henkilökohtaista FieldState–reproduktiopaneelia ei ole`.
3. **Muuta G-11:n nimi.** Uusi muoto:
   `G-11 · TTP-, keskenmeno- ja kohtukuolema-aineistoa ei ole integroitu malliin`.
4. **Lisää suora heavy-metal co-exposure -haara.** Liu 2002 erotetaan
   mekanistisista Cd/Pb-analogioista.
5. **Lisää `PHASE_GATING` ja `COHERENCE_TIME` FieldState-skeemaan.**
   Rosenspire ja Litovitz ovat lähdeankkurit.
6. **Lisää `AGONIST_STATE` ja `RECEPTOR_SUBTYPE` biologiseen tilaan.**
   Lymangrover ja Kavaliers ovat lähdeankkurit.
7. **Lisää kehitysvaiheen pulssimuotoikkuna.** Ubeda/Berman muodostavat
   monilaboratorisen evidenssiperheen.
8. **Lisää ihmisen neural-timing/EEG-haara.** Reato toimii L3-verkkoankkurina,
   Ghione OBS-HUMAN-ankkurina.
9. **Lisää vanha Bassett 1974 suoraksi laitehistorian alkuankkuriksi.**
10. **Erottele TheraBionicin kolme lukua:** FDA-päivä, 14/41 stable disease ja
    historiallisvertailun mediaanielinaika.

---

## 11. Aidosti avoimeksi jäävät päätodistusaukot

1. **Gauge-invariantti tai fysikaalisesti gauge-valittu biologinen havaittava.**
2. **Dimensioasteikko** esimerkiksi \(g=\eta+\kappa A\otimes A\), jonka \(\kappa\)
   on operationalisoitu biologista käyttöä varten.
3. **Biologisen \(A_{0,\mu}\):n määritelmä** ja sen erottaminen tavallisista
   endogeenisistä sähkökentistä ja potentiaaleista.
4. **Eksplisiittinen \(K_r^{\mu\nu}\)** tai muu L2-operaattori.
5. **Geometria → luonnollinen RPM/CRY** -kytkentä.
6. **Luonnollinen CRY → ihmisen endokriininen rytmi → ovulaatio/implantaatio**
   päästä päähän samassa ihmisjärjestelmässä.
7. **Vertaisarvioitu suora EMF → CatSper** -interventioketju.
8. **Ympäristön ELF+IF+RF-yhdistelmä** mitattuna vektori-, vaihe-, polarisaatio-
   ja verhokäyrätasolla samassa lisääntymispaneelissa.
9. **Suora heavy metal × EMF → lisääntymis-/PGC-endpoint**.
10. **EMF:n F3-periytyminen** asianmukaisella sukupolvi- ja common-garden-
    erottelulla jo olemassa olevassa kirjallisuudessa; tässä haussa sellaista
    sulkevaa tutkimusta ei tunnistettu.
11. **Laji–elin–reseptorisiirto** eläin-, solu- ja ihmisjärjestelmien välillä.
12. **FieldState → endpoint → ASFR/TFR -numeraalinen kerroin.**

Nämä aukot eivät poista alavirran evidenssin arvoa. Ne määrittävät, missä
kohdassa synteesi on `[EMERGENTTI]` eikä `[JOHDETTU]`.

---

## 12. Nykyisten 33 rajatun evidenssitietueen asema

Nykyiset tietueet säilytetään aktiivisina rajoitteina, mutta niiden roolit
pidetään erillään:

### FieldState-allekirjoitus

- `BLACKMAN_1985_BACKGROUND_FREQUENCY`
- `RITZ_2004_VECTOR_ANGLE`
- `USSELMAN_2016_ORIENTATION_ROS`
- `MAJEWSKA_2025_CRY4A_MEMBRANE`
- `ZANDIEH_2025_MITO_RESONANCE`
- `SHERRARD_2018_CRY_ROS`
- `CAO_2015_RF_CIRCADIAN_REDOX`

### Lisääntymis- ja estepäätepisteet

- `DE_IULIIS_2009_HUMAN_SPERM`
- `YU_2020_LOCAL_4G_BTB`
- `MEENA_2014_MELATONIN_RESCUE`
- `AHMADI_2016_OVARIAN_FOLLICLES`
- `CALIS_2021_PRENATAL_OVARIAN_RESERVE`
- `YOUSEFI_2025_NEONATAL_OOGENESIS`
- `BALDINI_2025_ART_LAB_SPERM`
- `IOLCHIEV_2019_GEOMAGNETIC_BULL_SEMEN`

### Alavirran mekanismit ilman omaa EMF-altistusta

- `LOCHHEAD_2010_ROS_BBB`
- `CHAKRABORTY_2020_OXIDATIVE_BTB`
- `LIU_2014_OVARIAN_CLOCK_IMPLANTATION`
- `HE_2016_OOCYTE_MELATONIN`

Nämä eivät saa muuttua suoraksi kenttä → endpoint -evidenssiksi.

### Katsaukset ja rajoitteet

- `CORDELLI_2024_MALE_FERTILITY_REVIEW`
- `CORDELLI_2025_CORRIGENDUM`
- `NADERI_2026_RODENT_SYSTEMATIC_REVIEW`

Katsauksen primäärilähteitä ei painoteta uudelleen erillisinä riippumattomina
tutkimuksina ilman riippuvuuksien huomiointia.

### Staattinen/triboelektrinen rajapinta

- `SHAFIK_1992_HUMAN_TEXTILE_SURFACE_READING`
- `SHAFIK_1992_HUMAN_POLYESTER_SLING`
- `DINCMEN_2016_PET_ANTISTATIC_DECAY`

### Ekologinen kohtaaminen

- `ENGLAND_2023_TICK_STATIC_ATTACHMENT`
- `COLIN_1992_VARROA_ELECTRICAL_CHARGES`
- `MALLINSON_2025_HONEYBEE_EFIELD_FORAGING`
- `GARCIA_ROBLEDO_2025_FLOWER_MITE_ELECTRORECEPTION`
- `SOFRANKOVA_2023_TICK_RF_NEUROPEPTIDE`
- `MORLEY_2018_SPIDER_EFIELD_BALLOONING`

### Kuvaileva populaatio-/sisäinen analyysi

- `WPP_WB_BERM_COHORT_ASFR_2026`: ajoitusproxy, ei FieldState-annos.
- `NIKE_BBS_2026_PEAK_FIELD_GRADIENT`: sisäinen skenaariolaskelma, ei
  Lindgren-spesifinen empiirinen vahvistus. Nykyisiä 45/25/15 % pathway-painoja
  tai sigmoidikynnyksiä ei pidä käyttää aktiivisena evidenssinä ennen
  eksplisiittistä L2-johtoa ja lähdekalibrointia.

---

## 13. Lopullinen mallikuva

Kirjallisuuden perusteella BERM:n seuraava versio kannattaa kirjoittaa
seuraavana kerrostettuna järjestelmänä:

\[
\begin{aligned}
&\textbf{L0:}\quad g=\eta+\kappa A\otimes A,\\
&\textbf{L1:}\quad A=A_0+\sum_i a_i
\Rightarrow \Delta g=\kappa\!\left[
\sum_i\operatorname{Sym}(A_0\otimes a_i)
+\sum_i a_i\otimes a_i
+\sum_{i<j}\operatorname{Sym}(a_i\otimes a_j)\right],\\
&\textbf{L2:}\quad z_r=K_r[B_0,\theta,\Pi,PSD,\tau_{coh},\phi,H,T_{organ}]
:\Delta g,\\
&\textbf{L3 / MECHANISM:}\quad z_r\rightarrow
\{RPM/CRY,VGCC,Ca^{2+},ROS/NO,V_{mem},GPCR,kello,esteet\},\\
&\textbf{L3 / OBSERVATION:}\quad
\{spike\ timing,EEG,geenit,proliferaatio,apoptoosi,
hormonirytmi,gametit,implantaatio,käyttäytyminen\},\\
&\textbf{Aggregaatio:}\quad
R_{male}\times R_{female}\times R_{implantation}
\rightarrow \Phi_{couple},\\
&\qquad \Phi_{couple}\times Demand\times Tempo\times ART
\rightarrow ASFR\rightarrow TFR.
\end{aligned}
\]

Tämän synteesin jälkeen vahvin empiirinen väite on:

> Olemassa oleva tutkimus tukee monilla toisistaan riippumattomilla
> järjestelmillä tausta-, kulma-, polarisaatio-, taajuusikkuna-, koherenssi-,
> vaihe-, kehitystila-, reseptori-, redox- ja altistushistoriariippuvaista
> sähkömagneettista biologista vastetta. Se tukee myös sitä, että kahden
> kanavan yhteisvaikutus voi olla supra-additiivinen. Nämä havainnot kaventavat
> BERM:n mahdollisen L2-kytkennän muotoa ja vahvistavat useita L3-haaroja.
> Ne eivät vielä yksilöi Lindgrenin geometriaa eivätkä anna väestötason
> hedelmällisyyskerrointa.

---

## 14. Keskeiset lähteet

### Lindgren ja BERM:n L0

- Lindgren & Liukkonen 2021. [DOI](https://doi.org/10.1088/1742-6596/1956/1/012017)
- Lindgren, Kovacs & Liukkonen 2025. [DOI](https://doi.org/10.1088/1742-6596/2987/1/012001)

### Vektori, vaihe, koherenssi ja ikkunat

- Wever 1970. [PMID 11826883](https://pubmed.ncbi.nlm.nih.gov/11826883/)
- Bawin & Adey 1976. [PMID 1064869](https://pubmed.ncbi.nlm.nih.gov/1064869/)
- Blackman ym. 1980. [PMID 7284026](https://pubmed.ncbi.nlm.nih.gov/7284026/)
- Blackman ym. 1985. [DOI](https://doi.org/10.1002/bem.2250060402)
- Litovitz ym. 1991. [PMID 1872866](https://pubmed.ncbi.nlm.nih.gov/1872866/)
- Rosenspire ym. 2005. [PMID 15749780](https://pubmed.ncbi.nlm.nih.gov/15749780/)
- Burch ym. 2000. [PMID 10693073](https://pubmed.ncbi.nlm.nih.gov/10693073/)

### Kehitys, hermosto ja endokriininen tila

- Ubeda ym. 1983. [PMID 6654743](https://pubmed.ncbi.nlm.nih.gov/6654743/)
- Berman ym. 1990. [PMID 2242052](https://pubmed.ncbi.nlm.nih.gov/2242052/)
- Lymangrover ym. 1983. [PMID 6298545](https://pubmed.ncbi.nlm.nih.gov/6298545/)
- Reato ym. 2010. [PMID 21068312](https://pubmed.ncbi.nlm.nih.gov/21068312/)
- Ghione ym. 2005. [PMID 15911132](https://pubmed.ncbi.nlm.nih.gov/15911132/)
- Rodriguez ym. 2003. [PMID 12654524](https://pubmed.ncbi.nlm.nih.gov/12654524/)

### Farmakologia, metallit ja laitteet

- Kavaliers & Ossenkopp 1986. [PMID 3091191](https://pubmed.ncbi.nlm.nih.gov/3091191/)
- Kavaliers & Ossenkopp 1987. [PMID 2446152](https://pubmed.ncbi.nlm.nih.gov/2446152/)
- Hinkle ym. 1987. [PMID 2445745](https://pubmed.ncbi.nlm.nih.gov/2445745/)
- Liu ym. 2002. [PMID 14694649](https://pubmed.ncbi.nlm.nih.gov/14694649/)
- Bassett ym. 1974. [DOI](https://doi.org/10.1126/science.184.4136.575)
- Jimenez ym. 2019. [PMID 31160272](https://pubmed.ncbi.nlm.nih.gov/31160272/)
- Iversen ym. 2024. [PMID 39061719](https://pubmed.ncbi.nlm.nih.gov/39061719/)
- Burd ym. 2026. [PMID 41851455](https://pubmed.ncbi.nlm.nih.gov/41851455/)

### Lisääntyminen ja monisukupolvirajat

- Brown-Woodman ym. 1989. [PMID 2925391](https://pubmed.ncbi.nlm.nih.gov/2925391/)
- Ouellet-Hellstrom & Stewart 1993. [PMID 8237966](https://pubmed.ncbi.nlm.nih.gov/8237966/)
- Shafik 1992. [PMID 1623716](https://pubmed.ncbi.nlm.nih.gov/1623716/)
- De Iuliis ym. 2009. [PMID 19649291](https://pubmed.ncbi.nlm.nih.gov/19649291/)
- Sommer ym. 2009. [PMID 19138054](https://pubmed.ncbi.nlm.nih.gov/19138054/)

### Sivuston sisäiset lähteet

- [Evidenssirekisteri](https://www.extinctionfield.com/fi/evidence)
- [Farmakologinen evidenssi](https://www.extinctionfield.com/fi/evidence/pharmacology)
- [Lääkinnälliset laitteet](https://www.extinctionfield.com/fi/evidence/devices)
- [Sirkadiaaninen evidenssi](https://www.extinctionfield.com/fi/evidence/circadian)
- [Raskasmetalli × EMF](https://www.extinctionfield.com/fi/evidence/heavy-metal-synergy)
- [Replikaatio ja parametri-ikkunat](https://www.extinctionfield.com/fi/evidence/replication)

---

## 15. Tarkastetun sivustokorpuksen kattavuus

Seuraavat temaattiset evidenssisivut kuuluivat inventaarioon. Luettelo ei
tarkoita, että jokainen sivun end-to-end-väite olisi suoraa näyttöä; niiden
sisältämät lähteet sijoitettiin tässä raportissa todellisen L0–L3-tasonsa
mukaan.

### Fysiikka, FieldState ja teknologia

- `superposition`
- `technology`
- `lighting`
- `historical-convergence`
- `replication`
- `magnetoreception`
- `heliobiology`
- `space-weather-biology`
- `iss-hypomagnetic`
- `laschamp-reversal`
- `timothy-experiment`

### Farmakologia ja laitteet

- `pharmacology`
- `devices`
- `natural-modulators`
- `vitamin-d-channel-blocker`

### Solu-, este- ja systeemibiologia

- `cascades`
- `bbb`
- `gut-brain-axis`
- `heavy-metal-synergy`
- `circadian`
- `hidden-thyroid`
- `allergy-epidemic`

### Neurobiologia ja käyttäytyminen

- `neurological-spectrum`
- `chronic-pain`
- `autism-prototype`
- `adhd-prototype`
- `four-neurodegenerations`
- `infant-vulnerability`

### Lisääntyminen ja endokrinologia

- `reproductive-arc`
- `reproductive-navigation`
- `testosterone`
- `walker-chain`
- `epigenetic-legacy`
- `triple-strikes`

### Ekologia, ravitsemus ja populaatiot

- `ecology`
- `eyes`
- `nutrition`
- `evolution`
- `amish-control`
- `populations`
- `epidemiology`

### Synteesit ja epistemologia

- evidenssirekisterin juurisivu
- `unbroken-chain`
- `counter-evidence`
- `klimentidis-explained`

Korpus sisältää yhteensä 45 `page.tsx`-sivua juurisivu mukaan lukien. Tämän
raportin tutkimuslöydöt kohdistettiin ensisijaisesti sivuihin, joissa voitiin
poistaa tai kaventaa täsmällinen malliaukko; muut sivut säilyvät konteksti- tai
synteesitasolla.
