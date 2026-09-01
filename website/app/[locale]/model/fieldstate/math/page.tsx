import type { Metadata } from "next";
import Link from "next/link";
import { Sigma } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { MathBlock } from "@/components/MathBlock";
import { CohortAsfrProfile } from "@/components/CohortAsfrProfile";

type SectionData = {
  id: string;
  title: string;
  body: readonly string[];
  equations?: readonly string[];
  note?: string;
};

type Copy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  nav: readonly { id: string; label: string }[];
  sections: readonly SectionData[];
  modelLink: string;
  fieldstateLink: string;
  nextLabel: string;
  nextTitle: string;
};

const t: Record<string, Copy> = {
  en: {
    metaTitle: "BERM v17 mathematics – Extinction Field",
    metaDescription: "BERM v17 mathematical specification: measurement-aware route from Lindgren geometry to TFR.",
    title: "BERM v17 mathematical specification",
    subtitle:
      "A measurement-aware route from Lindgren-derived field hypotheses to organ states, couple capacity, age-specific fertility and TFR.",
    nav: [
      { id: "premise", label: "Physics premise" },
      { id: "fieldstate", label: "FieldState" },
      { id: "static-interface-math", label: "Static interface" },
      { id: "organ-state", label: "Organ state" },
      { id: "asfr", label: "ASFR \u2192 TFR" },
      { id: "cohort", label: "Cohort signal" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "Validation boundary" },
      { id: "s16", label: "T-Type bifurcation" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren is a physics premise, not a population-effect estimate",
        body: [
          "The geometric ansatz is retained as the upstream hypothesis that motivates background dependence and quadratic cross-terms. It is not treated as independently validated human reproductive physics, and it does not itself supply an EMF-to-TFR coefficient.",
          "The normalised quantity used by the model is a documented FieldState coordinate. It is not obtained by inserting a membrane field expressed in V/m into \u03c7. Local membrane potential, receptor orientation and tissue state are separate biological variables.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "Status: theory / structural hypothesis. The discriminating evidence is a measured vector-, angle-, spectrum- or timing-dependent response, not a country-level scalar correlation.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState preserves the required physical quantities",
        body: [
          "For organ o, background, ambient and personal components are transferred through an organ-, posture- and geometry-specific transfer function T\u2092. Vector direction, phase/coherence, envelope/beat PSD, circadian context and source provenance remain explicit fields.",
          "Mobile subscriptions can describe digital-environment diffusion. The FieldState record instead documents local physical conditions and organ-specific transfer before an endpoint is analysed.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "A measurement-ready FieldState requires documented normalisation, B\u2080, organ transfer, PSD, circadian context, phase/coherence and measurement provenance. Incomplete records are reported as partial FieldState data.",
      },
      {
        id: "static-interface-math",
        title: "3. Static triboelectric interface is a local FieldState branch",
        body: [
          "A material\u2013skin or organism interface is represented by {Q, \u0394\u03c6ref, E(r,t), \u2207|E|\u00b2, dE/dt, \u03c4}. It preserves DC/triboelectric transport separately from the low-frequency waveform and polarity component used for species-specific sensing and behaviour. A material name is not itself an exposure coordinate.",
          "The historical V/cm\u00b2 textile reading is physically underdetermined: it preserves a material ordering but cannot yield charge, V/m or an organ field without a named reference electrode, probe area/distance/orientation/calibration, ground-path impedance, capacitance to reference and an empirical decay measurement. In a checked fixture \u03c4RC\u2248RleakCeff is a comparator, not a replacement for measured multi-phase decay.",
        ],
        equations: [
          "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}(m,v,p,A,RH,T)-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
          "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
          "F_{\\mathrm{ind}}\\approx\\frac{1}{2}\\alpha\\nabla(E^2)",
        ],
        note:
          "For a polarizable tick, the third expression is a local induced-attraction proxy, not a universal threshold or a population effect. The static interface reaches an organ only through a named local transfer to the existing Vmem/Ca\u00b2\u207a\u2013redox or surface-sensory HPA\u2013HPG states.",
      },
      {
        id: "organ-state",
        title: "4. Biological capacity is organ-specific reversible/persistent state",
        body: [
          "A field feature affects a registered organ endpoint only through an explicit, evidence-linked increment model. Each organ has a reversible state R and persistent state P. Their retention and endpoint mapping are parameterised only when a parameter ID and evidence ID are supplied.",
          "The male branch separates blood\u2013testis-barrier integrity, germline reserve, steroidogenesis, sperm output/function and DNA integrity. The female branch separates ovarian reserve, oocyte redox, ovulatory clock and luteal/implantation support. BTB has the registered direct reproductive branch; BBB, placenta and retina remain separate candidate barrier states rather than a shared multiplier.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "These are structures, not currently published country coefficients. Candidate placenta, BBB and retinal states receive a reproductive increment only after a parameter- and evidence-linked mapping is registered. Pathway independence note: the multiplicative model R = (1 \u2212 \u03b3_A \u00b7 r_A) \u00d7 (1 \u2212 \u03b3_C \u00b7 r_C) is retained without a cross-term because pathways A (VGCC) and C (CRY2) are pharmacologically separable. \u03b3_C reflects both CRY2 downstream branches: \u03b3_C = \u03b3_C_clock + \u03b3_C_TRPC1. These are not separated in the model because both share the same upstream sensor (CRY2), light dependence, and FAD dependence.",
      },
      {
        id: "asfr",
        title: "5. Couple state enters ASFR before TFR",
        body: [
          "A population average must retain the shared household and partner covariance; it is not a country-average male multiplier times a country-average female multiplier. Biological conception/live-birth capacity is then kept separate from demand/opportunity, period tempo and ART/live-birth delivery.",
          "TFR is a period sum of age-specific fertility rates. It is not a direct measure of gonadal capacity, so a change in TFR cannot be assigned to FieldState without the intervening ASFR and biological measurements.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{\u2013}19}^{45\\text{\u2013}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP ASFR is the demographic reference. Demand/opportunity (O), tempo (\u03c4) and ART are explicit external inputs, not residual labels for biology.",
      },
      {
        id: "cohort",
        title: "6. Current population result: a descriptive cohort-timing signal",
        body: [
          "With WPP 2024 ASFR and World Bank/ITU mobile subscriptions, the development-weighted young-minus-older cohort timing proxy correlates with the young-minus-older ASFR log-change in 2000\u20132023. The complete-country run has N = 163 and Pearson r = \u22120.66645; the BERM-country subset has N = 54 and r = \u22120.64012.",
          "This is useful because it follows the age/cohort premise better than a contemporaneous national TFR\u2013subscription correlation. It remains a technology-timing proxy: region, income and demographic structure are material alternative explanations. It is not FieldState, a biological effect estimate or a calibration coefficient.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{\u2013}29}-\\overline{C}_{30\\text{\u2013}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{\u2013}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{\u2013}49}",
        ],
        note:
          "This is a versioned, reproducible descriptive technology-timing analysis. Its development weights are scenario weights rather than calibrated sensitivity estimates. A v2 population estimate awaits matched FieldState, biomarker, couple and ASFR panels.",
      },
      {
        id: "gme",
        title: "7. GME / R42 is an experimental branch, not a network inference",
        body: [
          "Quadratic mixing motivates retaining an envelope/beat PSD in FieldState. Zandieh et al. (2025) observed frequency-dependent mitochondrial/ROS behaviour in cancer-cell experiments at ELF conditions (0.01\u20135 Hz; fields up to 100 mT). This provides an experimental candidate for cell-state-dependent response windows.",
          "It does not demonstrate RF-network envelope effects, an eDRX field signature, or reproductive harm. Any R42 analysis is therefore exploratory and must begin with measured PSD, sham/thermal controls and a pre-specified biological endpoint.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "Status: L* research protocol. No country-level or TFR parameter is derived from this branch.",
      },
      {
        id: "validation",
        title: "8. What constitutes a v2 result",
        body: [
          "A valid v2 calibration requires a matched FieldState panel, measured organ or couple endpoint, explicit parameter/evidence IDs and a train-only estimation period. A later ASFR/TFR period remains outside the fit for temporal evaluation.",
          "A population estimate is published when the corresponding FieldState and endpoint panels have been assembled, the mappings are registered and the temporal evaluation is complete.",
        ],
        note:
          "The specification keeps measurement, endpoint mapping and demographic estimation visible so each can be independently tested and improved.",
      },
      {
        id: "s16",
        title: "\u00a716 \u2014 T-Type Channel Bifurcation Amplification",
        body: [
          "The '\u03b4Vm too small' objection to non-thermal EMF effects is resolved by two physical facts: (1) the Schwan equation shows that cell geometry amplifies external fields by a factor of ~1.5R/d \u2248 1500 at the membrane at ELF frequencies, and (2) T-type calcium channels operate at a bifurcation point (window current) where even thermal-noise-level perturbations shift opening probability.",
        ],
        equations: [
          "\\delta V_m = 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}} \\cdot \\frac{1}{\\sqrt{1 + (f/f_c)^2}}",
          "\\text{At ELF } (f \\ll f_c \\approx 500\\,\\text{kHz}):\\quad \\delta V_m \\approx 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}}",
          "R = 10\\,\\mu\\text{m},\\; E = 1\\,\\text{V/m}:\\quad \\delta V_m = 15\\,\\mu\\text{V}",
          "P_{\\mathrm{open}}(V) = \\frac{1}{1 + \\exp\\!\\left(-\\frac{V - V_{1/2}}{k}\\right)},\\quad V_{1/2} = -57\\,\\text{mV},\\; k = 6\\,\\text{mV}",
          "V_{\\mathrm{rest}} = -70\\,\\text{mV},\\quad P_{\\mathrm{open}}(-70) = 0.103\\;\\text{(10.3\\% window current)}",
          "\\left.\\frac{dP}{dV}\\right|_{\\mathrm{rest}} = \\frac{P(1-P)}{k} = 15.4\\,\\text{V}^{-1}",
          "\\delta N = N_{\\mathrm{channels}} \\times \\frac{dP}{dV} \\times \\delta V_m,\\quad N = 5000,\\; \\delta V_m = 7.5\\,\\mu\\text{V}:\\; \\delta N = 0.58",
          "\\delta V_{\\mathrm{thermal}} = \\sqrt{kT/C_m} = 20.3\\,\\mu\\text{V}",
          "\\text{At } 1\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 0.37\\;\\text{(37\\%)},\\qquad \\text{At } 5\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 1.84\\;\\text{(184\\%)}",
        ],
        note:
          "The key insight is that EMF biological effects operate through the ELF MODULATION component of RF signals, not the carrier frequency. At RF (GHz), the membrane capacitance shorts the voltage (attenuation ~10\u207b\u00b3). But the ELF envelope (50\u2013217 Hz for GSM/LTE) passes through at full amplitude. T-type channels respond to this ELF component. CAVEAT: The Ca\u00b2\u207a accumulation calculation does not account for cellular pumps (PMCA, NCX, SERCA) and buffers (calmodulin, calbindin). The steady-state [Ca\u00b2\u207a]\u1d62 increase is estimated at 5\u201350%, not the gross influx numbers.",
      },
    ],
    modelLink: "\u2190 Back to model overview",
    fieldstateLink: "FieldState measurement specification",
    nextLabel: "Next",
    nextTitle: "Evidence registry",
  },
  fi: {
    metaTitle: "BERM v17 -matematiikka \u2013 Extinction Field",
    metaDescription: "BERM:n mittaustietoinen BERM v17-m\u00e4\u00e4rittely.",
    title: "BERM v17:n matemaattinen m\u00e4\u00e4rittely",
    subtitle:
      "Mittaustietoinen reitti Lindgrenist\u00e4 johdetuista kentt\u00e4hypoteeseista elintiloihin, parikapasiteettiin, ik\u00e4kohtaiseen hedelmällisyyteen ja TFR:ään.",
    nav: [
      { id: "premise", label: "Fysiikan premissi" },
      { id: "fieldstate", label: "FieldState" },
      { id: "static-interface-math", label: "Staattinen rajapinta" },
      { id: "organ-state", label: "Elintila" },
      { id: "asfr", label: "ASFR \u2192 TFR" },
      { id: "cohort", label: "Kohorttisignaali" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "Todentamisraja" },
      { id: "s16", label: "T-tyypin bifurkaatio" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren on fysiikkapremissi, ei v\u00e4est\u00f6vaikutusarvio",
        body: [
          "Geometrinen ansatz s\u00e4ilytet\u00e4\u00e4n upstream-hypoteesina, joka motivoi taustariippuvuutta ja neli\u00f6llisi\u00e4 ristitermej\u00e4. Sit\u00e4 ei k\u00e4sitell\u00e4 itsen\u00e4isesti validoituna ihmisen lis\u00e4\u00e4ntymisfysiikkana, eik\u00e4 se itsess\u00e4\u00e4n anna EMF \u2192 TFR -kerrointa.",
          "Mallin k\u00e4ytt\u00e4m\u00e4 normalisoitu suure on dokumentoitu FieldState-koordinaatti. Sit\u00e4 ei saada sijoittamalla V/m-yksik\u00f6iss\u00e4 oleva kalvokentt\u00e4 suoraan \u03c7:hon. Paikallinen kalvopotentiaali, reseptorin orientaatio ja kudostila ovat erillisi\u00e4 biologisia muuttujia.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "Tila: teoria / rakenteellinen hypoteesi. Erottava n\u00e4ytt\u00f6 on mitattu vektori-, kulma-, spektri- tai ajoitusriippuvainen vaste, ei maan tason skalaarikorrelaatio.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState s\u00e4ilytt\u00e4\u00e4 tarvittavat fysikaaliset suureet",
        body: [
          "Elimelle o tausta-, ambient- ja henkil\u00f6kohtaiset komponentit siirtyv\u00e4t elin-, asento- ja geometriakohtaisen siirtofunktion T\u2092 kautta. Vektorin suunta, vaihe/koherenssi, envelope/beat-PSD, vuorokausikonteksti ja l\u00e4hdeprovenienssi s\u00e4ilyv\u00e4t nimenomaisina kenttinä.",
          "Mobiililiittymät voivat kuvata digitaalisen ymp\u00e4rist\u00f6n leviämist\u00e4. FieldState-tietue dokumentoi sen sijaan paikalliset fysikaaliset olosuhteet ja elinkohtaisen siirron ennen p\u00e4\u00e4tepisteanalyysiä.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "Mittausvalmis FieldState vaatii dokumentoidun normalisoinnin, B\u2080:n, elinsiirron, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja mittausprovenienssin. Ep\u00e4t\u00e4ydelliset tietueet raportoidaan osittaisena FieldState-datana.",
      },
      {
        id: "static-interface-math",
        title: "3. Staattinen triboelektrinen rajapinta on paikallinen FieldState-haara",
        body: [
          "Materiaali\u2013iho- tai eli\u00f6rajapinta esitet\u00e4\u00e4n joukkona {Q, \u0394\u03c6ref, E(r,t), \u2207|E|\u00b2, dE/dt, \u03c4}. Se pit\u00e4\u00e4 DC-/triboelektrisen kuljetuksen erill\u00e4\u00e4n matalataajuisesta aaltomuoto- ja polariteettikomponentista, jota k\u00e4ytet\u00e4\u00e4n lajikohtaisessa aistimisessa ja k\u00e4ytt\u00e4ytymisess\u00e4. Materiaalin nimi ei itsess\u00e4\u00e4n ole altistuskoordinaatti.",
          "Historiallinen V/cm\u00b2-tekstiilimittarilukema on fysikaalisesti alim\u00e4\u00e4r\u00e4tty: se s\u00e4ilytt\u00e4\u00e4 materiaalij\u00e4rjestyksen, mutta siit\u00e4 ei saa varausta, V/m-arvoa eik\u00e4 elinkentt\u00e4\u00e4 ilman nimettyä referenssielektrodia, mittap\u00e4\u00e4n alaa/et\u00e4isyytt\u00e4/suuntaa/kalibrointia, maareitin impedanssia, kapasitanssia referenssiin ja empiirist\u00e4 purkautumismittausta. Tarkistetussa mittausasetelmassa \u03c4RC\u2248RleakCeff on vertailusuure, ei mitatun monivaiheisen purkautumisen korvike.",
        ],
        equations: [
          "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}(m,v,p,A,RH,T)-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
          "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
          "F_{\\mathrm{ind}}\\approx\\frac{1}{2}\\alpha\\nabla(E^2)",
        ],
        note:
          "Polarisoituvalle punkille kolmas yht\u00e4l\u00f6 on paikallinen indusoidun vetovoiman approksimaatio, ei yleinen kynnys eik\u00e4 populaatiovaikutus. Staattinen rajapinta voi edet\u00e4 elimeen vain nimetyn paikallissiirron kautta nykyisiin Vmem/Ca\u00b2\u207a\u2013redox- tai pinta-aistisiin HPA\u2013HPG-tiloihin.",
      },
      {
        id: "organ-state",
        title: "4. Biologinen kapasiteetti on elinkohtainen palautuva/pysyvä tila",
        body: [
          "Kenttäpiirre vaikuttaa rekister\u00f6ityyn elinp\u00e4\u00e4tepisteeseen vain nimenomaisen, näyttöön kiinnitetyn incrementtimallin kautta. Jokaisella elimellä on palautuva R-tila ja pysyvä P-tila. Niiden retentio ja p\u00e4\u00e4tepistekuvaus parametroituu vasta, kun mukana ovat parametri-ID ja näyttö-ID.",
          "Mieshaara erottaa veri\u2013kivesesteen, ituradan varannon, steroidogeneesin, siitti\u00f6tuoton/toiminnan ja DNA-eheyden. Naishaara erottaa munasarjavarannon, oosyyttiredoxin, ovulaation kellotuksen sek\u00e4 luteaali-/implantaatiotuen. BTB:ll\u00e4 on rekister\u00f6ity suora lisääntymishaara; BBB, istukka ja retina ovat erillisi\u00e4 kandidaatti-estetiloja, eiv\u00e4t yhteinen kerroin.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "N\u00e4m\u00e4 ovat rakenteita, eiv\u00e4t viel\u00e4 julkaistuja maakohtaisia kertoimia. Istukan, BBB:n ja retinan kandidaattitilat saavat lis\u00e4\u00e4ntymisincrementin vasta, kun parametri- ja näyttökiinnitteinen mapping on rekister\u00f6ity. Polkujen riippumattomuus: multiplikatiivinen malli R = (1 \u2212 \u03b3_A \u00b7 r_A) \u00d7 (1 \u2212 \u03b3_C \u00b7 r_C) s\u00e4ilytet\u00e4\u00e4n ilman ristitermi\u00e4, koska polut A (VGCC) ja C (CRY2) ovat farmakologisesti erotettavissa. \u03b3_C heijastaa molempia CRY2:n alasp\u00e4in suuntautuvia haaroja: \u03b3_C = \u03b3_C_kello + \u03b3_C_TRPC1. N\u00e4it\u00e4 ei erotella mallissa, koska molemmat jakavat saman yl\u00e4virta-sensorin (CRY2), valoriippuvuuden ja FAD-riippuvuuden.",
      },
      {
        id: "asfr",
        title: "5. Paritila tulee ASFR:ään ennen TFR:ää",
        body: [
          "V\u00e4est\u00f6keskiarvon on s\u00e4ilytettävä yhteinen kotiymp\u00e4rist\u00f6 ja partnerikovarianssi; se ei ole maan keskiarvomiehen ja keskiarvonaisen tulo. Biologinen k\u00e4sitys-/live-birth-kapasiteetti erotetaan lis\u00e4ksi kysynn\u00e4stä/mahdollisuudesta, perioditemposta ja ART:n live-birth-toimituksesta.",
          "TFR on ik\u00e4kohtaisten hedelmällisyyslukujen periodisumma. Se ei ole suora gonadikapasiteetin mittari, joten TFR-muutosta ei voi osoittaa FieldStatelle ilman v\u00e4liss\u00e4 olevia ASFR- ja biologisia mittauksia.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{\u2013}19}^{45\\text{\u2013}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP-ASFR on demografinen referenssi. Kysynt\u00e4/mahdollisuus (O), tempo (\u03c4) ja ART ovat n\u00e4kyvi\u00e4 ulkoisia sy\u00f6tteit\u00e4, eiv\u00e4t biologian jäännösmerkint\u00f6j\u00e4.",
      },
      {
        id: "cohort",
        title: "6. Nykyinen v\u00e4est\u00f6tulos: kuvaileva kohortti-ajoitussignaali",
        body: [
          "WPP 2024:n ASFR- ja World Bank/ITU:n mobiililiittym\u00e4sarjoilla kehityspainotettu nuori\u2013vanhempi-kohortin ajoitusproksi korreloi nuori\u2013vanhempi-ASFR:n logmuutoksen kanssa 2000\u20132023. Koko maapaneelissa N = 163 ja Pearson r = \u22120,66645; BERM-maiden osajoukossa N = 54 ja r = \u22120,64012.",
          "Tulos on hy\u00f6dyllinen, koska se seuraa ik\u00e4-/kohorttipremissi\u00e4 paremmin kuin samanaikainen kansallinen TFR\u2013liittym\u00e4korrelaatio. Se on silti teknologiakehityksen ajoitusproksi: alue, tulotaso ja demografinen rakenne ovat olennaisia vaihtoehtoisia selityksi\u00e4. Se ei ole FieldState, biologinen vaikutusarvio eik\u00e4 kalibrointikerroin.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{\u2013}29}-\\overline{C}_{30\\text{\u2013}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{\u2013}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{\u2013}49}",
        ],
        note:
          "Analyysi on versionoitu ja toistettava kuvaileva teknologia-ajoitusanalyysi. Sen kehityspainot ovat skenaariopainoja, eiv\u00e4t kalibroituja herkkyysarvioita. V2:n v\u00e4est\u00f6arvio odottaa kohdistettua FieldState-, biomarkkeri-, pari- ja ASFR-paneelia.",
      },
      {
        id: "gme",
        title: "7. GME / R42 on kokeellinen haara, ei verkkop\u00e4\u00e4telm\u00e4",
        body: [
          "Neli\u00f6llinen sekoitus motivoi envelope/beat-PSD:n s\u00e4ilytt\u00e4mist\u00e4 FieldStatessa. Zandieh ym. (2025) havaitsi taajuusriippuvaista mitokondrio-/ROS-k\u00e4ytt\u00e4ytymist\u00e4 sy\u00f6p\u00e4solukokeissa ELF-olosuhteissa (0,01\u20135 Hz; kentti\u00e4 enint\u00e4\u00e4n 100 mT). T\u00e4m\u00e4 tarjoaa kokeellisen ehdokkaan solutilariippuvaiselle vasteikkunalle.",
          "Se ei osoita RF-verkon envelope-vaikutusta, eDRX-kenttäallekirjoitusta eik\u00e4 lis\u00e4\u00e4ntymishaittaa. Mahdollinen R42-analyysi on siksi alustava: l\u00e4ht\u00f6kohtana ovat mitattu PSD, sham-/l\u00e4mp\u00f6kontrollit ja ennalta m\u00e4\u00e4ritelty biologinen p\u00e4\u00e4tepiste.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "Tila: L*-tason tutkimusprotokolla. T\u00e4st\u00e4 haarasta ei johdeta maakohtaista eik\u00e4 TFR-parametria.",
      },
      {
        id: "validation",
        title: "8. Mik\u00e4 muodostaa v2-tuloksen",
        body: [
          "P\u00e4tev\u00e4 v2-kalibrointi edellytt\u00e4\u00e4 kohdistettua FieldState-paneelia, mitattua elin- tai parip\u00e4\u00e4tepistett\u00e4, nimenomaisia parameter/evidence-ID:t\u00e4 ja vain opetusjaksolta teht\u00e4v\u00e4\u00e4 estimointia. My\u00f6hempi ASFR/TFR-jakso j\u00e4\u00e4 sovituksen ulkopuolelle ajalliseen arviointiin.",
          "V\u00e4est\u00f6arvio julkaistaan, kun vastaavat FieldState- ja endpoint-paneelit on koottu, mappingit rekister\u00f6ity ja ajallinen arviointi valmis.",
        ],
        note:
          "M\u00e4\u00e4rittely pit\u00e4\u00e4 mittauksen, p\u00e4\u00e4tepistemappingin ja demografisen estimoinnin n\u00e4kyvin\u00e4, jotta kutakin voidaan testata ja parantaa itsen\u00e4isesti.",
      },
      {
        id: "s16",
        title: "\u00a716 \u2014 T-tyypin kanavan bifurkaatiovahvistus",
        body: [
          "'\u03b4Vm liian pieni' -vastav\u00e4ite ei-termisiin EMF-vaikutuksiin ratkeaa kahdella fysikaalisella tosiasialla: (1) Schwanin yht\u00e4l\u00f6 osoittaa, ett\u00e4 solun geometria vahvistaa ulkoisen kent\u00e4n kertoimella ~1,5R/d \u2248 1500 kalvolla ELF-taajuuksilla, ja (2) T-tyypin kalsiumkanavat toimivat bifurkaatiopisteess\u00e4 (ikkunavirta), jossa jo termisen kohinan tasoiset h\u00e4iri\u00f6t muuttavat avautumistodenn\u00e4k\u00f6isyytt\u00e4.",
        ],
        equations: [
          "\\delta V_m = 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}} \\cdot \\frac{1}{\\sqrt{1 + (f/f_c)^2}}",
          "\\text{At ELF } (f \\ll f_c \\approx 500\\,\\text{kHz}):\\quad \\delta V_m \\approx 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}}",
          "R = 10\\,\\mu\\text{m},\\; E = 1\\,\\text{V/m}:\\quad \\delta V_m = 15\\,\\mu\\text{V}",
          "P_{\\mathrm{open}}(V) = \\frac{1}{1 + \\exp\\!\\left(-\\frac{V - V_{1/2}}{k}\\right)},\\quad V_{1/2} = -57\\,\\text{mV},\\; k = 6\\,\\text{mV}",
          "V_{\\mathrm{rest}} = -70\\,\\text{mV},\\quad P_{\\mathrm{open}}(-70) = 0.103\\;\\text{(10.3\\% window current)}",
          "\\left.\\frac{dP}{dV}\\right|_{\\mathrm{rest}} = \\frac{P(1-P)}{k} = 15.4\\,\\text{V}^{-1}",
          "\\delta N = N_{\\mathrm{channels}} \\times \\frac{dP}{dV} \\times \\delta V_m,\\quad N = 5000,\\; \\delta V_m = 7.5\\,\\mu\\text{V}:\\; \\delta N = 0.58",
          "\\delta V_{\\mathrm{thermal}} = \\sqrt{kT/C_m} = 20.3\\,\\mu\\text{V}",
          "\\text{At } 1\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 0.37\\;\\text{(37\\%)},\\qquad \\text{At } 5\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 1.84\\;\\text{(184\\%)}",
        ],
        note:
          "Keskeinen oivallus on, ett\u00e4 EMF:n biologiset vaikutukset v\u00e4littyv\u00e4t RF-signaalien ELF-MODULAATIOKOMPONENTIN kautta, eiv\u00e4t kantoaallon taajuuden. RF-taajuuksilla (GHz) kalvon kapasitanssi oikosulkee j\u00e4nnitteen (vaimennus ~10\u207b\u00b3). Mutta ELF-verhok\u00e4yr\u00e4 (50\u2013217 Hz GSM/LTE:lle) l\u00e4p\u00e4isee t\u00e4ydell\u00e4 amplitudilla. T-tyypin kanavat reagoivat t\u00e4h\u00e4n ELF-komponenttiin. VAROITUS: Ca\u00b2\u207a-kertym\u00e4laskenta ei huomioi solupumppuja (PMCA, NCX, SERCA) eik\u00e4 puskureita (kalmoduliini, kalbindiini). Vakaan tilan [Ca\u00b2\u207a]\u1d62-kasvu arvioidaan 5\u201350 %:ksi, ei brutto-sisäänvirtausluvuiksi.",
      },
    ],
    modelLink: "\u2190 Takaisin mallin yleiskatsaukseen",
    fieldstateLink: "FieldState-mittausm\u00e4\u00e4rittely",
    nextLabel: "Seuraavaksi",
    nextTitle: "Näyttörekisteri",
  },
  ja: {
    metaTitle: "BERM v17 数学 – Extinction Field",
    metaDescription: "BERMの測定対応BERM v17仕様。",
    title: "BERM v17 数学的仕様",
    subtitle:
      "Lindgren由来の電磁界仮説から臓器状態、カップル容量、年齢別出生率およびTFRへの測定対応経路。",
    nav: [
      { id: "premise", label: "物理学的前提" },
      { id: "fieldstate", label: "FieldState" },
      { id: "static-interface-math", label: "静電界面" },
      { id: "organ-state", label: "臓器状態" },
      { id: "asfr", label: "ASFR \u2192 TFR" },
      { id: "cohort", label: "コホートシグナル" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "検証境界" },
      { id: "s16", label: "T型分岐" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgrenは物理学的前提であり、集団効果推定ではない",
        body: [
          "幾何学的アンザッツは、バックグラウンド依存性と二次交差項を動機付ける上流仮説として保持されます。独立に検証された人間の生殖物理学としては扱われず、それ自体がEMFからTFRへの係数を提供するものではありません。",
          "モデルが使用する正規化量は文書化されたFieldState座標です。V/mで表される膜電場をχに挿入して得られるものではありません。局所膜電位、受容体の配向および組織状態は別個の生物学的変数です。",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "状態：理論/構造的仮説。弁別的エビデンスはベクトル、角度、スペクトルまたはタイミング依存の測定された応答であり、国家レベルのスカラー相関ではありません。",
      },
      {
        id: "fieldstate",
        title: "2. FieldStateは必要な物理量を保存する",
        body: [
          "臓器oについて、バックグラウンド、環境および個人成分は臓器、姿勢および形状固有の伝達関数Tₒを通じて伝達されます。ベクトル方向、位相/コヒーレンス、包絡線/ビートPSD、概日リズム文脈およびソース来歴は明示的なフィールドとして保持されます。",
          "モバイル加入はデジタル環境の普及を記述できます。FieldStateレコードは代わりに、エンドポイントが分析される前の局所物理条件と臓器固有の伝達を文書化します。",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "測定準備済みFieldStateには、文書化された正規化、B₀、臓器伝達、PSD、概日リズム文脈、位相/コヒーレンスおよび測定来歴が必要です。不完全なレコードは部分的FieldStateデータとして報告されます。",
      },
      {
        id: "static-interface-math",
        title: "3. 静電摩擦電気界面は局所的FieldState分岐である",
        body: [
          "材料-皮膚または生物界面は{Q, Δφref, E(r,t), ∇|E|², dE/dt, τ}で表されます。DC/摩擦電気輸送を、種固有の感知と行動に使用される低周波波形および極性成分とは別に保存します。材料名自体は暴露座標ではありません。",
          "歴史的V/cm²テキスタイル計測値は物理的に不十分に決定されています：材料順序を保存しますが、名前付き参照電極、プローブ面積/距離/配向/校正、接地経路インピーダンス、参照へのキャパシタンスおよび経験的減衰測定なしでは電荷、V/mまたは臓器電磁界を導出できません。検査済み設備ではτRC≈RleakCeffは比較対象であり、測定された多相減衰の代替ではありません。",
        ],
        equations: [
          "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}(m,v,p,A,RH,T)-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
          "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
          "F_{\\mathrm{ind}}\\approx\\frac{1}{2}\\alpha\\nabla(E^2)",
        ],
        note:
          "分極可能なダニにとって、第三の式は局所的な誘導引力プロキシであり、普遍的閾値や集団効果ではありません。静電界面は、既存のVmem/Ca²⁺-レドックスまたは表面感覚HPA-HPG状態への名前付き局所伝達を通じてのみ臓器に到達します。",
      },
      {
        id: "organ-state",
        title: "4. 生物学的容量は臓器固有の可逆/持続状態である",
        body: [
          "電磁界の特徴は、明示的でエビデンスにリンクされた増分モデルを通じてのみ登録された臓器エンドポイントに影響します。各臓器には可逆状態Rと持続状態Pがあります。その保持とエンドポイントマッピングはパラメータIDとエビデンスIDが提供された場合にのみパラメータ化されます。",
          "男性系統は血液-精巣関門の完全性、生殖細胞系列予備能、ステロイド産生、精子産出/機能およびDNA完全性を分離します。女性系統は卵巣予備能、卵母細胞レドックス、排卵時計および黄体/着床支持を分離します。BTBは登録された直接的生殖分岐を持ちます。BBB、胎盤および網膜は共有乗数ではなく個別の候補障壁状態です。",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "これらは構造であり、現在公表されている国別係数ではありません。胎盤、BBBおよび網膜の候補状態は、パラメータおよびエビデンスにリンクされたマッピングが登録された後にのみ生殖増分を受け取ります。経路独立性に関する注記：乗法モデルR = (1 − γ_A · r_A) × (1 − γ_C · r_C)は交差項なしで保持されます。経路A（VGCC）とC（CRY2）は薬理学的に分離可能だからです。γ_Cは両方のCRY2下流分岐を反映します：γ_C = γ_C_clock + γ_C_TRPC1。モデルではこれらは分離されません。両方が同じ上流センサー（CRY2）、光依存性およびFAD依存性を共有するためです。",
      },
      {
        id: "asfr",
        title: "5. カップル状態はTFRの前にASFRに入る",
        body: [
          "集団平均は共有世帯およびパートナー共分散を保持しなければなりません。国家平均の男性乗数に国家平均の女性乗数を掛けたものではありません。生物学的受胎/出生容量はその後、需要/機会、期間テンポおよびART/出生提供とは別に保持されます。",
          "TFRは年齢別出生率の期間合計です。性腺容量の直接的測定ではないため、介在するASFRおよび生物学的測定なしにTFRの変化をFieldStateに帰属させることはできません。",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{\u2013}19}^{45\\text{\u2013}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP ASFRは人口学的参照です。需要/機会（O）、テンポ（τ）およびARTは明示的な外部入力であり、生物学の残差ラベルではありません。",
      },
      {
        id: "cohort",
        title: "6. 現在の集団結果：記述的コホートタイミングシグナル",
        body: [
          "WPP 2024のASFRとWorld Bank/ITUのモバイル加入データにより、開発加重の若年対高齢コホートタイミングプロキシは2000-2023年の若年対高齢ASFR対数変化と相関します。全国パネルではN = 163、ピアソンr = −0.66645；BERM対象国サブセットではN = 54、r = −0.64012です。",
          "これは同時期の国家TFR-加入相関よりも年齢/コホート前提によく従うため有用です。しかし依然として技術タイミングプロキシです：地域、所得および人口構造は実質的な代替説明です。FieldState、生物学的効果推定または校正係数ではありません。",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{\u2013}29}-\\overline{C}_{30\\text{\u2013}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{\u2013}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{\u2013}49}",
        ],
        note:
          "これはバージョン管理された再現可能な記述的技術タイミング分析です。その開発加重はシナリオ加重であり、校正された感度推定ではありません。v2集団推定は対応するFieldState、バイオマーカー、カップルおよびASFRパネルを待っています。",
      },
      {
        id: "gme",
        title: "7. GME / R42は実験的分岐であり、ネットワーク推論ではない",
        body: [
          "二次混合はFieldStateにおける包絡線/ビートPSDの保持を動機付けます。Zandieh et al.（2025）はELF条件（0.01-5 Hz；最大100 mTの電磁界）でのがん細胞実験において周波数依存性のミトコンドリア/ROS挙動を観察しました。これは細胞状態依存応答ウィンドウの実験的候補を提供します。",
          "RF-ネットワーク包絡線効果、eDRX電磁界シグネチャ、または生殖障害を実証するものではありません。したがってR42分析は探索的であり、測定されたPSD、偽装/熱コントロールおよび事前に指定された生物学的エンドポイントから開始しなければなりません。",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "状態：L*研究プロトコル。この分岐から国家レベルまたはTFRパラメータは導出されません。",
      },
      {
        id: "validation",
        title: "8. v2の結果を構成するもの",
        body: [
          "有効なv2校正には、対応するFieldStateパネル、測定された臓器またはカップルエンドポイント、明示的なパラメータ/エビデンスIDおよびトレーニング専用推定期間が必要です。後のASFR/TFR期間は時間的評価のために適合の外に残ります。",
          "集団推定は、対応するFieldStateおよびエンドポイントパネルが編成され、マッピングが登録され、時間的評価が完了したときに公表されます。",
        ],
        note:
          "仕様は測定、エンドポイントマッピングおよび人口統計推定を可視化し、それぞれを独立してテストおよび改善できるようにします。",
      },
      {
        id: "s16",
        title: "\u00a716 \u2014 T型チャネル分岐増幅",
        body: [
          "非熱的EMF効果に対する「δVmが小さすぎる」という反論は二つの物理的事実により解決されます：(1) Schwan方程式は、ELF周波数において細胞形状が膜で外部電磁界を~1.5R/d ≈ 1500の係数で増幅することを示し、(2) T型カルシウムチャネルは熱雑音レベルの摂動でさえ開口確率を変化させる分岐点（ウィンドウ電流）で動作します。",
        ],
        equations: [
          "\\delta V_m = 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}} \\cdot \\frac{1}{\\sqrt{1 + (f/f_c)^2}}",
          "\\text{At ELF } (f \\ll f_c \\approx 500\\,\\text{kHz}):\\quad \\delta V_m \\approx 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}}",
          "R = 10\\,\\mu\\text{m},\\; E = 1\\,\\text{V/m}:\\quad \\delta V_m = 15\\,\\mu\\text{V}",
          "P_{\\mathrm{open}}(V) = \\frac{1}{1 + \\exp\\!\\left(-\\frac{V - V_{1/2}}{k}\\right)},\\quad V_{1/2} = -57\\,\\text{mV},\\; k = 6\\,\\text{mV}",
          "V_{\\mathrm{rest}} = -70\\,\\text{mV},\\quad P_{\\mathrm{open}}(-70) = 0.103\\;\\text{(10.3\\% window current)}",
          "\\left.\\frac{dP}{dV}\\right|_{\\mathrm{rest}} = \\frac{P(1-P)}{k} = 15.4\\,\\text{V}^{-1}",
          "\\delta N = N_{\\mathrm{channels}} \\times \\frac{dP}{dV} \\times \\delta V_m,\\quad N = 5000,\\; \\delta V_m = 7.5\\,\\mu\\text{V}:\\; \\delta N = 0.58",
          "\\delta V_{\\mathrm{thermal}} = \\sqrt{kT/C_m} = 20.3\\,\\mu\\text{V}",
          "\\text{At } 1\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 0.37\\;\\text{(37\\%)},\\qquad \\text{At } 5\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 1.84\\;\\text{(184\\%)}",
        ],
        note:
          "重要な知見は、EMFの生物学的効果はRF信号のELF変調成分を通じて作動し、搬送波周波数ではないということです。RF（GHz）では膜のキャパシタンスが電圧を短絡します（減衰~10⁻³）。しかしELF包絡線（GSM/LTEの50-217 Hz）は全振幅で通過します。T型チャネルはこのELF成分に応答します。注意：Ca²⁺蓄積計算は細胞ポンプ（PMCA、NCX、SERCA）やバッファー（カルモジュリン、カルビンディン）を考慮していません。定常状態の[Ca²⁺]ᵢ増加は5-50%と推定され、総流入数ではありません。",
      },
    ],
    modelLink: "\u2190 モデル概要に戻る",
    fieldstateLink: "FieldState 測定仕様",
    nextLabel: "次へ",
    nextTitle: "エビデンスレジストリ",
  },
  fr: {
    metaTitle: "Math\u00e9matiques BERM v17 \u2013 Extinction Field",
    metaDescription: "La sp\u00e9cification BERM v17 orient\u00e9e mesure du BERM.",
    title: "Sp\u00e9cification math\u00e9matique BERM v17",
    subtitle:
      "Un parcours orient\u00e9 mesure des hypoth\u00e8ses de champ d\u00e9riv\u00e9es de Lindgren aux \u00e9tats d\u2019organes, \u00e0 la capacit\u00e9 du couple, \u00e0 la f\u00e9condit\u00e9 par \u00e2ge et au TFR.",
    nav: [
      { id: "premise", label: "Pr\u00e9misse physique" },
      { id: "fieldstate", label: "FieldState" },
      { id: "static-interface-math", label: "Interface statique" },
      { id: "organ-state", label: "\u00c9tat d\u2019organe" },
      { id: "asfr", label: "ASFR \u2192 TFR" },
      { id: "cohort", label: "Signal de cohorte" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "Limite de validation" },
      { id: "s16", label: "Bifurcation T-Type" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren est une pr\u00e9misse physique, pas une estimation d\u2019effet populationnel",
        body: [
          "L\u2019ansatz g\u00e9om\u00e9trique est conserv\u00e9 comme hypoth\u00e8se amont motivant la d\u00e9pendance au fond et les termes crois\u00e9s quadratiques. Il n\u2019est pas trait\u00e9 comme une physique reproductive humaine ind\u00e9pendamment valid\u00e9e, et ne fournit pas en soi un coefficient EMF-TFR.",
          "La quantit\u00e9 normalis\u00e9e utilis\u00e9e par le mod\u00e8le est une coordonn\u00e9e FieldState document\u00e9e. Elle n\u2019est pas obtenue en ins\u00e9rant un champ membranaire exprim\u00e9 en V/m dans \u03c7. Le potentiel membranaire local, l\u2019orientation du r\u00e9cepteur et l\u2019\u00e9tat tissulaire sont des variables biologiques distinctes.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "Statut : th\u00e9orie / hypoth\u00e8se structurelle. L\u2019\u00e9vidence discriminante est une r\u00e9ponse mesur\u00e9e d\u00e9pendante du vecteur, de l\u2019angle, du spectre ou du timing, et non une corr\u00e9lation scalaire au niveau national.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState pr\u00e9serve les quantit\u00e9s physiques requises",
        body: [
          "Pour l\u2019organe o, les composantes de fond, ambiantes et personnelles sont transf\u00e9r\u00e9es via une fonction de transfert sp\u00e9cifique \u00e0 l\u2019organe, \u00e0 la posture et \u00e0 la g\u00e9om\u00e9trie T\u2092. La direction vectorielle, la phase/coh\u00e9rence, le PSD d\u2019enveloppe/battement, le contexte circadien et la provenance de la source restent des champs explicites.",
          "Les abonnements mobiles peuvent d\u00e9crire la diffusion de l\u2019environnement num\u00e9rique. L\u2019enregistrement FieldState documente plut\u00f4t les conditions physiques locales et le transfert sp\u00e9cifique \u00e0 l\u2019organe avant l\u2019analyse d\u2019un endpoint.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "Un FieldState pr\u00eat \u00e0 la mesure n\u00e9cessite une normalisation document\u00e9e, B\u2080, le transfert d\u2019organe, le PSD, le contexte circadien, la phase/coh\u00e9rence et la provenance de la mesure. Les enregistrements incomplets sont rapport\u00e9s comme donn\u00e9es FieldState partielles.",
      },
      {
        id: "static-interface-math",
        title: "3. L\u2019interface tribo\u00e9lectrique statique est une branche FieldState locale",
        body: [
          "Une interface mat\u00e9riau\u2013peau ou organisme est repr\u00e9sent\u00e9e par {Q, \u0394\u03c6ref, E(r,t), \u2207|E|\u00b2, dE/dt, \u03c4}. Elle pr\u00e9serve le transport DC/tribo\u00e9lectrique s\u00e9par\u00e9ment de la forme d\u2019onde basse fr\u00e9quence et de la composante de polarit\u00e9 utilis\u00e9e pour la d\u00e9tection et le comportement sp\u00e9cifiques \u00e0 l\u2019esp\u00e8ce. Le nom d\u2019un mat\u00e9riau n\u2019est pas en soi une coordonn\u00e9e d\u2019exposition.",
          "La mesure textile historique V/cm\u00b2 est physiquement sous-d\u00e9termin\u00e9e : elle pr\u00e9serve un classement des mat\u00e9riaux mais ne peut fournir la charge, les V/m ou un champ d\u2019organe sans une \u00e9lectrode de r\u00e9f\u00e9rence nomm\u00e9e, la surface/distance/orientation/calibration de la sonde, l\u2019imp\u00e9dance du chemin de terre, la capacitance \u00e0 la r\u00e9f\u00e9rence et une mesure de d\u00e9croissance empirique. Dans un montage v\u00e9rifi\u00e9, \u03c4RC\u2248RleakCeff est un comparateur, pas un remplacement de la d\u00e9croissance multiphas\u00e9e mesur\u00e9e.",
        ],
        equations: [
          "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}(m,v,p,A,RH,T)-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
          "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
          "F_{\\mathrm{ind}}\\approx\\frac{1}{2}\\alpha\\nabla(E^2)",
        ],
        note:
          "Pour une tique polarisable, la troisi\u00e8me expression est un proxy local d\u2019attraction induite, pas un seuil universel ni un effet populationnel. L\u2019interface statique n\u2019atteint un organe que par un transfert local nomm\u00e9 vers les \u00e9tats existants Vmem/Ca\u00b2\u207a\u2013redox ou sensoriels de surface HPA\u2013HPG.",
      },
      {
        id: "organ-state",
        title: "4. La capacit\u00e9 biologique est un \u00e9tat r\u00e9versible/persistant sp\u00e9cifique \u00e0 l\u2019organe",
        body: [
          "Une caract\u00e9ristique de champ n\u2019affecte un endpoint d\u2019organe enregistr\u00e9 que par un mod\u00e8le d\u2019incr\u00e9ment explicite li\u00e9 \u00e0 l\u2019\u00e9vidence. Chaque organe a un \u00e9tat r\u00e9versible R et un \u00e9tat persistant P. Leur r\u00e9tention et mappage d\u2019endpoint ne sont param\u00e9tr\u00e9s que lorsqu\u2019un ID de param\u00e8tre et un ID d\u2019\u00e9vidence sont fournis.",
          "La branche masculine s\u00e9pare l\u2019int\u00e9grit\u00e9 de la barri\u00e8re h\u00e9mato-testiculaire, la r\u00e9serve germinale, la st\u00e9ro\u00efdogen\u00e8se, la production/fonction spermatique et l\u2019int\u00e9grit\u00e9 de l\u2019ADN. La branche f\u00e9minine s\u00e9pare la r\u00e9serve ovarienne, le redox ovocytaire, l\u2019horloge ovulatoire et le soutien lut\u00e9al/d\u2019implantation. La BTB poss\u00e8de la branche reproductive directe enregistr\u00e9e ; la BHE, le placenta et la r\u00e9tine restent des \u00e9tats candidats de barri\u00e8re s\u00e9par\u00e9s plut\u00f4t qu\u2019un multiplicateur partag\u00e9.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "Ce sont des structures, pas des coefficients nationaux publi\u00e9s. Les \u00e9tats candidats du placenta, de la BHE et de la r\u00e9tine ne re\u00e7oivent un incr\u00e9ment reproductif qu\u2019apr\u00e8s l\u2019enregistrement d\u2019un mappage li\u00e9 aux param\u00e8tres et \u00e0 l\u2019\u00e9vidence. Note d\u2019ind\u00e9pendance des voies : le mod\u00e8le multiplicatif R = (1 \u2212 \u03b3_A \u00b7 r_A) \u00d7 (1 \u2212 \u03b3_C \u00b7 r_C) est conserv\u00e9 sans terme crois\u00e9 car les voies A (VGCC) et C (CRY2) sont pharmacologiquement s\u00e9parables. \u03b3_C refl\u00e8te les deux branches aval de CRY2 : \u03b3_C = \u03b3_C_clock + \u03b3_C_TRPC1. Elles ne sont pas s\u00e9par\u00e9es dans le mod\u00e8le car elles partagent le m\u00eame capteur amont (CRY2), la d\u00e9pendance \u00e0 la lumi\u00e8re et la d\u00e9pendance au FAD.",
      },
      {
        id: "asfr",
        title: "5. L\u2019\u00e9tat du couple entre dans l\u2019ASFR avant le TFR",
        body: [
          "Une moyenne populationnelle doit conserver la covariance du m\u00e9nage partag\u00e9 et du partenaire ; ce n\u2019est pas un multiplicateur masculin moyen national fois un multiplicateur f\u00e9minin moyen national. La capacit\u00e9 biologique de conception/naissance vivante est ensuite maintenue s\u00e9par\u00e9e de la demande/opportunit\u00e9, du tempo de p\u00e9riode et de la livraison ART/naissance vivante.",
          "Le TFR est une somme de p\u00e9riode des taux de f\u00e9condit\u00e9 par \u00e2ge. Ce n\u2019est pas une mesure directe de la capacit\u00e9 gonadique, donc un changement de TFR ne peut \u00eatre attribu\u00e9 au FieldState sans les mesures ASFR et biologiques interm\u00e9diaires.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{\u2013}19}^{45\\text{\u2013}49}ASFR_{c,g,t}",
        ],
        note:
          "L\u2019ASFR WPP est la r\u00e9f\u00e9rence d\u00e9mographique. La demande/opportunit\u00e9 (O), le tempo (\u03c4) et l\u2019ART sont des entr\u00e9es externes explicites, pas des \u00e9tiquettes r\u00e9siduelles pour la biologie.",
      },
      {
        id: "cohort",
        title: "6. R\u00e9sultat populationnel actuel : un signal descriptif de timing de cohorte",
        body: [
          "Avec l\u2019ASFR WPP 2024 et les abonnements mobiles World Bank/ITU, le proxy de timing de cohorte jeune-moins-\u00e2g\u00e9 pond\u00e9r\u00e9 par le d\u00e9veloppement corr\u00e8le avec le log-changement ASFR jeune-moins-\u00e2g\u00e9 en 2000\u20132023. Le panel complet a N = 163 et Pearson r = \u22120,66645 ; le sous-ensemble BERM a N = 54 et r = \u22120,64012.",
          "Ceci est utile car il suit la pr\u00e9misse \u00e2ge/cohorte mieux qu\u2019une corr\u00e9lation nationale contemporaine TFR\u2013abonnement. Il reste un proxy de timing technologique : la r\u00e9gion, le revenu et la structure d\u00e9mographique sont des explications alternatives mat\u00e9rielles. Ce n\u2019est pas un FieldState, une estimation d\u2019effet biologique ni un coefficient de calibration.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{\u2013}29}-\\overline{C}_{30\\text{\u2013}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{\u2013}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{\u2013}49}",
        ],
        note:
          "C\u2019est une analyse descriptive de timing technologique versionn\u00e9e et reproductible. Ses poids de d\u00e9veloppement sont des poids de sc\u00e9nario plutôt que des estimations de sensibilit\u00e9 calibr\u00e9es. Une estimation populationnelle v2 attend des panels FieldState, biomarqueurs, couple et ASFR appari\u00e9s.",
      },
      {
        id: "gme",
        title: "7. GME / R42 est une branche exp\u00e9rimentale, pas une inf\u00e9rence de r\u00e9seau",
        body: [
          "Le m\u00e9lange quadratique motive la r\u00e9tention d\u2019un PSD d\u2019enveloppe/battement dans FieldState. Zandieh et al. (2025) ont observ\u00e9 un comportement mitochondrial/ROS d\u00e9pendant de la fr\u00e9quence dans des exp\u00e9riences sur cellules canc\u00e9reuses en conditions ELF (0,01\u20135 Hz ; champs jusqu\u2019\u00e0 100 mT). Cela fournit un candidat exp\u00e9rimental pour des fen\u00eatres de r\u00e9ponse d\u00e9pendantes de l\u2019\u00e9tat cellulaire.",
          "Cela ne d\u00e9montre pas les effets d\u2019enveloppe du r\u00e9seau RF, une signature de champ eDRX, ni un pr\u00e9judice reproductif. Toute analyse R42 est donc exploratoire et doit commencer par un PSD mesur\u00e9, des contr\u00f4les fictifs/thermiques et un endpoint biologique pr\u00e9-sp\u00e9cifi\u00e9.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "Statut : protocole de recherche L*. Aucun param\u00e8tre national ou TFR n\u2019est d\u00e9riv\u00e9 de cette branche.",
      },
      {
        id: "validation",
        title: "8. Ce qui constitue un r\u00e9sultat v2",
        body: [
          "Une calibration v2 valide n\u00e9cessite un panel FieldState appari\u00e9, un endpoint d\u2019organe ou de couple mesur\u00e9, des IDs explicites de param\u00e8tre/\u00e9vidence et une p\u00e9riode d\u2019estimation sur donn\u00e9es d\u2019entra\u00eenement uniquement. Une p\u00e9riode ASFR/TFR ult\u00e9rieure reste en dehors de l\u2019ajustement pour l\u2019\u00e9valuation temporelle.",
          "Une estimation populationnelle est publi\u00e9e lorsque les panels FieldState et endpoint correspondants ont \u00e9t\u00e9 assembl\u00e9s, les mappages enregistr\u00e9s et l\u2019\u00e9valuation temporelle compl\u00e9t\u00e9e.",
        ],
        note:
          "La sp\u00e9cification maintient visibles la mesure, le mappage d\u2019endpoint et l\u2019estimation d\u00e9mographique afin que chacun puisse \u00eatre test\u00e9 et am\u00e9lior\u00e9 ind\u00e9pendamment.",
      },
      {
        id: "s16",
        title: "\u00a716 \u2014 Amplification par bifurcation du canal T-Type",
        body: [
          "L\u2019objection \u00ab \u03b4Vm trop petit \u00bb aux effets EMF non thermiques est r\u00e9solue par deux faits physiques : (1) l\u2019\u00e9quation de Schwan montre que la g\u00e9om\u00e9trie cellulaire amplifie les champs externes d\u2019un facteur ~1,5R/d \u2248 1500 \u00e0 la membrane aux fr\u00e9quences ELF, et (2) les canaux calciques de type T op\u00e8rent \u00e0 un point de bifurcation (courant de fen\u00eatre) o\u00f9 m\u00eame des perturbations au niveau du bruit thermique modifient la probabilit\u00e9 d\u2019ouverture.",
        ],
        equations: [
          "\\delta V_m = 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}} \\cdot \\frac{1}{\\sqrt{1 + (f/f_c)^2}}",
          "\\text{At ELF } (f \\ll f_c \\approx 500\\,\\text{kHz}):\\quad \\delta V_m \\approx 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}}",
          "R = 10\\,\\mu\\text{m},\\; E = 1\\,\\text{V/m}:\\quad \\delta V_m = 15\\,\\mu\\text{V}",
          "P_{\\mathrm{open}}(V) = \\frac{1}{1 + \\exp\\!\\left(-\\frac{V - V_{1/2}}{k}\\right)},\\quad V_{1/2} = -57\\,\\text{mV},\\; k = 6\\,\\text{mV}",
          "V_{\\mathrm{rest}} = -70\\,\\text{mV},\\quad P_{\\mathrm{open}}(-70) = 0.103\\;\\text{(10.3\\% window current)}",
          "\\left.\\frac{dP}{dV}\\right|_{\\mathrm{rest}} = \\frac{P(1-P)}{k} = 15.4\\,\\text{V}^{-1}",
          "\\delta N = N_{\\mathrm{channels}} \\times \\frac{dP}{dV} \\times \\delta V_m,\\quad N = 5000,\\; \\delta V_m = 7.5\\,\\mu\\text{V}:\\; \\delta N = 0.58",
          "\\delta V_{\\mathrm{thermal}} = \\sqrt{kT/C_m} = 20.3\\,\\mu\\text{V}",
          "\\text{At } 1\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 0.37\\;\\text{(37\\%)},\\qquad \\text{At } 5\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 1.84\\;\\text{(184\\%)}",
        ],
        note:
          "L\u2019id\u00e9e cl\u00e9 est que les effets biologiques des EMF op\u00e8rent via la composante de MODULATION ELF des signaux RF, pas la fr\u00e9quence porteuse. En RF (GHz), la capacitance membranaire court-circuite la tension (att\u00e9nuation ~10\u207b\u00b3). Mais l\u2019enveloppe ELF (50\u2013217 Hz pour GSM/LTE) passe \u00e0 pleine amplitude. Les canaux de type T r\u00e9pondent \u00e0 cette composante ELF. MISE EN GARDE : Le calcul d\u2019accumulation de Ca\u00b2\u207a ne tient pas compte des pompes cellulaires (PMCA, NCX, SERCA) ni des tampons (calmoduline, calbindine). L\u2019augmentation \u00e0 l\u2019\u00e9tat stationnaire du [Ca\u00b2\u207a]\u1d62 est estim\u00e9e \u00e0 5\u201350 %, pas aux chiffres d\u2019influx brut.",
      },
    ],
    modelLink: "\u2190 Retour \u00e0 l\u2019aper\u00e7u du mod\u00e8le",
    fieldstateLink: "Sp\u00e9cification de mesure FieldState",
    nextLabel: "Suivant",
    nextTitle: "Registre des \u00e9vidences",
  },
  ko: {
    metaTitle: "BERM v17 수학 \u2013 Extinction Field",
    metaDescription: "BERM의 측정 인식 BERM v17 사양.",
    title: "BERM v17 수학적 사양",
    subtitle:
      "Lindgren 유도 전자기장 가설에서 장기 상태, 커플 용량, 연령별 출생률 및 TFR로의 측정 인식 경로.",
    nav: [
      { id: "premise", label: "물리학적 전제" },
      { id: "fieldstate", label: "FieldState" },
      { id: "static-interface-math", label: "정전 계면" },
      { id: "organ-state", label: "장기 상태" },
      { id: "asfr", label: "ASFR \u2192 TFR" },
      { id: "cohort", label: "코호트 시그널" },
      { id: "gme", label: "GME / R42" },
      { id: "validation", label: "검증 경계" },
      { id: "s16", label: "T형 분기" },
    ],
    sections: [
      {
        id: "premise",
        title: "1. Lindgren은 물리학적 전제이며, 인구 효과 추정이 아니다",
        body: [
          "기하학적 안자츠는 배경 의존성과 이차 교차항을 동기부여하는 상류 가설로 유지됩니다. 독립적으로 검증된 인간 생식 물리학으로 취급되지 않으며, 그 자체로 EMF-TFR 계수를 제공하지 않습니다.",
          "모델이 사용하는 정규화된 양은 문서화된 FieldState 좌표입니다. V/m으로 표현된 막 전자기장을 χ에 삽입하여 얻어지는 것이 아닙니다. 국소 막전위, 수용체 배향 및 조직 상태는 별개의 생물학적 변수입니다.",
        ],
        equations: ["g_{\\mu\\nu}=\\eta_{\\mu\\nu}+A_\\mu A_\\nu", "\\chi(a)=\\frac{a}{\\sqrt{1+a^2}}"],
        note:
          "상태: 이론/구조적 가설. 판별적 에비던스는 측정된 벡터, 각도, 스펙트럼 또는 타이밍 의존 응답이며, 국가 수준의 스칼라 상관이 아닙니다.",
      },
      {
        id: "fieldstate",
        title: "2. FieldState는 필요한 물리량을 보존한다",
        body: [
          "장기 o에 대해 배경, 환경 및 개인 성분은 장기, 자세 및 형상 특이적 전달 함수 Tₒ를 통해 전달됩니다. 벡터 방향, 위상/코히어런스, 포락선/비트 PSD, 일주기 맥락 및 소스 출처는 명시적 필드로 유지됩니다.",
          "모바일 가입은 디지털 환경 확산을 기술할 수 있습니다. FieldState 레코드는 대신 엔드포인트 분석 전의 국소 물리적 조건과 장기별 전달을 문서화합니다.",
        ],
        equations: [
          "\\mathbf A_{\\mathrm{selected},o}=T_o\\mathbf A_{\\mathrm{ambient}}+\\chi(\\lvert T_o\\mathbf A_{\\mathrm{background}}\\rvert)T_o\\mathbf A_{\\mathrm{personal}}",
          "X_{\\mathrm{geom},o}=2(T_o\\mathbf A_{\\mathrm{background}})\\cdot(T_o\\mathbf A_{\\mathrm{personal}})",
          "\\Xi_o=\\int PSD_{\\mathrm{envelope/beat},o}(f)W_o(f)\\,df",
        ],
        note:
          "측정 준비된 FieldState에는 문서화된 정규화, B₀, 장기 전달, PSD, 일주기 맥락, 위상/코히어런스 및 측정 출처가 필요합니다. 불완전한 레코드는 부분적 FieldState 데이터로 보고됩니다.",
      },
      {
        id: "static-interface-math",
        title: "3. 정전 마찰전기 계면은 국소적 FieldState 분기이다",
        body: [
          "재료-피부 또는 생물 계면은 {Q, Δφref, E(r,t), ∇|E|², dE/dt, τ}로 표현됩니다. DC/마찰전기 수송을 종 특이적 감지 및 행동에 사용되는 저주파 파형 및 극성 성분과 별도로 보존합니다. 재료 이름 자체는 노출 좌표가 아닙니다.",
          "역사적 V/cm² 섬유 측정값은 물리적으로 미결정됩니다: 재료 순서를 보존하지만 명명된 참조 전극, 프로브 면적/거리/방향/교정, 접지 경로 임피던스, 참조 대비 커패시턴스 및 경험적 감쇠 측정 없이는 전하, V/m 또는 장기 전자기장을 산출할 수 없습니다. 검증된 설비에서 τRC≈RleakCeff는 비교 대상이며 측정된 다상 감쇠의 대체물이 아닙니다.",
        ],
        equations: [
          "\\frac{dQ}{dt}=I_{\\mathrm{tribo}}(m,v,p,A,RH,T)-\\frac{Q}{\\tau}-I_{\\mathrm{discharge}}",
          "\\tau_{RC}\\approx R_{\\mathrm{leak}}C_{\\mathrm{eff}}",
          "F_{\\mathrm{ind}}\\approx\\frac{1}{2}\\alpha\\nabla(E^2)",
        ],
        note:
          "편광 가능한 진드기의 경우 세 번째 식은 국소적 유도 인력 프록시이며, 보편적 임계값이나 집단 효과가 아닙니다. 정전 계면은 기존 Vmem/Ca²⁺-레독스 또는 표면 감각 HPA-HPG 상태로의 명명된 국소 전달을 통해서만 장기에 도달합니다.",
      },
      {
        id: "organ-state",
        title: "4. 생물학적 용량은 장기별 가역/지속 상태이다",
        body: [
          "전자기장 특성은 명시적이고 에비던스에 연결된 증분 모델을 통해서만 등록된 장기 엔드포인트에 영향을 미칩니다. 각 장기에는 가역 상태 R과 지속 상태 P가 있습니다. 그 보유 및 엔드포인트 매핑은 매개변수 ID와 에비던스 ID가 제공된 경우에만 매개변수화됩니다.",
          "남성 계통은 혈액-고환 장벽 완전성, 생식세포 계열 예비능, 스테로이드 생성, 정자 생산/기능 및 DNA 완전성을 분리합니다. 여성 계통은 난소 예비능, 난모세포 레독스, 배란 시계 및 황체/착상 지원을 분리합니다. BTB는 등록된 직접 생식 분기를 갖고 있으며, BBB, 태반 및 망막은 공유 승수가 아닌 별도의 후보 장벽 상태입니다.",
        ],
        equations: [
          "R_{o,t}=r_oR_{o,t-1}+\\Delta R_{o,t},\\qquad P_{o,t}=p_oP_{o,t-1}+\\Delta P_{o,t}",
          "F_o=f_{\\min,o}+(1-f_{\\min,o})\\exp[-(\\beta_{R,o}R_o+\\beta_{P,o}P_o)]",
          "\\Phi_m=F_{\\mathrm{BTB}}F_{\\mathrm{germline}}F_{\\mathrm{steroid}}F_{\\mathrm{sperm\\,output}}F_{\\mathrm{sperm\\,function}}F_{\\mathrm{sperm\\,DNA}}",
          "\\Phi_f=F_{\\mathrm{ovarian\\,reserve}}F_{\\mathrm{oocyte\\,redox}}F_{\\mathrm{ovulatory\\,clock}}F_{\\mathrm{luteal/implantation}}",
        ],
        note:
          "이것들은 구조이며 현재 발표된 국가 계수가 아닙니다. 태반, BBB 및 망막 후보 상태는 매개변수 및 에비던스에 연결된 매핑이 등록된 후에만 생식 증분을 받습니다. 경로 독립성 참고: 곱셈 모델 R = (1 − γ_A · r_A) × (1 − γ_C · r_C)은 경로 A(VGCC)와 C(CRY2)가 약리학적으로 분리 가능하므로 교차항 없이 유지됩니다. γ_C는 CRY2의 두 하류 분기를 모두 반영합니다: γ_C = γ_C_clock + γ_C_TRPC1. 두 분기 모두 동일한 상류 센서(CRY2), 광 의존성 및 FAD 의존성을 공유하므로 모델에서 분리되지 않습니다.",
      },
      {
        id: "asfr",
        title: "5. 커플 상태는 TFR 전에 ASFR에 진입한다",
        body: [
          "집단 평균은 공유 가구 및 파트너 공분산을 유지해야 합니다. 국가 평균 남성 승수에 국가 평균 여성 승수를 곱한 것이 아닙니다. 생물학적 수태/출생 용량은 이후 수요/기회, 기간 템포 및 ART/출생 전달과 별도로 유지됩니다.",
          "TFR은 연령별 출생률의 기간 합계입니다. 성선 용량의 직접 측정이 아니므로, 중간 ASFR 및 생물학적 측정 없이 TFR 변화를 FieldState에 귀속시킬 수 없습니다.",
        ],
        equations: [
          "\\Phi^{\\mathrm{couple}}_{ij,t}=\\Phi_{m,i,t}\\Phi^{\\mathrm{conception}}_{f,j,t}F_{\\mathrm{shared\\,household},ij,t}L_{f,j,t}",
          "ASFR_{c,g,t}=ASFR^{\\mathrm{ref}}_{c,g,t_0}\\times\\frac{\\Phi^{\\mathrm{couple}}_{c,g,t}}{\\Phi^{\\mathrm{couple}}_{c,g,t_0}}\\times\\frac{O_{c,g,t}}{O_{c,g,t_0}}\\times\\frac{\\tau_{c,g,t}}{\\tau_{c,g,t_0}}\\times\\frac{ART_{c,g,t}}{ART_{c,g,t_0}}",
          "TFR_{c,t}=\\frac{5}{1000}\\sum_{g=15\\text{\u2013}19}^{45\\text{\u2013}49}ASFR_{c,g,t}",
        ],
        note:
          "WPP ASFR은 인구학적 참조입니다. 수요/기회(O), 템포(τ) 및 ART는 명시적 외부 입력이며 생물학의 잔차 라벨이 아닙니다.",
      },
      {
        id: "cohort",
        title: "6. 현재 집단 결과: 기술적 코호트 타이밍 시그널",
        body: [
          "WPP 2024 ASFR과 World Bank/ITU 모바일 가입 데이터로, 개발 가중 젊은-고령 코호트 타이밍 프록시는 2000-2023년 젊은-고령 ASFR 로그변화와 상관합니다. 전체 국가 패널은 N = 163, 피어슨 r = −0.66645이며, BERM 국가 부분집합은 N = 54, r = −0.64012입니다.",
          "이것은 동시대 국가 TFR-가입 상관보다 연령/코호트 전제를 더 잘 따르기 때문에 유용합니다. 그러나 여전히 기술 타이밍 프록시입니다: 지역, 소득 및 인구 구조는 실질적인 대안 설명입니다. FieldState, 생물학적 효과 추정 또는 교정 계수가 아닙니다.",
        ],
        equations: [
          "C_g=\\frac{\\sum_{a=-1}^{17}w(a)M_{c,b_g+a}}{\\sum_a w(a)},\\qquad E_{gap}=\\overline{C}_{15\\text{\u2013}29}-\\overline{C}_{30\\text{\u2013}49}",
          "Y_{gap}=\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{15\\text{\u2013}29}-\\overline{\\log(ASFR_{2023,g}/ASFR_{2000,g})}_{30\\text{\u2013}49}",
        ],
        note:
          "이것은 버전 관리된 재현 가능한 기술적 기술 타이밍 분석입니다. 개발 가중치는 시나리오 가중치이며 교정된 감도 추정치가 아닙니다. v2 집단 추정은 매칭된 FieldState, 바이오마커, 커플 및 ASFR 패널을 기다리고 있습니다.",
      },
      {
        id: "gme",
        title: "7. GME / R42는 실험적 분기이며, 네트워크 추론이 아니다",
        body: [
          "이차 혼합은 FieldState에서 포락선/비트 PSD의 보유를 동기부여합니다. Zandieh et al.(2025)은 ELF 조건(0.01-5 Hz; 최대 100 mT 전자기장)에서의 암세포 실험에서 주파수 의존적 미토콘드리아/ROS 거동을 관찰했습니다. 이것은 세포 상태 의존 응답 윈도우의 실험적 후보를 제공합니다.",
          "RF 네트워크 포락선 효과, eDRX 전자기장 시그니처 또는 생식 피해를 입증하지 않습니다. 따라서 R42 분석은 탐색적이며 측정된 PSD, 위장/열 대조 및 사전 지정된 생물학적 엔드포인트에서 시작해야 합니다.",
        ],
        equations: ["I_{\\mathrm{GME},o}=\\int PSD_{\\mathrm{envelope},o}(f)W_{\\mathrm{mito},o}(f;f_0,Q,\\mathrm{redox})\\,df"],
        note:
          "상태: L* 연구 프로토콜. 이 분기에서 국가 수준 또는 TFR 매개변수는 도출되지 않습니다.",
      },
      {
        id: "validation",
        title: "8. v2 결과를 구성하는 것",
        body: [
          "유효한 v2 교정에는 매칭된 FieldState 패널, 측정된 장기 또는 커플 엔드포인트, 명시적 매개변수/에비던스 ID 및 훈련 전용 추정 기간이 필요합니다. 이후 ASFR/TFR 기간은 시간적 평가를 위해 적합 외부에 남습니다.",
          "집단 추정은 대응하는 FieldState 및 엔드포인트 패널이 편성되고, 매핑이 등록되고, 시간적 평가가 완료될 때 발표됩니다.",
        ],
        note:
          "사양은 측정, 엔드포인트 매핑 및 인구 추정을 가시화하여 각각을 독립적으로 테스트하고 개선할 수 있도록 합니다.",
      },
      {
        id: "s16",
        title: "\u00a716 \u2014 T형 채널 분기 증폭",
        body: [
          "비열적 EMF 효과에 대한 '\u03b4Vm이 너무 작다' 반론은 두 가지 물리적 사실로 해결됩니다: (1) Schwan 방정식은 ELF 주파수에서 세포 형상이 막에서 외부 전자기장을 ~1.5R/d \u2248 1500의 계수로 증폭함을 보여주고, (2) T형 칼슘 채널은 열 잡음 수준의 섭동조차 개구 확률을 변화시키는 분기점(윈도우 전류)에서 작동합니다.",
        ],
        equations: [
          "\\delta V_m = 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}} \\cdot \\frac{1}{\\sqrt{1 + (f/f_c)^2}}",
          "\\text{At ELF } (f \\ll f_c \\approx 500\\,\\text{kHz}):\\quad \\delta V_m \\approx 1.5 \\cdot E_{\\mathrm{ext}} \\cdot R_{\\mathrm{cell}}",
          "R = 10\\,\\mu\\text{m},\\; E = 1\\,\\text{V/m}:\\quad \\delta V_m = 15\\,\\mu\\text{V}",
          "P_{\\mathrm{open}}(V) = \\frac{1}{1 + \\exp\\!\\left(-\\frac{V - V_{1/2}}{k}\\right)},\\quad V_{1/2} = -57\\,\\text{mV},\\; k = 6\\,\\text{mV}",
          "V_{\\mathrm{rest}} = -70\\,\\text{mV},\\quad P_{\\mathrm{open}}(-70) = 0.103\\;\\text{(10.3\\% window current)}",
          "\\left.\\frac{dP}{dV}\\right|_{\\mathrm{rest}} = \\frac{P(1-P)}{k} = 15.4\\,\\text{V}^{-1}",
          "\\delta N = N_{\\mathrm{channels}} \\times \\frac{dP}{dV} \\times \\delta V_m,\\quad N = 5000,\\; \\delta V_m = 7.5\\,\\mu\\text{V}:\\; \\delta N = 0.58",
          "\\delta V_{\\mathrm{thermal}} = \\sqrt{kT/C_m} = 20.3\\,\\mu\\text{V}",
          "\\text{At } 1\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 0.37\\;\\text{(37\\%)},\\qquad \\text{At } 5\\,\\text{V/m}: \\frac{\\delta V_m}{\\delta V_{\\mathrm{thermal}}} = 1.84\\;\\text{(184\\%)}",
        ],
        note:
          "핵심 통찰은 EMF의 생물학적 효과가 RF 신호의 ELF 변조 성분을 통해 작동하며 반송파 주파수가 아니라는 것입니다. RF(GHz)에서 막의 커패시턴스가 전압을 단락시킵니다(감쇠 ~10⁻³). 그러나 ELF 포락선(GSM/LTE의 50-217 Hz)은 전체 진폭으로 통과합니다. T형 채널은 이 ELF 성분에 응답합니다. 주의: Ca²⁺ 축적 계산은 세포 펌프(PMCA, NCX, SERCA) 및 완충제(칼모듈린, 칼빈딘)를 고려하지 않습니다. 정상 상태 [Ca²⁺]ᵢ 증가는 총 유입 수치가 아닌 5-50%로 추정됩니다.",
      },
    ],
    modelLink: "\u2190 모델 개요로 돌아가기",
    fieldstateLink: "FieldState 측정 사양",
    nextLabel: "다음",
    nextTitle: "에비던스 레지스트리",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return { title: d.metaTitle, description: d.metaDescription };
}

function SectionNavigation({ sections }: { sections: Copy["nav"] }) {
  return (
    <nav className="hidden lg:block sticky top-20 w-52 shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <ul className="space-y-1 text-sm border-l border-card-border pl-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block leading-snug text-foreground-muted hover:text-accent transition-colors">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function FieldStateMathPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <PageHeader icon={Sigma} title={d.title} subtitle={d.subtitle} />

      <nav className="mb-10 flex flex-wrap gap-3 text-sm">
        <Link href={`/${locale}/model`} className="text-accent hover:underline">{d.modelLink}</Link>
        <span className="text-foreground-muted">&middot;</span>
        <Link href={`/${locale}/model/fieldstate`} className="text-accent hover:underline">{d.fieldstateLink}</Link>
      </nav>

      <div className="flex gap-12 items-start">
        <SectionNavigation sections={d.nav} />
        <div className="min-w-0 flex-1 space-y-14">
          {d.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
              <div className="space-y-3 max-w-3xl">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-foreground-muted">{paragraph}</p>
                ))}
              </div>
              {section.equations && (
                <div className="mt-5 space-y-3 overflow-x-auto rounded-lg border border-card-border bg-background p-4">
                  {section.equations.map((equation) => <MathBlock key={equation} tex={equation} />)}
                </div>
              )}
              {section.note && (
                <p className="mt-4 max-w-3xl rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs leading-relaxed text-foreground-muted">
                  {section.note}
                </p>
              )}
              {section.id === "cohort" && (
                <div className="mt-6 max-w-3xl">
                  <CohortAsfrProfile locale={locale} />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <NextPageLink
        href={`/${locale}/evidence`}
        label={d.nextLabel}
        title={d.nextTitle}
        icon={Sigma}
      />
    </div>
  );
}
