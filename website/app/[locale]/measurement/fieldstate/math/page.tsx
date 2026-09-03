import type { Metadata } from "next";
import Link from "next/link";
import { Sigma } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { MathBlock } from "@/components/MathBlock";

type SectionData = {
  id: string;
  title: string;
  body: readonly string[];
  equations?: readonly string[];
  note?: string;
};

type Copy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  versionNote: string;
  nav: readonly { id: string; label: string }[];
  sections: readonly SectionData[];
  modelLink: string;
  fieldstateLink: string;
  nextLabel: string;
  nextTitle: string;
};

const equations = {
  metric: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+\\kappa A_\\mu A_\\nu"],
  record: [
    "\\mathcal M_o=\\{\\mathbf E_o(t),\\mathbf B_o(t),PSD_o(f),\\phi_o(t),p_o(t),c_o(t),u_o,q_o\\}",
    "\\widehat{\\mathbf A}_{o,k}(f)=T_{o,k}(f;\\text{geometry, posture})\\,\\mathbf A_k(f)",
    "\\Xi_o(W)=\\int PSD_{\\mathrm{envelope/beat},o}(f)W(f)\\,df",
  ],
  staticInterface: [
    "\\mathcal S=\\{Q,\\Delta\\phi_{ref},\\mathbf E(\\mathbf r,t),\\nabla|E|^2,dE/dt,\\tau\\}",
    "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
    "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
  ],
  boundary: [
    "\\text{FieldState observation}\\;\\xrightarrow{\\;L2:\\ \\Xi_i\\;\\mathrm{uncalibrated}\\;}\\;\\text{BERM biological state}",
  ],
} as const;

const t: Record<string, Copy> = {
  en: {
    metaTitle: "FieldState v2 measurement mathematics – Extinction Field",
    metaDescription:
      "FieldState v2 vector, spectrum, transfer and provenance equations, separated from BERM by a conditional L2 response boundary with open tissue calibration.",
    title: "FieldState v2 measurement mathematics",
    subtitle:
      "Measurement and estimation coordinates at BERM’s input boundary—not a derived route from Lindgren geometry to a biological or demographic outcome.",
    versionNote:
      "FieldState v2 is an optional measurement, observation and estimation module. Sections 1–3 define its physical record; section 4 marks where it stops. BERM owns the conditional formal L2 operator, whose tissue kernel remains uncalibrated; FieldState v2 produces no country forecast.",
    nav: [
      { id: "premise", label: "Geometry context" },
      { id: "field-record", label: "Field record" },
      { id: "static-interface", label: "Static interface" },
      { id: "boundary", label: "BERM boundary" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Geometry supplies context, not a biological operator",
        body: [
          "The 2025 Lindgren ansatz places the electromagnetic four-potential in the metric. Its geometric consequences motivate retaining background dependence, vector orientation and quadratic cross-terms in a measurement record.",
          "BERM now derives the formal mapping δ⟨O_i⟩=∫Ξ_i^{μν}δg_{μν}+… conditional on matter–metric coupling and response theory. FieldState supplies neither the tissue kernel Ξ_i nor its SHBG, AR, ZIP9, ion-channel or organ-endpoint calibration.",
        ],
        equations: equations.metric,
        note:
          "For a normalized positive-norm mode, χ_geo(ρ)=ρ/√(1+ρ²) is derived from the rank-one inverse metric. It is a geometry coordinate—not a FieldState measurement or calibrated biological susceptibility.",
      },
      {
        id: "field-record",
        title: "2. A FieldState record preserves local physical structure",
        body: [
          "For each source class and target location, the record keeps background, ambient and personal components distinct. It retains calibrated E/B waveforms, vector direction, phase or coherence, peaks, RMS values, pulse timing, envelope or beat spectra, circadian context, uncertainty and provenance.",
          "An organ-level quantity is an estimate only when a named transfer function, geometry, posture and calibration are supplied. National technology-diffusion series are separate proxies and cannot be substituted for these measurements.",
        ],
        equations: equations.record,
        note:
          "The weighting window W and transfer T are declared estimation assumptions unless independently calibrated. Xi is a reported spectral-overlap coordinate, not proof of a biological response.",
      },
      {
        id: "static-interface",
        title: "3. The static triboelectric interface is a local measurement branch",
        body: [
          "A material–skin or organism interface is recorded as charge, reference potential, local field, field gradient, time derivative and decay. Material, humidity, motion, grounding and air-gap geometry remain explicit rather than being folded into an RF, ELF or national proxy.",
          "A historical material ranking or V/cm² reading is physically underdetermined without the reference electrode, probe geometry and calibration, ground-path impedance, capacitance, charge measurement and decay curve.",
        ],
        equations: equations.staticInterface,
        note:
          "The RC expression is a comparator, not a replacement for measured multiphase decay, and no population or reproductive coefficient follows from it.",
      },
      {
        id: "boundary",
        title: "4. FieldState stops at the BERM input boundary",
        body: [
          "A FieldState observation may constrain a future BERM input. It does not itself determine a molecular response, hormone production or use, organ capacity, behaviour, ASFR, TFR or political outcome.",
          "Those downstream links belong to BERM and remain conditional until the tissue-response kernel and subsequent endpoint mappings are calibrated. The published locked country predictions use the archived BERM v17 national scalar-proxy route; they are not FieldState-calibrated forecasts.",
        ],
        equations: equations.boundary,
        note:
          "Valid future calibration requires matched local FieldState, biological-endpoint and downstream outcome panels with train-only estimation and out-of-sample temporal evaluation.",
      },
    ],
    modelLink: "← BERM model overview",
    fieldstateLink: "FieldState measurement specification",
    nextLabel: "Next",
    nextTitle: "Evidence registry",
  },
  fi: {
    metaTitle: "FieldState v2 -mittausmatematiikka – Extinction Field",
    metaDescription:
      "FieldState v2:n vektori-, spektri-, siirto- ja provenienssiyhtälöt erotettuna BERM:stä ehdollisella L2-vasteella ja avoimella kudoskalibroinnilla.",
    title: "FieldState v2:n mittausmatematiikka",
    subtitle:
      "Mittaus- ja estimointikoordinaatit BERM:n syöterajalla – ei johdettu reitti Lindgrenin geometriasta biologiseen tai demografiseen tulokseen.",
    versionNote:
      "FieldState v2 on valinnainen mittaus-, havainto- ja estimointimoduuli. Osat 1–3 määrittelevät sen fysikaalisen tietueen; osa 4 osoittaa, mihin se päättyy. BERM omistaa ehdollisen formaalin L2-operaattorin, jonka kudosydin on kalibroimatta; FieldState v2 ei tuota maakohtaisia ennusteita.",
    nav: [
      { id: "premise", label: "Geometriakonteksti" },
      { id: "field-record", label: "Kenttätietue" },
      { id: "static-interface", label: "Staattinen rajapinta" },
      { id: "boundary", label: "BERM-raja" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Geometria antaa kontekstin, ei biologista operaattoria",
        body: [
          "Vuoden 2025 Lindgren-ansatz sijoittaa sähkömagneettisen nelipotentiaalin metriikkaan. Sen geometriset seuraukset motivoivat taustariippuvuuden, vektorisuunnan ja neliöllisten ristitermien säilyttämistä mittaustietueessa.",
          "BERM johtaa nyt formaalin kuvauksen δ⟨O_i⟩=∫Ξ_i^{μν}δg_{μν}+… ehdolla, että materia–metriikka-kytkentä ja vastefunktioteoria pätevät. FieldState ei anna kudosydintä Ξ_i eikä sen SHBG-, AR-, ZIP9-, ionikanava- tai elinpäätepistekalibraatiota.",
        ],
        equations: equations.metric,
        note:
          "Normalisoidulle positiivinormiselle moodille χ_geo(ρ)=ρ/√(1+ρ²) johdetaan käänteisestä rank-one-metriikasta. Se on geometriakoordinaatti – ei FieldState-mittaus eikä kalibroitu biologinen herkkyys.",
      },
      {
        id: "field-record",
        title: "2. FieldState-tietue säilyttää paikallisen fysikaalisen rakenteen",
        body: [
          "Tietue pitää tausta-, ambient- ja henkilökohtaiset komponentit erillään jokaiselle lähdeluokalle ja kohdepaikalle. Se säilyttää kalibroidut E/B-aaltomuodot, vektorisuunnan, vaiheen tai koherenssin, huiput, RMS-arvot, pulssiajoituksen, envelope- tai beat-spektrit, vuorokausikontekstin, epävarmuuden ja provenienssin.",
          "Elintason suure on estimaatti vain, jos nimetty siirtofunktio, geometria, asento ja kalibrointi on annettu. Kansalliset teknologian leviämissarjat ovat erillisiä proxyja, eikä niitä voi korvata näillä mittauksilla.",
        ],
        equations: equations.record,
        note:
          "Painoikkuna W ja siirto T ovat ilmoitettuja estimointioletuksia, ellei niitä ole kalibroitu riippumattomasti. Xi on raportoitu spektrisen päällekkäisyyden koordinaatti, ei todiste biologisesta vasteesta.",
      },
      {
        id: "static-interface",
        title: "3. Staattinen triboelektrinen rajapinta on paikallinen mittaushaara",
        body: [
          "Materiaali–iho- tai eliörajapinnasta tallennetaan varaus, referenssipotentiaali, paikalliskenttä, kenttägradientti, aikaderivaatta ja purkautuminen. Materiaali, kosteus, liike, maadoitus ja ilmarakon geometria pidetään näkyvinä eikä niitä sulauteta RF-, ELF- tai kansalliseen proxyyn.",
          "Historiallinen materiaalijärjestys tai V/cm²-lukema on fysikaalisesti alimäärätty ilman referenssielektrodia, mittapään geometriaa ja kalibrointia, maareitin impedanssia, kapasitanssia, varausmittausta ja purkautumiskäyrää.",
        ],
        equations: equations.staticInterface,
        note:
          "RC-lauseke on vertailusuure, ei mitatun monivaiheisen purkautumisen korvike, eikä siitä seuraa populaatio- tai lisääntymiskerrointa.",
      },
      {
        id: "boundary",
        title: "4. FieldState päättyy BERM:n syöterajalle",
        body: [
          "FieldState-havainto voi rajata BERM:n tulevaa syötettä. Se ei itsessään määrää molekyylivastetta, hormonien tuotantoa tai käyttöä, elinkapasiteettia, käyttäytymistä, ASFR:ää, TFR:ää eikä poliittista lopputulosta.",
          "Nämä jatkolinkit kuuluvat BERM:ään ja pysyvät ehdollisina. L2:n formaali vastemuoto on johdettu lausutuilla oletuksilla, mutta kudosydin ja sitä seuraavat päätepistekuvaukset on edelleen kalibroitava. Julkaistut lukitut maaennusteet käyttävät arkistoitua BERM v17:n kansallista skalaariproxyreittiä; ne eivät ole FieldState-kalibroituja ennusteita.",
        ],
        equations: equations.boundary,
        note:
          "Pätevä tuleva kalibrointi vaatii kohdistetut paikalliset FieldState-, biologisen päätepisteen ja jatkotuloksen paneelit sekä vain opetusjaksolla tehdyn estimoinnin ja otoksen ulkopuolisen ajallisen arvioinnin.",
      },
    ],
    modelLink: "← BERM-mallin yleiskatsaus",
    fieldstateLink: "FieldState-mittausmäärittely",
    nextLabel: "Seuraavaksi",
    nextTitle: "Näyttörekisteri",
  },
  ja: {
    metaTitle: "FieldState v2 測定数学 – Extinction Field",
    metaDescription: "条件付きL2応答と未校正の組織カーネルでBERMから分離したFieldState v2のベクトル、スペクトル、伝達および来歴の数式。",
    title: "FieldState v2 測定数学",
    subtitle: "BERM入力境界における測定・推定座標であり、Lindgren幾何学から生物学・人口統計結果への導出経路ではありません。",
    versionNote: "FieldState v2は任意の測定・観察・推定モジュールです。第1～3節が物理記録を定義し、第4節がその終端を示します。BERMは条件付き形式L2演算子を所有し、その組織カーネルは未校正です。FieldStateは国別予測を生成しません。",
    nav: [
      { id: "premise", label: "幾何学的文脈" },
      { id: "field-record", label: "電磁界記録" },
      { id: "static-interface", label: "静電界面" },
      { id: "boundary", label: "BERM境界" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. 幾何学は文脈を与えるが、生物学的演算子ではない",
        body: [
          "2025年のLindgrenアンザッツは電磁四元ポテンシャルを計量に組み込みます。その幾何学的帰結は、背景依存性、ベクトル方向および二次交差項を測定記録に保持する動機になります。",
          "BERMは物質–計量結合と応答理論を条件として形式写像δ⟨O_i⟩=∫Ξ_iδg+…を導出します。FieldStateは組織カーネルΞ_iやSHBG、AR、ZIP9、臓器エンドポイントの校正を与えません。",
        ],
        equations: equations.metric,
        note: "χ_geo(ρ)=ρ/√(1+ρ²)は正規化された正ノルム・モードの逆計量から導出される幾何学座標であり、FieldState測定や生物学的感受性ではありません。",
      },
      {
        id: "field-record",
        title: "2. FieldState記録は局所物理構造を保持する",
        body: [
          "各ソース種別と対象位置について、背景・環境・個人成分を分離し、校正済みE/B波形、ベクトル方向、位相・コヒーレンス、ピーク、RMS、パルスタイミング、包絡線・ビートスペクトル、概日文脈、不確かさ、来歴を保持します。",
          "臓器量は、伝達関数、形状、姿勢および校正が明示された場合にのみ推定値です。国家技術普及系列は別のプロキシであり、局所測定の代用にはなりません。",
        ],
        equations: equations.record,
        note: "独立校正がない限り、WとTは明示された推定仮定です。Xiはスペクトル重なり座標であり、生物応答の証明ではありません。",
      },
      {
        id: "static-interface",
        title: "3. 静電摩擦電気界面は局所測定分岐である",
        body: [
          "材料–皮膚または生物界面では、電荷、基準電位、局所電磁界、勾配、時間微分および減衰を記録します。材料、湿度、運動、接地、空隙形状はRF・ELF・国家プロキシへ統合しません。",
          "歴史的材料順位やV/cm²値は、基準電極、プローブ形状と校正、接地経路インピーダンス、静電容量、電荷測定および減衰曲線なしには物理的に不十分です。",
        ],
        equations: equations.staticInterface,
        note: "RC式は比較量であり、測定された多相減衰の代替ではなく、集団・生殖係数も導きません。",
      },
      {
        id: "boundary",
        title: "4. FieldStateはBERM入力境界で終了する",
        body: [
          "FieldState観察は将来のBERM入力を制約できますが、分子応答、ホルモン産生・利用、臓器容量、行動、ASFR、TFRまたは政治結果を決定しません。",
          "下流リンクはBERMに属し、形式L2応答は条件付きで導出されていますが、組織カーネルとエンドポイント写像の校正が必要です。公開済み国別予測はBERM v17国家スカラープロキシ経路であり、FieldState校正予測ではありません。",
        ],
        equations: equations.boundary,
        note: "将来の校正には、対応する局所FieldState、生物学的エンドポイントおよび下流結果のパネルと、時系列外部評価が必要です。",
      },
    ],
    modelLink: "← BERMモデル概要",
    fieldstateLink: "FieldState測定仕様",
    nextLabel: "次へ",
    nextTitle: "エビデンスレジストリ",
  },
  fr: {
    metaTitle: "Mathématiques de mesure FieldState v2 – Extinction Field",
    metaDescription: "Équations vectorielles, spectrales, de transfert et de provenance de FieldState v2, séparées de BERM par une réponse L2 conditionnelle et une calibration tissulaire ouverte.",
    title: "Mathématiques de mesure FieldState v2",
    subtitle: "Coordonnées de mesure et d’estimation à la frontière d’entrée de BERM — pas une dérivation de la géométrie de Lindgren vers un résultat biologique ou démographique.",
    versionNote: "FieldState v2 est un module facultatif de mesure, d’observation et d’estimation. Les sections 1–3 définissent son enregistrement physique ; la section 4 marque sa limite. BERM possède l’opérateur L2 formel conditionnel, dont le noyau tissulaire reste non calibré ; FieldState ne produit aucune prévision nationale.",
    nav: [
      { id: "premise", label: "Contexte géométrique" },
      { id: "field-record", label: "Enregistrement" },
      { id: "static-interface", label: "Interface statique" },
      { id: "boundary", label: "Frontière BERM" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. La géométrie fournit un contexte, pas un opérateur biologique",
        body: [
          "L’ansatz de Lindgren de 2025 place le quadripotentiel électromagnétique dans la métrique. Ses conséquences géométriques motivent la conservation de la dépendance au fond, de l’orientation vectorielle et des termes croisés quadratiques dans un enregistrement de mesure.",
          "BERM dérive le mappage formel δ⟨O_i⟩=∫Ξ_iδg+… sous les conditions de couplage matière–métrique et de théorie de réponse. FieldState ne fournit ni le noyau Ξ_i ni sa calibration SHBG, AR, ZIP9 ou d’endpoint.",
        ],
        equations: equations.metric,
        note: "χ_geo(ρ)=ρ/√(1+ρ²) est une coordonnée géométrique dérivée de la métrique inverse pour un mode normalisé de norme positive, ni une mesure FieldState ni une sensibilité biologique.",
      },
      {
        id: "field-record",
        title: "2. Un enregistrement FieldState préserve la structure physique locale",
        body: [
          "Pour chaque classe de source et position cible, il sépare les composantes de fond, ambiantes et personnelles et conserve les formes d’onde E/B calibrées, direction, phase ou cohérence, pics, RMS, impulsions, spectres d’enveloppe ou de battement, contexte circadien, incertitude et provenance.",
          "Une grandeur d’organe n’est une estimation que si la fonction de transfert, la géométrie, la posture et la calibration sont nommées. Les séries nationales de diffusion technologique sont des proxys distincts et ne remplacent pas ces mesures.",
        ],
        equations: equations.record,
        note: "Sans calibration indépendante, W et T sont des hypothèses d’estimation déclarées. Xi décrit un recouvrement spectral et ne prouve pas une réponse biologique.",
      },
      {
        id: "static-interface",
        title: "3. L’interface triboélectrique statique est une branche de mesure locale",
        body: [
          "Pour une interface matériau–peau ou organisme, on enregistre charge, potentiel de référence, champ local, gradient, dérivée temporelle et décroissance. Matériau, humidité, mouvement, mise à la terre et entrefer restent explicites au lieu d’être intégrés à un proxy RF, ELF ou national.",
          "Un classement historique de matériaux ou une valeur V/cm² reste physiquement sous-déterminé sans électrode de référence, géométrie et calibration de sonde, impédance de terre, capacitance, mesure de charge et courbe de décroissance.",
        ],
        equations: equations.staticInterface,
        note: "L’expression RC est un comparateur, pas un substitut à une décroissance multiphasée mesurée, et ne fournit aucun coefficient populationnel ou reproductif.",
      },
      {
        id: "boundary",
        title: "4. FieldState s’arrête à la frontière d’entrée de BERM",
        body: [
          "Une observation FieldState peut contraindre une future entrée BERM. Elle ne détermine pas une réponse moléculaire, la production ou l’utilisation hormonale, la capacité d’un organe, le comportement, l’ASFR, le TFR ou un résultat politique.",
          "Ces liens aval appartiennent à BERM. La forme L2 est dérivée conditionnellement, mais le noyau tissulaire et les mappages d’endpoints doivent encore être calibrés. Les prévisions nationales publiées utilisent la route BERM v17 à proxy scalaire national ; elles ne sont pas calibrées par FieldState.",
        ],
        equations: equations.boundary,
        note: "Une future calibration exige des panels appariés de FieldState local, d’endpoints biologiques et de résultats aval, avec évaluation temporelle hors échantillon.",
      },
    ],
    modelLink: "← Vue d’ensemble du modèle BERM",
    fieldstateLink: "Spécification de mesure FieldState",
    nextLabel: "Suivant",
    nextTitle: "Registre des évidences",
  },
  ko: {
    metaTitle: "FieldState v2 측정 수학 – Extinction Field",
    metaDescription: "조직 보정이 열린 조건부 L2 경계에서 BERM과 분리된 FieldState v2 벡터, 스펙트럼, 전달 및 출처 방정식.",
    title: "FieldState v2 측정 수학",
    subtitle: "BERM 입력 경계의 측정·추정 좌표이며, Lindgren 기하학에서 생물학적 또는 인구학적 결과로의 도출 경로가 아닙니다.",
    versionNote: "FieldState v2는 선택적 측정·관찰·추정 모듈입니다. 1–3절은 물리 기록을 정의하고 4절은 그 경계를 표시합니다. 조건부 형식 L2 연산자는 BERM에 속하고 조직 커널은 미보정이며, FieldState는 국가 예측을 생성하지 않습니다.",
    nav: [
      { id: "premise", label: "기하학적 맥락" },
      { id: "field-record", label: "전자기장 기록" },
      { id: "static-interface", label: "정전 계면" },
      { id: "boundary", label: "BERM 경계" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. 기하학은 맥락을 제공하지만 생물학적 연산자는 아니다",
        body: [
          "2025년 Lindgren 안자츠는 전자기 4-퍼텐셜을 계량에 포함합니다. 그 기하학적 결과는 배경 의존성, 벡터 방향 및 이차 교차항을 측정 기록에 보존할 동기를 제공합니다.",
          "BERM은 물질–계량 결합과 응답 이론을 조건으로 형식 사상 δ⟨O_i⟩=∫Ξ_iδg+…을 도출합니다. FieldState는 조직 커널 Ξ_i나 SHBG, AR, ZIP9, 장기 종점 보정을 제공하지 않습니다.",
        ],
        equations: equations.metric,
        note: "χ_geo(ρ)=ρ/√(1+ρ²)는 정규화된 양의 노름 모드의 역계량에서 도출된 기하 좌표이며 FieldState 측정이나 생물학적 감수성이 아닙니다.",
      },
      {
        id: "field-record",
        title: "2. FieldState 기록은 국소 물리 구조를 보존한다",
        body: [
          "각 소스 종류와 대상 위치에 대해 배경·환경·개인 성분을 분리하고, 교정된 E/B 파형, 벡터 방향, 위상 또는 코히어런스, 피크, RMS, 펄스 타이밍, 포락선 또는 비트 스펙트럼, 일주기 맥락, 불확실성 및 출처를 보존합니다.",
          "장기 수준 양은 전달 함수, 형상, 자세 및 교정이 명시된 경우에만 추정값입니다. 국가 기술 확산 시계열은 별도의 프록시이며 이러한 측정을 대체할 수 없습니다.",
        ],
        equations: equations.record,
        note: "독립적으로 교정되지 않은 W와 T는 명시된 추정 가정입니다. Xi는 스펙트럼 중첩 좌표이며 생물학적 반응의 증명이 아닙니다.",
      },
      {
        id: "static-interface",
        title: "3. 정전 마찰전기 계면은 국소 측정 분기이다",
        body: [
          "재료–피부 또는 생물 계면에서 전하, 기준 전위, 국소장, 장 기울기, 시간 미분 및 감쇠를 기록합니다. 재료, 습도, 운동, 접지 및 공극 형상은 RF·ELF·국가 프록시에 통합하지 않고 명시적으로 유지합니다.",
          "역사적 재료 순위나 V/cm² 값은 기준 전극, 프로브 형상과 교정, 접지 경로 임피던스, 정전용량, 전하 측정 및 감쇠 곡선 없이는 물리적으로 미결정입니다.",
        ],
        equations: equations.staticInterface,
        note: "RC 식은 비교량이며 측정된 다상 감쇠를 대체하지 않고 집단 또는 생식 계수를 제공하지 않습니다.",
      },
      {
        id: "boundary",
        title: "4. FieldState는 BERM 입력 경계에서 끝난다",
        body: [
          "FieldState 관측은 미래의 BERM 입력을 제약할 수 있지만 분자 반응, 호르몬 생산·이용, 장기 용량, 행동, ASFR, TFR 또는 정치적 결과를 결정하지 않습니다.",
          "하류 연결은 BERM에 속합니다. 형식 L2 반응은 조건부로 도출되지만 조직 커널과 종점 매핑은 보정되어야 합니다. 공개 국가 예측은 BERM v17 국가 스칼라 프록시 경로이며 FieldState 교정 예측이 아닙니다.",
        ],
        equations: equations.boundary,
        note: "향후 교정에는 매칭된 국소 FieldState, 생물학적 엔드포인트 및 하류 결과 패널과 표본 외 시간 평가가 필요합니다.",
      },
    ],
    modelLink: "← BERM 모델 개요",
    fieldstateLink: "FieldState 측정 사양",
    nextLabel: "다음",
    nextTitle: "에비던스 레지스트리",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return { title: d.metaTitle, description: d.metaDescription };
}

function SectionNavigation({ sections }: { sections: Copy["nav"] }) {
  return (
    <nav className="hidden lg:block sticky top-20 w-52 shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <ul className="space-y-1 text-sm border-l border-card-border pl-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block leading-snug text-foreground-muted hover:text-accent transition-colors">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function FieldStateMeasurementMathPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <PageHeader icon={Sigma} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${locale}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">&middot;</span>
        <Link href={`/${locale}/measurement/fieldstate`} className="text-accent hover:underline">{d.fieldstateLink}</Link>
      </nav>

      <p className="mb-12 max-w-4xl rounded-lg border border-accent/20 bg-accent/5 p-4 text-sm leading-relaxed text-foreground">
        {d.versionNote}
      </p>

      <div className="flex gap-12 items-start">
        <SectionNavigation sections={d.nav} />
        <div className="min-w-0 flex-1 space-y-14">
          {d.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
              <div className="space-y-3 max-w-3xl">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-foreground-muted">{paragraph}</p>
                ))}
              </div>
              {section.equations && (
                <div className="mt-5 space-y-3 overflow-x-auto rounded-lg border border-card-border bg-background p-4">
                  {section.equations.map((equation) => <MathBlock key={equation} tex={equation} />)}
                </div>
              )}
              {section.note && (
                <p className="mt-4 max-w-3xl rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>

      <NextPageLink
        href={`/${locale}/evidence`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Sigma}
      />
    </div>
  );
}
