import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Sigma } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import CausalChainDiagram from "@/components/CausalChainDiagram";

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  fieldStateTitle: string;
  fieldStateText: readonly string[];
  pulseTitle: string;
  pulseText: readonly string[];
  staticInterfaceTitle: string;
  staticInterfaceText: readonly string[];
  ecologyLink: string;
  diagramTitle: string;
  diagramText: string;
  diagramLabel: string;
  organTitle: string;
  organText: readonly string[];
  asfrTitle: string;
  asfrText: readonly string[];
  evidenceLink: string;
  mathLink: string;
  modelLink: string;
  nextLabel: string;
  nextTitle: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "FieldState measurement specification",
    subtitle:
      "What a v2 record must contain: background, ambient and personal field components with organ-specific transfer, vector direction, pulse structure, circadian context and provenance.",
    metaTitle: "FieldState specification – Extinction Field",
    metaDescription:
      "The BERM v17 measurement specification: what a record must contain and how it differs from a national exposure scalar.",
    fieldStateTitle: "FieldState replaces a national exposure scalar",
    fieldStateText: [
      "For each organ, v2 keeps background, ambient and personal field components distinct after an organ-, posture- and geometry-specific transfer. It retains vector information, phase/coherence, envelope or beat PSD, circadian context, calibration and provenance.",
      "National mobile-subscription series can describe technology diffusion. They remain distinct from local dosimetry and a measured organ FieldState.",
    ],
    pulseTitle: "Pulse structure is biologically relevant",
    pulseText: [
      "FieldState measurement must preserve pulse structure: peak field, pulse duration, repetition rate and duty cycle are biologically relevant quantities that are lost in RMS averaging.",
      "60% of BERM pathways by weight (A + D) respond to peak field. 40% (B + C) respond to RMS: pathway B (melatonin suppression, 15%) is a chronic-exposure mechanism, and pathway C (CRY → circadian disruption + TRPC1 calcium signaling, 25%) operates through the radical-pair mechanism which integrates over time. This distinguishes BERM from thermal models that use SAR (W/kg).",
    ],
    staticInterfaceTitle: "Static triboelectric interface: a native local-physics branch",
    staticInterfaceText: [
      "BERM also registers a separate 0 Hz and transient-interface state for material–skin and organism interfaces: {Q, V, E(r,t), ∇E², dE/dt, τ}. Material, air-gap geometry, humidity, motion and grounding determine this state; it is not folded into an RF, ELF or national technology proxy.",
      "Historical textile readings are retained as physically underdetermined historical signals. They become a measurement-ready input only after a named earth/body reference, ground-path impedance and capacitance, probe geometry, calibrated local field map, charge measurement and decay curve are supplied. The same physics permits a separate ecological host–vegetation–tick contact branch without creating an uncalibrated reproductive or population coefficient.",
    ],
    ecologyLink: "Open the static-interface ecology branch",
    diagramTitle: "Registered causal route",
    diagramText:
      "The diagram makes the required intermediate states visible. Its labels describe the status of each link; they do not turn a collection of studies into a country-level coefficient. Click a node to inspect the bounded role and evidence attached to it.",
    diagramLabel: "FIGURE 01 · REGISTERED MODEL ARCHITECTURE",
    organTitle: "Organ-specific reproductive state before population aggregation",
    organText: [
      "The male branch keeps blood–testis-barrier integrity, germline reserve, steroidogenesis, sperm output/function and DNA integrity distinct. The female branch keeps ovarian reserve, oocyte redox, ovulatory clock, luteal/implantation support and placental barrier distinct.",
      "Each state has reversible (R) and persistent (P) components only where an explicit increment mapping, parameter identifier and supporting evidence record are supplied. BTB has its own registered reproductive branch. BBB, placenta and retina remain separate candidate states rather than evidence for a global barrier multiplier or a female-capacity coefficient.",
    ],
    asfrTitle: "ASFR first; TFR is a derived period identity",
    asfrText: [
      "The population layer combines paired male and female conception/live-birth capacity while preserving shared-household and partner covariance. It then reports biological capacity separately from demand/opportunity, tempo and ART/live-birth delivery for each age group.",
      "A national BERM v17 coefficient is not yet estimated: the matched FieldState, biological-endpoint and couple panels required for calibration have not been assembled. Accordingly, v2 publishes no country TFR forecast.",
    ],
    evidenceLink: "Browse the bounded evidence registry",
    mathLink: "FieldState mathematics (§1–§8)",
    modelLink: "← Back to model overview",
    nextLabel: "Next",
    nextTitle: "FieldState mathematics",
  },
  fi: {
    title: "FieldState-mittausmäärittely",
    subtitle:
      "Mitä v2-tietueen on sisällettävä: tausta-, ambient- ja henkilökohtaiset kenttäkomponentit elinkohtaisella siirrolla, vektorin suunta, pulssirakenne, vuorokausikonteksti ja provenienssi.",
    metaTitle: "FieldState-määrittely – Extinction Field",
    metaDescription:
      "BERM v17:n mittausmäärittely: mitä tietue vaatii ja miten se eroaa kansallisesta altistusskaalasta.",
    fieldStateTitle: "FieldState korvaa kansallisen altistusskalaarin",
    fieldStateText: [
      "V2 säilyttää kullekin elimelle tausta-, ambient- ja henkilökohtaiset kenttäkomponentit erillään elin-, asento- ja geometriakohtaisen siirron jälkeen. Se säilyttää vektoritiedon, vaiheen/koherenssin, verhokäyrä- tai beat-PSD:n, vuorokausikontekstin, kalibroinnin ja provenienssin.",
      "Kansalliset mobiililiittymäsarjat voivat kuvata teknologian leviämistä. Ne pidetään erillään paikallisesta dosimetriasta ja mitatusta elin-FieldStatesta.",
    ],
    pulseTitle: "Pulssirakenne on biologisesti relevantti",
    pulseText: [
      "FieldState-mittauksen on säilytettävä pulssirakenne: huippukenttä, pulssin kesto, toistotaajuus ja duty cycle ovat biologisesti relevantteja suureita, jotka katoavat RMS-keskiarvostuksessa.",
      "60 % BERM:n polkupainoista (A + D) vastaa huippukenttään. 40 % (B + C) vastaa RMS:ään: polku B (melatoniinisuppressio, 15 %) on kroonisen altistuksen mekanismi, ja polku C (CRY → sirkadiaaninen häiriö + TRPC1-kalsiumsignalointi, 25 %) toimii radikaalipari-mekanismin kautta, joka integroi ajan yli. Tämä erottaa BERM:n termisistä malleista, jotka käyttävät SAR:ia (W/kg).",
    ],
    staticInterfaceTitle: "Staattinen triboelektrinen rajapinta: natiivi paikallisfysiikan haara",
    staticInterfaceText: [
      "BERM rekisteröi myös erillisen 0 Hz:n ja transienttirajapinnan tilan materiaali–iho- ja eliörajapinnoille: {Q, V, E(r,t), ∇E², dE/dt, τ}. Materiaali, ilmarakon geometria, kosteus, liike ja maadoitus määrittävät tilan; sitä ei sulauteta RF:ään, ELF:ään eikä kansalliseen teknologiaproxyyn.",
      "Historialliset tekstiilimittarilukemat säilytetään fysikaalisesti alimäärättyinä historiallisina signaaleina. Niistä tulee mittausvalmis syöte vasta, kun nimetty maa-/kehoreferenssi, maareitin impedanssi ja kapasitanssi, mittapään geometria, kalibroitu paikalliskenttäkartta, varausmittaus ja purkautumiskäyrä on toimitettu. Sama fysiikka mahdollistaa erillisen ekologisen isäntä–kasvillisuus–punkki-kontaktihaaran ilman kalibroimatonta lisääntymis- tai populaatiokerrointa.",
    ],
    ecologyLink: "Avaa staattisen rajapinnan ekologinen haara",
    diagramTitle: "Rekisteröity kausaalireitti",
    diagramText:
      "Kaavio tekee tarvittavat välitilat näkyviksi. Sen merkinnät kuvaavat kunkin lenkin tilaa; ne eivät muuta tutkimuskokoelmaa maakohtaiseksi kertoimeksi. Solmua klikkaamalla näet sille kiinnitetyn rajatun roolin ja evidenssin.",
    diagramLabel: "KUVIO 01 · REKISTERÖITY MALLIARKKITEHTUURI",
    organTitle: "Elinkohtainen lisääntymistila ennen väestötason yhdistämistä",
    organText: [
      "Mieshaara pitää veri–kivesesteen, ituradan varannon, steroidogeneesin, siittiötuoton/toiminnan ja DNA-eheyden erillisinä. Naishaara pitää munasarjavarannon, oosyyttiredoxin, ovulaation kellotuksen, luteaali-/implantaatio-tuen ja istukkaesteen erillisinä.",
      "Jokaisella tilalla on palautuva (R) ja persistentti (P) osa vain silloin, kun eksplisiittinen inkrementtikartoitus, parametri-ID ja sitä tukeva evidenssitietue on määritelty. BTB:llä on oma rekisteröity lisääntymishaara. BBB, istukka ja retina ovat erillisiä kandidaattitiloja, eivät näyttöä globaalista estekertoimesta tai naiskapasiteetin kertoimesta.",
    ],
    asfrTitle: "ASFR ensin; TFR on johdettu periodi-identiteetti",
    asfrText: [
      "Väestökerros yhdistää paritetun miehen ja naisen hedelmöitys-/syntymäkapasiteetin säilyttäen yhteisen kotiympäristön ja partnerikovarianssin. Sen jälkeen se raportoi biologisen kapasiteetin erillään kysynnästä/mahdollisuudesta, temposta ja ART-syntymätoimituksesta jokaiselle ikäryhmälle.",
      "Maakohtaista BERM v17-kerrointa ei vielä estimoida: kalibroinnin vaatimia kohdistettuja FieldState-, biologisten päätepisteiden ja paripaneeleja ei ole koottu. Siksi v2 ei julkaise maakohtaisia TFR-ennusteita.",
    ],
    evidenceLink: "Selaa rajattua evidenssirekisteriä",
    mathLink: "FieldState-matematiikka (§1–§8)",
    modelLink: "← Takaisin mallin yleiskatsaukseen",
    nextLabel: "Seuraavaksi",
    nextTitle: "FieldState-matematiikka",
  },
  ja: {
    title: "FieldState 測定仕様",
    subtitle:
      "v2レコードに含まれるべき内容：臓器固有の伝達を伴うバックグラウンド、環境および個人電磁界成分、ベクトル方向、パルス構造、概日リズム文脈および来歴。",
    metaTitle: "FieldState 仕様 – Extinction Field",
    metaDescription:
      "BERM v17 測定仕様：レコードが含むべき内容と国家暴露スカラーとの相違点。",
    fieldStateTitle: "FieldState は国家暴露スカラーに替わるものである",
    fieldStateText: [
      "各臓器について、v2はバックグラウンド、環境および個人電磁界成分を臓器・姿勢・形状固有の伝達後も個別に保持します。ベクトル情報、位相/コヒーレンス、包絡線またはビートPSD、概日リズム文脈、校正および来歴を保持します。",
      "国家レベルのモバイル加入者数系列は技術普及を記述できますが、局所線量測定および測定された臓器FieldStateとは区別されます。",
    ],
    pulseTitle: "パルス構造は生物学的に重要である",
    pulseText: [
      "FieldState 測定はパルス構造を保持しなければなりません：ピーク電磁界、パルス持続時間、繰返し率およびデューティサイクルは、RMS平均化で失われる生物学的に重要な量です。",
      "BERM経路の重み付けの60%（A + D）はピーク電磁界に応答します。40%（B + C）はRMSに応答します：経路B（メラトニン抑制、15%）は慢性暴露メカニズムであり、経路C（CRY → 概日リズム障害 + TRPC1カルシウムシグナリング、25%）は時間積分するラジカルペアメカニズムを通じて作動します。これによりBERMはSAR（W/kg）を使用する熱モデルと区別されます。",
    ],
    staticInterfaceTitle: "静電摩擦電気界面：ネイティブな局所物理学の分岐",
    staticInterfaceText: [
      "BERMは材料-皮膚および生物界面に対する個別の0 Hzおよび過渡界面状態も登録します：{Q, V, E(r,t), ∇E², dE/dt, τ}。材料、空隙形状、湿度、運動および接地がこの状態を決定し、RF、ELFまたは国家技術プロキシには統合されません。",
      "歴史的テキスタイル計測値は物理的に不十分に決定された歴史的信号として保持されます。名前付きの接地/身体基準、接地経路インピーダンスとキャパシタンス、プローブ形状、校正された局所電磁界マップ、電荷測定および減衰曲線が提供されて初めて測定準備済み入力となります。同じ物理学により、未校正の生殖または集団係数を作成することなく、独立した生態学的宿主-植生-ダニ接触分岐が可能になります。",
    ],
    ecologyLink: "静電界面の生態学的分岐を開く",
    diagramTitle: "登録済み因果経路",
    diagramText:
      "図は必要な中間状態を可視化します。ラベルは各リンクの状態を記述し、研究の集合を国家レベルの係数に変換するものではありません。ノードをクリックすると、付随する限定的役割とエビデンスを確認できます。",
    diagramLabel: "図01 · 登録済みモデルアーキテクチャ",
    organTitle: "集団集約前の臓器固有の生殖状態",
    organText: [
      "男性系統は血液-精巣関門の完全性、生殖細胞系列予備能、ステロイド産生、精子産出/機能およびDNA完全性を個別に保持します。女性系統は卵巣予備能、卵母細胞レドックス、排卵時計、黄体/着床支持および胎盤関門を個別に保持します。",
      "各状態は、明示的な増分マッピング、パラメータ識別子および裏付けエビデンスレコードが提供された場合にのみ、可逆（R）および持続（P）成分を持ちます。BTBは独自の登録済み生殖分岐を持ちます。BBB、胎盤および網膜は、グローバルな障壁乗数または女性容量係数のエビデンスではなく、個別の候補状態として保持されます。",
    ],
    asfrTitle: "ASFR が第一；TFR は導出された期間恒等式である",
    asfrText: [
      "集団層は共有世帯およびパートナー共分散を保持しながら、対になった男女の受胎/出生容量を結合します。その後、各年齢群について生物学的容量を需要/機会、テンポおよびART/出生提供とは別に報告します。",
      "国家レベルのBERM v17係数はまだ推定されていません：校正に必要な対応するFieldState、生物学的エンドポイントおよびカップルパネルが編成されていません。したがって、v2は国別TFR予測を公表しません。",
    ],
    evidenceLink: "限定的エビデンスレジストリを閲覧",
    mathLink: "FieldState 数学（§1–§8）",
    modelLink: "← モデル概要に戻る",
    nextLabel: "次へ",
    nextTitle: "FieldState 数学",
  },
  fr: {
    title: "Spécification de mesure FieldState",
    subtitle:
      "Ce qu'un enregistrement v2 doit contenir : composantes de champ de fond, ambiant et personnel avec transfert spécifique aux organes, direction vectorielle, structure d'impulsion, contexte circadien et provenance.",
    metaTitle: "Spécification FieldState – Extinction Field",
    metaDescription:
      "La spécification de mesure BERM v17 : contenu requis d'un enregistrement et différences avec un scalaire d'exposition national.",
    fieldStateTitle: "FieldState remplace un scalaire d'exposition national",
    fieldStateText: [
      "Pour chaque organe, v2 maintient distinctes les composantes de champ de fond, ambiant et personnel après un transfert spécifique à l'organe, à la posture et à la géométrie. Il conserve l'information vectorielle, la phase/cohérence, le PSD d'enveloppe ou de battement, le contexte circadien, la calibration et la provenance.",
      "Les séries nationales d'abonnements mobiles peuvent décrire la diffusion technologique. Elles restent distinctes de la dosimétrie locale et d'un FieldState d'organe mesuré.",
    ],
    pulseTitle: "La structure d'impulsion est biologiquement pertinente",
    pulseText: [
      "La mesure FieldState doit préserver la structure d'impulsion : champ de crête, durée d'impulsion, taux de répétition et rapport cyclique sont des quantités biologiquement pertinentes perdues lors du calcul de la moyenne RMS.",
      "60 % des voies BERM en poids (A + D) répondent au champ de crête. 40 % (B + C) répondent au RMS : la voie B (suppression de la mélatonine, 15 %) est un mécanisme d'exposition chronique, et la voie C (CRY → perturbation circadienne + signalisation calcique TRPC1, 25 %) opère via le mécanisme des paires de radicaux qui intègre dans le temps. Cela distingue le BERM des modèles thermiques utilisant le DAS (W/kg).",
    ],
    staticInterfaceTitle: "Interface triboélectrique statique : une branche native de physique locale",
    staticInterfaceText: [
      "Le BERM enregistre également un état d'interface 0 Hz séparé et transitoire pour les interfaces matériau–peau et organisme : {Q, V, E(r,t), ∇E², dE/dt, τ}. Le matériau, la géométrie de l'entrefer, l'humidité, le mouvement et la mise à la terre déterminent cet état ; il n'est pas intégré dans un proxy RF, ELF ou technologique national.",
      "Les mesures textiles historiques sont conservées comme signaux historiques physiquement sous-déterminés. Elles ne deviennent une entrée prête à la mesure qu'après fourniture d'une référence terre/corps nommée, de l'impédance et de la capacitance du chemin de terre, de la géométrie de la sonde, d'une carte de champ local calibrée, d'une mesure de charge et d'une courbe de décroissance. La même physique permet une branche écologique distincte de contact hôte–végétation–tique sans créer un coefficient reproductif ou populationnel non calibré.",
    ],
    ecologyLink: "Ouvrir la branche écologique d'interface statique",
    diagramTitle: "Route causale enregistrée",
    diagramText:
      "Le diagramme rend visibles les états intermédiaires requis. Ses étiquettes décrivent le statut de chaque lien ; elles ne transforment pas une collection d'études en coefficient national. Cliquez sur un nœud pour inspecter le rôle délimité et l'évidence qui y est attachée.",
    diagramLabel: "FIGURE 01 · ARCHITECTURE DU MODÈLE ENREGISTRÉ",
    organTitle: "État reproductif spécifique aux organes avant agrégation populationnelle",
    organText: [
      "La branche masculine maintient distinctes l'intégrité de la barrière hémato-testiculaire, la réserve germinale, la stéroïdogenèse, la production/fonction spermatique et l'intégrité de l'ADN. La branche féminine maintient distinctes la réserve ovarienne, le redox ovocytaire, l'horloge ovulatoire, le soutien lutéal/d'implantation et la barrière placentaire.",
      "Chaque état possède des composantes réversibles (R) et persistantes (P) uniquement lorsqu'un mappage d'incrément explicite, un identifiant de paramètre et un enregistrement d'évidence de support sont fournis. La BTB possède sa propre branche reproductive enregistrée. La BHE, le placenta et la rétine restent des états candidats séparés plutôt que des preuves d'un multiplicateur de barrière global ou d'un coefficient de capacité féminine.",
    ],
    asfrTitle: "ASFR d'abord ; le TFR est une identité de période dérivée",
    asfrText: [
      "La couche populationnelle combine la capacité de conception/naissance vivante masculine et féminine appariée tout en préservant la covariance du ménage partagé et du partenaire. Elle rapporte ensuite la capacité biologique séparément de la demande/opportunité, du tempo et de la livraison ART/naissance vivante pour chaque groupe d'âge.",
      "Un coefficient national BERM v17 n'est pas encore estimé : les panels FieldState, d'endpoints biologiques et de couples appariés nécessaires à la calibration n'ont pas été assemblés. En conséquence, v2 ne publie aucune prévision de TFR par pays.",
    ],
    evidenceLink: "Parcourir le registre d'évidences délimité",
    mathLink: "Mathématiques FieldState (§1–§8)",
    modelLink: "← Retour à l'aperçu du modèle",
    nextLabel: "Suivant",
    nextTitle: "Mathématiques FieldState",
  },
  ko: {
    title: "FieldState 측정 사양",
    subtitle:
      "v2 레코드가 포함해야 할 내용: 장기별 전달을 포함한 배경, 환경 및 개인 전자기장 성분, 벡터 방향, 펄스 구조, 일주기 맥락 및 출처.",
    metaTitle: "FieldState 사양 – Extinction Field",
    metaDescription:
      "BERM v17 측정 사양: 레코드가 포함해야 할 내용과 국가 노출 스칼라와의 차이점.",
    fieldStateTitle: "FieldState는 국가 노출 스칼라를 대체합니다",
    fieldStateText: [
      "각 장기에 대해 v2는 장기, 자세 및 형상 특이적 전달 후에도 배경, 환경 및 개인 전자기장 성분을 구별하여 유지합니다. 벡터 정보, 위상/코히어런스, 포락선 또는 비트 PSD, 일주기 맥락, 교정 및 출처를 보존합니다.",
      "국가 모바일 가입 시계열은 기술 확산을 기술할 수 있습니다. 이는 국소 선량 측정 및 측정된 장기 FieldState와는 별개입니다.",
    ],
    pulseTitle: "펄스 구조는 생물학적으로 중요합니다",
    pulseText: [
      "FieldState 측정은 펄스 구조를 보존해야 합니다: 피크 전자기장, 펄스 지속 시간, 반복률 및 듀티 사이클은 RMS 평균화에서 손실되는 생물학적으로 중요한 양입니다.",
      "BERM 경로 가중치의 60%(A + D)는 피크 전자기장에 응답합니다. 40%(B + C)는 RMS에 응답합니다: 경로 B(멜라토닌 억제, 15%)는 만성 노출 메커니즘이며, 경로 C(CRY → 일주기 교란 + TRPC1 칼슘 신호 전달, 25%)는 시간에 걸쳐 적분하는 라디칼 쌍 메커니즘을 통해 작동합니다. 이것이 SAR(W/kg)을 사용하는 열 모델과 BERM을 구별합니다.",
    ],
    staticInterfaceTitle: "정전 마찰전기 계면: 고유한 국소 물리학 분기",
    staticInterfaceText: [
      "BERM은 재료-피부 및 생물체 계면에 대한 별도의 0 Hz 및 과도 계면 상태도 등록합니다: {Q, V, E(r,t), ∇E², dE/dt, τ}. 재료, 공극 형상, 습도, 운동 및 접지가 이 상태를 결정하며, RF, ELF 또는 국가 기술 프록시에 통합되지 않습니다.",
      "역사적 섬유 측정값은 물리적으로 미결정된 역사적 신호로 보존됩니다. 명명된 접지/신체 기준, 접지 경로 임피던스와 커패시턴스, 프로브 형상, 교정된 국소 전자기장 맵, 전하 측정 및 감쇠 곡선이 제공된 후에야 측정 준비가 된 입력이 됩니다. 동일한 물리학은 미교정 생식 또는 집단 계수를 생성하지 않고 독립적인 생태학적 숙주-식생-진드기 접촉 분기를 허용합니다.",
    ],
    ecologyLink: "정전 계면 생태학적 분기 열기",
    diagramTitle: "등록된 인과 경로",
    diagramText:
      "다이어그램은 필요한 중간 상태를 가시화합니다. 라벨은 각 링크의 상태를 기술하며, 연구 모음을 국가 수준 계수로 변환하지 않습니다. 노드를 클릭하면 해당 노드에 부여된 한정적 역할과 에비던스를 확인할 수 있습니다.",
    diagramLabel: "그림 01 · 등록된 모델 아키텍처",
    organTitle: "집단 집약 전 장기별 생식 상태",
    organText: [
      "남성 계통은 혈액-고환 장벽 완전성, 생식세포 계열 예비능, 스테로이드 생성, 정자 생산/기능 및 DNA 완전성을 구별하여 유지합니다. 여성 계통은 난소 예비능, 난모세포 레독스, 배란 시계, 황체/착상 지원 및 태반 장벽을 구별하여 유지합니다.",
      "각 상태는 명시적인 증분 매핑, 매개변수 식별자 및 지원 에비던스 레코드가 제공된 경우에만 가역(R) 및 지속(P) 성분을 갖습니다. BTB는 자체 등록된 생식 분기를 갖고 있습니다. BBB, 태반 및 망막은 전역 장벽 승수 또는 여성 용량 계수의 증거가 아닌 별도의 후보 상태로 유지됩니다.",
    ],
    asfrTitle: "ASFR 우선; TFR은 도출된 기간 항등식입니다",
    asfrText: [
      "집단 층은 공유 가구 및 파트너 공분산을 보존하면서 쌍을 이룬 남녀의 수태/출생 용량을 결합합니다. 그런 다음 각 연령 그룹에 대해 생물학적 용량을 수요/기회, 템포 및 ART/출생 전달과 별도로 보고합니다.",
      "국가 BERM v17 계수는 아직 추정되지 않았습니다: 교정에 필요한 매칭된 FieldState, 생물학적 종점 및 커플 패널이 아직 구성되지 않았습니다. 따라서 v2는 국가별 TFR 예측을 발표하지 않습니다.",
    ],
    evidenceLink: "한정적 에비던스 레지스트리 탐색",
    mathLink: "FieldState 수학 (§1–§8)",
    modelLink: "← 모델 개요로 돌아가기",
    nextLabel: "다음",
    nextTitle: "FieldState 수학",
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

export default async function FieldStatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Radio} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${locale}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">&middot;</span>
        <Link href={`/${locale}/model/fieldstate/math`} className="text-accent hover:underline">{d.mathLink}</Link>
      </nav>

      <article className="space-y-14">
        <section id="fieldstate-input">
          <h2 className="editorial-section-heading mb-4">{d.fieldStateTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.fieldStateText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="pulse-structure" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.pulseTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.pulseText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="static-interface" className="border-t border-card-border pt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="editorial-section-heading">{d.staticInterfaceTitle}</h2>
            <Link href={`/${locale}/ecology`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
              {d.ecologyLink} →
            </Link>
          </div>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.staticInterfaceText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="causal-diagram" className="border-t border-card-border pt-6">
          <figure className="data-figure">
            <figcaption className="data-figure__caption">
              <p className="editorial-kicker text-accent">{d.diagramLabel}</p>
              <p className="data-figure__title mt-1">{d.diagramTitle}</p>
            </figcaption>
            <div className="overflow-x-auto p-1 sm:p-3">
              <CausalChainDiagram locale={locale} />
            </div>
            <p className="data-figure__note">{d.diagramText}</p>
          </figure>
        </section>

        <section id="organ-states" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.organTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.organText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="asfr-tfr" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.asfrTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.asfrText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-4">
            <Link href={`/${locale}/evidence`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
              {d.evidenceLink} →
            </Link>
          </div>
        </section>
      </article>

      <NextPageLink
        href={`/${locale}/model/fieldstate/math`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Sigma}
      />
    </div>
  );
}
