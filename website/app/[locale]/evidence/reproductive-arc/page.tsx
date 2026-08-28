import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Reproductive Arc",
    subtitle: "From fertilization to first year of life, every critical reproductive stage depends on Ca²⁺ channels. CatSper channels guide sperm (VK17), Cav1.2 controls uterine contractions (VK44), nifedipine prevents preterm birth, pre-eclampsia involves Cav1.2+ROS dysregulation (VK48), and SIDS follows melatonin depletion in the neonate.",
    backLink: "← Back to Evidence",
    cautionText: "This page presents Ca²⁺ channel involvement across reproductive stages. Each mechanism is individually established. The unified arc connecting EMF to reproductive outcomes across all stages is a BERM hypothesis.",

    arcTitle: "The arc",
    arcLead: "Five stages from fertilization to the neonatal period — each Ca²⁺-dependent, each EMF-vulnerable.",
    arcSteps: [
      { step: "Stage 1: Fertilization", detail: "CatSper (Ca²⁺ channel) guides sperm to egg. EMF→CatSper activation→premature hyperactivation (VK17). Already verified: sperm motility↓ with RF." },
      { step: "Stage 2: Pregnancy hormones", detail: "P4:E2 ratio regulates Cav1.2 in uterus. P4↓ → Cav1.2↑ → uterine excitability↑. EMF could lower the P4 threshold for preterm contraction onset." },
      { step: "Stage 3: Preterm birth", detail: "Nifedipine (Ca²⁺ channel blocker) is FIRST-LINE tocolytic. If a Ca²⁺ blocker prevents preterm labor, Ca²⁺ overload is a cause. Cochrane evidence: nifedipine superior to beta-agonists." },
      { step: "Stage 4: Pre-eclampsia", detail: "ET-1→Cav1.2 activation in placenta. ROS + Ca²⁺ dysregulation → endothelial dysfunction → hypertension. Nifedipine also used for pre-eclampsia hypertension management." },
      { step: "Stage 5: Neonatal", detail: "Breast milk melatonin → infant circadian programming. EMF→melatonin↓ in mother → less melatonin transfer → SIDS vulnerability (VK18)." },
    ],

    proofTitle: "Nifedipine: The proof",
    proofLead: "The same drug — nifedipine — treats three distinct reproductive conditions. All three work by Ca²⁺ channel blockade.",
    proofPoints: [
      { use: "Tocolysis (preterm labor)", mechanism: "Blocks Cav1.2 in uterine smooth muscle → reduces contractions → delays preterm delivery", note: "First-line tocolytic in many countries; Cochrane-confirmed superiority over beta-agonists" },
      { use: "Pre-eclampsia hypertension", mechanism: "Blocks Cav1.2 in vascular smooth muscle → vasodilation → blood pressure reduction", note: "Used alongside magnesium sulfate (also a Ca²⁺ channel modulator) for severe pre-eclampsia" },
      { use: "Raynaud's nipple vasospasm", mechanism: "Blocks Cav1.2 in nipple vasculature → prevents vasospasm → enables continued breastfeeding", note: "Prescribed during lactation — Ca²⁺ channel blockade in yet another reproductive tissue" },
    ],
    proofConclusion: "If the drug works by blocking Ca²⁺ channels, then Ca²⁺ channel over-activation is the problem. EMF provides a mechanism for that over-activation.",

    epidTitle: "Epidemiological convergence",
    epidLead: "Multiple reproductive outcomes are worsening simultaneously — consistent with a shared environmental cause acting on Ca²⁺ channels.",
    epidPoints: [
      "Preterm birth rates increased ~36% (1990–2006) in many countries",
      "Pre-eclampsia prevalence rising in developed nations",
      "SIDS declined with Back-to-Sleep but other infant mortality patterns shifted",
      "Male fertility declining globally (sperm counts −50% in 50 years)",
    ],

    predictionText: "Prediction E-NEW-1: CatSper-mediated sperm hyperactivation is RF-dose-dependent, and preterm birth / pre-eclampsia rates correlate with maternal EMF exposure levels via Cav1.2 over-activation.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Reproduktiivinen kaari",
    subtitle: "Hedelmöityksestä ensimmäiseen elinvuoteen jokainen kriittinen lisääntymisen vaihe on riippuvainen Ca²⁺-kanavista. CatSper-kanavat ohjaavat siittiöitä (VK17), Cav1.2 kontrolloi kohdun supistuksia (VK44), nifedipiini estää ennenaikaista synnytystä, pre-eklampsia sisältää Cav1.2+ROS-dysregulaation (VK48), ja kätkytkuolema seuraa melatoniinin ehtymistä vastasyntyneellä.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu esittää Ca²⁺-kanavien osallisuuden lisääntymisen eri vaiheissa. Jokainen mekanismi on yksilöllisesti vakiintunut. Yhtenäinen kaari joka yhdistää EMF:n lisääntymistuloksiin kaikkien vaiheiden läpi on BERM-hypoteesi.",

    arcTitle: "Kaari",
    arcLead: "Viisi vaihetta hedelmöityksestä neonataalikauteen — jokainen Ca²⁺-riippuvainen, jokainen EMF-haavoittuva.",
    arcSteps: [
      { step: "Vaihe 1: Hedelmöitys", detail: "CatSper (Ca²⁺-kanava) ohjaa siittiön munasoluun. EMF→CatSper-aktivaatio→ennenaikainen hyperaktivaatio (VK17). Jo vahvistettu: siittiöiden liikkuvuus↓ RF-altistuksella." },
      { step: "Vaihe 2: Raskaushormonit", detail: "P4:E2-suhde säätelee Cav1.2:ta kohdussa. P4↓ → Cav1.2↑ → kohdun ärtyvyys↑. EMF voisi laskea P4-kynnystä ennenaikaisen supistuksen alkamiselle." },
      { step: "Vaihe 3: Ennenaikainen synnytys", detail: "Nifedipiini (Ca²⁺-kanavasalpaaja) on ENSILINJAN tokolyyttinen lääke. Jos Ca²⁺-salpaaja estää ennenaikaista synnytystä, Ca²⁺-ylikuormitus on syy. Cochrane-evidenssi: nifedipiini parempi kuin beta-agonistit." },
      { step: "Vaihe 4: Pre-eklampsia", detail: "ET-1→Cav1.2-aktivaatio istukassa. ROS + Ca²⁺-dysregulaatio → endoteelin toimintahäiriö → hypertensio. Nifedipiiniä käytetään myös pre-eklampsian verenpaineen hallintaan." },
      { step: "Vaihe 5: Neonataalikausi", detail: "Rintamaidon melatoniini → vauvan vuorokausirytmin ohjelmointi. EMF→melatoniini↓ äidissä → vähemmän melatoniinin siirtoa → kätkytkuoleman haavoittuvuus (VK18)." },
    ],

    proofTitle: "Nifedipiini: Todiste",
    proofLead: "Sama lääke — nifedipiini — hoitaa kolmea erillistä lisääntymistilaa. Kaikki kolme toimivat Ca²⁺-kanavasalpauksen kautta.",
    proofPoints: [
      { use: "Tokolyysi (ennenaikainen synnytys)", mechanism: "Salpaaa Cav1.2:n kohdun sileässä lihaksessa → vähentää supistuksia → viivästyttää ennenaikaista synnytystä", note: "Ensilinjan tokolyyttinen lääke monissa maissa; Cochrane-vahvistettu paremmuus beta-agonisteihin nähden" },
      { use: "Pre-eklampsian hypertensio", mechanism: "Salpaaa Cav1.2:n verisuonten sileässä lihaksessa → vasodilataatio → verenpaineen lasku", note: "Käytetään magnesiumsulfaatin (myös Ca²⁺-kanavamodulaattori) kanssa vaikeassa pre-eklampsiassa" },
      { use: "Raynaud'n nännin vasospasmi", mechanism: "Salpaaa Cav1.2:n nännin verisuonissa → estää vasospasmin → mahdollistaa imetyksen jatkumisen", note: "Määrätään imetyksen aikana — Ca²⁺-kanavasalpaus jälleen toisessa lisääntymiskudoksessa" },
    ],
    proofConclusion: "Jos lääke toimii salpaaamalla Ca²⁺-kanavia, niin Ca²⁺-kanavien yliaktivaatio on ongelma. EMF tarjoaa mekanismin tuolle yliaktivaatiolle.",

    epidTitle: "Epidemiologinen konvergenssi",
    epidLead: "Useat lisääntymistulokset huononevat samanaikaisesti — johdonmukaista yhteisen ympäristösyyn kanssa joka vaikuttaa Ca²⁺-kanaviin.",
    epidPoints: [
      "Ennenaikaisen synnytyksen osuudet kasvaneet ~36 % (1990–2006) monissa maissa",
      "Pre-eklampsian esiintyvyys nousee kehittyneissä maissa",
      "Kätkytkuolema väheni Back-to-Sleep-kampanjalla mutta muut imeväiskuolleisuuden kaavat muuttuivat",
      "Miesten hedelmällisyys laskee globaalisti (siittiömäärät −50 % 50 vuodessa)",
    ],

    predictionText: "Ennuste E-NEW-1: CatSper-välitteinen siittiöiden hyperaktivaatio on RF-annosriippuvaista, ja ennenaikaisen synnytyksen / pre-eklampsian osuudet korreloivat äidin EMF-altistustasojen kanssa Cav1.2-yliaktivaation kautta.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },

  ja: {
    title: "生殖アーク",
    subtitle: "受精から生後1年まで、すべての重要な生殖段階はCa²⁺チャネルに依存する。CatSperチャネルが精子を誘導し（VK17）、Cav1.2が子宮収縮を制御し（VK44）、ニフェジピンが早産を予防し、妊娠高血圧腎症はCav1.2+ROSの調節異常を含み（VK48）、SIDSは新生児におけるメラトニン枯渇に続く。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページは生殖段階全体にわたるCa²⁺チャネルの関与を提示する。各メカニズムは個別に確立されている。EMFをすべての段階にわたる生殖転帰に結びつける統合的アークはBERM仮説である。",

    arcTitle: "アーク",
    arcLead: "受精から新生児期までの5段階――各段階がCa²⁺依存性であり、各段階がEMF脆弱性を持つ。",
    arcSteps: [
      { step: "段階1：受精", detail: "CatSper（Ca²⁺チャネル）が精子を卵子に誘導する。EMF→CatSper活性化→早期過活性化（VK17）。既に検証済み：RFによる精子運動性↓。" },
      { step: "段階2：妊娠ホルモン", detail: "P4:E2比が子宮のCav1.2を制御する。P4↓ → Cav1.2↑ → 子宮興奮性↑。EMFが早産収縮開始のP4閾値を低下させる可能性がある。" },
      { step: "段階3：早産", detail: "ニフェジピン（Ca²⁺チャネル遮断薬）が第一選択子宮収縮抑制薬である。Ca²⁺遮断薬が早産を予防するならば、Ca²⁺過負荷が原因である。Cochraneエビデンス：ニフェジピンがβアゴニストより優れる。" },
      { step: "段階4：妊娠高血圧腎症", detail: "ET-1→胎盤におけるCav1.2活性化。ROS + Ca²⁺調節異常 → 内皮機能障害 → 高血圧。ニフェジピンは妊娠高血圧腎症の血圧管理にも使用される。" },
      { step: "段階5：新生児期", detail: "母乳メラトニン → 乳児の概日リズムプログラミング。EMF→母親のメラトニン↓ → メラトニン移行量↓ → SIDS脆弱性（VK18）。" },
    ],

    proofTitle: "ニフェジピン：証拠",
    proofLead: "同じ薬剤――ニフェジピン――が3つの異なる生殖疾患を治療する。3つすべてがCa²⁺チャネル遮断によって作用する。",
    proofPoints: [
      { use: "子宮収縮抑制（早産）", mechanism: "子宮平滑筋のCav1.2を遮断 → 収縮を減少 → 早産を遅延", note: "多くの国で第一選択子宮収縮抑制薬；Cochrane確認のβアゴニストに対する優位性" },
      { use: "妊娠高血圧腎症の高血圧", mechanism: "血管平滑筋のCav1.2を遮断 → 血管拡張 → 血圧低下", note: "重症妊娠高血圧腎症では硫酸マグネシウム（これもCa²⁺チャネル調節薬）と併用" },
      { use: "レイノー乳頭血管攣縮", mechanism: "乳頭血管のCav1.2を遮断 → 血管攣縮を予防 → 授乳の継続を可能にする", note: "授乳中に処方される――さらに別の生殖組織におけるCa²⁺チャネル遮断" },
    ],
    proofConclusion: "薬剤がCa²⁺チャネルを遮断することで作用するならば、Ca²⁺チャネルの過活性化が問題である。EMFがその過活性化のメカニズムを提供する。",

    epidTitle: "疫学的収束",
    epidLead: "複数の生殖転帰が同時に悪化している――Ca²⁺チャネルに作用する共通の環境要因と整合する。",
    epidPoints: [
      "早産率が多くの国で約36%増加（1990〜2006年）",
      "先進国で妊娠高血圧腎症の有病率が上昇",
      "SIDSはBack-to-Sleepキャンペーンで減少したが、他の乳児死亡パターンが変化した",
      "男性の生殖能力がグローバルに低下（精子数が50年で−50%）",
    ],

    predictionText: "予測E-NEW-1：CatSper媒介精子過活性化はRF用量依存性であり、早産/妊娠高血圧腎症率はCav1.2過活性化を介して母体EMF曝露レベルと相関する。",
    predictionLink: "最終層予測を参照 →",
    predictionHref: "/predictions",
  },

  fr: {
    title: "L'arc reproductif",
    subtitle: "De la fecondation a la premiere annee de vie, chaque etape reproductive critique depend des canaux Ca²⁺. Les canaux CatSper guident les spermatozoides (VK17), Cav1.2 controle les contractions uterines (VK44), la nifedipine previent l'accouchement premature, la pre-eclampsie implique une dysregulation Cav1.2+ROS (VK48), et le SMIN suit l'epuisement de la melatonine chez le nouveau-ne.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page presente l'implication des canaux Ca²⁺ a travers les etapes reproductives. Chaque mecanisme est individuellement etabli. L'arc unifie reliant l'EMF aux issues reproductives a travers toutes les etapes est une hypothese BERM.",

    arcTitle: "L'arc",
    arcLead: "Cinq etapes de la fecondation a la periode neonatale — chacune Ca²⁺-dependante, chacune vulnerable a l'EMF.",
    arcSteps: [
      { step: "Etape 1 : Fecondation", detail: "CatSper (canal Ca²⁺) guide le spermatozoide vers l'ovule. EMF→activation CatSper→hyperactivation prematuree (VK17). Deja verifie : motilite des spermatozoides↓ avec les RF." },
      { step: "Etape 2 : Hormones de grossesse", detail: "Le ratio P4:E2 regule Cav1.2 dans l'uterus. P4↓ → Cav1.2↑ → excitabilite uterine↑. L'EMF pourrait abaisser le seuil de P4 pour le declenchement des contractions prematurees." },
      { step: "Etape 3 : Accouchement premature", detail: "La nifedipine (bloqueur des canaux Ca²⁺) est le tocolytique de PREMIERE INTENTION. Si un bloqueur Ca²⁺ previent le travail premature, la surcharge en Ca²⁺ en est la cause. Preuve Cochrane : nifedipine superieure aux beta-agonistes." },
      { step: "Etape 4 : Pre-eclampsie", detail: "ET-1→activation de Cav1.2 dans le placenta. ROS + dysregulation Ca²⁺ → dysfonction endotheliale → hypertension. La nifedipine est aussi utilisee pour la gestion de l'hypertension de la pre-eclampsie." },
      { step: "Etape 5 : Neonatal", detail: "Melatonine du lait maternel → programmation circadienne du nourrisson. EMF→melatonine↓ chez la mere → moins de transfert de melatonine → vulnerabilite au SMIN (VK18)." },
    ],

    proofTitle: "Nifedipine : la preuve",
    proofLead: "Le meme medicament — la nifedipine — traite trois affections reproductives distinctes. Les trois fonctionnent par blocage des canaux Ca²⁺.",
    proofPoints: [
      { use: "Tocolyse (travail premature)", mechanism: "Bloque Cav1.2 dans le muscle lisse uterin → reduit les contractions → retarde l'accouchement premature", note: "Tocolytique de premiere intention dans de nombreux pays ; superiorite confirmee par Cochrane par rapport aux beta-agonistes" },
      { use: "Hypertension de la pre-eclampsie", mechanism: "Bloque Cav1.2 dans le muscle lisse vasculaire → vasodilatation → reduction de la pression arterielle", note: "Utilise avec le sulfate de magnesium (aussi un modulateur des canaux Ca²⁺) pour la pre-eclampsie severe" },
      { use: "Vasospasme mamelonnaire de Raynaud", mechanism: "Bloque Cav1.2 dans la vascularisation mamelonnaire → previent le vasospasme → permet la poursuite de l'allaitement", note: "Prescrit pendant la lactation — blocage des canaux Ca²⁺ dans encore un autre tissu reproductif" },
    ],
    proofConclusion: "Si le medicament fonctionne en bloquant les canaux Ca²⁺, alors la suractivation des canaux Ca²⁺ est le probleme. L'EMF fournit un mecanisme pour cette suractivation.",

    epidTitle: "Convergence epidemiologique",
    epidLead: "De multiples issues reproductives se deteriorent simultanement — compatible avec une cause environnementale partagee agissant sur les canaux Ca²⁺.",
    epidPoints: [
      "Les taux d'accouchement premature ont augmente d'environ 36 % (1990–2006) dans de nombreux pays",
      "La prevalence de la pre-eclampsie augmente dans les pays developpes",
      "Le SMIN a diminue avec la campagne Back-to-Sleep mais d'autres patterns de mortalite infantile ont change",
      "La fertilite masculine decline mondialement (nombre de spermatozoides −50 % en 50 ans)",
    ],

    predictionText: "Prediction E-NEW-1 : l'hyperactivation des spermatozoides mediee par CatSper est RF-dose-dependante, et les taux d'accouchement premature / pre-eclampsie correlent avec les niveaux d'exposition maternelle aux EMF via la suractivation de Cav1.2.",
    predictionLink: "Voir les predictions de la couche finale →",
    predictionHref: "/predictions",
  },

  ko: {
    title: "생식 아크",
    subtitle: "수정에서 생후 1년까지, 모든 중요한 생식 단계는 Ca²⁺ 채널에 의존한다. CatSper 채널이 정자를 유도하고(VK17), Cav1.2가 자궁 수축을 조절하며(VK44), 니페디핀이 조산을 예방하고, 자간전증은 Cav1.2+ROS 조절 이상을 포함하며(VK48), SIDS는 신생아의 멜라토닌 고갈에 뒤따른다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 생식 단계 전반에 걸친 Ca²⁺ 채널 관여를 제시한다. 각 메커니즘은 개별적으로 확립되어 있다. EMF를 모든 단계에 걸친 생식 결과에 연결하는 통합적 아크는 BERM 가설이다.",

    arcTitle: "아크",
    arcLead: "수정에서 신생아기까지 5단계 — 각각 Ca²⁺ 의존적이며, 각각 EMF에 취약하다.",
    arcSteps: [
      { step: "단계 1: 수정", detail: "CatSper(Ca²⁺ 채널)이 정자를 난자로 유도한다. EMF→CatSper 활성화→조기 과활성화(VK17). 이미 검증됨: RF에 의한 정자 운동성↓." },
      { step: "단계 2: 임신 호르몬", detail: "P4:E2 비율이 자궁의 Cav1.2를 조절한다. P4↓ → Cav1.2↑ → 자궁 흥분성↑. EMF가 조산 수축 개시의 P4 역치를 낮출 수 있다." },
      { step: "단계 3: 조산", detail: "니페디핀(Ca²⁺ 채널 차단제)이 1차 자궁수축억제제이다. Ca²⁺ 차단제가 조산을 예방한다면, Ca²⁺ 과부하가 원인이다. Cochrane 근거: 니페디핀이 베타 작용제보다 우수." },
      { step: "단계 4: 자간전증", detail: "ET-1→태반에서 Cav1.2 활성화. ROS + Ca²⁺ 조절 이상 → 내피 기능 장애 → 고혈압. 니페디핀은 자간전증의 혈압 관리에도 사용된다." },
      { step: "단계 5: 신생아기", detail: "모유 멜라토닌 → 영아 일주기 리듬 프로그래밍. EMF→모체 멜라토닌↓ → 멜라토닌 전달 감소 → SIDS 취약성(VK18)." },
    ],

    proofTitle: "니페디핀: 증거",
    proofLead: "동일한 약물 — 니페디핀 — 이 세 가지 별개의 생식 질환을 치료한다. 세 가지 모두 Ca²⁺ 채널 차단으로 작용한다.",
    proofPoints: [
      { use: "자궁수축억제(조산)", mechanism: "자궁 평활근의 Cav1.2를 차단 → 수축 감소 → 조산 지연", note: "많은 국가에서 1차 자궁수축억제제; Cochrane 확인된 베타 작용제에 대한 우위" },
      { use: "자간전증 고혈압", mechanism: "혈관 평활근의 Cav1.2를 차단 → 혈관 확장 → 혈압 감소", note: "중증 자간전증에서 황산마그네슘(역시 Ca²⁺ 채널 조절제)과 함께 사용" },
      { use: "레이노 유두 혈관연축", mechanism: "유두 혈관의 Cav1.2를 차단 → 혈관연축 예방 → 모유수유 지속 가능", note: "수유 중 처방 — 또 다른 생식 조직에서의 Ca²⁺ 채널 차단" },
    ],
    proofConclusion: "약물이 Ca²⁺ 채널을 차단함으로써 작용한다면, Ca²⁺ 채널의 과활성화가 문제이다. EMF가 그 과활성화의 메커니즘을 제공한다.",

    epidTitle: "역학적 수렴",
    epidLead: "여러 생식 결과가 동시에 악화되고 있다 — Ca²⁺ 채널에 작용하는 공유된 환경적 원인과 일치한다.",
    epidPoints: [
      "조산율이 많은 국가에서 약 36% 증가(1990~2006)",
      "선진국에서 자간전증 유병률 상승",
      "SIDS는 Back-to-Sleep 캠페인으로 감소했으나 다른 영아 사망 패턴이 변화",
      "남성 생식능력이 전 세계적으로 감소(정자 수 50년간 −50%)",
    ],

    predictionText: "예측 E-NEW-1: CatSper 매개 정자 과활성화는 RF 용량 의존적이며, 조산/자간전증 비율은 Cav1.2 과활성화를 통해 모체 EMF 노출 수준과 상관관계가 있다.",
    predictionLink: "최종 층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ReproductiveArcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Heart} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.arcTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.arcLead}</p>
        <div className="space-y-3">
          {d.arcSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.proofTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.proofLead}</p>
        <div className="space-y-3">
          {d.proofPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.use}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.proofConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epidTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.epidLead}</p>
        <div className="space-y-1.5">
          {d.epidPoints.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">&bull;</span><p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
