import type { Metadata } from "next";
import Image from "next/image";
import { Info } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type Principle = { num: string; bold: string; text: string };
type Copy = {
  title: string;
  subtitle: string;
  whatTitle: string;
  whatText: readonly string[];
  principlesTitle: string;
  principles: readonly Principle[];
  statusTitle: string;
  statusText: string;
  deepHistoryTitle: string;
  deepHistoryText: readonly string[];
  deepHistoryNote: string;
  licensingTitle: string;
  codeLabel: string;
  codeText: string;
  docsLabel: string;
  docsText: string;
  dataLabel: string;
  dataText: string;
  contributeTitle: string;
  contributeText: string;
  authorTitle: string;
  authorName: string;
  authorDegrees: readonly string[];
  authorIndependence: string;
  authorContact: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "About BERM",
    subtitle:
      "A research programme for testing a measurement-aware field-to-reproduction hypothesis without collapsing exposure, biology and demography into one score.",
    whatTitle: "What is the active BERM specification?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) is an open research model. Its active BERM v17 specification asks whether a documented physical field state can be linked, through measured organ and couple endpoints, to age-specific fertility patterns.",
      "It does not treat mobile subscriptions as an EMF dose, and it does not infer an individual biological effect from a country TFR series. The upstream Lindgren formulation is a theory-level premise that motivates testable field-state features; it is not a population-effect estimate.",
    ],
    principlesTitle: "Working principles",
    principles: [
      {
        num: "01",
        bold: "Measured inputs before calibration.",
        text: "A v2 endpoint estimate requires a documented FieldState, organ transfer, biological or couple endpoint, parameter/evidence IDs and a pre-specified mapping.",
      },
      {
        num: "02",
        bold: "Evidence is attached to the link it supports.",
        text: "A cellular, animal, in-vitro or systematic-review finding may support a bounded route segment. It is never silently promoted into a human TFR coefficient.",
      },
      {
        num: "03",
        bold: "ASFR before TFR.",
        text: "TFR is a period sum of age-specific fertility rates. Demand/opportunity, tempo and ART/live-birth delivery remain explicit demographic inputs rather than residual biology.",
      },
      {
        num: "04",
        bold: "Results are versioned and reproducible.",
        text: "The active route, evidence register and data-status rules state the measurement and interpretation conditions attached to each result.",
      },
      {
        num: "05",
        bold: "Open, adversarial testing.",
        text: "The project prioritises pre-specified measurements, sham and thermal controls, independent replication, held-out periods and publication of negative results.",
      },
    ],
    statusTitle: "Current status",
    statusText:
      "BERM v17 retains its published scalar-proxy forecasts. FieldState v2 is a separate measurement module and has no calibrated country-level route because a matched FieldState–biomarker–couple–ASFR panel has not yet been assembled.",
    deepHistoryTitle: "Deep history: why Northern Europe first?",
    deepHistoryText: [
      "Between 10,000 and 6,000 years ago, a cluster of traits co-selected in Northern European populations: blue eyes (OCA2 mutation), lactose tolerance (LCT persistence), and cattle husbandry. All three optimise the same molecule — cryptochrome — through different pathways. Blue irises transmit more short-wavelength light to retinal CRY1. Dairy-derived riboflavin (B2) sustains the FAD chromophore that CRY requires for magnetic sensitivity. Cattle husbandry provided the selective pressure for both.",
      "BERM formalises this as the Northern Package: a population-level biological χ profile that amplifies coupling to electromagnetic fields. The nested χ model describes five scales — molecular, optical, cellular, environmental, population — each governed by the same selection-rule function χ. When χ_env was near zero (pre-electrification), high biological χ was invisible. As electrification rose, the most biologically coupled population was the first to show fertility decline below replacement.",
      "This framework generates falsifiable predictions: populations with high biological χ profiles (Scandinavian-origin) should show steeper TFR decline at equivalent EMF exposure than populations with low profiles (Sub-Saharan African-origin). The Amish–Mennonite gradient and the COVID work-from-home baby bump provide natural experiments.",
    ],
    deepHistoryNote: "The Northern Package hypothesis is rated L* (speculative). OCA2 + LCT co-selection is established (E-level); the cryptochrome interpretation is the novel, testable extension.",
    licensingTitle: "Licensing and data",
    codeLabel: "Code:",
    codeText: "MIT License. Use, modify and distribute the model code under the license terms.",
    docsLabel: "Documentation:",
    docsText: "CC BY-4.0 unless a source page states otherwise.",
    dataLabel: "Data:",
    dataText: "Third-party datasets retain their own licences and provenance. Derived tables label their source and intended analytical use.",
    contributeTitle: "Contribute or challenge the model",
    contributeText:
      "Useful contributions include measurement datasets with provenance, endpoint studies, source corrections, preregistered replications, competing causal models and code review. Please report both supporting and non-supporting results.",
    authorTitle: "Author",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc Biomedicine, Bioscience and Society — London School of Economics",
      "BA Political Science — University of Helsinki",
    ],
    authorIndependence: "Independent researcher. No university affiliation, no industry funding, no grant obligations.",
    authorContact: "Contact: otto.o.juote@proton.me",
  },
  fi: {
    title: "Tietoa BERM:stä",
    subtitle:
      "Tutkimusohjelma, joka testaa mittaustietoista kenttä–lisääntyminen-hypoteesia tiivistämättä altistusta, biologiaa ja demografiaa yhdeksi luvuksi.",
    whatTitle: "Mikä on BERM:n aktiivinen määrittely?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) on avoin tutkimusmalli. Sen aktiivinen BERM v17-määrittely kysyy, voidaanko dokumentoitu fysikaalinen kenttätila yhdistää mitattujen elin- ja paripäätepisteiden kautta ikäkohtaisten hedelmällisyyslukujen kehitykseen.",
      "Se ei käsittele mobiililiittymiä EMF-annoksena eikä päättele yksilön biologista vaikutusta maan TFR-sarjasta. Edeltävä Lindgren-muotoilu on teoriatason premissi, joka motivoi testattavia FieldState-piirteitä; se ei ole väestövaikutusarvio.",
    ],
    principlesTitle: "Toimintaperiaatteet",
    principles: [
      {
        num: "01",
        bold: "Mitatut syötteet ennen kalibrointia.",
        text: "V2:n päätepistearvio edellyttää dokumentoitua FieldStatea, elinkohtaista siirtoa, biologista tai paripäätepistettä, parametri-/evidence-ID:tä ja ennalta määriteltyä vastaavuuskuvausta.",
      },
      {
        num: "02",
        bold: "Näyttö kiinnitetään sitä tukevaan lenkkiin.",
        text: "Solu-, eläin-, in-vitro- tai systemaattisen katsauksen löydös voi tukea rajattua reittisegmenttiä. Sitä ei hiljaisesti ylennetä ihmisen TFR-kertoimeksi.",
      },
      {
        num: "03",
        bold: "ASFR ennen TFR:ää.",
        text: "TFR on ikäkohtaisten hedelmällisyyslukujen periodisumma. Kysyntä/mahdollisuus, tempo ja ART-syntymätoimitus säilyvät nimenomaisina demografisina syötteinä, eivät biologian residuaaleina.",
      },
      {
        num: "04",
        bold: "Tulokset ovat versioituja ja toistettavia.",
        text: "Aktiivinen reitti, näyttörekisteri ja datatilan säännöt kertovat kuhunkin tulokseen liitetyt mittaus- ja tulkintaehdot.",
      },
      {
        num: "05",
        bold: "Avoin, kriittinen testaaminen.",
        text: "Projekti priorisoi ennalta määriteltyjä mittauksia, lume- ja lämpökontrolleja, riippumatonta replikaatiota, sovituksen ulkopuolelle jätettyjä jaksoja ja negatiivisten tulosten julkaisemista.",
      },
    ],
    statusTitle: "Nykytila",
    statusText:
      "BERM v17 säilyttää julkaistut skalaariproxyennusteensa. FieldState v2 on erillinen mittausmoduuli, jolla ei ole kalibroitua maakohtaista reittiä, koska kohdistettua FieldState–biomarkkeri–pari–ASFR-paneelia ei ole vielä koottu.",
    deepHistoryTitle: "Syvähistoria: miksi Pohjois-Eurooppa ensin?",
    deepHistoryText: [
      "Noin 10 000–6 000 vuotta sitten pohjoiseuroppalaisiin populaatioihin koselektoitui piirteiden klusteri: siniset silmät (OCA2-mutaatio), laktoosinsietokyky (LCT-persistenssi) ja karjankasvatus. Kaikki kolme optimoivat saman molekyylin — kryptokromin — eri reittien kautta. Siniset iirikset läpäisevät enemmän lyhytaaltoista valoa verkkokalvon CRY1:lle. Maitotuotteista saatava riboflaviini (B2) ylläpitää FAD-kromofooria, jota CRY tarvitsee magneettiseen herkkyyteen. Karjankasvatus tarjosi valintapaineen molemmille.",
      "BERM formalisoi tämän Pohjoisena pakettina: populaatiotason biologinen χ-profiili, joka vahvistaa kytkentää sähkömagneettisiin kenttiin. Sisäkkäinen χ-malli kuvaa viisi skaalaa — molekulaarinen, optinen, solu-, ympäristö- ja populaatiotaso — joista kutakin hallitsee sama valintasääntöfunktio χ. Kun χ_env oli lähellä nollaa (ennen sähköistämistä), korkea biologinen χ oli näkymätön. Sähköistämisen kasvaessa biologisesti kytkentäisin populaatio oli ensimmäinen, joka osoitti hedelmällisyyslaskun korvaavuustason alle.",
      "Tämä viitekehys tuottaa falsifioitavia ennusteita: populaatioiden, joilla on korkeat biologiset χ-profiilit (skandinaavisperäiset), pitäisi osoittaa jyrkempää TFR-laskua vastaavalla EMF-altistuksella kuin populaatioiden, joilla on matalat profiilit (Saharan eteläpuoleiset afrikkalaisperäiset). Amish–mennoniittigradientti ja COVID-etätyön baby bump tarjoavat luonnollisia kokeita.",
    ],
    deepHistoryNote: "Pohjoinen paketti -hypoteesi on arvioitu tasolle L* (spekulatiivinen). OCA2 + LCT -koselektio on vakiintunut (E-taso); kryptokromitulkinta on uusi, testattava laajennus.",
    licensingTitle: "Lisensointi ja data",
    codeLabel: "Koodi:",
    codeText: "MIT-lisenssi. Mallikoodia voi käyttää, muokata ja jakaa lisenssin ehtojen mukaisesti.",
    docsLabel: "Dokumentaatio:",
    docsText: "CC BY-4.0, ellei lähdesivu toisin ilmoita.",
    dataLabel: "Data:",
    dataText: "Kolmannen osapuolen datasetit säilyttävät omat lisenssinsä ja provenienssinsa. Johdetut taulukot kertovat lähteensä ja tarkoitetun analyyttisen käytön.",
    contributeTitle: "Osallistu tai haasta malli",
    contributeText:
      "Hyödyllisiä panoksia ovat mittausaineistot alkuperätietoineen, päätepistetutkimukset, lähdekorjaukset, ennakkorekisteröidyt replikaatiot, kilpailevat kausaalimallit ja koodikatselmointi. Raportoi sekä tukevat että ei-tukevat tulokset.",
    authorTitle: "Tekijä",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc Biomedicine, Bioscience and Society — London School of Economics",
      "VTK Yleinen valtio-oppi — Helsingin yliopisto",
    ],
    authorIndependence: "Itsenäinen tutkija. Ei yliopistosidonnaisuutta, ei teollisuusrahoitusta, ei apurahavelvoitteita.",
    authorContact: "Yhteydenotto: otto.o.juote@proton.me",
  },
  ja: {
    title: "BERMについて",
    subtitle:
      "曝露・生物学・人口統計学を単一のスコアに統合せず、測定に基づくフィールド対生殖仮説を検証する研究プログラム。",
    whatTitle: "BERMの現行仕様とは？",
    whatText: [
      "BERM（Bio-Electromagnetic Reproductive Model）はオープンな研究モデルです。現行のBERM v17仕様は、文書化された物理的フィールド状態が、測定された臓器およびカップルのエンドポイントを通じて、年齢別出生率パターンに関連付けられるかどうかを問います。",
      "携帯電話の契約数をEMF線量として扱わず、国のTFR時系列から個人の生物学的影響を推測しません。上流のLindgren定式化は、検証可能なFieldState特徴を動機づける理論レベルの前提であり、集団影響の推定値ではありません。",
    ],
    principlesTitle: "活動原則",
    principles: [
      {
        num: "01",
        bold: "キャリブレーション前の測定入力。",
        text: "v2エンドポイント推定には、文書化されたFieldState、臓器移行、生物学的またはカップルのエンドポイント、パラメータ/エビデンスID、および事前に指定されたマッピングが必要です。",
      },
      {
        num: "02",
        bold: "エビデンスはそれが支持するリンクに付与される。",
        text: "細胞、動物、in vitro、またはシステマティックレビューの知見は、限定されたルートセグメントを支持し得ます。ヒトのTFR係数に暗黙的に昇格されることはありません。",
      },
      {
        num: "03",
        bold: "TFRの前にASFR。",
        text: "TFRは年齢別出生率の期間合計です。需要/機会、テンポ、ART/出生分娩は、残余の生物学ではなく、明示的な人口統計学的入力として残ります。",
      },
      {
        num: "04",
        bold: "結果はバージョン管理され再現可能。",
        text: "アクティブルート、エビデンスレジスター、データステータスルールは、各結果に付随する測定条件と解釈条件を示します。",
      },
      {
        num: "05",
        bold: "オープンで対抗的なテスト。",
        text: "プロジェクトは、事前指定された測定、偽刺激および熱制御、独立した再現、保留期間、および否定的結果の公表を優先します。",
      },
    ],
    statusTitle: "現在の状況",
    statusText:
      "BERM v17は公開済みのスカラープロキシ予測を保持します。FieldState v2は別個の測定モジュールであり、対応するFieldState–バイオマーカー–カップル–ASFRパネルが未構成のため、校正済み国別ルートはありません。",
    deepHistoryTitle: "深い歴史：なぜ北ヨーロッパが最初なのか？",
    deepHistoryText: [
      "約10,000年前から6,000年前の間に、北ヨーロッパの集団で形質のクラスターが共選択されました：青い目（OCA2変異）、乳糖耐性（LCT持続性）、牧畜。3つすべてが同じ分子——クリプトクロム——を異なる経路で最適化します。青い虹彩はより多くの短波長光を網膜のCRY1に透過させます。乳製品由来のリボフラビン（B2）は、CRYが磁気感受性に必要とするFAD発色団を維持します。牧畜がその両方に対する選択圧を提供しました。",
      "BERMはこれをNorthern Packageとして定式化します：電磁場への結合を増幅する集団レベルの生物学的χプロファイルです。入れ子のχモデルは5つのスケールを記述します——分子、光学、細胞、環境、集団——それぞれが同じ選択則関数χによって支配されます。χ_envがゼロに近かった時（電化以前）、高い生物学的χは不可視でした。電化が進むにつれて、生物学的に最も結合した集団が、出生率の置換水準以下への低下を最初に示しました。",
      "この枠組みは反証可能な予測を生成します：高い生物学的χプロファイルを持つ集団（スカンジナビア起源）は、同等のEMF曝露において、低いプロファイルを持つ集団（サハラ以南アフリカ起源）よりも急峻なTFR低下を示すはずです。Amish–Mennonite勾配とCOVID在宅勤務ベビーブームは自然実験を提供します。",
    ],
    deepHistoryNote: "Northern Package仮説はL*（推測的）と評価されています。OCA2 + LCT共選択は確立されています（Eレベル）；クリプトクロム解釈は新規の検証可能な拡張です。",
    licensingTitle: "ライセンスとデータ",
    codeLabel: "コード：",
    codeText: "MITライセンス。ライセンス条項に基づき、モデルコードを使用、変更、配布できます。",
    docsLabel: "ドキュメント：",
    docsText: "ソースページに別途記載がない限りCC BY-4.0。",
    dataLabel: "データ：",
    dataText: "サードパーティのデータセットは独自のライセンスと来歴を保持します。派生テーブルにはソースと意図された分析用途が記載されています。",
    contributeTitle: "モデルへの貢献または挑戦",
    contributeText:
      "有用な貢献には、来歴を伴う測定データセット、エンドポイント研究、ソース修正、事前登録された再現、競合する因果モデル、コードレビューが含まれます。支持する結果と支持しない結果の両方を報告してください。",
    authorTitle: "著者",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc 生物医学・バイオサイエンスと社会 — London School of Economics",
      "BA 政治学 — University of Helsinki",
    ],
    authorIndependence: "独立研究者。大学所属なし、産業資金なし、助成金義務なし。",
    authorContact: "連絡先: otto.o.juote@proton.me",
  },
  fr: {
    title: "À propos de BERM",
    subtitle:
      "Un programme de recherche visant à tester une hypothèse champ-reproduction tenant compte des mesures, sans réduire l'exposition, la biologie et la démographie en un score unique.",
    whatTitle: "Quelle est la spécification BERM active ?",
    whatText: [
      "BERM (Bio-Electromagnetic Reproductive Model) est un modèle de recherche ouvert. Sa spécification active BERM v17 examine si un état de champ physique documenté peut être relié, via des endpoints d'organes et de couples mesurés, aux schémas de fécondité par âge.",
      "Il ne traite pas les abonnements mobiles comme une dose d'EMF et n'infère pas un effet biologique individuel à partir d'une série TFR nationale. La formulation Lindgren en amont est une prémisse de niveau théorique qui motive des caractéristiques FieldState testables ; ce n'est pas une estimation d'effet populationnel.",
    ],
    principlesTitle: "Principes de travail",
    principles: [
      {
        num: "01",
        bold: "Entrées mesurées avant calibration.",
        text: "Une estimation d'endpoint v2 requiert un FieldState documenté, un transfert d'organe, un endpoint biologique ou de couple, des identifiants paramètre/preuve et un mapping pré-spécifié.",
      },
      {
        num: "02",
        bold: "La preuve est rattachée au lien qu'elle soutient.",
        text: "Une découverte cellulaire, animale, in vitro ou de revue systématique peut soutenir un segment de route délimité. Elle n'est jamais promue silencieusement en coefficient TFR humain.",
      },
      {
        num: "03",
        bold: "ASFR avant TFR.",
        text: "Le TFR est une somme périodique des taux de fécondité par âge. La demande/opportunité, le tempo et la livraison ART/naissance vivante restent des entrées démographiques explicites plutôt qu'une biologie résiduelle.",
      },
      {
        num: "04",
        bold: "Les résultats sont versionnés et reproductibles.",
        text: "La route active, le registre des preuves et les règles de statut des données indiquent les conditions de mesure et d'interprétation attachées à chaque résultat.",
      },
      {
        num: "05",
        bold: "Tests ouverts et contradictoires.",
        text: "Le projet privilégie les mesures pré-spécifiées, les contrôles fictifs et thermiques, la réplication indépendante, les périodes retenues et la publication des résultats négatifs.",
      },
    ],
    statusTitle: "Statut actuel",
    statusText:
      "BERM v17 conserve ses prévisions publiées par proxy scalaire. FieldState v2 est un module de mesure distinct sans route nationale calibrée, car aucun panel apparié FieldState–biomarqueur–couple–ASFR n’a encore été assemblé.",
    deepHistoryTitle: "Histoire profonde : pourquoi l'Europe du Nord en premier ?",
    deepHistoryText: [
      "Entre 10 000 et 6 000 ans, un ensemble de traits a été co-sélectionné dans les populations d'Europe du Nord : les yeux bleus (mutation OCA2), la tolérance au lactose (persistance LCT) et l'élevage bovin. Tous trois optimisent la même molécule — le cryptochrome — par des voies différentes. Les iris bleus transmettent davantage de lumière à courte longueur d'onde au CRY1 rétinien. La riboflavine (B2) d'origine laitière maintient le chromophore FAD dont CRY a besoin pour la sensibilité magnétique. L'élevage bovin a fourni la pression sélective pour les deux.",
      "BERM formalise ceci comme le Northern Package : un profil biologique χ au niveau populationnel qui amplifie le couplage aux champs électromagnétiques. Le modèle χ emboîté décrit cinq échelles — moléculaire, optique, cellulaire, environnementale, populationnelle — chacune gouvernée par la même fonction de règle de sélection χ. Lorsque χ_env était proche de zéro (pré-électrification), un χ biologique élevé était invisible. À mesure que l'électrification augmentait, la population la plus biologiquement couplée a été la première à montrer un déclin de la fécondité en dessous du seuil de remplacement.",
      "Ce cadre génère des prédictions falsifiables : les populations avec des profils χ biologiques élevés (d'origine scandinave) devraient montrer un déclin TFR plus prononcé à exposition EMF équivalente que les populations avec des profils bas (d'origine subsaharienne africaine). Le gradient Amish–Mennonite et le baby bump du télétravail COVID fournissent des expériences naturelles.",
    ],
    deepHistoryNote: "L'hypothèse du Northern Package est classée L* (spéculative). La co-sélection OCA2 + LCT est établie (niveau E) ; l'interprétation cryptochrome est l'extension nouvelle et testable.",
    licensingTitle: "Licences et données",
    codeLabel: "Code :",
    codeText: "Licence MIT. Utilisez, modifiez et distribuez le code du modèle selon les termes de la licence.",
    docsLabel: "Documentation :",
    docsText: "CC BY-4.0 sauf indication contraire sur la page source.",
    dataLabel: "Données :",
    dataText: "Les jeux de données tiers conservent leurs propres licences et provenance. Les tables dérivées indiquent leur source et l'utilisation analytique prévue.",
    contributeTitle: "Contribuer ou contester le modèle",
    contributeText:
      "Les contributions utiles comprennent les jeux de données de mesure avec provenance, les études d'endpoints, les corrections de sources, les réplications pré-enregistrées, les modèles causaux concurrents et la revue de code. Veuillez rapporter tant les résultats favorables que défavorables.",
    authorTitle: "Auteur",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc Biomédecine, Bioscience et Société — London School of Economics",
      "BA Sciences politiques — University of Helsinki",
    ],
    authorIndependence: "Chercheur indépendant. Aucune affiliation universitaire, aucun financement industriel, aucune obligation de subvention.",
    authorContact: "Contact : otto.o.juote@proton.me",
  },
  ko: {
    title: "BERM에 대하여",
    subtitle:
      "노출, 생물학, 인구통계학을 단일 점수로 축소하지 않고 측정 기반 전자기장-생식 가설을 검증하는 연구 프로그램.",
    whatTitle: "현행 BERM 사양이란?",
    whatText: [
      "BERM(Bio-Electromagnetic Reproductive Model)은 개방형 연구 모델입니다. 현행 BERM v17 사양은 문서화된 물리적 전자기장 상태가 측정된 장기 및 커플 종점을 통해 연령별 출산율 패턴과 연결될 수 있는지를 검토합니다.",
      "이동통신 가입 건수를 EMF 선량으로 취급하지 않으며, 국가 TFR 시계열로부터 개인의 생물학적 효과를 추론하지 않습니다. 상위 Lindgren 공식화는 검증 가능한 FieldState 특성을 제시하는 이론 수준의 전제이며, 인구 효과 추정치가 아닙니다.",
    ],
    principlesTitle: "활동 원칙",
    principles: [
      {
        num: "01",
        bold: "보정 전 측정 입력.",
        text: "v2 종점 추정에는 문서화된 FieldState, 장기 전달, 생물학적 또는 커플 종점, 파라미터/근거 ID 및 사전 지정된 매핑이 필요합니다.",
      },
      {
        num: "02",
        bold: "근거는 그것이 뒷받침하는 연결에 부여된다.",
        text: "세포, 동물, in vitro 또는 체계적 리뷰 소견은 한정된 경로 세그먼트를 뒷받침할 수 있습니다. 인간 TFR 계수로 암묵적으로 승격되지 않습니다.",
      },
      {
        num: "03",
        bold: "TFR 전에 ASFR.",
        text: "TFR은 연령별 출산율의 기간 합계입니다. 수요/기회, 템포, ART/생아 분만은 잔여 생물학이 아닌 명시적 인구통계학적 입력으로 유지됩니다.",
      },
      {
        num: "04",
        bold: "결과는 버전 관리되며 재현 가능하다.",
        text: "활성 경로, 근거 레지스터, 데이터 상태 규칙은 각 결과에 부여된 측정 및 해석 조건을 명시합니다.",
      },
      {
        num: "05",
        bold: "개방적이고 대항적인 검증.",
        text: "프로젝트는 사전 지정된 측정, 허위 및 열 대조, 독립적 재현, 보류 기간, 부정적 결과의 공표를 우선합니다.",
      },
    ],
    statusTitle: "현재 상태",
    statusText:
      "BERM v17은 공개된 스칼라 프록시 예측을 유지합니다. FieldState v2는 별도의 측정 모듈이며, 매칭된 FieldState–바이오마커–커플–ASFR 패널이 아직 없어 보정된 국가 경로가 없습니다.",
    deepHistoryTitle: "심층 역사: 왜 북유럽이 먼저인가?",
    deepHistoryText: [
      "약 10,000년에서 6,000년 전 사이에 북유럽 인구에서 형질 군집이 공동 선택되었습니다: 파란 눈(OCA2 돌연변이), 유당 내성(LCT 지속성), 축산업. 세 가지 모두 동일한 분자——크립토크롬——을 서로 다른 경로를 통해 최적화합니다. 파란 홍채는 더 많은 단파장 빛을 망막의 CRY1에 투과시킵니다. 유제품 유래 리보플라빈(B2)은 CRY가 자기 감수성에 필요로 하는 FAD 발색단을 유지합니다. 축산업은 이 둘 모두에 대한 선택 압력을 제공했습니다.",
      "BERM은 이를 Northern Package로 공식화합니다: 전자기장에 대한 결합을 증폭하는 인구 수준의 생물학적 χ 프로파일입니다. 중첩된 χ 모델은 다섯 가지 척도를 기술합니다——분자, 광학, 세포, 환경, 인구——각각 동일한 선택 규칙 함수 χ에 의해 지배됩니다. χ_env가 0에 가까웠을 때(전기화 이전), 높은 생물학적 χ는 보이지 않았습니다. 전기화가 증가함에 따라 생물학적으로 가장 강하게 결합된 인구가 대체 수준 이하로의 출산율 감소를 가장 먼저 나타냈습니다.",
      "이 프레임워크는 반증 가능한 예측을 생성합니다: 높은 생물학적 χ 프로파일을 가진 인구(스칸디나비아 기원)는 동등한 EMF 노출에서 낮은 프로파일을 가진 인구(사하라 이남 아프리카 기원)보다 더 가파른 TFR 감소를 보여야 합니다. Amish–Mennonite 기울기와 COVID 재택근무 베이비 붐은 자연 실험을 제공합니다.",
    ],
    deepHistoryNote: "Northern Package 가설은 L*(추측적)로 평가됩니다. OCA2 + LCT 공동 선택은 확립되었습니다(E 수준); 크립토크롬 해석은 새로운 검증 가능한 확장입니다.",
    licensingTitle: "라이선스 및 데이터",
    codeLabel: "코드:",
    codeText: "MIT 라이선스. 라이선스 조건에 따라 모델 코드를 사용, 수정, 배포할 수 있습니다.",
    docsLabel: "문서:",
    docsText: "소스 페이지에 별도의 명시가 없는 한 CC BY-4.0.",
    dataLabel: "데이터:",
    dataText: "서드파티 데이터셋은 자체 라이선스와 출처를 유지합니다. 파생 테이블은 출처와 의도된 분석 용도를 표기합니다.",
    contributeTitle: "모델에 기여하거나 도전하기",
    contributeText:
      "유용한 기여에는 출처가 포함된 측정 데이터셋, 종점 연구, 출처 수정, 사전 등록된 재현, 경쟁 인과 모델, 코드 리뷰가 포함됩니다. 지지하는 결과와 지지하지 않는 결과 모두를 보고해 주십시오.",
    authorTitle: "저자",
    authorName: "Otto Juote",
    authorDegrees: [
      "MSc 생의학, 바이오사이언스와 사회 — London School of Economics",
      "BA 정치학 — University of Helsinki",
    ],
    authorIndependence: "독립 연구자. 대학 소속 없음, 산업 자금 없음, 보조금 의무 없음.",
    authorContact: "연락처: otto.o.juote@proton.me",
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Info} title={d.title} subtitle={d.subtitle} />

      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">{d.whatTitle}</h2>
          <div className="space-y-3 text-foreground-muted leading-relaxed">
            {d.whatText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.principlesTitle}</h2>
          <ul className="space-y-4 text-foreground-muted leading-relaxed">
            {d.principles.map((principle) => (
              <li key={principle.num} className="flex gap-3">
                <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">{principle.num}</span>
                <div><strong className="text-foreground">{principle.bold}</strong> {principle.text}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.statusTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.statusText}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.deepHistoryTitle}</h2>
          <div className="space-y-3 text-foreground-muted leading-relaxed">
            {d.deepHistoryText.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
          <p className="mt-4 text-xs text-foreground-muted/70 italic leading-relaxed border-l-2 border-accent/30 pl-3">{d.deepHistoryNote}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.licensingTitle}</h2>
          <div className="space-y-2 text-foreground-muted leading-relaxed">
            <p><strong className="text-foreground">{d.codeLabel}</strong> {d.codeText}</p>
            <p><strong className="text-foreground">{d.docsLabel}</strong> {d.docsText}</p>
            <p><strong className="text-foreground">{d.dataLabel}</strong> {d.dataText}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.contributeTitle}</h2>
          <p className="text-foreground-muted leading-relaxed">{d.contributeText}</p>
          <p className="mt-3 text-foreground-muted leading-relaxed">
            <a href="https://github.com/joetuotto/extinctionfield" className="text-accent hover:text-accent-hover transition-colors" target="_blank" rel="noopener noreferrer">github.com/joetuotto/extinctionfield</a>
          </p>
        </section>

        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-semibold mb-4">{d.authorTitle}</h2>
          <div className="flex gap-6 items-start">
            <Image
              src="/images/otto-juote.png"
              alt="Otto Juote"
              width={96}
              height={96}
              className="rounded-full object-cover shrink-0 grayscale"
            />
            <div className="space-y-3">
              <p className="text-lg font-medium">{d.authorName}</p>
              <ul className="space-y-1 text-sm text-foreground-muted">
                {d.authorDegrees.map((deg) => <li key={deg}>{deg}</li>)}
              </ul>
              <p className="text-sm text-foreground-muted leading-relaxed">{d.authorIndependence}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {d.authorContact.split("otto.o.juote@proton.me")[0]}
                <a href="mailto:otto.o.juote@proton.me" className="text-accent hover:underline">otto.o.juote@proton.me</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
