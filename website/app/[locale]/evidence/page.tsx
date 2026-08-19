import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import {
  causalNodeLabels,
  FIELDSTATE_EVIDENCE,
  LEGACY_EVIDENCE_MIGRATION,
  type FieldStateDirectness,
} from "@/lib/fieldstateEvidence";

const ORDER: FieldStateDirectness[] = [
  "PHYSICS_SIGNATURE",
  "MECHANISTIC_INTERMEDIATE",
  "REPRODUCTIVE_ENDPOINT",
  "ECOLOGICAL_ENDPOINT",
  "SYSTEMATIC_REVIEW",
  "POPULATION_DESCRIPTIVE",
];

const COPY = {
  en: {
    title: "Evidence register",
    subtitle: "A bounded register for the FieldState–ASFR-v2 causal route. Every entry identifies what it can support and what it cannot translate into.",
    interpretationTitle: "How to read this register",
    interpretation: [
      "A field signature can support a measurement variable such as background vector, angle, spectrum or envelope; it does not establish human fertility effects.",
      "A cellular or animal experiment can support a mechanistic intermediate or organ endpoint within its stated conditions; it is not automatically a human population estimate.",
      "A review locates a body of literature. A population timing result is descriptive unless matched FieldState, endpoint and confounding controls are present.",
      "No record below is a TFR coefficient. A country TFR pathway requires the separate ASFR and demographic terms in the model specification.",
    ],
    provenanceTitle: "Evidence provenance",
    provenance: `The source-qualified bibliography retains ${LEGACY_EVIDENCE_MIGRATION.recordCount} records for continuing review. ${LEGACY_EVIDENCE_MIGRATION.activeAliases} have matching bounded active records, ${LEGACY_EVIDENCE_MIGRATION.migrationCandidates} are ready for source-level review, and the remaining records are classified by their stated research role.`,
    groups: {
      PHYSICS_SIGNATURE: "Physics signatures",
      MECHANISTIC_INTERMEDIATE: "Mechanistic intermediates",
      REPRODUCTIVE_ENDPOINT: "Reproductive endpoints",
      ECOLOGICAL_ENDPOINT: "Ecological endpoints",
      SYSTEMATIC_REVIEW: "Systematic reviews",
      POPULATION_DESCRIPTIVE: "Population-descriptive data",
    },
    fields: { nodes: "Causal nodes", field: "Field class", scope: "Translation scope", limitations: "Limitations", role: "Calibration role", source: "DOI / source" },
    structural: "Structural only",
    contextual: "Context only",
    sentinelTitle: "Sentinel and cross-species evidence",
    sentinel: "The Cross-Species Lag Index is a readiness protocol for joining regional outcomes, measured FieldState and endpoint covariates in a registered cross-species test.",
    sentinelLink: "View sentinel readiness",
  },
  fi: {
    title: "Evidenssirekisteri",
    subtitle: "Rajattu rekisteri FieldState–ASFR-v2:n kausaalireitille. Jokaisesta tietueesta käy ilmi, mitä se voi tukea ja mihin se ei käänny.",
    interpretationTitle: "Kuinka rekisteriä luetaan",
    interpretation: [
      "Kenttäallekirjoitus voi tukea mittausmuuttujaa, kuten taustavektoria, kulmaa, spektriä tai verhokäyrää; se ei osoita ihmisen hedelmällisyysvaikutusta.",
      "Solu- tai eläinkoe voi tukea mekanistista väliporrasta tai elinpäätepistettä omissa oloissaan; se ei automaattisesti ole ihmisväestön estimaatti.",
      "Katsaus paikantaa tutkimuskokonaisuuden. Väestön ajoitustulos on kuvaileva, ellei kohdistettu FieldState, päätepiste ja sekoittajien hallinta ole mukana.",
      "Mikään alla oleva tietue ei ole TFR-kerroin. Maakohtainen TFR-reitti tarvitsee erilliset ASFR- ja demografiset termit mallin määrittelyn mukaisesti.",
    ],
    provenanceTitle: "Evidenssin provenienssi",
    provenance: `Lähdekohtainen bibliografia säilyttää ${LEGACY_EVIDENCE_MIGRATION.recordCount} tietuetta jatkotarkistusta varten. ${LEGACY_EVIDENCE_MIGRATION.activeAliases} vastaa rajattua aktiivista tietuetta, ${LEGACY_EVIDENCE_MIGRATION.migrationCandidates} on valmiina lähdetason tarkistukseen ja loppuosan tutkimusrooli on luokiteltu erikseen.`,
    groups: {
      PHYSICS_SIGNATURE: "Fysiikan allekirjoitukset",
      MECHANISTIC_INTERMEDIATE: "Mekanistiset välivaiheet",
      REPRODUCTIVE_ENDPOINT: "Lisääntymisen päätepisteet",
      ECOLOGICAL_ENDPOINT: "Ekologiset päätepisteet",
      SYSTEMATIC_REVIEW: "Systemaattiset katsaukset",
      POPULATION_DESCRIPTIVE: "Väestötason kuvaileva data",
    },
    fields: { nodes: "Kausaalisolmut", field: "Kenttäluokka", scope: "Tulkintaraja", limitations: "Rajoitukset", role: "Kalibrointirooli", source: "DOI / lähde" },
    structural: "Vain rakenne",
    contextual: "Vain konteksti",
    sentinelTitle: "Sentinelli- ja lajienvälinen evidenssi",
    sentinel: "Cross-Species Lag Index on valmiusprotokolla, joka yhdistää alueelliset vasteet, mitatun FieldStaten ja päätepistekovariaatit rekisteröityyn lajienväliseen testiin.",
    sentinelLink: "Katso sentinellin valmiustila",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">{d.interpretationTitle}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
          {d.interpretation.map((item, index) => (
            <li key={item} className="border border-card-border bg-card-bg rounded-lg p-4 text-sm text-foreground-muted leading-relaxed">
              <span className="font-mono-num text-accent mr-2">0{index + 1}</span>{item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14 max-w-4xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-6">
        <h2 className="text-xl font-semibold mb-2">{d.provenanceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.provenance}</p>
      </section>

      <section className="mb-14"><FieldStateStatus locale={activeLocale} /></section>

      {ORDER.map((directness) => {
        const records = FIELDSTATE_EVIDENCE.filter((record) => record.directness === directness);
        if (!records.length) return null;
        return (
          <section key={directness} className="mb-14">
            <h2 className="text-xl font-semibold mb-4">{d.groups[directness]}</h2>
            <div className="grid gap-4">
              {records.map((record) => (
                <article key={record.id} className="border border-card-border bg-card-bg rounded-xl p-5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold">{record.citation}</h3>
                      <p className="text-xs text-foreground-muted mt-1">{record.studyType} · {record.system}</p>
                    </div>
                    <span className="text-xs font-mono-num rounded border border-card-border px-2 py-1 text-foreground-muted">{record.year}</span>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4">{record.finding}</p>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs leading-relaxed">
                    <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.nodes}</dt><dd className="text-foreground-muted">{causalNodeLabels(record.causalNodes, activeLocale).join(" · ")}</dd></div>
                    <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.field}</dt><dd className="text-foreground-muted">{record.fieldClass}</dd></div>
                    <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.scope}</dt><dd className="text-foreground-muted">{record.scope}</dd></div>
                    <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.limitations}</dt><dd className="text-foreground-muted">{record.limitations.join("; ")}</dd></div>
                  </dl>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded bg-background-secondary px-2 py-1 text-foreground-muted">{d.fields.role}: {record.calibrationRole === "STRUCTURAL_ONLY" ? d.structural : d.contextual}</span>
                    <a href={record.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{d.fields.source} ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-14 rounded-xl border border-status-partial/30 bg-status-partial/5 p-6 max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">{d.sentinelTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.sentinel}</p>
        <Link href={`/${activeLocale}/sentinel`} className="text-sm text-accent hover:underline">{d.sentinelLink} →</Link>
      </section>

      <StatisticalValidation locale={activeLocale} />
    </div>
  );
}
