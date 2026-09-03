import type { Metadata } from "next";
import { Dna } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import {
  RESPONSE_MODIFIER_SCALES,
  NORTHERN_TRAITS,
  HISTORICAL_PHASES,
  POPULATION_PROFILES,
  EVOLUTION_PREDICTIONS,
} from "@/lib/evolutionData";
import {
  CHAIN_EPISTEMIC_COLORS,
  getChainEpistemicLabel,
} from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { pickCopy, pickField } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Evolutionary Origins: The Northern Package",
    subtitle: "A testable BERM hypothesis linking co-selection, candidate response modifiers and fertility patterns",
    backLink: "← Back to Evidence",
    section1Title: "Five separate candidate moderators",
    section1Intro: "BERM registers five locations where a background state might moderate a perturbation. Their m-functions are endpoint-specific candidates inside tissue or population mappings, not instances of χ_geo and not one universal function derived from Lindgren. FieldState can measure physical inputs; it does not supply these biological functions.",
    section2Title: "The Northern Package",
    section2Intro: [
      "Three traits co-selected in Northern European populations between 10,000 and 6,000 years ago: blue eyes (OCA2), lactose tolerance (LCT), and cattle husbandry. The conventional explanation treats each as an independent adaptation — blue eyes for vitamin D synthesis, lactose tolerance for calcium absorption, cattle for food security.",
      "BERM proposes a candidate cryptochrome-related connection among these traits: iris transmission may modify optical input, riboflavin supplies the FAD chromophore used by CRY, and cattle husbandry can support dietary B2. The joint EMF-response gain has not been calibrated, and lactase persistence is not itself evidence of EMF susceptibility.",
      "If the proposed interaction is real, it should appear prospectively as exposure × measured-modifier effects on specified biomarkers and reproductive endpoints. Historical co-occurrence and population TFR patterns alone cannot establish the mechanism.",
    ],
    section3Title: "Four Historical Phases",
    section3Intro: "BERM uses four historical scenarios to organize timing hypotheses. They are not a derivation from FieldState, and the biological moderators and fertility mappings remain uncalibrated.",
    section4Title: "Uncalibrated population scenarios",
    section4Intro: "The values below are scenario coordinates retained for hypothesis generation, not measured population susceptibilities or fitted TFR effects. They must not be interpreted as χ_geo.",
    profileHeaders: {
      population: "Population",
      chiEnv: "m_env candidate",
      chiOptical: "m_opt candidate",
      chiMolecular: "m_mol candidate",
      pathway: "Dominant pathway",
      tfr: "Observed TFR",
      status: "Status",
    },
    section5Title: "Testable Predictions",
    section5Intro: "Twenty registered BERM candidate tests inherited from this hypothesis family. Their labels are not evidence that a shared χ function exists; each test needs its own exposure, endpoint and moderator calibration.",
    predictionHeaders: {
      test: "Test",
      falsification: "Falsification criterion",
      timeframe: "Timeframe",
    },
    traitHeaders: {
      trait: "Trait",
      gene: "Gene",
      mechanism: "Mechanism",
      cryLink: "CRY link",
    },
    scaleHeaders: {
      scale: "Scale",
      background: "Background (B)",
      perturbation: "Perturbation",
      expression: "Candidate function",
      atZero: "At B = 0",
      atMax: "At B = max",
      verification: "Verification",
    },
    epistemicTitle: "Epistemic Status",
    epistemicText: "This page presents an L*-level BERM synthesis. Component evidence constrains co-selection timing, CRY chemistry, iris transmission and B2/FAD biology, but it does not establish a shared response function or an EMF-mediated population fertility effect. The modifier values are uncalibrated scenarios. The historical narrative generates tests rather than identifying causality, and the CRY interpretation is an extension to compare with established explanations, not a replacement.",
    levelLabel: "Evidence level",
  },
  fi: {
    title: "Evoluution alkuperät: Pohjoinen paketti",
    subtitle: "Testattava BERM-hypoteesi koselektion, ehdokasmoderaattorien ja hedelmällisyyskuvioiden yhteydestä",
    backLink: "← Takaisin näyttöön",
    section1Title: "Viisi erillistä ehdokasmoderaattoria",
    section1Intro: "BERM rekisteröi viisi kohtaa, joissa taustatila voi moderoida häiriötä. Niiden m-funktiot ovat päätepistekohtaisia ehdokkaita kudos- tai populaatiokuvauksissa, eivät χ_geo:n instansseja eivätkä Lindgrenistä johdettu universaali funktio. FieldState voi mitata fysikaalisia syötteitä mutta ei tuota biologisia funktioita.",
    section2Title: "Pohjoinen paketti",
    section2Intro: [
      "Kolme piirrettä koselektoitui Pohjois-Euroopan populaatioissa 10 000–6 000 vuotta sitten: siniset silmät (OCA2), laktoosinsietokyky (LCT) ja karjankasvatus. Perinteinen selitys käsittelee kutakin itsenäisenä adaptaationa — sinisiä silmiä D-vitamiinisynteesille, laktoosinsietokykyä kalsiumin imeytymiselle, karjaa ruokaturvalle.",
      "BERM ehdottaa näiden piirteiden välille kryptokromiin liittyvää ehdokasyhteyttä: iiriksen transmissio voi muuttaa optista syötettä, riboflaviini tuottaa CRY:n käyttämää FAD-kromoforia ja karjankasvatus voi tukea B2-saantia. Yhteistä EMF-vastevahvistusta ei ole kalibroitu, eikä laktaasin pysyvyys yksin osoita EMF-herkkyyttä.",
      "Jos vuorovaikutus on todellinen, sen tulee näkyä prospektiivisesti altistus × mitattu moderaattori -vaikutuksina ennalta määritetyissä biomarkkereissa ja lisääntymispäätepisteissä. Historiallinen samanaikaisuus tai populaatio-TFR ei yksin osoita mekanismia.",
    ],
    section3Title: "Neljä historiallista vaihetta",
    section3Intro: "BERM käyttää neljää historiallista skenaariota ajoitushypoteesien jäsentämiseen. Ne eivät ole FieldStatesta johdettuja, ja biologiset moderaattorit sekä hedelmällisyyskuvaukset ovat kalibroimatta.",
    section4Title: "Kalibroimattomat populaatioskenaariot",
    section4Intro: "Alla olevat arvot ovat hypoteesien muodostamiseen säilytettyjä skenaariokoordinaatteja, eivät mitattuja populaatioherkkyyksiä tai sovitettuja TFR-vaikutuksia. Niitä ei saa tulkita χ_geo:ksi.",
    profileHeaders: {
      population: "Populaatio",
      chiEnv: "m_env-ehdokas",
      chiOptical: "m_opt-ehdokas",
      chiMolecular: "m_mol-ehdokas",
      pathway: "Hallitseva polku",
      tfr: "Havaittu TFR",
      status: "Tila",
    },
    section5Title: "Testattavat ennusteet",
    section5Intro: "Kaksikymmentä rekisteröityä BERM-ehdokastestiä tästä hypoteesiperheestä. Nimet eivät osoita yhteisen χ-funktion olemassaoloa; jokainen testi tarvitsee oman altistus-, päätepiste- ja moderaattorikalibraation.",
    predictionHeaders: {
      test: "Testi",
      falsification: "Falsifikaatiokriteeri",
      timeframe: "Aikaväli",
    },
    traitHeaders: {
      trait: "Piirre",
      gene: "Geeni",
      mechanism: "Mekanismi",
      cryLink: "CRY-yhteys",
    },
    scaleHeaders: {
      scale: "Skaala",
      background: "Tausta (B)",
      perturbation: "Häiriö",
      expression: "Ehdokasfunktio",
      atZero: "Kun B = 0",
      atMax: "Kun B = maks",
      verification: "Todentaminen",
    },
    epistemicTitle: "Episteeminen tila",
    epistemicText: "Tämä sivu esittää L*-tason BERM-synteesin. Osanäyttö rajaa koselektion ajoitusta, CRY-kemiaa, iiriksen transmissiota sekä B2/FAD-biologiaa, mutta ei osoita yhteistä vastefunktiota tai EMF-välitteistä populaation hedelmällisyysvaikutusta. Moderaattoriarvot ovat kalibroimattomia skenaarioita. Historiallinen narratiivi tuottaa testejä eikä tunnista kausaalisuutta, ja CRY-tulkinta on vakiintuneisiin selityksiin verrattava laajennus, ei niiden korvaaja.",
    levelLabel: "Näyttötaso",
  },
  ja: {
    title: "進化の起源：ノーザンパッケージ",
    subtitle: "共選択、候補応答修飾因子、出生パターンを結ぶ検証可能なBERM仮説",
    backLink: "← エビデンスに戻る",
    section1Title: "5つの独立した候補修飾因子",
    section1Intro: "BERMは背景状態が摂動を修飾し得る5箇所を登録します。各m関数は組織または集団写像内のエンドポイント固有候補であり、χ_geoの実例でもLindgrenから導出した普遍関数でもありません。FieldStateは物理入力を測定できますが、生物学的関数を提供しません。",
    section2Title: "ノーザンパッケージ",
    section2Intro: [
      "1万年から6千年前に北ヨーロッパの集団で3つの形質が共選択された：青い目(OCA2)、乳糖耐性(LCT)、牧畜。従来の説明はそれぞれを独立した適応として扱う — 青い目はビタミンD合成、乳糖耐性はカルシウム吸収、牧畜は食料安全保障のため。",
      "BERMはこれらの形質にクリプトクロム関連の候補接続を提案します。虹彩透過は光入力を修飾し、リボフラビンはCRYが使うFADを供給し、牧畜はB2摂取を支え得ます。しかし共同EMF応答利得は未校正で、ラクターゼ持続性自体はEMF感受性の証拠ではありません。",
      "相互作用が実在するなら、事前指定したバイオマーカーと生殖エンドポイントで曝露×測定修飾因子として前向きに現れるはずです。歴史的共起や集団TFRだけでは機構を確立できません。",
    ],
    section3Title: "4つの歴史的段階",
    section3Intro: "BERMは4つの歴史シナリオでタイミング仮説を整理します。FieldStateからの導出ではなく、生物修飾因子と出生写像は未校正です。",
    section4Title: "未校正の集団シナリオ",
    section4Intro: "以下は仮説生成用のシナリオ座標であり、測定済み感受性や適合済みTFR効果ではありません。χ_geoとして解釈できません。",
    profileHeaders: {
      population: "集団",
      chiEnv: "m_env候補",
      chiOptical: "m_opt候補",
      chiMolecular: "m_mol候補",
      pathway: "優勢経路",
      tfr: "観測TFR",
      status: "状態",
    },
    section5Title: "検証可能な予測",
    section5Intro: "この仮説群から登録された20のBERM候補テストです。名称は共有χ関数の証拠ではなく、各テストに固有の曝露・エンドポイント・修飾因子校正が必要です。",
    predictionHeaders: {
      test: "検証",
      falsification: "反証基準",
      timeframe: "期間",
    },
    traitHeaders: {
      trait: "形質",
      gene: "遺伝子",
      mechanism: "メカニズム",
      cryLink: "CRYリンク",
    },
    scaleHeaders: {
      scale: "スケール",
      background: "背景 (B)",
      perturbation: "摂動",
      expression: "候補関数",
      atZero: "B = 0のとき",
      atMax: "B = maxのとき",
      verification: "検証",
    },
    epistemicTitle: "認識論的状態",
    epistemicText: "本頁はL*レベルのBERM統合です。要素証拠は共選択時期、CRY化学、虹彩透過、B2/FAD生物学を制約しますが、共有応答関数やEMF媒介の集団出生効果を確立しません。修飾因子値は未校正シナリオです。歴史叙述は因果を同定せずテストを生成し、CRY解釈は既存説明と比較する拡張です。",
    levelLabel: "エビデンスレベル",
  },
  fr: {
    title: "Origines evolutives : le package nordique",
    subtitle: "Une hypothèse BERM testable reliant co-sélection, modérateurs candidats et profils de fertilité",
    backLink: "← Retour aux preuves",
    section1Title: "Cinq modérateurs candidats distincts",
    section1Intro: "BERM enregistre cinq endroits où un état de fond pourrait modérer une perturbation. Leurs fonctions m sont des candidats propres aux endpoints, ni des instances de χ_geo ni une fonction universelle dérivée de Lindgren. FieldState mesure des entrées physiques mais ne fournit pas ces fonctions biologiques.",
    section2Title: "Le package nordique",
    section2Intro: [
      "Trois traits ont ete co-selectionnes dans les populations d'Europe du Nord entre 10 000 et 6 000 ans : les yeux bleus (OCA2), la tolerance au lactose (LCT) et l'elevage bovin. L'explication conventionnelle traite chacun comme une adaptation independante — les yeux bleus pour la synthese de vitamine D, la tolerance au lactose pour l'absorption du calcium, le betail pour la securite alimentaire.",
      "BERM propose une connexion candidate liée au cryptochrome : la transmission irienne peut modifier l'entrée optique, la riboflavine fournit le FAD utilisé par CRY et l'élevage peut soutenir l'apport en B2. Le gain conjoint de réponse EMF n'est pas calibré et la persistance de la lactase n'est pas en soi une preuve de susceptibilité EMF.",
      "Si l'interaction existe, elle devrait apparaître prospectivement comme exposition × modérateur mesuré sur des biomarqueurs et endpoints reproductifs prédéfinis. La coïncidence historique et le TFR populationnel seuls n'établissent pas le mécanisme.",
    ],
    section3Title: "Quatre phases historiques",
    section3Intro: "BERM emploie quatre scénarios historiques pour organiser les hypothèses temporelles. Ils ne dérivent pas de FieldState ; les modérateurs biologiques et mappings de fertilité restent non calibrés.",
    section4Title: "Scénarios populationnels non calibrés",
    section4Intro: "Les valeurs ci-dessous servent à générer des hypothèses ; elles ne sont ni des susceptibilités mesurées ni des effets TFR ajustés et ne doivent pas être interprétées comme χ_geo.",
    profileHeaders: {
      population: "Population",
      chiEnv: "candidat m_env",
      chiOptical: "candidat m_opt",
      chiMolecular: "candidat m_mol",
      pathway: "Voie dominante",
      tfr: "TFR observe",
      status: "Statut",
    },
    section5Title: "Predictions testables",
    section5Intro: "Vingt tests candidats BERM enregistrés. Leurs noms ne prouvent pas une fonction χ partagée ; chacun exige sa propre calibration d'exposition, d'endpoint et de modérateur.",
    predictionHeaders: {
      test: "Test",
      falsification: "Critere de falsification",
      timeframe: "Delai",
    },
    traitHeaders: {
      trait: "Trait",
      gene: "Gene",
      mechanism: "Mecanisme",
      cryLink: "Lien CRY",
    },
    scaleHeaders: {
      scale: "Echelle",
      background: "Arriere-plan (B)",
      perturbation: "Perturbation",
      expression: "Fonction candidate",
      atZero: "A B = 0",
      atMax: "A B = max",
      verification: "Verification",
    },
    epistemicTitle: "Statut epistemique",
    epistemicText: "Cette page présente une synthèse BERM de niveau L*. Les preuves de composants contraignent la co-sélection, la chimie CRY, la transmission irienne et la biologie B2/FAD, sans établir une fonction de réponse commune ni un effet populationnel de fertilité médié par les EMF. Les valeurs sont des scénarios non calibrés. Le récit génère des tests sans identifier la causalité ; l'interprétation CRY est une extension à comparer aux explications établies.",
    levelLabel: "Niveau de preuve",
  },
  ko: {
    title: "진화적 기원: 노던 패키지",
    subtitle: "공동선택, 후보 반응 조절인자, 출산 패턴을 연결하는 검증 가능한 BERM 가설",
    backLink: "← 근거로 돌아가기",
    section1Title: "서로 다른 다섯 후보 조절인자",
    section1Intro: "BERM은 배경 상태가 섭동을 조절할 수 있는 다섯 위치를 등록합니다. 각 m 함수는 조직 또는 집단 매핑의 종점별 후보이며 χ_geo의 인스턴스나 Lindgren에서 도출된 보편 함수가 아닙니다. FieldState는 물리 입력을 측정하지만 생물학적 함수를 제공하지 않습니다.",
    section2Title: "노던 패키지",
    section2Intro: [
      "1만 년에서 6천 년 전 사이에 북유럽 집단에서 세 가지 형질이 공동선택되었다: 파란 눈(OCA2), 유당 내성(LCT), 소 사육. 기존 설명은 각각을 독립적 적응으로 다룬다 — 파란 눈은 비타민 D 합성, 유당 내성은 칼슘 흡수, 소는 식량 안보를 위해.",
      "BERM은 이 형질들 사이에 크립토크롬 관련 후보 연결을 제안합니다. 홍채 투과는 광학 입력을 조절할 수 있고 리보플라빈은 CRY가 사용하는 FAD를 공급하며 목축은 B2 섭취를 지원할 수 있습니다. 공동 EMF 반응 이득은 보정되지 않았고 락타아제 지속성 자체는 EMF 감수성의 증거가 아닙니다.",
      "상호작용이 실제라면 사전 지정한 바이오마커와 생식 종점에서 노출 × 측정 조절인자로 전향적으로 나타나야 합니다. 역사적 공존이나 집단 TFR만으로 메커니즘을 확립할 수 없습니다.",
    ],
    section3Title: "네 가지 역사적 단계",
    section3Intro: "BERM은 네 가지 역사 시나리오로 시점 가설을 정리합니다. 이는 FieldState에서 도출되지 않으며 생물 조절인자와 출산 매핑은 미보정입니다.",
    section4Title: "미보정 집단 시나리오",
    section4Intro: "아래 값은 가설 생성을 위한 시나리오 좌표이며 측정된 집단 감수성이나 적합된 TFR 효과가 아닙니다. χ_geo로 해석해서는 안 됩니다.",
    profileHeaders: {
      population: "집단",
      chiEnv: "m_env 후보",
      chiOptical: "m_opt 후보",
      chiMolecular: "m_mol 후보",
      pathway: "우세 경로",
      tfr: "관측 TFR",
      status: "상태",
    },
    section5Title: "검증 가능한 예측",
    section5Intro: "이 가설군에서 등록된 스무 가지 BERM 후보 테스트입니다. 명칭은 공유 χ 함수의 증거가 아니며 각 테스트에는 고유 노출·종점·조절인자 보정이 필요합니다.",
    predictionHeaders: {
      test: "검증",
      falsification: "반증 기준",
      timeframe: "기간",
    },
    traitHeaders: {
      trait: "형질",
      gene: "유전자",
      mechanism: "메커니즘",
      cryLink: "CRY 연결",
    },
    scaleHeaders: {
      scale: "스케일",
      background: "배경 (B)",
      perturbation: "교란",
      expression: "후보 함수",
      atZero: "B = 0일 때",
      atMax: "B = max일 때",
      verification: "검증",
    },
    epistemicTitle: "인식론적 상태",
    epistemicText: "이 페이지는 L* 수준의 BERM 종합입니다. 구성요소 근거는 공동선택 시점, CRY 화학, 홍채 투과, B2/FAD 생물학을 제약하지만 공유 반응 함수나 EMF 매개 집단 출산 효과를 확립하지 않습니다. 조절인자 값은 미보정 시나리오입니다. 역사 서사는 인과를 식별하지 않고 테스트를 생성하며 CRY 해석은 기존 설명과 비교할 확장입니다.",
    levelLabel: "근거 수준",
  },
} as const;

function EpistemicBadge({ level, locale }: { level: string; locale: string }) {
  const color = CHAIN_EPISTEMIC_COLORS[level as EpistemicLevel] ?? "#6B7280";
  const label = getChainEpistemicLabel(level as EpistemicLevel, locale);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {level} — {label}
    </span>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto overflow-x-clip px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Dna} title={d.title} subtitle={d.subtitle} />

      {/* Section 1: One Function, Five Scales */}
      <section className="mb-16">
        <h2 className="editorial-section-heading mb-6">{d.section1Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section1Intro}
        </p>

        <div className="space-y-4">
          {RESPONSE_MODIFIER_SCALES.map((scale, i) => {
            return (
              <article
                key={scale.id}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 text-lg font-semibold">
                    <span className="font-mono-num text-xs text-accent mr-2">{i + 1}</span>
                    {pickField(scale, "label", locale)}
                  </h3>
                  <EpistemicBadge level={scale.level} locale={locale} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted w-32">{d.scaleHeaders.background}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "background", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.perturbation}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "perturbation", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.expression}</td>
                        <td className="py-2 text-foreground font-mono text-xs">{scale.candidate_expression}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atZero}</td>
                        <td className="py-2 text-foreground-muted">{pickField(scale, "at_zero", locale)}</td>
                      </tr>
                      <tr className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.atMax}</td>
                        <td className="py-2 text-foreground">{pickField(scale, "at_max", locale)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3 font-semibold text-foreground-muted">{d.scaleHeaders.verification}</td>
                        <td className="py-2 text-foreground-muted text-xs">
                          {scale.referenceIds?.length
                            ? scale.referenceIds.map((referenceId, index) => (
                                <span key={referenceId}>
                                  {index > 0 ? ", " : null}
                                  <StudyCitation referenceId={referenceId} locale={locale} />
                                </span>
                              ))
                            : scale.verification}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: The Northern Package */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section2Title}</h2>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section2Intro.map((paragraph, i) => (
            <p key={i} className={i === 2 ? "font-semibold" : ""}>{paragraph}</p>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.traitHeaders.trait}</th>
                <th className="py-2 pr-3">{d.traitHeaders.gene}</th>
                <th className="py-2 pr-3">{d.traitHeaders.mechanism}</th>
                <th className="py-2 pr-3">{d.traitHeaders.cryLink}</th>
                <th className="py-2 w-16">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {NORTHERN_TRAITS.map((trait) => {
                const traitColor = CHAIN_EPISTEMIC_COLORS[trait.level as EpistemicLevel] ?? "#6B7280";
                return (
                  <tr key={trait.id} className="border-b border-card-border/40">
                    <td className="py-3 pr-3 font-medium text-foreground">{pickField(trait, "trait", locale)}</td>
                    <td className="py-3 pr-3 text-foreground-muted font-mono text-xs">{trait.gene}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(trait, "mechanism", locale)}</td>
                    <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(trait, "cry_link", locale)}</td>
                    <td className="py-3">
                      <span className="rounded-full px-1.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${traitColor}20`, color: traitColor }}>
                        {trait.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Four Historical Phases */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section3Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section3Intro}
        </p>

        <div className="space-y-4">
          {HISTORICAL_PHASES.map((phase) => (
            <article
              key={phase.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-start gap-4 mb-2">
                <span className="shrink-0 font-mono-num text-xs text-accent bg-accent/10 rounded-full px-2.5 py-1">
                  {phase.period}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {pickField(phase, "title", locale)}
                </h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pickField(phase, "description", locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Population χ Profiles */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section4Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section4Intro}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.profileHeaders.population}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiEnv}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiOptical}</th>
                <th className="py-2 pr-3">{d.profileHeaders.chiMolecular}</th>
                <th className="py-2 pr-3">{d.profileHeaders.pathway}</th>
                <th className="py-2 pr-3">{d.profileHeaders.tfr}</th>
                <th className="py-2 pr-3">{d.profileHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {POPULATION_PROFILES.map((p) => (
                <tr key={p.id} className="border-b border-card-border/40">
                  <td className="py-3 pr-3 font-medium text-foreground">{pickField(p, "label", locale)}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.candidate_env}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.candidate_optical}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-foreground">{p.candidate_molecular}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs">{p.dominant_pathway}</td>
                  <td className="py-3 pr-3 font-mono text-xs font-semibold text-foreground">{p.observed_tfr}</td>
                  <td className="py-3 pr-3 text-foreground-muted text-xs leading-relaxed">{pickField(p, "status", locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Testable Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.section5Title}</h2>
        <p className="text-[0.95rem] leading-relaxed text-foreground max-w-3xl mb-8">
          {d.section5Intro}
        </p>

        <div className="space-y-6">
          {EVOLUTION_PREDICTIONS.map((pred) => (
            <article
              key={pred.id}
              className="rounded-lg border border-card-border bg-card-bg p-5"
            >
              <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
                <h3 className="min-w-0 font-semibold text-sm">
                  <span className="font-mono-num text-xs text-accent mr-2">{pred.code}</span>
                  {pickField(pred, "title", locale)}
                </h3>
                <div className="flex max-w-full flex-wrap items-center gap-2 sm:shrink-0">
                  <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                  <EpistemicBadge level={pred.level} locale={locale} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {d.predictionHeaders.test}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {pickField(pred, "test", locale)}
                  </p>
                </div>

                {pickField(pred, "falsification", locale) && (
                  <div className="rounded border border-status-partial/30 bg-status-partial/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-status-partial mb-1">
                      {d.predictionHeaders.falsification}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {pickField(pred, "falsification", locale)}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Epistemic note */}
      <div className="rounded-xl border border-status-partial/30 bg-status-partial/5 p-5">
        <h3 className="font-semibold mb-2">{d.epistemicTitle}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.epistemicText}</p>
      </div>
    </div>
  );
}
