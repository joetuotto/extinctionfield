import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Epistemology",
    subtitle:
      "What kind of scientific claim is BERM? This page separates derived structure, direct component evidence, composed convergence and open cross-scale bridges using falsifiability and research-program criteria.",
    epistapegeLink: "See how BERM models structural non-detection in Epistapege",
    cautionText:
      "This page does not claim BERM is proven. It applies standard epistemological criteria — consilience, falsifiability, progressive vs. degenerative research programs — to assess where the model stands and what evidence would be needed to advance or destroy it.",

    lakatosTitle: "What makes a theory scientific?",
    lakatosLead: "Karl Popper argued that a theory is scientific if and only if it is falsifiable. Imre Lakatos refined this: individual experiments can't kill a research program — what matters is whether the program is PROGRESSIVE (generating verified predictions) or DEGENERATIVE (only accommodating known facts post hoc).",
    lakatosPoints: [
      { criterion: "Falsifiability (Popper)", description: "The theory must specify conditions under which it would be destroyed", bermStatus: "BERM specifies four falsification tiers, from model collapse (ETH nimodipine-5G) to clinical irrelevance (EMF reduction shows no benefit)" },
      { criterion: "Novel predictions (Lakatos)", description: "The theory must predict facts BEFORE they are observed — not just explain known ones", bermStatus: "BERM predicted CACNA1C genotype modulation ([[ref:sousouri2025|Sousouri 2025]] confirmed), ELF-priming VGCC expression ([[ref:sun2016_elf_vgcc|Sun 2016]] confirmed), pulse modulation matters more than SAR ([[ref:lopez_martin_2009|López-Martín 2009]] confirmed)" },
      { criterion: "Excess empirical content", description: "Verified predictions must reveal MORE than the theory specified", bermStatus: "Each verification produced unexpected content: [[ref:sousouri2025|Sousouri]] found both sleep and wake effects; [[ref:lopez_martin_2009|López-Martín]] found pulse-modulation specificity; [[ref:sun2016_elf_vgcc|Sun]] found dramatic Ca²⁺ increase at 8-10 days" },
      { criterion: "Progressive problem shift", description: "The research program consistently generates new testable predictions from each discovery", bermStatus: "Current count: 30+ locked predictions across TFR, modulome, SIDS, neuro, metal, chain, T-type categories" },
    ],

    consilienceTitle: "Consilience: independent evidence converging",
    consilienceLead: "William Whewell coined 'consilience' to describe the strongest form of confirmation: when evidence from INDEPENDENT fields, gathered by different researchers using different methods, all converge on the same conclusion. This is what distinguishes evolution from astrology — both 'explain' observations, but only evolution exhibits consilience.",
    consilienceLevels: [
      {
        level: "Strong consilience",
        color: "green",
        examples: [
          "Theory premise (Lindgren 2025 metric) ↔ derived χ_geo and conditional response operator [tissue kernel open] ↔ pharmacological Ca²⁺ evidence",
          "Genetics ([[ref:sousouri2025|CACNA1C, Sousouri 2025, ETH Zürich double-blind]]) ↔ Experimental ([[ref:lopez_martin_2006|López-Martín seizures]])",
          "Epidemiology ([[ref:klimentidis2010|Klimentidis 8-species obesity, p=10⁻⁷]]) ↔ Pathology (SIDS brainstem 5-HT deficiency)",
          "Comparative biology (sentinel species decline) ↔ Clinical (neonatal Q → ∞ prediction)",
        ],
      },
      {
        level: "Moderate consilience",
        color: "blue",
        examples: [
          "ELF-priming mechanism ([[ref:sun2016_elf_vgcc|Sun 2016]]) ↔ Gabapentin blocks it ([[ref:eroglu_2009_cell|Eroglu 2009 Cell]]) ↔ Gabapentin prescriptions track grid density",
          "PGC ↔ melatonin (r=0.569) ↔ Pinealectomy → arrhythmias ↔ Shiftwork cancer ([[ref:iarc_2a_shift|IARC 2A]])",
          "Sleep deprivation → epileptiform activity (clinical) ↔ EMF → melatonin↓ (animal) ↔ GABA maturation timeline (neonatal)",
        ],
      },
      {
        level: "Weak consilience (universality risk)",
        color: "amber",
        examples: [
          "Ca²⁺ is ubiquitous — it appears in virtually every physiological process",
          "'25 epidemics with one denominator' may partly reflect Ca²⁺'s universal role rather than specific EMF causation",
          "Some convergences may be trivially true rather than meaningfully confirmatory",
          "This is the model's PRIMARY epistemic risk — it must be distinguished from noise",
        ],
      },
    ],

    falsificationTitle: "Four tiers of falsification",
    falsificationLead: "A progressive research program specifies what would destroy it — not as a formality, but as a genuine commitment to empirical adjudication. BERM identifies four levels, from complete model collapse to clinical irrelevance.",
    falsificationTiers: [
      {
        level: "LEVEL 1 — Model collapse",
        test: "ETH Zürich nimodipine-5G: L-type Ca²⁺ blocker does NOT prevent EMF sleep effects",
        consequence: "VGCC is not the primary EMF target → the entire Ca²⁺ cascade collapses → BERM loses its core mechanism",
        severity: "Terminal — no recovery possible",
      },
      {
        level: "LEVEL 2 — Environmental factor eliminated",
        test: "Amish communities show identical chronic disease trends to mainstream US population",
        consequence: "If low-EMF populations aren't healthier, EMF is not a significant driver → BERM identifies correct mechanisms but wrong environmental trigger",
        severity: "Severe — mechanism survives but clinical thesis dies",
      },
      {
        level: "LEVEL 3 — Key experiment fails",
        test: "[[ref:lopez_martin_2006|López-Martín]] replication: picrotoxin + GSM 900 MHz does NOT produce seizures",
        consequence: "The only direct experimental evidence for subthreshold EMF × GABAergic interaction disappears → key prediction unconfirmed",
        severity: "Significant — weakens experimental basis but doesn't eliminate mechanistic or genetic evidence",
      },
      {
        level: "LEVEL 4 — Clinical irrelevance",
        test: "Comprehensive EMF reduction intervention shows NO health benefit in symptomatic subjects",
        consequence: "Model may be mechanistically correct but clinically meaningless → accurate but not actionable",
        severity: "Moderate — mechanistic truth without practical value",
      },
    ],

    analogyTitle: "The evolution theory analogy",
    analogyLead: "BERM shares structural features with the theory of evolution by natural selection — both are generative mechanisms whose power lies in constraining what SHOULD be found before looking.",
    analogyRows: [
      { feature: "Generative mechanism", berm: "EMF → VGCC → Ca²⁺ → cascades", evolution: "Variation → selection → adaptation" },
      { feature: "Predicts before observing", berm: "Predicted CACNA1C modulation before [[ref:sousouri2025|Sousouri 2025]]", evolution: "Predicted intermediate fossils before Tiktaalik" },
      { feature: "Constrains the search space", berm: "Any effective treatment must target Ca²⁺ cascade", evolution: "Any homologous structure must share developmental genes" },
      { feature: "Multi-level convergence", berm: "Physics → molecular → cellular → organ → organism → population", evolution: "Molecular → cellular → organism → species → ecosystem" },
      { feature: "Falsifiable predictions", berm: "30+ locked, testable predictions", evolution: "\"Rabbit in the Precambrian\" and thousands of others" },
      { feature: "Excess empirical content", berm: "Each verification reveals MORE than predicted", evolution: "Each fossil/gene discovery reveals unexpected connections" },
    ],
    analogyCritical: "CRITICAL DIFFERENCE: Evolution has INDEPENDENT verification via DNA sequencing — an entirely different methodology that confirms the same phylogenies predicted by morphology, paleontology, and biogeography. BERM lacks this second, independent verification method. The single most important missing piece is INTERVENTIONAL evidence: demonstrate that reducing EMF exposure produces measurable health improvement in humans. Without this, BERM remains in the zone between 'mechanistically compelling' and 'clinically proven'.",

    strengthsTitle: "What BERM gets right",
    strengths: [
      "Generates verified predictions before the evidence is gathered (progressive, not accommodative)",
      "Every effective treatment for BERM-predicted conditions targets the Ca²⁺ cascade (pharmacological convergence)",
      "Genetic evidence ([[ref:sousouri2025|CACNA1C → EMF response]]) independently confirms the core mechanism",
      "Multi-level consilience from quantum physics to population epidemiology",
      "Specifies clear falsification conditions at four severity levels",
      "Produces excess empirical content — each verification reveals more than was predicted",
    ],

    weaknessesTitle: "What BERM still lacks",
    weaknesses: [
      "No decisive same-protocol intervention joining measured exposure reduction to the predicted human endpoint",
      "The universality of Ca²⁺ creates false positive risk — some 'convergences' may be trivial",
      "Several decisive bridges remain open, including the L2 tissue kernel, organ transfer, CatSper and population calibration",
      "Population-level epidemiology is correlational, not causal",
      "No independent verification method (equivalent to DNA sequencing for evolution)",
      "Industry-funded studies consistently find no effect, creating a contested evidence landscape",
    ],

    verdictTitle: "Epistemic verdict",
    verdictText: "BERM is a generative and falsifiable research programme, not a proven theory. Its strongest present feature is component-level convergence across physics, cell biology, endocrinology and population observations. Its central weakness is that these components have not yet been joined by a calibrated, same-protocol physical-input → tissue-response → human-endpoint intervention. A blocker experiment can test one proposed mediator under its protocol; it cannot by itself validate or collapse every BERM branch.",
    verdictCTA: "Inspect the component evidence and open bridges →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "Allocation of evidential burden",
    burdenLead: "The component evidence narrows the remaining tests, but it does not reverse the burden of proof for the unmeasured cross-scale bridges.",
    burdenBefore: "A global claim such as 'EMF causes disease' is too underspecified for a multistep mechanism. Exposure protocol, state variables, mediator and endpoint must be fixed before a causal test is interpretable.",
    burdenAfter: "BERM framing: identify which transition is being tested, preserve its protocol and state variables, and compare the full causal graph against alternatives. Support for neighbouring components cannot substitute for the missing transition.",
    burdenSteps: [
      { step: "1. Theory boundary explicit", detail: "Lindgren's 2025 metric is the premise. χ_geo is a derived geometric coordinate and the formal L2 response shape is conditional on explicit coupling assumptions; tissue kernels remain uncalibrated. [[ref:tang2024|Tang 2024]] is separate S4 evidence, not a calibration of that bridge." },
      { step: "2. Biochemistry verified", detail: "VGCC → Ca²⁺ → CaM → CaMKII → multiple cascades — basic biochemistry, textbook level" },
      { step: "3. Pharmacology converges", detail: "Every effective treatment targets a Ca²⁺ cascade component — ethosuximide, gabapentin, verapamil, melatonin, lithium, bumetanide" },
      { step: "4. Genetics confirms", detail: "CACNA1C genotype modulates EMF response ([[ref:sousouri2025|Sousouri 2025]] RCT). CaMKII mutations produce BERM-predicted phenotypes ([[ref:kury2017_camk2|Küry 2017]])" },
      { step: "5. Intermediate layers verified", detail: "BBB, BAT, HPA axis, β-cell, hypothalamus, cortisol-hippocampus, Leydig cell, mast cell — each independently confirmed" },
      { step: "6. Epidemiology consistent", detail: "54-country R²=0.851, [[ref:klimentidis2010|Klimentidis 8-species]] (p=10⁻⁷), Amish/Mennonite data — consistent across multiple designs" },
    ],
    burdenConclusion: "BERM is a linked, falsifiable hypothesis with evidence of different strength at different nodes, not a fully verified sequence. The L2 operator form is conditionally derived under explicit coupling and response assumptions, while its tissue kernel, sign, lag and calibration are unresolved; testing them requires matched physical inputs and biological endpoints rather than treating support elsewhere in the chain as proof.",

    iarcTitle: "The IARC 2A Precedent",
    iarcLead: "[[ref:iarc_2a_shift|IARC classifies shift work involving circadian disruption as Group 2A]] — 'probably carcinogenic to humans.' The proposed mechanism is melatonin suppression. BERM identifies the same mechanism through a different exposure route.",
    iarcPoints: [
      "IARC classifies shift work involving circadian disruption as Group 2A (probably carcinogenic)",
      "The proposed mechanism: shift work → melatonin suppression → hormone-dependent cancer risk↑",
      "BERM connection: EMF → melatonin suppression is the SAME mechanism (VK3: PGC → melatonin↓)",
      "If IARC accepts melatonin suppression via circadian disruption as 2A-level evidence for cancer, then EMF → melatonin suppression should carry equal weight",
      "This is not BERM speculation — it is applying IARC's own logic consistently",
    ],
    iarcStats: [
      { label: "Night shift workers — breast cancer", value: "OR 2.34" },
      { label: "High-intensity night work — breast cancer", value: "OR 2.66" },
    ],
    iarcQuestion: "Key question: why is circadian disruption via shift work classified as 2A, but circadian disruption via EMF remains at only 2B?",

    pemfTitle: "The PEMF Paradox: When EMF Heals",
    pemfLead: "[[ref:pemf_bone_fda_review_2020|Pulsed electromagnetic field (PEMF) therapy is FDA-approved for bone fracture non-union]]. BERM proposes parameter-dependent hormesis as one way to reconcile therapeutic protocols with reports of harm; this is a testable χ-closure hypothesis, not a result derived from Lindgren geometry.",
    pemfParadox: [
      "PEMF promotes bone growth, reduces osteoclast activity, and decreases inflammation",
      "This seems to CONTRADICT BERM: 'if EMF is harmful, why does PEMF heal?'",
    ],
    pemfResolutionTitle: "BERM proposal: parameter-dependent hormesis",
    pemfResolution: [
      "Ca²⁺ channels mediate BOTH therapeutic and harmful effects",
      "Controlled parameters (frequency, intensity, duration) → beneficial Ca²⁺ transient",
      "Chronic uncontrolled exposure → sustained Ca²⁺ overload",
      "This is the SAME as any drug: therapeutic dose vs. toxic dose",
    ],
    pemfConclusion: [
      "BERM does NOT predict 'all EMF is harmful'",
      "BERM predicts: outcome depends on Ca²⁺ dynamics (dose, timing, cell type)",
      "PEMF validation: if PEMF works THROUGH Ca²⁺ channels, this CONFIRMS that EMF affects biology through Ca²⁺ channels — which is BERM's core claim",
      "The paradox dissolves: PEMF is not an exception to BERM, it is a confirmation",
    ],
    zapffeTitle: "Zapffe Recursion: The Model Predicts Its Own Rejection",
    zapffeLead: "Peter Wessel Zapffe (1933) identified four mechanisms by which consciousness suppresses intolerable knowledge: isolation (compartmentalization), anchoring (value fixation), distraction (attention displacement), sublimation (aesthetic reframing). BERM predicts that its own reception will follow these mechanisms — not because audiences are irrational, but because EMF-degraded cognitive substrates produce these responses automatically.",
    zapffeItems: [
      { mechanism: "Isolation", score: "0.544", desc: "Urban cognitive complexity is below the model evaluation threshold (0.70). The model requires multi-causal reasoning across physics, biology, endocrinology, and epidemiology. The urban substrate cannot sustain this integration." },
      { mechanism: "Anchoring", score: "0.714", desc: "Group conformity increases with EMF exposure. Institutional consensus functions as an anchor — departing from it triggers cortisol-mediated threat response, not rational evaluation." },
      { mechanism: "Distraction", score: "0.443", desc: "Novelty-seeking declines with DA reduction. The capacity to engage with paradigm-challenging information requires DA-driven exploratory behavior that the urban environment suppresses." },
      { mechanism: "Sublimation", score: "0.311", desc: "Empathy scope narrows under EMF stress. Abstract concern for species-level consequences requires wide empathy scope that urban biomarker profiles cannot support." },
    ],
    zapffeConclusion: "The recursion is complete: the model predicts that urban populations lack the cognitive substrate to evaluate the model. This is not an unfalsifiable escape clause — it generates a testable prediction: Amish and rural populations (cognitive complexity > 0.70) should evaluate the model more accurately than urban populations, independent of education level.",

    paradigmTitle: "Paradigm Blindness: Four Frameworks That Cannot See EMF",
    paradigmLead: "Each dominant intellectual framework has structural reasons to reject biological determinism of political orientation. These are not arguments — they are consequences of the framework's axioms.",
    paradigmItems: [
      { framework: "Social Constructivism", blind: "All categories are socially constructed → biological substrates cannot determine social outcomes. The framework cannot accommodate a mechanism that operates below the level of social construction.", strategy: "Reclassify as 'biological essentialism' — a category that is rejected by axiom, not by evidence." },
      { framework: "Progressive Liberalism", blind: "Individual autonomy is the foundational premise. If political orientation is a phenotypic expression of biomarker state, autonomy is an illusion produced by the endocrine system, not a property of the agent.", strategy: "Invoke 'determinism' as a reductio ad absurdum. The model is rejected not because it is wrong but because accepting it would collapse the framework." },
      { framework: "Marxism", blind: "Material conditions determine consciousness — but the material conditions are economic, not biological. EMF as a material determinant would subsume class analysis under biochemistry.", strategy: "Classify as 'biologism' — a capitalist mystification that obscures class relations." },
      { framework: "Traditionalism", blind: "Values are transcendent or divinely ordained. If they are downstream of testosterone and cortisol, the sacred order is an endocrine artifact.", strategy: "Reject as materialist reductionism. The framework requires that values precede biology, not follow from it." },
    ],
    paradigmConclusion: "No dominant framework can assimilate this model without self-destruction. This is not a flaw in the model — it is a prediction. The model predicts that it will be rejected by all established paradigms, each for reasons internal to the paradigm rather than based on the evidence.",

    contingencyTitle: "Political Contingency",
    contingencyLead: "Democracy presupposes that political orientation is a product of rational deliberation among autonomous agents. The model predicts it is a phenotypic expression of biomarker state modulated by EMF environment.",
    contingencyItems: [
      { claim: "Values are chosen", model: "Values are produced by endocrine state. T level predicts redistribution preference (Petersen 2013, N=12k). OXT level predicts in-group/out-group boundary (De Dreu 2011, N=280)." },
      { claim: "Political debate changes minds", model: "Debate changes cortisol levels. The 'persuaded' voter has not changed values — their threat response has been activated or suppressed." },
      { claim: "Education produces better citizens", model: "Urban education occurs in high-EMF environments. Cognitive complexity at 0.544 (urban) vs 0.964 (Amish). Education adds information to a degraded substrate." },
      { claim: "Polarization is a failure of dialogue", model: "Polarization index 0.237 is a direct function of the EMF gradient between urban and rural environments. The same genome produces different politics based on postal code." },
    ],
    contingencyConclusion: "If even 20% of political orientation is determined by EMF-modulated biomarker state, then 20% of political conflict is a medical problem, not a political one. This is the fraction that is fixable without political dialogue.",

    predictionsTitle: "Testable Predictions",
    predictionItems: [
      "Amish populations evaluate novel scientific frameworks more accurately than urban populations matched for IQ and education — because cognitive complexity (0.964) exceeds the model evaluation threshold (0.70).",
      "Urban-to-rural migration produces measurable political orientation shift within 12–24 months — tracking biomarker recovery, not social influence.",
      "Testosterone supplementation in urban males shifts political orientation toward hierarchy acceptance and reduced redistribution preference — replicating Alogaily et al. 2025 (N=136) in a larger sample.",
      "Melatonin supplementation improves time preference and reduces threat sensitivity — independent of sleep quality gains.",
    ],

    testLabel: "Test",
    consequenceLabel: "Consequence",
    severityLabel: "Severity",
    featureLabel: "Feature",
    evolutionLabel: "Evolution",
    beforeLabel: "Before",
    afterLabel: "After",
  },

  fi: {
    title: "Epistemologia",
    subtitle:
      "Millainen tieteellinen väite BERM on? Sivu erottaa johdetun rakenteen, suoran komponenttinäytön, koostetun konvergenssin ja avoimet skaalasillat falsifioitavuuden ja tutkimusohjelmakriteerien avulla.",
    epistapegeLink: "Katso, miten BERM mallintaa rakenteellisen havaitsemattomuuden Epistapege-haarassa",
    cautionText:
      "Tämä sivu ei väitä BERM:n olevan todistettu. Se soveltaa vakioepistemologisia kriteereitä — konsilienssia, falsifioitavuutta, progressiivisia vs. degeneratiivisia tutkimusohjelmia — arvioidakseen missä malli on ja mitä näyttöä tarvittaisiin sen edistämiseksi tai tuhoamiseksi.",

    lakatosTitle: "Mikä tekee teoriasta tieteellisen?",
    lakatosLead: "Karl Popper argumentoi, että teoria on tieteellinen jos ja vain jos se on falsifioitavissa. Imre Lakatos tarkensi: yksittäiset kokeet eivät voi tappaa tutkimusohjelmaa — tärkeää on, onko ohjelma PROGRESSIIVINEN (tuottaa todennettuja ennusteita) vai DEGENERATIIVINEN (vain sovittaa tunnettuja faktoja jälkikäteen).",
    lakatosPoints: [
      { criterion: "Falsifioitavuus (Popper)", description: "Teorian on määriteltävä olosuhteet joissa se tuhoutuisi", bermStatus: "BERM määrittelee neljä falsifikaatiotasoa, mallin romahduksesta (ETH nimodipiini-5G) kliiniseen merkityksettömyyteen (EMF-vähennys ei hyödytä)" },
      { criterion: "Uudet ennusteet (Lakatos)", description: "Teorian on ennustettava faktoja ENNEN niiden havainnointia — ei vain selitettävä tunnettuja", bermStatus: "BERM ennusti CACNA1C-genotyypin modulaation ([[ref:sousouri2025|Sousouri 2025]] vahvisti), ELF-priming VGCC-ekspression ([[ref:sun2016_elf_vgcc|Sun 2016]] vahvisti), pulssimodulaatio tärkeämpi kuin SAR ([[ref:lopez_martin_2009|López-Martín 2009]] vahvisti)" },
      { criterion: "Ylijäämäinen empiirinen sisältö", description: "Todennettujen ennusteiden on paljastettava ENEMMÄN kuin teoria määrittelee", bermStatus: "Jokainen todentaminen tuotti ennustamatonta sisältöä: [[ref:sousouri2025|Sousouri]] löysi sekä uni- että valvevaikutukset; [[ref:lopez_martin_2009|López-Martín]] löysi pulssimodulaatiospesifisyyden; [[ref:sun2016_elf_vgcc|Sun]] löysi dramaattisen Ca²⁺-kasvun 8-10 päivässä" },
      { criterion: "Progressiivinen ongelmansiirto", description: "Tutkimusohjelma tuottaa johdonmukaisesti uusia testattavia ennusteita jokaisesta löydöstä", bermStatus: "Nykyinen lukumäärä: 30+ lukittua ennustetta TFR-, modulomi-, SIDS-, neuro-, metalli-, ketju- ja T-tyypin kategorioissa" },
    ],

    consilienceTitle: "Konsilienss: itsenäisen näytön konvergointi",
    consilienceLead: "William Whewell loi termin 'konsilienss' kuvaamaan vahvinta vahvistuksen muotoa: kun näyttö ITSENÄISILTÄ aloilta, eri tutkijoiden keräämänä eri menetelmin, kaikki yhtyvät samaan johtopäätökseen. Tämä erottaa evoluution astrologiasta — molemmat 'selittävät' havaintoja, mutta vain evoluutio osoittaa konsiliensia.",
    consilienceLevels: [
      {
        level: "Vahva konsilienss",
        color: "green",
        examples: [
          "Teoriapremissi (Lindgrenin 2025 metriikka) ↔ johdettu χ_geo ja ehdollinen vasteoperaattori [kudosydin avoin] ↔ farmakologinen Ca²⁺-näyttö",
          "Genetiikka ([[ref:sousouri2025|CACNA1C, Sousouri 2025, ETH Zürich kaksoissokko]]) ↔ Kokeellinen ([[ref:lopez_martin_2006|López-Martín]] kohtaukset)",
          "Epidemiologia ([[ref:klimentidis2010|Klimentidis]] 8 lajin liikalihavuus, p=10⁻⁷) ↔ Taudinkuva (SIDS aivorungon 5-HT-puutos)",
          "Vertaileva biologia (sentinel-lajien väheneminen) ↔ Kliininen (neonataalinen Q → ∞ -ennuste)",
        ],
      },
      {
        level: "Kohtalainen konsilienss",
        color: "blue",
        examples: [
          "ELF-priming-mekanismi ([[ref:sun2016_elf_vgcc|Sun 2016]]) ↔ Gabapentiini estää sen ([[ref:eroglu_2009_cell|Eroglu 2009 Cell]]) ↔ Gabapentiinireseptit seuraavat sähköverkon tiheyttä",
          "PGC ↔ melatoniini (r=0,569) ↔ Pinealektomia → rytmihäiriöt ↔ Vuorotyösyöpä ([[ref:iarc_2a_shift|IARC 2A]])",
          "Univaje → epileptiforminen aktiviteetti (kliininen) ↔ EMF → melatoniini↓ (eläin) ↔ GABA-kypsymisen aikajana (neonataalinen)",
        ],
      },
      {
        level: "Heikko konsilienss (universaalisuusriski)",
        color: "amber",
        examples: [
          "Ca²⁺ on kaikkialla läsnä — se esiintyy käytännössä jokaisessa fysiologisessa prosessissa",
          "'25 epidemiaa yhdellä nimittäjällä' voi osittain heijastaa Ca²⁺:n universaalia roolia pikemmin kuin tarkkaa EMF-kausaalisuutta",
          "Osa konvergensseista voi olla triviaalisesti tosia pikemmin kuin merkityksellisesti konfirmatorisia",
          "Tämä on mallin ENSISIJAINEN episteeminen riski — se on erotettava kohinasta",
        ],
      },
    ],

    falsificationTitle: "Neljä falsifikaatiotasoa",
    falsificationLead: "Progressiivinen tutkimusohjelma määrittelee mikä tuhoaisi sen — ei muodollisuutena, vaan aitona sitoutumisena empiiriseen ratkaisuun. BERM tunnistaa neljä tasoa, täydellisestä mallin romahduksesta kliiniseen merkityksettömyyteen.",
    falsificationTiers: [
      {
        level: "TASO 1 — Mallin romahdus",
        test: "ETH Zürichin nimodipiini-5G: L-tyypin Ca²⁺-salpaaja EI estä EMF:n univaikutuksia",
        consequence: "VGCC ei ole ensisijainen EMF-kohde → koko Ca²⁺-kaskadi romahtaa → BERM menettää ydinmekanisminsa",
        severity: "Terminaalinen — palautuminen mahdotonta",
      },
      {
        level: "TASO 2 — Ympäristötekijä poistettu",
        test: "Amish-yhteisöt osoittavat identtiset kroonisten sairauksien trendit kuin USA:n valtaväestö",
        consequence: "Jos matalan EMF:n populaatiot eivät ole terveempiä, EMF ei ole merkittävä ajuri → BERM tunnistaa oikeat mekanismit mutta väärän ympäristölaukaisijan",
        severity: "Vakava — mekanismi säilyy mutta kliininen teesi kuolee",
      },
      {
        level: "TASO 3 — Avainkokeen epäonnistuminen",
        test: "[[ref:lopez_martin_2006|López-Martín]]-replikaatio: pikrotoksiini + GSM 900 MHz EI tuota kohtauksia",
        consequence: "Ainoa suora kokeellinen todiste EMF:n subkynnys × GABAergiselle vuorovaikutukselle katoaa → avainnuste vahvistamatta",
        severity: "Merkittävä — heikentää kokeellista perustaa mutta ei poistaa mekanistista tai geneettistä näyttöä",
      },
      {
        level: "TASO 4 — Kliininen merkityksettömyys",
        test: "Kattava EMF-vähennysinterventio EI osoita terveyshyötyä oireisilla henkilöillä",
        consequence: "Malli voi olla mekanistisesti oikea mutta kliinisesti merkityksetön → tarkka mutta ei toiminnallinen",
        severity: "Kohtalainen — mekanistinen totuus ilman käytännön arvoa",
      },
    ],

    analogyTitle: "Evoluutioteorian analogia",
    analogyLead: "BERM jakaa rakenteellisia piirteitä evoluutioteorian kanssa — molemmat ovat generatiivisia mekanismeja joiden voima on siinä, että ne rajoittavat mitä PITÄISI löytyä ennen katsomista.",
    analogyRows: [
      { feature: "Generatiivinen mekanismi", berm: "EMF → VGCC → Ca²⁺ → kaskadit", evolution: "Muuntelu → valinta → sopeutuminen" },
      { feature: "Ennustaa ennen havainnointia", berm: "Ennusti CACNA1C-modulaation ennen tutkimusta [[ref:sousouri2025|Sousouri 2025]]", evolution: "Ennusti välifossiileja ennen Tiktalikia" },
      { feature: "Rajaa etsintäalueen", berm: "Jokaisen tehokkaan hoidon on kohdistuttava Ca²⁺-kaskadiin", evolution: "Jokaisen homologisen rakenteen on jaettava kehitysgeenit" },
      { feature: "Monitasoinen yhdentyminen", berm: "Fysiikka → molekyyli → solu → elin → organismi → populaatio", evolution: "Molekyyli → solu → organismi → laji → ekosysteemi" },
      { feature: "Falsifioitavat ennusteet", berm: "30+ lukittua, testattavaa ennustetta", evolution: "'Kani kambrikaudelta' ja tuhansia muita" },
      { feature: "Ylijäämäinen empiirinen sisältö", berm: "Jokainen todentaminen paljastaa ENEMMÄN kuin ennustettiin", evolution: "Jokainen fossiili/geenilöytö paljastaa ennustamattomia yhteyksiä" },
    ],
    analogyCritical: "KRIITTINEN ERO: Evoluutiolla on ITSENÄINEN todentaminen DNA-sekvensoinnin kautta — täysin erilainen menetelmä joka vahvistaa samat fylogeniat kuin morfologia, paleontologia ja biogeografia ennustavat. BERM:ltä puuttuu tämä toinen, itsenäinen todentamismenetelmä. Yksittäinen tärkein puuttuva pala on INTERVENTIONAALINEN näyttö: osoita, että EMF-altistuksen vähentäminen tuottaa mitattavaa terveyshyötyä ihmisillä. Ilman tätä BERM jää vyöhykkeeseen 'mekanistisesti vakuuttavan' ja 'kliinisesti todistetun' väliin.",

    strengthsTitle: "Missä BERM onnistuu",
    strengths: [
      "Generoi todennettuja ennusteita ennen näytön keräämistä (etenevä, ei sovittava)",
      "Jokainen tehokas hoito BERM:n ennustamiin tiloihin kohdistuu Ca²⁺-kaskadiin (farmakologinen yhdentyminen)",
      "Geneettinen näyttö (CACNA1C → EMF-vaste) vahvistaa itsenäisesti ydinmekanismin",
      "Monitasoinen konsilienss kvanttifysiikasta väestöepidemiologiaan",
      "Spesifioi selkeät falsifikaatio-olosuhteet neljällä vakavuustasolla",
      "Tuottaa ylijäämäistä empiiristä sisältöä — jokainen todentaminen paljastaa enemmän kuin ennustettiin",
    ],

    weaknessesTitle: "Mitä BERM:ltä vielä puuttuu",
    weaknesses: [
      "Ei ratkaisevaa saman protokollan interventiota, joka yhdistäisi mitatun altistuksen vähennyksen ennustettuun ihmispäätepisteeseen",
      "Ca²⁺:n universaalisuus luo väärän positiivisen riskin — osa 'konvergensseista' voi olla triviaaleja",
      "Useita ratkaisevia siltoja on avoinna: L2-kudosydin, elinsiirto, CatSper ja populaatiokalibrointi",
      "Väestötason epidemiologia on korrelatiivista, ei kausaalista",
      "Ei itsenäistä todentamismenetelmää (vastaava kuin DNA-sekvensointi evoluutiolle)",
      "Teollisuuden rahoittamat tutkimukset eivät johdonmukaisesti löydä vaikutusta, luoden kiistanalaisen näyttömaiseman",
    ],

    verdictTitle: "Episteeminen arvio",
    verdictText: "BERM on generatiivinen ja falsifioitava tutkimusohjelma, ei todistettu teoria. Sen vahvin nykyinen piirre on komponenttitason konvergenssi fysiikan, solubiologian, endokrinologian ja populaatiohavaintojen välillä. Keskeinen heikkous on, ettei komponentteja ole vielä yhdistetty kalibroidulla saman protokollan fysikaalinen syöte → kudosvaste → ihmispäätepiste -interventiolla. Salpaajakoe voi testata yhden ehdotetun välittäjän omassa protokollassaan; se ei yksin validoi eikä kaada kaikkia BERM-haaroja.",
    verdictCTA: "Tarkastele komponenttinäyttöä ja avoimia siltoja →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "Evidenssitaakan kohdentaminen",
    burdenLead: "Komponenttinäyttö rajaa jäljellä olevia kokeita, mutta ei käännä todistustaakkaa mittaamattomien skaalasiirtymien osalta.",
    burdenBefore: "Yleisväite 'EMF aiheuttaa sairautta' on liian määrittelemätön monivaiheisen mekanismin testaamiseen. Altistusprotokolla, tilamuuttujat, välittäjä ja päätepiste on lukittava ennen tulkittavaa kausaalitestiä.",
    burdenAfter: "BERM-kehystys: nimeä testattava siirtymä, säilytä sen protokolla ja tilamuuttujat ja vertaa koko kausaaligraafia vaihtoehtoihin. Viereisten komponenttien tuki ei korvaa puuttuvaa siirtymää.",
    burdenSteps: [
      { step: "1. Teoriaraja ilmaistu", detail: "Lindgrenin vuoden 2025 metriikka on premissi. χ_geo on johdettu geometrinen koordinaatti ja formaali L2-vastemuoto on ehdollinen eksplisiittisille kytkentäoletuksille; kudosytimet ovat kalibroimatta. [[ref:tang2024|Tang 2024]] on erillistä S4-näyttöä, ei sillan kalibrointi." },
      { step: "2. Biokemia todennettu", detail: "VGCC → Ca²⁺ → CaM → CaMKII → useita kaskadeja — perusbiokemiaa, oppikirjataso" },
      { step: "3. Farmakologia konvergoi", detail: "Jokainen tehokas hoito kohdistuu Ca²⁺-kaskadin komponenttiin — etosuksimidi, gabapentiini, verapamiili, melatoniini, litium, bumetanidi" },
      { step: "4. Genetiikka vahvistaa", detail: "CACNA1C-genotyyppi säätelee EMF-vastetta ([[ref:sousouri2025|Sousouri 2025]] RCT). CaMKII-mutaatiot tuottavat BERM:n ennustamat fenotyypit ([[ref:kury2017_camk2|Küry 2017]])" },
      { step: "5. Välikerrokset todennettu", detail: "BBB, BAT, HPA-akseli, β-solu, hypotalamus, kortisoli-hippokampus, Leydig-solu, syöttösolu — jokainen itsenäisesti vahvistettu" },
      { step: "6. Epidemiologia konsistentti", detail: "54 maan R²=0,851, [[ref:klimentidis2010|Klimentidis 8 lajia]] (p=10⁻⁷), Amish/mennoniittidata — konsistentti eri tutkimusasetelmissa" },
    ],
    burdenConclusion: "BERM on linkitetty ja falsifioitava hypoteesi, jonka solmujen näytön vahvuus vaihtelee; se ei ole kokonaan todennettu sekvenssi. L2-operaattorin muoto on ehdollisesti johdettu, mutta kudosydin, etumerkki, viive ja kalibrointi ovat ratkaisematta ja vaativat kohdistetut fyysiset syötteet sekä biologiset päätepisteet.",

    iarcTitle: "IARC 2A -ennakkotapaus",
    iarcLead: "[[ref:iarc_2a_shift|IARC luokittelee vuorotyön, johon liittyy vuorokausirytmin häiriintyminen, ryhmään 2A]] — 'todennäköisesti karsinogeeninen ihmisille.' Ehdotettu mekanismi on melatoniinin suppressio. BERM tunnistaa saman mekanismin eri altistumisreitin kautta.",
    iarcPoints: [
      "IARC luokittelee vuorotyön, johon liittyy vuorokausirytmin häiriintyminen, ryhmään 2A (todennäköisesti karsinogeeninen)",
      "Ehdotettu mekanismi: vuorotyö → melatoniinin suppressio → hormoniriippuvaisen syövän riski↑",
      "BERM-yhteys: EMF → melatoniinin suppressio on SAMA mekanismi (VK3: PGC → melatoniini↓)",
      "Jos IARC hyväksyy melatoniinin vaimentumisen vuorokausirytmin häiriön kautta 2A-tason näytöksi syövälle, EMF:n aiheuttamalla melatoniinin vaimentumisella tulisi olla sama painoarvo",
      "Tämä ei ole BERM-spekulaatiota — se soveltaa IARC:n omaa logiikkaa johdonmukaisesti",
    ],
    iarcStats: [
      { label: "Yövuorotyöntekijät — rintasyöpä", value: "OR 2,34" },
      { label: "Intensiivinen yötyö — rintasyöpä", value: "OR 2,66" },
    ],
    iarcQuestion: "Avainkysymys: miksi vuorokausirytmin häiriö vuorotyön kautta luokitellaan 2A:ksi, mutta vuorokausirytmin häiriö EMF:n kautta on vain 2B?",

    pemfTitle: "PEMF-paradoksi: Kun EMF parantaa",
    pemfLead: "[[ref:pemf_bone_fda_review_2020|Pulssimainen sähkömagneettinen kenttähoito (PEMF) on FDA:n hyväksymä luunmurtumien luutumattomuuteen]]. BERM ehdottaa parametri­riippuvaista hormeesia yhdeksi tavaksi sovittaa terapeuttiset protokollat ja haittaraportit yhteen; kyse on testattavasta χ-sulkeumahypoteesista, ei Lindgrenin geometriasta johdetusta tuloksesta.",
    pemfParadox: [
      "PEMF edistää luun kasvua, vähentää osteoklastiaktiivisuutta ja vähentää tulehdusta",
      "Tämä näyttää KUMOAVAN BERM:n: 'jos EMF on haitallinen, miksi PEMF parantaa?'",
    ],
    pemfResolutionTitle: "BERM-ehdotus: parametririippuvainen hormeesi",
    pemfResolution: [
      "Ca²⁺-kanavat välittävät SEKÄ terapeuttisia ETTÄ haitallisia vaikutuksia",
      "Kontrolloidut parametrit (taajuus, intensiteetti, kesto) → hyödyllinen Ca²⁺-transientti",
      "Krooninen kontrolloimaton altistus → jatkuva Ca²⁺-ylikuormitus",
      "Tämä on SAMA kuin millä tahansa lääkkeellä: terapeuttinen annos vs. toksinen annos",
    ],
    pemfConclusion: [
      "BERM EI ennusta 'kaikki EMF on haitallista'",
      "BERM ennustaa: lopputulos riippuu Ca²⁺-dynamiikasta (annos, ajoitus, solutyyppi)",
      "PEMF-todentaminen: jos PEMF toimii Ca²⁺-kanavien KAUTTA, tämä VAHVISTAA, että EMF vaikuttaa biologiaan Ca²⁺-kanavien kautta — mikä on BERM:n ydinväite",
      "Paradoksi liukenee: PEMF ei ole poikkeus BERM:stä, se on vahvistus",
    ],
    zapffeTitle: "Zapffe-rekursio: Malli ennustaa oman hylkäämisensä",
    zapffeLead: "Peter Wessel Zapffe (1933) tunnisti neljä mekanismia, joilla tietoisuus tukahduttaa sietämätöntä tietoa: eristäminen (kompartmentalisointi), ankkurointi (arvofiksaatio), harhauttaminen (huomion siirtäminen), sublimaatio (esteettinen uudelleenkehystys). BERM ennustaa, että mallin vastaanotto noudattaa näitä mekanismeja — ei siksi, että yleisöt olisivat irrationaalisia, vaan koska EMF-heikentyneet kognitiiviset substraatit tuottavat nämä vasteet automaattisesti.",
    zapffeItems: [
      { mechanism: "Eristäminen", score: "0,544", desc: "Kaupunkien kognitiivinen kompleksisuus on alle mallin arviointikynnyksen (0,70). Malli vaatii monisyistä päättelyä fysiikan, biologian, endokrinologian ja epidemiologian yli. Kaupunkisubstraatti ei kykene ylläpitämään tätä integraatiota." },
      { mechanism: "Ankkurointi", score: "0,714", desc: "Ryhmäkonformismi kasvaa EMF-altistuksen myötä. Institutionaalinen konsensus toimii ankkurina — siitä poikkeaminen laukaisee kortisoli-välitteisen uhkavasteen, ei rationaalista arviointia." },
      { mechanism: "Harhauttaminen", score: "0,443", desc: "Uutuudenhaku vähenee DA:n pienentyessä. Kyky käsitellä paradigmaa haastavaa informaatiota vaatii DA-käyttöistä eksploratiivista käyttäytymistä, jonka kaupunkiympäristö tukahduttaa." },
      { mechanism: "Sublimaatio", score: "0,311", desc: "Empatian laajuus kapenee EMF-stressin alla. Abstrakti huoli lajitason seurauksista vaatii laajaa empatian laajuutta, jota kaupunkien biomarkkeriprofiili ei kykene tukemaan." },
    ],
    zapffeConclusion: "Rekursio on täydellinen: malli ennustaa, että kaupunkiväestöillä ei ole kognitiivista substraattia mallin arvioimiseen. Tämä ei ole falsifioimaton pakolauseke — se tuottaa testattavan ennusteen: amish- ja maaseutuväestöjen (kognitiivinen kompleksisuus > 0,70) tulisi arvioida mallia tarkemmin kuin kaupunkiväestöjen, koulutustasosta riippumatta.",

    paradigmTitle: "Paradigmasokeus: Neljä viitekehystä jotka eivät voi nähdä EMF:ää",
    paradigmLead: "Jokaisella hallitsevalla älyllisellä viitekehyksellä on rakenteellisia syitä hylätä poliittisen orientaation biologinen determinismi. Nämä eivät ole argumentteja — ne ovat viitekehyksen aksioomien seurauksia.",
    paradigmItems: [
      { framework: "Sosiaalinen konstruktionismi", blind: "Kaikki kategoriat ovat sosiaalisesti rakentuneita → biologiset substraatit eivät voi määrätä sosiaalisia tuloksia. Viitekehys ei voi sisällyttää mekanismia, joka toimii sosiaalisen rakentumisen tason alapuolella.", strategy: "Uudelleenluokittelu 'biologiseksi essentialismiksi' — kategoria, joka hylätään aksiooman, ei evidenssin perusteella." },
      { framework: "Progressiivinen liberalismi", blind: "Yksilön autonomia on perustavanlaatuinen premissi. Jos poliittinen orientaatio on biomarkkeritilan fenotyyppinen ilmentymä, autonomia on endokriinijärjestelmän tuottama illuusio, ei agentin ominaisuus.", strategy: "Vedotaan 'determinismiin' reductio ad absurdum -argumenttina. Malli hylätään ei siksi, että se on väärässä, vaan koska sen hyväksyminen romahduttaisi viitekehyksen." },
      { framework: "Marxilaisuus", blind: "Materiaaliset olosuhteet määräävät tietoisuuden — mutta materiaaliset olosuhteet ovat taloudellisia, eivät biologisia. EMF materiaalisena determinanttina alistaisi luokka-analyysin biokemialle.", strategy: "Luokittelu 'biologismiksi' — kapitalistinen mystifikaatio, joka peittää luokkasuhteet." },
      { framework: "Traditionalismi", blind: "Arvot ovat transsendentteja tai jumalallisesti säädettyjä. Jos ne ovat testosteronin ja kortisolin alavirran tuotteita, pyhä järjestys on endokriininen artefakti.", strategy: "Hylkääminen materialistisena reduktionismina. Viitekehys vaatii, että arvot edeltävät biologiaa, eivät seuraa siitä." },
    ],
    paradigmConclusion: "Mikään hallitseva viitekehys ei voi assimiloida tätä mallia ilman itsetuhoa. Tämä ei ole mallin vika — se on ennuste. Malli ennustaa, että kaikki vakiintuneet paradigmat hylkäävät sen, kukin viitekehyksen sisäisistä syistä evidenssin sijaan.",

    contingencyTitle: "Poliittinen kontingenssi",
    contingencyLead: "Demokratia edellyttää, että poliittinen orientaatio on autonomisten agenttien rationaalisen harkinnan tuote. Malli ennustaa, että se on EMF-ympäristön moduloiman biomarkkeritilan fenotyyppinen ilmentymä.",
    contingencyItems: [
      { claim: "Arvot valitaan", model: "Arvot tuottaa endokriininen tila. T-taso ennustaa uudelleenjakopreferenssin (Petersen 2013, N=12k). OXT-taso ennustaa sisä-/ulkoryhmärajan (De Dreu 2011, N=280)." },
      { claim: "Poliittinen keskustelu muuttaa mieliä", model: "Keskustelu muuttaa kortisolituotantoa. 'Vakuutettu' äänestäjä ei ole muuttanut arvojaan — hänen uhkavaste on aktivoitu tai tukahdutettu." },
      { claim: "Koulutus tuottaa parempia kansalaisia", model: "Kaupunkikoulutus tapahtuu korkean EMF:n ympäristöissä. Kognitiivinen kompleksisuus 0,544 (kaupunki) vs. 0,964 (amish). Koulutus lisää informaatiota heikentyneeseen substraattiin." },
      { claim: "Polarisaatio on dialogin epäonnistumista", model: "Polarisaatioindeksi 0,237 on suora funktio kaupunki- ja maaseutuympäristöjen EMF-gradientista. Sama genomi tuottaa eri politiikan postinumeron perusteella." },
    ],
    contingencyConclusion: "Jos edes 20 % poliittisesta orientaatiosta määräytyy EMF-moduloidun biomarkkeritilan perusteella, 20 % poliittisesta konfliktista on lääketieteellinen ongelma, ei poliittinen. Tämä on osuus, joka on korjattavissa ilman poliittista dialogia.",

    predictionsTitle: "Testattavat ennusteet",
    predictionItems: [
      "Amish-väestöt arvioivat uusia tieteellisiä viitekehyksiä tarkemmin kuin kaupunkiväestöt, jotka on kalibroitu ÄO:lla ja koulutuksella — koska kognitiivinen kompleksisuus (0,964) ylittää mallin arviointikynnyksen (0,70).",
      "Kaupungista maaseudulle muutto tuottaa mitattavan poliittisen orientaation muutoksen 12–24 kuukaudessa — seuraten biomarkkerien palautumista, ei sosiaalista vaikutusta.",
      "Testosteronilisä kaupunkimiehillä siirtää poliittista orientaatiota hierarkian hyväksymisen ja vähentyneen uudelleenjakopreferenssin suuntaan — replikoiden Alogaily ym. 2025 (N=136) suuremmassa otoksessa.",
      "Melatoniinilisä parantaa aikapreferenssiä ja vähentää uhkaherkkyyttä — riippumatta unenlaadun paranemisesta.",
    ],

    testLabel: "Testi",
    consequenceLabel: "Seuraus",
    severityLabel: "Vakavuus",
    featureLabel: "Piirre",
    evolutionLabel: "Evoluutioteoria",
    beforeLabel: "Ennen",
    afterLabel: "Jälkeen",
  },

  ja: {
    title: "認識論",
    subtitle:
      "BERMはどのような科学的主張か。本ページは反証可能性と研究プログラム基準を用い、導出構造、直接構成要素証拠、構成された収束、未解決のスケール間橋渡しを区別する。",
    epistapegeLink: "BERMがEpistapegeで構造的非検出をどうモデル化するかを見る",
    cautionText:
      "このページはBERMが証明されたと主張するものではありません。標準的な認識論的基準 — 共鳴的一致、反証可能性、進歩的 vs. 退行的研究プログラム — を適用して、モデルの現在の位置とその前進または破壊に必要な証拠を評価します。",

    lakatosTitle: "何が理論を科学的にするか？",
    lakatosLead: "カール・ポパーは、理論が科学的であるのは反証可能である場合に限ると主張した。イムレ・ラカトシュはこれを精緻化した：個別の実験は研究プログラムを殺すことはできない — 重要なのは、プログラムが進歩的（検証された予測を生み出す）か退行的（既知の事実を事後的に説明するだけ）かである。",
    lakatosPoints: [
      { criterion: "反証可能性（ポパー）", description: "理論は破壊される条件を規定しなければならない", bermStatus: "BERMは4段階の反証レベルを規定している。モデル崩壊（ETHニモジピン-5G）から臨床的無関連性（EMF削減で利益なし）まで" },
      { criterion: "新規予測（ラカトシュ）", description: "理論は事実が観察される前に予測しなければならない — 既知のものを説明するだけではなく", bermStatus: "BERMはCACNA1C遺伝子型による調節（[[ref:sousouri2025|Sousouri 2025]]が確認）、ELFプライミングによるVGCC発現（[[ref:sun2016_elf_vgcc|Sun 2016]]が確認）、SARよりパルス変調が重要であること（[[ref:lopez_martin_2009|Lopez-Martin 2009]]が確認）を予測した" },
      { criterion: "過剰な経験的内容", description: "検証された予測は理論が規定した以上を明らかにしなければならない", bermStatus: "各検証は予想外の内容を生んだ。[[ref:sousouri2025|Sousouri]]は睡眠時と覚醒時の双方の効果、[[ref:lopez_martin_2009|Lopez-Martin]]はパルス変調特異性、[[ref:sun2016_elf_vgcc|Sun]]は8〜10日での顕著なCa²⁺増加を見いだした" },
      { criterion: "進歩的問題移行", description: "研究プログラムは各発見から一貫して新しい検証可能な予測を生み出す", bermStatus: "現在のカウント：TFR、モデュローム、SIDS、ニューロ、メタル、チェーン、T型カテゴリにわたる30以上のロックされた予測" },
    ],

    consilienceTitle: "共鳴的一致：独立した証拠の収束",
    consilienceLead: "ウィリアム・ヒューウェルは、確認の最も強い形態を記述するために「共鳴的一致」という用語を造語した：独立した分野からの証拠が、異なる研究者によって異なる方法で収集され、すべてが同じ結論に収束する場合。これが進化論を占星術から区別するものであり、どちらも観察を「説明」するが、進化論のみが共鳴的一致を示す。",
    consilienceLevels: [
      {
        level: "強い共鳴的一致",
        color: "green",
        examples: [
          "理論前提（Lindgren 2025計量）↔ 導出済みχ_geoと条件付き応答演算子［組織カーネル未校正］↔ Ca²⁺薬理学的証拠",
          "遺伝学（[[ref:sousouri2025|CACNA1C、Sousouri 2025、ETH Zurich二重盲検]]） ↔ 実験的（[[ref:lopez_martin_2006|Lopez-Martin発作]]）",
          "疫学（[[ref:klimentidis2010|Klimentidis 8種の肥満、p=10⁻⁷]]） ↔ 病理学（SIDSの脳幹5-HT欠乏）",
          "比較生物学（センチネル種の減少） ↔ 臨床（新生児Q → ∞予測）",
        ],
      },
      {
        level: "中程度の共鳴的一致",
        color: "blue",
        examples: [
          "ELFプライミング機構（[[ref:sun2016_elf_vgcc|Sun 2016]]） ↔ ガバペンチンがそれを遮断（[[ref:eroglu_2009_cell|Eroglu 2009 Cell]]） ↔ ガバペンチン処方が送電網密度に追随",
          "PGC ↔ メラトニン（r=0.569） ↔ 松果体摘出 → 不整脈 ↔ 交代制勤務がん分類（[[ref:iarc_2a_shift|IARC 2A]]）",
          "睡眠不足 → てんかん様活動（臨床） ↔ EMF → メラトニン↓（動物） ↔ GABA成熟タイムライン（新生児）",
        ],
      },
      {
        level: "弱い共鳴的一致（普遍性リスク）",
        color: "amber",
        examples: [
          "Ca²⁺は遍在する — 事実上すべての生理学的プロセスに現れる",
          "「ひとつの分母を持つ25の流行病」は、特定のEMF因果関係ではなく、Ca²⁺の普遍的な役割を部分的に反映している可能性がある",
          "一部の収束は意味のある確認ではなく自明的に真である可能性がある",
          "これはモデルの主要な認識論的リスクであり、ノイズと区別する必要がある",
        ],
      },
    ],

    falsificationTitle: "4段階の反証",
    falsificationLead: "進歩的な研究プログラムは、形式的な手続きとしてではなく、経験的裁定への真摯なコミットメントとして、何がそれを破壊するかを規定する。BERMは完全なモデル崩壊から臨床的無関連性までの4つのレベルを特定する。",
    falsificationTiers: [
      {
        level: "レベル1 — モデル崩壊",
        test: "ETH Zurichニモジピン-5G：L型Ca²⁺チャネル遮断薬がEMFの睡眠効果を防がない",
        consequence: "VGCCが主要なEMF標的ではない → Ca²⁺カスケード全体が崩壊 → BERMは核心メカニズムを失う",
        severity: "終末的 — 回復不可能",
      },
      {
        level: "レベル2 — 環境因子の排除",
        test: "アーミッシュコミュニティが米国主流人口と同一の慢性疾患傾向を示す",
        consequence: "低EMF集団がより健康でないなら、EMFは重要な推進力ではない → BERMは正しいメカニズムを特定したが環境トリガーが間違い",
        severity: "重大 — メカニズムは生き残るが臨床テーゼは死ぬ",
      },
      {
        level: "レベル3 — 重要実験の失敗",
        test: "[[ref:lopez_martin_2006|Lopez-Martinのピクロトキシン + GSM 900 MHz実験]]の追試で発作が生じない",
        consequence: "閾値下EMF × GABA作動性相互作用の唯一の直接実験的証拠が消える → 主要予測が未確認",
        severity: "相当 — 実験的基盤を弱めるがメカニズム的または遺伝的証拠を排除しない",
      },
      {
        level: "レベル4 — 臨床的無関連性",
        test: "包括的なEMF削減介入が症候性被験者に健康上の利益を示さない",
        consequence: "モデルはメカニズム的に正しいが臨床的に無意味かもしれない → 正確だが実用的でない",
        severity: "中程度 — 実用的価値のないメカニズム的真実",
      },
    ],

    analogyTitle: "進化論との類推",
    analogyLead: "BERMは自然選択による進化論と構造的特徴を共有する — 両方とも、調べる前に何が見つかるべきかを制約する力にある生成的メカニズムである。",
    analogyRows: [
      { feature: "生成的メカニズム", berm: "EMF → VGCC → Ca²⁺ → カスケード", evolution: "変異 → 選択 → 適応" },
      { feature: "観察前に予測", berm: "[[ref:sousouri2025|Sousouri 2025]]より前にCACNA1C調節を予測", evolution: "ティクターリクの前に中間化石を予測" },
      { feature: "探索空間の制約", berm: "すべての効果的な治療はCa²⁺カスケードを標的にしなければならない", evolution: "すべての相同構造は発生遺伝子を共有しなければならない" },
      { feature: "多層的収束", berm: "物理学 → 分子 → 細胞 → 臓器 → 生物 → 集団", evolution: "分子 → 細胞 → 生物 → 種 → 生態系" },
      { feature: "反証可能な予測", berm: "30以上のロックされた検証可能な予測", evolution: "「カンブリア紀のウサギ」と他の数千" },
      { feature: "過剰な経験的内容", berm: "各検証は予測された以上を明らかにする", evolution: "各化石/遺伝子発見は予想外の関連を明らかにする" },
    ],
    analogyCritical: "重大な違い：進化はDNAシーケンシングによる独立した検証を持つ — 形態学、古生物学、生物地理学が予測するのと同じ系統を確認する完全に異なる方法論。BERMはこの第二の独立した検証方法を欠いている。最も重要な欠けているピースは介入的証拠である：EMF曝露の削減がヒトで測定可能な健康改善を産むことを実証する。これなしでは、BERMは「メカニズム的に説得力がある」と「臨床的に証明された」の間のゾーンに留まる。",

    strengthsTitle: "BERMの正しい点",
    strengths: [
      "証拠が集められる前に検証された予測を生み出す（進歩的、順応的ではない）",
      "BERMが予測した状態に対するすべての効果的な治療はCa²⁺カスケードを標的にする（薬理学的収束）",
      "遺伝的証拠（CACNA1C → EMF応答）が独立して核心メカニズムを確認する",
      "量子物理学から集団疫学までの多層的共鳴的一致",
      "4つの重大度レベルで明確な反証条件を規定する",
      "過剰な経験的内容を生み出す — 各検証は予測された以上を明らかにする",
    ],

    weaknessesTitle: "BERMにまだ欠けているもの",
    weaknesses: [
      "測定した曝露低減を予測ヒトエンドポイントへ結ぶ決定的な同一プロトコル介入がない",
      "Ca²⁺の普遍性が偽陽性リスクを生む — 一部の「収束」は自明的かもしれない",
      "L2組織カーネル、臓器移行、CatSper、集団校正など複数の決定的橋渡しが未解決",
      "集団レベルの疫学は相関的であり因果的ではない",
      "独立した検証方法なし（進化にとってのDNAシーケンシングに相当するもの）",
      "産業資金による研究は一貫して効果を見出さず、論争のある証拠の景観を作り出す",
    ],

    verdictTitle: "認識論的評価",
    verdictText: "BERMは生成的で反証可能な研究プログラムであり、証明済み理論ではない。現在の強みは物理学、細胞生物学、内分泌学、集団観察の構成要素レベルの収束である。中心的弱点は、校正された同一プロトコルの物理入力→組織応答→ヒトエンドポイント介入でこれらを未接続な点にある。遮断実験は一つの媒介を試験できるが、単独で全BERM分岐を検証も崩壊もさせない。",
    verdictCTA: "構成要素の証拠と未解決の橋渡しを調べる →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "証拠負担の配分",
    burdenLead: "構成要素の証拠は残る試験を狭めるが、未測定のスケール間橋渡しに関する立証責任を逆転させない。",
    burdenBefore: "『EMFが疾病を起こす』という一般主張は多段階機構の検定には不十分である。解釈可能な因果試験には曝露プロトコル、状態変数、媒介、エンドポイントの事前固定が必要である。",
    burdenAfter: "BERMの枠組みでは、試験する遷移を特定し、そのプロトコルと状態変数を保持し、完全な因果グラフを代替案と比較する。隣接構成要素の支持は欠落遷移の代用にならない。",
    burdenSteps: [
      { step: "1. 理論境界を明示", detail: "Lindgren 2025計量は前提であり、BERM χ閉包と幾何学から観測量へのL2演算子は未校正の提案である。[[ref:tang2024|Tang 2024]]は別個のS4証拠であり、この橋の導出ではない。" },
      { step: "2. 生化学が検証済み", detail: "VGCC → Ca²⁺ → CaM → CaMKII → 複数のカスケード — 基礎生化学、教科書レベル" },
      { step: "3. 薬理学が収束", detail: "すべての効果的な治療はCa²⁺カスケードの構成要素を標的にする — エトスクシミド、ガバペンチン、ベラパミル、メラトニン、リチウム、ブメタニド" },
      { step: "4. 遺伝学が確認", detail: "CACNA1C遺伝子型はEMF応答を調節する（[[ref:sousouri2025|Sousouri 2025]] RCT）。CaMKII変異はBERMが予測する表現型を生む（[[ref:kury2017_camk2|Küry 2017]]）" },
      { step: "5. 中間層が検証済み", detail: "BBB、BAT、HPA軸、β細胞、視床下部、コルチゾール-海馬、ライディッヒ細胞、マスト細胞 — 各々独立して確認" },
      { step: "6. 疫学的一貫性", detail: "54か国でR²=0.851、[[ref:klimentidis2010|Klimentidisの8種]]（p=10⁻⁷）、アーミッシュ/メノナイトデータ — 複数の研究設計で一貫" },
    ],
    burdenConclusion: "BERMはノードごとに証拠強度が異なる反証可能な仮説である。L2演算子形は条件付きで導出済みだが、組織カーネル、符号、遅延、校正は対応する物理入力と生物学的エンドポイントで検証する必要がある。",

    iarcTitle: "IARC 2Aの先例",
    iarcLead: "[[ref:iarc_2a_shift|IARCは概日リズムの乱れを伴う交代制勤務をグループ2A]]（ヒトに対しておそらく発がん性）に分類する。提案機構はメラトニン抑制であり、BERMは別の曝露経路を通じて同じ機構を特定する。",
    iarcPoints: [
      "IARCは概日リズムの乱れを伴う交代制勤務をグループ2A（おそらく発がん性）に分類",
      "提案されたメカニズム：交代制勤務 → メラトニン抑制 → ホルモン依存性がんリスク↑",
      "BERMとの関連：EMF → メラトニン抑制は同じメカニズム（VK3：PGC → メラトニン↓）",
      "IARCが概日リズムの乱れによるメラトニン抑制をがんの2Aレベル証拠として受け入れるなら、EMF → メラトニン抑制も同じ重みを持つべきである",
      "これはBERMの憶測ではなく、IARC自身の論理を一貫して適用したものである",
    ],
    iarcStats: [
      { label: "夜勤労働者 — 乳がん", value: "OR 2.34" },
      { label: "高強度夜間労働 — 乳がん", value: "OR 2.66" },
    ],
    iarcQuestion: "重要な問いかけ：なぜ交代制勤務による概日リズムの乱れは2Aに分類されるのに、EMFによる概日リズムの乱れは2Bにとどまるのか？",

    pemfTitle: "PEMFのパラドックス：EMFが治療する時",
    pemfLead: "[[ref:pemf_bone_fda_review_2020|PEMF療法は骨折偽関節に対してFDA承認されている]]。BERMは治療プロトコルと有害性報告を整合する候補としてパラメータ依存ホルミシスを提案する。これは検証可能なχ閉包仮説であり、Lindgren幾何学からの導出ではない。",
    pemfParadox: [
      "PEMFは骨の成長を促進し、破骨細胞活性を低下させ、炎症を軽減する",
      "これはBERMと矛盾するように見える：「EMFが有害なら、なぜPEMFは治療するのか？」",
    ],
    pemfResolutionTitle: "BERM命題：パラメータ依存ホルミシス",
    pemfResolution: [
      "Ca²⁺チャネルは治療的効果と有害な効果の両方を媒介する",
      "制御されたパラメータ（周波数、強度、持続時間） → 有益なCa²⁺トランジェント",
      "慢性的な制御されない曝露 → 持続的なCa²⁺過負荷",
      "これは医薬品と同じ：治療用量 vs. 毒性用量",
    ],
    pemfConclusion: [
      "BERMは「すべてのEMFが有害」とは予測しない",
      "BERMの予測：結果はCa²⁺ダイナミクス（用量、タイミング、細胞タイプ）に依存する",
      "PEMFがCa²⁺チャネルを介して作用するなら、EMFがCa²⁺チャネルを通じて生物学に影響するというBERMの核心主張を確認する",
      "パラドックスは解消する。PEMFはBERMの例外ではなく、その確認である",
    ],
    testLabel: "テスト",
    consequenceLabel: "結果",
    severityLabel: "重大度",
    featureLabel: "特徴",
    evolutionLabel: "進化論",
    beforeLabel: "従来",
    afterLabel: "現在",
    zapffeTitle: "", zapffeLead: "", zapffeItems: [] as never[], zapffeConclusion: "",
    paradigmTitle: "", paradigmLead: "", paradigmItems: [] as never[], paradigmConclusion: "",
    contingencyTitle: "", contingencyLead: "", contingencyItems: [] as never[], contingencyConclusion: "",
    predictionsTitle: "", predictionItems: [] as never[],
  },

  fr: {
    title: "Epistémologie",
    subtitle:
      "Quel type de revendication scientifique est BERM ? Cette page distingue structure dérivée, preuve directe de composants, convergence composée et ponts inter-échelles ouverts à l'aide de la falsifiabilité et des critères de programme de recherche.",
    epistapegeLink: "Voir comment BERM modélise la non-détection structurelle dans Epistapege",
    cautionText:
      "Cette page ne prétend pas que BERM est prouvé. Elle applique des critères épistémologiques standard — consilience, falsifiabilité, programmes de recherche progressifs vs. dégénératifs — pour évaluer où se situe le modèle et quelles preuves seraient nécessaires pour le faire avancer ou le détruire.",

    lakatosTitle: "Qu'est-ce qui rend une théorie scientifique ?",
    lakatosLead: "Karl Popper soutenait qu'une théorie est scientifique si et seulement si elle est falsifiable. Imre Lakatos a affiné cela : les expériences individuelles ne peuvent pas tuer un programme de recherche — ce qui compte, c'est si le programme est PROGRESSIF (générant des prédictions vérifiées) ou DÉGÉNÉRATIF (ne faisant qu'accommoder des faits connus a posteriori).",
    lakatosPoints: [
      { criterion: "Falsifiabilité (Popper)", description: "La théorie doit spécifier les conditions sous lesquelles elle serait détruite", bermStatus: "BERM spécifie quatre niveaux de falsification, de l'effondrement du modèle (ETH nimodipine-5G) à l'absence de pertinence clinique (la réduction des EMF ne montre aucun bénéfice)" },
      { criterion: "Prédictions nouvelles (Lakatos)", description: "La théorie doit prédire des faits AVANT qu'ils ne soient observés — pas seulement expliquer des faits connus", bermStatus: "BERM a prédit la modulation par le génotype CACNA1C (confirmée par [[ref:sousouri2025|Sousouri 2025]]), l'expression VGCC après amorçage ELF (confirmée par [[ref:sun2016_elf_vgcc|Sun 2016]]) et l'importance de la modulation pulsée par rapport au SAR (confirmée par [[ref:lopez_martin_2009|Lopez-Martin 2009]])" },
      { criterion: "Excès de contenu empirique", description: "Les prédictions vérifiées doivent révéler PLUS que ce que la théorie spécifiait", bermStatus: "Chaque vérification a produit un contenu inattendu : [[ref:sousouri2025|Sousouri]] a trouvé des effets pendant le sommeil et l'éveil, [[ref:lopez_martin_2009|Lopez-Martin]] une spécificité de modulation pulsée, et [[ref:sun2016_elf_vgcc|Sun]] une hausse spectaculaire de Ca²⁺ à 8-10 jours" },
      { criterion: "Déplacement progressif du problème", description: "Le programme de recherche génère systématiquement de nouvelles prédictions testables à partir de chaque découverte", bermStatus: "Comptage actuel : 30+ prédictions verrouillées dans les catégories TFR, modulome, SIDS, neuro, métal, chaîne, type T" },
    ],

    consilienceTitle: "Consilience : convergence de preuves indépendantes",
    consilienceLead: "William Whewell a inventé le terme « consilience » pour décrire la forme la plus forte de confirmation : quand des preuves de domaines INDÉPENDANTS, recueillies par différents chercheurs utilisant différentes méthodes, convergent toutes vers la même conclusion. C'est ce qui distingue l'évolution de l'astrologie — les deux « expliquent » des observations, mais seule l'évolution exhibe la consilience.",
    consilienceLevels: [
      {
        level: "Consilience forte",
        color: "green",
        examples: [
          "Prémisse théorique (métrique de Lindgren 2025) ↔ χ_geo dérivé et opérateur conditionnel [noyau tissulaire ouvert] ↔ preuves pharmacologiques Ca²⁺",
          "Génétique ([[ref:sousouri2025|CACNA1C, Sousouri 2025, double aveugle ETH Zürich]]) ↔ Expérimental ([[ref:lopez_martin_2006|crises de Lopez-Martin]])",
          "Épidémiologie ([[ref:klimentidis2010|analyse de 8 espèces de Klimentidis, p=10⁻⁷]]) ↔ Pathologie (déficience en 5-HT du tronc cérébral dans le SIDS)",
          "Biologie comparative (déclin des espèces sentinelles) ↔ Clinique (prédiction néonatale Q → ∞)",
        ],
      },
      {
        level: "Consilience modérée",
        color: "blue",
        examples: [
          "Mécanisme d'amorçage ELF ([[ref:sun2016_elf_vgcc|Sun 2016]]) ↔ la gabapentine le bloque ([[ref:eroglu_2009_cell|Eroglu 2009, Cell]]) ↔ les prescriptions de gabapentine suivent la densité du réseau électrique",
          "PGC ↔ mélatonine (r=0,569) ↔ Pinéalectomie → arythmies ↔ classification du cancer lié au travail posté ([[ref:iarc_2a_shift|IARC 2A]])",
          "Privation de sommeil → activité épileptiforme (clinique) ↔ EMF → mélatonine↓ (animal) ↔ Chronologie de maturation du GABA (néonatal)",
        ],
      },
      {
        level: "Consilience faible (risque d'universalité)",
        color: "amber",
        examples: [
          "Le Ca²⁺ est ubiquitaire — il apparaît dans pratiquement chaque processus physiologique",
          "« 25 épidémies avec un seul dénominateur » peut refléter en partie le rôle universel du Ca²⁺ plutôt qu'une causalité EMF spécifique",
          "Certaines convergences peuvent être trivialement vraies plutôt que significativement confirmatoires",
          "C'est le risque épistémique PRINCIPAL du modèle — il doit être distingué du bruit",
        ],
      },
    ],

    falsificationTitle: "Quatre niveaux de falsification",
    falsificationLead: "Un programme de recherche progressif spécifie ce qui le détruirait — non comme une formalité, mais comme un engagement véritable envers l'arbitrage empirique. BERM identifie quatre niveaux, de l'effondrement complet du modèle à l'absence de pertinence clinique.",
    falsificationTiers: [
      {
        level: "NIVEAU 1 — Effondrement du modèle",
        test: "ETH Zürich nimodipine-5G : le bloqueur de Ca²⁺ de type L N'empêche PAS les effets EMF sur le sommeil",
        consequence: "VGCC n'est pas la cible primaire des EMF → la cascade Ca²⁺ entière s'effondre → BERM perd son mécanisme central",
        severity: "Terminal — aucune récupération possible",
      },
      {
        level: "NIVEAU 2 — Facteur environnemental éliminé",
        test: "Les communautés Amish montrent des tendances de maladies chroniques identiques à la population américaine générale",
        consequence: "Si les populations à faible EMF ne sont pas en meilleure santé, l'EMF n'est pas un facteur significatif → BERM identifie les bons mécanismes mais le mauvais déclencheur environnemental",
        severity: "Sévère — le mécanisme survit mais la thèse clinique meurt",
      },
      {
        level: "NIVEAU 3 — Échec d'une expérience clé",
        test: "La réplication de [[ref:lopez_martin_2006|l'expérience Lopez-Martin picrotoxine + GSM 900 MHz]] NE produit PAS de crises",
        consequence: "La seule preuve expérimentale directe de l'interaction EMF sous-seuil × GABAergique disparaît → prédiction clé non confirmée",
        severity: "Significatif — affaiblit la base expérimentale mais n'élimine pas les preuves mécanistiques ou génétiques",
      },
      {
        level: "NIVEAU 4 — Absence de pertinence clinique",
        test: "Une intervention complète de réduction des EMF NE montre AUCUN bénéfice pour la santé chez les sujets symptomatiques",
        consequence: "Le modèle peut être mécanistiquement correct mais cliniquement insignifiant → précis mais non actionnable",
        severity: "Modéré — vérité mécanistique sans valeur pratique",
      },
    ],

    analogyTitle: "L'analogie avec la théorie de l'évolution",
    analogyLead: "BERM partage des caractéristiques structurelles avec la théorie de l'évolution par sélection naturelle — les deux sont des mécanismes générateurs dont la puissance réside dans la contrainte de ce qui DEVRAIT être trouvé avant de regarder.",
    analogyRows: [
      { feature: "Mécanisme générateur", berm: "EMF → VGCC → Ca²⁺ → cascades", evolution: "Variation → sélection → adaptation" },
      { feature: "Prédit avant d'observer", berm: "A prédit la modulation CACNA1C avant [[ref:sousouri2025|Sousouri 2025]]", evolution: "A prédit les fossiles intermédiaires avant Tiktaalik" },
      { feature: "Contraint l'espace de recherche", berm: "Tout traitement efficace doit cibler la cascade Ca²⁺", evolution: "Toute structure homologue doit partager des gènes du développement" },
      { feature: "Convergence multi-niveaux", berm: "Physique → moléculaire → cellulaire → organe → organisme → population", evolution: "Moléculaire → cellulaire → organisme → espèce → écosystème" },
      { feature: "Prédictions falsifiables", berm: "30+ prédictions verrouillées et testables", evolution: "« Lapin dans le Précambrien » et des milliers d'autres" },
      { feature: "Excès de contenu empirique", berm: "Chaque vérification révèle PLUS que ce qui était prédit", evolution: "Chaque découverte de fossile/gène révèle des connexions inattendues" },
    ],
    analogyCritical: "DIFFÉRENCE CRITIQUE : L'évolution possède une vérification INDÉPENDANTE par séquençage de l'ADN — une méthodologie entièrement différente qui confirme les mêmes phylogénies prédites par la morphologie, la paléontologie et la biogéographie. BERM manque de cette seconde méthode de vérification indépendante. La pièce manquante la plus importante est la preuve INTERVENTIONNELLE : démontrer que la réduction de l'exposition aux EMF produit une amélioration mesurable de la santé chez l'humain. Sans cela, BERM reste dans la zone entre « mécanistiquement convaincant » et « cliniquement prouvé ».",

    strengthsTitle: "Ce que BERM fait bien",
    strengths: [
      "Génère des prédictions vérifiées avant que les preuves ne soient rassemblées (progressif, non accommodatif)",
      "Chaque traitement efficace contre les conditions prédites par BERM cible la cascade Ca²⁺ (convergence pharmacologique)",
      "La preuve génétique (CACNA1C → réponse EMF) confirme indépendamment le mécanisme central",
      "Consilience multi-niveaux de la physique quantique à l'épidémiologie des populations",
      "Spécifie des conditions de falsification claires à quatre niveaux de sévérité",
      "Produit un excès de contenu empirique — chaque vérification révèle plus que ce qui était prédit",
    ],

    weaknessesTitle: "Ce qui manque encore à BERM",
    weaknesses: [
      "Aucune intervention décisive dans un même protocole reliant la réduction mesurée de l'exposition à l'endpoint humain prédit",
      "L'universalité du Ca²⁺ crée un risque de faux positifs — certaines « convergences » peuvent être triviales",
      "Plusieurs ponts décisifs restent ouverts: noyau tissulaire L2, transfert vers les organes, CatSper et calibration populationnelle",
      "L'épidémiologie au niveau de la population est corrélative, non causale",
      "Pas de méthode de vérification indépendante (équivalent du séquençage ADN pour l'évolution)",
      "Les études financées par l'industrie ne trouvent systématiquement aucun effet, créant un paysage de preuves contesté",
    ],

    verdictTitle: "Verdict épistémique",
    verdictText: "BERM est un programme de recherche génératif et falsifiable, non une théorie démontrée. Sa force actuelle est la convergence au niveau des composants entre physique, biologie cellulaire, endocrinologie et observations populationnelles. Sa faiblesse centrale est l'absence d'une intervention calibrée, dans un même protocole, reliant entrée physique, réponse tissulaire et endpoint humain. Une expérience de blocage peut tester un médiateur proposé; elle ne valide ni ne réfute à elle seule toutes les branches du BERM.",
    verdictCTA: "Examiner les preuves composantes et les ponts ouverts →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "Répartition de la charge probante",
    burdenLead: "Les preuves composantes restreignent les tests restants, mais n'inversent pas la charge de la preuve pour les ponts inter-échelles non mesurés.",
    burdenBefore: "Une affirmation générale telle que « les CEM causent une maladie » est trop peu spécifiée pour tester un mécanisme multi-étapes. Le protocole d'exposition, les variables d'état, le médiateur et l'endpoint doivent être fixés avant le test causal.",
    burdenAfter: "Cadrage BERM: identifier la transition testée, préserver son protocole et ses variables d'état, puis comparer le graphe causal complet aux alternatives. Le soutien de composants voisins ne remplace pas la transition manquante.",
    burdenSteps: [
      { step: "1. Frontière théorique explicite", detail: "La métrique de Lindgren (2025) est la prémisse ; la fermeture χ de BERM et l'opérateur L2 géométrie-observable restent proposés et non calibrés. [[ref:tang2024|Tang 2024]] est une preuve S4 distincte, pas une dérivation du pont." },
      { step: "2. Biochimie vérifiée", detail: "VGCC → Ca²⁺ → CaM → CaMKII → cascades multiples — biochimie de base, niveau manuel" },
      { step: "3. La pharmacologie converge", detail: "Chaque traitement efficace cible un composant de la cascade Ca²⁺ — éthosuximide, gabapentine, vérapamil, mélatonine, lithium, bumétanide" },
      { step: "4. La génétique confirme", detail: "Le génotype CACNA1C module la réponse EMF ([[ref:sousouri2025|Sousouri 2025]], ECR). Les mutations CaMKII produisent les phénotypes prédits par BERM ([[ref:kury2017_camk2|Küry 2017]])" },
      { step: "5. Couches intermédiaires vérifiées", detail: "BHE, TAB, axe HPA, cellule β, hypothalamus, cortisol-hippocampe, cellule de Leydig, mastocyte — chacune confirmée indépendamment" },
      { step: "6. Épidémiologie cohérente", detail: "54 pays R²=0,851, [[ref:klimentidis2010|8 espèces de Klimentidis]] (p=10⁻⁷), données Amish/Mennonites — cohérence entre plusieurs plans d'étude" },
    ],
    burdenConclusion: "BERM est une hypothèse liée et falsifiable, pas une séquence entièrement vérifiée. La forme L2 est dérivée conditionnellement, mais noyau tissulaire, signe, délai et calibration doivent être testés avec des entrées physiques et endpoints biologiques appariés.",

    iarcTitle: "Le précédent IARC 2A",
    iarcLead: "[[ref:iarc_2a_shift|L'IARC classe le travail posté impliquant une perturbation circadienne dans le Groupe 2A]] — probablement cancérogène pour l'homme. Le mécanisme proposé est la suppression de la mélatonine. BERM identifie le même mécanisme par une autre voie d'exposition.",
    iarcPoints: [
      "L'IARC classe le travail posté impliquant une perturbation circadienne comme 2A (probablement cancérigène)",
      "Le mécanisme proposé : travail posté → suppression de la mélatonine → risque de cancer hormonodépendant↑",
      "Connexion BERM : EMF → suppression de la mélatonine est le MÊME mécanisme (VK3 : PGC → mélatonine↓)",
      "Si l'IARC accepte la suppression de la mélatonine par perturbation circadienne comme preuve de niveau 2A pour le cancer, alors EMF → suppression de la mélatonine devrait avoir le même poids",
      "Ce n'est pas une spéculation BERM : c'est l'application cohérente de la logique propre de l'IARC",
    ],
    iarcStats: [
      { label: "Travailleurs de nuit — cancer du sein", value: "OR 2,34" },
      { label: "Travail de nuit intensif — cancer du sein", value: "OR 2,66" },
    ],
    iarcQuestion: "Question clé : pourquoi la perturbation circadienne par le travail posté est-elle classée 2A, alors que la perturbation circadienne par les EMF n'est que 2B ?",

    pemfTitle: "Le paradoxe PEMF : quand les EMF guérissent",
    pemfLead: "[[ref:pemf_bone_fda_review_2020|La thérapie PEMF est approuvée par la FDA pour la non-consolidation des fractures]]. BERM propose une hormèse dépendante des paramètres pour rapprocher protocoles thérapeutiques et rapports d'effets nocifs. C'est une hypothèse de fermeture χ testable, non dérivée de la géométrie de Lindgren.",
    pemfParadox: [
      "Les PEMF favorisent la croissance osseuse, réduisent l'activité ostéoclastique et diminuent l'inflammation",
      "Cela semble CONTREDIRE BERM : « si les EMF sont nocifs, pourquoi les PEMF guérissent-ils ? »",
    ],
    pemfResolutionTitle: "Proposition BERM : hormèse dépendante des paramètres",
    pemfResolution: [
      "Les canaux Ca²⁺ médient AUSSI BIEN les effets thérapeutiques QUE nocifs",
      "Paramètres contrôlés (fréquence, intensité, durée) → transitoire Ca²⁺ bénéfique",
      "Exposition chronique non contrôlée → surcharge Ca²⁺ soutenue",
      "C'est la MÊME chose que pour tout médicament : dose thérapeutique vs. dose toxique",
    ],
    pemfConclusion: [
      "BERM NE prédit PAS « tous les EMF sont nocifs »",
      "BERM prédit : le résultat dépend de la dynamique du Ca²⁺ (dose, chronologie, type cellulaire)",
      "Validation PEMF : si les PEMF agissent PAR les canaux Ca²⁺, cela CONFIRME que les EMF affectent la biologie par les canaux Ca²⁺ — l'affirmation centrale de BERM",
      "Le paradoxe disparaît : les PEMF ne sont pas une exception à BERM, mais une confirmation",
    ],
    testLabel: "Test",
    consequenceLabel: "Conséquence",
    severityLabel: "Sévérité",
    featureLabel: "Caractéristique",
    evolutionLabel: "Évolution",
    beforeLabel: "Avant",
    afterLabel: "Après",
    zapffeTitle: "", zapffeLead: "", zapffeItems: [] as never[], zapffeConclusion: "",
    paradigmTitle: "", paradigmLead: "", paradigmItems: [] as never[], paradigmConclusion: "",
    contingencyTitle: "", contingencyLead: "", contingencyItems: [] as never[], contingencyConclusion: "",
    predictionsTitle: "", predictionItems: [] as never[],
  },

  ko: {
    title: "인식론",
    subtitle:
      "BERM은 어떤 종류의 과학적 주장인가? 이 페이지는 반증 가능성과 연구 프로그램 기준으로 도출 구조, 직접 구성요소 근거, 구성된 수렴, 미해결 척도 간 연결을 구분한다.",
    epistapegeLink: "BERM이 Epistapege에서 구조적 비탐지를 모델링하는 방식 보기",
    cautionText:
      "이 페이지는 BERM이 증명되었다고 주장하지 않습니다. 표준 인식론적 기준 — 공명적 일치, 반증 가능성, 진보적 vs. 퇴행적 연구 프로그램 — 을 적용하여 모델이 어디에 위치하는지, 그리고 이를 발전시키거나 파괴하는 데 어떤 증거가 필요한지를 평가합니다.",

    lakatosTitle: "무엇이 이론을 과학적으로 만드는가?",
    lakatosLead: "칼 포퍼는 이론이 반증 가능한 경우에만 과학적이라고 주장했다. 임레 라카토슈는 이를 정교화했다: 개별 실험은 연구 프로그램을 죽일 수 없다 — 중요한 것은 프로그램이 진보적(검증된 예측을 생성)인지 퇴행적(알려진 사실만 사후적으로 수용)인지이다.",
    lakatosPoints: [
      { criterion: "반증 가능성 (포퍼)", description: "이론은 파괴될 조건을 명시해야 한다", bermStatus: "BERM은 모델 붕괴(ETH 니모디핀-5G)부터 임상적 무관련성(EMF 감소로 혜택 없음)까지 4단계의 반증 수준을 명시한다" },
      { criterion: "새로운 예측 (라카토슈)", description: "이론은 관찰되기 전에 사실을 예측해야 한다 — 알려진 것을 설명하는 것이 아니라", bermStatus: "BERM은 CACNA1C 유전형 조절([[ref:sousouri2025|Sousouri 2025]] 확인), ELF 프라이밍 VGCC 발현([[ref:sun2016_elf_vgcc|Sun 2016]] 확인), SAR보다 펄스 변조가 더 중요함([[ref:lopez_martin_2009|Lopez-Martin 2009]] 확인)을 예측했다" },
      { criterion: "잉여 경험적 내용", description: "검증된 예측은 이론이 명시한 것 이상을 드러내야 한다", bermStatus: "각 검증은 예상 밖 내용을 만들었다. [[ref:sousouri2025|Sousouri]]는 수면과 각성 효과를 모두, [[ref:lopez_martin_2009|Lopez-Martin]]은 펄스 변조 특이성을, [[ref:sun2016_elf_vgcc|Sun]]은 8~10일의 극적인 Ca²⁺ 증가를 발견했다" },
      { criterion: "진보적 문제 이동", description: "연구 프로그램은 각 발견에서 일관되게 새로운 검증 가능한 예측을 생성한다", bermStatus: "현재 카운트: TFR, 모듈롬, SIDS, 신경, 금속, 체인, T형 범주에 걸쳐 30개 이상의 잠긴 예측" },
    ],

    consilienceTitle: "공명적 일치: 독립적 증거의 수렴",
    consilienceLead: "윌리엄 휴얼은 확인의 가장 강력한 형태를 설명하기 위해 '공명적 일치'라는 용어를 만들었다: 독립적인 분야에서 다른 연구자들이 다른 방법으로 수집한 증거가 모두 같은 결론에 수렴할 때. 이것이 진화론을 점성술과 구별하는 것이다 — 둘 다 관찰을 '설명'하지만, 진화론만이 공명적 일치를 보여준다.",
    consilienceLevels: [
      {
        level: "강한 공명적 일치",
        color: "green",
        examples: [
          "이론 전제(Lindgren 2025 계량) ↔ 도출된 χ_geo와 조건부 반응 연산자[조직 커널 미보정] ↔ Ca²⁺ 약리학 증거",
          "유전학 ([[ref:sousouri2025|CACNA1C, Sousouri 2025, ETH Zurich 이중 맹검]]) ↔ 실험적 ([[ref:lopez_martin_2006|Lopez-Martin 발작]])",
          "역학 ([[ref:klimentidis2010|Klimentidis 8종 비만, p=10⁻⁷]]) ↔ 병리학 (SIDS 뇌간 5-HT 결핍)",
          "비교 생물학 (센티넬 종의 감소) ↔ 임상 (신생아 Q → ∞ 예측)",
        ],
      },
      {
        level: "중간 공명적 일치",
        color: "blue",
        examples: [
          "ELF 프라이밍 메커니즘 ([[ref:sun2016_elf_vgcc|Sun 2016]]) ↔ 가바펜틴이 이를 차단 ([[ref:eroglu_2009_cell|Eroglu 2009 Cell]]) ↔ 가바펜틴 처방이 전력망 밀도를 따름",
          "PGC ↔ 멜라토닌 (r=0.569) ↔ 송과체 적출 → 부정맥 ↔ 교대근무 암 분류 ([[ref:iarc_2a_shift|IARC 2A]])",
          "수면 부족 → 간질양 활동 (임상) ↔ EMF → 멜라토닌↓ (동물) ↔ GABA 성숙 타임라인 (신생아)",
        ],
      },
      {
        level: "약한 공명적 일치 (보편성 위험)",
        color: "amber",
        examples: [
          "Ca²⁺는 편재한다 — 사실상 모든 생리학적 과정에 나타난다",
          "'하나의 분모를 가진 25가지 유행병'은 특정 EMF 인과관계가 아니라 Ca²⁺의 보편적 역할을 부분적으로 반영할 수 있다",
          "일부 수렴은 의미 있는 확인이 아니라 자명하게 참일 수 있다",
          "이것이 모델의 주요 인식론적 위험이며 — 잡음과 구별되어야 한다",
        ],
      },
    ],

    falsificationTitle: "4단계 반증",
    falsificationLead: "진보적 연구 프로그램은 형식적인 절차가 아닌, 경험적 판정에 대한 진정한 헌신으로서 무엇이 그것을 파괴할지를 명시한다. BERM은 완전한 모델 붕괴부터 임상적 무관련성까지 4가지 수준을 식별한다.",
    falsificationTiers: [
      {
        level: "수준 1 — 모델 붕괴",
        test: "ETH Zurich 니모디핀-5G: L형 Ca²⁺ 차단제가 EMF 수면 효과를 막지 못함",
        consequence: "VGCC가 주요 EMF 표적이 아님 → 전체 Ca²⁺ 캐스케이드가 붕괴 → BERM은 핵심 메커니즘을 잃음",
        severity: "최종적 — 회복 불가능",
      },
      {
        level: "수준 2 — 환경 인자 제거",
        test: "아미시 커뮤니티가 미국 주류 인구와 동일한 만성 질환 추세를 보임",
        consequence: "저EMF 인구가 더 건강하지 않다면, EMF는 중요한 동인이 아님 → BERM은 올바른 메커니즘을 식별했으나 잘못된 환경 트리거",
        severity: "심각 — 메커니즘은 생존하나 임상 논지는 사망",
      },
      {
        level: "수준 3 — 핵심 실험 실패",
        test: "[[ref:lopez_martin_2006|Lopez-Martin 피크로톡신 + GSM 900 MHz 실험]] 재현에서 발작이 발생하지 않음",
        consequence: "역치하 EMF × GABA성 상호작용의 유일한 직접 실험적 증거가 사라짐 → 핵심 예측 미확인",
        severity: "상당 — 실험적 기반을 약화시키지만 메커니즘적 또는 유전적 증거를 제거하지 않음",
      },
      {
        level: "수준 4 — 임상적 무관련성",
        test: "포괄적인 EMF 감소 중재가 증상이 있는 피험자에게 건강상 혜택을 보이지 않음",
        consequence: "모델이 메커니즘적으로 정확하지만 임상적으로 무의미할 수 있음 → 정확하지만 실행 불가능",
        severity: "중간 — 실용적 가치 없는 메커니즘적 진실",
      },
    ],

    analogyTitle: "진화론 유추",
    analogyLead: "BERM은 자연선택에 의한 진화론과 구조적 특징을 공유한다 — 둘 다 관찰하기 전에 무엇이 발견되어야 하는지를 제약하는 힘에 있는 생성적 메커니즘이다.",
    analogyRows: [
      { feature: "생성적 메커니즘", berm: "EMF → VGCC → Ca²⁺ → 캐스케이드", evolution: "변이 → 선택 → 적응" },
      { feature: "관찰 전에 예측", berm: "[[ref:sousouri2025|Sousouri 2025]] 이전에 CACNA1C 조절을 예측", evolution: "틱탈릭 전에 중간 화석을 예측" },
      { feature: "탐색 공간 제약", berm: "모든 효과적인 치료는 Ca²⁺ 캐스케이드를 표적으로 해야 함", evolution: "모든 상동 구조는 발생 유전자를 공유해야 함" },
      { feature: "다층적 수렴", berm: "물리학 → 분자 → 세포 → 장기 → 유기체 → 집단", evolution: "분자 → 세포 → 유기체 → 종 → 생태계" },
      { feature: "반증 가능한 예측", berm: "30개 이상의 잠긴 검증 가능한 예측", evolution: "「캄브리아기의 토끼」와 수천 개의 다른 것들" },
      { feature: "잉여 경험적 내용", berm: "각 검증은 예측된 것 이상을 드러낸다", evolution: "각 화석/유전자 발견은 예상치 못한 연결을 드러낸다" },
    ],
    analogyCritical: "결정적 차이: 진화는 DNA 시퀀싱을 통한 독립적 검증을 가지고 있다 — 형태학, 고생물학, 생물지리학이 예측하는 것과 동일한 계통을 확인하는 완전히 다른 방법론. BERM에는 이 두 번째 독립적 검증 방법이 결여되어 있다. 가장 중요한 빠진 조각은 개입적 증거이다: EMF 노출 감소가 인간에서 측정 가능한 건강 개선을 산출함을 입증하라. 이것 없이, BERM은 '메커니즘적으로 설득력 있는' 것과 '임상적으로 증명된' 것 사이의 영역에 머문다.",

    strengthsTitle: "BERM이 잘하는 것",
    strengths: [
      "증거가 수집되기 전에 검증된 예측을 생성한다 (진보적, 순응적이 아닌)",
      "BERM이 예측한 조건에 대한 모든 효과적인 치료는 Ca²⁺ 캐스케이드를 표적으로 한다 (약리학적 수렴)",
      "유전적 증거 (CACNA1C → EMF 반응)가 핵심 메커니즘을 독립적으로 확인한다",
      "양자물리학에서 집단 역학까지 다층적 공명적 일치",
      "4가지 심각도 수준에서 명확한 반증 조건을 규정한다",
      "잉여 경험적 내용을 산출한다 — 각 검증은 예측된 것 이상을 드러낸다",
    ],

    weaknessesTitle: "BERM에 아직 부족한 것",
    weaknesses: [
      "측정된 노출 감소를 예측된 인간 종말점과 잇는 결정적인 동일 프로토콜 중재가 없음",
      "Ca²⁺의 보편성이 위양성 위험을 만든다 — 일부 '수렴'은 자명할 수 있다",
      "L2 조직 커널, 장기 전달, CatSper, 집단 보정 등 여러 결정적 연결이 미해결",
      "집단 수준 역학은 상관적이지 인과적이지 않다",
      "독립적 검증 방법 없음 (진화에서의 DNA 시퀀싱에 상당하는 것)",
      "산업 자금 연구는 일관되게 효과를 발견하지 않아 논란이 있는 증거 지형을 만든다",
    ],

    verdictTitle: "인식론적 평결",
    verdictText: "BERM은 생성적이고 반증 가능한 연구 프로그램이며 증명된 이론은 아니다. 현재의 강점은 물리학, 세포생물학, 내분비학, 집단 관찰 사이의 구성요소 수준 수렴이다. 핵심 약점은 보정된 동일 프로토콜의 물리 입력→조직 반응→인간 종말점 중재로 구성요소를 아직 연결하지 못한 점이다. 차단 실험은 하나의 제안 매개자를 검사할 수 있지만 모든 BERM 분기를 단독으로 검증하거나 붕괴시키지 않는다.",
    verdictCTA: "구성요소 근거와 미해결 연결 보기 →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "근거 책임의 배분",
    burdenLead: "구성요소 근거는 남은 검사를 좁히지만 측정되지 않은 척도 간 연결에 대한 입증 책임을 뒤집지 않는다.",
    burdenBefore: "'EMF가 질병을 일으킨다'는 일반 주장은 다단계 메커니즘 검사에 지나치게 불명확하다. 해석 가능한 인과 검사를 위해 노출 프로토콜, 상태변수, 매개자, 종말점을 먼저 고정해야 한다.",
    burdenAfter: "BERM 틀에서는 검사할 전이를 지정하고 해당 프로토콜과 상태변수를 보존한 뒤 전체 인과 그래프를 대안과 비교한다. 인접 구성요소의 지지는 누락된 전이를 대신하지 않는다.",
    burdenSteps: [
      { step: "1. 이론 경계 명시", detail: "Lindgren 2025 계량은 전제이고 BERM χ 폐쇄와 기하학-관측량 L2 연산자는 미보정 제안이다. [[ref:tang2024|Tang 2024]]는 별도의 S4 증거이지 이 연결의 도출이 아니다." },
      { step: "2. 생화학 검증됨", detail: "VGCC → Ca²⁺ → CaM → CaMKII → 다중 캐스케이드 — 기초 생화학, 교과서 수준" },
      { step: "3. 약리학 수렴", detail: "모든 효과적인 치료는 Ca²⁺ 캐스케이드 구성 요소를 표적으로 한다 — 에토숙시미드, 가바펜틴, 베라파밀, 멜라토닌, 리튬, 부메타니드" },
      { step: "4. 유전학 확인", detail: "CACNA1C 유전형은 EMF 반응을 조절한다 ([[ref:sousouri2025|Sousouri 2025]] RCT). CaMKII 돌연변이는 BERM이 예측한 표현형을 만든다 ([[ref:kury2017_camk2|Küry 2017]])" },
      { step: "5. 중간 층 검증됨", detail: "BBB, BAT, HPA 축, β세포, 시상하부, 코르티솔-해마, 라이디히 세포, 비만세포 — 각각 독립적으로 확인" },
      { step: "6. 역학적 일관성", detail: "54개국 R²=0.851, [[ref:klimentidis2010|Klimentidis 8종]] (p=10⁻⁷), 아미시/메노나이트 자료 — 여러 설계에서 일관됨" },
    ],
    burdenConclusion: "BERM은 완전히 검증된 연쇄가 아니라 반증 가능한 가설이다. L2 연산자 형태는 조건부로 도출되지만 조직 커널, 부호, 지연과 보정은 매칭된 물리 입력과 생물학적 종점으로 검증해야 한다.",

    iarcTitle: "IARC 2A 선례",
    iarcLead: "[[ref:iarc_2a_shift|IARC는 일주기 교란을 수반하는 교대근무를 그룹 2A]](인체에 아마도 발암성)로 분류한다. 제안된 메커니즘은 멜라토닌 억제이며, BERM은 다른 노출 경로를 통한 같은 메커니즘을 식별한다.",
    iarcPoints: [
      "IARC는 일주기 교란을 수반하는 교대근무를 그룹 2A(아마도 발암성)로 분류",
      "제안된 메커니즘: 교대근무 → 멜라토닌 억제 → 호르몬 의존성 암 위험↑",
      "BERM 연결: EMF → 멜라토닌 억제는 동일한 메커니즘 (VK3: PGC → 멜라토닌↓)",
      "IARC가 일주기 교란을 통한 멜라토닌 억제를 암의 2A 수준 근거로 인정한다면 EMF → 멜라토닌 억제도 같은 가중치를 가져야 한다",
      "이는 BERM의 추측이 아니라 IARC 자체 논리를 일관되게 적용한 것이다",
    ],
    iarcStats: [
      { label: "야간근무 근로자 — 유방암", value: "OR 2.34" },
      { label: "고강도 야간근무 — 유방암", value: "OR 2.66" },
    ],
    iarcQuestion: "핵심 질문: 왜 교대근무로 인한 일주기 교란은 2A로 분류되는데, EMF로 인한 일주기 교란은 2B에 머무는가?",

    pemfTitle: "PEMF 역설: EMF가 치유할 때",
    pemfLead: "[[ref:pemf_bone_fda_review_2020|PEMF 치료는 골절 불유합에 FDA 승인을 받았다]]. BERM은 치료 프로토콜과 위해 보고를 조화시키는 후보로 매개변수 의존 호르메시스를 제안한다. 이는 검증 가능한 χ 폐쇄 가설이며 Lindgren 기하학에서 도출된 결과가 아니다.",
    pemfParadox: [
      "PEMF는 골 성장을 촉진하고, 파골세포 활성을 감소시키며, 염증을 줄인다",
      "이것은 BERM과 모순되는 것처럼 보인다: 'EMF가 해롭다면, 왜 PEMF는 치유하는가?'",
    ],
    pemfResolutionTitle: "BERM 제안: 매개변수 의존 호르메시스",
    pemfResolution: [
      "Ca²⁺ 채널은 치료적 효과와 유해한 효과를 모두 매개한다",
      "제어된 파라미터 (주파수, 강도, 지속 시간) → 유익한 Ca²⁺ 일시적 변동",
      "만성적 비제어 노출 → 지속적 Ca²⁺ 과부하",
      "이것은 모든 약물과 동일하다: 치료 용량 vs. 독성 용량",
    ],
    pemfConclusion: [
      "BERM은 '모든 EMF가 유해하다'고 예측하지 않는다",
      "BERM의 예측: 결과는 Ca²⁺ 역학(용량, 타이밍, 세포 유형)에 따라 달라진다",
      "PEMF가 Ca²⁺ 채널을 통해 작용한다면 EMF가 Ca²⁺ 채널을 통해 생물학에 영향을 준다는 BERM의 핵심 주장을 확인한다",
      "역설은 해소된다. PEMF는 BERM의 예외가 아니라 확인이다",
    ],
    testLabel: "테스트",
    consequenceLabel: "결과",
    severityLabel: "심각도",
    featureLabel: "특징",
    evolutionLabel: "진화론",
    beforeLabel: "이전",
    afterLabel: "이후",
    zapffeTitle: "", zapffeLead: "", zapffeItems: [] as never[], zapffeConclusion: "",
    paradigmTitle: "", paradigmLead: "", paradigmItems: [] as never[], paradigmConclusion: "",
    contingencyTitle: "", contingencyLead: "", contingencyItems: [] as never[], contingencyConclusion: "",
    predictionsTitle: "", predictionItems: [] as never[],
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
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EpistemologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const colorMap: Record<string, { border: string; bg: string }> = {
    green: { border: "border-green-500/20", bg: "bg-green-500/5" },
    blue: { border: "border-blue-500/20", bg: "bg-blue-500/5" },
    amber: { border: "border-amber-500/20", bg: "bg-amber-500/5" },
  };

  const tierColors = [
    "border-red-500/20 bg-red-500/5",
    "border-amber-500/20 bg-amber-500/5",
    "border-yellow-500/20 bg-yellow-500/5",
    "border-blue-500/20 bg-blue-500/5",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <PageHeader icon={Scale} title={d.title} subtitle={d.subtitle} />
      <div className="-mt-8 mb-10">
        <Link href={`/${locale}/civilization/epistapege`} className="text-sm font-medium text-accent hover:underline">
          {d.epistapegeLink} →
        </Link>
      </div>

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Lakatos criteria */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.lakatosTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.lakatosLead}</p>
        <div className="space-y-3">
          {d.lakatosPoints.map((point, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <h3 className="font-semibold text-sm mb-1">{point.criterion}</h3>
              <p className="text-xs text-foreground-muted mb-2">{point.description}</p>
              <div className="rounded border border-green-500/20 bg-green-500/5 p-2.5">
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-0.5">BERM</p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  <InlineReferenceText text={point.bermStatus} locale={locale} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consilience */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.consilienceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.consilienceLead}</p>
        <div className="space-y-4">
          {d.consilienceLevels.map((cl, i) => {
            const colors = colorMap[cl.color];
            return (
              <div key={i} className={`rounded-lg border p-4 ${colors.border} ${colors.bg}`}>
                <h3 className="font-semibold text-sm mb-2">{cl.level}</h3>
                <ul className="space-y-1.5">
                  {cl.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-foreground-muted leading-relaxed pl-3 border-l-2 border-card-border">
                      <InlineReferenceText text={ex} locale={locale} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Falsification */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.falsificationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.falsificationLead}</p>
        <div className="space-y-3">
          {d.falsificationTiers.map((tier, i) => (
            <div key={i} className={`rounded-lg border p-4 ${tierColors[i]}`}>
              <p className="text-sm font-semibold mb-3">{tier.level}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {d.testLabel}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    <InlineReferenceText text={tier.test} locale={locale} />
                  </p>
                </div>
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {d.consequenceLabel}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tier.consequence}</p>
                </div>
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {d.severityLabel}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tier.severity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evolution analogy */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.analogyTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.analogyLead}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.featureLabel}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">BERM</th>
                <th className="text-left py-2 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.evolutionLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {d.analogyRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-foreground-muted font-medium">{row.feature}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">
                    <InlineReferenceText text={row.berm} locale={locale} />
                  </td>
                  <td className="py-2.5 text-foreground-muted">{row.evolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted font-medium">{d.analogyCritical}</p>
        </div>
      </section>

      {/* Strengths & weaknesses */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-4">{d.strengthsTitle}</h2>
            <div className="space-y-2">
              {d.strengths.map((s, i) => (
                <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                  <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                  <p><InlineReferenceText text={s} locale={locale} /></p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">{d.weaknessesTitle}</h2>
            <div className="space-y-2">
              {d.weaknesses.map((w, i) => (
                <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                  <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                  <p>{w}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.verdictTitle}</h2>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-sm leading-relaxed text-foreground-muted mb-4">{d.verdictText}</p>
          <Link href={`${prefix}${d.verdictHref}`} className="text-sm text-accent hover:underline font-medium">
            {d.verdictCTA}
          </Link>
        </div>
      </section>

      {/* Burden of Proof */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.burdenTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.burdenLead}</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
              {d.beforeLabel}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.burdenBefore}</p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">
              {d.afterLabel}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.burdenAfter}</p>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {d.burdenSteps.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0 mt-0.5">✓</span>
              <div>
                <span className="font-semibold">{s.step}:</span>{" "}
                <InlineReferenceText text={s.detail} locale={locale} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.burdenConclusion}</p>
        </div>
      </section>

      {/* IARC 2A Precedent (VK42) */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.iarcTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          <InlineReferenceText text={d.iarcLead} locale={locale} />
        </p>
        <div className="space-y-2 mb-6">
          {d.iarcPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5">-</span>
              <p><InlineReferenceText text={point} locale={locale} /></p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          {d.iarcStats.map((stat, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted font-medium">{d.iarcQuestion}</p>
        </div>
      </section>

      {/* PEMF Paradox (VK49) */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pemfTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          <InlineReferenceText text={d.pemfLead} locale={locale} />
        </p>
        <div className="space-y-2 mb-4">
          {d.pemfParadox.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-red-500 shrink-0 mt-0.5">!</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3">{d.pemfResolutionTitle}</h3>
          <div className="space-y-2">
            {d.pemfResolution.map((point, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-green-500 shrink-0 mt-0.5">-</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <div className="space-y-2">
            {d.pemfConclusion.map((point, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-accent shrink-0 mt-0.5">-</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zapffe Recursion */}
      {d.zapffeItems?.length > 0 && (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">{d.zapffeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.zapffeLead}</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {d.zapffeItems.map((z) => (
            <div key={z.mechanism} className="rounded-lg border border-card-border bg-card-bg p-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-semibold text-sm">{z.mechanism}</span>
                <span className="font-mono text-xs text-foreground-muted">{z.score}</span>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">{z.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
          <p className="text-sm leading-relaxed">{d.zapffeConclusion}</p>
        </div>
      </section>
      )}

      {/* Paradigm Blindness */}
      {d.paradigmItems?.length > 0 && (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">{d.paradigmTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.paradigmLead}</p>
        <div className="space-y-4 mb-6">
          {d.paradigmItems.map((p) => (
            <div key={p.framework} className="rounded-lg border border-card-border bg-card-bg p-4">
              <h3 className="font-semibold text-sm mb-2">{p.framework}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed mb-2">{p.blind}</p>
              <p className="text-xs text-foreground-muted leading-relaxed italic">{p.strategy}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
          <p className="text-sm leading-relaxed">{d.paradigmConclusion}</p>
        </div>
      </section>
      )}

      {/* Political Contingency */}
      {d.contingencyItems?.length > 0 && (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">{d.contingencyTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.contingencyLead}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {d.contingencyItems.map((c, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-3 px-3 text-xs font-semibold align-top w-1/3">{c.claim}</td>
                  <td className="py-3 px-3 text-xs text-foreground-muted align-top">{c.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
          <p className="text-sm leading-relaxed">{d.contingencyConclusion}</p>
        </div>
      </section>
      )}

      {/* Testable Predictions */}
      {d.predictionItems?.length > 0 && (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{d.predictionsTitle}</h2>
        <div className="space-y-3">
          {d.predictionItems.map((pred: string, i: number) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4 flex gap-3">
              <span className="font-mono text-xs font-bold text-foreground-muted shrink-0">{i + 1}.</span>
              <p className="text-xs text-foreground-muted leading-relaxed">{pred}</p>
            </div>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
