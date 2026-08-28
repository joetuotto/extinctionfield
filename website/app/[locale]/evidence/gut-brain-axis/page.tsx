import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Gut-Brain Axis: The Second Barrier Falls",
    subtitle: "Circadian disruption attacks the intestinal barrier via Per2 → tight junction degradation → LPS enters bloodstream → neuroinflammation. The gut barrier uses the same molecular toolkit as the blood-brain barrier — melatonin loss opens both simultaneously.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents the gut-brain axis as a newly verified BERM pathway (VK24). The individual links are independently verified; the complete EMF → gut → brain chain as a single integrated mechanism requires further testing.",

    pathTitle: "The pathway",
    pathLead: "The gut-brain axis connects circadian clock function to intestinal barrier integrity to brain inflammation through a continuous molecular chain.",
    pathSteps: [
      { step: "1. EMF → melatonin↓", detail: "EMF suppresses melatonin via pineal effects and CRY magnetoreception. Melatonin normally protects tight junction proteins in both BBB and gut epithelium." },
      { step: "2. Melatonin↓ → Per2↓ in gut", detail: "Melatonin entrains peripheral circadian clocks including gut Per2. Per2 controls expression of tight junction proteins ZO-1, occludin, and claudins in intestinal epithelial cells." },
      { step: "3. Per2↓ → gut barrier↓", detail: "Per2 knockout in gut epithelium causes tight junction degradation. The same tight junction proteins (ZO-1, occludin, claudins) that maintain the blood-brain barrier also maintain the gut barrier." },
      { step: "4. Gut barrier↓ → LPS enters blood", detail: "Compromised gut barrier allows lipopolysaccharide (LPS) from gram-negative bacteria to enter the bloodstream. Circadian disruption also shifts microbiome composition: Ruminococcus torques↑, Lactobacillus↓, LPS-synthesis genes↑." },
      { step: "5. LPS → neuroinflammation", detail: "Serum LPS triggers systemic inflammation → crosses compromised BBB → activates microglia → neuroinflammation. This reduces hippocampal neurogenesis and contributes to depression." },
      { step: "6. Depression → HPA → more disruption", detail: "Neuroinflammation activates HPA axis → cortisol↑ → more sleep disruption → more melatonin↓. The loop feeds back: initial circadian disruption creates conditions for progressive worsening." },
    ],

    dualTitle: "Dual barrier principle",
    dualLead: "The BBB and gut epithelial barrier are constructed from the same molecular toolkit. What opens one, opens the other.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "Scaffolding protein linking transmembrane proteins to cytoskeleton; present in BOTH BBB endothelium and gut epithelium" },
      { protein: "Occludin", role: "Transmembrane tight junction protein; melatonin↓ reduces expression in both barriers; EMF directly reduces occludin in BBB ([[ref:bbb_emf_2026|PMC12829706]])" },
      { protein: "Claudins (family)", role: "Paracellular permeability regulators; tissue-specific isoforms but shared regulatory mechanisms; Per2-dependent expression in gut" },
    ],
    dualConclusion: "Melatonin is the shared protector of both barriers. EMF→melatonin↓ creates simultaneous dual vulnerability: heavy metals enter the brain (BBB↓) while bacterial endotoxin enters the bloodstream (gut barrier↓). This is not two effects — it is one mechanism attacking two barriers.",

    microbiomeTitle: "Microbiome disruption",
    microbiomeLead: "Circadian disruption doesn't just weaken the physical barrier — it also changes what's behind it.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "Mucin-degrading bacterium that further weakens gut barrier from the luminal side" },
      { change: "Lactobacillus↓", impact: "Protective commensal that maintains barrier integrity and produces short-chain fatty acids" },
      { change: "LPS-synthesis genes↑", impact: "Microbiome shifts toward gram-negative bacteria with increased endotoxin production" },
    ],

    evidenceTitle: "Key evidence",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", referenceId: "gut_per2_2026", finding: "Per2 KO in gut epithelium → barrier disruption → LPS → hippocampal neurogenesis↓ → depression-like behavior" },
      { ref: "PMC5909328 (2018)", referenceId: "gut_circadian_2018", finding: "Circadian disruption alters gut microbiome composition with increased LPS-synthesis capacity" },
      { ref: "biorxiv 2025", referenceId: "gut_light_2025", finding: "Continuous light exposure disrupts gut epithelial barrier in male mice via apoptosis-inflammation-oxidative stress" },
    ],

    predictionText: "The gut-brain axis generates predictions E-NEW-5 (gut Per2 correlates with EMF exposure) and E-NEW-8 (gut permeability markers correlate with EMF exposure in occupational cohorts).",
    predictionLink: "See supplementary layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Suolisto-aivo-akseli: Toinen este murtuu",
    subtitle: "Sirkadiaaninen häiriö hyökkää suoliston estettä vastaan Per2 → tiiviin liitoksen hajoaminen → LPS pääsee verenkiertoon → neurotulehdus. Suoliston este käyttää samaa molekulaarista työkalupakkia kuin veri-aivoeste — melatoniinin menetys avaa molemmat samanaikaisesti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu dokumentoi suolisto-aivo-akselin vastikään verifioituna BERM-reittinä (VK24). Yksittäiset linkit on verifioitu itsenäisesti; täydellinen EMF → suolisto → aivot -ketju yhtenä integroituna mekanismina vaatii lisätestausta.",

    pathTitle: "Reitti",
    pathLead: "Suolisto-aivo-akseli yhdistää sirkadiaanisen kellon toiminnan suoliston esterakenteen ylläpitoon ja aivojen tulehdukseen jatkuvan molekulaarisen ketjun kautta.",
    pathSteps: [
      { step: "1. EMF → melatoniini↓", detail: "EMF suppressoi melatoniinia pineaalivaikutusten ja CRY-magnetoreseption kautta. Melatoniini normaalisti suojaa tiiviin liitoksen proteiineja sekä BBB:ssä että suoliston epitheelissä." },
      { step: "2. Melatoniini↓ → Per2↓ suolistossa", detail: "Melatoniini synkronoi perifeerisiä sirkadiaanisia kelloja mukaan lukien suoliston Per2:n. Per2 kontrolloi ZO-1:n, okludiinin ja klaudiinien ekspressiota suoliston epitheelisoluissa." },
      { step: "3. Per2↓ → suoliston este↓", detail: "Per2-poistogeeni suoliston epitheelissä aiheuttaa tiiviin liitoksen hajoamisen. Samat tiiviin liitoksen proteiinit (ZO-1, okludiini, klaudiinit) jotka ylläpitävät veri-aivoestettä ylläpitävät myös suoliston estettä." },
      { step: "4. Suoliston este↓ → LPS verenkiertoon", detail: "Heikentynyt suoliston este sallii lipopolysakkaridien (LPS) pääsyn gramnegatiivisista bakteereista verenkiertoon. Sirkadiaanihäiriö myös muuttaa mikrobiomin koostumusta: Ruminococcus torques↑, Lactobacillus↓, LPS-synteesigeenit↑." },
      { step: "5. LPS → neurotulehdus", detail: "Seerumin LPS laukaisee systeemisen tulehduksen → ylittää heikentyneen BBB:n → aktivoi mikroglian → neurotulehdus. Tämä vähentää hippokampaalista neurogeneesiä ja myötävaikuttaa masennukseen." },
      { step: "6. Masennus → HPA → lisää häiriöitä", detail: "Neurotulehdus aktivoi HPA-akselin → kortisoli↑ → lisää unihäiriöitä → lisää melatoniini↓. Silmukka palautuu: alkuperäinen sirkadiaanihäiriö luo olosuhteet progressiiviselle pahenemiselle." },
    ],

    dualTitle: "Kaksoisestemekanismi",
    dualLead: "BBB ja suoliston epitheelinen este on rakennettu samasta molekulaarisesta työkalupakista. Mikä avaa toisen, avaa toisenkin.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "Tukirankaproteiini joka yhdistää transmembraaniproteiinit solutukirankaan; läsnä SEKÄ BBB:n endotheelissä ETTÄ suoliston epitheelissä" },
      { protein: "Okludiini", role: "Transmembraaninen tiiviin liitoksen proteiini; melatoniini↓ vähentää ekspressiota molemmissa esteissä; EMF vähentää suoraan okludiinia BBB:ssä ([[ref:bbb_emf_2026|PMC12829706]])" },
      { protein: "Klaudiinit (perhe)", role: "Parasellulaarisen läpäisevyyden säätelijät; kudosspesifiset isoformit mutta jaetut säätelymekanismit; Per2-riippuvainen ekspressio suolistossa" },
    ],
    dualConclusion: "Melatoniini on molempien esteiden jaettu suojaaja. EMF→melatoniini↓ luo samanaikaisen kaksoishaavottuvuuden: raskasmetallit pääsevät aivoihin (BBB↓) samalla kun bakteeriendotoksiini pääsee verenkiertoon (suoliston este↓). Tämä ei ole kaksi vaikutusta — se on yksi mekanismi joka hyökkää kahta estettä vastaan.",

    microbiomeTitle: "Mikrobiomin häiriö",
    microbiomeLead: "Sirkadiaanihäiriö ei pelkästään heikennä fyysistä estettä — se myös muuttaa mitä sen takana on.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "Musiinia hajottava bakteeri joka edelleen heikentää suoliston estettä luminaaliselta puolelta" },
      { change: "Lactobacillus↓", impact: "Suojaava kommensiaalikakteeri joka ylläpitää esterakennetta ja tuottaa lyhytketjuisia rasvahappoja" },
      { change: "LPS-synteesigeenit↑", impact: "Mikrobiomi siirtyy kohti gramnegatiivisia bakteereja lisääntyneellä endotoksiinituotannolla" },
    ],

    evidenceTitle: "Keskeiset todisteet",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", referenceId: "gut_per2_2026", finding: "Per2 KO suoliston epitheelissä → esterakennteen häiriö → LPS → hippokampaalinen neurogeneesi↓ → masennuskäyttäytyminen" },
      { ref: "PMC5909328 (2018)", referenceId: "gut_circadian_2018", finding: "Sirkadiaanihäiriö muuttaa suolistomikrobiomin koostumusta lisääntyneellä LPS-synteesikapasiteetilla" },
      { ref: "biorxiv 2025", referenceId: "gut_light_2025", finding: "Jatkuva valoaltistus häiritsee suoliston epitheelisen esteen urospuolisissa hiirissä apoptoosin-tulehduksen-oksidatiivisen stressin kaskadin kautta" },
    ],

    predictionText: "Suolisto-aivo-akseli tuottaa ennusteet E-NEW-5 (suoliston Per2 korreloi EMF-altistuksen kanssa) ja E-NEW-8 (suoliston läpäisevyysmarkkerit korreloivat EMF-altistuksen kanssa ammatillisissa kohorteissa).",
    predictionLink: "Ks. täydennyskerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "腸脳軸：第二の障壁が崩壊する",
    subtitle: "概日リズム障害はPer2 → タイトジャンクション分解 → LPSが血流に侵入 → 神経炎症を通じて腸管バリアを攻撃する。腸管バリアは血液脳関門と同じ分子ツールキットを使用する — メラトニン喪失は両方を同時に開放する。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページは腸脳軸を新たに検証されたBERM経路（VK24）として記録する。個々のリンクは独立に検証されている。完全なEMF → 腸 → 脳の連鎖を単一の統合メカニズムとするにはさらなる検証が必要である。",

    pathTitle: "経路",
    pathLead: "腸脳軸は概日時計機能を腸管バリアの完全性を介して脳の炎症に連続的な分子連鎖でつなぐ。",
    pathSteps: [
      { step: "1. EMF → メラトニン↓", detail: "EMFは松果体への影響とCRY磁気受容を介してメラトニンを抑制する。メラトニンは通常、BBBと腸上皮の両方でタイトジャンクションタンパク質を保護する。" },
      { step: "2. メラトニン↓ → 腸内Per2↓", detail: "メラトニンは腸のPer2を含む末梢概日時計を同調させる。Per2は腸上皮細胞のZO-1、オクルディン、クローディンの発現を制御する。" },
      { step: "3. Per2↓ → 腸管バリア↓", detail: "腸上皮のPer2ノックアウトはタイトジャンクション分解を引き起こす。血液脳関門を維持するのと同じタイトジャンクションタンパク質（ZO-1、オクルディン、クローディン）が腸管バリアも維持する。" },
      { step: "4. 腸管バリア↓ → LPSが血中に", detail: "障害された腸管バリアにより、グラム陰性菌のリポ多糖（LPS）が血流に侵入する。概日リズム障害はマイクロバイオームの組成も変化させる：Ruminococcus torques↑、Lactobacillus↓、LPS合成遺伝子↑。" },
      { step: "5. LPS → 神経炎症", detail: "血清LPSが全身性炎症を引き起こす → 障害されたBBBを通過 → ミクログリアを活性化 → 神経炎症。これは海馬の神経新生を減少させ、うつ病に寄与する。" },
      { step: "6. うつ病 → HPA → さらなる障害", detail: "神経炎症がHPA軸を活性化 → コルチゾール↑ → さらなる睡眠障害 → さらなるメラトニン↓。ループはフィードバックする：初期の概日リズム障害が進行性悪化の条件を作り出す。" },
    ],

    dualTitle: "二重バリア原理",
    dualLead: "BBBと腸上皮バリアは同じ分子ツールキットで構築されている。一方を開くものは、もう一方も開く。",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "膜貫通タンパク質を細胞骨格に連結する足場タンパク質；BBB内皮と腸上皮の両方に存在" },
      { protein: "オクルディン", role: "膜貫通タイトジャンクションタンパク質；メラトニン↓は両方のバリアで発現を減少させる；EMFはBBBのオクルディンを直接減少させる（[[ref:bbb_emf_2026|PMC12829706]]）" },
      { protein: "クローディン（ファミリー）", role: "傍細胞透過性調節因子；組織特異的アイソフォームを持つが共通の制御メカニズム；腸ではPer2依存性発現" },
    ],
    dualConclusion: "メラトニンは両方のバリアの共通の保護者である。EMF→メラトニン↓は同時の二重脆弱性を生む：重金属が脳に侵入し（BBB↓）、同時に細菌エンドトキシンが血流に侵入する（腸管バリア↓）。これは二つの効果ではない — 二つのバリアを攻撃する一つのメカニズムである。",

    microbiomeTitle: "マイクロバイオームの撹乱",
    microbiomeLead: "概日リズム障害は物理的バリアを弱めるだけでなく、その背後にあるものも変える。",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "ムチン分解細菌で、管腔側から腸管バリアをさらに弱める" },
      { change: "Lactobacillus↓", impact: "バリア完全性を維持し短鎖脂肪酸を産生する保護的常在菌" },
      { change: "LPS合成遺伝子↑", impact: "マイクロバイオームがエンドトキシン産生の増加したグラム陰性菌へシフト" },
    ],

    evidenceTitle: "主要なエビデンス",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", referenceId: "gut_per2_2026", finding: "腸上皮のPer2 KO → バリア障害 → LPS → 海馬神経新生↓ → うつ様行動" },
      { ref: "PMC5909328 (2018)", referenceId: "gut_circadian_2018", finding: "概日リズム障害がLPS合成能力の増加を伴う腸内マイクロバイオームの組成を変化させる" },
      { ref: "biorxiv 2025", referenceId: "gut_light_2025", finding: "持続的光曝露がアポトーシス-炎症-酸化ストレスカスケードを介して雄マウスの腸上皮バリアを障害する" },
    ],

    predictionText: "腸脳軸は予測E-NEW-5（腸のPer2がEMF曝露と相関する）とE-NEW-8（腸管透過性マーカーが職業コホートのEMF曝露と相関する）を生成する。",
    predictionLink: "補足レイヤー予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Axe intestin-cerveau : la deuxième barrière tombe",
    subtitle: "La perturbation circadienne attaque la barrière intestinale via Per2 → dégradation des jonctions serrées → le LPS entre dans le sang → neuroinflammation. La barrière intestinale utilise le même kit moléculaire que la barrière hémato-encéphalique — la perte de mélatonine ouvre les deux simultanément.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page documente l'axe intestin-cerveau comme voie BERM nouvellement vérifiée (VK24). Les liens individuels sont vérifiés indépendamment ; la chaîne complète CEM → intestin → cerveau en tant que mécanisme intégré unique nécessite des tests supplémentaires.",

    pathTitle: "La voie",
    pathLead: "L'axe intestin-cerveau connecte la fonction de l'horloge circadienne à l'intégrité de la barrière intestinale et à l'inflammation cérébrale par une chaîne moléculaire continue.",
    pathSteps: [
      { step: "1. CEM → mélatonine↓", detail: "Les CEM suppriment la mélatonine via les effets pinéaux et la magnétoréception CRY. La mélatonine protège normalement les protéines de jonctions serrées dans la BHE et l'épithélium intestinal." },
      { step: "2. Mélatonine↓ → Per2↓ dans l'intestin", detail: "La mélatonine synchronise les horloges circadiennes périphériques dont Per2 intestinal. Per2 contrôle l'expression de ZO-1, occludine et claudines dans les cellules épithéliales intestinales." },
      { step: "3. Per2↓ → barrière intestinale↓", detail: "L'invalidation de Per2 dans l'épithélium intestinal cause la dégradation des jonctions serrées. Les mêmes protéines de jonctions serrées (ZO-1, occludine, claudines) maintiennent à la fois la BHE et la barrière intestinale." },
      { step: "4. Barrière intestinale↓ → LPS dans le sang", detail: "La barrière intestinale compromise permet au lipopolysaccharide (LPS) des bactéries gram-négatives d'entrer dans la circulation. La perturbation circadienne modifie aussi la composition du microbiome : Ruminococcus torques↑, Lactobacillus↓, gènes de synthèse du LPS↑." },
      { step: "5. LPS → neuroinflammation", detail: "Le LPS sérique déclenche une inflammation systémique → traverse la BHE compromise → active la microglie → neuroinflammation. Cela réduit la neurogenèse hippocampique et contribue à la dépression." },
      { step: "6. Dépression → HPA → plus de perturbation", detail: "La neuroinflammation active l'axe HPA → cortisol↑ → plus de perturbation du sommeil → plus de mélatonine↓. La boucle rétroagit : la perturbation circadienne initiale crée les conditions d'une aggravation progressive." },
    ],

    dualTitle: "Principe de double barrière",
    dualLead: "La BHE et la barrière épithéliale intestinale sont construites avec le même kit moléculaire. Ce qui ouvre l'une ouvre l'autre.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "Protéine d'échafaudage reliant les protéines transmembranaires au cytosquelette ; présente DANS l'endothélium de la BHE ET dans l'épithélium intestinal" },
      { protein: "Occludine", role: "Protéine transmembranaire de jonction serrée ; mélatonine↓ réduit l'expression dans les deux barrières ; les CEM réduisent directement l'occludine dans la BHE ([[ref:bbb_emf_2026|PMC12829706]])" },
      { protein: "Claudines (famille)", role: "Régulateurs de la perméabilité paracellulaire ; isoformes tissulaires spécifiques mais mécanismes de régulation partagés ; expression Per2-dépendante dans l'intestin" },
    ],
    dualConclusion: "La mélatonine est le protecteur commun des deux barrières. CEM→mélatonine↓ crée une double vulnérabilité simultanée : les métaux lourds entrent dans le cerveau (BHE↓) tandis que l'endotoxine bactérienne entre dans le sang (barrière intestinale↓). Ce n'est pas deux effets — c'est un seul mécanisme attaquant deux barrières.",

    microbiomeTitle: "Perturbation du microbiome",
    microbiomeLead: "La perturbation circadienne n'affaiblit pas seulement la barrière physique — elle change aussi ce qui se trouve derrière.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "Bactérie dégradant la mucine qui affaiblit davantage la barrière intestinale du côté luminal" },
      { change: "Lactobacillus↓", impact: "Commensal protecteur maintenant l'intégrité de la barrière et produisant des acides gras à chaîne courte" },
      { change: "Gènes de synthèse du LPS↑", impact: "Le microbiome évolue vers des bactéries gram-négatives avec une production accrue d'endotoxines" },
    ],

    evidenceTitle: "Preuves clés",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", referenceId: "gut_per2_2026", finding: "Per2 KO dans l'épithélium intestinal → perturbation de la barrière → LPS → neurogenèse hippocampique↓ → comportement de type dépressif" },
      { ref: "PMC5909328 (2018)", referenceId: "gut_circadian_2018", finding: "La perturbation circadienne modifie la composition du microbiome intestinal avec une capacité accrue de synthèse du LPS" },
      { ref: "biorxiv 2025", referenceId: "gut_light_2025", finding: "L'exposition continue à la lumière perturbe la barrière épithéliale intestinale chez les souris mâles via la cascade apoptose-inflammation-stress oxydatif" },
    ],

    predictionText: "L'axe intestin-cerveau génère les prédictions E-NEW-5 (Per2 intestinal corrélé à l'exposition aux CEM) et E-NEW-8 (marqueurs de perméabilité intestinale corrélés à l'exposition aux CEM dans les cohortes professionnelles).",
    predictionLink: "Voir les prédictions des couches supplémentaires →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "장-뇌 축: 두 번째 장벽이 무너지다",
    subtitle: "일주기 리듬 교란이 Per2 → 밀착연접 분해 → LPS가 혈류에 침입 → 신경염증을 통해 장관 장벽을 공격한다. 장관 장벽은 혈액뇌장벽과 같은 분자 도구를 사용한다 — 멜라토닌 상실은 두 장벽을 동시에 개방한다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 장-뇌 축을 새로 검증된 BERM 경로(VK24)로 기록한다. 개별 링크는 독립적으로 검증되었다. 완전한 EMF → 장 → 뇌 연쇄를 단일 통합 메커니즘으로 보는 것은 추가 검증이 필요하다.",

    pathTitle: "경로",
    pathLead: "장-뇌 축은 일주기 시계 기능을 장관 장벽 완전성을 거쳐 뇌 염증까지 연속적인 분자 사슬로 연결한다.",
    pathSteps: [
      { step: "1. EMF → 멜라토닌↓", detail: "EMF는 송과체 효과와 CRY 자기수용을 통해 멜라토닌을 억제한다. 멜라토닌은 정상적으로 BBB와 장 상피 모두에서 밀착연접 단백질을 보호한다." },
      { step: "2. 멜라토닌↓ → 장내 Per2↓", detail: "멜라토닌은 장의 Per2를 포함한 말초 일주기 시계를 동기화한다. Per2는 장 상피세포에서 ZO-1, 오클루딘, 클라우딘의 발현을 조절한다." },
      { step: "3. Per2↓ → 장관 장벽↓", detail: "장 상피의 Per2 녹아웃은 밀착연접 분해를 유발한다. 혈액뇌장벽을 유지하는 동일한 밀착연접 단백질(ZO-1, 오클루딘, 클라우딘)이 장관 장벽도 유지한다." },
      { step: "4. 장관 장벽↓ → LPS가 혈중으로", detail: "손상된 장관 장벽을 통해 그람 음성 세균의 리포다당류(LPS)가 혈류로 침입한다. 일주기 리듬 교란은 마이크로바이옴 구성도 변화시킨다: Ruminococcus torques↑, Lactobacillus↓, LPS 합성 유전자↑." },
      { step: "5. LPS → 신경염증", detail: "혈청 LPS가 전신 염증을 유발 → 손상된 BBB를 통과 → 미세교세포 활성화 → 신경염증. 이는 해마 신경발생을 감소시키고 우울증에 기여한다." },
      { step: "6. 우울증 → HPA → 추가 교란", detail: "신경염증이 HPA 축을 활성화 → 코르티솔↑ → 추가 수면 교란 → 추가 멜라토닌↓. 루프가 피드백한다: 초기 일주기 리듬 교란이 진행성 악화의 조건을 만든다." },
    ],

    dualTitle: "이중 장벽 원리",
    dualLead: "BBB와 장 상피 장벽은 같은 분자 도구로 구축되어 있다. 하나를 여는 것은 다른 하나도 연다.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "막관통 단백질을 세포골격에 연결하는 비계 단백질; BBB 내피와 장 상피 모두에 존재" },
      { protein: "오클루딘", role: "막관통 밀착연접 단백질; 멜라토닌↓은 두 장벽 모두에서 발현을 감소시킨다; EMF는 BBB의 오클루딘을 직접 감소시킨다([[ref:bbb_emf_2026|PMC12829706]])" },
      { protein: "클라우딘(패밀리)", role: "세포간 투과성 조절인자; 조직 특이적 아이소폼을 갖지만 공유된 조절 메커니즘; 장에서 Per2 의존적 발현" },
    ],
    dualConclusion: "멜라토닌은 두 장벽의 공통 보호자이다. EMF→멜라토닌↓은 동시적 이중 취약성을 만든다: 중금속이 뇌에 침입하고(BBB↓) 동시에 세균 내독소가 혈류에 침입한다(장관 장벽↓). 이것은 두 가지 효과가 아니라 두 장벽을 공격하는 하나의 메커니즘이다.",

    microbiomeTitle: "마이크로바이옴 교란",
    microbiomeLead: "일주기 리듬 교란은 물리적 장벽만 약화시키는 것이 아니라 그 뒤에 있는 것도 바꾼다.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "뮤신 분해 세균으로 관강 측에서 장관 장벽을 추가로 약화시킨다" },
      { change: "Lactobacillus↓", impact: "장벽 완전성을 유지하고 단쇄 지방산을 생산하는 보호적 공생균" },
      { change: "LPS 합성 유전자↑", impact: "마이크로바이옴이 내독소 생산이 증가한 그람 음성 세균 쪽으로 이동" },
    ],

    evidenceTitle: "주요 증거",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", referenceId: "gut_per2_2026", finding: "장 상피의 Per2 KO → 장벽 파괴 → LPS → 해마 신경발생↓ → 우울 유사 행동" },
      { ref: "PMC5909328 (2018)", referenceId: "gut_circadian_2018", finding: "일주기 리듬 교란이 LPS 합성 능력 증가와 함께 장내 마이크로바이옴 구성을 변화시킨다" },
      { ref: "biorxiv 2025", referenceId: "gut_light_2025", finding: "지속적 광 노출이 세포사멸-염증-산화 스트레스 캐스케이드를 통해 수컷 마우스의 장 상피 장벽을 교란한다" },
    ],

    predictionText: "장-뇌 축은 예측 E-NEW-5(장의 Per2가 EMF 노출과 상관)와 E-NEW-8(장관 투과성 마커가 직업 코호트의 EMF 노출과 상관)을 생성한다.",
    predictionLink: "보충 레이어 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function GutBrainAxisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {/* Pathway */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.pathTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.pathLead}</p>
        <div className="space-y-3">
          {d.pathSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual barrier */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.dualTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.dualLead}</p>
        <div className="space-y-3">
          {d.dualProteins.map((p, i) => (
            <div key={i} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.protein}</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={p.role} locale={locale} /></p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.dualConclusion}</p>
        </div>
      </section>

      {/* Microbiome */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.microbiomeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.microbiomeLead}</p>
        <div className="space-y-3">
          {d.microbiomeChanges.map((c, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.change}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.evidenceTitle}</h2>
        <div className="space-y-3">
          {d.evidenceRefs.map((r, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-3 text-sm text-foreground-muted leading-relaxed border-l-2 border-accent/30 pl-3">
              <StudyCitation referenceId={r.referenceId} locale={locale} label={r.ref} className="font-mono text-xs text-accent" />
              <p>{r.finding}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Predictions */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
