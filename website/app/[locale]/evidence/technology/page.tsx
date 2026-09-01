import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Zap, Smartphone, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { pickCopy } from "@/lib/i18n";
import { InlineReferenceText } from "@/components/InlineReferenceText";

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
    keyRef: "[[ref:sun2016_elf_vgcc|PMC4757866]]: ELF increases Ca²⁺ channel expression",
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
    keyRef: "[[ref:schmid2012|Schmid 2012]]: modulation-specific EEG effects. Crest factor 100:1 (Schmid 2020).",
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
    keyRef: "[[ref:panagopoulos2019_dna|Panagopoulos 2019]]: pulsed > CW. 900 MHz pulsed: neuron response. CW: no response.",
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
    keyRef: "[[ref:levine2023_sperm|Levine 2023]]: decline doubles post-2000. Haidt 2024: 2012 inflection point.",
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
    keyRef: "[[ref:sousouri2025|Sousouri et al. 2025 (NeuroImage)]]: CACNA1C-dependent 5G sleep-EEG response.",
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
    keyRef: "WHO 2007: IF research high priority. [[ref:neuhaus2019_cav12_ttfields|TTFields]]: 200 kHz activates Cav1.2.",
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
    keyRef: "[[ref:jacc_ev2025|JACC:Asia 2025]]: cardiovascular concerns. [[ref:ev_patent|Israeli patent]]: active field cancellation.",
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
    keyRef: "[[ref:tokinobu2021_ih_kyushu|Tokinobu et al. 2021 (Kyushu cohort)]].",
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
    keyRef: "[[ref:boyes2021|Boyes et al. 2021 (Science Advances)]].",
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
      "The power grid does not merely add 50/60 Hz exposure. It upregulates voltage-gated calcium channel expression in neurons (P/Q, N, and R subtypes increase after 8–10 days of ELF exposure — [[ref:sun2016_elf_vgcc|PMC4757866]]). This means the power grid makes every cell more sensitive to every other EMF source: WiFi, 4G, 5G, LED, Bluetooth.",
    elfImplication:
      "This explains why residential electricity consumption is the strongest predictor of fertility decline (full-model RMSE 0.522) while mobile phone density is the weakest (RMSE 1.053): electricity measures the priming state, not just one exposure source.",
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
      "50 Hz continuous → VGCC expression ↑ ([[ref:sun2016_elf_vgcc|PMC4757866]]) → same RF/IF stimulus → larger Ca²⁺ response → ELF priming × RF trigger = multiplicative.",
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
          "GSM pulse is more bioactive than CW ([[ref:panagopoulos2019_dna|Panagopoulos 2019]]). Neurons respond to pulse but NOT CW at same frequency. Phone at EAR → brain in near-field.",
        healthSignal:
          "Sperm decline accelerates post-2000 (1.16→2.64%/yr, [[ref:levine2023_sperm|Levine 2023]]).",
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
          "[[ref:sousouri2025|Sousouri 2025]]: CACNA1C genotype determines 5G sleep response. EV cabin: IF exposure during commute. No remaining recovery window.",
        healthSignal:
          "TFR collapse accelerates globally. Korea 0.72 (2024). Institutional trust at historic lows.",
        keyInsight:
          "The IF channel is the FASTEST GROWING and LEAST REGULATED. EV inverters, wireless charging, and LED drivers all operate in the 20–300 kHz range that [[ref:ttfields_mechanism|TTFields]] (FDA-approved) has shown to be biologically active.",
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
    backLink: "← Takaisin näyttöön",
    elfTitle: "ELF-priming-hypoteesi",
    elfBody:
      "Sähköverkko ei ainoastaan lisää 50/60 Hz -altistusta. Se ylössäätelee jänniteherkkien kalsiumkanavien ekspressiota hermosoluissa (P/Q-, N- ja R-alatyypit kasvavat 8–10 päivän ELF-altistuksen jälkeen — [[ref:sun2016_elf_vgcc|PMC4757866]]). Tämä tarkoittaa, että sähköverkko tekee jokaisesta solusta herkemmän kaikille muille EMF-lähteille: WiFi, 4G, 5G, LED, Bluetooth.",
    elfImplication:
      "Tämä selittää miksi asuinalueen sähkönkulutus on hedelmällisyyslaskun vahvin ennustaja (kokonaismallin RMSE 0,522) kun taas matkapuhelintiheys on heikoin (RMSE 1,053): sähkönkulutus mittaa priming-tilaa, ei pelkkää yhtä altistuslähdettä.",
    elfWithout: "Ilman ELF-esialtistusta (Amish, Tsimane)",
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
    superMech2Title: "ELF-aiheutettu kanavien ylössäätely",
    superMech2:
      "50 Hz jatkuva → VGCC-ekspressio ↑ ([[ref:sun2016_elf_vgcc|PMC4757866]]) → sama RF/IF-stimulus → suurempi Ca²⁺-vaste → ELF-priming × RF-triggeri = multiplikatiivinen.",
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
          "Tämä kerros ei vain lisää ELF-altistusta — se HERKISTÄÄ kaikki solut tehostetulle herkkyydelle jokaiselle myöhemmälle teknologiakerrokselle.",
      },
      {
        id: "layer2",
        label: "Pulsaatiokerros",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + 217 Hz TDMA-pulssi)"],
        bermChannel: "RF + sulautettu ELF (217 Hz pulssi)",
        biologicalEffect:
          "GSM-pulssi on bioaktiivisempi kuin jatkuva aalto ([[ref:panagopoulos2019_dna|Panagopoulos 2019]]). Neuronit reagoivat pulssiin mutta EIVÄT jatkuvaan aaltoon samalla taajuudella.",
        healthSignal:
          "Siittiölasku kiihtyy 2000 jälkeen (1,16→2,64 %/v, [[ref:levine2023_sperm|Levine 2023]]).",
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
          "[[ref:sousouri2025|Sousouri 2025]]: CACNA1C-genotyyppi määrittää 5G-univasteen. Sähköauton hytti: IF-altistus ajon aikana. Ei jäljellä olevaa palautumisikkunaa.",
        healthSignal:
          "TFR-romahdus kiihtyy maailmanlaajuisesti. Korea 0,72 (2024). Institutionaalinen luottamus historiallisen matalalla.",
        keyInsight:
          "IF-kanava on NOPEIMMIN KASVAVA ja VÄHITEN SÄÄNNELTY. Sähköautojen invertterit, langaton lataus ja LED-ajurit toimivat kaikki 20–300 kHz -alueella, jonka [[ref:ttfields_mechanism|TTFields]] (FDA-hyväksytty) on osoittanut biologisesti aktiiviseksi.",
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
      "Jokainen teknologia tuottaa spesifin EMF-allekirjoituksen erillisin biologisin seurauksin. Kanava, modulaatio, läheisyys ja käyttösuhde ratkaisevat — eivät pelkkä taajuus.",

    why2012Title: "Miksi 2012?",
    why2012Body:
      "Sosiaalinen media on ollut olemassa vuodesta 2003 — ilman mielenterveyskriisiä. Kriisi alkoi 2012, kun älypuhelimet ylittivät 50 % adoption nuorten keskuudessa. BERM:n selitys: 2012 ei ollut sisällöstä — se oli laitteesta. Älypuhelin toi jatkuvan kehokontakti-EMF-altistuksen (WiFi + 4G + Bluetooth, 24/7, myös sängyssä yöllä). Yhdistettynä olemassa olevaan sähköverkon ELF-primingiin ja juuri pakotettuun LED-valaistukseen (EU-kielto 2009–2012), 2012 oli vuosi jolloin kumulatiivinen monitaajuinen Ca²⁺-kuorma ylitti CaMKII:n autofosforylaatiokynnyksen väestötasolla.",
    why2012Prediction:
      "Ennuste: sisältörajoitukset (Australia, Norja) EIVÄT ratkaise kriisiä koska mekanismi on laitteisto, ei sisältö.",

    modelLink: "Kolmikanavamekanismi",
    predictionsLink: "Kaikki ennusteet",
    pharmLink: "Farmakologinen näyttö",
  },
  ja: {
    title: "技術別の曝露",
    subtitle:
      "現代のEMF曝露は単一の信号ではない — 周波数で10桁にわたる5～12の同時発生源である。各技術世代が新しい層を追加した。CaMKIIはそのすべてを統合する。",
    backLink: "← エビデンスに戻る",
    elfTitle: "ELFプライミング仮説",
    elfBody:
      "電力網は単に50/60 Hz曝露を加えるだけではない。神経細胞の電位依存性カルシウムチャネル発現を上方制御する（8～10日間のELF曝露後にP/Q、N、Rサブタイプが増加 — [[ref:sun2016_elf_vgcc|PMC4757866]]）。これは、電力網がすべての細胞を他のあらゆるEMF源（WiFi、4G、5G、LED、Bluetooth）に対してより敏感にすることを意味する。",
    elfImplication:
      "これは住宅の電力消費が生殖能力低下の最も強い予測因子（全モデルRMSE 0.522）である一方、携帯電話密度が最も弱い（RMSE 1.053）理由を説明する：電力消費はプライミング状態を測定しており、単一の曝露源だけではない。",
    elfWithout: "ELFプライミングなし（Amish、Tsimane）",
    elfWithoutDetail:
      "VGCC発現 = ベースライン。RF刺激 → Ca²⁺応答 = X。CaMKII閾値は超えない。回復は完全。",
    elfWith: "ELFプライミングあり（電化された住居）",
    elfWithDetail:
      "50 Hz連続 → VGCC発現 = ベースラインの2～3倍。同じRF刺激 → Ca²⁺応答 = 2～3X。CaMKII閾値を超過。自己リン酸化 → 自己持続的。回復は不完全。",

    superTitle: "超加法性：3つのメカニズム",
    superLead:
      "異なる周波数は異なるVGCCサブタイプを活性化するが、CaMKIIは発生源に関係なくすべてのCa²⁺を統合する。総Ca²⁺負荷が自己リン酸化閾値を超えると、効果は自己持続的かつ進行性になる。",
    superMech1Title: "CaMKII閾値統合",
    superMech1:
      "50 Hz → Cav3 (T型) → Ca²⁺ 閾値の+60%。10 Hz WiFi beacon → CRY → メラトニン↓ → +40%。217 Hz GSM → IFO → +60%。2.4 GHz WiFi → Cav1.2 → +30%。20-100 kHz LED → Cav1.2 → +20%。単独：いずれも100%を超えない。合計：60+40+60+30+20 = 210% → CaMKIIが自己リン酸化 → 永続的。",
    superMech2Title: "ELF誘導チャネル上方制御",
    superMech2:
      "50 Hz連続 → VGCC発現↑（[[ref:sun2016_elf_vgcc|PMC4757866]]）→ 同じRF/IF刺激 → より大きなCa²⁺応答 → ELFプライミング × RFトリガー = 乗算的。",
    superMech3Title: "回復の阻害",
    superMech3:
      "単一曝露：Ca²⁺↑ → 休止 → 回復。マルチバンド24/7：50 Hz連続（送電網）+ 10 Hz連続（WiFi beacon）+ 4Gほぼ連続（バックグラウンド同期）+ LED IF 8～16時間/日 → 回復窓 = 0 → CaMKIIは連続的に活性化状態を維持 → 毎日蓄積が加算。",

    layersTitle: "5つの技術層",
    layersLead:
      "各世代は既存の層の上に重なった。生物学的効果は加算的ではない — 超加法的である。",
    layers: [
      {
        id: "layer1",
        label: "基盤層",
        period: "~1920–1990",
        technologies: ["送電網 50/60 Hz"],
        bermChannel: "ELF（主要）",
        biologicalEffect:
          "CRY撹乱 → メラトニン↓。VGCC発現上方制御（プライミング）。緩やかな蓄積的Ca²⁺調節不全。",
        healthSignal:
          "睡眠障害が現代的現象として出現。送電線付近の初期がんクラスター（Wertheimer 1979）。",
        keyInsight:
          "この層は単にELF曝露を追加するだけでなく、後続のすべての技術層に対する感受性を高めるよう全細胞をプライミングする。",
      },
      {
        id: "layer2",
        label: "パルス層",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + 217 Hz TDMAパルス)"],
        bermChannel: "RF + 組み込みELF（217 Hzパルス）",
        biologicalEffect:
          "GSMパルスは連続波より生物活性が高い（[[ref:panagopoulos2019_dna|Panagopoulos 2019]]）。ニューロンは同じ周波数のパルスには反応するが、連続波には反応しない。耳元の携帯電話 → 脳が近接場内。",
        healthSignal:
          "2000年以降、精子数減少が加速（年1.16%→2.64%、[[ref:levine2023_sperm|Levine 2023]]）。",
        keyInsight:
          "NMT→GSM移行（アナログ→デジタル）は歴史上最も重要な変調変化。SARは低いが生物活性はより高い。",
      },
      {
        id: "layer3",
        label: "飽和層",
        period: "2005–2012",
        technologies: ["WiFiルーター（2.4 GHz + 10 Hz beacon）", "3G/UMTS", "初期のスマートフォン"],
        bermChannel: "RF + ELF (WiFi beacon 10 Hz) + ELF (50 Hz)",
        biologicalEffect:
          "WiFi beaconが第3のELF源を追加。クレストファクター100:1。携帯電話が耳元からポケットへ → 精巣が近接場内。WiFi 24/7 → 夜間メラトニン抑制。",
        healthSignal:
          "小児の睡眠障害増加。精子数減少が倍増。メタボリックシンドロームが加速。",
        keyInsight:
          "ポケット内携帯電話への移行が精子数減少率倍増の最も単純な説明。WiFi beaconは全家庭で24/7の隠れたELF源。",
      },
      {
        id: "layer4",
        label: "閾値層",
        period: "2012–2020",
        technologies: ["スマートフォン（4G LTE、常時接続）", "LED照明", "Bluetoothイヤホン", "スマートホームIoT"],
        bermChannel: "全3チャネル: ELF + IF (LED) + RF",
        biologicalEffect:
          "CaMKII自己リン酸化閾値が集団レベルで初めて超過。IFチャネルが開放（EUの禁止後LEDが義務化）。回復窓 = 0。",
        healthSignal:
          "2012年の変曲点：10代の精神健康危機が始まる。SNS（2003年から存在）では説明不可 — デバイスの変化で説明可能。",
        keyInsight:
          "2012年は蓄積的多周波Ca²⁺負荷がCaMKII自己リン酸化閾値を集団レベルで超えた年。IFチャネル（LED）の開放により史上初の3チャネル曝露となった。",
      },
      {
        id: "layer5",
        label: "加速層",
        period: "2020–現在",
        technologies: ["5G FR1/FR2", "電気自動車", "IoT機器の増加", "ワイヤレス充電", "LED街路灯"],
        bermChannel: "全チャネル最大。IFが最も急速に拡大。",
        biologicalEffect:
          "[[ref:sousouri2025|Sousouri 2025]]：CACNA1C遺伝子型が5G睡眠応答を決定する。EV車内：通勤中のIF曝露。回復窓は残されていない。",
        healthSignal:
          "TFR崩壊が世界的に加速。韓国0.72（2024年）。制度的信頼が歴史的低水準。",
        keyInsight:
          "IFチャネルは最も急速に拡大し、最も規制されていない。EVインバーター、ワイヤレス充電、LEDドライバーはいずれも、[[ref:ttfields_mechanism|TTFields]]（FDA承認）が生物活性を示した20～300 kHz帯で動作する。",
      },
    ] as TechLayer[],

    temporalTitle: "時間的相関",
    spermTitle: "精子数 vs. 技術採用",
    spermRows: [
      { period: "1973–1990", tech: "送電網のみ + NMT（まばら、アナログ）", rate: "−0.93 M/ml/yr", explanation: "ELFプライミング、緩やかな蓄積" },
      { period: "1990–2000", tech: "+ GSM（217 Hzパルセーション）。携帯電話は耳元", rate: "−1.16%/yr", explanation: "パルセーション成分の増加" },
      { period: "2000–2018", tech: "+ 3G/4Gデータ携帯 + WiFi 24/7 + LED", rate: "−2.64%/yr (2×)", explanation: "携帯電話がポケットへ → 精巣が近接場内16時間/日。WiFi + LEDが背景を追加。" },
    ],
    mentalTitle: "若者の精神健康 vs. 技術採用",
    mentalRows: [
      { period: "2003–2008", tech: "SNS（Facebook, MySpace）スマートフォンなし", trend: "変化なし", explanation: "コンピュータ使用：限定的、身体接触なし" },
      { period: "2008–2012", tech: "スマートフォン普及開始", trend: "緩やかな上昇", explanation: "移行期" },
      { period: "2012–2015", tech: "スマートフォン >50% 10代 + WiFi普及 + LED + BTイヤホン", trend: "爆発的増加", explanation: "デバイスが変化：24/7身体接触。夜間使用 → メラトニン↓ → コルチゾール↑（女性2倍）" },
      { period: "2015–2026", tech: "+ 5G + IoT + 電気自動車", trend: "継続 ↑↑", explanation: "回復なし。各世代がより感受性が高い（CaMKII）。" },
    ],

    profilesTitle: "14の技術プロファイル",
    profilesLead:
      "各技術は固有のEMFシグネチャを生み、異なる生物学的影響を持つ。チャネル、変調、近接性、使用率が重要であり、周波数だけではない。",

    why2012Title: "なぜ2012年？",
    why2012Body:
      "ソーシャルメディアは2003年から存在していた — 精神健康危機なしに。危機は2012年に始まった。スマートフォンが10代の50%普及を超えた時である。BERMの説明：2012年はコンテンツではなくデバイスについてであった。スマートフォンは継続的な身体接触EMF曝露（WiFi + 4G + Bluetooth、24/7、夜間のベッド内を含む）をもたらした。既存の送電網ELFプライミングと新たに義務化されたLED照明（EU禁止2009-2012）と組み合わさり、2012年は蓄積的多周波Ca²⁺負荷がCaMKII自己リン酸化閾値を集団レベルで超えた年であった。",
    why2012Prediction:
      "予測：コンテンツ制限（オーストラリア、ノルウェー）は危機を解決しない。なぜならメカニズムはハードウェアであり、コンテンツではないからである。",

    modelLink: "3チャネルメカニズム",
    predictionsLink: "全予測",
    pharmLink: "薬理学的エビデンス",
  },
  fr: {
    title: "Exposition spécifique par technologie",
    subtitle:
      "L'exposition EMF moderne n'est pas un signal unique — c'est 5 à 12 sources simultanées couvrant 10 ordres de grandeur en fréquence. Chaque génération technologique a ajouté une nouvelle couche ; CaMKII les intègre toutes.",
    backLink: "← Retour aux preuves",
    elfTitle: "L'hypothèse du priming ELF",
    elfBody:
      "Le réseau électrique n'ajoute pas seulement une exposition à 50/60 Hz. Il augmente l'expression des canaux calciques voltage-dépendants dans les neurones (les sous-types P/Q, N et R augmentent après 8 à 10 jours d'exposition ELF — [[ref:sun2016_elf_vgcc|PMC4757866]]). Cela signifie que le réseau électrique rend chaque cellule plus sensible à toutes les autres sources d'EMF : WiFi, 4G, 5G, LED, Bluetooth.",
    elfImplication:
      "Cela explique pourquoi la consommation résidentielle d'électricité est le plus fort prédicteur du déclin de la fertilité (RMSE (modèle complet) 0,522) tandis que la densité de téléphones portables est le plus faible (RMSE 1,053) : l'électricité mesure l'état de priming, pas seulement une source d'exposition.",
    elfWithout: "Sans priming ELF (Amish, Tsimane)",
    elfWithoutDetail:
      "Expression VGCC = base. Stimulus RF → réponse Ca²⁺ = X. Seuil CaMKII NON franchi. Récupération complète.",
    elfWith: "Avec priming ELF (maison électrifiée)",
    elfWithDetail:
      "50 Hz continu → expression VGCC = 2-3× base. Même stimulus RF → réponse Ca²⁺ = 2-3X. Seuil CaMKII FRANCHI. Autophosphorylation → auto-entretenu. Récupération incomplète.",

    superTitle: "Superadditivité : trois mécanismes",
    superLead:
      "Différentes fréquences activent différents sous-types de VGCC, mais CaMKII intègre tout le Ca²⁺ quelle que soit la source. Quand la charge totale en Ca²⁺ franchit le seuil d'autophosphorylation, l'effet devient auto-entretenu et progressif.",
    superMech1Title: "Intégration de seuil CaMKII",
    superMech1:
      "50 Hz → Cav3 (type T) → Ca²⁺ +60 % du seuil. 10 Hz WiFi beacon → CRY → mélatonine↓ → +40 %. 217 Hz GSM → IFO → +60 %. 2,4 GHz WiFi → Cav1.2 → +30 %. 20-100 kHz LED → Cav1.2 → +20 %. Seul : aucun ne franchit 100 %. Ensemble : 60+40+60+30+20 = 210 % → CaMKII s'autophosphoryle → PERMANENT.",
    superMech2Title: "Surexpression des canaux induite par ELF",
    superMech2:
      "50 Hz continu → expression VGCC ↑ ([[ref:sun2016_elf_vgcc|PMC4757866]]) → même stimulus RF/IF → réponse Ca²⁺ plus forte → priming ELF × déclencheur RF = multiplicatif.",
    superMech3Title: "Prévention de la récupération",
    superMech3:
      "Exposition unique : Ca²⁺ ↑ → pause → récupération. Multi-bande 24/7 : 50 Hz continu (réseau) + 10 Hz continu (WiFi beacon) + 4G quasi continu (sync arrière-plan) + LED IF 8-16 h/jour → fenêtre de récupération = 0 → CaMKII reste activé en continu → chaque jour ajoute de la cumulation.",

    layersTitle: "Cinq couches technologiques",
    layersLead:
      "Chaque génération s'est empilée sur les couches existantes. L'effet biologique n'est pas additif — il est superadditif.",
    layers: [
      {
        id: "layer1",
        label: "Couche fondatrice",
        period: "~1920–1990",
        technologies: ["Réseau électrique 50/60 Hz"],
        bermChannel: "ELF (primaire)",
        biologicalEffect:
          "Perturbation CRY → mélatonine↓. Surexpression VGCC (PRIMING). Dysrégulation Ca²⁺ cumulative lente.",
        healthSignal:
          "Les troubles du sommeil émergent comme phénomène moderne. Premiers clusters de cancer près des lignes électriques (Wertheimer 1979).",
        keyInsight:
          "Cette couche ne fait pas qu'ajouter une exposition ELF — elle PRIME toutes les cellules pour une sensibilité accrue à chaque couche technologique ultérieure.",
      },
      {
        id: "layer2",
        label: "Couche de pulsation",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + pulse TDMA 217 Hz)"],
        bermChannel: "RF + ELF intégré (pulse 217 Hz)",
        biologicalEffect:
          "La pulsation GSM est plus bioactive que l'onde continue ([[ref:panagopoulos2019_dna|Panagopoulos 2019]]). Les neurones répondent à la pulsation, mais PAS à l'onde continue à la même fréquence. Téléphone à l'OREILLE → cerveau en champ proche.",
        healthSignal:
          "Le déclin spermatique s'accélère après 2000 (1,16→2,64 %/an, [[ref:levine2023_sperm|Levine 2023]]).",
        keyInsight:
          "La transition NMT→GSM (analogique→numérique) est le changement de modulation le plus important de l'histoire. SAR plus bas mais bioactivité PLUS ÉLEVÉE.",
      },
      {
        id: "layer3",
        label: "Couche de saturation",
        period: "2005–2012",
        technologies: ["Routeurs WiFi (2,4 GHz + beacon 10 Hz)", "3G/UMTS", "Premiers smartphones"],
        bermChannel: "RF + ELF (WiFi beacon 10 Hz) + ELF (50 Hz)",
        biologicalEffect:
          "Le WiFi beacon ajoute une TROISIÈME source ELF. Facteur de crête 100:1. Le téléphone passe de l'OREILLE à la POCHE → testicules en champ proche. WiFi 24/7 → suppression de la mélatonine la nuit.",
        healthSignal:
          "Troubles du sommeil chez les enfants en hausse. Le déclin spermatique double. Le syndrome métabolique s'accélère.",
        keyInsight:
          "La transition téléphone-dans-la-poche est l'explication la plus simple du doublement du déclin spermatique. Le WiFi beacon est une source ELF CACHÉE dans chaque foyer 24/7.",
      },
      {
        id: "layer4",
        label: "Couche de seuil",
        period: "2012–2020",
        technologies: ["Smartphones (4G LTE, toujours connecté)", "Éclairage LED", "Écouteurs Bluetooth", "IoT maison intelligente"],
        bermChannel: "LES TROIS canaux : ELF + IF (LED) + RF",
        biologicalEffect:
          "Le seuil d'autophosphorylation de CaMKII est FRANCHI pour la première fois au niveau populationnel. Le canal IF S'OUVRE (LED obligatoire après l'interdiction UE). Fenêtre de récupération = 0.",
        healthSignal:
          "2012 : la crise de santé mentale des adolescents commence. NON expliquée par les réseaux sociaux (existent depuis 2003) — expliquée par le changement de DISPOSITIF.",
        keyInsight:
          "2012 est l'année où la charge Ca²⁺ multi-fréquence cumulative a dépassé le seuil d'autophosphorylation de CaMKII au niveau populationnel. L'ouverture du canal IF (LED) en a fait la première exposition TROIS CANAUX de l'histoire.",
      },
      {
        id: "layer5",
        label: "Couche d'accélération",
        period: "2020–présent",
        technologies: ["5G FR1/FR2", "Véhicules électriques", "Prolifération IoT", "Charge sans fil", "Éclairage public LED"],
        bermChannel: "Tous les canaux au maximum. IF en expansion la plus rapide.",
        biologicalEffect:
          "[[ref:sousouri2025|Sousouri 2025]] : le génotype CACNA1C détermine la réponse du sommeil à la 5G. Habitacle VE : exposition IF pendant le trajet. Aucune fenêtre de récupération restante.",
        healthSignal:
          "L'effondrement du TFR s'accélère mondialement. Corée 0,72 (2024). Confiance institutionnelle à des niveaux historiquement bas.",
        keyInsight:
          "Le canal IF est celui qui CROÎT LE PLUS VITE et qui est LE MOINS RÉGLEMENTÉ. Les onduleurs de VE, la recharge sans fil et les drivers LED fonctionnent tous dans la bande 20–300 kHz dont [[ref:ttfields_mechanism|TTFields]] (approuvé par la FDA) a montré l'activité biologique.",
      },
    ] as TechLayer[],

    temporalTitle: "Corrélations temporelles",
    spermTitle: "Nombre de spermatozoïdes vs. adoption technologique",
    spermRows: [
      { period: "1973–1990", tech: "Réseau électrique seul + NMT (rare, analogique)", rate: "−0,93 M/ml/an", explanation: "Priming ELF, cumulation lente" },
      { period: "1990–2000", tech: "+ GSM (pulsation 217 Hz). Téléphone à l'OREILLE", rate: "−1,16 %/an", explanation: "Composante de pulsation en augmentation" },
      { period: "2000–2018", tech: "+ 3G/4G + WiFi 24/7 + LED", rate: "−2,64 %/an (2×)", explanation: "Téléphone dans la POCHE → testicules en champ proche 16 h/jour. WiFi + LED ajoutent un fond." },
    ],
    mentalTitle: "Santé mentale des jeunes vs. adoption technologique",
    mentalRows: [
      { period: "2003–2008", tech: "Réseaux sociaux (Facebook, MySpace) SANS smartphone", trend: "Pas de changement", explanation: "Utilisation d'ordinateur : limitée, pas de contact corporel" },
      { period: "2008–2012", tech: "L'adoption du smartphone commence", trend: "Hausse lente", explanation: "Période de transition" },
      { period: "2012–2015", tech: "Smartphone >50 % ados + WiFi partout + LED + BT", trend: "EXPLOSION", explanation: "Le DISPOSITIF a changé : contact corporel 24/7. Utilisation nocturne → mélatonine↓ → cortisol↑ (filles 2×)" },
      { period: "2015–2026", tech: "+ 5G + IoT + VE", trend: "Continue ↑↑", explanation: "Pas de récupération. Chaque génération plus sensible (CaMKII)." },
    ],

    profilesTitle: "14 profils technologiques",
    profilesLead:
      "Chaque technologie produit une signature EMF spécifique avec des implications biologiques distinctes. Le canal, la modulation, la proximité et le cycle de fonctionnement comptent — pas seulement la fréquence.",

    why2012Title: "Pourquoi 2012 ?",
    why2012Body:
      "Les réseaux sociaux existaient depuis 2003 — sans crise de santé mentale. La crise a commencé en 2012, quand les smartphones ont franchi 50 % d'adoption chez les adolescents. L'explication BERM : 2012 ne concernait pas le contenu — mais le dispositif. Le smartphone a apporté une exposition EMF en contact corporel continu (WiFi + 4G + Bluetooth, 24/7, y compris au lit la nuit). Combiné avec le priming ELF existant du réseau électrique et l'éclairage LED nouvellement imposé (interdiction UE 2009-2012), 2012 est l'année où la charge Ca²⁺ multi-fréquence cumulative a dépassé le seuil d'autophosphorylation de CaMKII au niveau populationnel.",
    why2012Prediction:
      "Prédiction : les restrictions de contenu (Australie, Norvège) NE résoudront PAS la crise car le mécanisme est le matériel, pas le contenu.",

    modelLink: "Mécanisme à trois canaux",
    predictionsLink: "Toutes les prédictions",
    pharmLink: "Preuves pharmacologiques",
  },
  ko: {
    title: "기술별 노출",
    subtitle:
      "현대의 EMF 노출은 단일 신호가 아니다 — 주파수에서 10자릿수에 걸친 5~12개의 동시 발생원이다. 각 기술 세대는 새로운 층을 추가했으며, CaMKII는 이 모두를 통합한다.",
    backLink: "← 근거로 돌아가기",
    elfTitle: "ELF 프라이밍 가설",
    elfBody:
      "전력망은 단지 50/60 Hz 노출을 추가하는 데 그치지 않는다. 신경세포의 전압개폐 칼슘 채널 발현을 상향 조절한다(8~10일간 ELF 노출 후 P/Q, N 및 R 아형 증가 — [[ref:sun2016_elf_vgcc|PMC4757866]]). 이는 전력망이 모든 세포를 다른 모든 EMF 발생원(WiFi, 4G, 5G, LED, Bluetooth)에 더 민감하게 만든다는 뜻이다.",
    elfImplication:
      "이것은 주거 전력 소비가 생식력 감소의 가장 강력한 예측 인자(전체 모델 RMSE 0.522)이고 휴대전화 밀도가 가장 약한(RMSE 1.053) 이유를 설명한다: 전력 소비는 단일 노출원이 아닌 프라이밍 상태를 측정한다.",
    elfWithout: "ELF 프라이밍 없이 (Amish, Tsimane)",
    elfWithoutDetail:
      "VGCC 발현 = 기저치. RF 자극 → Ca²⁺ 반응 = X. CaMKII 역치 미초과. 회복 완전.",
    elfWith: "ELF 프라이밍 시 (전기화된 가정)",
    elfWithDetail:
      "50 Hz 연속 → VGCC 발현 = 기저치의 2~3배. 동일한 RF 자극 → Ca²⁺ 반응 = 2~3X. CaMKII 역치 초과. 자가인산화 → 자기유지. 회복 불완전.",

    superTitle: "초가법성: 세 가지 메커니즘",
    superLead:
      "서로 다른 주파수는 서로 다른 VGCC 아형을 활성화하지만, CaMKII는 발생원에 관계없이 모든 Ca²⁺를 통합한다. 총 Ca²⁺ 부하가 자가인산화 역치를 넘으면 효과는 자기유지적이고 진행성이 된다.",
    superMech1Title: "CaMKII 역치 통합",
    superMech1:
      "50 Hz → Cav3 (T형) → Ca²⁺ 역치의 +60%. 10 Hz WiFi beacon → CRY → 멜라토닌↓ → +40%. 217 Hz GSM → IFO → +60%. 2.4 GHz WiFi → Cav1.2 → +30%. 20-100 kHz LED → Cav1.2 → +20%. 단독: 어느 것도 100%를 넘지 않음. 합산: 60+40+60+30+20 = 210% → CaMKII 자가인산화 → 영구적.",
    superMech2Title: "ELF 유도 채널 상향 조절",
    superMech2:
      "50 Hz 연속 → VGCC 발현 ↑ ([[ref:sun2016_elf_vgcc|PMC4757866]]) → 동일한 RF/IF 자극 → 더 큰 Ca²⁺ 반응 → ELF 프라이밍 × RF 트리거 = 승법적.",
    superMech3Title: "회복 방지",
    superMech3:
      "단일 노출: Ca²⁺ ↑ → 중단 → 회복. 다중 대역 24/7: 50 Hz 연속(전력망) + 10 Hz 연속(WiFi beacon) + 4G 거의 연속(백그라운드 동기화) + LED IF 8~16시간/일 → 회복 창 = 0 → CaMKII가 연속 활성 상태 유지 → 매일 축적 추가.",

    layersTitle: "다섯 가지 기술 층",
    layersLead:
      "각 세대는 기존 층 위에 쌓였다. 생물학적 효과는 가법적이 아니라 초가법적이다.",
    layers: [
      {
        id: "layer1",
        label: "기반 층",
        period: "~1920–1990",
        technologies: ["전력망 50/60 Hz"],
        bermChannel: "ELF (주요)",
        biologicalEffect:
          "CRY 교란 → 멜라토닌↓. VGCC 발현 상향 조절(프라이밍). 느린 축적적 Ca²⁺ 조절 장애.",
        healthSignal:
          "수면 장애가 현대적 현상으로 등장. 송전선 근처 초기 암 클러스터(Wertheimer 1979).",
        keyInsight:
          "이 층은 단순히 ELF 노출을 추가하는 것이 아니라, 이후 모든 기술 층에 대한 감수성을 높이도록 모든 세포를 프라이밍한다.",
      },
      {
        id: "layer2",
        label: "펄스 층",
        period: "1991–2005",
        technologies: ["GSM/2G (900/1800 MHz + 217 Hz TDMA 펄스)"],
        bermChannel: "RF + 내장 ELF (217 Hz 펄스)",
        biologicalEffect:
          "GSM 펄스는 연속파보다 생물활성이 높다([[ref:panagopoulos2019_dna|Panagopoulos 2019]]). 뉴런은 같은 주파수의 펄스에는 반응하지만 연속파에는 반응하지 않는다. 휴대전화가 귀 옆 → 뇌가 근접장 내.",
        healthSignal:
          "2000년 이후 정자 수 감소가 가속(연 1.16→2.64%, [[ref:levine2023_sperm|Levine 2023]]).",
        keyInsight:
          "NMT→GSM 전환(아날로그→디지털)은 역사상 가장 중요한 변조 변화. SAR은 낮지만 생물활성은 더 높다.",
      },
      {
        id: "layer3",
        label: "포화 층",
        period: "2005–2012",
        technologies: ["WiFi 라우터(2.4 GHz + 10 Hz beacon)", "3G/UMTS", "초기 스마트폰"],
        bermChannel: "RF + ELF (WiFi beacon 10 Hz) + ELF (50 Hz)",
        biologicalEffect:
          "WiFi beacon이 세 번째 ELF 원을 추가. 크레스트 팩터 100:1. 휴대전화가 귀에서 주머니로 → 고환이 근접장 내. WiFi 24/7 → 야간 멜라토닌 억제.",
        healthSignal:
          "아동 수면 장애 증가. 정자 수 감소 배증. 대사증후군 가속.",
        keyInsight:
          "주머니 속 휴대전화 전환이 정자 수 감소율 배증의 가장 간단한 설명. WiFi beacon은 모든 가정에서 24/7의 숨겨진 ELF 원.",
      },
      {
        id: "layer4",
        label: "역치 층",
        period: "2012–2020",
        technologies: ["스마트폰(4G LTE, 상시 접속)", "LED 조명", "Bluetooth 이어폰", "스마트홈 IoT"],
        bermChannel: "전체 3채널: ELF + IF (LED) + RF",
        biologicalEffect:
          "CaMKII 자가인산화 역치가 인구 수준에서 최초로 초과. IF 채널 개방(EU 금지 후 LED 의무화). 회복 창 = 0.",
        healthSignal:
          "2012년 변곡점: 청소년 정신건강 위기 시작. SNS(2003년부터 존재)로는 설명 불가 — 기기 변화로 설명.",
        keyInsight:
          "2012년은 축적적 다주파 Ca²⁺ 부하가 CaMKII 자가인산화 역치를 인구 수준에서 초과한 해. IF 채널(LED) 개방이 역사상 최초의 3채널 노출을 만들었다.",
      },
      {
        id: "layer5",
        label: "가속 층",
        period: "2020–현재",
        technologies: ["5G FR1/FR2", "전기차", "IoT 기기 증가", "무선 충전", "LED 가로등"],
        bermChannel: "모든 채널 최대. IF가 가장 빠르게 확대.",
        biologicalEffect:
          "[[ref:sousouri2025|Sousouri 2025]]: CACNA1C 유전자형이 5G 수면 반응을 결정한다. EV 차실: 통근 중 IF 노출. 남은 회복 창 없음.",
        healthSignal:
          "TFR 붕괴가 전 세계적으로 가속. 한국 0.72 (2024). 제도적 신뢰 역사적 저점.",
        keyInsight:
          "IF 채널은 가장 빠르게 성장하고 가장 적게 규제된다. EV 인버터, 무선 충전 및 LED 드라이버는 모두 [[ref:ttfields_mechanism|TTFields]](FDA 승인)가 생물활성을 보인 20~300 kHz 범위에서 작동한다.",
      },
    ] as TechLayer[],

    temporalTitle: "시간적 상관관계",
    spermTitle: "정자 수 vs. 기술 채택",
    spermRows: [
      { period: "1973–1990", tech: "전력망만 + NMT(드문, 아날로그)", rate: "−0.93 M/ml/yr", explanation: "ELF 프라이밍, 느린 축적" },
      { period: "1990–2000", tech: "+ GSM (217 Hz 펄세이션). 휴대전화 귀 옆", rate: "−1.16%/yr", explanation: "펄세이션 성분 증가" },
      { period: "2000–2018", tech: "+ 3G/4G 데이터폰 + WiFi 24/7 + LED", rate: "−2.64%/yr (2×)", explanation: "휴대전화가 주머니로 → 고환이 근접장 내 16시간/일. WiFi + LED가 배경 추가." },
    ],
    mentalTitle: "청소년 정신건강 vs. 기술 채택",
    mentalRows: [
      { period: "2003–2008", tech: "SNS (Facebook, MySpace) 스마트폰 없이", trend: "변화 없음", explanation: "컴퓨터 사용: 제한적, 신체 접촉 없음" },
      { period: "2008–2012", tech: "스마트폰 보급 시작", trend: "느린 상승", explanation: "전환기" },
      { period: "2012–2015", tech: "스마트폰 >50% 청소년 + WiFi 보편 + LED + BT 이어폰", trend: "폭발적 증가", explanation: "기기가 변화: 24/7 신체 접촉. 야간 사용 → 멜라토닌↓ → 코르티솔↑ (여성 2배)" },
      { period: "2015–2026", tech: "+ 5G + IoT + 전기차", trend: "계속 ↑↑", explanation: "회복 없음. 각 세대가 더 민감(CaMKII)." },
    ],

    profilesTitle: "14개 기술 프로파일",
    profilesLead:
      "각 기술은 고유한 EMF 시그니처를 생산하며 별개의 생물학적 함의를 지닌다. 채널, 변조, 근접성, 사용률이 중요하지 주파수만이 아니다.",

    why2012Title: "왜 2012년인가?",
    why2012Body:
      "소셜 미디어는 2003년부터 존재했다 — 정신건강 위기 없이. 위기는 2012년에 시작되었으며, 스마트폰이 청소년 50% 보급률을 넘었을 때이다. BERM의 설명: 2012년은 콘텐츠가 아니라 기기에 관한 것이었다. 스마트폰은 지속적인 신체 접촉 EMF 노출(WiFi + 4G + Bluetooth, 24/7, 야간 침대 포함)을 가져왔다. 기존 전력망 ELF 프라이밍과 새로 의무화된 LED 조명(EU 금지 2009-2012)과 결합되어, 2012년은 축적적 다주파 Ca²⁺ 부하가 CaMKII 자가인산화 역치를 인구 수준에서 초과한 해였다.",
    why2012Prediction:
      "예측: 콘텐츠 제한(호주, 노르웨이)은 위기를 해결하지 못할 것이다. 메커니즘이 하드웨어이지 콘텐츠가 아니기 때문이다.",

    modelLink: "3채널 메커니즘",
    predictionsLink: "전체 예측",
    pharmLink: "약리학적 근거",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
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
  const d = pickCopy(COPY, locale);

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
        <p className="text-muted-foreground mb-4">
          <InlineReferenceText text={d.elfBody} locale={locale} />
        </p>
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
            <p className="text-xs text-muted-foreground">
              <InlineReferenceText text={d.superMech2} locale={locale} />
            </p>
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
                  <p className="font-medium mb-1">Biological: <span className="font-normal text-muted-foreground"><InlineReferenceText text={layer.biologicalEffect} locale={locale} /></span></p>
                </div>
                <div>
                  <p className="font-medium mb-1">Health signal: <span className="font-normal text-muted-foreground"><InlineReferenceText text={layer.healthSignal} locale={locale} /></span></p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-violet-500/10 p-3">
                <p className="text-xs font-medium">
                  <InlineReferenceText text={layer.keyInsight} locale={locale} />
                </p>
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
                <p className="text-[10px] mt-2 text-muted-foreground/70">
                  <InlineReferenceText text={t.keyRef} locale={locale} />
                </p>
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
