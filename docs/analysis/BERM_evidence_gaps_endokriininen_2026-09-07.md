# BERM: endokriiniset ja lisääntymisen evidenssiaukot ja täydentävät mekanismit

7.9.2026. Tarkoitus on rakentaa vahvin lähteisiin sidottu steelman. Tämä on tutkimusmuistio: mallia, väiterekisteriä tai sivustoa ei muutettu. Työpuun tarkistus ja primaarilähteiden varmennus tehtiin tätä muistiota varten. Vanhat auditointiluvut eivät ole nykyisen muuttuvan työpuun kattavuuslukuja.

**Keskeinen uusi päätelmä on, että lyhyt ja palautuva molekyylitason häiriö voi käynnistää pitkäkestoisen, biologisen kehitysvaiheen muutoksen.** Lisäksi vastaanottimen kalvotila ja kello voivat säädellä toisiaan, ja lisääntymisen onnistuminen voi heikentyä normaalilta näyttävän hormonipitoisuuden, siittiöliikkeen tai ensimmäisen kiinnittymisvaiheen takana. Näille väitteille löytyy suoria komponenttikokeita, joista voi rakentaa täsmällisiä BERM:n jatkoketjuja.

## Premissistä etsittäväksi kontrastiksi

Lähtökohta on Lindgrenin vuoden 2025 muoto, ei vuoden 2021 singularinen muoto:

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_b+a.
\]

Tästä seuraa algebrallisesti

\[
\delta g_{\mu\nu}=\kappa(A_{b,\mu}a_\nu+a_\mu A_{b,\nu}+a_\mu a_\nu).
\]

Tämä on L1-seuraus. Kytkentä molekyyliin tarvitsee edelleen **avoimen L2-operaattorin**, esimerkiksi

\[
z_o(t)=\int K_o^{\mu\nu}(S_o(t),\tau)\delta g_{\mu\nu}(t-\tau)d\tau.
\]

Tässä `K` ja biologinen tila `S` ovat nimenomaisia siltapremissejä; niiden yksiköt, kytkentävahvuus ja vasteen etumerkki eivät tule pelkästä ansatzista. Alla ei oleteta, että jokin tunnettu biokemiallinen mekanismi automaattisesti toteuttaisi tämän operaattorin.

Ennen kirjallisuuden valintaa tästä ehdollisesta rakenteesta erotettiin neljä etsittävää kontrastia:

1. Jos vastaanotin on dynaaminen tila, kellon muutos voi muuttaa kalvoa ja kalvo puolestaan myöhempää kellovastetta. Pelkkä staattinen ravitsemuskerroin on silloin liian suppea.
2. Jos `S` sisältää kehitysvaiheen, sama molekyylisäätimen muutos voi olla voimakas yhdessä vaiheessa ja vähäinen seuraavassa. Palautuva alkuimpulssi voi muuttaa pysyvästi vaiheiden välistä jakaumaa.
3. Jos ulostulo tarvitsee oskillaation purkamisen oikeaksi solutoiminnaksi, solun määrä tai liikkuvuus ei riitä mittaamaan sen tiedonsiirtokykyä.
4. Jos lisääntyminen on peräkkäisten porttien prosessi, onnistuminen ensimmäisellä portilla ei takaa onnistumista seuraavalla. Eri paikalliskellojen häiriö voi näkyä eri raskausvaiheissa.

Nämä ovat BERM:n ehdollisen rakenteen tutkimussuuntia. Alla löydetyt tutkimukset mittaavat L3–L4-komponentteja; ne eivät mittaa Lindgrenin geometriaa tai tunnista `K`:ta.

## 1. Kellon ja kalvolipidien kaksisuuntainen silmukka

**Nykyinen aukko.** Mallissa ovat jo kellokoordinaatio, hormonaalinen vastaanottavuus ja kalvoon liittyvät vastaanotinmuuttujat. Alikäytetty yhdistelmä on, että kellotila voi muokata sitä kalvoa, jonka kautta myöhempi vaste syntyy. Kalvo ei ole vain ulkoa ravitsemuksella asetettava taustakerroin.

**Primaariset havainnot.** Perelis ym. 2015 yhdistivät saarekkeiden kellon ja insuliinin eksosytoosikoneiston: ihmisen saarekkeista löytyi 1 800 rytmistä RNA:ta, joista 481 oli hiiren rytmisten geenien ortologeja. Aikuisen beetasolun indusoitu kellon poisto heikensi eritystä; kyse oli myös aikuisiän toiminnan säätelystä. [Perelis 2015, Science, DOI 10.1126/science.aac4250](https://pmc.ncbi.nlm.nih.gov/articles/PMC4669216/).

Petrenko ym. 2020 näyttivät ihmissaarekkeissa kellon häirinnän yhteyden insuliini- ja glukagonirakkuloiden kiinnittymiseen ja eksosytoosiin. T2D-saarekkeiden heikentynyttä toimintaa voitiin osittain palauttaa nobiletiinilla. Esimerkiksi terveiden luovuttajien saarekkeissa eritys lisääntyi 3,5-kertaiseksi yhdessä 5,5 mM glukoosin protokollassa ilman vastaavaa uuden insuliinin tuotannon lisäystä. Kyse oli viljelykokeesta; nobiletiinin kaikki vaikutukset eivät paikannu yksinomaan kelloon. [Petrenko 2020, PNAS, DOI 10.1073/pnas.1916539117](https://pmc.ncbi.nlm.nih.gov/articles/PMC7007532/).

**Ratkaiseva lisäys** on Petrenko ym. 2022: ihmissaarekkeiden CLOCK-vaimennus vähensi kalvon fluiditeettia, ja sfingolipidisynteesin esto myriosiinilla aikaisti Per2-vaihetta ja lyhensi jaksoa. PDMP ei muuttanut rytmiä merkitsevästi, vaikka se vähensi voimakkaasti insuliinin eritystä; insuliinisisältö ei vastaavasti vähentynyt. Fluiditeetin interventiot perustuivat kolmeen ja kelloparametrit neljään luovuttajaan. Täysi lipidien aikasarja tehtiin kuudesta terveestä luovuttajasta; T2D-lipidivertailussa oli vain kaksi ajankohtaa. Tässä saadaan suoraa tukea sekä kello→kalvotila- että tietty lipidimetabolian häirintä→kello-yhteydelle. [Petrenko 2022, PLOS Biology, DOI 10.1371/journal.pbio.3001725](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001725).

**Uusi BERM-synteesi:**

\[
\dot C=F_C(C,L,z),\quad \dot L=F_L(L,C,N),\quad
H_{out}=F_{exocytosis}(C,L,Ca^{2+},H_{stored}).
\]

`C` on kellotila, `L` kalvon lipiditila ja `N` ravitsemus/metabolia. Jos L2-kytkentä muuttaa `C`:tä tai `L`:ää, jatkovaste muuttaa samalla myöhemmän vastaanoton lähtötilaa. Silmukan vahvistuminen tai vaimentuminen riippuu osittaisderivaatoista; kumpaakaan ei tule olettaa yleispätevästi.

**Varmemmin sanottava väite:** ihmisen endokriininen toimintahäiriö voi syntyä hormonin vapauttamisen ajallisesta ja kalvoon liittyvästä säätelystä, vaikka hormonivarasto säilyy. Kellon ja kalvotilan molemmat suunnat ovat mitattavissa samassa kudostyypissä.

**Mitä tämä selittää lisää?** Hormoni- ja ravitsemusreitit voivat olla saman dynaamisen prosessin osia. Aiempi tila voi muuttaa seuraavan ärsykkeen vaikutusta. Pelkkä CRY-proteiinin määrä, keskimääräinen hormonipitoisuus tai yksittäinen lipidinäyte voi jättää olennaisen vaihe- ja eksosytoosivirheen näkymättömiin.

**Aineisto ja jäljelle jäävä liitos.** Perelisin transkriptomiaineistoja on [GEO GSE69889:ssa](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE69889). Petrenko 2020 ilmoittaa eksosytoosin raakadataksi DOI [10.17632/bwnrghvcpt.1](https://doi.org/10.17632/bwnrghvcpt.1); julkaisu vahvistaa talletuksen, mutta arkiston sivu ei auennut tämän tarkistuksen verkkotyökalussa. Petrenko 2022:n [artikkelin S1–S4-aineistot](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001725) sisältävät lipidit, rytmit ja kuviokohtaiset numerot. Petrenko 2020/2022 ovat sama tutkimuslinja; donorikohtainen päällekkäisyys pitää tarkistaa ennen riippumattomuusväitettä. Ihmisen saarekkeen kalvokokeesta ei seuraa linnun Cry4a:n tai ihmisen lisääntymiselimen sama kytkentäkerroin.

## 2. Palautuva redoxmuutos → PTEN-portti → pysyvä reservin tilasiirtymä

**Nykyinen aukko.** `reproductive_state.py` erottaa jo munasarjareservin ja munasolun redoxlaadun. `coordination.py` antaa redoxille rakenteellisen toimintakertoimen. Puuttuva vahva mekanistinen yhdistelmä on niiden välissä: reservi voi kulua aktivoitumisen kautta ilman että kaikki poistuvat solut ensin kuolevat oksidatiivisesti.

Lee ym. 2002 osoittivat puhdistetussa PTEN:ssä ja soluviljelmissä H₂O₂:n palautuvan PTEN-inaktivoinnin. Aktiivisen kohdan Cys124 muodosti Cys71:n kanssa disulfidin; tioredoksiini osallistui palautumiseen. NIH 3T3 -soluissa hapettunutta PTEN:iä havaittiin 50 µM:n ulkoisella H₂O₂-pitoisuudella viiden minuutin käsittelyssä. Tämä paikantaa mahdollisen redox→fosfataasi-liitoksen, mutta kyseinen annos ei ole oosyytin tai ympäristöaltistuksen annos. [Lee 2002, JBC, DOI 10.1074/jbc.M111899200](https://pubmed.ncbi.nlm.nih.gov/11916965/).

Reddy ym. 2008 poistivat PTEN:n hiiren oosyyteistä: dormantti follikkelipooli aktivoitui ennenaikaisesti ja myöhemmin ehtyi. [Reddy 2008, Science, DOI 10.1126/science.1152257](https://pubmed.ncbi.nlm.nih.gov/18239123/). Jagarlamudi ym. 2009 paikansivat vaikutuksen kehitysvaiheeseen: vasta primaarifollikkelivaiheesta alkava PTEN-poisto lisäsi PI3K–Akt-signaalia mutta säilytti follikkelien kehityksen, ovulaation ja normaalin poikuekoon 6–30 viikon seurannassa. Sama molekyylimuutos ei siis tarkoita samaa hedelmällisyysseurausta eri kehitysvaiheissa. [Jagarlamudi 2009, PLOS ONE, DOI 10.1371/journal.pone.0006186](https://pmc.ncbi.nlm.nih.gov/articles/PMC2702689/).

**Kriittinen väliporras ei jää geenipoistoon.** Li ym. 2010 käynnistivät follikkelikehityksen lyhyellä PTEN-estolla ja/tai PI3K-aktivaatiolla. Hiirellä saatiin hedelmällisiä jälkeläisiä. Ihmisen munasarjan kuorikudos saavutti esikäsittelyn ja kuuden kuukauden ksenosiirron jälkeen preovulatorisen vaiheen ja oosyytin tumakypsymisen; ihmisen munasoluja ei hedelmöitetty. [Li 2010, PNAS, DOI 10.1073/pnas.1001198107](https://pmc.ncbi.nlm.nih.gov/articles/PMC2890455/).

Adhikari ym. 2012 vahvistivat lyhyen käynnistimen periaatteen: 24 tunnin 1 µM bpV(HOpic) -käsittely vastasyntyneen hiiren munasarjalle, siirto munuaiskapselin alle ja myöhempi hormonituki tuottivat kypsiä munasoluja. 149 siirretystä kaksisolualkiosta syntyi 29 poikasta; jälkeläisten hedelmällisyyttä seurattiin seuraavissa sukupolvissa. Lyhyt PTEN-esto ei siten tarvitse jatkuvaa geenipoistoa käynnistääkseen jatkokehityksen. [Adhikari 2012, PLOS ONE, DOI 10.1371/journal.pone.0039034](https://pmc.ncbi.nlm.nih.gov/articles/PMC3384593/).

**Uusi BERM-synteesi:**

\[
\dot q=k_{ox}H_2O_2(t)(1-q)-k_{red}Trx(t)q,
\]
\[
\dot N_d=-\{a_0+a_1\Phi[q,PI3K,FOXO,stage]\}N_d,
\quad
\dot N_a=\{a_0+a_1\Phi\}N_d-\ell N_a.
\]

`q` on inaktiivisen/hapettuneen PTEN:n osuus, `N_d` dormantti reservi ja `N_a` aktivoitunut pooli. Tämä on ehdotettu säilymis- ja siirtymämalli, ei kalibroitu oosyytin H₂O₂-annosvaste. `q` voi palautua täysin samalla kun `N_d` ei palaudu, koska jo alkanut kehitys jatkuu. Mallin muisti voi siis sijaita populaation koostumuksessa eikä pysyvästi hapettuneessa molekyylissä.

Jos ylikulutuksen lisäaktivaatio on ajan funktiona `Δa(t)≥0` eikä uutta dormanttia poolia synny tarkasteluvälillä, seuraa mallista

\[
N_{d,pert}(T)/N_{d,ref}(T)
=\exp[-\int_0^T\Delta a(t)dt].
\]

Tästä saadaan suuntapäätelmä ilman keksittyä kerrointa: toistuvien aktivointijaksojen vaikutus voi näkyä vasta myöhemmässä reservissä. Lyhyen aikavälin hyvä ovulaatio ei sulje pois myöhempää reservieroa. Yksi pieni aktivointipulssi ei kuitenkaan automaattisesti tarkoita patologista ehtymistä; aktivoituva osuus, toistuvuus ja lähtöreservi ratkaisevat.

**Varmemmin sanottava väite:** palautuvan signalointitilan muutos voi käynnistää pitkäkestoisen reproduktiivisen kehitysvaiheen. PTEN/PI3K-välitteisen follikkeliaktivaation olemassaolo, vaihekohtaisuus ja käynnistettävyys lyhyellä käsittelyllä ovat kokeellisesti tuettuja.

**Jäljelle jäävä join:** redoxin täytyy inaktivoida PTEN oikeassa oosyytin mikrolokaalissa riittävästi ja riittävän pitkäksi ajaksi. Lee + Li + Reddy eivät yhdessä ole tämän koko redoxsarjan mittaus samassa oosyytissä. Soveltuva uusi mittaus yhdistäisi PTEN-disulfidin/pAkt:n/FOXO:n sijainnin, follikkelivaiheen ja jäljellä olevan dormantin poolin. L2:n `z→paikallinen H₂O₂` on tämän yläpuolella edelleen erillinen. Reddy/Jagarlamudi/Adhikari ovat osittain sama tutkimuslinja; Li on eri tutkimusryhmän täydentävä kudosinterventio.

## 3. Siittiön määrä ja liike eivät mittaa oosyytin aktivointisignaalia

**Nykyinen aukko.** CatSper-haara kuvaa jo siittiön omaa kalsiumvasteista liikettä. Sen jälkeen on toinen, eri solussa toteutuva kalsiumportti: siittiön toimittama PLCζ käynnistää oosyytin aktivaation. Näitä ei pidä niputtaa samaksi Ca²⁺-tekijäksi.

Hachem ym. 2017 osoittivat kahdessa Plcz1-poistolinjassa puuttuvat normaalit munasolun kalsiumoskillaatiot, viivästyneen aktivaation ja polyspermian. Urokset olivat subfertiilejä eivätkä täysin steriilejä: vaihtoehtoinen aktivaatio saattoi harvoin onnistua. [Hachem 2017, Development, DOI 10.1242/dev.150227](https://pubmed.ncbi.nlm.nih.gov/28694258/).

Nozawa ym. 2018 tuottivat erillisessä tutkimuksessa kaikki koodaavat eksonit poistavan hiirilinjan. Siittiöiden tuotanto, muoto, liikkuvuus ja akrosomireaktio säilyivät. Silti poikasten keskiarvo parittelua kohden putosi 8,9:stä 2,3:een. ICSI:n jälkeen kaksisolualkioita syntyi kontrollissa 53/69 ja poistolinjassa 0/62. Ihmisen infertiliteettiin liittyvää mutaatiota kantavalla hiirellä Plcz1-mRNA:n lisäys ICSI:n yhteydessä palautti Ca²⁺-vasteen ja mahdollisti poikasten syntymisen. Tämä oli hiiren pelastuskoe, ei ihmisten hoitotulos. [Nozawa 2018, Scientific Reports, DOI 10.1038/s41598-018-19497-6](https://pubmed.ncbi.nlm.nih.gov/29358633/).

**Uusi BERM-synteesi:**

\[
p_{live}=p_{encounter}\,
p_{fusion\mid encounter}\,
p_{activation\mid fusion,S_s,S_o}\,
p_{implant\mid activation}\,
p_{maintain\mid implant}.
\]

Tämä on ehdollisten todennäköisyyksien ketju, ei oletus tekijöiden riippumattomuudesta. `S_s` sisältää siittiön signaalitoimituksen ja `S_o` munasolun IP₃-/Ca²⁺-vastaanottavuuden. ICSI ohittaa osan kohtaus- ja tunkeutumisporteista, mutta ei automaattisesti aktivointisignaalin puutetta.

**Varmemmin sanottava väite:** normaalit perustason siemennesteparametrit eivät takaa normaalia solujen välistä lisääntymissignalointia. Yhden siittiötekijän häiriö voi muuttaa sekä viivettä että polyspermian estoa ja pudottaa syntymätulosta.

**Mitä tämä selittää lisää?** BERM:n mies–nainen-pari on molekyylinen kytketty järjestelmä jo ennen sosiaalista parinmuodostusta. Häiriö voi siirtyä siittiöstä munasolun vasteeksi, joten miehen ja naisen erillisten keskimääräisten kapasiteettien kertominen ei tavoita kaikkia yhteisvaikutuksia. Sama keskimääräinen Ca²⁺ ei myöskään määritä piikkien määrää, viivettä tai aktivaation laatua.

**Data ja avoin liitos.** Nozawan kuvat, lisätaulukot ja Ca²⁺-videot mahdollistavat aktivointiviiveen, pronukleusten, polyspermian ja kehitysvaiheen yhteisanalyysin. Hachem/Nozawa ovat erillisiä poistolinjoja; niiden luonnollisen hedelmöityksen Ca²⁺-kuvauksissa on eroja, joten ne antavat yhteisen toiminnallisen rajoitteen eivätkä identtistä aaltomuotoa. Kenttä/redox/kello→PLCζ:n saatavuus tai oosyytin Ca²⁺-herkkyys jää tässä kokoamatta; geneettinen vaikutuskoko ei ole ympäristövaikutuskoko.

## 4. Lisääntymisen ajoitusportit ulottuvat hormonista istukkaan

Ma ym. 2003 paikansivat estrogeenin annoksen ja ajoituksen yhteisvaikutuksen progesteronilla valmistellussa, viivästetyn implantaation hiirimallissa. Matalampi ensimmäinen estrogeeniannos säilytti myöhemmän vastaanottavuuden, mutta suurempi saattoi sulkea ikkunan niin, ettei myöhempi lisäestrogeeni palauttanut implantaatiota. Tämä antaa tarkemman perustan kuin yleinen oletus “enemmän estrogeenia = parempi vaste”. [Ma 2003, PNAS, DOI 10.1073/pnas.0530162100](https://pmc.ncbi.nlm.nih.gov/articles/PMC151449/).

Ono ym. 2022:n PR-Cre/Bmal1-flox-hiirillä alkion ensimmäinen implantaatio saattoi toteutua, mutta myöhempi raskaus epäonnistui. Kontrollissa 7/8 naarasta synnytti eläviä poikasia, poistolinjassa 0/15. Progesteronilisän jälkeen 8/12 naaraasta saatiin eläviä poikasia keisarileikkauksella päivänä 20. Istukan verisuonirakenne ei kokonaan korjaantunut. PR-Cre ei sinänsä takaa vain kohdun yksinomaista geenipoistoa, ja BMAL1-poisto sisältää myös geenin muita kuin puhtaan vaiheensiirron vaikutuksia. [Ono 2022, IJMS, DOI 10.3390/ijms23147637](https://pmc.ncbi.nlm.nih.gov/articles/PMC9319876/).

**Synteesi:** reseptiivisyys on tilapolku `receptive→refractory`, ja elävänä syntymiseen tarvitaan erillinen implantaation jälkeinen portti. Tämä täydentää sivuston jo käyttämää Liu 2014:n munasarja/BMAL1/progesteroni-haaraa uudella kohde-elimen ja myöhemmän raskausvaiheen operaattorilla. Ensimmäinen kiinnittyminen ja raskauden ylläpito ovat eri biologisia päätepisteitä.

Kumpikaan koe ei yksin todista, että pieni ympäristön aiheuttama vaihevirhe tuottaa geenipoiston koko fenotyypin. Vahva käyttö on paikantaa operaattori, mitattava aikaväli ja pelastettavuuden raja. Onon progesteronitulosten yksikkö on artikkelitekstissä epäilyttävä (`ng/µL`), joten pitoisuuslukuja ei tule siirtää kalibrointiin ennen alkuperäismenetelmän/kuvien selvitystä.

## Alikäytetty vanha näyttö ja konkreettinen prioriteetti

Belchetz 1978:n GnRH-pulssikoe on jo sivuston `belchetz1978_gnrh_pulses`-lähteenä ja koordinaatioreitin evidenssissä. Sitä ei pidä laskea uudeksi löydöksi. Sen alikäytetty tehtävä on toimia yleisen “hormonin signaalimuoto on syötteen osa” -operaattorin ankkurina, jonka rinnalle tulevat edellä kuvatut kalvon eksosytoosi, dormantin reservin kehitysportti ja oosyytin aktivointipulssit. [Belchetz 1978, Science](https://pubmed.ncbi.nlm.nih.gov/100883/).

Tarkistuksessa keskeisten uusien DOI-tunnisteiden Perelis 2015, Petrenko 2020/2022, Reddy 2008, Li 2010, Hachem 2017, Nozawa 2018 ja Ma 2003 vastaavia osumia ei löytynyt sivuston pääbibliografiasta. Tuoreemmissa rinnakkaismuutoksissa tilanne voi muuttua. Ennen mahdollista rekisteröintiä tehdään vielä DOI-/alias-kohtainen tarkistus.

Suositeltu tutkimusjärjestys on:

1. **PTEN:n palautuva säätely ja kehityksellinen muisti.** Eniten uutta selitysvoimaa: muisti ei tarvitse jatkuvaa vauriota eikä jatkuvaa häiriötä. Lyhyen intervention ja myöhemmän kehityksen liitos on jo osoitettu.
2. **Kello↔kalvometabolia↔hormonin eritys.** Ihmiskudoksen interventiot ja saatavilla olevat aikasarjat tekevät tästä vahvan dynaamisen vastaanotintilan täydennyksen.
3. **PLCζ–oosyytti-soluraja.** Täydentää jo käytettyä CatSper-haaraa ja määrittää biologisen pariyhteisvaikutuksen sekä ICSI:n rajat.
4. **Implantaatio ja raskauden ylläpito erilleen.** Tekee syntyvyyden loppuketjusta tarkemman ja estää ensimmäisen raskaustapahtuman tulkitsemisen valmiiksi elävänä syntymisen todennäköisyydeksi.

Mikro–makro-liitos säilyy biologisena: edellä olevat tilamuutokset tuottavat parikohtaiset aktivaatio-, raskaus- ja syntymätodennäköisyydet; ne määrittävät odotusajat, menetykset ja käytettävissä olevassa lisääntymisajassa saavutettujen syntymien jakauman. Kun sama poikkeama tapahtuu monella yksilöllä, jakauma voi siirtyä väestötasolla. Suuruus tarvitsee paikallisen kytkennän, yleisyyden, aikaskaalojen ja käyttäytymisen yhteisjakauman, mutta biologista aggregaatiota ei tarvitse korvata irrallisella makroselityksellä.

Tämän muistion vahvistus koskee näitä täsmällisiä komponentteja ja niistä tehtyä ehdollista synteesiä. L2:n geometria→vastaanotin-kytkentä pysyy omana ratkaistavana tehtävänään.
