"use client";

import { useState } from "react";
import { BermIcon } from "@/components/BermIcon";
import { pickCopy } from "@/lib/i18n";

interface EMFLayer {
  id: string;
  name: Record<string, string>;
  color: string;
  startYear: number;
  freq: Record<string, string>;
  driver: Record<string, string>;
  channel: Record<string, string>;
}

const LAYERS: EMFLayer[] = [
  {
    id: "military",
    name: { en: "Military radar", fi: "Sotilastutka", ja: "軍事レーダー", fr: "Radar militaire", ko: "군사 레이더" },
    color: "#4a6741",
    startYear: 1950,
    freq: { en: "1–10 GHz (S/X-band)", fi: "1–10 GHz (S/X-kaista)", ja: "1–10 GHz (S/Xバンド)", fr: "1–10 GHz (bande S/X)", ko: "1–10 GHz (S/X 대역)" },
    driver: { en: "Cold War", fi: "Kylmä sota", ja: "冷戦", fr: "Guerre froide", ko: "냉전" },
    channel: { en: "Ambient (base perimeter)", fi: "Ambient (tukikohta-alue)", ja: "環境（基地周辺）", fr: "Ambiant (périmètre de base)", ko: "환경 (기지 주변)" },
  },
  {
    id: "weather_radar",
    name: { en: "Weather radar", fi: "Säätutka", ja: "気象レーダー", fr: "Radar météorologique", ko: "기상 레이더" },
    color: "#2196F3",
    startYear: 1988,
    freq: { en: "2.7–5.6 GHz (S/C-band)", fi: "2,7–5,6 GHz (S/C-kaista)", ja: "2.7–5.6 GHz (S/Cバンド)", fr: "2,7–5,6 GHz (bande S/C)", ko: "2.7–5.6 GHz (S/C 대역)" },
    driver: { en: "NEXRAD / EU Doppler networks", fi: "NEXRAD / EU Doppler-verkostot", ja: "NEXRAD / EU Dopplerネットワーク", fr: "NEXRAD / Réseaux Doppler UE", ko: "NEXRAD / EU Doppler 네트워크" },
    channel: { en: "Ambient (landscape, 24/7)", fi: "Ambient (maisema, 24/7)", ja: "環境（景観、24時間）", fr: "Ambiant (paysage, 24/7)", ko: "환경 (경관, 24/7)" },
  },
  {
    id: "telecom",
    name: { en: "Mobile networks", fi: "Matkapuhelinverkot", ja: "モバイルネットワーク", fr: "Réseaux mobiles", ko: "모바일 네트워크" },
    color: "#FF5722",
    startYear: 1991,
    freq: { en: "700 MHz–3.5 GHz (2G–5G)", fi: "700 MHz–3,5 GHz (2G–5G)", ja: "700 MHz–3.5 GHz (2G–5G)", fr: "700 MHz–3,5 GHz (2G–5G)", ko: "700 MHz–3.5 GHz (2G–5G)" },
    driver: { en: "Telecommunications", fi: "Televiestintä", ja: "通信", fr: "Télécommunications", ko: "통신" },
    channel: { en: "Ambient + Personal", fi: "Ambient + Henkilökohtainen", ja: "環境 + 個人", fr: "Ambiant + Personnel", ko: "환경 + 개인" },
  },
  {
    id: "wifi",
    name: { en: "Wi-Fi", fi: "Wi-Fi", ja: "Wi-Fi", fr: "Wi-Fi", ko: "Wi-Fi" },
    color: "#E91E63",
    startYear: 1999,
    freq: { en: "2.4 / 5 / 6 GHz", fi: "2,4 / 5 / 6 GHz", ja: "2.4 / 5 / 6 GHz", fr: "2,4 / 5 / 6 GHz", ko: "2.4 / 5 / 6 GHz" },
    driver: { en: "Internet access", fi: "Internet-yhteys", ja: "インターネット接続", fr: "Accès Internet", ko: "인터넷 접속" },
    channel: { en: "Ambient (indoor) + Personal", fi: "Ambient (sisätila) + Henkilökohtainen", ja: "環境（屋内）+ 個人", fr: "Ambiant (intérieur) + Personnel", ko: "환경 (실내) + 개인" },
  },
  {
    id: "display",
    name: { en: "Display transition", fi: "Näyttösiirtymä", ja: "ディスプレイ移行", fr: "Transition d'écran", ko: "디스플레이 전환" },
    color: "#9C27B0",
    startYear: 2005,
    freq: { en: "2.4/5 GHz (Wi-Fi) + PWM kHz", fi: "2,4/5 GHz (Wi-Fi) + PWM kHz", ja: "2.4/5 GHz (Wi-Fi) + PWM kHz", fr: "2,4/5 GHz (Wi-Fi) + PWM kHz", ko: "2.4/5 GHz (Wi-Fi) + PWM kHz" },
    driver: { en: "CRT → LCD/LED + streaming", fi: "CRT → LCD/LED + suoratoisto", ja: "CRT → LCD/LED + ストリーミング", fr: "CRT → LCD/LED + streaming", ko: "CRT → LCD/LED + 스트리밍" },
    channel: { en: "Personal (bedroom proximity)", fi: "Henkilökohtainen (makuuhuoneläheisyys)", ja: "個人（寝室近接）", fr: "Personnel (proximité chambre)", ko: "개인 (침실 근접)" },
  },
  {
    id: "smart_meters",
    name: { en: "Smart meters", fi: "Älymittarit", ja: "スマートメーター", fr: "Compteurs intelligents", ko: "스마트 미터" },
    color: "#00BCD4",
    startYear: 2005,
    freq: { en: "900 MHz / 2.4 GHz (mesh)", fi: "900 MHz / 2,4 GHz (mesh)", ja: "900 MHz / 2.4 GHz (mesh)", fr: "900 MHz / 2,4 GHz (mesh)", ko: "900 MHz / 2.4 GHz (mesh)" },
    driver: { en: "Grid modernization", fi: "Sähköverkon modernisointi", ja: "送電網近代化", fr: "Modernisation du réseau", ko: "전력망 현대화" },
    channel: { en: "Ambient (home exterior)", fi: "Ambient (kodin ulkopuoli)", ja: "環境（住宅外部）", fr: "Ambiant (extérieur du logement)", ko: "환경 (주택 외부)" },
  },
  {
    id: "indoor_led",
    name: { en: "Indoor LED lighting", fi: "Sisä-LED-valaistus", ja: "屋内LED照明", fr: "Éclairage LED intérieur", ko: "실내 LED 조명" },
    color: "#FFC107",
    startYear: 2009,
    freq: { en: "20–200 kHz (SMPS) + harmonics", fi: "20–200 kHz (hakkuri) + harmoniset", ja: "20–200 kHz (SMPS) + 高調波", fr: "20–200 kHz (SMPS) + harmoniques", ko: "20–200 kHz (SMPS) + 고조파" },
    driver: { en: "EU Directive 2009/125/EC", fi: "EU-direktiivi 2009/125/EC", ja: "EU指令 2009/125/EC", fr: "Directive UE 2009/125/CE", ko: "EU 지침 2009/125/EC" },
    channel: { en: "Ambient (indoor, every room)", fi: "Ambient (sisätila, joka huone)", ja: "環境（屋内、全室）", fr: "Ambiant (intérieur, chaque pièce)", ko: "환경 (실내, 전 공간)" },
  },
  {
    id: "solar",
    name: { en: "Solar inverters", fi: "Aurinkoinvertterit", ja: "太陽光インバーター", fr: "Onduleurs solaires", ko: "태양광 인버터" },
    color: "#FFEB3B",
    startYear: 2010,
    freq: { en: "20–100 kHz (MPPT switching)", fi: "20–100 kHz (MPPT-kytkentä)", ja: "20–100 kHz (MPPTスイッチング)", fr: "20–100 kHz (commutation MPPT)", ko: "20–100 kHz (MPPT 스위칭)" },
    driver: { en: "Renewable energy policy", fi: "Uusiutuvan energian politiikka", ja: "再生可能エネルギー政策", fr: "Politique d'énergie renouvelable", ko: "재생에너지 정책" },
    channel: { en: "Ambient (rooftop/neighborhood)", fi: "Ambient (katto/naapurusto)", ja: "環境（屋上/近隣）", fr: "Ambiant (toiture/voisinage)", ko: "환경 (옥상/인근)" },
  },
  {
    id: "street_led",
    name: { en: "Street LED lighting", fi: "LED-katuvalaistus", ja: "街路LED照明", fr: "Éclairage LED de rue", ko: "가로 LED 조명" },
    color: "#FF9800",
    startYear: 2012,
    freq: { en: "kHz (driver) + LoRa/4G (smart control)", fi: "kHz (hakkuri) + LoRa/4G (älyohjaus)", ja: "kHz (ドライバー) + LoRa/4G (スマート制御)", fr: "kHz (driver) + LoRa/4G (commande intelligente)", ko: "kHz (드라이버) + LoRa/4G (스마트 제어)" },
    driver: { en: "Municipal energy savings", fi: "Kuntien energiansäästö", ja: "自治体の省エネ", fr: "Économies d'énergie municipales", ko: "지자체 에너지 절감" },
    channel: { en: "Ambient (outdoor, nocturnal)", fi: "Ambient (ulkotila, yöllinen)", ja: "環境（屋外、夜間）", fr: "Ambiant (extérieur, nocturne)", ko: "환경 (실외, 야간)" },
  },
  {
    id: "iot",
    name: { en: "IoT devices", fi: "IoT-laitteet", ja: "IoTデバイス", fr: "Appareils IoT", ko: "IoT 기기" },
    color: "#795548",
    startYear: 2014,
    freq: { en: "BLE / Zigbee / LoRa / NB-IoT", fi: "BLE / Zigbee / LoRa / NB-IoT", ja: "BLE / Zigbee / LoRa / NB-IoT", fr: "BLE / Zigbee / LoRa / NB-IoT", ko: "BLE / Zigbee / LoRa / NB-IoT" },
    driver: { en: "Smart home / Industry 4.0", fi: "Älykoti / Teollisuus 4.0", ja: "スマートホーム / Industry 4.0", fr: "Maison intelligente / Industrie 4.0", ko: "스마트홈 / Industry 4.0" },
    channel: { en: "Ambient + Personal", fi: "Ambient + Henkilökohtainen", ja: "環境 + 個人", fr: "Ambiant + Personnel", ko: "환경 + 개인" },
  },
  {
    id: "adas",
    name: { en: "ADAS automotive radar", fi: "ADAS-ajoneuvotutka", ja: "ADAS車載レーダー", fr: "Radar automobile ADAS", ko: "ADAS 차량 레이더" },
    color: "#607D8B",
    startYear: 2015,
    freq: { en: "24 / 77 GHz (mmWave)", fi: "24 / 77 GHz (mmWave)", ja: "24 / 77 GHz (mmWave)", fr: "24 / 77 GHz (mmWave)", ko: "24 / 77 GHz (mmWave)" },
    driver: { en: "Vehicle safety regulations", fi: "Ajoneuvoturvallisuus", ja: "車両安全規制", fr: "Réglementations de sécurité des véhicules", ko: "차량 안전 규정" },
    channel: { en: "Ambient (road corridor)", fi: "Ambient (tiekäytävä)", ja: "環境（道路帯）", fr: "Ambiant (corridor routier)", ko: "환경 (도로 구간)" },
  },
  {
    id: "wind",
    name: { en: "Wind turbines", fi: "Tuuliturbiinit", ja: "風力タービン", fr: "Éoliennes", ko: "풍력 터빈" },
    color: "#8BC34A",
    startYear: 2000,
    freq: { en: "ELF (blade pass) + kHz (inverter)", fi: "ELF (lavanohitus) + kHz (invertteri)", ja: "ELF (ブレード通過) + kHz (インバーター)", fr: "ELF (passage de pale) + kHz (onduleur)", ko: "ELF (블레이드 통과) + kHz (인버터)" },
    driver: { en: "Renewable energy policy", fi: "Uusiutuvan energian politiikka", ja: "再生可能エネルギー政策", fr: "Politique d'énergie renouvelable", ko: "재생에너지 정책" },
    channel: { en: "Ambient (rural corridors)", fi: "Ambient (maaseutukäytävät)", ja: "環境（農村帯）", fr: "Ambiant (corridors ruraux)", ko: "환경 (농촌 구간)" },
  },
];

const SENTINEL_SPECIES = [
  { id: "aphid", name: { en: "Aphid", fi: "Kirva", ja: "アブラムシ", fr: "Puceron", ko: "진딧물" }, icon: "aphid" as const },
  { id: "bee", name: { en: "Bee", fi: "Mehiläinen", ja: "ミツバチ", fr: "Abeille", ko: "꿀벌" }, icon: "honeybee" as const },
  { id: "moth", name: { en: "Moth", fi: "Yöperhonen", ja: "ガ", fr: "Papillon de nuit", ko: "나방" }, icon: "moth" as const },
  { id: "bird", name: { en: "Bird", fi: "Lintu", ja: "鳥", fr: "Oiseau", ko: "새" }, icon: "bird" as const },
  { id: "bat", name: { en: "Bat", fi: "Lepakko", ja: "コウモリ", fr: "Chauve-souris", ko: "박쥐" }, icon: "bat" as const },
  { id: "toad", name: { en: "Toad", fi: "Rupikonna", ja: "ヒキガエル", fr: "Crapaud", ko: "두꺼비" }, icon: "toad" as const },
];

type Relevance = 3 | 2 | 1 | 0;

const ALIGNMENT: Record<string, Record<string, Relevance>> = {
  military:      { aphid: 0, bee: 0, moth: 0, bird: 1, bat: 1, toad: 0 },
  weather_radar: { aphid: 1, bee: 2, moth: 2, bird: 2, bat: 3, toad: 1 },
  telecom:       { aphid: 2, bee: 3, moth: 2, bird: 3, bat: 3, toad: 2 },
  wifi:          { aphid: 1, bee: 2, moth: 1, bird: 2, bat: 2, toad: 1 },
  display:       { aphid: 0, bee: 0, moth: 0, bird: 0, bat: 0, toad: 0 },
  smart_meters:  { aphid: 1, bee: 1, moth: 1, bird: 1, bat: 1, toad: 0 },
  indoor_led:    { aphid: 0, bee: 0, moth: 1, bird: 0, bat: 0, toad: 0 },
  solar:         { aphid: 0, bee: 1, moth: 0, bird: 0, bat: 0, toad: 0 },
  street_led:    { aphid: 1, bee: 1, moth: 3, bird: 2, bat: 2, toad: 1 },
  iot:           { aphid: 0, bee: 1, moth: 0, bird: 1, bat: 1, toad: 0 },
  adas:          { aphid: 0, bee: 0, moth: 0, bird: 0, bat: 1, toad: 0 },
  wind:          { aphid: 0, bee: 0, moth: 0, bird: 2, bat: 3, toad: 0 },
};

const SENTINEL_EVENTS = [
  { year: 1989, label: { en: "Hallmann insect data begins", fi: "Hallmannin hyönteisdata alkaa", ja: "Hallmann昆虫データ開始", fr: "Début des données insectes de Hallmann", ko: "Hallmann 곤충 데이터 시작" } },
  { year: 1997, label: { en: "NEXRAD complete", fi: "NEXRAD valmis", ja: "NEXRAD完了", fr: "NEXRAD achevé", ko: "NEXRAD 완료" } },
  { year: 2006, label: { en: "WNS bat crisis", fi: "WNS-lepakkokriisi", ja: "WNSコウモリ危機", fr: "Crise WNS des chauves-souris", ko: "WNS 박쥐 위기" } },
  { year: 2009, label: { en: "EU incandescent ban", fi: "EU:n hehkulamppukielto", ja: "EU白熱電球禁止", fr: "Interdiction UE des incandescentes", ko: "EU 백열전구 금지" } },
  { year: 2017, label: { en: "Hallmann: −76% insect biomass", fi: "Hallmann: −76 % hyönteisbiomassa", ja: "Hallmann: 昆虫バイオマス−76%", fr: "Hallmann : −76 % biomasse insectes", ko: "Hallmann: 곤충 바이오매스 −76%" } },
  { year: 2026, label: { en: "Lindecke: bat compass disrupted", fi: "Lindecke: lepakkokompassi häiriintynyt", ja: "Lindecke: コウモリのコンパス撹乱", fr: "Lindecke : boussole des chauves-souris perturbée", ko: "Lindecke: 박쥐 나침반 교란" } },
];

const RELEVANCE_DOTS: Record<Relevance, string> = {
  3: "●●●",
  2: "●●",
  1: "●",
  0: "○",
};

const RELEVANCE_COLORS: Record<Relevance, string> = {
  3: "text-red-400",
  2: "text-amber-400",
  1: "text-blue-400",
  0: "text-foreground-muted/30",
};

const COPY = {
  en: {
    title: "Technology Layers",
    subtitle: "12 independent EMF technology layers, each with its own driver, frequency profile, and deployment timeline. Orthogonal instruments improve the model's ability to distinguish biological effects from economic confounders.",
    timelineTitle: "EMF Layer Deployment Timeline",
    timelineNote: "Each band shows when a technology layer entered the ambient environment. Sentinel events (▼) mark key ecological observations.",
    matrixTitle: "Layer × Sentinel Alignment",
    matrixNote: "Relevance of each EMF layer to each sentinel species. ●●● = strong mechanistic + observational link. ●● = moderate. ● = weak. ○ = no known link.",
    layer: "Layer",
    freq: "Frequency",
    driver: "Driver",
    channel: "Channel",
    sentinelEvents: "Sentinel events",
    showAll: "Show all",
    hideAll: "Hide all",
    orthoTitle: "Why orthogonal layers matter",
    orthoP1: "When all technology layers correlate with GDP (economic development drives them all), a two-layer model cannot distinguish biological causation from economic confounding. Twelve layers with ten different drivers — energy policy, vehicle safety, municipal decisions, Cold War legacy — create natural experiments where some layers are present and others absent.",
    orthoP2: "If insect decline tracks weather radar deployment (energy-policy-independent, 1988 start) but not smart meter deployment (energy-policy-dependent, 2005 start), the model gains discriminative power. Each orthogonal instrument narrows the space of plausible alternative explanations.",
  },
  fi: {
    title: "Teknologiakerrokset",
    subtitle: "12 itsenäistä EMF-teknologiakerrosta, joista jokaisella on oma ajurinsa, taajuusprofiilinsa ja käyttöönottoaikataulunsa. Ortogonaaliset instrumentit parantavat mallin kykyä erottaa biologiset vaikutukset taloudellisista sekoittajista.",
    timelineTitle: "EMF-kerrosten käyttöönottoaikajana",
    timelineNote: "Jokainen nauha osoittaa milloin teknologiakerros tuli ympäristöön. Sentinellitapahtumat (▼) merkitsevät keskeisiä ekologisia havaintoja.",
    matrixTitle: "Kerros × Sentinelli-kohdistus",
    matrixNote: "Kunkin EMF-kerroksen relevanssi kullekin sentinellilajille. ●●● = vahva mekanistinen + havaintopohjainen yhteys. ●● = kohtalainen. ● = heikko. ○ = ei tunnettua yhteyttä.",
    layer: "Kerros",
    freq: "Taajuus",
    driver: "Ajuri",
    channel: "Kanava",
    sentinelEvents: "Sentinellitapahtumat",
    showAll: "Näytä kaikki",
    hideAll: "Piilota kaikki",
    orthoTitle: "Miksi ortogonaaliset kerrokset ovat tärkeitä",
    orthoP1: "Kun kaikki teknologiakerrokset korreloivat BKT:n kanssa (taloudellinen kehitys ajaa niitä kaikkia), kahden kerroksen malli ei pysty erottamaan biologista kausaatiota taloudellisesta sekoittajasta. Kaksitoista kerrosta kymmenellä eri ajurilla — energiapolitiikka, ajoneuvoturvallisuus, kuntapäätökset, kylmän sodan perintö — luovat luonnollisia kokeita joissa jotkut kerrokset ovat läsnä ja toiset puuttuvat.",
    orthoP2: "Jos hyönteiskato seuraa säätutkien käyttöönottoa (energiapolitiikasta riippumaton, alku 1988) mutta ei älymittareiden käyttöönottoa (energiapolitiikasta riippuvainen, alku 2005), malli saa diskriminointivoimaa. Jokainen ortogonaalinen instrumentti kaventaa uskottavien vaihtoehtoisten selitysten joukkoa.",
  },
  ja: {
    title: "技術レイヤー",
    subtitle: "12の独立したEMF技術レイヤー。それぞれ独自のドライバー、周波数プロファイル、展開タイムラインを持ちます。直交する指標変数は、生物学的効果を経済的交絡因子から区別するモデルの能力を向上させます。",
    timelineTitle: "EMFレイヤー展開タイムライン",
    timelineNote: "各帯は技術レイヤーが環境に導入された時期を示します。センチネルイベント（▼）は主要な生態学的観察を示します。",
    matrixTitle: "レイヤー × センチネル対応表",
    matrixNote: "各EMFレイヤーと各センチネル種との関連性。●●● = 強いメカニズム的・観察的関連。●● = 中程度。● = 弱い。○ = 既知の関連なし。",
    layer: "レイヤー",
    freq: "周波数",
    driver: "ドライバー",
    channel: "チャネル",
    sentinelEvents: "センチネルイベント",
    showAll: "すべて表示",
    hideAll: "すべて非表示",
    orthoTitle: "なぜ直交レイヤーが重要か",
    orthoP1: "すべての技術レイヤーがGDP（経済発展がすべてを推進）と相関する場合、2レイヤーモデルでは生物学的因果関係と経済的交絡を区別できません。10種類の異なるドライバー — エネルギー政策、車両安全、自治体の決定、冷戦の遺産 — を持つ12のレイヤーは、一部のレイヤーが存在し他が不在となる自然実験を作り出します。",
    orthoP2: "昆虫の減少が気象レーダーの展開（エネルギー政策から独立、1988年開始）に追随するがスマートメーターの展開（エネルギー政策に依存、2005年開始）には追随しない場合、モデルは弁別力を獲得します。各直交指標変数は、もっともらしい代替的説明の空間を狭めます。",
  },
  fr: {
    title: "Couches technologiques",
    subtitle: "12 couches technologiques EMF indépendantes, chacune avec son propre facteur, profil de fréquence et calendrier de déploiement. Les instruments orthogonaux améliorent la capacité du modèle à distinguer les effets biologiques des facteurs de confusion économiques.",
    timelineTitle: "Chronologie de déploiement des couches EMF",
    timelineNote: "Chaque bande montre quand une couche technologique est entrée dans l'environnement ambiant. Les événements sentinelles (▼) marquent des observations écologiques clés.",
    matrixTitle: "Couche × Alignement sentinelle",
    matrixNote: "Pertinence de chaque couche EMF pour chaque espèce sentinelle. ●●● = lien mécanistique + observationnel fort. ●● = modéré. ● = faible. ○ = aucun lien connu.",
    layer: "Couche",
    freq: "Fréquence",
    driver: "Facteur",
    channel: "Canal",
    sentinelEvents: "Événements sentinelles",
    showAll: "Tout afficher",
    hideAll: "Tout masquer",
    orthoTitle: "Pourquoi les couches orthogonales sont importantes",
    orthoP1: "Lorsque toutes les couches technologiques sont corrélées au PIB (le développement économique les entraîne toutes), un modèle à deux couches ne peut pas distinguer la causalité biologique du facteur de confusion économique. Douze couches avec dix facteurs différents — politique énergétique, sécurité des véhicules, décisions municipales, héritage de la Guerre froide — créent des expériences naturelles où certaines couches sont présentes et d'autres absentes.",
    orthoP2: "Si le déclin des insectes suit le déploiement des radars météorologiques (indépendant de la politique énergétique, début 1988) mais pas le déploiement des compteurs intelligents (dépendant de la politique énergétique, début 2005), le modèle gagne en pouvoir discriminant. Chaque instrument orthogonal réduit l'espace des explications alternatives plausibles.",
  },
  ko: {
    title: "기술 레이어",
    subtitle: "각각 고유한 동인, 주파수 프로파일, 배치 타임라인을 가진 12개의 독립적 EMF 기술 레이어. 직교 도구변수는 생물학적 효과를 경제적 교란변수로부터 구별하는 모델의 능력을 향상시킵니다.",
    timelineTitle: "EMF 레이어 배치 타임라인",
    timelineNote: "각 밴드는 기술 레이어가 환경에 도입된 시기를 보여줍니다. 센티넬 이벤트(▼)는 주요 생태학적 관찰을 표시합니다.",
    matrixTitle: "레이어 × 센티넬 대응표",
    matrixNote: "각 EMF 레이어와 각 센티넬 종의 관련성. ●●● = 강한 메커니즘적 + 관찰적 연관. ●● = 중간. ● = 약함. ○ = 알려진 연관 없음.",
    layer: "레이어",
    freq: "주파수",
    driver: "동인",
    channel: "채널",
    sentinelEvents: "센티넬 이벤트",
    showAll: "모두 표시",
    hideAll: "모두 숨기기",
    orthoTitle: "왜 직교 레이어가 중요한가",
    orthoP1: "모든 기술 레이어가 GDP와 상관될 때(경제 발전이 모두를 추동), 2개 레이어 모델로는 생물학적 인과관계와 경제적 교란을 구분할 수 없습니다. 10가지 다른 동인 — 에너지 정책, 차량 안전, 지자체 결정, 냉전 유산 — 을 가진 12개 레이어는 일부 레이어가 존재하고 다른 레이어가 부재한 자연 실험을 만들어냅니다.",
    orthoP2: "곤충 감소가 기상 레이더 배치(에너지 정책과 독립적, 1988년 시작)를 추적하지만 스마트 미터 배치(에너지 정책에 의존적, 2005년 시작)를 추적하지 않는다면, 모델은 판별력을 얻습니다. 각 직교 도구변수는 그럴듯한 대안적 설명의 공간을 좁힙니다.",
  },
} as const;

function RelevanceCell({ level }: { level: Relevance }) {
  return (
    <span className={`font-mono text-xs ${RELEVANCE_COLORS[level]}`}>
      {RELEVANCE_DOTS[level]}
    </span>
  );
}

export function LayersExplorer({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(LAYERS.map((l) => l.id)),
  );

  const toggleLayer = (id: string) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const minYear = 1950;
  const maxYear = 2030;
  const span = maxYear - minYear;

  const rowH = 30;
  const topPad = 22;
  const labelW = 164;
  const chartW = 570;
  const rightPad = 32;
  const totalW = labelW + chartW + rightPad;
  const layerRows = LAYERS.filter((l) => visible.has(l.id));
  const chartH = layerRows.length * rowH;
  const eventH = 30;
  const axisLabelY = topPad + chartH + eventH;
  const bottomPad = 28;
  const totalH = axisLabelY + bottomPad;

  const xForYear = (y: number) => labelW + ((y - minYear) / span) * chartW;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
          {d.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-1">{d.timelineTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{d.timelineNote}</p>

        {/* Layer toggles */}
        <div className="flex flex-wrap gap-2 mb-4">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => toggleLayer(l.id)}
              aria-pressed={visible.has(l.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                visible.has(l.id)
                  ? "border-current opacity-100"
                  : "border-card-border opacity-40"
              }`}
              style={{ color: l.color }}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: l.color, opacity: visible.has(l.id) ? 1 : 0.3 }}
              />
              {pickCopy(l.name, locale)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setVisible(new Set(LAYERS.map((l) => l.id)))}
            className="text-xs text-foreground-muted hover:text-foreground px-2 py-1"
          >
            {d.showAll}
          </button>
          <button
            type="button"
            onClick={() => setVisible(new Set())}
            className="text-xs text-foreground-muted hover:text-foreground px-2 py-1"
          >
            {d.hideAll}
          </button>
        </div>

        {/* SVG Timeline */}
        <figure className="overflow-hidden rounded-lg border border-card-border bg-background-secondary/30">
          <div
            className="overflow-x-auto overscroll-x-contain px-3 pt-3 touch-pan-x"
            role="region"
            aria-label={d.timelineTitle}
            tabIndex={0}
          >
            <svg
              viewBox={`0 0 ${totalW} ${totalH}`}
              className="block w-full min-w-[740px]"
              role="img"
              aria-label={d.timelineTitle}
            >
            <rect
              x={labelW}
              y={topPad}
              width={chartW}
              height={chartH}
              rx={5}
              fill="var(--figure-caption-bg)"
              opacity={0.3}
            />

            {/* Alternating rows keep dense bands easy to track. */}
            {layerRows.map((layer, i) =>
              i % 2 === 0 ? (
                <rect
                  key={`row-${layer.id}`}
                  x={0}
                  y={topPad + i * rowH}
                  width={labelW + chartW}
                  height={rowH}
                  fill="var(--foreground)"
                  opacity={0.022}
                />
              ) : null,
            )}

            {/* Decade grid lines */}
            {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030].map((yr) => (
              <g key={yr}>
                <line
                  x1={xForYear(yr)} y1={topPad}
                  x2={xForYear(yr)} y2={topPad + chartH}
                  stroke="var(--card-border)" strokeWidth={1} strokeDasharray="3,4"
                />
                <text
                  x={xForYear(yr)} y={axisLabelY}
                  fill="var(--foreground-muted)" fontSize={10} textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  dominantBaseline="hanging"
                >
                  {yr}
                </text>
              </g>
            ))}

            {/* Layer bands */}
            {layerRows.map((layer, i) => {
              const y = topPad + i * rowH;
              const x1 = xForYear(layer.startYear);
              const x2 = xForYear(maxYear);
              return (
                <g key={layer.id}>
                  <title>
                    {pickCopy(layer.name, locale)}: {layer.startYear}–
                    {"\n"}{pickCopy(layer.freq, locale)}
                    {"\n"}{pickCopy(layer.driver, locale)}
                  </title>
                  {/* Label */}
                  <text
                    x={labelW - 8} y={y + rowH / 2}
                    fill={layer.color} fontSize={10.5}
                    textAnchor="end" dominantBaseline="middle"
                    fontWeight="600"
                  >
                    {pickCopy(layer.name, locale)}
                  </text>
                  {/* Band background */}
                  <rect
                    x={x1} y={y + 3}
                    width={x2 - x1} height={rowH - 6}
                    fill={layer.color} opacity={0.18} rx={4}
                  />
                  {/* Band solid start */}
                  <rect
                    x={x1} y={y + 3}
                    width={Math.min(x2 - x1, 4)} height={rowH - 6}
                    fill={layer.color} opacity={0.85} rx={2}
                  />
                  {/* Start year label */}
                  <text
                    x={x1 + 8} y={y + rowH / 2}
                    fill={layer.color} fontSize={8.5}
                    dominantBaseline="middle" opacity={0.8}
                  >
                    {layer.startYear}
                  </text>
                </g>
              );
            })}

            {/* Sentinel events */}
            {SENTINEL_EVENTS.map((evt, i) => {
              const x = xForYear(evt.year);
              const y = topPad + chartH + 13;
              return (
                <g key={i}>
                  <title>{pickCopy(evt.label, locale)} ({evt.year})</title>
                  <line
                    x1={x} y1={topPad} x2={x} y2={topPad + chartH}
                    stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2,3"
                    opacity={0.5}
                  />
                  <text
                    x={x} y={y}
                    fill="#ef4444" fontSize={10} textAnchor="middle"
                  >
                    ▼
                  </text>
                </g>
              );
            })}
            </svg>
          </div>
          <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-card-border bg-card-bg px-3 py-3 text-xs text-foreground-muted sm:px-4">
            <span className="font-semibold text-foreground">{d.sentinelEvents}</span>
            {SENTINEL_EVENTS.map((evt) => (
              <span key={evt.year} className="inline-flex min-w-0 items-center gap-1.5">
                <span className="text-red-500" aria-hidden="true">▼</span>
                <span className="font-mono tabular-nums text-foreground">{evt.year}</span>
                <span>{pickCopy(evt.label, locale)}</span>
              </span>
            ))}
          </figcaption>
        </figure>
      </section>

      {/* Sentinel Alignment Matrix */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-1">{d.matrixTitle}</h3>
        <p className="text-sm text-foreground-muted mb-4">{d.matrixNote}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">{d.layer}</th>
                <th className="py-2 pr-4 font-medium text-xs">{d.freq}</th>
                {SENTINEL_SPECIES.map((sp) => (
                  <th key={sp.id} className="py-2 px-2 font-medium text-center whitespace-nowrap">
                    <BermIcon name={sp.icon} size={14} className="inline-block mr-1 align-[-0.1em]" />
                    <span className="text-xs">{pickCopy(sp.name, locale)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYERS.map((layer) => (
                <tr key={layer.id} className="border-b border-card-border last:border-0">
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <span className="inline-block w-2 h-2 rounded-sm mr-2" style={{ backgroundColor: layer.color }} />
                    <span className="font-medium text-xs">{pickCopy(layer.name, locale)}</span>
                  </td>
                  <td className="py-2 pr-4 text-foreground-muted text-xs whitespace-nowrap">
                    {pickCopy(layer.freq, locale)}
                  </td>
                  {SENTINEL_SPECIES.map((sp) => (
                    <td key={sp.id} className="py-2 px-2 text-center">
                      <RelevanceCell level={ALIGNMENT[layer.id]?.[sp.id] ?? 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orthogonal instruments explanation */}
      <section className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-3">{d.orthoTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">
          {d.orthoP1}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {d.orthoP2}
        </p>
      </section>
    </div>
  );
}
