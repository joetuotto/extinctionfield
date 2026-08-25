# Viitelinkkien tayttö: tarkistettavat kohdat

Paivays: 2026-08-25
Tila: automaattinen osuus valmis; alla olevat vaativat manuaalisen vahvistuksen

---

## Tehty automaattisesti

| Rekisteri | Ennen | Jalkeen |
|---|---|---|
| `website/public/data/references_full.json` | 182/692 linkitetty | 302/692 |
| `website/lib/legacyEvidence.json` | 0/150 (ei url-kenttaa) | 70/150 |
| Sivujen sisaiset viittaukset | 0/217 | 153/217 |

Tyokalut (ajettavissa uudelleen kun viitteita lisataan):

```bash
python3 berm/resolve_reference_links.py --apply   # hakee puuttuvat DOI:t
python3 berm/export_citation_links.py             # generoi lib/citationLinks.ts
python3 berm/verify_reference_links.py            # tarkistaa etta linkit aukeavat
```

Kaikki 372 linkkia on tarkistettu doi.org:ia vasten. Yksikaan ei palauta 404:aa.

---

## 1. [PROJEKTI] Tasmalliset otsikko-osumat, joissa vuosi ei tasmaa

Nama loytyivat Crossrefista otsikolla ja tekijalla tasmalleen, mutta rekisterin
vuosi poikkeaa. Osa on rekisterin vuosivirhe, osa on eri julkaisu samalla
otsikolla. Ei hyvaksytty automaattisesti — vaatii silmamaaraisen tarkistuksen.

| id | rekisterin vuosi | ehdokkaan vuosi | ehdokas-DOI | otsikko |
|---|---|---|---|---|
| `weyl1918` | 1918 | 1923 | `10.1007/978-3-663-19510-8_11` | Gravitation und Elektrizität |
| `aitken2024` | 2024 | 2006 | `10.5694/j.1326-5377.2006.tb00634.x` | Male reproductive health and the environment |
| `davydov1985` | 1985 | 1991 | `10.1007/978-94-011-3340-1` | Solitons in Molecular Systems |
| `scott1999` | 1999 | 2003 | `10.1093/oso/9780198528524.001.0001` | Nonlinear Science |
| `dunbar1998` | 1998 | 2002 | `10.7551/mitpress/3077.003.0007` | The social brain hypothesis |
| `burgess2013` | 2013 | 2016 | `10.1016/j.envres.2016.06.031` | Acute exposure to terrestrial trunked radio (TETRA)  |
| `chaplin2009` | 2009 | 2000 | `10.1016/s0301-4622(99)00142-8` | A proposal for the structuring of water |
| `singh2019` | 2019 | 2017 | `10.1186/s12967-017-1175-y` | Influence of diet on the gut microbiome and implicat |
| `early_onset_colorectal_lancet_2024` | 2024 | 2019 | `10.1136/gutjnl-2019-319511` | Global patterns and trends in colorectal cancer inci |
| `adey1976_calcium_window` | 1976 | 1982 | `10.1002/bem.2250030302` | Effects of weak amplitude-modulated microwave fields |
| `circres-2002-cav13-sa-ihc` | 2002 | 2000 | `10.1016/s0092-8674(00)00013-1` | Congenital deafness and sinoatrial node dysfunction  |
| `czerski1979` | 1979 | 1975 | `10.1111/j.1749-6632.1975.tb35998.x` | Microwave effects on the blood-forming system with p |
| `panagopoulos2013` | 2013 | 2015 | `10.1038/srep14914` | Polarization: A Key Difference between Man-made and  |

Tarkista kunkin kohdalla kumpi vuosi on oikein. Jos rekisterin vuosi on vaara,
korjaa vuosi ja aja `resolve_reference_links.py --apply` uudelleen.

---

## 2. [KOODI] Tyhjennetyt rikkinaiset tunnisteet

Naiden DOI palautti doi.org:sta 404:n tai oli sisainen avain. Kentta on
tyhjennetty, jotta sivusto ei tarjoa rikkinaista linkkia — merkinta nakyy nyt
ilman linkkia. Osalle on todennakoinen vastine, jota ei ole vahvistettu.

| id | poistettu arvo | huomio |
|---|---|---|
| `amish-cancer-westman-2010` | `10.1007/s10552-010-9533-7` | Low cancer incidence rates in Ohio Amish (10.1007/s10552-009-9435-7) — eri otsikko, ei varmistettu |
| `reiter2007_melatonin_male` | `10.1095/biolreprod.107.060655` | Melatonin and Reproduction Revisited (10.1095/biolreprod.108.075655, Biol Reprod 2009) — otsikko osuu, vuosi 2007 vs 2009 |
| `pubmed10447544_icu_emf` | `10.1097/00003246-199908001-00028` | ei varmistettua vastinetta |
| `lim2024_skin_battery` | `10.1177/20417314241234567` | keksitty tunniste (…1234567); ei varmistettua vastinetta |
| `pmc12815752_hospital_rf` | `10.3389/fpubh.2025.1234567` | keksitty tunniste (…1234567); ei varmistettua vastinetta |
| `tang2015_900mhz_bbb` | `Tang2015_BBB` | sisainen avain, ei tunniste; Crossref-ehdokas ei riittavan varma |
| `dasdag2015_wifi_mirna` | `Dasdag2015_WiFi_miRNA` | todennakoinen: 10.3109/09553002.2015.1028599 (Int J Radiat Biol 2015) — rekisterin otsikko on parafraasi |
| `leszczynski2002_hsp27_bbb` | `Leszczynski2002` | sisainen avain, ei tunniste; ei varmistettua vastinetta |
| `elmallakh2004_nakatpase` | `ElMallakh2004` | todennakoinen: 10.1016/0006-3223(94)00201-d (Biol Psychiatry) — vuosi 2004 vs 1995 |

---

## 3. [PROJEKTI] Linkittamatta jaaneet merkinnat

390 merkintaa jai ilman linkkia. Jakauma:

| syy | maara |
|---|---|
| artikkelin muotoinen (otsikkohaku ei loytanyt vastinetta) | 206 |
| vuodeton merkinta | 81 |
| muistiinpano (tekijakentta toistaa otsikon) | 47 |
| parafrasoitu otsikko (tekija: Various) | 29 |
| viranomais- tai politiikka-asiakirja | 19 |
| kirja | 8 |

Suurin yksittainen ryhma on "artikkelin muotoinen": naissa rekisterin otsikko on
parafraasi tai lyhennelma julkaisun oikeasta otsikosta, jolloin otsikkohaku ei
loyda vastinetta. Naiden korjaaminen edellyttaa oikean otsikon kirjaamista
rekisteriin — sen jalkeen haku loytaa DOI:n automaattisesti.

Loput ovat merkintoja, joilla ei ole DOI:ta: politiikka-asiakirjoja,
viranomaisraportteja, kirjoja ja projektin omia muistiinpanoja.

---

## 4. [PROJEKTI] Linkittamatta jaaneet sivuviittaukset

64 sisaista viittausta 217:sta jai ilman linkkia. Nama eivat
ole tieteellisia artikkeleita vaan:

- FDA-hyvaksyntoja ja patentteja (EBI, NeuroStar, Optune, GammaCore, Novocure)
- EU-direktiiveja ja tilastolahteita (World Bank, OECD)
- BERM:n omia analyyseja (v17.1-kaavanloyto, palautumisikkunamalli)
- kuvailevia nimikkeita, jotka eivat nimea tutkimusta tekijan mukaan
  ("UK weather radar insect study", "Dual-hormone meta-analysis")

Naille voi lisata linkin kasin tiedostoon
`berm/data/evidence/citation_link_overrides.json` (avain: normalisoitu nimike +
`|` + vuosi). Generaattori poimii ne seuraavalla ajolla.
