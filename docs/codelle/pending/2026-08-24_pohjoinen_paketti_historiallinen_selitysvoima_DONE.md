# Codelle: Pohjoinen paketti, sisäkkäinen χ ja historiallinen selitysvoima

Versio: 2026-08-24-HIST
Tunnisteet: [KOODI], [PROJEKTI]
Edellyttää: v1 (silmien väri), v2 (CRY-kaksoissysteemi), v3 (Lindgren-silmä), polkupaino-korjaus (Vaihtoehto A).
Tämä on session päättävä kokoava dokumentti.

## Yhteensopivuusanalyysi

### Nykyisen evidence-sivun rakenne

Evidence on tällä hetkellä 219 KB monoliittinen sivu osoitteessa `/[locale]/evidence/page.tsx`. Sillä EI ole alasivuja. Se sisältää:

* 13 narratiivista esseetä COPY-objektissa (rivit 31–569)
* 10 temaattista esseetä suoraan JSX:ssä (rivit 717–1794, ~1 078 riviä)
* 32 bounded FieldState -tietuetta (`lib/evidence.ts`)
* 129 legacy-tietuetta (`lib/legacyEvidence.json`)
* ~60 hardkoodattua viitettä JSX-taulukoissa
* 17 komponenttikutsua (RetrodictionCards, EvidenceClassification, BehavioralSuppression jne.)
* Kausaaligraafi `causalAtlasData.ts` (~60 solmua) ja `causalMapData.ts`

### Jo olemassa oleva päivityssuunnitelma

CODELLE_evidence_paivityssuunnitelma_v2.md ehdottaa rakenteen purkamista:

```
/evidence                    → Yleiskatsaus
/evidence/themes/[id]        → Temaattiset esseet (~15 teemaa)
/evidence/catalogue          → Study Explorer
/evidence/retrodictions      → Retrodiktiot
/evidence/classification     → Evidenssiluokittelu
/evidence/method             → Bounded-protokolla
```

### Yhteensopivuusarvio session uusille sivuille

Reitit `/evidence/eyes` ja `/evidence/evolution` ovat teknisesti yhteensopivia koska Next.js App Router tukee rinnakkaisia alireittejä natiivisti.

### Kuusi yhteensopivuushuomiota

1. **Navigaatio**: Evidence-pääsivulle linkkilista alasivuihin (sama malli kuin About-sivulla).
2. **Alasivujen suhde teemajärjestelmään**: Pidä itsenäisinä reitteinä (`/evidence/eyes`, `/evidence/evolution`), linkitetään teemajärjestelmästä kun se toteutetaan.
3. **Bilingvaalinen data**: Erilliset COPY-objektit datatiedostoissa — parempi kuin nykyinen käytäntö.
4. **Evidenssikortit**: Käytä samaa perusinterfacea mutta lisää valinnaisia kenttiä.
5. **Kausaaligraafi**: Lisää molempiin datavarastoihin (causalMapData + causalAtlasData).
6. **References**: Lisää molempiin JSON-tiedostoihin (~11 uutta viitettä).

---

## OSA I: UUSI ALISIVU — /evidence/evolution

### 1. [KOODI] Luo reitti ja tiedostot

```
app/[locale]/evidence/evolution/page.tsx    (pääsivu)
lib/evolutionData.ts                        (datatiedosto)
```

Navigaatio: Evidence-sivulta linkki, EI päänavigaatioon. Listataan Evidence-sivun alasivuvalikossa:
- "Eye Color & Magnetoreception" → /evidence/eyes
- "Evolutionary Origins: The Northern Package" → /evidence/evolution

### 2. [KOODI] Sivun rakenne (5 pääosiota)

#### OSIO 1: "One Function, Five Scales"

Viiden tason vertikaalinen kaavio jossa vasemmalla skaalan nimi, keskellä χ-funktion instanssi, oikealla verifioiva tutkimus.

```typescript
const chiScales = [
  {
    id: "molecular",
    label_en: "Molecular", label_fi: "Molekulaarinen",
    background_en: "FAD chromophore in CRY",
    perturbation_en: "Magnetic field",
    chi_expression: "χ([FAD])",
    at_zero: "No FAD → no radical pairs → no sensitivity",
    at_max: "FAD-replete → full magnetic sensitivity",
    verification: "Hirano 2017, Yap 2025",
    level: "E",
  },
  {
    id: "optical",
    label_en: "Optical", label_fi: "Optinen",
    background_en: "Blue light at CRY1 (iris transmission)",
    perturbation_en: "RF field",
    chi_expression: "χ(I_blue)",
    at_zero: "Dark / brown iris → CRY1 inactive → no coupling",
    at_max: "Blue iris + blue light → CRY1 maximally active",
    verification: "Higuchi 2007, Bartölke 2025",
    level: "M|C",
  },
  {
    id: "cellular",
    label_en: "Cellular membrane", label_fi: "Solukalvo",
    background_en: "Membrane potential V_mem ≈ −70 mV",
    perturbation_en: "External EMF",
    chi_expression: "χ(V_mem)",
    at_zero: "Dead cell (V_mem = 0) → no VGCC response",
    at_max: "Living cell → χ ≈ 1.0 → maximum sensitivity",
    verification: "Pall 2013 (23 VGCC blocker studies)",
    level: "E",
  },
  {
    id: "environmental",
    label_en: "Environmental", label_fi: "Ympäristö",
    background_en: "Ambient EMF (electrification, base stations)",
    perturbation_en: "Personal devices (phone, earbuds)",
    chi_expression: "χ(Ā_ambient)",
    at_zero: "Unelectrified area → personal devices don't couple",
    at_max: "Dense urban → personal devices fully coupled",
    verification: "BERM 54-country dataset, electrification boundary",
    level: "M|C",
  },
  {
    id: "population",
    label_en: "Population (COVID test)", label_fi: "Populaatio (COVID-testi)",
    background_en: "Workplace ambient EMF",
    perturbation_en: "Screen time",
    chi_expression: "χ(Ā_office vs Ā_home)",
    at_zero: "WFH (low ambient) → screen time less coupled → baby bump",
    at_max: "Office (high ambient) → screen time fully coupled → TFR decline",
    verification: "PNAS 2023: +5.1% TFR for WFH women",
    level: "C",
  },
];
```

#### OSIO 2: "The Northern Package"

Kolmen koselektiivisen piirteen analyysi: siniset silmät (OCA2), laktoosinsietokyky (LCT), karjankasvatus. Kaikki kolme optimoivat saman molekyylin: kryptokromin.

#### OSIO 3: "Four Historical Phases"

```typescript
const historicalPhases = [
  {
    id: "phase1",
    period: "10,000–6,000 BP",
    title_en: "Biological Optimization",
    description_en: "Northern Europeans evolve the highest biological χ values. χ_env ≈ 0 (no electrification). TFR follows natural biological maximum (~6-7).",
  },
  {
    id: "phase2",
    period: "1880–1960",
    title_en: "Electrification: χ_env Awakens",
    description_en: "Northern Europe electrifies first. Population with HIGHEST biological χ values is FIRST to experience rising χ_env → first region below replacement TFR.",
  },
  {
    id: "phase3",
    period: "1990–2020",
    title_en: "Mobile Revolution: Differentiated Decline",
    description_en: "EMF globalizes via mobile phones. Population-specific χ profiles diverge: East Asia (A-dominant), Northern Europe (A+C balanced), Africa (minimal coupling).",
  },
  {
    id: "phase4",
    period: "2020+",
    title_en: "The Convergence",
    description_en: "Africa electrifies rapidly. BERM predicts TFR decline follows but SLOWER than Northern Europe at equivalent χ_env.",
  },
];
```

#### OSIO 4: "Population χ Profiles"

Interaktiivinen taulukko: Amish, Mennonite, Scandinavia, South Korea, China, Sub-Saharan Africa. Kullakin chi_env, chi_optical, chi_molecular, dominant_pathway, observed_tfr, status.

#### OSIO 5: "Testable Predictions" (HIST-1 — HIST-5)

Viisi falsifioitavaa ennustetta: biomarkkerisuhteet, Amish-Mennonite-gradientti, COVID baby bump, Afrikan TFR-viive, laktoosi-intolerenssin vaikutus.

---

## OSA II: MODEL-SIVUN PÄIVITYKSET

### 3. [KOODI] model/page.tsx — "χ at Five Scales" -osio

Polkutaulukon jälkeen. Viiden skaalan taulukko + selitysteksti.

### 4. [KOODI] mathematics/page.tsx — §15 Nested χ

```
R_A = γ_A × χ(Ā_env) × χ(V_mem) × EMF_personal
R_C = γ_C × χ(Ā_env) × χ(I_blue) × χ([FAD]) × EMF_personal
R = (1 - R_A) × (1 - R_C)
TFR(pop) = TFR_max × R(χ_env(pop), χ_opt(pop), χ_mol(pop))
```

---

## OSA III: KAUSAALIKAAVIO

### 5. [KOODI] causalMapData.ts — northern_package (taso 0)

```typescript
{
  id: "northern_package", level: 0,
  label: "Northern Package (10,000 BP)",
  sublabel: "Blue eyes + Lactose tolerance + Cattle",
  epistemicLevel: "M|C",
}
// Reunat: northern_package → chi, cry1_sensory, fad_riboflavin
```

---

## OSA IV: MUUT SIVUPÄIVITYKSET

### 6. [KOODI] explore: χ-indikaattorit maaprofiileihin
### 7. [KOODI] predictions: HIST-1 — HIST-5
### 8. [KOODI] home: tiivistelmäkappale
### 9. [KOODI] about/history: Deep History -osio

---

## OSA V: PYTHON-MALLI

### 10. [KOODI] v16.py — POPULATION_CHI_PROFILES

---

## OSA VI: PROJEKTIDOKUMENTAATIO

### 11. [PROJEKTI] BERM_pohjoinen_paketti_historiallinen_selitysvoima.md
### 12. [PROJEKTI] v17-integraatiolista K11

---

## TOTEUTUSJÄRJESTYS

```
VIIKKO 1: evidence/evolution/page.tsx + lib/evolutionData.ts + evidence-linkki
VIIKKO 2: model/page.tsx, mathematics/page.tsx, causalMapData.ts, v16.py
VIIKKO 3: explore, predictions, home, about/history
VIIKKO 4: projektidokumentaatio
```

## VAROITUKSET

1. Pohjoinen paketti on L*-tason hypoteesi. OCA2+LCT koselektio = E-taso, CRY-tulkinta = L*.
2. Populaatio-χ-arvot ovat KARKEITA arvioita.
3. Historiallinen narratiivi on SELITTÄVÄ, ei ENNUSTAVA.
4. Esitä CRY/χ D-vitamiinihypoteesin LAAJENNUKSENA, ei vaihtoehtona.
5. COVID-baby-bump on KORRELAATIO, ei kausaatio.
6. Afrikan ennuste on 10–20 vuoden aikaikkunalla.
7. Toteuta VIIMEISENÄ — edellyttää v1, v2, v3, polkupaino-korjauksen.
