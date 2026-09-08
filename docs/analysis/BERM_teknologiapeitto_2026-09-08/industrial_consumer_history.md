# Teollisuus, kotien invertterit ja paikalliset tunnistusjärjestelmät

Päiväys 8.9.2026. Täydentävä lähdemuistio teknologiapeiton inventaarioon. Tässä käytetään teknologiahistoriaa, alkuperäisiä kenttämittauksia ja laitekannan tilastoja. Teknologian käyttöönotto ei yksin määritä biologisen vasteen suuntaa tai suuruutta.

**Inventaarioperusta.** Teknologiasivun 14 profiilia, LayersExplorerin 12 kerrosta, model-sivun listaus, etusivun viisi yhdistelmäkerrosta, Codelle MASTERin historiallinen 12 kerroksen luettelo ja BERM:n altistusmoduulit tarkastettiin ennen uusien lähteiden valintaa. UWB, teollinen elektrolyysi ja metallinilmaisimet eivät löytyneet tarkastetuista varsinaisista teknologialistoista. HVAC-taajuusmuuttajat ja sähköajoneuvot löytyivät: niiden alla esiteltävät asiat ovat tarkennuksia.

**BERM-kiinnitys.** Vuoden 2025 Lindgren-premissin BERM-normalisoinnissa g = η + κ A⊗A. Kun kokonaispotentiaaliin A lisätään paikallinen lähdeosuus b, muutos on Δg = κ(A⊗b + b⊗A + b⊗b). Tämä on geometrinen seuraus. Vasteen tuottaminen edellyttää BERM:n ehdollista kudosoperaattoria K, vastaanottimen tilaa ja asianmukaista aika- ja paikkasiirtoa. Alla olevat tutkimukset tuovat tämän ketjun fysikaaliseen syötteeseen historiaa ja mittauksia; ne eivät kalibroi yleistä K:ta tai vahvista Lindgren-premissiä.

**1. Teollinen elektrolyysi, suuret tasavirrat ja staattinen kenttä**

Puuttuva täsmennys on erityisesti alumiinin primäärituotannon ja muiden sähkökemiallisten prosessien suurvirtaympäristö. Hitsaus, induktiokuumennus ja sähköverkko on jo tunnistettu, mutta ne eivät yksilöi elektrolyysihallin tasasuuntaajaa, virtakiskoja, tasakenttää ja tasasuuntausrippeliä.

Hall–Héroult-prosessin kehitys ajoittuu vuoteen 1886, ja Alcoan edeltäjän Pittsburghin koelaitos vuoteen 1888. Tämä tuo historialliseen tarkasteluun jo 1800-luvun lopun erikoistuneita sähköisiä työympäristöjä. [Alcoan oma yrityshistoria](https://aacomnoa.apps.alcoa.com/global/en/who-we-are/history).

Moenin ym. alkuperäinen tutkimus raportoi elektrolyysihallissa 3–20 mT:n staattisia magneettikenttiä sekä vaihtokentän rippelikomponentteja. Tutkimuksen terveystarkastukset ajoittuivat vuosiin 1986 ja 1991. Tässä lähdettä käytetään osoittamaan todellinen mitattu kenttäympäristö; kenttäalueen lukemaa ei siirretä tehtaan naapurustolle. Julkaisun abstraktitiedot tarkastettiin, kustantajan kokoteksti ei avautunut tässä haussa. [Moen ym. 1995, DOI 10.1136/oem.52.8.524](https://doi.org/10.1136/oem.52.8.524).

IAI:n tuotantotilastoissa on alueellisia sarjoja vuodesta 1973, Kiina omana arvioituna alueenaan vuodesta 1999 sekä Persianlahden maiden oma ryhmä vuodesta 2010. Sarja auttaa paikantamaan tuotannon alueellista muutosta. **Taulukon maiden yhteydessä ilmoitetut alku- ja loppukuukaudet kuvaavat raportointikattavuutta, eivät automaattisesti tehtaan avaamista tai sulkemista.** Tehdaskohtainen historia tarvitsee erilliset laitosrekisterit. [IAI:n tuotantotilaston määritelmät ja aluejako](https://international-aluminium.org/statistics/primary-aluminium-production/).

BERM:n lisäarvo on paikallisen taustavektorin, sen gradienttien ja ihmisen liikkeen tallentamisessa. Aikaan nähden vakio kenttä voi vaihdella liikkuvan vastaanottimen radalla: dB/dt = ∂B/∂t + (v·∇)B. Tämä on kentän näytteistämisen kinemaattinen identiteetti, ei itsenäinen väite biologisesta vasteesta. Sama tehdas tarvitsee työntekijän tehtävän ja kulkureitin; tonnit vuodessa eivät anna kudosaltistusta.

Saman lähdeperheen jatkohaaroja ovat kloorialkalielektrolyysi, galvanointi, magneettinostimet ja magneettierottimet. Niiden teknologialuokka voidaan nimetä nyt, mutta tässä haussa ei muodostettu niille alueellisia asennuskantasarjoja. HSE nimeää elektrolyysin, alumiinin valmistuksen ja sähkömagneettiset nosturit staattisten kenttien työympäristöinä. [HSE HSG281, taulukko 1](https://www.hse.gov.uk/pubns/priced/hsg281.pdf).

**2. Kotien ilmastointi ja lämpöpumput: vanhan invertteriluokan olennainen historiallinen tarkennus**

BERM:n three_channel.py sisältää jo kaupallisen ilmanvaihdon VFD-omaksumiskäyrän. Sitä ei pidä esitellä uutena teknologiaperheenä. Puuttuvat kotitalouskohtaiset kannat, laitesukupolvet, kompressorin sijoitus ja käyttökausi.

Toshiba Carrierin yksityiskohtainen IEEE Milestone -tiedote erottaa kaupallisen invertteri-ilmastointilaitteen vuoden 1980 ja kotitalousmallin vuoden 1981. Lyhyt yritysaikajana antaa kotitalouslaitteelle myös vuoden 1980; täsmällisessä historiassa kannattaa käyttää mallin ja sovelluksen erottavaa tiedotetta sekä vuoden 1981 tuotetta käsittelevää japaninkielistä historiatietoa. [Toshiba Carrier, 16.3.2021, s. 1–2](https://www.toshiba-carrier.co.jp/global/news/pdf/Press_Release_en_20210316.pdf); [RAS-225PKHV:n vuoden 1981 historia](https://www.toshiba-carrier.co.jp/news/press/190911/).

IEA:n vuoden 2019 Kiina-analyysin mukaan maailmassa oli vuonna 2017 noin 1,7 miljardia ilmastointilaitetta, joista noin 36 % Kiinassa. Invertterimallien suosio kasvoi siellä erityisesti 2000-luvun lopulta. Nämä luvut kuvaavat koko ilmastointikantaa ja teknologiamuutoksen suuntaa; 36 % ei ole invertterilaitteiden osuus. [IEA, The Future of Cooling in China](https://www.iea.org/reports/the-future-of-cooling-in-china).

Suomessa SULPU raportoi lämpöpumppujen määrän ylittäneen miljoonan vuonna 2020. Sen vuosittainen laitekohtainen myyntitilastointi on käyttökelpoinen lähtökohta maa-, ilma-, ilma-vesi- ja poistoilmalämpöpumppujen historian erottamiseen. Myyntien kumulatiivinen summa tarvitsee poistuma-arvion ennen kuin sitä kutsutaan käytössä olevaksi kannaksi. [SULPU, lämpöpumput](https://www.sulpu.fi/lampopumput/); [SULPU, vuoden 2018 myyntitilasto](https://www.sulpu.fi/lampopumppumyynti-ponnahti-22-investoinnit-yli-puoli-miljardia/).

BERM:n kannalta tähän liittyy kaksi ajallisesti rinnakkaista syötettä: sähköisen lähteen toiminta ja vastaanottimen lämpötilaympäristön muutos. Pohjoisen talvilämmitys ja kuuman alueen kesäjäähdytys voivat tuottaa erilaisen vuosi- ja vuorokausijakauman. Sisä- ja ulkoyksikköä, niiden moottoreita ja kytkentäelektroniikkaa ei sijoiteta laskennassa samaan pisteeseen. Vähenevä sähkönkulutus ja muuttuva kytkentäspektri voidaan tallentaa erillisinä havaintoina.

**3. UWB-paikannus ja lyhytpulssiset tunnistusjärjestelmät**

Nykyinen IoT-lista nimeää BLE:n, Zigbeen, LoRan ja NB-IoT:n; UWB ei löytynyt sen toteutuksista. UWB on siten uusi nimetty signaaliperhe nykyiseen IoT- ja henkilölaitekokonaisuuteen, vaikka radiotekniikka sinänsä on jo mukana.

Yhdysvaltain FCC hyväksyi UWB-järjestelmiä koskevan ensimmäisen päätöksen 14.2.2002. Päätös erottaa muun muassa paikannus-/viestintälaitteita sekä maa-, seinä- ja muuta kuvantamista. Tämä on sääntelyn historiallinen virstanpylväs, ei laitekannan mittaus. [FCC 02-48](https://docs.fcc.gov/public/attachments/FCC-02-48A1.pdf).

Kuluttajalaitteen täsmällinen ankkuri on U1/UWB:n sisältävän iPhone 11:n julkaisu syyskuussa 2019; Apple ilmoitti saatavuuden ensimmäisessä vaiheessa yli 30 maassa ja alueella. AirTag julkaistiin huhtikuussa 2021, ja UWB liittyi sen tarkkaan lähietäisyyden paikannukseen. [Apple, iPhone 11, 10.9.2019](https://www.apple.com/newsroom/2019/09/apple-introduces-dual-camera-iphone-11/); [Apple, AirTag, 20.4.2021](https://www.apple.com/newsroom/2021/04/apple-introduces-airtag/).

Tarvittava käyttömuuttuja on paikannustapahtumien määrä, kesto, pulssijono ja laitteiden sijainti. UWB-ominaisuuden olemassaolo ei tarkoita ympärivuorokautista UWB-lähetystä. Tässä haussa ei löytynyt harmonisoitua alueellista UWB-käyttöaikasarjaa. Lisäys parantaa aaltomuotoluokitusta, mutta sen väestöllistä selitysosuutta ei voi vielä asettaa muiden lähteiden edelle.

**4. Metallinilmaisimet ja turvatarkastusympäristöt**

EAS-hälytinportti, tunnistetta lukeva RFID-portti ja metallinilmaisin eivät ole sama laite. Metallinilmaisimet täydentävät nykyistä luetteloa induktiivisella mittauskentällä ja sen pulssimuodoilla.

Yhdysvalloissa kaikkien lentomatkustajien seulonta laajeni 5.1.1973 alkaen: viranomaisen alkuperäinen kuvaus nimeää elektronisen metallinilmaisimen tai sen puuttuessa henkilön suostumuksella tehtävän tarkastuksen. Tämä ajoittaa järjestelmän laajenemista, mutta ei todista, että jokaisella lentoasemalla oli samana päivänä sama laite. [Federal Register 20.6.1973, s. 16032](https://www.govinfo.gov/content/pkg/FR-1973-06-20/pdf/FR-1973-06-20.pdf).

Boivinin ym. kenttämittauksessa läpikuljettavien ilmaisimien signaalitaajuudet olivat 0,1–3,5 kHz ja käsilaitteiden 89–133 kHz. Käsilaitteiden aaltomuodot olivat sinimuotoisia; porteissa oli muun muassa pulssimaisia ja sahalaitaisia muotoja. Näin samassa käyttöluokassa on jo mitattu toisistaan selvästi eroavia kenttiä. Luvut koskevat tutkimuksen laitteita, eivät kaikkia markkinoilla olleita sukupolvia. [Boivin ym. 2003, PMID 12747477](https://pubmed.ncbi.nlm.nih.gov/12747477/); [NIJ/NIST:n laiteopas 2001](https://www.ojp.gov/library/publications/users-guide-hand-held-and-walk-through-metal-detectors).

Tarkastettavan lyhyt läpikulku ja portin vieressä työskentely tarvitsevat eri aikajäljen ja paikan. Aktiivinen millimetriaaltokuvannin ja passiivinen kuvannin erotetaan toisistaan; röntgenlaitteet kuuluvat erilliseen ionisoivan säteilyn historiaan. Tässä muistiossa ei rakennettu maailmanlaajuista turvatarkastuslaitteiden kantasarjaa.

**5. Sähköiset kaksi- ja kolmipyöräiset: jo nimetyn sähköajoneuvon tärkeä alueellinen alaluokka**

Sivun sähköautoprofiili ei kuvaa kaikkia sähköisen liikenteen käyttötapoja. IEA raportoi vuodelle 2024 noin 10 miljoonaa sähköisen kaksi- tai kolmipyöräisen myyntiä, noin 15 % kyseisen segmentin myynnistä ja yli 9 % sen globaalista kannasta. Kiina, Intia ja Kaakkois-Aasia muodostivat noin 80 % koko kaksi-/kolmipyöräsegmentin myynnistä. **IEA:n tässä käyttämä määritelmä sulkee sähköavusteiset polkupyörät ja hitaat sähköpotkulaudat pois.** [IEA, Global EV Outlook 2025: other light-duty vehicles](https://www.iea.org/reports/global-ev-outlook-2025/trends-in-other-light-duty-electric-vehicles).

BERM:n täydennys olisi ajoneuvoluokka, akun/kaapeloinnin/moottorin sijainti, ajoaika ja kuormitus sekä irtoakun lataus- tai vaihtopaikka. Lähetti, matkustaja ja satunnainen käyttäjä muodostavat eri historian. Tämä on olemassa olevan EV-perheen syvennys; sitä ei lasketa kokonaan uudeksi EMF-teknologiaperheeksi.

**6. Synteettiset materiaalit: mallissa jo tunnistettu rajapinta, puuttuva materiaalihistoria**

Polyesteri ja nailon eivät ole BERM:lle uusia löytöjä. Lähderekisterissä ovat shafik1992, shafik1992_sling ja dincmen2016; mallidokumentissa on StaticTriboelectricInterface. Myös DiseaseCascadeTimeline näyttää synteettisten vaatteiden rivin. Puute koskee tuotannon, käytön, materiaaliseosten, antistaattisten käsittelyjen ja pintojen todellista historiaa.

Nailonin kaupallisen tuotannon täsmällinen ankkuri on DuPontin Seafordin tehtaan 15.12.1939 aloitus. ACS:n historiallinen muistomerkkiaineisto ja Smithsonianin DuPont-arkisto tuovat mukaan alkuperäisiä tuotanto-, tehdas- ja käyttötietoja. [ACS, Carothers and Nylon](https://www.acs.org/education/whatischemistry/landmarks/carotherspolymers.html); [Smithsonian, DuPont Nylon Collection](https://sirismm.si.edu/EADpdfs/NMAH.AC.0007.pdf).

Textile Exchangen vuoden 2025 markkinaraportissa polyesteri muodostaa 59 % vuoden 2024 globaalista kuitutuotannosta, noin 78 miljoonaa tonnia. Tuotanto kattaa vaatteiden lisäksi kodintekstiilejä, jalkineita ja muita sovelluksia. Näin lukua ei pidä tulkita 59 prosentiksi ihmisten vaatetuksesta tai ihokontaktitunneista. [Textile Exchange, Materials Market Report 2025](https://textileexchange.org/knowledge-center/reports/materials-market-report-2025/).

Dincmenin ym. alkuperäinen materiaalitutkimus käsittelee nailonin ja polyesterin antistaattisten ominaisuuksien muuttamista pintakäsittelyllä. Se on hyödyllinen tekninen linkki: saman kuitunimen alle voi jäädä sähköisiltä ominaisuuksiltaan erilaisia tuotteita. Tämän tutkimuksen julkaistu otsikko on Atmospheric Pressure Plasma Treatment of Nylon 6,6 and Polyester Fabrics for Enhancing Antistatic Properties, vaikka rekisteri käyttää kuvailevaa lyhennelmää. [Dincmen ym. 2016](https://doi.org/10.14504/ajr.3.4.4).

BERM:n historiatäydennykseen kuuluvat materiaalipari, hankaus/liike, ilmankosteus, maadoitus, ihon kosteus, sähköinen relaksaatioaika ja käyttöaika. Tuotantomaata ja käyttömaata on käsiteltävä erikseen. Tämä antaa mahdollisuuden kuvata sellaista teknologista ympäristömuutosta, jota mobiililiittymien ja sähköverkon laajuus eivät tavoita. Biologinen vaikutus pysyy erillisen kudossiirron ja vastaanottimen kysymyksenä; alkuperäinen tekstiilitutkimus ei tee jokaisesta polyesterituotteesta samanlaista altistetta.

**Käyttöönotto- ja mittaustiedon raja.** Edellä löytyi useita vahvoja käyttöönottovuosia, suoria kenttämittausten ankkureita ja materiaalin sähköominaisuuksien interventio. Niillä voidaan jo vahvistaa teknologiaperheen olemassaolo ja rajata paikallisen lähteen luonnetta. Kaikille perheille ei löytynyt alueellista laitekantaa, ja yhdellekään ei tässä muodostettu historiallista ihmis- tai eläinkohtaista kudosannosta. Näiden tasojen erottaminen tekee lisäyksistä käyttökelpoisia BERM:n jatkosynteesissä.
