import type { Metadata } from "next";
import Link from "next/link";
import { Radio, ArrowRight, MapPin, Clock, Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { MathBlock } from "@/components/MathBlock";
import { TechnologyHistoryExplorer } from "@/components/TechnologyHistoryExplorer";
import { pickCopy } from "@/lib/i18n";
import { technologyHistory } from "@/lib/technology-history";

const COPY = {
  en: {
    title: "How the electromagnetic environment developed",
    subtitle: "Technologies, regional adoption and the physical conditions that connect their history to BERM.",
    back: "← Evidence", contextTitle: "One environment, many different histories",
    context: "Electricity reaches organisms through very different arrangements: a cable in a wall, a radio transmitter, an inverter, an electrode in water or a charged material. Each has its own location, waveform and operating rhythm. Their histories include new installations, replacement, changing use and shutdowns.",
    context2: "BERM studies how a local physical state can couple to an organism in a particular receiving state. Technology history helps reconstruct that physical setting. Begin here with the sources and their timing; the biological interpretation follows through BERM's explicitly defined response bridges.",
    atlasIntro: "Explore technology adoption alongside population changes, or inspect the physical reconstruction and its assumptions for Finland.",
    atlasChanges: "Compare historical changes", atlasFields: "Explore Finland's field reconstruction",
    guide: "Read the history in four steps", steps: [
      { title: "Identify the source", body: "Which device, circuit, material or transmitter is involved?" },
      { title: "Locate its adoption", body: "Where and when was it installed, used, replaced or removed?" },
      { title: "Reconstruct the encounter", body: "Record operation, distance, orientation, contact and time." },
      { title: "Connect to BERM", body: "Apply a stated physical reconstruction and conditional receiver model." },
    ],
    explorerTitle: "Technologies, history and data", explorerIntro: "The same catalogue supports all four views. Expand a technology for details, filter regional events, inspect reported quantities or follow the original sources.",
    familyCount: "technology families", eventCount: "historical events", sourceCount: "historical sources",
    geographyTitle: "Why place and season belong in the history", geography: [
      { title: "A name can cover different systems", body: "A smart meter may communicate over power lines, a local radio network or a mobile connection. Adoption must be linked to the actual system and network operator." },
      { title: "Use follows local rhythms", body: "Heating and cooling seasons, daylight, irrigation, grazing and work shifts change when a source operates and when an organism encounters it." },
      { title: "The local route matters", body: "An electrode, current return path, antenna or moving device determines where the source couples to the surroundings. Population density alone does not locate these routes." },
    ],
    meaningTitle: "What the observations tell us", meanings: [
      { title: "Historical event", body: "Dates and documents establish a bounded introduction, installation programme or shutdown." },
      { title: "Adoption statistic", body: "A source reports a device count, sales figure or share with a defined population." },
      { title: "Physical measurement", body: "A measurement describes a field or current at a recorded place, time and operating condition." },
      { title: "Conditional response", body: "BERM connects the reconstructed state to an organism through a specified response operator." },
    ],
    modelTitle: "How these records enter BERM", modelIntro: "A source's addition changes its relationship with the existing physical environment. Under the selected 2025 Lindgren premise, the geometric change contains cross terms. The catalogue supplies the history needed to reconstruct the source; the response belongs to BERM.",
    derivation: "Open the geometric derivation and response boundary", geometry: "Lindgren-derived geometry", geometryText: "Using the 2025 formulation in BERM's normalization, let A be the existing four-potential and b the added source. Expanding the outer product gives:",
    conditional: "BERM's conditional mechanism", conditionalText: "A receiver-specific kernel K and state S connect the geometric perturbation to a candidate observable u. Their scope, units and calibration must be declared for that receiver:",
    imported: "Imported empirical biology", importedText: "Measurements of reception, cellular processes and organism responses constrain their own links. They are connected to the reconstruction through a stated bridge and retain their measured species, tissue and protocol.",
    open: "Open calibration", openText: "The gauge prescription, physical scale, tissue kernels, sign and lag remain explicit calibration questions. A historical event can be documented before these response parameters are identified.",
    fieldstate: "FieldState can provide a physical measurement or estimate at BERM's input boundary. BERM remains the explanatory and predictive model.", readDerivation: "Read the model derivation",
    connections: "Continue along the model", connectionLinks: ["Signal structure and coupling", "Physical observations", "Biological coordination", "Light and electrical drivers", "Predictions"],
    footer: "Source edition: 8 September 2026. Events and observations retain their original geography, units and source scope.",
  },
  fi: {
    title: "Miten sähkömagneettinen ympäristö rakentui",
    subtitle: "Teknologiat, alueellinen omaksuminen ja fysikaaliset olosuhteet, jotka yhdistävät niiden historian BERM:iin.",
    back: "← Tutkimusnäyttö", contextTitle: "Yksi ympäristö, monta erilaista historiaa",
    context: "Sähkö kytkeytyy eliöiden ympäristöön monin tavoin: seinän johtimesta, radiolähettimestä, invertteristä, vedessä olevasta elektrodista tai varautuneesta materiaalista. Jokaisella on oma sijaintinsa, aaltomuotonsa ja käyttörytminsä. Historia sisältää asentamista, korvautumista, käytön muutoksia ja lähteiden poistumista.",
    context2: "BERM tarkastelee, miten paikallinen fysikaalinen tila voi kytkeytyä tietyssä vastaanotintilassa olevaan organismiin. Teknologiahistoria auttaa rekonstruoimaan tämän ympäristön. Tällä sivulla aloitetaan lähteistä ja ajoituksesta; biologiseen tulkintaan edetään BERM:n määriteltyjen vastesiltojen kautta.",
    atlasIntro: "Tarkastele teknologian omaksumista väestön muutosten rinnalla tai tutki Suomen fysikaalista rekonstruktiota ja sen oletuksia.",
    atlasChanges: "Vertaa historiallisia muutoksia", atlasFields: "Tutki Suomen kenttärekonstruktiota",
    guide: "Lue historiaa neljän vaiheen kautta", steps: [
      { title: "Tunnista lähde", body: "Mikä laite, virtapiiri, materiaali tai lähetin on kyseessä?" },
      { title: "Paikanna omaksuminen", body: "Missä ja milloin sitä asennettiin, käytettiin, korvattiin tai poistettiin?" },
      { title: "Kuvaa kohtaaminen", body: "Kirjaa käyttö, etäisyys, orientaatio, kontakti ja ajankohta." },
      { title: "Liitä BERM:iin", body: "Käytä määriteltyä fysikaalista rekonstruktiota ja ehdollista vastaanotinmallia." },
    ],
    explorerTitle: "Teknologiat, historia ja aineistot", explorerIntro: "Sama luettelo yhdistää kaikki neljä näkymää. Avaa teknologian tiedot, rajaa alueellisia tapahtumia, tarkastele raportoituja määriä tai siirry alkuperäislähteisiin.",
    familyCount: "teknologiaperhettä", eventCount: "historiatapahtumaa", sourceCount: "historialähdettä",
    geographyTitle: "Miksi paikka ja vuodenaika kuuluvat historiaan", geography: [
      { title: "Sama nimi kattaa eri järjestelmiä", body: "Älymittari voi viestiä sähköjohtimia, paikallista radioverkkoa tai matkapuhelinyhteyttä pitkin. Omaksuminen yhdistetään todelliseen tekniikkaan ja verkkoyhtiöön." },
      { title: "Käyttö seuraa paikallista rytmiä", body: "Lämmitys- ja jäähdytyskausi, päivänvalo, kastelu, laidunnus ja työvuorot muuttavat lähteen käyttöä ja organismin kohtaamisia." },
      { title: "Paikallinen reitti ratkaisee", body: "Elektrodi, virran paluureitti, antenni tai liikkuva laite määrittää lähteen kytkeytymistä ympäristöön. Väestötiheys yksin ei paikanna näitä reittejä." },
    ],
    meaningTitle: "Mitä havainnot kertovat", meanings: [
      { title: "Historiallinen tapahtuma", body: "Ajankohta ja dokumentti paikantavat rajatun ensikäytön, asennusohjelman tai poistumisen." },
      { title: "Omaksumistilasto", body: "Lähde raportoi laitemäärän, myynnin tai osuuden määritellystä perusjoukosta." },
      { title: "Fysikaalinen mittaus", body: "Mittaus kuvaa kenttää tai virtaa kirjatussa paikassa, ajassa ja käyttötilassa." },
      { title: "Ehdollinen vaste", body: "BERM yhdistää rekonstruoidun tilan organismiin määritellyn vasteoperaattorin kautta." },
    ],
    modelTitle: "Miten tietueet liittyvät BERM:iin", modelIntro: "Lähteen lisääminen muuttaa sen suhdetta olemassa olevaan fysikaaliseen ympäristöön. Valitun vuoden 2025 Lindgren-premissin puitteissa geometriseen muutokseen sisältyy ristitermejä. Luettelo tuo lähteen rekonstruointiin tarvittavan historian; vaste kuuluu BERM:iin.",
    derivation: "Avaa geometrinen johto ja vasteen rajapinta", geometry: "Lindgrenistä johdettu geometria", geometryText: "Vuoden 2025 muotoilussa BERM:n normalisoinnilla A on olemassa oleva nelipotentiaali ja b lisättävä lähdeosuus. Ulkotulon avaaminen antaa:",
    conditional: "BERM:n ehdollinen mekanismi", conditionalText: "Vastaanotinkohtainen ydin K ja tila S yhdistävät geometrisen muutoksen ehdotettuun havaittavaan suureeseen u. Niiden soveltamisala, yksiköt ja kalibrointi määritetään vastaanottimelle:",
    imported: "Tuotu empiirinen biologia", importedText: "Vastaanoton, soluprosessien ja organismivasteiden mittaukset rajaavat omia ketjun osiaan. Ne liitetään rekonstruktioon määritellyn sillan kautta ja säilyttävät tutkitun lajin, kudoksen ja koeasetelman.",
    open: "Avoin kalibrointi", openText: "Gauge-määritys, fysikaalinen mittakaava, kudosytimet, vasteen merkki ja viive säilyvät eksplisiittisinä kalibrointikysymyksinä. Historiatapahtuma voidaan dokumentoida ennen näiden vasteparametrien tunnistamista.",
    fieldstate: "FieldState voi tuottaa fysikaalisen mittauksen tai arvion BERM:n syöterajalla. BERM säilyy selittävänä ja ennustavana mallina.", readDerivation: "Lue mallin johto",
    connections: "Jatka mallin ketjussa", connectionLinks: ["Signaalirakenne ja kytkentä", "Fysikaaliset havainnot", "Biologinen koordinaatio", "Valo ja sähköiset ajurit", "Ennusteet"],
    footer: "Lähdeversio: 8.9.2026. Tapahtumat ja havainnot säilyttävät alkuperäisen alueensa, yksikkönsä ja lähteensä kattavuuden.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const paths = ["/model#signal-structure", "/measurement/fieldstate", "/model/biological-coordination", "/evidence/lighting", "/predictions"];
  return <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <TranslationNotice copy={COPY} locale={locale} />
    <Link href={`/${locale}/evidence`} className="text-sm text-foreground-muted hover:text-foreground mb-6 inline-block">{d.back}</Link>
    <PageHeader title={d.title} subtitle={d.subtitle} icon={Radio} />
    <section aria-labelledby="technology-context" className="mb-10 max-w-3xl">
      <h2 id="technology-context" className="text-xl font-semibold mb-4">{d.contextTitle}</h2>
      <p className="text-foreground-muted leading-relaxed">{d.context}</p><p className="text-foreground-muted leading-relaxed mt-4">{d.context2}</p>
      <p className="mt-5 text-sm text-foreground-muted leading-relaxed">{d.atlasIntro}</p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href={`/${locale}/explore?tab=atlas&view=change&country=FIN`} className="text-accent hover:underline">{d.atlasChanges} →</Link>
        <Link href={`/${locale}/explore?tab=atlas&view=fields&country=FIN`} className="text-accent hover:underline">{d.atlasFields} →</Link>
      </div>
    </section>
    <nav aria-label={d.guide} className="mb-12 rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-5">{d.guide}</p>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{d.steps.map((step, i) => <li key={step.title} className="flex gap-3">
        <span className="text-accent font-mono text-sm pt-0.5" aria-hidden="true">0{i + 1}</span><div><a href={i === 3 ? "#berm-connection" : "#explorer"} className="font-semibold text-sm hover:text-accent">{step.title}</a><p className="text-xs text-foreground-muted leading-relaxed mt-2">{step.body}</p></div>
      </li>)}</ol>
    </nav>
    <section id="explorer" className="mb-14" aria-labelledby="technology-explorer-title">
      <div className="mb-6"><h2 id="technology-explorer-title" className="text-2xl font-semibold mb-3">{d.explorerTitle}</h2><p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">{d.explorerIntro}</p><p className="mt-4 text-xs text-foreground-muted">{technologyHistory.technologies.length} {d.familyCount} · {technologyHistory.events.length} {d.eventCount} · {technologyHistory.sources.length} {d.sourceCount}</p></div>
      <TechnologyHistoryExplorer locale={locale} />
    </section>
    <section aria-labelledby="technology-geography" className="mb-12 border-t border-card-border pt-9">
      <h2 id="technology-geography" className="text-xl font-semibold mb-6">{d.geographyTitle}</h2>
      <div className="grid md:grid-cols-3 gap-6">{d.geography.map((item, i) => { const Icon = [MapPin, Clock, Activity][i]; return <div key={item.title}><Icon size={19} className="text-accent mb-3" aria-hidden="true" /><h3 className="font-semibold text-sm mb-2">{item.title}</h3><p className="text-sm leading-relaxed text-foreground-muted">{item.body}</p></div>; })}</div>
    </section>
    <section aria-labelledby="technology-meanings" className="mb-12"><h2 id="technology-meanings" className="text-xl font-semibold mb-5">{d.meaningTitle}</h2><dl className="grid sm:grid-cols-2 gap-x-7 gap-y-5">{d.meanings.map((item) => <div key={item.title} className="border-l-2 border-accent/30 pl-4"><dt className="text-sm font-semibold">{item.title}</dt><dd className="text-sm text-foreground-muted leading-relaxed mt-1">{item.body}</dd></div>)}</dl></section>
    <section id="berm-connection" className="mb-12" aria-labelledby="technology-berm-title">
      <h2 id="technology-berm-title" className="text-xl font-semibold mb-4">{d.modelTitle}</h2><p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.modelIntro}</p>
      <details className="rounded-xl border border-card-border mt-5 p-5 sm:p-6"><summary className="text-sm font-semibold cursor-pointer">{d.derivation}</summary>
        <div className="mt-6 space-y-6 text-sm">
          <div><h3 className="font-semibold mb-2">{d.geometry}</h3><p className="text-foreground-muted leading-relaxed">{d.geometryText}</p><MathBlock tex={String.raw`g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu`} /><MathBlock tex={String.raw`\Delta g_{\mu\nu}=\kappa\left(A_\mu b_\nu+b_\mu A_\nu+b_\mu b_\nu\right)`} /></div>
          <div><h3 className="font-semibold mb-2">{d.conditional}</h3><p className="text-foreground-muted leading-relaxed">{d.conditionalText}</p><MathBlock tex={String.raw`u_i(t)=\int_0^\infty K_i^{\mu\nu}\!\left(\tau;S_i(t-\tau)\right)\,\Delta g_{\mu\nu}(t-\tau)\,d\tau+\cdots`} /></div>
          <div><h3 className="font-semibold mb-2">{d.imported}</h3><p className="text-foreground-muted leading-relaxed">{d.importedText}</p></div>
          <div><h3 className="font-semibold mb-2">{d.open}</h3><p className="text-foreground-muted leading-relaxed">{d.openText}</p></div><p className="text-xs text-foreground-muted leading-relaxed">{d.fieldstate}</p>
          <Link href={`/${locale}/model/math#lindgren`} className="inline-flex items-center gap-2 text-accent hover:underline">{d.readDerivation}<ArrowRight size={14} /></Link>
        </div>
      </details>
    </section>
    <nav aria-label={d.connections} className="border-t border-card-border pt-6"><h2 className="text-sm font-semibold mb-4">{d.connections}</h2><div className="flex flex-wrap gap-x-6 gap-y-3">{paths.map((path, i) => <Link key={path} href={`/${locale}${path}`} className="inline-flex items-center gap-1 text-sm text-accent hover:underline">{d.connectionLinks[i]}<ArrowRight size={13} /></Link>)}</div></nav>
    <p className="mt-8 text-xs text-foreground-muted">{d.footer}</p>
  </div>;
}
