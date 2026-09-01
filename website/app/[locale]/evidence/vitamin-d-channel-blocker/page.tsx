import type { Metadata } from "next";
import Link from "next/link";
import { Sun } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Vitamin D: Nature's Channel Blocker",
    subtitle: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C and CACNA1D mRNA — the same L-type VGCCs that EMF activates. Vitamin D deficiency leaves VGCCs over-expressed, creating the same vulnerable state as chronic EMF exposure. This makes vitamin D the 10th BERM moderator.",
    backLink: "← Back to Evidence",
    cautionText: "This page discusses vitamin D’s role in VGCC regulation. The transcriptional effects of vitamin D on CACNA1C/1D are established in the literature. The implications for EMF sensitivity are a BERM hypothesis.",

    tripleTitle: "Triple strike hypothesis",
    tripleLead: "Three independent pathways converge on the same endpoint: excessive Ca²⁺ influx through L-type VGCCs.",
    tripleStrikes: [
      { strike: "Strike 1: GENETIC", detail: "CACNA1C risk variants (GWAS: schizophrenia, bipolar, ASD) → Cav1.2 function↑" },
      { strike: "Strike 2: ENVIRONMENTAL", detail: "EMF → VGCC activation → Ca²⁺↑ (the core BERM mechanism)" },
      { strike: "Strike 3: NUTRITIONAL", detail: "Vitamin D deficiency → CACNA1C/1D mRNA over-expressed → more VGCCs on membrane → more Ca²⁺ per photon" },
    ],

    transTitle: "The transcriptional evidence",
    transLead: "Vitamin D receptor (VDR) directly controls L-type VGCC gene expression.",
    transPoints: [
      { finding: "VDR silences CACNA1C and CACNA1D transcription", detail: "VDR (vitamin D receptor) directly silences CACNA1C and CACNA1D transcription, reducing L-type VGCC density on the cell membrane (J Neurosci 2001)." },
      { finding: "VDR silencing → Cav1.2/Cav1.3 upregulation", detail: "VDR silencing prevents Cav1.2/Cav1.3 downregulation → NGF↓. Loss of vitamin D signaling removes the brake on VGCC expression (PLoS ONE 2011)." },
      { finding: "Neonatal vitamin D deficiency + CACNA1C variants", detail: "Neonatal vitamin D deficiency and CACNA1C variants converge on schizophrenia risk — gene-environment interaction on the same channel (Transl Psychiatry 2019)." },
      { finding: "Genomic and non-genomic pathways", detail: "1,25D modulates L-type VDCCs in cortical neurons through both genomic (transcriptional) and non-genomic (rapid membrane signaling) pathways, providing dual control over calcium influx." },
    ],

    modTitle: "The 10th moderator",
    modLead: "BERM’s moderator list grows: vitamin D status determines individual VGCC density and therefore EMF vulnerability.",
    modPoints: [
      { point: "Moderator list expansion", detail: "BERM’s moderators: laji, kesto, pulsaatio, genotyyppi, vuodenaika, ikä, EMF-tyyppi, raskasmetallit, nikotiini → now add D-vitamiini." },
      { point: "Individual variation explained", detail: "Vitamin D status explains individual variation in EMF sensitivity. Two people in the same EMF environment can have different VGCC densities — and therefore different Ca²⁺ loads — based on their vitamin D levels alone." },
      { point: "Seasonal patterns", detail: "Seasonal vitamin D variation may explain seasonal patterns in EMF-related symptoms. Winter = low vitamin D = high VGCC expression = greater EMF vulnerability." },
      { point: "Population-level vulnerability", detail: "Population-level vitamin D deficiency (~40% globally) = population-level VGCC over-expression. This is a modifiable risk factor at scale." },
    ],

    clinTitle: "Clinical implications",
    clinLead: "Vitamin D repletion as a protective intervention against EMF vulnerability.",
    clinPoints: [
      { implication: "Testable intervention", detail: "Vitamin D repletion could reduce EMF vulnerability by downregulating VGCC expression — a directly testable prediction (E-NEW-28)." },
      { implication: "Triple hit model", detail: "Low vitamin D + CACNA1C variant + high EMF = triple hit. This three-factor convergence model predicts highest risk for conditions like schizophrenia (E-NEW-31)." },
      { implication: "Realistic protection", detail: "Vitamin D is cheap, safe, and widely available — a realistic protective intervention. Unlike reducing EMF exposure (infrastructure-dependent), vitamin D supplementation is individually actionable." },
    ],

    predictionText: "Prediction E-NEW-28: Vitamin D repletion in deficient individuals reduces VGCC expression and attenuates EMF-induced Ca²⁺ influx. Prediction E-NEW-29: Populations with higher vitamin D status show lower prevalence of EMF-associated symptom clusters.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "D-vitamiini: Luonnon kanavasalpaaja",
    subtitle: "D-vitamiini (1,25(OH)₂D₃) vaimentaa CACNA1C- ja CACNA1D-mRNA:ta — samoja L-tyypin VGCC-kanavia, joita EMF aktivoi. D-vitamiinin puutos jättää VGCC:t yliekspressoituneiksi, luoden saman haavoittuvan tilan kuin krooninen EMF-altistus. Tämä tekee D-vitamiinista BERM:n 10. moderaattorin.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu käsittelee D-vitamiinin roolia VGCC-säätelyssä. D-vitamiinin transkriptionaaliset vaikutukset CACNA1C/1D:hen ovat vakiintuneita kirjallisuudessa. Vaikutukset EMF-herkkyyteen ovat BERM-hypoteesi.",

    tripleTitle: "Kolmoisiskuhypoteesi",
    tripleLead: "Kolme itsenäistä reittiä yhtyy samaan päätepisteeseen: liiallinen Ca²⁺-sisäänvirtaus L-tyypin VGCC:iden kautta.",
    tripleStrikes: [
      { strike: "Isku 1: GENEETTINEN", detail: "CACNA1C-riskivariantit (GWAS: skitsofrenia, kaksisuuntainen mielialahäiriö, ASD) → Cav1.2-toiminta↑" },
      { strike: "Isku 2: YMPÄRISTÖLLINEN", detail: "EMF → VGCC-aktivaatio → Ca²⁺↑ (BERM:n ydinmekanismi)" },
      { strike: "Isku 3: RAVITSEMUKSELLINEN", detail: "D-vitamiinin puutos → CACNA1C/1D-mRNA yliekspressoitunut → enemmän VGCC:itä kalvolla → enemmän Ca²⁺:ta per fotoni" },
    ],

    transTitle: "Transkriptionaalinen näyttö",
    transLead: "D-vitamiinireseptori (VDR) kontrolloi suoraan L-tyypin VGCC-geenien ilmentymistä.",
    transPoints: [
      { finding: "VDR vaimentaa CACNA1C:n ja CACNA1D:n transkription", detail: "VDR (D-vitamiinireseptori) vaimentaa suoraan CACNA1C:n ja CACNA1D:n transkription, vähentäen L-tyypin VGCC-tiheyttyä solukalvolla (J Neurosci 2001)." },
      { finding: "VDR:n vaimentaminen → Cav1.2/Cav1.3-ylössäätely", detail: "VDR:n vaimentaminen estää Cav1.2/Cav1.3-alassäätelyn → NGF↓. D-vitamiinisignaloinnin menetys poistaa jarrun VGCC-ekspressiolta (PLoS ONE 2011)." },
      { finding: "Neonataali D-vitamiinipuutos + CACNA1C-variantit", detail: "Neonataali D-vitamiinipuutos ja CACNA1C-variantit konvergoituvat skitsofreniariskiin — geeni-ympäristö-vuorovaikutus samassa kanavassa (Transl Psychiatry 2019)." },
      { finding: "Genomiset ja ei-genomiset reitit", detail: "1,25D säätelee L-tyypin VDCC:itä kortikaalisissa neuroneissa sekä genomisten (transkriptionaalisten) että ei-genomisten (nopea kalvosignalointi) reittien kautta, tarjoten kaksoishallinnan kalsiumsisäänvirtaukselle." },
    ],

    modTitle: "10. moderaattori",
    modLead: "BERM:n moderaattorilista kasvaa: D-vitamiinitaso määrittää yksilöllisen VGCC-tiheyden ja siten EMF-haavoittuvuuden.",
    modPoints: [
      { point: "Moderaattorilistan laajennus", detail: "BERM:n moderaattorit: laji, kesto, pulsaatio, genotyyppi, vuodenaika, ikä, EMF-tyyppi, raskasmetallit, nikotiini → nyt lisätään D-vitamiini." },
      { point: "Yksilöllinen vaihtelu selitettynä", detail: "D-vitamiinitaso selittää yksilöllistä vaihtelua EMF-herkkyydessä. Kaksi ihmistä samassa EMF-ympäristössä voi omata eri VGCC-tiheydet — ja siten eri Ca²⁺-kuormat — pelkästään D-vitamiinitasonsa perusteella." },
      { point: "Kausittaiset kaavat", detail: "D-vitamiinin kausittainen vaihtelu voi selittää kausittaiset kaavat EMF-liitteisissä oireissa. Talvi = matala D-vitamiini = korkea VGCC-ekspressio = suurempi EMF-haavoittuvuus." },
      { point: "Väestötason haavoittuvuus", detail: "Väestötason D-vitamiinipuutos (~40 % maailmanlaajuisesti) = väestötason VGCC-yliekspressio. Tämä on muokattavissa oleva riskitekijä laajassa mittakaavassa." },
    ],

    clinTitle: "Kliiniset seuraukset",
    clinLead: "D-vitamiinin täydennys suojaavana interventiona EMF-haavoittuvuutta vastaan.",
    clinPoints: [
      { implication: "Testattava interventio", detail: "D-vitamiinin täydennys voisi vähentää EMF-haavoittuvuutta VGCC-ekspression alassäätelyn kautta — suoraan testattava ennuste (E-NEW-28)." },
      { implication: "Kolmoisiskumalli", detail: "Matala D-vitamiini + CACNA1C-variantti + korkea EMF = kolmoisosu. Tämä kolmen tekijän yhdentymismalli ennustaa suurimman riskin tiloille kuten skitsofrenia (E-NEW-31)." },
      { implication: "Realistinen suojaus", detail: "D-vitamiini on halpaa, turvallista ja laajalti saatavilla — realistinen suojaava interventio. Toisin kuin EMF-altistuksen vähentäminen (infrastruktuuririippuvaista), D-vitamiinilisä on yksilöllisesti toteutettavissa." },
    ],

    predictionText: "Ennuste E-NEW-28: D-vitamiinin täydennys puutostilaisilla yksilöillä vähentää VGCC-ekspressiota ja vaimentaa EMF-aiheutettua Ca²⁺-sisäänvirtausta. Ennuste E-NEW-29: Väestöillä joilla on korkeampi D-vitamiinitaso, on matalampi EMF-liitteisten oireklustereiden esiintyvyys.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
  ja: {
    title: "ビタミンD：自然のチャネルブロッカー",
    subtitle: "ビタミンD（1,25(OH)₂D₃）はCACNA1CおよびCACNA1D mRNAを下方制御します — EMFが活性化するのと同じL型VGCCです。ビタミンD欠乏はVGCCを過剰発現のまま放置し、慢性EMF曝露と同じ脆弱な状態を作り出します。これによりビタミンDはBERMの第10の調節因子となります。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページではVGCC制御におけるビタミンDの役割を議論します。ビタミンDのCACNA1C/1Dに対する転写効果は文献で確立されています。EMF感受性への影響はBERM仮説です。",

    tripleTitle: "三重打撃仮説",
    tripleLead: "3つの独立した経路が同じ終点に収束します：L型VGCCを通じた過剰なCa²⁺流入。",
    tripleStrikes: [
      { strike: "打撃1：遺伝的", detail: "CACNA1Cリスクバリアント（GWAS：統合失調症、双極性障害、ASD）→ Cav1.2機能↑" },
      { strike: "打撃2：環境的", detail: "EMF → VGCC活性化 → Ca²⁺↑（BERMの核心メカニズム）" },
      { strike: "打撃3：栄養的", detail: "ビタミンD欠乏 → CACNA1C/1D mRNA過剰発現 → 膜上のVGCC増加 → フォトンあたりのCa²⁺増加" },
    ],

    transTitle: "転写レベルのエビデンス",
    transLead: "ビタミンD受容体（VDR）はL型VGCC遺伝子発現を直接制御します。",
    transPoints: [
      { finding: "VDRはCACNA1CおよびCACNA1Dの転写を抑制する", detail: "VDR（ビタミンD受容体）はCACNA1CおよびCACNA1Dの転写を直接抑制し、細胞膜上のL型VGCC密度を低下させます（J Neurosci 2001）。" },
      { finding: "VDR抑制 → Cav1.2/Cav1.3上方制御", detail: "VDR抑制はCav1.2/Cav1.3の下方制御を妨げる → NGF↓。ビタミンDシグナリングの喪失はVGCC発現のブレーキを取り除きます（PLoS ONE 2011）。" },
      { finding: "新生児ビタミンD欠乏 + CACNA1Cバリアント", detail: "新生児ビタミンD欠乏とCACNA1Cバリアントは統合失調症リスクに収束します — 同じチャネルにおける遺伝子-環境相互作用（Transl Psychiatry 2019）。" },
      { finding: "ゲノム経路と非ゲノム経路", detail: "1,25Dは皮質ニューロンにおけるL型VDCCをゲノム（転写）および非ゲノム（急速な膜シグナリング）経路の両方を通じて調節し、カルシウム流入に対する二重制御を提供します。" },
    ],

    modTitle: "第10の調節因子",
    modLead: "BERMの調節因子リストが拡大：ビタミンD状態が個人のVGCC密度、したがってEMF脆弱性を決定します。",
    modPoints: [
      { point: "調節因子リストの拡大", detail: "BERMの調節因子：種、期間、パルス、遺伝子型、季節、年齢、EMF型、重金属、ニコチン → ビタミンDを追加。" },
      { point: "個人差の説明", detail: "ビタミンD状態はEMF感受性の個人差を説明します。同じEMF環境にいる2人が、ビタミンDレベルのみに基づいて異なるVGCC密度 — したがって異なるCa²⁺負荷 — を持ち得ます。" },
      { point: "季節的パターン", detail: "ビタミンDの季節変動はEMF関連症状の季節的パターンを説明し得ます。冬 = 低ビタミンD = 高VGCC発現 = より大きなEMF脆弱性。" },
      { point: "集団レベルの脆弱性", detail: "集団レベルのビタミンD欠乏（全世界で約40%）= 集団レベルのVGCC過剰発現。これは大規模に修正可能なリスク因子です。" },
    ],

    clinTitle: "臨床的意義",
    clinLead: "EMF脆弱性に対する保護的介入としてのビタミンD補充。",
    clinPoints: [
      { implication: "検証可能な介入", detail: "ビタミンD補充はVGCC発現の下方制御によりEMF脆弱性を低減できる可能性があります — 直接検証可能な予測（E-NEW-28）。" },
      { implication: "三重打撃モデル", detail: "低ビタミンD + CACNA1Cバリアント + 高EMF = 三重打撃。この三因子収束モデルは統合失調症のような状態に対する最高リスクを予測します（E-NEW-31）。" },
      { implication: "現実的な保護", detail: "ビタミンDは安価で安全であり広く入手可能です — 現実的な保護的介入。EMF曝露の削減（インフラ依存）とは異なり、ビタミンDサプリメントは個人で実行可能です。" },
    ],

    predictionText: "予測E-NEW-28：欠乏状態の個人におけるビタミンD補充はVGCC発現を低下させ、EMF誘発Ca²⁺流入を減弱させる。予測E-NEW-29：ビタミンD状態がより高い集団は、EMF関連症状クラスターの有病率がより低い。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
  },
  fr: {
    title: "Vitamine D : le bloqueur de canaux naturel",
    subtitle: "La vitamine D (1,25(OH)₂D₃) régule négativement l'ARNm de CACNA1C et CACNA1D — les mêmes VGCC de type L que l'EMF active. La carence en vitamine D laisse les VGCC surexprimés, créant le même état vulnérable que l'exposition chronique aux EMF. Cela fait de la vitamine D le 10e modérateur du BERM.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page discute du rôle de la vitamine D dans la régulation des VGCC. Les effets transcriptionnels de la vitamine D sur CACNA1C/1D sont établis dans la littérature. Les implications pour la sensibilité aux EMF sont une hypothèse BERM.",

    tripleTitle: "Hypothèse de la triple frappe",
    tripleLead: "Trois voies indépendantes convergent vers le même point final : un influx excessif de Ca²⁺ par les VGCC de type L.",
    tripleStrikes: [
      { strike: "Frappe 1 : GÉNÉTIQUE", detail: "Variants de risque CACNA1C (GWAS : schizophrénie, trouble bipolaire, TSA) → fonction Cav1.2↑" },
      { strike: "Frappe 2 : ENVIRONNEMENTALE", detail: "EMF → activation des VGCC → Ca²⁺↑ (le mécanisme central du BERM)" },
      { strike: "Frappe 3 : NUTRITIONNELLE", detail: "Carence en vitamine D → ARNm CACNA1C/1D surexprimé → plus de VGCC sur la membrane → plus de Ca²⁺ par photon" },
    ],

    transTitle: "Les preuves transcriptionnelles",
    transLead: "Le récepteur de la vitamine D (VDR) contrôle directement l'expression des gènes des VGCC de type L.",
    transPoints: [
      { finding: "Le VDR réduit la transcription de CACNA1C et CACNA1D", detail: "Le VDR (récepteur de la vitamine D) réduit directement la transcription de CACNA1C et CACNA1D, diminuant la densité des VGCC de type L sur la membrane cellulaire (J Neurosci 2001)." },
      { finding: "Extinction du VDR → régulation positive de Cav1.2/Cav1.3", detail: "L'extinction du VDR empêche la régulation négative de Cav1.2/Cav1.3 → NGF↓. La perte de signalisation de la vitamine D supprime le frein sur l'expression des VGCC (PLoS ONE 2011)." },
      { finding: "Carence néonatale en vitamine D + variants CACNA1C", detail: "La carence néonatale en vitamine D et les variants CACNA1C convergent vers le risque de schizophrénie — interaction gène-environnement sur le même canal (Transl Psychiatry 2019)." },
      { finding: "Voies génomiques et non génomiques", detail: "La 1,25D module les VDCC de type L dans les neurones corticaux par des voies à la fois génomiques (transcriptionnelles) et non génomiques (signalisation membranaire rapide), offrant un double contrôle sur l'influx calcique." },
    ],

    modTitle: "Le 10e modérateur",
    modLead: "La liste des modérateurs du BERM s'allonge : le statut en vitamine D détermine la densité individuelle de VGCC et donc la vulnérabilité aux EMF.",
    modPoints: [
      { point: "Extension de la liste des modérateurs", detail: "Modérateurs du BERM : espèce, durée, pulsation, génotype, saison, âge, type d'EMF, métaux lourds, nicotine → ajout de la vitamine D." },
      { point: "Variation individuelle expliquée", detail: "Le statut en vitamine D explique la variation individuelle de la sensibilité aux EMF. Deux personnes dans le même environnement EMF peuvent avoir des densités de VGCC différentes — et donc des charges de Ca²⁺ différentes — en fonction de leur seul niveau de vitamine D." },
      { point: "Schémas saisonniers", detail: "La variation saisonnière de la vitamine D peut expliquer les schémas saisonniers des symptômes liés aux EMF. Hiver = vitamine D basse = expression élevée des VGCC = plus grande vulnérabilité aux EMF." },
      { point: "Vulnérabilité à l'échelle de la population", detail: "Carence en vitamine D à l'échelle de la population (~40 % mondialement) = surexpression des VGCC à l'échelle de la population. Il s'agit d'un facteur de risque modifiable à grande échelle." },
    ],

    clinTitle: "Implications cliniques",
    clinLead: "La réplétion en vitamine D comme intervention protectrice contre la vulnérabilité aux EMF.",
    clinPoints: [
      { implication: "Intervention testable", detail: "La réplétion en vitamine D pourrait réduire la vulnérabilité aux EMF en régulant négativement l'expression des VGCC — une prédiction directement testable (E-NEW-28)." },
      { implication: "Modèle de triple frappe", detail: "Vitamine D basse + variant CACNA1C + EMF élevé = triple frappe. Ce modèle de convergence à trois facteurs prédit le risque le plus élevé pour des conditions comme la schizophrénie (E-NEW-31)." },
      { implication: "Protection réaliste", detail: "La vitamine D est bon marché, sûre et largement disponible — une intervention protectrice réaliste. Contrairement à la réduction de l'exposition aux EMF (dépendante de l'infrastructure), la supplémentation en vitamine D est réalisable individuellement." },
    ],

    predictionText: "Prédiction E-NEW-28 : la réplétion en vitamine D chez les individus carencés réduit l'expression des VGCC et atténue l'influx de Ca²⁺ induit par les EMF. Prédiction E-NEW-29 : les populations ayant un meilleur statut en vitamine D présentent une prévalence plus faible des groupes de symptômes associés aux EMF.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
  },
  ko: {
    title: "비타민 D: 자연의 채널 차단제",
    subtitle: "비타민 D(1,25(OH)₂D₃)는 CACNA1C 및 CACNA1D mRNA를 하향 조절합니다 — EMF가 활성화하는 동일한 L형 VGCC입니다. 비타민 D 결핍은 VGCC를 과발현 상태로 방치하여 만성 EMF 노출과 동일한 취약 상태를 만듭니다. 이로 인해 비타민 D는 BERM의 10번째 조절인자가 됩니다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 VGCC 조절에서 비타민 D의 역할을 논의합니다. 비타민 D의 CACNA1C/1D에 대한 전사 효과는 문헌에서 확립되어 있습니다. EMF 감수성에 대한 함의는 BERM 가설입니다.",

    tripleTitle: "삼중 타격 가설",
    tripleLead: "세 가지 독립적인 경로가 동일한 종점으로 수렴합니다: L형 VGCC를 통한 과도한 Ca²⁺ 유입.",
    tripleStrikes: [
      { strike: "타격 1: 유전적", detail: "CACNA1C 위험 변이(GWAS: 조현병, 양극성 장애, ASD) → Cav1.2 기능↑" },
      { strike: "타격 2: 환경적", detail: "EMF → VGCC 활성화 → Ca²⁺↑ (BERM의 핵심 메커니즘)" },
      { strike: "타격 3: 영양적", detail: "비타민 D 결핍 → CACNA1C/1D mRNA 과발현 → 막에 더 많은 VGCC → 광자당 더 많은 Ca²⁺" },
    ],

    transTitle: "전사 수준의 증거",
    transLead: "비타민 D 수용체(VDR)는 L형 VGCC 유전자 발현을 직접 제어합니다.",
    transPoints: [
      { finding: "VDR은 CACNA1C와 CACNA1D의 전사를 억제한다", detail: "VDR(비타민 D 수용체)은 CACNA1C와 CACNA1D의 전사를 직접 억제하여 세포막의 L형 VGCC 밀도를 감소시킵니다(J Neurosci 2001)." },
      { finding: "VDR 억제 → Cav1.2/Cav1.3 상향 조절", detail: "VDR 억제는 Cav1.2/Cav1.3의 하향 조절을 방해합니다 → NGF↓. 비타민 D 신호 전달의 상실은 VGCC 발현에 대한 제동을 제거합니다(PLoS ONE 2011)." },
      { finding: "신생아 비타민 D 결핍 + CACNA1C 변이", detail: "신생아 비타민 D 결핍과 CACNA1C 변이는 조현병 위험으로 수렴합니다 — 동일한 채널에서의 유전자-환경 상호작용(Transl Psychiatry 2019)." },
      { finding: "게놈 및 비게놈 경로", detail: "1,25D는 게놈(전사) 및 비게놈(빠른 막 신호 전달) 경로 모두를 통해 피질 뉴런의 L형 VDCC를 조절하여 칼슘 유입에 대한 이중 제어를 제공합니다." },
    ],

    modTitle: "10번째 조절인자",
    modLead: "BERM의 조절인자 목록이 확대됩니다: 비타민 D 상태가 개인의 VGCC 밀도, 따라서 EMF 취약성을 결정합니다.",
    modPoints: [
      { point: "조절인자 목록 확대", detail: "BERM의 조절인자: 종, 기간, 펄스, 유전자형, 계절, 나이, EMF 유형, 중금속, 니코틴 → 이제 비타민 D 추가." },
      { point: "개인 변이 설명", detail: "비타민 D 상태는 EMF 감수성의 개인 변이를 설명합니다. 동일한 EMF 환경에 있는 두 사람이 비타민 D 수준만으로 다른 VGCC 밀도 — 따라서 다른 Ca²⁺ 부하 — 를 가질 수 있습니다." },
      { point: "계절적 패턴", detail: "비타민 D의 계절 변동은 EMF 관련 증상의 계절적 패턴을 설명할 수 있습니다. 겨울 = 낮은 비타민 D = 높은 VGCC 발현 = 더 큰 EMF 취약성." },
      { point: "인구 수준의 취약성", detail: "인구 수준의 비타민 D 결핍(전 세계적으로 약 40%) = 인구 수준의 VGCC 과발현. 이것은 대규모로 수정 가능한 위험 인자입니다." },
    ],

    clinTitle: "임상적 함의",
    clinLead: "EMF 취약성에 대한 보호적 개입으로서의 비타민 D 보충.",
    clinPoints: [
      { implication: "검증 가능한 개입", detail: "비타민 D 보충은 VGCC 발현의 하향 조절을 통해 EMF 취약성을 감소시킬 수 있습니다 — 직접 검증 가능한 예측(E-NEW-28)." },
      { implication: "삼중 타격 모델", detail: "낮은 비타민 D + CACNA1C 변이 + 높은 EMF = 삼중 타격. 이 세 인자 수렴 모델은 조현병과 같은 상태에 대한 최고 위험을 예측합니다(E-NEW-31)." },
      { implication: "현실적인 보호", detail: "비타민 D는 저렴하고 안전하며 널리 이용 가능합니다 — 현실적인 보호적 개입. EMF 노출 감소(인프라 의존적)와 달리 비타민 D 보충은 개인적으로 실행 가능합니다." },
    ],

    predictionText: "예측 E-NEW-28: 결핍 상태의 개인에서 비타민 D 보충은 VGCC 발현을 감소시키고 EMF 유도 Ca²⁺ 유입을 감쇠시킨다. 예측 E-NEW-29: 비타민 D 상태가 더 높은 인구는 EMF 관련 증상 클러스터의 유병률이 더 낮다.",
    predictionLink: "최종 계층 예측 보기 →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function VitaminDChannelBlockerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Sun} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.tripleTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.tripleLead}</p>
        <div className="space-y-3">
          {d.tripleStrikes.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.strike}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.transTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.transLead}</p>
        <div className="space-y-3">
          {d.transPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.finding}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.modTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.modLead}</p>
        <div className="space-y-3">
          {d.modPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.point}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.clinTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.clinLead}</p>
        <div className="space-y-3">
          {d.clinPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.implication}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.detail}</p>
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
