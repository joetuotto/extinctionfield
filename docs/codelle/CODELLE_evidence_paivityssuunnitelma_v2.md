# Evidence-sivun päivityssuunnitelma v2 — auditoitu ja täydennetty

> **Alkuperäinen suunnitelma:** käyttäjän laatima 12-osioinen redesign-suunnitelma  
> **Tämä dokumentti:** koodiauditoinnin perusteella korjattu, täydennetty ja priorisoitu versio  
> **Auditoitu koodi:** `evidence/page.tsx` (2 018 riviä, 219 KB), `lib/evidence.ts` (766 riviä), `lib/types.ts`, `lib/navigation.ts`, `lib/causalAtlasData.ts`, `lib/causalMapData.ts`, `components/EvidenceClassification.tsx`, `components/RetrodictionCards.tsx`, `components/BehavioralSuppression.tsx` + 14 muuta komponenttia

> **TILA 2026-09-02: KORVATTU.** Suunnitelman 26 tehtävästä toteutui noin 4; evidence-sivu järjestettiin sen sijaan `SUB_PAGES`-alasivuarkkitehtuurilla (commit e0380b2 alkaen, 44 aihekohtaista alasivua). Dokumentti säilytetään historiallisena; älä toteuta sen avoimia kohtia sellaisenaan.

---

## 0. KOODIAUDITOINNIN YHTEENVETO — NYKYTILAN TODELLISUUS

### 0.1 Sivun todellinen rakenne (ei arvio — rivi riviltä)

Alkuperäinen suunnitelma tunnistaa oikein, että sivu on 219 KB monoliitti. Auditointi paljastaa tarkan rakenteen:

| Rivit | Sisältö | Tyyppi |
|-------|---------|--------|
| 1–30 | 17 komponentti-importtia + data-importit | Infrastruktuuri |
| 31–569 | Massiivinen `COPY`-objekti (EN + FI) — 13 narratiivista esseetä + paradoksi-kortit + tulkintasäännöt | Bilingvaalinen data |
| 571–584 | `PATHWAY_ORDER` (16 polkua) + `CHANNEL_GROUPS` (3 kanavaa, EN+FI) | Konfiguraatio |
| 586–598 | `generateMetadata` + sivukomponentin alku | Next.js boilerplate |
| 600–712 | 13 narratiivin renderöinti + upotettuja komponentteja (TherapeuticFrequencyMap, CellSizeFrequencyMatrix, ThreeChannelDiagram, LightingTransitionTimeline) | JSX + komponentit |
| 714–715 | `<RetrodictionCards>` (erillinen komponentti, 220 riviä, 6 retrodiktiota) | Komponenttikutsu |
| **717–1794** | **10 temaattista esseetä SUORAAN JSX:ssä raakana bilingvaalisena ternary-tekstinä** | **KRIITTINEN ONGELMA** |
| 1841–1878 | Bounded FieldState -tietueiden renderöinti (32 tietuetta) | Data-renderöinti |
| 1881–1887 | `<EvidenceClassification>` (erillinen komponentti, 173 riviä) | Komponenttikutsu |
| 1889–1910 | Kolmen taajuuskanavan ryhmittely | JSX |
| 1912–1985 | Legacy evidence catalogue -renderöinti (129 tietuetta) | Data-renderöinti |
| 1988–2018 | Sentinel-crosslink + DiseaseCascadeTimeline + DifferentialSusceptibility + HindcastValidation + StatisticalValidation + ReferencesSummary + NextPageLink | Komponenttikutsuja |

### 0.2 Kriittinen löydös jonka alkuperäinen suunnitelma ei tunnista

Suunnitelman kohdassa 1 ("Rakenteelliset ongelmat") mainitaan 13 narratiivista esseetä COPY-objektissa. Tämä on vain PUOLET ongelmasta.

**Todellinen suurin ongelma on rivit 717–1794:** kymmenen erillistä temaattista esseetä, jotka ovat kirjoitettu SUORAAN JSX:ään raakana bilingvaalisena `activeLocale === "fi" ? "..." : "..."` -muodossa. Nämä eivät ole COPY-objektissa lainkaan:

1. **Ionic Treatment Hierarchy** (R4b-d) — rivit 717–795 — 7 viitetaulukon riviä
2. **Skin Battery** — rivit 797–873 — 6 viitetaulukon riviä
3. **LED Light Confound** — rivit 875–946 — 5 viitetaulukon riviä
4. **Hospital EMF Hypothesis** — rivit 948–1014 — 4 viitetaulukon riviä
5. **BBB Pathway F** — rivit 1016–1171 — 3 alaosiota + BBBMechanismDiagram + 8 viitettä
6. **Alzheimer & Calcium** — rivit 1173–1254 — 6 viitettä
7. **ADHD Calibration** — rivit 1256–1342 — 7 viitettä
8. **Ion Channel Convergence** — rivit 1344–1493 — 2 taulukkoa (8 sairautta + 7 viitettä)
9. **Melatonin Bridge** — rivit 1495–1635 — 2 taulukkoa + 10 viitettä
10. **Sleep as Mediating Mechanism + Proxy Masking** — rivit 1641–1725 — 6 viitettä

**Yhteensä:** ~1 078 riviä raakatekstiä JSX:ssä ilman minkäänlaista data-abstraktiota. Nämä sisältävät:
- ~60 viitetaulukon riviä (hardkoodattuna, ei references.json:sta)
- ~30 kappaletta bilingvaalista narratiivitekstiä
- 3 upotettua komponenttia (IonicHierarchyDiagram, BBBMechanismDiagram, BehavioralSuppression)

### 0.3 Komponenttien nykyinen dekompositio

Alkuperäinen suunnitelma ei analysoi jo olemassa olevaa komponenttirakennetta. Sivu käyttää **17 komponenttia**, joista:

**Jo erillisinä tiedostoina (hyvä):**
- `RetrodictionCards.tsx` (220 riviä) — 6 retrodiktiota, accordion-UI, oma COPY
- `EvidenceClassification.tsx` (173 riviä) — filtteröitävä FindingCard-lista, oma COPY
- `BehavioralSuppression.tsx` (130 riviä) — nelinkertainen käyttäytymissuppressio, oma COPY
- `TherapeuticFrequencyMap.tsx` — terapeuttisten laitteiden taajuuskartta
- `CellSizeFrequencyMatrix.tsx` — solukoko × taajuus -matriisi
- `ThreeChannelDiagram.tsx` — kolmen kanavan diagrammi
- `LightingTransitionTimeline.tsx` — valaistustransition aikajana
- `IonicHierarchyDiagram.tsx` — ioninen hoitohierarkia
- `BBBMechanismDiagram.tsx` — BBB-mekanismidiagrammi
- `DiseaseCascadeTimeline.tsx` (43 KB) — kroonisten sairauksien kaskadi
- `DifferentialSusceptibility.tsx` — BERM-Eco erotteleva herkkyys
- `HindcastValidation.tsx` — retrodiktiovalidaatio
- `StatisticalValidation.tsx` — tilastollinen validaatio
- `ReferencesSummary.tsx` — lähdeyhteenveto

**Päätelmä:** Komponenttien visuaalinen puoli on jo hyvin dekompositoitu. Ongelma on, että narratiivinen/tekstuaalinen sisältö on jäänyt page.tsx:ään.

### 0.4 Kausaaligraafin nykytila (suunnitelma ei analysoi tätä)

`causalAtlasData.ts` sisältää jo:
- **Noden yksityiskohtaiset tiedot** (`NodeDetail`-interface): `mechanism`, `fdaDevice`, `bermPathway`, `keyRefs`, `prediction`, `link`
- **Reunatyypit:** `RelationType = "causal" | "modulates" | "differential"`
- **~60 solmua** (EN_LABELS) seitsemässä vaiheessa: sources → modulation → mechanisms → tissue → disease → demographic → ecology
- **Layout-engine** (`computeLayout()`, `computeBands()`)

`causalMapData.ts` sisältää:
- `CausalMapNode` interface: `id, level, label, sublabel, color, epistemicLevel, cascadeOrder, detail`
- `CausalMapEdge` interface: `from, to, label`
- **Noden `detail.link`-kenttä** joka jo viittaa evidence-sivun ankkureihin (esim. `"/evidence#therapeutic-devices"`, `"/evidence#lighting-transition"`)

**Kriittinen implikaatio:** Suunnitelman ehdotus "edge-level evidence" on jo OSITTAIN toteutettu. Solmuilla on `keyRefs`-kenttä ja `link`-kenttä. Puutteena on, että:
1. `CausalMapEdge` EI sisällä `epistemicLevel`- tai `keyRefs`-kenttää (vain `from`, `to`, `label`)
2. Evidence-tietueet viittaavat `causalNodes`-taulukkoon (solmut), eivät reunoihin
3. Ankkurilinkit evidence-sivulla (`#section-id`) eivät kaikki vastaa todellisia `id`-attribuutteja

### 0.5 Data-arkkitehtuurin todellinen tila

| Datakerros | Tiedosto | Tietueet | Formaatti |
|------------|----------|----------|-----------|
| Bounded FieldState | `lib/evidence.ts` inline | 32 | TS-taulukko, tyypitetty |
| Legacy catalogue | `lib/legacyEvidence.json` | 129 | JSON, importoitu |
| Narratiivit (COPY) | `page.tsx` rivit 31–569 | 13 × (title + paragraphs + studies) | TS `as const` |
| Inline-esseet | `page.tsx` rivit 717–1794 | 10 × (otsikko + kappaleet + viitteet) | Raaka JSX ternary |
| Retrodiktiot | `RetrodictionCards.tsx` | 6 | TS-taulukko komponentin sisällä |
| Findings-luokittelu | `lib/findingsClassification.ts` | n (tuntematon) | TS, erillinen tiedosto |
| Kausaalisolmut | `lib/causalMapData.ts` | ~60 | TS-taulukko |
| Kausaalireunat | `lib/causalMapData.ts` | tuntematon | TS-taulukko |

**Viisi erillistä evidenssidatavarastoa** — osa päällekkäisiä, osa erilaisilla skeemoilla. Suunnitelman ehdotus yhtenäisestä taksonomista on välttämätön.

---

## 1. ALKUPERÄISEN SUUNNITELMAN ARVIOINTI — OSIO OSIOILTA

### 1.1 Rakenteelliset ongelmat (osio 1) ✅ Pääosin oikein

Suunnitelma tunnistaa oikein 7 ongelmaa. Korjaukset:

- **Kohta 1 (219 KB monoliitti):** ✅ Vahvistettu. Todellinen koko on vielä suurempi kun lasketaan komponentit joihin viitataan.
- **Kohta 2 (sisällön päällekkäisyys):** ✅ Vahvistettu. ThreeChannelDiagram renderöidään evidence-sivulla COVID-narratiivin sisällä mutta kuuluu mallisivulle. DiseaseCascadeTimeline ja DifferentialSusceptibility ovat sivun LOPUSSA ilman selvää narratiivista yhteyttä edeltävään sisältöön.
- **Kohta 3 (FieldStateDirectness-taksonomia):** ✅ Vahvistettu. 6 arvoa sekoittavat kausaalisen position, päätepisteen tyypin, tutkimusdesignin ja synteesimuodon.
- **Kohta 4 (evidenssi vain solmuihin):** ✅ Vahvistettu. `causalNodes: readonly string[]` evidence-tietueissa. CausalMapEdge:llä EI ole evidenssikenttää.
- **Kohta 5 (bilingvaalinen inline-teksti):** ⚠️ ALIARVIOIDAAN. Suunnitelma mainitsee vain COPY-objektin. Todellisuudessa ~1 078 riviä JSX-ternary-tekstiä COPY:n ulkopuolella on suurempi ongelma.
- **Kohta 6 (navigaatio):** ✅ Vahvistettu. Evidence on yksittäinen nav-item ilman alasivuja.
- **Kohta 7 (viitteet hardkoodattu):** ✅ Vahvistettu. ~60 viitetaulukon riviä JSX:ssä, erillään references.json:stä.

### 1.2 Uusi missio (osio 2) ✅ Hyvä

Suunnitelma ehdottaa missionksi "esittää jokainen BERM-väite testattavana, falsifioitavana propositiona ja kytkeä se primäärilähteisiin ja formaaliin kausaalimalliin." Tämä on oikea suunta.

**Lisäys:** Mission tulisi eksplisiittisesti sisältää EPISTEEMISEN TASON näkyvyys. Nykyiset inline-esseet sisältävät jo episteemisen tason merkintöjä (esim. "Epistemic level: BBB opening conformational mechanism [E]"), mutta ne ovat vain lopputekstinä. Ne tulisi olla rakenteellinen data-elementti.

### 1.3 Informaatioarkkitehtuuri (osio 3) ⚠️ Vaatii uudelleenarviointi

Suunnitelma ehdottaa 6 alireittiä:

| Ehdotettu | Arvio | Perustelu |
|-----------|-------|-----------|
| `/evidence` (yleiskatsaus) | ✅ Pidä | Tiivistelmäsivu on välttämätön |
| `/evidence/claims/[id]` | ⚠️ Muokkaa | Sisältö jakautuu paremmin teemoittain kuin yksittäisiksi väitteiksi |
| `/evidence/studies/[id]` | ❌ Liian granulaarinen | Yksittäisen tutkimuksen sivu ei tuota lisäarvoa; lista + modaali/drawer riittää |
| `/evidence/gaps` | ✅ Pidä | Mutta yhdistä Orphaned Findings + puuttuvat testit |
| `/evidence/method` | ✅ Pidä | Bounded-protokolla + episteeminen taksonomia |
| `/evidence/timeline` | ⚠️ Muokkaa → integroidu | Timeline on visualisaatio, ei itsenäinen sivu |

**Ehdotettu parannettu informaatioarkkitehtuuri:**

```
/evidence                    → Yleiskatsaus + tiivistelmätaulukot
/evidence/themes/[id]        → Temaattiset esseet (nykyiset 13 + 10 inline)
/evidence/catalogue          → Study Explorer (bounded + legacy + viitteet)
/evidence/retrodictions      → Retrodiktiot + HindcastValidation
/evidence/classification     → EvidenceClassification + Orphaned Findings
/evidence/method             → Bounded-protokolla + episteeminen taksonomia + gaps
```

**Perustelut:**
1. **`/evidence/themes/[id]`** korvaa `/evidence/claims/[id]`. Nykyiset 23 esseetä (13 COPY + 10 inline) jakautuvat luontevasti ~15 temaattiselle sivulle (jotkut yhdistyvät). Jokainen teemasivu sisältää: narratiivi + viitetaulukko + upotettu visualisaatio + episteeminen taso + crosslinkit kausaalikartalle.
2. **`/evidence/studies/[id]`** on liian granulaarinen. Kukaan ei navigoi yksittäiseen tutkimussivuun. Study Explorer (`/evidence/catalogue`) tarjoaa suodatettavan listan josta modaali/drawer avaa yksittäisen tutkimuksen tiedot.
3. **`/evidence/retrodictions`** on itsenäinen koska RetrodictionCards on jo erillinen 220-rivinen komponentti omalla datalla.
4. **`/evidence/classification`** yhdistää nykyisen EvidenceClassification-komponentin (FindingCard-lista + suodattimet) ja Orphaned Findings -taulukon.

### 1.4 Overview-sivun rakenne (osio 4) ✅ Pääosin hyvä

Suunnitelman ehdotus (Hero → Claim tiles → Strength summary → Retrodiction mini → Study metrics) on järkevä. Korjaukset:

- **Claim tiles:** Teemasivujen lukumäärä on ~15, ei rajattomasti kasvava. Grid-layout ei skaalaudu hyvin >12 korttiin. → Ryhmittele teemakortit kausaalivaiheen mukaan (Sources → Mechanisms → Tissue → Disease → Demographic) CausalAtlas-vaiheiden mukaisesti.
- **Retrodiction mini:** RetrodictionCards on jo 220-rivinen komponentti — käytä suoraan compact-propilla.
- **Study metrics:** Lisää bounded/legacy/total -laskurit jotka ovat jo olemassa (`FIELDSTATE_EVIDENCE_COUNT`, `LEGACY_EVIDENCE_COUNT`).

### 1.5 Study Explorer (osio 5) ✅ Hyvä konsepti, tarkenna

Suunnitelman ehdotus on hyvä. Tarkennus toteutukseen:

**Nykyinen data:** 32 bounded (FieldState) + 129 legacy + ~60 inline-viitettä (esseiden taulukoissa) = ~221 tietuetta.

**Ongelma:** Inline-viitteet (esseiden taulukoissa) eivät ole minkään datan piirissä. Ne ovat raakaa HTML:ää. Esimerkki:
```tsx
<td className="py-2 pr-3 font-medium text-foreground">Gao ym. (Bioelectromagnetics)</td>
<td className="py-2 pr-3 font-mono-num">2024</td>
<td className="py-2">{activeLocale === "fi" ? "EMP avaa TJ:t konformaatiomuutoksella" : "EMP opens TJs via conformational change"}</td>
```

→ **Migraatiovaihe 0 (uusi):** Kaikki inline-viitteet (~60 kpl) on purettava dataksi ENNEN muuta migraatiota. Ne sisältävät uniikkeja tutkimuksia jotka eivät ole bounded- tai legacy-katalogissa.

### 1.6 Sisällön migraatiosuunnitelma (osio 6) ⚠️ Puutteellinen

Suunnitelma listaa 15 migraatiokohdetta. Puuttuvat:

| Komponentti | Nykytila | Kohde |
|-------------|----------|-------|
| 10 inline-esseetä (rivit 717–1794) | Raaka JSX, ei dataa | → `/evidence/themes/[id]` + `lib/thematicEssays.ts` |
| ~60 inline-viitettä (taulukoissa) | Raaka HTML | → `lib/evidence.ts` tai `references.json` |
| `CHANNEL_GROUPS` (rivit 571–584) | `page.tsx` inline const | → `lib/evidence.ts` |
| `PATHWAY_ORDER` (rivi 571) | `page.tsx` inline const | → `lib/evidence.ts` |
| Orphaned Findings -taulukko (rivit 1727–1794) | JSX inline data | → `lib/orphanedFindings.ts` |
| 10 Research Domains -grid (rivit 1796–1839) | JSX inline data | → `lib/researchDomains.ts` |
| Sleep/Proxy Masking (rivit 1641–1725) | JSX inline | → teemasivu |
| Skin Battery (rivit 797–873) | JSX inline | → teemasivu |
| LED Confound (rivit 875–946) | JSX inline | → teemasivu |
| Hospital EMF (rivit 948–1014) | JSX inline | → teemasivu |

**Päivitetty migraatiotaulukko (28 kohdetta):**

Prioriteetti A (data-purkaminen):
1. 10 inline-esseetä → `lib/thematicEssays.ts` (COPY-muotoinen bilingual data)
2. ~60 inline-viitettä → laajenna `lib/evidence.ts` tai `references.json`
3. 6 retrodiktiota → pidä RetrodictionCards:issa mutta lisää `id`-viitteet evidence-tietueisiin
4. Orphaned Findings → `lib/orphanedFindings.ts`
5. 10 Research Domains → `lib/researchDomains.ts`
6. CHANNEL_GROUPS + PATHWAY_ORDER → `lib/evidence.ts`

Prioriteetti B (sisällön siirto):
7. ThreeChannelDiagram COVID-narratiivista → linkki /model-sivulle
8. DiseaseCascadeTimeline → omaksi teemaksi tai /model-sivulle
9. DifferentialSusceptibility → /sentinel tai oma teema
10. Narratiivit 1–13 → teemasivut
11. Ionic Hierarchy → teemasivu `ionic-hierarchy`
12. BBB Pathway F → teemasivu `bbb-pathway`
13. Alzheimer & Calcium → teemasivu `alzheimer-calcium`
14. ADHD Calibration → teemasivu `adhd-calibration`
15. Ion Channel Convergence → teemasivu `ion-convergence`
16. Melatonin Bridge → teemasivu `melatonin-bridge`
17. Skin Battery → teemasivu `skin-battery`
18. LED Confound → teemasivu `led-confound`
19. Hospital EMF → teemasivu `hospital-emf`
20. Sleep mechanism → teemasivu `sleep-mechanism`

Prioriteetti C (infrastruktuuri):
21. Navigaation laajentaminen (children evidence-reitille)
22. Edge-level evidence CausalMapEdge:lle
23. Viitteiden yhtenäistäminen references.json:n kanssa
24. Episteemisen tason metadata kaikille tietueille

### 1.7 Uusi evidenssitaksonomia (osio 7) ⚠️ Liiallinen

Suunnitelma ehdottaa 6-akselista taksonomia. Analyysi:

| Akseli | Suunnitelma | Arvio |
|--------|-------------|-------|
| `EvidenceType` (10 arvoa) | experimental, observational, ... | ✅ Hyvä. Korvaa FieldStateDirectness. |
| `CausalPosition` (4 arvoa) | upstream, mediator, ... | ✅ Hyvä. Erottaa kausaalinen asema muista. |
| `FieldStateRole` (4 arvoa) | calibration, structural, ... | ⚠️ Osittain päällekkäinen nykyisen `calibrationRole` kanssa. Yksinkertaista 3 arvoon. |
| `SystemTarget` (vapaa teksti) | "sperm", "BBB", ... | ✅ Hyvä. Nykyinen `system`-kenttä on jo vapaa teksti. |
| `ReproductiveRelevance` (3 arvoa) | direct, indirect, contextual | ❌ Tarpeeton. Tämä päätellään CausalPosition + SystemTarget:sta. |
| `ConfidenceMetrics` (4 kenttää) | replicationStatus, effectSize, ... | ⚠️ Liian monimutkainen ensimmäiseen vaiheeseen. Lisää vaiheessa 3. |

**Parannettu taksonomia (4 akselia):**

```typescript
export type EvidenceType =
  | "experimental_animal"      // eläinkoe
  | "experimental_cell"        // solukoe
  | "experimental_human"       // ihmiskoe / RCT
  | "observational_cohort"     // kohorttitutkimus
  | "observational_cross"      // poikkileikkaustutkimus
  | "observational_ecological" // ekologinen tutkimus
  | "meta_analysis"            // meta-analyysi
  | "systematic_review"        // systemaattinen katsaus
  | "case_report"              // tapausraportti
  | "theoretical"              // teoreettinen
  | "fda_device"               // FDA-hyväksytty laite (TDP)
  | "patent";                  // patentti (TDP)

export type CausalPosition =
  | "upstream"     // EMF → mekanismi
  | "mediator"     // mekanismi → kudosvaikutus
  | "endpoint"     // kudosvaikutus → sairaus/demografia
  | "cross_system" // validoi koko ketjun
  | "contextual";  // taustatieto, ei suora BERM-evidenssi

export type CalibrationRole =
  | "structural"   // rajoittaa mallin parametria
  | "contextual"   // taustoittaa mutta ei rajoita
  | "none";        // ei kalibraatiokäyttöä

export type EpistemicLevel = "E" | "M|C" | "M" | "C" | "L*" | "L";
```

### 1.8 Edge-level evidence (osio 8) ✅ Hyvä, tarkenna toteutus

Suunnitelman idea on oikea: evidenssi tulisi kohdistaa myös reunoihin, ei vain solmuihin.

**Nykytila (auditoitu):**
- `CausalMapEdge` sisältää vain: `from`, `to`, `label` — EI episteemistä tasoa, EI evidenssiä
- `lib/types.ts`:n `ChainEdge` sisältää: `from`, `to`, `label`, `derivative`, `epistemicLevel`, `priority` — MUTTA tätä käytetään vain /map-sivulla, EI evidence-sivulla
- `causalAtlasData.ts`:n `SPECIAL_RELATIONS` sisältää reunatyyppejä mutta EI evidenssiä

**Parannettu toteutus:**

```typescript
// Laajennettu CausalMapEdge
export interface CausalMapEdge {
  from: string;
  to: string;
  label?: string;
  epistemicLevel: EpistemicLevel;          // UUSI
  evidenceIds: readonly string[];           // UUSI: viitteet evidence-tietueisiin
  relationType: "causal" | "modulates" | "differential"; // siirretty SPECIAL_RELATIONS:sta
  mechanism?: string;                      // UUSI: lyhyt mekanismikuvaus
}
```

**Huomio:** ChainEdge (types.ts) ja CausalMapEdge (causalMapData.ts) ovat eri tyypit eri käyttötarkoituksiin. Harkitse yhtenäistämistä tai ainakin yhteisen pohjan luomista.

### 1.9 TypeScript-rajapinnat (osio 9) ⚠️ Osittain jo olemassa

Suunnitelma ehdottaa kolmea uutta interfacea. Tarkistus:

- **`Claim`:** Ei ole olemassa. ✅ Tarvitaan, mutta nimeksi `ThematicEssay` (koska sisältö on esseitä, ei atomaarisia väitteitä).
- **`Study`:** Osittain olemassa: `FieldStateEvidenceRecord` (32 kpl) + `LegacyEvidenceRecord` (129 kpl). Tarvitaan yhtenäistävä `UnifiedEvidenceRecord`.
- **`EvidenceGap`:** Ei ole olemassa. ✅ Tarvitaan.

**Parannettu interface-suunnitelma:**

```typescript
// --- Temaattiset esseet ---
export interface ThematicEssay {
  readonly id: string;
  readonly titleEn: string;
  readonly titleFi: string;
  readonly category: "narrative" | "mechanism" | "retrodiction" | "synthesis";
  readonly causalNodes: readonly string[];
  readonly causalEdges?: readonly string[];  // "from->to" muodossa
  readonly epistemicLevel: EpistemicLevel;
  readonly paragraphsEn: readonly string[];
  readonly paragraphsFi: readonly string[];
  readonly studies: readonly EssayStudyRef[];
  readonly visualizations?: readonly string[]; // komponenttien nimet
  readonly paradoxCards?: readonly ParadoxCard[];
}

export interface EssayStudyRef {
  readonly citation: string;
  readonly year: number;
  readonly noteEn: string;
  readonly noteFi: string;
  readonly evidenceId?: string; // linkki UnifiedEvidenceRecord:iin
}

// --- Yhtenäistetty evidenssitietue ---
export interface UnifiedEvidenceRecord {
  readonly id: string;
  readonly citation: string;
  readonly year: number;
  readonly url?: string;
  readonly studyType: EvidenceType;
  readonly system: string;
  readonly fieldClass?: string;
  readonly findingEn: string;
  readonly findingFi: string;
  readonly causalNodes: readonly string[];
  readonly causalEdges?: readonly string[];
  readonly causalPosition: CausalPosition;
  readonly calibrationRole: CalibrationRole;
  readonly epistemicLevel: EpistemicLevel;
  readonly limitations: readonly string[];
  readonly n?: number | null;
  readonly tags: readonly string[];
  readonly source: "bounded" | "legacy" | "essay_inline" | "external";
  readonly thematicEssayIds?: readonly string[];
}

// --- Evidenssiaukko ---
export interface EvidenceGap {
  readonly id: string;
  readonly titleEn: string;
  readonly titleFi: string;
  readonly causalEdge: string;  // "from->to"
  readonly currentLevel: EpistemicLevel;
  readonly targetLevel: EpistemicLevel;
  readonly requiredStudyType: EvidenceType;
  readonly descriptionEn: string;
  readonly descriptionFi: string;
  readonly falsificationCondition?: string;
}
```

### 1.10 Site-wide integration (osio 10) ✅ Hyvä

Suunnitelman ehdotukset:
- Kausaalikartan solmujen linkit evidence-sivuille: ✅ Jo osittain toteutettu (`detail.link`)
- Predictions-sivun crosslinkit: ✅ Tarvitaan
- Objections-sivun evidenssilinkit: ✅ Tarvitaan

**Lisäys:** `causalMapData.ts`:n `NodeDetail.link`-kentät viittaavat ankkureihin (`/evidence#section-id`). Kun evidence hajotetaan teemasivuiksi, KAIKKI nämä linkit on päivitettävä → `/evidence/themes/[id]`.

### 1.11 Visuaalinen suunta (osio 11) ✅ Hyvä

Suunnitelman ehdotukset episteemisistä värikoodeista, progress bareista jne. ovat hyviä. Lisäys:

- `causalAtlasData.ts` sisältää jo `MAP_EPISTEMIC_COLORS` ja `MAP_EPISTEMIC_LABELS` — käytä näitä yhtenäisesti koko sivustolla
- `STAGE_BANDS` värit (sources=sininen, modulation=violetti, mechanisms=sininen, tissue=keltainen, disease=punainen, demographic=pinkki, ecology=vihreä) tarjoavat luonnollisen ryhmittelyvärikartan

### 1.12 Toteutusvaiheet (osio 12) ⚠️ Uudelleenjärjestely tarvitaan

Suunnitelman 4 vaihetta ovat liian karkeita. Auditoinnin perusteella:

---

## 2. PARANNETTU TOTEUTUSSUUNNITELMA

### Vaihe 0: Data-purkaminen (ei näkyviä muutoksia käyttäjälle)

**Tavoite:** Puretaan kaikki data page.tsx:stä erillisiin tiedostoihin ILMAN sivun ulkoasun muuttamista.

| Tehtävä | Tiedostot | Rivit joita koskee |
|---------|-----------|-------------------|
| 0.1 Luo `lib/thematicEssays.ts` — 10 inline-esseen data | Uusi tiedosto | page.tsx 717–1794 |
| 0.2 Luo `lib/orphanedFindings.ts` — orpo data | Uusi tiedosto | page.tsx 1727–1794 |
| 0.3 Luo `lib/researchDomains.ts` — 10 tutkimusalueen data | Uusi tiedosto | page.tsx 1796–1839 |
| 0.4 Siirrä CHANNEL_GROUPS, PATHWAY_ORDER → `lib/evidence.ts` | evidence.ts | page.tsx 571–584 |
| 0.5 Pura ~60 inline-viitettä → `lib/essayReferences.ts` | Uusi tiedosto | Hajautettu |
| 0.6 Luo `UnifiedEvidenceRecord` interface + migraatiofunktio | lib/types.ts, lib/evidence.ts | — |

**Validointi:** Sivu renderöityy identtisesti ennen ja jälkeen. Visuaalinen regressiotesti.

### Vaihe 1: Rakenteellinen decomposition (navigaatiomuutokset)

| Tehtävä | Tiedostot |
|---------|-----------|
| 1.1 Luo evidence layout.tsx (nav-sidebar tai tab-nav) | `app/[locale]/evidence/layout.tsx` |
| 1.2 Luo overview-sivu (tiivistelmä + metriikat + teemakortit) | `app/[locale]/evidence/page.tsx` (korvaava) |
| 1.3 Luo teemasivu-template `themes/[id]/page.tsx` | Uusi reitti |
| 1.4 Luo catalogue-sivu (Study Explorer) | `app/[locale]/evidence/catalogue/page.tsx` |
| 1.5 Luo retrodictions-sivu | `app/[locale]/evidence/retrodictions/page.tsx` |
| 1.6 Luo classification-sivu | `app/[locale]/evidence/classification/page.tsx` |
| 1.7 Luo method-sivu | `app/[locale]/evidence/method/page.tsx` |
| 1.8 Päivitä `lib/navigation.ts` — lisää evidence children | navigation.ts |
| 1.9 Päivitä `causalMapData.ts` NodeDetail.link -kentät | causalMapData.ts |

**Navigaatiopäivitys:**
```typescript
{
  href: "/evidence",
  labelEn: "Evidence",
  labelFi: "Näyttö",
  icon: Layers,
  children: [
    { href: "/evidence", labelEn: "Overview", labelFi: "Yleiskatsaus", icon: Layers },
    { href: "/evidence/themes", labelEn: "Themes", labelFi: "Teemat", icon: BookOpen },
    { href: "/evidence/catalogue", labelEn: "Studies", labelFi: "Tutkimukset", icon: Database },
    { href: "/evidence/retrodictions", labelEn: "Retrodictions", labelFi: "Retrodiktiot", icon: Target },
    { href: "/evidence/classification", labelEn: "Classification", labelFi: "Luokittelu", icon: ShieldQuestion },
    { href: "/evidence/method", labelEn: "Method", labelFi: "Menetelmä", icon: Info },
  ],
}
```

### Vaihe 2: Datan yhtenäistäminen

| Tehtävä | Kuvaus |
|---------|--------|
| 2.1 Migroi legacy-tietueet UnifiedEvidenceRecord-muotoon | 129 tietuetta |
| 2.2 Migroi bounded-tietueet UnifiedEvidenceRecord-muotoon | 32 tietuetta |
| 2.3 Migroi inline-viitteet UnifiedEvidenceRecord-muotoon | ~60 tietuetta |
| 2.4 Luo crosslinkit: evidence ↔ teemaesseet ↔ kausaalisolmut | Kaikkien linkitys |
| 2.5 Laajenna CausalMapEdge: epistemicLevel + evidenceIds | causalMapData.ts |
| 2.6 Yhtenäistä episteemiset värit/labelit koko sivustolle | epistemicConstants.ts |

### Vaihe 3: Laadun parantaminen

| Tehtävä | Kuvaus |
|---------|--------|
| 3.1 ConfidenceMetrics UnifiedEvidenceRecord:iin | replicationStatus, effectSize, sampleSize, yearRange |
| 3.2 EvidenceGap-järjestelmä | Automaattinen aukkojen tunnistus kausaalikartasta |
| 3.3 Hakutoiminto Study Exploreriin | Full-text search + suodattimet |
| 3.4 Responsive-optimointi | Mobile-first teemasivut |
| 3.5 Performance: data splitting | Dynamic imports teemasivuille |

---

## 3. TEEMAKATEGORIAT — EHDOTUS

Nykyiset 23 esseetä (13 COPY + 10 inline) ryhmittyvät luontevasti seuraavasti:

### Mekanismiteemat (miten EMF vaikuttaa)
- `therapeutic-device-paradox` — Terapeuttisten laitteiden paradoksi (COPY #1)
- `cry-pulse-resonance` — CRY-pulssi-resonanssi (COPY #7)
- `ionic-hierarchy` — Ioninen hoitohierarkia (inline #1)
- `skin-battery` — Ihoakku (inline #2)
- `window-effect` — Orphaned findings / ikkunailmiö (inline #10, osa)

### Altistusteemat (mistä EMF tulee)
- `lighting` — Valaistustransitio (COPY #8)
- `electroecology` — Sähköekologia (COPY #9)
- `electrification-boundary` — Sähköistymiskynnys (COPY #10)
- `mobile-paradox` — Mobiialiparadoksi (COPY #11)
- `display` — Näyttölaitteet (COPY #12)
- `weather-radar` — Säätutkaosoitin (COPY #13)
- `led-confound` — LED-harha (inline #3)
- `hospital-emf` — Sairaala-EMF (inline #4)

### Sairaus-/kaskadtteemat (mitä EMF aiheuttaa)
- `covid` — COVID-kytkentä (COPY #2)
- `bbb-pathway` — Veri-aivoeste (inline #5)
- `alzheimer-calcium` — Alzheimer & kalsium (inline #6)
- `adhd-calibration` — ADHD-kalibraatio (inline #7)
- `ion-convergence` — Ionikanavakonvergenssi (inline #8)

### Hedelmällisyysteemat (yhteys TFR:ään)
- `oxytocin` — Oksitosiini (COPY #4)
- `melatonin-bridge` — Melatoniinisilta (inline #9)
- `qbs` — Nelinkertainen suppressio (COPY #3)
- `sleep-mechanism` — Uni välittävänä mekanismina (inline #10, osa)

### Palautuvuusteemat
- `recovery` — Palautuminen (COPY #5)
- `susceptibility` — Erotteleva herkkyys (COPY #6)

---

## 4. RISKIANALYYSI

### Korkea riski
- **Broken links:** `causalMapData.ts`:n `NodeDetail.link`-kentät viittaavat ankkureihin jotka siirtyvät. → Luo redirect-map vaiheessa 1.
- **SEO:** 219 KB sivu on mahdollisesti indeksoitu. → 301-redirectit vanhoista ankkureista uusiin reitteihin.
- **Sisällön katkeaminen:** 23 esseen hajottaminen voi katkaista narratiivisen virran. → Jokainen teemasivu sisältää "Seuraava teema" / "Edellinen teema" -navigaation.

### Keskitaso
- **Bilingvaalinen duplikaatio:** COPY-malli vaatii jokaisen tekstin kahdesti. → Ei muutosta nyt, mutta arkkitehtuuri mahdollistaa i18n-kirjaston myöhemmin.
- **Data-konsistenssi:** 5 datavarastoa → 1 yhtenäistetty. Migraatiovirheet mahdollisia. → Assertion-testit: `UnifiedEvidenceRecord`-count ≥ 32 + 129.

### Matala riski
- **Performance:** Dynaamiset reitit lisäävät sivulatauskertoja. → Static generation (`generateStaticParams`).

---

## 5. MIGRAATION KOKO ARVIO

| Vaihe | Arvioitu työmäärä | Uusia tiedostoja | Muutettuja tiedostoja |
|-------|-------------------|-------------------|----------------------|
| 0 | 6–8 tuntia | 4 (data-tiedostot) | 2 (evidence.ts, page.tsx) |
| 1 | 10–14 tuntia | 8 (sivut + layout) | 3 (navigation.ts, causalMapData.ts, page.tsx) |
| 2 | 8–12 tuntia | 1 (migraatioskripti) | 5 (data-tiedostot) |
| 3 | 6–10 tuntia | 2 (search, gaps) | 3 |

**Yhteensä:** 30–44 tuntia, 15 uutta tiedostoa, ~10 muutettua tiedostoa.

---

## 6. ENSIMMÄINEN KONKREETTINEN ASKEL (SUOSITUS)

Aloita **vaiheesta 0.1**: pura 10 inline-esseetä `lib/thematicEssays.ts`-tiedostoon. Tämä:
1. Vähentää page.tsx:ää ~1 078 riviä (53 % poistosta)
2. Ei muuta mitään visuaalista
3. Luo datatason joka mahdollistaa kaiken muun
4. On mekaanista työtä, ei suunnittelupäätöksiä

**Template jokaiselle esseelle:**
```typescript
export const THEMATIC_ESSAYS: ThematicEssay[] = [
  {
    id: "ionic-hierarchy",
    titleEn: "R4b-d: The Ionic Treatment Hierarchy",
    titleFi: "R4b-d: Ioninen hoitohierarkia",
    category: "mechanism",
    causalNodes: ["mech_ionic_hierarchy", "disease_depression"],
    epistemicLevel: "E",
    paragraphsEn: [
      "Retrodiction R4 states that depression responds better to electricity than chemistry...",
      // ...
    ],
    paragraphsFi: [
      "Retrodiktio R4 esittää, että masennus reagoi paremmin sähköön kuin kemiaan...",
      // ...
    ],
    studies: [
      { citation: "Cipriani et al. (Lancet)", year: 2018, noteEn: "21 antidepressants...", noteFi: "21 masennuslääkettä..." },
      // ...
    ],
    visualizations: ["IonicHierarchyDiagram"],
  },
  // ...
];
```

---

*Dokumentin versio: 2.0 | Auditoitu: 2026-08-24 | Koodikattavuus: page.tsx 100 %, evidence.ts 100 %, types.ts 100 %, navigation.ts 100 %, causalAtlasData.ts 100 %, causalMapData.ts osittainen, 4 komponenttia 100 %*
