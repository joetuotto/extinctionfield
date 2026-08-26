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
      "Q = ω₀ / (2γ), missä ω₀ = luonnollinen oskillaatiotaajuus, γ = netto-GABAerginen vaimennus",
      "Q → ∞: ei vaimennusta (neonataaliaivot, GABA eksitatorinen) — mikä tahansa resonanssisyöte vahvistuu fataalisti",
      "Q ~ 20–50: matala vaimennus — kynnys ylittyy helposti → kohtaukset",
      "Q ~ 5–15: kohtalainen vaimennus — CSD leviää mutta pysähtyy uurteisiin → migreeninaura",
      "Q ~ 1–5: robusti vaimennus (normaali aikuinen) — oskillaatiot sammuvat itsestään 2–3 syklin sisällä",
    ],

    clinicalTitle: "Kliininen validaatio",
    clinicalDesc: "Q-tekijämalli esittää spesifisen, testattavan väitteen: jokaisen tehokkaan neurologisen lääkkeen näille seitsemälle tilalle pitäisi muokata joko γ:tä (vaimennusta) tai resonanssisyötettä. Tämä on vahvistettu kaikkien lääkeluokkien osalta — ks. neurologisen spektrin evidenssisivu täydelliselle epilepsialääkkeiden kalsiumkartalle.",

    emfTitle: "EMF resonanssisyötteenä",
    emfDesc: "Q-tekijämalli selittää miksi EMF-bioeffektit ovat taajuusriippuvaisia ja miksi ICNIRP:n SAR-rajat eivät ennusta biologisia vaikutuksia:",
    emfPoints: [
      "López-Martín 2006/2009: GSM + subkonvulsiivinen pikrotoksiini → kohtaukset aikuisilla rotilla. Kumpikaan yksin ei riitä. Pikrotoksiini vähentää γ:tä; GSM tarjoaa resonanssisyötteen.",
      "Pulssimoduloitu GSM (217 Hz) on tehokkaampi kuin jatkuva aalto — pulsaatiokuvio vastaa biologista resonanssia, ei kantoaaltotaajuutta.",
      "ELF-priming: krooninen 50/60 Hz -altistus säätelee α2δ-1:tä (CACNA2D1) ylöspäin → enemmän VGCC:itä synapseissa → alempi Q-kynnys → lisääntynyt herkkyys kaikille seitsemälle tilalle.",
      "Neonataalijohtopäätös: neonataaliaivoissa on endogeenisesti alentunut γ (NKCC1 > KCC2). EMF:n yksin — ilman farmakologista GABA-vähennystä — pitäisi riittää CSD:n laukaisemiseen vastasyntyneillä. Tämä on SIDS-mekanismi.",
    ],

    linkNeuro: "Täysi kliininen evidenssi: Neurologinen spektri",
    linkPharm: "Lääke-ristikartta: Farmakologinen evidenssi",
    linkPredictions: "Testattavat ennusteet",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle.slice(0, 160) };
}

export default async function QFactorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
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
