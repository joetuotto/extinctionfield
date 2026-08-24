import type { Metadata } from "next";
import { ShieldQuestion, Leaf } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { FindingCard } from "@/components/FindingCard";
import {
  CLASSIFICATION_SUMMARY,
  CLASSIFICATION_VERSION,
  findingsInGroup,
} from "@/lib/findingsClassification";

type Objection = { question: string; response: readonly string[]; boundary: string };
type DiscriminatingTest = {
  id: string;
  name: string;
  berm: string;
  consensus: string;
  protocol: string;
  cost: string;
};
type VersionRow = { version: string; mechanism: string; status: string; why: string };
type Copy = {
  title: string;
  subtitle: string;
  introduction: string;
  summaryLabel: string;
  activeTitle: string;
  activeLead: string;
  reclassifiedTitle: string;
  reclassifiedLead: string;
  refinementTitle: string;
  refinementLead: string;
  testsTitle: string;
  testsLead: string;
  tests: readonly DiscriminatingTest[];
  historyTitle: string;
  historyHeaders: readonly [string, string, string, string];
  history: readonly VersionRow[];
  questionsTitle: string;
  objections: readonly Objection[];
  closingTitle: string;
  closingText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "Criticism and open problems",
    subtitle:
      "Every identified negative finding, open problem and falsified earlier version — and what each one actually bears on.",
    introduction:
      "BERM v17 treats openness as an epistemological principle. The classification below applies the BERM reasoning protocol (v1.0) to findings previously read as negative. Reclassification does not mean a finding supports BERM: it means the original test was not discriminating, or did not address the target it was taken to address. The primary branch (pathway C / RPM / cohort effect) remains empirically untested by discriminating tests.",
    summaryLabel: "REVIEW OF NEGATIVE FINDINGS",
    activeTitle: "Active problems (remain negative)",
    activeLead:
      "These stand. Two are falsified mechanisms from BERM v6–v9, one is a mathematical obstruction in the soliton layer, one is a documentation-integrity failure, and two are open theoretical problems in the Lindgren framework.",
    reclassifiedTitle: "Reclassified (do not discriminate between models)",
    reclassifiedLead:
      "Each of these was read as a falsification. Under the protocol, none of them tested a prediction that separates BERM from the consensus model — either the BERM prediction was never derived, or the test addressed a claim the model does not make.",
    refinementTitle: "Internal refinements (led to model corrections)",
    refinementLead:
      "These were genuine failures of a specific formulation, and each produced a structural correction rather than a defence.",
    testsTitle: "Discriminating tests still needed",
    testsLead:
      "None of the 13 findings tested the primary branch. These three would separate pathway C (RPM) from the consensus model. None has been carried out.",
    tests: [
      {
        id: "D1",
        name: "Directional dependence (cell level)",
        berm: "RPM response depends on the angle between B₀ and B_ext (Larmor resonance, anisotropic hyperfine).",
        consensus: "Isotropic response: power-dependent, not direction-dependent.",
        protocol: "CRY-expressing cells, controlled B₀ direction, 3 angles × 3 field levels; endpoint ROS or melatonin production.",
        cost: "~€5,000–15,000 · one cell-biology laboratory",
      },
      {
        id: "D2",
        name: "Cohort-step hypothesis (demographic)",
        berm: "Cohorts born in the 4G era (2012+) show a different ASFR profile than 2G-era cohorts, controlling for cultural variables.",
        consensus: "No cohort step by technology generation.",
        protocol: "WPP ASFR data, age-group analysis, cohort birth year vs technology generation, country fixed effects.",
        cost: "€0 (public data) · ~2 weeks · partial test now, full test 2030+",
      },
      {
        id: "D3",
        name: "Species hierarchy (spin coherence × population decline)",
        berm: "CRY spin-coherence time predicts the between-species sensitivity ordering: longer coherence → greater sensitivity → faster decline.",
        consensus: "No prediction about ordering between species.",
        protocol: "Literature synthesis of CRY coherence times × population trend data (bee, migratory bird, house sparrow, dog, human).",
        cost: "€0 (literature) · ~1 week",
      },
    ],
    historyTitle: "Version history",
    historyHeaders: ["Version", "Mechanism", "Status", "Why abandoned"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC resonance 94–183 GHz", status: "Abandoned", why: "Physically impossible: five orders of magnitude too fast for protein conformational dynamics" },
      { version: "BERM 6–9", mechanism: "Water resonance 2.45 GHz", status: "Abandoned", why: "Inverted physics: absorption is rotational damping, not amplifying resonance" },
      { version: "BERM 6–9", mechanism: "Soliton propagation", status: "Abandoned", why: "Ghost obstruction: π₂ = 0 for timelike A, ghost energy for spacelike A" },
      { version: "L-BERM", mechanism: "VGCC via pure geometry", status: "Demoted", why: "δV_m is 10¹⁷× too small without biological amplifiers" },
      { version: "BERM < v6", mechanism: "EMF explains the whole demographic transition", status: "Abandoned", why: "The pre-EMF decline is driven by the D-term (cultural demand)" },
    ],
    questionsTitle: "Research questions and evidence boundaries",
    objections: [
      {
        question: "Environmental EMF fields are too weak for biological effects",
        response: [
          "The human eye detects single photons. Sharks detect 0.5 µV/m electric fields. Migratory birds' compass is disrupted by 15 nT RF noise — 0.03% of the geomagnetic background. Biology operates at the quantum limit of electromagnetic sensitivity because evolution optimized detection, not tolerance.",
          "Twenty-six regulatory-approved device categories exploit non-thermal EMF biological effects across the entire EM spectrum — from DC bone stimulators (1986) to UV phototherapy. This includes 12,000+ individual TENS clearances, a $8–10B neuromodulation market, and 160,000+ implanted DBS devices. tDCS treats depression at 0.3–1.0 V/m — the same order of magnitude as measured urban ambient RF (0.67–1.51 V/m). The claim that EMF is 'too weak' directly contradicts regulatory approval decisions worldwide.",
          "The Ion Forced Oscillation mechanism (Panagopoulos 2025, Frontiers in Public Health) demonstrates a biological response threshold of 10⁻⁵ V/m for polarized, coherent fields — five orders of magnitude below typical environmental levels. There is no intensity gap. The gap existed only in models that assumed thermal effects were the only mechanism.",
          "In 2026, Kim et al. (Cell, IF ~64) identified Cyb5b — a mitochondrial outer membrane protein — as a genetically verified EMF sensor via genome-wide CRISPR screen. 60 Hz pulsed EMF activates gene promoters in vivo through Cyb5b → Ca²⁺ oscillations. This is the first genetically identified EMF receptor. The 'too weak' argument now contradicts not only FDA device approvals and IFO biophysics but also a CRISPR-validated molecular sensor published in Cell.",
          "In 2013, honeybee researcher Uwe Greggers stated that anthropogenic electric fields are 'much lower in energy than those produced by the bees themselves' and that bees 'should be naturally protected.' In 2025, Mallinson et al. tested this empirically in field experiments — and found that anthropogenic AC electric fields reduce bee foraging by 71% (iScience / Cell Press). The intuitive assessment that 'the field is too weak' failed the empirical test. This is exactly the error ICNIRP makes for human health: assuming without testing that environmental field strengths are below biological thresholds.",
        ],
        boundary: "The intensity argument is an empirical claim. FDA approvals and IFO threshold measurements are empirical facts. The burden of proof is on the intensity argument to explain why FDA-approved non-thermal devices work.",
      },
      {
        question: "TTFields proves IF effects only work at high intensity",
        response: [
          "TTFields uses dielectrophoresis (DEP) — a quadratic mechanism that requires field strengths of 100–300 V/m. Environmental IF exposure operates via a fundamentally different mechanism: Ion Forced Oscillation (IFO-VGIC), which is linear in field strength with a demonstrated threshold of 10⁻⁵ V/m (Panagopoulos 2025). Different mechanisms have different intensity requirements.",
          "Pulsed LED-driver fields are more biologically active per watt than TTFields' pure sine wave (Campisi 2010: amplitude-modulated 900 MHz produced more ROS and DNA fragmentation than continuous wave). LED drivers produce pulsed, harmonically rich waveforms with 50,000+ switching transitions per second — each transition a potential Ca²⁺ spike via VGCC gating asymmetry.",
          "The TTFields clinical program validates that IF frequencies disrupt cell division. It does not define the minimum intensity at which disruption begins — that question is answered by IFO biophysics, not by the DEP mechanism TTFields employs.",
          "Critically, Neuhaus et al. (Nature 2020) showed that TTFields' frequency-dependence differs between cancer and normal cells: cancer cells are most affected at 150–200 kHz, while normal cell mitosis is disrupted at ~50 kHz. LED driver switching frequencies (20–100 kHz) span precisely this normal-cell sensitivity range — a coincidence that the intensity-only argument cannot address.",
        ],
        boundary: "This distinction is falsifiable: if IFO effects cannot be demonstrated below 1 V/m in controlled experiments, the environmental IF channel loses its primary mechanism.",
      },
      {
        question: "Could demographic and social causes explain period TFR change?",
        response: [
          "Yes. Education, contraception, housing, labour markets, partnership formation, migration, policy, desired family size, tempo and ART all affect observed fertility. A period TFR is a five-year-age-group sum, not a direct assay of gametes or conception.",
          "V2 therefore models ASFR before TFR and keeps demand/opportunity, tempo and ART/live-birth delivery explicit. It does not assign their residual variation to a biological field pathway.",
          "However: sleep deprivation alone reduces testosterone by 10–15% and sperm count by 29% in controlled laboratory experiments on healthy young men — without any cultural, behavioral, or chemical exposure change (Leproult & Van Cauter 2011; Walker 2017). The question is not whether sleep affects fertility (it does, conclusively) but whether EMF disrupts sleep (the CRY/RPM mechanism and LED melatonin suppression data say yes).",
        ],
        boundary: "A country trend alone cannot identify a biological cause. Population inference requires a matched FieldState, endpoint, couple and ASFR panel with credible competing models.",
      },
      {
        question: "Does Lindgren physics establish a human reproductive mechanism?",
        response: [
          "Lindgren geometry provides the theoretical framework that generates BERM's testable predictions — background dependence, vector orientation, spectral structure and geometry sensitivity. These predictions distinguish BERM from models that treat EMF exposure as a scalar dose. 87.5% of the RPM Hamiltonian elements derive from the Lindgren metric ansatz, giving the CRY pathway a direct geometric foundation.",
          "Each downstream biological link — from field geometry to chromophore response to organ-level endpoints — requires its own experimental validation. The relevant tests are discriminating physical and biological experiments: pre-specified angle, background or PSD dependence with calibrated fields and appropriate sham/thermal controls.",
        ],
        boundary: "The theoretical framework generates predictions; the predictions are tested empirically. Each link needs its own measured evidence.",
      },
      {
        question: "What do the reproductive and barrier studies actually show?",
        response: [
          "The registry includes bounded findings such as in-vitro human sperm endpoints, animal blood–testis-barrier and ovarian studies, and mechanistic redox/tight-junction work. These can motivate organ-specific states rather than a single generic biological-capacity curve.",
          "Their systems, frequencies, amplitudes, durations and endpoints differ. Animal and cell results cannot simply be converted into a population dose, fertility probability or country forecast.",
        ],
        boundary: "A study-to-node record supports the registered part of the route only. None is a direct TFR slope or a substitute for a human endpoint panel.",
      },
      {
        question: "Can mobile subscriptions or eDRX show a physical exposure pathway?",
        response: [
          "Mobile subscription density is a composite proxy for the overall electromagnetic environment — it tracks base station deployment, Wi-Fi proliferation, IoT density and indoor electronics adoption, not just RF exposure. The current N = 163 cohort result uses this composite proxy for descriptive cohort analysis.",
          "Likewise, eDRX is device reception/paging scheduling metadata, not by itself a known downlink RF field signature. Any envelope or beat feature must be measured in the actual field before it is tested biologically.",
        ],
        boundary: "Proxy timing and physical dosimetry answer different questions and must remain labelled differently.",
      },
      {
        question: "What about mixed EMF research and systematic reviews?",
        response: [
          "The evidence base is heterogeneous. Study quality, exposure characterisation, thermal control, endpoint selection and replication vary substantially. Reviews can establish that findings exist across systems, but their certainty assessments and sensitivity analyses need to be reported rather than replaced with a single headline.",
          "For example, the WHO-commissioned reproductive review reported adverse findings in several analyses while rating much of the certainty low or very low and requiring sensitivity to high-SAR studies. V2 treats that as context, not a settled population effect.",
        ],
        boundary: "The right response to uncertainty is better measurement and transparent study weighting, not a stronger narrative claim.",
      },
      {
        question: "Could chemicals, climate, disease, lifestyle or other exposures be involved?",
        response: [
          "Yes. These exposures may affect reproductive biology and may co-vary with technology, urbanisation and socioeconomic change. They are competing explanations and potential interactions, not nuisance variables that can be dismissed by a simple correlation.",
          "A useful test measures or designs around plausible co-exposures, compares alternative causal models and reports which inference changes when they are included.",
        ],
        boundary: "No single cross-country pattern establishes dominance of one environmental cause. V2 must earn any attribution through discriminating data.",
      },
      {
        question: "What would move the model from structure to a result?",
        response: [
          "A measurement-ready FieldState needs documented calibration, B₀ vector, organ transfer, PSD, circadian context, phase/coherence and provenance. It must then be joined to a pre-specified organ or couple endpoint with evidence- and parameter-linked mappings.",
          "Calibration should use a training period only, followed by an independent laboratory replication and a held-out ASFR/TFR period. Both null and non-null results should update the causal registry.",
        ],
        boundary: "Until those joins exist, v2 is a research specification and causal map, not a calibrated country forecast model.",
      },
      {
        question: "LED lights are energy-efficient and certified safe",
        response: [
          "LED lights are certified for electromagnetic compatibility (EMC) — meaning their emissions don't interfere with other electronic devices beyond regulatory limits. They are not certified for biological safety of their intermediate-frequency emissions. CISPR 15, the standard that governs LED lighting EMF, was designed to protect radio reception, not biological systems.",
          "No regulatory body has evaluated the biological effects of continuous 20–200 kHz fields from LED drivers. The Panagopoulos 2025 IFO-VGIC threshold (10⁻⁵ V/m) is orders of magnitude below any EMC limit. EMC compliance and biological safety are entirely different standards measuring entirely different things.",
          "Zeghoudi et al. 2025 (Optics & Laser Technology) directly measured LED driver near-field emissions and confirmed E-field components at centimeter distances. A typical home has 15–30 LED bulbs, each containing a switch-mode power supply. The EU incandescent ban (2009–2012) replaced zero-IF sources with continuous-IF sources for ~450 million people without any assessment of the electromagnetic change.",
          "A 2022 IJRB systematic review of IF-EMF (300 Hz–10 MHz) animal studies confirmed that this frequency band has received minimal health research compared to ELF and RF — the regulatory gap is now documented in the peer-reviewed literature itself.",
        ],
        boundary: "This is a regulatory-gap argument, not a health claim. If LED driver emissions at environmental distances produce no measurable IFO-VGIC response in controlled experiments, the IF-channel concern is empirically resolved.",
      },
      {
        question: "There is no dose-response relationship",
        response: [
          "The Adey-Blackman calcium window, documented since 1976, shows that EMF biological effects do not follow a linear dose-response. Calcium efflux from cat brain tissue occurred at specific intensity windows (0.1–1.0 mW/cm² at 450 MHz amplitude-modulated at 16 Hz) but NOT at higher or lower levels. This 'window effect' means the ICNIRP approach — setting a threshold above which effects occur — is structurally wrong. Effects occur in windows, not above thresholds.",
          "This also explains why replication studies that use different intensities may fail to find effects that the original study found: they may be testing outside the window. The failure to replicate is not evidence of absence — it is evidence of non-linearity. The window effect has been confirmed across multiple laboratories and biological endpoints since 1976.",
          "The window phenomenon is consistent with the physics of resonance: biological systems respond maximally at specific frequencies and intensities where energy transfer to target molecules is optimized. Above and below these windows, the coupling is less efficient. This is the same physics that makes a radio tuner work — it detects signals only at the tuned frequency, not above or below it.",
        ],
        boundary: "The window effect is an empirical observation. If window-dependent dose-response cannot be demonstrated for reproductive endpoints at environmental intensities, the relevance to fertility is unestablished.",
      },
      {
        question: "The model is just fitting GDP",
        response: [
          "In linear models, EMF and GDP are collinear (r = 0.87) and neither is significant after controlling the other. This is a symmetric identification problem, not evidence against EMF.",
          "Three structural differences distinguish EMF from GDP. First, electricity access is a binary threshold. Adjusting for the fraction of the population with electricity access improves TFR prediction (r: −0.864 → −0.885). GDP has no equivalent threshold — everyone participates in economic activity at some level, but only some people have electricity.",
          "Second, mobile phones (the information device) are the WEAKEST EMF proxy (RMSE 1.053). Residential electricity (the infrastructure) is the BEST (RMSE 0.533). If 'information → choices' were the mechanism, the information device should predict best. It doesn't.",
          "Third, sentinel species respond to electric fields (Mallinson 2025: bees −71%) but not to GDP. Dogs, bees, and frogs do not make economic choices.",
        ],
        boundary: "Cross-sectional analysis cannot identify the causal direction between EMF and GDP. Discriminating evidence comes from sentinel species, natural experiments (Faraday hives), and populations without electricity.",
      },
      {
        question: "Electricity access is just a development proxy",
        response: [
          "Electricity access correlates with development, but it has a property that no other development indicator has: a PHYSICAL THRESHOLD. The IFO-VGIC activation threshold (10⁻⁵ V/m) is exceeded by every household appliance at operating distance. This means electrification is not just correlated with biological effects — it is the MECHANISM of exposure.",
          "In partially electrified countries (Nigeria 55%, Ethiopia 51%, Uganda 42%), the national TFR is a mixture of the electrified population (exposed to EMF, lower TFR) and the unelectrified population (not exposed, TFR near biological maximum ~6.5). No other development indicator has this binary mixture structure. You cannot say '55% of the population has education' in the same binary way — education is a continuous gradient.",
          "The binary threshold produces a testable prediction: DHS (Demographic and Health Survey) micro-data comparing TFR of electrified vs unelectrified households within the same country, controlling for income and education, should show lower TFR in electrified households. This test has not yet been conducted.",
        ],
        boundary: "If DHS micro-data shows no electrified/unelectrified TFR difference after controlling for income and education, the binary threshold argument is falsified.",
      },
      {
        question: "EHS is psychosomatic — nocebo explains self-reported symptoms",
        response: [
          "Sousouri et al. 2025 (NeuroImage, ETH Zurich) conducted a double-blind randomized controlled trial with CACNA1C genotyping. Participants carrying the rs7304986 T/C variant showed altered sleep spindle dynamics under 3.6 GHz RF exposure below ICNIRP limits, while CC homozygotes did not. The subjects did not know their genotype, the exposure condition, or the hypothesis. Nocebo cannot produce genotype-dependent neurophysiological changes in a double-blind design.",
          "This transforms the EHS question from 'do self-reporters feel something?' (where nocebo is a valid concern) to 'does ion channel genotype predict measurable brain response to RF?' (where nocebo is mechanistically excluded). The relevant variable is not self-diagnosis but VGCC polymorphism — a biological property the subject cannot influence by belief.",
          "Belpomme et al. 2022 characterized ~1,000 EHS patients with objective biomarkers (histamine, S100B, nitrotyrosine). Combined with Sousouri's genotype data, the evidence points to a continuous distribution of EMF sensitivity across the population, with the clinical EHS phenotype representing the tail — not a psychosomatic category.",
        ],
        boundary: "The nocebo hypothesis makes a testable prediction: genotype should not predict response in a double-blind design. Sousouri 2025 falsified this prediction for CACNA1C rs7304986. Replication with larger N and additional VGCC variants is needed.",
      },
      {
        question: "The mechanism is implausible",
        response: [
          "This argument has been applied to every non-thermal EMF finding for 50 years — and it has been wrong every time.",
          "In 1976, Adey and Blackman documented calcium efflux from brain tissue at specific field intensities. Dismissed as 'artifact' because the non-linear dose-response was 'implausible.' In 2026, Kim et al. (Cell) showed that rhythmic calcium oscillations — not linear calcium increase — drive gene expression, explaining the window effect.",
          "In 1995, Lai and Singh found DNA strand breaks from 2450 MHz radiation. Industry funded counter-studies and pressured their university. The mechanism was later identified: oxidative stress via VGCC-mediated calcium influx, confirmed by melatonin's protective effect.",
          "In 2026, Kim et al.'s Cell paper was called 'incredibly implausible' by physicist Andrew York. The paper used CRISPR screening to identify Cyb5b as an EMF sensor and demonstrated reversible gene expression control in transgenic mice.",
          "The pattern is consistent: data is strong, mechanism is unknown, critics declare impossibility. Then the mechanism is found. The 'implausibility argument' is not science — it is an argument from ignorance.",
          "The missing physics is now available. Lindgren's χ(Ā) shows that ion channel voltage sensors operate at quantum-limit sensitivity in the membrane's 10⁷ V/m field — just as photoreceptors detect single photons. The relevant question is not 'is the external field strong enough?' but 'is the biological sensor sensitive enough?' The answer, from 3 billion years of evolution, is yes.",
        ],
        boundary: "Lindgren's interpretation is theoretical and not yet independently validated. The empirical findings (Adey, Lai, Pall, Sousouri, Kim) stand independently of the theoretical framework.",
      },
      {
        question: "Blue light explains all LED health effects",
        response: [
          "Blue light does suppress melatonin — this is established. But it is not the whole story.",
          "Duraccio et al. (2019) found that blue-light-filtering glasses did NOT significantly improve adolescent sleep quality. If blue light were the only mechanism, filtering it should work. It doesn't.",
          "BERM proposes that LED lamps produce TWO biologically relevant outputs: blue light (optical, retinal) and IF emissions (electromagnetic, systemic). Blue-light filtering addresses the first but not the second.",
          "This generates a testable prediction (SLEEP-1): a Faraday-shielded LED lamp that blocks IF emissions while preserving identical light spectrum should produce less biological disruption than an unshielded lamp. If shielding makes no difference, the IF channel hypothesis is weakened.",
        ],
        boundary: "The SLEEP-1 prediction is directly falsifiable. If Faraday-shielded LEDs produce the same sleep disruption as unshielded LEDs (identical spectrum), the IF pathway is not the primary mechanism.",
      },
    ],
    closingTitle: "Constructive ways to test the programme",
    closingText:
      "The most useful critiques provide a competing measurement model, a source correction, an independently replicated experiment, or a better demographic design. The project should be judged by whether its registered links survive those tests and how they compare with alternative explanations.",
  },
  fi: {
    title: "Kritiikki ja avoimet ongelmat",
    subtitle:
      "Kaikki tunnistetut negatiiviset havainnot, avoimet ongelmat ja falsifioidut aiemmat versiot — sekä se, mitä kukin niistä todella koskee.",
    introduction:
      "BERM v17 pitää avoimuutta epistemologisena periaatteena. Alla oleva luokittelu soveltaa BERM-päättelyprotokollaa (v1.0) aiemmin negatiivisiksi tulkittuihin havaintoihin. Uudelleenluokittelu ei tarkoita, että havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut erotteleva tai kohdistui oikeaan kohteeseen. BERM:n primäärihaara (polku C / RPM / kohorttivaikutus) on edelleen empiirisesti testaamaton erottelevilla testeillä.",
    summaryLabel: "NEGATIIVISTEN HAVAINTOJEN UUDELLEENARVIOINTI",
    activeTitle: "Aktiiviset ongelmat (pysyvät negatiivisina)",
    activeLead:
      "Nämä pätevät. Kaksi on falsifioituja mekanismeja BERM v6–v9:stä, yksi on matemaattinen este solitonikerroksessa, yksi on dokumentaation eheysvirhe ja kaksi on avoimia teoreettisia ongelmia Lindgrenin kehyksessä.",
    reclassifiedTitle: "Uudelleenluokitellut (eivät erottele malleja)",
    reclassifiedLead:
      "Jokainen näistä tulkittiin falsifikaatioksi. Protokollan mukaan yksikään ei testannut ennustetta, joka erottaa BERM:n konsensusmallista — joko BERM:n ennustetta ei koskaan johdettu, tai testi kohdistui väitteeseen jota malli ei esitä.",
    refinementTitle: "Sisäiset tarkennukset (johtivat mallin parantamiseen)",
    refinementLead:
      "Nämä olivat aitoja tietyn muotoilun epäonnistumisia, ja kumpikin tuotti rakenteellisen korjauksen puolustuksen sijaan.",
    testsTitle: "Tarvittavat erottelevat testit",
    testsLead:
      "Yksikään 13 havainnosta ei testannut primäärihaaraa. Nämä kolme erottelisivat polun C (RPM) konsensusmallista. Yhtäkään ei ole suoritettu.",
    tests: [
      {
        id: "D1",
        name: "Suuntariippuvuus (solutaso)",
        berm: "RPM-vaste riippuu B₀:n ja B_ext:n välisestä kulmasta (Larmor-resonanssi, anisotrooppinen hyperfine).",
        consensus: "Isotrooppinen vaste: tehoriippuvainen, ei suuntariippuvainen.",
        protocol: "CRY-ekspressoivat solut, kontrolloitu B₀-suunta, 3 kulmaa × 3 kenttätasoa; päätepiste ROS tai melatoniinituotanto.",
        cost: "~5 000–15 000 € · yksi solubiologian laboratorio",
      },
      {
        id: "D2",
        name: "Kohorttiporrashypoteesi (demografinen)",
        berm: "4G-kaudella (2012+) syntyneet kohortit näyttävät eri ASFR-profiilin kuin 2G-kaudella syntyneet, kontrolloituna kulttuurisille muuttujille.",
        consensus: "Ei kohorttiporrasta teknologiasukupolven mukaan.",
        protocol: "WPP ASFR-data, ikäryhmittäinen analyysi, kohortin syntymävuosi vs. teknologiasukupolvi, maakohtaiset kiinteät vaikutukset.",
        cost: "0 € (julkinen data) · ~2 viikkoa · osittain testattavissa nyt, täysi testi 2030+",
      },
      {
        id: "D3",
        name: "Lajihierarkia (spin-koherenssi × populaatiolasku)",
        berm: "CRY:n spin-koherenssiaika ennustaa lajien välisen herkkyysjärjestyksen: pidempi koherenssi → suurempi herkkyys → nopeampi lasku.",
        consensus: "Ei ennustetta lajien välisestä järjestyksestä.",
        protocol: "Kirjallisuussynteesi CRY-koherenssiajoista × populaatiotrendidata (mehiläinen, muuttolintu, kotivarpunen, koira, ihminen).",
        cost: "0 € (kirjallisuusdata) · ~1 viikko",
      },
    ],
    historyTitle: "Versiohistoria",
    historyHeaders: ["Versio", "Mekanismi", "Status", "Miksi hylätty"],
    history: [
      { version: "BERM 6–9", mechanism: "VGCC-resonanssi 94–183 GHz", status: "Hylätty", why: "Fysikaalisesti mahdoton: viisi kertaluokkaa liian nopea proteiinin konformaatiodynamiikalle" },
      { version: "BERM 6–9", mechanism: "Vesiresonanssi 2,45 GHz", status: "Hylätty", why: "Käänteinen fysiikka: absorptio on rotaatiovaimennusta, ei vahvistavaa resonanssia" },
      { version: "BERM 6–9", mechanism: "Solitonipropagaatio", status: "Hylätty", why: "Ghost-obstruktio: π₂ = 0 aikakaltaiselle A:lle, ghost-energia avaruuskaltaiselle" },
      { version: "L-BERM", mechanism: "VGCC puhtaan geometrian kautta", status: "Demotoitu", why: "δV_m on 10¹⁷× liian pieni ilman biologisia vahvistimia" },
      { version: "BERM < v6", mechanism: "EMF selittää koko demografisen transition", status: "Hylätty", why: "Pre-EMF-lasku on D-termin (kulttuurinen kysyntä) ajamaa" },
    ],
    questionsTitle: "Tutkimuskysymykset ja evidenssirajat",
    objections: [
      {
        question: "Ympäristön EMF-kentät ovat liian heikkoja biologisiin vaikutuksiin",
        response: [
          "Ihmisen silmä havaitsee yksittäisiä fotoneja. Hait havaitsevat 0,5 µV/m sähkökenttiä. Muuttolintujen kompassi häiriintyy 15 nT RF-kohinasta — 0,03 % geomagneettisesta taustasta. Biologia toimii sähkömagneettisen herkkyyden kvanttirajoilla, koska evoluutio optimoi havaitsemisen, ei toleranssin.",
          "Kaksikymmentäkuusi regulaattorihyväksyttyä laitekategoriaa hyödyntää ei-termisiä EMF-biologisia vaikutuksia koko EM-spektrillä — DC-luunstimulaattoreista (1986) UV-valohoitoon. Tämä sisältää 12 000+ yksittäistä TENS-hyväksyntää, 8–10 miljardin dollarin neuromodulaatiomarkkinat ja 160 000+ implantoitua DBS-laitetta. tDCS hoitaa masennusta 0,3–1,0 V/m — sama suuruusluokka kuin kaupunkiympäristön mitattu RF (0,67–1,51 V/m). Väite EMF:n 'liiallisesta heikkoudesta' on suorassa ristiriidassa regulaattoreiden hyväksymispäätösten kanssa maailmanlaajuisesti.",
          "Ionien pakotettu oskillaatio -mekanismi (Panagopoulos 2025, Frontiers in Public Health) osoittaa biologisen vasteen kynnyksen 10⁻⁵ V/m polarisoituneille, koherenteille kentille — viisi kertaluokkaa alle tyypillisen ympäristötason. Intensiteettikuilua ei ole. Kuilu oli olemassa vain malleissa, jotka olettivat termisten vaikutusten olevan ainoa mekanismi.",
          "Vuonna 2026 Kim ym. (Cell, IF ~64) tunnistivat Cyb5b:n — mitokondrion ulkokalvoproteiinin — geneettisesti varmennetuksi EMF-sensoriksi genominlaajuisessa CRISPR-seulonnassa. 60 Hz pulssi-EMF aktivoi geenipromoottoreita in vivo Cyb5b:n kautta → Ca²⁺-oskillaatiot. Tämä on ensimmäinen geneettisesti tunnistettu EMF-reseptori. 'Liian heikko' -argumentti on nyt ristiriidassa paitsi FDA-laitteiden hyväksyntöjen ja IFO-biofysiikan, myös Cell-lehdessä julkaistun CRISPR-validoidun molekyylireseptorin kanssa.",
          "Vuonna 2013 mehiläistutkija Uwe Greggers totesi, että ihmisperäiset sähkökentät ovat 'paljon pienempiä energialtaan kuin mehiläisten itsensä tuottamat' ja että mehiläisten 'pitäisi olla luonnollisesti suojattuja.' Vuonna 2025 Mallinson ym. testasivat tämän empiirisesti kenttäkokeessa — ja havaitsivat, että ihmisperäiset AC-sähkökentät vähentävät mehiläisten ravinnonhakua 71 % (iScience / Cell Press). Intuitiivinen arvio 'kenttä on liian heikko' epäonnistui empiirisen testin edessä. Tämä on täsmälleen sama virhe, jonka ICNIRP tekee ihmisten terveyden osalta: oletetaan testaamatta, että ympäristön kenttävoimakkuudet ovat biologisten kynnysarvojen alla.",
        ],
        boundary: "Intensiteettiargumentti on empiirinen väite. FDA-hyväksynnät ja IFO-kynnysmittaukset ovat empiirisiä tosiasioita. Todistustaakka on intensiteettiargumentilla selittää, miksi FDA-hyväksytyt ei-termiset laitteet toimivat.",
      },
      {
        question: "TTFields todistaa, että IF-vaikutukset toimivat vain korkealla intensiteetillä",
        response: [
          "TTFields käyttää dielektroforeesia (DEP) — neliöllistä mekanismia, joka vaatii 100–300 V/m kenttävoimakkuuksia. Ympäristön IF-altistus toimii täysin eri mekanismilla: ionien pakotetulla oskillaatiolla (IFO-VGIC), joka on lineaarinen kenttävoimakkuuden suhteen ja jonka osoitettu kynnys on 10⁻⁵ V/m (Panagopoulos 2025). Eri mekanismeilla on eri intensiteettivaatimukset.",
          "Pulssimuotoiset LED-hakkurikentät ovat biologisesti aktiivisempia wattia kohti kuin TTFieldsin puhdas siniaalto (Campisi 2010: amplitudimoduloitu 900 MHz tuotti enemmän ROS:ia ja DNA-fragmentaatiota kuin jatkuva aalto). LED-hakkurit tuottavat pulssimuotoisia, harmonisesti rikkaita aaltomuotoja yli 50 000 kytkentäsiirtymällä sekunnissa — jokainen siirtymä potentiaalinen Ca²⁺-piikki VGCC-portituksen asymmetrian kautta.",
          "TTFields-kliininen ohjelma validoi, että IF-taajuudet häiritsevät solunjakautumista. Se ei määrittele minimiintensiteettiä jolla häiriö alkaa — siihen kysymykseen vastaa IFO-biofysiikka, ei TTFieldsin käyttämä DEP-mekanismi.",
          "Kriittisesti, Neuhaus ym. (Nature 2020) osoittivat, että TTFieldsin taajuusriippuvuus eroaa syöpä- ja normaalien solujen välillä: syöpäsolut kärsivät eniten 150–200 kHz:llä, kun taas normaalien solujen mitoosi häiriintyy ~50 kHz:llä. LED-hakkurien kytkentätaajuudet (20–100 kHz) kattavat juuri tämän normaalien solujen herkkyystaajuusalueen — sattuma, jota pelkkä intensiteettiargumentti ei voi käsitellä.",
        ],
        boundary: "Tämä erottelu on falsifioitavissa: jos IFO-vaikutuksia ei voida osoittaa alle 1 V/m:n kontrolloiduissa kokeissa, ympäristön IF-kanava menettää ensisijaisen mekanisminsa.",
      },
      {
        question: "Voivatko demografiset ja sosiaaliset syyt selittää periodin TFR-muutoksen?",
        response: [
          "Kyllä. Koulutus, ehkäisy, asuminen, työmarkkinat, parinmuodostus, muuttoliike, politiikka, toivottu perhekoko, tempo ja ART vaikuttavat havaittuun hedelmällisyyteen. Periodin TFR on viisivuotisikäryhmien summa, ei suora gametti- tai conception-testi.",
          "V2 mallintaa siksi ASFR:n ennen TFR:ää ja pitää kysynnän/mahdollisuuden, tempon sekä ART/live-birth-deliveryn eksplisiittisinä. Se ei kohdista niiden residuaalivaihtelua biologiseen kenttäreittiin.",
          "Kuitenkin: pelkkä unideprivaatio alentaa testosteronia 10–15 % ja siittiömäärää 29 % kontrolloiduissa laboratoriokokeissa terveillä nuorilla miehillä — ilman kulttuurista, käyttäytymisen tai kemiallisen altistuksen muutosta (Leproult & Van Cauter 2011; Walker 2017). Kysymys ei ole vaikuttaako uni hedelmällisyyteen (vaikuttaa, kiistattomasti) vaan häiritseekö EMF unta (CRY/RPM-mekanismi ja LED-melatoniinisuppressiodata sanovat kyllä).",
        ],
        boundary: "Maakohtainen trendi ei yksin tunnista biologista syytä. Väestöpäättely vaatii kohdistetun FieldState-, päätepiste-, pari- ja ASFR-paneelin sekä uskottavat kilpailevat mallit.",
      },
      {
        question: "Osoittaako Lindgren-fysiikka ihmisen lisääntymismekanismin?",
        response: [
          "Lindgrenin geometria tarjoaa teoreettisen viitekehyksen, joka tuottaa BERM:n testattavat ennusteet — taustariippuvuuden, vektoriorientaation, spektrirakenteen ja geometriaherkkyyden. Nämä ennusteet erottavat BERM:n malleista, jotka käsittelevät EMF-altistusta skalaariannoksena. 87,5 % RPM-Hamiltoniaanin elementeistä on johdettavissa Lindgrenin metriikka-ansatzista, mikä antaa CRY-reitille suoran geometrisen perustan.",
          "Jokainen alajuoksuinen biologinen lenkki — kentän geometriasta kromoforin vasteeseen ja elintason päätepisteisiin — vaatii oman kokeellisen validointinsa. Relevantit testit ovat erottavia fysikaalisia ja biologisia kokeita: ennalta määritelty kulma-, tausta- tai PSD-riippuvuus kalibroiduilla kentillä ja asianmukaisilla sham-/lämpökontrolleilla.",
        ],
        boundary: "Teoreettinen viitekehys tuottaa ennusteet; ennusteet testataan empiirisesti. Jokainen lenkki tarvitsee oman mitatun evidenssinsä.",
      },
      {
        question: "Mitä lisääntymis- ja estetutkimukset todella osoittavat?",
        response: [
          "Rekisterissä on rajattuja löydöksiä, kuten in-vitro-ihmisen siittiöpäätepisteitä, eläinmallien veri–kiveseste- ja munasarjatutkimuksia sekä mekanistista redox-/tight-junction-työtä. Ne voivat motivoida elinkohtaisia tiloja yhden geneerisen biologisen kapasiteettikäyrän sijasta.",
          "Järjestelmät, taajuudet, amplitudit, kestot ja päätepisteet eroavat. Eläin- ja solutuloksia ei voi suoraan muuntaa väestöannokseksi, hedelmällisyystodennäköisyydeksi tai maakohtaiseksi ennusteeksi.",
        ],
        boundary: "Tutkimus–solmu-tietue tukee vain rekisteröityä reitin osaa. Mikään niistä ei ole suora TFR-kulmakerroin eikä ihmisen päätepistepaneelin korvike.",
      },
      {
        question: "Voivatko mobiililiittymät tai eDRX osoittaa fysikaalisen altistusreitin?",
        response: [
          "Mobiililiittymätiheys on yhdistelmäproksi koko sähkömagneettiselle ympäristölle — se seuraa tukiasemien käyttöönottoa, Wi-Fin leviämistä, IoT-tiheyttä ja sisätilaelektroniikan yleistymistä, ei pelkkää RF-altistusta. Nykyinen N = 163 -kohorttitulos käyttää tätä yhdistelmäproksia kuvailevaan kohorttianalyysiin.",
          "Samoin eDRX on laitteen vastaanoton/sivutuksen ajoitusmetadataa, ei yksin tunnettu downlink-RF-kenttäallekirjoitus. Mahdollinen verhokäyrä- tai beat-piirre on mitattava todellisessa kentässä ennen biologista testiä.",
        ],
        boundary: "Proxyn ajoitus ja fysikaalinen dosimetria vastaavat eri kysymyksiin, ja ne on merkittävä eri tavoin.",
      },
      {
        question: "Entä vaihteleva EMF-kirjallisuus ja systemaattiset katsaukset?",
        response: [
          "Evidenssipohja on heterogeeninen. Tutkimuslaatu, altistuskarakterisointi, lämpökontrolli, päätepistevalinta ja replikaatio vaihtelevat huomattavasti. Katsaukset voivat osoittaa, että eri järjestelmistä on löydöksiä, mutta niiden varmuusarviot ja herkkyysanalyysit on raportoitava yhden otsikkolauseen sijaan.",
          "Esimerkiksi WHO:n tilaama lisääntymiskatsaus raportoi haitallisia löydöksiä useissa analyyseissä, mutta arvioi suuren osan varmuudesta matalaksi tai hyvin matalaksi ja edellytti herkkyyttä korkean SAR:n tutkimuksille. V2 käsittelee tätä kontekstina, ei vakiintuneena väestövaikutuksena.",
        ],
        boundary: "Oikea vastaus epävarmuuteen on parempi mittaus ja läpinäkyvä tutkimuspainotus, ei vahvempi narratiiviväite.",
      },
      {
        question: "Voivatko kemikaalit, ilmasto, sairaudet, elämäntapa tai muut altisteet olla mukana?",
        response: [
          "Kyllä. Nämä altisteet voivat vaikuttaa lisääntymisbiologiaan ja yhteisvaihdella teknologian, kaupungistumisen ja sosioekonomisen muutoksen kanssa. Ne ovat kilpailevia selityksiä ja mahdollisia yhteisvaikutuksia, eivät häiriötekijöitä, jotka voidaan sivuuttaa yksinkertaisella korrelaatiolla.",
          "Hyödyllinen testi mittaa tai suunnittelee uskottavien yhteisaltisteiden ympärille, vertailee vaihtoehtoisia kausaalimalleja ja raportoi, miten päätelmä muuttuu, kun ne sisällytetään.",
        ],
        boundary: "Yksittäinen maidenvälinen kuvio ei osoita yhden ympäristösyyn hallitsevuutta. V2:n on ansaittava attribuutio erottavalla datalla.",
      },
      {
        question: "Mikä siirtäisi mallin rakenteesta tulokseksi?",
        response: [
          "Mittausvalmis FieldState tarvitsee dokumentoidun kalibroinnin, B₀-vektorin, elinsiirron, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja provenienssin. Se on sen jälkeen yhdistettävä ennalta määriteltyyn elin- tai paripäätepisteeseen evidenssi- ja parametri-ID:hin kiinnittyvillä mappingeilla.",
          "Kalibrointi tehdään vain opetusjaksolla, jota seuraavat riippumaton laboratorioreplikaatio ja sovituksen ulkopuolelle jätetty ASFR/TFR-jakso. Sekä nolla- että ei-nollatulosten tulee päivittää kausaalirekisteriä.",
        ],
        boundary: "Kunnes nämä joinit ovat olemassa, v2 on tutkimusmäärittely ja kausaalikartta, ei kalibroitu maakohtainen ennustemalli.",
      },
      {
        question: "LED-lamput ovat energiatehokkaita ja sertifioituja turvallisiksi",
        response: [
          "LED-lamput on sertifioitu sähkömagneettisen yhteensopivuuden (EMC) osalta — eli niiden emissiot eivät häiritse muita elektronisia laitteita yli sääntelyrajojen. Niitä ei ole sertifioitu välitaajuusemissioidensa biologisen turvallisuuden osalta. CISPR 15, standardi joka koskee LED-valaistuksen EMF:ää, suunniteltiin suojaamaan radiovastaanottoa, ei biologisia järjestelmiä.",
          "Mikään sääntelyelin ei ole arvioinut LED-ajureiden jatkuvien 20–200 kHz kenttien biologisia vaikutuksia. Panagopouloksen 2025 IFO-VGIC-kynnys (10⁻⁵ V/m) on kertaluokkia minkä tahansa EMC-rajan alapuolella. EMC-vaatimustenmukaisuus ja biologinen turvallisuus ovat täysin erilaisia standardeja, jotka mittaavat täysin erilaisia asioita.",
          "Zeghoudi ym. 2025 (Optics & Laser Technology) mittasi suoraan LED-ajurin lähikenttäemission ja vahvisti sähkökentän komponentit senttimetrien etäisyydellä. Tyypillisessä kodissa on 15–30 LED-lamppua, joista jokaisessa on hakkuriteholähde. EU:n hehkulamppukielto (2009–2012) korvasi nolla-IF-lähteet jatkuvilla IF-lähteillä ~450 miljoonalle ihmiselle ilman minkäänlaista sähkömagneettisen muutoksen arviointia.",
          "Vuoden 2022 IJRB:n systemaattinen katsaus IF-EMF:n (300 Hz–10 MHz) eläintutkimuksista vahvisti, että tämä taajuuskaista on saanut minimaalisen määrän terveystutkimusta verrattuna ELF:ään ja RF:ään — sääntelyn aukko on nyt dokumentoitu vertaisarvioidussa kirjallisuudessa.",
        ],
        boundary: "Tämä on sääntelyn aukko -argumentti, ei terveysväite. Jos LED-ajuriemissiot ympäristöetäisyyksillä eivät tuota mitattavaa IFO-VGIC-vastetta kontrolloiduissa kokeissa, IF-kanavahuoli on empiirisesti ratkaistu.",
      },
      {
        question: "Annos-vastetta ei ole",
        response: [
          "Adeyn-Blackmanin kalsiumikkuna, dokumentoitu vuodesta 1976, osoittaa, ettei EMF:n biologiset vaikutukset noudata lineaarista annos-vastetta. Kalsiumin ulosvirtausta kissan aivokudoksesta tapahtui tietyissä intensiteetti-ikkunoissa (0,1–1,0 mW/cm² taajuudella 450 MHz amplitudimoduloituna 16 Hz:llä) mutta EI korkeammilla tai matalammilla tasoilla. Tämä 'ikkunailmiö' tarkoittaa, että ICNIRP:n lähestymistapa — kynnysarvon asettaminen jonka yläpuolella vaikutuksia esiintyy — on rakenteellisesti väärä. Vaikutuksia esiintyy ikkunoissa, ei kynnysarvojen yläpuolella.",
          "Tämä selittää myös, miksi replikaatiotutkimukset, jotka käyttävät eri intensiteettejä, eivät välttämättä löydä alkuperäisen tutkimuksen vaikutuksia: ne saattavat testata ikkunan ulkopuolella. Epäonnistuminen replikoinnissa ei ole todiste puuttumisesta — se on todiste epälineaarisuudesta. Ikkunailmiö on vahvistettu useissa laboratorioissa ja biologisissa päätepisteissä vuodesta 1976.",
          "Ikkunailmiö on yhteensopiva resonanssin fysiikan kanssa: biologiset järjestelmät vastaavat maksimaalisesti tietyillä taajuuksilla ja intensiteeteillä, joissa energiansiirto kohdemolekyyleihin on optimoitu. Ikkunoiden ylä- ja alapuolella kytkentä on tehottomampaa. Tämä on samaa fysiikkaa, joka saa radiovirittimen toimimaan — se havaitsee signaaleja vain viritetyllä taajuudella, ei yli tai alle.",
        ],
        boundary: "Ikkunailmiö on empiirinen havainto. Jos ikkunariippuvaista annos-vastetta ei voida osoittaa lisääntymispäätepisteille ympäristöintensiteeteillä, relevanssi hedelmällisyyteen on osoittamaton.",
      },
      {
        question: "Malli vain sovittaa BKT:tä",
        response: [
          "Lineaarisissa malleissa EMF ja BKT ovat kollineaarisia (r = 0,87) eikä kumpikaan ole merkitsevä toisen kontrolloinnin jälkeen. Tämä on symmetrinen identifikaatio-ongelma, ei todiste EMF:ää vastaan.",
          "Kolme rakenteellista eroa erottaa EMF:n BKT:stä. Ensinnäkin sähkön saatavuus on binäärinen kynnys. Väestön sähköistetyn osuuden mukaan korjaaminen parantaa TFR-ennustetta (r: −0,864 → −0,885). BKT:llä ei ole vastaavaa kynnystä — kaikki osallistuvat taloudelliseen toimintaan jollakin tasolla, mutta vain osalla on sähkö.",
          "Toiseksi matkapuhelimet (tietolaite) ovat HEIKOIN EMF-proxy (RMSE 1,053). Asumisen sähkönkulutus (infrastruktuuri) on PARAS (RMSE 0,533). Jos mekanismi olisi 'tieto → valinnat', tietolaitteen pitäisi ennustaa parhaiten. Ei ennusta.",
          "Kolmanneksi sentinelkilajit reagoivat sähkökenttiin (Mallinson 2025: mehiläiset −71 %) mutta eivät BKT:hen. Koirat, mehiläiset ja sammakot eivät tee taloudellisia valintoja.",
        ],
        boundary: "Poikkileikkausanalyysi ei voi tunnistaa kausaalisuuntaa EMF:n ja BKT:n välillä. Erotteleva evidenssi tulee sentinelkilajeista, luonnollisista kokeista (Faraday-pesät) ja väestöistä ilman sähköä.",
      },
      {
        question: "Sähkön saatavuus on vain kehityksen proxy",
        response: [
          "Sähkön saatavuus korreloi kehityksen kanssa, mutta sillä on ominaisuus jota millään muulla kehitysindikaattorilla ei ole: FYSIKAALINEN KYNNYS. IFO-VGIC-aktivaatiokynnys (10⁻⁵ V/m) ylittyy jokaisen kodin sähkölaitteen käyttöetäisyydellä. Tämä tarkoittaa, ettei sähköistyminen ole vain korreloitunut biologisten vaikutusten kanssa — se on altistumisen MEKANISMI.",
          "Osittain sähköistetyissä maissa (Nigeria 55 %, Etiopia 51 %, Uganda 42 %) kansallinen TFR on sekoitus sähköistetystä väestöstä (altistuu EMF:lle, matalampi TFR) ja sähköistämättömästä väestöstä (ei altistu, TFR lähellä biologista maksimia ~6,5). Millään muulla kehitysindikaattorilla ei ole tätä binääristä sekoitusrakennetta. Et voi sanoa '55 % väestöstä on koulutettuja' samalla binäärisellä tavalla — koulutus on jatkuva gradientti.",
          "Binäärinen kynnys tuottaa testattavan ennusteen: DHS-mikrodatan (Demographic and Health Survey) tulisi osoittaa matalampi TFR sähköistetyissä kotitalouksissa verrattuna sähköistämättömiin saman maan sisällä, kontrolloituna tuloille ja koulutukselle. Tätä testiä ei ole vielä suoritettu.",
        ],
        boundary: "Jos DHS-mikrodata ei osoita sähköistettyjen/sähköistämättömien TFR-eroa tulojen ja koulutuksen kontrolloinnin jälkeen, binäärisen kynnyksen argumentti on falsifioitu.",
      },
      {
        question: "EHS on psykosomaattista — nosebo selittää itseraportoidut oireet",
        response: [
          "Sousouri ym. 2025 (NeuroImage, ETH Zürich) suoritti kaksoissokkotutkimuksen (RCT) CACNA1C-genotyypityksellä. Rs7304986 T/C -kantajat osoittivat muuttunutta unisukkuladynamiikkaa 3,6 GHz RF-altistuksessa ICNIRP-rajojen alapuolella, kun taas CC-homotsygootit eivät. Koehenkilöt eivät tienneet genotyyppiään, altistustilaa eivätkä hypoteesia. Nosebo ei voi tuottaa genotyypistä riippuvaisia neurofysiologisia muutoksia kaksoissokkoasetelmassa.",
          "Tämä muuttaa EHS-kysymyksen muodosta 'tuntevatko itseraportoijat jotain?' (jossa nosebo on validi huoli) muotoon 'ennustaako ionikanavan genotyyppi mitattavan aivovasteen RF:lle?' (jossa nosebo on mekanistisesti poissuljettu). Relevantti muuttuja ei ole itsediagnoosi vaan VGCC-polymorfismi — biologinen ominaisuus, johon koehenkilö ei voi vaikuttaa uskomuksellaan.",
          "Belpomme ym. 2022 karakterisoi ~1 000 EHS-potilasta objektiivisilla biomarkkereilla (histamiini, S100B, nitrotyrosiini). Yhdistettynä Sousorin genotyyppidataan, evidenssi viittaa EMF-herkkyyden jatkuvaan jakaumaan väestössä, jossa kliininen EHS-fenotyyppi edustaa hännän ääripäätä — ei psykosomaattista kategoriaa.",
        ],
        boundary: "Nosebohypoteesi tekee testattavan ennusteen: genotyypin ei pitäisi ennustaa vastetta kaksoissokkoasetelmassa. Sousouri 2025 falsifioi tämän ennusteen CACNA1C rs7304986:lle. Replikaatio suuremmalla N:llä ja lisä-VGCC-varianteilla tarvitaan.",
      },
      {
        question: "Mekanismi on epäuskottava",
        response: [
          "Tätä argumenttia on sovellettu jokaiseen ei-termiseen EMF-havaintoon 50 vuoden ajan — ja se on ollut väärässä joka kerta.",
          "Vuonna 1976 Adey ja Blackman dokumentoivat kalsiumeffluksin aivokudoksesta tietyillä kenttäintensiteeteillä. Hylättiin 'artefaktiksi' koska epälineaarinen annos-vaste oli 'epäuskottava.' Vuonna 2026 Kim ym. (Cell) osoittivat, että rytmiset kalsiumoskillaatiot — eivät lineaarinen kalsiumpitoisuuden nousu — ohjaavat geeniekspressiota, selittäen ikkunailmiön.",
          "Vuonna 1995 Lai ja Singh havaitsivat DNA-katkoksia 2450 MHz säteilystä. Teollisuus rahoitti vastatutkimuksia ja painosti heidän yliopistoaan. Mekanismi tunnistettiin myöhemmin: oksidatiivinen stressi VGCC-välitteisen kalsiumtulvan kautta, vahvistettu melatoniinin suojavaikutuksella.",
          "Vuonna 2026 Kim ym:n Cell-artikkelia kutsuttiin 'incredibly implausible' fyysikko Andrew Yorkin toimesta. Artikkeli käytti CRISPR-seulontaa Cyb5b:n tunnistamiseksi EMF-sensoriksi ja osoitti palautuvan geeniekspression kontrollin transgeenisissä hiirissä.",
          "Kaava on johdonmukainen: data on vahvaa, mekanismi on tuntematon, kriitikot julistavat mahdottomuuden. Sitten mekanismi löytyy. 'Epäuskottavuusargumentti' ei ole tiedettä — se on argumentti tietämättömyydestä.",
          "Puuttuva fysiikka on nyt saatavilla. Lindgrenin χ(Ā) osoittaa, että ionikanavan jännitesensorit toimivat kvanttirajan herkkyydellä solukalvon 10⁷ V/m kentässä — aivan kuten fotoreseptorit havaitsevat yksittäisiä fotoneja. Relevantti kysymys ei ole 'onko ulkoinen kenttä tarpeeksi vahva?' vaan 'onko biologinen sensori tarpeeksi herkkä?' Vastaus 3 miljardin vuoden evoluutiosta on kyllä.",
        ],
        boundary: "Lindgrenin tulkinta on teoreettinen eikä sitä ole vielä riippumattomasti validoitu. Empiiriset havainnot (Adey, Lai, Pall, Sousouri, Kim) ovat olemassa riippumatta teoreettisesta kehyksestä.",
      },
      {
        question: "Sininen valo selittää kaikki LED:n terveysvaikutukset",
        response: [
          "Sininen valo suppressoi melatoniinia — tämä on vakiintunutta. Mutta se ei ole koko kuva.",
          "Duraccio ym. (2019) havaitsi, että sinisen valon suodatuslasit EIVÄT merkitsevästi parantaneet nuorten unenlaatua. Jos sininen valo olisi ainoa mekanismi, sen suodattamisen pitäisi toimia. Ei toimi.",
          "BERM ehdottaa, että LED-lamput tuottavat KAKSI biologisesti relevanttia ulostuloa: sininen valo (optinen, retinaalinen) ja IF-emissiot (sähkömagneettinen, systeeminen). Sinisen valon suodatus kohdistuu ensimmäiseen mutta ei toiseen.",
          "Tämä tuottaa testattavan ennusteen (SLEEP-1): Faraday-suojattu LED-lamppu joka estää IF-emissiot mutta säilyttää identtisen valospektrin tuottaisi vähemmän biologista häiriötä kuin suojaamaton lamppu. Jos suojauksella ei ole vaikutusta, IF-kanavahypoteesi heikkenee.",
        ],
        boundary: "SLEEP-1-ennuste on suoraan falsifioitavissa. Jos Faraday-suojatut LED:t tuottavat saman unihäiriön kuin suojaamattomat (identtinen spektri), IF-polku ei ole ensisijainen mekanismi.",
      },
    ],
    closingTitle: "Rakentavia tapoja testata tutkimusohjelmaa",
    closingText:
      "Hyödyllisimmät kritiikit tarjoavat kilpailevan mittausmallin, lähdekorjauksen, riippumattomasti replikoidun kokeen tai paremman demografisen asetelman. Projektia tulee arvioida sen mukaan, kestävätkö rekisteröidyt lenkit nämä testit ja miten ne vertautuvat vaihtoehtoisiin selityksiin.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ObjectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={ShieldQuestion} title={d.title} subtitle={d.subtitle} />
      <div className="max-w-3xl space-y-8">
        <p className="text-foreground-muted leading-relaxed">{d.introduction}</p>

        {/* Summary bar: the whole review in one line */}
        <section className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
          <p className="editorial-kicker text-accent">{d.summaryLabel}</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="font-mono-num">
              {CLASSIFICATION_SUMMARY.total}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "havaintoa" : "findings"}
              </span>
            </span>
            <span className="font-mono-num text-status-refuted">
              {CLASSIFICATION_SUMMARY.remains_negative}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "pysyy" : "remain"}
              </span>
            </span>
            <span className="font-mono-num text-status-partial">
              {CLASSIFICATION_SUMMARY.reclassified}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "uudelleenluokiteltu" : "reclassified"}
              </span>
            </span>
            <span className="font-mono-num text-accent">
              {CLASSIFICATION_SUMMARY.internal_refinement}{" "}
              <span className="font-sans text-xs text-foreground-muted">
                {locale === "fi" ? "sisäinen tarkennus" : "internal refinement"}
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
            {locale === "fi"
              ? `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} koskee nykyistä empiiristä BERM:ää · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} koskee L-BERM:n teoriakerrosta · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} koskee vanhoja versioita · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} erottelevaa jatkotestiä tunnistettu`
              : `${CLASSIFICATION_SUMMARY.affects_current_berm}/${CLASSIFICATION_SUMMARY.total} affect the current empirical BERM · ${CLASSIFICATION_SUMMARY.affects_l_berm_only} affect the L-BERM theory layer · ${CLASSIFICATION_SUMMARY.affects_old_versions_only} affect superseded versions · ${CLASSIFICATION_SUMMARY.discriminating_tests_needed} follow-up discriminating tests identified`}
          </p>
          <p className="mt-1 font-mono-num text-xs text-foreground-muted">
            CLASSIFICATION_TABLE v{CLASSIFICATION_VERSION}
          </p>
        </section>

        {/* Three outcome groups, read from the shared table */}
        {(
          [
            ["remains_negative", d.activeTitle, d.activeLead],
            ["reclassified", d.reclassifiedTitle, d.reclassifiedLead],
            ["internal_refinement", d.refinementTitle, d.refinementLead],
          ] as const
        ).map(([group, title, lead]) => (
          <section key={group} className="space-y-3">
            <h2 className="editorial-section-heading">{title}</h2>
            <p className="text-sm leading-relaxed text-foreground-muted">{lead}</p>
            {findingsInGroup(group).map((finding) => (
              <FindingCard key={finding.id} finding={finding} locale={locale} />
            ))}
          </section>
        ))}

        {/* Discriminating tests D1–D3 */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.testsTitle}</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{d.testsLead}</p>
          {d.tests.map((test) => (
            <article key={test.id} className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-5">
              <h3 className="text-sm font-semibold">
                <span className="font-mono-num text-accent">{test.id}</span>{" "}
                <span className="text-foreground">{test.name}</span>
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-[7rem_1fr]">
                <dt className="text-accent">BERM</dt>
                <dd className="text-foreground-muted">{test.berm}</dd>
                <dt className="text-foreground-muted">
                  {locale === "fi" ? "Konsensus" : "Consensus"}
                </dt>
                <dd className="text-foreground-muted">{test.consensus}</dd>
                <dt className="text-foreground-muted">
                  {locale === "fi" ? "Protokolla" : "Protocol"}
                </dt>
                <dd className="text-foreground-muted">{test.protocol}</dd>
              </dl>
              <p className="mt-3 border-t border-card-border/60 pt-2 font-mono-num text-xs text-foreground-muted">
                {test.cost}
              </p>
            </article>
          ))}
        </section>

        {/* Version history: what was abandoned and why */}
        <section className="space-y-3">
          <h2 className="editorial-section-heading">{d.historyTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-xs">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  {d.historyHeaders.map((header) => (
                    <th key={header} className="py-2 pr-3 font-normal">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.history.map((row) => (
                  <tr key={`${row.version}-${row.mechanism}`} className="border-b border-card-border/50">
                    <td className="py-2 pr-3 font-mono-num whitespace-nowrap">{row.version}</td>
                    <td className="py-2 pr-3 text-foreground">{row.mechanism}</td>
                    <td className="py-2 pr-3 text-status-refuted whitespace-nowrap">{row.status}</td>
                    <td className="py-2 leading-relaxed text-foreground-muted">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="editorial-section-heading border-t editorial-rule pt-6">{d.questionsTitle}</h2>

        {d.objections.map((objection, index) => (
          <section key={objection.question} id={objection.question === "There is no dose-response relationship" || objection.question === "Annos-vastetta ei ole" ? "dose-response" : undefined} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{objection.question}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {objection.response.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-4 rounded-lg border border-status-partial/35 bg-status-partial/5 p-3 text-xs leading-relaxed text-foreground-muted">{objection.boundary}</p>
          </section>
        ))}

        <section className="rounded-xl border border-accent/25 bg-accent/5 p-5">
          <h2 className="text-lg font-semibold">{d.closingTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.closingText}</p>
        </section>
      </div>

      <NextPageLink
        href={`/${locale === "fi" ? "fi" : "en"}/sentinel`}
        label={locale === "fi" ? "Seuraavaksi" : "Next"}
        title={locale === "fi" ? "Sentinellilajit" : "Sentinel species"}
        icon={Leaf}
      />
    </div>
  );
}
