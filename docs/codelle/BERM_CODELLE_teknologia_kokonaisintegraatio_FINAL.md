# Teknologia-kokonaisintegraatio — FINAL-ohje (Evidence-sivu)

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Tiedosto:** `website/app/[locale]/evidence/page.tsx`

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Evidence-sivu integroi kaikki BERM:n evidenssityypit yhteen rekisteriin. Teknologiaintegraatio kattaa sen, miten eri teknologiasukupolvien vaikutukset linkittyvät toisiinsa ja miten niiden evidenssi on luokiteltu BERM:n kuusiportaisella asteikolla.

---

## EVIDENCE-SIVUN PÄÄRAKENNE

### Komponentit (tuodut)
| Komponentti | Tarkoitus |
|-------------|-----------|
| PageHeader | Sivun otsikko ja alaotsikko |
| StatisticalValidation | Tilastollinen validointi |
| EvidenceClassification | Luokittelujärjestelmä |
| HindcastValidation | Hindcast K₈/K₁₀ validointi |
| ReferencesSummary | Viitteiden yhteenveto |
| RetrodictionCards | Retrodiktio-kortit |
| DiseaseCascadeTimeline | Sairaus-kaskadin aikajana |
| DifferentialSusceptibility | Differentiaalinen herkkyys |

### Datamoduulit
| Moduuli | Polku | Sisältö |
|---------|-------|---------|
| FIELDSTATE_EVIDENCE | @/lib/evidence | Kenttätila-evidenssi (päärekisteri) |
| LEGACY_EVIDENCE_CATALOGUE | @/lib/evidence | Vanha luettelo (yhteensopivuus) |
| PATHWAY_LABELS | @/lib/evidence | Polkujen nimilaput (A/B/C) |
| STATUS_LABELS | @/lib/evidence | Tilatunnisteet |
| EVIDENCE_LEVEL_LABELS | @/lib/evidence | Episteemiset tasot |
| causalNodeLabels | @/lib/evidence | Kausaalisolmujen nimet |
| CHANNEL_GROUPS | @/lib/channelGroups | Kanavakohtaiset ryhmitykset |
| PATHWAY_ORDER | @/lib/channelGroups | Polkujen järjestys |
| ORPHANED_FINDINGS | @/lib/orphanedFindings | Orvot löydökset (ei suoraa polkua) |
| RESEARCH_DOMAINS | @/lib/researchDomains | 11 tutkimusaluetta |

### Evidenssijärjestyksen 6 kategoriaa (ORDER-vakio)
1. **PHYSICS_SIGNATURE** — Fysiikan tason todisteet
2. **MECHANISTIC_INTERMEDIATE** — Mekanistiset välituotteet
3. **REPRODUCTIVE_ENDPOINT** — Lisääntymisen päätepisteet
4. **ECOLOGICAL_ENDPOINT** — Ekologiset päätepisteet
5. **SYSTEMATIC_REVIEW** — Systemaattiset katsaukset
6. **POPULATION_DESCRIPTIVE** — Populaatiotason kuvailevat

---

## KOLMEN KANAVAN EVIDENSSI

### Kanava 1: ELF (0–300 Hz)
- **Päälähteet:** Sähköverkko, valaistuksen magneettikenttä
- **Mekanismi:** VGCC suora aktivaatio (Pall 2013, 2015)
- **Avaintutkimukset:**
  - Lai & Singh DNA-vaurio 60 Hz
  - Arendash 2012 (hiiri, ELF-altistus → kognitio)
  - Sähköasentajien lisääntymisterveys (meta-analyysit)

### Kanava 2: IF (300 Hz – 10 MHz)
- **Päälähteet:** LED PWM-ohjaus, kytkentämuuntajat
- **Mekanismi:** Mitoottinen kara-häiriö, ferroptotic priming
- **Avaintutkimukset:**
  - Lighting Transition Timeline (EU ban 2009–2012)
  - Kaiser Permanente -sarja (Li ym.)
  - Japan IH Research Program
  - 50 kHz normaalisoludata

### Kanava 3: RF (10 MHz – 300 GHz)
- **Päälähteet:** Tukiasemat, WiFi, matkapuhelimet, tutka
- **Mekanismi:** CRY/RPM-magnetoreseptio → sirkadiaaninen häiriö
- **Avaintutkimukset:**
  - Ritz 2004 (lintujen magneettikompassi)
  - Engels 2014, Sherrard 2018 (CRY-häiriö)
  - Yap 2025 (CRY2-TRPC1-yhteys)
  - NTP/Ramazzini (krooninen eläinaltistus)

---

## ALASIVUT (Evidence-sivun laajennukset)

| Alasivu | Polku | Sisältö |
|---------|-------|---------|
| Populations | /evidence/populations | TFR-populaatiovertailut (Amish, Korea, jne.) |
| Technology | /evidence/technology | Teknologia-altistusanalyysi |
| Pharmacology | /evidence/pharmacology | Kalsiumsalpaaja-evidenssi |
| Evolution | /evidence/evolution | Pohjoinen paketti, χ-profiili |
| Spermatogenesis | /evidence (osio) | CatSper, siittiön Ca²⁺ |
| Kaiser Permanente | /evidence (osio) | Residential MF → keskenmenot |
| Japan IH | /evidence (osio) | Teollisuushygienia |

---

## DUAL-INTERPRETATION -TAULUKKO

Evidence-sivu sisältää osion "Reading evidence: Standard vs. BERM interpretation", joka vertailee perinteistä ja BERM:n tulkintaa jokaisen löydöksen kohdalla. Tämä on episteemisen johdonmukaisuuden tarkistus (Codelle-standardin osio 5.1).

---

## RISTIVIITTAUKSET

- **Model-sivu:** Kausaalipolut A/B/C, TCBM
- **Mathematics-sivu:** Poikkileikkauskaava, falsifikaatiotestit
- **Predictions-sivu:** Ennusteet, jotka perustuvat evidenssiin
- **Objections-sivu:** Vastaväitteet evidenssiväitteisiin
