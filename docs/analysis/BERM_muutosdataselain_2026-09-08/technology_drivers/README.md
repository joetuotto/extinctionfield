# Määrällinen teknologiahistoria, 8.9.2026

Vuoden 2025 BERM-lähtökohta on tensorimuodossa

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\quad A_\mu\mapsto A_\mu+b_\mu,
\quad \Delta g_{\mu\nu}=\kappa(A_\mu b_\nu+b_\mu A_\nu+b_\mu b_\nu).
\]

Jos vanha tila sisältää useita lähteitä, \(A=A_{\rm bio}+\sum_j a_j\), lisälähteen marginaali riippuu jokaisesta vanhasta komponentista. Rekisterin sähkömyynti, vastaanotin- tai mittariosuus ei kuitenkaan identifioi \(a_{j\mu}\): sen yksikkö, paikallinen suunta, vaihe, käyttöaika, etäisyys ja spektri on tuotava erikseen. Esimerkiksi kulutuksen kaksinkertaistuminen ei tästä yhtälöstä johda potentiaalin, ristiosan tai biologisen vasteen kaksinkertaistumiseen.

Ehdollinen BERM-vaste tarvitsee edelleen materiakytkennän ja tilariippuvan retardoivan operaattorin, esimerkiksi \(\delta\langle O_i(t)\rangle=\int K_i^{\mu\nu}(t,t';S)\Delta g_{\mu\nu}(t')\,dt'\). Gauge-preskriptio, fysikaalinen mittakaava, kudosydin, etumerkki, viive ja ASFR/TFR-kalibraatio pysyvät erillisinä avoimina osina. Tässä työssä ei tuoda empiiristä biologista vaikutuskerrointa eikä soviteta syntyvyyttä. Lindgren-geometria, tuotu historiallinen havainto ja BERM:n ehdollinen ajallinen syöte erotetaan. FieldState voi vastaanottaa tai arvioida fyysisen mittaustietueen BERM:n syöterajalla; se ei tuota biologista vastetta.

## Toteutettu aineisto

`website/data/technology-drivers.json` sisältää **32 sarjaa, 799 havaintopistettä ja 17 lähdetietuetta**. Näistä 30 sarjaa ja 796 pistettä kuuluvat viiteen atlasmaahan. Ranskan Linky ja maailman ilmastointilaitteet säilytetään alkuperäisine alueineen, ja viiden maan näkymä rajaa ne pois. Teknologiaperhe on historiallinen hakuluokka; varsinkaan vastaanotin- tai ilmastointilaiteomistus ei yksin määritä perheen sähkömagneettista mekanismia.

| Aineisto | Todelliset havaintovuodet | Käytetty suure ja merkittävä rajaus |
|---|---|---|
| [World Bank / IEA EG.USE.ELEC.KH.PC](https://data.worldbank.org/indicator/EG.USE.ELEC.KH.PC) | Kaikille FIN/USA/GBR/DEU/JPN 1990–2024, 35 pistettä/maa | kWh/asukas/vuosi, kansallisen sähköjärjestelmän aktiviteetti. Nykyinen julkaisu ei sisällä 1960-lukua. |
| [Tilastokeskus, StatFin 12sv](https://pxdata.stat.fi/PxWeb/pxweb/en/StatFin/ehk/12sv.px/) | FIN 1960–2024, 65 pistettä | Sähkön kokonaiskulutus GWh. 1960: 8 789; 2024: 83 053. Sisältää verkon häviöt ja pien-CHP-korjauksen. |
| [EIA MER 7.6](https://www.eia.gov/totalenergy/data/monthly/#electricity) | USA 1949–2024, 76 pistettä | Asuinsektorille myyty sähkö GWh. Ei omaa tuotantoa, väestön sähköliittymäosuutta tai paikallista kenttää. Palveluluokan mukaista myyntiä, vuodesta 1996 myös muut energiapalveluntarjoajat. |
| [DESNZ historialliset sähkötilastot](https://www.gov.uk/government/statistical-data-sets/historical-electricity-data) | GBR 1920–1950 ja 1951–2024; kotitalouskulutus 1960 ja 1965–2024 | Suurten sähköntuottajien bruttotuotanto GWh. Ennen 1951 vain Iso-Britannia; aluekatkos erotettu sarjoiksi. Kotitaloussektorin GWh erillään tuotannosta. Huomautettu1986-rivi tuotu; kahdesta1987-rivistä käytössä huomautukseton93,25TWh-rivi. |
| [Census HS-42](https://www2.census.gov/library/publications/2004/compendia/statab/123ed/hist/hs-42.pdf) | USA radio 1930, 1940, 1947–2001; TV ja asemat 1950–2001 | Radio-/TV-omistusprosentti sekä erillinen VHF+UHF kaupallisten TV-asemien summa. TV ei sisällä Alaskaa/Havaijia. TV:n 1970–1979 vuosiluvut viittaavat edellisen vuoden syyskuuhun, muut tammikuuhun. |
| [ESRI historiallinen XLS](https://www.esri.cao.go.jp/jp/stat/shouhi/0403fukyuritsu.xls) | JPN 1957–2004, teknologian ja otosrajauksen mukaan | Mustavalkotelevisio, väritelevisio ja huoneilmastointi erikseen. Taulukon pieni kirjasin on olennainen metatieto: ei-maatalouskotitaloudet, vuoteen 1963 asti vain kaupungit. Näistä ei tehdä yhtä kansallista sarjaa. |
| [Destatis WISTA 7/1974](https://www.destatis.de/GPStatistik/servlets/MCRFileNodeServlet/DEAusgabe_derivate_00000708/Wirtschaft_und_Statistik-1974-07.pdf) | DEU historiallinen Länsi-Saksa 1962, 1969, 1973 | Radio 79/83/86 % ja TV 34/73/87 %. Painettu s.480, PDF-sivu26, taulukko4. Ulkomaalais- ja laitoskotitaloudet sekä myöhemmissä otoksissa ylimmät tuloluokat rajattu pois. |
| [EIA mittarit, taulukko10.05](https://www.eia.gov/electricity/annual/html/epa_10_05.html) | USA 2015–2024, AMI ja AMR erillään | Mittarikannat ja saman vuoden kaikkien sähkömittarien nimittäjä. AMR vähenee samalla kun AMI kasvaa. |
| [DESNZ mittarit, maaliskuu2024](https://www.gov.uk/government/statistics/smart-meters-in-great-britain-quarterly-update-march-2024) | GBR Q4/2012–Q4/2023 | Suurten toimittajien kotitalouksien älytilassa toimivat sähkömittarit ja saman rajauksen koko sähkömittarikanta. Ei kaasumittareita. Toimittajaryhmä muuttuu lähteen huomautusten mukaisesti. |
| Aiemmin tarkistetut rekonstruktion numeroankkurit | USA1940/1956, GBR2014/2022, JPN2021, FIN2017 | Asuttujen asuntojen sähkövalaistus, maatilojen sähköistys, kumulatiiviset mittariasennukset, EE:n väestöpeitto, TEPCOn mittarikanta ja Suomen tuntiluentapeitto erillisinä suureina. |

Alkuperäiset lähdekannat ovat havaintoja lähteensä määritelmän mukaan; osa on lähteen itsensä tilastollisia arvioita. `status: estimate` ja `imputed: false` ovat tällöin yhteensopivat: tämä sisäänluku ei ole keksinyt tai täydentänyt havaintopistettä. `lower/upper` on varattu lähteen ilmoittamille rajoille; skenaariovälejä ei esitetä tilastollisina luottamusväleinä.

## Erottelut, jotka säilyvät käyttöliittymälle asti

- Japanin mustavalko- ja väritelevisioiden prosentteja ei summata: sama koti voi omistaa molemmat. Ilmastointilaitteen olemassaolo ei kerro invertteritekniikasta; AC-sarjoille ei anneta oletusarvoista `driver`-muunnosta.
- TEPCOn 28,4 miljoonaa on maaliskuun2021 kertymä. Vuosien2014–2021 käyttöönottojakson alkua ei muuteta vuoden2014 määräarvoksi.
- Britannian 452860 kumulatiivista asennusta2014 ja 400645 älytilassa toimivaa mittaria vuoden2014 lopussa eivät ole ristiriitaiset saman muuttujan arviot. Niillä on eri määritelmä ja lähdeversio.
- USA:n asuntojen78,7 % vuonna1940 ja maatilojen94,2 % vuonna1956 eivät ole saman perusjoukon peräkkäisiä pisteitä. Kumpikaan ei saa itsenäistä käyttöönoton vuosikäyrää.
- UK:n MPP-sarjan tuuliyhtiöt siirtyvät luokkaan vuodesta2007 ja aurinkoyhtiöt vuodesta2015. Tämä luokituksen muutos näkyy rajoituksissa; määrä ei ole kaikkien tuottajien yhtenäinen tuotantosarja.
- EIA:n kaikki sektorit kattava nettotuotanto1949–2024 tutkittiin, mutta jätettiin sisäänluvusta pois sen vuoden1989 kattavuusmuutoksen vuoksi. Raaka-CSV jää tarkastusjälkeen. Pitkäksi kuormitussarjaksi valittiin asuinsektorin sähkömyynti.

## Normalisointi ja puuttuvat vuodet

`driver.normalization` kertoo vain eksplisiittisen numeerisen operaation: `percent` jakaa prosenttiluvun sadalla, `ratio` käyttää kunkin havaintovuoden omaa dokumentoitua nimittäjää ja `reference` jakaa nimetyllä positiivisella vertailuarvolla. WB:n kaikilla mailla on sama10000kWh/asukas/vuosi-vertailu. GWh-sarjoissa vertailu on100000GWh/vuosi ja TV-asemissa1000asemaa. Nämä eivät ole biologisia kynnyksiä tai maakohtaisia maksimiskaalauksia. Pienempi `priority` ehdottaa perheen ajallisesti käyttökelpoista syötettä, ei vahvempaa kausaalinäyttöä.

Kansallisen kokonaiskulutuksen ja asukaskohtaisen kulutuksen normalisoidut tasot eivät ole keskenään sama suure. Myöskään Suomen kokonaiskulutus ja Britannian kotitaloussektori eivät sellaisenaan sovi maiden absoluuttisen kenttäamplitudin vertailuun. Ajallinen rekonstruointi ja lähdeperheiden fysikaalinen amplitudi-/suuntakalibraatio ovat eri vaiheet. WB:n sama asukaskohtainen indikaattori on tarjolla varsinaista mittarivertailua varten vuodesta1990.

`getTechnologyDriverValue` palauttaa oletusarvoisesti vain tarkan havaintovuoden. Valinnainen lineaarinen rekonstruktio on merkitty `interpolated` ja palauttaa kummankin tukivuoden. Se ei ekstrapoloi, muuta rekisterin pisteitä, carry-forward-täytä loppua tai tee yhdestä pisteestä kasvuramppia. Eri aluerajaukset eivät interpoloi toistensa yli, koska ne ovat erillisiä sarjoja. Muut lähteen otos-/luokitusmuutokset näkyvät rajoitustekstissä; lineaarinen segmentti ei poista niiden epävarmuutta.

`getTechnologyDriverCoverage` luokittelee 13 historiallista perhettä valitussa maassa ja aikavälissä. `series` tarkoittaa vähintään kolmea havaintovuotta ja vähintään yhtä peräkkäistä vuosiparia saman sarjan sisällä; tämä ei väitä sarjaa aukottomaksi. Muut numerot ovat `anchors`, vain dokumentoitu vaihehistoria `history` ja puuttuva aineisto `open`. Havaintojen ja pisteankkureiden puuttuminen ei tarkoita teknologian tai kentän nollatasoa.

## Toistaminen ja tarkistus

`berm/scripts/build_technology_drivers.py` on verkkoyhteydetön stdlib-tuottaja. Se lukee jäädytetyt WB-vastaukset, `primary_extract.json`:n, valmiin mittarirekisterin ja tarkistetut kenttärekonstruktion numeroankkurit. `--check` vertaa tuottamaansa sisältöä julkaistavaanJSONiin kirjoittamatta tiedostoa.

`extract_primary_tables.py` tuottaa primääritauluista välitiedoston uudelleen. Se käyttää read-only `openpyxl`- ja `xlrd`-lukua, alkuperäisiä soluosoitteita sekä Japanin XLS:n kirjasinmetatietoa. Tarvittavat kirjastot ovat `openpyxl` ja `xlrd`. Census-teksti luettiin pypdfin layout-poiminnalla ja Saksan PDF `pdftotext -layout`-poiminnalla; Saksan kuusi lukua tarkistettiin taulukosta ja on kirjattu lähderiveittäin. `acquisition.json` sisältää tarkat latausosoitteet, menetelmän, päiväyksen ja SHA256-tunnisteet. StatFin-POSTin runko on omassa JSONissaan.

Jokaisen lähteen `artifacts` kertoo tarkistetun raakajulkaisun tai poiminnan. Aiemmista viidestä yksittäisankkurista säilytettiin jo tarkistettu kanoninen lähdelinkitetty poiminta: näiden artifact on kenttärekonstruktionJSON, eikä sitä väitetä julkaisijan raakakopioksi. Muiden lähteiden varsinaiset julkaisut/API-vastaukset ovat arkistoituja. Validointitesti tarkistaa tiedostojen todellisen koon ja SHA256:n sekä verkkoyhteydettömän uusintatuotannon.

Yksikkötestit tarkistavat muun muassa viiden maan ennen1970 kattavuuden, alenevat AMR-/mustavalko-TV-sarjat, Suomen1960–2024 arvoluvut, historiallisen väestörajauksen, TEPCOn oikean havaintovuoden, saman vuoden mittarinimittäjät, ei-ekstrapoloivan poiminnan, puuttuvien vuosien käsittelyn ja virheellisten normalisointien hylkäyksen.

Lopputarkistus 8.9.2026: verkkoyhteydetön `--check` läpäisty, 11 rekisteritestiä ja 19 atlasadapterin testiä läpäisty, oman kirjaston ja testien ESLint läpäisty sekä molempien Python-tuottajien syntaksi tarkistettu. Valmis JSON on 292747 tavua. Ennen vuotta 1970 on 184 havaintoa. Maakohtaisesti FIN sisältää 3 sarjaa / 101 havaintoa, USA 9 / 294, GBR 7 / 215, DEU 3 / 41 ja JPN 8 / 145. Lähdetarkistussummat vastaavat todellisia tiedostoja.

## Seuraavat aineistoaukot

Tämä täydennys korjaa pelkän matkapuhelinliittymäkäyrän varaan jäämisen, mutta ei tee 13 perheestä määrällisesti kattavaa kenttähistoriaa. Saksalta puuttuu yhä varhaisen sähköistyksen kansallinen kuormitussarja; Japanilta ennen1990 kansallinen sähkökuorma; Suomelta ennen1960 sähkön kulutus sekä varhaiset radio-/TV-luvut. Valaistuksen asennettu teknologiajakauma, hakkurien/invertterien osuus, Wi-Fi-laitteiden käyttö, radionavigointiverkkojen lähetysteho ja mobiilisukupolvien todellinen käyttö eivät sisälly näihin uusiin numerosarjoihin. Historialliset tapahtumat säilyvät rinnalla, ja puuttuva numerotieto jää näkyviin.
