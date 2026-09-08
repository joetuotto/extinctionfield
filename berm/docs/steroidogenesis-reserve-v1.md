# Kalsiumin, redox-varannon ja steroidogeneesin integraatio

Tämä rakenne kuuluu BERM:iin. Se yhdistää paikallisen hormonituotannon nykyisiin kalsiumosastoihin, soluhistoriaan, vuorokausisäätelyyn ja lisääntymisreittiin. Toteutettu vaihe on mitattavien tilojen ja protokollakohtaisten vaikutussuuntien kokoaminen. Se ei lisää sovitettuja glutationikinetiikan vakioita eikä muuta historiallisten väestövertailujen lukuja.

## Asema mallin johdossa

Lindgrenin geometrinen lähtökohta ja BERM:n ilmoitettu mittakaava antavat

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad
\Delta g_{\mu\nu}=\kappa(\bar A_\mu a_\nu+a_\mu\bar A_\nu+a_\mu a_\nu).
\]

Minimaalinen materia–metriikkakytkentä ja viivästetyn vasteen oletus antavat BERM:n ehdollisen L2-operaattorin muodon. Gauge, fysikaalinen mittakaava, kudosydin, etumerkki, viive ja ihmisen päätepistekalibrointi pysyvät erikseen ilmoitettuina avoimina suureina. Geometrinen koordinaatti χ_geo ei ole kudosherkkyys eikä määrää CaMKI:n, VGCC:n tai kryptokromin valintaa.

Tämän integraation neljä tasoa ovat siten: **Lindgrenistä johdettu geometria**, **kokeellisesti tuotu komponenttibiologia**, **BERM:n ehdollinen mekanismisynteesi** ja **avoin kvantitatiivinen siirto**. FieldState voi antaa fysikaalisen mittaustietueen mallin syöterajalle. Steroidogeneesiä tai TFR:ää ei johdeta FieldStatesta.

## Yhteinen biologinen rakenne

Kalsiumin paikallinen pitoisuus, osasto ja ajallinen rakenne liittyvät kahteen erotettavaan haaraan:

1. CaMKI → NUR77-yhteistyö → StAR:n säätely → mitokondrion kolesterolikuljetus.
2. CaMKI/RORα-yhteys ja RORα → BMAL1 → paikallisen steroidogeenisen koneiston säätely.

Niiden rinnalla redox-varanto, mitokondrion toimintatila ja autofaginen kolesterolihuolto ehdollistavat samaa tuotantokoneistoa. CaMKI ja CaMKII ovat eri kinaaseja. CaMKII:n pulssitaajuuden dekoodausta ei nimetä suoraan Leydig-solun CaMKI:n mitatuksi siirtofunktioksi. Yksittäinen kellogeenin ilmentymismittaus ei määritä kellon vaihetta tai amplitudia.

Tuotanto yhdistyy nykyiseen ketjuun: hormonin paikallinen tuotanto → saatavuus ja kuljetus → reseptori ja signaalinkäyttö → kudoksen toiminta → lisääntymiskapasiteetti ja biologisesti ehdollistunut käyttäytyminen → yritysten ajoitus ja toteutuminen → ikäkohtainen syntyvyys ja TFR. Sama tuotantopullonkaula kirjataan kerran. Keskinen HPG-ohjaus ja paikallinen Leydig-kapasiteetti voivat rajoittaa järjestelmää samanaikaisesti.

## Toteutetut suureet

`GlutathionePool` on valinnainen `CellStateVector`-mittaustietue. Se säilyttää GSH:n ja GSSG:n absoluuttisen mittauksen, yksiköt, osaston, mittausperustan ja lähteet. Molaarisella yhteismitallisella perustalla

\[
G_T=[\mathrm{GSH}]+2[\mathrm{GSSG}].
\]

Kahden GSH:n hapettuminen yhdeksi GSSG:ksi säilyttää tämän ekvivalenttipoolin. Pienentynyt suhde ei yksin tarkoita pienentynyttä poolia, eikä suuri suhde todista suurta varantoa. G_T kuvaa tässä vapaan GSH/GSSG-poolin ekvivalentteja: proteiineihin konjugoitunut glutationi, vienti ja synteesi ovat eri kirjanpidollisia tapahtumia. Pelkkä suhteellinen metabolomiikkasignaali ei riitä absoluuttisen poolin laskemiseen.

`SteroidogenicContext` säilyttää solujärjestelmän, stimulaation, protokollan, lisäoksidanttihaasteen sekä ilmoitetun agonistiannoksen ja yksiköt. `SteroidogenesisObservation` säilyttää nimetyn hormonin, elävään solumäärään suhteutetun tuotannon, osaston ja lähteet. Puuttuva mittaus jää puuttuvaksi.

Vertailufunktio vaatii saman hormonaalisen ja haastekontekstin sekä samat hormonin yksiköt ja osaston. Käyttäjän ilmoittama mittausmarginaali on vertailun ehto, ei sovitettu biologinen kynnys tai merkitsevyystesti. Funktio ei johda kalsiumista, GSH:sta tai kenttäprotokollasta hormonituotantoa. Se ei muunna mitattua tuotantosuhdetta hedelmällisyys- tai TFR-kertoimeksi.

## Kolme näyttölajia ja tutkimusperheet

Kanoninen tutkimusluettelo on `berm/data/evidence/steroidogenesis_v1.json`. Sivuston kaksi peiliä syntyvät `export_steroidogenesis.py`-viennillä samasta luettelosta ja toteutetusta mallirakenteesta.

- **Kenttäkoe:** ilmoitettu EMF-protokolla ja siinä mitattu vaste. Qinin työt sisältävät testosteronin päätepisteen; Miao mittaa redox/metabolomiikkamuutoksia ilman testosteronimittausta. Houston ja De Iuliis tukevat erillistä siittiöhaaraa. Kanavatutkimusten käyttö säilyttää niiden oman kudoksen, taajuuden ja vasteen.
- **Komponenttikoe:** geeni, kanava, kemiallinen muokkaus tai ohitus paikantaa biologisen vaiheen. STAR-, RYR2- ja ATP2A2-sairaudet eivät ole kenttäaltistuskokeita. Ihmisen kudoskokeet, eläinkokeet ja solulinjat pysyvät tunnistettavina.
- **BERM-synteesi:** eri kokeiden yhdistäminen yhteisen mitatun biologisen tilan kautta. Sen lähteet ja riippuvuudet ilmoitetaan; sitä ei lasketa uudeksi riippumattomaksi kokeeksi.

Chenin ja Midzakin tutkimuksissa on päällekkäisiä tekijöitä ja Johns Hopkinsin tutkimusyhteys. Halesin työn affiliaatio on erillinen; yhteinen mekanismikirjallisuus ei tee siitä samaa laboratoriota tai samaa aineistoa. Qinin vuosien 2018 ja 2019 työt jakavat tutkimusyhteyden mutta säilyttävät eri protokollat. Gao, Esmaeilian ja Lv tuovat muita aineistoperheitä. Julkaisumäärä, aineistojen erillisyys, tutkimusperhe ja replikaatio ovat eri laskentatasoja.

## Varanto ja proxy masking -taso 1

Chenin MA-10-kokeessa LH-stimuloitu progesteronituotanto säilyi ilman lisäoksidanttia yli 80 prosentin GSH-vähennyksestä huolimatta. Lisähaaste paljasti heikentyneen vastustuskyvyn. Tämä ei ole väite spontaanin basaalituotannon säilymisestä. Midzakin kokeessa basaalinen ja LH-stimuloitu testosteroni saattoivat muuttua vastakkaisiin suuntiin.

BERM:n päättelyketju on: mitattu varanto → protokollasta riippuva kuormituskestävyys → valittu päätepiste ja mittaushetki → tilastollinen näkyvyys ja attribuutio. Jos varantoa ei mitata mutta myöhempi haaste kirjataan, vaikutus voidaan kohdistaa kokonaan viimeiseen haasteeseen. Tämä on ensimmäisen peittymistason nimetty mekanismiehdokas.

Tuotanto voi todella säilyä varannon vähentyessä. Mittarin epäherkkyys on erillinen havainto-ongelma. Muuttumaton hormonitulos ei yksin todista kumpaakaan. Houstonin kokeessa hetkellisen ROS:n palautuminen lähemmäs kontrollia altistuksen jatkuessa ei poistanut DNA-vauriota; myös IVF- ja varhaiskehitystulokset säilytetään erillisinä päätepisteinä.

## Jatkotyö olemassa olevilla aineistoilla

Ensimmäinen vaihe kokoaa rakenteen, toinen protokollakohtaiset suunnat ja kolmas vasta yhteismitalliset arvot. Nykyvaihe ei vaadi uusia laboratoriokokeita eikä kenttäkokeita. Julkaistujen interventioiden, ohitusten, annosten, mittaushetkien ja koejärjestelmien yhteensovitus on itsessään hyödyllistä tutkimustyötä.

STAR-poiston julkinen GSE165392-aineisto ja erillinen ihmisen kivesatlas ovat mahdollisia aineistoankkureita omine metatietoineen. Geeniekspressiota ei muunneta suoraan entsyymivirraksi, kudoksen hormonituotannoksi tai väestövaikutukseksi. Raakadatan saatavuus, näytteiden vastaavuus ja julkaisun korjaukset kirjataan ennen määrällistä yhdistämistä.

Tutkimusten täsmälliset protokollat ja DOI-viitteet löytyvät yhteisestä luettelosta ja [tutkimuskoosteesta](../../docs/analysis/BERM_kalsium_redox_steelman_2026-09-08/README.md). Mallin testit tarkistavat yksiköt, massakirjanpidon, stimulaatiokontekstin erottelun, puuttuvan mittauksen säilymisen sekä sivustopeilien ja kanonisen kausaaliverkon vastaavuuden.
