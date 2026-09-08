# Lisääntymisen säätelyn integraatio: toteutus ja säilymisauditointi

Päiväys: 8.9.2026. Tämä raportti kuvaa tarkastettua toteutusta ennen julkaisun vahvistamista.

## Toteutettu kokonaisuus

BERM:n biologiseen malliin lisättiin lisääntymisen säätelyn rakenteellinen kuvaus. Se erottaa motivaation ja toteutuvat kohtaamiset, fysiologisen kapasiteetin sekä hoivan määrän ja kohdentumisen. Biologinen tila, sosiaalinen tilanne, oppimishistoria, laji, sukupuoli, elämänvaihe ja havaintoikkuna kuuluvat saman profiilin ehdollistaviin tietoihin. Aiemman vertailun kaikki kahdeksan akselia säilyvät erillisinä havaintoina, joilla on omat mittansa ja yksikkönsä.

Uusi laskennallinen koostaminen yhdistää aikomuksen, lisääntymiselle altistavan kohtaamisen, hedelmöittymisen ja elävänä syntymisen ehdolliset todennäköisyydet. Aikomuksen sisältävä ja aikomukseton haara käsitellään erikseen: suunnittelemattomat raskaudet ja syntymät säilyvät mukana. Syötteet ovat käyttäjän tai aineiston antamia saman kontekstin todennäköisyyksiä. Koostaminen ei oleta haarojen riippumattomuutta eikä tuota vuosittaista syntyvyyslukua tai TFR:ää. Uusia hormonaalisia kertoimia ei sovitettu.

Kanoniseen kausaalimalliin lisättiin kaksi solmua ja neljä yhteyttä. Aiempi `DEMAND_OPPORTUNITY`-tunnus säilyy, mutta sen kuvaus täsmentyy lisääntymiselle altistaviksi kohtaamisiksi ja yrityksiksi. Uusi `REPRODUCTIVE_OPPORTUNITY` erottaa ulkoiset ja vuorovaikutuksessa muodostuvat mahdollisuudet käyttäytymisestä; `CAREGIVING_ALLOCATION` kuvaa hoivan määrää, kohdentumista ja kontaktipalautetta. Kausaalikaavio ja Atlas käyttävät samoja uusia rajapintoja. Ajallinen sosiaalinen palaute kuvataan Atlas-laajennuksessa ilman samanaikaisen kanonisen verkon syklittämistä. Epistapegen haara päättyy edelleen institutionaaliseen uudelleenkäyttöön; hedelmällisyys ei edellytä kulkua sen kautta.

Sivustolle lisättiin oma [lisääntymisen säätelyn kokonaisuus](https://www.extinctionfield.com/fi/behavior/reproductive-regulation), kahdeksan akselin tarkastelu, lähteiden ja aineistoperheiden suodatus sekä olemassa olevien aineistojen käyttörajaukset. Integraatiot ulottuvat käyttäytymiseen, mallin pääsivuun, biologiseen koordinaatioon, näyttöjen konvergenssiin, proxy maskingiin, sivilisaation pääsivuun sekä Pathopegeen, Pathopolitekseen, Patopolikseen, Patokinesikseen ja Epistapegeen. Reitti lisättiin navigaatioon ja sivukarttaan.

Kokonaisuudella on yhteinen koneluettava rekisteri ja kaksi tavuntarkkaa sivustopeiliä. Rekisterissä on 31 tutkimustietuetta: 24 komponenttikoetta ja 7 havainnoivaa tutkimusta. Lisäksi siinä on 4 ehdollista synteesiä, 38 rekisteröityä aineistotietuetta ja 26 perhekuvausta. Aineistotietueiden määrä ei tarkoita 38 itsenäistä replikaatiota. Tutkimuksen, aineiston ja tutkimusperheen riippuvuudet säilyvät eksplisiittisinä. Lähdeluetteloon lisättiin 35 viitettä.

BERM säilyy selittävänä mallina ja FieldState sen valinnaisena mittaus- ja estimointihaarana. Tuotu komponenttibiologia, BERM:n ehdollinen synteesi ja avoin geometria–kudos-kytkentä sekä ihmispäätepisteiden kalibrointi erotetaan toisistaan. Integraatio ei ole uusi kenttäaltistuskoe eikä olemassa olevien komponenttikokeiden uudelleenluokittelu sellaisiksi.

## Tarkastuksen vertailupohja

Julkaisutyötila perustuu `origin/main`-versioon `bfc1b32c2d1950bb023aaef53694c197a2b5e436`. Näin mukana säilyvät myös aiempien rinnakkaisten töiden julkaistut kuvitukset, lähdeauditit ja Atlas-täydennykset.

- Alkuperäinen työtila: `/Volumes/kovalevy 3/extinctionfield`.
- Julkaisutyötila: `/Volumes/kovalevy 3/berm-release-worktrees/reproductive-regulation-20260908`.
- Tarkastettu muutosaineisto: 58 toteutus- ja tutkimustiedostoa sekä 3 generoituvaa hakemistotiedostoa.

Kaikki 58 toteutus- ja tutkimustiedostoa sekä kolme generoitua hakemistotiedostoa ovat tavuntarkasti samat alkuperäisessä ja julkaisutyötilassa. Lopullinen säilymistarkastus vahvisti kaikkien 61 tiedoston yhtenäisyyden.

## Säilymisen tulokset

| Kohde | Vertailutulos |
| --- | --- |
| Lähdeluettelo | Kaikki 1 300 aiempaa viitetietuetta ovat täydellisesti ennallaan. Viitteitä on nyt 1 335. |
| Kausaalisolmut | Kaikki 47 aiempaa solmutunnusta säilyvät; yhteensä 49. |
| Kausaalireunat | Kaikki 97 aiempaa reunatietuetta, niiden ID:t, päät ja tyypit säilyvät täydellisesti; yhteensä 101. |
| Väitteet | Kaikki 114 aiempaa claim-ID:tä säilyvät; yhteensä 118. Aiemmista väitteistä vain `claim.proxy.behavioural-profile-integration` täydentyi. |
| Näyttösuhteet | Kaikki 303 aiempaa tunnusta säilyvät; yhteensä 340. Kymmenen aiemman suhteen sisältöä täsmennettiin. |
| Episteemiset arviot | Kaikki 114 aiempaa tunnusta säilyvät; yhteensä 118. Aiempi käyttäytymisprofiilin arvio täydentyi. |
| Vaihtoehtoiset reitit | Kaikki 5 aiempaa reittitietuetta säilyvät täydellisesti ennallaan. |
| Kuva-, video- ja PDF-tiedostot | Kaikki 51 vertailuversiossa seurattua tiedostoa säilyvät tavuntarkasti. |
| Visuaalisten komponenttien upotukset | 253 aiempaa viittausta 137 komponenttisijainnissa ja 79 lähdetiedostossa säilyvät; yhtään poistumaa ei havaittu. |
| Aiemmat data- ja raporttitiedostot | 92 tiedostosta 83 säilyy tavuntarkasti. Yhdeksän muutosta rajoittuu jäljempänä kuvattuihin rekistereihin ja metatietoihin. |
| Numeeriset ennusteet ja sivilisaatiokertoimet | Erillinen seitsemän keskeisen tiedoston tavutarkastus ei havainnut muutoksia. |
| Interventioskenaariot | Kaikki 12 aiempaa skenaariotietuetta ja aiempi metatieto säilyvät täydellisesti ennallaan. |

Visuaalisten upotusten tarkastus on lähdekoodista tehty komponenttiviittausten säilymisvertailu. Se täydentää selaimessa tehtävää tarkastusta; se ei yksin todista jokaista esitystilaa virheettömäksi.

Yhdeksän muuttunutta aiempaa datatiedostoa ovat ankkurihakemisto, Atlas-väitekytkennät, Atlas-laajennukset, kausaaliverkko, väiterekisteri, mallin arkkitehtuuri, lähdeluettelo sekä interventioskenaarioiden kaksi peiliä. Interventiomuutos lisää ainoastaan metatiedon MCU/Ru360-profiilista: lähdetutkimus on mukana, mutta sille ei keksitä puuttuvaa synteettistä protokollaa, ajoitusta tai kerrointa. Yksikään aiempi skenaarioluku ei muutu.

Numeerisen ennustamisen erityistarkastus kattoi `data/predictions.json`, `website/lib/cohortAsfr.json`, `website/lib/predictionSeries.json`, `website/public/data/civilization_indices.json`, testosteroni–TFR-raportin ja sen lähdemanifestin sekä `berm/berm/civilization/political_biology.py`-tiedoston. Säilymisvertailu ei yksin validoi vanhoja ennusteita; se osoittaa, ettei tämä integraatio muuttanut niiden aineistoa tai kertoimia.

Bibliografian metatietolaskurit korjattiin aineiston mukaisiksi: `linked_count = 671`, `unlinked_count = 664`, yhteensä 1 335. Atlas-luokitus asettaa uuden ulkoisten mahdollisuuksien solmun havainto-/assosiaatioluokkaan C. Kumpikaan korjaus ei muuta vanhoja lähdetietueita.

## Testaus

Toteutuksen testitulokset perustuvat tämän tehtävän suoritettujen työkalukutsujen tuloksiin. Keskeytys poisti väliaikaiset lokit. Tämä säilymisauditointi tehtiin erikseen uudelleen levyllä olevista lähteistä ja julkaisutyötilan vertailuversiosta.

- Pythonin koko 2 248 testin ajossa 2 246 läpäisi aluksi. Kaksi virhettä korjattiin, minkä jälkeen niitä kattava 50 testin uusinta läpäisi. Toinen virhe poistui ajamalla CLI-testi oikeasta berm-hakemistosta. Toinen korjattiin kirjaamalla tutkimusprofiili eksplisiittisesti vain näyttöön perustuvaksi, koska sille ei ollut määritelty synteettistä interventioprotokollaa.
- Sivuston koko 960 testin ajossa 959 läpäisi aluksi. Bibliografian vanhentuneet metatietolaskurit korjattiin; korjausta kattava 23 testin uusinta läpäisi.
- Tuotantorakennus läpäisi. Rakennuksen jälkitarkastus kattoi 567 renderöityä HTML-sivua sekä hakumateriaalin muodostamisen. Uusi kokonaisuus sisältää suomen- ja englanninkieliset sisällöt; muiden kielten englanninkielinen varasisältö ja käännösilmoitukset kuuluvat rakennettuihin reitteihin.
- Testaus toteutettiin koko ajon ja korjauksia kattavien uusintojen yhdistelmänä. Raportti ei väitä, että molemmat kokonaiset testisarjat olisi ajettu uudelleen viimeisten korjausten jälkeen.

## Selaintarkastus ja viimeinen rakennus

Uusi kokonaisuus tarkastettiin suomeksi ja englanniksi 1 280 pikselin leveydellä sekä suomeksi 390 pikselin mobiilileveydellä. Vaakasuoraa sivuylivuotoa ei havaittu. Etusivu ja seitsemän päävalikon ryhmää säilyivät näkyvissä myös mobiilissa. Kolmen haaran kuvaus säilyttää kohtaamisten ja fysiologisen kapasiteetin yhteyden syntymään sekä hoivan myöhempään palautteeseen myös päällekkäisessä mobiiliasettelussa.

Tutkimussuodatus tarkistettiin koko aineistosta (31 tutkimusta) havainnoiviin tutkimuksiin (7 tutkimusta, 6 perhettä) ja edelleen Cebu-perheeseen (2 tutkimusta, 1 perhe). Gettlerin vuoden 2013 tietueen lähde- ja perhetiedot avautuivat oikein. Mallikaavion 49 solmua, lisääntymisen säätelyn korostus, hoivan tietopaneeli ja siirtyminen hoivan solmuun laajassa Atlaksessa tarkistettiin. Näyttölajit ja avoin kalibrointi näkyvät myös solmun lisätiedoissa.

Selaintarkastuksessa havaittu mallisivun vanhan SVG-kuvaajan otsikon palvelin–selain-ristiriita korjattiin kokoamalla otsikkoteksti yhdeksi merkkijonoksi. Korjaus ei muuta sen tekstiä tai lukuarvoja. Korjauksen jälkeinen tuotantorakennus ja kaikkien 567 HTML-sivun jälkitarkastus läpäisivät; mallisivun uusissa työpöytä- ja mobiilitarkastuksissa ei kirjautunut selainvirheitä tai varoituksia. Myös uuden englanninkielisen kokonaisuuden ja suomenkielisen Atlaksen erilliset selainavaukset olivat virheettömät.

Paikallisen tuotantopalvelimen HTTP-tarkastus läpäisi 60/60 sivua (12 reittiä × viisi kieltä). Kaikki 55 aiempien reittien kieliversiota sisältävät integraation, tekstin ja täsmällisen linkin uuteen kokonaisuuteen. Uuden sivun kaikki yhdeksän ankkuria löytyivät kussakin kielessä kerran. Ladattava 126 018 tavun JSON vastasi tavuntarkasti julkaisutyötilan lähdettä.

## Julkaisun loppuvaihe

Tämä raportti ja säilymismanifesti kuuluvat testattuun julkaisucommitin sisältöön. Varsinainen julkaisutunnus, tuotantopalvelun vahvistus ja julkisten reittien tarkistus kirjataan julkaisun valmistuttua erilliseen `PUBLICATION.json`-tiedostoon alkuperäiseen työtilaan. Julkaisun onnistumista ei päätellä pelkästä lähdekoodin siirtämisestä.

## Koneluettava tarkastusaineisto

[preservation_manifest.json](./preservation_manifest.json) sisältää tarkastettujen tiedostojen SHA-256-tiivisteet, viite- ja reunatunnusten erot, kuvatiedostot, komponenttiviittaukset, datatiedostot ja testitulosten rajauksen. Manifestin 61 tiedoston aineisto kattaa toteutuksen, tutkimusraportit ja generoidut hakemistot. Tämä raportti ja manifesti itse ovat auditin tulostiedostoja, joten ne on rajattu manifestin sisältämiä tiedostotiivisteitä koskevan joukon ulkopuolelle. Näin manifesti ei yritä sisältää oman sisältönsä tiivistettä.
