import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Sigma } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import CausalChainDiagram from "@/components/CausalChainDiagram";

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  fieldStateTitle: string;
  fieldStateText: readonly string[];
  pulseTitle: string;
  pulseText: readonly string[];
  staticInterfaceTitle: string;
  staticInterfaceText: readonly string[];
  ecologyLink: string;
  diagramTitle: string;
  diagramText: string;
  organTitle: string;
  organText: readonly string[];
  asfrTitle: string;
  asfrText: readonly string[];
  evidenceLink: string;
  mathLink: string;
  modelLink: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "FieldState measurement specification",
    subtitle:
      "What a v2 record must contain: background, ambient and personal field components with organ-specific transfer, vector direction, pulse structure, circadian context and provenance.",
    metaTitle: "FieldState specification – Extinction Field",
    metaDescription:
      "The FieldState–ASFR-v2 measurement specification: what a record must contain and how it differs from a national exposure scalar.",
    fieldStateTitle: "FieldState replaces a national exposure scalar",
    fieldStateText: [
      "For each organ, v2 keeps background, ambient and personal field components distinct after an organ-, posture- and geometry-specific transfer. It retains vector information, phase/coherence, envelope or beat PSD, circadian context, calibration and provenance.",
      "National mobile-subscription series can describe technology diffusion. They remain distinct from local dosimetry and a measured organ FieldState.",
    ],
    pulseTitle: "Pulse structure is biologically relevant",
    pulseText: [
      "FieldState measurement must preserve pulse structure: peak field, pulse duration, repetition rate and duty cycle are biologically relevant quantities that are lost in RMS averaging.",
      "BERM pathways A, B and D respond to peak field (threshold and pulse mechanisms), not time-averaged power. Only pathway C (BBB, 15%) responds to RMS. This distinguishes BERM from thermal models that use SAR (W/kg).",
    ],
    staticInterfaceTitle: "Static triboelectric interface: a native local-physics branch",
    staticInterfaceText: [
      "BERM also registers a separate 0 Hz and transient-interface state for material–skin and organism interfaces: {Q, V, E(r,t), ∇E², dE/dt, τ}. Material, air-gap geometry, humidity, motion and grounding determine this state; it is not folded into an RF, ELF or national technology proxy.",
      "Historical textile readings are retained as physically underdetermined historical signals. They become a measurement-ready input only after a named earth/body reference, ground-path impedance and capacitance, probe geometry, calibrated local field map, charge measurement and decay curve are supplied. The same physics permits a separate ecological host–vegetation–tick contact branch without creating an uncalibrated reproductive or population coefficient.",
    ],
    ecologyLink: "Open the static-interface ecology branch",
    diagramTitle: "Registered causal route",
    diagramText:
      "The diagram makes the required intermediate states visible. Its labels describe the status of each link; they do not turn a collection of studies into a country-level coefficient. Click a node to inspect the bounded role and evidence attached to it.",
    organTitle: "Organ-specific reproductive state before population aggregation",
    organText: [
      "The male branch keeps blood–testis-barrier integrity, germline reserve, steroidogenesis, sperm output/function and DNA integrity distinct. The female branch keeps ovarian reserve, oocyte redox, ovulatory clock, luteal/implantation support and placental barrier distinct.",
      "Each state has reversible (R) and persistent (P) components only where an explicit increment mapping, parameter identifier and supporting evidence record are supplied. BTB has its own registered reproductive branch. BBB, placenta and retina remain separate candidate states rather than evidence for a global barrier multiplier or a female-capacity coefficient.",
    ],
    asfrTitle: "ASFR first; TFR is a derived period identity",
    asfrText: [
      "The population layer combines paired male and female conception/live-birth capacity while preserving shared-household and partner covariance. It then reports biological capacity separately from demand/opportunity, tempo and ART/live-birth delivery for each age group.",
      "A national FieldState–ASFR coefficient is not yet estimated: the matched FieldState, biological-endpoint and couple panels required for calibration have not been assembled. Accordingly, v2 publishes no country TFR forecast.",
    ],
    evidenceLink: "Browse the bounded evidence registry",
    mathLink: "FieldState mathematics (§1–§8)",
    modelLink: "← Back to model overview",
  },
  fi: {
    title: "FieldState-mittausmäärittely",
    subtitle:
      "Mitä v2-tietueen on sisällettävä: tausta-, ambient- ja henkilökohtaiset kenttäkomponentit elinkohtaisella siirrolla, vektorin suunta, pulssirakenne, vuorokausikonteksti ja provenienssi.",
    metaTitle: "FieldState-määrittely – Extinction Field",
    metaDescription:
      "FieldState–ASFR-v2:n mittausmäärittely: mitä tietue vaatii ja miten se eroaa kansallisesta altistusskaalasta.",
    fieldStateTitle: "FieldState korvaa kansallisen altistusskalaarin",
    fieldStateText: [
      "V2 säilyttää kullekin elimelle tausta-, ambient- ja henkilökohtaiset kenttäkomponentit erillään elin-, asento- ja geometriakohtaisen siirron jälkeen. Se säilyttää vektoritiedon, vaiheen/koherenssin, verhokäyrä- tai beat-PSD:n, vuorokausikontekstin, kalibroinnin ja provenienssin.",
      "Kansalliset mobiililiittymäsarjat voivat kuvata teknologian leviämistä. Ne pidetään erillään paikallisesta dosimetriasta ja mitatusta elin-FieldStatesta.",
    ],
    pulseTitle: "Pulssirakenne on biologisesti relevantti",
    pulseText: [
      "FieldState-mittauksen on säilytettävä pulssirakenne: huippukenttä, pulssin kesto, toistotaajuus ja duty cycle ovat biologisesti relevantteja suureita, jotka katoavat RMS-keskiarvostuksessa.",
      "BERM:n polut A, B ja D vastaavat huippukenttään (kynnys- ja pulssimekanismit), eivät aikakeskiarvoistettuun tehoon. Vain polku C (BBB, 15 %) vastaa RMS:ään. Tämä erottaa BERM:n termisistä malleista, jotka käyttävät SAR:ia (W/kg).",
    ],
    staticInterfaceTitle: "Staattinen triboelektrinen rajapinta: natiivi paikallisfysiikan haara",
    staticInterfaceText: [
      "BERM rekisteröi myös erillisen 0 Hz:n ja transienttirajapinnan tilan materiaali–iho- ja eliörajapinnoille: {Q, V, E(r,t), ∇E², dE/dt, τ}. Materiaali, ilmarakon geometria, kosteus, liike ja maadoitus määrittävät tilan; sitä ei sulauteta RF:ään, ELF:ään eikä kansalliseen teknologiaproxyyn.",
      "Historialliset tekstiilimittarilukemat säilytetään fysikaalisesti alimäärättyinä historiallisina signaaleina. Niistä tulee mittausvalmis syöte vasta, kun nimetty maa-/kehoreferenssi, maareitin impedanssi ja kapasitanssi, mittapään geometria, kalibroitu paikalliskenttäkartta, varausmittaus ja purkautumiskäyrä on toimitettu. Sama fysiikka mahdollistaa erillisen ekologisen isäntä–kasvillisuus–punkki-kontaktihaaran ilman kalibroimatonta lisääntymis- tai populaatiokerrointa.",
    ],
    ecologyLink: "Avaa staattisen rajapinnan ekologinen haara",
    diagramTitle: "Rekisteröity kausaalireitti",
    diagramText:
      "Kaavio tekee tarvittavat välitilat näkyviksi. Sen merkinnät kuvaavat kunkin lenkin tilaa; ne eivät muuta tutkimuskokoelmaa maakohtaiseksi kertoimeksi. Solmua klikkaamalla näet sille kiinnitetyn rajatun roolin ja evidenssin.",
    organTitle: "Elinkohtainen lisääntymistila ennen väestötason yhdistämistä",
    organText: [
      "Mieshaara pitää veri–kivesesteen, ituradan varannon, steroidogeneesin, siittiötuoton/toiminnan ja DNA-eheyden erillisinä. Naishaara pitää munasarjavarannon, oosyyttiredoxin, ovulaation kellotuksen, luteaali-/implantaatio-tuen ja istukkaesteen erillisinä.",
      "Jokaisella tilalla on palautuva (R) ja persistentti (P) osa vain silloin, kun eksplisiittinen incrementtimapping, parametri-ID ja sitä tukeva evidenssitietue on määritelty. BTB:llä on oma rekisteröity lisääntymishaara. BBB, istukka ja retina ovat erillisiä kandidaattitiloja, eivät näyttöä globaalista estekertoimesta tai naiskapasiteetin kertoimesta.",
    ],
    asfrTitle: "ASFR ensin; TFR on johdettu periodi-identiteetti",
    asfrText: [
      "Väestökerros yhdistää paritetun miehen ja naisen conception/live-birth-kapasiteetin säilyttäen yhteisen kotiympäristön ja partnerikovarianssin. Sen jälkeen se raportoi biologisen kapasiteetin erillään kysynnästä/mahdollisuudesta, temposta ja ART/live-birth-deliverystä jokaiselle ikäryhmälle.",
      "Maakohtaista FieldState–ASFR-kerrointa ei vielä estimoida: kalibroinnin vaatimia kohdistettuja FieldState-, biologisten päätepisteiden ja paripaneeleja ei ole koottu. Siksi v2 ei julkaise maakohtaisia TFR-ennusteita.",
    ],
    evidenceLink: "Selaa rajattua evidenssirekisteriä",
    mathLink: "FieldState-matematiikka (§1–§8)",
    modelLink: "← Takaisin mallin yleiskatsaukseen",
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

export default async function FieldStatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language: Locale = locale === "fi" ? "fi" : "en";
  const d = t[language];
  const diagramLabel = language === "fi"
    ? "KUVIO 01 · REKISTERÖITY MALLIARKKITEHTUURI"
    : "FIGURE 01 · REGISTERED MODEL ARCHITECTURE";

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Radio} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${language}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">·</span>
        <Link href={`/${language}/model/fieldstate/math`} className="text-accent hover:underline">{d.mathLink}</Link>
      </nav>

      <article className="space-y-14">
        <section id="fieldstate-input">
          <h2 className="editorial-section-heading mb-4">{d.fieldStateTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.fieldStateText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="pulse-structure" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.pulseTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.pulseText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="static-interface" className="border-t border-card-border pt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="editorial-section-heading">{d.staticInterfaceTitle}</h2>
            <Link href={`/${language}/ecology`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
              {d.ecologyLink} →
            </Link>
          </div>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.staticInterfaceText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="causal-diagram" className="border-t border-card-border pt-6">
          <figure className="data-figure">
            <figcaption className="data-figure__caption">
              <p className="editorial-kicker text-accent">{diagramLabel}</p>
              <p className="data-figure__title mt-1">{d.diagramTitle}</p>
            </figcaption>
            <div className="overflow-x-auto p-1 sm:p-3">
              <CausalChainDiagram locale={language} />
            </div>
            <p className="data-figure__note">{d.diagramText}</p>
          </figure>
        </section>

        <section id="organ-states" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.organTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.organText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="asfr-tfr" className="border-t border-card-border pt-6">
          <h2 className="editorial-section-heading mb-4">{d.asfrTitle}</h2>
          <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
            {d.asfrText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-4">
            <Link href={`/${language}/evidence`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
              {d.evidenceLink} →
            </Link>
          </div>
        </section>
      </article>

      <NextPageLink
        href={`/${language}/model/fieldstate/math`}
        label={language === "fi" ? "Seuraavaksi" : "Next"}
        title={language === "fi" ? "FieldState-matematiikka" : "FieldState mathematics"}
        icon={Sigma}
      />
    </div>
  );
}
