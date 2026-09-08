import graphJson from "@/data/causal-graph.json";
import type {
  CausalGraph,
  CausalGraphEdge,
  CausalGraphNode,
} from "@/lib/claims/types";
import type { ChainEdge, ChainNode, EpistemicLevel } from "@/lib/types";
import { indexedReference } from "@/lib/referenceIndex";
import { STEROIDOGENESIS } from "@/lib/steroidogenesis";
import { REPRODUCTIVE_REGULATION } from "@/lib/reproductiveRegulation";

const GRAPH = graphJson as CausalGraph;

const LEVEL_TITLES: Record<string, Record<number, string>> = {
  en: {
    1: "Geometry, measurements and proxy inputs",
    2: "Conditional L2 response operator",
    3: "Mechanisms",
    4: "Barrier states",
    5: "Reproductive states",
    6: "Couple, ecology, demography and civilization",
    7: "Age-specific fertility",
    8: "TFR endpoint",
  },
  fi: {
    1: "Geometria, mittaus- ja proxysyötteet",
    2: "Ehdollinen L2-vasteoperaattori",
    3: "Mekanismit",
    4: "Estetilat",
    5: "Lisääntymistilat",
    6: "Pari-, ekologia-, demografia- ja sivilisaatiotilat",
    7: "Ikäkohtainen hedelmällisyys",
    8: "TFR-päätepiste",
  },
};

type DiagramText = { en: string; fi: string };
type LocalizedStatus = Record<"en" | "fi" | "ja" | "fr" | "ko", string>;

const CALIBRATION_LABELS: Record<string, LocalizedStatus> = {
  proxy_only: { en: "Historical proxy", fi: "Historiallinen proxy", ja: "過去の代理指標", fr: "Indicateur historique", ko: "과거 대리 지표" },
  requires_matched_measurement: { en: "Matched measurements needed", fi: "Yhteensovitetut mittaukset tarvitaan", ja: "対応する測定が必要", fr: "Mesures appariées requises", ko: "대응 측정 필요" },
  requires_psd_measurement: { en: "Measured spectrum needed", fi: "Mitattu spektri tarvitaan", ja: "スペクトル測定が必要", fr: "Spectre mesuré requis", ko: "측정 스펙트럼 필요" },
  requires_endpoint_calibration: { en: "Endpoint calibration open", fi: "Päätepistekalibrointi avoin", ja: "評価項目の較正は未確定", fr: "Étalonnage du résultat ouvert", ko: "결과 지표 보정 미확정" },
  structural_only: { en: "Structure specified · coefficients open", fi: "Rakenne määritelty · kertoimet avoinna", ja: "構造を定義・係数は未確定", fr: "Structure définie · coefficients ouverts", ko: "구조 정의 · 계수 미확정" },
  requires_partner_distribution: { en: "Partner distributions needed", fi: "Parien yhteisjakaumat tarvitaan", ja: "パートナーの同時分布が必要", fr: "Distributions des couples requises", ko: "파트너 결합 분포 필요" },
  requires_matched_ecological_measurement: { en: "Matched ecology measurements needed", fi: "Yhteensovitetut ekologiset mittaukset tarvitaan", ja: "対応する生態測定が必要", fr: "Mesures écologiques appariées requises", ko: "대응 생태 측정 필요" },
  requires_multigeneration_ecological_panel: { en: "Ecological follow-up across generations", fi: "Ekologinen seuranta sukupolvien yli", ja: "複数世代の生態追跡", fr: "Suivi écologique sur plusieurs générations", ko: "세대 간 생태 추적" },
  requires_multigeneration_genetic_or_common_garden_panel: { en: "Heritability evidence needed", fi: "Periytyvyysnäyttö tarvitaan", ja: "遺伝性の証拠が必要", fr: "Données d’héritabilité requises", ko: "유전성 근거 필요" },
  requires_external_measurement: { en: "Independent measurements needed", fi: "Riippumattomat mittaukset tarvitaan", ja: "独立した測定が必要", fr: "Mesures indépendantes requises", ko: "독립 측정 필요" },
  observed_wpp_anchor: { en: "Observed demographic anchor", fi: "Havaittu demografinen ankkuri", ja: "観測人口統計による基準", fr: "Ancrage démographique observé", ko: "관측 인구 통계 기준점" },
};

export interface CanonicalNodeSupplement {
  description: DiagramText;
  studyIds: string[];
  regulationStudyIds?: string[];
  claimIds: string[];
  links: { href: string; label: DiagramText }[];
}

const steroidogenesisLink = {
  href: "/biology/calcium-redox-steroidogenesis#study-explorer",
  label: { en: "Calcium, redox and hormone production: studies and synthesis", fi: "Kalsium, redox ja hormonituotanto: tutkimukset ja synteesi" },
};
const reserveMaskingLink = {
  href: "/model/proxy-masking#redox-reserve-masking",
  label: { en: "Hidden reserve and proxy masking", fi: "Piilevä varanto ja proxy masking" },
};
const regulationLink = {
  href: "/behavior/reproductive-regulation#three-branches",
  label: { en: "Reproductive regulation: motivation, capacity and care", fi: "Lisääntymisen säätely: motivaatio, kapasiteetti ja hoiva" },
};

/** Presentation detail within canonical nodes, not additional causal edges or fitted states. */
export const CANONICAL_NODE_SUPPLEMENTS: Record<string, CanonicalNodeSupplement> = {
  A_VGCC_ROS: {
    description: {
      en: "Imported membrane, calcium-channel and mitochondrial/redox biology supplies a state-dependent response system. ER release through RyR, SERCA reuptake, mitochondrial calcium and glutathione reserve interact; current ROS does not measure the remaining reserve. Field experiments constrain particular protocols, while channel, substrate and genetic interventions locate individual components. BERM joins them conditionally through its L2 operator; these studies do not calibrate the geometric coupling or a universal direction of response.",
      fi: "Tuotu kalvo-, kalsiumkanava- ja mitokondrio/redox-biologia muodostaa tilariippuvaisen vastejärjestelmän. ER-varaston RyR-vapautuminen, SERCA-takaisinotto, mitokondrioiden kalsium ja glutationivaranto kytkeytyvät toisiinsa; tämänhetkinen ROS ei mittaa jäljellä olevaa varantoa. Kenttäkokeet rajaavat nimettyjä protokollia, kun taas kanava-, substraatti- ja geenikokeet paikantavat yksittäisiä osia. BERM yhdistää ne ehdollisesti L2-operaattorin kautta; tutkimukset eivät kalibroi geometrista kytkentää tai yleistä vasteen suuntaa.",
    },
    studyIds: ["qin2018", "bertagna2025", "miao2025", "adachi2004", "santulli2015"],
    claimIds: ["claim.steroidogenesis.field-protocols", "claim.steroidogenesis.component-convergence"],
    links: [steroidogenesisLink, reserveMaskingLink],
  },
  CIRCADIAN_COORDINATION: {
    description: {
      en: "Tissue phase relationships and calcium timing affect when a cell can respond. The steroidogenesis refinement distinguishes the local RORα–BMAL1–StAR branch from CaMKI–NUR77–StAR and retains LH/cAMP as a separate stimulus. CaMKII clock-coupling experiments describe another timing component; CaMKI and CaMKII are not interchangeable. Local synthesis capacity and the phase-dependent response of a hormone target are distinct mechanisms, joined in BERM as a cross-study synthesis.",
      fi: "Kudosten vaihesuhteet ja kalsiumin ajoitus vaikuttavat siihen, milloin solu kykenee vastaamaan. Steroidogeneesin tarkennus erottaa paikallisen RORα–BMAL1–StAR-haaran CaMKI–NUR77–StAR-haarasta ja säilyttää LH/cAMP:n erillisenä ärsykkeenä. CaMKII:n kellokytkentäkokeet kuvaavat toista ajoituskomponenttia; CaMKI ja CaMKII eivät ole sama asia. Paikallinen synteesikyky ja hormonin kohdekudoksen vaiheesta riippuva vaste ovat eri mekanismeja, jotka BERM liittää yhteen tutkimusten välisenä synteesinä.",
    },
    studyIds: ["qin2018", "akashi2005", "alvarez2008", "martin2008", "kon2014"],
    claimIds: ["claim.steroidogenesis.component-convergence"],
    links: [steroidogenesisLink, { href: "/model/biological-coordination", label: { en: "Biological coordination", fi: "Biologinen koordinaatio" } }],
  },
  RECEPTOR_STATE_MEMORY: {
    description: {
      en: "Response depends on the receiver's chemical state and recovery history. Glutathione reserve is a distinct measured state, not a replacement for receptor memory or the current ROS value. In Chen's component experiment, depleted GSH preserved LH-stimulated progesterone until an added oxidant challenge exposed reduced capacity. This supports reserve × challenge reasoning: preserved output can coexist with reduced reserve, while a null output measurement alone cannot establish hidden depletion.",
      fi: "Vaste riippuu vastaanottimen kemiallisesta tilasta ja palautumishistoriasta. Glutationivaranto on erillinen mitattu tila, ei vastaanotinmuistin tai nykyisen ROS-arvon korvike. Chenin komponenttikokeessa GSH:n väheneminen säilytti LH-stimuloidun progesteronituotannon, kunnes lisätty hapetushaaste paljasti alentuneen kapasiteetin. Tämä tukee varanto × haaste -päättelyä: säilynyt tuotos voi esiintyä alentuneen varannon rinnalla, mutta pelkkä tuotoksen nollatulos ei osoita piilevää varantovajetta.",
    },
    studyIds: ["chen2010", "harmon2026", "miao2025", "houston2019"],
    claimIds: ["claim.steroidogenesis.reserve-masking"],
    links: [steroidogenesisLink, reserveMaskingLink],
  },
  HORMONE_TARGET_RESPONSE: {
    description: {
      en: "A hormone's effective response depends on signal timing, receptor availability and target readiness. The steroidogenesis refinement separates the hormone-producing cell's supply and reserve from downstream hormone binding and receptor use. Prolactin–kisspeptin and prolactin-sensitive caregiving circuits add target-specific reproductive and parental responses to this structure. Hormone concentration, synthesis capacity and the resulting behavioural response are therefore separate observables. Existing intervention evidence constrains individual transitions; the composed field-to-behaviour route remains BERM synthesis.",
      fi: "Hormonin tehollinen vaste riippuu signaalin ajoituksesta, reseptorien saatavuudesta ja kohdekudoksen valmiudesta. Steroidogeneesin tarkennus erottaa hormonia tuottavan solun huollon ja varannon hormonin sitoutumisesta ja reseptorin välittämästä käytöstä. Prolaktiini–kisspeptiini- ja prolaktiinille herkät hoivapiirit lisäävät rakenteeseen kohdekohtaiset lisääntymis- ja hoivavasteet. Hormonipitoisuus, synteesikyky ja toteutuva käyttäytymisvaste ovat siten eri havaintosuureita. Olemassa olevat interventiot rajaavat yksittäisiä siirtymiä; yhdistetty kentästä käyttäytymiseen ulottuva reitti on BERM:n synteesi.",
    },
    studyIds: ["chen2013", "cunningham2016"],
    claimIds: ["claim.steroidogenesis.component-convergence", "claim.steroidogenesis.staged-integration", "claim.reproduction.selective-regulation", "claim.reproduction.caregiving-allocation"],
    regulationStudyIds: ["study.sonigo2012", "study.hoskova2022", "study.clarkson2026"],
    links: [steroidogenesisLink, regulationLink, { href: "/behavior", label: { en: "From biological state to behaviour", fi: "Biologisesta tilasta käyttäytymiseen" } }],
  },
  MALE_STEROIDOGENESIS: {
    description: {
      en: "Leydig-cell hormone production combines central LH/cAMP stimulation with local calcium, redox reserve, mitochondrial capacity, cholesterol supply and clock regulation. CaMKI–NUR77–StAR and RORα–BMAL1–StAR are distinct converging branches; autophagy and lipid handling support substrate access. GSH reserve, GSH/GSSG ratio and current hormone output remain separate measurements. Basal and stimulated responses may differ in direction. This structure is supported link by link by field and component experiments; its combined effect is BERM synthesis, without a new fitted TFR multiplier.",
      fi: "Leydigin solun hormonituotanto yhdistää keskisen LH/cAMP-stimulaation paikalliseen kalsiumiin, redox-varantoon, mitokondriokapasiteettiin, kolesterolihuoltoon ja kellosäätelyyn. CaMKI–NUR77–StAR ja RORα–BMAL1–StAR ovat erilliset yhdistyvät haarat; autofagia ja lipidien käsittely tukevat substraatin saatavuutta. GSH-varanto, GSH/GSSG-suhde ja nykyinen hormonituotos säilyvät eri mittauksina. Perustilan ja stimuloidun tilan vasteet voivat olla erisuuntaisia. Rakenne saa linkkikohtaista tukea kenttä- ja komponenttikokeista; yhteisvaikutus on BERM:n synteesi ilman uutta sovitettua TFR-kerrointa.",
    },
    studyIds: ["qin2018", "chen2010", "martin2008", "xiao2021", "midzak2007", "gao2018", "esmaeilian2023"],
    claimIds: ["claim.steroidogenesis.component-convergence", "claim.steroidogenesis.reserve-masking", "claim.steroidogenesis.staged-integration"],
    links: [steroidogenesisLink, reserveMaskingLink, { href: "/modulome/testes", label: { en: "Testicular system", fi: "Kiveksen järjestelmä" } }],
  },
  INDIVIDUAL_BEHAVIORAL_RESPONSE: {
    description: {
      en: "Biological state, social context and learning history jointly shape a profile of desire, approach, contact and effort. RFRP-3 manipulation supplies a selective reproductive-motivation anchor; human interventions identify specific hormone-sensitive sexual responses. Realised reproductive encounters connect these outputs to population outcomes. The reported reason remains another observable on the parallel Epistapege branch. BERM composes these measured dependencies conditionally; there is no universal suppression score or fitted hormone-to-TFR coefficient.",
      fi: "Biologinen tila, sosiaalinen tilanne ja oppimishistoria muovaavat yhdessä halun, lähestymisen, kontaktin ja vaivannäön profiilia. RFRP-3-manipulaatio ankkuroi lisääntymismotivaation valikoivaa säätelyä; ihmisen interventiot paikantavat tiettyjä hormonille herkkiä seksuaalisia vasteita. Toteutuvat lisääntymiselle altistavat kohtaamiset yhdistävät ulostulot väestötuloksiin. Kerrottu syy säilyy erillisenä havaintona rinnakkaisessa Epistapege-haarassa. BERM yhdistää mitatut riippuvuudet ehdollisesti ilman yleistä suppressiopistettä tai sovitettua hormoni–TFR-kerrointa.",
    },
    studyIds: [], regulationStudyIds: ["study.peragine2017"],
    claimIds: ["claim.reproduction.selective-regulation", "claim.behavior.behaviour-to-opportunity"],
    links: [regulationLink, { href: "/model/proxy-masking#syndrome-fragmentation", label: { en: "The joint behavioural profile", fi: "Yhteinen käyttäytymisprofiili" } }],
  },
  REPRODUCTIVE_OPPORTUNITY: {
    description: {
      en: "Partner availability, resources, contraception and the other person's response constrain whether an approach becomes an encounter with reproductive potential. These conditions are distinct from motivation and physiological capacity. Social interaction can change opportunities at the next time step; the wider atlas shows that feedback. Published longitudinal and population studies constrain named social transitions, while the field-to-behaviour entry remains a conditional BERM synthesis.",
      fi: "Kumppanien saatavuus, resurssit, ehkäisy ja toisen henkilön vaste rajaavat lähestymisen muuttumista lisääntymiselle altistavaksi kohtaamiseksi. Ehdot eroavat motivaatiosta ja fysiologisesta kapasiteetista. Sosiaalinen vuorovaikutus voi muuttaa mahdollisuuksia seuraavalla aika-askeleella; laaja atlas esittää tämän palautteen. Julkaistut pitkittäis- ja väestötutkimukset rajaavat nimettyjä sosiaalisia siirtymiä, kun taas kentästä käyttäytymiseen johtava alkuvaihe on BERM:n ehdollinen synteesi.",
    },
    studyIds: [], regulationStudyIds: ["study.lei_south2021", "study.balbo2014"],
    claimIds: ["claim.reproduction.social-feedback"], links: [regulationLink],
  },
  CAREGIVING_ALLOCATION: {
    description: {
      en: "Care has an amount, a target and a contact history. Prolactin–kisspeptin experiments locate a reproductive-axis brake, while prolactin-sensitive MPOA–VTA circuitry supports offspring contact. Different receiving circuits allow reproductive suppression and maintained care to coexist. BERM joins these component results through the shared signal and target state, retaining life stage and time course. More care for one target does not automatically mean less care for another, and the target alone does not diagnose suppression.",
      fi: "Hoivalla on määrä, kohde ja kontaktihistoria. Prolaktiini–kisspeptiini-kokeet paikantavat lisääntymisakselin jarrua, kun taas prolaktiinille herkkä MPOA–VTA-piiri tukee poikaskontaktia. Eri vastaanottavat piirit mahdollistavat lisääntymisen suppression ja säilyvän hoivan rinnakkaisuuden. BERM yhdistää komponenttitulokset yhteisen signaalin ja kohdetilan kautta säilyttäen elämänvaiheen ja aikakulun. Yhteen kohteeseen lisääntynyt hoiva ei automaattisesti vähennä toista, eikä kohde yksin diagnosoi suppressiota.",
    },
    studyIds: [], regulationStudyIds: ["study.sonigo2012", "study.clarkson2026", "study.gettler2013"],
    claimIds: ["claim.reproduction.caregiving-allocation"], links: [regulationLink],
  },
  DEMAND_OPPORTUNITY: {
    description: {
      en: "The model retains this stable node ID for realised reproductive encounters and attempts. State-conditioned behaviour meets external opportunity and the other person's response. The event composition includes both pregnancy-intention and no-intention strata; zero intention does not imply zero births. Conception and survival to live birth are conditioned on the actual encounter and capacity rather than on a universal independent multiplier. This structural refinement adds no calibrated TFR coefficient.",
      fi: "Malli säilyttää tämän pysyvän solmutunnisteen toteutuville lisääntymiselle altistaville kohtaamisille ja yrityksille. Tilariippuvainen käyttäytyminen kohtaa ulkoiset mahdollisuudet ja toisen vasteen. Tapahtumien koostaminen sisältää sekä raskausaikomuksen että sen puuttumisen ositteet; nolla aikomusta ei tarkoita nollaa syntymää. Hedelmöittyminen ja elävänä syntymiseen selviytyminen ehdollistetaan toteutuneelle kohtaamiselle ja kapasiteetille yleisen riippumattoman kertoimen sijaan. Rakenteellinen tarkennus ei lisää kalibroitua TFR-kerrointa.",
    },
    studyIds: [], regulationStudyIds: ["study.gettler2013", "study.lei_south2021"],
    claimIds: ["claim.behavior.behaviour-to-opportunity"], links: [regulationLink],
  },
};

export function getCanonicalCalibrationLabel(nodeId: string, locale: string): string {
  const node = GRAPH.nodes[nodeId];
  if (!node) return "";
  const labels = CALIBRATION_LABELS[node.calibration_status];
  return labels?.[locale as keyof LocalizedStatus] ?? labels?.en ?? node.calibration_status.replaceAll("_", " ");
}

export function getCanonicalNodeLabel(nodeId: string, locale: string): string {
  const node = GRAPH.nodes[nodeId];
  return node?.label[locale as keyof typeof node.label] ?? node?.label.en ?? nodeId;
}

export function getCanonicalNodeDescription(nodeId: string, locale: string): string {
  const node = GRAPH.nodes[nodeId];
  return node ? mechanism(node, locale === "fi" ? "fi" : "en") : "";
}

function nodeReferences(nodeId: string): ChainNode["keyReferences"] {
  const supplement = CANONICAL_NODE_SUPPLEMENTS[nodeId];
  const steroidReferences = (supplement?.studyIds ?? []).map((studyId) => {
    const study = STEROIDOGENESIS.studies.find(item => item.id === studyId);
    if (!study) throw new Error(`Unregistered diagram study: ${studyId}`);
    const reference = indexedReference(study.referenceId);
    if (!reference) throw new Error(`Unregistered diagram reference: ${study.referenceId}`);
    const isField = study.evidenceKind === "field_experiment";
    return {
      referenceId: study.referenceId,
      authors: `${reference.authors} (${reference.year})`,
      title: reference.title,
      journal: reference.journal ?? "",
      keyFinding: `${isField ? "Kenttäkoe" : "Komponenttikoe"}: ${study.finding.fi ?? study.finding.en} ${study.scope.fi ?? study.scope.en}`,
      keyFinding_en: `${isField ? "Field experiment" : "Component experiment"}: ${study.finding.en} ${study.scope.en}`,
    };
  });
  const regulationReferences = (supplement?.regulationStudyIds ?? []).map(studyId => {
    const study = REPRODUCTIVE_REGULATION.studies.find(item => item.id === studyId);
    if (!study) throw new Error(`Unregistered reproductive diagram study: ${studyId}`);
    const reference = indexedReference(study.referenceId);
    if (!reference) throw new Error(`Unregistered diagram reference: ${study.referenceId}`);
    const observational = study.evidenceKind === "observational";
    return {
      referenceId: study.referenceId, authors: `${reference.authors} (${reference.year})`,
      title: reference.title, journal: reference.journal ?? "",
      keyFinding: `${observational ? "Havaintotutkimus" : "Komponenttikoe"}: ${study.finding.fi} ${study.scope.fi}`,
      keyFinding_en: `${observational ? "Observational study" : "Component experiment"}: ${study.finding.en} ${study.scope.en}`,
    };
  });
  return [...steroidReferences, ...regulationReferences];
}

function levelByNode(): Map<string, number> {
  const result = new Map<string, number>();
  for (const group of Object.values(GRAPH.ui_groups)) {
    for (const nodeId of group.contains) result.set(nodeId, group.ui_level + 1);
  }
  return result;
}

function epistemicLevel(node: CausalGraphNode): EpistemicLevel {
  if (node.id === "LINDGREN_METRIC_DRIVE") return "L1";
  if (node.calibration_status === "observed_wpp_anchor") return "E";
  if (node.calibration_status === "structural_only") return "M";
  if (node.calibration_status === "requires_external_measurement") return "C";
  return "L*";
}

function mechanism(node: CausalGraphNode, locale: "en" | "fi"): string {
  const supplement = CANONICAL_NODE_SUPPLEMENTS[node.id];
  if (supplement) return supplement.description[locale];
  const status = getCanonicalCalibrationLabel(node.id, locale);
  if (node.id === "BERM_L2_BRIDGE") {
    return locale === "fi"
      ? "BERM johtaa formaalin operaattorin ehdolla, että materia kytkeytyy metriikkaan ja kudos noudattaa vastefunktiota. Kudosytimet, mittakaava ja ihmispäätepisteiden kalibraatio ovat avoimia; jatkohaarat eivät ole Lindgrenistä johdettua biologiaa."
      : "BERM derives the formal operator conditional on matter-metric coupling and tissue response theory. Tissue kernels, scale and human-endpoint calibration remain open; downstream branches are not Lindgren-derived biology.";
  }
  if (node.id === "LINDGREN_METRIC_DRIVE") {
    return locale === "fi"
      ? "Vuoden 2025 Lindgren-premissistä g = η + κ A⊗A ja jaosta A = A₀ + a seuraa Δg = κ(A₀⊗a + a⊗A₀ + a⊗a). Tämä on geometrinen seuraus ilmoitetusta premissistä. Geometriasta kudoksen havaittavaan vasteeseen tarvitaan BERM:n erillinen ehdollinen L2-operaattori."
      : "The 2025 Lindgren premise g = η + κ A⊗A with A = A₀ + a gives Δg = κ(A₀⊗a + a⊗A₀ + a⊗a). This is a geometric consequence of the stated premise. A tissue observable additionally requires BERM's separate conditional L2 response operator.";
  }
  const roles: Record<string, DiagramText> = {
    input: { en: "input", fi: "syöte" },
    intermediate: { en: "intermediate", fi: "välivaihe" },
    output: { en: "output", fi: "tulos" },
    terminal: { en: "endpoint", fi: "päätepiste" },
  };
  const role = roles[node.prediction_role]?.[locale] ?? node.prediction_role;
  return locale === "fi"
    ? `Kanoninen BERM-solmu. Kalibrointitila: ${status}. Mallin laskennallinen rooli: ${role}. Kalibrointitila kuvaa kertoimien tunnistamista, ei solmun tutkimusnäytön puuttumista.`
    : `Canonical BERM node. Calibration status: ${status}. Computational role: ${role}. Calibration status describes coefficient identification, not the absence of research evidence for the node.`;
}

function edgeLabel(edge: CausalGraphEdge, locale: "en" | "fi"): string {
  if (edge.kind === "inference_input") return locale === "fi" ? "päättelysyöte" : "inference input";
  if (edge.kind === "derived_geometry") return locale === "fi" ? "johdettu geometria" : "derived geometry";
  if (edge.kind === "conditional_response") return locale === "fi" ? "ehdollinen vaste" : "conditional response";
  return locale === "fi" ? "BERM-kausaalireuna" : "BERM causal edge";
}

const levels = levelByNode();

function nodeView(node: CausalGraphNode): ChainNode {
  const en = node.label.en ?? node.id;
  const fi = node.label.fi ?? en;
  return {
    id: node.id,
    level: levels.get(node.id) ?? 1,
    label: fi,
    label_en: en,
    sublabel: getCanonicalCalibrationLabel(node.id, "fi"),
    sublabel_en: getCanonicalCalibrationLabel(node.id, "en"),
    epistemicLevel: epistemicLevel(node),
    title: fi,
    title_en: en,
    mechanism: mechanism(node, "fi"),
    mechanism_en: mechanism(node, "en"),
    quantitative:
      node.id === "BERM_L2_BRIDGE"
        ? "δ⟨Oᵢ⟩ = ∫Ξᵢ^{μν} δgμν + O(δg²)  [EHDOLLINEN; Ξ AVOIN]"
        : undefined,
    quantitative_en:
      node.id === "BERM_L2_BRIDGE"
        ? "δ⟨Oᵢ⟩ = ∫Ξᵢ^{μν} δgμν + O(δg²)  [CONDITIONAL; Ξ OPEN]"
        : undefined,
    keyReferences: nodeReferences(node.id),
    falsificationCondition:
      node.id === "BERM_L2_BRIDGE"
        ? "Ehdotettu operaattori on hylättävä tai korjattava, jos kohdistettu data ei vastaa sen esirekisteröityjä ennusteita."
        : undefined,
    falsificationCondition_en:
      node.id === "BERM_L2_BRIDGE"
        ? "Reject or revise a proposed operator when matched data fail its preregistered predictions."
        : undefined,
  };
}

export const CANONICAL_CAUSAL_NODES: ChainNode[] = Object.values(GRAPH.nodes).map(nodeView);

export const CANONICAL_CAUSAL_EDGES: ChainEdge[] = GRAPH.edges.map((edge) => ({
  from: edge.from,
  to: edge.to,
  label: edgeLabel(edge, "fi"),
  label_en: edgeLabel(edge, "en"),
  epistemicLevel: edge.kind === "derived_geometry" ? "L" : edge.kind === "causal_model" ? "M" : "L*",
  priority: edge.kind === "causal_model" ? "secondary" : "primary",
}));

export function getCanonicalLevelTitle(level: number, locale: string): string {
  const language = locale === "fi" ? "fi" : "en";
  return LEVEL_TITLES[language][level] ?? `Level ${level}`;
}

export const CANONICAL_CAUSAL_GRAPH_VERSION = GRAPH.version;
