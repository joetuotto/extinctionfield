# Muutosatlaksen varmennettu aineistopohja — 8.9.2026

`website/data/change-atlas.json` sisältää 50 sarjaa, 3 339 lähdepistettä ja kuusi lähdemerkintää. Valittavat maat ovat Suomi (FIN), Yhdysvallat (USA), Yhdistynyt kuningaskunta (GBR), Saksa (DEU) ja Japani (JPN). Oletusnäkymä kattaa vuodet 1950–2023. UKBMS:n vuoden 2024 havaintoarviot säilyvät aineistossa, vaikka ne jäävät oletusnäkymän ulkopuolelle.

| Aineisto | Sarjat / pisteet | Aikapeitto | Mitä arvot tarkoittavat |
|---|---:|---|---|
| UN WPP2024 TFR | 5 / 370 | 1950–2023, vuosittain | Julkaistu periodinen kokonaishedelmällisyysluku, lasta/naista; historiallinen väestöestimaatti. |
| UN WPP2024 ASFR | 35 / 2 590 | 1950–2023, vuosittain | Seitsemän ikäryhmää 15–19…45–49; syntymää / 1 000 saman ikäryhmän naista. |
| ITU / World Bank, matkapuhelinliittymät | 5 / 257 | Lähdepisteitä 1960–2023, aukkoja | Liittymiä / 100 asukasta; raportoidut nollat ja yli 100:n arvot säilytetään. |
| CDC NHANES, diabetes yhteensä ja diagnosoitu | 2 / 22 | 11 tutkimusjaksoa 1999–2023 | Ikävakioitu prevalenssi (%), 95 %:n luottamusväli, otoskoko ja keskivirhe. |
| UKBMS, neitoperhonen ja nokkosperhonen | 2 / 98 | 1976–2024, vuosittain | Julkaistu lajikohtainen log10-runsausindeksi sekä vuosittainen seurantapaikkojen määrä. |
| Nyante ym. / NHANES, kokonaistestosteroni | 1 / 2 | 1988–1991 ja 1999–2004 | Otospainotettu, monimuuttujavakioitu aritmeettinen keskiarvo (ng/ml), 95 %:n luottamusväli ja analyysiväestön koko. |

## Alkuperä ja toistaminen

Poiminta suoritetaan ilman verkkoyhteyttä jo hankituista alkuperäisaineistoista. WPP:n ja World Bankin tiedostot tarkistetaan aiempien manifestien SHA-256-tiivisteitä vasten. CDC:n 22 arvoa, luottamusrajat, otoskoot ja keskivirheet tarkistetaan tallennetun alkuperäisen HTML-taulukon 5 riveistä. UKBMS:n 98 arvoa ja seurantapaikkojen määrää tarkistetaan alkuperäisen CSV:n täsmällisistä riveistä. Jokainen julkaistu piste sisältää lähdetunnuksen ja rivin tai taulukon paikantimen.

WPP:n poiminta lukee alkuperäiset gzip-CSV:t: `Country/Area`, viisi ISO3-tunnusta, vuodet 1950–2023 ja aineiston `Medium`-variantti. TFR otetaan omasta alkuperäissarakkeestaan. Sitä ei lasketa tässä näkymässä seitsemän ASFR-sarjan summasta. Jokaiselta maalta vaaditaan 74 TFR-vuotta ja 7 × 74 ASFR-vuotta. `Medium`-tunnus on lähdetiedoston varianttivalinta; vuosien 2024–2100 tulevaisuusprojektioita ei tuoda.

Nyanten testosteroniarvot poimittiin alkuperäisen PMC-käsikirjoituksen HTML-taulukosta 2 ja varmennettiin kustantajan kokotekstistä. Pieni tiedosto `source/nyante2012_table2_testosterone.json` säilyttää numeerisen rivin, alkuperäisen HTML:n tiivisteen, jaksot, analyysiväestön koot ja vakiointimuuttujat. Kokotekstiä ei jaeta uudelleen. Poiminta on julkaistujen faktojen lähteistetty ote; artikkelin tekstille ei väitetä avointa lisenssiä. Testosteronin lisätaulukon S1 vähemmän vakioituja tarkkoja lukuja ei saatu ladattua eikä niitä arvioitu kuvasta tai tekstin p-arvoista.

Komennot repositorion juuresta:

```sh
python3 berm/scripts/build_change_atlas.py
python3 berm/scripts/build_change_atlas.py --check
python3 -m ruff check berm/scripts/build_change_atlas.py
```

Verkkosivun hakemistosta:

```sh
npm test -- lib/__tests__/change-atlas-data.test.ts
npx eslint lib/change-atlas-data.ts lib/__tests__/change-atlas-data.test.ts
npm run typecheck
```

Ensimmäinen komento tuottaa JSON:n deterministisesti; `--check` vaatii tavutasolla saman tuloksen. Suuret WPP- ja WB-raakatiedostot kuuluvat aiempaan aineistohankintaan ja ovat Gitin ulkopuolella. Uusi selain toimii sisäänkirjatusta JSON:stä myös ilman niitä. Poiminnan toistaminen vaatii manifestissa nimetyt täsmälleen samat raakatiedostot; skripti ei lataa korvaavaa nykyversiota huomaamatta.

Lähdeartefaktien yhteenlaskettu koko ilman samoina toistuvia manifesteja on 104 283 129 tavua. Tästä aiemmin hankitut kaksi WPP-tiedostoa ja WB:n mobiilitiedosto ovat 103 510 610 tavua. Atlas-JSON on 1 152 862 tavua. Lähdepolut, tavumäärät ja tiivisteet ovat JSON:n `sources[].artifacts[]`-kentässä. Uusia maailmanlaajuisia suuria aineistopaketteja ei hankittu tätä integraatiota varten.

## Tyypitetty käyttö ja esityssopimus

```ts
import { changeAtlasData, getChangeAtlasSeries } from "@/lib/change-atlas-data";

const finnishFertility = getChangeAtlasSeries("FIN", "tfr");
const ageGroups = getChangeAtlasSeries("FIN", "asfr");
const hormonePeriods = getChangeAtlasSeries("USA", "testosterone_total");
const sources = changeAtlasData.sources;
```

- `datasetFamily` erottaa hedelmällisyyden, teknologian, sairaudet, ekologian ja hormonit. `status: estimate` tarkoittaa lähteen julkaisemaa estimaattia; se ei nimeä BERM-sovitusta havainnoksi. Mobiililuvut ovat `reported`.
- Jokainen piste ilmoittaa `imputed: false`. Tämä tarkoittaa, ettei **tämä tuonti** täytä puuttuvia vuosia. Se ei väitä, etteivät UN tai UKBMS käyttäisi omien julkaistujen estimaattiensa tuottamiseen tilastomalleja.
- Vuosisarjojen viiva voi yhdistää vain vierekkäiset lähdevuodet. Esimerkiksi USA:n mobiiliaineistossa vuodet 1981–1983 puuttuvat. Nollat eivät korvaa niitä.
- Tutkimusjakson `year` on vuosirajojen keskipiste vain sijoittelua varten. `startYear`, `endYear` ja kaksikielinen `period` säilyttävät havainnointijakson; pisteestä ei tehdä vuosittaista arvoa. CDC:n 2017–2020 jakso päättyy maaliskuuhun; viimeinen on elokuusta 2021 elokuuhun 2023.
- `lower`/`upper` ovat julkaistut 95 %:n luottamusrajat, kun ne ovat saatavilla. `null` tarkoittaa puuttuvaa epävarmuusarviota, ei nollavirhettä. UKBMS:n `nSites` tarkoittaa seurantapaikkoja; CDC:n `n` on analyysikoko. Nyanten `n` on taulukon 1 analyysiväestön koko, ei väestön kokonaismäärä.
- UKBMS:n `valueScale: log10` kertoo, että luvut ovat jo logaritmeja. Suhteellinen muutos lähtöarvoon lasketaan `100 * 10 ** (value - baseline)`. Raakojen logaritmiarvojen jakaminen keskenään olisi virhe. Eri lajien log-indeksitasoja ei tulkita yksilömäärien suhteeksi.
- `relative_index` on TypeScript-tyypin sallima **esitysjohdannainen**. Lähderekisterin mittari/yksikkövalidointi hyväksyy vain alkuperäiset yksiköt. Indeksointi ei muuta tallennettua lähdearvoa.

## Hormonin tulkinnan raja

Nyanten kaksi jaksoa sisältävät 5,37 (5,20–5,53) ja 5,34 (5,16–5,52) ng/ml. Ne koskevat aamunäytteitä antaneita vähintään 20-vuotiaita kolmen nimetyn etnisyysryhmän miehiä. Molemmissa käytettiin samaa laboratoriota ja Elecsys 2010 -mittausjärjestelmää. Vakiointi huomioi iän, etnisyysryhmän, BMI:n, vyötärön, tupakoinnin ja alkoholin. Tämä on käyttökelpoinen julkaistu tilastollinen vertailu, mutta se vastaa eri kysymykseen kuin vakioimaton väestökeskiarvo. Julkaisun pelkän iän ja etnisyysryhmän huomioiva analyysi raportoi testosteronin laskun. Näitä tuloksia ei saa esittää toisistaan riippumattomina replikaatioina tai saman estimandin ristiriitaisina lukuina. [Nyante ym., taulukko 2 ja menetelmät](https://onlinelibrary.wiley.com/doi/10.1111/j.1365-2605.2011.01230.x).

BERM:n ehdollisen vasteen kannalta BMI, metabolinen tila ja hormonijärjestelmä voivat auttaa määrittelemään tilaa koskevan tutkimuskysymyksen. Tilastollinen vakiointi ei ratkaise, onko muuttuja sekoittaja, välittäjä tai seuraus. Kokonaistestosteroni ei suoraan mittaa reseptoritilaa, palautumismuistia tai kudoksen androgeenikapasiteettia. Kaksi pistettä ei kalibroi näiden dynamiikkaa.

## Puutteet ja BERM-raja

Muiden neljän maan sairaus- ja hormonihistoriat sekä muiden alueiden ekologiset sarjat näkyvät nimenomaisina aukkoina. Myös USA:n pidempi, vertailukelpoinen hormonihistoria ja vähemmän vakioitu rinnakkaissarja puuttuvat. Repositorion interpoloituja testosteronikäyriä, siittiörekonstruktioita ja kovakoodattuja GBD-nimisiä sairauskäyriä ei tuoda tähän havaintorekisteriin.

Atlas on BERM:n downstream-empiriaa ja teknologian omaksumista kuvaava rekisteri. Samaan aikaan muuttuvat käyrät eivät määrää paikallista kenttäannosta, kudoksen herkkyyttä, vasteen merkkiä tai viivettä. Lindgrenistä johdettu geometria, tuotu biologia, BERM:n ehdollinen vastehypoteesi ja avoin kalibrointi pysyvät erillisinä. Tämä integraatio ei muuta fysikaalisia tai biologisia kertoimia, ennusteita tai mallin kalibrointia.

## Ensisijaiset lähteet

- [UN World Population Prospects 2024](https://population.un.org/wpp/) — CC-BY-3.0-IGO; raakatiedostot ja manifesti haettu 19.8.2026.
- [ITU / World Bank IT.CEL.SETS.P2](https://data.worldbank.org/indicator/IT.CEL.SETS.P2) — CC-BY-4.0; aiempi 19.8.2026 aineistoerä.
- [CDC Data Brief 516, taulukko 5](https://www.cdc.gov/nchs/products/databriefs/db516.htm) — marraskuu 2024, DOI 10.15620/cdc/165794; public domain, lähdemerkintä säilytetty.
- [UKBMS collated indices 2024](https://catalogue.ceh.ac.uk/id/a70d8b0b-0ef5-484e-8195-42bcfd818229) — Open Government Licence; täydellinen UKBMS-attribuutio lähdetietueessa.
- [Nyante ym. 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC4137971/) — DOI 10.1111/j.1365-2605.2011.01230.x; alkuperäiset julkaistut taulukkoarvot.
