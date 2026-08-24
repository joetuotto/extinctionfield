import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Pain Pathways (DRG)",
    subtitle:
      "Cav3.2 T-type calcium channels in dorsal root ganglion nociceptors",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Cav3.2 — The Primary Pain Channel --- */
    s1SectionTitle: "Cav3.2 — The Primary Pain Channel",

    channelProfile: "Channel Profile",
    channel: "Channel",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    cav3Subtype: "Cav3.2 (CACNA1H) — dominant T-type in DRG",
    cellTypeVal: "Nociceptors (dorsal root ganglion)",
    functionVal: "Peripheral pain sensing, neuronal excitability",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) is the dominant T-type calcium channel in DRG nociceptors — it controls neuronal excitability at the peripheral pain sensing level.",
      "Cav3.2 expression and activity are significantly upregulated in both inflammatory and neuropathic pain models.",
      "T-type channel blockers are effective analgesics in multiple pain models, confirming the causal role of these channels in pain signaling.",
      "This is the same Cav3.2 channel that BERM identifies as the PRIMARY EMF TRANSDUCER — the channel sits at a bifurcation point where ~10% are open at resting potential (window current).",
    ],

    /* --- SECTION 2: Sex Differences in Pain --- */
    s2SectionTitle: "Sex Differences in Pain",

    s2Points: [
      "Brain (Oxford) 2026: functional Cav3.2 expression in human DRG neurons shows sex differences.",
      "Female DRG neurons show more prominent Cav3.2 currents.",
      "This aligns with the well-documented clinical observation that chronic pain conditions disproportionately affect women.",
      "From the BERM perspective: if EMF perturbs Cav3.2 in DRG neurons, the sex-differential expression predicts stronger EMF-pain sensitization in females.",
    ],
    s2EpidemicNote:
      "Chronic pain epidemic: hundreds of millions affected globally. This is one of the largest unresolved medical challenges worldwide.",

    /* --- SECTION 3: EMF and Pain Sensitization --- */
    s3SectionTitle: "EMF and Pain Sensitization",

    s3Mechanism: "Mechanism chain",
    s3MechanismText:
      "EMF → Cav3.2 perturbation in DRG → Ca²⁺ influx ↑ → neuronal excitability ↑ → pain threshold ↓",

    s3UnifyingTitle: "Unifying mechanism",
    s3UnifyingText:
      "The same T-type bifurcation mechanism that operates in Leydig cells (fertility) and thalamocortical neurons (sleep) operates in DRG nociceptors (pain). This is NOT a separate hypothesis — it is the same biophysical mechanism in a different cell type.",

    s3WarningLabel: "Sensitive topic — methodological note",
    s3Warning:
      "Chronic pain affects hundreds of millions of people. The mechanism described here is a MECHANISTIC FINDING from the BERM framework — NOT a treatment recommendation. Do NOT present this as medical advice. Patients should consult their healthcare providers regarding pain management.",

    s3PredTitle: "Key prediction",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model. This is testable in existing neuropathic pain models by adding an EMF exposure arm and comparing Cav3.2 blocker efficacy with and without EMF.",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionic connection",
    s3TheraBionicText:
      "The TheraBionic device — FDA-approved for hepatocellular carcinoma — targets Cav3.2 channels with non-thermal EMF. This confirms that Cav3.2 responds to non-thermal EMF at therapeutic levels, providing independent validation that the channel is an EMF transducer.",

    /* References */
    refsTitle: "Key references",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "Cav3.2 in chronic pain (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: Cav3.2 sex differences in human DRG",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    /* See also */
    seeAlso: "See also",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — PAIN-1",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Kipureitit (DRG)",
    subtitle:
      "Cav3.2 T-tyypin kalsiumkanavat selkäytimen takajuuren ganglion nosiseptoreissa",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Cav3.2 — Ensisijainen kipukanava --- */
    s1SectionTitle: "Cav3.2 — Ensisijainen kipukanava",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    cav3Subtype: "Cav3.2 (CACNA1H) — hallitseva T-tyyppi DRG:ssä",
    cellTypeVal: "Nosiseptorit (selkäytimen takajuuren gangliot)",
    functionVal: "Perifeerinen kipuaistimus, hermosolun ärtyvyys",
    levelVal: "M|C",

    s1Points: [
      "Cav3.2 (CACNA1H) on hallitseva T-tyypin kalsiumkanava DRG-nosiseptoreissa — se kontrolloi hermosolun ärtyvyyttä perifeerisellä kipuaistimuksen tasolla.",
      "Cav3.2-ekspressio ja -aktiivisuus ovat merkittävästi ylössäädeltyjä sekä tulehduksellisissa että neuropaattisissa kipumalleissa.",
      "T-tyypin kanavien salpaajat ovat tehokkaita analgeetteja useissa kipumalleissa, mikä vahvistaa näiden kanavien kausaalisen roolin kipusignaloinnissa.",
      "Tämä on sama Cav3.2-kanava, jonka BERM tunnistaa ENSISIJAISEKSI EMF-TRANSDUSERIKSI — kanava on bifurkaatiopisteessä, jossa ~10 % on auki lepokalvopotentiaalissa (ikkuna-virta).",
    ],

    /* --- OSIO 2: Sukupuolierot kivussa --- */
    s2SectionTitle: "Sukupuolierot kivussa",

    s2Points: [
      "Brain (Oxford) 2026: funktionaalinen Cav3.2-ekspressio ihmisen DRG-neuroneissa osoittaa sukupuolieroja.",
      "Naisten DRG-neuronit osoittavat voimakkaampia Cav3.2-virtoja.",
      "Tämä on linjassa hyvin dokumentoidun kliinisen havainnon kanssa, että krooniset kiputilat vaikuttavat suhteettomasti naisiin.",
      "BERM-näkökulmasta: jos EMF häiritsee Cav3.2:ta DRG-neuroneissa, sukupuolisidonnainen ekspressioero ennustaa voimakkaampaa EMF-kipuherkistymistä naisilla.",
    ],
    s2EpidemicNote:
      "Krooninen kipuepidemia: satoja miljoonia ihmisiä kärsii maailmanlaajuisesti. Tämä on yksi suurimmista ratkaisemattomista lääketieteellisistä haasteista.",

    /* --- OSIO 3: EMF ja kipuherkistyminen --- */
    s3SectionTitle: "EMF ja kipuherkistyminen",

    s3Mechanism: "Mekanismiketju",
    s3MechanismText:
      "EMF → Cav3.2-häiriö DRG:ssä → Ca²⁺-virtaus ↑ → hermosolun ärtyvyys ↑ → kipukynnys ↓",

    s3UnifyingTitle: "Yhdistävä mekanismi",
    s3UnifyingText:
      "Sama T-tyypin bifurkaatiomekanismi, joka toimii Leydigin soluissa (hedelmällisyys) ja talamokortikaalissa neuroneissa (uni), toimii DRG-nosiseptoreissa (kipu). Tämä EI ole erillinen hypoteesi — se on sama biofysikaalinen mekanismi eri solutyypissä.",

    s3WarningLabel: "Herkkä aihe — metodologinen huomautus",
    s3Warning:
      "Krooninen kipu vaikuttaa satoihin miljooniin ihmisiin. Tässä kuvattu mekanismi on MEKANISTINEN LÖYDÖS BERM-kehyksestä — EI hoitosuositus. ÄLÄ esitä tätä lääketieteellisenä neuvona. Potilaiden tulee konsultoida terveydenhuollon ammattilaisiaan kivunhoidon suhteen.",

    s3PredTitle: "Keskeinen ennuste",
    s3Pred: {
      id: "PAIN-1",
      text: "Cav3.2-salpaaja vaimentaa EMF-indusoitua kipuherkistymistä eläinmallissa. Tämä on testattavissa olemassa olevissa neuropaattisissa kipumalleissa lisäämällä EMF-altistusryhmä ja vertaamalla Cav3.2-salpaajan tehoa EMF-altistuksen kanssa ja ilman.",
      discriminating: true,
    },

    s3TheraBionic: "TheraBionic-yhteys",
    s3TheraBionicText:
      "TheraBionic-laite — FDA-hyväksytty hepatosellulaariseen karsinoomaan — kohdistuu Cav3.2-kanaviin ei-termisellä EMF:llä. Tämä vahvistaa, että Cav3.2 reagoi ei-termiseen EMF:ään terapeuttisilla tasoilla, tarjoten riippumattoman validaation kanavan roolista EMF-transduserina.",

    /* Viitteet */
    refsTitle: "Keskeiset viitteet",
    refs: [
      {
        id: "cav32-chronic-pain-2021",
        label: "Cav3.2 kroonisessa kivussa (2021)",
      },
      {
        id: "brain-2026-cav32-human-drg",
        label: "Brain 2026: Cav3.2 sukupuolierot ihmisen DRG:ssä",
      },
      {
        id: "therabionic-ebioMedicine-2019",
        label: "TheraBionic — eBioMedicine (2019)",
      },
    ],

    /* Katso myös */
    seeAlso: "Katso myös",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — PAIN-1",
    evidencePage: "Evidenssirekisteri",
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

export default async function PainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Zap} title={d.title} subtitle={d.subtitle} />

      {/* ===================================================
          SECTION 1 -- Cav3.2: The Primary Pain Channel
          =================================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 -- Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
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

      {/* 02 -- Key Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {activeLocale === "fi" ? "Keskeinen evidenssi" : "Key Evidence"}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s1Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===================================================
          SECTION 2 -- Sex Differences in Pain
          =================================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Sex-Differential Expression */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {activeLocale === "fi"
            ? "Sukupuolisidonnainen ekspressio"
            : "Sex-Differential Expression"}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s2Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s2EpidemicNote}
          </p>
        </div>
      </section>

      {/* ===================================================
          SECTION 3 -- EMF and Pain Sensitization
          =================================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 04 -- Mechanism Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s3Mechanism}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="text-sm text-foreground font-mono leading-relaxed tracking-wide">
            {d.s3MechanismText}
          </p>
        </div>
      </section>

      {/* 05 -- Unifying Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s3UnifyingTitle}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3UnifyingText}
          </p>
        </div>
      </section>

      {/* Sensitive topic warning */}
      <section className="mb-16">
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            {d.s3WarningLabel}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Warning}
          </p>
        </div>
      </section>

      {/* 06 -- Key Prediction */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s3PredTitle}
        </h3>
        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-mono-num text-xs font-bold text-accent">
              {d.s3Pred.id}
            </span>
            {d.s3Pred.discriminating && (
              <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Pred.text}
          </p>
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {activeLocale === "fi"
              ? "Kaikki ennusteet →"
              : "All predictions →"}
          </Link>
        </div>
      </section>

      {/* 07 -- TheraBionic */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s3TheraBionic}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s3TheraBionicText}
        </p>
      </section>

      {/* Key references */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.refsTitle}
        </h3>
        <ul className="space-y-1">
          {d.refs.map((ref) => (
            <li key={ref.id} className="text-sm text-foreground-muted">
              <code className="text-xs text-accent font-mono">{ref.id}</code>
              {" — "}
              {ref.label}
            </li>
          ))}
        </ul>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
