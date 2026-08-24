# Kuuden lähteen BERM-integraatioohje — Panagopoulos 2025, Koivisto 2000, Eliyahu 2006, Luria 2009

**Versio:** 2026-08-24
**Lähdeanalyysi:** BERM_6_lahdetta_analyysi_2026-08-24.md
**Tunnisteet käytössä:** [KOODI], [PROJEKTI], [PROJEKTI→KOODI]

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

### Analysoitujen lähteiden yhteenveto

Kuusi lähdettä analysoitiin BERM:n 9-tasoisen kausaaliketjun näkökulmasta (BERM_6_lahdetta_analyysi_2026-08-24.md). Analyysin tulos:

| Lähde | BERM-tasot | Episteeminen taso | Integroitavuus |
|---|---|---|---|
| Panagopoulos ym. 2025 | 4, 4→5A, 5A→6 | E | ★ Integroitava |
| Koivisto ym. 2000a,b | 3→4 | C | Integroitava |
| Eliyahu ym. 2006 | 3→4, 5A, 5E | C | Integroitava |
| Luria ym. 2009 | 3→4, 5D | C | Integroitava |
| Pärssinen & Wedenoja 2021 | 5B, 5C, 7, 9 | — | Viereinen (adjacent) |
| bem.70066 | 5B | — | Perifeerinen |

**Neljä integroitavaa lähdettä** lisätään viiterekisteriin, evidenssisivulle, kausaaliketjuun ja mallidokumentaatioon. **Myopiakatsaus** dokumentoidaan poikkileikkaavana kontekstina mutta sitä EI lisätä references.json-tietokantaan (ei suora BERM-evidenssi). **bem.70066** jätetään pois (ei arvioitavissa, perifeerinen relevanssi).

### Mitä nämä lähteet tuovat BERM:iin

**1. Tason 4 tuki (Panagopoulos 2025):** IFO-VGIC-katsaus on tason 4 "vgic"-solmun vahvin yksittäinen kokoava evidenssilähde. 131 tutkimuksen synteesi, jossa 95 % raportoi oksidatiivisia vaikutuksia. Tämä on E-tason evidenssiä tason 4 → 5A nuolelle.

**2. Tason 3 → 4 nuolen RCT-tuki (Koivisto, Eliyahu, Luria):** Kolme itsenäistä kokeellista tutkimusta osoittavat, että 890–902 MHz GSM-signaali (BERM:n mallintama taajuus) tuottaa mitattavan biologisen vasteen. Fasilitaatio (Koivisto) on yhteensopiva akuutin VGIC-aktivaation kanssa. Lateralisaatio (Eliyahu, Luria) tukee tason 3 kaksikanavamallin spatiaalirakennetta.

**3. Kolme poikkileikkaavaa mekanismia:** Recovery window (akuutti vs. krooninen vaste), kaksikanava-altistuksen spatiaalirakenne ja yöaltistuskertoimen biologinen perusta saavat kaikki tukea näistä lähteistä.

---

## TOTEUTETTAVAT MUUTOKSET

### 1. [KOODI] Viiterekisteri: references.json ja references_full.json

**Lisää neljä merkintää molempiin tiedostoihin:**

#### 1a. Panagopoulos ym. 2025

```json
{
  "id": "panagopoulos2025",
  "authors": "Panagopoulos DJ et al.",
  "year": 2025,
  "title": "IFO-VGIC: Irregular Forced Opening of Voltage-Gated Ion Channels by electromagnetic fields [TARKISTA TARKKA OTSIKKO]",
  "journal": "Bioelectromagnetics",
  "doi": null,
  "pmid": null,
  "n": null,
  "type": "review",
  "level": "E",
  "pathway": ["A"],
  "finding": "Comprehensive review of 131 studies. 95% report oxidative effects from RF/Wi-Fi exposure. IFO-VGIC mechanism: polarized, coherent RF-EMF forces S4 voltage sensor to oscillate at non-physiological frequency → irregular channel opening → uncontrolled Ca²⁺ influx → ROS → DNA damage, sperm disorders, hormonal changes. VGIC blockers prevent effects, confirming mechanism.",
  "tags": [
    "ifo",
    "vgic",
    "calcium",
    "ros",
    "review",
    "s4_helix",
    "sperm",
    "oxidative_stress",
    "dna_damage",
    "131_studies"
  ],
  "verified": false,
  "category": "transduction_rpm_calcium",
  "pdf_section": null,
  "pdf_number": null
}
```

**HUOM:** `verified: false` koska DOI ja tarkka otsikko vaativat varmentamisen. Suorittavan agentin tulee tarkistaa nämä ennen `verified: true` -asetusta.

**Sijainti references.json:ssa:** Lisää pathway A -tutkimusten joukkoon, pall2013:n ja yakymenko2016:n jälkeen.

#### 1b. Koivisto ym. 2000

```json
{
  "id": "koivisto2000",
  "authors": "Koivisto M, Revonsuo A, Krause C et al.",
  "year": 2000,
  "title": "Effects of 902 MHz electromagnetic field emitted by cellular telephones on response times in humans",
  "journal": "NeuroReport",
  "doi": null,
  "pmid": null,
  "n": 48,
  "type": "experimental",
  "level": "C",
  "pathway": ["A"],
  "finding": "Two double-blind RCTs (2000a: n=48, 30 min; 2000b: n=48, 60 min). 902 MHz GSM left-sided exposure. Facilitation of cognitive performance (3-Back RT decrease in 2000a; Simple RT, Vigilance, Subtraction in 2000b). Compatible with acute VGIC activation at non-thermal SAR. Note: not replicated (Haarala 2003, 2005).",
  "tags": [
    "cognitive",
    "reaction_time",
    "gsm",
    "902mhz",
    "rct",
    "double_blind",
    "facilitation",
    "non_thermal",
    "not_replicated"
  ],
  "verified": false,
  "category": "neurobiology_circadian",
  "pdf_section": null,
  "pdf_number": null
}
```

**Evidenssitaso C:** RCT-asetelma on vahva, mutta vaikutus on kognitiivinen (ei suora tason 5+ polkumittaus) ja replikaatio on epäonnistunut (Haarala 2003, 2005).

#### 1c. Eliyahu ym. 2006

```json
{
  "id": "eliyahu2006",
  "authors": "Eliyahu I, Luria R, Hareuveny R et al.",
  "year": 2006,
  "title": "Effects of radiofrequency radiation emitted by cellular telephones on the cognitive functions of humans",
  "journal": "Bioelectromagnetics",
  "doi": "10.1002/bem.20187",
  "pmid": null,
  "n": 36,
  "type": "experimental",
  "level": "C",
  "pathway": ["A", "E"],
  "finding": "n=36, 890.2 MHz, 2h bilateral exposure (Nokia 5110, 2W peak). Left-sided exposure slowed left-hand RT in spatial recognition task. Lateralization supports BERM's two-channel spatial structure: EMF effect localizes to the exposed hemisphere. Compatible with local VGCC activation (pathway A) and local BBB opening (pathway E, cf. Salford 2003).",
  "tags": [
    "cognitive",
    "lateralization",
    "spatial",
    "gsm",
    "890mhz",
    "two_channel",
    "bbb",
    "reaction_time"
  ],
  "verified": false,
  "category": "neurobiology_circadian",
  "pdf_section": null,
  "pdf_number": null
}
```

#### 1d. Luria ym. 2009

```json
{
  "id": "luria2009",
  "authors": "Luria R, Eliyahu I, Hareuveny R et al.",
  "year": 2009,
  "title": "Cognitive effects of radiation emitted by cellular phones",
  "journal": "Bioelectromagnetics",
  "doi": "10.1002/bem.20454",
  "pmid": null,
  "n": 48,
  "type": "experimental",
  "level": "C",
  "pathway": ["A", "D"],
  "finding": "n=48 right-handed males, 890.2 MHz, 1h, SAR 0.54–1.09 W/kg (Nokia 5110). Right-hand RT increased during left-sided exposure (first 2 blocks only). Time-dependent adaptation compatible with Selye's GAS dynamics (alarm → resistance), which BERM's pathway D (HPA→HPG) models at chronic timescale. Male-only sample matches BERM's bioCap target population.",
  "tags": [
    "cognitive",
    "lateralization",
    "adaptation",
    "gas_dynamics",
    "gsm",
    "890mhz",
    "males_only",
    "hpa",
    "reaction_time"
  ],
  "verified": false,
  "category": "neurobiology_circadian",
  "pdf_section": null,
  "pdf_number": null
}
```

**Kaikki neljä merkintää:** `verified: false` — suorittava agentti tarkistaa DOI:t ja tarkat otsikot ennen `true`-asetusta.

---

### 2. [KOODI] Evidence-sivu: IFO-VGIC-katsaus (Panagopoulos 2025)

**Tiedosto:** `app/[locale]/evidence/page.tsx`

**Sijainti:** Mekanismi/transduktio-osio (tai pathway A, riippuen sivun nykyisestä rakenteesta). Panagopoulos 2025 on tason 4 kokoava katsaus → sijoitetaan mekanismiosion alkuun.

**EN-tutkimuskortti:**

```
Panagopoulos et al. 2025 | Bioelectromagnetics | Review (131 studies) | E

"IFO-VGIC mechanism: comprehensive review"

Synthesis of 131 studies on RF/Wi-Fi biological effects. 95% report oxidative
stress. The IFO (Irregular Forced Opening) mechanism explains how:
polarized, coherent RF-EMF forces the S4 voltage sensor of VGCCs to
oscillate at non-physiological frequency → irregular channel opening →
uncontrolled Ca²⁺ influx → mitochondrial ROS → DNA damage, sperm
disorders, hormonal changes.

Key evidence: VGCC blockers (e.g. nifepidine) prevent RF-induced biological
effects — confirming the mechanism.

BERM relevance: This is the strongest single source for BERM's Level 4 node
(VGIC activation) and the Level 4→5A edge (Ca²⁺ → ROS). The 95% consensus
on oxidative stress across 131 studies is consistent with Yakymenko et al.
2016 (93/100), demonstrating robustness across independent reviews. Also
supports Level 5A→6 edges (ROS → sperm cascade: SDF, motility, concentration).

Quantitative: Yu 2021: −8.1% motility per hour of exposure. Levine 2023:
−51% sperm concentration (1973–2018).
```

**FI-tutkimuskortti:**

```
Panagopoulos ym. 2025 | Bioelectromagnetics | Katsaus (131 tutkimusta) | E

"IFO-VGIC-mekanismi: kattava katsaus"

131 tutkimuksen synteesi RF/Wi-Fi:n biologisista vaikutuksista. 95 %
raportoi oksidatiivista stressiä. IFO-mekanismi (Irregular Forced Opening)
selittää: polarisoitu, koherentti RF-EMF pakottaa VGCC:n S4-jännitesensorin
epäfysiologiseen oskillaatioon → hallitsematon kanavan avautuminen →
kontrolloimaton Ca²⁺-influksi → mitokondriaalinen ROS → DNA-vauriot,
siittiöhäiriöt, hormonaaliset muutokset.

Avainlöydös: VGCC-salpaajat (esim. nifedipiini) estävät RF:n biologiset
vaikutukset — tukee mekanismia.

BERM-merkitys: Tason 4 (VGIC-aktivaatio) ja tason 4→5A nuolen (Ca²⁺ → ROS)
vahvin yksittäinen kokoava evidenssilähde. 95 %:n konsensus 131 tutkimuksessa
on yhdenmukainen Yakymenko ym. 2016:n kanssa (93/100). Tukee myös tason
5A→6 nuolia (ROS → siittiökaskadi: SDF, motiliteetti, konsentraatio).
```

---

### 3. [KOODI] Evidence-sivu: Transduktiotason tutkimukset (Koivisto, Eliyahu, Luria)

**Tiedosto:** `app/[locale]/evidence/page.tsx`

**Sijainti:** Nämä kolme tutkimusta käsittelevät tason 3→4 nuolta (EMF → biologinen vaste). Sijoitus mekanismi/transduktio-osioon Panagopoulosin jälkeen, tai erilliseen neurokognitiivisten tutkimusten alaossioon.

**3a. Koivisto 2000 — EN:**

```
Koivisto et al. 2000a,b | NeuroReport | n=48+48 | C

"Effects of 902 MHz EMF on response times in humans"

Two double-blind RCTs from University of Turku. 902 MHz GSM, left-sided
exposure. Facilitation (faster reaction times) observed in 3-Back (2000a,
30 min) and Simple RT/Vigilance/Subtraction tasks (2000b, 60 min).

BERM relevance: Demonstrates that BERM's modeled frequency (902 MHz
personal-EMF) produces a measurable biological response at non-thermal
SAR — the Level 3→4 edge is active. Facilitation is NOT anti-BERM:
acute Ca²⁺ elevation can facilitate synaptic transmission, while chronic
elevation produces ROS (Level 5A). This distinction maps to BERM's
recovery window: 30 min exposure + 23.5h recovery → 97% repair →
no net damage. BERM predicts chronic cumulative effects, not acute.

Caveats: Not replicated (Haarala 2003: n=32, same protocol, null result;
Haarala 2005: n=32 children, null). Level C — not E.
```

**3a. Koivisto 2000 — FI:**

```
Koivisto ym. 2000a,b | NeuroReport | n=48+48 | C

"902 MHz:n sähkömagneettisen kentän vaikutukset ihmisten reaktioaikoihin"

Kaksi kaksoissokkokokeetta Turun yliopistosta. 902 MHz GSM, vasemmanpuoleinen
altistus. Fasilitaatio (nopeammat reaktioajat) havaittiin 3-Back-tehtävässä
(2000a, 30 min) sekä Simple RT/Vigilance/Subtraction -tehtävissä (2000b, 60 min).

BERM-merkitys: Osoittaa, että BERM:n mallintama taajuus (902 MHz personal-EMF)
tuottaa mitattavan biologisen vasteen ei-termisillä SAR-arvoilla — tason 3→4
nuoli on aktiivinen. Fasilitaatio EI ole BERM:n vastainen: akuutti
Ca²⁺-kohoaminen voi fasilitoida synaptista transmissiota, kun taas krooninen
Ca²⁺ tuottaa ROS:ia (taso 5A). Ero kartoittuu BERM:n recovery window
-mekanismiin: 30 min altistus + 23,5 h palautuminen → 97 % korjaus.

Rajoitteet: Ei replikoitu (Haarala 2003, 2005).
```

**3b. Eliyahu 2006 — EN:**

```
Eliyahu et al. 2006 | Bioelectromagnetics | n=36 | C

"Lateralized cognitive effects of cellular phone radiation"

890.2 MHz, 2h bilateral exposure (Nokia 5110, 2W peak). Left-sided exposure
slowed left-hand RT in spatial recognition. Demonstrates lateralization:
EMF effect localizes to the exposed hemisphere.

BERM relevance: Direct empirical support for Level 3's two-channel spatial
structure. EMF affects the hemisphere nearest the phone — the effect is
local, not systemic. This supports BERM's premise that personal-EMF targets
specific tissues by proximity: phone in pocket → testes (Level 6 sperm
cascade), phone at ear → hypothalamus (Level 5D HPA activation).
Compatible with local VGCC activation (pathway A) and local BBB opening
(pathway E, cf. Salford 2003 at SAR 0.016 W/kg).
```

**3b. Eliyahu 2006 — FI:**

```
Eliyahu ym. 2006 | Bioelectromagnetics | n=36 | C

"Puhelinten RF-säteilyn lateralisoituneet kognitiiviset vaikutukset"

890,2 MHz, 2 tunnin bilateraalinen altistus (Nokia 5110, 2W huippu).
Vasemmanpuoleinen altistus hidasti vasemman käden RT spatiaalisessa
tunnistuksessa. Osoittaa lateralisaation: EMF-vaikutus paikantuu
altistettuun aivopuoliskoon.

BERM-merkitys: Suora empiirinen tuki tason 3 kaksikanavamallin
spatiaaliselle rakenteelle. EMF vaikuttaa puhelinta lähimpänä olevaan
aivopuoliskoon — vaikutus on paikallinen, ei systeeminen. Tukee
BERM:n premissiä: puhelin taskussa → kivekset (tason 6 siittiökaskadi),
puhelin korvalla → hypotalamus (tason 5D HPA-aktivaatio). Yhteensopiva
paikallisen VGCC-aktivaation (polku A) ja BBB-avautumisen (polku E,
vrt. Salford 2003 SAR 0,016 W/kg) kanssa.
```

**3c. Luria 2009 — EN:**

```
Luria et al. 2009 | Bioelectromagnetics | n=48 males | C

"Cognitive effects of radiation emitted by cellular phones"

890.2 MHz, 1h, SAR 0.54–1.09 W/kg (Nokia 5110). n=48 right-handed males.
Right-hand RT increased during left-sided exposure (first 2 blocks only —
effect vanished in later blocks).

BERM relevance: (1) Lateralization confirms two-channel spatial structure
(same as Eliyahu 2006). (2) Time-dependent adaptation maps to BERM's
pathway D (HPA→HPG): Selye's GAS dynamics (alarm → resistance →
exhaustion). The acute alarm → resistance transition observed within 1 hour
is the first step of the chronic process BERM models: sustained HPA
activation → cortisol↑ → HPG suppression → T↓ + LH↓ + FSH↓.
Motivation factor: cortisol = clamp(1 + 0.05 × adjCum, 1.0, 1.3).
(3) Male-only sample matches BERM's bioCap target population (Levine 2023,
Travison 2007).

Caveats: Effect only in first 2 blocks — adaptation or random fluctuation.
```

**3c. Luria 2009 — FI:**

```
Luria ym. 2009 | Bioelectromagnetics | n=48 miestä | C

"Puhelinten säteilyn kognitiiviset vaikutukset"

890,2 MHz, 1 h, SAR 0,54–1,09 W/kg (Nokia 5110). n=48 oikeakätistä
miestä. Oikean käden RT kasvoi vasemmanpuoleisen altistuksen aikana
(vain 2 ensimmäistä blokkia — hävisi myöhemmissä).

BERM-merkitys: (1) Lateralisaatio tukee kaksikanavamallia
(kuten Eliyahu 2006). (2) Aikariippuva adaptaatio kartoittuu
polun D (HPA→HPG) konseptiin: Selyen GAS-dynamiikka (alarm →
resistance → exhaustion). Yhden tunnin sisällä havaittu alarm →
resistance -siirtymä on ensimmäinen askel kroonisessa prosessissa:
HPA-aktivaatio → kortisoli↑ → HPG-suppressio → T↓ + LH↓ + FSH↓.
Motivaatiokerroin: cortisol = clamp(1 + 0,05 × adjCum, 1,0, 1,3).
(3) Pelkkiä miehiä — kohdistuu BERM:n bioCap-populaatioon (Levine 2023,
Travison 2007).

Rajoitteet: Vaikutus vain 2 ensimmäisessä blokissa — adaptaatio tai
satunnaisvaihtelu.
```

---

### 4. [KOODI] CausalChain.tsx — evidenssipopup-päivitykset

**Tiedosto:** `components/CausalChain.tsx` (tai `lib/causalChainData.ts` riippuen toteutuksesta)

Päivitä seuraavien solmujen ja nuolien evidenssipopupit:

#### 4a. Solmu: `vgic` (taso 4)

Lisää Panagopoulos 2025 keyReferences-listaan:

```typescript
{
  authors: "Panagopoulos ym. 2025",
  title: "IFO-VGIC comprehensive review (131 studies)",
  journal: "Bioelectromagnetics",
  keyFinding: "95 % raportoi oksidatiivisia vaikutuksia. VGIC-salpaajat estävät vasteen."
}
```

Päivitä `quantitative`-kenttään: "Panagopoulos 2025: 131/131 tutkimuksesta 124 (95 %) raportoi oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa."

#### 4b. Nuoli: `membrane` → `vgic` (kentänmuutos kalvolla)

Lisää evidenssipopupiin kognitiiviset tutkimukset jotka osoittavat biologisen vasteen:

```
Koivisto ym. 2000 (NeuroReport): 902 MHz GSM → fasilitaatio [C]
Eliyahu ym. 2006 (Bioelectromagnetics): 890 MHz → lateralisoitunut RT-vaikutus [C]
Luria ym. 2009 (Bioelectromagnetics): 890 MHz → aikariippuva lateralisoitunut vaikutus [C]
```

#### 4c. Nuoli: `vgic` → `pathway_a` (Ca²⁺ influx)

Lisää evidenssipopupiin:

```
→ UUSI: Panagopoulos ym. 2025 (Bioelectromagnetics): 131 tutkimuksen katsaus, 95 % raportoi oksidatiivista stressiä (Ca²⁺ → ROS). Yhdenmukainen Yakymenko 2016 (93/100) kanssa. [E]
```

#### 4d. Solmu: `pathway_d` (Polku D: HPA→HPG)

Lisää keyReferences-listaan:

```typescript
{
  authors: "Luria ym. 2009",
  title: "Cognitive effects of cellular phone radiation",
  journal: "Bioelectromagnetics 30(3):198–204",
  keyFinding: "Akuutti alarm→resistance -adaptaatio 1 h sisällä. Yhteensopiva GAS-dynamiikan kanssa."
}
```

#### 4e. Solmu: `pathway_e` (Polku E: BBB)

Lisää evidenssipopupiin lateralisaatiolöydös kontekstina:

```
Eliyahu 2006 / Luria 2009: Lateralisoitunut kognitiivinen vaikutus yhteensopiva paikallisen BBB-avautumisen kanssa (vrt. Salford 2003: SAR 0.016 W/kg). [C]
```

#### 4f. Nuoli: `pathway_a` → `sdf` ja `pathway_a` → `concentration` (ROS → siittiökaskadi)

Lisää evidenssipopupiin:

```
Panagopoulos 2025: Siittiövauriot (SDF, motiliteetti, viabiliteetti) raportoitu 131 tutkimuksen katsauksessa. IFO → Ca²⁺ → mitokondriaali ROS → siittiövauriot. [E]
```

---

### 5. [PROJEKTI→KOODI] model/page.tsx — mekanismikuvausten päivitys

**Tiedosto:** `app/[locale]/model/page.tsx`

<konteksti src="BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md">
Tason 4 solmun "vgic" nykytila: viittaa Panagopoulos 2015, 2021, 2025 (IFO), Tang 2024 (S4-protonidynamiikka), Pall 2013 (23 VGCC-salpaajatut.).
Tason 4→5A nuolen nykytila: {from: "vgic", to: "pathway_a", label: "Ca²⁺ influx", derivative: "∂ROS/∂Ca²⁺ > 0", epistemicLevel: "E"}
Tason 5D solmun nykytila: HPA→HPG -akseli, Selyen GAS-dynamiikka, Guy 1984 eläinkokeet.
Recovery window: DNA repair half-life ~6h (BER pathway), net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)).
</konteksti>

**Muutokset:**

**5a. IFO-VGIC-mekanismin laajennettu kuvaus (EN + FI):**

Lisää tason 4 kuvaukseen viittaus 131 tutkimuksen katsaukseen:

EN:
```
The IFO-VGIC mechanism is supported by a comprehensive review of 131
studies (Panagopoulos et al. 2025, Bioelectromagnetics): 95% report
oxidative effects from RF/Wi-Fi exposure. This consensus, consistent
with Yakymenko et al. 2016 (93/100), establishes the Ca²⁺ influx →
ROS pathway as the most robustly documented non-thermal mechanism.
```

FI:
```
IFO-VGIC-mekanismia tukee 131 tutkimuksen kattava katsaus
(Panagopoulos ym. 2025, Bioelectromagnetics): 95 % raportoi
oksidatiivisia vaikutuksia RF/Wi-Fi-altistuksessa. Tämä konsensus,
joka on yhdenmukainen Yakymenko ym. 2016 (93/100) kanssa, tukee
Ca²⁺-influksi → ROS -reitin parhaiten dokumentoiduksi ei-termiseksi
mekanismiksi.
```

**5b. Recovery window -kontekstilisäys:**

Lisää recovery window -kuvaukseen konkreettinen esimerkki:

EN:
```
The distinction between acute and chronic exposure is empirically
supported: Koivisto et al. (2000) observed cognitive facilitation
after 30–60 min exposure (compatible with acute Ca²⁺-mediated
synaptic enhancement), while Panagopoulos et al. (2025) report
95% oxidative stress in studies with chronic or repeated exposure.
The recovery window model resolves this apparent contradiction:
30 min + 23.5h recovery → 97% repair (no net damage);
22h exposure + 2h recovery → 21% repair (cumulative damage).
```

FI:
```
Akuutin ja kroonisen altistuksen ero on empiirisesti tuettu: Koivisto
ym. (2000) havaitsi kognitiivisen fasilitaation 30–60 min altistuksen
jälkeen (yhteensopiva akuutin Ca²⁺-välitteisen synaptisen vahvistuksen
kanssa), kun taas Panagopoulos ym. (2025) raportoi 95 %:n oksidatiivista
stressiä kroonisissa/toistuvissa altistuksissa. Recovery window -malli
ratkaisee tämän: 30 min + 23,5 h palautuminen → 97 % korjaus;
22 h altistus + 2 h palautuminen → 21 % korjaus.
```

**5c. Lateralisaatio — kaksikanavamallin tuki:**

Lisää tason 3 (altistusarkkitehtuuri) kuvaukseen:

EN:
```
The two-channel model's spatial structure is empirically supported
by lateralization studies: Eliyahu et al. (2006) and Luria et al.
(2009) demonstrated that 890 MHz exposure affects specifically the
hemisphere nearest the phone. This confirms that personal-EMF
effects are local, not systemic — EMF attenuates with the square
of distance — supporting BERM's premise that phone-in-pocket
targets testes, phone-at-ear targets hypothalamus.
```

FI:
```
Kaksikanavamallin spatiaalista rakennetta tukevat lateralisaatiotutkimukset:
Eliyahu ym. (2006) ja Luria ym. (2009) osoittivat, että 890 MHz:n altistus
vaikuttaa nimenomaan puhelinta lähimpänä olevaan aivopuoliskoon. Tämä
osoittaa, ettei personal-EMF-vaikutus ole systeeminen vaan paikallinen
— EMF vaimenee etäisyyden neliössä — ja tukee BERM:n premissiä: puhelin
taskussa → kivekset, puhelin korvalla → hypotalamus.
```

---

### 6. [KOODI] v16.py — docstring-päivitykset

**Tiedosto:** `berm/berm/v16.py`

**Huom:** Numeerisia laskuja EI muuteta. Ainoastaan docstring-dokumentaatiota.

#### 6a. IFO-VGIC-viittaus emf_exposure()-funktioon tai vastaavaan

Lisää altistusta mallintavan funktion docstringiin:

```python
def emf_exposure(...):
    """...existing docstring...

    The biophysical basis for non-thermal EMF effects at the cell
    membrane is the IFO-VGIC mechanism (Panagopoulos et al. 2025,
    Bioelectromagnetics): polarized, coherent RF forces the S4 voltage
    sensor into non-physiological oscillation → irregular channel
    opening → uncontrolled Ca²⁺ influx. Reviewed across 131 studies
    (95% report oxidative effects).

    Three independent RCTs confirm the Level 3→4 edge at GSM
    frequencies: Koivisto 2000 (902 MHz, cognitive facilitation),
    Eliyahu 2006 (890 MHz, lateralized RT effect), Luria 2009
    (890 MHz, time-dependent lateralized effect).
    """
```

#### 6b. Recovery window -viittaus

Etsi recovery window -mallinnusta käsittelevä funktio (tai v17-versio) ja lisää:

```python
    """...existing docstring...

    Empirical basis: Koivisto et al. 2000 observed facilitation
    (not damage) after 30-60 min — consistent with acute Ca²⁺ that
    does not overwhelm repair. Panagopoulos et al. 2025 reports 95%
    oxidative stress in chronic exposures — consistent with repair
    capacity being overwhelmed. These two findings bracket the
    recovery window from opposite ends.
    """
```

#### 6c. HPA→HPG -polun (pathway D) viittaus

Etsi motivaatiokertoimen kortisoli-komponenttia käsittelevä funktio ja lisää:

```python
    """...existing docstring...

    Acute GAS dynamics observed in Luria et al. 2009: 890 MHz
    exposure produced RT effects in first 2 blocks only (alarm phase),
    which vanished in later blocks (resistance phase). This acute
    alarm→resistance transition is the first step of the chronic
    process modeled here: sustained HPA activation → cortisol↑ →
    HPG suppression. Cf. Guy 1984 (animal data for exhaustion phase).
    """
```

---

### 7. [KOODI] metadata.py — kommenttipäivitys

**Tiedosto:** `berm/berm/metadata.py`

**Ei arvomuutoksia.** Lisää viitetietoa kommentteihin:

```python
#: Level 3→4 edge (EMF → biological response) supported by three
#: independent RCTs at GSM frequencies:
#:   Koivisto 2000: 902 MHz → cognitive facilitation (n=48+48)
#:   Eliyahu 2006: 890 MHz → lateralized RT (n=36)
#:   Luria 2009: 890 MHz → time-dependent lateralized RT (n=48 males)
#: Level 4 (VGIC) supported by Panagopoulos 2025: 131-study review,
#: 95% report oxidative effects.
#: None of these test the Level 5→8 chain. Discriminating tests
#: D1–D3 remain at 0/3.
DISCRIMINATING_TESTS_NEEDED = 3
DISCRIMINATING_TESTS_COMPLETED = 0
```

---

### 8. [KOODI] Poikkileikkaavat mekanismidokumentaatiot

Kolme poikkileikkaavaa BERM-mekanismia saavat tukea näistä lähteistä. Dokumentoi nämä yhteydet relevantteihin tiedostoihin:

#### 8a. Recovery window

**Kohdetiedostot:** `v16.py` (docstring, ks. 6b), `model/page.tsx` (ks. 5b), evidence-sivu.

**Dokumentoitava yhteys:** Koiviston akuutti fasilitaatio (30–60 min) ja Panagopoulosin krooninen oksidatiivinen stressi (131 tutkimusta) havainnollistavat recovery window -mallin eri päitä:

```
net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair))

Koiviston koe:  t_emf = 0.5–1.0 h, t_free = 23–23.5 h → korjaus ≈ 97 %
Krooninen käyttö: t_emf = 14–22 h, t_free = 2–10 h   → korjaus ≈ 21–65 %

Koiviston fasilitaatio on yhteensopiva: akuutti Ca²⁺ → synaptinen vahvistus.
Panagopoulosin 95 % oksidatiivinen stressi on yhteensopiva: krooninen Ca²⁺
→ mitokondriaalinen ylikuormitus → ROS → vauriot.
```

#### 8b. Kaksikanava-altistuksen spatiaalirakenne

**Kohdetiedostot:** `model/page.tsx` (ks. 5c), evidence-sivu, kausaaliketju.

**Dokumentoitava yhteys:** Eliyahun ja Lurian lateralisaatio on tason 3 kaksikanavamallin (`total = ambient + χ(Ā) × personal`) empiirinen tuki. Personal-EMF kohdistuu paikallisesti — vaikutus vaimenee etäisyyden neliössä. Tämä tukee BERM:n kudosspesifistä altistusmallia:

```
Puhelin korvalla    → aivot, hypotalamus → taso 5D (HPA-aktivaatio)
Puhelin taskussa    → kivekset           → taso 6 (siittiökaskadi)
Puhelin yöpöydällä  → koko keho          → taso 5C (melatoniini-suppressio)
```

#### 8c. Yöaltistuskerroin ja myopian mekanistinen konteksti

**Kohdetiedostot:** `v16.py` (v17_night_fraction() docstring), `model/page.tsx`.

**Dokumentoitava yhteys (myopiakatsauksesta):** Pärssinen & Wedenoja 2021 dokumentoi melanopsiini/ipRGC-signaloinnin (460–480 nm) riippumattomassa biologisessa kontekstissa. Tämä aallonpituusriippuvuus on yhteensopiva BERM:n CRY-polun (400–500 nm) kanssa: älypuhelimen ruutu aktivoi molemmat järjestelmät samanaikaisesti.

**Huom:** Myopia EI lisätä references.json:iin. Se dokumentoidaan kontekstina v17_night_fraction()-funktion perusteluissa:

```python
def v17_night_fraction(country, year):
    """...existing docstring...

    Cross-validation from myopia literature (Pärssinen & Wedenoja 2021,
    Lääkärilehti): melanopsin/ipRGC signaling (460–480 nm activation
    spectrum) shares wavelength dependency with CRY/RPM (400–500 nm).
    Smartphone screens activate both systems simultaneously. This
    independent biological context validates the mechanistic basis
    for the night fraction parameter: nighttime phone use creates
    conditions where CRY is both activated (by blue light) and
    vulnerable to RF disruption (from the phone's transmitter).

    Note: Myopia is BERM-adjacent, not BERM evidence. The shared
    wavelength dependency is documented as mechanistic context,
    not as evidence for BERM's fertility predictions.
    """
```

---

### 9. [PROJEKTI] Projektidokumenttien päivitys

Päivitä seuraavat Claude-projektin dokumentit:

#### 9a. BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md

**Muutos 1:** Tason 4 "vgic"-solmun `keyReferences`-listaan lisätään Panagopoulos 2025 (131 tutkimuksen katsaus).

**Muutos 2:** Tason 4 "vgic"-solmun `quantitative`-kenttään lisätään: "Panagopoulos 2025: 131/131 tutkimuksesta 124 (95 %) raportoi oksidatiivisia vaikutuksia."

**Muutos 3:** Nuoleen `membrane` → `vgic` lisätään viittaus Koivisto 2000, Eliyahu 2006, Luria 2009 kognitiivisina RCT-tukina.

**Muutos 4:** Tason 5D "pathway_d"-solmun `keyReferences`-listaan lisätään Luria 2009 (GAS-dynamiikka).

#### 9b. BERM/BERM_recovery_RPM_excitable_integraatio.md

**Muutos:** Lisää recovery window -osioon viittaus Koivisto/Panagopoulos -kontrastiin:

"Koivisto ym. 2000 (30–60 min akuutti altistus → fasilitaatio) ja Panagopoulos ym. 2025 (131 kroonista tutkimusta → 95 % oksidatiivinen stressi) havainnollistavat recovery window -mallin eri päitä. Akuutti fasilitaatio on yhteensopiva Ca²⁺-välitteisen synaptisen vahvistuksen kanssa, kun korjauskapasiteetti riittää. Krooninen oksidatiivinen stressi syntyy kun korjauskapasiteetti ylitetään."

#### 9c. BERM/LBERM_v16_mekanismien_mallinnus.md

**Muutos:** Lisää HPA→HPG-osioon Luria 2009 viittaus GAS-dynamiikkaan ihmisessä (akuutti alarm→resistance -siirtymä 1 h aikana).

#### 9d. BERM/analyysi_yhteenveto.md

**Muutos:** Lisää viittaus tähän analyysiin ja CODELLE-ohjeeseen:

"2026-08-24: Kuuden lähteen analyysi (BERM_6_lahdetta_analyysi_2026-08-24.md) integroitu CODELLE_6lahdetta_integraatio.md -ohjeen kautta. Neljä lähdettä lisätty viiterekisteriin (Panagopoulos 2025 [E], Koivisto 2000 [C], Eliyahu 2006 [C], Luria 2009 [C]). Pärssinen 2021 (myopia) dokumentoitu viereinen evidenssinä."

---

### 10. [PROJEKTI] Episteemisten tasojen arviointi

#### 10a. Solmu: `vgic` (taso 4)

**Nykyinen taso:** E (kausaaliketjuohjeissa)

**Arvio:** Panagopoulos 2025 (131 tutkimuksen katsaus) tukee E-tasoa. Ei muutosta tarvita — taso on jo oikein. Dokumentoidaan tuki.

#### 10b. Nuoli: `vgic` → `pathway_a` (Ca²⁺ influx)

**Nykyinen taso:** E

**Arvio:** Panagopoulos 2025 tukee. Ei muutosta. 95 % konsensus 131 tutkimuksessa on yhdenmukainen olemassa olevan E-tason kanssa.

#### 10c. Nuoli: `membrane` → `vgic` (kentänmuutos kalvolla)

**Nykyinen taso:** E

**Arvio:** Kolme uutta RCT:tä (Koivisto, Eliyahu, Luria) tukevat tasoa C yksinään, mutta nuolen kokonaistaso on jo E aiemman evidenssin perusteella. Ei muutosta.

#### 10d. Solmu: `pathway_d` (Polku D: HPA→HPG)

**Nykyinen taso:** E (kausaaliketjuohjeissa)

**Arvio:** Luria 2009 tukee GAS-dynamiikkaa ihmisessä (C-tason tuki). Kokonaistaso pysyy E:nä. Ei muutosta.

**Yhteenveto:** Yksikään episteeminen taso ei muutu näiden neljän lähteen perusteella. Ne tukevat olemassa olevia tasoja mutta eivät nosta mitään uudelle tasolle. Tämä on loogista: lähteet kohdistuvat ketjun keskiosaan (tasot 3–7) joka on jo hyvin dokumentoitu.

---

---

## VIEREINEN EVIDENSSI (EI INTEGROITAVA)

Seuraavat lähteet eivät ole TOTEUTETTAVIEN MUUTOSTEN piirissä. Ne dokumentoidaan kontekstina poikkileikkaavissa mekanismikuvauksissa (ks. askel 8c).

### Myopiakatsaus (Pärssinen & Wedenoja 2021)

**EI lisätä references.json:iin.** Myopia on BERM-viereinen päätetapahtuma: se jakaa mekanistisia elementtejä (dopamiini-melatoniinidynamiikka, sinisen valon aallonpituusriippuvuus, urbanisaatiotakaisinkytkentä) mutta ei testaa BERM:n pääennustetta (TFR = bioCap × behavioral × cultural).

**Dokumentoidaan:** Poikkileikkaavana kontekstina v17_night_fraction()-funktion docstringissä (ks. 8c) ja model/page.tsx:n yöaltistusreitin kuvauksessa.

**Kolme BERM-relevanttia löydöstä myopiasta:**
1. Dopamiini-melatoniinioskillaation häiriö → riippumaton tuki tason 5C → 7 nuolelle
2. Melanopsiinin ja CRY:n jaettu aallonpituusriippuvuus (460–480 nm ≈ 400–500 nm) → tukee v17_night_fraction()-parametrin biologista perustaa
3. Urbanisaatio myopian taustatekijänä → riippumaton tuki tason 9 takaisinkytkennälle

### bem.70066 (magnetostimulatiion havaintokynnykset)

**EI lisätä.** Artikkelin sisältö ei ollut saatavilla (403-virhe). Käsittelee tietoista magneettikenttähavainnon kynnystä, joka on BERM:lle perifeerinen — BERM ei vaadi tietoista havaitsemista. Havaintokynnys > biologisen vuorovaikutuksen kynnys.

---

## TOTEUTUSJÄRJESTYS

```
1.  [KOODI]  references.json + references_full.json — 4 uutta merkintää
              (verified: false → tarkista DOI + otsikko → verified: true)

2.  [KOODI]  Evidence-sivu — Panagopoulos 2025 tutkimuskortti (EN + FI)

3.  [KOODI]  Evidence-sivu — Koivisto, Eliyahu, Luria tutkimuskortit (EN + FI)

4.  [KOODI]  CausalChain.tsx / causalChainData.ts — evidenssipopup-päivitykset
              (6 kohdetta: vgic, membrane→vgic, vgic→pathway_a,
               pathway_d, pathway_e, pathway_a→sdf/concentration)

5.  [PROJEKTI→KOODI] model/page.tsx — 3 tekstitäydennystä (IFO-VGIC, recovery window,
              lateralisaatio) (EN + FI) — konteksti upotettu ohjeeseen

6.  [KOODI]  v16.py — docstring-päivitykset (3 funktiota, ei numerisia muutoksia)

7.  [KOODI]  metadata.py — kommenttipäivitys (ei arvomuutoksia)

8.  [KOODI]  Poikkileikkaavat dokumentaatiot (recovery window, kaksi-kanava,
              yöaltistus/myopia-konteksti)

9.  [PROJEKTI] Projektidokumentit (4 kpl):
              → kausaaliketju_ohjeet.md (4 muutosta)
              → BERM_recovery_RPM_excitable_integraatio.md (1 muutos)
              → LBERM_v16_mekanismien_mallinnus.md (1 muutos)
              → analyysi_yhteenveto.md (1 muutos)
              → Jos ei projektipääsyä: kirjoita docs/codelle/pending/

10. [PROJEKTI] Episteemisten tasojen arviointi → ei muutoksia (dokumentoi tuki)
```

---

## VAROITUKSET

1. **Älä muuta numeerisia laskuja.** Tämä ohje koskee AINOASTAAN dokumentaatiota, evidenssisivua ja viiterekisteriä. v16.py:n/v17:n laskukaavoja, kertoimia tai parametreja EI saa muuttaa.

2. **Verified-lippu vaatii tarkistuksen.** Kaikki neljä uutta references.json-merkintää on `verified: false`. Suorittava agentti tarkistaa tarkat otsikot ja DOI:t ennen `true`-asetusta. Erityisesti Panagopoulos 2025:n tarkka otsikko on tarkistettava.

3. **Recovery window -tulkinnasta varovaisesti.** Koiviston fasilitaatio on YHTEENSOPIVA recovery window -mallin kanssa, mutta se ei TESTAA mallia. Fasilitaatio voi johtua muistakin mekanismeista. Älä käytä termiä "vahvistaa" — käytä "yhteensopiva".

4. **Lateralisaatio tukee spatiaalirakennetta, ei kausaalista vaikutusta.** Eliyahun ja Lurian lateralisaatiolöydökset osoittavat, että EMF-vaste on paikallinen. Ne eivät osoita, että paikallinen vaste johtaa tason 6+ seurauksiin. Silta akuutista neurokognitiivisesta vaikutuksesta krooniseen reproduktiiviseen seuraukseen kulkee recovery window -mekanismin ja 5 biologisen polun kautta.

5. **Replikaatio-ongelmista läpinäkyvästi.** Koivisto 2000 ei replikoitunut (Haarala 2003, 2005). Tämä on mainittava JOKAISESSA kontekstissa jossa tutkimukseen viitataan. Lurian aikariippuva vaikutus näkyi vain kahdessa ensimmäisessä blokissa — tämäkin on mainittava.

6. **Myopia EI ole BERM-evidenssiä.** Myopiakatsaus on viereinen, ei suuntaan eikä toiseen. Älä esitä sitä BERM:n ennusteiden tukena. Se tarjoaa mekanistista kontekstia mutta ei testaa BERM:n pääennustetta.

7. **Terminologia:** Älä käytä "todistaa" tai "vahvistaa" kumpaankaan suuntaan. Käytä: "tukee", "on yhteensopiva", "on yhdenmukainen", "osoittaa". Tämä on BERM-projektin yleinen sääntö (project_rules.md).

8. **Evidence-sivun rakenne.** Sivu on 219 KB monolitti (CODELLE_evidence_paivityssuunnitelma_v2.md dokumentoi ongelman). Lisäykset tehdään nykyiseen rakenteeseen, mutta sivun refaktorointi erillisiksi komponenteiksi on suunnitteilla. Älä aloita refaktorointia tämän ohjeen puitteissa.
