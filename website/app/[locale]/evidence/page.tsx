import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ShieldQuestion,
  Eye,
  Leaf,
  Zap,
  Pill,
  Lightbulb,
  Activity,
  Brain,
  Moon,
  BarChart3,
  Compass,
  TreePine,
  Dna,
  ShieldCheck,
  Users,
  Scale,
  FlaskConical,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import { EvidenceClassification } from "@/components/EvidenceClassification";
import { HindcastValidation } from "@/components/HindcastValidation";
import { ReferencesSummary } from "@/components/ReferencesSummary";
import { RetrodictionCards } from "@/components/RetrodictionCards";
import { DiseaseCascadeTimeline } from "@/components/DiseaseCascadeTimeline";
import { DifferentialSusceptibility } from "@/components/DifferentialSusceptibility";
import {
  causalNodeLabels,
  FIELDSTATE_EVIDENCE,
  FIELDSTATE_EVIDENCE_COUNT,
  type FieldStateDirectness,
  LEGACY_EVIDENCE_CATALOGUE,
  LEGACY_EVIDENCE_COUNT,
  PATHWAY_LABELS,
  STATUS_LABELS,
  EVIDENCE_LEVEL_LABELS,
} from "@/lib/evidence";
import { PATHWAY_ORDER, CHANNEL_GROUPS } from "@/lib/channelGroups";
import { ORPHANED_FINDINGS, ORPHANED_COMMENTARY } from "@/lib/orphanedFindings";
import { RESEARCH_DOMAINS } from "@/lib/researchDomains";

const ORDER: FieldStateDirectness[] = [
  "PHYSICS_SIGNATURE",
  "MECHANISTIC_INTERMEDIATE",
  "REPRODUCTIVE_ENDPOINT",
  "ECOLOGICAL_ENDPOINT",
  "SYSTEMATIC_REVIEW",
  "POPULATION_DESCRIPTIVE",
];

const COPY = {
  en: {
    title: "Evidence register",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} bounded BERM v17 records and ${LEGACY_EVIDENCE_COUNT} extended catalogue entries across 13+ pathways and 490+ peer-reviewed studies.`,
    interpretationTitle: "How to read this register",
    interpretation: [
      "A field signature can support a measurement variable such as background vector, angle, spectrum or envelope; it does not establish human fertility effects.",
      "A cellular or animal experiment can support a mechanistic intermediate or organ endpoint within its stated conditions; it is not automatically a human population estimate.",
      "A review locates a body of literature. A population timing result is descriptive unless matched FieldState, endpoint and confounding controls are present.",
      "No record below is a TFR coefficient. A country TFR pathway requires the separate ASFR and demographic terms in the model specification.",
    ],
    boundedTitle: "Bounded v2 records",
    boundedLead: "Each record states its field class, directness, translation scope and limitation. These are the primary evidence entries for the BERM v17 causal route.",
    classificationTitle: "How previously negative findings classify",
    channelGroupTitle: "Three frequency channels",
    channelGroupLead: "Each biological pathway maps to one of three frequency channels, defined by two biological cutoffs: f_c ~ 1 kHz (membrane RC) and f_RPM ~ 1 MHz (radical pair coherence).",
    extendedTitle: "Extended evidence catalogue",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} additional records from the BERM v17 bibliography, retained for source-level review. Each is classified by its legacy pathway, evidence level, and migration status.`,
    groups: {
      PHYSICS_SIGNATURE: "Physics signatures",
      MECHANISTIC_INTERMEDIATE: "Mechanistic intermediates",
      REPRODUCTIVE_ENDPOINT: "Reproductive endpoints",
      ECOLOGICAL_ENDPOINT: "Ecological endpoints",
      SYSTEMATIC_REVIEW: "Systematic reviews",
      POPULATION_DESCRIPTIVE: "Population-descriptive data",
    },
    fields: { nodes: "Causal nodes", field: "Field class", scope: "Translation scope", limitations: "Limitations", role: "Calibration role", source: "DOI / source" },
    structural: "Structural only",
    contextual: "Context only",
    sentinelTitle: "Sentinel and cross-species evidence",
    sentinel: "The Cross-Species Lag Index is a readiness protocol for joining regional outcomes, measured FieldState and endpoint covariates in a registered cross-species test.",
    sentinelLink: "View sentinel readiness",
    extPathway: "Pathway",
    extLevel: "Evidence level",
    extStatus: "Migration status",
    extScope: "Translation scope",
    extN: "N",
    dualInterpretationTitle: "Reading evidence: Standard vs. BERM interpretation",
    dualInterpretationLead: "The same study can support opposite conclusions depending on which biases are assumed. This table shows how standard and BERM-corrected frameworks read the same evidence types.",
    dualInterpretationHeaders: { evidence: "Evidence type", standard: "Standard interpretation", berm: "BERM interpretation" },
    dualInterpretationRows: [
      {
        evidence: "Study finds no significant EMF effect",
        standard: "EMF is safe at tested levels. No biological mechanism.",
        berm: "Control group is contaminated (lab baseline bias). Attenuation bias reduces apparent effect. Null result is expected if true zero-exposure control is absent.",
      },
      {
        evidence: "Study finds EMF effect at high SAR only",
        standard: "Effect is thermal. Confirms ICNIRP thresholds.",
        berm: "Dose-response curve may have a window effect (Adey/Blackman). Effect at high SAR does not exclude effect at low SAR — non-monotonic responses are predicted by RPM.",
      },
      {
        evidence: "WHO systematic review rates certainty as 'moderate'",
        standard: "Evidence is moderate. More RCTs needed.",
        berm: "WHO's methodology is subject to 15+ identified biases that all attenuate apparent effect. 'Moderate' in a bias-afflicted framework may correspond to 'high' in a bias-corrected framework.",
      },
      {
        evidence: "GDP correlates with TFR better than EMF proxy",
        standard: "GDP/development is the real driver. EMF is a proxy for development.",
        berm: "GDP is a 'bad control' (Pearl 2009): electrification causes both GDP and EMF. Controlling for GDP removes the causal effect of interest (included mediator bias).",
      },
      {
        evidence: "Study shows positive EMF effect (e.g. ROS increase)",
        standard: "Interesting but needs replication. Effect size may be small.",
        berm: "Effect size is underestimated due to lab baseline bias. True effect relative to unexposed baseline is larger than reported.",
      },
      {
        evidence: "RPM cannot explain effects at telecom frequencies",
        standard: "CRY/RPM pathway is irrelevant for mobile phones.",
        berm: "Correct for RF carrier. But telecom signals contain ELF modulation (GSM 217 Hz) within RPM's resonance range. RPM responds to modulation envelope, not carrier. Electric field effects are mediated by pathway A (VGIC).",
      },
      {
        evidence: "TFR prediction CI exceeded",
        standard: "Model is wrong. Predictions failed.",
        berm: "Three possibilities: (a) model overestimates, (b) exogenous compensation (immigration, IVF, policy), (c) CI too narrow. Discriminating tests exist for each.",
      },
    ],
    theraBionicTitle: "Clinical Validation: TheraBionic",
    theraBionicLead: "An FDA-approved medical device confirms the core BERM mechanism at exposure levels far below current safety standards.",
    theraBionicBody: "The TheraBionic P1 is an FDA-approved medical device (HDE H220001, 2019) that treats advanced hepatocellular carcinoma (liver cancer) using amplitude-modulated radiofrequency electromagnetic fields at 27.12 MHz.",
    theraBionicMechanism: "The device operates through the EXACT mechanism BERM describes: non-thermal EMF → Cav3.2 T-type voltage-gated calcium channel → Ca²⁺ influx → biological effect (tumor cell differentiation). This was demonstrated by Jimenez et al. (2019) in eBioMedicine/Lancet.",
    theraBionicSAR: "The device operates at SAR levels 100–1,000× BELOW mobile phone exposure. This confirms that non-thermal EMF can produce significant biological effects through voltage-gated calcium channels at exposure levels far below current safety standards (ICNIRP/FCC).",
    theraBionicCCB: "The FDA labeling explicitly states TheraBionic should not be used with calcium channel blockers — a pharmacological confirmation that the therapeutic effect operates through calcium channels.",
    theraBionicImplication: "This is not a BERM prediction. It is an independently developed, clinically validated, FDA-approved confirmation that non-thermal EMF produces biological effects through voltage-gated calcium channels.",
    theraBionicSurvival: "34% survival increase in advanced HCC",
    theraBionicDevice: "27.12 MHz AM-RF, tumor-specific frequencies",
    theraBionicChannel: "Cav3.2 (CACNA1H) T-type VGCC",
    theraBionicLevel: "E — FDA-approved, peer-reviewed (Lancet/eBioMedicine)",
    tDeclineTitle: "Testosterone Decline: Cross-Country Evidence",
    tDeclineLead: "Age-independent secular testosterone decline is documented in five countries across four continents. The pattern is consistent: ~1%/year decline independent of aging, BMI trends, or lifestyle confounders. Critically, studies that found 'no decline' after BMI adjustment are consistent with the mediator model: BMI is on the causal pathway, not an independent confounder, so adjusting for it removes real signal.",
    tDeclineStudies: [
      { country: "USA", study: "Travison et al. 2007 (MMAS)", n: "1,532", rate: "−1.0%/yr", finding: "Population-level T decline 1987–2004. Age-independent: a 65-year-old in 2002 had lower T than a 65-year-old in 1987. BMI-adjusted — captures direct pathway only.", tier: "strong" as const, bmiIndependent: true },
      { country: "USA", study: "Mazur et al. 2013 (PLOS ONE)", n: "991", rate: "−0.95%/yr", finding: "Weight-stable US Air Force veterans lost 117 ng/dL (19%) over 20 years. Excludes obesity as sufficient explanation — the 'smoking gun' for the mediator interpretation.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { country: "Finland", study: "Perheentupa et al. 2013", n: "3,271", rate: "−1.2%/yr", finding: "37% cohort-dependent T decline (1972–2002). LH and FSH also declined in later cohorts. Finland's TFR collapsed 35 years later.", tier: "strong" as const, bmiIndependent: true },
      { country: "Israel", study: "Chodick et al. 2020", n: "102,334", rate: "−1.02%/yr", finding: "Largest single study: 102k men, Maccabi Healthcare. 'Unlikely explained by increasing obesity.' T declining despite Israel's high TFR — Phase 1 of the threshold model.", tier: "strong" as const, bmiIndependent: true },
      { country: "Global", study: "Santi et al. 2025 (meta-analysis)", n: "1,064,891", rate: "p = 0.033", finding: "Largest meta-analysis ever. Both T AND LH declining independent of age, BMI, and assay method. No BMI temporal trend in this population. 'Ongoing resetting of HPG function.' First to confirm simultaneous T + LH decline.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { country: "Denmark", study: "Andersson et al. 2007", n: "5,350", rate: "null after BMI", finding: "Decline disappeared after BMI adjustment. BERM interpretation: mediated pathway dominates in this population — BMI adjustment removes the dominant signal. Consistent with mediator model, not a contradiction.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Supports mediator hypothesis: when BMI pathway dominates, BMI-adjustment produces null." },
      { country: "USA", study: "Nyante et al. 2012 (NHANES)", n: "2,315", rate: "no decline found", finding: "NHANES 1988–2004. No decline found. May reflect assay change + mediator removal. Does not contradict Travison — different population, different assay, different adjustment strategy.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Consistent with mediator model in specific subpopulation." },
    ],
    tDeclineImplication: "If testosterone continues declining at current rates, every country will eventually cross the biological threshold where subfertility becomes the binding constraint on TFR — regardless of cultural or economic factors.",
    tDeclineBmiNote: "Why 'null' results are not contradictions: BMI can be either a confounder (independent cause) or a mediator (on the causal pathway). If EMF simultaneously drives both BMI increase and T decline, then BMI is a mediator and adjusting for it removes real signal. Mazur 2013 demonstrates this: weight-stable men still lost 19% of their testosterone. The direct pathway accounts for approximately two-thirds of the total decline; the mediated pathway (via BMI) accounts for approximately one-third.",
    tDeclineLink: "Full threshold model specification",
    tDeclinePredLink: "T→TFR predictions",

    metabTitle: "Metabolic Syndrome: Six Converging Pathways",
    metabLead: "Six independent EMF → Ca²⁺ pathways simultaneously increase energy intake, decrease energy expenditure, and increase energy storage. CaMKII is the convergence molecule connecting all pathways. Obesity is multifactorial — EMF is ONE contributing factor explaining the residual that diet, exercise, and genetics alone cannot account for.",
    metabStudies: [
      { authors: "Alshammari et al.", year: 2022, journal: "Nutrients", finding: "RF-EMF → hypothalamic disruption → food intake ↑ in humans and rats", mechanism: "1: Appetite", level: "E" },
      { authors: "Chen et al.", year: 2016, journal: "eLife", finding: "Ca²⁺ activation of ARC glia → AgRP/NPY ↑ → food intake ↑ (direct Ca²⁺→appetite link)", mechanism: "1: Appetite", level: "E" },
      { authors: "Maalouf et al.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT thermogenesis ↓, mitochondrial activity ↓ (dose-response)", mechanism: "2: BAT", level: "E" },
      { authors: "French group", year: 2025, journal: "IJMS", finding: "5G (3.5 GHz) → PRDM16 −49%, C/EBPβ −32% (brown adipogenesis markers)", mechanism: "2: BAT", level: "E" },
      { authors: "Bhatt et al.", year: 2012, journal: "PLoS ONE", finding: "GLP-1 activates ERK via L-type VGCC Ca²⁺ microdomain in β-cells", mechanism: "3: Insulin", level: "E" },
      { authors: "Matsui et al.", year: 2011, journal: "Hypertension Res", finding: "Nifedipine (L-type blocker) → weight ↓, PGC-1α ↑ (inverse pharmacological test)", mechanism: "Inverse", level: "E" },
      { authors: "Haghjoo et al.", year: 2022, journal: "BMC Primary Care", finding: "44 studies: screen time → overweight OR 1.273 (dose-response)", mechanism: "All", level: "E" },
      { authors: "Klimentidis et al.", year: 2010, journal: "Proc R Soc B", finding: "24 populations, 8 species, >20,000 animals ALL gaining weight (p = 1.2×10⁻⁷)", mechanism: "All", level: "E" },
    ],
    metabKlimentidisTitle: "The Klimentidis Paradox",
    metabKlimentidisP1: "Laboratory animals on controlled diets have been gaining weight for decades. Wild rats in cities are getting fatter. Pet dogs and cats show the same trend. The probability of this occurring by chance across 24 populations and 8 species is p = 1.2 × 10⁻⁷.",
    metabKlimentidisP2: "Diet is controlled out (lab animals). Exercise is controlled out (lab animals). Genetics are controlled out (inbred strains). Endocrine disruptors (BPA, phthalates) are possible but do not explain wild rats AND lab animals AND pets simultaneously. The only environmental factor that has increased across ALL of these environments is electromagnetic field exposure.",
    metabKlimentidisNote: "Klimentidis et al. did NOT study EMF. The researchers suggested \"as-of-yet unidentified factors.\" The EMF interpretation is BERM's derivation, not theirs.",
    metabModelLink: "CaMKII convergence model",
    metabPredLink: "Metabolic predictions",
  },
  fi: {
    title: "Evidenssirekisteri",
    subtitle: `${FIELDSTATE_EVIDENCE_COUNT} rajattua BERM v17 -tietuetta ja ${LEGACY_EVIDENCE_COUNT} laajennetun katalogin tietuetta 13+ polulla ja 490+ vertaisarvioidussa tutkimuksessa.`,
    interpretationTitle: "Kuinka rekisteriä luetaan",
    interpretation: [
      "Kenttäallekirjoitus voi tukea mittausmuuttujaa, kuten taustavektoria, kulmaa, spektriä tai verhokäyrää; se ei osoita ihmisen hedelmällisyysvaikutusta.",
      "Solu- tai eläinkoe voi tukea mekanistista väliporrasta tai elinpäätepistettä omissa oloissaan; se ei automaattisesti ole ihmisväestön estimaatti.",
      "Katsaus paikantaa tutkimuskokonaisuuden. Väestön ajoitustulos on kuvaileva, ellei kohdistettu FieldState, päätepiste ja sekoittajien hallinta ole mukana.",
      "Mikään alla oleva tietue ei ole TFR-kerroin. Maakohtainen TFR-reitti tarvitsee erilliset ASFR- ja demografiset termit mallin määrittelyn mukaisesti.",
    ],
    boundedTitle: "Rajatut v2-tietueet",
    boundedLead: "Jokainen tietue kertoo kenttäluokan, suoruuden, tulkintarajan ja rajoituksen. Nämä ovat BERM v17 -kausaalireitin ensisijaiset evidenssitietueet.",
    classificationTitle: "Miten aiemmin negatiiviset havainnot luokittuvat",
    channelGroupTitle: "Kolme taajuuskanavaa",
    channelGroupLead: "Jokainen biologinen polku kuuluu yhteen kolmesta taajuuskanavasta, jotka määrittyvät kahdella biologisella rajataajuudella: f_c ~ 1 kHz (kalvon RC) ja f_RPM ~ 1 MHz (radikaaliparimekanismin koherenssi).",
    extendedTitle: "Laajennettu evidenssikatalogi",
    extendedLead: `${LEGACY_EVIDENCE_COUNT} lisätietuetta BERM v17 -bibliografiasta, säilytetty lähdetason tarkistusta varten. Jokainen on luokiteltu legacy-polun, evidenssitason ja migraatiostatuksen mukaan.`,
    groups: {
      PHYSICS_SIGNATURE: "Fysiikan allekirjoitukset",
      MECHANISTIC_INTERMEDIATE: "Mekanistiset välivaiheet",
      REPRODUCTIVE_ENDPOINT: "Lisääntymisen päätepisteet",
      ECOLOGICAL_ENDPOINT: "Ekologiset päätepisteet",
      SYSTEMATIC_REVIEW: "Systemaattiset katsaukset",
      POPULATION_DESCRIPTIVE: "Väestötason kuvaileva data",
    },
    fields: { nodes: "Kausaalisolmut", field: "Kenttäluokka", scope: "Tulkintaraja", limitations: "Rajoitukset", role: "Kalibrointirooli", source: "DOI / lähde" },
    structural: "Vain rakenne",
    contextual: "Vain konteksti",
    sentinelTitle: "Sentinelli- ja lajienvälinen evidenssi",
    sentinel: "Cross-Species Lag Index on valmiusprotokolla, joka yhdistää alueelliset vasteet, mitatun FieldStaten ja päätepistekovariaatit rekisteröityyn lajienväliseen testiin.",
    sentinelLink: "Katso sentinellin valmiustila",
    extPathway: "Polku",
    extLevel: "Evidenssitaso",
    extStatus: "Migraatiostatus",
    extScope: "Tulkintaraja",
    extN: "N",
    dualInterpretationTitle: "Evidenssin tulkinta: Standardi- vs. BERM-kehys",
    dualInterpretationLead: "Sama tutkimus voi tukea vastakkaisia johtopäätöksiä riippuen siitä, mitkä vinoumat oletetaan. Tämä taulukko näyttää miten standardi- ja BERM-korjattu kehys lukevat samoja evidenssityyppejä.",
    dualInterpretationHeaders: { evidence: "Evidenssityyppi", standard: "Standarditulkinta", berm: "BERM-tulkinta" },
    dualInterpretationRows: [
      {
        evidence: "Tutkimus ei löydä merkitsevää EMF-vaikutusta",
        standard: "EMF on turvallinen testatuilla tasoilla. Ei biologista mekanismia.",
        berm: "Kontrolliryhmä on kontaminoitu (laboratorion lähtötasovinouma). Vaimennusvinouma pienentää näennäistä vaikutusta. Nollatulos on odotettavissa jos todellinen nolla-altistuskontrolli puuttuu.",
      },
      {
        evidence: "Tutkimus löytää EMF-vaikutuksen vain korkealla SAR:lla",
        standard: "Vaikutus on terminen. Vahvistaa ICNIRP-kynnykset.",
        berm: "Annos-vastekäyrässä voi olla ikkunavaikutus (Adey/Blackman). Vaikutus korkealla SAR:lla ei sulje pois vaikutusta matalalla SAR:lla — ei-monotoniset vasteet ovat RPM:n ennustamia.",
      },
      {
        evidence: "WHO:n systemaattinen katsaus arvioi varmuuden 'kohtalaiseksi'",
        standard: "Evidenssi on kohtalaista. Lisää RCT:itä tarvitaan.",
        berm: "WHO:n metodologia on alttiina 15+ tunnistetulle vinoumalle, jotka kaikki vaimentavat näennäistä vaikutusta. 'Kohtalainen' vinoumille alttiissa kehyksessä voi vastata 'korkeaa' vinoumakorjatussa kehyksessä.",
      },
      {
        evidence: "BKT korreloi TFR:n kanssa paremmin kuin EMF-proxy",
        standard: "BKT/kehitys on todellinen ajuri. EMF on kehityksen proxy.",
        berm: "BKT on 'huono kontrolli' (Pearl 2009): sähköistys aiheuttaa sekä BKT:n että EMF:n. BKT:n kontrollointi poistaa kiinnostuksen kohteena olevan kausaalivaikutuksen (mukaan otetun mediaattorin vinouma).",
      },
      {
        evidence: "Tutkimus näyttää positiivisen EMF-vaikutuksen (esim. ROS-nousu)",
        standard: "Mielenkiintoista mutta vaatii replikaation. Vaikutuskoko voi olla pieni.",
        berm: "Vaikutuskoko on aliarvioitu laboratorion lähtötasovinouman vuoksi. Todellinen vaikutus altistamattomaan lähtötasoon nähden on suurempi kuin raportoitu.",
      },
      {
        evidence: "RPM ei voi selittää vaikutuksia telecom-taajuuksilla",
        standard: "CRY/RPM-polku on merkityksetön matkapuhelimille.",
        berm: "Oikein RF-kantoaallosta. Mutta telecom-signaalit sisältävät ELF-modulaation (GSM 217 Hz) RPM:n resonanssialueella. RPM reagoi modulaatioverhokäyrään, ei kantoaaltoon. Sähkökenttävaikutukset välittyvät polun A (VGIC) kautta.",

      },
      {
        evidence: "TFR-ennusteen LV ylittyi",
        standard: "Malli on väärä. Ennusteet epäonnistuivat.",
        berm: "Kolme mahdollisuutta: (a) malli yliarvioi, (b) eksogeeninen kompensaatio (maahanmuutto, IVF, politiikka), (c) LV liian kapea. Diskriminoivat testit olemassa jokaiselle.",
      },
    ],
    theraBionicTitle: "Kliininen validointi: TheraBionic",
    theraBionicLead: "FDA-hyväksytty lääkinnällinen laite vahvistaa BERM:n ydinmekanismin altistustasoilla, jotka ovat selvästi nykyisten turvallisuusstandardien alapuolella.",
    theraBionicBody: "TheraBionic P1 on FDA-hyväksytty lääkinnällinen laite (HDE H220001, 2019), joka hoitaa edennyttä maksasyöpää (hepatosellulaarinen karsinooma) amplitudimoduloiduilla radiotaajuisilla sähkömagneettisilla kentillä 27,12 MHz:n taajuudella.",
    theraBionicMechanism: "Laite toimii TÄSMÄLLEEN BERM:n kuvaamalla mekanismilla: ei-terminen EMF → Cav3.2 T-tyypin jänniteherkät kalsiumkanavat → Ca²⁺-sisäänvirtaus → biologinen vaikutus (kasvainsolujen differentiaatio). Tämän osoittivat Jimenez et al. (2019) eBioMedicine/Lancet-lehdessä.",
    theraBionicSAR: "Laite toimii SAR-tasoilla, jotka ovat 100–1 000× ALLE matkapuhelimen altistuksen. Tämä vahvistaa, että ei-terminen EMF voi tuottaa merkittäviä biologisia vaikutuksia jänniteherkän kalsiumkanavan kautta altistustasoilla, jotka ovat selvästi nykyisten turvallisuusstandardien (ICNIRP/FCC) alapuolella.",
    theraBionicCCB: "FDA-merkintä nimenomaisesti toteaa, ettei TheraBionic-laitetta saa käyttää kalsiumkanavasalpaajien kanssa — farmakologinen vahvistus siitä, että terapeuttinen vaikutus toimii kalsiumkanavien kautta.",
    theraBionicImplication: "Tämä ei ole BERM:n ennuste. Se on itsenäisesti kehitetty, kliinisesti validoitu, FDA-hyväksytty vahvistus siitä, että ei-terminen EMF tuottaa biologisia vaikutuksia jänniteherkän kalsiumkanavan kautta.",
    theraBionicSurvival: "34 % elinajan pidentyminen edenneessä HCC:ssä",
    theraBionicDevice: "27,12 MHz AM-RF, kasvainspesifiset taajuudet",
    theraBionicChannel: "Cav3.2 (CACNA1H) T-tyypin VGCC",
    theraBionicLevel: "E — FDA-hyväksytty, vertaisarvioitu (Lancet/eBioMedicine)",
    tDeclineTitle: "Testosteronin lasku: Maiden välinen evidenssi",
    tDeclineLead: "Ikäriippumaton sekulaarinen testosteronin lasku on dokumentoitu viidessä maassa neljällä mantereella. Kuvio on yhdenmukainen: ~1 %/vuosi lasku riippumatta ikääntymisestä, BMI-trendeistä tai elämäntapasekoittajista. Tutkimukset, jotka löysivät 'ei laskua' BMI-korjauksen jälkeen, ovat yhdenmukaisia mediaattorimallin kanssa: BMI on kausaalireitillä, ei itsenäinen sekoittaja, joten sen korjaaminen poistaa todellista signaalia.",
    tDeclineStudies: [
      { country: "USA", study: "Travison ym. 2007 (MMAS)", n: "1 532", rate: "−1,0 %/v", finding: "Väestötason T-lasku 1987–2004. Ikäriippumaton: 65-vuotiaan T oli 2002 matalampi kuin 65-vuotiaan T 1987. BMI-korjattu — kuvaa vain suoraa reittiä.", tier: "strong" as const, bmiIndependent: true },
      { country: "USA", study: "Mazur ym. 2013 (PLOS ONE)", n: "991", rate: "−0,95 %/v", finding: "Painonsa säilyttäneet US Air Force -veteraanit menettivät 117 ng/dL (19 %) 20 vuodessa. Poissulkee lihavuuden riittävänä selityksenä — ratkaiseva todiste mediaattoritulkinnalle.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { country: "Suomi", study: "Perheentupa ym. 2013", n: "3 271", rate: "−1,2 %/v", finding: "37 %:n kohorttisidonnainen T-lasku (1972–2002). LH ja FSH myös laskivat myöhemmissä kohorteissa. Suomen TFR romahti 35 vuotta myöhemmin.", tier: "strong" as const, bmiIndependent: true },
      { country: "Israel", study: "Chodick ym. 2020", n: "102 334", rate: "−1,02 %/v", finding: "Suurin yksittäistutkimus: 102k miestä, Maccabi Healthcare. 'Epätodennäköistä, että kasvava lihavuus selittää.' T laskee Israelin korkeasta TFR:stä huolimatta — kynnysmallin vaihe 1.", tier: "strong" as const, bmiIndependent: true },
      { country: "Globaali", study: "Santi ym. 2025 (meta-analyysi)", n: "1 064 891", rate: "p = 0,033", finding: "Suurin koskaan tehty meta-analyysi. Sekä T ETTÄ LH laskevat iästä, BMI:stä ja mittausmenetelmästä riippumatta. Ei BMI:n ajallista trendiä tässä populaatiossa. 'HPG-funktion jatkuva uudelleenasetus.' Ensimmäinen T + LH samanaikaisen laskun vahvistus.", tier: "strong" as const, bmiIndependent: true, highlight: true },
      { country: "Tanska", study: "Andersson ym. 2007", n: "5 350", rate: "null BMI:n jälkeen", finding: "Lasku hävisi BMI-korjauksen jälkeen. BERM-tulkinta: medioitu reitti dominoi tässä populaatiossa — BMI-korjaus poistaa dominoivan signaalin. Yhdenmukainen mediaattorimallin kanssa, ei ristiriita.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Tukee mediaattorihypoteesia: kun BMI-reitti dominoi, BMI-korjaus tuottaa nollan." },
      { country: "USA", study: "Nyante ym. 2012 (NHANES)", n: "2 315", rate: "ei laskua havaittu", finding: "NHANES 1988–2004. Ei laskua. Voi heijastaa mittausmenetelmän muutosta + mediaation poistoa. Ei ole ristiriidassa Travisonin kanssa — eri populaatio, eri mittaus, eri korjausstrategia.", tier: "null_explained" as const, bmiIndependent: false, bermNote: "Yhdenmukainen mediaattorimallin kanssa tietyssä alipopulaatiossa." },
    ],
    tDeclineImplication: "Jos testosteroni jatkaa laskuaan nykyisellä tahdilla, jokainen maa ylittää lopulta biologisen kynnyksen, jossa subfertiliteetti muuttuu TFR:n sitovaksi rajoitteeksi — riippumatta kulttuurisista tai taloudellisista tekijöistä.",
    tDeclineBmiNote: "Miksi 'nolla'-tulokset eivät ole ristiriitoja: BMI voi olla joko sekoittaja (itsenäinen syy) tai mediaattori (kausaalireitillä). Jos EMF aiheuttaa samanaikaisesti sekä BMI:n nousun että T:n laskun, BMI on mediaattori ja sen korjaaminen poistaa todellista signaalia. Mazur 2013 osoittaa tämän: vakiopainoiset miehet menettivät silti 19 % testosteroninsa. Suora reitti kattaa noin kaksi kolmasosaa kokonaisvaikutuksesta; medioitu reitti (BMI:n kautta) noin kolmanneksen.",
    tDeclineLink: "Kynnysmallin koko määrittely",
    tDeclinePredLink: "T→TFR-ennusteet",

    metabTitle: "Metabolinen syndrooma: kuusi konvergoivaa reittiä",
    metabLead: "Kuusi itsenäistä EMF → Ca²⁺ -reittiä lisää samanaikaisesti energian saantia, vähentää energiankulutusta ja lisää energian varastointia. CaMKII on konvergenssimolekyyli, joka yhdistää kaikki reitit. Lihavuus on monitekijäinen — EMF on YKSI myötävaikuttava tekijä, joka selittää residuaalin, johon ruokavalio, liikunta ja genetiikka eivät yksin riitä.",
    metabStudies: [
      { authors: "Alshammari ym.", year: 2022, journal: "Nutrients", finding: "RF-EMF → hypotalaaminen häiriö → ravinnonsaanti ↑ ihmisillä ja rotilla", mechanism: "1: Ruokahalu", level: "E" },
      { authors: "Chen ym.", year: 2016, journal: "eLife", finding: "ARC-glian Ca²⁺-aktivaatio → AgRP/NPY ↑ → ravinnonsaanti ↑ (suora Ca²⁺→ruokahaluyhteys)", mechanism: "1: Ruokahalu", level: "E" },
      { authors: "Maalouf ym.", year: 2023, journal: "IJMS", finding: "900 MHz → BAT-termogeneesi ↓, mitokondriaaktiivisuus ↓ (annos-vaste)", mechanism: "2: BAT", level: "E" },
      { authors: "Ranskalainen ryhmä", year: 2025, journal: "IJMS", finding: "5G (3,5 GHz) → PRDM16 −49 %, C/EBPβ −32 % (ruskean rasvan erilaistumismarkkerit)", mechanism: "2: BAT", level: "E" },
      { authors: "Bhatt ym.", year: 2012, journal: "PLoS ONE", finding: "GLP-1 aktivoi ERK:n L-tyypin VGCC:n Ca²⁺-mikrodomeenin kautta β-soluissa", mechanism: "3: Insuliini", level: "E" },
      { authors: "Matsui ym.", year: 2011, journal: "Hypertension Res", finding: "Nifedipiini (L-tyypin salpaaja) → paino ↓, PGC-1α ↑ (käänteinen farmakologinen koe)", mechanism: "Käänteinen", level: "E" },
      { authors: "Haghjoo ym.", year: 2022, journal: "BMC Primary Care", finding: "44 tutkimusta: ruutuaika → ylipaino OR 1,273 (annos-vaste)", mechanism: "Kaikki", level: "E" },
      { authors: "Klimentidis ym.", year: 2010, journal: "Proc R Soc B", finding: "24 populaatiota, 8 lajia, >20 000 eläintä KAIKKI lihovat (p = 1,2×10⁻⁷)", mechanism: "Kaikki", level: "E" },
    ],
    metabKlimentidisTitle: "Klimentidisin paradoksi",
    metabKlimentidisP1: "Laboratoriorotat kontrolloidulla dieetillä ovat lihoneet vuosikymmeniä. Villit rotat kaupungeissa lihovat. Kotieläimet — koirat ja kissat — näyttävät saman trendin. Todennäköisyys sille, että tämä tapahtuu sattumalta 24 populaatiossa ja 8 lajissa on p = 1,2 × 10⁻⁷.",
    metabKlimentidisP2: "Dieetti on kontrolloitu pois (laboratoriorotat). Liikunta on kontrolloitu pois (laboratoriorotat). Genetiikka on kontrolloitu pois (inbredut kannat). Hormonihäiritsijät (BPA, ftalaatit) ovat mahdollisia mutta eivät selitä VILLEJÄ rottia JA laboratoriorottia JA kotieläimiä samanaikaisesti. Ainoa ympäristötekijä joka on lisääntynyt KAIKISSA näissä ympäristöissä on sähkömagneettinen kenttäaltistus.",
    metabKlimentidisNote: "Klimentidis ym. eivät tutkineet EMF:ää. Tutkijat ehdottivat \"toistaiseksi tunnistamattomia tekijöitä.\" EMF-tulkinta on BERM:n johdos, ei heidän.",
    metabModelLink: "CaMKII-konvergenssimalli",
    metabPredLink: "Metaboliset ennusteet",
  },
} as const;

const SUB_PAGES = [
  {
    slug: "devices",
    icon: Zap,
    en: { title: "Therapeutic Device Paradox", desc: "26 FDA-approved non-thermal EMF devices vs. ICNIRP's 'no effect' assumption. The logical contradiction at the heart of EMF regulation." },
    fi: { title: "Terapeuttisten laitteiden paradoksi", desc: "26 FDA-hyväksyttyä ei-termistä EMF-laitetta vs. ICNIRP:n 'ei vaikutusta' -oletus. Looginen ristiriita EMF-regulaation ytimessä." },
  },
  {
    slug: "pharmacology",
    icon: Pill,
    en: { title: "Pharmacological Evidence", desc: "8 drug classes converging on BERM pathways: CCBs (264k studies), verapamil, lithium, semaglutide, gabapentinoids, nimodipine, melatonin, CoQ10. The model's clinically strongest argument." },
    fi: { title: "Farmakologinen evidenssi", desc: "8 lääkeryhmää konvergoivat BERM-reiteillä: CCB:t (264k tutkimusta), verapamiili, litium, semaglutidi, gabapentinoidit, nimodipiini, melatoniini, CoQ10. Mallin kliinisesti vahvin argumentti." },
  },
  {
    slug: "lighting",
    icon: Lightbulb,
    en: { title: "IF Channel: Lighting & Display Transition", desc: "LED switch-mode power supplies, spermatogenesis connection, and the VDT precedent. The overlooked intermediate-frequency channel." },
    fi: { title: "IF-kanava: Valaistus ja näyttösiirtymä", desc: "LED-hakkuriteholähteet, spermatogeneesiyhteys ja VDT-ennakkotapaus. Huomiotta jäänyt keskitaajuuskanava." },
  },
  {
    slug: "cascades",
    icon: Activity,
    en: { title: "Disease Cascade: Ion Channel Convergence", desc: "Ionic hierarchy, skin battery, ADHD calibration, and 8 diseases traced to one ion channel model." },
    fi: { title: "Sairauskaskadi: Ionikanavakonvergenssi", desc: "Ioninen hierarkia, ihon akku, ADHD-kalibraatio ja 8 sairautta jäljitettynä yhteen ionikanavamalliin." },
  },
  {
    slug: "bbb",
    icon: Brain,
    en: { title: "Blood-Brain Barrier & Neurodegeneration", desc: "BBB tight junction disruption, Alzheimer's calcium upstream hypothesis, and the hospital EMF hypothesis." },
    fi: { title: "Veri-aivoeste ja neurodegeneraatio", desc: "BBB:n tight junction -häiriö, Alzheimerin kalsium-ylävirta-hypoteesi ja sairaala-EMF-hypoteesi." },
  },
  {
    slug: "circadian",
    icon: Moon,
    en: { title: "Circadian Disruption, Sleep & Recovery", desc: "Melatonin bridge, sleep deprivation as mediator, recovery window elimination, and behavioral suppression." },
    fi: { title: "Sirkadiaaninen häiriö, uni ja palautuminen", desc: "Melatoniinisilta, univaje välittäjänä, palautumisikkunan eliminaatio ja käyttäytymisen suppressio." },
  },
  {
    slug: "epidemiology",
    icon: BarChart3,
    en: { title: "Population & Epidemiological Evidence", desc: "COVID lockdown natural experiment, electrification boundary, Kaiser Permanente series, and mobile phone paradox." },
    fi: { title: "Väestö- ja epidemiologinen evidenssi", desc: "COVID-luonnollinen koe, sähköistysraja, Kaiser Permanente -sarja ja matkapuhelinparadoksi." },
  },
  {
    slug: "magnetoreception",
    icon: Compass,
    en: { title: "Human Magnetoreception & CRY Pathways", desc: "CRY/RPM magnetoreception, pulse resonance, melatonin PRISMA review, and differential susceptibility." },
    fi: { title: "Ihmisen magnetoreseptio ja CRY-reitit", desc: "CRY/RPM-magnetoreseptio, pulssiresonanssi, melatoniini-PRISMA-katsaus ja yksilöllinen herkkyys." },
  },
  {
    slug: "ecology",
    icon: TreePine,
    en: { title: "Ecological & Sentinel Evidence", desc: "Electroecology across taxa and weather radar effects on wildlife — cross-species validation of BERM mechanisms." },
    fi: { title: "Ekologinen ja sentinellievidenssi", desc: "Elektroekologia yli taksonomisten ryhmien ja tutkasäteilyn vaikutukset — lajienvälinen BERM-mekanismien validointi." },
  },
  {
    slug: "eyes",
    icon: Eye,
    en: { title: "Eye Color & Magnetoreception", desc: "How iris pigmentation, nutrition, and sex modulate CRY sensitivity. 11 evidence cards, 5 predictions." },
    fi: { title: "Silmien väri ja magnetoreseptio", desc: "Miten iiriksen pigmentaatio, ravitsemus ja sukupuoli moduloivat CRY-herkkyyttä. 11 evidenssikorttia, 5 ennustetta." },
  },
  {
    slug: "nutrition",
    icon: Leaf,
    en: { title: "Nutritional CRY Modulation", desc: "How B2, omega fatty acids, and fasting dynamics control cryptochrome function. 6 evidence cards, 3 predictions." },
    fi: { title: "Ravitsemuksellinen CRY-modulaatio", desc: "Miten B2, omega-rasvahapot ja paastodynamiikka kontrolloivat kryptokromin toimintaa. 6 evidenssikorttia, 3 ennustetta." },
  },
  {
    slug: "evolution",
    icon: Dna,
    en: { title: "Evolutionary Origins: The Northern Package", desc: "How co-selection of blue eyes, lactose tolerance, and cattle husbandry created the population most sensitive to EMF. 5 χ scales, 6 population profiles, 5 predictions." },
    fi: { title: "Evoluution alkuperät: Pohjoinen paketti", desc: "Miten sinisilmäisyyden, laktoosinsietokyvyn ja karjankasvatuksen koselektio loi EMF:lle herkimmän populaation. 5 χ-skaalaa, 6 populaatioprofiilia, 5 ennustetta." },
  },
  {
    slug: "populations",
    icon: Users,
    en: { title: "Natural Control Groups: 9 Low-EMF Communities", desc: "Systematic comparison of pre-industrial and technology-refusing populations. Tsimane→Mosetén dose-response gradient, myopia five-level gradient, 11/16 disease cascades confirmed." },
    fi: { title: "Luonnolliset kontrolliryhmät: 9 matalan EMF:n yhteisöä", desc: "Esi-teollisten ja teknologian kieltävien populaatioiden systemaattinen vertailu. Tsimane→Mosetén annos-vastegradientti, likitaitteisuuden viisitasoinen gradientti, 11/16 sairauskaskadia vahvistettu." },
  },
  {
    slug: "replication",
    icon: FlaskConical,
    en: { title: "Resolution of the Replication Crisis", desc: "Why EMF biology seems inconsistent, Blackman's five confounds, and the five-parameter standard that resolves 50 years of contradictory results." },
    fi: { title: "Replikaatiokriisin ratkaisu", desc: "Miksi EMF-biologia vaikuttaa ristiriitaiselta, Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi joka ratkaisee 50 vuoden ristiriitaiset tulokset." },
  },
  {
    slug: "technology",
    icon: Zap,
    en: { title: "Technology-Specific Exposure", desc: "14 technology profiles from power grid to Starlink. ELF priming hypothesis, superadditivity model, temporal correlations, and Why 2012." },
    fi: { title: "Teknologiakohtainen altistus", desc: "14 teknologiaprofiilia sähköverkosta Starlinkiin. ELF-priming-hypoteesi, superadditiivisuusmalli, temporaaliset korrelaatiot ja Miksi 2012." },
  },
] as const;


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function EvidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-6">{d.interpretationTitle}</h2>
        <ol className="grid max-w-4xl grid-cols-1 md:grid-cols-2 md:divide-x md:divide-card-border">
          {d.interpretation.map((item, index) => (
            <li key={item} className="border-t border-card-border py-4 text-sm leading-relaxed text-foreground-muted md:border-t-0 md:px-5 first:md:pl-0 last:md:pr-0">
              <span className="font-mono-num mr-2 text-accent">0{index + 1}</span>{item}
            </li>
          ))}
        </ol>
      </section>

      {/* Dual interpretation framework */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.dualInterpretationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.dualInterpretationLead}</p>
        <div className="space-y-4 max-w-4xl">
          {d.dualInterpretationRows.map((row, ri) => (
            <div key={ri} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">
                <span className="font-mono-num text-xs text-accent mr-2">0{ri + 1}</span>
                {row.evidence}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">{d.dualInterpretationHeaders.standard}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{row.standard}</p>
                </div>
                <div className="rounded border border-accent/30 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{d.dualInterpretationHeaders.berm}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{row.berm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-page cards */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Temaattiset evidenssisivut" : "Thematic evidence pages"}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">
          {activeLocale === "fi"
            ? "Yksityiskohtaiset analyysit joissa yksittäiset tutkimukset yhdistyvät mekanistisiksi argumenteiksi. Kukin narratiivi syntetisoi julkaistuja löydöksiä; mikään ei osoita väestötason kausaalikerrointa."
            : "Detailed analyses where individual studies are synthesized into mechanistic arguments. Each narrative synthesizes published findings; none establishes a population-level causal coefficient."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-4">
          {SUB_PAGES.map((sp) => {
            const Icon = sp.icon;
            const t = activeLocale === "fi" ? sp.fi : sp.en;
            return (
              <a
                key={sp.slug}
                href={`/${activeLocale}/evidence/${sp.slug}`}
                className="group rounded-lg border border-card-border bg-card-bg p-5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-accent shrink-0" />
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{t.title}</h3>
                </div>
                <p className="text-sm text-foreground-muted mt-1 leading-relaxed">{t.desc}</p>
                <span className="text-accent text-sm mt-2 inline-block">→</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 10 independent research domains */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "10 riippumatonta tutkimusalaa" : "10 independent research domains"}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {activeLocale === "fi"
            ? "BERM:n mekanistiset polut perustuvat 10 toisistaan riippumattomaan tutkimusalaan. Mikään yksittäinen ala ei riitä, mutta niiden konvergenssi samaan ennusteeseen — sähkömagneettisten kenttien biologinen aktiivisuus — on epätodennäköistä sattumalta."
            : "BERM's mechanistic pathways draw on 10 mutually independent research domains. No single domain is sufficient, but their convergence on the same prediction — biological activity of electromagnetic fields — is unlikely by chance."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 max-w-4xl">
          {(activeLocale === "fi" ? RESEARCH_DOMAINS.fi : RESEARCH_DOMAINS.en).map((item) => (
            <div key={item.n} className="flex gap-3 rounded-lg border border-card-border bg-card-bg p-3">
              <span className="font-mono-num text-xs text-accent mt-0.5 shrink-0">{item.n}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.t}</p>
                <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Validation: TheraBionic */}
      <section id="therabionic" className="mb-16 border-t editorial-rule pt-6">
        <span id="bradford-hill" />
        <div className="border-l-4 border-emerald-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.theraBionicTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.theraBionicLead}</p>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.theraBionicBody}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 max-w-4xl">
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {activeLocale === "fi" ? "Laite" : "Device"}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicDevice}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {activeLocale === "fi" ? "Kanava" : "Channel"}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicChannel}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">SAR</p>
            <p className="text-sm font-semibold text-foreground">100–1,000&times; {activeLocale === "fi" ? "alle" : "below"}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {activeLocale === "fi" ? "Tulos" : "Outcome"}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicSurvival}</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-card-bg p-3 col-span-2 sm:col-span-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              {activeLocale === "fi" ? "Taso" : "Level"}
            </p>
            <p className="text-sm font-semibold text-foreground">{d.theraBionicLevel}</p>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {activeLocale === "fi" ? "Mekanismi" : "Mechanism"}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicMechanism}</p>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {activeLocale === "fi" ? "SAR-vertailu" : "SAR comparison"}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicSAR}</p>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              {activeLocale === "fi" ? "Kalsiumkanavasalpaaja-vasta-aihe" : "Calcium channel blocker contraindication"}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.theraBionicCCB}</p>
          </div>

          <div className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/5 p-4">
            <p className="text-sm text-foreground leading-relaxed italic">{d.theraBionicImplication}</p>
          </div>
        </div>
      </section>

      {/* Testosterone Decline Evidence */}
      <section id="testosterone" className="mb-16 border-t editorial-rule pt-6">
        <div className="border-l-4 border-red-500 pl-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-red-500 shrink-0" />
            <h2 className="editorial-section-heading">{d.tDeclineTitle}</h2>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">{d.tDeclineLead}</p>
        </div>

        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Maa" : "Country"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Tutkimus" : "Study"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">N</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Tahti" : "Rate"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Taso" : "Tier"}</th>
                <th className="py-2 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Havainto" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.tDeclineStudies.map((row: { country: string; study: string; n: string; rate: string; finding: string; tier?: string; bmiIndependent?: boolean; highlight?: boolean; bermNote?: string }) => (
                <tr key={row.study} className={`border-b border-card-border/50${row.highlight ? " bg-amber-500/5" : ""}${row.tier === "null_explained" ? " opacity-75" : ""}`}>
                  <td className="py-2 pr-3 font-medium text-foreground whitespace-nowrap">{row.country}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{row.study}</td>
                  <td className="py-2 pr-3 font-mono-num whitespace-nowrap">{row.n}</td>
                  <td className={`py-2 pr-3 font-mono-num whitespace-nowrap font-semibold ${row.tier === "null_explained" ? "text-foreground-muted" : "text-red-500"}`}>{row.rate}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {row.tier === "strong" && <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">{row.bmiIndependent ? "BMI-independent" : "Strong"}</span>}
                    {row.tier === "null_explained" && <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-600">Mediator-consistent</span>}
                  </td>
                  <td className="py-2">{row.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {d.tDeclineBmiNote && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 max-w-4xl mb-4">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">{activeLocale === "fi" ? "Kausaalianalyysi" : "Causal analysis"}</p>
            <p className="text-sm text-foreground leading-relaxed">{d.tDeclineBmiNote}</p>
          </div>
        )}

        <div className="rounded-lg border-2 border-red-500/40 bg-red-500/5 p-4 max-w-4xl mb-4">
          <p className="text-sm text-foreground leading-relaxed italic">{d.tDeclineImplication}</p>
        </div>

        <div className="flex flex-wrap gap-3 max-w-4xl">
          <Link href={`/${activeLocale}/model#testosterone-threshold`} className="text-sm text-accent hover:underline">{d.tDeclineLink} →</Link>
          <span className="text-foreground-muted">·</span>
          <Link href={`/${activeLocale}/predictions`} className="text-sm text-accent hover:underline">{d.tDeclinePredLink} →</Link>
        </div>
      </section>

      {/* Metabolic Syndrome Evidence */}
      <section id="metabolic-evidence" className="mb-16 border-t editorial-rule pt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-1 p-2 rounded-lg bg-orange-500/10 shrink-0">
            <Scale size={20} className="text-orange-500" />
          </div>
          <div>
            <h2 className="editorial-section-heading">{d.metabTitle}</h2>
            <p className="text-sm text-foreground-muted leading-relaxed mt-1 max-w-3xl">{d.metabLead}</p>
          </div>
        </div>

        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Tutkijat" : "Authors"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Mekanismi" : "Mechanism"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Havainto" : "Finding"}</th>
                <th className="py-2 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Taso" : "Level"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.metabStudies.map((s: { authors: string; year: number; journal: string; finding: string; mechanism: string; level: string }, i: number) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2.5 pr-3 text-foreground">{s.authors}</td>
                  <td className="py-2.5 pr-3 font-mono-num">{s.year}</td>
                  <td className="py-2.5 pr-3 text-xs">{s.mechanism}</td>
                  <td className="py-2.5 pr-3">{s.finding}</td>
                  <td className="py-2.5 font-mono-num text-xs">{s.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Klimentidis Paradox highlight */}
        <div className="rounded-lg border-2 border-orange-500/40 bg-orange-500/5 p-5 max-w-4xl mb-4">
          <h3 className="text-base font-semibold text-foreground mb-2">{d.metabKlimentidisTitle}</h3>
          <p className="text-3xl font-bold text-orange-500 mb-3">
            24 {activeLocale === "fi" ? "populaatiota" : "populations"} · 8 {activeLocale === "fi" ? "lajia" : "species"} · p = 1.2 × 10⁻⁷
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed mb-2">{d.metabKlimentidisP1}</p>
          <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.metabKlimentidisP2}</p>
          <p className="text-xs text-foreground-muted/70 italic">{d.metabKlimentidisNote}</p>
        </div>

        <div className="flex flex-wrap gap-3 max-w-4xl">
          <Link href={`/${activeLocale}/model#camkii-convergence`} className="text-sm text-accent hover:underline">{d.metabModelLink} →</Link>
          <span className="text-foreground-muted">·</span>
          <Link href={`/${activeLocale}/predictions`} className="text-sm text-accent hover:underline">{d.metabPredLink} →</Link>
        </div>
      </section>

      {/* Bounded v2 records */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.boundedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.boundedLead}</p>

        {ORDER.map((directness) => {
          const records = FIELDSTATE_EVIDENCE.filter((record) => record.directness === directness);
          if (!records.length) return null;
          return (
            <div key={directness} className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">{d.groups[directness]}</h3>
              <div className="grid gap-4">
                {records.map((record) => (
                  <article key={record.id} className="border-t border-card-border py-5 first:border-t-0">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-semibold leading-snug tracking-[-0.014em]">{record.citation}</h4>
                        <p className="mt-1 text-sm text-foreground-muted">{record.studyType} · {record.system}</p>
                      </div>
                      <span className="font-mono-num text-xs text-foreground-muted">{record.year}</span>
                    </div>
                    <p className="mb-4 max-w-4xl text-sm leading-relaxed text-foreground-muted">{record.finding}</p>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-card-border pt-3 text-sm leading-relaxed md:grid-cols-2">
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.nodes}</dt><dd className="text-foreground-muted">{causalNodeLabels(record.causalNodes, activeLocale).join(" · ")}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.field}</dt><dd className="text-foreground-muted">{record.fieldClass}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.scope}</dt><dd className="text-foreground-muted">{record.scope}</dd></div>
                      <div><dt className="font-semibold text-foreground mb-0.5">{d.fields.limitations}</dt><dd className="text-foreground-muted">{record.limitations.join("; ")}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono-num text-foreground-muted">{d.fields.role}: {record.calibrationRole === "STRUCTURAL_ONLY" ? d.structural : d.contextual}</span>
                      <a href={record.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{d.fields.source} ↗</a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Protocol classification of previously negative findings */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.classificationTitle}</h2>
        <div className="max-w-4xl">
          <EvidenceClassification locale={activeLocale} />
        </div>
      </section>

      {/* Three frequency channels grouping */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <span id="elf-channel" /><span id="rf-channel" />
        <h2 className="editorial-section-heading mb-3">{d.channelGroupTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.channelGroupLead}</p>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          {(CHANNEL_GROUPS[activeLocale === "fi" ? "fi" : "en"]).map((ch) => (
            <div key={ch.channel} className={`border-l-2 ${ch.color} bg-card-bg rounded-lg p-4`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm">{ch.channel}</span>
                <span className="text-xs text-foreground-muted font-mono">{ch.band}</span>
              </div>
              <p className="text-xs text-foreground-muted mb-2">{ch.desc}</p>
              <div className="text-xs text-foreground-muted/70 mb-2">FDA: {ch.fda}</div>
              <div className="flex flex-wrap gap-1">
                {ch.pathways.map((p) => (
                  <span key={p} className="inline-block text-xs font-mono bg-card-border/30 rounded px-1.5 py-0.5">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended evidence catalogue */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.extendedTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.extendedLead}</p>

        {PATHWAY_ORDER.map((pathway) => {
          const records = LEGACY_EVIDENCE_CATALOGUE.filter((r) => r.pathway === pathway);
          if (!records.length) return null;
          const pathwayLabel = PATHWAY_LABELS[pathway]?.[activeLocale] ?? pathway;
          return (
            <div key={pathway} className="mb-10">
              <h3 className="text-sm font-semibold mb-4">
                <span className="font-mono-num text-accent mr-2">{pathway}</span>
                {pathwayLabel}
              </h3>
              {pathway === "B" && (
                <p className="text-xs text-foreground-muted leading-relaxed mb-4 max-w-4xl italic border-l-2 border-amber-500/30 pl-3">
                  {activeLocale === "fi"
                    ? "CRY2:n alaspäin suuntautuvat vaikutukset ulottuvat sirkadiaanisen kellon yli. Yap ym. (2025) osoittivat, että CRY2 on fysikaalisessa vuorovaikutuksessa TRPC1:n kanssa, TRP-perheen kationikanavan kanssa, ja että tämä kompleksi siirtyy yhdessä tumaan PEMF-altistuksen jälkeen. Tämä kalsiumsisäänvirtausreitti on CRY2-riippuvainen (estetään CRY2-hiljentämisellä), valoriippuvainen (häviää pimeässä) ja FAD-riippuvainen (vaimenee RFK-hiljentämisellä) — kaikki RPM-mekanismin tunnusmerkkejä. TRPC1 EI ole jänniteriippuvainen kalsiumkanava eikä L-tyypin VGCC-salpaajat estä sitä. Tämä tarkoittaa, että polut A ja C (sivuston B) pysyvät farmakologisesti erotettavissa, mutta polku C:n biologinen vaikutuskenttä on laajempi kuin aiemmin oletettiin."
                    : "CRY2's downstream effects extend beyond the circadian clock. Yap et al. (2025) showed that CRY2 physically interacts with TRPC1, a TRP-family cation channel, and that this complex co-translocates to the nucleus after PEMF exposure. This calcium entry pathway is CRY2-dependent (blocked by CRY2 silencing), light-dependent (lost in darkness), and FAD-dependent (attenuated by RFK silencing) — all hallmarks of the RPM mechanism. Importantly, TRPC1 is NOT a voltage-gated calcium channel and is NOT blocked by L-type VGCC blockers. This means pathways A and C (site's B) remain pharmacologically separable, but pathway C's biological footprint is larger than previously assumed."}
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-12">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2 pr-3 w-20">{d.extLevel}</th>
                      <th className="py-2 pr-3 w-10">{d.extN}</th>
                      <th className="py-2 pr-3 w-32">{d.extStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.id} className="border-b border-card-border/40 hover:bg-card-bg/50 transition-colors">
                        <td className="py-2.5 pr-3">
                          <p
                            className={`font-medium leading-snug ${
                              r.status === "RETRACTED_2024"
                                ? "text-foreground-muted line-through decoration-status-refuted"
                                : "text-foreground"
                            }`}
                          >
                            {r.url ? (
                              <a
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline decoration-dotted underline-offset-2"
                              >
                                {r.citation}
                                <span aria-hidden="true"> ↗</span>
                              </a>
                            ) : (
                              r.citation
                            )}
                          </p>
                          {r.translationScope && (
                            <p className="mt-1 text-foreground-muted leading-relaxed">{r.translationScope}</p>
                          )}
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.year}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span className="inline-block rounded bg-card-bg px-1.5 py-0.5 text-[0.6rem] font-semibold">
                            {r.level}
                            {EVIDENCE_LEVEL_LABELS[r.level] && (
                              <span className="ml-1 font-normal text-foreground-muted">{EVIDENCE_LEVEL_LABELS[r.level][activeLocale]}</span>
                            )}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 font-mono-num text-foreground-muted align-top">{r.n ?? "—"}</td>
                        <td className="py-2.5 pr-3 align-top">
                          <span
                            className={`text-[0.6rem] ${
                              r.status === "RETRACTED_2024"
                                ? "text-status-refuted font-medium"
                                : r.status === "MIGRATION_CANDIDATE"
                                  ? "text-accent"
                                  : "text-foreground-muted"
                            }`}
                          >
                            {STATUS_LABELS[r.status]?.[activeLocale] ?? r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      {/* Orphaned findings */}
      <section id="orphaned-findings" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? ORPHANED_COMMENTARY.fi.title : ORPHANED_COMMENTARY.en.title}
        </h2>
        <div className="max-w-4xl overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Tutkija" : "Researcher"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Havainto" : "Finding"}</th>
                <th className="py-2 pr-3 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Kritiikki" : "Criticism"}</th>
                <th className="py-2 font-semibold text-foreground-muted">{activeLocale === "fi" ? "Mekanismi (nyt)" : "Mechanism (now)"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {ORPHANED_FINDINGS.map((row) => {
                const finding = activeLocale === "fi" ? row.findingFi : row.findingEn;
                const criticism = activeLocale === "fi" ? row.criticismFi : row.criticismEn;
                const mechanism = activeLocale === "fi" ? row.mechanismFi : row.mechanismEn;
                return (
                <tr key={row.year} className="border-b border-card-border/50">
                  <td className="py-2 pr-3 font-mono-num">{row.year}</td>
                  <td className="py-2 pr-3">{row.researcher}</td>
                  <td className="py-2 pr-3">{finding}</td>
                  <td className="py-2 pr-3 italic">{criticism}</td>
                  <td className="py-2">{mechanism}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="max-w-4xl space-y-4">
          {(() => {
            const oc = activeLocale === "fi" ? ORPHANED_COMMENTARY.fi : ORPHANED_COMMENTARY.en;
            return (
              <>
                <p className="text-sm text-foreground-muted leading-relaxed">{oc.p1}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{oc.p2}</p>
                <p className="text-xs text-foreground-muted/70 italic">{oc.note}</p>
              </>
            );
          })()}
        </div>
      </section>

      <section className="editorial-rail mb-14 max-w-4xl border-y border-card-border py-5">
        <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.sentinel}</p>
        <Link href={`/${activeLocale}/sentinel`} className="text-sm text-accent hover:underline">{d.sentinelLink} →</Link>
      </section>

      <RetrodictionCards locale={activeLocale} />

      <DiseaseCascadeTimeline locale={activeLocale} />

      <DifferentialSusceptibility locale={activeLocale} />

      <section className="mb-14">
        <HindcastValidation locale={activeLocale} />
      </section>

      <StatisticalValidation locale={activeLocale} />

      <section className="mt-14">
        <ReferencesSummary locale={activeLocale} />
      </section>

      <NextPageLink
        href={`/${activeLocale}/objections`}
        label={activeLocale === "fi" ? "Seuraavaksi" : "Next"}
        title={activeLocale === "fi" ? "Kritiikki ja vastaukset" : "Criticism and responses"}
        icon={ShieldQuestion}
      />
    </div>
  );
}
