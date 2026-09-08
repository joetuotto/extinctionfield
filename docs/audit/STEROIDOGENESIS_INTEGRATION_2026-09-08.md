# Kalsium–redox–steroidogeneesin integraatio 8.9.2026

Integraatio päivittää BERM:n toteutetun mallirakenteen ja 22 sivupohjaa. Se yhdistää paikallisen kalsium-, kello-, redox- ja kolesterolihuollon hormonituotantoon sekä edelleen nykyiseen saatavuuden, reseptorivasteen, käyttäytymisen ja lisääntymistoiminnan ketjuun.

## Mitä malliin tuli

- Absoluuttinen GSH/GSSG-mittaustietue, osasto, molaariset yksiköt ja lähdeprovenienssi. Ekvivalenttipooli `G_T = GSH + 2 GSSG` erotetaan suhteesta ja hetkellisestä ROS:sta.
- Nimetty steroidogeneesin koe- ja stimulaatiokonteksti. Tuotanto elävää solua kohden erotetaan solumäärästä, seerumipitoisuudesta ja lisääntymistuloksesta. Vertailu vaatii yhteismitalliset olosuhteet; puuttuva mittaus jää puuttuvaksi.
- Paikallisen Ca/redox-haaran kausaaliliitos steroidogeneesiin ja kahdeksas koottu näyttösynteesi. Atlas näyttää yhteisen huolto- ja varantokokonaisuuden sekä liitokset kalsiumiin, kelloon, autofagiaan, mitokondrioihin ja hormonituotantoon.
- Rakenne → ehdolliset suunnat → myöhemmin aineistolla identifioitava suuruus. Uusia sovitettavia glutationivirran vakioita, populaatiovaikutuskertoimia tai TFR-muunnoksia ei lisätty. Vanhojen numeeristen vertailujen tiedostot säilyvät ennallaan.

## Tutkimus ja sivusto

Kanoninen katalogi sisältää 42 koetutkimusta: 12 kenttäkoetta ja 30 komponenttikoetta. Lisäksi on viisi BERM-synteesiä ja kaksi aineistoresurssia. Katalogin 37 tutkimusperhettä ovat provenienssiryhmiä; niitä ei nimetä 37 riippumattomaksi replikaatioksi. Galano 2021/2022:n GSE165392-aineiston uudelleenkäyttö ilmoitetaan.

Viimeisimpään aiempaan julkaisuun `613edbf` verrattuna lisäys on 34 kanonista lähdetietuetta, neljä luonnosväitettä, 57 kuratoitua lähdesuhdetta ja neljä epistemistä arviota. Kaikki sen 1 226 lähdettä, 106 väitettä, 211 lähdesuhdetta, 106 arviota ja viisi reittiä säilyvät sisällöltään ennallaan.

Uusi sivu `/biology/calcium-redox-steroidogenesis` sisältää yhtyvien mekanismien kaavion, mekanismi- ja näyttölajisuodatuksen, tutkimusperheet, tutkimuskohtaiset protokollat, mittaukset ja rajaukset sekä kolmen vaiheen näkymän. Pääteksti ja käyttöliittymä ovat viidellä kielellä. Japaninkielinen näkymä ilmoittaa avoimesti niistä tutkimus- ja aineistokuvauksista, jotka näkyvät toistaiseksi englanniksi.

Päivitys ulottuu mallin yleiskuvaan, biologiseen koordinaatioon, biologia- ja evidenssihubeihin, konvergenssiin, moduloomiin ja sen kives-/haimanäkymiin, testosteroniin, vuorokausirytmiin, farmakologiaan, Timothy-vertailuun, lisääntymiskaareen, käyttäytymiseen, sivilisaatioon, matematiikkaan, epistemologiaan, ennusteisiin, dataan, Explore-selausnäkymään ja proxy masking -sivuun. Tutkimus- ja mallirakenne on ladattavissa `/data/steroidogenesis.json`-osoitteesta. Vanha `/{locale}/data` ohjaa `/{locale}/explore`-sivulle; käytössä olevan selausnäkymän oma tutkimuskortti linkittää sekä mekanismisivulle että ladattavaan katalogiin.

Testosteroni- ja kivestekstit tarkennettiin: keskinen ohjaus ja paikallinen hormonituotannon rajoite voivat esiintyä rinnakkain. Yhteisiä pullonkauloja ei kerrota riippumattomiksi menetyksiksi. Nykyisen tuotannon todellinen säilyminen varannon pienentyessä erotetaan mittarin epäherkkyydestä. Chenin päätepiste on LH-stimuloitu progesteroni ilman lisäoksidanttia; Houstonin ROS-muutos tapahtui altistuksen jatkuessa.

## Tarkistus ja säilyminen

Sivuston koko integraation testiajo: **518 testiä / 44 tiedostoa läpi**. Ensimmäisessä rinnakkaisessa ajossa atlasnäkymän yksi testi ylitti viiden sekunnin aikarajan; erillinen ajo ja koko sarja kahdella testityöntekijällä läpäisivät ilman testin aikarajan tai toteutuksen muuttamista.

Mallin lopullinen koko testiajo: **2 155 testiä läpi** (346,95 s). Eristetystä tarkistuskopiosta aluksi puuttuneiden paikallisten aineistojen aiheuttamat 27 virhettä ratkesivat, kun jo olemassa olevat aineistot liitettiin testien käyttöön. Näitä Gitin ulkopuolisia aineistoja ei lisätä julkaisuun.

Tuotantokäännöksen lopputulos ja selainvarmennus: **tuotantokäännös läpi; 557 esirenderöityä reittiä ilman raakoja viitetunnisteita, tyhjiä tekstielementtejä tai tyhjiä linkkejä**. Kaikkien 22 muutetun sivupohjan integraatio tarkistettiin kaikilla viidellä kielellä (110 sivutarkistusta, joissa tarkistettiin sivukohtainen integraatio-osio). Selaimessa suodatus, vaiheet, tyhjän haun palautus, kielinäkymät, varanto-osioon siirtyminen ja Biologia-valikko toimivat. Pääotsikot ja Etusivu näkyvät 390 px:n leveydellä; 390 ja 1 280 px:n näkymät eivät ylitä ruudun leveyttä. Julkisen JSON-reitin sisältö vastaa mallin vientiä tavutasolla. Rekisteri-, viite- ja tyyppitarkistukset sekä tiukka lint sisältyvät tuotantotarkistukseen. Rekisteritarkistuksen 14 aiempaa DKC-varoitusta koskevat kalibroimattoman DKC-kandidaatin omaa julkaisutasoa; sen tilaa ei muutettu tässä integraatiossa.

Explore-kortin viimeistelyn jälkeen tuotantokäännös siihen kuuluvine tyyppi-, rekisteri- ja lint-tarkistuksineen ajettiin uudelleen. Kaikkien 110 sivun tarkistuksessa varmistettiin juuri kyseisen integraatio-osion tunniste; Explore-sivulla lisäksi JSON-latauslinkki kaikilla viidellä kielellä. Edellä mainitut koko testisarjojen ajot koskevat mekanismi-integraatiota ennen tätä pientä linkkikortin lisäystä.

Työ tehtiin alkuperäiseen työtilaan. Julkaisukopio muodostettiin tehtävän alun varmuuskopioon vertaamalla, jotta muu keskeneräinen työ säilyy. Työn aikana julkaistu `613edbf` yhdistettiin lopulliseen kopioon: sen proxy masking -aineistot ja tämän integraation varanto-osio ovat mukana samassa versiossa. Alkuperäisen työtilan HEADia tai indeksiä ei muutettu julkaisua varten.

[Säilymisauditointi](STEROIDOGENESIS_PRESERVATION_2026-09-08.md), [lähteiden auditointi](../analysis/BERM_kalsium_redox_steelman_2026-09-08/TOTEUTUS_AUDIT.md) ja [mallin rakennekuvaus](../../berm/docs/steroidogenesis-reserve-v1.md) säilyttävät yksityiskohtaiset rajaukset. Nykyvaiheen jatkotyö perustuu olemassa oleviin kokeisiin ja dataan.
