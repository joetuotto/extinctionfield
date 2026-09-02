# Codelle: 20-tason verifikaatio — kokoava integraatio-ohje
## Versio: 2026-08-24-LEVELS-11-20
Tunnisteet: [KOODI], [PROJEKTI]

## Status: IMPLEMENTED (2026-08-24)

### OSA I: VGCC-geeniperhe — uusi mallin ydinrakenne
- [x] `lib/vgccGeneFamily.ts` — 6 geeniä (CACNA1C, CACNA1D, CACNA1A, CACNA1G, CACNA1H, CACNA1I)
  - Bilingual disease associations (EN/FI)
  - Evidence levels, EMF relevance, key references
  - TypeScript interface `VGCCGene`

### OSA II: 10 uutta sairauskaskadia
- [x] model/page.tsx — Cascades 9-18 added as "Extended Disease Cascades" section
  - Cascade 9: Myopia (M)
  - Cascade 10: Autoimmune Diseases (M|C)
  - Cascade 11: Hearing Loss & Tinnitus (M|C)
  - Cascade 12: Migraine (E)
  - Cascade 13: Sleep Architecture Disruption (M|C)
  - Cascade 14: PCOS (M)
  - Cascade 15: Chronic Pain (M|C)
  - Cascade 16: Cardiac Arrhythmia/QT (E)
  - Cascade 17: Neurodevelopment & Sexual Differentiation (L*)
  - Cascade 18: TheraBionic Proof of Mechanism (E)
  - Rendered as responsive card grid with epistemic level badges

### OSA III: Sivuston rakennemuutokset
- [x] Evidence page — TheraBionic clinical validation section (prominent, before bounded records)
  - FDA device info, mechanism, SAR comparison, CCB contraindication
  - Emerald-accented cards and highlighted implication box
- [x] Modulome — 8 → 10 organs
  - `organs.ts` — added Inner Ear (Cav1.3) and Spinal Cord/DRG (Cav3.2)
  - `ModulomeTabs.tsx` — added ear + pain tabs (EN/FI)
  - `modulome/page.tsx` — "Eight → Ten Target Organs" text updated (EN/FI)
- [x] `modulome/ear/page.tsx` — new page (496 lines)
  - Section 1: Cav1.3 and Inner Hair Cells
  - Section 2: IL-6 → Cav1.3 Upregulation → Hearing Loss
  - Section 3: Bluetooth/Earphone EMF Proximity
- [x] `modulome/pain/page.tsx` — new page (433 lines)
  - Section 1: Cav3.2 — The Primary Pain Channel
  - Section 2: Sex Differences in Pain
  - Section 3: EMF and Pain Sensitization
  - Sensitive topic handled with mechanistic framing, not treatment advice
- [x] `VGCCGeneFamilyDiagram.tsx` — star/hub SVG diagram (219 lines)
  - 6 gene nodes with disease branches, bilingual
  - Integrated into model page disease cascades section
- [x] Cross-links: brain page → ear + pain; ear/pain → brain/predictions/evidence

### OSA IV: Viitteet
- [x] 20 new references added to references_full.json (626 → 646)
  - TheraBionic (eBioMedicine, FDA HDE)
  - Hearing (Aging Cell 2024, Brain 2026)
  - Pain (Mol Aspects Med 2021)
  - Sleep (PNAS 2005, PNAS 2011)
  - Migraine (NEJM 2001, PMC 2022)
  - Autoimmune (Frontiers Immunol 2020)
  - PCOS (GBD 2021/2025)
  - Cardiac (HeartRhythm 2023, PMC 2014)
  - Myopia (Frontiers Ophthalmol 2026)
  - Neurodevelopment (Neuropsychopharmacology 2022, Biol Sex Diff 2015, BST 2020)
  - Pediatric autoimmune (PMC 2025)
  - Sleep/schizophrenia (PMC 2019)

### OSA V: Ennusteet
- [x] 10 new predictions added as "VGCC Gene Family Predictions" section
  - MYOP-1: Outdoor EMF reduction and myopia (L*, discriminating)
  - IMMUNE-1: NFAT activation in T-cells (M|C)
  - HEAR-1: Bluetooth hearing loss (M|C)
  - MIGR-1: CACNA1I × EMF migraine (E, discriminating)
  - SLEEP-2: Sleep spindle density (M|C)
  - PCOS-1: PCOS × EMF density (M)
  - PAIN-1: Cav3.2 blocker vs EMF pain (M|C, discriminating)
  - QT-1: QTc × EMF exposure (M|C)
  - TDP-1: TheraBionic + T-type blocker (E, discriminating, partially verified)
  - UNIFIED-1: Cross-system VGCC biomarker correlation (M, discriminating)

### Not yet implemented (future work):
- [ ] Individual evidence sub-pages for each cascade disease
- [ ] ~~Explore Body tab visual update for ear + DRG markers~~ — VANHENTUNUT (2026-09-02): Body-välilehteä ei ole; `/modulome/ear` ja `/modulome/pain` ovat olemassa. Ei toimenpiteitä.
- [ ] modulome/ear and modulome/pain detail expansions with more references
