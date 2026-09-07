# BERM:n elämänkaaripalapeli: toimintakyky, toteutusmahdollisuus ja uusiutuminen

7.9.2026. Rajattu tutkimusmuistio mallin järjestävistä liitoksista. Nykyinen työpuu tarkistettiin ennen puuttuvuutta koskevia väitteitä. Mallia tai sivustoa ei muutettu. Tämä muistio jatkaa steelmania eikä toista edellisen kierroksen PTEN-, PLCζ- tai kellokalvotutkimuksia.

**Ison kuvan tärkein täydennys on siirtää selityksen painopistettä yksittäisestä syntyvyysluvusta siihen, miten biologinen järjestelmä säilyttää, käyttää ja uusiutuu kykeneväksi toteuttamaan toimintoja ajan kuluessa.** Syntyvyys on tämän prosessin yksi havaittu virta. Nykykapasiteetti, jäljellä oleva mahdollisuus toteuttaa tavoite ja seuraavan sukupolven lähtötila ovat eri suureita, ja BERM voi yhdistää ne samaan kausaaliseen malliin.

Tässä kokonaisuudessa BERM pyrkii selittämään myös tavoitteen ja motivaation muodostumista: ehdollinen EMF→biologinen/hormonaalinen/neuraalinen muutos voi muuttaa sitä, mikä tuntuu palkitsevalta, raskaalta tai tavoittelemisen arvoiselta. Ilmaistu päätös ja sen perustelu ovat tämän haaran selitettäviä ulostuloja. Niitä ei aseteta mallin ulkopuolisiksi alkusyiksi pelkästään siksi, että henkilö kertoo ne syykseen.

Lindgren-portti on tässä sama kuin pääanalyysissä: vuoden 2025 premissi `g = η + κ A⊗A` tuottaa jaolla `A = A_b + a` täyden perturbation `δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Biologisen paikallisajurin ehdokas on `z(t) = ∫K(S,τ):δg(t−τ)dτ`. **K on avoin L2-kytkentä.** Seuraavat biologiset, päätökselliset ja väestölliset operaattorit ovat ehdollisia jatkoja; niiden näyttö ei siirry tämän kytkennän vahvistukseksi.

## Mitä on jo toteutettu

| Nykyinen osa | Mitä se jo tekee | Järjestävä jatkoliitos |
|---|---|---|
| [reproductive_state.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py>) | Elinkohtaiset palautuvat ja pysyvät tilat, erilliset nais-, mies- ja paritekijät sekä nimetyt kapasiteettisiirrot. | Yksittäisen hetkellisen kapasiteetin rinnalle elämänkaaren tilajakauma ja sen tulevaisuus. |
| [reproductive_calendar.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/outcomes/reproductive_calendar.py>) | Ehdollinen kalenteri/pariteetti, raskausaika, menetyksen jälkeinen palautuminen, synnytyksen jälkeinen tauko, ikä ja `maximum_parity`. Todennäköisyysmassa ja syntymät/pariteetti säilyvät. | Kalenterin olemassaolo ei ole aukko. Sisäsyntyinen yrityspäätös, muuttuva tavoite ja kalenterin palautekytkentä biologiseen tilaan ovat eri jatko-osia. Ikäkohtaiset tilat tulevat nyt kutsujalta. |
| [modulome/state.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/state.py>) ja [reproductive_bridge.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/reproductive_bridge.py>) | Vastaanotinvalmius, korjaus, vaurio, solun aikajono, kalvokoneisto, Ca²⁺-osastot ja toiminnallinen elinportti. Paikalliset hormonilähteet summataan ennen vaatimuksen arviointia, joten kompensaatio on jo mukana. | Paikallisen korjaantumisen erottaminen jo menetetystä kalenteriajasta, reservistä ja seuraavan sukupolven mahdollisuuksista. |
| [interactions/social.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/interactions/social.py>) | Sosiaalinen vaikutusten eteneminen ja tekojen kautta kertyvä tai kuluva instituutiovarasto. | Instituutiovaraston palautus konkreettiseksi kehitys- ja hoivaympäristöksi sekä seuraavan kohortin biologiseksi lähtötilaksi. |
| [model_modulome_asfr.py](</Volumes/kovalevy 3/extinctionfield/berm/berm/model_modulome_asfr.py>) | Ehdollinen moduloomi→pari→odotus/ASFR-reitti; kysyntä-, tempo- ja ART-suhteet eksplisiittisiä. | Halukkuus, kysyntä ja tempo on johdettava myös biologisen motivaation, toiminnan ja yhteisen ajoituksen ulostuloiksi. Laskennallinen syöterajapinta ei tee niistä riippumattomia kausaalisia kontrolleja. |
| Atlaksen intergenerationaalinen muisti, kysyntä/mahdollisuus ja ympäristöön palaavat kaaret | Sukupolvien väliset ja ympäristöä muuttavat reitit on jo nimetty topologiassa. | Kaarten nimeämisestä yhteiseen sukupolvioperaattoriin, joka erottaa biologisen periytymisen, kehitysympäristön, hoivan ja lisääntymisvalikoitumisen. |

`maximum_parity` on laskennan yläraja. Se voi kuvata annettua tavoitepariteettia, mutta se ei vielä ole toiveen muodostumisen tai muuttumisen malli. Myös moduloomin ikkunat ja korjaus ovat jo toimivia rakenteellisia osia; lisäarvo syntyy niiden yhdistämisestä elämänkaareen.

## 1. Hetkellinen kapasiteetti → jäljellä oleva tavoitteen toteutusmahdollisuus

Kaksi henkilöä tai paria voi olla tänään samassa toiminnallisessa tilassa, mutta heidän jäljellä olevat mahdollisuutensa eivät ole samat, jos ikä, aiempi odotus, reservi, nykyinen pariteetti tai käytettävissä oleva aika eroaa. Tämä koskee myös kahta identtiseen solutilaan palautunutta järjestelmää: palautuminen ei välttämättä palauta mennyttä tilapolkua.

Siksi kannattaa pitää rinnakkain kaksi tulosta:

\[
C_t=C(S_t),
\qquad
V_t(n^*,\pi)=P_\pi(N_T\geq n^*\mid S_t,a_t,N_t,E_t).
\]

`C_t` on nykyinen biologinen toiminta, `n*` tässä vertailussa annettu tavoite, `π` yrityksiä ja taukoja kuvaava toimintatapa, `E` ympäristö ja `V` tavoitteen saavuttamisen ehdollinen todennäköisyys jäljellä olevassa ajassa. Tämä ehdollinen laskenta erottaa tavoitteen toteutusmahdollisuuden sen muodostumisesta. Koko BERM-ketjussa myös tavoite ja toimintatapa voivat muuttua seuraavan kohdan biologisen motivaatiohaaran kautta.

Nykyinen kalenterimoottori laskee jo suuren osan `V`:n tarvitsemasta tilasiirtymästä. Puuttuva järjestävä liitos on kysyä sen avulla systemaattisesti: **miten sama nykytilan muutos vaikuttaa jäljellä olevaan mahdollisuuteen eri elämänkaarissa?** Esimerkiksi kuuden kuukauden viiveen vaikutus riippuu tulevien tilojen ja yritysten määrästä. Viive ei itsessään määrää pysyvää menetystä; koko myöhempi kalenteri ratkaisee korvautumisen.

Tämän voi esittää takaisinpäin laskettavana yhtälönä:

\[
V_t(x)=\sum_{x'}P(x'\mid x,\pi_t,z_t)V_{t+1}(x'),
\qquad V_T(x)=1[N_T\ge n^*].
\]

Tässä `x` sisältää myös biologisen tilan. Näin molekyylivasteen aikaskaala, elinkohtainen palautuminen ja kokonaisen elämän mahdollisuudet liittyvät samaan laskentaan. Jo olemassa oleva Habbema/kalenterianalyysi käsittelee rajallisen ajan merkitystä; uusi järjestävä askel on nostaa `V` omaksi ilmoitettavaksi suureekseen, ei lisätä samaa tempo-kerrointa toistamiseen.

**Mallin selitysvoima:** väliaikainen häiriö, pysyvä reservin muutos ja täysin korvautuva siirtymä eivät enää saa samaa tulkintaa vain siksi, että ne tuottivat saman tämänvuotisen syntymämäärän. Malli voi erottaa korjautuneen kudoksen, korjautuneen toiminnon ja korjautuneen elämänkaarituloksen.

## 2. EMF → biologinen tila → motivaatio → toiminta ja ilmaistu perustelu

BERM:n päätöshaara alkaa tässä ulkoisen kentän paikallisesta fysikaalisesta tilasta. Avoimen L2-kytkennän jälkeen ehdollinen ketju jatkuu vastaanottimen, kellon sekä endokriinisen ja neuraalisen tilan kautta koettuun palkitsevuuteen, kustannukseen ja motivaatioon. Ihminen kokee tämän oman halunsa, kiinnostuksensa, jaksamisensa tai vastahakoisuutensa muutoksena ja voi jäsentää sen ymmärrettäväksi syyksi ja päätökseksi.

**Käyttäjän tarkoittama selityssuunta on siis myös biologinen muutos→muuttunut halu→järkeistetty päätös.** Pelkkä selitys “kokemukset muuttivat odotuksia” jättäisi tämän BERM:n keskeisen haaran käsittelemättä. Kokemukset ja oppiminen säilyvät ketjun palautteina sekä perustelujen sisältönä.

\[
S_i(t+1)=F_S(S_i(t),z_i(t),feedback_i(t)),
\]
\[
M_i(t)=F_M(S_{endocrine,i},S_{neural,i},memory_i,context_i),
\]
\[
Q_{ij}(t)=F_Q(M_i,M_j,bond_{ij},deliberation_{ij},E_t),
\qquad A_{ij}(t)\sim P(A\mid Q_{ij},S_i,S_j,E_t),
\]
\[
R_i^{obs}(t)=H_R(M_i,Q_{ij},A_{ij},beliefs_i,language_i,context_i).
\]

`M` kuvaa motivaatiotilaa, `Q` yhteistä toimintapäätöstä, `A` tekoja ja `R_obs` ilmaistua perustelua. Nämä ovat nimettyjä ehdollisia operaattoreita; hormonipitoisuudesta yksittäiseen perusteluun johtavaa kerrointa ei ole tässä tunnistettu. Perustelu voi jäsentää tunnetta ennen tekoa, teon aikana tai sen jälkeen. Malli ei tarvitse oletusta kaiken harkinnan jälkikäteisyydestä: tietoinen harkinta voi myös muuttaa toimintaa ja myöhempää tilaa.

Tästä tulee kaksi rinnakkaista lisääntymishaaraa: biologinen tila vaikuttaa sekä **kykyyn onnistua yrityksessä** että **siihen, syntyykö halua ja yhteistä päätöstä yrittää ja milloin**. Halukkuus/kysyntä ja tempo ovat jälkimmäisen haaran endogeenisiä ulostuloja. Ne voidaan pitää ehdollisessa osalaskelmassa vakioina, mutta koko vaikutusta kuvattaessa niitä ei pidä automaattisesti poistaa riippumattomina kontrolleina. Molemmat haarat voivat jakaa saman upstream-tilan ja vahvistaa tai vaimentaa toistensa väestöllistä seurausta.

Halu, aiottu lapsiluku, arvio todennäköisestä lapsiluvusta, aikomus yrittää nyt, toteutunut yritys ja ilmaistu perustelu ovat erilaisia havaintoja tämän ketjun varrelta. Esimerkiksi perustelu “lapsi tuntuisi liian kuormittavalta” on relevantti havainto koetusta kustannuksesta; se ei yksin ratkaise, mikä tuon kokemuksen aiheutti. Biologinen tilamuutos, olosuhteiden todellinen muutos ja niiden yhteisvaikutus ovat eri selitettäviä reittejä.

Pitkittäisaineistojen tehtävä on tässä paikantaa havaittujen odotusten, aikomusten ja tekojen muutokset. Hayford 2009 analysoi NLSY79:n naisten lapsilukuodotusten muuttuvia elämänkaaripolkuja. Morgan ja Rackin 2010 vertasivat saman aineistoperheen nuoruusiän aikomuksia myöhempään lapsilukuun: yksilötason ero oli tavallinen, vaikka keskiarvot olivat lähempänä toisiaan. Ne eivät ole kaksi riippumatonta kohorttia eivätkä suora testi EMF→hormonit→motivaatio-ketjusta. [Hayford 2009](https://pubmed.ncbi.nlm.nih.gov/20084828/), [Morgan ja Rackin 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC2857728/).

Testa ym. 2014:n italialainen paripitkittäisaineisto osoitti, että kumppanien ajoitusaikomusten erimielisyyden yhteys myöhempään syntymään riippui pariteetista. Siksi universaali vakio “vain heikompi halu ratkaisee” tai puolisoiden toiveiden keskiarvo ei riitä parin päätösoperaattoriksi. [Testa ym. 2014](https://onlinelibrary.wiley.com/doi/10.1111/j.1728-4457.2014.00649.x).

**Mallin kannalta korjattu johtopäätös:** pienenevä toive, lykkäävä päätös ja ilmaistu järkevä syy voivat kuulua samaan ketjuun, jonka upstream-muuttuja on biologinen motivaatiotila. BERM pyrkii selittämään juuri tämän tilan fysikaalis-biologista syntyä. Havaittu kertomus ei sellaisenaan osoita tätä syntyä, mutta sitä ei myöskään tule käyttää perusteena katkaista biologista ketjua kertomuksen kohdalla. Raskauden menetykset, hoitokokemukset, onnistumiset ja kumppanin reaktiot päivittävät seuraavaa tilaa ja sen tulkintaa tämän perusketjun palautteina.

NLSY79:n dokumentaatio erottaa toivotun ja odotetun lapsiluvun kysymykset ja kertoo mittausvuodet; toive kysyttiin vuosina 1979 ja 1982, odotus useissa aalloissa vuoteen 2012. [Virallinen NLSY79-dokumentaatio](https://nlsinfo.org/content/cohorts/nlsy79/topical-guide/marriage-and-children/fertility). Aineisto voi rajata havainto-operaattoria ja muutosten aikajärjestystä, mutta kaikkien aaltojen muuttujia ei pidä nimetä “haluksi”. Biologisen alkuhaaran tunnistaminen tarvitsee erikseen yhteensopivat paikallisen tilan, fysiologian ja motivaation mittaukset.

## 3. Vanhempien tila → syntymävalikoituminen → kehitysympäristö → seuraavan sukupolven lähtötila

Sukupolvien välinen jatkumo ei edellytä, että jokainen pitkä vaikutus kulkisi saman sukusolun epigeneettisen merkin mukana. Vanhemmat rakentavat lapsen fyysisen ja vuorovaikutuksellisen kehitysympäristön: ravinnon, vuorokausirytmin, hoivan, turvallisuuden, ympäristön signaalit sekä pääsyn terveydenhoitoon. Nämä ovat materiaalisia, hermostoon ja elimiin kytkeytyviä syötteitä.

Koko siirtymä kannattaa kirjoittaa jakaumalle:

\[
f_{g+1}(s')\propto
\iint f_g(s_m,s_f)\,
p_{birth}(s_m,s_f,E_g)\,
T(s'\mid s_m,s_f,E_{prenatal},care,I_g)\,ds_mds_f.
\]

Tässä `p_birth` valikoi sen, ketkä tulevat seuraavan sukupolven vanhemmiksi, ja `T` kuvaa lapsen kehitystä. Biologinen periytyminen, raskausympäristö ja syntymän jälkeinen hoiva voidaan pitää `T`:n erillisinä osina. Lisääntymiskyvyn muutos voi muuttaa sekä lasten lukumäärää että syntyvien lasten kokemien ympäristöjen jakaumaa.

Tästä seuraa kaksi keskeistä päätelmää:

- Sukupolvivaikutus voi jatkua, vaikka välitön alkuärsyke olisi poistunut, jos vanhempien tilan tuottama hoiva- tai kehitysympäristö säilyy muuttuneena.
- Syntyneistä tai myöhemmin onnistuneesti lisääntyvistä henkilöistä mitattu keskiarvo on jo valikoitunut. Sen vakautta on luettava yhdessä syntymien ja lisääntymään päätyvien osuuden kanssa. Valikoituminen ei itsessään kerro, mihin suuntaan keskiarvo muuttuu.

Komponenttinäyttöä on sekä eläimistä että ihmisistä. Francis ym. 1999:n ristiinkasvatuskokeet yhdistivät rotan emon hoivakäyttäytymisen jälkeläisen stressireaktiivisuuteen ja seuraavan sukupolven emokäyttäytymiseen; se osoittaa käyttäytymisen välittämän sukupolvisillan tässä eläinmallissa. [Francis ym. 1999, alkuperäisartikkeli](https://www.psychology.mcmaster.ca/bennett/cp2008/schmidt/Frances_etal_1999.pdf). Campbell ym. 2014:n satunnaistetun Abecedarian-ohjelman seuranta yhdisti varhaislapsuuden kokonaisintervention myöhempiin fysiologisiin terveyspäätepisteisiin. Se oli ravitsemusta, hoitoa ja kehitysympäristöä muuttava kokonaisuus, ei koe yhdestä yksittäisestä mekanismista eikä sukupolvivaikutuksen suora mittaus. [Campbell ym. 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4028126/).

**Mallin selitysvoima:** sosiaalinen ja biologinen jatkumo saavat yhteisen mekanistisen rajapinnan. Instituutiot ja hoiva muuttavat seuraavan kohortin kehityssyötteitä, jotka muuttavat myöhempiä hermosto-, elin- ja toimintatiloja. BERM:n ei tarvitse valita fyysisen ja sosiaalisen selityksen väliltä; sen on määriteltävä niiden välinen ajallinen siirtopolku.

## 4. Nykyisen tuotoksen kompensaatio → ylläpitokustannus → uusiutumiskyky

Nykyinen malli tunnistaa jo paikallisen kompensaation. Saman periaatteen jatko elämänkaareen on kysyä, **millä resurssi- ja aikakustannuksella havaittu toiminto säilyy**. Sama syntymämäärä, hormonitaso tai yhteiskunnallinen palveluvirta voi syntyä eri määrällä yrityksiä, hoitoa, taukoja ja muiden ihmisten panosta.

Erotetaan kolme tilaa ilman niiden pakottamista yhdeksi pisteytykseksi:

\[
Y_t=F(output\ capacity_t,effort_t,substitution_t),
\]
\[
R_{t+1}=R_t+renewal_t-use_t-loss_t,
\]
\[
I_{t+1}=retention\cdot I_t+contribution(actions_t)-withdrawal_t.
\]

`Y` on nykyinen tuotos, `R` biologinen tai rajattu toiminnallinen reservi ja `I` jo toteutuksen sisältämä instituutiovarasto. Eri reservityyppien yksiköt ja uusiutumisominaisuudet pitää nimetä; niitä ei voi summata sellaisinaan.

Järjestävä liitos on `Y→use/care demand→R/I→seuraavan jakson Y ja T`. Jos nykyinen tuotos säilytetään lisäpanoksella, pelkkä tuotoksen vakaus ei kerro varastojen tilaa. Toisaalta toimiva korvaava teknologia tai hoivajärjestely voi aidosti säilyttää tavoitteen toteutusmahdollisuuden. Kumpikin polku kuuluu steelmaniin: kompensaatio on selitettävä osa dynamiikkaa.

Väestöllisesti tästä kannattaa raportoida rinnakkain:

1. toteutuneet syntymät ja pariteettisiirtymät;
2. yritysten, menetysten, hoitojen ja ajan jakaumat;
3. jäljellä olevan tavoitteen toteutusmahdollisuus `V`;
4. seuraavan kohortin lähtötilan jakauma ja sen ylläpitoon käytetty panos.

Tämä ei ole valmis väite siitä, että nykyinen syntyvyys kaikkialla säilyisi reserviä kuluttamalla. Se on täsmällinen vaihtoehtoinen tilapolku, jonka olemassaolon malli osaa rakenteellisesti käsitellä ja jonka suhteen tieto voidaan järjestää.

## Yhteinen palapeli

Näiden neljän liitoksen jälkeen BERM:n selitettävä kokonaisuus on yhden TFR-käyrän sijaan **tilapolkujen jakauma**:

`EMF:n paikallinen fysikaalinen tila → avoin L2 → vastaanotin/kello/endokriininen ja neuraalinen tila → sekä fysiologinen kapasiteetti että koettu palkitsevuus, kustannus ja motivaatio → toiminta, ilmaistu perustelu ja parin yhteinen ajoitus → kalenterissa toteutuvat tapahtumat → reservit, hoiva ja instituutiot → seuraavan sukupolven kehitys ja myöhempi fysikaalinen ympäristö`.

Kausaalinen suunta kulkee tätä kautta, ja kokemukset sekä oppiminen palaavat seuraavien ajankohtien biologiseen ja neuraaliseen tilaan. FieldState, ilmoitetut motiivit ja väestötilastot ovat eri kohtiin asetettuja havainto-operaattoreita, joilla tilaa päätellään. Kun syntyvyys palautetaan yhdeksi tämän prosessin ulostuloksi, mallin muut biologiset ja sivilisaatiota koskevat osat saavat yhteisen tarkoituksen: selittää miten järjestelmä ylläpitää toimintaa nyt, muodostaa tavoitteita, säilyttää tulevat mahdollisuudet ja tuottaa seuraavan toimintakykyisen kohortin. Solutilan, yksilön tai yhteiskunnan palautuminen voidaan tämän jälkeen määritellä kysymällä täsmällisesti, mikä näistä suureista palautui.
