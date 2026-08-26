import type { Metadata } from "next";
import Link from "next/link";
import { Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Triple Strikes: Convergent Destruction",
    subtitle: "Three distinct triple blows — testosterone, fertility, and cognition are each attacked via three independent routes simultaneously. This is not redundancy; it is convergent destruction through the same upstream mechanism.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents three independent convergence points where the BERM mechanism simultaneously attacks the same target through three distinct pathways. Each route has been independently verified, but the combined effect has not been tested.",

    tTitle: "Testosterone triple strike",
    tLead: "Three independent pathways to testosterone decline — central, gonadal, and cross-axis — all originating from the same EMF → Ca²⁺ upstream mechanism.",
    tRoutes: [
      { route: "Central (VK13)", path: "EMF → hypothalamic vesicles↓ → GnRH pulse frequency↓ → LH↓ → T↓", evidence: "Kim 2019: 835 MHz, 12 weeks → synapsin I/II↓, synaptotagmin 1↓ in hypothalamus", status: "confirmed" },
      { route: "Gonadal (VK15)", path: "EMF → Leydig cell → StAR protein↓ → cholesterol transport blocked → T↓", evidence: "Multiple studies: RF → Leydig morphology changes, StAR↓, dose-dependent T↓", status: "confirmed" },
      { route: "Cross-axis (VK22)", path: "EMF → HPA → cortisol↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9 restored T in cortisol-treated primates (PMC7946976); GnIH silencing restored fertility", status: "confirmed" },
    ],
    tConclusion: "Each route alone produces modest T decline. Combined, they create the population-level testosterone crisis observed by Mazur (T↓ independent of weight change) and explain why no single lifestyle factor accounts for the decline.",

    fTitle: "Fertility triple strike",
    fLead: "Three independent pathways to fertility impairment — sperm function, hormone production, and central regulation — attacking simultaneously.",
    fRoutes: [
      { route: "Sperm (VK17)", path: "RF → CatSper Ca²⁺ activation → premature acrosome reaction → energy depletion before reaching egg", evidence: "2100 MHz activates CatSper; sperm meta SMD -1.92 at mobile phone SAR levels", status: "confirmed" },
      { route: "Gonadal (VK15)", path: "EMF → StAR↓ → testosterone↓ → spermatogenesis↓ + Sertoli cell support↓", evidence: "Dose-dependent T↓ confirmed across multiple studies", status: "confirmed" },
      { route: "Central (VK22)", path: "Cortisol↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadal function↓", evidence: "GnIH gene silencing RESTORED fertility in stressed animals", status: "confirmed" },
    ],
    fConclusion: "The fertility triple strike explains declining sperm counts (-50% since 1973), falling IVF success rates in high-EMF laboratories, and population-level TFR decline that correlates with EMF infrastructure (R²=0.851 across 54 countries).",

    cTitle: "Cognition triple strike",
    cLead: "Three independent pathways to cognitive decline — stress-mediated, neurotrophic, and inflammatory — converging on hippocampal function.",
    cRoutes: [
      { route: "Stress (VK14)", path: "EMF → HPA → cortisol↑ → hippocampal dendritic retraction + neurogenesis cessation", evidence: "Sapolsky 2009: chronic cortisol → hippocampal volume loss; cortisol→AD (Frontiers 2026)", status: "confirmed" },
      { route: "Neurotrophic (VK23)", path: "RF → BDNF↓ in hippocampus → dendritic spine loss + memory impairment", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ (PMC10275548); 835 MHz postnatal → dendritic spine loss (PMC8159076)", status: "confirmed" },
      { route: "Inflammatory (VK24)", path: "EMF → melatonin↓ → Per2↓ → gut barrier↓ → LPS → neuroinflammation → hippocampal neurogenesis↓", evidence: "Per2 KO → gut barrier↓ → LPS → hippocampal neurogenesis↓ → depression (PMC12631932)", status: "confirmed" },
    ],
    cConclusion: "The cognition triple strike explains rising rates of cognitive impairment, depression, and neurodegenerative disease that cannot be attributed to aging alone. All three routes converge on the hippocampus — the brain's memory center and HPA negative feedback center.",

    metaTitle: "Pattern recognition",
    metaLead: "The triple strike pattern is not coincidence — it is structural. The VGCC → Ca²⁺ mechanism is upstream of ALL three target systems. Because Ca²⁺ signaling controls hormone secretion, sperm function, AND neural plasticity, a single upstream disruption necessarily attacks all three simultaneously. This is the explanatory power of a unified mechanism.",

    predictionText: "The triple strike pattern predicts superadditive effects: blocking any ONE route should produce less than 33% protection, because the other two routes compensate. Only blocking the common upstream (VGCC/Ca²⁺) should provide full protection.",
    predictionLink: "See mechanistic predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Kolmoisisku: Konvergentti tuho",
    subtitle: "Kolme erillistä kolmoisiskua — testosteroni, hedelmällisyys ja kognitio ovat kukin hyökkäyksen kohteena kolmea itsenäistä reittiä pitkin samanaikaisesti. Tämä ei ole redundanssia; se on konvergenttia tuhoa saman ylävirran mekanismin kautta.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu dokumentoi kolme itsenäistä konvergenssipistettä, joissa BERM-mekanismi hyökkää samanaikaisesti samaa kohdetta vastaan kolmea erillistä reittiä pitkin. Jokainen reitti on verifioitu itsenäisesti, mutta yhdistettyä vaikutusta ei ole testattu.",

    tTitle: "Testosteronin kolmoisisku",
    tLead: "Kolme itsenäistä reittiä testosteronin laskuun — sentraalinen, gonadaalinen ja ristiakseli — kaikki lähtöisin samasta EMF → Ca²⁺ ylävirran mekanismista.",
    tRoutes: [
      { route: "Sentraalinen (VK13)", path: "EMF → hypotalamuksen vesikkelit↓ → GnRH-pulssitaajuus↓ → LH↓ → T↓", evidence: "Kim 2019: 835 MHz, 12 vk → synapsiini I/II↓, synaptotagmiini 1↓ hypotalamuksessa", status: "confirmed" },
      { route: "Gonadaalinen (VK15)", path: "EMF → Leydig-solu → StAR-proteiini↓ → kolesterolin kuljetus estetty → T↓", evidence: "Useita tutkimuksia: RF → Leydig-morfologiamuutokset, StAR↓, annosriippuvainen T↓", status: "confirmed" },
      { route: "Ristiakseli (VK22)", path: "EMF → HPA → kortisoli↑ → GnIH↑ → GnRH↓ → LH↓ → T↓", evidence: "RF9 palautti T:n kortisolikäsitellyissä kädellisisssä (PMC7946976); GnIH-hiljennys palautti hedelmällisyyden", status: "confirmed" },
    ],
    tConclusion: "Jokainen reitti yksin tuottaa maltillisen T-laskun. Yhdessä ne luovat väestötason testosteronikriisin, jonka Mazur havaitsi (T↓ painonmuutoksista riippumatta) ja selittävät miksi yksikään yksittäinen elämäntapatekijä ei selitä laskua.",

    fTitle: "Hedelmällisyyden kolmoisisku",
    fLead: "Kolme itsenäistä reittiä hedelmällisyyden heikkenemiseen — siittiöiden toiminta, hormonituotanto ja sentraalinen säätely — hyökkäävät samanaikaisesti.",
    fRoutes: [
      { route: "Siittiö (VK17)", path: "RF → CatSper Ca²⁺ -aktivaatio → ennenaikainen akrosomireaktio → energiankulutus ennen munasoluun pääsyä", evidence: "2100 MHz aktivoi CatSperin; siittiö-meta SMD -1,92 matkapuhelimen SAR-tasoilla", status: "confirmed" },
      { route: "Gonadaalinen (VK15)", path: "EMF → StAR↓ → testosteroni↓ → spermatogeneesi↓ + Sertoli-solun tuki↓", evidence: "Annosriippuvainen T↓ vahvistettu useissa tutkimuksissa", status: "confirmed" },
      { route: "Sentraalinen (VK22)", path: "Kortisoli↑ → GnIH↑ → GnRH↓ → LH/FSH↓ → gonadaalinen toiminta↓", evidence: "GnIH-geenin hiljennys PALAUTTI hedelmällisyyden stressatuissa eläimissä", status: "confirmed" },
    ],
    fConclusion: "Hedelmällisyyden kolmoisisku selittää laskevat siittiömäärät (-50 % vuodesta 1973), laskevat IVF-onnistumisprosentit korkean EMF:n laboratorioissa ja väestötason TFR-laskun joka korreloi EMF-infrastruktuurin kanssa (R²=0,851 54 maassa).",

    cTitle: "Kognition kolmoisisku",
    cLead: "Kolme itsenäistä reittiä kognitiiviseen heikkenemiseen — stressivälitteinen, neurotrofinen ja inflammatorinen — konvergoivat hippokampuksen toimintaan.",
    cRoutes: [
      { route: "Stressi (VK14)", path: "EMF → HPA → kortisoli↑ → hippokampuksen dendriittien vetäytyminen + neurogeneesin loppuminen", evidence: "Sapolsky 2009: krooninen kortisoli → hippokampuksen volyymin menetys; kortisoli→AD (Frontiers 2026)", status: "confirmed" },
      { route: "Neurotrofinen (VK23)", path: "RF → BDNF↓ hippokampuksessa → dendriittien piikkien menetys + muistihäiriö", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ (PMC10275548); 835 MHz postnataalinen → dendriittien piikkien menetys (PMC8159076)", status: "confirmed" },
      { route: "Inflammatorinen (VK24)", path: "EMF → melatoniini↓ → Per2↓ → suoliston este↓ → LPS → neurotulehdus → hippokampaalinen neurogeneesi↓", evidence: "Per2 KO → suoliston este↓ → LPS → hippokampaalinen neurogeneesi↓ → masennus (PMC12631932)", status: "confirmed" },
    ],
    cConclusion: "Kognition kolmoisisku selittää kasvavat kognitiivisen heikkenemisen, masennuksen ja neurodegeneratiivisten sairauksien luvut, joita ei voi selittää pelkällä ikääntymisellä. Kaikki kolme reittiä konvergoivat hippokampukseen — aivojen muistikeskukseen ja HPA:n negatiiviseen palautekeskukseen.",

    metaTitle: "Rakenteen tunnistaminen",
    metaLead: "Kolmoisiskumalli ei ole sattumaa — se on rakenteellista. VGCC → Ca²⁺ -mekanismi on KAIKKIEN kolmen kohdejärjestelmän ylävirrassa. Koska Ca²⁺-signalointi kontrolloi hormoniseritystä, siittiötoimintaa JA hermosolujen plastisuutta, yksi ylävirran häiriö hyökkää väistämättä kaikkia kolmea vastaan samanaikaisesti. Tämä on yhtenäisen mekanismin selitysvoima.",

    predictionText: "Kolmoisiskumalli ennustaa superadditiivisia vaikutuksia: minkä tahansa YHDEN reitin estäminen tuottaa alle 33 % suojan, koska kaksi muuta reittiä kompensoivat. Vain yhteisen ylävirran (VGCC/Ca²⁺) estäminen tarjoaa täyden suojan.",
    predictionLink: "Ks. mekanistiset ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function TripleStrikesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", label: activeLocale === "fi" ? "✓ Vahvistettu" : "✓ Confirmed" },
  };

  // helper for a triple-strike section
  const renderStrike = (title: string, lead: string, routes: readonly { route: string; path: string; evidence: string; status: string }[], conclusion: string) => (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{lead}</p>
      <div className="space-y-3">
        {routes.map((r, i) => {
          const sc = statusColors[r.status];
          return (
            <div key={i} className={`rounded-lg border border-card-border bg-card-bg p-4 ${sc?.bg ?? ""}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold">{r.route}</p>
                {sc && (
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1 font-mono text-xs">{r.path}</p>
              <p className="text-xs text-foreground-muted">{r.evidence}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
        <p className="text-sm leading-relaxed text-foreground-muted">{conclusion}</p>
      </div>
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {renderStrike(d.tTitle, d.tLead, d.tRoutes, d.tConclusion)}
      {renderStrike(d.fTitle, d.fLead, d.fRoutes, d.fConclusion)}
      {renderStrike(d.cTitle, d.cLead, d.cRoutes, d.cConclusion)}

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.metaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.metaLead}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
