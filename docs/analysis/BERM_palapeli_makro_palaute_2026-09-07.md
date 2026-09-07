# BERM-palapeli: ympäristöpalaute, verkkojen uusiutuminen ja sukupolvet

7.9.2026. Tarkistettu työpuun tila commitin `7a938dd` ympärillä, mukaan lukien uudet `interactions`- ja lisääntymiskalenteriosat. Tämä muistio järjestää olemassa olevia paloja. Se ei lisää tutkimuslähdeluetteloa, tee koodimuutoksia tai oleta uusia mitattuja vaikutuskertoimia.

**Kokoava havainto:** BERM:n makrohaaran vahvin seuraava askel on kuvata, kuinka biologisten organismien tuottama ympäristö säilyy, valikoi seuraavia toimijoita ja muuttaa takaisin heidän biologisia olosuhteitaan. Monet tähän tarvittavat palat ovat jo olemassa. Puuttuva kokonaisuus on niitä yhdistävä tilapäivitys: ketjun loppu täytyy palauttaa seuraavan kierroksen alkuehdoiksi materiaalisten välivaiheiden kautta.

Lindgren-portin lähtö on vuoden 2025 premissi \(g=\eta+\kappa A\otimes A\), josta \(A=A_b+a\) tuottaa

\[
\delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Biologiseen lukemaan vievä \(z_i=\int K_i(S_i):\delta g\,d\tau\) on avoin L2-siltapremissi. Seuraavat rakenteet ovat ehdollisia biologisen tilamuutoksen jälkeisiä aggregaatioita ja takaisinkytkentöjä. Ne eivät ratkaise tätä avointa siltaa. FieldState-havainnot mittaavat ja estimoivat fysikaalista tilaa; mittausrekisteri ei aiheuta biologista vastetta.

## 1. Instituutio kuuluu myös seuraavan ympäristön alkuehtoihin

### Olemassa olevat palat

`political_biology.py` sisältää sanallisen ympäristö → biologinen tila → instituutio → ympäristö -silmukan ja esimerkiksi institutionaalisen valikoitumisen indeksejä. `biocap.py` ja `chi_map.py` sisältävät sähköistymis- ja kaupungistumishistoriaa kuvaavia ulkoisia aikasarjoja. Uusi `advance_institution_stock` laskee jo toiminnan kerryttämän varannon. Ekologinen tila voi sisältää ympäristömuuttujia. [Kuvattu palautesilmukka](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/political_biology.py:3287>), [instituutiovarannon päivitys](</Volumes/kovalevy 3/extinctionfield/berm/berm/interactions/social.py:147>).

### Puuttuva järjestävä rakenne

Rakennettu ympäristö on siirrettävä ulkoa annetun ajan funktion lisäksi endogeeniseksi tilaksi. Instituutiot eivät vaikuta soluun abstraktilla institutionaalisella voimalla. Niiden kautta ihmiset toteuttavat työvuoroja, asumista, hoivaa, ruokailua, infrastruktuuria ja laitteiden käyttöä. Nämä muuttavat konkreettisesti sijainteja, aikatauluja, valoa, lämpöä, kemiallisia olosuhteita sekä paikallisia fysikaalisia kenttiä.

Yksi ehdollinen suljettu rakenne on

\[
S_t\xrightarrow{\mathcal B}\text{teot ja päätökset }b_t,
\qquad
I_{t+1}=\mathcal I(I_t,b_t,W_t),
\]
\[
H_{t+1}=\mathcal H(H_t,I_{t+1},b_t,R_t),
\qquad
E_{t+1}(x,\tau)=\mathcal P(H_{t+1},L_{t+1},E_{\rm natural}),
\]
\[
(a_{i,t+1},\text{valo, lämpö, kemia, ravinto})
=\mathcal X(E_{t+1},x_i(\tau),\text{käyttö ja toiminta}),
\qquad
S_{t+1}=\mathcal F(S_t,z_t,\text{muut biologiset syötteet}).
\]

\(I\) on organisoitujen sääntöjen ja toiminnan tila, \(H\) rakennettu aineellinen ympäristö, \(L\) sen käyttö ja kuormitus, \(R\) käytettävissä olevat resurssit. \(\mathcal P\) ja \(\mathcal X\) tarvitsevat mitatun fysiikan, sijainnit, ajankäytön ja kudossiirron. Instituution nimike tai digitaalisen palvelun käyttömäärä ei sellaisenaan määritä paikallista kenttäannosta.

**Mitä tämä lisää.** Malli voi selittää, miksi sama yksilötason muutos joko korjaantuu tai voimistuu eri ympäristöissä. Teot voivat rakentaa palautumista tukevia olosuhteita tai vähentää palautumismahdollisuuksia. Teknologia voi samanaikaisesti kompensoida toimintavajetta ja muuttaa muita biologisia syötteitä. Koko palautteen etumerkki ratkaistaan näiden erillisten vaikutusten summasta ja ajoituksesta.

Tässä makro → mikro -palaute säilyttää täyden biologisen reduktion: aiempien organismien materiaalinen toiminta muuttaa nykyisten organismien kohtaamia reunaehtoja. Instituutio on yhtä aikaa biologisten tekojen tulos, säilyvä ympäristö ja seuraavien tekojen valintaympäristö.

## 2. Biologinen tila muuttaa myös sitä, kuka kohtaa kenet

### Olemassa olevat palat

`advance_social_state` toteuttaa jo \(\delta b_{t+1}=u_t+\beta W\delta b_t\). Ekologinen kohtaamisoperaattori laskee \(\Delta t\,k_{ij}^0g_{ij}(S,E)n_in_j\), ja sen kutsujan antama modifier voi käyttää koko verkon tilaa. Käyttäjä voi jo antaa eri aikavaiheille erilaisen verkon. `migration_gradient.py` puolestaan sisältää alueiden eroa kuvaavan indeksin. [Sosiaalinen päivitys](</Volumes/kovalevy 3/extinctionfield/berm/berm/interactions/social.py:82>), [ekologinen päivitys](</Volumes/kovalevy 3/extinctionfield/berm/berm/interactions/ecology.py:95>).

### Puuttuva järjestävä rakenne

Verkon tulee muodostua osittain mallin omasta tilasta. Pelkkä saman muutoksen levittäminen annetussa verkossa ei vielä kuvaa parisuhteen muodostumista, hoivasuhteen katkeamista, työntekijän siirtymistä, pölyttäjän kasvinvaihtoa tai syntyvän yksilön liittymistä verkkoon.

Ehdollinen rakenne aktiivisten toimijoiden joukolle on

\[
W^{(\ell)}_{ij,t+1}
=[1-d^{(\ell)}_{ij}(S_t,I_t,E_t)]W^{(\ell)}_{ij,t}
+g^{(\ell)}_{ij}(S_t,I_t,E_t,\Pi_t),
\]

missä \(\ell\) nimeää verkon lajin: kohtaaminen, hoiva, työ, tiedonvälitys tai lisääntyminen. \(d\) on kyseisen aikavälin poistuma ja \(g\) syntyvät yhteydet; jos paino on todennäköisyys, muodostumiselle tarvitaan sen rajoja kunnioittava siirtymämalli. Uudet ja poistuvat yksilöt päivitetään samalla erillisessä toimijajoukossa. \(\Pi\) sisältää saatavilla olevat kumppanit ja kohtaamismahdollisuudet.

**Mitä tämä lisää.** Sama biologisten tilojen jakauma voi tuottaa erilaisen yhteistuloksen, koska tila vaikuttaa sekä yksilön suoritukseen että hänen sijaintiinsa verkossa. Yksilön toimintakyvyn palautuminen ei automaattisesti palauta jo menetettyä kumppania, työnjakoa tai pölytysreittiä. Toisaalta uudet yhteydet ja korvaavat toimijat voivat kompensoida paikallisen muutoksen.

Ajallinen yhteensopivuus kuuluu yhteyden toimintaan:

\[
\text{toteutuva yhteistoiminta}
\propto\int W_{ij}(t)c_i(t)c_j(t)\,dt.
\]

Sama vuorokauden keskimääräinen kapasiteetti voi tuottaa eri määrän yhteistoimintaa, jos toimintaikkunat eivät kohtaa. Vastaavasti suuri välityspaino ja tietty biologinen tila voivat osua samoille henkilöille tai eri henkilöille. Tällöin pelkkä väestön keskiarvo ei määritä verkon toimintaa.

Tämä kokoaa saman periaatteen ihmis- ja ekologisiin verkkoihin ilman, että niiden käyttäytymismekanismit väitetään samoiksi: alempi toimintatila muuttaa kohtaamisoperaattoria, ja muuttunut kohtaamisrakenne puolestaan muuttaa seuraavia biologisia ja resurssisyötteitä.

## 3. Yksilön muutos, populaation lajittuminen ja sukupolven uusiutuminen ovat eri päivityksiä

### Olemassa olevat palat

Uusi kalenterimalli laskee jo yrityksiä, menetyksiä, synnytyksiä ja pariteettia. Ekologinen operaattori sisältää syntymät ja kuolemat. Eco-katsaus erottaa jo ekologisen lajittumisen periytyvästä evoluutiosta ja nimeää jälkimmäisen vaatiman periytyvän vaihtelun. Poliittisen biologian tiedosto nimeää organisaation rekrytointivalinnan, mutta indeksit lasketaan biomarkkereista ilman varsinaista henkilöiden vaihtumisen prosessia. [Kalenterin nykyinen rajaus](</Volumes/kovalevy 3/extinctionfield/berm/berm/outcomes/reproductive_calendar.py:120>), [Eco-katsauksen sukupolviosa](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-eco-bioelectromagnetic-selection-review.md>), [rekrytointikierroksiksi kuvattu indeksi](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/political_biology.py:2925>).

### Puuttuva järjestävä rakenne

Sama seuraavan ajankohdan keskiarvo voi syntyä usealla eri tavalla. Siksi tarvitaan erilliset operaattorit:

- saman yksilön tilamuutos ja palautuminen;
- selviytyminen, poistuminen ja muuttoliike;
- parien muodostuminen ja toteutunut jälkeläistuotto;
- jälkeläisen periytyvät ominaisuudet ja kehitysympäristö;
- institutionaalinen rekrytointi, oppiminen ja tiedon siirtyminen.

Väestön tilajakauman kaavamainen päivitys voidaan kirjoittaa

\[
n_{t+1}=\mathcal U_t\mathcal S_tn_t
+\mathcal H_t\mathcal B_t[n_t,\Pi_t]
+m_t.
\]

\(\mathcal U\) muuttaa jäljelle jäävien yksilöiden ikää ja tilaa, \(\mathcal S\) kuvaa heidän säilymistään, \(\mathcal B\) tuottaa uudet syntymät parijakaumasta ja \(\mathcal H\) jakaa niiden lähtötilat. \(m\) on erikseen laskettu nettomuutto. Periytyminen, raskaudenaikainen ympäristö ja syntymän jälkeinen oppiminen kuuluvat \(\mathcal H\):n eri osiin; vanhemman hankittua biologista tilaa ei oleteta sellaisenaan periytyväksi.

**Ensimmäinen uusi päätelmä:** jäljelle jääneiden keskimääräinen toimintakyky voi nousta, vaikka yksilöt eivät toivu. Jos alkuperäisen tilan \(x\) yksilöt jäävät havaittuun ryhmään painolla \(w\), niin muuttumattomalle yksilöominaisuudelle

\[
\bar x_{\rm retained}-\bar x
=\frac{\operatorname{Cov}(w,x)}{\mathbb E[w]}.
\]

Tämä on valikoitumisen identiteetti, ei oletus geenivalinnasta. Siten toimintakyky, jäljellä oleva määrä ja jälkeläistuotto on seurattava rinnakkain. Eri paikkojen samanlaiset keskiarvot voivat peittää erilaisen poistuma- ja muuttoliikehistorian.

**Toinen uusi päätelmä:** instituutioiden uusiutuminen ja biologinen lisääntyminen eivät käytä samaa onnistumiskriteeriä. Organisaatio voi kasvattaa jäsenmääräänsä rekrytoimalla jo olemassa olevia ihmisiä, vaikka sen nykyisten jäsenten lapsiluku olisi pieni. Biologinen populaatio taas uusiutuu syntymien ja säilymisen kautta. Rekrytointi voi jatkua myös muista ympäristöistä. Siksi institutionaalinen menestys ja omien jäsenten lisääntymismenestys voivat kulkea eri suuntiin ilman ristiriitaa.

Tästä seuraa tarve kahdelle toisiinsa kytkeytyvälle uusiutumisoperaattorille, ei kahdelle ontologialle. Instituutio säilyy ihmisten oppimisessa, toiminnassa ja materiaalissa. Sen jäseneksi siirtyminen ei ole biologinen syntymä. Pitkällä aikavälillä molemmat ovat riippuvaisia riittävästä määrästä toimintakykyisiä ihmisiä ja aineellisista resursseista.

## 4. Kapasiteetti, toteutunut työ ja ylläpitovara ovat eri tiloja

### Olemassa olevat palat

`compute_cultural_energy` käyttää jo populaatiomäärää, BioCap-arvoa ja tehokkuuskerrointa. Uusi instituutiovaranto erottaa säilyneen varannon, uuden panoksen ja poistuman. Moduloomi erottaa biologisen toiminnan, korjauksen ja vaurion. Näitä ei tarvitse keksiä uudelleen. [Nykyinen makrokooste](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/cultural_energy.py:77>), [varantolaskenta](</Volumes/kovalevy 3/extinctionfield/berm/berm/interactions/social.py:147>).

### Puuttuva järjestävä rakenne

Yhden kokonaiskapasiteetin rinnalle tarvitaan tehtäväkohtainen varanto ja välttämättömien panosten yhteensopivuus. Vesihuollon, ravinnontuotannon, hoivan tai koulutuksen ylläpito riippuu eri taidoista, ajasta, materiaaleista, energiasta ja toimivista yhteyksistä. Yhden resurssin lisäys ei korvaa rajatta toisen puuttumista.

Havainnollistava täydentävien panosten raja tehtävälle \(k\) on

\[
y_{k,t}=\min\left\{
\frac{L_{k,t}}{\ell_k},
\frac{M_{k,t}}{m_k},
\frac{E_{k,t}}{e_k},
\frac{C_{k,t}}{c_k}
\right\},
\]

missä panokset ja niiden tarvekertoimet on määriteltävä niin, että jokainen suhde tarkoittaa samaa tuotosta samassa aikavälissä. \(L\) on sopiva työpanos, \(M\) materiaali, \(E\) energia ja \(C\) vaadittujen yhteyksien tai koordinoinnin kapasiteetti. Minimi on tässä ehdotettu erikoistapaus; joustava korvattavuus edellyttää erikseen nimettyä tuotantofunktiota.

Varannon päivitys on jo nykyisen operaattorin laajennus:

\[
I_{k,t+1}=(1-\delta_k)I_{k,t}+y_{k,t}-d_{k,t}.
\]

Uusiutuva taitovaranto tarvitsee oman viiveensä:

\[
Q_{k,t+1}=Q_{k,t}-\text{poistuvat osaajat}
+\text{valmistuvat uudet osaajat}_{t-\tau_k}.
\]

**Mitä tämä lisää.** Yhteiskunnallinen toiminta voi jatkua aiemmin kertyneellä infrastruktuurilla ja osaamisella, vaikka uuden ylläpitopanoksen muodostuminen heikkenisi. Ulkoinen tulos voi siksi muuttua vasta varannon tai välttämättömän osaamisroolin lähestyessä rajaa. Myös toipuminen voi viivästyä biologisen toimintakyvyn palauduttua, koska puuttuvaa taitoa, kumppanisuhdetta tai fyysistä rakennetta ei saada takaisin välittömästi.

Tämä tarjoaa täsmällisen mikrotasolta makroon johtavan reitin myös kasvavaan yksilökuormaan:

\[
\text{vähemmän käytettävissä olevaa työ- tai hoivapanosta}
\rightarrow\text{suurempi tehtäväkuorma jäljelle jääville}
\rightarrow\text{vähemmän palautumisaikaa}
\rightarrow\text{muuttunut biologinen tila}.
\]

Nuoli ei ole väistämätön: tehtävien vähentäminen, työn uudelleenjako, ulkopuolinen apu tai tarkoitukseen sopiva tekniikka voivat katkaista sen. Tällaiset kompensaatiot ovat saman materiaalisen mallin operaattoreita. Näin malli voi selittää sekä kestävyyttä että kuormituksen kasvua samoilla rakenteilla ilman ennalta annettua lopputulosta.

## Miten neljä rakennetta sijoittavat palat uudelleen

| Jo koottu pala | Järjestävä paikka kokonaisuudessa | Lisätty selityskyky |
|---|---|---|
| Biologinen toimintatila ja palautuminen | Yksilön ajallinen tila ja tehtäväkohtainen toiminta | Samasta biomarkkerista ei tarvitse päätellä kaikkia tehtäviä samalla kertoimella |
| Instituutio ja infrastruktuuri | Hidas varanto sekä seuraavan ympäristön tuotanto | Menneen toiminnan vaikutus säilyy toimijoiden vaihtuessa |
| Sosiaalinen ja ekologinen kohtaamisverkko | Tilasta riippuva, uusiutuva yhteysrakenne | Kohtaamiset voivat muuttua ennen runsautta; korvaavat yhteydet voivat kompensoida |
| Kalenteri ja pariteetti | Ikärakenteen ja uusien toimijoiden syöttö seuraavalle kierrokselle | Menetetty aika vaikuttaa seuraavien sukupolvien ja osaajaryhmien kokoon |
| Lajittuminen ja rekrytointi | Erilliset koostumuksen valintaoperaattorit | Näennäinen keskimääräinen paraneminen erotetaan yksilön palautumisesta |
| Teknologiaympäristö | Materiaalinen tuotanto- ja käyttötila sekä biologisten syötteiden lähde | Kompensaatio ja uudet biologiset kuormitukset voidaan laskea rinnakkain |

Kokonainen palapeli on näin biologinen tila → toiminta → kohtaaminen ja valikoituminen → säilyvä varanto → rakennettu ympäristö → seuraava biologinen tila, samalla kun yksilöt vanhenevat, lisääntyvät, poistuvat ja vaihtavat paikkoja. Nykyiset mittari- ja diagnoosikoosteet voidaan sijoittaa tämän kokonaisuuden havaituiksi projektioiksi. Niiden ei tarvitse kantaa yksin kaikkien välivaiheiden kausaalista tehtävää.

Tämä on rakenteellinen synteesi olemassa olevista palasista. Sen vahvuus on, että sama järjestys tuottaa ehdollisesti viiveen, paikallisen vahvistumisen, kompensaation, valikoitumisen ja toiminnan palautumisen. Lopputuloksen suunta ei sisälly pelkkiin otsikoihin: sen määräävät biologiset vasteet, materiaalivirrat, kohtaamiset, siirtymät ja aikaskaalat.
