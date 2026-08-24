import type { Metadata } from "next";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Pancreas",
    subtitle:
      "Glucose-dependent EMF susceptibility via Cav1 + Cav3 in beta-cells",
    backLink: "← Back to Modulome",
    comingSoon: "Full analysis coming in a future update",
    underDev:
      "This organ page is under development. The full analysis — including detailed mechanism chains, complete evidence tables, and testable predictions — will be published in a future update.",
    channelProfile: "Channel Profile",
    emfEvidence: "EMF Evidence Summary",
    chiAnalysis: "Lindgren χ Analysis",
    prediction: "Key Prediction",
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    channel: "Channel",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    cav3Subtype: "Cav1 (L-type) + Cav3 (T-type)",
    cellTypeVal: "β-cell → Insulin",
    functionVal:
      "Glucose-stimulated insulin secretion via VGCC → Ca²⁺",
    levelVal: "M|C",
    emfEvidenceText:
      "Sakurai 2008: ELF reduced insulin secretion ~30% in hamster islets. Electric field stimulation induces insulin secretion via L-type VGCCs WITHOUT glucose. EMF decreased insulin levels and pancreatic islet area in exposed rats.",
    chiAnalysisText:
      "GLUCOSE-DEPENDENT χ: High glucose → K_ATP close → Vmem depolarizes → VGCCs primed → χ_β-cell MAXIMUM. Fasting → K_ATP open → χ_β-cell LOW. EMF × high-GI diet = synergistic diabetes risk.",
    predictionText:
      "EMF effect on insulin is glucose-dependent. At high glucose: Ca²⁺ overload → β-cell exhaustion → diabetes. At low glucose: minimal effect.",
  },
  fi: {
    title: "Haima",
    subtitle:
      "Glukoosiriippuvainen EMF-herkkyys Cav1 + Cav3 kautta beetasoluissa",
    backLink: "← Takaisin moduloomiin",
    comingSoon: "Koko analyysi julkaistaan tulevassa päivityksessä",
    underDev:
      "Tämä elinsivu on kehitteillä. Koko analyysi — yksityiskohtaiset mekanismiketjut, täydelliset evidenssitaulukot ja testattavat ennusteet — julkaistaan tulevassa päivityksessä.",
    channelProfile: "Kanavaprofiili",
    emfEvidence: "EMF-evidenssin yhteenveto",
    chiAnalysis: "Lindgren χ -analyysi",
    prediction: "Keskeinen ennuste",
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    channel: "Kanava",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    cav3Subtype: "Cav1 (L-tyyppi) + Cav3 (T-tyyppi)",
    cellTypeVal: "β-solu → Insuliini",
    functionVal:
      "Glukoosistimuloitu insuliinisekretio VGCC → Ca²⁺ kautta",
    levelVal: "M|C",
    emfEvidenceText:
      "Sakurai 2008: ELF vähensi insuliinisekreetiota ~30 % hamsterin saarekkeissa. Sähkökentän stimulaatio indusoi insuliinisekreetiota L-tyypin VGCC:n kautta ILMAN glukoosia. EMF laski insuliinitasoja ja haiman saarekealaa altistuneilla rotilla.",
    chiAnalysisText:
      "GLUKOOSIRIIPPUVAINEN χ: Korkea glukoosi → K_ATP sulkeutuu → Vmem depolarisoituu → VGCC:t viritetty → χ_β-solu MAKSIMI. Paasto → K_ATP auki → χ_β-solu MATALA. EMF × korkean GI:n ruokavalio = synergistinen diabetesriski.",
    predictionText:
      "EMF:n vaikutus insuliiniin on glukoosiriippuvainen. Korkealla glukoosilla: Ca²⁺-ylikuormitus → β-solun uupuminen → diabetes. Matalalla glukoosilla: minimaalinen vaikutus.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function PancreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Droplets} title={d.title} subtitle={d.subtitle} />

      {/* Channel Profile */}
      <section className="mb-10 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.cav3Subtype}</span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* EMF Evidence */}
      <section className="mb-10 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.emfEvidence}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.emfEvidenceText}
        </p>
      </section>

      {/* Chi Analysis */}
      <section className="mb-10 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.chiAnalysis}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.chiAnalysisText}
          </p>
        </div>
      </section>

      {/* Prediction */}
      <section className="mb-10 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.prediction}
        </h3>
        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.predictionText}
          </p>
        </div>
      </section>

      {/* Coming soon notice */}
      <section className="mb-10 bg-card rounded-lg border border-card-border p-6 text-center">
        <p className="text-sm font-semibold text-accent mb-2">{d.comingSoon}</p>
        <p className="text-xs text-foreground-muted leading-relaxed max-w-2xl mx-auto">
          {d.underDev}
        </p>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <Link
          href={`/${locale}/modulome`}
          className="text-sm text-accent hover:underline"
        >
          {d.modulomeOverview} &rarr;
        </Link>
      </section>
    </div>
  );
}
