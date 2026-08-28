"use client";

import { useState } from "react";
import Link from "next/link";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

/* ── Bilingual labels ── */
const COPY = {
  en: {
    sectionTitle: "Chronic Disease Cascade",
    sectionSub: "Seven diseases, four EMF channels, one cascade logic — each mechanism validated by at least one FDA-cleared therapeutic device.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<300 Hz)", IF: "IF (300 Hz–10 MHz)", RF: "RF (>10 MHz)" } as Record<string, string>,
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
    footerModel: "Modulome prediction: one root cause (chronic EMF exposure across 4 channels) produces 7 disease cascades in different tissues with different latencies. Cascade order follows the modulome's 12 biological levels: fastest response at the pineal layer (sleep), slowest at the organ layer (cumulative depolarisation → cancer). Each mechanism is validated by at least one FDA-cleared therapeutic device. This cascade order is independently documented by sleep researcher [[ref:walker2017_why_we_sleep|Matthew Walker (UC Berkeley)]]: sleep disruption produces the same disease sequence — metabolic syndrome, depression, cardiovascular disease, cancer — in the same biological order predicted by the modulome's tissue-specific regeneration rates. Walker attributes the cascade to sleep deprivation without an EMF framework. BERM proposes that chronic EMF exposure is the upstream cause of the sleep deprivation that drives Walker's cascade.",
    footerData: "Trend indices from GBD 2023 (IHME via OWID) and published GBD estimates (1990 = 100). Depression uses OWID/GBD direct data. Other diseases use published GBD prevalence estimates with linear interpolation. Acceleration points calculated via moving-average second derivative (window=5). Dashed vertical lines = statistical acceleration point. Diagonal lines = BERM-predicted technology link + lag.",
    years: "y",
    footerModelLabel: "Modulome prediction:",
    linkMathDerivation: "See the mathematical derivation",
    linkCascadePredictions: "See predictions P11–P13",
  },
  fi: {
    sectionTitle: "Kroonisten sairauksien kaskadi",
    sectionSub: "Seitsemän sairautta, neljä EMF-kanavaa, yksi kaskadimalli — jokainen mekanismi validoitu vähintään yhdellä FDA-hyväksytyllä terapeuttisella laitteella.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<300 Hz)", IF: "IF (300 Hz–10 MHz)", RF: "RF (>10 MHz)" } as Record<string, string>,
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
    footerModel: "Modulaatioverkon ennuste: yksi perussyy (krooninen EMF-altistuksen kasvu 4 kanavalla) tuottaa 7 eri sairauskaskadia eri kudoksissa eri viiveillä. Kaskadijärjestys seuraa moduloomin 12 tasoa: nopein vaste pineaalitasolla (uni), hitain elimtasolla (solunjakautuminen → syöpä). Jokainen mekanismi on validoitu vähintään yhdellä FDA-hyväksytyllä terapeuttisella laitteella. Tämä kaskadijärjestys on dokumentoitu riippumattomasti unitutkija [[ref:walker2017_why_we_sleep|Matthew Walkerin (UC Berkeley)]] toimesta: unihäiriö tuottaa saman sairaussekvenssin — metabolinen oireyhtymä, masennus, sydänsairaus, syöpä — samassa biologisessa järjestyksessä jonka modulooman kudosspesifiset uusiutumisnopeudet ennustavat. Walker liittää kaskadin unideprivaatioon ilman EMF-kehystä. BERM ehdottaa kroonista EMF-altistusta ylävirran syyksi unideprivaatiolle joka ajaa Walkerin kaskadin.",
    footerData: "Trendi-indeksit GBD 2023:sta (IHME/OWID) ja julkaistuista GBD-estimaateista (1990 = 100). Masennus käyttää OWID/GBD-suoradataa. Muut sairaudet käyttävät julkaistuja GBD-prevalenssiestimaatteja lineaarisella interpolaatiolla. Kiihtymispisteet laskettu liukuvan keskiarvon toisella derivaatalla (ikkuna=5). Katkoviivat = tilastollinen kiihtymispiste. Vinot viivat = BERM:n ennustama teknologia-kytkentä + viive.",
    years: "v",
    footerModelLabel: "Modulaatioverkon ennuste:",
    linkMathDerivation: "Modulooman matemaattinen johtaminen",
    linkCascadePredictions: "Kaskadi-ennusteet P11–P13",
  },
  ja: {
    sectionTitle: "慢性疾患カスケード",
    sectionSub: "7つの疾患、4つのEMFチャネル、1つのカスケード論理 — 各メカニズムは少なくとも1つのFDA認可治療機器で検証済み。",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<300 Hz)", IF: "IF (300 Hz–10 MHz)", RF: "RF (>10 MHz)" } as Record<string, string>,
    techBandLabel: "技術導入 — 4つの周波数チャネル",
    diseaseLabel: "疾患発生率（1990 = 100）",
    covid: "COVID",
    ifDown: "IF ↓70%",
    rfUp: "RF ↑40%",
    selectPrompt: "疾患の線またはレジェンド項目をクリックして詳細を表示",
    detailCascade: "カスケード順序",
    detailLatency: "潜時",
    detailChannel: "主要チャネル",
    detailSecondary: "副次的",
    detailMechanism: "メカニズム",
    detailModulome: "モジュロームレベル",
    detailPathway: "BERMパスウェイ",
    detailFdaTitle: "FDA検証",
    detailFdaClearance: "認可",
    detailFdaMatch: "メカニズムの一致",
    detailCovidTitle: "COVID逆推定",
    detailCovidPrediction: "予測",
    detailCovidEvidence: "証拠",
    detailAccel: "加速",
    detailAccelTech: "関連技術",
    detailAccelLag: "遅延",
    detailAccelWhy: "説明",
    dataQuality: { GBD_direct: "GBDデータ", meta_estimate: "メタ推定", indicative: "示唆的" } as Record<string, string>,
    footerModel: "モジュロームの予測：1つの根本原因（4チャネルにわたる慢性EMF曝露）が、異なる組織で異なる潜時をもつ7つの疾患カスケードを生み出す。カスケード順序はモジュロームの12の生物学的レベルに従う：松果体層での最速応答（睡眠）、臓器層での最遅応答（累積的脱分極 → がん）。各メカニズムは少なくとも1つのFDA認可治療機器で検証済み。このカスケード順序は睡眠研究者[[ref:walker2017_why_we_sleep|Matthew Walker（UC Berkeley）]]によって独立に記録されている。睡眠障害は、メタボリックシンドローム、うつ病、心血管疾患、がんという同じ疾患系列を、モジュロームの組織固有の再生速度が予測するのと同じ生物学的順序で生じさせる。WalkerはこのカスケードをEMFの枠組みなしに睡眠不足に帰する。BERMは、慢性EMF曝露がWalkerのカスケードを駆動する睡眠不足の上流原因であると提案する。",
    footerData: "トレンド指数はGBD 2023（IHME/OWID）および公表済みGBD推定値（1990 = 100）から。うつ病はOWID/GBD直接データを使用。他の疾患は公表済みGBD有病率推定値を線形補間で使用。加速点は移動平均の二次導関数（ウィンドウ=5）で算出。点線垂直線 = 統計的加速点。斜線 = BERMが予測する技術関連 + 遅延。",
    years: "年",
    footerModelLabel: "モジュロームの予測：",
    linkMathDerivation: "数学的導出を見る",
    linkCascadePredictions: "カスケード予測 P11–P13 を見る",
  },
  fr: {
    sectionTitle: "Cascade de maladies chroniques",
    sectionSub: "Sept maladies, quatre canaux EMF, une logique de cascade — chaque mécanisme validé par au moins un dispositif thérapeutique approuvé par la FDA.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<300 Hz)", IF: "IF (300 Hz–10 MHz)", RF: "RF (>10 MHz)" } as Record<string, string>,
    techBandLabel: "Déploiement technologique — quatre canaux de fréquence",
    diseaseLabel: "Incidence des maladies (1990 = 100)",
    covid: "COVID",
    ifDown: "IF ↓70 %",
    rfUp: "RF ↑40 %",
    selectPrompt: "Cliquez sur une ligne de maladie ou un élément de légende pour inspecter",
    detailCascade: "Ordre de cascade",
    detailLatency: "Latence",
    detailChannel: "Canal principal",
    detailSecondary: "Secondaire",
    detailMechanism: "Mécanisme",
    detailModulome: "Niveau modulome",
    detailPathway: "Voie BERM",
    detailFdaTitle: "Validation FDA",
    detailFdaClearance: "Approbation",
    detailFdaMatch: "Concordance de mécanisme",
    detailCovidTitle: "Rétrodiction COVID",
    detailCovidPrediction: "Prédiction",
    detailCovidEvidence: "Preuve",
    detailAccel: "Accélération",
    detailAccelTech: "Technologie liée",
    detailAccelLag: "Décalage",
    detailAccelWhy: "Explication",
    dataQuality: { GBD_direct: "Données GBD", meta_estimate: "Méta-estimation", indicative: "Indicatif" } as Record<string, string>,
    footerModel: "Prédiction du modulome : une cause racine unique (exposition chronique aux EMF sur 4 canaux) produit 7 cascades de maladies dans différents tissus avec différentes latences. L'ordre de cascade suit les 12 niveaux biologiques du modulome : réponse la plus rapide au niveau pinéal (sommeil), la plus lente au niveau organique (dépolarisation cumulative → cancer). Chaque mécanisme est validé par au moins un dispositif thérapeutique approuvé par la FDA. Cet ordre de cascade est documenté indépendamment par le chercheur en sommeil [[ref:walker2017_why_we_sleep|Matthew Walker (UC Berkeley)]] : la perturbation du sommeil produit la même séquence de maladies — syndrome métabolique, dépression, maladie cardiovasculaire, cancer — dans le même ordre biologique que celui prédit par les taux de régénération propres aux tissus du modulome. Walker attribue la cascade à la privation de sommeil sans cadre EMF. Le BERM propose que l'exposition chronique aux EMF est la cause en amont de la privation de sommeil qui entraîne la cascade de Walker.",
    footerData: "Indices de tendance à partir de GBD 2023 (IHME via OWID) et d'estimations GBD publiées (1990 = 100). La dépression utilise les données directes OWID/GBD. Les autres maladies utilisent des estimations de prévalence GBD publiées avec interpolation linéaire. Points d'accélération calculés via la dérivée seconde de la moyenne mobile (fenêtre=5). Lignes verticales pointillées = point d'accélération statistique. Lignes diagonales = lien technologique prédit par le BERM + décalage.",
    years: "a",
    footerModelLabel: "Prédiction du modulome :",
    linkMathDerivation: "Voir la dérivation mathématique",
    linkCascadePredictions: "Voir les prédictions P11–P13",
  },
  ko: {
    sectionTitle: "만성 질환 캐스케이드",
    sectionSub: "7개 질환, 4개 EMF 채널, 하나의 캐스케이드 논리 — 각 메커니즘은 최소 1개의 FDA 인허가 치료기기로 검증됨.",
    channelLabels: { STATIC: "STATIC (DC)", ELF: "ELF (<300 Hz)", IF: "IF (300 Hz–10 MHz)", RF: "RF (>10 MHz)" } as Record<string, string>,
    techBandLabel: "기술 도입 — 4개 주파수 채널",
    diseaseLabel: "질환 발생률 (1990 = 100)",
    covid: "COVID",
    ifDown: "IF ↓70%",
    rfUp: "RF ↑40%",
    selectPrompt: "질환 선 또는 범례 항목을 클릭하여 확인",
    detailCascade: "캐스케이드 순서",
    detailLatency: "잠복기",
    detailChannel: "주요 채널",
    detailSecondary: "보조",
    detailMechanism: "메커니즘",
    detailModulome: "모듈롬 수준",
    detailPathway: "BERM 경로",
    detailFdaTitle: "FDA 검증",
    detailFdaClearance: "인허가",
    detailFdaMatch: "메커니즘 일치",
    detailCovidTitle: "COVID 역추정",
    detailCovidPrediction: "예측",
    detailCovidEvidence: "증거",
    detailAccel: "가속",
    detailAccelTech: "연관 기술",
    detailAccelLag: "지연",
    detailAccelWhy: "설명",
    dataQuality: { GBD_direct: "GBD 데이터", meta_estimate: "메타 추정", indicative: "시사적" } as Record<string, string>,
    footerModel: "모듈롬의 예측: 하나의 근본 원인(4개 채널에 걸친 만성 EMF 노출)이 서로 다른 조직에서 서로 다른 잠복기를 가진 7개의 질환 캐스케이드를 생성합니다. 캐스케이드 순서는 모듈롬의 12개 생물학적 수준을 따릅니다: 송과선 층에서의 가장 빠른 반응(수면), 장기 층에서의 가장 느린 반응(누적 탈분극 → 암). 각 메커니즘은 최소 1개의 FDA 인허가 치료기기로 검증되었습니다. 이 캐스케이드 순서는 수면 연구자 [[ref:walker2017_why_we_sleep|Matthew Walker(UC Berkeley)]]가 독립적으로 문서화했습니다. 수면 장애는 대사증후군, 우울증, 심혈관 질환, 암이라는 동일한 질병 순서를 모듈롬의 조직별 재생 속도가 예측한 것과 같은 생물학적 순서로 생성합니다. Walker는 이 캐스케이드를 EMF 프레임워크 없이 수면 부족에 기인시킵니다. BERM은 만성 EMF 노출이 Walker의 캐스케이드를 유발하는 수면 부족의 상류 원인이라고 제안합니다.",
    footerData: "트렌드 지수는 GBD 2023(IHME/OWID)과 공개된 GBD 추정치(1990 = 100)에서 산출. 우울증은 OWID/GBD 직접 데이터 사용. 기타 질환은 공개된 GBD 유병률 추정치를 선형 보간하여 사용. 가속점은 이동평균의 2차 도함수(윈도우=5)로 계산. 점선 수직선 = 통계적 가속점. 대각선 = BERM이 예측한 기술 연관 + 지연.",
    years: "년",
    footerModelLabel: "모듈롬의 예측:",
    linkMathDerivation: "수학적 도출 보기",
    linkCascadePredictions: "캐스케이드 예측 P11–P13 보기",
  },
};

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
type I18nText = { en: string; fi: string; ja: string; fr: string; ko: string; [key: string]: string };

function pick(obj: I18nText, locale: string): string {
  return obj[locale] ?? obj.en;
}

interface Disease {
  id: string;
  name: I18nText;
  cascade_order: number;
  latency: I18nText;
  color: string;
  modulome_level: number;
  modulome_name: I18nText;
  channel_primary: Channel;
  channel_secondary?: string;
  mechanism: I18nText;
  berm_pathway: string;
  fda_device: string;
  fda_clearance: string;
  fda_mechanism_match: I18nText;
  acceleration_year: number;
  acceleration_tech_id: string;
  acceleration_lag: number;
  acceleration_lag_explanation: I18nText;
  covid_prediction: CovidPrediction;
  covid_channel: string;
  covid_evidence?: I18nText;
  trend: number[];
  sources: string;
  sourceCitations?: { referenceId: string; label: string }[];
  data_quality: DataQuality;
}

const TREND_YEARS = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2023];

const DISEASES: Disease[] = [
  {
    id: "sleep",
    name: { en: "Sleep disorders", fi: "Unihäiriöt", ja: "睡眠障害", fr: "Troubles du sommeil", ko: "수면 장애" },
    cascade_order: 1,
    latency: { en: "Shortest (weeks–months)", fi: "Lyhin (viikkoja–kuukausia)", ja: "最短（数週間〜数ヶ月）", fr: "La plus courte (semaines–mois)", ko: "최단(수주~수개월)" },
    color: "#9B7FD4",
    modulome_level: 5,
    modulome_name: { en: "Neuromodulatory (melatonin/circadian)", fi: "Neuromodulatorinen (melatoniini/sirkadiaaninen)", ja: "神経調節性（メラトニン/概日リズム）", fr: "Neuromodulateur (mélatonine/circadien)", ko: "신경조절성(멜라토닌/일주기)" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "Direct melatonin suppression in pineal + CRY clock disruption", fi: "Melatoniinin suora suppressio pinealirauhasessa + CRY-kellon häiriö", ja: "松果体でのメラトニン直接抑制 + CRY時計障害", fr: "Suppression directe de la mélatonine dans la glande pinéale + perturbation de l'horloge CRY", ko: "송과선에서의 직접적 멜라토닌 억제 + CRY 생체시계 장애" },
    berm_pathway: "C",
    fda_device: "TMS (rTMS)",
    fda_clearance: "FDA 510(k), multiple manufacturers",
    fda_mechanism_match: { en: "rTMS modulates the same neuromodulatory level that EMF disrupts", fi: "rTMS moduloi samaa neuromodulatorista tasoa jonka EMF häiritsee", ja: "rTMSはEMFが障害する同じ神経調節レベルを調節する", fr: "La rTMS module le même niveau neuromodulateur que l'EMF perturbe", ko: "rTMS는 EMF가 교란하는 동일한 신경조절 수준을 조절함" },
    acceleration_year: 2017,
    acceleration_tech_id: "smartphone",
    acceleration_lag: 10,
    acceleration_lag_explanation: { en: "Smartphone mass adoption 2007 → cumulative circadian debt → statistical acceleration ~2017. GBD data shows +81% peak 2020.", fi: "Älypuhelin massoihin 2007 → kumulatiivinen sirkadiaaninen velka → tilastollinen kiihtymä ~2017. GBD-data: +81 % huippu 2020.", ja: "スマートフォン普及 2007年 → 累積的概日リズム負債 → 統計的加速 ~2017年。GBDデータ：2020年ピーク+81%。", fr: "Adoption massive du smartphone 2007 → dette circadienne cumulative → accélération statistique ~2017. Données GBD : pic +81 % en 2020.", ko: "스마트폰 대중 보급 2007년 → 누적 일주기 부채 → 통계적 가속 ~2017년. GBD 데이터: 2020년 정점 +81%." },
    covid_prediction: "worsen",
    covid_channel: "RF ↑",
    covid_evidence: { en: "GBD: sleep disorder prevalence +81% peak in 2020 vs 1990 baseline", fi: "GBD: unihäiriöprevalenssi +81 % huippu 2020 vs. 1990-baseline", ja: "GBD：睡眠障害有病率 2020年ピーク時1990年基準比+81%", fr: "GBD : prévalence des troubles du sommeil +81 % au pic 2020 vs référence 1990", ko: "GBD: 수면 장애 유병률 2020년 정점 시 1990년 기준 대비 +81%" },
    trend: [94, 96, 98, 100, 102, 105, 109, 120, 140, 181, 172],
    sources: "GBD 2023 (published estimates), WHO, CDC NHANES",
    data_quality: "GBD_direct",
  },
  {
    id: "depression",
    name: { en: "Depression (esp. youth)", fi: "Masennus (erit. nuoret)", ja: "うつ病（特に若年層）", fr: "Dépression (esp. jeunes)", ko: "우울증(특히 청소년)" },
    cascade_order: 2,
    latency: { en: "Short (months–1-3 years)", fi: "Lyhyt (kuukausia–1–3 vuotta)", ja: "短期（数ヶ月〜1〜3年）", fr: "Courte (mois–1-3 ans)", ko: "단기(수개월~1~3년)" },
    color: "#6B9FD4",
    modulome_level: 4,
    modulome_name: { en: "Becker DC control system", fi: "Beckerin DC-ohjausjärjestelmä", ja: "Becker DC制御システム", fr: "Système de contrôle DC de Becker", ko: "Becker DC 제어 시스템" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "DC current disruption + HPA activation → cortisol ↑ + melatonin ↓", fi: "DC-virtahäiriö + HPA-aktivaatio → kortisoli ↑ + melatoniini ↓", ja: "DC電流障害 + HPA活性化 → コルチゾール ↑ + メラトニン ↓", fr: "Perturbation du courant DC + activation HPA → cortisol ↑ + mélatonine ↓", ko: "DC 전류 장애 + HPA 활성화 → 코르티솔 ↑ + 멜라토닌 ↓" },
    berm_pathway: "B+C+D",
    fda_device: "TMS + tDCS",
    fda_clearance: "TMS: FDA 510(k) 2008; tDCS: FDA De Novo 2025 (Flow)",
    fda_mechanism_match: { en: "tDCS works at 0.3–1.0 V/m — urban ambient is 0.67–1.51 V/m (anti-tDCS)", fi: "tDCS toimii 0,3–1,0 V/m:llä — kaupungin ambient on 0,67–1,51 V/m (anti-tDCS)", ja: "tDCSは0.3〜1.0 V/mで作用 — 都市の環境レベルは0.67〜1.51 V/m（逆tDCS）", fr: "tDCS fonctionne à 0,3–1,0 V/m — l'ambiant urbain est 0,67–1,51 V/m (anti-tDCS)", ko: "tDCS는 0.3~1.0 V/m에서 작동 — 도시 환경은 0.67~1.51 V/m(역-tDCS)" },
    acceleration_year: 2017,
    acceleration_tech_id: "smartphone",
    acceleration_lag: 10,
    acceleration_lag_explanation: { en: "Smartphone adoption 2007 → cumulative HPA stress → GBD statistical acceleration ~2017. +28% by 2023 (GBD age-standardized).", fi: "Älypuhelin 2007 → kumulatiivinen HPA-kuormitus → GBD-tilastollinen kiihtymä ~2017. +28 % vuoteen 2023 (GBD ikävakioitu).", ja: "スマートフォン普及 2007年 → 累積的HPA負荷 → GBD統計的加速 ~2017年。2023年までに+28%（GBD年齢標準化）。", fr: "Adoption du smartphone 2007 → stress HPA cumulatif → accélération statistique GBD ~2017. +28 % d'ici 2023 (GBD standardisé par âge).", ko: "스마트폰 보급 2007년 → 누적 HPA 스트레스 → GBD 통계적 가속 ~2017년. 2023년까지 +28%(GBD 연령 표준화)." },
    covid_prediction: "worsen",
    covid_channel: "RF ↑",
    covid_evidence: { en: "GBD 2023: depression prevalence 2.97% → 3.77% (2020), +27% from baseline", fi: "GBD 2023: masennusprevalenssi 2,97 % → 3,77 % (2020), +27 % perusviivasta", ja: "GBD 2023：うつ病有病率 2.97% → 3.77%（2020年）、基準比+27%", fr: "GBD 2023 : prévalence de la dépression 2,97 % → 3,77 % (2020), +27 % par rapport à la référence", ko: "GBD 2023: 우울증 유병률 2.97% → 3.77%(2020), 기준 대비 +27%" },
    trend: [94, 96, 98, 100, 100, 102, 104, 106, 107, 127, 128],
    sources: "OWID/GBD 2023 (IHME)",
    sourceCitations: [{ referenceId: "twenge2020", label: "Twenge 2020" }],
    data_quality: "GBD_direct",
  },
  {
    id: "adhd_asd",
    name: { en: "ADHD / Autism spectrum", fi: "ADHD / autismikirjo", ja: "ADHD / 自閉症スペクトラム", fr: "TDAH / Spectre autistique", ko: "ADHD / 자폐 스펙트럼" },
    cascade_order: 3,
    latency: { en: "Short–medium (fetal + childhood exposure → diagnosis 3–10y)", fi: "Lyhyt–keskipitkä (sikiö + lapsuus → diagnoosi 3–10 v)", ja: "短〜中期（胎児＋小児期曝露 → 3〜10歳で診断）", fr: "Court–moyen (exposition fœtale + enfance → diagnostic 3–10 ans)", ko: "단기~중기(태아 + 소아기 노출 → 3~10세 진단)" },
    color: "#5AAD8B",
    modulome_level: 6,
    modulome_name: { en: "Cell division control (Levin level)", fi: "Solunjakautumisen ohjaus (Levin-taso)", ja: "細胞分裂制御（Levinレベル）", fr: "Contrôle de la division cellulaire (niveau Levin)", ko: "세포 분열 제어(Levin 수준)" },
    channel_primary: "RF",
    channel_secondary: "IF",
    mechanism: { en: "BBB permeability + developing nervous system VGCC disruption + IF division interference", fi: "BBB-permeabiliteetti + kehittyvän hermoston VGCC-häiriö + IF-jakautumishäiriö", ja: "BBB透過性 + 発達中の神経系VGCC障害 + IF分裂干渉", fr: "Perméabilité BBB + perturbation VGCC du système nerveux en développement + interférence IF de division", ko: "BBB 투과성 + 발달 중 신경계 VGCC 장애 + IF 분열 간섭" },
    berm_pathway: "F + cell division",
    fda_device: "VNS",
    fda_clearance: "VNS: FDA PMA 1997 (Cyberonics/LivaNova)",
    fda_mechanism_match: { en: "VNS modulates vagal reflex controlling neuroinflammation. EMF disrupts the same reflex (anti-VNS hypothesis).", fi: "VNS moduloi vagaalista refleksiä joka säätelee neuroinflammatorista tilaa. EMF häiritsee samaa refleksiä (anti-VNS).", ja: "VNSは神経炎症を制御する迷走神経反射を調節する。EMFは同じ反射を障害する（逆VNS仮説）。", fr: "Le VNS module le réflexe vagal contrôlant la neuroinflammation. L'EMF perturbe le même réflexe (hypothèse anti-VNS).", ko: "VNS는 신경염증을 제어하는 미주신경 반사를 조절함. EMF는 동일 반사를 교란(역-VNS 가설)." },
    acceleration_year: 2022,
    acceleration_tech_id: "5g",
    acceleration_lag: 3,
    acceleration_lag_explanation: { en: "GBD: continuous acceleration since 1990 (+121% by 2023). Statistical peak 2022 reflects cumulative multi-channel exposure. Li 2018 JAMA: maternal EMF ↔ ADHD.", fi: "GBD: jatkuva kiihtyminen 1990 lähtien (+121 % 2023:een). Tilastollinen huippu 2022 heijastaa kumulatiivista monikanava-altistusta.", ja: "GBD：1990年以降の継続的加速（2023年までに+121%）。統計的ピーク2022年は累積的多チャネル曝露を反映。Li 2018 JAMA：母体EMF ↔ ADHD。", fr: "GBD : accélération continue depuis 1990 (+121 % d'ici 2023). Pic statistique 2022 reflète l'exposition multi-canal cumulative. Li 2018 JAMA : EMF maternel ↔ TDAH.", ko: "GBD: 1990년 이후 지속적 가속(2023년까지 +121%). 통계적 정점 2022년은 누적 다채널 노출을 반영. Li 2018 JAMA: 모체 EMF ↔ ADHD." },
    covid_prediction: "mixed",
    covid_channel: "Diagnoses delayed",
    covid_evidence: { en: "GBD: slight dip 2020 (diagnostic artefact), recovery to 197 index", fi: "GBD: lievä notkahdus 2020 (diagnostinen artefakti), palautuminen indeksiin 197", ja: "GBD：2020年の軽微な低下（診断的アーティファクト）、指数197へ回復", fr: "GBD : légère baisse 2020 (artefact diagnostique), récupération à l'indice 197", ko: "GBD: 2020년 소폭 감소(진단 아티팩트), 지수 197로 회복" },
    trend: [86, 90, 95, 100, 105, 113, 124, 142, 171, 197, 221],
    sources: "GBD 2023 (published estimates)",
    sourceCitations: [{ referenceId: "li2018", label: "Li 2018 JAMA" }],
    data_quality: "GBD_direct",
  },
  {
    id: "metabolic",
    name: { en: "Metabolic syndrome / T2D", fi: "Metabolinen oireyhtymä / T2D", ja: "メタボリックシンドローム / 2型糖尿病", fr: "Syndrome métabolique / DT2", ko: "대사증후군 / 제2형 당뇨병" },
    cascade_order: 4,
    latency: { en: "Medium (3–8 years cumulative)", fi: "Keskipitkä (3–8 vuotta kumulatiivista)", ja: "中期（3〜8年の累積）", fr: "Moyen (3–8 ans cumulatif)", ko: "중기(3~8년 누적)" },
    color: "#D4A85A",
    modulome_level: 2,
    modulome_name: { en: "Ion channel level (VGCC/K-ATP)", fi: "Ionikanavien taso (VGCC/K-ATP)", ja: "イオンチャネルレベル（VGCC/K-ATP）", fr: "Niveau des canaux ioniques (VGCC/K-ATP)", ko: "이온 채널 수준(VGCC/K-ATP)" },
    channel_primary: "ELF",
    channel_secondary: "RF",
    mechanism: { en: "K-ATP channel disruption in pancreatic β-cells → insulin dysregulation", fi: "K-ATP-kanavahäiriö haiman β-soluissa → insuliinisäätelyn häiriö", ja: "膵β細胞のK-ATPチャネル障害 → インスリン調節障害", fr: "Perturbation des canaux K-ATP dans les cellules β pancréatiques → dérégulation de l'insuline", ko: "췌장 β세포의 K-ATP 채널 장애 → 인슐린 조절 장애" },
    berm_pathway: "B (metabolic ext.)",
    fda_device: "PEMF",
    fda_clearance: "PEMF: FDA 510(k), multiple (1979–)",
    fda_mechanism_match: { en: "PEMF activates adenosine receptors and modulates ion channels therapeutically. Environmental ELF disrupts the same channels chronically.", fi: "PEMF aktivoi adenosiinireseptoreita ja moduloi ionikanavia terapeuttisesti. Ympäristö-ELF häiritsee samoja kanavia kroonisesti.", ja: "PEMFはアデノシン受容体を活性化しイオンチャネルを治療的に調節する。環境ELFは同じチャネルを慢性的に障害する。", fr: "Le PEMF active les récepteurs d'adénosine et module les canaux ioniques de manière thérapeutique. L'ELF environnemental perturbe chroniquement les mêmes canaux.", ko: "PEMF는 아데노신 수용체를 활성화하고 이온 채널을 치료적으로 조절함. 환경 ELF는 동일 채널을 만성적으로 교란." },
    acceleration_year: 2011,
    acceleration_tech_id: "led",
    acceleration_lag: 2,
    acceleration_lag_explanation: { en: "GBD: statistical acceleration 2011. LED/SMPS rollout 2009+ → metabolic disruption via K-ATP channels. +130% by 2023. Klimentidis 2010: even lab animals are gaining weight.", fi: "GBD: tilastollinen kiihtymä 2011. LED/SMPS 2009+ → metabolinen häiriö K-ATP-kanavien kautta. +130 % 2023:een. Klimentidis 2010: myös laboratorion kontrollieläimet lihovat.", ja: "GBD：統計的加速 2011年。LED/SMPS導入 2009年以降 → K-ATPチャネルを介した代謝障害。2023年までに+130%。Klimentidis 2010：実験動物も体重増加。", fr: "GBD : accélération statistique 2011. Déploiement LED/SMPS 2009+ → perturbation métabolique via canaux K-ATP. +130 % d'ici 2023. Klimentidis 2010 : même les animaux de laboratoire prennent du poids.", ko: "GBD: 통계적 가속 2011년. LED/SMPS 도입 2009년 이후 → K-ATP 채널을 통한 대사 교란. 2023년까지 +130%. Klimentidis 2010: 실험동물도 체중 증가." },
    covid_prediction: "mixed",
    covid_channel: "IF ↓ but activity ↓",
    covid_evidence: { en: "GBD: T2D prevalence 4.7% → 10.1% (2020), +115% from baseline", fi: "GBD: T2D-prevalenssi 4,7 % → 10,1 % (2020), +115 % perusviivasta", ja: "GBD：T2D有病率 4.7% → 10.1%（2020年）、基準比+115%", fr: "GBD : prévalence DT2 4,7 % → 10,1 % (2020), +115 % par rapport à la référence", ko: "GBD: T2D 유병률 4.7% → 10.1%(2020), 기준 대비 +115%" },
    trend: [78, 85, 92, 100, 109, 117, 132, 153, 187, 215, 230],
    sources: "GBD 2023 (published estimates), IDF Diabetes Atlas",
    data_quality: "GBD_direct",
  },
  {
    id: "autoimmune",
    name: { en: "Autoimmune diseases", fi: "Autoimmuunisairaudet", ja: "自己免疫疾患", fr: "Maladies auto-immunes", ko: "자가면역 질환" },
    cascade_order: 5,
    latency: { en: "Medium–long (5–10 years cumulative)", fi: "Keskipitkä–pitkä (5–10 vuotta)", ja: "中〜長期（5〜10年の累積）", fr: "Moyen–long (5–10 ans cumulatif)", ko: "중~장기(5~10년 누적)" },
    color: "#D47A8B",
    modulome_level: 3,
    modulome_name: { en: "Bioelectric pattern (Levin morphogenetic code)", fi: "Bioelektrinen kuvio (Levinin morfogeneettinen koodi)", ja: "生体電気パターン（Levin形態形成コード）", fr: "Modèle bioélectrique (code morphogénétique de Levin)", ko: "생체전기 패턴(Levin 형태형성 코드)" },
    channel_primary: "RF",
    channel_secondary: "ELF",
    mechanism: { en: "VGCC → Ca²⁺ → NF-κB activation + vagal anti-inflammatory reflex weakening", fi: "VGCC → Ca²⁺ → NF-κB-aktivaatio + vagaalisen anti-inflammatorisen refleksin heikkeneminen", ja: "VGCC → Ca²⁺ → NF-κB活性化 + 迷走神経抗炎症反射の弱体化", fr: "VGCC → Ca²⁺ → activation NF-κB + affaiblissement du réflexe anti-inflammatoire vagal", ko: "VGCC → Ca²⁺ → NF-κB 활성화 + 미주신경 항염증 반사 약화" },
    berm_pathway: "E",
    fda_device: "VNS",
    fda_clearance: "VNS: FDA PMA 1997 epilepsy, 2005 depression, off-label RA+IBD",
    fda_mechanism_match: { en: "VNS activates cholinergic anti-inflammatory reflex → reduces TNF-α and IL-6. EMF weakens the same reflex chronically (anti-VNS). Koopman 2016 PNAS.", fi: "VNS aktivoi kolinergisen anti-inflammatorisen refleksin → vähentää TNF-α:a ja IL-6:ta. EMF heikentää samaa refleksiä kroonisesti. Koopman 2016 PNAS.", ja: "VNSはコリン作動性抗炎症反射を活性化 → TNF-αとIL-6を低減。EMFは同じ反射を慢性的に弱体化（逆VNS）。Koopman 2016 PNAS。", fr: "Le VNS active le réflexe anti-inflammatoire cholinergique → réduit TNF-α et IL-6. L'EMF affaiblit chroniquement le même réflexe (anti-VNS). Koopman 2016 PNAS.", ko: "VNS는 콜린성 항염증 반사를 활성화 → TNF-α와 IL-6 감소. EMF는 동일 반사를 만성적으로 약화(역-VNS). Koopman 2016 PNAS." },
    acceleration_year: 2022,
    acceleration_tech_id: "5g",
    acceleration_lag: 3,
    acceleration_lag_explanation: { en: "GBD: continuous acceleration, statistical peak 2022. +190% by 2023. Cumulative multi-channel exposure drives NF-κB activation. Koopman 2016 PNAS.", fi: "GBD: jatkuva kiihtyminen, tilastollinen huippu 2022. +190 % 2023:een. Kumulatiivinen monikanava-altistus ajaa NF-κB-aktivaatiota.", ja: "GBD：継続的加速、統計的ピーク 2022年。2023年までに+190%。累積的多チャネル曝露がNF-κB活性化を促進。Koopman 2016 PNAS。", fr: "GBD : accélération continue, pic statistique 2022. +190 % d'ici 2023. L'exposition multi-canal cumulative entraîne l'activation de NF-κB. Koopman 2016 PNAS.", ko: "GBD: 지속적 가속, 통계적 정점 2022년. 2023년까지 +190%. 누적 다채널 노출이 NF-κB 활성화를 유발. Koopman 2016 PNAS." },
    covid_prediction: "mixed",
    covid_channel: "Post-COVID confounds",
    covid_evidence: { en: "GBD: slight dip 2020, post-COVID autoimmune surge confounds signal", fi: "GBD: lievä notkahdus 2020, post-COVID-autoimmuunisurge sekoittaa signaalin", ja: "GBD：2020年に軽微な低下、COVID後の自己免疫サージがシグナルを混乱", fr: "GBD : légère baisse 2020, la poussée auto-immune post-COVID brouille le signal", ko: "GBD: 2020년 소폭 감소, COVID 후 자가면역 급증이 신호를 혼란" },
    trend: [76, 83, 91, 100, 110, 124, 140, 167, 217, 257, 290],
    sources: "GBD 2023 (published estimates)",
    sourceCitations: [
      { referenceId: "pall2013_v2", label: "Pall 2013" },
      { referenceId: "koopman2016_vns_ra", label: "Koopman 2016 PNAS" },
    ],
    data_quality: "GBD_direct",
  },
  {
    id: "fertility",
    name: { en: "Infertility / sperm ↓62%", fi: "Hedelmättömyys / siittiö ↓62 %", ja: "不妊症 / 精子 ↓62%", fr: "Infertilité / spermatozoïdes ↓62 %", ko: "불임 / 정자 ↓62%" },
    cascade_order: 6,
    latency: { en: "Long (spermatogenesis 74d + cumulative 5–15y)", fi: "Pitkä (spermatogeneesi 74 pv + kumulatiivinen 5–15 v)", ja: "長期（精子形成74日 + 累積5〜15年）", fr: "Long (spermatogenèse 74j + cumulatif 5–15 ans)", ko: "장기(정자형성 74일 + 누적 5~15년)" },
    color: "#D4845A",
    modulome_level: 6,
    modulome_name: { en: "Cell division control + ion channels", fi: "Solunjakautumisen ohjaus + ionikanavat", ja: "細胞分裂制御 + イオンチャネル", fr: "Contrôle de la division cellulaire + canaux ioniques", ko: "세포 분열 제어 + 이온 채널" },
    channel_primary: "IF",
    channel_secondary: "RF",
    mechanism: { en: "CatSper-VGCC disruption (RF) + spermatogonial IF resonance (TTFields logic)", fi: "CatSper-VGCC-häiriö (RF) + spermatogonioiden IF-resonanssi (TTFields-logiikka)", ja: "CatSper-VGCC障害（RF）+ 精原細胞のIF共鳴（TTFieldsロジック）", fr: "Perturbation CatSper-VGCC (RF) + résonance IF des spermatogonies (logique TTFields)", ko: "CatSper-VGCC 장애(RF) + 정원세포의 IF 공명(TTFields 논리)" },
    berm_pathway: "A (core)",
    fda_device: "TTFields (Optune)",
    fda_clearance: "TTFields: FDA PMA 2011 (GBM), 2019 (mesothelioma), 2025 (NSCLC)",
    fda_mechanism_match: { en: "TTFields inhibits cell division at 100–500 kHz IF. LED drivers produce 20–200 kHz IF. Spermatogonial size (~12 µm) → f_opt ≈ 150 kHz. LED drivers are continuous low-dose TTFields for spermatogenesis.", fi: "TTFields estää solunjakautumisen 100–500 kHz IF-kentällä. LED-hakkurit tuottavat 20–200 kHz. Spermatogonioiden koko (~12 µm) → f_opt ≈ 150 kHz.", ja: "TTFieldsは100〜500 kHz IFで細胞分裂を阻害する。LEDドライバーは20〜200 kHz IFを生成する。精原細胞サイズ（~12 µm）→ f_opt ≈ 150 kHz。LEDドライバーは精子形成にとって連続的な低用量TTFieldsである。", fr: "TTFields inhibe la division cellulaire à 100–500 kHz IF. Les drivers LED produisent 20–200 kHz IF. Taille spermatogoniale (~12 µm) → f_opt ≈ 150 kHz. Les drivers LED sont un TTFields continu à faible dose pour la spermatogenèse.", ko: "TTFields는 100~500 kHz IF에서 세포 분열을 억제. LED 드라이버는 20~200 kHz IF를 생성. 정원세포 크기(~12 µm) → f_opt ≈ 150 kHz. LED 드라이버는 정자형성에 대한 지속적 저용량 TTFields." },
    acceleration_year: 1992,
    acceleration_tech_id: "smps",
    acceleration_lag: -3,
    acceleration_lag_explanation: { en: "GBD: statistical acceleration 1992. Early IF sources (SMPS, fluorescent ballasts) + spermatogenesis 74d cycle. +79% by 2023. Levine 2017/2023.", fi: "GBD: tilastollinen kiihtymä 1992. Varhaiset IF-lähteet (SMPS, loisteputket) + spermatogeneesin 74 pv sykli. +79 % 2023:een. Levine 2017/2023.", ja: "GBD：統計的加速 1992年。初期IF源（SMPS、蛍光灯安定器）+ 精子形成74日周期。2023年までに+79%。Levine 2017/2023。", fr: "GBD : accélération statistique 1992. Sources IF précoces (SMPS, ballasts fluorescents) + cycle de 74j de la spermatogenèse. +79 % d'ici 2023. Levine 2017/2023.", ko: "GBD: 통계적 가속 1992년. 초기 IF 원(SMPS, 형광등 안정기) + 정자형성 74일 주기. 2023년까지 +79%. Levine 2017/2023." },
    covid_prediction: "improve",
    covid_channel: "IF ↓↓",
    covid_evidence: { en: "GBD: slight improvement 2020 (IF channel drop) — COVID paradox", fi: "GBD: lievä paraneminen 2020 (IF-kanavan lasku) — COVID-paradoksi", ja: "GBD：2020年の軽微な改善（IFチャネル低下）— COVIDパラドックス", fr: "GBD : légère amélioration 2020 (baisse du canal IF) — paradoxe COVID", ko: "GBD: 2020년 소폭 개선(IF 채널 감소) — COVID 역설" },
    trend: [84, 89, 94, 100, 106, 113, 121, 132, 151, 169, 179],
    sources: "GBD 2023 (published estimates)",
    sourceCitations: [
      { referenceId: "levine2017_v2", label: "Levine 2017" },
      { referenceId: "levine2023_sperm", label: "Levine 2023" },
    ],
    data_quality: "GBD_direct",
  },
  {
    id: "cancer_young",
    name: { en: "Early-onset cancer (<50y)", fi: "Nuorten syöpä (<50 v)", ja: "若年発症がん（50歳未満）", fr: "Cancer précoce (<50 ans)", ko: "조기발병 암(50세 미만)" },
    cascade_order: 7,
    latency: { en: "Longest (10–25 years cumulative depolarisation)", fi: "Pisin (10–25 vuotta kumulatiivista depolarisaatiota)", ja: "最長（10〜25年の累積的脱分極）", fr: "La plus longue (10–25 ans de dépolarisation cumulative)", ko: "최장(10~25년 누적 탈분극)" },
    color: "#A85A5A",
    modulome_level: 7,
    modulome_name: { en: "Tissue-level bioelectric homeostasis", fi: "Kudostason bioelektrinen homeostaasi", ja: "組織レベルの生体電気恒常性", fr: "Homéostasie bioélectrique au niveau tissulaire", ko: "조직 수준 생체전기 항상성" },
    channel_primary: "IF",
    channel_secondary: "RF",
    mechanism: { en: "Cumulative Vmem depolarisation → growth control loss (Levin bioelectric code)", fi: "Kumulatiivinen Vmem-depolarisaatio → kasvunhallinnan menetys (Levinin bioelektrinen koodi)", ja: "累積的Vmem脱分極 → 成長制御の喪失（Levin生体電気コード）", fr: "Dépolarisation Vmem cumulative → perte du contrôle de croissance (code bioélectrique de Levin)", ko: "누적 Vmem 탈분극 → 성장 제어 소실(Levin 생체전기 코드)" },
    berm_pathway: "Bioelectric code + NTP 2018",
    fda_device: "TTFields (Optune)",
    fda_clearance: "TTFields: FDA PMA 2011 (GBM), 2019, 2025",
    fda_mechanism_match: { en: "TTFields IS a cancer treatment → IF field affects cancer cells → environmental IF affects them too. Therapeutic dose is high (1–3 V/cm) but chronic low-dose IF accumulates over decades.", fi: "TTFields ON syöpähoito → IF-kenttä vaikuttaa syöpäsoluihin → ympäristö-IF vaikuttaa myös. Terapeuttinen annos on korkea mutta krooninen matala-annos kumuloituu.", ja: "TTFieldsはがん治療そのものである → IF電場はがん細胞に影響 → 環境IFも影響する。治療用量は高い（1〜3 V/cm）が、慢性低用量IFは数十年にわたり蓄積される。", fr: "TTFields EST un traitement anticancéreux → le champ IF affecte les cellules cancéreuses → l'IF environnemental les affecte aussi. La dose thérapeutique est élevée (1–3 V/cm) mais l'IF chronique à faible dose s'accumule sur des décennies.", ko: "TTFields는 암 치료 자체임 → IF 전기장이 암 세포에 영향 → 환경 IF도 영향. 치료 용량은 높지만(1~3 V/cm) 만성 저용량 IF는 수십 년에 걸쳐 축적." },
    acceleration_year: 1992,
    acceleration_tech_id: "smps",
    acceleration_lag: -3,
    acceleration_lag_explanation: { en: "GBD: early-onset cancer acceleration 1992. Zhao 2023 BMJ Oncology: +79% 1990–2019. 10–25y lag → reflects 1970–1985 cumulative exposure. NTP 2018: 'clear evidence'.", fi: "GBD: nuorten syövän kiihtymä 1992. Zhao 2023 BMJ Oncology: +79 % 1990–2019. 10–25 v viive → heijastaa 1970–1985 altistusta. NTP 2018: 'clear evidence'.", ja: "GBD：若年発症がん加速 1992年。Zhao 2023 BMJ Oncology：1990〜2019年に+79%。10〜25年の遅延 → 1970〜1985年の累積曝露を反映。NTP 2018：'clear evidence'。", fr: "GBD : accélération du cancer précoce 1992. Zhao 2023 BMJ Oncology : +79 % 1990–2019. Décalage 10–25 ans → reflète l'exposition cumulative 1970–1985. NTP 2018 : 'preuves claires'.", ko: "GBD: 조기발병 암 가속 1992년. Zhao 2023 BMJ Oncology: 1990~2019년 +79%. 10~25년 지연 → 1970~1985년 누적 노출 반영. NTP 2018: 'clear evidence'." },
    covid_prediction: "improve",
    covid_channel: "IF ↓ (long lag)",
    covid_evidence: { en: "GBD: slight dip 2020 but lag too long for observable effect", fi: "GBD: lievä notkahdus 2020 mutta viive liian pitkä näkyvälle vaikutukselle", ja: "GBD：2020年の軽微な低下だが遅延が長すぎて観察可能な効果なし", fr: "GBD : légère baisse 2020 mais décalage trop long pour un effet observable", ko: "GBD: 2020년 소폭 감소이나 지연이 너무 길어 관찰 가능한 효과 없음" },
    trend: [69, 78, 88, 100, 113, 125, 138, 150, 165, 177, 187],
    sources: "GBD 2023 (published estimates), NTP 2018",
    sourceCitations: [
      { referenceId: "early_onset_cancer_gbd_2023", label: "Zhao 2023 BMJ Oncology" },
    ],
    data_quality: "GBD_direct",
  },
];

/* ── SVG layout constants ── */
const W = 860;
const ML = 112;
const MR = 16;
const CW = W - ML - MR;

const YEAR_START = 1975;
const YEAR_END = 2026;

const TECH_TOP = 10;
const TECH_LANE_H = 10;
const TECH_LANE_GAP = 3;
const TECH_CHANNEL_GAP = 7;

interface PositionedTechEra {
  era: TechEra;
  lane: number;
}

function packTechEras(channel: Channel): PositionedTechEra[] {
  const laneEnds: number[] = [];

  return TECH_ERAS
    .filter((era) => era.channel === channel)
    .sort((a, b) => a.start - b.start || a.end - b.end)
    .map((era) => {
      let lane = laneEnds.findIndex((endYear) => endYear <= era.start);

      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(era.end);
      } else {
        laneEnds[lane] = era.end;
      }

      return { era, lane };
    });
}

const TECH_LAYOUT = CHANNELS.reduce(
  (layout, channel) => ({ ...layout, [channel]: packTechEras(channel) }),
  {} as Record<Channel, PositionedTechEra[]>,
);

function channelLaneCount(channel: Channel): number {
  return Math.max(...TECH_LAYOUT[channel].map(({ lane }) => lane)) + 1;
}

function channelHeight(channel: Channel): number {
  const laneCount = channelLaneCount(channel);
  return laneCount * TECH_LANE_H + (laneCount - 1) * TECH_LANE_GAP;
}

const TECH_BAND_H = CHANNELS.reduce(
  (height, channel) => height + channelHeight(channel),
  (CHANNELS.length - 1) * TECH_CHANNEL_GAP,
);

const CHART_TOP = TECH_TOP + TECH_BAND_H + 28;
const CHART_H = 260;
const CHART_BOTTOM = CHART_TOP + CHART_H;

const Y_MAX = 350;

const AXIS_Y = CHART_BOTTOM + 4;
const SVG_H = AXIS_Y + 28;

/* ── Helpers ── */
function yearToX(year: number): number {
  return ML + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * CW;
}

function valueToY(value: number): number {
  return CHART_BOTTOM - (value / Y_MAX) * CHART_H;
}

interface EndLabelPosition {
  disease: Disease;
  value: number;
  pointY: number;
  labelY: number;
}

function layoutEndLabels(): EndLabelPosition[] {
  const minGap = 14;
  const topLimit = CHART_TOP + 8;
  const bottomLimit = CHART_BOTTOM - 8;
  const labels = DISEASES
    .map((disease) => {
      const value = disease.trend[disease.trend.length - 1];
      const pointY = valueToY(value);
      return { disease, value, pointY, labelY: pointY };
    })
    .sort((a, b) => a.pointY - b.pointY);

  labels.forEach((label, index) => {
    label.labelY = Math.max(
      label.pointY,
      index === 0 ? topLimit : labels[index - 1].labelY + minGap,
    );
  });

  const overflow = labels[labels.length - 1].labelY - bottomLimit;
  if (overflow > 0) {
    labels.forEach((label) => {
      label.labelY -= overflow;
    });
  }

  for (let index = labels.length - 2; index >= 0; index -= 1) {
    labels[index].labelY = Math.min(labels[index].labelY, labels[index + 1].labelY - minGap);
  }

  return labels;
}

const END_LABELS = layoutEndLabels();

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
  return CHANNELS.slice(0, idx).reduce(
    (y, channel) => y + channelHeight(channel) + TECH_CHANNEL_GAP,
    TECH_TOP,
  );
}

/* ── Component ── */
interface Props {
  locale: string;
}

export function DiseaseCascadeTimeline({ locale }: Props) {
  const t = pickCopy(COPY, locale);
  const [selected, setSelected] = useState<string | null>(null);

  const detail = selected ? DISEASES.find((d) => d.id === selected) : null;

  const covidX1 = yearToX(2020);
  const covidX2 = yearToX(2022);

  const gridYears = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025];
  const gridValues = [0, 50, 100, 150, 200, 250, 300, 350];

  return (
    <section className="mt-12 mb-10">
      <h3 className="editorial-section-heading mb-1">{t.sectionTitle}</h3>
      <p className="text-sm text-foreground-muted mb-6 max-w-3xl">{t.sectionSub}</p>

      {/* ── SVG chart ── */}
      <div className="data-figure chart-surface">
        <div className="chart-surface__header">
          <div className="min-w-0">
            <p className="data-figure__title">{t.diseaseLabel}</p>
            <p className="mt-1 text-[0.72rem] text-foreground-muted">{t.techBandLabel}</p>
          </div>
          <ul className="chart-legend" aria-label={`${t.covid} 2020–2022`}>
            <li className="chart-key">
              <span
                className="chart-key__swatch"
                style={{ background: "var(--color-foreground-muted)" }}
              />
              {t.covid} · 2020–2022
            </li>
            <li className="chart-key" style={{ color: CHANNEL_COLORS.IF }}>
              <span
                className="chart-key__swatch"
                style={{ background: CHANNEL_COLORS.IF }}
              />
              {t.ifDown}
            </li>
            <li className="chart-key" style={{ color: CHANNEL_COLORS.RF }}>
              <span
                className="chart-key__swatch"
                style={{ background: CHANNEL_COLORS.RF }}
              />
              {t.rfUp}
            </li>
          </ul>
        </div>

        <div className="chart-scroll">
          <div className="min-w-[760px]">
            <svg
              viewBox={`0 0 ${W} ${SVG_H}`}
              className="chart-svg w-full"
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
                  {v > 0 && v !== 100 && (
                    <text
                      x={ML - 4}
                      y={valueToY(v) + 3}
                      textAnchor="end"
                      fontSize={11}
                      fontFamily="var(--font-data)"
                      fill="var(--color-foreground-muted)"
                      opacity={0.6}
                    >
                      {v}
                    </text>
                  )}
                </g>
              ))}

              {/* ── Baseline label: kept on one line to avoid the 100/1990 collision ── */}
              <text
                x={ML - 6}
                y={valueToY(100) + 4}
                textAnchor="end"
                fontSize={10.5}
                fontFamily="var(--font-data)"
                fill="var(--color-foreground-muted)"
                opacity={0.8}
                fontWeight={600}
              >
                1990 = 100
              </text>

              {/* ── Tech era bands: overlapping intervals are packed into sub-lanes ── */}
              {CHANNELS.map((ch) => {
                const ry = channelRowY(ch);
                const rowHeight = channelHeight(ch);
                const eras = TECH_LAYOUT[ch];
                const chColor = CHANNEL_COLORS[ch];
                return (
                  <g key={ch}>
                    {/* Channel background */}
                    <rect
                      x={ML}
                      y={ry}
                      width={CW}
                      height={rowHeight}
                      fill={chColor}
                      opacity={0.045}
                      rx={5}
                    />
                    {/* Channel label */}
                    <text
                      x={ML - 4}
                      y={ry + rowHeight / 2 + 3}
                      textAnchor="end"
                      fontSize={11}
                      fontFamily="var(--font-data)"
                      fill={chColor}
                      fontWeight={500}
                    >
                      {t.channelLabels[ch]}
                    </text>
                    {/* Era rectangles; names and exact ranges live in the responsive legend below */}
                    {eras.map(({ era, lane }) => {
                      const x1 = yearToX(Math.max(era.start, YEAR_START));
                      const x2 = yearToX(Math.min(era.end, YEAR_END));
                      const ew = x2 - x1;
                      return (
                        <rect
                          key={era.id}
                          x={x1}
                          y={ry + lane * (TECH_LANE_H + TECH_LANE_GAP)}
                          width={ew}
                          height={TECH_LANE_H}
                          fill={chColor}
                          fillOpacity={Math.max(era.opacity, 0.32)}
                          stroke={chColor}
                          strokeOpacity={0.55}
                          strokeWidth={0.6}
                          rx={TECH_LANE_H / 2}
                        >
                          <title>{`${era.label}: ${era.start}–${era.end}`}</title>
                        </rect>
                      );
                    })}
                  </g>
                );
              })}

              {/* ── COVID zone; explanatory text is in the external legend ── */}
              <g aria-label={`${t.covid}: ${t.ifDown}; ${t.rfUp}`}>
                <rect
                  x={covidX1}
                  y={CHART_TOP}
                  width={covidX2 - covidX1}
                  height={CHART_H}
                  fill="var(--color-foreground)"
                  opacity={0.045}
                />
                {[covidX1, covidX2].map((x, index) => (
                  <line
                    key={`covid-boundary-${index}`}
                    x1={x}
                    y1={CHART_TOP}
                    x2={x}
                    y2={CHART_BOTTOM}
                    stroke="var(--color-foreground-muted)"
                    strokeOpacity={0.3}
                    strokeWidth={0.8}
                    strokeDasharray="3 4"
                  />
                ))}
              </g>

              {/* ── Disease trend lines ── */}
              {DISEASES.map((d) => {
                const isSelected = d.id === selected;
                const dimmed = selected !== null && !isSelected;
                return (
                  <path
                    key={d.id}
                    tabIndex={0}
                    role="button"
                    aria-label={pick(d.name, locale)}
                    d={trendToPath(d.trend)}
                    fill="none"
                    stroke={d.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={dimmed ? 0.15 : 1}
                    className="cursor-pointer transition-opacity"
                    onClick={() => setSelected(isSelected ? null : d.id)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(isSelected ? null : d.id); } }}
                  />
                );
              })}

              {/* ── Collision-free end labels with leader lines ── */}
              {END_LABELS.map(({ disease: d, value, pointY, labelY }) => {
                const dimmed = selected !== null && d.id !== selected;
                const pointX = yearToX(2023);
                const labelX = pointX + 20;
                return (
                  <g
                    key={`lbl-${d.id}`}
                    opacity={dimmed ? 0.15 : 0.9}
                  >
                    <circle cx={pointX} cy={pointY} r={2.2} fill={d.color} />
                    <path
                      d={`M${pointX + 3},${pointY} L${labelX - 4},${labelY}`}
                      fill="none"
                      stroke={d.color}
                      strokeWidth={0.8}
                      strokeLinecap="round"
                    />
                    <rect
                      x={labelX - 3}
                      y={labelY - 7}
                      width={27}
                      height={14}
                      fill="var(--color-figure-bg, var(--color-card-bg))"
                      fillOpacity={0.92}
                      stroke={d.color}
                      strokeOpacity={0.25}
                      strokeWidth={0.5}
                      rx={4}
                    />
                    <text
                      x={labelX}
                      y={labelY + 3}
                      fontSize={11}
                      fontFamily="var(--font-data)"
                      fill={d.color}
                      fontWeight={650}
                    >
                      {value}
                    </text>
                  </g>
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
                const techLane = TECH_LAYOUT[techEra.channel].find(
                  ({ era }) => era.id === techEra.id,
                );
                const techY = channelRowY(techEra.channel)
                  + (techLane?.lane ?? 0) * (TECH_LANE_H + TECH_LANE_GAP)
                  + TECH_LANE_H;
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
                      fontSize={11}
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
                  fontSize={11}
                  fontFamily="var(--font-data)"
                  fill="var(--color-foreground-muted)"
                >
                  {y}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* ── Responsive technology legend ── */}
        <div className="mt-2 grid gap-2 border-t border-card-border pt-3">
          {CHANNELS.map((channel) => (
            <div
              key={`legend-${channel}`}
              className="grid gap-1.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start"
            >
              <p
                className="pt-1 text-[0.68rem] font-semibold leading-tight"
                style={{ color: CHANNEL_COLORS[channel] }}
              >
                {t.channelLabels[channel]}
              </p>
              <ul className="chart-legend">
                {TECH_LAYOUT[channel].map(({ era }) => (
                  <li key={`key-${era.id}`} className="chart-key">
                    <span
                      className="chart-key__swatch"
                      style={{
                        background: CHANNEL_COLORS[channel],
                        color: CHANNEL_COLORS[channel],
                        opacity: Math.max(era.opacity, 0.55),
                      }}
                    />
                    {era.label} · {era.start}–{era.end}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Disease legend ── */}
        <div className="mt-3 border-t border-card-border pt-3">
          <ul className="chart-legend" aria-label={t.diseaseLabel}>
            {DISEASES.map((d) => {
              const isSelected = d.id === selected;
              const diseaseLabel = pick(d.name, locale);
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(isSelected ? null : d.id)}
                    className={`chart-key transition-opacity ${
                      selected && !isSelected ? "opacity-30" : "opacity-100"
                    }`}
                    style={{ color: d.color }}
                  >
                    <span
                      className="chart-key__swatch"
                      style={{ background: d.color, color: d.color }}
                    />
                    {d.cascade_order}. {diseaseLabel}
                  </button>
                </li>
              );
            })}
          </ul>
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
                {detail.cascade_order}. {pick(detail.name, locale)}
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
              <Row label={t.detailLatency} value={pick(detail.latency, locale)} />
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
              <Row label={t.detailMechanism} value={pick(detail.mechanism, locale)} />
              <Row label={t.detailModulome} value={`${detail.modulome_level}: ${pick(detail.modulome_name, locale)}`} />
              <Row label={t.detailPathway} value={detail.berm_pathway} />
            </div>

            {/* Right column: validation + COVID */}
            <div className="p-4 space-y-3">
              {/* FDA */}
              <div>
                <p className="text-[0.65rem] font-semibold text-accent uppercase tracking-wider mb-1">{t.detailFdaTitle}</p>
                <p className="text-[0.75rem] font-medium">{detail.fda_device}</p>
                <p className="text-[0.7rem] text-foreground-muted mt-0.5">{detail.fda_clearance}</p>
                <p className="text-[0.72rem] mt-1">{pick(detail.fda_mechanism_match, locale)}</p>
              </div>

              {/* COVID */}
              <div className="pt-2 border-t border-card-border">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider mb-1" style={{ color: CHANNEL_COLORS.RF }}>{t.detailCovidTitle}</p>
                <Row label={t.detailCovidPrediction}>
                  <CovidBadge prediction={detail.covid_prediction} /> {detail.covid_channel}
                </Row>
                {detail.covid_evidence && (
                  <p className="text-[0.72rem] text-foreground-muted mt-1">{pick(detail.covid_evidence, locale)}</p>
                )}
              </div>

              {/* Acceleration */}
              <div className="pt-2 border-t border-card-border">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider mb-1" style={{ color: detail.color }}>{t.detailAccel}: ~{detail.acceleration_year}</p>
                <Row label={t.detailAccelTech} value={TECH_ERAS.find((e) => e.id === detail.acceleration_tech_id)?.label ?? detail.acceleration_tech_id} />
                <Row label={t.detailAccelLag} value={`${detail.acceleration_lag >= 0 ? "+" : ""}${detail.acceleration_lag} ${t.years}`} />
                <p className="text-[0.72rem] text-foreground-muted mt-1">{pick(detail.acceleration_lag_explanation, locale)}</p>
              </div>

              <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.65rem] text-foreground-muted">
                {detail.sources && <span className="break-words font-mono">{detail.sources}</span>}
                {detail.sourceCitations?.map((citation) => (
                  <StudyCitation
                    key={citation.referenceId}
                    referenceId={citation.referenceId}
                    locale={locale}
                    label={citation.label}
                    className="font-mono text-accent decoration-dotted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer notes ── */}
      <div className="mt-4 rounded-md border border-card-border bg-card-bg px-4 py-3 space-y-2">
        <p className="text-[0.72rem] text-foreground-muted leading-relaxed">
          <span className="font-medium text-foreground text-[0.73rem]">
            {t.footerModelLabel}
          </span>{" "}
          <InlineReferenceText text={t.footerModel} locale={locale} />
        </p>
        <p className="text-[0.65rem] text-foreground-muted leading-relaxed opacity-70">
          {t.footerData}
        </p>
        <div className="flex flex-wrap gap-4 pt-2 border-t border-card-border mt-2">
          <Link
            href={`/${locale}/model#modulome`}
            className="text-[0.72rem] text-accent hover:underline"
          >
            &rarr; {t.linkMathDerivation}
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-[0.72rem] text-accent hover:underline"
          >
            &rarr; {t.linkCascadePredictions}
          </Link>
        </div>
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
