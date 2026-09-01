# CODELLE — Avaruussää-integraatio — Session 1+2+3

**Lähde:** BERM_CODELLE_avaruussaa_integraatio.md
**Toteutettu:** 2026-08-31

## Toteutettu (Session 1 — STRUCTURAL CHANGE)

- [x] **causalChainData.ts: chi_spin** — uusi tason 2 solmu (spin-herkkyysfunktio χ_B, CRY/RPM)
- [x] **causalChainData.ts: natural_em** — uusi tason 3 solmu (5 luonnollisen EM:n kerrosta: SR, Pc1, geoB, aurinko, GIC)
- [x] **causalChainData.ts: three_channel** — two_channel → three_channel (total = natural + ambient + χ(Ā)×personal)
- [x] **causalChainData.ts: gic_crossterm** — uusi tason 3 solmu (myrsky → verkko → harmoninen → ELF)
- [x] **causalChainData.ts: 5 uutta reunaa** — geometry→chi_spin, chi_spin→three_channel, natural_em→three_channel, gic_crossterm→channel_elf, natural_em→gic_crossterm
- [x] **references_full.json: 15 uutta viitettä** — space_weather_biology-kategoria (Wever, Tatsis, Kleimenova, Otsuka, McCraty, NSR, Hirayama, Cooper ym.)
- [x] **Tekstitason päivitykset** — kaksikanava→kolmikanava kaikissa tiedostoissa (evidence/devices, evidence/epidemiology, causalMapData, references)
- [x] **lib/model/lindgren.ts** — threeChannelExposure-funktio lisätty

## Toteutettu (Session 2 — CONTENT)

- [x] **ThreeBiologicalBands.tsx** — SVG-kaavio kolmesta biologisesta taajuuskaistasta (ULF/ELF/RF)
- [x] **TwoSusceptibilities.tsx** — SVG-kaavio kahdesta herkkyysfunktiosta (χ(Ā) + χ_B)
- [x] **Model-sivu: integraatio** — molemmat kaaviot CollapsibleSectioneissa, TOC 5 lokaalille
- [x] **Evidence: ISS hypomagnetic** — uusi alasivu, astronauttien sirkadiaanihäiriöt, CRY-mekanismi, 6 vaikutusriviä
- [x] **Evidence: Space Weather and Biology** — uusi alasivu, SR/Pc1/GIC-osiot, BERM-tulkinta, falsifikaatio

## Toteutettu (Session 3 — EXTENSION)

- [x] **Predictions: 3 uutta ennustetta** — GIC-HEALTH-1, SR-MASKING-1, ISS-MEL-MAGFIELD-1 (EN+FI + 3 lokaalin labelit)

## Jäljellä (Session 3 — deferred)

- [x] **Explorer: natural EM -visualisaatio** — NaturalEMVisualization-komponentti, ExploreTabs + navigation.ts päivitetty
- [x] **Heliobiology-osio** — evidence-alasivu app/[locale]/evidence/heliobiology/page.tsx, SUB_PAGES-lisäys
- [x] **Laschamp-reversal** — evidence-alasivu app/[locale]/evidence/laschamp-reversal/page.tsx, SUB_PAGES-lisäys

## Episteemiset varoitukset

- CRY/RPM-mekanismi on osoitettu magnetoreseptorissa mutta EI VIELÄ täysin kalibroitu ihmisen sirkadiaanisessa säätelyssä
- Weverin bunkkerikokeet (1968–1979) ovat vanhoja ja vaativat modernia replikaatiota
- GIC-ristitermi on TEOREETTINEN ennuste — empiiristä validointia ei ole vielä
- SR:n peittyminen kaupungeissa on MITATTU mutta biologinen merkitys on KORRELAATIO ei kausaliteetti
