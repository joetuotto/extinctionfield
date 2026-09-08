# Testosteroni ja vuotuinen/kertynyt BERM-ennuste

**Nykyinen oletus:** [sarjakohtaisesti kalibroitu BERM-päätepiste](endpoint_calibration.md). Tämä muistio säilyttää aiemman käsin asetettavan toteutuksen ja sen tarkistusjäljen; sen havainnollistavat herkkyydet ovat käytettävissä valinnalla `ep_fit=manual`.

8.9.2026. Toteutettu Muutos-näkymään TFR:n ja valitun testosteronin tutkimusryhmän rinnakkainen havaintonäkymä sekä erikseen kytkettävä BERM-ennuste. Teknologiaprofiilit, vuosivalinta ja lähdehistoria käyttävät samaa kalenteria.

## Aineistot ja ankkurit

Yhdistetty atlas sisältää 83 sarjaa, 4 144 lähdepistettä ja 23 lähdettä. Kolme uutta testosteronisarjaa sisältävät yhdeksän alkuperäistaulukon arvoa. [Lähteet, poiminta ja rajaukset](testosterone_trends/README.md) säilyttävät Suomen FINRISK-ikäryhmät ja USA:n NHANES-jaksot erillisinä. Vanha laajasti vakioitu NHANES-pari säilyy valittavana neljäntenä sarjana. Suomen 60–69-vuotiaiden sarja on oletus Suomessa; USA:n oletus on 15–39-vuotiaiden viiden jakson sarja. Muiden maiden puuttuvaa hormonihistoriaa ei korvata ulkomaisilla havainnoilla.

FINRISK 60–69 -sarjan julkaistut mediaanit ovat 21,9 ja 13,8 nmol/l, otoskoot 130 ja 23. Vuodet 1977 ja 2002 on johdettu julkaistujen keräysvuosien sekä ikä- ja syntymäkohorttirajojen yksikäsitteisestä leikkauksesta. Muutos koskee tutkimusryhmiä, ei vakioitua koko väestön vuosikeskiarvoa. Pystyjanat ovat jakauman 5.–95. persentiilejä. USA:n uusissa arvoissa julkaistu SE säilyy keskivirheenä; siitä ei tuoteta luottamusväliä.

TFR-ennusteen ankkuri on täsmällisen vuoden (oletus 1950) seitsemän ASFR-ikäryhmän havainto. Ennusteen 15–49-vuotiaiden summa lasketaan kaavalla `5 × Σ ASFR / 1000`; WPP:n erillinen TFR-sarja säilyy havaintona.

Testosteronin mediaani voidaan ankkuroida yhden keräysvuoden arvoon. Suomen 60–69-ryhmän ankkuri on 1977. Suomen 25–29-ryhmän varhaiset keräysvuodet {1972,1977} ovat erottelematon mediaani, joten laskenta käyttää vuoden 2002 arvoa ja aiempi käyrä nimetään takaisinlaskennaksi. Monivuotisen aritmeettisen keskiarvon ennuste normalisoidaan koko ankkurijakson ennustekertoimien tasavuosipainotettuun keskiarvoon. Tasavuosipainot ovat eksplisiittinen oletus, eivät palautetut otospainot.

## Mallin neljä tasoa

1. **Lindgrenistä johdettu geometria:** vuoden 2025 `g = η + κ A⊗A`, tausta, lähteiden omat termit ja ristiosat. Käytössä on nykyisen BERM-kirjaston nimetty geometrinen kontraktio `G(t)` normalisoidussa asteikossa.
2. **Tuotu empiirinen biologia:** havaittujen TFR-/ASFR- ja testosteroniarvojen lähteet, perusjoukot, tunnusluvut, keräysjaksot ja menetelmät.
3. **BERM:n ehdollinen mekanismi:** alla määritelty viiveellinen vuotuinen vaste, säilyvä kertymä ja kaksi erillistä päätepistesulkua.
4. **Avoin kalibrointi:** gauge, fysikaalinen mittakaava, paikallinen kenttä, vastaanottimen kudosydin, merkit, viiveet, palautuminen ja ihmisen päätepisteherkkyydet. Näyttökerros ei identifioi näitä suureita. FieldState ei tuota ennustetta.

## Täsmällinen ajallinen laskenta

`U(t) = mean G(t−d)`, missä `d = lag … lag+memory`, molemmat päät mukana. Oletuksilla viive on 3 vuotta ja ydin sisältää kuusi vuosinäytettä (3–8 vuotta).

`C(t) = λ C(t−1) + U(t) × 1 vuosi`, missä `λ = 2^(−1/halfLife)`. Nollan puoliintumisajalla `λ=0`. Tämä on diskreetti vuosittainen säilymiskonventio. Se ei esitä jatkuvan differentiaaliyhtälön tarkkaa integraalia.

Kanavat ovat `annualWeight × U`, `historyWeight × C` ja niiden summa. `C`:n yksikkö on projektiovuosi ja `historyWeight`:n 1/vuosi. Kertymä kuvaa valittua lähdehistoriaa; se ei ole mitattu yksilön elinaikainen annos. Vuotuisen ja kertyneen kanavan yhteiskäyttö on erillinen sulkuoletus, eikä osoita biologisten reittien riippumattomuutta.

Integraatio alkaa aina vuodesta 1880 ja käyttää vuoden 1879 nimettyä alkutilaa. Oletusarvo 0 on oletettu, ei mitattu. Tuntematon alkutila on valittavissa. Aikarajaus vaikuttaa vain piirtämiseen. Puuttuva syöte säilyy tuntemattomana; sitä tarvitseva ennuste jää avoimeksi.

Päätepisteen suhteellinen kerroin on `exp(−β × (kanava−ankkuri))`. `βF` ja `βT` ovat erilliset, oletuksena 0,15. Niitä ei soviteta myöhempiin havaintoihin. Testosteronia ei muuteta TFR:ksi oletetulla hormonikertoimella. Oletusherkkyydet ja 20 vuoden puoliintumisaika ovat havainnollistavia asetuksia.

## Näyttö, linkit ja vienti

`show_t` ja `hormone` tallentavat hormonivalinnan. `forecast=1` kytkee ennusteen, `ep_mode` valitsee annual/accumulated/combined-kanavan ja `ep_compare=1` näyttää kaikki kolme. `ep_*` tallentaa päätepiste- ja kertymäasetukset; `s_*` tallentaa yhteiset lähde-, geometria- ja viiveasetukset. BERM-skenaarion aiempi lyhyen muistin laskelma säilyy omana näkymänään; käyttöliittymä kertoo tämän lähdeasetuksiin siirryttäessä.

Havaintopisteitä ei interpoloida vuosittaisiksi hormonimittauksiksi. Ennuste on erillinen katkoviiva, joka katkeaa tuntemattomassa vuodessa. Piirron sama pystyakseli kattaa myös ennusteet. TFR:n mahdollinen indeksiesitys muuntaa molemmat kerrokset saman alkuperäisen havaintoankkurin kautta; tutkimusjakson hormonisarja säilyttää natiiviyksikkönsä.

Havainto-CSV säilyttää tunnusluvun, välityypin, SE:n, todelliset keräysvuodet ja niiden kohdistusperusteen. Ennuste-CSV on erillinen ja sisältää kanavan, vuotuisen ja kertyneen tilan, parametrit, ankkurin, lähdeprofiilit ja kattavuuden. JSON/SVG sisältää koko laskentahistorian. SVG/PNG:n näkyvissä selitteissä säilyvät kanava, ankkurit, parametrit, alkuhistoria, lähdevalinnat, interpolointi ja lähdeosoitteet.

## Tarkistukset

Laskenta-, ankkuri-, nollatieto-, ajanjakso-, lähdeprovenienssi-, piirto- ja vientiregressiot käyttävät todellista lähderekisteriä. Selaimessa tarkistettu Suomen molemmat ikäryhmät, kolmen kanavan vaihto ja 390 pikselin näkymän leveys ilman vaakaylivuotoa. Koko sivuston 64 testitiedostoa / 796 testiä läpäisivät. Tuotantokoonti, TypeScript, tiukka ESLint, viiterekisterin ja arkkitehtuurisopimuksen tarkistukset sekä 557 reitin HTML-tarkistus läpäisivät. Testosteronirekisterin offline-toisto palautti samat 3 sarjaa / 9 arvoa / 2 lähdettä. PNG-vienti valmistui selaimessa; englanninkielisen USA-näkymän tutkimusjaksot, kanavat ja viisi käytettyä lähdeprofiilia tarkistettiin.
