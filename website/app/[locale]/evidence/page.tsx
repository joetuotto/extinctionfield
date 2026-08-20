import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import {
  causalNodeLabels,
  FIELDSTATE_EVIDENCE,
  FIELDSTATE_EVIDENCE_COUNT,
  type FieldStateDirectness,
} from "@/lib/fieldstateEvidence";
import {
  LEGACY_EVIDENCE_CATALOGUE,
  LEGACY_EVIDENCE_COUNT,
  PATHWAY_LABELS,
  STATUS_LABELS,
  EVIDENCE_LEVEL_LABELS,
} from "@/lib/legacyEvidenceCatalogue";

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
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} bounded FieldState–ASFR v2 records and ${LEGACY_EVIDENCE_COUNT} extended catalogue entries across 13+ pathways and 82+ peer-reviewed studies.`,
    interpretationTitle: "How to read this register",
    interpretation: [
      "A field signature can support a measurement variable such as background vector, angle, spectrum or envelope; it does not establish human fertility effects.",
      "A cellular or animal experiment can support a mechanistic intermediate or organ endpoint within its stated conditions; it is not automatically a human population estimate.",
      "A review locates a body of literature. A population timing result is descriptive unless matched FieldState, endpoint and confounding controls are present.",
      "No record below is a TFR coefficient. A country TFR pathway requires the separate ASFR and demographic terms in the model specification.",
    ],
    boundedTitle: "Bounded v2 records",
    boundedLead: "Each record states its field class, directness, translation scope and limitation. These are the primary evidence entries for the FieldState–ASFR v2 causal route.",
    extendedTitle: "Extended evidence catalogue",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} additional records from the BERM v18 bibliography, retained for source-level review. Each is classified by its v18 pathway, evidence level, and v2 migration status.`,
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
    extPathway: "Pathway",
    extLevel: "Evidence level",
    extStatus: "Migration status",
    extScope: "Translation scope",
    extN: "N",
  },
  fi: {
    title: "Evidenssirekisteri",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} rajattua FieldState–ASFR v2 -tietuetta ja ${LEGACY_EVIDENCE_COUNT} laajennetun katalogin tietuetta 13+ polulla ja 82+ vertaisarvioidussa tutkimuksessa.`,
    interpretationTitle: "Kuinka rekisteriä luetaan",
    interpretation: [
      "Kenttäallekirjoitus voi tukea mittausmuuttujaa, kuten taustavektoria, kulmaa, spektriä tai verhokäyrää; se ei osoita ihmisen hedelmällisyysvaikutusta.",
      "Solu- tai eläinkoe voi tukea mekanistista väliporrasta tai elinpäätepistettä omissa oloissaan; se ei automaattisesti ole ihmisväestön estimaatti.",
      "Katsaus paikantaa tutkimuskokonaisuuden. Väestön ajoitustulos on kuvaileva, ellei kohdistettu FieldState, päätepiste ja sekoittajien hallinta ole mukana.",
      "Mikään alla oleva tietue ei ole TFR-kerroin. Maakohtainen TFR-reitti tarvitsee erilliset ASFR- ja demografiset termit mallin määrittelyn mukaisesti.",
    ],
    boundedTitle: "Rajatut v2-tietueet",
    boundedLead: "Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Nämä ovat FieldState–ASFR v2 -kausaalireitin ensisijaiset evidenssitietueet.",
    extendedTitle: "Laajennettu evidenssikatalogi",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} lisätietuetta BERM v18 -bibliografiasta, säilytetty lähdetason tarkistusta varten. Jokainen on luokiteltu v18-polun, evidenssitason ja v2-migraatiostatuksen mukaan.`,
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
    extPathway: "Polku",
    extLevel: "Evidenssitaso",
    extStatus: "Migraatiostatus",
    extScope: "Tulkintaraja",
    extN: "N",
  },
} as const;

const PATHWAY_ORDER = ["A", "B", "C", "D", "E", "F", "T", "RW", "BS", "PV", "S", "SE", "EHS", "H", "theory"];

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

      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.interpretationTitle}</h2>
        <ol className="grid max-w-4xl grid-cols-1 md:grid-cols-2 md:divide-x md:divide-card-border">
          {d.interpretation.map((item, index) => (
            <li key={item} className="border-t border-card-border py-4 text-sm leading-relaxed text-foreground-muted md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
              <span className="font-mono-num mr-2 text-accent">0{index + 1}</span>{item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14"><FieldStateStatus locale={activeLocale} /></section>

      {/* Bounded v2 records */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.boundedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.boundedLead}</p>

        {ORDER.map((directness) => {
          const records = FIELDSTATE_EVIDENCE.filter((record) => record.directness === directness);
          if (!records.length) return null;
          return (
            <div key={directness} className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">{d.groups[directness]}</h3>
              <div className="grid gap-4">
                {records.map((record) => (
                  <article key={record.id} className="border-t border-card-border py-5 first:border-t-0">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-semibold leading-snug tracking-[-0.014em]">{record.citation}</h4>
                        <p className="mt-1 text-xs text-foreground-muted">{record.studyType} · {record.system}</p>
                      </div>
                      <span className="font-mono-num text-xs text-foreground-muted">{record.year}</span>
                    </div>
                    <p className="mb-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{record.finding}</p>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-card-border pt-3 text-xs leading-relaxed md:grid-cols-2">
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.nodes}</dt><dd className="text-foreground-muted">{causalNodeLabels(record.causalNodes, activeLocale).join(" · ")}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.field}</dt><dd className="text-foreground-muted">{record.fieldClass}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.scope}</dt><dd className="text-foreground-muted">{record.scope}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.limitations}</dt><dd className="text-foreground-muted">{record.limitations.join("; ")}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono-num text-foreground-muted">{d.fields.role}: {record.calibrationRole === "STRUCTURAL_ONLY" ? d.structural : d.contextual}</span>
                      <a href={record.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{d.fields.source} ↗</a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Extended evidence catalogue */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.extendedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.extendedLead}</p>

        {PATHWAY_ORDER.map((pathway) => {
          const records = LEGACY_EVIDENCE_CATALOGUE.filter((r) => r.pathway === pathway);
          if (!records.length) return null;
          const pathwayLabel = PATHWAY_LABELS[pathway]?.[activeLocale] ?? pathway;
          return (
            <div key={pathway} className="mb-10">
              <h3 className="text-sm font-semibold mb-4">
                <span className="font-mono-num text-accent mr-2">{pathway}</span>
                {pathwayLabel}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-[0.65rem] text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-12">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2 pr-3 w-20">{d.extLevel}</th>
                      <th className="py-2 pr-3 w-10">{d.extN}</th>
                      <th className="py-2 pr-3 w-32">{d.extStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.id} className="border-b border-card-border/40 hover:bg-card-bg/50 transition-colors">
                        <td className="py-2.5 pr-3">
                          <p className="font-medium text-foreground leading-snug">{r.citation}</p>
                          {r.translationScope && (
                            <p className="mt-1 text-foreground-muted leading-relaxed">{r.translationScope}</p>
                          )}
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.year}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span className="inline-block rounded bg-card-bg px-1.5 py-0.5 text-[0.6rem] font-semibold">
                            {r.level}
                            {EVIDENCE_LEVEL_LABELS[r.level] && (
                              <span className="ml-1 font-normal text-foreground-muted">{EVIDENCE_LEVEL_LABELS[r.level][activeLocale]}</span>
                            )}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.n ?? "—"}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span className={`text-[0.6rem] ${r.status === "MIGRATION_CANDIDATE" ? "text-accent" : "text-foreground-muted"}`}>
                            {STATUS_LABELS[r.status]?.[activeLocale] ?? r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      <section className="editorial-rail mb-14 max-w-4xl border-y border-card-border py-5">
        <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.sentinel}</p>
        <Link href={`/${activeLocale}/sentinel`} className="text-sm text-accent hover:underline">{d.sentinelLink} →</Link>
      </section>

      <StatisticalValidation locale={activeLocale} />
    </div>
  );
}
