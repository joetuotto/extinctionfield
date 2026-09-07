"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { INTERVENTIONS, getIntervention, searchInterventions, interventionText as tx, interventionAtlasHref, type InterventionProfile } from "@/lib/interventions";
import { StudyCitation } from "./StudyCitation";
import { AtlasClaims } from "./atlas/AtlasClaims";
import { InterventionModels } from "./InterventionModels";

const COPY = {
  en: {
    title: "What does an intervention actually test?", intro: "Explore eight experimental profiles. Channel identity, calcium location, pretreatment and feedback can change the same endpoint in different ways.",
    search: "Search interventions or endpoints", choose: "Choose an experimental profile", empty: "No profiles match. Clear the search to review all eight.", clear: "Clear search", found: "profiles found", select: "View profile", fallback: "Profile descriptions are available in English and Finnish; English is shown here.",
    observed: "Measured finding", mechanism: "Biological interpretation", prediction: "BERM conditional prediction", gaps: "What remains open", protocol: "Protocol and endpoint", system: "Experimental system", field: "Field waveform", light: "Light", drugTiming: "Intervention timing", measurement: "Measured endpoint", sources: "Studies and their scope", fieldTested: "Field intervention tested", noField: "No field intervention", full: "Full text checked", abstract: "Abstract checked", atlas: "Explore this mechanism in the atlas", claims: "Registered claims and dependencies", contrast: "Interaction in the published study", unavailable: "Study contrast unavailable", missing: "Not curated", sham: "Sham", fieldArm: "Field", drug: "Intervention without field", fieldDrug: "Field + intervention", derivation: "How the prediction follows from the premises", premise: "1. Stated premise", geometry: "2. Geometric consequence", bridge: "3. Conditional response", port: "4. Named biological port", endpoint: "5. Study endpoint", chainNote: "The metric perturbation follows from the stated 2025 premise. The response kernel adds a matter-coupling assumption; biological studies constrain named downstream ports and measurement models. They do not identify the physical kernel.", assumptions: "Additional assumptions and calibration", assumptionNote: "Minimal matter–metric coupling, a retarded response kernel and an observable-specific tensor contraction are explicit assumptions. Gauge, physical scale, tissue kernel, sign and lag need identification. Human tissue, couple and population endpoints need separate transfer functions.", equation: "Matched endpoint, unit and time: I = (field + intervention − intervention) − (field − sham). Different normalization baselines cannot be subtracted directly.", loading: "Loading intervention profiles…",
  },
  fi: {
    title: "Mitä interventio todella testaa?", intro: "Tutki kahdeksaa koeprofiilia. Kanavatyyppi, kalsiumin sijainti, esikäsittely ja palaute voivat muuttaa samaa päätepistettä eri tavoin.",
    search: "Etsi interventiota tai päätepistettä", choose: "Valitse koeprofiili", empty: "Profiileja ei löytynyt. Tyhjennä haku tarkastellaksesi kaikkia kahdeksaa.", clear: "Tyhjennä haku", found: "profiilia löytyi", select: "Näytä profiili", fallback: "Profiilikuvaukset ovat saatavilla englanniksi ja suomeksi.",
    observed: "Mitattu löydös", mechanism: "Biologinen tulkinta", prediction: "BERM:n ehdollinen ennuste", gaps: "Mikä jää avoimeksi", protocol: "Protokolla ja päätepiste", system: "Koejärjestelmä", field: "Kentän aaltomuoto", light: "Valo", drugTiming: "Intervention ajoitus", measurement: "Mitattu päätepiste", sources: "Tutkimukset ja niiden rajaus", fieldTested: "Kenttäinterventio testattu", noField: "Ei kenttäinterventiota", full: "Kokoteksti tarkistettu", abstract: "Tiivistelmä tarkistettu", atlas: "Tutki mekanismia atlaksessa", claims: "Rekisteröidyt väitteet ja riippuvuudet", contrast: "Interaktio julkaistussa tutkimuksessa", unavailable: "Tutkimuskontrasti puuttuu", missing: "Ei kuratoitu", sham: "Valealtistus", fieldArm: "Kenttä", drug: "Interventio ilman kenttää", fieldDrug: "Kenttä + interventio", derivation: "Miten ennuste seuraa premisseistä", premise: "1. Ilmoitettu premissi", geometry: "2. Geometrinen seuraus", bridge: "3. Ehdollinen vaste", port: "4. Nimetty biologinen portti", endpoint: "5. Tutkimuksen päätepiste", chainNote: "Metriikkahäiriö seuraa ilmoitetusta vuoden 2025 premissistä. Vasteydin lisää materiakytkentäoletuksen; biologiset tutkimukset rajaavat nimettyjä alavirran portteja ja havaintomalleja. Ne eivät tunnista fysikaalista vasteydintä.", assumptions: "Lisäoletukset ja kalibrointi", assumptionNote: "Minimaalinen materia–metriikkakytkentä, viivästetty vasteydin ja havaintosuureen tensorikontraktio ovat eksplisiittisiä oletuksia. Gauge, fysikaalinen mittakaava, kudosydin, etumerkki ja viive on tunnistettava. Ihmisen kudos-, pari- ja väestöpäätepisteet tarvitsevat erilliset siirtofunktiot.", equation: "Sama päätepiste, yksikkö ja aika: I = (kenttä + interventio − interventio) − (kenttä − valealtistus). Eri lähtötasoihin normalisoituja arvoja ei voi vähentää suoraan.", loading: "Ladataan koeprofiileja…",
  },
};
const control = "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

export function InterventionExplorer({ locale }: { locale: string }) {
  return <div id="intervention-explorer" className="scroll-mt-24"><Suspense fallback={<p>{COPY[locale === "fi" ? "fi" : "en"].loading}</p>}><Explorer locale={locale} /></Suspense></div>;
}
function Explorer({ locale }: { locale: string }) {
  const copy = COPY[locale === "fi" ? "fi" : "en"];
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const selected = getIntervention(searchParams.get("profile")) ?? INTERVENTIONS.profiles[0];
  const found = searchInterventions(query);
  function select(id: string) {
    if (!getIntervention(id)) return;
    const url = new URL(window.location.href);
    url.searchParams.set("profile", id);
    url.hash = "intervention-explorer";
    // Next copies its internal router state into this public history update.
    // Passing the existing __NA state would bypass useSearchParams updates.
    window.history.pushState(null, "", url);
  }
  return <section aria-labelledby="intervention-explorer-title" className="space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-6">
    <div><h2 id="intervention-explorer-title" className="font-serif text-2xl">{copy.title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground-muted">{copy.intro}</p>{locale !== "fi" && locale !== "en" && <p className="mt-2 text-xs text-foreground-muted">{copy.fallback}</p>}</div>
    <details className="rounded-lg border border-border p-3" data-testid="intervention-derivation"><summary className="min-h-11 cursor-pointer content-center font-semibold">{copy.derivation}</summary><p className="my-3 text-sm leading-relaxed">{copy.chainNote}</p><ol className="space-y-3 text-sm">
      {[[copy.premise, INTERVENTIONS.derivation.premise], [copy.geometry, INTERVENTIONS.derivation.metricPerturbation], [copy.bridge, INTERVENTIONS.derivation.conditionalResponse], [copy.port, INTERVENTIONS.derivation.portMapping]].map(([label, equation]) => <li key={label}><p className="font-medium">{label}</p><code className="mt-1 block break-words text-xs text-foreground-muted">{equation}</code></li>)}
      <li><p className="font-medium">{copy.endpoint}</p><p className="mt-1 text-foreground-muted">{tx(selected.protocol.measurement, locale)}</p></li>
    </ol><h3 className="mt-4 text-sm font-semibold">{copy.assumptions}</h3><p className="mt-2 text-sm leading-relaxed text-foreground-muted">{copy.assumptionNote}</p></details>
    <label className="block text-sm font-medium">{copy.choose}<select className={`${control} mt-2 block w-full`} value={selected.id} onChange={event => select(event.target.value)}>{INTERVENTIONS.profiles.map(profile => <option key={profile.id} value={profile.id}>{tx(profile.title, locale)}</option>)}</select></label>
    <label className="block text-sm font-medium">{copy.search}<input className={`${control} mt-2 block w-full`} type="search" value={query} onChange={event => setQuery(event.target.value)} /></label>
    {query.trim() && <div className="space-y-2"><p role="status" className="text-xs text-foreground-muted">{found.length ? `${found.length} / ${INTERVENTIONS.profiles.length} ${copy.found}` : copy.empty}</p><div className="flex flex-wrap gap-2">{found.map(profile => <button type="button" className={control} key={profile.id} aria-pressed={selected.id === profile.id} onClick={() => select(profile.id)}>{tx(profile.title, locale)}</button>)}<button type="button" className={control} onClick={() => setQuery("")}>{copy.clear}</button></div></div>}
    <Profile key={selected.id} profile={selected} locale={locale} />
    <InterventionModels profileId={selected.id} locale={locale} />
  </section>;
}
function Profile({ profile, locale }: { profile: InterventionProfile; locale: string }) {
  const copy = COPY[locale === "fi" ? "fi" : "en"];
  return <article className="space-y-5" aria-labelledby="intervention-profile-title" data-profile-id={profile.id}>
    <h3 id="intervention-profile-title" className="text-xl font-semibold" aria-live="polite">{tx(profile.title, locale)}</h3>
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4" data-testid="intervention-observed"><h4 className="font-semibold">{copy.observed}</h4><p className="text-sm leading-relaxed">{tx(profile.observed, locale)}</p></div>
      <div className="space-y-2 rounded-lg border border-amber-500/25 bg-amber-500/5 p-4" data-testid="intervention-prediction"><h4 className="font-semibold">{copy.prediction}</h4><p className="text-sm leading-relaxed">{tx(profile.prediction, locale)}</p></div>
    </div>
    <div><h4 className="font-semibold">{copy.mechanism}</h4><p className="mt-2 text-sm leading-relaxed text-foreground-muted">{tx(profile.mechanism, locale)}</p></div>
    <div><h4 className="font-semibold">{copy.gaps}</h4><ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-relaxed text-foreground-muted">{profile.limitations.map(item => <li key={item.en}>{tx(item, locale)}</li>)}</ul></div>
    <div><h4 className="font-semibold">{copy.protocol}</h4><dl className="mt-3 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">{(Object.keys(profile.protocol) as (keyof InterventionProfile["protocol"])[]).map(key => <div key={key} className="contents"><dt className="font-medium">{copy[key]}</dt><dd className="leading-relaxed text-foreground-muted">{tx(profile.protocol[key], locale)}</dd></div>)}</dl></div>
    <div><h4 className="font-semibold">{copy.sources}</h4><ul className="mt-3 space-y-3 text-sm">{profile.studies.map(study => <li key={study.id} className="rounded-lg border border-border p-3"><StudyCitation referenceId={study.referenceId} locale={locale} /><p className="mt-2 text-xs text-foreground-muted">{study.fieldTested ? copy.fieldTested : copy.noField} · {study.sourceCoverage === "full_text" ? copy.full : copy.abstract}</p><p className="mt-2 text-xs leading-relaxed text-foreground-muted" lang="en">{study.system} · {study.protocol} · {study.endpoint}</p></li>)}</ul></div>
    <div className="space-y-3 rounded-lg border border-border p-4" data-testid="intervention-study-contrast"><h4 className="font-semibold">{copy.contrast}</h4><p className="text-sm font-medium">{copy.unavailable}</p><p className="text-sm leading-relaxed text-foreground-muted">{tx(profile.contrast.reason, locale)}</p><dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">{[copy.sham, copy.fieldArm, copy.drug, copy.fieldDrug].map(label => <div key={label}><dt className="font-medium">{label}</dt><dd className="mt-1 text-xs text-foreground-muted">{copy.missing}</dd></div>)}</dl><p className="text-xs leading-relaxed text-foreground-muted">{copy.equation}</p></div>
    <Link className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 text-sm text-accent hover:underline" href={interventionAtlasHref(locale, profile.id, profile.atlasNodeIds[0])}>{copy.atlas} →</Link>
    <details className="rounded-lg border border-border px-3"><summary className="min-h-11 cursor-pointer content-center text-sm font-medium">{copy.claims}</summary><div className="pb-3"><AtlasClaims claimIds={profile.claimIds} locale={locale} /></div></details>
  </article>;
}
