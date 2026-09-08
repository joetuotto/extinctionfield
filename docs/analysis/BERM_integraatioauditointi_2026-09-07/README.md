# BERM: uusimman tiedon hyödyntäminen mallissa ja sivustolla

**Auditoinnin jälkeinen toteutus:** käyttäjän pyytämät laskenta-, rekisteri- ja sivustokorjaukset sekä testaus on kirjattu [integraatiojulkaisun raporttiin](../../audit/INTEGRATION_RELEASE_2026-09-07.md). Alla oleva teksti säilyttää auditointia edeltäneen tilanteen havainnot; se ei kuvaa julkaistun korjausversion nykytilaa.

Auditointi 7.9.2026. Tarkastuskohde on nykyinen työpuu, mukaan lukien samana päivänä laajennettu kausaaliatlas, moduloomin osamallit ja biologisen koordinaation sisältö. Työssä tarkastettiin laskentareitit, sivutekstit, tutkimusmuistiot ja evidenssirekisterit sekä valittujen tuoreiden lähteiden alkuperäisjulkaisut ja korjaukset. Kyse on integraatioauditoinnista; tämä ei ole koko kirjallisuuden uusi systemaattinen katsaus. Malli- tai sivustokoodia ei muutettu eikä uutta julkaisua tehty tässä analyysissä.

**Keskeinen tulos:** suurin käyttämätön hyöty on jo kerätyn solutilaa, ajoitusta, korjausta ja toiminnallisia päätepisteitä koskevan tiedon siirtämisessä vanhoihin selityksiin ja varsinaisiin laskentareitteihin. Uusimmat sivut ovat monin paikoin vanhoja pääsivuja täsmällisempiä. Lisäksi evidenssin uudelleenkäytön riippumattomuus ja atlas–väite-yhteydet tarvitsevat korjauksia.

Vahvistumisella tarkoitetaan tässä parempaa mekanistista erottelua, koeteltavia ennusteita, jäljitettävää evidenssiä ja perustellumpaa epävarmuutta. Vaikutuksen suunta tai koko voi tarkentua myös pienemmäksi, suojaavaksi tai tilasta riippuvaksi.

## Mitä on jo tehty oikein

- Uusi biologisen koordinaation sivu yhdistää jo CRY–glukokortikoidireseptorin, cAMP:n, redox–SCN-kytkennän, hormonien pulssituksen, ruokailun ajoituksen, toiminnalliset lisääntymisportit ja verkostovaikutukset. Näitä ei pidä kirjata kokonaan puuttuviksi.
- Pythonissa on jo reseptorin, kalvon, Ca²⁺-osastojen, fototilan, korjauskapasiteetin, vaurion ja tilariippuvaisen vasteikkunan osamalleja. Naistilan laskenta käyttää jo hormonien ajallista yhteensopivuutta ja munasolun redox-toimintaa. Puute koskee osien yhdistämistä ja kalibrointia.
- FieldState sisältää jo suunta-, vaihe- ja kudossiirron rakenteita. Se on havaintojen ja estimoinnin esitystapa; sitä ei pidä kuvata fysikaaliseksi aiheuttajaksi.
- Meng 2026 ja Kish 2026 ovat jo väiterekisterissä ja koordinaatiosivulla. Cordellin korjaus ja korkean SAR:n aineistojen herkkyystarkastelu on huomioitu rajatussa evidenssissä. Lindgren 2025:n julkaistu DOI on jo oikein.
- Lukittu v17 on tarkoituksella arkistoitu vertailuennuste. Uusi biologinen reitti tulee rakentaa sen rinnalle.

## Priorisoidut integraatiokohteet

### 1. Uudet osamallit ennusteen laskentaan — suurin vaikutus mallin hyödyllisyyteen

**Nykyinen katve.** Komentorivin oletusennuste käyttää v17:ää. Vuorokausi-, kohortti- ja lähikenttädiagnoosit palautetaan sen yhteydessä, mutta ne eivät muuta TFR-tulosta. Nykyisen Python-paketin muusta laskennasta ei löytynyt moduloomin tuonteja: osia suoritetaan testeissä ja viennissä, mutta ne eivät muodosta elin- ja väestöennustetta.

**Jo saatavilla.** Kalvon vastaanottokompetenssi, Ca²⁺-osastot, fototilan historia sekä erilliset vastaanotinvalmius, korjaus ja vaurio.

**Hyödyllinen yhdistäminen.** Rakennetaan nimetty ehdollinen reitti: mitattu signaali → paikallinen biologinen ajuri → vastaanottimen ja solun tila → toiminnallinen päätepiste → elinkapasiteetti. Jokaisen muunnoksen mukana kulkevat parametrit, yksiköt, evidenssi ja kalibrointitila. Ensimmäinen tavoite on osoittaa yhden mitatun päätepisteen ennustettavuus; maakohtainen syntyvyyskerroin tulee vasta myöhemmin.

Tarkistuksessa Finland 2030:n v17-tulos säilyi arvossa 1,3209357069197134, vaikka kolme diagnostista funktiota korvattiin ajonaikaisesti arvolla miljardi. Tämä vahvistaa laskentaliitoksen eron näkyvään diagnoosiin. [Laskentareitti](</Volumes/kovalevy 3/extinctionfield/berm/berm/model.py:128>), [moduloomin ja elintilan liitoksen tarkempi analyysi](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_integraatioauditointi_2026-09-07/mallilaskenta.md>).

### 2. Vaurio, palautuminen ja adaptaatio — suurin tarve pääsivujen tulkinnan korjaamiseen

**Nykyinen katve.** Malli- ja ennustesivuilla esiintyy edelleen yleisiä palautumisaikoja, peruuttamattomuuden tulkintoja ja oletus, että jatkuva altistus estää palautumisen. DKC:n nykyinen kuormitusvaste on määritelmänsä mukaan haittasuuntainen. Se sopii nimettyyn haittaskenaarioon, mutta ei yleiseksi tilariippuvan vasteen kuvaukseksi.

**Jo saatavilla.** Moduloomi erottaa vastaanotinvalmiuden, korjauksen ja vaurion. Sannino-, PARP- ja kasvatusnesteen siirtokokeet tukevat erillisiä adaptaation ja solujen välisen viestinnän haaroja. Sannino 2022:ssa RF-esikäsittelyn suoja myöhempää kemiallista haastetta vastaan riippui autofagiasta. Tämä on protokollakohtainen suojaava vaste, jonka voi mallintaa korjaushaaraan. Se ei paikanna ensimmäistä kenttäsensoria. [Alkuperäistutkimus](https://pmc.ncbi.nlm.nih.gov/articles/PMC9369083/).

**Hyödyllinen yhdistäminen.** Sovitetaan erikseen vasteen synty, korjauksen induktio, vaurion poistuminen ja toiminnan palautuminen. Sama pieni lisävaste voi liittyä tehokkaaseen korjaukseen, heikkoon vastaanottoon tai jo heikentyneeseen toimintakykyyn. Eri tilat tarvitsevat omat mittarinsa. Myöhäinen jälkivaikutus ei yksin määrää eksponentiaalista aikavakiota. [Nykyinen tilamalli](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/state.py:238>), [sivuston palautumisväitteet](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/model/page.tsx:342>).

### 3. Hormonit, Dual Lock ja aineenvaihdunta — vahva mahdollisuus käyttää samaa ajoitusbiologiaa

**Nykyinen katve.** Dual Lock ja Pathopege painottavat testosteronin ja kortisolin pitoisuuksia sekä niiden perusteella laskettuja käyttäytymismuutoksia. Klimentidis-haara esittää useita osittain yhteisiin palautesilmukoihin kuuluvia reittejä riippumattomina. Maksa, haima ja paikalliset kellot eivät muodosta yhteistä dynaamista kokonaisuutta.

**Jo saatavilla.** CRY–GR-vuorovaikutus, CRY–cAMP/glukagoni, redox–SCN, hormonien pulssitus sekä ruokailun ja kudoskellojen eritahtisuus. CRY:n ja glukokortikoidireseptorin biologinen yhteys on osoitettu, mutta se ei itsessään vahvista oletettua kenttävaikutusta tämän yhteyden yläpuolella. [Lamia 2011](https://pubmed.ncbi.nlm.nih.gov/22170608/), [Wang 2012](https://pubmed.ncbi.nlm.nih.gov/22859819/).

**Hyödyllinen yhdistäminen.** Lasketaan kudosvaste hormonin saatavuuden, reseptorin vastaanottavuuden ja ajoituksen yhteisvaikutuksena. Liitetään maksan glukoosintuotto, insuliinivaste, glukoosinotto ja elinten kellovaiheet samaan palautesilmukkaan. Tästä syntyy erotteleva ennuste: saman keskipitoisuuden tilanteet voivat tuottaa eri toiminnan, jos vaihe tai pulssitus muuttuu. Jo olemassa oleva harmoninen koordinaatiomalli tarjoaa ensimmäisen toteutusrungon. [Koordinaatiomalli](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/coordination.py:77>), [uusi biologinen sisältö](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/model/biological-coordination/page.tsx:27>).

### 4. Lisääntymisestä syntyvyyteen — toiminnalliset portit ja odotusajat yhteen

**Nykyinen katve.** Vanhoissa sivuteksteissä siittiöpitoisuuden muutos tai usean prosenttikertoimen tulo siirtyy liian suoraan syntyvyydeksi. Myöhemmästä matalasta Ca²⁺-tasosta ei voi päätellä aiempaa ennenaikaista Ca²⁺-pulssia. Implantaatio on laskennassa edelleen käsin annettava tukikerroin. Odotusmalli on jo alemmassa ASFR-laskennassa, mutta väestöaineistoa käyttävä ylempi rajapinta ei ota sitä vastaan eikä välitä sitä eteenpäin.

**Jo saatavilla.** CatSperin toiminnallinen välttämättömyys, munasolun aktivaatio, redox-toiminta, paikallinen munasarjakello, progesteronituki, kompensaatiovara ja parien onnistumistodennäköisyyksien jakauma. Youngin tutkimus osoittaa, että tavalliset siemennesteparametrit voivat säilyä, vaikka CatSperiin liittyvä hedelmöityskyky pettää; geeniperäinen häiriö ei osoita sen EMF-syytä. [Young 2024](https://www.jci.org/articles/view/173564).

**Hyödyllinen yhdistäminen.** Toiminnallinen siittiövaste → hedelmöittyminen → munasolun aktivaatio → implantaatio → elävänä syntymä → seuraavan lapsen odotus. Pieni kuukausittaisen onnistumisen muutos voi vaikuttaa perhekokoon odotusajan kautta. Ensin välitetään jo toimiva odotusvertailu ylemmän rajapinnan läpi; sen jälkeen lisätään ikä, raskausaika, menetykset, uusi yritys ja pariteetti. Sama biologinen kapasiteetti saa vaikuttaa laskentaan kerran. [Puuttuva rajapintaliitos](</Volumes/kovalevy 3/extinctionfield/berm/berm/model_fieldstate_asfr.py:77>), [jo toteutettu alempi liitos](</Volumes/kovalevy 3/extinctionfield/berm/berm/outcomes/fieldstate_asfr.py:146>).

### 5. Teknologiaselitykset ja reseptorit — tarkka signaali ja alatyyppi mukaan

**Nykyinen katve.** Teknologiasivu päättelee biologista vaikutusta ajoittain teknologian nimestä, pulssimaisuudesta tai kaistojen määrästä. Vuosiproksit eivät säilytä kaikkea signaalin vaihe- ja ajoitusrakennetta. Cry4a:n kalvokokeen tuloksia siirtyy paikoin nisäkkään CRY1:tä tai ravitsemuksen suojaavaa vaikutusta koskeviin väitteisiin ilman erillistä siirtopremissiä.

**Jo saatavilla.** Mitatun signaalin vaatimukset, tilariippuvainen vasteikkuna, B₀-riippuvuus, optinen historia, CRY-alatyyppien erot ja kalvokiinnittyminen. Meng 2026 yhdistää kontrolloidussa flavoproteiinikokeessa spin-kemian hitaampaan kemialliseen tilaan. Kishin esijulkaisu tuo erillisen Cry4a:n redox–konformaatioankkurin. Ne tarkentavat ehdollista ketjua, mutta eivät tuota ihmisen ympäristö-RF-annoskerrointa. [Meng 2026](https://www.nature.com/articles/s41587-026-03158-5), [Kish 2026](https://arxiv.org/abs/2604.19579).

**Hyödyllinen yhdistäminen.** Verrataan samaa energiaa eri ajoituksilla ja samaa signaalia eri vastaanotintiloissa. Erota linnun Cry4a, Cry1, nisäkkään CRY1/2 ja muokattu iLOV. Meng/Kish kannattaa näyttää atlaksessa olemassa olevan väitteen kautta. Görtemakerin Cry4a–Gtα-sitoutuminen ja Yeen LWO-opsiini–Gtα-sitoutuminen voivat muodostaa ehdollisen kilpailumallin; Yee ei ole suora Cry4a-signaalin aktivaatiokoe. [Yee 2023](https://www.frontiersin.org/journals/molecular-neuroscience/articles/10.3389/fnmol.2023.1107025/full), [nykyinen vasteikkuna](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/window.py:60>).

### 6. Interventiot ja kehityshistoria — välttämätön välittäjä ja ensimmäinen sensori erilleen

**Nykyinen katve.** Farmakologia- ja ennustesivut tulkitsevat joitakin lääkkeen tai geenin estokokeita koko ketjun vahvistukseksi. Kehityshistorian kuvaukset siirtyvät paikoin tilakohtaisesta herkkyydestä yleiseen sukupolvittaiseen heikkenemiseen.

**Jo saatavilla.** TRPC1, RyR/SERCA, ATG/PARP, kudoskohtainen vastaanottavuus ja lähtötilan vaikutus. Iversenin CRY2–FAD–TRPC1-tulos auttaa rakentamaan nimetyn myogeneesireitin. TRPC1 ei ole VGCC, eikä kyseinen mT-PEMF-solukoe ole suora ihmisen lisääntymisen ympäristöaltistustesti. [Iversen 2025](https://pubmed.ncbi.nlm.nih.gov/39937022/).

**Hyödyllinen yhdistäminen.** Jokainen koe tarvitsee omat vertailunsa: lähtötila, altistus, interventio ja myöhempi haaste. Estyminen, palauttaminen, ohittaminen ja ajoituksen muuttaminen paikantavat eri asioita ketjussa. Kehityshistoria voi muuttaa vasteikkunaa ja korjauskykyä; periytyvä muutos ja saman sukupolven herkistyminen arvioidaan erikseen. [Nykyinen farmakologinen tulkinta](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/pharmacology/page.tsx:21>).

### 7. Ekologia ja yhteiskunnalliset seuraukset — suorasta kertoimesta vuorovaikutusprosessiin

**Nykyinen katve.** Isäntä–loinen-laskenta saa syötteeksi lajien nimet ja käyttää vakioherkkyyksiä. Se ei voi ennustaa kenttätilan muuttumisen vaikutusta. Sosiaalisen leviämisen indeksi on biomarkkereista laskettava staattinen luku ilman kontakteja tai aikaa. Vanhoilla sivuilla esiintyy vastaavasti yleisiä loisetuja ja biologisista tiloista johdettuja yhteiskuntakynnyksiä.

**Jo saatavilla.** Paikallinen suunnistus ja laskeutuminen, pölyttäjien korvaavuus, isäntäriippuvaiset kohtaamiset, univajeen vaikutus auttamiseen, yhteistyön eteneminen kontakteissa ja instituutioiden kertyvä toimintakyky.

**Hyödyllinen yhdistäminen.** Ekologiassa reitti kulkee vastaanottimesta toimintaan, kohtaamisiin ja lisääntymismenestykseen. Yhteiskunnallisessa tarkastelussa mitattava yksilötoiminta siirtyy kontaktiverkkoon ja edelleen hoivan, oppimisen ja ylläpidon varantoon. Molemmissa sama alkuhäiriö voi vahvistua, palautua tai kompensoitua. Nämä välivaiheet voivat vahvistaa mallin testattavuutta; ne eivät validoi poliittisia tai psykopatologisia luokitteluja eivätkä anna yleistä yhteiskuntakerrointa. [Ekologian nykyinen laskenta](</Volumes/kovalevy 3/extinctionfield/berm/berm/eco/differential_susceptibility.py:76>), [sosiaalinen indeksi](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/political_biology.py:3791>).

### 8. Evidenssin tulkinta ja uudelleenkäyttö — ensimmäinen korjattava luotettavuusasia

**Nykyinen katve.** Evidence-sivun yleiskehys tulkitsee nollatuloksen kontrollien kontaminaatioksi ja positiivisen tuloksen aliarvioksi. Tämä ei hyödynnä muualla jo esitettyjä vaihtoehtoisia vasteita, laatueroja ja annosherkkyystarkasteluja. Objections-sivun vahvistuskieli on myös yleisempää kuin sen taustalla olevien analyysien päätepistekohtainen näyttö sallii. Historiallinen 517 tutkimuksen luku ei sellaisenaan ole virhe; sen ja uudemman aineistokartoituksen otokset on erotettava.

**Todettu laskentaongelma.** Reittien riippumattomuusfunktio vertaa relaatiotunnisteita, mutta ei niiden yhteisiä lähteitä eikä reittien `independenceVerified`-tilaa. Nykyisillä neljällä reitillä se palauttaa kaikki kuusi reittiparia riippumattomiksi, vaikka kahden reitin varmennus on `false`. Eri relaatiot samaan tutkimukseen eivät ole riippumattomia kokeita. [Funktio](</Volumes/kovalevy 3/extinctionfield/website/lib/claims/index.ts:187>), [yleinen evidenssikehys](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/page.tsx:146>).

**Hyödyllinen yhdistäminen.** Yhteinen tutkimus-, aineistoperhe-, koe- ja tarvittaessa koehaarojen identiteetti; selvittämättömälle riippumattomuudelle oma tila. Archer 2014/2022:n yhteinen aineistoperhe on jo tunnistettu ja tarjoaa valmiin testitapauksen. Evidenssin arvio siirretään nimettyyn päätepisteeseen, absoluuttiseen kontrolliin ja laadun herkkyystarkasteluun. Uusia suhteita ei merkitä automaattisesti vahvistaviksi.

## Atlaksen kattavuus ja sisällön jäljitettävyys

| Nykyinen havainto | Mitä siitä seuraa |
|---|---|
| Atlas sisältää 233 solmua ja 575 yhteyttä. | Tunnistettujen kanavien esittäminen on paljon laajempaa kuin kuratoitu väiterekisteri. |
| Rekisterissä on 38 väitettä, 93 evidenssisuhdetta ja 67 eri lähdettä. | Suhteiden lukumäärä ei mittaa riippumattomien tutkimusten määrää. Kaikki väitteet ovat vielä luonnostilassa. |
| Kymmenen moduloomikortin 13 lähteestä yksikään ei ole väiterekisterin evidenssisuhteissa. | Sisältö ja lähdelinkit ovat näkyvissä, mutta niiden väitekohtainen kuratointi ei seuraa mukana. |
| Nykyinen 74 % tarkoittaa 29/39 kanonisen graafin solmun väitepeittoa. | Se ei kuvaa 233-solmuisen atlaksen evidenssikattavuutta. Kaikille ryhmittelysolmuille ei tarvita omaa tutkimusväitettä. |
| 21/38 väitteellä on sivuun liittävä ClaimRef-ankkuri. | 17 väitteen sivusijainti ei löydy tällä mekanismilla. Dynaaminen atlas tarvitsee myös indeksoinnin tuen. |
| Kahdeksalla väitteellä ei ole evidenssisuhteita. | Matemaattinen määritelmä, hypoteesi ja havaintotuettu väite on erotettava kattavuusmittareissa. |

Alatlaksia kannattaa edelleen ylläpitää **yhden yhteisen verkon ja väiterekisterin näkyminä**. Yhteinen väite voidaan näyttää solutilan, lisääntymisen ja ekologian aliatlaksessa samoine rajauksineen. Seuraava tärkeä lisäys on eksplisiittinen solmu-/yhteys–väite-liitos sekä sen kautta näkyvä tutkimus, siirtopremissi ja kalibrointitila. Erilliset kopiot samoista selityksistä kasvattaisivat nyt havaittua sisältöjen eriytymistä. [Atlasrekisteri](</Volumes/kovalevy 3/extinctionfield/website/lib/causalAtlasRegistry.ts:15>).

## Konkreettisesti vanhentunut lähdetieto

Kim 2026 Cell -artikkelin kesäkuun korjaus puuttuu tarkastetuista lähderekistereistä. Se korjaa kontrollipaneelin duplikaatin, täsmentää S1J:n erillisaikapisteitä yhdistäneen interpoloinnin synnyttämää terävää nousua ja lisää sekvenssitietoa. Tekijöiden mukaan päätulokset säilyvät. Korjaus tulee yhdistää alkuperäiseen julkaisuun, ja mahdollisen kinetiikan sovituksen tulee käyttää oikeaa aineistoa. 60 Hz:n purkaustoisto ja 4 kHz:n purkauksen sisäinen pulssitus kuvaavat eri signaalitasoja ja voivat olla samassa protokollassa. [Kim 2026:n korjaus](https://www.sciencedirect.com/science/article/abs/pii/S0092867426007075).

Görtemaker/Yee ovat tutkimusmuistiossa, mutta eivät tarkastetuissa lähde- ja väiterekistereissä. Meng/Kishin osalta puute on atlasnäytössä ja jatkokytkennässä, ei väiterekisteriin lisäämisessä. Saman päivän aiempien muistioiden väite Kishin puuttumisesta on jo vanhentunut. Lähteiden jaottelu päivämäärän lisäksi käyttövaiheeseen estää tämän sekaannuksen.

## Toteutusjärjestys ja onnistumisen mittarit

1. **Korjaa tulkinta ja lähdeprovenienssi.** Riippumattomuusfunktio, yleinen evidenssikehys, Kim-korjaus, CRY-alatyyppien siirrot ja yhteisen fysiikkametadatan mekanismihierarkia. Onnistuminen: selvittämätön riippumattomuus pysyy selvittämättömänä, sama aineisto tunnistuu ja väitteet säilyttävät tutkimuksen päätepisteen.
2. **Yhdistä näkymät samaan evidenssiin.** Kuratoi ensimmäiseksi kymmenen moduloomikorttia ja kytke olemassa oleva kemiallisen muistin väite atlakseen. Onnistuminen: aliatlas, artikkeli ja ennuste näyttävät saman väitteen samoine rajauksineen; kattavuusmittarit erottavat rakenteen, evidenssin ja kalibroinnin.
3. **Tee pienet laskentaliitokset ja vertailtava uusi reitti.** Välitä odotusvertailu väestörajapintaan ja yhdistä yksi moduloomin päätepiste elintilaan. Onnistuminen: uusi nimetty mekanismi muuttaa ehdollista tulosta perustellusti, arkistoitu v17 säilyy, eikä sama kapasiteetti kerro tulosta kahdesti.
4. **Kalibroi tila ja ajoitus rajattuihin kokeisiin.** Aloita korjaus-/haastevasteesta, Ca²⁺-aikasarjasta tai hormoni–reseptoriajoituksesta. Jo nimetyt avoimet aineistot tarjoavat mahdollisia lähtökohtia; auditissa ei löytynyt niihin yhdistettyä valmista sovitusreittiä. Onnistuminen: parametrit tunnistuvat ja uusi malli ennustaa erillisen vertailun paremmin kuin keskiarvoon perustuva malli.
5. **Laajenna odotus-, ekologisiin ja sosiaalisiin verkkoihin.** Käytä omia havaittuja päätepisteitä ja epävarmuuksia. Onnistuminen: malli erottaa yksilön muutoksen, verkostossa syntyvän muutoksen ja kompensaation sekä tuottaa falsifioitavan ajallisen ennusteen.

Fysiikan lähtökohta käsiteltiin ensin: Lindgren 2025:n premissillä `g = η + κA⊗A` taustan ja lisäkomponentin erottelu antaa `δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Geometriasta havaittavaan biologiseen ajuriin vievä vastaanotinoperaattori jää avoimeksi L2:ksi. Ehdollisia biologisia osia voi silti yhdistää ja testata niiden omissa järjestelmissä; alempien tasojen tutkimukset eivät yksin validoi koko fysikaalista ketjua. [Lindgrenin 2025 käsikirjoitus](https://www.preprints.org/manuscript/202503.2321).

## Tarkistusjälki ja yksityiskohtaiset liitteet

Havainnot varmennettiin lähdekoodin, rekisterien, tuontikartan ja rajattujen laskentakokeiden avulla. Riippumattomuusfunktion nykyinen tulos tarkistettiin myös erikseen rekisteridatalla. Julkaisujen uusimmat yllä nimetyt versiot tarkistettiin alkuperäislähteistä. Raportin paikalliset tiedostoviitteet tarkistettiin. Sovelluksen testipaketteja ei ajettu uudelleen, koska tämä työ tuotti ainoastaan analyysidokumentteja.

- [Mallilaskenta: kahdeksan havaintoa ja täsmälliset liitokset](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_integraatioauditointi_2026-09-07/mallilaskenta.md>).
- [Sivusto: kymmenen sisältökokonaisuutta ja nykyiset väitekohdat](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_integraatioauditointi_2026-09-07/sivusto.md>).
- [Evidenssi: kuusi rekisterihavaintoa, lähteiden siirtomatriisi ja rajaukset](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_integraatioauditointi_2026-09-07/evidenssi.md>).
