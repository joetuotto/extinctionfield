# Teknologia-altistusmalli — MASTER-ohje (Model-sivu)

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Tiedosto:** `website/app/[locale]/model/page.tsx` (2301 riviä)

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Teknologia-altistusmalli on BERM:n ydin: se formalisoi miten eri teknologiasukupolvet kumuloivat EMF-altistusta ja miten tämä kerrostuminen selittää terveysepidemioiden ajoituksen. Model-sivu on projektin teknisesti syvällisin sivu — kausaalidiagrammi, VGCC-hierarkia, χ-funktio ja palautumismalli ovat kaikki täällä.

---

## MODEL-SIVUN ARKKITEHTUURI

### Kolmitasoinen malli
| Taso | Nimi | Sisältö |
|------|------|---------|
| L1 | Biological capacity | VGCC → Ca²⁺ → ROS → DNA/hormoni/kehitys |
| L2 | EMF-behavioral coupling | Teknologia-altistus × biologinen herkkyys |
| L3 | True culture | Kulttuuriset adaptaatiot ja demografiset seuraukset |

**Avainperiaate:** Tasot ovat multiplikatiivisia, eivät additiivisia.

### Kausaalipolkudiagrammi
- **Komponentti:** `BermCausalDiagram`
- 8 tasoa, 63 solmua, 107 reunaa
- **Polku A:** VGCC → Ca²⁺ → ROS → mitokondrioiden häiriö
- **Polku B:** RPM/CRY → sirkadiaaninen häiriö → melatoniini
- **Polku B′ (B:n alahaara):** CRY2 → TRPC1 → kalvojännitehäiriö (polun B paino 25%)

### VGCC-herkkyys lepojännitteessä
- **Komponentti:** `VGCCGeneFamilyDiagram`
- Cav1.2 (sydän/aivot) → Cav1.3 (sisäkorva/aivolisäke) → Cav3.x (pacemaker)

### CaMKII-positiivinen takaisinkytkentä
- **Komponentti:** `CaMKIIConvergenceDiagram`
- Kumulatiivinen sensitisaatio: miksi vaikutukset kasvavat ajan myötä
- Autofosforylaatiokynnys väestötasolla

---

## KOLMIKANAVAMALLI (TCBM)

### Kanavat ja painot

| Kanava | Taajuusalue | Päälähde | Biologinen reitti | Diagnostinen paino | Empiirinen paino |
|--------|------------|----------|------------------|--------------------|------------------|
| ELF | 0–300 Hz | Sähköverkko, valaistus | VGCC suora aktivaatio | 5% | ~60% |
| IF | 300 Hz – 10 MHz | Kytkentäelektroniikka, LED-flicker | Mitoottinen kara, ferroptotic priming | 60% | Kollineaarinen |
| RF | 10 MHz – 300 GHz | Tukiasemat, WiFi, tutka | CRY/RPM-magnetoreseptio | 35% | ~40% |

**Huomio:** Diagnostinen paino (mekanistinen merkitys) vs empiirinen paino (poikkileikkausregressio) eroavat kollineaarisuuden vuoksi. ELF dominoi empiirisesti koska sähkönkulutus korreloi kaikkien teknologiakerrosten kanssa.

### 12 teknologiakerrosta

| # | Kerros | Kanavat | Aikakausi |
|---|--------|---------|-----------|
| 1 | AC-sähköverkko (50/60 Hz) | ELF | 1880– |
| 2 | AM-radio | RF | 1920– |
| 3 | Tutka | RF | 1940– |
| 4 | FM-radio + TV | RF | 1950– |
| 5 | CRT-näytöt | ELF + IF | 1950– |
| 6 | Loisteputkivalaistus | ELF + IF | 1960– |
| 7 | Tukiasemat (1G/2G) | RF | 1983– |
| 8 | WiFi | RF + ELF (10 Hz beacon) | 1999– |
| 9 | 3G/4G | RF | 2001– |
| 10 | LED-valaistus | IF (>100 kHz PWM) | 2009– |
| 11 | 5G | RF (mmWave) | 2019– |
| 12 | IoT-verkko | RF (kumulatiivinen) | 2015– |

---

## VIISITASOINEN PALAUTUMISMALLI

| Taso | Prosessi | α (palautuvuus) | Aikaikkuna |
|------|----------|-----------------|------------|
| 1 | VGIC-gating | Korkea | Sekunteja–minuutteja |
| 2 | ROS-puhdistus | Korkea | Minuutteja–tunteja |
| 3 | DNA-korjaus / SDF | Keskitaso | 4–24 h (Ivancsits 2005) |
| 4 | Leydig-solutoiminta | Matala | Viikkoja–kuukausia |
| 5 | Spermatogeneesi-sykli | Hyvin matala | 64 päivää (ihminen) |

**9 h palautumisikkuna:** Ivancsitsin DNA-korjauksen kinetiikasta johdettu — yöaikainen EMF-vapaa jakso on kriittinen.

---

## χ-KYTKENTÄFUNKTIO

### Viisi skaalaa
| Skaala | Selite | Esimerkki |
|--------|--------|-----------|
| χ_mol | Molekulaarinen herkkyys | CRY4 vs CRY1 polymorfismit |
| χ_cell | Solutason herkkyys | VGCC-alatyyppien ilmentyminen |
| χ_tissue | Kudostason herkkyys | Leydig-solujen VGCC-tiheys |
| χ_org | Organismin herkkyys | Pohjoinen paketti (OCA2/LCT) |
| χ_pop | Populaatiotason herkkyys | Teollistumishistoria |

### χ evidenssiperheittäin (6 perhettä)
Kukin sisältää: family, χ-arvo, mechanism, prediction, verification, epistemic level.

---

## KOMPONENTTIRIIPPUVUUDET

| Komponentti | Tarkoitus |
|-------------|-----------|
| BermCausalDiagram | Kausaalipolkujen interaktiivinen kaavio |
| ModelTableOfContents | Sisällysluettelo |
| ModulomeLayers | Modulomi-kerrosten visualisointi |
| CollapsibleSection | Laajennettavat osiot |
| VGCCGeneFamilyDiagram | VGCC-perheiden hierarkia |
| ThresholdChart | Kynnysmallin visualisointi |
| SixFactorSummary | 6-tekijän tiivistelmä |
| CaMKIIConvergenceDiagram | CaMKII-konvergenssin kaavio |
| MathematicsSections | Matematiikkaosion upotus |

---

## DATARIIPPUVUUDET

| Data | Polku |
|------|-------|
| CHI_SCALES | @/lib/evolutionData |
| CHAIN_EPISTEMIC_COLORS | @/lib/epistemicConstants |
