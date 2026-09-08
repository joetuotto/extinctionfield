# Lisääntymissuppression käyttäytymisprofiilin integraatio BERM:iin

**Tutkimus- ja integraatioanalyysi, 8.9.2026.** Lähtöaineisto: käyttäjän toimittama *Lisääntymissupression käyttäytymissyndrooma: Eläinmallista ihmispopulaation analyysiin*, versio 1.0. Tarkastelu rakentaa sen vahvimman tutkimuksellisesti perustellun muodon BERM:n omasta logiikasta.

## Johtopäätös

Kokonaisuus kannattaa integroida **käyttäytymis- ja sivilisaatio-osien väliseksi keskeiseksi mekanismisynteesiksi**. Se yhdistää lisääntymisen neuroendokriinisen säätelyn, koetun halun, hoivan kohdentumisen, sosiaalisen vuorovaikutuksen ja väestötason palautteen. Sen paras selityslisä on osoittaa, miten yhteiset biologiset säätelyreitit voivat tuottaa useita koordinoituja mutta myös ennustettavasti eriytyviä ulostuloja.

Nykyisestä mallista puuttuu ennen kaikkea osien täsmällinen liittäminen: kahdeksan käyttäytymisakselia, neljä peittymisen tasoa ja useita ihmisinterventioita on jo mukana. Eläinten suppression ja vapautumisen koesarjat, prolaktiinin eri kohdereitit ja lisääntymisen verkostoaineistot syventävät tätä rakennetta huomattavasti. Kanonisen kaavion käyttäytymishaara täytyy myös yhdistää lisääntymisen yrityksiin yhtä johdonmukaisesti kuin sivuston tekstissä ja laajassa kausaaliatlaksessa jo tehdään.

Tämä analyysi tuottaa kirjallisuustarkistuksen ja täsmällisen vaikutuskartan. Mallia, sivustoa, ennustetuloksia tai julkaisua ei muutettu tässä vaiheessa. Uusia kenttä- tai laboratoriokokeita ei tarvita tämän integraatiosuunnitelman toteuttamiseen.

## 1. Mitä tarkistettiin ja mitä on jo valmiina

Alkuperäistä työtilaa verrattiin etähaaran `main` versioon `9b7dbc600bc8e2cac616e291fb3a72592fd8cef3`. Keskeiset käyttäytymis-, sivilisaatio-, koordinaatio-, claim- ja kausaalirakennetiedostot vastaavat sitä. Proxy masking -sivulla ero koskee redox-komponentin järjestystä, ei sen sisältöä. Tämä rajattu vertailu ei anna aihetta palauttaa vanhoja versioita tai korvata työtilan muuta keskeneräistä työtä.

Myös julkisten `/fi/behavior`- ja `/fi/model/proxy-masking`-sivujen HTML vastasi tarkistettuja sisältöhavaintoja: halu/hoiva/yritys-erottelu sekä syndrooman fragmentaatio ja kahdeksan akselia olivat saatavilla. Tässä tehtiin sisällön lukutarkistus; käyttöliittymän toiminnallista testausta ei tarvittu analyysitiedostojen luomiseen.

Nykyiseen rakenteeseen kuuluu 47 kanonista solmua ja 97 reunaa sekä laajempi Atlas. Viiteindeksissä on 1 274 lähdettä. Kokonaisuuden kannalta jo olemassa ovat:

- `/behavior#desire`: halu, vastaanottavuus, kiintymys, hoiva ja yrityksen onnistuminen erotellaan biologisen ketjun osiksi.
- `/model/proxy-masking#syndrome-fragmentation`: kahdeksan vertailuakselia ja niiden yhteinen claim.
- `/model/proxy-masking#receiver-state`: sosiaalisen vihjeen ja vastaanottajan biologisen tilan yhteys.
- Biologisen koordinaation hormoni-, reseptori-, redox-, ajoitus- ja muistirakenteet.
- Epistapegen yksilöstä väestöön kokoaminen ja institutionaalinen muisti sekä erillinen sosiaalisen verkoston operaattori.

Tarkat tiedostot, ankkurit ja funktiot on dokumentoitu [integraatioinventaarioon](integration_inventory.md). Eläinlähteiden tulokset ja korjaukset ovat [eläinnäytön muistiossa](animal_evidence.md), ihmistutkimukset ja aineistot [ihmisnäytön muistiossa](human_evidence_and_data.md), uudet kohdereitti- ja verkostosillat [mekanismimuistiossa](mechanistic_bridges.md).

## 2. Paikka BERM:n fysikaalisessa ja biologisessa logiikassa

Lähtökohta on BERM:n nykyinen, vuoden 2025 Lindgren-formulaatioon perustuva arkkitehtuuri. Sen geometrinen ansatz ja kentän ositus ovat:

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_{bio}+a_{ext},
\]

jolloin algebrallinen muutos on

\[
\delta g_{\mu\nu}=\kappa(A_{bio,\mu}a_{ext,\nu}+a_{ext,\mu}A_{bio,\nu}+a_{ext,\mu}a_{ext,\nu}).
\]

Tämä on nykyisen `berm/berm/physics/lindgren_response.py`-toteutuksen geometrinen lähtökohta. Biologinen suure seuraa vasta BERM:n ehdollisen, tilasta ja kudoksesta riippuvan L2-vasteen kautta. Gauge-valinta, fysikaalinen skaala, kudosvaste, etumerkki, viive ja ihmispäätepisteen kalibrointi eivät määräydy yllä olevasta algebrasta. `χ_geo` ei ole kudosherkkyys. FieldState voi toimittaa fysikaalisen syötteen mittausta tai estimaattia, ei tämän käyttäytymisprofiilin selitystä.

Tähän runkoon uusi kokonaisuus asettuu seuraavasti:

```
BERM:n fysikaalinen premissi
  → ehdollinen L2-vaste nimettyyn biologiseen suureeseen
  → nykyiset Ca/redox/kello/metabolia/hormonireseptoritilat
  → lisääntymisen aktivoivat ja estävät neuroendokriiniset reitit
      → seksuaalinen ja kumppaniin suuntautuva motivaatio
      → hoivavihjeiden vastaanotto ja hoivan kohdistuminen
      → fysiologinen lisääntymiskyky
  → toimijoiden kohtaamiset, yritykset ja niiden ehdollinen onnistuminen
  → ikäkohtainen lisääntyminen ja väestön uusiutuminen
  → kontaktiverkot, käytännöt ja instituutiot
  → seuraavan ajankohdan fysikaaliset ja sosiaaliset syötteet
```

Eläin- ja ihmisinterventiot voivat vahvistaa keskivaiheen toiminnallisia yhteyksiä. Verkosto- ja väestöaineistot rajaavat myöhempää koostamista. EMF:n käynnistämä koko reitti säilyy BERM:n ehdollisena synteesinä niiltä osin, joilta sitä ei ole mitattu. Tämä pitää tutkimuksen vahvan tuloksen juuri siinä kohdassa, jonka koe tunnistaa.

## 3. Tutkimuksellisesti vahvimmat palaset

### Valikoiva lisääntymisjarru on jo kokeellisesti osoitettu

Peragine ym. 2017:n RFRP-3-interventio *Heterocephalus glaber* -lajilla vähensi seksuaalisesti kohdennettua tutkimiskäyttäytymistä ja esti progesteronin nousua, samalla kun useita muita sosiaalisia ja motorisia toimintoja säilyi. Tämä on suora osamekanismin ankkuri ajatukselle, että organismi voi suuntautua vähemmän lisääntymiseen ilman kaiken toimintakyvyn katoamista. [PNAS](https://doi.org/10.1073/pnas.1616913114).

Marmosettien hormonialtistukset ja sosiaaliset tilasiirtymät paikantavat vastaavasti toiminnallisen HPG-jarrun, joka ei edellytä korkeaa kortisolia. BERM:n kannalta tämä antaa yleisstressiä tarkemman selittävän muuttujan: lisääntymisakselin vastaanottavuuden ja vasteen. [Abbott 1981](https://doi.org/10.1530/jrf.0.0630335), [Abbott 1988](https://doi.org/10.1677/joe.0.1170329).

### Hoivan säilymiselle ja oman lisääntymisen vähenemiselle on konkreettinen yhteisrakenne

Prolaktiini–kisspeptiini–LH-tutkimukset voidaan yhdistää prolaktiinireseptiivisten hoivapiirien tutkimukseen. Sonigo 2012, Hoskova 2022 ja Clarkson 2026 tuovat ketjuun eri tasojen mitattuja osia. Näin saman hormonaalisen järjestelmän eri kohdereitit voivat osallistua sekä lisääntymisakselin vaimentumiseen että hoivakontaktin vahvistumiseen. [Sonigo](https://doi.org/10.1172/JCI63937), [Hoskova](https://doi.org/10.1210/clinem/dgac166), [Clarkson](https://doi.org/10.1126/sciadv.ady6498).

Bell 2014:n surikaattikoe täydentää tätä kokonaisen ryhmän tasolla: lisääntymisen ehkäisy muutti hoivapanosta, dominantin aggressiota ja avustajien läsnäoloa. Se mittaa myös sosiaalista välitystä, joten hoivan kasvua ei tarvitse selittää yksin sisäisen halun muutoksella. [Nature Communications](https://doi.org/10.1038/ncomms5499).

### Palautumisen järjestys auttaa paikantamaan mekanismin

Kirjoahventutkimuksissa sosiaalinen mahdollisuus voi käynnistää käyttäytymistä minuuteissa, hormonivasteita kymmenissä minuuteissa ja muita muutoksia myöhemmin. Suppression aikana voi säilyä hedelmöityskykyä. Toisessa asetelmassa alisteinen käyttäytyminen jatkui fysiologisten erojen jo hiivuttua. [Burmeister 2005](https://doi.org/10.1371/journal.pbio.0030363), [Chen & Fernald 2011](https://doi.org/10.1371/journal.pone.0020313), [Kustan 2011](https://doi.org/10.1098/rspb.2011.0997).

BERM saa tästä täsmällisen ennusteiden järjestämisperiaatteen: käyttäytyminen, hormonipulssit, gonadien reservi ja toteutunut syntymä eivät ole saman aikavakion mittareita. Se voi selittää sekä yhteisesiintymistä että näennäisesti ristiriitaista mittausta ilman uusia erillisiä pääsyitä.

### Yhden yksilön tila voi muuttaa toisen yksilön toimintaa

Weisman 2012:n isä–lapsi-interventio ja Ben Simon 2018:n univajekoe tarjoavat jo nykyiseen malliin sisältyvän perustan. Oma tila voi vaikuttaa ulospäin näkyvään toimintaan ja sitä kautta toisen henkilön vasteeseen. Tästä tulee tärkeä silta biologisesta motivaatiosta kontaktien määrään ja saatavilla oleviin mahdollisuuksiin. [Weisman](https://doi.org/10.1016/j.biopsych.2012.06.011), [Ben Simon](https://doi.org/10.1038/s41467-018-05377-0).

Ystävyys- ja työpaikkaverkostojen lisääntymistutkimukset tuovat tähän ajallisen väestövastineen. Niissä ei mitattu hormonaalista välitystä, mutta ne auttavat määrittämään, mitä verkostossa välittyy ja millä viiveellä. [Balbo & Barban 2014](https://doi.org/10.1177/0003122414531596), [Pink ym. 2014](https://doi.org/10.1016/j.alcr.2013.12.001).

## 4. Miten kahdeksan akselia kannattaa järjestää

Liitteen akseleilla on eri tehtäviä kausaaliketjussa. Hormoni-/geenitila on biologisen säätelyn mitta, hoiva ja seksuaalinen toiminta ovat ulostuloja, ja sosiaalinen kontrolli voi olla sekä syöte että seuraus. Ne kannattaa säilyttää vertailukarttana ja osoittaa tämä järjestys lukijalle.

| Liitteen kokonaisuus | Mallissa käytettävä havainto | Mitä yhteys voi selittää |
| --- | --- | --- |
| Hoivan uudelleensuuntautuminen | Hoivan määrä, kohde ja vastaanottavuus erikseen | Oman lisääntymisen ja hoivapanoksen eriytyminen; kohteen merkitys muodostuu biologian ja kontaktien kautta. |
| Dispersaali / atomisaatio | Kontaktihalu, toteutunut kontakti, kotitalous, muutto ja kumppanin etsintä | Miksi saman kotitaloustilaston takana voi olla eri biologisia ja sosiaalisia reittejä. |
| Stressi | HPA-dynamiikka ja uhkavaste, rinnalla HPG:n vaste | Stressivälitteiset ja valikoivasti lisääntymiseen kohdistuvat jarrut. |
| Seurustelu ja parinmuodostus | Seksuaalinen motivaatio, lähestyminen, toisen vaste, yritys | Miten biologinen tila vaikuttaa sekä omaan toimintaan että mahdollisuuksiin. |
| Signalointi | Signaalin tuotanto, vastaanotto ja merkitys | Tuottajan ja vastaanottajan tilat voivat vahvistaa tai heikentää samaa vuorovaikutusta. |
| Sosiaalinen kontrolli | Toteutuneet sanktiot, tuki, kustannukset ja kontaktimuutokset | Miten yksilöiden toiminta muuttaa seuraavien valintojen fysikaalisesti toteutuvaa ympäristöä. |
| Hormonaalinen/genominen muutos | Hormoni, pulssitus, reseptorivaste, geenivaste ja aikajärjestys | Yhteisten säätelyreittien ja niiden muistien paikantaminen. |
| Riskinotto ja itsenäistyminen | Vaivavalinnat, uhkapainotus, liikkuminen ja ikäkohtaiset siirtymät | Miksi vaikutus voi riippua kehitysvaiheesta ja tehtävän palkkio-/kustannusrakenteesta. |

Koettu halu kuuluu biologisen ketjun selitettävään osaan. Se voidaan kuvata ilman biologian ulkopuolista tietoista päätöksentekijää. Samalla kerrottu perustelu on arvokas erillinen havainto: sen ja mitatun tilan ajallinen suhde auttaa tutkimaan, milloin ulostulo päätyy analyysissä selittäväksi muuttujaksi.

Lemmikkivanhemmuus, yksinasuminen tai lapsettomuuden toivominen eivät yksin tunnista näitä mekanismeja. Niiden käyttökelpoisuus kasvaa, kun mukaan saadaan saman henkilön hormonaalinen tila, kontaktihistoria, halumittari ja toteutuneet siirtymät. Kahdeksan trendin rinnakkaisuus on ehdokas yhteisvaihtelurakenteeksi; se ei vielä ole kahdeksan riippumatonta kausaalitodistetta tai tunnistettu ihmisen oireyhtymä.

## 5. Suurin rakenteellinen liitos: käyttäytymisestä lisääntymisen toteutumiseen

Kanonisessa rekisterissä nykyinen `INDIVIDUAL_BEHAVIORAL_RESPONSE` jatkuu ainoastaan `BIOBEHAVIORAL_WEIGHTING`–narratiivi–Epistapege-haaraan. `DEMAND_OPPORTUNITY` on parentiton demografinen syöte ja sen provenienssi on `explicit_nonbiological_input`. Atlas-laajennuksessa biologiset pariutumissignaalit ja sosiaaliset rakenteet kuitenkin jo johtavat samaan mahdollisuustilaan.

Tämä on tärkeä integraatiokohta: mallin teksti pyrkii selittämään biologisesti muodostuvaa motivaatiota, mutta pääkaavion lisääntymishaara saa kysynnän ja mahdollisuuden valmiina ulkoa.

Suositeltu ratkaisu on erottaa rajapinnassa:

1. Biologisen tilan ja opitun historian muodostama motivaatio ja toimintaan suuntautuminen.
2. Kohtaamisen ulkoiset ja vuorovaikutuksessa muodostuvat mahdollisuudet.
3. Toteutunut lisääntymiselle altistava kohtaaminen tai yritys.
4. Sen ehdollinen biologinen onnistuminen ja ajallinen jakautuminen.

Näin syntyy suora ehdollinen käyttäytyminen→toteutuminen-haara. Epistapege kuvaa syyn tulkintaa ja institutionaalista uudelleenkäyttöä, joten kaikkea lisääntymistä ei tarvitse kierrättää sen kautta. Myös suunnittelemattomat raskaudet säilyvät tapahtumaketjussa. Ulkoisten resurssien ja rajoitteiden mitattavat vaikutukset säilytetään; niitä ei nimetä uudelleen kokonaan biologisen motivaation ulostuloiksi.

Pelkän nuolen lisääminen ei kalibroi numeerista ennustetta. Aluksi tämä on lähteistetty rakenteellinen selvennys. Nykyisen `behavioral_factor_v21`-muunnoksen päälle ei lisätä samaa hormonaalista vaikutusta toistamiseen laskevaa suppressionkerrointa.

## 6. Sivilisaatiotason selitysvoima

Tähän kokonaisuuteen kannattaa liittää kolme eri palautetta.

**Kontaktipalaute:** muuttunut käyttäytyminen vaikuttaa kontaktien määrään ja toisten vasteisiin. Seuraavan ajankohdan aisti- ja oppimissyöte muuttuu. Tämä yhdistää yksilön biologisen tilan parinmuodostukseen ja verkoston rakenteeseen.

**Lisääntymisen ja hoivan palaute:** syntymät muuttavat vauva-, hoiva- ja perhekontakteja; kontaktit muuttavat vastaanottavuutta ja myöhempää toimintaa. Hoivan aktivoituminen ja uuden raskauden käynnistyminen voivat olla eri suuntaisia. Siksi liitteen vauvakontakti→oksitosiini/prolaktiini→lisääntymishalu -ketju on eriteltävä kohdereiteittäin.

**Käytäntöjen ja instituutioiden palaute:** väestön toistuvat teot ja raportoidut perustelut muuttavat normeja, palveluita, aikatauluja ja muiden kohtaamia vaihtoehtoja. Niillä voi olla yksilön akuuttia tilaa pidempi muisti. Nykyiset `aggregate_behaviour_probability`, `advance_social_state` ja institutionaaliset muistirakenteet antavat tälle jo muodollisen paikan.

Näistä voidaan rakentaa BERM:n ehdollinen **itseään vahvistavan väestökehityksen hypoteesi**: alkuperäinen tilanmuutos vaikuttaa ensin yksilöön, sitten ympäristön kautta myös muihin ja myöhempiin kohortteihin. Tällöin väestön palautuminen ei määräydy vain yhden hormonin palautumisajasta. Tämä syventää Pathopegen biologista alkua, Patopoliksen yhteistoimintaa, Patokinesiksen leviämistä ja Epistapegen tulkintaa.

Liitteen suppressio→vähemmän kontakteja→lisää suppressiota -silmukka on matemaattisesti **vahvistava eli positiivinen palaute**. Lisäksi kehän kaikkien linkkien etumerkit ja toimintaolosuhteet on nimettävä. Pelkkä vahvistava palaute ei todista epävakautta, peruuttamattomuutta tai biologisen ulospääsyn puuttumista. Nykyinen verkosto-operaattori erottaa jo palautteen olemassaolon sen voimakkuudesta ja stabiiliudesta.

Pathorea ja Pathostasis ovat tällä hetkellä käsitteellisiä nimiä, eivät omia sivuja tai erillisiä kalibroituja operaattoreita. Neopedomorfialle ei löytynyt omaa toteutusta. Viivästynyt itsenäistyminen sopii ensin ikäkohtaiseksi käyttäytymis- ja ajoitusprofiiliksi nykyisiin osiin.

## 7. Sivuston sijoitus ja esitystapa

| Kohde | Integraatio |
| --- | --- |
| **Käyttäytyminen: halu ja motivaatio** | Kokonaisuuden ensisijainen koti. Johdanto, suppression/vapautumisen kokeet, hoivan erillinen kohdereitti ja ihmisen hormonikokeet. Tarvittaessa syventävä uusi `/behavior/reproductive-regulation`; tämä on ehdotettu reitti. |
| **Biologinen koordinaatio** | Hormoni–reseptori–aikakulku–ulostulo. Prolaktiinin haarautuva esimerkki yhdistetään nykyiseen kalsium/redox/kello/HPG-rakenteeseen. |
| **Näytön konvergenssi** | Eläin-, ihmis- ja verkostotutkimusten yhteiset fysiologiset mittarit; näkyvä ero saman kokeen ketjun ja tutkimuksista kootun ketjun välillä. |
| **Proxy masking** | Nykyisten kahdeksan akselin lähdekohtainen syventäminen; neljännen tason yhteisvaihtelun pirstoutuminen ja ensimmäisen tason puutteellinen biologisen tilan mittaus. |
| **Pathopege ja Pathopolites** | Suppression synty, eriytyvät käyttäytymisprofiilit ja hoivan mitattu kohdistuminen. |
| **Patopolis ja Patokinesis** | Kohtaamisten, sosiaalisen palautteen, normien toimeenpanon ja instituutioiden uusiutumisen ketjut. |
| **Epistapege** | Kuinka biologisen ketjun ulostulo voi päätyä ilmoitetuksi syyksi ja institutionaaliseksi selitykseksi. |
| **Mallisivu, kausaalikaavio ja Atlas** | Sama käyttäytyminen→lisääntymisen toteutuminen -rakenne molempiin kausaaliesityksiin niiden eri tarkkuustasoilla. |
| **Lähteet, claimit, aineistoperheet ja haku** | Yksi lähdetietue tutkimusta kohti; lähdekohtaiset ulostulot, mittausjärjestys ja perhepäällekkäisyydet kaikkiin asiaankuuluviin näkymiin. |

Headeriin riittää selkeä linkki nykyisen **Käyttäytyminen**-ryhmän alle. Fysiikka→Biologia→Käyttäytyminen→Sivilisaatio säilyy pääjärjestyksenä. Koko lähdeanalyysi ei kuulu pääkaavion solmujen sisään: pääkaavio näyttää kolme haaraa — motivaatio/toteutuminen, kapasiteetti ja hoiva/palaute — ja avattava tarkastelu näyttää kokeet ja niiden mitatut yhteydet. Näin informatiivisuus säilyy ilman visuaalisen tiheyden kasvattamista.

## 8. Mitkä liitteen kohdat tarkennetaan ennen integraatiota

Lähdeidentiteetin korjaaminen nostaa löydöksen todistusarvoa, koska oikea koe voidaan silloin yhdistää oikeaan nuoleen. Tärkeimmät tarkennukset ovat:

- Surikaattien kontraseptio-/hoivatulos kuuluu Bell 2014:lle; Young 2006 käsittelee karkotusta ja siihen liittyviä fysiologisia muutoksia.
- Marmosettien suppressiolle ei lisätä yleistä kortisoli↑-vaatimusta.
- Kirjoahvenen 14 minuutin geenivaste kuuluu Burmeister 2005:lle; näkövihjeinterventio Chen & Fernald 2011:lle.
- Edwards 2025:n vuoden seurannasta ei päätellä pysyvää vauriota. Seurantaikkuna ja aineistojen päällekkäisyys merkitään.
- Pew’n 57 % koskee rajattua lapsettomien 18–49-vuotiaiden ryhmää, joka piti tulevaa vanhemmuuttaan epätodennäköisenä. Vastaus on motivaation kuvaus, ei hormonimitta tai syyn yksilöivä sormenjälki.
- Koiran ja ihmisen oksitosiinivuorovaikutus tukee lajienvälisen kiintymyksen mekanismia. Lemmikin korvaava rooli ihmisen lisääntymisessä tarvitsee erillisen pitkittäisen yhteyden.
- Hyönteisten munien tuhoaminen ja ihmisen ilmoitettu lapsettomuustoive sijoitetaan eri mittareihin. Ihmisten sosiaalisen kontrollin kohdalla mitataan toteutuneita sanktioita ja niiden vaikutuksia.
- Kojootin ulvonta→pentuekoko 16 -selitykselle ei löytynyt tässä haussa riittävää alkuperäistä kokeellista tukea. Esimerkin voi korvata tunnistetulla hajusignaalikokeella tai marmosetin sosiaalisella vapautumisella. Lajikohtainen kompensaatio on erillinen kysymys.
- Yhteisten kiihtymisvuosien väite edellyttää yhteismitallisia aikasarjoja. Teknologian käyttö, optinen valo, RF/ELF-altistus, ajan käyttö ja kontaktirakenne erotellaan mittauksessa.

## 9. Mitä voidaan tehdä nykyisillä aineistoilla

Ensimmäinen toteutettava tutkimuskooste on lähdekohtainen matriisi: **syöte → mitattu biologinen muutos → mitattu käyttäytyminen → lisääntymistulos → viive → aineistoperhe**. Samaan kokeeseen kuuluvat havainnot erotetaan samoista henkilöistä myöhemmin julkaistuista tuloksista ja kokonaan eri tutkimusten yhdistelmistä.

Välittömästi hyödyllisiä aineistoperheitä ovat eläinten sosiaaliset tilasiirtymät, testosteroni-/estrogeeni- ja kisspeptiini-interventiot, isyyden hormonipitkittäisaineistot, univajeen vuorovaikutus- ja auttamisaineistot sekä Add Health-, PSID- ja syntyvyysverkostoaineistot. Pääsy vaihtelee avoimista liitteistä lupamenettelyihin. Kaikki eivät sisällä hormoneja, kaikkia kahdeksaa akselia tai EMF-mittausta; tätä ei täydennetä oletetuilla yksilöarvoilla.

Erityisen käyttökelpoinen puuttuva yhdistelmä on Gettlerin vuoden 2013 seksuaalista toimintaa koskeva analyysi samaan Cebu-kohorttiin kuuluvan, jo rekisteröidyn vuoden 2011 isyys-/testosteronitutkimuksen rinnalle. Se tuo samaan henkilöseurantaan vanhemmuuden, hormonimuutoksen ja seksuaalisen toiminnan. Se lasketaan yhdeksi aineistoperheeksi. [Gettler 2013](https://doi.org/10.1016/j.yhbeh.2013.08.019).

Myös käyttäytymisten yhteistarkastelua on jo tehty: Herbenickin NSSHB-analyysi erottaa yksin ja kumppanin kanssa toteutuvat seksuaaliset ulostulot; Lei–Southin PSID-analyysi yhdistää samoissa nuorissa aikuisissa parisuhteen, seksuaalisen toiminnan ja muita elämänkulun muuttujia. Näin fragmentaation täydentäminen voi alkaa olemassa olevasta monimuuttujatutkimuksesta. [Herbenick](https://doi.org/10.1007/s10508-021-02125-2), [Lei & South](https://doi.org/10.1111/jomf.12723).

NHANES 2013–2014 tarjoaa julkisissa tiedostoissa yhdistettävän hormoni–seksuaalikäyttäytyminen–uni–lisääntymishistoria-aineiston. NSHAP puolestaan tarjoaa iäkkäämmän väestön hormonaalista, seksuaalista ja verkostoseurantaa. Nämä ovat mahdollisia valmiin datan yhdistämisreittejä, joiden lopullinen yhteinen havaintojoukko täytyy tarkistaa muuttujien kelpoisuusrajoista. [CDC:n NHANES-hormonikoodikirja](https://wwwn.cdc.gov/nchs/data/nhanes/public/2013/datafiles/TST_H.htm), [NSHAP-arkisto](https://archive.icpsr.umich.edu/nacda/nshap).

Nykyisestä tutkimuksesta kannattaa ensin erottaa kolme kysymystä:

1. Muuttaako määritelty biologinen interventio samassa yksilössä useita ulostuloja, ja mitkä ulostulot säilyvät?
2. Millä viiveellä tila, halu, käyttäytyminen, perustelu ja lisääntymistulos muuttuvat?
3. Kuinka yhden henkilön muutos liittyy muiden myöhempiin kontakteihin ja perheellistymiseen?

Nämä vahvistavat mallin rakennetta ja vaikutussuuntia nykyisen tiedon pohjalta. EMF-käynnistyksen ja ihmisen vaikutuskoon tunnistaminen pysyvät erillisinä aineistotehtävinä.

## 10. Suositeltu toteutusjärjestys

1. **Lähde- ja väitetaso:** korjattu eläinmatriisi, uudet prolaktiini-/hoivareitit ja verkostolähteet. Yhtenäistetään myös saman Westbrook 2020 -aineiston nykyiset eri perhetunnisteet.
2. **Rakenteellinen ydin:** täsmennetään biologisen tilan rinnakkaiset ulostulot ja käyttäytyminen→toteutuminen-haara. Säilytetään ulkoisten mahdollisuuksien sisääntulo ja Epistapegen oma tehtävä.
3. **Sivuston pääkertomus:** Käyttäytyminen → Biologinen koordinaatio / Konvergenssi → Proxy masking → asianomaiset sivilisaatiosivut. Sama evidenssi esitetään kussakin sen oman selitystehtävän kautta.
4. **Kausaaliesitykset ja löydettävyys:** pääkaavio, Atlas, pysyvät ankkurit, valikko, haku ja viiteindeksit päivitetään samasta sisällöstä.
5. **Tarkistus ennen myöhempää julkaisua:** rakennesopimus, claimien lähteet, aineistoperheiden deduplikointi, ennusteiden säilyminen rakenteellisessa vaiheessa sekä FI/EN- ja kapean/leveän näkymän toiminta. Nykyisiä testejä ja hyväksymiskohtia on lueteltu inventaariossa.

Määrällinen kalibrointi tulee tämän jälkeen niille reiteille, joille aineisto antaa tunnistettavan estimaatin. Käyttäytymissyndroomalle ei tässä vaiheessa tarvita uutta yleistä kerrointa. BERM:n selityslisä syntyy nykyisten biologisten ja sosiaalisten operaattorien yhteisestä käytöstä, niiden mitatuista liittymistä ja siitä, että malli kuvaa myös vaikutusten valikoivuuden ja aikajärjestyksen.
