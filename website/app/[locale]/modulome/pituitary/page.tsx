import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "The Unprotected Master Gland",
    subtitle:
      "The pituitary is a circumventricular organ OUTSIDE the blood-brain barrier. It regulates ALL endocrine axes. T-type calcium channels in every cell type.",
    backLink: "← Back to Modulome",

    /* 01 Hero */
    s1Title: "Outside the Blood-Brain Barrier",
    s1p1:
      "The pituitary gland is the most EMF-sensitive endocrine organ in the human body. Unlike the brain, it is a circumventricular organ — it sits OUTSIDE the blood-brain barrier. Every molecule circulating in the blood has direct access to pituitary cells. There is no protective barrier to attenuate electromagnetic field effects. The barrier attenuation factor chi_barrier = 1.0 (no attenuation).",
    s1p2:
      "This single gland simultaneously regulates reproduction (FSH, LH), growth (GH), stress (ACTH), thyroid function (TSH), lactation (prolactin), and water balance (ADH). Disruption of pituitary function does not affect one system — it affects all of them at once. The pituitary is the convergence point where EMF exposure translates into multi-system endocrine disruption.",
    s1p3:
      "Every hormone-secreting cell type in the pituitary uses T-type (Cav3) voltage-gated calcium channels for stimulus-secretion coupling. These low-voltage-activated channels operate near resting membrane potential — precisely where Schwan-predicted EMF-induced voltage perturbations are largest.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "Gonadotroph (Cav3)",
        function: "GnRH pulse decoding → FSH and LH secretion",
        mechanism: "T-type Ca2+ window current at bifurcation → GnRH frequency discriminator",
        hormone: "FSH, LH",
      },
      {
        name: "Lactotroph (Cav3)",
        function: "Spontaneous firing → tonic prolactin release",
        mechanism: "T-type channels sustain pacemaker activity; DA inhibition modulates",
        hormone: "Prolactin",
      },
      {
        name: "Corticotroph (Cav3)",
        function: "CRH-stimulated ACTH secretion",
        mechanism: "T-type Ca2+ entry → vesicle exocytosis → ACTH release",
        hormone: "ACTH",
      },
      {
        name: "Thyrotroph (Cav3)",
        function: "TRH-stimulated TSH secretion",
        mechanism: "T-type Ca2+ entry → TSH exocytosis",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T-type (Cav3) channels are present in EVERY pituitary cell type. They are low-voltage-activated channels that operate near resting membrane potential — the regime where Schwan's delta-Vm is maximal. This makes the pituitary uniquely vulnerable: chi_channel is at maximum because the channels are at their voltage bifurcation point.",

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain",
    s3Chain:
      "EMF → Schwan delta-Vm → Cav3 window current shift → Ca2+ ↑ → GnRH pulse decoding disruption → FSH/LH ratio distortion → follicle maturation / spermatogenesis disruption",
    s3p1:
      "The critical mechanism is GnRH pulse frequency decoding. The hypothalamus sends GnRH in discrete pulses: fast pulses (every 30 min) preferentially release LH, slow pulses (every 2–4 h) preferentially release FSH. The gonadotroph cell discriminates between these frequencies using Ca2+ dynamics mediated by T-type channels. EMF-induced perturbation of the Cav3 window current does not simply increase or decrease hormone output — it distorts the frequency decoder, causing an incorrect FSH/LH ratio.",
    s3p2:
      "The downstream consequences differ by sex. In women, FSH/LH ratio distortion disrupts the follicular-luteal transition, impairing ovulation. In men, it disrupts the Sertoli cell support for spermatogenesis. Both effects converge on reduced fertility without necessarily changing total gonadotropin levels — which is why standard endocrine panels may miss the effect.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026,
        finding: "GnRH receptor expression increased at 2.45 GHz RF exposure. Pituitary responds to RF by upregulating its own GnRH sensitivity — a compensatory response indicating functional disruption.",
        level: "E",
      },
      {
        citation: "ELF 18-week study",
        year: 2024,
        finding: "FSH decreased in female rats after 18 weeks of ELF-EMF exposure. Effect was time-dependent and progressive, consistent with cumulative Cav3 disruption.",
        level: "E",
      },
      {
        citation: "Calcium-LH coupling",
        year: 2015,
        finding: "LH release is driven mainly by Ca2+ increase in gonadotroph cells. T-type channels provide the primary Ca2+ entry pathway for GnRH-stimulated LH secretion.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957,
        finding: "Electromagnetic fields induce membrane voltage perturbation delta-Vm proportional to cell radius and field strength. Largest effect at resting potential — exactly where T-type channels operate.",
        level: "E",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "Lindgren Analysis",
    s5p1:
      "The pituitary represents the maximum EMF sensitivity configuration in the BERM framework:",
    s5Criteria: [
      "chi_barrier = 1.0 — outside BBB, no attenuation. Direct blood access.",
      "chi_channel = maximum — Cav3 at voltage bifurcation point. Low-voltage-activated channels at resting Vm.",
      "chi_convergence = maximum — single organ controls ALL endocrine axes simultaneously.",
      "chi_cumulative — progressive disruption demonstrated in 18-week ELF study. No recovery plateau.",
    ],
    s5p2:
      "The pituitary is the most EMF-sensitive endocrine organ because it combines: no barrier protection (circumventricular), maximum channel sensitivity (Cav3 at bifurcation), and maximum downstream impact (controls all axes). Any effect on this single organ propagates to reproduction, metabolism, stress response, growth, and lactation simultaneously.",

    /* 06 Predictions */
    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "A selective T-type calcium channel blocker (e.g., TTA-P2 or mibefradil) prevents EMF-induced FSH/LH ratio distortion in pituitary gonadotroph cells in vitro. If the EMF effect operates through Cav3 window current perturbation, blocking T-type channels specifically should abolish the FSH/LH decoding error without affecting L-type or other channel-dependent functions.",
        discriminating: true,
      },
    ],

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    cellLabel: "Cell type",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    hormoneLabel: "Hormone",
  },
  fi: {
    title: "Suojaamaton paarauhanen",
    subtitle:
      "Aivolisake on sirkumventrikulaarinen elin veri-aivoesteen ULKOPUOLELLA. Se saatelee KAIKKIA endokriinisia akseleita. T-tyypin kalsiumkanavat jokaisessa solutyypissa.",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Veri-aivoesteen ulkopuolella",
    s1p1:
      "Aivolisake on ihmiskehon EMF-herkin endokriininen elin. Toisin kuin aivot, se on sirkumventrikulaarinen elin — se sijaitsee veri-aivoesteen ULKOPUOLELLA. Jokaisella veressa kiertavalla molekyylilla on suora paasy aivolisakkeen soluihin. Ei ole suojaavaa estetta vaimentamaan sahkomagneettisen kentan vaikutuksia. Esteen vaimennuskerroin chi_barrier = 1,0 (ei vaimennusta).",
    s1p2:
      "Tama yksittainen rauhanen saatelee samanaikaisesti lisaantymista (FSH, LH), kasvua (GH), stressia (ACTH), kilpirauhasen toimintaa (TSH), laktaatiota (prolaktiini) ja vesitasapainoa (ADH). Aivolisakkeen toiminnan hairio ei vaikuta yhteen jarjestelmaan — se vaikuttaa kaikkiin samanaikaisesti. Aivolisake on konvergenssipiste, jossa EMF-altistus muuttuu monisysteemiseksi endokriiniseksi hairioksi.",
    s1p3:
      "Jokainen hormoneja erittava solutyyppi aivolisakkessa kayttaa T-tyypin (Cav3) janniteherkkia kalsiumkanavia stimulus-sekreetio-kytkentaan. Nama matalan jannitekynnyksen kanavat toimivat lahella lepopotentiaalia — juuri siella missa Schwanin ennustamat EMF-indusoidut jannitehairtiot ovat suurimpia.",

    s2Title: "Kanavaprofiiili",
    s2Channels: [
      {
        name: "Gonadotrofi (Cav3)",
        function: "GnRH-pulssin dekoodaus → FSH:n ja LH:n eritys",
        mechanism: "T-tyypin Ca2+-ikkunavirta bifurkaatiossa → GnRH-taajuuserottelija",
        hormone: "FSH, LH",
      },
      {
        name: "Laktotrofi (Cav3)",
        function: "Spontaani syttyminen → toninen prolaktiinin vapautuminen",
        mechanism: "T-tyypin kanavat yllapitavat tahdistinaktiivisuutta; DA-inhibitio moduloi",
        hormone: "Prolaktiini",
      },
      {
        name: "Kortikotrofi (Cav3)",
        function: "CRH-stimuloitu ACTH:n eritys",
        mechanism: "T-tyypin Ca2+-sisaanvirtaus → vesikulien eksosytoosi → ACTH-vapautuminen",
        hormone: "ACTH",
      },
      {
        name: "Tyreotrofi (Cav3)",
        function: "TRH-stimuloitu TSH:n eritys",
        mechanism: "T-tyypin Ca2+-sisaanvirtaus → TSH-eksosytoosi",
        hormone: "TSH",
      },
    ],
    s2Note:
      "T-tyypin (Cav3) kanavat ovat JOKAISESSA aivolisakkeen solutyypissa. Ne ovat matalan jannitekynnyksen kanavia jotka toimivat lahella lepopotentiaalia — alueella jossa Schwanin delta-Vm on suurin. Tama tekee aivolisakkeen ainutlaatuisesti haavoittuvaksi: chi_channel on maksimissaan koska kanavat ovat jannite-bifurkaatiopisteessaan.",

    s3Title: "Mekanismiketju",
    s3Chain:
      "EMF → Schwanin delta-Vm → Cav3-ikkunavirran siirtymaa → Ca2+ ↑ → GnRH-pulssin dekoodauksen hairio → FSH/LH-suhteen vaaristyminen → follikkelikypsymisen / spermatogeneesin hairio",
    s3p1:
      "Kriittinen mekanismi on GnRH-pulssitaajuuden dekoodaus. Hypotalamus lahettaa GnRH:ta erillisinaa pulsseina: nopeat pulssit (30 min valein) vapauttavat ensisijaisesti LH:ta, hitaat pulssit (2–4 h valein) ensisijaisesti FSH:ta. Gonadotrofisolu erottelee nama taajuudet T-tyypin kanavien valittaman Ca2+-dynamiikan avulla. EMF-indusoitu Cav3-ikkunavirran hairiö ei yksinkertaisesti lisaa tai vahenna hormonivolyymia — se vaaristaa taajuusdekooderin, aiheuttaen vaaran FSH/LH-suhteen.",
    s3p2:
      "Alavirran seuraukset eroavat sukupuolittain. Naisilla FSH/LH-suhteen vaaristyminen hairitsee follikulaari-luteaali-siirtymaa, heikentaen ovulaatiota. Miehilla se hairitsee Sertoli-solujen tukea spermatogeneesille. Molemmat vaikutukset konvergoivat hedelmallisyyden heikkenemiseen ilman etta gonadotropiinitasot valttamatta muuttuvat — mika on miksi standardit endokriiniset paneelit voivat ohittaa vaikutuksen.",

    s4Title: "Keskeinen evidenssi",
    s4Studies: [
      {
        citation: "IJMS 2026",
        year: 2026,
        finding: "GnRH-reseptorin ekspressio kasvoi 2,45 GHz RF-altistuksessa. Aivolisake reagoi RF:aan saaadtelemalla omaa GnRH-herkkyyttaan — kompensatorinen vaste joka osoittaa toiminnallisen hairioon.",
        level: "E",
      },
      {
        citation: "ELF 18 viikon tutkimus",
        year: 2024,
        finding: "FSH laski naarasrotilla 18 viikon ELF-EMF-altistuksen jalkeen. Vaikutus oli aikariippuvainen ja progressiivinen, yhdenmukainen kumulatiivisen Cav3-hairioon kanssa.",
        level: "E",
      },
      {
        citation: "Kalsium-LH-kytkenta",
        year: 2015,
        finding: "LH:n vapautumista ohjaa ensisijaisesti Ca2+-nousu gonadotrofisoluissa. T-tyypin kanavat tarjoavat ensisijaisen Ca2+-sisaanvirtausreitin GnRH-stimuloidulle LH-eritykselle.",
        level: "E",
      },
      {
        citation: "Schwan 1957/Pall 2013",
        year: 1957,
        finding: "Sahkomagneettiset kentat indusoivat kalvojannitehairioon delta-Vm:n joka on verrannollinen solun sateeseen ja kenttavoimakkuuteen. Suurin vaikutus lepopotentiaalissa — juuri missa T-tyypin kanavat toimivat.",
        level: "E",
      },
    ],

    s5Title: "Lindgren-analyysi",
    s5p1:
      "Aivolisake edustaa suurinta EMF-herkkyyskonfiguraatiota BERM-kehyksessa:",
    s5Criteria: [
      "chi_barrier = 1,0 — BBB:n ulkopuolella, ei vaimennusta. Suora veripaasy.",
      "chi_channel = maksimi — Cav3 jannite-bifurkaatiopisteessa. Matalan jannitekynnyksen kanavat lepo-Vm:ssa.",
      "chi_convergence = maksimi — yksittainen elin saatelee KAIKKIA endokriinisia akseleita samanaikaisesti.",
      "chi_cumulative — progressiivinen hairio osoitettu 18 viikon ELF-tutkimuksessa. Ei toipumistasannetta.",
    ],
    s5p2:
      "Aivolisake on EMF-herkin endokriininen elin koska se yhdistaa: ei estesuojausta (sirkumventrikulaarinen), maksimaalisen kanavaherkkyyden (Cav3 bifurkaatiossa) ja maksimaalisen alavirran vaikutuksen (saatelee kaikkia akseleita). Mika tahansa vaikutus tahan yhteen elimeen leviaa lisaantymiseen, aineenvaihduntaan, stressivasteeseen, kasvuun ja laktaatioon samanaikaisesti.",

    s6Title: "Ennusteet",
    s6Predictions: [
      {
        id: "MOD-1",
        text: "Selektiivinen T-tyypin kalsiumkanavan salpaaja (esim. TTA-P2 tai mibefradiili) estaa EMF-indusoidun FSH/LH-suhteen vaaristymisen aivolisakkeen gonadotrofisoluissa in vitro. Jos EMF-vaikutus toimii Cav3-ikkunavirran hairioon kautta, T-tyypin kanavien spesifinen salpaaaminen tulisi kumota FSH/LH-dekoodausvirhe vaikuttamatta L-tyypin tai muiden kanavien riippuvaisiin toimintoihin.",
        discriminating: true,
      },
    ],

    seeAlso: "Katso myos",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Evidenssirekisteri",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Loydos",
    levelLabel: "Taso",
    cellLabel: "Solutyyppi",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    hormoneLabel: "Hormoni",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function PituitaryPage({
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

      <PageHeader icon={Brain} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero: Outside the BBB */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="outside-bbb" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.s1Title}
          </h3>
          <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
            {d.s1p1}
          </p>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>{d.s1p2}</p>
            <p>{d.s1p3}</p>
          </div>
        </article>
      </section>

      {/* 02 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {d.s2Channels.map((ch, i) => (
            <div
              key={i}
              className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5 space-y-3"
            >
              <h4 className="font-bold text-foreground text-sm leading-tight">
                {ch.name}
              </h4>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.functionLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.function}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.mechanismLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.mechanism}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  {d.hormoneLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed font-medium">
                  {ch.hormone}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-foreground-muted leading-relaxed max-w-4xl border-l-2 border-accent/20 pl-3">
          {d.s2Note}
        </p>
      </section>

      {/* 03 — Mechanism Chain */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s3Chain}
          </p>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 — Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.citationLabel}</th>
                <th className="py-2 pr-3 w-16">{d.yearLabel}</th>
                <th className="py-2 pr-3">{d.findingLabel}</th>
                <th className="py-2 w-14">{d.levelLabel}</th>
              </tr>
            </thead>
            <tbody>
              {d.s4Studies.map((s) => (
                <tr
                  key={`${s.citation}-${s.year}`}
                  className="border-b border-card-border/40"
                >
                  <td className="py-2 pr-3 font-medium text-foreground">
                    <CitationLink citation={s.citation} year={s.year} />
                  </td>
                  <td className="py-2 pr-3 font-mono-num text-foreground-muted">
                    {s.year}
                  </td>
                  <td className="py-2 pr-3 text-foreground-muted">
                    {s.finding}
                  </td>
                  <td className="py-2">
                    <span
                      className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[s.level] ?? ""}`}
                    >
                      {s.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05 — Lindgren Analysis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-4xl">
          {d.s5p1}
        </p>

        <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Criteria.map((c, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>
                <span className="font-mono text-xs font-medium text-foreground">
                  {c.split(" — ")[0]}
                </span>
                {" — "}
                {c.split(" — ")[1]}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-card rounded-lg border border-card-border p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5p2}
          </p>
        </div>
      </section>

      {/* 06 — Predictions */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-6">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <div className="space-y-4">
          {d.s6Predictions.map((p) => (
            <div
              key={p.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {p.id}
                </span>
                {p.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {p.text}
              </p>
              <Link
                href={`/${locale}/predictions`}
                className="text-xs text-accent hover:underline mt-2 inline-block"
              >
                {activeLocale === "fi"
                  ? "Kaikki ennusteet →"
                  : "All predictions →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePortal} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
