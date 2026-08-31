# Codelle: Testosteroni→TFR kynnösmalli — mallin ennustava ydin

**Status:** [KOODI] TOTEUTETTU ✓ | [PROJEKTI] JULKAISTU ✓
**Päivämäärä:** 2026-08-24
**Julkaistu:** extinctionfield.com

## Toteutetut osat

### OSA I: Datalähde
- [x] `lib/thresholdModel.ts` — 6 maan parametrit (USA, Denmark, Finland, Israel, South Korea, Japan)
- [x] `CountryThresholdData` interface, `THRESHOLD_COUNTRIES`, `PHASE_LABELS`, `computeTIndex()`, `computeThresholdLine()`

### OSA II: Referenssit
- [x] 8 uutta referenssiä `references_full.json`:iin (667→675)
- [x] travison-2007-mmas, andersson-2007-denmark, perheentupa-2013-finland, chodick-2020-israel, santi-2025-meta-analysis, antioxidants-2026-global-decline, skakkebaek-2015-physrev, plosone-2013-obesity-testosterone
- [x] Kaikilla `finding`, `pathway`, `tags` -kentät

### OSA III: SVG-visualisoinnit
- [x] `components/ThresholdChart.tsx` — interaktiivinen maakohtainen T-indeksi + TFR kaavio
- [x] `components/FinlandLagChart.tsx` — Suomen 35v viive -visualisointi
- [x] `components/ThreePhaseIndicator.tsx` — kolmivaiheinen maa-indikaattori

### OSA IV: Model-sivu
- [x] Uusi "Testosterone → TFR Threshold Model" -osio (`#testosterone-threshold`)
- [x] 3 vaiheen kortit (vihreä/keltainen/punainen)
- [x] Matemaattinen formulaatio
- [x] 6 maan parametritaulukko faasimerkinnöin
- [x] Suomen retrospektiivinen validointi (sininen laatikko)
- [x] Interaktiivinen ThresholdChart
- [x] Kaksikielinen (EN+FI)

### OSA V: Etusivu
- [x] Uusi "The 35-Year Warning" / "35 vuoden varoitus" -osio
- [x] FinlandLagChart
- [x] ThreePhaseIndicator
- [x] Narratiivi + caveat
- [x] Linkki model#testosterone-threshold

### OSA VI: Ennusteet
- [x] 5 uutta T-TFR ennustetta:
  - T-TFR-1: USA TFR < 1.30 by 2035 (CRITICAL)
  - T-TFR-2: Finland TFR < 1.00 by 2032
  - T-TFR-3: Israel TFR decline by 2035
  - T-TFR-4: Korea pronatalism fails
  - T-TFR-5: T decline predicts TFR better than GDP

### OSA VII: Julkaisu
- [x] TypeScript-käännös OK
- [x] Selaintestaus localhost (EN+FI, kaikki 3 sivua)
- [x] Tuotantojulkaisu Vercel (extinctionfield.com)
- [x] Tuotantoverifiointi selaimessa

## Kriittiset rajoitteet (säilytetty)
- Korean ja Japanin T-laskuprosentit ovat ARVIOITA — ei esitetä samalla varmuudella kuin USA/Finland/Israel/Denmark
- 40% kynnys on KALIBROITU, ei JOHDETTU
- ~35v viive on SUOMEN datasta — muut maat voivat poiketa
- Israelin poikkeus on INFORMATIIVINEN, ei ongelma

## Jälkitoteutus (2026-08-25)
- [x] Explore/Data-sivun interaktiivinen maavertailu — uusi "T→TFR" -välilehti (`ThresholdExplorer.tsx`)
- [x] Evidence-sivun T-decline anchor (`#testosterone`) — 5 tutkimuksen taulukko + linkit malliin ja ennusteisiin
- [x] Julkaistu tuotantoon extinctionfield.com
