# Havainnekuvien ja kuvituksen tarvearvio

Päiväys: 8.9.2026. Tarkastelun pohjana julkaistu commit `8fd36d03e0cf2aab4700613a8151cb1bdec9b255` ja julkisen sivuston selainkatselmus. Tämä on suunnitteluanalyysi, ei toteutettu kuvituspäivitys.

## Tärkein havainto

Sivuston suurin kuvitustarve liittyy asioiden sijaintiin, mittakaavaan, ajoitukseen ja niiden välisiin siirtymiin. Sivustolla on jo runsaasti aikasarjoja, kausaalikaavioita, tilamalleja ja interaktiivisia työkaluja. Niiden rinnalle tarvitaan muutamia toistuvia, konkreettisia havaintokuvia: missä lähde on, mitä organismi kohtaa, missä vastaanotto tapahtuu ja miten paikallinen tapahtuma liittyy havaittuun suureeseen.

Suositus on rakentaa yhteinen kuvitusjärjestelmä muutamasta uudelleenkäytettävästä kuvaperheestä. Yhden uuden kuvan pitäisi korvata vaikea selitystehtävä tai auttaa käyttämään nykyistä työkalua. Kaikkien sivujen täyttäminen uusilla pääkuvilla kasvattaisi selattavaa pintaa ja siirtäisi ydinsisältöä kauemmas.

Korkein tiedollinen hyöty: teknologiahistoria, kenttärekonstruktio, biologinen vastaanottotila ja tutkimusasetelmien vertailu. Suurin anatomisen kuvituksen tarve: biologian yleissivu ja elinkohtaiset modulomisivut. Nykyisen etusivun pääkuvan vaihtamisen hyöty on vähäinen suhteessa näihin.

## Mitä tarkastettiin

- Reittitason inventaario kattoi 108 `page.tsx`-tiedostoa, mukaan lukien uudelleenohjaukset ja dynaamiset sivupohjat. Luku ei tarkoita 108:aa erillistä, kokonaan selaimessa luettua artikkelia.
- Kuvakomponentit, niiden käyttökohdat ja kuvatiedostot tarkastettiin lähdekoodista. Tarkempi sisällöllinen arvio kohdistettiin fysiikkaan, mittaukseen, biologiaan, teknologiahistoriaan, atlakseen, ekologisiin ja yhteiskunnallisiin ketjuihin sekä replikaatioon.
- Julkisesta käyttöliittymästä tarkastettiin muun muassa etusivu, teknologiasivu, biologian yleissivu, atlas ja replikaatiosivu. Arvio perustuu julkaistuun versioon; alkuperäisen työpuun muita keskeneräisiä muutoksia ei oletettu julkaistuiksi.
- `public`-hakemistossa on 39 rasteri-/vektorikuvaa. Mukana on rinnakkaisia tiedostomuotoja, artikkelien koko- ja jakoversioita sekä lajisiluetteja. Tämä ei ole sisältökuvien tai diagrammien määrä: suuri osa sivuston havainnollistuksista syntyy komponenteissa.
- Verkkohakutyökalun sivukopiot näyttivät osin julkaisua edeltävää sisältöä. Nykytilaa koskevat havainnot varmistettiin siksi julkaistusta koodista ja selaimesta.

## Nykyiset kuvat, joiden päälle kannattaa rakentaa

| Kokonaisuus | Jo olemassa | Suunnitteluratkaisu |
|---|---|---|
| Etusivu | Hedelmöitystä kuvaava pääkuva, lajimuutokset, teknologiavertailu, peittymisen kuva, yksinkertainen kausaaliketju ja `BermMasterInfographic` | Selkeytä kahden mekanismiyhteenvedon työnjakoa. Uusi pääkuva ei ole ensimmäinen työ. |
| Malli ja fysiikka | Uudistettu `BermCausalDiagram`, kausaalikartta, `TwoSusceptibilities`, `ThreeBiologicalBands`, `FieldSignalStructure` ja matemaattiset johdot | Ylläpidä yhtä kanonista rakennetta. Lisää paikallinen havaintokuva vaikean käsitteen viereen; älä luo kilpailevaa kokonaismallia. |
| Muutosatlas | TFR/testosteroni, kalibrointi ja ennuste, G/U/C-historiat, teknologiasarjat, historiavaiheiden radat | Täydennä tulkintaohjeita ja valitun lähdeperheen paikkakuvaa. Nykyisiä laskettuja käyriä ei tarvitse piirtää kuvituksena uudelleen. |
| Biologia ja modulomi | Kerrokset, kalsiumkierto, tilariippuvuus, palautesilmukat, steroidogeneesin tutkimusselain; erilliset BBB-, geeni- ja siittiöreittikuvat | Yhdistä olemassaolevat mekanismit anatomiseen sijaintiin ja mittakaavaan. |
| Sentinellit ja ekologia | Lajien pääkuva ja siluetit, kaskadit, pulssiprofiili, Varroa-ketju, punkin ja isännän sähköisen rajapinnan kuva | Kuvita ekologisia kohtaamisia, reittejä ja ajoitusta. Toinen yleinen eläinkollaasi ei ratkaise tätä tarvetta. |
| Sivilisaatio ja vaikutuksen peittyminen | Vuodenaika-allegoria, jakauma-/kehityskuvaajia, kausaalikaavioita ja useita peittymisen vertailuja | Selitä konkreettinen yksilö–pari–verkosto–väestö-siirtymä. Säilytä nykyiset analyysit syventävinä tasoina. |
| Artikkelit | Useita valmiita toimituksellisia pääkuvia ja niiden jakoversiot | Käytä samaa ilmettä jatkossa; tärkeimmät uudet kuvat sijoitetaan artikkelin sisäiseen päättelykohtaan. |

## Ensimmäiset toteutettavat kokonaisuudet

Prioriteetti perustuu selitettävän asian vaikeuteen, nykyisen esityksen puutteeseen, käytettävissä olevaan aineistoon ja uudelleenkäyttöön. Kyse on suunnitteluarviosta, ei mitatusta käyttäjävaikutuksesta.

### 1. Lähteet samassa elinympäristössä

**Paikka:** [teknologiasivun alku](https://www.extinctionfield.com/fi/evidence/technology#technology-context) ja atlaksen [Kenttärekonstruktio](https://www.extinctionfield.com/fi/explore?tab=atlas&country=FIN&view=fields).

Nykyinen johdanto mainitsee seinäjohdon, radiolähettimen, invertterin, vesielektrodin ja varautuneen materiaalin. Historiallinen kenttänäkymä esittää vaiheet ratoina ja kentän paikallisen muodon tekstinä. Se ei vielä näytä, miltä lähteiden sijoittuminen näyttää organismin näkökulmasta.

**Kuva:** rakennuksen, pihan ja veden yhteinen leikkauskuva. Siinä näkyvät johdin ja paluureitti, paikallinen sähkölaite, antenni, kontakti- tai vesireitti sekä ihminen ja yksi muu eliö. Valittu lähdeperhe korostaa vain siihen kuuluvan reitin. Etäisyys, suunta ja käyttöjakso ovat luettavia nimettyjä tietoja.

**Muoto:** skaalautuva SVG, tarvittaessa käsin tarkistetun maisemakuvituksen päälle rakennettu interaktiivinen kerros. Sama kuvapohja toimii teknologiasivulla yksinkertaistettuna ja atlaksessa valitun lähdeperheen selitteenä.

Kuva esittää lähdejärjestelyä. Todellisen maan kenttäkartta edellyttäisi sijainti-, käyttö- ja kenttäaineistoa. Kansallista laitemäärää ei muuteta kuvan väriasteikolla paikalliseksi annokseksi. Ensimmäiseen versioon riittää selvästi nimetty esimerkkimaisema, jonka teknologiavalinnat tulevat nykyisestä historiadatasta.

### 2. Samasta ympäristöstä eri historialliset tilanteet

**Paikka:** teknologiasivun historia sekä atlaksen lähdehistorian yhteys valittuun vuoteen.

**Kuva:** kolme tai neljä rinnakkaista näkymää samasta esimerkkipaikasta. Kunkin näkymän lähteet, käyttömuodot ja poistumat kytketään valitun maan dokumentoituihin tapahtumiin. Lukija näkee esimerkiksi, että uusi radiotekniikka liittyy olemassa olevaan sähköiseen infrastruktuuriin ja että jotkin lähteet myös poistuvat.

Vuodet valitaan aineistosta, eikä kaikille maille pakoteta samoja kehitysvaiheita. Kuvien alla ovat lähdetapahtuma ja sen alueellinen kattavuus. Jatkuva vuosiliukusäädin käyttää atlaksen nykyistä vuosivalintaa.

**Muoto:** ensimmäisessä versiossa rinnakkaiset SVG-tilanteet. Laajennetaan vasta sen jälkeen synkronoiduksi atlasnäkymäksi. Nykyinen 13 lähdeperheen aikajana säilyy varsinaisena historiatietona; tilanteet auttavat lukemaan sitä.

### 3. Elimistöstä vastaanottavaan soluun

**Paikka:** [biologian yleissivu](https://www.extinctionfield.com/fi/biology), [modulomi](https://www.extinctionfield.com/fi/modulome) ja [kalsium–redox–steroidogeneesi](https://www.extinctionfield.com/fi/biology/calcium-redox-steroidogenesis).

Biologian yleissivu avaa vastaanottajatilan, reseptorit, kellot ja hormonivasteen tekstillä ja korteilla. Lukijalta puuttuu paikannus: mikä näistä tapahtuu solukalvolla, solun sisällä, tietyssä elimessä tai elinten välisessä säätelyssä?

**Kuva:** kolme luettavaa mittakaavaa: elimistö → valittu elin/kudos → solu. Solutasolla erotetaan kalvo, kalsiumin reitit, solunsisäiset varastot, mitokondrio ja hormonituotannon kannalta olennainen alue. Valittu mekanismi korostaa oman sijaintinsa ja avaa nykyisen tutkimus- tai mekanismiselitteen.

**Muoto:** anatomisesti tarkistettu leikkauskuva ja sen päällä erilliset SVG/HTML-merkinnät. Ensimmäisessä versiossa staattiset rinnakkaiset suurennokset ovat jatkuvaa zoomausta helpommin luettavia. Myöhemmin sama kuvitus voi palvella elinkohtaisia sivuja.

**Konkreettisin aloituskohde:** [kiveksen solukomponentit](https://www.extinctionfield.com/fi/modulome/testes#components). Samassa leikkauksessa paikannetaan Leydigin solut, Sertolin solut, sukusolut, veri–kiveseste sekä verenkierron ja kudoksen hormonitilan ero. Steroidogeneesin sivulla on jo lähteistetty interaktiivinen konvergenssiesitys, joten tämä anatominen kuva täydentää sitä paremmin kuin toinen saman reitin nuoliketju. Kuvan pienempi versio voi toimia biologian yleissivun mittakaavaesimerkkinä.

Kuvan tulisi näyttää myös se, missä BERM:n ehdollinen fysikaalinen kytkentä liittyy kuvattuun biologiaan. Tuodun anatomian ja komponenttitutkimusten esittäminen tarkasti ei edellytä, että kaikki reitin vastekertoimet on tunnistettu.

### 4. Miksi sama tämänhetkinen syöte ei tarkoita samaa historiaa

**Paikka:** [atlaksen ennustekäyrät](https://www.extinctionfield.com/fi/explore?tab=atlas&country=FIN&view=change&question=fertility&forecast=1), biologinen koordinaatio ja muistia käsittelevät kohdat.

Atlaksessa G(t), U(t) ja C(t) sekä biomarkkerin ennuste ovat jo olemassa. Uuden kuvan tehtävä on opettaa niiden lukeminen. Ensimmäinen vaihe on nykyisten ratojen yhteinen selite ja niihin kohdistuvat lyhyet huomiot.

**Havainnollistava esimerkki:** kaksi lähdehistoriaa päättyy samaan nykyiseen arvoon. Toinen on pitkäkestoinen, toinen viimeaikainen. Samalle aikajanalle lasketaan valitulla viiveellä vuosivaste ja samalla muistioletuksella kertynyt tila. Näytetään, mikä ero siirtyy BERM:n ehdolliseen biomarkkerikäyrään. Esimerkin kaikki käyrät tuotetaan laskennasta ja merkitään esimerkkiskenaarioksi.

Lisäksi nykyisiin endpoint-kuvaajiin kannattaa tehdä lyhyt lukemisohje: havaintopiste, tutkimusjakso, sovituksen viimeinen vuosi, kalibrointijakso ja myöhempi ennuste. Se voidaan näyttää kerran ensimmäisen kuvaajan yhteydessä.

**Muoto:** nykyisten kuvaajakomponenttien kevyt opastustila. Uusi suuri pääkuva atlaksen valitsinten yläpuolella heikentäisi sen käyttöä.

### 5. Kaksi laboratoriota, eri fyysiset ja biologiset olosuhteet

**Paikka:** [replikaatiosivun viisi sekoittavaa tekijää](https://www.extinctionfield.com/fi/evidence/replication), [vaste-ehdot](https://www.extinctionfield.com/fi/evidence/response-conditions) ja [mittausprotokolla](https://www.extinctionfield.com/fi/about/measurement).

Nykyiset kortit ja standardiluettelo nimeävät tekijät hyvin, mutta niiden yhteys koeasetelmaan on kuviteltava itse.

**Kuva:** kaksi saman perusasetelman laboratoriopöytää. Niissä näkyvät näyte ja sen suunta, lähde, mittapää, paikallisen taustakentän vektori, valaistus, lämpötila sekä näytteenottoaika ja aiempi historia. Pieni sijainti–kalenteri-osa näyttää, mitä paikan ja vuodenajan mukana kirjataan. Käyttäjä voi tarkastella yhtä eroa kerrallaan.

**Selitystehtävä:** näyttää, mitkä suureet todella vastaavat toisiaan kahdessa kokeessa. Kuva voi auttaa jäsentämään nollatulosta ja tilariippuvuutta, mutta yksittäisen tutkimustuloksen tulkinta edellyttää kyseisen tutkimuksen tietoja. Puuttuva mittaus merkitään puuttuvaksi; sitä ei täytetä kuvituksen oletusarvolla.

**Muoto:** ensin kahden paneelin SVG. Interaktiivinen versio on perusteltu, kun jokaisen muuttuvan tekijän yhteys tulokseen voidaan laskea määritellyllä mallilla tai näyttää nimetyllä tutkimusesimerkillä.

### 6. Signaalirakenne ja vastaanottoikkuna

**Paikka:** [fysiikka](https://www.extinctionfield.com/fi/physics), [signaalirakenne](https://www.extinctionfield.com/fi/model#signal-structure) ja FieldState-mittauksen pulssirakenne.

**Kuva:** rinnakkaiset signaalit, niiden yhteenvetosuure, ajallinen rakenne ja erikseen määritelty vastaanottoikkuna. Korostetaan yhtä eroa kerrallaan: vaihetta, suuntaa, pulssitusta tai muistia. Näin lukija näkee, mitä yksi keskiarvo jättää kuvaamatta.

`FieldSignalStructure` sisältää jo lasketut tulokset ja niiden rajat, mutta pääosin kortteina ja taulukoina. Niiden rinnalle sopii laskettu signaalikuva. Kaistojen nykyinen yleiskuva ei yksin selitä ajallista rakennetta.

Vuoden 2025 käytössä oleva premissi tuottaa lähteen lisäykselle tensorimuodon `Δg = κ(A⊗b + b⊗A + b⊗b)`. Geometriakuvassa nämä osat voidaan näyttää erikseen. Havaittava skalaari tai biologinen vaste piirretään vasta, kun projektio ja ehdollinen vasteoperaattori on nimetty. `χ_geo`:ta ei nimetä kudosherkkyydeksi.

**Muoto:** laskettu SVG-/canvas-esitys ja tavanomaiset ohjaimet. Piirretty koristeaalto ei välitä tarvittavaa laskennallista eroa.

## Seuraava toteutusvaihe

| Kohde | Havainnekuva | Mikä ymmärretään paremmin? |
|---|---|---|
| Testosteroni ja lisääntymiskaari | Anatominen säätelyakseli sekä hormonin tuotanto–kuljetus–reseptorivaste–toiminta | Veriarvo, paikallinen hormonitoiminta ja väestön syntyvyys ovat eri kohdissa ketjua. |
| Sentinellit ja magnetoreseptio | Sama elinympäristö linnun, pölyttäjän ja vedessä olevan eliön näkökulmasta | Paikka, aistit, vuorokauden-/vuodenaika ja kontaktireitti muuttavat sitä, mitä kukin eliö kohtaa. |
| Ekologia | Kukan ja pölyttäjän ajoitus → kohtaaminen → siementulos → seuraava sukupolvi | Solutason tai aistitason muutos tarvitsee näkyvän välitysvaiheen ekologiseen tulokseen. |
| Valaistus | Valaisimen optinen reitti ja sähköisen ajurin reitti erillisinä, samalla käyttöajalla | Sama laite tuottaa useita mitattavia ympäristömuutoksia. Nykyinen valaistuksen historia saa konkreettisen laitekuvan. |
| Käyttäytyminen ja sivilisaatio | Yksilöiden ajoitus/jakauma → pari → vuorovaikutusverkosto → väestö | Makrotulos syntyy nimettyjen aggregaatioiden ja viiveiden kautta. |
| Tutkimusnäytön kokonaiskuva | Nykyisestä kausaalirekisteristä korostettava reitti ja siihen liittyvät mittaukset | Lukija näkee, mihin osaan ketjua avattu tutkimus kohdistuu. Toteutetaan nykyisen kausaalikartan näkymänä. |
| Historialliset artikkelit | Valikoitu lähdekuva oikeasta laitteesta, asennuksesta tai ympäristöstä, ajoitettuna ja lähteistettynä | Aikakausien teknologiat muuttuvat konkreettisiksi. Kuvan käyttöoikeus ja dokumentaarinen luonne tarkistetaan hankintavaiheessa. |

## Yhteinen visuaalinen kieli

Kuvissa tarvitaan yhteinen tapa erottaa geometrinen johto, tuotu empiirinen biologia, BERM:n ehdollinen mekanismi ja avoin kalibrointi. Nykyisiä värejä ja väiterekisteriä käytetään pohjana. Merkitys ilmoitetaan myös sanoin tai viivatyypillä. Jokaiselle nuolelle ei tarvitse lisätä omaa pitkää varoitusta: yksi luettava selite ja valitun osan tarkennus riittävät.

Toinen, tästä erillinen merkintätapa kertoo kuvan tiedon lajin: havaintodata, laskettu tulos, historiallinen rekonstruktio tai käsitteellinen esimerkki. Näitä ei pidä sekoittaa yhden väriskaalan eri voimakkuuksiksi. Historiavaiheen väri, kentän mahdollinen fysikaalinen voimakkuus ja biologisen vasteen suuruus ovat eri asteikkoja.

Suositeltu toteutusjako:

- **Anatomia ja elinympäristö:** tarkistettu kuvitus, jonka nimet ja korostukset ovat erillisiä verkkosivun elementtejä.
- **Kausaaliset yhteydet, tensorit ja lähdereitit:** SVG/HTML; tekstit säilyvät käännettävinä ja luettavina.
- **Määrällinen muutos, signaali ja ennuste:** nykyisiin aineistoihin ja laskentaan sidottu kuvaaja.
- **Toimituksellinen pääkuva:** vain selvästi perusteltuun aloituskohtaan tai artikkeliin. Sitä ei käytetä laskennallisen tai anatomisen todistusaineiston asemassa.

BERM on mallin nimi ja vasteen tuottaja kaikissa näkymissä. FieldState esitetään tarvittaessa mittaus- ja estimointihaarana. Mittaustiedon kulku kohti estimaattia ja fyysisen tilan kausaalinen yhteys biologiseen vasteeseen saavat eri nuolityypit.

## Miten kokonaisuus pysyy luettavana

1. Kuvalla on yksi pääkysymys ja yksi lyhyt johtolause: mitä tästä kuvasta pitäisi huomata?
2. Peruskuva näkyy ilman säätimien avaamista. Lisätiedot ja vertailut avataan tarpeen mukaan.
3. Sama esimerkki ja sama nimistö jatkuvat ympäristöstä soluun ja kuvaajaan. Eri sivuille ei tehdä keskenään ristiriitaisia versioita.
4. Mobiilissa paneelit järjestyvät lukemisjärjestykseen. Tekstejä ei kutisteta leveän kuvan mukana tunnistamattomiksi.
5. Kuvaajaan liitetään lähde, yksikkö, rajaus ja laskentaperuste; havainnekuvaan tarkoitus ja tarvittavat yksinkertaistukset.
6. Animaatio auttaa vain, jos liike tai ajoitus on selitettävä asia. Lukija voi pysäyttää etenemisen ja lukea saman asian vaihekuvina.
7. Monimutkaiselle kuvalle tarjotaan lyhyt tunniste ja olennaisen sisällön tekstikuvaus; datakuvalle myös taulukko tai vastaava tietosisältö. Tämä vastaa [W3C:n monimutkaisten kuvien ohjetta](https://www.w3.org/WAI/tutorials/images/complex/). [Informatiivisen kuvan](https://www.w3.org/WAI/tutorials/images/informative/) kuvaus kertoo kuvan tehtävän; [koristeellinen kuva](https://www.w3.org/WAI/tutorials/images/decorative/) ei lisää lukijalle tarpeetonta sisältöä.

## Tuotannon järjestys ja hyväksymisperuste

Ensimmäiseksi suunnitellaan kolme yhteistä kuvapohjaa: **lähteet elinympäristössä**, **elimistöstä soluun** ja **kahden koeasetelman vertailu**. Samalla tehdään nykyiseen atlakseen lyhyt kuvien lukemisohje. Näillä katetaan useita keskeisiä sivuja ilman suurta määrää uusia komponentteja.

Toiseksi lisätään vuosivalintaan sidottu historiatilanne ja nykyisiin laskentakomponentteihin perustuva signaali-/muistiesimerkki. Kolmanneksi laajennetaan anatomiaa, ekologisia kohtaamisia ja yksilöstä väestöön eteneviä kuvia.

Ennen tuotantokuvaa kirjoitetaan sen pääkysymys, lähteet, tiedon laji, 3–6 nimettävää osaa ja mobiilin lukujärjestys. Luonnos tarkistetaan näitä vasten. Havaittavan suureen käyrät tulevat samasta laskennasta kuin muu sivu; selitysdiagrammin solmut ja reittiviittaukset nykyisestä mallirekisteristä.

Hyöty kannattaa varmistaa lyhyellä käyttäjäkokeella: pystyykö ensimmäistä kertaa sivulle tuleva lukija kuvan jälkeen osoittamaan lähteen ja vastaanottimen, erottamaan mitatun ja mallinnetun tiedon, selittämään historian merkityksen sekä löytämään väitteen lähteen? Pelkkä miellyttäväksi arvioitu ulkoasu ei vielä osoita havainnollistuksen onnistumista.

## Toimitus

Tämä arvio ei muuttanut sivuston kuvia, komponentteja, mekanismiväitteitä tai julkaisua.

Auditoinnin jälkeen tehty ensimmäinen kuvituskokonaisuus on kuvattu erikseen: [toteutus ja tarkistukset](TOTEUTUS.md).

- [Reitti- ja kuvatiedostoinventaario](reitti_ja_kuvainventaario.json)
- [Fysiikan ja mittauksen seitsemän sijoituskohtaa](fysiikka_ja_mittaus.md)
- [Ekologian ja aggregaation kuusi sijoituskohtaa](ekologia_ja_aggregaatio.md)
- [Biologian ja hormonitoiminnan sijoituskohdat](biologia_ja_hormonit.md)
