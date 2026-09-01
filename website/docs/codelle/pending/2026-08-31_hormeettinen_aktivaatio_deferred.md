# Completed items from CODELLE: HORMEETTINEN AKTIVAATIO + KULTTUURINEN ENERGIA

Source: User message 2026-08-31 (Codelle instructions)
Date: 2026-08-31 / 2026-09-01

## Completed items — Hormetic Activation

### Civilization page (civilization/page.tsx)
- [x] EN COPY: sActivationTitle, sActivationLead, sActivationBody1-4, sActivationChartTitle/Zone1-3/X/Y/Sun
- [x] EN COPY: sExpansionTitle, sExpansionCards (3 types: α hormetic, β recovery, γ erosion)
- [x] FI COPY: Full Kotus-compliant translations of all activation and expansion keys
- [x] JA/FR/KO COPY: Title stubs + translated labels
- [x] JSX: Activation Cycle section with inline SVG hormetic dose-response chart
- [x] JSX: Three Types of Expansion section with 3-column card grid
- [x] Finnish language improvements: "mobiilipenetraation" → "mobiiliverkkojen leviämisen", "populaatio" → "ryhmä"

### Evidence page (evidence/page.tsx)
- [x] EN COPY: horm_section_title, horm_section_intro, 4 research lines (experimental, genetic, epidemiological, neuroendocrine)
- [x] FI COPY: Full Kotus-compliant translations of all hormesis evidence keys
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: "Hormesis and Biological Activation" section with 4 evidence cards

### Predictions page (predictions/page.tsx)
- [x] EN COPY: actTitle, actLead, actPredictions with E-ACT-1, E-ACT-2, E-ACT-3
- [x] FI COPY: Full Kotus-compliant Finnish translations of all E-ACT predictions
- [x] JA/FR/KO COPY: Title stubs for 3 predictions
- [x] JSX: Hormetic activation predictions section between civilization and space weather

### Model page (model/page.tsx)
- [x] EN COPY: hormesisTitle, hormesisDesc, hormesisFormula (piecewise h(Ā, δA)), hormesisTerms (7 symbols), hormesisZone1-3
- [x] FI COPY: Full translations of hormesis formula section
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: Hormetic dose-response extension section with formula, term grid, 3-zone cards

### References (references_full.json)
- [x] 8 new references added (liu1989_radiation_hormesis, eisenberg2008_drd4_ariaal, swanson2023_pastoralist_health, mayagoitia2023_urban_cortisol, kostyuk2021_ldr_mitochondria, yang2016_atm_hormesis, zhou2018_ldr_tumor_inhibition, vaiserman2021_ldr_hormetin)
- [x] total_references updated 1014 → 1022

### Epistemic warnings — REMOVED 2026-08-31
All epistemic guardrails were removed per user feedback ("ei tällaisia muutoksia"):
- sActivationEpistemic cleared (civilization EN + FI)
- horm_exp_note, horm_gen_note, horm_neuro_note, horm_epistemic cleared (evidence EN + FI)
- hormesisEpistemic cleared (model EN + FI)

## Completed items — Cultural Energy Codelle (2026-09-01)

### Data (public/data/)
- [x] berm_cultural_energy_model.json — 33 trajectory data points (1900-2060), 8 biomarker database entries

### Components
- [x] BiomarkerRadar.tsx — Pure SVG radar chart for 8 biomarkers, CSS variable theming
- [x] BiocapTrajectory.tsx — BiocapTrajectory + BiomarkerTrajectoryLines exports, phase-colored bands

### Civilization page (civilization/page.tsx)
- [x] EN COPY: sCulturalTitle through sCulturalTransitions (full Unwin integration prose)
- [x] FI COPY: Full Kotus-compliant translations
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: Cultural Energy section with radar chart, trajectory charts, Unwin phases, sensitivity grid

### Evidence page (evidence/page.tsx)
- [x] EN COPY: sec_trends_title, sec_trends_intro, sec_trends (8 biomarker secular trend cards)
- [x] FI COPY: Full Finnish translations of secular trends section
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: Biomarker Secular Trends section with 8 mini-cards

### Model page (model/page.tsx)
- [x] EN+FI COPY: BioCap decomposition section (biocapDecompTitle, markers table)
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: BioCap decomposition rendering

### Mathematics page (mathematics/page.tsx)
- [x] EN+FI COPY: §16 Cultural Energy Formalization (s16title, s16body)
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: §16 section rendering
- [x] Sidebar nav entry for §16 in all 5 locales

### Home page (page.tsx)
- [x] BioCap 0.648 stat card added to metrics grid (EN + FI)
- [x] Activity icon for BioCap stat
- [x] Grid updated to 6-column layout

### References (references_full.json)
- [x] 6 new references: unwin1934, unwin1940, bratsberg2018, dworak2023, holt_lunstad2015, jiang2003
- [x] total_references updated 1022 → 1028, unlinked_count updated to 650

### Python modules (berm/civilization/)
- [x] cultural_energy.py — compute_biocap(), compute_cultural_energy()
- [x] biomarker_trajectories.py — BiomarkerTrajectory class with logistic decline curves
- [x] unwin_validation.py — Phase enum, classify_phase(), detect_transitions()
- [x] sensitivity.py — sensitivity_single(), sensitivity_all()
- [x] phase_transitions.py — identify_transitions(), predict_next_transition()
- [x] __init__.py — re-exports all public symbols
- [x] tests/test_cultural_energy.py — 32 tests, all passing
