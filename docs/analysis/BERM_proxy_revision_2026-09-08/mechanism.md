# Mekanismiosion lähde- ja toteutustarkistus

8.9.2026. Toteutettu vain `website/components/ProxyMechanismEvidence.tsx` sekä tämä muistio ja `mechanism_references.json`. Canonical-bibliografian integrointi kuuluu pääagentille.

## Toteutettu rakenne

`ProxyMechanismEvidence({ locale }: { locale: string })` on palvelinkomponentti. Otsikko on FI **Kentästä lisääntymisen säätelyyn**, EN **From field exposure to reproductive regulation**. Lyhyt vaakaketju mahtuu sisältötilaan ja rivittyy mobiilissa. Biologisten interventioiden kuvaukset ovat kahdessa sarakkeessa, ensimmäinen BERM-liitos koko leveydellä. Koko COPY-aineisto: EN 528, FI 444 sanaa viitemerkkien tekniset osat poistettuna. Avattavat protokollat sisältyvät lukuihin.

Kenttä → kalsium → redox → hormonit → lisääntyminen on **BERM:n koostama reitti**. Erillinen De Iuliis -haara tuo suoran sukusoluvasteen, joka ohittaa hormonituotannon. Samoja kokeita ei esitetä yhtenä kudoksena tai yhtenä altistuksena.

## Neljä näyttöluokkaa ja kokeelliset ankkurit

1. Lindgren2025:n geometrinen Δg erotetaan BERM:n ehdotetusta `r_i = Xi_i[S](Δg)`-vasteesta. Xi:n kudoskytkentä pysyy avoimena. Geometria ei itsessään identifioi VGCC:tä.
2. Jimenez2019:n 27,12 MHz AMRF, lääke/CACNA1H-vaimennus ja Ca-mittaus paikantavat CaV3.2-riippuvuutta ihmisen maksasyöpäsolussa. Tämä ei yksin osoita ensimmäistä fysikaalista vastaanotinta. [Primääri](https://doi.org/10.1016/j.ebiom.2019.05.034), nykyinen `therabionic-ebioMedicine-2019`.
3. Yap2019:n myoblastikokeessa TRPC-estäjät vähensivät ROS-vastetta, TRPC1-vaimennus esti mitokondriovasteita ja antioksidantit estivät kasvuvasteen. Vaste edisti lihaskehitystä. Tulos tukee Ca/mitokondrio/redox-kytkentää eikä yleistä haitallista Ca-nousua. [Primääri](https://doi.org/10.1096/fj.201900057R), uusi `yap2019_trpc1_mitohormesis`.
4. Qin2019:n hiiren Leydig-solussa RF vaikutti sekä redox-mittareihin että testosteroniin, ja CeO₂-esikäsittely paransi niitä suhteessa RF:ään yksin. Myös CeO₂ yksin vaikutti, joten selektiivistä yksittäisen ROS-kohteen estoa ei väitetä. [Kokoteksti](https://www.dovepress.com/ceo2nps-relieve-radiofrequency-radiation-improve-testosterone-synthesi-peer-reviewed-fulltext-article-IJN), uusi `qin2019_ceo2_leydig`.
5. De Gendt2004:n Sertoli-AR-poisto yhdistää androgeenivastaanoton ja spermatogeneesin geenikokeella. Ei kenttäaltistusta. [Primääri](https://doi.org/10.1073/pnas.0308114100), nykyinen `degendt2004_sertoli_ar`.

Näistä koostettu reitti saa enemmän paikantavaa sisältöä kuin yhteisvaihtelu yksin. Näyttöä ei vähennetä sillä perusteella, ettei yksi koe kata kaikkea; liitosten edellyttämät kudosten vastaavuudet ja kytkennät säilytetään näkyvissä. Asteikko, suunta, viive ja ihmisen hedelmällisyysvaikutus erotetaan avoimiksi kalibroinneiksi.

## Liitteen lukujen korjaukset

| Väite | Tarkistettu sisältö ja toteutus |
|---|---|
| Pall2013 26/26 | Alkuperäiskatsaus sanoo **23 tutkimusta**, joissa kanavasalpaus esti tai vaimensi eri EMF-vasteita. Se ei anna 26/26-koko-ketjun varmennusta. Julkinen kortti kuvaa 23:a myönteisesti eikä toista virheellistä 26-lukua. [Katsauksen alkuperäinen tietue](https://pubmed.ncbi.nlm.nih.gov/23802593/) |
| Yakymenko2016 93/100 | Katsauksen sadasta tutkimuksesta 93 raportoi oksidatiivisia vaikutuksia. Tämä on katsausaineiston löydösten laskenta, ei laboratorioperheiden riippumattomuudella korjattu replikaatio-osuus, meta-analyyttinen vaikutuskoko tai VGCC-mediaation osoitus. Verkossa 2015, lehdessä 2016. [Tietue](https://pubmed.ncbi.nlm.nih.gov/26151230/) |
| De Iuliis2009 | 1,8 GHz puhdas signaali, 16 h, 21 °C; 1 W/kg:n esimerkissä liikkuvuus 86±2 → 68±2 %, elinkyky 89±3 → 65±1 %. Luovuttajapooli 22 miestä ei ole jokaisen päätemuuttujan n. **Vuoden2013 korjaus: kuvien1–5 biologisia toistoja3, ei4.** Kuva1D:n korjattu ROS-luku28±1 % vs5±1 %, p=.0056. Farmakologista RF-rescue-haaraa ei tehty. [Primääri](https://doi.org/10.1371/journal.pone.0006446), [korjaus](https://journals.plos.org/plosone/article?id=10.1371/annotation/9a8a0172-3850-4059-b852-72c330769c1b) |
| Adams2014 | 10 tutkimusta /1492 näytettä kokonaisaineistossa; liikkuvuuden ero −8,1 prosenttiyksikköä, 95 % LV−13,1…−3,2. Havainnoivat ihmisasetelmat ja in-vitro-kokeet yhdistyvät. Elinkyvyn ero−9,1pp, LV−18,4…+0,2; pitoisuuden LV myös sisältää nollan. Morfologiaa ei meta-analysoitu. [Primääri](https://doi.org/10.1016/j.envint.2014.04.015) |
| Belmonte2024 | Täsmähaku/rekisterihaku ei yksilöinyt tällä nimellä RF–sperma-katsausta. Sitä ei lisätty. Läheiset oikeat vuoden2024 katsaukset ovat Cordelli (eläinkokeet + ihmissperma in vitro) ja Kenny (ihmisobservaatiot). |

Cordelli2024:n [vuoden2025 korjaus](https://doi.org/10.1016/j.envint.2025.109449) muuttaa eläinten ei-tiineiden naaraiden OR:n1,68:aan (1,06–2,65) ja varmuuuden korkeaksi; tulosta ajaa yksi SAR43,4 W/kg:n koe. Ilman sitä OR1,32:n LV sisältää nollan. Komponentti ei käytä tätä eläinlukua ihmisriskinä. Kennyn [ihmisobservaatioiden katsaus](https://doi.org/10.1016/j.envint.2024.108817) raportoi puhelintuntia kohti progressiivisen liikkuvuuden MD−0,46pp (−1,04…+0,13), erittäin epävarma näyttö. Näitä ei tarvita tämän tiiviin komponentin lähdelisäyksiksi.

## Varmennustapa ja jäljelle jäänyt rajaus

Jimenez: aiemmin tarkistettu Europe PMC XML ja alkuperäinen kokoteksti uudelleen. Qin: kustantajan koko alkuperäisteksti, menetelmät ja tulokset. De Gendt: alkuperäisabstrakti/kokotekstin päätelmät. Yap: primaaritietue ja kustantajan hakukoneeseen indeksoitu koko tekstin *Immediate mitochondrial responses* -jakso; suora kustantajasivu palautti403 ja PMC XML404, joten lääkkeiden tarkkoja pitoisuuksia ei tuoda korttiin. PLOS-korjaus luettu kokonaan. Adams/Cordelli/Kenny tarkistettiin rajatun alatutkijan primaariluvussa; De Iuliis-n korjattiin sen jälkeen erikseen vuoden2013 korjauksesta.

Uusien lähteiden DOI/PMID/ID/aliasduplikaatit tarkistettiin ennen erillisen JSONin tuottamista. Canonical-tiedostoa ei tässä muokattu. Muista lukea korjaus yhdessä alkuperäisen De Iuliis -julkaisun kanssa myöhemmässä kuvan/data-arvojen poiminnassa.

## Jatkohaun perusteella lisätyt ankkurit

Rootin jatkopyynnöstä suoralle siittiöhaaralle lisättiin Iorio2011: 50 Hz:n, 5 mT:n kanttiaallon lisäämä motiliteetti riippui mitokondrioiden toiminnasta; irtikytkentä esti vasteen, glykolyysin esto sopivilla substraateilla säilytti sen. Kyse on suorasta ihmisen siittiön kenttä × interventio -asetelmasta, jonka vaste on myönteinen. Primaaritietue ja abstrakti varmennettiin; tuntemattomia lääkepitoisuuksia ei tuotu julkiseen copyyn. Uusi ehdotettu viite `iorio2011_sperm_mitochondria` on tiedostossa `dose_followup_references.json`.

Lisäksi kaksi lähteistettyä lukua näyttää De Iuliisin saman RF-annossarjan solunsisäisiä yhteyksiä: mitokondrio-ROS ↔ DNA-fragmentaatio R²=0,861 (kuva5B), mitokondrio-ROS ↔ 8-OHdG R²=0,727 (kuva4B). Vuoden2013 korjaus luettiin uudelleen: se muuttaa kuvan1D arvoja ja kuvien1–5 n:n, mutta ei ilmoita näille R²-luvuille muutoksia. Kuvateksti rajaa luvut solunsisäisiksi yhteyksiksi eikä SAR–syntyvyys-selitysasteiksi.

ClaimRef-importti ja rootin `claim.proxy.mechanistic-composition`-ankkuri säilytettiin. Lopullisessa komponentissa on noin586 englannin /491 suomen sanaa mukaan lukien avattavat protokollat ja otsikot. Kohdennettu ESLint-tarkistus hyväksytty muutosten jälkeen. Jatkohaun tarkat koetaulukot, CSV-poiminnat ja hakuloki ovat tiedostossa `dose_response_followup.md`; JSONit ja kolme CSV-lohkoa validoitu.
