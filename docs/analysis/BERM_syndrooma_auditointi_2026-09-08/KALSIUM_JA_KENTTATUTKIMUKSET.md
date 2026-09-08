# Kenttätutkimusten ja kanavasairauksien yhteiset mitattavat välittäjät

Tutkimusauditointi 8.9.2026. Rajaus: julkaistu kenttäaltistusnäyttö, sähköinen toiminta, kalsiumvarastot ja kanavasairauksien mekanismikokeet. Tarkastettu nykyinen työpuu `/Users/ottojuote/.berm-navigation-repair-20260908` sekä alkuperäisen BERM-repositorion lähdekonteksti. Tämä dokumentti on tutkimussynteesi; se ei muuta tuotantokoodia tai lähderekisteriä.

Keskeinen tulos on myönteinen: kanavasairauksia voidaan jo yhdistää kenttätutkimuksiin **yhteisen mitatun fysiologisen suureen kautta**. Vahvimmat sillat eivät edellytä uuden altistuskokeen tekemistä. Osa yhteyksistä on jo havaittu samassa kokeessa: kenttä ja CACNA1C-genotyyppi ihmisen EEG:ssä, kenttä ja CACNA1C-vaimennus solun kalsiumvasteessa sekä kenttä ja RyR/SERCA-estäjät hermosolun sähköisessä vasteessa. Toiset sillat muodostuvat riippumattomista kenttä-, potilassolu-, mutaatio- ja lääkevastetutkimuksista.

## Malliin kiinnittäminen

Lindgren-portti on tämän tutkimuskokonaisuuden päätasolla tarkistettu. BERM:n käyttämässä normalisoinnissa

\[
g=\eta+\kappa A\otimes A,\qquad
\Delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Nykyinen `berm/docs/pharmacology-conditional-derivation.md` tuo biologiseen reduktioon eksplisiittisesti oletukset

\[
\delta S_m=\tfrac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu},\quad
r_j=\int\Xi_{j,R}^{\mu\nu}(s)\Delta g_{\mu\nu},\quad
q=q_0+Gr,\quad \dot x=F(x,q;\theta),\quad Y=H(x).
\]

Seuraavat tutkimukset rajoittavat erityisesti biologisia vasteita `F`, havaintofunktiota `H`, kudoskohtaisia parametreja `θ` ja vastaanottimen tilariippuvuutta. Ne voivat siis vahvistaa mallin biologista rakennetta ja paikantaa kenttävasteen vastaanottavaa komponenttia. Ne eivät yksin määrää `κ`:aa, `Ξ`:tä, gauge-valintaa tai fysikaalisen kytkennän suuruutta. Tämä tekee synteesistä täsmällisen: samaa biologista välittäjää voidaan käyttää yhdistävänä muuttujana ilman, että mutaatio ja kenttä määritellään samansuuruisiksi syötteiksi.

Tässä käytetyt luokat:

- **A — Suora komponenttinäyttö:** nimetyt kenttä-, välittäjä- ja/tai interventiomittaukset samassa kokeessa.
- **B — Vahva koostava synteesi:** eri kokeet kohtaavat samassa fysiologisessa muuttujassa tai molekyylissä ja vaikutussuunta on eksplisiittinen.
- **C — Rajattu siirto:** kudos, laji, kanavan isoformi, aikaskaala tai altistusluokka vaihtuu; siirtymä kuvataan nimeltä.
- **D — Puuttuva havainto:** tiettyä suuretta ei mitattu tässä aineistossa. Tämä rajaa kyseisen nuolen, ei estä muiden nuolten koostamista.

## Kahdeksan koottavaa ketjua

### 1. CACNA1C-genotyyppi × RF-kenttä → ihmisen verkkorytmin taajuus

**Suora näyttö.** Sousouri ym. tutkivat 34 vapaaehtoista satunnaistetussa, kaksoissokkoutetussa vaihtovuorokokeessa: 15 `rs7304986 T/C`- ja 19 `T/T`-kantajaa. Altistukset olivat 700 MHz ja 3,6 GHz, 30 minuuttia, molemmissa 12,5 Hz tehonmodulaatio, pään `psSAR10g ≤ 2 W/kg`. Altistus sijoittui 60–30 minuuttia ennen valojen sammuttamista. Ensimmäisen NREM-jakson T/C-ryhmässä 3,6 GHz nosti sukkuloiden keskitaajuutta **13,62 → 13,82 Hz**; vaikutusalue käsitti 50/109 EEG-kanavaa. Keskimääräinen Cohenin d oli 0,78. Koko yön topografisissa analyyseissa ja ensimmäisen jakson korjatussa sukkulatehossa/kaistanleveydessä ei löytynyt vastaavaa eroa. [Sousouri ym., NeuroImage 2025](https://doi.org/10.1016/j.neuroimage.2025.121340).

**Koostaminen.** Timothy kertoo, että CACNA1C:n poikkeava toiminta voi muuttaa kehitystä ja verkkojen toimintaa. Tässä kenttävasteen moderaattori on jo sama geeni ihmisessä. Luokka **A** kenttä × genotyyppi → EEG; **B/C** yhdistäminen Timothyyn. EEG-kokeessa ei mitattu kanavavirtaa tai solunsisäistä kalsiumia (**D**), joten tavallinen SNP ja Timothyn patogeeninen mutaatio eivät ole sama interventio.

**Data:** raakadata saatavilla tekijöiltä pyynnöstä; nykyisin avoimet kuvat, taulukot ja lisäaineisto mahdollistavat aggregaattivertailun. Preprint 2024 ja julkaisu 2025 ovat **sama aineisto**, eivät kaksi toistoa. Rekrytointi perustui Eicherin aiempaan kyselyaineistoon; sitäkään ei lasketa toiseksi RF-kokeeksi.

### 2. Sähkökenttä → CACNA1C-riippuvainen Ca-sisäänvirtaus → solun tilan muutos

**Suora näyttö.** Neuhaus ym.: ihmisen T98G- ja U251-glioblastoomasolut, 200 kHz vaihtosähkökenttä. Akuuteissa fura-2- ja kanavamittauksissa käytettiin 0–2,5 V/cm; pitkässä solutilakokeessa pääprotokolla oli 1 V/cm, 5–7 päivää. Ca-sisäänvirtaus paikannettiin ulkoisen kalsiumin poistolla, lääke-estolla sekä **CACNA1C-siRNA:lla**. Nifedipiini ja benidipiini olivat 1 µM. Solusyklin, mitokondrioiden membraanipotentiaalin ja eloonjäämisen vasteet erosivat solulinjojen välillä. [Neuhaus ym. 2019](https://doi.org/10.3390/cancers11010110).

**Koostaminen.** Tämä täydentää ihmis-EEG:tä eri suunnasta: kentän vaikutukseen osallistuvan CaV1.2-komponentin merkitystä on käsitelty geneettisellä interventiolla samassa solukokeessa. Luokka **A** kenttä → CaV1.2/Ca; **B** sama geeni Timothyyn ja Sousouriin; **C** syöpäsolu → terve hermokudos ja 200 kHz hoitokenttä → GHz-altistus. Yhdistävä suure on CaV1.2-välitteinen virta ja solun vaste, ei yhteinen ulkoinen annos.

**Suuntarajoitus:** Ca-kanavan esto ei tässä yleisesti pelastanut loppuvastetta: benidipiini voimisti eräitä T98G-solujen kenttävaikutuksia. CaV1.2-vaste voi siis sisältää kompensoivan stressivasteen. Tämä on hyödyllinen rajoite `F`:lle: välittäjän aktivaatio ja lopputuloksen haitallisuus eivät ole sama asia.

**Data:** avoimet kuvat, mittausmenetelmät ja normalisoidut vasteet; erillistä avointa raakamittausarkistoa ei vahvistettu. Kuvatekstien annokset tulee poimia paneelikohtaisesti, sillä yksittäiset esimerkkipaneelit käyttävät 2,5 V/cm eikä kaikkien kuvien protokolla ole identtinen.

### 3. Kenttä → ATP/ADP ja sähköinen portti → Ca-dynamiikka → insuliini

**Magneettikenttähaara.** Sakurai ym. mittasivat hamsterin HIT-T15-soluissa 5 mT ELF-kentän jälkeen glukoosin normaalisti aiheuttaman ATP/ADP-nousun, depolarisaation, sytosolisen Ca-nousun ja insuliinierityksen vaimenemisen. Myös insuliinin mRNA-vaste heikkeni; elinkyky ei muuttunut. Tämä sisältää useita peräkkäisiä välittäjiä samassa tutkimuksessa. Taajuuden ja altistusajan täsmällisiä arvoja ei saatu tämän auditoinnin aikana alkuperäisen artikkelin kokotekstistä vahvistettua; abstrakti vahvistaa 5 mT:n ja edellä mainitut mittaukset. [Sakurai ym. 2005](https://doi.org/10.1016/j.bbrc.2005.04.091).

**Sähkökenttähaara.** Liebman ym. tutkivat hiiren βTC-6-soluissa DC-sähkökentän aikaansaamaa kalsiumdynamiikkaa ja insuliinieritystä myös ilman glukoosistimulaatiota. BetaBuddy julkaisi myöhemmin saman kuva-aineiston automaattisen uudelleenanalyysin: 1 ja 2 V/cm, 15 minuuttia, lisäsivät Ca-piikkien määrää; 3 V/cm ei antanut merkitsevää lisäystä tähän päätemuuttujaan. Kuvaukset olivat kaksi minuuttia ennen ja jälkeen altistuksen. [Liebman ym. 2020/2021](https://doi.org/10.1007/s10439-020-02517-w), [Alsup ym. 2024](https://doi.org/10.1371/journal.pone.0299549).

**Syndroomasilta.** KCNJ11/ABCC8:n aktivoivat muutokset pitävät KATP-porttia liian avoimena; KCNJ11-vastasyntyneisyysdiabeteksessa mitattu ATP-herkkyys oli heikentynyt. Vastakkaissuuntainen hyperinsulinismi tuottaa portin puutoksen, spontaanin sähköisen aktiivisuuden ja korkean Ca-perustason. Potilaiden β-solut paikantavat portin: viiden hyperinsulinismipotilaan soluissa KATP-toiminnan menetys yhdistyi depolarisaatioon ja Ca-sisäänvirtaukseen. [Gloyn ym. 2004](https://doi.org/10.1056/NEJMoa032922), [Babenko ym. 2006](https://doi.org/10.1056/NEJMoa055068), [Kane ym. 1996](https://doi.org/10.1038/nm1296-1344).

**Kausaalinen pelastus:** 44/49 KCNJ11-potilaasta siirtyi sulfonyyliurealla pois insuliinista; mekanismiin vaikuttava interventio palautti eritystoimintaa. [Pearson ym. 2006](https://doi.org/10.1056/NEJMoa061759).

**Luokka ja johtopäätös:** **A** kenttä → mitatut β-soluvälittäjät; **B** kytkentä ihmisen KATP-porttiin; **D** suora KATP-virta kenttäaltistetuissa HIT-T15-soluissa. Kaksi kenttähaaraa osoittavat eri suuntiin, mikä auttaa erottamaan ATP-tuotannon kautta kulkevan ja suoremmin depolarisaatioon kytkeytyvän sisääntulon. Niitä ei keskiarvoisteta yhdeksi kenttävaikutuskertoimeksi.

**Julkaisujen identiteetti ja aikaskaala.** Sakurai2004 on eri koe kuin Sakurai2005: rotan RIN-m-solut, 60 Hz/5 mT/1 tunti ja 45 mM KCl, insuliinieritys vaimenee ja nifedipiini pienentää kenttä–sham-eroa. Myös SNAP25/synaptotagmiini1-mRNA vähenee. [Sakurai ym. 2004](https://doi.org/10.1002/bem.10181). Vuonna 2007 verkossa/2008 lehdessä julkaistu HIT-T15-tutkimus puolestaan käytti 60 Hz/5 mT -kenttää 2–5 vuorokautta: eritys **lisääntyi** ilman glukoosia kahdessa vuorokaudessa ja 100 mg/dl glukoosissa viidessä vuorokaudessa; solunsisäiset insuliinivarastot suurenivat valituissa glukoosi/aikaryhmissä. [Sakurai ym. 2008](https://doi.org/10.1002/bem.20370). Vuoteen 2008 liitetty yleinen ”−30 % insuliinia” sekoittaisi tutkimukset ja peittäisi mallille arvokkaan tilariippuvuuden.

**Olemassa oleva kokonaisen eläimen aikasarja.** Martiñón-Gutiérrez ym. altistivat rottia 60 Hz/3,8 mT -kentälle 15 minuuttia. Glukoosikuormituksen jälkeen ensimmäinen insuliinihuippu voimistui, mutta noin 120 minuutin toinen huippu lähes poistui. Veren ATP/ADP ei muuttunut merkitsevästi, joten tulos ei ole β-solun ATP-mittaus. Kuvan 3 ryhmissä oli viisi eläintä; eri kuvien havainto- ja eläinmäärät on poimittava erikseen. [Martiñón-Gutiérrez ym. 2021](https://doi.org/10.1038/s41598-021-91228-w). Luokka **A** kenttä → hormonivasteen ajallinen rakenne, **B/C** yhdistäminen β-solujen sähköiseen/aineenvaihdunnalliseen porttiin. Avoimet kuvat ovat heti analysoitavissa, raakadata tekijöiltä pyynnöstä. Tämä vahvistaa vaihetta ja kuormitustilaa kuvaavan mallin tarvetta; sama keskiarvo voi peittää vastakkaiset varhaisen ja myöhäisen vaiheen vaikutukset.

**Avodata:** [Zenodo 10476949](https://doi.org/10.5281/zenodo.10476949), tarkistettu tiedosto `BetaBuddy_data.zip`, 6 773 522 380 tavua, MD5 `a0eb95242a370c166f1839324b705786`; [analyysikoodi](https://github.com/jacobluber/BetaBuddy). Arkiston olemassaolo ja metadata tarkistettiin; koko 6,77 GB aineistoa ei ladattu tai analysoitu tässä auditoinnissa. Liebman ja BetaBuddy muodostavat **yhden** biologisen aineistoperheen.

### 4. Kenttä → RyR/SERCA-riippuvainen varastodynamiikka → sähköinen toiminta

**Suora näyttö.** Bertagna ym. tutkivat neliviikkoisten uroshiirten hippokampuksen CA1-soluja aivoleikkeissä: 50 Hz, 1 mT, 60 minuuttia. Sisäänpäin suuntautuvan huippuvirran tiheys muuttui 54,68 → 34,27 pA/µm² (**−37,3 %**) ja transientin ulosvirtauksen 60,67 → 32,59 (**−46,3 %**), n=7. Dantroleeni 10 µM ja SERCA-estäjä CPA 1 µM poistivat tilastollisesti havaitun kenttävasteen. ≤15 minuutissa vastaavaa muutosta ei havaittu. Nämä ovat **kalvovirtoja, eivät suoraan mitattua Ca-pitoisuutta**. [Bertagna ym. 2025](https://doi.org/10.1111/nyas.15386).

**Syndroomasilta.** Kuuden RYR2-CPVT-potilaan dantroleenivaste ja heidän iPSC-sydänsolujensa Ca-aaltovaste vastasivat toisiaan mutaatiosta riippuvasti. Neljällä potilaalla kammiolisälyönnit vähenivät 33–97 %, kahdella noin 1–2 %. Rytmihäiriökynnys nousi; vaikutus palautui huuhtoutumisessa. Kaikkien mutanttien poikkeava Ca-dynamiikka ei edellyttänyt kohonnutta diastolista keskipitoisuutta. [Penttinen ym. 2015](https://doi.org/10.1371/journal.pone.0125366).

**Koostaminen:** luokka **A** molemmissa koeperheissä; **B/C** niiden välissä. Yhteinen solmukohta on varastosta vapautumisen ja palautumisen muokkaama sähköinen vaste. Hippokampuksen RyR-riippuvuus ei tunnista yksin RYR2-isoformia eikä tee hermo- ja sydänsolusta samaa järjestelmää. Kahden estäjän tulos tukee saman kierron kahden eri osan välttämättömyyttä; se ei osoita kahta toisistaan riippumatonta kentän ensikohdetta.

**Data:** Bertagnan raakamittaukset pyynnöstä, taulukko 1 ja kuvat 2–4 heti poimittavissa. `n` sisältää rekisteröintejä; eläin, leike ja rekisteröinti on pidettävä erillisinä tasoina. Penttisen avoimet potilas- ja solukohtaiset kuvat mahdollistavat genotypeittäin tehdyn vastevertailun jo nyt.

### 5. Kenttä → ER-varaston palautuminen → seuraavan Ca-vasteen muoto

**Suora näyttö.** Luo ym.: rotan entorinaalisen kuoren soluviljelmät, 50 Hz, 1 tai 3 mT, 24 tuntia. Kokonaisvirrat sekä eristettyjen HVA- ja LVA-kalsiumvirtojen aktivaatio/inaktivaatio eivät muuttuneet. Silti korkean kaliumin herättämän Ca-nousun huippu pieneni; thapsigargiinilla tehty varastojen tyhjennys poisti eron. Kenttävaste voi siis näkyä **ärsykkeen jälkeisessä Ca-dynamiikassa**, vaikka tutkittu plasmakalvon kanavatoiminta on ennallaan. [Luo ym. 2014](https://doi.org/10.1016/j.envres.2014.09.023).

Bertagnan HEK293-tutkimuksessa 1 mT staattinen magneettikenttä ja puhelinlähde testattiin 30 minuutin protokollissa. Thapsigargiini 10 µM nosti perustasoa ja poisti kentän lisävasteen. Puhelimen nimellinen SAR 1,27 W/kg ei ole viljelmän dosimetria; RF-taajuutta ja viljelmän absorboimaa annosta ei tässä voitu luotettavasti kvantifioida. [Bertagna ym. 2022](https://doi.org/10.14814/phy2.15189).

**Syndroomasilta.** Brodyn ATP2A1/SERCA1-sairaudessa palautuspumpun vaje antaa suoran ihmisesimerkin siitä, että häiriö voi olla rentoutumisessa/palautumisessa. Kansainvälinen 40 potilaan tutkimus vahvistaa geneettisen ja kliinisen kokonaisuuden. [Molenaar ym. 2020](https://doi.org/10.1093/brain/awz410). ATP2A2/SERCA2 tarjoaa ihokudoksessa rinnakkaisen geneettisen ankkurin Darierin tautiin. [Sakuntabhai ym. 1999](https://doi.org/10.1038/6784).

**Luokat:** **A** kenttä → varastosta riippuva vaste; **B/C** SERCA-perheen biologinen siirto. Vahva päätelmä on palautumisdynamiikan sisällyttäminen malliin. Tästä ei seuraa, että kaikkien kenttäprotokollien vaikutus olisi pumpun esto tai että ER-varasto aina tyhjenisi. Thapsigargiinin nostama lähtötaso ja muuttunut varastotila ovat osa interventiota.

**Data:** Luon avoin abstrakti ja tunnistetut alkuperäismittaukset; tarkka vaikutuskoko poimittava kokotekstin kuvista. Bertagna2022:n kuvat avoimia; Brody-aineiston lisätiedot pyynnöstä. Bertagna2022/2025 ovat samaa tutkimusryhmäperhettä eri preparaateilla; Luo on erillinen ryhmä.

### 6. Pitkä kenttäaltistus → kanavapopulaatio → synaptinen tai hormonaalinen kapasiteetti

**Suora näyttö.** Grassi ym.: 50 Hz, 24–72 tuntia, rotan GH3-aivolisäke- ja ihmisen IMR32-neuroblastoomasolut. Makroskooppinen Ba-virran tiheys nousi 67 % ja 40 %. Yksittäisten L/N-kanavien avautumislogiikka ei muuttunut; plasmakalvorikastetusta fraktiosta mitattu kanavaproteiini lisääntyi. Virran ja proliferaation/lääkkeillä aiheutetun apoptoosin vasteet liittyivät kanavaestoon. Tämän auditoinnin ensisijaisesta abstraktista kentän tarkka voimakkuus ei varmistunut. [Grassi ym. 2004](https://doi.org/10.1016/j.ceca.2003.09.001).

Sun ym. tarjoaa toisen koeperheen: syntymästä 8–10 päivään 50 Hz/1 mT altistetut hiiret, calyx of Held -pääte. Presynaptinen CaV2.1/2.2/2.3-ilmentyminen, Ca-sisäänvirtaus ja useat endosytoosin muodot lisääntyivät. Valmiin vesikkelivaraston koko ja eksosytoosi eivät vastaavasti suurentuneet. [Sun ym. 2016](https://doi.org/10.1038/srep21774).

**Koostaminen.** CACNA1D-PASNA ja SANDD osoittavat, että CaV1.3:n liian suuri ja liian pieni toiminta tuottavat kudoskohtaisia seuraamuksia: avautumiskynnyksen siirtymä/häiriintynyt inaktivaatio yhdistyy aldosteronin eritykseen ja hermostoon; johtamattomuus kuuloon ja sinussolmukkeeseen. [Scholl ym. 2013](https://doi.org/10.1038/ng.2695), [Baig ym. 2011](https://doi.org/10.1038/nn.2694).

**Luokat:** **A** kenttä → kanavamäärä/virta; **B/C** genetiikkaan. Kanavamäärä, yksittäiskanavan johtavuus ja avautumistodennäköisyys voivat kaikki muuttaa kokonaisvirtaa mutta eivät ole sama parametri. Sunin CaV2-alatyyppejä ei saa kutsua CaV1.3:ksi. Yhteinen johtopäätös on hitaasti muuttuva vastekapasiteetti, joka kannattaa erottaa välittömästä gating-muutoksesta.

**Data:** nykykuvista ja menetelmistä poimittavat virta-, proteiini- ja vesikkelipäätemuuttujat. Avointa raakadata-arkistoa ei vahvistettu. Grassi ja Sun ovat eri ryhmiä; Sun ja alla oleva Cui sijoittuvat samaan Fudanin tutkimusverkostoon, joten eivät ole täysin riippumattomia laboratoriotoistoja.

### 7. Kenttä → lipidivälittäjä → CaV3.2-virta → endokriinisen portin dynamiikka

**Suora näyttö.** Cui ym.: 50 Hz/0,2 mT; ihmisen CaV3-kanavat HEK293-soluissa ja natiivit kanavat hiiren kortikaalisissa hermosoluissa. CaV3.2-virran esto oli 0,5 tunnissa 11 %, 1 tunnissa 31,1 %, 2 tunnissa 4,3 % ja 3 tunnissa 3,7 %. Yhden tunnin AA-nousu oli 17,9 % ja LTE4-nousu 25,2 %. CAY10502 ja bestatiini katkaisivat ketjua; ulkoinen LTE4 jäljitteli estoa. CaV3.2-proteiinimäärä sekä vakaan tilan aktivaatio- ja inaktivaatiokäyrät eivät muuttuneet. Solumäärät olivat päävertailuissa kymmeniä; AA/LTE4-biokemia perustui 3–4 itsenäiseen kokeeseen. [Cui ym. 2014](https://doi.org/10.1016/j.ceca.2013.11.002).

**Syndroomasilta.** CACNA1H:n M1549V löydettiin viidestä varhaisen aldosteronismin indeksipotilaasta; mutantin toiminta lisää CaV3.2:n aktiivisuutta. Sukulaisista löytyi myös normotensiivisiä kantajia. [Scholl ym. 2015](https://doi.org/10.7554/eLife.06315).

**Koostaminen:** **A** kenttä → AA/LTE4 → virta; **B/C** sama CaV3.2 endokriinisessä kudoksessa. Kenttäprotokollan estävä suunta on vastakkainen patogeeniselle GoF:lle; se kalibroi mekanismin suuntaa eikä tue väitettä, että tämä protokolla aiheuttaisi aldosteronismia. Samalla 1 tunnin huippu ja 2–3 tunnin palautuminen tarjoavat jo aineistopohjan tilapäiselle biologiselle välitykselle vakionopeuksisen kumuloitumisen sijaan.

**Data:** julkaistun artikkelin numeeriset tulokset ja kuvat 1–10 ovat suoraan poimittavissa; raaka-arkistoa ei tunnistettu. Genetiikkatutkimuksen variantti on ClinVarissa `SCV000218508`, kliiniset lisätaulukot avoimia; koko eksomia ei julkaistu suostumusrajoitteen vuoksi. Geenivarianttia ei tarvitse arvailla ulkoisesta altistusannoksesta.

### 8. Kentän pulssitaajuus → STIM/ORAI-kapasiteetti → varastoperäisen Ca-sisäänvirtauksen säätely

**Suora näyttö.** Clarke ym.: puhdistetut vastasyntyneen hiiren kortikaaliset astrosyytit, 18 mT rMS; 1 Hz/600 pulssia tai 10 Hz/600 tai 6000 pulssia. RNA mitattiin 5 tunnissa, valittuja proteiineja 5 ja 24 tunnissa. 10 Hz vähensi STIM1- ja ORAI3-transkripteja ja proteiineja; valittujen transkriptien lasku oli 2–4-kertainen. **1 Hz sen sijaan nosti STIM1/ORAI3-proteiinia.** [Clarke ym. 2021](https://doi.org/10.1016/j.brs.2020.12.007).

**Syndroomasilta.** Stormorkenin STIM1 R304W -muutos vapauttaa proteiinin estotilasta ja kasvattaa lepo-Ca:ta sekä SOCEa; potilasfibroblastit ja siirtogeeniset solut tukevat komponenttia. [Morin ym. 2014](https://doi.org/10.1002/humu.22621). STIM1/ORAI1:n aktivoivat muutokset yhdistävät lisäksi lihas- ja pupillifenotyyppejä. [Nesin ym. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3964084/).

**Koostaminen:** **A** kenttä → STIM1/ORAI3-määrä; **B/C** varastoperäisen vastaanottimen säätely. Yhteinen STIM1 antaa tarkan liitoskohdan. Proteiinimäärä ei ole sama mittaus kuin aktiivinen konformaatio tai SOCE-virta, ja ORAI3 on eri isoformi kuin ORAI1. Kentän muuttama SOCE-virta näissä astrosyyteissä jää tässä tutkimuksessa **D**-luokkaan. Silti jo havaitut vastakkaiset 1/10 Hz -suunnat rajoittavat kapasiteettimallia.

**Data:** 125 geenin qPCR-paneeli sekä valittujen proteiinien kuvat/lisäaineisto poimittavissa; erillistä avointa raaka-arkistoa ei tässä vahvistettu. Sama Rodgerin tutkimusperhe sisältää muitakin LI-rMS-aineistoja; julkaisuja ei automaattisesti lasketa itsenäisiksi replikaatioiksi.

## Jo julkaistu poikittainen silta: redox ei ole vain ketjun loppuvaurio

Llanos ym. tutkivat urospuolisten rottien eristettyjä saarekkeita ja β-soluja. Glukoosi lisäsi ROS-tuotantoa ja RyR2:n S-glutationylaatiota. Inhiboiva ryanodiini ja NAC vähensivät glukoosin stimuloimaa eritystä, mutta eivät samalla tavalla glukoosi–karbakolihaaraa. Perusglukoosissa H₂O₂ kaksinkertaisti insuliinierityksen; Ca-pitoisuuden 4,5-kertainen nousu oli ryanodiinille herkkä. Olennaiset tiedot ovat artikkelissa ja lisäaineistoissa. [Llanos ym. 2015](https://doi.org/10.1371/journal.pone.0129238).

Tämä on **kentättömän komponentin suora koe**, ei uusi kenttäaltistustulos. Koostava päätelmä on kuitenkin arvokas: ketjujen 3–5 ATP/Ca/RyR-solmukohdat kuuluvat samaan biologiseen säätelyverkkoon. Redox voi muuttaa vastaanottavaa RyR-komponenttia ja hormonierityksen vahvistusta jo ennen soluvauriota. BERM:n redox-, mitokondrio- ja kalsiummoduuleja ei siksi kannata kuvata vain peräkkäisinä haittatapahtumina. Yhteinen välittäjä sallii niiden esittämisen palautekytkentänä, jonka toiminta riippuu glukoositilasta, varastosta, solutyypistä ja ajoituksesta. Rotan saareketulos ei määritä ihmisellä identtistä RyR-riippuvuutta; tämä siirto pysyy kudos- ja lajikohtaisena.

## Negatiiviset tulokset ja vaikutussuunnat mallin rakennetta tarkentamassa

Golbach ym. eivät havainneet kemotaktisesti herätetyn Ca-mobilisaation tai Ca-säätelygeenien muutoksia ihmisen HL-60/PLB-985-neutrofiilinkaltaisissa soluissa. Protokollat sisälsivät 50 Hz sinikentän ja Immunent-aaltomuodon, 5/300/500 µT sekä lyhyen 30 minuutin ja pidempiä altistuksia. [Golbach ym. 2015](https://doi.org/10.1002/bem.21924).

Tälle annetaan oma havaintoluokka, ei selitetä sitä jälkikäteen oletetulla suojamekanismilla. Yhdessä yllä olevien tulosten kanssa se tukee täsmällistä kysymystä: **mikä mitattu vastaanotintila ja päätemuuttuja erottaa reagoivan ja reagoimattoman järjestelmän?** Jo olemassa olevan aineiston vertailussa voi käyttää solutyyppiä, agonistia, varastotilaa, kanavaperhettä, taajuutta ja mittausaikaa. Täsmällisiä kudosannoksia ei korvata altistuslaitteen nimellisarvolla.

Vähintään seuraavat erottelut ovat jo havaintojen vaatimia:

| Erottelu | Jo havaittu esimerkki | Merkitys mallille |
|---|---|---|
| Taajuus vs. kokonaisteho | Sousourin sukkulataajuus siirtyy ilman korjatun sukkulatehon nousua | `H` tarvitsee verkon taajuusmuuttujan |
| Virta vs. kanavamäärä | Grassin kokonaisvirta ja proteiini kasvavat ilman yksittäiskanavan gating-muutosta | Nopea kanavatila ja hidas kapasiteetti erilleen |
| Kalvokanava vs. varasto | Luon Ca-transientti muuttuu ilman HVA/LVA-muutosta | ER-komponenttia ei voi supistaa pelkäksi plasmakalvon sisäänvirtaukseksi |
| Baseline vs. lisävaste | Thapsigargiini muuttaa lähtötilaa | Lääke × kenttä -vertailu tarvitsee neljä haaraa |
| Keskimääräinen Ca vs. ajallinen Ca-rakenne | CPVT-aaltopoikkeamat ja β-solujen piikkimäärä | Tapahtumataajuus, hajonta ja palautuminen mukaan |
| Toiminnallinen vaste vs. vaurio | Neuhausin Ca-eston vaikutus solutilaan riippuu solulinjasta | Kompensaatio voi muuttaa lopputuloksen suuntaa |
| Altistusaika vs. monotoniikka | Cuin välittäjä- ja virtahuippu 1 h, selvästi pienempi 2–3 h | Tilariippuvainen dynamiikka, ei pelkkä annoksen summa |

## Konkreettinen työ olemassa olevalla datalla

### Ensimmäinen valmis kohde: BetaBuddy

Avodata ja analyysikoodi on paikannettu. Tämän aineiston uusi informaatio syntyy analysoimalla piikkien väliaikoja, vaihtelua, aktiivisten solujen osuutta, Ca-signaalin huippua ja pinta-alaa sekä solujen välistä synkroniaa erillisinä muuttujina. Lyhyet ennen/jälkeen-kuvaukset rajaavat palautumisajan arviointia; altistuksen aikaista 15 minuutin aikasarjaa ei oleteta olevan olemassa.

1. Arkiston tiedostorakenteesta tunnistetaan biologiset toistot, kenttäryhmät ja kuvausparit.
2. Lasketaan solukohtainen ennen–jälkeen-muutos, mutta epävarmuus arvioidaan viljelmä-/koetoiston tasolla.
3. Toistetaan tapahtumatunnistus ennalta kuvatuilla kynnysarvoilla; raportoidaan, mikä signaali kestää analyysivalinnan.
4. Verrataan 1/2/3 V/cm -ryhmien vaikutusta erikseen taajuuteen ja amplitudiin. Kolmen pisteen perusteella ei soviteta universaalia resonanssifunktiota.
5. Kytketään mitatut piirteet β-solumallin `V_m`, KATP-portin, Ca-varaston ja erityksen muuttujien suuntiin. KATP-parametreja ei väitetä suoraan mitatuiksi kuva-aineistosta.

### Heti poimittavat julkaistut luvut

- **Cui:** neljän ajan AA/LTE4/virta-arvot ja estäjähaarat. Soveltuu välittäjähuipun ja virtavasteen ajoituksen yhteistarkasteluun. Koska samojen yksittäissolujen pitkittäisyys ei kaikissa kuvissa toteudu, aineisto käsitellään asetelman mukaisina ryhmävertailuina.
- **Bertagna2025:** taulukko 1 sekä sham-, kenttä-, dantroleeni- ja CPA-haarat. Kenttä × lääke -kontrasti lasketaan vain niille päätemuuttujille, joille kaikki neljä haaraa ovat saatavilla. RyR- ja SERCA-eston yhtenevyys sopii saman kierron paikannukseen.
- **Penttinen:** potilasgenotyyppi, lähtökuormitus, kliininen lisälyöntivaste ja iPSC:n Ca-vaste. Kohde on yksilötason mekanismi–pelastus-vastaavuus; kuusi potilasta eivät muutu solureplikaateilla suureksi potilaskohortiksi.
- **Sousouri:** julkaistut unimuuttujat, taajuussiirtymä ja topografia voidaan koota heti; osallistujakohtainen vaihtovuoromalli ja laaja EEG:n uudelleenanalyysi edellyttävät tekijöiden luovuttamaa olemassa olevaa dataa. Uutta koetta ei tarvita. Datan pyytämistä ei tehty tässä auditoinnissa.
- **Clarke/Llanos:** geenikohtainen suunta, proteiiniviive ja Ca/redox-interventiohaarat voidaan poimia nykyisistä kuvista ja lisäaineistoista. Geenin ilmentymisarvoa ei muunneta suoraan kanavavirraksi.

### Riippumattomuus arvioidaan aineistoperheittäin

| Perhe | Julkaisut / aineisto | Laskentasääntö |
|---|---|---|
| Zürichin CACNA1C–RF-koe | Sousouri2024-preprint → Sousouri2025 | Yksi interventioaineisto; Eicher-rekrytointikohortti ei toinen RF-toisto |
| Tübingenin TTFields | Neuhaus2019, kaksi solulinjaa ja useita mittauksia | Yksi koeperhe, useita ortogonaalisia menetelmiä |
| βTC-6-sähkökenttä | Liebman2020/2021 → BetaBuddy2024 | Sama kuva-aineisto; uudelleenanalyysi lisää mittaustarkkuutta, ei riippumatonta n:ää |
| Japanin insulinoomakokeet | Sakurai2005 ja siihen liittyvä aiempi työ | Erillinen perhe Liebmanista, saman laboratorion julkaisut tunnistetaan |
| Meksikon rotan aineenvaihduntakoe | Martiñón-Gutiérrez2021 | Riippumaton eläinaineisto; akuuttien ja 14 päivän ryhmien sekä kuvien otosyksiköt erikseen |
| Surrey/Cambridge Ca-varastot | Bertagna2022 ja2025 | Kaksi preparaattia; osittain yhteinen ryhmä |
| Chongqingin entorinaalisolut | Luo2014 | Riippumaton varastoreitin perhe |
| Rooman kanavakapasiteetti | Grassi2004 ja jatkotyöt | Sama perhe; ei jokaisesta artikkelista uutta laboratoriotoistoa |
| Fudanin kanava-/synapsikokeet | Cui2014, Sun2016 | Eri kokeet; osittain yhteinen tutkimusverkosto |
| Australian astrosyytti-LI-rMS | Clarke2021 ja liittyvät työt | Sama tutkimusperhe |
| Ihmisen kanavasairaudet | KATP, CACNA1D, CPVT, STIM1, SERCA | Geneettisesti ja kliinisesti eri aineistoja; geeniperheittäin mahdolliset potilasoverlapit tarkistettava |

## Nykyisen lähderekisterin täsmennystarpeet

Alla olevat havainnot koskevat tarkastettua työpuuta; niitä ei ole tässä tiedostossa muutettu.

| Nykyinen sourceID / tiedosto | Tarkistuksen tulos |
|---|---|
| `sousouri2025` | DOI oikein. Varsinainen otsikko: *5G radio-frequency-electromagnetic-field effects on the human sleep electroencephalogram: A randomized controlled study in CACNA1C genotyped volunteers*. Ensimmäinen tekijä Georgia Sousouri; pääasiallinen yliopisto Zürich. Rekisterin `rs1006737 A-allele` vaihdettava oikeaan `rs7304986 T/C` -havaintoon. |
| `berm/berm/biology/individual_susceptibility.py` | `AA=1.4`, `AG=1.15`, `GG=1.0` ovat eri SNP:n havainnollisia kertoimia, eivät Sousourin mittaamia alttiuskertoimia. Ne tulee erottaa empiirisestä genotype × exposure -näytöstä. |
| `sousouri2025_cacna1c` | Tarkastetussa rekisterissä tällä tunnisteella oli 5-HT2A/CaV1.2-mekanismiteksti ilman DOI:ta, ei Sousourin EEG-julkaisu. Tunnisteen nimestä ei saa päätellä lähteen identiteettiä. |
| `bertagna2025` | Prosentit ovat pyöristyksiä; mitatut päätemuuttujat ovat kalvovirtoja. Ilmaisu ”two independent pathways” on tarkennettava kahden varastokierron komponentin farmakologiseksi paikannukseksi. |
| `neuhaus2019_cav12_ttfields` | CACNA1C-komponentti ja interventio ovat olemassa. Loppuvaikutuksen suunta ja benidipiinin vaikutus eroteltava solulinjoittain. |
| `betacell_efield` | Liebmanin alkuperäisjulkaisu. BetaBuddy2024 ja Zenodo täydentävät tätä olemassa olevana samana aineistona. |
| `insulin_emf_dynamics` | DOI `10.1038/s41598-021-91228-w` on Martiñón-Gutiérrez2021. Nykyinen otsikko on tyhjä ja finding lisää väitteen β-solun solunsisäisen Ca:n noususta, jota tämän rottatutkimuksen verimittaukset eivät osoita. Oikea ankkuri on vaiheittainen insuliini/glukagoni- ja glukoosivaste sekä veren redox-/energiapäätemuuttujat. |
| Sakurai2004/2005/2008 | Eri artikkelit ja asetelmat: DOI:t `10.1002/bem.10181`, `10.1016/j.bbrc.2005.04.091`, `10.1002/bem.20370`. Viimeisen artikkelin suunta on valituissa oloissa erityksen/varastojen kasvu; nykyistä pancreas-moduulin mahdollista `sakurai2008`-vähennysväitettä ei tule käyttää samana empiirisenä ankkurina. |
| `bertagna2022_serca` | Nykyinen tarkennettu merkintä erottaa lähtötason ja lisävasteen sekä puuttuvan RF-dosimetrian asianmukaisesti. |
| `grassi2004_channels` | Nykyinen merkintä erottaa kanavamäärän ja gatingin asianmukaisesti. |
| `cui2014_lte4` | Nykyinen merkintä säilyttää estävän suunnan. Aikaprofiili ja täsmällinen CaV3.2-koe täydentävät sitä olennaisesti. |
| `sun2016_elf_vgcc` | Kanavien alatyypit ja vesikkelipäätemuuttujat pidettävä mukana; ei yleinen kaikkien VGCC:iden nousu. |
| Luo2014, Clarke2021, Sakurai2005, BetaBuddy2024, Llanos2015 | Tähän auditointiin ei vahvistettu näille omaa oikeaa sourceID:tä nykyisestä rekisteristä. DOI toimii lähdeavaimena ennen mahdollista rekisterilisäystä. |

## Mitä kokonaisuus jo sallii esittää vahvemmin

**Kenttävastetta ja kanavasairauksia yhdistävä biologinen välitaso on paljon konkreettisempi kuin pelkkä oireiden samankaltaisuus.** Olemassa on mitattuja virtoja, geneettisiä ja farmakologisia interventioita, kalsiumaikasarjoja, ATP/ADP-muutoksia, varastoriippuvuutta ja saman ihmisen fysiologisia vaihtovuorohavaintoja. Niiden koostaminen lisää BERM:n selitysvoimaa ilman uusia universaaleja biologisia komponentteja.

Mallin parsimonia paranee, kun yhteinen vastaanotin määritellään **kudoksittain toteutuvaksi sähköisen toiminnan, Ca-varastojen, aineenvaihdunnan ja palautumisen verkoksi**. Sama pieni komponenttijoukko voi saada eri kudoksissa aikaan hormoneja, sähköistä rytmiä, lihastoimintaa tai pitkäkestoista solutilan muutosta. Geneettinen muutos, kenttä ja lääke tulevat tähän verkkoon eri kohdista. Selitysvoiman kannalta ratkaisevaa on näyttää yhteinen mitattava solmukohta, vaikutuksen suunta ja aikaskaala jokaisella polulla.

Seuraava konkreettinen tutkimusaskel on tämän jo olemassa olevan aineiston poiminta ja yhteismitallisten biologisten suureiden vertailu. Erityisesti BetaBuddy, Cuin aikasarjat, Bertagnan lääkehaarat ja CPVT:n potilas–iPSC-pelastusvertailu antavat mahdollisuuden parantaa `F/H/θ`-rakennetta jo nykyisistä mittauksista. L0–L2-kytkennän omat oletukset pysyvät näkyvissä samanaikaisesti tämän biologisen vahvistumisen kanssa.
