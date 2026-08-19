import type { ChainEdge, ChainNode } from "./types";

/**
 * Canonical public causal map for the FieldState–ASFR-v2 route.
 *
 * The legacy A–F lettering remains only through source-qualified compatibility
 * bindings. This map uses semantic node names so that BBB, BTB, melatonin,
 * bioelectric development, ovarian reserve and the demographic endpoint
 * cannot be collapsed into one scalar pathway.
 */
export const FIELDSTATE_V2_NODES: ChainNode[] = [
  {
    id: "fieldstate",
    level: 1,
    label: "FieldState",
    sublabel: "B₀, vektori, PSD, vaihe, aika",
    epistemicLevel: "L*",
    title: "Paikallinen ja mitattava kenttätila",
    mechanism:
      "FieldState erottaa tausta-, ambient- ja henkilökohtaiset kenttäkomponentit, elinkohtaisen siirron, spektrin, vaiheen, koherenssin ja vuorokausikontekstin. Mobiililiittymä tai maakeskiarvo voi toimia vain teknologian ajoitusproxyna, ei elinannoksena.",
    quantitative:
      "A_selected,o = T_o A_ambient + χ(|T_o A_background|) T_o A_personal\nX_geom,o = 2(T_o A_background)·(T_o A_personal)",
    keyReferences: [
      {
        authors: "Blackman et al. 1985; Ritz et al. 2004; Usselman et al. 2016",
        title: "Tausta-, kulma- ja orientaatioriippuvaiset kenttäallekirjoitukset",
        journal: "Bioelectromagnetics; Nature; Scientific Reports",
        keyFinding: "Kokeelliset järjestelmät tukevat vektorin, kulman ja taustan säilyttämistä mittausmallissa; ne eivät anna TFR-kerrointa.",
      },
    ],
    falsificationCondition:
      "Jos esirekisteröidyssä asetelmassa sama paikallinen altistus tuottaa identtisen vasteen riippumatta mitatusta B₀-vektorista, geometriasta, spektristä ja vuorokausitilasta silloin kun kyseinen reseptorihypoteesi ennustaa eron.",
  },
  {
    id: "mechanisms",
    level: 2,
    label: "Biologiset välitilat",
    sublabel: "CRY · melatoniini · Ca²⁺/ROS · Vmem/mTOR · HPA · mikrobiomi/OT",
    epistemicLevel: "M",
    title: "Erilliset välittäjähaarat",
    mechanism:
      "FieldState voi kohdistua erillisiin, testattaviin välitiloihin: RPM/CRY–redox, melatoniini/redox, Ca²⁺/mitokondrio–ROS, Vmem/mTOR–kehitysmuisti, kello-/HPA–HPG sekä legacy-mikrobiomi/oksitosiini. Ne eivät ole yksi additiivinen vaikutus; RF, ELF/PEMF ja optinen sinivalo pidetään altistusluokkina erillään.",
    keyReferences: [
      {
        authors: "Sherrard et al. 2018; Cao et al. 2015",
        title: "CRY–ROS- ja RF×circadian-välitilat",
        journal: "PLOS Biology; IJERPH",
        keyFinding: "Antavat mekanistista välitilan tukea solu- ja rottajärjestelmissä, eivät suoraa väestövaikutusta.",
      },
    ],
  },
  {
    id: "btb",
    level: 3,
    label: "Veri–kiveseste (BTB)",
    sublabel: "tight junction · spermatogeneesi",
    epistemicLevel: "M",
    title: "BTB on erillinen mieshaara",
    mechanism:
      "Paikallinen kivesaltistus, redox-tila ja tight-junction-proteiinit voivat vaikuttaa spermatogeneesin suojaavaan mikroympäristöön. BTB:n hidas tila pidetään erillään BBB:stä ja akuutista siittiöredoxista.",
    keyReferences: [
      {
        authors: "Yu et al. 2020; Chakraborty et al. 2020",
        title: "BTB-lokalisaatio ja redox–tight-junction-väliporras",
        journal: "Science of the Total Environment; Reproductive Toxicology",
        keyFinding: "Yu tarjoaa suoran RF-rotta-asetelman; Chakraborty tukee redox–BTB–siittiö-väliporrasta eri oksidatiivisen stressin asetelmassa.",
      },
    ],
  },
  {
    id: "other-barriers",
    level: 3,
    label: "Muut estetilat",
    sublabel: "BBB · istukka · retina",
    epistemicLevel: "L*",
    title: "Elinkohtaiset kandidaattitilat, ei yhteinen kerroin",
    mechanism:
      "BBB, istukka ja verkkokalvon este voivat jakaa redox/tight-junction-biologiaa, mutta niiden paikallinen siirto, solut, aikaskaala ja päätepiste ovat eriäviä. Ne säilyvät erillisinä kandidaattitiloina; aktiivinen v2-rekisteri ei johda niistä globaalia este- tai lisääntymiskerrointa.",
    keyReferences: [
      {
        authors: "Lochhead et al. 2010",
        title: "Redox–tight-junction-väliporras BBB:ssä",
        journal: "Journal of Cerebral Blood Flow & Metabolism",
        keyFinding: "Tukee redox–junction-biologiaa, mutta ei ole suora paikallinen RF- tai lisääntymispäätepistetutkimus.",
      },
    ],
  },
  {
    id: "male",
    level: 4,
    label: "Miehen lisääntymistila",
    sublabel: "BTB · iturata · steroidogeneesi · siittiö",
    epistemicLevel: "M",
    title: "Miehen elinkohtainen kapasiteetti",
    mechanism:
      "Miehen kapasiteetti erottaa ituradan varannon, BTB:n, steroidogeneesin, siittiötuoton, toiminnan ja DNA-eheyden. Nopeaa spermaredox-haaraa ei sekoiteta hitaaseen spermatogeneesi- tai BTB-muistiin.",
    keyReferences: [
      {
        authors: "De Iuliis et al. 2009; Yu et al. 2020; Cordelli et al. 2024/2025",
        title: "Ihmisen siittiö in vitro, paikallinen rotta-BTB ja systemaattinen katsaus",
        journal: "PLOS ONE; STOTEN; Environment International",
        keyFinding: "Evidenssi koskee erillisiä biologisia päätepisteitä; katsauksen 2025 korjaus on huomioitava.",
      },
    ],
  },
  {
    id: "female",
    level: 4,
    label: "Naisen lisääntymistila",
    sublabel: "varanto · oosyyttiredox · kello · implantaatio",
    epistemicLevel: "M",
    title: "Naisen elinkohtainen kapasiteetti",
    mechanism:
      "Naispuoli erottaa munasarjavarannon, oosyyttien redox/mitokondriotilan, ovulaation kellotuksen sekä luteaali-, implantaatio- ja istukkatuen. Näitä ei voi kuvata vain yhdellä ovulaatiokertoimella.",
    keyReferences: [
      {
        authors: "Ahmadi et al. 2016; Liu et al. 2014; He et al. 2016; Yousefi et al. 2025",
        title: "Reservi-, kello- ja oosyyttivälitilat",
        journal: "Electron Physician; PNAS; IJMS; Reproductive Sciences",
        keyFinding: "Pääosin eläin- tai downstream-mekanismitutkimuksia; ne eivät kalibroi ihmisen TFR-vaikutusta.",
      },
    ],
  },
  {
    id: "couple",
    level: 5,
    label: "Parin kapasiteetti",
    sublabel: "mies × nainen × yhteinen kotiympäristö",
    epistemicLevel: "M",
    title: "Pari ei ole keskiarvomies kertaa keskiarvonainen",
    mechanism:
      "Käsitys- ja live-birth-kapasiteetti muodostuu parikohtaisesti. Yhteinen kotiympäristö, paikallinen geometria ja biologinen varanto voivat tehdä partnerien tiloista korreloituneita.",
    quantitative:
      "Φ_couple,ij,t = Φ_m,i,t × Φ_f,j,t × F_shared-household,ij,t × L_f,j,t",
    keyReferences: [],
  },
  {
    id: "demographic-inputs",
    level: 5,
    label: "Eksplisiittiset demografiset syötteet",
    sublabel: "kysyntä/mahdollisuus · tempo · ART/live birth",
    epistemicLevel: "E",
    title: "Biologia ei korvaa väestödynamiikkaa",
    mechanism:
      "Parin biologinen kapasiteetti on vain yksi ASFR:n syöte. Perheenmuodostuksen kysyntä ja mahdollisuus, ajoittumisen tempo sekä ART:n/conception-to-live-birth-hoidon saatavuus tuodaan malliin erillisinä, ulkoisesti mitattuina syötteinä.",
    keyReferences: [],
  },
  {
    id: "asfr",
    level: 6,
    label: "ASFR",
    sublabel: "ikä · kohortti · parity · vuosi",
    epistemicLevel: "E",
    title: "Ikäkohtainen hedelmällisyys on ensisijainen väestöpäätepiste",
    mechanism:
      "ASFR yhdistää biologisen parikapasiteetin näkyviin kysyntä/mahdollisuus-, tempo- ja ART/live-birth -syötteisiin. Siksi TFR:n muutos ei yksin kerro biologisesta muutoksesta.",
    quantitative:
      "ASFR_target = ASFR_reference × Φ_couple ratio × O ratio × tempo ratio × ART/live-birth ratio",
    keyReferences: [
      {
        authors: "UN World Population Prospects 2024",
        title: "Age-specific fertility rates",
        journal: "United Nations",
        keyFinding: "ASFR mahdollistaa kohortti- ja tempoerottelun, jota pelkkä TFR ei tee.",
      },
    ],
  },
  {
    id: "tfr",
    level: 7,
    label: "TFR",
    sublabel: "johdettu ASFR-summa",
    epistemicLevel: "E",
    title: "Kokonaishedelmällisyysluku",
    mechanism:
      "TFR on periodimitta, joka saadaan ikäkohtaisten hedelmällisyyslukujen summana. Se ei ole suora biologinen päätepiste eikä sitä käytetä FieldState-kertoimen kalibrointiin ilman ASFR- ja biologisia välitiloja.",
    quantitative: "TFR_c,t = (5 / 1000) Σ_g ASFR_c,g,t",
    keyReferences: [],
  },
];

export const FIELDSTATE_V2_EDGES: ChainEdge[] = [
  { from: "fieldstate", to: "mechanisms", label: "mitattu syöte", epistemicLevel: "L*", priority: "primary" },
  { from: "mechanisms", to: "btb", label: "redox / tight junction", epistemicLevel: "M" },
  { from: "mechanisms", to: "other-barriers", label: "elinkohtainen hypoteesi", epistemicLevel: "L*" },
  { from: "mechanisms", to: "male", label: "redox / Ca²⁺ / HPA", epistemicLevel: "M", priority: "primary" },
  { from: "mechanisms", to: "female", label: "kello / redox / HPA", epistemicLevel: "M", priority: "primary" },
  { from: "btb", to: "male", label: "BTB", epistemicLevel: "M", priority: "primary" },
  { from: "male", to: "couple", label: "mieskapasiteetti", epistemicLevel: "M", priority: "primary" },
  { from: "female", to: "couple", label: "naiskapasiteetti", epistemicLevel: "M", priority: "primary" },
  { from: "couple", to: "asfr", label: "käsitys / live birth", epistemicLevel: "M", priority: "primary" },
  { from: "demographic-inputs", to: "asfr", label: "erilliset demografiset syötteet", epistemicLevel: "E", priority: "primary" },
  { from: "asfr", to: "tfr", label: "ikäryhmäsumma", epistemicLevel: "E", priority: "primary" },
];

type GraphLocale = "en" | "fi";

/** English text for the public graph. Citations and equations are shared. */
const EN_NODE_COPY: Record<string, Pick<ChainNode, "label" | "sublabel" | "title" | "mechanism" | "falsificationCondition">> = {
  fieldstate: {
    label: "FieldState",
    sublabel: "B₀, vector, PSD, phase, time",
    title: "Local, measurable field state",
    mechanism:
      "FieldState keeps background, ambient and personal field components, organ-local transfer, spectrum, phase, coherence and circadian context distinct. A mobile-subscription series or country average is only a technology-timing proxy, not organ dose.",
    falsificationCondition:
      "In a preregistered experiment, the same local exposure produces an identical response regardless of measured B₀ vector, geometry, spectrum and circadian state when the registered receptor hypothesis predicts a difference.",
  },
  mechanisms: {
    label: "Biological intermediates",
    sublabel: "CRY · melatonin · Ca²⁺/ROS · Vmem/mTOR · HPA · microbiome/OT",
    title: "Separate, testable mediator branches",
    mechanism:
      "FieldState can enter separate, testable intermediates: RPM/CRY–redox, melatonin/redox, Ca²⁺/mitochondrial–ROS, Vmem/mTOR developmental memory, clock/HPA–HPG and the legacy microbiome/oxytocin branch. They are not one additive effect; RF, ELF/PEMF and optical blue light remain separate exposure classes.",
  },
  btb: {
    label: "Blood–testis barrier (BTB)",
    sublabel: "tight junction · spermatogenesis",
    title: "BTB is a distinct male branch",
    mechanism:
      "Local testis exposure, redox state and tight-junction proteins may affect the protective microenvironment of spermatogenesis. The slow BTB state remains distinct from BBB and acute sperm redox.",
  },
  "other-barriers": {
    label: "Other barrier states",
    sublabel: "BBB · placenta · retina",
    title: "Organ-specific candidate states, not a shared multiplier",
    mechanism:
      "BBB, placenta and retinal barrier may share redox/tight-junction biology, but their local transfer, cells, timescales and endpoints differ. They remain separate candidate states; the active v2 registry does not derive a global barrier or reproductive coefficient from them.",
  },
  male: {
    label: "Male reproductive state",
    sublabel: "BTB · germline · steroidogenesis · sperm",
    title: "Male organ-specific capacity",
    mechanism:
      "Male capacity separates germline reserve, BTB, steroidogenesis, sperm output, function and DNA integrity. Acute sperm redox is not conflated with slow spermatogenesis or BTB memory.",
  },
  female: {
    label: "Female reproductive state",
    sublabel: "reserve · oocyte redox · clock · implantation",
    title: "Female organ-specific capacity",
    mechanism:
      "The female branch separates ovarian reserve, oocyte redox/mitochondrial state, ovulatory timing and luteal, implantation and placental support. These cannot be represented by a single ovulation multiplier.",
  },
  couple: {
    label: "Couple capacity",
    sublabel: "male × female × shared home",
    title: "A couple is not an average male times an average female",
    mechanism:
      "Conception and live-birth capacity are couple-specific. A shared home environment, local geometry and biological reserve can make partner states correlated.",
  },
  "demographic-inputs": {
    label: "Explicit demographic inputs",
    sublabel: "demand/opportunity · tempo · ART/live birth",
    title: "Biology does not replace population dynamics",
    mechanism:
      "Couple biological capacity is only one ASFR input. Family-formation demand and opportunity, childbearing tempo and ART/conception-to-live-birth delivery are externally measured inputs, retained separately from biology.",
  },
  asfr: {
    label: "ASFR",
    sublabel: "age · cohort · parity · year",
    title: "Age-specific fertility is the primary population endpoint",
    mechanism:
      "ASFR combines visible biological couple capacity with demand/opportunity, tempo and ART/live-birth inputs. A period TFR trend is therefore not itself evidence of biological change.",
  },
  tfr: {
    label: "TFR",
    sublabel: "derived ASFR sum",
    title: "Total fertility rate",
    mechanism:
      "TFR is a period measure derived from the sum of age-specific fertility rates. It is not a direct biological endpoint and is not used to calibrate a FieldState coefficient without intervening ASFR and biological measurements.",
  },
};

const EN_EDGE_LABELS: Record<string, string> = {
  "fieldstate-mechanisms": "measured input",
  "mechanisms-btb": "redox / tight junction",
  "mechanisms-other-barriers": "organ-specific hypothesis",
  "mechanisms-male": "redox / Ca²⁺ / HPA",
  "mechanisms-female": "clock / redox / HPA",
  "btb-male": "BTB",
  "male-couple": "male capacity",
  "female-couple": "female capacity",
  "couple-asfr": "conception / live birth",
  "demographic-inputs-asfr": "separate demographic inputs",
  "asfr-tfr": "age-group sum",
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
  if (locale === "fi") {
    return { nodes: FIELDSTATE_V2_NODES, edges: FIELDSTATE_V2_EDGES };
  }

  return {
    nodes: FIELDSTATE_V2_NODES.map((node) => ({ ...node, ...EN_NODE_COPY[node.id] })),
    edges: FIELDSTATE_V2_EDGES.map((edge) => ({
      ...edge,
      label: EN_EDGE_LABELS[`${edge.from}-${edge.to}`] ?? edge.label,
    })),
  };
}
