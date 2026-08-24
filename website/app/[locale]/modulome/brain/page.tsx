import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EDCContext } from "@/components/EDCContext";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { SevenChannelDiagram } from "@/components/SevenChannelDiagram";
import { VarianceModel } from "@/components/VarianceModel";

const COPY = {
  en: {
    title: "Brain",
    subtitle:
      "From Alzheimer's to neurodevelopment: VGCC as the common thread",
    backLink: "← Back to Modulome",

    /* --- SECTION 1: The Brain as EMF Target --- */
    s1SectionTitle: "The Brain as EMF Target",

    /* 01 Channel Profile */
    channelProfile: "Channel Profile",
    channel: "Channel",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    cav3Subtype: "Cav3.2 (highest T-type density in brain)",
    cellTypeVal: "Granule cells, neuronal progenitors",
    functionVal: "Neurogenesis, memory consolidation, learning",
    levelVal: "M|C",

    /* 02 EMF Evidence */
    emfEvidence: "EMF Evidence Summary",
    emfEvidenceText:
      "Pall 2022: 18 types of evidence for EMF → VGCC → Ca²⁺ → Alzheimer's. 34% brain cell death in 4 weeks of EMF exposure in rats — blocked by VGCC blocker amlodipine. BBB opening → amyloid entry.",

    /* 03 Chi Analysis */
    chiAnalysis: "Lindgren χ Analysis",
    chiAnalysisText:
      "Double hit: (1) Cav3.2 bifurcation in DG → chronic Ca²⁺ → amyloid cascade. (2) BBB opening → blood-borne Aβ enters brain. Both converge on hippocampus. Age amplifies via mitochondrial χ.",

    /* 04 Key Prediction */
    prediction: "Key Prediction",
    predictionText:
      "Alzheimer's onset age correlates inversely with cumulative EMF exposure. VGCC blocker slows progression.",

    /* --- SECTION 2: CACNA1C --- */
    s2SectionTitle: "CACNA1C: The Psychiatric Risk Channel",

    /* 05 CACNA1C */
    s5Title: "CACNA1C: One Gene, Five Disorders",
    s5Points: [
      "CACNA1C encodes the α1C subunit of L-type voltage-gated calcium channel Cav1.2 — the primary L-type channel in the brain.",
      "GWAS mega-analysis (Psychiatric Genomics Consortium, 33,332 cases, 27,888 controls): CACNA1C variants significantly associated with ALL FIVE major psychiatric disorders — ASD, ADHD, bipolar disorder, major depression, schizophrenia.",
      "Timothy syndrome: G406R gain-of-function mutation in CACNA1C causes autism with 80% penetrance — highest of any syndromic form. Mechanism: excessive Ca²⁺ influx disrupts axon targeting via selective autophagy → circuit formation defects (PLOS Genetics 2019).",
      "CACNA1G (T-type!) also associated with ASD via two SNPs (rs757415, rs12603112). This connects T-type channels — the same ones in BERM’s bifurcation mechanism — directly to neurodevelopmental disorders.",
      "In BERM framework: CACNA1C/CACNA1G variants are GENETIC χ-MODULATORS. Carriers have altered channel gating → different χ_channel → different EMF sensitivity.",
    ],
    s5Warning:
      "Timothy syndrome is a RARE de novo mutation. Its significance to BERM is MECHANISTIC (proves excessive VGCC Ca²⁺ is sufficient for autism) — NOT epidemiological. Do NOT present it as \"EMF causes Timothy syndrome.\"",
    s5WarningLabel: "Important methodological note",

    /* 06 Neurodevelopmental Prediction */
    s6Title: "Neurodevelopmental Prediction",
    s6Predictions: [
      {
        id: "NEURO-GxE-1",
        text: "CACNA1C risk variant carriers whose mothers had high EMF exposure during pregnancy show higher ASD/ADHD rates than (a) non-carriers with same exposure or (b) carriers without prenatal EMF exposure. This is a testable GxE interaction.",
        discriminating: true,
      },
    ],

    /* --- SECTION 3: Developmental Windows --- */
    s3SectionTitle: "Developmental Windows",

    /* 07 Prenatal Programming */
    s7Title: "Prenatal Programming (EDC Framework)",
    s7Intro:
      "The masculinization programming window (gestational weeks 8–14) is when fetal androgens permanently organize reproductive anatomy and brain sexual differentiation. Seven VGCC-dependent causal channels converge on this critical window:",
    s7Channels: [
      {
        name: "Fetal Leydig Cav3 → StAR → testosterone",
        desc: "T-type calcium channels in fetal Leydig cells drive StAR-mediated steroidogenesis. Disruption reduces fetal testosterone during the masculinization programming window.",
      },
      {
        name: "Brain aromatase (CYP19) — Ca²⁺-dependent",
        desc: "Aromatase converts testosterone to estradiol for brain sexual differentiation. CYP19 expression is Ca²⁺-regulated; VGCC disruption alters the local T/E2 ratio in developing brain.",
      },
      {
        name: "Pituitary gonadotroph Cav3 → FSH/LH",
        desc: "T-type channels in pituitary gonadotrophs control pulsatile GnRH-stimulated FSH/LH release. Disrupted pulsatility impairs the fetal HPG axis.",
      },
      {
        name: "OT/AVP system (VGCC-dependent)",
        desc: "Oxytocin and vasopressin neuron development is VGCC-dependent. These neuropeptides are sexually dimorphic and critical for social cognition.",
      },
      {
        name: "PFC (Cav1.2 + Cav3) → identity, executive function",
        desc: "Prefrontal cortex development requires both L-type (Cav1.2) and T-type (Cav3) channels for neuronal migration, synaptogenesis, and circuit maturation.",
      },
      {
        name: "Melatonin → puberty timing (CRY pathway)",
        desc: "Pineal melatonin synthesis is VGCC-gated. Melatonin regulates GnRH neuron maturation and puberty onset timing via the CRY/circadian pathway.",
      },
      {
        name: "Insular cortex → interoception, body representation",
        desc: "The insula maps internal bodily states. VGCC-dependent development of interoceptive circuits during fetal and early postnatal life shapes body self-representation.",
      },
    ],
    s7Pharma: "Pharmacological verification",
    s7PharmaText:
      "Ethosuximide (selective T-type blocker) and mibefradil (T/L-type blocker) both produce reproductive and developmental effects consistent with the 7-channel model: disrupted steroidogenesis, altered puberty timing, and modified sexually dimorphic behaviors in animal models.",
    s7PredTitle: "Key predictions from the prenatal programming model",
    s7Preds: [
      {
        id: "DIFF-1",
        text: "Anogenital distance (AGD) correlates inversely with prenatal EMF exposure. AGD is the gold-standard biomarker of the masculinization programming window — reduced AGD in males indicates insufficient fetal androgen action during weeks 8–14.",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "Central precocious puberty (CPP) incidence increases with cumulative childhood EMF exposure. CPP has increased 3× in girls and 2× in boys over the past two decades, temporally paralleling wireless infrastructure expansion.",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "Full prediction register",

    /* 08 Pubertal Maturation */
    s8Title: "Pubertal Maturation",
    s8p1:
      "The prefrontal cortex undergoes extensive VGCC-dependent synaptic pruning and myelination during puberty (ages 10–25). This maturation process requires precisely timed Cav1.2 and Cav3 activity for eliminating excess synapses while strengthening functional circuits. EMF-induced Ca²⁺ dysregulation during this window could alter the pruning ratio, affecting executive function, impulse control, and risk assessment.",
    s8p2:
      "Central precocious puberty (CPP) has increased approximately 3× in girls and 2× in boys over the past two decades. The BERM mechanism provides a specific pathway: EMF → pineal VGCC → melatonin disruption → premature GnRH activation. This prediction (DIFF-3) is now considered VERIFIED by the epidemiological trend data, though direct causal confirmation requires intervention studies.",
    s8p3:
      "The oxytocin/vasopressin (OT/AVP) system undergoes a second developmental wave during puberty, with VGCC-dependent receptor redistribution shaping adult social bonding, pair-bonding, and stress response patterns. Disruption during this window may contribute to the observed increase in social anxiety and altered attachment patterns.",
    s8Badge: "M|C",

    /* 09 Sex-Specific Effects */
    s9Title: "Sex-Specific Effects",
    s9BoysTitle: "Boys: longer exposure, greater vulnerability",
    s9BoysPoints: [
      "Testosterone production (Leydig Cav3 → StAR) directly VGCC-dependent → T↓",
      "Masculinization programming window disruption → reduced AGD, incomplete genital differentiation",
      "Slower PFC maturation (completes ~25 vs ~22 in girls) → longer window of VGCC-dependent vulnerability",
      "Extended synaptic pruning period = more cumulative EMF exposure during critical circuit formation",
    ],
    s9GirlsTitle: "Girls: different pathways, earlier timing",
    s9GirlsPoints: [
      "Aromatase/AFP bypass: brain feminization involves distinct Ca²⁺-dependent pathways less studied than masculinization",
      "Earlier puberty onset (CPP 3× increase) → truncated childhood development window",
      "Interoceptive circuit disruption (insular cortex) → altered body self-representation and embodied cognition",
      "OT system disruption may differentially affect female-typical social cognition patterns",
    ],
    s9VarianceTitle: "Variance model",
    s9VarianceText:
      "The model predicts increased VARIANCE in sex-typical development, not a directional population shift. EMF exposure widens the population distribution of sexually dimorphic traits (AGD, digit ratio, pubertal timing, brain lateralization) without moving the mean in a single direction. Individuals at the tails of the distribution are most affected.",
    s9CriticalTest:
      "DIFF-1 (AGD + prenatal EMF) is the critical discriminating test. It is mechanistically specific (Leydig Cav3 → StAR → testosterone → AGD), uses an established biomarker with known EDC sensitivity, and cleanly separates the BERM prediction from alternative hypotheses.",

    /* See also */
    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidenceBBB: "Evidence: BBB",
    predictionsPage: "Predictions register",
    earPage: "Inner Ear (Cav1.3)",
    painPage: "Pain Pathways (Cav3.2)",
  },
  fi: {
    title: "Aivot",
    subtitle:
      "Alzheimerista neurokehitykseen: VGCC yhteisenä tekijänä",
    backLink: "← Takaisin moduloomiin",

    /* --- OSIO 1: Aivot EMF-kohteena --- */
    s1SectionTitle: "Aivot EMF-kohteena",

    /* 01 Kanavaprofiili */
    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    cav3Subtype: "Cav3.2 (aivojen korkein T-tyypin tiheys)",
    cellTypeVal: "Granuulisolut, hermoston kantasolut",
    functionVal: "Neurogeneesi, muistin konsolidaatio, oppiminen",
    levelVal: "M|C",

    /* 02 EMF-evidenssi */
    emfEvidence: "EMF-evidenssin yhteenveto",
    emfEvidenceText:
      "Pall 2022: 18 tyyppistä evidenssiä EMF → VGCC → Ca²⁺ → Alzheimer -ketjulle. 34 % aivosolujen kuolema 4 viikossa EMF-altistusta rotilla — estetty VGCC-salpaajalla amlodipiinilla. BBB:n avautuminen → amyloidin pääsy.",

    /* 03 Chi-analyysi */
    chiAnalysis: "Lindgren χ -analyysi",
    chiAnalysisText:
      "Kaksoisosuma: (1) Cav3.2-bifurkaatio DG:ssä → krooninen Ca²⁺ → amyloidikaskadi. (2) BBB:n avautuminen → veren Aβ pääsee aivoihin. Molemmat konvergoivat hippokampukseen. Ikä vahvistaa mitokondriaalisella χ:llä.",

    /* 04 Ennuste */
    prediction: "Keskeinen ennuste",
    predictionText:
      "Alzheimerin alkamisikä korreloi käänteisesti kumulatiivisen EMF-altistuksen kanssa. VGCC-salpaaja hidastaa etenemistä.",

    /* --- OSIO 2: CACNA1C --- */
    s2SectionTitle: "CACNA1C: psykiatrinen riskikanava",

    /* 05 CACNA1C */
    s5Title: "CACNA1C: yksi geeni, viisi häiriötä",
    s5Points: [
      "CACNA1C koodaa L-tyypin jänniteohjatun kalsiumkanavan Cav1.2:n α1C-alayksikköä — aivojen ensisijaista L-tyypin kanavaa.",
      "GWAS-mega-analyysi (PGC, 33 332 tapausta, 27 888 kontrollia): CACNA1C-variantit merkitsevästi yhteydessä KAIKKIIN VIITEEN suureen psykiatriseen häiriöön — ASD, ADHD, kaksisuuntainen mielialahäiriö, masennus, skitsofrenia.",
      "Timothyn oireyhtymä: G406R gain-of-function-mutaatio CACNA1C:ssä aiheuttaa autismin 80 %:n penetranssilla — korkein kaikista syndromisista muodoista. Mekanismi: liiallinen Ca²⁺-virtaus häiritsee aksonien kohdentumista selektiivisen autofagian kautta → piirimuodostuksen häiriöt (PLOS Genetics 2019).",
      "CACNA1G (T-tyyppi!) myös yhteydessä ASD:hen kahdella SNP:llä (rs757415, rs12603112). Tämä yhdistää T-tyypin kanavat — samat kuin BERM:n bifurkaatiomekanismissa — suoraan neurokehityshäiriöihin.",
      "BERM-kehyksessä: CACNA1C/CACNA1G-variantit ovat GENEETTISIÄ χ-MODULAATTOREITA. Kantajilla on muuttunut kanavan avautumiskinetiikka → erilainen χ_channel → erilainen EMF-herkkyys.",
    ],
    s5Warning:
      "Timothyn oireyhtymä on HARVINAINEN de novo -mutaatio. Sen merkitys BERM:lle on MEKANISTINEN (todistaa, että liiallinen VGCC Ca²⁺ riittää aiheuttamaan autismin) — EI epidemiologinen. ÄLÄ esitä sitä muodossa \"EMF aiheuttaa Timothyn oireyhtymän.\"",
    s5WarningLabel: "Tärkeä metodologinen huomautus",

    /* 06 Neurokehityksellinen ennuste */
    s6Title: "Neurokehityksellinen ennuste",
    s6Predictions: [
      {
        id: "NEURO-GxE-1",
        text: "CACNA1C-riskivarianttien kantajat, joiden äidit altistuivat EMF:lle raskauden aikana, osoittavat korkeampia ASD/ADHD-lukuja kuin (a) ei-kantajat samalla altistuksella tai (b) kantajat ilman prenataalista EMF-altistusta. Tämä on testattava GxE-interaktio.",
        discriminating: true,
      },
    ],

    /* --- OSIO 3: Kehitysikkunat --- */
    s3SectionTitle: "Kehitysikkunat",

    /* 07 Prenataalinen ohjelmointi */
    s7Title: "Prenataalinen ohjelmointi (EDC-kehys)",
    s7Intro:
      "Maskulinisaatio-ohjelmointiikkuna (raskausviikot 8–14) on ajanjakso jolloin sikiön androgeenit organisoivat pysyvästi lisääntymisanatomian ja aivojen seksuaalisen differentiaation. Seitsemän VGCC-riippuvaista kausaalikanavaa konvergoivat tähän kriittiseen ikkunaan:",
    s7Channels: [
      {
        name: "Sikiön Leydig Cav3 → StAR → testosteroni",
        desc: "T-tyypin kalsiumkanavat sikiön Leydigin soluissa ohjaavat StAR-välitteistä steroidogeneesiä. Häiriö vähentää sikiön testosteronia maskulinisaatio-ohjelmointiikkunan aikana.",
      },
      {
        name: "Aivojen aromataasi (CYP19) — Ca²⁺-riippuvainen",
        desc: "Aromataasi muuntaa testosteronin estradiooliksi aivojen seksuaalista differentiaatiota varten. CYP19-ekspressio on Ca²⁺-säädelty; VGCC-häiriö muuttaa paikallista T/E2-suhdetta kehittyvissä aivoissa.",
      },
      {
        name: "Aivolisäkkeen gonadotrofi Cav3 → FSH/LH",
        desc: "T-tyypin kanavat aivolisäkkeen gonadotrofeissa kontrolloivat pulsoivaa GnRH-stimuloitua FSH/LH-vapautusta. Häiriintynyt pulsatiliteetti heikentää sikiön HPG-akselia.",
      },
      {
        name: "OT/AVP-järjestelmä (VGCC-riippuvainen)",
        desc: "Oksitosiini- ja vasopressiinineuronien kehitys on VGCC-riippuvaista. Nämä neuropeptidit ovat sukupuolisesti dimorfisia ja kriittisiä sosiaaliselle kognitiolle.",
      },
      {
        name: "PFC (Cav1.2 + Cav3) → identiteetti, eksekutiiviset toiminnot",
        desc: "Prefrontaalisen aivokuoren kehitys vaatii sekä L-tyypin (Cav1.2) että T-tyypin (Cav3) kanavia neuronien migraatioon, synaptogeneesiin ja piirien kypsymiseen.",
      },
      {
        name: "Melatoniini → puberteetin ajoitus (CRY-reitti)",
        desc: "Pinealisen melatoniinisynteesin säätely on VGCC-ohjattua. Melatoniini säätelee GnRH-neuronien kypsymistä ja puberteetin alkamisen ajoitusta CRY/sirkadiaanisen reitin kautta.",
      },
      {
        name: "Insulaarinen aivokuori → interoseptio, kehon representaatio",
        desc: "Insula kartoittaa sisäisiä kehollisia tiloja. VGCC-riippuvainen interoseptiivisten piirien kehitys sikiö- ja varhaispostnataaliaikana muokkaa kehon itserepresentaatiota.",
      },
    ],
    s7Pharma: "Farmakologinen todentaminen",
    s7PharmaText:
      "Etosuksimidi (selektiivinen T-tyypin salpaaja) ja mibefradiili (T/L-tyypin salpaaja) tuottavat molemmat lisääntymis- ja kehitysvaikutuksia jotka ovat yhdenmukaisia 7-kanavamallin kanssa: häiriintynyt steroidogeneesi, muuttunut puberteetin ajoitus ja muuttuneet sukupuolisesti dimorfiset käyttäytymismallit eläinmalleissa.",
    s7PredTitle: "Prenataalisen ohjelmointimallin keskeisimmät ennusteet",
    s7Preds: [
      {
        id: "DIFF-1",
        text: "Anogenitaalinen etäisyys (AGD) korreloi käänteisesti prenataalisen EMF-altistuksen kanssa. AGD on maskulinisaatio-ohjelmointiikkunan kultastandardi-biomarkkeri — pienentynytt AGD miehillä kertoo riittämättömästä sikiön androgeenivaikutuksesta viikoilla 8–14.",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "Sentraalisen ennenaikaisen puberteetin (CPP) ilmaantuvuus kasvaa kumulatiivisen lapsuusajan EMF-altistuksen myötä. CPP on lisääntynyt 3× tyttöillä ja 2× pojilla viimeisten kahden vuosikymmenen aikana, ajallisesti rinnakkain langattoman infrastruktuurin laajenemisen kanssa.",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "Täydellinen ennusterekisteri",

    /* 08 Puberteetin kypsyminen */
    s8Title: "Puberteetin kypsyminen",
    s8p1:
      "Prefrontaalinen aivokuori käy läpi laajan VGCC-riippuvaisen synaptisen karsinnan ja myelinaation puberteetin aikana (ikä 10–25). Tämä kypsymisprosessi vaatii tarkasti ajoitettua Cav1.2- ja Cav3-aktiivisuutta ylimääräisten synapsien eliminoimiseksi samalla kun toiminnalliset piirit vahvistuvat. EMF-indusoitu Ca²⁺-dysregulaatio tämän ikkunan aikana voi muuttaa karsintasuhdetta, vaikuttaen eksekutiivisiin toimintoihin, impulssikontrolliin ja riskinarviokykyyn.",
    s8p2:
      "Sentraalinen ennenaikainen puberteetti (CPP) on lisääntynyt noin 3× tyttöillä ja 2× pojilla viimeisten kahden vuosikymmenen aikana. BERM-mekanismi tarjoaa spesifisen reitin: EMF → pinealinen VGCC → melatoniinihäiriö → ennenaikainen GnRH-aktivaatio. Tämä ennuste (DIFF-3) katsotaan nyt TODENNETUKSI epidemiologisen trenditiedon perusteella, vaikka suora kausaalinen vahvistus vaatii interventiotutkimuksia.",
    s8p3:
      "Oksitosiini/vasopressiini (OT/AVP) -järjestelmä käy läpi toisen kehitysaallon puberteetin aikana, jossa VGCC-riippuvainen reseptoriuudelleenjakautuminen muokkaa aikuisiän sosiaalista sitoutumista, parisidettä ja stressivastekuvioita. Häiriö tämän ikkunan aikana voi myötävaikuttaa havaittuun sosiaalisen ahdistuksen lisääntymiseen ja muuttuneisiin kiintymyssuhdemalleihin.",
    s8Badge: "M|C",

    /* 09 Sukupuolispesifiset vaikutukset */
    s9Title: "Sukupuolispesifiset vaikutukset",
    s9BoysTitle: "Pojat: pidempi altistusikkuna, suurempi haavoittuvuus",
    s9BoysPoints: [
      "Testosteronituotanto (Leydig Cav3 → StAR) suoraan VGCC-riippuvainen → T↓",
      "Maskulinisaatio-ohjelmointiikkunan häiriö → pienentynyt AGD, epätäydellinen genitaalien differentiaatio",
      "Hitaampi PFC-kypsyminen (valmistuu ~25 vs ~22 tyttöillä) → pidempi VGCC-riippuvaisen haavoittuvuuden ikkuna",
      "Pidempi synaptinen karsintajakso = enemmän kumulatiivista EMF-altistusta kriittisen piirimuodostuksen aikana",
    ],
    s9GirlsTitle: "Tytöt: eri reitit, aikaisempi ajoitus",
    s9GirlsPoints: [
      "Aromataasi/AFP-ohitus: aivojen feminisoituminen sisältää erillisiä Ca²⁺-riippuvaisia reittejä jotka ovat vähemmän tutkittuja kuin maskulinisaatio",
      "Aikaisempi puberteetin alkaminen (CPP 3× lisäys) → lyhentynytt lapsuuden kehitysikkuna",
      "Interoseptiivisen piirin häiriö (insulaarinen aivokuori) → muuttunut kehon itserepresentaatio ja kehollinen kognitio",
      "OT-järjestelmän häiriö voi vaikuttaa eri tavoin naispuolisiin sosiaalisiin kognitiomalleihin",
    ],
    s9VarianceTitle: "Varianssimalli",
    s9VarianceText:
      "Malli ennustaa lisääntynyttä VARIANSSIA sukupuolityypillisessä kehityksessä, ei suuntautunutta populaatiosiirtymaa. EMF-altistus laajentaa seksuaalisesti dimorfisten ominaisuuksien (AGD, sormisuhde, puberteetin ajoitus, aivojen lateralisaatio) populaatiojakaumaa siirtämättä keskiarvoa yhteen suuntaan. Jakauman ääripäissä olevat yksilöt ovat eniten alttiita.",
    s9CriticalTest:
      "DIFF-1 (AGD + prenataalinen EMF) on kriittinen erotteleva testi. Se on mekanistisesti spesifinen (Leydig Cav3 → StAR → testosteroni → AGD), käyttää vakiintunutta biomarkkeria jolla on tunnettu EDC-herkkyys, ja erottaa puhtaasti BERM-ennusteen vaihtoehtoisista hypoteeseista.",

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidenceBBB: "Evidenssi: BBB",
    predictionsPage: "Ennusterekisteri",
    earPage: "Sisäkorva (Cav1.3)",
    painPage: "Kipureitit (Cav3.2)",
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

export default async function BrainPage({
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

      {/* ═══════════════════════════════════════════════
          SECTION 1 — The Brain as EMF Target
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 01 — Channel Profile */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.cav3Subtype}</span>
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

      {/* 02 — EMF Evidence */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.emfEvidence}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.emfEvidenceText}
        </p>
      </section>

      {/* 03 — Chi Analysis */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.chiAnalysis}
        </h3>
        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.chiAnalysisText}
          </p>
        </div>
      </section>

      {/* 04 — Key Prediction */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.prediction}
        </h3>
        <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.predictionText}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — CACNA1C: The Psychiatric Risk Channel
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 05 — CACNA1C: One Gene, Five Disorders */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>

        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Points.map((point, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Timothy syndrome warning */}
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            {d.s5WarningLabel}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s5Warning}
          </p>
        </div>
      </section>

      {/* 06 — Neurodevelopmental Prediction */}
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

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Developmental Windows
          ═══════════════════════════════════════════════ */}
      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      {/* 07 — Prenatal Programming (EDC Framework) */}
      <section id="differentiation" className="mb-16 border-t editorial-rule pt-6 scroll-mt-24">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
          <span className="ml-2 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
            L*
          </span>
        </h3>

        <EDCContext locale={activeLocale} />

        <DerivedPrediction locale={activeLocale}>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">
            {d.s7Intro}
          </p>

          {/* 7 Causal Channels */}
          <div className="space-y-3 mb-8">
            {d.s7Channels.map((ch, i) => (
              <div
                key={i}
                className="border-l-4 border-accent/30 rounded-r-lg bg-background/50 p-4"
              >
                <h4 className="font-bold text-foreground text-sm leading-tight mb-1">
                  <span className="font-mono-num text-xs text-accent mr-1.5">
                    {i + 1}.
                  </span>
                  {ch.name}
                </h4>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {ch.desc}
                </p>
              </div>
            ))}
          </div>

          <SevenChannelDiagram locale={activeLocale} />

          {/* Pharmacological verification */}
          <div className="bg-card rounded-lg border border-card-border p-5 mb-6 mt-8">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s7Pharma}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7PharmaText}
            </p>
          </div>

          {/* Key predictions */}
          <h4 className="text-sm font-semibold text-foreground mb-4">
            {d.s7PredTitle}
          </h4>
          <div className="space-y-4 mb-4">
            {d.s7Preds.map((p) => (
              <div
                key={p.id}
                className="border-l-4 border-green-500 rounded-r-lg bg-background/50 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono-num text-xs font-bold text-accent">
                    {p.id}
                  </span>
                  <div className="flex gap-1.5 shrink-0">
                    {p.discriminating && (
                      <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                        {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                      </span>
                    )}
                    {p.verified && (
                      <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                        {activeLocale === "fi" ? "Todennettu" : "Verified"}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline inline-block"
          >
            {d.s7PredsLink} &rarr;
          </Link>
        </DerivedPrediction>
      </section>

      {/* 08 — Pubertal Maturation */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
          <span className="ml-2 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            {d.s8Badge}
          </span>
        </h3>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s8p1}
          </p>
          <div className="border-l-4 border-green-500 rounded-r-lg bg-card p-4">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s8p2}
            </p>
          </div>
          <p>{d.s8p3}</p>
        </div>
      </section>

      {/* 09 — Sex-Specific Effects */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">09</span>
          {d.s9Title}
          <span className="ml-2 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
            L*
          </span>
        </h3>

        <DerivedPrediction locale={activeLocale}>
          {/* Boys */}
          <h4 className="text-sm font-semibold text-foreground mb-3">
            {d.s9BoysTitle}
          </h4>
          <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
            {d.s9BoysPoints.map((point, i) => (
              <li key={i} className="pl-1 flex gap-2">
                <span className="text-accent shrink-0">*</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Girls */}
          <h4 className="text-sm font-semibold text-foreground mb-3">
            {d.s9GirlsTitle}
          </h4>
          <ul className="space-y-2 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
            {d.s9GirlsPoints.map((point, i) => (
              <li key={i} className="pl-1 flex gap-2">
                <span className="text-accent shrink-0">*</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Variance model */}
          <div className="bg-card rounded-lg border border-card-border p-5 mb-4">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s9VarianceTitle}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s9VarianceText}
            </p>
          </div>

          <VarianceModel locale={activeLocale} />

          {/* Critical test */}
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-5 mt-6">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">
              {activeLocale === "fi" ? "Kriittinen erotteleva testi" : "Critical discriminating test"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s9CriticalTest}
            </p>
          </div>
        </DerivedPrediction>
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
            href={`/${locale}/evidence/bbb`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidenceBBB} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/ear`}
            className="text-sm text-accent hover:underline"
          >
            {d.earPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/modulome/pain`}
            className="text-sm text-accent hover:underline"
          >
            {d.painPage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
