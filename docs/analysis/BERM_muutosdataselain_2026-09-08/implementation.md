# Muutosatlas ja viiden maan kenttärekonstruktio — toteutus

8.9.2026. Nykyinen paikallinen toteutus reitillä `/fi/explore` ja vastaavissa kielireiteissä. Tämä päivitys lisää määrälliset teknologiasarjat, niiden lähdeperhekohtaisen selaimen ja tilastoista muuttuvat BERM-skenaarion syötteet aiemman viiden maan atlaksen päälle. Julkaisu julkiselle palvelulle on erillinen vaihe. Tämän laajennuksen tuotantokoonti, kohdennetut testit ja tuotantoselaimen tarkistus on tehty. Koko sivuston testiajon erillinen avoin kohta on kirjattu laadunvarmistukseen.

## Käyttäjän polku

Aloitus kysyy tarkasteltavan ilmiön ja maan. Seitsemän yhteistä näkymää ovat muutos, maavertailu, ikäkohtainen syntyvyys, tapahtuma-aika, kenttärekonstruktio, BERM-skenaario ja aineistot. Alue, vuodet, suure, indeksointi, tapahtuma, teknologiapaneelin perhevalinta ja skenaarion parametrit säilyvät osoitteessa. Vanhoihin erikoistyökaluihin pääsee erillisestä valikosta; niiden aineistoja ei yhdistetä uuteen havaintokerrokseen.

Teknologian, testosteronin ja sentinellien sivuilta pääsee valmiiksi rajattuun atlakseen. `/data` avaa aineistot ja `/explorer` säilyttää kaikkien maiden alkuperäispaneelin. Viiden maan vertailussa kaikki kuvat käyttävät saman suureen yhteistä asteikkoa. Jos yhteistä indeksivuotta ei voida käyttää kaikissa maissa, koko vertailu säilyttää alkuperäiset yksiköt.

## Käytössä oleva aineisto

Viisi maata ovat Suomi, Yhdysvallat, Yhdistynyt kuningaskunta, Saksa ja Japani. Aineistot koostetaan sovelluksessa kahdesta erikseen toistettavasta rekisteristä:

| Aineistokerros | Sarjoja | Lähdepisteitä | Lähdetietueita |
|---|---:|---:|---:|
| Alkuperäinen `change-atlas.json` | 50 | 3 339 | 6 |
| Koko uusi `technology-drivers.json` | 32 | 799 | 17 |
| Teknologialisäys viidelle atlasmaalle | 30 | 796 | 15 |
| Sovelluksen yhdistetty muutosatlas | **80** | **4 135** | **21** |

Luvut on tarkistettu paikallisista rekistereistä tämän päivityksen yhteydessä. Koko teknologiarekisterin kaksi muuta sarjaa koskevat Ranskan Linky-mittareita ja maailman ilmastointilaitekantaa. Ne säilyvät oikeilla aluerajauksillaan erillisessä teknologia-API:ssa, mutta eivät siirry viiden maan atlasaineistoon. Niiden CRE- ja IEA-lähteet eivät myöskään sisälly yhdistetyn atlaksen 21 lähteeseen. Mobiililiittymien alkuperäistä kokonaismääräsarjaa ei monisteta uuteen rekisteriin.

Alkuperäisen 50 sarjan pohja sisältää:

- WPP 2024:n historialliset TFR- ja seitsemän ikäryhmän ASFR-estimaatit 1950–2023 kaikille viidelle maalle;
- ITU / World Bankin raportoimat mobiililiittymät, ilman itse täytettyjä välivuosia;
- CDC:n kaksi diabeteksen prevalenssisarjaa, yhteensä 22 tutkimusjaksoestimaattia ja niiden 95 % luottamusvälit;
- UKBMS:n kaksi lajisarjaa, yhteensä 98 alkuperäistä vuosiarvoa 1976–2024; yhteisen näkymän loppu on 2023;
- Nyante ym. -tutkimuksen kaksi laajasti vakioitua NHANES-testosteroniestimaattia, jaksot 1988–1991 ja 1999–2004, alkuperäisine luottamusväleineen.

Testosteroniparia ei esitetä raakamuotoisena kansallisena laskukäyränä. Vakiointijoukko ja sen tulkinta ovat sarjan nimessä ja lähdetiedoissa. Aiemmat interpoloidut, ekstrapoloidut tai käsin ankkuroidut hormonisarjat eivät siirry havaintorekisteriin. Biologisen tilan näkymä sisältää sekä hormoni- että diabetesaineiston.

UKBMS:n alkuperäinen log10-indeksi säilyy rekisterissä. Näytön oletusmuunnos on `100 × 10^(arvo − vuoden 1976 arvo)`. Molemmilla lajeilla on sama pystyakseli. CSV erottaa lähdearvon ja näyttöarvon. Seurantapaikkojen määrä ei muutu yksilömääräksi.

Monivuotinen arvio esitetään keruujaksona ja epävarmuusjanana; sitä ei yhdistetä vuosiviivaksi. Osittain rajauksen ulkopuolelle jäävät tutkimusjaksot jätetään kyseisestä rajauksesta pois. Vuosiviiva yhdistää vain peräkkäiset vuodet. Puuttuva arvo ja puuttuva epävarmuus eivät tarkoita nollaa.

Pohja-aineiston tarkat lähteet, poiminnat ja tarkistussummat: [data_integration.md](data_integration.md).

### Määrällinen teknologiahistoria

Uudet sarjat tuovat mukaan sähkön kulutuksen ja tuotannon, radio- ja televisiovastaanottimien omistuksen, kaupalliset televisioasemat, mittarikannat sekä erillisiä historiallisia määräankkureita. Kaikille viidelle maalle on World Bankin / IEA:n sama asukaskohtaisen sähkönkulutuksen indikaattori 1990–2024. Kansalliset lähteet pidentävät historiaa eri tavoin: Suomen kokonaiskulutus alkaa 1960, USA:n asuinsektorin sähkömyynti 1949 ja Britannian tuotantotilasto 1920. Rekisterissä on 184 havaintoa ennen vuotta 1970. Käyttöliittymän yhteinen loppuvuosi on edelleen 2023; lähteen vuoden 2024 pisteitä ei poisteta rekisteristä.

Lähteiden yksiköt ja rajaukset säilyvät. Kansallinen kokonaiskulutus, kotitaloussektorin myynti ja asukaskohtainen kulutus ovat eri suureita. Britannian ennen vuotta 1951 vain Ison-Britannian kattava tuotantotilasto on erillinen myöhemmästä sarjasta. Japanin kaupunkien ei-maatalouskotitalouksien vanhin otos ei yhdisty myöhempään laajempaan otokseen; mustavalko- ja väritelevisioita ei summata yhdeksi omistusosuudeksi. Saksan vuosien 1962, 1969 ja 1973 radio-/TV-pisteet koskevat historiallista Länsi-Saksaa lähteen kotitalousrajauksin.

USA:n AMI- ja AMR-mittarit ovat eri sarjoja, joilla on kunkin vuoden oma kaikkien mittarien nimittäjä. Britannian älytilassa toimivat sähkömittarit ja kumulatiiviset asennukset eivät ole sama muuttuja. TEPCOn 28,4 miljoonan mittarin havainto sijoittuu maaliskuuhun 2021, eikä käyttöönottojakson alkuun 2014. Ilmastointilaitteen omistus ei tunnista invertteritekniikkaa, joten näille sarjoille ei ole asetettu oletusarvoista kenttämoodin muunnosta.

Primäärilähteet, täsmälliset ajankohdat, perusjoukkokatkot, jäädytetyt tiedostot ja verkkoyhteydetön uusintatuotanto: [technology_drivers/README.md](technology_drivers/README.md). Lähteen oma tilastollinen estimaatti voi olla `status: estimate` ja samalla `imputed: false`: sisäänluku ei ole täyttänyt välivuosia.

## Teknologiasarjojen paneeli

`TechnologyDriverPanel` näkyy kaikissa Muutos-näkymän tutkimuskysymyksissä sekä kenttärekonstruktion yhteydessä. Teknologinen ympäristö ei näin riipu pelkästä mobiililiittymäkäyrästä. Oletuksena avautuu sähköverkko, jos sillä on pisteitä valitussa ajassa; muuten käytetään ensimmäistä saatavilla olevaa perhettä. Perhevalitsin avaa myös kaikki sarjat. Mobiilin kaikkien sukupolvien kokonaismäärä muodostaa oman ryhmänsä, eikä täytä 1G–5G-perheiden sukupolvikohtaisia aukkoja.

Sarjat käyttävät samaa kalenteriakselia ja vuosikohdistinta sekä omia alkuperäisyksiköitään. Jokaisen sarjan yhteydessä näkyvät alue/perusjoukko ja lähdelinkki. Avattava taulukko säilyttää lähdepisteet, mahdollisen epävarmuuden, nimittäjän, menetelmän ja tarkan lähdekohdan. Peräkkäiset vuosihavainnot yhdistetään yhtenäisellä viivalla. Erillinen kytkin lisää harvojen pisteiden väliin katkoviivalla lineaarisen rekonstruktion. Se ei ekstrapoloi ensimmäisen tai viimeisen pisteen yli, lisää havaintopisteitä tai tuota puuttuvalle arvolle nollaa.

Kolmentoista perheen kattavuustaulukko käyttää valittua maata ja aikarajausta. Luokat ovat aikasarja, pisteankkurit, vain historia ja avoin. Aikasarjaksi luokittelu edellyttää saman sarjan vähintään kolmea havaintovuotta ja yhtä peräkkäistä vuosiparia; se ei tarkoita aukotonta tai fysikaalisen altistuksen kattavaa mittausta. Taulukon perhevalinta avaa sarjat tai sen historiaperusteet. Valinnat tallentuvat URL-parametreihin `t_family` ja `t_interpolate`; muita osoitteen valintoja ei poisteta.

## Kenttäympäristön historia

Kenttärekonstruktio sisältää 13 lähdeperhettä, 65 maa–perherataa, 93 lähdeankkuria, 133 historiallista vaihetta ja 54 lähdettä. Niistä 39 täydentää aiempaa teknologiarekisteriä ja 15 käyttää sen kanonisia lähteitä. Kaksitoista rataa on vielä kokonaan avoimia, ja kaikissa radoissa on näkyvä kattavuusrajaus.

Perheitä ovat sähköverkot, radio, antennitelevisio, analoginen mobiili, 2G–5G, valaistuksen elektroniset ajurit, kommunikoivat mittarit, tehomuuntimet, Wi-Fi ja pientaajuinen radionavigointi. Tämä tarkennettu 13 perheen esimerkkimaarekonstruktio ei korvaa sivuston laajempaa 45 teknologiaperheen luetteloa.

Väri kertoo nimettyä historian vaihetta. Se ei koodaa kenttävoimakkuutta tai biologista vaikutusta. Valitusta lähteestä avautuvat taajuudet, aaltomuoto, käyttörytmi, spatiaalinen rajaus, tapahtumat ja alkuperäislähteet. Avoin historia näkyy erikseen. Dokumentoitu avaus, käyttöä osoittava havainto ja markkinasäädös säilyvät eri tietueina.

Esimerkiksi Britannian television sotakatko, analogiverkkojen loput, Suomen NMT-450:n sulkeminen vuoden 2002 lopussa ja osittaiset 3G-sulkemisvuodet säilyvät rekonstruktiossa. Käyttöikkunat yhdistetään vain vierekkäisistä toiminta-/omaksumisjaksoista. Aukkoja, säädösjaksoja ja suljettuja vaiheita ei yhdistetä. Historiakattavuuden loppu ei ole automaattisesti sulkeminen.

Tapahtuma-ajassa jokaisen maan nollavuodesta voi avata sen täsmällisen lähderajauksen. Käyttöä dokumentoivan tilaston vuotta ei kutsuta maan ensimmäisen verkon avaamiseksi.

Johdot, maakohtaiset rajaukset, lähteet ja aineistoaukot: [field_reconstruction.md](field_reconstruction.md).

## BERM:n ehdollinen laskelma

Laskenta alkaa vuoden 2025 premissistä `g = η + κ A⊗A`, taustan ja lähteiden summasta sekä sen täsmällisestä ulkotulon avauksesta. Käyttöjaksojen lukumäärää tai liittymätiheyttä ei käytetä tensoriristiterminä.

Skenaariossa käyttäjä asettaa normalisoitujen potentiaalimoodien amplitudit ja suunnat, taustan, keskiarvo-osuuden ja tehollisten moodien korrelaation. Näistä lasketaan eksplisiittinen `E[e^μ e^ν Δg_μν]`-projektio. Oletettu kovarianssi on positiivisesti semidefiniitti. Riippumattomilla nollakeskiarvoisilla moodeilla keskimääräiset ristiter­mit häviävät, vaikka lähteet olisivat samanaikaisia. Amplitudit eivät ole historiallisesta aineistosta tunnistettuja kenttäannoksia.

### Tilastoista lähdekohtaisiksi profiileiksi

Oletustila käyttää nyt tilastoista muuttuvia lähdeprofiileja. Saman yleisen nousurampin aloittaminen ensimmäisestä asennuksesta jää erikseen valittavaksi aiemmaksi ajoitusskenaarioksi. Datatilassa valitaan yksi mittari kustakin lähdeperheestä; vaihtoehtoisia mittareita ei lasketa yhteen. Mobiilin kokonaismäärä ja saatavilla olevat sukupolvitiedot ovat vaihtoehtoisia esityksiä.

Yhden havaintovuoden indikaattori säilyy lähdeaineistossa ja valitsimessa, mutta on oletuksena pois BERM-laskennasta: yksi kattavuusluku ei määritä yleistymishistoriaa. Käyttäjä voi ottaa sen erikseen mukaan perhekohtaisella valinnalla (`s_single_<perhe>=1`). Sen arvon jatkaminen havaintovuoden ulkopuolelle on silloin erikseen näkyvä pitämisoletus. Myös kaikkien lähteiden vertailulaskelma säilyttää tämän poissulun, kunnes yksittäisankkuri on otettu mukaan.

Lähdearvosta `x` muodostetaan normalisoitu `z` jakamalla prosenttiluku sadalla, käyttämällä oman havaintovuoden nimittäjää tai jakamalla nimetyllä yhteisellä vertailuarvolla. Tämän jälkeen käyttäjä valitsee kenttämoodin muunnokseksi `q = z` tai oletusarvoisen `q = √z`. Neliöjuurimuunnos olettaa, että moodin oma neliötermi seuraa lähdesuuretta. Molemmat ovat ehdollisia muunnoksia; paikallinen potentiaali ei tule mitatuksi kummallakaan. Erilliset perhekohtaiset amplitudi `b` ja suunta määräävät skenaariossa oletetun kytkennän. Perheiden nimi, tilastollinen peitto ja vastaanotinmäärä eivät yksin määritä näitä parametreja.

Havaintojen välille valitaan tasainen muutos (`linear`), muutos aikaisin (`early`, seuraavan pisteen arvo välivuosille) tai muutos myöhään (`late`, edellisen pisteen arvo). Lähteen määrä rekonstruoidaan ennen mahdollista neliöjuurimuunnosta. Kolmen ajoitusvaihtoehdon varjostus on oletusvaihtelu, ei luottamusväli eikä koko ketjun epävarmuusväli. Se ei kata puuttuvia lähteitä, paikallista kenttämuunnosta tai biologista herkkyyttä.

Maakohtaisten laajojen historioiden rinnalla on yhteisen mittariston valinta: kaikissa maissa sama World Bankin / IEA:n asukaskohtainen sähkönkulutus ja mobiililiittymien kokonaismäärä. Se yhdenmukaistaa suureiden määritelmät ja supistaa teknologista kattavuutta. Laajassa tilassa esimerkiksi Suomen kokonaiskulutus ja USA:n asuinsektorin sähkömyynti voivat olla ajallisia syötteitä, mutta niiden tasoista ei seuraa maiden mitatun altistuksen järjestystä. Oletusvalinnat ovat dataprofiilit, tasainen välivuosimuutos, neliöjuurimuunnos, reuna-arvon pitäminen ja laajat maakohtaiset historiat.

### Ajallinen kattavuus ja puuttuva syöte

Laskennan lähdekomponentit rajataan nimettyihin historiallisiin käyttöjaksoihin tai, jos niitä ei ole, sarjan omaan havaintojaksoon. Kattavuusrajan alku tai loppu ei tällöin määritä teknologian todellista käyttöönottoa tai sulkemista. Rajauksen ulkopuolinen komponentti jää tämän osalaskelman ulkopuolelle; se ei väitä lähteen fysikaalista nollatasoa. Muistiydin voi jatkaa aiemmin mukana olleen komponentin vastetta.

Lähdetilaston ulkopuolelle ulottuville vuosille käyttäjä valitsee näkyvän reuna-arvon pitämisoletuksen (`hold`) tai avoimen tiedon (`unknown`). Pitämisoletus toimii komponentin ajallisen rajauksen sisällä, eikä muuta pidettyä lukua havainnoksi. Avoimessa tilassa laskennan tai muistiytimen vaatima puuttuva profiilivuosi estää täyttä kattavuutta edellyttävän laskelman ja avaa korjattavat valinnat. Nimettyä sisäistä kattavuusaukkoa ei täytetä reuna-arvon pidolla. Historiallisia käyttökatkoja ei yhdistetä yhdeksi jatkuvaksi toiminnaksi. Kuvaukset ja viennit säilyttävät lähteen havaintovuodet, ajallisen rajauksen, normalisoinnin ja kattavuustiedot.

### Biologinen sulku ja ikäryhmistä aggregointi

Valittu retardoitu ydin keskiarvoistaa tuen `lag … lag + memory` molemmat päät mukaan lukien. Siten muistin lisäpituus 5 tarkoittaa kuutta vuosinäytettä. Vasteesta vähennetään valitun vertailuvuoden vaste. Biologinen sulku käyttää kerrointa `exp(−β ΔR)` kaikille ikäkohtaisille syntyvyysluvuille, muun vastaanotin-, pari-, käyttäytymis- ja ajoitustilan pysyessä vakiona.

Ikäryhmäjatko käyttää täsmälleen vertailuvuoden alkuperäisiä ASFR-estimaatteja, kertoo jokaisen samalla skenaariokertoimella ja summaa seitsemän 15–49-vuotiaiden ryhmää: `TFR_15–49 = 5 × Σ ASFR_a / 1000`. Puuttuvaa vertailuvuotta ei korvata lähivuodella eikä puuttuvien ikäryhmien summaa skaalata täydeksi. Vajaa lähtöaineisto jättää summan avoimeksi. Näin laskettu ehdollinen ASFR-summa säilyy erillään WPP:n erikseen julkaistusta TFR-estimaatista. Käyrää ei soviteta myöhempään havaittuun TFR:ään eikä välissä väitetä mitattua hormonimuutosta.

Kuva näyttää valitut lähteet, kaikkien saatavilla olevien lähteiden vertailun, saman parametrivalinnan viidessä maassa ja erillisen havaitun TFR-sarjan. Lähteen poistamisen herkkyystarkastelu laskee vaihtoehdon koko historian ja vertailuvuoden yli. Näiden erojen summaa ei esitetä kokonaisvaikutuksena, koska lähteillä voi olla ristitermejä. Geometrisen projektion omat, taustan ja lähteiden väliset termit avautuvat laskentakuvauksen yhteydessä. Vasteen etumerkki on käyttäjän parametri. Numeerisen alueen ylittävä valinta saa näkyvän virheen; arvoja ei katkaista biologiseksi ylärajaksi.

Gauge, fysikaalinen kytkentäasteikko, kudosytimet ja ihmisen päätepistekalibrointi säilyvät avoimina. FieldState voi tuottaa fysikaalisen syötteen, mutta operaattori ja ennuste kuuluvat BERM:iin. Osatutkimukset rajaavat omia biologisia siirtymiään; niiden evidenssiä ei siirretä geometrisen premissin vahvistukseksi.

## Vienti ja tarkistettavuus

CSV sisältää valitun näkymän pisteet, alkuperäiset arvot ja yksiköt, näyttömuunnokset, tutkimusjaksot, epävarmuuden, lähdepaikantimen ja aineistoversion. Tapahtuma-ajassa vienti rajautuu kunkin maan omaan tapahtumaikkunaan ja sisältää sekä kalenterivuoden että suhteellisen ajan. Skenaarion laskelma viedään erikseen parametreineen; sitä ei merkitä havainnoksi.

Teknologiapaneelin omat CSV- ja JSON-painikkeet vievät valitun perheen ja aikarajauksen alkuperäispisteet, yksiköt, nimittäjät, alueet ja tarkat lähdekohdat. Piirron rekonstruktiota ei tallenneta lähdehavainnoiksi. Yhteinen vienti huomioi myös paneelin perhevalinnan. Skenaarion erillinen CSV sisältää maiden syötteet, parametrit, kattavuuden, ASFR-luvut ja 15–49-vuotiaiden ehdollisen TFR-summan. Epäonnistuneesta maasta säilytetään unavailable-rivi ja virhesyy tyhjillä numeerisilla kentillä. Myös nykymaan laskentarajalla JSON sisältää lähteet, parametrit, tilan ja virhesyyn. Yksipisteisen lähteen erillinen mukaanotto sekä kaikkien lähteiden vertailun todelliset syötteet tallentuvat metadataan.

JSON tallentaa näkymän valinnat, lähteet ja laskentaoletukset. SVG/PNG-vienti käyttää näkyviä kuvaajia ja ratkaistuja teemavärejä. Suljettujen lisätietojen kuvaajat eivät siirry kuvaan. Lähteet, asetukset ja oletukset näkyvät kuvassa; SVG sisältää lisäksi täydet metatiedot. Kuvan teknologiasarja voi olla rekonstruoitu vain valitun kytkimen mukaisesti, ja havaintojen sekä skenaarioiden semantiikka säilyy metatiedoissa.

API-reitit ovat `/api/change-atlas` (yhdistetty 80 sarjan atlas), `/api/technology-drivers` (koko 32 sarjan teknologiarekisteri alkuperäisine aluerajauksineen) ja `/api/field-reconstruction` (nimetyt historiavaiheet ja lähteet). Havaintokerroksen yhdistäminen tapahtuu kirjastossa; alkuperäinen 50 sarjan pohjatiedosto ja teknologialisäys säilyvät erillisinä, toistettavina lähteittäistuonteina.

## Seuraava empiirinen tarkennus

Tämä versio mahdollistaa useiden lähdeperheiden määrällisten historioiden, havaittujen muutosten ja ehdollisten BERM-oletusten yhteisen tarkastelun. Kolmetoista perhettä ei silti ole määrällisesti katettu: asennettu valaistusjakauma, hakkuri-/invertteriosuus, Wi-Fi:n käyttö, radionavigoinnin lähetysteho ja mobiilisukupolvien todellinen käyttö odottavat lisäaineistoa. Saksan varhainen sähkökuorma, Japanin ennen vuotta 1990 oleva kansallinen kuorma sekä Suomen ennen vuotta 1960 oleva kuorma ja varhainen vastaanotinhistoria jäävät rajatuiksi.

Seuraavat kytkennät ovat paikalliset kenttä-/virta-/spektrimittaukset, operaattori- ja sukupolvikohtainen käyttöaste, harmonisoidut hormoniaineistot, HFD-kohortit ja paikallisten sentinellien toistuvat havainnot. Niillä rajataan historiallisia kenttäparametreja ja biologisia siirtymiä erikseen ennen koko ketjun vaikutuskoon kalibrointia.

## Laadunvarmistus

Lopputarkistus 8.9.2026:

- Atlaslaajennuksen 165 testiä / 11 tiedostoa läpäisty lopullisesta koodista. Mukana profiilien ajoitus ja muunnos, käyttökatkot, puuttuva tieto, yhden pisteen erillinen mukaanotto, ASFR-summa, lähteen poistaminen, viennit sekä maa- ja skenaariovalintojen säilyminen ennen reitittimen seuraavaa piirtoa. Kuormitetun työaseman lopputarkistuksessa käytettiin yhtä testityöntekijää ja 20 sekunnin tapauskohtaista aikarajaa.
- Pythonin arkkitehtuuri- ja teknologiahistoriasopimukset: 43/43 läpäisty. Rinnakkaisen steroidogeneesilaajennuksen kahdeksas klusteri lisättiin myös täsmällisen tunnusjoukon testiodotukseen; BERM/FieldState-työnjako ja ristiin tarkistettava arkkitehtuuri säilyvät.
- Molemmat aineistotuottajat toistavat nykyiset rekisterit verkkoyhteydettömällä `--check`-ajolla. API palauttaa 80/4 135/21-koosteen; erillinen teknologiarekisteri palauttaa 32/799/17.
- `npm run build` läpäisty kaikkine esivaiheineen: viite- ja rekisteritarkistus, TypeScript ja tiukka ESLint. HTML-tarkistus kattoi 557 reittiä: ei raakoja viitetunnisteita, tyhjiä elementtejä eikä tyhjiä linkkejä. Hakuhakemistot tuotettiin kaikille viidelle kielelle.
- Tuotantopalvelin käynnistettiin uudelleen porttiin 3011. Selaimessa vahvistettu uusi teknologiapaneeli, lähdeprofiileista laskettu BERM-skenaario (viisi maata), yksipisteisen lähteen oletuspoissulku, tarkka ikäryhmäjatko, avoimen historian virhe ja sen JSON-vienti sekä SVG/PNG-viennit. 390 pikselin näkymässä ei vaakaylivuotoa. Kehitysesikatselussa tarkistettiin lisäksi radiohistorian katkoviivat ja sähkömittarin yhteinen pystyakseli viiden maan vertailussa.
- Koko sivuston viimeisessä yhteisessä ajossa 722/723 testiä läpäisi. Yksi rinnakkaiseen `SteroidogenesisEvidenceExplorer`-työhön kuuluva tekstilöydön testi epäonnistui; tämä ei ole atlaslaajennuksen testi. Sitä ei piilotettu eikä muutettu tässä työssä. Aiemman ajon samanaikaisista rekisterimuutoksista syntyneet neljä epäonnistumista läpäisivät uusinta-ajossa; hakutesti ja atlaksen kuormitusaikakatkaisu läpäisivät kohdennetut uusinta-ajot.

Selaimen nopeiden peräkkäisten valintojen korjaus lukee uuden osoitetilan suoraan nykyisestä URL:stä. Maan vaihtaminen, parametrin muuttaminen, kahden lähteen poistaminen ja skenaarion palautus säilyttävät toisensa sekä nykyisen polun ja ankkurin. Paikallisia rinnakkaisia esikatseluja varten `BERM_NEXT_DIST_DIR` voi erottaa Next-välimuistin; `.next-drivers` ohitetaan versionhallinnassa ja lintissä. Rinnakkaisen sivupäivityksen yksi vanhan viitetunnuksen kirjainkokoon liittynyt muotoilu korjattiin käyttämään sen jo rekisteröityä alias-tunnusta.

Aiemmat osatarkistukset:

- Teknologiapaneelin 14 kohdennettua testiä läpäisty: lähdeperhevalinta, URL-tila, yhteinen aika-akseli, puuttuvat vuodet, rajattu lineaarinen rekonstruktio, alkuperäinen nimittäjä, CSV/JSON ja suomen-/englanninkielisen SVG:n hydraatio. Komponentin ja testien ESLint läpäisty; kehitysvaiheen TypeScript-tarkistus läpäisty.
- Teknologia-aineiston tekijän lopputarkistuksessa verkkoyhteydetön `--check`, 11 rekisteritestiä, 19 atlasadapterin testiä sekä oman kirjaston ja testien ESLint läpäisty. Python-tuottajien syntaksi ja lähdeartifactien todelliset SHA-256-tunnisteet tarkistettu. Tarkempi tarkastusjälki on [teknologia-aineiston muistiossa](technology_drivers/README.md).
- Tässä dokumentointipäivityksessä 32/799/17-, 30/796/15- ja 80/4 135/21-luvut sekä 13 perhettä ja 93 ankkuria laskettiin rekistereistä. Julkaisu- tai selaintarkistuksen valmistumista ei päätellä näistä määristä.

### Aiemman toteutusvaiheen tarkistus

Ennen määrällisten teknologiasarjojen ja dataprofiilien laajennusta viiden maan perusatlas läpäisi 645 sivustotestiä, 43 Pythonin arkkitehtuuri-/historiasopimustestiä sekä tuotanto- ja selaintarkistukset. Nämä ovat aiemman version tarkistusjälki; ne eivät ole tämän laajennuksen lopullinen testitulos. Myös aiemmat 552 reitin HTML-tarkistus, mobiilileveyksien katselmus ja kuvavientikokeet koskevat tätä aiempaa versiota.

Tämä dokumentti kuvaa paikallista toteutusta. Sivuston ennestään olevat DKC-rekisterin varoitukset eivät ole muutosatlaksen empiirisen kalibroinnin tai koko DKC-ketjun hyväksyntä.
