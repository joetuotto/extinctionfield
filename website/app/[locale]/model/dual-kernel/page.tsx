import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

import { CautionBox } from "@/components/CautionBox";
import { DkcExplorer } from "@/components/DkcExplorer";
import { DkcPublicationGate } from "@/components/DkcPublicationGate";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { DKC_FRAMEWORK } from "@/lib/dkcFramework";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Dual-Kernel Convolution",
    subtitle: "A candidate Lindgren-DKC route with two normalized memory kernels, a bounded Hill response and an explicit open bridge between geometry and observables.",
    caution: "The candidate DKC FieldState calibration pipeline is implemented and produces values, and forecasts F1–F9 are content-addressed and locked. The evaluator also accepts explicitly uncalibrated sensitivity inputs. National mobile, broadband and urban series remain technology-timing proxies—not measured doses—and the Lindgren L2 geometry-to-observable operator remains open.",
    derivation: "Derivation boundary",
    dkc: "DKC calculation",
    refinements: "T1–T12 refinement register",
    data: "What is available now",
    next: "Continue",
    back: "← Back to model",
    boundaryNote: "The algebraic χ_geo(q) shape retains its L1 status. Choosing q=|Ā| through a positive spatial Lorentz-to-Euclidean/scalar projection is an L2 reduction. Any measured quantity or proxy z instead needs an explicit dimensionless normalization q=N(z); choosing and calibrating N is the open L0→L2 step. Frequency weights, biological mechanisms, memory kernels and endpoint mappings keep their own provenance.",
    kernelNote: "T4 uses a normalized Erlang fast kernel (integer n_B = 2–6) and a normalized exponential slow kernel. Beta is not free: beta = 1 − alpha, with tau_R > tau_B. T3 is the explicit cohort schedule v(a): 5 for a<0, 4 for 0≤a<1, 3 for 1≤a<6, 2 for 6≤a<18, otherwise 1.",
  },
  fi: {
    title: "Kaksoisydinkonvoluutio",
    subtitle: "Lindgren-DKC-ehdokasreitti, jossa on kaksi normalisoitua muistiydintä, rajattu Hill-vaste ja eksplisiittisesti avoin silta geometriasta havaittaviin suureisiin.",
    caution: "DKC:n FieldState-kalibrointiputki on toteutettu ja tuottaa arvoja, ja F1–F9 ovat sisältötiivisteillä lukittuja ennusteita. Laskin hyväksyy myös eksplisiittisesti kalibroimattomia herkkyyssyötteitä. Kansalliset mobiili-, laajakaista- ja kaupungistumissarjat pysyvät teknologia-aikaproksina—eivät mitattuina annoksina—ja Lindgrenin L2-silta havaittaviin suureisiin on avoin.",
    derivation: "Johtamisen raja",
    dkc: "DKC-laskenta",
    refinements: "T1–T12-tarkennusrekisteri",
    data: "Mitä aineisto sallii nyt",
    next: "Jatka",
    back: "← Takaisin malliin",
    boundaryNote: "Algebrallinen χ_geo(q)-muoto säilyttää L1-statuksensa. Positiivisen q=|Ā|-koordinaatin valinta Lorentz→Euklidisen spatiaalisen/skalaari-projektion kautta on L2-reduktio. Mitattu suure tai proxy z tarvitsee sen sijaan eksplisiittisen dimensiottoman normalisoinnin q=N(z); N:n valinta ja kalibrointi ovat avoin L0→L2-askel. Muut komponentit säilyttävät oman provenienssinsa.",
    kernelNote: "T4 käyttää normalisoitua Erlang-nopeaa ydintä (kokonaisluku n_B = 2–6) ja normalisoitua eksponentiaalista hidasta ydintä. Beta ei ole vapaa: beta = 1 − alpha ja tau_R > tau_B. T3 on eksplisiittinen kohorttiaikataulu v(a): 5 kun a<0, 4 kun 0≤a<1, 3 kun 1≤a<6, 2 kun 6≤a<18, muutoin 1.",
  },
  ja: {
    title: "二重カーネル畳み込み",
    subtitle: "2つの正規化記憶カーネル、有限のHill応答、幾何学と観測量の間の明示的に未解決な橋を備えたLindgren-DKC候補経路。",
    caution: "DKCのFieldState較正パイプラインは実装済みで値を生成し、F1〜F9は内容ハッシュで固定された予測である。評価器は明示的な未較正感度入力も受け付ける。国別系列は技術導入時期のプロキシであって測定線量ではなく、観測量へのLindgren L2演算子は未解決である。",
    derivation: "導出境界",
    dkc: "DKC計算",
    refinements: "T1–T12精緻化レジスター",
    data: "現在利用できるもの",
    next: "続ける",
    back: "← モデルに戻る",
    boundaryNote: "代数式χ_geo(q)はL1のままである。正のq=|Ā|をLorentz→Euclid空間・スカラー射影で選ぶ操作はL2縮約である。測定量やプロキシzには別途、明示的な無次元正規化q=N(z)が必要で、その選択と較正は未解決のL0→L2段階である。他の各成分も固有の来歴を保持する。",
    kernelNote: "T4は正規化Erlang高速カーネル（整数n_B=2–6）と正規化指数低速カーネルを用いる。Betaは自由ではなく beta=1−alpha、かつ tau_R>tau_B。T3のコホート重みはv(a)=5 (a<0), 4 (0≤a<1), 3 (1≤a<6), 2 (6≤a<18), その他1である。",
  },
  fr: {
    title: "Convolution à double noyau",
    subtitle: "Une voie candidate Lindgren-DKC avec deux noyaux de mémoire normalisés, une réponse de Hill bornée et un pont explicitement ouvert entre géométrie et observables.",
    caution: "Le pipeline de calibration FieldState de DKC est implémenté et produit des valeurs ; les prévisions F1–F9 sont verrouillées par empreinte de contenu. L’évaluateur accepte aussi des entrées de sensibilité non calibrées. Les séries nationales restent des proxys de calendrier technologique, non des doses mesurées, et l’opérateur L2 vers les observables reste ouvert.",
    derivation: "Frontière de dérivation",
    dkc: "Calcul DKC",
    refinements: "Registre des raffinements T1–T12",
    data: "Ce qui est disponible actuellement",
    next: "Continuer",
    back: "← Retour au modèle",
    boundaryNote: "La formule algébrique χ_geo(q) conserve son statut L1. Choisir q=|Ā| par une projection spatiale/scalarie de Lorentz vers Euclide est une réduction L2. Toute mesure ou tout proxy z exige plutôt une normalisation explicite sans dimension q=N(z), dont le choix et le calibrage restent ouverts en L0→L2. Les autres composants conservent leur propre provenance.",
    kernelNote: "T4 emploie un noyau rapide d’Erlang normalisé (entier n_B=2–6) et un noyau lent exponentiel normalisé. Beta n’est pas libre : beta=1−alpha, avec tau_R>tau_B. T3 utilise explicitement v(a)=5 si a<0, 4 si 0≤a<1, 3 si 1≤a<6, 2 si 6≤a<18, sinon 1.",
  },
  ko: {
    title: "이중 커널 합성곱",
    subtitle: "두 개의 정규화된 기억 커널, 유계 Hill 반응, 기하학과 관측량 사이의 명시적으로 열린 다리를 갖는 Lindgren-DKC 후보 경로.",
    caution: "DKC FieldState 보정 파이프라인은 구현되어 값을 생성하며 F1–F9는 콘텐츠 해시로 잠긴 예측이다. 평가기는 명시적 미보정 민감도 입력도 받는다. 국가별 계열은 기술 도입 시점 프록시이지 측정 선량이 아니며 관측량으로 가는 Lindgren L2 연산자는 열려 있다.",
    derivation: "도출 경계",
    dkc: "DKC 계산",
    refinements: "T1–T12 정교화 레지스터",
    data: "현재 이용 가능한 것",
    next: "계속",
    back: "← 모델로 돌아가기",
    boundaryNote: "대수식 χ_geo(q)는 L1 지위를 유지한다. 양의 q=|Ā|를 Lorentz→Euclid 공간·스칼라 사영으로 선택하는 것은 L2 축약이다. 측정량이나 프록시 z에는 별도의 명시적 무차원 정규화 q=N(z)가 필요하며 그 선택과 보정은 열린 L0→L2 단계다. 다른 구성요소도 각각의 출처를 유지한다.",
    kernelNote: "T4는 정규화 Erlang 고속 커널(정수 n_B=2–6)과 정규화 지수 저속 커널을 쓴다. Beta는 자유롭지 않고 beta=1−alpha이며 tau_R>tau_B이다. T3 코호트 가중치는 v(a)=5 (a<0), 4 (0≤a<1), 3 (1≤a<6), 2 (6≤a<18), 그 밖에는 1이다.",
  },
} as const;

const FI_REFINEMENTS: Record<string, string> = {
  T1: "Maakohtainen jatkuva käyttösuhde",
  T2: "Hill-vasteen eksponentti",
  T3: "Syntymäkohortin haavoittuvuus",
  T4: "Erlang-käyttäytymisydin",
  T5: "Päätepistekohtainen kiveksen SAR-kerroin",
  T6: "Erillinen sisätilojen Wi-Fi-proksi",
  T7: "Päätelaitteen tehonsäätökorjaus",
  T8: "Verkkotiheyden saturaatio",
  T9: "Spektrikompleksisuuden kerroin",
  T10: "Kausivaihtelun ennuste",
  T11: "Melatoniini–redox-synergia",
  T12: "Vanhemman epigeneettinen siirtymä",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function DualKernelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fi = locale === "fi";
  const d = pickCopy(COPY, locale);

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <p className="mb-6">
          <Link href={`/${locale}/model`} className="text-sm text-accent hover:underline">
            {d.back}
          </Link>
        </p>
        <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
        <CautionBox className="mt-8">{d.caution}</CautionBox>
        <div className="mt-8">
          <DkcPublicationGate locale={locale} />
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">1. {d.derivation}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <BoundaryCard label="L0 · LINDGREN 2025" status="PREMISE" formula="g_mu_nu = eta_mu_nu + kappa A_mu A_nu" />
            <BoundaryCard label="L1 · DERIVED" status="DERIVED" formula="delta_g = kappa (A_bio⊗a_ext + a_ext⊗A_bio + a_ext⊗a_ext)" />
            <BoundaryCard label="L1 · GEODESIC DEVIATION" status="DERIVED" formula="D_u sqrt(-det g) = kappa (A·u) / sqrt(1 + kappa A^2)" />
            <BoundaryCard label="L2 · LORENTZ → EUCLIDEAN/SCALAR" status="OPEN CHOICE" formula="q = |A_bar| := sqrt(kappa)s  [dimensionless spatial projection]" />
            <BoundaryCard label="L1 · CHI ALGEBRA" status="DERIVED" formula="chi_geo(q) = q / sqrt(1 + q^2); directional derivative evaluates chi_geo(|A_bar|) after the L2 reduction" />
            <BoundaryCard label="L2 · OBSERVABLE BRIDGE" status="OPEN" formula="O_r = integral K_r^(mu nu) delta_g_mu_nu dV" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {d.boundaryNote}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">2. {d.dkc}</h2>
          <div className="mt-5 space-y-3 rounded-xl border border-card-border bg-card-bg p-5 font-mono text-xs leading-relaxed sm:text-sm">
            <p>T4 fast: k_B(s) = s^(n_B-1) exp(-s/tau_B) / (tau_B^n_B Gamma(n_B)), n_B in 2..6</p>
            <p>annual T4 bins: K_B[l] proportional to CDF_Erlang(l+1) - CDF_Erlang(l)</p>
            <p>slow: k_R(s) = exp(-s/tau_R) / tau_R</p>
            <p>T3: v(a) = 5 (a&lt;0), 4 (a&lt;1), 3 (a&lt;6), 2 (a&lt;18), else 1</p>
            <p>BL(t) = alpha integral k_B(s)x(t-s)ds + beta integral k_R(s)v(a)x(t-s)ds; beta = 1-alpha</p>
            <p>sigma(BL) = BL^n / (x_half^n + BL^n)</p>
            <p>Delta endpoint(t) = -gamma sigma(BL(t))</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {d.kernelNote}
          </p>
          <div className="mt-8">
            <DkcExplorer locale={locale} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">3. {d.refinements}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DKC_FRAMEWORK.refinements.map((item) => (
              <article key={item.id} className="rounded-xl border border-card-border bg-card-bg p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-mono-num text-xs font-semibold text-accent">{item.id}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
                    {item.epistemicStatus}
                  </span>
                </div>
                <h3 className="text-sm font-semibold">{fi ? FI_REFINEMENTS[item.id] : item.name}</h3>
                <p className="mt-2 break-words font-mono text-[11px] leading-relaxed text-foreground-muted">{item.formula}</p>
                <p className="mt-2 text-[11px] text-foreground-muted">
                  {fi ? "Vaihe" : "Stage"} {item.stage} · {fi ? "vapaita parametreja" : "free parameters"}: {item.freeParameters}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">4. {d.data}</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-card-border">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="border-b border-card-border bg-card-bg text-left text-xs uppercase tracking-wide text-foreground-muted">
                <tr>
                  <th className="px-4 py-3">{fi ? "Kerros" : "Layer"}</th>
                  <th className="px-4 py-3">{fi ? "Nykytila" : "Current state"}</th>
                  <th className="px-4 py-3">{fi ? "Sallittu tulkinta" : "Allowed interpretation"}</th>
                </tr>
              </thead>
              <tbody>
                <StatusRow layer="Geometry" state="2025 Weyl ansatz + exact tensor perturbation" interpretation="Premise / derived algebra" />
                <StatusRow layer="L2" state="OPEN" interpretation="No geometry-to-observable claim" />
                <StatusRow layer="National series" state="World Bank mobile, broadband, urban" interpretation="TECHNOLOGY_TIMING_PROXY" />
                <StatusRow layer="FieldState" state="calibration pipeline implemented and producing values; uncalibrated sensitivity inputs also supported" interpretation="Calibration output, proxy class and execution capability kept separate" />
                <StatusRow layer="DKC parameters" state="tau_B, tau_R, alpha and Hill parameters carry L3 provenance" interpretation="They do not relabel L1-derived components" />
                <StatusRow layer="Predictions" state="F1–F9 content-addressed and locked" interpretation="LOCKED_FALSIFIABLE_FORECAST" />
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 border-t border-card-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide">{d.next}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <RouteLink href={`/${locale}/model/frequency-weights`} label={fi ? "Taajuuspainot" : "Frequency weights"} />
            <RouteLink href={`/${locale}/model/comparison`} label={fi ? "Mallivertailu" : "Model comparison"} />
            <RouteLink href={`/${locale}/predictions`} label={fi ? "Falsifikaatiorekisteri" : "Falsification registry"} />
          </div>
        </section>
      </div>
    </main>
  );
}

function BoundaryCard({ label, status, formula }: { label: string; status: string; formula: string }) {
  return (
    <article className="rounded-xl border border-card-border bg-card-bg p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide">{label}</h3>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status === "OPEN" ? "border-red-500/40 text-red-600" : "border-amber-500/40 text-amber-700"}`}>
          {status}
        </span>
      </div>
      <p className="mt-4 break-words font-mono text-xs leading-relaxed text-foreground-muted">{formula}</p>
    </article>
  );
}

function StatusRow({ layer, state, interpretation }: { layer: string; state: string; interpretation: string }) {
  return (
    <tr className="border-b border-card-border last:border-b-0">
      <td className="px-4 py-3 font-medium">{layer}</td>
      <td className="px-4 py-3 text-foreground-muted">{state}</td>
      <td className="px-4 py-3 font-mono-num text-xs text-foreground-muted">{interpretation}</td>
    </tr>
  );
}

function RouteLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent">
      {label}<ArrowRight className="h-4 w-4" />
    </Link>
  );
}
