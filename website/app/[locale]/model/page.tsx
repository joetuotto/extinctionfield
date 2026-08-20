import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { FieldStateStatus } from "@/components/FieldStateStatus";

type Principle = { num: string; title: string; text: string };
type Pathway = {
  id: string;
  mechanism: string;
  status: string;
  scale: string;
  share: string;
  responds: string;
};

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  architectureTitle: string;
  architecture: readonly Principle[];
  pathwayTitle: string;
  pathwayIntro: string;
  pathways: readonly Pathway[];
  pathwayNote: string;
  pathwayHeaders: {
    pathway: string;
    mechanism: string;
    status: string;
    scale: string;
    share: string;
    responds: string;
  };
  versionTitle: string;
  versionText: readonly string[];
  subpages: {
    fieldstateTitle: string;
    fieldstateText: string;
    mathTitle: string;
    mathText: string;
  };
  evidenceLink: string;
  predictionsLink: string;
  next: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "BERM model specification",
    subtitle:
      "FieldState–ASFR v2 architecture with BERM v18 evidence and predictions. A measurement-aware research specification from a physics premise to organ-specific reproductive states, age-specific fertility and TFR.",
    metaTitle: "BERM model specification – Extinction Field",
    metaDescription:
      "The FieldState–ASFR-v2 architecture with BERM v18 evidence and predictions.",
    architectureTitle: "What the active model does — and does not — claim",
    architecture: [
      {
        num: "01",
        title: "Physics premise",
        text: "Lindgren-derived geometry is retained as an upstream structural hypothesis: a measured response may depend on background, vector direction, angle, phase and spectral content. It is not an independently validated estimate of human reproductive effect size.",
      },
      {
        num: "02",
        title: "Biological route",
        text: "The model registers bounded study-to-node evidence for physical signatures, cellular intermediates and reproductive endpoints. A record can support one link without proving the complete route from a field to a population outcome.",
      },
      {
        num: "03",
        title: "Demographic route",
        text: "Age-specific fertility rates are modelled before TFR. Couple capacity, demand/opportunity, tempo and ART/live-birth delivery are separate terms, so a period TFR trend is never treated as a direct gonadal measurement.",
      },
    ],
    pathwayTitle: "Pathway hierarchy",
    pathwayIntro:
      "The Lindgren geometry analysis inverted the original BERM pathway hierarchy. Pathway C (radical-pair / cryptochrome) is now primary; pathway A (VGCC) is demoted to secondary because it requires biological amplifiers the geometry does not supply.",
    pathways: [
      { id: "C", mechanism: "CRY → melatonin → HPG", status: "PRIMARY", scale: "nT", share: "25%", responds: "RMS" },
      { id: "A", mechanism: "δV_m → Ca²⁺ → ROS", status: "SECONDARY", scale: "mV", share: "45%", responds: "Peak" },
      { id: "B", mechanism: "DC / BBB permeability", status: "Not derived", scale: "V/m", share: "15%", responds: "RMS" },
      { id: "D", mechanism: "HPA / dopaminergic", status: "Not derived", scale: "varies", share: "15%", responds: "Peak" },
      { id: "E", mechanism: "Microbiome", status: "Not derived", scale: "varies", share: "—", responds: "—" },
    ],
    pathwayNote:
      "85% of BERM pathways by weight (A + B_peak + D) respond to peak field, not RMS. This is why FieldState measurement must preserve pulse structure. Only pathway C responds to time-averaged power.",
    pathwayHeaders: { pathway: "Pathway", mechanism: "Mechanism", status: "Status", scale: "Scale", share: "Share", responds: "Responds to" },
    versionTitle: "Model version status",
    versionText: [
      "The active specification is FieldState–ASFR v2. It does not currently publish calibrated country-level TFR forecasts because the required matched national FieldState–biomarker–couple–ASFR panel has not been assembled.",
      "Locked predictions on the Predictions page use the v17/v18 scalar-exposure architecture. Both architectures remain visible for comparison.",
    ],
    subpages: {
      fieldstateTitle: "FieldState measurement specification",
      fieldstateText: "What a v2 record must contain: organ-specific transfer, vector direction, pulse structure, circadian context and provenance. Includes the registered causal route diagram.",
      mathTitle: "Mathematical specification (§1–§8)",
      mathText: "The equations that state the active data contract, organ-state structure and validation boundary. Includes the cohort-timing signal analysis.",
    },
    evidenceLink: "Evidence registry",
    predictionsLink: "Locked predictions",
    next: "Continue to",
  },
  fi: {
    title: "BERM-mallin määrittely",
    subtitle:
      "FieldState–ASFR v2 -arkkitehtuuri BERM v18 -evidenssillä ja ennusteilla. Mittaustietoinen tutkimusmäärittely fysiikan premissistä elinkohtaisiin lisääntymistiloihin, ikäkohtaiseen hedelmällisyyteen ja TFR:ään.",
    metaTitle: "BERM-mallin määrittely – Extinction Field",
    metaDescription:
      "FieldState–ASFR-v2-arkkitehtuuri BERM v18 -evidenssillä ja ennusteilla.",
    architectureTitle: "Mitä aktiivinen malli väittää — ja mitä se ei väitä",
    architecture: [
      {
        num: "01",
        title: "Fysiikan premissi",
        text: "Lindgrenistä johdettu geometria säilyy upstream-rakennehypoteesina: mitattu vaste voi riippua taustasta, vektorin suunnasta, kulmasta, vaiheesta ja spektrisisällöstä. Se ei ole itsenäisesti validoitu arvio ihmisen lisääntymisvaikutuksen koosta.",
      },
      {
        num: "02",
        title: "Biologinen reitti",
        text: "Malli rekisteröi rajattua tutkimus–solmu-evidenssiä fysikaalisille allekirjoituksille, soluvälivaiheille ja lisääntymispäätepisteille. Tietue voi tukea yhtä lenkkiä todistamatta koko reittiä kentästä väestötulokseen.",
      },
      {
        num: "03",
        title: "Demografinen reitti",
        text: "Ikäkohtaiset hedelmällisyysluvut mallinnetaan ennen TFR:ää. Parikapasiteetti, kysyntä/mahdollisuus, tempo ja ART/live-birth-delivery pidetään erillisinä, joten periodin TFR-trendiä ei käsitellä suorana gonadimittauksena.",
      },
    ],
    pathwayTitle: "Polkuhierarkia",
    pathwayIntro:
      "Lindgrenin geometria-analyysi käänsi BERM:n alkuperäisen polkuhierarkian. Polku C (radikaalipari / kryptokromi) on nyt primäärinen; polku A (VGCC) on sekundaarinen, koska se tarvitsee biologisia vahvistimia joita geometria ei tuota.",
    pathways: [
      { id: "C", mechanism: "CRY → melatoniini → HPG", status: "PRIMÄÄRINEN", scale: "nT", share: "25%", responds: "RMS" },
      { id: "A", mechanism: "δV_m → Ca²⁺ → ROS", status: "SEKUNDAARINEN", scale: "mV", share: "45%", responds: "Huippu" },
      { id: "B", mechanism: "DC / BBB-läpäisevyys", status: "Ei johdettu", scale: "V/m", share: "15%", responds: "RMS" },
      { id: "D", mechanism: "HPA / dopaminerginen", status: "Ei johdettu", scale: "vaihtelee", share: "15%", responds: "Huippu" },
      { id: "E", mechanism: "Mikrobiomi", status: "Ei johdettu", scale: "vaihtelee", share: "—", responds: "—" },
    ],
    pathwayNote:
      "85 % BERM:n polkupainosta (A + B_peak + D) vastaa huippukenttään, ei RMS:ään. Siksi FieldState-mittauksen on säilytettävä pulssirakenne. Vain polku C vastaa aikakeskiarvoistettuun tehoon.",
    pathwayHeaders: { pathway: "Polku", mechanism: "Mekanismi", status: "Tila", scale: "Skaala", share: "Osuus", responds: "Vastaa" },
    versionTitle: "Mallin versiotila",
    versionText: [
      "Aktiivinen määrittely on FieldState–ASFR v2. Se ei tällä hetkellä julkaise kalibroituja maakohtaisia TFR-ennusteita, koska tarvittavaa kohdistettua kansallista FieldState–biomarkkeri–pari–ASFR-paneelia ei ole koottu.",
      "Lukitut ennusteet Ennusteet-sivulla käyttävät v17/v18:n skalaarialtistusarkkitehtuuria. Molemmat arkkitehtuurit pysyvät näkyvissä vertailua varten.",
    ],
    subpages: {
      fieldstateTitle: "FieldState-mittausmäärittely",
      fieldstateText: "Mitä v2-tietueen on sisällettävä: elinkohtainen siirto, vektorin suunta, pulssirakenne, vuorokausikonteksti ja provenienssi. Sisältää rekisteröidyn kausaalireittikaavion.",
      mathTitle: "Matemaattinen määrittely (§1–§8)",
      mathText: "Yhtälöt, jotka määrittelevät aktiivisen datakontraktin, elintilarakenteen ja validaatiorajan. Sisältää kohortti-ajoitussignaalianalyysin.",
    },
    evidenceLink: "Evidenssirekisteri",
    predictionsLink: "Lukitut ennusteet",
    next: "Jatka",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: d.metaTitle, description: d.metaDescription };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = t[language];
  const h = d.pathwayHeaders;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-4xl border-b border-card-border pb-9">
        <div className="editorial-kicker mb-4 inline-flex items-center gap-2 text-accent">
          <GitBranch size={14} aria-hidden="true" />
          FieldState–ASFR v2
        </div>
        <h1 className="mb-4 text-4xl sm:text-5xl">{d.title}</h1>
        <p className="editorial-deck">{d.subtitle}</p>
      </header>

      <FieldStateStatus locale={language} />

      <section className="mt-12 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.architectureTitle}</h2>
        <div className="grid md:grid-cols-3 md:divide-x md:divide-card-border">
          {d.architecture.map((item) => (
            <article key={item.title} className="border-t border-card-border py-5 md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
              <p className="font-mono-num text-xs text-accent">{item.num}</p>
              <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-card-border pt-6">
        <h2 className="editorial-section-heading mb-4">{d.pathwayTitle}</h2>
        <p className="mb-6 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.pathwayIntro}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-xs uppercase tracking-wider text-foreground-muted">
                <th className="pb-2 pr-4 font-medium">{h.pathway}</th>
                <th className="pb-2 pr-4 font-medium">{h.mechanism}</th>
                <th className="pb-2 pr-4 font-medium">{h.status}</th>
                <th className="pb-2 pr-4 font-medium">{h.scale}</th>
                <th className="pb-2 pr-4 font-medium">{h.share}</th>
                <th className="pb-2 font-medium">{h.responds}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/50">
              {d.pathways.map((pw) => (
                <tr key={pw.id}>
                  <td className="py-2 pr-4 font-mono-num font-semibold text-accent">{pw.id}</td>
                  <td className="py-2 pr-4 text-foreground-muted">{pw.mechanism}</td>
                  <td className="py-2 pr-4">
                    <span className={pw.status.includes("PRIMARY") || pw.status.includes("PRIMÄÄRINEN") ? "font-semibold text-accent" : "text-foreground-muted"}>
                      {pw.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-mono-num text-foreground-muted">{pw.scale}</td>
                  <td className="py-2 pr-4 font-mono-num text-foreground-muted">{pw.share}</td>
                  <td className="py-2 font-mono-num text-foreground-muted">{pw.responds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-4xl rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
          {d.pathwayNote}
        </p>
      </section>

      <section className="mt-14 border-t border-card-border pt-6">
        <h2 className="editorial-section-heading mb-4">{d.versionTitle}</h2>
        <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
          {d.versionText.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/${language}/model/fieldstate`}
          className="group rounded-xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/40"
        >
          <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">{d.subpages.fieldstateTitle}</h3>
          <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.subpages.fieldstateText}</p>
          <p className="mt-3 text-xs font-medium text-accent">{d.next} →</p>
        </Link>
        <Link
          href={`/${language}/model/math`}
          className="group rounded-xl border border-card-border bg-card-bg p-5 transition-colors hover:border-accent/40"
        >
          <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">{d.subpages.mathTitle}</h3>
          <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{d.subpages.mathText}</p>
          <p className="mt-3 text-xs font-medium text-accent">{d.next} →</p>
        </Link>
      </section>

      <nav className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href={`/${language}/evidence`} className="text-accent hover:underline">{d.evidenceLink} →</Link>
        <Link href={`/${language}/predictions`} className="text-accent hover:underline">{d.predictionsLink} →</Link>
      </nav>
    </div>
  );
}
