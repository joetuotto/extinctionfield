# EMF-katsauksen uudelleenanalyysi BERM:n logiikasta ja premisseistä

Päiväys: 8.9.2026. Kohde: [samana päivänä laadittu EMF-katsaus](BERM_EMF_teknologia_kirjallisuuskatsaus_2026-09-08.md) ja sen kolme lähdemuistiota. Tämä täydennys tarkentaa katsauksen päättelyä ja tutkimussuunnitelmaa. Se ei ole uusi meta-analyysi eikä verkkosivun julkaistu muutos.

**Steelman-jatko:** [olemassa olevan näytön vahvistusrekisteri ja nollatulosten tarkempi luenta](BERM_steelman_olemassaoleva_naytto_2026-09-08/README.md) täsmentävät tämän analyysin avoimia kohtia. Useille biologisille vaste-ehdoille on jo kokeelliset osahavainnot; jäljellä oleva kokonaiskalibraatio ei poista niiden vahvistettua asemaa. Jatko käsittelee myös replikaatioita, maantiedettä ja vuodenaikaa.

## 1. Arvio katsauksesta

Katsauksen lähde-, annos- ja teknologiahistorialliset tarkennukset ovat tarpeellisia. BERM:n kannalta sen painotus jäi kuitenkin osittain liian paljon siihen, mitä yksittäisestä tutkimuksesta ei voi päätellä. Parempi jatko on rakentaa komponenttitutkimuksista ehdollinen ketju, ratkaista sen seuraukset ja nimetä havainnot, joilla ketjua voidaan koetella.

Keskeinen tutkimuskohde on **paikallisen kenttähistorian, signaalin rakenteen, vastaanottavan organismin tilan ja palautumisen yhteys toiminnalliseen vasteeseen**. Pelkkä keskimääräinen kentänvoimakkuus tai teknologian käyttäjämäärä ei yksilöi tätä kohdetta.

Tästä seuraa kaksi yhtä tärkeää tarkennusta:

- Muuttumaton keskimääräinen kenttä, normaali hormonipitoisuus tai pieni akuutti lisävaste eivät yksin ratkaise tilariippuvan BERM-version ennustetta.
- Tilariippuvuutta ei saa käyttää tuloksen nähtyä selityksenä, joka sallii mielivaltaisesti kasvun, vähenemisen ja nollan. Vastaanottava tila, vasteen suunta ja tunnistettava vaikutuskoko pitää sitoa ennalta määriteltyyn mekanismiin.

Katsauksesta ei seuraa BERM:n geometrisen perustan empiiristä vahvistusta tai EMF:n määrällistä osuutta väestötrendeistä. Siitä seuraa huomattavasti täsmällisempi ohjelma BERM:n ehdollisten biologisten toteutumien testaamiseen.

## 2. Premissit ja niiden todellinen kantama

Käytetty geometrinen lähtö on vuoden 2025 Lindgren–Kovacs–Liukkonen-formulaatio, ei vuoden 2021 singulaarinen ulkotulomuoto. [Julkaisu](https://doi.org/10.1088/1742-6596/2987/1/012001), [ennakkoversio](https://www.preprints.org/manuscript/202503.2321).

BERM:n skaalan eksplisiittiseksi tekevässä merkinnässä:

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Alla erotetaan neljä asiaa:

| Taso | Sisältö | Näytön asema |
|---|---|---|
| Lindgrenistä johdettu geometria | Ulkotulo, sen tarkka muutos, ristiosat ja taajuuksien sekoittuminen | Matemaattinen seuraus annetusta ansatzista |
| Tuotu empiirinen biologia | Reseptorit, korjaus, hormonien sitoutuminen, aistiminen, mitatut solu- ja organismivasteet | Näyttö arvioidaan tutkimus- ja olosuhdekohtaisesti |
| BERM:n ehdollinen mekanismi | Materiakytkentä, kudosvaste, tiladynamiikka, muisti ja aggregaatio | Nimetyt lisäoletukset yhdistävät geometrian havaintoon |
| Avoin kalibraatio | Gauge-resepti, fysikaalinen skaala, kudosytimet, merkki, viive ja päätepisteet | Avoimia määrällisen ennusteen ja fysikaalisen validoinnin ehtoja |

BERM:n kanoninen ehdollinen vaste on

\[
u_i(t)=\int_0^\infty
K_i^{\mu\nu}(\tau;\mathcal S_i(t-\tau))
\delta g_{\mu\nu}(t-\tau)\,d\tau
+O(\delta g^2).
\]

Se edellyttää nimettyä materia–metriikka-kytkentää ja kausaalista vastekehitelmää. Se ei ole biologisen vasteen johtaminen yksin ulkotuloidentiteetistä. Katso [kanoninen tilariippuva sulkeuma](../../berm/docs/berm-state-conditioned-multiscale-closure.md) ja [ehdollinen vaste sekä androgeenikapasiteetti](../../berm/docs/berm-conditional-response-and-androgen-capacity.md).

Myös fysikaalinen identifioitavuus on ratkaistava. Tavallinen potentiaalin gauge-muutos muuttaa yleensä \(A_\mu A_\nu\):tä. Siksi biologista ennustetta varten tarvitaan perusteltu gauge-käsittely tai sitä vastaava fysikaalinen rakenne; mittauksen jälkeen valittu sopiva potentiaali ei riitä. Lisäksi ensimmäisen kertaluvun vasteaineisto rajoittaa lähtökohtaisesti yhdistelmää \(\kappa K_i\), ellei skaalaa tai ydintä sidota riippumattomalla tiedolla. Hyvä päätepistesovitus ei yksin identifioi molempia.

FieldState voi toimittaa mitatun tai estimoidun fysikaalisen syötteen. Mekanismit, kudosvasteet ja ennusteet johdetaan tässä BERM:stä. \(\chi_{geo}\) on geometrinen koordinaatti; sen mahdollinen kyllästyminen ei itsessään osoita reseptorin kyllästymistä.

## 3. Uuden teknologian vaikutus riippuu vanhasta tilasta

Merkitään aiempaa paikallista potentiaalia \(A_v\):llä ja uutta lähdettä \(\epsilon b\):llä. Geometrinen muutos on tarkasti

\[
\Delta g=\kappa\epsilon(A_v\otimes b+b\otimes A_v)
+\kappa\epsilon^2 b\otimes b.
\]

**Johdettu seuraus:** pienen uuden lähteen ensimmäisen kertaluvun vaikutus voi riippua jo olemassa olevasta kentästä. Sen oma neliötermi on vasta toista kertalukua. Pelkkä uuden lähteen pieni keskimääräinen teho ei tämän vuoksi yksilöi BERM:n ennustamaa marginaalia.

Ristiosan olemassaolo ei silti ratkaise, vastaanottaako kudos sen. Staattisen taustan ja RF-kantoaallon tulo jää RF-taajuudelle. Samoin 50 Hz:n ja GHz-kantoaallon suora tulo tuottaa GHz:n ympärille sivukaistoja, ei automaattisesti 50 Hz:n hidasta ajuria. Läheisten RF-taajuuksien sekoitus tai RF:n oma amplitudimodulaatio voi tuottaa hitaan komponentin. Vastaanotto riippuu tällöin \(K_i\):stä.

Biologinen historia tuo toisen riippuvuuden. Ensimmäisen kertaluvun L2-termin sisällä, samoilla integraalimerkinnöillä,

\[
\Delta u_i=\int
\left[K_{i,v}:\Delta g
+\Delta K_i:\delta g_v
+\Delta K_i:\Delta g\right].
\]

Täydessä vasteessa tulevat lisäksi korkeamman kertaluvun erot. Ensimmäinen termi kuvaa uutta ärsykettä vanhassa kudostilassa. Toinen kuvaa sitä, että muuttunut kudostila käsittelee myös vanhaa ärsykettä eri tavalla.

**Katsauksen täydennys:** teknologiahistoriaan tarvitaan sekä lähteiden päällekkäisyys että aiemman altistuksen ja biologisen tilan historia. Sama uusi verkko voi ehdollisesti tuottaa eri vasteen eri kehitysvaiheessa, vuorokausivaiheessa tai reseptoritilassa. Pelkästä maasta tai käyttöönottovuodesta tätä eroa ei voi päätellä.

## 4. Sama keskimääräinen teho voi jättää olennaisen eron piiloon

Tämä on osoitettavissa tarkalla signaaliesimerkillä. Kiinnitetään gauge, paikallinen moodi ja potentiaalin suunta \(a_\mu=p_\mu u_\phi\). Valitaan

\[
u_\phi(t)=c\{\cos[(\omega-\Omega)t]
+\cos(\omega t+\phi)+\cos[(\omega+\Omega)t]\},
\qquad \omega\gg\Omega.
\]

Riittävän pitkässä aikakeskiarvossa kaikilla vaiheilla \(\phi\):

\[
\langle u_\phi\rangle=0,\qquad
\langle u_\phi^2\rangle=\frac32c^2.
\]

Myös kolmen RF-spektriviivan tehot ovat samat. Neliöosan hidas rakenne on kuitenkin

\[
\operatorname{LP}(u_\phi^2)
=\frac32c^2+2c^2\cos\phi\cos\Omega t+c^2\cos2\Omega t.
\]

Vaiheella \(\phi=0\) saadaan voimakas \(\Omega\)-komponentti. Vaiheella \(\phi=\pi/2\) se katoaa. Jos kudosydin vastaanottaa \(\Omega\):n mutta vaimentaa vakio-osan ja \(2\Omega\):n, ennustetut vasteet eroavat.

Kyse on **geometrisesti johdetusta erosta ja ehdollisesta kudosennusteesta**. Myös tämän yksinkertaisen moodin \(E=-\partial_t A\) -kentän pitkäaikainen RMS on vaiheesta riippumaton. Saman kudos-SAR:n toteutuminen tarvitsee lisäksi määritellyn siirtomallin ja dosimetrisen tarkistuksen.

Siksi katsauksen havainto keskimääräisen ympäristö-RF:n pysymisestä vakaana rajaa juuri kyseistä mittaria. Se ei yksin sulje pois muutosta vastaanottimen kannalta merkittävässä ajallisessa rakenteessa. Vastaavasti muuttunut rakenne ei osoita haittaa ilman mitattua vastaanottoa. [Sveitsin pitkittäinen mittaustutkimus](https://doi.org/10.1038/s41370-026-00909-z).

Tämä antaa konkreettisen testin: verrataan tällaisia signaalipareja samassa kudostilassa ja lämpötilassa, määritellään ennustettu vastekaista ennen koetta ja katsotaan ennustaako se tulokset.

**Ristiosan nollakeskiarvoa koskeva lisäkorjaus:** riippumattomille nollakeskiarvoisille stationaarisille prosesseille \(x,y\) pätee \(\langle xy\rangle=0\), mutta tuotteen \(z=xy\) autokorrelaatio on \(R_z(\tau)=R_x(\tau)R_y(\tau)\). Sen spektri on Fourier-konventiosta riippuvan kertoimen tarkkuudella alkuperäisten spektrien konvoluutio. Ristiosan vaihtelua voi siis jäädä hitaalle vastaanottokaistalle ilman pysyvää koherenssia. Lineaarinen muuttumaton ydin ei kuitenkaan muuta nollakeskiarvoista ajoa itsestään pysyväksi keskimääräiseksi haitaksi: siihen tarvitaan nimetty epälineaarisuus, tilakorrelaatio, tasakomponentti tai muu muunnos.

RF-verhokäyrä ja erikseen mitattu ELF-kenttä pidetään edelleen eri suureina. Samaa signaalia ei lasketa kaksinkertaisesti.

## 5. Akuutti koe mittaa lisävaikutusta tietyssä lähtötilassa

Satunnaistetun akuutin kokeen kohde voidaan kirjoittaa

\[
\Delta_{\rm akuutti}(H)
=E[Y\mid{\rm aktiivinen},H]-E[Y\mid{\rm sham},H],
\]

missä \(H\) kuvaa molempien ryhmien yhteistä aiempaa historiaa.

Se ei ole sama suure kuin ero kahden kokonaisen elämänhistorian välillä. Lyhyt sham-jakso ei välttämättä muuta hitaasti palautuvaa tilaa. Satunnaistettu koe silti tunnistaa juuri testatun lisäaltistuksen vaikutusta eikä muutu kelvottomaksi siksi, että osallistujat ovat käyttäneet sähkötekniikkaa aiemmin.

BERM:n rakentava tulkinta on, että nollatulos rajaa \(K_i\):n ja tiladynamiikan yhdistelmää kokeen olosuhteissa. Jos väitetään sopeutumisen peittäneen vaikutuksen, pitää osoittaa sekä sopeutumisen mittari että sen riippuvuus historiasta.

Tätä rajausta ei yleistetä koskemaan kaikkia nollatuloksia. Pitkittäiset kohortit, pitkäaikaiset eläinkokeet ja akuutit kokeet arvioivat eri kontrasteja. Esimerkiksi COSMOS-kohortin puhelinkäyttöä ja aivokasvaimia koskeva tulos arvioidaan sen pitkäaikaisen altistusmittauksen ja seurannan perusteella; sitä ei voi sivuuttaa akuutin sham-kokeen historia-argumentilla. [COSMOS 2024](https://pubmed.ncbi.nlm.nih.gov/38458118/).

Ratkaiseva koe risteyttää **ennalta kontrolloidun esihistorian ja nykyisen ärsykkeen**, käyttää riittävän pitkää palautumisseurantaa ja mittaa lähtötilan. Luonnollista geomagneettista taustaa, valoa tai muita välttämättömiä olosuhteita ei pidä poistaa hallitsemattomasti samalla, kun teknistä lähdettä vähennetään.

Esialtistuksen päättäminen ennen myöhempää haastetta auttaa erottamaan säilyvän vastaanotinmuutoksen samanaikaisesta kenttien sekoittumisesta. Jos kantovaikutus on pitkä, rinnakkaisryhmät voivat olla lyhyttä vaihtovuorokoetta tulkittavampia.

Historiallinen komponenttihavainto tukee tämän kysymyksen mielekkyyttä: Blackman ym. kasvattivat kananalkioita 50 tai 60 Hz:n sähkökentässä. Myöhempi aivokudoksen kalsiumulosvirtausvaste riippui kasvatushistoriasta. Tutkimus koski rajattua koeasetelmaa, ja fysiologinen merkitys jäi avoimeksi. Se ei osoita kroonista ihmisvauriota tai yleistä sopeutumislakia. [Blackman ym. 1988, abstrakti tarkistettu](https://pubmed.ncbi.nlm.nih.gov/3377861/).

## 6. Muisti, sopeutuminen, vaurio ja kapasiteetti on erotettava

Katsauksen tulisi seurata vähintään kolmea erillistä muuttujaa:

- vastaanotintilaa \(S\), esimerkiksi reseptorin saatavuutta tai redox-tilaa;
- vauriota \(D\), jonka synty ja korjaus ovat erillisiä nopeuksia;
- toimintakykyä \(C\), esimerkiksi kuormituksessa mitattua solun, elimen tai organismin suoriutumista.

Muistivaikutus ei itsessään kerro vaurion suunnasta. Tätä tarkentavat kolme lähdettä:

| Tutkimus | Olennainen havainto | BERM:n ehdollisen toteutuman vaatimus |
|---|---|---|
| [Sannino ym. 2022](https://doi.org/10.3390/ijms23158414) | SH-SY5Y-solujen 1950 MHz UMTS-esialtistus, 0,3 W/kg, 20 h, vähensi myöhemmän menadionin DNA-vauriota. Suoja menetettiin autofagiaa estämällä tai ATG5/ATG7-poikkeavissa solulinjoissa. | Sulkeuman tulee sallia mitattu suojaava vaste. Estäjät muuttivat myös menadionin lähtövaikutusta, joten estokoe ei yksin identifioi koko RF-mekanismia. |
| [Sannino ym. 2024](https://doi.org/10.1002/bem.22524) | Myös 3 h UMTS-esialtistus suojasi myöhemmässä menadionikokeessa. RF oli tunneilla 48–51, kemiallinen haaste 71–72. RF yksin ei lisännyt mitattua DNA-vauriota. | Vaikutus oli havaittavissa noin 20 h altistuksen loppumisen jälkeen. Tämä on toiminnallista muistia koskeva havainto, ei arvio yksittäisestä aikavakiosta tai pysyvästä vauriosta. |
| [Allocca ym. 2026](https://pubmed.ncbi.nlm.nih.gov/41850480/) | SH-SY5Y-solujen 3 h LTE-altistus ja LTE–Wi-Fi-yhteisaltistus eivät muuttaneet tutkittuja ROS-, apoptoosi- ja solusyklipäätepisteitä. Tutkitut SAR-tasot olivat 0,3 ja 1,25 W/kg. | Kahden radiosignaalin läsnäolo ei riitä vaste- tai synergiaennusteeksi. Tämä rajaa näitä olosuhteita; eri protokollien vertailu ei yksin eristä aaltomuodon syyvaikutusta. |

Vuoden 2026 tutkimus löytyi tässä jatkotarkistuksessa ja täydentää alkuperäistä katsausta. Sen tulkinta perustuu julkaistuun abstraktiin; vuosien 2022 ja 2024 alkuperäistekstit tarkistettiin CNR:n julkaisuarkistosta. Tutkimusryhmien ja solumallien päällekkäisyys huomioidaan: nämä eivät ole kolme riippumatonta yleisen mekanismin replikaatiota.

Suojaavat tulokset eivät ole todiste pitkäaikaisesta terveyshyödystä. Ne ovat empiirinen vaatimus mallille, joka pyrkii kuvaamaan saman järjestelmän tilaa. Vastaavasti nollatulos yhdessä päätepisteessä ei osoita, että kaikki tilamuuttujat ovat muuttumattomia.

## 7. Milloin pieni vaikutus todella kasaantuu?

Yksinkertaisin palautuva tila noudattaa ehdollisesti

\[
\dot z=-\lambda z+\beta u(t),\qquad\lambda>0.
\]

Vakioajolla

\[
z_\infty=\frac{\beta u}{\lambda}.
\]

Muutos voi kasvaa alkuvaiheessa, mutta se saavuttaa tasapainon. Toistuvilla samansuuntaisilla tilahyppäyksillä \(q\), joiden väli on \(\Delta\),

\[
z_{n+1}=e^{-\lambda\Delta}z_n+q,\qquad
z_\infty=\frac{q}{1-e^{-\lambda\Delta}}.
\]

Kasaantuminen on merkittävää, kun uusia samansuuntaisia muutoksia tulee ennen palautumista, eli \(\lambda\Delta\ll1\). Tämäkään ei tuota rajatonta kasvua. Vaurion yksinkertaisessa yhtälössä \(\dot D=p-rD\) tasapaino on \(D_\infty=p/r\), kun \(p\) ja \(r>0\) ovat vakioita.

Kynnys, romahdus tai altistuksen loputtua säilyvä muutos edellyttää lisää rakennetta: esimerkiksi korjauskapasiteetin heikkenemistä, positiivista palautetta, kudosvauriota, bistabiiliutta tai muuta mitattavaa muistia. Ne ovat BERM:n biologisia sulkeumaoletuksia, eivät ulkotulogeometrian automaattisia seurauksia.

**Korjaus teknologiakatsaukseen:** laitteen päälläolo ei aseta \(r=0\):aa. Samalla pelkkä lyhyt lähetysaikaosuus ei takaa täydellistä palautumista. Ratkaiseva suhde on ärsykkeen vaikutuksen ja kudoksen mitatun palautumisen aikaskaala.

Historiassa myös järjestys voi merkitä: jos kaksi ärsykettä muuttaa vastaanotintilaa eri tavoin, tilasiirtymät voivat toteuttaa \(\Phi_2\circ\Phi_1\ne\Phi_1\circ\Phi_2\). Tämä on ehdollinen, testattava mahdollisuus. Järjestyskokeessa täytyy erottaa siitä tavallinen viimeisimmän altistuksen ja mittausviiveen vaikutus.

## 8. Hormoni ei ole sama asia kuin hormonin vaikutus

BERM:n kudoskohtaisessa androgeenireitissä yksi reseptoriosuus on

\[
S_r=R_r\frac{T_f}{K_{d,r}+T_f}G_r,
\]

missä \(R_r\) on reseptorin saatavuus, \(T_f\) paikalliseen tarkasteluun soveltuva vapaa testosteroni, \(K_d\) affiniteettiparametri ja \(G_r\) reseptorin jälkeinen välitys.

Pienille muutoksille:

\[
\delta\ln S_r=
\delta\ln R_r+\delta\ln G_r
+\frac{K_{d,r}}{K_{d,r}+T_f}
(\delta\ln T_f-\delta\ln K_{d,r}).
\]

**Johdettu seuraus tästä tuodusta biologisesta sulkeumasta:** sama vapaa testosteroni ei takaa samaa vaikutusta, jos reseptori tai sen jälkeinen välitys muuttuu. Kokonaispitoisuus on vielä kauempana toiminnallisesta päätepisteestä. Seerumin ja kiveksen sisäinen hormonitila sekä AR ja ZIP9 pidetään erillisinä.

Tämä ei itsessään anna EMF→reseptori-kerrointa. Katsaus tarvitsee tutkimuksia, joissa mitataan samassa asetelmassa kenttä, hormonien saatavuus, reseptorit, vastevälitys, toimintakyky ja palautuminen.

Läheinen komponenttihavainto on Yu ym. 2023: 2605 MHz:n kivespussialtistuksessa rotilla, SAR 1,05 W/kg, lyhytaikainen altistus ei heikentänyt spermatogeneesiä mutta lisäsi kivesten testosteronia ja Sertoli-solujen ZIP9:ää. Solukokeissa vaste vetyperoksidihaasteeseen muuttui, ja ZIP9:n estäminen heikensi testosteronin suojaavaa vaikutusta. Pidemmän altistuksen aikana ZIP9 väheni ja MDA lisääntyi. Tämä on konkreettinen kompensaation ja haasteessa mitatun kapasiteetin tutkimuskohde, ei ihmisen ympäristöaltistuksen kalibraatio. [Yu ym. 2023, abstrakti tarkistettu](https://pubmed.ncbi.nlm.nih.gov/36889209/).

Normaali perustason päätepiste ja alentunut reservi voivat siis esiintyä yhdessä. Piilevää reservin menetystä ei kuitenkaan saa päätellä pelkästä normaalista perustason tuloksesta: se täytyy mitata kuormitusvasteella ja palautumisseurannalla.

Sama päätepisteiden erottelu auttaa EEG-tutkimuksissa. Wi-Fi-yöaltistuksessa havaittu EEG-ero ilman unen rakenteen haittaa voi toimia fysiologisen vasteoperaattorin kalibraatiokohteena. Genotyyppiin liittyvä 5G-EEG-havainto voi puolestaan rajata ehdokastilamuuttujaa. Ne eivät yksin osoita heikentynyttä reserviä tai kanavavälitystä. Tarvitaan riippumaton toisto ja ennakkoon määritetty mekanistinen interaktiokoe. [Danker-Hopfe ym. 2020](https://pubmed.ncbi.nlm.nih.gov/32408065/), [Sousouri ym. 2025](https://doi.org/10.1016/j.neuroimage.2025.121340).

## 9. Organismeista populaatioihin tarvitaan oikea välittävä reitti

BERM:n yhteinen fysikaalinen syöte ei edellytä samaa biologista toteutusta kaikille lajeille. Vastaanottava rakenne, kehon koko, elinympäristö ja elinkierto määrittävät, mitä kannattaa mitata.

| Reitti | Nykyinen komponenttinäyttö | Olennaisin lisäys katsaukseen |
|---|---|---|
| RF-häiriö → lintujen kompassi → navigointi → eloonjäänti/lisääntyminen | Kontrolloiduissa kokeissa tiettyjen RF-olosuhteiden vaikutus kompassiin; toisilla taajuuksilla nollia. [Engels 2014](https://doi.org/10.1038/nature13290), [Leberecht 2023](https://doi.org/10.1073/pnas.2301153120) | Paikallisen signaalin, muuttoreitin ja populaation elinkelpoisuuden yhteismittaus; kompassihäiriö ei yksin anna kuolleisuuskerrointa. |
| Sähköinen/magneettinen aistiminen → ravinnonhankinta tai elinympäristön käyttö | Mehiläisten kukkasähkön aistiminen ja merikaapelien lähellä havaitut lajikohtaiset käyttäytymisvasteet. [Clarke 2013](https://doi.org/10.1126/science.1230883), [Hutchison 2020](https://doi.org/10.1038/s41598-020-60793-x) | Energian saanti, lisääntyminen ja vaihtoehtoiset ravinto- tai elinympäristöt; aistiminen on ensin normaalia toimintaa, häiriö tarvitsee oman näytön. |
| Kenttä → solutila/korjaus → elintoiminta → lisääntymiskyky | Edellä käsitellyt adaptiiviset, hormonaaliset ja nollatulokset | Samassa tutkimuksessa perusvaste, haastevaste ja palautuminen sekä molempien sukupuolten toiminnalliset päätepisteet. |
| Optinen yövalo → aisti/kello → uni, toiminta tai ekologia | Ihmisen valointerventio ja hyönteisten kenttähavainnot. [Chang 2015](https://doi.org/10.1073/pnas.1418490112), [Boyes 2021](https://doi.org/10.1126/sciadv.abi8322) | Valon spektri ja ajoitus erillään lampun elektroniikan kentistä; optinen mekanismi ei vahvista RF-mekanismia. |
| Kasvit ja mikrobit → kasvu, suuntautuminen, aineenvaihdunta → yhteisötoiminta | Laji- ja protokollakohtaisia tuloksia sekä nollia; lähdemuistiossa eritelty | Ennalta nimetty vastaanottava rakenne ja ekologinen toiminto; nisäkkään androgeeni- tai VGCC-reittiä ei siirretä oletuksena. |

Populaatiovaikutus voi syntyä myös ilman kudosvauriota: navigoinnin tai ajoituksen virhe voi muuttaa ravinnonsaantia tai lisääntymistä. Tämä reitti on katsauksessa yhtä tärkeä kuin toksikologinen vaurioreitti.

Toisaalta pelkkä solumuutos ei kerro populaatiovaikutuksen suuruutta. Esimerkiksi yksinkertaisessa suljetun populaation mallissa

\[
\dot N=(b-d)N,\qquad
\ln\frac{N_1(T)}{N_0(T)}
=\int_0^T[(b_1-d_1)-(b_0-d_0)]\,dt
\]

samasta alkuarvosta. Pieni pysyvä muutos syntyvyys- tai kuolleisuusnopeudessa voi kumuloitua, mutta kaava ei määritä EMF:n osuutta noista nopeuksista. Tiheysriippuvuus, muuttoliike ja ikärakenne tarvitsevat realistisessa sovelluksessa omat terminsä.

Ihmisen biologinen lisääntymiskyky, toteutunut hedelmöittyminen ja TFR ovat eri päätepisteitä. Etenevä BERM-ketju kulkee yksilön tilasta toimintaan ja lisääntymistapahtumaan, sitten ikä- ja tilajakauman yli populaatioon. Myös uni, käyttäytyminen, parisuhteet, ehkäisy ja sosiaalinen ympäristö käsitellään mahdollisina välittäjinä, muokkaajina tai yhteisinä syinä. Niiden roolia ei päätetä pelkän muuttujanimen perusteella.

Biologinen muutos voi vaikuttaa sosiaaliseen toimintaan; sosiaalinen ympäristö voi puolestaan muuttaa biologista tilaa ja altistusta. Siksi kaikkien tällaisten muuttujien vakiointi voi poistaa osan tavoitellusta kokonaisvaikutuksesta, kun taas niiden sivuuttaminen voi jättää sekoittumista. Tarvitaan ennalta piirretty kausaalirakenne ja määritelty vaikutuskohde.

## 10. Historiakatsauksesta tulee testi, kun myös poikkeamat ennustetaan

Teknologian käyttöönotto, paikallinen kenttä ja biologinen vaste asetetaan eri aikajanoille. Alueen havaintoyksiköksi sopii maa-arvon lisäksi esimerkiksi työympäristö, sähköverkon alue, kotitalous, kaupunki–maaseutu-pari, pesimäalue tai merikaapelin ympäristö.

BERM:n kannalta tärkeimmät historialliset kontrastit ovat:

1. **Eri aikaan alkavat altistukset:** sähköistys, broadcast, työperäiset lähteet ja mobiili alkoivat alueittain eri järjestyksessä.
2. **Korvautuminen:** vanhan verkon sulkeminen, pienempi puhelimen lähetysteho tai valaisinvaihto voi pienentää yhtä komponenttia ja muuttaa toista.
3. **Sama nykytila, eri historia:** testaa pitkäkestoista tilavaikutusta, mutta vaatii historian luotettavan mittauksen.
4. **Sama RMS, eri aaltomuoto tai yöaikainen käyttö:** testaa signaali- ja aikarakenteen lisäselitysvoimaa.
5. **Eri lajien vastaanotto:** ennakkoon määritelty vastaanottomekanismi ennustaa, missä lajeissa ja toiminnoissa vasteita pitäisi esiintyä.

Vuotta 2012 ei voi tehdä universaaliksi kynnykseksi sovittamalla kaikki maat siihen. Jos BERM:n valittu sulkeuma ennustaa kynnystä, sen ajoituksen pitää seurata paikallista ajuria, tilahistoriaa ja kalibroitua palautetta. Pitää ennustaa myös alueet, joilla kynnys ei ylity tai joissa vaikutuksen suunta on toinen.

Ensimmäiseksi historiallinen analyysi erottaa kaksi vaikutuskohdetta: määritellyn kenttäkomponentin vaikutuksen ja koko teknologisen muutoksen kokonaisvaikutuksen. Jälkimmäiseen kuuluvat esimerkiksi valaistuksen, käyttöajan ja elämäntapojen muutokset. Pelkkä käyttöönoton aikainen väestömuutos ei erota näitä reittejä.

Lisäselitysvoima arvioidaan alueilla ja ajanjaksoilla, joita ei käytetty sovitukseen. Vasteytimen jokainen uusi tilamuuttuja lisää joustavuutta; lisäys on perusteltu, jos se parantaa ennustetta tai saa riippumatonta mekanistista tukea.

## 11. Tutkimusohjelman käytännöllinen järjestys

| Prioriteetti | Toteutus | Mitä se ratkaisee? |
|---|---|---|
| 1. Aaltomuoto ja vastaanotto | Sama kudos, tarkistettu dosimetria ja lämpötila; saman RMS:n signaaliparit; ennakkoon määritetty vastaanottokaista | Tuottaako rakenteellinen ajuri ennustetun eron? |
| 2. Historia ja palautuminen | Risteytetty esialtistus × nykyaltistus, eri tauot ja toistomittaukset | Onko muistia, mikä palautuu ja millä aikavakiolla? |
| 3. Mekanistinen kapasiteetti | Reseptori/korjausmittaus, perus- ja haastevaste, valikoiva häirintä sekä palautuskoe | Onko ehdotettu välittäjä välttämätön, riittävä tai vain rinnakkainen merkki? |
| 4. Organismit ja ympäristö | Lajikohtainen aistiminen, liike, ravinnonhankinta ja lisääntyminen sekä mitattu paikallinen kenttä | Muuttuuko solun/aistin vaste merkitykselliseksi toiminnaksi? |
| 5. Alueellinen historia | Lähteiden käyttöönotot ja poistumiset, henkilö-/elinympäristömittaukset, ikä- ja tilajakaumat | Siirtyvätkö kalibroidut ennusteet väestöihin ja ekosysteemeihin? |

Jokaiselle kokeelle kirjataan etukäteen:

- käytetty BERM-versio, fysikaalinen syöte ja sen epävarmuus;
- kudos tai laji, tilamuuttujat, vastekaista, viive ja päätepiste;
- ennustettu suunta tai vastejärjestys sekä pienin merkityksellinen vaikutus;
- parametrit, joita sovitetaan, ja parametrit, jotka lukitaan;
- tulos, joka heikentäisi valittua mekanismia, sekä riippumaton toisto.

Tilariippuvaa toteutumaa heikentää, jos ennalta mitattu tila ei toistuvasti ennusta esitettyjä vaste-eroja. Muistireittiä heikentää, jos suunniteltu esihistoria ja tauotus eivät vaikuta riittävän tarkassa kokeessa. Kapasiteettireittiä heikentää, jos oletettu reservimuutos ei näy haasteessa eikä sen välittäjän muuttaminen vaikuta tulokseen. Tällöin heikkenee kyseinen nimetty toteutuma; yhtä tutkimusta ei käsitellä kaikkien mahdollisten BERM-versioiden testinä.

Aaltomuoto-, suunta- tai muistivaikutuskaan ei yksin erottele Lindgren-geometriaa muista mahdollisista fysikaalisista selityksistä. BERM:n erityinen tuki edellyttää etukäteen rajattua, fysikaalisesti perusteltua ennustetta, joka selittää uusia havaintoja paremmin. Pelkkä jälkikäteinen yhteensopivuus ei riitä.

## 12. Mitä alkuperäisessä katsauksessa pitäisi painottaa toisin?

| Alkuperäisen katsauksen painotus | Täsmennetty BERM-luenta |
|---|---|
| Teknologiamäärä ei osoita kentän kasvua | Rakenna lisäksi paikallisen kenttähistorian ja vastaanottotilan yhteinen kuvaus. |
| Ristiosat voivat keskiarvoistua pois | Tarkista myös ristiosien spektri, varianssi ja biologinen muunnos; nollakeskiarvo ei yksin poista dynamiikkaa. |
| Akuutti nollatulos rajaa näyttöä | Nimeä täsmällisesti rajattu lisävaikutus ja lähtötila; testaa historiaväite erillisellä asetelmalla. |
| Biologinen muutos ei ole automaattisesti haitta | Mittaa samassa ketjussa adaptaatio, vaurio, reservi ja toiminta; salli myös suojaavat ennusteet. |
| Hormoni- tai siemennestetulos ei ratkaise kokonaisuutta | Lisää reseptori-, kompensaatio- ja haastevasteen mittaukset. |
| Populaatiokertoimet puuttuvat | Johda nimetty etenemisreitti ja mittaa sen välivaiheet; älä päättele kerrointa teknologian ja trendin samanaikaisuudesta. |

**Uudelleenarvioinnin johtopäätös:** katsauksen vahvin BERM-lähtöinen tulos on perusteltu tarve tutkia monilähteisen kentän rakennetta yhdessä vastaanottavan organismin tilan, historian ja palautumisen kanssa. Matemaattinen rakenne antaa täsmällisiä testipareja, ja komponenttikirjallisuus antaa ehdokkaita biologisille välittäjille. Nykyinen aineisto ei vielä anna yksilöityä, määrällisesti validoitua ketjua teknologiasta globaaliin hedelmällisyys- tai biodiversiteettimuutokseen. Seuraava edistysaskel on rajata tällainen ketju ja testata sen ennusteet myös nolla- ja vastakkaissuuntaisissa olosuhteissa.
