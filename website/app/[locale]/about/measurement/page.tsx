import type { Metadata } from "next";
import { Radio } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type ProtocolSection = {
  title: string;
  text: readonly string[];
  steps?: readonly { title: string; text: string }[];
};

type Copy = {
  title: string;
  subtitle: string;
  introduction: readonly string[];
  sections: readonly ProtocolSection[];
  boundaryTitle: string;
  boundaryText: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "FieldState measurement protocol",
    subtitle:
      "A protocol for documenting a physical field state and testing a pre-specified biological endpoint. The protocol tests whether a specific field feature produces a measurable biological response under controlled conditions.",
    introduction: [
      "BERM v17 requires more than a national technology proxy or one broadband level. A useful experiment documents the measured field components, calibration, geometry, timing and provenance that could distinguish competing physical hypotheses.",
      "The purpose of this protocol is to make the physical measurement and the biological experiment independently auditable. A physical signature, if observed, is a prerequisite for a mechanism test — not evidence of harm or a TFR coefficient.",
    ],
    sections: [
      {
        title: "1. Pre-specify the question and endpoint",
        text: [
          "State the field feature, biological system, primary endpoint, exposure contrast, timing, analysis and exclusion rules before collection. Register a null-compatible hypothesis as well as the proposed directional hypothesis.",
          "Choose an endpoint close to the tested link: for example a calibrated physical PSD feature, a cellular redox readout, a tight-junction protein, a sperm-function measure or a reproductive hormone. Do not use national TFR as the direct endpoint of a laboratory exposure experiment.",
        ],
      },
      {
        title: "2. Acquire a documented physical FieldState",
        text: [
          "Record calibrated instruments, antenna or probe response, band selection, dynamic range, sampling chain, location, orientation, device posture, time zone, clock synchronisation and raw-data checksums. Measure the local static magnetic background B₀ vector where it is relevant to the hypothesis.",
          "Keep ambient and personal-source conditions distinct. If the physical question concerns an organ, describe the transfer model or phantom/position measurement; a room measurement is not automatically an organ field estimate.",
        ],
        steps: [
          { title: "Field components", text: "Capture the relevant electric/magnetic components and source band(s); retain calibration and uncertainty, not just a single summary level." },
          { title: "Time structure", text: "Create a time-stamped band-power or field-amplitude series, then estimate envelope/beat PSD after the carrier or band has been validly acquired." },
          { title: "Context", text: "Record vector orientation, phase/coherence where measurable, circadian time, source configuration and environmental conditions that can alter the apparatus." },
        ],
      },
      {
        title: "3. Treat eDRX and R42 correctly",
        text: [
          "eDRX is a user-equipment discontinuous-reception/paging scheduling mechanism. It is not, by itself, a known cellular downlink RF waveform or an ambient-field signature. An eDRX timer may be logged as network/device metadata, but it must not be substituted for a measured downlink envelope PSD.",
          "Zandieh et al. (2025) reported frequency-dependent mitochondrial/ROS behaviour in cancer-cell experiments under ELF magnetic-field conditions (0.01–5 Hz; up to 100 mT, including 0.02 and 0.04 Hz conditions). That result motivates an exploratory PSD test; it does not establish RF network modulation, eDRX spectral lines or reproductive effects.",
        ],
      },
      {
        title: "4. Run a controlled biological arm",
        text: [
          "Use blinded allocation where possible, a sham condition and a thermal/airflow/handling control that is matched to the active apparatus. Instrument the exposure chamber during every run rather than assuming that its setpoint describes the delivered condition.",
          "Vary one pre-specified FieldState feature at a time when feasible: vector angle, static background, field amplitude, timing/PSD feature or circadian phase. Include positive controls only when their biological interpretation is appropriate; do not treat a rescue as proof of an upstream field mechanism.",
        ],
      },
      {
        title: "5. Analyse and report",
        text: [
          "Publish raw or access-controlled raw field data, processing code, calibration files, biological data, exclusions, adverse events and null results. Report effect estimates with uncertainty and compare the active and sham FieldStates, not only nominal device settings.",
          "Classify the result by data readiness: a technology-timing proxy for national series, partial FieldState data when inputs are missing, and measurement-ready FieldState when calibration, B₀, transfer, PSD, circadian context, phase/coherence and provenance are documented. Measurement-ready data still require an endpoint-specific test.",
        ],
      },
    ],
    boundaryTitle: "Interpretation boundary",
    boundaryText:
      "This protocol can test a physical-to-biological link. It cannot by itself identify a population effect, separate all environmental causes or justify a personal health recommendation. Any later ASFR/TFR analysis must join measured FieldState and endpoint data with demographic demand, tempo and ART terms.",
  },
  fi: {
    title: "FieldState-mittausprotokolla",
    subtitle:
      "Protokolla fysikaalisen kenttätilan dokumentoimiseen ja ennalta määritellyn biologisen päätepisteen testaamiseen. Protokolla testaa, tuottaako tietty kenttäpiirre mitattavan biologisen vasteen kontrolloiduissa olosuhteissa.",
    introduction: [
      "BERM v17 vaatii enemmän kuin kansallisen teknologiaproxyn tai yhden laajakaistatason. Hyödyllinen koe dokumentoi mitatut kenttäkomponentit, kalibroinnin, geometrian, ajoituksen ja provenienssin, joilla kilpailevia fysikaalisia hypoteeseja voidaan erottaa.",
      "Protokollan tarkoitus on tehdä fysikaalisesta mittauksesta ja biologisesta kokeesta erikseen auditoitavia. Havaittu fysikaalinen allekirjoitus on mekanismitestin ennakkoehto — ei todiste haitasta eikä TFR-kerroin.",
    ],
    sections: [
      {
        title: "1. Määrittele kysymys ja päätepiste ennakolta",
        text: [
          "Kirjaa ennen aineistonkeruuta kenttäpiirre, biologinen järjestelmä, ensisijainen päätepiste, altistuskontrasti, ajoitus, analyysi ja poissulkusäännöt. Rekisteröi myös nollatuloksen salliva hypoteesi ehdotetun suuntahypoteesin rinnalle.",
          "Valitse testattavan lenkin lähellä oleva päätepiste: esimerkiksi kalibroitu PSD-piirre, solun redox-lukema, tight-junction-proteiini, siittiötoiminnon mitta tai lisääntymishormoni. Kansallista TFR:ää ei käytetä laboratorioaltistuskokeen suorana päätepisteenä.",
        ],
      },
      {
        title: "2. Kerää dokumentoitu fysikaalinen FieldState",
        text: [
          "Tallenna kalibroidut mittalaitteet, antennin tai anturin vaste, kaistavalinta, dynaaminen alue, näytteenottoketju, sijainti, orientaatio, laitteen asento, aikavyöhyke, kellosynkronointi ja raakadatan tarkistussummat. Mittaa paikallinen staattisen magneettikentän B₀-vektori, kun se on hypoteesin kannalta relevantti.",
          "Pidä ambient- ja henkilökohtaisen lähteen olosuhteet erillään. Jos fysikaalinen kysymys koskee elintä, kuvaa siirtomalli tai phantom-/asentomittaus; huonemittaus ei automaattisesti ole elinkenttäarvio.",
        ],
        steps: [
          { title: "Kenttäkomponentit", text: "Tallenna relevantit sähkö-/magneettikomponentit ja lähdekaistat; säilytä kalibrointi ja epävarmuus, ei vain yhtä yhteenvetotasoa." },
          { title: "Aikarakenne", text: "Muodosta aikaleimattu kaistateho- tai kenttäamplitudisarja ja estimoi sitten verhokäyrä-/beat-PSD vasta sen jälkeen, kun kantoaalto tai kaista on kerätty pätevästi." },
          { title: "Konteksti", text: "Kirjaa vektorin orientaatio, mitattavissa oleva vaihe/koherenssi, vuorokaudenaika, lähdekonfiguraatio ja ympäristöolosuhteet, jotka voivat muuttaa laitteistoa." },
        ],
      },
      {
        title: "3. Käsittele eDRX ja R42 oikein",
        text: [
          "eDRX on käyttäjälaitteen katkonaisen vastaanoton ja hakutoiminnon ajoitusmekanismi. Se ei yksinään ole tunnettu solukkoverkon downlink-RF-aaltomuoto eikä ambient-kentän allekirjoitus. eDRX-ajastin voidaan kirjata verkko-/laitemetadatana, mutta sitä ei saa korvata mitatulla downlink-verhokäyrän PSD:llä.",
          "Zandieh ym. (2025) raportoi taajuusriippuvaista mitokondrio-/ROS-käyttäytymistä syöpäsolukokeissa ELF-magneettikenttäolosuhteissa (0,01–5 Hz; enintään 100 mT, mukana 0,02 ja 0,04 Hz -olosuhteet). Tulos motivoi alustavaa PSD-testiä; se ei osoita RF-verkon modulaatiota, eDRX-spektriviivoja eikä lisääntymisvaikutuksia.",
        ],
      },
      {
        title: "4. Toteuta kontrolloitu biologinen haara",
        text: [
          "Käytä mahdollisuuksien mukaan sokkoutettua allokaatiota, sham-ehtoa sekä aktiivista laitteistoa vastaavaa lämpö-/ilmavirta-/käsittelykontrollia. Instrumentoi altistuskammio jokaisessa ajossa sen sijaan, että oletat asetusarvon kuvaavan toimitettua olosuhdetta.",
          "Vaihda yhtä ennalta määriteltyä FieldState-piirrettä kerrallaan, kun se on mahdollista: vektorikulmaa, staattista taustaa, kentän amplitudia, ajoitus-/PSD-piirrettä tai vuorokausivaihetta. Käytä positiivisia kontrolleja vain, jos niiden biologinen tulkinta on asianmukainen; rescue ei yksin todista upstream-kenttämekanismia.",
        ],
      },
      {
        title: "5. Analysoi ja raportoi",
        text: [
          "Julkaise raaka- tai pääsykontrolloitu raaka kenttädata, käsittelykoodi, kalibrointitiedostot, biologinen data, poissulut, haittatapahtumat ja nollatulokset. Raportoi vaikutusarviot epävarmuuksineen ja vertaile aktiivista ja sham-FieldStatea, ei vain nimellisiä laiteasetuksia.",
          "Luokittele tulos datavalmiuden mukaan: kansallisille sarjoille teknologian ajoitusproxy, puuttuville syötteille osittainen FieldState-data ja mittausvalmis FieldState vasta, kun kalibrointi, B₀, siirto, PSD, vuorokausikonteksti, vaihe/koherenssi ja provenienssi on dokumentoitu. Mittausvalmis data vaatii silti päätepistekohtaisen testin.",
        ],
      },
    ],
    boundaryTitle: "Tulkintaraja",
    boundaryText:
      "Tällä protokollalla voidaan testata fysikaalinen → biologinen lenkki. Se ei yksin tunnista väestövaikutusta, erottele kaikkia ympäristösyitä eikä oikeuta henkilökohtaista terveyssuositusta. Myöhemmän ASFR/TFR-analyysin on yhdistettävä mitattu FieldState ja päätepistedata demografisiin kysyntä-, tempo- ja ART-termeihin.",
  },
  ja: {
    title: "FieldState測定プロトコル",
    subtitle:
      "物理的な場の状態を文書化し、事前に指定された生物学的エンドポイントをテストするためのプロトコル。本プロトコルは、特定の場の特徴が制御された条件下で測定可能な生物学的応答を生じるかどうかを検証する。",
    introduction: [
      "BERM v17は、国レベルの技術プロキシや単一のブロードバンドレベル以上のものを必要とする。有用な実験は、測定された場の成分、校正、ジオメトリ、タイミング、および来歴を文書化し、競合する物理的仮説を区別可能にする。",
      "本プロトコルの目的は、物理的測定と生物学的実験を独立に監査可能にすることである。物理的シグネチャが観測された場合、それはメカニズム検証の前提条件であり、害の証拠やTFR係数ではない。",
    ],
    sections: [
      {
        title: "1. 質問とエンドポイントを事前に特定する",
        text: [
          "データ収集前に、場の特徴、生物学的システム、主要エンドポイント、曝露コントラスト、タイミング、解析および除外規則を記述する。提案された方向性仮説と併せて、帰無仮説と整合する仮説も登録する。",
          "テスト対象のリンクに近いエンドポイントを選択する：例えば、校正されたPSD特徴、細胞内レドックス読み取り値、タイトジャンクションタンパク質、精子機能指標、または生殖ホルモン。実験室曝露実験の直接的なエンドポイントとして国レベルのTFRを使用しない。",
        ],
      },
      {
        title: "2. 文書化された物理的FieldStateを取得する",
        text: [
          "校正された測定機器、アンテナまたはプローブの応答、バンド選択、ダイナミックレンジ、サンプリングチェーン、位置、方向、デバイス姿勢、タイムゾーン、クロック同期、および生データのチェックサムを記録する。仮説に関連する場合は、局所的な静磁場バックグラウンドB₀ベクトルを測定する。",
          "周囲環境と個人的なソースの条件を区別して保持する。物理的な問題が臓器に関する場合は、伝達モデルまたはファントム/位置測定を記述する。室内測定は自動的に臓器の場の推定値とはならない。",
        ],
        steps: [
          { title: "場の成分", text: "関連する電場/磁場成分およびソースバンドを記録する。単一の要約レベルだけでなく、校正および不確実性を保持する。" },
          { title: "時間構造", text: "タイムスタンプ付きのバンドパワーまたは場の振幅系列を作成し、搬送波またはバンドが有効に取得された後にエンベロープ/ビートPSDを推定する。" },
          { title: "コンテキスト", text: "ベクトルの方向、測定可能な場合の位相/コヒーレンス、概日時刻、ソース構成、および装置を変化させる可能性のある環境条件を記録する。" },
        ],
      },
      {
        title: "3. eDRXとR42を正しく扱う",
        text: [
          "eDRXは、ユーザー機器の不連続受信/ページングスケジューリングメカニズムである。それ自体は、既知のセルラーダウンリンクRF波形や周囲の場のシグネチャではない。eDRXタイマーはネットワーク/デバイスメタデータとして記録できるが、測定されたダウンリンクエンベロープPSDの代替として使用してはならない。",
          "Zandieh et al.（2025）は、ELF磁場条件（0.01〜5 Hz、最大100 mT、0.02および0.04 Hz条件を含む）下のがん細胞実験において周波数依存性のミトコンドリア/ROS挙動を報告した。この結果は探索的PSD検証の動機となるが、RFネットワーク変調、eDRXスペクトル線、または生殖への影響を確立するものではない。",
        ],
      },
      {
        title: "4. 管理された生物学的アームを実施する",
        text: [
          "可能な場合はブラインド割り当てを使用し、シャム条件およびアクティブ装置と一致した熱/気流/取り扱い制御を設ける。設定値が提供条件を記述していると仮定するのではなく、毎回の実験中に曝露チャンバーを計装する。",
          "実行可能な場合、事前に指定されたFieldState特徴を一度に一つずつ変動させる：ベクトル角度、静的バックグラウンド、場の振幅、タイミング/PSD特徴、または概日位相。生物学的解釈が適切な場合にのみ陽性対照を含める。レスキューを上流の場のメカニズムの証拠として扱わない。",
        ],
      },
      {
        title: "5. 解析と報告",
        text: [
          "生の場データまたはアクセス制御された生の場データ、処理コード、校正ファイル、生物学的データ、除外、有害事象、および帰無結果を公開する。効果推定値を不確実性とともに報告し、名目上のデバイス設定だけでなく、アクティブおよびシャムのFieldStateを比較する。",
          "データ準備状態で結果を分類する：国レベルの系列には技術タイミングプロキシ、入力が欠落している場合は部分的FieldStateデータ、校正、B₀、伝達、PSD、概日コンテキスト、位相/コヒーレンス、および来歴が文書化されている場合は測定準備完了のFieldState。測定準備完了のデータでも、エンドポイント固有の検証が必要である。",
        ],
      },
    ],
    boundaryTitle: "解釈の境界",
    boundaryText:
      "本プロトコルは物理的から生物学的へのリンクを検証できる。しかし、それ単独では集団効果を特定したり、すべての環境要因を分離したり、個人の健康に関する推奨を正当化したりすることはできない。その後のASFR/TFR分析は、測定されたFieldStateとエンドポイントデータを人口統計学的需要、テンポ、およびART項と結合しなければならない。",
  },
  fr: {
    title: "Protocole de mesure FieldState",
    subtitle:
      "Un protocole pour documenter un état de champ physique et tester un critère d'évaluation biologique préspécifié. Le protocole vérifie si une caractéristique de champ spécifique produit une réponse biologique mesurable dans des conditions contrôlées.",
    introduction: [
      "BERM v17 nécessite plus qu'un proxy technologique national ou un seul niveau de bande large. Une expérience utile documente les composantes de champ mesurées, l'étalonnage, la géométrie, la temporalité et la provenance qui pourraient distinguer les hypothèses physiques concurrentes.",
      "L'objectif de ce protocole est de rendre la mesure physique et l'expérience biologique auditables indépendamment. Une signature physique, si observée, est un prérequis pour un test de mécanisme — pas une preuve de nocivité ni un coefficient TFR.",
    ],
    sections: [
      {
        title: "1. Préspécifier la question et le critère d'évaluation",
        text: [
          "Déclarez la caractéristique du champ, le système biologique, le critère d'évaluation primaire, le contraste d'exposition, la temporalité, l'analyse et les règles d'exclusion avant la collecte. Enregistrez une hypothèse compatible avec un résultat nul ainsi que l'hypothèse directionnelle proposée.",
          "Choisissez un critère d'évaluation proche du lien testé : par exemple une caractéristique PSD calibrée, une lecture redox cellulaire, une protéine de jonction serrée, une mesure de fonction spermatique ou une hormone reproductive. N'utilisez pas le TFR national comme critère d'évaluation direct d'une expérience d'exposition en laboratoire.",
        ],
      },
      {
        title: "2. Acquérir un FieldState physique documenté",
        text: [
          "Enregistrez les instruments calibrés, la réponse d'antenne ou de sonde, la sélection de bande, la plage dynamique, la chaîne d'échantillonnage, la position, l'orientation, la posture de l'appareil, le fuseau horaire, la synchronisation d'horloge et les sommes de contrôle des données brutes. Mesurez le vecteur de champ magnétique statique local B₀ lorsqu'il est pertinent pour l'hypothèse.",
          "Maintenez les conditions ambiantes et de source personnelle distinctes. Si la question physique concerne un organe, décrivez le modèle de transfert ou la mesure par fantôme/position ; une mesure en salle n'est pas automatiquement une estimation du champ de l'organe.",
        ],
        steps: [
          { title: "Composantes du champ", text: "Capturez les composantes électriques/magnétiques pertinentes et la ou les bandes sources ; conservez l'étalonnage et l'incertitude, pas seulement un niveau de synthèse unique." },
          { title: "Structure temporelle", text: "Créez une série temporelle de puissance de bande ou d'amplitude de champ horodatée, puis estimez la PSD d'enveloppe/battement après que la porteuse ou la bande a été validement acquise." },
          { title: "Contexte", text: "Enregistrez l'orientation vectorielle, la phase/cohérence lorsque mesurable, l'heure circadienne, la configuration de la source et les conditions environnementales susceptibles de modifier l'appareil." },
        ],
      },
      {
        title: "3. Traiter eDRX et R42 correctement",
        text: [
          "eDRX est un mécanisme de planification de réception discontinue/pagination de l'équipement utilisateur. Ce n'est pas, en soi, une forme d'onde RF de liaison descendante cellulaire connue ni une signature de champ ambiant. Un minuteur eDRX peut être enregistré comme métadonnée réseau/appareil, mais il ne doit pas être substitué à une PSD d'enveloppe de liaison descendante mesurée.",
          "Zandieh et al. (2025) ont rapporté un comportement mitochondrial/ROS dépendant de la fréquence dans des expériences sur cellules cancéreuses en conditions de champ magnétique ELF (0,01–5 Hz ; jusqu'à 100 mT, incluant les conditions 0,02 et 0,04 Hz). Ce résultat motive un test PSD exploratoire ; il n'établit pas de modulation de réseau RF, de raies spectrales eDRX ni d'effets reproductifs.",
        ],
      },
      {
        title: "4. Mener un bras biologique contrôlé",
        text: [
          "Utilisez une allocation en aveugle lorsque possible, une condition simulée (sham) et un contrôle thermique/de flux d'air/de manipulation apparié à l'appareil actif. Instrumentez la chambre d'exposition à chaque essai plutôt que de supposer que la consigne décrit la condition délivrée.",
          "Faites varier une caractéristique FieldState préspécifiée à la fois lorsque c'est faisable : angle vectoriel, fond statique, amplitude du champ, caractéristique de temporalité/PSD ou phase circadienne. N'incluez de contrôles positifs que lorsque leur interprétation biologique est appropriée ; ne traitez pas un sauvetage comme preuve d'un mécanisme de champ en amont.",
        ],
      },
      {
        title: "5. Analyser et rapporter",
        text: [
          "Publiez les données de champ brutes ou à accès contrôlé, le code de traitement, les fichiers d'étalonnage, les données biologiques, les exclusions, les événements indésirables et les résultats nuls. Rapportez les estimations d'effet avec l'incertitude et comparez les FieldStates actif et simulé, pas seulement les réglages nominaux de l'appareil.",
          "Classifiez le résultat par niveau de préparation des données : un proxy de temporalité technologique pour les séries nationales, des données FieldState partielles lorsque des entrées manquent, et un FieldState prêt pour la mesure lorsque l'étalonnage, B₀, le transfert, la PSD, le contexte circadien, la phase/cohérence et la provenance sont documentés. Les données prêtes pour la mesure nécessitent toujours un test spécifique au critère d'évaluation.",
        ],
      },
    ],
    boundaryTitle: "Limite d'interprétation",
    boundaryText:
      "Ce protocole peut tester un lien physique vers biologique. Il ne peut pas à lui seul identifier un effet de population, séparer toutes les causes environnementales ou justifier une recommandation de santé personnelle. Toute analyse ASFR/TFR ultérieure doit combiner les données FieldState mesurées et de critère d'évaluation avec les termes de demande démographique, de tempo et d'ART.",
  },
  ko: {
    title: "FieldState 측정 프로토콜",
    subtitle:
      "물리적 장 상태를 문서화하고 사전 지정된 생물학적 종점을 테스트하기 위한 프로토콜. 본 프로토콜은 특정 장 특성이 통제된 조건에서 측정 가능한 생물학적 반응을 생성하는지 검증한다.",
    introduction: [
      "BERM v17은 국가 수준의 기술 프록시나 단일 광대역 수준 이상을 요구한다. 유용한 실험은 측정된 장 성분, 교정, 기하학, 타이밍 및 출처를 문서화하여 경쟁하는 물리적 가설을 구별할 수 있게 한다.",
      "본 프로토콜의 목적은 물리적 측정과 생물학적 실험을 독립적으로 감사 가능하게 만드는 것이다. 관측된 물리적 서명은 메커니즘 검증의 전제 조건이며, 위해의 증거나 TFR 계수가 아니다.",
    ],
    sections: [
      {
        title: "1. 질문과 종점을 사전 지정한다",
        text: [
          "수집 전에 장 특성, 생물학적 시스템, 1차 종점, 노출 대비, 타이밍, 분석 및 배제 규칙을 명시한다. 제안된 방향성 가설과 함께 귀무 가설과 양립 가능한 가설도 등록한다.",
          "테스트되는 연결에 근접한 종점을 선택한다: 예를 들어 교정된 PSD 특성, 세포 산화환원 판독값, 밀착연접 단백질, 정자 기능 측정치 또는 생식 호르몬. 실험실 노출 실험의 직접적 종점으로 국가 TFR을 사용하지 않는다.",
        ],
      },
      {
        title: "2. 문서화된 물리적 FieldState를 취득한다",
        text: [
          "교정된 기기, 안테나 또는 프로브 응답, 대역 선택, 동적 범위, 샘플링 체인, 위치, 방향, 장치 자세, 시간대, 클록 동기화 및 원시 데이터 체크섬을 기록한다. 가설과 관련이 있는 경우 국소 정자기장 배경 B₀ 벡터를 측정한다.",
          "주변 환경과 개인 소스 조건을 구분하여 유지한다. 물리적 질문이 장기에 관한 것이라면 전달 모델 또는 팬텀/위치 측정을 기술한다. 실내 측정이 자동으로 장기 장 추정치가 되는 것은 아니다.",
        ],
        steps: [
          { title: "장 성분", text: "관련 전기/자기 성분 및 소스 대역을 캡처한다. 단일 요약 수준이 아닌 교정 및 불확도를 보존한다." },
          { title: "시간 구조", text: "타임스탬프가 포함된 대역 전력 또는 장 진폭 계열을 생성한 후, 반송파 또는 대역이 유효하게 취득된 후에 포락선/비트 PSD를 추정한다." },
          { title: "맥락", text: "벡터 방향, 측정 가능한 경우의 위상/코히어런스, 일주기 시각, 소스 구성 및 장비를 변경할 수 있는 환경 조건을 기록한다." },
        ],
      },
      {
        title: "3. eDRX와 R42를 올바르게 처리한다",
        text: [
          "eDRX는 사용자 장비의 불연속 수신/페이징 스케줄링 메커니즘이다. 그 자체로는 알려진 셀룰러 다운링크 RF 파형이나 주변 장 서명이 아니다. eDRX 타이머는 네트워크/장치 메타데이터로 기록할 수 있지만, 측정된 다운링크 포락선 PSD를 대체해서는 안 된다.",
          "Zandieh et al. (2025)은 ELF 자기장 조건(0.01~5 Hz, 최대 100 mT, 0.02 및 0.04 Hz 조건 포함)에서의 암세포 실험에서 주파수 의존적 미토콘드리아/ROS 거동을 보고하였다. 이 결과는 탐색적 PSD 검증의 동기가 되지만, RF 네트워크 변조, eDRX 스펙트럼 선 또는 생식 영향을 확립하는 것은 아니다.",
        ],
      },
      {
        title: "4. 통제된 생물학적 군을 실시한다",
        text: [
          "가능한 경우 맹검 할당을 사용하고, 위장(sham) 조건 및 능동 장비에 맞춘 열/기류/취급 대조를 설정한다. 설정값이 전달된 조건을 기술한다고 가정하지 말고, 매 실험마다 노출 챔버를 계측한다.",
          "실행 가능한 경우 사전 지정된 FieldState 특성을 한 번에 하나씩 변동시킨다: 벡터 각도, 정적 배경, 장 진폭, 타이밍/PSD 특성 또는 일주기 위상. 생물학적 해석이 적절한 경우에만 양성 대조를 포함한다. 구제(rescue)를 상위 장 메커니즘의 증거로 취급하지 않는다.",
        ],
      },
      {
        title: "5. 분석 및 보고",
        text: [
          "원시 또는 접근 통제된 원시 장 데이터, 처리 코드, 교정 파일, 생물학적 데이터, 배제, 이상 반응 및 귀무 결과를 공개한다. 효과 추정치를 불확도와 함께 보고하고, 명목 장치 설정뿐 아니라 능동 및 위장(sham) FieldState를 비교한다.",
          "데이터 준비도에 따라 결과를 분류한다: 국가 계열에 대한 기술 타이밍 프록시, 입력이 누락된 경우의 부분 FieldState 데이터, 교정·B₀·전달·PSD·일주기 맥락·위상/코히어런스 및 출처가 문서화된 경우의 측정 준비 완료 FieldState. 측정 준비 완료 데이터라도 종점 특이적 검증이 여전히 필요하다.",
        ],
      },
    ],
    boundaryTitle: "해석의 경계",
    boundaryText:
      "본 프로토콜은 물리적에서 생물학적으로의 연결을 검증할 수 있다. 그러나 그 자체로는 인구 수준의 효과를 식별하거나, 모든 환경적 원인을 분리하거나, 개인 건강 권고를 정당화할 수 없다. 이후의 ASFR/TFR 분석은 측정된 FieldState와 종점 데이터를 인구통계학적 수요, 템포 및 ART 항과 결합해야 한다.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function MeasurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Radio} title={d.title} subtitle={d.subtitle} />

      <div className="max-w-3xl space-y-10">
        <div className="space-y-3 text-foreground-muted leading-relaxed">
          {d.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {d.sections.map((section, index) => (
          <section key={section.title} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.steps && (
              <div className="mt-5 space-y-3 border-t border-card-border pt-4">
                {section.steps.map((step) => (
                  <div key={step.title} className="border-l-2 border-accent/30 pl-4">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.boundaryTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.boundaryText}</p>
        </section>
      </div>
    </div>
  );
}
