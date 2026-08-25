import type { Metadata } from "next";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Pancreas",
    subtitle:
      "Glucose-dependent EMF susceptibility via dual Cav1 + Cav3 channels in pancreatic beta-cells",
    backLink: "← Back to Modulome",

    s1SectionTitle: "β-Cell Calcium Channel Architecture",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav1 (L-type) + Cav3 (T-type)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Pancreatic β-cells",
    functionVal:
      "Glucose-stimulated insulin secretion via VGCC → Ca²⁺ → vesicle exocytosis",
    levelVal: "M|C",

    s2Title: "Glucose-Stimulated Insulin Secretion",
    s2p1: "Pancreatic β-cells are the insulin-producing endocrine cells of the islets of Langerhans. They rely on BOTH L-type (Cav1.2, Cav1.3) and T-type (Cav3.2) voltage-gated calcium channels for glucose-stimulated insulin secretion (GSIS). The canonical GSIS pathway proceeds: glucose enters via GLUT2 → glycolysis raises the ATP/ADP ratio → K_ATP channels close → membrane depolarizes → VGCCs activate → Ca²⁺ influx → insulin vesicle exocytosis.",
    s2p2: "T-type channels (Cav3.2) activate at a lower threshold (~−50mV) than L-type channels (Cav1.2 at ~−30mV), creating a sequential activation cascade. T-type channels fire first during the initial depolarization phase, priming the membrane and generating the early pacemaker depolarization that brings the membrane to L-type activation threshold. The L-type channels then produce the larger, sustained Ca²⁺ influx that drives the main phase of insulin exocytosis.",
    s2p3: "This dual-channel architecture makes β-cells uniquely dependent on VGCC function. Any perturbation of either channel type — whether pharmacological, genetic, or electromagnetic — directly impairs the insulin secretion pathway. The β-cell has one of the highest VGCC densities of any endocrine cell, making it inherently susceptible to electromagnetic interference.",

    s2SectionTitle: "Glucose-Dependent χ Mechanism",

    s3Title: "Meal-Dependent Vulnerability Window",
    s3Chain:
      "High glucose → K_ATP closes → membrane depolarizes → VGCCs primed → χ HIGH ↔ Fasting → K_ATP open → membrane hyperpolarized → VGCCs inactive → χ LOW",
    s3p1: "The β-cell presents a unique feature in the BERM framework: its EMF susceptibility (χ) is dynamically modulated by blood glucose concentration. The K_ATP channel acts as a molecular voltage gate — when blood glucose is low, K_ATP channels remain open, clamping the membrane at approximately −70mV. At this potential, VGCCs are firmly inactive and cannot be perturbed by external electromagnetic fields. The cell is effectively shielded.",
    s3p2: "When blood glucose rises postprandially, K_ATP channels close, the membrane depolarizes toward the VGCC activation window (−50 to −30mV), and the channels become primed — poised at the threshold where small voltage perturbations can trigger premature or excessive Ca²⁺ influx. This creates a meal-dependent vulnerability window: after eating (especially high-glycemic meals), β-cell χ is maximized. Fasting, conversely, hyperpolarizes the membrane and minimizes χ. This mechanism explains why fasting may be protective against EMF-induced metabolic disruption, and why high-glycemic diets synergize with EMF exposure.",

    s3SectionTitle: "T2D and PCOS Mechanism",

    s4Title: "T2D Mechanism Chain",
    s4Chain:
      "EMF → Cav1/Cav3 perturbation → Ca²⁺ dysregulation → insulin secretion impaired → compensatory β-cell hyperfunction → β-cell exhaustion → T2D",
    s4p1: "The acute EMF effect on β-cells is disruption of the precisely calibrated Ca²⁺ signal that governs insulin exocytosis. EMF-induced perturbation of Cav1 and Cav3 channels alters the timing, amplitude, and duration of Ca²⁺ transients. Sakurai 2008 demonstrated that ELF electromagnetic fields reduced insulin secretion by approximately 30% in exposed islet cells — a direct confirmation that EMF can impair the GSIS pathway.",
    s4p2: "The chronic pathway to type 2 diabetes follows: sustained insulin secretion impairment triggers compensatory β-cell hyperfunction — the remaining cells work harder to maintain glycemic control. This compensatory overwork accelerates β-cell exhaustion and apoptosis, progressively reducing insulin-secreting capacity. The result is the classic T2D trajectory: impaired glucose tolerance → insulin resistance → overt diabetes.",

    s5Title: "Population Evidence",
    s5Stats: [
      "Tsimane (Bolivia): T2D prevalence approximately 0% — lowest recorded EMF environment on Earth",
      "Kitava (Papua New Guinea): T2D effectively absent despite high-carbohydrate diet — near-zero EMF exposure",
      "Old Order Amish: T2D prevalence significantly below US average — limited technology adoption, lower EMF",
      "United States: T2D prevalence 11.6% (CDC 2023) — highest population-level EMF density",
    ],

    s6Title: "PCOS — 4-Organ Convergence",
    s6p1: "Polycystic ovary syndrome (PCOS) is reinterpreted by the BERM framework as a 4-organ convergence disease — a condition where EMF simultaneously affects four organs, each independently dependent on voltage-gated calcium channels. This multi-organ convergence produces the characteristic PCOS phenotype:",
    s6Organs: [
      "Pancreas β-cells (Cav1 + Cav3): EMF-induced insulin secretion impairment triggers compensatory hyperinsulinemia",
      "Ovarian theca cells: hyperinsulinemia drives excess androgen (testosterone) production",
      "Ovarian granulosa cells: aromatase activity disrupted, reducing estradiol conversion",
      "Pituitary gonadotrophs (Cav3): LH/FSH ratio elevated, disrupting ovulatory cycling",
    ],
    s6p2: "Each of these four organs independently uses VGCCs for its core endocrine function. EMF does not need to target PCOS specifically — it simultaneously perturbs all four VGCC-dependent systems, and the convergence of these four disruptions produces the PCOS phenotype. PCOS affects 5–20% of reproductive-age women globally, with prevalence rising in parallel with EMF environment densification.",

    s4SectionTitle: "Evidence and Predictions",

    s7Title: "EMF Evidence Summary",
    s7Stats: [
      "Sakurai 2008: ELF electromagnetic fields reduced insulin secretion by ~30% in hamster pancreatic islet cells",
      "β-cell VGCC density is among the highest of any endocrine cell type, making them inherently EMF-sensitive",
      "All studied low-EMF populations (Tsimane, Kitava, Amish) show near-zero T2D prevalence regardless of diet composition",
      "TheraBionic parallel: FDA-approved device uses amplitude-modulated EMF → Cav3.2 activation in hepatocellular carcinoma cells at SAR levels 100–1000× below typical phone exposure",
    ],

    s8Title: "BERM Predictions",
    s8Text:
      "The BERM framework generates three specific, testable predictions from the glucose-dependent χ mechanism:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF exposure combined with high-glycemic diet produces synergistic T2D risk exceeding the additive prediction of either factor alone. The glucose-dependent χ mechanism predicts that EMF effects on insulin secretion are amplified during high-glucose states, creating a multiplicative interaction.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Intermittent fasting or time-restricted feeding protects β-cells from EMF-induced insulin dysfunction. Fasting periods hyperpolarize the β-cell membrane via open K_ATP channels, reducing χ to near zero and creating temporal windows of EMF resilience.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "National T2D incidence correlates with population-level EMF density after controlling for diet composition, obesity prevalence, genetic predisposition, and physical activity levels. The residual correlation reflects the VGCC-mediated component of T2D etiology.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai et al. 2008",
        finding:
          "ELF electromagnetic field exposure reduced insulin secretion by approximately 30% in hamster pancreatic islet cells, demonstrating direct EMF impairment of the GSIS pathway via voltage-gated calcium channel perturbation.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2 Parallel",
        finding:
          "FDA-approved therapeutic device uses amplitude-modulated electromagnetic fields to activate Cav3.2 (T-type) channels in hepatocellular carcinoma cells at SAR levels 100–1000× below typical mobile phone exposure — confirming biological VGCC effects at sub-thermal intensities.",
      },
    ],

    seeAlso: "See also",
    pituitaryModulome: "Pituitary modulome",
    brainModulome: "Brain modulome",
    predictionsPage: "Predictions — PANC series",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Haima",
    subtitle:
      "Glukoosiriippuvainen EMF-herkkyys Cav1 + Cav3 -kaksoiskanavarkkitehtuurin kautta beetasoluissa",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "β-Solun kalsiumkanava-arkkitehtuuri",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav1 (L-tyyppi) + Cav3 (T-tyyppi)",
    geneVal: "CACNA1C / CACNA1D + CACNA1H",
    cellTypeVal: "Haiman β-solut",
    functionVal:
      "Glukoosistimuloitu insuliinisekretio VGCC → Ca²⁺ → vesikkeliekosytoosi",
    levelVal: "M|C",

    s2Title: "Glukoosistimuloitu insuliinisekretio",
    s2p1: "Haiman β-solut ovat Langerhansin saarekkeiden insuliinia tuottavia endokriinisia soluja. Ne käyttävät SEKÄ L-tyypin (Cav1.2, Cav1.3) ETTÄ T-tyypin (Cav3.2) jänniteohjattuja kalsiumkanavia glukoosistimuloidussa insuliinisekreetiossa (GSIS). Kanoninen GSIS-reitti etenee: glukoosi saapuu GLUT2:n kautta → glykolyysi nostaa ATP/ADP-suhdetta → K_ATP-kanavat sulkeutuvat → kalvo depolarisoituu → VGCC:t aktivoituvat → Ca²⁺-sisäänvirtaus → insuliinivesikkelien eksosytoosi.",
    s2p2: "T-tyypin kanavat (Cav3.2) aktivoituvat matalammalla kynnyksellä (~−50mV) kuin L-tyypin kanavat (Cav1.2, ~−30mV), luoden peräkkäisen aktivaatiokaskadin. T-tyypin kanavat laukeavat ensin alkuvaiheen depolarisaatiossa, virittäen kalvon ja tuottaen varhaisen tahdistindepolarisaation, joka tuo kalvon L-tyypin aktivaatiokynnykseen. L-tyypin kanavat tuottavat sitten suuremman, kestävämmän Ca²⁺-sisäänvirtauksen, joka ajaa insuliinieksosytoosin päävaiheen.",
    s2p3: "Tämä kaksoiskanavarkkitehtuuri tekee β-soluista ainutlaatuisen riippuvaisia VGCC-toiminnasta. Mikä tahansa häiriö kummassakin kanavatyypissä — farmakologinen, geneettinen tai sähkömagneettinen — heikentää suoraan insuliinisekreetioreititä. β-solun VGCC-tiheys on yksi korkeimmista kaikista endokriinisistä soluista, mikä tekee siitä luonnostaan altista sähkömagneettiselle häiriölle.",

    s2SectionTitle: "Glukoosiriippuvainen χ -mekanismi",

    s3Title: "Aterioista riippuva haavoittuvuusikkuna",
    s3Chain:
      "Korkea glukoosi → K_ATP sulkeutuu → kalvo depolarisoituu → VGCC:t viritetty → χ KORKEA ↔ Paasto → K_ATP auki → kalvo hyperpolarisoitu → VGCC:t inaktiivisia → χ MATALA",
    s3p1: "β-solu esittää ainutlaatuisen piirteen BERM-kehyksessä: sen EMF-herkkyys (χ) moduloituu dynaamisesti veren glukoosikonsentraation mukaan. K_ATP-kanava toimii molekulaarisena jänniteporttina — kun verensokeri on matala, K_ATP-kanavat pysyvät auki, lukiten kalvon noin −70mV:iin. Tässä potentiaalissa VGCC:t ovat lujasti inaktiivisia eikä ulkoinen sähkömagneettinen kenttä voi häiritä niitä. Solu on käytännössä suojattu.",
    s3p2: "Kun verensokeri nousee postprandiaalisesti, K_ATP-kanavat sulkeutuvat, kalvo depolarisoituu kohti VGCC-aktivaatioikkunaa (−50...−30mV) ja kanavat virittyvät — valmiina kynnyksellä, jossa pienet jännitehäiriöt voivat laukaista ennenaikaisen tai liiallisen Ca²⁺-sisäänvirtauksen. Tämä luo aterioista riippuvan haavoittuvuusikkunan: syömisen jälkeen (erityisesti korkean glykeemisen indeksin aterioiden) β-solun χ on maksimoitu. Paasto puolestaan hyperpolarisoi kalvon ja minimoi χ:n. Tämä mekanismi selittää miksi paasto voi suojata EMF-indusoidulta metaboliselta häiriöltä ja miksi korkean glykeemisen indeksin ruokavaliot synergioivat EMF-altistuksen kanssa.",

    s3SectionTitle: "T2D- ja PCOS-mekanismi",

    s4Title: "T2D-mekanismiketju",
    s4Chain:
      "EMF → Cav1/Cav3-häiriö → Ca²⁺-dysregulaatio → insuliinisekretio heikkenee → kompensatorinen β-solun hyperfunktio → β-solun uupuminen → T2D",
    s4p1: "EMF:n akuutti vaikutus β-soluihin on insuliinieksosytoosia ohjaavan tarkasti kalibroidun Ca²⁺-signaalin häiriö. EMF-indusoitu Cav1- ja Cav3-kanavien häiriö muuttaa Ca²⁺-transienttien ajoitusta, amplitudia ja kestoa. Sakurai 2008 osoitti, että ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä noin 30 % altistetuissa saarekesoluissa — suora vahvistus sille, että EMF voi heikentää GSIS-reittiä.",
    s4p2: "Krooninen reitti tyypin 2 diabetekseen etenee: jatkuva insuliinisekretion heikkeneminen laukaisee kompensatorisen β-solun hyperfunktion — jäljelle jäävät solut työskentelevät kovemmin ylläpitääkseen glykemista kontrollia. Tämä kompensatorinen ylityö kiihdyttää β-solun uupumista ja apoptoosia, vähentäen asteittain insuliinia eritttävää kapasiteettia. Tuloksena on klassinen T2D-kehityskulku: heikentynyt glukoositoleranssi → insuliiniresistenssi → manifesti diabetes.",

    s5Title: "Populaatioevidenssi",
    s5Stats: [
      "Tsimane (Bolivia): T2D-prevalenssi noin 0 % — maapallon matalin mitattu EMF-ympäristö",
      "Kitava (Papua-Uusi-Guinea): T2D käytännössä puuttuu korkeahiilihydraattisesta ruokavaliosta huolimatta — lähes nolla-EMF-altistus",
      "Vanhan linjan amissit: T2D-prevalenssi merkittävästi alle USA:n keskiarvon — rajoitettu teknologian käyttöönotto, matalampi EMF",
      "Yhdysvallat: T2D-prevalenssi 11,6 % (CDC 2023) — korkein väestötason EMF-tiheys",
    ],

    s6Title: "PCOS — neljän elimen konvergenssi",
    s6p1: "BERM-kehys tulkitsee polykystisen munasarjaoireyhtymän (PCOS) neljän elimen konvergenssisairautena — tilana, jossa EMF vaikuttaa samanaikaisesti neljään elimeen, joista kukin on itsenäisesti riippuvainen jänniteohjattuista kalsiumkanavista. Tämä monieliminen konvergenssi tuottaa PCOS:lle tyypillisen fenotyypin:",
    s6Organs: [
      "Haiman β-solut (Cav1 + Cav3): EMF-indusoitu insuliinisekretion heikkeneminen laukaisee kompensatorisen hyperinsulinemian",
      "Munasarjan theca-solut: hyperinsulinemia ajaa liiallista androgeeni(testosteroni)tuotantoa",
      "Munasarjan granuloosasolut: aromataasiaktiivisuus häiriintyy, vähentäen estradiolikonversiota",
      "Aivolisakkeen gonadotrofit (Cav3): LH/FSH-suhde nousee, häiriten ovulatorista sykliä",
    ],
    s6p2: "Jokainen näistä neljästä elimestä käyttää itsenäisesti VGCC:itä endokriiniseen päätoimintoonsa. EMF:n ei tarvitse kohdistua PCOS:iin erityisesti — se häiritsee samanaikaisesti kaikkia neljää VGCC-riippuvaista järjestelmää, ja näiden neljän häiriön konvergenssi tuottaa PCOS-fenotyypin. PCOS koskee 5–20 % lisääntymisikäisistä naisista maailmanlaajuisesti, ja prevalenssi nousee rinnakkain EMF-ympäristön tiivistymisen kanssa.",

    s4SectionTitle: "Evidenssi ja ennusteet",

    s7Title: "EMF-evidenssin yhteenveto",
    s7Stats: [
      "Sakurai 2008: ELF-sähkömagneettiset kentät vähensivät insuliinisekreetiötä ~30 % hamsterin haiman saarekesoluissa",
      "β-solun VGCC-tiheys on yksi korkeimmista kaikista endokriinisistä solutyypeistä, mikä tekee niistä luonnostaan EMF-herkiä",
      "Kaikki tutkitut matalan EMF:n populaatiot (Tsimane, Kitava, amissit) osoittavat lähes nolla-T2D-prevalenssin ruokavalion koostumuksesta riippumatta",
      "TheraBionic-rinnakkaisuus: FDA-hyväksytty laite käyttää amplitudimoduloitua EMF:ää → Cav3.2-aktivaatio maksasolusyopäsoluissa SAR-tasoilla 100–1000× alle tyypillisen puhelimen altistuksen",
    ],

    s8Title: "BERM-ennusteet",
    s8Text:
      "BERM-kehys tuottaa kolme spesifistä, testattavaa ennustetta glukoosiriippuvaisesta χ-mekanismista:",
    s8Predictions: [
      {
        id: "PANC-1",
        text: "EMF-altistus yhdistettynä korkean glykeemisen indeksin ruokavalioon tuottaa synergistisen T2D-riskin, joka ylittää kummankaan tekijän yksinään aiheuttaman additiivisen ennusteen. Glukoosiriippuvainen χ-mekanismi ennustaa, että EMF:n vaikutukset insuliinisekreetioon vahvistuvat korkean glukoosin tilassa, luoden multiplikatiivisen vuorovaikutuksen.",
        discriminating: true,
      },
      {
        id: "PANC-2",
        text: "Jaksottainen paasto tai aikaikkunaruokailu suojaa β-soluja EMF-indusoidulta insuliinin toimintahäiriöltä. Paastojaksot hyperpolarisoivat β-solun kalvon avointen K_ATP-kanavien kautta, vähentäen χ:n lähelle nollaa ja luoden ajallisia EMF-resilienssit ikkunoita.",
        discriminating: true,
      },
      {
        id: "PANC-3",
        text: "Kansallinen T2D-ilmaantuvuus korreloi väestötason EMF-tiheyden kanssa ruokavalion koostumuksen, lihavuuden prevalenssin, geneettisen alttiuden ja fyysisen aktiivisuuden vakioinnin jälkeen. Jäännöskorrelaatio heijastaa T2D-etiologian VGCC-välitteistä komponenttia.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "sakurai-2008-elf-insulin",
        citation: "Sakurai ym. 2008",
        finding:
          "ELF-sähkömagneettinen kenttäaltistus vähensi insuliinisekreetiötä noin 30 % hamsterin haiman saarekesoluissa, osoittaen suoran EMF-välitteisen GSIS-reitin heikentymisen jänniteohjattujen kalsiumkanavien häiriön kautta.",
      },
      {
        id: "therabionic-cav32-parallel",
        citation: "TheraBionic / Cav3.2 -rinnakkaisuus",
        finding:
          "FDA-hyväksytty terapeuttinen laite käyttää amplitudimoduloituja sähkömagneettisia kenttiä aktivoidakseen Cav3.2 (T-tyyppi) -kanavia maksasolusyopäsoluissa SAR-tasoilla 100–1000× alle tyypillisen matkapuhelinaltistuksen — vahvistaen biologiset VGCC-vaikutukset subtermisillä intensiteeteillä.",
      },
    ],

    seeAlso: "Katso myös",
    pituitaryModulome: "Aivolisakkeen moduloomi",
    brainModulome: "Aivojen moduloomi",
    predictionsPage: "Ennusteet — PANC-sarja",
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

export default async function PancreasPage({
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

      <PageHeader icon={Droplets} title={d.title} subtitle={d.subtitle} />

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

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

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

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s4Chain}
          </p>
        </div>

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

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s6Organs.map((organ, i) => (
            <li key={i} className="pl-1 flex gap-3">
              <span className="font-mono-num text-xs text-accent shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <span>{organ}</span>
            </li>
          ))}
        </ol>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s6p2}
          </p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s4SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s7Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s8Text}
        </p>

        <div className="space-y-4">
          {d.s8Predictions.map((pred) => (
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
            {activeLocale === "fi"
              ? "Kaikki ennusteet →"
              : "All predictions →"}
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
                <CitationLink citation={ref.citation} />
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
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
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
