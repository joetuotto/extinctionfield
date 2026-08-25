import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LayerStack } from "@/components/modulome/LayerStack";
import { ModulomeLayers } from "@/components/ModulomeLayers";
import { MODULOME_LAYERS } from "@/lib/modulome/layers";
import { ORGAN_PROFILES } from "@/lib/modulome/organs";
import { FERTILITY_ROUTES } from "@/lib/modulome/routes";

/* ── Bilingual copy ── */
const COPY = {
  en: {
    title: "EMF Modulome",
    subtitle:
      "Systematic mapping of electromagnetic susceptibility across the human body",
    /* Section 1: Hero */
    heroHeading: "THE HUMAN BODY AS AN ELECTROMAGNETIC SYSTEM",
    heroBody:
      "Every cell maintains voltage, every mitochondrion sustains \u0394\u03A8m, every barrier guards a gradient, every gland secretes via Ca\u00B2\u207A-dependent exocytosis, every heartbeat is paced by VGCCs. The EMF Modulome maps this: 12 layers, 10 target organs, 4 independent routes.",
    /* Section 2: Terminology */
    termHeading: "What is the EMF Modulome?",
    termBody:
      "The EMF Modulome is BERM\u2019s systematic mapping of electromagnetic susceptibility across the human body, analogous to how the genome maps genetic information and the proteome maps protein expression.",
    /* Section 3: Twelve Layers */
    layersHeading: "Twelve Layers",
    layersSubtitle:
      "From molecular spin physics to population-level patterns \u2014 each layer modulates \u03C7",
    /* Section 4: Routes */
    routesHeading: "Four Independent Routes",
    routesMechanism: "Mechanism",
    routesBlocked: "Blocked by",
    routesOrgans: "Organ links",
    /* Section 5: Organs */
    organsHeading: "Twelve Target Organs",
    organCav3: "Cav3 subtype",
    organLevel: "Level",
    organView: "View organ profile",
    organComingSoon: "Coming soon",
    /* Section 6: Population */
    popHeading: "Population \u03C7 Profiles",
    popBody:
      "Each population occupies a unique position in \u03C7-space, determined by its combination of genetic variants (OCA2, LCT, CACNA1C), dietary patterns (B2, \u03C9-3 from dairy/fish), and environmental exposure (electrification history, latitude, urbanization). These profiles predict differential susceptibility to EMF effects and are testable against the 54-country fertility dataset.",
    popLink: "Explore evolution & population data",
    /* Section 7: Predictions */
    predHeading: "Testable Predictions",
    predIntro:
      "The Modulome generates specific, falsifiable predictions. Seven representative MOD-level predictions:",
    predictions: [
      "MOD-001: T-type Ca\u00B2\u207A channel blockers (ethosuximide) will attenuate RF-EMF effects on testosterone in Leydig cells.",
      "MOD-002: Populations with higher dairy consumption (B2 source) will show slower fertility decline rates.",
      "MOD-003: HRV reduction will precede measurable hormonal changes in chronic EMF exposure.",
      "MOD-004: Blue-eyed individuals (higher CRY sensitivity) will show stronger circadian disruption from evening screen use.",
      "MOD-005: Pituitary gonadotroph LH pulse frequency will be directly modulable by specific EMF frequencies.",
      "MOD-006: Mitochondrial age (measured by ΔΨm) will correlate with EMF susceptibility within the same cell type.",
      "MOD-007: EMF-induced sperm DNA methylation changes are detectable in occupationally exposed men and include VGCC-related gene loci (CACNA1C, CACNA1G). Preprint support: Research Square 2025 (radar-exposed men).",
    ],
    predLink: "Full predictions register",
    /* Navigation */
    seeAlso: "See also",
    modelPage: "BERM model",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "EMF-modulomi",
    subtitle:
      "S\u00E4hk\u00F6magneettisen herkkyyden systemaattinen kartoitus ihmiskehossa",
    /* Section 1: Hero */
    heroHeading: "IHMISKEHO S\u00C4HK\u00D6MAGNEETTISENA J\u00C4RJESTELM\u00C4N\u00C4",
    heroBody:
      "Jokainen solu yll\u00E4pit\u00E4\u00E4 j\u00E4nnitett\u00E4, jokainen mitokondrio yll\u00E4pit\u00E4\u00E4 \u0394\u03A8m:\u00E4\u00E4, jokainen este vartioi gradienttia, jokainen rauhanen erittää Ca\u00B2\u207A-riippuvaisen eksosytoosin kautta, jokainen sy\u00E4menlyönti tahdistetaan VGCC:ill\u00E4. EMF-modulomi kartoittaa t\u00E4m\u00E4n: 12 kerrosta, 10 kohde-elint\u00E4, 4 itsenäistä reittiä.",
    /* Section 2: Terminology */
    termHeading: "Mik\u00E4 on EMF-modulomi?",
    termBody:
      "EMF-modulomi on BERM:n systemaattinen kartoitus s\u00E4hk\u00F6magneettisesta herkkyydest\u00E4 ihmiskehossa, analoginen sille miten genomi kartoittaa geneettist\u00E4 informaatiota ja proteomi proteiinien ilmentymist\u00E4.",
    /* Section 3: Twelve Layers */
    layersHeading: "Kaksitoista kerrosta",
    layersSubtitle:
      "Molekulaarisesta spinfysiikasta populaatiotason malleihin \u2014 kukin kerros moduloi \u03C7:\u00E4",
    /* Section 4: Routes */
    routesHeading: "Nelj\u00E4 itsen\u00E4ist\u00E4 reitti\u00E4",
    routesMechanism: "Mekanismi",
    routesBlocked: "Estet\u00E4\u00E4n",
    routesOrgans: "Elinlinkit",
    /* Section 5: Organs */
    organsHeading: "Kaksitoista kohde-elint\u00E4",
    organCav3: "Cav3-alatyyppi",
    organLevel: "Taso",
    organView: "N\u00E4yt\u00E4 elinprofiili",
    organComingSoon: "Tulossa pian",
    /* Section 6: Population */
    popHeading: "Populaation \u03C7-profiilit",
    popBody:
      "Kukin populaatio sijaitsee ainutlaatuisessa pisteess\u00E4 \u03C7-avaruudessa, m\u00E4\u00E4ritettyn\u00E4 sen geneettisten varianttien (OCA2, LCT, CACNA1C), ravitsemusmallien (B2, \u03C9-3 maidosta/kalasta) ja ymp\u00E4rist\u00F6altistuksen (s\u00E4hk\u00F6istymishistoria, leveysaste, kaupungistuminen) yhdistelm\u00E4ll\u00E4. N\u00E4m\u00E4 profiilit ennustavat erilaista herkkyyttä EMF-vaikutuksille ja ovat testattavissa 54 maan fertiliteettiaineistoa vasten.",
    popLink: "Tutustu evoluutio- ja populaatiodataan",
    /* Section 7: Predictions */
    predHeading: "Testattavat ennusteet",
    predIntro:
      "Modulomi tuottaa spesifisi\u00E4, falsifioitavia ennusteita. Seitsem\u00E4n edustavaa MOD-tason ennustetta:",
    predictions: [
      "MOD-001: T-tyypin Ca\u00B2\u207A-kanavasalpaajat (etosuksimidi) vaimentavat RF-EMF:n vaikutuksia testosteroniin Leydigin soluissa.",
      "MOD-002: Populaatiot, joilla on korkeampi maitotuotteiden kulutus (B2-l\u00E4hde), osoittavat hitaampaa fertiliteetin laskua.",
      "MOD-003: HRV:n lasku edelt\u00E4\u00E4 mitattavia hormonaalisia muutoksia kroonisessa EMF-altistuksessa.",
      "MOD-004: Sinisilm\u00E4iset yksil\u00F6t (korkeampi CRY-herkkyys) osoittavat voimakkaampaa sirkadiaanista h\u00E4iri\u00F6t\u00E4 iltaisesta n\u00E4ytt\u00F6k\u00E4yt\u00F6st\u00E4.",
      "MOD-005: Aivolisäkkeen gonadotroopin LH-pulssitaajuus on suoraan moduloitavissa tietyill\u00E4 EMF-taajuuksilla.",
      "MOD-006: Mitokondrion ik\u00E4 (mitattuna \u0394\u03A8m:ll\u00E4) korreloi EMF-herkkyyden kanssa saman solutyypin sis\u00E4ll\u00E4.",
      "MOD-007: EMF-indusoidut siitti\u00F6iden DNA-metylaatiomuutokset ovat havaittavissa ammatillisesti altistuneilla miehill\u00E4 ja sis\u00E4lt\u00E4v\u00E4t VGCC-geenilokuksia (CACNA1C, CACNA1G). Preprint-tuki: Research Square 2025 (tutkalle altistuneet miehet).",
    ],
    predLink: "T\u00E4ydellinen ennusterekisteri",
    /* Navigation */
    seeAlso: "Katso my\u00F6s",
    modelPage: "BERM-malli",
    evidencePage: "Evidenssirekisteri",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  C: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "EMF-modulomi \u2013 Extinction Field",
        description: COPY.fi.subtitle,
      }
    : {
        title: "EMF Modulome \u2013 Extinction Field",
        description: COPY.en.subtitle,
      };
}

export default async function ModulomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale === "fi" ? "fi" : "en";
  const d = COPY[l];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      {/* ── 01 Hero ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4 tracking-wide">
          {d.heroHeading}
        </h2>
        <p className="editorial-rail text-[0.95rem] leading-relaxed text-foreground max-w-4xl">
          {d.heroBody}
        </p>
      </section>

      {/* ── 02 Terminology note ── */}
      <section className="mb-16">
        <div className="rounded-lg border border-card-border bg-card p-5 max-w-3xl">
          <h3 className="text-sm font-bold text-foreground mb-2">
            {d.termHeading}
          </h3>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.termBody}
          </p>
        </div>
      </section>

      {/* ── 03 Twelve Layers ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-1">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.layersHeading}
        </h3>
        <p className="text-sm text-foreground-muted mb-6">{d.layersSubtitle}</p>

        <LayerStack layers={MODULOME_LAYERS} locale={l} />

        <div className="mt-10">
          <ModulomeLayers locale={l} />
        </div>
      </section>

      {/* ── 04 Four Independent Routes ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.routesHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {FERTILITY_ROUTES.map((route) => {
            const name = l === "fi" ? route.nameFi : route.nameEn;
            const mechanism =
              l === "fi" ? route.mechanismFi : route.mechanismEn;
            const blocked =
              l === "fi" ? route.blockedByFi : route.blockedByEn;

            return (
              <div
                key={route.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderLeftWidth: 4, borderLeftColor: route.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm leading-tight">
                    {name}
                  </h4>
                  {route.isNew && (
                    <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                      {l === "fi" ? "UUSI" : "NEW"}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesMechanism}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {mechanism}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesBlocked}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {blocked}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.routesOrgans}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                    {route.organLinks.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 05 Eight Target Organs ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.organsHeading}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORGAN_PROFILES.map((organ) => {
            const name = l === "fi" ? organ.nameFi : organ.nameEn;
            const summary = l === "fi" ? organ.summaryFi : organ.summaryEn;

            return (
              <div
                key={organ.id}
                className="rounded-lg bg-card border border-card-border p-5 space-y-3"
                style={{ borderTopWidth: 4, borderTopColor: organ.color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-foreground text-sm">
                    {name}
                  </h4>
                  <span
                    className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[organ.level] ?? LEVEL_BADGE.M}`}
                  >
                    {organ.level}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted leading-relaxed">
                  {summary}
                </p>

                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    {d.organCav3}
                  </p>
                  <p className="text-xs text-foreground-muted font-mono">
                    {organ.cav3Subtype}
                  </p>
                </div>

                {organ.ready ? (
                  <Link
                    href={`/${locale}${organ.subpage}`}
                    className="inline-block text-xs text-accent hover:underline"
                  >
                    {d.organView} &rarr;
                  </Link>
                ) : (
                  <span className="inline-block text-xs text-foreground-muted italic">
                    {d.organComingSoon}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 06 Population chi Profiles ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.popHeading}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.popBody}
        </p>

        <Link
          href={`/${locale}/evidence/evolution`}
          className="text-sm text-accent hover:underline"
        >
          {d.popLink} &rarr;
        </Link>
      </section>

      {/* ── 07 Testable Predictions ── */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.predHeading}
        </h3>

        <p className="text-sm text-foreground-muted mb-4">{d.predIntro}</p>

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.predictions.map((pred, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="shrink-0 text-accent font-mono text-xs mt-0.5">
                {"\u2022"}
              </span>
              <span>{pred}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/predictions`}
          className="inline-block mt-4 text-sm text-accent hover:underline"
        >
          {d.predLink} &rarr;
        </Link>
      </section>

      {/* ── See also ── */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/model`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
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
