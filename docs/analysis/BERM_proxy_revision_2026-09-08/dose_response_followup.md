# Kenttäannos, siemenneste ja interventiot: alkuperäisaineistojen jatkohaku

Tarkistettu 8.9.2026. Rajaus: ihmisen, koiran ja hevosen siemennestemittarit, fysikaalisesti kuvattu altistus, farmakologinen paikannus sekä kuvaajaksi soveltuva alkuperäinen numerodata. Tämä on löydöksistä ohjautuva jatkohaku, ei systemaattinen katsaus tai kaikkien tutkimusten saatavuuskartoitus.

## Johtopäätös toteutusta varten

Kentän ja lisääntymisbiologian välille löytyi konkreettisempaa näyttöä kuin pelkkä lajien historiallisten trendien rinnastaminen: ihmisen siittiön RF-annossarja, saman solutyypin ELF-kenttä × mitokondriointerventio, hevosen RF-käsittelyn jälkeiset toiminta- ja redoxmittaukset sekä koiran mitattu ajallinen koesarja. Näistä voi rakentaa myönteisen kausaalisen koosteen, jossa kenttä voi muuttaa siittiön toiminnallista tilaa ja energiatalous/redox voi välittää vastetta. Suunta ja laajuus ovat altistus- ja tilakohtaisia.

Julkaisuissa on myös aitoja mekanismitason R²-lukuja. Niiden oikea käyttötapa on näyttää, mitä mitattiin samalla annossarjalla, eikä siirtää solunsisäistä korrelaatiota nimeämättä väestö- tai lajitasolle. Neljä De Iuliisin lukua on poimittu jäljempänä. Täydellistä yhden kokeen ketjua kentästä väestön syntyvyyteen ei tarvita komponenttisynteesin esittämiseen.

BERM-portti on rootissa tarkistettu: Lindgrenin geometrinen lähtökohta ja BERM:n ehdollinen `r_i = Xi_i[S](δg)` erotetaan. Alla oleva biologia voi paikantaa ehdollisen vasteen kohteita; se ei määritä avoimia gauge-, skaala-, kudos-, merkki-, viive- tai väestökalibrointeja. Mallista johdettu yhteinen mekanismi ja sitä tukevat osakokeet voidaan esittää vahvasti tämän erottelun sisällä.

## 1. Ihmisen RF-annossarja ja neljä todellista R²-lukua

[De Iuliis ym. 2009, DOI 10.1371/journal.pone.0006446](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0006446): puhdistetut ihmisen siittiöt, 1,8 GHz jatkuva kantoaalto, 16 h, 21 °C. SAR-portaat 0,4; 1,0; 2,8; 4,3; 10,1; 27,5 W/kg. SAR kalibroitiin lämpötilanousun avulla. Kuva 2 sisältää seuraavat täsmälliset arvot; virheet ovat SEM.

| Mittari, % | Kontrolli | 1,0 W/kg | Altistettu − kontrolli, prosenttiyksikköä |
|---|---:|---:|---:|
| Motiliteetti | 86 ± 2 | 68 ± 2 | −18 |
| Vitaliteetti | 89 ± 3 | 65 ± 1 | −24 |

Julkaisun omat regressiot:

| Kuva | X | Y | R² |
|---|---|---|---:|
| 3D | Mitokondrio-ROS, MSR | Kokonais-ROS, DHE | 0,823 |
| 4B | Mitokondrio-ROS | 8-OHdG | 0,727 |
| 5B | Mitokondrio-ROS | DNA-fragmentaatio | 0,861 |
| 5C | 8-OHdG | DNA-fragmentaatio | 0,725 |

Nämä ovat mekanismimittarien yhteisvaihtelua kenttäannossarjassa. Tutkimuksessa ei ollut RF × farmakologinen pelastus -haaraa. Koko SAR-sarjan numeeriset pisteet ovat kuvissa 2–5; tässä ei ole keksitty niiden välipisteitä tai käsitelty silmämääräistä lukemaa raakadatana.

[Vuoden 2013 korjaus](https://journals.plos.org/plosone/article?id=10.1371/annotation/9a8a0172-3850-4059-b852-72c330769c1b): kuvien 1–5 biologisten rinnakkaisten määrä on **3**, ei 4. Lisäksi kuvan 1D mitokondrio-ROS korjattiin: altistettu 28 ± 1 %, kontrolli 5 ± 1 %, p=0,0056. Korjaus ei ilmoita yllä oleville neljälle R²-luvulle uusia arvoja.

**Kuvaajatulkinta:** neljä R²-lukua tarjoavat konkreettista tukea mitokondrio-ROS → oksidatiivinen DNA-vaurio → fragmentaatio -koosteelle yhdessä altistusintervention ja muun komponenttikirjallisuuden kanssa. Samassa kokeessa on kuitenkin yhteinen annosmuuttuja, joten regressio yksin ei identifioi jokaista välittäjänuolta. Luvut eivät tarkoita, että 72–86 % väestön hedelmällisyyden muutoksesta olisi selitetty. Kahdesta yllä olevasta keskiarvosta ei kannata sovittaa suoraa ja julkaista sen mekaanista R²=1:tä.

## 2. Ihmisen RF: kokonainen julkaistu annos × aika -taulukko

[Falzone ym. 2008, DOI 10.1002/bem.20390](https://pubmed.ncbi.nlm.nih.gov/18163440/), [tekijän alkuperäinen käsikirjoitus PDF](https://repository.up.ac.za/bitstreams/a3059b02-7fa9-4056-9cfb-575822683f70/download), taulukko I, käsikirjoituksen s. 9. 12 luovuttajaa, kaksi annosta eri kerroilla; 900 MHz GSM, 0,577 ms pulssit / 4,615 ms jakso, 1 h. Soluannos 2,0 tai 5,7 W/kg; simulaatio varmennettiin lämpötilamittauksilla. Aika tarkoittaa **altistuksen päättymisestä**, ei kasvavaa altistusaikaa. Arvot keskiarvo ± SD.

| SAR, W/kg | Aika, h | Progressiivinen motiliteetti, altistettu % | Saman kokeen kontrolli % |
|---:|---:|---:|---:|
| 2,0 | 0 | 86,8 ± 9,33 | 87,2 ± 7,32 |
| 2,0 | 2 | 86,2 ± 7,69 | 84,6 ± 9,18 |
| 2,0 | 24 | 62,7 ± 15,14 | 65,7 ± 19,15 |
| 5,7 | 0 | 86,5 ± 7,44 | 86,8 ± 5,34 |
| 5,7 | 2 | 87,5 ± 8,56 | 86,1 ± 8,36 |
| 5,7 | 24 | 70,0 ± 14,51 | 65,0 ± 16,45 |

Kokonaismotiliteetin altistusvertailut p=0,899 / 0,935. Korkealla SAR:lla tulososa raportoi VSL:n p=0,05 ja BCF:n p=0,04; keskustelun VCL-maininta on ristiriidassa tulososan kanssa, jossa VCL p=0,093. Mitokondriopotentiaali ei muuttunut kentän vuoksi. Sen farmakologinen positiivinen kontrolli ei ollut kenttävasteen pelastuskoe.

**Kuvaajakäyttö:** kaksi rinnakkaista paneelia, x=0/2/24 h, y=progressiivinen motiliteetti, altistus ja kontrolli erikseen, SD-palkit. Tämä kuvaa myös vanhenemista viljelyssä. 24 tunnin laskua ei saa lukea kentän vaikutukseksi, kun se tapahtuu kontrollissakin. Eri annosten kontrolliarvoja ei korvata yhdellä keinotekoisella lähtötasolla. Paritettujen erojen SE/CI:tä ei voi palauttaa ryhmä-SD:istä ilman parikovarianssia.

## 3. Ihmisen ELF: aaltomuoto, intensiteetti ja mitokondriointerventio

[Iorio ym. 2007, DOI 10.1002/bem.20278](https://pubmed.ncbi.nlm.nih.gov/17019728/), alkuperäisabstrakti:

| Taajuus | Aaltomuoto | Amplitudi | Motiliteetti |
|---|---|---:|---|
| 50 Hz | Kanttiaalto | 2,5 mT | Ei merkitsevää muutosta |
| 50 Hz | Siniaalto | 5 mT | Ei merkitsevää muutosta |
| 50 Hz | Kanttiaalto | 5 mT | Parani |

Viimeisen ehdon vaste kehittyi ensimmäisen 3 tunnin aikana ja säilyi 21 h käsittelyn loputtua. Tämä on suora intensiteetin ja aaltomuodon erottelu; absoluuttisia motiliteettilukuja ei saatu abstraktista. Aaltomuototaulukko on julkaistavissa laadullisena interventiokarttana.

[Iorio ym. 2011, DOI 10.1002/bem.20602](https://pubmed.ncbi.nlm.nih.gov/20690107/), [tekijäyliopiston tietue](https://ricerca.univaq.it/handle/11697/4772): 50 Hz, 5 mT kanttiaalto ihmisen siittiöille. Mitokondriopotentiaali, ATP/ADP/NAD⁺-tasot ja kinematiikka kasvoivat. Mitokondrioiden oksidatiivisen fosforylaation irtikytkentä mClCCP:llä poisti stimuloivan vasteen glukoosia sisältävässä väliaineessa. Pyruvaatti/laktaatti-substraateilla vaste säilyi myös glykolyysiä estävän 2-deoksiglukoosin läsnäollessa. Tämä paikantaa kenttävasteen välitystä mitokondrioiden energiantuotantoon. Lääkepitoisuuksia ja tarkkaa interventioajoitusta ei tässä varmennettu kokotekstistä; niitä ei arvata. Sama tutkimusperhe kuin 2007.

**Koosteen arvo:** tämä suora ihmisen siittiön kenttä × interventio vahvistaa toiminnallista biologista siltaa enemmän kuin pelkkä toisesta kudoksesta tuotu mitokondriomekanismi. Paraneminen osoittaa myös, ettei kenttävasteella ole kaikissa protokollissa samaa haitallista merkkiä. BERM:n tilariippuvainen vastaanotto tarvitsee juuri tämän erottelun.

## 4. Koira: alkuperäinen 10 viikon RF-sarja

[Dong ym. 2022, DOI 10.3390/vetsci9050201](https://pmc.ncbi.nlm.nih.gov/articles/PMC9147188/), tulosjaksot 3.5.1–3.5.4. Seitsemän analysoitua urosta; ennen–jälkeen-asetelma ilman rinnakkaista shamryhmää. Kaksi puhelinta rinnalla, 1962–1966 MHz; 120 × 1 min saapuvan puhelun soittoa/vrk, 5 vrk/vko, 10 viikkoa. **0,96 W/kg on valmistajan laitteen SAR-tieto 1,5 cm:n mittausetäisyydellä, ei mitattu koiran kiveksen SAR.** Arvot keskiarvo ± SD.

| Viikko | Motiliteetti, % | Vitaliteetti, % | DNA:n eheys, % |
|---:|---:|---:|---:|
| 0 | 83,0 ± 2,7 | 80,2 ± 3,8 | 99,4 ± 1,7 |
| 5 | 80,0 ± 4,5 | 81,1 ± 3,2 | 99,8 ± 0,2 |
| 10 | 85,0 ± 7,1 | 80,3 ± 4,0 | 98,6 ± 1,1 |

Ei merkitseviä eroja. Siittiömäärän otsikko ja cells/mL-yksikkö ovat keskenään epätarkat, joten yllä käytetään yksiselitteisiä prosenttipäätemuuttujia. Lähde on suora koiran RF-koe, mutta annosgradienttia ei ole: x-akseliksi käy viikko, ei väitetty kumulatiivinen kudos-SAR.

[Leoci ym. 2014, DOI 10.1002/pros.22829](https://pmc.ncbi.nlm.nih.gov/articles/PMC4145661/): 20 BPH-koiraa, PEMF 5 min kahdesti päivässä 21 päivää. 4–12 Hz; laitteen pinnan amplitudi ±105 mT, jota ei rinnasteta RF-SAR:iin. Eturauhasen tilavuus väheni keskimäärin 57 %, mutta siemenneste, testosteroni ja libido eivät muuttuneet. Motiliteetti ennen/jälkeen 86,6 ± 5,3 / 87,0 ± 4,3 % (SD; p=0,508); testosteroni 634 ± 193 / 638 ± 196 ng/dl (SD; p=0,49). Tämä erottelee kentälle vastaavan verisuoni-/elinpäätemuuttujan ja samassa asetelmassa vakaan siemennestepäätemuuttujan. Ennen–jälkeen-pilotti; ei yleinen kliininen vaikutusarvio.

## 5. Hevonen: todelliset RF-osakokeet löytyivät

[Collodel ym. 2012, DOI 10.1016/j.repbio.2012.09.007](https://pubmed.ncbi.nlm.nih.gov/23153698/): *The effect of radio electric asymmetric conveyer treatment on sperm parameters of subfertile stallions: a pilot study*. 11 alentuneen hedelmällisyyden ja 4 hedelmällistä oritta. REAC-VNPPO-käsittelyn jälkeen edellisen ryhmän progressiivinen motiliteetti ja morfologia paranivat. Alkuperäisabstrakti ja bibliografinen tietue varmennettu. Tekijäjulkaisun kuvatekstissä kuvattu 2,4 GHz:n 100 × 0,5 s pulssiprotokolla / 4,5 s välit ja niska-anturi on hakuvihje; koko menetelmäosaa, kudosannosta ja mittausryhmiä ei tässä varmennettu. Siksi siitä ei rakenneta annoskuvaajaa tai hoitovaikutuksen tarkkaa kokoa.

[Berlinguer ym. 2017, DOI 10.1186/s12958-017-0229-6](https://pmc.ncbi.nlm.nih.gov/articles/PMC5299698/): *REAC technology as optimizer of stallion spermatozoa liquid storage*. Kokoteksti ja kuvatekstit varmennettu. Kahdeksan oritta, kaksi ejakulaattia/oris=16; paritetut alinäytteet, 4 °C, 0/24/48/72 h. REAC-VIVSI 2,4 GHz, väliaineeseen upotetut elektrodit; hoito- ja kontrollinäytteet eri jääkaapeissa. SAR/intensiteettiä ei ilmoiteta menetelmissä. Akrosomin ja DNA:n eheys säilyivät paremmin; SOD/TEAC kasvoivat, lipidiperoksidaatio pieneni. Kokonaismotiliteetti/vitaliteetti eivät parantuneet. Kuvissa 1–6 keskiarvo ± SE; raakadatataulukkoa ei löytynyt. Abstraktin ja joidenkin kuvatekstien p>-merkit ovat ristiriidassa tulostekstin merkitsevyyskuvauksen kanssa. 2012/2017 kuuluvat samaan REAC-tutkimusperheeseen.

**Kuvaajakäyttö:** tutkimuksen 2017 kuvat 3–6 voivat tuottaa aikaan sidotun akrosomi/DNA/redox-paneelin, jos pisteet digitoidaan erikseen ja ilmoitetaan arvioiduiksi. Tässä niitä ei ole digitoitu. Vertailun yksikkö on ejakulaatti paritettuna saman orin sisällä, eikä 16 tarkoita 16 riippumatonta oritta. REAC on aktiivinen RF- ja elektrodikäsittely; sitä ei nimetä Wi-Fi-kokeeksi 2,4 GHz:n perusteella.

## 6. Farmakologisten gradienttien täydentävä aineisto

### Suora kenttä × lääke ja kohdegenetiikka

[Jimenez ym. 2019, DOI 10.1016/j.ebiom.2019.05.034](https://pmc.ncbi.nlm.nih.gov/articles/PMC6604666/) on aiemmassa farmakologia-auditissa kokotekstistä varmennettu. Ihmisen Huh7/Hep3B-maksasyöpäsolut, 27,12 MHz AMRF, 30/400 mW/kg viljelyssä; HCC-modulaatio, satunnaismodulaatio ja sham. Etosuksimidi 0,5 mM Ca-kokeessa / 1 mM kasvukokeessa, amlodipiini 1 µM Ca-vertailussa, BAPTA 100 µM sekä CACNA1H-vaimennus. Kenttävaste riippui CaV3.2/Ca-välityksestä. Kuva 5 sopii interventioankkuriksi, mutta mainitut kaksi etosuksimidipitoisuutta ovat **eri päätekokeiden annoksia**, eivät sellaisenaan yhden annosvastekäyrän kaksi pistettä. Tämä on kudoksen komponenttinäyttöä, ei ihmisen siemennestekoe.

[Buckner ym. 2015, DOI 10.1371/journal.pone.0124136](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0124136): B16-BL6-solut, 25→6 Hz, 2–10 µT, 1 h/vrk, 3–5 vrk; sham ja käänteinen aaltomuoto. Päivän 5 kasvunesto 48 ± 7 % pieneni T-painotteisilla estäjillä alle 5 %:iin; L-estäjillä jäi 38–43 %. Kuvissa 5–6 on suora interventiovertailu. Bay K8644 5 µM:n nopea Ca-nousu ei tuottanut samaa kasvunestoa. Estäjien muita pitoisuuksia ei aiemmassa kokotekstipoiminnassa saatu varmistettua. Ryhmäluokat ja likimääräiset vaikutuskoot voi esittää, mutta `<5` tai vaihteluväliä ei muuteta täsmälliseksi datapisteeksi. Ei siemennestekoe.

### Ihmisen siittiön farmakologinen annosgradientti ilman kenttää

[Assalve ym. 2026, DOI 10.3390/jox16010031](https://pmc.ncbi.nlm.nih.gov/articles/PMC12922021/), *Effects of Pharmacological and Agrochemical Endocrine Disruptors on Human Sperm Mitochondrial Respiration: Evidence from Ex Vivo Bioenergetic Profiling*. Kymmenen luovuttajan näytteitä yhdistettiin pooleiksi; neljä koetoistoa, ei kymmenen itsenäistä luovuttajakohtaista vaikutusarviota. 0,1/1/10/100/1000 nM, 1 h, 37 °C; 1 % DMSO-kontrolli. NADH/CCCP-vertailut ja bikalutamidi/2OH-FTA muuttivat hengityskytkentää. Bikalutamidin lepohengitys V4 nousi tekijöiden mukaan noin 35 % 10 nM:ssa ja noin 80 % 1000 nM:ssa. Nämä ovat tekstin likimääräisiä arvoja; kuvan 2 pisteitä/SD:tä ei poimittu. Taulukon 2 tarkat RCR-arvot koskevat agrokemikaaleja, eivät näitä lääkkeitä. Tutkimuksessa ei ollut kenttää eikä RF-rescue-koetta. Lääkeaineiden nimeämisessä on myös 2OH-FTA:n nimimuotovaihtelua, joten ainetunniste varmistetaan ennen erillistä annoskuvaajaa.

**Yhdistämisperiaate:** suoran kenttä × intervention ja kentättömän mekanismikokeen voi yhdistää kausaaliseksi synteesiksi, kun yhteys nimetään. Kuvatekstin pitää kertoa kumpaan koeasetelmaan piste kuuluu. Lääkepitoisuus nM/µM, magneettivuontiheys mT ja SAR W/kg eivät ole keskenään muunnettavia yhden altistusasteikon arvoja.

## 7. Suoraan koneella luettavat numeropoiminnat

Alla on julkaisun taulukosta tai tekstistä tarkasti poimittuja aggregaatteja, **ei yksilötason raakadataa**. Yllä olevat DOI:t, koeasetelmat ja virhepalkkien lajit kuuluvat jokaiseen sarjaan. `control` ei tarkoita varmennettua absoluuttista 0 W/kg:n ympäristöä.

```csv
study,endpoint,time_after_exposure_h,exposure_group_sar_W_kg,arm,mean_percent,sd_percent,n_donors
falzone2008,progressive_motility,0,2.0,exposed,86.8,9.33,12
falzone2008,progressive_motility,0,2.0,control,87.2,7.32,12
falzone2008,progressive_motility,2,2.0,exposed,86.2,7.69,12
falzone2008,progressive_motility,2,2.0,control,84.6,9.18,12
falzone2008,progressive_motility,24,2.0,exposed,62.7,15.14,12
falzone2008,progressive_motility,24,2.0,control,65.7,19.15,12
falzone2008,progressive_motility,0,5.7,exposed,86.5,7.44,12
falzone2008,progressive_motility,0,5.7,control,86.8,5.34,12
falzone2008,progressive_motility,2,5.7,exposed,87.5,8.56,12
falzone2008,progressive_motility,2,5.7,control,86.1,8.36,12
falzone2008,progressive_motility,24,5.7,exposed,70.0,14.51,12
falzone2008,progressive_motility,24,5.7,control,65.0,16.45,12
```

SAR-sarakkeen arvo identifioi paritetun altistuskokeen myös kontrollirivillä; se ei ole kontrollisolujen SAR.

```csv
study,endpoint,exposure_hours,arm,mean_percent,sem_percent,n_biological_replicates
iuliis2009,motility,16,control_for_1_W_kg,86,2,3
iuliis2009,motility,16,exposed_1_W_kg,68,2,3
iuliis2009,vitality,16,control_for_1_W_kg,89,3,3
iuliis2009,vitality,16,exposed_1_W_kg,65,1,3
```

```csv
study,week,endpoint,mean_percent,sd_percent,n_dogs
dong2022,0,motility,83.0,2.7,7
dong2022,5,motility,80.0,4.5,7
dong2022,10,motility,85.0,7.1,7
dong2022,0,vitality,80.2,3.8,7
dong2022,5,vitality,81.1,3.2,7
dong2022,10,vitality,80.3,4.0,7
dong2022,0,dna_integrity,99.4,1.7,7
dong2022,5,dna_integrity,99.8,0.2,7
dong2022,10,dna_integrity,98.6,1.1,7
```

## 8. Sivuston historiallisten lajivertailujen lähderajaus

Nykykorpuksesta löytyi tunnisteiltaan avoimia rivejä `lerch2017-horse-fertility`, `kelley2019-dog-fertility` ja `harris2023`. Niiden nimistä tai vanhoista findings-teksteistä ei tässä voitu palauttaa dokumentoitua hevosen/koiran kudos-EMF-annosta. Tämä havainto koskee näiden lähderivien todentamista; se ei tarkoita, ettei hevosesta tai koirasta olisi kenttäkokeita. Yllä on molemmista alkuperäistutkimuksia.

Todellinen [Lea ym. 2016, DOI 10.1038/srep31281](https://doi.org/10.1038/srep31281) on koiran pitkän motiliteettitrendin ja kemikaalikokeiden lähde. Se ei anna historiallista koiran EMF-annossarjaa. Historia ja kokeet voidaan kytkeä mallin tulkinnassa, kun niiden välinen annoshistorian silta nimetään BERM:n koostamaksi eikä tutkimuksessa mitatuksi.

Sivulle sopiva positiivinen rakenne on: **lajien yhteiset biologiset vastekohteet → saman kohteen suorat kenttäkokeet → interventioilla paikannetut välittäjät → historiallisten trendien tulkinta**. Tämä näyttää yhdistävän selityksen lisäarvon. Jos historiallinen täydellinen korrelaatio perustuu jälkikäteen annettuihin altistuspisteisiin, uuden primaaritutkimuksen löytyminen ei muuta juuri noita pisteitä mitatuksi annokseksi; mallipisteet pitää näyttää mallipisteinä. Yllä olevat aidot numerot antavat niiden rinnalle täsmällisen, paremmin tarkastettavan empiirisen esitystason.

## 9. Löydöksistä ohjautunut hakuloki

| Laukaisin | Kysymys / hakutermit | Löydös | Muuttunut avoin kohta |
|---|---|---|---|
| Lajivertailun hevonen/koira-viitteet ilman yksilöiviä tunnisteita | Canonical JSON: horse, stallion, canine, dog, semen sekä nykyiset DOI:t | Avoimet trendirivit; Lea2016 löytyi | Historiallista annosasteikkoa ei voi palauttaa nimistä; haettava oikeita kenttäkokeita |
| Ei vielä suoraa koirakoetta | `canine dog sperm semen radiofrequency electromagnetic field exposure study` | Dong2022, avoin kokoteksti | On suora RF-aikasarja; kohdekudos-SAR ja sham jäävät puuttumaan |
| Ensimmäinen hevoshaun tulos optista valoa | `horse stallion sperm semen electromagnetic magnetic field exposure motility study`; `"horse" "radiofrequency" sperm`; `"stallion" "magnetic field"` | REAC2012 ja optinen siittiökirjallisuus | Hevosesta on RF-tekniikan tutkimus, vaikka sanaa EMF ei käytetä otsikossa |
| REAC2012:n pilotti | `"stallion" "REAC" sperm study`; `"radio electric asymmetric" "stallion"` | Berlinguer2017 avoin kokoteksti | Saadaan saman ejakulaatin redox/DNA/aikasarja; annoksen tarkka fysikaalinen asteikko jää avoimeksi |
| Koiran veri-/elinpäätemuuttujan kenttäriippuvuus | `"canine" "magnetic field" "sperm"` | Leoci2014 PEMF/BPH | Vaste voi eriytyä päätemuuttujittain; mT ei muutu RF-SAR:ksi |
| De Iuliisin annossarja | Alkuperäis-PLOS ja korjaus, kuvien 2–5 sekä `correlation`-haku | Täsmällinen 1 W/kg motiliteetti/vitaliteetti ja neljä R²-lukua | Mekanismikorrelaatiot palautettavissa; kaikkien annospisteiden raakadata ei saatavilla tekstitaulukkona |
| Tarve toiselle numeeriselle RF-protokollalle | `Falzone 2008 900 MHz sperm 2 5.7 PDF` | Tekijän yliopistoarkiston koko PDF, taulukko I | Aito 12-rivinen annos × aika × kontrolli -taulukko; VSL/VCL-sanavirhe huomattu |
| Suora ihmisen siittiön välittäjäinterventio | `Iorio 2011 20602 pdf`, 2007 alkuperäinen otsikko | 2007 aaltomuoto/intensiteetti; 2011 mitokondrio- ja substraatti-interventiot | Mekanismisilta löytyy samasta solutyypistä; lääkkeiden tarkat pitoisuudet yhä avoimet |
| Farmakologisen pitoisuusgradientin tarkka taulukko | Human sperm mitochondrial respiration / pharmacological dose -haku | Assalve2026, kuvat 1–3 ja taulukko 2 | Pitoisuusvaste on olemassa mutta kentätön; lääkeaineiden luvut kuvissa, ei numerotaulukossa |

Tietueet tarkistettiin PubMedistä/Europe PMC:n `resultType=core`-tietueista; avoimet kokotekstit myös Europe PMC `fullTextXML`-rajapinnasta. PMC:n selaus antoi ajoittain CAPTCHA:n ja MDPI429:n; nämä eivät estäneet OA-XML:n lukemista. Falzone luettiin yliopistoarkiston alkuperäisestä PDF:stä `pdftotext -layout`-poiminnalla. Pelkkä Europe PMC:n yksittäinen TITLE_ABS-haku ei löytänyt kaikkia REAC- tai monikollisia dogs-osumia, minkä vuoksi käsitteitä ja tekniikkanimiä laajennettiin. Katsaukset toimivat vihjeinä, eivät taulukkoarvojen lähteinä.

Optiset hevosen siittiökokeet ja ionisoivan säteilyn tutkimukset jätettiin tämän ei-optisen annosvertailun ulkopuolelle. Niiden tutkimustyyppiä ei sulautettu RF-kokeisiin. Tässä auditissa ei lisätty kanonisia lähteitä. Rootin jatkopyynnöstä `ProxyMechanismEvidence`-komponenttiin lisättiin Iorio2011:n suora siittiöinterventio ja De Iuliisin kaksi solunsisäistä R²-lukua; uusi lähde-ehdotus on tiedostossa `dose_followup_references.json`.
