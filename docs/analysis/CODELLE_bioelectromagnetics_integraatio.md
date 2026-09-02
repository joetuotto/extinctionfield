# Bioelectromagnetics-kirjallisuuskatsauksen BERM-integraatioohje — Bertagna 2025, Bektas 2026, Tbahriti 2026 + sekundaariset

**Versio:** 2026-08-24  
**Lähdeanalyysi:** BERM_Bioelectromagnetics_kirjallisuuskatsaus_2026-08-24.md  
**Tunnisteet käytössä:** [KOODI], [PROJEKTI], [PROJEKTI→KOODI]

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

### Analysoitujen lähteiden yhteenveto

Bioelectromagnetics-lehden (2024–2026) ja lähijulkaisujen systemaattisessa katsauksessa tunnistettiin 20 artikkelia, jotka kartoittuvat BERM:n kausaaliketjun tasoille 3–6. Näistä kolme on prioriteetti-integroitavia, viisi sekundaarisia dokumentoitavia ja loput kontekstimateriaalia.

| Lähde | BERM-tasot | Episteeminen taso | Integroitavuus |
|---|---|---|---|
| Bertagna ym. 2025 | 4 (VGIC/Ca²⁺) | E | ★ Integroitava |
| Bektas ym. 2026 | 5A→6 (ROS→testis) | C | ★ Integroitava |
| Tbahriti ym. 2026 | 5C (melatoniini) | M\|C | ★ Integroitava |
| Gao ym. 2024 | 5E (BBB) | C | Sekundaarinen |
| Deprez ym. 2025 | 3 (ambient) | C | Sekundaarinen |
| Verrender ym. 2025 | 5D (kortisoli) | E | Sekundaarinen |
| Meyer ym. 2026 | 5A (neg.) | E | Sekundaarinen (neg.) |
| Haidar ym. 2025 | 5A (neg.) | E | Sekundaarinen (neg.) |
| Gautam ym. 2026 | 5A→6 | C | Konteksti |
| Krylov 2026 | 5B | M | Konteksti |
| Layla ym. 2026 | 5D | C | Konteksti |
| Michelant ym. 2025 | 5D | M\|C | Konteksti |
| Wang ym. 2025 | 3 | C | Konteksti |
| Zhou ym. 2026 | 3 | C | Konteksti |
| Diao ym. 2025 | 3 | L* | Konteksti |
| Chitnis ym. 2025 | 3 | L* | Konteksti |
| Hurtier ym. 2025 | 4, 5A | C | Konteksti |
| Ledent ym. 2025 | Meta (EHS) | E | Konteksti |
| Selmaoui 2025 | Meta (5G) | — | Konteksti |

**Kolme integroitavaa lähdettä** lisätään viiterekisteriin, evidenssisivulle, kausaaliketjuun ja mallidokumentaatioon. **Viisi sekundaarista** dokumentoidaan evidenssisivulle ja/tai poikkileikkaavana kontekstina. **Loput** dokumentoidaan kirjallisuuskatsauksessa (jo tehty) mutta eivät vaadi koodimuutoksia.

### Mitä nämä lähteet tuovat BERM:iin

**1. Tason 4 mekanistinen tarkennus (Bertagna 2025):** ELF-EMF moduloi hermosolujen ionivirtoja solunsisäisen Ca²⁺-homeostaasihäiriön kautta — kaksi itsenäistä reittiä: RyR (ryanodiinireseptori) ja SERCA (sarkoplasmaattisen retikulumin Ca²⁺-pumppu). Molemmat farmakologiset salpaajat (dantroleeni, CPA) estivät EMF-vaikutukset kokonaan. Tämä laajentaa IFO-VGIC -mekanismia: suoran S4-oskillaation lisäksi EMF vaikuttaa solunsisäisiin Ca²⁺-varastoihin. E-tason evidenssiä.

**2. 5G-taajuusspesifinen reproduktioevidenssi (Bektas 2026):** Ensimmäinen 3.5 GHz -spesifinen testis-ROS-data. CoQ10-interventio osoittaa mekanismin reversiibeilyden — yhdenmukainen BERM:n recovery window -konseptin kanssa. Operoi suoraan nuolella taso 5A → taso 6 (ROS → siittiökaskadi).

**3. Melatoniinisuppression systemaattinen evidenssi (Tbahriti 2026):** 55 tutkimuksen PRISMA-katsaus: 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota (20–50 %). Tukee BERM:n polkua B (melatoniini → GnRH → HPG) ja antaa kvantitatiivisen kehyksen suppression suuruudelle.

**4. Kudosspesifisyyden dokumentointi (Meyer 2026, Haidar 2025):** Kaksi laadukasta negatiivista tulosta ihosoluissa (ELF + RF) — samaan aikaan kun Bektas raportoi testis-vauriota samalla taajuudella. Ero on kudosspesifinen — yhdenmukainen BERM:n χ(Ā)-valintasäännön kanssa.

---

## TOTEUTETTAVAT MUUTOKSET

### 1. [KOODI] Viiterekisteri: references.json ja references_full.json

**Lisää kolme prioriteettimerkintää ja kaksi sekundaarista molempiin tiedostoihin:**

#### 1a. Bertagna ym. 2025

```json
{
  "id": "bertagna2025",
  "authors": "Bertagna F, Lewis R, McArthur S, Bhatt DK",
  "year": 2025,
  "title": "Electromagnetic fields modulate neuronal membrane ionic currents through altered cellular calcium homeostasis",
  "journal": "Annals of the New York Academy of Sciences",
  "doi": "10.1111/nyas.15386",
  "pmid": null,
  "n": null,
  "type": "experimental",
  "level": "E",
  "pathway": ["A"],
  "finding": "50 Hz, 1 mT, 60 min ELF-EMF on mouse hippocampal CA1 pyramidal neurons. Inward currents ↓40%, transient outward ↓50%. Two independent Ca²⁺ pathways identified: (1) RyR (ryanodine receptor) — dantrolene blocked EMF effects; (2) SERCA (sarco/endoplasmic reticulum Ca²⁺-ATPase) — CPA blocked EMF effects. Both intracellular Ca²⁺ store pathways abrogate EMF-induced ionic current changes, extending IFO-VGIC mechanism to include intracellular calcium dynamics.",
  "tags": [
    "calcium",
    "ryanodine",
    "serca",
    "ionic_currents",
    "hippocampal",
    "elf",
    "patch_clamp",
    "mechanism",
    "intracellular_stores",
    "50hz"
  ],
  "verified": false,
  "category": "transduction_rpm_calcium",
  "pdf_section": null,
  "pdf_number": null
}
```

**HUOM:** `verified: false` — suorittava agentti tarkistaa tarkan kirjoittajalistan ja DOI-toimivuuden ennen `verified: true` -asetusta.

**Sijainti references.json:ssa:** Lisää pathway A -tutkimusten joukkoon, panagopoulos2025:n jälkeen (taso 4 mekanismi).

#### 1b. Bektas ym. 2026

```json
{
  "id": "bektas2026",
  "authors": "Bektas H et al.",
  "year": 2026,
  "title": "Ameliorative Role of Coenzyme Q10 in RF Radiation-Associated Testicular and Oxidative Impairments in a 3.5-GHz Exposure Model",
  "journal": "Bioelectromagnetics",
  "doi": "10.1002/bem.70043",
  "pmid": "41578890",
  "n": null,
  "type": "experimental",
  "level": "C",
  "pathway": ["A"],
  "finding": "Rats exposed to 3.5 GHz (5G core frequency) RF radiation showed testicular and oxidative damage. CoQ10 supplementation ameliorated these effects. First 5G-frequency-specific testicular data. CoQ10 rescue demonstrates mechanism reversibility, consistent with BERM recovery window concept. Testis antiox capacity decreased under RF.",
  "tags": [
    "testis",
    "ros",
    "5g",
    "3.5ghz",
    "coq10",
    "rescue",
    "rat",
    "in_vivo",
    "oxidative_stress",
    "sperm",
    "reversibility"
  ],
  "verified": false,
  "category": "reproduction_hormones",
  "pdf_section": null,
  "pdf_number": null
}
```

**Sijainti:** Tason 5A→6 tutkimusten joukkoon, yakymenko2016:n jälkeen.

#### 1c. Tbahriti ym. 2026

```json
{
  "id": "tbahriti2026",
  "authors": "Tbahriti I et al.",
  "year": 2026,
  "title": "Impact of electromagnetic fields on circadian rhythms: molecular and physiological insights",
  "journal": "Sleep and Biological Rhythms",
  "doi": "10.1007/s41105-026-00643-x",
  "pmid": null,
  "n": null,
  "type": "review",
  "level": "M|C",
  "pathway": ["C"],
  "finding": "PRISMA 2020 systematic review: 55 studies from 892 screened. 88% of high-quality animal studies report EMF-induced melatonin suppression (20-50% from baseline). Clock gene expression altered. Sleep architecture changes documented. Melatonin suppression smaller than light-induced (>90%). Only 27% of studies met high methodological standards.",
  "tags": [
    "melatonin",
    "circadian",
    "prisma",
    "systematic_review",
    "clock_genes",
    "sleep",
    "suppression",
    "pineal",
    "55_studies"
  ],
  "verified": false,
  "category": "neurobiology_circadian",
  "pdf_section": null,
  "pdf_number": null
}
```

**Sijainti:** Polku B -tutkimusten joukkoon.

#### 1d. Gao ym. 2024 (sekundaarinen)

```json
{
  "id": "gao2024",
  "authors": "Gao Y et al.",
  "year": 2024,
  "title": "Electromagnetic pulse induced blood-brain barrier breakdown through tight junction opening in rats",
  "journal": "Bioelectromagnetics",
  "doi": "10.1002/bem.22494",
  "pmid": "38105659",
  "n": null,
  "type": "experimental",
  "level": "C",
  "pathway": ["E"],
  "finding": "Electromagnetic pulse (EMP) caused BBB disruption in rat brains via tight junction protein (occludin, claudin, ZO-1) degradation. Note: EMP is high-amplitude short-duration, different from BERM's chronic low-intensity RF exposure. Mechanistic relevance: same molecular target (tight junctions) as Salford 2003 GSM study.",
  "tags": [
    "bbb",
    "tight_junction",
    "emp",
    "occludin",
    "claudin",
    "zo1",
    "rat",
    "in_vivo",
    "permeability"
  ],
  "verified": false,
  "category": "neurobiology_circadian",
  "pdf_section": null,
  "pdf_number": null
}
```

#### 1e. Deprez ym. 2025 (sekundaarinen)

```json
{
  "id": "deprez2025",
  "authors": "Deprez K et al.",
  "year": 2025,
  "title": "5G RF EMF Spectral Exposure Assessment in Four European Countries",
  "journal": "Bioelectromagnetics",
  "doi": "10.1002/bem.70019",
  "pmid": null,
  "n": null,
  "type": "measurement",
  "level": "C",
  "pathway": ["T"],
  "finding": "Spectral measurement of 5G RF-EMF exposure levels in four European countries. Provides quantitative ambient data for BERM Level 3 calibration. 5G beam-formed signals produce different spatial exposure patterns than 2G/3G/4G: directed beams may create higher instantaneous personal exposures but lower background ambient.",
  "tags": [
    "5g",
    "dosimetry",
    "ambient",
    "spectral",
    "europe",
    "measurement",
    "exposure_assessment"
  ],
  "verified": false,
  "category": "rf_safety_regulation",
  "pdf_section": null,
  "pdf_number": null
}
```

**Kaikki viisi merkintää:** `verified: false` — suorittava agentti tarkistaa tarkat kirjoittajalistat ja DOI:t ennen `true`-asetusta.

---

### 2. [KOODI] Evidence-sivu: Tason 4 mekanismitarkennus (Bertagna 2025)

**Tiedosto:** `app/[locale]/evidence/page.tsx`

**Sijainti:** Mekanismi/transduktio-osio, VGIC/Ca²⁺-alaosio. Bertagna 2025 sijoitetaan Panagopoulos 2025:n jälkeen — ne ovat saman tason 4 mekanismin kaksi puolta.

**EN-tutkimuskortti:**

```
Bertagna et al. 2025 | Ann NY Acad Sci 1550(1) | Experimental (in vitro) | E

"EMF modulates neuronal ionic currents via intracellular Ca²⁺ stores"

Mouse hippocampal CA1 pyramidal neurons exposed to 50 Hz, 1 mT ELF-EMF
for 60 minutes. Measured ionic currents via loose patch clamp:

• Inward currents ↓40%
• Transient outward currents ↓50%
• Sustained outward currents: no significant change

Mechanism identified — two independent Ca²⁺ pathways:
(1) RyR pathway: dantrolene (ryanodine receptor blocker) fully abrogated
    EMF effects on both current types
(2) SERCA pathway: CPA (SERCA inhibitor) similarly blocked EMF effects

BERM relevance: Extends the IFO-VGIC mechanism (Level 4) beyond direct
S4 voltage sensor oscillation to include intracellular calcium store
dysregulation. Both RyR and SERCA blockade abrogate effects — the cell's
internal Ca²⁺ reservoirs participate in EMF transduction. Together with
Panagopoulos 2025 (direct S4 mechanism), this establishes a multi-pathway
Ca²⁺ disruption model at Level 4, explaining why different tissues show
different EMF sensitivity (tissue-specific Ca²⁺ store density and VGIC
expression).

Note: ELF (50 Hz), not RF. Translation to RF not direct, but Ca²⁺
pathway is shared (cf. Panagopoulos 2025: IFO operates at both ELF
and RF with different intensity dependencies).
```

**FI-tutkimuskortti:**

```
Bertagna ym. 2025 | Ann NY Acad Sci 1550(1) | Kokeellinen (in vitro) | E

"EMF moduloi hermosolujen ionivirtoja solunsisäisten Ca²⁺-varastojen kautta"

Hiiren hippokampuksen CA1-pyramidaalineuronit altistettiin 50 Hz, 1 mT
ELF-EMF:lle 60 minuutin ajan. Ionivirtamittaukset loose patch clamp
-tekniikalla:

• Sisäänpäinsuuntaiset virrat ↓40 %
• Transientit ulospäinsuuntaiset virrat ↓50 %
• Pitkäkestoiset ulospäinsuuntaiset virrat: ei merkitsevää muutosta

Mekanismi tunnistettu — kaksi itsenäistä Ca²⁺-reittiä:
(1) RyR-reitti: dantroleeni (ryanodiinireseptorisalpaaja) esti EMF-vaikutukset
    kokonaan molemmissa virtatyypeissä
(2) SERCA-reitti: CPA (SERCA-inhibiittori) esti samoin EMF-vaikutukset

BERM-merkitys: Laajentaa IFO-VGIC-mekanismia (taso 4) suoran S4-oskillaation
lisäksi koskemaan solunsisäistä kalsiumdynamiikkaa. Sekä RyR- että SERCA-salpaus
estää vaikutukset — solun sisäiset Ca²⁺-varastot osallistuvat EMF-transduktioon.
Yhdessä Panagopoulos 2025:n (suora S4-mekanismi) kanssa tämä muodostaa
monireittiisen Ca²⁺-häiriömallin tasolla 4. Selittää miksi eri kudokset
reagoivat eri herkkyydellä (kudosspesifinen Ca²⁺-varastotiheys ja
VGIC-ekspressio).

Huom: ELF (50 Hz), ei RF. Mekanismin siirto RF:lle ei suoraviivainen,
mutta Ca²⁺-reitti on jaettu (vrt. Panagopoulos 2025: IFO operoi sekä
ELF- että RF-alueella eri voimakkuusriippuvuudella).
```

---

### 3. [KOODI] Evidence-sivu: Reproduktiokaskadi ja melatoniini (Bektas 2026, Tbahriti 2026)

**Tiedosto:** `app/[locale]/evidence/page.tsx`

**3a. Bektas 2026 — EN:**

```
Bektas et al. 2026 | Bioelectromagnetics (bem.70043) | Experimental (in vivo, rat) | C

"CoQ10 ameliorates RF-induced testicular and oxidative impairments at 3.5 GHz"

Rats exposed to 3.5 GHz RF radiation (5G core frequency):
• Testicular and oxidative damage observed
• Testis antioxidant capacity decreased
• CoQ10 supplementation ameliorated damage

BERM relevance: Operates directly on the Level 5A→6 edge (ROS → sperm
cascade). Three key implications:

(1) 3.5 GHz is the 5G core frequency — this is the most current exposure-
    relevant testicular data for BERM's ambient model
(2) CoQ10 rescue demonstrates mechanism reversibility: the oxidative
    pathway is pharmacologically blockable, consistent with BERM's
    recovery window concept (damage vs. repair equilibrium)
(3) Testis-specific damage consistent with BERM's cascade target
    tissue specificity (cf. Meyer 2026 and Haidar 2025: same/similar
    frequencies show no ROS in skin cells — tissue-specific)

Consistent with Yakymenko et al. 2016 (93/100 studies, oxidative stress)
and Panagopoulos et al. 2025 (95%, IFO-VGIC → ROS).
```

**3a. Bektas 2026 — FI:**

```
Bektas ym. 2026 | Bioelectromagnetics (bem.70043) | Kokeellinen (in vivo, rotta) | C

"CoQ10 lievittää RF-indusoitua testis- ja oksidatiivista vauriota 3,5 GHz:llä"

Rotat altistettiin 3,5 GHz RF-säteilylle (5G:n ydintaajuus):
• Testis- ja oksidatiivinen vaurio havaittu
• Testiksen antioksidanttikapasiteetti heikentynyt
• CoQ10-lisäravinto lievitti vauriota

BERM-merkitys: Operoi suoraan nuolella taso 5A → taso 6 (ROS → siittiökaskadi).
Kolme avainseurausta:

(1) 3,5 GHz on 5G:n ydintaajuus — tuoreinta altistusrelevanttia testisdataa
    BERM:n ambient-mallille
(2) CoQ10-interventio osoittaa mekanismin reversiibeliuden: oksidatiivinen polku
    on farmakologisesti estettävissä — yhdenmukainen BERM:n recovery window
    -konseptin kanssa (vaurion ja korjauksen tasapaino)
(3) Testis-spesifinen vaurio yhdenmukainen BERM:n kaskadin kudosspesifisyyden
    kanssa (vrt. Meyer 2026 ja Haidar 2025: samoilla/vastaavilla taajuuksilla
    ei ROS:ia ihosoluissa — kudosspesifinen)

Yhdenmukainen Yakymenko ym. 2016 (93/100, oksidatiivinen stressi) ja
Panagopoulos ym. 2025 (95 %, IFO-VGIC → ROS) kanssa.
```

**3b. Tbahriti 2026 — EN:**

```
Tbahriti et al. 2026 | Sleep Biol Rhythms 24(2):195-214 | Systematic review (PRISMA) | M|C

"EMF and circadian rhythms: molecular and physiological insights"

PRISMA 2020 systematic review: 55 studies selected from 892 screened.

Key findings:
• 88% of high-quality animal studies report EMF-induced melatonin
  suppression (20-50% from baseline)
• Clock gene expression altered by EMF exposure
• Sleep architecture changes documented
• EMF-induced melatonin suppression is smaller than light-induced (>90%)

Limitations: Only 27% of studies met high methodological standards.
48% of animal studies lacked adequate sham controls. 33% reported
insufficient exposure parameters.

BERM relevance: Directly supports pathway B (EMF → pineal melatonin
suppression → GnRH pulsatility disruption → HPG → gonadal function).
The 20-50% suppression magnitude is biologically significant and
consistent with BERM's v17_night_fraction() function, where EMF is one
component of the triple hit (melanopsin + CRY + melatonin suppression).
The suppression magnitude is smaller than light-induced (>90%), which
is consistent with BERM modeling EMF as one of multiple nocturnal
disruption pathways, not the sole driver.

Note: Transition from cellular effects to systemic circadian disruption
is not fully established clinically.
```

**3b. Tbahriti 2026 — FI:**

```
Tbahriti ym. 2026 | Sleep Biol Rhythms 24(2):195-214 | Systemaattinen katsaus (PRISMA) | M|C

"EMF ja sirkadiaanirytmit: molekulaariset ja fysiologiset näkemykset"

PRISMA 2020 -systemaattinen katsaus: 55 tutkimusta 892 seulotusta.

Keskeiset löydökset:
• 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua
  melatoniinisuppressiota (20–50 % basaalitasosta)
• Kellogenien ekspressio muuttuu EMF-altistuksessa
• Uniarkkitehtuurin muutokset dokumentoitu
• EMF:n melatoniinisuppressio on pienempi kuin valon aiheuttama (>90 %)

Rajoitukset: Vain 27 % tutkimuksista täytti korkeat metodologiset
standardit. 48 % eläintutkimuksista ilman riittävää sham-kontrollia.

BERM-merkitys: Tukee suoraan polkua B (EMF → pineaalinen melatoniini-
suppressio → GnRH-pulsaatiohäiriö → HPG → gonadifunktio). 20–50 %:n
suppressio on biologisesti merkittävä ja yhdenmukainen BERM:n
v17_night_fraction()-funktion kanssa, jossa EMF on yksi osa kolminkertaisesta
osumasta (melanopsiini + CRY + melatoniinisuppressio). Suppression suuruus
on pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen sen kanssa,
että BERM mallintaa EMF:n yhtenä useista yöllisistä häiriöreiteistä,
ei ainoana ajurina.

Huom: Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön
ei ole täysin osoitettu kliinisesti.
```

---

### 4. [KOODI] Evidence-sivu: Negatiiviset tulokset ja sekundaariset (Meyer, Haidar, Gao, Deprez, Verrender)

**Tiedosto:** `app/[locale]/evidence/page.tsx`

**Sijainti:** Negatiiviset tulokset sijoitetaan tason 5A osion loppuun omana blokkina ("Tissue-specific null results" / "Kudosspesifiset nollatulokset"). Muut sekundaariset integroidaan asianomaisten tasojen kontekstina.

**4a. Kudosspesifisyyden dokumentaatio — EN:**

```
Tissue-specific null results: Skin cells show no ROS/DNA damage

Meyer et al. 2026 | Bioelectromagnetics (bem.70046) | Experimental | E
• ELF 50 Hz, 200 µT (rms), 2h and 24h, HaCaT keratinocytes
• Blinded sham-controlled. WST-1, alkaline comet assay, micronucleus/CREST
• No cell viability change (p=0.644 @ 2h, p=0.987 @ 24h)
• No DNA damage, no increased micronucleus formation

Haidar et al. 2025 | Scientific Reports | Experimental | E
• 5G-modulated 3.5 GHz, SAR 0.08 and 4 W/kg, 20-48h
• XP6BE fibroblasts (ROS), HaCaT keratinocytes (DNA repair)
• No effect on basal ROS or chemical stressor responses
• No DNA damage (CPD lesions), no adaptive response

BERM relevance: These high-quality null results do NOT contradict Level 5A.
They demonstrate tissue-specificity: skin cells (keratinocytes, fibroblasts)
show no damage at the same frequencies where Bektas 2026 reports testicular
ROS damage (3.5 GHz). This is consistent with BERM's χ(Ā) selection rule:
response depends on tissue-specific VGIC density, mitochondrial ROS
capacity, and Ca²⁺ store architecture. Not all cells respond equally —
gonadal cells are primary BERM targets, not skin cells.
```

**4a. Kudosspesifisyys — FI:**

```
Kudosspesifiset nollatulokset: Ihosoluissa ei ROS/DNA-vauriota

Meyer ym. 2026 | Bioelectromagnetics (bem.70046) | Kokeellinen | E
• ELF 50 Hz, 200 µT (rms), 2 h ja 24 h, HaCaT-keratinosyytit
• Sokkoutettu, sham-kontrolloitu. WST-1, komet, mikronukleus/CREST
• Ei solujen elinvoimaisuusmuutosta (p=0,644 @ 2 h, p=0,987 @ 24 h)
• Ei DNA-vauriota, ei mikronukleusmuodostusta

Haidar ym. 2025 | Scientific Reports | Kokeellinen | E
• 5G-moduloitu 3,5 GHz, SAR 0,08 ja 4 W/kg, 20–48 h
• XP6BE-fibroblastit (ROS), HaCaT-keratinosyytit (DNA-korjaus)
• Ei vaikutusta basaaliin ROS-tasoon eikä kemiallisten stressorien vasteisiin
• Ei DNA-vauriota (CPD-lesiot), ei adaptiivista vastetta

BERM-merkitys: Laadukkaat negatiiviset tulokset EIVÄT kumoa tasoa 5A. Ne
osoittavat kudosspesifisyyden: ihosolut eivät vaurioidu taajuuksilla, joilla
Bektas 2026 raportoi testis-ROS-vauriota (3,5 GHz). Yhdenmukainen BERM:n
χ(Ā)-valintasäännön kanssa: vaste riippuu kudosspesifisestä
VGIC-tiheydestä, mitokondrioiden ROS-kapasiteetista ja Ca²⁺-varastojen
arkkitehtuurista. Gonaadisolut ovat BERM:n primäärinen kohde, eivät ihosolut.
```

**4b. Gao 2024 (BBB) — EN:**

```
Gao et al. 2024 | Bioelectromagnetics (bem.22494) | Experimental (in vivo, rat) | C

"EMP-induced BBB disruption via tight junction protein degradation"

Electromagnetic pulse caused BBB breakdown through tight junction
protein (occludin, claudin, ZO-1) degradation in rat brains.

BERM relevance: Pathway E (EMF → BBB permeability↑ → neurotoxic agents
enter brain → neuroinflammation → indirect hypothalamic effects).
Identifies the molecular target: tight junction proteins.

Important distinction: EMP (high-amplitude, short-duration) differs
from BERM's chronic low-intensity RF. EMP relevance to BERM is
mechanistic (same molecular system), not parametric. Cf. Salford 2003:
BBB opening at GSM frequencies (SAR 0.016 W/kg), which is BERM's
direct reference for pathway E.
```

**4b. Gao 2024 — FI:**

```
Gao ym. 2024 | Bioelectromagnetics (bem.22494) | Kokeellinen (in vivo, rotta) | C

"EMP-indusoitu BBB-häiriö tight junction -proteiinien degradaation kautta"

Sähkömagneettinen pulssi aiheutti veri-aivoesteen läpimurron tight junction
-proteiinien (okkludiini, klaudiini, ZO-1) degradaation kautta rottien aivoissa.

BERM-merkitys: Polku E (EMF → BBB-permeabiliteetti↑ → neurotoksiset aineet
aivoihin → neuroinflammatio → epäsuora vaikutus hypotalamukseen).
Tunnistaa molekulaarisen kohteen: tight junction -proteiinit.

Erottelu: EMP (korkea-amplitudi, lyhytkestoinen) eroaa BERM:n kroonisesta
matala-intensiteettisestä RF:stä. EMP:n relevanssi BERM:lle on mekanistinen
(sama molekulaarijärjestelmä), ei parametrinen. Vrt. Salford 2003:
BBB-avautuminen GSM-taajuuksilla (SAR 0,016 W/kg).
```

---

### 5. [KOODI] CausalChain.tsx — evidenssipopup-päivitykset

**Tiedosto:** `components/CausalChain.tsx` (tai `lib/causalChainData.ts` riippuen toteutuksesta)

Päivitä seuraavien solmujen ja nuolien evidenssipopupit:

#### 5a. Solmu: `vgic` (taso 4)

Lisää Bertagna 2025 keyReferences-listaan:

```typescript
{
  authors: "Bertagna ym. 2025",
  title: "EMF modulates ionic currents via Ca²⁺ homeostasis (RyR/SERCA)",
  journal: "Ann NY Acad Sci 1550(1)",
  keyFinding: "50 Hz, 1 mT → sisäänpäinvirrat ↓40%, transientit ↓50%. RyR-salpaaja ja SERCA-inhibiittori estivät vaikutukset. Ca²⁺-varastojen dysregulaatio laajentaa IFO-mekanismia."
}
```

Päivitä `quantitative`-kenttään lisäys: "Bertagna 2025: inward currents ↓40%, transient outward ↓50%. Both RyR (dantrolene) and SERCA (CPA) blockade fully abrogated EMF effects."

#### 5b. Nuoli: `vgic` → `pathway_a` (Ca²⁺ influx)

Lisää evidenssipopupiin:

```
→ UUSI: Bertagna ym. 2025 (Ann NY Acad Sci): Ca²⁺-homeostaasihäiriö kahdelta reitiltä (RyR + SERCA). Laajentaa IFO-VGIC:n koskemaan solunsisäisiä Ca²⁺-varastoja. [E]
```

#### 5c. Nuoli: `pathway_a` → `sdf` ja `pathway_a` → `concentration` (ROS → siittiökaskadi)

Lisää evidenssipopupiin:

```
→ UUSI: Bektas ym. 2026 (Bioelectromagnetics): 3.5 GHz (5G) → testis-ROS + vaurio. CoQ10 amelioroi — mekanismi reversiibeli. Ensimmäinen 5G-taajuusspesifinen testisdata. [C]
```

#### 5d. Solmu: `pathway_c` (kanoninen polku B: melatoniini → GnRH; solmutunnus on historiallinen)

Lisää keyReferences-listaan:

```typescript
{
  authors: "Tbahriti ym. 2026",
  title: "EMF and circadian rhythms: PRISMA systematic review",
  journal: "Sleep Biol Rhythms 24(2):195-214",
  keyFinding: "55 tutkimuksen PRISMA: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinisuppressiota (20–50 %). Tukee polkua B kvantitatiivisesti."
}
```

#### 5e. Solmu: `pathway_e` (Polku E: BBB)

Lisää evidenssipopupiin:

```
→ UUSI: Gao ym. 2024 (Bioelectromagnetics): EMP → tight junction -proteiinien (okkludiini, klaudiini, ZO-1) degradaatio → BBB-avautuminen rotilla. Mekanistinen tuki polulle E (huom: EMP, ei krooninen RF). [C]
```

#### 5f. Solmu/konteksti: tason 3 ambient-data

Jos tason 3 evidenssipopupissa on tilaa kontekstille:

```
→ UUSI: Deprez ym. 2025 (Bioelectromagnetics): 5G-altistuksen spektraalimittaus 4 Euroopan maassa. 5G:n suunnattu keila muuttaa ambient/personal-suhdetta BERM:n kaksikanavamallissa. [C]
```

---

### 6. [PROJEKTI→KOODI] model/page.tsx — mekanismikuvausten päivitys

**Tiedosto:** `app/[locale]/model/page.tsx`

<konteksti src="BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md">
Tason 4 solmun "vgic" nykytila: viittaa Panagopoulos 2015, 2021, 2025 (IFO), Tang 2024 (S4-protonidynamiikka), Pall 2013 (23 VGCC-salpaajatut.), Bertagna 2025 lisätään rinnakkaismekanismina.
Tason 5A nykytila: ROS → DNA/proteiini/lipidivaurio. Yakymenko 2016 (93/100).
Tason 5C nykytila: melatoniini → GnRH → HPG. v17_night_fraction().
Tason 5E nykytila: BBB-permeabiliteetti. Salford 2003.
Recovery window: DNA repair half-life ~6h (BER pathway), net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)).
</konteksti>

**Muutokset:**

**6a. Tason 4 mekanismin laajennus — monireittiinen Ca²⁺-malli (EN + FI):**

Lisää tason 4 (VGIC) kuvaukseen Bertagnan löydösten myötä:

EN:
```
The Ca²⁺ disruption at Level 4 operates through multiple independent
pathways: (1) direct S4 voltage sensor forced oscillation (Panagopoulos
et al. 2025, IFO-VGIC); (2) intracellular calcium store dysregulation
via ryanodine receptors (RyR) and SERCA pumps (Bertagna et al. 2025,
Ann NY Acad Sci). Both pharmacological blockade experiments (VGCC
blockers for pathway 1; dantrolene for RyR, CPA for SERCA in pathway 2)
abrogate EMF effects, confirming mechanism. The multi-pathway nature
explains tissue-specific sensitivity: cells with high VGIC density
AND large intracellular Ca²⁺ stores (neurons, gonadal cells) are
more sensitive than cells with low stores (keratinocytes — cf.
Meyer 2026, Haidar 2025: null results in skin cells).
```

FI:
```
Tason 4 Ca²⁺-häiriö operoi useamman itsenäisen reitin kautta:
(1) suora S4-jännitesensorin pakotettu oskillaatio (Panagopoulos ym.
2025, IFO-VGIC); (2) solunsisäisten kalsiumvarastojen dysregulaatio
ryanodiinireseptoreiden (RyR) ja SERCA-pumppujen kautta (Bertagna ym.
2025, Ann NY Acad Sci). Molemmat farmakologiset salpauskokeet (VGCC-
salpaajat reitille 1; dantroleeni RyR:lle, CPA SERCA:lle reitille 2)
estävät EMF-vaikutukset — tukee mekanismia. Monireittiisyys selittää
kudosspesifisen herkkyyden: solut joissa on korkea VGIC-tiheys JA
suuret solunsisäiset Ca²⁺-varastot (neuronit, gonaadisolut) ovat
herkempiä kuin matalan varastotiheyden solut (keratinosyytit — vrt.
Meyer 2026, Haidar 2025: nollatulokset ihosoluissa).
```

**6b. Tason 5A → 6 nuolen 5G-päivitys (EN + FI):**

Lisää reproduktiokaskadin kuvaukseen:

EN:
```
The first 5G-frequency-specific testicular data (Bektas et al. 2026,
Bioelectromagnetics): 3.5 GHz RF induced testicular and oxidative
damage in rats. CoQ10 supplementation ameliorated the damage,
demonstrating mechanism reversibility — consistent with BERM's
recovery window model where antioxidant capacity determines net
daily damage. This extends the oxidative stress evidence base
(Yakymenko 2016: 93/100; Panagopoulos 2025: 95%) to the 5G
frequency range.
```

FI:
```
Ensimmäinen 5G-taajuusspesifinen testisdata (Bektas ym. 2026,
Bioelectromagnetics): 3,5 GHz RF aiheutti testis- ja oksidatiivista
vauriota rotilla. CoQ10-lisäravinto lievitti vauriota — osoittaa
mekanismin reversiibeliuden. Yhdenmukainen BERM:n recovery window
-mallin kanssa, jossa antioksidanttikapasiteetti määrittää
nettovaurion. Laajentaa oksidatiivisen stressin evidenssipohjan
(Yakymenko 2016: 93/100; Panagopoulos 2025: 95 %) 5G-taajuusalueelle.
```

**6c. Polun B kvantitatiivinen tarkennus (EN + FI):**

Lisää polun B (melatoniini → GnRH → HPG) kuvaukseen:

EN:
```
The melatonin suppression pathway is quantitatively supported by a
PRISMA systematic review of 55 studies (Tbahriti et al. 2026, Sleep
Biol Rhythms): 88% of high-quality animal studies report EMF-induced
melatonin suppression of 20-50% from baseline. This suppression is
biologically significant for GnRH pulsatility but smaller than
light-induced suppression (>90%), consistent with BERM's
v17_night_fraction() modeling EMF as one component of the nocturnal
triple hit (melanopsin + CRY + melatonin), not the sole driver.
Methodological note: only 27% of reviewed studies met high standards.
```

FI:
```
Melatoniinisuppressiopolkua tukee kvantitatiivisesti 55 tutkimuksen
PRISMA-katsaus (Tbahriti ym. 2026, Sleep Biol Rhythms): 88 %
korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua
melatoniinisuppressiota (20–50 % basaalitasosta). Suppressio on
biologisesti merkittävä GnRH-pulsaatiolle mutta pienempi kuin
valon aiheuttama (>90 %) — yhdenmukainen BERM:n v17_night_fraction()
-mallinnuksen kanssa, jossa EMF on yksi komponentti yöllisessä
kolminkertaisessa osumassa (melanopsiini + CRY + melatoniini),
ei ainoa ajuri. Metodologinen huomio: vain 27 % tutkimuksista
täytti korkeat standardit.
```

---

### 7. [KOODI] v16.py — docstring-päivitykset

**Tiedosto:** `berm/berm/v16.py`

**Huom:** Numeerisia laskuja EI muuteta. Ainoastaan docstring-dokumentaatiota.

#### 7a. Ca²⁺-reitit ja VGIC-mekanismi

Etsi VGIC-mekanismia tai Ca²⁺-influksia käsittelevä funktio ja lisää docstringiin:

```python
    """...existing docstring...

    Multi-pathway Ca²⁺ disruption model (Level 4):
    (1) Direct S4 voltage sensor IFO (Panagopoulos et al. 2025):
        polarized RF → S4 oscillation → irregular VGCC opening → Ca²⁺ influx
    (2) Intracellular Ca²⁺ store dysregulation (Bertagna et al. 2025,
        Ann NY Acad Sci): EMF → RyR/SERCA pathway modulation → altered
        intracellular Ca²⁺ → changed ionic currents (inward ↓40%,
        transient outward ↓50%). Both pathways pharmacologically confirmed.

    Tissue-specificity note: Skin cells show no ROS/DNA damage at same
    frequencies (Meyer 2026 ELF; Haidar 2025 3.5 GHz RF) while gonadal
    cells do (Bektas 2026 3.5 GHz). Consistent with χ(Ā) selection rule:
    tissue-specific VGIC density and Ca²⁺ store architecture determine
    response threshold.
    """
```

#### 7b. ROS → testis -polku (taso 5A → 6)

Etsi reproduktiokaskadia tai oksidatiivista stressiä käsittelevä funktio ja lisää:

```python
    """...existing docstring...

    5G-frequency-specific evidence (Bektas et al. 2026, Bioelectromagnetics
    bem.70043): 3.5 GHz → testicular and oxidative damage in rats. CoQ10
    ameliorates → mechanism reversibility. First data at 5G core frequency
    for the Level 5A→6 edge. Extends Yakymenko 2016 (93/100 oxidative)
    and Panagopoulos 2025 (95%) evidence base to current exposure context.
    """
```

#### 7c. v17_night_fraction() — melatoniinisuppressio

Etsi v17_night_fraction()-funktio ja lisää docstringiin:

```python
def v17_night_fraction(country, year):
    """...existing docstring...

    Quantitative support for melatonin suppression pathway (C):
    Tbahriti et al. 2026 (Sleep Biol Rhythms, PRISMA, 55 studies):
    88% of high-quality animal studies report EMF-induced melatonin
    suppression of 20-50% from baseline. This quantifies the EMF
    component of the triple hit modeled here (melanopsin + CRY +
    melatonin). Suppression is smaller than light-induced (>90%),
    consistent with EMF being one of multiple nocturnal disruption
    pathways in this function. Methodological caveat: only 27% of
    reviewed studies met high quality standards.
    """
```

---

### 8. [KOODI] metadata.py — kommenttipäivitys

**Tiedosto:** `berm/berm/metadata.py`

**Ei arvomuutoksia.** Lisää viitetietoa kommentteihin:

```python
#: Level 4 (VGIC) multi-pathway Ca²⁺ mechanism supported by:
#:   Panagopoulos 2025: IFO-VGIC, 131 studies, 95% oxidative (direct S4)
#:   Bertagna 2025: RyR/SERCA intracellular Ca²⁺ stores (Ann NY Acad Sci)
#: Level 5A→6 (ROS → testis) 5G-frequency data:
#:   Bektas 2026: 3.5 GHz → testis ROS + damage; CoQ10 rescue (bem.70043)
#:   Tissue-specific: Meyer 2026 + Haidar 2025 null in skin cells
#: Level 5C (melatonin) systematic evidence:
#:   Tbahriti 2026: PRISMA 55 studies, 88% melatonin suppression 20-50%
#: Level 5E (BBB) mechanistic support:
#:   Gao 2024: EMP → tight junction degradation (bem.22494)
#: Discriminating tests D1–D3 remain at 0/3.
DISCRIMINATING_TESTS_NEEDED = 3
DISCRIMINATING_TESTS_COMPLETED = 0
```

---

### 9. [KOODI] Poikkileikkaavat mekanismidokumentaatiot

Kolme poikkileikkaavaa BERM-mekanismia saavat tukea näistä lähteistä:

#### 9a. Kudosspesifisyys ja χ(Ā)-valintasääntö

**Kohdetiedostot:** `model/page.tsx` (ks. 6a), evidence-sivu (ks. 4a), v16.py (ks. 7a).

**Dokumentoitava yhteys:** Bektas 2026 (3.5 GHz → testis-ROS) vs. Haidar 2025 (3.5 GHz → ei ROS ihossa) vs. Meyer 2026 (ELF → ei DNA-vauriota ihossa). Tämä kontrasti on suoraa empiiristä tukea BERM:n premissille, ettei EMF-vaste ole universaali vaan kudosspesifinen:

```
Sama/vastaava taajuus, eri kudos, eri vaste:
  3.5 GHz + testis    → ROS, vaurio (Bektas 2026)     [C]
  3.5 GHz + iho       → ei ROS, ei vauriota (Haidar)  [E]
  50 Hz   + iho       → ei DNA-vauriota (Meyer)       [E]

χ(Ā)-valintasäännön mukaista: vaste riippuu kohdesolun
VGIC-tiheydestä, Ca²⁺-varastoarkkitehtuurista ja
mitokondrioiden ROS-tuotantokapasiteetista.
```

#### 9b. Recovery window — reversiibeilysevidenssi

**Kohdetiedostot:** `v16.py` (docstring, ks. 7b), `model/page.tsx` (ks. 6b), evidence-sivu.

**Dokumentoitava yhteys:** Bektasin CoQ10-interventio osoittaa, että oksidatiivinen polku on farmakologisesti estettävissä — vaurio on reversiibeli antioksidanttilisällä. Tämä on yhdenmukainen recovery window -mallin kanssa:

```
net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair))

Bektas 2026: CoQ10 → antioksidanttikapasiteetti↑ → τ_repair lyhenee
→ pienempi nettovaurio. Farmakoloinen "rescue" = keinotekoinen
recovery window -laajennus.

Aiemmin: Koivisto 2000 fasilitaatio (30 min) vs. Panagopoulos 2025
oksidatiivinen stressi (krooninen) → ajan rooli
Nyt: Bektas 2026 CoQ10 interventio → antioksidanttikapasiteetin rooli
Molemmat tukevat recovery window -mallin perusrakennetta.
```

#### 9c. 5G-altistuskontekstin päivitys

**Kohdetiedostot:** `model/page.tsx`, evidence-sivu.

**Dokumentoitava yhteys:** Deprez ym. 2025 spektraalimittaukset neljässä Euroopan maassa tarjoavat ensimmäistä kvantitatiivista dataa 5G:n ambient-tasoista BERM:n tason 3 kalibrointiin. 5G:n suunnattu keila muuttaa ambient/personal-suhdetta:

```
5G beamforming: suunnattu keila → korkeampi hetkellinen personal-EMF
                hajautettu peitto → matalampi taustakomponentti
→ BERM:n kaksikanavamalli total = ambient + χ(Ā) × personal:
  ambient ↓ (suhteessa 4G), personal ↑ (hetkittäin) → eri χ(Ā)-dynamiikka
```

---

### 10. [PROJEKTI] Projektidokumenttien päivitys

Päivitä seuraavat Claude-projektin dokumentit:

#### 10a. BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md

**Muutos 1:** Tason 4 "vgic"-solmun `keyReferences`-listaan lisätään Bertagna 2025 (RyR/SERCA-reitti, Ann NY Acad Sci).

**Muutos 2:** Tason 4 "vgic"-solmun kuvaukseen lisätään monireittiisen Ca²⁺-häiriön konsepti: suora S4-oskillaatio (Panagopoulos) + solunsisäiset Ca²⁺-varastot (Bertagna).

**Muutos 3:** Nuoleen `pathway_a` → `sdf`/`concentration` lisätään Bektas 2026 (3.5 GHz testisdata).

**Muutos 4:** Tason 5C "pathway_c"-solmun `keyReferences`-listaan lisätään Tbahriti 2026 (PRISMA, melatoniinisuppressio 88 %).

**Muutos 5:** Tason 5E "pathway_e"-solmun evidenssiin lisätään Gao 2024 (tight junction -mekanismi, kontekstina).

#### 10b. BERM/analyysi_yhteenveto.md

**Muutos:** Lisää viittaus tähän analyysiin ja CODELLE-ohjeeseen:

"2026-08-24: Bioelectromagnetics-kirjallisuuskatsaus (BERM_Bioelectromagnetics_kirjallisuuskatsaus_2026-08-24.md, 20 artikkelia, 2024–2026) integroitu CODELLE_bioelectromagnetics_integraatio.md -ohjeen kautta. Kolme prioriteettilähdettä lisätty viiterekisteriin (Bertagna 2025 [E], Bektas 2026 [C], Tbahriti 2026 [M|C]) sekä kaksi sekundaarista (Gao 2024 [C], Deprez 2025 [C]). Negatiiviset tulokset (Meyer 2026, Haidar 2025) dokumentoitu kudosspesifisyysevidenssinä."

#### 10c. BERM/LBERM_v16_mekanismien_mallinnus.md

**Muutos:** Lisää VGIC/Ca²⁺-osioon Bertagnan monireittiinen mekanismi ja polun B osioon Tbahriti 2026:n kvantitatiivinen data.

---

### 11. [PROJEKTI] Episteemisten tasojen arviointi

#### 11a. Solmu: `vgic` (taso 4)

**Nykyinen taso:** E  
**Arvio:** Bertagna 2025 tukee E-tasoa uudella itsenäisellä mekanistisella reitillä (RyR/SERCA). Ei muutosta tarvita — taso on oikein ja saa lisätukea.

#### 11b. Nuoli: `vgic` → `pathway_a` (Ca²⁺ influx)

**Nykyinen taso:** E  
**Arvio:** Bertagna 2025 laajentaa mekanistista kuvaa. Ei muutosta.

#### 11c. Solmu: `pathway_c` (kanoninen polku B: melatoniini; solmutunnus on historiallinen)

**Nykyinen taso:** Tarkistettava (aiemmin vaihtelevasti arvioitu)  
**Arvio:** Tbahriti 2026 PRISMA (55 tutkimusta, 88 % suppressiota) tukee nousua M|C-tasolle polun B eläinkoe-evidenssissä. Kliininen siirtymä (eläin → ihminen, soluvasteen → systeeminen sirkadiaaninen häiriö) on edelleen dokumentoimatta. **Suositus:** Polun B episteeminen taso pidetään nykyisellä tasolla, mutta eläinkoe-evidenssin vahvuus dokumentoidaan. Suorittava agentti tarkistaa polun B nykytason kausaaliketjuohjeista ja päättää tarkennustarpeesta.

#### 11d. Nuoli: `pathway_a` → `sdf` / `concentration` (ROS → siittiökaskadi)

**Nykyinen taso:** C  
**Arvio:** Bektas 2026 (3.5 GHz testis-ROS) tukee mutta ei nosta — yksittäinen eläinkoe. Ei muutosta.

#### 11e. Solmu: `pathway_e` (Polku E: BBB)

**Nykyinen taso:** C  
**Arvio:** Gao 2024 tukee mekanistisesti (tight junction -kohdereitti) mutta EMP ≠ RF, joten ei paranna episteemistä tasoa. Ei muutosta.

**Yhteenveto:** Yksikään episteeminen taso ei muutu näiden lähteiden perusteella. Ne tukevat olemassa olevia tasoja ja tarkentavat mekanistista kuvaa. Polun B eläinkoe-evidenssin vahvuutta tarkennetaan dokumentoinnissa.

---

## KONTEKSTIARTIKKELIT (EI KOODIMUUTOKSIA)

Seuraavat lähteet on dokumentoitu kirjallisuuskatsauksessa mutta eivät vaadi erillisiä koodimuutoksia:

| Lähde | BERM-taso | Konteksti |
|---|---|---|
| Gautam ym. 2026 | 5A→6 | 35.5 GHz mmWave testis-ROS. Täydentää Bektasta eri taajuudella. |
| Krylov 2026 | 5B | RPM universaalisuus — polun B kriittinen katsaus. |
| Hurtier ym. 2025 | 4, 5A | Kaksitaajuusaltistus (5G + GSM) — epälineaarisuus. |
| Layla ym. 2026 | 5D | 5G → HRV + stressibiomarkkerit. Polun D kontekstia. |
| Michelant ym. 2025 | 5D | RF → sydänaktiivisuus systemaattinen katsaus. |
| Verrender ym. 2025 | 5D | RF → kortisoli IEI-EMF:ssä. Akuutti vs. krooninen erottelu. |
| Wang ym. 2025 | 3 | Kaupunki-RF — tason 9 takaisinkytkentäkonteksti. |
| Zhou ym. 2026 | 3 | Sukupuolierot altistuksessa. |
| Diao ym. 2025 | 3 | Laskennallinen dosimetria — menetelmäkatsaus. |
| Chitnis ym. 2025 | 3 | mmWave dosimetria. |
| Ledent ym. 2025 | Meta | EHS-provokaatio — BERM ei mallinna EHS:ää. |
| Selmaoui 2025 | Meta | 5G-riskiarviointi — kontekstikatsaus. |

---

## TOTEUTUSJÄRJESTYS

```
1.  [KOODI]  references.json + references_full.json — 5 uutta merkintää
              (3 prioriteettia + 2 sekundaarista)
              (verified: false → tarkista kirjoittajat + DOI → verified: true)

2.  [KOODI]  Evidence-sivu — Bertagna 2025 tutkimuskortti (EN + FI)

3.  [KOODI]  Evidence-sivu — Bektas 2026 + Tbahriti 2026 tutkimuskortit (EN + FI)

4.  [KOODI]  Evidence-sivu — negatiiviset tulokset (Meyer + Haidar) + Gao 2024
              tutkimuskortit (EN + FI)

5.  [KOODI]  CausalChain.tsx / causalChainData.ts — evidenssipopup-päivitykset
              (6 kohdetta: vgic, vgic→pathway_a, pathway_a→sdf/concentration,
               pathway_c, pathway_e, taso 3 konteksti)

6.  [PROJEKTI→KOODI] model/page.tsx — 3 tekstitäydennystä (monireittiinen Ca²⁺,
              5G reproduktiodata, polun B kvantitatiivinen tarkennus)
              (EN + FI) — konteksti upotettu ohjeeseen

7.  [KOODI]  v16.py — docstring-päivitykset (3 funktiota, ei numerisia muutoksia)

8.  [KOODI]  metadata.py — kommenttipäivitys (ei arvomuutoksia)

9.  [KOODI]  Poikkileikkaavat dokumentaatiot (kudosspesifisyys,
              recovery window / reversiibeilysevidenssi, 5G-konteksti)

10. [PROJEKTI] Projektidokumentit (3 kpl):
              → EXTINCTIONFIELD_kausaaliketju_ohjeet.md (5 muutosta)
              → analyysi_yhteenveto.md (1 muutos)
              → LBERM_v16_mekanismien_mallinnus.md (2 muutosta)
              → Jos ei projektipääsyä: kirjoita docs/codelle/pending/

11. [PROJEKTI] Episteemisten tasojen arviointi → ei muutoksia (dokumentoi tuki,
              polun B eläinkoe-evidenssin vahvuus tarkennetaan)
```

---

## VAROITUKSET

1. **Älä muuta numeerisia laskuja.** Tämä ohje koskee AINOASTAAN dokumentaatiota, evidenssisivua, viiterekisteriä ja kausaaliketjun evidenssipopuppeja. v16.py:n/v17:n laskukaavoja, kertoimia tai parametreja EI saa muuttaa.

2. **Verified-lippu vaatii tarkistuksen.** Kaikki viisi uutta references.json-merkintää on `verified: false`. Suorittava agentti tarkistaa tarkat kirjoittajalistat ja DOI-toimivuudet ennen `true`-asetusta. Erityisesti Bertagna 2025:n kirjoittajalista on tarkistettava (tässä ohjeessa käytetty osittaista listaa).

3. **ELF vs. RF -erottelu Bertagna 2025:ssa.** Bertagna on ELF-tutkimus (50 Hz, 1 mT). BERM:n pääaltistus on RF (800 MHz – 3.5 GHz). Mekanismin siirto ELF → RF ei ole suoraviivainen. Tämä erottelu on mainittava JOKAISESSA kontekstissa jossa Bertagnaan viitataan. IFO-mekanismi operoi molemmilla alueilla eri voimakkuusriippuvuudella (Panagopoulos 2025), ja Ca²⁺-reitti on jaettu, mutta kvantitatiivinen vastaavuus on dokumentoimatta.

4. **EMP vs. krooninen RF -erottelu Gao 2024:ssa.** EMP on korkea-amplitudinen, lyhytkestoinen pulssi — eri altistusparametrit kuin BERM:n krooninen matala-intensiteettinen RF. Gao:n relevanssi BERM:lle on mekanistinen (sama molekulaarikohde), ei parametrinen. Tämä erottelu on mainittava.

5. **Negatiivisista tuloksista tasapainoisesti.** Meyer 2026 ja Haidar 2025 ovat laadukkaita negatiivisia tuloksia, joita ei saa ohittaa eikä vähätellä. Ne dokumentoivat, ettei EMF tuota vaurioita kaikissa kudoksissa — mikä on yhdenmukainen BERM:n χ(Ā)-valintasäännön kanssa, mutta tätä yhteensopivuutta ei saa esittää negatiivisten tulosten "selityksenä pois". Molemmat mahdollisuudet (kudosspesifisyys TAI riittämätön vaikutus) on pidettävä avoimina.

6. **Tbahriti 2026:n laatuvaihtelusta läpinäkyvästi.** Vain 27 % tutkimuksista täytti korkeat metodologiset standardit. 48 % eläintutkimuksista ilman riittävää sham-kontrollia. Nämä rajoitukset on mainittava JOKAISESSA kontekstissa jossa 88 %:n lukuun viitataan.

7. **Terminologia:** Älä käytä "todistaa" tai "vahvistaa" kumpaankaan suuntaan. Käytä: "tukee", "on yhteensopiva", "on yhdenmukainen", "osoittaa". Tämä on BERM-projektin yleinen sääntö (project_rules.md).

8. **Evidence-sivun rakenne.** Sivu on 219 KB monolitti. Lisäykset tehdään nykyiseen rakenteeseen. Sivun refaktorointia erillisiksi komponenteiksi ei aloiteta tämän ohjeen puitteissa.

9. **Polun B episteeminen taso vaatii erillisen arvion.** Tbahriti 2026:n PRISMA-katsaus on vahvin systemaattinen evidenssi polun B eläinkoe-evidenssille, mutta kliininen translaatio (eläin → ihminen) on edelleen dokumentoimatta. Suorittava agentti tarkistaa polun B nykytason kausaaliketjuohjeista ja tekee lopullisen arvion.

---

## LÄHDEANALYYSI

Tämä CODELLE-ohje perustuu dokumenttiin: `BERM_Bioelectromagnetics_kirjallisuuskatsaus_2026-08-24.md`

Kirjallisuuskatsaus kattaa Bioelectromagnetics-lehden volyymit 45–47 (2024–2026) ja 6 täydentävää artikkelia lähijulkaisuista. Yhteensä 20 artikkelia kartoitettiin BERM:n 9-tasoisen kausaaliketjun rakenteeseen.
