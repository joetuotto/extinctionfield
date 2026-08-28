import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Chronic Pain Epidemic: The ELF-Priming Hypothesis",
    subtitle: "ELF-priming (50/60 Hz power grid, continuous) upregulates α2δ-1 expression — the same subunit overexpressed in neuropathic pain. This creates a 'neuropathic state WITHOUT neuropathy': central sensitization, allodynia, and widespread pain from power grid exposure alone.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ELF-priming as a mechanism for the chronic pain epidemic. The α2δ-1 overexpression → pain pathway is well-established in neuropathic pain research. The novel claim — that ELF achieves the same α2δ-1 upregulation without nerve injury — requires direct experimental testing (prediction E-NEW-14).",

    mechTitle: "The mechanism",
    mechLead: "α2δ-1 is a VGCC auxiliary subunit. Its overexpression is the primary mechanism of neuropathic pain. ELF-priming upregulates VGCC expression — including α2δ-1.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (power grid, continuous exposure)", detail: "The background 50/60 Hz electromagnetic field from the power grid is continuous and ubiquitous. [[ref:sun2016_elf_vgcc|Sun 2016 (Scientific Reports)]] showed that 8-10 days of ELF exposure dramatically increases VGCC expression — including auxiliary subunits." },
      { step: "2. α2δ-1 expression↑ in DRG and spinal dorsal horn", detail: "α2δ-1 upregulation in dorsal root ganglia and spinal cord dorsal horn neurons is THE primary mechanism of neuropathic pain. In transgenic mice, α2δ-1 overexpression alone produces pain behavior WITHOUT any nerve injury ([[ref:a2d1_pain|PMID:16764990]])." },
      { step: "3. Central sensitization → allodynia", detail: "Elevated α2δ-1 increases excitatory synaptogenesis and neurotransmitter release in spinal pain circuits. This produces central sensitization — the nervous system amplifies pain signals. Normally harmless stimuli (touch, pressure) become painful (allodynia)." },
      { step: "4. Chronic widespread pain WITHOUT identifiable cause", detail: "The result: fibromyalgia, chronic widespread pain, chronic back pain — conditions where patients have genuine pain but no identifiable nerve damage. The damage is functional (α2δ-1↑ → central sensitization), not structural." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "The drugs that treat this pain target EXACTLY the mechanism ELF-priming produces.",
    pharmaPoints: [
      { drug: "Gabapentin (Neurontin)", mechanism: "Binds α2δ-1 → blocks trafficking of α2δ-1 from DRG to spinal presynaptic terminals → reverses central sensitization", note: "First-line treatment for neuropathic pain and fibromyalgia" },
      { drug: "Pregabalin (Lyrica)", mechanism: "Same α2δ-1 binding mechanism as gabapentin; higher potency and more predictable pharmacokinetics", note: "First FDA-approved drug for fibromyalgia (2007)" },
    ],
    pharmaConclusion: "Gabapentinoid prescriptions have increased dramatically over the past two decades. This increase is CONSISTENT with ELF-priming: as power grid density and continuous exposure increase, more people develop the α2δ-1-mediated pain state that gabapentinoids specifically treat.",

    epigenTitle: "Epigenetic amplification",
    epigenLead: "α2δ-1 expression is regulated by epigenetic mechanisms — creating a bridge to VK27.",
    epigenBody: "HDAC inhibitors increase α2δ-1 expression and produce pain states ([[ref:a2d1_epigen|PMC8514986]]). ELF-EMF alters HDAC activity (VK27). This creates a double mechanism: ELF directly upregulates α2δ-1 via VGCC expression AND indirectly via HDAC-mediated epigenetic regulation. The epigenetic component means the pain state can persist even after EMF exposure is reduced.",

    loopTitle: "Feedback loop S16: Pain-sleep-cortisol cycle",
    loopSteps: [
      "EMF → α2δ-1↑ → central sensitization → chronic pain",
      "Chronic pain → sleep disruption (Walker chain S4)",
      "Sleep↓ → cortisol↑ (HPA axis S7) + GABA↓",
      "Cortisol↑ → inflammation → more sensitization",
      "Chronic pain → depression (DA↓, VK19)",
      "Depression → sleep↓ → pain amplification → ...",
    ],
    loopConclusion: "The pain-sleep-cortisol cycle means that initial ELF-induced α2δ-1 upregulation creates a self-sustaining pain state. Even temporary EMF exposure can initiate a chronic condition that persists through the feedback loop.",

    predictionText: "Prediction E-NEW-14: ELF-exposed animals show α2δ-1 upregulation in DRG and spinal dorsal horn WITHOUT nerve injury, accompanied by pain-like behavior.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Kroonisen kivun epidemia: ELF-primaami-hypoteesi",
    subtitle: "ELF-primaami (50/60 Hz sähköverkko, jatkuva) säätelee α2δ-1-ekspressiota ylös — sama alayksikkö joka yliekspressoituu neuropaattisessa kivussa. Tämä luo 'neuropaattisen tilan ILMAN neuropatiaa': sentraalinen sensitisaatio, allodynia ja yleistynyt kipu pelkästä sähköverkkoaltistuksesta.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ehdottaa ELF-primaemia kroonisen kivun epidemian mekanismiksi. α2δ-1-yliekspressio → kipureitti on vakiintunut neuropaattisen kivun tutkimuksessa. Uusi väite — että ELF saavuttaa saman α2δ-1-ylössäätelyn ilman hermovauriota — vaatii suoraa kokeellista testausta (ennuste E-NEW-14).",

    mechTitle: "Mekanismi",
    mechLead: "α2δ-1 on VGCC:n apualayksikkö. Sen yliekspressio on neuropaattisen kivun PÄÄMEKANISMI. ELF-primaami säätelee VGCC-ekspressiota ylös — mukaan lukien α2δ-1.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (sähköverkko, jatkuva altistus)", detail: "Tausta 50/60 Hz sähkömagneettinen kenttä sähköverkosta on jatkuva ja kaikkialla läsnä. [[ref:sun2016_elf_vgcc|Sun 2016 (Scientific Reports)]] osoitti, että 8-10 päivän ELF-altistus kasvattaa dramaattisesti VGCC-ekspressiota — mukaan lukien apualayksiköt." },
      { step: "2. α2δ-1-ekspressio↑ DRG:ssä ja selkäytimen dorsaalisarvessa", detail: "α2δ-1-ylössäätely dorsaalijuuriganglioissa ja selkäytimen dorsaalisarven neuroneissa ON neuropaattisen kivun PÄÄMEKANISMI. Transgeenisillä hiirillä α2δ-1-yliekspressio yksin tuottaa kipukäyttäytymisen ILMAN hermovauriota ([[ref:a2d1_pain|PMID:16764990]])." },
      { step: "3. Sentraalinen sensitisaatio → allodynia", detail: "Kohonnut α2δ-1 kasvattaa eksitatorista synaptogeneesiä ja välittäjäaineiden vapautumista selkäytimen kipupiireissä. Tämä tuottaa sentraalisen sensitisaation — hermosto vahvistaa kipusignaaleja. Normaalisti harmittomat ärsykkeet (kosketus, paine) muuttuvat kivuliaiksi (allodynia)." },
      { step: "4. Krooninen yleistynyt kipu ILMAN tunnistettavaa syytä", detail: "Lopputulos: fibromyalgia, krooninen yleistynyt kipu, krooninen selkäkipu — tiloja joissa potilailla on todellista kipua mutta ei tunnistettavaa hermovauriota. Vaurio on funktionaalista (α2δ-1↑ → sentraalinen sensitisaatio), ei rakenteellista." },
    ],

    pharmaTitle: "Farmakologinen validaatio",
    pharmaLead: "Lääkkeet jotka hoitavat tätä kipua kohdistuvat TÄSMÄLLEEN siihen mekanismiin jonka ELF-primaami tuottaa.",
    pharmaPoints: [
      { drug: "Gabapentiini (Neurontin)", mechanism: "Sitoutuu α2δ-1:een → estää α2δ-1:n kuljetuksen DRG:stä selkäytimen presynaptisiin terminaaleihin → kääntää sentraalisen sensitisaation", note: "Ensisijainen hoito neuropaattiseen kipuun ja fibromyalgiaan" },
      { drug: "Pregabaliini (Lyrica)", mechanism: "Sama α2δ-1-sitoutumismekanismi kuin gabapentiinillä; suurempi teho ja ennustettavampi farmakokinetiikka", note: "Ensimmäinen FDA-hyväksytty lääke fibromyalgiaan (2007)" },
    ],
    pharmaConclusion: "Gabapentinoidien reseptit ovat kasvaneet dramaattisesti viimeisten kahden vuosikymmenen aikana. Tämä kasvu ON KONSISTENTTI ELF-primaamin kanssa: kun sähköverkon tiheys ja jatkuva altistus kasvavat, yhä useampi kehittää α2δ-1-välitteisen kiputilan johon gabapentinoidit spesifisesti kohdistuvat.",

    epigenTitle: "Epigeneettinen vahvistus",
    epigenLead: "α2δ-1-ekspressiota säätelevät epigeneettiset mekanismit — luoden sillan VK27:ään.",
    epigenBody: "HDAC-inhibiittorit kasvattavat α2δ-1-ekspressiota ja tuottavat kiputiloja ([[ref:a2d1_epigen|PMC8514986]]). ELF-EMF muuttaa HDAC-aktiivisuutta (VK27). Tämä luo kaksoismekanismin: ELF suoraan säätelee α2δ-1:tä ylös VGCC-ekspression kautta JA epäsuorasti HDAC-välitteisen epigeneettisen säätelyn kautta. Epigeneettinen komponentti tarkoittaa, että kiputila voi jatkua jopa EMF-altistuksen vähentyessä.",

    loopTitle: "Takaisinkytkentäsilmukka S16: Kipu-uni-kortisoli-kierre",
    loopSteps: [
      "EMF → α2δ-1↑ → sentraalinen sensitisaatio → krooninen kipu",
      "Krooninen kipu → unihäiriö (Walkerin ketju S4)",
      "Uni↓ → kortisoli↑ (HPA-akseli S7) + GABA↓",
      "Kortisoli↑ → tulehdus → lisää sensitisaatiota",
      "Krooninen kipu → masennus (DA↓, VK19)",
      "Masennus → uni↓ → kivun vahvistuminen → ...",
    ],
    loopConclusion: "Kipu-uni-kortisoli-kierre tarkoittaa, että alkuperäinen ELF-indusoitu α2δ-1-ylössäätely luo itseään ylläpitävän kiputilan. Väliaikainenkin EMF-altistus voi käynnistää kroonisen tilan joka jatkuu takaisinkytkentäsilmukan kautta.",

    predictionText: "Ennuste E-NEW-14: ELF-altistetuilla eläimillä on α2δ-1-ylössäätely DRG:ssä ja selkäytimen dorsaalisarvessa ILMAN hermovauriota, sekä kipukäyttäytymistä.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "慢性疼痛の流行：ELFプライミング仮説",
    subtitle: "ELFプライミング（50/60 Hz 電力網、連続曝露）はα2δ-1発現を上方制御する — 神経障害性疼痛で過剰発現するのと同じサブユニット。これにより「神経障害なしの神経障害性状態」が生じる：中枢性感作、アロディニア、電力網曝露のみによる広範な疼痛。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページでは、慢性疼痛の流行のメカニズムとしてELFプライミングを提案しています。α2δ-1過剰発現→疼痛経路は神経障害性疼痛研究で確立されています。新規主張 — ELFが神経損傷なしに同じα2δ-1上方制御を達成する — は直接的な実験的検証を必要とします（予測 E-NEW-14）。",

    mechTitle: "メカニズム",
    mechLead: "α2δ-1はVGCCの補助サブユニットである。その過剰発現は神経障害性疼痛の主要メカニズムである。ELFプライミングはVGCC発現を上方制御する — α2δ-1を含めて。",
    mechSteps: [
      { step: "1. ELF 50/60 Hz（電力網、連続曝露）", detail: "電力網からの50/60 Hz背景電磁場は連続的かつ遍在的である。Sun 2016（Scientific Reports）は、8〜10日間のELF曝露がVGCC発現を劇的に増加させることを示した — 補助サブユニットを含めて。" },
      { step: "2. DRGおよび脊髄後角でα2δ-1発現↑", detail: "後根神経節と脊髄後角ニューロンにおけるα2δ-1上方制御は、神経障害性疼痛の主要メカニズムである。トランスジェニックマウスでは、α2δ-1過剰発現のみで神経損傷なしに疼痛行動が生じる（[[ref:a2d1_pain|PMID:16764990]]）。" },
      { step: "3. 中枢性感作 → アロディニア", detail: "α2δ-1の上昇は、脊髄疼痛回路における興奮性シナプス形成と神経伝達物質放出を増加させる。これにより中枢性感作が生じる — 神経系が疼痛信号を増幅する。通常無害な刺激（触覚、圧力）が痛みとなる（アロディニア）。" },
      { step: "4. 特定可能な原因のない慢性広範疼痛", detail: "結果：線維筋痛症、慢性広範疼痛、慢性腰痛 — 患者に真の痛みがあるが特定可能な神経損傷がない状態。損傷は機能的（α2δ-1↑ → 中枢性感作）であり、構造的ではない。" },
    ],

    pharmaTitle: "薬理学的検証",
    pharmaLead: "この疼痛を治療する薬剤は、ELFプライミングが産生するメカニズムを正確に標的とする。",
    pharmaPoints: [
      { drug: "Gabapentin (Neurontin)", mechanism: "α2δ-1に結合 → DRGから脊髄シナプス前終末へのα2δ-1輸送を阻害 → 中枢性感作を逆転させる", note: "神経障害性疼痛および線維筋痛症の第一選択薬" },
      { drug: "Pregabalin (Lyrica)", mechanism: "Gabapentinと同じα2δ-1結合メカニズム；より高い効力と予測可能な薬物動態", note: "線維筋痛症に対する初のFDA承認薬（2007年）" },
    ],
    pharmaConclusion: "ガバペンチノイドの処方は過去20年間で劇的に増加している。この増加はELFプライミングと一致する：電力網密度と連続曝露が増加するにつれ、ガバペンチノイドが特異的に治療するα2δ-1媒介性疼痛状態を発症する人が増加する。",

    epigenTitle: "エピジェネティック増幅",
    epigenLead: "α2δ-1発現はエピジェネティックメカニズムによって制御されている — VK27への橋渡しとなる。",
    epigenBody: "HDAC阻害剤はα2δ-1発現を増加させ疼痛状態を生じさせる（[[ref:a2d1_epigen|PMC8514986]]）。ELF-EMFはHDAC活性を変化させる（VK27）。これにより二重メカニズムが生じる：ELFはVGCC発現を介してα2δ-1を直接上方制御し、かつHDAC媒介エピジェネティック制御を介して間接的にも上方制御する。エピジェネティック要素は、EMF曝露が減少しても疼痛状態が持続し得ることを意味する。",

    loopTitle: "フィードバックループ S16：疼痛-睡眠-コルチゾール循環",
    loopSteps: [
      "EMF → α2δ-1↑ → 中枢性感作 → 慢性疼痛",
      "慢性疼痛 → 睡眠障害（Walkerチェーン S4）",
      "睡眠↓ → コルチゾール↑（HPA軸 S7）+ GABA↓",
      "コルチゾール↑ → 炎症 → さらなる感作",
      "慢性疼痛 → うつ病（DA↓、VK19）",
      "うつ病 → 睡眠↓ → 疼痛増幅 → ...",
    ],
    loopConclusion: "疼痛-睡眠-コルチゾール循環は、初期のELF誘発α2δ-1上方制御が自己持続的な疼痛状態を生み出すことを意味する。一時的なEMF曝露でさえ、フィードバックループを通じて持続する慢性状態を開始し得る。",

    predictionText: "予測 E-NEW-14：ELF曝露動物は、神経損傷なしにDRGおよび脊髄後角でα2δ-1上方制御を示し、疼痛様行動を伴う。",
    predictionLink: "最終層予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "L'épidémie de douleur chronique : l'hypothèse de l'amorçage ELF",
    subtitle: "L'amorçage ELF (réseau électrique 50/60 Hz, continu) régule à la hausse l'expression de α2δ-1 — la même sous-unité surexprimée dans la douleur neuropathique. Cela crée un « état neuropathique SANS neuropathie » : sensibilisation centrale, allodynie et douleur généralisée par la seule exposition au réseau électrique.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page propose l'amorçage ELF comme mécanisme de l'épidémie de douleur chronique. La voie surexpression de α2δ-1 → douleur est bien établie dans la recherche sur la douleur neuropathique. L'affirmation nouvelle — que l'ELF atteint la même régulation à la hausse de α2δ-1 sans lésion nerveuse — nécessite des tests expérimentaux directs (prédiction E-NEW-14).",

    mechTitle: "Le mécanisme",
    mechLead: "α2δ-1 est une sous-unité auxiliaire des VGCC. Sa surexpression est le mécanisme principal de la douleur neuropathique. L'amorçage ELF régule à la hausse l'expression des VGCC — y compris α2δ-1.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (réseau électrique, exposition continue)", detail: "Le champ électromagnétique de fond à 50/60 Hz du réseau électrique est continu et omniprésent. [[ref:sun2016_elf_vgcc|Sun 2016 (Scientific Reports)]] a montré que 8 à 10 jours d'exposition ELF augmentent considérablement l'expression des VGCC — y compris les sous-unités auxiliaires." },
      { step: "2. Expression de α2δ-1↑ dans les DRG et la corne dorsale de la moelle épinière", detail: "La régulation à la hausse de α2δ-1 dans les ganglions de la racine dorsale et les neurones de la corne dorsale de la moelle épinière EST le mécanisme principal de la douleur neuropathique. Chez les souris transgéniques, la surexpression de α2δ-1 seule produit un comportement douloureux SANS lésion nerveuse ([[ref:a2d1_pain|PMID:16764990]])." },
      { step: "3. Sensibilisation centrale → allodynie", detail: "L'élévation de α2δ-1 augmente la synaptogenèse excitatrice et la libération de neurotransmetteurs dans les circuits de la douleur spinale. Cela produit une sensibilisation centrale — le système nerveux amplifie les signaux de douleur. Des stimuli normalement inoffensifs (toucher, pression) deviennent douloureux (allodynie)." },
      { step: "4. Douleur chronique généralisée SANS cause identifiable", detail: "Le résultat : fibromyalgie, douleur chronique généralisée, lombalgie chronique — des conditions où les patients ressentent une douleur réelle mais sans lésion nerveuse identifiable. Les dommages sont fonctionnels (α2δ-1↑ → sensibilisation centrale), non structurels." },
    ],

    pharmaTitle: "Validation pharmacologique",
    pharmaLead: "Les médicaments qui traitent cette douleur ciblent EXACTEMENT le mécanisme que l'amorçage ELF produit.",
    pharmaPoints: [
      { drug: "Gabapentin (Neurontin)", mechanism: "Se lie à α2δ-1 → bloque le trafic de α2δ-1 des DRG vers les terminaux présynaptiques spinaux → inverse la sensibilisation centrale", note: "Traitement de première intention pour la douleur neuropathique et la fibromyalgie" },
      { drug: "Pregabalin (Lyrica)", mechanism: "Même mécanisme de liaison à α2δ-1 que la gabapentine ; puissance plus élevée et pharmacocinétique plus prévisible", note: "Premier médicament approuvé par la FDA pour la fibromyalgie (2007)" },
    ],
    pharmaConclusion: "Les prescriptions de gabapentinoïdes ont augmenté de manière spectaculaire au cours des deux dernières décennies. Cette augmentation est COHÉRENTE avec l'amorçage ELF : à mesure que la densité du réseau électrique et l'exposition continue augmentent, davantage de personnes développent l'état douloureux médié par α2δ-1 que les gabapentinoïdes traitent spécifiquement.",

    epigenTitle: "Amplification épigénétique",
    epigenLead: "L'expression de α2δ-1 est régulée par des mécanismes épigénétiques — créant un pont vers VK27.",
    epigenBody: "Les inhibiteurs d'HDAC augmentent l'expression de α2δ-1 et produisent des états douloureux ([[ref:a2d1_epigen|PMC8514986]]). L'ELF-EMF modifie l'activité HDAC (VK27). Cela crée un double mécanisme : l'ELF régule directement α2δ-1 à la hausse via l'expression des VGCC ET indirectement via la régulation épigénétique médiée par HDAC. La composante épigénétique signifie que l'état douloureux peut persister même après la réduction de l'exposition aux EMF.",

    loopTitle: "Boucle de rétroaction S16 : cycle douleur-sommeil-cortisol",
    loopSteps: [
      "EMF → α2δ-1↑ → sensibilisation centrale → douleur chronique",
      "Douleur chronique → perturbation du sommeil (chaîne de Walker S4)",
      "Sommeil↓ → cortisol↑ (axe HPA S7) + GABA↓",
      "Cortisol↑ → inflammation → davantage de sensibilisation",
      "Douleur chronique → dépression (DA↓, VK19)",
      "Dépression → sommeil↓ → amplification de la douleur → ...",
    ],
    loopConclusion: "Le cycle douleur-sommeil-cortisol signifie que la régulation initiale à la hausse de α2δ-1 induite par l'ELF crée un état douloureux auto-entretenu. Même une exposition temporaire aux EMF peut initier une condition chronique qui persiste par la boucle de rétroaction.",

    predictionText: "Prédiction E-NEW-14 : les animaux exposés à l'ELF présentent une régulation à la hausse de α2δ-1 dans les DRG et la corne dorsale de la moelle épinière SANS lésion nerveuse, accompagnée d'un comportement de type douloureux.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "만성 통증 유행: ELF 프라이밍 가설",
    subtitle: "ELF 프라이밍(50/60 Hz 전력망, 지속적)은 α2δ-1 발현을 상향 조절한다 — 신경병증성 통증에서 과발현되는 동일한 서브유닛. 이는 '신경병증 없는 신경병증적 상태'를 생성한다: 중추 감작, 이질통, 전력망 노출만으로 인한 광범위한 통증.",
    backLink: "← 근거로 돌아가기",
    cautionText: "이 페이지는 만성 통증 유행의 메커니즘으로 ELF 프라이밍을 제안합니다. α2δ-1 과발현 → 통증 경로는 신경병증성 통증 연구에서 확립되어 있습니다. 새로운 주장 — ELF가 신경 손상 없이 동일한 α2δ-1 상향 조절을 달성한다는 것 — 은 직접적인 실험적 검증을 필요로 합니다(예측 E-NEW-14).",

    mechTitle: "메커니즘",
    mechLead: "α2δ-1은 VGCC의 보조 서브유닛이다. 그 과발현은 신경병증성 통증의 주요 메커니즘이다. ELF 프라이밍은 VGCC 발현을 상향 조절한다 — α2δ-1을 포함하여.",
    mechSteps: [
      { step: "1. ELF 50/60 Hz (전력망, 지속적 노출)", detail: "전력망의 50/60 Hz 배경 전자기장은 지속적이고 편재적이다. [[ref:sun2016_elf_vgcc|Sun 2016 (Scientific Reports)]]은 8-10일간의 ELF 노출이 VGCC 발현을 극적으로 증가시킴을 보여주었다 — 보조 서브유닛을 포함하여." },
      { step: "2. DRG 및 척수 후각에서 α2δ-1 발현↑", detail: "후근 신경절과 척수 후각 뉴런에서의 α2δ-1 상향 조절은 신경병증성 통증의 주요 메커니즘이다. 형질전환 마우스에서 α2δ-1 과발현만으로 신경 손상 없이 통증 행동이 나타난다([[ref:a2d1_pain|PMID:16764990]])." },
      { step: "3. 중추 감작 → 이질통", detail: "α2δ-1의 상승은 척수 통증 회로에서 흥분성 시냅스 형성과 신경전달물질 방출을 증가시킨다. 이는 중추 감작을 생성한다 — 신경계가 통증 신호를 증폭한다. 일반적으로 무해한 자극(촉각, 압력)이 통증이 된다(이질통)." },
      { step: "4. 식별 가능한 원인 없는 만성 광범위 통증", detail: "결과: 섬유근육통, 만성 광범위 통증, 만성 요통 — 환자에게 실제 통증이 있지만 식별 가능한 신경 손상이 없는 상태. 손상은 기능적(α2δ-1↑ → 중추 감작)이며 구조적이 아니다." },
    ],

    pharmaTitle: "약리학적 검증",
    pharmaLead: "이 통증을 치료하는 약물은 ELF 프라이밍이 생성하는 메커니즘을 정확히 표적으로 한다.",
    pharmaPoints: [
      { drug: "Gabapentin (Neurontin)", mechanism: "α2δ-1에 결합 → DRG에서 척수 시냅스전 말단으로의 α2δ-1 수송을 차단 → 중추 감작을 역전시킨다", note: "신경병증성 통증 및 섬유근육통의 1차 치료제" },
      { drug: "Pregabalin (Lyrica)", mechanism: "Gabapentin과 동일한 α2δ-1 결합 메커니즘; 더 높은 효능과 예측 가능한 약동학", note: "섬유근육통에 대한 최초의 FDA 승인 약물(2007)" },
    ],
    pharmaConclusion: "가바펜티노이드 처방은 지난 20년간 극적으로 증가했다. 이 증가는 ELF 프라이밍과 일치한다: 전력망 밀도와 지속적 노출이 증가함에 따라, 가바펜티노이드가 특이적으로 치료하는 α2δ-1 매개 통증 상태를 발생시키는 사람이 더 많아진다.",

    epigenTitle: "후성유전적 증폭",
    epigenLead: "α2δ-1 발현은 후성유전적 메커니즘에 의해 조절된다 — VK27로의 다리를 생성한다.",
    epigenBody: "HDAC 억제제는 α2δ-1 발현을 증가시키고 통증 상태를 생성한다([[ref:a2d1_epigen|PMC8514986]]). ELF-EMF는 HDAC 활성을 변화시킨다(VK27). 이는 이중 메커니즘을 생성한다: ELF는 VGCC 발현을 통해 α2δ-1을 직접 상향 조절하고, HDAC 매개 후성유전적 조절을 통해 간접적으로도 상향 조절한다. 후성유전적 요소는 EMF 노출이 감소한 후에도 통증 상태가 지속될 수 있음을 의미한다.",

    loopTitle: "피드백 루프 S16: 통증-수면-코르티솔 순환",
    loopSteps: [
      "EMF → α2δ-1↑ → 중추 감작 → 만성 통증",
      "만성 통증 → 수면 장애(Walker 체인 S4)",
      "수면↓ → 코르티솔↑(HPA 축 S7) + GABA↓",
      "코르티솔↑ → 염증 → 추가 감작",
      "만성 통증 → 우울증(DA↓, VK19)",
      "우울증 → 수면↓ → 통증 증폭 → ...",
    ],
    loopConclusion: "통증-수면-코르티솔 순환은 초기 ELF 유발 α2δ-1 상향 조절이 자기 유지적 통증 상태를 생성함을 의미한다. 일시적 EMF 노출조차도 피드백 루프를 통해 지속되는 만성 상태를 개시할 수 있다.",

    predictionText: "예측 E-NEW-14: ELF 노출 동물은 신경 손상 없이 DRG 및 척수 후각에서 α2δ-1 상향 조절을 보이며, 통증 유사 행동을 동반한다.",
    predictionLink: "최종 층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ChronicPainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-3">
          {d.mechSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={s.detail} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-3">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.drug}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.pharmaConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epigenTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-3xl">{d.epigenLead}</p>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl"><InlineReferenceText text={d.epigenBody} locale={locale} /></p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.loopTitle}</h2>
        <div className="space-y-1.5 mb-4">
          {d.loopSteps.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{s}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.loopConclusion}</p>
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
