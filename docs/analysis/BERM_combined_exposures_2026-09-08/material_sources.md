# Materiaali, puhelin, iho ja yhteiskentät: alkuperäislähdeauditointi

8.9.2026. Lähtöaineisto on käyttäjän v2.0-liite `0b7b7067-2c32-4336-86f5-04aad072b9dd/pasted-text.txt`. Rajaus alkaa saman kansion `DERIVATION.md`:stä: geometrinen ristiosa on johdettu, biologinen `Ξ[S]`-liitos on ehdollinen ja sen skaala, gauge, kudosvaste sekä ihmisen päätemuuttujien kalibrointi ovat avoimia. Alla olevat lähteet vahvistavat omia fyysisiä, sensorisia, kemiallisia tai lisääntymisbiologisia osiaan. Ne eivät takautuvasti vahvista L0–L2:ta.

## Vahvin toteutettava synteesi

**Materiaali vaikuttaa siihen, mitä vastaanottajalle saapuu, ja vastaanottajan tila siihen, mitä saapuvasta syötteestä seuraa.** Tälle rakenteelle on mitattuja osia: tekstiilin pintavaraus, puhelimen ja kehon etäisyys, välissä olevan erikoismateriaalin vaikutus SAR:iin, karvoituksen ja kosteuden vaikutus sähkökentän havaitsemiseen sekä hoitokonfiguraation vaikutus spermatogeneesiin. Materiaalikoostumus voi lisäksi kuulua kemiallisen altistumisen reittiin. Näitä voidaan yhdistää BERM:n ehdolliseksi reittikartaksi ilman keksittyä yleistä vahvistuskerrointa.

Kaavatasolla sopiva siirtorakenne on `a_tissue(f,x,t) = T_M(f,x,geometry,moisture,contact) a_device + a_other`. Materiaalin vaikutus esitetään tilasta ja geometriasta riippuvana operaattorina. Liikkeen synnyttämä pintavaraus kuvataan omilla suureillaan, esimerkiksi `Q(t)`, `V(t)` ja paikallinen `E(t)`; näitä ei lasketa yhteen SAR:n kanssa. Kemiallinen annos tulee erillisen kulkeutumisreitin kautta `C_tissue(t)`, ja lämpötila omana suureenaan. BERM:n vasteoperaattori kokoaa näiden vaikutuksen vastaanottotilaan. **Yhteinen vastekohta ei anna lupaa kertoa saman kalsium/redox-reitin vahvistuksia keskenään useaan kertaan.**

## 1. Ihon 42-kertainen tulos on kemiallinen mittaus

**`feldmann1967_skin_penetration` — Feldmann ja Maibach 1967**, DOI [10.1038/jid.1967.29](https://doi.org/10.1038/jid.1967.29). Alkuperäisen taulukon I kivespussivertailussa oli kolme miestä. Ihon 13 cm² alueelle levitettiin 0,06 mg hydrokortisonia, johon liittyi 5 µCi ¹⁴C-merkkiainetta, 0,1 ml:ssa asetonia. Virtsa kerättiin viiden vuorokauden ajalta. Kivespussialueen 36,2 %:n merkkiainepalautumaa verrattiin saman vertailun kyynärvarren 0,86 %:iin: suhteeksi raportoitiin 42.

Luku tukee **kehoaluekohtaisen kemiallisen imeytymisen** erottelua. Se ei mittaa sähkönjohtavuutta, permittiivisyyttä, ihon paksuutta, sähköistä tunkeutumissyvyyttä tai RF-annosta. Liitteen päätelmät ”42× ohuempi”, ”42× vähemmän resistiivinen” ja `K_anatominen=42` EM-vasteelle eivät seuraa kokeesta. Spermatogoniat eivät myöskään sijaitse kaikkialla vakioetäisyydellä 2 mm ihon pinnasta; sitä lukua ei käytetä siirtomallissa.

Iyer ym. 2017 on todellinen [testosteronivoiteen farmakokineettinen koe](https://pubmed.ncbi.nlm.nih.gov/28334510/), ei vain liitteessä nimetty toissijainen verkkokatsaus. Kolme satunnaistetussa järjestyksessä annettua kivespussiannosta olivat 12,5/25/50 mg; testosteronihuippu saavutettiin 1,9–2,8 tunnissa. Tämä vahvistaa steroidikuljetuksen reittiä. Asetelma ei ollut suora satunnaistettu kivespussi–muu iho -vertailu eikä EM-siirtomittaus.

## 2. Tekstiilin pintalukema ja spermatogeneesikoe ovat eri tutkimukset

**`shafik1992`** säilyttää nykyisen kanonisen ID:n: [Shafik, Ibrahim ja El-Sayed 1992](https://doi.org/10.1111/j.1439-0272.1992.tb02628.x), 21 miestä kolmessa seitsemän hengen ryhmässä. Polyesteri, puuvilla ja niiden 50:50-seos tuottivat erilaiset tekstiili–iho-rajapinnan lukemat. Pääte oli sähköstaattinen pintamittaus, ei atsoospermia. Historiallinen `V/cm²` on fysikaalisesti alimääritetty yksikkö: siitä ei tehdä voltteja, V/m-arvoa, varaustiheyttä tai sisäistä kudosannosta.

**`shafik1992_sling`** säilyttää nykyisen ID:n: [Shafik 1992, Contraception](https://pubmed.ncbi.nlm.nih.gov/1623716/), 14 miestä käytti polyesteristä kivespussikannatinta 12 kuukautta. Atsoospermia saavutettiin keskimäärin **139,6 ± 20,8 vuorokaudessa**, ei 14 kuukaudessa. Lähtöpitoisuus palautui keskimäärin **156,6 ± 14,8 vuorokaudessa** käytön lopettamisen jälkeen. Myös kivesten tilavuus ja peräsuoli–kives-lämpötilaero muuttuivat. Hormoneissa ei havaittu merkitsevää muutosta. Kirjoittaja ehdotti sekä sähköstaattista että lämmönsäätelyyn liittyvää mekanismia.

**`moeloek1995_sling` — Moeloek 1995**, [riippumaton Indonesia-tutkimus](https://doi.org/10.13181/mji.v4i4.920): 15 seulotusta miehestä valittiin 10; kuukauden lähtöseurannan jälkeen kannatinta käytettiin yötä päivää 24 viikkoa. Kaikki saavuttivat alle 20 miljoonan/ml pitoisuuden, **yksikään ei saavuttanut atsoospermiaa**. Morfologia ja nopeus heikkenivät; liikkuvien osuus ja siemennesteen tilavuus eivät muuttuneet merkitsevästi. Tutkimus toistaa suppressiota osittain, joten ”ei itsenäistä replikaatiota” on virheellinen. Lämmön, tuennan ja sähköisyyden osuuksia ei erotettu; vastetta ei nimetä yksinomaan materiaalin sähkövaikutukseksi tai etniseksi eroksi.

## 3. Harvardin alusvaatetutkimus paikantaa koontimuuttujan

**`minguez2018_underwear` — Mínguez-Alarcón ym. 2018**, [alkuperäinen tutkimus](https://pmc.ncbi.nlm.nih.gov/articles/PMC6530653/), DOI 10.1093/humrep/dey259. Ensimmäinen tekijä on Mínguez-Alarcón; Chavarro on viimeinen. Havainnoivassa hedelmällisyysklinikan aineistossa oli 656 miestä ja 1 186 siemennestenäytettä. Boksereita pääosin käyttäneillä (345 miestä) raportoitiin 25 % suurempi siittiöpitoisuus, 17 % suurempi kokonaismäärä ja 14 % matalampi FSH.

Tutkimus kysyi alusvaatteen **tyyliä**, ei mitannut materiaalia, paikallista kenttää tai lämpötilaa. Tekijät nimeävät materiaalikoostumuksen ja päällyshousut mahdollisiksi jäljelle jääviksi sekoittaviksi tekijöiksi. Tämä on käyttökelpoinen proxy masking -esimerkki: ”alusvaatetyyppi” jättää istuvuuden, lämmön, materiaalin ja kontaktin osuudet jakamatta. Se ei itsessään osoita, että puuttuva osuus olisi sähköinen.

## 4. Yhteiskenttä muuttaa todellista havaintokynnystä

**`petri2017_static_review` — Petri ym. 2017** on [systemaattinen katsaus](https://pmc.ncbi.nlm.nih.gov/articles/PMC5393013/) kahdeksaan ihmistutkimukseen ja 40 selkärankaistutkimukseen. Liitteessä siitä tehtiin uusi DC+RF-koe. Katsauksen tulkinta painottaa ihon ja karvojen mekaanista aistiärsytystä. Se ei vahvista sisäistä VGCC-esijännitystä.

Parempi suora lähde on **`kursawe2021_combined_fields` — Kursawe ym. 2021**, [kaksoissokkoutettu koe](https://pmc.ncbi.nlm.nih.gov/articles/PMC8380375/), 203 osallistujaa. Jankowiak on tässä viimeinen tekijä; saman ryhmän Jankowiak 2021 oli 11 hengen esitutkimus. Taulukon 3 signaalinilmaisuteoriaan perustuvat arvot 50 %:n kosteudessa:

| Altistus | Keskimääräinen havaintokynnys | SD | Kelvollinen kynnys, n |
|---|---:|---:|---:|
| Staattinen E | 18,69 kV/m | 8,42 | 165 |
| 50 Hz E | 14,16 kV/m | 7,96 | 175 |
| Yhdistelmä | **DC 6,76 kV/m + vakio AC 4 kV/m** | DC-osalle 6,26 | 168 |

Hybridin 6,76 ei ole yhdistelmän kokonais-RMS. Osajoukot eroavat, koska jokaiselle osallistujalle ei saatu kynnysarvoa. Kuvaaja voi näyttää nämä protokollat rinnakkain, kun kiinteä AC-komponentti näkyy. Tämä on suoraa yhteisvaikutusnäyttöä **tietoiselle sähkökentän havaitsemiselle**, ei RF-synergian tai lisääntymisvaurion kerroin.

**`jankowiak2026_hair_perception` — Jankowiak ym. 2026**, [interventio](https://pmc.ncbi.nlm.nih.gov/articles/PMC13171872/), 30 tervettä 18–35-vuotiasta, tukee vastaanottopinnan merkitystä. Pään, käsivarsien ja parran ajelu heikensi havaintosuoritusta. DC- ja hybridikynnysten nousu oli merkitsevä, AC-kynnysten vertailu ei (p ≥ 0,13). Kosteuden vaikutussuunta riippui kenttätyypistä. Tämä vahvistaa ehdollisen vastaanoton rakennetta; saman Aachenin tutkimusperheen tutkimuksia ei lasketa riippumattomiksi laboratorioiksi.

## 5. Stokastinen vahvistus: malli ja suora kanavakoe

[Kruglikov ja Dertinger 1994](https://pubmed.ncbi.nlm.nih.gov/7880167/) käsittelevät stokastista resonanssia mahdollisena heikkojen signaalien vahvistajana. **`galvanovskis1997_stochastic` — Galvanovskis ja Sandblom 1997**, [Biophysical Journal](https://pmc.ncbi.nlm.nih.gov/articles/PMC1181210/), johtaa ja simuloi kahden tilan kanavapopulaatiota. Tekijä ei ole Bhargava. Kumpikaan ei ole vaate-ELF × puhelin-RF × ihmisen VGCC -koe.

Positiivinen alkuperäinen koe on **`bezrukov1995_ion_channel_noise` — Bezrukov ja Vodyanoy 1995**, [Nature](https://pubmed.ncbi.nlm.nih.gov/7477370/). Alametisiinin muodostamissa jänniteriippuvaisissa kanavissa ulkoinen kohina paransi signaalinsiirtoa noin satakertaisesti ja kasvatti myös ulostulon signaali–kohinasuhdetta. Kyse on nimetyn kalvojärjestelmän signaalista; kanavat eivät ole neuronaalisia VGCC:itä eikä signaali matkapuhelimen RF.

BERM:n liitos on ehdollinen: kanavakinetiikka ja kohina voivat muuttaa vastaanottoa. RF-kantoaallon muuttuminen kanavan relevantiksi matalataajuiseksi signaaliksi, tekstiilin kohinaspektri ja sisäinen amplitudi tarvitsevat erillisen liitoksen. Stokastinen kohina ja deterministinen esijännite eivät ole identtinen mekanismi, vaikka ne voivat vaikuttaa samaan kanavaan. Ne eivät ole kaksi itsenäisesti kerrottavaa vauriokerrointa.

## 6. Materiaalin ja puhelimen siirto: todelliset mittaukset

**`kang2002_pocket_sar` — Kang ja Gandhi 2002**, [Physics in Medicine and Biology](https://pubmed.ncbi.nlm.nih.gov/12502051/): neljä puhelinta 835/1900 MHz, rintakehämalli ja tasofantomi. Laskettu ja mitattu 1 g/10 g SAR vastasivat toisiaan noin ±10 %:n sisällä 2–8 mm etäisyyksillä. Vanhassa asetelmassa taskuasennon SAR oli 2–7 kertaa vertailupäämallin SAR. Tämä osoittaa **geometrian ja etäisyyden** merkityksen, ei kiveksen nykyannosta tai kuitutyypin vakioista kerrointa.

**`miclaus2017_fabric_phone_sar` — Miclăuş ym. 2017**, [alkuperäinen PDF](https://reference-global.com/download/article/10.1515/raft-2017-0039.pdf): todellinen Samsung GT-I9195I, GSM 897,6 MHz ja UMTS 1950 MHz, maksimilähetysteho ohjattuna tukiasemasimulaattorilla. Magneettisista mikrolangoista valmistettu kangas asetettiin puhelimen ja pääfantomin väliin 1/2/4 kerroksena kahteen suuntaan. SAR riippui asetelmasta; lisäkerros ei aina pienentänyt arvoa.

Tämä on suoraa materiaali × puhelin -siirtonäyttöä erikoisvalmisteiselle kankaalle. Tavallinen polyesteri tai puuvilla ei ole sama materiaali kuin antennin johde, maataso tai magneettinen suojakangas. Pelkkä suhteellisen permittiivisyyden järjestys ei määrää kerrosrakenteen SAR:n merkkiä: mukaan kuuluvat kompleksinen permittiivisyys, häviöt, kosteus, paksuus, ilmarako, taajuus, antennin sovitus ja laitteen tehonsäätö. Liitteen `K_polyesteri > K_ilma > K_puuvilla` ei ole osoitettu yleinen mittaustulos.

## 7. Mikromuovilöydös kuuluu kemialliseen materiaalireittiin

**`hu2024_testis_microplastics` — Hu ym. 2024**, [alkuperäistutkimus](https://pmc.ncbi.nlm.nih.gov/articles/PMC11285152/): **23 ihmisen ja 47 koiran** kivesnäytettä, 12 analysoitua polymeerityyppiä. Keskimääräinen kokonaispitoisuus oli ihmisellä 328,44 ja koiralla 122,63 µg/g. Lisääntymiselinten painon ja siittiömäärän yhteydet tutkittiin koirilla. Ihmisaineisto ei ollut 47 miehen siemenneste- tai hedelmällisyyskoe.

Liitteen ”Zhao 2024, N=47 ihmistä” yhdistää eri lähteitä. [Zhao ym. 2023](https://pubmed.ncbi.nlm.nih.gov/36948312/) keräsi kuusi ihmisen kives- ja 30 siemennestenäytettä. Polymeerimassa, hiukkasmäärä, kulkeutumisreitti ja biologinen vaikutus pidetään erillään. Kudoshavainto tukee materiaaliperäisen kemiallisen reitin käsittelyä; se ei osoita, että kyseinen kuorma olisi peräisin alusvaatteista tai että sähköstaattinen kenttä olisi kuljettanut sen ihoon.

## 8. ICR ja monimekanismisynteesi

**`greco2025_resonant_convergence` — Greco ja Jia**, [Resonant Convergence](https://pmc.ncbi.nlm.nih.gov/articles/PMC12785707/), julkaistu verkossa 31.12.2025, lehden tammikuun 2026 numero: **narratiivinen katsaus ja yhdistävä malli**. Se ei ole uusi ICR/VGCC/QED-yhteiskoe. Konvergenssi yhteiseen kalsium–kalmoduliinivaiheeseen on mallinnusehdotus, ei todiste siitä, että jokainen nimetty mekanismi olisi aktiivinen jokaisessa kudoksessa.

Vapaan ionin `f_c = q B₀ / (2πm)` antaa nimellisessä 50 µT kentässä Ca²⁺:lle noin 38 Hz. Lasku koskee magneettista `B₀`:aa; tekstiilin tribosähköinen `E(t)` ei ole suoraan vastaavan biologisen ICR-protokollan vaihteleva magneettikenttä. E/B-komponentit, suunta, välittyminen, taajuus ja väliaineen dynamiikka on nimettävä ennen liitosta. Vaatteen liikkeestä ei ole tässä lähdepaketissa mitattua 10–100 Hz spektriä, jonka amplitudi voidaan siirtää kudoksen ICR- tai VGCC-kokeeseen.

## 9. Yhteiskentille on standardeissa summasääntöjä

**`icnirp2020`**, [virallinen ohje](https://www.icnirp.org/cms/upload/publications/ICNIRPrfgdl2020.pdf), s. 496–500, sisältää nimenomaisen samanaikaisen monitaajuusaltistuksen osion ja yhtälöt 1–7. Esimerkiksi koko kehon SAR:lle tarkistetaan `Σ SAR_i / SAR_BR ≤ 1`; lämpövaikutus ja sähköinen stimulaatio käsitellään erikseen asianmukaisilla paikka- ja aikakeskiarvoilla. Väite ”jokainen lähde arvioidaan vain erikseen, eikä yhdistelmäohjetta ole” korjataan.

BERM:n lisätehtävä voidaan silti sanoa suoraan: **fysikaalisten annosten yhteenlasku ja vastaanottotilasta riippuvan farmakologisen tai biologisen yhteisvaikutuksen selittäminen ovat eri tehtäviä**. Näissä lähteissä ei ole yleistä OC × tavallinen tekstiili × puhelin -biologista kerrointa. Tämä ei poista mitattujen osaliitosten näyttöarvoa.

## Sivun toteutuksen tarkat korjaukset

- Näytä 42 erillisessä **kemiallisen imeytymisen** kuvassa, ei ihmishahmon EM-vahvistuskertoimena.
- Erota `V`, `V/m`, `µT`, `W/kg`, `°C` ja `µg/g`; liitteen V/cm² jää historialliseksi pintalukemaksi.
- Näytä Kursawen hybridissä sekä DC- että AC-komponentti; säilytä kynnyksen aistipääte.
- Nimeä Shafikin kokoonpano pitkäaikaiseksi kannattimeksi, ei kaikkien polyesterialusvaatteiden annosvasteeksi. Sisällytä Moeloekin osittainen toisto.
- Puhelimen taskusijainti, erikoistekstiilin siirto ja tavallisen materiaalin vaikutus ovat eri havaintoja. Taskun tyypilliseksi kives-SAR:ksi ei aseteta 0,5–2 tai 1–4 W/kg.
- Säilytä yksi materiaalihaara: sama materiaali voi muuttaa siirtoa, varausta, lämpöä ja kemiallista kuormaa. Materiaali × puhelin on yhteisvaikutus, ei neljäs riippumaton altiste.
- Korvaa yleinen ”yhdistelmät ovat aina suurempia kuin summa” nimetyillä yhteisvaikutuksilla ja niiden vasteasteikolla. Merkki ja suuruus ovat systeemikohtaisia.

## Hakuketju ja tarkistuksen laajuus

Liitteen nimien auditointi käynnisti kohdennetut haut `Petri 2017 combined static alternating electric fields perception 50 Hz`, `Galvanovskis 1997 stochastic`, `Polyester sling scrotal cover Indonesian men`, `Feldmann Maibach 1967 42 hydrocortisone`, `Microplastic presence dog human testis Hu 2024`, `mobile phone SAR cotton polyester fabric phantom` ja `ICNIRP simultaneous 2020 frequencies`. Petri johti Kursawen ja Jankowiakin alkuperäiskokeisiin; malliviitteet johtivat Bezrukovin kanavakokeeseen; wearable-antenna-yleistys johti oikean puhelimen phantom- ja tekstiilimittauksiin; Shafik johti Moeloekin toistoon.

JSONissa on 15 valittua tietuetta, kolme erikseen auditoitua liiteviitettä ja neljä koneellisesti luettavaa määrällistä aineistolohkoa. `shafik1992`, `shafik1992_sling` ja `icnirp2020` käyttävät nykyisiä ID:itä. PDF- ja XML-tekstit tarkistettiin alkuperäisistä julkaisuista, tekijän lataamasta alkuperäisestä tai primaarista PubMed-tiivistelmästä; tietueet ilmaisevat tarkistuslaajuuden. Katsauksia ei ole merkitty alkuperäiskokeiksi. Yhteisiä rekistereitä, sivua tai Python-mallia ei muutettu.
