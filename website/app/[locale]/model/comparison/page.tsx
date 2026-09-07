import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { CautionBox } from "@/components/CautionBox";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { DKC_FRAMEWORK } from "@/lib/dkcFramework";

const COPY = {
  en: {
    title: "DKC Model Comparison",
    subtitle: "A pre-specified M0–M4 comparison contract with BIC, country holdout and temporal holdout—without declaring a winner before eligible data exist.",
    caution: "No M0–M4 winner is published. The current national series are technology-timing proxies, the two kernel regressors are highly collinear, and M4 is not identifiable without spectral and endpoint-matched measurements.",
  },
  fi: {
    title: "DKC-mallivertailu",
    subtitle: "Ennalta määritelty M0–M4-vertailusopimus BIC:llä, maaholdoutilla ja ajallisella holdoutilla ilman voittajan julistamista ennen kelvollista aineistoa.",
    caution: "M0–M4-voittajaa ei ole julkaistu. Nykyiset kansalliset sarjat ovat teknologia-aikaproksia, kahden ytimen regressorit ovat vahvasti kollineaarisia eikä M4 ole identifioitavissa ilman spektri- ja päätepistekohdistettuja mittauksia.",
  },
} as const;

const FI_MODELS: Record<string, [string, string]> = {
  M0: ["Nollamalli", "Vakio-TFR-verrokki"],
  M1: ["Kumulatiivinen proksi", "Vanha kumulatiivinen teknologia-aikaproksi"],
  M2: ["Yksi eksponenttiydin", "Yksi normalisoitu viiveydin"],
  M3: ["Perus-DKC", "Kaksi normalisoitua ydintä ja rajattu Hill-kartoitus"],
  M4: ["Tarkennettu DKC", "T1–T12-ehdokaslaskenta"],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ModelComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fi = locale === "fi";
  const d = fi ? COPY.fi : COPY.en;

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <p className="mb-6">
          <Link href={`/${locale}/model/dual-kernel`} className="text-sm text-accent hover:underline">
            {fi ? "← Takaisin DKC-kehykseen" : "← Back to the DKC framework"}
          </Link>
        </p>
        <PageHeader icon={BarChart3} title={d.title} subtitle={d.subtitle} />
        <CautionBox className="mt-8">{d.caution}</CautionBox>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">1. M0–M4</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-card-border">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="border-b border-card-border bg-card-bg text-left text-xs uppercase tracking-wide text-foreground-muted">
                <tr>
                  <th className="px-4 py-3">{fi ? "Malli" : "Model"}</th>
                  <th className="px-4 py-3">{fi ? "Parametrit" : "Parameters"}</th>
                  <th className="px-4 py-3">{fi ? "Kuvaus" : "Description"}</th>
                  <th className="px-4 py-3">{fi ? "Nykytila" : "Current status"}</th>
                  <th className="px-4 py-3">BIC</th>
                </tr>
              </thead>
              <tbody>
                {DKC_FRAMEWORK.modelFamilies.map((model) => {
                  const translated = FI_MODELS[model.id];
                  return (
                    <tr key={model.id} className="border-b border-card-border last:border-b-0">
                      <td className="px-4 py-3 font-mono-num font-semibold text-accent">{model.id}</td>
                      <td className="px-4 py-3 font-mono-num text-xs">{model.parameters}</td>
                      <td className="px-4 py-3">
                        <span className="font-medium">{fi && translated ? translated[0] : model.name}</span>
                        <span className="mt-1 block text-xs text-foreground-muted">{fi && translated ? translated[1] : model.description}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground-muted">
                        {model.id === "M4" ? "NOT_IDENTIFIABLE_WITH_CURRENT_DATA" : (fi ? "Vertailusopimus valmis" : "Comparison contract ready")}
                      </td>
                      <td className="px-4 py-3 font-mono-num text-xs">{fi ? "ei arvioitu" : "not scored"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-card-border bg-card-bg p-4 font-mono text-sm">
            BIC = n_obs × ln(MSE) + k × ln(n_obs)
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">2. {fi ? "Ennalta määritellyt ruudukot" : "Pre-specified grids"}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <GridCard
              title={fi ? "Perusruudukko" : "Base grid"}
              count="8 × 8 × 7 = 448"
              lines={["tau_B: 0.5…5 y (8)", "tau_R: 5…25 y (8)", "alpha: 0.1…0.7 (7)"]}
              note={fi ? "Seitsemässä deklaroidussa pisteessä tau_B = tau_R = 5. Ne säilyvät auditointia varten, mutta S1-raja sulkee ne sovituksesta: 441 sallittua pistettä." : "Seven declared points have tau_B = tau_R = 5. They remain in the audit grid, but the S1 constraint excludes them from fitting: 441 admissible points."}
            />
            <GridCard
              title={fi ? "Tarkennettu ruudukko" : "Refined grid"}
              count="6 × 6 × 5 × 6 × 4 = 4320"
              lines={["tau_B: 0.3…2 y (6)", "tau_R: 5…20 y (6)", "alpha: 0.2…0.6 (5)", "n: 1.0…3.5 (6)", "n_B: 2…5 (4)"]}
              note={fi ? "Kaikki pisteet täyttävät tau_R > tau_B -rajan. beta johdetaan aina kaavalla 1 − alpha." : "Every point satisfies tau_R > tau_B. Beta is always derived as 1 − alpha."}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">3. {fi ? "Vuotamaton arviointijärjestys" : "Leakage-free evaluation order"}</h2>
          <ol className="mt-5 space-y-3">
            {(fi ? [
              "Lukitse syötteen provenienssi: PROXY tai mitattu FieldState; älä sekoita niitä.",
              "Sovita jokainen parametrikandidaatti vain harjoitusmaihin.",
              "Jätä yksi maa kokonaan pois ja arvioi se koskematta sen tuloksiin sovituksessa.",
              "Toista kaikille maille ja laske LOOCV-virhe sekä BIC ilman ennakkoon määrättyä voittajaa.",
              "Ajallisessa testissä sovita vuoteen 2015 ja arvioi 2016–2024; UN WPP:n vuoden 2024 projektio ei kelpaa havainnoksi, joten WPP:n pisteytys päättyy vuoteen 2023.",
              "Lukitse ennuste vasta ulkoisen validoinnin ja identifioitavuustestin jälkeen.",
            ] : [
              "Lock input provenance as PROXY or measured FieldState; never merge the two classes.",
              "Fit each parameter candidate on training countries only.",
              "Hold out one complete country and evaluate it without using its outcomes in fitting.",
              "Repeat for every country and calculate LOOCV error and BIC without a pre-declared winner.",
              "For temporal validation, fit through 2015 and evaluate 2016–2024; the UN WPP 2024 projection is not an observation, so WPP scoring ends in 2023.",
              "Lock a forecast only after external validation and an identifiability test.",
            ]).map((step, index) => (
              <li key={step} className="flex gap-4 rounded-xl border border-card-border bg-card-bg p-4 text-sm leading-relaxed text-foreground-muted">
                <span className="font-mono-num font-semibold text-accent">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 rounded-xl border border-red-500/30 bg-red-500/5 p-5">
          <h2 className="font-semibold">{fi ? "Nykyinen identifioitavuustulos" : "Current identifiability result"}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Nykyisessä monotonisessa teknologia-aikaproksissa nopea ja hidas regressori korreloivat yli 0,98. Positiivisuusrajoitettu hidas paino painuu nollaan, joten tau_R:ää ja alpha/(1−alpha)-jakoa ei voida lukita tästä aineistosta. Tämä on tulos, ei puuttuva käyttöliittymäarvo."
              : "In the current monotonic technology-timing proxy, the fast and slow regressors correlate above 0.98. The positivity-constrained slow weight collapses to zero, so tau_R and the alpha/(1−alpha) split cannot be locked from this dataset. This is a result, not a missing interface value."}
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/explore?tab=dkc`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
            {fi ? "Tutki parametriherkkyyttä" : "Explore parameter sensitivity"} →
          </Link>
          <Link href={`/${locale}/predictions`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
            {fi ? "F1–F9 / E1–E6 / S0–S6" : "F1–F9 / E1–E6 / S0–S6"} →
          </Link>
        </div>
      </div>
    </main>
  );
}

function GridCard({ title, count, lines, note }: { title: string; count: string; lines: string[]; note: string }) {
  return (
    <article className="rounded-xl border border-card-border bg-card-bg p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 font-mono-num text-sm text-accent">{count}</p>
      <ul className="mt-4 space-y-1 font-mono text-xs text-foreground-muted">
        {lines.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-foreground-muted">{note}</p>
    </article>
  );
}
