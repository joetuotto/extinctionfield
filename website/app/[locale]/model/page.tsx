import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import CausalChainDiagram from "@/components/CausalChainDiagram";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";
import { ModelTableOfContents } from "@/components/ModelTableOfContents";
import { SpermCascadeChart } from "@/components/SpermCascadeChart";

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  architectureTitle: string;
  architecture: readonly { title: string; text: string }[];
  fieldStateTitle: string;
  fieldStateText: readonly string[];
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
  mathematicsTitle: string;
  mathematicsText: string;
  baseDocTitle: string;
  baseDocText: string;
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
        title: "Physics premise",
        text: "Lindgren-derived geometry is retained as an upstream structural hypothesis: a measured response may depend on background, vector direction, angle, phase and spectral content. It is not an independently validated estimate of human reproductive effect size.",
      },
      {
        title: "Biological route",
        text: "The model registers bounded study-to-node evidence for physical signatures, cellular intermediates and reproductive endpoints. A record can support one link without proving the complete route from a field to a population outcome.",
      },
      {
        title: "Demographic route",
        text: "Age-specific fertility rates are modelled before TFR. Couple capacity, demand/opportunity, tempo and ART/live-birth delivery are separate terms, so a period TFR trend is never treated as a direct gonadal measurement.",
      },
    ],
    fieldStateTitle: "FieldState replaces a national exposure scalar",
    fieldStateText: [
      "For each organ, v2 keeps background, ambient and personal field components distinct after an organ-, posture- and geometry-specific transfer. It retains vector information, phase/coherence, envelope or beat PSD, circadian context, calibration and provenance.",
      "FieldState measurement must preserve pulse structure: peak field, pulse duration, repetition rate and duty cycle are biologically relevant quantities that are lost in RMS averaging. BERM pathways A, B and D respond to peak field (threshold and pulse mechanisms), not time-averaged power. Only pathway C (BBB, 15%) responds to RMS. This distinguishes BERM from thermal models that use SAR (W/kg).",
      "National mobile-subscription series can describe technology diffusion. They remain distinct from local dosimetry and a measured organ FieldState.",
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
    mathematicsTitle: "Mathematical specification",
    mathematicsText:
      "The equations below state the active data contract, the organ-state structure and the boundary between a descriptive timing proxy and a calibratable FieldState result.",
    baseDocTitle: "Not reproduced on this page",
    baseDocText:
      "The formal Jacobian product structure (chapter 17), the proof-obligation register and the safety-system specification are described in the LBERM base document. They are not reproduced here; this page carries the measurement contract and the equations the published results depend on.",
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
        title: "Fysiikan premissi",
        text: "Lindgrenistä johdettu geometria säilyy upstream-rakennehypoteesina: mitattu vaste voi riippua taustasta, vektorin suunnasta, kulmasta, vaiheesta ja spektrisisällöstä. Se ei ole itsenäisesti validoitu arvio ihmisen lisääntymisvaikutuksen koosta.",
      },
      {
        title: "Biologinen reitti",
        text: "Malli rekisteröi rajattua tutkimus–solmu-evidenssiä fysikaalisille allekirjoituksille, soluvälivaiheille ja lisääntymispäätepisteille. Tietue voi tukea yhtä lenkkiä todistamatta koko reittiä kentästä väestötulokseen.",
      },
      {
        title: "Demografinen reitti",
        text: "Ikäkohtaiset hedelmällisyysluvut mallinnetaan ennen TFR:ää. Parikapasiteetti, kysyntä/mahdollisuus, tempo ja ART/live-birth-delivery pidetään erillisinä, joten periodin TFR-trendiä ei käsitellä suorana gonadimittauksena.",
      },
    ],
    fieldStateTitle: "FieldState korvaa kansallisen altistusskalaarin",
    fieldStateText: [
      "V2 säilyttää kullekin elimelle tausta-, ambient- ja henkilökohtaiset kenttäkomponentit erillään elin-, asento- ja geometriakohtaisen siirron jälkeen. Se säilyttää vektoritiedon, vaiheen/koherenssin, verhokäyrä- tai beat-PSD:n, vuorokausikontekstin, kalibroinnin ja provenienssin.",
      "FieldState-mittauksen on säilytettävä pulssirakenne: huippukenttä, pulssin kesto, toistotaajuus ja duty cycle ovat biologisesti relevantteja suureita, jotka katoavat RMS-keskiarvostuksessa. BERM:n polut A, B ja D vastaavat huippukenttään (kynnys- ja pulssimekanismit), eivät aikakeskiarvoistettuun tehoon. Vain polku C (BBB, 15 %) vastaa RMS:ään. Tämä erottaa BERM:n termisistä malleista, jotka käyttävät SAR:ia (W/kg).",
      "Kansalliset mobiililiittymäsarjat voivat kuvata teknologian leviämistä. Ne pidetään erillään paikallisesta dosimetriasta ja mitatusta elin-FieldStatesta.",
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
    mathematicsTitle: "Matemaattinen määrittely",
    mathematicsText:
      "Alla olevat yhtälöt määrittelevät aktiivisen datakontraktin, elintilarakenteen sekä rajan kuvailevan ajoitusproxyn ja kalibroitavan FieldState-tuloksen välillä.",
    baseDocTitle: "Ei toisteta tällä sivulla",
    baseDocText:
      "Formaali Jacobiaani-tulorakenne (luku 17), proof-obligation-rekisteri ja turvajärjestelmien määrittely kuvataan LBERM-perusdokumentissa. Niitä ei toisteta tässä; tämä sivu kantaa mittauskontraktin ja ne yhtälöt, joihin julkaistut tulokset nojaavat.",
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
  const diagramLabel = language === "fi"
    ? "KUVIO 01 · REKISTERÖITY MALLIARKKITEHTUURI"
    : "FIGURE 01 · REGISTERED MODEL ARCHITECTURE";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-4xl border-b border-card-border pb-9">
        <div className="editorial-kicker mb-4 inline-flex items-center gap-2 text-accent">
          <GitBranch size={14} aria-hidden="true" />
          FieldState–ASFR v2 architecture · BERM v18 evidence and predictions
        </div>
        <h1 className="mb-4 text-4xl sm:text-5xl">{d.title}</h1>
        <p className="editorial-deck">{d.subtitle}</p>
      </header>

      <FieldStateStatus locale={language} />

      <div className="flex gap-12 items-start">
        <ModelTableOfContents locale={language} />

        <article className="min-w-0 flex-1 space-y-16">
          <section id="architecture" className="border-t editorial-rule pt-6">
            <h2 className="editorial-section-heading mb-6">{d.architectureTitle}</h2>
            <div className="grid md:grid-cols-3 md:divide-x md:divide-card-border">
              {d.architecture.map((item, index) => (
                <article key={item.title} className="border-t border-card-border py-5 md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
                  <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
                  <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="fieldstate-input" className="border-t border-card-border pt-6">
            <h2 className="editorial-section-heading mb-4">{d.fieldStateTitle}</h2>
            <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
              {d.fieldStateText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
              {d.staticInterfaceText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section id="causal-diagram" className="border-t border-card-border pt-6">
            <figure className="data-figure overflow-hidden">
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
              {d.organText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="border-t border-card-border pt-6">
            <SpermCascadeChart locale={language} />
          </section>

          <section id="asfr-tfr" className="border-t border-card-border pt-6">
            <h2 className="editorial-section-heading mb-4">{d.asfrTitle}</h2>
            <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
              {d.asfrText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="border-t border-card-border pt-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="editorial-section-heading">{d.mathematicsTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.mathematicsText}</p>
              </div>
              <Link href={`/${language}/evidence`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                {d.evidenceLink} →
              </Link>
            </div>
            <MathematicsSections locale={language} />

            <aside className="mt-10 max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
              <h3 className="editorial-kicker mb-2 text-foreground-muted">{d.baseDocTitle}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{d.baseDocText}</p>
            </aside>
          </section>
        </article>
      </div>
    </div>
  );
}
