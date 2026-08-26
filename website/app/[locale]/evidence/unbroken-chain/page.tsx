import type { Metadata } from "next";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "The Unbroken Chain: Photon → Population",
    subtitle:
      "Iterative convergence verification tested 51 scales of BERM's mechanistic chain across 41 verified layers (VK1–VK31, VK41–VK50). Result: 16 positive feedback loops forming a self-amplifying network, from photon absorption to population-level effects, with unexpected empirical content at every layer.",
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
      { scale: "10⁻⁶ m", link: "VK46: Gut-brain 5-HT axis (90% serotonin in gut)", evidence: "Cell Host Microbe: 90% 5-HT in gut; PMC7231603: Trp→brain; PMC5748205: gut melatonin", status: "confirmed", detail: "Over 90% of serotonin is produced in gut enterochromaffin cells. Gut microbiota modulate tryptophan availability to brain → central 5-HT synthesis. Melatonin is also synthesized from serotonin in the gut. IBS-depression comorbidity reflects shared gut-brain 5-HT disruption. Connects S14 (Per2→gut) to S2 (serotonin lock-open)." },
      { scale: "10⁻⁵ m", link: "VK47: Allergies = mast cell Ca²⁺ degranulation (quadruple sensitization)", evidence: "ScienceDirect 2011: Ca²⁺ ionophore → degranulation WITHOUT IgE; env estrogens → mast cell↑", status: "confirmed", detail: "Mast cell degranulation is Ca²⁺-dependent: Ca²⁺ ionophores trigger degranulation WITHOUT IgE, Ca²⁺ depletion blocks it WITH IgE. Quadruple sensitization: (1) EMF→VGCC→Ca²⁺ in mast cells, (2) environmental estrogens→mast cell sensitization, (3) cortisol→Th1→Th2 shift, (4) gut barrier→LPS→systemic inflammation." },
      { scale: "10⁻⁴ m", link: "VK48: Pre-eclampsia = pregnancy Cav1.2 + ROS dysregulation", evidence: "PMC9774363: Cav1.2 BP regulation; ET-1→Cav1.2 in placenta; nifedipine for pre-eclampsia", status: "confirmed", detail: "Pre-eclampsia involves Cav1.2 + ROS dysregulation in pregnancy. ET-1 activates Cav1.2 in placental vessels; nifedipine partially blocks this. Ca²⁺ spark frequency reduced in pre-eclampsia → vasodilation↓. Nifedipine used for both tocolysis AND pre-eclampsia hypertension — same Ca²⁺ mechanism in reproductive tissue." },
      { scale: "10⁻⁴ m", link: "VK49: Osteoporosis + PEMF hormesis paradox", evidence: "Frontiers Endocrinol 2024: Ca²⁺ channels in bone; PMC11919207: PEMF → bone growth", status: "confirmed", detail: "Ca²⁺ channels regulate both osteoclasts and osteoblasts. PEMF therapy promotes bone growth and reduces inflammation — seeming to contradict BERM. Resolution: Lindgren hormesis. Controlled PEMF parameters → beneficial Ca²⁺ transient; chronic uncontrolled EMF → Ca²⁺ overload. PEMF validates that EMF acts through Ca²⁺ channels." },
      { scale: "10⁻⁸ m", link: "VK50: Vitamin D → CACNA1C/1D mRNA↓ (10th moderator)", evidence: "J Neurosci 2001: VDH→L-VSCC↓; PLoS ONE 2011: VDR silencing → Cav1.2↑; Transl Psychiatry 2019", status: "confirmed", detail: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C and CACNA1D mRNA — nature's channel blocker. VDR silencing prevents Cav1.2/Cav1.3 downregulation. Vitamin D deficiency → VGCC over-expression = same state as ELF-priming. Triple hit: CACNA1C variant + low vitamin D + EMF = highest risk (schizophrenia). 10th BERM moderator." },
    ],
    chainHeaders: { scale: "Scale", link: "Chain link", evidence: "Evidence", status: "Status" },
    chainSummary: "51 verified links across 41 layers (VK1–VK31, VK41–VK50). The chain is unbroken from photon physics to population epidemiology, now spanning ADHD as second prototype, IARC 2A shift work validation, verapamil β-cell RCT, preterm birth nifedipine, ALS motor neuron vulnerability, gut-brain serotonin, allergy mast cell Ca²⁺, pre-eclampsia, PEMF hormesis paradox, and vitamin D as 10th moderator — plus all earlier mechanisms.",

    feedbackTitle: "Sixteen positive feedback loops",
    feedbackLead:
      "The convergence verification revealed sixteen self-amplifying cycles within the chain. The loops form a network: any entry point activates multiple degradation spirals simultaneously. Each loop means that initial EMF effects can progressively worsen without increasing exposure — the system degrades itself.",
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
        status: "Sapolsky mechanism verified",
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
        status: "Kim 2019 synaptic changes verified",
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
    ],

    consilienceTitle: "Consilience assessment",
    consilienceLead:
      "Consilience — independent lines of evidence converging on the same conclusion — is the strongest form of scientific support. BERM exhibits three levels of consilience.",
    consilienceLevels: [
      {
        level: "Strong consilience",
        desc: "Independent evidence lines converge",
        examples: [
          "Physics (Lindgren χ) ↔ Pharmacology (Ca²⁺ drugs converge)",
          "Genetics (CACNA1C, Sousouri 2025) ↔ Experimental (López-Martín seizures)",
          "Epidemiology (Klimentidis 8 species) ↔ Pathology (SIDS 5-HT deficiency)",
        ],
      },
      {
        level: "Moderate consilience",
        desc: "Related evidence lines support each other",
        examples: [
          "ELF-priming (Sci. Rep. 2016) ↔ Gabapentin blocks it (Cell 2009)",
          "PGC ↔ melatonin (r=0.569) ↔ Pinealectomy → arrhythmias",
          "Sleep deprivation → GABA↓ (clinical) ↔ EMF → melatonin↓ (animal)",
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
        test: "López-Martín fails to replicate: picrotoxin + GSM does NOT cause seizures",
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
      "BERM predicted that CACNA1C genotype would modulate EMF response → Sousouri 2025 confirmed (ETH Zürich, double-blind)",
      "BERM predicted that all effective SIDS treatments target Ca²⁺ pathways → verified across caffeine, melatonin, magnesium, oxytocin, bumetanide",
      "BERM predicted that ELF-priming should increase VGCC expression → Sun 2016 (Sci. Rep.) confirmed",
      "BERM predicted SUDEP and SIDS share a terminal mechanism → CSD → brainstem pathway confirmed for both",
      "BERM predicted that pulse modulation should matter more than SAR → López-Martín 2009 confirmed",
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
  },

  fi: {
    title: "Katkeamaton ketju: Fotoni → Populaatio",
    subtitle:
      "Iteratiivinen konvergenssiverifiointi testasi 51 skaalaa BERM:n mekanistisesta ketjusta 41 verifioidun kerroksen (VK1–VK31, VK41–VK50) yli. Tulos: 16 positiivista takaisinkytkentäsilmukkaa muodostavat itseään vahvistavan verkoston, fotonin absorptiosta väestötason vaikutuksiin, ennustamatonta empiiristä sisältöä jokaisessa kerroksessa.",
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
      { scale: "10⁻⁶ m", link: "VK46: Suolisto-aivo-5-HT-akseli (90 % serotoniinista suolistossa)", evidence: "Cell Host Microbe: 90 % 5-HT suolistossa; PMC7231603: Trp→aivot; PMC5748205: suoliston melatoniini", status: "confirmed", detail: "Yli 90 % serotoniinista tuotetaan suoliston enterokromafiinisoluissa. Suoliston mikrobiota säätelee tryptofaanin saatavuutta aivoihin → sentraalinen 5-HT-synteesi. Melatoniinia syntetisoidaan myös serotoniinista suolistossa. IBS-masennus-komorbiditeetti heijastaa jaettua suolisto-aivo-5-HT-häiriötä. Yhdistää S14:n (Per2→suolisto) S2:een (serotoniinikko-auki)." },
      { scale: "10⁻⁵ m", link: "VK47: Allergiat = syöttösolun Ca²⁺-degranulaatio (nelinkertainen herkistyminen)", evidence: "ScienceDirect 2011: Ca²⁺-ionoforit → degranulaatio ILMAN IgE:tä; env. estrogeenit → syöttösolu↑", status: "confirmed", detail: "Syöttösolun degranulaatio on Ca²⁺-riippuvainen: Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE:tä, Ca²⁺-depletio estää sen IgE:n KANSSA. Nelinkertainen herkistyminen: (1) EMF→VGCC→Ca²⁺ syöttösoluissa, (2) ympäristöestrogeenit→syöttösolujen herkistyminen, (3) kortisoli→Th1→Th2-siirtymä, (4) suolistoesteen→LPS→systeeminen tulehdus." },
      { scale: "10⁻⁴ m", link: "VK48: Pre-eklampsia = raskauden Cav1.2 + ROS -häiriö", evidence: "PMC9774363: Cav1.2 verenpaineen säätely; ET-1→Cav1.2 istukassa; nifedipiini pre-eklampsiassa", status: "confirmed", detail: "Pre-eklampsia sisältää Cav1.2 + ROS -häiriön raskaudessa. ET-1 aktivoi Cav1.2:n istukan suonissa; nifedipiini estää tämän osittain. Ca²⁺-kipinätaajuus on alentunut pre-eklampsiassa → vasodilataatio↓. Nifedipiiniä käytetään sekä tokolyysiin ETTÄ pre-eklampsian verenpaineeseen — sama Ca²⁺-mekanismi reproduktiivisessa kudoksessa." },
      { scale: "10⁻⁴ m", link: "VK49: Osteoporoosi + PEMF-hormesiparadoksi", evidence: "Frontiers Endocrinol 2024: Ca²⁺-kanavat luussa; PMC11919207: PEMF → luun kasvu", status: "confirmed", detail: "Ca²⁺-kanavat säätelevät sekä osteoklasteja että osteoblasteja. PEMF-hoito edistää luun kasvua ja vähentää tulehdusta — näennäisesti ristiriidassa BERM:n kanssa. Ratkaisu: Lindgrenin hormesi. Kontrolloidut PEMF-parametrit → hyödyllinen Ca²⁺-transientti; krooninen hallitsematon EMF → Ca²⁺-ylikuorma. PEMF validoi, että EMF vaikuttaa Ca²⁺-kanavien kautta." },
      { scale: "10⁻⁸ m", link: "VK50: D-vitamiini → CACNA1C/1D mRNA↓ (10. moderaattori)", evidence: "J Neurosci 2001: VDH→L-VSCC↓; PLoS ONE 2011: VDR-hiljennys → Cav1.2↑; Transl Psychiatry 2019", status: "confirmed", detail: "D-vitamiini (1,25(OH)₂D₃) vaimentaa CACNA1C- ja CACNA1D-mRNA:ta — luonnon kanavasalpaaja. VDR-hiljennys estää Cav1.2/Cav1.3-alassäätelyn. D-vitamiinipuutos → VGCC-yliekspressio = sama tila kuin ELF-primaami. Kolmoisisku: CACNA1C-variantti + matala D-vitamiini + EMF = korkein riski (skitsofrenia). 10. BERM-moderaattori." },
    ],
    chainHeaders: { scale: "Skaala", link: "Ketjun linkki", evidence: "Evidenssi", status: "Status" },
    chainSummary: "51 verifioitua linkkiä 41 kerroksessa (VK1–VK31, VK41–VK50). Ketju on katkeamaton fotonifysiikasta väestöepidemiologiaan, kattaen nyt ADHD:n toisena prototyyppinä, IARC 2A -vuorotyövalidoinnin, verapamiilin β-solu-RCT:n, ennenaikaisen synnytyksen nifedipiinin, ALS:n motoneuronihaavoittuvuuden, suolisto-aivo-serotoniinin, allergian syöttösolun Ca²⁺:n, pre-eklampsian, PEMF-hormesiparadoksin ja D-vitamiinin 10. moderaattorina — sekä kaikki aiemmat mekanismit.",

    feedbackTitle: "Kuusitoista positiivista takaisinkytkentäsilmukkaa",
    feedbackLead:
      "Konvergenssiverifiointi paljasti kuusitoista itseään vahvistavaa sykliä ketjun sisällä. Silmukat muodostavat verkoston: mikä tahansa sisääntulopiste aktivoi useita rappeutumisspiraleja samanaikaisesti. Jokainen silmukka tarkoittaa, että alkuperäiset EMF-vaikutukset voivat asteittain pahentua ilman altistuksen kasvua — järjestelmä rapautuu itse.",
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
        status: "Sapolskyn mekanismi verifioitu",
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
        status: "Kimin 2019 synapttiset muutokset verifioitu",
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
    ],

    consilienceTitle: "Konsilienssiarvio",
    consilienceLead:
      "Konsiliensssi — itsenäisten evidenssilinjojen konvergoiminen samaan johtopäätökseen — on tieteellisen tuen vahvin muoto. BERM osoittaa kolme konsilienssitasoa.",
    consilienceLevels: [
      {
        level: "Vahva konsilienss",
        desc: "Itsenäiset evidenssilinjat konvergoivat",
        examples: [
          "Fysiikka (Lindgren χ) ↔ Farmakologia (Ca²⁺-lääkkeet konvergoivat)",
          "Genetiikka (CACNA1C, Sousouri 2025) ↔ Kokeellinen (López-Martín kohtaukset)",
          "Epidemiologia (Klimentidis 8 lajia) ↔ Patologia (SIDS 5-HT-puutos)",
        ],
      },
      {
        level: "Kohtalainen konsilienss",
        desc: "Toisiinsa liittyvät evidenssilinjat tukevat toisiaan",
        examples: [
          "ELF-priming (Sci. Rep. 2016) ↔ Gabapentiini estää sen (Cell 2009)",
          "PGC ↔ melatoniini (r=0,569) ↔ Pinealektomia → rytmihäiriöt",
          "Univaje → GABA↓ (kliininen) ↔ EMF → melatoniini↓ (eläindata)",
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
        test: "López-Martín epäonnistuu replikoinnissa: pikrotoksiini + GSM EI kohtauksia",
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
      "BERM ennusti, että CACNA1C-genotyyppi moduloisi EMF-vastetta → Sousouri 2025 vahvisti (ETH Zürich, kaksoissokko)",
      "BERM ennusti, että kaikki tehokkaat SIDS-hoidot kohdistuvat Ca²⁺-reitteihin → verifioitu kofeiinin, melatoniinin, magnesiumin, oksitosiinin, bumetanidin osalta",
      "BERM ennusti, että ELF-priming kasvattaa VGCC-ekspressiota → Sun 2016 (Sci. Rep.) vahvisti",
      "BERM ennusti, että SUDEP ja SIDS jakavat terminaalimekanismin → CSD → aivorunko -reitti vahvistettu molemmille",
      "BERM ennusti, että pulssimodulaatio on tärkeämpi kuin SAR → López-Martín 2009 vahvisti",
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
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
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
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", label: activeLocale === "fi" ? "✓ Vahvistettu" : "✓ Confirmed" },
    partial: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", label: activeLocale === "fi" ? "◐ Osittainen" : "◐ Partial" },
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
        <CautionBox locale={activeLocale}>
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
                <p className="text-xs text-foreground-muted ml-[76px] mb-1">{row.evidence}</p>
                <p className="text-sm text-foreground-muted leading-relaxed ml-[76px]">{row.detail}</p>
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
                      {activeLocale === "fi" ? "Testi" : "Test"}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{tier.test}</p>
                  </div>
                  <div className="rounded border border-card-border/60 bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                      {activeLocale === "fi" ? "Seuraus" : "Consequence"}
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
                  {activeLocale === "fi" ? "Evoluutioteoria" : "Evolution theory"}
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
          <p className="text-sm leading-relaxed mb-3">
            {activeLocale === "fi"
              ? "Konvergenssiverifiointi tuottaa 47 testattavaa ennustetta, jotka kattavat raskasmetalli-synergian, veri-aivoesteen, ruskean rasvakudoksen, HPA-akselin, β-solun, hypotalamuksen, kortisoli-hippokampuksen, Leydig-solun, syöttösolun, siittiöiden CatSperin, NK-immunivalvonnan, BDNF-hormeesin, suolisto-aivo-akselin, kilpirauhasen Dio2/Dio3:n, epigenetiikan, telomeeri-ikääntymisen, oksitosiinin, kroonisen kivun, ASD-prototyypin, ADHD:n, ALS:n, allergioiden, D-vitamiinin ja PEMF-hormeesin mekanismit."
              : "The convergence verification generates 47 testable predictions covering heavy metal synergy, blood-brain barrier, brown adipose tissue, HPA axis, β-cell, hypothalamic nexus, cortisol-hippocampus, Leydig cell, mast cell, sperm CatSper, NK immune surveillance, BDNF hormesis, gut-brain axis, thyroid Dio2/Dio3, epigenetics, telomere aging, oxytocin, chronic pain, ASD prototype, ADHD, ALS, allergy, vitamin D, and PEMF hormesis mechanisms."}
          </p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} →
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
