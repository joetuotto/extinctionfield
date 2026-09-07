# BERM: lisääntymisen, kalenteriajan ja vuorovaikutuksen täydentävä evidenssi

Tutkimuspäivä 7.9.2026. Tavoite on vahvimman perustellun synteesin rakentaminen. Mallia tai sivustoa ei muutettu. Tarkistettiin nykyinen `reproductive_calendar.py`, `interactions/ecology.py`, `interactions/social.py`, niiden dokumentaatio ja saman päivän integraatioauditointi. Neljää ensisijaista alla käsiteltyä tutkimusta eikä Centolan täydentävää verkkotutkimusta löytynyt sivuston lähderekisteristä tekijä-, otsikko- tai DOI-haulla.

**Keskeinen lisäys:** nykyinen malli pystyy jo laskemaan odotusta, pariteettia ja verkkojen muutosta. Suurin evidenssiaukko koskee sitä, mikä havaittu tapahtuma vastaa kutakin biologista porttia ja miten portin ajankohta muuttaa myöhempien tapahtumien mahdollisuutta. Tästä seuraa vahva jatkopäätelmä: väliaikainen biologinen häiriö voi jättää pysyvän jäljen toteutuneeseen lapsilukuun tai ekologiseen rekrytointiin, vaikka yksilön toimintakyky myöhemmin palautuisi kokonaan. Vahvistettava mekanismi on menetetty aika ja vuorovaikutusikkuna.

## Lähtö premisseistä

Lindgrenin vuoden 2025 premissi on

\[
g=\eta+\kappa A\otimes A.
\]

Kun \(A=A_b+a\), saadaan algebrallisesti

\[
\delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Tämä on L1-seuraus. Biologiseen tilaan vievä operaattori \(K(S)\) on edelleen **avoin L2-oletus**. Ehdollinen jatko voidaan kirjoittaa

\[
\delta g\xrightarrow{K_i(S_i)}\delta S_i
\rightarrow \{p_i,q_i,\phi_i,\tau_i\}
\xrightarrow{\mathcal A} \text{syntyvät lapset, kohtaamiset, rekrytointi}.
\]

\(p_i\) on nimettyyn vaiheeseen pääsemisen todennäköisyys, \(q_i\) tämän jälkeen tapahtuvan menetyksen riski, \(\phi_i\) toiminnan ajoitus ja \(\tau_i\) palautumis- tai odotusaika. Alla olevat tutkimukset rajaavat näitä alempia siirtymiä. Ne eivät osoita, että ympäristökenttä muuttaa niitä, eivätkä validoi Lindgren-geometriaa.

## 1. Havaitsematon varhainen menetys voi näyttää hedelmöittymisen epäonnistumiselta

**Uusi suora lähde.** Wilcox ym. 1988 keräsivät 221 raskautta yrittävältä naiselta päivittäiset virtsanäytteet 707 kuukautiskierron ajalta. Herkällä hCG-määrityksellä havaittiin 198 implantaation jälkeistä raskautta; niistä 22 % päättyi ennen kliinistä tunnistamista ja kaikkiaan 31 % implantaation jälkeen. hCG-positiivisuus ei havainnoi kaikkia hedelmöittymisiä tai ennen implantaatiota tapahtuvia menetyksiä. [Alkuperäisjulkaisu, NEJM](https://www.nejm.org/doi/full/10.1056/NEJM198807283190401), [PubMed](https://pubmed.ncbi.nlm.nih.gov/3393170/).

**Nykyinen aukko.** Odotusmallin ensimmäinen hedelmöittyminen, kalenterimallin conception ja tutkimuksessa positiiviseen raskaustestiin päättyvä TTP voivat tarkoittaa eri tapahtumia. Jos kliinisen raskauden todennäköisyys syötetään biologiseksi hedelmöittymistodennäköisyydeksi ja sen päälle kerrotaan uudelleen varhaisen selviytymisen kerroin, sama menetys tulee kahdesti.

**Tarvittava liitos:**

\[
p_{\rm clinical}=p_{\rm fertilization}\,
s_{\rm fertilization\to implantation}\,
s_{\rm implantation\to clinical}.
\]

\[
p_{\rm livebirth}=p_{\rm clinical}\,
s_{\rm clinical\to 22w}\,
s_{\rm 22w\to livebirth}.
\]

Kullekin tutkimukselle määritellään erikseen ensimmäinen havaintokynnys ja siihen sisältyvät biologiset vaiheet. Portit ovat ehdollisia; tulo ei edellytä niiden riippumattomuutta.

**Uusi selitysvoima.** Sama havaittu TTP:n pidentyminen voi syntyä vähentyneestä hedelmöittymisestä, implantaation epäonnistumisesta tai lisääntyneestä varhaisesta menetyksestä. Näitä reittejä voi erottaa jo olemassa olevilla hCG-aikasarjoilla. Näin mallin redox-, paikalliskello- ja luteaalisen tuen hypoteesit saavat eri odotetut havaintokuviot. Pelkkä lopullinen raskaustestin tulos ei enää pakota niitä yhdeksi kapasiteetiksi.

**Data.** NIEHS:n Early Pregnancy Study -kuvaus vahvistaa päivittäiset näytteet, yhdyntä- ja vuotopäiväkirjat sekä ovulaation ajoittamiseen käytetyt hormonimääritykset. Julkiselta sivulta ei löytynyt avointa henkilötason latausta. Tässä ei tehty aineistopyyntöä. [NIEHS:n aineistokuvaus](https://www.niehs.nih.gov/research/atniehs/labs/epi/resources/data-sharing/eps).

## 2. Parin tila vaikuttaa eri tavoin raskaaksi tulemiseen ja raskauden jatkumiseen

**Uusi suora lähde.** Boxem ym. 2025, Generation R Next: 3 604 naista; TTP-analyysissä 3 067 episodia, keskenmenoanalyysissä 2 831 raskautta. Vain 33,2 % osallistujista liittyi ennen raskautta. Naisten 35–39,9 vuoden ryhmässä hedelmättömyyden odds ei lisääntynyt suhteessa 30–34,9-vuotiaisiin, mutta keskenmenon OR oli 2,03 (95 % LV 1,51–2,72). Kun molemmat kumppanit olivat vähintään 35-vuotiaita, keskenmenon HR oli 2,18 (1,53–3,10) ja OR 2,33 (1,61–3,37) suhteessa molempien alle 35-vuotiaiden ryhmään; yhteisikäluokissa ei havaittu yhteyttä fecundabilityyn tai hedelmättömyyteen. [Alkuperäisjulkaisu](https://link.springer.com/article/10.1186/s12916-025-04462-8).

**Nykyinen aukko.** Kalenterireitti erottaa jo conception- ja support-portit mutta antaa tuen lopputuloksen hedelmöittymishetkellä. Se ei vielä kuvaa raskausviikkokohtaista vaarafunktiota, havaintoon tulon ajankohtaa tai parien yhteisjakauman aineistosovitusta.

**Tarvittava liitos:**

\[
p_{ij,t}=f_C(S^F_{i,t},S^M_{j,t},\phi_{ij,t}),\qquad
s_{ij,t}=\prod_w[1-q_w(S^F_{i,t+w},S^M_{j,t},H_{ij})].
\]

\(H\) sisältää aiemman raskaushistorian. Aikavaiheet erotetaan empiirisen määritelmän mukaan. OR muutetaan riskiksi vasta tunnetulla vertailuriskillä:

\[
q_1=\frac{OR\,q_0}{1-q_0+OR\,q_0}.
\]

Keskenmenon HR tarvitsee vastaavasti vertailuvaaran; kumpikaan ei ole sellaisenaan syntyvyyskerroin. Alle 22 raskausviikon keskenmenoriskin komplementti ei yksin ole elävänä syntymän todennäköisyys.

**Uusi selitysvoima.** Biologinen muutos voi kohdistua ensin raskauden ylläpitoon, vaikka ensimmäisen raskauden saamisen mittari näyttäisi ennallaan. Lisäksi väestön lopputulos riippuu porttien yhteisjakaumasta:

\[
\mathbb E[p\,s]=\mathbb E[p]\,\mathbb E[s]+\operatorname{Cov}(p,s).
\]

Tämä identiteetti tekee parikohtaisen yhteisvaihtelun näkyväksi. Boxem ei vielä estimoi kaikkien BERM-tilamuuttujien kovarianssia, mutta osoittaa, että eri päätepisteet on mahdollista mitata samoilta pareilta. Ikä on tässä havaittu tilan selittäjä; ikävaikutuksen suuruutta ei siirretä kenttävaikutukseksi.

**Data.** Julkaisun taulukot ja liitteet ovat saatavilla; yksilödata on eettisistä ja yksityisyyssyistä hakemuksenvaraista. Julkaisussa itsessään käsitellään tunnistamattoman varhaismenetyksen sekoittumista pitkittyneeseen TTP:hen. Wilcox ja Boxem yhdistyvät siis nimenomaan havainto-operaattorin kautta.

## 3. Palautuva biologinen muutos voi jättää pysyvän pariteettivaikutuksen

**Uusi rakenteellinen vertailulähde.** Habbema ym. 2015 simuloi 10 000 paria käyttäen ikäriippuvaista raskautumista, menetyksiä, pysyvää hedelmättömyyttä ja IVF:ää. Parin lähtökohtainen hedelmöittymistaipumus säilyi myöhemmissä raskauksissa; synnytyksen jälkeen oletettiin 15 kuukauden väli ennen uutta yritystä. Ilman IVF:ää 90 %:n perhekoon saavuttamisen viimeinen aloitusikä oli mallissa 32 vuotta yhdelle, 27 kahdelle ja 23 kolmelle lapselle. Nämä ovat vuoden 2015 simulaation tuloksia, eivät tämän analyysin ajantasaisia henkilökohtaisia suosituksia. [Alkuperäisjulkaisu](https://pmc.ncbi.nlm.nih.gov/articles/PMC4542717/), [tekijöiden yliopistoarkiston kokoteksti](https://repub.eur.nl/pub/92426/REPUB_92426_OA.pdf).

**Nykyinen aukko.** Uusi kalenterimalli on jo olemassa, joten puutetta ei tule kuvata laskennallisen rakenteen puuttumiseksi. Tarvitaan ikä-, pariteetti-, menetys- ja uudelleenyritysvaiheiden empiirinen kalibrointi sekä pysyvän parikohtaisen heterogeenisuuden säilyttäminen pariteetin yli.

**Tarvittava liitos:**

\[
T_{n+1}=T_n+W_{n+1}+G_{n+1}+P_n+\sum_{\ell} L_{\ell}.
\]

\(W\) on odotus onnistuneeseen raskauteen, \(G\) sen kesto, \(P\) synnytyksen jälkeinen väli ja \(L\) menetyksiin ja uuteen yrittämiseen kulunut aika. Kaikki ajat kuluttavat samaa kalenteria. Todennäköisyys \(P(T_n\leq A_{\rm end})\) määrää horisonttiin mennessä saavutetun pariteetin.

**Mallin logiikasta seuraava vahva päätelmä.** Jos häiriö pidentää odotuksia tai lisää menetyksiä väliaikaisesti, myöhemmät yritykset tapahtuvat vanhempina. Toiminnan palautuminen ei palauta kulunutta aikaa. Siksi myöhempi pariteetti voi jäädä pienemmäksi ilman pysyvää kudosvauriota. Ehto on, ettei kaikkia viivästyneitä syntymiä ehditä korvata ennen tarkasteluhorisonttia tai lisääntymisikkunan päättymistä. Vaikutuksen koko riippuu aloitusiästä, tavoitellusta lapsiluvusta, biologisesta palautumisesta ja yritysten jatkamisesta.

Tämä mahdollistaa nykyistä täsmällisemmän väitteen: **biologisen haitan peruuttamattomuus ja toteutuneen lisääntymistuloksen peruuttamattomuus ovat eri asioita.** Malli voi selittää jälkimmäisen jo kalenterioperaattorilla. V17:n ennustetta ei tästä seuraa eikä sitä tarvitse käyttää kalibrointina.

**Data.** Julkaisussa on avoimet tulostaulukot, kuvaajat ja parametrioletukset. Se on empiirisiin lähteisiin rakentuva simulaatiotutkimus, ei uusi 10 000 parin havaintokohortti. Sitä voi käyttää operaattorin rakenteen ja vertailuskenaarioiden tarkistukseen; nykyiset IVF-kertoimet edellyttäisivät uudempaa aineistoa.

## 4. Ekologinen toiminta voi heiketä, vaikka kumpikin laji säilyy toimintakykyisenä

**Uusi kokeellinen ja pitkittäinen lähde.** Kudo ja Cooper 2019 yhdistivät 19 vuoden kasvi–kimalaisseurannan kolmen vuoden lumenpoistokokeeseen. Kuusi 5 × 5 metrin ruutua muodosti kolme käsittely–verrokkiparia, ja siementuotantoon merkittiin 20 kasvia ruutua kohti. Lumenpoisto aikaisti kukintaa keskimäärin 5,1 päivää ja vähensi luonnonpölytteistä siementuottoa (p=0,013). Pitkittäisaineistossa siementen ja siemenaiheiden suhde oli noin 60 % pienellä ajoituserolla ja noin 30 % kukinnan alkaessa seitsemän päivää ennen kimalaisten ilmaantumista. Käsinpölytettyjen kasvien siemensuhde oli 83–88 %. [Alkuperäisjulkaisu](https://pmc.ncbi.nlm.nih.gov/articles/PMC6571468/), [tekijöiden hyväksytty käsikirjoitus](https://eprints.lib.hokudai.ac.jp/repo/huscap/all/75198/KudoCooper_Proc.R.Soc.B286-20190573.pdf).

**Nykyinen aukko.** `EncounterEdge.modifier(state)` voi jo ottaa ajoituksen huomioon, mutta kutsujan on annettava koko funktio. Empiirisesti sovitettua ajallisen päällekkäisyyden muunnosta kohtaamiseksi ja onnistuneeksi pölytykseksi ei ole.

**Tarvittava liitos:**

\[
C_{ij}=\int k^0_{ij}\,B_i(t)F_j(t)\,v_{ij}(t)\,dt,
\qquad
R_j=N_{{\rm ovule},j}\,h(C_{ij},Q_j).
\]

\(B_i\) kuvaa pölyttäjien aktiivista määrää, \(F_j\) vastaanottavien kukkien määrää ja \(v_{ij}\) käynnin onnistumista. \(h\) on aineistosta sovitettava, mahdollisesti kyllästyvä siemenen muodostumisen vaste; \(Q\) kuvaa kasvin oman lisääntymistoiminnan kapasiteettia. Käsinpölytys auttaa erottamaan siitepölyn saatavuuden tästä kapasiteetista.

**Uusi selitysvoima.** Jos BERM:n ehdollinen tilamuutos vaikuttaa lajien ajoitukseen eri suuruisesti, vaikutus voi syntyä niiden välisessä suhteessa. Samansuuruinen yhteinen vaihesiirtymä ei automaattisesti heikennä päällekkäisyyttä. Siksi ennustettava suure on lajien vasteiden erotus suhteessa yhteiseen aikaikkunaan, ei kummankaan yksilön haittaindeksi yksin.

Tämä yhdistää mallin reseptori- ja tilariippuvuuden ekologiseen kumppaniriippuvuuteen: erilaiset \(K_i(S_i)\)-vasteet voivat muuttaa kohtaamista ennen populaatiomäärien muutosta. Lumenpoistokoe mittaa tämän alemman ajoitusliitoksen, ei sähkömagneettista syytä. Lajiryhmiin yleistäminen edellyttää niiden omia vasteita ja korvaavia pölyttäjiä.

**Data.** Dryadin julkinen rajapinta tarkistettiin onnistuneesti: DOI `10.5061/dryad.q4fm37m`, versio 1, julkaistu 22.5.2019, CC0. Aineistokuvaus ilmoittaa kuvaajien 1–4 lähdedatan tiedostossa `Kudo&Cooper_SourceData.xlsx`. Tässä tarkistettiin metadata, ei sovitettu aineistoa uudelleen. [Dryad-aineisto](https://doi.org/10.5061/dryad.q4fm37m).

## Täydentävä verkkoankkuri: koordinaation kynnykset riippuvat käyttäytymisestä ja muistista

Centola ym. 2018:n nimenantokokeessa oli 194 osallistujaa ja 10 verkkoryhmää. Kynnystä pienempien sitoutuneiden vähemmistöjen ryhmissä lopullinen uuden käytännön omaksuminen oli keskimäärin 6 % muista osallistujista. Vähemmistön osuuden ollessa 25–27 % omaksuminen oli 72–100 %. Suurin kokeessa epäonnistunut vähemmistö oli 21 % ja pienin onnistunut 25 %. Muistipituuden 9–13 aiempaa vuorovaikutusta sisältänyt mallisovitus ennusti noin 80 % valinnoista; muistipituutta ei biologisesti manipuloitu. [Alkuperäinen Science-julkaisu tekijöiden arkistossa](https://ndg.asc.upenn.edu/wp-content/uploads/2018/09/Experimental-evidence-for-tipping.pdf).

BERM:n nykyinen lineaarinen verkko-operaattori voi kuvata pienten muutosten etenemistä. Normin vaihtumiseen tarvitaan esimerkiksi

\[
m_i(t+1)=(1-\lambda_i)m_i(t)+\lambda_i o_i(t),\qquad
P(a_i(t+1)=1)=\sigma[\alpha_i+\beta_i m_i(t)+\gamma_i S_i(t)],
\]

missä \(o_i\) on kohdattu käyttäytyminen ja \(S_i\) erikseen mitattu biologinen tila. Tämä on ehdotettu liitos, ei Centolan tutkimuksen tarkka rekonstruointi tai siitä sovitettu kerroin. Tutkimus tukee paikallisista kohtaamisista syntyvää epälineaarista kollektiivista muutosta. Biologinen tila → muistin päivitys tai päätösparametri on yhä erikseen ankkuroitava. **25 % ei ole universaali yhteiskunnallinen eikä BERM:n kynnys.**

Julkaisu nimeää aineiston DOI:n `10.7910/DVN/11HUAG` ja [avoimen mallikoodin](https://github.com/NetworkDynamicsGroup/BestResponseNameGame). Dataverse-rajapinnan tarkistus palautti tässä istunnossa 401; aineiston todellista ladattavuutta ei vahvistettu. Lähteen ilmoitus julkisesta datasta ja tämän istunnon tekninen saatavuus erotetaan.

## Mitä tästä voidaan sanoa varmemmin

1. Lisääntymisen biologinen heikkeneminen voi ilmetä eri päätepisteissä: hedelmöittymisessä, implantaation jälkeisessä säilymisessä, kliinisen raskauden jatkumisessa tai seuraavan lapsen saavuttamisessa. Päätepisteiden erottamiselle on suoraa ihmisdataa.
2. Lyhytkestoinen toimintamuutos voi vaikuttaa pitkäkestoiseen lisääntymistulokseen kuluttamalla rajallista aikaa. Tätä varten ei tarvitse olettaa pysyvää molekyylivauriota.
3. Toiminnallinen ekologinen menetys voi syntyä ajoituserosta ja kumppanien kohtaamisesta ennen kummankaan lajin häviämistä. Tälle on sekä pitkä seuranta että kohdennettu interventio.
4. Vuorovaikutusmuutos voi näkyä voimakkaana vasta lähellä kollektiivista kynnystä. Lineaarinen levityskerroin ja normin vaihtumiskynnys ovat eri operaattoreita.

Näiden avulla BERM voi tehdä erottelevampia alempien tasojen ennusteita: havaintokynnyksen mukaan vaihtuva TTP-tulos, raskausviikon mukaan vaihtuva menetys, aloitusiän ja tavoitepariteetin mukaan kasvava viivevaikutus sekä lajiparin suhteellisen ajoituksen mukaan vaihtuva ekologinen vaste. Koko kentästä makroseuraukseen kulkeva ketju säilyy ehdollisena avoimelle L2-kytkennälle.
