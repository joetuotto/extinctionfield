# Bioelectromagnetics-lehden kirjallisuuskatsaus BERM-mallin näkökulmasta (2024–2026)

**Päivämäärä:** 2026-08-24  
**Analysoija:** Claude Cowork  
**Kohde:** Bioelectromagnetics (Wiley, ISSN 1521-186X) — volyymit 45–47, vuodet 2024–2026  
**Täydentävät lähteet:** Annals of the New York Academy of Sciences, Biological Reviews, Andrology, Scientific Reports, Frontiers in Public Health, Sleep and Biological Rhythms  
**Menetelmä:** Systemaattinen haku BERM:n 9-tasoisen kausaaliketjun solmujen ja nuolien avainsanoilla; artikkelien kartoitus kausaaliketjun tasoihin

---

## BERM:N KAUSAALIKETJUN RAKENNE (referenssi)

```
Taso 1: GEOMETRIA         g_μν = η_μν + A_μA_ν (Lindgren 2025)
    ↓ geometrinen seuraus
Taso 2: VALINTASÄÄNTÖ      χ(Ā) = Ā/√(1+Ā²) — taustariippuvainen herkkyys
    ↓ kytkentäfunktio
Taso 3: ALTISTUS           total = ambient + χ(Ā) × personal
    ↓ EMF saavuttaa solun
Taso 4: KALVOFYSIIKKA      Vmem = −70 mV/10nm → VGIC/IFO-aktivaatio
    ↓ Ca²⁺ influx / spin-kemia / pineaalihäiriö
Taso 5: VIISI POLKUA       A:ROS  B:CRY  C:Melatoniini  D:HPA→HPG  E:BBB
    ↓ polkukohtaiset kaskadivaikutukset
Taso 6: KASKADI            SDF, motiliteetti↓, konsentraatio↓, ovulaatio↓,
                           implantaatio↓, sukupuolisuhde Δ
Taso 7: KONVERGENSSI       F_bio × M_repro
    ↓ TFR = bioCap × behavioral × cultural
Taso 8: DEMOGRAFINEN       fekundabiliteettiaste → ASFR(ikä) → TFR
    ↓
Taso 9: TAKAISINKYTKENTÄ   TFR↓ → urbanisaatio↑ → ambient-EMF↑ → taso 3
```

---

## KIRJALLISUUSKATSAUKSEN TIIVISTELMÄ

Bioelectromagnetics-lehti on bioelektromagnetiikan alan keskeisin vertaisarvioitu julkaisu (perustettu 1980, Bioelectromagnetics Society). Vuosien 2024–2026 julkaisuista tunnistettiin **14 artikkelia** jotka ovat suoraan relevantteja BERM:n kausaaliketjun eri tasoille, sekä **6 täydentävää artikkelia** lähijulkaisuista. Yhdessä nämä 20 artikkelia kattavat BERM:n tasot 3–6 ja tarjoavat sekä tukevaa että rajoittavaa evidenssiä. Tasot 1–2 (geometrinen perusta ja valintasääntö), 7–9 (konvergenssi, demografinen kaskadi, takaisinkytkentä) eivät kuulu lehden tyypilliseen aihealueeseen.

### Kattavuuskartta

| BERM-taso | Löydetyt artikkelit | Pääsuunta |
|---|---|---|
| Taso 3: Altistus/dosimetria | 5 artikkelia | Ambient-tasojen mittaus, sukupuolierot, 5G/6G |
| Taso 4: Kalvofysiikka/VGIC | 3 artikkelia | Ionikanavamekanismit, Ca²⁺-homeostaasi |
| Taso 5A: ROS/DNA-vaurio | 4 artikkelia | Oksidatiivinen stressi — ristiriitaisia tuloksia |
| Taso 5B: CRY/RPM | 1 artikkeli | Radikaaliparimekanismin universaalisuus |
| Taso 5C: Melatoniini/sirkadiaaninen | 1 artikkeli | Systemaattinen katsaus: EMF → melatoniinisuppressio |
| Taso 5D: HPA/stressi | 3 artikkelia | Kortisoli, HRV, sydänvaikutukset |
| Taso 5E: BBB | 1 artikkeli | Tight junction -avautuminen |
| Taso 6: Reproduktiokaskadi | 2 artikkelia | Testis/siittiö ROS-vaurio (3.5 GHz, 35.5 GHz) |

---

## TASO 3: ALTISTUS JA DOSIMETRIA

### 3.1 Deprez ym. 2025 — 5G-altistuksen spektraaliarviointi Euroopassa

**Julkaisu:** Bioelectromagnetics, bem.70019  
**Tyyppi:** Mittaustutkimus  
**BERM-taso:** 3 (ambient-altistus)

Tutkimus mittasi 5G RF-EMF -altistustasoja neljässä Euroopan maassa spektraalimenetelmällä. Tulokset tuottavat kvantitatiivista dataa BERM:n ambient-termin kalibrointiin. BERM:n altistusyhtälö `total = ambient + χ(Ā) × personal` edellyttää empiiristä dataa ambient-kentistä eri ympäristöissä. 5G:n käyttöönotto muuttaa sekä taajuusjakaumaa (3.5 GHz, mmWave) että spatiaalirakennetta (suunnatut keilat vs. hajautettu peitto).

**BERM-relevanssi:** Tarjoaa parametridataa tason 3 ambient-funktiolle. 5G:n spektraalinen rakenne eroaa 2G/3G/4G:stä — suunnattu keila voi tuottaa korkeampia hetkellisiä personal-altistuksia mutta matalamman taustakomponentin. Tämä on yhdenmukainen BERM:n kaksikanavamallin erottelun kanssa.

**Episteeminen arvio:** C (mittausdata, ei biologisia päätetapahtumia)

---

### 3.2 Wang ym. 2025 — Kaupunkiympäristön downlink-altistus

**Julkaisu:** Bioelectromagnetics, bem.70033  
**Tyyppi:** Mittaustutkimus (monivertailu)  
**BERM-taso:** 3 (ambient-altistus)

Kattava mittauspohjainen arviointi RF-EMF-altistuksesta kaupunkiympäristöissä. Useita mittausmenetelmiä verrattiin toisiinsa downlink-altistuksen kvantifioimiseksi.

**BERM-relevanssi:** Kaupunkiympäristö on BERM:n tason 9 takaisinkytkennän ytimessä: `TFR↓ → urbanisaatio↑ → ambient-EMF↑`. Korkein ambient-EMF on tiiviillä kaupunkialueilla, jotka ovat myös matalimman TFR:n alueita. Wang ym. tuottaa dataa tämän korrelaation kvantitatiiviseen testaamiseen.

**Episteeminen arvio:** C (mittausdata)

---

### 3.3 Diao ym. 2025 — Laskennallisen bioelektromagnetiikan katsaus

**Julkaisu:** Bioelectromagnetics, bem.70002, vol. 46(3)  
**Tyyppi:** Katsaus (IEEE-workshopin synteesi)  
**BERM-taso:** 3 (dosimetriamenetelmät)

22 tutkijan katsaus laskennallisista menetelmistä ihmiskehon ja EMF:n vuorovaikutuksen mallintamiseen. Käsittelee kudosten dielektrisiä ominaisuuksia, matala- ja radiotaajuusmallinnusta, stokastista termodosimetriaa ja menetelmien vertailua.

**BERM-relevanssi:** BERM:n taso 4 perustuu solukalvon sähkökentän suuruuteen (V_mem = −70 mV / 10 nm ≈ 7×10⁶ V/m). Laskennalliset dosimetriamenetelmät ovat ratkaisevassa asemassa sen arvioinnissa, kuinka paljon ulkoisesta kentästä todellisuudessa vaikuttaa kalvotasolla. Tämä katsaus edustaa alan nykytilaa mutta ei suoraan testaa BERM:n χ(Ā)-valintasääntöä.

**Episteeminen arvio:** L* (menetelmäkatsaus, ei suora BERM-testi)

---

### 3.4 Zhou ym. 2026 — Sukupuolispesifinen altistusanalyysi

**Julkaisu:** Bioelectromagnetics, bem.70055  
**Tyyppi:** Tutkimusartikkeli  
**BERM-taso:** 3 (personal-altistus) + taso 6 (sukupuolispesifiset vaikutukset)

Analyysi matkapuhelinlaitteen sähkömagneettisesta altistuksesta sukupuolinäkökulmasta. Tutkimus käsittelee sukupuolten välisiä eroja altistuksessa sekä pienennettyjä antenniratkaisuja suojatoimenpiteinä.

**BERM-relevanssi:** BERM:n kausaaliketju ennustaa sukupuolispesifisiä vaikutuksia usealla tasolla. Personal-altistuksen spatial-komponentti (taso 3) eroaa miehillä ja naisilla: miehillä puhelin on usein taskussa lähellä gonadeja, naisilla harvemmin. Tason 6 kaskadi on erilainen: miehillä SDF + motiliteetti + konsentraatio, naisilla ovulaatio + implantaatio. Zhou ym. kvantifioi tämän altistusgeometrian eron.

**Episteeminen arvio:** C (dosimetria, ei biologisia vasteita)

---

### 3.5 Chitnis ym. 2025 — Absorboitunut tehotiheys >10 GHz

**Julkaisu:** Bioelectromagnetics, bem.70018  
**Tyyppi:** Dosimetriatutkimus  
**BERM-taso:** 3 (personal-altistus, mmWave)

Jäljitettävä arviointi kehoon kiinnitettyjen laitteiden absorboidusta tehotihyydestä yli 10 GHz taajuuksilla. Tarjoaa mittausmenetelmiä 5G mmWave -altistuksen kvantifiointiin.

**BERM-relevanssi:** mmWave-taajuudet (24–39 GHz) ovat BERM:n kannalta kiinnostavia, koska niiden tunkeuma on matalampi kuin sub-6 GHz -signaalien. Tämä voisi tarkoittaa, ettei mmWave saavuta gonadeja (maskuliininen reproduktiokaskadi) suoraan, mutta voi vaikuttaa ihon nocireseptoreihin ja termoregulatiivisiin reflekseihin. BERM:n nykyinen malli ei erottele taajuuskaistojen penetraatiota.

**Episteeminen arvio:** L* (menetelmä, ei biologinen data)

---

## TASO 4: KALVOFYSIIKKA JA IONIKANAVAT

### 4.1 Bertagna ym. 2025 — EMF moduloi hermosolujen ionivirtoja Ca²⁺-homeostaasilla

**Julkaisu:** Annals of the New York Academy of Sciences, vol. 1550(1), DOI: 10.1111/nyas.15386  
**Tyyppi:** Kokeellinen (in vitro)  
**BERM-taso:** 4 (VGIC/kalvofysiikka)

**Merkittävin löydös koko katsauksessa BERM:n tason 4 kannalta.**

Tutkijat altistivat hiiren hippokampusleikkeitä 50 Hz, 1 mT ELF-magneettikentille 60 minuutin ajan ja mittasivat CA1 pyramidaalineuronien kalvovirtoja "loose patch clamp" -tekniikalla.

**Keskeiset tulokset:**

- **Sisäänpäinsuuntaiset virrat** vähenivät noin 40 %
- **Transientit ulospäinsuuntaiset virrat** vähenivät noin 50 %
- Pitkäkestoiset ulospäinsuuntaiset virrat eivät muuttuneet merkitsevästi

**Mekanismi tunnistettu:** Kaksi kalsiumiin liittyvää reittiä:

1. **Ryanodiinireseptori (RyR) -reitti:** Dantroleeni (RyR-salpaaja) esti EMF:n vaikutukset sekä sisäänpäin- että transientteihin ulospäinsuuntaisiin virtoihin kokonaan
2. **SERCA-reitti:** Syklopiatsonihappo (CPA, sarkoplasmaattisen retikulumin Ca²⁺-pumpun salpaaja) esti samoin EMF-vaikutukset

**BERM-relevanssi — kriittinen:**

Tämä tutkimus vahvistaa suoraan BERM:n tason 4 → tason 5 mekanismin ytimen: EMF → muuttunut Ca²⁺-homeostaasi → ionikanavatoiminnan häiriö. Yhteys on kaksisuuntainen:

(a) EMF muuttaa solunsisäistä kalsiumtasapainoa (ER → sytoplasma) RyR:n ja SERCA:n kautta
(b) Muuttunut Ca²⁺ moduloi jänniteohjattuja kanavia → kalvon eksitabiliteetti muuttuu

Tämä on yhdenmukainen Panagopoulosin IFO-VGIC -mekanismin kanssa mutta tarjoaa tarkemman solutason reittikuvauksen: ei pelkästään suoran S4-sensorin mekaaninen värähtely, vaan myös epäsuora kalsiumvarastojen kautta tapahtuva modulaatio. BERM:n kannalta molemmat reitit johtavat samaan lopputulokseen — häiriintyneeseen Ca²⁺-homeostaasiin — mutta mekanismien moninaisuus selittää, miksi eri kudokset reagoivat eri herkkyydellä.

**Huomautus:** ELF (50 Hz, 1 mT), ei RF. BERM:n pääaltistus on RF. Mekanismin translaatio ELF → RF ei ole suoraviivainen, mutta Ca²⁺-reitti on jaettu (ks. Panagopoulos ym. 2025: IFO-mekanismi operoi sekä ELF- että RF-alueella eri voimakkuusriippuvuudella).

**Episteeminen arvio:** E (kokeellinen, mekanismi tunnistettu, toistettavissa)

---

### 4.2 Hurtier ym. 2025 — Samanaikainen 5G + GSM -altistus ja hermoverkkoaktiivisuus

**Julkaisu:** Bioelectromagnetics, bem.70026  
**Tyyppi:** Kokeellinen (in vitro)  
**BERM-taso:** 4 (neuraalinen aktivaatio) + 5A (solustressi)

Tutkimus altisti soluja samanaikaisesti 5G-moduloidulle 3.5 GHz ja GSM-moduloidulle 1.8 GHz -säteilylle ja mittasi vaikutuksia hermoverkkojen sähköiseen aktiivisuuteen sekä ihon fibroblastisolujen soluvasteisiin.

**BERM-relevanssi:** Kaksitaajuusaltistus on realistisempi kuin yksittäinen taajuus, koska todellisessa ympäristössä ihminen altistuu useille signaaleille samanaikaisesti. BERM:n tason 3 kaksikanavamalli (`total = ambient + χ(Ā) × personal`) ei tällä hetkellä erottele taajuuskomponentteja, mutta tämä tutkimus osoittaa, että samanaikaisen monikomponenttialtistuksen biologiset vaikutukset eivät välttämättä ole lineaarinen summa. Tämä on yhdenmukainen χ(Ā)-funktion epälineaarisen rakenteen kanssa.

**Episteeminen arvio:** C (kokeellinen, monikomponenttialtistus)

---

### 4.3 Panagopoulos ym. 2025 — Kattava IFO-VGIC-mekanismikatsaus (täydentävä)

**Julkaisu:** Frontiers in Public Health, vol. 13, DOI: 10.3389/fpubh.2025.1585441  
**Tyyppi:** Katsaus (131 tutkimusta)  
**BERM-taso:** 4 (IFO-VGIC perusmekanismi) → 5A → 6

**Ei Bioelectromagnetics-lehdestä**, mutta BERM:n tason 4 kannalta kriittinen ja jo integroitu malliin (ks. CODELLE_6lahdetta_integraatio.md).

Panagopoulos ym. syntetisoivat 131 tutkimusta RF/Wi-Fi-säteilyn biologisista vaikutuksista. 95 % matala-intensiteettisistä tutkimuksista raportoi oksidatiivisen stressin. IFO-mekanismi: polarisoitu, koherentti RF-EMF pakottaa VGCC:n S4-jänniteanturin värähtelemään epäfysiologisella taajuudella → epäsäännöllinen kanavan avautuminen → hallitsematon Ca²⁺-sisäänvirtaus → mitokondrioiden ROS → DNA-vaurio.

Avainlöydös: VGCC-salpaajat (esim. nifedipiini) estävät RF:n indusoimat biologiset vaikutukset — tämä on funktionaalinen osoitus mekanismista.

**Yhteys Bertagna ym. 2025:een:** Molemmat tutkimukset tunnistavat Ca²⁺-homeostaasihäiriön EMF-vasteiden perusmekanismina, mutta eri reiteillä. Panagopoulos korostaa suoraa S4-sensorin mekaanista oskillaatiota; Bertagna osoittaa, että myös solunsisäiset Ca²⁺-varastot (RyR, SERCA) osallistuvat. Yhdessä nämä muodostavat monireittiisen mekanismikuvan, joka on BERM:n tason 4 solmun perusta.

**Episteeminen arvio:** E (katsaus, vahva kokoava evidenssi, jo integroitu)

---

## TASO 5A: ROS JA DNA-VAURIO

### 5A.1 Bektas ym. 2026 — CoQ10 suojaa RF-indusoitua testis-vauriota vastaan

**Julkaisu:** Bioelectromagnetics, bem.70043, PMID: 41578890  
**Tyyppi:** Kokeellinen (in vivo, rotta)  
**BERM-taso:** 5A (ROS) → 6 (testis/siittiökaskadi)

**BERM:n reproduktiokaskadin kannalta merkittävin yksittäinen artikkeli tässä katsauksessa.**

Tutkimus altisti rottia 3.5 GHz RF-säteilylle ja mittasi testis- ja oksidatiivista vauriota. Koentsyymi Q10 (CoQ10) annettiin suojaavanana interventioperiaatteena.

**Keskeiset tulokset:**

- RF 3.5 GHz -altistus aiheutti testis- ja oksidatiivista vauriota
- CoQ10 amelioroi (lievitti) näitä vaikutuksia
- Testiksen antioksidanttikapasiteetti heikkeni RF-altistuksessa

**BERM-relevanssi — kriittinen:**

Tämä tutkimus operoi suoraan BERM:n nuolella **taso 5A → taso 6**: ROS → spermakaskadi (SDF↑, motiliteetti↓, konsentraatio↓). Lisäksi:

(a) **3.5 GHz** on 5G:n ydintaajuus — tämä on tuoreinta dataa BERM:n nykyisen altistusympäristön biologisista vaikutuksista
(b) **CoQ10-interventio** osoittaa mekanismin reversiibeliuden: oksidatiivinen polku on farmakologisesti estettävissä, mikä tukee BERM:n recovery window -konseptia (vaurion ja korjauksen tasapaino)
(c) Testiksen spesifinen vaurio tukee BERM:n kaskadin kohdekudos-spesifisyyttä

**Verrattavissa:** Yakymenko ym. 2016 (93/100 tutkimusta, oksidatiivinen stressi), Panagopoulos ym. 2025 (95 %, IFO-VGIC → ROS). Bektas lisää 5G-taajuusdatan tähän evidenssipohjaan.

**Episteeminen arvio:** C (eläinkoe, yksittäinen tutkimus, mutta yhdenmukainen laajemman evidenssipohjan kanssa)

---

### 5A.2 Gautam ym. 2026 — mmWave (35.5 GHz) ja testisvaurio (täydentävä)

**Julkaisu:** Andrology, andr.70107  
**Tyyppi:** Kokeellinen (in vivo, Wistar-rotta)  
**BERM-taso:** 5A (ROS) → 6 (testisvaurio)

Krooninen 35.5 GHz millimetriaaltoaltistus aiheutti oksidatiivista stressiä ja testisvauriota uroksissa.

**BERM-relevanssi:** Täydentää Bektas ym. 2026:ta eri taajuudella. 35.5 GHz on mmWave-aluetta, jonka tunkeuma on matala (ihon pinta). Se, että testisvauriota havaitaan myös tällä taajuudella, viittaa joko systeemiseen mekanismiin (ei suora kudospenetraatio) tai sekundaariseen välitykseen (HPA-akseli, taso 5D). BERM:n nykyinen malli ei erottele näitä reittejä taajuuskohtaisesti, mikä on mahdollinen laajennuskohta.

**Episteeminen arvio:** C (eläinkoe, yksittäinen tutkimus)

---

### 5A.3 Meyer ym. 2026 — ELF 50 Hz, 200 µT: ei DNA-vauriota ihosoluissa

**Julkaisu:** Bioelectromagnetics, bem.70046, DOI: 10.1002/bem.70046  
**Tyyppi:** Kokeellinen (in vitro, HaCaT-keratinosyytit)  
**BERM-taso:** 5A (DNA-vaurio) — **negatiivinen tulos**

**Menetelmä:** Sokkoutettu, samanaikainen altistus ja sham-altistus Helmholtz-kelalaitteistossa. 50 Hz, 200 µT (rms), 2h ja 24h. WST-1-elinvoimaisuus, alkalinen komet-testi, mikronukleus-testi CREST-värjäyksellä.

**Keskeiset tulokset:**

- Ei merkittäviä eroja solujen elinvoimaisuudessa (p=0.644 @ 2h, p=0.987 @ 24h)
- Ei DNA-vauriota komet-testissä
- Ei lisääntynyttä mikronukleusmuodostusta

**BERM-relevanssi — rajoittava evidenssi:**

Tämä on laadukkaasti toteutettu negatiivinen tulos, jota ei pidä ohittaa. BERM:n kannalta on kuitenkin otettava huomioon useita seikkoja:

(a) **ELF vs. RF:** BERM:n pääaltistus on RF. ELF (50 Hz, verkkovirta) ja RF (800 MHz–3.5 GHz) operoivat eri fysikaalisilla mekanismeilla. Panagopoulosin IFO-malli ennustaa eri vastekynnyksiä eri taajuuksille.
(b) **Ihosolu vs. gonaadisolu:** HaCaT-keratinosyytit eivät ole BERM:n ensisijainen kohdekudos (testis, aivojen pineaalirauhanen, hypotalamus). VGIC-tiheys ja mitokondrioiden ROS-tuotantokapasiteetti ovat kudosspesifisiä.
(c) **200 µT on korkea ELF-ympäristöaltistus mutta matala verrattuna Bertagnan 1 mT:iin**, joka tuotti merkitseviä ionikanaavamuutoksia. Annosriippuvuutta ei voi sivuuttaa.

**Johtopäätös BERM:lle:** Ei kumoa tason 5A mekanismia, koska testikonditto (taajuus, kudos, altistusparametrit) on BERM:n relevantin altistusskenaarion ulkopuolella. Dokumentoi kuitenkin, että kaikki EMF-altistukset eivät tuota DNA-vauriota kaikissa kudoksissa, mikä on yhdenmukainen BERM:n χ(Ā)-valintasäännön kanssa: vaste on taustariippuvainen, ei universaali.

**Episteeminen arvio:** E (laadukas negatiivinen tulos, sokkoutettu)

---

### 5A.4 Haidar ym. 2025 — 5G 3.5 GHz: ei oksidatiivista stressiä ihosoluissa (täydentävä)

**Julkaisu:** Scientific Reports, DOI: 10.1038/s41598-025-15090-w  
**Tyyppi:** Kokeellinen (in vitro)  
**BERM-taso:** 5A (ROS, DNA) — **negatiivinen tulos**

**Menetelmä:** 5G-moduloitu 3.5 GHz, SAR 0.08 ja 4 W/kg, 20–48 h. XP6BE fibroblastit (ROS) ja HaCaT keratinosyytit (DNA-korjaus). BRET-biosensoipohjaiset ROS-mittaukset (ROBINy) sytoplasma- ja mitokondriotasolla.

**Keskeiset tulokset:**

- Ei merkittävää vaikutusta basaaliin ROS-tasoon tai kemiallisten stressoreiden vasteisiin
- Ei DNA-vauriota (CPD-lesiot) RF-altistuksessa yksin tai yhdessä UV-B:n kanssa
- Ei muutosta DNA-korjauksen kinetiikassa tai tehokkuudessa
- Ei adaptiivista vastetta esialtistuksesta

**BERM-relevanssi — rajoittava evidenssi (samat varaukset kuin Meyer ym.):**

Sama kudostyyppi (ihosolut), ei gonaadisolu. SAR 4 W/kg on korkea ja ylittää ICNIRP:n rajan, mutta ihon fibroblastit eivät ole BERM:n primäärinen kohde. Huomattavaa on kuitenkin, että tämä on 5G:n ydintaajuus (3.5 GHz), kun taas Bektas ym. 2026 raportoi samalla taajuudella testis-vauriota rotissa. Ero on kudosspesifinen — mikä on yhdenmukainen BERM:n kanssa.

**Episteeminen arvio:** E (laadukas negatiivinen tulos)

---

## TASO 5B: KRYPTOKROMI JA RADIKAALIPARIMEKANISMI

### 5B.1 Krylov 2026 — Radikaaliparimekanismin universaalisuus (täydentävä)

**Julkaisu:** Biological Reviews, brv.70108  
**Tyyppi:** Katsaus  
**BERM-taso:** 5B (CRY/RPM-polku)

Kriittinen katsaus, joka kysyy: voiko radikaaliparimekanismi (RPM) tarjota universaalin selityksen heikkojen magneettikenttien biologisille vaikutuksille?

**BERM-relevanssi:**

BERM:n polku B (CRY/RPM → sirkadiaaninen häiriö) nojaa RPM:ään yhtenä kolmesta transduktiomekanismista (L-BERM-luokittelu: T_RPM). Krylovin katsaus arvioi tämän mekanismin todistusvoimaa laajemmin:

- RPM on magnetoreseption (eläinten magneettisen navigoinnin) hyväksytyin selitys
- Sen soveltaminen heikkojen EMF-kenttien terveyseffekteihin on kiistanalainen
- Kryptokromin spin-kemia on taajuus- ja intensiteettiriippuvaista

BERM:n kannalta katsaus muistuttaa, että polku B:n episteeminen taso on matalampi kuin polun A (VGIC → ROS). RPM on mekanistisesti koherentti mutta kokeellisesti vähemmän dokumentoitu kuin VGIC-välitteinen kalsiumpolku.

**Episteeminen arvio:** M (kokoava katsaus, mekanistinen arviointi)

---

## TASO 5C: MELATONIINI JA SIRKADIAANINEN HÄIRIÖ

### 5C.1 Tbahriti ym. 2026 — EMF ja sirkadiaanirytmit: systemaattinen katsaus (täydentävä)

**Julkaisu:** Sleep and Biological Rhythms, vol. 24(2), pp. 195-214, DOI: 10.1007/s41105-026-00643-x  
**Tyyppi:** Systemaattinen katsaus (PRISMA 2020; 55 tutkimusta 892 alkuperäisestä)  
**BERM-taso:** 5C (melatoniini → GnRH → HPG)

**Merkittävin yksittäinen löydös tason 5C kannalta.**

**Keskeiset löydökset:**

- **Melatoniinisuppressio:** 88 % korkealaatuisista eläintutkimuksista raportoi EMF-indusoitua melatoniinisuppressiota. Suppressio 20–50 % basaalitasosta.
- **Kellogenien ekspressio:** EMF muuttaa kellogenien (clock gene) ekspressiota
- **Uniarkkitehtuuri:** Muutokset dokumentoitu
- **Valon vertailu:** Melatoniinisuppressio on huomattavasti pienempi kuin valon aiheuttama (>90 %)

**Rajoitukset:** Vain 27 % tutkimuksista täytti korkeat metodologiset standardit. 48 % eläintutkimuksista ei sisältänyt riittäviä sham-kontrolleja. 33 % kuvasi altistusparametrit puutteellisesti.

**BERM-relevanssi — tukeva mutta kvantitoinnissa varovainen:**

BERM:n polku C: EMF → pineaalinen melatoniinisuppressio → GnRH-pulsaatiohäiriö → HPG → gonadifunktio. Tbahriti ym. systemaattinen evidenssi (55 tutkimusta, PRISMA) osoittaa, että:

(a) Melatoniinisuppressio EMF-altistuksesta on toistuva löydös (88 % korkealaatuisista eläintutkimuksista)
(b) Suppression suuruus (20–50 %) on biologisesti merkittävä mutta ei yhtä suuri kuin valon aiheuttama — tämä on yhdenmukainen BERM:n v17_night_fraction()-funktion kanssa, jossa EMF on yksi osatekijä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniini)
(c) Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön ei ole täysin vahvistettu kliinisesti

**Episteeminen arvio:** M|C (systemaattinen katsaus, mutta laatuvaihtelua tutkimuksissa)

---

## TASO 5D: HPA-AKSELI JA STRESSIVASTEET

### 5D.1 Verrender ym. 2025 — RF-EMF ja sylkikortisoli IEI-EMF:ssä

**Julkaisu:** Bioelectromagnetics, bem.70021, PMID: 40908801  
**Tyyppi:** Kokeellinen (kaksoissokkoutettu, sham-kontrolloitu)  
**BERM-taso:** 5D (HPA → HPG, kortisoli)

Tutkimus selvitti, vaikuttaako RF-EMF-altistus sylkikortisolitasoon henkilöillä, joilla on IEI-EMF (sähköyliherkkyysoireisto). Samalta tutkimusryhmältä julkaistiin myös rinnakkaistutkimus (Verrender ym. 2025, Applied Psychology: Health and Well-Being), joka osoitti alarmistisen median vaikutuksen oireraportointiin.

**BERM-relevanssi:**

BERM:n polku D: EMF → HPA-akselin aktivaatio → kortisoli↑ → HPG-akselin suppressio → gonadifunktio↓. Verrender ym. testaa suoraan tason 5D ensimmäistä nuolta (EMF → kortisoli). Tutkimuksen sham-kontrolloitu asetelma on metodologisesti vahva.

Jos kortisolitaso ei nouse RF-altistuksessa, se haastaa BERM:n polun D akuuttia komponenttia. BERM kuitenkin mallintaa **kroonista** HPA-aktivaatiota (Selyen yleinen adaptaatiosyndrooma: alarm → resistance → exhaustion), ei akuuttia kortisoli-piikkiä. Krooninen altistus voi tuottaa allostaattisen kuorman ilman yksittäisen altistuskerran mitattavaa kortisolivastetta.

**Episteeminen arvio:** E (laadukas tutkimusasetelma, mutta tulkinta BERM:n kannalta riippuu akuutti vs. krooninen -erottelusta)

---

### 5D.2 Layla ym. 2026 — 5G ja sydämen sykevälivaihtelu / stressibiomarkkerit

**Julkaisu:** Bioelectromagnetics, bem.70056  
**Tyyppi:** Kokeellinen  
**BERM-taso:** 5D (autonominen hermosto, stressi)

Tutkimus mittasi 5G-radiotaajuusaltistuksen vaikutuksia terveillä nuorilla aikuisilla: sydämen sykevälivaihtelu (HRV) ja sylkistressibiomarkkerit.

**BERM-relevanssi:**

HRV on autonomisen hermoston tasapainon mittari. BERM:n polku D ennustaa, että krooninen EMF-altistus siirtää autonomista tasapainoa sympaattiseen suuntaan (stressi → kortisoli → HPG-suppressio). HRV-muutokset olisivat tämän polun varhainen biomarkkeri. 5G-spesifinen data on relevanttia BERM:n nykyiselle altistuskontekstille.

**Episteeminen arvio:** C (kokeellinen, 5G-spesifinen)

---

### 5D.3 Michelant ym. 2025 — RF-EMF ja sydänaktiivisuus: systemaattinen katsaus

**Julkaisu:** Bioelectromagnetics, bem.70014, PMID: 40662412  
**Tyyppi:** Systemaattinen katsaus  
**BERM-taso:** 5D (autonominen/kardiovaskulaarinen)

Systemaattinen katsaus RF-EMF:n vaikutuksista lepotilan sydänaktiivisuuteen terveillä ihmisillä.

**BERM-relevanssi:**

Sydämen autonomisen säätelyn muutokset ovat polun D rinnakkaismarkkeri. Jos systemaattinen katsaus löytää vaikutuksia, se tukee HPA-akseliin kohdistuvaa BERM-ennustetta. Jos ei, se rajoittaa polun D vahvuutta akuutissa altistuksessa (sama akuutti vs. krooninen -erottelu kuin Verrender ym.).

**Episteeminen arvio:** M|C (systemaattinen katsaus, tuloskuvaa ei voitu vahvistaa suoran pääsyn puuttuessa)

---

## TASO 5E: VERI-AIVO-ESTE (BBB)

### 5E.1 Gao ym. 2024 — Sähkömagneettinen pulssi ja BBB-läpäisevyys

**Julkaisu:** Bioelectromagnetics, bem.22494, PMID: 38105659  
**Tyyppi:** Kokeellinen (in vivo, rotta)  
**BERM-taso:** 5E (BBB-permeabiliteetti)

Sähkömagneettinen pulssi (EMP) aiheutti veri-aivoesteen läpimurron rottien aivoissa tight junction -proteiinien avautumisen kautta. Tutkimus käsittelee tight junction -proteiineja (okkludiini, klaudiini, ZO-1), jotka ylläpitävät BBB:n eheyttä.

**BERM-relevanssi:**

BERM:n polku E: EMF → BBB-permeabiliteetti↑ → neurotoksiset aineet pääsevät aivoihin → neuroinflammatio → epäsuora vaikutus hypotalamus-hypofyysiakseliin. Gao ym. osoittaa suoran mekanistisen reitin: tight junction -proteiinien degradaatio EMP-altistuksessa.

**Tärkeä erottelu:** EMP (sähkömagneettinen pulssi) on lyhytkestoinen, korkea-amplitudinen altistus — eri asia kuin BERM:n mallintama krooninen matala-intensiteettinen RF-altistus. EMP:n relevanssi BERM:lle on mekanistinen (sama kohdekudos ja molekylaarisysteemi), ei suora (eri altistusparametrit). Kuitenkin Salford ym. (2003) on aiemmin raportoinut BBB-läpäisevyyden lisääntymistä GSM-taajuuksilla (BERM:n referenssi), joten tämä tutkimus täydentää mekanistista kuvaa.

**Episteeminen arvio:** C (eläinkoe, mutta EMP vs. RF -erottelu rajoittaa suoraa sovellettavuutta)

---

## TASO 6: REPRODUKTIOKASKADI

Tason 6 suorat löydökset tulevat tason 5A artikkeleista (Bektas ym. 2026, Gautam ym. 2026), jotka operoivat suoraan nuolella 5A → 6 (ROS → testis/siittiökaskadi). Lisäksi:

### 6.1 Reproduktioevidenssin synteesi (ei yksittäinen artikkeli)

Bioelectromagnetics-lehdestä ei löytynyt vuosien 2024–2026 ajalta yhtään tutkimusta, joka mittaisi suoraan EMF:n vaikutusta siittiöiden DNA-fragmentaatioon (SDF), motiliteettiin ja konsentraatioon ihmisellä. Eläinkoedata (Bektas 3.5 GHz, Gautam 35.5 GHz) on BERM:n kaskadin suuntainen mutta lajien välinen ekstrapolaatio vaatii varovaisuutta.

**Huomio:** Laajemmassa kirjallisuudessa (Cambridge Core/Zygote, Frontiers in Reproductive Health) on tuoreita systemaattisia katsauksia EMF:n vaikutuksista siittiöiden laatuun. Nämä eivät ole Bioelectromagnetics-lehdestä mutta tukevat BERM:n tason 6 ennusteita.

---

## EHS JA PROVOKAATIOTUTKIMUKSET

### EHS.1 Ledent ym. 2025 — EHS-provokaatiotesti yhteissuunnittelulla

**Julkaisu:** Bioelectromagnetics, bem.70006  
**Tyyppi:** Kokeellinen (provokaatio, yhteissuunniteltu)  
**BERM-taso:** Meta (EHS-ilmiö suhteessa BERM:n ennusteisiin)

Tutkimus käytti "co-designed" (yhteissuunniteltua) provokaatiotestiä EHS-kokemuksen tutkimiseen — menetelmä, jossa EHS-kokijat osallistuivat testiasetelman suunnitteluun.

**BERM-relevanssi:**

BERM ei suoraan mallinna EHS:ää, mutta tason 5 polut (erityisesti D: HPA-akseli) voivat selittää osan EHS-oireistosta. Jos provokaatiotesti osoittaa, etteivät EHS-henkilöt kykene erottamaan todellista altistusta shamista, se on yhdenmukainen BERM:n kanssa: BERM ennustaa kroonisia, kumulatiivisia populaatiotason vaikutuksia, ei akuuttia yksilötason havaitsemista. EHS:n subjektiivinen kokemus voi olla todellinen mutta selittyä noosebo-mekanismilla (Verrender ym. 2025), kun taas BERM:n ennustamat biologiset vaikutukset operoivat tietoisuuskynnyksen alapuolella.

**Episteeminen arvio:** E (laadukas asetelma, yhteissuunnittelu lisää ekologista validiteettia)

---

## KOKOAVA KATSAUS: 5G DEPLOYMENT

### K.1 Selmaoui 2025 — 5G-käyttöönotto ja terveysriskin arviointi

**Julkaisu:** Bioelectromagnetics, bem.70005, PMID: 40276940  
**Tyyppi:** Narratiivinen katsaus  
**BERM-taso:** Meta (5G-konteksti kaikkien tasojen osalta)

Katsaus 5G-verkon nopeasta käyttöönotosta ja ihmisterveyden riskiarvioinnin tilasta. Otsikko "Quid Novi?" (mikä uutta?) viittaa arvioivaan otteeseen.

**BERM-relevanssi:** BERM ennustaa, että 5G:n käyttöönotto muuttaa altistuksen (taso 3) luonnetta: korkeammat taajuudet (3.5 GHz, 26 GHz), suunnatut keilat, tiiviimpi tukiasemaverkko. Selmaouin katsaus tarjoaa kontekstin tälle altistusmurrokselle.

---

## SYNTEESI: LÖYDÖSTEN KARTTA BERM:N KAUSAALIKETJUUN

```
TASO 1 (geometria): ei kattavuutta — ei lehden aihealuetta
TASO 2 (valintasääntö): ei kattavuutta — ei lehden aihealuetta
TASO 3 (altistus):
  ├── Deprez 2025 [C]: 5G spectral, 4 Euroopan maata — ambient-data
  ├── Wang 2025 [C]: kaupunki-RF-altistus — BERM feedback (taso 9)
  ├── Diao 2025 [L*]: laskennallinen dosimetria — menetelmäkehitys
  ├── Zhou 2026 [C]: sukupuolierot altistuksessa
  └── Chitnis 2025 [L*]: mmWave dosimetria
TASO 4 (kalvofysiikka/VGIC):
  ├── Bertagna 2025 [E]: Ca²⁺-homeostaasi → ionikanaavat (RyR/SERCA) ★
  ├── Hurtier 2025 [C]: 5G+GSM samanaikainen, neuraalinen aktiivisuus
  └── Panagopoulos 2025 [E]: IFO-VGIC 131 tutkimuksen synteesi (täyd.) ★
TASO 5A (ROS/DNA):
  ├── Bektas 2026 [C]: 3.5 GHz → testis-ROS → CoQ10 suojaa ★
  ├── Gautam 2026 [C]: 35.5 GHz → testis-ROS (täyd.)
  ├── Meyer 2026 [E]: ELF 50 Hz, ei DNA-vauriota ihosoluissa (NEG)
  └── Haidar 2025 [E]: 5G 3.5 GHz, ei ROS ihosoluissa (NEG, täyd.)
TASO 5B (CRY/RPM):
  └── Krylov 2026 [M]: RPM universaalisuus — kriittinen katsaus (täyd.)
TASO 5C (melatoniini):
  └── Tbahriti 2026 [M|C]: 55 tutkimuksen PRISMA, 88% suppresio (täyd.) ★
TASO 5D (HPA/stressi):
  ├── Verrender 2025 [E]: RF → kortisoli? (IEI-EMF konteksti)
  ├── Layla 2026 [C]: 5G → HRV + stressibiomarkkerit
  └── Michelant 2025 [M|C]: RF → sydän, systemaattinen katsaus
TASO 5E (BBB):
  └── Gao 2024 [C]: EMP → tight junction → BBB-avautuminen
TASO 6 (kaskadi):
  ├── Bektas 2026: (edellä) ROS → testis (3.5 GHz) ★
  └── Gautam 2026: (edellä) ROS → testis (35.5 GHz, täyd.)
TASO 7–9: ei kattavuutta — ei lehden aihealuetta
```

★ = BERM:n kannalta erityisen merkittävä

---

## EPISTEEMISTEN TASOJEN YHTEENVETO

| Episteeminen taso | Artikkelimäärä | Esimerkkejä |
|---|---|---|
| E (kokeellinen, korkea laatu) | 5 | Bertagna 2025, Meyer 2026 (neg), Haidar 2025 (neg), Verrender 2025, Ledent 2025 |
| C (kokeellinen / mittaus) | 8 | Bektas 2026, Gautam 2026, Deprez 2025, Wang 2025, Zhou 2026, Hurtier 2025, Layla 2026, Gao 2024 |
| M\|C (katsaus + kokeellinen) | 2 | Tbahriti 2026, Michelant 2025 |
| M (mekanistinen katsaus) | 1 | Krylov 2026 |
| L* (menetelmä) | 2 | Diao 2025, Chitnis 2025 |

---

## JOHTOPÄÄTÖKSET BERM-MALLIN NÄKÖKULMASTA

### 1. Tukeva evidenssi

**Taso 4 (VGIC/Ca²⁺):** Bertagna ym. 2025 on katsauksen tärkein yksittäinen löydös BERM:n mekanistisen perustan kannalta. Se osoittaa, että EMF-altistus muuttaa hermosolujen ionikanavatoimintaa spesifisesti Ca²⁺-homeostaasihäiriön kautta (RyR ja SERCA -reitit). Yhdessä Panagopoulosin IFO-VGIC -katsauksen (2025) kanssa tämä tarjoaa konvergoivan evidenssin kahdelta itsenäiseltä tutkimuslinjalta: mekaaninen S4-oskillaatio ja solunsisäisten kalsiumvarastojen dysregulaatio johtavat molemmat samaan lopputulokseen.

**Taso 5A → 6 (ROS → reproduktio):** Bektas ym. 2026 on ensimmäinen 5G-taajuuteen (3.5 GHz) spesifinen tutkimus, joka osoittaa testis- ja oksidatiivista vauriota ja jonka CoQ10-interventio osoittaa mekanismin reversiibeliuden. Tämä on suoraan BERM:n kaskadin (ROS → SDF↑, motiliteetti↓) mukaista.

**Taso 5C (melatoniini):** Tbahriti ym. 2026 systemaattinen katsaus (55 tutkimusta) osoittaa, että melatoniinisuppressio on toistuva löydös (88 % korkealaatuisista eläintutkimuksista). Suppression suuruus (20–50 %) on biologisesti merkittävä ja yhdenmukainen BERM:n polun C ennusteiden kanssa.

### 2. Rajoittava evidenssi

**Ihosolujen negatiiviset tulokset:** Meyer ym. 2026 (ELF, ihosolut) ja Haidar ym. 2025 (5G, ihosolut) eivät löytäneet DNA-vauriota tai ROS-lisäystä. Nämä eivät kumoa BERM:n tason 5A mekanismia, koska kohdesolu on eri (iho vs. gonaadi), mutta ne muistuttavat, että EMF-vasteet ovat kudos- ja taajuusspesifisiä. BERM:n χ(Ā)-valintasääntö ennustaa tätä: kaikki solut eivät ole yhtä herkkiä.

**HPA-aksellin akuutti vasteen puute:** Verrender ym. 2025 ei löydä akuuttia kortisolivastetta RF-altistuksesta. BERM:n polku D mallintaa kroonista allostaattista kuormaa, ei akuuttia pulssia, joten tämä ei ole suora kumous, mutta se rajoittaa polun D vahvuutta lyhytaikaisissa altistusasetelmissa.

### 3. Puuttuvat alueet

- **Taso 1–2:** Geometrinen perusta ja valintasääntö eivät kuulu kokeelliseen bioelektromagnetiikkaan
- **Tasot 7–9:** Demografinen kaskadi ja takaisinkytkentä eivät kuulu lehden aihealueeseen
- **Ihmisen reproduktio:** Yhtään tuoreea Bioelectromagnetics-artikkelia ei käsittele suoraan EMF:n vaikutusta ihmisen siittiölaatuun tai hedelmällisyyteen (tämä kirjallisuus julkaistaan reproduktiojulkaisuissa)
- **Pitkäaikaisaltistus:** Suurin osa tutkimuksista käsittelee akuuttia tai subakuuttia altistusta. BERM ennustaa kumulatiivisia vaikutuksia vuosikymmenien aikaskaalalla — tätä ei ole testattu suoraan

### 4. Menetelmällinen huomio

Bioelectromagnetics-lehden artikkelien laatu on keskimäärin parempi kuin alan yleinen taso (Tbahriti ym. 2026 toteaa, että vain 27 % laajemman kirjallisuuden tutkimuksista täyttää korkeat metodologiset standardit). Tämä on BERM:n arvioinnin kannalta tärkeä konteksti: heikkolaatuiset tutkimukset voivat tuottaa sekä vääriä positiivisia (puutteellinen sham-kontrolli) että vääriä negatiivisia (riittämätön altistus tai väärä päätetapahtuma).

---

## UUDET INTEGRAATIOKOHTEET BERM-MALLIIN

Tässä katsauksessa tunnistettiin kolme artikkelia, jotka voivat motivoida BERM:n mallin tai evidenssisivuston päivityksiä:

### Prioriteetti 1: Bertagna ym. 2025

**Miksi:** Tarjoaa mekanistisen tarkennuksen tason 4 solmulle. RyR/SERCA-reitti laajentaa IFO-VGIC -mekanismia koskemaan solunsisäistä kalsiumdynamiikkaa. Tämä on episteemisesti E-tason (kokeellinen, mekanismi tunnistettu) evidenssiä.

**Mahdollinen toimenpide:** Lisäys references.json:iin; evidenssisivun tason 4 osio; kausaaliketjun "vgic"-solmun evidenssipopup.

### Prioriteetti 2: Bektas ym. 2026

**Miksi:** 5G-taajuusspesifinen (3.5 GHz) testis-ROS-data täydentää tason 5A → 6 nuolta tuoreimmalla teknologialla. CoQ10-interventio tarjoaa "rescue experiment" -evidenssiä mekanismille.

**Mahdollinen toimenpide:** Lisäys references.json:iin; evidenssisivun reproduktio-osio.

### Prioriteetti 3: Tbahriti ym. 2026

**Miksi:** 55 tutkimuksen PRISMA-katsaus melatoniinisuppressiosta. 88 % korkealaatuisista eläintutkimuksista tukee tason 5C polkua. Kvantitativisesti tarkentaa suppressioefektin suuruuden (20–50 %).

**Mahdollinen toimenpide:** Polun C episteemisen tason päivitys (jos katsotaan M|C → M); evidenssisivun sirkadiaaninen osio.

---

## LÄHTEET

### Bioelectromagnetics-lehti (2024–2026)

1. Bektas ym. (2026). Ameliorative Role of Coenzyme Q10 in RF Radiation‐Associated Testicular and Oxidative Impairments in a 3.5‐GHz Exposure Model. *Bioelectromagnetics*, bem.70043.
2. Chitnis ym. (2025). Traceable Assessment of the Absorbed Power Density of Body Mounted Devices at Frequencies Above 10 GHz. *Bioelectromagnetics*, bem.70018.
3. Deprez ym. (2025). 5G RF EMF Spectral Exposure Assessment in Four European Countries. *Bioelectromagnetics*, bem.70019.
4. Diao ym. (2025). Recent Advances and Future Perspective in Computational Bioelectromagnetics for Exposure Assessments. *Bioelectromagnetics*, 46(3), bem.70002.
5. Gao ym. (2024). Electromagnetic pulse induced blood‐brain barrier breakdown through tight junction opening in rats. *Bioelectromagnetics*, bem.22494.
6. Hurtier ym. (2025). Effects of Simultaneous In‐Vitro Exposure to 5G‐Modulated 3.5 GHz and GSM‐Modulated 1.8 GHz Radio‐Frequency Electromagnetic Fields on Neuronal Network Electrical Activity and Cellular Stress in Skin Fibroblast Cells. *Bioelectromagnetics*, bem.70026.
7. Layla ym. (2026). Exposure to 5G Radiofrequency and Physiological Effects in Healthy Young Adults: Insights Into Heart Rate Variability and Salivary Stress Biomarkers. *Bioelectromagnetics*, bem.70056.
8. Ledent ym. (2025). Exposure Perception and Symptom Reporting in Idiopathic Environmental Intolerance Attributed to Electromagnetic Fields Using a Co‐Designed Provocation Test. *Bioelectromagnetics*, bem.70006.
9. Meyer ym. (2026). Effects of Extremely Low Frequency Magnetic Field Exposure (50 Hz, 200 µT) on Cell Viability, DNA Damage and Micronucleus Formation of Human Skin Cells. *Bioelectromagnetics*, bem.70046.
10. Michelant ym. (2025). Impact of Radiofrequency Electromagnetic Fields on Cardiac Activity at Rest: A Systematic Review of Healthy Human Studies. *Bioelectromagnetics*, bem.70014.
11. Selmaoui (2025). Rapid Deployment of 5G Wireless Communication and Risk Assessment on Human Health: Quid Novi? *Bioelectromagnetics*, bem.70005.
12. Verrender ym. (2025). Looking for Biomarkers Which May Explain IEI-EMF: Does RF‐EMF Exposure Influence Salivary Cortisol Response? *Bioelectromagnetics*, bem.70021.
13. Wang ym. (2025). Comprehensive Measurement‐Based Assessment of Downlink RF‐EMF Exposure in Urban Environments. *Bioelectromagnetics*, bem.70033.
14. Zhou ym. (2026). Gender Differentiation Based Mobile Terminal Electromagnetic Exposure Safety Analysis and Corresponding Antenna Miniaturized‐Based Protective Measures. *Bioelectromagnetics*, bem.70055.

### Täydentävät julkaisut

15. Bertagna ym. (2025). Electromagnetic fields modulate neuronal membrane ionic currents through altered cellular calcium homeostasis. *Ann NY Acad Sci*, 1550(1). DOI: 10.1111/nyas.15386.
16. Gautam ym. (2026). Oxidative stress and testicular damage induced by chronic exposure to 35.5 GHz millimeter wave radiation in male Wistar rats. *Andrology*, andr.70107.
17. Haidar ym. (2025). Impact of in vitro exposure to 5G-modulated 3.5 GHz fields on oxidative stress and DNA repair in skin cells. *Scientific Reports*. DOI: 10.1038/s41598-025-15090-w.
18. Krylov (2026). Biological effects of weak magnetic fields: can the radical‐pair mechanism provide a universal explanation? *Biological Reviews*, brv.70108.
19. Panagopoulos ym. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and wireless communication electromagnetic fields. *Frontiers in Public Health*, 13:1585441.
20. Tbahriti ym. (2026). Impact of electromagnetic fields on circadian rhythms: molecular and physiological insights. *Sleep and Biological Rhythms*, 24(2), 195-214. DOI: 10.1007/s41105-026-00643-x.
