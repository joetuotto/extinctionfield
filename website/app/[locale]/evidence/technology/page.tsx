import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Zap, Smartphone, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

interface TechProfile {
  name: string;
  channel: string;
  frequency: string;
  modulation: string;
  proximity: string;
  dutyCycle: string;
  bermRole: string;
  verified: string;
  keyRef: string;
}

interface TechLayer {
  id: string;
  label: string;
  period: string;
  technologies: string[];
  bermChannel: string;
  biologicalEffect: string;
  healthSignal: string;
  keyInsight: string;
}

const TECH_PROFILES: TechProfile[] = [
  {
    name: "Power grid (50/60 Hz)",
    channel: "ELF",
    frequency: "50/60 Hz",
    modulation: "Sinusoidal CW",
    proximity: "0.5–3 m (wiring in walls)",
    dutyCycle: "24/7/365",
    bermRole: "PRIMER — upregulates VGCC expression, sensitizes cells to all other frequencies",
    verified: "partial",
    keyRef: "PMC4757866: ELF increases Ca²⁺ channel expression",
  },
  {
    name: "WiFi router (2.4/5/6 GHz)",
    channel: "RF + hidden ELF (10 Hz beacon)",
    frequency: "2.4–6 GHz carrier, 10 Hz beacon pulse",
    modulation: "OFDM bursts + 10 Hz beacon",
    proximity: "1–10 m whole apartment",
    dutyCycle: "24/7 (beacon even without data traffic)",
    bermRole: "HIDDEN ELF SOURCE — 10 Hz pulse 24/7. Crest factor 100:1. Biological effect proportional to PEAK not average. SAR systematically underestimates.",
    verified: "confirmed",
    keyRef: "Schmid 2012: modulation-specific EEG effects. Crest factor 100:1 (Schmid 2020).",
  },
  {
    name: "GSM/2G (900/1800 MHz)",
    channel: "RF + embedded ELF (217 Hz TDMA)",
    frequency: "900/1800 MHz carrier, 217 Hz frame rate",
    modulation: "TDMA pulse 217 Hz (ELF on RF)",
    proximity: "Ear (call) / pocket (standby)",
    dutyCycle: "Call-only initially, standby continuous",
    bermRole: "MOST IMPORTANT MODULATION CHANGE IN HISTORY. NMT→GSM = analog→digital = CW→pulse. Lower SAR but HIGHER bioactivity. Neurons respond to pulse but NOT CW.",
    verified: "confirmed",
    keyRef: "Panagopoulos 2019: pulsed > CW. 900 MHz pulsed: neuron response. CW: no response.",
  },
  {
    name: "4G/LTE",
    channel: "RF",
    frequency: "700–2600 MHz",
    modulation: "OFDM, always-on",
    proximity: "Body contact 16 h/day (pocket, hand, bed)",
    dutyCycle: "~100% (background sync continuous)",
    bermRole: "ALWAYS-ON BODY CONTACT. 2012 inflection = not content change but DEVICE change. Testes in near-field 16 h/day → sperm decline doubles.",
    verified: "confirmed (temporal correlation)",
    keyRef: "Levine 2023: decline doubles post-2000. Haidt 2024: 2012 inflection point.",
  },
  {
    name: "5G FR1 (3.5 GHz)",
    channel: "RF",
    frequency: "600–6000 MHz",
    modulation: "OFDM + beamforming",
    proximity: "Body contact + directed beam",
    dutyCycle: "Continuous",
    bermRole: "CACNA1C genotype determines response. ETH Zürich nimodipine trial (NCT06998368) is DIRECT BERM TEST.",
    verified: "confirmed",
    keyRef: "Sousouri 2025 (NeuroImage): CACNA1C-dependent 5G sleep EEG response.",
  },
  {
    name: "LED lighting (SMPS driver)",
    channel: "IF (20–300 kHz)",
    frequency: "20–300 kHz switching + PWM harmonics",
    modulation: "Switching transients + PWM dimming",
    proximity: "0.3–3 m (desk, ceiling, screen backlight)",
    dutyCycle: "8–16 h/day (all lit hours)",
    bermRole: "IF CHANNEL OPENER. EU ban 2009–2012 forced 100% adoption. TTFields (200 kHz, FDA-approved) proves IF activates Cav1.2. LEAST REGULATED, FASTEST GROWING.",
    verified: "confirmed (IF gap recognized by WHO 2007)",
    keyRef: "WHO 2007: IF research high priority. TTFields: 200 kHz activates Cav1.2.",
  },
  {
    name: "Electric vehicle (inverter/motor)",
    channel: "ELF + IF (5–50 kHz)",
    frequency: "50 Hz (motor) + 5–50 kHz (inverter)",
    modulation: "PWM",
    proximity: "0.5–1.5 m in cabin",
    dutyCycle: "1–4 h/day driving",
    bermRole: "IF IN CABIN. Pelvis in near-field during driving. Israeli patent US12379429: active cancellation system = industry KNOWS there is a problem.",
    verified: "confirmed (JACC:Asia 2025)",
    keyRef: "JACC:Asia 2025: cardiovascular concerns. Israeli patent: active field cancellation.",
  },
  {
    name: "Induction cooker",
    channel: "IF (20–100 kHz)",
    frequency: "20–100 kHz",
    modulation: "Resonant switching",
    proximity: "0.1–0.5 m (abdomen, pelvis)",
    dutyCycle: "0.5–2 h/day",
    bermRole: "HIGH POWER IF at pelvis level. Pregnant women: fetus in near-field.",
    verified: "partial (data limited)",
    keyRef: "Tokinobu 2021 (Kyushu cohort).",
  },
  {
    name: "Bluetooth earbuds",
    channel: "RF (2.4 GHz)",
    frequency: "2.4 GHz",
    modulation: "FHSS (frequency hopping)",
    proximity: "CONTACT (ear canal)",
    dutyCycle: "2–8 h/day",
    bermRole: "Low SAR but CONTACT with temporal lobe. Inner ear hair cells use Cav1.3. Long-term cumulative effects UNSTUDIED.",
    verified: "insufficient data",
    keyRef: "WHO 2023: longitudinal data scarce.",
  },
  {
    name: "Base stations",
    channel: "RF (800–3500 MHz)",
    frequency: "Technology-dependent",
    modulation: "Technology-dependent",
    proximity: "Far-field (50–500 m urban)",
    dutyCycle: "24/7",
    bermRole: "BACKGROUND FIELD. Individual phone is dominant source. MODULATION matters more than distance.",
    verified: "mixed",
    keyRef: "Multiple reviews with inconsistent results.",
  },
  {
    name: "Data centers",
    channel: "ELF + IF + RF (multiband)",
    frequency: "50 Hz + 20–200 kHz + 2.4–5 GHz",
    modulation: "Complex multi-source",
    proximity: "Workers: 0–10 m. Neighbors: 50–500 m",
    dutyCycle: "24/7",
    bermRole: "HIGHEST MULTI-BAND EXPOSURE for workers. AI boom → massive expansion. NO occupational health studies specific to data center EMF.",
    verified: "no data",
    keyRef: "None — research gap.",
  },
  {
    name: "LED street lights",
    channel: "IF (20–300 kHz)",
    frequency: "SMPS driver frequencies",
    modulation: "Switching + PWM",
    proximity: "3–10 m (pedestrians)",
    dutyCycle: "Dusk to dawn (8–14 h)",
    bermRole: "OUTDOOR IF 24/7. Combined with light→melatonin↓. Boyes 2021: LED street lights reduce insect populations more than sodium lamps.",
    verified: "partial (ecological data)",
    keyRef: "Boyes 2021 (Science Advances).",
  },
  {
    name: "Wireless charging",
    channel: "IF (85–205 kHz)",
    frequency: "Qi: 87–205 kHz",
    modulation: "Resonant magnetic coupling",
    proximity: "0–0.3 m (phone on pad)",
    dutyCycle: "Charging duration (1–4 h/day)",
    bermRole: "IF at short range. Often bedside (nighttime exposure during sleep). Growing adoption.",
    verified: "no data",
    keyRef: "None — research gap.",
  },
  {
    name: "Starlink/LEO satellites",
    channel: "RF (10.7–12.7 GHz downlink)",
    frequency: "Ku-band",
    modulation: "Digital",
    proximity: "Far-field (global coverage)",
    dutyCycle: "24/7 (global RF floor rises)",
    bermRole: "ELIMINATES LAST EMF-FREE ZONES. Control populations (Tsimane, Hadza) will be contaminated by ~2030. IRREVERSIBLE loss of verification capacity.",
    verified: "no data (too new)",
    keyRef: "None — emerging concern.",
  },
];

const VERIFIED_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/20 text-green-400",
  partial: "bg-amber-500/20 text-amber-400",
  mixed: "bg-amber-500/20 text-amber-400",
  "insufficient data": "bg-red-500/20 text-red-400",
  "no data": "bg-red-500/20 text-red-400",
  "no data (too new)": "bg-red-500/20 text-red-400",
  "confirmed (temporal correlation)": "bg-green-500/20 text-green-400",
  "confirmed (IF gap recognized by WHO 2007)": "bg-green-500/20 text-green-400",
  "confirmed (JACC:Asia 2025)": "bg-green-500/20 text-green-400",
  "partial (data limited)": "bg-amber-500/20 text-amber-400",
  "partial (ecological data)": "bg-amber-500/20 text-amber-400",
};

const COPY = {
  en: {
    title: "Technology-Specific Exposure",
    subtitle:
      "Modern EMF exposure is not one signal — it is 5–12 simultaneous sources spanning 10 orders of magnitude in frequency. Each technology generation added a new layer; CaMKII integrates them all.",
    backLink: "← Back to Evidence",

    elfTitle: "The ELF Priming Hypothesis",
    elfBody:
      "The power grid does not merely add 50/60 Hz exposure. It upregulates voltage-gated calcium channel expression in neurons (P/Q, N, and R subtypes increase after 8–10 days of ELF exposure — PMC4757866). This means the power grid makes every cell more sensitive to every other EMF source: WiFi, 4G, 5G, LED, Bluetooth.",
    elfImplication:
      "This explains why residential electricity consumption is the strongest predictor of fertility decline (RMSE 0.522) while mobile phone density is the weakest (RMSE 1.053): electricity measures the priming state, not just one exposure source.",
    elfWithout: "Without ELF priming (Amish, Tsimane)",
    elfWithoutDetail:
      "VGCC expression = baseline. RF stimulus → Ca²⁺ response = X. CaMKII threshold NOT crossed. Recovery complete.",
    elfWith: "With ELF priming (electrified home)",
    elfWithDetail:
      "50 Hz continuous → VGCC expression = 2–3× baseline. Same RF stimulus → Ca²⁺ response = 2–3X. CaMKII threshold CROSSED. Autophosphorylation → self-sustaining. Recovery incomplete.",

    superTitle: "Superadditivity: Three Mechanisms",
    superLead:
      "Different frequencies activate different VGCC subtypes, but CaMKII integrates all Ca²⁺ regardless of source. When total Ca²⁺ load crosses the autophosphorylation threshold, the effect becomes self-sustaining and progressive.",
    superMech1Title: "CaMKII threshold integration",
    superMech1:
      "50 Hz → Cav3 (T-type) → Ca²⁺ +60% of threshold. 10 Hz WiFi beacon → CRY → melatonin↓ → +40%. 217 Hz GSM → IFO → +60%. 2.4 GHz WiFi → Cav1.2 → +30%. 20–100 kHz LED → Cav1.2 → +20%. Alone: none crosses 100%. Together: 60+40+60+30+20 = 210% → CaMKII autophosphorylates → PERMANENT.",
    superMech2Title: "ELF-induced channel upregulation",
    superMech2:
      "50 Hz continuous → VGCC expression ↑ (PMC4757866) → same RF/IF stimulus → larger Ca²⁺ response → ELF priming × RF trigger = multiplicative.",
    superMech3Title: "Recovery prevention",
    superMech3:
      "Single exposure: Ca²⁺ ↑ → pause → recovery. Multi-band 24/7: 50 Hz continuous (grid) + 10 Hz continuous (WiFi beacon) + 4G near-continuous (background sync) + LED IF 8–16 h/day → recovery window = 0 → CaMKII stays activated continuously → every day adds cumulation.",

    layersTitle: "Five Technology Layers",
    layersLead:
      "Each generation stacked on top of existing layers. The biological effect is not additive — it is superadditive.",
    layers: [
      {
        id: "layer1",
        label: "Foundation Layer",
        period: "~1920–1990",
        technologies: ["Power grid 50/60 Hz"],
        bermChannel: "ELF (primary)",
        biologicalEffect:
          "CRY disruption → melatonin↓. VGCC expression upregulation (PRIMING). Slow cumulative Ca²⁺ dysregulation.",
        healthSignal:
          "Sleep disorders emerge as modern phenomenon. Early cancer clusters near power lines (Wertheimer 1979).",
        keyInsight:
          "This layer does not just add ELF exposure — it PRIMES all cells for enhanced sensitivity to every subsequent technology layer.",
      },
      {
        id: "layer2",
        label: "Pulse Layer",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + 217 Hz TDMA pulse)"],
        bermChannel: "RF + embedded ELF (217 Hz pulse)",
        biologicalEffect:
          "GSM pulse is more bioactive than CW (Panagopoulos 2019). Neurons respond to pulse but NOT CW at same frequency. Phone at EAR → brain in near-field.",
        healthSignal:
          "Sperm decline accelerates post-2000 (1.16→2.64%/yr, Levine 2023).",
        keyInsight:
          "The NMT→GSM transition (analog→digital) is the single most important modulation change in history. Lower SAR but HIGHER bioactivity.",
      },
      {
        id: "layer3",
        label: "Saturation Layer",
        period: "2005–2012",
        technologies: ["WiFi routers (2.4 GHz + 10 Hz beacon)", "3G/UMTS", "Early smartphones"],
        bermChannel: "RF + ELF (WiFi beacon 10 Hz) + ELF (50 Hz)",
        biologicalEffect:
          "WiFi beacon adds THIRD ELF source. Crest factor 100:1. Phone moves from EAR to POCKET → testes in near-field. WiFi 24/7 → melatonin suppression at night.",
        healthSignal:
          "Children's sleep disorders increase. Sperm decline doubles. Metabolic syndrome accelerates.",
        keyInsight:
          "The phone-in-pocket transition is the simplest explanation for doubled sperm decline rate. WiFi beacon is a HIDDEN ELF source in every home 24/7.",
      },
      {
        id: "layer4",
        label: "Threshold Layer",
        period: "2012–2020",
        technologies: ["Smartphones (4G LTE, always-on)", "LED lighting", "Bluetooth earbuds", "Smart home IoT"],
        bermChannel: "ALL THREE channels: ELF + IF (LED) + RF",
        biologicalEffect:
          "CaMKII autophosphorylation threshold CROSSED for first time at population level. IF channel OPENS (LED mandatory after EU ban). Recovery window = 0.",
        healthSignal:
          "2012 inflection: teen mental health crisis begins. NOT explained by social media (existed since 2003) — explained by DEVICE change.",
        keyInsight:
          "2012 is the year when cumulative multi-frequency Ca²⁺ load exceeded CaMKII autophosphorylation threshold at population level. The IF channel (LED) opening made this the first THREE-channel exposure in history.",
      },
      {
        id: "layer5",
        label: "Acceleration Layer",
        period: "2020–present",
        technologies: ["5G FR1/FR2", "Electric vehicles", "IoT proliferation", "Wireless charging", "LED street lights"],
        bermChannel: "All channels at maximum. IF expanding fastest.",
        biologicalEffect:
          "Sousouri 2025: CACNA1C genotype determines 5G sleep response. EV cabin: IF exposure during commute. No remaining recovery window.",
        healthSignal:
          "TFR collapse accelerates globally. Korea 0.72 (2024). Institutional trust at historic lows.",
        keyInsight:
          "The IF channel is the FASTEST GROWING and LEAST REGULATED. EV inverters, wireless charging, and LED drivers all operate in the 20–300 kHz range that TTFields (FDA-approved) has shown to be biologically active.",
      },
    ] as TechLayer[],

    temporalTitle: "Temporal Correlations",
    spermTitle: "Sperm count vs. technology adoption",
    spermRows: [
      { period: "1973–1990", tech: "Power grid only + NMT (sparse, analog)", rate: "−0.93 M/ml/yr", explanation: "ELF priming, slow cumulation" },
      { period: "1990–2000", tech: "+ GSM (217 Hz pulsation). Phone at EAR", rate: "−1.16%/yr", explanation: "Pulsation component increases" },
      { period: "2000–2018", tech: "+ 3G/4G data phone + WiFi 24/7 + LED", rate: "−2.64%/yr (2×)", explanation: "Phone in POCKET → testes in near-field 16 h/day. WiFi + LED add background." },
    ],
    mentalTitle: "Youth mental health vs. technology adoption",
    mentalRows: [
      { period: "2003–2008", tech: "Social media (Facebook, MySpace) WITHOUT smartphone", trend: "No change", explanation: "Computer use: limited, no body contact" },
      { period: "2008–2012", tech: "Smartphone adoption begins", trend: "Slow rise", explanation: "Transition period" },
      { period: "2012–2015", tech: "Smartphone >50% teens + WiFi everywhere + LED + BT earbuds", trend: "EXPLOSION", explanation: "DEVICE changed: 24/7 body contact. Night use → melatonin↓ → cortisol↑ (girls 2×)" },
      { period: "2015–2026", tech: "+ 5G + IoT + EV", trend: "Continues ↑↑", explanation: "No recovery. Each generation more sensitive (CaMKII)." },
    ],

    profilesTitle: "14 Technology Profiles",
    profilesLead:
      "Each technology produces a specific EMF signature with distinct biological implications. Channel, modulation, proximity, and duty cycle matter — not just frequency.",

    why2012Title: "Why 2012?",
    why2012Body:
      "Social media existed since 2003 — with no mental health crisis. The crisis began in 2012, when smartphones crossed 50% adoption among teenagers. BERM's explanation: 2012 was not about content — it was about the device. The smartphone brought continuous body-contact EMF exposure (WiFi + 4G + Bluetooth, 24/7, including in bed at night). Combined with existing power grid ELF priming and newly mandated LED lighting (EU ban 2009–2012), 2012 was the year when cumulative multi-frequency Ca²⁺ load exceeded the CaMKII autophosphorylation threshold at population level.",
    why2012Prediction:
      "Prediction: content restrictions (Australia, Norway) will NOT resolve the crisis because the mechanism is the hardware, not the content.",

    modelLink: "Three-channel mechanism",
    predictionsLink: "All predictions",
    pharmLink: "Pharmacological evidence",
  },
  fi: {
    title: "Teknologiakohtainen altistus",
    subtitle:
      "Moderni EMF-altistus ei ole yksi signaali — se on 5–12 samanaikaista lähdettä, jotka kattavat 10 kertaluokkaa taajuudessa. Jokainen teknologiasukupolvi lisäsi uuden kerroksen; CaMKII integroi ne kaikki.",
    backLink: "← Takaisin evidenssiin",

    elfTitle: "ELF-priming-hypoteesi",
    elfBody:
      "Sähköverkko ei ainoastaan lisää 50/60 Hz -altistusta. Se ylössäätelee jänniteherkkien kalsiumkanavien ekspressiota hermosoluissa (P/Q-, N- ja R-alatyypit kasvavat 8–10 päivän ELF-altistuksen jälkeen — PMC4757866). Tämä tarkoittaa, että sähköverkko tekee jokaisesta solusta herkemmän kaikille muille EMF-lähteille: WiFi, 4G, 5G, LED, Bluetooth.",
    elfImplication:
      "Tämä selittää miksi asuinalueen sähkönkulutus on hedelmällisyyslaskun vahvin ennustaja (RMSE 0,522) kun taas matkapuhelintiheys on heikoin (RMSE 1,053): sähkönkulutus mittaa priming-tilaa, ei pelkkää yhtä altistuslähdettä.",
    elfWithout: "Ilman ELF-primingia (Amish, Tsimane)",
    elfWithoutDetail:
      "VGCC-ekspressio = perusviiva. RF-stimulus → Ca²⁺-vaste = X. CaMKII-kynnys EI ylity. Palautuminen täydellinen.",
    elfWith: "ELF-priming (sähköistetty koti)",
    elfWithDetail:
      "50 Hz jatkuva → VGCC-ekspressio = 2–3× perusviiva. Sama RF-stimulus → Ca²⁺-vaste = 2–3X. CaMKII-kynnys YLITTYY. Autofosforylaatio → itseään ylläpitävä. Palautuminen epätäydellinen.",

    superTitle: "Superadditiivisuus: kolme mekanismia",
    superLead:
      "Eri taajuudet aktivoivat eri VGCC-alatyyppejä, mutta CaMKII integroi kaiken Ca²⁺:n lähteestä riippumatta. Kun kokonais-Ca²⁺-kuorma ylittää autofosforylaatiokynnyksen, vaikutus muuttuu itseään ylläpitäväksi ja progressiiviseksi.",
    superMech1Title: "CaMKII-kynnysintegraatio",
    superMech1:
      "50 Hz → Cav3 (T-tyyppi) → Ca²⁺ +60 % kynnyksestä. 10 Hz WiFi → CRY → melatoniini↓ → +40 %. 217 Hz GSM → IFO → +60 %. 2,4 GHz WiFi → Cav1.2 → +30 %. 20–100 kHz LED → Cav1.2 → +20 %. Yksin: mikään ei ylitä 100 %. Yhdessä: 60+40+60+30+20 = 210 % → CaMKII autofosforyloituu → PYSYVÄ.",
    superMech2Title: "ELF-indusoitu kanavien ylössäätely",
    superMech2:
      "50 Hz jatkuva → VGCC-ekspressio ↑ (PMC4757866) → sama RF/IF-stimulus → suurempi Ca²⁺-vaste → ELF-priming × RF-triggeri = multiplikatiivinen.",
    superMech3Title: "Palautumisen estyminen",
    superMech3:
      "Yksittäinen altistus: Ca²⁺ ↑ → tauko → palautuminen. Monikaistainen 24/7: 50 Hz jatkuva (sähköverkko) + 10 Hz jatkuva (WiFi-beacon) + 4G lähes jatkuva (taustasynkronointi) + LED IF 8–16 h/pv → palautumisikkuna = 0 → CaMKII pysyy aktivoituneena jatkuvasti → jokainen päivä lisää kumulaatiota.",

    layersTitle: "Viisi teknologiakerrosta",
    layersLead:
      "Jokainen sukupolvi kerrostui olemassa olevien päälle. Biologinen vaikutus ei ole summautuva — se on superadditiivinen.",
    layers: [
      {
        id: "layer1",
        label: "Perustakerros",
        period: "~1920–1990",
        technologies: ["Sähköverkko 50/60 Hz"],
        bermChannel: "ELF (primääri)",
        biologicalEffect:
          "CRY-häiriö → melatoniini↓. VGCC-ekspression ylössäätely (PRIMING). Hidas kumulatiivinen Ca²⁺-dysregulaatio.",
        healthSignal:
          "Unihäiriöt syntyvät modernina ilmiönä. Varhaiset syöpäklusterit voimalinjojen lähellä (Wertheimer 1979).",
        keyInsight:
          "Tämä kerros ei vain lisää ELF-altistusta — se PRIMAA kaikki solut tehostetulle herkkyydelle jokaiselle myöhemmälle teknologiakerrokselle.",
      },
      {
        id: "layer2",
        label: "Pulsaatiokerros",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + 217 Hz TDMA-pulssi)"],
        bermChannel: "RF + sulautettu ELF (217 Hz pulssi)",
        biologicalEffect:
          "GSM-pulssi on bioaktiivisempi kuin jatkuva aalto (Panagopoulos 2019). Neuronit reagoivat pulssiin mutta EIVÄT jatkuvaan aaltoon samalla taajuudella.",
        healthSignal:
          "Siittiölasku kiihtyy 2000 jälkeen (1,16→2,64 %/v, Levine 2023).",
        keyInsight:
          "NMT→GSM-siirtymä (analoginen→digitaalinen) on historian tärkein modulaatiomuutos. Matalampi SAR mutta KORKEAMPI bioaktiivisuus.",
      },
      {
        id: "layer3",
        label: "Kyllästymiskerros",
        period: "2005–2012",
        technologies: ["WiFi-reitittimet (2,4 GHz + 10 Hz beacon)", "3G/UMTS", "Varhaiset älypuhelimet"],
        bermChannel: "RF + ELF (WiFi beacon 10 Hz) + ELF (50 Hz)",
        biologicalEffect:
          "WiFi-beacon lisää KOLMANNEN ELF-lähteen. Huippukerroin 100:1. Puhelin siirtyy KORVALTA TASKUUN → kivekset lähikentässä.",
        healthSignal:
          "Lasten unihäiriöt kasvavat. Siittiölasku kaksinkertaistuu. Metabolinen oireyhtymä kiihtyy.",
        keyInsight:
          "Puhelin-taskussa-siirtymä on yksinkertaisin selitys siittiölaskun kaksinkertaistumiselle. WiFi-beacon on PIILOTETTU ELF-lähde jokaisessa kodissa 24/7.",
      },
      {
        id: "layer4",
        label: "Kynnyskerros",
        period: "2012–2020",
        technologies: ["Älypuhelimet (4G LTE, aina päällä)", "LED-valaistus", "Bluetooth-nappikuulokkeet", "Älykodin IoT"],
        bermChannel: "KAIKKI KOLME kanavaa: ELF + IF (LED) + RF",
        biologicalEffect:
          "CaMKII:n autofosforylaatiokynnys YLITTYY ensimmäistä kertaa väestötasolla. IF-kanava AVAUTUU (LED pakollinen EU-kiellon jälkeen). Palautumisikkuna = 0.",
        healthSignal:
          "2012: nuorten mielenterveyskriisi alkaa. EI selity somella (ollut olemassa 2003 asti) — selittyy LAITEMUUTOKSELLA.",
        keyInsight:
          "2012 on vuosi jolloin kumulatiivinen monitaajuinen Ca²⁺-kuorma ylitti CaMKII:n autofosforylaatiokynnyksen väestötasolla. IF-kanavan (LED) avautuminen teki tästä historian ensimmäisen KOLMIKANAVA-altistuksen.",
      },
      {
        id: "layer5",
        label: "Kiihdytyskerros",
        period: "2020–nykypäivä",
        technologies: ["5G FR1/FR2", "Sähköautot", "IoT-laitteiden lisääntyminen", "Langaton lataus", "LED-katuvalaistus"],
        bermChannel: "Kaikki kanavat maksimissa. IF kasvaa nopeimmin.",
        biologicalEffect:
          "Sousouri 2025: CACNA1C-genotyyppi määrittää 5G-univasteen. Sähköauton hytti: IF-altistus ajon aikana. Ei jäljellä olevaa palautumisikkunaa.",
        healthSignal:
          "TFR-romahdus kiihtyy maailmanlaajuisesti. Korea 0,72 (2024). Institutionaalinen luottamus historiallisen matalalla.",
        keyInsight:
          "IF-kanava on NOPEIMMIN KASVAVA ja VÄHITEN SÄÄNNELTY. Sähköautojen invertterit, langaton lataus ja LED-ajurit toimivat kaikki 20–300 kHz -alueella, jonka TTFields (FDA-hyväksytty) on osoittanut biologisesti aktiiviseksi.",
      },
    ] as TechLayer[],

    temporalTitle: "Temporaaliset korrelaatiot",
    spermTitle: "Siittiölasku vs. teknologia-adoptio",
    spermRows: [
      { period: "1973–1990", tech: "Sähköverkko + NMT (harva, analoginen)", rate: "−0,93 M/ml/v", explanation: "ELF-priming, hidas kumulaatio" },
      { period: "1990–2000", tech: "+ GSM (217 Hz pulsaatio). Puhelin KORVALLA", rate: "−1,16 %/v", explanation: "Pulsaatiokomponentti lisääntyy" },
      { period: "2000–2018", tech: "+ 3G/4G + WiFi 24/7 + LED", rate: "−2,64 %/v (2×)", explanation: "Puhelin TASKUSSA → kivekset lähikentässä 16 h/pv" },
    ],
    mentalTitle: "Nuorten mielenterveys vs. teknologia-adoptio",
    mentalRows: [
      { period: "2003–2008", tech: "Some (Facebook, MySpace) ILMAN älypuhelinta", trend: "Ei muutosta", explanation: "Tietokoneella: rajattu käyttö, ei kehokontaktia" },
      { period: "2008–2012", tech: "Älypuhelin leviää", trend: "Hidas nousu", explanation: "Siirtymäkausi" },
      { period: "2012–2015", tech: "Älypuhelin >50 % nuoret + WiFi + LED + BT", trend: "RÄJÄHDYS", explanation: "LAITE muuttui: 24/7 kehokontakti. Yöllä sängyssä → melatoniini↓ → kortisoli↑" },
      { period: "2015–2026", tech: "+ 5G + IoT + sähköauto", trend: "Jatkuu ↑↑", explanation: "Ei palautumista. Jokainen sukupolvi herkempi (CaMKII)." },
    ],

    profilesTitle: "14 teknologiaprofiilia",
    profilesLead:
      "Jokainen teknologia tuottaa spesifin EMF-allekirjoituksen erillisin biologisin implikaatioin. Kanava, modulaatio, läheisyys ja käyttösuhde ratkaisevat — eivät pelkkä taajuus.",

    why2012Title: "Miksi 2012?",
    why2012Body:
      "Sosiaalinen media on ollut olemassa vuodesta 2003 — ilman mielenterveyskriisiä. Kriisi alkoi 2012, kun älypuhelimet ylittivät 50 % adoption nuorten keskuudessa. BERM:n selitys: 2012 ei ollut sisällöstä — se oli laitteesta. Älypuhelin toi jatkuvan kehokontakti-EMF-altistuksen (WiFi + 4G + Bluetooth, 24/7, myös sängyssä yöllä). Yhdistettynä olemassa olevaan sähköverkon ELF-primingiin ja juuri pakotettuun LED-valaistukseen (EU-kielto 2009–2012), 2012 oli vuosi jolloin kumulatiivinen monitaajuinen Ca²⁺-kuorma ylitti CaMKII:n autofosforylaatiokynnyksen väestötasolla.",
    why2012Prediction:
      "Ennuste: sisältörajoitukset (Australia, Norja) EIVÄT ratkaise kriisiä koska mekanismi on laitteisto, ei sisältö.",

    modelLink: "Kolmikanavamekanismi",
    predictionsLink: "Kaikki ennusteet",
    pharmLink: "Farmakologinen evidenssi",
  },
};

type Locale = "en" | "fi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = COPY[locale as Locale] ?? COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = COPY[locale as Locale] ?? COPY.en;

  return (
    <main id="main-content" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader title={d.title} subtitle={d.subtitle} icon={Radio} />

      {/* ELF Priming */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          {d.elfTitle}
        </h2>
        <p className="text-muted-foreground mb-4">{d.elfBody}</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <p className="text-sm font-semibold text-green-400 mb-2">{d.elfWithout}</p>
            <p className="text-xs text-muted-foreground">{d.elfWithoutDetail}</p>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm font-semibold text-red-400 mb-2">{d.elfWith}</p>
            <p className="text-xs text-muted-foreground">{d.elfWithDetail}</p>
          </div>
        </div>
        <p className="text-sm font-medium">{d.elfImplication}</p>
      </section>

      {/* Superadditivity */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.superTitle}</h2>
        <p className="text-muted-foreground mb-6">{d.superLead}</p>
        <div className="space-y-4">
          <div className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold mb-2">1. {d.superMech1Title}</h3>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">{d.superMech1}</p>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold mb-2">2. {d.superMech2Title}</h3>
            <p className="text-xs text-muted-foreground">{d.superMech2}</p>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold mb-2">3. {d.superMech3Title}</h3>
            <p className="text-xs text-muted-foreground">{d.superMech3}</p>
          </div>
        </div>
      </section>

      {/* Five Technology Layers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.layersTitle}</h2>
        <p className="text-muted-foreground mb-6">{d.layersLead}</p>
        <div className="space-y-4">
          {d.layers.map((layer, i) => (
            <div
              key={layer.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 rounded-full bg-violet-500/20 text-violet-400 text-xs font-mono px-2 py-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm">
                    {layer.label}{" "}
                    <span className="text-muted-foreground font-normal">({layer.period})</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {layer.technologies.join(" · ")}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-medium mb-1">Channel: <span className="font-normal text-muted-foreground">{layer.bermChannel}</span></p>
                  <p className="font-medium mb-1">Biological: <span className="font-normal text-muted-foreground">{layer.biologicalEffect}</span></p>
                </div>
                <div>
                  <p className="font-medium mb-1">Health signal: <span className="font-normal text-muted-foreground">{layer.healthSignal}</span></p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-violet-500/10 p-3">
                <p className="text-xs font-medium">{layer.keyInsight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why 2012? */}
      <section className="mb-16">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-500" />
            {d.why2012Title}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">{d.why2012Body}</p>
          <p className="text-sm font-medium text-amber-400">{d.why2012Prediction}</p>
        </div>
      </section>

      {/* Temporal Correlations */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">{d.temporalTitle}</h2>

        <h3 className="text-lg font-semibold mb-3">{d.spermTitle}</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold">Period</th>
                <th className="text-left py-2 px-2 font-semibold">Technology</th>
                <th className="text-left py-2 px-2 font-semibold">Decline rate</th>
                <th className="text-left py-2 px-2 font-semibold">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {d.spermRows.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 px-2 font-mono whitespace-nowrap">{r.period}</td>
                  <td className="py-2 px-2 text-muted-foreground">{r.tech}</td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">{r.rate}</td>
                  <td className="py-2 px-2 text-muted-foreground">{r.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mb-3">{d.mentalTitle}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold">Period</th>
                <th className="text-left py-2 px-2 font-semibold">Technology</th>
                <th className="text-left py-2 px-2 font-semibold">Trend</th>
                <th className="text-left py-2 px-2 font-semibold">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {d.mentalRows.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 px-2 font-mono whitespace-nowrap">{r.period}</td>
                  <td className="py-2 px-2 text-muted-foreground">{r.tech}</td>
                  <td className="py-2 px-2 font-medium">{r.trend}</td>
                  <td className="py-2 px-2 text-muted-foreground">{r.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 14 Tech Profiles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.profilesTitle}</h2>
        <p className="text-muted-foreground mb-6">{d.profilesLead}</p>
        <div className="space-y-3">
          {TECH_PROFILES.map((t) => (
            <details key={t.name} className="group rounded-xl border">
              <summary className="cursor-pointer p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 rounded text-[10px] font-mono px-1.5 py-0.5 ${
                      VERIFIED_COLORS[t.verified] ?? "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {t.verified}
                  </span>
                  <span className="font-semibold text-sm">{t.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.channel}</span>
              </summary>
              <div className="px-4 pb-4 border-t border-border/50 pt-3">
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <p><span className="font-medium text-foreground">Frequency:</span> {t.frequency}</p>
                  <p><span className="font-medium text-foreground">Modulation:</span> {t.modulation}</p>
                  <p><span className="font-medium text-foreground">Proximity:</span> {t.proximity}</p>
                  <p><span className="font-medium text-foreground">Duty cycle:</span> {t.dutyCycle}</p>
                </div>
                <p className="text-xs mt-3">
                  <span className="font-medium">BERM role:</span>{" "}
                  <span className="text-muted-foreground">{t.bermRole}</span>
                </p>
                <p className="text-[10px] mt-2 text-muted-foreground/70">{t.keyRef}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Navigation links */}
      <section className="flex flex-wrap gap-4 justify-center mb-12">
        <Link
          href={`/${locale}/model`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.modelLink} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/evidence/pharmacology`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.pharmLink} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/predictions`}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
        >
          {d.predictionsLink} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
