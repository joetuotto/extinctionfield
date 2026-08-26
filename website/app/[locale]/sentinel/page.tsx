import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Zap } from "lucide-react";
import { BermIcon } from "@/components/BermIcon";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { FalsificationTestsV19 } from "@/components/FalsificationTestsV19";
import { SentinelCascade } from "@/components/SentinelCascade";
import { SentinelCascadeTimeline } from "@/components/SentinelCascadeTimeline";
import { NikeBBSScatter } from "@/components/NikeBBSScatter";
import { PulseProfile } from "@/components/PulseProfile";
import { VarroaCascade } from "@/components/VarroaCascade";

const COPY = {
  en: {
    title: "Sentinel species: data readiness",
    subtitle: "Cross-species observations can motivate a registered test, but they cannot substitute for measured exposure, compatible endpoints and competing-cause data.",

    csliTitle: "Cross-Species Lag Signal: Empirical Results",
    csliP1: "In a source-verified 23-country COLOSS panel, bee colony winter loss increases precede TFR declines by approximately 2 years: 20/23 countries show the BERM-direction pattern (pooled within-country r = −0.272, circular-shift p = 0.006, 8-lag Bonferroni p = 0.046). The signal replicates across two independent TFR products (World Bank and WPP 2024).",
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
    batP1: "In May 2026, a team led by Oliver Lindecke published in Science the first experimental demonstration that radiofrequency electromagnetic noise disrupts a mammal's magnetic compass. Migratory soprano pipistrelle bats (Pipistrellus pygmaeus) were exposed to weak broadband RF noise (0.01–300 MHz) — at levels found in normal urban environments — for just 30 minutes during sunset. Control bats oriented normally toward their expected migratory direction. RF-exposed bats departed in random directions.",
    batP2: "The most unexpected finding was the duration of the effect. In previous studies on migratory birds, the magnetic compass recovered immediately after RF exposure ended. In bats, the disorientation persisted for more than two hours. The researchers concluded that electromagnetic pollution may affect animal behavior 'in more complex ways than previously thought,' and that the 'widely anticipated increase of electromagnetic pollution may further add to the effects of anthropogenic climate change.'",
    batP3: "This finding has three direct implications for the BERM framework. First, it extends the RPM/CRY compass disruption mechanism from birds (Engels 2014, Mouritsen 2014) to mammals — the first taxonomic class jump, published in a top-tier journal. Second, the hours-long disorientation provides a mechanistic basis for bat mortality at wind turbines: bats navigating near turbines with disrupted compasses would be at elevated collision risk. Third, the Science editors explicitly note that RF noise of this kind is 'produced by electronics, power lines, and even LED lights' — linking the finding directly to the lighting transition analysis.",
    batHighlight: "Soprano pipistrelles weigh approximately 6 grams. Their entire body is well within the near-field of Wi-Fi and mobile base station antennas. The RPM mechanism in bat cryptochrome operates identically to bird cryptochrome — the geometric susceptibility predicts that any mammal using a radical-pair compass will be disrupted by ambient RF at urban levels. The hours-long persistence suggests not just sensory masking but a deeper calibration failure — the bat's internal model of magnetic North is corrupted and does not self-correct quickly.",
    batRef: "Lindecke O et al. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "This study demonstrates RF-induced disorientation in bats. It does not study fertility, hormones, or cell biology. The BERM framework implications are model predictions, not conclusions of the original study.",

    insectTitle: "Insects: LED lighting and population decline",
    insectP1: "Boyes et al. 2021 (Science Advances) found that moth caterpillar abundance under LED street lights was 52% lower than in nearby unlit areas — compared to 41% lower under sodium lighting. The difference between LED and sodium is significant: sodium lamps are discharge lamps with minimal IF emissions; LED lamps contain switch-mode drivers emitting continuous 20–200 kHz fields.",
    insectP2: "While the study attributed the difference to light spectrum (white vs yellow), BERM's IF channel provides an alternative mechanism: the LED driver's IF emissions may directly affect caterpillar development through IFO-VGIC perturbation of voltage-gated ion channels. Pawson & Bader 2014 found LED traps captured 48% more insects than sodium, an effect independent of color temperature — suggesting a mechanism beyond visible spectrum.",
    insectP3: "Insects may be disproportionately susceptible to IF-band exposures for geometric reasons. Clarke et al. 2013 demonstrated that insect bodies act as efficient electromagnetic antennas — their small dimensions create high internal field concentrations relative to body mass. At IF frequencies (20–300 kHz), the induced electric field gradient across an insect body (1–50 mm) can perturb voltage-gated ion channels at lower external field strengths than required for larger organisms. LED-lit commercial greenhouses represent a concentrated IF exposure environment: high-density LED arrays with switch-mode drivers operating continuously, exposing pollinators throughout their foraging cycle. Mallinson et al. 2025 documented altered pollinator activity patterns in LED-lit greenhouse environments compared to conventional lighting.",
    insectNote: "These studies measured population-level outcomes, not individual IF-EMF exposure. The LED vs sodium difference is consistent with the IF hypothesis but does not exclude spectral or thermal explanations. Controlled IF-only exposure experiments have not been conducted on insects.",

    covidTitle: "COVID lockdown: an informative counter-result",
    covidText: "Source-verified COLOSS data does not show bee colony improvement during COVID lockdowns: winter loss increased by 2.27 percentage points (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. This is an informative negative result: it shows that the simple 'lockdown → ambient EMF ↓ → sentinels improve' prediction does not hold, likely because household RF traffic increased while outdoor activity decreased.",
    covidLabel: "Counter-result",

    metabolicTitle: "Cross-species metabolic cascade: Klimentidis 2011",
    metabolicP1: "Klimentidis et al. 2011 (Proc R Soc B) documented a statistically significant increase in body weight across 24 populations spanning 8 species — including laboratory animals with controlled diets — over the same decades that ambient EMF exposure increased. Feral rats in Baltimore, laboratory mice at NIEHS, domestic dogs, and domestic cats all gained weight on parallel trajectories. The probability that all 24 populations would show positive weight trends by chance alone is less than 10⁻⁷.",
    metabolicP2: "This finding is a BERM retrodiction (R1): the model predicts that EMF-induced metabolic disruption should be visible across species that share voltage-gated ion channels, not only in humans where diet and lifestyle confound the signal. Laboratory rodents on fixed diets and feral animals not exposed to processed food marketing provide partial controls for the 'caloric excess' explanation.",
    metabolicP3: "The metabolic cascade connects to BERM through two independent pathways. First, melatonin suppression (CRY/RPM pathway) disrupts circadian glucose regulation — shift workers have 2–3× diabetes risk. Second, VGCC-mediated Ca²⁺ dysregulation alters insulin secretion from pancreatic β-cells, which are among the most electrically active cells in the body. Both pathways predict cross-species metabolic disruption in any electrified environment.",
    metabolicNote: "Klimentidis 2011 is an observational study documenting parallel trends. It does not measure EMF exposure or establish causation. The 'common environmental factor' the authors hypothesize could be EMF, endocrine disruptors, epigenetic changes, or microbiome shifts. BERM claims EMF as the most parsimonious explanation because it is the only factor that affects both laboratory and feral animals in different environments.",

    sensitivityTitle: "BERM sensitivity hierarchy",
    sensitivityDesc: "EMF sensitivity across species follows a predictable order based on VGCC physiology, CRY dependence, and environmental coupling. The hierarchy is derived from mechanism and verified against observed population decline timelines.",
    sensitivityOrder: [
      { species: "Frogs", sensitivity: "Highest", mechanism: "Moist skin → direct Ca²⁺ environmental coupling", decline: "~1987 (layer 1→2)", icon: "toad" },
      { species: "Bees", sensitivity: "Very high", mechanism: "CRY electroreception → navigation-dependent", decline: "~2006 CCD (layer 2→3)", icon: "honeybee" },
      { species: "Insects", sensitivity: "High", mechanism: "Small nervous system → high relative field strength", decline: "−75% biomass (Krefeld, 27 yr)", icon: "honeybee" },
      { species: "Birds", sensitivity: "Moderate", mechanism: "CRY navigation (migratory) + insect food supply decline", decline: "Sparrows −60% urban, −47% rural", icon: "bird" },
      { species: "Mammals", sensitivity: "Lower (cumulative)", mechanism: "Dry skin, large body → lower relative field, but long lifespan = cumulative", decline: "Klimentidis: 24 populations, 8 species gaining weight", icon: "bat" },
    ],
    layerTimelineTitle: "Sentinel × technology layer timeline",
    layerTimelineDesc: "Each sentinel species' decline onset corresponds to a specific technology layer transition, not random environmental change.",
    layerTimeline: [
      { year: "~1975", event: "Sparrow urban decline begins", layer: "Layer 1 saturates in cities (power grid density)" },
      { year: "~1987", event: "Global amphibian decline begins", layer: "Layer 1→2: GSM rollout begins" },
      { year: "~2000", event: "Insect biomass decline accelerates", layer: "Layer 2→3: cell towers reach rural areas" },
      { year: "~2006", event: "Colony Collapse Disorder (bees)", layer: "Layer 2→3 + neonicotinoid synergy" },
      { year: "~2012", event: "Insect biomass −75% (Krefeld)", layer: "Layer 3→4: LED streetlight adoption" },
      { year: "~2020", event: "Bird decline accelerates globally", layer: "Layer 4→5: 5G + LED saturation" },
    ],
    newBeeEvidence: "New 2025 evidence: Mallinson et al. (iScience, PMC12225925) showed AC electric fields reduce bee landings by 71%. Separately, Environmental Pollution 2025 showed RF-EMF reduces bumblebee flower visitation. Lupi 2021 demonstrated that combined pesticide + EMF produces the most severe biochemical and behavioral alterations — the interaction is superadditive.",

    contextTitle: "What the current records can say",
    context: [
      ["Dogs", "A published single-site breeding-programme series reports changes in some semen endpoints over time. It lacks measured RF, household-device and regional endpoint data, so it is contextual rather than an exposure-gradient test."],
      ["Livestock", "Published artificial-insemination-centre summaries can be useful comparators, but breeding selection, station management, nutrition, housing and protocol changes must be observed. No low-RF control status is inferred without dosimetry."],
      ["Cross-species comparison", "Species differ in generation time, selection, reproductive physiology and data systems. A common temporal pattern does not identify a common field mechanism without matched place–time FieldState and endpoint data."],
    ],
    nextTitle: "What a usable sentinel study needs",
    next: ["Measured FieldState with provenance at the relevant environment and time resolution.", "Endpoint definitions and collection protocols comparable across locations or explicitly modelled.", "Pre-specified chemical, climate, husbandry, selection and disease covariates.", "A registered test that compares the field model with competing causal explanations."],
    link: "Read the FieldState measurement protocol",
  },
  fi: {
    title: "Indikaattorilajit: aineiston valmius",
    subtitle: "Lajienväliset havainnot voivat motivoida rekisteröidyn testin, mutta ne eivät korvaa mitattua altistusta, yhteensopivia päätepisteitä ja kilpailevien syiden dataa.",

    csliTitle: "Lajienvälinen viivesignaali: empiiriset tulokset",
    csliP1: "Lähdevarmennetussa 23 maan COLOSS-paneelissa mehiläispesien talvihäviön kasvu edeltää TFR:n laskua noin 2 vuodella: 20/23 maata osoittaa BERM-suuntaisen kuvion (yhdistetty maansisäinen r = −0,272, circular-shift p = 0,006, 8-viiveen Bonferroni p = 0,046). Signaali replikoituu kahdessa itsenäisessä TFR-tuotteessa (Maailmanpankki ja WPP 2024).",
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
    batP1: "Toukokuussa 2026 Oliver Lindecken johtama tutkimusryhmä julkaisi Sciencessa ensimmäisen kokeellisen osoituksen siitä, että radiotaajuinen sähkömagneettinen kohina häiritsee nisäkkään magneettikompassia. Muuttavia sopraanoyölepakoita (Pipistrellus pygmaeus) altistettiin heikkoille laajakaistaisille RF-kentille (0,01–300 MHz) — normaaleissa kaupunkiympäristöissä esiintyvillä tasoilla — vain 30 minuutin ajan auringonlaskun aikana. Kontrollilepakoiden suuntautuminen oli normaali. RF-altistetut lepakot lähtivät satunnaisiin suuntiin.",
    batP2: "Odottamattomin löydös oli vaikutuksen kesto. Aiemmissa muuttolintuihin kohdistuneissa tutkimuksissa magneettikompassi palautui välittömästi altistuksen päätyttyä. Lepakoilla desorientaatio kesti yli kaksi tuntia. Tutkijat päättelivät, että sähkömagneettinen saaste voi vaikuttaa eläinten käyttäytymiseen 'monimutkaisemmin kuin aiemmin ajateltiin' ja että 'laajalti ennustettu sähkömagneettisen saasteen kasvu voi edelleen lisätä ihmisen aiheuttaman ilmastonmuutoksen vaikutuksia.'",
    batP3: "Tällä löydöksellä on kolme suoraa merkitystä BERM-kehykselle. Ensinnäkin se laajentaa RPM/CRY-kompassihäiriömekanismin linnuista (Engels 2014, Mouritsen 2014) nisäkkäisiin — ensimmäinen taksonominen luokkahyppy, julkaistu huippujulkaisussa. Toiseksi tuntien kestävä desorientaatio tarjoaa mekanistisen perusteen lepakoiden tuulivoimakuolleisuudelle: turbiinien lähellä häiriintyneellä kompassilla navigoivien lepakoiden törmäysriski kasvaa. Kolmanneksi Sciencen toimittajat toteavat nimenomaisesti, että tällaista RF-kohinaa 'tuottavat elektroniikka, voimalinjat ja jopa LED-valot' — mikä yhdistää löydöksen suoraan valaistussiirtymäanalyysiin.",
    batHighlight: "Sopraanoyölepakko painaa noin 6 grammaa. Sen koko keho on hyvin Wi-Fi- ja matkapuhelintukiasema-antennien lähikentässä. RPM-mekanismi lepakkokryptokromissa toimii identtisesti lintukryptokromin kanssa — geometrinen herkkyys ennustaa, että mikä tahansa radikaaliparikompassia käyttävä nisäkäs häiriintyy kaupunkitason ambient-RF:stä. Tuntien kestävä vaikutus viittaa syvempään kalibraatiovirheeseen kuin pelkkä sensorinen peittyminen — lepakko menettää sisäisen mallinsa magneettisesta pohjoisesta eikä se korjaudu nopeasti.",
    batRef: "Lindecke O ym. (2026). Science 388: 977+. doi:10.1126/science.adq4418",
    batNote: "Tämä tutkimus osoittaa RF:n aiheuttaman desorientaation lepakoilla. Se ei tutki hedelmällisyyttä, hormoneja tai solubiologiaa. BERM-kehyksen tulkinnat ovat mallipohjisia ennusteita, eivät alkuperäisen tutkimuksen johtopäätöksiä.",

    insectTitle: "Hyönteiset: LED-valaistus ja populaatiolasku",
    insectP1: "Boyes ym. 2021 (Science Advances) havaitsivat, että yöperhosten toukkamäärä LED-katuvalaistuksen alla oli 52 % pienempi kuin läheisissä valaisemattomissa kohteissa — verrattuna 41 %:n vähenemiseen natriumvalaistuksen alla. Ero LED:n ja natriumin välillä on merkitsevä: natriumlamput ovat purkauslamppuja minimaalisella IF-emissiolla; LED-lamput sisältävät hakkuriteholähteitä, jotka tuottavat jatkuvaa 20–200 kHz kenttää.",
    insectP2: "Tutkimus yhdistää eron valospektriin (valkoinen vs keltainen), mutta BERM:n IF-kanava tarjoaa vaihtoehtoisen mekanismin: LED-ajurin IF-emissiot voivat suoraan vaikuttaa toukkien kehitykseen IFO-VGIC-häiriön kautta jänniteportetuissa ionikanavissa. Pawson & Bader 2014 havaitsivat LED-loukkujen pyydystäneen 48 % enemmän hyönteisiä kuin natriumlamput, vaikutuksen ollessa riippumaton värilämpötilasta — mikä viittaa näkyvän spektrin ulkopuoliseen mekanismiin.",
    insectP3: "Hyönteiset voivat olla suhteettoman herkkiä IF-kaistan altistuksille geometrisista syistä. Clarke ym. 2013 osoittivat, että hyönteisten kehot toimivat tehokkaina sähkömagneettisina antenneina — niiden pienet mitat luovat korkeita sisäisiä kenttäkonsentraatioita suhteessa kehon massaan. IF-taajuuksilla (20–300 kHz) indusoitu sähkökenttägradientti hyönteisen kehon (1–50 mm) poikki voi häiritä jänniteporteisia ionikanavia alhaisemmilla ulkoisilla kenttävoimakkuuksilla kuin suuremmilla organismeilla. LED-valaistut kaupalliset kasvihuoneet ovat erityisen keskittynyt IF-altistusympäristö: korkeatiheyksisiä LED-valaisimia hakkuriteholähteineen jatkuvasti käynnissä, altistaen pölyttäjiä koko niiden keruukierron ajan. Mallinson ym. 2025 dokumentoivat pölyttäjien muuttuneen aktiivisuuskuvion LED-valaistuissa kasvihuoneympäristöissä verrattuna tavanomaiseen valaistukseen.",
    insectNote: "Nämä tutkimukset mittasivat populaatiotason tuloksia, eivät yksilötason IF-EMF-altistusta. LED:n ja natriumin välinen ero on yhteensopiva IF-hypoteesin kanssa mutta ei sulje pois spektraalisia tai termisiä selityksiä. Kontrolloituja pelkän IF:n altistuskokeita ei ole tehty hyönteisillä.",

    covidTitle: "COVID-lockdown: informatiivinen vastatulos",
    covidText: "Lähdevarmennettu COLOSS-data ei näytä mehiläispesien paranemista COVID-lockdownien aikana: talvihäviö kasvoi 2,27 prosenttiyksikköä (24/35 maata paheni, p = 0,043). BBS-linnut myös laskivat 2,8–3,0 % vuosina 2020–22. Tämä on informatiivinen negatiivinen tulos: se osoittaa, että yksinkertainen 'lockdown → ambientin EMF ↓ → sentinellit paranevat' -ennuste ei päde, todennäköisesti koska kotitalouksien RF-liikenne kasvoi samalla kun ulkona liikkuminen väheni.",
    covidLabel: "Vastatulos",

    metabolicTitle: "Lajienvälinen metabolinen kaskadi: Klimentidis 2011",
    metabolicP1: "Klimentidis ym. 2011 (Proc R Soc B) dokumentoi tilastollisesti merkitsevän painonnousun 24 populaatiossa 8 lajin poikki — mukaan lukien laboratorio­eläimet kontrolloiduilla ruokavalioilla — samoina vuosikymmeninä kuin ympäristön EMF-altistus kasvoi. Baltimoren villirottien, NIEHS:n laboratoriohiirien, kotikoirien ja kissojen painot nousivat rinnakkaisilla trajektoreilla. Todennäköisyys, että kaikki 24 populaatiota osoittaisivat positiivisia painotrendejä sattumalta, on alle 10⁻⁷.",
    metabolicP2: "Tämä löydös on BERM-retrodiktio (R1): malli ennustaa, että EMF:n aiheuttaman metabolisen häiriön pitäisi näkyä lajeissa, jotka jakavat jänniteportteiset ionikanavat, eikä ainoastaan ihmisillä, joilla ruokavalio ja elämäntapa sekoittavat signaalia. Laboratorion jyrsijät kontrolloiduilla ruokavalioilla ja villieläimet, jotka eivät altistu prosessoidun ruoan markkinoinnille, tarjoavat osittaisen kontrollin 'kaloriylijäämä'-selitykselle.",
    metabolicP3: "Metabolinen kaskadi kytkeytyy BERM:iin kahden itsenäisen reitin kautta. Ensinnäkin melatoniinisuppressio (CRY/RPM-reitti) häiritsee sirkadiaanista glukoosinsäätelyä — vuorotyöntekijöillä on 2–3-kertainen diabetesriski. Toiseksi VGCC-välitteinen Ca²⁺-dysregulaatio muuttaa insuliinin eritystä haiman β-soluista, jotka ovat kehon sähköisesti aktiivisimpia soluja. Molemmat reitit ennustavat lajienvälisen metabolisen häiriön missä tahansa sähköistetyssä ympäristössä.",
    metabolicNote: "Klimentidis 2011 on havainnointitutkimus, joka dokumentoi rinnakkaisia trendejä. Se ei mittaa EMF-altistusta eikä osoita kausaalisuutta. 'Yhteinen ympäristötekijä', jota tekijät esittävät hypoteesina, voisi olla EMF, endokriiniset häiritsijät, epigeneettiset muutokset tai mikrobiomin muutokset. BERM esittää EMF:n yksinkertaisimpana selityksenä, koska se on ainoa tekijä, joka vaikuttaa sekä laboratorio- että villieläimiin eri ympäristöissä.",

    sensitivityTitle: "BERM-herkkyyshierarkia",
    sensitivityDesc: "EMF-herkkyys lajien välillä noudattaa ennustettavaa järjestystä VGCC-fysiologian, CRY-riippuvuuden ja ympäristökytkennän perusteella. Hierarkia on johdettu mekanismista ja verifioitu havaittujen populaatiolaskujen aikajanoja vastaan.",
    sensitivityOrder: [
      { species: "Sammakot", sensitivity: "Korkein", mechanism: "Kostea iho → suora Ca²⁺-ympäristökytkentä", decline: "~1987 (kerros 1→2)", icon: "toad" },
      { species: "Mehiläiset", sensitivity: "Erittäin korkea", mechanism: "CRY-elektroreseptio → navigaatioriippuvainen", decline: "~2006 CCD (kerros 2→3)", icon: "honeybee" },
      { species: "Hyönteiset", sensitivity: "Korkea", mechanism: "Pieni hermosto → korkea suhteellinen kenttävoimakkuus", decline: "−75 % biomassa (Krefeld, 27 v)", icon: "honeybee" },
      { species: "Linnut", sensitivity: "Kohtalainen", mechanism: "CRY-navigaatio (muuttolinnut) + hyönteisravinnon lasku", decline: "Varpuset −60 % kaupunki, −47 % maaseutu", icon: "bird" },
      { species: "Nisäkkäät", sensitivity: "Matalampi (kumulatiivinen)", mechanism: "Kuiva iho, suuri keho → matalampi suhteellinen kenttä, mutta pitkä elinikä = kumulaatio", decline: "Klimentidis: 24 populaatiota, 8 lajia lihoo", icon: "bat" },
    ],
    layerTimelineTitle: "Sentinel × teknologiakerros -aikajana",
    layerTimelineDesc: "Kunkin sentinel-lajin laskun alkuajankohta vastaa tiettyä teknologiakerrossiirtymää, ei satunnaista ympäristömuutosta.",
    layerTimeline: [
      { year: "~1975", event: "Varpusten kaupunkilasku alkaa", layer: "Kerros 1 saturoituu kaupungeissa (sähköverkon tiheys)" },
      { year: "~1987", event: "Globaali sammakkolasku alkaa", layer: "Kerros 1→2: GSM-käyttöönotto alkaa" },
      { year: "~2000", event: "Hyönteisbiomassalasku kiihtyy", layer: "Kerros 2→3: tukiasemat maaseudulle" },
      { year: "~2006", event: "Colony Collapse Disorder (mehiläiset)", layer: "Kerros 2→3 + neonikotinoidi-synergia" },
      { year: "~2012", event: "Hyönteisbiomassa −75 % (Krefeld)", layer: "Kerros 3→4: LED-katuvalojen käyttöönotto" },
      { year: "~2020", event: "Lintulasku kiihtyy globaalisti", layer: "Kerros 4→5: 5G + LED-saturaatio" },
    ],
    newBeeEvidence: "Uusi 2025 evidenssi: Mallinson ym. (iScience, PMC12225925) osoittivat AC-sähkökentän vähentävän mehiläisten laskeutumisia 71 %. Erikseen Environmental Pollution 2025 osoitti RF-EMF:n vähentävän kimalaisten kukkavierailuja. Lupi 2021 osoitti, että yhdistetty pestisidi + EMF tuottaa vakavimmat biokemialliset ja käyttäytymismuutokset — interaktio on superadditiivinen.",

    contextTitle: "Mitä nykyiset tietueet voivat sanoa",
    context: [
      ["Koirat", "Julkaistu yhden jalostusohjelman aikasarja raportoi joidenkin siemennestepäätepisteiden muutoksia. Siitä puuttuu mitattu RF, kotilaitetieto ja alueellinen päätepistedata, joten se on kontekstia eikä altistusgradienttitesti."],
      ["Tuotantoeläimet", "Julkaistut keinosiemennyskeskusten yhteenvedot voivat olla hyödyllisiä vertailuja, mutta jalostusvalinta, aseman hallinta, ravinto, asuminen ja protokollamuutokset on havaittava. Matalan RF:n kontrolliasemaa ei päätellä ilman dosimetriaa."],
      ["Lajienvälinen vertailu", "Lajit eroavat sukupolviajassa, valinnassa, lisääntymisfysiologiassa ja datajärjestelmissä. Yhteinen ajallinen kuvio ei tunnista yhteistä kenttämekanismia ilman kohdistettua paikka–aika-FieldStatea ja päätepistedataa."],
    ],
    nextTitle: "Mitä käyttökelpoinen indikaattoritutkimus tarvitsee",
    next: ["Mitattu FieldState proveniensseineen relevantissa ympäristössä ja aikatasossa.", "Päätepistemääritelmät ja keruuprotokollat, jotka ovat vertailukelpoisia paikkojen välillä tai eksplisiittisesti mallinnettuja.", "Ennalta määritellyt kemikaali-, ilmasto-, kasvatus-, valinta- ja tautikovariaatit.", "Rekisteröity testi, joka vertaa kenttämallia kilpaileviin kausaalisiin selityksiin."],
    link: "Lue FieldState-mittausprotokolla",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function SentinelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Leaf} title={d.title} subtitle={d.subtitle} />
      <section className="mb-14"><FalsificationTestsV19 locale={activeLocale} /></section>

      {/* CSLI empirical results */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.csliTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-6">
          <p>{d.csliP1}</p>
          <p>{d.csliP2}</p>
          <p>{d.csliP3}</p>
        </div>
        <p className="text-xs font-mono-num text-foreground-muted mb-6">{d.csliStats}</p>

        <div className="mb-6">
          <SentinelCascade locale={activeLocale} />
        </div>

        <div className="mb-6">
          <SentinelCascadeTimeline locale={activeLocale} />
        </div>

        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.csliNote}</p>
        </div>
      </section>

      {/* Varroa cascade */}
      <div id="pollination" />
      <VarroaCascade locale={activeLocale} />

      {/* Nike radar spatial gradient */}
      <section id="birds" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4 flex items-center gap-2"><BermIcon name="bird" size={28} className="text-accent shrink-0" />{d.nikeTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.nikeText}</p>
          <div className="my-6"><NikeBBSScatter locale={activeLocale} /></div>
          <p>{d.nikePeakFieldText}</p>
          <div className="my-6"><PulseProfile locale={activeLocale} /></div>
          <p className="text-xs leading-relaxed border-l-2 border-foreground-muted/20 pl-4">{d.nikeRichnessNote}</p>
          <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
            <p className="text-xs text-foreground-muted leading-relaxed">{d.nikeCounterText}</p>
          </div>
        </div>
      </section>

      {/* Frog inverted signal */}
      <section id="amphibians" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4 flex items-center gap-2"><BermIcon name="toad" size={28} className="text-accent shrink-0" />{d.frogTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.frogText}</p>
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
        <h2 className="editorial-section-heading mb-4 flex items-center gap-2"><BermIcon name="bat" size={28} className="text-accent shrink-0" />{d.batTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.batP1}</p>
          <p>{d.batP2}</p>
          <p>{d.batP3}</p>
        </div>
        <div className="my-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs font-semibold text-accent mb-2">
            {activeLocale === "fi" ? "Lindgren-kehys" : "Lindgren Framework"}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.batHighlight}</p>
        </div>
        <p className="text-xs text-foreground-muted font-mono-num mb-4">{d.batRef}</p>
        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.batNote}</p>
        </div>
      </section>

      {/* Insects: LED vs sodium */}
      <section id="insects" className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4 flex items-center gap-2"><BermIcon name="honeybee" size={28} className="text-accent shrink-0" />{d.insectTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.insectP1}</p>
          <p>{d.insectP2}</p>
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
        <h2 className="editorial-section-heading mb-4">{d.metabolicTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.metabolicP1}</p>
          <p>{d.metabolicP2}</p>
          <p>{d.metabolicP3}</p>
        </div>
        <div className="mt-4 rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.metabolicNote}</p>
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
                <th className="text-left py-2 px-2 font-semibold">{activeLocale === "fi" ? "Laji" : "Species"}</th>
                <th className="text-left py-2 px-2 font-semibold">{activeLocale === "fi" ? "Herkkyys" : "Sensitivity"}</th>
                <th className="text-left py-2 px-2 font-semibold">{activeLocale === "fi" ? "Mekanismi" : "Mechanism"}</th>
                <th className="text-left py-2 px-2 font-semibold">{activeLocale === "fi" ? "Havaittu lasku" : "Observed decline"}</th>
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
                  <td className="py-2 px-2 text-foreground-muted">{row.decline}</td>
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
                <p className="font-medium">{row.event}</p>
                <p className="text-xs text-foreground-muted">{row.layer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.newBeeEvidence}</p>
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
        <Link href={`/${activeLocale}/about/measurement`} className="inline-block mt-5 text-sm text-accent hover:underline">{d.link} →</Link>
      </section>

      <NextPageLink
        href={`/${activeLocale}/ecology`}
        label={activeLocale === "fi" ? "Seuraavaksi" : "Next"}
        title={activeLocale === "fi" ? "Ekologia" : "Ecology"}
        icon={Zap}
      />
    </div>
  );
}
