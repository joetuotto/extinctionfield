# BERM: syndroomien, mekanismien ja olemassa olevan tutkimusnäytön integraatioauditointi

8.9.2026 · Mallin ja Extinction Field -sivuston nykytila, kirjallisuussynteesi ja päivityskartta

## Keskeinen tulos

**Useita aiemmin puuttuviksi kuvattuja yhteyksiä voidaan jo rakentaa julkaistuista tutkimuksista ja aineistoista.** Käytettävissä on geenimuutoksen paikantamia mekanismeja, saman toiminnon korjaus- ja ohituskokeita, kenttäaltistuksissa mitattuja fysiologisia välivaiheita sekä avoimia aikasarjoja. Tämän kehitysvaiheen tehtävä on niiden järjestelmällinen koostaminen BERM:n nykyiseen rakenteeseen.

Mallin parsimoniaa vahvistaa erityisesti se, että samat säätelyn osat toistuvat eri kudoksissa: kalvon sähköinen portitus, solunsisäisen kalsiumvaraston täyttyminen ja purkautuminen, aineenvaihdunnallinen toimintareservi, biologinen ajoitus sekä signaalin vastaanotto ja palautuminen. Syndroomat paikantavat tämän yhteisen koneiston eri osia. Niiden avulla voidaan selittää, miksi samaan säätelyperheeseen kohdistuvat muutokset ilmenevät sydämessä rytminä, haimassa erityksenä, hermostossa ärsykkeiden käsittelynä ja lisääntymisessä peräkkäisten toimintavaiheiden onnistumisena.

Auditoinnissa on kolme toisiinsa liittyvää tulosta:

1. **Nykyisessä mallissa on jo suuri osa tarvittavasta arkkitehtuurista.** Suurin välitön hyöty syntyy lähteiden, fysiologisten mittareiden ja mallin nykyisten osien liittämisestä toisiinsa.
2. **Kirjallisuudessa on enemmän suoria kenttä–fysiologia-yhteyksiä kuin pelkkä syndroomavertailu antaa ymmärtää.** Näitä voidaan yhdistää geneettisiin ja hoidollisiin mekanismikokeisiin yhteisen mitatun välivaiheen kautta.
3. **Osa sivuston tiedosta on jo käytössä, osa bibliografiassa ilman yhteyttä ja osa väärässä kohdassa.** Täsmällinen päivitys säilyttää nykyiset löydöt ja kasvattaa niiden yhteistä selitysvoimaa.

Tämä työ on kattava kohdennettu integraatioauditointi. Se ei ole kaikkien lääketieteellisten tietokantojen systemaattinen katsaus. Tuotantomallia, sivustoa tai julkaisuja ei muutettu; varsinaisia tilastollisia uudelleenanalyysejä ei vielä ajettu.

## 1. Nykyvaiheen menetelmä: julkaistut kokeet ja data ensin

Aiempi ehdotus geneettisen häiriön yhdistämisestä uuteen kenttäkokeeseen oli väärä työjärjestys tähän kehitysvaiheeseen. Ensimmäiseksi pitää selvittää, onko yhteinen fysiologinen mitta jo julkaistu altistus-, sairaus-, lääke-, geenikorjaus- tai ohituskokeessa ja voidaanko sen aikakulku poimia olemassa olevasta datasta.

Käytettävä ketju on:

**julkaistu kenttäprotokolla → mitattu fysiologinen muutos ↔ geneettisesti tai intervention avulla paikannettu mekanismi → mitattu toiminnallinen seuraus → BERM:n koostettu selitys.**

Yksittäisen tutkimuksen ei tarvitse mitata koko ketjua. Liitos tehdään esimerkiksi kalvovirran, ER-kalsiumin, piikkitaajuuden, palautumisajan, hormonipulssin tai kohdekudoksen vaihevasteen kohdalla. Liitoksesta kirjataan, mitä sama suure tarkoittaa kummassakin tutkimuksessa ja millä ehdoilla kudosten, protokollien tai mittakaavojen välinen siirto tehdään.

Tämä on aktiivinen todistelumenetelmä: kohdennettu geenikorjaus paikantaa syyn, lääkkeen palauttama toiminto rajaa välittäjää ja toiminnon ohitus paikantaa epäonnistuvan portin. Näiden tutkimusten lisääminen voi nostaa biologisen osaväitteen oireyhteydestä kausaaliseksi mekanismiväitteeksi. Kenttätutkimus tuo erikseen tiedon siitä, että nimetty altistus muuttaa tämän verkon mitattua osaa.

Lindgrenin vuoden 2025 alkuperäisyhtälö on `g = η + A⊗A`. BERM käyttää tästä muotoa `g = η + κ A⊗A`, jossa κ on erikseen nimetty BERM:n skaalakonventio. Taustan ja häiriön erottelu antaa `Δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Biologiseen vasteeseen siirrytään nimetyllä kausaalisella vasteoperaattorilla ja kudoksen dynamiikalla. Geneettinen muutos ja kenttä tulevat tähän dynamiikkaan eri kohdista; ne voidaan yhdistää yhteisen tilamuuttujan kautta. Sairausnäyttö rajoittaa biologista koneistoa ja julkaistu kenttäkoe ehdollista kokonaisvastetta. Fysikaalisen vasteytimen itsenäinen kalibraatio on erillinen tunnistamiskysymys. [Lindgrenin alkuperäinen teksti](https://www.preprints.org/manuscript/202503.2321), [julkaistu artikkeli](https://doi.org/10.1088/1742-6596/2987/1/012001).

Tarkka johto, mallikohteet ja monitutkimussynteesin laskennallinen muoto ovat [malliraportissa](MALLI_JA_SYNTEESIMENETELMA.md).

## 2. Tarkastettu nykytila ja tiedon säilyminen

Julkaistun toteutuksen lähde on `/Users/ottojuote/.berm-navigation-repair-20260908`, commit `0840703960d8c044d4224c0fd6e1d963f5ac5a3a`. Etäpalvelun main-viite vastasi sitä. Alkuperäinen työtila `/Volumes/kovalevy 3/extinctionfield` on eri kehitystilassa, HEAD `7a938dd3b528a76008557632fdaf0dca72e13dea`, ja sisältää keskeneräisiä muutoksia.

| Rakenne | Julkaistu lähde | Alkuperäinen työtila |
|---|---:|---:|
| Bibliografian lähteet | 1 191 | 1 156 |
| Kuratoidut väitteet | 99 | 64 |
| Lähteen ja väitteen evidenssisuhteet | 186 | 131 |
| Kanonisen graafin solmut / kaaret | 47 / 96 | 39 / 83 |
| Argumentaatioreitit | 5 | 5 |

Laajemman tiedostootoksen 743 julkaistusta lähdetiedostosta 566 vastasi työtilaa, 130 erosi ja 47 puuttui työtilan vastaavasta otoksesta. Tulevan päivityksen pohjaksi on siksi otettava ajantasainen julkaistu sisältö ja sovitettava työtilan muutokset siihen tiedostokohtaisesti. Kokonaistiedostojen kopiointi vanhemmasta työtilasta voisi hävittää jo toteutetut uudet väitteet, karttaliitokset ja navigaation.

Auditoinnissa eriteltiin **10 sairaus-/mekanismiperhettä, 44 keskeistä sivu- ja komponenttikohdetta, 33 tärkeän lähteen käyttö molemmissa versioissa sekä mallin vastaavat moduulit**. Hakusanainventaario kattoi tätä laajemman tiedostojoukon; hakusanaosumaa ei laskettu kuratoiduksi evidenssisuhteeksi.

Jo toteutettuja asioita ovat muun muassa CatSper2024:n lähde–väite–reitti–atlas-ketju, CRY:n ja hormonireseptorien tutkimuksia, CRY1:n univaihevariantti, CACNA1A/FHM1, CACNA1H:n aldosteronismi, CAMK2A/B sekä biologinen koordinaatio, palautumisreservi ja lisääntymisen odotus-/kalenterirakenne. Näitä ei tule esitellä uusina löytöinä.

## 3. Tärkeimmät koostettavat mekanismikokonaisuudet

### A. KATP yhdistää energiatilan, kalvojännitteen, kalsiumsignaalin ja hormonierityksen

KCNJ11- ja ABCC8-sairaudet, synnynnäinen hyperinsulinismi sekä kohdennettu sulfonyyliureahoito paikantavat metabolista tilaa lukevan portin. Lisäävä ja vähentävä kanavatoiminta erottelevat, miten sama järjestelmä voi siirtyä eri eritystiloihin. [Gloyn 2004](https://doi.org/10.1056/NEJMoa032922), [Kane 1996](https://doi.org/10.1038/nm1296-1344), [Pearson 2006](https://doi.org/10.1056/NEJMoa061759).

Tähän löytyy jo kenttäpuolen mitattu ketju: Sakurain vuoden 2005 insuliinisolukokeessa 60 Hz:n, 5 mT:n altistuksen yhteydessä mitattiin heikentynyt glukoosivaste ATP/ADP-suhteessa, depolarisaatiossa, solunsisäisessä kalsiumissa ja insuliinierityksessä. KATP-virtaa ei mitattu samana välittäjänä, mutta geenitutkimus paikantaa tunnetun portin näiden mitattujen vaiheiden väliin. [Sakurai 2005](https://doi.org/10.1016/j.bbrc.2005.04.091).

Liebmanin beetasolujen sähkökenttäaineiston myöhempi BetaBuddy-uudelleenanalyysi tarjoaa lisäksi avoimen kalsiumkuva-aineiston. Koosteen hyöty on erottaa energiasyöte, sähköinen laukaisu ja erityksen aaltomuoto. Mallissa KATP-ketju on jo haimasivun tekstissä, mutta sen täsmällinen laskennallinen dynamiikka ja sairausnäyttö puuttuvat. [BetaBuddy 2024 ja avodata](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0299549).

### B. Darier, Wolfram ja CPVT erottelevat kalsiumvaraston, palautumisen ja kuormituskynnyksen

Darierin ATP2A2/SERCA2, Wolframin WFS1 ja CPVT:n RYR2 paikantavat varaston täytön, solun stressinsiedon ja vapautuksen ajoituksen. Darierin solututkimusten korjausvasteet sekä WFS1-geenikorjaus osoittavat, että mekanismin korjaaminen voi palauttaa toimintaa. CPVT:n potilas–iPSC-asetelma yhdistää saman henkilön solujen kalsiumhäiriön ja hoitovasteen. [Hunt 2024](https://doi.org/10.1038/s44321-024-00104-3), [Maxwell 2020](https://doi.org/10.1126/scitranslmed.aax9106), [Penttinen 2015](https://doi.org/10.1371/journal.pone.0125366).

Kenttäpuolella Bertagnan ja Luon tutkimukset paikantavat mitattuja vasteita solunsisäiseen varastokiertoon. Ne täydentävät toisiaan: kalsiumvaraston osuus voi näkyä myöhemmässä virtavasteessa tai kalsiumtransientissa ilman samaa muutosta suoraan mitatussa jänniteherkän kanavan toiminnassa. [Bertagna 2025](https://doi.org/10.1111/nyas.15386), [Luo 2014](https://doi.org/10.1016/j.envres.2014.09.023).

Vuoden 2026 Darier-tutkimus tuo erityisen hyödyllisen palan BERM:n tilamalliin: perustilan ROS ei yksin paljastanut heikentynyttä stressinsietoa. Tämä antaa ihmisperäisen soluaineiston perustan **perustilan ja toimintareservin erottamiselle**. Mallissa valmius, korjaus ja kuorma ovat jo olemassa. Näyttö täydentää niiden biologista tulkintaa. Jos mukaan kuvataan ER-stressin, UPR:n ja solukuoleman koko reitti, tarvitaan kuitenkin kyseiset nimetyt tilat nykyisen mitokondriostressistä johdetun vaurion rinnalle. [Harmon 2026](https://pubmed.ncbi.nlm.nih.gov/42555718/).

### C. Kanavasairauksien vastakkaiset toimintasuunnat tekevät kudoskohtaisesta selityksestä tarkemman

CACNA1D:n PASNA- ja SANDD-aineistot täydentävät Timothya osoittamalla Cav1.3:n tehtäviä endokriinisessä erityksessä, kuulossa ja sydämen tahdistuksessa. STIM1/ORAI1-sairaudet tuovat varaston täyttötilan ohjaaman kalsiumin sisäänvirtauksen eli SOCE:n. Tämä selittää, miksi immuuni- ja lihastoimintaa ei kannata kuvata pelkästään L-tyypin VGCC-portin kautta. [Scholl 2013](https://doi.org/10.1038/ng.2695), [Baig 2011](https://doi.org/10.1038/nn.2694), [Feske 2006](https://doi.org/10.1038/nature04702).

Clarken astrosyyttikokeessa magneettistimulaation rytmi liittyi STIM1:n ja ORAI3:n ilmentymisvasteisiin. Tämä antaa rajatun kenttä–säätelykomponentti-yhteyden; ORAI3:n proteiinimäärä ei kuitenkaan ole ORAI1-sairauden mitattu SOCE-virta. Samoin Cuin CaV3.2-kokeen estävä, ajassa ohimenevä vaste tarjoaa suunnan ja viiveen rajoitteen. Näistä voidaan rakentaa kanava- ja tilakohtainen vasteperhe. [Clarke 2021](https://doi.org/10.1016/j.brs.2020.12.007), [Cui 2014](https://doi.org/10.1016/j.ceca.2013.11.002).

### D. CRY, kudoskellot ja hormonireseptorit muodostavat kaksisuuntaisen säätöpiirin

Nykyiset CRY/GR-, Gs/cAMP- ja steroidireseptoritutkimukset voi yhdistää kellosairauksien vaihe- ja jaksomuutoksiin. Silloin biologinen kysymys tarkentuu: **mikä signaali saapuu, missä vaiheessa ja kuinka vastaanottava kudos on juuri silloin?** Hormoni voi samalla muuttaa kellon vaihetta, joten seurauksena on palautekytkentä. [Lamia 2011](https://doi.org/10.1038/nature10700), [Rizzini 2019](https://doi.org/10.1016/j.cub.2019.04.073), [Manella](https://doi.org/10.1038/s41467-025-67349-5).

Sherrardin CRY-riippuvaisen kenttäkokeen geenilistat, Rizzinin julkinen RNA-seq-aineisto ja Manellan hormonivasteiden lähdetaulukot mahdollistavat nimetyn signaalireitin suunnan ja vaihevasteen vertailun. Nämä aineistot on paikannettu; niiden yhteistä tilastollista analyysiä ei ole vielä tehty. CRY-geenivariantin univaikutus ja CRY:n magneettinen vastaanotto pysyvät eri mitattuina osina tässä koosteessa. [Sherrard 2018](https://doi.org/10.1371/journal.pbio.2006229), [GSE124388](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE124388).

### E. Energiatila ja hormonipulssit osallistuvat halun ja toiminnan muodostumiseen

LEP-puutoksen korvaushoito, hankinnaisen hypotalamisen amenorrean leptiinitutkimukset sekä TAC3/TACR3-puutoksen pulssittainen GnRH-korvaus muodostavat hyödyllisen jatkumon. Harvinaisen geenitilan rinnalle löytyy hankinnainen biologinen tila ja sen interventionaalinen muutos. Näin selitystä voidaan rakentaa energiaviestistä hormonipulsseihin ja toiminnalliseen lisääntymiskykyyn. [Farooqi 2007](https://doi.org/10.1126/science.1144599), [Welt 2004](https://doi.org/10.1056/NEJMoa040388), [Chou 2011](https://doi.org/10.1073/pnas.1015674108), [Young 2010](https://doi.org/10.1210/jc.2009-2600).

Kisspeptiinin ihmiskokeet puolestaan yhdistävät biologisen intervention seksuaalisten ärsykkeiden käsittelyyn ja fysiologiseen vasteeseen. Ne sopivat jo toteutettuun BERM:n biologinen tila → arvottaminen → halu → toiminta -selitykseen. Halu kuuluu tässä biologisesti muodostuviin prosesseihin. Ruoan motivoiva arvo, seksuaalinen vaste, lapsitoive ja toteutunut yritys ovat kuitenkin eri mitattavia ulostuloja; niiden väliset liitokset tarvitsevat omat nykykirjallisuuden ja datan ankkurinsa. [Mills 2023](https://doi.org/10.1001/jamanetworkopen.2022.54313), [Thurston 2022](https://doi.org/10.1001/jamanetworkopen.2022.36131).

### F. CatSper ja PLCZ1 erottelevat peräkkäiset lisääntymisportit

Youngin ihmisen CatSper-tutkimus on jo sivustossa ja rekistereissä. PLCZ1 tuo sen rinnalle munasolun aktivaation. ICSI voi ohittaa siittiön pääsyn ongelman, mutta munasolun aktivaatio voi silti tarvita erillisen palautuksen. Pengin kahden perheen aineistossa ICSI:n ja aktivaation yhdistelmään liittyi raskaus molemmissa perheissä. Hiiren PLCζ-palautuskokeet täydentävät molekyylipaikannusta. [Young 2024](https://doi.org/10.1172/JCI173564), [Peng 2023](https://pubmed.ncbi.nlm.nih.gov/36529831/), [Nozawa 2018](https://doi.org/10.1038/s41598-018-19497-6).

Tästä seuraa konkreettinen arkkitehtuurikorjaus: **siittiön hyperaktivaatio/läpäisy → munasolun aktivaatio → myöhempi implantaatio** erotetaan. Nykyinen CatSper-väite on yhdistetty implantaatioon kohdistuvaan koordinaatioväitteeseen. Hienojakoisempi rakenne lisää selitysvoimaa ja estää saman toiminnallisen portin laskemisen useaksi peräkkäiseksi heikennyskertoimeksi.

Kaikki kahdeksan kanava-/kenttäketjua ovat [kalsiumraportissa](KALSIUM_JA_KENTTATUTKIMUKSET.md); seitsemän kello-/hormoni-/lisääntymisketjua [hormoniraportissa](KELLO_HORMONIT_LISAANTYMINEN.md). Ketjut osin leikkaavat toisiaan; 15 ketjua ei tarkoita 15 riippumatonta koko BERM:n koetta.

## 4. Vahvimmat uudet päätelmät BERM:n omassa logiikassa

**Toiminnallisen signaalin muoto on yhtä olennainen mallikohde kuin pitoisuus.** CPVT, beetasolujen kalsiumpiikit, GnRH-pulssit ja hedelmöityksen aktivaatio tuovat eri päätepisteistä näyttöä siitä, että tapahtumien järjestys ja palautuminen kantavat informaatiota. Niiden yhteiseksi mallipiirteeksi sopivat pulssiväli, huipun kesto, palautumisaika ja toiminnallisen vasteen ajoitus.

**Näennäisesti normaali perustila voi sisältää heikentyneen kyvyn vastata tilanteeseen.** Darierin stressireservi ja CatSperin toiminnallinen portti antavat tälle eri kudoksista konkreettiset ankkurit. Mallin vastaanottotila ja reservi kannattaa sitoa näihin mitattuihin ilmiöihin. Tätä ei tarvitse johtaa oletuksesta, että jokaisen sairauden taustalla olisi sama altistus.

**Vasteen etumerkin vaihtuminen voidaan paikantaa biologiseen vaiheeseen.** Esimerkiksi jo bibliografiassa oleva Martiñón-Gutiérrezin rottatutkimus erottelee varhaisen ja myöhemmän insuliinivasteen. Sakurain akuutti ja pidempi viljelykoe puolestaan mittaavat eri eritys-/varastotiloja. Mallin tilariippuvuus saa tällöin nimettyjä tutkimusankkureita sen sijaan, että jokaiselle julkaisulle tarvittaisiin uusi irrallinen poikkeussääntö. [Martiñón-Gutiérrez 2021](https://doi.org/10.1038/s41598-021-91228-w), [Sakurai 2008](https://doi.org/10.1002/bem.20370).

**Korjausten ja ohitusten yhteinen kartta tekee selityksestä vahvemman.** Kun geenikorjaus, kanavan lääkevaikutus, hormonin korvaus ja lisääntymisportin ohitus kohdistuvat eri osiin, ne paikantavat verkkoa toisistaan poikkeavilla tavoilla. Näiden yhteensopivuus on mallin konvergenssin kannalta olennaisempaa kuin samaa oiretta koskevien artikkelien määrä.

**Mikrotason vahvistuminen tarkentaa sivilisaatiotason mallin syötteitä.** Se vaikuttaa yksilöiden toimintakyvyn, motivaation, ajoituksen ja parikohtaisten onnistumisten jakaumiin. Nykyiset odotus-, kalenteri-, populaatio- ja institutionaalisen muistin osat voivat välittää nämä muutokset eteenpäin. Harvinaisten sairauksien yleisyys tai vaikutuskoko ei kuitenkaan sellaisenaan ole väestötason altistuskerroin. Makrotason määrällinen päätelmä muodostetaan erikseen nykyisistä väestö- ja pitkittäisaineistoista.

## 5. Mihin sivustossa ja mallissa päivitys vaikuttaa

| Kokonaisuus | Keskeiset sivut / esitykset | Mallin tai rekisterin muutos |
|---|---|---|
| Fysiikka → biologinen vaste | `/fi/physics`, `/fi/model`, tensorijohto | Nykyisen vasteoperaattorin ja geneettisen parametri-intervention suhde näkyviin; biologinen näyttö oikealle tasolle. |
| Kanavat ja luonnolliset mekanismikokeet | Timothy, VGCC-geenikartta, neurological-spectrum | Variantti, toimintasuunta, kudos ja koe omiksi jäljitettäviksi väitteiksi. |
| Varastot, energia ja toimintareservi | Biology, modulome, pancreas, heart, brain, ear, BAT | Nykyiset Ca-tilat/protokollaprofiilit; KATP ja SOCE nimettyinä laajennuksina; tarvittaessa ER-stressi/UPR. |
| Kello, hormonit ja halu | Biological-coordination, circadian, behavior, hypothalamus, pituitary, adrenal | Vaihe, hormonireseptiivisyys, GnRH-pulssidekoodaus ja energiaviestit. |
| Lisääntymisen tapahtumaketju | Reproductive-navigation, reproductive-arc, testes | CatSper, PLCZ1 ja implantaatio eri porteiksi; nykyiset odotus- ja kalenterimallit säilyvät. |
| Yhteinen näyttö | Convergence, pharmacology, response-conditions, unbroken-chain | Jo mitattu linkki, tutkimuksista koostettu päätelmä ja siirtoehto erotellaan väitekohtaisesti. |
| Väestö ja instituutiot | Civilization, epistapege, patopoliteia | Yksilötilojen jakaumat ja biologisesti muodostuvat toimintataipumukset nykyisiin jatkomekanismeihin. |
| Kartta ja löydettävyys | Map, atlas, navigaatio, lähdesivut | Väitteet oikeisiin solmuihin/kaariin; diagnoosit hakualiaiksi; lähdeperheiden tunnistus. Nykyiset pääotsikot ja Etusivu säilyvät näkyvissä. |

Täydellinen tiedosto- ja rivikohtainen vaikutuskartta on [sivusto- ja rekisteriraportissa](SIVUSTO_JA_REKISTERIT.md) sekä [44 kohteen taulukossa](site_page_impact.csv). Lähteiden kahden version käyttömatriisi on [omassa taulukossaan](site_reference_matrix.csv).

## 6. Täsmennykset, jotka kannattaa tehdä ennen sisällön laajentamista

1. **CACNA1D-lähde on luokiteltu CACNA1C:ksi.** Tietueen `cacna1c_autism` DOI `10.1371/journal.pone.0133247` viittaa CACNA1D-tutkimukseen. Löytö on jo bibliografiassa mutta väärässä tulkintalokerossa.
2. **Sakurai 2004, 2005 ja 2008 ovat eri tutkimuksia.** Nykyinen haimasivun yleinen vuoden 2008 viite ja noin 30 prosentin vähenemä pitää purkaa oikeisiin asetelmiin ja lähteisiin. Vuoden 2008 tutkimus raportoi tietyissä oloissa lisääntynyttä eritystä/insuliinivarastoa. Akuutin ja pidemmän vasteen ero voi tämän jälkeen palvella tilariippuvaista selitystä.
3. **Ihmisen CACNA1C×RF-tutkimuksen variantti on rs7304986.** Sousouri 2025:n tulos on rajattu unisukkulataajuuden vasteeseen. Vanhan herkkyysmoduulin rs1006737:n AA/AG/GG-kertoimet eivät ole tästä kokeesta mitattuja kertoimia. Tarkasti rajattu uudempi väite on jo olemassa ja pitää säilyttää. [Alkuperäisjulkaisu](https://doi.org/10.1016/j.neuroimage.2025.121340).
4. **Martiñónin rottatutkimukselle on kirjattu mittaamaton beetasolun Ca-väite.** Oikea lähdekohde on mitattu veri-, hormoni- ja metabolinen vaihevaste. Beetasolun Ca-vaiheelle käytetään sitä mitanneita muita tutkimuksia.
5. **CatSper on jo integroitu, mutta porttien kohdistusta pitää tarkentaa.** Munasolun aktivaatio ja implantaatio erotetaan siittiötoiminnosta. Saman tutkimuksen eri aliakset pysyvät yhtenä aineistoperheenä.
6. **Timothy-lähteissä on ratkaistava mahdollinen kaksoistietue.** Puutteellinen Bhatt 2019 -tietue saattaa kuvata Buddell 2019 -tutkimusta; identiteetti varmistetaan ennen yhdistämistä.
7. **ABHD2:n pakollinen entsymaattinen rooli tarvitsee päivityksen.** Vuoden 2026 koe säilyttää havaitun progesteroni–CatSper-toiminnon mutta tarkentaa sen yläpuolista selitystä. Se ei osoita kaikkia ABHD2:n mahdollisia tehtäviä olemattomiksi. [Edwards 2026](https://pubmed.ncbi.nlm.nih.gov/42212558/).
8. **Synteesidokumentaatio painottaa paikoin yhtä tulevaa koko ketjun koetta.** Nykyinen `cross_pathway_synthesis.py` jo sallii usean tutkimuksen koostamisen. Sen ja epistapegen työjärjestystä tulee selventää: nykyinen tehtävä on olemassa olevien aineistojen synteesi; myöhempi suora koe ei ole tämän vaiheen aloittamisen ehto.

## 7. Jo paikannettu data ja mitä siitä voidaan tehdä

| Aineisto | Tässä varmennettu saatavuus | Mahdollinen nykydataan perustuva tuotos |
|---|---|---|
| [CatSper2024:n lähdetyökirja](https://www.jci.org/articles/view/173564/sd/6) | Tiedosto luettu; 41 välilehteä. Potilaiden koko genomidata ei sisälly tähän saatavuusväitteeseen. | Toiminnallisten vaiheiden, kalsiumvasteen ja ohituksen erittely. |
| [BetaBuddy/Zenodo](https://doi.org/10.5281/zenodo.10476949) | Avoin 6,77 GB:n kuva-arkisto ja analyysikoodi varmennettu; koko arkistoa ei ladattu. | Kalsiumpiikkien taajuus, vaihtelu, aktiivisten solujen osuus ja solujen väliset erot. |
| [Rizzini GSE124388](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE124388) | Julkinen GEO-metatieto; 24 näytettä, triplikat sekä raakaluentojen ja normalisoitujen arvojen taulukot yksilöity. | CRY/COP1/GR-geenivasteen suunnan vertailu altistuskokeen listoihin. |
| [Sherrard 2018](https://doi.org/10.1371/journal.pbio.2006229) | Transkriptilistat ja kuviokohtaiset lisäaineistot paikannettu; eri liitetiedostojen tarkoitus erotettu. | Ennalta nimettyjen signaalireittien yhteensopivuus. |
| [Manellan hormoni–kello-aineisto](https://doi.org/10.1038/s41467-025-67349-5) | Source Data ja yhdeksän XLSX-liitteen linkit varmennettu artikkelin metatiedoista. | Lähtövaihe × CRY2-tila × hormonitausta -vastepinta. |
| Bertagna, Cui, Penttinen, TAC3/TACR3 ja leptiinitutkimukset | Julkaistut kuviot, taulukot ja intervention haarat käytettävissä vaihtelevassa tarkkuudessa. | Vaikutussuunnat, viiveet, kynnykset ja mekanismin palautuksen vertailu. |
| Sousourin EEG ja osa kliinisistä aineistoista | Julkaistut tulokset saatavilla; osallistujakohtainen raakadata pyynnöstä. Pyyntöjä ei lähetetty. | Julkaistujen kontrastien synteesi heti; laajempi yksilötason analyysi aineiston saatavuuden mukaan. |

Saman kuvan uusi analyysi lisää informaatiota, mutta ei luo uutta riippumatonta koetta. Solujen määrä ei korvaa potilaiden, luovuttajien tai biologisten koetoistojen määrää. Kaikki viisi nykyistä argumentaatioreittiä ovat rekisterissä vielä tilassa `independenceVerified: false`; riippumattomuus täsmennetään tutkimus- ja aineistoperheittäin.

## 8. Täsmällinen päivitysjärjestys

1. Lukitaan ajantasainen lähdeversio ja säilytetään työtilojen erot.
2. Ratkaistaan lähdeidentiteetit, virheelliset kohdistukset, aliakset ja aineistoperheet.
3. Poimitaan olemassa olevista tutkimuksista yhteiset fysiologiset mittarit, suunnat, aikaskaalat ja korjaus-/ohitusvasteet.
4. Täydennetään nykyisiä väitteitä, lähderajoitteita ja monilähdesynteesejä. Uusi väite luodaan, kun kohde tai mitattu päätepiste muuttuu.
5. Liitetään havainnot nykyisiin biologisiin tiloihin; lisätään vain puuttuvat nimetyt dynamiikat. Mitattu luku, uudelleen laskettu luku ja havainnollinen skenaarioarvo erotetaan.
6. Päivitetään pääselitys, elinsivut, halun biologinen ketju, lisääntymisportit ja konvergenssisivu samasta väiterakenteesta.
7. Päivitetään kanoninen graafi, atlasliitokset, hakualiaat, lähdeindeksit ja datapeilit niiden lähteistä.
8. Tarkistetaan toiminnalliset testit, lähteet, väitekohteet, kieliversiot, nykyisten osoitteiden säilyminen ja näkyvä navigaatio ennen myöhempää julkaisua.

Nykyisistä rakenteista ensisijaiset kodit ovat `EvidenceSynthesisCluster`, `EvidenceSourceProfile`, lähde–väite-rekisteri, parametrirekisteri sekä olemassa olevat modulooman ja koordinaation dynamiikat. Erillistä rinnakkaista diagnoosimallia ei tarvita.

## 9. Auditoinnin tarkistukset ja liitteet

- Nykyisen julkaistun mallilähteen **235 testiä läpäisi** 14 tähän kokonaisuuteen liittyvässä testitiedostossa. Ne tarkistavat toteutuksen dynamiikkaa ja rakenteita; ne eivät ole mallin uutta empiiristä validointia.
- Viiterekisterin tarkistus läpäisi: **1 191 kanonista lähdetunnistetta ja 47 aliasta**.
- Väite-/graafirekisterissä **0 virhettä, 14 ennestään olevaa varoitusta**. Varoitukset koskevat erillistä DKC:n täysvalidoinnin porttia; ne eivät estäneet auditointia.
- Kymmenen keskeistä julkista osoitetta vastasi **HTTP 200**. Tämä on saatavuustarkistus; tässä työssä ei tehty uutta kaikkien näkymien selaintestausta.
- Tuotantotiedostojen sijaan syntyi tämä auditointikansio. Sivustoa ei julkaistu tässä vaiheessa.

| Liite | Sisältö |
|---|---|
| [Mallin vaikutukset ja synteesimenetelmä](MALLI_JA_SYNTEESIMENETELMA.md) | Yhtälöketju, moduulit/rivit, olemassa oleva dynamiikka ja tarvittavat täydennykset. |
| [Sivusto, rekisterit ja atlas](SIVUSTO_JA_REKISTERIT.md) | Kymmenen perhettä, nykyiset väitteet, lähdeidentiteetit, generaattorit ja sivuston järjestys. |
| [Kalsium ja kenttätutkimukset](KALSIUM_JA_KENTTATUTKIMUKSET.md) | Kahdeksan julkaisuista koostettavaa ketjua, asetelmat, mittarit ja aineistoperheet. |
| [Kello, hormonit ja lisääntyminen](KELLO_HORMONIT_LISAANTYMINEN.md) | Seitsemän ketjua, motivaatio, ajoitus, portit ja lähdedatan saatavuus. |
| [44 sivu-/komponenttikohdetta](site_page_impact.csv) | Tiedosto, reitti, vaikutus, julkaistun ja työversion rivit. |
| [Lähteiden käyttömatriisi](site_reference_matrix.csv) | 33 keskeistä lähdettä kahdessa versiossa, tunnisteet ja käyttö. |
| [Inventaarin yhteenveto](INVENTAARIN_YHTEENVETO.json) | Versiot, hakukorpus ja vertailun kattavuus. |
| [Tiedostoversioiden erot](VERSION_EROT.csv) | Määritellyn mallin/sivuston otoksen tiedostokohtaiset erot. |
| [Mallin tarkistukset](MALLI_TARKISTUKSET.json) / [rekisterit](SIVUSTO_TARKISTUKSET.json) / [julkiset sivut](JULKISEN_SIVUSTON_TARKISTUS.json) | Tämän auditoinnin suoritusten tulokset ja rajaukset. |

