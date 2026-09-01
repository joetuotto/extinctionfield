# Completed items from CODELLE: HORMEETTINEN AKTIVAATIO — Barbaarin biologinen mekanismi

Source: User message 2026-08-31 (Codelle instruction)
Date: 2026-08-31

## Completed items

### Civilization page (civilization/page.tsx)
- [x] EN COPY: sActivationTitle, sActivationLead, sActivationBody1-4, sActivationChartTitle/Zone1-3/X/Y/Sun, sActivationEpistemic
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
- [x] JSX: "Hormesis and Biological Activation" section with 4 evidence cards + epistemic warning

### Predictions page (predictions/page.tsx)
- [x] EN COPY: actTitle, actLead, actPredictions with E-ACT-1, E-ACT-2, E-ACT-3
- [x] FI COPY: Full Kotus-compliant Finnish translations of all E-ACT predictions
- [x] JA/FR/KO COPY: Title stubs for 3 predictions
- [x] JSX: Hormetic activation predictions section between civilization and space weather

### Model page (model/page.tsx)
- [x] EN COPY: hormesisTitle, hormesisDesc, hormesisFormula (piecewise h(Ā, δA)), hormesisTerms (7 symbols), hormesisZone1-3, hormesisEpistemic
- [x] FI COPY: Full translations of hormesis formula section
- [x] JA/FR/KO COPY: Title stubs
- [x] JSX: Hormetic dose-response extension section with formula, term grid, 3-zone cards, epistemic note

### References (references_full.json)
- [x] 8 new references added (liu1989_radiation_hormesis, eisenberg2008_drd4_ariaal, swanson2023_pastoralist_health, mayagoitia2023_urban_cortisol, kostyuk2021_ldr_mitochondria, yang2016_atm_hormesis, zhou2018_ldr_tumor_inhibition, vaiserman2021_ldr_hormetin)
- [x] total_references updated 1014 → 1022
- [x] All DOIs/PMIDs verified via NCBI API

### Epistemic warnings (applied throughout)
- [x] Ionizing radiation extrapolation caveat on evidence page
- [x] Animal model limitation for Liu 1989
- [x] Small sample warning for Eisenberg 2008 (n=152)
- [x] Mayagoitia 2023 framing: cortisol/testosterone responses, not neuroimaging
- [x] Three expansion types labeled as analytical tools
- [x] Neutral language throughout: "biological activation of low-EMF populations"

## Remaining items (deferred)

### Cultural Energy Codelle (kulttuurinenenergia.zip)
- [ ] BioCap trajectory visualization (1900-2060 from berm_cultural_energy_model.json)
- [ ] 8 biomarker time series integration
- [ ] Unwin civilization mapping (sessions 1-3 from BERM_CODELLE_kulttuurinen_energia_integraatio.md)
- [ ] Python modules for cultural energy model
- Reason: Separate Codelle instruction, dependency of hormetic activation but out of scope for this session

### Reference year discrepancies (from verification)
- [ ] PMC8745621 (Kostyuk): Verify year — NCBI shows 2021, entered as 2021 ✓
- [ ] PMC5342128 (Yang): Verify year — NCBI shows 2016, entered as 2016 ✓
- [ ] PMC10360937 (Mayagoitia-Novales): Finding description uses cautious framing ✓
