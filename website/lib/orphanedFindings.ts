export interface OrphanedFinding {
  year: string;
  researcher: string;
  findingEn: string;
  findingFi: string;
  findingJa: string;
  findingFr: string;
  findingKo: string;
  criticismEn: string;
  criticismFi: string;
  criticismJa: string;
  criticismFr: string;
  criticismKo: string;
  mechanismEn: string;
  mechanismFi: string;
  mechanismJa: string;
  mechanismFr: string;
  mechanismKo: string;
}

export const ORPHANED_FINDINGS: readonly OrphanedFinding[] = [
  {
    year: "1976",
    researcher: "Adey-Blackman",
    findingEn: "Ca²⁺ window effect",
    findingFi: "Ca²⁺ ikkunailmiö",
    findingJa: "Ca²⁺ ウィンドウ効果",
    findingFr: "Effet fenêtre Ca²⁺",
    findingKo: "Ca²⁺ 창 효과",
    criticismEn: "\"Non-linear = artifact\"",
    criticismFi: "\"Ei-lineaarinen = artefakti\"",
    criticismJa: "「非線形＝アーチファクト」",
    criticismFr: "\"Non-linéaire = artefact\"",
    criticismKo: "\"비선형 = 아티팩트\"",
    mechanismEn: "Resonance oscillation (Kim 2026)",
    mechanismFi: "Resonanssi-oskillaatio (Kim 2026)",
    mechanismJa: "共鳴振動 (Kim 2026)",
    mechanismFr: "Oscillation de résonance (Kim 2026)",
    mechanismKo: "공명 진동 (Kim 2026)",
  },
  {
    year: "1995",
    researcher: "Lai-Singh",
    findingEn: "DNA strand breaks",
    findingFi: "DNA-katkokset",
    findingJa: "DNA鎖切断",
    findingFr: "Cassures de brins d'ADN",
    findingKo: "DNA 가닥 절단",
    criticismEn: "\"Photon too weak\"",
    criticismFi: "\"Liian heikko fotoni\"",
    criticismJa: "「光子が弱すぎる」",
    criticismFr: "\"Photon trop faible\"",
    criticismKo: "\"광자가 너무 약함\"",
    mechanismEn: "ROS via VGCC/IFO (Panagopoulos 2025)",
    mechanismFi: "ROS via VGCC/IFO (Panagopoulos 2025)",
    mechanismJa: "VGCC/IFO経由のROS (Panagopoulos 2025)",
    mechanismFr: "ROS via VGCC/IFO (Panagopoulos 2025)",
    mechanismKo: "VGCC/IFO를 통한 ROS (Panagopoulos 2025)",
  },
  {
    year: "2013",
    researcher: "Pall",
    findingEn: "VGCC: 23 studies",
    findingFi: "VGCC: 23 tutkimusta",
    findingJa: "VGCC: 23件の研究",
    findingFr: "VGCC : 23 études",
    findingKo: "VGCC: 23건의 연구",
    criticismEn: "\"Too simple\"",
    criticismFi: "\"Liian yksinkertainen\"",
    criticismJa: "「単純すぎる」",
    criticismFr: "\"Trop simple\"",
    criticismKo: "\"너무 단순함\"",
    mechanismEn: "3 pathways: IFO + RPM + Cyb5b",
    mechanismFi: "3 reittiä: IFO + RPM + Cyb5b",
    mechanismJa: "3経路: IFO + RPM + Cyb5b",
    mechanismFr: "3 voies : IFO + RPM + Cyb5b",
    mechanismKo: "3개 경로: IFO + RPM + Cyb5b",
  },
  {
    year: "2025",
    researcher: "Sousouri",
    findingEn: "CACNA1C × 5G",
    findingFi: "CACNA1C × 5G",
    findingJa: "CACNA1C × 5G",
    findingFr: "CACNA1C × 5G",
    findingKo: "CACNA1C × 5G",
    criticismEn: "\"Sample too small\"",
    criticismFi: "\"Liian pieni otos\"",
    criticismJa: "「サンプルが小さすぎる」",
    criticismFr: "\"Échantillon trop petit\"",
    criticismKo: "\"표본이 너무 작음\"",
    mechanismEn: "Genetic VGCC density variation",
    mechanismFi: "Geneettinen VGCC-tiheysvaihtelu",
    mechanismJa: "遺伝的VGCC密度変異",
    mechanismFr: "Variation génétique de la densité VGCC",
    mechanismKo: "유전적 VGCC 밀도 변이",
  },
  {
    year: "2026",
    researcher: "Kim",
    findingEn: "Gene switch activation",
    findingFi: "Geenikytkimen aktivaatio",
    findingJa: "遺伝子スイッチ活性化",
    findingFr: "Activation de l'interrupteur génétique",
    findingKo: "유전자 스위치 활성화",
    criticismEn: "\"Incredibly implausible\"",
    criticismFi: "\"Äärimmäisen epäuskottavaa\"",
    criticismJa: "「信じられないほど非現実的」",
    criticismFr: "\"Incroyablement improbable\"",
    criticismKo: "\"믿을 수 없을 만큼 비현실적\"",
    mechanismEn: "Derived χ_geo coordinate; conditional response form, tissue kernel open",
    mechanismFi: "Johdettu χ_geo-koordinaatti; ehdollinen vastemuoto, kudosydin avoin",
    mechanismJa: "導出済みχ_geo；条件付き応答形、組織カーネル未校正",
    mechanismFr: "χ_geo dérivé ; réponse conditionnelle, noyau tissulaire ouvert",
    mechanismKo: "도출된 χ_geo; 조건부 반응 형태, 조직 커널 미보정",
  },
] as const;

export const ORPHANED_COMMENTARY = {
  en: {
    title: "Orphaned Findings: Data Without a Mechanism",
    p1: "In each case, the empirical observation was strong — often published in top-tier journals (Cell, NeuroImage, Bioelectromagnetics). The criticism targeted not the data but the mechanism: how could such weak fields produce biological effects? This 'implausibility argument' is not a scientific rebuttal — it is an argument from ignorance that confuses 'we don't know the mechanism' with 'there is no mechanism.'",
    p2: "For an explicitly normalized positive-norm mode, BERM derives the bounded χ_geo coordinate from the inverse rank-one metric. Under a separately stated minimal matter–metric coupling and linear-response assumption, it also derives a conditional geometry-to-response operator form. Neither result supplies the tissue kernel, sign, lag or endpoint calibration. Membrane-field saturation and the photon-sensor analogy remain model arguments to test against calibrated endpoint data, not established mechanisms.",
    note: "Epistemic level: derived geometry plus a conditional formal operator; the biological response kernel and calibration remain open. The empirical findings retain their own evidence labels.",
  },
  fi: {
    title: "Hylätyt havainnot: data ilman mekanismia",
    p1: "Jokaisessa tapauksessa empiirinen havainto oli vahva — usein julkaistu huipputason lehdissä (Cell, NeuroImage, Bioelectromagnetics). Kritiikki ei kohdistunut dataan vaan MEKANISMIIN: miten niin heikot kentät voivat tuottaa biologisia vaikutuksia? Tämä \"epäuskottavuusargumentti\" ei ole tieteellinen kumoaminen — se on argumentti tietämättömyydestä, joka sekoittaa \"emme tunne mekanismia\" ja \"mekanismia ei ole.\"",
    p2: "Eksplisiittisesti normalisoidulle positiivinormiselle moodille BERM johtaa rajatun χ_geo-koordinaatin rank-one-käänteismetriikasta. Erikseen lausutuilla minimaalisella aine–metriikka-kytkennällä ja lineaarivasteoletuksella se johtaa myös ehdollisen geometriasta vasteeseen johtavan operaattorimuodon. Kumpikaan tulos ei anna kudosydintä, etumerkkiä, viivettä tai päätepistekalibrointia. Kalvokentän saturaatio ja fotonireseptorianalogia pysyvät kalibroidulla datalla testattavina malliargumentteina.",
    note: "Episteeminen taso: johdettu geometria ja ehdollinen formaali operaattori; biologinen vasteydin ja kalibrointi ovat avoimia. Empiiriset löydökset säilyttävät omat näyttömerkintänsä.",
  },
  ja: {
    title: "孤立した発見：メカニズムのないデータ",
    p1: "いずれの場合も、経験的観察は強固であった — Cell、NeuroImage、Bioelectromagneticsなどの一流ジャーナルに掲載されることも多かった。批判はデータではなくメカニズムに向けられた：このような弱い電磁場がどうして生物学的影響を生じさせるのか？ この「非現実性の議論」は科学的反論ではない — 「メカニズムがわからない」と「メカニズムが存在しない」を混同する無知からの論法である。",
    p2: "BERMはχ(Ā)を、これらの事例を整理し得る閉包候補として提案する。これはLindgrenが導出した感受性関数ではなく、幾何学から観測量への欠落した演算子もまだ与えない。膜電場の飽和と光子センサーの類推は、校正済みエンドポイントデータで検証すべきモデル論拠であり、確立した機構ではない。",
    note: "認識論的レベル：導出済み幾何学と条件付き形式演算子；生物応答カーネルと校正は未解決。経験的所見は固有の証拠ラベルを保持する。",
  },
  fr: {
    title: "Découvertes orphelines : des données sans mécanisme",
    p1: "Dans chaque cas, l'observation empirique était solide — souvent publiée dans des revues de premier plan (Cell, NeuroImage, Bioelectromagnetics). La critique ne visait pas les données mais le mécanisme : comment des champs aussi faibles pourraient-ils produire des effets biologiques ? Cet « argument d'invraisemblance » n'est pas une réfutation scientifique — c'est un argument d'ignorance qui confond « nous ne connaissons pas le mécanisme » avec « il n'y a pas de mécanisme. »",
    p2: "BERM propose χ(Ā) comme fermeture candidate susceptible d'organiser ces cas. Ce n'est pas une fonction de susceptibilité dérivée par Lindgren et elle ne fournit pas encore l'opérateur manquant entre géométrie et observable. La saturation du champ membranaire et l'analogie avec le photorécepteur sont des arguments de modèle à tester sur des endpoints calibrés, pas un mécanisme établi.",
    note: "Niveau épistémique : géométrie dérivée et opérateur formel conditionnel ; le noyau biologique et la calibration restent ouverts. Les observations empiriques conservent leurs propres niveaux de preuve.",
  },
  ko: {
    title: "고아 발견: 메커니즘 없는 데이터",
    p1: "각 사례에서 경험적 관찰은 강력했다 — Cell, NeuroImage, Bioelectromagnetics 등 최상위 저널에 게재되는 경우가 많았다. 비판은 데이터가 아닌 메커니즘을 겨냥했다: 그토록 약한 전자기장이 어떻게 생물학적 영향을 생성할 수 있는가? 이 '비개연성 논증'은 과학적 반론이 아니다 — '메커니즘을 모른다'와 '메커니즘이 없다'를 혼동하는 무지로부터의 논증이다.",
    p2: "BERM은 χ(Ā)를 이 사례들을 정리할 수 있는 후보 폐쇄로 제안한다. 이는 Lindgren이 도출한 감수성 함수가 아니며 기하학에서 관측량으로 가는 누락된 연산자도 아직 제공하지 않는다. 막 전기장 포화와 광자 센서 비유는 보정된 종점 자료로 검증할 모델 논거이지 확립된 기전이 아니다.",
    note: "인식론적 수준: 도출된 기하학과 조건부 형식 연산자; 생물 반응 커널과 보정은 미해결이다. 경험적 관찰은 각자의 증거 표지를 유지한다.",
  },
} as const;
