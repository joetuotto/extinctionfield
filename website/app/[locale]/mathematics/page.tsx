import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { MathBlock } from "@/components/MathBlock";
import { Derivation } from "@/components/Derivation";

const t = {
  en: {
    meta: {
      title: "Mathematics - Extinction Field",
      description:
        "Complete mathematical derivation of the BERM model from Lindgren geometry to TFR prediction. Every step is verifiable.",
    },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgren geometry" },
      { id: "chi", num: "§2", label: "Selection rule χ(Ā)" },
      { id: "two-channel", num: "§3", label: "Two-channel model" },
      { id: "biocap", num: "§4", label: "Biological capacity" },
      { id: "behavioral", num: "§5", label: "Behavioral factor" },
      { id: "cultural", num: "§6", label: "Cultural / compensation" },
      { id: "jacobian", num: "§7", label: "Jacobian" },
      { id: "locked", num: "§8", label: "Locked predictions" },
      { id: "falsification", num: "§9", label: "Falsification conditions" },
      { id: "pharmacological", num: "§10", label: "Pharmacological validation" },
    ],
    pageTitle: "Mathematical Foundation",
    pageSubtitle:
      'Complete derivation of the BERM model from Lindgren geometry to TFR prediction. Every equation is derivable from the previous one. Click "Full derivation" to see intermediate steps.',

    // S1 Lindgren
    s1Title: "Lindgren Geometry",
    s1Intro:
      "In the framework of Lindgren, Kovacs & Liukkonen (2025), the electromagnetic potential is part of spacetime geometry. The metric tensor absorbs the EM four-potential:",
    s1After:
      "This means the electromagnetic field changes the geometry in which all physical processes occur — including biological ion channels. Maxwell’s equations emerge as Bianchi identities of this geometry.",
    s1d1: "In standard GR the metric is dynamical:",
    s1d2: "In Lindgren’s framework, the EM potential replaces the gravitational perturbation:",
    s1d3: "where κ is a coupling constant (normalized to 1 in suitable units).",
    s1d4: "Maxwell’s equations follow from the Bianchi identities:",
    s1d5: "Vassallo et al. (2025) validated this derivation independently.",

    // S2 Chi
    s2Title: "Selection Rule χ(Ā)",
    s2Intro:
      "When the metric is linearized around a background Ā, the biologically relevant response to a perturbation",
    s2IntroEnd: "is:",
    s2After:
      "In zero background (Ā = 0) there is no linear response. At the cell membrane (Ā ≈ 7 × 10⁶ V/m) the response is maximal.",
    s2d1: "Linearize g_μν around background ġ = η + Ā⊗Ā:",
    s2d2: "where:",
    s2d3: "First order (linear response):",
    s2d4:
      "The biologically relevant quantity is the relative magnitude of the metric perturbation:",
    s2d5: "This gives the selection rule:",
    s2d6: "Properties:",
    s2d7: "Cell membrane:",
    s2d8: "Cells are MAXIMALLY sensitive to external EMF perturbation.",

    // S3 Two-channel
    s3Title: "Two-Channel Model",
    s3Intro:
      "Total exposure is the sum of two channels where the personal channel is modulated by the selection rule:",
    s3d1: "Ambient = base stations + Wi-Fi + IoT (infrastructure level)",
    s3d2: "Personal = phone + earbuds + watches (personal devices)",
    s3d3: "Ambient is the background Ā that determines χ.",
    s3d4: "Personal is the perturbation a whose biological response depends on χ(Ā).",
    s3d5: "When Ā = 0 (Amish): total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ Personal devices produce no biological response.",
    s3d7: "When Ā → ∞ (saturated city): total ≈ ambient + 1 × personal",
    s3d8: "→ Personal adds at full magnitude.",
    s3d9: "Cumulative exposure is the historical sum:",
    s3d10: "where start is the country’s EMF history start year (e.g. Finland 1991).",

    // S4 BioCap
    s4Title: "Biological Capacity",
    s4Intro:
      "Biological capacity declines exponentially as a function of cumulative exposure, with a threshold below which repair mechanisms compensate:",
    s4Params: "(pre-EMF baseline TFR),",
    s4Params2: "(decline parameter),",
    s4Params3: "(threshold).",
    s4d1:
      "Exponential decline follows from the assumption that each year’s EMF exposure produces a proportionally equal biological damage:",
    s4d2: "Integrating:",
    s4d3:
      "Threshold θ = 5 reflects biological resistance: small exposures do not exceed repair mechanism capacity.",
    s4d4:
      'a = 6.5 is calibrated: it is the approximate "natural TFR" without any EMF exposure (cf. Amish ≈ 6.5, Hutterites ≈ 9.0).',
    s4d5Link: "→ Controlled laboratory evidence for bioCap parameters",

    // S5 Behavioral
    s5Title: "Behavioral Factor",
    s5Intro:
      "The endocrine vector (testosterone, oxytocin, dopamine, cortisol) as a geometric mean:",
    s5d1: "Each hormone declines exponentially:",
    s5d2: "Geometric mean: (OT × T × DA × cort)^(1/4)",
    s5d3:
      "Geometric > arithmetic because hormones are MULTIPLICATIVE: if any one is zero, the total effect is zero.",
    s5d4: "r₂ = 0.013 is calibrated from Travison’s −1%/year testosterone decline:",
    s5d5: "If dEMF/dt ≈ 1/year → dT/T ≈ −1.3%/year ≈ Travison.",
    s5otTitle: "Biological basis of OT parameter",
    s5otIntro:
      "The OT parameter r₁ = 0.010 is not curve-fitted from data. It follows from two independent biological mechanisms that both suppress oxytocin under EMF conditions:",
    s5otRoute1Title: "Route 1 (HPA → vagal):",
    s5otRoute1:
      "EMF → cortisol↑ (Pawlak 2025, d=1.88) → vagal suppression (Porges 2001: myelinated vagus dampens HPA; chronic stress reverses this) → oxytocin↓ (ventral vagal complex → hypothalamic OT release) → social engagement↓ (Carter 2021, Feldman 2012)",
    s5otRoute2Title: "Route 2 (microbiome → endocrine):",
    s5otRoute2:
      "EMF → gut microbiome disruption (Jin 2022) → Lactobacillus↓ (incl. L. reuteri) → oxytocin↓ (Erdman & Poutahidis 2016: L. reuteri → vagus → OT↑) → testosterone↓ (Poutahidis 2014: L. reuteri → IL-17↓ → T↑) → spermatogenesis↓",
    s5otCombined:
      "The multiplicative combination OT_eff = OT_vagal × OT_microbiome is approximately exponential: OT_eff ≈ exp(−r_eff × cumEMF), where r_eff = r_vagal + r_microbiome ≈ 0.005 + 0.005 = 0.010. This is the parameter in the model.",

    // S6 Cultural
    s6Title: "Cultural Factor & Compensation",
    s6Intro: "The predicted TFR combines all three layers:",
    s6Alpha:
      "is the biologically derived compensation exponent.",
    s6d1:
      "The cultural rate is the RESIDUAL: it contains everything that bioCap and behav do not explain. Calibrated from 2024:",
    s6d2:
      "Compensation term: society partially compensates biological decline (ART, pronatalist policy, behavioral changes):",
    s6d3: "α = 0.43 derives from the biological recovery structure:",
    s6TableLayer: "Layer",
    s6TableWeight: "Weight",
    s6TableVGIC: "VGIC (immediate, reversible)",
    s6TableROS: "ROS (days–weeks)",
    s6TableDNA: "DNA (partially irreversible)",
    s6TableLeydig: "Leydig (months–years)",
    s6TableNeuron: "Neuron (permanent)",
    s6TableFooter: "α_eff = Σ(weight × α)",
    s6d4: "Effective impact:",
    s6d5: "α = 0.43 → exponent = 0.57",
    s6d6: "α = 1.0 → exponent = 0 (full compensation, no EMF effect)",
    s6d7: "α = 0.0 → exponent = 1.0 (no compensation, direct effect)",

    // S7 Jacobian
    s7Title: "Jacobian",
    s7Intro:
      "The model’s total derivative with respect to EMF is the product of six partial derivatives. If any one factor is zero, the entire chain breaks:",
    s7d1: "Each factor:",
    s7d1a: "EM field effect on radical pair → CRY channel, spin chemistry, χ_B",
    s7d1b: "Radical pair effect → ROS concentration → mitochondrial response",
    s7d1c: "ROS concentration → cell state → SDF, lipid peroxidation, protein damage",
    s7d1d: "Cell state → bioelectric state → V_mem change, ion channel dynamics",
    s7d1e:
      "Bioelectric state → reproduction → spermatogenesis, ovulation, fertilization",
    s7d1f:
      "Reproductive capacity → TFR → fecundability → TTP → ASFR → TFR",

    // S8 Locked
    s8Title: "Locked Predictions",
    s8Intro:
      "The model produces specific, locked predictions that will either come true or not. The lock is irrevocable: a prediction cannot be changed retroactively without a version number update.",
    s8Country: "Country",
    s8Year: "Year",
    s8Metric: "Metric",
    s8Central: "Central",
    s8CI: "95% CI",
    s8Locked: "Locked",
    s8Footer:
      "v17.0 — predictions frozen at git SHA. If future observations fall outside the CI, the model is falsified — not the prediction adjusted.",

    // S9 Falsification
    s9Title: "Falsification Conditions",
    s9Intro:
      "The model is explicitly falsifiable. Each condition is specific and testable:",
    s9Items: [
      {
        condition: "Lindgren’s metric is mathematically incorrect",
        detail:
          "If the derivation g_μν = η_μν + A_μA_ν is shown to be internally inconsistent or to contradict established electrodynamics, the geometric foundation fails.",
      },
      {
        condition: "VGCC blockers do not prevent EMF’s biological effects",
        detail:
          "If calcium channel blockers fail to attenuate EMF-induced ROS, SDF, or hormonal changes in controlled experiments, the primary mechanism is wrong.",
      },
      {
        condition:
          "Amish community TFR declines at the same rate as the general population",
        detail:
          "If the Amish (EMF ≈ 0) show TFR decline matching high-EMF populations, the EMF hypothesis is falsified. Current Amish TFR ≈ 6.5 is stable.",
      },
      {
        condition:
          "Sperm concentration decline stops without reduced EMF exposure",
        detail:
          "If the −1.2%/year sperm decline reverses or stabilizes while cumulative EMF continues to increase, the dose-response relationship is wrong.",
      },
      {
        condition:
          "A locked prediction fails outside its confidence interval",
        detail:
          "Any prediction in §8 that falls outside its 95% CI when the observation year arrives falsifies the model at that prediction’s scope.",
      },
    ],

    // S10 Pharmacological
    s10Title: "Pharmacological Validation Matrix",
    s10Intro:
      "Three independent pharmacological interventions provide quantitative calibration anchors for separate pathways. Each drug isolates a specific mechanism, allowing the model’s pathway structure to be tested independently.",
    s10Drug: "Drug",
    s10Target: "Target",
    s10Pathway: "Pathway",
    s10Observed: "Observed effect",
    s10Calibration: "BERM calibration",
    s10Rows: [
      {
        drug: "CCB (nifedipine)",
        target: "L-type VGCC",
        pathway: "A (VGCC→ROS→SDF)",
        observed: "90% VGCC block → −23% sperm conc.",
        calibration: "EMF disruption ≈ 6%",
      },
      {
        drug: "Rapamycin",
        target: "mTOR (85% inhibition)",
        pathway: "Sempou (mTOR→aging)",
        observed: "Lifespan +10–25% (mice)",
        calibration: "mTOR_eff × 0.15",
      },
      {
        drug: "Melatonin",
        target: "CRY/circadian",
        pathway: "C (CRY→clock→ovulation)",
        observed: "Restores circadian amplitude",
        calibration: "Night EMF fraction correction",
      },
    ],
    s10d1: "CCB calibration (pathway A):",
    s10d2:
      "This 6% effective VGCC disruption is consistent with the observed −1.2%/year sperm decline over 5 years of cumulative exposure.",
    s10d3: "Rapamycin calibration (Sempou pathway):",
    s10d4:
      "Observed mouse lifespan extension of 10–25% is consistent with partial mTOR reduction in a realistic dosing regime (not 85% sustained inhibition).",
    s10d5: "Melatonin calibration (pathway C):",
    s10d6:
      "Night EMF exposure disrupts CRY-mediated circadian signaling. Exogenous melatonin (3–5 mg) restores circadian amplitude independently of CRY, providing a pathway C bypass. If melatonin supplementation eliminates EMF-associated circadian disruption, pathway C is validated; if not, the CRY channel requires revision.",
    s10d7Link: "→ Controlled experimental evidence (laboratory mammals)",
  },
  fi: {
    meta: {
      title: "Matematiikka - Extinction Field",
      description:
        "BERM-mallin täydellinen matemaattinen johtaminen Lindgrenin geometriasta TFR-ennusteeseen. Jokainen vaihe on todennettavissa.",
    },
    sections: [
      { id: "lindgren", num: "§1", label: "Lindgrenin geometria" },
      { id: "chi", num: "§2", label: "Valintaehto χ(Ā)" },
      { id: "two-channel", num: "§3", label: "Kaksikanavamalli" },
      { id: "biocap", num: "§4", label: "Biologinen kapasiteetti" },
      { id: "behavioral", num: "§5", label: "Käyttäytymistekijä" },
      { id: "cultural", num: "§6", label: "Kulttuuri / kompensaatio" },
      { id: "jacobian", num: "§7", label: "Jakobiaani" },
      { id: "locked", num: "§8", label: "Lukitut ennusteet" },
      { id: "falsification", num: "§9", label: "Falsifiointiehdot" },
      { id: "pharmacological", num: "§10", label: "Farmakologinen validointi" },
    ],
    pageTitle: "Matemaattinen perusta",
    pageSubtitle:
      'Täydellinen johtaminen BERM-mallista Lindgrenin geometriasta TFR-ennusteeseen. Jokainen yhtälö on johdettavissa edellisestä. Klikkaa "Täysi johtaminen" nähdäksesi välivaiheet.',

    // S1 Lindgren
    s1Title: "Lindgrenin geometria",
    s1Intro:
      "Lindgrenin, Kovacsin ja Liukkosen (2025) viitekehyksessä sähkömagneettinen potentiaali on osa aika-avaruuden geometriaa. Metriikkatensori absorboi EM-nelipotentiaalin:",
    s1After:
      "Tämä tarkoittaa, että sähkömagneettinen kenttä muuttaa geometriaa, jossa kaikki fysikaaliset prosessit tapahtuvat — mukaan lukien biologiset ionikanavat. Maxwellin yhtälöt seuraavat tämän geometrian Bianchin identiteeteistä.",
    s1d1: "Standardissa yleisessä suhteellisuusteoriassa metriikka on dynaaminen:",
    s1d2: "Lindgrenin viitekehyksessä EM-potentiaali korvaa gravitaatiohäiriön:",
    s1d3: "missä κ on kytkentävakio (normalisoitu arvoon 1 sopivissa yksiköissä).",
    s1d4: "Maxwellin yhtälöt seuraavat Bianchin identiteeteistä:",
    s1d5: "Vassallo et al. (2025) validoi tämän johtamisen itsenäisesti.",

    // S2 Chi
    s2Title: "Valintaehto χ(Ā)",
    s2Intro:
      "Kun metriikka linearisoidaan taustan Ā ympärille, biologisesti merkitsevä vaste häiriölle",
    s2IntroEnd: "on:",
    s2After:
      "Nollataustassa (Ā = 0) lineaarista vastetta ei ole. Solukalvolla (Ā ≈ 7 × 10⁶ V/m) vaste on maksimaalinen.",
    s2d1: "Linearisoi g_μν taustan ġ = η + Ā⊗Ā ympärillä:",
    s2d2: "missä:",
    s2d3: "Ensimmäinen kertaluku (lineaarinen vaste):",
    s2d4:
      "Biologisesti merkitsevä suure on metriikkahäiriön suhteellinen suuruus:",
    s2d5: "Tästä saadaan valintaehto:",
    s2d6: "Ominaisuudet:",
    s2d7: "Solukalvo:",
    s2d8: "Solut ovat MAKSIMAALISESTI herkkiä ulkoiselle EMF-häiriölle.",

    // S3 Two-channel
    s3Title: "Kaksikanavamalli",
    s3Intro:
      "Kokonaisaltistus on kahden kanavan summa, jossa henkilökohtaista kanavaa moduloi valintaehto:",
    s3d1: "Ympäristö = tukiasemat + Wi-Fi + IoT (infrastruktuuritaso)",
    s3d2: "Henkilökohtainen = puhelin + kuulokkeet + kellot (henkilökohtaiset laitteet)",
    s3d3: "Ympäristö on tausta Ā, joka määrittää χ:n.",
    s3d4: "Henkilökohtainen on häiriö a, jonka biologinen vaste riippuu χ(Ā):sta.",
    s3d5: "Kun Ā = 0 (amissit): total = 0 + χ(0) × personal = 0 + 0 = 0",
    s3d6: "→ Henkilökohtaiset laitteet eivät tuota biologista vastetta.",
    s3d7: "Kun Ā → ∞ (kyllästynyt kaupunki): total ≈ ambient + 1 × personal",
    s3d8: "→ Henkilökohtainen lisää täydellä voimakkuudella.",
    s3d9: "Kumulatiivinen altistus on historiallinen summa:",
    s3d10: "missä start on maan EMF-historian aloitusvuosi (esim. Suomi 1991).",

    // S4 BioCap
    s4Title: "Biologinen kapasiteetti",
    s4Intro:
      "Biologinen kapasiteetti laskee eksponentiaalisesti kumulatiivisen altistuksen funktiona, kynnysarvon alapuolella korjausmekanismit kompensoivat:",
    s4Params: "(esi-EMF-perus-TFR),",
    s4Params2: "(laskuparametri),",
    s4Params3: "(kynnysarvo).",
    s4d1:
      "Eksponentiaalinen lasku seuraa oletuksesta, että kunkin vuoden EMF-altistus tuottaa suhteellisesti yhtä suuren biologisen vaurion:",
    s4d2: "Integroimalla:",
    s4d3:
      "Kynnysarvo θ = 5 heijastaa biologista vastustuskykyä: pienet altistukset eivät ylitä korjausmekanismien kapasiteettia.",
    s4d4:
      'a = 6.5 on kalibroitu: se on likimääräinen "luonnollinen TFR" ilman EMF-altistusta (vrt. amissit ≈ 6.5, hutteristit ≈ 9.0).',
    s4d5Link: "→ Kontrolloitu laboratorionäyttö bioCap-parametreille",

    // S5 Behavioral
    s5Title: "Käyttäytymistekijä",
    s5Intro:
      "Endokriininen vektori (testosteroni, oksitosiini, dopamiini, kortisoli) geometrisena keskiarvona:",
    s5d1: "Jokainen hormoni laskee eksponentiaalisesti:",
    s5d2: "Geometrinen keskiarvo: (OT × T × DA × cort)^(1/4)",
    s5d3:
      "Geometrinen > aritmeettinen, koska hormonit ovat MULTIPLIKATIIVISIA: jos yksikin on nolla, kokonaisvaikutus on nolla.",
    s5d4: "r₂ = 0.013 on kalibroitu Travisonin −1 %/vuosi testosteronilaskusta:",
    s5d5: "Jos dEMF/dt ≈ 1/vuosi → dT/T ≈ −1,3 %/vuosi ≈ Travison.",
    s5otTitle: "OT-parametrin biologinen perustelu",
    s5otIntro:
      "OT-parametri r₁ = 0.010 ei ole sovitettu datasta. Se seuraa kahdesta itsenäisestä biologisesta mekanismista, jotka molemmat tukahduttavat oksitosiinia EMF-olosuhteissa:",
    s5otRoute1Title: "Reitti 1 (HPA → vagaalinen):",
    s5otRoute1:
      "EMF → kortisoli↑ (Pawlak 2025, d=1,88) → vagaalinen suppressio (Porges 2001: myelinisoitu vagus vaimentaa HPA:ta; krooninen stressi kääntää tämän) → oksitosiini↓ (ventraalinen vagaalikompleksi → hypotalaaminen OT-vapautus) → sosiaalinen sitoutuminen↓ (Carter 2021, Feldman 2012)",
    s5otRoute2Title: "Reitti 2 (mikrobiomi → endokriininen):",
    s5otRoute2:
      "EMF → suolistomikrobiomin häiriö (Jin 2022) → Lactobacillus↓ (ml. L. reuteri) → oksitosiini↓ (Erdman & Poutahidis 2016: L. reuteri → vagus → OT↑) → testosteroni↓ (Poutahidis 2014: L. reuteri → IL-17↓ → T↑) → spermatogeneesi↓",
    s5otCombined:
      "Multiplikatiivinen yhdistelmä OT_eff = OT_vagal × OT_microbiome on likimain eksponentiaalinen: OT_eff ≈ exp(−r_eff × cumEMF), missä r_eff = r_vagal + r_microbiome ≈ 0,005 + 0,005 = 0,010. Tämä on mallissa käytetty parametri.",

    // S6 Cultural
    s6Title: "Kulttuuritekijä ja kompensaatio",
    s6Intro: "Ennustettu TFR yhdistää kaikki kolme kerrosta:",
    s6Alpha:
      "on biologisesti johdettu kompensaatioeksponentti.",
    s6d1:
      "Kulttuurikerroin on RESIDUAALI: se sisältää kaiken, mitä bioCap ja behav eivät selitä. Kalibroitu vuodesta 2024:",
    s6d2:
      "Kompensaatiotermi: yhteiskunta kompensoi osittain biologista laskua (koeputkihedelmöitys, pronatalismipolitiikka, käyttäytymismuutokset):",
    s6d3: "α = 0,43 johdetaan biologisesta palautumisrakenteesta:",
    s6TableLayer: "Kerros",
    s6TableWeight: "Paino",
    s6TableVGIC: "VGIC (välitön, palautuva)",
    s6TableROS: "ROS (päiviä–viikkoja)",
    s6TableDNA: "DNA (osittain palautumaton)",
    s6TableLeydig: "Leydig (kuukausia–vuosia)",
    s6TableNeuron: "Neuroni (pysyvä)",
    s6TableFooter: "α_eff = Σ(paino × α)",
    s6d4: "Efektiivinen vaikutus:",
    s6d5: "α = 0,43 → eksponentti = 0,57",
    s6d6: "α = 1,0 → eksponentti = 0 (täysi kompensaatio, ei EMF-vaikutusta)",
    s6d7: "α = 0,0 → eksponentti = 1,0 (ei kompensaatiota, suora vaikutus)",

    // S7 Jacobian
    s7Title: "Jakobiaani",
    s7Intro:
      "Mallin kokonaisderivaatta EMF:n suhteen on kuuden osittaisderivaatan tulo. Jos jokin tekijä on nolla, koko ketju katkeaa:",
    s7d1: "Kukin tekijä:",
    s7d1a: "EM-kentän vaikutus radikaalipariiin → CRY-kanava, spin-kemia, χ_B",
    s7d1b: "Radikaaliparin vaikutus → ROS-pitoisuus → mitokondriaalinen vaste",
    s7d1c: "ROS-pitoisuus → solutila → SDF, lipidiperoksidaatio, proteiinivaurio",
    s7d1d: "Solutila → biosähköinen tila → V_mem-muutos, ionikanavadynamiikka",
    s7d1e:
      "Biosähköinen tila → lisääntyminen → spermatogeneesi, ovulaatio, hedelmöitys",
    s7d1f:
      "Lisääntymiskapasiteetti → TFR → fecundability → TTP → ASFR → TFR",

    // S8 Locked
    s8Title: "Lukitut ennusteet",
    s8Intro:
      "Malli tuottaa tarkkoja, lukittuja ennusteita, jotka joko toteutuvat tai eivät. Lukitus on peruuttamaton: ennustetta ei voi muuttaa takautuvasti ilman versionumeron päivitystä.",
    s8Country: "Maa",
    s8Year: "Vuosi",
    s8Metric: "Mittari",
    s8Central: "Keskiarvo",
    s8CI: "95 % LV",
    s8Locked: "Lukittu",
    s8Footer:
      "v17.0 — ennusteet jäädytetty git SHA:ssa. Jos tulevat havainnot jäävät luottamusvälin ulkopuolelle, malli falsifioidaan — ennustetta ei muuteta.",

    // S9 Falsification
    s9Title: "Falsifiointiehdot",
    s9Intro:
      "Malli on eksplisiittisesti falsifioitavissa. Jokainen ehto on tarkka ja testattavissa:",
    s9Items: [
      {
        condition: "Lindgrenin metriikka on matemaattisesti virheellinen",
        detail:
          "Jos johtamisen g_μν = η_μν + A_μA_ν osoitetaan olevan sisäisesti ristiriitainen tai ristiriidassa vakiintuneen sähködynamiikan kanssa, geometrinen perusta pettää.",
      },
      {
        condition:
          "VGCC-salpaajat eivät estä EMF:n biologisia vaikutuksia",
        detail:
          "Jos kalsiumkanavasalpaajat eivät vaimenna EMF:n aiheuttamaa ROS:ia, SDF:ää tai hormonaalisia muutoksia kontrolloiduissa kokeissa, ensisijainen mekanismi on väärä.",
      },
      {
        condition:
          "Amissiyhteisön TFR laskee samaa vauhtia kuin yleisväestön",
        detail:
          "Jos amissit (EMF ≈ 0) osoittavat TFR-laskua, joka vastaa korkean EMF:n populaatioita, EMF-hypoteesi falsifioidaan. Amissien nykyinen TFR ≈ 6,5 on vakaa.",
      },
      {
        condition:
          "Siittiöpitoisuuden lasku pysähtyy ilman vähentynyttä EMF-altistusta",
        detail:
          "Jos −1,2 %/vuosi siittiölasku kääntyy tai vakautuu kumulatiivisen EMF:n jatkaessa kasvuaan, annos-vastesuhde on väärä.",
      },
      {
        condition:
          "Lukittu ennuste epäonnistuu luottamusvälin ulkopuolella",
        detail:
          "Jokainen §8:n ennuste, joka jää 95 % luottamusvälin ulkopuolelle havaintovuoden koittaessa, falsifioi mallin kyseisen ennusteen osalta.",
      },
    ],

    // S10 Pharmacological
    s10Title: "Farmakologinen validointimatriisi",
    s10Intro:
      "Kolme itsenäistä farmakologista interventiota tarjoavat kvantitatiiviset kalibrointiankkurit erillisille reiteille. Kukin lääke eristää tietyn mekanismin, mikä mahdollistaa mallin reittirakennteen itsenäisen testaamisen.",
    s10Drug: "Lääke",
    s10Target: "Kohde",
    s10Pathway: "Reitti",
    s10Observed: "Havaittu vaikutus",
    s10Calibration: "BERM-kalibrointi",
    s10Rows: [
      {
        drug: "CCB (nifedipiini)",
        target: "L-tyypin VGCC",
        pathway: "A (VGCC→ROS→SDF)",
        observed: "90 % VGCC-salpaus → −23 % siittiöpit.",
        calibration: "EMF-häiriö ≈ 6 %",
      },
      {
        drug: "Rapamysiini",
        target: "mTOR (85 % inhibitio)",
        pathway: "Sempou (mTOR→ikääntyminen)",
        observed: "Elinikä +10–25 % (hiiret)",
        calibration: "mTOR_eff × 0,15",
      },
      {
        drug: "Melatoniini",
        target: "CRY/sirkadiaaninen",
        pathway: "C (CRY→kello→ovulaatio)",
        observed: "Palauttaa sirkadiaanisen amplitudin",
        calibration: "Yön EMF-osuuden korjaus",
      },
    ],
    s10d1: "CCB-kalibrointi (reitti A):",
    s10d2:
      "Tämä 6 %:n efektiivinen VGCC-häiriö on yhdenmukainen havaitun −1,2 %/vuosi siittiölaskun kanssa 5 vuoden kumulatiivisen altistuksen aikana.",
    s10d3: "Rapamysiini-kalibrointi (Sempou-reitti):",
    s10d4:
      "Havaittu hiirten 10–25 %:n elinikäpidennys on yhdenmukainen osittaisen mTOR-reduktion kanssa realistisella annostusjärjestelmällä (ei 85 %:n kestävä inhibitio).",
    s10d5: "Melatoniini-kalibrointi (reitti C):",
    s10d6:
      "Yöllinen EMF-altistus häiritsee CRY-välitteistä sirkadiaanista signalointia. Eksogeeninen melatoniini (3–5 mg) palauttaa sirkadiaanisen amplitudin CRY:stä riippumatta, tarjoten reitin C ohituksen. Jos melatoniinilisä eliminoi EMF:ään liittyvän sirkadiaanisen häiriön, reitti C validoidaan; jos ei, CRY-kanava vaatii uudelleentarkastelua.",
    s10d7Link: "→ Kontrolloitu kokeellinen näyttö (laboratorionisäkkäät)",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

function SectionNav({
  sections,
}: {
  sections: { id: string; num: string; label: string }[];
}) {
  return (
    <nav className="hidden lg:block sticky top-20 w-48 shrink-0 self-start">
      <ul className="space-y-1.5 text-sm border-l border-card-border pl-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block text-foreground-muted hover:text-accent transition-colors leading-snug"
            >
              <span className="text-xs text-foreground-muted/60 mr-1">
                {s.num}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DerivationLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-foreground-muted leading-relaxed mt-2">
      {children}
    </p>
  );
}

const PREDICTIONS = [
  { country: "Finland", year: 2030, metric: "TFR", central: 1.17, ci: "1.02–1.24", locked: "2026-08-18" },
  { country: "South Korea", year: 2030, metric: "TFR", central: 0.60, ci: "0.48–0.72", locked: "2026-08-18" },
  { country: "South Korea", year: 2035, metric: "TFR", central: 0.52, ci: "0.40–0.64", locked: "2026-08-18" },
  { country: "Japan", year: 2030, metric: "TFR", central: 1.04, ci: "0.88–1.20", locked: "2026-08-18" },
  { country: "USA", year: 2030, metric: "TFR", central: 1.45, ci: "1.25–1.65", locked: "2026-08-18" },
  { country: "Brazil", year: 2030, metric: "TFR", central: 1.55, ci: "1.40–1.68", locked: "2026-08-18" },
  { country: "Global", year: 2040, metric: "TFR", central: 1.78, ci: "1.55–2.05", locked: "2026-08-18" },
  { country: "Global", year: 2050, metric: "Sperm %", central: 62.0, ci: "48–75", locked: "2026-08-18" },
];

const COUNTRY_FI: Record<string, string> = {
  Finland: "Suomi",
  "South Korea": "Etelä-Korea",
  Japan: "Japani",
  USA: "USA",
  Brazil: "Brasilia",
  Global: "Maailma",
};

export default async function MathematicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  const lp = `/${locale}`; // link prefix

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {d.pageTitle}
        </h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.pageSubtitle}
        </p>
      </header>

      <div className="flex gap-10">
        <SectionNav sections={d.sections} />

        <div className="flex-1 min-w-0 space-y-14">
          {/* S1 Lindgren geometry */}
          <section id="lindgren">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§1"}</span>
              {d.s1Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s1Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + A_\mu A_\nu" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s1After}
            </p>

            <Derivation>
              <DerivationLine>{d.s1d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu} \quad \text{(linearized gravity)}" />
              </div>
              <DerivationLine>{d.s1d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \eta_{\mu\nu} + \kappa \, A_\mu A_\nu" />
              </div>
              <DerivationLine>{d.s1d3}</DerivationLine>
              <DerivationLine>{d.s1d4}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\nabla_\mu F^{\mu\nu} = 0 \quad \text{follows from} \quad \nabla_\mu G^{\mu\nu} = 0" />
              </div>
              <DerivationLine>{d.s1d5}</DerivationLine>
            </Derivation>
          </section>

          {/* S2 Selection rule chi */}
          <section id="chi">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§2"}</span>
              {d.s2Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s2Intro}{" "}
              <MathBlock tex="a" display={false} /> {d.s2IntroEnd}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\chi(\bar{A}) = \frac{\bar{A}}{\sqrt{1 + \bar{A}^2}}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {d.s2After}
            </p>

            <Derivation>
              <DerivationLine>{d.s2d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="g_{\mu\nu} = \bar{g}_{\mu\nu} + h_{\mu\nu}" />
              </div>
              <DerivationLine>{d.s2d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu + a_\mu a_\nu \quad (a = \text{perturbation})" />
              </div>
              <DerivationLine>{d.s2d3}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="h^{(1)}_{\mu\nu} = \bar{A}_\mu a_\nu + a_\mu \bar{A}_\nu" />
              </div>
              <DerivationLine>{d.s2d4}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{|h^{(1)}|}{|\bar{g}|} = \frac{2|\bar{A}||a|}{1 + |\bar{A}|^2}" />
              </div>
              <DerivationLine>{d.s2d5}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\chi(\bar{A}) = \frac{|\bar{A}|}{\sqrt{1 + |\bar{A}|^2}}" />
              </div>
              <DerivationLine>{d.s2d6}</DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\chi(0) = 0 \quad \text{— no linear response in empty background}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi(\bar{A}) \to 1 \;\text{as}\; \bar{A} \to \infty \quad \text{— saturates}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(0) = 1 \quad \text{— maximum sensitivity near zero}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\chi'(\bar{A}) = \frac{1}{(1+\bar{A}^2)^{3/2}} \quad \text{— sensitivity decreases}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>{d.s2d7}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="V_{\text{mem}} = -70\;\text{mV}, \quad d = 10\;\text{nm} \;\Rightarrow\; E = 7 \times 10^6\;\text{V/m}" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\chi(7 \times 10^6) \approx 1.0 \quad \text{(saturated)}" />
              </div>
              <DerivationLine>{d.s2d8}</DerivationLine>
            </Derivation>
          </section>

          {/* S3 Two-channel model */}
          <section id="two-channel">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§3"}</span>
              {d.s3Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s3Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{total}(y) = \text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cumEMF} = \sum_{y=y_0}^{Y} \text{total}(y)" />
            </div>

            <Derivation>
              <DerivationLine>{d.s3d1}</DerivationLine>
              <DerivationLine>{d.s3d2}</DerivationLine>
              <DerivationLine>{d.s3d3}</DerivationLine>
              <DerivationLine>{d.s3d4}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>{d.s3d5}</DerivationLine>
                <DerivationLine>{d.s3d6}</DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s3d7}</DerivationLine>
                <DerivationLine>{d.s3d8}</DerivationLine>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s3d9}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{cumEMF}(Y) = \sum_{y=\text{start}}^{Y} \Big[\text{ambient}(y) + \chi\!\big(\text{ambient}(y)\big) \times \text{personal}(y)\Big]" />
                </div>
                <DerivationLine>{d.s3d10}</DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* S4 Biological capacity */}
          <section id="biocap">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§4"}</span>
              {d.s4Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s4Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{bioCap} = a \cdot e^{-b \cdot \max(0,\;\text{cumEMF} - \theta)}" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}<MathBlock tex="a = 6.5" display={false} />{" "}
              {d.s4Params}{" "}
              <MathBlock tex="b = 0.010" display={false} />{" "}
              {d.s4Params2}{" "}
              <MathBlock tex="\theta = 5" display={false} />{" "}
              {d.s4Params3}
            </p>

            <Derivation>
              <DerivationLine>{d.s4d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\frac{d\,\text{bioCap}}{dt} = -b \times \text{bioCap} \times \frac{d\,\text{EMF}}{dt}" />
              </div>
              <DerivationLine>{d.s4d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{bioCap}(t) = \text{bioCap}(0) \times e^{-b \times \text{cumEMF}(t)}" />
              </div>
              <DerivationLine>{d.s4d3}</DerivationLine>
              <DerivationLine>{d.s4d4}</DerivationLine>
              <p className="text-xs text-accent mt-3">
                <Link href={`${lp}/sentinel#lab-mammals`} className="hover:underline">
                  {d.s4d5Link}
                </Link>
              </p>
            </Derivation>
          </section>

          {/* S5 Behavioral factor */}
          <section id="behavioral">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§5"}</span>
              {d.s5Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s5Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{behav} = \max\!\left(0.1,\;\left(\prod_{i=1}^{4} e^{-r_i \cdot \text{cumEMF}}\right)^{\!1/4}\right)" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}{" "}
              <MathBlock tex="r_1 = 0.010" display={false} /> (OT),{" "}
              <MathBlock tex="r_2 = 0.013" display={false} /> (T),{" "}
              <MathBlock tex="r_3 = 0.016" display={false} /> (DA),{" "}
              <MathBlock tex="r_4 = 0.008" display={false} />{" "}
              ({locale === "fi" ? "kortisoli" : "cortisol"}).
            </p>

            <Derivation>
              <DerivationLine>{d.s5d1}</DerivationLine>
              <div className="space-y-1 mt-2 ml-4">
                <div>
                  <MathBlock
                    tex="\text{OT}(t) = e^{-0.010 \times \text{cumEMF}} \quad \text{— oxytocin}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{T}(t) = e^{-0.013 \times \text{cumEMF}} \quad \text{— testosterone}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{DA}(t) = e^{-0.016 \times \text{cumEMF}} \quad \text{— dopamine}"
                    display={false}
                  />
                </div>
                <div>
                  <MathBlock
                    tex="\text{cort}(t) = e^{-0.008 \times \text{cumEMF}} \quad \text{— cortisol (inverse)}"
                    display={false}
                  />
                </div>
              </div>
              <DerivationLine>{d.s5d2}</DerivationLine>
              <DerivationLine>{d.s5d3}</DerivationLine>
              <div className="mt-3">
                <DerivationLine>{d.s5d4}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{T}(\text{cumEMF}) = e^{-0.013 \times \text{cumEMF}}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\frac{dT}{dt} \approx -0.013 \times \frac{d\text{EMF}}{dt} \times T" />
                </div>
                <DerivationLine>{d.s5d5}</DerivationLine>
              </div>
            </Derivation>
          </section>

          {/* S6 Cultural / compensation */}
          <section id="cultural">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§6"}</span>
              {d.s6Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s6Intro}
            </p>
            <div className="text-center my-4">
              <MathBlock tex="\text{TFR}_{\text{pred}} = \text{bioCap} \times \text{behav} \times \text{cultRate}" />
            </div>
            <div className="text-center my-4">
              <MathBlock tex="\text{cultRate} = r_{2024} \times \frac{\text{cult}(y)}{\text{cult}(2024)} \times \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              {locale === "fi" ? "missä " : "where "}{" "}
              <MathBlock tex="\alpha = 0.43" display={false} />{" "}
              {d.s6Alpha}
            </p>

            <Derivation>
              <DerivationLine>{d.s6d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="r_{2024} = \frac{\text{observedTFR}(2024)}{\text{bioCap}(2024) \times \text{behav}(2024)}" />
              </div>
              <DerivationLine>{d.s6d2}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{compensation} = \left(\frac{\text{bioBehav}_{2024}}{\text{bioBehav}(y)}\right)^\alpha" />
              </div>
              <DerivationLine>{d.s6d3}</DerivationLine>
              <div className="overflow-x-auto mt-3">
                <table className="text-xs text-foreground-muted border-collapse w-full">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-1 pr-4">{d.s6TableLayer}</th>
                      <th className="text-right py-1 pr-4">{"α"}</th>
                      <th className="text-right py-1 pr-4">{d.s6TableWeight}</th>
                      <th className="text-right py-1">{"α"} {"×"} w</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableVGIC}</td>
                      <td className="text-right py-1 pr-4">1.0</td>
                      <td className="text-right py-1 pr-4">0.10</td>
                      <td className="text-right py-1">0.100</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableROS}</td>
                      <td className="text-right py-1 pr-4">0.8</td>
                      <td className="text-right py-1 pr-4">0.30</td>
                      <td className="text-right py-1">0.240</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableDNA}</td>
                      <td className="text-right py-1 pr-4">0.1</td>
                      <td className="text-right py-1 pr-4">0.25</td>
                      <td className="text-right py-1">0.025</td>
                    </tr>
                    <tr className="border-b border-card-border/50">
                      <td className="py-1 pr-4">{d.s6TableLeydig}</td>
                      <td className="text-right py-1 pr-4">0.3</td>
                      <td className="text-right py-1 pr-4">0.20</td>
                      <td className="text-right py-1">0.060</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">{d.s6TableNeuron}</td>
                      <td className="text-right py-1 pr-4">0.0</td>
                      <td className="text-right py-1 pr-4">0.15</td>
                      <td className="text-right py-1">0.000</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-card-border font-medium">
                      <td className="py-1 pr-4" colSpan={3}>
                        {d.s6TableFooter}
                      </td>
                      <td className="text-right py-1">{locale === "fi" ? "0,425 ≈ 0,43" : "0.425 ≈ 0.43"}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-3">
                <DerivationLine>{d.s6d4}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{TFR} \propto (\text{bioCap} \times \text{behav})^{1-\alpha}" />
                </div>
                <div className="space-y-1 ml-4">
                  <DerivationLine>{d.s6d5}</DerivationLine>
                  <DerivationLine>{d.s6d6}</DerivationLine>
                  <DerivationLine>{d.s6d7}</DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* S7 Jacobian */}
          <section id="jacobian">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§7"}</span>
              {d.s7Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s7Intro}
            </p>
            <div className="text-center my-4 overflow-x-auto">
              <MathBlock tex="\frac{\partial\,\text{TFR}}{\partial E} = \frac{\partial H_{RP}}{\partial E} \cdot \frac{\partial c_R}{\partial H_{RP}} \cdot \frac{\partial X}{\partial c_R} \cdot \frac{\partial V_B}{\partial X} \cdot \frac{\partial M_{\text{repro}}}{\partial V_B} \cdot \frac{\partial\,\text{TFR}}{\partial M_{\text{repro}}}" />
            </div>

            <Derivation>
              <DerivationLine>{d.s7d1}</DerivationLine>
              <div className="space-y-3 mt-3">
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial H_{RP}/\partial E" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1a}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial c_R/\partial H_{RP}" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1b}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial X/\partial c_R" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1c}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial V_B/\partial X" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1d}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial M_{\text{repro}}/\partial V_B" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1e}</DerivationLine>
                </div>
                <div>
                  <div className="text-center my-1">
                    <MathBlock tex="\partial\,\text{TFR}/\partial M_{\text{repro}}" display={false} />
                  </div>
                  <DerivationLine>{d.s7d1f}</DerivationLine>
                </div>
              </div>
            </Derivation>
          </section>

          {/* S8 Locked predictions */}
          <section id="locked">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§8"}</span>
              {d.s8Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s8Intro}
            </p>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">{d.s8Country}</th>
                    <th className="text-left py-2 pr-4">{d.s8Year}</th>
                    <th className="text-left py-2 pr-4">{d.s8Metric}</th>
                    <th className="text-right py-2 pr-4">{d.s8Central}</th>
                    <th className="text-right py-2 pr-4">{d.s8CI}</th>
                    <th className="text-left py-2">{d.s8Locked}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {PREDICTIONS.map((p, i) => (
                    <tr key={i} className="border-b border-card-border/50">
                      <td className="py-2 pr-4">
                        {locale === "fi" ? (COUNTRY_FI[p.country] ?? p.country) : p.country}
                      </td>
                      <td className="py-2 pr-4">{p.year}</td>
                      <td className="py-2 pr-4">{p.metric}</td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.central}
                      </td>
                      <td className="text-right py-2 pr-4 font-mono-num">
                        {p.ci}
                      </td>
                      <td className="py-2 text-xs">{p.locked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              {d.s8Footer}
            </p>
          </section>

          {/* S9 Falsification conditions */}
          <section id="falsification">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§9"}</span>
              {d.s9Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s9Intro}
            </p>
            <ul className="space-y-3">
              {d.s9Items.map((item, i) => (
                <li key={i} className="border border-card-border rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {item.condition}
                  </p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* S10 Pharmacological validation */}
          <section id="pharmacological">
            <h2 className="text-lg font-semibold mb-1">
              <span className="text-foreground-muted text-sm mr-2">{"§10"}</span>
              {d.s10Title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              {d.s10Intro}
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="border-b border-card-border text-foreground-muted">
                    <th className="text-left py-2 pr-4">{d.s10Drug}</th>
                    <th className="text-left py-2 pr-4">{d.s10Target}</th>
                    <th className="text-left py-2 pr-4">{d.s10Pathway}</th>
                    <th className="text-left py-2 pr-4">{d.s10Observed}</th>
                    <th className="text-left py-2">{d.s10Calibration}</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {d.s10Rows.map((row, i) => (
                    <tr key={i} className={i < d.s10Rows.length - 1 ? "border-b border-card-border/50" : ""}>
                      <td className="py-2 pr-4 font-medium text-foreground">
                        {row.drug}
                      </td>
                      <td className="py-2 pr-4">{row.target}</td>
                      <td className="py-2 pr-4">{row.pathway}</td>
                      <td className="py-2 pr-4">{row.observed}</td>
                      <td className="py-2">{row.calibration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Derivation>
              <DerivationLine>{d.s10d1}</DerivationLine>
              <div className="text-center my-2">
                <MathBlock tex="\text{CCB blocks 90\% of VGCC} \;\Rightarrow\; \Delta\text{sperm} = -23\%" />
              </div>
              <div className="text-center my-2">
                <MathBlock tex="\text{EMF disruption} = \text{CCB}_{\text{effect}} \times \frac{\text{EMF}_{\text{disruption}}}{\text{CCB}_{\text{block}}} \approx 23\% \times \frac{0.25}{0.90} \approx 6\%" />
              </div>
              <DerivationLine>{d.s10d2}</DerivationLine>

              <div className="mt-4">
                <DerivationLine>{d.s10d3}</DerivationLine>
                <div className="text-center my-2">
                  <MathBlock tex="\text{mTOR}_{\text{eff}}^{\text{rapa}} = \text{mTOR}_{\text{baseline}} \times (1 - 0.85) = 0.15 \times \text{mTOR}" />
                </div>
                <div className="text-center my-2">
                  <MathBlock tex="\text{aging rate} = (0.15)^{0.7} \approx 0.24 \quad \text{(76\% reduction)}" />
                </div>
                <DerivationLine>{d.s10d4}</DerivationLine>
              </div>

              <div className="mt-4">
                <DerivationLine>{d.s10d5}</DerivationLine>
                <DerivationLine>{d.s10d6}</DerivationLine>
              </div>

              <p className="text-xs text-accent mt-3">
                <Link href={`${lp}/sentinel#lab-mammals`} className="hover:underline">
                  {d.s10d7Link}
                </Link>
              </p>
            </Derivation>
          </section>
        </div>
      </div>
    </div>
  );
}
