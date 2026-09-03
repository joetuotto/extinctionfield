import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type Section = { title: string; text: readonly string[]; items?: readonly string[] };
type Copy = {
  title: string;
  subtitle: string;
  introduction: readonly string[];
  sections: readonly Section[];
  outcomeTitle: string;
  outcomeText: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "Laboratory FieldState replication protocol",
    subtitle:
      "A preregistered way to test whether measured laboratory field conditions moderate a defined biological experiment — without assuming that they explain the wider replication literature.",
    introduction: [
      "This protocol uses a laboratory FieldState record to describe the physical conditions of a direct, blinded comparison. The candidate moderator is the measured field condition, not the record itself.",
      "Its goal is modest and discriminating: establish whether a documented difference in measured physical field conditions changes a pre-specified endpoint under otherwise matched experimental conditions.",
    ],
    sections: [
      {
        title: "1. Design a matched comparison",
        text: [
          "Use at least two independently characterised environments or exposure chambers: a reference/sham condition and an active condition. Randomise samples or animals across runs and blind endpoint assessment wherever practical.",
          "Do not describe either arm as “EMF-free”. The comparison must report what is measured in each arm, including residual fields and uncertainty.",
        ],
      },
      {
        title: "2. Measure the full experimental environment",
        text: [
          "Record calibrated field measurements before, during and after each biological run: relevant bands, low-frequency components, B₀ vector where relevant, orientation, time series/PSD, source configuration, temperature, humidity, vibration, light and airflow.",
          "If shielding is used, characterise its side effects. Shielding can alter temperature stability, ventilation, acoustic environment, static fields and handling; those changes need matched controls rather than being attributed to a field difference by default.",
        ],
      },
      {
        title: "3. Pre-specify a close endpoint",
        text: [
          "Choose an endpoint that corresponds to a registered link: for example calcium/ROS dynamics, a barrier tight-junction measure, sperm function, oocyte redox or a circadian marker. Define collection time, transformations, exclusions and the primary contrast before unblinding.",
          "A rescue or blocker arm can test mediation but cannot substitute for a sham-controlled physical contrast. A national fertility series is not a laboratory endpoint.",
        ],
      },
      {
        title: "4. Analyse the FieldState contrast, not an assumed scalar",
        text: [
          "Report the observed differences in the named FieldState features and their uncertainty. Test the primary endpoint against the preregistered contrast; treat secondary spectral, orientation and timing analyses as exploratory unless they were prespecified.",
          "Repeat the protocol in an independent laboratory and, where possible, with a second instrument chain. The protocol does not predict a fixed fold-change: the magnitude is an empirical question.",
        ],
      },
      {
        title: "5. Release an auditable package",
        text: [
          "Publish the preregistration, raw or access-controlled raw field recordings, calibration certificates, chamber logs, biological data, analysis code, randomisation/blinding record, deviations and null results.",
          "Classify input quality as partial or measurement-ready FieldState data. Measurement-ready data still require replication and an independently interpretable endpoint before they can inform an organ-state mapping.",
        ],
      },
    ],
    outcomeTitle: "What either result would mean",
    outcomeText:
      "A reproducible null result under a well-characterised FieldState contrast would constrain the proposed link for that system and protocol. A reproducible difference would motivate mechanism and dose/geometry work; it would not by itself establish a human reproductive or population-TFR effect. Both outcomes are informative and should be published.",
  },
  fi: {
    title: "Laboratorion FieldState-replikaatioprotokolla",
    subtitle:
      "Ennakkorekisteröity tapa testata, moderovatko mitatut laboratorio-olosuhteet määriteltyä biologista koetta — olettamatta, että ne selittäisivät laajemman replikaatiokirjallisuuden.",
    introduction: [
      "Protokolla käyttää laboratorion FieldState-tietuetta suoran, sokkoutetun vertailun fysikaalisten olosuhteiden kuvaamiseen. Ehdokasmoderaattori on mitattu kenttätila, ei sitä kuvaava tietue.",
      "Tavoite on rajattu ja erottava: selvitetään, muuttaako dokumentoitu ero mitatuissa fysikaalisissa kenttäolosuhteissa ennalta määriteltyä päätepistettä muilta osin vastaavissa koeolosuhteissa.",
    ],
    sections: [
      {
        title: "1. Suunnittele yhteensovitettu vertailu",
        text: [
          "Käytä vähintään kahta toisistaan riippumattomasti luonnehdittua ympäristöä tai altistuskammiota: referenssi-/sham-ehtoa ja aktiivista ehtoa. Satunnaista näytteet tai eläimet ajoihin ja sokkouta päätepisteen arviointi aina kun käytännöllistä.",
          "Älä kuvaa kumpaakaan haaraa “EMF-vapaaksi”. Vertailun on raportoitava kummassakin haarassa mitattu tilanne, mukaan lukien jäännöskentät ja epävarmuus.",
        ],
      },
      {
        title: "2. Mittaa koko koe-ympäristö",
        text: [
          "Tallenna kalibroidut kenttämittaukset ennen jokaista biologista ajoa, sen aikana ja sen jälkeen: relevantit kaistat, matalataajuiset komponentit, tarvittaessa B₀-vektori, orientaatio, aikasarja/PSD, lähdekonfiguraatio, lämpötila, kosteus, värähtely, valo ja ilmavirta.",
          "Jos käytetään suojausta, luonnehtii sen sivuvaikutukset. Suojaus voi muuttaa lämpövakautta, ilmanvaihtoa, ääniympäristöä, staattisia kenttiä ja käsittelyä; muutokset tarvitsevat sovitetut kontrollit, eikä niitä oleteta kenttäeron seuraukseksi.",
        ],
      },
      {
        title: "3. Määrittele lähellä oleva päätepiste ennakolta",
        text: [
          "Valitse rekisteröityä lenkkiä vastaava päätepiste: esimerkiksi kalsium-/ROS-dynamiikka, esteen tight-junction-mittari, siittiötoiminto, oosyytin redox tai vuorokausimarkkeri. Määrittele keräysaika, muunnokset, poissulut ja ensisijainen kontrasti ennen sokkoutuksen purkua.",
          "Rescue- tai salpaajahaara voi testata mediaatiota, mutta se ei korvaa sham-kontrolloitua fysikaalista kontrastia. Kansallinen hedelmällisyyssarja ei ole laboratorion päätepiste.",
        ],
      },
      {
        title: "4. Analysoi FieldState-kontrasti, ei oletettua skalaaria",
        text: [
          "Raportoi nimettyjen FieldState-piirteiden havaitut erot ja niiden epävarmuus. Testaa ensisijainen päätepiste ennakkorekisteröityä kontrastia vasten; käsittele toissijaisia spektri-, orientaatio- ja ajoitusanalyysejä alustavina, ellei niitä rekisteröity ennakolta.",
          "Toista protokolla riippumattomassa laboratoriossa ja mahdollisuuksien mukaan toisella instrumenttiketjulla. Protokolla ei ennusta kiinteää kertavaikutusta: vaikutuksen koko on empiirinen kysymys.",
        ],
      },
      {
        title: "5. Julkaise auditoitava paketti",
        text: [
          "Julkaise ennakkorekisteröinti, raaka- tai pääsykontrolloidut raakakenttätallenteet, kalibrointisertifikaatit, kammiolokit, biologinen data, analyysikoodi, satunnaistus-/sokkoutustieto, poikkeamat ja nollatulokset.",
          "Luokittele syötteen laatu osittaiseksi tai mittausvalmiiksi FieldState-dataksi. Mittausvalmis data vaatii silti replikaation ja itsenäisesti tulkittavan päätepisteen ennen kuin se voi tukea elintilan kartoitusta.",
        ],
      },
    ],
    outcomeTitle: "Mitä kumpikin tulos tarkoittaisi",
    outcomeText:
      "Toistettava nollatulos hyvin luonnehditussa FieldState-kontrastissa rajoittaisi ehdotettua lenkkiä kyseisessä järjestelmässä ja protokollassa. Toistettava ero motivoisi mekanismi- ja annos/geometriatyötä; se ei yksin osoittaisi ihmisen lisääntymis- tai väestö-TFR-vaikutusta. Molemmat tulokset ovat informatiivisia ja ne tulee julkaista.",
  },
  ja: {
    title: "実験室FieldState再現プロトコル",
    subtitle:
      "測定された実験室の場の条件が定義された生物学的実験を修飾するかどうかをテストするための事前登録された方法 — より広範な再現性の文献を説明すると仮定することなく。",
    introduction: [
      "このプロトコルは、実験室のFieldState記録を用いて、直接的な盲検比較の物理条件を記述する。候補修飾因子は測定された場条件であり、記録自体ではない。",
      "その目標は限定的かつ弁別的である：測定された物理的場条件の文書化された差が、他の条件を一致させた実験で事前指定エンドポイントを変化させるかを確立する。",
    ],
    sections: [
      {
        title: "1. マッチド比較を設計する",
        text: [
          "少なくとも2つの独立に特性評価された環境または曝露チャンバーを使用します：基準/シャム条件とアクティブ条件。サンプルまたは動物を実験間でランダム化し、可能な限りエンドポイント評価を盲検化します。",
          "どちらの群も「EMFフリー」と記載しないでください。比較は各群で測定されたもの（残留場と不確実性を含む）を報告する必要があります。",
        ],
      },
      {
        title: "2. 実験環境全体を測定する",
        text: [
          "各生物学的実験の前、中、後に較正された場の測定を記録します：関連する帯域、低周波成分、関連する場合はB₀ベクトル、方向、時系列/PSD、ソース構成、温度、湿度、振動、光、気流。",
          "遮蔽を使用する場合、その副作用を特性評価してください。遮蔽は温度安定性、換気、音響環境、静的場、取り扱いを変化させる可能性があります。それらの変化には一致した対照が必要であり、デフォルトで場の違いに帰属させるべきではありません。",
        ],
      },
      {
        title: "3. 近接エンドポイントを事前指定する",
        text: [
          "登録されたリンクに対応するエンドポイントを選択してください：例えばカルシウム/ROSダイナミクス、バリアタイトジャンクション測定、精子機能、卵母細胞レドックス、または概日マーカー。収集時間、変換、除外、主要な対比を非盲検化前に定義してください。",
          "レスキューまたはブロッカーアームは媒介を検証できますが、シャム対照された物理的対比の代替にはなりません。国の出生率系列は実験室のエンドポイントではありません。",
        ],
      },
      {
        title: "4. 仮定されたスカラーではなくFieldState対比を分析する",
        text: [
          "指定されたFieldState特徴の観察された差異とその不確実性を報告してください。事前登録された対比に対して主要エンドポイントをテストし、二次的なスペクトル、方向、タイミング分析は事前に指定されていない限り探索的として扱ってください。",
          "独立した実験室で、可能であれば第2の機器チェーンを使用してプロトコルを繰り返してください。プロトコルは固定された倍率変化を予測しません：大きさは経験的な問題です。",
        ],
      },
      {
        title: "5. 監査可能なパッケージを公開する",
        text: [
          "事前登録、生データまたはアクセス制御された生データの場の記録、較正証明書、チャンバーログ、生物学的データ、分析コード、ランダム化/盲検化記録、逸脱、否定的結果を公開してください。",
          "入力品質を部分的または測定可能なFieldStateデータとして分類してください。測定可能なデータでも、臓器状態マッピングに情報を提供する前に、再現と独立して解釈可能なエンドポイントが必要です。",
        ],
      },
    ],
    outcomeTitle: "いずれの結果が意味するもの",
    outcomeText:
      "よく特性評価されたFieldState対比の下での再現可能な帰無結果は、そのシステムとプロトコルにおける提案されたリンクを制約するでしょう。再現可能な差異はメカニズムと用量/形状の研究を動機づけるでしょう；それだけではヒトの生殖または集団TFR効果を確立しません。両方の結果は情報価値があり、公表されるべきです。",
  },
  fr: {
    title: "Protocole de réplication FieldState en laboratoire",
    subtitle:
      "Une méthode pré-enregistrée pour tester si les conditions de champ mesurées en laboratoire modèrent une expérience biologique définie — sans supposer qu'elles expliquent la littérature de réplication plus large.",
    introduction: [
      "Ce protocole utilise un enregistrement FieldState de laboratoire pour décrire les conditions physiques d'une comparaison directe en aveugle. Le modérateur candidat est la condition de champ mesurée, non l'enregistrement lui-même.",
      "Son objectif est limité et discriminant : établir si une différence documentée entre des conditions physiques de champ mesurées modifie un endpoint pré-spécifié dans des conditions expérimentales par ailleurs appariées.",
    ],
    sections: [
      {
        title: "1. Concevoir une comparaison appariée",
        text: [
          "Utilisez au moins deux environnements ou chambres d'exposition caractérisés indépendamment : une condition de référence/sham et une condition active. Randomisez les échantillons ou animaux entre les sessions et évaluez l'endpoint en aveugle dans la mesure du possible.",
          "Ne décrivez aucun bras comme « sans EMF ». La comparaison doit rapporter ce qui est mesuré dans chaque bras, y compris les champs résiduels et l'incertitude.",
        ],
      },
      {
        title: "2. Mesurer l'environnement expérimental complet",
        text: [
          "Enregistrez des mesures de champ calibrées avant, pendant et après chaque session biologique : bandes pertinentes, composantes basse fréquence, vecteur B₀ le cas échéant, orientation, séries temporelles/PSD, configuration source, température, humidité, vibrations, lumière et flux d'air.",
          "Si un blindage est utilisé, caractérisez ses effets secondaires. Le blindage peut altérer la stabilité thermique, la ventilation, l'environnement acoustique, les champs statiques et la manipulation ; ces changements nécessitent des contrôles appariés plutôt que d'être attribués par défaut à une différence de champ.",
        ],
      },
      {
        title: "3. Pré-spécifier un endpoint proche",
        text: [
          "Choisissez un endpoint correspondant à un lien enregistré : par exemple la dynamique calcium/ROS, une mesure de jonction serrée de barrière, une fonction spermatique, le redox ovocytaire ou un marqueur circadien. Définissez le temps de collecte, les transformations, les exclusions et le contraste principal avant la levée de l'aveugle.",
          "Un bras de sauvetage ou bloqueur peut tester la médiation mais ne peut pas se substituer à un contraste physique contrôlé par sham. Une série nationale de fertilité n'est pas un endpoint de laboratoire.",
        ],
      },
      {
        title: "4. Analyser le contraste FieldState, pas un scalaire supposé",
        text: [
          "Rapportez les différences observées dans les caractéristiques FieldState nommées et leur incertitude. Testez l'endpoint principal contre le contraste pré-enregistré ; traitez les analyses secondaires spectrales, d'orientation et de timing comme exploratoires sauf si elles étaient pré-spécifiées.",
          "Répétez le protocole dans un laboratoire indépendant et, si possible, avec une deuxième chaîne instrumentale. Le protocole ne prédit pas un changement de facteur fixe : l'amplitude est une question empirique.",
        ],
      },
      {
        title: "5. Publier un dossier auditable",
        text: [
          "Publiez le pré-enregistrement, les enregistrements de champ bruts ou à accès contrôlé, les certificats de calibration, les journaux de chambre, les données biologiques, le code d'analyse, le registre de randomisation/aveugle, les déviations et les résultats nuls.",
          "Classifiez la qualité des entrées comme données FieldState partielles ou prêtes pour la mesure. Les données prêtes pour la mesure nécessitent encore une réplication et un endpoint interprétable indépendamment avant de pouvoir informer une cartographie d'état d'organe.",
        ],
      },
    ],
    outcomeTitle: "Ce que chaque résultat signifierait",
    outcomeText:
      "Un résultat nul reproductible sous un contraste FieldState bien caractérisé contraindrait le lien proposé pour ce système et protocole. Une différence reproductible motiverait un travail sur le mécanisme et la dose/géométrie ; elle n'établirait pas à elle seule un effet sur la reproduction humaine ou le TFR de population. Les deux résultats sont informatifs et devraient être publiés.",
  },
  ko: {
    title: "실험실 FieldState 재현 프로토콜",
    subtitle:
      "측정된 실험실 장 조건이 정의된 생물학적 실험을 조절하는지 테스트하기 위한 사전 등록된 방법 — 더 넓은 재현성 문헌을 설명한다고 가정하지 않고.",
    introduction: [
      "이 프로토콜은 실험실 FieldState 기록을 사용해 직접 맹검 비교의 물리적 조건을 기술한다. 후보 조절 인자는 측정된 장 조건이지 기록 자체가 아니다.",
      "목표는 제한적이고 변별적이다: 다른 조건을 일치시킨 실험에서 측정된 물리적 장 조건의 문서화된 차이가 사전 지정 종점을 변화시키는지 확립한다.",
    ],
    sections: [
      {
        title: "1. 매칭된 비교 설계",
        text: [
          "독립적으로 특성화된 최소 2개의 환경 또는 노출 챔버를 사용하십시오: 기준/샴 조건과 활성 조건. 샘플 또는 동물을 실험 간에 무작위화하고 가능한 한 엔드포인트 평가를 맹검화하십시오.",
          "어느 군도 \"EMF 없음\"으로 기술하지 마십시오. 비교는 잔류 장과 불확실성을 포함하여 각 군에서 측정된 것을 보고해야 합니다.",
        ],
      },
      {
        title: "2. 전체 실험 환경 측정",
        text: [
          "각 생물학적 실험 전, 중, 후에 교정된 장 측정을 기록하십시오: 관련 대역, 저주파 성분, 관련 시 B₀ 벡터, 방향, 시계열/PSD, 소스 구성, 온도, 습도, 진동, 광, 기류.",
          "차폐를 사용하는 경우 부작용을 특성화하십시오. 차폐는 온도 안정성, 환기, 음향 환경, 정적 장 및 취급을 변경할 수 있습니다. 이러한 변화에는 기본적으로 장 차이에 귀속시키기보다 매칭된 대조가 필요합니다.",
        ],
      },
      {
        title: "3. 근접 엔드포인트 사전 지정",
        text: [
          "등록된 링크에 해당하는 엔드포인트를 선택하십시오: 예를 들어 칼슘/ROS 역학, 장벽 밀착연접 측정, 정자 기능, 난모세포 레독스 또는 일주기 마커. 수집 시간, 변환, 제외 및 주요 대비를 비맹검화 전에 정의하십시오.",
          "구제 또는 차단제 군은 매개를 테스트할 수 있지만 샴 대조된 물리적 대비를 대체할 수 없습니다. 국가 출산율 시계열은 실험실 엔드포인트가 아닙니다.",
        ],
      },
      {
        title: "4. 가정된 스칼라가 아닌 FieldState 대비 분석",
        text: [
          "명명된 FieldState 특성의 관찰된 차이와 불확실성을 보고하십시오. 사전 등록된 대비에 대해 주요 엔드포인트를 테스트하고, 사전 지정되지 않은 한 이차적 스펙트럼, 방향 및 타이밍 분석을 탐색적으로 취급하십시오.",
          "독립된 실험실에서, 가능하면 제2 기기 체인으로 프로토콜을 반복하십시오. 프로토콜은 고정된 배수 변화를 예측하지 않습니다: 크기는 경험적 문제입니다.",
        ],
      },
      {
        title: "5. 감사 가능한 패키지 공개",
        text: [
          "사전 등록, 원시 또는 접근 제어된 원시 장 기록, 교정 인증서, 챔버 로그, 생물학적 데이터, 분석 코드, 무작위화/맹검 기록, 편차 및 귀무 결과를 공개하십시오.",
          "입력 품질을 부분적 또는 측정 준비된 FieldState 데이터로 분류하십시오. 측정 준비된 데이터라도 장기 상태 매핑에 정보를 제공하기 전에 재현과 독립적으로 해석 가능한 엔드포인트가 필요합니다.",
        ],
      },
    ],
    outcomeTitle: "각 결과가 의미하는 것",
    outcomeText:
      "잘 특성화된 FieldState 대비 하에서의 재현 가능한 귀무 결과는 해당 시스템과 프로토콜에 대해 제안된 링크를 제약할 것입니다. 재현 가능한 차이는 메커니즘과 용량/형상 연구를 동기 부여할 것입니다; 그것만으로 인간 생식 또는 인구 TFR 효과를 확립하지 않습니다. 두 결과 모두 정보 가치가 있으며 출판되어야 합니다.",
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

export default async function ReplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />
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
          </section>
        ))}

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.outcomeTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.outcomeText}</p>
        </section>
      </div>
    </div>
  );
}
