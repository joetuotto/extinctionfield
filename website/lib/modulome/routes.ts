export interface FertilityRoute {
  id: string;
  color: string;
  nameEn: string;
  nameFi: string;
  nameJa: string;
  nameFr: string;
  nameKo: string;
  mechanismEn: string;
  mechanismFi: string;
  mechanismJa: string;
  mechanismFr: string;
  mechanismKo: string;
  blockedByEn: string;
  blockedByFi: string;
  blockedByJa: string;
  blockedByFr: string;
  blockedByKo: string;
  organLinks: string[];
  isNew: boolean;
}

export const FERTILITY_ROUTES: FertilityRoute[] = [
  {
    id: "gonadal",
    color: "#EF4444",
    nameEn: "Gonadal (Routes A + D)",
    nameFi: "Gonadaalinen (reitit A + D)",
    nameJa: "生殖腺（経路A + D）",
    nameFr: "Gonadique (voies A + D)",
    nameKo: "생식선 (경로 A + D)",
    mechanismEn: "EMF → Cav3/Cav1 in testes/ovaries → Ca²⁺ → sperm damage + testosterone decline",
    mechanismFi: "EMF → Cav3/Cav1 kiveksissä/munasarjoissa → Ca²⁺ → siittiövaurio + testosteronin lasku",
    mechanismJa: "EMF → 精巣/卵巣のCav3/Cav1 → Ca²⁺ → 精子損傷 + テストステロン低下",
    mechanismFr: "EMF → Cav3/Cav1 dans les testicules/ovaires → Ca²⁺ → dommages spermatiques + déclin de la testostérone",
    mechanismKo: "EMF → 정소/난소의 Cav3/Cav1 → Ca²⁺ → 정자 손상 + 테스토스테론 감소",
    blockedByEn: "T-type blocker (ethosuximide), L-type blocker (nifedipine)",
    blockedByFi: "T-tyypin salpaaja (etosuksimidi), L-tyypin salpaaja (nifedipiini)",
    blockedByJa: "T型遮断薬（エトスクシミド）、L型遮断薬（ニフェジピン）",
    blockedByFr: "Bloqueur de type T (éthosuximide), bloqueur de type L (nifédipine)",
    blockedByKo: "T형 차단제 (에토숙시미드), L형 차단제 (니페디핀)",
    organLinks: ["testes"],
    isNew: false,
  },
  {
    id: "circadian",
    color: "#3B82F6",
    nameEn: "Circadian (Route C)",
    nameFi: "Sirkadiaaninen (reitti C)",
    nameJa: "概日リズム（経路C）",
    nameFr: "Circadien (voie C)",
    nameKo: "일주기 (경로 C)",
    mechanismEn: "EMF → CRY in retina → circadian disruption → melatonin ↓ → HPG ↓",
    mechanismFi: "EMF → CRY retinassa → sirkadiaaninen häiriö → melatoniini ↓ → HPG ↓",
    mechanismJa: "EMF → 網膜のCRY → 概日リズム障害 → メラトニン ↓ → HPG ↓",
    mechanismFr: "EMF → CRY dans la rétine → perturbation circadienne → mélatonine ↓ → HPG ↓",
    mechanismKo: "EMF → 망막의 CRY → 일주기 장애 → 멜라토닌 ↓ → HPG ↓",
    blockedByEn: "Blue-light filter, melatonin supplementation, darkness",
    blockedByFi: "Sinivalosuodatin, melatoniinilisä, pimeys",
    blockedByJa: "ブルーライトフィルター、メラトニン補充、暗闇",
    blockedByFr: "Filtre de lumière bleue, supplémentation en mélatonine, obscurité",
    blockedByKo: "청색광 필터, 멜라토닌 보충, 암흑",
    organLinks: ["eye"],
    isNew: false,
  },
  {
    id: "pituitary",
    color: "#8B5CF6",
    nameEn: "Pituitary (NEW)",
    nameFi: "Hypofyysireitti (UUSI)",
    nameJa: "下垂体（新規）",
    nameFr: "Hypophysaire (NOUVEAU)",
    nameKo: "뇌하수체 (신규)",
    mechanismEn: "EMF → Cav3 in gonadotroph → FSH/LH pulse disruption (OUTSIDE BBB)",
    mechanismFi: "EMF → Cav3 gonadotroopissa → FSH/LH-pulssin häiriö (BBB:n ULKOPUOLELLA)",
    mechanismJa: "EMF → ゴナドトロフのCav3 → FSH/LHパルス障害（BBBの外側）",
    mechanismFr: "EMF → Cav3 dans le gonadotrope → perturbation du pulse FSH/LH (EN DEHORS DE LA BHE)",
    mechanismKo: "EMF → 생식선자극세포의 Cav3 → FSH/LH 펄스 장애 (BBB 외부)",
    blockedByEn: "T-type blocker (systemic)",
    blockedByFi: "T-tyypin salpaaja (systeeminen)",
    blockedByJa: "T型遮断薬（全身性）",
    blockedByFr: "Bloqueur de type T (systémique)",
    blockedByKo: "T형 차단제 (전신성)",
    organLinks: ["pituitary"],
    isNew: true,
  },
  {
    id: "autonomic",
    color: "#10B981",
    nameEn: "Autonomic (NEW)",
    nameFi: "Autonominen (UUSI)",
    nameJa: "自律神経（新規）",
    nameFr: "Autonome (NOUVEAU)",
    nameKo: "자율신경 (신규)",
    mechanismEn: "EMF → SA node Cav3 → HRV ↓ → sympathetic dominance → HPA → cortisol → HPG ↓",
    mechanismFi: "EMF → SA-solmun Cav3 → HRV ↓ → sympaattinen dominanssi → HPA → kortisoli → HPG ↓",
    mechanismJa: "EMF → 洞房結節Cav3 → HRV ↓ → 交感神経優位 → HPA → コルチゾール → HPG ↓",
    mechanismFr: "EMF → Cav3 du nœud SA → VFC ↓ → dominance sympathique → HPA → cortisol → HPG ↓",
    mechanismKo: "EMF → 동방결절 Cav3 → HRV ↓ → 교감신경 우위 → HPA → 코르티솔 → HPG ↓",
    blockedByEn: "Vagal stimulation, HRV biofeedback",
    blockedByFi: "Vagaalistimulaatio, HRV-biopalaute",
    blockedByJa: "迷走神経刺激、HRVバイオフィードバック",
    blockedByFr: "Stimulation vagale, biofeedback VFC",
    blockedByKo: "미주신경 자극, HRV 바이오피드백",
    organLinks: ["heart"],
    isNew: true,
  },
];
