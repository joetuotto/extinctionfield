# Testosteroni–sähkö–TFR horse race (2023)

## Tiivistelmä

Analyysi on eksploratiivinen ekologinen maavertailu. Täydellisessä globaalissa otoksessa on **n=84** ja OECD-otoksessa **n=33** maata.

Kehittyneiden maiden avainvertailu:

- sähkön yksimuuttuja-R² = **0.0002**
- testosteronin yksimuuttuja-R² = **0.0094**
- testosteronin partial R² kehityskontrollien jälkeen = **0.0077**
- sähkön partial R² kehityskontrollien jälkeen = **0.0247**
- testosteroni ei ylitä ennalta ehdotetun 0,05-vertailurajan.

Tätä vertailua ei pidä tulkita niin, että suurempi R² todistaisi syyn tai BERM:n. Testosteronimuuttuja on eri vuosien, alueiden, ikien, otosten ja assaymenetelmien kooste. Sen lähdesivu luonnehtii koostetta itse epätieteellisesti epäluotettavaksi.

## Menetelmä

- Outcome: UN WPP 2024 -revision vuoden 2023 TFR-estimaatti. Vuotta 2024 ei käytetty, koska se on WPP:ssä projektio.
- Testosteroni: World Population Review -taulukon 87 maan snapshot 31.8.2026; käyttäjän antamat 47 arvoa säilytetään erillisenä herkkyysanalyysina.
- Sähkö: OWID/Ember, sähkön kokonaiskysyntä henkilöä kohti vuonna 2023 (kWh/hlö). Raakamuuttuja toistaa auditoidun OECD-vertailun; standardointi muuttaa yksikköä mutta ei lineaarisen mallin R²:ta.
- Kehityskontrollit: WPP:n imeväiskuolleisuus (`log1p`) ja elinajanodote vuonna 2023 sekä World Bankin viimeinen saatavilla oleva perussanitaatiohavainto vuosilta 2018–2023.
- Kaikki regressiokertoimet ovat otoksen sisällä standardoituja. Raportoidut p-arvot ja luottamusvälit käyttävät HC3-robustia keskivirhettä.
- Partial R² = `(R²_full − R²_reduced) / (1 − R²_reduced)`. Bootstrap-välit ovat percentile-välejä ja maita uudelleenotetaan kokonaisina.
- Kehittyneiden maiden ensisijainen sääntö: OECD-jäsenyys 31.8.2026. World Bank `High income` on herkkyysanalyysi.

## Horse race

| Otos | n | T partial R² (kehitys) | Sähkö partial R² (kehitys) | T partial R² (kehitys+sähkö) | Sähkö partial R² (kehitys+T) |
|---|---:|---:|---:|---:|---:|
| Globaali | 84 | 0.0366 | 0.0224 | 0.0368 | 0.0226 |
| OECD | 33 | 0.0077 | 0.0247 | 0.0117 | 0.0286 |

Testosteronin standardoitu kerroin kehityskontrollien jälkeen on globaalisti **0.1116** (HC3 p=0.1722) ja OECD-otoksessa **-0.0954** (HC3 p=0.6614). OECD-maiden leave-one-country-out T-partial-R² vaihtelee välillä **0.0044–0.0258**, joten yksikään yhden maan poisto ei nosta sitä 0,05-rajan yli.

Bootstrap-välit, leave-one-country-out-vaihtelut ja kaikki HC3-kertoimet ovat koneellisesti luettavassa `results.json`-tiedostossa.

## Herkkyys otosvalinnalle

- Käyttäjän viestin 45 analyysiin päätyvällä maalla globaali T partial R² = **0.1041**.
- Nykyisen 87 maan snapshotin complete-case-otoksessa sama arvo = **0.0366**.
- Tunnetusti historiallisten hormonirivien poiston jälkeen (n=79) arvo = **0.0512**.
- World Bank high-income -rajauksella (n=40) arvo = **0.0039**.

Johtopäätös vaihtuu 0,05-rajan ympärillä globaalin osajoukon mukaan, mutta ei kehittyneiden maiden OECD- tai high-income-analyyseissa. Tämä on aineiston epäharmonisuuden ja otosvalinnan varoitussignaali.

## Rank-transformaatio

OECD-otoksessa Spearmanin ρ(T, TFR) = **0.0033**, p = **0.9853**, bootstrap 95 % CI [-0.3419, 0.3248]. Rank-muunnos poistaa yksikön ja suojaa monotonisilta skaalaeroilta, mutta **ei** poista maittain vaihtelevan assay-, ikä-, otanta- tai mittausvuosiharhan aiheuttamaa järjestysvirhettä.

## Mediaatiodiagnostiikka

OECD-otoksessa standardoitu sähkön kokonaiskerroin on **0.1703** ja T:n lisäämisen jälkeinen suora kerroin **0.1838**. Absoluuttisen kertoimen muutos on **-7.9 %**. Epäsuoran polun `a×b` = **-0.0134**, bootstrap 95 % CI [-0.1146, 0.1178].

Tämä on vain coefficient-attenuation-diagnoosi. Poikkileikkausdata ei osoita ajallista järjestystä sähkö → T → TFR, ja mediaatio vaatisi lisäksi mittausvirheettömyyttä sekä mittaamattoman sekoittumisen puuttumista kaikilla kolmella polulla.

## BERM-tulkinta

**A. BERM-spesifi ennuste.** Tässä aineistossa ei ole FieldStatea, B₀-suuntia, vaihetta, koherenssia, beat-PSD:tä, elinsiirtoa tai RPM-biomarkkereita. Siksi analyysista ei voi johtaa eikä testata BERM-polku C:n erottelevia ennusteita. Mahdollinen T–TFR-assosiaatio on korkeintaan yhteensopiva sen tuodun biologisen oletuksen kanssa, että testosteroni liittyy lisääntymiskapasiteettiin.

**B. Konsensus-/vaihtoehtomalli.** Kehitysaste, terveys, ravitsemus, lihavuus, ikärakenne, mittauskäytännöt, ehkäisy ja syntyvyystoiveet voivat tuottaa sekä maiden T-eroja että TFR-eroja. Sähkönkulutus toimii tässä kehityksen infrastruktuuriproksina eikä fysikaalisena annoksena.

**C. Erottelukyky.** Horse race vertailee kahden epätarkan proksin lisäselitysvoimaa, mutta ei erottele BERM:ää konsensusmallista eikä identifioi kausaalista mediaattoria. Tulos voi priorisoida parempaa harmonisoitua hormonidataa; se ei validoi mekanistista ketjua.

## Aineistoauditointi

- Testosteronirivejä: 87.
- Puuttuvat ennen complete-case-rajausta: {"tfr": 0, "electricity_kwh_per_capita": 1, "sanitation_pct": 2}.
- Kroatia (1987), Armenia (1980) ja useat 2000-luvun alun arvot on merkitty; niiden poissulku raportoidaan herkkyysanalyysissa.
- Brasilian käyttäjän arvo 416 poikkeaa 31.8.2026 lähdesnapshotin arvosta 375. Molemmat säilytetään, eikä niitä yhdistetä hiljaisesti.
- Ekologinen harha: miespopulaation hormonimittaus ja naisten periodi-TFR ovat eri yksilötason populaatioita.
- Monivertailu ja mallin jälkikäteisyys: 0,05-raja on vertailukynnys, ei tilastollinen tai biologinen hyväksymiskriteeri.

## Tuotokset

- `joined_country_data.csv`: yhdistetty maa-aineisto ja otosliput
- `model_coefficients.csv`: kaikkien päämallien standardoidut HC3-kertoimet
- `results.json`: pää-, herkkyys-, bootstrap-, mediaatio- ja vaikutusvaltatulokset
- `rank_testosterone_vs_tfr.png` ja `partial_r2_comparison.png`: tarkistuskuvat
