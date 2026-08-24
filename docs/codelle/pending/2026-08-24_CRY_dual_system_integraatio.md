# CRY-kaksoissysteemi ja ravitsemuksellinen modulaatio — integraatio-ohje

**Päiväys:** 2026-08-24
**Episteeminen taso:** L* (testattava hypoteesi)
**Status:** Toteutettu koodissa ja sivustolla

## Ydinlöytö

Verkkokalvolla on KAKSI erillistä CRY-järjestelmää:
- **CRY1:** Sinisten tappisolujen ulkosegmentit (sensorinen/fototransduktiivinen)
  - Bartölke ym. 2025, FASEB J, doi:10.1096/fj.202402614R
- **CRY2:** Gangliosolut (sirkadiaaninen kello)
  - Olemassa oleva malli, Yap ym. 2025 (CRY2-TRPC1)

## Polku C jaetaan:
- **C1 (CRY1-sensorinen):** E-taso proteiinilokalisaatiolle, L*-taso magnetoreseptiotulkinnalle
- **C2 (CRY2-sirkadiaaninen):** E-taso (vahvistettu monella menetelmällä)

## Ravitsemukselliset modulaattorit (koskevat molempia):
- **B2/FAD** → CRY-stabiilisuus (Hirano 2017) + magneettinen herkkyys (Yap 2025)
- **Omega-3/7** → kalvon CRY-orientaatio (Majewska 2025, ACS Chem Biol)
- **Luteiini/zeaksantiini** → verkkokalvon ROS-suoja

## Paastoparadoksi:
- AMPK → CRY1-hajotus (Lamia 2009, Science) VS paasto → magnetoreseptio (Chae 2019)
- **Ratkaisu:** nopeampi CRY-turnover + parempi FAD-lataus per molekyyli
- Nettovaikutus: korkeampi CRY-LAATU matalammasta MÄÄRÄSTÄ huolimatta
- Ratkaisu on L*-tason hypoteesi

## Toteutetut muutokset

### Koodimuutokset:
1. `model/page.tsx`: cryDualSystemNote (EN+FI) — C1/C2-kuvaus
2. `lib/causalMapData.ts`: 3 uutta solmua (mod_fad_riboflavin, mod_membrane_omega, mod_ampk_fasting) + 5 uutta reunaa
3. `v16.py`: v18_nutritional_cry_modifier() placeholder-funktio
4. `lib/eyeColorData.ts`: 4 uutta evidenssikorttia (Bartölke, Majewska, Lamia, B2-konsolidoitu)
5. `evidence/eyes/page.tsx`: Bartölke 2025 -päivitysosio + Paastoparadoksi-osio
6. `predictions/page.tsx`: NUT-1, NUT-2, NUT-3 ennusteet
7. `references_full.json`: 4 uutta viitettä (bartolke2025, majewska2025, lamia2009, wacker2000)

### Episteemisen auditoinnin muutokset (aiemmasta sessiosta):
- model/page.tsx: pathwayHierarchyNote, rpmFrequencyNote (jo aiemmin)
- evidence/page.tsx: Lab baseline bias symmetria, WHO-tulkinta, kaksi tulkintakehystä
- predictions/page.tsx: CI-ylitysten kolmihaarainen falsifikaatioanalyysi

## Avoimet kysymykset

1. **Polkujen B/C painoristiriita:** model/page.tsx B=15%/C=25% vs LBERMv4Model.wl B=25%/C=15%
   - ODOTTAA OTON PÄÄTÖSTÄ
2. **v18_nutritional_cry_modifier()** on PLACEHOLDER — ei kutsuta optimoinnissa
3. Kun B2-data integroidaan 54 maan datasettiin, testataan NUT-2-ennuste
