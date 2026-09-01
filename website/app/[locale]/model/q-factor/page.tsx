import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { QFactorSpectrum } from "@/components/QFactorSpectrum";

const COPY = {
  en: {
    title: "Q-Factor Spectrum",
    subtitle: "One damped oscillator equation governs seven neural pathways. The only variable is γ — the net GABAergic damping coefficient. When γ decreases, Q increases, and the system becomes susceptible to resonance-driven spreading depolarization.",
    backLink: "← Back to Model",
    cautionText: "The Q-factor model is a theoretical framework that unifies seven neurological conditions under a common calcium-dependent oscillation mechanism. This is not established medical guidance. Current standard treatments remain appropriate.",

    equationTitle: "The governing equation",
    equationDesc: "All seven pathways map onto a single damped harmonic oscillator. Q determines whether a perturbation (including EMF at biological resonance frequencies) triggers pathological oscillation:",
    equationSteps: [
      "Q = ω₀ / (2γ), where ω₀ = natural oscillation frequency, γ = net GABAergic damping",
      "Q → ∞: no damping (neonatal brain, GABA excitatory) — any resonant input amplifies fatally",
      "Q ~ 20–50: low damping — threshold easily exceeded → seizures",
      "Q ~ 5–15: moderate damping — CSD propagates but stops at sulci → migraine aura",
      "Q ~ 1–5: robust damping (normal adult) — oscillations self-terminate within 2–3 cycles",
    ],

    clinicalTitle: "Clinical validation",
    clinicalDesc: "The Q-factor model makes a specific, testable claim: every effective neurological drug for these seven conditions should modify either γ (damping) or the resonant input. This is confirmed across all drug classes — see the neurological spectrum evidence page for the complete antiepileptic drug calcium map.",

    emfTitle: "EMF as resonant input",
    emfDesc: "The Q-factor model explains why EMF bioeffects are frequency-dependent and why ICNIRP SAR limits fail to predict biological effects:",
    emfPoints: [
      "López-Martín 2006/2009: GSM + subconvulsive picrotoxin → seizures in adult rats. Neither alone sufficient. Picrotoxin reduces γ; GSM provides resonant input.",
      "Pulse-modulated GSM (217 Hz) is more effective than continuous wave — the pulsation pattern matches biological resonance, not the carrier frequency.",
      "ELF-priming: chronic 50/60 Hz exposure upregulates α2δ-1 (CACNA2D1) → more VGCCs at synapses → lower Q threshold → increased susceptibility to all seven conditions.",
      "Neonatal prediction: the neonatal brain has endogenously reduced γ (NKCC1 > KCC2). EMF alone — without pharmacological GABA reduction — should be sufficient to trigger CSD in neonates. This is the SIDS mechanism.",
    ],

    linkNeuro: "Full clinical evidence: Neurological Spectrum",
    linkPharm: "Drug cross-map: Pharmacological Evidence",
    linkPredictions: "Testable predictions",
  },
  fi: {
    title: "Q-tekijäspektri",
    subtitle: "Yksi vaimennetun oskillaattorin yhtälö hallitsee seitsemää hermorataa. Ainoa muuttuja on γ — netto-GABAerginen vaimennuskerroin. Kun γ pienenee, Q kasvaa ja järjestelmä tulee alttiiksi resonanssiohjautulle spreading depolarizationille.",
    backLink: "← Takaisin malliin",
    cautionText: "Q-tekijämalli on teoreettinen viitekehys, joka yhdistää seitsemän neurologista tilaa yhteiseksi kalsiumriippuvaiseksi oskillaatiomekanismiksi. Tämä ei ole vakiintunutta lääketieteellistä ohjausta. Nykyiset standardihoidot ovat edelleen asianmukaisia.",

    equationTitle: "Hallitseva yhtälö",
    equationDesc: "Kaikki seitsemän hermorataa kartoittuvat yhdelle vaimennetulle harmoniselle oskillaattorille. Q määrittää laukaistaanko häiriö (mukaan lukien EMF biologisilla resonanssitaajuuksilla) patologiseksi oskillaatioksi:",
    equationSteps: [
      "Q = ω₀ / (2γ), missä ω₀ = luonnollinen vaihtelutaajuus, γ = netto-GABAerginen vaimennus",
      "Q → ∞: ei vaimennusta (neonataaliaivot, GABA eksitatorinen) — mikä tahansa resonanssisyöte vahvistuu fataalisti",
      "Q ~ 20–50: matala vaimennus — kynnys ylittyy helposti → kohtaukset",
      "Q ~ 5–15: kohtalainen vaimennus — CSD leviää mutta pysähtyy uurteisiin → migreeninaura",
      "Q ~ 1–5: robusti vaimennus (normaali aikuinen) — vaihtelut sammuvat itsestään 2–3 syklin sisällä",
    ],

    clinicalTitle: "Kliininen todentaminen",
    clinicalDesc: "Q-tekijämalli esittää tarkan, testattavan väitteen: jokaisen tehokkaan neurologisen lääkkeen näille seitsemälle tilalle pitäisi muokata joko γ:tä (vaimennusta) tai resonanssisyötettä. Tämä on vahvistettu kaikkien lääkeluokkien osalta — ks. neurologisen spektrin näyttösivu täydelliselle epilepsialääkkeiden kalsiumkartalle.",

    emfTitle: "EMF resonanssisyötteenä",
    emfDesc: "Q-tekijämalli selittää miksi EMF-bioeffektit ovat taajuusriippuvaisia ja miksi ICNIRP:n SAR-rajat eivät ennusta biologisia vaikutuksia:",
    emfPoints: [
      "López-Martín 2006/2009: GSM + subkonvulsiivinen pikrotoksiini → kohtaukset aikuisilla rotilla. Kumpikaan yksin ei riitä. Pikrotoksiini vähentää γ:tä; GSM tarjoaa resonanssisyötteen.",
      "Pulssimoduloitu GSM (217 Hz) on tehokkaampi kuin jatkuva aalto — pulsaatiokuvio vastaa biologista resonanssia, ei kantoaaltotaajuutta.",
      "ELF-priming: krooninen 50/60 Hz -altistus säätelee α2δ-1:tä (CACNA2D1) ylöspäin → enemmän VGCC:itä synapseissa → alempi Q-kynnys → lisääntynyt herkkyys kaikille seitsemälle tilalle.",
      "Neonataalijohtopäätös: neonataaliaivoissa on endogeenisesti alentunut γ (NKCC1 > KCC2). EMF:n yksin — ilman farmakologista GABA-vähennystä — pitäisi riittää CSD:n laukaisemiseen vastasyntyneillä. Tämä on SIDS-mekanismi.",
    ],

    linkNeuro: "Täysi kliininen näyttö: Neurologinen spektri",
    linkPharm: "Lääke-ristikartta: Farmakologinen näyttö",
    linkPredictions: "Testattavat ennusteet",
  },
  ja: {
    title: "Q因子スペクトル",
    subtitle: "一つの減衰振動子方程式が7つの神経経路を支配します。唯一の変数はγ — 正味のGABA作動性減衰係数です。γが減少するとQが増加し、システムは共鳴駆動のspreading depolarizationに対して感受性を持つようになります。",
    backLink: "← モデルに戻る",
    cautionText: "Q因子モデルは、7つの神経学的状態を共通のカルシウム依存性振動メカニズムの下に統合する理論的枠組みです。これは確立された医学的ガイダンスではありません。現在の標準的な治療法は引き続き適切です。",

    equationTitle: "支配方程式",
    equationDesc: "7つの経路すべてが単一の減衰調和振動子にマッピングされます。Qは、摂動（生物学的共鳴周波数でのEMFを含む）が病理学的振動を引き起こすかどうかを決定します：",
    equationSteps: [
      "Q = ω₀ / (2γ)、ここでω₀ = 固有振動周波数、γ = 正味GABA作動性減衰",
      "Q → ∞：減衰なし（新生児脳、GABA興奮性）— いかなる共鳴入力も致命的に増幅",
      "Q ~ 20–50：低減衰 — 閾値が容易に超過 → 発作",
      "Q ~ 5–15：中程度の減衰 — CSDは伝播するが脳溝で停止 → 片頭痛前兆",
      "Q ~ 1–5：堅牢な減衰（正常成人）— 振動は2〜3サイクル以内に自己終了",
    ],

    clinicalTitle: "臨床的検証",
    clinicalDesc: "Q因子モデルは具体的で検証可能な主張を行います：これら7つの状態に対するすべての有効な神経学的薬剤は、γ（減衰）または共鳴入力のいずれかを修正するべきです。これはすべての薬物クラスにわたって確認されています — 完全な抗てんかん薬カルシウムマップについては神経学的スペクトルエビデンスページを参照してください。",

    emfTitle: "共鳴入力としてのEMF",
    emfDesc: "Q因子モデルは、EMF生物効果が周波数依存性である理由と、ICNIRPのSAR制限が生物学的効果を予測できない理由を説明します：",
    emfPoints: [
      "López-Martín 2006/2009：GSM + 亜けいれん性ピクロトキシン → 成体ラットで発作。単独では不十分。ピクロトキシンはγを減少させ、GSMは共鳴入力を提供。",
      "パルス変調GSM（217 Hz）は連続波より効果的 — パルスパターンは搬送周波数ではなく生物学的共鳴に一致。",
      "ELFプライミング：慢性的な50/60 Hz曝露はα2δ-1（CACNA2D1）を上方制御 → シナプスでのVGCC増加 → Q閾値の低下 → 7つの状態すべてに対する感受性の増加。",
      "新生児予測：新生児脳は内因性にγが低下（NKCC1 > KCC2）。EMF単独で — 薬理学的GABA減少なしに — 新生児でCSDを引き起こすのに十分なはずです。これがSIDSメカニズムです。",
    ],

    linkNeuro: "完全な臨床エビデンス：神経学的スペクトル",
    linkPharm: "薬物クロスマップ：薬理学的エビデンス",
    linkPredictions: "検証可能な予測",
  },
  fr: {
    title: "Spectre du facteur Q",
    subtitle: "Une seule équation d'oscillateur amorti gouverne sept voies neuronales. La seule variable est γ — le coefficient d'amortissement GABAergique net. Lorsque γ diminue, Q augmente, et le système devient susceptible à la dépolarisation propagée par résonance.",
    backLink: "← Retour au modèle",
    cautionText: "Le modèle du facteur Q est un cadre théorique qui unifie sept conditions neurologiques sous un mécanisme commun d'oscillation dépendant du calcium. Ceci n'est pas un avis médical établi. Les traitements standards actuels restent appropriés.",

    equationTitle: "L'équation gouvernante",
    equationDesc: "Les sept voies se cartographient sur un seul oscillateur harmonique amorti. Q détermine si une perturbation (incluant l'EMF aux fréquences de résonance biologiques) déclenche une oscillation pathologique :",
    equationSteps: [
      "Q = ω₀ / (2γ), où ω₀ = fréquence d'oscillation naturelle, γ = amortissement GABAergique net",
      "Q → ∞ : pas d'amortissement (cerveau néonatal, GABA excitatoire) — toute entrée résonante s'amplifie fatalement",
      "Q ~ 20–50 : faible amortissement — seuil facilement dépassé → crises",
      "Q ~ 5–15 : amortissement modéré — la CSD se propage mais s'arrête aux sillons → aura migraineuse",
      "Q ~ 1–5 : amortissement robuste (adulte normal) — les oscillations s'auto-terminent en 2–3 cycles",
    ],

    clinicalTitle: "Validation clinique",
    clinicalDesc: "Le modèle du facteur Q fait une affirmation spécifique et testable : chaque médicament neurologique efficace pour ces sept conditions devrait modifier soit γ (amortissement), soit l'entrée résonante. Ceci est confirmé pour toutes les classes de médicaments — voir la page d'évidence du spectre neurologique pour la carte complète du calcium des antiépileptiques.",

    emfTitle: "L'EMF comme entrée résonante",
    emfDesc: "Le modèle du facteur Q explique pourquoi les bioeffets de l'EMF sont dépendants de la fréquence et pourquoi les limites SAR de l'ICNIRP ne prédisent pas les effets biologiques :",
    emfPoints: [
      "López-Martín 2006/2009 : GSM + picrotoxine subconvulsive → crises chez les rats adultes. Ni l'un ni l'autre seul n'est suffisant. La picrotoxine réduit γ ; le GSM fournit l'entrée résonante.",
      "Le GSM à modulation pulsée (217 Hz) est plus efficace que l'onde continue — le motif de pulsation correspond à la résonance biologique, pas à la fréquence porteuse.",
      "Amorçage ELF : l'exposition chronique à 50/60 Hz régule à la hausse α2δ-1 (CACNA2D1) → plus de VGCCs aux synapses → seuil Q plus bas → susceptibilité accrue aux sept conditions.",
      "Prédiction néonatale : le cerveau néonatal a un γ endogènement réduit (NKCC1 > KCC2). L'EMF seul — sans réduction pharmacologique du GABA — devrait suffire à déclencher la CSD chez les nouveau-nés. C'est le mécanisme du SIDS.",
    ],

    linkNeuro: "Évidence clinique complète : Spectre neurologique",
    linkPharm: "Carte croisée des médicaments : Évidence pharmacologique",
    linkPredictions: "Prédictions testables",
  },
  ko: {
    title: "Q인자 스펙트럼",
    subtitle: "하나의 감쇠 진동자 방정식이 7개의 신경 경로를 지배합니다. 유일한 변수는 γ — 순 GABA성 감쇠 계수입니다. γ가 감소하면 Q가 증가하고, 시스템은 공명 구동 spreading depolarization에 감수성을 갖게 됩니다.",
    backLink: "← 모델로 돌아가기",
    cautionText: "Q인자 모델은 7개의 신경학적 상태를 공통의 칼슘 의존적 진동 메커니즘 하에 통합하는 이론적 프레임워크입니다. 이것은 확립된 의학적 지침이 아닙니다. 현재의 표준 치료법이 여전히 적절합니다.",

    equationTitle: "지배 방정식",
    equationDesc: "7개의 경로 모두가 단일 감쇠 조화 진동자에 매핑됩니다. Q는 섭동(생물학적 공명 주파수에서의 EMF 포함)이 병리학적 진동을 유발하는지 결정합니다:",
    equationSteps: [
      "Q = ω₀ / (2γ), 여기서 ω₀ = 고유 진동 주파수, γ = 순 GABA성 감쇠",
      "Q → ∞: 감쇠 없음 (신생아 뇌, GABA 흥분성) — 모든 공명 입력이 치명적으로 증폭",
      "Q ~ 20–50: 낮은 감쇠 — 역치가 쉽게 초과 → 발작",
      "Q ~ 5–15: 중간 감쇠 — CSD가 전파되지만 뇌구에서 정지 → 편두통 전조",
      "Q ~ 1–5: 견고한 감쇠 (정상 성인) — 진동이 2~3 사이클 내에 자체 종료",
    ],

    clinicalTitle: "임상적 검증",
    clinicalDesc: "Q인자 모델은 구체적이고 검증 가능한 주장을 합니다: 이 7가지 상태에 대한 모든 효과적인 신경학적 약물은 γ(감쇠) 또는 공명 입력을 수정해야 합니다. 이것은 모든 약물 클래스에 걸쳐 확인되었습니다 — 완전한 항간질 약물 칼슘 지도는 신경학적 스펙트럼 증거 페이지를 참조하십시오.",

    emfTitle: "공명 입력으로서의 EMF",
    emfDesc: "Q인자 모델은 EMF 생물효과가 주파수 의존적인 이유와 ICNIRP SAR 한계가 생물학적 효과를 예측하지 못하는 이유를 설명합니다:",
    emfPoints: [
      "López-Martín 2006/2009: GSM + 아경련 피크로톡신 → 성체 쥐에서 발작. 단독으로는 불충분. 피크로톡신은 γ를 감소시키고; GSM은 공명 입력을 제공.",
      "펄스 변조 GSM (217 Hz)이 연속파보다 효과적 — 펄스 패턴은 반송 주파수가 아닌 생물학적 공명에 일치.",
      "ELF 프라이밍: 만성적 50/60 Hz 노출은 α2δ-1 (CACNA2D1)을 상향 조절 → 시냅스에서 VGCC 증가 → Q 역치 감소 → 7가지 상태 모두에 대한 감수성 증가.",
      "신생아 예측: 신생아 뇌는 내인적으로 γ가 감소 (NKCC1 > KCC2). EMF 단독으로 — 약리학적 GABA 감소 없이 — 신생아에서 CSD를 유발하기에 충분해야 합니다. 이것이 SIDS 메커니즘입니다.",
    ],

    linkNeuro: "완전한 임상 증거: 신경학적 스펙트럼",
    linkPharm: "약물 교차 지도: 약리학적 증거",
    linkPredictions: "검증 가능한 예측",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle.slice(0, 160) };
}

export default async function QFactorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/model`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>

      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />

      <CautionBox className="mt-8">{d.cautionText}</CautionBox>

      {/* Interactive Q-factor spectrum */}
      <section className="mt-12">
        <QFactorSpectrum locale={locale} />
      </section>

      {/* Governing equation */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.equationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.equationDesc}</p>
        <div className="space-y-2 rounded-xl border border-card-border bg-card-bg p-5">
          {d.equationSteps.map((step, i) => (
            <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "font-mono text-accent font-medium" : "text-foreground-muted pl-4 border-l-2 border-card-border"}`}>
              {step}
            </p>
          ))}
        </div>
      </section>

      {/* Clinical validation */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.clinicalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.clinicalDesc}</p>
      </section>

      {/* EMF as resonant input */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold mb-2">{d.emfTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.emfDesc}</p>
        <ul className="space-y-3">
          {d.emfPoints.map((point, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-accent/30">{point}</li>
          ))}
        </ul>
      </section>

      {/* Navigation links */}
      <section className="mt-14 pb-8 flex flex-wrap gap-3">
        <Link href={`${prefix}/evidence/neurological-spectrum`} className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm hover:border-accent/40 hover:text-accent transition-colors">
          {d.linkNeuro} →
        </Link>
        <Link href={`${prefix}/evidence/pharmacology`} className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm hover:border-accent/40 hover:text-accent transition-colors">
          {d.linkPharm} →
        </Link>
        <Link href={`${prefix}/predictions`} className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm hover:border-accent/40 hover:text-accent transition-colors">
          {d.linkPredictions} →
        </Link>
      </section>
    </div>
  );
}
