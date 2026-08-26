# Etusivun kokonaisrakenne — DEFINITIVE-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Tiedosto:** `website/app/[locale]/page.tsx` (756 riviä)

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Etusivu on sivuston ensimmäinen ja tärkein sivu. Se esittää BERM-mallin ydinhypoteesin, avainluvut, eliminaatioprosessin, mekanismin ja ennusteet yhdessä narratiivisessa kaaressa. Jokainen osio on suunniteltu rakentamaan argumenttia progressiivisesti: datasta → mekanismiin → ennusteeseen.

---

## SIVUN RAKENNE (16 osiota)

### 1. Hero-kuva (rivit ~345–368)
- **Komponentti:** `next/image` (hero-fertilization.jpg)
- **Koko:** min-h 420/480/520px (mobile/tablet/desktop)
- **Overlay:** gradient left-to-right + bottom-to-top
- **Teksti:** heroTitle + heroDeck + heroContext (EN/FI)
- **Tyyli:** valkoinen teksti, drop-shadow, serif h1

### 1b. Master Infographic (rivi ~371)
- **Komponentti:** `BermMasterInfographic`
- **Ohje:** → `BERM_CODELLE_hero_infograafi.md`
- **Sisältö:** Peilikaavio EMF vs epidemiat + TFR-vertailu + tilastot

### 2. Proxy-masking Elimination (rivit ~373–376)
- **Komponentti:** `ProxyMaskingInfographic`
- **Ohje:** → `BERM_CODELLE_moderaattorianalyysi_DEFINITIVE.md`
- **Sisältö:** 9 selitystä testattu, interaktiivinen vertailu

### 3. CTA (rivit ~378–394)
- Kaksi nappia: "Tutustu malliin" + "Lue todisteet"
- Linkit: `/model` + `/evidence`

### 4. Mitä BERM on (rivit ~396–400)
- VGCC-mekanismin selitys + episteeminen huomautus
- Teksti: whatIsThis + heroEpistemic

### 5. Kriisi luvuissa (rivit ~402–422)
- 6 datakorttia gridissä (1/2/3 col responsive)
- Sparkline-käyrät per kortti
- Ikonit: TrendingDown, Microscope, TestTube, Globe2, Banknote, Moon

### Bridge: Miksi nämä luvut kuuluvat yhteen (rivit ~424–452)
- 3 kappaletta: erillisten selitysten kritiikki → VGCC-yhdistävä mekanismi
- 3 CTA-linkkiä: mekanismi / evidenssi / ennusteet

### 4. Matkapuhelinparadoksi (rivit ~454–482)
- RMSE-vertailu: sähkö 0.533 vs matkapuhelin 1.053
- 3 tilastolukua: LOOCV RMSE, R², maat 0.5 sisällä
- Linkki: `/mathematics#cross-sectional`

### 5A. Klimentidisin paradoksi (rivit ~484–501)
- 24 populaatiota, 8 lajia, p = 1.2 × 10⁻⁷
- Laboratoriorottien lihominen kontrolloidulla dieetillä
- Linkki: `/model#camkii-convergence`

### 5A½. Miksi 2012? (rivit ~503–518)
- Laite vs sisältö -argumentti
- Smartphone 50% adoption + EU:n hehkulamppukielto
- Ennuste: sisältörajoitukset eivät ratkaise kriisiä
- Linkki: `/evidence/technology`

### 5A¾. Kerrostumamalli — 5 anomaliaa (rivit ~520–534)
- Viisi kysymystä, joihin vain kerrostuminen vastaa
- Linkki: `/model#layered-exposure-model`

### 5B. Farmakologinen testi (rivit ~536–552)
- Kalsiumsalpaajat vähentävät ennustettuja sairauksia
- HR 0.79–0.83, nifedipiini vs amlodipiini
- ETH Zürich -koe NCT06998368
- Linkki: `/evidence/pharmacology`

### 5C. Painovakaa lasku (rivit ~554–576)
- Mazur 2013 -lainaus (PLOS ONE)
- Santi 2025 meta-analyysi (1M+ miestä)
- Linkki: `/model#causal-structure`

### Teesitauko 1 (rivit ~578–584)
- "Oireista mekanismiin" — yhden reitin hypoteesi

### 6. Sentinel cascade (rivit ~586–597)
- **Komponentti:** `SentinelCascadeCompact`
- Linkki: `/sentinel`

### 7. Miten malli toimii (rivit ~599–612)
- **Komponentti:** `ThreeChannelSummary`
- ELF · IF · RF -kolmikanavakaavio

### 8. Pohjoinen paketti (rivit ~614–632)
- Evoluution alkuperät: OCA2, LCT, karjankasvatus
- χ-malli viidessä skaalassa
- Linkki: `/evidence/evolution`

### 9. TheraBionic (rivi ~635)
- **Komponentti:** `TheraBionicProof`

### 10. Bradford Hill (rivi ~638)
- **Komponentti:** `BradfordHillCard`

### Teesitauko 2 (rivit ~640–646)
- "Evidenssistä ennusteeseen" — falsifioitavuus

### 11. 35 vuoden varoitus (rivit ~648–665)
- **Komponentit:** `FinlandLagChart`, `ThreePhaseIndicator`, `SixFactorSummary`
- Suomen TFR-romahdus 2010–2024

### 12. Lukitut ennusteet (rivit ~667–698)
- 3 TFR 2030 -ennustetta: Korea, Suomi, USA
- Data: `LOCKED_PREDICTIONS`

### 13. Featured articles (rivi ~701)
- **Komponentti:** `LatestArticles`

### 14. Falsifikaatiotilanne (rivit ~703–726)
- Dynaaminen: total / ran / consistent / falsified / pending
- Data: `public/data/falsification_v19_1.json`

### 15. Pikalinkit (rivit ~728–745)
- 4 nappia: Model / Evidence / Data / Mathematics

### 16. Episteeminen footer (rivit ~748–753)
- Dynaaminen viitemäärä
- K₈, K₁₀, RMSE -tilastot
- Tekijä: Otto Juote, MSc Biomedicine (LSE)

---

## KOMPONENTTIRIIPPUVUUDET (13 kpl)

| Komponentti | Import-polku | Ohje |
|-------------|-------------|------|
| BermMasterInfographic | @/components/BermMasterInfographic | hero_infograafi.md |
| ProxyMaskingInfographic | @/components/ProxyMaskingInfographic | moderaattorianalyysi.md |
| ThreeChannelSummary | @/components/ThreeChannelSummary | — |
| SentinelCascadeCompact | @/components/SentinelCascadeCompact | — |
| TheraBionicProof | @/components/TheraBionicProof | — |
| BradfordHillCard | @/components/BradfordHillCard | — |
| FinlandLagChart | @/components/FinlandLagChart | — |
| ThreePhaseIndicator | @/components/ThreePhaseIndicator | — |
| SixFactorSummary | @/components/SixFactorSummary | — |
| LatestArticles | @/components/LatestArticles | — |
| Sparkline | @/components/SparklineCard | — |
| Image | next/image | — |
| Link | next/link | — |

---

## DATARIIPPUVUUDET

| Data | Polku |
|------|-------|
| LOCKED_PREDICTIONS | @/lib/predictions |
| countryLabel | @/lib/predictions |
| Locale | @/lib/i18n |
| references_full.json | public/data/references_full.json |
| falsification_v19_1.json | public/data/falsification_v19_1.json |

---

## COPY-RAKENNE

COPY-objekti sisältää ~120 avain-arvo-paria per kieli (EN/FI). Rakenne:
- Flat-merkkijonoja (heroTitle, heroDeck, ...)
- Yksi funktiotiivinen arvo (epistemicNote → ottaa viitemäärän parametrina)
- Yksi array (impactGrid → 6 objektia per kieli)

---

## MAHDOLLISET LAAJENNUKSET (EI TOTEUTETTU)

- [ ] Populaatiovertailu-komponentti (WorldMap-integraatio etusivulle)
- [ ] Animoitu scrolli-siirtymä osioiden välillä
- [ ] "Lue lisää" -laajennukset pitkissä osioissa (mobiili)
- [ ] Dynaaminen Bradford Hill -summa etusivulle
- [ ] Kavioplotti TFR vs kWh/capita etusivulle
