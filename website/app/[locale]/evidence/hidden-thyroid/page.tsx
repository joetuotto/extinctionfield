import type { Metadata } from "next";
import Link from "next/link";
import { Thermometer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Hidden Thyroid: The Dio2/Dio3 Disruption",
    subtitle: "EMF reduces hypothalamic Dio2 and Dio3 deiodinase enzymes that convert T4 to active T3. Standard thyroid tests (TSH, T4) appear normal, masking a tissue-level T3 deficiency. The FT3/FT4 ratio is the diagnostic key.",
    backLink: "← Back to Evidence",
    cautionText: "This page connects EMF to thyroid hormone conversion disruption. The Dio2/Dio3 reduction from EMF is experimentally demonstrated in animal models ([[ref:lte_thyroid_2024|PMC11507962]]). The human occupational data ([[ref:elf_thyroid_2022|PMID:35963949]]) showing FT3↓ with FT4↑ is consistent. The clinical prediction (FT3/FT4 ratio as diagnostic) requires direct testing.",

    mechTitle: "The mechanism",
    mechLead: "Thyroid function depends on local conversion of inactive T4 to active T3 by deiodinase enzymes. EMF disrupts this conversion.",
    mechSteps: [
      { step: "1. EMF exposure reduces hypothalamic Dio2 and Dio3", detail: "LTE (4G) EMF in young mice significantly reduces Dio2 and Dio3 deiodinase enzyme expression in the hypothalamus ([[ref:lte_thyroid_2024|PMC11507962]] 2024). These enzymes convert T4 → T3 (Dio2) and inactivate T4/T3 (Dio3). Both are suppressed." },
      { step: "2. T4 → T3 conversion is impaired", detail: "With Dio2↓, less T4 is converted to active T3 in target tissues. Blood T4 remains normal or slightly elevated (nothing is removing it). TSH may remain normal through negative feedback from circulating T4. Standard thyroid panel looks 'fine'." },
      { step: "3. Tissue T3 deficiency despite 'normal' blood tests", detail: "Tissues that depend on local T3 production (brain, muscle, adipose) are T3-deficient. Symptoms of hypothyroidism appear: fatigue, brain fog, weight gain, cold intolerance, depression. But standard tests show normal TSH and T4, so physicians find no thyroid disorder." },
      { step: "4. FT3/FT4 ratio reveals the hidden deficiency", detail: "The ratio of free T3 to free T4 (FT3/FT4) drops. Normal FT3/FT4 is approximately 0.25-0.35. In hidden hypothyroidism: FT3 is low-normal while FT4 is mid-to-high-normal → ratio decreases below 0.20. This ratio is currently NOT part of standard thyroid screening." },
    ],

    occTitle: "Occupational evidence",
    occLead: "Human occupational data supports the mechanism.",
    occPoints: [
      "Long-term ELF-EMF exposure in humans: FT3 decreases slowly while FT4 increases slowly over time ([[ref:elf_thyroid_2022|PMID:35963949]] 2022)",
      "This pattern is EXACTLY what Dio2↓ predicts: less T4→T3 conversion = FT3↓ + FT4 accumulation",
      "Shift work × ELF × noise interaction effect on T4 levels ([[ref:thyroid_shift_2024|ScienceDirect 2024]]) — combined environmental exposures affect thyroid function",
      "The slow temporal change explains why cross-sectional studies may miss the effect: it develops over years of exposure",
    ],

    symptTitle: "Symptom overlap",
    symptLead: "Hidden hypothyroidism symptoms overlap with common modern complaints — often dismissed as 'stress' or 'aging'.",
    symptoms: [
      { symptom: "Fatigue", thyroid: "Classic hypothyroid symptom (T3 drives cellular metabolism)", berm: "Also EMF → melatonin↓ → sleep disruption (VK1-VK3)" },
      { symptom: "Brain fog / cognitive decline", thyroid: "T3 is essential for neuronal function and myelination", berm: "Also EMF → OPC myelination↓ (VK20) and BDNF↓ (VK23)" },
      { symptom: "Weight gain", thyroid: "T3 regulates basal metabolic rate and BAT thermogenesis", berm: "Also EMF → Klimentidis mechanism (BAT→WAT, VK15)" },
      { symptom: "Depression", thyroid: "T3 deficiency is a known cause of treatment-resistant depression", berm: "Also EMF → DA↓ (VK19) and melatonin↓ → serotonin pathway" },
      { symptom: "Cold intolerance", thyroid: "T3 drives thermoregulation", berm: "Also EMF → BAT thermogenesis↓ (VK15)" },
    ],
    symptConclusion: "Every major symptom of hidden hypothyroidism has a SECOND BERM mechanism producing the same complaint. The patient experiences the combined effect; the physician sees 'normal thyroid' on the standard panel.",

    diagTitle: "The diagnostic proposal",
    diagBody: "Add FT3/FT4 ratio to standard thyroid screening, especially for patients with hypothyroid symptoms and normal TSH/T4. A ratio below 0.20 suggests tissue-level T3 deficiency despite normal circulating T4. Occupational medicine should track this ratio longitudinally in high-EMF workers.",

    networkTitle: "Network position",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "Hypothalamic deiodinase disruption → neuroendocrine axis (HPT sits alongside HPA and HPG in the hypothalamus)" },
      { bridge: "VK26 → VK27", detail: "Thyroid hormone is an epigenetic regulator → Dio2/Dio3↓ alters developmental epigenetic programming" },
      { bridge: "VK26 → VK15", detail: "T3 drives BAT thermogenesis → hidden T3↓ amplifies the Klimentidis obesity mechanism" },
      { bridge: "VK26 → VK19", detail: "T3 modulates dopamine metabolism → hidden T3↓ amplifies DA↓ → depression/anhedonia" },
    ],

    predictionText: "Prediction E-NEW-9: FT3/FT4 ratio is lower in high-EMF workers (telecom, electricians) vs matched low-EMF controls, despite normal TSH and T4. Testable immediately with an occupational cohort study.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
    tableHeaders: { symptom: "Symptom", thyroid: "Thyroid mechanism", berm: "BERM mechanism" },
  },
  fi: {
    title: "Piilevä kilpirauhanen: Dio2/Dio3-häiriö",
    subtitle: "EMF vähentää hypotalamuksen Dio2- ja Dio3-dejodinaasientsyymejä jotka muuntavat T4:n aktiiviseksi T3:ksi. Normaalit kilpirauhastestit (TSH, T4) näyttävät normaaleilta, peittäen kudostason T3-puutteen. FT3/FT4-suhde on diagnostinen avain.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu yhdistää EMF:n kilpirauhashormonin konversiohäiriöön. Dio2/Dio3-väheneminen EMF:stä on kokeellisesti osoitettu eläinmalleissa ([[ref:lte_thyroid_2024|PMC11507962]]). Ihmisten työperäinen data ([[ref:elf_thyroid_2022|PMID:35963949]]) osoittaa FT3↓ ja FT4↑ konsistentisti. Kliininen ennuste (FT3/FT4-suhde diagnostiikkana) vaatii suoraa testausta.",

    mechTitle: "Mekanismi",
    mechLead: "Kilpirauhasen toiminta riippuu inaktiivisen T4:n paikallisesta muuntamisesta aktiiviseksi T3:ksi dejodinaasientsyymien avulla. EMF häiritsee tätä muuntamista.",
    mechSteps: [
      { step: "1. EMF-altistus vähentää hypotalamuksen Dio2:ta ja Dio3:a", detail: "LTE (4G) EMF nuorilla hiirillä vähentää merkittävästi Dio2- ja Dio3-dejodinaasientsyymien ekspressiota hypotalamuksessa ([[ref:lte_thyroid_2024|PMC11507962]] 2024). Nämä entsyymit muuntavat T4 → T3 (Dio2) ja inaktivoivat T4/T3:n (Dio3). Molemmat ovat supressoituja." },
      { step: "2. T4 → T3 -muunnos on häiriintynyt", detail: "Dio2↓:n myötä vähemmän T4:ää muuntuu aktiiviseksi T3:ksi kohdekudoksissa. Veren T4 pysyy normaalina tai hieman kohonneena (mikään ei poista sitä). TSH voi pysyä normaalina kiertävän T4:n negatiivisen palautteen kautta. Normaali kilpirauhastutkimus näyttää 'hyvältä'." },
      { step: "3. Kudosten T3-puute 'normaaleista' verikokeista huolimatta", detail: "Kudokset jotka riippuvat paikallisesta T3-tuotannosta (aivot, lihakset, rasvakudos) ovat T3-puutteisia. Hypotyreoosin oireet ilmaantuvat: väsymys, aivosumu, painonnousu, kylmänarkuus, masennus. Mutta normaalit testit näyttävät normaalia TSH:ta ja T4:ää, joten lääkärit eivät löydä kilpirauhashäiriötä." },
      { step: "4. FT3/FT4-suhde paljastaa piilevän puutteen", detail: "Vapaan T3:n suhde vapaaseen T4:ään (FT3/FT4) laskee. Normaali FT3/FT4 on noin 0,25-0,35. Piilevässä hypotyreoosissa: FT3 on matalalla normaalilla kun FT4 on keskeltä ylänormaalille → suhde laskee alle 0,20. Tämä suhde EI OLE tällä hetkellä osa normaalia kilpirauhasseulontaa." },
    ],

    occTitle: "Työperäinen näyttö",
    occLead: "Ihmisten työperäinen data tukee mekanismia.",
    occPoints: [
      "Pitkäaikainen ELF-EMF-altistus ihmisillä: FT3 vähenee hitaasti kun FT4 kasvaa hitaasti ajan myötä ([[ref:elf_thyroid_2022|PMID:35963949]] 2022)",
      "Tämä malli on TÄSMÄLLEEN se mitä Dio2↓ ennustaa: vähemmän T4→T3-muuntamista = FT3↓ + T4-kertymä",
      "Vuorotyö × ELF × melu -yhteisvaikutus T4-tasoihin ([[ref:thyroid_shift_2024|ScienceDirect 2024]]) — yhdistetyt ympäristöaltistukset vaikuttavat kilpirauhasen toimintaan",
      "Hidas ajallinen muutos selittää miksi poikkileikkaustutkimukset voivat ohittaa vaikutuksen: se kehittyy vuosien altistuksen aikana",
    ],

    symptTitle: "Oireiden päällekkäisyys",
    symptLead: "Piilevän hypotyreoosin oireet menevät päällekkäin yleisten modernien valitusten kanssa — usein ohitetaan 'stressinä' tai 'ikääntymisenä'.",
    symptoms: [
      { symptom: "Väsymys", thyroid: "Klassinen hypotyreoosin oire (T3 ajaa solujen aineenvaihduntaa)", berm: "Myös EMF → melatoniini↓ → unihäiriö (VK1-VK3)" },
      { symptom: "Aivosumu / kognitiivinen heikentyminen", thyroid: "T3 on välttämätön neuronien toiminnalle ja myelinisaatiolle", berm: "Myös EMF → OPC-myelinisaatio↓ (VK20) ja BDNF↓ (VK23)" },
      { symptom: "Painonnousu", thyroid: "T3 säätelee basaalista aineenvaihduntaa ja BAT-lämmöntuotantoa", berm: "Myös EMF → Klimentidis-mekanismi (BAT→WAT, VK15)" },
      { symptom: "Masennus", thyroid: "T3-puute on tunnettu hoitoresistentin masennuksen syy", berm: "Myös EMF → DA↓ (VK19) ja melatoniini↓ → serotoniinireitti" },
      { symptom: "Kylmänarkuus", thyroid: "T3 ajaa lämmönsäätelyä", berm: "Myös EMF → BAT-lämmöntuotanto↓ (VK15)" },
    ],
    symptConclusion: "Jokaisella piilevän hypotyreoosin pääoireella on TOINEN BERM-mekanismi joka tuottaa saman valituksen. Potilas kokee yhdistetyn vaikutuksen; lääkäri näkee 'normaalin kilpirauhasen' normaalissa tutkimuksessa.",

    diagTitle: "Diagnostinen ehdotus",
    diagBody: "Lisää FT3/FT4-suhde normaaliin kilpirauhasseulontaan, erityisesti potilaille joilla on hypotyreoosin oireita ja normaali TSH/T4. Alle 0,20 suhde viittaa kudostason T3-puutteeseen normaalista kiertävästä T4:stä huolimatta. Työterveyslääketieteen tulisi seurata tätä suhdetta pitkittäisesti korkean EMF:n työntekijöillä.",

    networkTitle: "Verkostoasema",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "Hypotalamuksen dejodinaasihäiriö → neuroendokriininen akseli (HPT on HPA:n ja HPG:n rinnalla hypotalamuksessa)" },
      { bridge: "VK26 → VK27", detail: "Kilpirauhashormoni on epigeneettinen säätelijä → Dio2/Dio3↓ muuttaa kehityksellistä epigeneettistä ohjelmointia" },
      { bridge: "VK26 → VK15", detail: "T3 ajaa BAT-lämmöntuotantoa → piilevä T3↓ vahvistaa Klimentidis-lihavuusmekanismia" },
      { bridge: "VK26 → VK19", detail: "T3 säätelee dopamiiniaineenvaihduntaa → piilevä T3↓ vahvistaa DA↓ → masennus/anhedonia" },
    ],

    predictionText: "Ennuste E-NEW-9: FT3/FT4-suhde on matalampi korkean EMF:n työntekijöillä (telecom, sähköasentajat) verrattuna vastaaviin matalan EMF:n kontrolleihin, normaaleista TSH:sta ja T4:stä huolimatta. Testattavissa heti työperäisellä kohorttitutkimuksella.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
    tableHeaders: { symptom: "Oire", thyroid: "Kilpirauhasmekanismi", berm: "BERM-mekanismi" },
  },
  ja: {
    title: "隠れた甲状腺：Dio2/Dio3の撹乱",
    subtitle: "EMFは視床下部のDio2およびDio3脱ヨウ素酵素を減少させます。これらの酵素はT4を活性型T3に変換します。標準的な甲状腺検査（TSH、T4）は正常に見え、組織レベルのT3欠乏を覆い隠します。FT3/FT4比が診断の鍵です。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページではEMFと甲状腺ホルモン変換障害を結びつけます。EMFによるDio2/Dio3の減少は動物モデルで実験的に実証されています（[[ref:lte_thyroid_2024|PMC11507962]]）。FT3↓とFT4↑を示すヒトの職業データ（[[ref:elf_thyroid_2022|PMID:35963949]]）は一致しています。臨床的予測（FT3/FT4比による診断）は直接的な検証が必要です。",

    mechTitle: "メカニズム",
    mechLead: "甲状腺機能は脱ヨウ素酵素による不活性型T4から活性型T3への局所的変換に依存します。EMFはこの変換を撹乱します。",
    mechSteps: [
      { step: "1. EMF曝露は視床下部のDio2とDio3を減少させる", detail: "若いマウスにおけるLTE（4G）EMFは視床下部のDio2およびDio3脱ヨウ素酵素の発現を有意に減少させます（[[ref:lte_thyroid_2024|PMC11507962]] 2024）。これらの酵素はT4 → T3（Dio2）に変換し、T4/T3を不活性化（Dio3）します。両方が抑制されます。" },
      { step: "2. T4 → T3変換が障害される", detail: "Dio2↓により、標的組織でT4から活性型T3への変換が減少します。血中T4は正常または軽度上昇のまま（除去するものがない）。TSHは循環T4からの負のフィードバックにより正常に留まることがあります。標準的な甲状腺パネルは「正常」に見えます。" },
      { step: "3. 「正常な」血液検査にもかかわらず組織T3欠乏", detail: "局所T3産生に依存する組織（脳、筋肉、脂肪組織）がT3欠乏状態です。甲状腺機能低下症の症状が現れます：疲労、脳のもやもや、体重増加、寒冷不耐性、うつ病。しかし標準検査は正常なTSHとT4を示すため、医師は甲状腺障害を見つけません。" },
      { step: "4. FT3/FT4比が隠れた欠乏を明らかにする", detail: "遊離T3と遊離T4の比（FT3/FT4）が低下します。正常なFT3/FT4は約0.25-0.35です。隠れた甲状腺機能低下症では：FT3は低正常、FT4は中程度から高正常 → 比は0.20以下に低下。この比は現在、標準的な甲状腺スクリーニングの一部ではありません。" },
    ],

    occTitle: "職業上のエビデンス",
    occLead: "ヒトの職業データがメカニズムを支持します。",
    occPoints: [
      "ヒトにおける長期ELF-EMF曝露：FT3が時間とともに緩やかに減少し、FT4が緩やかに増加（[[ref:elf_thyroid_2022|PMID:35963949]] 2022）",
      "このパターンはまさにDio2↓が予測するもの：T4→T3変換の減少 = FT3↓ + FT4蓄積",
      "シフトワーク × ELF × 騒音のT4レベルへの交互作用（[[ref:thyroid_shift_2024|ScienceDirect 2024]]）— 複合環境曝露が甲状腺機能に影響",
      "緩やかな経時変化は、横断研究が効果を見逃す可能性がある理由を説明：数年の曝露で発現する",
    ],

    symptTitle: "症状の重複",
    symptLead: "隠れた甲状腺機能低下症の症状は一般的な現代の愁訴と重複します — しばしば「ストレス」や「加齢」として片付けられます。",
    symptoms: [
      { symptom: "疲労", thyroid: "典型的な甲状腺機能低下症状（T3が細胞代謝を駆動）", berm: "EMF → メラトニン↓ → 睡眠障害（VK1-VK3）も" },
      { symptom: "脳のもやもや / 認知機能低下", thyroid: "T3はニューロン機能と髄鞘形成に不可欠", berm: "EMF → OPC髄鞘形成↓（VK20）およびBDNF↓（VK23）も" },
      { symptom: "体重増加", thyroid: "T3は基礎代謝率とBAT熱産生を制御", berm: "EMF → Klimentidisメカニズム（BAT→WAT、VK15）も" },
      { symptom: "うつ病", thyroid: "T3欠乏は治療抵抗性うつ病の既知の原因", berm: "EMF → DA↓（VK19）およびメラトニン↓ → セロトニン経路も" },
      { symptom: "寒冷不耐性", thyroid: "T3が体温調節を駆動", berm: "EMF → BAT熱産生↓（VK15）も" },
    ],
    symptConclusion: "隠れた甲状腺機能低下症のすべての主要症状には、同じ愁訴を生み出す第2のBERMメカニズムがあります。患者は複合効果を経験し、医師は標準パネルで「正常な甲状腺」を見ます。",

    diagTitle: "診断提案",
    diagBody: "標準的な甲状腺スクリーニングにFT3/FT4比を追加してください。特に甲状腺機能低下症の症状があり正常なTSH/T4の患者に。0.20未満の比は、正常な循環T4にもかかわらず組織レベルのT3欠乏を示唆します。産業医学はこの比を高EMF労働者で縦断的に追跡すべきです。",

    networkTitle: "ネットワーク上の位置",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "視床下部脱ヨウ素酵素障害 → 神経内分泌軸（HPTはHPAおよびHPGと共に視床下部に位置）" },
      { bridge: "VK26 → VK27", detail: "甲状腺ホルモンはエピジェネティック制御因子 → Dio2/Dio3↓は発達エピジェネティックプログラミングを変化" },
      { bridge: "VK26 → VK15", detail: "T3がBAT熱産生を駆動 → 隠れたT3↓がKlimentidis肥満メカニズムを増幅" },
      { bridge: "VK26 → VK19", detail: "T3がドパミン代謝を調節 → 隠れたT3↓がDA↓ → うつ病/無快感症を増幅" },
    ],

    predictionText: "予測E-NEW-9：FT3/FT4比は、正常なTSHおよびT4にもかかわらず、高EMF労働者（通信、電気工事士）で低EMF対照群より低い。職業コホート研究で直ちに検証可能。",
    predictionLink: "最終層の予測を見る →",
    predictionHref: "/predictions",
    tableHeaders: { symptom: "症状", thyroid: "甲状腺メカニズム", berm: "BERMメカニズム" },
  },
  fr: {
    title: "La thyroïde cachée : la perturbation Dio2/Dio3",
    subtitle: "L'EMF réduit les enzymes déiodinases hypothalamiques Dio2 et Dio3 qui convertissent la T4 en T3 active. Les tests thyroïdiens standard (TSH, T4) apparaissent normaux, masquant une carence tissulaire en T3. Le rapport FT3/FT4 est la clé diagnostique.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page relie l'EMF à la perturbation de la conversion des hormones thyroïdiennes. La réduction de Dio2/Dio3 par l'EMF est démontrée expérimentalement dans des modèles animaux ([[ref:lte_thyroid_2024|PMC11507962]]). Les données professionnelles humaines ([[ref:elf_thyroid_2022|PMID:35963949]]) montrant FT3↓ avec FT4↑ sont cohérentes. La prédiction clinique (rapport FT3/FT4 comme diagnostic) nécessite des tests directs.",

    mechTitle: "Le mécanisme",
    mechLead: "La fonction thyroïdienne dépend de la conversion locale de la T4 inactive en T3 active par les enzymes déiodinases. L'EMF perturbe cette conversion.",
    mechSteps: [
      { step: "1. L'exposition aux EMF réduit Dio2 et Dio3 hypothalamiques", detail: "L'EMF LTE (4G) chez les jeunes souris réduit significativement l'expression des enzymes déiodinases Dio2 et Dio3 dans l'hypothalamus ([[ref:lte_thyroid_2024|PMC11507962]] 2024). Ces enzymes convertissent T4 → T3 (Dio2) et inactivent T4/T3 (Dio3). Les deux sont supprimées." },
      { step: "2. La conversion T4 → T3 est altérée", detail: "Avec Dio2↓, moins de T4 est convertie en T3 active dans les tissus cibles. La T4 sanguine reste normale ou légèrement élevée (rien ne la retire). La TSH peut rester normale par rétroaction négative de la T4 circulante. Le bilan thyroïdien standard semble « normal »." },
      { step: "3. Déficit tissulaire en T3 malgré des analyses « normales »", detail: "Les tissus qui dépendent de la production locale de T3 (cerveau, muscle, tissu adipeux) sont déficients en T3. Des symptômes d'hypothyroïdie apparaissent : fatigue, brouillard cérébral, prise de poids, intolérance au froid, dépression. Mais les tests standard montrent TSH et T4 normaux, donc les médecins ne trouvent pas de trouble thyroïdien." },
      { step: "4. Le rapport FT3/FT4 révèle le déficit caché", detail: "Le rapport T3 libre / T4 libre (FT3/FT4) diminue. Le FT3/FT4 normal est d'environ 0,25-0,35. En hypothyroïdie cachée : FT3 est dans la normale basse tandis que FT4 est dans la normale moyenne à haute → le rapport descend sous 0,20. Ce rapport ne fait actuellement PAS partie du dépistage thyroïdien standard." },
    ],

    occTitle: "Preuves professionnelles",
    occLead: "Les données professionnelles humaines soutiennent le mécanisme.",
    occPoints: [
      "Exposition à long terme aux ELF-EMF chez l'humain : FT3 diminue lentement tandis que FT4 augmente lentement au fil du temps ([[ref:elf_thyroid_2022|PMID:35963949]] 2022)",
      "Ce schéma est EXACTEMENT ce que Dio2↓ prédit : moins de conversion T4→T3 = FT3↓ + accumulation de FT4",
      "Interaction travail posté × ELF × bruit sur les niveaux de T4 ([[ref:thyroid_shift_2024|ScienceDirect 2024]]) — les expositions environnementales combinées affectent la fonction thyroïdienne",
      "Le changement temporel lent explique pourquoi les études transversales peuvent manquer l'effet : il se développe sur des années d'exposition",
    ],

    symptTitle: "Chevauchement des symptômes",
    symptLead: "Les symptômes de l'hypothyroïdie cachée chevauchent des plaintes modernes courantes — souvent rejetées comme « stress » ou « vieillissement ».",
    symptoms: [
      { symptom: "Fatigue", thyroid: "Symptôme classique d'hypothyroïdie (la T3 pilote le métabolisme cellulaire)", berm: "Aussi EMF → mélatonine↓ → perturbation du sommeil (VK1-VK3)" },
      { symptom: "Brouillard cérébral / déclin cognitif", thyroid: "La T3 est essentielle pour la fonction neuronale et la myélinisation", berm: "Aussi EMF → myélinisation OPC↓ (VK20) et BDNF↓ (VK23)" },
      { symptom: "Prise de poids", thyroid: "La T3 régule le métabolisme basal et la thermogenèse du TAB", berm: "Aussi EMF → mécanisme de Klimentidis (TAB→TABlanc, VK15)" },
      { symptom: "Dépression", thyroid: "Le déficit en T3 est une cause connue de dépression résistante au traitement", berm: "Aussi EMF → DA↓ (VK19) et mélatonine↓ → voie de la sérotonine" },
      { symptom: "Intolérance au froid", thyroid: "La T3 pilote la thermorégulation", berm: "Aussi EMF → thermogenèse du TAB↓ (VK15)" },
    ],
    symptConclusion: "Chaque symptôme majeur de l'hypothyroïdie cachée a un SECOND mécanisme BERM produisant la même plainte. Le patient ressent l'effet combiné ; le médecin voit une « thyroïde normale » au bilan standard.",

    diagTitle: "La proposition diagnostique",
    diagBody: "Ajouter le rapport FT3/FT4 au dépistage thyroïdien standard, en particulier pour les patients présentant des symptômes d'hypothyroïdie et des TSH/T4 normaux. Un rapport inférieur à 0,20 suggère un déficit tissulaire en T3 malgré une T4 circulante normale. La médecine du travail devrait suivre ce rapport longitudinalement chez les travailleurs à forte exposition aux EMF.",

    networkTitle: "Position dans le réseau",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "Perturbation des déiodinases hypothalamiques → axe neuroendocrinien (HPT côtoie HPA et HPG dans l'hypothalamus)" },
      { bridge: "VK26 → VK27", detail: "L'hormone thyroïdienne est un régulateur épigénétique → Dio2/Dio3↓ modifie la programmation épigénétique développementale" },
      { bridge: "VK26 → VK15", detail: "La T3 pilote la thermogenèse du TAB → T3↓ cachée amplifie le mécanisme d'obésité de Klimentidis" },
      { bridge: "VK26 → VK19", detail: "La T3 module le métabolisme de la dopamine → T3↓ cachée amplifie DA↓ → dépression/anhédonie" },
    ],

    predictionText: "Prédiction E-NEW-9 : le rapport FT3/FT4 est plus bas chez les travailleurs à forte exposition aux EMF (télécoms, électriciens) vs contrôles appariés à faible EMF, malgré TSH et T4 normaux. Testable immédiatement avec une étude de cohorte professionnelle.",
    predictionLink: "Voir les prédictions de la couche finale →",
    predictionHref: "/predictions",
    tableHeaders: { symptom: "Symptôme", thyroid: "Mécanisme thyroïdien", berm: "Mécanisme BERM" },
  },
  ko: {
    title: "숨겨진 갑상선: Dio2/Dio3 교란",
    subtitle: "EMF는 T4를 활성 T3로 전환하는 시상하부 Dio2 및 Dio3 탈요오드화 효소를 감소시킵니다. 표준 갑상선 검사(TSH, T4)는 정상으로 나타나 조직 수준의 T3 결핍을 은폐합니다. FT3/FT4 비율이 진단의 열쇠입니다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 EMF와 갑상선 호르몬 전환 장애를 연결합니다. EMF에 의한 Dio2/Dio3 감소는 동물 모델에서 실험적으로 입증되었습니다([[ref:lte_thyroid_2024|PMC11507962]]). FT3↓와 FT4↑을 보여주는 인간 직업 데이터([[ref:elf_thyroid_2022|PMID:35963949]])는 일관적입니다. 임상 예측(FT3/FT4 비율에 의한 진단)은 직접 검증이 필요합니다.",

    mechTitle: "메커니즘",
    mechLead: "갑상선 기능은 탈요오드화 효소에 의한 비활성 T4에서 활성 T3로의 국소적 전환에 의존합니다. EMF는 이 전환을 교란합니다.",
    mechSteps: [
      { step: "1. EMF 노출은 시상하부 Dio2와 Dio3를 감소시킨다", detail: "어린 마우스에서 LTE(4G) EMF는 시상하부에서 Dio2 및 Dio3 탈요오드화 효소 발현을 유의하게 감소시킵니다([[ref:lte_thyroid_2024|PMC11507962]] 2024). 이 효소들은 T4 → T3(Dio2)로 전환하고 T4/T3를 불활성화(Dio3)합니다. 둘 다 억제됩니다." },
      { step: "2. T4 → T3 전환이 손상된다", detail: "Dio2↓로 인해 표적 조직에서 T4에서 활성 T3로의 전환이 감소합니다. 혈중 T4는 정상 또는 약간 상승된 상태로 유지됩니다(제거하는 것이 없음). TSH는 순환 T4로부터의 음성 피드백을 통해 정상으로 유지될 수 있습니다. 표준 갑상선 패널은 '정상'으로 보입니다." },
      { step: "3. '정상' 혈액 검사에도 불구하고 조직 T3 결핍", detail: "국소 T3 생산에 의존하는 조직(뇌, 근육, 지방 조직)이 T3 결핍 상태입니다. 갑상선 기능 저하증 증상이 나타납니다: 피로, 브레인 포그, 체중 증가, 한랭 불내성, 우울증. 그러나 표준 검사는 정상 TSH와 T4를 보여주므로 의사는 갑상선 장애를 발견하지 못합니다." },
      { step: "4. FT3/FT4 비율이 숨겨진 결핍을 드러낸다", detail: "유리 T3 대 유리 T4 비율(FT3/FT4)이 감소합니다. 정상 FT3/FT4는 약 0.25-0.35입니다. 숨겨진 갑상선 기능 저하증에서: FT3는 정상 하한이고 FT4는 정상 중간~상한 → 비율이 0.20 이하로 감소합니다. 이 비율은 현재 표준 갑상선 스크리닝의 일부가 아닙니다." },
    ],

    occTitle: "직업적 증거",
    occLead: "인간 직업 데이터가 메커니즘을 뒷받침합니다.",
    occPoints: [
      "인간에서의 장기 ELF-EMF 노출: FT3가 시간에 따라 서서히 감소하고 FT4가 서서히 증가([[ref:elf_thyroid_2022|PMID:35963949]] 2022)",
      "이 패턴은 정확히 Dio2↓가 예측하는 것: T4→T3 전환 감소 = FT3↓ + FT4 축적",
      "교대 근무 × ELF × 소음의 T4 수준에 대한 상호작용 효과([[ref:thyroid_shift_2024|ScienceDirect 2024]]) — 복합 환경 노출이 갑상선 기능에 영향",
      "느린 시간적 변화는 횡단면 연구가 효과를 놓칠 수 있는 이유를 설명: 수년의 노출에 걸쳐 발생",
    ],

    symptTitle: "증상 중복",
    symptLead: "숨겨진 갑상선 기능 저하증의 증상은 흔한 현대 불만과 겹칩니다 — 종종 '스트레스' 또는 '노화'로 무시됩니다.",
    symptoms: [
      { symptom: "피로", thyroid: "전형적인 갑상선 기능 저하 증상(T3가 세포 대사를 구동)", berm: "EMF → 멜라토닌↓ → 수면 장애(VK1-VK3)도" },
      { symptom: "브레인 포그 / 인지 기능 저하", thyroid: "T3는 뉴런 기능과 수초화에 필수적", berm: "EMF → OPC 수초화↓(VK20) 및 BDNF↓(VK23)도" },
      { symptom: "체중 증가", thyroid: "T3는 기초 대사율과 BAT 열 생산을 조절", berm: "EMF → Klimentidis 메커니즘(BAT→WAT, VK15)도" },
      { symptom: "우울증", thyroid: "T3 결핍은 치료 저항성 우울증의 알려진 원인", berm: "EMF → DA↓(VK19) 및 멜라토닌↓ → 세로토닌 경로도" },
      { symptom: "한랭 불내성", thyroid: "T3가 체온 조절을 구동", berm: "EMF → BAT 열 생산↓(VK15)도" },
    ],
    symptConclusion: "숨겨진 갑상선 기능 저하증의 모든 주요 증상에는 동일한 불만을 생성하는 두 번째 BERM 메커니즘이 있습니다. 환자는 복합 효과를 경험하고, 의사는 표준 패널에서 '정상 갑상선'을 봅니다.",

    diagTitle: "진단 제안",
    diagBody: "표준 갑상선 스크리닝에 FT3/FT4 비율을 추가하세요. 특히 갑상선 기능 저하 증상이 있고 TSH/T4가 정상인 환자에게. 0.20 미만의 비율은 정상 순환 T4에도 불구하고 조직 수준의 T3 결핍을 시사합니다. 산업의학은 이 비율을 고 EMF 근로자에서 종단적으로 추적해야 합니다.",

    networkTitle: "네트워크 위치",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "시상하부 탈요오드화 효소 교란 → 신경내분비축(HPT는 시상하부에서 HPA 및 HPG와 함께 위치)" },
      { bridge: "VK26 → VK27", detail: "갑상선 호르몬은 후성유전적 조절인자 → Dio2/Dio3↓는 발달 후성유전적 프로그래밍을 변화" },
      { bridge: "VK26 → VK15", detail: "T3가 BAT 열 생산을 구동 → 숨겨진 T3↓가 Klimentidis 비만 메커니즘을 증폭" },
      { bridge: "VK26 → VK19", detail: "T3가 도파민 대사를 조절 → 숨겨진 T3↓가 DA↓ → 우울증/무쾌감증을 증폭" },
    ],

    predictionText: "예측 E-NEW-9: FT3/FT4 비율은 정상 TSH 및 T4에도 불구하고 고 EMF 근로자(통신, 전기공)에서 대응하는 저 EMF 대조군보다 낮다. 직업 코호트 연구로 즉시 검증 가능.",
    predictionLink: "최종 계층 예측 보기 →",
    predictionHref: "/predictions",
    tableHeaders: { symptom: "증상", thyroid: "갑상선 메커니즘", berm: "BERM 메커니즘" },
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function HiddenThyroidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Thermometer} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p><InlineReferenceText text={d.cautionText} locale={locale} /></p></CautionBox></div>

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
        <h2 className="text-lg font-semibold mb-2">{d.occTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.occLead}</p>
        <div className="space-y-2">
          {d.occPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p><InlineReferenceText text={p} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.symptTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.symptLead}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 px-3 font-semibold">{d.tableHeaders.symptom}</th>
                <th className="text-left py-2 px-3 font-semibold">{d.tableHeaders.thyroid}</th>
                <th className="text-left py-2 px-3 font-semibold">{d.tableHeaders.berm}</th>
              </tr>
            </thead>
            <tbody>
              {d.symptoms.map((s, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2 px-3 font-medium">{s.symptom}</td>
                  <td className="py-2 px-3 text-foreground-muted">{s.thyroid}</td>
                  <td className="py-2 px-3 text-foreground-muted">{s.berm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.symptConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.diagTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.diagBody}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.networkTitle}</h2>
        <div className="space-y-3">
          {d.networkPoints.map((n, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold font-mono mb-1">{n.bridge}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{n.detail}</p>
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
