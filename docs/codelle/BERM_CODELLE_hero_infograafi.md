# BERM Master Infographic — hero-komponentti CODELLE-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Komponentti:** `website/components/BermMasterInfographic.tsx`
**Kutsutaan:** `website/app/[locale]/page.tsx` (rivi ~371)

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

BermMasterInfographic on sivuston visuaalinen pääargumentti. Se esittää BERM:n ydinhypoteesin yhdessä kuvassa: viisi EMF-teknologiakerrosta (yläpuoli) peilattuna viiden terveysepidemian kiihtymiseen (alapuoli). Komponentti on ensimmäinen datavisualisaatio, jonka kävijä näkee hero-kuvan jälkeen.

---

## KOMPONENTIN RAKENNE

### SVG-spesifikaatio
- **viewBox:** 1000 × 560
- **Keskiakseli (AXIS):** y = 270 (EMF ylhäällä, epidemiat alhaalla)
- **Yläreuna (ET):** y = 30
- **Alaraja (HB):** y = 510
- **X-alue:** CL = 60 → CR = 940
- **Aikajana:** 1880–2025 (16 datapistettä per kerros)
- **Responsiivisuus:** `minWidth: min(540px, 100%)` mobiilille

### Datarakenteet

#### LAYERS (5 EMF-kerrosta, pinottu alue)
| ID | EN | FI | Väri | Huippu-% |
|----|----|----|------|----------|
| grid | Power grid | Sähköverkko | #1a3354 | 15 |
| radio | Radio · Radar | Radio · Tutka | #1e4470 | 8 |
| crt | CRT · Fluorescent | CRT · Loisteputki | #255690 | 12 |
| cell | Cellular | Matkapuhelin | #2d6cb5 | 25 |
| wifi | WiFi · LED · IoT | WiFi · LED · IoT | #3b82f6 | 40 |

**Kumulatiivinen huippu (2025):** 15 + 8 + 12 + 25 + 40 = 100 %

#### EPIDEMICS (5 terveyskäyrää)
| ID | EN | FI | Väri | Taitekohta |
|----|----|----|------|-----------|
| sperm | Sperm decline | Siittiökato | #f97316 | 1982 |
| obesity | Obesity | Lihavuus | #ef4444 | 1992 |
| t2d | Type 2 diabetes | Tyypin 2 diabetes | #f59e0b | 2000 |
| autism | Autism spectrum | Autismikirjo | #a855f7 | 2009 |
| depression | Teen depression | Nuorten masennus | #ec4899 | 2016 |

#### SENTINELS (3 eläinmerkkiä)
| Vuosi | EN | FI | Emoji |
|-------|----|----|-------|
| 1989 | Golden Toad | Kultasammakko | 🐸 |
| 2007 | Colony Collapse | Mehiläiskato | 🐝 |
| 2017 | Krefeld −75% | Krefeld −75% | 🦗 |

### Kaavion alla oleva sisältö

1. **Teesiotsikko:** "Viisi teknologiakerrosta. Viisi terveysepidemaa. Yksi mekanismi."
2. **TFR-vertailu:**
   - Etelä-Korea: 0.72 (punainen #ef4444) — "5 EMF-kerrosta · korkein teknologiatiheys"
   - Amish: 6.1 (vihreä #22c55e) — "Minimaalinen EMF-altistus"
3. **Kolme avainlukua:**
   - 88 % kroonisista eläinkokeista positiivisia (#3b82f6)
   - 58 % DNA-vauriosta alle ICNIRP-rajan (#ef4444)
   - 9 h EMF-vapaa palautumisikkuna (#f59e0b)
4. **CTA-linkki:** → `/[locale]/model`

### Interaktio
- **Hover:** hiiren liike SVG:n päällä näyttää pystyviivan vuosiluvun kohdalla
  - Vuosiluku ympyrässä keskiakselilla
  - "EMF X%" yläreunassa
  - Ympyräpisteet epidemiakäyrillä
  - Sentinel-nimi jos ±3 vuotta

---

## DATALÄHTEET

| Data | Lähde |
|------|-------|
| Siittiökato −62% | Levine ym. 2023 (meta-analyysi, 223 tutkimusta) |
| Lihavuusepidemia | WHO GHO + NCD-RisC |
| T2D | IDF Diabetes Atlas |
| Autismikirjo | CDC ADDM Network + Nevison 2014 |
| Nuorten masennus | Twenge ym. 2019 + NSDUH |
| Etelä-Korea TFR 0.72 | Statistics Korea 2023 |
| Amish TFR 6.1 | Greksa 2002 + Wasao 2023 |
| 88% eläinkokeet | Yakymenko ym. 2016 |
| 58% DNA-vaurio | Lai & Singh meta-analyysi |
| Kultasammakko 1989 | Pounds ym. 2006 (vertailuajankohta) |
| CCD 2006-07 | vanEngelsdorp ym. 2009 |
| Krefeld −75% | Hallmann ym. 2017 |

---

## VISUAALINEN TYYLI

- **Tausta:** `linear-gradient(180deg, #060a16, #0b1020, #0b1020, #060a16)`
- **EMF-alueet:** sinisen liukuväri (#1a3354 → #3b82f6), opacity 0.85
- **Epidemiakäyrät:** paksut viivat (2.5px) + täyttöalue (opacity 0.10) + varjoviiva (4px, opacity 0.2)
- **Keskiakseli:** valkoinen viiva, opacity 0.1
- **Vuosilukujaotus:** 1900, 1920, 1940, 1960, 1980, 2000, 2020

---

## MAHDOLLISET LAAJENNUKSET (EI TOTEUTETTU)

- [ ] Scroll-animaatio: kerrokset ilmestyvät yksi kerrallaan
- [ ] Hover-detail: yksittäisen epidemian tarkat arvot
- [ ] Lisää populaatiovertailuja (esim. Israel, Singapore)
- [ ] Sentinel-popup: linkki sentinel-sivulle
- [ ] Kaavan linkki: TFR = f(EMF) -yhtälö kaavion alla
- [ ] Kielitoggle-integraatio (nappi kaavion sisällä)
