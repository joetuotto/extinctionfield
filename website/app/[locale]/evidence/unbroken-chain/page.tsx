import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

type ChainCitation = {
  referenceId: string;
  labels: readonly string[];
};

// Each citation is tied to a specific logical chain row and a stable registry ID.
// Labels are presentation-only exact spans; they are never used to resolve a source.
const CHAIN_ROW_CITATIONS: Readonly<Record<number, readonly ChainCitation[]>> = {
  0: [
    { referenceId: "lindgren2025", labels: ["Lindgren 2025", "Lindgren"] },
    { referenceId: "vassallo2025", labels: ["Vassallo"] },
  ],
  1: [{ referenceId: "tang2024", labels: ["Tang 2024"] }],
  2: [
    { referenceId: "panagopoulos2025_ifo", labels: ["Panagopoulos 2025"] },
    { referenceId: "trus2024", labels: ["Trus 2024"] },
  ],
  3: [{ referenceId: "marchetti2013_heavy_metal", labels: ["Marchetti 2013"] }],
  5: [{ referenceId: "frontiers2021_neurotransmitters", labels: ["900 MHz"] }],
  6: [
    { referenceId: "enger2023_csd_initiation", labels: ["CaV + NMDA"] },
    { referenceId: "bhatt2012_camkii_csd", labels: ["CaMKII inhibition", "CaMKII-inhibitio", "CaMKII阻害", "inhibition CaMKII", "inhibition de CaMKII", "CaMKII 억제"] },
  ],
  7: [{ referenceId: "sun2016_elf_vgcc", labels: ["Sun 2016"] }],
  8: [{ referenceId: "varro2009_seizure", labels: ["Varró 2009"] }],
  9: [{ referenceId: "neonatal_gaba", labels: ["PMC7847733"] }],
  10: [
    { referenceId: "lopez_martin_2006", labels: ["López-Martín 2006"] },
    { referenceId: "lopez_martin_2009", labels: ["2009"] },
  ],
  11: [
    { referenceId: "sudep_critical_2023", labels: ["CACNA1A"] },
    { referenceId: "aiba_noebels_2015", labels: ["L-type Ca²⁺ antagonist", "L-type VGCC antagonist", "L-tyypin Ca²⁺-ant.", "L-tyypin VGCC-antagonisti", "L型Ca²⁺拮抗薬", "L型VGCC拮抗薬", "antagoniste Ca²⁺ de type L", "antagoniste VGCC de type L", "L형 Ca²⁺ 길항제", "L형 VGCC 길항제"] },
  ],
  12: [{ referenceId: "intechopen2020_melatonin_heart", labels: ["Pinealectomy", "Pinealektomia", "松果体摘出", "Pinéalectomie", "pinéalectomie", "송과선 절제"] }],
  13: [
    { referenceId: "kunz2008_pgc_insomnia", labels: ["r=0.569", "r=0,569"] },
    { referenceId: "mahlberg2006_pgc_ad", labels: ["76% vs 64%", "76 % vs 64 %"] },
  ],
  14: [{ referenceId: "dell2022_sleep_seizure", labels: ["23-62"] }],
  15: [{ referenceId: "chen2024_prenatal", labels: ["Sevoflurane", "sevoflurane", "Sevofluraani", "sevofluraani", "セボフルラン", "Sévoflurane", "sévoflurane", "세보플루란"] }],
  17: [
    { referenceId: "klimentidis2010", labels: ["Klimentidis"] },
    { referenceId: "mazur2013", labels: ["Mazur"] },
  ],
  18: [
    { referenceId: "bbb_emf_2026", labels: ["PMC12829706"] },
    { referenceId: "melatonin_bbb_protection", labels: ["PMC6932927"] },
  ],
  19: [
    { referenceId: "bat_5g_prdm16", labels: ["PMC11942954"] },
    { referenceId: "klimentidis2010", labels: ["Klimentidis", "Klimentidiksen"] },
  ],
  20: [
    { referenceId: "klimek2023_hpa", labels: ["Klimek 2023"] },
    { referenceId: "rf_hpa_stress_2026", labels: ["Frontiers 2026"] },
  ],
  21: [
    { referenceId: "betacell_efield", labels: ["PMID:32323041"] },
    { referenceId: "cavg4_camkii_mafa", labels: ["PMC9030882"] },
  ],
  22: [{ referenceId: "kim2019_hypothalamus", labels: ["Kim 2019"] }],
  23: [
    { referenceId: "sapolsky2009_cortisol", labels: ["Sapolsky 2009"] },
    { referenceId: "cortisol_ad_2026", labels: ["Frontiers 2026"] },
  ],
  24: [{ referenceId: "mazur2013", labels: ["Mazur"] }],
  25: [
    { referenceId: "johansson2000_mast", labels: ["Johansson 2000"] },
    { referenceId: "mast_cell_cardiac", labels: ["PMC6896164"] },
  ],
  26: [
    { referenceId: "catsper_2021", labels: ["2100 MHz"] },
    { referenceId: "sperm_meta_2024", labels: ["Environ Int 2024"] },
  ],
  27: [{ referenceId: "scn_ca_oscillation", labels: ["PMC6170461"] }],
  28: [
    { referenceId: "berridge_wanting", labels: ["Berridge"] },
    { referenceId: "inflam_da_2022", labels: ["PMC9718669"] },
  ],
  29: [
    { referenceId: "opc_cav12_2019", labels: ["PMC6916379"] },
    { referenceId: "smf_opc_2017", labels: ["Sci Rep 2017"] },
  ],
  30: [
    { referenceId: "nk_ca_2024", labels: ["PLoS ONE 2024"] },
    { referenceId: "nk_elf_suppress", labels: ["50 Hz ELF"] },
    { referenceId: "ttfields_nk_2024", labels: ["200 kHz TTFields"] },
  ],
  31: [
    { referenceId: "gnih_stress", labels: ["PMC5380668"] },
    { referenceId: "rf9_cortisol_2021", labels: ["PMC7946976"] },
  ],
  32: [
    { referenceId: "bdnf_rf_2023", labels: ["PMC10275548"] },
    { referenceId: "bdnf_elf_up_2017", labels: ["PMC5702423"] },
  ],
  33: [{ referenceId: "gut_per2_2026", labels: ["PMC12631932"] }],
  34: [
    { referenceId: "leproult2011_testosterone_sleep", labels: ["JAMA 2011"] },
    { referenceId: "sleep_t_meta_2021", labels: ["PMID:34801825"] },
  ],
  35: [
    { referenceId: "lte_thyroid_2024", labels: ["PMC11507962"] },
    { referenceId: "elf_thyroid_2022", labels: ["PMID:35963949"] },
  ],
  36: [
    { referenceId: "epigen_endo_2024", labels: ["ScienceDirect 2024"] },
    { referenceId: "gc2_methylation", labels: ["PMC4538330"] },
  ],
  37: [
    { referenceId: "telomere_ros", labels: ["PMID:36582083"] },
    { referenceId: "mel_telomerase", labels: ["Front Aging Neurosci 2022"] },
  ],
  38: [
    { referenceId: "oxt_vgcc", labels: ["PMC3197583"] },
    { referenceId: "oxt_ca_pvn", labels: ["eNeuro 2025"] },
  ],
  39: [
    { referenceId: "a2d1_pain", labels: ["PMID:16764990"] },
    { referenceId: "a2d1_injury", labels: ["Br J Pharmacol 2018"] },
  ],
  40: [
    { referenceId: "asd_nkcc1_2025", labels: ["Front Psychiatry 2025"] },
    { referenceId: "a2d_network", labels: ["CACNA2D3"] },
  ],
  41: [
    { referenceId: "adhd_pfc_delay", labels: ["Shaw 2007"] },
    { referenceId: "adhd_goldilocks", labels: ["Arnsten 2009"] },
  ],
  42: [
    { referenceId: "iarc_2a_shift", labels: ["IARC Monograph 98 2010", "IARC"] },
    { referenceId: "shift_breast", labels: ["OR 2.34", "OR 2,34"] },
    { referenceId: "mel_antitumor", labels: ["Reiter 2017"] },
  ],
  43: [
    { referenceId: "verap_t1d_jama", labels: ["Forlenza JAMA 2023"] },
    { referenceId: "verap_t1d_natmed", labels: ["Ovalle Nat Med 2018"] },
  ],
  44: [
    { referenceId: "nifed_tocolytic", labels: ["Cochrane 2014", "Cochrane"] },
    { referenceId: "p4_cav12", labels: ["PMC3816733"] },
  ],
  45: [{ referenceId: "als_ca_vuln", labels: ["PMC4452055"] }],
  46: [
    { referenceId: "gut_5ht_90", labels: ["Cell Host Microbe"] },
    { referenceId: "trp_gut_brain", labels: ["PMC7231603"] },
  ],
  47: [
    { referenceId: "mast_ca_deg", labels: ["ScienceDirect 2011"] },
    { referenceId: "env_estrogen_mast", labels: ["env estrogens", "environmental estrogens", "ympäristöestrogeenit", "環境エストロゲン", "estrogènes environnementaux", "환경 에스트로겐"] },
  ],
  48: [{ referenceId: "preecl_cav12", labels: ["PMC9774363"] }],
  49: [
    { referenceId: "bone_ca_channels", labels: ["Frontiers Endocrinol 2024"] },
    { referenceId: "pemf_bone", labels: ["PMC11919207"] },
    { referenceId: "lindgren2025", labels: ["Lindgren"] },
  ],
  50: [
    { referenceId: "vdh_lvscc", labels: ["J Neurosci 2001"] },
    { referenceId: "vdr_cav_silence", labels: ["PLoS ONE 2011"] },
    { referenceId: "vd_pfc_schiz", labels: ["Transl Psychiatry 2019"] },
  ],
  51: [
    { referenceId: "catsper_review", labels: ["RBMO 2014"] },
    { referenceId: "catsper-temp-2025", labels: ["Nature Comms 2025"] },
    { referenceId: "catsper_human", labels: ["JCI 2024"] },
  ],
  52: [
    { referenceId: "psilo_5ht2a_ca", labels: ["Trends Pharmacol Sci 2025"] },
    { referenceId: "psilo_intra", labels: ["Science 2023"] },
    { referenceId: "psilo_plast", labels: ["Mol Psychiatry 2025"] },
  ],
  53: [
    { referenceId: "caffeine_pd", labels: ["Frontiers Neurosci 2020"] },
    { referenceId: "caffeine_mptp", labels: ["PMID:11319241"] },
    { referenceId: "caffeine_a2a_neuro", labels: ["J Neurol Sci 2016"] },
  ],
  54: [
    { referenceId: "li_dementia", labels: ["Int J Bipolar Disord 2024"] },
    { referenceId: "li_suicide", labels: ["Br J Psychiatry 2020"] },
    { referenceId: "li_usa_county", labels: ["ScienceDirect 2026"] },
  ],
  55: [
    { referenceId: "amygdala_cort", labels: ["PNAS 2008"] },
    { referenceId: "amyg_v_hippo_review", labels: ["PLoS ONE 2012"] },
    { referenceId: "amygdala_persist", labels: ["Neurosci Lett 2023"] },
  ],
  56: [
    { referenceId: "amish_health_stat", labels: ["STAT 2025"] },
    { referenceId: "amish_review", labels: ["Anderson & Potts 2022"] },
    { referenceId: "klimentidis2010", labels: ["Klimentidis"] },
    { referenceId: "mazur2013", labels: ["Mazur"] },
  ],
};

function ChainCitationText({
  text,
  rowIndex,
  locale,
}: {
  text: string;
  rowIndex: number;
  locale: string;
}) {
  const matches = (CHAIN_ROW_CITATIONS[rowIndex] ?? [])
    .flatMap((citation) =>
      citation.labels.flatMap((label) => {
        const occurrences = [];
        let cursor = 0;

        while (cursor < text.length) {
          const start = text.indexOf(label, cursor);
          if (start === -1) break;
          occurrences.push({ start, end: start + label.length, citation, label });
          cursor = start + label.length;
        }

        return occurrences;
      }),
    )
    .sort((a, b) => a.start - b.start || b.label.length - a.label.length)
    .filter((match, index, all) => !all.slice(0, index).some((prior) => prior.end > match.start));

  if (matches.length === 0) return text;

  const parts = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    if (match.start > cursor) {
      parts.push(<Fragment key={`text-${index}`}>{text.slice(cursor, match.start)}</Fragment>);
    }
    parts.push(
      <StudyCitation
        key={`${match.citation.referenceId}-${match.start}`}
        referenceId={match.citation.referenceId}
        locale={locale}
        label={match.label}
        className="font-medium text-accent decoration-dotted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
      />,
    );
    cursor = match.end;
  });

  if (cursor < text.length) {
    parts.push(<Fragment key="text-end">{text.slice(cursor)}</Fragment>);
  }

  return parts;
}

const COPY = {
  en: {
    title: "The Unbroken Chain: Photon → Population",
    subtitle:
      "Iterative convergence verification tested 57 scales of BERM's mechanistic chain across 47 verified layers (VK1–VK31, VK41–VK56). Result: 17 positive feedback loops forming a self-amplifying network, from photon absorption to population-level effects, with unexpected empirical content at every layer.",
    backLink: "← Back to Evidence",

    cautionText:
      "This page presents a systematic verification of BERM's mechanistic chain across physical scales. Each link has been tested against published experimental evidence. The chain is as strong as its weakest link — partial confirmations and untested predictions are explicitly marked.",

    chainTitle: "The verified continuum",
    chainLead:
      "BERM proposes a continuous causal chain from photon absorption to population-level health effects. Each intermediate layer has been independently verified against published experimental and clinical evidence.",
    chainRows: [
      { scale: "10⁻¹⁵ m", link: "Photon → metric distortion", evidence: "Lindgren 2025 χ-parameter, Vassallo confirmation", status: "confirmed", detail: "EMF photon creates metric distortion at the quantum level. Lindgren's χ-parameter provides the physics-level mechanism for why biological tissue responds to non-thermal EMF." },
      { scale: "10⁻¹⁰ m", link: "Metric → S4 voltage sensor", evidence: "Tang 2024 Nature Communications", status: "confirmed", detail: "Metric distortion acts on the S4 helix voltage sensor of VGCCs. Tang 2024 demonstrated direct S4 conformational change from EMF at non-thermal intensities." },
      { scale: "10⁻⁹ m", link: "S4 → VGCC opens", evidence: "Panagopoulos 2025 IFO, Trus 2024 non-ionotropic", status: "confirmed", detail: "S4 conformational change triggers VGCC gating. Panagopoulos 2025 provides the mechanistic model; Trus 2024 demonstrates non-ionotropic (non-thermal) activation pathway." },
      { scale: "10⁻⁹ m", link: "VGCC → Ca²⁺ + Pb²⁺/Cd²⁺ permeation", evidence: "Marchetti 2013, Cd→Cav3.1 radiolabeled", status: "confirmed", detail: "Open VGCCs allow Ca²⁺ influx — but also toxic metals. Cd²⁺ permeates through Cav3.1 (confirmed with ¹⁰⁹Cd²⁺ radiolabel). Pb²⁺ mimics Ca²⁺ at calmodulin binding sites." },
      { scale: "10⁻⁸ m", link: "Ca²⁺ → CaM → CaMKII", evidence: "Basic biochemistry (textbook)", status: "confirmed", detail: "Ca²⁺ binds calmodulin → activates CaMKII via Thr286 autophosphorylation. This is the convergence point: all upstream signals funnel through CaMKII." },
      { scale: "10⁻⁷ m", link: "CaMKII → TPH-2 → 5-HT change in brain", evidence: "900 MHz → 5-HT region-specifically (hypothalamus, medulla)", status: "confirmed", detail: "CaMKII phosphorylates TPH-2 (tryptophan hydroxylase-2), the rate-limiting enzyme for brain serotonin synthesis. 900 MHz produces region-specific 5-HT changes in hypothalamus and medulla — the exact regions controlling sleep and cardiorespiratory function." },
      { scale: "10⁻⁷ m", link: "CaMKII → CSD threshold", evidence: "CaV + NMDA both required; CaMKII inhibition → hyperexcitability", status: "confirmed", detail: "CaMKII regulates the threshold for cortical spreading depolarization (CSD). Both CaV channels and NMDA receptors are necessary for CSD initiation. CaMKII inhibition paradoxically increases excitability — precise regulation is critical." },
      { scale: "10⁻⁶ m", link: "ELF → VGCC expression↑ (ELF-priming)", evidence: "Sun 2016 Scientific Reports: 8-10 days → Ca²⁺ dramatically↑, Cav1 protein↑", status: "confirmed", detail: "Chronic ELF exposure (50/60 Hz) upregulates VGCC protein expression — more channels per cell → cells become more sensitive to ALL subsequent EMF. This is ELF-priming: the background 50 Hz grid sensitizes the population." },
      { scale: "10⁻⁶ m", link: "ELF → seizure susceptibility↑ in neocortex", evidence: "Varró 2009: transient priming effect", status: "confirmed", detail: "ELF-EMF enhances synaptic facilitation in hippocampus AND increases seizure susceptibility in neocortex. The effect is transient — demonstrating that ELF modulates neuronal excitability acutely." },
      { scale: "10⁻⁵ m", link: "GABA excitatory → Q→∞ in neonatal brain", evidence: "PMC7847733, bumetanide restores inhibition, KCC2 maturation", status: "confirmed", detail: "In neonates, NKCC1 dominance makes GABA excitatory (γ < 0). This means the Q-factor → ∞: the brain is an undamped resonator. Bumetanide blocks NKCC1 → GABA becomes inhibitory → seizures stop. KCC2 matures over months → Q decreases." },
      { scale: "10⁻⁴ m", link: "Primed + EMF → seizures", evidence: "López-Martín 2006/2009: pulse-modulated > CW", status: "confirmed", detail: "The key experiment: subconvulsive picrotoxin (reduces γ) + GSM 900 MHz = seizures. Neither alone suffices. Pulse-modulated GSM is more effective than continuous wave — biological effect depends on specific pulsation, not SAR." },
      { scale: "10⁻³ m", link: "CSD → brainstem → death", evidence: "SUDEP = 'adult SIDS'; CACNA1A model; L-type Ca²⁺ antagonist PREVENTED death", status: "confirmed", detail: "Spreading depolarization propagating to brainstem causes cardiorespiratory arrest. This is SUDEP and SIDS. L-type VGCC antagonist prevented seizure-induced death in SUDEP mouse models — direct proof that Ca²⁺ blockade prevents the terminal event." },
      { scale: "10⁻² m", link: "Melatonin↓ → cardiac arrhythmia", evidence: "Pinealectomy → arrhythmias↑; melatonin supplementation → protection", status: "confirmed", detail: "Pinealectomy increases reperfusion arrhythmias. Chronic melatonin supplementation provides arrhythmia protection via antifibrotic effects, Cx43 preservation, mitochondrial protection. EMF suppresses melatonin via CRY pathway → cardiac risk increases." },
      { scale: "10⁻² m", link: "PGC → melatonin↓ → pathology", evidence: "r=0.569 uncalcified tissue↔melatonin; AD: 76% vs 64% PGC", status: "confirmed", detail: "Pineal gland calcification (PGC) directly reduces melatonin production (r=0.569). Alzheimer's patients have higher PGC (76% vs 64%). PGC is a convergent mechanism: EMF + heavy metals + fluoride all accelerate it." },
      { scale: "10⁻² m", link: "Sleep↓ → GABA↓ → Q↑", evidence: "Sleep deprivation activates epileptiform discharges in 23-62%", status: "confirmed", detail: "Sleep deprivation reduces GABA tonic inhibition (γ decreases → Q increases). This is used clinically as diagnostic provocation for epilepsy. EMF→melatonin↓→sleep↓→GABA↓ creates feedback loop 4 (Walker chain)." },
      { scale: "10⁻¹ m", link: "Prenatal Ca²⁺ disruption → offspring γ↓", evidence: "Sevoflurane → interneuron disruption → γ↓ permanently", status: "partial", detail: "Maternal sevoflurane (Ca²⁺ modulator) disrupts interneuron development → permanent GABAergic inhibition deficit in offspring. Demonstrates prenatal Ca²⁺ disruption can permanently alter damping. Partial: mechanism shown with sevoflurane, not yet with EMF directly." },
      { scale: "10⁰ m", link: "Pharmacology targets Ca²⁺ cascade", evidence: "Ethosuximide, gabapentin, verapamil, melatonin, lithium, psilocybin, bumetanide", status: "confirmed", detail: "Every effective treatment for BERM-predicted conditions targets a component of the Ca²⁺ cascade. This pharmacological convergence is predicted by the model and would be extraordinary coincidence otherwise." },
      { scale: "10³ m", link: "Epidemiological elimination", evidence: "Klimentidis p=10⁻⁷ (8 species), Mazur weight-stable T↓, 54-country R²=0.851", status: "partial", detail: "Cross-species obesity trend (8 species, p=10⁻⁷) eliminates diet/exercise as sole cause. 54-country EMF-health correlation R²=0.851. Partial: epidemiological evidence is correlational, not interventional." },
      { scale: "10⁻⁶ m", link: "VK9: EMF → BBB permeability↑", evidence: "PMC12829706: RF → eNOS↑ + occludin↓; melatonin protects (PMC6932927)", status: "confirmed", detail: "RF-EMF increases blood-brain barrier permeability via eNOS upregulation and occludin downregulation. Melatonin protects tight junction proteins. EMF→melatonin↓ creates double BBB vulnerability: direct opening + loss of melatonin protection." },
      { scale: "10⁻⁵ m", link: "VK10: 5G → BAT PRDM16↓ → thermogenesis↓", evidence: "PMC11942954: 3.5 GHz → PRDM16↓, C/EBPβ↓", status: "confirmed", detail: "5G (3.5 GHz) reduces PRDM16 and C/EBPβ mRNA in brown adipose tissue. BAT uses Ca²⁺ cycling (SERCA) for thermogenesis — a VGCC-mediated mechanism. Connects EMF to the Klimentidis obesity paradox: 8 species gaining weight without dietary change (p=10⁻⁷)." },
      { scale: "10⁻³ m", link: "VK11: EMF → HPA axis → cortisol↑", evidence: "Klimek 2023: ELF → HPA sensitization; RF → corticosterone↑ (Frontiers 2026)", status: "confirmed", detail: "ELF-EMF sets a new HPA axis setpoint with sensitization rather than adaptation. RF-EMF increases anxiety and corticosterone. The HPA axis does NOT habituate to chronic EMF — it sensitizes, producing progressively higher cortisol baseline." },
      { scale: "10⁻⁵ m", link: "VK12: EMF → β-cell Ca²⁺ → insulin disrupted", evidence: "PMID:32323041: E-field → insulin w/o glucose; CaVγ4→CaMKII→MafA (PMC9030882)", status: "confirmed", detail: "Electric fields induce insulin secretion from β-cells WITHOUT glucose via Ca²⁺ channels. CaVγ4→CaMKII→MafA pathway controls β-cell maturity — CaMKII dysregulation causes β-cell identity loss. Connects EMF directly to type 2 diabetes." },
      { scale: "10⁻³ m", link: "VK13: EMF → hypothalamic synaptic vesicles↓", evidence: "Kim 2019: 835 MHz 12wk → vesicle↓, synapsin I/II↓, synaptotagmin 1↓", status: "confirmed", detail: "835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus, plus synapsin I/II and synaptotagmin 1 (Ca²⁺ sensor for release). ALL hypothalamic hormone release impaired — explaining simultaneous GnRH, CRH, TRH, GHRH, dopamine disruption." },
      { scale: "10⁻² m", link: "VK14: Cortisol↑ → hippocampal atrophy", evidence: "Sapolsky 2009: dendritic retraction + neurogenesis↓; cortisol→AD (Frontiers 2026)", status: "confirmed", detail: "Chronic cortisol causes hippocampal dendritic retraction, neurogenesis cessation, and volume loss. Hippocampus is HPA negative feedback center — its damage removes cortisol braking → cortisol↑↑ (loop S6). Accelerates Alzheimer's progression." },
      { scale: "10⁻⁵ m", link: "VK15: EMF → Leydig → StAR↓ → T↓", evidence: "Multiple: RF → Leydig morphology changes, StAR↓, T↓ dose-dependently", status: "confirmed", detail: "EMF reduces StAR protein in Leydig cells — the rate-limiting step in steroidogenesis. Molecular mechanism behind population-wide T↓ independent of obesity, confirmed by Mazur's weight-stable data." },
      { scale: "10⁻⁵ m", link: "VK16: EMF → VGCC → Ca²⁺ → mast cell degranulation", evidence: "Johansson 2000: EMF → mast cell changes; cardiac mast cells → arrhythmias (PMC6896164)", status: "confirmed", detail: "Ca²⁺ triggers mast cell degranulation. EMF → VGCC → Ca²⁺ → mast cell releases histamine + IL-1β + tryptase. Skin biopsies from display users show changes. Cardiac mast cells → arrhythmias. IL-1β from mast cells → KCC2↓ → GABA excitatory longer." },
      { scale: "10⁻⁶ m", link: "VK17: RF → CatSper Ca²⁺ → sperm energy depletion", evidence: "2100 MHz activates CatSper prematurely; sperm meta SMD -1.92 (Environ Int 2024)", status: "confirmed", detail: "RF-EMF activates CatSper Ca²⁺ channels in sperm prematurely, causing energy depletion before reaching the egg. Sperm meta-analysis shows DNA/chromatin damage at mobile phone SAR levels (SMD -1.92, 95% CI -2.78 to -1.05). Pb²⁺ competes with Ca²⁺ at sperm acrosome — heavy metal synergy in fertility." },
      { scale: "10⁻⁵ m", link: "VK18: SCN Ca²⁺ oscillation = circadian clock", evidence: "PMC6170461: SCN neurons oscillate in Ca²⁺ with circadian rhythm", status: "confirmed", detail: "SCN neurons oscillate in Ca²⁺ concentration with circadian rhythm — Ca²⁺ oscillations ARE the physical basis of the circadian clock. EMF disrupts Ca²⁺ → EMF disrupts the clock itself. SCN is the master pacemaker that synchronizes hypothalamic and peripheral clocks." },
      { scale: "10⁻⁷ m", link: "VK19: Inflammation → DA↓ → motivation loss", evidence: "Berridge: NAcc DA = 'wanting'; IFN-α → striatal DA↓ → anhedonia (PMC9718669)", status: "confirmed", detail: "Nucleus accumbens dopamine mediates 'wanting' (motivation) but not 'liking' (pleasure). Inflammation (IFN-α) reduces striatal dopamine causing anhedonia, reversed by L-DOPA. Low tonic DA increases phasic response → screens feel more rewarding with low baseline DA. EMF→inflammation→DA↓→addiction vulnerability." },
      { scale: "10⁻⁶ m", link: "VK20: Cav1.2 → OPC differentiation → myelination", evidence: "PMC6916379: Cav1.2 KO → hypomyelination; SMF → Cav1.2↑ in OPCs (Sci Rep 2017)", status: "confirmed", detail: "Cav1.2 (L-type VGCC) is essential for oligodendrocyte precursor cell differentiation and myelination. Cav1.2 knockout causes hypomyelination. Static magnetic field increases Cav1.2/Cav1.3 expression in OPCs. EMF-induced Cav1.2 dysregulation → myelination timing disruption in developing brain." },
      { scale: "10⁻⁵ m", link: "VK21: NK cell Ca²⁺ → immune surveillance", evidence: "Ca²⁺→NFAT1→granzyme B (PLoS ONE 2024); 50 Hz ELF→NK↓; 200 kHz TTFields→NK↑", status: "confirmed", detail: "NK cell cytotoxicity is Ca²⁺-dependent: Ca²⁺ influx activates NFAT1 → granzyme B expression. 50 Hz ELF suppresses NK cytotoxicity while 200 kHz TTFields INCREASE it — direct validation of frequency-dependent pathway hierarchy. Same VGCC mechanism, opposite outcomes at different frequencies." },
      { scale: "10⁻⁵ m", link: "VK22: Cortisol → GnIH → GnRH↓ → T↓", evidence: "PMC5380668: GnIH silencing restored fertility; RF9 restored T in cortisol-treated primates (PMC7946976)", status: "confirmed", detail: "Stress induces GnIH/RFRP-3 which suppresses GnRH → LH → testosterone. GnIH gene silencing RESTORED fertility in stressed animals. RF9 (GnIH antagonist) RESTORED testosterone in hydrocortisone-treated primates. CRF directly suppresses GnRH pulse generator. Three independent routes to T↓." },
      { scale: "10⁻⁶ m", link: "VK23: BDNF hormesis — RF↓ vs ELF↑", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ (PMC10275548); ELF 50 Hz → BDNF↑ + neurogenesis↑ (PMC5702423)", status: "confirmed", detail: "RF-EMF reduces BDNF in hippocampus (2650 MHz, 28 days: BDNF↓, GABA↓, GR↓, corticosterone↑). Postnatal RF (835 MHz) causes dendritic spine loss + memory impairment. Meanwhile ELF 50 Hz INCREASES BDNF and promotes neurogenesis. Frequency-dependent hormesis: same pathway, opposite direction." },
      { scale: "10⁻⁵ m", link: "VK24: Per2 → gut barrier → LPS → neuroinflammation", evidence: "Per2 KO → gut barrier↓ → LPS → hippocampal neurogenesis↓ → depression (PMC12631932)", status: "confirmed", detail: "Per2 knockout in gut epithelium disrupts barrier function → LPS enters bloodstream → neuroinflammation → hippocampal neurogenesis↓ → depression. Circadian disruption alters gut microbiome (Ruminococcus↑, Lactobacillus↓, LPS-synthesis genes↑). Dual barrier principle: BBB + gut barrier share ZO-1, occludin, claudins." },
      { scale: "10⁰ m", link: "VK25: Sleep↓ → T↓ → Walker chain closed", evidence: "JAMA 2011: 5h sleep → T -10-15%; meta-analysis confirms (PMID:34801825)", status: "confirmed", detail: "One week of 5h sleep reduces testosterone by 10-15%, equivalent to 10-15 years of aging. The Walker chain is now closed: EMF→melatonin↓→sleep↓→T↓→neuroprotection↓→more EMF damage. Sleep restriction + EMF predicted to produce superadditive T decline (>25% combined vs ~15% sleep alone)." },
      { scale: "10⁻⁵ m", link: "VK26: EMF → HPT axis → Dio2/Dio3↓ → hidden hypothyroidism", evidence: "PMC11507962: LTE → Dio2/Dio3↓ in hypothalamus; PMID:35963949: FT3↓ + FT4↑ in ELF workers", status: "confirmed", detail: "EMF reduces Dio2 and Dio3 deiodinase enzymes in the hypothalamus. T4→T3 conversion is impaired → blood T4 appears normal but tissues lack active T3. Standard thyroid tests (TSH, T4) miss this hidden deficiency. FT3/FT4 ratio is the diagnostic key." },
      { scale: "10⁻⁸ m", link: "VK27: EMF → epigenetics → transgenerational inheritance", evidence: "ScienceDirect 2024: DNMT1 + HDAC + DICER1; PMC4538330: sperm methylation dose-dependent", status: "confirmed", detail: "EMF alters three epigenetic mechanisms: DNA methylation (DNMT1), histone modification (HDAC), and microRNA biogenesis (DICER1/DGCR8). In sperm: 50 Hz ELF produces bidirectional dose-dependent methylation changes (↓ at 1 mT, ↑ at 3 mT). DDT transgenerational model provides template for F3 persistence." },
      { scale: "10⁻⁷ m", link: "VK28: EMF → ROS → telomeres → aging spiral", evidence: "PMID:36582083: radiation → ROS → telomere damage; mel → telomerase + SIRT1 (Front Aging Neurosci 2022)", status: "confirmed", detail: "EMF→ROS damages telomeres (G-rich sequences are especially vulnerable). Simultaneously EMF→melatonin↓ removes telomerase + SIRT1 protection. Depression = 281 bp shorter telomeres = 7 years accelerated aging. Melatonin is the key anti-aging molecule: it activates telomerase, upregulates SIRT1, and reduces ROS." },
      { scale: "10⁻⁸ m", link: "VK29: EMF → oxytocin Ca²⁺ disruption → social bond↓", evidence: "PMC3197583: OXT release requires N-type + L-type VGCCs; eNeuro 2025: PVN Ca²⁺ → OXT", status: "confirmed", detail: "Oxytocin somatodendritic release requires Ca²⁺ influx through both N-type and L-type VGCCs. EMF disrupts VGCC function → OXT release disrupted. L-type is especially important in neonates. Insulin→OXT via Ca²⁺ links metabolic and social systems. Quad lock: T↓×F↑×DA↓×OXT↓ = complete social-reproductive collapse." },
      { scale: "10⁻⁵ m", link: "VK30: ELF-priming → α2δ-1↑ → chronic pain WITHOUT neuropathy", evidence: "PMID:16764990: α2δ-1 overexpression alone → pain; Br J Pharmacol 2018: gabapentin blocks α2δ-1", status: "confirmed", detail: "ELF-priming (VK4) upregulates VGCC expression including α2δ-1. α2δ-1 overexpression alone produces neuropathic pain behavior WITHOUT nerve injury. Gabapentinoids (gabapentin, pregabalin) target exactly α2δ-1. The chronic pain epidemic is consistent with population-wide ELF-priming of α2δ-1." },
      { scale: "10⁻⁵ m", link: "VK31: ASD = BERM prototype (GABA switch + α2δ + inflammation → E/I↑)", evidence: "NKCC1/KCC2↑ in ASD (Front Psychiatry 2025); CACNA2D3 autism gene; bumetanide RCTs", status: "confirmed", detail: "ASD unites three independently verified BERM mechanisms: GABA switch delay (VK6, KCC2↓→GABA excitatory), ELF-priming synaptogenesis (VK4+VK30, α2δ-1↑→E/I↑), and inflammation-driven KCC2 suppression (S9, IL-1β→KCC2↓). CACNA2D3 is an autism susceptibility gene. KCC2 sex dimorphism explains 4:1 male predominance. Bumetanide (NKCC1 blocker) improves ASD symptoms in RCTs." },
      { scale: "10⁻⁵ m", link: "VK41: ADHD = second prototype (PFC delay + DA Goldilocks + E/I shift)", evidence: "Shaw 2007 PNAS: PFC delay 5 yr; Arnsten 2009: DA inverted U; ASD-ADHD 30-50% comorbidity", status: "confirmed", detail: "ADHD unites three BERM mechanisms: DA deficit in PFC (VK19: striatum DA↓ → attention↓), myelination delay (VK20: Cav1.2→OPC → PFC matures 5 YEARS later), and E/I shift (VK6: KCC2↓). ASD and ADHD share 30-50% comorbidity — same mechanism, different Q values on the excitability spectrum." },
      { scale: "10⁻² m", link: "VK42: Shift work → IARC 2A → cancer via melatonin suppression", evidence: "IARC Monograph 98 2010; meta-analysis breast cancer OR 2.34; melatonin antitumor (Reiter 2017)", status: "confirmed", detail: "IARC classifies shift work as Group 2A (probably carcinogenic) via melatonin suppression. EMF suppresses melatonin through the SAME mechanism (VK3: PGC). If IARC accepts circadian disruption via shift work as 2A, then EMF-induced circadian disruption should carry equal evidential weight." },
      { scale: "10⁻⁵ m", link: "VK43: Verapamil → β-cell Ca²⁺ protection in T1D", evidence: "Forlenza JAMA 2023 RCT N=88: C-peptide +30%; Ovalle Nat Med 2018; Diabetes Care 2025", status: "confirmed", detail: "Verapamil (Cav1.2 blocker) preserves β-cell function in children with new-onset T1D: C-peptide +30% vs placebo at 52 weeks. Double-blind RCT (N=88, ages 7-17). Confirms VK12: β-cell Ca²⁺ disruption causes identity loss. If blocking Ca²⁺ channels saves β-cells, then Ca²⁺ overload (from EMF) destroys them." },
      { scale: "10⁻⁴ m", link: "VK44: Preterm birth = uterine VGCC → nifedipine tocolysis", evidence: "Cochrane 2014: nifedipine first-line tocolytic; P4:E2→Cav1.2 (PMC3816733)", status: "confirmed", detail: "Uterine contractions depend on Ca²⁺ influx through VGCCs. Nifedipine (Ca²⁺ channel blocker) is first-line tocolytic — Cochrane evidence. Progesterone:estrogen ratio regulates Cav1.2 expression in uterus. If Ca²⁺ blockade prevents preterm labor, then Ca²⁺ overload is the cause." },
      { scale: "10⁻⁵ m", link: "VK45: ALS = motor neuron Ca²⁺ vulnerability (4th neurodegeneration)", evidence: "PMC4452055: motor neuron low Ca²⁺ buffering; Ca²⁺-permeable AMPA; riluzole indirect Ca²⁺↓", status: "confirmed", detail: "Motor neurons have low Ca²⁺ buffering capacity + Ca²⁺-permeable AMPA receptors → selectively vulnerable to Ca²⁺ overload. Riluzole (only ALS drug for decades) works indirectly: Na⁺ block → glutamate↓ → Ca²⁺↓. Fourth neurodegeneration with Ca²⁺ mechanism (after AD, MS, PD). Occupational EMF: OR 1.3-1.7." },
      { scale: "10⁻⁶ m", link: "VK46: Gut-brain 5-HT axis (90% serotonin in gut)", evidence: "Cell Host Microbe: 90% 5-HT in gut; PMC7231603: Trp→brain; gut melatonin", status: "confirmed", detail: "Over 90% of serotonin is produced in gut enterochromaffin cells. Gut microbiota modulate tryptophan availability to brain → central 5-HT synthesis. Melatonin is also synthesized from serotonin in the gut. IBS-depression comorbidity reflects shared gut-brain 5-HT disruption. Connects S14 (Per2→gut) to S2 (serotonin lock-open)." },
      { scale: "10⁻⁵ m", link: "VK47: Allergies = mast cell Ca²⁺ degranulation (quadruple sensitization)", evidence: "ScienceDirect 2011: Ca²⁺ ionophore → degranulation WITHOUT IgE; env estrogens → mast cell↑", status: "confirmed", detail: "Mast cell degranulation is Ca²⁺-dependent: Ca²⁺ ionophores trigger degranulation WITHOUT IgE, Ca²⁺ depletion blocks it WITH IgE. Quadruple sensitization: (1) EMF→VGCC→Ca²⁺ in mast cells, (2) environmental estrogens→mast cell sensitization, (3) cortisol→Th1→Th2 shift, (4) gut barrier→LPS→systemic inflammation." },
      { scale: "10⁻⁴ m", link: "VK48: Pre-eclampsia = pregnancy Cav1.2 + ROS dysregulation", evidence: "PMC9774363: Cav1.2 BP regulation; ET-1→Cav1.2 in placenta; nifedipine for pre-eclampsia", status: "confirmed", detail: "Pre-eclampsia involves Cav1.2 + ROS dysregulation in pregnancy. ET-1 activates Cav1.2 in placental vessels; nifedipine partially blocks this. Ca²⁺ spark frequency reduced in pre-eclampsia → vasodilation↓. Nifedipine used for both tocolysis AND pre-eclampsia hypertension — same Ca²⁺ mechanism in reproductive tissue." },
      { scale: "10⁻⁴ m", link: "VK49: Osteoporosis + PEMF hormesis paradox", evidence: "Frontiers Endocrinol 2024: Ca²⁺ channels in bone; PMC11919207: PEMF → bone growth", status: "confirmed", detail: "Ca²⁺ channels regulate both osteoclasts and osteoblasts. PEMF therapy promotes bone growth and reduces inflammation — seeming to contradict BERM. Resolution: Lindgren hormesis. Controlled PEMF parameters → beneficial Ca²⁺ transient; chronic uncontrolled EMF → Ca²⁺ overload. PEMF validates that EMF acts through Ca²⁺ channels." },
      { scale: "10⁻⁸ m", link: "VK50: Vitamin D → CACNA1C/1D mRNA↓ (10th moderator)", evidence: "J Neurosci 2001: VDH→L-VSCC↓; PLoS ONE 2011: VDR silencing → Cav1.2↑; Transl Psychiatry 2019", status: "confirmed", detail: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C and CACNA1D mRNA — nature's channel blocker. VDR silencing prevents Cav1.2/Cav1.3 downregulation. Vitamin D deficiency → VGCC over-expression = same state as ELF-priming. Triple hit: CACNA1C variant + low vitamin D + EMF = highest risk (schizophrenia). 10th BERM moderator." },
      { scale: "10⁻⁶ m", link: "VK51: CatSper = sperm-specific Ca²⁺ channel (5 infertility routes)", evidence: "RBMO 2014: knockout = sterile; Nature Comms 2025: temp-gated Q₁₀=5.1; JCI 2024: human mutations", status: "confirmed", detail: "CatSper is the ONLY sperm-specific Ca²⁺ channel — knockout males are completely sterile despite normal sperm production. Temperature-gated (threshold 33.5°C, Q₁₀=5.1): premature activation → energy depletion → death before reaching egg. Five independent routes to male infertility: hormonal (T↓), DNA (ROS), epigenetic (methylation), channel (CatSper), and thermal." },
      { scale: "10⁻⁷ m", link: "VK52: Psilocybin = Ca²⁺ cascade reset via 5-HT2A→BDNF→mTOR", evidence: "Trends Pharmacol Sci 2025; Science 2023: intracellular 5-HT2A; Mol Psychiatry 2025", status: "confirmed", detail: "Psilocybin promotes dendritic spine growth via 5-HT2A→Gq→Ca²⁺→BDNF→mTOR — precisely reversing VK14 (cortisol→dendritic atrophy) and VK23 (BDNF↓). Intracellular 5-HT2A activation required (Science 2023) — serotonin itself cannot access these receptors. A pharmacological RESET of the Ca²⁺-damaged neural architecture." },
      { scale: "10⁻⁷ m", link: "VK53: Caffeine = A2A→Ca²⁺ modulation → PD neuroprotection", evidence: "Frontiers Neurosci 2020: PD inverse assoc; PMID:11319241: MPTP protection; J Neurol Sci 2016", status: "confirmed", detail: "Strong epidemiological inverse association between caffeine and Parkinson's disease. A2A receptor antagonism → DA neuron protection in MPTP/6-OHDA models. Neuroprotection extends beyond PD: stroke, excitotoxicity, α-synuclein clearance. Caffeine is the ONE natural Ca²⁺ modulator whose consumption is INCREASING — potentially compensatory self-medication." },
      { scale: "10⁰ m", link: "VK54: Lithium in drinking water → dementia↓ + suicide↓", evidence: "Int J Bipolar Disord 2024: 5 studies dementia↓; Br J Psychiatry 2020: suicide meta; ScienceDirect 2026: US counties", status: "confirmed", detail: "Higher natural lithium in drinking water is associated with lower dementia and suicide rates at population level. GSK-3β inhibition + CaMKII modulation + BDNF↑ + circadian stabilization = multiple BERM Ca²⁺ cascade nodes. Modern water filtration REMOVES trace lithium — a fifth natural protective mechanism lost." },
      { scale: "10⁻⁵ m", link: "VK55: Amygdala hypertrophy ↔ hippocampal atrophy (S17 loop)", evidence: "PNAS 2008: single cortisol dose → BLA hypertrophy; PLoS ONE 2012: opposite BDNF; Neurosci Lett 2023: persistence", status: "confirmed", detail: "Cortisol produces OPPOSITE effects in amygdala vs hippocampus: BLA gains dendrites while hippocampus loses them. BDNF↑ in amygdala / BDNF↓ in hippocampus under same cortisol. BLA hypertrophy persists 21+ days after stress ends while hippocampal atrophy recovers. S17: cortisol→amygdala↑→anxiety↑→cortisol↑ = self-amplifying anxiety spiral." },
      { scale: "10³ m", link: "VK56: Amish = BERM's closest control group (confirmed with reservations)", evidence: "STAT 2025: obesity -89%, T2D -75%; Anderson & Potts 2022: 126-study review; massive lifestyle confounders", status: "partial", detail: "Old Order Amish have dramatically lower rates of every BERM-predicted condition. However, massive confounders (diet, exercise, smoking, community) prevent direct attribution. Cross-validated by Klimentidis (animals gaining weight on controlled diets, p=10⁻⁷) and Mazur (weight-stable T↓). The Amish-Mennonite EMF gradient test would be the critical discriminator." },
    ],
    chainHeaders: { scale: "Scale", link: "Chain link", evidence: "Evidence", status: "Status" },
    chainSummary: "57 verified links across 47 layers (VK1–VK31, VK41–VK56). The chain is unbroken from photon physics to population epidemiology, now spanning CatSper fertility, psilocybin neural reset, caffeine neuroprotection, lithium water epidemiology, amygdala-anxiety feedback loop, and Amish control group — plus all mechanisms from ADHD prototype to vitamin D modulator.",

    feedbackTitle: "Seventeen positive feedback loops",
    feedbackLead:
      "The convergence verification revealed seventeen self-amplifying cycles within the chain. The loops form a network: any entry point activates multiple degradation spirals simultaneously. Each loop means that initial EMF effects can progressively worsen without increasing exposure — the system degrades itself.",
    feedbackLoops: [
      {
        name: "Monitor feedback resonance",
        id: "S1",
        steps: ["Baby's sound → microphone → RF modulation", "RF → VGCC → Ca²⁺ → stronger oscillation", "Stronger oscillation → louder sound → more RF modulation", "Cascade amplification"],
        status: "Mechanistically coherent, untested as complete loop",
        statusColor: "amber",
      },
      {
        name: "Serotonin lock-open",
        id: "S2",
        steps: ["EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓", "5-HT↓ → thalamocortical gate OPEN", "Open gate → EMF penetrates DEEPER into circuits", "More CaMKII disruption → more 5-HT↓ → ..."],
        status: "Each link verified independently",
        statusColor: "green",
      },
      {
        name: "Hypoxia-NKCC1",
        id: "S3",
        steps: ["CSD → local hypoxia → NKCC1↑", "NKCC1↑ → GABA more excitatory → γ↓ → Q↑", "Q↑ → CSD propagates MORE easily", "More CSD → more hypoxia → more NKCC1↑ → ..."],
        status: "NKCC1↑ in hypoxia verified",
        statusColor: "green",
      },
      {
        name: "Walker sleep chain",
        id: "S4",
        steps: ["EMF → melatonin↓ → sleep↓", "Sleep↓ → GABA tonic inhibition↓ → γ↓ → Q↑", "Q↑ → EMF affects brain MORE", "More melatonin↓ → worse sleep → less GABA → ..."],
        status: "Each link verified independently",
        statusColor: "green",
      },
      {
        name: "PGC → BBB spiral",
        id: "S5",
        steps: ["EMF → PGC → melatonin↓", "Melatonin↓ → BBB tight junctions↓", "BBB↓ → heavy metals enter brain MORE easily", "Heavy metals → more PGC → less melatonin → ..."],
        status: "Each link verified independently",
        statusColor: "green",
      },
      {
        name: "Cortisol-hippocampus vortex",
        id: "S6",
        steps: ["EMF → HPA → cortisol↑", "Cortisol↑ → hippocampal atrophy", "Hippocampus↓ → HPA negative feedback LOST", "No braking → cortisol↑↑ → more atrophy → ..."],
        status: "[[ref:sapolsky2009_cortisol|Sapolsky]] mechanism verified",
        statusColor: "green",
      },
      {
        name: "BAT metabolic spiral",
        id: "S7",
        steps: ["EMF → BAT PRDM16↓ → thermogenesis↓", "Thermogenesis↓ → metabolic syndrome → inflammation", "Inflammation → more VGCC sensitivity", "More Ca²⁺ disruption → more BAT dysfunction → ..."],
        status: "Mechanistically coherent, animal data available",
        statusColor: "amber",
      },
      {
        name: "Testosterone neuroprotection loss",
        id: "S8",
        steps: ["EMF → Leydig → StAR↓ → T↓", "T↓ → neuroprotection↓ + synaptic plasticity↓", "More vulnerable neurons → more EMF damage", "More Leydig damage → less T → ..."],
        status: "T↓ neuroprotection link verified",
        statusColor: "green",
      },
      {
        name: "IL-1β → KCC2 loop",
        id: "S9",
        steps: ["EMF → mast cell → IL-1β release", "IL-1β → KCC2 maturation delayed", "KCC2↓ → GABA stays excitatory longer → Q↑", "Q↑ → more neuronal damage → more IL-1β → ..."],
        status: "KCC2 environmental regulation verified",
        statusColor: "green",
      },
      {
        name: "Hypothalamic multi-axis cascade",
        id: "S10",
        steps: ["EMF → hypothalamic synaptic vesicles↓", "Vesicle↓ → GnRH↓ + CRH dysregulation + TRH↓", "Multi-hormone deficit → systemic disruption", "Systemic stress → more HPA activation → ..."],
        status: "[[ref:kim2019_hypothalamus|Kim 2019]] synaptic changes verified",
        statusColor: "green",
      },
      {
        name: "Circadian clock self-disruption",
        id: "S11",
        steps: ["EMF → SCN Ca²⁺ oscillation disrupted", "SCN disrupted → melatonin timing lost → sleep↓", "Sleep↓ → Per2↓ in gut + peripheral clocks desync", "Desync → more SCN vulnerability → ..."],
        status: "SCN Ca²⁺ oscillation + Per2 gut link verified",
        statusColor: "green",
      },
      {
        name: "NK-cancer-inflammation",
        id: "S12",
        steps: ["ELF → NK cell cytotoxicity↓", "NK↓ → cancer surveillance↓ → tumor growth", "Tumor → inflammation → more VGCC sensitization", "More Ca²⁺ disruption → more NK suppression → ..."],
        status: "NK Ca²⁺ dependence + ELF suppression verified",
        statusColor: "green",
      },
      {
        name: "HPA-HPG cross-spiral",
        id: "S13",
        steps: ["EMF → cortisol↑ → GnIH↑ → T↓", "T↓ → neuroprotection↓ → hippocampus vulnerable", "Hippocampus↓ → HPA braking lost → cortisol↑↑", "More GnIH → more T↓ → ..."],
        status: "RF9 restored T in cortisol-treated primates",
        statusColor: "green",
      },
      {
        name: "Gut-brain inflammation",
        id: "S14",
        steps: ["EMF → melatonin↓ → Per2↓ in gut epithelium", "Per2↓ → gut barrier↓ → LPS enters bloodstream", "LPS → neuroinflammation → hippocampal neurogenesis↓", "Neuroinflammation → more HPA activation → more melatonin↓ → ..."],
        status: "Per2 KO → gut barrier → LPS → depression verified",
        statusColor: "green",
      },
      {
        name: "Melatonin-telomere aging spiral",
        id: "S15",
        steps: ["EMF → melatonin↓ → telomerase↓ + SIRT1↓", "Telomerase↓ → telomere shortening → SASP", "SASP → inflammation → ROS↑", "ROS↑ → more telomere damage → more SASP → ..."],
        status: "Melatonin → telomerase + SIRT1 verified; depression = 7y accelerated aging",
        statusColor: "green",
      },
      {
        name: "Pain-sleep-cortisol spiral",
        id: "S16",
        steps: ["EMF → α2δ-1↑ → central sensitization → chronic pain", "Chronic pain → sleep↓ (Walker chain S4)", "Sleep↓ → cortisol↑ (HPA S7) + GABA↓", "Cortisol↑ → inflammation → more sensitization → depression → sleep↓ → ..."],
        status: "α2δ-1 → pain without injury verified; pain-sleep-cortisol each verified",
        statusColor: "green",
      },
      {
        name: "Amygdala-anxiety spiral",
        id: "S17",
        steps: ["EMF → cortisol↑ (HPA axis, VK11)", "Cortisol → BLA hypertrophy + BDNF↑ in amygdala", "BLA hypertrophy → anxiety↑ → MORE cortisol", "Simultaneously: hippocampus atrophies → HPA brake LOST → cortisol↑↑", "Amygdala hypertrophy PERSISTS 21+ days after stress → structural lock-in"],
        status: "Single cortisol dose → BLA hypertrophy verified ([[ref:amygdala_cort|PNAS 2008]]); persistence verified ([[ref:amygdala_persist|Neurosci Lett 2023]])",
        statusColor: "green",
      },
    ],

    consilienceTitle: "Consilience assessment",
    consilienceLead:
      "Consilience — independent lines of evidence converging on the same conclusion — is the strongest form of scientific support. BERM exhibits three levels of consilience.",
    consilienceLevels: [
      {
        level: "Strong consilience",
        desc: "Independent evidence lines converge",
        examples: [
          "Physics ([[ref:lindgren2025|Lindgren χ]]) ↔ Pharmacology (Ca²⁺ drugs converge)",
          "Genetics (CACNA1C, [[ref:sousouri2025|Sousouri 2025]]) ↔ Experimental ([[ref:lopez_martin_2006|López-Martín seizures]])",
          "Epidemiology ([[ref:klimentidis2010|Klimentidis 8 species]]) ↔ Pathology (SIDS 5-HT deficiency)",
        ],
      },
      {
        level: "Moderate consilience",
        desc: "Related evidence lines support each other",
        examples: [
          "ELF-priming ([[ref:sun2016_elf_vgcc|Sci. Rep. 2016]]) ↔ Gabapentin blocks it ([[ref:eroglu_2009_cell|Cell 2009]])",
          "PGC ↔ melatonin ([[ref:kunz2008_pgc_insomnia|r=0.569]]) ↔ [[ref:intechopen2020_melatonin_heart|Pinealectomy → arrhythmias]]",
          "[[ref:dell2022_sleep_seizure|Sleep deprivation → GABA↓]] (clinical) ↔ EMF → melatonin↓ (animal)",
        ],
      },
      {
        level: "Weak consilience (universality risk)",
        desc: "Ca²⁺ is ubiquitous — some connections may be trivial",
        examples: [
          "'25 epidemics with one denominator' — Ca²⁺ IS everywhere",
          "Some Ca²⁺ associations may reflect universal biology, not specific EMF causation",
          "This is the model's primary epistemic risk",
        ],
      },
    ],

    falsificationTitle: "What would falsify the model",
    falsificationLead:
      "A progressive research program must specify what would destroy it. BERM has four tiers of falsification, from complete collapse to clinical irrelevance.",
    falsificationTiers: [
      {
        level: "LEVEL 1 — Model collapse",
        test: "ETH Zürich nimodipine-5G: Ca²⁺ blocker does NOT prevent EMF sleep effect",
        consequence: "VGCC is not the target → entire cascade collapses",
      },
      {
        level: "LEVEL 2 — Environmental factor eliminated",
        test: "Amish data: same health trends as mainstream population",
        consequence: "EMF is not a significant environmental factor",
      },
      {
        level: "LEVEL 3 — Key experiment fails",
        test: "[[ref:lopez_martin_2006|López-Martín]] fails to replicate: picrotoxin + GSM does NOT cause seizures",
        consequence: "The only direct experimental evidence disappears",
      },
      {
        level: "LEVEL 4 — Clinical irrelevance",
        test: "EMF reduction intervention produces NO health benefit",
        consequence: "Model may be mechanistically correct but clinically meaningless",
      },
    ],

    progressiveTitle: "Progressive vs. degenerative",
    progressiveLead:
      "In Lakatos's framework, a research program is progressive if it generates predictions that are subsequently confirmed, producing more empirical content than was put in. It is degenerative if it only accommodates known facts post hoc.",
    progressivePoints: [
      "BERM predicted that CACNA1C genotype would modulate EMF response → [[ref:sousouri2025|Sousouri 2025]] confirmed (ETH Zürich, double-blind)",
      "BERM predicted that all effective SIDS treatments target Ca²⁺ pathways → verified across caffeine, melatonin, magnesium, oxytocin, bumetanide",
      "BERM predicted that ELF-priming should increase VGCC expression → [[ref:sun2016_elf_vgcc|Sun 2016 (Sci. Rep.)]] confirmed",
      "BERM predicted SUDEP and SIDS share a terminal mechanism → CSD → brainstem pathway confirmed for both",
      "BERM predicted that pulse modulation should matter more than SAR → [[ref:lopez_martin_2009|López-Martín 2009]] confirmed",
      "Each verification produced MORE than was predicted — unexpected findings at every layer",
    ],
    progressiveConclusion: "The model is progressive in Lakatos's sense: it generates predictions → predictions are verified → verification produces MORE content than the model specified. This is the hallmark of a productive research program.",

    analogyTitle: "The evolution theory analogy",
    analogyLead: "BERM shares structural features with evolution by natural selection — both are generative mechanisms that predict findings before observation, constrain the search space, and exhibit multi-level convergence.",
    analogyPoints: [
      { berm: "Generative mechanism (EMF→VGCC→Ca²⁺→cascades)", evolution: "Generative mechanism (variation→selection→adaptation)" },
      { berm: "Predicts findings BEFORE looking", evolution: "Predicts fossils, genes, vestigial structures BEFORE finding them" },
      { berm: "Constrains the search space (pharmacology, genetics)", evolution: "Constrains the search space (phylogeny, biogeography)" },
      { berm: "Multi-level convergence (physics → epidemiology)", evolution: "Multi-level convergence (molecules → ecosystems)" },
    ],
    analogyCritical: "CRITICAL DIFFERENCE: Evolution has independent verification (DNA sequencing). BERM still lacks INTERVENTIONAL verification — EMF reduction → health improvement in humans. This is the single most important missing piece.",

    predictionLink: "See convergence predictions (METAL-EMF-1–4, CHAIN-1–4, BBB-EMF-1–2, BAT-EMF-1, HPA-EMF-1–2, BETA-EMF-1–2, and more)",
    predictionHref: "/predictions",
    predictionSummary: "The convergence verification generates 55 testable predictions covering heavy metal synergy, blood-brain barrier, brown adipose tissue, HPA axis, β-cell, hypothalamic nexus, cortisol-hippocampus, Leydig cell, mast cell, sperm CatSper, NK immune surveillance, BDNF hormesis, gut-brain axis, thyroid Dio2/Dio3, epigenetics, telomere aging, oxytocin, chronic pain, ASD prototype, ADHD, ALS, allergy, vitamin D, PEMF hormesis, psilocybin, caffeine, lithium water, amygdala, and Amish control group mechanisms.",
    statusConfirmed: "✓ Confirmed",
    statusPartial: "◐ Partial",
    falsificationTestLabel: "Test",
    falsificationConsequenceLabel: "Consequence",
    analogyEvolutionHeader: "Evolution theory",
  },

  fi: {
    title: "Katkeamaton ketju: Fotoni → Populaatio",
    subtitle:
      "Iteratiivinen konvergenssiverifiointi testasi 57 skaalaa BERM:n mekanistisesta ketjusta 47 verifioidun kerroksen (VK1–VK31, VK41–VK56) yli. Tulos: 17 positiivista takaisinkytkentäsilmukkaa muodostavat itseään vahvistavan verkoston, fotonin absorptiosta väestötason vaikutuksiin, ennustamatonta empiiristä sisältöä jokaisessa kerroksessa.",
    backLink: "← Takaisin Evidenssiin",

    cautionText:
      "Tämä sivu esittää systemaattisen verifioinnin BERM:n mekanistisesta ketjusta fyysisten skaalojen yli. Jokainen linkki on testattu julkaistua kokeellista evidenssiä vasten. Ketju on yhtä vahva kuin heikoin linkki — osittaiset vahvistukset ja testaamattomat ennusteet on merkitty eksplisiittisesti.",

    chainTitle: "Verifioitu jatkumo",
    chainLead:
      "BERM ehdottaa jatkuvaa kausaaliketjua fotonin absorptiosta väestötason terveysvaikutuksiin. Jokainen välikerros on verifioitu itsenäisesti julkaistua kokeellista ja kliinistä evidenssiä vasten.",
    chainRows: [
      { scale: "10⁻¹⁵ m", link: "Fotoni → metriikkahäiriö", evidence: "Lindgren 2025 χ-parametri, Vassallon vahvistus", status: "confirmed", detail: "EMF-fotoni luo metriikkahäiriön kvanttitasolla. Lindgrenin χ-parametri tarjoaa fysiikkatason mekanismin sille, miksi biologinen kudos reagoi ei-termiseen EMF:ään." },
      { scale: "10⁻¹⁰ m", link: "Metriikka → S4-jänniteanturi", evidence: "Tang 2024 Nature Communications", status: "confirmed", detail: "Metriikkahäiriö vaikuttaa VGCC:iden S4-heliksin jänniteanturiin. Tang 2024 osoitti suoran S4-konformaatiomuutoksen EMF:stä ei-termisillä intensiteeteillä." },
      { scale: "10⁻⁹ m", link: "S4 → VGCC avautuu", evidence: "Panagopoulos 2025 IFO, Trus 2024 ei-ionotrooppinen", status: "confirmed", detail: "S4-konformaatiomuutos laukaisee VGCC:n avautumisen. Panagopoulos 2025 tarjoaa mekanistisen mallin; Trus 2024 osoittaa ei-ionotrooppisen (ei-termisen) aktivaatioreitin." },
      { scale: "10⁻⁹ m", link: "VGCC → Ca²⁺ + Pb²⁺/Cd²⁺ permeaatio", evidence: "Marchetti 2013, Cd→Cav3.1 radioleimattu", status: "confirmed", detail: "Avoimet VGCC:t sallivat Ca²⁺-sisäänvirtauksen — mutta myös myrkyllisten metallien. Cd²⁺ permeoi Cav3.1:n läpi (vahvistettu ¹⁰⁹Cd²⁺-radioleimauksella). Pb²⁺ matkii Ca²⁺:ia kalmoduliinin sitoutumispaikoissa." },
      { scale: "10⁻⁸ m", link: "Ca²⁺ → CaM → CaMKII", evidence: "Perusbiokemia (oppikirja)", status: "confirmed", detail: "Ca²⁺ sitoutuu kalmoduliiniin → aktivoi CaMKII:n Thr286-autofosforylaation kautta. Tämä on konvergenssipiste: kaikki ylävirran signaalit kanavoituvat CaMKII:n kautta." },
      { scale: "10⁻⁷ m", link: "CaMKII → TPH-2 → 5-HT muutos aivoissa", evidence: "900 MHz → 5-HT aluespesifisesti (hypotalamus, medulla)", status: "confirmed", detail: "CaMKII fosforyloi TPH-2:n (tryptofaanihydroksylaasi-2), aivojen serotoniinisynteesin nopeutta rajoittavan entsyymin. 900 MHz tuottaa aluespesifisiä 5-HT-muutoksia hypotalamuksessa ja medullassa — juuri niissä alueissa jotka kontrolloivat unta ja sydänhengitystoimintaa." },
      { scale: "10⁻⁷ m", link: "CaMKII → CSD-kynnys", evidence: "CaV + NMDA molemmat tarpeen; CaMKII-inhibitio → hypereksitabiliteetti", status: "confirmed", detail: "CaMKII säätelee kortikaalisen spreading depolarizationin (CSD) kynnystä. Sekä CaV-kanavat että NMDA-reseptorit ovat välttämättömiä CSD:n käynnistymiselle. CaMKII-inhibitio paradoksaalisesti lisää eksitabiliteettia — tarkka säätely on kriittistä." },
      { scale: "10⁻⁶ m", link: "ELF → VGCC-ekspressio↑ (ELF-priming)", evidence: "Sun 2016 Sci.Rep.: 8-10 pv → Ca²⁺ dramaattisesti↑, Cav1-proteiini↑", status: "confirmed", detail: "Krooninen ELF-altistus (50/60 Hz) säätelee VGCC-proteiinin ekspressiota ylöspäin — enemmän kanavia per solu → solut tulevat herkemmiksi KAIKELLE myöhemmälle EMF:lle. Tämä on ELF-priming: tausta 50 Hz -verkko herkistää väestön." },
      { scale: "10⁻⁶ m", link: "ELF → kohtausalttius↑ neokorteksissa", evidence: "Varró 2009: transientti primausefekti", status: "confirmed", detail: "ELF-EMF tehostaa synaptista fasilitaatiota hippokampuksessa JA kasvattaa kohtausalttiutta neokorteksissa. Vaikutus on ohimenevä — osoittaen, että ELF moduloi neuronaalista eksitabiliteettia akuutisti." },
      { scale: "10⁻⁵ m", link: "GABA eksitatorinen → Q→∞ neonataalissa", evidence: "PMC7847733, bumetanidi palauttaa inhibition, KCC2 kypsyy", status: "confirmed", detail: "Vastasyntyneillä NKCC1-dominanssi tekee GABAsta eksitatorisen (γ < 0). Tämä tarkoittaa Q-tekijä → ∞: aivot ovat vaimentamaton resonaattori. Bumetanidi salpaa NKCC1:n → GABA muuttuu inhibitoriseksi → kohtaukset loppuvat. KCC2 kypsyy kuukausien kuluessa → Q laskee." },
      { scale: "10⁻⁴ m", link: "Primattu + EMF → kohtaukset", evidence: "López-Martín 2006/2009: pulssimoduloitu > CW", status: "confirmed", detail: "Avainkokeilu: subkonvulsiivinen pikrotoksiini (vähentää γ:tä) + GSM 900 MHz = kohtaukset. Kumpikaan yksin ei riitä. Pulssimoduloitu GSM on tehokkaampi kuin jatkuva aalto — biologinen vaikutus riippuu nimenomaisesta pulsaatiosta, ei SAR:sta." },
      { scale: "10⁻³ m", link: "CSD → aivorunko → kuolema", evidence: "SUDEP = 'aikuisten SIDS'; CACNA1A-malli; L-tyypin Ca²⁺-ant. ESTI kuoleman", status: "confirmed", detail: "Spreading depolarization joka leviää aivorunkoon aiheuttaa sydänhengityspysähdyksen. Tämä on SUDEP ja SIDS. L-tyypin VGCC-antagonisti esti kohtauksen aiheuttaman kuoleman SUDEP-hiirimallissa — suora todiste siitä, että Ca²⁺-salpaus estää terminaalisen tapahtuman." },
      { scale: "10⁻² m", link: "Melatoniini↓ → sydänrytmihäiriö", evidence: "Pinealektomia → rytmihäiriöt↑; melatoniinilisä → suoja", status: "confirmed", detail: "Pinealektomia kasvattaa reperfuusiorytmihäiriöitä. Krooninen melatoniinilisä antaa rytmihäiriösuojan antifibroottisten vaikutusten, Cx43:n säilymisen ja mitokondriaalisen suojan kautta. EMF suppressoi melatoniinia CRY-reitin kautta → sydänriski kasvaa." },
      { scale: "10⁻² m", link: "PGC → melatoniini↓ → patologia", evidence: "r=0,569 kalsifioitumaton kudos↔melatoniini; AD: 76 % vs 64 % PGC", status: "confirmed", detail: "Pineaalirauhasen kalsifikaatio (PGC) vähentää suoraan melatoniinin tuotantoa (r=0,569). Alzheimerin potilailla on korkeampi PGC (76 % vs 64 %). PGC on konvergentti mekanismi: EMF + raskasmetallit + fluoridi kaikki kiihdyttävät sitä." },
      { scale: "10⁻² m", link: "Uni↓ → GABA↓ → Q↑", evidence: "Univaje aktivoi epileptiformisia purkauksia 23-62 %:ssa", status: "confirmed", detail: "Univaje vähentää GABA:n toonista inhibitiota (γ pienenee → Q kasvaa). Tätä käytetään kliinisesti epilepsian diagnostisena provokaationa. EMF→melatoniini↓→uni↓→GABA↓ luo takaisinkytkentäsilmukan 4 (Walkerin ketju)." },
      { scale: "10⁻¹ m", link: "Prenataalinen Ca²⁺-häiriö → jälkeläisen γ↓", evidence: "Sevofluraani → interneuronihäiriö → γ↓ pysyvästi", status: "partial", detail: "Äidin sevofluraanialtistus (Ca²⁺-modulaattori) häiritsee interneuronien kehitystä → pysyvä GABAergisen inhibition puutos jälkeläisessä. Osoittaa, että prenataalinen Ca²⁺-häiriö voi pysyvästi muuttaa vaimennusta. Osittainen: mekanismi osoitettu sevofluraanilla, ei vielä suoraan EMF:llä." },
      { scale: "10⁰ m", link: "Farmakologia kohdistuu Ca²⁺-kaskadiin", evidence: "Etosuksimidi, gabapentiini, verapamiili, melatoniini, litium, psilosybiini, bumetanidi", status: "confirmed", detail: "Jokainen tehokas hoito BERM:n ennustamiin tiloihin kohdistuu Ca²⁺-kaskadin komponenttiin. Tämä farmakologinen konvergenssi on mallin ennustama ja olisi poikkeuksellinen sattuma muuten." },
      { scale: "10³ m", link: "Epidemiologinen eliminaatio", evidence: "Klimentidis p=10⁻⁷ (8 lajia), Mazur painovakaat T↓, 54 maan R²=0,851", status: "partial", detail: "Lajienvälinen liikalihavuustrendi (8 lajia, p=10⁻⁷) eliminoi ruokavalion/liikunnan ainoana syynä. 54 maan EMF-terveyskorrelaatio R²=0,851. Osittainen: epidemiologinen evidenssi on korrelatiivista, ei interventionaalista." },
      { scale: "10⁻⁶ m", link: "VK9: EMF → BBB-permeabiliteetti↑", evidence: "PMC12829706: RF → eNOS↑ + okludiini↓; melatoniini suojaa (PMC6932927)", status: "confirmed", detail: "RF-EMF kasvattaa veri-aivoesteen läpäisevyyttä eNOS-ylösäätelyn ja okludiinin alassäätelyn kautta. Melatoniini suojaa tiiviin liitoksen proteiineja. EMF→melatoniini↓ luo kaksinkertaisen BBB-haavoittuvuuden: suora avautuminen + melatoniinisuojan menetys." },
      { scale: "10⁻⁵ m", link: "VK10: 5G → BAT PRDM16↓ → termogeneesi↓", evidence: "PMC11942954: 3,5 GHz → PRDM16↓, C/EBPβ↓", status: "confirmed", detail: "5G (3,5 GHz) vähentää PRDM16- ja C/EBPβ-mRNA:ta ruskeassa rasvakudoksessa. BAT käyttää Ca²⁺-sykliä (SERCA) termogeneesiin — VGCC-välitteinen mekanismi. Yhdistää EMF:n Klimentidiksen liikalihavuusparadoksiin: 8 lajia lihoo samanaikaisesti ilman ruokavaliomuutosta (p=10⁻⁷)." },
      { scale: "10⁻³ m", link: "VK11: EMF → HPA-akseli → kortisoli↑", evidence: "Klimek 2023: ELF → HPA-sensitisaatio; RF → kortikosteroni↑ (Frontiers 2026)", status: "confirmed", detail: "ELF-EMF asettaa HPA-akselille uuden asetuspisteen sensitisaation eikä adaptaation kautta. RF-EMF lisää ahdistusta ja kortikosteronia. HPA-akseli EI tottu krooniseen EMF:ään — se herkistyy, tuottaen progressiivisesti korkeampaa kortisolitasoa." },
      { scale: "10⁻⁵ m", link: "VK12: EMF → β-solun Ca²⁺ → insuliinihäiriö", evidence: "PMID:32323041: sähkökenttä → insuliini ilman glukoosia; CaVγ4→CaMKII→MafA (PMC9030882)", status: "confirmed", detail: "Sähkökentät indusoivat insuliinierityksen β-soluista ILMAN glukoosia Ca²⁺-kanavien kautta. CaVγ4→CaMKII→MafA-reitti kontrolloi β-solun kypsyyttä — CaMKII-häiriö aiheuttaa β-solun identiteetin menetyksen. Yhdistää EMF:n suoraan tyypin 2 diabeteksen patogeneesiin." },
      { scale: "10⁻³ m", link: "VK13: EMF → hypotalamuksen synapttiset vesikkelit↓", evidence: "Kim 2019: 835 MHz 12vk → vesikkelit↓, synapsiini I/II↓, synaptotagmiini 1↓", status: "confirmed", detail: "835 MHz (12 viikkoa) vähentää synaptisten vesikkelien lukumäärää, kokoa ja telakoitumista hypotalamuksessa, plus synapsiini I/II ja synaptotagmiini 1 (Ca²⁺-sensori vapautumiselle). KAIKKIEN hypotalamuksen hormonien vapautuminen heikkenee — selittäen miksi EMF häiritsee samanaikaisesti GnRH:a, CRH:a, TRH:a, GHRH:a ja dopamiinisäätelyä." },
      { scale: "10⁻² m", link: "VK14: Kortisoli↑ → hippokampuksen atrofia", evidence: "Sapolsky 2009: dendriittien vetäytyminen + neurogeneesi↓; kortisoli→AD (Frontiers 2026)", status: "confirmed", detail: "Krooninen kortisoli aiheuttaa hippokampuksen dendriittien vetäytymisen, neurogeneesin loppumisen ja volyymin pienenemisen. Hippokampus on HPA:n negatiivinen palautekeskus — sen vaurioituminen poistaa kortisolijarrun → kortisoli↑↑ (silmukka S6). Nopeuttaa Alzheimerin etenemistä." },
      { scale: "10⁻⁵ m", link: "VK15: EMF → Leydig → StAR↓ → T↓", evidence: "Useita: RF → Leydig-morfologiamuutokset, StAR↓, T↓ annosriippuvaisesti", status: "confirmed", detail: "EMF vähentää StAR-proteiinia Leydig-soluissa — steroidogeneesin nopeutta rajoittava vaihe. Molekulaarinen mekanismi väestötason T↓:n takana painosta riippumatta, vahvistettu Mazurin painovakaalla datalla." },
      { scale: "10⁻⁵ m", link: "VK16: EMF → VGCC → Ca²⁺ → syöttösolujen degranulaatio", evidence: "Johansson 2000: EMF → syöttösolumuutokset ihossa; kardiaaliset syöttösolut → rytmihäiriöt (PMC6896164)", status: "confirmed", detail: "Ca²⁺ laukaisee syöttösolujen degranulaation. EMF → VGCC → Ca²⁺ → syöttösolu vapauttaa histamiinia + IL-1β + tryptaasia. Näyttöpäätealtistettujen iho-biopsiat osoittavat muutoksia. Kardiaaliset syöttösolut → rytmihäiriöt. IL-1β syöttösoluista → KCC2↓ → GABA eksitatorinen pidempään." },
      { scale: "10⁻⁶ m", link: "VK17: RF → CatSper Ca²⁺ → siittiön energiankulutus", evidence: "2100 MHz aktivoi CatSperin ennenaikaisesti; siittiö-meta SMD -1,92 (Environ Int 2024)", status: "confirmed", detail: "RF-EMF aktivoi CatSper Ca²⁺ -kanavat siittiöissä ennenaikaisesti aiheuttaen energiankulutuksen ennen munasoluun pääsyä. Siittiö-meta-analyysi osoittaa DNA/kromatiinivaurion matkapuhelimen SAR-tasoilla (SMD -1,92, 95% CI -2,78 – -1,05). Pb²⁺ kilpailee Ca²⁺:n kanssa siittiön akrosomissa — raskasmetalli-synergia hedelmällisyydessä." },
      { scale: "10⁻⁵ m", link: "VK18: SCN Ca²⁺ -oskillaatio = sirkadiaaninen kello", evidence: "PMC6170461: SCN-neuronit oskilloivat Ca²⁺:ssa vuorokausirytmillä", status: "confirmed", detail: "SCN-neuronit oskilloivat Ca²⁺-pitoisuudessa vuorokausirytmillä — Ca²⁺-oskillaatiot OVAT sirkadiaanisen kellon fysikaalinen perusta. EMF häiritsee Ca²⁺:ta → EMF häiritsee itse kelloa. SCN on pääkello joka synkronoi hypotalamuksen ja periferiset kellot." },
      { scale: "10⁻⁷ m", link: "VK19: Tulehdus → DA↓ → motivaation menetys", evidence: "Berridge: NAcc DA = 'wanting'; IFN-α → striataalinen DA↓ → anhedonia (PMC9718669)", status: "confirmed", detail: "Accumbens-tumakkeen dopamiini välittää 'wantingin' (motivaation) mutta ei 'likingiä' (mielihyvää). Tulehdus (IFN-α) vähentää striataalista dopamiinia aiheuttaen anhedoniaa, palautettavissa L-DOPAlla. Matala tooninen DA kasvattaa faasista vastetta → ruudut tuntuvat palkitsevammilta matalalla DA-tasolla. EMF→tulehdus→DA↓→riippuvuusalttius." },
      { scale: "10⁻⁶ m", link: "VK20: Cav1.2 → OPC-erilaistuminen → myelinaatio", evidence: "PMC6916379: Cav1.2 KO → hypomyelinaatio; SMF → Cav1.2↑ OPC:issä (Sci Rep 2017)", status: "confirmed", detail: "Cav1.2 (L-tyypin VGCC) on välttämätön oligodendrosyyttiprogenitorisolujen erilaistumiselle ja myelinaatiolle. Cav1.2-poistogeeni aiheuttaa hypomyelinaation. Staattinen magneettikenttä kasvattaa Cav1.2/Cav1.3-ekspressiota OPC:issä. EMF-indusoitu Cav1.2-häiriö → myelinaation ajoitushäiriö kehittyvissä aivoissa." },
      { scale: "10⁻⁵ m", link: "VK21: NK-solujen Ca²⁺ → immunovalvonta", evidence: "Ca²⁺→NFAT1→grantsyymi B (PLoS ONE 2024); 50 Hz ELF→NK↓; 200 kHz TTFields→NK↑", status: "confirmed", detail: "NK-solujen sytotoksisuus on Ca²⁺-riippuvaista: Ca²⁺-sisäänvirtaus aktivoi NFAT1 → grantsyymi B -ekspressio. 50 Hz ELF suppressoi NK-sytotoksisuutta kun taas 200 kHz TTFields KASVATTAA sitä — suora validaatio taajuusriippuvaisesta reittihierarkiasta. Sama VGCC-mekanismi, vastakkaiset lopputulokset eri taajuuksilla." },
      { scale: "10⁻⁵ m", link: "VK22: Kortisoli → GnIH → GnRH↓ → T↓", evidence: "PMC5380668: GnIH-hiljennys palautti hedelmällisyyden; RF9 palautti T:n kortisolikäsitellyissä kädellississä (PMC7946976)", status: "confirmed", detail: "Stressi indusoi GnIH/RFRP-3:n joka suppressoi GnRH → LH → testosteroni. GnIH-geenin hiljennys PALAUTTI hedelmällisyyden stressatuissa eläimissä. RF9 (GnIH-antagonisti) PALAUTTI testosteronin hydrokortisonikäsitellyissä kädellississä. CRF suppressoi suoraan GnRH-pulssigeneraattoria. Kolme itsenäistä reittiä T↓:iin." },
      { scale: "10⁻⁶ m", link: "VK23: BDNF-hormeesi — RF↓ vs ELF↑", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ (PMC10275548); ELF 50 Hz → BDNF↑ + neurogeneesi↑ (PMC5702423)", status: "confirmed", detail: "RF-EMF vähentää BDNF:ää hippokampuksessa (2650 MHz, 28 pv: BDNF↓, GABA↓, GR↓, kortikosteroni↑). Postnataalinen RF (835 MHz) aiheuttaa dendriittien piikkien menetyksen + muistihäiriön. Samalla ELF 50 Hz KASVATTAA BDNF:ää ja edistää neurogeneesiä. Taajuusriippuvainen hormeesi: sama reitti, vastakkainen suunta." },
      { scale: "10⁻⁵ m", link: "VK24: Per2 → suoliston este → LPS → neurotulehdus", evidence: "Per2 KO → suoliston este↓ → LPS → hippokampaalinen neurogeneesi↓ → masennus (PMC12631932)", status: "confirmed", detail: "Per2-poistogeeni suoliston epitheelissä häiritsee esterakennetta → LPS pääsee verenkiertoon → neurotulehdus → hippokampuksen neurogeneesi↓ → masennus. Sirkadiaanisen rytmin häiriö muuttaa suolistomikrobiomia (Ruminococcus↑, Lactobacillus↓, LPS-synteesigeenit↑). Kaksoisestemekanismi: BBB + suoliston este jakavat ZO-1:n, okludiinin, klaudiinit." },
      { scale: "10⁰ m", link: "VK25: Uni↓ → T↓ → Walkerin ketju suljettu", evidence: "JAMA 2011: 5h uni → T -10-15 %; meta-analyysi vahvistaa (PMID:34801825)", status: "confirmed", detail: "Viikko 5h unta vähentää testosteronia 10-15 %, vastaten 10-15 vuoden ikääntymistä. Walkerin ketju on nyt suljettu: EMF→melatoniini↓→uni↓→T↓→neuroprotektio↓→enemmän EMF-vaurioita. Unirajoituksen + EMF:n ennustetaan tuottavan superadditiivisen T-laskun (>25 % yhdistettynä vs ~15 % uni yksin)." },
      { scale: "10⁻⁵ m", link: "VK26: EMF → HPT-akseli → Dio2/Dio3↓ → piilevä hypotyreoosi", evidence: "PMC11507962: LTE → Dio2/Dio3↓ hypotalamuksessa; PMID:35963949: FT3↓ + FT4↑ ELF-työntekijöillä", status: "confirmed", detail: "EMF vähentää Dio2- ja Dio3-dejodinaasientsyymejä hypotalamuksessa. T4→T3-muunnos on heikentynyt → veren T4 näyttää normaalilta mutta kudokset eivät saa aktiivista T3:a. Normaalit kilpirauhaustestit (TSH, T4) ohittavat tämän piilevän puutteen. FT3/FT4-suhde on diagnostinen avain." },
      { scale: "10⁻⁸ m", link: "VK27: EMF → epigenetiikka → transgenerationaalinen periytyminen", evidence: "ScienceDirect 2024: DNMT1 + HDAC + DICER1; PMC4538330: siittiöiden metylaatio annosriippuvainen", status: "confirmed", detail: "EMF muuttaa kolmea epigeneettistä mekanismia: DNA-metylaatio (DNMT1), histonimodifikaatio (HDAC) ja mikroRNA-biogeneesi (DICER1/DGCR8). Siittiöissä: 50 Hz ELF tuottaa kaksisuuntaisia annosriippuvaisia metylaatiomuutoksia (↓ 1 mT:ssä, ↑ 3 mT:ssä). DDT:n transgenerationaalinen malli tarjoaa mallin F3-säilymiselle." },
      { scale: "10⁻⁷ m", link: "VK28: EMF → ROS → telomeerit → ikääntymiskierre", evidence: "PMID:36582083: säteily → ROS → telomeerivaurio; mel → telomeraasi + SIRT1 (Front Aging Neurosci 2022)", status: "confirmed", detail: "EMF→ROS vaurioittaa telomeereja (G-rikkaat sekvenssit ovat erityisen haavoittuvia). Samanaikaisesti EMF→melatoniini↓ poistaa telomeraasi- + SIRT1-suojan. Masennus = 281 bp lyhyemmät telomeerit = 7 vuotta kiihtynyttä ikääntymistä. Melatoniini on avain-anti-aging-molekyyli: se aktivoi telomeraasia, säätelee SIRT1:tä ylös ja vähentää ROS:ia." },
      { scale: "10⁻⁸ m", link: "VK29: EMF → oksitosiinin Ca²⁺-häiriö → sosiaalinen side↓", evidence: "PMC3197583: OXT-vapautus vaatii N-tyypin + L-tyypin VGCC:t; eNeuro 2025: PVN Ca²⁺ → OXT", status: "confirmed", detail: "Oksitosiinin somatodendriittinen vapautuminen vaatii Ca²⁺-virtauksen sekä N-tyypin että L-tyypin VGCC-kanavien kautta. EMF häiritsee VGCC-toimintaa → OXT-vapautus häiriintyy. L-tyyppi on erityisen tärkeä vastasyntyneillä. Insuliini→OXT Ca²⁺:n kautta yhdistää metaboliset ja sosiaaliset järjestelmät. Nelilukko: T↓×F↑×DA↓×OXT↓ = täydellinen sosiaalinen-reproduktiivinen romahdus." },
      { scale: "10⁻⁵ m", link: "VK30: ELF-primaami → α2δ-1↑ → krooninen kipu ILMAN neuropatiaa", evidence: "PMID:16764990: α2δ-1-yliekspressio yksin → kipu; Br J Pharmacol 2018: gabapentiini estää α2δ-1:n", status: "confirmed", detail: "ELF-primaami (VK4) säätelee VGCC-ekspressiota ylös mukaan lukien α2δ-1. α2δ-1-yliekspressio yksin tuottaa neuropaattista kipukäyttäytymistä ILMAN hermovauriota. Gabapentinoidit (gabapentiini, pregabaliini) kohdistuvat täsmälleen α2δ-1:een. Kroonisen kivun epidemia on konsistentti väestötason ELF-primaamin α2δ-1:n kanssa." },
      { scale: "10⁻⁵ m", link: "VK31: ASD = BERM-prototyyppi (GABA-vaihto + α2δ + tulehdus → E/I↑)", evidence: "NKCC1/KCC2↑ ASD:ssä (Front Psychiatry 2025); CACNA2D3 autismigeeni; bumetanidi-RCT:t", status: "confirmed", detail: "ASD yhdistää kolme itsenäisesti verifioitua BERM-mekanismia: GABA-vaihdon viiveen (VK6, KCC2↓→GABA eksitatorinen), ELF-primaami-synaptogeneesin (VK4+VK30, α2δ-1↑→E/I↑) ja tulehduksen aiheuttaman KCC2-suppression (S9, IL-1β→KCC2↓). CACNA2D3 on autismin alttiusgeeni. KCC2-sukupuolidimorfismi selittää 4:1 poikien yliedustuksen. Bumetanidi (NKCC1-estäjä) parantaa ASD-oireita RCT:issä." },
      { scale: "10⁻⁵ m", link: "VK41: ADHD = toinen prototyyppi (PFC-viive + DA-Kultakutri + E/I-siirtymä)", evidence: "Shaw 2007 PNAS: PFC-viive 5 v; Arnsten 2009: DA käänteinen U; ASD-ADHD 30-50 % komorbiditeetti", status: "confirmed", detail: "ADHD yhdistää kolme BERM-mekanismia: DA-puutos PFC:ssä (VK19: striatumin DA↓ → tarkkaavaisuus↓), myelinaatioviive (VK20: Cav1.2→OPC → PFC kypsyy 5 VUOTTA myöhemmin) ja E/I-siirtymä (VK6: KCC2↓). ASD ja ADHD jakavat 30-50 % komorbiditeetin — sama mekanismi, eri Q-arvot herätettävyysspektrissä." },
      { scale: "10⁻² m", link: "VK42: Vuorotyö → IARC 2A → syöpä melatoniinisuppression kautta", evidence: "IARC Monograph 98 2010; meta-analyysi rintasyöpä OR 2,34; melatoniini antitumoraalinen (Reiter 2017)", status: "confirmed", detail: "IARC luokittelee vuorotyön ryhmään 2A (todennäköisesti karsinogeeninen) melatoniinisuppression kautta. EMF suppressoi melatoniinia SAMAN mekanismin kautta (VK3: PGC). Jos IARC hyväksyy vuorotyön vuorokausirytmihäiriön 2A-tasoisena evidenssinä syövälle, niin EMF-aiheuttaman vuorokausirytmihäiriön tulisi kantaa sama evidentiaalinen paino." },
      { scale: "10⁻⁵ m", link: "VK43: Verapamiili → β-solun Ca²⁺-suoja T1D:ssä", evidence: "Forlenza JAMA 2023 RCT N=88: C-peptidi +30 %; Ovalle Nat Med 2018; Diabetes Care 2025", status: "confirmed", detail: "Verapamiili (Cav1.2-salpaaja) suojaa β-solujen toimintaa lasten uudessa T1D:ssä: C-peptidi +30 % vs plasebo 52 viikossa. Kaksoissokkoutettu RCT (N=88, ikä 7-17). Vahvistaa VK12:n: β-solun Ca²⁺-häiriö aiheuttaa identiteetin menetyksen. Jos Ca²⁺-kanavien esto pelastaa β-solut, niin Ca²⁺-ylikuorma (EMF:stä) tuhoaa ne." },
      { scale: "10⁻⁴ m", link: "VK44: Ennenaikainen synnytys = kohdun VGCC → nifedipiini-tokolyysi", evidence: "Cochrane 2014: nifedipiini ensilinjan tokolyyttinen; P4:E2→Cav1.2 (PMC3816733)", status: "confirmed", detail: "Kohdun supistukset riippuvat Ca²⁺-virtauksesta VGCC:n kautta. Nifedipiini (Ca²⁺-kanavasalpaaja) on ensilinjan tokolyyttinen aine — Cochrane-evidenssi. Progesteroni:estradioli-suhde säätelee Cav1.2-ekspressiota kohdussa. Jos Ca²⁺-esto estää ennenaikaisen synnytyksen, niin Ca²⁺-ylikuorma on syy." },
      { scale: "10⁻⁵ m", link: "VK45: ALS = motoneuronin Ca²⁺-haavoittuvuus (4. neurodegeneraatio)", evidence: "PMC4452055: motoneuronin matala Ca²⁺-puskurointi; Ca²⁺-läpäisevä AMPA; rilutsoli epäsuora Ca²⁺↓", status: "confirmed", detail: "Motoneuroneilla on matala Ca²⁺-puskurointikapasiteetti + Ca²⁺-läpäisevät AMPA-reseptorit → selektiivisesti haavoittuvia Ca²⁺-ylikuormalle. Rilutsoli (ainoa ALS-lääke vuosikymmeniin) toimii epäsuorasti: Na⁺-esto → glutamaatti↓ → Ca²⁺↓. Neljäs neurodegeneraatio Ca²⁺-mekanismilla (AD, MS, PD jälkeen). Ammatillinen EMF: OR 1,3-1,7." },
      { scale: "10⁻⁶ m", link: "VK46: Suolisto-aivo-5-HT-akseli (90 % serotoniinista suolistossa)", evidence: "Cell Host Microbe: 90 % 5-HT suolistossa; PMC7231603: Trp→aivot; suoliston melatoniini", status: "confirmed", detail: "Yli 90 % serotoniinista tuotetaan suoliston enterokromafiinisoluissa. Suoliston mikrobiota säätelee tryptofaanin saatavuutta aivoihin → sentraalinen 5-HT-synteesi. Melatoniinia syntetisoidaan myös serotoniinista suolistossa. IBS-masennus-komorbiditeetti heijastaa jaettua suolisto-aivo-5-HT-häiriötä. Yhdistää S14:n (Per2→suolisto) S2:een (serotoniinikko-auki)." },
      { scale: "10⁻⁵ m", link: "VK47: Allergiat = syöttösolun Ca²⁺-degranulaatio (nelinkertainen herkistyminen)", evidence: "ScienceDirect 2011: Ca²⁺-ionoforit → degranulaatio ILMAN IgE:tä; env. estrogeenit → syöttösolu↑", status: "confirmed", detail: "Syöttösolun degranulaatio on Ca²⁺-riippuvainen: Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE:tä, Ca²⁺-depletio estää sen IgE:n KANSSA. Nelinkertainen herkistyminen: (1) EMF→VGCC→Ca²⁺ syöttösoluissa, (2) ympäristöestrogeenit→syöttösolujen herkistyminen, (3) kortisoli→Th1→Th2-siirtymä, (4) suolistoesteen→LPS→systeeminen tulehdus." },
      { scale: "10⁻⁴ m", link: "VK48: Pre-eklampsia = raskauden Cav1.2 + ROS -häiriö", evidence: "PMC9774363: Cav1.2 verenpaineen säätely; ET-1→Cav1.2 istukassa; nifedipiini pre-eklampsiassa", status: "confirmed", detail: "Pre-eklampsia sisältää Cav1.2 + ROS -häiriön raskaudessa. ET-1 aktivoi Cav1.2:n istukan suonissa; nifedipiini estää tämän osittain. Ca²⁺-kipinätaajuus on alentunut pre-eklampsiassa → vasodilataatio↓. Nifedipiiniä käytetään sekä tokolyysiin ETTÄ pre-eklampsian verenpaineeseen — sama Ca²⁺-mekanismi reproduktiivisessa kudoksessa." },
      { scale: "10⁻⁴ m", link: "VK49: Osteoporoosi + PEMF-hormesiparadoksi", evidence: "Frontiers Endocrinol 2024: Ca²⁺-kanavat luussa; PMC11919207: PEMF → luun kasvu", status: "confirmed", detail: "Ca²⁺-kanavat säätelevät sekä osteoklasteja että osteoblasteja. PEMF-hoito edistää luun kasvua ja vähentää tulehdusta — näennäisesti ristiriidassa BERM:n kanssa. Ratkaisu: Lindgrenin hormesi. Kontrolloidut PEMF-parametrit → hyödyllinen Ca²⁺-transientti; krooninen hallitsematon EMF → Ca²⁺-ylikuorma. PEMF validoi, että EMF vaikuttaa Ca²⁺-kanavien kautta." },
      { scale: "10⁻⁸ m", link: "VK50: D-vitamiini → CACNA1C/1D mRNA↓ (10. moderaattori)", evidence: "J Neurosci 2001: VDH→L-VSCC↓; PLoS ONE 2011: VDR-hiljennys → Cav1.2↑; Transl Psychiatry 2019", status: "confirmed", detail: "D-vitamiini (1,25(OH)₂D₃) vaimentaa CACNA1C- ja CACNA1D-mRNA:ta — luonnon kanavasalpaaja. VDR-hiljennys estää Cav1.2/Cav1.3-alassäätelyn. D-vitamiinipuutos → VGCC-yliekspressio = sama tila kuin ELF-primaami. Kolmoisisku: CACNA1C-variantti + matala D-vitamiini + EMF = korkein riski (skitsofrenia). 10. BERM-moderaattori." },
      { scale: "10⁻⁶ m", link: "VK51: CatSper = siittiöspesifinen Ca²⁺-kanava (5 infertiliteettireittiä)", evidence: "RBMO 2014: knockout = steriili; Nature Comms 2025: lämpötilakynnys Q₁₀=5,1; JCI 2024: ihmismutaatiot", status: "confirmed", detail: "CatSper on AINOA siittiöspesifinen Ca²⁺-kanava — knockout-urokset ovat täysin steriilejä normaalista siittiötuotannosta huolimatta. Lämpötilakynnys 33,5°C (Q₁₀=5,1): ennenaikainen aktivaatio → energian ehtyminen → kuolema ennen munasoluun pääsyä. Viisi itsenäistä reittiä miehen infertiliteettiin: hormonaalinen (T↓), DNA (ROS), epigeneettinen (metylaatio), kanava (CatSper) ja terminen." },
      { scale: "10⁻⁷ m", link: "VK52: Psilosybiini = Ca²⁺-kaskadin resetti 5-HT2A→BDNF→mTOR kautta", evidence: "Trends Pharmacol Sci 2025; Science 2023: solunsisäinen 5-HT2A; Mol Psychiatry 2025", status: "confirmed", detail: "Psilosybiini edistää dendriittipiikkien kasvua 5-HT2A→Gq→Ca²⁺→BDNF→mTOR-reitin kautta — kääntäen täsmälleen VK14:n (kortisoli→dendriittiatrofia) ja VK23:n (BDNF↓) patologiat. Solunsisäinen 5-HT2A-aktivaatio vaaditaan (Science 2023) — serotoniini itsessään ei pääse näihin reseptoreihin. Farmakologinen RESETTI Ca²⁺-vaurioituneelle hermoarkkitehtuurille." },
      { scale: "10⁻⁷ m", link: "VK53: Kofeiini = A2A→Ca²⁺-modulaatio → PD-neuroprotektio", evidence: "Frontiers Neurosci 2020: PD käänteinen yhteys; PMID:11319241: MPTP-suoja; J Neurol Sci 2016", status: "confirmed", detail: "Vahva epidemiologinen käänteinen yhteys kofeiinin ja Parkinsonin taudin välillä. A2A-reseptorin antagonismi → DA-neuronien suoja MPTP/6-OHDA-malleissa. Neuroprotektio ylittää PD:n: aivohalvaus, eksitotoksisuus, α-synukleiinin puhdistuma. Kofeiini on AINOA luonnollinen Ca²⁺-modulaattori jonka kulutus KASVAA — mahdollisesti kompensoiva itselääkintä." },
      { scale: "10⁰ m", link: "VK54: Litium juomavedessä → dementia↓ + itsemurha↓", evidence: "Int J Bipolar Disord 2024: 5 tutkimusta dementia↓; Br J Psychiatry 2020: itsemurha-meta; ScienceDirect 2026: US maakunnat", status: "confirmed", detail: "Korkeampi luonnollinen litium juomavedessä yhdistyy matalampiin dementia- ja itsemurhalukuihin väestötasolla. GSK-3β-esto + CaMKII-modulaatio + BDNF↑ + vuorokausirytmin stabilointi = useita BERM Ca²⁺-kaskadin solmukohtia. Moderni vedensuodatus POISTAA litiumin — viides luonnollinen suojamekanismi häviää." },
      { scale: "10⁻⁵ m", link: "VK55: Amygdalan hypertrofia ↔ hippokampuksen atrofia (S17-silmukka)", evidence: "PNAS 2008: yksi kortisoli-annos → BLA-hypertrofia; PLoS ONE 2012: vastakkainen BDNF; Neurosci Lett 2023: pysyvyys", status: "confirmed", detail: "Kortisoli tuottaa VASTAKKAISET vaikutukset amygdalassa vs. hippokampuksessa: BLA saa dendriittejä samalla kun hippokampus menettää niitä. BDNF↑ amygdalassa / BDNF↓ hippokampuksessa saman kortisolin alla. BLA-hypertrofia säilyy 21+ päivää stressin jälkeen. S17: kortisoli→amygdala↑→ahdistus↑→kortisoli↑ = itseään vahvistava ahdistuskierre." },
      { scale: "10³ m", link: "VK56: Amish = BERM:n lähin kontrolliryhmä (vahvistettu varauksella)", evidence: "STAT 2025: lihavuus -89 %, T2D -75 %; Anderson & Potts 2022: 126 tutkimuksen katsaus; massiiviset lifestyle-konfoundarit", status: "partial", detail: "Vanhojen sääntöjen amishilla dramaattisesti matalammat luvut JOKAISESSA BERM:n ennustamassa tilassa. Massiiviset konfoundarit (ruokavalio, liikunta, tupakointi, yhteisö) estävät suoran attribuution. Ristiin vahvistettu Klimentidisin (eläimet lihovat kontrollidieetillä, p=10⁻⁷) ja Mazurin (painovakaat T↓) tutkimuksilla. Amish-Mennonite-EMF-gradienttitesti olisi kriittinen erottelija." },
    ],
    chainHeaders: { scale: "Skaala", link: "Ketjun linkki", evidence: "Evidenssi", status: "Status" },
    chainSummary: "57 verifioitua linkkiä 47 kerroksessa (VK1–VK31, VK41–VK56). Ketju on katkeamaton fotonifysiikasta väestöepidemiologiaan, kattaen nyt CatSperin hedelmällisyyden, psilosybiinin hermoreset:n, kofeiinin neuroprotektion, litiumveden epidemiologian, amygdalan ahdistussilmukan ja Amish-kontrolliryhmän — sekä kaikki mekanismit ADHD-prototyypistä D-vitamiinimodulaattoriin.",

    feedbackTitle: "Seitsemäntoista positiivista takaisinkytkentäsilmukkaa",
    feedbackLead:
      "Konvergenssiverifiointi paljasti seitsemäntoista itseään vahvistavaa sykliä ketjun sisällä. Silmukat muodostavat verkoston: mikä tahansa sisääntulopiste aktivoi useita rappeutumisspiraleja samanaikaisesti. Jokainen silmukka tarkoittaa, että alkuperäiset EMF-vaikutukset voivat asteittain pahentua ilman altistuksen kasvua — järjestelmä rapautuu itse.",
    feedbackLoops: [
      {
        name: "Monitorin palauteresonanssi",
        id: "S1",
        steps: ["Vauvan ääni → mikrofoni → RF-modulaatio", "RF → VGCC → Ca²⁺ → voimakkaampi oskillaatio", "Voimakkaampi oskillaatio → kovempi ääni → lisää RF-modulaatiota", "Kaskadivahvistus"],
        status: "Mekanistisesti koherentti, testaamaton kokonaisuutena",
        statusColor: "amber",
      },
      {
        name: "Serotoniin-lukitusavaus",
        id: "S2",
        steps: ["EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓", "5-HT↓ → talamokortikaalinen portti AUKI", "Avoin portti → EMF tunkeutuu SYVEMMÄLLE piireihin", "Lisää CaMKII-häiriötä → lisää 5-HT↓ → ..."],
        status: "Jokainen linkki verifioitu itsenäisesti",
        statusColor: "green",
      },
      {
        name: "Hypoksia-NKCC1",
        id: "S3",
        steps: ["CSD → paikallinen hypoksia → NKCC1↑", "NKCC1↑ → GABA eksitatorisempi → γ↓ → Q↑", "Q↑ → CSD leviää HELPOMMIN", "Lisää CSD:tä → lisää hypoksiaa → lisää NKCC1↑ → ..."],
        status: "NKCC1↑ hypoksiassa verifioitu",
        statusColor: "green",
      },
      {
        name: "Walkerin uniketju",
        id: "S4",
        steps: ["EMF → melatoniini↓ → uni↓", "Uni↓ → GABA-tooninen inhibitio↓ → γ↓ → Q↑", "Q↑ → EMF vaikuttaa aivoihin ENEMMÄN", "Lisää melatoniini↓ → huonompi uni → vähemmän GABAa → ..."],
        status: "Jokainen linkki verifioitu itsenäisesti",
        statusColor: "green",
      },
      {
        name: "PGC → BBB -spiraali",
        id: "S5",
        steps: ["EMF → PGC → melatoniini↓", "Melatoniini↓ → BBB tiiviin liitoksen proteiinit↓", "BBB↓ → raskasmetallit pääsevät aivoihin HELPOMMIN", "Raskasmetallit → lisää PGC:tä → vähemmän melatoniinia → ..."],
        status: "Jokainen linkki verifioitu itsenäisesti",
        statusColor: "green",
      },
      {
        name: "Kortisoli-hippokampus-pyörre",
        id: "S6",
        steps: ["EMF → HPA → kortisoli↑", "Kortisoli↑ → hippokampuksen atrofia", "Hippokampus↓ → HPA:n negatiivinen palaute MENETETTY", "Ei jarrua → kortisoli↑↑ → lisää atrofiaa → ..."],
        status: "[[ref:sapolsky2009_cortisol|Sapolskyn]] mekanismi verifioitu",
        statusColor: "green",
      },
      {
        name: "BAT metabolinen spiraali",
        id: "S7",
        steps: ["EMF → BAT PRDM16↓ → termogeneesi↓", "Termogeneesi↓ → metabolinen oireyhtymä → tulehdus", "Tulehdus → VGCC-herkkyys↑", "Lisää Ca²⁺-häiriötä → lisää BAT-toimintahäiriötä → ..."],
        status: "Mekanistisesti koherentti, eläindata saatavilla",
        statusColor: "amber",
      },
      {
        name: "Testosteronin neuroprotektio-menetys",
        id: "S8",
        steps: ["EMF → Leydig → StAR↓ → T↓", "T↓ → neuroprotektio↓ + synaptinen plastisuus↓", "Haavoittuvammat neuronit → enemmän EMF-vaurioita", "Lisää Leydig-vauriota → vähemmän T:tä → ..."],
        status: "T↓ neuroprotektiolinkki verifioitu",
        statusColor: "green",
      },
      {
        name: "IL-1β → KCC2 -silmukka",
        id: "S9",
        steps: ["EMF → syöttösolu → IL-1β-vapautuminen", "IL-1β → KCC2-kypsyminen viivästyy", "KCC2↓ → GABA pysyy eksitatorisena pidempään → Q↑", "Q↑ → lisää neuronivaurioita → lisää IL-1β:tä → ..."],
        status: "KCC2:n ympäristösäätely verifioitu",
        statusColor: "green",
      },
      {
        name: "Hypotalamuksen moniakselikaskadi",
        id: "S10",
        steps: ["EMF → hypotalamuksen synapttiset vesikkelit↓", "Vesikkelit↓ → GnRH↓ + CRH-häiriö + TRH↓", "Monihormonipuutos → systeeminen häiriö", "Systeeminen stressi → lisää HPA-aktivaatiota → ..."],
        status: "[[ref:kim2019_hypothalamus|Kimin 2019]] synapttiset muutokset verifioitu",
        statusColor: "green",
      },
      {
        name: "Sirkadiaanisen kellon itsehäiriö",
        id: "S11",
        steps: ["EMF → SCN Ca²⁺ -oskillaatio häiriintyy", "SCN häiriintyy → melatoniinin ajoitus katoaa → uni↓", "Uni↓ → Per2↓ suolistossa + perifeeriset kellot desynkronoituvat", "Desynkronia → SCN haavoittuvampi → ..."],
        status: "SCN Ca²⁺ -oskillaatio + Per2 suolisto -linkki verifioitu",
        statusColor: "green",
      },
      {
        name: "NK-syöpä-tulehdus",
        id: "S12",
        steps: ["ELF → NK-solujen sytotoksisuus↓", "NK↓ → syöpävalvonta↓ → kasvainten kasvu", "Kasvain → tulehdus → VGCC-sensitisaatio↑", "Lisää Ca²⁺-häiriötä → lisää NK-suppressiota → ..."],
        status: "NK:n Ca²⁺-riippuvuus + ELF-suppressio verifioitu",
        statusColor: "green",
      },
      {
        name: "HPA-HPG-ristispiraali",
        id: "S13",
        steps: ["EMF → kortisoli↑ → GnIH↑ → T↓", "T↓ → neuroprotektio↓ → hippokampus haavoittuva", "Hippokampus↓ → HPA-jarru menetetty → kortisoli↑↑", "Lisää GnIH:ta → lisää T↓ → ..."],
        status: "RF9 palautti T:n kortisolikäsitellyissä kädellississä",
        statusColor: "green",
      },
      {
        name: "Suolisto-aivo-tulehdus",
        id: "S14",
        steps: ["EMF → melatoniini↓ → Per2↓ suoliston epitheelissä", "Per2↓ → suoliston este↓ → LPS pääsee verenkiertoon", "LPS → neurotulehdus → hippokampaalinen neurogeneesi↓", "Neurotulehdus → lisää HPA-aktivaatiota → lisää melatoniini↓ → ..."],
        status: "Per2 KO → suoliston este → LPS → masennus verifioitu",
        statusColor: "green",
      },
      {
        name: "Melatoniini-telomeeri-ikääntymiskierre",
        id: "S15",
        steps: ["EMF → melatoniini↓ → telomeraasi↓ + SIRT1↓", "Telomeraasi↓ → telomeerien lyheneminen → SASP", "SASP → tulehdus → ROS↑", "ROS↑ → lisää telomeerivaurioita → lisää SASP:ia → ..."],
        status: "Melatoniini → telomeraasi + SIRT1 verifioitu; masennus = 7v kiihtynyt ikääntyminen",
        statusColor: "green",
      },
      {
        name: "Kipu-uni-kortisoli-kierre",
        id: "S16",
        steps: ["EMF → α2δ-1↑ → sentraalinen sensitisaatio → krooninen kipu", "Krooninen kipu → uni↓ (Walkerin ketju S4)", "Uni↓ → kortisoli↑ (HPA S7) + GABA↓", "Kortisoli↑ → tulehdus → lisää sensitisaatiota → masennus → uni↓ → ..."],
        status: "α2δ-1 → kipu ilman vauriota verifioitu; kipu-uni-kortisoli jokainen verifioitu",
        statusColor: "green",
      },
      {
        name: "Amygdalan ahdistuskierre",
        id: "S17",
        steps: ["EMF → kortisoli↑ (HPA-akseli, VK11)", "Kortisoli → BLA-hypertrofia + BDNF↑ amygdalassa", "BLA-hypertrofia → ahdistus↑ → ENEMMÄN kortisolia", "Samanaikaisesti: hippokampus atrofioituu → HPA-jarru HÄVIÄÄ → kortisoli↑↑", "Amygdalan hypertrofia SÄILYY 21+ pv stressin jälkeen → rakenteellinen lukittuminen"],
        status: "Yksi kortisoli-annos → BLA-hypertrofia verifioitu ([[ref:amygdala_cort|PNAS 2008]]); pysyvyys verifioitu ([[ref:amygdala_persist|Neurosci Lett 2023]])",
        statusColor: "green",
      },
    ],

    consilienceTitle: "Konsilienssiarvio",
    consilienceLead:
      "Konsiliensssi — itsenäisten evidenssilinjojen konvergoiminen samaan johtopäätökseen — on tieteellisen tuen vahvin muoto. BERM osoittaa kolme konsilienssitasoa.",
    consilienceLevels: [
      {
        level: "Vahva konsilienss",
        desc: "Itsenäiset evidenssilinjat konvergoivat",
        examples: [
          "Fysiikka ([[ref:lindgren2025|Lindgren χ]]) ↔ Farmakologia (Ca²⁺-lääkkeet konvergoivat)",
          "Genetiikka (CACNA1C, [[ref:sousouri2025|Sousouri 2025]]) ↔ Kokeellinen ([[ref:lopez_martin_2006|López-Martín kohtaukset]])",
          "Epidemiologia ([[ref:klimentidis2010|Klimentidis 8 lajia]]) ↔ Patologia (SIDS 5-HT-puutos)",
        ],
      },
      {
        level: "Kohtalainen konsilienss",
        desc: "Toisiinsa liittyvät evidenssilinjat tukevat toisiaan",
        examples: [
          "ELF-priming ([[ref:sun2016_elf_vgcc|Sci. Rep. 2016]]) ↔ Gabapentiini estää sen ([[ref:eroglu_2009_cell|Cell 2009]])",
          "PGC ↔ melatoniini ([[ref:kunz2008_pgc_insomnia|r=0,569]]) ↔ [[ref:intechopen2020_melatonin_heart|Pinealektomia → rytmihäiriöt]]",
          "[[ref:dell2022_sleep_seizure|Univaje → GABA↓]] (kliininen) ↔ EMF → melatoniini↓ (eläindata)",
        ],
      },
      {
        level: "Heikko konsilienss (universaalisuusriski)",
        desc: "Ca²⁺ on kaikkialla — osa yhteyksistä voi olla triviaaleja",
        examples: [
          "'25 epidemiaa yhdellä nimittäjällä' — Ca²⁺ ON kaikkialla",
          "Osa Ca²⁺-assosiaatioista voi heijastaa universaalia biologiaa, ei spesifistä EMF-kausaalisuutta",
          "Tämä on mallin ensisijainen epistemologinen riski",
        ],
      },
    ],

    falsificationTitle: "Mikä kumoaisi mallin",
    falsificationLead:
      "Progressiivisen tutkimusohjelman on spesifioitava mikä tuhoaisi sen. BERM:llä on neljä falsifikaatiotasoa, täydellisestä romahduksesta kliiniseen merkityksettömyyteen.",
    falsificationTiers: [
      {
        level: "TASO 1 — Mallin romahdus",
        test: "ETH Zürichin nimodipiini-5G: Ca²⁺-salpaaja EI estä EMF:n univaikutusta",
        consequence: "VGCC ei ole kohde → koko kaskadi romahtaa",
      },
      {
        level: "TASO 2 — Ympäristötekijä eliminoitu",
        test: "Amish-data: samat terveystrendi kuin valtaväestöllä",
        consequence: "EMF ei ole merkittävä ympäristötekijä",
      },
      {
        level: "TASO 3 — Avainkokeen epäonnistuminen",
        test: "[[ref:lopez_martin_2006|López-Martín]] epäonnistuu replikoinnissa: pikrotoksiini + GSM EI kohtauksia",
        consequence: "Ainoa suora kokeellinen todiste katoaa",
      },
      {
        level: "TASO 4 — Kliininen merkityksettömyys",
        test: "EMF-vähennysinterventio EI tuota terveyshyötyä",
        consequence: "Malli voi olla mekanistisesti oikea mutta kliinisesti merkityksetön",
      },
    ],

    progressiveTitle: "Progressiivinen vs degeneratiivinen",
    progressiveLead:
      "Lakatoksen viitekehyksessä tutkimusohjelma on progressiivinen, jos se generoi ennusteita jotka myöhemmin vahvistuvat, tuottaen enemmän empiiristä sisältöä kuin syötettiin. Se on degeneratiivinen, jos se vain sovittaa tunnettuja faktoja jälkikäteen.",
    progressivePoints: [
      "BERM ennusti, että CACNA1C-genotyyppi moduloisi EMF-vastetta → [[ref:sousouri2025|Sousouri 2025]] vahvisti (ETH Zürich, kaksoissokko)",
      "BERM ennusti, että kaikki tehokkaat SIDS-hoidot kohdistuvat Ca²⁺-reitteihin → verifioitu kofeiinin, melatoniinin, magnesiumin, oksitosiinin, bumetanidin osalta",
      "BERM ennusti, että ELF-priming kasvattaa VGCC-ekspressiota → [[ref:sun2016_elf_vgcc|Sun 2016 (Sci. Rep.)]] vahvisti",
      "BERM ennusti, että SUDEP ja SIDS jakavat terminaalimekanismin → CSD → aivorunko -reitti vahvistettu molemmille",
      "BERM ennusti, että pulssimodulaatio on tärkeämpi kuin SAR → [[ref:lopez_martin_2009|López-Martín 2009]] vahvisti",
      "Jokainen verifiointi tuotti ENEMMÄN kuin ennustettiin — ennustamattomia löytöjä jokaisessa kerroksessa",
    ],
    progressiveConclusion: "Malli on progressiivinen Lakatoksen mielessä: se generoi ennusteita → ennusteet verifioituvat → verifiointi tuottaa ENEMMÄN sisältöä kuin malli spesifioi. Tämä on produktiivisen tutkimusohjelman tunnusmerkki.",

    analogyTitle: "Evoluutioteorian analogia",
    analogyLead: "BERM jakaa rakenteellisia piirteitä evoluutioteorian kanssa — molemmat ovat generatiivisia mekanismeja jotka ennustavat löytöjä ennen havainnointia, rajaavat etsintäalueen ja osoittavat monitasoista konvergenssia.",
    analogyPoints: [
      { berm: "Generatiivinen mekanismi (EMF→VGCC→Ca²⁺→kaskadit)", evolution: "Generatiivinen mekanismi (muuntelu→valinta→sopeutuminen)" },
      { berm: "Ennustaa löytöjä ENNEN katsomista", evolution: "Ennustaa fossiileja, geenejä, jäännöselimiä ENNEN löytämistä" },
      { berm: "Rajaa etsintäalueen (farmakologia, genetiikka)", evolution: "Rajaa etsintäalueen (fylogenia, biogeografia)" },
      { berm: "Monitasoinen konvergenssi (fysiikka → epidemiologia)", evolution: "Monitasoinen konvergenssi (molekyylit → ekosysteemit)" },
    ],
    analogyCritical: "KRIITTINEN ERO: Evoluutiolla on ITSENÄINEN verifiointi (DNA-sekvensointi). BERM:ltä puuttuu yhä INTERVENTIONAALINEN verifiointi — EMF-vähennys → terveyshyöty ihmisellä. Tämä on yksittäinen tärkein puuttuva pala.",

    predictionLink: "Ks. konvergenssiverkoston ennusteet (METAL-EMF-1–4, CHAIN-1–4, BBB-EMF-1–2, BAT-EMF-1, HPA-EMF-1–2, BETA-EMF-1–2 ja lisää)",
    predictionHref: "/predictions",
    predictionSummary: "Konvergenssiverifiointi tuottaa 55 testattavaa ennustetta, jotka kattavat raskasmetalli-synergian, veri-aivoesteen, ruskean rasvakudoksen, HPA-akselin, β-solun, hypotalamuksen, kortisoli-hippokampuksen, Leydig-solun, syöttösolun, siittiöiden CatSperin, NK-immunivalvonnan, BDNF-hormeesin, suolisto-aivo-akselin, kilpirauhasen Dio2/Dio3:n, epigenetiikan, telomeeri-ikääntymisen, oksitosiinin, kroonisen kivun, ASD-prototyypin, ADHD:n, ALS:n, allergioiden, D-vitamiinin, PEMF-hormeesin, psilosybiinin, kofeiinin, litiumveden, amygdalan ja Amish-kontrolliryhmän mekanismit.",
    statusConfirmed: "✓ Vahvistettu",
    statusPartial: "◐ Osittainen",
    falsificationTestLabel: "Testi",
    falsificationConsequenceLabel: "Seuraus",
    analogyEvolutionHeader: "Evoluutioteoria",
  },
  ja: {
    title: "途切れない連鎖：光子 → 集団",
    subtitle:
      "反復収束検証がBERMのメカニズム連鎖の57スケールを47の検証済み層（VK1–VK31、VK41–VK56）にわたってテスト。結果：17の正のフィードバックループが自己増幅ネットワークを形成、光子吸収から集団レベルの影響まで、すべての層で予想外の実証的内容。",
    backLink: "← エビデンスに戻る",

    cautionText:
      "このページはBERMのメカニズム連鎖の物理的スケールにわたる体系的検証を提示します。各リンクは公表された実験的エビデンスに対してテストされています。連鎖は最も弱いリンクと同じ強さです — 部分的確認と未検証の予測は明示的にマークされています。",

    chainTitle: "検証された連続体",
    chainLead:
      "BERMは光子吸収から集団レベルの健康影響までの連続的因果連鎖を提案します。各中間層は公表された実験的・臨床的エビデンスに対して独立に検証されています。",
    chainRows: [
      { scale: "10⁻¹⁵ m", link: "光子 → 計量歪み", evidence: "Lindgren 2025 χパラメータ、Vassallo確認", status: "confirmed", detail: "EMF光子が量子レベルで計量歪みを生成。Lindgrenのχパラメータは、生体組織が非熱的EMFに応答する物理レベルのメカニズムを提供。" },
      { scale: "10⁻¹⁰ m", link: "計量 → S4電圧センサー", evidence: "Tang 2024 Nature Communications", status: "confirmed", detail: "計量歪みがVGCCのS4ヘリックス電圧センサーに作用。Tang 2024は非熱的強度でのEMFによる直接的S4コンフォメーション変化を実証。" },
      { scale: "10⁻⁹ m", link: "S4 → VGCC開口", evidence: "Panagopoulos 2025 IFO、Trus 2024 非イオン性", status: "confirmed", detail: "S4コンフォメーション変化がVGCCゲーティングを誘発。Panagopoulos 2025がメカニズムモデルを提供；Trus 2024が非イオン性（非熱的）活性化経路を実証。" },
      { scale: "10⁻⁹ m", link: "VGCC → Ca²⁺ + Pb²⁺/Cd²⁺透過", evidence: "Marchetti 2013、Cd→Cav3.1放射標識", status: "confirmed", detail: "開口したVGCCがCa²⁺流入を許可 — しかし有毒金属も。Cd²⁺はCav3.1を透過（¹⁰⁹Cd²⁺放射標識で確認）。Pb²⁺はカルモジュリン結合部位でCa²⁺を模倣。" },
      { scale: "10⁻⁸ m", link: "Ca²⁺ → CaM → CaMKII", evidence: "基礎生化学（教科書）", status: "confirmed", detail: "Ca²⁺がカルモジュリンに結合 → Thr286自己リン酸化を介してCaMKIIを活性化。これは収束点：すべての上流シグナルがCaMKIIを通じて収束。" },
      { scale: "10⁻⁷ m", link: "CaMKII → TPH-2 → 脳内5-HT変化", evidence: "900 MHz → 5-HT 領域特異的（視床下部、延髄）", status: "confirmed", detail: "CaMKIIがTPH-2（トリプトファンヒドロキシラーゼ-2）をリン酸化、脳内セロトニン合成の律速酵素。900 MHzが視床下部と延髄で領域特異的5-HT変化を生成 — 睡眠と心肺機能を制御するまさにその領域。" },
      { scale: "10⁻⁷ m", link: "CaMKII → CSD閾値", evidence: "CaV + NMDA両方が必要；CaMKII阻害 → 過興奮性", status: "confirmed", detail: "CaMKIIが皮質拡延性脱分極（CSD）の閾値を制御。CaVチャネルとNMDA受容体の両方がCSD開始に必要。CaMKII阻害は逆説的に興奮性を増加 — 精密な制御が重要。" },
      { scale: "10⁻⁶ m", link: "ELF → VGCC発現↑（ELFプライミング）", evidence: "Sun 2016 Scientific Reports：8-10日 → Ca²⁺劇的に↑、Cav1タンパク質↑", status: "confirmed", detail: "慢性ELF曝露（50/60 Hz）がVGCCタンパク質発現を上方制御 — 細胞あたりのチャネル増加 → 細胞がすべての後続EMFに対してより感受性に。これがELFプライミング：バックグラウンドの50 Hz送電網が集団を感作。" },
      { scale: "10⁻⁶ m", link: "ELF → 新皮質の発作感受性↑", evidence: "Varró 2009：一過性プライミング効果", status: "confirmed", detail: "ELF-EMFが海馬のシナプス促通を増強し、新皮質の発作感受性を増加。効果は一過性 — ELFが急性に神経興奮性を調節することを実証。" },
      { scale: "10⁻⁵ m", link: "GABA興奮性 → Q→∞ 新生児脳", evidence: "PMC7847733、ブメタニドが抑制を回復、KCC2成熟", status: "confirmed", detail: "新生児ではNKCC1優位がGABAを興奮性にする（γ < 0）。Q因子 → ∞：脳は無減衰共振器。ブメタニドがNKCC1を遮断 → GABAが抑制性に → 発作停止。KCC2が数ヶ月で成熟 → Qが低下。" },
      { scale: "10⁻⁴ m", link: "プライミング + EMF → 発作", evidence: "López-Martín 2006/2009：パルス変調 > CW", status: "confirmed", detail: "重要な実験：閾値下ピクロトキシン（γを減少）+ GSM 900 MHz = 発作。どちらも単独では不十分。パルス変調GSMは連続波より効果的 — 生物学的効果はSARではなく特定のパルスに依存。" },
      { scale: "10⁻³ m", link: "CSD → 脳幹 → 死亡", evidence: "SUDEP = '成人のSIDS'；CACNA1Aモデル；L型Ca²⁺拮抗薬が死亡を予防", status: "confirmed", detail: "拡延性脱分極が脳幹に伝播し心肺停止を引き起こす。これがSUDEPとSIDS。L型VGCC拮抗薬がSUDEPマウスモデルで発作誘発死を予防 — Ca²⁺遮断が終末イベントを防ぐ直接的証拠。" },
      { scale: "10⁻² m", link: "メラトニン↓ → 心臓不整脈", evidence: "松果体摘出 → 不整脈↑；メラトニン補充 → 保護", status: "confirmed", detail: "松果体摘出が再灌流不整脈を増加。慢性メラトニン補充が抗線維化効果、Cx43保存、ミトコンドリア保護を通じて不整脈保護を提供。EMFがCRY経路を介してメラトニンを抑制 → 心臓リスク増加。" },
      { scale: "10⁻² m", link: "PGC → メラトニン↓ → 病理", evidence: "r=0.569 非石灰化組織↔メラトニン；AD：76% vs 64% PGC", status: "confirmed", detail: "松果体石灰化（PGC）がメラトニン産生を直接的に減少（r=0.569）。アルツハイマー患者はPGCが高い（76% vs 64%）。PGCは収束メカニズム：EMF + 重金属 + フッ化物がすべて加速。" },
      { scale: "10⁻² m", link: "睡眠↓ → GABA↓ → Q↑", evidence: "睡眠不足が23-62%でてんかん様放電を活性化", status: "confirmed", detail: "睡眠不足がGABAの持続的抑制を減少（γ低下 → Q上昇）。これはてんかんの診断的誘発として臨床的に使用。EMF→メラトニン↓→睡眠↓→GABA↓がフィードバックループ4（ウォーカー連鎖）を作成。" },
      { scale: "10⁻¹ m", link: "胎児期Ca²⁺撹乱 → 子孫のγ↓", evidence: "セボフルラン → 介在ニューロン撹乱 → γ↓ 永続的", status: "partial", detail: "母体のセボフルラン（Ca²⁺モジュレーター）が介在ニューロン発達を撹乱 → 子孫の永続的GABA作動性抑制欠損。胎児期Ca²⁺撹乱が永続的に減衰を変更できることを実証。部分的：メカニズムはセボフルランで示されたが、EMFで直接はまだ。" },
      { scale: "10⁰ m", link: "薬理学がCa²⁺カスケードを標的", evidence: "エトスクシミド、ガバペンチン、ベラパミル、メラトニン、リチウム、プシロシビン、ブメタニド", status: "confirmed", detail: "BERMが予測する状態に対するすべての有効な治療がCa²⁺カスケードの構成要素を標的。この薬理学的収束はモデルが予測し、そうでなければ異常な偶然の一致。" },
      { scale: "10³ m", link: "疫学的除外", evidence: "Klimentidis p=10⁻⁷（8種）、Mazur体重安定T↓、54カ国R²=0.851", status: "partial", detail: "種間の肥満傾向（8種、p=10⁻⁷）が食事/運動を唯一の原因として除外。54カ国のEMF-健康相関R²=0.851。部分的：疫学的エビデンスは相関的であり、介入的ではない。" },
      { scale: "10⁻⁶ m", link: "VK9：EMF → BBB透過性↑", evidence: "PMC12829706：RF → eNOS↑ + オクルディン↓；メラトニンが保護（PMC6932927）", status: "confirmed", detail: "RF-EMFがeNOS上方制御とオクルディン下方制御を介して血液脳関門透過性を増加。メラトニンがタイトジャンクションタンパク質を保護。EMF→メラトニン↓が二重BBB脆弱性を作成：直接開口 + メラトニン保護の喪失。" },
      { scale: "10⁻⁵ m", link: "VK10：5G → BAT PRDM16↓ → 熱産生↓", evidence: "PMC11942954：3.5 GHz → PRDM16↓、C/EBPβ↓", status: "confirmed", detail: "5G（3.5 GHz）が褐色脂肪組織のPRDM16とC/EBPβ mRNAを減少。BATは熱産生にCa²⁺サイクリング（SERCA）を使用 — VGCC媒介メカニズム。EMFをKlimentidisの肥満パラドックスに接続：8種が食事変更なしに体重増加（p=10⁻⁷）。" },
      { scale: "10⁻³ m", link: "VK11：EMF → HPA軸 → コルチゾール↑", evidence: "Klimek 2023：ELF → HPA感作；RF → コルチコステロン↑（Frontiers 2026）", status: "confirmed", detail: "ELF-EMFが適応ではなく感作でHPA軸に新しい設定点を設定。RF-EMFが不安とコルチコステロンを増加。HPA軸は慢性EMFに順応しない — 感作し、進行的に高いコルチゾールベースラインを生成。" },
      { scale: "10⁻⁵ m", link: "VK12：EMF → β細胞Ca²⁺ → インスリン撹乱", evidence: "PMID:32323041：電場 → グルコースなしでインスリン；CaVγ4→CaMKII→MafA（PMC9030882）", status: "confirmed", detail: "電場がCa²⁺チャネルを介してグルコースなしでβ細胞からインスリン分泌を誘導。CaVγ4→CaMKII→MafA経路がβ細胞成熟を制御 — CaMKII調節異常がβ細胞アイデンティティ喪失を引き起こす。EMFを2型糖尿病に直接接続。" },
      { scale: "10⁻³ m", link: "VK13：EMF → 視床下部シナプス小胞↓", evidence: "Kim 2019：835 MHz 12週 → 小胞↓、シナプシンI/II↓、シナプトタグミン1↓", status: "confirmed", detail: "835 MHz（12週）が視床下部でシナプス小胞数、サイズ、ドッキングを減少、さらにシナプシンI/IIとシナプトタグミン1（放出のCa²⁺センサー）を減少。すべての視床下部ホルモン放出が障害 — GnRH、CRH、TRH、GHRH、ドパミンの同時撹乱を説明。" },
      { scale: "10⁻² m", link: "VK14：コルチゾール↑ → 海馬萎縮", evidence: "Sapolsky 2009：樹状突起退縮 + 神経新生↓；コルチゾール→AD（Frontiers 2026）", status: "confirmed", detail: "慢性コルチゾールが海馬樹状突起退縮、神経新生停止、容積減少を引き起こす。海馬はHPA負のフィードバック中枢 — その損傷がコルチゾールブレーキを除去 → コルチゾール↑↑（ループS6）。アルツハイマー進行を加速。" },
      { scale: "10⁻⁵ m", link: "VK15：EMF → ライディッヒ → StAR↓ → T↓", evidence: "複数：RF → ライディッヒ形態変化、StAR↓、T↓用量依存的", status: "confirmed", detail: "EMFがライディッヒ細胞のStARタンパク質を減少 — ステロイド生成の律速段階。肥満とは独立した集団全体のT↓の分子メカニズム、Mazurの体重安定データで確認。" },
      { scale: "10⁻⁵ m", link: "VK16：EMF → VGCC → Ca²⁺ → マスト細胞脱顆粒", evidence: "Johansson 2000：EMF → マスト細胞変化；心臓マスト細胞 → 不整脈（PMC6896164）", status: "confirmed", detail: "Ca²⁺がマスト細胞脱顆粒を誘発。EMF → VGCC → Ca²⁺ → マスト細胞がヒスタミン + IL-1β + トリプターゼを放出。ディスプレイ使用者の皮膚生検が変化を示す。心臓マスト細胞 → 不整脈。マスト細胞からのIL-1β → KCC2↓ → GABAが長く興奮性。" },
      { scale: "10⁻⁶ m", link: "VK17：RF → CatSper Ca²⁺ → 精子エネルギー枯渇", evidence: "2100 MHzがCatSperを早期活性化；精子メタSMD -1.92（Environ Int 2024）", status: "confirmed", detail: "RF-EMFが精子のCatSper Ca²⁺チャネルを早期に活性化、卵子到達前にエネルギー枯渇を引き起こす。精子メタアナリシスが携帯電話SAR レベルでDNA/クロマチン損傷を示す（SMD -1.92、95% CI -2.78 – -1.05）。Pb²⁺が精子先体でCa²⁺と競合 — 生殖における重金属相乗効果。" },
      { scale: "10⁻⁵ m", link: "VK18：SCN Ca²⁺振動 = 概日時計", evidence: "PMC6170461：SCNニューロンがCa²⁺で概日リズムに振動", status: "confirmed", detail: "SCNニューロンがCa²⁺濃度で概日リズムに振動 — Ca²⁺振動が概日時計の物理的基盤そのもの。EMFがCa²⁺を撹乱 → EMFが時計自体を撹乱。SCNは視床下部と末梢時計を同期するマスターペースメーカー。" },
      { scale: "10⁻⁷ m", link: "VK19：炎症 → DA↓ → 動機喪失", evidence: "Berridge：NAcc DA = '欲求'；IFN-α → 線条体DA↓ → 快感消失（PMC9718669）", status: "confirmed", detail: "側坐核ドパミンが「欲求」（動機）を媒介するが「好み」（快楽）は媒介しない。炎症（IFN-α）が線条体ドパミンを減少させ快感消失を引き起こし、L-DOPAで回復。低トニックDAがフェイジック反応を増加 → 低ベースラインDAでスクリーンがより報酬的に感じる。EMF→炎症→DA↓→依存脆弱性。" },
      { scale: "10⁻⁶ m", link: "VK20：Cav1.2 → OPC分化 → 髄鞘形成", evidence: "PMC6916379：Cav1.2 KO → 低髄鞘形成；SMF → OPCでCav1.2↑（Sci Rep 2017）", status: "confirmed", detail: "Cav1.2（L型VGCC）がオリゴデンドロサイト前駆細胞の分化と髄鞘形成に必須。Cav1.2ノックアウトが低髄鞘形成を引き起こす。静磁場がOPCでCav1.2/Cav1.3発現を増加。EMF誘発Cav1.2調節異常 → 発達中の脳での髄鞘形成タイミング撹乱。" },
      { scale: "10⁻⁵ m", link: "VK21：NK細胞Ca²⁺ → 免疫監視", evidence: "Ca²⁺→NFAT1→グランザイムB（PLoS ONE 2024）；50 Hz ELF→NK↓；200 kHz TTFields→NK↑", status: "confirmed", detail: "NK細胞の細胞傷害性はCa²⁺依存的：Ca²⁺流入がNFAT1を活性化 → グランザイムB発現。50 Hz ELFがNK細胞傷害性を抑制、200 kHz TTFieldsが増加 — 周波数依存的経路階層の直接的検証。同じVGCCメカニズム、異なる周波数で反対の結果。" },
      { scale: "10⁻⁵ m", link: "VK22：コルチゾール → GnIH → GnRH↓ → T↓", evidence: "PMC5380668：GnIHサイレンシングが生殖力を回復；RF9がコルチゾール処理霊長類でTを回復（PMC7946976）", status: "confirmed", detail: "ストレスがGnIH/RFRP-3を誘導しGnRH → LH → テストステロンを抑制。GnIH遺伝子サイレンシングがストレス動物の生殖力を回復。RF9（GnIH拮抗薬）がヒドロコルチゾン処理霊長類のテストステロンを回復。CRFがGnRHパルスジェネレーターを直接抑制。T↓への3つの独立経路。" },
      { scale: "10⁻⁶ m", link: "VK23：BDNFホルメシス — RF↓ vs ELF↑", evidence: "RF 2650 MHz → BDNF↓ + GABA↓（PMC10275548）；ELF 50 Hz → BDNF↑ + 神経新生↑（PMC5702423）", status: "confirmed", detail: "RF-EMFが海馬のBDNFを減少（2650 MHz、28日：BDNF↓、GABA↓、GR↓、コルチコステロン↑）。生後RF（835 MHz）が樹状突起スパイン喪失 + 記憶障害を引き起こす。一方ELF 50 HzはBDNFを増加し神経新生を促進。周波数依存的ホルメシス：同じ経路、反対の方向。" },
      { scale: "10⁻⁵ m", link: "VK24：Per2 → 腸管バリア → LPS → 神経炎症", evidence: "Per2 KO → 腸管バリア↓ → LPS → 海馬神経新生↓ → うつ病（PMC12631932）", status: "confirmed", detail: "腸上皮のPer2ノックアウトがバリア機能を撹乱 → LPSが血流に入る → 神経炎症 → 海馬神経新生↓ → うつ病。概日リズム撹乱が腸内マイクロバイオームを変化（Ruminococcus↑、Lactobacillus↓、LPS合成遺伝子↑）。二重バリア原理：BBB + 腸管バリアはZO-1、オクルディン、クローディンを共有。" },
      { scale: "10⁰ m", link: "VK25：睡眠↓ → T↓ → ウォーカー連鎖が閉じる", evidence: "JAMA 2011：5時間睡眠 → T -10-15%；メタアナリシスが確認（PMID:34801825）", status: "confirmed", detail: "1週間の5時間睡眠がテストステロンを10-15%減少、10-15年の加齢に相当。ウォーカー連鎖が閉じた：EMF→メラトニン↓→睡眠↓→T↓→神経保護↓→より多くのEMF損傷。睡眠制限 + EMFが超加算的T低下を生むと予測（>25%合計 vs ~15%睡眠のみ）。" },
      { scale: "10⁻⁵ m", link: "VK26：EMF → HPT軸 → Dio2/Dio3↓ → 潜在性甲状腺機能低下症", evidence: "PMC11507962：LTE → 視床下部でDio2/Dio3↓；PMID:35963949：ELF作業員でFT3↓ + FT4↑", status: "confirmed", detail: "EMFが視床下部のDio2とDio3デヨジナーゼ酵素を減少。T4→T3変換が障害 → 血中T4は正常に見えるが組織は活性T3を欠く。標準的甲状腺検査（TSH、T4）がこの潜在的欠乏を見逃す。FT3/FT4比が診断の鍵。" },
      { scale: "10⁻⁸ m", link: "VK27：EMF → エピジェネティクス → 世代間遺伝", evidence: "ScienceDirect 2024：DNMT1 + HDAC + DICER1；PMC4538330：精子メチル化用量依存的", status: "confirmed", detail: "EMFが3つのエピジェネティックメカニズムを変更：DNAメチル化（DNMT1）、ヒストン修飾（HDAC）、マイクロRNA生合成（DICER1/DGCR8）。精子：50 Hz ELFが双方向用量依存的メチル化変化を生成（1 mTで↓、3 mTで↑）。DDT世代間モデルがF3持続のテンプレートを提供。" },
      { scale: "10⁻⁷ m", link: "VK28：EMF → ROS → テロメア → 老化スパイラル", evidence: "PMID:36582083：放射線 → ROS → テロメア損傷；mel → テロメラーゼ + SIRT1（Front Aging Neurosci 2022）", status: "confirmed", detail: "EMF→ROSがテロメアを損傷（G-richシーケンスが特に脆弱）。同時にEMF→メラトニン↓がテロメラーゼ + SIRT1保護を除去。うつ病 = 281 bp短いテロメア = 7年の加速老化。メラトニンが鍵の抗老化分子：テロメラーゼを活性化、SIRT1を上方制御、ROSを減少。" },
      { scale: "10⁻⁸ m", link: "VK29：EMF → オキシトシンCa²⁺撹乱 → 社会的絆↓", evidence: "PMC3197583：OXT放出にN型 + L型VGCCが必要；eNeuro 2025：PVN Ca²⁺ → OXT", status: "confirmed", detail: "オキシトシンの体細胞樹状突起放出にN型とL型VGCCの両方を通じたCa²⁺流入が必要。EMFがVGCC機能を撹乱 → OXT放出が撹乱。L型は新生児で特に重要。インスリン→OXTがCa²⁺を介して代謝系と社会系を接続。四重ロック：T↓×F↑×DA↓×OXT↓ = 完全な社会的-生殖的崩壊。" },
      { scale: "10⁻⁵ m", link: "VK30：ELFプライミング → α2δ-1↑ → 神経障害なしの慢性疼痛", evidence: "PMID:16764990：α2δ-1過剰発現のみ → 疼痛；Br J Pharmacol 2018：ガバペンチンがα2δ-1を遮断", status: "confirmed", detail: "ELFプライミング（VK4）がα2δ-1を含むVGCC発現を上方制御。α2δ-1過剰発現のみで神経損傷なしに神経障害性疼痛行動を生成。ガバペンチノイド（ガバペンチン、プレガバリン）が正確にα2δ-1を標的。慢性疼痛の流行は集団レベルのELFプライミングのα2δ-1と整合。" },
      { scale: "10⁻⁵ m", link: "VK31：ASD = BERMプロトタイプ（GABAスイッチ + α2δ + 炎症 → E/I↑）", evidence: "NKCC1/KCC2↑ ASDで（Front Psychiatry 2025）；CACNA2D3自閉症遺伝子；ブメタニドRCT", status: "confirmed", detail: "ASDが3つの独立に検証されたBERMメカニズムを統合：GABAスイッチ遅延（VK6、KCC2↓→GABA興奮性）、ELFプライミングシナプス形成（VK4+VK30、α2δ-1↑→E/I↑）、炎症駆動KCC2抑制（S9、IL-1β→KCC2↓）。CACNA2D3は自閉症感受性遺伝子。KCC2の性差が4:1男性優位を説明。ブメタニド（NKCC1阻害薬）がRCTでASD症状を改善。" },
      { scale: "10⁻⁵ m", link: "VK41：ADHD = 第2プロトタイプ（PFC遅延 + DAゴルディロックス + E/Iシフト）", evidence: "Shaw 2007 PNAS：PFC遅延5年；Arnsten 2009：DA逆U字；ASD-ADHD 30-50%併存", status: "confirmed", detail: "ADHDが3つのBERMメカニズムを統合：PFCのDA欠乏（VK19：線条体DA↓ → 注意↓）、髄鞘形成遅延（VK20：Cav1.2→OPC → PFCが5年遅れて成熟）、E/Iシフト（VK6：KCC2↓）。ASDとADHDは30-50%の併存を共有 — 同じメカニズム、興奮性スペクトラム上の異なるQ値。" },
      { scale: "10⁻² m", link: "VK42：交代勤務 → IARC 2A → メラトニン抑制による発がん", evidence: "IARC Monograph 98 2010；メタアナリシス乳がんOR 2.34；メラトニン抗腫瘍（Reiter 2017）", status: "confirmed", detail: "IARCが交代勤務をグループ2A（おそらく発がん性）に分類、メラトニン抑制による。EMFが同じメカニズム（VK3：PGC）でメラトニンを抑制。IARCが交代勤務の概日リズム撹乱を2Aとして受け入れるなら、EMF誘発概日リズム撹乱も同等のエビデンスの重みを持つべき。" },
      { scale: "10⁻⁵ m", link: "VK43：ベラパミル → T1Dでのβ細胞Ca²⁺保護", evidence: "Forlenza JAMA 2023 RCT N=88：Cペプチド +30%；Ovalle Nat Med 2018；Diabetes Care 2025", status: "confirmed", detail: "ベラパミル（Cav1.2遮断薬）が小児の新規発症T1Dでβ細胞機能を保存：52週でCペプチドがプラセボ比+30%。二重盲検RCT（N=88、年齢7-17）。VK12を確認：β細胞Ca²⁺撹乱がアイデンティティ喪失を引き起こす。Ca²⁺チャネル遮断がβ細胞を救うなら、Ca²⁺過負荷（EMFから）がそれを破壊する。" },
      { scale: "10⁻⁴ m", link: "VK44：早産 = 子宮VGCC → ニフェジピン子宮収縮抑制", evidence: "Cochrane 2014：ニフェジピンが第一選択子宮収縮抑制薬；P4:E2→Cav1.2（PMC3816733）", status: "confirmed", detail: "子宮収縮はVGCCを通じたCa²⁺流入に依存。ニフェジピン（Ca²⁺チャネル遮断薬）が第一選択子宮収縮抑制薬 — Cochraneエビデンス。プロゲステロン：エストロゲン比が子宮のCav1.2発現を制御。Ca²⁺遮断が早産を防ぐなら、Ca²⁺過負荷が原因。" },
      { scale: "10⁻⁵ m", link: "VK45：ALS = 運動ニューロンCa²⁺脆弱性（第4の神経変性）", evidence: "PMC4452055：運動ニューロンの低Ca²⁺緩衝；Ca²⁺透過性AMPA；リルゾール間接的Ca²⁺↓", status: "confirmed", detail: "運動ニューロンは低いCa²⁺緩衝能力 + Ca²⁺透過性AMPA受容体 → Ca²⁺過負荷に選択的に脆弱。リルゾール（数十年間唯一のALS薬）は間接的に作用：Na⁺遮断 → グルタミン酸↓ → Ca²⁺↓。Ca²⁺メカニズムによる第4の神経変性（AD、MS、PDの後）。職業的EMF：OR 1.3-1.7。" },
      { scale: "10⁻⁶ m", link: "VK46：腸脳5-HT軸（90%のセロトニンが腸に）", evidence: "Cell Host Microbe：90% 5-HTが腸に；PMC7231603：Trp→脳；腸メラトニン", status: "confirmed", detail: "セロトニンの90%以上が腸のエンテロクロマフィン細胞で産生。腸内細菌叢が脳へのトリプトファン利用可能性を調節 → 中枢5-HT合成。メラトニンも腸でセロトニンから合成。IBS-うつ病の併存は共有された腸脳5-HT撹乱を反映。S14（Per2→腸）をS2（セロトニンロックオープン）に接続。" },
      { scale: "10⁻⁵ m", link: "VK47：アレルギー = マスト細胞Ca²⁺脱顆粒（四重感作）", evidence: "ScienceDirect 2011：Ca²⁺イオノフォア → IgEなしで脱顆粒；環境エストロゲン → マスト細胞↑", status: "confirmed", detail: "マスト細胞脱顆粒はCa²⁺依存的：Ca²⁺イオノフォアがIgEなしで脱顆粒を誘発、Ca²⁺枯渇がIgEありでも遮断。四重感作：(1) EMF→VGCC→マスト細胞のCa²⁺、(2) 環境エストロゲン→マスト細胞感作、(3) コルチゾール→Th1→Th2シフト、(4) 腸管バリア→LPS→全身炎症。" },
      { scale: "10⁻⁴ m", link: "VK48：子癇前症 = 妊娠中Cav1.2 + ROS調節異常", evidence: "PMC9774363：Cav1.2血圧制御；ET-1→胎盤のCav1.2；子癇前症にニフェジピン", status: "confirmed", detail: "子癇前症は妊娠中のCav1.2 + ROS調節異常を含む。ET-1が胎盤血管のCav1.2を活性化；ニフェジピンが部分的に遮断。子癇前症でCa²⁺スパーク頻度が減少 → 血管拡張↓。ニフェジピンは子宮収縮抑制と子癇前症の高血圧の両方に使用 — 生殖組織の同じCa²⁺メカニズム。" },
      { scale: "10⁻⁴ m", link: "VK49：骨粗鬆症 + PEMFホルメシスパラドックス", evidence: "Frontiers Endocrinol 2024：骨のCa²⁺チャネル；PMC11919207：PEMF → 骨成長", status: "confirmed", detail: "Ca²⁺チャネルが破骨細胞と骨芽細胞の両方を制御。PEMF療法が骨成長を促進し炎症を減少 — BERMと矛盾するように見える。解決：Lindgrenホルメシス。制御されたPEMFパラメータ → 有益なCa²⁺一過性；慢性的な制御されないEMF → Ca²⁺過負荷。PEMFはEMFがCa²⁺チャネルを通じて作用することを検証。" },
      { scale: "10⁻⁸ m", link: "VK50：ビタミンD → CACNA1C/1D mRNA↓（第10モジュレーター）", evidence: "J Neurosci 2001：VDH→L-VSCC↓；PLoS ONE 2011：VDRサイレンシング → Cav1.2↑；Transl Psychiatry 2019", status: "confirmed", detail: "ビタミンD（1,25(OH)₂D₃）がCACNA1CとCACNA1D mRNAを下方制御 — 自然のチャネル遮断薬。VDRサイレンシングがCav1.2/Cav1.3下方制御を阻止。ビタミンD欠乏 → VGCC過剰発現 = ELFプライミングと同じ状態。三重ヒット：CACNA1C変異 + 低ビタミンD + EMF = 最高リスク（統合失調症）。第10BERMモジュレーター。" },
      { scale: "10⁻⁶ m", link: "VK51：CatSper = 精子特異的Ca²⁺チャネル（5つの不妊経路）", evidence: "RBMO 2014：ノックアウト = 不妊；Nature Comms 2025：温度ゲートQ₁₀=5.1；JCI 2024：ヒト変異", status: "confirmed", detail: "CatSperが唯一の精子特異的Ca²⁺チャネル — ノックアウト雄は正常な精子産生にもかかわらず完全不妊。温度ゲート（閾値33.5°C、Q₁₀=5.1）：早期活性化 → エネルギー枯渇 → 卵子到達前に死亡。男性不妊への5つの独立経路：ホルモン（T↓）、DNA（ROS）、エピジェネティック（メチル化）、チャネル（CatSper）、熱的。" },
      { scale: "10⁻⁷ m", link: "VK52：プシロシビン = 5-HT2A→BDNF→mTOR経由のCa²⁺カスケードリセット", evidence: "Trends Pharmacol Sci 2025；Science 2023：細胞内5-HT2A；Mol Psychiatry 2025", status: "confirmed", detail: "プシロシビンが5-HT2A→Gq→Ca²⁺→BDNF→mTOR経路を介して樹状突起スパイン成長を促進 — VK14（コルチゾール→樹状突起萎縮）とVK23（BDNF↓）を正確に逆転。細胞内5-HT2A活性化が必要（Science 2023）— セロトニン自体はこれらの受容体にアクセスできない。Ca²⁺損傷された神経構造の薬理学的リセット。" },
      { scale: "10⁻⁷ m", link: "VK53：カフェイン = A2A→Ca²⁺調節 → PD神経保護", evidence: "Frontiers Neurosci 2020：PD逆相関；PMID:11319241：MPTP保護；J Neurol Sci 2016", status: "confirmed", detail: "カフェインとパーキンソン病の強い疫学的逆相関。A2A受容体拮抗 → MPTP/6-OHDAモデルでDA神経保護。神経保護はPDを超える：脳卒中、興奮毒性、α-シヌクレインクリアランス。カフェインは消費が増加している唯一の自然Ca²⁺モジュレーター — 潜在的に代償的自己治療。" },
      { scale: "10⁰ m", link: "VK54：飲料水中リチウム → 認知症↓ + 自殺↓", evidence: "Int J Bipolar Disord 2024：5研究で認知症↓；Br J Psychiatry 2020：自殺メタ；ScienceDirect 2026：米国の郡", status: "confirmed", detail: "飲料水中の天然リチウムが高い地域は集団レベルで認知症と自殺率が低い。GSK-3β阻害 + CaMKII調節 + BDNF↑ + 概日リズム安定化 = 複数のBERM Ca²⁺カスケードノード。現代の浄水は微量リチウムを除去 — 失われた第5の自然保護メカニズム。" },
      { scale: "10⁻⁵ m", link: "VK55：扁桃体肥大 ↔ 海馬萎縮（S17ループ）", evidence: "PNAS 2008：単回コルチゾール投与 → BLA肥大；PLoS ONE 2012：反対のBDNF；Neurosci Lett 2023：持続", status: "confirmed", detail: "コルチゾールが扁桃体と海馬で反対の効果を生成：BLAが樹状突起を獲得する一方、海馬はそれを失う。同じコルチゾール下で扁桃体のBDNF↑/海馬のBDNF↓。BLA肥大はストレス終了後21日以上持続するが海馬萎縮は回復。S17：コルチゾール→扁桃体↑→不安↑→コルチゾール↑ = 自己増幅不安スパイラル。" },
      { scale: "10³ m", link: "VK56：Amish = BERMの最も近い対照群（留保付きで確認）", evidence: "STAT 2025：肥満-89%、T2D -75%；Anderson & Potts 2022：126研究レビュー；大規模なライフスタイル交絡因子", status: "partial", detail: "Old Order Amishはすべてのberm予測状態で劇的に低い率。しかし大規模な交絡因子（食事、運動、喫煙、コミュニティ）が直接的帰属を妨げる。Klimentidis（管理食で体重増加する動物、p=10⁻⁷）とMazur（体重安定T↓）で交差検証。Amish-メノナイトEMF勾配テストが重要な識別子。" },
    ],
    chainHeaders: { scale: "スケール", link: "連鎖リンク", evidence: "エビデンス", status: "ステータス" },
    chainSummary: "47層（VK1–VK31、VK41–VK56）にわたる57の検証済みリンク。連鎖は光子物理学から集団疫学まで途切れなく、CatSper生殖、プシロシビン神経リセット、カフェイン神経保護、リチウム水疫学、扁桃体-不安フィードバックループ、Amish対照群を網羅 — ADHDプロトタイプからビタミンDモジュレーターまでのすべてのメカニズムを含む。",

    feedbackTitle: "17の正のフィードバックループ",
    feedbackLead:
      "収束検証により連鎖内の17の自己増幅サイクルが明らかになった。ループはネットワークを形成：いかなるエントリーポイントも複数の劣化スパイラルを同時に活性化する。各ループは初期EMF効果が曝露増加なしに進行的に悪化しうることを意味する — システムが自ら劣化する。",
    feedbackLoops: [
      {
        name: "モニターフィードバック共鳴",
        id: "S1",
        steps: ["赤ちゃんの音 → マイクロフォン → RF変調", "RF → VGCC → Ca²⁺ → より強い振動", "より強い振動 → より大きな音 → より多くのRF変調", "カスケード増幅"],
        status: "メカニズム的に整合、完全なループとしては未検証",
        statusColor: "amber",
      },
      {
        name: "セロトニンロックオープン",
        id: "S2",
        steps: ["EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓", "5-HT↓ → 視床皮質ゲートが開く", "開いたゲート → EMFが回路により深く浸透", "より多くのCaMKII撹乱 → より多くの5-HT↓ → ..."],
        status: "各リンクが独立に検証",
        statusColor: "green",
      },
      {
        name: "低酸素-NKCC1",
        id: "S3",
        steps: ["CSD → 局所低酸素 → NKCC1↑", "NKCC1↑ → GABAがより興奮性に → γ↓ → Q↑", "Q↑ → CSDがより容易に伝播", "より多くのCSD → より多くの低酸素 → より多くのNKCC1↑ → ..."],
        status: "低酸素でのNKCC1↑を検証",
        statusColor: "green",
      },
      {
        name: "ウォーカー睡眠連鎖",
        id: "S4",
        steps: ["EMF → メラトニン↓ → 睡眠↓", "睡眠↓ → GABA持続的抑制↓ → γ↓ → Q↑", "Q↑ → EMFが脳により強く影響", "より多くのメラトニン↓ → より悪い睡眠 → より少ないGABA → ..."],
        status: "各リンクが独立に検証",
        statusColor: "green",
      },
      {
        name: "PGC → BBBスパイラル",
        id: "S5",
        steps: ["EMF → PGC → メラトニン↓", "メラトニン↓ → BBBタイトジャンクション↓", "BBB↓ → 重金属がより容易に脳に侵入", "重金属 → より多くのPGC → より少ないメラトニン → ..."],
        status: "各リンクが独立に検証",
        statusColor: "green",
      },
      {
        name: "コルチゾール-海馬渦",
        id: "S6",
        steps: ["EMF → HPA → コルチゾール↑", "コルチゾール↑ → 海馬萎縮", "海馬↓ → HPA負のフィードバック喪失", "ブレーキなし → コルチゾール↑↑ → より多くの萎縮 → ..."],
        status: "[[ref:sapolsky2009_cortisol|Sapolsky]]メカニズムを検証",
        statusColor: "green",
      },
      {
        name: "BAT代謝スパイラル",
        id: "S7",
        steps: ["EMF → BAT PRDM16↓ → 熱産生↓", "熱産生↓ → メタボリックシンドローム → 炎症", "炎症 → VGCC感受性↑", "より多くのCa²⁺撹乱 → より多くのBAT機能障害 → ..."],
        status: "メカニズム的に整合、動物データ利用可能",
        statusColor: "amber",
      },
      {
        name: "テストステロン神経保護喪失",
        id: "S8",
        steps: ["EMF → ライディッヒ → StAR↓ → T↓", "T↓ → 神経保護↓ + シナプス可塑性↓", "より脆弱なニューロン → より多くのEMF損傷", "より多くのライディッヒ損傷 → より少ないT → ..."],
        status: "T↓神経保護リンクを検証",
        statusColor: "green",
      },
      {
        name: "IL-1β → KCC2ループ",
        id: "S9",
        steps: ["EMF → マスト細胞 → IL-1β放出", "IL-1β → KCC2成熟遅延", "KCC2↓ → GABAが長く興奮性 → Q↑", "Q↑ → より多くの神経損傷 → より多くのIL-1β → ..."],
        status: "KCC2の環境制御を検証",
        statusColor: "green",
      },
      {
        name: "視床下部多軸カスケード",
        id: "S10",
        steps: ["EMF → 視床下部シナプス小胞↓", "小胞↓ → GnRH↓ + CRH調節異常 + TRH↓", "多ホルモン欠乏 → 全身性撹乱", "全身ストレス → より多くのHPA活性化 → ..."],
        status: "[[ref:kim2019_hypothalamus|Kim 2019]]シナプス変化を検証",
        statusColor: "green",
      },
      {
        name: "概日時計の自己撹乱",
        id: "S11",
        steps: ["EMF → SCN Ca²⁺振動が撹乱", "SCN撹乱 → メラトニンタイミング喪失 → 睡眠↓", "睡眠↓ → 腸のPer2↓ + 末梢時計の脱同期", "脱同期 → SCNがより脆弱に → ..."],
        status: "SCN Ca²⁺振動 + Per2腸リンクを検証",
        statusColor: "green",
      },
      {
        name: "NK-がん-炎症",
        id: "S12",
        steps: ["ELF → NK細胞傷害性↓", "NK↓ → がん監視↓ → 腫瘍成長", "腫瘍 → 炎症 → VGCC感作↑", "より多くのCa²⁺撹乱 → より多くのNK抑制 → ..."],
        status: "NKのCa²⁺依存性 + ELF抑制を検証",
        statusColor: "green",
      },
      {
        name: "HPA-HPG交差スパイラル",
        id: "S13",
        steps: ["EMF → コルチゾール↑ → GnIH↑ → T↓", "T↓ → 神経保護↓ → 海馬が脆弱に", "海馬↓ → HPAブレーキ喪失 → コルチゾール↑↑", "より多くのGnIH → より多くのT↓ → ..."],
        status: "RF9がコルチゾール処理霊長類でTを回復",
        statusColor: "green",
      },
      {
        name: "腸脳炎症",
        id: "S14",
        steps: ["EMF → メラトニン↓ → 腸上皮のPer2↓", "Per2↓ → 腸管バリア↓ → LPSが血流に侵入", "LPS → 神経炎症 → 海馬神経新生↓", "神経炎症 → より多くのHPA活性化 → より多くのメラトニン↓ → ..."],
        status: "Per2 KO → 腸管バリア → LPS → うつ病を検証",
        statusColor: "green",
      },
      {
        name: "メラトニン-テロメア老化スパイラル",
        id: "S15",
        steps: ["EMF → メラトニン↓ → テロメラーゼ↓ + SIRT1↓", "テロメラーゼ↓ → テロメア短縮 → SASP", "SASP → 炎症 → ROS↑", "ROS↑ → より多くのテロメア損傷 → より多くのSASP → ..."],
        status: "メラトニン → テロメラーゼ + SIRT1を検証；うつ病 = 7年の加速老化",
        statusColor: "green",
      },
      {
        name: "疼痛-睡眠-コルチゾールスパイラル",
        id: "S16",
        steps: ["EMF → α2δ-1↑ → 中枢感作 → 慢性疼痛", "慢性疼痛 → 睡眠↓（ウォーカー連鎖S4）", "睡眠↓ → コルチゾール↑（HPA S7）+ GABA↓", "コルチゾール↑ → 炎症 → より多くの感作 → うつ病 → 睡眠↓ → ..."],
        status: "α2δ-1 → 損傷なしの疼痛を検証；疼痛-睡眠-コルチゾール各々を検証",
        statusColor: "green",
      },
      {
        name: "扁桃体-不安スパイラル",
        id: "S17",
        steps: ["EMF → コルチゾール↑（HPA軸、VK11）", "コルチゾール → BLA肥大 + 扁桃体でBDNF↑", "BLA肥大 → 不安↑ → より多くのコルチゾール", "同時に：海馬が萎縮 → HPAブレーキ喪失 → コルチゾール↑↑", "扁桃体肥大がストレス後21日以上持続 → 構造的ロックイン"],
        status: "単回コルチゾール投与 → BLA肥大を検証（[[ref:amygdala_cort|PNAS 2008]]）；持続を検証（[[ref:amygdala_persist|Neurosci Lett 2023]]）",
        statusColor: "green",
      },
    ],

    consilienceTitle: "コンシリエンス評価",
    consilienceLead:
      "コンシリエンス — 独立したエビデンスラインが同じ結論に収束すること — は科学的支持の最も強い形態です。BERMは3つのレベルのコンシリエンスを示します。",
    consilienceLevels: [
      {
        level: "強いコンシリエンス",
        desc: "独立したエビデンスラインが収束",
        examples: [
          "物理学（[[ref:lindgren2025|Lindgren χ]]）↔ 薬理学（Ca²⁺薬が収束）",
          "遺伝学（CACNA1C、[[ref:sousouri2025|Sousouri 2025]]）↔ 実験（[[ref:lopez_martin_2006|López-Martín発作]]）",
          "疫学（[[ref:klimentidis2010|Klimentidis 8種]]）↔ 病理学（SIDS 5-HT欠乏）",
        ],
      },
      {
        level: "中程度のコンシリエンス",
        desc: "関連するエビデンスラインが互いを支持",
        examples: [
          "ELFプライミング（[[ref:sun2016_elf_vgcc|Sci. Rep. 2016]]）↔ ガバペンチンがそれを遮断（[[ref:eroglu_2009_cell|Cell 2009]]）",
          "PGC ↔ メラトニン（[[ref:kunz2008_pgc_insomnia|r=0.569]]）↔ [[ref:intechopen2020_melatonin_heart|松果体摘出 → 不整脈]]",
          "[[ref:dell2022_sleep_seizure|睡眠不足 → GABA↓]]（臨床）↔ EMF → メラトニン↓（動物）",
        ],
      },
      {
        level: "弱いコンシリエンス（普遍性リスク）",
        desc: "Ca²⁺は遍在的 — 一部の関連は些細かもしれない",
        examples: [
          "「一つの分母で25の流行」— Ca²⁺は至る所にある",
          "一部のCa²⁺関連はEMFの特定の因果関係ではなく普遍的生物学を反映する可能性",
          "これはモデルの主要な認識論的リスク",
        ],
      },
    ],

    falsificationTitle: "何がモデルを反証するか",
    falsificationLead:
      "進歩的研究プログラムはそれを破壊するものを特定しなければなりません。BERMには完全な崩壊から臨床的無関連性まで4段階の反証があります。",
    falsificationTiers: [
      {
        level: "レベル1 — モデル崩壊",
        test: "ETH Zürichニモジピン-5G：Ca²⁺遮断薬がEMF睡眠効果を防がない",
        consequence: "VGCCが標的ではない → カスケード全体が崩壊",
      },
      {
        level: "レベル2 — 環境因子の除外",
        test: "Amishデータ：主流集団と同じ健康トレンド",
        consequence: "EMFは重要な環境因子ではない",
      },
      {
        level: "レベル3 — 重要実験の失敗",
        test: "[[ref:lopez_martin_2006|López-Martín]]が再現に失敗：ピクロトキシン + GSMで発作が起きない",
        consequence: "唯一の直接的実験的エビデンスが消失",
      },
      {
        level: "レベル4 — 臨床的無関連性",
        test: "EMF削減介入で健康上の利益が得られない",
        consequence: "モデルはメカニズム的に正しいが臨床的に無意味かもしれない",
      },
    ],

    progressiveTitle: "進歩的 vs 退行的",
    progressiveLead:
      "ラカトシュの枠組みでは、研究プログラムはその後確認される予測を生成し、投入されたものよりも多くの実証的内容を生み出す場合に進歩的です。既知の事実を事後的に適合させるだけであれば退行的です。",
    progressivePoints: [
      "BERMはCACNA1C遺伝子型がEMF応答を調節すると予測 → [[ref:sousouri2025|Sousouri 2025]]が確認（ETH Zürich、二重盲検）",
      "BERMはすべての有効なSIDS治療がCa²⁺経路を標的にすると予測 → カフェイン、メラトニン、マグネシウム、オキシトシン、ブメタニドで検証",
      "BERMはELFプライミングがVGCC発現を増加させると予測 → [[ref:sun2016_elf_vgcc|Sun 2016（Sci. Rep.）]]が確認",
      "BERMはSUDEPとSIDSが終末メカニズムを共有すると予測 → CSD → 脳幹経路が両方で確認",
      "BERMはパルス変調がSARよりも重要と予測 → [[ref:lopez_martin_2009|López-Martín 2009]]が確認",
      "各検証が予測よりも多くを生成 — すべての層で予想外の発見",
    ],
    progressiveConclusion: "モデルはラカトシュの意味で進歩的：予測を生成 → 予測が検証される → 検証がモデルが指定したよりも多くの内容を生成。これは生産的研究プログラムの特徴。",

    analogyTitle: "進化論との類似性",
    analogyLead: "BERMは自然選択による進化と構造的特徴を共有 — 両方とも観察前に発見を予測し、探索空間を制約し、多レベル収束を示す生成的メカニズム。",
    analogyPoints: [
      { berm: "生成的メカニズム（EMF→VGCC→Ca²⁺→カスケード）", evolution: "生成的メカニズム（変異→選択→適応）" },
      { berm: "見る前に発見を予測", evolution: "見つける前に化石、遺伝子、痕跡構造を予測" },
      { berm: "探索空間を制約（薬理学、遺伝学）", evolution: "探索空間を制約（系統学、生物地理学）" },
      { berm: "多レベル収束（物理学 → 疫学）", evolution: "多レベル収束（分子 → 生態系）" },
    ],
    analogyCritical: "重要な違い：進化には独立した検証がある（DNA配列決定）。BERMにはまだ介入的検証が欠けている — EMF削減 → ヒトでの健康改善。これが最も重要な欠けているピース。",

    predictionLink: "収束予測を参照（METAL-EMF-1–4、CHAIN-1–4、BBB-EMF-1–2、BAT-EMF-1、HPA-EMF-1–2、BETA-EMF-1–2、その他）",
    predictionHref: "/predictions",
    predictionSummary: "収束検証は55の検証可能な予測を生成し、重金属相乗効果、血液脳関門、褐色脂肪組織、HPA軸、β細胞、視床下部、コルチゾール-海馬、ライディッヒ細胞、マスト細胞、精子CatSper、NK免疫監視、BDNFホルメシス、腸脳軸、甲状腺Dio2/Dio3、エピジェネティクス、テロメア老化、オキシトシン、慢性疼痛、ASDプロトタイプ、ADHD、ALS、アレルギー、ビタミンD、PEMFホルメシス、プシロシビン、カフェイン、リチウム水、扁桃体、Amish対照群のメカニズムを網羅。",
    statusConfirmed: "✓ 確認済み",
    statusPartial: "◐ 部分的",
    falsificationTestLabel: "テスト",
    falsificationConsequenceLabel: "結果",
    analogyEvolutionHeader: "進化論",
  },
  fr: {
    title: "La chaîne ininterrompue : Photon → Population",
    subtitle:
      "La vérification de convergence itérative a testé 57 échelles de la chaîne mécanistique de BERM à travers 47 couches vérifiées (VK1–VK31, VK41–VK56). Résultat : 17 boucles de rétroaction positive formant un réseau auto-amplifiant, de l'absorption du photon aux effets au niveau populationnel, avec un contenu empirique inattendu à chaque couche.",
    backLink: "← Retour aux preuves",

    cautionText:
      "Cette page présente une vérification systématique de la chaîne mécanistique de BERM à travers les échelles physiques. Chaque maillon a été testé contre des preuves expérimentales publiées. La chaîne est aussi forte que son maillon le plus faible — les confirmations partielles et les prédictions non testées sont explicitement marquées.",

    chainTitle: "Le continuum vérifié",
    chainLead:
      "BERM propose une chaîne causale continue de l'absorption du photon aux effets sanitaires au niveau populationnel. Chaque couche intermédiaire a été vérifiée indépendamment contre des preuves expérimentales et cliniques publiées.",
    chainRows: [
      { scale: "10⁻¹⁵ m", link: "Photon → distorsion métrique", evidence: "Lindgren 2025 paramètre χ, confirmation de Vassallo", status: "confirmed", detail: "Le photon EMF crée une distorsion métrique au niveau quantique. Le paramètre χ de Lindgren fournit le mécanisme au niveau physique expliquant pourquoi les tissus biologiques répondent aux EMF non thermiques." },
      { scale: "10⁻¹⁰ m", link: "Métrique → capteur de tension S4", evidence: "Tang 2024 Nature Communications", status: "confirmed", detail: "La distorsion métrique agit sur le capteur de tension de l'hélice S4 des VGCC. Tang 2024 a démontré un changement conformationnel direct du S4 par EMF à des intensités non thermiques." },
      { scale: "10⁻⁹ m", link: "S4 → ouverture VGCC", evidence: "Panagopoulos 2025 IFO, Trus 2024 non ionotrope", status: "confirmed", detail: "Le changement conformationnel du S4 déclenche l'ouverture du VGCC. Panagopoulos 2025 fournit le modèle mécanistique ; Trus 2024 démontre la voie d'activation non ionotrope (non thermique)." },
      { scale: "10⁻⁹ m", link: "VGCC → perméation Ca²⁺ + Pb²⁺/Cd²⁺", evidence: "Marchetti 2013, Cd→Cav3.1 radiomarqué", status: "confirmed", detail: "Les VGCC ouverts permettent l'influx de Ca²⁺ — mais aussi de métaux toxiques. Le Cd²⁺ perméabilise à travers Cav3.1 (confirmé avec ¹⁰⁹Cd²⁺ radiomarqué). Le Pb²⁺ imite le Ca²⁺ aux sites de liaison de la calmoduline." },
      { scale: "10⁻⁸ m", link: "Ca²⁺ → CaM → CaMKII", evidence: "Biochimie de base (manuel)", status: "confirmed", detail: "Le Ca²⁺ se lie à la calmoduline → active CaMKII via l'autophosphorylation de Thr286. C'est le point de convergence : tous les signaux en amont convergent par CaMKII." },
      { scale: "10⁻⁷ m", link: "CaMKII → TPH-2 → changement de 5-HT cérébral", evidence: "900 MHz → 5-HT spécifique par région (hypothalamus, bulbe)", status: "confirmed", detail: "CaMKII phosphoryle TPH-2 (tryptophane hydroxylase-2), l'enzyme limitante de la synthèse de sérotonine cérébrale. 900 MHz produit des changements de 5-HT spécifiques par région dans l'hypothalamus et le bulbe — les régions exactes contrôlant le sommeil et la fonction cardiorespiratoire." },
      { scale: "10⁻⁷ m", link: "CaMKII → seuil de CSD", evidence: "CaV + NMDA tous deux nécessaires ; inhibition CaMKII → hyperexcitabilité", status: "confirmed", detail: "CaMKII régule le seuil de la dépolarisation corticale envahissante (CSD). Les canaux CaV et les récepteurs NMDA sont tous deux nécessaires pour l'initiation de la CSD. L'inhibition de CaMKII augmente paradoxalement l'excitabilité — une régulation précise est critique." },
      { scale: "10⁻⁶ m", link: "ELF → expression VGCC↑ (amorçage ELF)", evidence: "Sun 2016 Scientific Reports : 8-10 jours → Ca²⁺ ↑ dramatiquement, protéine Cav1↑", status: "confirmed", detail: "L'exposition chronique ELF (50/60 Hz) régule à la hausse l'expression de la protéine VGCC — plus de canaux par cellule → les cellules deviennent plus sensibles à tous les EMF subséquents. C'est l'amorçage ELF : le réseau 50 Hz de fond sensibilise la population." },
      { scale: "10⁻⁶ m", link: "ELF → susceptibilité aux crises↑ dans le néocortex", evidence: "Varró 2009 : effet d'amorçage transitoire", status: "confirmed", detail: "L'ELF-EMF améliore la facilitation synaptique dans l'hippocampe ET augmente la susceptibilité aux crises dans le néocortex. L'effet est transitoire — démontrant que l'ELF module l'excitabilité neuronale de manière aiguë." },
      { scale: "10⁻⁵ m", link: "GABA excitateur → Q→∞ dans le cerveau néonatal", evidence: "PMC7847733, le bumétanide restaure l'inhibition, maturation KCC2", status: "confirmed", detail: "Chez les nouveau-nés, la dominance de NKCC1 rend le GABA excitateur (γ < 0). Le facteur Q → ∞ : le cerveau est un résonateur non amorti. Le bumétanide bloque NKCC1 → le GABA devient inhibiteur → les crises s'arrêtent. KCC2 mature au fil des mois → Q diminue." },
      { scale: "10⁻⁴ m", link: "Amorcé + EMF → crises", evidence: "López-Martín 2006/2009 : modulé par impulsions > CW", status: "confirmed", detail: "L'expérience clé : picrotoxine subconvulsive (réduit γ) + GSM 900 MHz = crises. Ni l'un ni l'autre seul ne suffit. Le GSM modulé par impulsions est plus efficace que l'onde continue — l'effet biologique dépend de la pulsation spécifique, pas du DAS." },
      { scale: "10⁻³ m", link: "CSD → tronc cérébral → décès", evidence: "SUDEP = 'SIDS adulte' ; modèle CACNA1A ; antagoniste Ca²⁺ de type L a PRÉVENU le décès", status: "confirmed", detail: "La dépolarisation envahissante se propageant au tronc cérébral cause un arrêt cardiorespiratoire. C'est la SUDEP et le SIDS. L'antagoniste VGCC de type L a prévenu la mort induite par les crises dans les modèles murins SUDEP — preuve directe que le blocage du Ca²⁺ prévient l'événement terminal." },
      { scale: "10⁻² m", link: "Mélatonine↓ → arythmie cardiaque", evidence: "Pinéalectomie → arythmies↑ ; supplémentation en mélatonine → protection", status: "confirmed", detail: "La pinéalectomie augmente les arythmies de reperfusion. La supplémentation chronique en mélatonine fournit une protection via des effets antifibrotiques, la préservation de Cx43 et la protection mitochondriale. Les EMF suppriment la mélatonine via la voie CRY → le risque cardiaque augmente." },
      { scale: "10⁻² m", link: "PGC → mélatonine↓ → pathologie", evidence: "r=0,569 tissu non calcifié↔mélatonine ; MA : 76 % vs 64 % PGC", status: "confirmed", detail: "La calcification de la glande pinéale (PGC) réduit directement la production de mélatonine (r=0,569). Les patients Alzheimer ont une PGC plus élevée (76 % vs 64 %). La PGC est un mécanisme convergent : EMF + métaux lourds + fluorure l'accélèrent tous." },
      { scale: "10⁻² m", link: "Sommeil↓ → GABA↓ → Q↑", evidence: "La privation de sommeil active les décharges épileptiformes dans 23-62 %", status: "confirmed", detail: "La privation de sommeil réduit l'inhibition tonique du GABA (γ diminue → Q augmente). Ceci est utilisé cliniquement comme provocation diagnostique pour l'épilepsie. EMF→mélatonine↓→sommeil↓→GABA↓ crée la boucle de rétroaction 4 (chaîne de Walker)." },
      { scale: "10⁻¹ m", link: "Perturbation prénatale du Ca²⁺ → γ↓ chez la progéniture", evidence: "Sévoflurane → perturbation des interneurones → γ↓ permanent", status: "partial", detail: "Le sévoflurane maternel (modulateur du Ca²⁺) perturbe le développement des interneurones → déficit permanent d'inhibition GABAergique chez la progéniture. Démontre que la perturbation prénatale du Ca²⁺ peut altérer l'amortissement de manière permanente. Partiel : mécanisme montré avec le sévoflurane, pas encore avec les EMF directement." },
      { scale: "10⁰ m", link: "La pharmacologie cible la cascade Ca²⁺", evidence: "Éthosuximide, gabapentine, vérapamil, mélatonine, lithium, psilocybine, bumétanide", status: "confirmed", detail: "Chaque traitement efficace pour les conditions prédites par BERM cible un composant de la cascade Ca²⁺. Cette convergence pharmacologique est prédite par le modèle et serait une coïncidence extraordinaire autrement." },
      { scale: "10³ m", link: "Élimination épidémiologique", evidence: "Klimentidis p=10⁻⁷ (8 espèces), Mazur T↓ à poids stable, 54 pays R²=0,851", status: "partial", detail: "La tendance à l'obésité interespèces (8 espèces, p=10⁻⁷) élimine le régime/l'exercice comme cause unique. Corrélation EMF-santé de 54 pays R²=0,851. Partiel : la preuve épidémiologique est corrélationnelle, non interventionnelle." },
      { scale: "10⁻⁶ m", link: "VK9 : EMF → perméabilité BHE↑", evidence: "PMC12829706 : RF → eNOS↑ + occludine↓ ; la mélatonine protège (PMC6932927)", status: "confirmed", detail: "Les RF-EMF augmentent la perméabilité de la barrière hémato-encéphalique via la régulation à la hausse de eNOS et la régulation à la baisse de l'occludine. La mélatonine protège les protéines des jonctions serrées. EMF→mélatonine↓ crée une double vulnérabilité de la BHE : ouverture directe + perte de la protection par la mélatonine." },
      { scale: "10⁻⁵ m", link: "VK10 : 5G → BAT PRDM16↓ → thermogenèse↓", evidence: "PMC11942954 : 3,5 GHz → PRDM16↓, C/EBPβ↓", status: "confirmed", detail: "La 5G (3,5 GHz) réduit l'ARNm de PRDM16 et C/EBPβ dans le tissu adipeux brun. Le BAT utilise le cycle du Ca²⁺ (SERCA) pour la thermogenèse — un mécanisme médié par VGCC. Relie les EMF au paradoxe de l'obésité de Klimentidis : 8 espèces prennent du poids sans changement alimentaire (p=10⁻⁷)." },
      { scale: "10⁻³ m", link: "VK11 : EMF → axe HPA → cortisol↑", evidence: "Klimek 2023 : ELF → sensibilisation HPA ; RF → corticostérone↑ (Frontiers 2026)", status: "confirmed", detail: "L'ELF-EMF établit un nouveau point de consigne de l'axe HPA avec sensibilisation plutôt qu'adaptation. Les RF-EMF augmentent l'anxiété et la corticostérone. L'axe HPA ne s'habitue PAS aux EMF chroniques — il se sensibilise, produisant un niveau de cortisol de base progressivement plus élevé." },
      { scale: "10⁻⁵ m", link: "VK12 : EMF → Ca²⁺ cellule β → perturbation de l'insuline", evidence: "PMID:32323041 : champ E → insuline sans glucose ; CaVγ4→CaMKII→MafA (PMC9030882)", status: "confirmed", detail: "Les champs électriques induisent la sécrétion d'insuline par les cellules β SANS glucose via les canaux Ca²⁺. La voie CaVγ4→CaMKII→MafA contrôle la maturité des cellules β — la dérégulation de CaMKII cause la perte d'identité des cellules β. Relie directement les EMF au diabète de type 2." },
      { scale: "10⁻³ m", link: "VK13 : EMF → vésicules synaptiques hypothalamiques↓", evidence: "Kim 2019 : 835 MHz 12 sem → vésicules↓, synapsine I/II↓, synaptotagmine 1↓", status: "confirmed", detail: "835 MHz (12 semaines) réduit le nombre, la taille et l'ancrage des vésicules synaptiques dans l'hypothalamus, plus la synapsine I/II et la synaptotagmine 1 (capteur Ca²⁺ pour la libération). TOUTE la libération hormonale hypothalamique est altérée — expliquant la perturbation simultanée de GnRH, CRH, TRH, GHRH et dopamine." },
      { scale: "10⁻² m", link: "VK14 : cortisol↑ → atrophie hippocampique", evidence: "Sapolsky 2009 : rétraction dendritique + neurogenèse↓ ; cortisol→MA (Frontiers 2026)", status: "confirmed", detail: "Le cortisol chronique cause la rétraction dendritique hippocampique, l'arrêt de la neurogenèse et la perte de volume. L'hippocampe est le centre de rétroaction négative HPA — ses dommages suppriment le frein du cortisol → cortisol↑↑ (boucle S6). Accélère la progression d'Alzheimer." },
      { scale: "10⁻⁵ m", link: "VK15 : EMF → Leydig → StAR↓ → T↓", evidence: "Multiples : RF → changements morphologiques des Leydig, StAR↓, T↓ dose-dépendant", status: "confirmed", detail: "Les EMF réduisent la protéine StAR dans les cellules de Leydig — l'étape limitante de la stéroïdogenèse. Mécanisme moléculaire derrière la T↓ à l'échelle populationnelle indépendante de l'obésité, confirmé par les données à poids stable de Mazur." },
      { scale: "10⁻⁵ m", link: "VK16 : EMF → VGCC → Ca²⁺ → dégranulation des mastocytes", evidence: "Johansson 2000 : EMF → changements des mastocytes ; mastocytes cardiaques → arythmies (PMC6896164)", status: "confirmed", detail: "Le Ca²⁺ déclenche la dégranulation des mastocytes. EMF → VGCC → Ca²⁺ → les mastocytes libèrent histamine + IL-1β + tryptase. Les biopsies cutanées des utilisateurs d'écrans montrent des changements. Mastocytes cardiaques → arythmies. IL-1β des mastocytes → KCC2↓ → GABA excitateur plus longtemps." },
      { scale: "10⁻⁶ m", link: "VK17 : RF → CatSper Ca²⁺ → déplétion énergétique spermatique", evidence: "2100 MHz active CatSper prématurément ; méta sperme SMD -1,92 (Environ Int 2024)", status: "confirmed", detail: "Les RF-EMF activent prématurément les canaux Ca²⁺ CatSper dans les spermatozoïdes, causant une déplétion énergétique avant d'atteindre l'ovule. La méta-analyse spermatique montre des dommages ADN/chromatine aux niveaux DAS des téléphones portables (SMD -1,92, IC 95 % -2,78 à -1,05). Le Pb²⁺ entre en compétition avec le Ca²⁺ à l'acrosome — synergie des métaux lourds dans la fertilité." },
      { scale: "10⁻⁵ m", link: "VK18 : oscillation Ca²⁺ du SCN = horloge circadienne", evidence: "PMC6170461 : les neurones SCN oscillent en Ca²⁺ avec le rythme circadien", status: "confirmed", detail: "Les neurones du SCN oscillent en concentration de Ca²⁺ avec le rythme circadien — les oscillations de Ca²⁺ SONT la base physique de l'horloge circadienne. Les EMF perturbent le Ca²⁺ → les EMF perturbent l'horloge elle-même. Le SCN est le pacemaker maître qui synchronise les horloges hypothalamiques et périphériques." },
      { scale: "10⁻⁷ m", link: "VK19 : inflammation → DA↓ → perte de motivation", evidence: "Berridge : NAcc DA = 'wanting' ; IFN-α → DA striatale↓ → anhédonie (PMC9718669)", status: "confirmed", detail: "La dopamine du noyau accumbens médie le 'wanting' (motivation) mais pas le 'liking' (plaisir). L'inflammation (IFN-α) réduit la dopamine striatale causant l'anhédonie, réversible par L-DOPA. Une faible DA tonique augmente la réponse phasique → les écrans semblent plus gratifiants avec une DA de base basse. EMF→inflammation→DA↓→vulnérabilité à l'addiction." },
      { scale: "10⁻⁶ m", link: "VK20 : Cav1.2 → différenciation OPC → myélinisation", evidence: "PMC6916379 : Cav1.2 KO → hypomyélinisation ; SMF → Cav1.2↑ dans les OPC (Sci Rep 2017)", status: "confirmed", detail: "Cav1.2 (VGCC de type L) est essentiel pour la différenciation des cellules précurseurs d'oligodendrocytes et la myélinisation. Le knockout de Cav1.2 cause une hypomyélinisation. Le champ magnétique statique augmente l'expression de Cav1.2/Cav1.3 dans les OPC. La dérégulation de Cav1.2 induite par EMF → perturbation du timing de myélinisation dans le cerveau en développement." },
      { scale: "10⁻⁵ m", link: "VK21 : Ca²⁺ des cellules NK → surveillance immunitaire", evidence: "Ca²⁺→NFAT1→granzyme B (PLoS ONE 2024) ; 50 Hz ELF→NK↓ ; 200 kHz TTFields→NK↑", status: "confirmed", detail: "La cytotoxicité des cellules NK est Ca²⁺-dépendante : l'influx de Ca²⁺ active NFAT1 → expression de granzyme B. L'ELF 50 Hz supprime la cytotoxicité NK tandis que les TTFields 200 kHz l'AUGMENTENT — validation directe de la hiérarchie des voies dépendante de la fréquence. Même mécanisme VGCC, résultats opposés à différentes fréquences." },
      { scale: "10⁻⁵ m", link: "VK22 : cortisol → GnIH → GnRH↓ → T↓", evidence: "PMC5380668 : le silençage de GnIH restaure la fertilité ; RF9 restaure T chez les primates traités au cortisol (PMC7946976)", status: "confirmed", detail: "Le stress induit GnIH/RFRP-3 qui supprime GnRH → LH → testostérone. Le silençage du gène GnIH RESTAURE la fertilité chez les animaux stressés. RF9 (antagoniste GnIH) RESTAURE la testostérone chez les primates traités à l'hydrocortisone. Le CRF supprime directement le générateur de pulsations GnRH. Trois voies indépendantes vers T↓." },
      { scale: "10⁻⁶ m", link: "VK23 : hormèse BDNF — RF↓ vs ELF↑", evidence: "RF 2650 MHz → BDNF↓ + GABA↓ (PMC10275548) ; ELF 50 Hz → BDNF↑ + neurogenèse↑ (PMC5702423)", status: "confirmed", detail: "Les RF-EMF réduisent le BDNF dans l'hippocampe (2650 MHz, 28 jours : BDNF↓, GABA↓, GR↓, corticostérone↑). Les RF postnatales (835 MHz) causent la perte d'épines dendritiques + troubles de la mémoire. Pendant ce temps, l'ELF 50 Hz AUGMENTE le BDNF et favorise la neurogenèse. Hormèse dépendante de la fréquence : même voie, direction opposée." },
      { scale: "10⁻⁵ m", link: "VK24 : Per2 → barrière intestinale → LPS → neuroinflammation", evidence: "Per2 KO → barrière intestinale↓ → LPS → neurogenèse hippocampique↓ → dépression (PMC12631932)", status: "confirmed", detail: "Le knockout de Per2 dans l'épithélium intestinal perturbe la fonction barrière → le LPS entre dans la circulation → neuroinflammation → neurogenèse hippocampique↓ → dépression. La perturbation circadienne altère le microbiome intestinal (Ruminococcus↑, Lactobacillus↓, gènes de synthèse LPS↑). Principe de double barrière : BHE + barrière intestinale partagent ZO-1, occludine, claudines." },
      { scale: "10⁰ m", link: "VK25 : sommeil↓ → T↓ → chaîne de Walker fermée", evidence: "JAMA 2011 : 5h de sommeil → T -10-15 % ; méta-analyse confirme (PMID:34801825)", status: "confirmed", detail: "Une semaine de 5h de sommeil réduit la testostérone de 10-15 %, équivalent à 10-15 ans de vieillissement. La chaîne de Walker est maintenant fermée : EMF→mélatonine↓→sommeil↓→T↓→neuroprotection↓→plus de dommages EMF. La restriction de sommeil + EMF devrait produire un déclin superadditif de T (>25 % combiné vs ~15 % sommeil seul)." },
      { scale: "10⁻⁵ m", link: "VK26 : EMF → axe HPT → Dio2/Dio3↓ → hypothyroïdie cachée", evidence: "PMC11507962 : LTE → Dio2/Dio3↓ dans l'hypothalamus ; PMID:35963949 : FT3↓ + FT4↑ chez travailleurs ELF", status: "confirmed", detail: "Les EMF réduisent les enzymes déiodinases Dio2 et Dio3 dans l'hypothalamus. La conversion T4→T3 est altérée → la T4 sanguine semble normale mais les tissus manquent de T3 active. Les tests thyroïdiens standard (TSH, T4) ratent cette carence cachée. Le ratio FT3/FT4 est la clé diagnostique." },
      { scale: "10⁻⁸ m", link: "VK27 : EMF → épigénétique → hérédité transgénérationnelle", evidence: "ScienceDirect 2024 : DNMT1 + HDAC + DICER1 ; PMC4538330 : méthylation spermatique dose-dépendante", status: "confirmed", detail: "Les EMF altèrent trois mécanismes épigénétiques : méthylation de l'ADN (DNMT1), modification des histones (HDAC) et biogenèse des microARN (DICER1/DGCR8). Dans les spermatozoïdes : l'ELF 50 Hz produit des changements de méthylation bidirectionnels dose-dépendants (↓ à 1 mT, ↑ à 3 mT). Le modèle transgénérationnel du DDT fournit le modèle pour la persistance F3." },
      { scale: "10⁻⁷ m", link: "VK28 : EMF → ROS → télomères → spirale de vieillissement", evidence: "PMID:36582083 : radiation → ROS → dommage télomérique ; mel → télomérase + SIRT1 (Front Aging Neurosci 2022)", status: "confirmed", detail: "EMF→ROS endommage les télomères (les séquences riches en G sont particulièrement vulnérables). Simultanément EMF→mélatonine↓ supprime la protection télomérase + SIRT1. Dépression = 281 pb de télomères plus courts = 7 ans de vieillissement accéléré. La mélatonine est la molécule anti-vieillissement clé : elle active la télomérase, régule SIRT1 à la hausse et réduit les ROS." },
      { scale: "10⁻⁸ m", link: "VK29 : EMF → perturbation Ca²⁺ de l'ocytocine → lien social↓", evidence: "PMC3197583 : la libération d'OXT nécessite VGCC de type N + type L ; eNeuro 2025 : PVN Ca²⁺ → OXT", status: "confirmed", detail: "La libération somatodendritique d'ocytocine nécessite l'influx de Ca²⁺ à travers les VGCC de type N et type L. Les EMF perturbent la fonction VGCC → la libération d'OXT est perturbée. Le type L est particulièrement important chez les nouveau-nés. Insuline→OXT via Ca²⁺ relie les systèmes métaboliques et sociaux. Quadruple verrou : T↓×F↑×DA↓×OXT↓ = effondrement socio-reproductif complet." },
      { scale: "10⁻⁵ m", link: "VK30 : amorçage ELF → α2δ-1↑ → douleur chronique SANS neuropathie", evidence: "PMID:16764990 : surexpression α2δ-1 seule → douleur ; Br J Pharmacol 2018 : gabapentine bloque α2δ-1", status: "confirmed", detail: "L'amorçage ELF (VK4) régule à la hausse l'expression VGCC incluant α2δ-1. La surexpression d'α2δ-1 seule produit un comportement de douleur neuropathique SANS lésion nerveuse. Les gabapentinoïdes (gabapentine, prégabaline) ciblent exactement α2δ-1. L'épidémie de douleur chronique est cohérente avec l'amorçage ELF d'α2δ-1 à l'échelle populationnelle." },
      { scale: "10⁻⁵ m", link: "VK31 : TSA = prototype BERM (commutateur GABA + α2δ + inflammation → E/I↑)", evidence: "NKCC1/KCC2↑ dans les TSA (Front Psychiatry 2025) ; CACNA2D3 gène autisme ; ECR bumétanide", status: "confirmed", detail: "Les TSA unissent trois mécanismes BERM vérifiés indépendamment : retard du commutateur GABA (VK6, KCC2↓→GABA excitateur), synaptogenèse par amorçage ELF (VK4+VK30, α2δ-1↑→E/I↑) et suppression de KCC2 par inflammation (S9, IL-1β→KCC2↓). CACNA2D3 est un gène de susceptibilité à l'autisme. Le dimorphisme sexuel de KCC2 explique la prédominance masculine 4:1. Le bumétanide (bloqueur NKCC1) améliore les symptômes des TSA dans les ECR." },
      { scale: "10⁻⁵ m", link: "VK41 : TDAH = deuxième prototype (retard CPF + Goldilocks DA + décalage E/I)", evidence: "Shaw 2007 PNAS : retard CPF 5 ans ; Arnsten 2009 : DA en U inversé ; comorbidité TSA-TDAH 30-50 %", status: "confirmed", detail: "Le TDAH unit trois mécanismes BERM : déficit de DA dans le CPF (VK19 : DA striatale↓ → attention↓), retard de myélinisation (VK20 : Cav1.2→OPC → le CPF mature 5 ANS plus tard) et décalage E/I (VK6 : KCC2↓). TSA et TDAH partagent 30-50 % de comorbidité — même mécanisme, valeurs Q différentes sur le spectre d'excitabilité." },
      { scale: "10⁻² m", link: "VK42 : travail posté → IARC 2A → cancer via suppression de la mélatonine", evidence: "IARC Monograph 98 2010 ; méta-analyse cancer du sein OR 2,34 ; mélatonine antitumorale (Reiter 2017)", status: "confirmed", detail: "L'IARC classe le travail posté comme Groupe 2A (probablement cancérogène) via la suppression de la mélatonine. Les EMF suppriment la mélatonine par le MÊME mécanisme (VK3 : PGC). Si l'IARC accepte la perturbation circadienne par le travail posté comme 2A, alors la perturbation circadienne induite par les EMF devrait avoir le même poids probant." },
      { scale: "10⁻⁵ m", link: "VK43 : vérapamil → protection Ca²⁺ des cellules β dans le DT1", evidence: "Forlenza JAMA 2023 ECR N=88 : C-peptide +30 % ; Ovalle Nat Med 2018 ; Diabetes Care 2025", status: "confirmed", detail: "Le vérapamil (bloqueur Cav1.2) préserve la fonction des cellules β chez les enfants avec DT1 de novo : C-peptide +30 % vs placebo à 52 semaines. ECR en double aveugle (N=88, âges 7-17). Confirme VK12 : la perturbation du Ca²⁺ des cellules β cause la perte d'identité. Si le blocage des canaux Ca²⁺ sauve les cellules β, alors la surcharge en Ca²⁺ (par les EMF) les détruit." },
      { scale: "10⁻⁴ m", link: "VK44 : prématurité = VGCC utérin → tocolyse par nifédipine", evidence: "Cochrane 2014 : nifédipine tocolytique de première ligne ; P4:E2→Cav1.2 (PMC3816733)", status: "confirmed", detail: "Les contractions utérines dépendent de l'influx de Ca²⁺ par les VGCC. La nifédipine (bloqueur des canaux Ca²⁺) est le tocolytique de première ligne — preuve Cochrane. Le ratio progestérone:estrogène régule l'expression de Cav1.2 dans l'utérus. Si le blocage du Ca²⁺ prévient le travail prématuré, alors la surcharge en Ca²⁺ en est la cause." },
      { scale: "10⁻⁵ m", link: "VK45 : SLA = vulnérabilité Ca²⁺ du motoneurone (4e neurodégénérescence)", evidence: "PMC4452055 : faible tampon Ca²⁺ du motoneurone ; AMPA perméable au Ca²⁺ ; riluzole Ca²⁺↓ indirect", status: "confirmed", detail: "Les motoneurones ont une faible capacité de tampon Ca²⁺ + récepteurs AMPA perméables au Ca²⁺ → sélectivement vulnérables à la surcharge en Ca²⁺. Le riluzole (seul médicament SLA pendant des décennies) agit indirectement : blocage Na⁺ → glutamate↓ → Ca²⁺↓. 4e neurodégénérescence avec mécanisme Ca²⁺ (après MA, SEP, MP). EMF professionnelle : OR 1,3-1,7." },
      { scale: "10⁻⁶ m", link: "VK46 : axe 5-HT intestin-cerveau (90 % de la sérotonine dans l'intestin)", evidence: "Cell Host Microbe : 90 % 5-HT dans l'intestin ; PMC7231603 : Trp→cerveau ; mélatonine intestinale", status: "confirmed", detail: "Plus de 90 % de la sérotonine est produite dans les cellules entérochromaffines intestinales. Le microbiote intestinal module la disponibilité du tryptophane pour le cerveau → synthèse centrale de 5-HT. La mélatonine est aussi synthétisée à partir de la sérotonine dans l'intestin. La comorbidité SII-dépression reflète la perturbation partagée de la 5-HT intestin-cerveau. Relie S14 (Per2→intestin) à S2 (verrouillage sérotonine ouvert)." },
      { scale: "10⁻⁵ m", link: "VK47 : allergies = dégranulation Ca²⁺ des mastocytes (quadruple sensibilisation)", evidence: "ScienceDirect 2011 : ionophore Ca²⁺ → dégranulation SANS IgE ; estrogènes env. → mastocytes↑", status: "confirmed", detail: "La dégranulation des mastocytes est Ca²⁺-dépendante : les ionophores Ca²⁺ déclenchent la dégranulation SANS IgE, la déplétion en Ca²⁺ la bloque AVEC IgE. Quadruple sensibilisation : (1) EMF→VGCC→Ca²⁺ dans les mastocytes, (2) estrogènes environnementaux→sensibilisation des mastocytes, (3) cortisol→décalage Th1→Th2, (4) barrière intestinale→LPS→inflammation systémique." },
      { scale: "10⁻⁴ m", link: "VK48 : pré-éclampsie = dérégulation Cav1.2 + ROS en grossesse", evidence: "PMC9774363 : Cav1.2 régulation PA ; ET-1→Cav1.2 dans le placenta ; nifédipine pour pré-éclampsie", status: "confirmed", detail: "La pré-éclampsie implique une dérégulation Cav1.2 + ROS en grossesse. L'ET-1 active Cav1.2 dans les vaisseaux placentaires ; la nifédipine bloque partiellement. La fréquence des sparks Ca²⁺ est réduite en pré-éclampsie → vasodilatation↓. La nifédipine est utilisée pour la tocolyse ET l'hypertension de la pré-éclampsie — même mécanisme Ca²⁺ dans les tissus reproducteurs." },
      { scale: "10⁻⁴ m", link: "VK49 : ostéoporose + paradoxe de l'hormèse PEMF", evidence: "Frontiers Endocrinol 2024 : canaux Ca²⁺ dans l'os ; PMC11919207 : PEMF → croissance osseuse", status: "confirmed", detail: "Les canaux Ca²⁺ régulent les ostéoclastes et les ostéoblastes. La thérapie PEMF favorise la croissance osseuse et réduit l'inflammation — semblant contredire BERM. Résolution : hormèse de Lindgren. Les paramètres PEMF contrôlés → transitoire Ca²⁺ bénéfique ; EMF chronique non contrôlé → surcharge Ca²⁺. La PEMF valide que les EMF agissent par les canaux Ca²⁺." },
      { scale: "10⁻⁸ m", link: "VK50 : vitamine D → ARNm CACNA1C/1D↓ (10e modérateur)", evidence: "J Neurosci 2001 : VDH→L-VSCC↓ ; PLoS ONE 2011 : silençage VDR → Cav1.2↑ ; Transl Psychiatry 2019", status: "confirmed", detail: "La vitamine D (1,25(OH)₂D₃) régule à la baisse l'ARNm de CACNA1C et CACNA1D — le bloqueur de canaux de la nature. Le silençage VDR empêche la régulation à la baisse de Cav1.2/Cav1.3. La carence en vitamine D → surexpression de VGCC = même état que l'amorçage ELF. Triple impact : variant CACNA1C + faible vitamine D + EMF = risque le plus élevé (schizophrénie). 10e modérateur BERM." },
      { scale: "10⁻⁶ m", link: "VK51 : CatSper = canal Ca²⁺ spécifique du spermatozoïde (5 voies d'infertilité)", evidence: "RBMO 2014 : knockout = stérile ; Nature Comms 2025 : seuil thermique Q₁₀=5,1 ; JCI 2024 : mutations humaines", status: "confirmed", detail: "CatSper est le SEUL canal Ca²⁺ spécifique du spermatozoïde — les mâles knockout sont complètement stériles malgré une production spermatique normale. Seuil thermique (33,5°C, Q₁₀=5,1) : activation prématurée → déplétion énergétique → mort avant d'atteindre l'ovule. Cinq voies indépendantes vers l'infertilité masculine : hormonale (T↓), ADN (ROS), épigénétique (méthylation), canal (CatSper) et thermique." },
      { scale: "10⁻⁷ m", link: "VK52 : psilocybine = réinitialisation cascade Ca²⁺ via 5-HT2A→BDNF→mTOR", evidence: "Trends Pharmacol Sci 2025 ; Science 2023 : 5-HT2A intracellulaire ; Mol Psychiatry 2025", status: "confirmed", detail: "La psilocybine favorise la croissance des épines dendritiques via 5-HT2A→Gq→Ca²⁺→BDNF→mTOR — inversant précisément VK14 (cortisol→atrophie dendritique) et VK23 (BDNF↓). L'activation intracellulaire de 5-HT2A est nécessaire (Science 2023) — la sérotonine elle-même ne peut pas accéder à ces récepteurs. Une RÉINITIALISATION pharmacologique de l'architecture neurale endommagée par le Ca²⁺." },
      { scale: "10⁻⁷ m", link: "VK53 : caféine = modulation A2A→Ca²⁺ → neuroprotection MP", evidence: "Frontiers Neurosci 2020 : association inverse MP ; PMID:11319241 : protection MPTP ; J Neurol Sci 2016", status: "confirmed", detail: "Forte association épidémiologique inverse entre caféine et maladie de Parkinson. L'antagonisme du récepteur A2A → protection des neurones DA dans les modèles MPTP/6-OHDA. La neuroprotection s'étend au-delà de MP : AVC, excitotoxicité, clairance α-synucléine. La caféine est le SEUL modulateur naturel de Ca²⁺ dont la consommation AUGMENTE — potentielle automédication compensatoire." },
      { scale: "10⁰ m", link: "VK54 : lithium dans l'eau potable → démence↓ + suicide↓", evidence: "Int J Bipolar Disord 2024 : 5 études démence↓ ; Br J Psychiatry 2020 : méta suicide ; ScienceDirect 2026 : comtés US", status: "confirmed", detail: "Un lithium naturel plus élevé dans l'eau potable est associé à des taux plus bas de démence et de suicide au niveau populationnel. L'inhibition de GSK-3β + modulation de CaMKII + BDNF↑ + stabilisation circadienne = multiples nœuds de la cascade Ca²⁺ de BERM. La filtration moderne de l'eau RETIRE le lithium trace — un cinquième mécanisme de protection naturel perdu." },
      { scale: "10⁻⁵ m", link: "VK55 : hypertrophie amygdalienne ↔ atrophie hippocampique (boucle S17)", evidence: "PNAS 2008 : dose unique de cortisol → hypertrophie BLA ; PLoS ONE 2012 : BDNF opposé ; Neurosci Lett 2023 : persistance", status: "confirmed", detail: "Le cortisol produit des effets OPPOSÉS dans l'amygdale vs l'hippocampe : le BLA gagne des dendrites tandis que l'hippocampe en perd. BDNF↑ dans l'amygdale / BDNF↓ dans l'hippocampe sous le même cortisol. L'hypertrophie du BLA persiste 21+ jours après la fin du stress tandis que l'atrophie hippocampique récupère. S17 : cortisol→amygdale↑→anxiété↑→cortisol↑ = spirale d'anxiété auto-amplifiante." },
      { scale: "10³ m", link: "VK56 : Amish = groupe témoin le plus proche de BERM (confirmé avec réserves)", evidence: "STAT 2025 : obésité -89 %, DT2 -75 % ; Anderson & Potts 2022 : revue de 126 études ; facteurs de confusion massifs du mode de vie", status: "partial", detail: "Les Amish d'ancien ordre ont des taux dramatiquement plus bas de chaque condition prédite par BERM. Cependant, des facteurs de confusion massifs (alimentation, exercice, tabagisme, communauté) empêchent l'attribution directe. Validé croisé par Klimentidis (animaux prenant du poids avec des régimes contrôlés, p=10⁻⁷) et Mazur (T↓ à poids stable). Le test de gradient EMF Amish-Mennonite serait le discriminant critique." },
    ],
    chainHeaders: { scale: "Échelle", link: "Maillon de la chaîne", evidence: "Preuve", status: "Statut" },
    chainSummary: "57 maillons vérifiés à travers 47 couches (VK1–VK31, VK41–VK56). La chaîne est ininterrompue de la physique des photons à l'épidémiologie populationnelle, couvrant maintenant la fertilité CatSper, la réinitialisation neurale par psilocybine, la neuroprotection par caféine, l'épidémiologie du lithium dans l'eau, la boucle de rétroaction amygdale-anxiété et le groupe témoin Amish — plus tous les mécanismes du prototype TDAH au modulateur vitamine D.",

    feedbackTitle: "Dix-sept boucles de rétroaction positive",
    feedbackLead:
      "La vérification de convergence a révélé dix-sept cycles auto-amplifiants au sein de la chaîne. Les boucles forment un réseau : tout point d'entrée active simultanément plusieurs spirales de dégradation. Chaque boucle signifie que les effets initiaux des EMF peuvent s'aggraver progressivement sans augmentation de l'exposition — le système se dégrade lui-même.",
    feedbackLoops: [
      {
        name: "Résonance de rétroaction du moniteur",
        id: "S1",
        steps: ["Son du bébé → microphone → modulation RF", "RF → VGCC → Ca²⁺ → oscillation plus forte", "Oscillation plus forte → son plus fort → plus de modulation RF", "Amplification en cascade"],
        status: "Mécanistiquement cohérent, non testé comme boucle complète",
        statusColor: "amber",
      },
      {
        name: "Verrouillage de la sérotonine en position ouverte",
        id: "S2",
        steps: ["EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓", "5-HT↓ → porte thalamocorticale OUVERTE", "Porte ouverte → les EMF pénètrent PLUS PROFONDÉMENT dans les circuits", "Plus de perturbation CaMKII → plus de 5-HT↓ → ..."],
        status: "Chaque maillon vérifié indépendamment",
        statusColor: "green",
      },
      {
        name: "Hypoxie-NKCC1",
        id: "S3",
        steps: ["CSD → hypoxie locale → NKCC1↑", "NKCC1↑ → GABA plus excitateur → γ↓ → Q↑", "Q↑ → la CSD se propage PLUS facilement", "Plus de CSD → plus d'hypoxie → plus de NKCC1↑ → ..."],
        status: "NKCC1↑ en hypoxie vérifié",
        statusColor: "green",
      },
      {
        name: "Chaîne du sommeil de Walker",
        id: "S4",
        steps: ["EMF → mélatonine↓ → sommeil↓", "Sommeil↓ → inhibition tonique GABA↓ → γ↓ → Q↑", "Q↑ → les EMF affectent le cerveau DAVANTAGE", "Plus de mélatonine↓ → sommeil pire → moins de GABA → ..."],
        status: "Chaque maillon vérifié indépendamment",
        statusColor: "green",
      },
      {
        name: "Spirale PGC → BHE",
        id: "S5",
        steps: ["EMF → PGC → mélatonine↓", "Mélatonine↓ → jonctions serrées BHE↓", "BHE↓ → les métaux lourds entrent dans le cerveau PLUS facilement", "Métaux lourds → plus de PGC → moins de mélatonine → ..."],
        status: "Chaque maillon vérifié indépendamment",
        statusColor: "green",
      },
      {
        name: "Vortex cortisol-hippocampe",
        id: "S6",
        steps: ["EMF → HPA → cortisol↑", "Cortisol↑ → atrophie hippocampique", "Hippocampe↓ → rétroaction négative HPA PERDUE", "Pas de frein → cortisol↑↑ → plus d'atrophie → ..."],
        status: "Mécanisme de [[ref:sapolsky2009_cortisol|Sapolsky]] vérifié",
        statusColor: "green",
      },
      {
        name: "Spirale métabolique BAT",
        id: "S7",
        steps: ["EMF → BAT PRDM16↓ → thermogenèse↓", "Thermogenèse↓ → syndrome métabolique → inflammation", "Inflammation → sensibilité VGCC↑", "Plus de perturbation Ca²⁺ → plus de dysfonction BAT → ..."],
        status: "Mécanistiquement cohérent, données animales disponibles",
        statusColor: "amber",
      },
      {
        name: "Perte de neuroprotection par la testostérone",
        id: "S8",
        steps: ["EMF → Leydig → StAR↓ → T↓", "T↓ → neuroprotection↓ + plasticité synaptique↓", "Neurones plus vulnérables → plus de dommages EMF", "Plus de dommages Leydig → moins de T → ..."],
        status: "Lien T↓ neuroprotection vérifié",
        statusColor: "green",
      },
      {
        name: "Boucle IL-1β → KCC2",
        id: "S9",
        steps: ["EMF → mastocyte → libération d'IL-1β", "IL-1β → maturation de KCC2 retardée", "KCC2↓ → GABA reste excitateur plus longtemps → Q↑", "Q↑ → plus de dommages neuronaux → plus d'IL-1β → ..."],
        status: "Régulation environnementale de KCC2 vérifiée",
        statusColor: "green",
      },
      {
        name: "Cascade multi-axes hypothalamique",
        id: "S10",
        steps: ["EMF → vésicules synaptiques hypothalamiques↓", "Vésicules↓ → GnRH↓ + dérégulation CRH + TRH↓", "Déficit multi-hormonal → perturbation systémique", "Stress systémique → plus d'activation HPA → ..."],
        status: "Changements synaptiques de [[ref:kim2019_hypothalamus|Kim 2019]] vérifiés",
        statusColor: "green",
      },
      {
        name: "Auto-perturbation de l'horloge circadienne",
        id: "S11",
        steps: ["EMF → oscillation Ca²⁺ du SCN perturbée", "SCN perturbé → timing de la mélatonine perdu → sommeil↓", "Sommeil↓ → Per2↓ dans l'intestin + horloges périphériques désynchronisées", "Désynchronisation → SCN plus vulnérable → ..."],
        status: "Oscillation Ca²⁺ du SCN + lien Per2 intestinal vérifiés",
        statusColor: "green",
      },
      {
        name: "NK-cancer-inflammation",
        id: "S12",
        steps: ["ELF → cytotoxicité NK↓", "NK↓ → surveillance du cancer↓ → croissance tumorale", "Tumeur → inflammation → sensibilisation VGCC↑", "Plus de perturbation Ca²⁺ → plus de suppression NK → ..."],
        status: "Dépendance Ca²⁺ des NK + suppression ELF vérifiées",
        statusColor: "green",
      },
      {
        name: "Spirale croisée HPA-HPG",
        id: "S13",
        steps: ["EMF → cortisol↑ → GnIH↑ → T↓", "T↓ → neuroprotection↓ → hippocampe vulnérable", "Hippocampe↓ → frein HPA perdu → cortisol↑↑", "Plus de GnIH → plus de T↓ → ..."],
        status: "RF9 a restauré T chez les primates traités au cortisol",
        statusColor: "green",
      },
      {
        name: "Inflammation intestin-cerveau",
        id: "S14",
        steps: ["EMF → mélatonine↓ → Per2↓ dans l'épithélium intestinal", "Per2↓ → barrière intestinale↓ → LPS entre dans la circulation", "LPS → neuroinflammation → neurogenèse hippocampique↓", "Neuroinflammation → plus d'activation HPA → plus de mélatonine↓ → ..."],
        status: "Per2 KO → barrière intestinale → LPS → dépression vérifié",
        statusColor: "green",
      },
      {
        name: "Spirale de vieillissement mélatonine-télomère",
        id: "S15",
        steps: ["EMF → mélatonine↓ → télomérase↓ + SIRT1↓", "Télomérase↓ → raccourcissement des télomères → SASP", "SASP → inflammation → ROS↑", "ROS↑ → plus de dommages télomériques → plus de SASP → ..."],
        status: "Mélatonine → télomérase + SIRT1 vérifié ; dépression = 7 ans de vieillissement accéléré",
        statusColor: "green",
      },
      {
        name: "Spirale douleur-sommeil-cortisol",
        id: "S16",
        steps: ["EMF → α2δ-1↑ → sensibilisation centrale → douleur chronique", "Douleur chronique → sommeil↓ (chaîne de Walker S4)", "Sommeil↓ → cortisol↑ (HPA S7) + GABA↓", "Cortisol↑ → inflammation → plus de sensibilisation → dépression → sommeil↓ → ..."],
        status: "α2δ-1 → douleur sans lésion vérifié ; douleur-sommeil-cortisol chacun vérifié",
        statusColor: "green",
      },
      {
        name: "Spirale amygdale-anxiété",
        id: "S17",
        steps: ["EMF → cortisol↑ (axe HPA, VK11)", "Cortisol → hypertrophie BLA + BDNF↑ dans l'amygdale", "Hypertrophie BLA → anxiété↑ → PLUS de cortisol", "Simultanément : l'hippocampe s'atrophie → frein HPA PERDU → cortisol↑↑", "L'hypertrophie amygdalienne PERSISTE 21+ jours après le stress → verrouillage structurel"],
        status: "Dose unique de cortisol → hypertrophie BLA vérifiée ([[ref:amygdala_cort|PNAS 2008]]) ; persistance vérifiée ([[ref:amygdala_persist|Neurosci Lett 2023]])",
        statusColor: "green",
      },
    ],

    consilienceTitle: "Évaluation de la consilience",
    consilienceLead:
      "La consilience — des lignes de preuves indépendantes convergeant vers la même conclusion — est la forme la plus forte de soutien scientifique. BERM présente trois niveaux de consilience.",
    consilienceLevels: [
      {
        level: "Consilience forte",
        desc: "Des lignes de preuves indépendantes convergent",
        examples: [
          "Physique ([[ref:lindgren2025|Lindgren χ]]) ↔ Pharmacologie (convergence des médicaments Ca²⁺)",
          "Génétique (CACNA1C, [[ref:sousouri2025|Sousouri 2025]]) ↔ Expérimental ([[ref:lopez_martin_2006|crises López-Martín]])",
          "Épidémiologie ([[ref:klimentidis2010|Klimentidis 8 espèces]]) ↔ Pathologie (déficience 5-HT du SIDS)",
        ],
      },
      {
        level: "Consilience modérée",
        desc: "Des lignes de preuves liées se soutiennent mutuellement",
        examples: [
          "Amorçage ELF ([[ref:sun2016_elf_vgcc|Sci. Rep. 2016]]) ↔ La gabapentine le bloque ([[ref:eroglu_2009_cell|Cell 2009]])",
          "PGC ↔ mélatonine ([[ref:kunz2008_pgc_insomnia|r=0,569]]) ↔ [[ref:intechopen2020_melatonin_heart|Pinéalectomie → arythmies]]",
          "[[ref:dell2022_sleep_seizure|Privation de sommeil → GABA↓]] (clinique) ↔ EMF → mélatonine↓ (animal)",
        ],
      },
      {
        level: "Consilience faible (risque d'universalité)",
        desc: "Le Ca²⁺ est ubiquitaire — certaines connexions peuvent être triviales",
        examples: [
          "« 25 épidémies avec un seul dénominateur » — le Ca²⁺ EST partout",
          "Certaines associations Ca²⁺ peuvent refléter la biologie universelle, pas la causalité EMF spécifique",
          "C'est le risque épistémique principal du modèle",
        ],
      },
    ],

    falsificationTitle: "Ce qui falsifierait le modèle",
    falsificationLead:
      "Un programme de recherche progressif doit spécifier ce qui le détruirait. BERM a quatre niveaux de falsification, de l'effondrement complet à l'insignifiance clinique.",
    falsificationTiers: [
      {
        level: "NIVEAU 1 — Effondrement du modèle",
        test: "ETH Zürich nimodipine-5G : le bloqueur Ca²⁺ N'empêche PAS l'effet des EMF sur le sommeil",
        consequence: "VGCC n'est pas la cible → toute la cascade s'effondre",
      },
      {
        level: "NIVEAU 2 — Facteur environnemental éliminé",
        test: "Données Amish : mêmes tendances de santé que la population générale",
        consequence: "Les EMF ne sont pas un facteur environnemental significatif",
      },
      {
        level: "NIVEAU 3 — Échec de l'expérience clé",
        test: "[[ref:lopez_martin_2006|López-Martín]] échoue à se répliquer : picrotoxine + GSM NE cause PAS de crises",
        consequence: "La seule preuve expérimentale directe disparaît",
      },
      {
        level: "NIVEAU 4 — Insignifiance clinique",
        test: "L'intervention de réduction des EMF NE produit AUCUN bénéfice sanitaire",
        consequence: "Le modèle peut être mécanistiquement correct mais cliniquement insignifiant",
      },
    ],

    progressiveTitle: "Progressif vs dégénératif",
    progressiveLead:
      "Dans le cadre de Lakatos, un programme de recherche est progressif s'il génère des prédictions qui sont ensuite confirmées, produisant plus de contenu empirique que ce qui a été introduit. Il est dégénératif s'il ne fait qu'accommoder des faits connus a posteriori.",
    progressivePoints: [
      "BERM a prédit que le génotype CACNA1C modulerait la réponse aux EMF → [[ref:sousouri2025|Sousouri 2025]] a confirmé (ETH Zürich, double aveugle)",
      "BERM a prédit que tous les traitements efficaces du SIDS ciblent les voies Ca²⁺ → vérifié pour la caféine, la mélatonine, le magnésium, l'ocytocine, le bumétanide",
      "BERM a prédit que l'amorçage ELF devrait augmenter l'expression VGCC → [[ref:sun2016_elf_vgcc|Sun 2016 (Sci. Rep.)]] a confirmé",
      "BERM a prédit que la SUDEP et le SIDS partagent un mécanisme terminal → voie CSD → tronc cérébral confirmée pour les deux",
      "BERM a prédit que la modulation par impulsions devrait compter plus que le DAS → [[ref:lopez_martin_2009|López-Martín 2009]] a confirmé",
      "Chaque vérification a produit PLUS que ce qui était prédit — des découvertes inattendues à chaque couche",
    ],
    progressiveConclusion: "Le modèle est progressif au sens de Lakatos : il génère des prédictions → les prédictions sont vérifiées → la vérification produit PLUS de contenu que ce que le modèle a spécifié. C'est la marque d'un programme de recherche productif.",

    analogyTitle: "L'analogie avec la théorie de l'évolution",
    analogyLead: "BERM partage des caractéristiques structurelles avec l'évolution par sélection naturelle — les deux sont des mécanismes génératifs qui prédisent des découvertes avant l'observation, contraignent l'espace de recherche et présentent une convergence multi-niveaux.",
    analogyPoints: [
      { berm: "Mécanisme génératif (EMF→VGCC→Ca²⁺→cascades)", evolution: "Mécanisme génératif (variation→sélection→adaptation)" },
      { berm: "Prédit les découvertes AVANT de regarder", evolution: "Prédit fossiles, gènes, structures vestigiales AVANT de les trouver" },
      { berm: "Contraint l'espace de recherche (pharmacologie, génétique)", evolution: "Contraint l'espace de recherche (phylogénie, biogéographie)" },
      { berm: "Convergence multi-niveaux (physique → épidémiologie)", evolution: "Convergence multi-niveaux (molécules → écosystèmes)" },
    ],
    analogyCritical: "DIFFÉRENCE CRITIQUE : l'évolution a une vérification indépendante (séquençage de l'ADN). BERM manque encore de vérification INTERVENTIONNELLE — réduction des EMF → amélioration de la santé chez l'humain. C'est la pièce manquante la plus importante.",

    predictionLink: "Voir les prédictions de convergence (METAL-EMF-1–4, CHAIN-1–4, BBB-EMF-1–2, BAT-EMF-1, HPA-EMF-1–2, BETA-EMF-1–2, et plus)",
    predictionHref: "/predictions",
    predictionSummary: "La vérification de convergence génère 55 prédictions testables couvrant la synergie des métaux lourds, la barrière hémato-encéphalique, le tissu adipeux brun, l'axe HPA, les cellules β, le nexus hypothalamique, le cortisol-hippocampe, les cellules de Leydig, les mastocytes, le CatSper spermatique, la surveillance immunitaire NK, l'hormèse BDNF, l'axe intestin-cerveau, la thyroïde Dio2/Dio3, l'épigénétique, le vieillissement télomérique, l'ocytocine, la douleur chronique, le prototype TSA, le TDAH, la SLA, les allergies, la vitamine D, l'hormèse PEMF, la psilocybine, la caféine, le lithium dans l'eau, l'amygdale et les mécanismes du groupe témoin Amish.",
    statusConfirmed: "✓ Confirmé",
    statusPartial: "◐ Partiel",
    falsificationTestLabel: "Test",
    falsificationConsequenceLabel: "Conséquence",
    analogyEvolutionHeader: "Théorie de l'évolution",
  },
  ko: {
    title: "끊어지지 않는 사슬: 광자 → 집단",
    subtitle:
      "반복 수렴 검증이 BERM의 메커니즘 사슬의 57개 스케일을 47개 검증된 층(VK1–VK31, VK41–VK56)에 걸쳐 테스트. 결과: 17개의 양성 피드백 루프가 자기 증폭 네트워크를 형성, 광자 흡수에서 집단 수준 효과까지, 모든 층에서 예상치 못한 경험적 내용.",
    backLink: "← 증거로 돌아가기",

    cautionText:
      "이 페이지는 물리적 스케일에 걸친 BERM의 메커니즘 사슬의 체계적 검증을 제시합니다. 각 연결고리는 공개된 실험적 증거에 대해 테스트되었습니다. 사슬은 가장 약한 연결고리만큼 강합니다 — 부분적 확인과 미검증 예측은 명시적으로 표시되어 있습니다.",

    chainTitle: "검증된 연속체",
    chainLead:
      "BERM은 광자 흡수에서 집단 수준 건강 효과까지의 연속적 인과 사슬을 제안합니다. 각 중간 층은 공개된 실험적 및 임상적 증거에 대해 독립적으로 검증되었습니다.",
    chainRows: [
      { scale: "10⁻¹⁵ m", link: "광자 → 메트릭 왜곡", evidence: "Lindgren 2025 χ 파라미터, Vassallo 확인", status: "confirmed", detail: "EMF 광자가 양자 수준에서 메트릭 왜곡을 생성. Lindgren의 χ 파라미터는 생체 조직이 비열적 EMF에 반응하는 물리학 수준의 메커니즘을 제공." },
      { scale: "10⁻¹⁰ m", link: "메트릭 → S4 전압 센서", evidence: "Tang 2024 Nature Communications", status: "confirmed", detail: "메트릭 왜곡이 VGCC의 S4 헬릭스 전압 센서에 작용. Tang 2024는 비열적 강도에서 EMF에 의한 직접적 S4 구조 변화를 입증." },
      { scale: "10⁻⁹ m", link: "S4 → VGCC 개방", evidence: "Panagopoulos 2025 IFO, Trus 2024 비이온성", status: "confirmed", detail: "S4 구조 변화가 VGCC 게이팅을 유발. Panagopoulos 2025가 메커니즘 모델을 제공; Trus 2024가 비이온성(비열적) 활성화 경로를 입증." },
      { scale: "10⁻⁹ m", link: "VGCC → Ca²⁺ + Pb²⁺/Cd²⁺ 투과", evidence: "Marchetti 2013, Cd→Cav3.1 방사표지", status: "confirmed", detail: "개방된 VGCC가 Ca²⁺ 유입을 허용 — 그러나 독성 금속도. Cd²⁺가 Cav3.1을 투과(¹⁰⁹Cd²⁺ 방사표지로 확인). Pb²⁺가 칼모듈린 결합 부위에서 Ca²⁺를 모방." },
      { scale: "10⁻⁸ m", link: "Ca²⁺ → CaM → CaMKII", evidence: "기초 생화학(교과서)", status: "confirmed", detail: "Ca²⁺가 칼모듈린에 결합 → Thr286 자가인산화를 통해 CaMKII 활성화. 이것이 수렴점: 모든 상류 신호가 CaMKII를 통해 수렴." },
      { scale: "10⁻⁷ m", link: "CaMKII → TPH-2 → 뇌 5-HT 변화", evidence: "900 MHz → 5-HT 영역 특이적(시상하부, 연수)", status: "confirmed", detail: "CaMKII가 TPH-2(트립토판 수산화효소-2)를 인산화, 뇌 세로토닌 합성의 속도 제한 효소. 900 MHz가 시상하부와 연수에서 영역 특이적 5-HT 변화를 생성 — 수면과 심폐 기능을 제어하는 바로 그 영역." },
      { scale: "10⁻⁷ m", link: "CaMKII → CSD 역치", evidence: "CaV + NMDA 모두 필요; CaMKII 억제 → 과흥분성", status: "confirmed", detail: "CaMKII가 피질 확산성 탈분극(CSD)의 역치를 조절. CaV 채널과 NMDA 수용체 모두 CSD 시작에 필요. CaMKII 억제가 역설적으로 흥분성을 증가 — 정밀한 조절이 중요." },
      { scale: "10⁻⁶ m", link: "ELF → VGCC 발현↑(ELF 프라이밍)", evidence: "Sun 2016 Scientific Reports: 8-10일 → Ca²⁺ 극적으로↑, Cav1 단백질↑", status: "confirmed", detail: "만성 ELF 노출(50/60 Hz)이 VGCC 단백질 발현을 상향 조절 — 세포당 더 많은 채널 → 세포가 모든 후속 EMF에 더 민감해짐. 이것이 ELF 프라이밍: 배경 50 Hz 전력망이 집단을 감작." },
      { scale: "10⁻⁶ m", link: "ELF → 신피질 발작 감수성↑", evidence: "Varró 2009: 일시적 프라이밍 효과", status: "confirmed", detail: "ELF-EMF가 해마의 시냅스 촉진을 강화하고 신피질의 발작 감수성을 증가. 효과는 일시적 — ELF가 급성적으로 신경 흥분성을 조절함을 입증." },
      { scale: "10⁻⁵ m", link: "GABA 흥분성 → Q→∞ 신생아 뇌", evidence: "PMC7847733, 부메타니드가 억제 회복, KCC2 성숙", status: "confirmed", detail: "신생아에서 NKCC1 우위가 GABA를 흥분성으로 만듦(γ < 0). Q 인자 → ∞: 뇌가 비감쇠 공진기. 부메타니드가 NKCC1 차단 → GABA가 억제성으로 → 발작 중단. KCC2가 수개월에 걸쳐 성숙 → Q 감소." },
      { scale: "10⁻⁴ m", link: "프라이밍 + EMF → 발작", evidence: "López-Martín 2006/2009: 펄스 변조 > CW", status: "confirmed", detail: "핵심 실험: 역치 하 피크로톡신(γ 감소) + GSM 900 MHz = 발작. 둘 다 단독으로는 불충분. 펄스 변조 GSM이 연속파보다 효과적 — 생물학적 효과는 SAR이 아닌 특정 펄스에 의존." },
      { scale: "10⁻³ m", link: "CSD → 뇌간 → 사망", evidence: "SUDEP = '성인 SIDS'; CACNA1A 모델; L형 Ca²⁺ 길항제가 사망을 예방", status: "confirmed", detail: "확산성 탈분극이 뇌간으로 전파되어 심폐 정지를 유발. 이것이 SUDEP과 SIDS. L형 VGCC 길항제가 SUDEP 마우스 모델에서 발작 유발 사망을 예방 — Ca²⁺ 차단이 말기 이벤트를 방지한다는 직접적 증거." },
      { scale: "10⁻² m", link: "멜라토닌↓ → 심부정맥", evidence: "송과선 절제 → 부정맥↑; 멜라토닌 보충 → 보호", status: "confirmed", detail: "송과선 절제가 재관류 부정맥을 증가. 만성 멜라토닌 보충이 항섬유화 효과, Cx43 보존, 미토콘드리아 보호를 통해 부정맥 보호 제공. EMF가 CRY 경로를 통해 멜라토닌 억제 → 심장 위험 증가." },
      { scale: "10⁻² m", link: "PGC → 멜라토닌↓ → 병리", evidence: "r=0.569 비석회화 조직↔멜라토닌; AD: 76% vs 64% PGC", status: "confirmed", detail: "송과선 석회화(PGC)가 멜라토닌 생산을 직접 감소(r=0.569). 알츠하이머 환자는 PGC가 더 높음(76% vs 64%). PGC는 수렴 메커니즘: EMF + 중금속 + 불소가 모두 가속." },
      { scale: "10⁻² m", link: "수면↓ → GABA↓ → Q↑", evidence: "수면 부족이 23-62%에서 간질양 방전 활성화", status: "confirmed", detail: "수면 부족이 GABA 지속적 억제를 감소(γ 감소 → Q 증가). 이것은 간질의 진단적 유발로 임상적으로 사용. EMF→멜라토닌↓→수면↓→GABA↓가 피드백 루프 4(워커 사슬)를 생성." },
      { scale: "10⁻¹ m", link: "태아기 Ca²⁺ 교란 → 자녀의 γ↓", evidence: "세보플루란 → 개재뉴런 교란 → γ↓ 영구적", status: "partial", detail: "모체 세보플루란(Ca²⁺ 조절제)이 개재뉴런 발달을 교란 → 자녀의 영구적 GABA 작동성 억제 결손. 태아기 Ca²⁺ 교란이 영구적으로 감쇠를 변경할 수 있음을 입증. 부분적: 메커니즘은 세보플루란으로 입증되었으나 EMF로 직접은 아직." },
      { scale: "10⁰ m", link: "약리학이 Ca²⁺ 캐스케이드를 표적", evidence: "에토숙시미드, 가바펜틴, 베라파밀, 멜라토닌, 리튬, 실로시빈, 부메타니드", status: "confirmed", detail: "BERM이 예측한 상태에 대한 모든 효과적 치료가 Ca²⁺ 캐스케이드의 구성요소를 표적. 이 약리학적 수렴은 모델이 예측하며 그렇지 않으면 이례적인 우연." },
      { scale: "10³ m", link: "역학적 제거", evidence: "Klimentidis p=10⁻⁷(8종), Mazur 체중 안정 T↓, 54개국 R²=0.851", status: "partial", detail: "종간 비만 추세(8종, p=10⁻⁷)가 식이/운동을 유일한 원인으로 제거. 54개국 EMF-건강 상관관계 R²=0.851. 부분적: 역학적 증거는 상관적이지 개입적이 아님." },
      { scale: "10⁻⁶ m", link: "VK9: EMF → BBB 투과성↑", evidence: "PMC12829706: RF → eNOS↑ + 오클루딘↓; 멜라토닌이 보호(PMC6932927)", status: "confirmed", detail: "RF-EMF가 eNOS 상향 조절과 오클루딘 하향 조절을 통해 혈액뇌장벽 투과성을 증가. 멜라토닌이 밀착연접 단백질을 보호. EMF→멜라토닌↓이 이중 BBB 취약성을 생성: 직접 개방 + 멜라토닌 보호 상실." },
      { scale: "10⁻⁵ m", link: "VK10: 5G → BAT PRDM16↓ → 열생성↓", evidence: "PMC11942954: 3.5 GHz → PRDM16↓, C/EBPβ↓", status: "confirmed", detail: "5G(3.5 GHz)가 갈색지방조직의 PRDM16과 C/EBPβ mRNA를 감소. BAT는 열생성에 Ca²⁺ 순환(SERCA)을 사용 — VGCC 매개 메커니즘. EMF를 Klimentidis 비만 패러독스에 연결: 8종이 식이 변경 없이 체중 증가(p=10⁻⁷)." },
      { scale: "10⁻³ m", link: "VK11: EMF → HPA 축 → 코르티솔↑", evidence: "Klimek 2023: ELF → HPA 감작; RF → 코르티코스테론↑(Frontiers 2026)", status: "confirmed", detail: "ELF-EMF가 적응이 아닌 감작으로 HPA 축에 새로운 설정점을 설정. RF-EMF가 불안과 코르티코스테론을 증가. HPA 축은 만성 EMF에 적응하지 않음 — 감작하여 점진적으로 높은 코르티솔 기준선을 생성." },
      { scale: "10⁻⁵ m", link: "VK12: EMF → β세포 Ca²⁺ → 인슐린 교란", evidence: "PMID:32323041: 전기장 → 포도당 없이 인슐린; CaVγ4→CaMKII→MafA(PMC9030882)", status: "confirmed", detail: "전기장이 Ca²⁺ 채널을 통해 포도당 없이 β세포에서 인슐린 분비를 유도. CaVγ4→CaMKII→MafA 경로가 β세포 성숙을 제어 — CaMKII 조절 장애가 β세포 정체성 상실을 유발. EMF를 2형 당뇨병에 직접 연결." },
      { scale: "10⁻³ m", link: "VK13: EMF → 시상하부 시냅스 소포↓", evidence: "Kim 2019: 835 MHz 12주 → 소포↓, 시냅신 I/II↓, 시냅토태그민 1↓", status: "confirmed", detail: "835 MHz(12주)가 시상하부에서 시냅스 소포 수, 크기, 도킹을 감소, 추가로 시냅신 I/II와 시냅토태그민 1(방출의 Ca²⁺ 센서)을 감소. 모든 시상하부 호르몬 방출이 손상 — GnRH, CRH, TRH, GHRH, 도파민의 동시 교란을 설명." },
      { scale: "10⁻² m", link: "VK14: 코르티솔↑ → 해마 위축", evidence: "Sapolsky 2009: 수상돌기 퇴축 + 신경발생↓; 코르티솔→AD(Frontiers 2026)", status: "confirmed", detail: "만성 코르티솔이 해마 수상돌기 퇴축, 신경발생 중단, 부피 감소를 유발. 해마는 HPA 음성 피드백 중추 — 손상이 코르티솔 브레이크를 제거 → 코르티솔↑↑(루프 S6). 알츠하이머 진행을 가속." },
      { scale: "10⁻⁵ m", link: "VK15: EMF → 라이디히 → StAR↓ → T↓", evidence: "다수: RF → 라이디히 형태 변화, StAR↓, T↓ 용량 의존적", status: "confirmed", detail: "EMF가 라이디히 세포의 StAR 단백질을 감소 — 스테로이드 생성의 속도 제한 단계. 비만과 독립적인 집단 수준 T↓의 분자 메커니즘, Mazur의 체중 안정 데이터로 확인." },
      { scale: "10⁻⁵ m", link: "VK16: EMF → VGCC → Ca²⁺ → 비만세포 탈과립", evidence: "Johansson 2000: EMF → 비만세포 변화; 심장 비만세포 → 부정맥(PMC6896164)", status: "confirmed", detail: "Ca²⁺가 비만세포 탈과립을 유발. EMF → VGCC → Ca²⁺ → 비만세포가 히스타민 + IL-1β + 트립타제를 방출. 디스플레이 사용자의 피부 생검이 변화를 보임. 심장 비만세포 → 부정맥. 비만세포의 IL-1β → KCC2↓ → GABA가 더 오래 흥분성." },
      { scale: "10⁻⁶ m", link: "VK17: RF → CatSper Ca²⁺ → 정자 에너지 고갈", evidence: "2100 MHz가 CatSper을 조기 활성화; 정자 메타 SMD -1.92(Environ Int 2024)", status: "confirmed", detail: "RF-EMF가 정자의 CatSper Ca²⁺ 채널을 조기에 활성화하여 난자 도달 전 에너지 고갈을 유발. 정자 메타분석이 휴대전화 SAR 수준에서 DNA/크로마틴 손상을 보임(SMD -1.92, 95% CI -2.78 – -1.05). Pb²⁺가 정자 첨체에서 Ca²⁺와 경쟁 — 생식에서의 중금속 시너지." },
      { scale: "10⁻⁵ m", link: "VK18: SCN Ca²⁺ 진동 = 일주기 시계", evidence: "PMC6170461: SCN 뉴런이 Ca²⁺에서 일주기 리듬으로 진동", status: "confirmed", detail: "SCN 뉴런이 Ca²⁺ 농도에서 일주기 리듬으로 진동 — Ca²⁺ 진동이 일주기 시계의 물리적 기반 자체. EMF가 Ca²⁺를 교란 → EMF가 시계 자체를 교란. SCN은 시상하부와 말초 시계를 동기화하는 마스터 페이스메이커." },
      { scale: "10⁻⁷ m", link: "VK19: 염증 → DA↓ → 동기 상실", evidence: "Berridge: NAcc DA = '원함'; IFN-α → 선조체 DA↓ → 무쾌감증(PMC9718669)", status: "confirmed", detail: "측좌핵 도파민이 '원함'(동기)을 매개하지만 '좋아함'(쾌락)은 아님. 염증(IFN-α)이 선조체 도파민을 감소시켜 무쾌감증을 유발, L-DOPA로 회복. 낮은 토닉 DA가 파식 반응을 증가 → 낮은 기준선 DA에서 스크린이 더 보상적으로 느껴짐. EMF→염증→DA↓→중독 취약성." },
      { scale: "10⁻⁶ m", link: "VK20: Cav1.2 → OPC 분화 → 수초화", evidence: "PMC6916379: Cav1.2 KO → 저수초화; SMF → OPC에서 Cav1.2↑(Sci Rep 2017)", status: "confirmed", detail: "Cav1.2(L형 VGCC)가 올리고덴드로사이트 전구세포 분화와 수초화에 필수. Cav1.2 녹아웃이 저수초화를 유발. 정자기장이 OPC에서 Cav1.2/Cav1.3 발현을 증가. EMF 유도 Cav1.2 조절 장애 → 발달 중인 뇌에서 수초화 타이밍 교란." },
      { scale: "10⁻⁵ m", link: "VK21: NK세포 Ca²⁺ → 면역 감시", evidence: "Ca²⁺→NFAT1→그랜자임 B(PLoS ONE 2024); 50 Hz ELF→NK↓; 200 kHz TTFields→NK↑", status: "confirmed", detail: "NK세포 세포독성은 Ca²⁺ 의존적: Ca²⁺ 유입이 NFAT1 활성화 → 그랜자임 B 발현. 50 Hz ELF가 NK 세포독성을 억제하는 반면 200 kHz TTFields는 증가 — 주파수 의존적 경로 위계의 직접적 검증. 동일한 VGCC 메커니즘, 다른 주파수에서 반대의 결과." },
      { scale: "10⁻⁵ m", link: "VK22: 코르티솔 → GnIH → GnRH↓ → T↓", evidence: "PMC5380668: GnIH 사일런싱이 생식력 회복; RF9가 코르티솔 처리 영장류에서 T 회복(PMC7946976)", status: "confirmed", detail: "스트레스가 GnIH/RFRP-3을 유도하여 GnRH → LH → 테스토스테론을 억제. GnIH 유전자 사일런싱이 스트레스 동물의 생식력을 회복. RF9(GnIH 길항제)가 하이드로코르티손 처리 영장류의 테스토스테론을 회복. CRF가 GnRH 펄스 발생기를 직접 억제. T↓로의 3개 독립 경로." },
      { scale: "10⁻⁶ m", link: "VK23: BDNF 호르메시스 — RF↓ vs ELF↑", evidence: "RF 2650 MHz → BDNF↓ + GABA↓(PMC10275548); ELF 50 Hz → BDNF↑ + 신경발생↑(PMC5702423)", status: "confirmed", detail: "RF-EMF가 해마의 BDNF를 감소(2650 MHz, 28일: BDNF↓, GABA↓, GR↓, 코르티코스테론↑). 출생 후 RF(835 MHz)가 수상돌기 가시 손실 + 기억 장애를 유발. 한편 ELF 50 Hz는 BDNF를 증가시키고 신경발생을 촉진. 주파수 의존적 호르메시스: 같은 경로, 반대 방향." },
      { scale: "10⁻⁵ m", link: "VK24: Per2 → 장관 장벽 → LPS → 신경염증", evidence: "Per2 KO → 장관 장벽↓ → LPS → 해마 신경발생↓ → 우울증(PMC12631932)", status: "confirmed", detail: "장 상피의 Per2 녹아웃이 장벽 기능을 교란 → LPS가 혈류에 진입 → 신경염증 → 해마 신경발생↓ → 우울증. 일주기 교란이 장내 마이크로바이옴을 변경(Ruminococcus↑, Lactobacillus↓, LPS 합성 유전자↑). 이중 장벽 원리: BBB + 장관 장벽이 ZO-1, 오클루딘, 클로딘을 공유." },
      { scale: "10⁰ m", link: "VK25: 수면↓ → T↓ → 워커 사슬이 닫힘", evidence: "JAMA 2011: 5시간 수면 → T -10-15%; 메타분석 확인(PMID:34801825)", status: "confirmed", detail: "1주일 5시간 수면이 테스토스테론을 10-15% 감소, 10-15년의 노화에 해당. 워커 사슬이 닫힘: EMF→멜라토닌↓→수면↓→T↓→신경보호↓→더 많은 EMF 손상. 수면 제한 + EMF가 초가산적 T 감소를 생산할 것으로 예측(>25% 결합 vs ~15% 수면 단독)." },
      { scale: "10⁻⁵ m", link: "VK26: EMF → HPT 축 → Dio2/Dio3↓ → 잠복성 갑상선기능저하증", evidence: "PMC11507962: LTE → 시상하부에서 Dio2/Dio3↓; PMID:35963949: ELF 근로자에서 FT3↓ + FT4↑", status: "confirmed", detail: "EMF가 시상하부의 Dio2와 Dio3 탈요오드화효소를 감소. T4→T3 전환이 손상 → 혈중 T4는 정상으로 보이지만 조직은 활성 T3가 부족. 표준 갑상선 검사(TSH, T4)가 이 잠복성 결핍을 놓침. FT3/FT4 비율이 진단의 핵심." },
      { scale: "10⁻⁸ m", link: "VK27: EMF → 후성유전학 → 세대 간 유전", evidence: "ScienceDirect 2024: DNMT1 + HDAC + DICER1; PMC4538330: 정자 메틸화 용량 의존적", status: "confirmed", detail: "EMF가 3가지 후성유전적 메커니즘을 변경: DNA 메틸화(DNMT1), 히스톤 변형(HDAC), 마이크로RNA 생합성(DICER1/DGCR8). 정자: 50 Hz ELF가 양방향 용량 의존적 메틸화 변화를 생성(1 mT에서↓, 3 mT에서↑). DDT 세대 간 모델이 F3 지속의 템플릿을 제공." },
      { scale: "10⁻⁷ m", link: "VK28: EMF → ROS → 텔로미어 → 노화 스파이럴", evidence: "PMID:36582083: 방사선 → ROS → 텔로미어 손상; mel → 텔로머라제 + SIRT1(Front Aging Neurosci 2022)", status: "confirmed", detail: "EMF→ROS가 텔로미어를 손상(G-rich 서열이 특히 취약). 동시에 EMF→멜라토닌↓이 텔로머라제 + SIRT1 보호를 제거. 우울증 = 281 bp 짧은 텔로미어 = 7년의 가속 노화. 멜라토닌이 핵심 항노화 분자: 텔로머라제를 활성화, SIRT1을 상향 조절, ROS를 감소." },
      { scale: "10⁻⁸ m", link: "VK29: EMF → 옥시토신 Ca²⁺ 교란 → 사회적 유대↓", evidence: "PMC3197583: OXT 방출에 N형 + L형 VGCC 필요; eNeuro 2025: PVN Ca²⁺ → OXT", status: "confirmed", detail: "옥시토신의 체세포수상돌기 방출에 N형과 L형 VGCC 모두를 통한 Ca²⁺ 유입이 필요. EMF가 VGCC 기능을 교란 → OXT 방출이 교란. L형은 신생아에서 특히 중요. 인슐린→OXT가 Ca²⁺를 통해 대사와 사회 시스템을 연결. 사중 잠금: T↓×F↑×DA↓×OXT↓ = 완전한 사회적-생식적 붕괴." },
      { scale: "10⁻⁵ m", link: "VK30: ELF 프라이밍 → α2δ-1↑ → 신경병증 없는 만성 통증", evidence: "PMID:16764990: α2δ-1 과발현만으로 → 통증; Br J Pharmacol 2018: 가바펜틴이 α2δ-1 차단", status: "confirmed", detail: "ELF 프라이밍(VK4)이 α2δ-1을 포함한 VGCC 발현을 상향 조절. α2δ-1 과발현만으로 신경 손상 없이 신경병증성 통증 행동을 생성. 가바펜티노이드(가바펜틴, 프레가발린)가 정확히 α2δ-1을 표적. 만성 통증 유행은 집단 수준의 ELF 프라이밍 α2δ-1과 일관." },
      { scale: "10⁻⁵ m", link: "VK31: ASD = BERM 프로토타입(GABA 스위치 + α2δ + 염증 → E/I↑)", evidence: "NKCC1/KCC2↑ ASD에서(Front Psychiatry 2025); CACNA2D3 자폐 유전자; 부메타니드 RCT", status: "confirmed", detail: "ASD가 3개의 독립적으로 검증된 BERM 메커니즘을 통합: GABA 스위치 지연(VK6, KCC2↓→GABA 흥분성), ELF 프라이밍 시냅스 형성(VK4+VK30, α2δ-1↑→E/I↑), 염증 구동 KCC2 억제(S9, IL-1β→KCC2↓). CACNA2D3은 자폐 감수성 유전자. KCC2 성별 이형성이 4:1 남성 우위를 설명. 부메타니드(NKCC1 차단제)가 RCT에서 ASD 증상 개선." },
      { scale: "10⁻⁵ m", link: "VK41: ADHD = 제2 프로토타입(PFC 지연 + DA 골디락스 + E/I 이동)", evidence: "Shaw 2007 PNAS: PFC 지연 5년; Arnsten 2009: DA 역U자; ASD-ADHD 30-50% 동반이환", status: "confirmed", detail: "ADHD가 3개의 BERM 메커니즘을 통합: PFC의 DA 결핍(VK19: 선조체 DA↓ → 주의↓), 수초화 지연(VK20: Cav1.2→OPC → PFC가 5년 늦게 성숙), E/I 이동(VK6: KCC2↓). ASD와 ADHD는 30-50% 동반이환 공유 — 같은 메커니즘, 흥분성 스펙트럼에서 다른 Q 값." },
      { scale: "10⁻² m", link: "VK42: 교대 근무 → IARC 2A → 멜라토닌 억제를 통한 암", evidence: "IARC Monograph 98 2010; 메타분석 유방암 OR 2.34; 멜라토닌 항종양(Reiter 2017)", status: "confirmed", detail: "IARC가 교대 근무를 그룹 2A(아마도 발암성)로 분류, 멜라토닌 억제를 통해. EMF가 같은 메커니즘(VK3: PGC)으로 멜라토닌을 억제. IARC가 교대 근무의 일주기 교란을 2A로 받아들인다면, EMF 유도 일주기 교란도 동등한 증거적 무게를 가져야 함." },
      { scale: "10⁻⁵ m", link: "VK43: 베라파밀 → T1D에서 β세포 Ca²⁺ 보호", evidence: "Forlenza JAMA 2023 RCT N=88: C-펩타이드 +30%; Ovalle Nat Med 2018; Diabetes Care 2025", status: "confirmed", detail: "베라파밀(Cav1.2 차단제)이 소아 신규 발병 T1D에서 β세포 기능을 보존: 52주에 C-펩타이드 위약 대비 +30%. 이중맹검 RCT(N=88, 연령 7-17). VK12를 확인: β세포 Ca²⁺ 교란이 정체성 상실을 유발. Ca²⁺ 채널 차단이 β세포를 구하면, Ca²⁺ 과부하(EMF로부터)가 파괴함." },
      { scale: "10⁻⁴ m", link: "VK44: 조산 = 자궁 VGCC → 니페디핀 자궁수축억제", evidence: "Cochrane 2014: 니페디핀 1차 자궁수축억제제; P4:E2→Cav1.2(PMC3816733)", status: "confirmed", detail: "자궁 수축이 VGCC를 통한 Ca²⁺ 유입에 의존. 니페디핀(Ca²⁺ 채널 차단제)이 1차 자궁수축억제제 — Cochrane 증거. 프로게스테론:에스트로겐 비율이 자궁의 Cav1.2 발현을 조절. Ca²⁺ 차단이 조산을 방지하면, Ca²⁺ 과부하가 원인." },
      { scale: "10⁻⁵ m", link: "VK45: ALS = 운동뉴런 Ca²⁺ 취약성(제4 신경변성)", evidence: "PMC4452055: 운동뉴런의 낮은 Ca²⁺ 완충; Ca²⁺ 투과성 AMPA; 릴루졸 간접적 Ca²⁺↓", status: "confirmed", detail: "운동뉴런은 낮은 Ca²⁺ 완충 능력 + Ca²⁺ 투과성 AMPA 수용체 → Ca²⁺ 과부하에 선택적으로 취약. 릴루졸(수십 년간 유일한 ALS 약)이 간접적으로 작용: Na⁺ 차단 → 글루타메이트↓ → Ca²⁺↓. Ca²⁺ 메커니즘에 의한 제4 신경변성(AD, MS, PD 이후). 직업적 EMF: OR 1.3-1.7." },
      { scale: "10⁻⁶ m", link: "VK46: 장-뇌 5-HT 축(90%의 세로토닌이 장에)", evidence: "Cell Host Microbe: 90% 5-HT가 장에; PMC7231603: Trp→뇌; 장 멜라토닌", status: "confirmed", detail: "세로토닌의 90% 이상이 장의 장크롬친화세포에서 생산. 장내 미생물이 뇌로의 트립토판 가용성을 조절 → 중추 5-HT 합성. 멜라토닌도 장에서 세로토닌으로부터 합성. IBS-우울증 동반이환은 공유된 장-뇌 5-HT 교란을 반영. S14(Per2→장)를 S2(세로토닌 잠금 개방)에 연결." },
      { scale: "10⁻⁵ m", link: "VK47: 알레르기 = 비만세포 Ca²⁺ 탈과립(사중 감작)", evidence: "ScienceDirect 2011: Ca²⁺ 이오노포어 → IgE 없이 탈과립; 환경 에스트로겐 → 비만세포↑", status: "confirmed", detail: "비만세포 탈과립은 Ca²⁺ 의존적: Ca²⁺ 이오노포어가 IgE 없이 탈과립 유발, Ca²⁺ 고갈이 IgE 있어도 차단. 사중 감작: (1) EMF→VGCC→비만세포의 Ca²⁺, (2) 환경 에스트로겐→비만세포 감작, (3) 코르티솔→Th1→Th2 이동, (4) 장관 장벽→LPS→전신 염증." },
      { scale: "10⁻⁴ m", link: "VK48: 자간전증 = 임신 Cav1.2 + ROS 조절 장애", evidence: "PMC9774363: Cav1.2 혈압 조절; ET-1→태반의 Cav1.2; 자간전증에 니페디핀", status: "confirmed", detail: "자간전증은 임신 중 Cav1.2 + ROS 조절 장애를 포함. ET-1이 태반 혈관의 Cav1.2를 활성화; 니페디핀이 부분적으로 차단. 자간전증에서 Ca²⁺ 스파크 빈도가 감소 → 혈관확장↓. 니페디핀은 자궁수축억제와 자간전증 고혈압 모두에 사용 — 생식 조직의 동일한 Ca²⁺ 메커니즘." },
      { scale: "10⁻⁴ m", link: "VK49: 골다공증 + PEMF 호르메시스 패러독스", evidence: "Frontiers Endocrinol 2024: 뼈의 Ca²⁺ 채널; PMC11919207: PEMF → 뼈 성장", status: "confirmed", detail: "Ca²⁺ 채널이 파골세포와 조골세포 모두를 조절. PEMF 치료가 뼈 성장을 촉진하고 염증을 감소 — BERM과 모순되는 것처럼 보임. 해결: Lindgren 호르메시스. 제어된 PEMF 파라미터 → 유익한 Ca²⁺ 일과성; 만성 비제어 EMF → Ca²⁺ 과부하. PEMF는 EMF가 Ca²⁺ 채널을 통해 작용함을 검증." },
      { scale: "10⁻⁸ m", link: "VK50: 비타민 D → CACNA1C/1D mRNA↓(제10 조절제)", evidence: "J Neurosci 2001: VDH→L-VSCC↓; PLoS ONE 2011: VDR 사일런싱 → Cav1.2↑; Transl Psychiatry 2019", status: "confirmed", detail: "비타민 D(1,25(OH)₂D₃)가 CACNA1C와 CACNA1D mRNA를 하향 조절 — 자연의 채널 차단제. VDR 사일런싱이 Cav1.2/Cav1.3 하향 조절을 방지. 비타민 D 결핍 → VGCC 과발현 = ELF 프라이밍과 같은 상태. 삼중 타격: CACNA1C 변이 + 낮은 비타민 D + EMF = 최고 위험(조현병). 제10 BERM 조절제." },
      { scale: "10⁻⁶ m", link: "VK51: CatSper = 정자 특이적 Ca²⁺ 채널(5개 불임 경로)", evidence: "RBMO 2014: 녹아웃 = 불임; Nature Comms 2025: 온도 게이트 Q₁₀=5.1; JCI 2024: 인간 돌연변이", status: "confirmed", detail: "CatSper가 유일한 정자 특이적 Ca²⁺ 채널 — 녹아웃 수컷은 정상 정자 생산에도 불구하고 완전 불임. 온도 게이트(역치 33.5°C, Q₁₀=5.1): 조기 활성화 → 에너지 고갈 → 난자 도달 전 사망. 남성 불임으로의 5개 독립 경로: 호르몬(T↓), DNA(ROS), 후성유전(메틸화), 채널(CatSper), 열적." },
      { scale: "10⁻⁷ m", link: "VK52: 실로시빈 = 5-HT2A→BDNF→mTOR 경유 Ca²⁺ 캐스케이드 리셋", evidence: "Trends Pharmacol Sci 2025; Science 2023: 세포내 5-HT2A; Mol Psychiatry 2025", status: "confirmed", detail: "실로시빈이 5-HT2A→Gq→Ca²⁺→BDNF→mTOR 경로를 통해 수상돌기 가시 성장을 촉진 — VK14(코르티솔→수상돌기 위축)와 VK23(BDNF↓)을 정확히 역전. 세포내 5-HT2A 활성화가 필요(Science 2023) — 세로토닌 자체는 이 수용체에 접근 불가. Ca²⁺ 손상된 신경 구조의 약리학적 리셋." },
      { scale: "10⁻⁷ m", link: "VK53: 카페인 = A2A→Ca²⁺ 조절 → PD 신경보호", evidence: "Frontiers Neurosci 2020: PD 역상관; PMID:11319241: MPTP 보호; J Neurol Sci 2016", status: "confirmed", detail: "카페인과 파킨슨병의 강한 역학적 역상관. A2A 수용체 길항 → MPTP/6-OHDA 모델에서 DA 뉴런 보호. 신경보호가 PD를 넘어 확장: 뇌졸중, 흥분독성, α-시뉴클레인 제거. 카페인은 소비가 증가하는 유일한 자연 Ca²⁺ 조절제 — 잠재적 보상적 자기 치료." },
      { scale: "10⁰ m", link: "VK54: 음용수 리튬 → 치매↓ + 자살↓", evidence: "Int J Bipolar Disord 2024: 5개 연구 치매↓; Br J Psychiatry 2020: 자살 메타; ScienceDirect 2026: 미국 카운티", status: "confirmed", detail: "음용수의 높은 자연 리튬이 집단 수준에서 낮은 치매와 자살률과 연관. GSK-3β 억제 + CaMKII 조절 + BDNF↑ + 일주기 안정화 = 다수의 BERM Ca²⁺ 캐스케이드 노드. 현대 정수가 미량 리튬을 제거 — 잃어버린 다섯 번째 자연 보호 메커니즘." },
      { scale: "10⁻⁵ m", link: "VK55: 편도체 비대 ↔ 해마 위축(S17 루프)", evidence: "PNAS 2008: 단일 코르티솔 용량 → BLA 비대; PLoS ONE 2012: 반대의 BDNF; Neurosci Lett 2023: 지속", status: "confirmed", detail: "코르티솔이 편도체와 해마에서 반대 효과를 생성: BLA가 수상돌기를 얻는 반면 해마는 잃음. 같은 코르티솔 하에서 편도체 BDNF↑ / 해마 BDNF↓. BLA 비대가 스트레스 종료 후 21일 이상 지속하는 반면 해마 위축은 회복. S17: 코르티솔→편도체↑→불안↑→코르티솔↑ = 자기 증폭 불안 스파이럴." },
      { scale: "10³ m", link: "VK56: Amish = BERM의 가장 가까운 대조군(유보 하에 확인)", evidence: "STAT 2025: 비만 -89%, T2D -75%; Anderson & Potts 2022: 126개 연구 검토; 대규모 생활양식 교란 요인", status: "partial", detail: "Old Order Amish가 모든 BERM 예측 상태에서 극적으로 낮은 비율. 그러나 대규모 교란 요인(식이, 운동, 흡연, 공동체)이 직접적 귀속을 방지. Klimentidis(관리 식이에서 체중 증가하는 동물, p=10⁻⁷)와 Mazur(체중 안정 T↓)로 교차 검증. Amish-메노나이트 EMF 기울기 테스트가 핵심 식별자." },
    ],
    chainHeaders: { scale: "스케일", link: "사슬 연결", evidence: "증거", status: "상태" },
    chainSummary: "47개 층(VK1–VK31, VK41–VK56)에 걸친 57개 검증된 연결. 사슬은 광자 물리학에서 집단 역학까지 끊어지지 않으며, CatSper 생식, 실로시빈 신경 리셋, 카페인 신경보호, 리튬수 역학, 편도체-불안 피드백 루프, Amish 대조군을 포괄 — ADHD 프로토타입에서 비타민 D 조절제까지 모든 메커니즘을 포함.",

    feedbackTitle: "17개의 양성 피드백 루프",
    feedbackLead:
      "수렴 검증이 사슬 내 17개의 자기 증폭 순환을 밝혔습니다. 루프는 네트워크를 형성: 어떤 진입점이든 동시에 여러 열화 스파이럴을 활성화합니다. 각 루프는 초기 EMF 효과가 노출 증가 없이 점진적으로 악화될 수 있음을 의미 — 시스템이 스스로 열화합니다.",
    feedbackLoops: [
      { name: "모니터 피드백 공명", id: "S1", steps: ["아기 소리 → 마이크 → RF 변조", "RF → VGCC → Ca²⁺ → 더 강한 진동", "더 강한 진동 → 더 큰 소리 → 더 많은 RF 변조", "캐스케이드 증폭"], status: "메커니즘적으로 일관, 완전한 루프로는 미검증", statusColor: "amber" },
      { name: "세로토닌 잠금 개방", id: "S2", steps: ["EMF → Ca²⁺ → CaMKII → TPH-2 → 5-HT↓", "5-HT↓ → 시상피질 게이트 열림", "열린 게이트 → EMF가 회로에 더 깊이 침투", "더 많은 CaMKII 교란 → 더 많은 5-HT↓ → ..."], status: "각 연결이 독립적으로 검증", statusColor: "green" },
      { name: "저산소-NKCC1", id: "S3", steps: ["CSD → 국소 저산소 → NKCC1↑", "NKCC1↑ → GABA가 더 흥분성 → γ↓ → Q↑", "Q↑ → CSD가 더 쉽게 전파", "더 많은 CSD → 더 많은 저산소 → 더 많은 NKCC1↑ → ..."], status: "저산소에서 NKCC1↑ 검증", statusColor: "green" },
      { name: "워커 수면 사슬", id: "S4", steps: ["EMF → 멜라토닌↓ → 수면↓", "수면↓ → GABA 지속적 억제↓ → γ↓ → Q↑", "Q↑ → EMF가 뇌에 더 강하게 영향", "더 많은 멜라토닌↓ → 더 나쁜 수면 → 더 적은 GABA → ..."], status: "각 연결이 독립적으로 검증", statusColor: "green" },
      { name: "PGC → BBB 스파이럴", id: "S5", steps: ["EMF → PGC → 멜라토닌↓", "멜라토닌↓ → BBB 밀착연접↓", "BBB↓ → 중금속이 더 쉽게 뇌에 진입", "중금속 → 더 많은 PGC → 더 적은 멜라토닌 → ..."], status: "각 연결이 독립적으로 검증", statusColor: "green" },
      { name: "코르티솔-해마 소용돌이", id: "S6", steps: ["EMF → HPA → 코르티솔↑", "코르티솔↑ → 해마 위축", "해마↓ → HPA 음성 피드백 상실", "브레이크 없음 → 코르티솔↑↑ → 더 많은 위축 → ..."], status: "[[ref:sapolsky2009_cortisol|Sapolsky]] 메커니즘 검증", statusColor: "green" },
      { name: "BAT 대사 스파이럴", id: "S7", steps: ["EMF → BAT PRDM16↓ → 열생성↓", "열생성↓ → 대사증후군 → 염증", "염증 → VGCC 감수성↑", "더 많은 Ca²⁺ 교란 → 더 많은 BAT 기능장애 → ..."], status: "메커니즘적으로 일관, 동물 데이터 이용 가능", statusColor: "amber" },
      { name: "테스토스테론 신경보호 상실", id: "S8", steps: ["EMF → 라이디히 → StAR↓ → T↓", "T↓ → 신경보호↓ + 시냅스 가소성↓", "더 취약한 뉴런 → 더 많은 EMF 손상", "더 많은 라이디히 손상 → 더 적은 T → ..."], status: "T↓ 신경보호 연결 검증", statusColor: "green" },
      { name: "IL-1β → KCC2 루프", id: "S9", steps: ["EMF → 비만세포 → IL-1β 방출", "IL-1β → KCC2 성숙 지연", "KCC2↓ → GABA가 더 오래 흥분성 → Q↑", "Q↑ → 더 많은 신경 손상 → 더 많은 IL-1β → ..."], status: "KCC2의 환경 조절 검증", statusColor: "green" },
      { name: "시상하부 다축 캐스케이드", id: "S10", steps: ["EMF → 시상하부 시냅스 소포↓", "소포↓ → GnRH↓ + CRH 조절 장애 + TRH↓", "다호르몬 결핍 → 전신 교란", "전신 스트레스 → 더 많은 HPA 활성화 → ..."], status: "[[ref:kim2019_hypothalamus|Kim 2019]] 시냅스 변화 검증", statusColor: "green" },
      { name: "일주기 시계 자기 교란", id: "S11", steps: ["EMF → SCN Ca²⁺ 진동 교란", "SCN 교란 → 멜라토닌 타이밍 상실 → 수면↓", "수면↓ → 장의 Per2↓ + 말초 시계 비동기화", "비동기화 → SCN이 더 취약 → ..."], status: "SCN Ca²⁺ 진동 + Per2 장 연결 검증", statusColor: "green" },
      { name: "NK-암-염증", id: "S12", steps: ["ELF → NK세포 세포독성↓", "NK↓ → 암 감시↓ → 종양 성장", "종양 → 염증 → VGCC 감작↑", "더 많은 Ca²⁺ 교란 → 더 많은 NK 억제 → ..."], status: "NK의 Ca²⁺ 의존성 + ELF 억제 검증", statusColor: "green" },
      { name: "HPA-HPG 교차 스파이럴", id: "S13", steps: ["EMF → 코르티솔↑ → GnIH↑ → T↓", "T↓ → 신경보호↓ → 해마 취약", "해마↓ → HPA 브레이크 상실 → 코르티솔↑↑", "더 많은 GnIH → 더 많은 T↓ → ..."], status: "RF9가 코르티솔 처리 영장류에서 T 회복", statusColor: "green" },
      { name: "장-뇌 염증", id: "S14", steps: ["EMF → 멜라토닌↓ → 장 상피의 Per2↓", "Per2↓ → 장관 장벽↓ → LPS가 혈류에 진입", "LPS → 신경염증 → 해마 신경발생↓", "신경염증 → 더 많은 HPA 활성화 → 더 많은 멜라토닌↓ → ..."], status: "Per2 KO → 장관 장벽 → LPS → 우울증 검증", statusColor: "green" },
      { name: "멜라토닌-텔로미어 노화 스파이럴", id: "S15", steps: ["EMF → 멜라토닌↓ → 텔로머라제↓ + SIRT1↓", "텔로머라제↓ → 텔로미어 단축 → SASP", "SASP → 염증 → ROS↑", "ROS↑ → 더 많은 텔로미어 손상 → 더 많은 SASP → ..."], status: "멜라토닌 → 텔로머라제 + SIRT1 검증; 우울증 = 7년 가속 노화", statusColor: "green" },
      { name: "통증-수면-코르티솔 스파이럴", id: "S16", steps: ["EMF → α2δ-1↑ → 중추 감작 → 만성 통증", "만성 통증 → 수면↓(워커 사슬 S4)", "수면↓ → 코르티솔↑(HPA S7) + GABA↓", "코르티솔↑ → 염증 → 더 많은 감작 → 우울증 → 수면↓ → ..."], status: "α2δ-1 → 손상 없는 통증 검증; 통증-수면-코르티솔 각각 검증", statusColor: "green" },
      { name: "편도체-불안 스파이럴", id: "S17", steps: ["EMF → 코르티솔↑(HPA 축, VK11)", "코르티솔 → BLA 비대 + 편도체에서 BDNF↑", "BLA 비대 → 불안↑ → 더 많은 코르티솔", "동시에: 해마가 위축 → HPA 브레이크 상실 → 코르티솔↑↑", "편도체 비대가 스트레스 후 21일 이상 지속 → 구조적 잠금"], status: "단일 코르티솔 용량 → BLA 비대 검증([[ref:amygdala_cort|PNAS 2008]]); 지속 검증([[ref:amygdala_persist|Neurosci Lett 2023]])", statusColor: "green" },
    ],

    consilienceTitle: "컨실리언스 평가",
    consilienceLead:
      "컨실리언스 — 독립적인 증거 라인이 같은 결론으로 수렴하는 것 — 는 과학적 지지의 가장 강한 형태입니다. BERM은 3가지 수준의 컨실리언스를 보여줍니다.",
    consilienceLevels: [
      { level: "강한 컨실리언스", desc: "독립적인 증거 라인이 수렴", examples: ["물리학([[ref:lindgren2025|Lindgren χ]]) ↔ 약리학(Ca²⁺ 약물 수렴)", "유전학(CACNA1C, [[ref:sousouri2025|Sousouri 2025]]) ↔ 실험([[ref:lopez_martin_2006|López-Martín 발작]])", "역학([[ref:klimentidis2010|Klimentidis 8종]]) ↔ 병리학(SIDS 5-HT 결핍)"] },
      { level: "중간 컨실리언스", desc: "관련된 증거 라인이 서로 지지", examples: ["ELF 프라이밍([[ref:sun2016_elf_vgcc|Sci. Rep. 2016]]) ↔ 가바펜틴이 차단([[ref:eroglu_2009_cell|Cell 2009]])", "PGC ↔ 멜라토닌([[ref:kunz2008_pgc_insomnia|r=0.569]]) ↔ [[ref:intechopen2020_melatonin_heart|송과선 절제 → 부정맥]]", "[[ref:dell2022_sleep_seizure|수면 부족 → GABA↓]](임상) ↔ EMF → 멜라토닌↓(동물)"] },
      { level: "약한 컨실리언스(보편성 위험)", desc: "Ca²⁺는 편재 — 일부 연결은 사소할 수 있음", examples: ["'하나의 분모로 25개 유행' — Ca²⁺는 어디에나 있음", "일부 Ca²⁺ 연관은 특정 EMF 인과관계가 아닌 보편적 생물학을 반영할 수 있음", "이것은 모델의 주요 인식론적 위험"] },
    ],

    falsificationTitle: "무엇이 모델을 반증하는가",
    falsificationLead:
      "진보적 연구 프로그램은 그것을 파괴할 것을 명시해야 합니다. BERM에는 완전한 붕괴에서 임상적 무관련성까지 4단계의 반증이 있습니다.",
    falsificationTiers: [
      { level: "레벨 1 — 모델 붕괴", test: "ETH Zürich 니모디핀-5G: Ca²⁺ 차단제가 EMF 수면 효과를 방지하지 못함", consequence: "VGCC가 표적이 아님 → 전체 캐스케이드 붕괴" },
      { level: "레벨 2 — 환경 요인 제거", test: "Amish 데이터: 주류 인구와 같은 건강 추세", consequence: "EMF는 유의미한 환경 요인이 아님" },
      { level: "레벨 3 — 핵심 실험 실패", test: "[[ref:lopez_martin_2006|López-Martín]]이 재현 실패: 피크로톡신 + GSM이 발작을 유발하지 않음", consequence: "유일한 직접적 실험 증거가 사라짐" },
      { level: "레벨 4 — 임상적 무관련성", test: "EMF 감소 중재가 건강 이점을 제공하지 않음", consequence: "모델이 메커니즘적으로 정확하지만 임상적으로 무의미할 수 있음" },
    ],

    progressiveTitle: "진보적 vs 퇴행적",
    progressiveLead:
      "라카토시의 프레임워크에서 연구 프로그램은 이후 확인되는 예측을 생성하여 투입된 것보다 더 많은 경험적 내용을 생산하면 진보적입니다. 알려진 사실만 사후적으로 수용하면 퇴행적입니다.",
    progressivePoints: [
      "BERM은 CACNA1C 유전자형이 EMF 반응을 조절할 것으로 예측 → [[ref:sousouri2025|Sousouri 2025]]가 확인(ETH Zürich, 이중맹검)",
      "BERM은 모든 효과적인 SIDS 치료가 Ca²⁺ 경로를 표적으로 한다고 예측 → 카페인, 멜라토닌, 마그네슘, 옥시토신, 부메타니드에서 검증",
      "BERM은 ELF 프라이밍이 VGCC 발현을 증가시킬 것으로 예측 → [[ref:sun2016_elf_vgcc|Sun 2016(Sci. Rep.)]]가 확인",
      "BERM은 SUDEP과 SIDS가 말기 메커니즘을 공유한다고 예측 → CSD → 뇌간 경로가 양쪽에서 확인",
      "BERM은 펄스 변조가 SAR보다 중요할 것으로 예측 → [[ref:lopez_martin_2009|López-Martín 2009]]가 확인",
      "각 검증이 예측보다 더 많이 생산 — 모든 층에서 예상치 못한 발견",
    ],
    progressiveConclusion: "모델은 라카토시의 의미에서 진보적: 예측을 생성 → 예측이 검증 → 검증이 모델이 명시한 것보다 더 많은 내용을 생산. 이것이 생산적 연구 프로그램의 특징.",

    analogyTitle: "진화론 유추",
    analogyLead: "BERM은 자연선택에 의한 진화와 구조적 특징을 공유 — 둘 다 관찰 전에 발견을 예측하고, 탐색 공간을 제약하며, 다수준 수렴을 보이는 생성적 메커니즘.",
    analogyPoints: [
      { berm: "생성적 메커니즘(EMF→VGCC→Ca²⁺→캐스케이드)", evolution: "생성적 메커니즘(변이→선택→적응)" },
      { berm: "보기 전에 발견을 예측", evolution: "찾기 전에 화석, 유전자, 흔적 구조를 예측" },
      { berm: "탐색 공간을 제약(약리학, 유전학)", evolution: "탐색 공간을 제약(계통학, 생물지리학)" },
      { berm: "다수준 수렴(물리학 → 역학)", evolution: "다수준 수렴(분자 → 생태계)" },
    ],
    analogyCritical: "중요한 차이: 진화에는 독립적 검증이 있음(DNA 시퀀싱). BERM에는 아직 개입적 검증이 부족 — EMF 감소 → 인간에서 건강 개선. 이것이 가장 중요한 빠진 조각.",

    predictionLink: "수렴 예측 참조(METAL-EMF-1–4, CHAIN-1–4, BBB-EMF-1–2, BAT-EMF-1, HPA-EMF-1–2, BETA-EMF-1–2 등)",
    predictionHref: "/predictions",
    predictionSummary: "수렴 검증은 55개의 검증 가능한 예측을 생성하며, 중금속 시너지, 혈액뇌장벽, 갈색지방조직, HPA 축, β세포, 시상하부, 코르티솔-해마, 라이디히세포, 비만세포, 정자 CatSper, NK 면역감시, BDNF 호르메시스, 장-뇌 축, 갑상선 Dio2/Dio3, 후성유전학, 텔로미어 노화, 옥시토신, 만성 통증, ASD 프로토타입, ADHD, ALS, 알레르기, 비타민 D, PEMF 호르메시스, 실로시빈, 카페인, 리튬수, 편도체, Amish 대조군 메커니즘을 포괄.",
    statusConfirmed: "✓ 확인됨",
    statusPartial: "◐ 부분적",
    falsificationTestLabel: "테스트",
    falsificationConsequenceLabel: "결과",
    analogyEvolutionHeader: "진화론",
  },
} as const;

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

export default async function UnbrokenChainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", label: d.statusConfirmed },
    partial: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", label: d.statusPartial },
  };

  const loopStatusColors: Record<string, string> = {
    green: "border-green-500/30 bg-green-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={Link2} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Verified continuum */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.chainTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.chainLead}</p>
        <div className="space-y-3">
          {d.chainRows.map((row, i) => {
            const sc = statusColors[row.status];
            return (
              <div key={i} className={`rounded-lg border border-card-border bg-card-bg p-4 ${sc.bg}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-num text-xs text-foreground-muted shrink-0 w-16">{row.scale}</span>
                    <p className="text-sm font-semibold">{row.link}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                </div>
                <p className="text-xs text-foreground-muted ml-[76px] mb-1">
                  <ChainCitationText text={row.evidence} rowIndex={i} locale={locale} />
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed ml-[76px]">
                  <InlineReferenceText text={row.detail} locale={locale} />
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.chainSummary}</p>
        </div>
      </section>

      {/* Feedback loops */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.feedbackTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.feedbackLead}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {d.feedbackLoops.map((loop) => (
            <div key={loop.id} className={`rounded-xl border p-5 ${loopStatusColors[loop.statusColor]}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-num text-xs text-accent">{loop.id}</span>
                <h3 className="font-semibold text-sm">{loop.name}</h3>
              </div>
              <div className="space-y-1.5 mb-3">
                {loop.steps.map((step, j) => (
                  <div key={j} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                    <span className="text-accent shrink-0">→</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-muted italic">{loop.status}</p>
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
            const colors = ["border-green-500/20 bg-green-500/5", "border-blue-500/20 bg-blue-500/5", "border-amber-500/20 bg-amber-500/5"];
            return (
              <div key={i} className={`rounded-lg border p-4 ${colors[i]}`}>
                <h3 className="font-semibold text-sm mb-1">{cl.level}</h3>
                <p className="text-xs text-foreground-muted mb-2">{cl.desc}</p>
                <ul className="space-y-1">
                  {cl.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-foreground-muted leading-relaxed pl-3 border-l-2 border-card-border">{ex}</li>
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
          {d.falsificationTiers.map((tier, i) => {
            const tierColors = ["bg-red-500/5 border-red-500/20", "bg-amber-500/5 border-amber-500/20", "bg-yellow-500/5 border-yellow-500/20", "bg-blue-500/5 border-blue-500/20"];
            return (
              <div key={i} className={`rounded-lg border p-4 ${tierColors[i]}`}>
                <p className="text-sm font-semibold mb-2">{tier.level}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded border border-card-border/60 bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                      {d.falsificationTestLabel}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{tier.test}</p>
                  </div>
                  <div className="rounded border border-card-border/60 bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                      {d.falsificationConsequenceLabel}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{tier.consequence}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Progressive vs degenerative */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.progressiveTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.progressiveLead}</p>
        <div className="space-y-2 mb-6">
          {d.progressivePoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0 mt-0.5">✓</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.progressiveConclusion}</p>
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
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">BERM</th>
                <th className="text-left py-2 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {d.analogyEvolutionHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {d.analogyPoints.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.berm}</td>
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

      {/* Predictions link */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionSummary}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
