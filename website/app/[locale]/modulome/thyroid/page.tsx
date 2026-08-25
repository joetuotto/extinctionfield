import type { Metadata } from "next";
import Link from "next/link";
import { Thermometer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Thyroid",
    subtitle:
      "Anterior neck = direct phone exposure — HPT axis disruption via pituitary thyrotroph Cav3",
    backLink: "← Back to Modulome",

    s1SectionTitle: "HPT Axis and Thyroid Channels",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav3 (T-type)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "Pituitary thyrotroph → TSH → Thyrocyte",
    functionVal: "TSH secretion — controls thyroid hormone synthesis (T3/T4)",
    levelVal: "M|C",

    s2Title: "HPT Axis Mechanism",
    s2p1:
      "Thyroid hormone production is governed by the hypothalamic-pituitary-thyroid (HPT) axis. The hypothalamus releases TRH (thyrotropin-releasing hormone), which stimulates pituitary thyrotrophs to secrete TSH (thyroid-stimulating hormone). TSH then drives the thyroid gland to produce T3 and T4 — the hormones that regulate metabolic rate, growth, and development throughout the body.",
    s2p2:
      "Pituitary thyrotrophs use Cav3 T-type voltage-gated calcium channels for TSH secretion. This is the same channel class used by gonadotrophs for LH/FSH release — making the pituitary a shared vulnerability node where EMF can simultaneously disrupt reproductive and thyroid axes through identical Cav3 perturbation.",
    s2p3:
      "EMF → Cav3 perturbation in thyrotrophs → TSH dysregulation → thyroid dysfunction. Because TSH controls the entire thyroid hormone cascade, even small perturbations at the pituitary level amplify downstream into clinically significant thyroid dysfunction.",

    s3Title: "Pituitary Exposure — Outside the Blood-Brain Barrier",
    s3Text:
      "The anterior pituitary sits outside the blood-brain barrier. Unlike neurons within the central nervous system, pituitary thyrotrophs are directly exposed to circulating blood — and to whatever electromagnetic field intensities reach the bloodstream. This means EMF does not need to penetrate the BBB to affect thyroid regulation. The pituitary is an unshielded endocrine control node, making Cav3-dependent hormone secretion (TSH, LH, FSH, GH) directly vulnerable to EMF perturbation.",

    s2SectionTitle: "Anterior Neck Exposure",

    s4Title: "Phone Proximity Physics",
    s4p1:
      "The thyroid gland sits in the anterior neck — directly adjacent to where mobile phones are held during voice calls. In the phone-at-ear position, the thyroid is within 5–10cm of the RF emission source. The inverse-square law dictates that EMF power density is inversely proportional to the square of distance: at 5cm, the field intensity at the thyroid is 4× higher than at 10cm.",
    s4p2:
      "This makes the thyroid one of the most directly phone-exposed endocrine organs in the body. Unlike the pituitary (which receives EMF through the skull) or the gonads (which are typically 30+ cm from the phone), the thyroid faces near-field RF exposure during every voice call with minimal tissue shielding.",

    s5Title: "Epidemiological Context",
    s5Stats: [
      "Hypothyroidism is rising globally, with prevalence highest in women (5:1 female-to-male ratio)",
      "Hashimoto's thyroiditis (autoimmune) is the most common cause of hypothyroidism in iodine-sufficient countries",
      "Thyroid cancer incidence has increased approximately 3× since the 1980s — paralleling global mobile phone adoption",
      "Autoimmune thyroid disease involves the Ca²⁺-calcineurin-NFAT pathway in T-cells — the same pathway as BERM cascade #10",
    ],

    s3SectionTitle: "Evidence and Predictions",

    s6Title: "EMF–Thyroid Evidence Chain",
    s6Chain:
      "EMF → Cav3 perturbation (thyrotroph) → TSH dysregulation → T3/T4 imbalance → thyroid dysfunction",
    s6p1:
      "Pituitary Cav3 T-type channels are well-established in endocrine physiology. The same mechanism that governs gonadotroph LH pulsatility (BERM pituitary modulome) operates in thyrotrophs for TSH secretion. Systematic review evidence (F1000Research) identified five observational studies linking EMF exposure to hypothyroidism. Workers with more than 33 hours per month of phone use showed lower TSH levels.",
    s6p2:
      "Both hypothyroidism and hyperthyroidism reduce fertility — creating a direct link between thyroid disruption and total fertility rate decline. The thyroid connects to the BERM reproductive pathway through the pituitary hub: the same Cav3 perturbation that disrupts LH/FSH simultaneously disrupts TSH, making thyroid dysfunction a parallel consequence of the central BERM mechanism.",

    s7Title: "BERM Predictions",
    s7Text:
      "The BERM framework generates two specific, testable predictions for the thyroid modulome:",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "Mobile phone users show altered TSH levels compared to non-users when controlling for iodine intake, age, sex, and autoimmune status. The effect is dose-dependent on daily call duration and years of use.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "Thyroid cancer incidence correlates with cumulative mobile phone use (years of use × daily call duration) after controlling for detection bias from increased screening. The correlation is specific to papillary thyroid carcinoma, the subtype most associated with the anterior neck exposure zone.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systematic Review",
        finding:
          "Five observational studies found associations between EMF exposure and hypothyroidism. Occupational phone use exceeding 33 hours per month was associated with lower TSH levels.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Pituitary Ion Channels",
        finding:
          "T-type (Cav3) calcium channels mediate hormone secretion in pituitary thyrotrophs and gonadotrophs. Cav3 perturbation alters pulsatile TSH and LH release patterns.",
      },
    ],

    seeAlso: "See also",
    pituitaryModulome: "Pituitary modulome",
    predictionsPage: "Predictions — THYROID-1/2",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Kilpirauhanen",
    subtitle:
      "Kaulan etuosa = suora puhelinaltistus — HPT-akselin häiriö aivolisakkeen tyreotrooppi-Cav3:n kautta",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "HPT-akseli ja kilpirauhaskanavat",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav3 (T-tyyppi)",
    geneVal: "CACNA1G/H/I",
    cellTypeVal: "Aivolisäkkeen tyreotrooppi → TSH → Tyreosyytti",
    functionVal: "TSH-eritys — ohjaa kilpirauhashormonien synteesiä (T3/T4)",
    levelVal: "M|C",

    s2Title: "HPT-akselin mekanismi",
    s2p1:
      "Kilpirauhashormonien tuotantoa ohjaa hypotalamus–aivolisäke–kilpirauhanen (HPT) -akseli. Hypotalamus vapauttaa TRH:ta (tyreotropiinia vapauttava hormoni), joka stimuloi aivolisäkkeen tyreotrooppeja erittämään TSH:ta (kilpirauhasta stimuloiva hormoni). TSH puolestaan ohjaa kilpirauhasta tuottamaan T3:a ja T4:ää — hormoneja jotka säätelevät aineenvaihduntanopeutta, kasvua ja kehitystä koko kehossa.",
    s2p2:
      "Aivolisäkkeen tyreotrooppeja käyttävät Cav3-tyypin T-tyypin jänniteohjattuja kalsiumkanavia TSH:n eritykseen. Kyseessä on sama kanavaluokka jota gonadotrooppisolut käyttävät LH/FSH-vapautukseen — mikä tekee aivolisäkkeestä jaetun haavoittuvuussolmun, jossa EMF voi samanaikaisesti häiritä lisääntymis- ja kilpirauhasakseleja identtisen Cav3-häiriön kautta.",
    s2p3:
      "EMF → Cav3-häiriö tyreotrooppissa → TSH:n säätelyn häiriö → kilpirauhasen toimintahäiriö. Koska TSH ohjaa koko kilpirauhashormonikaskadia, pienetkin häiriöt aivolisäketasolla vahvistuvat alavirrassa kliinisesti merkittäväksi kilpirauhasen toimintahäiriöksi.",

    s3Title: "Aivolisäkkeen altistus — veri-aivoesteen ulkopuolella",
    s3Text:
      "Aivolisäkkeen etuosa sijaitsee veri-aivoesteen ulkopuolella. Toisin kuin keskushermoston neuronit, aivolisäkkeen tyreotrooppeja ovat suoraan altistuneet verenkierrolle — ja verenkierron tavoittamille sähkömagneettisille kentille. Tämä tarkoittaa ettei EMF:n tarvitse läpäistä veri-aivoestettä vaikuttaakseen kilpirauhasen säätelyyn. Aivolisäke on suojaamaton endokriininen ohjaussolmu, mikä tekee Cav3-riippuvaisesta hormonierityksestä (TSH, LH, FSH, GH) suoraan haavoittuvan EMF-häiriöille.",

    s2SectionTitle: "Kaulan etuosan altistus",

    s4Title: "Puhelimen läheisyysfysiikka",
    s4p1:
      "Kilpirauhanen sijaitsee kaulan etuosassa — suoraan puhelimen pidätyskohdan vieressä puheluiden aikana. Korvalla pidettäessä kilpirauhanen on 5–10cm etäisyydellä RF-säteilylähteestä. Käänteisen neliölain mukaan EMF:n tehontiheys on kääntäen verrannollinen etäisyyden neliöön: 5cm etäisyydellä kenttävoimakkuus kilpirauhasessa on 4× suurempi kuin 10cm etäisyydellä.",
    s4p2:
      "Tämä tekee kilpirauhasesta yhden suorimmin puhelinaltistuksen alaisista endokriinisistä elimistä. Toisin kuin aivolisäke (joka vastaanottaa EMF:n kallon läpi) tai sukurauhaset (tyypillisesti 30+ cm puhelimesta), kilpirauhanen kohtaa lähikentän RF-altistuksen jokaisen puhelun aikana minimaalisella kudossuojauksella.",

    s5Title: "Epidemiologinen konteksti",
    s5Stats: [
      "Kilpirauhasen vajaatoiminta yleistyy maailmanlaajuisesti, esiintyvyys suurinta naisilla (5:1 nainen:mies-suhde)",
      "Hashimoton tyreoidiitti (autoimmuuni) on yleisin kilpirauhasen vajaatoiminnan syy jodiriittoisissa maissa",
      "Kilpirauhassyövän ilmaantuvuus on noin kolminkertaistunut 1980-luvulta — rinnakkain matkapuhelinten yleistymisen kanssa",
      "Autoimmuuni kilpirauhassairaus käyttää Ca²⁺-kalsineuriini-NFAT-reittiä T-soluissa — sama reitti kuin BERM-kaskadissa #10",
    ],

    s3SectionTitle: "Evidenssi ja ennusteet",

    s6Title: "EMF–kilpirauhanen-evidenssiketju",
    s6Chain:
      "EMF → Cav3-häiriö (tyreotrooppi) → TSH:n säätelyn häiriö → T3/T4-epätasapaino → kilpirauhasen toimintahäiriö",
    s6p1:
      "Aivolisäkkeen Cav3-tyypin T-kanavat ovat vakiintuneet endokriinisessa fysiologiassa. Sama mekanismi joka ohjaa gonadotrooppien LH-pulsseja (BERM aivolisäke-moduloomi) toimii tyreotrooppissa TSH-erityksessä. Systemaattisen katsauksen evidenssi (F1000Research) tunnisti viisi havainnointitutkimusta jotka yhdistävät EMF-altistuksen kilpirauhasen vajaatoimintaan. Työntekijöillä joiden puhelinkäyttö ylitti 33 tuntia kuukaudessa havaittiin matalammat TSH-tasot.",
    s6p2:
      "Sekä kilpirauhasen vajaatoiminta että liikatoiminta heikentävät hedelmällisyyttä — luoden suoran yhteyden kilpirauhasen häiriöiden ja kokonaishedelmällisyysluvun laskun välille. Kilpirauhanen kytkeytyy BERM:n lisääntymisreittiin aivolisäkehubin kautta: sama Cav3-häiriö joka häiritsee LH/FSH:ta häiritsee samanaikaisesti TSH:ta, mikä tekee kilpirauhasen toimintahäiriöstä rinnakkaisen seurauksen keskeisestä BERM-mekanismista.",

    s7Title: "BERM-ennusteet",
    s7Text:
      "BERM-kehys tuottaa kaksi spesifistä, testattavaa ennustetta kilpirauhasen moduloomille:",
    s7Predictions: [
      {
        id: "THYROID-1",
        text: "Matkapuhelimen käyttäjillä on muuttuneet TSH-tasot verrattuna ei-käyttäjiin kun jodinsaanti, ikä, sukupuoli ja autoimmuunitila kontrolloidaan. Vaikutus on annosriippuvainen päivittäisestä puhelun kestosta ja käyttövuosista.",
        discriminating: true,
      },
      {
        id: "THYROID-2",
        text: "Kilpirauhassyövän ilmaantuvuus korreloi kumulatiivisen matkapuhelinkäytön kanssa (käyttövuodet × päivittäinen puheluaika) toteamisharhan kontrolloinnin jälkeen. Korrelaatio on spesifinen papillaariselle kilpirauhassyövälle, alatyypille joka liittyy eniten kaulan etuosan altistusvyöhykkeeseen.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "f1000-emf-thyroid-review",
        citation: "F1000Research — Systemaattinen katsaus",
        finding:
          "Viisi havainnointitutkimusta löysi yhteyksiä EMF-altistuksen ja kilpirauhasen vajaatoiminnan välillä. Yli 33 tuntia kuukaudessa ammatillista puhelinkäyttöä yhdistettiin matalampiin TSH-tasoihin.",
      },
      {
        id: "pituitary-cav3-thyrotroph",
        citation: "Endocrine Reviews — Aivolisäkkeen ionikanavat",
        finding:
          "T-tyypin (Cav3) kalsiumkanavat välittävät hormonien eritystä aivolisäkkeen tyreotrooppissa ja gonadotrooppissa. Cav3-häiriö muuttaa pulssimaista TSH- ja LH-eritystä.",
      },
    ],

    seeAlso: "Katso myös",
    pituitaryModulome: "Aivolisäkkeen moduloomi",
    predictionsPage: "Ennusteet — THYROID-1/2",
    evidencePage: "Evidenssirekisteri",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function ThyroidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Thermometer} title={d.title} subtitle={d.subtitle} />

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.channelVal}</span>
            <span className="text-foreground-muted">{d.gene}</span>
            <span className="text-foreground font-medium font-mono text-xs">
              {d.geneVal}
            </span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s2p3}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s3Text}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <p>{d.s4p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s5Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s6Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s6p1}
          </p>
          <p>{d.s6p2}</p>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s7Text}
        </p>

        <div className="space-y-4">
          {d.s7Predictions.map((pred) => (
            <div
              key={pred.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {pred.id}
                </span>
                {pred.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pred.text}
              </p>
            </div>
          ))}
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {activeLocale === "fi" ? "Kaikki ennusteet →" : "All predictions →"}
          </Link>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                {ref.citation}
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/pituitary`}
            className="text-sm text-accent hover:underline"
          >
            {d.pituitaryModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
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
