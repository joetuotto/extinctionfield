import { NODES, EDGES, type CausalMapNode, type BilingualText, type Locale, type NodeDetail, type EpistemicLevel } from "./causalAtlasRegistry";
import { INTERVENTIONS, getIntervention } from "./interventions";
export * from "./causalAtlasRegistry";
export { LEVEL_LABELS } from "./causalMapData";
export const t = (text: BilingualText, lang: Locale): string => text[lang];
export const localizedDetail = (detail: NodeDetail | undefined, lang: Locale) => detail?.[lang];

export type Stage = "foundations" | "sources" | "modulation" | "mechanisms" | "tissue" | "disease" | "demographic" | "civilization" | "measurement" | "ecology";
export const LEVEL_TO_STAGE: Record<number, Stage> = { [-2]: "foundations", [-1]: "sources", 0: "sources", 1: "modulation", 2: "mechanisms", 3: "tissue", 4: "disease", 5: "demographic", 6: "ecology", 7: "civilization", 8: "measurement" };
export interface StageBand { id: Stage; label: BilingualText; color: string; accent: string }
function band(id: Stage, en: string, fi: string, accent: string): StageBand { return { id, label: { en, fi }, accent, color: `${accent}10` }; }
export const STAGE_BANDS: StageBand[] = [
  band("foundations", "Premises & bridges", "Premissit ja sillat", "#A78BFA"),
  band("sources", "Physical inputs", "Fysikaaliset syötteet", "#38BDF8"),
  band("measurement", "Measurement & evidence", "Mittaus ja havainnot", "#94A3B8"),
  band("modulation", "Response modifiers", "Vastetta muuntavat tekijät", "#C084FC"),
  band("mechanisms", "Cell mechanisms", "Solumekanismit", "#60A5FA"),
  band("tissue", "Organs & coordination", "Elimet ja koordinaatio", "#FBBF24"),
  band("disease", "Health outcomes", "Terveystulokset", "#FB7185"),
  band("demographic", "Reproduction & population", "Lisääntyminen ja väestö", "#F472B6"),
  band("civilization", "Behaviour & society", "Käyttäytyminen ja yhteiskunta", "#FB923C"),
];
export const ECOLOGY_BAND = band("ecology", "Ecology & evolution", "Ekologia ja evoluutio", "#4ADE80");
export const ALL_STAGES = [...STAGE_BANDS, ECOLOGY_BAND];
export const NODE_ORDER = Object.fromEntries(ALL_STAGES.map(s => [s.id, NODES.filter(n => LEVEL_TO_STAGE[n.level] === s.id).map(n => n.id)])) as Record<Stage, string[]>;
export const NODE_DIMENSIONS = { w: 210, h: 92 };
export function computeLayout(nodes: readonly CausalMapNode[] = NODES): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  let column = 0;
  for (const stage of ALL_STAGES) {
    const members = nodes.filter(n => LEVEL_TO_STAGE[n.level] === stage.id);
    if (!members.length) continue;
    members.forEach((node, i) => { positions[node.id] = { x: (column + Math.floor(i / 12)) * 260, y: 55 + (i % 12) * 110 }; });
    column += Math.ceil(members.length / 12);
  }
  return positions;
}
export interface BandRect { stage: Stage; x: number; y: number; width: number; height: number; band: StageBand }
export function computeBands(nodes: readonly CausalMapNode[] = NODES): BandRect[] {
  const positions = computeLayout(nodes);
  return ALL_STAGES.flatMap(stage => {
    const members = nodes.filter(n => LEVEL_TO_STAGE[n.level] === stage.id);
    return members.length ? [{ stage: stage.id, x: positions[members[0].id].x - 15, y: 0, width: Math.ceil(members.length / 12) * 260 - 20, height: Math.min(members.length, 12) * 110 + 55, band: stage }] : [];
  });
}

export type AtlasId = "all" | "physics" | "cell" | "health" | "reproduction" | "society" | "ecology";
export interface SubAtlas { id: AtlasId; title: BilingualText; description: BilingualText; stages: Stage[]; anchors: string[] }
export const SUBATLASES: SubAtlas[] = [
  { id: "all", title: { en: "Complete atlas", fi: "Koko atlas" }, description: { en: "Every identified channel in one shared graph. Select a subatlas to examine a smaller part; shared nodes connect the views.", fi: "Kaikki tunnistetut kanavat yhdessä kartassa. Valitse aliatlas tarkastellaksesi pienempää osaa; yhteiset solmut yhdistävät näkymät." }, stages: ALL_STAGES.map(s => s.id), anchors: [] },
  { id: "physics", title: { en: "Physics & measurement", fi: "Fysiikka ja mittaus" }, description: { en: "BERM proposes routes from the 2025 premise and tensor derivation to physical inputs and receiver mechanisms. The L2 operator is conditional; gauge, scale, tissue kernels and endpoint calibration remain open. Measurement inference is shown separately.", fi: "BERM ehdottaa reittejä vuoden 2025 premissistä ja tensorijohdosta fysikaalisiin syötteisiin ja vastaanotinmekanismeihin. L2-operaattori on ehdollinen; gauge, mittakaava, kudosytimet ja päätepistekalibrointi ovat avoimia. Mittauspäättely näkyy erikseen." }, stages: ["foundations", "sources", "measurement"], anchors: ["mod_geometry", "mod_ion", "mech_catsper_nav", "dkc_overlap", "mod_state_response_window", "mech_ipr_bound_ion", "mech_vgcc_ros", "mech_cry_melatonin"] },
  { id: "cell", title: { en: "Cells & response modifiers", fi: "Solut ja vastemuuntimet" }, description: { en: "Receiver state, ion channels, redox, cellular memory, nutrition and the modulome. Modifiers alter a response; they are not necessarily successive steps.", fi: "Vastaanotintila, ionikanavat, redox, solumuisti, ravitsemus ja modulomi. Muuntimet muuttavat vastetta; ne eivät välttämättä ole peräkkäisiä askelia." }, stages: ["modulation", "mechanisms"], anchors: ["berm_l2_bridge", "optical_light", "tissue_bystander_message", "tissue_macrophage", "tissue_organ_memory", "hormone_target"] },
  { id: "health", title: { en: "Organs & health", fi: "Elimet ja terveys" }, description: { en: "Organ-specific timing, barriers, endocrine and neural routes to health outcomes. Endpoint evidence retains its own scope.", fi: "Elinkohtainen ajoitus, kudosesteet sekä hormonaaliset ja hermostolliset reitit terveystuloksiin. Päätepistenäytöllä säilyy oma rajauksensa." }, stages: ["tissue", "disease"], anchors: ["berm_l2_bridge", "mech_vgcc_ros", "mech_cry_melatonin", "receptor_memory", "circadian_coordination", "mech_ca_compartment_cycle", "mech_autonomic_hrv", "mech_gain_recovery", "vmem_mtor", "mech_ttype_bifurcation", "mech_gaba_kcc2", "mech_mast_immune", "mech_trpc1_sting", "mod_cell_history"] },
  { id: "reproduction", title: { en: "Reproduction & demography", fi: "Lisääntyminen ja demografia" }, description: { en: "Motivation, opportunity and realised encounters join reserve and physiological-capacity branches before age-specific fertility and TFR; caregiving returns through social contact. Alternative aggregations are not additive pathways.", fi: "Motivaatio, mahdollisuudet ja toteutuvat kohtaamiset yhdistyvät reservi- ja kapasiteettihaaroihin ennen ikäkohtaista hedelmällisyyttä ja TFR:ää; hoiva palaa sosiaalisen kontaktin kautta. Vaihtoehtoisia aggregointeja ei lasketa yhteen." }, stages: ["demographic"], anchors: ["individual_behavioral_response", "caregiving_allocation", "reproductive_opportunity", "berm_l2_bridge", "mech_vgcc_ros", "mech_cry_melatonin", "receptor_memory", "circadian_coordination", "hormone_target", "vmem_mtor", "developmental_memory", "hpa_hpg", "microbiome_oxytocin", "tissue_melatonin", "tissue_testosterone", "tissue_sperm", "tissue_ovarian", "tissue_btb", "barrier_placenta", "male_reserve", "male_steroidogenesis", "androgen_binding_availability", "androgen_receptor_signal", "ovarian_reserve", "oocyte_redox", "ovulation_clock", "implantation", "tissue_organ_memory", "tissue_fertilization_gates", "disease_fertility", "mech_catsper_nav"] },
  { id: "society", title: { en: "Behaviour & society", fi: "Käyttäytyminen ja yhteiskunta" }, description: { en: "Hormone and neural state → behaviour distributions → pairing and collective action → institutions and environmental feedback. These are conditional syntheses, not calibrated field-to-politics predictions.", fi: "Hormoni- ja hermostotila → käyttäytymisjakaumat → parinmuodostus ja yhteistoiminta → instituutiot ja ympäristöpalaute. Nämä ovat ehdollisia synteesejä, eivät kalibroituja kentästä politiikkaan ulottuvia ennusteita." }, stages: ["civilization"], anchors: ["reproductive_opportunity", "caregiving_allocation", "hpa_hpg", "hormone_target", "microbiome_oxytocin", "circadian_coordination", "tissue_testosterone", "tissue_cortisol", "disease_depression", "disease_metabolic", "demo_behavior", "demand_opportunity", "tempo", "demo_tfr", "legacy_proxy", "physical_state"] },
  { id: "ecology", title: { en: "Ecology & evolution", fi: "Ekologia ja evoluutio" }, description: { en: "Sensing, encounters, host–parasite interactions, pollination and selection. Population sorting, plasticity and heritable evolution remain separate endpoints.", fi: "Aistiminen, kohtaamiset, isäntä–loissuhteet, pölytys ja valinta. Populaation lajittuminen, plastisuus ja periytyvä evoluutio ovat erillisiä päätepisteitä." }, stages: ["ecology"], anchors: ["ch_static", "ch_elf", "ch_if", "ch_rf", "solar_geomag", "optical_light", "physical_state", "berm_l2_bridge", "mech_cry_melatonin"] },
];
export function nodesForAtlas(id: AtlasId): CausalMapNode[] {
  const atlas = SUBATLASES.find(a => a.id === id) ?? SUBATLASES[0];
  return NODES.filter(n => atlas.stages.includes(LEVEL_TO_STAGE[n.level]) || atlas.anchors.includes(n.id) || n.subatlases?.includes(id));
}
export function atlasesForNode(id: string): SubAtlas[] { return SUBATLASES.filter(a => a.id !== "all" && nodesForAtlas(a.id).some(n => n.id === id)); }
/** Cross-subatlas lens over the shared graph, not an additional subatlas. */
export function nodesForIntervention(profileId: string): CausalMapNode[] {
  const profiles = profileId === "all" ? INTERVENTIONS.profiles : [getIntervention(profileId)].filter(profile => profile !== undefined);
  if (!profiles.length) return [];
  const ids = new Set(["lindgren_2025", "metric_perturbation", "berm_l2_bridge", ...profiles.flatMap(profile => profile.atlasNodeIds)]);
  return NODES.filter(node => ids.has(node.id));
}
export function filterAtlasNodes(nodes: readonly CausalMapNode[], query: string, stage: Stage | "all" = "all", evidence: EpistemicLevel | "all" = "all") {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return nodes.filter(n => {
    if (stage !== "all" && LEVEL_TO_STAGE[n.level] !== stage) return false;
    if (evidence !== "all" && n.epistemicLevel !== evidence) return false;
    const text = [n.id, n.label.en, n.label.fi, n.sublabel?.en, n.sublabel?.fi, n.detail?.en.mechanism, n.detail?.fi.mechanism, n.detail?.bermPathway, ...(n.modelIds ?? []), ...(n.searchAliases ?? [])].join(" ").toLocaleLowerCase();
    return words.every(w => text.includes(w));
  });
}
export interface GuidedScene { id: string; title: BilingualText; description: BilingualText; nodes: string[]; edges: string[] }
export const GUIDED_SCENES: GuidedScene[] = SUBATLASES.filter(a => a.id !== "all").map(a => {
  const nodes = nodesForAtlas(a.id).map(n => n.id);
  return { id: a.id, title: a.title, description: a.description, nodes, edges: EDGES.filter(e => nodes.includes(e.from) && nodes.includes(e.to)).map(e => `${e.from}->${e.to}`) };
});
export interface StepperPath { atlasId: AtlasId; label: BilingualText; ids: readonly string[] }
export const STEPPER_PATHS: Record<string, StepperPath> = {
  physics: { atlasId: "physics", label: { en: "Premise → conditional response", fi: "Premissi → ehdollinen vaste" }, ids: ["lindgren_2025", "metric_perturbation", "berm_l2_bridge", "mech_vgcc_ros"] },
  cell: { atlasId: "cell", label: { en: "Receiver memory → tissue timing", fi: "Vastaanotinmuisti → kudosajoitus" }, ids: ["berm_l2_bridge", "mech_cry_melatonin", "receptor_memory", "circadian_coordination", "hormone_target"] },
  society: { atlasId: "society", label: { en: "Biology → institutions → feedback", fi: "Biologia → instituutiot → palaute" }, ids: ["hpa_hpg", "civil_neural_behavior", "civil_strategy_distribution", "civil_collective_institutions", "civil_social_transmission", "civil_environment_feedback", "legacy_proxy"] },
  main: { atlasId: "reproduction", label: { en: "Fertility pathway", fi: "Hedelmällisyyspolku" }, ids: ["berm_l2_bridge", "mech_vgcc_ros", "tissue_sperm", "demo_biocap", "demo_asfr", "demo_tfr"] },
  sleep: { atlasId: "health", label: { en: "Circadian route", fi: "Vuorokausireitti" }, ids: ["berm_l2_bridge", "mech_cry_melatonin", "tissue_melatonin", "disease_sleep"] },
  ecology: { atlasId: "ecology", label: { en: "Ecological selection", fi: "Ekologinen valinta" }, ids: ["berm_l2_bridge", "eco_encounter", "eco_selection", "eco_traits"] },
};
export type StepperPathKey = keyof typeof STEPPER_PATHS;
