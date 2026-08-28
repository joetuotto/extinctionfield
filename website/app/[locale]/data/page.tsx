import type { Metadata } from "next";
import { pickCopy } from "@/lib/i18n";
import { FieldStateStatus } from "@/components/FieldStateStatus";

const READINESS_TIERS = {
  en: [
    {
      tier: "Technology timing proxy",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163 countries",
      description: "Country-level mobile-subscription and internet-penetration series are available as technology-adoption timing proxies. They support descriptive cohort analysis but are not physical FieldState, local RF dose or organ-exposure inputs.",
      sources: "World Bank WDI, ITU, GSMA Intelligence",
    },
    {
      tier: "Partial FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "Protocol defined, data limited",
      description: "Spatial RF measurement data exists (e.g. ANFR in France, Ofcom in the UK) but has not been joined to the organ-transfer model. Documented units, calibration, spectrum/PSD, B₀ context and circadian timing are required before these observations can enter a FieldState panel.",
      sources: "ANFR (France), Ofcom (UK), national regulators",
    },
    {
      tier: "Measurement-ready FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "No countries yet",
      description: "A measurement-ready FieldState requires documented local field vectors (B₀, ambient RF spectrum/PSD, personal device geometry), organ-specific transfer with posture and circadian context, registered biological endpoints and couple panels. No country currently has all components assembled.",
      sources: "Requires purpose-built measurement campaign",
    },
  ],
  fi: [
    {
      tier: "Teknologian ajoitusproxy",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163 maata",
      description: "Maatason mobiililiittymä- ja internet-levinneisyyssarjat ovat saatavilla teknologian käyttöönoton ajoitusproxyna. Ne tukevat kuvailevaa kohorttianalyysiä, mutta eivät ole fysikaalinen FieldState, paikallinen RF-annos tai elinkohtainen altistussyöte.",
      sources: "Maailmanpankki WDI, ITU, GSMA Intelligence",
    },
    {
      tier: "Osittainen FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "Protokolla määritelty, data rajallista",
      description: "Alueellisia RF-mittaustietoja on olemassa (esim. ANFR Ranskassa, Ofcom UK:ssa), mutta niitä ei ole yhdistetty elinkohtaiseen siirtomalliin. Dokumentoidut yksiköt, kalibrointi, spektri/PSD, B₀-konteksti ja vuorokausiajoitus vaaditaan ennen FieldState-paneeliin liittämistä.",
      sources: "ANFR (Ranska), Ofcom (UK), kansalliset sääntelyviranomaiset",
    },
    {
      tier: "Mittausvalmis FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "Ei yhtään maata vielä",
      description: "Mittausvalmis FieldState vaatii dokumentoidut paikalliset kenttävektorit (B₀, ambientin RF-spektri/PSD, henkilökohtaisen laitteen geometria), elinkohtaisen siirron asennolla ja vuorokausikontekstilla, rekisteröidyt biologiset päätepisteet ja paripaneelit. Missään maassa ei ole kaikkia komponentteja koottuna.",
      sources: "Vaatii tarkoitukseen rakennetun mittauskampanjan",
    },
  ],
  ja: [
    {
      tier: "技術タイミングプロキシ",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163か国",
      description: "国レベルのモバイル契約数とインターネット普及率のデータは、技術導入のタイミングプロキシとして利用可能です。記述的コホート分析には対応しますが、物理的なFieldState、局所RF線量、臓器曝露の入力データではありません。",
      sources: "世界銀行 WDI、ITU、GSMA Intelligence",
    },
    {
      tier: "部分的FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "プロトコル定義済み、データ限定的",
      description: "空間的RF測定データ（フランスのANFR、英国のOfcomなど）は存在しますが、臓器移行モデルとの統合は行われていません。FieldStateパネルに組み込むには、文書化された単位、校正、スペクトル/PSD、B₀コンテキスト、概日タイミングが必要です。",
      sources: "ANFR（フランス）、Ofcom（英国）、各国規制当局",
    },
    {
      tier: "測定準備完了FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "該当国なし",
      description: "測定準備完了FieldStateには、文書化された局所電磁場ベクトル（B₀、環境RF スペクトル/PSD、個人デバイスの幾何学配置）、姿勢と概日コンテキストを含む臓器固有の移行、登録済み生物学的エンドポイントとカップルパネルが必要です。現在、すべての要素を備えた国はありません。",
      sources: "専用測定キャンペーンが必要",
    },
  ],
  fr: [
    {
      tier: "Proxy de chronologie technologique",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163 pays",
      description: "Les séries d'abonnements mobiles et de pénétration d'Internet au niveau national sont disponibles comme proxys chronologiques d'adoption technologique. Elles permettent une analyse descriptive de cohortes mais ne constituent pas un FieldState physique, une dose RF locale ou une entrée d'exposition organique.",
      sources: "Banque mondiale WDI, UIT, GSMA Intelligence",
    },
    {
      tier: "FieldState partiel",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "Protocole défini, données limitées",
      description: "Des données de mesure RF spatiales existent (ex. ANFR en France, Ofcom au Royaume-Uni) mais n'ont pas été intégrées au modèle de transfert organique. Des unités documentées, un étalonnage, un spectre/PSD, un contexte B₀ et un chronométrage circadien sont requis avant intégration dans un panneau FieldState.",
      sources: "ANFR (France), Ofcom (Royaume-Uni), régulateurs nationaux",
    },
    {
      tier: "FieldState prêt pour la mesure",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "Aucun pays pour le moment",
      description: "Un FieldState prêt pour la mesure nécessite des vecteurs de champ locaux documentés (B₀, spectre/PSD RF ambiant, géométrie de l'appareil personnel), un transfert spécifique à l'organe avec posture et contexte circadien, des critères biologiques enregistrés et des panels de couples. Aucun pays ne dispose actuellement de tous les composants assemblés.",
      sources: "Nécessite une campagne de mesure dédiée",
    },
  ],
  ko: [
    {
      tier: "기술 타이밍 프록시",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163개국",
      description: "국가 수준의 모바일 가입 및 인터넷 보급률 데이터는 기술 도입 타이밍 프록시로 활용할 수 있습니다. 기술적 코호트 분석에는 사용 가능하지만, 물리적 FieldState, 국소 RF 선량 또는 장기 노출 입력 데이터는 아닙니다.",
      sources: "세계은행 WDI, ITU, GSMA Intelligence",
    },
    {
      tier: "부분적 FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "프로토콜 정의됨, 데이터 제한적",
      description: "공간 RF 측정 데이터(프랑스의 ANFR, 영국의 Ofcom 등)가 존재하지만 장기 전달 모델과 통합되지 않았습니다. FieldState 패널에 편입하려면 문서화된 단위, 교정, 스펙트럼/PSD, B₀ 컨텍스트 및 일주기 타이밍이 필요합니다.",
      sources: "ANFR(프랑스), Ofcom(영국), 각국 규제 당국",
    },
    {
      tier: "측정 준비 완료 FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "해당 국가 없음",
      description: "측정 준비 완료 FieldState에는 문서화된 국소 전자기장 벡터(B₀, 주변 RF 스펙트럼/PSD, 개인 기기 기하학), 자세와 일주기 컨텍스트를 포함한 장기별 전달, 등록된 생물학적 종료점 및 커플 패널이 필요합니다. 현재 모든 구성 요소를 갖춘 국가는 없습니다.",
      sources: "전용 측정 캠페인 필요",
    },
  ],
};

const t = {
  en: {
    title: "Data Sources",
    subtitle:
      "Data inventory for BERM v17. Sources are separated by what they actually measure; availability is not treated as evidence of a biological or demographic effect.",
    readinessTitle: "Measurement readiness by country tier",
    readinessLead: "BERM v17 classifies every country by what input data is actually available. This makes the gap between a timing proxy and a measurement-ready FieldState explicit rather than hidden.",
    readinessNote: "Measurement-ready means that all named physical inputs are documented. It does not mean a biological effect, a causal estimate or an outcome coefficient has been established.",
    primaryTitle: "Technology-timing proxies",
    primaryDesc:
      "Country-level uptake and connectivity series can support descriptive technology timing and cohort analysis. They are not physical FieldState, local RF dose or organ exposure inputs.",
    rfTitle: "RF measurement data",
    rfDesc:
      "Regulatory and spatial RF records are candidate components of a FieldState panel. They require documented units, calibration, spectrum/PSD, location, B₀ context and organ-transfer assumptions before endpoint analysis.",
    infraTitle: "Infrastructure data",
    infraDesc:
      "Tower and antenna registrations provide source-location context. They do not by themselves establish a geographic organ-exposure gradient.",
    outcomeTitle: "Demographic outcome data (ASFR → TFR)",
    outcomeDesc:
      "WPP age-specific fertility rates (ASFR) are the primary demographic endpoint; TFR is derived after ASFR. Vital statistics help assess timing, parity and registration differences.",
    biomarkerTitle: "Biomarker reference data",
    biomarkerDesc:
      "Reference standards and research syntheses for registered organ endpoints. They inform endpoint selection and protocol design; they do not supply a national bioCap or TFR coefficient.",
    pipelineTitle: "Data pipeline",
    pipelineFlow: "Raw datasets flow through a standardized pipeline before entering the model:",
    pipelineNote:
      "The repository documents source provenance and normalisation separately. A country-year technology series supports descriptive timing until it is joined to a documented local FieldState and a registered endpoint; no implicit conversion to dose or TFR effect is made.",
    licensingTitle: "Licensing",
    licData: "All datasets used are either open-access or cited with permission under their respective licenses.",
    licCode: "MIT License -- free to use, modify, and distribute with attribution.",
    licDocs: "CC BY-4.0 -- share and adapt with appropriate credit.",
    dataNote:
      "Availability note: Some sources require registration. Open demographic and technology-timing series reproduce the descriptive cohort analysis, not a BERM v17 effect estimate or country forecast.",
    coverage: "Coverage",
    frequency: "Frequency",
    dataLabel: "Data",
    modelCode: "Model code",
    documentation: "Documentation",
    rawData: "Raw data",
    standardized: "Standardized format",
    modelInput: "Model input",
    sourcesLabel: "Sources",
    requiresRegistration: "requires registration",
    variousRegulators: "Various regulators",
    worldBankLabel: "World Bank",
    variousLabel: "Various",
  },
  fi: {
    title: "Datalähteet",
    subtitle:
      "BERM v17:n dataluettelo. Lähteet erotellaan sen mukaan, mitä ne todella mittaavat; saatavuutta ei käsitellä biologisen tai demografisen vaikutuksen evidenssinä.",
    readinessTitle: "Mittausvalmius maatasoittain",
    readinessLead: "BERM v17 luokittelee jokaisen maan sen mukaan, mitä syötedataa on todella saatavilla. Tämä tekee eron ajoitusproxyn ja mittausvalmiin FieldStaten välillä näkyväksi piilossa pitämisen sijaan.",
    readinessNote: "Mittausvalmis tarkoittaa, että kaikki nimetyt fysikaaliset syötteet on dokumentoitu. Se ei tarkoita, että biologinen vaikutus, kausaaliarvio tai tuloskerroin olisi osoitettu.",
    primaryTitle: "Teknologian ajoitusproksit",
    primaryDesc:
      "Maatason käyttöönotto- ja yhteyssarjat tukevat kuvailevaa teknologia-ajoitus- ja kohorttianalyysiä. Ne eivät ole fysikaalinen FieldState, paikallinen RF-annos tai elinkohtainen altistussyöte.",
    rfTitle: "RF-mittausdata",
    rfDesc:
      "Sääntely- ja spatiaalisen RF-datan tietueet ovat FieldState-paneelin mahdollisia osia. Ne tarvitsevat dokumentoidut yksiköt, kalibroinnin, spektrin/PSD:n, sijainnin, B₀-kontekstin ja elinkohtaisen siirron oletukset ennen päätepisteanalyysiä.",
    infraTitle: "Infrastruktuuridata",
    infraDesc:
      "Masto- ja antennirekisterit antavat lähdesijainnin kontekstia. Ne eivät yksin osoita maantieteellistä elinkohtaista altistusgradienttia.",
    outcomeTitle: "Demografinen tulosdata (ASFR → TFR)",
    outcomeDesc:
      "WPP:n ikäryhmäkohtainen hedelmällisyys (ASFR) on ensisijainen demografinen päätepiste; TFR johdetaan ASFR:n jälkeen. Vitaalitilastot auttavat arvioimaan ajoitus-, pariteetti- ja rekisteröintieroja.",
    biomarkerTitle: "Biomarkkereiden referenssidata",
    biomarkerDesc:
      "Referenssistandardit ja tutkimussynteesit rekisteröidyille elinpäätepisteille. Ne ohjaavat päätepistevalintaa ja protokollaa, eivät anna kansallista bioCap- tai TFR-kerrointa.",
    pipelineTitle: "Dataputki",
    pipelineFlow: "Raakadatasetit kulkevat standardoidun putken läpi ennen malliin syöttämistä:",
    pipelineNote:
      "Repo dokumentoi lähdeprovenienssin ja normalisoinnin erikseen. Maa–vuosi-teknologiasarja tukee kuvailevaa ajoitusta, kunnes se yhdistetään dokumentoituun paikalliseen FieldStateen ja rekisteröityyn päätepisteeseen; implisiittistä muunnosta annokseksi tai TFR-vaikutukseksi ei tehdä.",
    licensingTitle: "Lisensointi",
    licData: "Kaikki käytetyt datasetit ovat joko avoimesti saatavilla tai viitattu luvalla niiden omilla lisensseillä.",
    licCode: "MIT-lisenssi -- vapaasti käytettävissä, muokattavissa ja jaettavissa lähdeviitteellä.",
    licDocs: "CC BY-4.0 -- jaa ja muokkaa asianmukaisella lähdeviitteellä.",
    dataNote:
      "Saatavuushuomautus: Jotkin lähteet vaativat rekisteröitymisen. Avoimet demografia- ja teknologia-ajoitussarjat toistavat kuvailevan kohorttianalyysin, eivät BERM v17-vaikutusarviota tai maaennustetta.",
    coverage: "Kattavuus",
    frequency: "Päivitystahti",
    dataLabel: "Data",
    modelCode: "Mallikoodi",
    documentation: "Dokumentaatio",
    rawData: "Raakadata",
    standardized: "Standardoitu formaatti",
    modelInput: "Mallin syöte",
    sourcesLabel: "Lähteet",
    requiresRegistration: "vaatii rekisteröitymisen",
    variousRegulators: "Eri sääntelyviranomaiset",
    worldBankLabel: "Maailmanpankki",
    variousLabel: "Useita",
  },
  ja: {
    title: "データソース",
    subtitle:
      "BERM v17のデータ目録。ソースは実際に何を測定しているかで分類されており、データの利用可能性を生物学的または人口学的影響のエビデンスとして扱いません。",
    readinessTitle: "国別の測定準備状況",
    readinessLead: "BERM v17は、実際に利用可能な入力データに基づいて各国を分類します。これにより、タイミングプロキシと測定準備完了FieldStateの間のギャップが隠されることなく明示されます。",
    readinessNote: "測定準備完了とは、指定されたすべての物理的入力が文書化されていることを意味します。生物学的影響、因果推定、またはアウトカム係数が確立されたことを意味するものではありません。",
    primaryTitle: "技術タイミングプロキシ",
    primaryDesc:
      "国レベルの普及率と接続性のデータは、記述的な技術タイミングとコホート分析に使用できます。物理的なFieldState、局所RF線量、臓器曝露の入力データではありません。",
    rfTitle: "RF測定データ",
    rfDesc:
      "規制当局および空間RF記録は、FieldStateパネルの候補要素です。エンドポイント分析の前に、文書化された単位、校正、スペクトル/PSD、位置、B₀コンテキスト、臓器移行の仮定が必要です。",
    infraTitle: "インフラストラクチャデータ",
    infraDesc:
      "基地局とアンテナの登録は、ソース位置のコンテキストを提供します。それ自体では地理的な臓器曝露勾配を確立するものではありません。",
    outcomeTitle: "人口学的アウトカムデータ（ASFR → TFR）",
    outcomeDesc:
      "WPPの年齢別出生率（ASFR）が主要な人口学的エンドポイントであり、TFRはASFRから導出されます。人口動態統計はタイミング、出生順位、登録の差異の評価に役立ちます。",
    biomarkerTitle: "バイオマーカー参照データ",
    biomarkerDesc:
      "登録済み臓器エンドポイントの参照基準と研究統合。エンドポイント選択とプロトコル設計に情報を提供しますが、国家のbioCap値やTFR係数を提供するものではありません。",
    pipelineTitle: "データパイプライン",
    pipelineFlow: "生データセットは、モデルに入力される前に標準化されたパイプラインを通過します：",
    pipelineNote:
      "リポジトリはソースの来歴と正規化を別々に文書化しています。国・年の技術データ系列は、文書化されたローカルFieldStateと登録済みエンドポイントに結合されるまで記述的タイミングを支援します。線量やTFR効果への暗黙の変換は行われません。",
    licensingTitle: "ライセンス",
    licData: "使用されているすべてのデータセットは、オープンアクセスまたはそれぞれのライセンスに基づく許可付き引用です。",
    licCode: "MITライセンス -- 帰属表示付きで自由に使用、変更、配布できます。",
    licDocs: "CC BY-4.0 -- 適切なクレジット表示付きで共有・改変可能。",
    dataNote:
      "利用可能性に関する注記：一部のソースは登録が必要です。オープンな人口統計および技術タイミングデータ系列は記述的コホート分析を再現するものであり、BERM v17の効果推定や国別予測ではありません。",
    coverage: "カバレッジ",
    frequency: "更新頻度",
    dataLabel: "データ",
    modelCode: "モデルコード",
    documentation: "ドキュメント",
    rawData: "生データ",
    standardized: "標準化フォーマット",
    modelInput: "モデル入力",
    sourcesLabel: "ソース",
    requiresRegistration: "登録が必要",
    variousRegulators: "各国規制当局",
    worldBankLabel: "世界銀行",
    variousLabel: "複数",
  },
  fr: {
    title: "Sources de données",
    subtitle:
      "Inventaire des données pour BERM v17. Les sources sont séparées par ce qu'elles mesurent réellement ; la disponibilité n'est pas traitée comme preuve d'un effet biologique ou démographique.",
    readinessTitle: "Disponibilité des mesures par niveau de pays",
    readinessLead: "BERM v17 classe chaque pays selon les données d'entrée réellement disponibles. Cela rend explicite l'écart entre un proxy de chronologie et un FieldState prêt pour la mesure, plutôt que de le dissimuler.",
    readinessNote: "Prêt pour la mesure signifie que toutes les entrées physiques nommées sont documentées. Cela ne signifie pas qu'un effet biologique, une estimation causale ou un coefficient de résultat a été établi.",
    primaryTitle: "Proxys de chronologie technologique",
    primaryDesc:
      "Les séries d'adoption et de connectivité au niveau national peuvent soutenir la chronologie technologique descriptive et l'analyse de cohortes. Elles ne constituent pas un FieldState physique, une dose RF locale ou une entrée d'exposition organique.",
    rfTitle: "Données de mesure RF",
    rfDesc:
      "Les enregistrements RF réglementaires et spatiaux sont des composants candidats d'un panneau FieldState. Ils nécessitent des unités documentées, un étalonnage, un spectre/PSD, une localisation, un contexte B₀ et des hypothèses de transfert organique avant l'analyse des critères.",
    infraTitle: "Données d'infrastructure",
    infraDesc:
      "Les registres de tours et d'antennes fournissent un contexte de localisation source. Ils n'établissent pas à eux seuls un gradient géographique d'exposition organique.",
    outcomeTitle: "Données démographiques de résultat (ASFR → TFR)",
    outcomeDesc:
      "Les taux de fécondité par âge (ASFR) du WPP sont le critère démographique principal ; le TFR est dérivé après l'ASFR. Les statistiques de l'état civil aident à évaluer le chronométrage, la parité et les différences d'enregistrement.",
    biomarkerTitle: "Données de référence des biomarqueurs",
    biomarkerDesc:
      "Normes de référence et synthèses de recherche pour les critères organiques enregistrés. Elles informent la sélection des critères et la conception du protocole ; elles ne fournissent pas un bioCap national ou un coefficient TFR.",
    pipelineTitle: "Pipeline de données",
    pipelineFlow: "Les jeux de données bruts passent par un pipeline standardisé avant d'entrer dans le modèle :",
    pipelineNote:
      "Le dépôt documente séparément la provenance et la normalisation des sources. Une série technologique pays-année soutient la chronologie descriptive jusqu'à sa jonction avec un FieldState local documenté et un critère enregistré ; aucune conversion implicite en dose ou en effet TFR n'est effectuée.",
    licensingTitle: "Licences",
    licData: "Tous les jeux de données utilisés sont soit en accès libre, soit cités avec permission sous leurs licences respectives.",
    licCode: "Licence MIT -- libre d'utilisation, de modification et de distribution avec attribution.",
    licDocs: "CC BY-4.0 -- partage et adaptation avec crédit approprié.",
    dataNote:
      "Note de disponibilité : certaines sources nécessitent une inscription. Les séries démographiques et de chronologie technologique ouvertes reproduisent l'analyse de cohorte descriptive, pas une estimation d'effet BERM v17 ou une prévision par pays.",
    coverage: "Couverture",
    frequency: "Fréquence",
    dataLabel: "Données",
    modelCode: "Code du modèle",
    documentation: "Documentation",
    rawData: "Données brutes",
    standardized: "Format standardisé",
    modelInput: "Entrée du modèle",
    sourcesLabel: "Sources",
    requiresRegistration: "inscription requise",
    variousRegulators: "Divers régulateurs",
    worldBankLabel: "Banque mondiale",
    variousLabel: "Divers",
  },
  ko: {
    title: "데이터 소스",
    subtitle:
      "BERM v17의 데이터 목록. 소스는 실제로 측정하는 내용에 따라 분류되며, 가용성이 생물학적 또는 인구학적 효과의 증거로 취급되지 않습니다.",
    readinessTitle: "국가별 측정 준비 현황",
    readinessLead: "BERM v17은 실제로 이용 가능한 입력 데이터를 기준으로 각 국가를 분류합니다. 이를 통해 타이밍 프록시와 측정 준비 완료 FieldState 사이의 격차가 숨겨지지 않고 명시됩니다.",
    readinessNote: "측정 준비 완료란 지정된 모든 물리적 입력이 문서화되었음을 의미합니다. 생물학적 효과, 인과 추정 또는 결과 계수가 확립되었다는 의미가 아닙니다.",
    primaryTitle: "기술 타이밍 프록시",
    primaryDesc:
      "국가 수준의 도입 및 연결성 데이터는 기술적 타이밍 기술과 코호트 분석에 사용할 수 있습니다. 물리적 FieldState, 국소 RF 선량 또는 장기 노출 입력이 아닙니다.",
    rfTitle: "RF 측정 데이터",
    rfDesc:
      "규제 및 공간 RF 기록은 FieldState 패널의 후보 구성 요소입니다. 종료점 분석 전에 문서화된 단위, 교정, 스펙트럼/PSD, 위치, B₀ 컨텍스트 및 장기 전달 가정이 필요합니다.",
    infraTitle: "인프라 데이터",
    infraDesc:
      "기지국 및 안테나 등록은 소스 위치 컨텍스트를 제공합니다. 그 자체로는 지리적 장기 노출 기울기를 확립하지 않습니다.",
    outcomeTitle: "인구학적 결과 데이터 (ASFR → TFR)",
    outcomeDesc:
      "WPP 연령별 출산율(ASFR)이 주요 인구학적 종료점이며, TFR은 ASFR 이후에 도출됩니다. 인구동태통계는 시기, 출산 순위 및 등록 차이 평가에 도움이 됩니다.",
    biomarkerTitle: "바이오마커 참조 데이터",
    biomarkerDesc:
      "등록된 장기 종료점에 대한 참조 기준과 연구 통합. 종료점 선택과 프로토콜 설계에 정보를 제공하지만 국가 bioCap 또는 TFR 계수를 제공하지는 않습니다.",
    pipelineTitle: "데이터 파이프라인",
    pipelineFlow: "원시 데이터셋은 모델에 입력되기 전에 표준화된 파이프라인을 거칩니다:",
    pipelineNote:
      "저장소는 소스 출처와 정규화를 별도로 문서화합니다. 국가-연도 기술 시계열은 문서화된 로컬 FieldState 및 등록된 종료점과 결합될 때까지 기술적 타이밍을 지원합니다. 선량이나 TFR 효과로의 암묵적 변환은 수행되지 않습니다.",
    licensingTitle: "라이선스",
    licData: "사용된 모든 데이터셋은 오픈 액세스이거나 해당 라이선스에 따라 허가를 받아 인용되었습니다.",
    licCode: "MIT 라이선스 -- 귀속 표시와 함께 자유롭게 사용, 수정, 배포 가능.",
    licDocs: "CC BY-4.0 -- 적절한 크레딧 표시와 함께 공유 및 수정 가능.",
    dataNote:
      "이용 가능성 참고: 일부 소스는 등록이 필요합니다. 공개 인구통계 및 기술 타이밍 데이터 시계열은 기술적 코호트 분석을 재현하며, BERM v17 효과 추정이나 국가별 예측이 아닙니다.",
    coverage: "범위",
    frequency: "빈도",
    dataLabel: "데이터",
    modelCode: "모델 코드",
    documentation: "문서",
    rawData: "원시 데이터",
    standardized: "표준화 포맷",
    modelInput: "모델 입력",
    sourcesLabel: "출처",
    requiresRegistration: "등록 필요",
    variousRegulators: "각국 규제 당국",
    worldBankLabel: "세계은행",
    variousLabel: "다수",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  if (locale === "fi") {
    return {
      title: "Datalähteet - Extinction Field",
      description:
        "BERM v17:n teknologiakehityksen ajoitusproksit, ehdokas-RF-mittaustietueet, demografiset sarjat ja päätepistereferenssit.",
    };
  }
  if (locale === "en") {
    return {
      title: "Data Sources - Extinction Field",
      description:
        "BERM v17 technology-timing proxies, candidate RF measurement records, demographic series and endpoint references.",
    };
  }
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function ProviderBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {label}
    </span>
  );
}

function DataSourceCard({
  id,
  name,
  provider,
  providerColor,
  description,
  coverage,
  frequency,
  url,
  urlNote,
  coverageLabel,
  frequencyLabel,
}: {
  id?: string;
  name: string;
  provider: string;
  providerColor: string;
  description: string;
  coverage: string;
  frequency: string;
  url?: string;
  urlNote?: string;
  coverageLabel: string;
  frequencyLabel: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {id && (
            <p className="text-xs font-mono-num text-foreground-muted mb-1">
              {id}
            </p>
          )}
          <h3 className="text-base font-semibold leading-snug">{name}</h3>
        </div>
        <ProviderBadge label={provider} color={providerColor} />
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-muted mb-4">
        <span>
          <strong className="text-foreground">{coverageLabel}:</strong>{" "}
          {coverage}
        </span>
        <span>
          <strong className="text-foreground">{frequencyLabel}:</strong>{" "}
          {frequency}
        </span>
      </div>
      {url && (
        <a
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-xs font-medium rounded-md transition-colors"
        >
          {url.replace(/^https?:\/\//, "")}
          {urlNote && (
            <span className="text-foreground-muted ml-1">({urlNote})</span>
          )}
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
            />
          </svg>
        </a>
      )}
    </SectionCard>
  );
}

const dataSources = {
  en: {
    d1: {
      name: "Mobile Cellular Subscriptions",
      description:
        "Mobile cellular subscriptions per 100 inhabitants. A technology-adoption timing proxy for descriptive cohort analysis; not a physical RF or FieldState measure.",
      coverage: "200+ countries, 1990 -- present",
      frequency: "Annual",
    },
    d2: {
      name: "Mobile Connectivity Index",
      description:
        "Composite index measuring infrastructure deployment, affordability, consumer readiness, and content availability. Useful context for technology diffusion, not an exposure-weighting coefficient.",
      coverage: "170 countries",
      frequency: "Annual",
    },
    d3: {
      name: "National RF Field Strength Surveys",
      description:
        "Measured ambient RF levels reported by national spectrum authorities. These observations need protocol-, spectrum-, location- and calibration metadata before they can contribute to a FieldState panel.",
      coverage: "Varies by country",
      frequency: "Periodic",
    },
    d4: {
      name: "Connected Nations Reports",
      description:
        "100-metre grid coverage and signal-strength data for mobile networks. It supports spatial context; it is not by itself a ground-truth organ exposure or endpoint calibration.",
      coverage: "United Kingdom",
      frequency: "Annual",
    },
    o4: {
      name: "Antenna Structure Registration",
      description:
        "Registered antenna structures including tower locations, heights, and types. Candidate source-location context for a future measured FieldState protocol; not an active U.S. organ-exposure model.",
      coverage: "United States",
      frequency: "Continuously updated",
    },
    wpp: {
      name: "World Population Prospects",
      description:
        "Demographic estimates including age-specific fertility rates and TFR. WPP ASFR is the primary demographic reference for the active route.",
      coverage: "All countries",
      frequency: "Periodic revisions",
    },
    wbFert: {
      name: "Fertility Rate (World Bank)",
      description:
        "World Bank total fertility rate indicator, drawing on UN Population Division and national-statistical sources. Used as a cross-check against WPP estimates.",
      coverage: "200+ countries",
      frequency: "Annual",
    },
    nso: {
      name: "National Statistics Offices",
      description:
        "Country-specific vital statistics from agencies like Statistics Finland (Tilastokeskus), KOSIS (South Korea), and ONS (UK). Used for high-frequency sub-annual fertility tracking.",
      coverage: "Country-specific",
      frequency: "Quarterly to annual",
    },
    levine: {
      name: "Sperm Concentration Trends Meta-analysis",
      description:
        "A historical research synthesis on sperm-concentration trends. It provides context for endpoint selection, not a biological-capacity decline curve or national parameter.",
      coverage: "42,935 men, 185 studies",
      frequency: "Published 2017",
    },
    who: {
      name: "WHO Semen Analysis Reference Values",
      description:
        "Clinical reference ranges for semen parameters (concentration, motility, morphology). 6th edition published 2021. A reference for endpoint selection and future protocol design, not an active BERM calibration boundary.",
      coverage: "Global clinical standard",
      frequency: "Published 2021",
    },
  },
  fi: {
    d1: {
      name: "Matkapuhelinliittymät",
      description:
        "Matkapuhelinliittymät 100 asukasta kohti. Teknologian käyttöönoton ajoitusproksi kuvailevaan kohorttianalyysiin; ei fysikaalinen RF- tai FieldState-mittaus.",
      coverage: "200+ maata, 1990 -- nykyhetki",
      frequency: "Vuosittainen",
    },
    d2: {
      name: "Mobiiliyhteyksien indeksi",
      description:
        "Komposiitti-indeksi infrastruktuurin käyttöönotosta, edullisuudesta, kuluttajavalmiudesta ja sisällön saatavuudesta. Käyttökelpoinen teknologian diffuusion kontekstina, ei altistuspainona.",
      coverage: "170 maata",
      frequency: "Vuosittainen",
    },
    d3: {
      name: "Kansalliset RF-kenttävoimakkuustutkimukset",
      description:
        "Kansallisten taajuusviranomaisten raportoimat ympäristön RF-tasot. Havainnot tarvitsevat protokolla-, spektri-, sijainti- ja kalibrointimetatiedot ennen FieldState-paneeliin liittämistä.",
      coverage: "Vaihtelee maittain",
      frequency: "Jaksottainen",
    },
    d4: {
      name: "Connected Nations -raportit",
      description:
        "100 metrin ruudukon kattavuus- ja signaalivoimakkuusdata mobiiliverkoille. Tukee spatiaalista kontekstia; ei yksin ole todellinen elinkohtainen altistus tai endpoint-kalibrointi.",
      coverage: "Yhdistynyt kuningaskunta",
      frequency: "Vuosittainen",
    },
    o4: {
      name: "Antennirakenteiden rekisteri",
      description:
        "Rekisteröidyt antennirakenteet sisältäen mastojen sijainnit, korkeudet ja tyypit. Mahdollinen lähdesijainnin konteksti tulevalle mitatulle FieldState-protokollalle; ei aktiivinen Yhdysvaltain elinkohtainen altistusmalli.",
      coverage: "Yhdysvallat",
      frequency: "Jatkuvasti päivitetty",
    },
    wpp: {
      name: "World Population Prospects",
      description:
        "Väestöarviot, mukaan lukien ikäryhmäkohtainen hedelmällisyys ja TFR. WPP:n ASFR on aktiivisen reitin ensisijainen demografinen referenssi.",
      coverage: "Kaikki maat",
      frequency: "Julkaisukierroksittain",
    },
    wbFert: {
      name: "Hedelmällisyysluku (Maailmanpankki)",
      description:
        "Maailmanpankin kokonaishedelmällisyysindikaattori, joka pohjaa YK:n väestöosaston ja kansallisten tilastojen lähteisiin. Käytetään ristiintarkistuksena WPP-arvioita vasten.",
      coverage: "200+ maata",
      frequency: "Vuosittainen",
    },
    nso: {
      name: "Kansalliset tilastovirastot",
      description:
        "Maakohtaiset vitaalitilastot virastoilta kuten Tilastokeskus (Suomi), KOSIS (Etelä-Korea) ja ONS (UK). Käytetään korkeataajuiseen alle vuoden syntyvyysseurantaan.",
      coverage: "Maakohtainen",
      frequency: "Neljännesvuosittain - vuosittain",
    },
    levine: {
      name: "Siittiöpitoisuustrendien meta-analyysi",
      description:
        "Historiallinen tutkimussynteesi siittiöpitoisuuden trendeistä. Se antaa kontekstia päätepistevalinnalle, ei biologisen kapasiteetin laskukäyrää tai kansallista parametria.",
      coverage: "42 935 miestä, 185 tutkimusta",
      frequency: "Julkaistu 2017",
    },
    who: {
      name: "WHO:n siemennesteanalyysin referenssiarvot",
      description:
        "Kliiniset viitearvot siemennesteen parametreille (pitoisuus, liikkuvuus, morfologia). 6. painos julkaistu 2021. Referenssi päätepistevalinnalle ja tulevalle protokollasuunnittelulle, ei aktiivinen BERM-kalibrointiraja.",
      coverage: "Globaali kliininen standardi",
      frequency: "Julkaistu 2021",
    },
  },
  ja: {
    d1: {
      name: "携帯電話契約数",
      description:
        "人口100人あたりの携帯電話契約数。記述的コホート分析のための技術導入タイミングプロキシであり、物理的RFまたはFieldState測定値ではありません。",
      coverage: "200以上の国、1990年〜現在",
      frequency: "年次",
    },
    d2: {
      name: "モバイル接続指数",
      description:
        "インフラ展開、手頃さ、消費者の準備状況、コンテンツの利用可能性を測定する複合指数。技術普及のコンテキストとして有用ですが、曝露加重係数ではありません。",
      coverage: "170か国",
      frequency: "年次",
    },
    d3: {
      name: "国別RF電界強度調査",
      description:
        "各国の周波数当局が報告した環境RF レベル。FieldStateパネルに寄与するには、プロトコル、スペクトル、位置、校正のメタデータが必要です。",
      coverage: "国によって異なる",
      frequency: "定期的",
    },
    d4: {
      name: "Connected Nationsレポート",
      description:
        "モバイルネットワークの100メートルグリッドカバレッジと信号強度データ。空間コンテキストを提供しますが、それ自体は現場の臓器曝露やエンドポイント校正ではありません。",
      coverage: "英国",
      frequency: "年次",
    },
    o4: {
      name: "アンテナ構造物登録",
      description:
        "基地局の位置、高さ、タイプを含む登録済みアンテナ構造物。将来の測定FieldStateプロトコルの候補ソース位置コンテキストであり、現行の米国臓器曝露モデルではありません。",
      coverage: "米国",
      frequency: "継続的に更新",
    },
    wpp: {
      name: "世界人口展望",
      description:
        "年齢別出生率やTFRを含む人口推計。WPPのASFRはアクティブルートの主要な人口学的参照です。",
      coverage: "全ての国",
      frequency: "定期改訂",
    },
    wbFert: {
      name: "出生率（世界銀行）",
      description:
        "国連人口部門および各国統計に基づく世界銀行の合計特殊出生率指標。WPP推計に対するクロスチェックとして使用。",
      coverage: "200以上の国",
      frequency: "年次",
    },
    nso: {
      name: "各国統計局",
      description:
        "フィンランド統計局、KOSIS（韓国）、ONS（英国）などの機関からの国別人口動態統計。四半期ごとの出生率追跡に使用。",
      coverage: "国別",
      frequency: "四半期〜年次",
    },
    levine: {
      name: "精子濃度トレンドのメタ分析",
      description:
        "精子濃度トレンドに関する歴史的研究統合。エンドポイント選択のコンテキストを提供しますが、生物学的能力低下曲線や国家パラメータではありません。",
      coverage: "42,935人、185研究",
      frequency: "2017年公表",
    },
    who: {
      name: "WHO精液分析参照値",
      description:
        "精液パラメータ（濃度、運動性、形態）の臨床参照範囲。第6版は2021年公表。エンドポイント選択と将来のプロトコル設計のための参照であり、アクティブなBERM校正境界ではありません。",
      coverage: "世界的な臨床基準",
      frequency: "2021年公表",
    },
  },
  fr: {
    d1: {
      name: "Abonnements cellulaires mobiles",
      description:
        "Abonnements cellulaires mobiles pour 100 habitants. Un proxy de chronologie d'adoption technologique pour l'analyse de cohortes descriptive ; pas une mesure physique RF ou FieldState.",
      coverage: "200+ pays, 1990 -- présent",
      frequency: "Annuelle",
    },
    d2: {
      name: "Indice de connectivité mobile",
      description:
        "Indice composite mesurant le déploiement des infrastructures, l'accessibilité financière, la préparation des consommateurs et la disponibilité du contenu. Contexte utile pour la diffusion technologique, pas un coefficient de pondération d'exposition.",
      coverage: "170 pays",
      frequency: "Annuelle",
    },
    d3: {
      name: "Enquêtes nationales sur l'intensité du champ RF",
      description:
        "Niveaux RF ambiants mesurés rapportés par les autorités nationales du spectre. Ces observations nécessitent des métadonnées de protocole, de spectre, de localisation et d'étalonnage avant de contribuer à un panneau FieldState.",
      coverage: "Variable selon les pays",
      frequency: "Périodique",
    },
    d4: {
      name: "Rapports Connected Nations",
      description:
        "Données de couverture et d'intensité du signal par grille de 100 mètres pour les réseaux mobiles. Soutient le contexte spatial ; ne constitue pas en soi une exposition organique de terrain ou un étalonnage de critère.",
      coverage: "Royaume-Uni",
      frequency: "Annuelle",
    },
    o4: {
      name: "Registre des structures d'antennes",
      description:
        "Structures d'antennes enregistrées incluant les emplacements, hauteurs et types de tours. Contexte candidat de localisation source pour un futur protocole FieldState mesuré ; pas un modèle actif d'exposition organique américain.",
      coverage: "États-Unis",
      frequency: "Mise à jour continue",
    },
    wpp: {
      name: "Perspectives de la population mondiale",
      description:
        "Estimations démographiques incluant les taux de fécondité par âge et le TFR. L'ASFR du WPP est la référence démographique principale pour la route active.",
      coverage: "Tous les pays",
      frequency: "Révisions périodiques",
    },
    wbFert: {
      name: "Taux de fécondité (Banque mondiale)",
      description:
        "Indicateur du taux de fécondité total de la Banque mondiale, basé sur la Division de la population des Nations Unies et les sources statistiques nationales. Utilisé comme vérification croisée par rapport aux estimations WPP.",
      coverage: "200+ pays",
      frequency: "Annuelle",
    },
    nso: {
      name: "Offices nationaux de statistiques",
      description:
        "Statistiques de l'état civil spécifiques aux pays, provenant d'agences comme Statistics Finland (Tilastokeskus), KOSIS (Corée du Sud) et ONS (Royaume-Uni). Utilisées pour le suivi de la fécondité infra-annuel à haute fréquence.",
      coverage: "Spécifique au pays",
      frequency: "Trimestrielle à annuelle",
    },
    levine: {
      name: "Méta-analyse des tendances de concentration spermatique",
      description:
        "Une synthèse de recherche historique sur les tendances de la concentration spermatique. Elle fournit un contexte pour la sélection des critères, pas une courbe de déclin de capacité biologique ou un paramètre national.",
      coverage: "42 935 hommes, 185 études",
      frequency: "Publiée en 2017",
    },
    who: {
      name: "Valeurs de référence de l'analyse séminale de l'OMS",
      description:
        "Plages de référence cliniques pour les paramètres séminaux (concentration, motilité, morphologie). 6e édition publiée en 2021. Référence pour la sélection des critères et la conception future du protocole, pas une limite d'étalonnage BERM active.",
      coverage: "Standard clinique mondial",
      frequency: "Publiée en 2021",
    },
  },
  ko: {
    d1: {
      name: "이동통신 가입자 수",
      description:
        "인구 100명당 이동통신 가입자 수. 기술적 코호트 분석을 위한 기술 도입 타이밍 프록시이며, 물리적 RF 또는 FieldState 측정값이 아닙니다.",
      coverage: "200개 이상 국가, 1990년 -- 현재",
      frequency: "연간",
    },
    d2: {
      name: "모바일 연결성 지수",
      description:
        "인프라 배치, 경제성, 소비자 준비도, 콘텐츠 가용성을 측정하는 복합 지수. 기술 확산 맥락에 유용하지만 노출 가중 계수는 아닙니다.",
      coverage: "170개국",
      frequency: "연간",
    },
    d3: {
      name: "국가별 RF 전계강도 조사",
      description:
        "국가 주파수 당국이 보고한 환경 RF 수준. FieldState 패널에 기여하려면 프로토콜, 스펙트럼, 위치, 교정 메타데이터가 필요합니다.",
      coverage: "국가에 따라 상이",
      frequency: "정기적",
    },
    d4: {
      name: "Connected Nations 보고서",
      description:
        "모바일 네트워크의 100미터 그리드 커버리지 및 신호 강도 데이터. 공간적 맥락을 지원하지만, 그 자체로는 현장 장기 노출이나 종료점 교정이 아닙니다.",
      coverage: "영국",
      frequency: "연간",
    },
    o4: {
      name: "안테나 구조물 등록",
      description:
        "기지국 위치, 높이, 유형을 포함한 등록된 안테나 구조물. 향후 측정 FieldState 프로토콜을 위한 후보 소스 위치 맥락이며, 현행 미국 장기 노출 모델은 아닙니다.",
      coverage: "미국",
      frequency: "지속적 업데이트",
    },
    wpp: {
      name: "세계인구전망",
      description:
        "연령별 출산율과 TFR을 포함한 인구 추계. WPP의 ASFR은 활성 경로의 주요 인구학적 참조입니다.",
      coverage: "모든 국가",
      frequency: "정기 개정",
    },
    wbFert: {
      name: "출산율 (세계은행)",
      description:
        "UN 인구부문 및 국가 통계 자료에 기반한 세계은행 합계출산율 지표. WPP 추계에 대한 교차 검증용으로 사용.",
      coverage: "200개 이상 국가",
      frequency: "연간",
    },
    nso: {
      name: "국가통계기관",
      description:
        "핀란드 통계청(Tilastokeskus), KOSIS(한국), ONS(영국) 등의 기관에서 제공하는 국가별 인구동태통계. 고빈도 분기별 출산 추적에 사용.",
      coverage: "국가별",
      frequency: "분기 -- 연간",
    },
    levine: {
      name: "정자 농도 추세 메타분석",
      description:
        "정자 농도 추세에 관한 역사적 연구 종합. 종료점 선택의 맥락을 제공하며, 생물학적 능력 감소 곡선이나 국가 파라미터가 아닙니다.",
      coverage: "42,935명, 185개 연구",
      frequency: "2017년 발표",
    },
    who: {
      name: "WHO 정액 분석 참조값",
      description:
        "정액 파라미터(농도, 운동성, 형태)에 대한 임상 참조 범위. 제6판 2021년 발표. 종료점 선택 및 향후 프로토콜 설계를 위한 참조이며, 활성 BERM 교정 경계가 아닙니다.",
      coverage: "글로벌 임상 표준",
      frequency: "2021년 발표",
    },
  },
};

export default async function DataPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  const ds = pickCopy(dataSources, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <section className="mb-14">
        <FieldStateStatus locale={locale} />
      </section>

      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.readinessTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.readinessLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {pickCopy(READINESS_TIERS, locale).map((tier) => (
            <div key={tier.tier} className={`border ${tier.borderColor} ${tier.bgColor} rounded-lg p-5`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className={`text-base font-semibold ${tier.color}`}>{tier.tier}</h3>
                <span className="text-xs font-mono-num text-foreground-muted">{tier.status}</span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2">{tier.description}</p>
              <p className="text-xs text-foreground-muted">{d.sourcesLabel}: {tier.sources}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-foreground-muted leading-relaxed max-w-4xl italic">{d.readinessNote}</p>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.primaryTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.primaryDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D1"
            name={ds.d1.name}
            provider="ITU / World Bank"
            providerColor="#3b82f6"
            description={ds.d1.description}
            coverage={ds.d1.coverage}
            frequency={ds.d1.frequency}
            url="https://data.worldbank.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            id="D2"
            name={ds.d2.name}
            provider="GSMA Intelligence"
            providerColor="#8b5cf6"
            description={ds.d2.description}
            coverage={ds.d2.coverage}
            frequency={ds.d2.frequency}
            url="https://gsma.com/mobilefordevelopment/mci"
            urlNote={d.requiresRegistration}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.rfTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.rfDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D3"
            name={ds.d3.name}
            provider={d.variousRegulators}
            providerColor="#f59e0b"
            description={ds.d3.description}
            coverage={ds.d3.coverage}
            frequency={ds.d3.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            id="D4"
            name={ds.d4.name}
            provider="Ofcom"
            providerColor="#10b981"
            description={ds.d4.description}
            coverage={ds.d4.coverage}
            frequency={ds.d4.frequency}
            url="https://ofcom.org.uk"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.infraTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.infraDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="O4"
            name={ds.o4.name}
            provider="US FCC"
            providerColor="#ef4444"
            description={ds.o4.description}
            coverage={ds.o4.coverage}
            frequency={ds.o4.frequency}
            url="https://fcc.gov/asr"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.outcomeTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.outcomeDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name={ds.wpp.name}
            provider="UN DESA"
            providerColor="#3b82f6"
            description={ds.wpp.description}
            coverage={ds.wpp.coverage}
            frequency={ds.wpp.frequency}
            url="https://population.un.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.wbFert.name}
            provider={d.worldBankLabel}
            providerColor="#3b82f6"
            description={ds.wbFert.description}
            coverage={ds.wbFert.coverage}
            frequency={ds.wbFert.frequency}
            url="https://data.worldbank.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.nso.name}
            provider={d.variousLabel}
            providerColor="#f59e0b"
            description={ds.nso.description}
            coverage={ds.nso.coverage}
            frequency={ds.nso.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.biomarkerTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.biomarkerDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name={ds.levine.name}
            provider="Levine et al. 2017"
            providerColor="#8b5cf6"
            description={ds.levine.description}
            coverage={ds.levine.coverage}
            frequency={ds.levine.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.who.name}
            provider="WHO (6th ed.)"
            providerColor="#10b981"
            description={ds.who.description}
            coverage={ds.who.coverage}
            frequency={ds.who.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">{d.pipelineTitle}</h2>
        <SectionCard>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
            {d.pipelineFlow}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.rawData}
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-mono-num text-xs">
              berm/berm/data/
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.standardized}
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.modelInput}
            </span>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.pipelineNote}
          </p>
        </SectionCard>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{d.licensingTitle}</h2>
        <SectionCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium mb-1">{d.dataLabel}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licData}
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">{d.modelCode}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licCode}
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">{d.documentation}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licDocs}
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.dataNote}
        </p>
      </section>
    </div>
  );
}
