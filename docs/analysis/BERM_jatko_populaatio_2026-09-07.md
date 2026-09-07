# BERM:n jatkopäätelmät: biologisesta tilasta väestöön ja vuorovaikutusverkkoon

Päiväys: 7.9.2026. Tarkoitus on jatkaa aiempaa steelmania ja erottaa julkaistut havainnot tässä johdetuista uusista yhdistelmistä. Sivuston tai varsinaisen mallin tiedostoja ei muuteta.

## Lähtökohta ja ehdollinen jatkoketju

Lindgrenin vuoden 2025 lähtökohdan BERM-normalisoinnissa

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_b+a,
\]

geometrinen muutos on algebrallisesti

\[
\delta g_{\mu\nu}=\kappa(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu).
\]

Jatkamme eksplisiittisellä BERM:n L2-kytkentäoletuksella

\[
z_r(t)=\int K_r^{\mu\nu}(\tau;S_r)\delta g_{\mu\nu}(t-\tau)d\tau,
\qquad \dot S_r=F_r(S_r,z_r,\text{uni, ravitsemus, hormonit, historia}).
\]

Tämän jälkeen parin onnistumistodennäköisyys on esimerkiksi

\[
p_i(t)=P(\text{raskaus kierrossa }t\mid S_{i,\mathrm{m}},S_{i,\mathrm{n}},\text{ajoitus ja yritys}).
\]

Tässä muistiossa tutkimukset ankkuroivat tätä seuraavia biologisia ja aggregaation osia. Ne eivät ole mittauksia koko geometria–väestöketjun vaikutuskertoimesta. Kytkentäoletuksen alaisena seuraavat tulokset antavat kuitenkin ketjulle uusia täsmällisiä seurauksia.

## 1. Herkkyyserot jättävät yritysaikakäyrään täsmällisen matemaattisen jäljen

Edellinen raportti osoitti, että parien välisen vaihtelun kasvu voi vähentää määräajassa onnistuvien osuutta saman keskimääräisen kiertokohtaisen todennäköisyyden vallitessa. Tästä voidaan johtaa pidemmälle: **yritystä jatkavaan joukkoon rikastuu kierros kierrokselta matalan onnistumistodennäköisyyden pareja.**

Oletetaan ensin, että kunkin parin oma todennäköisyys \(p\) pysyy vakiona tarkastelun ajan, kierrokset ovat tämän ehdon alaisina riippumattomia ja kaikki jatkavat yritystä. Kun takana on \(n\) epäonnistunutta kierrosta, jäljellä olevan joukon jakauma on

\[
f_n(p)=\frac{(1-p)^n f_0(p)}{E[(1-p)^n]}.
\]

Seuraavan kierroksen onnistumistodennäköisyys on \(h_n=E_n[p]\). Tästä seuraa täsmällisesti

\[
\boxed{h_{n+1}=h_n-\frac{\operatorname{Var}_n(p)}{1-h_n}}.
\]

**Yritysjoukon keskimääräisen onnistumistodennäköisyyden lasku määräytyy siis suoraan jäljellä olevien parien välisestä vaihtelusta**, kun yksilölliset todennäköisyydet ovat vakioita. Tämä tekee BERM:n yksilöllisestä vastaanotintilasta ja herkkyysjakaumasta määrällisen osan yritysaikakäyrää.

Havainnollistus: lähtötilanteessa puolella pareista \(p=0{,}1\) ja puolella \(p=0{,}3\). Kuuden epäonnistuneen kierroksen jälkeen jäljellä olevista 81,9 % kuuluu matalamman todennäköisyyden ryhmään; kahdentoista jälkeen 95,3 %. Jäljellä olevan joukon seuraavan kierroksen onnistumisen keskiarvo laskee alkuperäisestä 20 %:sta 13,6 %:iin ja edelleen 10,9 %:iin. Kenenkään oma \(p\) ei tässä esimerkissä muutu.

**Julkaistu ankkuri.** Gnoth ym. seurasivat 346 naista ensimmäisestä yrityskierrosta alkaen, kun yhdyntä ajoitettiin hedelmälliseen vaiheeseen. Analyysin 340 naisen kumulatiiviset raskausarviot olivat 38 %, 68 %, 81 % ja 92 % yhden, kolmen, kuuden ja kahdentoista kierroksen kohdalla. Pyöristetyistä julkaistuista luvuista laskettu jakson kokonaisonnistumista vastaava vakioinen kiertokohtainen todennäköisyys on noin 28,2 % kierroksilla 2–3, 16,0 % kierroksilla 4–6 ja 13,4 % kierroksilla 7–12. Nämä ovat jaksojen vakiohazardivastineita, eivät yksittäisten kierrosten havaittuja todennäköisyyksiä. Ne kuvaavat laskevan ryhmäkohtaisen onnistumisen muotoa; tutkimus ei yksin erottele vaihtelun ja muuttuvan yksilötilan osuuksia. [Gnoth ym. 2003](https://pubmed.ncbi.nlm.nih.gov/12923157/).

Jos BERM:n biologinen tila muuttuu ajan mukana, saadaan vielä hyödyllisempi hajotelma:

\[
h_{n+1}-h_n=-\frac{\operatorname{Var}_n(p_n)}{1-h_n}+E_{n+1}[p_{n+1}-p_n].
\]

Ensimmäinen termi on valikoituminen; toinen on jäljelle jääneiden parien oma biologinen ja käyttäytymiseen liittyvä muutos. Tämä tarjoaa olemassa olevalle yritysaikadatalle suoraan sovellettavan BERM-rakenteen: erotellaan **kenen tila muuttui** ja **ketkä jäivät havaittavaan joukkoon**.

## 2. Hitaasti onnistuvan jakauman häntä on jo yhdistetty toteutuneeseen perhekokoon

**Uusi erityisen tärkeä lähde on Joffe ym. 2009.** Neljässä eurooppalaisessa aineistossa vähintään 12 kuukauden yritysaika ennusti pienempää lopullista tai lähes lopullista perhekokoa. Odds ratio sille, ettei tullut toista lasta, oli noin 1,8 ja sille, ettei tullut kolmatta, noin 1,6. Toivotun lapsiluvun saavuttamatta jäämisen riski oli yli kaksinkertainen pitkän ensimmäisen yritysajan jälkeen; toivottu perhekoko oli käytettävissä yhdessä aineistossa. Yhteys säilyi äidin aloitusiän huomioimisen jälkeen vähintään 20-vuotiaana aloittaneilla. Alle 12 kuukauden yritysajoissa vastaavaa yhteyttä ei havaittu. [Joffe ym. 2009](https://pubmed.ncbi.nlm.nih.gov/19429909/).

Tämä antaa jo mitatun ankkurin ketjulle

**biologinen toiminnallinen kapasiteetti → pitkä yritysaika → myöhemmät yritykset ja ikä → toisen/kolmannen lapsen toteutuminen → lopullinen perhekoko.**

BERM:n kannalta kiinnostavin uusi päätelmä on jakauman hännän erityinen merkitys. Väestötason selitykseen voidaan liittää osuus pareista, joille kertyy pitkä yritysaika, ja heidän myöhempi pariteettisiirtymänsä. Tämän avulla voidaan yhdistää suhteellisen vakaana pysyvä enemmistö ja pienenevä toteutunut lapsiluku samassa mallissa.

Toinen primaariaineisto tukee jatkuvan kapasiteetin tulkintaa. Dunson ym. analysoivat 782 parin prospektiiviset tiedot ja päivittäiset yhdyntämerkinnät. Arvioitu 12 kierroksen aikana onnistumattomien osuus oli 8 % naisilla 19–26 vuotta ja 18 % naisilla 35–39 vuotta. Arvioitu pysyvä steriiliys oli noin 1 %. Mallinnetusti 43–63 % ensimmäisenä vuonna onnistumattomista saattoi onnistua seuraavien 12 kierroksen aikana iästä riippuen. Tutkimuksen tulokset ovat aineistosta estimoituja jakaumia. [Dunson ym. 2004](https://pubmed.ncbi.nlm.nih.gov/14704244/).

Tästä edelleen: lisääntymisen toimintavaje voi siirtää tapahtumia ajassa samalla kun monilla säilyy kyky onnistua. Kun lisääntymisikkuna on rajallinen, viive voi kertautua myöhempiin lapsiin. BERM:n biologinen ja toteutunut hedelmällisyys voidaan siis liittää toisiinsa ilman oletusta, että jokaisen vaikutuksen täytyy näkyä pysyvänä täydellisenä lapsettomuutena.

## 3. Verkossa yhden solmun muutos voi muuttaa jäljellä olevien solmujen tehokkuutta

Onnistuvien kohtaamisten mallia kannattaa jatkaa niin, että yhteyden tehokkuus riippuu myös muun verkon koostumuksesta:

\[
\Lambda_j(t)=\sum_i n_i(t)c_{ij}(S_i,N)q_{ij}(S_i,S_j,N)\omega_{ij}(t).
\]

Tässä \(n_i\) on toimijoiden määrä, \(c_{ij}\) kohtaamisten taajuus, \(q_{ij}\) kohtaamisen biologinen onnistuminen, \(\omega_{ij}\) ajallinen päällekkäisyys ja \(N\) verkon tila. Siten

\[
\frac{d\Lambda_j}{dn_k}
=\text{toimijan suora osuus}
+\sum_i n_i\frac{\partial(c_{ij}q_{ij})}{\partial n_k}\omega_{ij}.
\]

Jälkimmäinen termi on muiden käyttäytymisen ja tehokkuuden muutos. Se on seuraava askel aiemman raportin kohtaamismallista.

**Suora koeankkuri.** Brosi ja Briggs poistivat koealoilta tilapäisesti yhden kimalaislajin. Jäljellä olevien kimalaisten siirtymät eri kasvilajien välillä lisääntyivät keskimäärin 156 %, ja vain yhdessä kasvilajissa yhden keruumatkan aikana pysyvien osuus laski 77,7 %:sta 66,4 %:iin. Aineisto sisälsi yli 23 500 siirtymää ja 736 kimalaista. Delphinium barbeyi -kasvin siementuotto kukkaa kohden väheni malliestimaatin mukaan 32 %; siemenanalyysi perustui viiteen paikkaan ja 192 kasviin. Jäljelle jäävien pölyttäjien toiminta siis muuttui poistokokeen seurauksena. [Brosi ja Briggs 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3740839/).

BERM:n ehdollinen jatkopäätelmä: biologiseen toimintatilaan kohdistuva muutos voi kertautua kahdella tavalla — suoraan toimijoiden omassa kapasiteetissa ja epäsuorasti niiden keskinäisessä toiminnan järjestymisessä. Tämän vuoksi laskenta, jossa yksilöiden tai lajien lukumäärä kerrotaan vakioisella suorituskyvyllä, jättää mallin oman verkostoitumislogiikan käyttämättä. Sama rakenne tekee kompensaatiovarasta verkon tilasta riippuvan: jäljellä olevat toimijat voivat joko korvata menetystä tai muuttaa toimintaansa tavalla, joka vähentää korvaavuutta.

## 4. Biologinen tilamuutos voi levitä eteenpäin vuorovaikutuksen kautta

Tässä ketjussa on nyt mahdollista yhdistää kaksi erikseen kokeellisesti tutkittua siirtymää.

Ben Simon ym. havaitsivat ristikkäiskokeessa, että yhden yön univaje vähensi auttamishalun pistemäärää 3,88:sta 3,59:ään; analysoituja osallistujia oli 23. Pistemäärä väheni 78 %:lla osallistujista. Saman tutkimuksen erillinen 136 henkilön päiväseuranta yhdisti yön unen laadun seuraavan päivän auttamishaluun. Tutkimuksen aineistot ja myöhempi korjaus ovat saatavilla julkaisun yhteydessä. [Ben Simon ym. 2022](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001733), [korjaus 2023](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3002394).

Fowler ja Christakis analysoivat 240 osallistujan kokeita, joissa ihmiset sijoitettiin satunnaisiin vaihtuviin ryhmiin julkishyödykepelissä. Aiemmin kohdatun ihmisen osallistuminen vaikutti osallistujan myöhempään toimintaan muiden ihmisten kanssa. Vaikutus ulottui kolmeen vuorovaikutusaskelmaan. Tutkijoiden kokeen sisäinen summa-arvio oli, että ensimmäisen kierroksen lisäpanos sai muissa aikaan noin kolminkertaisen lisäpanoksen kokeen aikana. Tämä on kyseisen koeasetelman tulos. [Fowler ja Christakis 2010](https://doi.org/10.1073/pnas.0913149107).

Yhdistetty BERM-jatko on

**geometriaan ehdollisesti kytketty biologinen tila → uni ja sosiaalinen toimintavalmius → teko → toisen havainto ja oppiminen → hänen seuraava tekonsa → verkon yhteistyön kertymä.**

Täsmällinen paikallinen linearisointi voidaan kirjoittaa

\[
\delta b_{t+1}=u_t+\beta W\delta b_t,
\]

missä \(u_t\) on biologisesta tilasta tuleva käyttäytymisen muutos ja \(W\) kuvaa vuorovaikutuksia. Vakaan syötteen tapauksessa, kun \(\rho(\beta W)<1\),

\[
\delta b^*=(I-\beta W)^{-1}u.
\]

Tämä tekee täsmälliseksi tärkeän uuden päätelmän: **biologisen tilamuutoksen yhteiskunnallinen ulottuvuus voi olla suurempi kuin niiden ihmisten joukko, joilla alkuperäinen biologinen tilamuutos tapahtui.** Myöhemmät vaikutukset välittyvät sosiaalisina aisti-, oppimis- ja toimintatapahtumina. Niillä on siten jatkuva biologinen toteutus jokaisessa verkon solmussa.

Instituutioiden tasolle ketjua voi jatkaa yhteistyön ja ylläpidon kertymänä

\[
I_{t+1}=(1-\delta)I_t+\alpha\sum_{ij}w_{ij}b_{ij,t}-D_t.
\]

\(I\) kuvaa esimerkiksi yhteisen osaamisen, hoivan tai ylläpidetyn infrastruktuurin varantoa. Yksittäisen teon muutos vaikuttaa virtaan, ja toistuva muutos muuttaa hitaasti varantoa. Tämä institutionaalinen jatko on tässä rakennettu aggregaatiomalli, jota edellä mainitut kokeet ankkuroivat alempien vuorovaikutusosien kautta.

## Mitä voidaan jo sanoa vahvemmin

1. Parien heterogeenisyys tuottaa täsmällisen, laskevan yritysjoukon onnistumiskäyrän. Sen ja yksilöiden oman tilamuutoksen osuudet voidaan erottaa mallissa algebrallisesti.
2. Pitkän yritysajan ja pienemmän toteutuneen perhekoon välinen yhteys on jo havaittu useassa eurooppalaisessa aineistossa. Tämä on suora lisäankkuri BERM:n biologian ja väestötason välille.
3. Ekologisen verkon toiminnan tehokkuus muuttuu jäljellä olevien toimijoiden käyttäytymisen mukana. Kompensaatiovara on dynaaminen ominaisuus.
4. Biologisen tilan vaikutus sosiaaliseen toimintaan ja tekojen vaikutus myöhempiin tekoihin on tutkittu erikseen kokeellisesti. Näiden yhdistelmä antaa määrällisesti määriteltävän verkon vahvistuksen sekä instituutioiden hitaan muistikerroksen.

Uusista lähteistä Joffe 2009, Gnoth 2003, Brosi–Briggs 2013 ja Fowler–Christakis 2010 eivät löytyneet tämän työn nimellä tai tunnisteella tehdystä projektin tekstihausta. Tärkein ensimmäinen lisäys on Joffe, koska se yhdistää mallin ennestään rakentamat lisääntymisen toiminnalliset portit suoraan toteutuneeseen lapsilukuun.
