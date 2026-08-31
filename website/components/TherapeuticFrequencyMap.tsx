"use client";

import { useState } from "react";
import { pickCopy, pickSuffix } from "@/lib/i18n";

interface Device {
  id: string;
  nameEn: string;
  nameFi: string;
  nameJa: string;
  nameFr: string;
  nameKo: string;
  fdaStatus: string;
  freqMin: number;
  freqMax: number;
  freqLabel: string;
  mechanismEn: string;
  mechanismFi: string;
  mechanismJa: string;
  mechanismFr: string;
  mechanismKo: string;
  nonThermal: boolean;
  bermPath: string;
  band: "dc" | "elf" | "if" | "hf" | "optical";
  color: string;
}

const DEVICES: Device[] = [
  // DC / STATIC
  {
    id: "bone_dc",
    nameEn: "Bone growth stimulator",
    nameFi: "Luunstimulaattori",
    nameJa: "骨成長刺激装置",
    nameFr: "Stimulateur de croissance osseuse",
    nameKo: "골성장 자극기",
    fdaStatus: "PMA 1986",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanismEn: "DC current directs osteoblast migration via bioelectric code",
    mechanismFi: "DC-virta ohjaa osteoblastien migraatiota biosähköisen koodin kautta",
    mechanismJa: "DC電流が生体電気コードを介して骨芽細胞の遊走を誘導",
    mechanismFr: "Le courant continu dirige la migration des ostéoblastes via le code bioélectrique",
    mechanismKo: "DC 전류가 생체전기 코드를 통해 조골세포 이동을 유도",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
    color: "#607D8B",
  },
  {
    id: "tdcs",
    nameEn: "tDCS (Flow Neuroscience)",
    nameFi: "tDCS (Flow Neuroscience)",
    nameJa: "tDCS (Flow Neuroscience)",
    nameFr: "tDCS (Flow Neuroscience)",
    nameKo: "tDCS (Flow Neuroscience)",
    fdaStatus: "PMA 2025",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanismEn: "0.3–1.0 V/m modulates cortical excitability",
    mechanismFi: "0,3–1,0 V/m moduloi kortikaalista eksitabiliteettia",
    mechanismJa: "0.3-1.0 V/mが皮質興奮性を調節",
    mechanismFr: "0,3–1,0 V/m module l'excitabilité corticale",
    mechanismKo: "0.3-1.0 V/m이 피질 흥분성을 조절",
    nonThermal: true,
    bermPath: "D",
    band: "dc",
    color: "#607D8B",
  },
  {
    id: "wound_dc",
    nameEn: "Wound healing electrotherapy",
    nameFi: "Haavanhoidon sähköterapia",
    nameJa: "創傷治癒電気療法",
    nameFr: "Électrothérapie de cicatrisation",
    nameKo: "상처 치유 전기치료",
    fdaStatus: "510(k)",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanismEn: "Microcurrent accelerates epithelial cell migration",
    mechanismFi: "Mikrovirta kiihdyttää epiteelisolujen migraatiota",
    mechanismJa: "微小電流が上皮細胞の遊走を促進",
    mechanismFr: "Le microcourant accélère la migration des cellules épithéliales",
    mechanismKo: "미세전류가 상피세포 이동을 촉진",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
    color: "#607D8B",
  },
  {
    id: "ionto",
    nameEn: "Iontophoresis",
    nameFi: "Iontoforeesi",
    nameJa: "イオントフォレシス",
    nameFr: "Iontophorèse",
    nameKo: "이온토포레시스",
    fdaStatus: "510(k)",
    freqMin: 0.01,
    freqMax: 0.1,
    freqLabel: "DC",
    mechanismEn: "DC field drives charged drug molecules through tissue",
    mechanismFi: "DC-kenttä ajaa varautuneita lääkemolekyylejä kudoksen läpi",
    mechanismJa: "DC電場が荷電薬物分子を組織内に駆動",
    mechanismFr: "Le champ DC entraîne les molécules médicamenteuses chargées à travers les tissus",
    mechanismKo: "DC 전기장이 하전된 약물 분자를 조직을 통해 이동시킴",
    nonThermal: true,
    bermPath: "T_BE",
    band: "dc",
    color: "#607D8B",
  },
  // ELF
  {
    id: "tens",
    nameEn: "TENS",
    nameFi: "TENS",
    nameJa: "TENS",
    nameFr: "TENS",
    nameKo: "TENS",
    fdaStatus: "510(k) ×12,000+",
    freqMin: 2,
    freqMax: 150,
    freqLabel: "2–150 Hz",
    mechanismEn: "Pulsed current activates gate control and endorphin release",
    mechanismFi: "Pulssivirta aktivoi porttikontrollin ja endorfiinin vapautumisen",
    mechanismJa: "パルス電流がゲートコントロールとエンドルフィン放出を活性化",
    mechanismFr: "Le courant pulsé active le contrôle du portillon et la libération d'endorphines",
    mechanismKo: "펄스 전류가 관문 조절과 엔도르핀 방출을 활성화",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "pemf",
    nameEn: "PEMF bone healing",
    nameFi: "PEMF-luuparaneminen",
    nameJa: "PEMF骨治癒",
    nameFr: "Guérison osseuse PEMF",
    nameKo: "PEMF 골치유",
    fdaStatus: "PMA 1979",
    freqMin: 1,
    freqMax: 100,
    freqLabel: "1–100 Hz",
    mechanismEn: "Activates adenosine A2A/A3 receptors (GPCR pathway)",
    mechanismFi: "Aktivoi adenosiini A2A/A3-reseptoreita (GPCR-reitti)",
    mechanismJa: "アデノシンA2A/A3受容体を活性化（GPCR経路）",
    mechanismFr: "Active les récepteurs adénosine A2A/A3 (voie GPCR)",
    mechanismKo: "아데노신 A2A/A3 수용체 활성화 (GPCR 경로)",
    nonThermal: true,
    bermPath: "GPCR",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "rtms",
    nameEn: "rTMS (NeuroStar)",
    nameFi: "rTMS (NeuroStar)",
    nameJa: "rTMS (NeuroStar)",
    nameFr: "rTMS (NeuroStar)",
    nameKo: "rTMS (NeuroStar)",
    fdaStatus: "510(k) 2008",
    freqMin: 1,
    freqMax: 50,
    freqLabel: "1–50 Hz",
    mechanismEn: "Pulsed magnetic field induces lasting neuroplastic changes",
    mechanismFi: "Pulssimuotoinen magneettikenttä tuottaa neuroplastisia muutoksia",
    mechanismJa: "パルス磁場が持続的な神経可塑性変化を誘導",
    mechanismFr: "Le champ magnétique pulsé induit des changements neuroplastiques durables",
    mechanismKo: "펄스 자기장이 지속적인 신경가소성 변화를 유도",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "dbs",
    nameEn: "DBS (deep brain stimulation)",
    nameFi: "DBS (syväaivostimulaatio)",
    nameJa: "DBS（深部脳刺激）",
    nameFr: "DBS (stimulation cérébrale profonde)",
    nameKo: "DBS (심부뇌자극)",
    fdaStatus: "PMA 1997",
    freqMin: 130,
    freqMax: 185,
    freqLabel: "130–185 Hz",
    mechanismEn: "Electrical pulses modulate basal ganglia circuits",
    mechanismFi: "Sähköpulssit moduloivat tyvitumakkeiden piirejä",
    mechanismJa: "電気パルスが基底核回路を調節",
    mechanismFr: "Les impulsions électriques modulent les circuits des ganglions de la base",
    mechanismKo: "전기 펄스가 기저핵 회로를 조절",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "vns",
    nameEn: "VNS (GammaCore)",
    nameFi: "VNS (GammaCore)",
    nameJa: "VNS (GammaCore)",
    nameFr: "VNS (GammaCore)",
    nameKo: "VNS (GammaCore)",
    fdaStatus: "510(k) 2017",
    freqMin: 1,
    freqMax: 30,
    freqLabel: "1–30 Hz",
    mechanismEn: "Vagus nerve stimulation → systemic anti-inflammatory cascade",
    mechanismFi: "Vagushermon stimulaatio → systeeminen anti-inflammatorinen kaskadi",
    mechanismJa: "迷走神経刺激→全身性抗炎症カスケード",
    mechanismFr: "Stimulation du nerf vague → cascade anti-inflammatoire systémique",
    mechanismKo: "미주신경 자극 → 전신 항염증 캐스케이드",
    nonThermal: true,
    bermPath: "E",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "scs",
    nameEn: "SCS (spinal cord stimulation)",
    nameFi: "SCS (selkäydinstimulaatio)",
    nameJa: "SCS（脊髄刺激）",
    nameFr: "SCS (stimulation de la moelle épinière)",
    nameKo: "SCS (척수자극)",
    fdaStatus: "PMA",
    freqMin: 2,
    freqMax: 1200,
    freqLabel: "2–1200 Hz",
    mechanismEn: "Dorsal column stimulation modulates pain signaling",
    mechanismFi: "Dorsaalikolumnan stimulaatio moduloi kipusignalointia",
    mechanismJa: "後索刺激が疼痛シグナリングを調節",
    mechanismFr: "La stimulation de la colonne dorsale module la signalisation de la douleur",
    mechanismKo: "후주 자극이 통증 신호를 조절",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "ces",
    nameEn: "CES (Alpha-Stim)",
    nameFi: "CES (Alpha-Stim)",
    nameJa: "CES (Alpha-Stim)",
    nameFr: "CES (Alpha-Stim)",
    nameKo: "CES (Alpha-Stim)",
    fdaStatus: "510(k)",
    freqMin: 0.5,
    freqMax: 1,
    freqLabel: "0.5 Hz",
    mechanismEn: "Microcurrent pulses modulate brainstem neurotransmitters",
    mechanismFi: "Mikrovirtapulssit moduloivat aivorungon välittäjäaineita",
    mechanismJa: "微小電流パルスが脳幹の神経伝達物質を調節",
    mechanismFr: "Les micropulsions modulent les neurotransmetteurs du tronc cérébral",
    mechanismKo: "미세전류 펄스가 뇌간 신경전달물질을 조절",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "fes",
    nameEn: "FES (functional electrical stim)",
    nameFi: "FES (toiminnallinen sähköstimulaatio)",
    nameJa: "FES（機能的電気刺激）",
    nameFr: "FES (stimulation électrique fonctionnelle)",
    nameKo: "FES (기능적 전기자극)",
    fdaStatus: "510(k)",
    freqMin: 20,
    freqMax: 50,
    freqLabel: "20–50 Hz",
    mechanismEn: "Patterned stimulation restores motor neuron activation",
    mechanismFi: "Kuvioitu stimulaatio palauttaa motoristen neuronien aktivaation",
    mechanismJa: "パターン化された刺激が運動ニューロンの活性化を回復",
    mechanismFr: "La stimulation structurée restaure l'activation des motoneurones",
    mechanismKo: "패턴화된 자극이 운동 뉴런 활성화를 회복",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "sacral",
    nameEn: "Sacral neuromodulation (InterStim)",
    nameFi: "Sakraalineuromodulaatio (InterStim)",
    nameJa: "仙骨神経調節（InterStim）",
    nameFr: "Neuromodulation sacrée (InterStim)",
    nameKo: "천골 신경조절 (InterStim)",
    fdaStatus: "PMA 1997",
    freqMin: 10,
    freqMax: 20,
    freqLabel: "10–20 Hz",
    mechanismEn: "Sacral nerve modulation restores bladder/bowel control",
    mechanismFi: "Sakraalihermon modulaatio palauttaa rakon/suolen hallinnan",
    mechanismJa: "仙骨神経調節が膀胱/腸制御を回復",
    mechanismFr: "La modulation du nerf sacré restaure le contrôle vésical/intestinal",
    mechanismKo: "천골 신경 조절이 방광/장 조절을 회복",
    nonThermal: true,
    bermPath: "E",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "cochlear",
    nameEn: "Cochlear implant",
    nameFi: "Sisäkorvaistute",
    nameJa: "人工内耳",
    nameFr: "Implant cochléaire",
    nameKo: "인공와우",
    fdaStatus: "PMA 1984",
    freqMin: 100,
    freqMax: 8000,
    freqLabel: "100–8000 Hz",
    mechanismEn: "Pulsed current directly stimulates auditory nerve fibers",
    mechanismFi: "Pulssivirta stimuloi suoraan kuulohermon säikeitä",
    mechanismJa: "パルス電流が聴神経線維を直接刺激",
    mechanismFr: "Le courant pulsé stimule directement les fibres du nerf auditif",
    mechanismKo: "펄스 전류가 청신경 섬유를 직접 자극",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "ems",
    nameEn: "EMS (muscle stimulation)",
    nameFi: "EMS (lihasstimulaatio)",
    nameJa: "EMS（筋肉刺激）",
    nameFr: "EMS (stimulation musculaire)",
    nameKo: "EMS (근육자극)",
    fdaStatus: "510(k)",
    freqMin: 20,
    freqMax: 120,
    freqLabel: "20–120 Hz",
    mechanismEn: "Electrical pulses contract skeletal muscle non-thermally",
    mechanismFi: "Sähköpulssit supistavat luurankolihasta ei-termisesti",
    mechanismJa: "電気パルスが非熱的に骨格筋を収縮",
    mechanismFr: "Les impulsions électriques contractent le muscle squelettique de manière non thermique",
    mechanismKo: "전기 펄스가 비열적으로 골격근을 수축",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  {
    id: "ect",
    nameEn: "ECT (electroconvulsive therapy)",
    nameFi: "ECT (sähkökonvulsioterapia)",
    nameJa: "ECT（電気けいれん療法）",
    nameFr: "ECT (électroconvulsivothérapie)",
    nameKo: "ECT (전기경련요법)",
    fdaStatus: "Class III",
    freqMin: 70,
    freqMax: 140,
    freqLabel: "70–140 Hz",
    mechanismEn: "Brief pulse current induces controlled seizure for depression",
    mechanismFi: "Lyhyt pulssisivirta tuottaa kontrolloidun kohtauksen masennukseen",
    mechanismJa: "短いパルス電流がうつ病のために制御された発作を誘導",
    mechanismFr: "Le courant à impulsion brève induit une crise contrôlée pour la dépression",
    mechanismKo: "짧은 펄스 전류가 우울증을 위한 통제된 발작을 유도",
    nonThermal: true,
    bermPath: "D",
    band: "elf",
    color: "#9C27B0",
  },
  // IF
  {
    id: "ttfields",
    nameEn: "TTFields (Optune)",
    nameFi: "TTFields (Optune)",
    nameJa: "TTFields (Optune)",
    nameFr: "TTFields (Optune)",
    nameKo: "TTFields (Optune)",
    fdaStatus: "PMA 2011/2015/2026",
    freqMin: 100_000,
    freqMax: 500_000,
    freqLabel: "100–500 kHz",
    mechanismEn: "Disrupts mitotic spindle formation (non-thermal)",
    mechanismFi: "Häiritsee mitoottisen karan muodostumista (ei-terminen)",
    mechanismJa: "有糸分裂紡錘体形成を阻害（非熱的）",
    mechanismFr: "Perturbe la formation du fuseau mitotique (non thermique)",
    mechanismKo: "유사분열 방추체 형성을 방해 (비열적)",
    nonThermal: true,
    bermPath: "A_mitotic",
    band: "if",
    color: "#FF5722",
  },
  {
    id: "ifc",
    nameEn: "Interferential current therapy",
    nameFi: "Interferentiaalivirtaterapia",
    nameJa: "干渉電流療法",
    nameFr: "Thérapie par courant interférentiel",
    nameKo: "간섭전류치료",
    fdaStatus: "510(k)",
    freqMin: 1_000,
    freqMax: 4_000,
    freqLabel: "1–4 kHz",
    mechanismEn: "Two crossed AC currents produce deep-tissue stimulation",
    mechanismFi: "Kaksi risteävää AC-virtaa tuottavat syvän kudosstimulaation",
    mechanismJa: "2つの交差AC電流が深部組織刺激を生成",
    mechanismFr: "Deux courants AC croisés produisent une stimulation des tissus profonds",
    mechanismKo: "두 교차 AC 전류가 심부 조직 자극을 생성",
    nonThermal: true,
    bermPath: "D",
    band: "if",
    color: "#FF5722",
  },
  {
    id: "rf_ablation",
    nameEn: "RF ablation (AM-modulated)",
    nameFi: "RF-ablaatio (AM-moduloitu)",
    nameJa: "RF焼灼（AM変調）",
    nameFr: "Ablation RF (modulée en AM)",
    nameKo: "RF 절제 (AM 변조)",
    fdaStatus: "Approved",
    freqMin: 300_000,
    freqMax: 5_000_000,
    freqLabel: "300 kHz–5 MHz",
    mechanismEn: "Amplitude-modulated RF: non-thermal anticancer effect",
    mechanismFi: "Amplitudimoduloitu RF: ei-terminen syöpävastainen vaikutus",
    mechanismJa: "振幅変調RF：非熱的抗がん効果",
    mechanismFr: "RF modulée en amplitude : effet anticancéreux non thermique",
    mechanismKo: "진폭 변조 RF: 비열적 항암 효과",
    nonThermal: true,
    bermPath: "A",
    band: "if",
    color: "#FF5722",
  },
  // HF (RF below telecom)
  {
    id: "prf",
    nameEn: "PRF anti-inflammatory",
    nameFi: "PRF tulehdushoito",
    nameJa: "PRF抗炎症",
    nameFr: "PRF anti-inflammatoire",
    nameKo: "PRF 항염증",
    fdaStatus: "510(k)",
    freqMin: 27_120_000,
    freqMax: 27_120_000,
    freqLabel: "27.12 MHz",
    mechanismEn: "Pulsed RF produces non-thermal anti-inflammatory tissue response",
    mechanismFi: "Pulsattu RF tuottaa ei-termisen anti-inflammatorisen kudosvasteen",
    mechanismJa: "パルスRFが非熱的抗炎症組織応答を生成",
    mechanismFr: "Le RF pulsé produit une réponse tissulaire anti-inflammatoire non thermique",
    mechanismKo: "펄스 RF가 비열적 항염증 조직 반응을 생성",
    nonThermal: true,
    bermPath: "A",
    band: "hf",
    color: "#FF9800",
  },
  // OPTICAL (near-IR, visible, UV)
  {
    id: "lllt",
    nameEn: "LLLT / Photobiomodulation",
    nameFi: "LLLT / Fotobiomodulaatio",
    nameJa: "LLLT / フォトバイオモジュレーション",
    nameFr: "LLLT / Photobiomodulation",
    nameKo: "LLLT / 광생체조절",
    fdaStatus: "510(k) 2007",
    freqMin: 2.73e14,
    freqMax: 4.84e14,
    freqLabel: "620–1100 nm",
    mechanismEn: "Photon absorption by mitochondrial cytochrome c oxidase → ATP/ROS",
    mechanismFi: "Fotonin absorptio mitokondriaalisen sytokromi c -oksidaasin toimesta → ATP/ROS",
    mechanismJa: "ミトコンドリアのシトクロムcオキシダーゼによる光子吸収→ATP/ROS",
    mechanismFr: "Absorption photonique par la cytochrome c oxydase mitochondriale → ATP/ROS",
    mechanismKo: "미토콘드리아 시토크롬 c 산화효소에 의한 광자 흡수 → ATP/ROS",
    nonThermal: true,
    bermPath: "CCO",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "blue_light",
    nameEn: "Blue light therapy (jaundice)",
    nameFi: "Sinivaloterapia (keltaisuus)",
    nameJa: "青色光線療法（黄疸）",
    nameFr: "Photothérapie lumière bleue (ictère)",
    nameKo: "청색광 치료 (황달)",
    fdaStatus: "510(k)",
    freqMin: 6.12e14,
    freqMax: 7.14e14,
    freqLabel: "420–490 nm",
    mechanismEn: "Photoisomerization of bilirubin — no thermal component",
    mechanismFi: "Bilirubiinin fotoisomerisaatio — ei termistä komponenttia",
    mechanismJa: "ビリルビンの光異性化 — 熱成分なし",
    mechanismFr: "Photoisomérisation de la bilirubine — aucune composante thermique",
    mechanismKo: "빌리루빈의 광이성질화 — 열 성분 없음",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "uv_photo",
    nameEn: "UV phototherapy (psoriasis)",
    nameFi: "UV-valohoito (psoriasis)",
    nameJa: "UV光線療法（乾癬）",
    nameFr: "Photothérapie UV (psoriasis)",
    nameKo: "UV 광선요법 (건선)",
    fdaStatus: "510(k)",
    freqMin: 9.37e14,
    freqMax: 1.03e15,
    freqLabel: "290–320 nm",
    mechanismEn: "UV-B immunomodulation via T-cell apoptosis and cytokine shift",
    mechanismFi: "UV-B-immunomodulaatio T-soluapoptoosin ja sytokiinimuutoksen kautta",
    mechanismJa: "T細胞アポトーシスとサイトカインシフトによるUV-B免疫調節",
    mechanismFr: "Immunomodulation UV-B via l'apoptose des cellules T et le déplacement des cytokines",
    mechanismKo: "T세포 세포자멸사와 사이토카인 전환을 통한 UV-B 면역조절",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
  {
    id: "pdt",
    nameEn: "Photodynamic therapy (PDT)",
    nameFi: "Fotodynaaminen terapia (PDT)",
    nameJa: "光線力学療法（PDT）",
    nameFr: "Thérapie photodynamique (PDT)",
    nameKo: "광역학치료 (PDT)",
    fdaStatus: "PMA",
    freqMin: 4.35e14,
    freqMax: 4.76e14,
    freqLabel: "630–690 nm",
    mechanismEn: "Light activates photosensitizer → singlet oxygen → tumor cell death",
    mechanismFi: "Valo aktivoi fotosensitisaattorin → singlettihappi → kasvainsolujen kuolema",
    mechanismJa: "光が光増感剤を活性化→一重項酸素→腫瘍細胞死",
    mechanismFr: "La lumière active le photosensibilisateur → oxygène singulet → mort des cellules tumorales",
    mechanismKo: "빛이 광감작제를 활성화 → 일중항 산소 → 종양 세포 사멸",
    nonThermal: true,
    bermPath: "photochem",
    band: "optical",
    color: "#E91E63",
  },
];

interface Band {
  id: string;
  label: string;
  labelFi: string;
  logMin: number;
  logMax: number;
  color: string;
  count: number;
}

const BANDS: Band[] = [
  { id: "dc", label: "DC", labelFi: "DC", logMin: -2, logMax: -0.5, color: "#607D8B", count: DEVICES.filter((d) => d.band === "dc").length },
  { id: "elf", label: "ELF", labelFi: "ELF", logMin: -0.5, logMax: 3.2, color: "#9C27B0", count: DEVICES.filter((d) => d.band === "elf").length },
  { id: "if", label: "IF", labelFi: "IF", logMin: 3, logMax: 6.7, color: "#FF5722", count: DEVICES.filter((d) => d.band === "if").length },
  { id: "hf", label: "HF", labelFi: "HF", logMin: 7, logMax: 7.8, color: "#FF9800", count: DEVICES.filter((d) => d.band === "hf").length },
  { id: "optical", label: "Optical", labelFi: "Optinen", logMin: 14.3, logMax: 15.1, color: "#E91E63", count: DEVICES.filter((d) => d.band === "optical").length },
];

const GAP = { logMin: 8.5, logMax: 11, label: "Telecom RF", labelFi: "Telecom-RF" };

const ENV_BANDS = [
  {
    id: "cellular",
    label: { en: "Cellular", fi: "Matkapuhelinverkot", ja: "携帯電話網", fr: "Réseaux cellulaires", ko: "이동통신망" },
    min: 700_000_000,
    max: 3_500_000_000,
    freqLabel: "700 MHz–3.5 GHz",
    color: "#F44336",
    fill: "#F4433625",
  },
  {
    id: "wifi",
    label: { en: "Wi-Fi", fi: "Wi-Fi", ja: "Wi-Fi", fr: "Wi-Fi", ko: "Wi-Fi" },
    min: 2_400_000_000,
    max: 6_000_000_000,
    freqLabel: "2.4–6 GHz",
    color: "#2196F3",
    fill: "#2196F325",
  },
];

const COPY = {
  en: {
    title: "The Spectrum of Proof",
    subtitle: "Non-thermal biological effects are regulatory-approved across the entire EM spectrum — except at telecom RF frequencies",
    gapTitle: "THE GAP",
    gapSub: "0 therapeutic\ncategories",
    gapNote: "The only frequency range where non-thermal bioactivity is 'not recognized' is the range used by the telecommunications industry",
    categories: "categories",
    clickHint: "Click a band or row for details",
    freq: "Frequency",
    device: "Device",
    fda: "FDA status",
    mechanism: "Mechanism",
    path: "BERM pathway",
    bandDc: "DC / Static",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "Optical (IR – UV)",
    totalCategories: "device categories",
    totalApprovals: "individual FDA approvals in TENS alone",
    totalMarket: "global neuromodulation market",
    totalImplanted: "DBS devices implanted worldwide",
  },
  fi: {
    title: "Todistuksen spektri",
    subtitle: "Ei-termiset biologiset vaikutukset ovat regulaattorihyväksyttyjä koko EM-spektrillä — paitsi telecom-RF-taajuuksilla",
    gapTitle: "AUKKO",
    gapSub: "0 terapeuttista\nkategoriaa",
    gapNote: "Ainoa taajuusalue jossa ei-termistä bioaktiivisuutta 'ei tunnusteta' on telekommunikaatioteollisuuden käyttämä alue",
    categories: "kategoriaa",
    clickHint: "Klikkaa kaistaa tai riviä nähdäksesi tiedot",
    freq: "Taajuus",
    device: "Laite",
    fda: "FDA-status",
    mechanism: "Mekanismi",
    path: "BERM-polku",
    bandDc: "DC / Staattinen",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "Optinen (IR – UV)",
    totalCategories: "laitekategoriaa",
    totalApprovals: "yksittäistä FDA-hyväksyntää pelkässä TENS-kategoriassa",
    totalMarket: "globaalit neuromodulaatiomarkkinat",
    totalImplanted: "DBS-laitetta implantoitu maailmanlaajuisesti",
  },
  ja: {
    title: "証明のスペクトル",
    subtitle: "非熱的生物学的効果はEMスペクトル全体で規制承認されている ― テレコムRF周波数を除いて",
    gapTitle: "ギャップ",
    gapSub: "0 治療\nカテゴリー",
    gapNote: "非熱的生物活性が「認められていない」唯一の周波数範囲は、電気通信産業が使用する範囲である",
    categories: "カテゴリー",
    clickHint: "バンドまたは行をクリックして詳細を表示",
    freq: "周波数",
    device: "デバイス",
    fda: "FDAステータス",
    mechanism: "メカニズム",
    path: "BERM経路",
    bandDc: "DC / 静的",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "光学 (IR – UV)",
    totalCategories: "デバイスカテゴリー",
    totalApprovals: "TENSだけで個別FDA承認",
    totalMarket: "グローバルニューロモジュレーション市場",
    totalImplanted: "世界中にDBS装置が埋め込まれた",
  },
  fr: {
    title: "Le spectre de la preuve",
    subtitle: "Les effets biologiques non thermiques sont approuvés sur tout le spectre EM — sauf aux fréquences RF des télécommunications",
    gapTitle: "LE VIDE",
    gapSub: "0 catégorie\nthérapeutique",
    gapNote: "La seule gamme de fréquences où la bioactivité non thermique n'est « pas reconnue » est celle utilisée par l'industrie des télécommunications",
    categories: "catégories",
    clickHint: "Cliquez sur une bande ou une ligne pour les détails",
    freq: "Fréquence",
    device: "Dispositif",
    fda: "Statut FDA",
    mechanism: "Mécanisme",
    path: "Voie BERM",
    bandDc: "DC / Statique",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "Optique (IR – UV)",
    totalCategories: "catégories de dispositifs",
    totalApprovals: "approbations FDA individuelles pour TENS uniquement",
    totalMarket: "marché mondial de la neuromodulation",
    totalImplanted: "dispositifs DBS implantés dans le monde",
  },
  ko: {
    title: "증거의 스펙트럼",
    subtitle: "비열적 생물학적 효과는 전체 EM 스펙트럼에서 규제 승인됨 — 텔레콤 RF 주파수만 제외",
    gapTitle: "공백",
    gapSub: "0 치료\n카테고리",
    gapNote: "비열적 생물활성이 '인정되지 않는' 유일한 주파수 범위는 통신 산업이 사용하는 범위이다",
    categories: "카테고리",
    clickHint: "밴드 또는 행을 클릭하여 세부 정보 보기",
    freq: "주파수",
    device: "장치",
    fda: "FDA 상태",
    mechanism: "메커니즘",
    path: "BERM 경로",
    bandDc: "DC / 정적",
    bandElf: "ELF (< 1 kHz)",
    bandIf: "IF (1 kHz – 30 MHz)",
    bandHf: "HF (27 MHz)",
    bandOptical: "광학 (IR – UV)",
    totalCategories: "장치 카테고리",
    totalApprovals: "TENS 단독 개별 FDA 승인",
    totalMarket: "글로벌 신경조절 시장",
    totalImplanted: "전 세계 DBS 장치 이식",
  },
};

const BAND_LABELS: Record<string, Record<string, string>> = {
  dc: { en: "DC / Static", fi: "DC / Staattinen", ja: "DC / 静的", fr: "DC / Statique", ko: "DC / 정적" },
  elf: { en: "ELF (< 1 kHz)", fi: "ELF (< 1 kHz)", ja: "ELF (< 1 kHz)", fr: "ELF (< 1 kHz)", ko: "ELF (< 1 kHz)" },
  if: { en: "IF (1 kHz – 30 MHz)", fi: "IF (1 kHz – 30 MHz)", ja: "IF (1 kHz – 30 MHz)", fr: "IF (1 kHz – 30 MHz)", ko: "IF (1 kHz – 30 MHz)" },
  hf: { en: "HF (27 MHz)", fi: "HF (27 MHz)", ja: "HF (27 MHz)", fr: "HF (27 MHz)", ko: "HF (27 MHz)" },
  optical: { en: "Optical (IR – UV)", fi: "Optinen (IR – UV)", ja: "光学 (IR – UV)", fr: "Optique (IR – UV)", ko: "광학 (IR – UV)" },
};

function logToX(logF: number, chartX: number, chartW: number): number {
  const logMin = -2;
  const logMax = 15.5;
  return chartX + ((logF - logMin) / (logMax - logMin)) * chartW;
}

const TICK_FREQS: [number, string][] = [
  [0.1, "0.1 Hz"],
  [1, "1 Hz"],
  [10, "10 Hz"],
  [100, "100 Hz"],
  [1e3, "1 kHz"],
  [1e4, "10 kHz"],
  [1e5, "100 kHz"],
  [1e6, "1 MHz"],
  [1e7, "10 MHz"],
  [1e8, "100 MHz"],
  [1e9, "1 GHz"],
  [1e10, "10 GHz"],
  [1e11, "100 GHz"],
  [1e12, "1 THz"],
  [1e13, "10 THz"],
  [1e14, "100 THz"],
  [1e15, "1 PHz"],
];

export function TherapeuticFrequencyMap({ locale }: { locale: string }) {
  const [selectedBand, setSelectedBand] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const d = pickCopy(COPY, locale);

  const chartX = 40;
  const chartW = 740;
  const barY = 60;
  const barH = 100;
  const svgW = 820;
  const svgH = 260;

  const maxCount = Math.max(...BANDS.map((b) => b.count));

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold mb-1">{d.title}</h4>
      <p className="text-xs text-foreground-muted mb-4">{d.subtitle}</p>

      {/* Spectrum visualization */}
      <div className="chart-surface">
        <div className="chart-scroll">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            xmlns="http://www.w3.org/2000/svg"
            className="chart-svg w-full min-w-[700px]"
            role="img"
            aria-label={d.title}
          >
          {/* Background track */}
          <rect x={chartX} y={barY} width={chartW} height={barH} rx={8} fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth={1} />

          {TICK_FREQS.map(([freq]) => {
            const x = logToX(Math.log10(freq), chartX, chartW);
            if (x < chartX || x > chartX + chartW) return null;
            return (
              <line
                key={`grid-${freq}`}
                className="chart-grid-line"
                x1={x}
                y1={barY}
                x2={x}
                y2={barY + barH}
              />
            );
          })}

          {/* Proven bands */}
          {BANDS.map((band) => {
            const x1 = logToX(band.logMin, chartX, chartW);
            const x2 = logToX(band.logMax, chartX, chartW);
            const h = (band.count / maxCount) * barH * 0.85;
            const y = barY + barH - h;
            const isSelected = selectedBand === band.id;
            return (
              <g key={band.id} tabIndex={0} role="button" style={{ cursor: "pointer" }} onClick={() => { setSelectedBand(isSelected ? null : band.id); setSelectedDevice(null); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedBand(isSelected ? null : band.id); setSelectedDevice(null); } }}>
                <rect x={x1} y={y} width={x2 - x1} height={h} rx={4} fill={band.color} opacity={isSelected ? 0.96 : 0.76} stroke={isSelected ? "var(--foreground)" : "var(--figure-bg)"} strokeWidth={isSelected ? 2 : 1} />
                <text x={(x1 + x2) / 2} y={y - 4} fill="var(--foreground)" fontSize={10} fontWeight="700" textAnchor="middle" fontFamily="ui-monospace, monospace">
                  {band.count}
                </text>
                <text x={(x1 + x2) / 2} y={barY - 6} fill="var(--foreground-muted)" fontSize={8} textAnchor="middle">
                  {pickCopy(BAND_LABELS[band.id], locale)}
                </text>
              </g>
            );
          })}

          {/* THE GAP */}
          {(() => {
            const gx1 = logToX(GAP.logMin, chartX, chartW);
            const gx2 = logToX(GAP.logMax, chartX, chartW);
            return (
              <g>
                <defs>
                  <pattern id="gap-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                    <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="var(--foreground-muted)" strokeWidth={0.5} opacity={0.3} />
                  </pattern>
                </defs>
                <rect x={gx1} y={barY} width={gx2 - gx1} height={barH} fill="url(#gap-hatch)" rx={0} />
                <rect x={gx1} y={barY} width={gx2 - gx1} height={barH} fill="none" stroke="var(--status-refuted)" strokeWidth={2} strokeDasharray="6 3" rx={0} />
                <text x={(gx1 + gx2) / 2} y={barY + 25} fill="var(--status-refuted)" fontSize={12} fontWeight="800" textAnchor="middle" letterSpacing="0.08em">
                  {d.gapTitle}
                </text>
                <text x={(gx1 + gx2) / 2} y={barY + 42} fill="var(--foreground-muted)" fontSize={9} textAnchor="middle">
                  {d.gapSub.split("\n").map((line, i) => (
                    <tspan key={i} x={(gx1 + gx2) / 2} dy={i === 0 ? 0 : 12}>{line}</tspan>
                  ))}
                </text>
                {/* Telecom bands use separate lanes; their full labels live in the
                    responsive legend below so narrow frequency spans stay legible. */}
                {ENV_BANDS.map((band, index) => {
                  const ex1 = logToX(Math.log10(band.min), chartX, chartW);
                  const ex2 = logToX(Math.log10(band.max), chartX, chartW);
                  const laneY = barY + barH - 34 + index * 16;
                  return (
                    <g key={band.id}>
                      <title>{`${pickCopy(band.label, locale)}: ${band.freqLabel}`}</title>
                      <rect
                        x={ex1}
                        y={laneY}
                        width={ex2 - ex1}
                        height={10}
                        rx={5}
                        fill={band.fill}
                        stroke={band.color}
                        strokeWidth={1.5}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* Frequency axis */}
          <line className="chart-axis-line" x1={chartX} y1={barY + barH} x2={chartX + chartW} y2={barY + barH} strokeWidth={1} />
          {TICK_FREQS.map(([freq, label]) => {
            const logF = Math.log10(freq);
            const x = logToX(logF, chartX, chartW);
            if (x < chartX || x > chartX + chartW) return null;
            const show = [0.1, 1, 100, 1e3, 1e5, 1e6, 1e8, 1e9, 1e11, 1e13, 1e15].includes(freq);
            return (
              <g key={freq}>
                <line x1={x} y1={barY + barH} x2={x} y2={barY + barH + (show ? 6 : 3)} stroke="var(--foreground-muted)" strokeWidth={0.5} />
                {show && (
                  <text x={x} y={barY + barH + 16} fill="var(--foreground-muted)" fontSize={8} textAnchor="middle" fontFamily="ui-monospace, monospace">
                    {label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Arrow connectors DC ← → Optical */}
          <text x={chartX + 4} y={svgH - 6} fill="var(--foreground-muted)" fontSize={8} fontStyle="italic">
            {d.clickHint}
          </text>
          </svg>
        </div>

        <ul className="chart-legend mt-1 border-t border-card-border/70 pt-3" aria-label={d.gapTitle}>
          {ENV_BANDS.map((band) => (
            <li key={band.id} className="chart-key">
              <span
                className="chart-key__swatch"
                style={{ backgroundColor: band.color }}
                aria-hidden="true"
              />
              <span>{pickCopy(band.label, locale)}</span>
              <span className="font-mono-num opacity-75">{band.freqLabel}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gap callout */}
      <div className="mt-3 rounded-lg border-2 border-status-refuted/30 bg-status-refuted/5 px-4 py-3">
        <p className="text-xs text-foreground-muted leading-relaxed">{d.gapNote}</p>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: "26", label: d.totalCategories },
          { n: "12,000+", label: d.totalApprovals },
          { n: "$8–10B", label: d.totalMarket },
          { n: "160,000+", label: d.totalImplanted },
        ].map((s) => (
          <div key={s.label} className="border border-card-border bg-card-bg rounded-lg px-3 py-2 text-center">
            <div className="text-lg font-semibold font-mono-num text-accent">{s.n}</div>
            <div className="text-[10px] text-foreground-muted leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Selected device detail */}
      {selectedDevice && (
        <div className="mt-4 border border-card-border bg-card-bg rounded-lg p-4 text-sm">
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold">{pickSuffix(selectedDevice, "name", locale)}</h5>
            <button onClick={() => setSelectedDevice(null)} className="text-foreground-muted hover:text-foreground text-xs">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><span className="text-foreground-muted">{d.freq}:</span> {selectedDevice.freqLabel}</div>
            <div><span className="text-foreground-muted">{d.fda}:</span> {selectedDevice.fdaStatus}</div>
            <div className="col-span-2"><span className="text-foreground-muted">{d.mechanism}:</span> {pickSuffix(selectedDevice, "mechanism", locale)}</div>
            <div><span className="text-foreground-muted">{d.path}:</span> {selectedDevice.bermPath}</div>
            <div>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selectedDevice.color }} />
              Non-thermal: ✓
            </div>
          </div>
        </div>
      )}

      {/* Grouped table */}
      <div className="mt-6 overflow-x-auto">
        {(["dc", "elf", "if", "hf", "optical"] as const).map((bandId) => {
          const bandDevices = DEVICES.filter((dev) => dev.band === bandId);
          const bl = BAND_LABELS[bandId];
          const isExpanded = selectedBand === null || selectedBand === bandId;
          const bandColor = BANDS.find((b) => b.id === bandId)?.color ?? "#888";
          return (
            <div key={bandId} className={`mb-4 ${isExpanded ? "" : "opacity-40"}`}>
              <button
                className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:opacity-80"
                onClick={() => { setSelectedBand(selectedBand === bandId ? null : bandId); setSelectedDevice(null); }}
              >
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: bandColor }} />
                {pickCopy(bl, locale)}
                <span className="font-mono-num text-foreground-muted">({bandDevices.length})</span>
              </button>
              {isExpanded && (
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.freq}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.device}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.fda}</th>
                      <th className="text-left py-1 pr-3 font-semibold text-foreground-muted">{d.mechanism}</th>
                      <th className="text-left py-1 font-semibold text-foreground-muted">{d.path}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bandDevices.map((dev) => (
                      <tr
                        key={dev.id}
                        tabIndex={0}
                        className={`border-b border-card-border/50 cursor-pointer ${selectedDevice?.id === dev.id ? "bg-accent/10" : "hover:bg-card-bg"}`}
                        onClick={() => setSelectedDevice(selectedDevice?.id === dev.id ? null : dev)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedDevice(selectedDevice?.id === dev.id ? null : dev); } }}
                      >
                        <td className="py-1.5 pr-3 font-mono-num whitespace-nowrap">
                          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: dev.color }} />
                          {dev.freqLabel}
                        </td>
                        <td className="py-1.5 pr-3">{pickSuffix(dev, "name", locale)}</td>
                        <td className="py-1.5 pr-3 whitespace-nowrap">{dev.fdaStatus}</td>
                        <td className="py-1.5 pr-3 text-foreground-muted">{pickSuffix(dev, "mechanism", locale)}</td>
                        <td className="py-1.5 font-mono-num">{dev.bermPath}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
