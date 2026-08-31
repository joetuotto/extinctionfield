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
    criticismFi: "\"Incredibly implausible\"",
    criticismJa: "「信じられないほど非現実的」",
    criticismFr: "\"Incroyablement improbable\"",
    criticismKo: "\"믿을 수 없을 만큼 비현실적\"",
    mechanismEn: "Lindgren's χ(Ā) saturation",
    mechanismFi: "Lindgrenin χ(Ā) saturaatio",
    mechanismJa: "Lindgrenのχ(Ā)飽和",
    mechanismFr: "Saturation χ(Ā) de Lindgren",
    mechanismKo: "Lindgren의 χ(Ā) 포화",
  },
] as const;

export const ORPHANED_COMMENTARY = {
  en: {
    title: "Orphaned Findings: Data Without a Mechanism",
    p1: "In each case, the empirical observation was strong — often published in top-tier journals (Cell, NeuroImage, Bioelectromagnetics). The criticism targeted not the data but the mechanism: how could such weak fields produce biological effects? This 'implausibility argument' is not a scientific rebuttal — it is an argument from ignorance that confuses 'we don't know the mechanism' with 'there is no mechanism.'",
    p2: "Lindgren's susceptibility function χ(Ā) resolves all five cases simultaneously. The membrane electric field (~10⁷ V/m) creates a susceptibility that is already near saturation. Ion channel voltage sensors, conserved for 3 billion years (Zakon 2012), operate at quantum-limit sensitivity — like the eye's photoreceptor. An external field of 10⁻⁵ V/m is to the ion channel what a single photon is to the retina: individually tiny, but detectable because the sensor evolved to detect exactly this.",
    note: "Epistemic level: [L] (Lindgren's interpretation) combined with [E]-level empirical findings.",
  },
  fi: {
    title: "Hylätyt havainnot: data ilman mekanismia",
    p1: "Jokaisessa tapauksessa empiirinen havainto oli vahva — usein julkaistu huipputason lehdissä (Cell, NeuroImage, Bioelectromagnetics). Kritiikki ei kohdistunut dataan vaan MEKANISMIIN: miten niin heikot kentät voivat tuottaa biologisia vaikutuksia? Tämä \"epäuskottavuusargumentti\" ei ole tieteellinen kumoaminen — se on argumentti tietämättömyydestä, joka sekoittaa \"emme tunne mekanismia\" ja \"mekanismia ei ole.\"",
    p2: "Lindgrenin susceptibiliteettifunktio χ(Ā) ratkaisee kaikki viisi tapausta samanaikaisesti. Solukalvon sähkökenttä (~10⁷ V/m) luo susceptibiliteetin joka on jo lähellä saturaatiota. Ionikanavan jännitesensorit, jotka ovat säilyneet 3 miljardia vuotta (Zakon 2012), toimivat kvanttirajan herkkyydellä — kuten silmän fotoreseptori. Ulkoinen kenttä 10⁻⁵ V/m on ionikanavalle sama kuin yksittäinen fotoni verkkokalvolle: yksittäin pieni, mutta havaittavissa koska sensori kehittyi havaitsemaan juuri tämän.",
    note: "Episteeminen taso: [L] (Lindgrenin tulkinta) yhdistettynä [E]-tason empiirisiin havaintoihin.",
  },
  ja: {
    title: "孤立した発見：メカニズムのないデータ",
    p1: "いずれの場合も、経験的観察は強固であった — Cell、NeuroImage、Bioelectromagneticsなどの一流ジャーナルに掲載されることも多かった。批判はデータではなくメカニズムに向けられた：このような弱い電磁場がどうして生物学的影響を生じさせるのか？ この「非現実性の議論」は科学的反論ではない — 「メカニズムがわからない」と「メカニズムが存在しない」を混同する無知からの論法である。",
    p2: "Lindgrenの感受性関数χ(Ā)は5つの事例すべてを同時に解決する。細胞膜の電場（〜10⁷ V/m）は既に飽和に近い感受性を生み出す。30億年にわたって保存されてきたイオンチャネル電圧センサー（Zakon 2012）は量子限界の感度で動作する — 目の光受容体のように。10⁻⁵ V/mの外部電場はイオンチャネルにとって、単一光子が網膜にとってのものと同じである：個々には微小だが、センサーがまさにそれを検出するために進化したため検出可能である。",
    note: "認識論的レベル：[L]（Lindgrenの解釈）と[E]レベルの経験的発見の組み合わせ。",
  },
  fr: {
    title: "Découvertes orphelines : des données sans mécanisme",
    p1: "Dans chaque cas, l'observation empirique était solide — souvent publiée dans des revues de premier plan (Cell, NeuroImage, Bioelectromagnetics). La critique ne visait pas les données mais le mécanisme : comment des champs aussi faibles pourraient-ils produire des effets biologiques ? Cet « argument d'invraisemblance » n'est pas une réfutation scientifique — c'est un argument d'ignorance qui confond « nous ne connaissons pas le mécanisme » avec « il n'y a pas de mécanisme. »",
    p2: "La fonction de susceptibilité χ(Ā) de Lindgren résout les cinq cas simultanément. Le champ électrique membranaire (~10⁷ V/m) crée une susceptibilité déjà proche de la saturation. Les capteurs de tension des canaux ioniques, conservés depuis 3 milliards d'années (Zakon 2012), fonctionnent à la sensibilité de la limite quantique — comme le photorécepteur de l'œil. Un champ externe de 10⁻⁵ V/m est au canal ionique ce qu'un photon unique est à la rétine : individuellement minuscule, mais détectable parce que le capteur a évolué pour détecter exactement cela.",
    note: "Niveau épistémique : [L] (interprétation de Lindgren) combiné avec des résultats empiriques de niveau [E].",
  },
  ko: {
    title: "고아 발견: 메커니즘 없는 데이터",
    p1: "각 사례에서 경험적 관찰은 강력했다 — Cell, NeuroImage, Bioelectromagnetics 등 최상위 저널에 게재되는 경우가 많았다. 비판은 데이터가 아닌 메커니즘을 겨냥했다: 그토록 약한 전자기장이 어떻게 생물학적 영향을 생성할 수 있는가? 이 '비개연성 논증'은 과학적 반론이 아니다 — '메커니즘을 모른다'와 '메커니즘이 없다'를 혼동하는 무지로부터의 논증이다.",
    p2: "Lindgren의 감수성 함수 χ(Ā)는 다섯 가지 사례를 동시에 해결한다. 세포막 전기장(~10⁷ V/m)은 이미 포화에 가까운 감수성을 생성한다. 30억 년 동안 보존된 이온 채널 전압 센서(Zakon 2012)는 양자 한계 감도에서 작동한다 — 눈의 광수용체처럼. 10⁻⁵ V/m의 외부 전기장은 이온 채널에게 단일 광자가 망막에 대한 것과 같다: 개별적으로는 미세하지만, 센서가 바로 이것을 감지하도록 진화했기 때문에 감지 가능하다.",
    note: "인식론적 수준: [L](Lindgren의 해석)과 [E] 수준의 경험적 발견의 결합.",
  },
} as const;
