import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Heart } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Pathopege",
    subtitle: "The Source",
    heroLead:
      "Every consequence — the broken families, the political pathology, the falling empires — traces back to a single mechanism. This page describes it.",
    heroTrail:
      "EMF activates voltage-gated calcium channels. Calcium floods the cell. Downstream cascades alter hormones, neurotransmitters, and reproductive biology in both sexes simultaneously. What follows is the root cause of everything described on the civilization pages.",

    s2title: "Two Parallel Disruptions",
    s2lead:
      "EMF → VGCC → Ca²⁺ is the same mechanism in both sexes. But because the endocrine systems differ, the downstream consequences are sex-specific — and complementary.",
    s2glossary: "VGCC: voltage-gated calcium channels — ion channels in cell membranes that open in response to voltage changes, allowing Ca²⁺ influx. Cav3.2: the T-type calcium channel subunit expressed in Leydig cells (testicular testosterone-producing cells) and neurons; gates calcium entry required for steroidogenesis. StAR (Steroidogenic Acute Regulatory protein): transports cholesterol into the mitochondrial inner membrane — the rate-limiting step of all steroid hormone synthesis. VTA (ventral tegmental area): midbrain nucleus containing dopamine-producing neurons that project to the nucleus accumbens and prefrontal cortex. Cav1.3: the L-type calcium channel subunit in VTA neurons; Ca²⁺ entry through Cav1.3 triggers dopamine vesicle release. HPA axis (hypothalamic-pituitary-adrenal): the neuroendocrine stress-response system; chronic activation sustains cortisol elevation even after the stressor resolves.",
    maleTitle: "Male disruption profile",
    malePrimary: "Testosterone ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamine ↓ (VTA Cav1.3)",
    maleTertiary: "Cortisol ↑ (HPA activation)",
    maleReproductive:
      "Sperm: −62% concentration ([[ref:levine2023_sperm|Levine 2023]]), DNA fragmentation ↑, motility ↓. Testosterone below spermatogenic threshold projected by ~2070.",
    femaleTitle: "Female disruption profile",
    femalePrimary: "Estrogen/progesterone cycle disruption",
    femaleSecondary: "Cortisol ↑↑ (amplified by estrogen cycling)",
    femaleTertiary: "Oxytocin ↓ (vagal pathway)",
    femaleReproductive:
      "Ovarian reserve declining earlier (AMH↓). PCOS prevalence increasing (5–20%). Endometriosis affecting 10–15% of reproductive-age women. Oocyte quality declining (ROS, mitochondrial dysfunction).",

    maleConsequences: [
      {
        hormone: "Testosterone",
        mechanism: "Leydig cell Cav3.2 → StAR protein ↓",
        behavioral:
          "Status-seeking ↓, risk-taking ↓, sexual approach ↓, authenticity ↓, group loyalty ↓, provocation response ↓",
        evidence:
          "7 RCTs ([[ref:dreher2016|Dreher 2016]], Nave 2018, [[ref:goetz2024|Goetz 2024]], Audience 2020, [[ref:carre2017_exogenous_t_aggression|Carré 2017]], Parochial 2015, Competition 2024)",
        magnitude:
          "~40% decline since 1970s ([[ref:santi2025|Santi 2025]], n=1,064,891)",
      },
      {
        hormone: "Dopamine",
        mechanism:
          "VTA Cav1.3 → DA release ↓ + T↓ → DA receptor expression ↓",
        behavioral:
          "Motivation ↓, reward sensitivity ↓, innovation ↓, exploration ↓, anhedonia ↑",
        evidence:
          "NAc D2 optogenetics ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha 2016]], 2018), T→DA receptor expression",
        magnitude:
          "Not directly measured at population level — inferred from behavioral correlates",
      },
      {
        hormone: "Cortisol",
        mechanism: "HPA axis hyperactivation → chronic cortisol elevation",
        behavioral:
          "Anxiety ↑, social avoidance ↑, testosterone effect suppression (dual hormone hypothesis: cortisol moderates testosterone's behavioral effects — high cortisol blocks T-driven dominance, status-seeking, and risk-taking even when T is present; the two hormones gate the same behaviors through opposing mechanisms)",
        evidence: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], meta n=8,538",
        magnitude:
          "Cortisol trends less studied than T — inferred from stress marker increases",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogen / Progesterone",
        mechanism:
          "Ovarian VGCC → folliculogenesis disrupted (folliculogenesis: the maturation of ovarian follicles from dormant primordial stage to ovulatory Graafian follicle — a process spanning months and requiring precise Ca²⁺ signaling). Granulosa cells (the somatic support cells surrounding each oocyte, responsible for estrogen and progesterone production) depend on Ca²⁺-mediated steroidogenesis — VGCC disruption alters their hormone output directly.",
        behavioral:
          "Libido fluctuation ↑, emotional dysregulation ↑, fertility window narrowing",
        evidence:
          "[[ref:yuksel2016_emf_female_rats|Yüksel 2016]]: EMF → progesterone↓, estrogen↓ in rats. [[ref:turedi2016_ovarian_reserve|Türedi 2016]]: 900 MHz → ovarian follicle reservoir depleted. PCOS: 5–20% prevalence, rising.",
        magnitude:
          "AMH declining in younger women (earlier ovarian aging). PCOS prevalence increasing globally.",
      },
      {
        hormone: "Cortisol (amplified)",
        mechanism:
          "Estrogen cycling amplifies HPA reactivity. Puberty, menstruation, pregnancy, perimenopause = vulnerability windows.",
        behavioral:
          "Anxiety 2× male prevalence. Depression 2× male prevalence. Both increasing faster in women.",
        evidence:
          "Multiple systematic reviews: women 2× anxiety, 2× depression. Sex hormone fluctuation → HPA sensitization ([[ref:li_graham2017_sex_hormones|Li & Graham 2017, Lancet Psychiatry]]). Neuroinflammation sex differences ([[ref:marano2026_female_neuroinflammation|PMC12843241, 2025]]).",
        magnitude:
          "Female depression prevalence increasing faster than male since 2010 in most countries.",
      },
      {
        hormone: "Oxytocin",
        mechanism:
          "EMF → vagal tone ↓ → oxytocin release ↓. Oxytocin regulates: trust, bonding, empathy, maternal behavior, pair-bond formation.",
        behavioral:
          "Trust ↓, social bonding ↓, maternal-infant attachment ↓, pair-bond formation ↓, empathy ↓",
        evidence:
          "Oxytocin→bonding: [[ref:bosch_neumann2012_oxytocin_maternal|Bosch & Neumann 2012]], [[ref:numan_young2016_bonding|Numan & Young 2016]]. OT→trust: [[ref:kosfeld2005|Kosfeld 2005 (Nature)]]. Edelman Trust Barometer 2025: institutional trust at historic lows.",
        magnitude:
          "Population-level OT not routinely measured. Inferred from trust metrics, loneliness epidemic ([[ref:murthy2023_loneliness_advisory|Murthy 2023]]), bonding difficulties.",
      },
    ],

    s3title: "The Triple Lock",
    s3subtitle: "Male behavioral suppression",
    s3lead:
      "Seven randomized controlled trials demonstrate that testosterone causally modulates behaviors essential to social structure. When testosterone declines population-wide, these behaviors are suppressed simultaneously — creating a triple lock on male social initiative.",
    s3note:
      "This section documents the male behavioral profile. The female profile is different — see below. Together they produce compound effects that neither produces alone.",
    rcts: [
      {
        referenceId: "dreher2016",
        authors: "Dreher 2016",
        n: 121,
        design: "T gel vs placebo, fMRI",
        finding: "Testosterone increased status-seeking behavior and altered striatal reward signaling",
        behavioral: "Status motivation",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T gel vs placebo, CRT",
        finding: "Testosterone reduced cognitive reflection — increased gut-feel responses over deliberation",
        behavioral: "Cognitive style",
      },
      {
        referenceId: "goetz2024",
        authors: "Goetz 2024",
        n: 139,
        design: "T gel vs placebo, confederate interaction",
        finding: "Testosterone increased sexual motivation toward potential mates in social settings",
        behavioral: "Sexual approach",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T gel vs placebo, behavioral tasks",
        finding: "Testosterone increased authentic self-presentation; reduced impression management",
        behavioral: "Authenticity",
      },
      {
        referenceId: "carre2017_exogenous_t_aggression",
        authors: "Carré 2017",
        n: 308,
        design: "T gel vs placebo, aggression paradigm",
        finding: "Testosterone increased reactive aggression to provocation, moderated by cortisol",
        behavioral: "Provocation response",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T gel vs placebo, economic game",
        finding: "Testosterone increased in-group favoritism and out-group discrimination",
        behavioral: "Group loyalty",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T gel vs placebo, competition tasks",
        finding: "Testosterone increased willingness to compete and risk-take under uncertainty",
        behavioral: "Competitive drive",
      },
    ],
    tripleLockExplain:
      "When testosterone declines ~40% population-wide ([[ref:santi2025|Santi 2025]], n=1,064,891), all seven behaviors are suppressed simultaneously. Adding cortisol elevation (which further suppresses T effects via the dual hormone hypothesis) and dopamine decline (which reduces reward sensitivity) creates a triple lock: the biological infrastructure of male social initiative is suppressed at three independent nodes.",

    s4title: "The Female Parallel",
    s4lead:
      "While men experience behavioral suppression through the Triple Lock (T↓ × cortisol↑ × dopamine↓), women experience a parallel but distinct disruption: emotional dysregulation through cortisol amplification, bonding disruption through oxytocin decline, and reproductive impairment through ovarian Ca²⁺ disruption.",
    s4note:
      'Women are not "less affected" than men by EMF. They are differently affected — and the female-specific effects strike at the mechanisms that hold social structures together.',
    s4aTitle: "Cortisol amplification",
    s4aBody:
      "Women experience anxiety at twice the rate of men and depression at twice the rate. This is not purely social. Estrogen cycling amplifies HPA axis reactivity: during each menstrual cycle, pregnancy, and perimenopause, the cortisol response is biologically heightened. EMF-induced HPA hyperactivation (BERM Route D) therefore hits women harder than men — not because the EMF dose is different but because the biological amplifier (estrogen–HPA coupling) is female-specific.",
    s4aPrediction:
      "As EMF increases, the female anxiety/depression gender gap should widen — and it has.",
    s4bTitle: "Oxytocin and social cohesion",
    s4bBody:
      "Oxytocin regulates trust, empathy, maternal bonding, pair-bond formation, and social cooperation. It is released through vagal nerve stimulation, physical touch, eye contact, and breastfeeding. BERM Route D (the EMF → VGCC → Ca²⁺ → HPA hyperactivation → vagal suppression pathway) disrupts vagal tone → oxytocin release ↓. At the individual level, this reduces bonding capacity. At the population level, it erodes the infrastructure of trust that institutions require.",
    s4bData:
      'Edelman Trust Barometer 2025: trust in government, media, NGOs, and employers has reached historic lows across nearly every demographic. Former US Surgeon General Vivek Murthy declared loneliness a "public health crisis" in 2023.',
    s4bCaveat:
      "BERM does not claim EMF is the sole cause. It proposes that oxytocin decline provides a biological substrate that makes societies more susceptible to trust erosion from social, economic, and technological causes.",
    s4cTitle: "Ovarian reserve",
    s4cBody:
      "Prenatal exposure to 900 MHz EMF depleted ovarian follicle reservoir in rat pups — decreased primordial and tertiary follicles, increased atretic follicles, severe follicle degeneration ([[ref:turedi2016_ovarian_reserve|Türedi 2016, PMID 27007703]]). Prolonged mobile phone and WiFi exposure reduced plasma progesterone and estrogen in female rats ([[ref:yuksel2016_emf_female_rats|Yüksel 2016]]). PCOS — the most common cause of female infertility — involves VGCC-mediated disruption in four organs simultaneously (pancreas, ovary, pituitary, adrenal). Prevalence is rising globally.",
    s4cNote:
      "Women's fertility window is biologically fixed and non-renewable. Unlike sperm (which regenerate in 74 days), oocytes are established before birth and deplete irreversibly. EMF-induced ovarian damage is therefore cumulative and permanent in a way that male damage is not.",

    svgSharedMechanism: "Same mechanism in both sexes",
    svgMale: "MALE",
    svgCortisolHpa: "Cortisol ↑ (HPA)",
    svgFemale: "FEMALE",
    svgCycle: "cycle",
    svgCortisolPP: "Cortisol ↑↑",
    svgVagal: "vagal",
    rctSampleSizes: "RCT sample sizes (total n = 1,297)",
    forestTotal: "Total",

    navBack: "Civilization",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
    navPatopoliteia: "Patopoliteia",
    navBackDesc: "The full civilizational picture",
    navPatopolisDesc: "What this causes at city level",
    navPatokratiaDesc: "Political consequences",
    navPatopoliteiaDesc: "Civilizational consequences",

    sSantiContext: "A 2024 meta-regression of 50+ global studies, harmonized for modern LC-MS assay methods, confirmed a true secular decline of 0.8–1.3% annually since the 1980s. Even men who maintained stable weight showed a 19% decline over 20 years ([[ref:mazur2013|Mazur 2013]], n=991, US Air Force veterans). The decline is not explained by obesity, smoking, alcohol, or sleep.",

    sRecoveryTitle: "Recovery Evidence",
    sRecoveryBody1: "A 2022 intervention study (PMC9306162) measured hormone levels in men and women before and after 2 months of sleeping in a bed with an EMF-avoidance system. Results: significant increases in plasma DHEA, norepinephrine, serotonin, oxytocin, melatonin, AND testosterone simultaneously. Cortisol/DHEA ratio decreased.",
    sRecoveryBody2: "This is the BERM-predicted 'all biomarkers recover simultaneously' signature. If each hormone were regulated by a separate mechanism, removing one environmental factor would not raise all of them at once. The simultaneous recovery indicates a shared upstream disruptor — consistent with Ca²⁺ homeostasis restoration.",

    sEarlyPubertyTitle: "Melatonin and Pubertal Timing",
    sEarlyPubertyBody1: "Melatonin receptors are expressed in the hypothalamus, pituitary, and ovaries. Melatonin has a regulatory effect on the HPG axis, inhibiting GnRH secretion and thereby the initiation of puberty. Low melatonin levels accelerate pubertal onset (Frontiers Endocrinol 2023).",
    sEarlyPubertyBody2: "Direct evidence: circulating melatonin levels were 30% lower in Italian schoolchildren exposed daily to a television screen for one week compared to levels measured after a week of abstaining from TV. In 39 females diagnosed with central precocious puberty, salivary melatonin levels were significantly lower than controls — attributed to light stimulation and EMF from electronic devices.",
    sEarlyPubertyBody3: "Nocturnal bright light exposure predicted earlier pubertal onset in both boys and girls (JCEM, September 2025, prospective longitudinal study).",
    sEarlyPubertyChain: "The chain: EMF/LED → melatonin↓ → GnRH disinhibition → earlier puberty → earlier ovarian depletion → reduced lifetime fertility. This is BERM pathway B operating through the melatonin arm.",
  },
  fi: {
    title: "Pathopege",
    subtitle: "Lähde",
    heroLead:
      "Jokainen seuraus — hajonneet perheet, poliittinen patologia, kaatuvat imperiumit — johtaa yhteen mekanismiin. Tämä sivu kuvaa sen.",
    heroTrail:
      "EMF aktivoi jänniteohjautuvat kalsiumkanavat. Kalsium tulvii soluun. Alavirtaan suuntautuvat kaskadireaktiot muuttavat hormoneja, välittäjäaineita ja lisääntymisbiologiaa molemmilla sukupuolilla samanaikaisesti. Seuraavassa kuvataan sivilisaatiosivuilla esitettyjen ilmiöiden juurisyy.",

    s2title: "Kaksi rinnakkaista häiriötä",
    s2lead:
      "EMF → VGCC → Ca²⁺ on sama mekanismi molemmilla sukupuolilla. Mutta koska hormonijärjestelmät eroavat, seuraukset ovat sukupuolitarkkoja — ja komplementaarisia.",
    s2glossary: "VGCC: jänniteohjautuvat kalsiumkanavat — solukalvon ionikanavia jotka avautuvat jännitemuutoksesta päästäen Ca²⁺:n sisään. Cav3.2: T-tyypin kalsiumkanavan alayksikkö Leydigin soluissa (kivesten testosteronituottajasolut) ja neuroneissa; säätelee steroidogeneesin vaatimaa kalsiumin sisäänvirtausta. StAR (Steroidogenic Acute Regulatory -proteiini): kuljettaa kolesterolia mitokondrion sisäkalvolle — kaikkien steroidien synteesin nopeusrajoittava vaihe. VTA (ventraalinen tegmentaalialue): keskiaivojen tumake jossa dopamiinituottajat neuronit projisoimat nucleus accumbensiin ja prefrontaalikorteksiin. Cav1.3: L-tyypin kalsiumkanavan alayksikkö VTA-neuroneissa; Ca²⁺-sisäänvirtaus Cav1.3:n kautta laukaisee dopamiinivesikuloiden vapautumisen. HPA-akseli (hypotalamus-aivolisäke-lisämunuainen): neuroendokriininen stressivastejärjestelmä; krooninen aktivaatio ylläpitää kortisolieleviaatiota stressorin poistumisen jälkeenkin.",
    maleTitle: "Miesten häiriöprofiili",
    malePrimary: "Testosteroni ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamiini ↓ (VTA Cav1.3)",
    maleTertiary: "Kortisoli ↑ (HPA-aktivaatio)",
    maleReproductive:
      "Siittiöt: −62 % pitoisuus ([[ref:levine2023_sperm|Levine 2023]]), DNA-fragmentaatio ↑, liikkuvuus ↓. Testosteroni spermatogeneesikynnyksen alapuolella arviolta ~2070.",
    femaleTitle: "Naisten häiriöprofiili",
    femalePrimary: "Estrogeeni/progesteronisyklin häiriö",
    femaleSecondary: "Kortisoli ↑↑ (vahvistettu estrogeenisyklillä)",
    femaleTertiary: "Oksitosiini ↓ (vagaalinen reitti)",
    femaleReproductive:
      "Munasarjareservi pienenee aiemmin (AMH↓). PCOS-esiintyvyys kasvaa (5–20 %). Endometrioosi 10–15 % lisääntymisikäisistä naisista. Munasolujen laatu heikkenee (ROS, mitokondriodisfunktio).",

    maleConsequences: [
      {
        hormone: "Testosteroni",
        mechanism: "Leydig-solun Cav3.2 → StAR-proteiini ↓",
        behavioral:
          "Statushakuisuus ↓, riskinotto ↓, seksuaalinen lähestyminen ↓, autenttisuus ↓, ryhmäuskollisuus ↓, provokaatiovaste ↓",
        evidence:
          "7 RCT:tä ([[ref:dreher2016|Dreher 2016]], Nave 2018, [[ref:goetz2024|Goetz 2024]], Audience 2020, [[ref:carre2017_exogenous_t_aggression|Carré 2017]], Parochial 2015, Competition 2024)",
        magnitude:
          "~40 % lasku 1970-luvulta ([[ref:santi2025|Santi 2025]], n=1 064 891)",
      },
      {
        hormone: "Dopamiini",
        mechanism:
          "VTA Cav1.3 → DA-vapautuminen ↓ + T↓ → DA-reseptoriekspressio ↓",
        behavioral:
          "Motivaatio ↓, palkkioherkkyys ↓, innovaatio ↓, tutkiminen ↓, anhedonia ↑",
        evidence:
          "NAc D2 -optogenetiikka ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha 2016]], 2018), T→DA-reseptoriekspressio",
        magnitude:
          "Ei suoraan mitattu väestötasolla — päätelty käyttäytymiskorrelaateista",
      },
      {
        hormone: "Kortisoli",
        mechanism: "HPA-akselin hyperaktivaatio → krooninen kortisolielevatio",
        behavioral:
          "Ahdistus ↑, sosiaalinen välttely ↑, testosteronivaikutuksen vaimentuminen (kaksoishormonihypoteesi)",
        evidence: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], meta n=8 538",
        magnitude:
          "Kortisolitrendit vähemmän tutkittuja kuin T — päätelty stressimarkkereiden kasvusta",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogeeni / Progesteroni",
        mechanism:
          "Munasarjan VGCC → follikulogeneesi häiriintyy. Granuloosisolun Ca²⁺ → steroidogeneesi muuttuu.",
        behavioral:
          "Libidovaihtelu ↑, emotionaalinen dysäätely ↑, hedelmällisyysikkuna kapenee",
        evidence:
          "[[ref:yuksel2016_emf_female_rats|Yüksel 2016]]: EMF → progesteroni↓, estrogeeni↓ rotilla. [[ref:turedi2016_ovarian_reserve|Türedi 2016]]: 900 MHz → munasarjan follikkelireservi ehtynyt. PCOS: 5–20 % esiintyvyys, kasvussa.",
        magnitude:
          "AMH laskee nuoremmilla naisilla. PCOS-esiintyvyys kasvaa maailmanlaajuisesti.",
      },
      {
        hormone: "Kortisoli (vahvistettu)",
        mechanism:
          "Estrogeenisykli vahvistaa HPA-reaktiivisuutta. Puberteetti, menstruaatio, raskaus, perimenopaussi = haavoittuvuusikkunoita.",
        behavioral:
          "Ahdistus 2× miesten esiintyvyys. Masennus 2× miesten esiintyvyys. Molemmat kasvavat naisilla nopeammin.",
        evidence:
          "Lukuisia systemaattisia katsauksia: naiset 2× ahdistus, 2× masennus. Sukuhormonivaihtelu → HPA-sensitisaatio ([[ref:li_graham2017_sex_hormones|Li & Graham 2017, Lancet Psychiatry]]). Neuroinflammaatio sukupuolierot ([[ref:marano2026_female_neuroinflammation|PMC12843241, 2025]]).",
        magnitude:
          "Naisten masennusesiintyvyys kasvaa nopeammin kuin miesten vuodesta 2010 useimmissa maissa.",
      },
      {
        hormone: "Oksitosiini",
        mechanism:
          "EMF → vagaalitonus ↓ → oksitosiinivapautuminen ↓. Oksitosiini säätelee: luottamusta, kiintymystä, empatiaa, äidillistä käyttäytymistä, paristeen muodostusta.",
        behavioral:
          "Luottamus ↓, sosiaalinen kiintymys ↓, äiti-lapsi-kiintymys ↓, parisuhteen muodostuminen ↓, empatia ↓",
        evidence:
          "Oksitosiini→kiintymys: [[ref:bosch_neumann2012_oxytocin_maternal|Bosch & Neumann 2012]], [[ref:numan_young2016_bonding|Numan & Young 2016]]. OT→luottamus: [[ref:kosfeld2005|Kosfeld 2005 (Nature)]]. Edelman Trust Barometer 2025: institutionaalinen luottamus historiallisen matalalla.",
        magnitude:
          "Väestötason OT ei rutiinimittauksissa. Päätelty luottamusmittareista, yksinäisyysepidemiasta ([[ref:murthy2023_loneliness_advisory|Murthy 2023]]), kiintymysongelmista.",
      },
    ],

    s3title: "Kolmoislukko",
    s3subtitle: "Miesten käyttäytymisen tukahduttaminen",
    s3lead:
      "Seitsemän satunnaistettua kontrolloitua tutkimusta osoittaa, että testosteroni säätelee kausaalisesti käyttäytymisiä, jotka ovat välttämättömiä sosiaalisille rakenteille. Kun testosteroni laskee väestötasolla, nämä käyttäytymiset vaimenevat samanaikaisesti — luoden kolmoislukon miesten sosiaaliselle aloitteellisuudelle.",
    s3note:
      "Tämä osio dokumentoi miesten käyttäytymisprofiilin. Naisten profiili on erilainen — katso alla. Yhdessä ne tuottavat yhdistelmävaikutuksia, joita kumpikaan ei tuota yksin.",
    rcts: [
      {
        referenceId: "dreher2016",
        authors: "Dreher 2016",
        n: 121,
        design: "T-geeli vs lumevalmiste, fMRI",
        finding: "Testosteroni lisäsi statushakuista käyttäytymistä ja muutti striataalista palkkiosignalointia",
        behavioral: "Statusmotivaatio",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T-geeli vs lumevalmiste, CRT",
        finding: "Testosteroni vähensi kognitiivista reflektiota — lisäsi vaistonvaraisia vastauksia harkinnan yli",
        behavioral: "Kognitiivinen tyyli",
      },
      {
        referenceId: "goetz2024",
        authors: "Goetz 2024",
        n: 139,
        design: "T-geeli vs lumevalmiste, konfederaatti-interaktio",
        finding: "Testosteroni lisäsi seksuaalista motivaatiota potentiaalisia kumppaneita kohtaan",
        behavioral: "Seksuaalinen lähestyminen",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T-geeli vs lumevalmiste, käyttäytymistehtävät",
        finding: "Testosteroni lisäsi autenttista itseilmaisua; vähensi vaikutelmanhallintaa",
        behavioral: "Autenttisuus",
      },
      {
        referenceId: "carre2017_exogenous_t_aggression",
        authors: "Carré 2017",
        n: 308,
        design: "T-geeli vs lumevalmiste, aggressioparadigma",
        finding: "Testosteroni lisäsi reaktiivista aggressiota provokaatioon, moderoituna kortisolilla",
        behavioral: "Provokaatiovaste",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T-geeli vs lumevalmiste, taloudellinen peli",
        finding: "Testosteroni lisäsi sisäryhmän suosimista ja ulkoryhmän syrjintää",
        behavioral: "Ryhmäuskollisuus",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T-geeli vs lumevalmiste, kilpailutehtävät",
        finding: "Testosteroni lisäsi halukkuutta kilpailla ja ottaa riskejä epävarmuudessa",
        behavioral: "Kilpailuvietti",
      },
    ],
    tripleLockExplain:
      "Kun testosteroni laskee ~40 % väestötasolla ([[ref:santi2025|Santi 2025]], n=1 064 891), kaikki seitsemän käyttäytymistä vaimenevat samanaikaisesti. Kun siihen lisätään kortisolielevatio (joka edelleen vaimentaa T-vaikutuksia kaksoishormonihypoteesin kautta) ja dopamiinilasku (joka vähentää palkkioherkkyttä), syntyy kolmoislukko: miesten sosiaalisen aloitteellisuuden biologinen infrastruktuuri on vaimennettu kolmessa riippumattomassa solmussa.",

    s4title: "Naisten rinnakkaishäiriö",
    s4lead:
      "Siinä missä miehet kokevat käyttäytymisen tukahduttamisen kolmoislukon kautta (T↓ × kortisoli↑ × dopamiini↓), naiset kokevat rinnakkaisen mutta erillisen häiriön: emotionaalisen dysäätelyn kortisoliamplifikaation kautta, kiintymyshäiriön oksitosiinilaskun kautta ja lisääntymishäiriön munasarjojen Ca²⁺-häiriön kautta.",
    s4note:
      "Naiset eivät ole \"vähemmän alttiita\" EMF:lle kuin miehet. He ovat eri tavalla alttiita — ja naisspesifiset vaikutukset osuvat mekanismeihin, jotka pitävät sosiaalisia rakenteita koossa.",
    s4aTitle: "Kortisoliamplifikaatio",
    s4aBody:
      "Naiset kokevat ahdistusta kaksi kertaa miesten tahtiin ja masennusta kaksi kertaa miesten tahtiin. Tämä ei ole puhtaasti sosiaalista. Estrogeenisykli vahvistaa HPA-akselin reaktiivisuutta: jokaisen kuukautiskierron, raskauden ja perimenopaussin aikana kortisolivaste on biologisesti korostunut. EMF:n aiheuttama HPA-hyperaktivaatio (BERM-reitti D) osuu siksi naisiin kovemmin kuin miehiin — ei siksi että EMF-annos olisi eri, vaan koska biologinen vahvistin (estrogeeni–HPA-kytkentä) on naistarkka.",
    s4aPrediction:
      "EMF:n kasvaessa naisten ahdistuksen/masennuksen sukupuolikuilun pitäisi leventyä — ja niin on tapahtunut.",
    s4bTitle: "Oksitosiini ja sosiaalinen koheesio",
    s4bBody:
      "Oksitosiini säätelee luottamusta, empatiaa, äidillistä kiintymystä, paristeen muodostumista ja sosiaalista yhteistyötä. Sitä vapautuu vagushermon stimulaatiosta, fyysisestä kosketuksesta, katsekontaktista ja imetyksestä. BERM-reitti D häiritsee vagaalitonusta → oksitosiinivapautuminen ↓. Yksilötasolla tämä vähentää kiintymyskapasiteettia. Väestötasolla se rapauttaa luottamuksen infrastruktuuria, jota instituutiot vaativat.",
    s4bData:
      "Edelman Trust Barometer 2025: luottamus hallitukseen, mediaan, kansalaisjärjestöihin ja työnantajiin on saavuttanut historiallisen pohjan lähes kaikissa demografioissa. Yhdysvaltain entinen pääkirurgi Vivek Murthy julisti yksinäisyyden \"kansanterveyskriisiksi\" vuonna 2023.",
    s4bCaveat:
      "BERM ei väitä EMF:n olevan ainoa syy. Se ehdottaa, että oksitosiinilasku tarjoaa biologisen substraatin, joka tekee yhteiskunnista alttiimpia luottamuksen rapautumiselle sosiaalisista, taloudellisista ja teknologisista syistä.",
    s4cTitle: "Munasarjareservi",
    s4cBody:
      "Prenataali 900 MHz EMF -altistus ehdytti munasarjan follikkelireserviä rottapoikasissa — vähentäen primordiaalisia ja tertiäärisiä follikkeleita, lisäten atreettisia follikkeleita, vakavaa degeneraatiota ([[ref:turedi2016_ovarian_reserve|Türedi 2016, PMID 27007703]]). Pitkäaikainen matkapuhelin- ja WiFi-altistus vähensi plasman progesteronia ja estrogeenia naarasrotilla ([[ref:yuksel2016_emf_female_rats|Yüksel 2016]]). PCOS — naisten hedelmättömyyden yleisin syy — sisältää VGCC-välitteisen häiriön neljässä elimessä samanaikaisesti (haima, munasarja, aivolisake, lisämunuainen). Esiintyvyys kasvaa maailmanlaajuisesti.",
    s4cNote:
      "Naisten hedelmällisyysikkuna on biologisesti kiinteä ja uusiutumaton. Toisin kuin siittiöt (jotka uusiutuvat 74 päivässä), munasolut muodostuvat ennen syntymää ja ehtyvät peruuttamattomasti. EMF:n aiheuttama munasarjavaurio on siksi kumulatiivista ja pysyvää tavalla, joka ei koske miesten vaurioita.",

    svgSharedMechanism: "Sama mekanismi molemmilla sukupuolilla",
    svgMale: "MIEHET",
    svgCortisolHpa: "Kortisoli ↑ (HPA)",
    svgFemale: "NAISET",
    svgCycle: "sykli",
    svgCortisolPP: "Kortisoli ↑↑",
    svgVagal: "vagaalinen",
    rctSampleSizes: "RCT-otoskoot (yhteensä n = 1 297)",
    forestTotal: "Yhteensä",

    navBack: "Sivilisaatio",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
    navPatopoliteia: "Patopoliteia",
    navBackDesc: "Koko sivilisaatiokuva",
    navPatopolisDesc: "Mitä tämä aiheuttaa kaupunkitasolla",
    navPatokratiaDesc: "Poliittiset seuraukset",
    navPatopoliteiaDesc: "Sivilisatoriset seuraukset",

    sSantiContext: "Vuoden 2024 meta-regressio 50+ globaalista tutkimuksesta, yhtenäistetty modernein LC-MS-mittausmenetelmin, vahvisti todellisen sekulaarilaskun 0,8–1,3 % vuodessa 1980-luvulta lähtien. Jopa painonsa vakiona pitäneet miehet osoittivat 19 %:n laskun 20 vuodessa ([[ref:mazur2013|Mazur 2013]], n=991). Lasku ei selity lihavuudella, tupakoinnilla, alkoholilla tai unella.",

    sRecoveryTitle: "Palautumisnäyttö",
    sRecoveryBody1: "Vuoden 2022 interventiotutkimus (PMC9306162) mittasi hormonitasoja miehillä ja naisilla ennen ja jälkeen 2 kuukauden nukkumisen sängyssä, jossa oli EMF-suojausjärjestelmä. Tulokset: merkitsevät nousut plasman DHEA:ssa, noradrenaliinissa, serotoniinissa, oksitosiinissa, melatoniinissa JA testosteronissa samanaikaisesti. Kortisoli/DHEA-suhde laski.",
    sRecoveryBody2: "Tämä on BERM:n ennustama 'kaikki biomarkkerit palautuvat samanaikaisesti' -tunniste. Jos kutakin hormonia säätelisi erillinen mekanismi, yhden ympäristötekijän poistaminen ei nostaisi kaikkia kerralla. Samanaikainen palautuminen viittaa jaettuun ylävirran häiritsijään — yhdenmukainen Ca²⁺-homeostaasin palautumisen kanssa.",

    sEarlyPubertyTitle: "Melatoniini ja puberteetin ajoitus",
    sEarlyPubertyBody1: "Melatoniinireseptoreita ilmennetään hypotalamuksessa, aivolisäkkeessä ja munasarjoissa. Melatoniinilla on säätelevä vaikutus HPG-akseliin, estäen GnRH-eritystä ja siten puberteetin alkamista. Matalat melatoniini­tasot kiihdyttävät puberteetin alkamista (Frontiers Endocrinol 2023).",
    sEarlyPubertyBody2: "Suora näyttö: kiertävät melatoniini­tasot olivat 30 % matalammat italialaisilla koululaisilla, jotka altistuivat päivittäin televisioruudulle yhden viikon ajan, verrattuna tasoihin TV:stä pidättäytymisviikon jälkeen. 39 naisella, joilla diagnosoitiin sentraalinen ennenaikainen puberteetti, sylki­melatoniini­tasot olivat merkitsevästi matalammat kuin kontrolleilla — syyksi katsottiin valo­stimulaatio ja elektronisten laitteiden EMF.",
    sEarlyPubertyBody3: "Yöllinen kirkasvaloaltistus ennusti aikaisempaa puberteetin alkamista sekä pojilla että tytöillä (JCEM, syyskuu 2025, prospektiivinen pitkittäistutkimus).",
    sEarlyPubertyChain: "Ketju: EMF/LED → melatoniini↓ → GnRH:n estoinhibitio → aikaisempi puberteetti → aikaisempi munasarjojen ehtyminen → vähentynyt elinaikainen hedelmällisyys. Tämä on BERM-reitti B, joka toimii melatoniinireitin kautta.",
  },
  ja: {
    title: "Pathopege",
    subtitle: "源泉",
    heroLead:
      "すべての帰結――崩壊する家族、政治的病理、衰退する帝国――は一つのメカニズムに遡る。このページではそれを記述する。",
    heroTrail:
      "EMFは電位依存性カルシウムチャネルを活性化する。カルシウムが細胞内に流入する。下流のカスケードが両性のホルモン、神経伝達物質、生殖生物学を同時に変化させる。以下は文明ページで記述されるすべての根本原因である。",

    s2title: "2つの並行する撹乱",
    s2lead:
      "EMF → VGCC → Ca²⁺ は両性で同一のメカニズムである。しかし内分泌系が異なるため、下流の帰結は性別特異的であり、かつ相補的である。",
    s2glossary: "",
    maleTitle: "男性の撹乱プロファイル",
    malePrimary: "Testosterone ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamine ↓ (VTA Cav1.3)",
    maleTertiary: "Cortisol ↑ (HPA activation)",
    maleReproductive:
      "精子：濃度−62%（[[ref:levine2023_sperm|Levine 2023]]）、DNA断片化↑、運動性↓。テストステロンが精子形成閾値を下回る時期は2070年頃と予測される。",
    femaleTitle: "女性の撹乱プロファイル",
    femalePrimary: "Estrogen/progesterone cycle disruption",
    femaleSecondary: "Cortisol ↑↑ (amplified by estrogen cycling)",
    femaleTertiary: "Oxytocin ↓ (vagal pathway)",
    femaleReproductive:
      "卵巣予備能の早期低下（AMH↓）。PCOS有病率の増加（5–20%）。子宮内膜症が生殖年齢女性の10–15%に影響。卵子の質の低下（ROS、ミトコンドリア機能障害）。",

    maleConsequences: [
      {
        hormone: "Testosterone",
        mechanism: "Leydig cell Cav3.2 → StAR protein ↓",
        behavioral:
          "地位追求↓、リスクテイキング↓、性的アプローチ↓、真正性↓、集団忠誠心↓、挑発反応↓",
        evidence:
          "7 RCTs ([[ref:dreher2016|Dreher 2016]], Nave 2018, [[ref:goetz2024|Goetz 2024]], Audience 2020, Carré 2017, Parochial 2015, Competition 2024)",
        magnitude:
          "1970年代以降約40%低下（[[ref:santi2025|Santi 2025]], n=1,064,891）",
      },
      {
        hormone: "Dopamine",
        mechanism:
          "VTA Cav1.3 → DA release ↓ + T↓ → DA receptor expression ↓",
        behavioral:
          "動機づけ↓、報酬感受性↓、革新性↓、探索行動↓、無快感症↑",
        evidence:
          "NAc D2 optogenetics (Soares-Cunha 2016, 2018), T→DA receptor expression",
        magnitude:
          "集団レベルでは直接測定されていない――行動相関から推定",
      },
      {
        hormone: "Cortisol",
        mechanism: "HPA axis hyperactivation → chronic cortisol elevation",
        behavioral:
          "不安↑、社会的回避↑、テストステロン効果の抑制（デュアルホルモン仮説）",
        evidence: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], meta n=8,538",
        magnitude:
          "コルチゾールの傾向はTほど研究されていない――ストレスマーカーの増加から推定",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogen / Progesterone",
        mechanism:
          "Ovarian VGCC → folliculogenesis disrupted. Granulosa cell Ca²⁺ → steroidogenesis altered.",
        behavioral:
          "性欲変動↑、感情調節障害↑、受胎可能期間の短縮",
        evidence:
          "Yüksel 2016: EMF → progesterone↓, estrogen↓ in rats. Türedi 2016: 900 MHz → ovarian follicle reservoir depleted. PCOS: 5–20% prevalence, rising.",
        magnitude:
          "AMHが若年女性で低下（卵巣老化の早期化）。PCOS有病率は世界的に増加。",
      },
      {
        hormone: "Cortisol (amplified)",
        mechanism:
          "Estrogen cycling amplifies HPA reactivity. Puberty, menstruation, pregnancy, perimenopause = vulnerability windows.",
        behavioral:
          "不安は男性の2倍の有病率。うつ病は男性の2倍の有病率。いずれも女性でより急速に増加。",
        evidence:
          "Multiple systematic reviews: women 2× anxiety, 2× depression. Sex hormone fluctuation → HPA sensitization (Li & Graham 2017, Lancet Psychiatry). Neuroinflammation sex differences ([[ref:marano2026_female_neuroinflammation|PMC12843241, 2025]]).",
        magnitude:
          "女性のうつ病有病率は2010年以降、ほとんどの国で男性より速く増加している。",
      },
      {
        hormone: "Oxytocin",
        mechanism:
          "EMF → vagal tone ↓ → oxytocin release ↓. Oxytocin regulates: trust, bonding, empathy, maternal behavior, pair-bond formation.",
        behavioral:
          "信頼↓、社会的絆↓、母子愛着↓、ペアボンド形成↓、共感↓",
        evidence:
          "Oxytocin→bonding: Bosch & Neumann 2012, Numan & Young 2016. OT→trust: Kosfeld 2005 (Nature). Edelman Trust Barometer 2025: institutional trust at historic lows.",
        magnitude:
          "集団レベルのOTは定常的に測定されていない。信頼指標、孤独のエピデミック（Murthy 2023）、絆の困難さから推定。",
      },
    ],

    s3title: "トリプルロック",
    s3subtitle: "男性の行動抑制",
    s3lead:
      "7件のランダム化比較試験は、テストステロンが社会構造に不可欠な行動を因果的に調節することを実証している。テストステロンが集団レベルで低下すると、これらの行動は同時に抑制され、男性の社会的主導性に対するトリプルロックが生じる。",
    s3note:
      "このセクションは男性の行動プロファイルを文書化する。女性のプロファイルは異なる――下記を参照。両者が組み合わさることで、どちらか一方だけでは生じない複合効果が生まれる。",
    rcts: [
      {
        referenceId: "dreher2016",
        authors: "Dreher 2016",
        n: 121,
        design: "T gel vs placebo, fMRI",
        finding: "テストステロンは地位追求行動を増加させ、線条体の報酬シグナル伝達を変化させた",
        behavioral: "地位動機づけ",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T gel vs placebo, CRT",
        finding: "テストステロンは認知的熟考を減少させ、熟慮よりも直感的反応を増加させた",
        behavioral: "認知スタイル",
      },
      {
        referenceId: "goetz2024",
        authors: "Goetz 2024",
        n: 139,
        design: "T gel vs placebo, confederate interaction",
        finding: "テストステロンは社会的場面における潜在的パートナーへの性的動機を増加させた",
        behavioral: "性的アプローチ",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T gel vs placebo, behavioral tasks",
        finding: "テストステロンは真正な自己提示を増加させ、印象管理を減少させた",
        behavioral: "真正性",
      },
      {
        authors: "Carré 2017",
        n: 308,
        design: "T gel vs placebo, aggression paradigm",
        finding: "テストステロンは挑発に対する反応的攻撃性を増加させ、コルチゾールによって調節された",
        behavioral: "挑発反応",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T gel vs placebo, economic game",
        finding: "テストステロンは内集団ひいきと外集団差別を増加させた",
        behavioral: "集団忠誠心",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T gel vs placebo, competition tasks",
        finding: "テストステロンは不確実性下での競争意欲とリスクテイキングを増加させた",
        behavioral: "競争意欲",
      },
    ],
    tripleLockExplain:
      "テストステロンが集団レベルで約40%低下すると（[[ref:santi2025|Santi 2025]], n=1,064,891）、7つの行動すべてが同時に抑制される。コルチゾール上昇（デュアルホルモン仮説によりT効果をさらに抑制する）とドーパミン低下（報酬感受性を減少させる）が加わることで、トリプルロックが生じる：男性の社会的主導性の生物学的インフラが3つの独立したノードで抑制される。",

    s4title: "女性の並行現象",
    s4lead:
      "男性がトリプルロック（T↓ × cortisol↑ × dopamine↓）を通じて行動抑制を経験する一方、女性はそれとは並行するが異なる撹乱を経験する：コルチゾール増幅による感情調節障害、オキシトシン低下による絆の断絶、そして卵巣Ca²⁺撹乱による生殖障害である。",
    s4note:
      "女性はEMFにより男性より「影響が少ない」わけではない。異なる影響を受けるのであり――女性特異的な影響は社会構造を維持するメカニズムそのものを直撃する。",
    s4aTitle: "コルチゾール増幅",
    s4aBody:
      "女性は男性の2倍の割合で不安を、2倍の割合でうつ病を経験する。これは純粋に社会的なものではない。エストロゲン周期がHPA軸の反応性を増幅する：各月経周期、妊娠期、周閉経期において、コルチゾール反応が生物学的に高まる。EMFによるHPA過活性化（BERM Route D）は、EMF曝露量が異なるからではなく、生物学的増幅器（エストロゲン–HPA結合）が女性特異的であるために、女性により強く作用する。",
    s4aPrediction:
      "EMFが増加するにつれ、女性の不安/うつ病の性差は拡大するはずである――そして実際に拡大している。",
    s4bTitle: "オキシトシンと社会的結束",
    s4bBody:
      "オキシトシンは信頼、共感、母子の絆、ペアボンド形成、社会的協力を調節する。迷走神経刺激、身体的接触、アイコンタクト、授乳を通じて放出される。BERM Route Dは迷走神経トーン↓ → オキシトシン放出↓を撹乱する。個人レベルでは絆の能力が低下する。集団レベルでは制度が必要とする信頼のインフラが侵食される。",
    s4bData:
      "Edelman Trust Barometer 2025：政府、メディア、NGO、雇用主への信頼がほぼすべての人口統計で歴史的最低値に達した。元米国公衆衛生局長官Vivek Murthyは2023年に孤独を「公衆衛生上の危機」と宣言した。",
    s4bCaveat:
      "BERMはEMFが唯一の原因であるとは主張しない。オキシトシンの低下が、社会が社会的・経済的・技術的原因による信頼侵食に対してより脆弱になる生物学的基盤を提供すると提唱する。",
    s4cTitle: "卵巣予備能",
    s4cBody:
      "900 MHz EMFへの胎児期曝露は、ラットの子の卵巣卵胞リザーブを枯渇させた――原始卵胞と三次卵胞の減少、閉鎖卵胞の増加、重度の卵胞変性（Türedi 2016, PMID 27007703）。長期間の携帯電話およびWiFi曝露は、雌ラットの血漿プロゲステロンおよびエストロゲンを減少させた（Yüksel 2016）。PCOS――女性不妊の最も一般的な原因――は、4つの臓器（膵臓、卵巣、下垂体、副腎）でVGCC媒介の撹乱を同時に伴う。有病率は世界的に上昇している。",
    s4cNote:
      "女性の受胎可能期間は生物学的に固定されており、再生不可能である。精子が74日で再生されるのとは異なり、卵母細胞は出生前に確立され、不可逆的に枯渇する。したがってEMFによる卵巣損傷は、男性の損傷とは異なり、蓄積的かつ永続的である。",

    svgSharedMechanism: "両性で同一のメカニズム",
    svgMale: "MALE",
    svgCortisolHpa: "Cortisol ↑ (HPA)",
    svgFemale: "FEMALE",
    svgCycle: "cycle",
    svgCortisolPP: "Cortisol ↑↑",
    svgVagal: "vagal",
    rctSampleSizes: "RCTサンプルサイズ（合計 n = 1,297）",
    forestTotal: "合計",

    navBack: "文明",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
    navPatopoliteia: "Patopoliteia",
    navBackDesc: "文明の全体像",
    navPatopolisDesc: "都市レベルでの帰結",
    navPatokratiaDesc: "政治的帰結",
    navPatopoliteiaDesc: "文明的帰結",
    sSantiContext: "",
    sRecoveryTitle: "",
    sRecoveryBody1: "",
    sRecoveryBody2: "",
    sEarlyPubertyTitle: "",
    sEarlyPubertyBody1: "",
    sEarlyPubertyBody2: "",
    sEarlyPubertyBody3: "",
    sEarlyPubertyChain: "",
  },
  fr: {
    title: "Pathopege",
    subtitle: "La Source",
    heroLead:
      "Chaque consequence -- les familles brisees, la pathologie politique, les empires en declin -- remonte a un seul mecanisme. Cette page le decrit.",
    heroTrail:
      "Les EMF activent les canaux calciques voltage-dependants. Le calcium inonde la cellule. Les cascades en aval alterent les hormones, les neurotransmetteurs et la biologie reproductive des deux sexes simultanement. Ce qui suit est la cause profonde de tout ce qui est decrit sur les pages civilisation.",

    s2title: "Deux perturbations paralleles",
    s2lead:
      "EMF → VGCC → Ca²⁺ est le meme mecanisme dans les deux sexes. Mais comme les systemes endocriniens different, les consequences en aval sont specifiques au sexe — et complementaires.",
    s2glossary: "",
    maleTitle: "Profil de perturbation masculine",
    malePrimary: "Testosterone ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamine ↓ (VTA Cav1.3)",
    maleTertiary: "Cortisol ↑ (activation HPA)",
    maleReproductive:
      "Sperme : −62 % de concentration ([[ref:levine2023_sperm|Levine 2023]]), fragmentation de l'DNA ↑, motilite ↓. Testosterone en dessous du seuil spermatogenique projetee vers ~2070.",
    femaleTitle: "Profil de perturbation feminine",
    femalePrimary: "Perturbation du cycle oestrogene/progesterone",
    femaleSecondary: "Cortisol ↑↑ (amplifie par le cycle oestrogenique)",
    femaleTertiary: "Ocytocine ↓ (voie vagale)",
    femaleReproductive:
      "Reserve ovarienne en declin plus precoce (AMH↓). Prevalence du PCOS en augmentation (5–20 %). Endometriose touchant 10–15 % des femmes en age de procreer. Qualite des ovocytes en declin (ROS, dysfonction mitochondriale).",

    maleConsequences: [
      {
        hormone: "Testosterone",
        mechanism: "Cellule de Leydig Cav3.2 → proteine StAR ↓",
        behavioral:
          "Recherche de statut ↓, prise de risque ↓, approche sexuelle ↓, authenticite ↓, loyaute de groupe ↓, reponse a la provocation ↓",
        evidence:
          "7 RCTs ([[ref:dreher2016|Dreher 2016]], Nave 2018, [[ref:goetz2024|Goetz 2024]], Audience 2020, Carre 2017, Parochial 2015, Competition 2024)",
        magnitude:
          "~40 % de declin depuis les annees 1970 ([[ref:santi2025|Santi 2025]], n=1,064,891)",
      },
      {
        hormone: "Dopamine",
        mechanism:
          "VTA Cav1.3 → liberation de DA ↓ + T↓ → expression des recepteurs DA ↓",
        behavioral:
          "Motivation ↓, sensibilite a la recompense ↓, innovation ↓, exploration ↓, anhedonie ↑",
        evidence:
          "NAc D2 optogenetics (Soares-Cunha 2016, 2018), T→DA receptor expression",
        magnitude:
          "Non mesure directement au niveau populationnel — infere a partir des correlats comportementaux",
      },
      {
        hormone: "Cortisol",
        mechanism: "Hyperactivation de l'axe HPA → elevation chronique du cortisol",
        behavioral:
          "Anxiete ↑, evitement social ↑, suppression de l'effet de la testosterone (hypothese de la double hormone)",
        evidence: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], meta n=8,538",
        magnitude:
          "Tendances du cortisol moins etudiees que la T — inferees a partir de l'augmentation des marqueurs de stress",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Oestrogene / Progesterone",
        mechanism:
          "VGCC ovarien → folliculogenese perturbee. Ca²⁺ des cellules de la granulosa → steroidogenese alteree.",
        behavioral:
          "Fluctuation de la libido ↑, dysregulation emotionnelle ↑, retrecissement de la fenetre de fertilite",
        evidence:
          "Yuksel 2016 : EMF → progesterone↓, oestrogene↓ chez les rates. Turedi 2016 : 900 MHz → reserve folliculaire ovarienne epuisee. PCOS : prevalence de 5–20 %, en augmentation.",
        magnitude:
          "AMH en declin chez les femmes plus jeunes (vieillissement ovarien precoce). Prevalence du PCOS en augmentation mondiale.",
      },
      {
        hormone: "Cortisol (amplifie)",
        mechanism:
          "Le cycle oestrogenique amplifie la reactivite de l'axe HPA. Puberte, menstruation, grossesse, perimenopause = fenetres de vulnerabilite.",
        behavioral:
          "Anxiete 2x la prevalence masculine. Depression 2x la prevalence masculine. Les deux en augmentation plus rapide chez les femmes.",
        evidence:
          "Multiples revues systematiques : femmes 2x anxiete, 2x depression. Fluctuation des hormones sexuelles → sensibilisation de l'axe HPA (Li & Graham 2017, Lancet Psychiatry). Differences sexuelles dans la neuroinflammation ([[ref:marano2026_female_neuroinflammation|PMC12843241, 2025]]).",
        magnitude:
          "La prevalence de la depression feminine augmente plus rapidement que celle des hommes depuis 2010 dans la plupart des pays.",
      },
      {
        hormone: "Ocytocine",
        mechanism:
          "EMF → tonus vagal ↓ → liberation d'ocytocine ↓. L'ocytocine regule : la confiance, l'attachement, l'empathie, le comportement maternel, la formation du lien de couple.",
        behavioral:
          "Confiance ↓, lien social ↓, attachement mere-enfant ↓, formation du lien de couple ↓, empathie ↓",
        evidence:
          "Ocytocine→attachement : Bosch & Neumann 2012, Numan & Young 2016. OT→confiance : Kosfeld 2005 (Nature). Edelman Trust Barometer 2025 : confiance institutionnelle a des niveaux historiquement bas.",
        magnitude:
          "L'OT au niveau populationnel n'est pas mesuree en routine. Inferee a partir des metriques de confiance, de l'epidemie de solitude (Murthy 2023), des difficultes d'attachement.",
      },
    ],

    s3title: "Le triple verrou",
    s3subtitle: "Suppression comportementale masculine",
    s3lead:
      "Sept essais controles randomises demontrent que la testosterone module de maniere causale des comportements essentiels a la structure sociale. Lorsque la testosterone decline a l'echelle de la population, ces comportements sont supprimes simultanement — creant un triple verrou sur l'initiative sociale masculine.",
    s3note:
      "Cette section documente le profil comportemental masculin. Le profil feminin est different — voir ci-dessous. Ensemble, ils produisent des effets composes qu'aucun des deux ne produit seul.",
    rcts: [
      {
        referenceId: "dreher2016",
        authors: "Dreher 2016",
        n: 121,
        design: "Gel de T vs placebo, fMRI",
        finding: "La testosterone a augmente le comportement de recherche de statut et modifie la signalisation de recompense striatale",
        behavioral: "Motivation de statut",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "Gel de T vs placebo, CRT",
        finding: "La testosterone a reduit la reflexion cognitive — augmente les reponses instinctives au detriment de la deliberation",
        behavioral: "Style cognitif",
      },
      {
        referenceId: "goetz2024",
        authors: "Goetz 2024",
        n: 139,
        design: "Gel de T vs placebo, interaction avec un complice",
        finding: "La testosterone a augmente la motivation sexuelle envers les partenaires potentiels en contexte social",
        behavioral: "Approche sexuelle",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "Gel de T vs placebo, taches comportementales",
        finding: "La testosterone a augmente la presentation authentique de soi ; reduit la gestion des impressions",
        behavioral: "Authenticite",
      },
      {
        authors: "Carre 2017",
        n: 308,
        design: "Gel de T vs placebo, paradigme d'agression",
        finding: "La testosterone a augmente l'agression reactive a la provocation, moderee par le cortisol",
        behavioral: "Reponse a la provocation",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "Gel de T vs placebo, jeu economique",
        finding: "La testosterone a augmente le favoritisme envers l'endogroupe et la discrimination envers l'exogroupe",
        behavioral: "Loyaute de groupe",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "Gel de T vs placebo, taches de competition",
        finding: "La testosterone a augmente la volonte de competition et la prise de risque en situation d'incertitude",
        behavioral: "Esprit de competition",
      },
    ],
    tripleLockExplain:
      "Lorsque la testosterone decline de ~40 % a l'echelle de la population ([[ref:santi2025|Santi 2025]], n=1,064,891), les sept comportements sont supprimes simultanement. L'ajout de l'elevation du cortisol (qui supprime davantage les effets de la T via l'hypothese de la double hormone) et du declin de la dopamine (qui reduit la sensibilite a la recompense) cree un triple verrou : l'infrastructure biologique de l'initiative sociale masculine est supprimee a trois noeuds independants.",

    s4title: "Le parallele feminin",
    s4lead:
      "Alors que les hommes subissent une suppression comportementale par le triple verrou (T↓ x cortisol↑ x dopamine↓), les femmes subissent une perturbation parallele mais distincte : une dysregulation emotionnelle par l'amplification du cortisol, une perturbation de l'attachement par le declin de l'ocytocine, et une alteration reproductive par la perturbation du Ca²⁺ ovarien.",
    s4note:
      "Les femmes ne sont pas « moins affectees » que les hommes par les EMF. Elles sont affectees differemment — et les effets specifiques aux femmes frappent les mecanismes qui maintiennent les structures sociales ensemble.",
    s4aTitle: "Amplification du cortisol",
    s4aBody:
      "Les femmes souffrent d'anxiete a un taux deux fois superieur a celui des hommes et de depression a un taux deux fois superieur. Ce n'est pas purement social. Le cycle oestrogenique amplifie la reactivite de l'axe HPA : a chaque cycle menstruel, grossesse et perimenopause, la reponse au cortisol est biologiquement amplifiee. L'hyperactivation de l'axe HPA induite par les EMF (voie D de BERM) touche donc les femmes plus durement que les hommes — non pas parce que la dose d'EMF est differente mais parce que l'amplificateur biologique (couplage oestrogene–HPA) est specifique aux femmes.",
    s4aPrediction:
      "A mesure que les EMF augmentent, l'ecart entre les sexes en matiere d'anxiete/depression devrait se creuser — et c'est le cas.",
    s4bTitle: "Ocytocine et cohesion sociale",
    s4bBody:
      "L'ocytocine regule la confiance, l'empathie, l'attachement maternel, la formation du lien de couple et la cooperation sociale. Elle est liberee par la stimulation du nerf vague, le contact physique, le contact visuel et l'allaitement. La voie D de BERM perturbe le tonus vagal → liberation d'ocytocine ↓. Au niveau individuel, cela reduit la capacite d'attachement. Au niveau populationnel, cela erode l'infrastructure de confiance dont les institutions ont besoin.",
    s4bData:
      "Edelman Trust Barometer 2025 : la confiance envers le gouvernement, les medias, les ONG et les employeurs a atteint des niveaux historiquement bas dans presque tous les segments demographiques. L'ancien chirurgien general des Etats-Unis Vivek Murthy a declare la solitude « crise de sante publique » en 2023.",
    s4bCaveat:
      "BERM ne pretend pas que les EMF sont la seule cause. Il propose que le declin de l'ocytocine fournit un substrat biologique qui rend les societes plus susceptibles a l'erosion de la confiance due a des causes sociales, economiques et technologiques.",
    s4cTitle: "Reserve ovarienne",
    s4cBody:
      "L'exposition prenatale a des EMF de 900 MHz a epuise la reserve folliculaire ovarienne chez les ratons — diminution des follicules primordiaux et tertiaires, augmentation des follicules atretiques, degenerescence folliculaire severe ([[ref:turedi2016_ovarian_reserve|Turedi 2016, PMID 27007703]]). L'exposition prolongee au telephone portable et au WiFi a reduit la progesterone et les oestrogenes plasmatiques chez les rates (Yuksel 2016). Le PCOS — la cause la plus frequente d'infertilite feminine — implique une perturbation mediee par les VGCC dans quatre organes simultanement (pancreas, ovaire, hypophyse, surrenale). La prevalence est en augmentation mondiale.",
    s4cNote:
      "La fenetre de fertilite des femmes est biologiquement fixe et non renouvelable. Contrairement aux spermatozoides (qui se regenerent en 74 jours), les ovocytes sont etablis avant la naissance et s'epuisent de maniere irreversible. Les dommages ovariens induits par les EMF sont donc cumulatifs et permanents d'une maniere qui ne s'applique pas aux dommages masculins.",

    svgSharedMechanism: "Meme mecanisme dans les deux sexes",
    svgMale: "MASCULIN",
    svgCortisolHpa: "Cortisol ↑ (HPA)",
    svgFemale: "FEMININ",
    svgCycle: "cycle",
    svgCortisolPP: "Cortisol ↑↑",
    svgVagal: "vagal",
    rctSampleSizes: "Tailles d'echantillon des RCT (total n = 1 297)",
    forestTotal: "Total",

    navBack: "Civilisation",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
    navPatopoliteia: "Patopoliteia",
    navBackDesc: "Le tableau civilisationnel complet",
    navPatopolisDesc: "Ce que cela cause au niveau urbain",
    navPatokratiaDesc: "Consequences politiques",
    navPatopoliteiaDesc: "Consequences civilisationnelles",
    sSantiContext: "",
    sRecoveryTitle: "",
    sRecoveryBody1: "",
    sRecoveryBody2: "",
    sEarlyPubertyTitle: "",
    sEarlyPubertyBody1: "",
    sEarlyPubertyBody2: "",
    sEarlyPubertyBody3: "",
    sEarlyPubertyChain: "",
  },
  ko: {
    title: "Pathopege",
    subtitle: "근원",
    heroLead:
      "모든 결과 -- 파탄 난 가정, 정치적 병리, 쇠퇴하는 제국 -- 는 하나의 메커니즘으로 거슬러 올라갑니다. 이 페이지는 그것을 기술합니다.",
    heroTrail:
      "EMF는 전위 의존성 칼슘 채널을 활성화합니다. 칼슘이 세포 내로 쏟아집니다. 하류 캐스케이드가 양성의 호르몬, 신경전달물질, 생식 생물학을 동시에 변화시킵니다. 이하는 문명 페이지에서 기술되는 모든 현상의 근본 원인입니다.",

    s2title: "두 가지 병행 교란",
    s2lead:
      "EMF → VGCC → Ca²⁺는 양성에서 동일한 메커니즘입니다. 그러나 내분비 체계가 다르기 때문에 하류 결과는 성별 특이적이며 상호보완적입니다.",
    s2glossary: "",
    maleTitle: "남성 교란 프로파일",
    malePrimary: "Testosterone ↓ (Cav3.2 → StAR)",
    maleSecondary: "Dopamine ↓ (VTA Cav1.3)",
    maleTertiary: "Cortisol ↑ (HPA 활성화)",
    maleReproductive:
      "정자: 농도 −62% ([[ref:levine2023_sperm|Levine 2023]]), DNA 단편화 ↑, 운동성 ↓. 테스토스테론이 정자 생성 역치 이하로 하락하는 시점은 ~2070년으로 추정.",
    femaleTitle: "여성 교란 프로파일",
    femalePrimary: "에스트로겐/프로게스테론 주기 교란",
    femaleSecondary: "Cortisol ↑↑ (에스트로겐 주기에 의해 증폭)",
    femaleTertiary: "Oxytocin ↓ (미주신경 경로)",
    femaleReproductive:
      "난소 예비력 조기 감소 (AMH↓). PCOS 유병률 증가 (5–20%). 자궁내막증이 가임기 여성의 10–15%에 영향. 난모세포 품질 저하 (ROS, 미토콘드리아 기능 장애).",

    maleConsequences: [
      {
        hormone: "Testosterone",
        mechanism: "Leydig 세포 Cav3.2 → StAR 단백질 ↓",
        behavioral:
          "지위 추구 ↓, 위험 감수 ↓, 성적 접근 ↓, 진정성 ↓, 집단 충성 ↓, 도발 반응 ↓",
        evidence:
          "7 RCTs ([[ref:dreher2016|Dreher 2016]], Nave 2018, [[ref:goetz2024|Goetz 2024]], Audience 2020, Carré 2017, Parochial 2015, Competition 2024)",
        magnitude:
          "1970년대 이후 ~40% 감소 ([[ref:santi2025|Santi 2025]], n=1,064,891)",
      },
      {
        hormone: "Dopamine",
        mechanism:
          "VTA Cav1.3 → DA 방출 ↓ + T↓ → DA 수용체 발현 ↓",
        behavioral:
          "동기 ↓, 보상 민감도 ↓, 혁신 ↓, 탐색 ↓, 무쾌감증 ↑",
        evidence:
          "NAc D2 광유전학 (Soares-Cunha 2016, 2018), T→DA 수용체 발현",
        magnitude:
          "인구 수준에서 직접 측정되지 않음 — 행동 상관물에서 추론됨",
      },
      {
        hormone: "Cortisol",
        mechanism: "HPA 축 과활성화 → 만성 코르티솔 상승",
        behavioral:
          "불안 ↑, 사회적 회피 ↑, 테스토스테론 효과 억제 (이중 호르몬 가설)",
        evidence: "[[ref:mehta2010_dual_hormone|Mehta & Josephs 2010]], 메타 n=8,538",
        magnitude:
          "코르티솔 추세는 T보다 연구가 적음 — 스트레스 지표 증가에서 추론됨",
      },
    ],
    femaleConsequences: [
      {
        hormone: "Estrogen / Progesterone",
        mechanism:
          "난소 VGCC → 난포 형성 교란. 과립막 세포 Ca²⁺ → 스테로이드 생성 변화.",
        behavioral:
          "리비도 변동 ↑, 정서 조절 장애 ↑, 가임 기간 축소",
        evidence:
          "Yüksel 2016: EMF → 프로게스테론↓, 에스트로겐↓ (쥐). Türedi 2016: 900 MHz → 난소 난포 저장량 고갈. PCOS: 유병률 5–20%, 증가 추세.",
        magnitude:
          "젊은 여성에서 AMH 감소 (난소 조기 노화). PCOS 유병률 전 세계적으로 증가 중.",
      },
      {
        hormone: "Cortisol (증폭)",
        mechanism:
          "에스트로겐 주기가 HPA 반응성을 증폭. 사춘기, 월경, 임신, 폐경 전후기 = 취약 기간.",
        behavioral:
          "불안 남성의 2배 유병률. 우울 남성의 2배 유병률. 양쪽 모두 여성에서 더 빠르게 증가.",
        evidence:
          "다수의 체계적 문헌고찰: 여성 불안 2배, 우울 2배. 성호르몬 변동 → HPA 민감화 (Li & Graham 2017, Lancet Psychiatry). 신경염증 성별 차이 ([[ref:marano2026_female_neuroinflammation|PMC12843241, 2025]]).",
        magnitude:
          "여성 우울 유병률이 대부분의 국가에서 2010년 이후 남성보다 빠르게 증가.",
      },
      {
        hormone: "Oxytocin",
        mechanism:
          "EMF → 미주신경 긴장도 ↓ → 옥시토신 방출 ↓. 옥시토신 조절 대상: 신뢰, 유대, 공감, 모성 행동, 짝결합 형성.",
        behavioral:
          "신뢰 ↓, 사회적 유대 ↓, 모자 애착 ↓, 짝결합 형성 ↓, 공감 ↓",
        evidence:
          "옥시토신→유대: Bosch & Neumann 2012, Numan & Young 2016. OT→신뢰: Kosfeld 2005 (Nature). Edelman Trust Barometer 2025: 기관 신뢰도 역대 최저.",
        magnitude:
          "인구 수준 OT는 일상적으로 측정되지 않음. 신뢰 지표, 외로움 전염병 (Murthy 2023), 유대 곤란에서 추론됨.",
      },
    ],

    s3title: "삼중 잠금",
    s3subtitle: "남성 행동 억제",
    s3lead:
      "7건의 무작위 대조 시험은 테스토스테론이 사회 구조에 필수적인 행동을 인과적으로 조절함을 입증합니다. 테스토스테론이 인구 전체에서 감소하면, 이러한 행동들이 동시에 억제되어 — 남성의 사회적 주도권에 대한 삼중 잠금이 만들어집니다.",
    s3note:
      "이 섹션은 남성 행동 프로파일을 기록합니다. 여성 프로파일은 다릅니다 — 아래를 참조하십시오. 함께 작용하면 어느 쪽 단독으로는 발생하지 않는 복합 효과를 만들어냅니다.",
    rcts: [
      {
        referenceId: "dreher2016",
        authors: "Dreher 2016",
        n: 121,
        design: "T 젤 vs 위약, fMRI",
        finding: "테스토스테론이 지위 추구 행동을 증가시키고 선조체 보상 신호를 변화시킴",
        behavioral: "지위 동기",
      },
      {
        authors: "Nave 2018",
        n: 243,
        design: "T 젤 vs 위약, CRT",
        finding: "테스토스테론이 인지적 숙고를 감소시킴 — 숙고보다 직감적 반응 증가",
        behavioral: "인지 스타일",
      },
      {
        referenceId: "goetz2024",
        authors: "Goetz 2024",
        n: 139,
        design: "T 젤 vs 위약, 연합자 상호작용",
        finding: "테스토스테론이 사회적 환경에서 잠재적 파트너에 대한 성적 동기를 증가시킴",
        behavioral: "성적 접근",
      },
      {
        authors: "Audience 2020",
        n: 166,
        design: "T 젤 vs 위약, 행동 과제",
        finding: "테스토스테론이 진정한 자기 표현을 증가시킴; 인상 관리 감소",
        behavioral: "진정성",
      },
      {
        authors: "Carré 2017",
        n: 308,
        design: "T 젤 vs 위약, 공격성 패러다임",
        finding: "테스토스테론이 도발에 대한 반응적 공격성을 증가시킴, 코르티솔에 의해 조절됨",
        behavioral: "도발 반응",
      },
      {
        authors: "Parochial 2015",
        n: 100,
        design: "T 젤 vs 위약, 경제 게임",
        finding: "테스토스테론이 내집단 편향과 외집단 차별을 증가시킴",
        behavioral: "집단 충성",
      },
      {
        authors: "Competition 2024",
        n: 220,
        design: "T 젤 vs 위약, 경쟁 과제",
        finding: "테스토스테론이 불확실성 하에서 경쟁 및 위험 감수 의지를 증가시킴",
        behavioral: "경쟁 의지",
      },
    ],
    tripleLockExplain:
      "테스토스테론이 인구 전체에서 ~40% 감소하면 ([[ref:santi2025|Santi 2025]], n=1,064,891), 7가지 행동 모두가 동시에 억제됩니다. 코르티솔 상승 (이중 호르몬 가설을 통해 T 효과를 추가로 억제)과 도파민 감소 (보상 민감도를 낮춤)를 더하면 삼중 잠금이 형성됩니다: 남성 사회적 주도권의 생물학적 인프라가 세 개의 독립적 노드에서 억제됩니다.",

    s4title: "여성의 병행 현상",
    s4lead:
      "남성이 삼중 잠금 (T↓ × cortisol↑ × dopamine↓)을 통해 행동 억제를 경험하는 반면, 여성은 병행하지만 구별되는 교란을 경험합니다: 코르티솔 증폭을 통한 정서 조절 장애, 옥시토신 감소를 통한 유대 교란, 난소 Ca²⁺ 교란을 통한 생식 손상.",
    s4note:
      "여성이 EMF에 의해 남성보다 \"영향을 덜 받는\" 것이 아닙니다. 다르게 영향을 받습니다 — 그리고 여성 특이적 효과는 사회 구조를 결속시키는 메커니즘을 타격합니다.",
    s4aTitle: "코르티솔 증폭",
    s4aBody:
      "여성은 남성의 2배 비율로 불안을 경험하고 2배 비율로 우울을 경험합니다. 이것은 순수하게 사회적 현상이 아닙니다. 에스트로겐 주기가 HPA 축 반응성을 증폭합니다: 각 월경 주기, 임신, 폐경 전후기 동안 코르티솔 반응이 생물학적으로 높아집니다. EMF에 의한 HPA 과활성화 (BERM 경로 D)는 따라서 여성에게 남성보다 더 크게 영향을 미칩니다 — EMF 용량이 다르기 때문이 아니라 생물학적 증폭기 (에스트로겐–HPA 결합)가 여성 특이적이기 때문입니다.",
    s4aPrediction:
      "EMF가 증가하면, 여성 불안/우울 성별 격차가 벌어져야 합니다 — 실제로 그렇습니다.",
    s4bTitle: "옥시토신과 사회적 결속",
    s4bBody:
      "옥시토신은 신뢰, 공감, 모성 유대, 짝결합 형성, 사회적 협력을 조절합니다. 미주신경 자극, 신체 접촉, 눈 맞춤, 모유 수유를 통해 분비됩니다. BERM 경로 D는 미주신경 긴장도를 교란합니다 → 옥시토신 방출 ↓. 개인 수준에서 이것은 유대 능력을 감소시킵니다. 인구 수준에서는 기관이 필요로 하는 신뢰의 인프라를 잠식합니다.",
    s4bData:
      "Edelman Trust Barometer 2025: 정부, 미디어, NGO, 고용주에 대한 신뢰가 거의 모든 인구 집단에서 역대 최저에 도달. 전 미국 공중위생국장 Vivek Murthy가 2023년 외로움을 \"공중보건 위기\"로 선언.",
    s4bCaveat:
      "BERM은 EMF가 유일한 원인이라고 주장하지 않습니다. 옥시토신 감소가 사회, 경제적, 기술적 원인으로 인한 신뢰 잠식에 사회를 더 취약하게 만드는 생물학적 기반을 제공한다고 제안합니다.",
    s4cTitle: "난소 예비력",
    s4cBody:
      "태아기 900 MHz EMF 노출이 쥐 새끼의 난소 난포 저장량을 고갈시킴 — 원시 및 3차 난포 감소, 폐쇄 난포 증가, 심각한 난포 퇴행 ([[ref:turedi2016_ovarian_reserve|Türedi 2016, PMID 27007703]]). 장기간 휴대전화 및 WiFi 노출이 암컷 쥐의 혈장 프로게스테론과 에스트로겐을 감소시킴 (Yüksel 2016). PCOS — 여성 불임의 가장 흔한 원인 — 는 4개 기관에서 동시에 VGCC 매개 교란을 수반합니다 (췌장, 난소, 뇌하수체, 부신). 유병률이 전 세계적으로 증가 중.",
    s4cNote:
      "여성의 가임 기간은 생물학적으로 고정되어 있으며 재생 불가능합니다. 74일마다 재생되는 정자와 달리, 난모세포는 출생 전에 확립되며 비가역적으로 감소합니다. 따라서 EMF에 의한 난소 손상은 남성 손상과 달리 누적적이고 영구적입니다.",

    svgSharedMechanism: "양성에서 동일한 메커니즘",
    svgMale: "남성",
    svgCortisolHpa: "Cortisol ↑ (HPA)",
    svgFemale: "여성",
    svgCycle: "주기",
    svgCortisolPP: "Cortisol ↑↑",
    svgVagal: "미주신경",
    rctSampleSizes: "RCT 표본 크기 (총 n = 1,297)",
    forestTotal: "합계",

    navBack: "문명",
    navPatopolis: "Patopolis",
    navPatokratia: "Patokratia",
    navPatopoliteia: "Patopoliteia",
    navBackDesc: "문명의 전체상",
    navPatopolisDesc: "도시 수준에서의 결과",
    navPatokratiaDesc: "정치적 결과",
    navPatopoliteiaDesc: "문명적 결과",
    sSantiContext: "",
    sRecoveryTitle: "",
    sRecoveryBody1: "",
    sRecoveryBody2: "",
    sEarlyPubertyTitle: "",
    sEarlyPubertyBody1: "",
    sEarlyPubertyBody2: "",
    sEarlyPubertyBody3: "",
    sEarlyPubertyChain: "",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Pathopege — The Source | BERM",
      description: "The biological root cause of civilizational decline: how EMF degrades reproductive biology through VGCC-mediated calcium influx in both sexes simultaneously.",
    },
    fi: {
      title: "Pathopege — Lähde | BERM",
      description: "Sivilisaation rappeutumisen biologinen juurisyy: miten EMF heikentää lisääntymisbiologiaa VGCC-välitteisen kalsiumin sisäänvirtauksen kautta molemmilla sukupuolilla samanaikaisesti.",
    },
    ja: {
      title: "Pathopege — 源泉 | BERM",
      description: "文明衰退の生物学的根本原因：EMFがVGCC媒介カルシウム流入を通じて両性の生殖生物学を同時に劣化させるメカニズム。",
    },
    fr: {
      title: "Pathopege — La Source | BERM",
      description: "La cause biologique profonde du declin civilisationnel : comment les EMF degradent la biologie reproductive par l'influx calcique medie par les VGCC dans les deux sexes simultanement.",
    },
    ko: {
      title: "Pathopege — 근원 | BERM",
      description: "문명 쇠퇴의 생물학적 근본 원인: EMF가 VGCC 매개 칼슘 유입을 통해 양성의 생식 생물학을 동시에 저하시키는 메커니즘.",
    },
  };
  const m = meta[locale] || meta.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
    },
  };
}

export default async function PathopegePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <header className="mt-8 mb-14">
        <p className="text-muted-foreground/50 text-xs font-medium tracking-[0.2em] uppercase mb-3">
          Pathopege
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-[-0.02em] leading-[1.12] mb-2">
          {d.title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-4">
          {d.subtitle}
        </p>
      </header>

      {/* Lead */}
      <section className="mb-16 max-w-3xl">
        <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-5 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
          {d.heroLead}
        </p>
        <p className="text-base leading-relaxed text-foreground-muted">
          {d.heroTrail}
        </p>
      </section>

      {/* S2: Two Parallel Disruptions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          {d.s2title}
        </h2>
        <p className="text-muted-foreground mb-4">{d.s2lead}</p>
        {d.s2glossary && (
          <div className="mb-8 rounded-lg border border-muted bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">{d.s2glossary}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Male */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              {d.maleTitle}
            </h3>
            <ul className="space-y-1 text-sm mb-4">
              <li><span className="font-mono text-blue-400">1.</span> {d.malePrimary}</li>
              <li><span className="font-mono text-blue-400">2.</span> {d.maleSecondary}</li>
              <li><span className="font-mono text-blue-400">3.</span> {d.maleTertiary}</li>
            </ul>
            {d.maleConsequences.map((c: { hormone: string; mechanism: string; behavioral: string; evidence: string; magnitude: string }, i: number) => (
              <div key={i} className="mt-4 border-t border-blue-500/20 pt-3">
                <p className="font-semibold text-sm">{c.hormone}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Mechanism:</span>{" "}
                  <InlineReferenceText text={c.mechanism} locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Behavioral:</span> {c.behavioral}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Evidence:</span>{" "}
                  <InlineReferenceText text={c.evidence} locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Magnitude:</span>{" "}
                  <InlineReferenceText text={c.magnitude} locale={locale} />
                </p>
              </div>
            ))}
            {d.sSantiContext && (
            <div className="rounded-lg border border-card-border bg-card-bg p-3 my-4 max-w-4xl">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <InlineReferenceText text={d.sSantiContext} locale={locale} />
              </p>
            </div>
            )}
            <div className="mt-4 rounded-lg bg-blue-500/10 p-3">
              <p className="text-xs font-medium">
                <InlineReferenceText text={d.maleReproductive} locale={locale} />
              </p>
            </div>
          </div>

          {/* Female */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-rose-400">
              {d.femaleTitle}
            </h3>
            <ul className="space-y-1 text-sm mb-4">
              <li><span className="font-mono text-rose-400">1.</span> {d.femalePrimary}</li>
              <li><span className="font-mono text-rose-400">2.</span> {d.femaleSecondary}</li>
              <li><span className="font-mono text-rose-400">3.</span> {d.femaleTertiary}</li>
            </ul>
            {d.femaleConsequences.map((c: { hormone: string; mechanism: string; behavioral: string; evidence: string; magnitude: string }, i: number) => (
              <div key={i} className="mt-4 border-t border-rose-500/20 pt-3">
                <p className="font-semibold text-sm">{c.hormone}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Mechanism:</span>{" "}
                  <InlineReferenceText text={c.mechanism} locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Behavioral:</span> {c.behavioral}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Evidence:</span>{" "}
                  <InlineReferenceText text={c.evidence} locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Magnitude:</span>{" "}
                  <InlineReferenceText text={c.magnitude} locale={locale} />
                </p>
              </div>
            ))}
            <div className="mt-4 rounded-lg bg-rose-500/10 p-3">
              <p className="text-xs font-medium">{d.femaleReproductive}</p>
            </div>
          </div>
        </div>

        {/* Early Puberty */}
        {d.sEarlyPubertyBody1 && (
        <div className="mb-8 max-w-4xl">
          <h4 className="text-sm font-semibold mb-3">{d.sEarlyPubertyTitle}</h4>
          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>{d.sEarlyPubertyBody1}</p>
            <p>{d.sEarlyPubertyBody2}</p>
            <p>{d.sEarlyPubertyBody3}</p>
            <p className="font-medium text-sm">{d.sEarlyPubertyChain}</p>
          </div>
        </div>
        )}

        {/* Butterfly/Mirror Chart: Sex-specific disruptions from shared mechanism */}
        <div className="mt-8">
          <svg viewBox="0 0 680 240" className="w-full max-w-2xl mx-auto" role="img" aria-label="Butterfly chart showing sex-specific disruptions from shared EMF mechanism">
            {/* Center mechanism box */}
            <rect x="220" y="6" width="240" height="52" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <text x="340" y="27" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="700">EMF → VGCC → Ca²⁺</text>
            <text x="340" y="46" textAnchor="middle" fill="currentColor" fillOpacity="0.45" fontSize="10">{d.svgSharedMechanism}</text>

            {/* Branch curves from center to sides */}
            <path d="M220,35 Q170,35 130,80" stroke="#3b82f6" strokeWidth="2" fill="none" strokeOpacity="0.5" />
            <path d="M460,35 Q510,35 550,80" stroke="#f43f5e" strokeWidth="2" fill="none" strokeOpacity="0.5" />

            {/* Male header */}
            <text x="120" y="78" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700" letterSpacing="0.08em">{d.svgMale}</text>

            {/* Male disruption boxes */}
            <rect x="16" y="90" width="208" height="34" rx="6" fill="#3b82f6" fillOpacity="0.13" stroke="#3b82f6" strokeOpacity="0.35" strokeWidth="1" />
            <text x="120" y="112" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="600">T ↓ (Cav3.2 → StAR)</text>

            <rect x="16" y="132" width="208" height="34" rx="6" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeOpacity="0.22" strokeWidth="1" />
            <text x="120" y="154" textAnchor="middle" fill="#3b82f6" fontSize="12">DA ↓ (VTA Cav1.3)</text>

            <rect x="16" y="174" width="208" height="34" rx="6" fill="#3b82f6" fillOpacity="0.05" stroke="#3b82f6" strokeOpacity="0.15" strokeWidth="1" />
            <text x="120" y="196" textAnchor="middle" fill="#3b82f6" fontSize="12">{d.svgCortisolHpa}</text>

            {/* Female header */}
            <text x="560" y="78" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="700" letterSpacing="0.08em">{d.svgFemale}</text>

            {/* Female disruption boxes */}
            <rect x="456" y="90" width="208" height="34" rx="6" fill="#f43f5e" fillOpacity="0.13" stroke="#f43f5e" strokeOpacity="0.35" strokeWidth="1" />
            <text x="560" y="112" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="600">E/P {d.svgCycle} ↓</text>

            <rect x="456" y="132" width="208" height="34" rx="6" fill="#f43f5e" fillOpacity="0.08" stroke="#f43f5e" strokeOpacity="0.22" strokeWidth="1" />
            <text x="560" y="154" textAnchor="middle" fill="#f43f5e" fontSize="12">{d.svgCortisolPP}</text>

            <rect x="456" y="174" width="208" height="34" rx="6" fill="#f43f5e" fillOpacity="0.05" stroke="#f43f5e" strokeOpacity="0.15" strokeWidth="1" />
            <text x="560" y="196" textAnchor="middle" fill="#f43f5e" fontSize="12">OT ↓ ({d.svgVagal})</text>

            {/* Center spine dashed line */}
            <line x1="340" y1="62" x2="340" y2="230" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 3" />
          </svg>
        </div>
      </section>

      {/* S3: Triple Lock */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-500" />
          {d.s3title}
        </h2>
        <p className="text-sm text-muted-foreground/70 mb-2">{d.s3subtitle}</p>
        <p className="text-muted-foreground mb-4">{d.s3lead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-6">
          {d.s3note}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold">RCT</th>
                <th className="text-left py-2 px-3 font-semibold">n</th>
                <th className="text-left py-2 px-3 font-semibold">Design</th>
                <th className="text-left py-2 px-3 font-semibold">Finding</th>
                <th className="text-left py-2 px-3 font-semibold">Behavior</th>
              </tr>
            </thead>
            <tbody>
              {d.rcts.map((r: { referenceId?: string; authors: string; n: number; design: string; finding: string; behavioral: string }, i: number) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-xs whitespace-nowrap">
                    {r.referenceId ? (
                      <CitationLink citation={r.authors} referenceId={r.referenceId} locale={locale} />
                    ) : (
                      r.authors
                    )}
                  </td>
                  <td className="py-2 px-3 text-xs">{r.n}</td>
                  <td className="py-2 px-3 text-xs">{r.design}</td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">
                    {r.finding}
                  </td>
                  <td className="py-2 px-3 text-xs font-medium">{r.behavioral}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Forest Plot: RCT sample sizes */}
        <div className="mt-6 mb-2">
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{d.rctSampleSizes}</p>
          <svg viewBox="0 0 520 236" className="chart-svg w-full max-w-xl" role="img" aria-label="Forest plot of 7 RCTs">
            {/* Study rows */}
            {[
              { name: "Dreher 2016", n: 121 },
              { name: "Nave 2018", n: 243 },
              { name: "Goetz 2024", n: 139 },
              { name: "Audience 2020", n: 166 },
              { name: "Carré 2017", n: 308 },
              { name: "Parochial 2015", n: 100 },
              { name: "Competition 2024", n: 220 },
            ].map((study, i) => {
              const y = 10 + i * 28;
              const barWidth = (study.n / 308) * 220;
              return (
                <g key={i}>
                  <text x="130" y={y + 16} textAnchor="end" fill="currentColor" fillOpacity="0.7" fontSize="11" fontFamily="monospace">{study.name}</text>
                  <rect x="140" y={y + 4} width={barWidth} height="16" rx="3" fill="#3b82f6" fillOpacity="0.6" />
                  <text x={148 + barWidth} y={y + 16} fill="currentColor" fillOpacity="0.5" fontSize="10" fontFamily="monospace">n={study.n}</text>
                </g>
              );
            })}
            {/* Total bar */}
            <line x1="140" y1="204" x2="460" y2="204" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
            <text x="130" y="218" textAnchor="end" fill="currentColor" fontSize="11" fontWeight="700" fontFamily="monospace">{d.forestTotal}</text>
            <text x="140" y="218" fill="#3b82f6" fontSize="11" fontWeight="700" fontFamily="monospace">n = 1,297</text>
          </svg>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          <InlineReferenceText text={d.tripleLockExplain} locale={locale} />
        </p>
      </section>

      {/* S4: Female Parallel */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          {d.s4title}
        </h2>
        <p className="text-muted-foreground mb-2">{d.s4lead}</p>
        <p className="text-sm italic text-muted-foreground/80 mb-8">
          {d.s4note}
        </p>

        {/* 4A: Cortisol */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4aTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s4aBody}</p>
          <p className="text-sm font-medium text-amber-500">{d.s4aPrediction}</p>
        </div>

        {/* 4B: Oxytocin */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4bTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">{d.s4bBody}</p>
          <p className="text-sm text-muted-foreground mb-3">{d.s4bData}</p>
          <p className="text-xs italic text-muted-foreground/80">{d.s4bCaveat}</p>
        </div>

        {/* 4C: Ovarian */}
        <div className="mb-8 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-3">{d.s4cTitle}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            <InlineReferenceText text={d.s4cBody} locale={locale} />
          </p>
          <div className="rounded-lg bg-rose-500/10 p-3 mt-3">
            <p className="text-xs font-medium">{d.s4cNote}</p>
          </div>
        </div>
      </section>

      {/* Recovery Evidence */}
      {d.sRecoveryBody1 && (
      <section className="mb-16 border-t editorial-rule pt-8">
        <h2 className="text-2xl font-bold mb-4">{d.sRecoveryTitle}</h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-4xl">
          <p>
            <InlineReferenceText text={d.sRecoveryBody1} locale={locale} />
          </p>
          <p className="font-medium">{d.sRecoveryBody2}</p>
        </div>
      </section>
      )}

      {/* Navigation */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href={`/${locale}/civilization`}
            className="group rounded-xl border p-5 hover:border-foreground/20 transition-colors"
          >
            <p className="text-sm font-semibold mb-1 group-hover:underline">{d.navBack}</p>
            <p className="text-xs text-muted-foreground">{d.navBackDesc}</p>
          </Link>
          <Link
            href={`/${locale}/civilization/patopolis`}
            className="group rounded-xl border p-5 hover:border-foreground/20 transition-colors"
          >
            <p className="text-sm font-semibold mb-1 flex items-center gap-1 group-hover:underline">
              {d.navPatopolis} <ArrowRight className="w-3 h-3" />
            </p>
            <p className="text-xs text-muted-foreground">{d.navPatopolisDesc}</p>
          </Link>
          <Link
            href={`/${locale}/civilization/patokratia`}
            className="group rounded-xl border p-5 hover:border-foreground/20 transition-colors"
          >
            <p className="text-sm font-semibold mb-1 flex items-center gap-1 group-hover:underline">
              {d.navPatokratia} <ArrowRight className="w-3 h-3" />
            </p>
            <p className="text-xs text-muted-foreground">{d.navPatokratiaDesc}</p>
          </Link>
          <Link
            href={`/${locale}/civilization/patopoliteia`}
            className="group rounded-xl border p-5 hover:border-foreground/20 transition-colors"
          >
            <p className="text-sm font-semibold mb-1 flex items-center gap-1 group-hover:underline">
              {d.navPatopoliteia} <ArrowRight className="w-3 h-3" />
            </p>
            <p className="text-xs text-muted-foreground">{d.navPatopoliteiaDesc}</p>
          </Link>
        </div>
      </section>

      </div>
    </main>
  );
}
