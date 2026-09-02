import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap, TreePine, Navigation, TrendingDown } from "lucide-react";
import { BermIcon } from "@/components/BermIcon";
import { NextPageLink } from "@/components/NextPageLink";
import { FalsificationTestsV19 } from "@/components/FalsificationTestsV19";
import { SentinelCascade } from "@/components/SentinelCascade";
import { SentinelCascadeTimeline } from "@/components/SentinelCascadeTimeline";
import { NikeBBSScatter } from "@/components/NikeBBSScatter";
import { PulseProfile } from "@/components/PulseProfile";
import { VarroaCascade } from "@/components/VarroaCascade";
import { SpeciesSilhouetteInset } from "@/components/SpeciesSilhouetteInset";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import sentinelRegistry from "@/public/data/sentinel_registry.json";

/* Cross-species EMF gradient: dataset + fit exported from berm.diagnostics.cross_species_gradient */
type GradientPoint = { name: string; emf_burden: number; reproductive_decline_pct: number; source: string; note: string };
const GRADIENT_POINTS = sentinelRegistry.emf_gradient.data_points as GradientPoint[];
const GRADIENT_FIT = sentinelRegistry.emf_gradient as { pearson_r: number; r_squared: number; p_value: number; n: number };
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Sentinel species: data readiness",
    subtitle: "Cross-species observations can motivate a registered test, but they cannot substitute for measured exposure, compatible endpoints and competing-cause data.",

    csliTitle: "Cross-Species Lag Signal: Empirical Results",
    csliP1: "In a source-verified 23-country COLOSS panel, bee colony winter loss increases precede TFR declines by approximately 2 years: 20/23 countries show the BERM-direction pattern (pooled within-country r = −0.272, circular-shift p = 0.006, 8-lag Bonferroni p = 0.046). The signal replicates across two independent TFR products ([[ref:world_bank_wdi_2024|World Bank]] and [[ref:nations2024|WPP 2024]]).",
    csliP2: "The lag structure follows biological scaling. Aphids and honeybees show the shortest response (~2 years), consistent with short lifecycles. Breeding birds follow at 2–3 years. Moths at 3–4 years. Dogs predict human sperm concentration at ~3 years (r = 0.505, p = 0.012). Common toads show the longest lag at ~6 years, consistent with their longer lifecycle and population dynamics.",
    csliP3: "Year-change analysis (Δbee → ΔTFR) confirms temporal co-variation beyond co-trending. Americas (4/4) and Asia–Pacific (6/6) are uniformly BERM-direction; Europe is weaker (13/21). The 8 anti-direction European countries are informative: they identify conditions where beekeeping practice, pesticide policy, or immigration buffering modifies the sentinel chain.",
    csliStats: "20/23 BERM-direction · circular-shift p = 0.006 · pooled r = −0.272 · Bonferroni p = 0.046",
    csliNote: "All results are correlational [C] from BERM internal analyses. They are not peer-reviewed. A common confounder (e.g. agricultural chemicals, climate change) could produce the same pattern without EMF. Lag values are discovery-scan peaks, not pre-locked constants.",

    nikeTitle: "Spatial gradient: Cold War radar sites and bird populations",
    nikeText: "Spatial analysis of 1,381 Breeding Bird Survey routes near 268 Cold War Nike radar/fire control sites (median start 1956) reveals a BERM-direction gradient: routes within 50 km of active sites showed −0.526%/year population trends versus +0.096%/year for routes >100 km away (difference 0.622 percentage points, Welch p = 0.031). Continuous distance correlation: Spearman ρ = +0.088, p = 0.001 — farther from radar, better bird trends.",
    nikePeakFieldText: "The result is consistent with BERM's peak-field hypothesis. Nike LOPAR/HIPAR main beams pointed upward; ground-level exposure came from sidelobe pulses following 1/r² attenuation. Sidelobe peak field at 1 km: ~24.5 V/m during a single 1 µs pulse, while the time-averaged RMS is only 0.037 V/m (ratio 671:1). BERM pathways A (VGIC, 45%), B (CRY/RPM, 25%) and D (HPA, 15%) are threshold or pulse mechanisms that respond to peak field, not time-averaged RMS. The monotonic 1/r² gradient is the expected spatial profile of these pathways; the quadratic term from Test A (β₂ p = 0.780) confirms the monotonic 1/r² form. The CRY/RPM radical-pair lifetime (~1 µs) matches the radar pulse duration (~1 µs) — each pulse covers the radical pair's entire singlet-triplet conversion window, 400 times per second.",
    nikeRichnessNote: "Species richness and abundance diverge: the richness gradient persists in within-state permutation (p = 0.006), but the abundance trend weakens when state-level confounders are controlled (p = 0.103). This means radar proximity predicts which species are present more reliably than how many individuals survive. The bird signal is detrended (slow, structural) — it does not appear in first-difference (fast, year-to-year) analysis. The same split shows in the European panel: in the 27-country PECBMS breeding-bird composite (2002–2022) the detrended index leads TFR decline by about 2.5 years (21/27 countries in the BERM direction, r = 0.182, q = 0.00013), while the first-difference series carries no such lead (q = 0.528). The population response is a slow trend, not a year-to-year pulse.",
    nikeCounterText: "However, site closure did not predict bird recovery, and active site count correlated with higher bird abundance (possible infrastructure-habitat or siting bias). This constrains interpretation: proximity gradient exists but simple 'more sites = more damage' does not hold. The VGIC threshold exceedance at 24.5 V/m is a model prediction, not confirmed by cell experiment. The CRY 1 µs temporal match is a physical coincidence, not a demonstrated resonance mechanism.",

    frogTitle: "Amphibians near radar: an inverted signal",
    frogText: "Nike-NAAMP frog survey data shows an unexpected inversion: frog calling indices trend better near active Nike sites (+0.040/decade) than farther away (+0.002/decade, difference p = 0.045). This is the opposite of the bird result and requires explanation.",
    frogInterpretation: "The inverted result is consistent when species-specific RF attenuation is considered. Frogs live in water and moist soil — media that attenuate RF strongly (water relative permittivity ε_r ≈ 80). A frog in water is effectively shielded from peak-field pulses. Birds are in open air with no attenuating medium — peak field reaches them at full strength. Additionally, Nike site security zones provide undisturbed wetland habitat for amphibians. The bird negative gradient (p = 0.031) and frog positive gradient (p = 0.045) are both consistent with the peak-field model when habitat RF attenuation is accounted for. This does not confirm the EMF hypothesis — the water-attenuation explanation is physically motivated but not measured in this context.",
    frogAggregateTitle: "Frog-EMF aggregate result",
    frogAggregate: [
      "Nike-NAAMP inverse association (p = 0.045) → water attenuation + habitat confound",
      "Tropical S-band BERM-inconsistent (OR = 1.474, p = 0.016)",
      "Australian timeline inconsistent for JORN",
      "8.7× absorption coefficient NOT confirmed from primary source",
    ],

    aquaticTitle: "Aquatic Axis: The Natural Channel Separator",
    aquaticP1: "The frog result reveals a deeper principle. Water attenuates RF exponentially — at 1 GHz the skin depth in seawater is less than 1 cm. ELF (50/60 Hz) penetrates tens of metres. An aquatic organism lives in a natural bandpass filter: it receives ELF but is shielded from RF. A terrestrial organism receives both simultaneously, plus their superadditive interactions.",
    aquaticP2: "A [[ref:superpos_172|172-study systematic review (Biomolecules 2025)]] found that multi-source EMF environments often produce synergistic biological effects. Aquatic organisms are exempt from this superposition — they experience only the ELF channel. This makes the aquatic axis the only way to separate ELF from RF effects without proxy assumptions or controlled laboratory conditions.",
    aquaticP3: "The CatSper calcium channel — essential for sperm hyperactivation and fertilization — is [[ref:catsper_20yr|evolutionarily conserved from sea urchin to human (Physiology 2022)]]. Aquatic reproduction depends on the same ion channel that BERM identifies as EMF-sensitive. Submarine power cables emit 50 Hz ELF fields detectable at ~35 m — creating a natural gradient experiment for marine organisms with CatSper-dependent fertilization.",
    aquaticP4: "[[ref:calves_dark|Kolbabova et al. (Sci. Rep. 2015)]] demonstrated that ELF magnetic fields affect melatonin in calves even in complete darkness, confirming the ELF pathway operates independently of light. Aquatic organisms experience precisely this isolated ELF pathway — making them the cleanest natural test of whether ELF alone is biologically active at environmental levels.",
    aquaticSkinDepth: [
      { medium: "Seawater", freq: "1 GHz (RF)", depth: "< 1 cm" },
      { medium: "Seawater", freq: "50 Hz (ELF)", depth: "~250 m" },
      { medium: "Freshwater", freq: "1 GHz (RF)", depth: "~3 cm" },
      { medium: "Freshwater", freq: "50 Hz (ELF)", depth: "~700 m" },
      { medium: "Air", freq: "1 GHz (RF)", depth: "∞ (no attenuation)" },
      { medium: "Air", freq: "50 Hz (ELF)", depth: "∞ (no attenuation)" },
    ],
    aquaticNote: "The aquatic axis is a structural argument, not a confirmed result. No study has yet measured submarine cable ELF effects on marine reproductive success with the controlled design described here. Existing BOEM risk assessments and Scandinavian offshore studies may contain relevant data. CatSper sensitivity to ELF has not been directly tested in any organism.",
    aquaticMediumHeader: "Medium",
    aquaticFreqHeader: "Frequency",
    aquaticDepthHeader: "Skin depth (δ)",

    batTitle: "Bats: Mammalian compass disrupted",
    batP1: "In May 2026, a team led by [[ref:lindecke2026|Oliver Lindecke]] published in Science the first experimental demonstration that radiofrequency electromagnetic noise disrupts a mammal's magnetic compass. Migratory soprano pipistrelle bats (Pipistrellus pygmaeus) were exposed to weak broadband RF noise (0.01–300 MHz) — at levels found in normal urban environments — for just 30 minutes during sunset. Control bats oriented normally toward their expected migratory direction. RF-exposed bats departed in random directions.",
    batP2: "The most unexpected finding was the duration of the effect. In previous studies on migratory birds, the magnetic compass recovered immediately after RF exposure ended. In bats, the disorientation persisted for more than two hours. The researchers concluded that electromagnetic pollution may affect animal behavior 'in more complex ways than previously thought,' and that the 'widely anticipated increase of electromagnetic pollution may further add to the effects of anthropogenic climate change.'",
    batP3: "This finding has three direct implications for the BERM framework. First, it extends the RPM/CRY compass disruption mechanism from birds ([[ref:engels2014|Engels 2014]], Mouritsen 2014) to mammals — the first taxonomic class jump, published in a top-tier journal. Second, the hours-long disorientation provides a mechanistic basis for bat mortality at wind turbines: bats navigating near turbines with disrupted compasses would be at elevated collision risk. Third, the Science editors explicitly note that RF noise of this kind is 'produced by electronics, power lines, and even LED lights' — linking the finding directly to the lighting transition analysis.",
    batHighlight: "Soprano pipistrelles weigh approximately 6 grams. Their entire body is well within the near-field of Wi-Fi and mobile base station antennas. The RPM mechanism in bat cryptochrome operates identically to bird cryptochrome — the geometric susceptibility predicts that any mammal using a radical-pair compass will be disrupted by ambient RF at urban levels. The hours-long persistence suggests not just sensory masking but a deeper calibration failure — the bat's internal model of magnetic North is corrupted and does not self-correct quickly.",
    batRef: "Lindecke O et al. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "This study demonstrates RF-induced disorientation in bats. It does not study fertility, hormones, or cell biology. The BERM framework implications are model predictions, not conclusions of the original study.",

    insectTitle: "Insects: LED lighting and population decline",
    insectP1: "[[ref:boyes2021|Boyes et al. 2021]] (Science Advances) found that moth caterpillar abundance under LED street lights was 52% lower than in nearby unlit areas — compared to 41% lower under sodium lighting. The difference between LED and sodium is significant: sodium lamps are discharge lamps with minimal IF emissions; LED lamps contain switch-mode drivers emitting continuous 20–200 kHz fields.",
    insectP2: "While the study attributed the difference to light spectrum (white vs yellow), BERM's IF channel provides an alternative mechanism: the LED driver's IF emissions may directly affect caterpillar development through IFO-VGIC perturbation of voltage-gated ion channels. [[ref:pawson2014|Pawson & Bader 2014]] found LED traps captured 48% more insects than sodium, an effect independent of color temperature — suggesting a mechanism beyond visible spectrum.",
    insectP3: "Insects may be disproportionately susceptible to IF-band exposures for geometric reasons. Clarke et al. 2013 demonstrated that insect bodies act as efficient electromagnetic antennas — their small dimensions create high internal field concentrations relative to body mass. At IF frequencies (20–300 kHz), the induced electric field gradient across an insect body (1–50 mm) can perturb voltage-gated ion channels at lower external field strengths than required for larger organisms. LED-lit commercial greenhouses represent a concentrated IF exposure environment: high-density LED arrays with switch-mode drivers operating continuously, exposing pollinators throughout their foraging cycle. Mallinson et al. 2025 documented altered pollinator activity patterns in LED-lit greenhouse environments compared to conventional lighting.",
    insectNote: "These studies measured population-level outcomes, not individual IF-EMF exposure. The LED vs sodium difference is consistent with the IF hypothesis but does not exclude spectral or thermal explanations. Controlled IF-only exposure experiments have not been conducted on insects.",

    covidTitle: "COVID lockdown: an informative counter-result",
    covidText: "Source-verified COLOSS data does not show bee colony improvement during COVID lockdowns: winter loss increased by 2.27 percentage points (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. This is an informative negative result: it shows that the simple 'lockdown → ambient EMF ↓ → sentinels improve' prediction does not hold, likely because household RF traffic increased while outdoor activity decreased.",
    covidLabel: "Counter-result",

    metabolicTitle: "Cross-species metabolic cascade: [[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis et al. 2011]] (Proc R Soc B) documented a statistically significant increase in body weight across 24 populations spanning 8 species — including laboratory animals with controlled diets — over the same decades that ambient EMF exposure increased. Feral rats in Baltimore, laboratory mice at NIEHS, domestic dogs, and domestic cats all gained weight on parallel trajectories. The probability that all 24 populations would show positive weight trends by chance alone is less than 10⁻⁷.",
    metabolicP2: "This finding is a BERM retrodiction (R1): the model predicts that EMF-induced metabolic disruption should be visible across species that share voltage-gated ion channels, not only in humans where diet and lifestyle confound the signal. Laboratory rodents on fixed diets and feral animals not exposed to processed food marketing provide partial controls for the 'caloric excess' explanation.",
    metabolicP3: "The metabolic cascade connects to BERM through two independent pathways. First, melatonin suppression (CRY/RPM pathway) disrupts circadian glucose regulation — shift workers have 2–3× diabetes risk. Second, VGCC-mediated Ca²⁺ dysregulation alters insulin secretion from pancreatic β-cells, which are among the most electrically active cells in the body. Both pathways predict cross-species metabolic disruption in any electrified environment.",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]] is an observational study documenting parallel trends. It does not measure EMF exposure or establish causation. The 'common environmental factor' the authors hypothesize could be EMF, endocrine disruptors, epigenetic changes, or microbiome shifts. BERM claims EMF as the most parsimonious explanation because it is the only factor that affects both laboratory and feral animals in different environments.",

    whaleTitle: "Gray Whale Natural Experiment",
    whaleP1: "[[ref:granger2020|Granger et al. (Current Biology 2020)]] showed that gray whale strandings on the US West Coast correlate with solar RF activity. When the sun emits more RF noise, more whales strand — consistent with disruption of the CRY/RPM magnetoreception compass that cetaceans use for navigation. This is BERM's radical-pair mechanism tested by a natural experiment, with no human infrastructure involved.",
    whaleP2: "The molecular identity of the sensor is now known. [[ref:cry_drosophila|Fedele et al. (PLoS Genetics 2014, PMC4256086)]] demonstrated in Drosophila that human CRY2 senses EMF while human CRY1 does not — and that deleting CRY's C-terminal domain attenuates the EMF response. The Granger 'broken receptor' mechanism has a specific molecular identity: CRY2.",
    whaleP3: "Three independent lines converge on the same principle. First, [[ref:geomag_263|geomagnetic disturbance increases cardiovascular mortality across 263 US cities (Env. Health 2019)]] — the same chi(A) universality that explains whale strandings, applied to a different endpoint. Second, [[ref:solar_birth_11yr|human births modulate with the 11-year solar cycle across 9 regions (Int. J. Biometeorol. 1991)]] — the same sun–biology link. The mechanism: solar RF → CRY/melatonin → HPG axis.",
    whaleM3Title: "Prediction M3: Effect-size temporal attenuation",
    whaleM3: "As anthropogenic RF background rises decade by decade, the relative contribution of natural solar RF variation shrinks. The Granger whale-stranding effect size should therefore decrease over time: 1985–2000 vs 2000–2015 vs 2015–2025. A parallel prediction: the 11-year birth-rate cyclicity amplitude should also decrease (Greece 1960–1992 shows APC −0.4%/year, already consistent). If both attenuate simultaneously, the same mechanism — chi(A) signal masking by anthropogenic RF — explains both.",
    whaleNote: "Granger 2020 is an observational correlation [C] between solar activity indices and stranding counts. It does not measure RF exposure at the whale's location or demonstrate a CRY2 mechanism in cetaceans. The CRY2 identification is from Drosophila, not marine mammals. The chi(A) convergence across endpoints (strandings, mortality, births) is a pattern, not a confirmed causal chain. Prediction M3 is untested.",
    salmonTitle: "Salmon: Navigation and Reproduction",
    salmonP1: "[[ref:putman2014|Putman et al. (Biol. Lett. 2014)]] showed that salmon raised near steel-and-concrete aquaculture infrastructure exhibit disrupted geomagnetic navigation. Hatchery fish navigate significantly worse than wild fish. The mechanism is CRY/RPM-mediated magnetoreception — the same pathway (B) that BERM identifies for circadian disruption. Steel rebar in hatchery raceways creates local ELF field distortions that interfere with the CRY radical pair compass.",
    salmonP2: "[[ref:welch2021|Welch et al. (Fish Fish. 2021)]] documented the multi-decadal collapse of Pacific salmon populations, with survival rates declining in multiple species simultaneously. [[ref:santi2025|Santi et al. (2025)]] showed that both testosterone AND luteinizing hormone are declining simultaneously across species — 'ongoing resetting of HPG function.' This is hypothalamic, not gonadal. In salmon, the hypothalamus controls both navigation (CRY-dependent spatial orientation) and reproduction (GnRH → LH). A single hypothalamic perturbation can impair both.",
    salmonP3: "The CatSper calcium channel is the sperm-specific voltage-gated calcium channel required for hyperactivation (the vigorous motility needed to penetrate the egg). CatSper has 9 identified EMF-sensitive sites. In farmed salmon raised in steel-reinforced raceways with elevated ELF, CatSper function may be chronically impaired — simultaneously explaining reduced fertilization success and the broader reproductive decline.",
    salmonM5Title: "Prediction M5: Farmed salmon CatSper diagnostics",
    salmonM5: "Farmed salmon (raised in steel-reinforced concrete raceways) should show weaker CatSper current, reduced progesterone chemotaxis, and higher hyperactivation threshold compared to wild-caught salmon from the same population. Test: patch-clamp CatSper current + progesterone chemotaxis assay + hyperactivation threshold measurement in matched hatchery vs. wild fish.",
    salmonNote: "Putman's navigation impairment is peer-reviewed [C]. The CatSper prediction (M5) is BERM's derivation — it connects Putman's navigation finding (CRY/RPM in the brain) with reproductive biology (CatSper in sperm) via the common hypothesis that hatchery infrastructure EMF affects both targets simultaneously. This is untested. Salmon decline also has strong alternative explanations (overfishing, habitat loss, ocean warming, sea lice from aquaculture) that are independent of EMF.",
    gradientTitle: "Cross-Species EMF Gradient",
    gradientP1: "When cumulative reproductive decline across species is plotted against estimated cumulative EMF burden, a clear gradient emerges: r = 0.84 (r² = 0.71, p = 0.017, n = 7). Humans in developed countries (TFR halved since 1970) sit at the highest burden; remote wild insects at the lowest. The seven species/population groups span four taxonomic classes and a 20-fold range of EMF burden.",
    gradientP2: "This gradient eliminates sociocultural confounders. Dogs don't choose careers over puppies. Horses don't use contraception. Holstein cows don't delay reproduction for education. Yet all show reproductive parameter decline proportional to their EMF exposure — the only variable that scales with the gradient.",
    gradientP3: "Intensive dairy cattle show the second-largest decline in the set (first-service conception ~55% → ~35%, Lucy 2001) under continuous barn exposure — and this despite breeding selection pressure that works against, not for, the signal. Rodriguez 2003 documents the biological activity directly in cattle: melatonin decreased, estrous cycle altered.",
    gradientM4Title: "Prediction M4: Submarine cable ELF and aquatic reproduction",
    gradientM4: "Within the ELF field zone of submarine power cables (~35m radius), aquatic organisms' reproductive success should be lower than in cable-distant areas. Test: sea urchin colony size/density near vs. far from cables, controlled for substrate type, depth, and currents. Mechanism: cable 50 Hz ELF → sea urchin CatSper → premature hyperactivation triggering → fertilization failure.",
    gradientTableHeaders: { species: "Species / population group", emfScore: "EMF burden (0–1)", decline: "Reproductive decline (%)", axis: "Axis" },
    gradientNote: "The r = 0.84 gradient is computed by berm.diagnostics.cross_species_gradient.fit_gradient() from seven species/population groups (df = 5, p = 0.017); the same dataset is published in sentinel_registry.json. EMF burdens are semi-quantitative estimates on a 0–1 scale, not measured exposures; the decline figures come from the cited sources (Hallmann 2017, Alroy 2015, Rosenberg 2019, Allen & Wilsher 2021, Lucy 2001, Chu 2024, UN WPP 2024 / Levine 2017). This is an ecological correlation across species, not a controlled experiment. The earlier six-row per-year decline-rate table (human sperm 2.64%/yr … non-warmblood horses 0.46%/yr) gives r = 0.72 (n = 6) and is retained in the registry as decline_rate_table. Prediction M4 is untested.",
    threeAxisTitle: "Three-Axis Sentinel Architecture",
    threeAxisP1: "Three independent measurement axes converge on the same conclusion — EMF biological activity is consistent across terrestrial, aquatic, and gradient dimensions:",
    threeAxisLand: "Land axis: current sentinels (honeybee → dog → horse → human) with CSLI lag analysis",
    threeAxisWater: "Water axis: new aquatic sentinels (whale, elasmobranch, salmon, sea urchin) where water naturally separates ELF from RF",
    threeAxisGradient: "Gradient axis: cross-species EMF-decline correlation (r = 0.84, 7 species) eliminating sociocultural confounders",
    threeAxisP2: "Each axis is independently derived. Each uses different species, different mechanisms, and different measurement methods. The probability that three independent axes converge on the same conclusion by chance is the product of their individual false-positive rates.",

    sensitivityTitle: "BERM sensitivity hierarchy",
    sensitivityDesc: "EMF sensitivity across species follows a predictable order based on VGCC physiology, CRY dependence, and environmental coupling. The hierarchy is derived from mechanism and verified against observed population decline timelines.",
    sensitivityOrder: [
      { species: "Frogs", sensitivity: "Highest", mechanism: "Moist skin → direct Ca²⁺ environmental coupling", decline: "~1987 (layer 1→2)", icon: "toad" },
      { species: "Bees", sensitivity: "Very high", mechanism: "CRY electroreception → navigation-dependent", decline: "~2006 CCD (layer 2→3)", icon: "honeybee" },
      { species: "Insects", sensitivity: "High", mechanism: "Small nervous system → high relative field strength", decline: "[[ref:hallmann2017_v2|−75% biomass (Krefeld, 27 yr)]]", icon: "honeybee" },
      { species: "Birds", sensitivity: "Moderate", mechanism: "CRY navigation (migratory) + insect food supply decline", decline: "Sparrows −60% urban, −47% rural", icon: "bird" },
      { species: "Mammals", sensitivity: "Lower (cumulative)", mechanism: "Dry skin, large body → lower relative field, but long lifespan = cumulative", decline: "[[ref:klimentidis2010|Klimentidis: 24 populations, 8 species gaining weight]]", icon: "bat" },
    ],
    layerTimelineTitle: "Sentinel × technology layer timeline",
    layerTimelineDesc: "Each sentinel species' decline onset corresponds to a specific technology layer transition, not random environmental change.",
    layerTimeline: [
      { year: "~1975", event: "Sparrow urban decline begins", layer: "Layer 1 saturates in cities (power grid density)" },
      { year: "~1987", event: "Global amphibian decline begins", layer: "Layer 1→2: GSM rollout begins" },
      { year: "~2000", event: "Insect biomass decline accelerates", layer: "Layer 2→3: cell towers reach rural areas" },
      { year: "~2006", event: "Colony Collapse Disorder (bees)", layer: "Layer 2→3 + neonicotinoid synergy" },
      { year: "~2012", event: "[[ref:hallmann2017_v2|Insect biomass −75% (Krefeld)]]", layer: "Layer 3→4: LED streetlight adoption" },
      { year: "~2020", event: "Bird decline accelerates globally", layer: "Layer 4→5: 5G + LED saturation" },
    ],
    newBeeEvidence: "New 2025 evidence: [[ref:mallinson2025_electric_pollution|Mallinson et al. (iScience, PMC12225925)]] showed AC electric fields reduce bee landings by 71%. Separately, [[ref:bumble_rf2025|Environmental Pollution 2025]] showed RF-EMF reduces bumblebee flower visitation. Lupi 2021 demonstrated that combined pesticide + EMF produces the most severe biochemical and behavioral alterations — the interaction is superadditive.",

    contextTitle: "What the current records can say",
    context: [
      ["Dogs", "A published single-site breeding-programme series reports changes in some semen endpoints over time. It lacks measured RF, household-device and regional endpoint data, so it is contextual rather than an exposure-gradient test."],
      ["Livestock", "Published artificial-insemination-centre summaries can be useful comparators, but breeding selection, station management, nutrition, housing and protocol changes must be observed. No low-RF control status is inferred without dosimetry."],
      ["Cross-species comparison", "Species differ in generation time, selection, reproductive physiology and data systems. A common temporal pattern does not identify a common field mechanism without matched place–time FieldState and endpoint data."],
    ],
    nextTitle: "What a usable sentinel study needs",
    next: ["Measured FieldState with provenance at the relevant environment and time resolution.", "Endpoint definitions and collection protocols comparable across locations or explicitly modelled.", "Pre-specified chemical, climate, husbandry, selection and disease covariates.", "A registered test that compares the field model with competing causal explanations."],
    link: "Read the FieldState measurement protocol",
    lindgrenFramework: "Lindgren Framework",
    speciesHeader: "Species",
    sensitivityHeader: "Sensitivity",
    mechanismHeader: "Mechanism",
    declineHeader: "Observed decline",
    nextPageLabel: "Next",
    nextPageTitle: "Ecology",
  },
  fi: {
    title: "Indikaattorilajit: aineiston valmius",
    subtitle: "Lajienväliset havainnot voivat motivoida rekisteröidyn testin, mutta ne eivät korvaa mitattua altistusta, yhteensopivia päätepisteitä ja kilpailevien syiden dataa.",

    csliTitle: "Lajienvälinen viivesignaali: empiiriset tulokset",
    csliP1: "Lähdevarmennetussa 23 maan COLOSS-paneelissa mehiläispesien talvihäviön kasvu edeltää TFR:n laskua noin 2 vuodella: 20/23 maata osoittaa BERM-suuntaisen kuvion (yhdistetty maansisäinen r = −0,272, circular-shift p = 0,006, 8-viiveen Bonferroni p = 0,046). Signaali toistuu kahdessa itsenäisessä TFR-tuotteessa ([[ref:world_bank_wdi_2024|Maailmanpankki]] ja [[ref:nations2024|WPP 2024]]).",
    csliP2: "Viiverakenne seuraa biologista skaalautumista. Kirvat ja mehiläiset näyttävät lyhimmän vasteen (~2 vuotta), mikä on yhteensopivaa lyhyen elinkaaren kanssa. Pesimälinnut seuraavat 2–3 vuodessa. Yöperhoset 3–4 vuodessa. Koirat ennustavat ihmisen siittiökonsentraatiota ~3 vuodella (r = 0,505, p = 0,012). Rupikonnat näyttävät pisimmän viiveen ~6 vuodessa, mikä on yhteensopivaa pidemmän elinkaarensa ja populaatiodynamiikkansa kanssa.",
    csliP3: "Vuosimuutosanalyysi (Δmehiläinen → ΔTFR) vahvistaa ajallisen yhteisvaihtelun pelkän co-trendin sijaan. Amerikat (4/4) ja Aasia–Tyynimeri (6/6) ovat yhdenmukaisesti BERM-suuntaisia; Eurooppa on heikompi (13/21). 8 anti-suuntaista Euroopan maata ovat informatiivisia: ne tunnistavat olosuhteet, joissa pesänhoitokäytäntö, torjunta-ainepolitiikka tai maahanmuuttopuskuri muokkaa sentinelliketjua.",
    csliStats: "20/23 BERM-suuntaisia · circular-shift p = 0,006 · yhdistetty r = −0,272 · Bonferroni p = 0,046",
    csliNote: "Kaikki tulokset ovat korrelatiivisia [C] BERM:n sisäisistä analyyseistä. Niitä ei ole vertaisarvioitu. Yhteinen sekoittaja (esim. maatalouskemikaalit, ilmastonmuutos) voisi tuottaa saman kuvion ilman EMF:ää. Viivearvot ovat discovery-haun huippuja, eivät ennalta lukittuja vakioita.",

    nikeTitle: "Spatiaalinen gradientti: kylmän sodan tutka-asemat ja lintupopulaatiot",
    nikeText: "1 381 Breeding Bird Survey -reitin spatiaalinen analyysi 268 kylmän sodan Nike-tutka/tulenjohtokohteen lähellä (mediaani aloitusvuosi 1956) paljastaa BERM-suuntaisen gradientin: reitit alle 50 km:n päässä aktiivisista kohteista osoittivat −0,526 %/vuosi populaatiotrendejä verrattuna +0,096 %/vuosi yli 100 km:n päässä (ero 0,622 prosenttiyksikköä, Welch p = 0,031). Jatkuva etäisyyskorrelaatio: Spearman ρ = +0,088, p = 0,001 — kauempana tutkasta, paremmat lintutrendit.",
    nikePeakFieldText: "Tulos on yhteensopiva BERM:n huippukenttähypoteesin kanssa. Nike LOPAR/HIPAR -pääkeilat osoittivat ylöspäin; maanpintatason altistus tuli sivukeilapulsseista 1/r²-vaimennuksella. Sivukeilan huippukenttä 1 km:ssä: ~24,5 V/m yhden 1 µs:n pulssin aikana, kun aikakeskiarvoistettu RMS on vain 0,037 V/m (suhde 671:1). BERM-reitit A (VGIC, 45 %), B (CRY/RPM, 25 %) ja D (HPA, 15 %) ovat kynnys- tai pulssimekanismeja, jotka vastaavat huippukenttään, eivät aikakeskiarvoistettuun RMS:ään. Monotoninen 1/r²-gradientti on näiden reittien odotettu spatiaalinen profiili; Testi A:n kvadraattinen termi (β₂ p = 0,780) vahvistaa monotonisen 1/r²-muodon. CRY/RPM-radikaaliparin elinaika (~1 µs) vastaa tutkapulssin kestoa (~1 µs) — jokainen pulssi kattaa radikaaliparin koko singletti–tripletti-konversioikkunan, 400 kertaa sekunnissa.",
    nikeRichnessNote: "Lajirikkaus ja runsaus eroavat: lajirikkausgradientti säilyy osavaltion sisäisessä permutaatiossa (p = 0,006), mutta runsaustrendi heikkenee osavaltiotason sekoittajien kontrolloinnissa (p = 0,103). Tämä tarkoittaa, että tutkan läheisyys ennustaa luotettavammin mitä lajeja on läsnä kuin kuinka monta yksilöä selviää. Lintusignaali on detrendattu (hidas, rakenteellinen) — se ei näy ensimmäisen differenssin (nopea, vuosi-vuosi) analyysissä. Sama jako näkyy eurooppalaisessa paneelissa: 27 maan PECBMS-pesimälintuindeksissä (2002–2022) detrendattu indeksi edeltää TFR-laskua noin 2,5 vuodella (21/27 maata BERM-suunnassa, r = 0,182, q = 0,00013), kun taas ensimmäisen differenssin sarjassa vastaavaa edeltävyyttä ei ole (q = 0,528). Populaatiovaste on hidas trendi, ei vuosipulssi.",
    nikeCounterText: "Kohteiden sulkeutuminen ei kuitenkaan ennustanut lintujen elpymistä, ja aktiivisten kohteiden lukumäärä korreloi korkeamman linturunsauden kanssa (mahdollinen infrastruktuuri-habitaatti- tai sijoitusharha). Tämä rajoittaa tulkintaa: läheisyysgradientti on olemassa, mutta yksinkertainen 'enemmän kohteita = enemmän vahinkoa' ei päde. VGIC-kynnyksen ylitys 24,5 V/m:ssä on mallin ennuste, ei solukokeella vahvistettu. CRY:n 1 µs:n ajallinen vastaavuus on fysikaalinen yhteensattuma, ei osoitettu resonanssimekanismi.",

    frogTitle: "Sammakot tutka-asemien lähellä: käänteinen signaali",
    frogText: "Nike-NAAMP-sammakkokyselydatan mukaan sammakoiden kutsuindeksit kehittyvät odottamattomasti PAREMMIN aktiivisten Nike-kohteiden lähellä (+0,040/vuosikymmen) kuin kauempana (+0,002/vuosikymmen, ero p = 0,045). Tämä on lintujen tuloksen vastakohta ja vaatii selityksen.",
    frogInterpretation: "Käänteinen tulos on johdonmukainen, kun lajikohtainen RF-vaimennus otetaan huomioon. Sammakot elävät vedessä ja kosteassa maaperässä — väliaineissa, jotka vaimentavat RF:ää voimakkaasti (veden suhteellinen permittiivisyys ε_r ≈ 80). Vedessä oleva sammakko on käytännössä suojattu huippukenttäpulsseilta. Linnut ovat avoimessa ilmassa ilman vaimentavaa väliainetta — huippukenttä osuu niihin täydellä teholla. Lisäksi Nike-kohteiden suojavyöhykkeet tarjoavat sammakkoeläimille häiriöttömän kosteikkohabitaatin. Lintujen negatiivinen gradientti (p = 0,031) ja sammakoiden positiivinen gradientti (p = 0,045) ovat molemmat johdonmukaisia huippukenttämallin kanssa, kun habitaatin RF-vaimennus otetaan huomioon. Tämä ei vahvista EMF-hypoteesia — vesivaimennusselitys on fysikaalisesti motivoitu mutta ei mitattu tässä kontekstissa.",
    frogAggregateTitle: "Sammakko-EMF kokonaistulos",
    frogAggregate: [
      "Nike-NAAMP käänteinen assosiaatio (p = 0,045) → vesivaimennus + habitaattisekoittaja",
      "Trooppinen S-kaista BERM-epäjohdonmukainen (OR = 1,474, p = 0,016)",
      "Australian aikajana epäjohdonmukainen JORN:lle",
      "8,7× absorptiokerroin EI vahvistettu primäärilähteestä",
    ],

    aquaticTitle: "Vesiakseli: luonnollinen kanavaerottaja",
    aquaticP1: "Sammakkotulos paljastaa syvemmän periaatteen. Vesi vaimentaa RF:ää eksponentiaalisesti — 1 GHz:n taajuudella tunkeutumissyvyys merivedessä on alle 1 cm. ELF (50/60 Hz) tunkeutuu kymmenien metrien syvyyteen. Vesieliö elää luonnollisessa kaistanpäästösuodattimessa: se vastaanottaa ELF:n mutta on suojattu RF:ltä. Maaeliö vastaanottaa molemmat samanaikaisesti, lisättynä niiden superadditiivisilla interaktioilla.",
    aquaticP2: "[[ref:superpos_172|172 tutkimuksen systemaattinen katsaus (Biomolecules 2025)]] havaitsi, että monilähteisten EMF-ympäristöjen vaikutukset ovat usein synergistisiä. Vesieliöt ovat vapautettuja tästä superpositiosta — ne altistuvat vain ELF-kanavalle. Tämä tekee vesiakselista ainoan tavan erottaa ELF- ja RF-vaikutukset ilman proxy-oletuksia tai kontrolloituja laboratorioolosuhteita.",
    aquaticP3: "CatSper-kalsiumkanava — välttämätön siittiöiden hyperaktivaatiolle ja hedelmöitykselle — on [[ref:catsper_20yr|evolutiivisesti konservoitu merisiilistä ihmiseen (Physiology 2022)]]. Vesieliöiden lisääntyminen riippuu samasta ionikanavasta, jonka BERM tunnistaa EMF-herkäksi. Merenalaiset voimakaapelit tuottavat 50 Hz ELF-kenttiä, jotka ovat havaittavissa ~35 m:n etäisyydellä — luoden luonnollisen gradienttikokeen merieliöille, joiden hedelmöitys on CatSper-riippuvaista.",
    aquaticP4: "[[ref:calves_dark|Kolbabova ym. (Sci. Rep. 2015)]] osoittivat, että ELF-magneettikentät vaikuttavat vasikoiden melatoniiniin jopa täydessä pimeydessä, vahvistaen ELF-reitin toimivan valosta riippumatta. Vesieliöt altistuvat nimenomaan tälle eristetylle ELF-reitille — tehden niistä puhtaimman luonnollisen testin sille, onko ELF yksinään biologisesti aktiivinen ympäristötasoilla.",
    aquaticSkinDepth: [
      { medium: "Merivesi", freq: "1 GHz (RF)", depth: "< 1 cm" },
      { medium: "Merivesi", freq: "50 Hz (ELF)", depth: "~250 m" },
      { medium: "Makea vesi", freq: "1 GHz (RF)", depth: "~3 cm" },
      { medium: "Makea vesi", freq: "50 Hz (ELF)", depth: "~700 m" },
      { medium: "Ilma", freq: "1 GHz (RF)", depth: "∞ (ei vaimennusta)" },
      { medium: "Ilma", freq: "50 Hz (ELF)", depth: "∞ (ei vaimennusta)" },
    ],
    aquaticNote: "Vesiakseli on rakenteellinen argumentti, ei vahvistettu tulos. Yksikään tutkimus ei ole vielä mitannut merenalaisen kaapelin ELF-vaikutuksia meren lisääntymismenestykseen tässä kuvatulla kontrolloidulla asetelmalla. Olemassa olevat BOEM-riskiarviot ja skandinaaviset offshore-tutkimukset voivat sisältää relevanttia dataa. CatSperin herkkyyttä ELF:lle ei ole testattu suoraan missään organismissa.",
    aquaticMediumHeader: "Väliaine",
    aquaticFreqHeader: "Taajuus",
    aquaticDepthHeader: "Tunkeutumissyvyys (δ)",

    batTitle: "Lepakot: Nisäkkäiden kompassi häiriintyy",
    batP1: "Toukokuussa 2026 [[ref:lindecke2026|Oliver Lindecken]] johtama tutkimusryhmä julkaisi Sciencessa ensimmäisen kokeellisen osoituksen siitä, että radiotaajuinen sähkömagneettinen kohina häiritsee nisäkkään magneettikompassia. Muuttavia sopraanoyölepakoita (Pipistrellus pygmaeus) altistettiin heikkoille laajakaistaisille RF-kentille (0,01–300 MHz) — normaaleissa kaupunkiympäristöissä esiintyvillä tasoilla — vain 30 minuutin ajan auringonlaskun aikana. Kontrollilepakoiden suuntautuminen oli normaali. RF-altistetut lepakot lähtivät satunnaisiin suuntiin.",
    batP2: "Odottamattomin löydös oli vaikutuksen kesto. Aiemmissa muuttolintuihin kohdistuneissa tutkimuksissa magneettikompassi palautui välittömästi altistuksen päätyttyä. Lepakoilla desorientaatio kesti yli kaksi tuntia. Tutkijat päättelivät, että sähkömagneettinen saaste voi vaikuttaa eläinten käyttäytymiseen 'monimutkaisemmin kuin aiemmin ajateltiin' ja että 'laajalti ennustettu sähkömagneettisen saasteen kasvu voi edelleen lisätä ihmisen aiheuttaman ilmastonmuutoksen vaikutuksia.'",
    batP3: "Tällä löydöksellä on kolme suoraa merkitystä BERM-kehykselle. Ensinnäkin se laajentaa RPM/CRY-kompassihäiriömekanismin linnuista ([[ref:engels2014|Engels 2014]], Mouritsen 2014) nisäkkäisiin — ensimmäinen taksonominen luokkahyppy, julkaistu huippujulkaisussa. Toiseksi tuntien kestävä desorientaatio tarjoaa mekanistisen perusteen lepakoiden tuulivoimakuolleisuudelle: turbiinien lähellä häiriintyneellä kompassilla navigoivien lepakoiden törmäysriski kasvaa. Kolmanneksi Sciencen toimittajat toteavat nimenomaisesti, että tällaista RF-kohinaa 'tuottavat elektroniikka, voimalinjat ja jopa LED-valot' — mikä yhdistää löydöksen suoraan valaistussiirtymäanalyysiin.",
    batHighlight: "Sopraanoyölepakko painaa noin 6 grammaa. Sen koko keho on hyvin Wi-Fi- ja matkapuhelintukiasema-antennien lähikentässä. RPM-mekanismi lepakkokryptokromissa toimii identtisesti lintukryptokromin kanssa — geometrinen herkkyys ennustaa, että mikä tahansa radikaaliparikompassia käyttävä nisäkäs häiriintyy kaupunkitason ambient-RF:stä. Tuntien kestävä vaikutus viittaa syvempään kalibraatiovirheeseen kuin pelkkä sensorinen peittyminen — lepakko menettää sisäisen mallinsa magneettisesta pohjoisesta eikä se korjaudu nopeasti.",
    batRef: "Lindecke O ym. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "Tämä tutkimus osoittaa RF:n aiheuttaman desorientaation lepakoilla. Se ei tutki hedelmällisyyttä, hormoneja tai solubiologiaa. BERM-kehyksen tulkinnat ovat mallipohjisia ennusteita, eivät alkuperäisen tutkimuksen johtopäätöksiä.",

    insectTitle: "Hyönteiset: LED-valaistus ja populaatiolasku",
    insectP1: "[[ref:boyes2021|Boyes ym. 2021]] (Science Advances) havaitsivat, että yöperhosten toukkamäärä LED-katuvalaistuksen alla oli 52 % pienempi kuin läheisissä valaisemattomissa kohteissa — verrattuna 41 %:n vähenemiseen natriumvalaistuksen alla. Ero LED:n ja natriumin välillä on merkitsevä: natriumlamput ovat purkauslamppuja minimaalisella IF-emissiolla; LED-lamput sisältävät hakkuriteholähteitä, jotka tuottavat jatkuvaa 20–200 kHz kenttää.",
    insectP2: "Tutkimus yhdistää eron valospektriin (valkoinen vs keltainen), mutta BERM:n IF-kanava tarjoaa vaihtoehtoisen mekanismin: LED-ajurin IF-emissiot voivat suoraan vaikuttaa toukkien kehitykseen IFO-VGIC-häiriön kautta jänniteportetuissa ionikanavissa. [[ref:pawson2014|Pawson & Bader 2014]] havaitsivat LED-loukkujen pyydystäneen 48 % enemmän hyönteisiä kuin natriumlamput, vaikutuksen ollessa riippumaton värilämpötilasta — mikä viittaa näkyvän spektrin ulkopuoliseen mekanismiin.",
    insectP3: "Hyönteiset voivat olla suhteettoman herkkiä IF-kaistan altistuksille geometrisista syistä. Clarke ym. 2013 osoittivat, että hyönteisten kehot toimivat tehokkaina sähkömagneettisina antenneina — niiden pienet mitat luovat korkeita sisäisiä kenttäkonsentraatioita suhteessa kehon massaan. IF-taajuuksilla (20–300 kHz) aiheutettu sähkökenttägradientti hyönteisen kehon (1–50 mm) poikki voi häiritä jänniteporteisia ionikanavia alhaisemmilla ulkoisilla kenttävoimakkuuksilla kuin suuremmilla organismeilla. LED-valaistut kaupalliset kasvihuoneet ovat erityisen keskittynyt IF-altistusympäristö: korkeatiheyksisiä LED-valaisimia hakkuriteholähteineen jatkuvasti käynnissä, altistaen pölyttäjiä koko niiden keruukierron ajan. Mallinson ym. 2025 dokumentoivat pölyttäjien muuttuneen aktiivisuuskuvion LED-valaistuissa kasvihuoneympäristöissä verrattuna tavanomaiseen valaistukseen.",
    insectNote: "Nämä tutkimukset mittasivat populaatiotason tuloksia, eivät yksilötason IF-EMF-altistusta. LED:n ja natriumin välinen ero on yhteensopiva IF-hypoteesin kanssa mutta ei sulje pois spektraalisia tai termisiä selityksiä. Kontrolloituja pelkän IF:n altistuskokeita ei ole tehty hyönteisillä.",

    covidTitle: "COVID-lockdown: informatiivinen vastatulos",
    covidText: "Lähdevarmennettu COLOSS-data ei näytä mehiläispesien paranemista COVID-lockdownien aikana: talvihäviö kasvoi 2,27 prosenttiyksikköä (24/35 maata paheni, p = 0,043). BBS-linnut myös laskivat 2,8–3,0 % vuosina 2020–22. Tämä on informatiivinen negatiivinen tulos: se osoittaa, että yksinkertainen 'lockdown → ambientin EMF ↓ → sentinellit paranevat' -ennuste ei päde, todennäköisesti koska kotitalouksien RF-liikenne kasvoi samalla kun ulkona liikkuminen väheni.",
    covidLabel: "Vastatulos",

    metabolicTitle: "Lajienvälinen metabolinen kaskadi: [[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis ym. 2011]] (Proc R Soc B) dokumentoi tilastollisesti merkitsevän painonnousun 24 populaatiossa 8 lajin poikki — mukaan lukien laboratorio­eläimet kontrolloiduilla ruokavalioilla — samoina vuosikymmeninä kuin ympäristön EMF-altistus kasvoi. Baltimoren villirottien, NIEHS:n laboratoriohiirien, kotikoirien ja kissojen painot nousivat rinnakkaisilla trajektoreilla. Todennäköisyys, että kaikki 24 populaatiota osoittaisivat positiivisia painotrendejä sattumalta, on alle 10⁻⁷.",
    metabolicP2: "Tämä löydös on BERM-retrodiktio (R1): malli ennustaa, että EMF:n aiheuttaman metabolisen häiriön pitäisi näkyä lajeissa, jotka jakavat jänniteportteiset ionikanavat, eikä ainoastaan ihmisillä, joilla ruokavalio ja elämäntapa sekoittavat signaalia. Laboratorion jyrsijät kontrolloiduilla ruokavalioilla ja villieläimet, jotka eivät altistu prosessoidun ruoan markkinoinnille, tarjoavat osittaisen kontrollin 'kaloriylijäämä'-selitykselle.",
    metabolicP3: "Metabolinen kaskadi kytkeytyy BERM:iin kahden itsenäisen reitin kautta. Ensinnäkin melatoniinivaimennus (CRY/RPM-reitti) häiritsee sirkadiaanista glukoosinsäätelyä — vuorotyöntekijöillä on 2–3-kertainen diabetesriski. Toiseksi VGCC-välitteinen Ca²⁺-dysregulaatio muuttaa insuliinin eritystä haiman β-soluista, jotka ovat kehon sähköisesti aktiivisimpia soluja. Molemmat reitit ennustavat lajienvälisen metabolisen häiriön missä tahansa sähköistetyssä ympäristössä.",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]] on havainnointitutkimus, joka dokumentoi rinnakkaisia trendejä. Se ei mittaa EMF-altistusta eikä osoita kausaalisuutta. 'Yhteinen ympäristötekijä', jota tekijät esittävät hypoteesina, voisi olla EMF, endokriiniset häiritsijät, epigeneettiset muutokset tai mikrobiomin muutokset. BERM esittää EMF:n yksinkertaisimpana selityksenä, koska se on ainoa tekijä, joka vaikuttaa sekä laboratorio- että villieläimiin eri ympäristöissä.",

    whaleTitle: "Harmaavalaan luonnollinen koe",
    whaleP1: "[[ref:granger2020|Granger ym. (Current Biology 2020)]] osoittivat, että harmaavalaan rantautumiset Yhdysvaltain länsirannikolla korreloivat auringon RF-aktiivisuuden kanssa. Kun aurinko tuottaa enemmän RF-kohinaa, enemmän valaita rantautuu — mikä on yhteensopivaa valaiden navigaatioon käyttämän CRY/RPM-magnetoreseptiokompassin häiriintymisen kanssa. Tämä on BERM:n radikaalipari-mekanismi testattuna luonnollisella kokeella, ilman ihmisen infrastruktuuria.",
    whaleP2: "Sensorin molekulaarinen identiteetti tunnetaan nyt. [[ref:cry_drosophila|Fedele ym. (PLoS Genetics 2014, PMC4256086)]] osoittivat Drosophilassa, että ihmisen CRY2 havaitsee EMF:n mutta ihmisen CRY1 ei — ja että CRY:n C-terminaalisen domeenin deletio vaimentaa EMF-vastetta. Grangerin 'rikkinäinen reseptori' -mekanismi saa tarkan molekulaarisen identiteetin: CRY2.",
    whaleP3: "Kolme itsenäistä linjaa yhtyvät samaan periaatteeseen. Ensinnäkin [[ref:geomag_263|geomagneettinen häiriö lisää sydän- ja verisuonitautikuolleisuutta 263 USA:n kaupungissa (Env. Health 2019)]] — sama χ(Ā)-universaalisuus joka selittää valaiden rantautumisen, sovellettuna eri päätepisteeseen. Toiseksi [[ref:solar_birth_11yr|ihmisten syntyvyys säätely muuttuu 11-vuotisen aurinkosyklin mukana 9 alueella (Int. J. Biometeorol. 1991)]] — sama aurinko-biologia-yhteys. Mekanismi: aurinko-RF → CRY/melatoniini → HPG-akseli.",
    whaleM3Title: "Ennuste M3: efektikoon ajallinen vaimeneminen",
    whaleM3: "Kun antropogeeninen RF-taustataso nousee vuosikymmenittäin, luonnollisen aurinko-RF-vaihtelun suhteellinen osuus pienenee. Grangerin valas-rantautumis-efektikoon pitäisi siksi pienentyä ajan myötä: 1985–2000 vs. 2000–2015 vs. 2015–2025. Rinnakkaisennuste: syntyvyyden 11v syklisyyden amplitudi pienenee myös (Kreikka 1960–1992 osoittaa APC −0,4 %/v, jo yhteensopiva). Jos molemmat vaimenevat samanaikaisesti, sama mekanismi — χ(Ā)-signaalin peittyminen antropogeeniseen RF:ään — selittää molemmat.",
    whaleNote: "Granger 2020 on havainnointikorrelaatio [C] auringon aktiivisuusindeksien ja rantautumismäärien välillä. Se ei mittaa RF-altistusta valaan sijainnissa eikä osoita CRY2-mekanismia valaseläimissä. CRY2-tunnistus on Drosophilasta, ei merinisäkkäistä. χ(Ā)-yhdentyminen päätepisteiden välillä (rantautumiset, kuolleisuus, syntyvyys) on kuvio, ei vahvistettu kausaaliketju. Ennuste M3 on testaamaton.",
    salmonTitle: "Lohi: Navigaatio ja lisääntyminen",
    salmonP1: "[[ref:putman2014|Putman ym. (Biol. Lett. 2014)]] osoittivat, että teräs-betonivesiviljely-infrastruktuurin lähellä kasvatetut lohet näyttävät häiriintynyttä geomagneettista navigaatiota. Kasvattamokalat navigoivat merkittävästi huonommin kuin villit kalat. Mekanismi on CRY/RPM-välitteinen magnetoreseptio — sama polku (B), jonka BERM tunnistaa sirkadiaaniselle häiriölle. Kasvattamon altaiden teräsraudoitus luo paikallisia ELF-kenttähäiriöitä, jotka häiritsevät CRY-radikaaliparikompassia.",
    salmonP2: "[[ref:welch2021|Welch ym. (Fish Fish. 2021)]] dokumentoivat Tyynenmeren lohipopulaatioiden vuosikymmenten mittaisen romahduksen, jossa selviytymisasteet laskivat useissa lajeissa samanaikaisesti. [[ref:santi2025|Santi ym. (2025)]] osoittivat, että sekä testosteroni ETTÄ luteinisoiva hormoni laskevat samanaikaisesti lajeissa — 'HPG-funktion jatkuva uudelleenasetus.' Tämä on hypotalaamista, ei gonadaalista. Lohessa hypotalamus kontrolloi sekä navigaatiota (CRY-riippuvainen avaruudellinen orientaatio) että lisääntymistä (GnRH → LH). Yksi hypotalaaminen häiriö voi heikentää molempia.",
    salmonP3: "CatSper-kalsiumkanava on siittiötarkka jänniteherkät kalsiumkanava, joka vaaditaan hyperaktivaatioon (voimakkaaseen liikkuvuuteen, joka tarvitaan munasolun läpäisemiseen). CatSperissä on 9 tunnistettua EMF-herkkää kohtaa. Teräsbetonisissa altaissa kohonneen ELF:n alaisena kasvatetuissa kasvattamolohissa CatSper-toiminta voi olla kroonisesti heikentynyt — selittäen samanaikaisesti alentunut hedelmöitysonnistuminen ja laajempi lisääntymisen lasku.",
    salmonM5Title: "Ennuste M5: Kasvattamolohen CatSper-diagnostiikka",
    salmonM5: "Kasvattamolohella (kasvatettu teräsbetonisissa altaissa) pitäisi olla heikompi CatSper-virta, vähentynyt progesteronikemotaksis ja korkeampi hyperaktivaation laukeamiskynnys verrattuna saman populaation villilohen. Testi: patch-clamp CatSper-virta + progesteronikemotaksismittaus + hyperaktivaation kynnys hatchery- vs. villikaloissa.",
    salmonNote: "Putmanin navigaatiohäiriö on vertaisarvioitu [C]. CatSper-ennuste (M5) on BERM:n johdos — se yhdistää Putmanin navigaatiolöydöksen (CRY/RPM aivoissa) lisääntymisbiologiaan (CatSper siittiöissä) yhteisen hypoteesin kautta, jonka mukaan kasvattamon infrastruktuurin EMF vaikuttaa molempiin kohteisiin samanaikaisesti. Tämä on testaamaton. Lohikannalle on myös vahvoja vaihtoehtoselityksiä (ylikalastus, elinympäristön menetys, meren lämpeneminen, meriloiset vesiviljelmistä), jotka ovat EMF:stä riippumattomia.",
    gradientTitle: "Lajienvälinen EMF-gradientti",
    gradientP1: "Kun lajien kumulatiivinen lisääntymislasku piirretään arvioitua kumulatiivista EMF-kuormaa vastaan, selkeä gradientti ilmaantuu: r = 0,84 (r² = 0,71, p = 0,017, n = 7). Kehittyneiden maiden ihmiset (TFR puolittunut vuodesta 1970) ovat korkeimmalla kuormalla; syrjäisten alueiden villit hyönteiset matalimmalla. Seitsemän lajia/populaatioryhmää kattaa neljä taksonomista luokkaa ja 20-kertaisen EMF-kuorman vaihteluvälin.",
    gradientP2: "Tämä gradientti poistaa sosiokulttuuriset sekoittajat. Koirat eivät valitse uraa pentujen sijaan. Hevoset eivät käytä ehkäisyä. Holstein-lehmät eivät lykkää lisääntymistä koulutuksen vuoksi. Silti kaikki osoittavat lisääntymisparametrien laskua suhteessa EMF-altistukseensa — ainoa muuttuja joka skaalautuu gradientin kanssa.",
    gradientP3: "Tehotuotannon lypsykarja osoittaa aineiston toiseksi suurimman laskun (ensimmäisen siemennyksen tiinehtyvyys ~55 % → ~35 %, Lucy 2001) jatkuvassa navetta-altistuksessa — ja tämä siitä huolimatta, että jalostusvalinta toimii signaalia vastaan, ei sen puolesta. Rodriguez 2003 dokumentoi biologisen aktiivisuuden naudoissa suoraan: melatoniini laski, kiimakierto muuttui.",
    gradientM4Title: "Ennuste M4: Merikaapelin ELF ja vesieliöiden lisääntyminen",
    gradientM4: "Merivoimakaapeleiden ELF-kenttävyöhykkeellä (~35 m säde) vesieliöiden lisääntymismenestyksen pitäisi olla heikompi kuin kaapelista kaukana. Testi: merisiiliyhdyskuntien koko/tiheys lähellä vs. kaukana kaapeleista, kontrolloituna pohjan tyypille, syvyydelle ja virtauksille.",
    gradientTableHeaders: { species: "Laji / populaatioryhmä", emfScore: "EMF-kuorma (0–1)", decline: "Lisääntymislasku (%)", axis: "Akseli" },
    gradientNote: "r = 0,84 -gradientti lasketaan funktiolla berm.diagnostics.cross_species_gradient.fit_gradient() seitsemästä lajista/populaatioryhmästä (df = 5, p = 0,017); sama aineisto on julkaistu sentinel_registry.json-tiedostossa. EMF-kuormat ovat puolikvantitatiivisia arvioita asteikolla 0–1, eivät mitattuja altistuksia; laskuluvut tulevat siteeratuista lähteistä (Hallmann 2017, Alroy 2015, Rosenberg 2019, Allen & Wilsher 2021, Lucy 2001, Chu 2024, UN WPP 2024 / Levine 2017). Kyseessä on lajienvälinen ekologinen korrelaatio, ei kontrolloitu koe. Aiempi kuuden rivin vuosilaskutaulukko (ihmisen siittiöt 2,64 %/v … kylmäveriset hevoset 0,46 %/v) antaa r = 0,72 (n = 6) ja säilyy rekisterissä nimellä decline_rate_table. Ennuste M4 on testaamaton.",
    threeAxisTitle: "Kolmen akselin indikaattoriarkkitehtuuri",
    threeAxisP1: "Kolme riippumatonta mittausakselia yhtyvät samaan johtopäätökseen — EMF:n biologinen aktiivisuus on yhdenmukainen maa-, vesi- ja gradienttidimensioissa:",
    threeAxisLand: "Maa-akseli: nykyiset sentinellit (mehiläinen → koira → hevonen → ihminen) CSLI-lag-analyysillä",
    threeAxisWater: "Vesi-akseli: uudet vesi-indikaattorilajit (valas, rustokala, lohi, merisiili) joissa vesi erottaa luonnollisesti ELF:n RF:stä",
    threeAxisGradient: "Gradienttiakseli: lajienvälinen EMF-lasku-korrelaatio (r = 0,84, 7 lajia) poissulkien sosiokulttuuriset sekoittajat",
    threeAxisP2: "Kukin akseli on itsenäisesti johdettu. Kukin käyttää eri lajeja, eri mekanismeja ja eri mittausmenetelmiä. Todennäköisyys, että kolme riippumatonta akselia yhtyvät samaan johtopäätökseen sattumalta, on niiden yksittäisten väärien positiivisten todennäköisyyksien tulo.",

    sensitivityTitle: "BERM-herkkyyshierarkia",
    sensitivityDesc: "EMF-herkkyys lajien välillä noudattaa ennustettavaa järjestystä VGCC-fysiologian, CRY-riippuvuuden ja ympäristökytkennän perusteella. Hierarkia on johdettu mekanismista ja todennettu havaittujen populaatiolaskujen aikajanoja vastaan.",
    sensitivityOrder: [
      { species: "Sammakot", sensitivity: "Korkein", mechanism: "Kostea iho → suora Ca²⁺-ympäristökytkentä", decline: "~1987 (kerros 1→2)", icon: "toad" },
      { species: "Mehiläiset", sensitivity: "Erittäin korkea", mechanism: "CRY-elektroreseptio → navigaatioriippuvainen", decline: "~2006 CCD (kerros 2→3)", icon: "honeybee" },
      { species: "Hyönteiset", sensitivity: "Korkea", mechanism: "Pieni hermosto → korkea suhteellinen kenttävoimakkuus", decline: "[[ref:hallmann2017_v2|−75 % biomassa (Krefeld, 27 v)]]", icon: "honeybee" },
      { species: "Linnut", sensitivity: "Kohtalainen", mechanism: "CRY-navigaatio (muuttolinnut) + hyönteisravinnon lasku", decline: "Varpuset −60 % kaupunki, −47 % maaseutu", icon: "bird" },
      { species: "Nisäkkäät", sensitivity: "Matalampi (kumulatiivinen)", mechanism: "Kuiva iho, suuri keho → matalampi suhteellinen kenttä, mutta pitkä elinikä = kumulaatio", decline: "[[ref:klimentidis2010|Klimentidis: 24 populaatiota, 8 lajia lihoo]]", icon: "bat" },
    ],
    layerTimelineTitle: "Sentinel × teknologiakerros -aikajana",
    layerTimelineDesc: "Kunkin sentinel-lajin laskun alkuajankohta vastaa tiettyä teknologiakerrossiirtymää, ei satunnaista ympäristömuutosta.",
    layerTimeline: [
      { year: "~1975", event: "Varpusten kaupunkilasku alkaa", layer: "Kerros 1 saturoituu kaupungeissa (sähköverkon tiheys)" },
      { year: "~1987", event: "Globaali sammakkolasku alkaa", layer: "Kerros 1→2: GSM-käyttöönotto alkaa" },
      { year: "~2000", event: "Hyönteisbiomassalasku kiihtyy", layer: "Kerros 2→3: tukiasemat maaseudulle" },
      { year: "~2006", event: "Colony Collapse Disorder (mehiläiset)", layer: "Kerros 2→3 + neonikotinoidi-synergia" },
      { year: "~2012", event: "[[ref:hallmann2017_v2|Hyönteisbiomassa −75 % (Krefeld)]]", layer: "Kerros 3→4: LED-katuvalojen käyttöönotto" },
      { year: "~2020", event: "Lintulasku kiihtyy globaalisti", layer: "Kerros 4→5: 5G + LED-saturaatio" },
    ],
    newBeeEvidence: "Uusi 2025 näyttö: [[ref:mallinson2025_electric_pollution|Mallinson ym. (iScience, PMC12225925)]] osoittivat AC-sähkökentän vähentävän mehiläisten laskeutumisia 71 %. Erikseen [[ref:bumble_rf2025|Environmental Pollution 2025]] osoitti RF-EMF:n vähentävän kimalaisten kukkavierailuja. Lupi 2021 osoitti, että yhdistetty pestisidi + EMF tuottaa vakavimmat biokemialliset ja käyttäytymismuutokset — interaktio on superadditiivinen.",

    contextTitle: "Mitä nykyiset tietueet voivat sanoa",
    context: [
      ["Koirat", "Julkaistu yhden jalostusohjelman aikasarja raportoi joidenkin siemennestepäätepisteiden muutoksia. Siitä puuttuu mitattu RF, kotilaitetieto ja alueellinen päätepistedata, joten se on kontekstia eikä altistusgradienttitesti."],
      ["Tuotantoeläimet", "Julkaistut keinosiemennyskeskusten yhteenvedot voivat olla hyödyllisiä vertailuja, mutta jalostusvalinta, aseman hallinta, ravinto, asuminen ja protokollamuutokset on havaittava. Matalan RF:n kontrolliasemaa ei päätellä ilman dosimetriaa."],
      ["Lajienvälinen vertailu", "Lajit eroavat sukupolviajassa, valinnassa, lisääntymisfysiologiassa ja datajärjestelmissä. Yhteinen ajallinen kuvio ei tunnista yhteistä kenttämekanismia ilman kohdistettua paikka–aika-FieldStatea ja päätepistedataa."],
    ],
    nextTitle: "Mitä käyttökelpoinen indikaattoritutkimus tarvitsee",
    next: ["Mitattu FieldState proveniensseineen relevantissa ympäristössä ja aikatasossa.", "Päätepistemääritelmät ja keruuprotokollat, jotka ovat vertailukelpoisia paikkojen välillä tai nimenomaisesti mallinnettuja.", "Ennalta määritellyt kemikaali-, ilmasto-, kasvatus-, valinta- ja tautikovariaatit.", "Rekisteröity testi, joka vertaa kenttämallia kilpaileviin kausaalisiin selityksiin."],
    link: "Lue FieldState-mittausprotokolla",
    lindgrenFramework: "Lindgren-kehys",
    speciesHeader: "Laji",
    sensitivityHeader: "Herkkyys",
    mechanismHeader: "Mekanismi",
    declineHeader: "Havaittu lasku",
    nextPageLabel: "Seuraavaksi",
    nextPageTitle: "Ekologia",
  },
  ja: {
    title: "センチネル種：データ準備状況",
    subtitle: "種間観察は登録テストの動機づけになり得ますが、測定された曝露、互換性のあるエンドポイント、競合する原因データの代替にはなりません。",
    csliTitle: "種間ラグシグナル：実証結果",
    csliP1: "ソース検証済みの23カ国COLOSSパネルにおいて、ミツバチコロニーの冬季損失増加はTFR低下に約2年先行しています：20/23カ国がBERM方向のパターンを示しました（プールされた国内r = −0.272、circular-shift p = 0.006、8ラグBonferroni p = 0.046）。このシグナルは2つの独立したTFR製品（[[ref:world_bank_wdi_2024|世界銀行]]および[[ref:nations2024|WPP 2024]]）で再現されています。",
    csliP2: "ラグ構造は生物学的スケーリングに従います。アブラムシとミツバチが最短の応答（約2年）を示し、短い生活環と一致しています。繁殖鳥は2〜3年で続きます。蛾は3〜4年。犬はヒトの精子濃度を約3年先行して予測します（r = 0.505、p = 0.012）。ヒキガエルは最長のラグ約6年を示し、より長い生活環と個体群動態と一致しています。",
    csliP3: "年次変化分析（Δミツバチ → ΔTFR）は、共トレンドを超えた時間的共変動を確認します。南北アメリカ（4/4）とアジア太平洋（6/6）は一様にBERM方向です；ヨーロッパは弱い（13/21）。8つの反方向ヨーロッパ諸国は情報的です：養蜂慣行、農薬政策、または移民緩衝がセンチネルチェーンを修正する条件を特定します。",
    csliStats: "20/23 BERM方向 · circular-shift p = 0.006 · プールr = −0.272 · Bonferroni p = 0.046",
    csliNote: "すべての結果はBERM内部分析からの相関的[C]です。査読されていません。共通の交絡因子（例：農業化学物質、気候変動）がEMFなしで同じパターンを生成する可能性があります。ラグ値は発見スキャンのピークであり、事前にロックされた定数ではありません。",
    nikeTitle: "空間勾配：冷戦時代のレーダー基地と鳥類個体群",
    nikeText: "268の冷戦時代のNikeレーダー/射撃管制サイト（中央値開始1956年）付近の1,381のBreeding Bird Survey経路の空間分析により、BERM方向の勾配が明らかになりました：アクティブサイトから50km以内の経路は−0.526%/年の個体群トレンドを示し、100km以上離れた経路は+0.096%/年でした（差0.622パーセントポイント、Welch p = 0.031）。連続距離相関：Spearman ρ = +0.088、p = 0.001 — レーダーから遠いほど鳥のトレンドが良好。",
    nikePeakFieldText: "この結果はBERMのピークフィールド仮説と一致しています。Nike LOPAR/HIPARメインビームは上方を向いており、地表レベルの曝露は1/r²減衰によるサイドローブパルスから来ました。1kmでのサイドローブピークフィールド：単一の1μsパルス中に約24.5 V/m、時間平均RMSはわずか0.037 V/m（比率671:1）。BERMパスウェイA（VGIC、45%）、B（CRY/RPM、25%）、D（HPA、15%）は閾値またはパルスメカニズムであり、時間平均RMSではなくピークフィールドに応答します。",
    nikeRichnessNote: "種の豊富さと個体数は乖離します：豊富さ勾配は州内置換で持続しますが（p = 0.006）、個体数トレンドは州レベルの交絡因子を制御すると弱まります（p = 0.103）。鳥のシグナルはデトレンド（遅い、構造的）であり、一次差分（速い、年次）分析には現れません。",
    nikeCounterText: "しかし、サイトの閉鎖は鳥の回復を予測せず、アクティブサイト数はより高い鳥の個体数と相関しました（インフラ-生息地またはサイティングバイアスの可能性）。VGIC閾値超過24.5 V/mはモデル予測であり、細胞実験で確認されたものではありません。CRYの1μs時間一致は物理的偶然であり、実証された共鳴メカニズムではありません。",
    frogTitle: "レーダー付近の両生類：反転シグナル",
    frogText: "Nike-NAAMP両生類調査データは予想外の反転を示しています：アクティブNikeサイト付近のカエル鳴き声指数はより良好なトレンド（+0.040/10年）を示し、遠方（+0.002/10年、差p = 0.045）より良好でした。これは鳥の結果の逆であり、説明が必要です。",
    frogInterpretation: "反転結果は、種固有のRF減衰を考慮すると一貫しています。カエルは水と湿った土壌に生息しており、RFを強く減衰させる媒質です（水の比誘電率ε_r ≈ 80）。水中のカエルはピークフィールドパルスから実質的に遮蔽されています。鳥は減衰媒質のない開放空気中にいます。",
    frogAggregateTitle: "カエル-EMF総合結果",
    frogAggregate: [
      "Nike-NAAMP逆関連（p = 0.045）→ 水減衰 + 生息地交絡",
      "熱帯S帯BERM非一貫（OR = 1.474、p = 0.016）",
      "オーストラリアのタイムラインはJORNと非一貫",
      "8.7×吸収係数は一次資料から確認されていない",
    ],

    aquaticTitle: "水圏軸：自然のチャネル分離器",
    aquaticP1: "カエルの結果はより深い原理を示しています。水はRFを指数関数的に減衰させます — 1 GHzでの海水中の表皮深さは1 cm未満です。ELF（50/60 Hz）は数十メートル浸透します。水生生物は自然のバンドパスフィルターの中で生きています：ELFを受信しますがRFから遮蔽されています。陸上生物は両方を同時に受信し、さらにその超加法的相互作用も受けます。",
    aquaticP2: "[[ref:superpos_172|172研究の体系的レビュー（Biomolecules 2025）]]は、多源EMF環境がしばしば相乗的な生物学的効果を生じることを発見しました。水生生物はこの重ね合わせから免除されます — ELFチャネルのみを経験します。これにより水圏軸は、プロキシの仮定や制御された実験室条件なしにELFとRF効果を分離する唯一の方法となります。",
    aquaticP3: "CatSperカルシウムチャネル — 精子の超活性化と受精に不可欠 — は[[ref:catsper_20yr|ウニからヒトまで進化的に保存されています（Physiology 2022）]]。水生生物の生殖はBERMがEMF感受性と特定するのと同じイオンチャネルに依存しています。海底電力ケーブルは~35 mで検出可能な50 Hz ELFフィールドを放出し、CatSper依存性受精を持つ海洋生物の自然な勾配実験を生み出します。",
    aquaticP4: "[[ref:calves_dark|Kolbabova et al.（Sci. Rep. 2015）]]は、ELF磁場が完全な暗闇でも子牛のメラトニンに影響することを実証し、ELF経路が光から独立して動作することを確認しました。水生生物はまさにこの孤立したELF経路を経験します — ELF単独が環境レベルで生物学的に活性であるかどうかの最もクリーンな自然テストとなります。",
    aquaticSkinDepth: [
      { medium: "海水", freq: "1 GHz (RF)", depth: "< 1 cm" },
      { medium: "海水", freq: "50 Hz (ELF)", depth: "~250 m" },
      { medium: "淡水", freq: "1 GHz (RF)", depth: "~3 cm" },
      { medium: "淡水", freq: "50 Hz (ELF)", depth: "~700 m" },
      { medium: "空気", freq: "1 GHz (RF)", depth: "∞（減衰なし）" },
      { medium: "空気", freq: "50 Hz (ELF)", depth: "∞（減衰なし）" },
    ],
    aquaticNote: "水圏軸は構造的な議論であり、確認された結果ではありません。ここで述べた制御された設計で海底ケーブルのELF効果を海洋の生殖成功に対して測定した研究はまだありません。CatSperのELF感受性はどの生物でも直接テストされていません。",
    aquaticMediumHeader: "媒質",
    aquaticFreqHeader: "周波数",
    aquaticDepthHeader: "表皮深さ (δ)",

    batTitle: "コウモリ：哺乳類のコンパスが攪乱される",
    batP1: "2026年5月、[[ref:lindecke2026|Oliver Lindecke]]率いるチームがScienceで、無線周波電磁ノイズが哺乳類の磁気コンパスを攪乱する最初の実験的実証を発表しました。渡り性のソプラノアブラコウモリ（Pipistrellus pygmaeus）は、通常の都市環境に見られるレベルの弱い広帯域RFノイズ（0.01〜300 MHz）に日没時にわずか30分間曝露されました。対照コウモリは正常に方向づけしました。RF曝露コウモリはランダムな方向に出発しました。",
    batP2: "最も予想外の発見は効果の持続時間でした。渡り鳥に関する以前の研究では、磁気コンパスはRF曝露終了後すぐに回復しました。コウモリでは、見当識障害は2時間以上続きました。研究者らは、電磁汚染が動物の行動に「以前考えられていたよりも複雑な方法で」影響を与える可能性があり、「広く予想される電磁汚染の増加が人為的気候変動の影響をさらに増大させる可能性がある」と結論づけました。",
    batP3: "この発見はBERMフレームワークに3つの直接的な含意があります。第一に、RPM/CRYコンパス攪乱メカニズムを鳥類（[[ref:engels2014|Engels 2014]]、Mouritsen 2014）から哺乳類へ拡張します。第二に、数時間の見当識障害は風力タービンでのコウモリ死亡率のメカニズム的基盤を提供します。第三に、Scienceの編集者はこの種のRFノイズが「電子機器、送電線、さらにはLED照明によって」生成されると明示的に指摘しています。",
    batHighlight: "ソプラノアブラコウモリの体重は約6グラムです。その体全体がWi-Fiおよび携帯基地局アンテナのニアフィールド内にあります。コウモリクリプトクロムのRPMメカニズムは鳥クリプトクロムと同一に機能します。数時間の持続は単なる感覚マスキングではなく、より深い較正障害を示唆しています。",
    batRef: "Lindecke O et al. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "この研究はコウモリにおけるRF誘発性見当識障害を実証しています。出生率、ホルモン、または細胞生物学は研究していません。BERMフレームワークの含意はモデル予測であり、元の研究の結論ではありません。",
    insectTitle: "昆虫：LED照明と個体数減少",
    insectP1: "[[ref:boyes2021|Boyes et al. 2021]]（Science Advances）は、LED街灯下の蛾幼虫の個体数が近隣の無照明エリアより52%少ないことを発見しました — ナトリウム照明下の41%と比較して。LEDとナトリウムの差は有意です：ナトリウムランプはIF放射が最小限の放電ランプであり、LEDランプは連続的な20〜200kHzフィールドを放射するスイッチモードドライバーを含んでいます。",
    insectP2: "研究は差を光スペクトルに帰属させましたが、BERMのIFチャネルは代替メカニズムを提供します：LEDドライバーのIF放射がIFO-VGIC摂動を通じて幼虫の発達に直接影響する可能性があります。[[ref:pawson2014|Pawson & Bader 2014]]はLEDトラップがナトリウムより48%多くの昆虫を捕獲し、色温度とは独立した効果であることを発見しました。",
    insectP3: "昆虫はIF帯曝露に幾何学的理由で不釣り合いに感受性が高い可能性があります。Clarke et al. 2013は昆虫の体が効率的な電磁アンテナとして機能することを実証しました。LED照明の商業温室は集中的なIF曝露環境を表しています。Mallinson et al. 2025はLED照明温室環境で花粉媒介者の活動パターンの変化を文書化しました。",
    insectNote: "これらの研究は個体群レベルの結果を測定したもので、個別のIF-EMF曝露ではありません。LEDとナトリウムの差はIF仮説と一致していますが、スペクトルまたは熱的説明を排除しません。",
    covidTitle: "COVIDロックダウン：情報的な反対結果",
    covidText: "ソース検証済みCOLOSSデータはCOVIDロックダウン中のミツバチコロニー改善を示しません：冬季損失は2.27パーセントポイント増加しました（24/35カ国が悪化、p = 0.043）。これは「ロックダウン → 環境EMF↓ → センチネル改善」という単純な予測が成立しないことを示す情報的な否定結果です。",
    covidLabel: "反対結果",
    metabolicTitle: "種間代謝カスケード：[[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis et al. 2011]]（Proc R Soc B）は、8種にわたる24集団で統計的に有意な体重増加を文書化しました — 管理された食事の実験動物を含む — 環境EMF曝露が増加したのと同じ数十年間に。ボルチモアの野生ラット、NIEHSの実験マウス、家庭犬・猫すべてが並行した軌道で体重が増加しました。",
    metabolicP2: "この発見はBERM後ろ向き予測（R1）です：モデルはEMF誘発性代謝攪乱が電圧依存性イオンチャネルを共有する種で可視であるべきことを予測しています。管理された食事の実験げっ歯類と加工食品マーケティングに曝露されていない野生動物は「カロリー過剰」説明の部分的対照を提供します。",
    metabolicP3: "代謝カスケードは2つの独立したパスウェイを通じてBERMに接続します。第一に、メラトニン抑制（CRY/RPMパスウェイ）が概日グルコース調節を攪乱します。第二に、VGCC媒介Ca²⁺調節不全が膵臓β細胞からのインスリン分泌を変化させます。",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]]は並行トレンドを文書化した観察研究です。EMF曝露を測定せず、因果関係を確立しません。BERMは実験動物と野生動物の両方に影響する唯一の因子であるため、EMFを最も簡潔な説明として主張します。",
    whaleTitle: "コククジラの自然実験",
    whaleP1: "[[ref:granger2020|Granger et al.（Current Biology 2020）]]は、米国西海岸でのコククジラの座礁が太陽RF活動と相関することを示しました。太陽がより多くのRFノイズを放出するとより多くのクジラが座礁します — 鯨類がナビゲーションに使用するCRY/RPM磁気受容コンパスの攪乱と一致します。これはBERMのラジカルペアメカニズムが自然実験でテストされたものです。",
    whaleP2: "センサーの分子的アイデンティティは現在判明しています。[[ref:cry_drosophila|Fedele et al.（PLoS Genetics 2014、PMC4256086）]]はショウジョウバエでヒトCRY2がEMFを感知するがヒトCRY1は感知しないことを実証しました。Grangerの「壊れた受容体」メカニズムには特定の分子的アイデンティティがあります：CRY2。",
    whaleP3: "3つの独立した線が同じ原理に収束します。第一に[[ref:geomag_263|地磁気攪乱が263の米国都市で心血管死亡率を増加させます（Env. Health 2019）]]。第二に[[ref:solar_birth_11yr|ヒトの出生が9地域で11年太陽周期に変調されます（Int. J. Biometeorol. 1991）]]。メカニズム：太陽RF → CRY/メラトニン → HPG軸。",
    whaleM3Title: "予測M3：効果量の時間的減衰",
    whaleM3: "人為的RF背景が10年ごとに上昇するにつれて、自然な太陽RF変動の相対的寄与は縮小します。Grangerのクジラ座礁効果量は時間とともに減少するはずです。並行予測：出生率の11年周期性の振幅も減少します。両方が同時に減衰すれば、同じメカニズムが両方を説明します。",
    whaleNote: "Granger 2020は太陽活動指数と座礁数の観察的相関[C]です。クジラの位置でのRF曝露を測定せず、鯨類でのCRY2メカニズムを実証していません。予測M3は未テストです。",
    salmonTitle: "サケ：ナビゲーションと生殖",
    salmonP1: "[[ref:putman2014|Putman et al.（Biol. Lett. 2014）]]は、鉄筋コンクリート養殖インフラ近くで育てられたサケが地磁気ナビゲーションの障害を示すことを示しました。養殖魚は野生魚より有意にナビゲーション能力が低下します。メカニズムはCRY/RPM媒介磁気受容 — BERMが概日リズム障害に対して特定する同じ経路（B）です。",
    salmonP2: "[[ref:welch2021|Welch et al.（Fish Fish. 2021）]]は太平洋サケ個体群の数十年にわたる崩壊を記録し、複数種で生存率が同時に低下しました。[[ref:santi2025|Santi et al.（2025）]]はテストステロンとLHの両方が同時に低下していることを示しました — 「HPG機能の進行中のリセット」。これは視床下部性であり、生殖腺性ではありません。サケでは視床下部がナビゲーション（CRY依存的空間定位）と生殖（GnRH → LH）の両方を制御します。",
    salmonP3: "CatSperカルシウムチャネルは精子特異的電位依存性カルシウムチャネルで、過活性化（卵子浸透に必要な激しい運動性）に必要です。CatSperには9つのEMF感受性部位が特定されています。鉄筋コンクリートの水路でELFが上昇した環境で育った養殖サケでは、CatSper機能が慢性的に障害されている可能性があります。",
    salmonM5Title: "予測M5：養殖サケCatSper診断",
    salmonM5: "養殖サケ（鉄筋コンクリート水路で飼育）は、同一個体群の野生サケと比較して、CatSper電流が弱く、プロゲステロン走化性が低下し、過活性化閾値が高いはずです。テスト：養殖 vs. 野生魚でのパッチクランプCatSper電流 + プロゲステロン走化性アッセイ + 過活性化閾値測定。",
    salmonNote: "Putmanのナビゲーション障害は査読済み[C]です。CatSper予測（M5）はBERMの導出です — Putmanのナビゲーション発見（脳のCRY/RPM）と生殖生物学（精子のCatSper）を、養殖インフラEMFが両方の標的に同時に影響するという共通仮説で結びつけます。これは未テストです。サケ減少にはEMFとは独立した強力な代替説明（乱獲、生息地喪失、海洋温暖化、養殖からのウミジラミ）もあります。",
    gradientTitle: "種間EMF勾配",
    gradientP1: "種間の減少率をEMF曝露スコアに対してプロットすると、明確な勾配が現れます：r = 0.84（n = 7）。ヒト精子の減少（2.64%/年）が最高EMF曝露で、非温血種馬（0.46%/年）が最低です。この勾配は3桁の選択圧と4分類目の7種に及びます。",
    gradientP2: "この勾配は社会文化的交絡因子を排除します。犬は子犬より仕事を選びません。馬は避妊しません。ホルスタイン牛は教育のために繁殖を遅らせません。しかしすべてがEMF曝露に比例した生殖パラメータの低下を示します — 勾配と連動する唯一の変数です。",
    gradientP3: "負の対照がメカニズムを確認します：ホルスタイン乳牛（EMFスコア7）はEMF生物学的活性を示しますが（Rodriguez 2003：メラトニン低下、発情周期変化）、育種選択圧が集団レベルの減少シグナルを覆い隠すため負の対照として分類されます。",
    gradientM4Title: "予測M4：海底ケーブルELFと水生生殖",
    gradientM4: "海底電力ケーブルのELF場ゾーン（~35m半径）内で、水生生物の生殖成功率はケーブル遠方域より低いはずです。テスト：ケーブル付近 vs. 遠方のウニ群体サイズ/密度。",
    gradientTableHeaders: { species: "種", emfScore: "EMF負荷（0–1）", decline: "減少（%/年）", axis: "軸" },
    gradientNote: "r = 0.84勾配は7データポイント（7種、ヒトは精子とテストステロンで2回計上）から算出。n = 7ではp値は0.017ですが自由度は低い。統計的堅牢性を主張する前にレジストリへの種追加が必要です。EMFスコアは半定量的推定値です。予測M4は未テストです。",
    threeAxisTitle: "三軸センチネルアーキテクチャ",
    threeAxisP1: "3つの独立した測定軸が同じ結論に収束します — EMFの生物学的活性は陸上、水中、勾配の各次元で一貫しています：",
    threeAxisLand: "陸上軸：現行センチネル（ミツバチ→犬→馬→ヒト）CSLI遅延分析",
    threeAxisWater: "水中軸：新規水生センチネル（クジラ、板鰓類、サケ、ウニ）水がELFとRFを自然に分離",
    threeAxisGradient: "勾配軸：種間EMF-減少相関（r = 0.84、7種）社会文化的交絡因子を排除",
    threeAxisP2: "各軸は独立に導出されています。各々が異なる種、異なるメカニズム、異なる測定方法を使用します。3つの独立した軸が偶然に同じ結論に収束する確率は、個々の偽陽性率の積です。",

    sensitivityTitle: "BERM感受性階層",
    sensitivityDesc: "種間のEMF感受性は、VGCC生理学、CRY依存性、環境結合に基づく予測可能な順序に従います。階層はメカニズムから導出され、観察された個体群減少のタイムラインに対して検証されています。",
    sensitivityOrder: [
      { species: "カエル", sensitivity: "最高", mechanism: "湿った皮膚 → 直接的Ca²⁺環境結合", decline: "〜1987年（レイヤー1→2）", icon: "toad" },
      { species: "ミツバチ", sensitivity: "非常に高い", mechanism: "CRY電気受容 → ナビゲーション依存", decline: "〜2006年CCD（レイヤー2→3）", icon: "honeybee" },
      { species: "昆虫", sensitivity: "高い", mechanism: "小さな神経系 → 高い相対的場の強度", decline: "[[ref:hallmann2017_v2|バイオマス−75%（Krefeld、27年）]]", icon: "honeybee" },
      { species: "鳥類", sensitivity: "中程度", mechanism: "CRYナビゲーション（渡り鳥）+ 昆虫食料供給減少", decline: "スズメ −60%都市、−47%農村", icon: "bird" },
      { species: "哺乳類", sensitivity: "低い（累積的）", mechanism: "乾燥皮膚、大きな体 → 低い相対的場、しかし長寿命 = 累積的", decline: "[[ref:klimentidis2010|Klimentidis: 24集団、8種が体重増加]]", icon: "bat" },
    ],
    layerTimelineTitle: "センチネル × 技術レイヤータイムライン",
    layerTimelineDesc: "各センチネル種の減少開始は、ランダムな環境変化ではなく、特定の技術レイヤー遷移に対応しています。",
    layerTimeline: [
      { year: "〜1975", event: "スズメの都市減少開始", layer: "レイヤー1が都市で飽和（電力網密度）" },
      { year: "〜1987", event: "世界的両生類減少開始", layer: "レイヤー1→2：GSM展開開始" },
      { year: "〜2000", event: "昆虫バイオマス減少加速", layer: "レイヤー2→3：携帯基地局が農村に到達" },
      { year: "〜2006", event: "コロニー崩壊症候群（ミツバチ）", layer: "レイヤー2→3 + ネオニコチノイド相乗効果" },
      { year: "〜2012", event: "[[ref:hallmann2017_v2|昆虫バイオマス−75%（Krefeld）]]", layer: "レイヤー3→4：LED街灯採用" },
      { year: "〜2020", event: "鳥類減少が世界的に加速", layer: "レイヤー4→5：5G + LED飽和" },
    ],
    newBeeEvidence: "2025年の新しい証拠：[[ref:mallinson2025_electric_pollution|Mallinson et al.（iScience、PMC12225925）]]はAC電場がミツバチの着陸を71%減少させることを示しました。[[ref:bumble_rf2025|Environmental Pollution 2025]]はRF-EMFがマルハナバチの訪花を減少させることを示しました。Lupi 2021は農薬+EMFの組み合わせが最も重度の生化学的・行動的変化を生じ、相互作用が超加法的であることを実証しました。",
    contextTitle: "現在の記録が示せること",
    context: [
      ["犬", "公表された単一サイトの繁殖プログラム系列は、一部の精液エンドポイントの経時変化を報告しています。測定されたRF、家庭機器、地域エンドポイントデータが欠如しているため、曝露勾配テストではなく文脈的です。"],
      ["家畜", "公表された人工授精センター要約は有用な比較対象になり得ますが、繁殖選択、ステーション管理、栄養、住環境、プロトコル変更を観察する必要があります。線量測定なしに低RF対照ステータスを推定しません。"],
      ["種間比較", "種は世代時間、選択、生殖生理学、データシステムが異なります。共通の時間的パターンは、一致した場所-時間FieldStateとエンドポイントデータなしには共通の場のメカニズムを特定しません。"],
    ],
    nextTitle: "使用可能なセンチネル研究に必要なもの",
    next: ["関連する環境と時間分解能での出所のある測定されたFieldState。", "場所間で比較可能または明示的にモデル化されたエンドポイント定義と収集プロトコル。", "事前指定された化学物質、気候、飼育管理、選択、疾病共変量。", "場のモデルを競合する因果説明と比較する登録テスト。"],
    link: "FieldState測定プロトコルを読む",
    lindgrenFramework: "Lindgrenフレームワーク",
    speciesHeader: "種",
    sensitivityHeader: "感受性",
    mechanismHeader: "メカニズム",
    declineHeader: "観察された減少",
    nextPageLabel: "次へ",
    nextPageTitle: "生態学",
  },
  fr: {
    title: "Espèces sentinelles : état de préparation des données",
    subtitle: "Les observations inter-espèces peuvent motiver un test enregistré, mais elles ne peuvent pas se substituer à une exposition mesurée, des endpoints compatibles et des données de causes concurrentes.",
    csliTitle: "Signal de décalage inter-espèces : résultats empiriques",
    csliP1: "Dans un panel COLOSS vérifié à la source de 23 pays, les augmentations de pertes hivernales de colonies d'abeilles précèdent les baisses de TFR d'environ 2 ans : 20/23 pays montrent le profil dans la direction BERM (r intra-pays poolé = −0,272, circular-shift p = 0,006, Bonferroni 8-lag p = 0,046). Le signal se réplique dans deux produits TFR indépendants ([[ref:world_bank_wdi_2024|Banque mondiale]] et [[ref:nations2024|WPP 2024]]).",
    csliP2: "La structure de décalage suit la mise à l'échelle biologique. Les pucerons et les abeilles montrent la réponse la plus courte (~2 ans), cohérente avec des cycles de vie courts. Les oiseaux nicheurs suivent à 2-3 ans. Les papillons de nuit à 3-4 ans. Les chiens prédisent la concentration de spermatozoïdes humains à ~3 ans (r = 0,505, p = 0,012). Les crapauds communs montrent le décalage le plus long à ~6 ans.",
    csliP3: "L'analyse du changement annuel (Δabeille → ΔTFR) confirme la co-variation temporelle au-delà de la co-tendance. Les Amériques (4/4) et l'Asie-Pacifique (6/6) sont uniformément dans la direction BERM ; l'Europe est plus faible (13/21). Les 8 pays européens en direction opposée sont informatifs : ils identifient les conditions où la pratique apicole, la politique des pesticides ou le tampon migratoire modifie la chaîne sentinelle.",
    csliStats: "20/23 direction BERM · circular-shift p = 0,006 · r poolé = −0,272 · Bonferroni p = 0,046",
    csliNote: "Tous les résultats sont corrélationnels [C] issus des analyses internes BERM. Ils ne sont pas évalués par des pairs. Un facteur de confusion commun (par ex. produits chimiques agricoles, changement climatique) pourrait produire le même profil sans EMF. Les valeurs de décalage sont des pics de balayage exploratoire, pas des constantes pré-verrouillées.",
    nikeTitle: "Gradient spatial : sites radar de la Guerre froide et populations d'oiseaux",
    nikeText: "L'analyse spatiale de 1 381 itinéraires du Breeding Bird Survey près de 268 sites radar/contrôle de tir Nike de la Guerre froide (début médian 1956) révèle un gradient dans la direction BERM : les itinéraires à moins de 50 km des sites actifs montraient des tendances de population de −0,526 %/an contre +0,096 %/an pour les itinéraires à plus de 100 km (différence de 0,622 points de pourcentage, Welch p = 0,031). Corrélation continue de distance : Spearman ρ = +0,088, p = 0,001.",
    nikePeakFieldText: "Le résultat est cohérent avec l'hypothèse de champ de crête de BERM. Les faisceaux principaux Nike LOPAR/HIPAR pointaient vers le haut ; l'exposition au sol provenait d'impulsions de lobes secondaires avec atténuation 1/r². Champ de crête du lobe secondaire à 1 km : ~24,5 V/m pendant une impulsion unique de 1 µs, tandis que le RMS moyenné dans le temps n'est que de 0,037 V/m (ratio 671:1). Les voies BERM A (VGIC, 45 %), B (CRY/RPM, 25 %) et D (HPA, 15 %) sont des mécanismes de seuil ou d'impulsion.",
    nikeRichnessNote: "La richesse spécifique et l'abondance divergent : le gradient de richesse persiste dans la permutation intra-état (p = 0,006), mais la tendance d'abondance s'affaiblit quand les facteurs de confusion au niveau de l'état sont contrôlés (p = 0,103). Le signal des oiseaux est détendancé (lent, structurel) — il n'apparaît pas dans l'analyse en première différence (rapide, année à année).",
    nikeCounterText: "Cependant, la fermeture des sites n'a pas prédit la récupération des oiseaux, et le nombre de sites actifs était corrélé avec une abondance d'oiseaux plus élevée (possible biais d'infrastructure-habitat ou de localisation). L'excédance du seuil VGIC à 24,5 V/m est une prédiction du modèle, non confirmée par une expérience cellulaire.",
    frogTitle: "Amphibiens près des radars : un signal inversé",
    frogText: "Les données de l'enquête Nike-NAAMP sur les grenouilles montrent une inversion inattendue : les indices d'appel des grenouilles évoluent mieux près des sites Nike actifs (+0,040/décennie) que plus loin (+0,002/décennie, différence p = 0,045). C'est l'opposé du résultat pour les oiseaux et nécessite une explication.",
    frogInterpretation: "Le résultat inversé est cohérent quand l'atténuation RF spécifique à l'espèce est prise en compte. Les grenouilles vivent dans l'eau et le sol humide — des milieux qui atténuent fortement les RF (permittivité relative de l'eau ε_r ≈ 80). Une grenouille dans l'eau est effectivement protégée des impulsions de champ de crête. Les oiseaux sont en plein air sans milieu atténuant.",
    frogAggregateTitle: "Résultat agrégé grenouille-EMF",
    frogAggregate: [
      "Association inverse Nike-NAAMP (p = 0,045) → atténuation par l'eau + facteur de confusion habitat",
      "Bande S tropicale inconsistante avec BERM (OR = 1,474, p = 0,016)",
      "Chronologie australienne inconsistante pour JORN",
      "Coefficient d'absorption 8,7× NON confirmé par source primaire",
    ],

    aquaticTitle: "Axe aquatique : le séparateur naturel de canaux",
    aquaticP1: "Le résultat des grenouilles révèle un principe plus profond. L'eau atténue les RF de façon exponentielle — à 1 GHz, la profondeur de pénétration en eau de mer est inférieure à 1 cm. L'ELF (50/60 Hz) pénètre sur des dizaines de mètres. Un organisme aquatique vit dans un filtre passe-bande naturel : il reçoit l'ELF mais est protégé des RF. Un organisme terrestre reçoit les deux simultanément, plus leurs interactions superadditives.",
    aquaticP2: "Une [[ref:superpos_172|revue systématique de 172 études (Biomolecules 2025)]] a trouvé que les environnements EMF multi-sources produisent souvent des effets biologiques synergiques. Les organismes aquatiques sont exemptés de cette superposition — ils n'expérimentent que le canal ELF. Cela fait de l'axe aquatique le seul moyen de séparer les effets ELF des effets RF sans hypothèses proxy ou conditions de laboratoire contrôlées.",
    aquaticP3: "Le canal calcique CatSper — essentiel pour l'hyperactivation des spermatozoïdes et la fécondation — est [[ref:catsper_20yr|conservé évolutivement de l'oursin à l'humain (Physiology 2022)]]. La reproduction aquatique dépend du même canal ionique que BERM identifie comme sensible aux EMF. Les câbles électriques sous-marins émettent des champs ELF à 50 Hz détectables à ~35 m — créant une expérience de gradient naturelle pour les organismes marins à fécondation dépendante de CatSper.",
    aquaticP4: "[[ref:calves_dark|Kolbabova et al. (Sci. Rep. 2015)]] ont démontré que les champs magnétiques ELF affectent la mélatonine des veaux même dans l'obscurité complète, confirmant que la voie ELF fonctionne indépendamment de la lumière. Les organismes aquatiques expérimentent précisément cette voie ELF isolée — ce qui en fait le test naturel le plus propre pour déterminer si l'ELF seul est biologiquement actif aux niveaux environnementaux.",
    aquaticSkinDepth: [
      { medium: "Eau de mer", freq: "1 GHz (RF)", depth: "< 1 cm" },
      { medium: "Eau de mer", freq: "50 Hz (ELF)", depth: "~250 m" },
      { medium: "Eau douce", freq: "1 GHz (RF)", depth: "~3 cm" },
      { medium: "Eau douce", freq: "50 Hz (ELF)", depth: "~700 m" },
      { medium: "Air", freq: "1 GHz (RF)", depth: "∞ (pas d'atténuation)" },
      { medium: "Air", freq: "50 Hz (ELF)", depth: "∞ (pas d'atténuation)" },
    ],
    aquaticNote: "L'axe aquatique est un argument structurel, pas un résultat confirmé. Aucune étude n'a encore mesuré les effets ELF des câbles sous-marins sur le succès reproductif marin avec le design contrôlé décrit ici. La sensibilité de CatSper aux ELF n'a pas été testée directement chez aucun organisme.",
    aquaticMediumHeader: "Milieu",
    aquaticFreqHeader: "Fréquence",
    aquaticDepthHeader: "Profondeur de pénétration (δ)",

    batTitle: "Chauves-souris : la boussole des mammifères perturbée",
    batP1: "En mai 2026, une équipe dirigée par [[ref:lindecke2026|Oliver Lindecke]] a publié dans Science la première démonstration expérimentale que le bruit électromagnétique radiofréquence perturbe la boussole magnétique d'un mammifère. Des pipistrelles sopranes migratrices (Pipistrellus pygmaeus) ont été exposées à un bruit RF faible à large bande (0,01-300 MHz) — à des niveaux trouvés dans les environnements urbains normaux — pendant seulement 30 minutes au coucher du soleil. Les chauves-souris témoins s'orientaient normalement. Les chauves-souris exposées aux RF partaient dans des directions aléatoires.",
    batP2: "La découverte la plus inattendue était la durée de l'effet. Dans les études précédentes sur les oiseaux migrateurs, la boussole magnétique récupérait immédiatement après la fin de l'exposition. Chez les chauves-souris, la désorientation persistait pendant plus de deux heures. Les chercheurs ont conclu que la pollution électromagnétique peut affecter le comportement animal « de manières plus complexes qu'on ne le pensait auparavant ».",
    batP3: "Cette découverte a trois implications directes pour le cadre BERM. Premièrement, elle étend le mécanisme de perturbation de la boussole RPM/CRY des oiseaux aux mammifères. Deuxièmement, la désorientation de plusieurs heures fournit une base mécaniste pour la mortalité des chauves-souris aux éoliennes. Troisièmement, les éditeurs de Science notent explicitement que le bruit RF de ce type est « produit par l'électronique, les lignes électriques et même les lumières LED ».",
    batHighlight: "La pipistrelle soprane pèse environ 6 grammes. Tout son corps est bien dans le champ proche des antennes Wi-Fi et des stations de base mobiles. Le mécanisme RPM dans le cryptochrome des chauves-souris fonctionne de manière identique au cryptochrome des oiseaux. La persistance de plusieurs heures suggère un échec de calibration plus profond qu'un simple masquage sensoriel.",
    batRef: "Lindecke O et al. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "Cette étude démontre la désorientation induite par les RF chez les chauves-souris. Elle n'étudie pas la fertilité, les hormones ou la biologie cellulaire. Les implications du cadre BERM sont des prédictions du modèle, pas des conclusions de l'étude originale.",
    insectTitle: "Insectes : éclairage LED et déclin des populations",
    insectP1: "[[ref:boyes2021|Boyes et al. 2021]] (Science Advances) ont trouvé que l'abondance de chenilles de papillons de nuit sous les lampadaires LED était 52 % plus faible que dans les zones non éclairées voisines — contre 41 % plus faible sous l'éclairage au sodium. Les lampes à sodium sont des lampes à décharge avec des émissions IF minimales ; les lampes LED contiennent des alimentations à découpage émettant des champs continus de 20-200 kHz.",
    insectP2: "Bien que l'étude ait attribué la différence au spectre lumineux, le canal IF de BERM fournit un mécanisme alternatif : les émissions IF du driver LED peuvent directement affecter le développement des chenilles par perturbation IFO-VGIC. [[ref:pawson2014|Pawson & Bader 2014]] ont trouvé que les pièges LED capturaient 48 % d'insectes de plus que le sodium, un effet indépendant de la température de couleur.",
    insectP3: "Les insectes peuvent être disproportionnellement sensibles aux expositions IF pour des raisons géométriques. Clarke et al. 2013 ont démontré que les corps d'insectes agissent comme des antennes électromagnétiques efficaces. Les serres commerciales éclairées par LED représentent un environnement d'exposition IF concentré. Mallinson et al. 2025 ont documenté des patterns d'activité altérés des pollinisateurs dans les environnements de serre éclairés par LED.",
    insectNote: "Ces études ont mesuré des résultats au niveau de la population, pas l'exposition IF-EMF individuelle. La différence LED vs sodium est cohérente avec l'hypothèse IF mais n'exclut pas les explications spectrales ou thermiques.",
    covidTitle: "Confinement COVID : un contre-résultat informatif",
    covidText: "Les données COLOSS vérifiées à la source ne montrent pas d'amélioration des colonies d'abeilles pendant les confinements COVID : les pertes hivernales ont augmenté de 2,27 points de pourcentage (24/35 pays empirés, p = 0,043). C'est un résultat négatif informatif : la prédiction simple « confinement → EMF ambiant ↓ → sentinelles s'améliorent » ne tient pas.",
    covidLabel: "Contre-résultat",
    metabolicTitle: "Cascade métabolique inter-espèces : [[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis et al. 2011]] (Proc R Soc B) ont documenté une augmentation statistiquement significative du poids corporel dans 24 populations couvrant 8 espèces — y compris des animaux de laboratoire avec des régimes contrôlés — au cours des mêmes décennies où l'exposition EMF ambiante a augmenté. La probabilité que les 24 populations montrent des tendances positives de poids par hasard seul est inférieure à 10⁻⁷.",
    metabolicP2: "Cette découverte est une rétrodiction BERM (R1) : le modèle prédit que la perturbation métabolique induite par les EMF devrait être visible dans les espèces partageant les canaux ioniques voltage-dépendants. Les rongeurs de laboratoire avec des régimes contrôlés et les animaux sauvages fournissent des contrôles partiels pour l'explication de « l'excès calorique ».",
    metabolicP3: "La cascade métabolique se connecte à BERM par deux voies indépendantes. Premièrement, la suppression de la mélatonine (voie CRY/RPM) perturbe la régulation circadienne du glucose. Deuxièmement, la dérégulation Ca²⁺ médiée par VGCC altère la sécrétion d'insuline des cellules β pancréatiques.",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]] est une étude observationnelle documentant des tendances parallèles. Elle ne mesure pas l'exposition EMF et n'établit pas la causalité. BERM propose les EMF comme l'explication la plus parcimonieuse car c'est le seul facteur affectant à la fois les animaux de laboratoire et sauvages.",
    whaleTitle: "Expérience naturelle de la baleine grise",
    whaleP1: "[[ref:granger2020|Granger et al. (Current Biology 2020)]] ont montré que les échouages de baleines grises sur la côte ouest des États-Unis corrèlent avec l'activité RF solaire. Quand le soleil émet plus de bruit RF, plus de baleines s'échouent — cohérent avec la perturbation de la boussole CRY/RPM de magnétoréception que les cétacés utilisent pour la navigation. C'est le mécanisme de paire de radicaux de BERM testé par une expérience naturelle.",
    whaleP2: "L'identité moléculaire du capteur est maintenant connue. [[ref:cry_drosophila|Fedele et al. (PLoS Genetics 2014, PMC4256086)]] ont démontré chez la drosophile que le CRY2 humain détecte les EMF tandis que le CRY1 humain ne le fait pas. Le mécanisme de « récepteur cassé » de Granger a une identité moléculaire spécifique : CRY2.",
    whaleP3: "Trois lignes indépendantes convergent vers le même principe. Premièrement, [[ref:geomag_263|les perturbations géomagnétiques augmentent la mortalité cardiovasculaire dans 263 villes américaines (Env. Health 2019)]]. Deuxièmement, [[ref:solar_birth_11yr|les naissances humaines se modulent avec le cycle solaire de 11 ans dans 9 régions (Int. J. Biometeorol. 1991)]]. Mécanisme : RF solaire → CRY/mélatonine → axe HPG.",
    whaleM3Title: "Prédiction M3 : atténuation temporelle de la taille d'effet",
    whaleM3: "À mesure que le fond RF anthropique augmente décennie après décennie, la contribution relative de la variation RF solaire naturelle diminue. La taille d'effet des échouages de baleines de Granger devrait donc diminuer au fil du temps. Prédiction parallèle : l'amplitude de la cyclicité de 11 ans du taux de natalité devrait également diminuer. Si les deux s'atténuent simultanément, le même mécanisme les explique.",
    whaleNote: "Granger 2020 est une corrélation observationnelle [C] entre les indices d'activité solaire et les comptages d'échouages. Il ne mesure pas l'exposition RF à l'emplacement de la baleine ni ne démontre un mécanisme CRY2 chez les cétacés. La prédiction M3 n'est pas testée.",
    salmonTitle: "Saumon : Navigation et reproduction",
    salmonP1: "[[ref:putman2014|Putman et al. (Biol. Lett. 2014)]] ont montré que les saumons élevés près d'infrastructures d'aquaculture en acier et béton présentent une navigation géomagnétique perturbée. Les poissons d'élevage naviguent significativement moins bien que les poissons sauvages. Le mécanisme est la magnétoréception médiée par CRY/RPM — la même voie (B) que BERM identifie pour la perturbation circadienne.",
    salmonP2: "[[ref:welch2021|Welch et al. (Fish Fish. 2021)]] ont documenté l'effondrement multi-décennal des populations de saumon du Pacifique. [[ref:santi2025|Santi et al. (2025)]] ont montré que la testostérone ET l'hormone lutéinisante déclinent simultanément — 'réinitialisation continue de la fonction HPG.' C'est hypothalamique, pas gonadique. Chez le saumon, l'hypothalamus contrôle la navigation (orientation spatiale CRY-dépendante) et la reproduction (GnRH → LH). Une seule perturbation hypothalamique peut altérer les deux.",
    salmonP3: "Le canal calcique CatSper est le canal calcique voltage-dépendant spécifique aux spermatozoïdes requis pour l'hyperactivation. CatSper possède 9 sites sensibles aux EMF identifiés. Chez les saumons d'élevage dans des bassins en béton armé avec un ELF élevé, la fonction CatSper peut être chroniquement altérée.",
    salmonM5Title: "Prédiction M5 : Diagnostics CatSper du saumon d'élevage",
    salmonM5: "Le saumon d'élevage (élevé dans des bassins en béton armé) devrait présenter un courant CatSper plus faible, une chimiotaxie à la progestérone réduite et un seuil d'hyperactivation plus élevé par rapport au saumon sauvage de la même population.",
    salmonNote: "L'altération de la navigation de Putman est évaluée par les pairs [C]. La prédiction CatSper (M5) est une dérivation BERM — elle n'est pas testée. Le déclin du saumon a aussi de fortes explications alternatives (surpêche, perte d'habitat, réchauffement océanique, poux de mer) indépendantes des EMF.",
    gradientTitle: "Gradient EMF inter-espèces",
    gradientP1: "Lorsque les taux de déclin entre espèces sont tracés contre les scores d'exposition EMF, un gradient clair émerge : r = 0,84 (n = 7). Le déclin des spermatozoïdes humains (2,64 %/an) à l'exposition EMF la plus élevée ; les chevaux non sang-chaud (0,46 %/an) à la plus basse.",
    gradientP2: "Ce gradient élimine les facteurs confondants socioculturels. Les chiens ne choisissent pas une carrière plutôt que des chiots. Les chevaux n'utilisent pas de contraception. Les vaches Holstein ne retardent pas la reproduction pour l'éducation. Pourtant tous montrent un déclin des paramètres reproductifs proportionnel à leur exposition EMF.",
    gradientP3: "Le contrôle négatif confirme le mécanisme : les vaches Holstein (score EMF 7) montrent une activité biologique EMF (Rodriguez 2003) mais sont classées comme contrôles négatifs car la pression de sélection d'élevage masque le signal de déclin au niveau populationnel.",
    gradientM4Title: "Prédiction M4 : ELF des câbles sous-marins et reproduction aquatique",
    gradientM4: "Dans la zone de champ ELF des câbles électriques sous-marins (~35m de rayon), le succès reproductif des organismes aquatiques devrait être inférieur à celui des zones éloignées des câbles.",
    gradientTableHeaders: { species: "Espèce", emfScore: "Charge EMF (0–1)", decline: "Déclin (%/an)", axis: "Axe" },
    gradientNote: "Le gradient r = 0,84 est calculé à partir de 7 points de données. Avec n = 7, la valeur p est 0,017 mais les degrés de liberté sont faibles. Les scores EMF sont des estimations semi-quantitatives. La prédiction M4 n'est pas testée.",
    threeAxisTitle: "Architecture sentinelle à trois axes",
    threeAxisP1: "Trois axes de mesure indépendants convergent vers la même conclusion — l'activité biologique des EMF est cohérente dans les dimensions terrestre, aquatique et de gradient :",
    threeAxisLand: "Axe terrestre : sentinelles actuelles (abeille → chien → cheval → humain) avec analyse de décalage CSLI",
    threeAxisWater: "Axe aquatique : nouvelles sentinelles aquatiques (baleine, élasmobranche, saumon, oursin) où l'eau sépare naturellement ELF et RF",
    threeAxisGradient: "Axe gradient : corrélation EMF-déclin inter-espèces (r = 0,84, 7 espèces) éliminant les facteurs confondants socioculturels",
    threeAxisP2: "Chaque axe est dérivé indépendamment. Chacun utilise des espèces, des mécanismes et des méthodes de mesure différents. La probabilité que trois axes indépendants convergent vers la même conclusion par hasard est le produit de leurs taux de faux positifs individuels.",

    sensitivityTitle: "Hiérarchie de sensibilité BERM",
    sensitivityDesc: "La sensibilité aux EMF entre espèces suit un ordre prévisible basé sur la physiologie VGCC, la dépendance CRY et le couplage environnemental. La hiérarchie est dérivée du mécanisme et vérifiée par rapport aux chronologies de déclin de population observées.",
    sensitivityOrder: [
      { species: "Grenouilles", sensitivity: "La plus élevée", mechanism: "Peau humide → couplage Ca²⁺ environnemental direct", decline: "~1987 (couche 1→2)", icon: "toad" },
      { species: "Abeilles", sensitivity: "Très élevée", mechanism: "Électroréception CRY → dépendante de la navigation", decline: "~2006 CCD (couche 2→3)", icon: "honeybee" },
      { species: "Insectes", sensitivity: "Élevée", mechanism: "Petit système nerveux → intensité de champ relative élevée", decline: "[[ref:hallmann2017_v2|Biomasse −75 % (Krefeld, 27 ans)]]", icon: "honeybee" },
      { species: "Oiseaux", sensitivity: "Modérée", mechanism: "Navigation CRY (migrateurs) + déclin de l'approvisionnement en insectes", decline: "Moineaux −60 % urbain, −47 % rural", icon: "bird" },
      { species: "Mammifères", sensitivity: "Plus faible (cumulatif)", mechanism: "Peau sèche, grand corps → champ relatif plus faible, mais longue durée de vie = cumulatif", decline: "[[ref:klimentidis2010|Klimentidis : 24 populations, 8 espèces prenant du poids]]", icon: "bat" },
    ],
    layerTimelineTitle: "Chronologie sentinelle × couche technologique",
    layerTimelineDesc: "Le début du déclin de chaque espèce sentinelle correspond à une transition de couche technologique spécifique, pas à un changement environnemental aléatoire.",
    layerTimeline: [
      { year: "~1975", event: "Début du déclin urbain des moineaux", layer: "Couche 1 sature en ville (densité du réseau électrique)" },
      { year: "~1987", event: "Début du déclin mondial des amphibiens", layer: "Couche 1→2 : déploiement du GSM" },
      { year: "~2000", event: "Accélération du déclin de la biomasse d'insectes", layer: "Couche 2→3 : les tours cellulaires atteignent les zones rurales" },
      { year: "~2006", event: "Syndrome d'effondrement des colonies (abeilles)", layer: "Couche 2→3 + synergie néonicotinoïde" },
      { year: "~2012", event: "[[ref:hallmann2017_v2|Biomasse d'insectes −75 % (Krefeld)]]", layer: "Couche 3→4 : adoption de l'éclairage public LED" },
      { year: "~2020", event: "Accélération mondiale du déclin des oiseaux", layer: "Couche 4→5 : 5G + saturation LED" },
    ],
    newBeeEvidence: "Nouvelles preuves 2025 : [[ref:mallinson2025_electric_pollution|Mallinson et al. (iScience, PMC12225925)]] ont montré que les champs électriques AC réduisent les atterrissages des abeilles de 71 %. Séparément, [[ref:bumble_rf2025|Environmental Pollution 2025]] a montré que les RF-EMF réduisent les visites florales des bourdons. Lupi 2021 a démontré que la combinaison pesticide + EMF produit les altérations biochimiques et comportementales les plus sévères — l'interaction est superadditive.",
    contextTitle: "Ce que les registres actuels peuvent dire",
    context: [
      ["Chiens", "Une série publiée d'un programme de reproduction à site unique rapporte des changements dans certains endpoints du sperme au fil du temps. Elle manque de RF mesuré, de données sur les appareils domestiques et d'endpoints régionaux, elle est donc contextuelle plutôt qu'un test de gradient d'exposition."],
      ["Bétail", "Les résumés publiés des centres d'insémination artificielle peuvent être des comparateurs utiles, mais la sélection génétique, la gestion de station, la nutrition, le logement et les changements de protocole doivent être observés."],
      ["Comparaison inter-espèces", "Les espèces diffèrent en temps de génération, sélection, physiologie reproductive et systèmes de données. Un profil temporel commun n'identifie pas un mécanisme de champ commun sans FieldState lieu-temps apparié et données d'endpoints."],
    ],
    nextTitle: "Ce dont une étude sentinelle utilisable a besoin",
    next: ["Un FieldState mesuré avec provenance à la résolution environnementale et temporelle pertinente.", "Des définitions d'endpoints et protocoles de collecte comparables entre sites ou explicitement modélisés.", "Des covariables chimiques, climatiques, d'élevage, de sélection et de maladie pré-spécifiées.", "Un test enregistré comparant le modèle de champ avec les explications causales concurrentes."],
    link: "Lire le protocole de mesure FieldState",
    lindgrenFramework: "Cadre Lindgren",
    speciesHeader: "Espèce",
    sensitivityHeader: "Sensibilité",
    mechanismHeader: "Mécanisme",
    declineHeader: "Déclin observé",
    nextPageLabel: "Suivant",
    nextPageTitle: "Écologie",
  },
  ko: {
    title: "센티널 종: 데이터 준비 상태",
    subtitle: "종간 관찰은 등록된 테스트의 동기를 부여할 수 있지만, 측정된 노출, 호환 가능한 엔드포인트 및 경쟁 원인 데이터를 대체할 수 없습니다.",
    csliTitle: "종간 시차 신호: 실증 결과",
    csliP1: "출처 검증된 23개국 COLOSS 패널에서 꿀벌 군집 겨울 손실 증가는 TFR 감소에 약 2년 선행합니다: 20/23개국이 BERM 방향 패턴을 보여주었습니다(풀링된 국내 r = −0.272, circular-shift p = 0.006, 8-lag Bonferroni p = 0.046). 신호는 두 개의 독립적 TFR 제품([[ref:world_bank_wdi_2024|세계은행]] 및 [[ref:nations2024|WPP 2024]])에서 재현됩니다.",
    csliP2: "시차 구조는 생물학적 스케일링을 따릅니다. 진딧물과 꿀벌이 가장 짧은 반응(~2년)을 보이며 짧은 생활사와 일치합니다. 번식 조류는 2-3년에 뒤따릅니다. 나방은 3-4년. 개는 인간 정자 농도를 ~3년 선행하여 예측합니다(r = 0.505, p = 0.012). 두꺼비는 ~6년의 가장 긴 시차를 보여줍니다.",
    csliP3: "연도 변화 분석(Δ꿀벌 → ΔTFR)은 공동 추세를 넘어서는 시간적 공변동을 확인합니다. 아메리카(4/4)와 아시아-태평양(6/6)은 균일하게 BERM 방향입니다; 유럽은 약합니다(13/21). 8개의 반대 방향 유럽 국가는 정보적입니다.",
    csliStats: "20/23 BERM 방향 · circular-shift p = 0.006 · 풀링 r = −0.272 · Bonferroni p = 0.046",
    csliNote: "모든 결과는 BERM 내부 분석의 상관적[C] 결과입니다. 동료 검토되지 않았습니다. 공통 교란 인자(예: 농업 화학물질, 기후 변화)가 EMF 없이 동일한 패턴을 생성할 수 있습니다.",
    nikeTitle: "공간 기울기: 냉전 레이더 기지와 조류 개체군",
    nikeText: "268개 냉전 시대 Nike 레이더/사격통제 사이트(중앙값 시작 1956년) 인근 1,381개 Breeding Bird Survey 경로의 공간 분석은 BERM 방향 기울기를 보여줍니다: 활성 사이트 50km 이내 경로는 −0.526%/년 개체군 추세를 보였고 100km 이상 떨어진 경로는 +0.096%/년이었습니다(차이 0.622 백분율 포인트, Welch p = 0.031).",
    nikePeakFieldText: "이 결과는 BERM의 피크 필드 가설과 일치합니다. Nike LOPAR/HIPAR 메인 빔은 위로 향했으며 지면 수준 노출은 1/r² 감쇠를 겪는 사이드로브 펄스에서 왔습니다. 1km에서의 사이드로브 피크 필드: 단일 1µs 펄스 동안 ~24.5 V/m, 시간 평균 RMS는 0.037 V/m에 불과(비율 671:1).",
    nikeRichnessNote: "종 풍부도와 개체수는 발산합니다: 풍부도 기울기는 주 내 순열에서 지속되지만(p = 0.006) 개체수 추세는 주 수준 교란 인자를 통제하면 약해집니다(p = 0.103).",
    nikeCounterText: "그러나 사이트 폐쇄는 조류 회복을 예측하지 않았으며 활성 사이트 수는 더 높은 조류 개체수와 상관관계가 있었습니다. VGIC 임계값 초과 24.5 V/m은 모델 예측이지 세포 실험으로 확인된 것이 아닙니다.",
    frogTitle: "레이더 근처의 양서류: 반전된 신호",
    frogText: "Nike-NAAMP 개구리 조사 데이터는 예상치 못한 반전을 보여줍니다: 활성 Nike 사이트 근처의 개구리 울음 지수가 더 좋은 추세(+0.040/10년)를 보이며 먼 곳(+0.002/10년, 차이 p = 0.045)보다 양호합니다.",
    frogInterpretation: "반전된 결과는 종 특이적 RF 감쇠를 고려하면 일관적입니다. 개구리는 RF를 강하게 감쇠시키는 물과 습한 토양에 살고 있습니다(물의 비유전율 ε_r ≈ 80).",
    frogAggregateTitle: "개구리-EMF 종합 결과",
    frogAggregate: [
      "Nike-NAAMP 역상관(p = 0.045) → 수중 감쇠 + 서식지 교란",
      "열대 S밴드 BERM 비일관(OR = 1.474, p = 0.016)",
      "호주 타임라인 JORN과 비일관",
      "8.7× 흡수 계수 1차 출처에서 확인되지 않음",
    ],

    aquaticTitle: "수생축: 자연의 채널 분리기",
    aquaticP1: "개구리 결과는 더 깊은 원리를 드러냅니다. 물은 RF를 지수적으로 감쇠시킵니다 — 1 GHz에서 해수의 표피 깊이는 1 cm 미만입니다. ELF(50/60 Hz)는 수십 미터를 관통합니다. 수생 생물은 자연적 대역통과 필터 안에서 살고 있습니다: ELF를 수신하지만 RF로부터 차폐됩니다. 육상 생물은 둘 다 동시에 수신하며, 초가법적 상호작용도 함께 받습니다.",
    aquaticP2: "[[ref:superpos_172|172개 연구의 체계적 리뷰(Biomolecules 2025)]]는 다중 소스 EMF 환경이 종종 시너지적 생물학적 효과를 생성한다는 것을 발견했습니다. 수생 생물은 이 중첩에서 면제됩니다 — ELF 채널만 경험합니다. 이것은 수생축을 프록시 가정이나 통제된 실험실 조건 없이 ELF와 RF 효과를 분리하는 유일한 방법으로 만듭니다.",
    aquaticP3: "CatSper 칼슘 채널 — 정자 과활성화와 수정에 필수적 — 은 [[ref:catsper_20yr|성게에서 인간까지 진화적으로 보존되어 있습니다(Physiology 2022)]]. 수생 생식은 BERM이 EMF 민감성으로 식별하는 동일한 이온 채널에 의존합니다. 해저 전력 케이블은 ~35 m에서 감지 가능한 50 Hz ELF 필드를 방출하여 CatSper 의존적 수정을 가진 해양 생물에 대한 자연적 기울기 실험을 만듭니다.",
    aquaticP4: "[[ref:calves_dark|Kolbabova et al.(Sci. Rep. 2015)]]은 ELF 자기장이 완전한 어둠에서도 송아지의 멜라토닌에 영향을 미친다는 것을 실증하여 ELF 경로가 빛과 독립적으로 작동함을 확인했습니다. 수생 생물은 정확히 이 격리된 ELF 경로를 경험합니다 — ELF 단독이 환경 수준에서 생물학적으로 활성인지의 가장 깨끗한 자연 테스트가 됩니다.",
    aquaticSkinDepth: [
      { medium: "해수", freq: "1 GHz (RF)", depth: "< 1 cm" },
      { medium: "해수", freq: "50 Hz (ELF)", depth: "~250 m" },
      { medium: "담수", freq: "1 GHz (RF)", depth: "~3 cm" },
      { medium: "담수", freq: "50 Hz (ELF)", depth: "~700 m" },
      { medium: "공기", freq: "1 GHz (RF)", depth: "∞ (감쇠 없음)" },
      { medium: "공기", freq: "50 Hz (ELF)", depth: "∞ (감쇠 없음)" },
    ],
    aquaticNote: "수생축은 구조적 논거이지 확인된 결과가 아닙니다. 여기에 설명된 통제된 설계로 해저 케이블 ELF 효과를 해양 생식 성공에 대해 측정한 연구는 아직 없습니다. CatSper의 ELF 민감성은 어떤 생물에서도 직접 테스트되지 않았습니다.",
    aquaticMediumHeader: "매질",
    aquaticFreqHeader: "주파수",
    aquaticDepthHeader: "표피 깊이 (δ)",

    batTitle: "박쥐: 포유류 나침반 교란",
    batP1: "2026년 5월, [[ref:lindecke2026|Oliver Lindecke]]가 이끄는 팀이 Science에서 무선주파수 전자기 노이즈가 포유류의 자기 나침반을 교란시키는 최초의 실험적 실증을 발표했습니다. 이주하는 소프라노피피스트렐 박쥐(Pipistrellus pygmaeus)는 일반 도시 환경에서 발견되는 수준의 약한 광대역 RF 노이즈(0.01-300 MHz)에 일몰 시 30분간만 노출되었습니다.",
    batP2: "가장 예상치 못한 발견은 효과의 지속 시간이었습니다. 이전의 철새 연구에서 자기 나침반은 RF 노출 종료 후 즉시 회복되었습니다. 박쥐에서 방향감각 상실은 2시간 이상 지속되었습니다.",
    batP3: "이 발견은 BERM 프레임워크에 세 가지 직접적 함의가 있습니다. 첫째, RPM/CRY 나침반 교란 메커니즘을 조류에서 포유류로 확장합니다. 둘째, 수 시간의 방향감각 상실은 풍력 터빈에서의 박쥐 사망률에 메커니즘적 근거를 제공합니다. 셋째, Science 편집자들은 이 종류의 RF 노이즈가 '전자기기, 송전선, 심지어 LED 조명에 의해' 생성된다고 명시적으로 언급합니다.",
    batHighlight: "소프라노피피스트렐은 약 6그램입니다. 박쥐 크립토크롬의 RPM 메커니즘은 조류 크립토크롬과 동일하게 작동합니다. 수 시간의 지속은 단순한 감각 마스킹이 아니라 더 깊은 교정 실패를 시사합니다.",
    batRef: "Lindecke O et al. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "이 연구는 박쥐에서 RF 유도 방향감각 상실을 실증합니다. 출산율, 호르몬 또는 세포 생물학을 연구하지 않습니다. BERM 프레임워크 함의는 모델 예측이지 원래 연구의 결론이 아닙니다.",
    insectTitle: "곤충: LED 조명과 개체군 감소",
    insectP1: "[[ref:boyes2021|Boyes et al. 2021]](Science Advances)은 LED 가로등 아래 나방 유충 개체수가 인근 비조명 지역보다 52% 적다는 것을 발견했습니다 — 나트륨 조명 아래 41%와 비교하여. 나트륨 램프는 최소한의 IF 방출을 가진 방전 램프이며, LED 램프는 연속적인 20-200 kHz 필드를 방출하는 스위치 모드 드라이버를 포함합니다.",
    insectP2: "연구는 차이를 빛 스펙트럼에 귀인시켰지만, BERM의 IF 채널은 대안적 메커니즘을 제공합니다. [[ref:pawson2014|Pawson & Bader 2014]]는 LED 트랩이 나트륨보다 48% 더 많은 곤충을 포획했으며, 색온도와 무관한 효과를 발견했습니다.",
    insectP3: "곤충은 기하학적 이유로 IF 대역 노출에 불균형적으로 취약할 수 있습니다. Clarke et al. 2013은 곤충 몸체가 효율적인 전자기 안테나로 작용한다는 것을 실증했습니다. Mallinson et al. 2025는 LED 조명 온실 환경에서 수분매개자 활동 패턴의 변화를 문서화했습니다.",
    insectNote: "이 연구들은 개별 IF-EMF 노출이 아닌 개체군 수준의 결과를 측정했습니다. LED 대 나트륨 차이는 IF 가설과 일치하지만 스펙트럼 또는 열적 설명을 배제하지 않습니다.",
    covidTitle: "COVID 봉쇄: 정보적 반대 결과",
    covidText: "출처 검증된 COLOSS 데이터는 COVID 봉쇄 중 꿀벌 군집 개선을 보여주지 않습니다: 겨울 손실이 2.27 백분율 포인트 증가했습니다(24/35개국 악화, p = 0.043). 이것은 '봉쇄 → 환경 EMF↓ → 센티널 개선'이라는 단순한 예측이 성립하지 않음을 보여주는 정보적 부정 결과입니다.",
    covidLabel: "반대 결과",
    metabolicTitle: "종간 대사 캐스케이드: [[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis et al. 2011]](Proc R Soc B)은 8종에 걸친 24개 집단에서 통계적으로 유의한 체중 증가를 문서화했습니다 — 통제된 식이의 실험 동물 포함 — 환경 EMF 노출이 증가한 같은 수십 년 동안. 24개 집단 모두가 양성 체중 추세를 보일 확률은 10⁻⁷ 미만입니다.",
    metabolicP2: "이 발견은 BERM 후향적 예측(R1)입니다: 모델은 EMF 유도 대사 교란이 전압 개폐 이온 채널을 공유하는 종에서 가시적이어야 한다고 예측합니다.",
    metabolicP3: "대사 캐스케이드는 두 개의 독립적 경로를 통해 BERM에 연결됩니다. 첫째, 멜라토닌 억제(CRY/RPM 경로)가 일주기 포도당 조절을 교란합니다. 둘째, VGCC 매개 Ca²⁺ 조절 장애가 췌장 β세포로부터의 인슐린 분비를 변경합니다.",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]]은 병렬 추세를 문서화한 관찰 연구입니다. EMF 노출을 측정하지 않으며 인과관계를 확립하지 않습니다. BERM은 실험실 동물과 야생 동물 모두에 영향을 미치는 유일한 인자이므로 EMF를 가장 간결한 설명으로 제시합니다.",
    whaleTitle: "회색고래 자연 실험",
    whaleP1: "[[ref:granger2020|Granger et al.(Current Biology 2020)]]은 미국 서부 해안에서 회색고래 좌초가 태양 RF 활동과 상관관계가 있음을 보여주었습니다. 태양이 더 많은 RF 노이즈를 방출하면 더 많은 고래가 좌초합니다 — 고래류가 내비게이션에 사용하는 CRY/RPM 자기수용 나침반의 교란과 일치합니다.",
    whaleP2: "센서의 분자적 정체성이 이제 알려져 있습니다. [[ref:cry_drosophila|Fedele et al.(PLoS Genetics 2014, PMC4256086)]]은 초파리에서 인간 CRY2가 EMF를 감지하지만 인간 CRY1은 감지하지 않음을 실증했습니다. Granger의 '고장난 수용체' 메커니즘은 특정 분자적 정체성을 가집니다: CRY2.",
    whaleP3: "세 개의 독립적 라인이 같은 원리에 수렴합니다. 첫째, [[ref:geomag_263|지자기 교란이 263개 미국 도시에서 심혈관 사망률을 증가시킵니다(Env. Health 2019)]]. 둘째, [[ref:solar_birth_11yr|인간 출생이 9개 지역에서 11년 태양 주기에 변조됩니다(Int. J. Biometeorol. 1991)]]. 메커니즘: 태양 RF → CRY/멜라토닌 → HPG축.",
    whaleM3Title: "예측 M3: 효과 크기의 시간적 감쇠",
    whaleM3: "인위적 RF 배경이 10년마다 상승함에 따라 자연적 태양 RF 변동의 상대적 기여는 줄어듭니다. Granger의 고래 좌초 효과 크기는 시간이 지남에 따라 감소해야 합니다. 병렬 예측: 출생률의 11년 주기성 진폭도 감소해야 합니다. 둘 다 동시에 감쇠하면 같은 메커니즘이 둘 다 설명합니다.",
    whaleNote: "Granger 2020은 태양 활동 지수와 좌초 수 사이의 관찰적 상관관계[C]입니다. 고래 위치에서 RF 노출을 측정하지 않으며 고래류에서 CRY2 메커니즘을 실증하지 않습니다. 예측 M3은 미테스트입니다.",
    salmonTitle: "연어: 내비게이션과 생식",
    salmonP1: "[[ref:putman2014|Putman et al. (Biol. Lett. 2014)]]은 철근 콘크리트 양식 인프라 근처에서 자란 연어가 지자기 내비게이션 장애를 보인다는 것을 보여주었습니다. 양식 물고기는 야생 물고기보다 내비게이션 능력이 현저히 떨어집니다. 메커니즘은 CRY/RPM 매개 자기수용 — BERM이 일주기 교란에 대해 식별하는 동일한 경로(B)입니다.",
    salmonP2: "[[ref:welch2021|Welch et al. (Fish Fish. 2021)]]은 태평양 연어 개체군의 수십 년에 걸친 붕괴를 기록했습니다. [[ref:santi2025|Santi et al. (2025)]]은 테스토스테론과 LH가 동시에 감소하고 있음을 보여주었습니다 — 'HPG 기능의 진행 중인 재설정.' 이것은 시상하부성이며 생식선성이 아닙니다. 연어에서 시상하부는 내비게이션(CRY 의존적 공간 정향)과 생식(GnRH → LH) 모두를 제어합니다.",
    salmonP3: "CatSper 칼슘 채널은 과활성화(난자 침투에 필요한 격렬한 운동성)에 필요한 정자 특이적 전압 개폐 칼슘 채널입니다. CatSper에는 9개의 EMF 민감 부위가 확인되었습니다. 철근 콘크리트 수로에서 ELF가 상승된 환경에서 자란 양식 연어는 CatSper 기능이 만성적으로 손상될 수 있습니다.",
    salmonM5Title: "예측 M5: 양식 연어 CatSper 진단",
    salmonM5: "양식 연어(철근 콘크리트 수로에서 사육)는 동일 개체군의 야생 연어에 비해 CatSper 전류가 약하고, 프로게스테론 주화성이 감소하고, 과활성화 역치가 높아야 합니다.",
    salmonNote: "Putman의 내비게이션 장애는 동료 심사를 거쳤습니다[C]. CatSper 예측(M5)은 BERM의 도출입니다 — 미테스트입니다. 연어 감소에는 EMF와 독립적인 강력한 대안적 설명(남획, 서식지 손실, 해양 온난화, 양식장의 바다이)도 있습니다.",
    gradientTitle: "종간 EMF 기울기",
    gradientP1: "종간 감소율을 EMF 노출 점수에 대해 플롯하면 명확한 기울기가 나타납니다: r = 0.84 (n = 7). 인간 정자 감소(2.64%/년)가 최고 EMF 노출에서, 비온혈종 말(0.46%/년)이 최저에서 나타납니다.",
    gradientP2: "이 기울기는 사회문화적 교란 요인을 제거합니다. 개는 강아지 대신 직업을 선택하지 않습니다. 말은 피임을 사용하지 않습니다. 홀스타인 젖소는 교육을 위해 번식을 미루지 않습니다. 그러나 모두 EMF 노출에 비례한 생식 매개변수 감소를 보여줍니다.",
    gradientP3: "음성 대조군이 메커니즘을 확인합니다: 홀스타인 젖소(EMF 점수 7)는 EMF 생물학적 활성을 보이지만(Rodriguez 2003) 육종 선택 압력이 인구 수준 감소 신호를 가리기 때문에 음성 대조군으로 분류됩니다.",
    gradientM4Title: "예측 M4: 해저 케이블 ELF와 수중 생식",
    gradientM4: "해저 전력 케이블의 ELF 장 영역(~35m 반경) 내에서 수생 생물의 생식 성공률은 케이블 원거리 지역보다 낮아야 합니다.",
    gradientTableHeaders: { species: "종", emfScore: "EMF 부하(0–1)", decline: "감소(%/년)", axis: "축" },
    gradientNote: "r = 0.84 기울기는 7개 데이터 포인트에서 계산되었습니다. n = 7에서 p값은 0.017이지만 자유도가 낮습니다. EMF 점수는 반정량적 추정치입니다. 예측 M4은 미테스트입니다.",
    threeAxisTitle: "3축 센티넬 아키텍처",
    threeAxisP1: "3개의 독립적 측정 축이 같은 결론에 수렴합니다 — EMF의 생물학적 활성이 육상, 수중, 기울기 차원에서 일관됩니다:",
    threeAxisLand: "육상 축: 현재 센티넬(꿀벌 → 개 → 말 → 인간) CSLI 지연 분석",
    threeAxisWater: "수중 축: 새로운 수생 센티넬(고래, 판새류, 연어, 성게) 물이 자연적으로 ELF와 RF를 분리",
    threeAxisGradient: "기울기 축: 종간 EMF-감소 상관관계(r = 0.84, 7종) 사회문화적 교란 요인 제거",
    threeAxisP2: "각 축은 독립적으로 도출되었습니다. 각각 다른 종, 다른 메커니즘, 다른 측정 방법을 사용합니다. 3개의 독립적 축이 우연히 같은 결론에 수렴할 확률은 개별 위양성률의 곱입니다.",

    sensitivityTitle: "BERM 감수성 계층",
    sensitivityDesc: "종간 EMF 감수성은 VGCC 생리학, CRY 의존성 및 환경 결합에 기반한 예측 가능한 순서를 따릅니다.",
    sensitivityOrder: [
      { species: "개구리", sensitivity: "최고", mechanism: "습한 피부 → 직접적 Ca²⁺ 환경 결합", decline: "~1987(레이어 1→2)", icon: "toad" },
      { species: "꿀벌", sensitivity: "매우 높음", mechanism: "CRY 전기수용 → 내비게이션 의존", decline: "~2006 CCD(레이어 2→3)", icon: "honeybee" },
      { species: "곤충", sensitivity: "높음", mechanism: "작은 신경계 → 높은 상대적 장 강도", decline: "[[ref:hallmann2017_v2|바이오매스 −75%(Krefeld, 27년)]]", icon: "honeybee" },
      { species: "조류", sensitivity: "중간", mechanism: "CRY 내비게이션(철새) + 곤충 먹이 공급 감소", decline: "참새 −60% 도시, −47% 농촌", icon: "bird" },
      { species: "포유류", sensitivity: "낮음(누적적)", mechanism: "건조한 피부, 큰 몸 → 낮은 상대적 장, 그러나 긴 수명 = 누적적", decline: "[[ref:klimentidis2010|Klimentidis: 24 집단, 8종 체중 증가]]", icon: "bat" },
    ],
    layerTimelineTitle: "센티널 × 기술 레이어 타임라인",
    layerTimelineDesc: "각 센티널 종의 감소 시작은 무작위 환경 변화가 아닌 특정 기술 레이어 전환에 해당합니다.",
    layerTimeline: [
      { year: "~1975", event: "참새 도시 감소 시작", layer: "레이어 1 도시에서 포화(전력망 밀도)" },
      { year: "~1987", event: "세계적 양서류 감소 시작", layer: "레이어 1→2: GSM 배포 시작" },
      { year: "~2000", event: "곤충 바이오매스 감소 가속", layer: "레이어 2→3: 기지국이 농촌에 도달" },
      { year: "~2006", event: "군집 붕괴 장애(꿀벌)", layer: "레이어 2→3 + 네오니코티노이드 시너지" },
      { year: "~2012", event: "[[ref:hallmann2017_v2|곤충 바이오매스 −75%(Krefeld)]]", layer: "레이어 3→4: LED 가로등 도입" },
      { year: "~2020", event: "조류 감소 세계적으로 가속", layer: "레이어 4→5: 5G + LED 포화" },
    ],
    newBeeEvidence: "2025년 새로운 증거: [[ref:mallinson2025_electric_pollution|Mallinson et al.(iScience, PMC12225925)]]은 AC 전기장이 꿀벌 착지를 71% 감소시킨다는 것을 보여주었습니다. [[ref:bumble_rf2025|Environmental Pollution 2025]]는 RF-EMF가 호박벌의 꽃 방문을 감소시킨다는 것을 보여주었습니다. Lupi 2021은 살충제 + EMF 조합이 가장 심각한 생화학적 및 행동적 변화를 생성하며 상호작용이 초가법적임을 실증했습니다.",
    contextTitle: "현재 기록이 말할 수 있는 것",
    context: [
      ["개", "공표된 단일 사이트 번식 프로그램 시계열은 일부 정액 엔드포인트의 시간 경과에 따른 변화를 보고합니다. 측정된 RF, 가정 기기 및 지역 엔드포인트 데이터가 부족하여 노출 기울기 테스트가 아닌 맥락적입니다."],
      ["가축", "공표된 인공수정 센터 요약은 유용한 비교 대상이 될 수 있지만, 번식 선발, 시설 관리, 영양, 사육 및 프로토콜 변경을 관찰해야 합니다."],
      ["종간 비교", "종은 세대 시간, 선발, 생식 생리학 및 데이터 시스템이 다릅니다. 공통의 시간적 패턴은 매칭된 장소-시간 FieldState 및 엔드포인트 데이터 없이는 공통의 장 메커니즘을 식별하지 않습니다."],
    ],
    nextTitle: "사용 가능한 센티널 연구에 필요한 것",
    next: ["관련 환경 및 시간 해상도에서 출처가 있는 측정된 FieldState.", "장소 간에 비교 가능하거나 명시적으로 모델링된 엔드포인트 정의 및 수집 프로토콜.", "사전 지정된 화학물질, 기후, 사육, 선발 및 질병 공변량.", "장 모델을 경쟁하는 인과적 설명과 비교하는 등록된 테스트."],
    link: "FieldState 측정 프로토콜 읽기",
    lindgrenFramework: "Lindgren 프레임워크",
    speciesHeader: "종",
    sensitivityHeader: "감수성",
    mechanismHeader: "메커니즘",
    declineHeader: "관찰된 감소",
    nextPageLabel: "다음",
    nextPageTitle: "생태학",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function SentinelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <header className="relative -mx-6 mt-0 mb-14 overflow-hidden rounded-b-2xl sm:mx-0 sm:mt-8 sm:rounded-2xl">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
          <Image
            src="/images/sentinel-species-hero.jpg"
            alt=""
            fill
            preload
            className="object-cover object-[68%_center] sm:object-[65%_center]"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf6eb]/95 via-[#faf6eb]/78 to-[#faf6eb]/10 sm:from-[#faf6eb]/94 sm:via-[#faf6eb]/58 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#40392b]/10 to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <h1 className="mb-4 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#2f2b22] sm:text-4xl lg:text-5xl">
                {d.title}
              </h1>
              <p className="text-base leading-relaxed text-[#5d5749] sm:text-lg">{d.subtitle}</p>
            </div>
          </div>
        </div>
      </header>
      <section className="mb-14"><FalsificationTestsV19 locale={locale} /></section>

      {/* CSLI empirical results */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.csliTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-6">
          <p><InlineReferenceText text={d.csliP1} locale={locale} /></p>
          <p>{d.csliP2}</p>
          <p>{d.csliP3}</p>
        </div>
        <p className="text-xs font-mono-num text-foreground-muted mb-6">{d.csliStats}</p>

        <div className="mb-6">
          <SentinelCascade locale={locale} />
        </div>

        <div className="mb-6">
          <SentinelCascadeTimeline locale={locale} />
        </div>

        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.csliNote}</p>
        </div>
      </section>

      {/* Varroa cascade */}
      <div id="pollination" />
      <VarroaCascade locale={locale} />

      {/* Nike radar spatial gradient */}
      <section id="birds" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.nikeTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <div className="flow-root">
            <SpeciesSilhouetteInset
              src="/icons/silhouettes/berm-migratory-bird-silhouette.png"
              variant="bird"
            />
            <p>{d.nikeText}</p>
          </div>
          <div className="my-6"><NikeBBSScatter locale={locale} /></div>
          <p>{d.nikePeakFieldText}</p>
          <div className="my-6"><PulseProfile locale={locale} /></div>
          <p className="text-xs leading-relaxed border-l-2 border-foreground-muted/20 pl-4">{d.nikeRichnessNote}</p>
          <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
            <p className="text-xs text-foreground-muted leading-relaxed">{d.nikeCounterText}</p>
          </div>
        </div>
      </section>

      {/* Frog inverted signal */}
      <section id="amphibians" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.frogTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <div className="flow-root">
            <SpeciesSilhouetteInset
              src="/icons/silhouettes/berm-common-toad-silhouette.png"
              variant="toad"
            />
            <p>{d.frogText}</p>
          </div>
          <p className="text-xs leading-relaxed border-l-2 border-foreground-muted/20 pl-4">{d.frogInterpretation}</p>
          <div className="mt-4 rounded-lg border border-card-border bg-card-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">{d.frogAggregateTitle}</p>
            <ul className="text-xs text-foreground-muted space-y-1 list-disc list-inside">
              {d.frogAggregate.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Aquatic Axis: Natural Channel Separator */}
      <section id="aquatic-axis" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.aquaticTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.aquaticP1}</p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold">{d.aquaticMediumHeader}</th>
                  <th className="text-left py-2 px-2 font-semibold">{d.aquaticFreqHeader}</th>
                  <th className="text-left py-2 px-2 font-semibold">{d.aquaticDepthHeader}</th>
                </tr>
              </thead>
              <tbody>
                {d.aquaticSkinDepth.map((row: { medium: string; freq: string; depth: string }, i: number) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 px-2 font-medium">{row.medium}</td>
                    <td className="py-2 px-2 font-mono-num">{row.freq}</td>
                    <td className="py-2 px-2 font-mono-num">{row.depth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p><InlineReferenceText text={d.aquaticP2} locale={locale} /></p>
          <p><InlineReferenceText text={d.aquaticP3} locale={locale} /></p>
          <p><InlineReferenceText text={d.aquaticP4} locale={locale} /></p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.aquaticNote}</p>
        </div>
      </section>

      {/* Bats: Lindecke 2026 */}
      <section id="bats" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.batTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <div className="flow-root">
            <SpeciesSilhouetteInset
              src="/icons/silhouettes/berm-bat-silhouette.png"
              variant="bat"
            />
            <p><InlineReferenceText text={d.batP1} locale={locale} /></p>
          </div>
          <p>{d.batP2}</p>
          <p><InlineReferenceText text={d.batP3} locale={locale} /></p>
        </div>
        <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent mb-2">
            {d.lindgrenFramework}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.batHighlight}</p>
        </div>
        <p className="text-xs text-foreground-muted font-mono-num mb-4">
          <StudyCitation referenceId="lindecke2026" locale={locale} label={d.batRef} />
        </p>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.batNote}</p>
        </div>
      </section>

      {/* Insects: LED vs sodium */}
      <section id="insects" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.insectTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <div className="flow-root">
            <SpeciesSilhouetteInset
              src="/icons/silhouettes/berm-aphid-silhouette.png"
              variant="aphid"
            />
            <p><InlineReferenceText text={d.insectP1} locale={locale} /></p>
          </div>
          <p><InlineReferenceText text={d.insectP2} locale={locale} /></p>
          <p>{d.insectP3}</p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.insectNote}</p>
        </div>
      </section>

      {/* COVID counter-result */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-confirmed font-semibold mb-2">{d.covidLabel}</p>
        <h2 className="editorial-section-heading mb-4">{d.covidTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.covidText}</p>
      </section>

      {/* Cross-species metabolic cascade */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4"><InlineReferenceText text={d.metabolicTitle} locale={locale} /></h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p><InlineReferenceText text={d.metabolicP1} locale={locale} /></p>
          <p>{d.metabolicP2}</p>
          <p>{d.metabolicP3}</p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed"><InlineReferenceText text={d.metabolicNote} locale={locale} /></p>
        </div>
      </section>

      {/* Gray Whale Natural Experiment */}
      <section id="gray-whale" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.whaleTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p><InlineReferenceText text={d.whaleP1} locale={locale} /></p>
          <p><InlineReferenceText text={d.whaleP2} locale={locale} /></p>
          <p><InlineReferenceText text={d.whaleP3} locale={locale} /></p>
        </div>
        <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent mb-2">{d.whaleM3Title}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.whaleM3}</p>
        </div>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.whaleNote}</p>
        </div>
      </section>

      {/* Salmon: Navigation and Reproduction */}
      <section id="salmon" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.salmonTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p><InlineReferenceText text={d.salmonP1} locale={locale} /></p>
          <p><InlineReferenceText text={d.salmonP2} locale={locale} /></p>
          <p>{d.salmonP3}</p>
        </div>
        <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent mb-2">{d.salmonM5Title}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.salmonM5}</p>
        </div>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.salmonNote}</p>
        </div>
      </section>

      {/* Cross-Species EMF Gradient */}
      <section id="emf-gradient" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.gradientTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.gradientP1}</p>
          <p>{d.gradientP2}</p>
          <p>{d.gradientP3}</p>
        </div>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold">{d.gradientTableHeaders.species}</th>
                <th className="text-left py-2 px-2 font-semibold">{d.gradientTableHeaders.emfScore}</th>
                <th className="text-left py-2 px-2 font-semibold">{d.gradientTableHeaders.decline}</th>
              </tr>
            </thead>
            <tbody>
              {GRADIENT_POINTS.map((row) => (
                <tr key={row.name} className="border-b border-border/50">
                  <td className="py-2 px-2 font-medium">{row.name}</td>
                  <td className="py-2 px-2 text-accent font-medium">{row.emf_burden.toFixed(2)}</td>
                  <td className="py-2 px-2">{row.reproductive_decline_pct.toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-foreground-muted mt-2">r = {GRADIENT_FIT.pearson_r}, r² = {GRADIENT_FIT.r_squared}, n = {GRADIENT_FIT.n}, p = {GRADIENT_FIT.p_value} — berm.diagnostics.cross_species_gradient</p>
        </div>

        <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent mb-2">{d.gradientM4Title}</p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.gradientM4}</p>
        </div>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.gradientNote}</p>
        </div>
      </section>

      {/* Three-Axis Architecture */}
      <section id="three-axis" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.threeAxisTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.threeAxisP1}</p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
            <TreePine className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-foreground-muted leading-relaxed">{d.threeAxisLand}</p>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
            <Navigation className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-foreground-muted leading-relaxed">{d.threeAxisWater}</p>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
            <TrendingDown className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-foreground-muted leading-relaxed">{d.threeAxisGradient}</p>
          </div>
        </div>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.threeAxisP2}</p>
      </section>

      {/* Sensitivity hierarchy */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.sensitivityTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.sensitivityDesc}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold">{d.speciesHeader}</th>
                <th className="text-left py-2 px-2 font-semibold">{d.sensitivityHeader}</th>
                <th className="text-left py-2 px-2 font-semibold">{d.mechanismHeader}</th>
                <th className="text-left py-2 px-2 font-semibold">{d.declineHeader}</th>
              </tr>
            </thead>
            <tbody>
              {d.sensitivityOrder.map((row: { species: string; sensitivity: string; mechanism: string; decline: string; icon: string }) => (
                <tr key={row.species} className="border-b border-border/50">
                  <td className="py-2 px-2 font-medium flex items-center gap-2">
                    <BermIcon name={row.icon as "toad" | "honeybee" | "bird" | "bat"} size={16} className="text-accent shrink-0" />
                    {row.species}
                  </td>
                  <td className="py-2 px-2 text-amber-500 font-medium">{row.sensitivity}</td>
                  <td className="py-2 px-2 text-foreground-muted">{row.mechanism}</td>
                  <td className="py-2 px-2 text-foreground-muted"><InlineReferenceText text={row.decline} locale={locale} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Layer timeline */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.layerTimelineTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.layerTimelineDesc}</p>
        <div className="space-y-3">
          {d.layerTimeline.map((row: { year: string; event: string; layer: string }) => (
            <div key={row.year} className="flex gap-4 text-sm">
              <span className="font-mono-num text-accent shrink-0 w-16">{row.year}</span>
              <div>
                <p className="font-medium"><InlineReferenceText text={row.event} locale={locale} /></p>
                <p className="text-xs text-foreground-muted">{row.layer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed"><InlineReferenceText text={d.newBeeEvidence} locale={locale} /></p>
        </div>
      </section>

      {/* What current records can say */}
      <section className="mb-14 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">{d.contextTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {d.context.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* What a usable sentinel study needs */}
      <section className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="text-xl font-semibold mb-3">{d.nextTitle}</h2>
        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed">
          {d.next.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="font-mono-num text-accent">{index + 1}.</span>{item}
            </li>
          ))}
        </ol>
        <Link href={`/${locale}/about/measurement`} className="inline-block mt-5 text-sm text-accent hover:underline">{d.link} →</Link>
      </section>

      <NextPageLink
        href={`/${locale}/ecology`}
        label={d.nextPageLabel}
        title={d.nextPageTitle}
        icon={Zap}
      />
    </div>
  );
}
