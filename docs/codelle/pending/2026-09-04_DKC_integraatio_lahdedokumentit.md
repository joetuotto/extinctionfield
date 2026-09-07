# Odottava projektipäivitys

- **Lähdeohje:** CODELLE "Dual-Kernel Insight -kehyksen integrointi" (3.9.2026, versio 1.0)
- **Askeleet:** OSA 1 kokonaan, OSA 2.1, OSA 2.2 kohta 5, OSA 2.3 kohta 1
- **Tila:** ODOTTAA
- **Suorittava työkalu:** Claude-sessio, jolla on pääsy projektin knowledge baseen
- **Kirjattu:** 2026-09-04

## Miksi nämä eivät ole suoritettavissa repossa

Ohje viittaa viiteen lähdedokumenttiin, joita ei ole tässä repositoriossa eikä
`docs/`-hakemistoissa. Ne on luotu Claude-projektin knowledge baseen eikä niitä
ole koskaan kirjoitettu repoon:

| Ohjeen viittaus | Tarvitaan askeleeseen | Repossa |
|---|---|---|
| `BERM/BERM_S5_EMF_modernisaatio_erottelu_evidenssi_2026-09-03.md` | OSA 1.1 (A1–A7 uudelleenluokittelu), OSA 1.2 | ei |
| `BERM/BERM_kalibraatioanalyysi_2026-09-03.md` | OSA 1.3, OSA 2.2 kohta 5 (M0–M3 → M4) | ei |
| `BERM/BERM_altistusarkkitehtuuri_auditointi.md` | OSA 1.4 | ei |
| `BERM/BERM_COVID_lockdown_luonnollinen_koe.md` | OSA 1.5 | ei |
| `BERM/EMF_TFR_testit.md` | OSA 1.6 (T1–T14 päivitys) | ei |
| `BERM/CODELLE_sivusto_malli_synkronointi.md` täysi 9-vaiheinen versio | OSA 2.3 kohta 1 | vain versiokorjausosa |

Repon `docs/codelle/CODELLE_sivusto_malli_synkronointi.md` päättyy riville
"Täysi 9-vaiheinen synkronointiohje ks. projektin BERM/…" — sen 9 vaihetta
eivät ole luettavissa täältä. Ohje itse asettaa TypeScript-perussynkronoinnin
DKC-moduulien edellytykseksi (OSA 2.3 kohta 1), joten OSA 2.3 kohta 2 ja
muutoslistan kohta 18 jäävät myös odottamaan.

## Mitä pitää tehdä

### a) Kirjoita viisi lähdedokumenttia repoon
Kopioi ne `berm/docs/`-hakemistoon (sinne kuuluvat analyysidokumentit) tai
`docs/analysis/`-hakemistoon. Ilman niitä OSA 1:n auditointia ei voi tehdä
kenenkään toimesta, koska auditoitavaa kohdetta ei ole.

### b) OSA 2.2 kohta 5 — M4 kalibraatiokehykseen
Ohje pyytää lisäämään M4:n (DKC) ja M5:n (DKC × spektraali) "M0–M3
-vertailukehykseen". **Sitä kehystä ei ole repossa.** Repon M0 on eri asia:
`berm/stats/hierarchical.py:648` `HierarchicalM0` on kovariaattipohjainen
ridge-verrokki, ja `berm/stats/global_backtest.py:13` käyttää sitä samalla
merkityksellä. Ohjeen M1 (cumEMF), M2 (eksponentiaalinen decay τ-estimoinnilla)
ja M3 tulevat kalibraatioanalyysidokumentista, jota ei ole.

Kun dokumentti on repossa, ratkaise ensin kumpi tarkoitetaan, äläkä lisää
M4:ää väärään kehykseen.

**Tässä sessiossa tehty vastaava työ:** kernelvertailu on toteutettu itsenäisenä
`berm/berm/diagnostics/dual_kernel.py`-moduulissa yksi- ja kaksois-kernelin
BIC- ja LOOCV-vertailuna, tulokset `berm/docs/dkc-identification-and-saturation-tests.md`.
Tulos on, että kaksois-kernel-hajotelma **ei identifioidu** monotonisella
altistusrampilla (kernelien r ≥ 0,98; hitaan painon paino → 0 merkkirajoitteella).
Se on syytä lukea ennen kuin M4 lisätään mihinkään kehykseen.

### c) OSA 2.1 — LBERMv4Model.wl
Ohje pyytää arvioimaan `communityFitFunction[eac]`-muutokset. Tiedosto ei ole
tässä repossa; se on `/Users/ottojuote/BERM CODE/LBERMv4Model_1.wl`
(340 kB, 18.8.2026). Lisäksi tämän session Wolfram-MCP ei käynnistynyt
(`ENOENT: /Applications/Wolfram.app/Contents/MacOS/wolfram`), joten
Mathematica-koodia ei voitu ajaa eikä verifioida.

### d) OSA 1.6 — T1–T14 ja uudet testit
T15, T16 ja T19 on ajettu tässä sessiossa (ks. yllä mainittu tulosdokumentti).
**T17 (viiden epidemian samanaikaisuus)** ja **T18 (fertility gap)** vaativat
aineistoa jota repossa ei ole:

- T17: WHO GHO, IHME GBD ja OECD -sarjat myopiasta, uniongelmista ja
  autoimmuunisairauksista 20+ maalle. `[DATA]`-tunniste, ei pending-jono.
- T18: aiottu ja ihanteellinen perhekoko (Eurobarometer, WVS, DHS).
  `[DATA]`-tunniste, ei pending-jono.

Nämä kaksi on syytä siirtää `docs/research/`-kansioon `[DATA]`-tunnisteella
CODELLE-standardin kohdan 2.1 mukaisesti, ei jättää tähän jonoon.

## Lisähuomio: ohjeen viitelistan virhe

OSA 3.7 kohta 1 luettelee "kaikki COVID-siittiötutkimukset (PubMed 41036143,
Zhang 2025, PMC10804479, PMC11472795)". Verifioinnissa 2026-09-04:

- **PMC11472795 ei ole siittiötutkimus.** Se on van Oers ym. 2024, *JCPP
  Advances*, "Changes in child and adolescent mental health across the
  COVID-19 pandemic (2018–2023)". Sitä ei voi käyttää siittiölaatuevidenssinä.
- PMID 41036143 on Kim ym. 2025, *Frontiers in Endocrinology*, ja tutkii
  **ilmasto-olojen** yhteyttä siemennesteen laatuun ennen/aikana/jälkeen
  pandemian — ei ambient-altistuksen laskua.
- PMC10804479 on Zhang QF ym. 2024, *Virology Journal*, ja vertaa tilaa
  **ennen ja jälkeen infektiota**, ei sulkua sulun jälkeiseen aikaan.

Kaikki neljä ovat jo rekisterissä (`covid_sperm_2025`, `covid_recovery_2024`,
`zhang_china_covid_2025`, `covid_6mo_recovery_2025`), joten viitteitä ei
tarvinnut lisätä. Sen sijaan **OSA 0.9:n ja OSA 1.5:n väite "COVID-sulun
siittiöparaneminen = spektraalinen yksinkertaistuminen" ei nojaa näihin
lähteisiin.** Jos väite pidetään, sille tarvitaan lähde joka vertaa
sulkuaikaista ambient-altistusta sitä edeltävään — ei infektiota eikä ilmastoa.
`zhang_china_covid_2025` on lähimpänä, mutta siltä puuttuu DOI ja PMID ja se on
`link_status: missing`; se pitäisi verifioida ensin.

## Sivustolle jo tehty (ei odota)

Muutoslistan kohdat 1–6 ja 8 sekä 12–15 on tehty 2026-09-04:

| # | Kohde | Tila |
|---|---|---|
| 1 | Viitteet: Myers & Hooper, Hudson & Moscoso Boedo, Hartley | tehty (Levine 2022 oli jo rekisterissä) |
| 2–4 | Versiokorjaukset v18/v19 → v17 | oli jo tehty aiemmin |
| 5 | Model-sivu: DKC-osio | tehty, taso L* |
| 6 | Model-sivu: Recovery Window -faasitransitio | tehty osana olemassa olevaa osiota, taso M\|C |
| 7 | Model-sivu: Spectral Stacking | tehty, taso L* |
| 8 | Evidence-sivu: saturaatioanomalia + fertility gap | tehty, tasot M\|C ja M |
| 12–15 | Python: neljä DKC-funktiota | tehty, `diagnostics/dual_kernel.py` |

Kohta 9 (COVID-narratiivin spektraalinen tulkinta), kohdat 10–11 ja
visualisoinnit 19–25 ovat yhä avoimia.
