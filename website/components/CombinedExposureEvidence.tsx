import Link from "next/link";
import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { MathBlock } from "@/components/MathBlock";
import { StudyCitation } from "@/components/StudyCitation";
import { CombinedFieldThresholdFigure } from "@/components/CombinedFieldThresholdFigure";
import { CombinedExposureDiagram } from "@/components/CombinedExposureDiagram";
import { COMBINED_EXPOSURE_COPY } from "@/lib/combinedExposureData";
import { pickCopy } from "@/lib/i18n";

export const COMBINED_SECTION_IDS = ["model-composition", "contraceptive-state", "material-device", "component-studies", "channel-conditions", "proxy-masking", "implemented-model"] as const;

export function CombinedExposureEvidence({ locale }: { locale: string }) {
  const d = pickCopy({ en: COMBINED_EXPOSURE_COPY.en, fi: COMBINED_EXPOSURE_COPY.fi }, locale);
  const p = (text: string) => <p className="text-base leading-7 text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  const refs = (ids: readonly string[]) => <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">{ids.map(referenceId => <StudyCitation key={referenceId} referenceId={referenceId} locale={locale} />)}</div>;
  return <>
    <nav aria-label={d.contents} className="mb-10 grid gap-x-6 gap-y-3 rounded-xl border border-card-border p-5 sm:grid-cols-2">{COMBINED_SECTION_IDS.map((id, i) => <a key={id} href={`#${id}`} className="text-sm leading-6 text-accent underline-offset-4 hover:underline"><span className="mr-2 font-mono text-xs">0{i + 1}</span>{d.sections[i]}</a>)}</nav>
    <section id={COMBINED_SECTION_IDS[0]} className="scroll-mt-28 space-y-5">
      <h2 className="editorial-section-heading">{d.sections[0]}</h2>
      <p className="text-lg leading-8"><ClaimRef claimId="claim.synergy.state-conditioned-coexposure">{d.model}</ClaimRef></p>
      <CombinedExposureDiagram locale={locale} />
      <details className="rounded-lg border border-card-border p-5">
        <summary className="cursor-pointer font-semibold">{d.mathTitle}</summary>
        <div className="mt-5 space-y-4">{p(d.geometry)}<MathBlock tex={String.raw`\Delta g_{\mu\nu}=\kappa\left(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu\right),\qquad a=\sum_p a_p`} /><MathBlock tex={String.raw`\delta\langle O_i\rangle=\Xi_i[\mathcal S_i(L_{\leq t},D_{\leq t},\ldots)](\Delta g)`} />{p(d.bridge)}</div>
      </details>
    </section>
    <section id={COMBINED_SECTION_IDS[1]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[1]}</h2>
      <p className="text-lg leading-8"><ClaimRef claimId="claim.synergy.contraceptive-receiver-state">{d.drugLead}</ClaimRef></p>
      <div className="space-y-6">{d.drugCards.map(card => <div id={card.id} key={card.id} className="scroll-mt-28 border-l-2 border-accent/40 pl-5"><h3 className="mb-3 text-lg font-semibold">{card.title}</h3>{p(card.text)}</div>)}</div>
    </section>
    <section id={COMBINED_SECTION_IDS[2]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[2]}</h2>
      <p className="text-lg leading-8"><ClaimRef claimId="claim.synergy.material-device-transfer">{d.materialLead}</ClaimRef></p>
      <figure className="rounded-xl border border-card-border bg-figure-bg p-5 sm:p-7"><figcaption className="mb-5 font-serif text-xl">{d.pocketTitle}</figcaption><ol className="grid gap-4 sm:grid-cols-2">{d.pocket.map((item, i) => <li key={item.title} className="min-w-0 rounded-lg bg-card-bg p-4"><h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-xs text-accent">0{i + 1}</span>{item.title}</h3><p className="text-sm leading-6 text-foreground-muted">{item.text}</p></li>)}</ol></figure>
      {p(d.materialScope)}
      <h3 className="text-lg font-semibold">{d.chemicalTitle}</h3>{p(d.chemicalText)}
    </section>
    <section id={COMBINED_SECTION_IDS[3]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[3]}</h2>{p(d.studiesLead)}
      <div className="grid gap-4 md:grid-cols-2">{d.studies.map(study => <div key={study.title} className="min-w-0 rounded-lg border border-card-border p-5"><h3 className="mb-3 text-lg font-semibold">{study.title}</h3><p className="text-base leading-7">{study.finding}</p><p className="mt-3 text-sm leading-6 text-foreground-muted">{study.implication}</p>{refs(study.refs)}</div>)}</div>
      <CombinedFieldThresholdFigure locale={locale} />
      <details className="rounded-lg border border-card-border p-5"><summary className="cursor-pointer font-semibold">{d.anatomyTitle}</summary><div className="mt-4">{p(d.anatomyDetail)}</div></details>
    </section>
    <section id={COMBINED_SECTION_IDS[4]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[4]}</h2>{p(d.candidatesLead)}
      {d.candidates.map(candidate => <div key={candidate.title}><h3 className="mb-3 text-lg font-semibold">{candidate.title}</h3>{p(candidate.text)}</div>)}
    </section>
    <section id={COMBINED_SECTION_IDS[5]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[5]}</h2>{p(d.proxyLead)}
      <ul className="list-disc space-y-3 pl-5 text-base leading-7 text-foreground-muted">{d.proxyPoints.map(point => <li key={point}>{point}</li>)}</ul>
      {p(d.composition)}{p(d.standards)}
    </section>
    <section id={COMBINED_SECTION_IDS[6]} className="mt-14 scroll-mt-28 space-y-5 border-t editorial-rule pt-8">
      <h2 className="editorial-section-heading">{d.sections[6]}</h2>{p(d.implementationLead)}
      <MathBlock tex={String.raw`I_{12}^{\mathrm{add}}=Y_{11}-Y_{10}-Y_{01}+Y_{00}`} />{p(d.interactionMeaning)}
      <a href="/data/combined-exposures.json" className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4">{d.dataLink} (JSON) →</a>
    </section>
    <nav aria-label={d.linksTitle} className="mt-14 border-t editorial-rule pt-8"><h2 className="editorial-section-heading mb-5">{d.linksTitle}</h2><div className="flex flex-wrap gap-x-6 gap-y-3">{[
      ["/model/proxy-masking#joint-exposures", "Proxy masking"],
      ["/evidence/pharmacology", locale === "fi" ? "Farmakologinen näyttö" : "Pharmacological evidence"],
      ["/biology/calcium-redox-steroidogenesis", locale === "fi" ? "Kalsium, redox ja hormonituotanto" : "Calcium, redox and hormone production"],
      ["/evidence/technology", locale === "fi" ? "Teknologia ja altistuminen" : "Technology and exposure"],
      ["/measurement/fieldstate", locale === "fi" ? "Fysikaalisen tilan mittaaminen" : "Physical-state measurement"],
    ].map(([href, label]) => <Link key={href} href={`/${locale}${href}`} className="text-sm text-accent hover:underline">{label} →</Link>)}</div></nav>
  </>;
}
