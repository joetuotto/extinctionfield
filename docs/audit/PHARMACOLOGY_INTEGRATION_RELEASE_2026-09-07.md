# Farmakologisten koeprofiilien integraatio 7.9.2026

Toteutus lähtee tuotantoon yhdistetystä versiosta `6d79066887b178d40e43af5ba8868fed69594a85`. Työ tehtiin erillisessä integraatiotyökopiossa. [Alkuperäinen suunnitelma](../analysis/PHARMACOLOGY_INTEGRATION_PLAN_2026-09-07.md) säilyy; tämä raportti kuvaa toteutettua versiota.

## Mallin premisseistä tuloksiin

Päättelyketju on Lindgrenin vuoden 2025 metriikkapremissi → täsmällinen metriikkaperturbaatio → eksplisiittinen minimaalinen materia–metriikkakytkentä ja viivästetty tensorivaste → nimetty etumerkillinen biologinen portti → protokollasta ja tilahistoriasta riippuva dynamiikka → havaintomalli. Uusi laskenta kutsuu olemassa olevia metriikka- ja vasteoperaattoreita. Matemaattinen johto ei korvaa puuttuvaa fysikaalista identifiointia: gauge, mittakaava, kudosydin, etumerkki, viive ja ihmisen päätepistekalibrointi ovat avoimia.

[Ehdollinen johto](../../berm/docs/pharmacology-conditional-derivation.md) sisältää jokaisen kahdeksan profiilin oletukset ja ennusteet. [Protokollakuvaus](../../berm/docs/intervention-protocol-v1.md) kuvaa laskennan. Farmakologinen komponenttinäyttö rajaa biologisia osia; sitä ei käytetä todistamaan edeltävää fysiikkaa. FieldState pysyy valinnaisena mittaushaarana. Siirtymiä kudokseen, lisääntymiseen, pariin, käyttäytymiseen tai väestöön ei kalibroida solukokeilla.

## Toteutetut osat

- Kahdeksan yhteistä koeprofiilia, 12 tutkimusta ja 12 synteettistä laskentaesimerkkiä. Neljä vertailuhaaraa, 23 havaintosuuretta, ajoitetut interventiot, esikäsittely ja pesu. Julkaistun tutkimuksen puuttuvaa kontrastia ei täytetä synteettisellä laskelmalla.
- MT2:n evokoitu varastopalaute ja Na-virta; L-kanavan paikallinen Ca/ERK sekä nopeat ja hitaat puskurit; riippumattomat L/T/N-kanavat; AA/LTE4-inhibitio; hidas kanavamäärä ja SERCA-esikäsittely; CRY-määrä ja FAD/KL001-sitoutuminen; koettimen fotohajoaminen; CoQ10:n vaihtoehtoiset vaikutuspaikat.
- CRY/FAD-kerroin lasketaan kerran. Uusien profiilien vauriotuotto kulkee mitokondrion kuormituksen kautta ilman rinnakkaista suoraa kenttä–vaurio-termiä. Kalsiumin määrät, osastotilavuudet ja aineen säilyminen tarkistetaan.
- Farmakologia- ja biologisen koordinaation sivujen tutkimusnäkymä; yhteiset profiililinkit moduloomin korteissa ja lääkevertailussa. Kahden kielen uudet profiilikuvaukset; muissa kolmessa kielessä eksplisiittinen englanninkielinen näkymä. Muutettujen vanhojen sivutekstien korjaukset tehtiin kaikilla viidellä kielellä.
- Atlas: 251 solmua ja 611 yhteyttä, kuusi aliatlasta sekä niiden yli toimiva koerajaus. Lisäys on 9 solmua ja 20 yhteyttä. Yhteyksissä näytetään koejärjestelmä, vaikutussuunta ja ehdollisuus.
- Väitteet: 9 komponenttiväitettä ja 8 ehdollista ennustetta. Kaikki uudet ennusteet riippuvat nimetystä L2-operaattorista ja komponenttinäytöstä. Lähde- ja aineistoriippuvuudet säilyvät.
- Selway/GLP-1:n kanavan ohitusta koskeva virhe, Bektasin GSM-moduloidun 3,5 GHz:n aaltomuoto, MT2-vasteen suunta, KL001:n määrän ja kellovasteen ero sekä perusteettomat korjausaikavakiot korjattiin. Vanhojen lähteiden tunnisteet säilytettiin.

## Varmennus

- Pythonin koko testisarja: **2 122 testiä läpi**, myös hitaat testit. Laskennan rajat, yksiköt, kausaalinen ajoitus, valotapahtumien ositus, puskurikinetiikka, kanavapoistot, CoQ10:n vaikutuspaikat ja peilikopioiden yhdenmukaisuus tarkistettu.
- Sivuston lopullinen testisarja: **362 testiä / 31 tiedostoa läpi**. Selainkoe löysi osoitteen ja näkyvän profiilin eriytymisen Nextin sisäistä historiatilaa käytettäessä. Korjaus on mukana; regressiotesti jäljittelee reitittimen historiatilan käsittelyä.
- Lopullinen tuotantokäännös, tyyppitarkistus ja tiukka lint läpi. Viite-, väite- ja ankkuritarkistukset läpi. **522 esirenderöityä reittiä** tarkistettu: ei raakaviitetunnisteita, tyhjiä elementtejä tai tyhjiä linkkejä.
- Selaimessa kaikki 8 profiilia ja 12 laskentaesimerkkiä, päätepisteen vaihto, neljän haaran lukuarvot ja aikasarja, haku ja tyhjä hakutulos, takaisin-navigointi, avattava premissijohto, profiilin atlaslinkki, solmun väitteet ja lähteet, koerajauksen poisto sekä aliatlasvalinta toimivat. 383 px:n mobiilinäkymässä sivu ja atlas eivät ylitä näkymän leveyttä.
- Erillinen päättelyketjun katselmointi: kaikki 17 uutta väitettä, kahdeksan profiilia ja 12 laskentaesimerkkiä noudattavat premissien, tuodun biologian ja ehdollisten ennusteiden erottelua. Esimerkkejä ei ilmoiteta empiirisesti sovitetuiksi tai aineiston ulkopuolella validoiduiksi.

Julkaisuportin 14 aiempaa DKC-varoitusta säilyvät: DKC on edelleen kalibroimaton kandidaatti. Tämä integraatio ei muuta sen näyttötilaa.

## Säilyminen ja julkaisu

[Koneellinen säilytystarkistus](PHARMACOLOGY_PRESERVATION_2026-09-07.json): kaikki aiemman version 931 tiedostopolkua, 73 väitettä, 158 evidenssisuhdetta, 73 arviota, neljä reittiä ja 1 164 lähdetunnistetta säilyvät. Aiemmat väite-, suhde-, arvio- ja reittitietueet ovat sisällöltään ennallaan. v16:n suoritettava rakenne säilyy ja v17:n lukitut vertailut läpäisevät koko testisarjan. Kolmen sivustodata-aineiston julkiset latauskopiot vastaavat lähteitä.

Alkuperäisen työpuun HEAD, indeksi ja stash säilyvät. Siinä on aiemman yhdistämisen varmuuskopion jälkeen muun rinnakkaisen työn tekemiä muutoksia 15 tiedostoon; ne kirjataan säilytystarkistukseen eikä niitä korvata tämän integraation tiedostoilla. Aiempi snapshot ja täydellinen Git-varmuuskopio säilyvät.

Julkaisutapa on olemassa olevan GitHub-main-haaran Vercel-julkaisu projektiin `extinctionfield`. Julkaisuvarmennus tarkistaa oikean commitin Vercel-tilan, tuotantoreitit, ladattavien aineistojen tarkistussummat ja uuden käyttöliittymän toiminnan. Julkaisun jälkeinen toteutunut tunniste ja tulokset tallennetaan integraatiotyökopion ulkopuoliseen paikalliseen julkaisuvarmennukseen, jotta varmennus ei käynnistä uutta koodijulkaisua.
