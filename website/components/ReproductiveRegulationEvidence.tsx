"use client";

import { useState } from "react";
import { ChevronDown, FlaskConical, UsersRound } from "lucide-react";
import { StudyCitation } from "@/components/StudyCitation";
import { TranslationNotice } from "@/components/TranslationNotice";
import { pickCopy } from "@/lib/i18n";
import { REPRODUCTIVE_REGULATION, filterRegulationStudies, regulationFamily, regulationStudyLabel, regulationText as tx, regulationVariableLabel } from "@/lib/reproductiveRegulation";

const COPY = {
  en: {
    title: "Read the evidence as a matrix of measured transitions",
    intro: "Compare the intervention, biological measurement, observed output and time course. The research family stays attached when several papers describe the same cohort or experimental programme.",
    branch: "Reproductive branch", kind: "Evidence kind", family: "Research family", all: "All branches", allKinds: "Experiments and observations", allFamilies: "All research families",
    branchNames: { motivation_realisation: "Motivation and realised encounters", capacity: "Physiological capacity", care_feedback: "Caregiving and feedback" },
    kinds: { component_experiment: "Component experiment", observational: "Observational study" },
    experimentNote: "Component experiments manipulate a biological or social input. An experiment in a wild animal group retains that classification: the measured intervention determines its place in the chain.",
    count: "{n} studies · {f} research families", countNote: "Families identify shared cohorts and research lineages; these counts do not assume independent replication.",
    input: "Input or comparison", finding: "Measured change and output", variables: "Biological and contextual measurements", outcomes: "Observed outcomes", time: "Time course", scope: "Scope of the finding", source: "Source and corrections", familyDetail: "Shared data and research lineage",
    more: "Show all {n} matching studies", fewer: "Show a shorter selection", empty: "No studies match this combination.", reset: "Reset filters", open: "Open the measured sequence",
  },
  fi: {
    title: "Lue näyttöä mitattujen siirtymien matriisina",
    intro: "Vertaa interventiota, biologista mittausta, havaittua ulostuloa ja aikakulkua. Tutkimusperhe säilyy mukana, kun useampi julkaisu käsittelee samaa kohorttia tai koeohjelmaa.",
    branch: "Lisääntymisen haara", kind: "Näyttölaji", family: "Tutkimusperhe", all: "Kaikki haarat", allKinds: "Kokeet ja havainnot", allFamilies: "Kaikki tutkimusperheet",
    branchNames: { motivation_realisation: "Motivaatio ja toteutuvat kohtaamiset", capacity: "Fysiologinen kapasiteetti", care_feedback: "Hoiva ja palaute" },
    kinds: { component_experiment: "Komponenttikoe", observational: "Havaintotutkimus" },
    experimentNote: "Komponenttikoe muuttaa biologista tai sosiaalista syötettä. Luonnonvaraisen eläinryhmän koe säilyy tässä luokassa: mitattu interventio määrää sen paikan ketjussa.",
    count: "{n} tutkimusta · {f} tutkimusperhettä", countNote: "Perheet tunnistavat yhteisiä kohortteja ja tutkimuslinjoja; määrät eivät oleta riippumattomia toistoja.",
    input: "Syöte tai vertailu", finding: "Mitattu muutos ja ulostulo", variables: "Biologiset ja tilanteen mittarit", outcomes: "Havaitut lopputulokset", time: "Aikakulku", scope: "Tuloksen soveltamisala", source: "Lähde ja korjaukset", familyDetail: "Yhteinen aineisto ja tutkimuslinja",
    more: "Näytä kaikki {n} suodatettua tutkimusta", fewer: "Näytä lyhyempi valikoima", empty: "Tällä yhdistelmällä ei löytynyt tutkimuksia.", reset: "Nollaa suodattimet", open: "Avaa mitattu tapahtumaketju",
  }, ja: {}, fr: {}, ko: {},
} as const;
const control = "mt-2 min-h-11 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

export function ReproductiveRegulationEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale) as typeof COPY.en;
  const [branch, setBranch] = useState("all");
  const [kind, setKind] = useState("all");
  const [family, setFamily] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const studies = filterRegulationStudies({ branch, kind, family });
  const visible = expanded ? studies : studies.slice(0, 6);
  const familyCount = new Set(studies.map(study => study.familyId)).size;
  return <section id="evidence-matrix" className="min-w-0 scroll-mt-28 space-y-6">
    <div><h2 className="editorial-section-heading">{c.title}</h2><p className="mt-4 max-w-4xl text-base leading-7 text-foreground-muted">{c.intro}</p></div>
    <TranslationNotice copy={COPY} locale={locale} />
    <div className="grid gap-4 md:grid-cols-3">
      <label className="text-sm font-medium">{c.branch}<select className={control} value={branch} onChange={e => { setBranch(e.target.value); setExpanded(false); }}><option value="all">{c.all}</option>{Object.entries(c.branchNames).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <label className="text-sm font-medium">{c.kind}<select className={control} value={kind} onChange={e => { setKind(e.target.value); setExpanded(false); }}><option value="all">{c.allKinds}</option>{Object.entries(c.kinds).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <label className="text-sm font-medium">{c.family}<select className={control} value={family} onChange={e => { setFamily(e.target.value); setExpanded(false); }}><option value="all">{c.allFamilies}</option>{REPRODUCTIVE_REGULATION.families.map(item => <option key={item.id} value={item.id}>{tx(item.label, locale)}</option>)}</select></label>
    </div>
    <div><p role="status" className="font-semibold">{c.count.replace("{n}", String(studies.length)).replace("{f}", String(familyCount))}</p><p className="mt-1 text-xs leading-6 text-foreground-muted">{c.countNote}</p><p className="mt-2 max-w-4xl text-sm leading-6 text-foreground-muted">{c.experimentNote}</p></div>
    <div className="space-y-3">{visible.map(study => {
      const researchFamily = regulationFamily(study.familyId);
      const isExperiment = study.evidenceKind === "component_experiment";
      const Icon = isExperiment ? FlaskConical : UsersRound;
      return <details key={study.id} id={`regulation-${study.id.replaceAll(".", "-")}`} data-study-id={study.id} data-evidence-kind={study.evidenceKind} className="group min-w-0 rounded-xl border border-card-border bg-background open:border-accent/40">
        <summary className="flex min-h-20 cursor-pointer list-none items-start gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
          <Icon className="mt-1 shrink-0 text-accent" size={18} aria-hidden="true" />
          <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="text-base font-semibold">{regulationStudyLabel(study, locale)}</span><span className="rounded-full border border-card-border px-2 py-0.5 text-[0.65rem] text-foreground-muted">{c.kinds[study.evidenceKind]}</span></span><span className="mt-2 block text-sm leading-6 text-foreground-muted">{tx(study.system, locale)}</span><span className="mt-1 block text-xs leading-5 text-foreground-muted">{tx(researchFamily.label, locale)}</span></span>
          <ChevronDown size={17} className="mt-1 shrink-0 text-foreground-muted transition-transform group-open:rotate-180" aria-label={c.open} />
        </summary>
        <div className="space-y-5 border-t border-card-border p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]"><div><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{c.input}</h3><p className="text-sm leading-7">{tx(study.intervention, locale)}</p></div><div><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{c.finding}</h3><p className="text-sm leading-7">{tx(study.finding, locale)}</p></div></div>
          <div className="grid gap-5 sm:grid-cols-2">{([{ title: c.variables, ids: study.measuredVariables }, { title: c.outcomes, ids: study.outcomes }]).map(group => <div key={group.title}><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{group.title}</h3><ul className="flex flex-wrap gap-2">{group.ids.map(id => <li key={id} className="rounded-md border border-card-border px-2 py-1 text-xs leading-5">{regulationVariableLabel(id, locale)}</li>)}</ul></div>)}</div>
          <div className="grid gap-5 sm:grid-cols-2"><div><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.time}</h3><p className="text-sm leading-7">{tx(study.timeCourse, locale)}</p></div><div><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.familyDetail}</h3><p className="text-sm leading-7">{tx(researchFamily.description, locale)}</p></div></div>
          <div className="border-l-2 border-accent/50 pl-4"><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{c.scope}</h3><p className="text-sm leading-7 text-foreground-muted">{tx(study.scope, locale)}</p></div>
          <div className="border-t border-card-border pt-4"><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.source}</h3><div className="flex flex-wrap gap-4 text-sm"><StudyCitation referenceId={study.referenceId} locale={locale} />{study.correctionReferenceIds.map(id => <StudyCitation key={id} referenceId={id} locale={locale} />)}</div></div>
        </div>
      </details>;
    })}</div>
    {studies.length === 0 && <p>{c.empty} <button type="button" className="min-h-11 text-accent underline" onClick={() => { setBranch("all"); setKind("all"); setFamily("all"); }}>{c.reset}</button></p>}
    {studies.length > 6 && <button type="button" className="min-h-11 rounded-lg border border-card-border px-5 py-2 text-sm font-semibold text-accent hover:border-accent/50" onClick={() => setExpanded(!expanded)}>{expanded ? c.fewer : c.more.replace("{n}", String(studies.length))}</button>}
  </section>;
}
