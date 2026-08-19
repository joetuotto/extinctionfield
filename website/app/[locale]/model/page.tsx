import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import CausalChainDiagram from "@/components/CausalChainDiagram";
import { FieldStateStatus } from "@/components/FieldStateStatus";
import { MathematicsSections } from "@/app/[locale]/mathematics/page";
import { ModelTableOfContents } from "@/components/ModelTableOfContents";

type Copy = {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  architectureTitle: string;
  architecture: readonly { title: string; text: string }[];
  fieldStateTitle: string;
  fieldStateText: readonly string[];
  diagramTitle: string;
  diagramText: string;
  organTitle: string;
  organText: readonly string[];
  asfrTitle: string;
  asfrText: readonly string[];
  legacyTitle: string;
  legacyText: string;
  evidenceLink: string;
  mathematicsTitle: string;
  mathematicsText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "BERM FieldState–ASFR-v2",
    subtitle:
      "A measurement-aware research specification from a physics premise to organ-specific reproductive states, age-specific fertility and TFR.",
    metaTitle: "BERM FieldState–ASFR-v2 – Extinction Field",
    metaDescription:
      "The measurement-aware FieldState–ASFR-v2 specification of the Bio-Electromagnetic Reproductive Model.",
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
      "The previous ambient + χ(ambient) × personal expression remains available only as a legacy timing-proxy adapter. National mobile-subscription series may describe technology diffusion, but they are neither local dosimetry nor a measured organ FieldState.",
    ],
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
    legacyTitle: "How to read the earlier model outputs",
    legacyText:
      "v16/v17 scalar cumEMF charts, hindcasts and numeric forecasts are retained as reproducible historical scenario artefacts. They are not re-labelled as FieldState–ASFR-v2 estimates and must not be interpreted as local exposure or biological-dose results.",
    evidenceLink: "Browse the bounded evidence registry",
    mathematicsTitle: "Mathematical specification",
    mathematicsText:
      "The equations below state the active data contract, the organ-state structure and the boundary between a descriptive timing proxy and a calibratable FieldState result.",
  },
  fi: {
    title: "BERM FieldState–ASFR-v2",
    subtitle:
      "Mittaustietoinen tutkimusmäärittely fysiikan premissistä elinkohtaisiin lisääntymistiloihin, ikäkohtaiseen hedelmällisyyteen ja TFR:ään.",
    metaTitle: "BERM FieldState–ASFR-v2 – Extinction Field",
    metaDescription:
      "Bio-sähkömagneettisen lisääntymismallin mittaustietoinen FieldState–ASFR-v2-määrittely.",
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
      "Aiempi ambient + χ(ambient) × personal -lauseke säilyy vain legacy-ajoitusproxy-adapterina. Kansalliset mobiililiittymäsarjat voivat kuvata teknologian leviämistä, mutta ne eivät ole paikallista dosimetriaa eivätkä mitattu elin-FieldState.",
    ],
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
    legacyTitle: "Miten aiempia mallituotoksia luetaan",
    legacyText:
      "V16/v17:n skalaariset cumEMF-kuvaajat, hindcastit ja numeroennusteet säilyvät toistettavina historiallisina skenaarioartefakteina. Niitä ei nimetä FieldState–ASFR-v2-arvioiksi, eikä niitä pidä tulkita paikallisiksi altistus- tai biologisen annoksen tuloksiksi.",
    evidenceLink: "Selaa rajattua evidenssirekisteriä",
    mathematicsTitle: "Matemaattinen määrittely",
    mathematicsText:
      "Alla olevat yhtälöt määrittelevät aktiivisen datakontraktin, elintilarakenteen sekä rajan kuvailevan ajoitusproxyn ja kalibroitavan FieldState-tuloksen välillä.",
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-4xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
          <GitBranch size={14} aria-hidden="true" />
          FieldState–ASFR-v2
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed">{d.subtitle}</p>
      </header>

      <FieldStateStatus locale={language} />

      <div className="flex gap-12 items-start">
        <ModelTableOfContents locale={language} />

        <article className="min-w-0 flex-1 space-y-14">
          <section id="architecture">
            <h2 className="text-xl font-semibold mb-4">{d.architectureTitle}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {d.architecture.map((item, index) => (
                <article key={item.title} className="rounded-lg border border-card-border bg-card-bg p-4">
                  <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
                  <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="fieldstate-input">
            <h2 className="text-xl font-semibold mb-3">{d.fieldStateTitle}</h2>
            <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
              {d.fieldStateText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section id="causal-diagram">
            <h2 className="text-xl font-semibold mb-3">{d.diagramTitle}</h2>
            <p className="mb-5 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.diagramText}</p>
            <CausalChainDiagram locale={language} />
          </section>

          <section id="organ-states">
            <h2 className="text-xl font-semibold mb-3">{d.organTitle}</h2>
            <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
              {d.organText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section id="asfr-tfr">
            <h2 className="text-xl font-semibold mb-3">{d.asfrTitle}</h2>
            <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-foreground-muted">
              {d.asfrText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section id="legacy" className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
            <h2 className="text-lg font-semibold">{d.legacyTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.legacyText}</p>
          </section>

          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{d.mathematicsTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">{d.mathematicsText}</p>
              </div>
              <Link href={`/${language}/evidence`} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                {d.evidenceLink} →
              </Link>
            </div>
            <MathematicsSections locale={language} />
          </section>
        </article>
      </div>
    </div>
  );
}
