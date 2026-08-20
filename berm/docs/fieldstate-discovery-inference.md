# BERM: discovery-first FieldState -päättely ja evidenssin kertyminen

**Tila:** BERM v2:n evidenssin tulkintasääntö.  
**Tarkoitus:** löytää Lindgren/FieldState-premisseistä seuraava signaali
useista epätäydellisistä aineistoista ilman, että täydellisen yksittäisen
paneelin puuttuminen muuttaa olemassa olevan näytön näennäiseksi nollaksi.

Tämä asiakirja erottaa kaksi kysymystä, joita ei saa enää sekoittaa:

1. **Mitä BERM:n kausaalirakenteesta, suunnasta, viiveestä ja
   herkkyydestä tiedetään jo?**
2. **Kuinka kapea numeerinen vaikutusväli voidaan juuri nyt estimoida
   tietylle organismille, elimelle, paikalle ja ajalle?**

Ensimmäinen on discovery- ja mallinrakennuskysymys. Toinen on
parametrin tarkkuuskysymys. Jälkimmäisen puute ei kumoa edellistä.

## 1. Evidenssi on mallin aktiivinen syöte, ei pääsykoe

BERM käyttää lähdettä siinä kohdassa, jossa sen tutkimusasetelma on
informatiivisin. Lähteitä ei rankata yhdellä yleisasteikolla eikä niitä
pakoteta todistamaan suoraan TFR:ää.

| Evidenssityyppi | Mitä se päivittää BERM:ssä | Esimerkki mallin käytöstä |
| --- | --- | --- |
| Fysiikan allekirjoitus | FieldStaten vektori-, kulma-, spektri-, vaihe- tai rajapintatermin olemassaolo | Blackman/Ritz/Usselman tukevat sitä, että sama keskiannos ei ole sama kenttätila. |
| Molekyyli- tai rescue-tulos | Kaavion reuna, vaikutussuunta ja välittäjä | CRY-riippuvainen ROS tai melatoniinirescue sitoo kenttäsignaalin redox-haaraan. |
| Elin- tai gamettipäätepiste | Elinkohtainen vaste, viiveperhe ja palautuva/persistentti muisti | BTB, sperman mitoROS/DNA/motiliteetti ja oosyytti-/varantotulokset erottelevat mies- ja naisreitin. |
| Lajien välinen/sentinellinäyttö | Siirtofunktion heterogeenisyys ja ennakkoindikaattorin mahdollinen suunta | Punkki–isäntä-, pölyttäjä-, magneettikompassi- ja tuotantoeläinsignaalit testaavat lajikohtaista kenttä–biologia-yhteyttä. |
| Ihmisen endpointit | Ihmiseen siirtyvän haaraan, vaikutusikkunaan ja mittakaavaan kohdistuva päivitys | Semen-, TTP-, IVF-, hormoni- tai raskaudenmenetysendpointti. |
| Kohortti/ASFR/TFR | Jo muodostetun ketjun ajallinen ja ikärakenteinen posterior predictive -testi | Nuori–vanha ASFR-kohorttiallekirjoitus, ei biologisen kertoimen takaperin sovitus. |

Tämän vuoksi `STRUCTURAL_ONLY` tarkoittaa **aktiivista rakennetta rajoittavaa
evidenssiä**, ei heikkoa tai hylättyä lähdettä. Se voi esimerkiksi sulkea pois
väärän annosmallin, määrätä viiveen suunnan, tehdä tietyn reseptori-/elinsiirron
pakolliseksi tai ennustaa lajien välisen eron. `ENDPOINT_CALIBRATED` tarkoittaa
vain sitä, että samasta haarasta on jo johdettu tarkempi numeerinen
endpoint-mapping.

## 2. FieldState on liikkuvan organismin jakauma

Ihminen tai eläin ei ole kiinteä anturi. Yksilön, parin tai lajin tehokas
kenttätila on sen oleskelu- ja liikealueelle painotettu jakauma:

\[
F_{i,o,t} = \int_{\Omega_i(t)}
w_i(x,t)\,T_{s,o}(x,t)\,\mathcal{F}(x,t)\,dx\,dt .
\]

Tässä

- \(\mathcal{F}(x,t)\) sisältää mitatun tai johdetun FieldStaten
  (tausta, vektori, spektri, vaihe, rajapinta ja aika),
- \(w_i(x,t)\) on koti-, työ-, ruokailu-, pesä-, laidun-, reitti- tai
  elinympäristöjakauma,
- \(T_{s,o}\) on laji-/elin-/geometriakohtainen siirtofunktio.

Tästä seuraa kolme käyttökelpoista match-tasoa:

| Match-taso | Käyttö | Mitä epävarmuutta kannetaan mukana |
| --- | --- | --- |
| `EXACT_SITE` | anturi ja endpoint samassa määritellyssä mikroympäristössä | mittauksen, oleskelun ja yksilöiden välinen vaihtelu |
| `MOBILITY_WEIGHTED_CATCHMENT` | tunnettu tai perustellusti arvioitu koti-/liikealue, useita lähimittauksia | liikepainot, etäisyys, oleskeluaika ja kenttäinterpolaatio |
| `LOCAL_AREA_ESTIMATE` | riittävän lähellä oleva paikallinen mittausverkko tai alue-estimaatti | alueellinen kenttägradientti, edustavuus ja ajallinen peitto |

`EXACT_SITE` antaa kapeimman vaikutusvälin. Muut kaksi ovat silti
**käyttökelpoisia havaintosisääntuloja**: niiden suurempi spatiaalinen ja
ajallinen epävarmuus mallinnetaan jakaumana, ei näytön poissulkuna. Ennalta
nimetty crosswalk, liike-/catchment-malli ja niiden epävarmuus ovat näkyviä
parametreja; mikään mielivaltainen etäisyysraja ei yksin ratkaise kelpoisuutta.

## 3. Bayesilainen BERM ei käytä nollapriorin naamioitua porttia

Käsitteellinen yhteismalli on

\[
p(\Theta,F,R,P,Y\mid D)
\propto
p(D_{\mathrm{physics}}\mid F)
p(D_{\mathrm{biology}}\mid F,\Theta,R,P)
p(D_{\mathrm{sentinel}}\mid F,\Theta)
p(D_{\mathrm{population}}\mid Y)
p(\Theta\mid E)
p(F\mid M).
\]

- \(F\) = liikkuvalle organismille painotettu latentti FieldState;
- \(R,P\) = palautuva ja persistentti elinmuisti;
- \(\Theta\) = siirto-, vaste-, herkkyys-, viive- ja heterogeenisuusparametrit;
- \(Y\) = elinendpointit, parikapasiteetti, ASFR ja TFR;
- \(E\) = tutkimusrekisterin lähdekohtainen mekanismi-, eläin-, ihminen- ja
  cross-species-evidenssi;
- \(M\) = mittaukset, liike-/catchment-estimaatit ja niiden provenienssi.

Priors eivät saa olla kapeita oletusnollia. Jokaiselle aktiiviselle haaralle
pidetään rinnakkain vähintään:

1. **mekanismipainotteinen prioriperhe** (fysiikan allekirjoitus + välittäjä),
2. **elin-/endpoint-painotteinen prioriperhe** (gametti, BTB, varanto,
   steroidogeneesi, implantaatio),
3. **ihmisendpoint-painotteinen prioriperhe**, ja
4. **heikosti informatiivinen prioriperhe**.

Lähteen tuki kaventaa ensisijaisesti topology-, suunta-, viive- ja
heterogeenisyysjakaumaa. Se ei saa piilottaa vaihtoehtoista, biologisesti
mahdollista osaa jakaumasta kovan nolla- tai etäisyysrajan taakse. Raportoitava
tulos on posteriori ja ennuste **kaikilla prioriperheillä**, ei vain yhdellä
valitulla asetuksella.

## 4. Lajien välinen johtaminen on FieldStaten vahvuus

Kun \(\mathcal{F}\) on kuvattu, eri lajeille ei oleteta samaa vaikutusta.
Mallista johdetaan sen sijaan

\[
\Theta_s =
\{T_{s,o}, W_{s,o}(f),\; g_{s,o}(\mathrm{orientation,\ redox,\ life\ stage}),
\; \tau_{R,s,o},\tau_{P,s,o}\}.
\]

Tämä tuottaa testattavia eroja:

- vektorille/kulmalle herkkä navigaatiolaji vs. vastaava kontrollilaji;
- staattista rajapintaa hyödyntävä loinen tai dispersoituja eliöitä vs.
  isäntä/lajin lisääntymisendpointti;
- mehiläisen, kimalaisen ja Varroa-/punkkihaaran erilainen sähköinen
  transfer-funktio;
- tuotantoeläimen hallittu ympäristö vs. vapaasti liikkuva seuraeläin;
- eri elinvaiheet, joissa kehityksellinen muisti tai gamettikierto ennustaa
  eri viiveen.

Tällainen cross-species-analyysi ei edellytä, että eläin on ihmisen
proksimuuttuja. Sen arvo on FieldState-pohjaisten allekirjoitusten,
suuntaerojen, viiveiden ja transfer-funktioiden testaamisessa.

## 5. TFR pysyy ulkoisena ennustetestinä

ASFR/TFR ei saa valita taaksepäin molekyyli-, elin- tai liikeparametreja.
Mutta se on erittäin informatiivinen, kun BERM:n premisseistä johdettu
allekirjoitus on lukittu:

- nuori–vanha kohorttiero;
- kehitysvaiheeseen painottuva, ei pelkästään samanaikainen vaikutus;
- eri maiden FieldState-, liike-, elin- ja parijakaumista seuraava
  heterogeenisyys;
- mies- ja naishaaraan sekä time-to-pregnancy-/ART-/parity-signaaleihin
  jakaantuva vaikutus;
- mahdollinen sentinelli → ihmisendpoint → ASFR -ennakkojärjestys.

WPP/ASFR-, sentinelli- ja mittausaineisto saavat siten lisätä tai vähentää
posteriorista uskottavuutta. Ne eivät saa korvata biologista ketjua yhdellä
kansallisella teknologiaproxyllä.

## 6. Kalibrointitasot eivät ole sulkuportteja

| Taso | Mitä se antaa | Mitä se ei tee |
| --- | --- | --- |
| Rakenne- ja allekirjoitusevidenssi | aktiiviset solmut, reunat, suunta, viiveperhe, herkkyyserot | ei väitä yhtä universaalia vaikutuslukua |
| Osittain mitattu FieldState + endpoint | paikallinen/alueellinen likelihoood, leveämpi parametri- ja ennusteväli | ei esitä osittaista kenttää täydellisenä elinannoksena |
| Liikealueelle painotettu FieldState + endpoint | suora, mutta epävarmuutta kantava organismi-/elinmalli | ei vaadi kirjaimellisesti samaa anturipistettä |
| Täysi paikallinen paneeli | kapein suora endpoint-kerroin ja vahvin transport-testi | ei mitätöi muiden tasojen jo tuottamaa signaalia |

Näin BERM voi oppia aineistosta jo nyt, pitää vaihtoehtoiset haarat auki ja
edetä kohti tarkempaa numeerista ennustetta ilman, että “puuttuu yksi täydellinen
paneeli” muuttuu tutkimuksen pysäyttäväksi johtopäätökseksi.
