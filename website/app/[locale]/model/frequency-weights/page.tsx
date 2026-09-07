import type { Metadata } from "next";
import Link from "next/link";
import { Radio } from "lucide-react";

import { CautionBox } from "@/components/CautionBox";
import { FrequencyWeightsExplorer } from "@/components/FrequencyWeightsExplorer";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";

const COPY = {
  en: {
    title: "Frequency Weights",
    subtitle: "An inspectable candidate factorization for turning a measured spectrum into endpoint-specific weighted input.",
    caution: "w_L is an imported BERM bridge proposal, not a result derived from the 2025 Lindgren geometry. The L2 operator remains open. The controls below are illustrative scenarios, not fitted biological weights.",
  },
  fi: {
    title: "Taajuuspainot",
    subtitle: "Tarkastettava ehdokasfaktorointi mitatun spektrin muuntamiseksi päätepistekohtaisesti painotetuksi syötteeksi.",
    caution: "w_L on tuotu BERM-siltaehdotus, ei vuoden 2025 Lindgren-geometriasta johdettu tulos. L2-operaattori on avoin. Alla olevat säädöt ovat havainnollisia skenaarioita, eivät sovitettuja biologisia painoja.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function FrequencyWeightsPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <PageHeader icon={Radio} title={d.title} subtitle={d.subtitle} />
        <CautionBox className="mt-8">{d.caution}</CautionBox>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">1. {fi ? "Ehdokaskaava" : "Candidate equation"}</h2>
          <p className="mt-4 rounded-xl border border-card-border bg-card-bg p-5 text-center font-mono text-sm sm:text-base">
            w_L(endpoint, f) = SAR_norm(f) × coupling(endpoint, f) × modulation(f)
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <FactorCard
              label="SAR_norm"
              text={fi ? "Spektri- ja geometriakohtainen absorptiotermi. Vaatii määritellyn kehon, asennon ja dosimetrian." : "Spectrum- and geometry-specific absorption term. Requires a defined body, posture and dosimetry."}
            />
            <FactorCard
              label="coupling"
              text={fi ? "Päätepistekohtainen biologinen kytkentäehdotus. Ei ole sama asia kuin SAR." : "Endpoint-specific biological coupling proposal. It is not interchangeable with SAR."}
            />
            <FactorCard
              label="modulation"
              text={fi ? "Aaltomuodon, pulssituksen ja käyttösuhteen ehdokaskerroin. Vaatii mitatun aikarakenteen." : "Candidate factor for waveform, pulsing and duty cycle. Requires measured temporal structure."}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">2. {fi ? "Skenaariotyökalu" : "Scenario tool"}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">
            {fi
              ? "Työkalu näyttää vain tulosäännön herkkyyden. Arvon muuttaminen ei estimoi altistusta, annosta tai terveysvaikutusta."
              : "The tool shows only the sensitivity of the product rule. Changing a value does not estimate exposure, dose or a health effect."}
          </p>
          <div className="mt-6">
            <FrequencyWeightsExplorer locale={locale} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">3. {fi ? "Mittausketju" : "Measurement chain"}</h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {(fi ? [
              "Mittaa paikallinen spektri, vektorit, vaihe/koherenssi ja käyttösuhde proveniensseineen.",
              "Määritä keho- ja päätepistekohtainen siirto sekä dosimetria.",
              "Arvioi jokainen w_L-tekijä erikseen ja säilytä epävarmuus.",
              "Syötä painotettu aikasarja DKC:lle vasta tämän jälkeen.",
            ] : [
              "Measure the local spectrum, vectors, phase/coherence and duty cycle with provenance.",
              "Specify body- and endpoint-specific transfer and dosimetry.",
              "Estimate each w_L factor separately and retain uncertainty.",
              "Only then pass the weighted time series to the DKC calculation.",
            ]).map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-card-border bg-card-bg p-4 text-sm leading-relaxed text-foreground-muted">
                <span className="font-mono-num font-semibold text-accent">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${locale}/measurement/fieldstate`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
              {fi ? "FieldState-mittaussopimus" : "FieldState measurement contract"} →
            </Link>
            <Link href={`/${locale}/model/comparison`} className="rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
              {fi ? "Mallivertailu" : "Model comparison"} →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FactorCard({ label, text }: { label: string; text: string }) {
  return (
    <article className="rounded-xl border border-card-border bg-card-bg p-5">
      <h3 className="font-mono text-sm font-semibold text-accent">{label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{text}</p>
    </article>
  );
}
