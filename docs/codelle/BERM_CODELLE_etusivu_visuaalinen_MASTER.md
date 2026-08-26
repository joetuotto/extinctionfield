# Etusivun visuaaliset datalähteet — MASTER-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Tiedosto:** `website/app/[locale]/page.tsx`

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Etusivun jokainen numeerinen väite, sparkline ja tilastoluku on peräisin vertaisarvioidusta lähteestä. Tämä dokumentti toimii kanonisena viiterekisterinä — jos lukua päivitetään, lähteen on muututtava samalla.

---

## SPARKLINE-DATA JA LÄHTEET

Sparkline-käyrät näkyvät "Crisis in Numbers" -osiossa, yksi per kortti (6 korttia).

| # | Aihe | Data | Lähde |
|---|------|------|-------|
| 0 | Global TFR | [5.0, 4.9, 4.5, 4.1, 3.7, 3.5, 3.2, 2.9, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2] | World Bank WDI (5-vuotisvälit 1960–2024) |
| 1 | Siittiökonsentraatio | [101, 96, 89, 83, 77, 70, 62, 55, 49, 42] | Levine ym. 2023 meta-regressio (mil/ml) |
| 2 | Testosteroni (ikävakioitu) | [100, 97, 93, 90, 87, 83, 80] | Travison 2007 + Santi 2025 (indeksoitu) |
| 3 | Maailman lihavuus | [0, 2, 5, 10, 18, 15, 20, 35, 49] | NCD-RisC + WHO GHO |
| 4 | Korea TFR | [1.47, 1.08, 1.23, 1.24, 0.84, 0.72] | Statistics Korea (vuodet ~2018–2023) |
| 5 | Amish TFR | [6.9, 6.8, 6.7, 6.5, 6.3, 6.1, 6.1, 6.1] | Greksa 2002, Wasao 2023 |

---

## IMPACT GRID -KORTIT (6 kpl)

| # | Luku | Aihe (EN) | Lähde | Linkki |
|---|------|-----------|-------|--------|
| 0 | 5.0 → 2.2 | Global TFR since 1960 | World Bank WDI | /explore |
| 1 | −62% | Sperm concentration | Levine ym. 2023, 223 tutkimusta | /model#causal-diagram |
| 2 | −1.2%/yr | Testosterone decline, age-independent | Travison 2007 | /model#testosterone-threshold |
| 3 | 49 | Countries below replacement TFR 1.4 | World Bank 2024 | /explore |
| 4 | $200B | Korea pronatalism spending | Korean govt raportti | /model#testosterone-threshold |
| 5 | TFR 6.1 vs 1.66 | Amish vs US fertility | Greksa 2002, Wasao 2023 | /evidence/populations |

---

## POIKKILEIKKAUS-TILASTOT (Paradox-osio)

| Luku | Selite | Lähde |
|------|--------|-------|
| LOOCV RMSE 0.522 | Leave-one-out cross-validation | BERM v17.1 cross_sectional.py |
| R² = 0.851 | Mallin selitysaste | BERM v17.1 |
| 74% | Maista 0.5 lapsen sisällä ennusteesta | BERM v17.1 |
| RMSE 0.533 | Asumisen sähkönkulutus (paras yksittäinen ennustaja) | BERM v17.1 |
| RMSE 1.053 | Matkapuhelintilaukset (heikoin ennustaja) | BERM v17.1 |

---

## KLIMENTIDIS-OSIO

| Data | Arvo | Lähde |
|------|------|-------|
| Populaatiot | 24 | Klimentidis ym. 2010 |
| Lajit | 8 | Klimentidis ym. 2010 |
| p-arvo | 1.2 × 10⁻⁷ | Klimentidis ym. 2010 |
| BERM-tulkinta | EMF-ympäristö | BERM:n oma johtopäätös (ei Klimentidisin) |

---

## MAZUR-LAINAUS

- **Lainaus:** "We have not identified the reason for secular decline in testosterone, but we exclude increasing obesity as a sufficient or primary explanation..."
- **Lähde:** Mazur ym. 2013, PLOS ONE
- **Kohortti:** 991 US Air Force -veteraania, 20 vuoden seuranta
- **Avainlöydös:** Painonsa säilyttäneet miehet menettivät 19 % testosteroninsa

---

## SANTI 2025 META-ANALYYSI

- **Otoskoko:** 1 064 891 miestä
- **Löydös:** Sekä testosteroni että LH laskevat, riippumatta BMI:stä
- **Merkitys:** Ongelma ulottuu hypotalamus-aivolisäke-akseliin

---

## 35 VUODEN VAROITUS -OSIO

| Data | Lähde |
|------|-------|
| Suomen TFR 1.87 (2010) → 1.26 (2024) | Tilastokeskus |
| 33% pudotus 15 vuodessa | Laskettu yllä olevasta |
| USA:n ennustettu kynnys ~2030 | BERM v17 kynnysmalli (ekstrapolaatio) |
| Testosteronin laskuvauhti | Travison 2007, Perheentupa 2013 |

---

## FARMAKOLOGINEN EVIDENSSI

| Data | Arvo | Lähde |
|------|------|-------|
| Potilaat | 264 625 | 3 rekisteritutkimusta (Suomi, UK) |
| HR psykiatriset sairaalahoitot | 0.79–0.83 | Tiihonen ym., Hayes ym. |
| Nifedipiini vs amlodipiini | 12 % ero | Aivoja läpäisevä vs ei-läpäisevä |
| Meneillään oleva koe | NCT06998368 | ETH Zürich, nimodipiini vs 5G/uni |

---

## FALSIFIKAATIO-OSIO

Data luetaan dynaamisesti: `public/data/falsification_v19_1.json`
- Laskee: total, ran, consistent, falsified, pending
- Fallback-arvot: 7 / 3 / 3 / 0 / 4

---

## LUKITUT ENNUSTEET

Kolme TFR 2030 -ennustetta näytetään etusivulla:
- `kr-2030-tfr` (Etelä-Korea)
- `fi-2030-tfr` (Suomi)
- `us-2030-tfr` (USA)

Data: `@/lib/predictions` → `LOCKED_PREDICTIONS`

---

## EPISTEEMINEN FOOTER

Dynaaminen viitemäärä: `getReferenceCount()` lukee `public/data/references_full.json`
- K₈ = 0.81
- K₁₀ = 0.71
- RMSE = 0.522
