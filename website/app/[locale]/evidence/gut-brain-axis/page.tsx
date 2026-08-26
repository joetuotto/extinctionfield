import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Gut-Brain Axis: The Second Barrier Falls",
    subtitle: "Circadian disruption attacks the intestinal barrier via Per2 → tight junction degradation → LPS enters bloodstream → neuroinflammation. The gut barrier uses the same molecular toolkit as the blood-brain barrier — melatonin loss opens both simultaneously.",
    backLink: "← Back to Evidence",
    cautionText: "This page documents the gut-brain axis as a newly verified BERM pathway (VK24). The individual links are independently verified; the complete EMF → gut → brain chain as a single integrated mechanism requires further testing.",

    pathTitle: "The pathway",
    pathLead: "The gut-brain axis connects circadian clock function to intestinal barrier integrity to brain inflammation through a continuous molecular chain.",
    pathSteps: [
      { step: "1. EMF → melatonin↓", detail: "EMF suppresses melatonin via pineal effects and CRY magnetoreception. Melatonin normally protects tight junction proteins in both BBB and gut epithelium." },
      { step: "2. Melatonin↓ → Per2↓ in gut", detail: "Melatonin entrains peripheral circadian clocks including gut Per2. Per2 controls expression of tight junction proteins ZO-1, occludin, and claudins in intestinal epithelial cells." },
      { step: "3. Per2↓ → gut barrier↓", detail: "Per2 knockout in gut epithelium causes tight junction degradation. The same tight junction proteins (ZO-1, occludin, claudins) that maintain the blood-brain barrier also maintain the gut barrier." },
      { step: "4. Gut barrier↓ → LPS enters blood", detail: "Compromised gut barrier allows lipopolysaccharide (LPS) from gram-negative bacteria to enter the bloodstream. Circadian disruption also shifts microbiome composition: Ruminococcus torques↑, Lactobacillus↓, LPS-synthesis genes↑." },
      { step: "5. LPS → neuroinflammation", detail: "Serum LPS triggers systemic inflammation → crosses compromised BBB → activates microglia → neuroinflammation. This reduces hippocampal neurogenesis and contributes to depression." },
      { step: "6. Depression → HPA → more disruption", detail: "Neuroinflammation activates HPA axis → cortisol↑ → more sleep disruption → more melatonin↓. The loop feeds back: initial circadian disruption creates conditions for progressive worsening." },
    ],

    dualTitle: "Dual barrier principle",
    dualLead: "The BBB and gut epithelial barrier are constructed from the same molecular toolkit. What opens one, opens the other.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "Scaffolding protein linking transmembrane proteins to cytoskeleton; present in BOTH BBB endothelium and gut epithelium" },
      { protein: "Occludin", role: "Transmembrane tight junction protein; melatonin↓ reduces expression in both barriers; EMF directly reduces occludin in BBB (PMC12829706)" },
      { protein: "Claudins (family)", role: "Paracellular permeability regulators; tissue-specific isoforms but shared regulatory mechanisms; Per2-dependent expression in gut" },
    ],
    dualConclusion: "Melatonin is the shared protector of both barriers. EMF→melatonin↓ creates simultaneous dual vulnerability: heavy metals enter the brain (BBB↓) while bacterial endotoxin enters the bloodstream (gut barrier↓). This is not two effects — it is one mechanism attacking two barriers.",

    microbiomeTitle: "Microbiome disruption",
    microbiomeLead: "Circadian disruption doesn't just weaken the physical barrier — it also changes what's behind it.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "Mucin-degrading bacterium that further weakens gut barrier from the luminal side" },
      { change: "Lactobacillus↓", impact: "Protective commensal that maintains barrier integrity and produces short-chain fatty acids" },
      { change: "LPS-synthesis genes↑", impact: "Microbiome shifts toward gram-negative bacteria with increased endotoxin production" },
    ],

    evidenceTitle: "Key evidence",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", finding: "Per2 KO in gut epithelium → barrier disruption → LPS → hippocampal neurogenesis↓ → depression-like behavior" },
      { ref: "PMC5909328 (2018)", finding: "Circadian disruption alters gut microbiome composition with increased LPS-synthesis capacity" },
      { ref: "biorxiv 2025", finding: "Continuous light exposure disrupts gut epithelial barrier in male mice via apoptosis-inflammation-oxidative stress" },
    ],

    predictionText: "The gut-brain axis generates predictions E-NEW-5 (gut Per2 correlates with EMF exposure) and E-NEW-8 (gut permeability markers correlate with EMF exposure in occupational cohorts).",
    predictionLink: "See supplementary layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Suolisto-aivo-akseli: Toinen este murtuu",
    subtitle: "Sirkadiaaninen häiriö hyökkää suoliston estettä vastaan Per2 → tiiviin liitoksen hajoaminen → LPS pääsee verenkiertoon → neurotulehdus. Suoliston este käyttää samaa molekulaarista työkalupakkia kuin veri-aivoeste — melatoniinin menetys avaa molemmat samanaikaisesti.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu dokumentoi suolisto-aivo-akselin vastikään verifioituna BERM-reittinä (VK24). Yksittäiset linkit on verifioitu itsenäisesti; täydellinen EMF → suolisto → aivot -ketju yhtenä integroituna mekanismina vaatii lisätestausta.",

    pathTitle: "Reitti",
    pathLead: "Suolisto-aivo-akseli yhdistää sirkadiaanisen kellon toiminnan suoliston esterakenteen ylläpitoon ja aivojen tulehdukseen jatkuvan molekulaarisen ketjun kautta.",
    pathSteps: [
      { step: "1. EMF → melatoniini↓", detail: "EMF suppressoi melatoniinia pineaalivaikutusten ja CRY-magnetoreseption kautta. Melatoniini normaalisti suojaa tiiviin liitoksen proteiineja sekä BBB:ssä että suoliston epitheelissä." },
      { step: "2. Melatoniini↓ → Per2↓ suolistossa", detail: "Melatoniini synkronoi perifeerisiä sirkadiaanisia kelloja mukaan lukien suoliston Per2:n. Per2 kontrolloi ZO-1:n, okludiinin ja klaudiinien ekspressiota suoliston epitheelisoluissa." },
      { step: "3. Per2↓ → suoliston este↓", detail: "Per2-poistogeeni suoliston epitheelissä aiheuttaa tiiviin liitoksen hajoamisen. Samat tiiviin liitoksen proteiinit (ZO-1, okludiini, klaudiinit) jotka ylläpitävät veri-aivoestettä ylläpitävät myös suoliston estettä." },
      { step: "4. Suoliston este↓ → LPS verenkiertoon", detail: "Heikentynyt suoliston este sallii lipopolysakkaridien (LPS) pääsyn gramnegatiivisista bakteereista verenkiertoon. Sirkadiaanihäiriö myös muuttaa mikrobiomin koostumusta: Ruminococcus torques↑, Lactobacillus↓, LPS-synteesigeenit↑." },
      { step: "5. LPS → neurotulehdus", detail: "Seerumin LPS laukaisee systeemisen tulehduksen → ylittää heikentyneen BBB:n → aktivoi mikroglian → neurotulehdus. Tämä vähentää hippokampaalista neurogeneesiä ja myötävaikuttaa masennukseen." },
      { step: "6. Masennus → HPA → lisää häiriöitä", detail: "Neurotulehdus aktivoi HPA-akselin → kortisoli↑ → lisää unihäiriöitä → lisää melatoniini↓. Silmukka palautuu: alkuperäinen sirkadiaanihäiriö luo olosuhteet progressiiviselle pahenemiselle." },
    ],

    dualTitle: "Kaksoisestemekanismi",
    dualLead: "BBB ja suoliston epitheelinen este on rakennettu samasta molekulaarisesta työkalupakista. Mikä avaa toisen, avaa toisenkin.",
    dualProteins: [
      { protein: "ZO-1 (zonula occludens-1)", role: "Tukirankaproteiini joka yhdistää transmembraaniproteiinit solutukirankaan; läsnä SEKÄ BBB:n endotheelissä ETTÄ suoliston epitheelissä" },
      { protein: "Okludiini", role: "Transmembraaninen tiiviin liitoksen proteiini; melatoniini↓ vähentää ekspressiota molemmissa esteissä; EMF vähentää suoraan okludiinia BBB:ssä (PMC12829706)" },
      { protein: "Klaudiinit (perhe)", role: "Parasellulaarisen läpäisevyyden säätelijät; kudosspesifiset isoformit mutta jaetut säätelymekanismit; Per2-riippuvainen ekspressio suolistossa" },
    ],
    dualConclusion: "Melatoniini on molempien esteiden jaettu suojaaja. EMF→melatoniini↓ luo samanaikaisen kaksoishaavottuvuuden: raskasmetallit pääsevät aivoihin (BBB↓) samalla kun bakteeriendotoksiini pääsee verenkiertoon (suoliston este↓). Tämä ei ole kaksi vaikutusta — se on yksi mekanismi joka hyökkää kahta estettä vastaan.",

    microbiomeTitle: "Mikrobiomin häiriö",
    microbiomeLead: "Sirkadiaanihäiriö ei pelkästään heikennä fyysistä estettä — se myös muuttaa mitä sen takana on.",
    microbiomeChanges: [
      { change: "Ruminococcus torques↑", impact: "Musiinia hajottava bakteeri joka edelleen heikentää suoliston estettä luminaaliselta puolelta" },
      { change: "Lactobacillus↓", impact: "Suojaava kommensiaalikakteeri joka ylläpitää esterakennetta ja tuottaa lyhytketjuisia rasvahappoja" },
      { change: "LPS-synteesigeenit↑", impact: "Mikrobiomi siirtyy kohti gramnegatiivisia bakteereja lisääntyneellä endotoksiinituotannolla" },
    ],

    evidenceTitle: "Keskeiset todisteet",
    evidenceRefs: [
      { ref: "PMC12631932 (2026)", finding: "Per2 KO suoliston epitheelissä → esterakennteen häiriö → LPS → hippokampaalinen neurogeneesi↓ → masennuskäyttäytyminen" },
      { ref: "PMC5909328 (2018)", finding: "Sirkadiaanihäiriö muuttaa suolistomikrobiomin koostumusta lisääntyneellä LPS-synteesikapasiteetilla" },
      { ref: "biorxiv 2025", finding: "Jatkuva valoaltistus häiritsee suoliston epitheelisen esteen urospuolisissa hiirissä apoptoosin-tulehduksen-oksidatiivisen stressin kaskadin kautta" },
    ],

    predictionText: "Suolisto-aivo-akseli tuottaa ennusteet E-NEW-5 (suoliston Per2 korreloi EMF-altistuksen kanssa) ja E-NEW-8 (suoliston läpäisevyysmarkkerit korreloivat EMF-altistuksen kanssa ammatillisissa kohorteissa).",
    predictionLink: "Ks. täydennyskerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function GutBrainAxisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8">
        <CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox>
      </div>

      {/* Pathway */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.pathTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.pathLead}</p>
        <div className="space-y-3">
          {d.pathSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual barrier */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.dualTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.dualLead}</p>
        <div className="space-y-3">
          {d.dualProteins.map((p, i) => (
            <div key={i} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{p.protein}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{p.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.dualConclusion}</p>
        </div>
      </section>

      {/* Microbiome */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.microbiomeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.microbiomeLead}</p>
        <div className="space-y-3">
          {d.microbiomeChanges.map((c, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{c.change}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{c.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.evidenceTitle}</h2>
        <div className="space-y-3">
          {d.evidenceRefs.map((r, i) => (
            <div key={i} className="flex gap-3 text-sm text-foreground-muted leading-relaxed border-l-2 border-accent/30 pl-3">
              <span className="font-mono text-xs shrink-0 text-accent">{r.ref}</span>
              <p>{r.finding}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Predictions */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
