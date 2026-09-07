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
    mechanismEn: "L1 χ_geo(x) derivation; biological L0→L2 mapping open",
    mechanismFi: "L1-johdettu χ_geo(x); biologinen L0→L2-kuvaus avoin",
    mechanismJa: "L1導出χ_geo(x)；生物学的L0→L2写像は未解決",
    mechanismFr: "χ_geo(x) dérivée en L1 ; application biologique L0→L2 ouverte",
    mechanismKo: "L1 도출 χ_geo(x); 생물학적 L0→L2 매핑은 열려 있음",
  },
] as const;

export const ORPHANED_COMMENTARY = {
  en: {
    title: "Orphaned Findings: Data Without a Mechanism",
    p1: "In each case, the empirical observation was strong — often published in top-tier journals (Cell, NeuroImage, Bioelectromagnetics). The criticism targeted not the data but the mechanism: how could such weak fields produce biological effects? This 'implausibility argument' is not a scientific rebuttal — it is an argument from ignorance that confuses 'we don't know the mechanism' with 'there is no mechanism.'",
    p2: "Metric-volume linearization/geodesic deviation gives the signed directional response and the algebraic χ_geo(q)=q/√(1+q²) formula at L1. Choosing q=|Ā| via a dimensionless, collinear Lorentz-to-Euclidean spatial/scalar projection is L2. Raw V/m, a proxy or a membrane coordinate cannot be inserted directly: mapping a measurement to q=N(z) and then to biology remains open at L0→L2. Membrane and photon-sensor mechanisms are imported L3 candidates.",
    note: "Epistemic split: the χ_geo formula is always L1; the positive spatial/scalar projection is L2; concrete measurement and response mappings remain open at L0→L2; imported mechanisms and findings retain component-specific L3 provenance.",
  },
  fi: {
    title: "Hylätyt havainnot: data ilman mekanismia",
    p1: "Jokaisessa tapauksessa empiirinen havainto oli vahva — usein julkaistu huipputason lehdissä (Cell, NeuroImage, Bioelectromagnetics). Kritiikki ei kohdistunut dataan vaan MEKANISMIIN: miten niin heikot kentät voivat tuottaa biologisia vaikutuksia? Tämä \"epäuskottavuusargumentti\" ei ole tieteellinen kumoaminen — se on argumentti tietämättömyydestä, joka sekoittaa \"emme tunne mekanismia\" ja \"mekanismia ei ole.\"",
    p2: "Metriikan tilavuuslinearisaatio/geodeesipoikkeama antaa etumerkillisen suunnatun vasteen ja algebrallisen χ_geo(q)=q/√(1+q²)-kaavan L1-tasolla. Koordinaatin q=|Ā| valinta dimensiottomalla, kollineaarisella Lorentz→Euklidisella spatiaalinen/skalaari-projektiolla on L2. Raakaa V/m-arvoa, proxyä tai kalvokoordinaattia ei voi syöttää suoraan: kartoitus q=N(z):ksi ja biologiseksi vasteeksi on avoin L0→L2-askel. Kalvo- ja fotonisensorimekanismit ovat tuotuja L3-ehdokkaita.",
    note: "Episteeminen jako: χ_geo-kaava on aina L1; positiivinen spatiaalinen/skalaari-projektio on L2; konkreettiset mittaus- ja vastekartat pysyvät avoimina L0→L2:ssa; tuodut mekanismit ja löydökset säilyttävät komponenttikohtaisen L3-provenienssin.",
  },
  ja: {
    title: "孤立した発見：メカニズムのないデータ",
    p1: "いずれの場合も、経験的観察は強固であった — Cell、NeuroImage、Bioelectromagneticsなどの一流ジャーナルに掲載されることも多かった。批判はデータではなくメカニズムに向けられた：このような弱い電磁場がどうして生物学的影響を生じさせるのか？ この「非現実性の議論」は科学的反論ではない — 「メカニズムがわからない」と「メカニズムが存在しない」を混同する無知からの論法である。",
    p2: "計量体積の線形化／測地線偏差は、符号付き方向応答と代数式χ_geo(q)=q/√(1+q²)をL1で与える。無次元・共線Lorentz→Euclid空間・スカラー射影によるq=|Ā|の選択はL2である。生のV/m値、プロキシ、膜座標は直接入力できず、q=N(z)と生物応答への写像は未解決L0→L2である。膜・光子センサー機構は導入L3候補である。",
    note: "認識論的区分：χ_geo式は常にL1、正の空間・スカラー射影はL2、具体的な測定・応答写像はL0→L2で未解決、導入機構と所見は構成要素ごとのL3来歴を保持する。",
  },
  fr: {
    title: "Découvertes orphelines : des données sans mécanisme",
    p1: "Dans chaque cas, l'observation empirique était solide — souvent publiée dans des revues de premier plan (Cell, NeuroImage, Bioelectromagnetics). La critique ne visait pas les données mais le mécanisme : comment des champs aussi faibles pourraient-ils produire des effets biologiques ? Cet « argument d'invraisemblance » n'est pas une réfutation scientifique — c'est un argument d'ignorance qui confond « nous ne connaissons pas le mécanisme » avec « il n'y a pas de mécanisme. »",
    p2: "La linéarisation du volume métrique/la déviation géodésique donne la réponse directionnelle signée et la formule algébrique χ_geo(q)=q/√(1+q²) en L1. Choisir q=|Ā| par une projection spatiale/scalarie sans dimension et colinéaire de Lorentz vers Euclide est L2. Aucune valeur brute en V/m, aucun proxy ni aucune coordonnée membranaire ne doit être injecté directement : la projection q=N(z), puis vers la biologie, reste ouverte en L0→L2. Les mécanismes membranaires et photorécepteurs sont des candidats L3 importés.",
    note: "Séparation épistémique : la formule χ_geo est toujours L1 ; la projection spatiale/scalarie positive est L2 ; les applications concrètes restent ouvertes en L0→L2 ; mécanismes et observations importés conservent leur provenance L3 par composant.",
  },
  ko: {
    title: "고아 발견: 메커니즘 없는 데이터",
    p1: "각 사례에서 경험적 관찰은 강력했다 — Cell, NeuroImage, Bioelectromagnetics 등 최상위 저널에 게재되는 경우가 많았다. 비판은 데이터가 아닌 메커니즘을 겨냥했다: 그토록 약한 전자기장이 어떻게 생물학적 영향을 생성할 수 있는가? 이 '비개연성 논증'은 과학적 반론이 아니다 — '메커니즘을 모른다'와 '메커니즘이 없다'를 혼동하는 무지로부터의 논증이다.",
    p2: "계량 부피 선형화/측지선 편차는 부호 있는 방향 반응과 대수식 χ_geo(q)=q/√(1+q²)를 L1에서 준다. 무차원·공선 Lorentz→Euclid 공간·스칼라 사영으로 q=|Ā|를 선택하는 것은 L2다. 원시 V/m 값, 프록시 또는 막 좌표를 직접 넣을 수 없으며 q=N(z)와 생물학적 반응으로의 매핑은 열린 L0→L2다. 막·광자 센서 메커니즘은 도입된 L3 후보다.",
    note: "인식론적 구분: χ_geo 공식은 항상 L1, 양의 공간·스칼라 사영은 L2, 구체적 측정·반응 매핑은 L0→L2에서 열려 있으며 도입 메커니즘과 관찰은 구성요소별 L3 출처를 유지한다.",
  },
} as const;
