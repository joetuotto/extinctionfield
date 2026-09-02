# Teknologia-supplement — FINAL-ohje (kaikki sivut)

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Koskee:** Kaikkia sivuston sivuja

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Tämä dokumentti kokoaa teknologiaan liittyvät terävöitykset, jotka koskevat kaikkia sivuston sivuja. Se toimii tarkistuslistana: kun uusi teknologiakerros, tutkimus tai datamuutos integroidaan, jokaisen alla olevan sivun on päivitettävä johdonmukaisesti.

---

## TEKNOLOGIATERMISTÖ (KANONINEN)

### Kolme kanavaa
| Lyhenne | Nimi (EN) | Nimi (FI) | Taajuusalue |
|---------|-----------|-----------|-------------|
| ELF | Extremely Low Frequency | Erittäin matala taajuus | 0–300 Hz |
| IF | Intermediate Frequency | Välitaajuus | 300 Hz – 10 MHz |
| RF | Radio Frequency | Radiotaajuus | 10 MHz – 300 GHz |

### Avainakronyymit
| Lyhenne | Koko nimi | Konteksti |
|---------|----------|-----------|
| VGCC | Voltage-Gated Calcium Channel | Pall-mekanismi |
| CRY | Cryptochrome | Magnetoreseptio (RPM/CRY-polku B) |
| RPM | Radical Pair Mechanism | Kvanttimekanismi |
| CaMKII | Ca²⁺/Calmodulin-dependent Kinase II | Autofosforylaatiokynnys |
| TCBM | Three-Channel Biological Model | ELF/IF/RF-malli |
| TRPC1 | Transient Receptor Potential Canonical 1 | Polku B′ = B:n alahaara (Yap 2025) |
| PWM | Pulse Width Modulation | LED-ohjaus (IF-kanava) |
| SDF | Sperm DNA Fragmentation | Lisääntymisen päätepiste |
| TFR | Total Fertility Rate | Demografinen mittari |

---

## SIVUKOHTAINEN TARKISTUSLISTA

### Etusivu (page.tsx)
- [ ] BermMasterInfographic: LAYERS-data päivitetty?
- [ ] Impact grid: Luvut ajantasaisia?
- [ ] Paradox-osio: RMSE/R² vastaavat cross_sectional.py:n tuloksia?
- [ ] TFR-ennusteet: LOCKED_PREDICTIONS päivitetty?
- [ ] Falsifikaatiotilanne: falsification_v19_1.json ajantasainen?

### Model-sivu (model/page.tsx)
- [ ] TCBM-painot: diagnostinen (5/60/35) vs empiirinen (~60/40)?
- [ ] 12 teknologiakerrosta: uusia kerroksia lisätty?
- [ ] χ-skaalat: viidessä skaalassa?
- [ ] Palautumismalli: 5 tasoa, α-arvot oikein?
- [ ] CaMKII-kynnys: autofosforylaation kuvaus?

### Evidence-sivu (evidence/page.tsx)
- [ ] Kanavakohtaiset ryhmitykset (CHANNEL_GROUPS)?
- [ ] Dual-interpretation -taulukko: standard vs BERM?
- [ ] Alasivut: populations, technology, pharmacology, evolution?
- [ ] FIELDSTATE_EVIDENCE: uudet tutkimukset lisätty?

### Mathematics-sivu (mathematics/page.tsx)
- [ ] Poikkileikkauskaava: parametrit vastaavat v17.1:tä?
- [ ] γ_B-dekomposiittinote: polku B paino 25%?
- [ ] IF-kanavan formalisaatio?
- [ ] Falsifikaatiotestit: falsification_v19_1.json?

### Predictions-sivu (predictions/page.tsx)
- [ ] LOCKED_PREDICTIONS: lukitut ennusteet muuttumattomat?
- [ ] Uudet derived predictions lisätty?
- [ ] TRPC1-1, IF-1, POP-1 → POP-4?

### Objections-sivu (objections/page.tsx)
- [ ] 13+ vastaväitekorttia?
- [ ] "Why C=25%?" -selitys?
- [ ] LED safety + blue light -kortit?

### Sentinel-sivu (sentinel/page.tsx)
- [ ] IF ecology note?
- [ ] Sentinel cascade -aikajana?

### Civilization-sivu (civilization/page.tsx)
- [ ] Miehen ja naisen häiriöprofiilit?
- [ ] Seurausten vertailu?
- [ ] Episteeminen varovaisuus (M|C, ei E)?

### Modulome-sivut
- [ ] Sydän: CaMKII + Cav1.3 + VGCC-kaavio?
- [ ] Haima: β-solujen kalsiumsignalointi?
- [ ] Silmä: myopia-osio?
- [ ] Kilpirauhanen + lisämunuainen: sisältö?

---

## VIITEMÄÄRÄN SEURANTA

Viitemäärä luetaan dynaamisesti: `public/data/references_full.json`
- Näytetään: etusivun episteeminen footer
- Käytetään: evidence-sivun alaotsikko

Kun uusi viite lisätään:
1. `references_full.json` — itse viite
2. Evidence-sivu — tutkimuskortti tai maininta
3. Etusivun footer — päivittyy automaattisesti (dynaaminen laskenta)

---

## VERSIOINTI

| Kenttä | Nykyinen arvo | Sijainti |
|--------|--------------|---------|
| BERM-versio | v17 | Kaikkialla |
| Cross-sectional | v17.1 | Etusivu, mathematics |
| Falsification | v19_1 | Datasetti |
| K₈ | 0.81 | Etusivu footer |
| K₁₀ | 0.71 | Etusivu footer |
| RMSE | 0.522 | Etusivu, mathematics |

**Huomio:** Aiemmissa sessioissa korjattu v18/v19-viittaukset → v17. Jos uusi malliversio tulee, KAIKKI sivut on päivitettävä.

---

## RISTIVIITTAUSTEN YHTENÄISYYS

### Polkukirjainkonventio
| Polku | Kirjain sivustolla | Kirjain v16.py:ssä | Kirjain metadata.py:ssä |
|-------|-------------------|-------------------|------------------------|
| VGCC → Ca²⁺ → ROS | A | A | A |
| RPM/CRY → circadian | B (sivustolla) | B | C (metadata.py) |
| CRY2 → TRPC1 | C (sivustolla) | — | — |

**VAROITUS:** Polku B:n ja C:n kirjainkonflikti on dokumentoitu: → `BERM_CODELLE_pathway_letter_conflict.md` (muistissa). Sivustolla B = RPM, primerissä C = RPM.

---

## EPISTEEMISTEN TASOJEN STANDARDI

| Taso | Koodi | Merkitys |
|------|-------|----------|
| E | Experimental | Kokeellinen varmistus |
| M|C | Mechanistic/Coherence | Mekanistinen johdonmukaisuus |
| M|P | Mechanistic/Plausible | Mekanistinen uskottavuus |
| O | Observational | Havainnoiva |
| H | Hypothetical | Hypoteettinen |
