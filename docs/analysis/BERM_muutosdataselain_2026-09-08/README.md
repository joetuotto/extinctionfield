# BERM:n muutosatlas ja dataselaimen uudistus

8.9.2026. Viiden maan muutosatlaksen nykyinen toteutus, sitä perusteleva tutkimus ja alkuperäinen suunnittelumuistio. Uusin laajennus kalibroi TFR:n ja valitun testosteronisarjan ehdolliset BERM-käyrät rajattuun havaintoaineistoon ja näyttää niiden vuotuisen sekä kertyneen syötehistorian. Määrällinen teknologiahistoria muodostaa laskelman ajallisen lähdekerroksen. Toteutus on paikallisessa verkkosovelluksessa; tämän kalibrointikierroksen lopullinen laadunvarmistus täydennetään pääajon jälkeen.

## Toteutustilanne

Muutosatlas toimii reitillä `/fi/explore` ja vastaavilla kielireiteillä. Yhteiset näkymät ovat muutos, maavertailu, ikäkohtainen syntyvyys, tapahtuma-aika, kenttärekonstruktio, BERM-skenaario ja aineistot. Suomi, Yhdysvallat, Yhdistynyt kuningaskunta, Saksa ja Japani käyttävät samaa kalenterivalintaa; eri mittareiden yksiköt, perusjoukot ja tutkimusjaksot säilyvät.

| Kokonaisuus | Nykyinen sisältö |
|---|---|
| Alkuperäinen havaintopohja | 50 sarjaa, 3 339 pistettä, 6 lähdettä: WPP:n TFR/ASFR, mobiililiittymät, CDC:n diabetes, UKBMS:n kaksi lajia ja NHANES-testosteronipari |
| Uusi määrällinen teknologiarekisteri | 32 sarjaa, 799 pistettä, 17 lähdettä; erillinen ja toistettava sisäänluku |
| Teknologialisäys viidelle atlasmaalle | 30 sarjaa, 796 pistettä, 15 lähdettä |
| Uudet testosteronihavainnot | 3 sarjaa, 9 alkuperäistaulukon arvoa, 2 lähdettä |
| Yhdistetty atlas | **83 sarjaa, 4 144 lähdepistettä, 23 lähdettä** |
| Historiallinen lähdeympäristö | 13 perhettä, 65 maa–perherataa, 93 ankkuria ja 133 historiallista vaihetta |

Ranskan Linky ja maailman ilmastointilaitekanta jäävät viiden maan atlasrajauksen ulkopuolelle, mutta säilyvät koko teknologiarekisterissä alkuperäisillä alueillaan. Mobiilin kokonaismäärä säilyy alkuperäisessä pohja-aineistossa eikä monistu sukupolvikohtaisiksi havainnoiksi. Rekisterien sarja-, piste- ja lähdemäärät on tarkistettu tämän dokumentointipäivityksen yhteydessä.

Tarkka nykytilan kuvaus: [toteutus ja laadunvarmistus](implementation.md). Alkuperäissarjojen ja teknologiahistorian toistettavat poiminnat: [havaintopohjan sisäänluku](data_integration.md), [määrällinen teknologiahistoria](technology_drivers/README.md) ja [historiallinen kenttärekonstruktio](field_reconstruction.md).

## Testosteroni ja kalibroitu vuotuinen/kertynyt ennuste

Muutos-näkymä näyttää valittavan testosteronin tutkimusryhmän TFR:n rinnalla. Suomessa mukana ovat FINRISK 60–69- ja 25–29-vuotiaiden mediaanit; USA:ssa viiden NHANES-jakson 15–39-vuotiaiden keskiarvot sekä aiempi laajasti vakioitu sarja. Ennustekytkimen oletus sovittaa yhden etumerkillisen vastekertoimen kullekin sarjalle ja kanavavaihtoehdolle: vuotuinen, kertynyt tai niiden ennalta painotettu summa. Lähde- ja ydinoletukset kiinnitetään viitelaskentaan. Sovitetut β ja `logScale` pysyvät lukittuina käyttäjän muuttaessa syötteitä; uudelleenkalibrointi on erillinen valinta.

TFR:n oletussovitus käyttää vuosia 1950–2000 (51 havaintoa); vuodet 2001–2023 (23 havaintoa) jäävät myöhempään vertailuun. Lähtötaso tulee täsmällisen vuoden seitsemän ASFR-ikäryhmän 15–49-vuotiaiden summasta. Suomen 60–69-vuotiaiden kaksi mediaania tuottavat oletusviitteen yhdistelmäkanavalle β:n noin 5,83224754, mutta eivät jätä riippumatonta vertailuhavaintoa. Nuoremman Suomen ryhmän yhdistetty varhainen mediaani ei sovi nykyiseen aggregointiin, joten yksi hyväksytty piste ei riitä kalibrointiin. Nuorten USA-sarjan kalibrointi rajautuu yhteisellä menetelmäasteikolla oleviin jaksoihin 2013–2014 ja 2015–2016; kaikki viisi alkuperäisjaksoa säilyvät havaintonäkymässä.

Vuosittaiset `G`, `U` ja `C` näyttävät geometrian, viiveellisen syötteen ja säilyvän kertymän kehityksen. Historiaintegraatio alkaa aina vuodesta 1880, vaikka näyttö rajataan myöhempiin vuosiin. Muut vastaanotintilan muuttujat pysyvät kiinteinä tai avoimina oletuksina. Päätepistekerrointen kalibrointi ei identifioi paikallista kenttää, kudosydintä tai kausaalista vaikutusta.

Tarkka nykyinen menetelmä, aineistorajaukset ja vienti: [ehdollinen päätepistekalibrointi](endpoint_calibration.md). Aiempi käsin asetettava sulku säilyy valinnalla `ep_fit=manual`: [vuotuinen ja kertynyt BERM-ennuste](endpoint_implementation.md). Hormonisarjojen lähteet ja offline-toisto: [testosteroniaineisto](testosterone_trends/README.md).

Viimeinen koko sivuston tarkistus: **871/871 testiä**, tuotantokoonti, 557 sivun HTML-tarkistus sekä paikallisen tuotantonäkymän mobiili- ja vientitarkistukset läpäisivät. Tarkka rajaus ja kalibroinnin esimerkkitulokset ovat [kalibrointimuistiossa](endpoint_calibration.md#varmennettu-lopputulos-892026).

## Määrällinen teknologiahistoria

`TechnologyDriverPanel` avautuu kaikissa Muutos-näkymän tutkimuskysymyksissä ja kenttärekonstruktion yhteydessä. Sähköverkon sarjat ovat oletus, kun niitä on saatavilla valitussa ajassa. Perhevalitsin näyttää myös radion, television, mittarit, muut saatavilla olevat teknologiat tai kaikki sarjat samalla kertaa. Kattavuustaulukossa kaikki 13 perhettä luokitellaan valitun maan ja ajan mukaan: aikasarja, pisteankkurit, vain historia tai avoin.

Jokainen sarja näyttää oman yksikkönsä, alueensa, perusjoukkonsa ja alkuperäislähteensä. Raportoidut pisteet erottuvat valinnaisesta katkoviivarekonstruktiosta; ensimmäisen ja viimeisen lähdepisteen ulkopuolelle ei piirretä arvioita. Puuttuva havainto tai nimittäjä ei muutu nollaksi. Perhekohtainen CSV/JSON säilyttää alkuperäispisteet, nimittäjät ja lähdepaikantimet. `t_family` ja `t_interpolate` tallentavat näyttövalinnat jaettavaan URL:iin.

Määrällinen historia ulottuu nyt monessa perheessä mobiilikautta edeltävään aikaan. Esimerkiksi Britannian sähkötuotannossa on tietoja vuodesta 1920, USA:n asuinsektorin sähkömyynnissä vuodesta 1949 ja Suomen kokonaiskulutuksessa vuodesta 1960. USA:n radio-/TV-aineisto ja Saksan kolme historiallista omistuspistettä tuovat mukaan lähetysjärjestelmien eri mittareita. Yhteinen asukaskohtainen sähkönkulutus on saatavilla kaikille viidelle maalle vuosilta 1990–2024. Lähteen viimeinen vuosi voi olla 2024, vaikka käyttöliittymän yhteinen tarkastelu päättyy vuoteen 2023.

Näitä sarjoja ei yhdistetä näennäiseksi yhtenäiseksi annosmittariksi. Japanin vanhin kaupunkiotos ja myöhemmät perusjoukot ovat erillisiä sarjoja. Britannian alue- ja luokitusrajaukset, USA:n asuinsektorin myynnin rajaus sekä AMI-/AMR- ja kumulatiivisten/toimivien mittarien erot säilyvät lähdetiedoissa. Tarkat vuodet ja primäärilähteet on koottu [teknologia-aineiston muistioon](technology_drivers/README.md).

## BERM-laskelman nykyinen työnjako

Lähtökohta on vuoden 2025 `g = η + κ A⊗A`, missä `A = A₀ + Σaⱼ`. Taustan ja lähteiden ristiosat seuraavat ulkotulon avauksesta. Tilaston ja tämän potentiaalitilan väliin tarvitaan erillinen muunnos; teknologioiden lukumäärä tai käyttöaste ei sellaisenaan korvaa tensoritermejä. BERM:n ehdollisen vasteoperaattorin fysikaalinen mittakaava, gauge-preskriptio, kudosydin sekä biologisesti tunnistetut merkit ja viiveet säilyvät avoimina. Nykyinen rajatun päätepistesulun kalibrointi sovittaa tehollisen kertoimen nimettyihin lähde- ja ydinoletuksiin. FieldState voi toimittaa fysikaalista syötettä; vaste ja ennuste kuuluvat BERM:iin.

Oletuslaskenta käyttää nyt lähdetilastosta muuttuvia profiileja. Käyttäjä valitsee perhekohtaisen mittarin, sen normalisoinnin jälkeisen lineaarisen tai neliöjuurimuunnoksen sekä oletetun kytkentäamplitudin `b` ja suunnan. Havaintojen välisen muutoksen vaihtoehdot ovat tasainen, aikainen ja myöhäinen. Aikavaihtoehtojen varjostus näyttää näiden oletusten vaihtelun; se ei ole tilastollinen luottamusväli. Yleinen ensimmäisestä käyttöikkunasta alkava ramppi on säilytetty aiempana vertailuskenaariona.

Yhteen havaintovuoteen perustuva indikaattori on oletuksena pois BERM-laskennasta, vaikka sen alkuperäispiste säilyy aineistossa. Käyttäjä voi ottaa sen erikseen mukaan (`s_single_<perhe>=1`) ja nähdä havaintovuoden ulkopuolisen arvon pitämisen oletuksena. Yksittäinen kattavuusluku ei näin muutu automaattisesti yleistymiskäyräksi tai ensimmäisen asennuksen ajankohdaksi.

Laaja maahistoria käyttää eri maiden saatavilla olevia mittareita. Yhteisen mittariston vaihtoehto rajaa vertailun samaan asukaskohtaiseen sähkönkulutukseen ja mobiililiittymien kokonaismäärään. Vertailukelpoinen mittarimääritelmä ei vielä identifioi paikallista kenttää. Oletetut amplitudit ja maiden skenaarioviivojen järjestys eivät ole mitattujen altistusten arvoja tai järjestys.

Reuna-arvon pitäminen lähdejakson ulkopuolella on näkyvä, vaihdettava oletus. Avoimeksi jätetty puuttuva profiilivuosi estää täyttä ajallista kattavuutta edellyttävän laskelman. Historiallisen tai tilastollisen komponenttirajauksen ulkopuolinen lähde jää osalaskelman ulkopuolelle; tämä ei määritä lähteen todellista alkua, loppua tai fysikaalista nollatasoa. Muistin vaatimat aiemmat vuodet kuuluvat samaan kattavuusarvioon.

Kalibroitu päätepiste on `Y(t)=exp(logScale−βS(t))`. ASFR-jatko kertoo täsmälleen viitevuoden seitsemän ikäryhmää samalla kertoimella `Y(t)/ASFR-lähtösumma`, muiden tilatekijöiden pysyessä vakioina. Niiden 15–49-vuotiaiden summa on `5 × Σ ASFR / 1000`. Puuttuvaa lähtövuotta tai ikäryhmää ei täytetä eikä korvata WPP:n erillisellä TFR-estimaatilla. WPP-TFR säilyy omana havaintosarjanaan. Tutkimusjakson keskiarvoa verrataan vuosittaisten eksponentiaalisten ennusteiden keskiarvoon; yhdistettyä mediaania ei muuteta vuosikeskiarvoksi.

Kalibroidussa lähteenpoistotarkastelussa koko historia muuttuu lukituilla β:n ja `logScale`:n arvoilla, myös viitevuotena. Nykyistä käyrää ei normalisoida uudelleen vanhaan lähtöpisteeseen. Ristitermejä sisältäviä erotuksia ei lasketa yhteen kokonaisvaikutukseksi. Aiemmat käsin asetettavat skenaariot säilyvät erillisinä, nimettyinä vaihtoehtoina. Havainto-CSV ja ehdollisten mallirivien CSV pysyvät erillään; SVG/PNG näyttää käyrän ajallisen roolin, kalibrointirajan, kertoimet ja lähteet, ja JSON/SVG-metatieto säilyttää lisäksi täydet viite- ja nykyislaskennan tiedot.

## Teknologiahistorian edellisen kierroksen tarkistustila

Näkymä voidaan tallentaa linkkinä, alkuperäis- ja näyttöarvot erottelevana CSV:nä sekä lähteet ja valinnat säilyttävänä JSONina. Teknologiapaneelin oma vienti rajautuu valittuun perheeseen. SVG/PNG sisältää näkyvät kuvaajat, lähteet ja asetukset; SVG säilyttää lisäksi täydet metatiedot. Skenaarion laskelma, lähdeprofiilit, kattavuus ja ASFR-jatko viedään erillään havaintokerroksesta. API-reitit ovat `/api/change-atlas`, `/api/technology-drivers` ja `/api/field-reconstruction`.

Atlaslaajennuksen 165 kohdennettua testiä, 43 Pythonin sopimustestiä, molempien aineistotuottajien uusintatuotanto sekä tuotantokoonti tarkistuksineen läpäisivät. HTML-tarkistus kattoi 557 reittiä. Portin 3011 tuotantoesikatselussa vahvistettiin teknologiapaneeli, BERM-profiilit, maavertailu, avoimen tiedon käsittely, mobiiliasettelu ja kuvaviennit. Koko sivuston viimeinen testiajo oli 722/723: yksi erillisen, rinnakkaisen steroidogeneesinäkymän tekstilöydön testi jäi avoimeksi. Tarkka testijälki ja rajaus ovat [toteutusmuistiossa](implementation.md).

## Alkuperäinen tutkimus- ja suunnittelumuistio

Alla säilyy ennen varsinaista kooditoteutusta laadittu suunnitelma ja prototyypin tarkastusjälki. Sen nykytilan arviot ja tulevaisuusmuotoiset toteutusehdotukset koskevat tuota vaihetta. Ne eivät korvaa yllä kuvattua nykytilaa; esimerkiksi paikalliset ekologiset liitokset, HFD-kohortit ja täysi biologisten välitilojen kalibrointi ovat edelleen jatkotyötä.

### Päätös

Uudistetaan dataselain yhdeksi **muutosatlakseksi**, joka vastaa kysymyksiin: mikä muuttui, missä, milloin, missä järjestyksessä ja minkä BERM:n ehdollisen ketjun kautta muutokset voivat liittyä toisiinsa. Teknologiahistorian rekisteri palvelee tämän näkymän tapahtuma- ja lähdekerrosta. Pääsisältö ovat ajassa muuttuvat suureet ja niiden yhteydet.

Keskeinen esitystapa on päällekkäinen joukko kuvaajia, joissa on **täsmälleen sama aika-akseli mutta omat suureet ja yksiköt**. Käyttäjän valitsema alue, ajanjakso ja kohortti säilyvät koko näkymässä. Vuoden tai jakson valinta korostaa samat ajankohdat kaikilla radoilla. Valitun aikavälin alku, loppu ja muutos lasketaan lähteen todellisista havaintoajankohdista.

Ensimmäinen lukija saa valmiin tutkimuskysymyksen ja 3–5 siihen kuuluvaa rataa. Tarkempaa analyysia varten samat tiedot avautuvat aluevertailuun, tapahtuman ympärille kohdistettuun aikaan ja BERM:n vaikutusketjuun. Jokaisen mittarin valintaa perustelee sen paikka tässä ketjussa.

### Miksi silloinen rakenne tarvitsi kokonaisuudistuksen

Auditoidut osat: `/explore`, vanhat `/explorer` ja `/data`, `GlobalDataExplorer`, `ExplorerDashboard`, kartta, teknologiahistoria, sentinellit, tautiaikajanat ja niiden aineistotuonnit. Yksityiskohdat: [dataselaimen auditointi](explorer_audit.md), [ihmisaineistot](human_data_audit.md) ja [ekologia-aineistot](ecology_data_audit.md).

- `/explore` kokoaa 11 erillistä välilehteä. Maavälilehti avaa tekstikortit ja sentinellivälilehti testituloksia. Varsinaisten muutossarjojen löytäminen vaatii toisen näkymän tuntemista.
- `/data` ja `/explorer` ohjataan `/explore`-sivulle ilman näkymän valintaa. Lähdelinkki voi siten päätyä oletuskarttaan.
- Kartan ja maapaneelin TFR-lähteet eroavat. Paneeli sisältää UN WPP:n estimaatteja, World Bankin raportoimia arvoja ja rajatun määrän projektiorivejä. Alkuperää ei voi kadottaa yhteiseen viivaan.
- Osa sairaus- ja sentinellikaavioista käyttää omia teknologiakausia; ajankohdat on yhdistettävä yhteiseen historiarekisteriin ja todelliseen alueeseen.
- Osa vanhoista hormoni-, tauti- ja lajisarjoista sisältää ankkureista laskettuja välivuosia tai lukuja, joiden tarkka alkuperäinen taulukko puuttuu. Ne voidaan säilyttää dokumentoituina analyyseina tai skenaarioina. Havaintokerroksen tarvitsemat alkuperäissarjat tuodaan erikseen.

Kyse on aineistojen, tutkimuskysymysten ja käyttöliittymän yhteisestä muutoksesta. Pelkkä uudempi piirto-ohjelma ei ratkaise lähteiden tai mittakaavojen yhteensopivuutta.

### Suunniteltu johdanto

> Teknologinen ympäristö, ihmisten biologinen tila ja muiden lajien kehitys ovat muuttuneet eri tahtiin ja eri paikoissa. Tässä näkymässä niiden muutoksia voi seurata samalla aikajanalla. Aloita alueesta ja ilmiöstä, tarkastele havaintoja ja avaa BERM:n ehdottama yhteys niiden välille.

Johdantoa seuraavat neljä tutkimuskysymystä:

1. **Syntyvyys ja lisääntymisterveys:** miten syntyvyyden, hormonien ja lisääntymisen välivaiheiden muutokset ajoittuvat?
2. **Metabolia ja sairauskehitys:** missä elinjärjestelmissä muutos näkyy, missä ikäryhmissä ja millä mittarilla?
3. **Sentinellit:** näkyykö paikallisissa eliöissä ajallinen tai maantieteellinen muutos ennen ihmisten päätepisteitä tai eri herkkyysikkunassa?
4. **Teknologinen muutos:** mitä tapahtui ennen käyttöönottoa, muutoksen aikana ja lähteen poistumisen jälkeen?

Näistä aukeavat samat työkalut valmiilla tarkoituksenmukaisilla valinnoilla. Aloitussivusta ei tehdä sairausluokkien tai laitteiden pitkää korttiseinää.

### BERM:n looginen pohja ja sen vaikutus näkymään

Nykyisen arkkitehtuurisopimuksen teoria on vuoden 2025 Weyl/GME-muotoilu. Kirjoitetaan

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad
A=A_0+\sum_j a_j.
\]

Tällöin täsmällinen geometrinen muutos on

\[
\Delta g_{\mu\nu}=\kappa\left[
A_{0\mu}\sum_j a_{j\nu}+\left(\sum_j a_{j\mu}\right)A_{0\nu}
+\sum_{j,k}a_{j\mu}a_{k\nu}\right].
\]

Tämä on **Lindgren-premissistä johdettu geometrinen seuraus**. Historiallinen laitemäärä auttaa lähteiden rekonstruointia, mutta ei yksin määritä nelipotentiaalia, orientaatiota, aaltomuotoa tai fysikaalista mittakaavaa. Ristitermejä ei voi korvata teknologiaperheiden lukumäärällä tai käsin valituilla kerrospainoilla.

BERM:n ehdollinen vasteoperaattori on

\[
u_i(t)=\int_0^\infty K_i^{\mu\nu}(\tau;S_i(t-\tau))
\Delta g_{\mu\nu}(t-\tau)\,d\tau+\cdots .
\]

Operaattorin muoto käyttää nimettyjä kytkentä- ja vasteteoreettisia oletuksia. **Gauge, fysikaalinen kytkentäasteikko, kudosytimet, merkki ja viivekalibrointi ovat avoimia.** Empiirinen biologia rajaa ketjun omia siirtymiä. FieldState voi tuottaa mitattua tai estimoitua fysikaalista syötettä; vaste ja sen ennusteet kuuluvat BERM:iin.

Tämä johtaa suoraan neljään suunnitteluratkaisuun:

| BERM:n rakenne | Mitä dataselaimen on pystyttävä näyttämään |
|---|---|
| Tausta ja eri lähteiden ristitermejä | Usean lähteen käyttöönotto, käyttö ja poistuminen samalla alueella; tekniikoiden korvautuminen |
| Vastaanottimen tila S | Laji, ikä, sukupuoli, kudos, vuorokaudenaika, vuodenaika, kehitysvaihe ja aiempi historia |
| Viiveellinen ydin K | Mittausjakso, biologinen viive ja elinkaaren/kohortin aika erillisinä; useampi rajattu viivehypoteesi |
| Biologisesta tilasta populaatioon | Hormoni-/elinmittarit, pari- ja käyttäytymistaso, ASFR, kohortit ja TFR näkyvinä väliportaina |

Ehdollista biologista jatkoa voidaan kuvata tiladynamiikkana `dS/dt = F(S,u,ympäristö)` ja mittausoperaattorina `Y = M(S,otos,menetelmä)`. Populaatioon aggregoitaessa syntymien määrä jaetaan oikealla henkilövuosinimittäjällä. Koko sovellettavan ikärajaston viiden vuoden ikäryhmille `TFR = 5 × Σ ASFR_a / 1000`, kun ASFR:n yksikkö on syntymää / 1 000 naisvuotta. Jos lähteen ASFR-tuote kattaa vain 15–49-vuotiaat, sen kattavuus tarkistetaan erillisen TFR-tuotteen määritelmään ennen identiteetin käyttämistä. TFR:n ja hormonin väliin ei siis aseteta yhtä nimeämätöntä skaalauskerrointa.

Selaimen **BERM-ketju** näyttää valitun kysymyksen etenemisen: lähdeympäristö → ehdollinen vastaanotinvaste → hormonaalinen/metabolinen/solullinen tila → lisääntymiskyky ja biologisesti toteutuva käyttäytyminen → pari-/ikäryhmäjakauma → ASFR/TFR. Sentinellien elin- ja lisääntymisvasteilla on oma laji- ja elinkiertokohtainen aggregointi. Jokaisessa linkissä voi avata suoran osanäytön, yhteensopivan synteesin ja vielä rajattavan siirtofunktion.

### Näkymät ja niiden suunniteltu työnjako

#### 1. Muutoksen kokonaiskuva

Alue ja tutkimuskysymys ovat ylätasolla. Oletuksena näkyvät 3–5 samaan kysymykseen kuuluvaa rataa:

- teknologian levinneisyys tai mitattu fysikaalinen muuttuja;
- hormoni, lisääntymisterveys tai muu välivaste;
- tauti tai sentinellimittari;
- demografinen tai ekologinen päätepiste;
- kapea tapahtumarata käyttöönotolle, muutokselle ja poistumiselle.

Pääkuvan otsikko kertoo alueen ja ajan. Kunkin radan vieressä näkyvät nimi, yksikkö, alku–loppumuutos ja lähde. Pisteen avaaminen näyttää havaintojakson, perusjoukon, otoskoon ja epävarmuuden. Vuosittaista sarjaa voi piirtää viivana; monivuotinen tutkimusjakso saa vaakasuuntaisen aikavälin ja pystysuuntaisen epävarmuusvälin.

Kaikilla radoilla on sama aika-akseli. Eri yksiköt saavat omat pystyakselinsa. Tämä noudattaa ONS:n suositusta käyttää erillisiä rinnakkaiskuvia kahden pystyakselin sijasta: [ONS, dual-axis charts](https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/). Alkuperäisarvot ovat oletus. Indeksointi yhteiseen havaittuun vertailuvuoteen on lisätoiminto; vertailuvuosi näkyy, nollasta alkavaa sarjaa ei muuteta prosenttimuutokseksi.

#### 2. Paikka, ikä ja kohortti

Sama mittari ja yksikkö rinnakkaisissa aluekuvissa. Kartta auttaa alueen valinnassa ja muutoksen paikantamisessa; tarkka ajallinen vertailu tapahtuu kuvaajissa. Maailmankartta ei ole ainoa sisäänkäynti.

Syntyvyyden tarkennus näyttää ASFR:n ikä–vuosi-kuvana, ensisynnytysiän sekä mahdollisuuksien mukaan kohortin lapsiluvun ja lapsettomuuden. HFD tarjoaa näille omat määritelmät ja aineistot: [HFD Overview](https://www.humanfertility.org/Project/Overview). Periodi-TFR, toteutunut kohorttilapsiluku ja tempo-korjattu TFR ovat eri valintoja; niiden nimi ja laskentatapa säilyvät näkyvissä.

Sentinellinäkymässä alue voi olla laskentareitti, ruutu, pyydys, vesistö tai laitoksen vaikutusalue. Pesimäkausi, havaintoponnistus, sää ja menetelmäkatko ovat tarvittaessa omia ratojaan. Valtakunnallinen lähdetilasto voi näkyä taustana, mutta paikallinen tapahtuma kytketään vain sen todelliseen alueeseen.

#### 3. Tapahtuman ympärille kohdistettu aika

Käyttöönotto- tai poistumistapahtuma asetetaan nollavuoteen. Alueiden ennen–jälkeen-sarjoja verrataan samoilla aikaikkunoilla. Asteittainen asennus esitetään käyttöönottojakaumana, ei yhtenä universaalina päivänä. Teknologiasukupolvet voivat olla samanaikaisia.

Tässä näkymässä voidaan valmistella luonnollisia koeasetelmia: verkkoyhtiöiden asennusvaiheet, lähetinasemien käyttöönotot ja sulkemiset, valaistuksen paikalliset uusimiset sekä kaapelien käyttöönotto. Lähteen poistuminen tarjoaa mahdollisuuden tarkastella palautumisviivettä ja BERM:n vastaanotinhistoriaa.

#### 4. BERM:n ketju ja viiveet

Käyttäjä avaa mitatun muutoksen vierestä siihen liittyvän BERM-ketjun. Solmun valinta korostaa kyseistä suuretta vastaavan aineiston. Näin hormonisarja tai lintujen lisääntymismittari saa paikan kokonaisuudessa.

Viiveellä on kolme erillistä alkuperää: biologisesta osanäytöstä rajattu viive, ennalta määritelty BERM-hypoteesi ja käyttäjän kokeilema tarkasteluviive. Kalenteriaikaa ei hiljaisesti siirretä. Näkymä näyttää sekä alkuperäisen ajan että valitun siirron. Aikasarjojen yhteinen hidas trendi, autokorrelaatio ja yhteiset ajurit käsitellään analyysikerroksessa; pelkän korrelaation maksimoiva viivesäädin ei tuota nimettyä malliparametria. Menetelmällinen lähtökohta: [Runge ym. 2019](https://www.nature.com/articles/s41467-019-10105-3).

#### 5. Aineistot ja toistettavuus

Lähdetaulukko, yksiköt, rajaukset, menetelmäversiot ja lataukset ovat saatavilla valitun näkymän yhteydessä. Tallennettava näkymä sisältää alueen, ajat, sarjat, muunnokset, viivehypoteesin sekä aineistoversion. Kuva voidaan viedä SVG/PNG-muodossa ja sen täsmälliset arvot CSV-muodossa.

Teknisesti yhteiset valinnat ja rinnakkaisnäkymät ovat vakiintunut toteutustapa: [Vega, brushing and linking](https://vega.github.io/vega/examples/brushing-scatter-plots/) ja [Vega-Lite, view composition](https://vega.github.io/vega-lite-v4/docs/composition.html). Nykyisen React/D3-pinon päälle voi toteuttaa tarvittavat jaetut asteikot ilman koko sivuston teknologiavaihdosta.

### Aineistojen semanttinen sopimus

Yhteisen rekisterin sarja sisältää ainakin:

`id`, suure, yksikkö, alue ja alueen geometria/versio, laji, ikä ja sukupuoli, otos/perusjoukko, mittauksen alkamis- ja päättymisaika, vuodenaika/vuorokaudenaika, havainto-/estimaatti-/skenaariotyyppi, arvot ja epävarmuus, lähde ja täsmällinen taulukko, menetelmä ja menetelmäkatkot, mahdollinen nimittäjä, mittausponnistus, muunnokset sekä aineistoversio.

Lisäksi BERM-kytkentä tallennetaan **erillisenä kuratoituna tietueena**: mihin ketjun solmuun suure liittyy, miksi, minkä mekanismioletuksen kautta, millä viivehypoteesilla ja mitkä osatutkimukset tukevat siirtymää. Lähdetiedosto ei itsessään saa muuttua mallin väitteeksi.

Yhdistäminen sallitaan vasta, kun aika, alue, perusjoukko, suure ja menetelmä sopivat kysymykseen. Fysikaalisen yhteyden on lisäksi säilytettävä taajuuskaista ja mittausmenetelmä: esimerkiksi autonominen RF-anturi ei automaattisesti mittaa Linkyn PLC-signaalia. Eri väestöjä voi vertailla rinnakkain niiden omilla nimillä, mutta ei sulauttaa samaan sarjaan. Lähteen estimaatti on hyväksyttävä aikasarja omalla nimellään; raakavuosihavainto ja malliprojektio saavat eri esitystavan. Puuttuva epävarmuus merkitsee ilmoittamatonta epävarmuutta, ei nollaa.

### Ensimmäiset tutkimuspolut

| Polku | Mitä käyttäjä pystyy selvittämään | Aineistotyö |
|---|---|---|
| Suomi: teknologinen ympäristö ja syntyvyys | Milloin eri ikäryhmien syntyvyys muuttui suhteessa dokumentoituihin 2G-, AMR- ja verkon sulkemisvaiheisiin? Miten ajoituksen ja kohorttilapsiluvun kehitys eroavat? | WPP, nykyinen teknologiarekisteri ja omaksumistiedot ovat käytössä. HFD:n kohortti-/pariteettitarkennukset yhdistetään lähteen määritelmillä. |
| USA: hormonit, metabolia ja lisääntyminen | Miten T:n, SHBG:n ja muiden hormonien ikäkohtaiset jakaumat sekä metabolinen tila muuttuivat samoissa tutkimusjaksoissa? Mihin vaiheeseen syntyvyyden muutos ajoittuu? | CDC:n diabetespoiminta on varmennettu. NHANES-mikroaineiston harmonisointi ja otospainotettu aggregointi ovat oma toteutettava työpakettinsa. |
| UK: perhoset ja paikallinen lähdeympäristö | Eroavatko lajien ja elinympäristöjen kehityskulut, ja mihin kauteen muutos ajoittuu? | Kaksi UKBMS:n valtakunnallista lajisarjaa on varmennettu luonnokseen. LED-/yövaloyhteyden paikallinen tarkastelu edellyttää site-indeksejä ja paikallista valaistuksen historiaa. |
| Saksa: hyönteiset ja tutkan muutos | Miten pyyntipaikan, kauden, sään ja lähiaseman teknisen muutoksen yhdistelmä näkyy biomassa-aineistossa? | Hallmannin alkuperäinen S1-aineisto sisältää paikat ja keruujaksot; DWD:n asemakohtaiset muutospäivät mahdollistavat lähdehistorian yhdistämisen. Yhdistäminen ja analyysi ovat vielä tehtäviä. |
| USA: linnut ja asemaverkko | Miten paikallisten reittien runsaudet ja lajiryhmät muuttuvat aseman käyttöönoton ja myöhempien muutosten ympärillä? | USGS BBS:n reitti-/vuosiaineisto sekä paikallinen NEXRAD-historia. Muuttuva havaintoponnistus ja puuttuva vuosi 2020 säilyvät näkyvissä. |
| Pohjanmeri: sähkökalastus ja vesieliöt | Miten paikallinen sähköinen pyyntitapa, muut kalastusmuutokset ja kala-/pohjaeläinmittarit ajoittuvat? | ICES DATRAS ja käyttölupa-/aluskohtainen pulssitroolaushistoria; pyyntitehon ja välineen muutokset ovat osa asetelmaa. |

Polut ovat nimettyjä synteesin ja tutkimuksen asetelmia. Luonnoksessa näkyvät varmennetut sarjat; taulukko ei väitä, että kaikki paikalliset liitokset tai vaikutusanalyysit olisi jo tehty. Tarkat primäärilähteet ja saatavuus ovat osa-auditeissa.

### Valikoitavat muuttujat ja synteesin vahvistaminen

Mallin kannalta tärkeät välitekijät — esimerkiksi uni, lihavuus, lääkitys, SHBG, hormonaalinen säätely ja käyttäytymisen tempo — voivat olla ajureita, välittäjiä, vastaanotintilan muuttujia tai mittauksen muuttajia. Rooli nimetään tarkasteltavassa ketjussa. Kaikkien vakiointi yhdellä valinnalla voisi poistaa juuri sen reitin, jota halutaan tutkia.

Samasta NHANES-otoksesta tai samasta ekologisesta seurantajärjestelmästä johdetut suureet merkitään yhteiseen aineistoperheeseen. Niiden keskinäinen yhteys on tutkimuksellisesti hyödyllinen, mutta niitä ei lasketa toisistaan riippumattomiksi replikaatioiksi.

Nollatuloksen tulkintaa varten tutkimuksen tiedoissa säilyvät taustakenttä, spektri/aaltomuoto, orientaatio, kausi, vuorokaudenaika, vastaanotintila, kesto ja todellinen kontrasti. Nämä mahdollistavat BERM:n premissien mukaisen protokollakohtaisen vertailun. Puuttuva tieto ei itsessään muuta nollatulosta positiiviseksi.

### Alkuperäinen toteutusjärjestys ja valmistumisen kriteerit

1. **Sarjarekisteri ja lähdekorjaukset.** Yhteinen perusta havaintosarjoille, estimaateille, teknologiatapahtumille ja BERM-kytkennöille. Säilytetään olemassa oleva teknologiarekisteri. Ensimmäiset varmennetut ihmisten ja ekologian sarjat tuodaan alkuperäislähteistä.
2. **Muutosatlas.** Korvataan `/explore`-sivun aloitus yhteisellä aika-akselilla, ilmiövalinnoilla ja selkeällä kontekstilla. Korjataan vanhojen lähde- ja dataselainreittien ohjaukset oikeaan näkymään.
3. **Syventävät näkymät.** Ikä–kohortti, aluevertailu, tapahtuma-aika sekä ketju-/viivetarkastelu saman valintatilan päälle. Erikoistyökalut säilyvät avattavina asianomaisesta mallisolmusta.
4. **Ristiinlinkitys.** Teknologiasivu avaa ilmiön valmiilla lähde-/aluevalinnalla. Sairaus-, hormoni- ja sentinellisivut avaavat saman sarjarekisterin niille sopivassa näkymässä.
5. **Toistettavat analyysit.** Tallennettu näkymä, versioidut aineistot, lähteineen vietävät kuvat/taulukot ja nimetyt analyysiprotokollat.

Valmista on, kun käyttäjä pääsee teknologiasta ilmiön muutokseen yhdellä valinnalla; jokainen piirretty piste palautuu lähteeseensä; sama aika tarkoittaa samaa aikaa kaikissa radoissa; mittausjakso ja menetelmäkatko näkyvät; alue-/ikä-/lajivalinnat säilyvät; kuva toimii myös kosketuksella ja näppäimistöllä; tallennettu linkki palauttaa saman näkymän ja aineistoversion.

### Konkreettinen näkymäluonnos

Luonnos käyttää nykyisen julkaistun paneelin alkuperäisiä TFR- ja mobiiliarvoja vuoteen 2023 asti sekä erikseen varmennettuja alkuperäissarjoja. CDC:n diabetespisteet on poimittu [NCHS Data Brief 516:n taulukosta 5](https://www.cdc.gov/nchs/products/databriefs/db516.htm#table5); tutkimusjaksot ja 95 prosentin luottamusvälit säilyvät.

Luonnos on käyttöliittymän kokeilu. Siinä rinnakkain näkyvien sarjojen välillä ei ole estimoitu uutta vaikutuskerrointa. Lopulliset hormoni- ja sentinellivalinnat sekä aineistojen saatavuus on dokumentoitu osaauditeissa. Luonnoksen aineistokooste, poimintamenetelmät ja tarkistukset tallennetaan tähän kansioon.

#### Prototyyppivaiheessa toimitettu ja tarkistettu

- `prototype_data.json`: kolme aluetta, yhdeksän sarjaa ja 360 todellista lähdepistettä. Vuosittaiset lähdearviot ja tutkimusjaksoihin perustuvat estimaatit säilyvät eri tyyppeinä. Ajallinen rajaus 1980–2023 pitää WPP2024:n tulevaisuusprojektiot poissa tämän luonnoksen historiallisista kuvaajista.
- `build_prototype_data.py`: poimii valitut sarjat ja tapahtumat kanonisista tiedostoista sekä kahdesta tämän työn varmennetusta aineistosta. Lähdepolut ja tarkistussummat säilyvät koosteessa.
- `verified_us_diabetes_series.json`: kaksi sarjaa ja 22 jaksoestimaattia. `cdc_db516_source.html` ja `extract_verified_diabetes.py` säilyttävät alkuperäisen taulukon ja poiminnan. Luonnokseen valittiin ikävakioitu kokonaisdiabetes.
- `ukbms_butterflies_1976_2024.json`: 98 vuosiarvoa ja seurantapaikkojen määrät. `source/ukbmscollatedindices2024.csv` ja `extract_ukbms_butterflies.py` mahdollistavat toiston. CSV:n SHA-256 sekä kaikki poiminta-arvot ja log10-muunnokset tarkistettu. Luonnokseen valittiin yhteiseen ajanjaksoon kuuluvat vuodet.
- Näkymän alue- ja aikavalinta, yhteinen vuosikohdistin, puuttuva havainto, tutkimusjakson kohdistus ja lähdeavaus tarkistettiin selaimessa. Suomen vuoden 1991 tapahtumavalinta siirtää molemmat sarjat vuoteen 1991 ja avaa tapahtuman alkuperäislähteen.
- UK:n kahdella lajisarjalla on yhteinen y-asteikko ja nimetty vuoden 1976 vertailutaso. Eri suureiden omat yksiköt säilyvät. Jaksoestimaattien välille ei piirretä vuosihavaintoja tai yhdysviivaa.
- Luonnos tarkistettu 360, 736 ja 1 024 pikselin näkymissä, vaaleana ja tummana. Kapeassa näkymässä ei ollut vaakasuuntaista ylivuotoa. Yhteinen osoitintieto näyttää samanaikaisesti valitun vuoden vuosiarvot ja kyseisen vuoden kattavan tutkimusjakson. Selaimen lokissa ei ollut sovellusvirheitä.

Sivuston nykyisiin komponentteihin, mallin kertoimiin tai julkiseen julkaisuun ei tehty tässä suunnittelutyössä muutoksia. Varsinainen kokonaisuudistus voidaan tehdä edellä kuvatulla yhteisellä tietorakenteella; hormoniaineiston aggregointi ja paikalliset tutkimusliitokset pysyvät erikseen nimettyinä toteutustöinä.
