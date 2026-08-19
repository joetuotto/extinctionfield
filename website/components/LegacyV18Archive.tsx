import Link from "next/link";
import {
  Archive,
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  Database,
  FlaskConical,
  GitBranch,
  Leaf,
  ScrollText,
  Target,
} from "lucide-react";
import {
  BERM_V18_EVIDENCE,
  BERM_V18_PREDICTIONS,
} from "@/lib/bermV18Archive";

export type LegacyV18Section =
  | "home"
  | "explore"
  | "model"
  | "evidence"
  | "sentinel"
  | "ecology"
  | "predictions"
  | "about"
  | "references";

const SOURCE_SHA = "2bc295226df9050f849e0aeccef00825af9c5ab1";
const SOURCE_URL = `https://github.com/joetuotto/extinctionfield/tree/${SOURCE_SHA}`;

const SECTION_ORDER: Array<{
  id: LegacyV18Section;
  icon: typeof Archive;
  en: string;
  fi: string;
}> = [
  { id: "home", icon: Archive, en: "Overview", fi: "Yleiskuva" },
  { id: "explore", icon: ChartNoAxesCombined, en: "Scenarios", fi: "Skenaariot" },
  { id: "model", icon: GitBranch, en: "Model", fi: "Malli" },
  { id: "evidence", icon: FlaskConical, en: "Evidence", fi: "Näyttö" },
  { id: "sentinel", icon: Leaf, en: "Sentinels", fi: "Indikaattorit" },
  { id: "predictions", icon: Target, en: "Predictions", fi: "Ennusteet" },
  { id: "references", icon: BookOpen, en: "References", fi: "Lähteet" },
  { id: "about", icon: ScrollText, en: "Notes", fi: "Muistiinpanot" },
];

const COPY = {
  en: {
    eyebrow: "BERM v18.0 · historical model presentation",
    source: "Source snapshot",
    openSource: "Open the exact source snapshot",
    current: "Open FieldState–ASFR v2",
    overviewTitle: "BERM v18.0",
    overviewDeck:
      "The earlier public BERM formulation, preserved as a separately navigable model record alongside the current FieldState–ASFR-v2 presentation.",
    overviewLead:
      "This view retains the v18.0 scalar exposure architecture, its biological and demographic coupling assumptions, historical scenario tables and the associated source materials. It is intentionally kept on its own route so the two model specifications can be compared without overwriting one another.",
    preservedTitle: "What this version preserves",
    preserved: [
      {
        title: "Scalar exposure architecture",
        text: "The former ambient-plus-personal χ-coupling formulation and its cumulative exposure scenario structure.",
      },
      {
        title: "Original causal presentation",
        text: "The v18 pathway diagram, recovery layers, behavioural coupling and biological-capacity framing.",
      },
      {
        title: "Scenario and validation artefacts",
        text: "The numerical country scenario registry, historical diagnostics and the previous bibliography as versioned material.",
      },
    ],
    modelTitle: "Original three-level architecture",
    modelDeck:
      "The v18.0 model represented period fertility as coupled biological capacity, EMF–behavioural interaction and culture/demand terms.",
    evidenceTitle: "Original evidence map",
    evidenceDeck:
      "The v18 evidence presentation organised the literature by its earlier pathway vocabulary and linked it to the original causal diagram and natural-experiment cards.",
    scenarioTitle: "Original scenario explorer",
    scenarioDeck:
      "The v18 scenario route retains the country-level scalar trajectories, their exposure inputs and the accompanying historical plots as one coherent archived system.",
    sentinelTitle: "Original sentinel view",
    sentinelDeck:
      "The v18 site presented animal and environmental sentinels as early signals to examine alongside human reproductive endpoints.",
    ecologyTitle: "Original ecology view",
    ecologyDeck:
      "The historical version linked ecological observations to the same broad model premise. The dedicated FieldState ecology framework is available in the current presentation.",
    predictionTitle: "Original numerical registry",
    predictionDeck:
      "These are the country and global scenario entries published in v18.0. They remain visible here as versioned outputs, separate from the current FieldState–ASFR-v2 route.",
    referencesTitle: "Original bibliography",
    referencesDeck:
      "The earlier website’s bibliography and its pathway tagging are retained in the v18 source snapshot. This page keeps the trail visible while the current site uses its own node-linked registry.",
    notesTitle: "Version notes",
    notesDeck:
      "Use this route to compare the historical v18 formulation with the current FieldState–ASFR-v2 specification, not to combine their parameters or outputs.",
    equationCaption: "v18 scalar coupling",
    levels: [
      ["Level 1", "Biological capacity", "Sperm quality, oocyte quality, hormonal milieu and barrier-related states were aggregated into a biological-capacity term."],
      ["Level 2", "EMF–behavioural coupling", "Personal device exposure was coupled to ambient infrastructure through a nonlinear χ function."],
      ["Level 3", "Culture and demand", "Education, opportunity, contraception, urbanisation and cultural preferences were retained as a separate fertility layer."],
    ],
    nextTitle: "Compare the current model",
    nextText:
      "FieldState–ASFR-v2 retains the physics premise but replaces the national scalar input with a measurement-aware, organ-specific FieldState and ASFR-first population structure.",
    dataTitle: "Versioned v18 materials",
    dataText:
      "The exact page source, historical files and original code remain available at the version snapshot. The local scenario files used by v18 are retained at the paths below.",
    currentRegistry: "Current node-linked evidence registry",
    sourceSnapshot: "v18.0 source snapshot",
    rawExplorer: "v18 country scenario data",
    rawAsfr: "v18 ASFR scenario data",
    rawBacktest: "v18 rolling backtest data",
    rawHindcast: "v18 country hindcast data",
    oldPathway: "Former pathway framing",
    oldPathwayText:
      "The original site grouped material as VGCC/ROS, RPM/CRY, barrier, HPA, microbiome and mTOR branches. Their terminology is preserved here as v18 provenance.",
    naturalTitle: "Natural-experiment cards retained in v18",
    naturalText:
      "The former site presented country and cohort examples as v18 model tests. Their original context is accessible through the source snapshot rather than silently re-labelled as a v2 result.",
    tableCountry: "Country / scope",
    tableYear: "Target year",
    tableMetric: "Metric",
    tableCentral: "Central scenario",
    tableInterval: "Published interval",
    sectionUnavailable: "This historical subsection is represented by its corresponding v18 archive overview.",
  },
  fi: {
    eyebrow: "BERM v18.0 · aiempi malliesitys",
    source: "Lähdetilannekuva",
    openSource: "Avaa täsmällinen lähdetilannekuva",
    current: "Avaa FieldState–ASFR v2",
    overviewTitle: "BERM v18.0",
    overviewDeck:
      "Aiempi julkinen BERM-muotoilu, säilytetty omana selattavana malliversionaan nykyisen FieldState–ASFR-v2-esityksen rinnalla.",
    overviewLead:
      "Tämä näkymä säilyttää v18.0:n skalaari-altistusarkkitehtuurin, biologiset ja demografiset kytkentäoletukset, historialliset skenaariotaulukot ja niihin liittyvät lähdeaineistot. Se pidetään omalla reitillään, jotta kahta mallimäärittelyä voidaan vertailla ilman että kumpikaan korvaa toisen.",
    preservedTitle: "Mitä tämä versio säilyttää",
    preserved: [
      {
        title: "Skalaari-altistusarkkitehtuuri",
        text: "Aiempi ambient- ja henkilökohtaisen kanavan χ-kytkentä sekä kumulatiivisen altistuksen skenaariorakenne.",
      },
      {
        title: "Alkuperäinen kausaaliesitys",
        text: "V18:n reittikaavio, palautumiskerrokset, käyttäytymiskytkentä ja biologisen kapasiteetin kehys.",
      },
      {
        title: "Skenaario- ja validointiartefaktit",
        text: "Maakohtainen numeerinen skenaariorekisteri, historialliset diagnostiikat ja aiempi bibliografia versioituna aineistona.",
      },
    ],
    modelTitle: "Alkuperäinen kolmitasoinen arkkitehtuuri",
    modelDeck:
      "V18.0 esitti periodin hedelmällisyyden biologisen kapasiteetin, EMF–käyttäytymisvuorovaikutuksen ja kulttuuri-/kysyntätermien kytkeytyneenä kokonaisuutena.",
    evidenceTitle: "Alkuperäinen evidenssikartta",
    evidenceDeck:
      "V18:n näyttöesitys järjesti kirjallisuuden aiemman polkusanastonsa mukaan ja liitti sen alkuperäiseen kausaalikaavioon sekä luonnollisten kokeiden kortteihin.",
    scenarioTitle: "Alkuperäinen skenaarioselain",
    scenarioDeck:
      "V18:n skenaarioreitti säilyttää maakohtaiset skalaariurat, niiden altistussyötteet ja niihin liittyvät historialliset kuvaajat yhtenä arkistoituna järjestelmänä.",
    sentinelTitle: "Alkuperäinen sentinel-näkymä",
    sentinelDeck:
      "V18-sivusto esitti eläin- ja ympäristösentinellit varhaisina signaaleina, joita tarkastellaan ihmisen lisääntymispäätepisteiden rinnalla.",
    ecologyTitle: "Alkuperäinen ekologianäkymä",
    ecologyDeck:
      "Historiallinen versio kytki ekologiset havainnot samaan laajaan mallipremissiin. Erillinen FieldState-ekologiakehys on nykyisessä esityksessä.",
    predictionTitle: "Alkuperäinen numeerinen rekisteri",
    predictionDeck:
      "Nämä ovat v18.0:ssa julkaistut maa- ja globaaliskenaariot. Ne säilyvät tässä versioituina tuloksina, erillään nykyisestä FieldState–ASFR-v2-reitistä.",
    referencesTitle: "Alkuperäinen bibliografia",
    referencesDeck:
      "Aiemman sivuston bibliografia ja sen polkutagit säilyvät v18-lähdetilannekuvassa. Tämä sivu pitää jäljen näkyvissä, kun nykyinen sivusto käyttää omaa solmulinkitettyä rekisteriään.",
    notesTitle: "Versiomuistiinpanot",
    notesDeck:
      "Käytä tätä reittiä vertaillaksesi historiallista v18-muotoilua nykyiseen FieldState–ASFR-v2-määrittelyyn; niiden parametreja tai tuloksia ei yhdistetä toisiinsa.",
    equationCaption: "v18:n skalaari-kytkentä",
    levels: [
      ["Taso 1", "Biologinen kapasiteetti", "Siittiölaatu, munasolujen laatu, hormonitoiminta ja esteisiin liittyvät tilat koottiin biologisen kapasiteetin termiksi."],
      ["Taso 2", "EMF–käyttäytymiskytkentä", "Henkilökohtainen laitealtistus kytkettiin ambient-infrastruktuuriin epälineaarisella χ-funktiolla."],
      ["Taso 3", "Kulttuuri ja kysyntä", "Koulutus, mahdollisuudet, ehkäisy, kaupungistuminen ja kulttuuriset mieltymykset pidettiin erillisenä hedelmällisyystasona."],
    ],
    nextTitle: "Vertaa nykyiseen malliin",
    nextText:
      "FieldState–ASFR-v2 säilyttää fysiikan premissin, mutta korvaa kansallisen skalaari-syötteen mittaustietoisella, elinkohtaisella FieldStatella ja ASFR-ensin-väestörakenteella.",
    dataTitle: "Versioidut v18-aineistot",
    dataText:
      "Täsmällinen sivulähde, historialliset tiedostot ja alkuperäinen koodi ovat saatavilla version lähdetilannekuvassa. Alla olevat paikalliset skenaariotiedostot säilyvät v18:n käyttäminä polkuina.",
    currentRegistry: "Nykyinen solmulinkitetty evidenssirekisteri",
    sourceSnapshot: "v18.0:n lähdetilannekuva",
    rawExplorer: "v18:n maaskenaariodata",
    rawAsfr: "v18:n ASFR-skenaariodata",
    rawBacktest: "v18:n rolling-backtest-data",
    rawHindcast: "v18:n maakohtainen hindcast-data",
    oldPathway: "Aiempi polkusanasto",
    oldPathwayText:
      "Alkuperäinen sivusto ryhmitteli aineiston VGCC/ROS-, RPM/CRY-, este-, HPA-, mikrobiomi- ja mTOR-haaroihin. Terminologia säilytetään tässä v18-provenienssina.",
    naturalTitle: "V18:ssa säilyvät luonnollisen kokeen kortit",
    naturalText:
      "Aiempi sivusto esitti maa- ja kohorttiesimerkkejä v18-mallin testitapauksina. Niiden alkuperäinen konteksti on avattavissa lähdetilannekuvasta eikä niitä nimetä hiljaa v2-tuloksiksi.",
    tableCountry: "Maa / taso",
    tableYear: "Kohdevuosi",
    tableMetric: "Mittari",
    tableCentral: "Keskeinen skenaario",
    tableInterval: "Julkaistu väli",
    sectionUnavailable: "Tämä historiallinen alakohta esitetään sitä vastaavan v18-arkistoyhteenvedon kautta.",
  },
} as const;

function language(locale: string) {
  return locale === "fi" ? "fi" : "en";
}

export function legacyV18Href(locale: string, section: LegacyV18Section = "home") {
  const root = `/${locale}/berm-v18`;
  return section === "home" ? root : `${root}/${section}`;
}

export function legacyV18SectionFromSlug(slug: string[] | undefined): LegacyV18Section {
  const first = slug?.[0] ?? "home";
  if (first === "explorer" || first === "data") return "explore";
  if (first === "mathematics") return "model";
  if (first === "replication" || first === "objections" || first === "history") return "about";
  if (SECTION_ORDER.some((section) => section.id === first)) return first as LegacyV18Section;
  return "about";
}

export function LegacyV18Chrome({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const lang = language(locale);
  const d = COPY[lang];

  return (
    <>
      <section className="border-b border-card-border bg-background-secondary/60 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="editorial-kicker text-accent">{d.eyebrow}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
              {lang === "fi"
                ? "Selattava historiallinen malliversio · lähdetilannekuva 19.8.2026"
                : "Browsable historical model version · source snapshot 19 August 2026"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <a className="inline-flex items-center gap-1.5 text-foreground-muted hover:text-foreground" href={SOURCE_URL} target="_blank" rel="noreferrer">
              <Database size={14} aria-hidden="true" />
              {d.openSource}
            </a>
            <Link className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover" href={`/${locale}`}>
              {d.current} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <nav aria-label={lang === "fi" ? "BERM v18.0 -arkisto" : "BERM v18.0 archive"} className="border-b border-card-border px-6">
        <div className="mx-auto flex max-w-7xl gap-x-5 overflow-x-auto py-3">
          {SECTION_ORDER.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={legacyV18Href(locale, section.id)}
                className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                <Icon size={13} aria-hidden="true" />
                {section[lang]}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </>
  );
}

function SectionHeader({
  locale,
  title,
  deck,
  section,
}: {
  locale: string;
  title: string;
  deck: string;
  section: LegacyV18Section;
}) {
  const lang = language(locale);
  const label = SECTION_ORDER.find((item) => item.id === section)?.[lang] ?? "";
  return (
    <header className="max-w-4xl border-b border-card-border pb-8">
      <p className="editorial-kicker mb-4 text-accent">BERM v18.0 · {label}</p>
      <h1 className="mb-4 text-4xl sm:text-5xl">{title}</h1>
      <p className="editorial-deck">{deck}</p>
    </header>
  );
}

function SourceStrip({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <aside className="border-y border-card-border py-5 text-sm leading-relaxed text-foreground-muted">
      <span className="mr-3 font-semibold text-foreground">{d.source}:</span>
      <a className="underline decoration-card-border underline-offset-4 hover:decoration-foreground" href={SOURCE_URL} target="_blank" rel="noreferrer">
        {SOURCE_SHA.slice(0, 12)}
      </a>
    </aside>
  );
}

function ArchiveLinks({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  const links = [
    ["/data/explorer.json", d.rawExplorer],
    ["/data/asfr_cohort.json", d.rawAsfr],
    ["/data/rolling_backtest.json", d.rawBacktest],
    ["/data/hindcast.json", d.rawHindcast],
  ] as const;
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-card-border bg-card-border sm:grid-cols-2">
      {links.map(([href, label]) => (
        <a key={href} href={href} className="group bg-background px-5 py-4 text-sm text-foreground transition-colors hover:bg-background-secondary">
          <span className="block font-medium">{label}</span>
          <span className="mt-1 block font-mono text-[0.7rem] text-foreground-muted group-hover:text-foreground">{href}</span>
        </a>
      ))}
    </div>
  );
}

const COUNTRY_NAMES_FI: Record<string, string> = {
  Finland: "Suomi",
  "South Korea": "Etelä-Korea",
  "United States": "USA",
  Japan: "Japani",
  Brazil: "Brasilia",
  Global: "Maailma",
  "Sentinel: Bee colony loss": "Sentinelli: mehiläispesien häviö",
  "Sentinel: Bird population decline": "Sentinelli: lintukannan lasku",
  "Sentinel: Sperm concentration decline": "Sentinelli: siittiöpitoisuuden lasku",
};

function PredictionTable({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const d = COPY[language(locale)];
  const rows = compact ? BERM_V18_PREDICTIONS.slice(0, 3) : BERM_V18_PREDICTIONS;
  return (
    <div className="overflow-x-auto border-y border-card-border">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="text-[0.68rem] uppercase tracking-[0.1em] text-foreground-muted">
          <tr>
            <th className="py-3 pr-4 font-semibold">{d.tableCountry}</th>
            <th className="py-3 pr-4 font-semibold">{d.tableYear}</th>
            <th className="py-3 pr-4 font-semibold">{d.tableMetric}</th>
            <th className="py-3 pr-4 font-semibold">{d.tableCentral}</th>
            <th className="py-3 font-semibold">{d.tableInterval}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-card-border text-foreground-muted">
              <td className="py-3 pr-4 font-medium text-foreground">{language(locale) === "fi" ? COUNTRY_NAMES_FI[row.country] ?? row.country : row.country}</td>
              <td className="py-3 pr-4 font-mono">{row.year}</td>
              <td className="py-3 pr-4">{row.metric}</td>
              <td className="py-3 pr-4 font-mono">{row.central}</td>
              <td className="py-3 font-mono">{row.ci[0]}–{row.ci[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-card-border pt-7">
      <h2 className="editorial-section-heading mb-5">{title}</h2>
      {children}
    </section>
  );
}

export function LegacyV18Page({
  locale,
  section,
}: {
  locale: string;
  section: LegacyV18Section;
}) {
  const page = (
    <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
      {section === "home" && <Overview locale={locale} />}
      {section === "model" && <Model locale={locale} />}
      {section === "evidence" && <Evidence locale={locale} />}
      {section === "predictions" && <Predictions locale={locale} />}
      {section === "explore" && <Explore locale={locale} />}
      {section === "sentinel" && <Sentinel locale={locale} />}
      {section === "ecology" && <Ecology locale={locale} />}
      {section === "references" && <References locale={locale} />}
      {section === "about" && <Notes locale={locale} />}
    </div>
  );
  return <>{page}</>;
}

function Overview({ locale }: { locale: string }) {
  const lang = language(locale);
  const d = COPY[lang];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="home" title={d.overviewTitle} deck={d.overviewDeck} />
      <p className="max-w-3xl text-lg leading-8 text-foreground-muted">{d.overviewLead}</p>
      <DetailSection title={d.preservedTitle}>
        <div className="grid gap-px overflow-hidden rounded-md border border-card-border bg-card-border md:grid-cols-3">
          {d.preserved.map((item, index) => (
            <article key={item.title} className="bg-background p-6">
              <p className="editorial-kicker mb-3 text-accent">0{index + 1}</p>
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </DetailSection>
      <DetailSection title={d.predictionTitle}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.predictionDeck}</p>
        <PredictionTable locale={locale} compact />
        <Link className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover" href={legacyV18Href(locale, "predictions")}>
          {lang === "fi" ? "Avaa koko v18-rekisteri" : "Open the full v18 registry"} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </DetailSection>
      <SourceStrip locale={locale} />
    </div>
  );
}

function Model({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="model" title={d.modelTitle} deck={d.modelDeck} />
      <DetailSection title={d.modelTitle}>
        <div className="grid gap-px overflow-hidden rounded-md border border-card-border bg-card-border lg:grid-cols-3">
          {d.levels.map(([label, title, text]) => (
            <article key={label} className="bg-background p-6">
              <p className="editorial-kicker mb-3 text-accent">{label}</p>
              <h3 className="mb-3 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{text}</p>
            </article>
          ))}
        </div>
      </DetailSection>
      <DetailSection title={d.equationCaption}>
        <div className="max-w-3xl border-l-2 border-accent bg-background-secondary px-6 py-5">
          <p className="font-mono text-base text-foreground">χ(Ā) = Ā / √(1 + Ā²)</p>
          <p className="mt-3 font-mono text-base text-foreground">total = ambient + χ(ambient) × personal</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {language(locale) === "fi"
              ? "Tämä yhtälöpari on v18.0:n alkuperäinen skalaari-altistuskytkentä. Nykyinen FieldState–ASFR-v2 käyttää erillistä mittaus-, siirto- ja elintilamäärittelyä."
              : "This equation pair is the original v18.0 scalar exposure coupling. The current FieldState–ASFR-v2 presentation uses a separate measurement, transfer and organ-state specification."}
          </p>
        </div>
      </DetailSection>
      <DetailSection title={language(locale) === "fi" ? "V18:n palautumis- ja kompensaatioajattelu" : "v18 recovery and compensation framing"}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="text-sm leading-relaxed text-foreground-muted">
            <p>
              {language(locale) === "fi"
                ? "V18 erotteli VGIC-porttauksen, ROS-puhdistuman, DNA-korjauksen, Leydig-solutoiminnan ja hermostollisen estehaaran eri palautumisaikoihin. Nämä olivat version rakenteellisia oletuksia, joista osa on myöhemmin tarkentunut elinkohtaisiksi tiloiksi."
                : "v18 separated VGIC gating, ROS clearance, DNA repair, Leydig-cell function and a neural barrier branch into different recovery times. These were structural assumptions in that version; several have since been refined into organ-specific states."}
            </p>
          </div>
          <div className="border border-card-border bg-background-secondary p-5">
            <p className="editorial-kicker mb-2 text-accent">v18</p>
            <p className="font-mono text-sm text-foreground">TFR_eff = (bioCap × behav)^(1−α) × …</p>
            <p className="mt-3 text-xs leading-relaxed text-foreground-muted">α = 0.43 in the original published v18 specification.</p>
          </div>
        </div>
      </DetailSection>
      <CompareCurrent locale={locale} />
      <SourceStrip locale={locale} />
    </div>
  );
}

function Evidence({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="evidence" title={d.evidenceTitle} deck={d.evidenceDeck} />
      <DetailSection title={d.oldPathway}>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.oldPathwayText}</p>
      </DetailSection>
      <DetailSection title={language(locale) === "fi" ? "V18-katalogin poiminto" : "Selection from the v18 catalogue"}>
        <div className="grid gap-px overflow-hidden rounded-md border border-card-border bg-card-border lg:grid-cols-2">
          {BERM_V18_EVIDENCE.slice(0, 6).map((item) => (
            <article key={`${item.pathway}-${item.study}`} className="bg-background p-5">
              <p className="editorial-kicker mb-2 text-accent">{item.pathway} · {item.level}</p>
              <h3 className="text-sm font-semibold leading-snug">{item.study} ({item.year})</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{item.finding}</p>
            </article>
          ))}
        </div>
      </DetailSection>
      <DetailSection title={d.naturalTitle}>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.naturalText}</p>
      </DetailSection>
      <DetailSection title={d.referencesTitle}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.referencesDeck}</p>
        <div className="flex flex-wrap gap-3">
          <a href={`${SOURCE_URL}/website/public/data/references.json`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-card-border px-4 py-2 text-sm font-medium hover:border-foreground-muted">
            <Database size={15} aria-hidden="true" /> {d.sourceSnapshot}
          </a>
          <Link href={`/${locale}/evidence`} className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">
            <FlaskConical size={15} aria-hidden="true" /> {d.currentRegistry}
          </Link>
        </div>
      </DetailSection>
      <SourceStrip locale={locale} />
    </div>
  );
}

function Predictions({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="predictions" title={d.predictionTitle} deck={d.predictionDeck} />
      <PredictionTable locale={locale} />
      <DetailSection title={d.dataTitle}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.dataText}</p>
        <ArchiveLinks locale={locale} />
      </DetailSection>
      <CompareCurrent locale={locale} />
      <SourceStrip locale={locale} />
    </div>
  );
}

function Explore({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="explore" title={d.scenarioTitle} deck={d.scenarioDeck} />
      <DetailSection title={d.dataTitle}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.dataText}</p>
        <ArchiveLinks locale={locale} />
      </DetailSection>
      <DetailSection title={language(locale) === "fi" ? "Arkistoidun selaimen käyttö" : "Using the archived explorer"}>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {language(locale) === "fi"
            ? "V18:n maaskenaariodata sisältää samassa versiossa käytetyt ambient-, henkilökohtaisen kanavan, χ-kytkennän, kumulatiivisen EMF:n, biologisen kapasiteetin ja TFR-skenaariorivit. Ne ovat saatavilla sellaisina kuin ne kuuluivat v18:n laskentareittiin."
            : "The v18 country scenario data contains the ambient, personal-channel, χ-coupling, cumulative EMF, biological-capacity and TFR scenario rows used by that version. They remain available as they belonged to the v18 calculation route."}
        </p>
      </DetailSection>
      <SourceStrip locale={locale} />
    </div>
  );
}

function Sentinel({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="sentinel" title={d.sentinelTitle} deck={d.sentinelDeck} />
      <DetailSection title={language(locale) === "fi" ? "V18:n sentinel-ajatus" : "The v18 sentinel idea"}>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {language(locale) === "fi"
            ? "Tämä näkymä säilyttää v18:n ajatuksen siitä, että mehiläiset, linnut, kotieläimet ja lisääntymisbiologiset päätepisteet voivat toimia rinnakkaisina signaaleina. Nykyinen sentinel-reitti tarkentaa tätä FieldState-, lajikohtaisen siirron ja viivehypoteesien kautta."
            : "This view preserves the v18 idea that bees, birds, domestic animals and reproductive endpoints can act as parallel signals. The current sentinel route refines this through FieldState, species-specific transfer and lead–lag hypotheses."}
        </p>
      </DetailSection>
      <CompareCurrent locale={locale} currentPath="sentinel" />
      <SourceStrip locale={locale} />
    </div>
  );
}

function Ecology({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="ecology" title={d.ecologyTitle} deck={d.ecologyDeck} />
      <DetailSection title={language(locale) === "fi" ? "Mitä säilyy" : "What is retained"}>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {language(locale) === "fi"
            ? "V18:n lajirajainen näkökulma säilyy tässä historiallisena lähtökohtana. Nykyinen ekologiasivu erottaa staattisen/triboelektrisen rajapinnan, ELF-, geomagneettisen ja RF-kenttäluokat sekä erottaa mitatun käyttäytymishavainnon testattavasta valinta- ja evoluutiolaajennuksesta."
            : "The v18 cross-species perspective is retained here as its historical starting point. The current ecology page separates static/triboelectric, ELF, geomagnetic and RF field classes and distinguishes measured behavioural observations from testable selection and evolution extensions."}
        </p>
      </DetailSection>
      <CompareCurrent locale={locale} currentPath="ecology" />
      <SourceStrip locale={locale} />
    </div>
  );
}

function References({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="references" title={d.referencesTitle} deck={d.referencesDeck} />
      <DetailSection title={d.sourceSnapshot}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {language(locale) === "fi"
            ? "V18:n 129-tietueinen lähdekokoelma säilyy version lähdetilannekuvassa. Nykyinen evidenssirekisteri ei korvaa sitä; se käyttää eri solmu- ja roolikieltä."
            : "The v18 collection of 129 reference records remains in the version source snapshot. The current evidence registry does not replace it; it uses a different node and role vocabulary."}
        </p>
        <a href={`${SOURCE_URL}/website/public/data/references.json`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-card-border px-4 py-2 text-sm font-medium hover:border-foreground-muted">
          <BookOpen size={15} aria-hidden="true" /> {d.openSource}
        </a>
      </DetailSection>
      <SourceStrip locale={locale} />
    </div>
  );
}

function Notes({ locale }: { locale: string }) {
  const d = COPY[language(locale)];
  return (
    <div className="space-y-14">
      <SectionHeader locale={locale} section="about" title={d.notesTitle} deck={d.notesDeck} />
      <DetailSection title={d.dataTitle}>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.dataText}</p>
        <ArchiveLinks locale={locale} />
      </DetailSection>
      <SourceStrip locale={locale} />
    </div>
  );
}

function CompareCurrent({ locale, currentPath = "model" }: { locale: string; currentPath?: string }) {
  const d = COPY[language(locale)];
  return (
    <section className="border-l-2 border-accent bg-background-secondary px-6 py-5">
      <h2 className="mb-2 text-lg font-semibold">{d.nextTitle}</h2>
      <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.nextText}</p>
      <Link href={`/${locale}/${currentPath}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover">
        {d.current} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </section>
  );
}
