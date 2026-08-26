# Moderaattorianalyysi (Proxy Masking) — DEFINITIVE-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Komponentti:** `website/components/ProxyMaskingInfographic.tsx`
**Kutsutaan:** `website/app/[locale]/page.tsx` (rivi ~374)

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

ProxyMaskingInfographic on etusivun toiseksi tärkein visuaalinen argumentti heti BermMasterInfographic-peilikuvion jälkeen. Se esittää BERM:n eliminaatioprosessin: 9 vaihtoehtoista selitystä testataan systemaattisesti 8 kriteerillä. EMF on ainoa, joka läpäisee kaikki 8.

---

## KOMPONENTIN RAKENNE

### SVG-spesifikaatio
- **viewBox:** 800 × 300
- **X-alue:** 1920–2025
- **Y-alue:** 0–100%
- **Grid:** 6 vuosikymmenviivainta, 4 horisontaaliviivaa (25/50/75/100)
- **Responsiivisuus:** `min-w-[500px]`, maxHeight 340

### Interaktio
- 9 nappia (ympyröidyt, toggle-valinta)
- Valittu selitys: oma käyrä piirretään health burden -viivan kanssa
- Tuomio-laatikko (verdict box): pisteet + selitys
- Matriisitaulukko: 9 × 8 + score -sarake
- Rivin klikkaus valitsee selityksen

---

## 9 SELITYSTÄ JA 8 TESTIÄ

### Testiakseli (8 kriteeriä)
| # | EN | FI |
|---|----|----|
| 0 | Obesity | Lihavuus |
| 1 | T2D | T2D |
| 2 | Autism | Autismi |
| 3 | Sperm | Siittiöt |
| 4 | Depression | Masennus |
| 5 | Timing | Ajoitus |
| 6 | Amish | Amish |
| 7 | Lab rats | Lab-rotat |

### Selitykset ja pisteet

| # | ID | EN | FI | Score | Huippuvuosi |
|---|----|----|-----|-------|-------------|
| 0 | chemicals | Chemicals | Kemikaalit | 1/8 | ~1975 (laskee siitä) |
| 1 | calories | Calories | Kalorit | 0/8 | ~2000 (tasaantunut) |
| 2 | contraception | Contraception | Ehkäisy | 0/8 | ~1975 (tasaantunut) |
| 3 | inactivity | Inactivity | Inaktiivisuus | 1/8 | Tasainen ~45% |
| 4 | climate | Climate | Ilmasto | 0/8 | Lineaarinen nousu |
| 5 | socialmedia | Social media | Some | 2/8 | Vasta 2003 jälkeen |
| 6 | diagnostics | Diagnostics | Diagnostiikka | 1/8 | Lineaarinen nousu |
| 7 | gdp | GDP | BKT | 0/8 | Kollineaarinen EMF:n kanssa |
| 8 | **emf** | **EMF** | **EMF** | **8/8** | Jatkuva nousu 1880– |

### Tarkka pisteytysmatriisi

```
                 Obes  T2D  Aut  Sper Depr Time Amis Rats  TOTAL
Chemicals          ✗     ✗    ✗    ✓    ✗    ✗    ✗    ✗    1/8
Calories           ✗     ✗    ✗    ✗    ✗    ✗    ✗    ✗    0/8
Contraception      ✗     ✗    ✗    ✗    ✗    ✗    ✗    ✗    0/8
Inactivity         ✗     ✗    ✗    ✗    ✗    ✗    ✓    ✗    1/8
Climate            ✗     ✗    ✗    ✗    ✗    ✗    ✗    ✗    0/8
Social media       ✗     ✗    ✗    ✗    ✓    ✗    ✓    ✗    2/8
Diagnostics        ✗     ✗    ✓    ✗    ✗    ✗    ✗    ✗    1/8
GDP                ✗     ✗    ✗    ✗    ✗    ✗    ✗    ✗    0/8
EMF                ✓     ✓    ✓    ✓    ✓    ✓    ✓    ✓    8/8
```

---

## TUOMIOTEKSTIT

### Chemicals (1/8)
**EN:** "Chemical pollutants peaked around 1975 and have declined steadily since regulation. Health epidemics continued accelerating. Wrong direction."

### Calories (0/8)
**EN:** "Caloric intake plateaued around 2000 and has since declined, while obesity continued rising. The curves diverge. Timing mismatch."

### Contraception (0/8)
**EN:** "Contraception explains part of fertility decline but cannot explain obesity, diabetes, autism, sperm damage, or depression. Wrong scope."

### Inactivity (1/8)
**EN:** "Physical inactivity has remained relatively stable since the 1990s. Cannot explain the sharp acceleration in health epidemics after 2000. Flat trend."

### Climate (0/8)
**EN:** "Climate change follows a gradual, linear trajectory. Health epidemics show sharp inflection points (1978, 2000, 2012) that a linear trend cannot produce."

### Social media (2/8)
**EN:** "Social media emerged after 2003. Obesity, diabetes, autism, and sperm decline were already accelerating long before. Explains only teen depression, and even that partially. Too late."

### Diagnostics (1/8)
**EN:** "Better diagnostics explain ~20–25% of the autism increase (Nevison 2014). They cannot explain 75–80% of the real rise, nor any of the other four epidemics which use objective measurements (BMI, blood glucose, sperm count)."

### GDP (0/8)
**EN:** "GDP growth is collinear with EMF adoption — both rise together. But the Amish are prosperous yet healthy (TFR 6.1), and lab rats on controlled diets also got obese (Klimentidis). Prosperity alone cannot be isolated."

### EMF (8/8)
**EN:** "EMF exposure is the only variable that tracks all five epidemics, matches every inflection point, explains the Amish exception, and accounts for lab animal obesity. 88% of chronic animal studies find effects. 8 out of 8."

---

## HEALTH BURDEN -REFERENSSIKÄYRÄ

Punainen taustakäyrä (aina näkyvissä) edustaa terveysrasitteen kokonaisindeksiä:

```
[1920,1] [1930,2] [1940,3] [1950,5] [1960,8] [1970,12]
[1978,18] [1985,25] [1991,32] [1995,38] [2000,48] [2005,58]
[2007,62] [2010,70] [2012,76] [2015,82] [2020,90] [2025,95]
```

Taitekohtia: 1978 (siittiölasku kiihtyi), 2000 (T2D), 2012 (nuorten masennus).

---

## VISUAALINEN TYYLI

- **Tausta:** `#0f172a` (slate-900)
- **Kicker:** `#3b82f6` (sininen, kirjainväli 0.1em)
- **Health burden:** `#ef4444` (punainen), area opacity 0.18
- **EMF-käyrä:** `#3b82f6` (sininen), solid
- **Muut käyrät:** `#6b7280` (harmaa), katkoviiva 6 3
- **Hyväksytty:** `#22c55e` (vihreä ✓)
- **Hylätty:** `#334155` (tumma —)
- **Verdict-box:** vihreä/punainen reunus tulos mukaan

---

## DATALÄHTEET

| Selitys | Käyrän perustelu |
|---------|-----------------|
| Chemicals | EPA TRI data, Stockholm Convention trends |
| Calories | USDA ERS, FAOSTAT per capita supply |
| Contraception | UN DESA, Guttmacher Institute |
| Inactivity | WHO NCD-RisC, CDC BRFSS |
| Climate | IPCC AR6, NASA GISS |
| Social media | Pew Research, eMarketer |
| Diagnostics | DSM revision history, screening adoption |
| GDP | World Bank WDI |
| EMF | ITU, IEA, BERM kumulatiivinen laskenta |
| Health burden | Yhdistelmäindeksi: lihavuus + T2D + autismi + siittiölasku + masennus |

---

## EPISTEEMINEN HUOMAUTUS

Eliminaatioprosessin pisteytys on BERM:n oma konstruktio. Se perustuu kuhunkin testikohtaan: "selittääkö tämä selitys tämän epidemian?" Pisteytys on binäärinen (kyllä/ei) eikä sisällä tilastollista inferenssiä. Se on heuristinen, ei bayesilainen.
