import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Autism as BERM Prototype",
    subtitle: "ASD unites three independently verified BERM mechanisms — GABA switch delay, ELF-priming synaptogenesis, and inflammation-driven KCC2 suppression — into a single neurodevelopmental outcome. Genetic modulation (CACNA2D3), sex dimorphism (KCC2), and pharmacological validation (bumetanide) all converge.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ASD as a prototype manifestation of BERM mechanisms. While each individual mechanism is independently verified, their combined role in ASD etiology remains a testable hypothesis. BERM does NOT claim EMF is the sole cause of ASD — genetic susceptibility, environmental co-factors, and developmental timing all modulate the outcome.",

    mechTitle: "Three converging mechanisms",
    mechLead: "ASD is uniquely positioned in BERM because three independently verified pathways converge on the same neurodevelopmental outcome: excitation/inhibition (E/I) imbalance.",
    mechanisms: [
      { id: "M1", name: "GABA switch delay (VK6)", path: "EMF → ROS → KCC2 maturation↓ → GABA stays excitatory → E/I↑", detail: "In normal development, KCC2 upregulation switches GABA from excitatory to inhibitory during the first postnatal months. Environmental disruption (ROS, inflammation) delays this switch → prolonged excitatory GABA → circuits develop abnormally. ASD patients show elevated NKCC1/KCC2 ratio = GABA still excitatory.", color: "green" },
      { id: "M2", name: "ELF-priming synaptogenesis (VK4 + VK30)", path: "ELF → α2δ-1 expression↑ → EXCESSIVE excitatory synaptogenesis → E/I↑", detail: "ELF-priming (50/60 Hz, 8-10 days) upregulates VGCC α2δ subunit expression. α2δ-1 overexpression drives excessive excitatory synapse formation. CACNA2D3 (α2δ-3) is an autism susceptibility gene — genetic variants increase sensitivity to this ELF-driven mechanism.", color: "green" },
      { id: "M3", name: "Inflammation → KCC2↓ (S9 + S10)", path: "EMF → mast cells → IL-1β → KCC2 maturation further delayed → E/I↑↑", detail: "EMF-induced mast cell degranulation releases IL-1β which directly delays KCC2 maturation. This creates feedback loop S9: more inflammation → more KCC2 delay → GABA stays excitatory longer → more neuronal damage → more inflammation. The developing brain is trapped in an excitatory state.", color: "green" },
    ],

    spectrumTitle: "The Q-factor spectrum",
    spectrumLead: "ASD and epilepsy are not separate disorders but different manifestations of the same E/I spectrum — determined by Q-factor value.",
    spectrumPoints: [
      "ASD + epilepsy co-occurrence: 38% of ASD individuals have epilepsy",
      "Same mechanism (E/I↑) produces different outcomes at different Q values: moderate Q → ASD features; high Q → seizures; both → ASD + epilepsy",
      "CACNA2D3 variants modulate where on the spectrum an individual falls",
      "KCC2 sex dimorphism: KCC2 expression differs between sexes → explains male 4:1 predominance in ASD",
    ],

    geneticsTitle: "Genetic modulation",
    geneticsLead: "BERM does not predict ASD in everyone — genetic susceptibility determines who is vulnerable.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "Autism susceptibility gene — encodes the VGCC α2δ subunit that ELF-priming targets. Variants increase sensitivity to ELF-driven synaptogenesis." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025 (ETH Zürich): CACNA1C genotype modulates EMF response in sleep EEG. Timothy syndrome (CACNA1C gain-of-function) produces ASD features." },
      { gene: "KCC2 (SLC12A5)", role: "Sex-dimorphic expression. Lower baseline KCC2 in males → males need less additional KCC2 suppression to reach the excitatory GABA threshold → 4:1 male predominance." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "Bumetanide — a drug that restores inhibitory GABA — improves ASD symptoms in multiple RCTs. This is exactly what BERM predicts.",
    pharmaPoints: [
      "Bumetanide blocks NKCC1 → reduces intracellular chloride → GABA becomes inhibitory → E/I ratio normalizes",
      "Multiple RCTs show improvement in ASD core symptoms (Lemonnier 2012, Dai 2021, Shaker 2024)",
      "Bumetanide corrects the SAME disruption (GABA polarity) that EMF produces via KCC2↓",
      "Plasma KCC2, NKCC1, GABA levels now serve as peripheral ASD biomarkers (Springer 2026)",
    ],

    devTitle: "Developmental sequence",
    devStages: [
      { stage: "Prenatal", events: "EMF → ROS → KCC2↓ → GABA switch delays (VK6); EMF → hypothalamic neuroendocrine disruption (VK13); EMF → epigenetic changes in developing brain (VK27)" },
      { stage: "Neonatal", events: "ELF-priming → α2δ-1↑ → excessive excitatory synaptogenesis (VK4/VK30); GABA still excitatory → E/I↑ → Q↑ (VK6); Inflammation (melatonin↓) → IL-1β → KCC2↓ further (S9)" },
      { stage: "Developmental", events: "E/I imbalance → circuits develop abnormally; Social cognition circuits (PFC-amygdala) fail to mature; Sensory hypersensitivity (α2δ-1↑ → VK30); Epileptiform activity (Q↑ → seizures in 38%)" },
    ],

    predictionText: "Predictions E-NEW-15 (NKCC1/KCC2 ratio correlates with prenatal EMF) and E-NEW-16 (bumetanide + EMF reduction outperforms either alone) are directly testable.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Autismi BERM-prototyyppinä",
    subtitle: "ASD yhdistää kolme itsenäisesti todennettua BERM-mekanismia — GABA-vaihdon viiveen, ELF-primaami-synaptogeneesin ja tulehduksen aiheuttaman KCC2-vaimennuksen — yhdeksi neurokehitykselliseksi lopputulokseksi. Geneettinen modulaatio (CACNA2D3), sukupuolidimorfismi (KCC2) ja farmakologinen todentaminen (bumetanidi) kaikki yhtyvät.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu ehdottaa ASD:tä BERM-mekanismien prototyyppi-ilmentymänä. Vaikka jokainen yksittäinen mekanismi on todennettu itsenäisesti, niiden yhdistetty rooli ASD:n etiologiassa on testattava hypoteesi. BERM EI väitä EMF:n olevan ASD:n ainoa syy — geneettinen alttius, ympäristön yhteisvaikuttajat ja kehityksen ajoitus kaikki säätelevät lopputulosta.",

    mechTitle: "Kolme yhtyvää mekanismia",
    mechLead: "ASD on ainutlaatuisessa asemassa BERM:ssä koska kolme itsenäisesti todennettua reittiä yhtyvät samaan neurokehitykselliseen lopputulokseen: eksitaation/inhibition (E/I) epätasapainoon.",
    mechanisms: [
      { id: "M1", name: "GABA-vaihdon viive (VK6)", path: "EMF → ROS → KCC2-kypsyminen↓ → GABA pysyy eksitatorisena → E/I↑", detail: "Normaalissa kehityksessä KCC2:n ylössäätely vaihtaa GABAn eksitatorisesta inhibitoriseksi ensimmäisten postnatalisten kuukausien aikana. Ympäristöhäiriö (ROS, tulehdus) viivästyttää tätä vaihtoa → pitkittynyt eksitatorinen GABA → piirit kehittyvät poikkeavasti. ASD-potilailla on kohonnut NKCC1/KCC2-suhde = GABA yhä eksitatorinen.", color: "green" },
      { id: "M2", name: "ELF-primaami-synaptogeneesi (VK4 + VK30)", path: "ELF → α2δ-1-ekspressio↑ → LIIALLINEN eksitatorinen synaptogeneesi → E/I↑", detail: "ELF-primaami (50/60 Hz, 8-10 päivää) säätelee VGCC α2δ -alayksikön ekspressiota ylös. α2δ-1-yliekspressio ajaa liiallista eksitatorista synapsinmuodostusta. CACNA2D3 (α2δ-3) on autismin alttiusgeeni — geneettiset variantit kasvattavat herkkyyttä tälle ELF-ajatulle mekanismille.", color: "green" },
      { id: "M3", name: "Tulehdus → KCC2↓ (S9 + S10)", path: "EMF → syöttösolut → IL-1β → KCC2-kypsyminen viivästyy lisää → E/I↑↑", detail: "EMF-aiheutettu syöttösolujen degranulaatio vapauttaa IL-1β:n joka suoraan viivästyttää KCC2-kypsymistä. Tämä luo takaisinkytkentäsilmukan S9: lisää tulehdusta → lisää KCC2-viivettä → GABA pysyy eksitatorisena pidempään → lisää neuronivaurioita → lisää tulehdusta. Kehittyvät aivot ovat loukussa eksitatorisessa tilassa.", color: "green" },
    ],

    spectrumTitle: "Q-tekijä-spektri",
    spectrumLead: "ASD ja epilepsia eivät ole erillisiä häiriöitä vaan saman E/I-spektrin eri ilmentymiä — Q-tekijän arvo määrää lopputuloksen.",
    spectrumPoints: [
      "ASD + epilepsia yhdessä: 38 % ASD-henkilöistä saa epilepsian",
      "Sama mekanismi (E/I↑) tuottaa eri lopputuloksia eri Q-arvoilla: kohtalainen Q → ASD-piirteet; korkea Q → kohtaukset; molemmat → ASD + epilepsia",
      "CACNA2D3-variantit säätelevät missä kohtaa spektriä yksilö on",
      "KCC2-sukupuolidimorfismi: KCC2-ekspressio eroaa sukupuolten välillä → selittää poikien 4:1 yliedustuksen ASD:ssä",
    ],

    geneticsTitle: "Geneettinen modulaatio",
    geneticsLead: "BERM ei ennusta ASD:tä kaikille — geneettinen alttius määrää kuka on haavoittuva.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "Autismin alttiusgeeni — koodaa VGCC α2δ -alayksikön johon ELF-primaami kohdistuu. Variantit kasvattavat herkkyyttä ELF-ajamalle synaptogeneesille." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025 (ETH Zürich): CACNA1C-genotyyppi säätelee EMF-vastetta uni-EEG:ssä. Timothyn oireyhtymä (CACNA1C-gain-of-function) tuottaa ASD-piirteitä." },
      { gene: "KCC2 (SLC12A5)", role: "Sukupuolidimorfineen ekspressio. Matalampi KCC2-lähtötaso pojilla → pojat tarvitsevat vähemmän lisä-KCC2-suppressiota eksitatorisen GABA-kynnyksen saavuttamiseksi → 4:1 poikien yliedustus." },
    ],

    pharmaTitle: "Farmakologinen todentaminen",
    pharmaLead: "Bumetanidi — lääke joka palauttaa inhibitorisen GABAn — parantaa ASD-oireita useissa RCT:issä. Tämä on täsmälleen se mitä BERM ennustaa.",
    pharmaPoints: [
      "Bumetanidi estää NKCC1:n → vähentää solunsisäistä kloridia → GABA muuttuu inhibitoriseksi → E/I-suhde normalisoituu",
      "Useita RCT:itä osoittavat parannusta ASD:n ydinoireissa (Lemonnier 2012, Dai 2021, Shaker 2024)",
      "Bumetanidi korjaa SAMAN häiriön (GABA-polariteetti) jonka EMF tuottaa KCC2↓:n kautta",
      "Plasman KCC2-, NKCC1- ja GABA-tasot toimivat nyt perifeerinsinä ASD-biomarkkereina (Springer 2026)",
    ],

    devTitle: "Kehityksellinen sekvenssi",
    devStages: [
      { stage: "Prenataalinen", events: "EMF → ROS → KCC2↓ → GABA-vaihto viivästyy (VK6); EMF → hypotalamuksen neuroendokriininen häiriö (VK13); EMF → epigeneettiset muutokset kehittyvissä aivoissa (VK27)" },
      { stage: "Neonataalinen", events: "ELF-primaami → α2δ-1↑ → liiallinen eksitatorinen synaptogeneesi (VK4/VK30); GABA yhä eksitatorinen → E/I↑ → Q↑ (VK6); Tulehdus (melatoniini↓) → IL-1β → KCC2↓ lisää (S9)" },
      { stage: "Kehityksellinen", events: "E/I-epätasapaino → piirit kehittyvät poikkeavasti; Sosiaalisen kognition piirit (PFC-amygdala) eivät kypsy; Sensorinen yliherkkyys (α2δ-1↑ → VK30); Epileptiforminen aktiivisuus (Q↑ → kohtaukset 38 %:lla)" },
    ],

    predictionText: "Ennusteet E-NEW-15 (NKCC1/KCC2-suhde korreloi prenataalisen EMF:n kanssa) ja E-NEW-16 (bumetanidi + EMF-vähennys yhdessä parempi kuin kumpikaan yksin) ovat suoraan testattavissa.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "自閉症をBERMプロトタイプとして",
    subtitle: "ASDは独立に検証された3つのBERMメカニズム — GABAスイッチ遅延、ELFプライミング型シナプス形成、炎症駆動型KCC2抑制 — を単一の神経発達転帰に統合する。遺伝的調節（CACNA2D3）、性差（KCC2）、薬理学的検証（ブメタニド）がすべて収束する。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページはASDをBERMメカニズムのプロトタイプ的発現として提案する。各個別メカニズムは独立に検証されているが、ASD病因学における複合的役割は検証可能な仮説のままである。BERMはEMFがASDの唯一の原因であるとは主張しない — 遺伝的感受性、環境共因子、発達タイミングがすべて転帰を調節する。",

    mechTitle: "3つの収束メカニズム",
    mechLead: "ASDがBERMにおいて独自の位置を占めるのは、独立に検証された3つの経路が同じ神経発達転帰、すなわち興奮/抑制（E/I）不均衡に収束するためである。",
    mechanisms: [
      { id: "M1", name: "GABAスイッチ遅延（VK6）", path: "EMF → ROS → KCC2成熟↓ → GABAが興奮性のまま → E/I↑", detail: "正常発達では、出生後最初の数ヶ月間にKCC2の上方制御がGABAを興奮性から抑制性に切り替える。環境的撹乱（ROS、炎症）がこの切り替えを遅延 → 興奮性GABAの延長 → 回路が異常に発達。ASD患者はNKCC1/KCC2比が上昇 = GABAがまだ興奮性。", color: "green" },
      { id: "M2", name: "ELFプライミング型シナプス形成（VK4 + VK30）", path: "ELF → α2δ-1発現↑ → 過剰な興奮性シナプス形成 → E/I↑", detail: "ELFプライミング（50/60 Hz、8-10日間）がVGCC α2δサブユニット発現を上方制御する。α2δ-1過剰発現が過度の興奮性シナプス形成を駆動する。CACNA2D3（α2δ-3）は自閉症感受性遺伝子 — 遺伝的変異がこのELF駆動メカニズムへの感受性を増加させる。", color: "green" },
      { id: "M3", name: "炎症 → KCC2↓（S9 + S10）", path: "EMF → マスト細胞 → IL-1β → KCC2成熟がさらに遅延 → E/I↑↑", detail: "EMF誘発性マスト細胞脱顆粒がIL-1βを放出し、KCC2成熟を直接遅延させる。これがフィードバックループS9を形成：炎症増加 → KCC2遅延増加 → GABAがより長く興奮性に留まる → 神経損傷増加 → 炎症増加。発達中の脳は興奮状態に閉じ込められる。", color: "green" },
    ],

    spectrumTitle: "Q因子スペクトル",
    spectrumLead: "ASDとてんかんは別々の障害ではなく、同じE/Iスペクトルの異なる発現であり、Q因子値によって決定される。",
    spectrumPoints: [
      "ASD + てんかん併存：ASD患者の38%がてんかんを有する",
      "同じメカニズム（E/I↑）が異なるQ値で異なる転帰を生む：中程度Q → ASD特性、高Q → 発作、両方 → ASD + てんかん",
      "CACNA2D3変異がスペクトル上のどこに位置するかを調節する",
      "KCC2性差：KCC2発現が性別間で異なる → ASDにおける男性4:1優位を説明する",
    ],

    geneticsTitle: "遺伝的調節",
    geneticsLead: "BERMは全員にASDを予測するわけではない — 遺伝的感受性が誰が脆弱かを決定する。",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "自閉症感受性遺伝子 — ELFプライミングが標的とするVGCC α2δサブユニットをコードする。変異がELF駆動型シナプス形成への感受性を増加させる。" },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025（ETH Zürich）：CACNA1C遺伝子型が睡眠EEGにおけるEMF応答を調節する。ティモシー症候群（CACNA1C機能獲得型）がASD特性を生じる。" },
      { gene: "KCC2 (SLC12A5)", role: "性差のある発現。男性のKCC2ベースラインが低い → 男性は興奮性GABA閾値に達するのに必要な追加KCC2抑制が少ない → 4:1の男性優位。" },
    ],

    pharmaTitle: "薬理学的検証",
    pharmaLead: "ブメタニド — 抑制性GABAを回復する薬剤 — は複数のRCTでASD症状を改善する。これはBERMの予測と正確に一致する。",
    pharmaPoints: [
      "ブメタニドがNKCC1を遮断 → 細胞内塩化物を減少 → GABAが抑制性に → E/I比が正常化",
      "複数のRCTがASD中核症状の改善を示す（Lemonnier 2012、Dai 2021、Shaker 2024）",
      "ブメタニドはEMFがKCC2↓を介して生じるのと同じ障害（GABA極性）を修正する",
      "血漿KCC2、NKCC1、GABAレベルが現在末梢ASDバイオマーカーとして機能する（Springer 2026）",
    ],

    devTitle: "発達シーケンス",
    devStages: [
      { stage: "出生前", events: "EMF → ROS → KCC2↓ → GABAスイッチ遅延（VK6）; EMF → 視床下部神経内分泌障害（VK13）; EMF → 発達中の脳のエピジェネティック変化（VK27）" },
      { stage: "新生児期", events: "ELFプライミング → α2δ-1↑ → 過剰な興奮性シナプス形成（VK4/VK30）; GABAがまだ興奮性 → E/I↑ → Q↑（VK6）; 炎症（メラトニン↓）→ IL-1β → KCC2↓さらに（S9）" },
      { stage: "発達期", events: "E/I不均衡 → 回路が異常に発達; 社会認知回路（PFC-扁桃体）が成熟しない; 感覚過敏（α2δ-1↑ → VK30）; てんかん様活動（Q↑ → 38%で発作）" },
    ],

    predictionText: "予測 E-NEW-15（NKCC1/KCC2比が出生前EMFと相関）およびE-NEW-16（ブメタニド + EMF低減が単独よりも優れる）は直接検証可能である。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "L'Autisme comme Prototype BERM",
    subtitle: "Le TSA réunit trois mécanismes BERM vérifiés indépendamment — retard du switch GABA, synaptogenèse par amorçage ELF et suppression de KCC2 par l'inflammation — en un seul résultat neurodéveloppemental. La modulation génétique (CACNA2D3), le dimorphisme sexuel (KCC2) et la validation pharmacologique (bumétanide) convergent tous.",
    backLink: "← Retour aux Preuves",
    cautionText: "Cette page propose le TSA comme manifestation prototype des mécanismes BERM. Bien que chaque mécanisme individuel soit vérifié indépendamment, leur rôle combiné dans l'étiologie du TSA reste une hypothèse testable. BERM ne prétend PAS que l'EMF est la seule cause du TSA — la susceptibilité génétique, les co-facteurs environnementaux et le timing développemental modulent tous le résultat.",

    mechTitle: "Trois mécanismes convergents",
    mechLead: "Le TSA occupe une position unique dans BERM car trois voies vérifiées indépendamment convergent vers le même résultat neurodéveloppemental : le déséquilibre excitation/inhibition (E/I).",
    mechanisms: [
      { id: "M1", name: "Retard du switch GABA (VK6)", path: "EMF → ROS → maturation KCC2↓ → le GABA reste excitateur → E/I↑", detail: "Dans le développement normal, la régulation positive de KCC2 fait passer le GABA d'excitateur à inhibiteur pendant les premiers mois postnataux. La perturbation environnementale (ROS, inflammation) retarde ce switch → GABA excitateur prolongé → les circuits se développent anormalement. Les patients TSA montrent un ratio NKCC1/KCC2 élevé = GABA encore excitateur.", color: "green" },
      { id: "M2", name: "Synaptogenèse par amorçage ELF (VK4 + VK30)", path: "ELF → expression α2δ-1↑ → synaptogenèse excitatrice EXCESSIVE → E/I↑", detail: "L'amorçage ELF (50/60 Hz, 8-10 jours) régule positivement l'expression de la sous-unité α2δ des VGCC. La surexpression d'α2δ-1 entraîne une formation excessive de synapses excitatrices. CACNA2D3 (α2δ-3) est un gène de susceptibilité à l'autisme — les variants génétiques augmentent la sensibilité à ce mécanisme entraîné par les ELF.", color: "green" },
      { id: "M3", name: "Inflammation → KCC2↓ (S9 + S10)", path: "EMF → mastocytes → IL-1β → maturation KCC2 davantage retardée → E/I↑↑", detail: "La dégranulation mastocytaire induite par l'EMF libère l'IL-1β qui retarde directement la maturation de KCC2. Cela crée la boucle de rétroaction S9 : plus d'inflammation → plus de retard KCC2 → le GABA reste excitateur plus longtemps → plus de dommages neuronaux → plus d'inflammation. Le cerveau en développement est piégé dans un état excitateur.", color: "green" },
    ],

    spectrumTitle: "Le spectre du facteur Q",
    spectrumLead: "Le TSA et l'épilepsie ne sont pas des troubles distincts mais différentes manifestations du même spectre E/I — déterminées par la valeur du facteur Q.",
    spectrumPoints: [
      "Co-occurrence TSA + épilepsie : 38 % des individus TSA ont de l'épilepsie",
      "Le même mécanisme (E/I↑) produit différents résultats à différentes valeurs de Q : Q modéré → caractéristiques TSA ; Q élevé → crises ; les deux → TSA + épilepsie",
      "Les variants de CACNA2D3 modulent où sur le spectre un individu se situe",
      "Dimorphisme sexuel de KCC2 : l'expression de KCC2 diffère entre les sexes → explique la prédominance masculine 4:1 dans le TSA",
    ],

    geneticsTitle: "Modulation génétique",
    geneticsLead: "BERM ne prédit pas le TSA chez tout le monde — la susceptibilité génétique détermine qui est vulnérable.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "Gène de susceptibilité à l'autisme — encode la sous-unité α2δ des VGCC que l'amorçage ELF cible. Les variants augmentent la sensibilité à la synaptogenèse entraînée par les ELF." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025 (ETH Zürich) : le génotype CACNA1C module la réponse EMF dans l'EEG de sommeil. Le syndrome de Timothy (gain de fonction de CACNA1C) produit des caractéristiques TSA." },
      { gene: "KCC2 (SLC12A5)", role: "Expression sexuellement dimorphique. Un KCC2 de base plus faible chez les mâles → les mâles nécessitent moins de suppression additionnelle de KCC2 pour atteindre le seuil de GABA excitateur → prédominance masculine 4:1." },
    ],

    pharmaTitle: "Validation pharmacologique",
    pharmaLead: "Le bumétanide — un médicament qui restaure le GABA inhibiteur — améliore les symptômes du TSA dans plusieurs ECR. C'est exactement ce que BERM prédit.",
    pharmaPoints: [
      "Le bumétanide bloque NKCC1 → réduit le chlorure intracellulaire → le GABA devient inhibiteur → le ratio E/I se normalise",
      "Plusieurs ECR montrent une amélioration des symptômes centraux du TSA (Lemonnier 2012, Dai 2021, Shaker 2024)",
      "Le bumétanide corrige la MÊME perturbation (polarité GABA) que l'EMF produit via KCC2↓",
      "Les niveaux plasmatiques de KCC2, NKCC1 et GABA servent désormais de biomarqueurs périphériques du TSA (Springer 2026)",
    ],

    devTitle: "Séquence développementale",
    devStages: [
      { stage: "Prénatal", events: "EMF → ROS → KCC2↓ → retard du switch GABA (VK6) ; EMF → perturbation neuroendocrinienne hypothalamique (VK13) ; EMF → changements épigénétiques dans le cerveau en développement (VK27)" },
      { stage: "Néonatal", events: "Amorçage ELF → α2δ-1↑ → synaptogenèse excitatrice excessive (VK4/VK30) ; GABA encore excitateur → E/I↑ → Q↑ (VK6) ; Inflammation (mélatonine↓) → IL-1β → KCC2↓ davantage (S9)" },
      { stage: "Développemental", events: "Déséquilibre E/I → les circuits se développent anormalement ; Les circuits de cognition sociale (PFC-amygdale) échouent à maturer ; Hypersensibilité sensorielle (α2δ-1↑ → VK30) ; Activité épileptiforme (Q↑ → crises chez 38 %)" },
    ],

    predictionText: "Les prédictions E-NEW-15 (le ratio NKCC1/KCC2 corrèle avec l'EMF prénatal) et E-NEW-16 (bumétanide + réduction EMF surpasse l'un ou l'autre seul) sont directement testables.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "자폐증을 BERM 프로토타입으로",
    subtitle: "ASD는 독립적으로 검증된 세 가지 BERM 메커니즘 — GABA 전환 지연, ELF 프라이밍 시냅스 형성, 염증 유발 KCC2 억제 — 을 단일 신경발달 결과로 통합한다. 유전적 조절(CACNA2D3), 성별 이형성(KCC2), 약리학적 검증(부메타나이드)이 모두 수렴한다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 ASD를 BERM 메커니즘의 프로토타입 발현으로 제안한다. 각 개별 메커니즘은 독립적으로 검증되었으나, ASD 병인론에서의 결합된 역할은 검증 가능한 가설로 남아 있다. BERM은 EMF가 ASD의 유일한 원인이라고 주장하지 않는다 — 유전적 감수성, 환경 공동인자, 발달 타이밍이 모두 결과를 조절한다.",

    mechTitle: "세 가지 수렴 메커니즘",
    mechLead: "ASD가 BERM에서 독특한 위치를 차지하는 이유는 독립적으로 검증된 세 가지 경로가 동일한 신경발달 결과인 흥분/억제(E/I) 불균형으로 수렴하기 때문이다.",
    mechanisms: [
      { id: "M1", name: "GABA 전환 지연 (VK6)", path: "EMF → ROS → KCC2 성숙↓ → GABA가 흥분성으로 유지 → E/I↑", detail: "정상 발달에서는 출생 후 첫 몇 개월 동안 KCC2 상향 조절이 GABA를 흥분성에서 억제성으로 전환한다. 환경적 교란(ROS, 염증)이 이 전환을 지연 → 흥분성 GABA 연장 → 회로가 비정상적으로 발달. ASD 환자는 NKCC1/KCC2 비율 상승 = GABA가 여전히 흥분성.", color: "green" },
      { id: "M2", name: "ELF 프라이밍 시냅스 형성 (VK4 + VK30)", path: "ELF → α2δ-1 발현↑ → 과도한 흥분성 시냅스 형성 → E/I↑", detail: "ELF 프라이밍(50/60 Hz, 8-10일)이 VGCC α2δ 소단위 발현을 상향 조절한다. α2δ-1 과발현이 과도한 흥분성 시냅스 형성을 유도한다. CACNA2D3(α2δ-3)은 자폐증 감수성 유전자 — 유전적 변이가 이 ELF 구동 메커니즘에 대한 감수성을 증가시킨다.", color: "green" },
      { id: "M3", name: "염증 → KCC2↓ (S9 + S10)", path: "EMF → 비만세포 → IL-1β → KCC2 성숙이 추가 지연 → E/I↑↑", detail: "EMF 유발 비만세포 탈과립이 IL-1β를 방출하여 KCC2 성숙을 직접 지연시킨다. 이것이 피드백 루프 S9를 형성: 염증 증가 → KCC2 지연 증가 → GABA가 더 오래 흥분성으로 유지 → 신경 손상 증가 → 염증 증가. 발달 중인 뇌가 흥분 상태에 갇히게 된다.", color: "green" },
    ],

    spectrumTitle: "Q인자 스펙트럼",
    spectrumLead: "ASD와 간질은 별개의 장애가 아니라 동일한 E/I 스펙트럼의 다른 발현이며, Q인자 값에 의해 결정된다.",
    spectrumPoints: [
      "ASD + 간질 동시 발생: ASD 환자의 38%가 간질을 가짐",
      "동일한 메커니즘(E/I↑)이 다른 Q값에서 다른 결과를 생성: 중등도 Q → ASD 특성, 높은 Q → 발작, 둘 다 → ASD + 간질",
      "CACNA2D3 변이가 스펙트럼상 개인이 위치하는 곳을 조절",
      "KCC2 성별 이형성: KCC2 발현이 성별 간에 다름 → ASD에서 남성 4:1 우세를 설명",
    ],

    geneticsTitle: "유전적 조절",
    geneticsLead: "BERM은 모든 사람에게 ASD를 예측하지 않는다 — 유전적 감수성이 누가 취약한지를 결정한다.",
    geneticsPoints: [
      { gene: "CACNA2D3 (α2δ-3)", role: "자폐증 감수성 유전자 — ELF 프라이밍이 표적으로 하는 VGCC α2δ 소단위를 코딩한다. 변이가 ELF 구동 시냅스 형성에 대한 감수성을 증가시킨다." },
      { gene: "CACNA1C (Cav1.2)", role: "Sousouri 2025(ETH Zürich): CACNA1C 유전자형이 수면 EEG에서 EMF 반응을 조절한다. 티모시 증후군(CACNA1C 기능 획득)이 ASD 특성을 생성한다." },
      { gene: "KCC2 (SLC12A5)", role: "성별 이형적 발현. 남성의 KCC2 기저선이 낮음 → 남성은 흥분성 GABA 역치에 도달하는 데 추가 KCC2 억제가 적게 필요 → 4:1 남성 우세." },
    ],

    pharmaTitle: "약리학적 검증",
    pharmaLead: "부메타나이드 — 억제성 GABA를 회복시키는 약물 — 는 여러 RCT에서 ASD 증상을 개선한다. 이는 BERM의 예측과 정확히 일치한다.",
    pharmaPoints: [
      "부메타나이드가 NKCC1을 차단 → 세포내 염화물을 감소 → GABA가 억제성으로 전환 → E/I 비율이 정상화",
      "여러 RCT가 ASD 핵심 증상의 개선을 보여줌(Lemonnier 2012, Dai 2021, Shaker 2024)",
      "부메타나이드는 EMF가 KCC2↓를 통해 생성하는 것과 동일한 교란(GABA 극성)을 교정",
      "혈장 KCC2, NKCC1, GABA 수준이 현재 말초 ASD 바이오마커로 기능(Springer 2026)",
    ],

    devTitle: "발달 시퀀스",
    devStages: [
      { stage: "출생 전", events: "EMF → ROS → KCC2↓ → GABA 전환 지연(VK6); EMF → 시상하부 신경내분비 교란(VK13); EMF → 발달 중인 뇌의 후성유전적 변화(VK27)" },
      { stage: "신생아기", events: "ELF 프라이밍 → α2δ-1↑ → 과도한 흥분성 시냅스 형성(VK4/VK30); GABA가 여전히 흥분성 → E/I↑ → Q↑(VK6); 염증(멜라토닌↓) → IL-1β → KCC2↓ 추가(S9)" },
      { stage: "발달기", events: "E/I 불균형 → 회로가 비정상적으로 발달; 사회 인지 회로(PFC-편도체)가 성숙하지 못함; 감각 과민(α2δ-1↑ → VK30); 간질양 활동(Q↑ → 38%에서 발작)" },
    ],

    predictionText: "예측 E-NEW-15(NKCC1/KCC2 비율이 출생 전 EMF와 상관)와 E-NEW-16(부메타나이드 + EMF 감소가 단독보다 우수)은 직접 검증 가능하다.",
    predictionLink: "최종 층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AutismPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { green: "border-green-500/30 bg-green-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((m) => (
            <div key={m.id} className={`rounded-xl border p-5 ${mechColors[m.color]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{m.id}</span>
                <h3 className="font-semibold text-sm">{m.name}</h3>
              </div>
              <p className="text-xs font-mono text-foreground-muted mb-2">{m.path}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.spectrumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.spectrumLead}</p>
        <div className="space-y-2">
          {d.spectrumPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.geneticsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.geneticsLead}</p>
        <div className="space-y-3">
          {d.geneticsPoints.map((g, i) => (
            <div key={i} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm font-semibold mb-1 font-mono">{g.gene}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{g.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-2">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0">✓</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.devTitle}</h2>
        <div className="space-y-3">
          {d.devStages.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.stage}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.events}</p>
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
