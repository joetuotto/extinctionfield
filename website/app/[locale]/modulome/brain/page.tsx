import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EDCContext } from "@/components/EDCContext";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { SevenChannelDiagram } from "@/components/SevenChannelDiagram";
import { VarianceModel } from "@/components/VarianceModel";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

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
      "[[ref:pall2022-ad|Pall 2022]]: 18 types of evidence for EMF → VGCC → Ca²⁺ → Alzheimer's. 34% brain cell death in 4 weeks of EMF exposure in rats — partially blocked by L-type blocker amlodipine (DHP, Cav1.2-selective; low T-type affinity — PMC4657039). Note: amlodipine does NOT block T-type channels — its efficacy here indicates L-type (Cav1.2) involvement alongside the dominant T-type pathway. BBB opening → amyloid entry.",

    /* 03 Chi Analysis */
    chiAnalysis: "BERM χ candidate analysis — L2 open",
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
      "[[ref:pgc-cacna1c-five-disorders|GWAS mega-analysis]] (Psychiatric Genomics Consortium, 33,332 cases, 27,888 controls): CACNA1C variants significantly associated with ALL FIVE major psychiatric disorders — ASD, ADHD, bipolar disorder, major depression, schizophrenia.",
      "[[ref:pmc6894750_timothy|Timothy syndrome]]: G406R gain-of-function mutation in CACNA1C causes autism with 80% penetrance — highest of any syndromic form. Mechanism: excessive Ca²⁺ influx disrupts axon targeting via selective autophagy → circuit formation defects (PLOS Genetics 2019).",
      "[[ref:cacna1g-asd-snps|CACNA1G (T-type!)]] also associated with ASD via two SNPs (rs757415, rs12603112). This connects T-type channels — the same ones in BERM’s bifurcation mechanism — directly to neurodevelopmental disorders.",
      "In BERM framework: CACNA1C/CACNA1G variants are GENETIC χ-MODULATORS. Carriers have altered channel gating → different χ_channel → different EMF sensitivity.",
    ],
    s5Warning:
      "[[ref:pmc6894750_timothy|Timothy syndrome]] is a RARE de novo mutation. Its significance to BERM is MECHANISTIC (proves excessive VGCC Ca²⁺ is sufficient for autism) — NOT epidemiological. Do NOT present it as \"EMF causes Timothy syndrome.\"",
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
        text: "Central precocious puberty (CPP) incidence increases with cumulative childhood EMF exposure. [[ref:denmark-cpp-3x-increase|CPP has increased 3× in girls and 2× in boys over the past two decades]], temporally paralleling wireless infrastructure expansion.",
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
      "[[ref:denmark-cpp-3x-increase|Central precocious puberty (CPP) has increased approximately 3× in girls and 2× in boys over the past two decades]]. The BERM mechanism provides a specific pathway: EMF → pineal VGCC → melatonin disruption → premature GnRH activation. This prediction (DIFF-3) is now considered VERIFIED by the epidemiological trend data, though direct causal confirmation requires intervention studies.",
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

    /* Badges */
    discriminatingBadge: "Discriminating",
    verifiedBadge: "Verified",
    criticalTestLabel: "Critical discriminating test",
    allPredictions: "All predictions →",

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
    level: "Näyttötaso",
    cav3Subtype: "Cav3.2 (aivojen korkein T-tyypin tiheys)",
    cellTypeVal: "Granuulisolut, hermoston kantasolut",
    functionVal: "Neurogeneesi, muistin konsolidaatio, oppiminen",
    levelVal: "M|C",

    /* 02 EMF-näyttö */
    emfEvidence: "EMF-näytön yhteenveto",
    emfEvidenceText:
      "[[ref:pall2022-ad|Pall 2022]]: 18 tyyppistä näyttöä EMF → VGCC → Ca²⁺ → Alzheimer -ketjulle. 34 % aivosolujen kuolema 4 viikossa EMF-altistusta rotilla — osittain estetty L-tyypin salpaajalla amlodipiinilla (DHP, Cav1.2-selektiivinen; matala T-tyypin affiniteetti — PMC4657039). Huom: amlodipiini EI salpaa T-tyypin kanavia — sen teho tässä osoittaa L-tyypin (Cav1.2) osallisuuden dominoivan T-tyypin reitin rinnalla. BBB:n avautuminen → amyloidin pääsy.",

    /* 03 Chi-analyysi */
    chiAnalysis: "BERM:n χ-ehdokasanalyysi — L2 avoin",
    chiAnalysisText:
      "Kaksoisosuma: (1) Cav3.2-bifurkaatio DG:ssä → krooninen Ca²⁺ → amyloidikaskadi. (2) BBB:n avautuminen → veren Aβ pääsee aivoihin. Molemmat yhtyvät hippokampukseen. Ikä vahvistaa mitokondriaalisella χ:llä.",

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
      "[[ref:pgc-cacna1c-five-disorders|GWAS-mega-analyysi]] (PGC, 33 332 tapausta, 27 888 kontrollia): CACNA1C-variantit merkitsevästi yhteydessä KAIKKIIN VIITEEN suureen psykiatriseen häiriöön — ASD, ADHD, kaksisuuntainen mielialahäiriö, masennus, skitsofrenia.",
      "[[ref:pmc6894750_timothy|Timothyn oireyhtymä]]: G406R gain-of-function-mutaatio CACNA1C:ssä aiheuttaa autismin 80 %:n penetranssilla — korkein kaikista syndromisista muodoista. Mekanismi: liiallinen Ca²⁺-virtaus häiritsee aksonien kohdentumista selektiivisen autofagian kautta → piirimuodostuksen häiriöt (PLOS Genetics 2019).",
      "[[ref:cacna1g-asd-snps|CACNA1G (T-tyyppi!)]] myös yhteydessä ASD:hen kahdella SNP:llä (rs757415, rs12603112). Tämä yhdistää T-tyypin kanavat — samat kuin BERM:n bifurkaatiomekanismissa — suoraan neurokehityshäiriöihin.",
      "BERM-kehyksessä: CACNA1C/CACNA1G-variantit ovat GENEETTISIÄ χ-MODULAATTOREITA. Kantajilla on muuttunut kanavan avautumiskinetiikka → erilainen χ_channel → erilainen EMF-herkkyys.",
    ],
    s5Warning:
      "[[ref:pmc6894750_timothy|Timothyn oireyhtymä]] on HARVINAINEN de novo -mutaatio. Sen merkitys BERM:lle on MEKANISTINEN (todistaa, että liiallinen VGCC Ca²⁺ riittää aiheuttamaan autismin) — EI epidemiologinen. ÄLÄ esitä sitä muodossa \"EMF aiheuttaa Timothyn oireyhtymän.\"",
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
      "Maskulinisaatio-ohjelmointiikkuna (raskausviikot 8–14) on ajanjakso jolloin sikiön androgeenit organisoivat pysyvästi lisääntymisanatomian ja aivojen seksuaalisen differentiaation. Seitsemän VGCC-riippuvaista kausaalikanavaa yhtyvät tähän kriittiseen ikkunaan:",
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
        text: "Anogenitaalinen etäisyys (AGD) korreloi käänteisesti prenataalisen EMF-altistuksen kanssa. AGD on maskulinisaatio-ohjelmointiikkunan kultastandardi-biomarkkeri — pienentynyt AGD miehillä kertoo riittämättömästä sikiön androgeenivaikutuksesta viikoilla 8–14.",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "Sentraalisen ennenaikaisen puberteetin (CPP) ilmaantuvuus kasvaa kumulatiivisen lapsuusajan EMF-altistuksen myötä. [[ref:denmark-cpp-3x-increase|CPP on lisääntynyt 3× tyttöillä ja 2× pojilla viimeisten kahden vuosikymmenen aikana]], ajallisesti rinnakkain langattoman infrastruktuurin laajenemisen kanssa.",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "Täydellinen ennusterekisteri",

    /* 08 Puberteetin kypsyminen */
    s8Title: "Puberteetin kypsyminen",
    s8p1:
      "Prefrontaalinen aivokuori käy läpi laajan VGCC-riippuvaisen synaptisen karsinnan ja myelinaation puberteetin aikana (ikä 10–25). Tämä kypsymisprosessi vaatii tarkasti ajoitettua Cav1.2- ja Cav3-aktiivisuutta ylimääräisten synapsien poissulkemiseksi samalla kun toiminnalliset piirit vahvistuvat. EMF-aiheutettu Ca²⁺-dysregulaatio tämän ikkunan aikana voi muuttaa karsintasuhdetta, vaikuttaen eksekutiivisiin toimintoihin, impulssikontrolliin ja riskinarviokykyyn.",
    s8p2:
      "[[ref:denmark-cpp-3x-increase|Sentraalinen ennenaikainen puberteetti (CPP) on lisääntynyt noin 3× tyttöillä ja 2× pojilla viimeisten kahden vuosikymmenen aikana]]. BERM-mekanismi tarjoaa tarkan reitin: EMF → pinealinen VGCC → melatoniinihäiriö → ennenaikainen GnRH-aktivaatio. Tämä ennuste (DIFF-3) katsotaan nyt TODENNETUKSI epidemiologisen trenditiedon perusteella, vaikka suora kausaalinen vahvistus vaatii interventiotutkimuksia.",
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
      "Aikaisempi puberteetin alkaminen (CPP 3× lisäys) → lyhentynyt lapsuuden kehitysikkuna",
      "Interoseptiivisen piirin häiriö (insulaarinen aivokuori) → muuttunut kehon itserepresentaatio ja kehollinen kognitio",
      "OT-järjestelmän häiriö voi vaikuttaa eri tavoin naispuolisiin sosiaalisiin kognitiomalleihin",
    ],
    s9VarianceTitle: "Varianssimalli",
    s9VarianceText:
      "Malli ennustaa lisääntynyttä VARIANSSIA sukupuolityypillisessä kehityksessä, ei suuntautunutta populaatiosiirtymaa. EMF-altistus laajentaa seksuaalisesti dimorfisten ominaisuuksien (AGD, sormisuhde, puberteetin ajoitus, aivojen lateralisaatio) populaatiojakaumaa siirtämättä keskiarvoa yhteen suuntaan. Jakauman ääripäissä olevat yksilöt ovat eniten alttiita.",
    s9CriticalTest:
      "DIFF-1 (AGD + prenataalinen EMF) on kriittinen erotteleva testi. Se on mekanistisesti tarkka (Leydig Cav3 → StAR → testosteroni → AGD), käyttää vakiintunutta biomarkkeria jolla on tunnettu EDC-herkkyys, ja erottaa puhtaasti BERM-ennusteen vaihtoehtoisista hypoteeseista.",

    /* Merkit */
    discriminatingBadge: "Erotteleva",
    verifiedBadge: "Todennettu",
    criticalTestLabel: "Kriittinen erotteleva testi",
    allPredictions: "Kaikki ennusteet →",

    /* Katso myös */
    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidenceBBB: "Näyttö: BBB",
    predictionsPage: "Ennusterekisteri",
    earPage: "Sisäkorva (Cav1.3)",
    painPage: "Kipureitit (Cav3.2)",
  },
  ja: {
    title: "脳",
    subtitle:
      "アルツハイマー病から神経発達まで：VGCCという共通経路",
    backLink: "← モジュロームに戻る",

    s1SectionTitle: "EMF標的としての脳",

    channelProfile: "チャネルプロファイル",
    channel: "チャネル",
    cellType: "細胞種",
    function: "機能",
    level: "エビデンスレベル",
    cav3Subtype: "Cav3.2（脳内T型チャネル密度最高）",
    cellTypeVal: "顆粒細胞、神経前駆細胞",
    functionVal: "神経新生、記憶固定、学習",
    levelVal: "M|C",

    emfEvidence: "EMFエビデンスの要約",
    emfEvidenceText:
      "[[ref:pall2022-ad|Pall 2022]]：EMF → VGCC → Ca²⁺ → アルツハイマー病の連鎖を示す18種類のエビデンス。ラットにおける4週間のEMF曝露で34%の脳細胞死——L型チャネル遮断薬amlodipine（DHP、Cav1.2選択的；T型親和性低）で部分的に阻止。注：amlodipineはT型チャネルを遮断しない——ここでの有効性は、優位なT型経路と並行するL型（Cav1.2）の関与を示す。BBB開放 → アミロイド流入。",

    chiAnalysis: "BERM χ候補解析 — L2未解決",
    chiAnalysisText:
      "二重打撃：(1) DGにおけるCav3.2分岐 → 慢性Ca²⁺ → アミロイドカスケード。(2) BBB開放 → 血中Aβが脳に侵入。両者は海馬に収束する。加齢がミトコンドリアχを通じて増幅。",

    prediction: "主要予測",
    predictionText:
      "アルツハイマー病の発症年齢は累積EMF曝露と逆相関する。VGCC遮断薬は進行を遅延させる。",

    s2SectionTitle: "CACNA1C：精神科リスクチャネル",

    s5Title: "CACNA1C：1つの遺伝子、5つの障害",
    s5Points: [
      "CACNA1Cは脳の主要L型チャネルであるCav1.2のα1Cサブユニットをコードする。",
      "[[ref:pgc-cacna1c-five-disorders|GWASメガ解析]]（PGC、33,332症例、27,888対照）：CACNA1C変異は5大精神疾患すべて——ASD、ADHD、双極性障害、大うつ病、統合失調症——と有意に関連。",
      "[[ref:pmc6894750_timothy|Timothy症候群]]：CACNA1CのG406R機能獲得変異は80%の浸透率で自閉症を引き起こす——症候群型で最高。メカニズム：過剰なCa²⁺流入が選択的オートファジーを介して軸索標的化を障害 → 回路形成の欠陥（PLOS Genetics 2019）。",
      "[[ref:cacna1g-asd-snps|CACNA1G（T型！）]]もASDと2つのSNP（rs757415、rs12603112）で関連。これはBERMの分岐メカニズムと同じT型チャネルを神経発達障害に直接結びつける。",
      "BERMフレームワークにおいて：CACNA1C/CACNA1G変異は遺伝的χモジュレーターである。保有者はチャネルゲーティングが変化 → χ_channelが異なる → EMF感受性が異なる。",
    ],
    s5Warning:
      "[[ref:pmc6894750_timothy|Timothy症候群]]は稀なde novo変異である。BERMにとっての意義はメカニズム的（過剰なVGCC Ca²⁺が自閉症に十分であることの証明）であり、疫学的ではない。「EMFがTimothy症候群を引き起こす」と提示してはならない。",
    s5WarningLabel: "重要な方法論的注記",

    s6Title: "神経発達に関する予測",
    s6Predictions: [
      {
        id: "NEURO-GxE-1",
        text: "妊娠中に高EMF曝露を受けた母親のCACNA1Cリスク変異保有者は、(a) 同等曝露の非保有者、(b) 出生前EMF曝露のない保有者よりも高いASD/ADHD率を示す。これは検証可能なGxE相互作用である。",
        discriminating: true,
      },
    ],

    s3SectionTitle: "発達ウィンドウ",

    s7Title: "出生前プログラミング（EDCフレームワーク）",
    s7Intro:
      "男性化プログラミングウィンドウ（妊娠8〜14週）は胎児アンドロゲンが生殖器の解剖学的構造と脳の性分化を永続的に組織化する時期である。7つのVGCC依存的因果チャネルがこの臨界ウィンドウに収束する：",
    s7Channels: [
      {
        name: "胎児Leydig Cav3 → StAR → テストステロン",
        desc: "胎児Leydig細胞のT型カルシウムチャネルがStAR媒介ステロイド産生を駆動する。障害は男性化プログラミングウィンドウ中の胎児テストステロンを減少させる。",
      },
      {
        name: "脳アロマターゼ（CYP19）——Ca²⁺依存性",
        desc: "アロマターゼは脳の性分化のためにテストステロンをエストラジオールに変換する。CYP19発現はCa²⁺制御性；VGCC障害は発達中の脳における局所T/E2比を変化させる。",
      },
      {
        name: "下垂体ゴナドトロフ Cav3 → FSH/LH",
        desc: "下垂体ゴナドトロフのT型チャネルが拍動性GnRH刺激FSH/LH放出を制御する。拍動性の障害は胎児HPG軸を損なう。",
      },
      {
        name: "OT/AVPシステム（VGCC依存性）",
        desc: "オキシトシンおよびバソプレシン神経の発達はVGCC依存性である。これらの神経ペプチドは性的二型性であり社会的認知に不可欠である。",
      },
      {
        name: "PFC（Cav1.2 + Cav3）→ アイデンティティ、実行機能",
        desc: "前頭前皮質の発達には神経細胞移動、シナプス形成、回路成熟のためにL型（Cav1.2）とT型（Cav3）の両チャネルが必要である。",
      },
      {
        name: "メラトニン → 思春期タイミング（CRY経路）",
        desc: "松果体メラトニン合成はVGCC制御性である。メラトニンはCRY/概日経路を介してGnRH神経の成熟と思春期開始タイミングを制御する。",
      },
      {
        name: "島皮質 → 内受容感覚、身体表象",
        desc: "島皮質は内部の身体状態をマッピングする。胎児期および出生後早期のVGCC依存的内受容回路発達が身体自己表象を形成する。",
      },
    ],
    s7Pharma: "薬理学的検証",
    s7PharmaText:
      "エトスクシミド（選択的T型遮断薬）およびmibefradil（T/L型遮断薬）はともに7チャネルモデルと一致する生殖・発達効果を示す：ステロイド産生障害、思春期タイミングの変化、動物モデルにおける性的二型行動の変容。",
    s7PredTitle: "出生前プログラミングモデルの主要予測",
    s7Preds: [
      {
        id: "DIFF-1",
        text: "肛門性器間距離（AGD）は出生前EMF曝露と逆相関する。AGDは男性化プログラミングウィンドウのゴールドスタンダード・バイオマーカーであり——男性のAGD減少は8〜14週における胎児アンドロゲン作用の不足を示す。",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "中枢性思春期早発症（CPP）の発症率は小児期の累積EMF曝露とともに増加する。[[ref:denmark-cpp-3x-increase|CPPは過去20年間で女児で3倍、男児で2倍に増加しており]]、無線インフラの拡大と時間的に平行している。",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "予測レジスター全文",

    s8Title: "思春期の成熟",
    s8p1:
      "前頭前皮質は思春期（10〜25歳）に広範なVGCC依存的シナプス刈り込みと髄鞘形成を経る。この成熟プロセスには、過剰なシナプスを除去しつつ機能的回路を強化するための正確なタイミングのCav1.2およびCav3活動が必要である。このウィンドウ中のEMF誘導Ca²⁺調節異常は刈り込み比率を変化させ、実行機能、衝動制御、リスク評価に影響しうる。",
    s8p2:
      "[[ref:denmark-cpp-3x-increase|中枢性思春期早発症（CPP）は過去20年間で女児で約3倍、男児で2倍に増加した]]。BERMメカニズムは特異的経路を提供する：EMF → 松果体VGCC → メラトニン障害 → 早期GnRH活性化。この予測（DIFF-3）は疫学的トレンドデータにより検証済みとされるが、直接的因果確認には介入研究が必要である。",
    s8p3:
      "オキシトシン/バソプレシン（OT/AVP）システムは思春期に第二の発達波を経験し、VGCC依存的受容体再分布が成人期の社会的結合、ペアボンド、ストレス応答パターンを形成する。このウィンドウ中の障害は、観察される社会不安の増加と変化した愛着パターンに寄与しうる。",
    s8Badge: "M|C",

    s9Title: "性差による効果",
    s9BoysTitle: "男児：より長い曝露期間、より大きい脆弱性",
    s9BoysPoints: [
      "テストステロン産生（Leydig Cav3 → StAR）は直接VGCC依存 → T↓",
      "男性化プログラミングウィンドウの障害 → AGD減少、不完全な性器分化",
      "PFC成熟が遅い（女児の約22歳に対し約25歳で完了）→ VGCC依存的脆弱性ウィンドウが長い",
      "延長されたシナプス刈り込み期間 = 臨界回路形成期間中のEMF累積曝露が多い",
    ],
    s9GirlsTitle: "女児：異なる経路、より早いタイミング",
    s9GirlsPoints: [
      "アロマターゼ/AFPバイパス：脳の女性化には男性化よりも研究が少ないCa²⁺依存経路が関与",
      "思春期開始が早い（CPP 3倍増加）→ 小児発達ウィンドウが短縮",
      "内受容回路障害（島皮質）→ 身体自己表象と身体化認知の変容",
      "OTシステム障害は女性型社会認知パターンに差異的に影響しうる",
    ],
    s9VarianceTitle: "分散モデル",
    s9VarianceText:
      "モデルは性別典型的発達における分散の増大を予測し、方向的な集団シフトではない。EMF曝露は性的二型形質（AGD、指比、思春期タイミング、脳の側方性）の集団分布を拡大させるが、平均値を一方向に動かさない。分布の両端にある個人が最も影響を受ける。",
    s9CriticalTest:
      "DIFF-1（AGD + 出生前EMF）は決定的な識別テストである。メカニズム的に特異的（Leydig Cav3 → StAR → テストステロン → AGD）であり、EDC感受性が既知の確立されたバイオマーカーを使用し、BERM予測を代替仮説からきれいに分離する。",

    discriminatingBadge: "識別的",
    verifiedBadge: "検証済み",
    criticalTestLabel: "決定的識別テスト",
    allPredictions: "すべての予測 →",

    seeAlso: "関連ページ",
    modulomeOverview: "モジュローム概要",
    evidenceBBB: "エビデンス：BBB",
    predictionsPage: "予測レジスター",
    earPage: "内耳（Cav1.3）",
    painPage: "疼痛経路（Cav3.2）",
  },
  fr: {
    title: "Cerveau",
    subtitle:
      "De la maladie d'Alzheimer au neurodeveloppement : VGCC comme fil conducteur",
    backLink: "← Retour au modulome",

    s1SectionTitle: "Le cerveau comme cible des CEM",

    channelProfile: "Profil du canal",
    channel: "Canal",
    cellType: "Type cellulaire",
    function: "Fonction",
    level: "Niveau de preuve",
    cav3Subtype: "Cav3.2 (densite T-type la plus elevee dans le cerveau)",
    cellTypeVal: "Cellules granulaires, progeniteurs neuronaux",
    functionVal: "Neurogenese, consolidation de la memoire, apprentissage",
    levelVal: "M|C",

    emfEvidence: "Resume des preuves CEM",
    emfEvidenceText:
      "[[ref:pall2022-ad|Pall 2022]] : 18 types de preuves pour la chaine CEM → VGCC → Ca²⁺ → Alzheimer. 34 % de mort cellulaire cerebrale en 4 semaines d'exposition CEM chez le rat — partiellement bloquee par le bloqueur L-type amlodipine (DHP, selectif Cav1.2 ; faible affinite T-type). Note : l'amlodipine ne bloque PAS les canaux T-type — son efficacite ici indique l'implication du type L (Cav1.2) en parallele de la voie T-type dominante. Ouverture de la BHE → entree d'amyloide.",

    chiAnalysis: "Analyse candidate χ de BERM — L2 ouvert",
    chiAnalysisText:
      "Double impact : (1) Bifurcation de Cav3.2 dans le DG → Ca²⁺ chronique → cascade amyloide. (2) Ouverture de la BHE → l'Aβ sanguin entre dans le cerveau. Les deux convergent vers l'hippocampe. L'age amplifie via le χ mitochondrial.",

    prediction: "Prediction cle",
    predictionText:
      "L'age de debut de la maladie d'Alzheimer est inversement correle avec l'exposition cumulee aux CEM. Un bloqueur VGCC ralentit la progression.",

    s2SectionTitle: "CACNA1C : le canal a risque psychiatrique",

    s5Title: "CACNA1C : un gene, cinq troubles",
    s5Points: [
      "CACNA1C code la sous-unite α1C du canal calcique L-type Cav1.2 — le principal canal L-type du cerveau.",
      "[[ref:pgc-cacna1c-five-disorders|Mega-analyse GWAS]] (PGC, 33 332 cas, 27 888 temoins) : les variants CACNA1C sont significativement associes aux CINQ troubles psychiatriques majeurs — TSA, TDAH, trouble bipolaire, depression majeure, schizophrenie.",
      "[[ref:pmc6894750_timothy|Syndrome de Timothy]] : la mutation gain-de-fonction G406R dans CACNA1C cause l'autisme avec une penetrance de 80 % — la plus elevee de toutes les formes syndromiques. Mecanisme : l'influx excessif de Ca²⁺ perturbe le ciblage axonal par autophagie selective → defauts de formation des circuits (PLOS Genetics 2019).",
      "[[ref:cacna1g-asd-snps|CACNA1G (T-type !)]] est egalement associe aux TSA via deux SNPs (rs757415, rs12603112). Cela relie les canaux T-type — les memes que dans le mecanisme de bifurcation BERM — directement aux troubles neurodeveloppementaux.",
      "Dans le cadre BERM : les variants CACNA1C/CACNA1G sont des MODULATEURS χ GENETIQUES. Les porteurs ont une cinetique d'ouverture des canaux alteree → χ_channel different → sensibilite CEM differente.",
    ],
    s5Warning:
      "[[ref:pmc6894750_timothy|Le syndrome de Timothy]] est une mutation de novo RARE. Sa signification pour BERM est MECANISTIQUE (prouve que l'exces de Ca²⁺ via VGCC suffit a causer l'autisme) — PAS epidemiologique. Ne PAS le presenter comme « les CEM causent le syndrome de Timothy ».",
    s5WarningLabel: "Note methodologique importante",

    s6Title: "Prediction neurodeveloppementale",
    s6Predictions: [
      {
        id: "NEURO-GxE-1",
        text: "Les porteurs du variant a risque CACNA1C dont les meres ont eu une forte exposition CEM pendant la grossesse montrent des taux de TSA/TDAH plus eleves que (a) les non-porteurs avec la meme exposition ou (b) les porteurs sans exposition CEM prenatale. Il s'agit d'une interaction GxE testable.",
        discriminating: true,
      },
    ],

    s3SectionTitle: "Fenetres developpementales",

    s7Title: "Programmation prenatale (cadre PE)",
    s7Intro:
      "La fenetre de programmation de la masculinisation (semaines de gestation 8–14) est la periode ou les androgenes foetaux organisent de facon permanente l'anatomie reproductive et la differenciation sexuelle du cerveau. Sept canaux causaux dependants des VGCC convergent vers cette fenetre critique :",
    s7Channels: [
      {
        name: "Leydig foetal Cav3 → StAR → testosterone",
        desc: "Les canaux calciques T-type des cellules de Leydig foetales entrainent la steroidogenese mediee par StAR. La perturbation reduit la testosterone foetale pendant la fenetre de programmation de la masculinisation.",
      },
      {
        name: "Aromatase cerebrale (CYP19) — dependante du Ca²⁺",
        desc: "L'aromatase convertit la testosterone en estradiol pour la differenciation sexuelle du cerveau. L'expression de CYP19 est regulee par le Ca²⁺ ; la perturbation VGCC altere le rapport T/E2 local dans le cerveau en developpement.",
      },
      {
        name: "Gonadotrophe hypophysaire Cav3 → FSH/LH",
        desc: "Les canaux T-type des gonadotrophes hypophysaires controlent la liberation pulsatile de FSH/LH stimulee par la GnRH. La perturbation de la pulsatilite compromet l'axe HPG foetal.",
      },
      {
        name: "Systeme OT/AVP (dependant des VGCC)",
        desc: "Le developpement des neurones a ocytocine et vasopressine est dependant des VGCC. Ces neuropeptides sont sexuellement dimorphiques et essentiels a la cognition sociale.",
      },
      {
        name: "CPF (Cav1.2 + Cav3) → identite, fonctions executives",
        desc: "Le developpement du cortex prefrontal necessite a la fois les canaux L-type (Cav1.2) et T-type (Cav3) pour la migration neuronale, la synaptogenese et la maturation des circuits.",
      },
      {
        name: "Melatonine → calendrier pubertaire (voie CRY)",
        desc: "La synthese de melatonine pineale est controlee par les VGCC. La melatonine regule la maturation des neurones GnRH et le calendrier de debut de la puberte via la voie CRY/circadienne.",
      },
      {
        name: "Cortex insulaire → interoception, representation corporelle",
        desc: "L'insula cartographie les etats corporels internes. Le developpement des circuits interoceptifs dependant des VGCC pendant la vie foetale et postnatale precoce facon la representation de soi corporelle.",
      },
    ],
    s7Pharma: "Verification pharmacologique",
    s7PharmaText:
      "L'ethosuximide (bloqueur T-type selectif) et le mibefradil (bloqueur T/L-type) produisent tous deux des effets reproductifs et developpementaux coherents avec le modele a 7 canaux : steroidogenese perturbee, calendrier pubertaire altere et comportements sexuellement dimorphiques modifies dans les modeles animaux.",
    s7PredTitle: "Predictions cles du modele de programmation prenatale",
    s7Preds: [
      {
        id: "DIFF-1",
        text: "La distance anogenitale (DAG) est inversement correlee a l'exposition prenatale aux CEM. La DAG est le biomarqueur de reference de la fenetre de programmation de la masculinisation — une DAG reduite chez les males indique une action androgenique foetale insuffisante pendant les semaines 8–14.",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "L'incidence de la puberte precoce centrale (PPC) augmente avec l'exposition cumulee aux CEM pendant l'enfance. [[ref:denmark-cpp-3x-increase|La PPC a augmente d'un facteur 3 chez les filles et 2 chez les garcons au cours des deux dernieres decennies]], en parallele temporel avec l'expansion de l'infrastructure sans fil.",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "Registre complet des predictions",

    s8Title: "Maturation pubertaire",
    s8p1:
      "Le cortex prefrontal subit un elagage synaptique et une myelinisation extensifs dependants des VGCC pendant la puberte (ages 10–25). Ce processus de maturation necessite une activite Cav1.2 et Cav3 precisement chronometree pour eliminer les synapses excessives tout en renforçant les circuits fonctionnels. La dysregulation du Ca²⁺ induite par les CEM pendant cette fenetre pourrait alterer le ratio d'elagage, affectant les fonctions executives, le controle des impulsions et l'evaluation des risques.",
    s8p2:
      "[[ref:denmark-cpp-3x-increase|La puberte precoce centrale (PPC) a augmente d'environ 3× chez les filles et 2× chez les garcons au cours des deux dernieres decennies]]. Le mecanisme BERM fournit une voie specifique : CEM → VGCC pineal → perturbation de la melatonine → activation prematuree de la GnRH. Cette prediction (DIFF-3) est desormais consideree comme VERIFIEE par les donnees de tendance epidemiologique, bien que la confirmation causale directe necessite des etudes d'intervention.",
    s8p3:
      "Le systeme ocytocine/vasopressine (OT/AVP) connait une deuxieme vague developpementale pendant la puberte, avec une redistribution des recepteurs dependante des VGCC qui façonne les schemas de lien social, de lien de couple et de reponse au stress a l'age adulte. La perturbation pendant cette fenetre pourrait contribuer a l'augmentation observee de l'anxiete sociale et aux schemas d'attachement modifies.",
    s8Badge: "M|C",

    s9Title: "Effets specifiques au sexe",
    s9BoysTitle: "Garcons : exposition plus longue, vulnerabilite accrue",
    s9BoysPoints: [
      "Production de testosterone (Leydig Cav3 → StAR) directement dependante des VGCC → T↓",
      "Perturbation de la fenetre de programmation de la masculinisation → DAG reduite, differenciation genitale incomplete",
      "Maturation du CPF plus lente (achevee ~25 vs ~22 chez les filles) → fenetre de vulnerabilite dependante des VGCC plus longue",
      "Periode d'elagage synaptique prolongee = plus d'exposition CEM cumulee pendant la formation critique des circuits",
    ],
    s9GirlsTitle: "Filles : voies differentes, calendrier plus precoce",
    s9GirlsPoints: [
      "Contournement aromatase/AFP : la feminisation cerebrale implique des voies dependantes du Ca²⁺ distinctes moins etudiees que la masculinisation",
      "Debut de puberte plus precoce (PPC augmentation 3×) → fenetre de developpement de l'enfance tronquee",
      "Perturbation du circuit interoceptif (cortex insulaire) → representation corporelle de soi et cognition incarnee alterees",
      "La perturbation du systeme OT pourrait affecter differentiellement les schemas de cognition sociale typiquement feminins",
    ],
    s9VarianceTitle: "Modele de variance",
    s9VarianceText:
      "Le modele predit une VARIANCE accrue dans le developpement typique du sexe, et non un deplacement directionnel de la population. L'exposition aux CEM elargit la distribution de population des traits sexuellement dimorphiques (DAG, rapport digital, calendrier pubertaire, lateralisation cerebrale) sans deplacer la moyenne dans une seule direction. Les individus aux extremites de la distribution sont les plus affectes.",
    s9CriticalTest:
      "DIFF-1 (DAG + CEM prenatal) est le test discriminant critique. Il est mecanistiquement specifique (Leydig Cav3 → StAR → testosterone → DAG), utilise un biomarqueur etabli avec une sensibilite aux PE connue, et separe nettement la prediction BERM des hypotheses alternatives.",

    discriminatingBadge: "Discriminant",
    verifiedBadge: "Verifie",
    criticalTestLabel: "Test discriminant critique",
    allPredictions: "Toutes les predictions →",

    seeAlso: "Voir aussi",
    modulomeOverview: "Apercu du modulome",
    evidenceBBB: "Preuves : BHE",
    predictionsPage: "Registre des predictions",
    earPage: "Oreille interne (Cav1.3)",
    painPage: "Voies de la douleur (Cav3.2)",
  },
  ko: {
    title: "뇌",
    subtitle:
      "알츠하이머병에서 신경발달까지: VGCC라는 공통 경로",
    backLink: "← 모듈롬으로 돌아가기",

    s1SectionTitle: "EMF 표적으로서의 뇌",

    channelProfile: "채널 프로파일",
    channel: "채널",
    cellType: "세포 유형",
    function: "기능",
    level: "근거 수준",
    cav3Subtype: "Cav3.2 (뇌 내 T형 채널 밀도 최고)",
    cellTypeVal: "과립 세포, 신경 전구 세포",
    functionVal: "신경 발생, 기억 고정, 학습",
    levelVal: "M|C",

    emfEvidence: "EMF 근거 요약",
    emfEvidenceText:
      "[[ref:pall2022-ad|Pall 2022]]: EMF → VGCC → Ca²⁺ → 알츠하이머병 연쇄에 대한 18가지 유형의 근거. 쥐에서 4주간 EMF 노출 시 34% 뇌세포 사멸 — L형 차단제 amlodipine(DHP, Cav1.2 선택적; 낮은 T형 친화성)으로 부분 차단. 주의: amlodipine은 T형 채널을 차단하지 않음 — 여기서의 효능은 지배적 T형 경로와 병행하는 L형(Cav1.2) 관여를 시사. BBB 개방 → 아밀로이드 유입.",

    chiAnalysis: "BERM χ 후보 분석 — L2 미해결",
    chiAnalysisText:
      "이중 타격: (1) DG에서 Cav3.2 분기 → 만성 Ca²⁺ → 아밀로이드 캐스케이드. (2) BBB 개방 → 혈중 Aβ가 뇌로 침입. 둘 다 해마에 수렴. 노화가 미토콘드리아 χ를 통해 증폭.",

    prediction: "핵심 예측",
    predictionText:
      "알츠하이머병 발병 연령은 누적 EMF 노출과 역상관한다. VGCC 차단제는 진행을 지연시킨다.",

    s2SectionTitle: "CACNA1C: 정신과적 위험 채널",

    s5Title: "CACNA1C: 하나의 유전자, 다섯 가지 장애",
    s5Points: [
      "CACNA1C는 뇌의 주요 L형 채널인 Cav1.2의 α1C 서브유닛을 코딩한다.",
      "[[ref:pgc-cacna1c-five-disorders|GWAS 메가분석]](PGC, 33,332건, 27,888 대조군): CACNA1C 변이는 5대 정신질환 모두 — ASD, ADHD, 양극성 장애, 주요 우울증, 조현병 — 와 유의하게 연관.",
      "[[ref:pmc6894750_timothy|Timothy 증후군]]: CACNA1C의 G406R 기능 획득 돌연변이는 80% 침투율로 자폐증 유발 — 증후군형 중 최고. 메커니즘: 과도한 Ca²⁺ 유입이 선택적 자가포식을 통해 축삭 표적화를 교란 → 회로 형성 결함(PLOS Genetics 2019).",
      "[[ref:cacna1g-asd-snps|CACNA1G(T형!)]]도 두 SNP(rs757415, rs12603112)를 통해 ASD와 연관. 이는 BERM의 분기 메커니즘과 동일한 T형 채널을 신경발달 장애에 직접 연결한다.",
      "BERM 프레임워크에서: CACNA1C/CACNA1G 변이는 유전적 χ 조절인자이다. 보유자는 채널 게이팅이 변경 → χ_channel이 다름 → EMF 감수성이 다름.",
    ],
    s5Warning:
      "[[ref:pmc6894750_timothy|Timothy 증후군]]은 희귀한 de novo 돌연변이다. BERM에 대한 의의는 메커니즘적(과도한 VGCC Ca²⁺가 자폐증에 충분함을 증명)이며, 역학적이 아니다. 'EMF가 Timothy 증후군을 유발한다'고 제시하지 말 것.",
    s5WarningLabel: "중요한 방법론적 참고",

    s6Title: "신경발달 예측",
    s6Predictions: [
      {
        id: "NEURO-GxE-1",
        text: "임신 중 높은 EMF 노출을 경험한 어머니의 CACNA1C 위험 변이 보유자는 (a) 동일 노출의 비보유자 또는 (b) 산전 EMF 노출이 없는 보유자보다 더 높은 ASD/ADHD 비율을 보인다. 이는 검증 가능한 GxE 상호작용이다.",
        discriminating: true,
      },
    ],

    s3SectionTitle: "발달 창",

    s7Title: "산전 프로그래밍(EDC 프레임워크)",
    s7Intro:
      "남성화 프로그래밍 창(임신 8~14주)은 태아 안드로겐이 생식기 해부학과 뇌의 성 분화를 영구적으로 조직하는 시기이다. 7개의 VGCC 의존적 인과 채널이 이 임계 창에 수렴한다:",
    s7Channels: [
      {
        name: "태아 Leydig Cav3 → StAR → 테스토스테론",
        desc: "태아 Leydig 세포의 T형 칼슘 채널이 StAR 매개 스테로이드 생성을 구동한다. 장애는 남성화 프로그래밍 창 동안 태아 테스토스테론을 감소시킨다.",
      },
      {
        name: "뇌 아로마타제(CYP19) — Ca²⁺ 의존성",
        desc: "아로마타제는 뇌 성 분화를 위해 테스토스테론을 에스트라디올로 전환한다. CYP19 발현은 Ca²⁺ 조절성; VGCC 장애는 발달 중인 뇌의 국소 T/E2 비율을 변화시킨다.",
      },
      {
        name: "뇌하수체 성선자극세포 Cav3 → FSH/LH",
        desc: "뇌하수체 성선자극세포의 T형 채널이 GnRH 자극에 의한 박동성 FSH/LH 분비를 조절한다. 박동성 장애는 태아 HPG 축을 손상시킨다.",
      },
      {
        name: "OT/AVP 시스템(VGCC 의존성)",
        desc: "옥시토신 및 바소프레신 신경의 발달은 VGCC 의존적이다. 이들 신경펩타이드는 성적 이형성이며 사회적 인지에 필수적이다.",
      },
      {
        name: "PFC(Cav1.2 + Cav3) → 정체성, 실행 기능",
        desc: "전두전피질 발달에는 신경 세포 이동, 시냅스 형성, 회로 성숙을 위해 L형(Cav1.2)과 T형(Cav3) 두 채널이 모두 필요하다.",
      },
      {
        name: "멜라토닌 → 사춘기 시기(CRY 경로)",
        desc: "송과체 멜라토닌 합성은 VGCC 제어성이다. 멜라토닌은 CRY/일주기 경로를 통해 GnRH 신경 성숙과 사춘기 시작 시기를 조절한다.",
      },
      {
        name: "도피질 → 내수용 감각, 신체 표상",
        desc: "도피질은 내부 신체 상태를 매핑한다. 태아기 및 초기 출생 후의 VGCC 의존적 내수용 회로 발달이 신체 자기 표상을 형성한다.",
      },
    ],
    s7Pharma: "약리학적 검증",
    s7PharmaText:
      "에토숙시미드(선택적 T형 차단제)와 mibefradil(T/L형 차단제)은 7채널 모델과 일치하는 생식 및 발달 효과를 보인다: 스테로이드 생성 장애, 사춘기 시기 변경, 동물 모델에서 성적 이형 행동의 변화.",
    s7PredTitle: "산전 프로그래밍 모델의 핵심 예측",
    s7Preds: [
      {
        id: "DIFF-1",
        text: "항문생식기 거리(AGD)는 산전 EMF 노출과 역상관한다. AGD는 남성화 프로그래밍 창의 골드스탠다드 바이오마커이며 — 남성의 AGD 감소는 8~14주 동안 태아 안드로겐 작용 부족을 나타낸다.",
        discriminating: true,
        verified: false,
      },
      {
        id: "DIFF-3",
        text: "중추성 성조숙증(CPP) 발생률은 소아기 누적 EMF 노출과 함께 증가한다. [[ref:denmark-cpp-3x-increase|CPP는 지난 20년간 여아에서 3배, 남아에서 2배 증가했으며]], 무선 인프라 확장과 시간적으로 병행한다.",
        discriminating: false,
        verified: true,
      },
    ],
    s7PredsLink: "전체 예측 레지스터",

    s8Title: "사춘기 성숙",
    s8p1:
      "전두전피질은 사춘기(10~25세) 동안 광범위한 VGCC 의존적 시냅스 가지치기와 수초화를 거친다. 이 성숙 과정에는 과잉 시냅스를 제거하면서 기능적 회로를 강화하기 위한 정확한 타이밍의 Cav1.2 및 Cav3 활동이 필요하다. 이 기간 동안의 EMF 유도 Ca²⁺ 조절 이상은 가지치기 비율을 변경하여 실행 기능, 충동 조절, 위험 평가에 영향을 미칠 수 있다.",
    s8p2:
      "[[ref:denmark-cpp-3x-increase|중추성 성조숙증(CPP)은 지난 20년간 여아에서 약 3배, 남아에서 2배 증가했다]]. BERM 메커니즘은 특이적 경로를 제공한다: EMF → 송과체 VGCC → 멜라토닌 장애 → 조기 GnRH 활성화. 이 예측(DIFF-3)은 역학적 추세 데이터에 의해 검증된 것으로 간주되지만, 직접적 인과 확인에는 개입 연구가 필요하다.",
    s8p3:
      "옥시토신/바소프레신(OT/AVP) 시스템은 사춘기 동안 두 번째 발달파를 경험하며, VGCC 의존적 수용체 재분포가 성인기의 사회적 유대, 짝 유대, 스트레스 반응 패턴을 형성한다. 이 기간의 장애는 관찰되는 사회불안 증가와 변화된 애착 패턴에 기여할 수 있다.",
    s8Badge: "M|C",

    s9Title: "성별 특이적 효과",
    s9BoysTitle: "남아: 더 긴 노출 기간, 더 큰 취약성",
    s9BoysPoints: [
      "테스토스테론 생산(Leydig Cav3 → StAR)은 직접 VGCC 의존 → T↓",
      "남성화 프로그래밍 창 장애 → AGD 감소, 불완전한 생식기 분화",
      "PFC 성숙이 느림(여아 약 22세 대비 약 25세 완료) → VGCC 의존적 취약성 창이 더 김",
      "연장된 시냅스 가지치기 기간 = 임계 회로 형성 기간 동안 누적 EMF 노출이 더 많음",
    ],
    s9GirlsTitle: "여아: 다른 경로, 더 이른 시기",
    s9GirlsPoints: [
      "아로마타제/AFP 우회: 뇌 여성화는 남성화보다 덜 연구된 별도의 Ca²⁺ 의존 경로를 포함",
      "사춘기 시작이 더 이름(CPP 3배 증가) → 유아기 발달 창 단축",
      "내수용 회로 장애(도피질) → 변화된 신체 자기 표상 및 체화 인지",
      "OT 시스템 장애는 여성형 사회 인지 패턴에 차별적으로 영향을 미칠 수 있음",
    ],
    s9VarianceTitle: "분산 모델",
    s9VarianceText:
      "모델은 성별 전형적 발달의 분산 증가를 예측하며, 방향적 집단 이동이 아니다. EMF 노출은 성적 이형 형질(AGD, 손가락 비율, 사춘기 시기, 뇌 측성화)의 집단 분포를 확대시키되 평균을 한 방향으로 이동시키지 않는다. 분포 양 극단의 개인이 가장 큰 영향을 받는다.",
    s9CriticalTest:
      "DIFF-1(AGD + 산전 EMF)은 결정적 식별 테스트이다. 메커니즘적으로 특이적(Leydig Cav3 → StAR → 테스토스테론 → AGD)이며, EDC 감수성이 알려진 확립된 바이오마커를 사용하고, BERM 예측을 대안 가설로부터 깔끔하게 분리한다.",

    discriminatingBadge: "식별적",
    verifiedBadge: "검증됨",
    criticalTestLabel: "결정적 식별 테스트",
    allPredictions: "모든 예측 →",

    seeAlso: "관련 페이지",
    modulomeOverview: "모듈롬 개요",
    evidenceBBB: "근거: BBB",
    predictionsPage: "예측 레지스터",
    earPage: "내이(Cav1.3)",
    painPage: "통증 경로(Cav3.2)",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
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
  const d = pickCopy(COPY, locale);

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
          <InlineReferenceText text={d.emfEvidenceText} locale={locale} />
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
              <span><InlineReferenceText text={point} locale={locale} /></span>
            </li>
          ))}
        </ul>

        {/* Timothy syndrome warning */}
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            {d.s5WarningLabel}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            <InlineReferenceText text={d.s5Warning} locale={locale} />
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
                    {d.discriminatingBadge}
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
                {d.allPredictions}
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

        <EDCContext locale={locale} />

        <DerivedPrediction locale={locale}>
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

          <SevenChannelDiagram locale={locale} />

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
                        {d.discriminatingBadge}
                      </span>
                    )}
                    {p.verified && (
                      <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                        {d.verifiedBadge}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  <InlineReferenceText text={p.text} locale={locale} />
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
              <InlineReferenceText text={d.s8p2} locale={locale} />
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

        <DerivedPrediction locale={locale}>
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

          <VarianceModel locale={locale} />

          {/* Critical test */}
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-5 mt-6">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">
              {d.criticalTestLabel}
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
