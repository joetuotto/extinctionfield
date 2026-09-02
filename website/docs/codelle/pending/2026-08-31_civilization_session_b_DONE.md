# CODELLE — Sivilisaatiotason BERM-integraatio — Session B (deferred)

**Lähde:** BERM_CODELLE_sivilisaatio_integraatio.md, versio 2026-08-31-CIVILIZATION
**Session A VALMIS:** 2026-08-31
**Session B VALMIS:** 2026-08-31

## Toteutettu (Session A)

- [x] Civilization-sivu: 6 uutta osiota (Biological Law, Prophets, Solar, Three Laws, Migration, Last Barbarian)
- [x] BioCap-visualisointi: 2 kaaviota (normalized + timeline), 6 sivilisaatiota
- [x] Prophets of Doom -konvergenssitaulukko (9 ajattelijaa, 5 lokaalia)
- [x] references.json: 9 uutta viitettä (3 oli jo olemassa)
- [x] Käännökset kaikille 5 lokaalille (en/fi/ja/fr/ko)
- [x] Testattu ja julkaistu Verceliin

## Toteutettu (Session B — essee)

- [x] CivilizationEssay-komponentti (EN+FI, ~2500 sanaa/kieli)
- [x] Epistemic banner + falsifikaatiokortti
- [x] SolarMiniTimeline (inline SVG, 6 suurminimia, 5 renessanssia)
- [x] BiocapSparkline (9 väestöä, BioCap + TFR)
- [x] SEO-metadata 5 lokaalille
- [x] Navigaatio: /civilization Model ja Evidence väliin
- [x] Julkaistu Verceliin

## Toteutettu (Session B — deferred-tehtävät)

- [x] **Python-malli** — `berm/berm/civilization/` (7 moduulia: biocap.py, solar_reconstruction.py, chi_map.py, migration_gradient.py, historical_test.py, empire_lifespan.py + __init__.py; 36 testiä)
- [x] **Explore: Civilization Timeline** — interaktiivinen SVG-aikajana -3500→2100, 11 imperiumia, 6 suurminimia, renessanssimerkit, BioCap-värit, uusi "Civilizations"-välilehti Explore-sivulle
- [x] **Model-sivu: "From Biology to Civilization"** — 10-askeleen kausaaliketju (0→10), BioCap-integraali formaalinen esitys, EN+FI, lisätty TOC:iin
- [x] **Predictions: E-CIV-1→E-CIV-5** — 5 sivilisaatiotason ennustetta (No Renaissance, African Decline, Pronatalist Ceiling, Tech-Restricting Communities, Cross-Species Gradient), EN+FI+labels 5 lokaalille
- [x] **Evidence: Historical Convergence** — uusi alasivu, 11 havainnoitsijaa × BERM-vastine × VK, konvergenssisynteesin osio, lisätty evidence-sivun navigaatioon
- [x] **Migration Gradient -kartta** — interaktiivinen SVG-maailmankartta 9 aluetta, BioCap-värikoodaus, 5 muuttovirtanuolta, hover-tooltips, integroitu civilization-sivulle
- [x] PMC10601200 viite lisätty references_full.json:iin (korjasi Vercel build-virheen)
- [x] Kaikki testattu ja julkaistu Verceliin (READY)

## Episteemiset varoitukset (koskevat kaikkia tehtäviä)

- BioCap-integraali on KONSEPTUAALINEN työkalu, ei kalibroitu parametri
- Historiallinen data on HARVA ja VALIKOITU (15 empiretransitiota, 13 renessanssia)
- Kausaliteettia EI voi todistaa historiallisesta datasta
- "Monotoninen lasku" on FALSIFIOITAVA ennuste
