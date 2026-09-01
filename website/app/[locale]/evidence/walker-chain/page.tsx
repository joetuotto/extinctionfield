import type { Metadata } from "next";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Walker Chain: Sleep → Testosterone → Collapse",
    subtitle: "The complete causal chain from EMF to testosterone decline via sleep is now closed. Seven verified branches form a self-amplifying loop where sleep loss simultaneously attacks testosterone through multiple independent routes.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents the closed Walker chain — a causal loop where each link has been independently verified. The complete loop prediction (superadditive combined effect) has not yet been tested in a single experiment.",

    chainTitle: "The closed loop",
    chainLead: "The Walker chain was originally identified as a linear pathway (EMF → melatonin↓ → sleep↓ → GABA↓ → Q↑). With VK25, the chain closes: sleep↓ → T↓ feeds back into neuroprotection loss, creating a self-amplifying degradation spiral.",

    branches: [
      { id: "W1", name: "EMF → melatonin↓", mechanism: "RF-EMF suppresses melatonin via CRY magnetoreception pathway and direct pineal gland effects. PGC (pineal gland calcification) further reduces melatonin capacity over time.", evidence: "CRY magnetoreception confirmed; PGC ↔ melatonin r=0.569; EMF→melatonin↓ in multiple studies", status: "confirmed" },
      { id: "W2", name: "Melatonin↓ → sleep quality↓", mechanism: "Melatonin is the primary chronobiotic hormone. Its reduction disrupts circadian entrainment, reduces sleep onset efficiency, and degrades slow-wave sleep architecture.", evidence: "Basic chronobiology; melatonin supplementation improves sleep in multiple RCTs", status: "confirmed" },
      { id: "W3", name: "Sleep↓ → GABA↓ → Q↑", mechanism: "Sleep deprivation reduces GABAergic tonic inhibition (γ decreases → Q-factor increases). This is used clinically as diagnostic provocation for epilepsy — 23-62% of patients show epileptiform discharges.", evidence: "Sleep deprivation activates epileptiform discharges (clinical); EEG studies confirm GABA↓", status: "confirmed" },
      { id: "W4", name: "Sleep↓ → T↓ (CLOSURE)", mechanism: "One week of 5-hour sleep reduces testosterone by 10-15%, equivalent to 10-15 years of aging. The effect is dose-dependent: partial restriction shows a trend (p=0.067), total deprivation is significant. This closes the Walker chain.", evidence: "JAMA 2011 (305:2173): 5h sleep → T -10-15%; meta-analysis confirms ([[ref:sleep_t_meta_2021|PMID:34801825]]); Sleep Med 2019 RCT confirms dose-response", status: "confirmed" },
      { id: "W5", name: "T↓ → neuroprotection↓", mechanism: "Testosterone provides neuroprotection via AR-mediated BDNF upregulation, anti-inflammatory effects, and synaptic maintenance. T↓ increases hippocampal vulnerability to cortisol, oxidative stress, and neuroinflammation.", evidence: "T↓ neuroprotection link verified in multiple animal models; testosterone replacement improves cognitive outcomes", status: "confirmed" },
      { id: "W6", name: "Sleep↓ → cortisol↑ → GnIH↑ → T↓", mechanism: "Sleep restriction activates the HPA axis → cortisol↑. Cortisol induces GnIH (RFRP-3) in the hypothalamus which suppresses GnRH → LH → T↓. This is a SECOND route from sleep to T↓, amplifying W4.", evidence: "RF9 (GnIH antagonist) restored T in cortisol-treated primates ([[ref:rf9_cortisol_2021|PMC7946976]]); CRF→GnRH↓ confirmed ([[ref:crf_gnrh_2013|PMC3576618]])", status: "confirmed" },
      { id: "W7", name: "Sleep↓ → Per2↓ → gut barrier↓ → neuroinflammation", mechanism: "Sleep/circadian disruption → Per2↓ in gut epithelium → tight junction degradation → LPS enters bloodstream → neuroinflammation → hippocampal neurogenesis↓. Hippocampal damage → HPA braking lost → more cortisol → more sleep disruption.", evidence: "Per2 KO → gut barrier↓ → LPS → depression ([[ref:gut_per2_2026|PMC12631932]]); circadian disruption → microbiome shift ([[ref:gut_circadian_2018|PMC5909328]])", status: "confirmed" },
    ],

    closureTitle: "Why closure matters",
    closureLead: "Before VK25, the Walker chain was a linear pathway — it stopped at GABA↓ → Q↑. Now it closes: sleep↓ → T↓ → neuroprotection↓ → hippocampus vulnerable → HPA braking lost → cortisol↑ → more sleep disruption. This means the chain is SELF-AMPLIFYING — initial sleep loss creates its own conditions for worsening. No increase in EMF exposure is required for progressive deterioration.",

    superaddTitle: "Superadditive prediction",
    superaddBody: "The closed Walker chain predicts a specific testable outcome: sleep restriction PLUS EMF exposure should produce GREATER testosterone decline than either alone (superadditive, not merely additive). Predicted: >25% T decline in the combined condition vs ~15% for sleep restriction alone. A 2×2 factorial RCT (normal/restricted sleep × low/high EMF) could test this within 3 months.",

    predictionText: "The Walker chain closure generates prediction E-NEW-6: sleep restriction + EMF produces superadditive testosterone decline.",
    predictionLink: "See supplementary layer predictions →",
    predictionHref: "/predictions",
    statusConfirmed: "✓ Confirmed",
  },
  fi: {
    title: "Walkerin ketju: Uni → Testosteroni → Romahdus",
    subtitle: "Täydellinen kausaaliketju EMF:stä testosteronin laskuun unen kautta on nyt suljettu. Seitsemän todennettua haaraa muodostavat itseään vahvistavan silmukan, jossa unen menetys hyökkää testosteronia vastaan useita itsenäisiä reittejä pitkin samanaikaisesti.",
    backLink: "← Takaisin näyttöön",
    cautionText: "Tämä sivu dokumentoi suljetun Walkerin ketjun — kausaalisilmukan, jossa jokainen linkki on todennettu itsenäisesti. Täydellisen silmukan ennustetta (superadditiivinen yhdistelmävaikutus) ei ole vielä testattu yksittäisessä kokeessa.",

    chainTitle: "Suljettu silmukka",
    chainLead: "Walkerin ketju tunnistettiin alun perin lineaarisena reittinä (EMF → melatoniini↓ → uni↓ → GABA↓ → Q↑). VK25:n myötä ketju sulkeutuu: uni↓ → T↓ palautuu takaisin neuroprotektiomenetykseen luoden itseään vahvistavan rappeutumisspiraalin.",

    branches: [
      { id: "W1", name: "EMF → melatoniini↓", mechanism: "RF-EMF vaimentaa melatoniinia CRY-magnetoreseptioreitin ja suorien pineaalirauhasvaikutusten kautta. PGC (pineaalirauhasen kalsifikaatio) vähentää melatoniinikapasiteettia ajan myötä.", evidence: "CRY-magnetoreseptio vahvistettu; PGC ↔ melatoniini r=0,569; EMF→melatoniini↓ useissa tutkimuksissa", status: "confirmed" },
      { id: "W2", name: "Melatoniini↓ → unenlaatu↓", mechanism: "Melatoniini on primäärinen kronobioottinen hormoni. Sen väheneminen häiritsee sirkadiaanista synkronointia, vähentää nukahtamistehokkuutta ja heikentää syvän unen arkkitehtuuria.", evidence: "Perus kronobiologia; melatoniinilisä parantaa unta useissa RCT:issä", status: "confirmed" },
      { id: "W3", name: "Uni↓ → GABA↓ → Q↑", mechanism: "Univaje vähentää GABAergista toonista inhibitiota (γ pienenee → Q-tekijä kasvaa). Tätä käytetään kliinisesti epilepsian diagnostisena provokaationa — 23-62 % potilaista osoittaa epileptiformisia purkauksia.", evidence: "Univaje aktivoi epileptiformisia purkauksia (kliininen); EEG-tutkimukset vahvistavat GABA↓", status: "confirmed" },
      { id: "W4", name: "Uni↓ → T↓ (SULKEMINEN)", mechanism: "Viikko 5 tunnin unta vähentää testosteronia 10-15 %, vastaten 10-15 vuoden ikääntymistä. Vaikutus on annosriippuvainen: osittainen rajoitus osoittaa trendiä (p=0,067), täydellinen deprivaatio on merkitsevä. Tämä sulkee Walkerin ketjun.", evidence: "JAMA 2011 (305:2173): 5h uni → T -10-15 %; meta-analyysi vahvistaa ([[ref:sleep_t_meta_2021|PMID:34801825]]); Sleep Med 2019 RCT vahvistaa annosvasteen", status: "confirmed" },
      { id: "W5", name: "T↓ → neuroprotektio↓", mechanism: "Testosteroni tarjoaa neuroprotektiota AR-välitteisen BDNF-ylössäätelyn, anti-inflammatoristen vaikutusten ja synaptisen ylläpidon kautta. T↓ kasvattaa hippokampuksen haavoittuvuutta kortisolille, oksidatiiviselle stressille ja neurotulehdukselle.", evidence: "T↓ neuroprotektiolinkki todennettu useissa eläinmalleissa; testosteronikorvaus parantaa kognitiivisia tuloksia", status: "confirmed" },
      { id: "W6", name: "Uni↓ → kortisoli↑ → GnIH↑ → T↓", mechanism: "Unirajoitus aktivoi HPA-akselin → kortisoli↑. Kortisoli aiheuttaa GnIH:n (RFRP-3) hypotalamuksessa joka vaimentaa GnRH → LH → T↓. Tämä on TOINEN reitti unesta T↓:iin, vahvistaen W4:ää.", evidence: "RF9 (GnIH-antagonisti) palautti T:n kortisolikäsitellyissä kädellisissä ([[ref:rf9_cortisol_2021|PMC7946976]]); CRF→GnRH↓ vahvistettu ([[ref:crf_gnrh_2013|PMC3576618]])", status: "confirmed" },
      { id: "W7", name: "Uni↓ → Per2↓ → suoliston este↓ → neurotulehdus", mechanism: "Uni/sirkadiaaninen häiriö → Per2↓ suoliston epitheelissä → tiiviin liitoksen hajoaminen → LPS pääsee verenkiertoon → neurotulehdus → hippokampaalinen neurogeneesi↓. Hippokampusvaurio → HPA-jarru menetetty → lisää kortisolia → lisää unihäiriöitä.", evidence: "Per2 KO → suoliston este↓ → LPS → masennus ([[ref:gut_per2_2026|PMC12631932]]); sirkadiaanihäiriö → mikrobiomimuutos ([[ref:gut_circadian_2018|PMC5909328]])", status: "confirmed" },
    ],

    closureTitle: "Miksi sulkeutuminen on tärkeää",
    closureLead: "Ennen VK25:tä Walkerin ketju oli lineaarinen reitti — se pysähtyi kohtaan GABA↓ → Q↑. Nyt se sulkeutuu: uni↓ → T↓ → neuroprotektio↓ → hippokampus haavoittuva → HPA-jarru menetetty → kortisoli↑ → lisää unihäiriöitä. Tämä tarkoittaa, että ketju on ITSEÄÄN VAHVISTAVA — alkuperäinen unen menetys luo omat olosuhteet pahenemiselle. EMF-altistuksen kasvua ei tarvita progressiiviseen rappeutumiseen.",

    superaddTitle: "Superadditiivinen ennuste",
    superaddBody: "Suljettu Walkerin ketju ennustaa tarkan testattavan tuloksen: unirajoitus PLUS EMF-altistus tuottaa SUUREMMAN testosteronilaskun kuin kumpikaan yksin (superadditiivinen, ei pelkästään additiivinen). Ennuste: >25 % T-lasku yhdistelmätilanteessa vs ~15 % pelkälle unirajoitukselle. 2×2-faktoriaalinen RCT (normaali/rajoitettu uni × matala/korkea EMF) voisi testata tämän 3 kuukaudessa.",

    predictionText: "Walkerin ketjun sulkeutuminen tuottaa ennusteen E-NEW-6: unirajoitus + EMF tuottaa superadditiivisen testosteronilaskun.",
    predictionLink: "Ks. täydennyskerrosten ennusteet →",
    predictionHref: "/predictions",
    statusConfirmed: "✓ Vahvistettu",
  },
  ja: {
    title: "ウォーカー連鎖：睡眠 → テストステロン → 崩壊",
    subtitle: "EMFから睡眠を介したテストステロン低下への完全な因果連鎖が閉じた。7つの検証済み分岐が自己増幅ループを形成し、睡眠喪失が複数の独立経路を通じて同時にテストステロンを攻撃する。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページは閉じたウォーカー連鎖 — 各リンクが独立して検証された因果ループを文書化する。完全なループの予測（超加法的複合効果）は単一の実験ではまだテストされていない。",

    chainTitle: "閉じたループ",
    chainLead: "ウォーカー連鎖は当初、線形経路（EMF → メラトニン↓ → 睡眠↓ → GABA↓ → Q↑）として特定された。VK25により連鎖が閉じた：睡眠↓ → T↓が神経保護の喪失にフィードバックし、自己増幅型の劣化スパイラルを生み出す。",

    branches: [
      { id: "W1", name: "EMF → メラトニン↓", mechanism: "RF-EMFはCRY磁気受容経路と松果体への直接効果を通じてメラトニンを抑制する。PGC（松果体石灰化）は時間とともにメラトニン産生能力をさらに低下させる。", evidence: "CRY磁気受容確認済み; PGC ↔ メラトニン r=0.569; EMF→メラトニン↓ 複数の研究で確認", status: "confirmed" },
      { id: "W2", name: "メラトニン↓ → 睡眠の質↓", mechanism: "メラトニンは主要な概日リズム調節ホルモンである。その減少は概日リズムの同調を乱し、入眠効率を低下させ、徐波睡眠の構造を劣化させる。", evidence: "基礎時間生物学; メラトニン補充は複数のRCTで睡眠を改善", status: "confirmed" },
      { id: "W3", name: "睡眠↓ → GABA↓ → Q↑", mechanism: "睡眠不足はGABA作動性持続性抑制を減少させる（γ低下 → Q因子上昇）。これはてんかんの診断的誘発として臨床使用される — 患者の23-62%にてんかん様放電が出現する。", evidence: "睡眠不足がてんかん様放電を活性化（臨床）; EEG研究がGABA↓を確認", status: "confirmed" },
      { id: "W4", name: "睡眠↓ → T↓（閉鎖）", mechanism: "1週間の5時間睡眠でテストステロンが10-15%低下し、10-15年の加齢に相当する。効果は用量依存的：部分制限はトレンドを示す（p=0.067）、完全剥奪は有意。これがウォーカー連鎖を閉じる。", evidence: "JAMA 2011 (305:2173): 5h睡眠 → T -10-15%; メタアナリシス確認 ([[ref:sleep_t_meta_2021|PMID:34801825]]); Sleep Med 2019 RCTが用量反応を確認", status: "confirmed" },
      { id: "W5", name: "T↓ → 神経保護↓", mechanism: "テストステロンはAR媒介BDNF上方制御、抗炎症効果、シナプス維持を通じて神経保護を提供する。T↓は海馬のコルチゾール、酸化ストレス、神経炎症に対する脆弱性を増加させる。", evidence: "T↓神経保護リンクが複数の動物モデルで検証; テストステロン補充が認知転帰を改善", status: "confirmed" },
      { id: "W6", name: "睡眠↓ → コルチゾール↑ → GnIH↑ → T↓", mechanism: "睡眠制限はHPA軸を活性化 → コルチゾール↑。コルチゾールは視床下部でGnIH（RFRP-3）を誘導しGnRH → LH → T↓を抑制する。これは睡眠からT↓への第二経路でありW4を増幅する。", evidence: "RF9（GnIH拮抗薬）がコルチゾール処置霊長類でTを回復（[[ref:rf9_cortisol_2021|PMC7946976]]）; CRF→GnRH↓確認（[[ref:crf_gnrh_2013|PMC3576618]]）", status: "confirmed" },
      { id: "W7", name: "睡眠↓ → Per2↓ → 腸管バリア↓ → 神経炎症", mechanism: "睡眠/概日リズム障害 → 腸上皮でPer2↓ → タイトジャンクション劣化 → LPSが血流に侵入 → 神経炎症 → 海馬神経新生↓。海馬損傷 → HPAブレーキ喪失 → コルチゾール増加 → 睡眠障害悪化。", evidence: "Per2 KO → 腸管バリア↓ → LPS → うつ病（[[ref:gut_per2_2026|PMC12631932]]）; 概日リズム障害 → マイクロバイオーム変化（[[ref:gut_circadian_2018|PMC5909328]]）", status: "confirmed" },
    ],

    closureTitle: "閉鎖が重要な理由",
    closureLead: "VK25以前、ウォーカー連鎖は線形経路で — GABA↓ → Q↑で止まっていた。今や閉じた：睡眠↓ → T↓ → 神経保護↓ → 海馬が脆弱に → HPAブレーキ喪失 → コルチゾール↑ → 睡眠障害悪化。連鎖は自己増幅的 — 最初の睡眠喪失が悪化条件を自ら作り出す。進行性劣化にEMF曝露の増加は不要である。",

    superaddTitle: "超加法的予測",
    superaddBody: "閉じたウォーカー連鎖は特定のテスト可能な結果を予測する：睡眠制限＋EMF曝露は、いずれか単独よりも大きなテストステロン低下を生じるはずである（加法的ではなく超加法的）。予測：複合条件で>25%のT低下 vs 睡眠制限単独~15%。2x2要因RCT（通常/制限睡眠 x 低/高EMF）で3ヶ月以内にテスト可能。",

    predictionText: "ウォーカー連鎖の閉鎖は予測E-NEW-6を生成する：睡眠制限＋EMFは超加法的テストステロン低下を生じる。",
    predictionLink: "補足層の予測を見る →",
    predictionHref: "/predictions",
    statusConfirmed: "✓ 確認済み",
  },
  fr: {
    title: "La chaîne de Walker : Sommeil → Testostérone → Effondrement",
    subtitle: "La chaîne causale complète de l'EMF au déclin de la testostérone via le sommeil est désormais fermée. Sept branches vérifiées forment une boucle auto-amplifiante où la perte de sommeil attaque simultanément la testostérone par plusieurs voies indépendantes.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page documente la chaîne de Walker fermée — une boucle causale dont chaque lien a été vérifié indépendamment. La prédiction de la boucle complète (effet combiné super-additif) n'a pas encore été testée dans une seule expérience.",

    chainTitle: "La boucle fermée",
    chainLead: "La chaîne de Walker a été initialement identifiée comme une voie linéaire (EMF → mélatonine↓ → sommeil↓ → GABA↓ → Q↑). Avec VK25, la chaîne se ferme : sommeil↓ → T↓ rétroagit vers la perte de neuroprotection, créant une spirale de dégradation auto-amplifiante.",

    branches: [
      { id: "W1", name: "EMF → mélatonine↓", mechanism: "Le RF-EMF supprime la mélatonine via la voie de magnétoréception CRY et les effets directs sur la glande pinéale. La PGC (calcification de la glande pinéale) réduit davantage la capacité de mélatonine au fil du temps.", evidence: "Magnétoréception CRY confirmée ; PGC ↔ mélatonine r=0,569 ; EMF→mélatonine↓ dans de multiples études", status: "confirmed" },
      { id: "W2", name: "Mélatonine↓ → qualité du sommeil↓", mechanism: "La mélatonine est la principale hormone chronobiotique. Sa réduction perturbe l'entraînement circadien, réduit l'efficacité d'endormissement et dégrade l'architecture du sommeil lent profond.", evidence: "Chronobiologie fondamentale ; la supplémentation en mélatonine améliore le sommeil dans de multiples ECR", status: "confirmed" },
      { id: "W3", name: "Sommeil↓ → GABA↓ → Q↑", mechanism: "La privation de sommeil réduit l'inhibition tonique GABA-ergique (γ diminue → facteur Q augmente). Ceci est utilisé cliniquement comme provocation diagnostique pour l'épilepsie — 23-62% des patients montrent des décharges épileptiformes.", evidence: "La privation de sommeil active les décharges épileptiformes (clinique) ; les études EEG confirment GABA↓", status: "confirmed" },
      { id: "W4", name: "Sommeil↓ → T↓ (FERMETURE)", mechanism: "Une semaine de 5 heures de sommeil réduit la testostérone de 10-15%, équivalent à 10-15 ans de vieillissement. L'effet est dose-dépendant : la restriction partielle montre une tendance (p=0,067), la privation totale est significative. Ceci ferme la chaîne de Walker.", evidence: "JAMA 2011 (305:2173) : 5h sommeil → T -10-15% ; méta-analyse confirme ([[ref:sleep_t_meta_2021|PMID:34801825]]) ; Sleep Med 2019 ECR confirme dose-réponse", status: "confirmed" },
      { id: "W5", name: "T↓ → neuroprotection↓", mechanism: "La testostérone fournit une neuroprotection via la régulation positive de BDNF médiée par AR, les effets anti-inflammatoires et le maintien synaptique. T↓ augmente la vulnérabilité hippocampique au cortisol, au stress oxydatif et à la neuroinflammation.", evidence: "Lien T↓ neuroprotection vérifié dans de multiples modèles animaux ; le remplacement de testostérone améliore les résultats cognitifs", status: "confirmed" },
      { id: "W6", name: "Sommeil↓ → cortisol↑ → GnIH↑ → T↓", mechanism: "La restriction de sommeil active l'axe HPA → cortisol↑. Le cortisol induit GnIH (RFRP-3) dans l'hypothalamus qui supprime GnRH → LH → T↓. C'est une deuxième voie du sommeil à T↓, amplifiant W4.", evidence: "RF9 (antagoniste GnIH) a restauré T chez les primates traités au cortisol ([[ref:rf9_cortisol_2021|PMC7946976]]) ; CRF→GnRH↓ confirmé ([[ref:crf_gnrh_2013|PMC3576618]])", status: "confirmed" },
      { id: "W7", name: "Sommeil↓ → Per2↓ → barrière intestinale↓ → neuroinflammation", mechanism: "Perturbation sommeil/circadienne → Per2↓ dans l'épithélium intestinal → dégradation des jonctions serrées → LPS entre dans le sang → neuroinflammation → neurogenèse hippocampique↓. Dommage hippocampique → frein HPA perdu → plus de cortisol → plus de perturbation du sommeil.", evidence: "Per2 KO → barrière intestinale↓ → LPS → dépression ([[ref:gut_per2_2026|PMC12631932]]) ; perturbation circadienne → changement microbiome ([[ref:gut_circadian_2018|PMC5909328]])", status: "confirmed" },
    ],

    closureTitle: "Pourquoi la fermeture est importante",
    closureLead: "Avant VK25, la chaîne de Walker était une voie linéaire — elle s'arrêtait à GABA↓ → Q↑. Maintenant elle se ferme : sommeil↓ → T↓ → neuroprotection↓ → hippocampe vulnérable → frein HPA perdu → cortisol↑ → plus de perturbation du sommeil. La chaîne est AUTO-AMPLIFIANTE — la perte de sommeil initiale crée ses propres conditions d'aggravation. Aucune augmentation de l'exposition EMF n'est nécessaire pour une détérioration progressive.",

    superaddTitle: "Prédiction super-additive",
    superaddBody: "La chaîne de Walker fermée prédit un résultat testable spécifique : la restriction de sommeil PLUS l'exposition EMF devrait produire un déclin de testostérone PLUS GRAND que chacun seul (super-additif, pas simplement additif). Prédit : >25% de déclin T dans la condition combinée vs ~15% pour la restriction de sommeil seule. Un ECR factoriel 2×2 (sommeil normal/restreint × EMF faible/élevé) pourrait tester ceci en 3 mois.",

    predictionText: "La fermeture de la chaîne de Walker génère la prédiction E-NEW-6 : restriction de sommeil + EMF produit un déclin super-additif de testostérone.",
    predictionLink: "Voir les prédictions des couches supplémentaires →",
    predictionHref: "/predictions",
    statusConfirmed: "✓ Confirmé",
  },
  ko: {
    title: "워커 체인: 수면 → 테스토스테론 → 붕괴",
    subtitle: "EMF에서 수면을 통한 테스토스테론 감소까지의 완전한 인과 사슬이 닫혀졌다. 7개의 검증된 분기가 자기증폭 루프를 형성하여, 수면 손실이 여러 독립 경로를 통해 동시에 테스토스테론을 공격한다.",
    backLink: "← 근거로 돌아가기",
    cautionText: "이 페이지는 닫힌 워커 체인 — 각 링크가 독립적으로 검증된 인과 루프를 문서화한다. 완전한 루프 예측(초가법적 복합 효과)은 아직 단일 실험에서 테스트되지 않았다.",

    chainTitle: "닫힌 루프",
    chainLead: "워커 체인은 원래 선형 경로(EMF → 멜라토닌↓ → 수면↓ → GABA↓ → Q↑)로 식별되었다. VK25로 체인이 닫힌다: 수면↓ → T↓가 신경보호 손실로 피드백되어 자기증폭 열화 스파이럴을 생성한다.",

    branches: [
      { id: "W1", name: "EMF → 멜라토닌↓", mechanism: "RF-EMF는 CRY 자기수용 경로와 송과선에 대한 직접 효과를 통해 멜라토닌을 억제한다. PGC(송과선 석회화)는 시간이 지남에 따라 멜라토닌 용량을 더욱 감소시킨다.", evidence: "CRY 자기수용 확인; PGC ↔ 멜라토닌 r=0.569; EMF→멜라토닌↓ 다수 연구에서 확인", status: "confirmed" },
      { id: "W2", name: "멜라토닌↓ → 수면의 질↓", mechanism: "멜라토닌은 주요 시간생물학적 호르몬이다. 감소는 일주기 동조를 방해하고 입면 효율을 줄이며 서파수면 구조를 저하시킨다.", evidence: "기초 시간생물학; 멜라토닌 보충이 다수 RCT에서 수면 개선", status: "confirmed" },
      { id: "W3", name: "수면↓ → GABA↓ → Q↑", mechanism: "수면 부족은 GABA성 긴장성 억제를 감소시킨다(γ 감소 → Q 인자 증가). 이는 간질의 진단적 유발로 임상에서 사용된다 — 환자의 23-62%에서 간질양 방전이 나타난다.", evidence: "수면 부족이 간질양 방전을 활성화(임상); EEG 연구가 GABA↓ 확인", status: "confirmed" },
      { id: "W4", name: "수면↓ → T↓ (폐쇄)", mechanism: "1주일간 5시간 수면으로 테스토스테론이 10-15% 감소하며, 이는 10-15년의 노화에 해당한다. 효과는 용량 의존적이다: 부분 제한은 추세를 보이고(p=0.067), 완전 박탈은 유의하다. 이것이 워커 체인을 닫는다.", evidence: "JAMA 2011 (305:2173): 5h 수면 → T -10-15%; 메타분석 확인([[ref:sleep_t_meta_2021|PMID:34801825]]); Sleep Med 2019 RCT가 용량-반응 확인", status: "confirmed" },
      { id: "W5", name: "T↓ → 신경보호↓", mechanism: "테스토스테론은 AR 매개 BDNF 상향조절, 항염증 효과, 시냅스 유지를 통해 신경보호를 제공한다. T↓는 코르티솔, 산화 스트레스, 신경염증에 대한 해마의 취약성을 증가시킨다.", evidence: "T↓ 신경보호 연결이 다수 동물 모델에서 검증; 테스토스테론 보충이 인지 결과 개선", status: "confirmed" },
      { id: "W6", name: "수면↓ → 코르티솔↑ → GnIH↑ → T↓", mechanism: "수면 제한은 HPA 축을 활성화 → 코르티솔↑. 코르티솔은 시상하부에서 GnIH(RFRP-3)를 유도하여 GnRH → LH → T↓를 억제한다. 이는 수면에서 T↓로의 두 번째 경로로 W4를 증폭한다.", evidence: "RF9(GnIH 길항제)가 코르티솔 처리 영장류에서 T 회복([[ref:rf9_cortisol_2021|PMC7946976]]); CRF→GnRH↓ 확인([[ref:crf_gnrh_2013|PMC3576618]])", status: "confirmed" },
      { id: "W7", name: "수면↓ → Per2↓ → 장 장벽↓ → 신경염증", mechanism: "수면/일주기 장애 → 장 상피에서 Per2↓ → 밀착연접 저하 → LPS가 혈류 침입 → 신경염증 → 해마 신경신생↓. 해마 손상 → HPA 브레이크 소실 → 코르티솔 증가 → 수면 장애 악화.", evidence: "Per2 KO → 장 장벽↓ → LPS → 우울증([[ref:gut_per2_2026|PMC12631932]]); 일주기 장애 → 마이크로바이옴 변화([[ref:gut_circadian_2018|PMC5909328]])", status: "confirmed" },
    ],

    closureTitle: "폐쇄가 중요한 이유",
    closureLead: "VK25 이전에 워커 체인은 선형 경로였다 — GABA↓ → Q↑에서 멈첤다. 이제 닫힌다: 수면↓ → T↓ → 신경보호↓ → 해마 취약 → HPA 브레이크 소실 → 코르티솔↑ → 수면 장애 악화. 체인은 자기증폭적 — 초기 수면 손실이 악화 조건을 스스로 만든다. 점진적 열화에 EMF 노출 증가는 불필요하다.",

    superaddTitle: "초가법적 예측",
    superaddBody: "닫힌 워커 체인은 특정 테스트 가능한 결과를 예측한다: 수면 제한 + EMF 노출은 각각 단독보다 더 큰 테스토스테론 감소를 생산해야 한다(단순 가법이 아닌 초가법적). 예측: 복합 조건에서 >25% T 감소 vs 수면 제한 단독 ~15%. 2×2 요인 RCT(정상/제한 수면 × 낮은/높은 EMF)로 3개월 내 테스트 가능.",

    predictionText: "워커 체인의 폐쇄는 예측 E-NEW-6을 생성한다: 수면 제한 + EMF는 초가법적 테스토스테론 감소를 생산한다.",
    predictionLink: "보충층 예측 보기 →",
    predictionHref: "/predictions",
    statusConfirmed: "✓ 확인됨",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function WalkerChainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Link2} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.chainTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.chainLead}</p>
        <div className="space-y-3">
          {d.branches.map((b) => (
            <div key={b.id} className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{b.id}</span>
                <h3 className="font-semibold text-sm">{b.name}</h3>
                <span className="ml-auto shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  {d.statusConfirmed}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{b.mechanism}</p>
              <p className="text-xs text-foreground-muted italic"><InlineReferenceText text={b.evidence} locale={locale} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.closureTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.closureLead}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-2">{d.superaddTitle}</h2>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.superaddBody}</p>
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
