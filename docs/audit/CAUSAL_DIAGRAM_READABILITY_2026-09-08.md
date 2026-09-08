# Kausaalikaavion integraatio ja luettavuus — 8.9.2026

## Lähtötilan vastaus

Mallin pääsivun `BermCausalDiagram` käytti Python-mallista vietyä kanonista kausaalirekisteriä. Aiempi integraatio oli siinä osittainen: kalsium/redox → steroidogeneesi -yhteys oli olemassa, mutta glutationivarannon ja muun steroidogeenisen ylläpidon tarkempi esitys oli erillisessä kausaaliatlaksessa ja tutkimussivulla. Kuvaruudun kaaviossa lyhyet SVG-kortit katkaisivat nimet, lukuisat viivat kulkivat tekstin läpi ja kalibrointitiloja esitettiin teknisinä englanninkielisinä tunnuksina.

## Toteutusratkaisu ja perustelu

Kaavio säilyttää kaikki 47 kanonista solmua, 97 suunnattua yhteyttä ja 15 ryhmää. Näkymä vaihtuu käytettävissä olevan leveyden mukaan yhteen, kahteen tai useampaan palstaan. Tasojen otsikot ovat korttien yläpuolella. Korttien korkeus määräytyy koko nimen mukaan, ja peittävät taustat sekä reunojen kautta kulkevat viivat poistavat tekstin ja yhteysviivojen päällekkäisyyden.

Tieto esitetään kolmella toisiaan täydentävällä tavalla:

1. **Kokonaiskaavio:** kaikki solmut ja yhteydet pysyvät mukana. Korteissa ovat koko nimi, tiedollinen luokka, tulo- ja lähtöyhteyksien määrät sekä kalibroinnin tila.
2. **Korostus ja yhteysluettelo:** yksittäinen solmu tai kalsium–redox–hormonituotannon reitti voidaan korostaa. Muut solmut säilyvät. Kaikki 97 yhteyttä ovat myös tekstimuotoisessa luettelossa, jossa suunta ja yhteyden tyyppi ovat yksiselitteisiä.
3. **Solmun tietopaneeli:** mekanismi, tutkimusankkurit, koetyyppi, havaittu tulos, soveltamisala, naapuriyhteydet ja tarkemmat sivut avautuvat solmusta. Myös olemassaolevat muodolliset suhteet ja malliin tallennetut tarkistusehdot säilyvät.

Yhteen kuvaan mahduttaminen olisi edellyttänyt tekstin pienentämistä tai tiedon poistamista. Valittu rakenne säilyttää koko rekisterin ja tarjoaa tarkemman lukutavan silloin, kun lukija seuraa tiettyä mekanismia. Korostus on lukemisen apu, ei uusi kausaaliluokitus tai todiste.

## Integraation sisältö

Viiden nykyisen solmun selityksiä ja tutkimusankkureita täydennettiin: kalsium/mitokondrio-ROS, vuorokausikoordinaatio, vastaanottimen tilamuisti, hormonin kohdekudosvaste sekä Leydigin solujen steroidogeneesi. Viimeksi mainittu sisältää kalsiumin, glutationivarannon, mitokondriokapasiteetin, CaMKI–NUR77–StAR- ja RORα–BMAL1–StAR-haarat sekä autofagian ja kolesterolihuollon.

Glutationivaranto, GSH/GSSG-suhde ja nykyinen hormonituotos säilyvät eri suureina. Tilamuisti yhdistyy proxy masking -tason 1 havaittavuusongelmaan: säilynyt hetkellinen hormonituotos ei yksin mittaa jäljellä olevaa varantoa. Täydentävä tutkimussivu sisältää edelleen koko tutkimuskatalogin ja tutkimusperheiden erottelun.

Lindgrenin geometrinen syöte esitetään ensin. Se erotetaan ehdollisesta BERM L2 -vasteoperaattorista, tuodusta empiirisestä biologiasta ja avoimesta kalibroinnista. Geometrisen solmun luokka korjattiin L1:ksi. Vanha M-selitys korjattiin vastaamaan rekisterin mekanistista välivaihetta. Kenttäkokeet ja komponenttikokeet merkitään tutkimuskohtaisesti; yhdistetty mekanismi säilyy BERM:n synteesinä. Uusia numeerisia parametreja, TFR-kertoimia tai kausaalireunoja ei lisätty.

## Tarkistuksessa korjatut sidonnat

- Valmiin korostusreitin siittiötuotannon väliaskel on mukana, joten steroidogeneesi → siittiötuotanto → parin hedelmöittyvyys → ASFR → TFR säilyy yhtenäisenä.
- Kausaalikaavion Atlas-linkit hyväksytään myös kanonisilla mallisolmujen tunnuksilla, ja ne avaavat oikean valitun Atlas-solmun.
- Jo julkaistun `claim.proxy.demographic-route-composition`-väitteen puuttunut Atlas-sidonta lisättiin olemassaolevaan `demo_tfr`-solmuun. Virheellinen nollanäyttötestin esimerkkisolmu vaihdettiin solmuun, jolla ei ole sidottua näyttöä.
- Pääsivun synteesiotsikosta poistettiin kiinteä lukumäärä ja perusteeton riippumattomuusmääre.
- Käyttöliittymä käyttää sivun todellista kielivalintaa. Solmujen olemassaolevat viiden kielen nimet säilyvät. Pitkät kuvaukset ovat suomeksi ja englanniksi; muissa kielissä englanninkielinen kuvaus ilmoitetaan erikseen.

## Säilyvyys ja julkaisutapa

Julkaisupohja on `fc80d61d6ef837da550195b6949117fb2ac97314`. Julkaisu kootaan rajatusta muutoksesta tämän julkaistun version päälle. Muutokset tehtiin myös alkuperäiseen työtilaan; sen muiden tehtävien keskeneräisiä tai pidemmälle edenneitä muutoksia ei korvattu eikä sisällytetty tähän julkaisuun.

Kanonisen rekisterin solmut, yhteydet ja ryhmät säilyvät. Rekisteritiedostossa muuttuvat ainoastaan neljän kielen L2-otsikot vastaamaan jo mallin vientikoodissa olevaa nimitystä. Tutkimuskatalogi, lähdekirjasto, väitteet, arkkitehtuurisopimus ja Atlas-laajennusten sisältö ovat julkaisupohjaan nähden muuttumattomia. Ankkurihakemistosta ei poistettu ankkureita; 221 → 222 vastaa puuttuneen TFR-sidonnan lisäystä. Säilyvyysvertailun tiivisteet ovat erillisessä JSON-raportissa.

## Varmennus

Lopullisen toteutuksen koko sivustotestistö läpäisi: **539 testiä / 47 tiedostoa**. Lisäksi **24 mallin arkkitehtuuri- ja tutkimussynkronointitestiä** läpäisi. Tuotantokäännöksen kaikki vaiheet läpäisivät: lähde- ja rekisteritarkistus, tyyppitarkistus, tiukka lint, optimoitu käännös, **557 esirenderöidyn reitin HTML-tarkistus** ja viiden kielen hakuindeksit. HTML-tarkistuksessa ei ollut raakoja viitetunnuksia, tyhjiä elementtejä tai tyhjiä linkkejä. Paikallisen levyn ja käännöshakemiston sijaintiongelmat ratkaistiin siirtämällä vain tämän tehtävän julkaisu- ja käännöshakemistot ulkoiselle levylle; viimeinen kokonainen käännös valmistui ilman virheitä.

Selaimessa tarkistettiin tuotantoversio 390, 760 ja 1280 pikselin leveyksillä: kaikki 47 korttia ja 97 yhteyttä ovat mukana, yksikään kortti ei leikkaa sisältöään eikä sivulle synny vaakasuuntaista ylivuotoa. Tietopaneeli, naapuriyhteydet, sulkeminen, Escape ja kohdistuksen palautuminen toimivat. Suomen- ja ranskankieliset käyttöliittymät, koko yhteysluettelo ja valintakorostus tarkistettiin. Julkaisun jälkeinen tarkistus tallennetaan erikseen.

Viimeisestä tuotantokäännöksestä tarkistettiin selaimessa vielä koko korostusketju (14 solmua, 22 olemassaolevaa reunaa) sekä linkki, joka avaa Atlaksen Leydigin solujen tietopaneeliin. Tutkimustiedot, kuusi Atlas-tuloyhteyttä ja kaksi lähtöyhteyttä näkyivät oikean valitun solmun yhteydessä. Atlas sisältää kanonisen kaavion viiden tuloyhteyden lisäksi aiemman varantosolmun, joten rekisterien tarkkuustasot säilyvät erillisinä.
