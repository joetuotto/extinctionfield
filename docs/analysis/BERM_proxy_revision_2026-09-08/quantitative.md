# Lajienvälisen ja määrällisen argumentin lähdeauditointi

Päiväys 2026-09-08. Rajaus: liitteen `97aa2aef-f804-4d59-aece-3597ef1ff8b3/pasted-text.txt` määrälliset ja lajienväliset väitteet. Sivukomponentti: `website/components/ProxyComparativeEvidence.tsx`. Tässä muistiossa erotetaan tarkistetut julkaistut havainnot, niiden vertaaminen ja historiallisen kenttäannoksen tunnistaminen.

BERM:n geometriaportti on päätehtävässä tarkistettu vuoden 2025 muodossa. Biologinen Ξ[S]-liitos jää erilliseksi ehdolliseksi L2-premissiksi avoimine asteikko-, gauge- ja kudoskalibrointeineen. Tässä koottu biologia ei yksin vahvista sitä.

## Myönteinen lajienvälinen näyttö

Eläinkoe tuottaa näyttöä ihmisen mekanismin osasta, kun kohde/prosessi on säilynyt, sisäinen annos tai pitoisuus on vertailukelpoinen ja päätemuuttuja sama. Suora rinnakkainen asetelma vahvistaa tätä liitosta. Tilariippuvuus ja lajierot täsmentävät siirrettävää osaa; ne eivät tee komponenttinäytöstä merkityksetöntä.

**Sumner2019:** ihmisen (9 luovuttajaa) ja koiran (11 urosta) siittiöitä altistettiin samassa tutkimuksessa DEHP:lle ja PCB153:lle 4 × 4 pitoisuusyhdistelmin. Molemmilla lajeilla havaittiin DNA-fragmentaatiovasteita ja kemikaalien yhteisvaikutuksia. Ihmisen liikkuvuus ei muuttunut merkitsevästi kummankaan kemikaalin yksittäisaltistuksessa; se muuttui yhdistelmillä. Tämä tekee DNA-päätemuuttujasta täsmällisemmän rinnakkaisen ankkurin kuin väitteestä kaikkien motiliteettivasteiden samanlaisuudesta.

- DEHP: 0; 0,75; 3,75; 37,53 µg/ml. PCB153: 0; 0,26; 1,32; 13,22 ng/ml. Kymmenen minuutin ja kolmen tunnin mittaukset. Pitoisuudet muodostettiin koiran kivesten aiemmin mitattujen pitoisuuksien kerrannaisina (0, 2, 10, 100); näitä ei pidä nimetä kaikilta osin tavallisiksi ihmisannoksiksi.
- Tutkimus kuuluu samaan Nottinghamin/Lean tutkimusperheeseen kuin Lea2016. Se tuo uuden interventioasetelman; sitä ei lasketa kennelitrendin täysin riippumattomaksi toistoksi.
- [Alkuperäisartikkeli](https://www.nature.com/articles/s41598-019-39913-9), [alkuperäinen XML](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6399337/fullTextXML).

**Olson2000, 71 %:** 12 yritystä, 150 lääkettä ja 221 ihmisellä havaittua toksisuustapahtumaa. Otos valittiin lääkkeistä, joilla oli jo todettu ihmistoksisuutta. Vähintään yksi eläinlaji osoitti vastaavan toksisuuden 71 %:ssa ihmishavainnoista; ei-jyrsijät 63 %, jyrsijät 43 %. Suunta on ihmishaitta → eläinkokeen vastaavuus. Se ei ole P(ihmisvaste | myönteinen eläinlöydös), eikä koske yleisesti hoidon tehoa tai kenttäaltistuksia. Myönteinen merkitys on monien ihmisen elintoksisuuksien tunnistaminen eläinkokeissa. [Ensisijainen PubMed-tietue](https://pubmed.ncbi.nlm.nih.gov/11029269/).

**Ineichen2024, RR 0,86:** laaja katsaus käsitti 122 katsausta, 54 sairautta ja 367 hoitoa. Näistä 50 % eteni ihmistutkimuksiin, 40 % satunnaistettuun kokeeseen ja 5 % hyväksyntään. Tulosten vastaavuuden osa-analyysiin valittiin 62 hoitoa, joista oli vähintään viisi eläintutkimusta: 1 496 eläintutkimusta ja 515 kliinistä tutkimusta (näistä 220 RCT:tä). Myönteisiä oli 1 181/1 496 eläintutkimuksesta, 317/515 kliinisestä tutkimuksesta ja 111/220 RCT:stä. Satunnaisvaikutusten yhdistetty RR oli 0,86 (95 % LV 0,80–0,92), joten 86 % ei tarkoita kaikkien eläinlöydösten toistumistodennäköisyyttä.

**Tarkennus julkaisun omaan menetelmäkuvaukseen:** Methods-proosa kuvaa suhteen järjestyksen toisin päin, mutta alkuperäinen R-koodi on `metabin(Clin_positive, Clin_all, Pre_positive, Pre_all, Study, ...)`: laskettu suhde on kliinisten myönteisten osuus / eläintutkimusten myönteisten osuus, hoitokohtaisesti yhdistettynä. Raakojen kokonaisosuuksien jakolasku ei ole sama satunnaisvaikutusten estimaatti. [Artikkeli](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3002667), [alkuperäinen analyysikoodi S20](https://journals.plos.org/plosbiology/article/file?id=10.1371/journal.pbio.3002667.s020&type=supplementary).

## Kolme julkaistua siemennestetrendiä

| Laji ja otanta | Ajanjakso ja päätemuuttuja | Tarkistettu tulos |
|---|---|---|
| Ihminen, Levine2017: 185 tutkimusta / 42 935 miestä koko katsauksessa; tässä käytetty valikoimaton länsimainen alaryhmä sisältää 110 estimaattia | 1973–2011, siittiöpitoisuus | 99,0 → 47,1 milj./ml; −52,4 %. −1,4 %/v on suhteessa alkuarvoon, ei absoluuttinen prosenttiyksikkömuutos. |
| Koira, Lea2016: yksi brittiläinen jalostusohjelma, 232 urosta, 42–97 vuodessa | 1988–2014, eteenpäin suuntautuva liikkuvuus | Julkaisu raportoi −2,5 %/v 1988–1998 ja −1,2 %/v 2002–2014. Vuosina 1999–2001 heikomman siemennesteen koiria poistettiin jalostuksesta; tätä katkosta ei piiloteta yhdeksi jatkuvaksi maailmanlaajuiseksi trendiksi. |
| Hevonen, Harris2023: 230 estimaattia 229 artikkelista | Näytevuodet 1984–2019, eteenpäin suuntautuva liikkuvuus | Meta-regression arvio 63,69 ± 5,07 % → 42,35 ± 3,69 %; suhteellinen muutos −33,51 %. Kulmakerroin −0,610 prosenttiyksikköä/v; −0,96 %/v on suhteessa alkuarvoon. |

Lähteet: [Levine2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC6455044/), [Lea2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4977511/), [Harris2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10235923/). Hevosen aiemman lähderekisterin `harris2023` otsikko, kirjoittajan alkukirjaimet ja −0,75 %/v löydös olivat puutteellisia; korjaustietue toimitetaan erillisessä JSONissa.

Näiden keskinäinen ero ei ole suora annos–vaste: ihmisen pääte on pitoisuus, koiran ja hevosen liikkuvuus; otanta, ajanjaksot ja ympäristöt eroavat. Tutkimuksissa ei ole näihin tuloksiin kytkettyä yhteismitallista historiallista RF-annossarjaa. Ihmiskatsauksen kaikki maantieteelliset ja hedelmällisyyden perusteella valitut alaryhmät eivät näyttäneet samaa trendiä. Koiran siittiöiden kokonaismäärä ei heikentynyt yksisuuntaisesti. Harrisin saman tutkimusperheen aiempi laajempi menetelmä-/maantiedeanalyysi raportoi kokonaisuutena ei-merkitsevän ajallisen trendin, alueittain vastakkaisia trendejä ja mittausmenetelmäeroja; siksi hevostulos nimetään juuri vuoden 2023 meta-regression tulokseksi. [Harris2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8614490/).

## Vanhojen korrelaatio- ja R²-lukujen toistettavuus

Tarkistettu aiempi sivusuunnitelma, `berm/berm/diagnostics/cross_species_gradient.py`, `berm/berm/csli/species_data.py`, koiran lähdeaineiston digitointi sekä rajattu repo- ja 66 tiedoston `konteksti.zip`-arkistohaku.

- **R² 0,394 / 0,432 tai 0,433 / 0,448**, osittaiskorrelaatiot **−0,37 / −0,25**: tässä tarkistetusta aineistosta ei löytynyt alkuperäistä sovitettavaa taulukkoa, mallikaavaa, havaintojoukkoa ja toistavaa analyysia. Lukuja ei siksi siirretä julkaistun mittaustuloksen asemaan pelkästään kopioimalla niitä.
- **91 %** on likimäärin 0,394/0,433, selitysasteiden suhde. Se ei ole EMF:n kausaalinen osuus. **0,448−0,394 = 0,054**, eli 5,4 prosenttiyksikköä. Jos luvut koskisivat yhteensopivia OLS-malleja samassa otoksessa, selitysasteen yhteinen osuus olisi 0,379, ensimmäisen yksilöllinen 0,015 ja muiden yksilöllinen 0,054. Yhteistä 0,379-osuutta ei voida jakaa syille pelkillä selitysasteilla.
- **Ihminen −0,014 / koira −0,012 / hevonen −0,0096** tunnistuvat valittujen julkaisujen vuosittaisiksi suhteellisiksi muutoksiksi, mutta eivät samaksi biologiseksi muuttujaksi. **r = 1,000** väitteen numeerinen altistusakseli ja alkuperäinen laskentataulukko eivät löytyneet. Lajijärjestys korkea/keskitaso/matala ei itsessään määritä Pearsonin korrelaatiota.
- Nykyinen seitsemän lajin diagnoosiskripti on toistettavissa: `emf_burden = [0.05, 0.15, 0.25, 0.40, 0.50, 0.70, 1.00]`, `reproductive_decline_pct = [12, 15, 30, 20, 35, 25, 50]`. Sovitus antaa n=7, r≈0,842, R²≈0,710 ja p≈0,017. Altistusakseli on yksikötön oletusranking, ei fyysinen annosmittaus. Vastemuuttujat yhdistävät eri ilmiöitä (biomassa, lintujen runsaus, hedelmöittyminen, TFR); hyönteisrivin numero ja huomautuksen vähenemäluku eivät myöskään ole sama mitta. Toistettavuus koskee tätä diagnoosia, ei empiirisen annos–vastekäyrän validointia.
- `berm/berm/csli/species_data.py` kertoo jo vanhojen oletusrankingien poistamisesta ja pitää altistus-/vastetietoja aineistovalmiutena, ei havaintoina. Koira-aineiston kuvaajasta digitoidut luvut eivät sisällä RF-mittauksia.

Riippumattomien toistojen todennäköisyyksiä ei kerrota keskenään: julkaisut jakavat mekanismioletuksia, joissakin tapauksissa tutkimusryhmiä ja aineistoja, eikä siirtymisen perusjoukon todennäköisyyttä ole määritelty. Tämä ei vähennä yksittäisten interventioiden myönteistä näyttöarvoa; laskettavaa yhteistä todennäköisyyttä ei vain synny pelkistä prosenttiluvuista.

## Matriisin rajaus

Seitsemän järjestelmää ovat ihminen, koira, hevonen, punarinta, mehiläinen, kynsisammakko ja koralli. Seitsemän selitysreittiä ovat ei-optiset kentät, valo, kemikaalit, ilmasto/elinympäristö, ravinto/liikkuminen, ihmisen oma perhepäätös ja BERM:n kokoava rakenne. Merkit erottavat kokeellisen vaikutuksen, kokeen ilman merkitsevää muutosta, havaintoyhteyden, mallin liitoksen, ihmisen oman perhepäätöksen soveltumattomuuden ja tähän valikoimaan kuulumattoman kokeen. Ihmisen eläinten jalostus- ja hoitopäätöksiä ei tällä rajauksella suljeta pois. Tyhjä solu ei ole nollavaikutus. BERM-sarakkeen M-merkit eivät ole empiirisiä toistoja.

Lisäankkurit ovat [De Iuliis2009](https://doi.org/10.1371/journal.pone.0006446) (ihmisen siittiöiden RF-koe), [Chang2015](https://doi.org/10.1073/pnas.1418490112) (optinen valo), [Engels2014](https://doi.org/10.1038/nature13290) (punarinnan suunnistus, ei populaatiotrendi), [Mallinson2025](https://doi.org/10.1016/j.isci.2025.112550) (mehiläisen kukalle laskeutuminen muokatussa sähkökentässä), [Hayes2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC2842049/) (kynsisammakon lisääntymiskehitys, atratsiini 2,5 µg/l) ja [Davies2023](https://doi.org/10.1038/s41467-023-38070-y) (korallin kutuajankohdan yövaloyhteys). Kemiallinen lisääntymisvaikutus on näin mukana todellisena lajienvälisenä vaihtoehtona.

## Jatkohaku

Käyttäjän pyynnöstä sivuston evidenssisivuihin ja varsinaisiin altistuskokeisiin kohdistuva lisähaku jatkuu erillisessä `cross_species_followup.md`-muistiossa. Ensimmäisen tarkistuksen puuttuva historiallinen annosakseli ei korvaa tätä lisähakua.

## Toteutuksen varmennus

Komponentin ESLint läpäisi. Kaikki kolme palvelinkomponenttia renderöitiin FI/EN/JA/FR/KO-kielillä käyttäen varsinaista viiterenderöintiä ja rekisteriä: kaksi taulukkoa, yhteensä 12 taulukkoriviä, yksi avattava details-osuus, ei h2-otsikoita, raakaviitteitä tai tuntemattomia viitteitä. Sivun koko buildin ja selainvarmennuksen tekee päätehtävä.
