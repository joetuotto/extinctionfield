import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Hypothalamus (Arcuate Nucleus)",
    subtitle:
      "VGCC-mediated Ca²⁺ signaling in ARC glia and neurons: selective amplification of hunger signaling",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: Channel Profile --- */
    s1SectionTitle: "Arcuate Nucleus as EMF Target",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "VGCC (glia + neurons)",
    geneVal: "CACNA1C / CACNA1H (multiple subtypes)",
    cellTypeVal: "ARC astrocytes (glia), AgRP/NPY neurons, POMC neurons",
    functionVal:
      "Appetite regulation via glial Ca²⁺ → neuronal excitation in arcuate nucleus",
    levelVal: "E",

    /* 02 Mechanism */
    s2Title: "Appetite Regulation Mechanism",
    s2Chain:
      "EMF → VGCC activation → Ca²⁺ ↑ in ARC glia → AgRP/NPY neuron excitation → hunger signal ↑",
    s2p1:
      "The arcuate nucleus (ARC) of the hypothalamus is the brain's primary appetite regulation center. It contains two opposing neuronal populations: AgRP/NPY neurons (orexigenic — promote hunger) and POMC neurons (anorexigenic — promote satiety). Both populations are modulated by surrounding astrocytes (glia) through Ca²⁺-dependent signaling.",
    s2p2:
      "Ca²⁺ activation of ARC glia selectively excites AgRP/NPY neurons, increasing appetite drive. POMC neurons receive balanced excitatory and inhibitory input from the same glial Ca²⁺ signal, resulting in no net change in satiety signaling. The result is a selective amplification of hunger signaling without a corresponding increase in satiety — a net shift toward increased food intake.",
    s2p3:
      "This asymmetry is critical: EMF-induced VGCC activation in ARC glia does not simply increase all hypothalamic activity. It specifically tips the hunger/satiety balance toward hunger by preferentially exciting the orexigenic pathway. The hypothalamus integrates energy homeostasis through this glia-neuron Ca²⁺ signaling network, making it a specific target for EMF-induced metabolic disruption.",

    /* --- SECTION 2: Evidence --- */
    s2SectionTitle: "Key Evidence",

    /* 03 Chen 2016 */
    s3Title: "Chen et al. 2016 (eLife)",
    s3p1:
      "Chen et al. (2016) demonstrated the direct Ca²⁺ → appetite link in vivo. Using optogenetic and chemogenetic tools in mice, they showed that activation of astrocytes in the medial basal hypothalamus (which includes the ARC) directly modulated feeding behavior through Ca²⁺-dependent mechanisms. This study provides the mechanistic foundation: glial Ca²⁺ signaling in the hypothalamus is sufficient to alter appetite.",
    s3p2:
      "Yang et al. (2015) further showed that astrocyte stimulation in the medial basal hypothalamus reduced ghrelin-evoked food intake via adenosine A1 receptors (A1R). This demonstrates bidirectional glial control of appetite — the direction depends on which signaling pathways are engaged. The BERM mechanism predicts that EMF-induced Ca²⁺ elevation preferentially engages the excitatory (hunger-promoting) pathway via AgRP/NPY neurons.",

    /* 04 Alshammari 2022 */
    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari (2022) documented RF-EMF effects on food intake in humans, providing epidemiological evidence for the EMF → appetite link. This study connects the mechanistic pathway (VGCC → Ca²⁺ → ARC glia → appetite) to observable human outcomes.",

    /* --- SECTION 3: Clinical Parallel --- */
    s3SectionTitle: "Clinical Parallel & Context",

    /* 05 GLP-1 / Ozempic */
    s5Title: "GLP-1 Agonists (Semaglutide / Ozempic)",
    s5p1:
      "GLP-1 receptor agonists such as semaglutide (Ozempic/Wegovy) suppress appetite by acting on the same arcuate nucleus target. GLP-1 agonists reduce AgRP/NPY neuron activity and enhance POMC neuron signaling — the exact opposite direction to the EMF-induced Ca²⁺ effect described above.",
    s5p2:
      "This pharmacological parallel is significant: the same neural circuit that GLP-1 agonists therapeutically suppress is the circuit that EMF-induced Ca²⁺ elevation may chronically activate. Same target, opposite direction. The clinical success of GLP-1 agonists in reducing appetite and body weight validates the ARC as a critical node in appetite regulation and confirms that modulating this circuit produces substantial metabolic effects.",

    /* 06 Multifactorial caveat */
    s6Title: "Multifactorial Context",
    s6p1:
      "Obesity is a multifactorial condition driven by genetics, diet composition, physical activity, gut microbiome, socioeconomic factors, sleep patterns, stress, and endocrine disruptors. The BERM framework identifies EMF-induced hypothalamic Ca²⁺ dysregulation as ONE contributing factor — not the sole cause.",
    s6Points: [
      "The hypothalamus is a TARGET of EMF-induced Ca²⁺ changes, contributing to appetite dysregulation as one factor among many",
      "Population-level obesity trends have multiple drivers; EMF exposure may act as a previously unrecognized amplifier of hunger signaling",
      "The mechanism is specific and testable: VGCC → Ca²⁺ → ARC glia → AgRP/NPY → appetite, with evidence level E (direct Ca²⁺ → appetite verified in vivo)",
      "This does not replace established obesity risk factors — it adds a mechanistically grounded, VGCC-mediated pathway to the existing multifactorial model",
    ],

    /* References */
    references: "Key References",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen et al. 2016 (eLife)",
        finding:
          "Demonstrated direct Ca²⁺ → appetite link in vivo. Astrocyte activation in medial basal hypothalamus modulated feeding behavior through Ca²⁺-dependent mechanisms in mice.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        finding:
          "RF-EMF effects on food intake documented in humans, connecting the VGCC → Ca²⁺ → appetite mechanistic pathway to observable human outcomes.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang et al. 2015",
        finding:
          "Astrocyte stimulation in medial basal hypothalamus reduced ghrelin-evoked food intake via adenosine A1R, demonstrating bidirectional glial control of appetite in the hypothalamus.",
      },
    ],

    /* See also */
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    brainModulome: "Brain modulome",
    pancreasModulome: "Pancreas modulome",
    modelPage: "Model — CaMKII convergence",
  },
  fi: {
    title: "Hypotalamus (nucleus arcuatus)",
    subtitle:
      "VGCC-välitteinen Ca²⁺-signalointi ARC:n glia- ja hermosoluissa: nälänsignaloinnin selektiivinen vahvistuminen",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Kanavaprofiili --- */
    s1SectionTitle: "Nucleus arcuatus EMF-kohteena",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "VGCC (glia + hermosolut)",
    geneVal: "CACNA1C / CACNA1H (useita alatyyppejä)",
    cellTypeVal: "ARC:n astrosyytit (glia), AgRP/NPY-neuronit, POMC-neuronit",
    functionVal:
      "Ruokahalun säätely gliaalisen Ca²⁺-signaloinnin kautta nucleus arcuatuksessa",
    levelVal: "E",

    /* 02 Mekanismi */
    s2Title: "Ruokahalun säätelymekanismi",
    s2Chain:
      "EMF → VGCC-aktivaatio → Ca²⁺ ↑ ARC:n gliassa → AgRP/NPY-neuronien eksitaatio → nälänsignaali ↑",
    s2p1:
      "Hypotalamuksen nucleus arcuatus (ARC) on aivojen ensisijainen ruokahalun säätelykeskus. Se sisältää kaksi vastakkaista neuronipopulaatiota: AgRP/NPY-neuronit (oreksigeeniset — lisäävät nälkää) ja POMC-neuronit (anoreksigeeniset — edistävät kylläisyyttä). Molempia populaatioita moduloivat ympäröivät astrosyytit (glia) Ca²⁺-riippuvaisen signaloinnin kautta.",
    s2p2:
      "ARC:n glian Ca²⁺-aktivaatio eksitoi selektiivisesti AgRP/NPY-neuroneja, lisäten ruokahalun ajuria. POMC-neuronit saavat tasapainotetun eksitatorisen ja inhibitorisen syötteen samasta gliaalisesta Ca²⁺-signaalista, mikä ei tuota nettovaikutusta kylläisyyssignalointiin. Tuloksena on nälänsignaloinnin selektiivinen vahvistuminen ilman vastaavaa kylläisyyden lisäystä — nettosiirtymä kohti lisääntynyttä ravinnonsaantia.",
    s2p3:
      "Tämä asymmetria on kriittinen: EMF-indusoitu VGCC-aktivaatio ARC:n gliassa ei yksinkertaisesti lisää kaikkea hypotalamuksen aktiivisuutta. Se kallistaa nälän/kylläisyyden tasapainon erityisesti nälän suuntaan eksitoimalla preferentiaalisesti oreksigeenistä reittiä. Hypotalamus integroi energiahomeostaasia tämän glia-neuroni Ca²⁺-signalointiverkoston kautta, mikä tekee siitä spesifisen kohteen EMF-indusoidulle metaboliselle häiriölle.",

    /* --- OSIO 2: Evidenssi --- */
    s2SectionTitle: "Keskeinen evidenssi",

    /* 03 Chen 2016 */
    s3Title: "Chen ym. 2016 (eLife)",
    s3p1:
      "Chen ym. (2016) osoittivat suoran Ca²⁺ → ruokahalu -yhteyden in vivo. Käyttäen optogeneettisiä ja kemogeneettisiä työkaluja hiirissä he näyttivät, että astrosyyttien aktivaatio mediaalisessa basaalihypotalamuksessa (joka sisältää ARC:n) moduloi suoraan syömiskäyttäytymistä Ca²⁺-riippuvaisten mekanismien kautta. Tämä tutkimus tarjoaa mekanistisen perustan: gliaalinen Ca²⁺-signalointi hypotalamuksessa riittää muuttamaan ruokahalua.",
    s3p2:
      "Yang ym. (2015) osoittivat lisäksi, että astrosyyttistimulaatio mediaalisessa basaalihypotalamuksessa vähensi greliinin laukaisemaa ravinnonsaantia adenosiini A1 -reseptorien (A1R) kautta. Tämä osoittaa glian kaksisuuntaisen ruokahalun säätelyn — suunta riippuu siitä, mitkä signalointireitit aktivoituvat. BERM-mekanismi ennustaa, että EMF-indusoitu Ca²⁺-nousu aktivoi preferentiaalisesti eksitatorisen (nälkää edistävän) reitin AgRP/NPY-neuronien kautta.",

    /* 04 Alshammari 2022 */
    s4Title: "Alshammari 2022 (PMC8777647)",
    s4p1:
      "Alshammari (2022) dokumentoi RF-EMF:n vaikutukset ravinnonsaantiin ihmisillä, tarjoten epidemiologisen evidenssin EMF → ruokahalu -yhteydelle. Tämä tutkimus yhdistää mekanistisen reitin (VGCC → Ca²⁺ → ARC:n glia → ruokahalu) havaittaviin ihmisvasteisiin.",

    /* --- OSIO 3: Kliininen rinnakkaisuus & konteksti --- */
    s3SectionTitle: "Kliininen rinnakkaisuus ja konteksti",

    /* 05 GLP-1 / Ozempic */
    s5Title: "GLP-1-agonistit (semagluktidi / Ozempic)",
    s5p1:
      "GLP-1-reseptoriagonistit kuten semagluktidi (Ozempic/Wegovy) hillitsevät ruokahalua vaikuttamalla samaan nucleus arcuatus -kohteeseen. GLP-1-agonistit vähentävät AgRP/NPY-neuronien aktiivisuutta ja tehostavat POMC-neuronien signalointia — täsmälleen päinvastainen suunta kuin yllä kuvattu EMF-indusoitu Ca²⁺-vaikutus.",
    s5p2:
      "Tämä farmakologinen rinnakkaisuus on merkittävä: sama hermopiiri, jota GLP-1-agonistit terapeuttisesti vaimentavat, on piiri jonka EMF-indusoitu Ca²⁺-nousu voi kroonisesti aktivoida. Sama kohde, vastakkainen suunta. GLP-1-agonistien kliininen menestys ruokahalun ja painon vähentämisessä validoi ARC:n kriittiisenä solmuna ruokahalun säätelyssä ja vahvistaa, että tämän piirin modulointi tuottaa merkittäviä metabolisia vaikutuksia.",

    /* 06 Monitekijäinen konteksti */
    s6Title: "Monitekijäinen konteksti",
    s6p1:
      "Lihavuus on monitekijäinen tila, jota ohjaavat genetiikka, ruokavalion koostumus, fyysinen aktiivisuus, suolistomikrobiomi, sosioekonomioset tekijät, unitottumukset, stressi ja endokriiniset häiriötekijät. BERM-kehys tunnistaa EMF-indusoidun hypotalamuksen Ca²⁺-dysregulaation YHTENÄ myötävaikuttavana tekijänä — ei ainoana syynä.",
    s6Points: [
      "Hypotalamus on EMF-indusoitujen Ca²⁺-muutosten KOHDE, joka myötävaikuttaa ruokahalun dysregulaatioon yhtenä tekijänä monien joukossa",
      "Väestötason lihavuustrendeillä on useita ajureita; EMF-altistus voi toimia aiemmin tunnistamattomana nälänsignaloinnin vahvistajana",
      "Mekanismi on spesifinen ja testattava: VGCC → Ca²⁺ → ARC:n glia → AgRP/NPY → ruokahalu, evidenssitasolla E (suora Ca²⁺ → ruokahalu vahvistettu in vivo)",
      "Tämä ei korvaa vakiintuneita lihavuuden riskitekijöitä — se lisää mekanistisesti perustellun, VGCC-välitteisen reitin olemassa olevaan monitekijäiseen malliin",
    ],

    /* Viitteet */
    references: "Keskeiset viitteet",
    refs: [
      {
        id: "chen-2016-elife-ca-appetite",
        citation: "Chen ym. 2016 (eLife)",
        finding:
          "Osoitti suoran Ca²⁺ → ruokahalu -yhteyden in vivo. Astrosyyttien aktivaatio mediaalisessa basaalihypotalamuksessa moduloi syömiskäyttäytymistä Ca²⁺-riippuvaisten mekanismien kautta hiirissä.",
      },
      {
        id: "alshammari-2022-rf-emf-food-intake",
        citation: "Alshammari 2022 (PMC8777647)",
        finding:
          "RF-EMF:n vaikutukset ravinnonsaantiin dokumentoitu ihmisillä, yhdistäen VGCC → Ca²⁺ → ruokahalu -mekanistisen reitin havaittaviin ihmisvasteisiin.",
      },
      {
        id: "yang-2015-astrocyte-ghrelin",
        citation: "Yang ym. 2015",
        finding:
          "Astrosyyttistimulaatio mediaalisessa basaalihypotalamuksessa vähensi greliinin laukaisemaa ravinnonsaantia adenosiini A1R:n kautta, osoittaen glian kaksisuuntaisen ruokahalun säätelyn hypotalamuksessa.",
      },
    ],

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    brainModulome: "Aivojen moduloomi",
    pancreasModulome: "Haiman moduloomi",
    modelPage: "Malli — CaMKII-konvergenssi",
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

export default async function HypothalamusPage({
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

      {/* ===============================================
          SECTION 1 -- Arcuate Nucleus as EMF Target
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 -- Channel Profile */}
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
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* 02 -- Appetite Regulation Mechanism */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s2Chain}
          </p>
        </div>

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

      {/* ===============================================
          SECTION 2 -- Key Evidence
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 03 -- Chen et al. 2016 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s3p1}
          </p>
          <p>{d.s3p2}</p>
        </div>
      </section>

      {/* 04 -- Alshammari 2022 */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s4p1}
          </p>
        </div>
      </section>

      {/* ===============================================
          SECTION 3 -- Clinical Parallel & Context
          =============================================== */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 05 -- GLP-1 / Ozempic */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s5p1}
          </p>
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-5">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {activeLocale === "fi"
                ? "Kliininen rinnakkaisuus"
                : "Clinical parallel"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s5p2}
            </p>
          </div>
        </div>
      </section>

      {/* 06 -- Multifactorial Context */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-4">
          {d.s6p1}
        </p>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            {d.s6Points.map((point, i) => (
              <li key={i} className="pl-1 flex gap-2">
                <span className="text-accent shrink-0">*</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* References */}
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

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/brain`}
            className="text-sm text-accent hover:underline"
          >
            {d.brainModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/pancreas`}
            className="text-sm text-accent hover:underline"
          >
            {d.pancreasModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/model#camkii-convergence`}
            className="text-sm text-accent hover:underline"
          >
            {d.modelPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
