import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
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
    csliP1: "Lähdevarmennetussa 23 maan COLOSS-paneelissa mehiläispesien talvihäviön kasvu edeltää TFR:n laskua noin 2 vuodella: 20/23 maata osoittaa BERM-suuntaisen kuvion (yhdistetty maansisäinen r = −0,272, circular-shift p = 0,006, 8-viiveen Bonferroni p = 0,046). Signaali replikoituu kahdessa itsenäisessä TFR-tuotteessa ([[ref:world_bank_wdi_2024|Maailmanpankki]] ja [[ref:nations2024|WPP 2024]]).",
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
    insectP3: "Hyönteiset voivat olla suhteettoman herkkiä IF-kaistan altistuksille geometrisista syistä. Clarke ym. 2013 osoittivat, että hyönteisten kehot toimivat tehokkaina sähkömagneettisina antenneina — niiden pienet mitat luovat korkeita sisäisiä kenttäkonsentraatioita suhteessa kehon massaan. IF-taajuuksilla (20–300 kHz) indusoitu sähkökenttägradientti hyönteisen kehon (1–50 mm) poikki voi häiritä jänniteporteisia ionikanavia alhaisemmilla ulkoisilla kenttävoimakkuuksilla kuin suuremmilla organismeilla. LED-valaistut kaupalliset kasvihuoneet ovat erityisen keskittynyt IF-altistusympäristö: korkeatiheyksisiä LED-valaisimia hakkuriteholähteineen jatkuvasti käynnissä, altistaen pölyttäjiä koko niiden keruukierron ajan. Mallinson ym. 2025 dokumentoivat pölyttäjien muuttuneen aktiivisuuskuvion LED-valaistuissa kasvihuoneympäristöissä verrattuna tavanomaiseen valaistukseen.",
    insectNote: "Nämä tutkimukset mittasivat populaatiotason tuloksia, eivät yksilötason IF-EMF-altistusta. LED:n ja natriumin välinen ero on yhteensopiva IF-hypoteesin kanssa mutta ei sulje pois spektraalisia tai termisiä selityksiä. Kontrolloituja pelkän IF:n altistuskokeita ei ole tehty hyönteisillä.",

    covidTitle: "COVID-lockdown: informatiivinen vastatulos",
    covidText: "Lähdevarmennettu COLOSS-data ei näytä mehiläispesien paranemista COVID-lockdownien aikana: talvihäviö kasvoi 2,27 prosenttiyksikköä (24/35 maata paheni, p = 0,043). BBS-linnut myös laskivat 2,8–3,0 % vuosina 2020–22. Tämä on informatiivinen negatiivinen tulos: se osoittaa, että yksinkertainen 'lockdown → ambientin EMF ↓ → sentinellit paranevat' -ennuste ei päde, todennäköisesti koska kotitalouksien RF-liikenne kasvoi samalla kun ulkona liikkuminen väheni.",
    covidLabel: "Vastatulos",

    metabolicTitle: "Lajienvälinen metabolinen kaskadi: [[ref:klimentidis2010|Klimentidis 2011]]",
    metabolicP1: "[[ref:klimentidis2010|Klimentidis ym. 2011]] (Proc R Soc B) dokumentoi tilastollisesti merkitsevän painonnousun 24 populaatiossa 8 lajin poikki — mukaan lukien laboratorio­eläimet kontrolloiduilla ruokavalioilla — samoina vuosikymmeninä kuin ympäristön EMF-altistus kasvoi. Baltimoren villirottien, NIEHS:n laboratoriohiirien, kotikoirien ja kissojen painot nousivat rinnakkaisilla trajektoreilla. Todennäköisyys, että kaikki 24 populaatiota osoittaisivat positiivisia painotrendejä sattumalta, on alle 10⁻⁷.",
    metabolicP2: "Tämä löydös on BERM-retrodiktio (R1): malli ennustaa, että EMF:n aiheuttaman metabolisen häiriön pitäisi näkyä lajeissa, jotka jakavat jänniteportteiset ionikanavat, eikä ainoastaan ihmisillä, joilla ruokavalio ja elämäntapa sekoittavat signaalia. Laboratorion jyrsijät kontrolloiduilla ruokavalioilla ja villieläimet, jotka eivät altistu prosessoidun ruoan markkinoinnille, tarjoavat osittaisen kontrollin 'kaloriylijäämä'-selitykselle.",
    metabolicP3: "Metabolinen kaskadi kytkeytyy BERM:iin kahden itsenäisen reitin kautta. Ensinnäkin melatoniinisuppressio (CRY/RPM-reitti) häiritsee sirkadiaanista glukoosinsäätelyä — vuorotyöntekijöillä on 2–3-kertainen diabetesriski. Toiseksi VGCC-välitteinen Ca²⁺-dysregulaatio muuttaa insuliinin eritystä haiman β-soluista, jotka ovat kehon sähköisesti aktiivisimpia soluja. Molemmat reitit ennustavat lajienvälisen metabolisen häiriön missä tahansa sähköistetyssä ympäristössä.",
    metabolicNote: "[[ref:klimentidis2010|Klimentidis 2011]] on havainnointitutkimus, joka dokumentoi rinnakkaisia trendejä. Se ei mittaa EMF-altistusta eikä osoita kausaalisuutta. 'Yhteinen ympäristötekijä', jota tekijät esittävät hypoteesina, voisi olla EMF, endokriiniset häiritsijät, epigeneettiset muutokset tai mikrobiomin muutokset. BERM esittää EMF:n yksinkertaisimpana selityksenä, koska se on ainoa tekijä, joka vaikuttaa sekä laboratorio- että villieläimiin eri ympäristöissä.",

    sensitivityTitle: "BERM-herkkyyshierarkia",
    sensitivityDesc: "EMF-herkkyys lajien välillä noudattaa ennustettavaa järjestystä VGCC-fysiologian, CRY-riippuvuuden ja ympäristökytkennän perusteella. Hierarkia on johdettu mekanismista ja verifioitu havaittujen populaatiolaskujen aikajanoja vastaan.",
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
    newBeeEvidence: "Uusi 2025 evidenssi: [[ref:mallinson2025_electric_pollution|Mallinson ym. (iScience, PMC12225925)]] osoittivat AC-sähkökentän vähentävän mehiläisten laskeutumisia 71 %. Erikseen [[ref:bumble_rf2025|Environmental Pollution 2025]] osoitti RF-EMF:n vähentävän kimalaisten kukkavierailuja. Lupi 2021 osoitti, että yhdistetty pestisidi + EMF tuottaa vakavimmat biokemialliset ja käyttäytymismuutokset — interaktio on superadditiivinen.",

    contextTitle: "Mitä nykyiset tietueet voivat sanoa",
    context: [
      ["Koirat", "Julkaistu yhden jalostusohjelman aikasarja raportoi joidenkin siemennestepäätepisteiden muutoksia. Siitä puuttuu mitattu RF, kotilaitetieto ja alueellinen päätepistedata, joten se on kontekstia eikä altistusgradienttitesti."],
      ["Tuotantoeläimet", "Julkaistut keinosiemennyskeskusten yhteenvedot voivat olla hyödyllisiä vertailuja, mutta jalostusvalinta, aseman hallinta, ravinto, asuminen ja protokollamuutokset on havaittava. Matalan RF:n kontrolliasemaa ei päätellä ilman dosimetriaa."],
      ["Lajienvälinen vertailu", "Lajit eroavat sukupolviajassa, valinnassa, lisääntymisfysiologiassa ja datajärjestelmissä. Yhteinen ajallinen kuvio ei tunnista yhteistä kenttämekanismia ilman kohdistettua paikka–aika-FieldStatea ja päätepistedataa."],
    ],
    nextTitle: "Mitä käyttökelpoinen indikaattoritutkimus tarvitsee",
    next: ["Mitattu FieldState proveniensseineen relevantissa ympäristössä ja aikatasossa.", "Päätepistemääritelmät ja keruuprotokollat, jotka ovat vertailukelpoisia paikkojen välillä tai eksplisiittisesti mallinnettuja.", "Ennalta määritellyt kemikaali-, ilmasto-, kasvatus-, valinta- ja tautikovariaatit.", "Rekisteröity testi, joka vertaa kenttämallia kilpaileviin kausaalisiin selityksiin."],
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
