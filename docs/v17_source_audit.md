# BERM v17: Systemaattinen lähdeauditointi — mallia muuttavat löydökset

Versio: 2026-08-18
Status: Spesifikaatio — ei implementoitu vielä. Phase 2 -referenssi.

Yhteenveto: 413 viitteestä ~40 muuttaa numeerisia tuloksia, ~20 tuo rakenteellisia
oivalluksia, ~15 sisältää negatiivisia tuloksia jotka rajoittavat mallia.

---

## 1. NEUROBIOLOGISET VAIKUTUKSET (#93–96)

### Volkow 2011 (#93) — PET-kuvantaminen, 7% glukoosimuutos
- Matkapuhelimen RF lisäsi aivojen glukoosinkulutusta 7% puhelimen puolella
- PET-kuvantaminen, NIH/NIDA-johtaja, JAMA
- Ei lämmittävä vaikutus → metrisen tilan muutos neuronien ionikanavadynamiikassa
- **Malliin:** Polku D (HPA) kvantitatiivinen ankkuri. 7% metabolinen muutos
  30 min altistuksesta = mitattava, replikoitu, merkittävä.

### Friedman 2007 (#96) — ERK-aktivaatio 5 minuutissa
- NADH-oksidaasi → ROS → ERK (MAP-kinaasi)
- Rinnakkainen IFO-VGIC:lle: suora kalvo-oksidaasi → ROS (ei VGIC:n kautta)
- **Malliin:** ROSIndex tarvitsee kaksi tuloa:
  1. VGIC-medioitu: Ca²⁺ → mitokondriaalinen ROS
  2. Suora kalvo-oksidaasi → ROS
  Nämä summautuvat.

---

## 2. MELATONIINI JA SCHUMANN (#105–108)

### Wever 1973 (#179) — Eristyskokeet
- Ihmisen vuorokausirytmi poikkeaa 24h ilman EM-kenttiä
- Palautuu 10 Hz kentässä (Schumann-perustaajuus)
- Schumann = luonnollinen Ā_DC joka kalibroi pineaalin χ(Ā)-detektoria
- **Malliin:** Schumann-resonanssin tukahdutus kaupunkiympäristössä (EMF-melu
  peittää 10 Hz) = CRY-kanavan kolmas reitti melatoniinin kautta.

### Burch 2002 (#107) — Melatoniinimetaboliitit
- Matkapuhelinkäyttäjien 6-sulfatoksimelatoniini matalampi
- Polku B:n suora ihmisdata
- **Malliin:** Melatoniinisuppressio = personal-EMF:n funktio
  (puhelin pään vieressä yöllä → pineaalin altistus).

---

## 3. HORMONIVAIKUTUKSET JA MOTIVAATIO (#213–228)

### Travison 2007 (#213) — Testosteronin sekulaaritrendi
- T laskenut ~1%/vuosi 1980-luvulta
- **Kalibraatioehto:** behavioralFactor:n T-komponentti Exp[-0.013 × adjCum]
  pitäisi tuottaa ~1%/vuosi lasku kehittyneiden maiden cumEMF-kasvunopeudella.

### Schlegel 1987/2019 (#218) — Aivolisäkkeen Ca²⁺-oskillaatiot
- GnRH-pulsaatio on ionikanavariippuvainen (Ca²⁺-oskillaatiot)
- IFO-VGIC häiritsee → GnRH-pulsaatio häiriintyy → FSH/LH muuttuu
- **Malliin:** T_BE-kanavan spesifinen polku aivolisäkkeen kautta.
  Erillinen mekanismi (Ca²⁺-oskillaatio vs Leydigin solun ROS-vaurio).
  Nyt nipussa behavioralFactor:ssa — pitäisi eritellä.

### L. reuteri (#227) — Vagus → oksitosiini
- L. reuteri kadonnut 95% väestöstä
- L. reuteri → vagushermo → oksitosiini hypotalamuksesta
- EMF häiritsee suoliston mikrobiomia (polku E) → L. reuteri↓ → OT↓
- **Malliin:** Yhdistää polku E (mikrobiomi) ja polku D (motivaatio).
  Reproductive tract microbiome -moduulissa: L. reuteri → vagus → OT -ketju.

---

## 4. NAISTEN LISÄÄNTYMISTERVEYS (#229–231)

### Porcine endometrium (#229) — Aromataasin häiriö
- EMF häiritsi estradiol-17β:n ja estronin synteesiä
- Sytokromi P-450 aromataasin ekspression muutos
- **Malliin:** fFemale = ovulationBioelectric × aromataseIntegrity × cryClockEffect.
  Naisten polku A: EMF → aromataasin häiriö → estrogeenisynteesin häiriö
  → follikulaarisen kehityksen häiriö → ovulaation häiriö.

### Follikulaarinen kehitys (#230) — Granuloosasolut
- Oksidatiivinen stressi → granuloosasolujen steroidituotantokyky↓
- Sama ROS-mekanismi kuin miehillä, eri kudos

---

## 5. SELYE-DYNAMIIKKA (#280–288)

### Ca²⁺-ATP-bifurkaatio (#283) — Matemaattinen ydin
- Positiivinen palautesilmukka:
  kohonnut Ca²⁺ → kohonnut pumppaustarve → ATP-vajaus
  → heikompi pumppaus → pysyvästi kohonnut Ca²⁺
- Metrinen hystereesi: bifurkaatiokynnyksen ylitys → uusi stationäärinen tila
- Palautuminen vaatii suuremman energian kuin alkuperäinen perturbointia
- **Malliin:** bioCap:n eksponentiaalinen lasku tarvitsee hystereesikomponentin
  jossa kynnys riippuu historiatilasta, ei vain cumEMF:stä.

### Hsp70 (#285, Molina-Montenegro 2023) — Akuutti biomarkkeri
- Lämpöshokkiproteiini kaksinkertaistui 5 min voimalinjan lähellä
- **Malliin:** $ControlledHumanTissueEvidence -kerrokseen akuutin stressin mittarina.

### Leproult & Van Cauter 2011 (#286) — Uni → testosteroni
- 1 viikko unirajoitusta → T laski 15%
- Unirajoitus = melatoniinisuppressio = pineaalin χ(Ā)-häiriö
- **Kalibraatioehto:** EMF → pineaali → melatoniini↓ → uni↓ → T↓ 15%.
  Polku B (melatoniini) ja testosteronivaste — kvantitatiivinen yhdistäminen.

---

## 6. KALMODULIINI JA NO/ONOO⁻ (#289–290)

### CaM-kaskadin formalisointi
- VGIC → Ca²⁺ → 4 Ca²⁺ → kalmoduliinin konformaatiomuutos
  → CaMK, NOS, fosfataasit
- NO/ONOO⁻-kierre: NO + O₂⁻ → peroksinitriitti (k ≈ 10¹⁰ M⁻¹s⁻¹)
- 4 Ca²⁺-ionin kynnys = bifurkaatiopiste (vrt. Beckerin nanoampeerikynnys)
- **Malliin:** ROSIndex tarvitsee NO/ONOO⁻-komponentin:
  erillinen mitokondriaalisen ROS:n kanssa, summautuu downstream.

---

## 7. NEGATIIVISET TULOKSET (#295–300) — PAKOLLINEN ESITTÄÄ

### Gutschi 2011 (#295) — Ei T-muutosta RF:llä
- BERM:n vastaus: akuutti vs kumulatiivinen.
  Travisonin sekulaaritrendi on kumulatiivinen, yksittäinen koe ei havaitse.

### Suomen Nokia-aikakausi (#299) — TFR nousi 1990-luvulla
- BERM:n vastaus: kumulatiivinen varasto ei kertynyt vielä,
  2G-altistus kertaluokkia pienempi kuin 4G/5G/WiFi.

**Malliin:** $NegativeResults-taulukko extinctionfield.com:n evidenssisivulle.
Eksplisiittisesti esillä, ei piilotettuna.

---

## 8. LUONNOLLISET KOKEET (#234–242) — $NaturalExperiments-rekisteri

Seitsemän luonnollista koetta jotka muodostavat χ(Ā)-gradientin:

| Ryhmä | TFR | EMF-taso | χ(Ā) |
|-------|-----|----------|------|
| Old Order Amish | ~6.5 | ~0 | ~0 |
| Haredi (Israel) | ~6.4 | matala (kosher+Shabbat) | matala |
| Meksikolaiset mennoniitit | 5–6 | matala | matala |
| Mormonit | 4.5→2.8 | korkea (ei tekn.raj.) | korkea |
| Hutteriitit | romahdus | nousi tekn. tullessa | nousi |
| Modernit mennoniitit | ~2.8 | korkea (teknologia ok) | korkea |
| Israel sekulaari | ~2.0 | korkea | saturoitunut |
| Israel dati | ~3.8 | keskitaso | keskitaso |

Lindgrenin χ(Ā)-gradientti: Amish Ā≈0 → χ≈0 → TFR=bioCap.
Gradientti on monotoninen ja kattaa koko EMF-alueen.

---

## 9. EMF PROXYNA (#352–354)

### PM2.5-attenuaatiotesti (#354)
- PM2.5 menettää merkitsevyyden kun cumEMF lisätään malliin
- Attenuaatio 84%
- **Malliin:** Konventionaalinen vertailumalli:
  koulutus + urbanisaatio + BKT + PM2.5 vs EMF.
  Tarkista attenuoituuko PM2.5 edelleen.

### 15 kausaaliketjun taulukko
- Mallin proxy-dekomposition perusta
- Konventionaalisten selittäjien EMF-riippuvuusanalyysi

---

## YHTEENVETO: Implementaatiojärjestys Phase 2:ssa

### Prioriteetti 1: Kalibraatioehdot (muuttavat numeerisia tuloksia)
- Travison 1%/v T-lasku → behavioralFactor T-komponentti
- Leproult 15% T-lasku viikossa → polku B (melatoniini) × testosteroni -kalibraatio
- Volkow 7% glukoosi → polku D ankkuri
- PM2.5-attenuaatio 84% → konventionaalinen vertailumalli

### Prioriteetti 2: Rakenteelliset muutokset (uudet polut/komponentit)
- Kaksi ROS-tuloa (VGIC + kalvo-oksidaasi)
- NO/ONOO⁻-komponentti ROSIndexiin
- Ca²⁺-ATP-bifurkaation hystereesi bioCap:ssa
- fFemale-moduuli (aromataasikomponentti)
- L. reuteri → vagus → OT -ketju (polku E×D yhdistäminen)
- Aivolisäkkeen Ca²⁺-oskillaatio eriytettävä behavioralFactor:sta
- Schumann-tukahdutus CRY-kanavan kolmantena reittinä

### Prioriteetti 3: Evidenssisivun laajennukset
- $NegativeResults-taulukko (pakollinen)
- $NaturalExperiments-rekisteri (7 koetta)
- $ControlledHumanTissueEvidence (Hsp70 ym.)
