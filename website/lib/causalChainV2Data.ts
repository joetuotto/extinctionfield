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
    id: "fieldstate",
    level: 1,
    label: "FieldState observations",
    sublabel: "B₀, vector, PSD, phase, time",
    epistemicLevel: "L*",
    title: "Optional local measurement module",
    mechanism:
      "FieldState keeps background, ambient and personal field components, organ-local transfer estimates, spectrum, phase, coherence and circadian context distinct. It is an optional observation and estimation module, not BERM itself or a biological cause. A mobile-subscription series or country average is only a technology-timing proxy, not organ dose.",
    quantitative:
      "A_selected,o = T_o A_ambient + χ(|T_o A_background|) T_o A_personal\nX_geom,o = 2(T_o A_background)·(T_o A_personal)",
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
    id: "l2-bridge",
    level: 2,
    label: "Conditional L2 response operator",
    sublabel: "formal operator · tissue kernel open",
    epistemicLevel: "L*",
    title: "Operator form derived; tissue calibration open",
    mechanism:
      "Conditional on minimal matter–metric coupling and response theory, BERM maps the exact Lindgren metric perturbation with δ⟨O_i⟩ = ∫Ξ_i^{μν}δg_{μν} + higher orders. The gauge prescription, scale, tissue kernels and endpoint coefficients remain open. Downstream biology is not derived from FieldState or supplied by Lindgren.",
    quantitative: "δ⟨O_i⟩ = ∫Ξ_i^{μν}δg_{μν} + O(δg²)  [CONDITIONAL; Ξ OPEN]",
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
      "BERM proposes separate, testable intermediates: RPM/CRY–redox, melatonin/redox, Ca²⁺/mitochondrial–ROS, Vmem/mTOR developmental memory, clock/HPA–HPG and the legacy microbiome/oxytocin branch. Until a matching Ξ_i is calibrated, no FieldState observation is treated as having generated these states. They are not one additive effect; RF, ELF/PEMF and optical blue light remain separate exposure classes.",
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
    sublabel: "BTB · germline · androgen production · availability · AR/ZIP9 · sperm",
    epistemicLevel: "M",
    title: "Male organ-specific capacity",
    mechanism:
      "Male capacity separates germline reserve, BTB, androgen production, SHBG/albumin and free or intratesticular availability, AR/ZIP9 and post-receptor use capacity, sperm output, function and DNA integrity. Acute sperm redox is not conflated with slow spermatogenesis or BTB memory.",
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
  fieldstate: {
    label: "FieldState-havainnot",
    sublabel: "B₀, vektori, PSD, vaihe, aika",
    title: "Valinnainen paikallinen mittausmoduuli",
    mechanism:
      "FieldState erottaa tausta-, ambient- ja henkilökohtaiset kenttäkomponentit, elinkohtaisen siirtoarvion, spektrin, vaiheen, koherenssin ja vuorokausikontekstin. Se on valinnainen havainto- ja estimointimoduuli, ei BERM tai biologinen syy. Mobiililiittymä tai maakeskiarvo voi toimia vain teknologian ajoitusproxyna, ei elinannoksena.",
    falsificationCondition:
      "Jos esirekisteröidyssä asetelmassa sama paikallinen altistus tuottaa identtisen vasteen riippumatta mitatusta B₀-vektorista, geometriasta, spektristä ja vuorokausitilasta silloin kun kyseinen reseptorihypoteesi ennustaa eron.",
  },
  "l2-bridge": {
    label: "Ehdollinen L2-vasteoperaattori",
    sublabel: "formaali operaattori · kudosydin avoin",
    title: "Operaattorin muoto on johdettu; kudoskalibraatio avoin",
    mechanism:
      "Ehdolla, että materiaalla on minimaalinen metriikkakytkentä ja vastefunktioteoria pätee, BERM kuvaa tarkan Lindgren-häiriön muodossa δ⟨O_i⟩ = ∫Ξ_i^{μν}δg_{μν} + korkeammat kertaluvut. Gauge, mittakaava, kudosytimet ja endpoint-kertoimet ovat avoimia. Jatkohaarat eivät ole FieldStatesta tai Lindgrenistä johdettua biologiaa.",
    falsificationCondition:
      "Ehdotettu L2-operaattori on hylättävä tai korjattava, jos esirekisteröity kohdistettu altistus–päätepistedata ei vastaa sen suunta-, spektri-, aika- tai annosennusteita.",
  },
  mechanisms: {
    label: "Biologiset välitilat",
    sublabel: "CRY · melatoniini · Ca²⁺/ROS · Vmem/mTOR · HPA · mikrobiomi/OT",
    title: "Erilliset välittäjähaarat",
    mechanism:
      "BERM ehdottaa erillisiä, testattavia välitiloja: RPM/CRY–redox, melatoniini/redox, Ca²⁺/mitokondrio–ROS, Vmem/mTOR–kehitysmuisti, kello-/HPA–HPG sekä legacy-mikrobiomi/oksitosiini. Ennen vastaavan Ξ_i-ytimen kalibrointia FieldState-havainnon ei katsota synnyttäneen näitä tiloja. RF, ELF/PEMF ja optinen sinivalo pidetään altistusluokkina erillään.",
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
    sublabel: "BTB · iturata · tuotanto · saatavuus · AR/ZIP9 · siittiö",
    title: "Miehen elinkohtainen kapasiteetti",
    mechanism:
      "Miehen kapasiteetti erottaa ituradan varannon, BTB:n, androgeenituotannon, SHBG-/albumiinisitoutumisen ja vapaan tai intratestikulaarisen saatavuuden, AR-/ZIP9- ja reseptorin jälkeisen käyttökapasiteetin sekä siittiötuoton, toiminnan ja DNA-eheyden.",
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
