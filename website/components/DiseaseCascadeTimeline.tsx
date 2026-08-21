"use client";

import { useState } from "react";

/* ── Bilingual labels ── */
const COPY = {
  en: {
    sectionTitle: "Chronic Disease Cascade",
    sectionSub: "Seven diseases, four EMF channels, one cascade logic — each mechanism validated by at least one FDA-cleared therapeutic device.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<1 kHz)", IF: "IF (1k–1M Hz)", RF: "RF (>1 MHz)" } as Record<string, string>,
    techBandLabel: "Technology rollout — four frequency channels",
    diseaseLabel: "Disease incidence (1990 = 100)",
    covid: "COVID",
    ifDown: "IF ↓70%",
    rfUp: "RF ↑40%",
    selectPrompt: "Click a disease line or legend item to inspect",
    detailCascade: "Cascade order",
    detailLatency: "Latency",
    detailChannel: "Primary channel",
    detailSecondary: "Secondary",
    detailMechanism: "Mechanism",
    detailModulome: "Modulome level",
    detailPathway: "BERM pathway",
    detailFdaTitle: "FDA Validation",
    detailFdaClearance: "Clearance",
    detailFdaMatch: "Mechanism match",
    detailCovidTitle: "COVID Retrodiction",
    detailCovidPrediction: "Prediction",
    detailCovidEvidence: "Evidence",
    detailAccel: "Acceleration",
    detailAccelTech: "Linked technology",
    detailAccelLag: "Lag",
    detailAccelWhy: "Explanation",
    dataQuality: { GBD_direct: "GBD data", meta_estimate: "Meta-estimate", indicative: "Indicative" } as Record<string, string>,
    footerModel: "Modulome prediction: one root cause (chronic EMF exposure across 4 channels) produces 7 disease cascades in different tissues with different latencies. Cascade order follows the modulome's 8 biological levels: fastest response at level 5 (pineal → sleep), slowest at level 7 (cumulative depolarisation → cancer). Each mechanism is validated by at least one FDA-cleared therapeutic device.",
    footerData: "Trend indices are estimates from published meta-analyses and reviews (1990 = 100). Not direct GBD incidence figures. DIAGNOSTIC — requires quantitative GBD/IHME data before publication. Dashed vertical lines = statistical acceleration point for each disease. Diagonal lines = BERM-predicted technology link + lag.",
    years: "y",
  },
  fi: {
    sectionTitle: "Kroonisten sairauksien kaskadi",
    sectionSub: "Seitsemän sairautta, neljä EMF-kanavaa, yksi kaskadimalli — jokainen mekanismi validoitu vähintään yhdellä FDA-hyväksytyllä terapeuttisella laitteella.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<1 kHz)", IF: "IF (1k–1M Hz)", RF: "RF (>1 MHz)" } as Record<string, string>,
    techBandLabel: "Teknologian rollout — neljä taajuuskanavaa",
    diseaseLabel: "Sairauden insidenssi (1990 = 100)",
    covid: "COVID",
    ifDown: "IF ↓70 %",
    rfUp: "RF ↑40 %",
    selectPrompt: "Klikkaa sairauksen viivaa tai legendaa tarkastellaksesi",
    detailCascade: "Kaskadijärjestys",
    detailLatency: "Viive",
    detailChannel: "Pääkanava",
    detailSecondary: "Toissijainen",
    detailMechanism: "Mekanismi",
    detailModulome: "Modulooman taso",
    detailPathway: "BERM-polku",
    detailFdaTitle: "FDA-validointi",
    detailFdaClearance: "Hyväksyntä",
    detailFdaMatch: "Mekanismivastaavuus",
    detailCovidTitle: "COVID-retrodiktio",
    detailCovidPrediction: "Ennuste",
    detailCovidEvidence: "Evidenssi",
    detailAccel: "Kiihtymispiste",
    detailAccelTech: "Kytkeytyy teknologiaan",
    detailAccelLag: "Viive",
    detailAccelWhy: "Selitys",
    dataQuality: { GBD_direct: "GBD-data", meta_estimate: "Meta-arvio", indicative: "Suuntaa-antava" } as Record<string, string>,
    footerModel: "Modulaatioverkon ennuste: yksi perussyy (krooninen EMF-altistuksen kasvu 4 kanavalla) tuottaa 7 eri sairauskaskadia eri kudoksissa eri viiveillä. Kaskadijärjestys seuraa modulooman 8 tasoa: nopein vaste tasolla 5 (pinealirauhanen → uni), hitain tasolla 7 (solunjakautuminen → syöpä). Jokainen mekanismi on validoitu vähintään yhdellä FDA-hyväksytyllä terapeuttisella laitteella.",
    footerData: "Trendi-indeksit ovat arvioita julkaistuista meta-analyyseistä ja katsauksista (1990 = 100). Eivät suoria GBD-insidenssilukuja. DIAGNOSTIC — vaatii kvantitatiivisen GBD/IHME-datan ennen julkaisua. Katkoviivaiset pystyviivat = kunkin sairauden tilastollinen kiihtymispiste. Vinot kytkentäviivat = BERM:n ennustama teknologia-kytkentä + viive.",
    years: "v",
  },
} as const;

/* ── Channel config ── */
type Channel = "STATIC" | "ELF" | "IF" | "RF";
const CHANNELS: Channel[] = ["STATIC", "ELF", "IF", "RF"];
const CHANNEL_COLORS: Record<Channel, string> = {
  STATIC: "#6B7280",
  ELF: "#3B82F6",
  IF: "#F59E0B",
  RF: "#EF4444",
};

/* ── Tech eras ── */
interface TechEra {
  id: string;
  label: string;
  start: number;
  end: number;
  channel: Channel;
  opacity: number;
}

const TECH_ERAS: TechEra[] = [
  { id: "polyester", label: "Synth. clothing", start: 1990, end: 2026, channel: "STATIC", opacity: 0.35 },
  { id: "grid50hz", label: "50/60 Hz grid", start: 1950, end: 2026, channel: "ELF", opacity: 0.25 },
  { id: "ev", label: "EV (ELF+IF)", start: 2015, end: 2026, channel: "ELF", opacity: 0.4 },
  { id: "smps", label: "SMPS", start: 1995, end: 2026, channel: "IF", opacity: 0.35 },
  { id: "led", label: "LED (EU)", start: 2009, end: 2026, channel: "IF", opacity: 0.55 },
  { id: "vfd", label: "HVAC VFD", start: 2000, end: 2026, channel: "IF", opacity: 0.3 },
  { id: "induction", label: "Induction", start: 2005, end: 2026, channel: "IF", opacity: 0.35 },
  { id: "2g", label: "2G", start: 1991, end: 2005, channel: "RF", opacity: 0.3 },
  { id: "3g", label: "3G", start: 2001, end: 2012, channel: "RF", opacity: 0.35 },
  { id: "wifi", label: "Wi-Fi", start: 1999, end: 2026, channel: "RF", opacity: 0.3 },
  { id: "smartphone", label: "Smartphone", start: 2007, end: 2026, channel: "RF", opacity: 0.55 },
  { id: "4g", label: "4G", start: 2009, end: 2026, channel: "RF", opacity: 0.45 },
  { id: "tws", label: "TWS", start: 2016, end: 2026, channel: "RF", opacity: 0.4 },
  { id: "5g", label: "5G", start: 2019, end: 2026, channel: "RF", opacity: 0.55 },
];

/* ── Disease cascades ── */
type DataQuality = "GBD_direct" | "meta_estimate" | "indicative";
type CovidPrediction = "improve" | "worsen" | "mixed";

interface Disease {
  id: string;
  name: { en: string; fi: string };
  cascade_order: number;
  latency: { en: string; fi: string };
  color: string;
  modulome_level: number;
  modulome_name: { en: string; fi: string };
  channel_primary: Channel;
  channel_secondary?: string;
  mechanism: { en: string; fi: string };
  berm_pathway: string;
  fda_device: string;
  fda_clearance: string;
  fda_mechanism_match: { en: string; fi: string };
  acceleration_year: number;
  acceleration_tech_id: string;
  acceleration_lag: number;
  acceleration_lag_explanation: { en: string; fi: string };
  covid_prediction: CovidPrediction;
  covid_channel: string;
  covid_evidence?: { en: string; fi: string };
  trend: number[];
  sources: string;
  data_quality: DataQuality;
}

const TREND_YEARS = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024];

const DISEASES: Disease[] = [
  {
    id: "sleep",
    name: { en: "Sleep disorders", fi: "Unihäiriöt" },
    cascade_order: 1,
    latency: { en: "Shortest (weeks–months)", fi: "Lyhin (viikkoja–kuukausia)" },
    color: "#9B7FD4",
    modulome_level: 5,
    modulome_name: { en: "Neuromodulatory (melatonin/circadian)", fi: "Neuromodulatorinen (melatoniini/sirkadiaaninen)" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "Direct melatonin suppression in pineal + CRY clock disruption", fi: "Melatoniinin suora suppressio pinealirauhasessa + CRY-kellon häiriö" },
    berm_pathway: "C",
    fda_device: "TMS (rTMS)",
    fda_clearance: "FDA 510(k), multiple manufacturers",
    fda_mechanism_match: { en: "rTMS modulates the same neuromodulatory level that EMF disrupts", fi: "rTMS moduloi samaa neuromodulatorista tasoa jonka EMF häiritsee" },
    acceleration_year: 2007,
    acceleration_tech_id: "smartphone",
    acceleration_lag: 0,
    acceleration_lag_explanation: { en: "Immediate: phone on nightstand → melatonin suppression same night", fi: "Välitön: puhelin yöpöydälle → melatoniini-suppressio samana yönä" },
    covid_prediction: "worsen",
    covid_channel: "RF ↑",
    covid_evidence: { en: "CDC: sleep medication prescriptions +14.8% in 2020 vs 2019", fi: "CDC: unilääkemääräykset +14,8 % 2020 vs. 2019" },
    trend: [60, 65, 72, 100, 115, 138, 162, 210, 275, 340, 385],
    sources: "GBD 2019, WHO, CDC NHANES",
    data_quality: "meta_estimate",
  },
  {
    id: "depression",
    name: { en: "Depression (esp. youth)", fi: "Masennus (erit. nuoret)" },
    cascade_order: 2,
    latency: { en: "Short (months–1-3 years)", fi: "Lyhyt (kuukausia–1–3 vuotta)" },
    color: "#6B9FD4",
    modulome_level: 4,
    modulome_name: { en: "Becker DC control system", fi: "Beckerin DC-ohjausjärjestelmä" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "DC current disruption + HPA activation → cortisol ↑ + melatonin ↓", fi: "DC-virtahäiriö + HPA-aktivaatio → kortisoli ↑ + melatoniini ↓" },
    berm_pathway: "B+C+D",
    fda_device: "TMS + tDCS",
    fda_clearance: "TMS: FDA 510(k) 2008; tDCS: FDA De Novo 2025 (Flow)",
    fda_mechanism_match: { en: "tDCS works at 0.3–1.0 V/m — urban ambient is 0.67–1.51 V/m (anti-tDCS)", fi: "tDCS toimii 0,3–1,0 V/m:llä — kaupungin ambient on 0,67–1,51 V/m (anti-tDCS)" },
    acceleration_year: 2012,
    acceleration_tech_id: "smartphone",
    acceleration_lag: 5,
    acceleration_lag_explanation: { en: "Smartphone mass adoption 2007–2012 → depression acceleration ~2012. Lag from cumulative HPA stress.", fi: "Älypuhelin massoihin 2007–2012 → kiihtymä ~2012. Viive kumulatiivisesta HPA-kuormituksesta." },
    covid_prediction: "worsen",
    covid_channel: "RF ↑",
    covid_evidence: { en: "WHO: depression prevalence +25% globally 2020", fi: "WHO: masennusprevalenssi +25 % globaalisti 2020" },
    trend: [55, 62, 70, 100, 110, 125, 140, 178, 260, 350, 410],
    sources: "GBD 2019, Twenge 2020, WHO 2022",
    data_quality: "meta_estimate",
  },
  {
    id: "adhd_asd",
    name: { en: "ADHD / Autism spectrum", fi: "ADHD / autismikirjo" },
    cascade_order: 3,
    latency: { en: "Short–medium (fetal + childhood exposure → diagnosis 3–10y)", fi: "Lyhyt–keskipitkä (sikiö + lapsuus → diagnoosi 3–10 v)" },
    color: "#5AAD8B",
    modulome_level: 6,
    modulome_name: { en: "Cell division control (Levin level)", fi: "Solunjakautumisen ohjaus (Levin-taso)" },
    channel_primary: "RF",
    channel_secondary: "IF",
    mechanism: { en: "BBB permeability + developing nervous system VGCC disruption + IF division interference", fi: "BBB-permeabiliteetti + kehittyvän hermoston VGCC-häiriö + IF-jakautumishäiriö" },
    berm_pathway: "F + cell division",
    fda_device: "VNS",
    fda_clearance: "VNS: FDA PMA 1997 (Cyberonics/LivaNova)",
    fda_mechanism_match: { en: "VNS modulates vagal reflex controlling neuroinflammation. EMF disrupts the same reflex (anti-VNS hypothesis).", fi: "VNS moduloi vagaalista refleksiä joka säätelee neuroinflammatorista tilaa. EMF häiritsee samaa refleksiä (anti-VNS)." },
    acceleration_year: 1995,
    acceleration_tech_id: "2g",
    acceleration_lag: 4,
    acceleration_lag_explanation: { en: "2G mass adoption 1991–1995 → fetal exposure → diagnosis 3–8y later. Li 2018 JAMA: maternal EMF ↔ ADHD risk.", fi: "2G massoihin 1991–1995 → sikiöaltistus → diagnoosi 3–8 v myöhemmin. Li 2018 JAMA." },
    covid_prediction: "mixed",
    covid_channel: "Diagnoses delayed",
    covid_evidence: { en: "Diagnostic drop 2020 (artefact), recovery 2021–2022", fi: "Diagnoosien lasku 2020 (artefakti), palautuminen 2021–2022" },
    trend: [35, 42, 55, 100, 145, 220, 310, 410, 520, 600, 660],
    sources: "GBD 2019, Li 2018 JAMA",
    data_quality: "meta_estimate",
  },
  {
    id: "metabolic",
    name: { en: "Metabolic syndrome / T2D", fi: "Metabolinen oireyhtymä / T2D" },
    cascade_order: 4,
    latency: { en: "Medium (3–8 years cumulative)", fi: "Keskipitkä (3–8 vuotta kumulatiivista)" },
    color: "#D4A85A",
    modulome_level: 2,
    modulome_name: { en: "Ion channel level (VGCC/K-ATP)", fi: "Ionikanavien taso (VGCC/K-ATP)" },
    channel_primary: "ELF",
    channel_secondary: "RF",
    mechanism: { en: "K-ATP channel disruption in pancreatic β-cells → insulin dysregulation", fi: "K-ATP-kanavahäiriö haiman β-soluissa → insuliinisäätelyn häiriö" },
    berm_pathway: "B (metabolic ext.)",
    fda_device: "PEMF",
    fda_clearance: "PEMF: FDA 510(k), multiple (1979–)",
    fda_mechanism_match: { en: "PEMF activates adenosine receptors and modulates ion channels therapeutically. Environmental ELF disrupts the same channels chronically.", fi: "PEMF aktivoi adenosiinireseptoreita ja moduloi ionikanavia terapeuttisesti. Ympäristö-ELF häiritsee samoja kanavia kroonisesti." },
    acceleration_year: 1993,
    acceleration_tech_id: "smps",
    acceleration_lag: -2,
    acceleration_lag_explanation: { en: "SMPS proliferated with the PC revolution in the 1990s. Klimentidis 2010: even lab control animals are gaining weight — diet doesn't explain it.", fi: "SMPS-hakkurit yleistyivät PC-vallankumouksen myötä. Klimentidis 2010: MYÖS laboratorion kontrollieläimet lihovat." },
    covid_prediction: "mixed",
    covid_channel: "IF ↓ but activity ↓",
    covid_evidence: { en: "T2D diagnoses increased during COVID but causes are multifactorial", fi: "T2D-diagnoosit kasvoivat COVID-aikana mutta syyt monitekijäisiä" },
    trend: [40, 50, 65, 100, 145, 210, 290, 375, 440, 510, 560],
    sources: "IDF Diabetes Atlas 10th ed, GBD 2019, Klimentidis 2010",
    data_quality: "meta_estimate",
  },
  {
    id: "autoimmune",
    name: { en: "Autoimmune diseases", fi: "Autoimmuunisairaudet" },
    cascade_order: 5,
    latency: { en: "Medium–long (5–10 years cumulative)", fi: "Keskipitkä–pitkä (5–10 vuotta)" },
    color: "#D47A8B",
    modulome_level: 3,
    modulome_name: { en: "Bioelectric pattern (Levin morphogenetic code)", fi: "Bioelektrinen kuvio (Levinin morfogeneettinen koodi)" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "VGCC → Ca²⁺ → NF-κB activation + vagal anti-inflammatory reflex weakening", fi: "VGCC → Ca²⁺ → NF-κB-aktivaatio + vagaalisen anti-inflammatorisen refleksin heikkeneminen" },
    berm_pathway: "E",
    fda_device: "VNS",
    fda_clearance: "VNS: FDA PMA 1997 epilepsy, 2005 depression, off-label RA+IBD",
    fda_mechanism_match: { en: "VNS activates cholinergic anti-inflammatory reflex → reduces TNF-α and IL-6. EMF weakens the same reflex chronically (anti-VNS). Koopman 2016 PNAS.", fi: "VNS aktivoi kolinergisen anti-inflammatorisen refleksin → vähentää TNF-α:a ja IL-6:ta. EMF heikentää samaa refleksiä kroonisesti. Koopman 2016 PNAS." },
    acceleration_year: 1996,
    acceleration_tech_id: "2g",
    acceleration_lag: 5,
    acceleration_lag_explanation: { en: "2G mass adoption 1991–1995 → cumulative immune suppression → autoimmune acceleration ~1996. NF-κB activation lag is longer than acute neuromodulatory response.", fi: "2G massoihin 1991–1995 → kumulatiivinen immuunisuppressio → kiihtymä ~1996. NF-κB-aktivaation viive on pidempi kuin akuutin vasteen." },
    covid_prediction: "mixed",
    covid_channel: "Post-COVID confounds",
    covid_evidence: { en: "Post-COVID autoimmune surge confounds the signal", fi: "Post-COVID-autoimmuunisairauksien kasvu sekoittaa signaalin" },
    trend: [50, 58, 68, 100, 135, 185, 240, 300, 360, 420, 470],
    sources: "GBD 2019, Pall 2013, Koopman 2016 PNAS",
    data_quality: "meta_estimate",
  },
  {
    id: "fertility",
    name: { en: "Infertility / sperm ↓62%", fi: "Hedelmättömyys / siittiö ↓62 %" },
    cascade_order: 6,
    latency: { en: "Long (spermatogenesis 74d + cumulative 5–15y)", fi: "Pitkä (spermatogeneesi 74 pv + kumulatiivinen 5–15 v)" },
    color: "#D4845A",
    modulome_level: 6,
    modulome_name: { en: "Cell division control + ion channels", fi: "Solunjakautumisen ohjaus + ionikanavat" },
    channel_primary: "IF",
    channel_secondary: "RF",
    mechanism: { en: "CatSper-VGCC disruption (RF) + spermatogonial IF resonance (TTFields logic)", fi: "CatSper-VGCC-häiriö (RF) + spermatogonioiden IF-resonanssi (TTFields-logiikka)" },
    berm_pathway: "A (core)",
    fda_device: "TTFields (Optune)",
    fda_clearance: "TTFields: FDA PMA 2011 (GBM), 2019 (mesothelioma), 2025 (NSCLC)",
    fda_mechanism_match: { en: "TTFields inhibits cell division at 100–500 kHz IF. LED drivers produce 20–200 kHz IF. Spermatogonial size (~12 µm) → f_opt ≈ 150 kHz. LED drivers are continuous low-dose TTFields for spermatogenesis.", fi: "TTFields estää solunjakautumisen 100–500 kHz IF-kentällä. LED-hakkurit tuottavat 20–200 kHz. Spermatogonioiden koko (~12 µm) → f_opt ≈ 150 kHz." },
    acceleration_year: 2000,
    acceleration_tech_id: "smps",
    acceleration_lag: 5,
    acceleration_lag_explanation: { en: "SMPS + early Wi-Fi 1995–2000 → cumulative spermatogenesis damage → sperm decline acceleration ~2000. Levine 2017/2023.", fi: "SMPS + varhaiset Wi-Fi 1995–2000 → kumulatiivinen spermatogeneesivaurio → siittiölaskun kiihtymä ~2000. Levine 2017/2023." },
    covid_prediction: "improve",
    covid_channel: "IF ↓↓",
    covid_evidence: { en: "Possible sperm quality improvement 2020 — IF channel drop explains COVID paradox", fi: "Mahdollinen siittiölaadun paraneminen 2020 — IF-kanavan lasku selittää COVID-paradoksin" },
    trend: [70, 78, 85, 100, 120, 150, 185, 230, 280, 340, 390],
    sources: "Levine 2017/2023, WHO umbrella review, Kirson 2007",
    data_quality: "meta_estimate",
  },
  {
    id: "cancer_young",
    name: { en: "Early-onset cancer (<50y)", fi: "Nuorten syöpä (<50 v)" },
    cascade_order: 7,
    latency: { en: "Longest (10–25 years cumulative depolarisation)", fi: "Pisin (10–25 vuotta kumulatiivista depolarisaatiota)" },
    color: "#A85A5A",
    modulome_level: 7,
    modulome_name: { en: "Tissue-level bioelectric homeostasis", fi: "Kudostason bioelektrinen homeostaasi" },
    channel_primary: "IF",
    channel_secondary: "RF",
    mechanism: { en: "Cumulative Vmem depolarisation → growth control loss (Levin bioelectric code)", fi: "Kumulatiivinen Vmem-depolarisaatio → kasvunhallinnan menetys (Levinin bioelektrinen koodi)" },
    berm_pathway: "Bioelectric code + NTP 2018",
    fda_device: "TTFields (Optune)",
    fda_clearance: "TTFields: FDA PMA 2011 (GBM), 2019, 2025",
    fda_mechanism_match: { en: "TTFields IS a cancer treatment → IF field affects cancer cells → environmental IF affects them too. Therapeutic dose is high (1–3 V/cm) but chronic low-dose IF accumulates over decades.", fi: "TTFields ON syöpähoito → IF-kenttä vaikuttaa syöpäsoluihin → ympäristö-IF vaikuttaa myös. Terapeuttinen annos on korkea mutta krooninen matala-annos kumuloituu." },
    acceleration_year: 1995,
    acceleration_tech_id: "smps",
    acceleration_lag: 0,
    acceleration_lag_explanation: { en: "Early-onset cancer growth began ~1995 (Zhao 2023 BMJ Oncology: +79% 1990–2019). 10–25y lag → 1995 acceleration reflects 1970–1985 exposure. NTP 2018: 'clear evidence' of schwannomas.", fi: "Nuorten syöpä alkoi kasvaa ~1995 (Zhao 2023 BMJ Oncology: +79 % 1990–2019). 10–25 v viive. NTP 2018: 'clear evidence' schwannoomista." },
    covid_prediction: "improve",
    covid_channel: "IF ↓ (long lag)",
    covid_evidence: { en: "IF↓ but lag too long for 2020–2024 data to show effect", fi: "IF ↓ mutta viive niin pitkä ettei 2020–2024-data näytä vielä muutosta" },
    trend: [80, 85, 90, 100, 112, 128, 148, 172, 198, 228, 255],
    sources: "Zhao 2023 BMJ Oncology, NTP 2018, Ramazzini 2018",
    data_quality: "meta_estimate",
  },
];

/* ── SVG layout constants ── */
const W = 860;
const ML = 52;
const MR = 16;
const CW = W - ML - MR;

const YEAR_START = 1975;
const YEAR_END = 2026;

const TECH_TOP = 22;
const TECH_ROW_H = 20;
const TECH_ROW_GAP = 3;
const TECH_BAND_H = CHANNELS.length * TECH_ROW_H + (CHANNELS.length - 1) * TECH_ROW_GAP;

const CHART_TOP = TECH_TOP + TECH_BAND_H + 28;
const CHART_H = 260;
const CHART_BOTTOM = CHART_TOP + CHART_H;

const Y_MAX = 700;

const AXIS_Y = CHART_BOTTOM + 4;
const SVG_H = AXIS_Y + 28;

/* ── Helpers ── */
function yearToX(year: number): number {
  return ML + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * CW;
}

function valueToY(value: number): number {
  return CHART_BOTTOM - (value / Y_MAX) * CHART_H;
}

function trendToPath(trend: number[]): string {
  return trend
    .map((v, i) => {
      const x = yearToX(TREND_YEARS[i]);
      const y = valueToY(v);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function channelRowY(ch: Channel): number {
  const idx = CHANNELS.indexOf(ch);
  return TECH_TOP + idx * (TECH_ROW_H + TECH_ROW_GAP);
}

/* ── Component ── */
interface Props {
  locale: string;
}

export function DiseaseCascadeTimeline({ locale }: Props) {
  const t = locale === "fi" ? COPY.fi : COPY.en;
  const [selected, setSelected] = useState<string | null>(null);

  const detail = selected ? DISEASES.find((d) => d.id === selected) : null;

  const covidX1 = yearToX(2020);
  const covidX2 = yearToX(2022);

  const gridYears = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025];
  const gridValues = [0, 100, 200, 300, 400, 500, 600, 700];

  return (
    <section className="mt-12 mb-10">
      <h3 className="editorial-section-heading mb-1">{t.sectionTitle}</h3>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl">{t.sectionSub}</p>

      {/* ── SVG chart ── */}
      <div className="data-figure">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <svg
              viewBox={`0 0 ${W} ${SVG_H}`}
              className="w-full"
              role="img"
              aria-label={t.sectionTitle}
            >
              {/* Background fill for chart area */}
              <rect
                x={ML}
                y={CHART_TOP}
                width={CW}
                height={CHART_H}
                fill="var(--color-figure-bg, var(--color-card-bg))"
                rx={3}
              />

              {/* ── Year grid lines ── */}
              {gridYears.map((y) => (
                <line
                  key={`gy-${y}`}
                  x1={yearToX(y)}
                  y1={CHART_TOP}
                  x2={yearToX(y)}
                  y2={CHART_BOTTOM}
                  stroke="var(--color-foreground-muted)"
                  strokeOpacity={0.1}
                  strokeDasharray="2 4"
                />
              ))}

              {/* ── Value grid lines ── */}
              {gridValues.map((v) => (
                <g key={`gv-${v}`}>
                  <line
                    x1={ML}
                    y1={valueToY(v)}
                    x2={ML + CW}
                    y2={valueToY(v)}
                    stroke="var(--color-foreground-muted)"
                    strokeOpacity={v === 100 ? 0.3 : 0.08}
                    strokeDasharray={v === 100 ? "4 2" : "2 4"}
                  />
                  {v > 0 && (
                    <text
                      x={ML - 4}
                      y={valueToY(v) + 3}
                      textAnchor="end"
                      fontSize={8}
                      fontFamily="var(--font-data)"
                      fill="var(--color-foreground-muted)"
                      opacity={0.6}
                    >
                      {v}
                    </text>
                  )}
                </g>
              ))}

              {/* ── Baseline 100 label ── */}
              <text
                x={ML - 4}
                y={valueToY(100) - 6}
                textAnchor="end"
                fontSize={7}
                fontFamily="var(--font-data)"
                fill="var(--color-foreground-muted)"
                opacity={0.5}
              >
                1990
              </text>

              {/* ── Tech band label ── */}
              <text
                x={ML}
                y={TECH_TOP - 7}
                fontSize={8}
                fontFamily="var(--font-data)"
                fill="var(--color-foreground-muted)"
                letterSpacing="0.04em"
              >
                {t.techBandLabel.toUpperCase()}
              </text>

              {/* ── Tech era bands ── */}
              {CHANNELS.map((ch) => {
                const ry = channelRowY(ch);
                const eras = TECH_ERAS.filter((e) => e.channel === ch);
                const chColor = CHANNEL_COLORS[ch];
                return (
                  <g key={ch}>
                    {/* Channel background */}
                    <rect
                      x={ML}
                      y={ry}
                      width={CW}
                      height={TECH_ROW_H}
                      fill={chColor}
                      opacity={0.04}
                      rx={2}
                    />
                    {/* Channel label */}
                    <text
                      x={ML - 4}
                      y={ry + TECH_ROW_H / 2 + 3}
                      textAnchor="end"
                      fontSize={7}
                      fontFamily="var(--font-data)"
                      fill={chColor}
                      fontWeight={500}
                    >
                      {t.channelLabels[ch]}
                    </text>
                    {/* Era rectangles */}
                    {eras.map((era) => {
                      const x1 = yearToX(Math.max(era.start, YEAR_START));
                      const x2 = yearToX(Math.min(era.end, YEAR_END));
                      const ew = x2 - x1;
                      return (
                        <g key={era.id}>
                          <rect
                            x={x1}
                            y={ry + 1}
                            width={ew}
                            height={TECH_ROW_H - 2}
                            fill={chColor}
                            opacity={era.opacity}
                            rx={2}
                          />
                          {ew > 30 && (
                            <text
                              x={x1 + ew / 2}
                              y={ry + TECH_ROW_H / 2 + 3}
                              textAnchor="middle"
                              fontSize={ew > 60 ? 7.5 : 6}
                              fontFamily="var(--font-data)"
                              fill="var(--color-foreground)"
                              opacity={0.85}
                              fontWeight={500}
                            >
                              {era.label}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* ── COVID zone ── */}
              <rect
                x={covidX1}
                y={CHART_TOP}
                width={covidX2 - covidX1}
                height={CHART_H}
                fill="var(--color-foreground)"
                opacity={0.04}
              />
              <text
                x={(covidX1 + covidX2) / 2}
                y={CHART_TOP + 14}
                textAnchor="middle"
                fontSize={9}
                fontFamily="var(--font-data)"
                fill="var(--color-foreground-muted)"
                fontWeight={500}
              >
                {t.covid}
              </text>
              <text
                x={(covidX1 + covidX2) / 2}
                y={CHART_TOP + 26}
                textAnchor="middle"
                fontSize={7.5}
                fontFamily="var(--font-data)"
                fill={CHANNEL_COLORS.IF}
              >
                {t.ifDown}
              </text>
              <text
                x={(covidX1 + covidX2) / 2}
                y={CHART_TOP + 37}
                textAnchor="middle"
                fontSize={7.5}
                fontFamily="var(--font-data)"
                fill={CHANNEL_COLORS.RF}
              >
                {t.rfUp}
              </text>

              {/* ── Disease trend lines ── */}
              {DISEASES.map((d) => {
                const isSelected = d.id === selected;
                const dimmed = selected !== null && !isSelected;
                return (
                  <path
                    key={d.id}
                    d={trendToPath(d.trend)}
                    fill="none"
                    stroke={d.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={dimmed ? 0.15 : 1}
                    className="cursor-pointer transition-opacity"
                    onClick={() => setSelected(isSelected ? null : d.id)}
                  />
                );
              })}

              {/* ── End-of-line labels ── */}
              {DISEASES.map((d) => {
                const lastVal = d.trend[d.trend.length - 1];
                const dimmed = selected !== null && d.id !== selected;
                return (
                  <text
                    key={`lbl-${d.id}`}
                    x={yearToX(2024) + 4}
                    y={valueToY(lastVal) + 3}
                    fontSize={7.5}
                    fontFamily="var(--font-data)"
                    fill={d.color}
                    opacity={dimmed ? 0.15 : 0.9}
                    fontWeight={500}
                  >
                    {lastVal}
                  </text>
                );
              })}

              {/* ── Acceleration markers ── */}
              {DISEASES.map((d) => {
                const isSelected = d.id === selected;
                if (!isSelected && selected !== null) return null;
                const ax = yearToX(d.acceleration_year);
                return (
                  <line
                    key={`acc-${d.id}`}
                    x1={ax}
                    y1={CHART_TOP}
                    x2={ax}
                    y2={CHART_BOTTOM}
                    stroke={d.color}
                    strokeWidth={isSelected ? 1.2 : 0.6}
                    strokeDasharray="3 3"
                    opacity={isSelected ? 0.7 : 0.2}
                  />
                );
              })}

              {/* ── Acceleration → tech connection lines (selected only) ── */}
              {detail && (() => {
                const techEra = TECH_ERAS.find((e) => e.id === detail.acceleration_tech_id);
                if (!techEra) return null;
                const accelX = yearToX(detail.acceleration_year);
                const techMassYear = Math.min(techEra.end, techEra.start + 5);
                const techX = yearToX(techMassYear);
                const techY = channelRowY(techEra.channel) + TECH_ROW_H;
                const accelY = CHART_TOP;
                const midX = (techX + accelX) / 2;
                const midY = (techY + accelY) / 2;
                return (
                  <g opacity={0.6}>
                    <line
                      x1={techX}
                      y1={techY}
                      x2={accelX}
                      y2={accelY}
                      stroke={detail.color}
                      strokeWidth={1.2}
                      strokeDasharray="4 2"
                    />
                    <text
                      x={midX}
                      y={midY - 4}
                      textAnchor="middle"
                      fontSize={7.5}
                      fontFamily="var(--font-data)"
                      fill={detail.color}
                      fontWeight={500}
                    >
                      {detail.acceleration_lag >= 0 ? "+" : ""}{detail.acceleration_lag}{t.years}
                    </text>
                  </g>
                );
              })()}

              {/* ── Year axis ── */}
              <line
                x1={ML}
                y1={CHART_BOTTOM}
                x2={ML + CW}
                y2={CHART_BOTTOM}
                stroke="var(--color-foreground-muted)"
                strokeOpacity={0.3}
              />
              {gridYears.map((y) => (
                <text
                  key={`ax-${y}`}
                  x={yearToX(y)}
                  y={AXIS_Y + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily="var(--font-data)"
                  fill="var(--color-foreground-muted)"
                >
                  {y}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="data-figure__caption">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 py-1">
            {DISEASES.map((d) => {
              const isSelected = d.id === selected;
              const l = locale === "fi" ? d.name.fi : d.name.en;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelected(isSelected ? null : d.id)}
                  className={`inline-flex items-center gap-1.5 text-[0.7rem] font-medium transition-opacity ${
                    selected && !isSelected ? "opacity-30" : "opacity-100"
                  }`}
                  style={{ color: d.color }}
                >
                  <span
                    className="inline-block w-3 h-[2px] rounded-full"
                    style={{ background: d.color }}
                  />
                  {d.cascade_order}. {l}
                </button>
              );
            })}
          </div>
          {!selected && (
            <p className="text-[0.65rem] text-foreground-muted mt-1 opacity-60">{t.selectPrompt}</p>
          )}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {detail && (
        <div className="mt-4 rounded-lg border border-card-border bg-card-bg overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-card-border">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ background: detail.color }}
              />
              <h4 className="text-sm font-semibold truncate">
                {detail.cascade_order}. {locale === "fi" ? detail.name.fi : detail.name.en}
              </h4>
              <span className="text-[0.65rem] font-mono text-foreground-muted shrink-0">
                {t.detailCascade} {detail.cascade_order}/7
              </span>
            </div>
            <DataQualityBadge quality={detail.data_quality} label={t.dataQuality[detail.data_quality]} />
          </div>

          {/* Body grid */}
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-card-border text-[0.78rem]">
            {/* Left column: biology */}
            <div className="p-4 space-y-2.5">
              <Row label={t.detailLatency} value={locale === "fi" ? detail.latency.fi : detail.latency.en} />
              <Row label={t.detailChannel} value={`${detail.channel_primary} (${CHANNEL_COLORS[detail.channel_primary] ? "χ" : ""})`}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1"
                  style={{ background: CHANNEL_COLORS[detail.channel_primary] }}
                />
                {detail.channel_primary}
              </Row>
              {detail.channel_secondary && (
                <Row label={t.detailSecondary} value={detail.channel_secondary} />
              )}
              <Row label={t.detailMechanism} value={locale === "fi" ? detail.mechanism.fi : detail.mechanism.en} />
              <Row label={t.detailModulome} value={`${detail.modulome_level}: ${locale === "fi" ? detail.modulome_name.fi : detail.modulome_name.en}`} />
              <Row label={t.detailPathway} value={detail.berm_pathway} />
            </div>

            {/* Right column: validation + COVID */}
            <div className="p-4 space-y-3">
              {/* FDA */}
              <div>
                <p className="text-[0.65rem] font-semibold text-accent uppercase tracking-wider mb-1">{t.detailFdaTitle}</p>
                <p className="text-[0.75rem] font-medium">{detail.fda_device}</p>
                <p className="text-[0.7rem] text-foreground-muted mt-0.5">{detail.fda_clearance}</p>
                <p className="text-[0.72rem] mt-1">{locale === "fi" ? detail.fda_mechanism_match.fi : detail.fda_mechanism_match.en}</p>
              </div>

              {/* COVID */}
              <div className="pt-2 border-t border-card-border">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider mb-1" style={{ color: CHANNEL_COLORS.RF }}>{t.detailCovidTitle}</p>
                <Row label={t.detailCovidPrediction}>
                  <CovidBadge prediction={detail.covid_prediction} /> {detail.covid_channel}
                </Row>
                {detail.covid_evidence && (
                  <p className="text-[0.72rem] text-foreground-muted mt-1">{locale === "fi" ? detail.covid_evidence.fi : detail.covid_evidence.en}</p>
                )}
              </div>

              {/* Acceleration */}
              <div className="pt-2 border-t border-card-border">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider mb-1" style={{ color: detail.color }}>{t.detailAccel}: ~{detail.acceleration_year}</p>
                <Row label={t.detailAccelTech} value={TECH_ERAS.find((e) => e.id === detail.acceleration_tech_id)?.label ?? detail.acceleration_tech_id} />
                <Row label={t.detailAccelLag} value={`${detail.acceleration_lag >= 0 ? "+" : ""}${detail.acceleration_lag} ${t.years}`} />
                <p className="text-[0.72rem] text-foreground-muted mt-1">{locale === "fi" ? detail.acceleration_lag_explanation.fi : detail.acceleration_lag_explanation.en}</p>
              </div>

              <p className="text-[0.65rem] text-foreground-muted font-mono mt-2">{detail.sources}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer notes ── */}
      <div className="mt-4 rounded-md border border-card-border bg-card-bg px-4 py-3 space-y-2">
        <p className="text-[0.72rem] text-foreground-muted leading-relaxed">
          <span className="font-medium text-foreground text-[0.73rem]">
            {locale === "fi" ? "Modulaatioverkon ennuste:" : "Modulome prediction:"}
          </span>{" "}
          {t.footerModel}
        </p>
        <p className="text-[0.65rem] text-foreground-muted leading-relaxed opacity-70">
          {t.footerData}
        </p>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function Row({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-[0.76rem]">
      <span className="text-foreground-muted shrink-0 min-w-[90px]">{label}:</span>
      <span className="font-medium">{children ?? value}</span>
    </div>
  );
}

function DataQualityBadge({ quality, label }: { quality: DataQuality; label: string }) {
  const colors: Record<DataQuality, string> = {
    GBD_direct: "bg-[#22C55E]/10 text-[#22C55E]",
    meta_estimate: "bg-[#F59E0B]/10 text-[#F59E0B]",
    indicative: "bg-[#EF4444]/10 text-[#EF4444]",
  };
  return (
    <span className={`text-[0.6rem] font-mono font-medium px-2 py-0.5 rounded ${colors[quality]}`}>
      {label}
    </span>
  );
}

function CovidBadge({ prediction }: { prediction: CovidPrediction }) {
  const config: Record<CovidPrediction, { label: string; color: string }> = {
    improve: { label: "↑", color: "#22C55E" },
    worsen: { label: "↓", color: "#EF4444" },
    mixed: { label: "~", color: "#F59E0B" },
  };
  const c = config[prediction];
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded text-[0.65rem] font-bold mr-1"
      style={{ background: c.color + "18", color: c.color }}
    >
      {c.label}
    </span>
  );
}
