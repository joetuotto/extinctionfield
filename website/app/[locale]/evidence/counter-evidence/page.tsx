import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Counter-Evidence: An Honest Assessment",
    subtitle: "BERM claims 56 verified layers and 0 refuted. This is statistically suspicious. Any model that cannot be challenged is not science. This page presents the strongest counter-arguments and BERM’s responses — honestly, not defensively.",
    backLink: "← Back to Evidence",
    cautionText: "This page is not advocacy. It is an honest assessment of the evidence against BERM. Readers should evaluate both the criticisms and the responses independently.",

    counterTitle: "Five claimed counter-arguments",
    counterCards: [
      {
        id: "C1",
        claim: "60% of studies show no effect",
        response: "10 moderators predict which studies find effects. Species, duration, pulsation have statistical significance (p<0.05). This is a PREDICTED result, not a problem.",
      },
      {
        id: "C2",
        claim: "WHO/ICNIRP say no risk (or small)",
        response: "WHO evaluates CANCER, not the metabolic/reproductive/neurological endpoints BERM predicts. Different question, different answer.",
      },
      {
        id: "C3",
        claim: "EHS blinded studies are negative",
        response: "These test conscious PERCEPTION (“can you feel it?”), not BIOLOGY. CaMKII phosphorylation doesn’t require awareness. Irrelevant to mechanism.",
      },
      {
        id: "C4",
        claim: "Insufficient evidence for non-thermal effects",
        response: "This IS BERM’s own assessment at L*-level. BERM explicitly marks predictions as untested. Consistency, not contradiction.",
      },
      {
        id: "C5",
        claim: "Control groups also show effects",
        response: "In modern labs, “control” ≠ EMF-free. Labs have 50 Hz background that primes cells (VK4). Controls are pre-exposed. BERM PREDICTS this.",
      },
    ],

    caUnivTitle: "The Ca²⁺ universality problem",
    caUnivPoints: [
      "Ca²⁺ is involved in nearly ALL biological processes",
      "A Ca²⁺-based theory can “explain” almost any finding → low discrimination",
      "56 layers with 0 refuted is STATISTICALLY SUSPICIOUS",
    ],
    caUnivResponse: "BERM’s honest response: specificity comes from VGCC subtypes (Cav1.2, Cav1.3, Cav3.2) and tissue-specific distributions, NOT from Ca²⁺ in general.",
    caUnivProof: "Timothy syndrome proves specificity: ONE gene (CACNA1C) → SPECIFIC pattern, not everything. A single calcium channel mutation produces a discrete, recognizable syndrome — not universal dysfunction.",

    refuteTitle: "What WOULD refute BERM",
    refuteCards: [
      { test: "Ca²⁺ channel blocker does NOT prevent EMF biological effect", status: "23 studies show opposite", statusType: "tested" as const },
      { test: "CACNA genotype does NOT modulate EMF response", status: "Sousouri 2025 shows opposite", statusType: "tested" as const },
      { test: "Amish–Mennonite gradient does NOT follow EMF", status: "UNTESTED", statusType: "untested" as const },
      { test: "EMF reduction intervention shows NO health benefit", status: "UNTESTED", statusType: "untested" as const },
      { test: "ETH Zürich nimodipine-5G test is NEGATIVE", status: "NOT YET DONE (2026)", statusType: "untested" as const },
    ],

    gapTitle: "The critical gap",
    gapBody: "INTERVENTIONAL data is almost completely missing. No large randomized controlled trial of EMF reduction has been conducted. Observational data, mechanistic studies, and animal experiments are consistent with BERM — but the gold standard of medical evidence (RCT) has not been applied. This is BERM’s largest weakness — acknowledged, not hidden.",
  },
  fi: {
    title: "Vastaevidenssi: Rehellinen arviointi",
    subtitle: "BERM väittää 56 vahvistettua kerrosta ja 0 kumottua. Tämä on tilastollisesti epäilyttävää. Mikään malli, jota ei voida haastaa, ei ole tiedettä. Tämä sivu esittää vahvimmat vasta-argumentit ja BERM:n vastaukset — rehellisesti, ei puolustavasti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ei ole puolustuspuhe. Se on rehellinen arvio BERM:iä vastaan esitetystä evidenssistä. Lukijoiden tulisi arvioida sekä kritiikki että vastaukset itsenäisesti.",

    counterTitle: "Viisi väitettyä vasta-argumenttia",
    counterCards: [
      {
        id: "C1",
        claim: "60 % tutkimuksista ei osoita vaikutusta",
        response: "10 moderaattoria ennustavat, mitkä tutkimukset löytävät vaikutuksia. Laji, kesto, pulsaatio ovat tilastollisesti merkitseviä (p<0,05). Tämä on ENNUSTETTU tulos, ei ongelma.",
      },
      {
        id: "C2",
        claim: "WHO/ICNIRP sanoo ei riskiä (tai pieni)",
        response: "WHO arvioi SYÖPÄÄ, ei metabolisia/reproduktiivisia/neurologisia päätepisteitä, joita BERM ennustaa. Eri kysymys, eri vastaus.",
      },
      {
        id: "C3",
        claim: "EHS-sokkoutetut tutkimukset ovat negatiivisia",
        response: "Nämä testaavat tietoista HAVAITSEMISTA (”tunnetko sen?”), eivät BIOLOGIAA. CaMKII-fosforylaatio ei vaadi tietoisuutta. Epäolennaista mekanismille.",
      },
      {
        id: "C4",
        claim: "Riittämätön evidenssi ei-termisille vaikutuksille",
        response: "Tämä ON BERM:n oma arvio L*-tasolla. BERM merkitsee ennusteet nimenomaisesti testaamattomiksi. Johdonmukaisuutta, ei ristiriitaa.",
      },
      {
        id: "C5",
        claim: "Kontrolliryhmät osoittavat myös vaikutuksia",
        response: "Moderneissa laboratorioissa ”kontrolli” ≠ EMF-vapaa. Laboratorioissa on 50 Hz tausta, joka primaa solut (VK4). Kontrollit ovat esialtistuneita. BERM ENNUSTAA tämän.",
      },
    ],

    caUnivTitle: "Ca²⁺-universaalisuusongelma",
    caUnivPoints: [
      "Ca²⁺ osallistuu lähes KAIKKIIN biologisiin prosesseihin",
      "Ca²⁺-pohjainen teoria voi ”selittää” lähes minkä tahansa löydöksen → matala erottelukyky",
      "56 kerrosta ja 0 kumottua on TILASTOLLISESTI EPÄILYTTÄVÄÄ",
    ],
    caUnivResponse: "BERM:n rehellinen vastaus: spesifisyys tulee VGCC-alatyypeistä (Cav1.2, Cav1.3, Cav3.2) ja kudosspesifisistä jakaumista, EI Ca²⁺:sta yleisesti.",
    caUnivProof: "Timothy-oireyhtymä todistaa spesifisyyden: YKSI geeni (CACNA1C) → SPESIFINEN kaava, ei kaikkea. Yksittäinen kalsiumkanaavamutaatio tuottaa erillisen, tunnistettavan oireyhtymän — ei universaalia toimintahäiriötä.",

    refuteTitle: "Mikä KUMOAISI BERM:n",
    refuteCards: [
      { test: "Ca²⁺-kanavan salpaaja EI estä EMF:n biologista vaikutusta", status: "23 tutkimusta osoittaa päinvastoin", statusType: "tested" as const },
      { test: "CACNA-genotyyppi EI moduloi EMF-vastetta", status: "Sousouri 2025 osoittaa päinvastoin", statusType: "tested" as const },
      { test: "Amish–mennoniittigradientti EI seuraa EMF:ää", status: "TESTAAMATON", statusType: "untested" as const },
      { test: "EMF-vähennysinterventio ei osoita terveyshyötyä", status: "TESTAAMATON", statusType: "untested" as const },
      { test: "ETH Zürichin nimodopiini-5G-testi on NEGATIIVINEN", status: "EI VIELÄ TEHTY (2026)", statusType: "untested" as const },
    ],

    gapTitle: "Kriittinen aukko",
    gapBody: "INTERVENTIONAALINEN data puuttuu lähes täysin. Mitään suurta satunnaistettua kontrolloitua tutkimusta EMF-vähennyksestä ei ole tehty. Havaintodata, mekanistiset tutkimukset ja eläinkokeet ovat BERM:n kanssa johdonmukaisia — mutta lääketieteellisen evidenssin kultastandardi (RCT) ei ole sovellettu. Tämä on BERM:n suurin heikkous — tunnustettu, ei piilotettu.",
  },
  ja: {
    title: "反証：誠実な評価",
    subtitle: "BERMは56の検証済み層と0の反証を主張する。これは統計的に疑わしい。挑戦できないモデルは科学ではない。このページでは最も強力な反論とBERMの回答を、防御的にではなく誠実に提示する。",
    backLink: "← エビデンスに戻る",
    cautionText: "このページは擁護ではない。BERMに対するエビデンスの誠実な評価である。読者は批判と回答の両方を独立して評価すべきである。",

    counterTitle: "5つの主要な反論",
    counterCards: [
      { id: "C1", claim: "研究の60%で効果が認められない", response: "10のモデレーターがどの研究で効果が見出されるかを予測する。種、期間、パルスには統計的有意性がある（p<0.05）。これは予測された結果であり、問題ではない。" },
      { id: "C2", claim: "WHO/ICNIRPはリスクなし（または小さい）と述べている", response: "WHOは癌を評価しており、BERMが予測する代謝/生殖/神経学的エンドポイントではない。異なる問い、異なる答え。" },
      { id: "C3", claim: "EHS盲検試験は陰性である", response: "これらは意識的な知覚（「感じますか？」）をテストしており、生物学ではない。CaMKIIリン酸化は認識を必要としない。メカニズムとは無関係。" },
      { id: "C4", claim: "非熱的効果のエビデンスが不十分", response: "これはL*レベルでのBERM自身の評価である。BERMは予測を明示的に未検証と記す。矛盾ではなく一貫性。" },
      { id: "C5", claim: "対照群でも効果が認められる", response: "現代の実験室では「対照」≠ EMFフリー。実験室には細胞をプライミングする50 Hzバックグラウンドがある（VK4）。対照群は事前曝露されている。BERMはこれを予測する。" },
    ],

    caUnivTitle: "Ca²⁺普遍性問題",
    caUnivPoints: [
      "Ca²⁺はほぼすべての生物学的プロセスに関与している",
      "Ca²⁺ベースの理論はほぼあらゆる発見を「説明」できる → 低い識別力",
      "56層で0の反証は統計的に疑わしい",
    ],
    caUnivResponse: "BERMの誠実な回答：特異性はVGCCサブタイプ（Cav1.2、Cav1.3、Cav3.2）と組織特異的分布から来るのであり、Ca²⁺一般からではない。",
    caUnivProof: "Timothy症候群が特異性を証明する：一つの遺伝子（CACNA1C）→ 特異的パターン、すべてではない。単一のカルシウムチャネル変異が離散的で認識可能な症候群を産生する――普遍的な機能障害ではない。",

    refuteTitle: "何がBERMを反証するか",
    refuteCards: [
      { test: "Ca²⁺チャネル遮断薬がEMFの生物学的効果を阻止しない", status: "23件の研究が逆を示す", statusType: "tested" as const },
      { test: "CACNA遺伝子型がEMF応答を調節しない", status: "Sousouri 2025が逆を示す", statusType: "tested" as const },
      { test: "Amish-Mennonite勾配がEMFに従わない", status: "未検証", statusType: "untested" as const },
      { test: "EMF削減介入が健康上の利益を示さない", status: "未検証", statusType: "untested" as const },
      { test: "ETH Zurichのnimodipine-5Gテストが陰性", status: "未実施（2026年）", statusType: "untested" as const },
    ],

    gapTitle: "決定的なギャップ",
    gapBody: "介入データがほぼ完全に欠落している。EMF削減の大規模ランダム化比較試験は実施されていない。観察データ、メカニズム研究、動物実験はBERMと一致する――しかし医学的エビデンスのゴールドスタンダード（RCT）は適用されていない。これはBERMの最大の弱点である――隠されずに認められている。",
  },
  fr: {
    title: "Contre-preuves : une évaluation honnête",
    subtitle: "BERM revendique 56 couches vérifiées et 0 réfutée. C'est statistiquement suspect. Un modèle qui ne peut être contesté n'est pas de la science. Cette page présente les contre-arguments les plus solides et les réponses de BERM — honnêtement, pas défensivement.",
    backLink: "← Retour aux preuves",
    cautionText: "Cette page n'est pas du plaidoyer. C'est une évaluation honnête des preuves contre BERM. Les lecteurs devraient évaluer les critiques et les réponses indépendamment.",

    counterTitle: "Cinq contre-arguments allégués",
    counterCards: [
      { id: "C1", claim: "60 % des études ne montrent aucun effet", response: "10 modérateurs prédisent quelles études trouvent des effets. L'espèce, la durée et la pulsation ont une signification statistique (p<0,05). C'est un résultat PRÉDIT, pas un problème." },
      { id: "C2", claim: "L'OMS/ICNIRP dit pas de risque (ou faible)", response: "L'OMS évalue le CANCER, pas les critères métaboliques/reproductifs/neurologiques que BERM prédit. Question différente, réponse différente." },
      { id: "C3", claim: "Les études en aveugle sur l'EHS sont négatives", response: "Elles testent la PERCEPTION consciente (« le sentez-vous ? »), pas la BIOLOGIE. La phosphorylation de CaMKII ne nécessite pas de conscience. Sans rapport avec le mécanisme." },
      { id: "C4", claim: "Preuves insuffisantes pour les effets non thermiques", response: "C'est l'ÉVALUATION PROPRE de BERM au niveau L*. BERM marque explicitement les prédictions comme non testées. Cohérence, pas contradiction." },
      { id: "C5", claim: "Les groupes témoins montrent aussi des effets", response: "Dans les laboratoires modernes, « témoin » ≠ sans EMF. Les laboratoires ont un fond de 50 Hz qui amorce les cellules (VK4). Les témoins sont pré-exposés. BERM PRÉDIT cela." },
    ],

    caUnivTitle: "Le problème d'universalité du Ca²⁺",
    caUnivPoints: [
      "Le Ca²⁺ est impliqué dans presque TOUS les processus biologiques",
      "Une théorie basée sur le Ca²⁺ peut « expliquer » presque n'importe quelle découverte → faible discrimination",
      "56 couches avec 0 réfutée est STATISTIQUEMENT SUSPECT",
    ],
    caUnivResponse: "La réponse honnête de BERM : la spécificité vient des sous-types VGCC (Cav1.2, Cav1.3, Cav3.2) et des distributions tissulaires spécifiques, PAS du Ca²⁺ en général.",
    caUnivProof: "Le syndrome de Timothy prouve la spécificité : UN gène (CACNA1C) → un pattern SPÉCIFIQUE, pas tout. Une seule mutation d'un canal calcique produit un syndrome discret et reconnaissable — pas un dysfonctionnement universel.",

    refuteTitle: "Ce qui RÉFUTERAIT BERM",
    refuteCards: [
      { test: "Un bloqueur de canal Ca²⁺ N'empêche PAS l'effet biologique de l'EMF", status: "23 études montrent le contraire", statusType: "tested" as const },
      { test: "Le génotype CACNA NE module PAS la réponse EMF", status: "Sousouri 2025 montre le contraire", statusType: "tested" as const },
      { test: "Le gradient Amish–Mennonite NE suit PAS l'EMF", status: "NON TESTÉ", statusType: "untested" as const },
      { test: "L'intervention de réduction EMF ne montre AUCUN bénéfice pour la santé", status: "NON TESTÉ", statusType: "untested" as const },
      { test: "Le test nimodipine-5G de l'ETH Zurich est NÉGATIF", status: "PAS ENCORE RÉALISÉ (2026)", statusType: "untested" as const },
    ],

    gapTitle: "La lacune critique",
    gapBody: "Les données INTERVENTIONNELLES sont presque complètement absentes. Aucun essai contrôlé randomisé à grande échelle de réduction EMF n'a été mené. Les données observationnelles, les études mécanistiques et les expériences animales sont cohérentes avec BERM — mais l'étalon-or de la médecine factuelle (ECR) n'a pas été appliqué. C'est la plus grande faiblesse de BERM — reconnue, pas cachée.",
  },
  ko: {
    title: "반증: 정직한 평가",
    subtitle: "BERM은 56개의 검증된 층과 0개의 반증을 주장한다. 이는 통계적으로 의심스럽다. 도전할 수 없는 모델은 과학이 아니다. 이 페이지는 가장 강력한 반론과 BERM의 응답을 방어적이 아닌 정직하게 제시한다.",
    backLink: "← 증거로 돌아가기",
    cautionText: "이 페이지는 옹호가 아니다. BERM에 대한 증거의 정직한 평가이다. 독자는 비판과 응답 모두를 독립적으로 평가해야 한다.",

    counterTitle: "다섯 가지 주장된 반론",
    counterCards: [
      { id: "C1", claim: "연구의 60%에서 효과가 나타나지 않음", response: "10개의 조절변수가 어떤 연구에서 효과가 발견되는지 예측한다. 종, 기간, 맥동은 통계적 유의성이 있다(p<0.05). 이것은 예측된 결과이지 문제가 아니다." },
      { id: "C2", claim: "WHO/ICNIRP는 위험 없음(또는 적음)이라고 함", response: "WHO는 암을 평가하는 것이지, BERM이 예측하는 대사/생식/신경학적 종점이 아니다. 다른 질문, 다른 답변." },
      { id: "C3", claim: "EHS 맹검 연구는 음성임", response: "이것들은 의식적 지각(\"느끼십니까?\")을 테스트하는 것이지 생물학이 아니다. CaMKII 인산화는 인식을 필요로 하지 않는다. 메커니즘과 무관하다." },
      { id: "C4", claim: "비열적 효과에 대한 증거 불충분", response: "이것은 L* 수준에서의 BERM 자체 평가이다. BERM은 예측을 명시적으로 미검증으로 표시한다. 모순이 아닌 일관성." },
      { id: "C5", claim: "대조군에서도 효과가 나타남", response: "현대 실험실에서 \"대조\" ≠ EMF 없음. 실험실에는 세포를 프라이밍하는 50 Hz 배경이 있다(VK4). 대조군은 사전 노출되어 있다. BERM은 이를 예측한다." },
    ],

    caUnivTitle: "Ca²⁺ 보편성 문제",
    caUnivPoints: [
      "Ca²⁺는 거의 모든 생물학적 과정에 관여한다",
      "Ca²⁺ 기반 이론은 거의 모든 발견을 \"설명\"할 수 있다 → 낮은 변별력",
      "56개 층에서 0개 반증은 통계적으로 의심스럽다",
    ],
    caUnivResponse: "BERM의 정직한 응답: 특이성은 VGCC 하위유형(Cav1.2, Cav1.3, Cav3.2)과 조직 특이적 분포에서 비롯되며, Ca²⁺ 일반에서가 아니다.",
    caUnivProof: "Timothy 증후군이 특이성을 증명한다: 하나의 유전자(CACNA1C) → 특이적 패턴, 모든 것이 아니다. 단일 칼슘 채널 변이가 이산적이고 인식 가능한 증후군을 산출한다 — 보편적 기능장애가 아니다.",

    refuteTitle: "무엇이 BERM을 반증하는가",
    refuteCards: [
      { test: "Ca²⁺ 채널 차단제가 EMF 생물학적 효과를 방지하지 않음", status: "23건의 연구가 반대를 보여줌", statusType: "tested" as const },
      { test: "CACNA 유전자형이 EMF 반응을 조절하지 않음", status: "Sousouri 2025가 반대를 보여줌", statusType: "tested" as const },
      { test: "Amish-Mennonite 기울기가 EMF를 따르지 않음", status: "미검증", statusType: "untested" as const },
      { test: "EMF 감소 개입이 건강상의 이점을 보이지 않음", status: "미검증", statusType: "untested" as const },
      { test: "ETH Zurich nimodipine-5G 테스트가 음성", status: "아직 시행되지 않음(2026년)", statusType: "untested" as const },
    ],

    gapTitle: "결정적 격차",
    gapBody: "개입 데이터가 거의 완전히 누락되어 있다. EMF 감소에 대한 대규모 무작위 대조 시험은 수행되지 않았다. 관찰 데이터, 메커니즘 연구 및 동물 실험은 BERM과 일치하지만 — 의학적 증거의 금본위제(RCT)는 적용되지 않았다. 이것이 BERM의 가장 큰 약점이다 — 숨기지 않고 인정한다.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CounterEvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Scale} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={locale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: Five counter-arguments */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">{d.counterTitle}</h2>
        <div className="space-y-3">
          {d.counterCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{c.id}: &ldquo;{c.claim}&rdquo;</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><span className="font-medium">BERM response:</span> {c.response}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Ca2+ universality problem — red-bordered */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.caUnivTitle}</h2>
        <div className="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-5">
          <div className="space-y-1.5 mb-4">
            {d.caUnivPoints.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-red-400 shrink-0">&bull;</span><p>{p}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.caUnivResponse}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.caUnivProof}</p>
        </div>
      </section>

      {/* Section 3: What WOULD refute BERM — green cards */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.refuteTitle}</h2>
        <div className="space-y-3">
          {d.refuteCards.map((c, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.test}</p>
              <p className={`text-sm leading-relaxed ${c.statusType === "tested" ? "text-green-500" : "text-amber-500"}`}>
                {c.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: The critical gap — amber card */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.gapTitle}</h2>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.gapBody}</p>
        </div>
      </section>
    </div>
  );
}
