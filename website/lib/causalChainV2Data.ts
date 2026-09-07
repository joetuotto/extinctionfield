import type { ChainEdge, ChainNode } from "./types";

/**
 * Public summary of BERM and its optional measurement interface.
 *
 * The legacy A–F lettering remains only through source-qualified compatibility
 * bindings. This map uses semantic node names so that BBB, BTB, melatonin,
 * bioelectric development, ovarian reserve and the demographic endpoint
 * cannot be collapsed into one scalar pathway.
 */
export const BERM_CAUSAL_NODES_V2: ChainNode[] = [
  {
    id: "geometry",
    level: 1,
    label: "Lindgren geometry",
    sublabel: "metric + variation + Weyl + Bianchi",
    epistemicLevel: "L",
    title: "Three-premise Maxwell derivation",
    mechanism:
      "The source-free Maxwell equation ∇μF^μν = 0 follows from Lindgren's metric through the variational principle, the Weyl condition and the Bianchi identity. The Bianchi identity is necessary but not sufficient: it supplies dF = 0 and is not a shortcut to the sourced equation ∇μF^μν = J^ν.",
    quantitative:
      "gμν = ημν + κAμAν\nS = ∫√(−g) R d⁴x; δS/δAμ = 0\n∇μgαβ = 0  [Weyl condition]\ndF = 0  [Bianchi identity]",
    keyReferences: [
      {
        referenceId: "lindgren2025",
        authors: "Lindgren, Kovacs & Liukkonen 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "Journal of Physics: Conference Series 2987, 012001",
        keyFinding:
          "Maxwellin johto käyttää yhdessä kolmea L0-premissiä: Lindgrenin metriikkaa, variaatioperiaatetta ja Weyl-ehtoa; Bianchi-identiteetti on välttämätön mutta ei yksin riittävä.",
        keyFinding_en:
          "The Maxwell derivation jointly uses three L0 premises: Lindgren's metric, the variational principle and the Weyl condition; the Bianchi identity is necessary but not sufficient by itself.",
      },
    ],
    falsificationCondition:
      "The derivation fails if any of the three premise checks (metric/variation, Weyl compatibility or Bianchi identity) fails, or if the claimed field equation does not follow after all three pass.",
  },
  {
    id: "fieldstate",
    level: 1,
    label: "FieldState observations",
    sublabel: "B₀, vector, PSD, phase, time",
    epistemicLevel: "L*",
    title: "Optional local measurement module",
    mechanism:
      "FieldState keeps background, ambient and personal field components, organ-local transfer estimates, spectrum, phase, coherence and circadian context distinct. It is an optional observation and estimation module, not BERM itself or a biological cause. A mobile-subscription series or country average is only a technology-timing proxy, not organ dose.",
    quantitative:
      "z_background,o = |T_o A_background|\nx_o = N_o(z_background,o)  [dimensionless; N_o OPEN at L0→L2]\nA_selected,o = T_o A_ambient + χ_geo(x_o) T_o A_personal\nX_geom,o = 2(T_o A_background)·(T_o A_personal)",
    keyReferences: [
      {
        authors: "Blackman et al. 1985",
        title: "Tausta- ja taajuusikkunariippuvainen kalsiumvaste",
        journal: "Bioelectromagnetics",
        keyFinding: "Kokeelliset järjestelmät tukevat vektorin, kulman ja taustan säilyttämistä mittausmallissa; ne eivät anna TFR-kerrointa.",
      },
      {
        referenceId: "ritz2004",
        authors: "Ritz et al. 2004",
        title: "Resonance effects indicate a radical-pair mechanism for avian magnetic compass",
        journal: "Nature",
        keyFinding: "Kokeelliset järjestelmät tukevat vektorin, kulman ja taustan säilyttämistä mittausmallissa; ne eivät anna TFR-kerrointa.",
      },
      {
        referenceId: "usselman2016",
        authors: "Usselman et al. 2016",
        title: "Spin biochemistry modulates reactive oxygen species production by radio frequency magnetic fields",
        journal: "Scientific Reports",
        keyFinding: "Kokeelliset järjestelmät tukevat vektorin, kulman ja taustan säilyttämistä mittausmallissa; ne eivät anna TFR-kerrointa.",
      },
    ],
    falsificationCondition:
      "In a preregistered experiment, the same local exposure produces an identical response regardless of measured B₀ vector, geometry, spectrum and circadian state when the registered receptor hypothesis predicts a difference.",
  },
  {
    id: "chi",
    level: 2,
    label: "Selection rule χ(|Ā|)",
    sublabel: "L1 + L0/L2 spatial reduction",
    epistemicLevel: "L1+L0/L2",
    title: "Directed derivative followed by explicit reduction",
    mechanism:
      "The selection rule is derived in two stages: (1) the directional derivative of the volume element in Lorentz signature gives κ(A·u)/√(1+κA²) [L1]; (2) the explicit dimensionless, collinear spatial/scalar reduction selects the positive spatial magnitude and gives χ(|Ā|)=|Ā|/√(1+|Ā|²) [L0/L2 reduction]. Epistemic status: [L1 + L0/L2 reduction].",
    quantitative:
      "D_u√(−g) = κ(A·u)/√(1+κA²)  [L1]\nLorentz → spatial/scalar: q=|Ā|  [L0/L2]\nχ(q) = q/√(1+q²)  [L1 + L0/L2 reduction]",
    keyReferences: [
      {
        referenceId: "lindgren2025",
        authors: "Lindgren, Kovacs & Liukkonen 2025",
        title: "Electromagnetism as a purely geometric theory",
        journal: "Journal of Physics: Conference Series 2987, 012001",
        keyFinding:
          "Suunnattu Lorentz-derivaatta tuottaa χ(|Ā|):n eksplisiittisen spatiaalisen/skalaari-reduktion kautta [L1 + L0/L2].",
        keyFinding_en:
          "The directed Lorentzian derivative produces χ(|Ā|) through the explicit spatial/scalar reduction [L1 + L0/L2].",
      },
    ],
    falsificationCondition:
      "The reduction is rejected if its declared dimensionless, collinear and positive-spatial assumptions do not reproduce the scalar coefficient from the Lorentzian directional derivative.",
  },
  {
    id: "bound-ion-hamiltonian",
    level: 2,
    label: "Bound-ion Hamiltonian",
    sublabel: "phase modulation → Bessel sidebands [conditional]",
    epistemicLevel: "L1",
    title: "Conditional derivation of the sideband structure",
    mechanism:
      "Phase modulation of a bound ion's energy levels produces a Bessel sideband structure through the Jacobi–Anger expansion [conditional derivation]. The same expansion arises in any driven two-level system, so the sideband structure is compatible with phase modulation and is not specific to the metric ansatz. The Layer-2 receptor module computes f_c, n, z and J_n(z); it emits no population figure.",
    quantitative:
      "H(t) = (ℏ/2)[Ω₀ + d₁cos(ωt)]σ_z + (ℏv/2)σ_x  [L1 + cond.]\nexp[iz sin(ωt)] = Σₖ Jₖ(z) exp(ikωt)  [Jacobi–Anger]\nf_c = |q|B₀/(2πm); n = round(f_c/f); z = λ·(f_c/f)·(b/B₀)",
    conditions: [
      "States exist and have mixing",
      "Sufficient phase memory",
      "Measurable readout mechanism",
    ],
    keyReferences: [
      {
        referenceId: "ashhab2007_driven_two_level",
        authors: "Ashhab, Johansson, Zagoskin & Nori 2007",
        title: "Two-level systems driven by large-amplitude fields",
        journal: "Physical Review A 75, 063414",
        keyFinding: "Sinimuotoisesti moduloidun energiavälin vaiheintegraali tuottaa Bessel-sivukaistat; formalismi on yleinen ajetuille kaksitilajärjestelmille.",
        keyFinding_en: "The phase integral of a sinusoidally modulated energy gap yields Bessel sidebands; the formalism is generic to driven two-level systems.",
      },
      {
        referenceId: "engstrom2004_ion_resonances",
        authors: "Engström & Bowman 2004",
        title: "Magnetic resonances of ions in biological systems",
        journal: "Bioelectromagnetics 25, 620–630",
        keyFinding: "Sidottujen ionien resonanssit antavat q/m-erotuksen isotrooppisen sidonnan mallissa.",
        keyFinding_en: "Bound-ion resonances give the q/m separation in the isotropic binding model.",
      },
    ],
    falsificationCondition:
      "Under preregistered f and B₀ variation, the normalised amplitude nodes b_null/B₀ do not track the Bessel-argument prediction; or isotope exchange does not shift f_c by the mass ratio at fixed charge.",
  },
  {
    id: "relaxation-candidate",
    level: 2,
    label: "Relaxation candidate",
    sublabel: "λ(f,τ): 1 → 2, c = γ assumed",
    epistemicLevel: "KANDIDAATTI",
    title: "Frequency-dependent sensitivity from binding-site relaxation",
    mechanism:
      "Binding-environment relaxation τ·dx/dt + x = B(t) produces a frequency-dependent sensitivity λ(f,τ) that runs from 1 at low frequency to 1 + c/γ at high frequency [candidate hypothesis]. The value c = γ is the candidate's own added assumption, chosen so the high-frequency limit equals the IPR coefficient 2; it is not a constant determined by Lindgren's ansatz. Calmodulin's ~20 ms N-terminal conformational change (Park et al. 2008, chemical Ca²⁺ step) lies close to the ~17.6 ms this candidate requires at 24 Hz; that closeness motivates the receptor-structure test and is not a validation.",
    quantitative:
      "u = 2πfτ;  λ = √((1 + (1 + c/γ)²u²)/(1 + u²))  [KANDIDAATTI]\nKoch 2003, 24 Hz, τ = 20 ms: λ = 1.924, s = λ·f_c/f = 2.020 (1 % from 2)  [NUMEERINEN]\nτ for s = 2 exactly: 17.6 ms  [reverse calculation, not a prediction]",
    keyReferences: [
      {
        referenceId: "park2008_calmodulin_kinetics",
        authors: "Park et al. 2008",
        title: "Conformational changes of calmodulin upon Ca2+ binding studied with a microfluidic mixer",
        journal: "PNAS 105, 542–547",
        keyFinding: "N-terminaalinen rakennemuutos ~20 ms kemiallisessa Ca²⁺-askeleessa; ei magneettikenttävaste.",
        keyFinding_en: "N-terminal conformational change ~20 ms under a chemical Ca²⁺ step; not a magnetic-field response.",
      },
      {
        referenceId: "gavoci2013_ipr_k_null",
        authors: "Gavoçi et al. 2013",
        title: "ELF magnetic fields tuned to ion parametric resonance conditions do not affect TEA-sensitive outward K⁺ currents",
        journal: "Bioelectromagnetics 34, 579–588",
        keyFinding: "Nollatulos K⁺:n IPR-ehdoissa; rajaa kandidaattia eikä sitä saa selittää pois vapaalla kudoskertoimella.",
        keyFinding_en: "Null result at K⁺ IPR conditions; constrains the candidate and may not be absorbed by a free tissue coefficient.",
      },
    ],
    falsificationCondition:
      "An independently measured receptor τ fails to predict the amplitude-window shift; or the two-frequency phase test shows no phase dependence at equal spectral power.",
  },
  {
    id: "l2-bridge",
    level: 2,
    label: "Open L2 bridge",
    sublabel: "geometry → observable coupling",
    epistemicLevel: "L*",
    title: "Coupling operator not yet derived",
    mechanism:
      "BERM has not yet derived an operator that maps Lindgren geometry or a FieldState observation to SHBG, androgen-receptor activity, receptor-proximal signalling or any other biological state. The downstream branches are conditional BERM propositions or imported biological mechanisms, not consequences derived from FieldState.",
    quantitative: "K_L2 : measurement / geometry → biological observable  [OPEN]",
    keyReferences: [],
    falsificationCondition:
      "A proposed L2 operator must be rejected or revised if preregistered matched exposure–endpoint data fail its directional, spectral, temporal or dose predictions.",
  },
  {
    id: "mechanisms",
    level: 3,
    label: "Biological intermediates",
    sublabel: "CRY · melatonin · Ca²⁺/ROS · Vmem/mTOR · HPA · microbiome/OT",
    epistemicLevel: "M",
    title: "Separate, testable mediator branches",
    mechanism:
      "BERM proposes separate, testable intermediates: RPM/CRY–redox, melatonin/redox, Ca²⁺/mitochondrial–ROS, Vmem/mTOR developmental memory, clock/HPA–HPG and the legacy microbiome/oxytocin branch. Until L2 is resolved, no FieldState observation is treated as having generated these states. They are not one additive effect; RF, ELF/PEMF and optical blue light remain separate exposure classes.",
    keyReferences: [
      {
        referenceId: "sherrard2018",
        authors: "Sherrard et al. 2018",
        title: "Low-intensity electromagnetic fields induce human cryptochrome to modulate intracellular reactive oxygen species",
        journal: "PLOS Biology",
        keyFinding: "Antavat mekanistista välitilan tukea solu- ja rottajärjestelmissä, eivät suoraa väestövaikutusta.",
      },
      {
        referenceId: "cao2015",
        authors: "Cao et al. 2015",
        title: "Circadian and radiofrequency-associated intermediate study",
        journal: "International Journal of Environmental Research and Public Health",
        keyFinding: "Antavat mekanistista välitilan tukea solu- ja rottajärjestelmissä, eivät suoraa väestövaikutusta.",
      },
    ],
  },
  {
    id: "btb",
    level: 4,
    label: "Blood–testis barrier (BTB)",
    sublabel: "tight junction · spermatogenesis",
    epistemicLevel: "M",
    title: "BTB is a distinct male branch",
    mechanism:
      "Local testis exposure, redox state and tight-junction proteins may affect the protective microenvironment of spermatogenesis. The slow BTB state remains distinct from BBB and acute sperm redox.",
    keyReferences: [
      {
        referenceId: "yu2019_btb",
        authors: "Yu et al. 2019",
        title: "RF-altistus ja veri–kivesesteen tiiviit liitokset",
        journal: "Science of the Total Environment",
        keyFinding: "Yu tarjoaa suoran RF-rotta-asetelman; Chakraborty tukee redox–BTB–siittiö-väliporrasta eri oksidatiivisen stressin asetelmassa.",
      },
      {
        referenceId: "chakraborty2020",
        authors: "Chakraborty et al. 2020",
        title: "Redox–BTB–siittiö-väliporras",
        journal: "Reproductive Toxicology",
        keyFinding: "Yu tarjoaa suoran RF-rotta-asetelman; Chakraborty tukee redox–BTB–siittiö-väliporrasta eri oksidatiivisen stressin asetelmassa.",
      },
    ],
  },
  {
    id: "other-barriers",
    level: 4,
    label: "Other barrier states",
    sublabel: "BBB · placenta · retina",
    epistemicLevel: "L*",
    title: "Organ-specific candidate states, not a shared multiplier",
    mechanism:
      "BBB, placenta and retinal barrier may share redox/tight-junction biology, but their local transfer, cells, timescales and endpoints differ. They remain separate candidate states; the active v2 registry does not derive a global barrier or reproductive coefficient from them.",
    keyReferences: [
      {
        referenceId: "lochhead2010",
        authors: "Lochhead et al. 2010",
        title: "Redox–tight-junction-väliporras BBB:ssä",
        journal: "Journal of Cerebral Blood Flow & Metabolism",
        keyFinding: "Tukee redox–junction-biologiaa, mutta ei ole suora paikallinen RF- tai lisääntymispäätepistetutkimus.",
      },
    ],
  },
  {
    id: "male",
    level: 5,
    label: "Male reproductive state",
    sublabel: "BTB · germline · steroidogenesis · sperm",
    epistemicLevel: "M",
    title: "Male organ-specific capacity",
    mechanism:
      "Male capacity separates germline reserve, BTB, steroidogenesis, sperm output, function and DNA integrity. Acute sperm redox is not conflated with slow spermatogenesis or BTB memory.",
    keyReferences: [
      {
        referenceId: "iuliis2009",
        authors: "De Iuliis et al. 2009",
        title: "Ihmisen siittiöiden RF-altistus in vitro",
        journal: "PLOS ONE",
        keyFinding: "Näyttö koskee erillisiä biologisia päätepisteitä; katsauksen 2025 korjaus on huomioitava.",
      },
      {
        referenceId: "yu2019_btb",
        authors: "Yu et al. 2019",
        title: "Paikallinen rotta-BTB-asetelma",
        journal: "Science of the Total Environment",
        keyFinding: "Näyttö koskee erillisiä biologisia päätepisteitä; katsauksen 2025 korjaus on huomioitava.",
      },
      {
        referenceId: "cordelli2024",
        authors: "Cordelli et al. 2024",
        title: "RF-EMF:n lisääntymisvaikutusten systemaattinen katsaus",
        journal: "Environment International",
        keyFinding: "Näyttö koskee erillisiä biologisia päätepisteitä; katsauksen 2025 korjaus on huomioitava.",
      },
      {
        referenceId: "cordelli2025_corrigendum",
        authors: "Cordelli et al. 2025",
        title: "Systemaattisen katsauksen korjaus",
        journal: "Environment International",
        keyFinding: "Näyttö koskee erillisiä biologisia päätepisteitä; katsauksen 2025 korjaus on huomioitava.",
      },
    ],
  },
  {
    id: "female",
    level: 5,
    label: "Female reproductive state",
    sublabel: "reserve · oocyte redox · clock · implantation",
    epistemicLevel: "M",
    title: "Female organ-specific capacity",
    mechanism:
      "The female branch separates ovarian reserve, oocyte redox/mitochondrial state, ovulatory timing and luteal, implantation and placental support. These cannot be represented by a single ovulation multiplier.",
    keyReferences: [
      {
        referenceId: "ahmadi2016",
        authors: "Ahmadi et al. 2016",
        title: "Munasarjojen reserviä käsittelevä koeasetelma",
        journal: "Electronic Physician",
        keyFinding: "Pääosin eläin- tai downstream-mekanismitutkimuksia; ne eivät kalibroi ihmisen TFR-vaikutusta.",
      },
      {
        referenceId: "liu2014",
        authors: "Liu et al. 2014",
        title: "Lisääntymiskellon mekanistinen tutkimus",
        journal: "PNAS",
        keyFinding: "Pääosin eläin- tai downstream-mekanismitutkimuksia; ne eivät kalibroi ihmisen TFR-vaikutusta.",
      },
      {
        referenceId: "he2016",
        authors: "He et al. 2016",
        title: "Oosyytti- ja redox-välitilan tutkimus",
        journal: "International Journal of Molecular Sciences",
        keyFinding: "Pääosin eläin- tai downstream-mekanismitutkimuksia; ne eivät kalibroi ihmisen TFR-vaikutusta.",
      },
      {
        referenceId: "yousefi2025",
        authors: "Yousefi et al. 2025",
        title: "Naaraan lisääntymiskapasiteettia käsittelevä tutkimus",
        journal: "Reproductive Sciences",
        keyFinding: "Pääosin eläin- tai downstream-mekanismitutkimuksia; ne eivät kalibroi ihmisen TFR-vaikutusta.",
      },
    ],
  },
  {
    id: "couple",
    level: 6,
    label: "Couple capacity",
    sublabel: "male × female × shared home",
    epistemicLevel: "M",
    title: "A couple is not an average male times an average female",
    mechanism:
      "Conception and live-birth capacity are couple-specific. A shared home environment, local geometry and biological reserve can make partner states correlated.",
    quantitative:
      "Φ_couple,ij,t = Φ_m,i,t × Φ_f,j,t × F_shared-household,ij,t × L_f,j,t",
    keyReferences: [],
  },
  {
    id: "demographic-inputs",
    level: 6,
    label: "Explicit demographic inputs",
    sublabel: "demand/opportunity · tempo · ART/live birth",
    epistemicLevel: "E",
    title: "Biology does not replace population dynamics",
    mechanism:
      "Couple biological capacity is only one ASFR input. Family-formation demand and opportunity, childbearing tempo and ART/conception-to-live-birth delivery are externally measured inputs, retained separately from biology.",
    keyReferences: [],
  },
  {
    id: "asfr",
    level: 7,
    label: "ASFR",
    sublabel: "age · cohort · parity · year",
    epistemicLevel: "E",
    title: "Age-specific fertility is the primary population endpoint",
    mechanism:
      "ASFR combines visible biological couple capacity with demand/opportunity, tempo and ART/live-birth inputs. A period TFR trend is therefore not itself evidence of biological change.",
    quantitative:
      "ASFR_target = ASFR_reference × Φ_couple ratio × O ratio × tempo ratio × ART/live-birth ratio",
    keyReferences: [
      {
        referenceId: "nations2024",
        authors: "UN World Population Prospects 2024",
        title: "Age-specific fertility rates",
        journal: "United Nations",
        keyFinding: "ASFR mahdollistaa kohortti- ja tempoerottelun, jota pelkkä TFR ei tee.",
      },
    ],
  },
  {
    id: "tfr",
    level: 8,
    label: "TFR",
    sublabel: "derived ASFR sum",
    epistemicLevel: "E",
    title: "Total fertility rate",
    mechanism:
      "TFR is a period measure derived from the sum of age-specific fertility rates. It is not a direct biological endpoint and is not used to calibrate a FieldState coefficient without intervening ASFR and biological measurements.",
    quantitative: "TFR_c,t = (5 / 1000) Σ_g ASFR_c,g,t",
    keyReferences: [],
  },
];

export const BERM_CAUSAL_EDGES_V2: ChainEdge[] = [
  { from: "geometry", to: "chi", label: "directional derivative → spatial reduction [L1 + L0/L2]", epistemicLevel: "L1+L0/L2", priority: "primary" },
  { from: "geometry", to: "bound-ion-hamiltonian", label: "δg_μν → modulated energy gap [L1 + conditional]", epistemicLevel: "L1", priority: "secondary" },
  { from: "fieldstate", to: "bound-ion-hamiltonian", label: "B₀, b, f inputs", epistemicLevel: "L*", priority: "secondary" },
  { from: "bound-ion-hamiltonian", to: "relaxation-candidate", label: "Bessel argument z → λ(f,τ) [c = γ assumed]", epistemicLevel: "KANDIDAATTI", priority: "secondary" },
  { from: "relaxation-candidate", to: "l2-bridge", label: "amplitude windows → readout (open)", epistemicLevel: "L*", priority: "secondary" },
  { from: "chi", to: "l2-bridge", label: "reduced coefficient → biological coupling", epistemicLevel: "L*", priority: "primary" },
  { from: "fieldstate", to: "l2-bridge", label: "measurement input", epistemicLevel: "L*", priority: "primary" },
  { from: "l2-bridge", to: "mechanisms", label: "proposed coupling (open)", epistemicLevel: "L*", priority: "primary" },
  { from: "mechanisms", to: "btb", label: "redox / tight junction", epistemicLevel: "M" },
  { from: "mechanisms", to: "other-barriers", label: "organ-specific hypothesis", epistemicLevel: "L*" },
  { from: "mechanisms", to: "male", label: "redox / Ca²⁺ / HPA", epistemicLevel: "M", priority: "primary" },
  { from: "mechanisms", to: "female", label: "clock / redox / HPA", epistemicLevel: "M", priority: "primary" },
  { from: "btb", to: "male", label: "BTB", epistemicLevel: "M", priority: "primary" },
  { from: "male", to: "couple", label: "male capacity", epistemicLevel: "M", priority: "primary" },
  { from: "female", to: "couple", label: "female capacity", epistemicLevel: "M", priority: "primary" },
  { from: "couple", to: "asfr", label: "conception / live birth", epistemicLevel: "M", priority: "primary" },
  { from: "demographic-inputs", to: "asfr", label: "separate demographic inputs", epistemicLevel: "E", priority: "primary" },
  { from: "asfr", to: "tfr", label: "age-group sum", epistemicLevel: "E", priority: "primary" },
];

type GraphLocale = "en" | "fi";

/** Finnish text for the localised graph. Citations and equations are shared. */
const FI_NODE_COPY: Record<string, Pick<ChainNode, "label" | "sublabel" | "title" | "mechanism" | "falsificationCondition">> = {
  "bound-ion-hamiltonian": {
    label: "Sidotun ionin Hamiltonin",
    sublabel: "vaihemodulaatio → Bessel-sivukaistat [ehdollinen]",
    title: "Sivukaistarakenteen ehdollinen johto",
    mechanism:
      "Sidotun ionin energiatasojen vaihemodulaatio tuottaa Bessel-sivukaistarakenteen Jacobi–Anger-laajennuksen kautta [ehdollinen johto]. Sama laajennus syntyy missä tahansa ajetussa kaksitilajärjestelmässä, joten sivukaistarakenne on yhteensopiva vaihemodulaation kanssa eikä spesifinen metriikan ansatzille. Kerroksen 2 reseptorimoduuli laskee f_c:n, n:n, z:n ja J_n(z):n; se ei tuota väestölukua.",
    falsificationCondition:
      "Esirekisteröidyssä f:n ja B₀:n vaihtelussa normalisoidut amplitudisolmut b_null/B₀ eivät seuraa Bessel-argumentin ennustetta; tai isotoopinvaihto ei siirrä f_c:tä massasuhteen mukaan kiinteällä varauksella.",
  },
  "relaxation-candidate": {
    label: "Relaksaatiokandidaatti",
    sublabel: "λ(f,τ): 1 → 2, c = γ oletettu",
    title: "Taajuusriippuva herkkyys sidontaympäristön relaksaatiosta",
    mechanism:
      "Sidontaympäristön relaksaatio τ·dx/dt + x = B(t) tuottaa taajuusriippuvan herkkyyden λ(f,τ), joka kulkee matalan taajuuden arvosta 1 korkean taajuuden arvoon 1 + c/γ [kandidaattihypoteesi]. Arvo c = γ on kandidaatin oma lisäoletus, valittu jotta korkean taajuuden raja on IPR-kerroin 2; se ei ole Lindgrenin ansatzista määräytyvä vakio. Kalmoduliinin N-terminaalinen rakennemuutos (~20 ms, Park ym. 2008, kemiallinen Ca²⁺-askel) on lähellä kandidaatin 24 Hz:llä vaatimaa ~17,6 ms:ää; läheisyys motivoi reseptorin rakennetestiä eikä ole validointi.",
    falsificationCondition:
      "Itsenäisesti mitattu reseptorin τ ei ennusta amplitudi-ikkunan siirtymää; tai kahden taajuuden vaihetesti ei näytä vaiheriippuvuutta samalla spektriteholla.",
  },
  geometry: {
    label: "Lindgrenin geometria",
    sublabel: "metriikka + variaatio + Weyl + Bianchi",
    title: "Maxwell-johto kolmella premissillä",
    mechanism:
      "Lähteetön Maxwell-yhtälö ∇μF^μν = 0 seuraa Lindgrenin metriikasta variaatioperiaatteen, Weyl-ehdon ja Bianchi-identiteetin kautta. Bianchi-identiteetti on välttämätön mutta ei yksin riittävä: se antaa dF = 0 eikä ole oikotie lähteelliseen yhtälöön ∇μF^μν = J^ν.",
    falsificationCondition:
      "Johto epäonnistuu, jos jokin kolmesta premissitarkistuksesta (metriikka/variaatio, Weyl-yhteensopivuus tai Bianchi-identiteetti) epäonnistuu tai jos väitetty kenttäyhtälö ei seuraa kaikkien kolmen läpäisyn jälkeen.",
  },
  fieldstate: {
    label: "FieldState-havainnot",
    sublabel: "B₀, vektori, PSD, vaihe, aika",
    title: "Valinnainen paikallinen mittausmoduuli",
    mechanism:
      "FieldState erottaa tausta-, ambient- ja henkilökohtaiset kenttäkomponentit, elinkohtaisen siirtoarvion, spektrin, vaiheen, koherenssin ja vuorokausikontekstin. Se on valinnainen havainto- ja estimointimoduuli, ei BERM tai biologinen syy. Mobiililiittymä tai maakeskiarvo voi toimia vain teknologian ajoitusproxyna, ei elinannoksena.",
    falsificationCondition:
      "Jos esirekisteröidyssä asetelmassa sama paikallinen altistus tuottaa identtisen vasteen riippumatta mitatusta B₀-vektorista, geometriasta, spektristä ja vuorokausitilasta silloin kun kyseinen reseptorihypoteesi ennustaa eron.",
  },
  chi: {
    label: "Valintasääntö χ(|Ā|)",
    sublabel: "L1 + L0/L2 spatiaalinen reduktio",
    title: "Suunnattu derivaatta ja eksplisiittinen reduktio",
    mechanism:
      "Valintasääntö johdetaan kahdessa vaiheessa: (1) tilavuuselementin suunnattu derivaatta Lorentz-signatuurissa antaa κ(A·u)/√(1+κA²) [L1]; (2) eksplisiittinen dimensioton, kollineaarinen spatiaalinen/skalaari-reduktio valitsee positiivisen spatiaalisen itseisarvon ja antaa χ(|Ā|)=|Ā|/√(1+|Ā|²) [L0/L2-reduktio]. Episteeminen tila: [L1 + L0/L2 reduktio].",
    falsificationCondition:
      "Reduktio hylätään, jos ilmoitetut dimensiottomuus-, kollineaarisuus- ja positiivisen spatiaalisen itseisarvon ehdot eivät tuota skalaarikerrointa Lorentz-signatuurin suunnatusta derivaatasta.",
  },
  "l2-bridge": {
    label: "Avoin L2-silta",
    sublabel: "geometria → havaittava suure",
    title: "Kytkentäoperaattoria ei ole vielä johdettu",
    mechanism:
      "BERM ei ole vielä johtanut operaattoria, joka kuvaisi Lindgren-geometrian tai FieldState-havainnon SHBG:hen, androgeenireseptorin aktiivisuuteen, reseptoriläheiseen signalointiin tai muuhun biologiseen tilaan. Jatkohaarat ovat ehdollisia BERM-propositioita tai muualta tuotua biologiaa, eivät FieldStatesta johdettuja seurauksia.",
    falsificationCondition:
      "Ehdotettu L2-operaattori on hylättävä tai korjattava, jos esirekisteröity kohdistettu altistus–päätepistedata ei vastaa sen suunta-, spektri-, aika- tai annosennusteita.",
  },
  mechanisms: {
    label: "Biologiset välitilat",
    sublabel: "CRY · melatoniini · Ca²⁺/ROS · Vmem/mTOR · HPA · mikrobiomi/OT",
    title: "Erilliset välittäjähaarat",
    mechanism:
      "BERM ehdottaa erillisiä, testattavia välitiloja: RPM/CRY–redox, melatoniini/redox, Ca²⁺/mitokondrio–ROS, Vmem/mTOR–kehitysmuisti, kello-/HPA–HPG sekä legacy-mikrobiomi/oksitosiini. Ennen L2-sillan ratkaisemista FieldState-havainnon ei katsota synnyttäneen näitä tiloja. Ne eivät ole yksi additiivinen vaikutus; RF, ELF/PEMF ja optinen sinivalo pidetään altistusluokkina erillään.",
  },
  btb: {
    label: "Veri–kiveseste (BTB)",
    sublabel: "tight junction · spermatogeneesi",
    title: "BTB on erillinen mieshaara",
    mechanism:
      "Paikallinen kivesaltistus, redox-tila ja tight-junction-proteiinit voivat vaikuttaa spermatogeneesin suojaavaan mikroympäristöön. BTB:n hidas tila pidetään erillään BBB:stä ja akuutista siittiöredoxista.",
  },
  "other-barriers": {
    label: "Muut estetilat",
    sublabel: "BBB · istukka · retina",
    title: "Elinkohtaiset kandidaattitilat, ei yhteinen kerroin",
    mechanism:
      "BBB, istukka ja verkkokalvon este voivat jakaa redox/tight-junction-biologiaa, mutta niiden paikallinen siirto, solut, aikaskaala ja päätepiste ovat eriäviä. Ne säilyvät erillisinä kandidaattitiloina; aktiivinen v2-rekisteri ei johda niistä globaalia este- tai lisääntymiskerrointa.",
  },
  male: {
    label: "Miehen lisääntymistila",
    sublabel: "BTB · iturata · steroidogeneesi · siittiö",
    title: "Miehen elinkohtainen kapasiteetti",
    mechanism:
      "Miehen kapasiteetti erottaa ituradan varannon, BTB:n, steroidogeneesin, siittiötuoton, toiminnan ja DNA-eheyden. Nopeaa spermaredox-haaraa ei sekoiteta hitaaseen spermatogeneesi- tai BTB-muistiin.",
  },
  female: {
    label: "Naisen lisääntymistila",
    sublabel: "varanto · oosyyttiredox · kello · implantaatio",
    title: "Naisen elinkohtainen kapasiteetti",
    mechanism:
      "Naispuoli erottaa munasarjavarannon, oosyyttien redox/mitokondriotilan, ovulaation kellotuksen sekä luteaali-, implantaatio- ja istukkatuen. Näitä ei voi kuvata vain yhdellä ovulaatiokertoimella.",
  },
  couple: {
    label: "Parin kapasiteetti",
    sublabel: "mies × nainen × yhteinen kotiympäristö",
    title: "Pari ei ole keskiarvomies kertaa keskiarvonainen",
    mechanism:
      "Käsitys- ja live-birth-kapasiteetti muodostuu parikohtaisesti. Yhteinen kotiympäristö, paikallinen geometria ja biologinen varanto voivat tehdä partnerien tiloista korreloituneita.",
  },
  "demographic-inputs": {
    label: "Eksplisiittiset demografiset syötteet",
    sublabel: "kysyntä/mahdollisuus · tempo · ART/live birth",
    title: "Biologia ei korvaa väestödynamiikkaa",
    mechanism:
      "Parin biologinen kapasiteetti on vain yksi ASFR:n syöte. Perheenmuodostuksen kysyntä ja mahdollisuus, ajoittumisen tempo sekä ART:n/conception-to-live-birth-hoidon saatavuus tuodaan malliin erillisinä, ulkoisesti mitattuina syötteinä.",
  },
  asfr: {
    label: "ASFR",
    sublabel: "ikä · kohortti · parity · vuosi",
    title: "Ikäkohtainen hedelmällisyys on ensisijainen väestöpäätepiste",
    mechanism:
      "ASFR yhdistää biologisen parikapasiteetin näkyviin kysyntä/mahdollisuus-, tempo- ja ART/live-birth -syötteisiin. Siksi TFR:n muutos ei yksin kerro biologisesta muutoksesta.",
  },
  tfr: {
    label: "TFR",
    sublabel: "johdettu ASFR-summa",
    title: "Kokonaishedelmällisyysluku",
    mechanism:
      "TFR on periodimitta, joka saadaan ikäkohtaisten hedelmällisyyslukujen summana. Se ei ole suora biologinen päätepiste eikä sitä käytetä FieldState-kertoimen kalibrointiin ilman ASFR- ja biologisia välitiloja.",
  },
};

const FI_EDGE_LABELS: Record<string, string> = {
  "geometry-bound-ion-hamiltonian": "δg_μν → moduloitu energiaväli [L1 + ehdollinen]",
  "fieldstate-bound-ion-hamiltonian": "B₀-, b- ja f-syötteet",
  "bound-ion-hamiltonian-relaxation-candidate": "Bessel-argumentti z → λ(f,τ) [c = γ oletettu]",
  "relaxation-candidate-l2-bridge": "amplitudi-ikkunat → lukumekanismi (avoin)",
  "geometry-chi": "suunnattu derivaatta → spatiaalinen reduktio [L1 + L0/L2]",
  "chi-l2-bridge": "redusoitu kerroin → biologinen kytkentä",
  "fieldstate-l2-bridge": "mittaussyöte",
  "l2-bridge-mechanisms": "ehdotettu kytkentä (avoin)",
  "mechanisms-btb": "redox / tight junction",
  "mechanisms-other-barriers": "elinkohtainen hypoteesi",
  "mechanisms-male": "redox / Ca²⁺ / HPA",
  "mechanisms-female": "kello / redox / HPA",
  "btb-male": "BTB",
  "male-couple": "mieskapasiteetti",
  "female-couple": "naiskapasiteetti",
  "couple-asfr": "käsitys / live birth",
  "demographic-inputs-asfr": "erilliset demografiset syötteet",
  "asfr-tfr": "ikäryhmäsumma",
};

/**
 * Returns a locale-specific copy of the canonical graph. It intentionally
 * changes presentation text only: evidence level, topology and citations are
 * identical in both languages.
 */
export function getFieldStateCausalGraph(locale: GraphLocale): {
  nodes: ChainNode[];
  edges: ChainEdge[];
} {
  if (locale === "en") {
    return { nodes: BERM_CAUSAL_NODES_V2, edges: BERM_CAUSAL_EDGES_V2 };
  }

  return {
    nodes: BERM_CAUSAL_NODES_V2.map((node) => ({ ...node, ...FI_NODE_COPY[node.id] })),
    edges: BERM_CAUSAL_EDGES_V2.map((edge) => ({
      ...edge,
      label: FI_EDGE_LABELS[`${edge.from}-${edge.to}`] ?? edge.label,
    })),
  };
}
