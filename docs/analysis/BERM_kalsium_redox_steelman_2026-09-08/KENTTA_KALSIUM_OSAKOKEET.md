# Kenttä–kalsium-yhteyden osakokeet ja niiden yhdistäminen hormonimekanismiin

8.9.2026. Täydentää [kalsium–kello–hormonisynteesiä](KALSIUM_KELLO_HORMONIT.md) ja [redox-varannon analyysiä](REDOX_VARANTO_JA_MUISTI.md). Alla erotetaan kokeessa tehty havainto ja BERM:n siitä muodostama yhdistämispäätelmä. Tutkimukset on valittu mekanismin paikantamisen perusteella; luettelo ei ole kaikkien EMF-tutkimusten systemaattinen meta-analyysi.

## 1. Miksi ajoitus kuuluu BERM:n premisseistä alkavaan tarkasteluun

[Integraatiosuunnitelmassa](INTEGRAATIOSUUNNITELMA.md) johdettiin Lindgrenin vuoden 2025 premissistä BERM:n skaalakonventiolla

\[
\Delta g=\kappa(A_0\otimes a+a\otimes A_0+a\otimes a).
\]

Oletetaan tarkasteltavassa gauge- ja koordinaattivalinnassa hitaasti muuttuva tausta sekä `a(t)=b(t)u cos(ωt)`, jossa `u` on kiinteä nelivektori ja `b` muuttuu hitaasti kantoaaltoperiodiin nähden. Kantoaallon yli keskiarvoistamalla saadaan

\[
\overline{\Delta g}\simeq\frac{\kappa}{2}b(t)^2u\otimes u.
\]

Tämä on kyseisten oletusten mukainen geometrisen suureen keskiarvo, ei väite siitä, että biologinen kudos automaattisesti käyttäisi juuri tätä keskiarvoa. Hidas biologinen vaste edellyttää edelleen BERM:n kudoskohtaista L2-operaattoria. Tulos kuitenkin antaa täsmällisen perusteen tutkia ajallista verhokäyrää ja kudoksen vasteaikaa pelkän kantoaaltotaajuuden rinnalla. Nopeasti vaihteleva tausta, useat koherentit kentät tai toisenlainen vasteydin muuttavat säilyviä termejä. Mitatusta SAR:sta ei yksin rekonstruoida tätä tensorisyötettä.

Tämän jälkeen kysytään, mitä biologinen järjestelmä tekee saamansa ajallisen signaalin kanssa. Kenttäkoe ja Ca-signaalin tulkintakoe voivat yhdessä rajoittaa peräkkäisiä vaiheita, vaikka jälkimmäisessä ei olisi kenttäaltistusta. Lähdepremissi: [Lindgren 2025](https://doi.org/10.1088/1742-6596/2987/1/012001). BERM:n nykyinen `lindgren_response.py` erottaa vastaavasti tarkan tensorilaajennuksen, ehdollisen vasteen ja verhokäyrän algebraaliset termit.

## 2. Suorat kenttäkokeet, joilla on paikantavaa arvoa

| Tutkimus | Koe ja varmennettu havainto | Koostettava linkki |
|---|---|---|
| **Cui 2014** — [alkuperäisartikkeli](https://pubmed.ncbi.nlm.nih.gov/24360572/), DOI 10.1016/j.ceca.2013.11.002 | 50 Hz, 0,2 mT; T-tyypin kanavavirrat vähenivät. Arakidonihappo/LTE4-reitin estäminen ja LTE4:n lisääminen paikansivat välittävää lipidireittiä. | Kenttä voi liittyä myös Ca-kanavavirran vähenemiseen. Tämä antaa nimetyn välitystavan Ca-vajeen haaralle ja erottaa kanavan toiminnan sen määrästä. Ei vielä sama mekanismi kuin Qinin Leydig-solussa. |
| **Buckner 2015** — [alkuperäisartikkeli](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0124136) | Thomas-aaltomuoto 2–10 μT; 849 pisteen jakso noin 2,55 s, muuttuva pulssiväli. Syöpäsoluissa Ca-fluoresenssi ja kasvun esto, T-kanavasalpaus esti vasteita. Ajallisesti käännetty kuvio ei tuottanut samoja vasteita. Bay K8644 tuotti samansuuruusluokkaisen mutta lyhyemmän Ca-nousun ilman vastaavaa kasvun estoa. | Pelkkä Ca-huippu ei riitä kuvaamaan biologista annosta. Kanava, kesto ja aaltomuodon järjestys säilytetään. Vertailu tukee ajallisen profiilin merkitystä, mutta eri lääke-/kanavareitti ei eristä yksin kestoa ainoaksi selittäjäksi. |
| **Sharma 2019** — [alkuperäisartikkeli](https://pmc.ncbi.nlm.nih.gov/articles/PMC6604768/), DOI 10.1016/j.ebiom.2019.05.038 | 27,12 MHz:n amplitudimoduloitu RF; solukokeissa SAR 30 tai 400 mW/kg, tavallisesti 3 h/vrk seitsemän päivää. Ca-mittaus, etosuksimidi ja CACNA1H-vaimennus yhdistivät vasteen CaV3.2-reittiin; CACNA1G-/CACNA1I-vaimennukset eivät antaneet samaa kasvuvastetta. CaMKII/p38 ja transkriptiomuutokset jatkoivat ketjua. | Kenttä → nimetty Ca-reitti → signaalin tulkinta → solutoiminto on tutkittu samassa tutkimuskokonaisuudessa. Kohde on syöpäsolu, päätepiste kasvu. CaMKII ei ole Qinin CaMKI, eikä annosta siirretä sellaisenaan gonadeihin. |
| **Neuhaus 2019** — [alkuperäisartikkeli](https://pmc.ncbi.nlm.nih.gov/articles/PMC6356873/), DOI 10.3390/cancers11010110 | Glioblastoomasolut, 200 kHz:n sähkökenttä (TTFields). Fura-2, ulkoisen Ca:n poisto, kanavasalpaajat ja CACNA1C-vaimennus paikansivat Ca-välitystä. Solulinjat reagoivat eri tavoin. | Erillinen kenttä-/solujärjestelmä vahvistaa, että kanavakohdetta voidaan paikantaa suoralla mittauksella ja geeni-interventiolla. Terapeuttinen sähkökenttä säilyttää oman annoksensa ja soveltuvuusalueensa. |
| **Bertagna 2025** — [alkuperäisartikkeli](https://pmc.ncbi.nlm.nih.gov/articles/PMC12412718/), DOI 10.1111/nyas.15386 | Hiiren CA1-neuronit, 50 Hz, 1 mT, 60 min. Kalvovirtojen muutokset riippuivat RyR/SERCA-interventioista. | Sisäisen varastokierron tila liittyy kenttäkokeen vasteeseen. Havaintosuure on sähkövirta; Ca-pitoisuuden muutosta ei ole suoraan mitattu tässä kokeessa. |
| **Kim 2026** — [alkuperäisartikkeli](https://doi.org/10.1016/j.cell.2026.03.029), [korjaus](https://pubmed.ncbi.nlm.nih.gov/42372722/) | Muokatussa geenikytkimessä CRISPR-seulonta tunnisti Cyb5b:n välttämättömäksi välittäjäksi. Julkaisun tiivistelmä erottaa rytmisen Ca-vaihtelun yleisestä Ca-sisäänvirtauksesta geenikytkimen aktivaatiossa. | Kenttävasteen ajallinen biologinen tulkinta ansaitsee oman yhteytensä nykyiseen Ca-/transkriptiokuvaukseen. Tässä lisätarkistuksessa varmennettiin alkuperäistiivistelmä ja korjauksen olemassaolo; koko korjattua kuva- ja pulssiaineistoa ei saatu tarkistettua. Lähde säilyy täydennettävänä, ei tämän synteesin välttämättömänä ainoana ankkurina. |
| **Qin 2018/2019** — [2018](https://pubmed.ncbi.nlm.nih.gov/30125682/), [2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6598754/) | RF-kokeissa Leydig-solujen CaMKI/RORα-, redox-, steroidi- ja kellogeenihavainnot sekä testosteroni; eri tutkimuksissa Ca- ja redox-interventiot. | Lähin suora kenttätutkimusten liittymä tämän kokonaisuuden hormonipäätepisteeseen. Tarkat protokollat ja palautuvat muuttujat kuvataan erillisessä kalsiumraportissa. |

Sharma ja mallissa jo käytetty [Jimenez 2019](https://doi.org/10.1016/j.ebiom.2019.05.034) ovat saman AM-RF-tutkimusperheen eri kudoshaaroja. Tämä on arvokasta mekanismin jatkamista, mutta niitä ei lasketa täysin riippumattomien laboratorioiden toistoksi. Myöskään välttämättömän kanavan löytäminen ei yksin ratkaise ensimmäisen fysikaalisen vastaanoton paikkaa. BERM käyttää tuloksen koko paikantavan sisällön: kenttävaste tarvitsee nimetyn biologisen komponentin tutkituissa oloissa.

## 3. Miten näyttö jatkuu jo tunnettuun biologiseen dekoodaukseen

[De Koninck ja Schulman 1998](https://doi.org/10.1126/science.279.5348.227) osoittivat CaMKII:n biokemiallisella pulssikokeella, että signaalin taajuus ja kesto vaikuttavat jäljelle jäävään aktiivisuuteen. [Kon 2014](https://doi.org/10.1101/gad.237511.114) yhdisti CaMKII:n toiminnan solukelloon ja oskillaattorien kytkentään. Nämä ovat CaMKII-haaran biologisia komponenttikokeita. Qinin CaMKI-haaraan tuodaan erikseen [Martin 2008:n](https://doi.org/10.1210/me.2007-0370) NUR77/StAR-interventiot.

Yhteinen BERM-päätelmä on **nimetty ajallinen vasteketju**: fysikaalinen aaltomuoto → ehdollinen kudosvaste → Ca:n ajallinen ja paikallinen profiili → kyseisen kudoksen kinaasi-/transkriptiotulkinta → toiminnallinen päätepiste. Näyttö ei edellytä kaikkien kudosten käyttävän samaa kanavaa tai kinaasia. Parsimonia syntyy yhteisestä rakenteesta ja kokeellisesti rajatuista kudosversioista.

## 4. Redox ja suora sukusoluhaara täydentävät hormonireittiä

[Miao 2025](https://doi.org/10.3389/fpubh.2025.1623701) tuo suoran RF-altistuksen ja Leydig-solujen glutationivarannon samaan asetelmaan. [Chen 2010](https://doi.org/10.1016/j.mce.2010.02.034) puolestaan muuttaa glutationia kokeellisesti ja mittaa kuormituksen vaikutusta steroidogeneesiin. Näiden yhdistäminen on tarkkarajainen koostettu päätelmä: mitattu yhteinen välivaihe on glutationivaranto, mutta solulinja- ja protokollaeroja ei hävitetä.

[De Iuliis 2009](https://doi.org/10.1371/journal.pone.0006446) tutki eristettyjä ihmisen siittiöitä 1,8 GHz:n RF-altistuksessa: SAR 0,4–27,5 W/kg, 16 h. Oksidatiiviset ja DNA-päätepisteet sekä liikkuvuus/elinkelpoisuus antoivat suoran sukusoluhaaran. [Vuoden 2013 korjauksessa](https://journals.plos.org/plosone/article?id=10.1371/annotation/9a8a0172-3850-4059-b852-72c330769c1b) biologisten toistojen määrä tarkentui kolmeen. Tämä koe ohittaa koko hormonituotannon; sen tulosta ei pidä pakottaa testosteronin välittämäksi.

[Houston 2019](https://doi.org/10.1038/s41598-019-53983-9) jatkaa eläimen siittiöiden redox-/vauriohaaraa eri altistuskestoihin. Nykyisen ROS:n ja DNA-vaurion eritahtisuus on käyttökelpoinen havaintorajoite. Saman tutkimuksen säilynyt IVF-tulos kertoo, että mitattu soluhäiriö ja tutkittu hedelmöittymiskapasiteetti eivät ole yksi ja sama päätepiste. Tästä saadaan BERM:n lisääntymisporttiin toiminnallista tietoa, ei syytä hylätä mitattua solumuutosta.

## 5. Sijoitus nykyiseen evidenssiin

Buckner, Jimenez, Neuhaus, Bertagna ja Kim ovat jo nykyisen työtilan viite-/mekanismikokonaisuuksissa. Sharma on käsitelty myös saman päivän [farmakologisessa tutkimussynteesissä](../BERM_farmakologinen_evidenssi_2026-09-08/README.md). Lisäarvo tässä on näiden yhdistäminen Qin–CaMKI–StAR- ja glutationi–autofagia–steroidogeneesiketjuihin.

Hakureitit etenivät seuraavista ankkureista: `EMF calcium channel genetic knockdown`, `CACNA1H AM RF CaMKII`, `calcium oscillations electromagnetic gene expression`, `radiofrequency Leydig CaMKI RORalpha`, `Leydig calcium StAR cholesterol bypass`, `glutathione depletion steroidogenesis oxidative challenge`, `autophagy cholesterol human testis ovary`, `RyR2 calcium leak insulin CPVT` ja `SERCA2 Darier glutathione`. Alkuperäisjulkaisuista seurattiin niiden kohde-, ohitus- ja geeni-interventioiden lähteitä. Haut ja tarkistukset tehtiin 8.9.2026; kattavuudesta ei esitetä systemaattisen katsauksen poissulkulaskelmia.
